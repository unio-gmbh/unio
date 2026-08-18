/* UNIO Lage-Scores: rechnet Öffi-Anbindung, Alltag zu Fuß und Ruhe je Objekt
   aus offenen Daten und schreibt das Ergebnis nach assets/data/lage/<id>.json.
   Die Seiten lesen diese Dateien und fallen auf ihre eingebauten Werte zurück,
   wenn nichts da ist. Deshalb bricht kein Build, wenn das Netz fehlt.

   Aufruf:  node build/lage.mjs            (alle Objekte aus OBJEKTE)
            node build/lage.mjs hernals    (nur eines)

   Datenquellen und Lizenzen: siehe docs/LAGE_SCORES_DATENQUELLEN.md
   - Haltestellen, Nahversorgung, Bildung, Grün: OpenStreetMap über Overpass (ODbL)
   - Straßenklassen für den Ruhe-Anteil: OpenStreetMap (ODbL)
   Noch nicht angebunden, weil dafür ein Datei-Download nötig ist:
   - Takte je Haltestelle aus dem Wiener Linien GTFS (CC BY). Solange gewichten wir
     nur nach Verkehrsmittelklasse, das ist die Reihenfolge, die den Score ohnehin trägt.
   - Strategische Lärmkarte Wien (CC BY) für den Ruhe-Score. Bis dahin nähern wir
     über Straßenklasse und Bahnnähe an, das Feld "naeherung" sagt das offen. */

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), "..");
const ZIEL = join(WURZEL, "assets", "data", "lage");
const OVERPASS = "https://overpass-api.de/api/interpreter";

/* Objekte mit Koordinaten. Im Betrieb kommt das aus der Objektdatenbank,
   die Geokodierung liefert das BEV-Adressregister. */
const OBJEKTE = [
  { id: "hernals", ort: "1170 Wien, Hernals", lat: 48.2265, lon: 16.3195, stadt: "wien" },
  { id: "korneuburg", ort: "2100 Korneuburg, Stockerauer Straße", lat: 48.3452, lon: 16.3339, stadt: "umland" },
  { id: "huetteldorf", ort: "1140 Wien, Hütteldorf", lat: 48.1957, lon: 16.2591, stadt: "wien" },
];

/* ---------- Geometrie und Gehzeit ---------- */

const ERDRADIUS = 6371000;
function meter(aLat, aLon, bLat, bLon) {
  const rad = Math.PI / 180;
  const dLat = (bLat - aLat) * rad, dLon = (bLon - aLon) * rad;
  const m = Math.sin(dLat / 2) ** 2 +
    Math.cos(aLat * rad) * Math.cos(bLat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * ERDRADIUS * Math.asin(Math.sqrt(m));
}

/* Gehzeit in Minuten. 4,8 km/h ist der übliche Ansatz, der Faktor 1,35 fängt
   Umwege ab. Sobald ein eigenes Valhalla steht, ersetzt echtes Routing diese Zeile. */
const GEH_TEMPO = 4800 / 60;
const UMWEG = 1.35;
const gehMin = (m) => Math.max(1, Math.round((m * UMWEG) / GEH_TEMPO));

/* ---------- Overpass ---------- */

/* Overpass ist ein freier Dienst und antwortet unter Last mit 429 oder 504.
   Deshalb mehrere Spiegel und Wiederholung mit steigender Wartezeit. */
const SPIEGEL = [OVERPASS, "https://overpass.kumi.systems/api/interpreter", "https://overpass.private.coffee/api/interpreter"];

async function overpass(query, versuche = 3) {
  let letzter = null;
  for (let v = 0; v < versuche; v++) {
    for (const url of SPIEGEL) {
      try {
        const antwort = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            /* Ohne Accept antwortet overpass-api.de mit 406 */
            "Accept": "application/json",
            "User-Agent": "UNIO Lage-Scores (daniel@ad.boutique)",
          },
          body: "data=" + encodeURIComponent(query),
        });
        if (antwort.ok) return antwort.json();
        letzter = new Error(url.split("/")[2] + " antwortete mit " + antwort.status);
        /* 429 heißt zu schnell: kurz warten, statt sofort den nächsten Spiegel zu treffen */
        if (antwort.status === 429) await new Promise((r) => setTimeout(r, 3000));
      } catch (e) { letzter = e; }
    }
    await new Promise((r) => setTimeout(r, 2500 * (v + 1)));
  }
  throw letzter || new Error("Overpass nicht erreichbar");
}

const ausgabe = (el) => {
  const lat = el.lat ?? el.center?.lat;
  const lon = el.lon ?? el.center?.lon;
  return lat && lon ? { lat, lon, tags: el.tags || {} } : null;
};

/* ---------- Verkehrsmittel ---------- */

/* Gewichte nach Verkehrsmittelklasse. U-Bahn trägt am meisten, weil Takt und
   Kapazität in Wien in dieser Reihenfolge stehen. */
const MODI = [
  { key: "ubahn", name: "U-Bahn", gewicht: 40, filter: 'nwr["station"="subway"](around:RADIUS,LAT,LON);nwr["railway"="subway_entrance"](around:RADIUS,LAT,LON);' },
  { key: "bahn", name: "S-Bahn und Zug", gewicht: 30, filter: 'nwr["railway"="station"]["station"!="subway"](around:RADIUS,LAT,LON);nwr["railway"="halt"](around:RADIUS,LAT,LON);' },
  { key: "tram", name: "Straßenbahn", gewicht: 22, filter: 'nwr["railway"="tram_stop"](around:RADIUS,LAT,LON);' },
  { key: "bus", name: "Bus", gewicht: 14, filter: 'nwr["highway"="bus_stop"](around:RADIUS,LAT,LON);' },
];

/* Abklingen über die Gehzeit. 20 Minuten ist die Grenze, ab der eine Haltestelle
   oder ein Geschäft für den Alltag nicht mehr zählt. Bis 5 Minuten fast voller Wert. */
const abfall = (min, grenze = 20) => Math.max(0, 1 - min / grenze);

async function oeffi(o) {
  const radius = 1400;
  const gefunden = [];
  for (const m of MODI) {
    const q = "[out:json][timeout:40];(" +
      m.filter.replaceAll("RADIUS", String(radius)).replaceAll("LAT", String(o.lat)).replaceAll("LON", String(o.lon)) +
      ");out center tags;";
    const daten = await overpass(q);
    const treffer = (daten.elements || []).map(ausgabe).filter(Boolean).map((e) => ({
      modus: m.key,
      modusName: m.name,
      gewicht: m.gewicht,
      name: e.tags.name || m.name,
      min: gehMin(meter(o.lat, o.lon, e.lat, e.lon)),
    }));
    /* Je Modus nur die nächste Haltestelle je Name, sonst zählen Steige doppelt */
    const perName = new Map();
    for (const t of treffer) if (!perName.has(t.name) || perName.get(t.name).min > t.min) perName.set(t.name, t);
    gefunden.push(...perName.values());
    await new Promise((r) => setTimeout(r, 1200)); /* Overpass fair benutzen */
  }
  /* Score: bester Beitrag je Modus voll, weitere Modi mit halbem Gewicht dazu.
     So belohnt der Score Vielfalt, ohne dass zwanzig Bushaltestellen ein
     fehlendes U-Bahn-Netz überdecken. */
  const bestePro = new Map();
  for (const g of gefunden) {
    const wert = g.gewicht * abfall(g.min);
    if (!bestePro.has(g.modus) || bestePro.get(g.modus) < wert) bestePro.set(g.modus, wert);
  }
  const werte = [...bestePro.values()].sort((a, b) => b - a);
  const rohwert = werte.reduce((s, w, i) => s + (i === 0 ? w : w * 0.5), 0);
  /* Kalibrierung: der Bezugswert ist eine sehr gut angebundene Wiener Adresse,
     also U-Bahn in wenigen Minuten plus zwei weitere Verkehrsmittel. Das ergibt
     rund 55 Rohpunkte und soll 100 entsprechen. Ohne diese Skalierung wirken
     selbst gute Lagen zu schlecht: U-Bahn in 7 Minuten ist in Wien keine
     eingeschraenkte Anbindung. */
  const punkte = Math.min(100, Math.round((rohwert / 55) * 100));
  return { punkte, halte: gefunden.sort((a, b) => a.min - b.min) };
}

/* ---------- Alltag zu Fuß ---------- */

/* Ohne name-Tag (haeufig bei Parks und Spielplaetzen) den OSM-Typ ausschreiben,
   statt die Kategorie zu wiederholen. */
const TYPEN = {
  park: "Park", garden: "Grünanlage", playground: "Spielplatz", pitch: "Sportplatz",
  supermarket: "Supermarkt", convenience: "Nahversorger", greengrocer: "Obst und Gemüse",
  bakery: "Bäckerei", pharmacy: "Apotheke", school: "Schule", kindergarten: "Kindergarten",
  doctors: "Arztpraxis",
};
const typName = (tags) => TYPEN[tags.leisure] || TYPEN[tags.shop] || TYPEN[tags.amenity] || null;

const ALLTAG = [
  { kat: "Nahversorgung", gewicht: 26, filter: '["shop"~"^(supermarket|convenience|greengrocer)$"]' },
  { kat: "Nahversorgung", gewicht: 10, filter: '["shop"="bakery"]' },
  { kat: "Nahversorgung", gewicht: 14, filter: '["amenity"="pharmacy"]' },
  { kat: "Bildung", gewicht: 14, filter: '["amenity"="school"]' },
  { kat: "Bildung", gewicht: 12, filter: '["amenity"="kindergarten"]' },
  { kat: "Gesundheit", gewicht: 12, filter: '["amenity"="doctors"]' },
  { kat: "Grün und Freizeit", gewicht: 12, filter: '["leisure"~"^(park|garden|playground)$"]' },
];

async function alltag(o) {
  const radius = 1300;
  const ergebnis = [];
  for (const a of ALLTAG) {
    const q = `[out:json][timeout:40];nwr${a.filter}(around:${radius},${o.lat},${o.lon});out center tags;`;
    const daten = await overpass(q);
    const treffer = (daten.elements || []).map(ausgabe).filter(Boolean)
      .map((e) => ({ name: e.tags.name || typName(e.tags) || a.kat, min: gehMin(meter(o.lat, o.lon, e.lat, e.lon)) }))
      .sort((x, y) => x.min - y.min);
    ergebnis.push({ ...a, naechste: treffer.slice(0, 3) });
    await new Promise((r) => setTimeout(r, 1200));
  }
  const gesamt = ALLTAG.reduce((s, a) => s + a.gewicht, 0);
  const erreicht = ergebnis.reduce((s, e) => s + (e.naechste[0] ? e.gewicht * abfall(e.naechste[0].min) : 0), 0);
  return { punkte: Math.min(100, Math.round((erreicht / gesamt) * 100)), gruppen: ergebnis };
}

/* ---------- Ruhe (Näherung bis die Lärmkarte angebunden ist) ---------- */

async function ruhe(o) {
  const q = `[out:json][timeout:40];(
    way["highway"~"^(motorway|trunk|primary|secondary)$"](around:150,${o.lat},${o.lon});
    way["railway"="rail"](around:150,${o.lat},${o.lon});
  );out center tags;`;
  const daten = await overpass(q);
  const stoerer = (daten.elements || []).map(ausgabe).filter(Boolean);
  let abzug = 0;
  for (const s of stoerer) {
    const d = meter(o.lat, o.lon, s.lat, s.lon);
    const klasse = s.tags.highway || (s.tags.railway ? "rail" : "");
    const schwere = { motorway: 40, trunk: 34, primary: 26, secondary: 16, rail: 22 }[klasse] || 0;
    abzug = Math.max(abzug, schwere * Math.max(0, 1 - d / 150));
  }
  return { punkte: Math.max(20, Math.round(88 - abzug)), naeherung: true, stoerer: stoerer.length };
}

/* ---------- Beschriftung ---------- */

const label = (p) => p >= 88 ? "Hervorragend" : p >= 75 ? "Sehr gut" : p >= 60 ? "Gut" : p >= 45 ? "Durchschnittlich" : "Eingeschränkt";

function oeffiSatz(halte) {
  const beste = halte[0];
  if (!beste) return "Keine Haltestelle im Gehradius gefunden.";
  const zweite = halte.find((h) => h.modus !== beste.modus);
  return beste.modusName + " " + beste.name + " in " + beste.min + " Min zu Fuß" +
    (zweite ? " · " + zweite.modusName + " " + zweite.name + " in " + zweite.min + " Min" : "");
}

function poiGruppen(al, halte) {
  const oeff = { kat: "Öffentlich", zeilen: halte.slice(0, 3).map((h) => [h.name, h.min + " Min zu Fuß"]) };
  const nach = new Map();
  for (const g of al.gruppen) {
    if (!nach.has(g.kat)) nach.set(g.kat, []);
    for (const n of g.naechste.slice(0, 2)) nach.get(g.kat).push([n.name, n.min + " Min zu Fuß"]);
  }
  return [oeff, ...[...nach.entries()].map(([kat, zeilen]) => ({ kat, zeilen: zeilen.slice(0, 3) }))];
}

/* ---------- Lauf ---------- */

async function rechne(o) {
  process.stdout.write("· " + o.id + " (" + o.ort + ") ");
  const oe = await oeffi(o);
  const al = await alltag(o);
  const ru = await ruhe(o);
  process.stdout.write("Öffi " + oe.punkte + " · Alltag " + al.punkte + " · Ruhe " + ru.punkte + "\n");
  return {
    id: o.id,
    ort: o.ort,
    koordinaten: [o.lat, o.lon],
    stand: new Date().toISOString().slice(0, 10),
    scores: [
      { k: "Öffi-Anbindung", wert: oe.punkte, label: label(oe.punkte), sub: oeffiSatz(oe.halte) },
      { k: "Alltag zu Fuß", wert: al.punkte, label: label(al.punkte),
        sub: al.gruppen.filter((g) => g.naechste[0]).length + " von " + al.gruppen.length + " Kategorien im Gehradius" },
      { k: "Ruhe", wert: ru.punkte, label: label(ru.punkte),
        sub: ru.stoerer ? "Hauptverkehr oder Bahn in der Nähe" : "Keine Hauptstraße und keine Bahn in 150 m" },
    ],
    poi: poiGruppen(al, oe.halte),
    oeffiSatz: oeffiSatz(oe.halte),
    naeherungen: ru.naeherung ? ["Ruhe genähert über Straßenklasse und Bahnnähe, bis die Lärmkarte Wien angebunden ist",
      "Takte je Haltestelle noch nicht aus dem GTFS, Gewichtung derzeit nach Verkehrsmittelklasse"] : [],
    quellen: ["OpenStreetMap (ODbL)", "Stadt Wien (CC BY)", "Wiener Linien (CC BY)"],
  };
}

async function main() {
  const nur = process.argv[2];
  const liste = nur ? OBJEKTE.filter((o) => o.id === nur) : OBJEKTE;
  if (!liste.length) { console.error("Kein Objekt mit der Kennung " + nur); process.exit(1); }
  await mkdir(ZIEL, { recursive: true });
  console.log("Lage-Scores aus offenen Daten (Overpass). Das dauert je Objekt rund 15 Sekunden.");
  for (const o of liste) {
    try {
      const ergebnis = await rechne(o);
      await writeFile(join(ZIEL, o.id + ".json"), JSON.stringify(ergebnis, null, 2) + "\n", "utf8");
    } catch (e) {
      console.error("  Fehler bei " + o.id + ": " + e.message + " (bestehende Datei bleibt)");
    }
  }
  console.log("Fertig → assets/data/lage/");
}

main();
