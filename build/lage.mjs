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

import { writeFile, readFile, mkdir, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), "..");
const ZIEL = join(WURZEL, "assets", "data", "lage");
const OVERPASS = "https://overpass-api.de/api/interpreter";

/* Objekte der Demo. Koordinaten sind optional: fehlen sie, wird die Adresse
   geokodiert (Nominatim). Im Betrieb kommt die Liste aus der Objektdatenbank
   und die Geokodierung aus dem BEV-Adressregister, die Struktur bleibt gleich. */
const OBJEKTE = [
  /* Makler-Flächen mit konkreter Adresse */
  { id: "korneuburg", ort: "2100 Korneuburg, Stockerauer Straße", adresse: "Stockerauer Straße, 2100 Korneuburg, Österreich" },
  { id: "hernals", ort: "1170 Wien, Hernals", adresse: "Hernalser Hauptstraße, 1170 Wien, Österreich" },
  { id: "huetteldorf", ort: "1140 Wien, Hütteldorf", adresse: "Hütteldorf, 1140 Wien, Österreich" },
  /* Der komplette Demo-Katalog (EK_KATALOG in dash-ek-basis.jsx) */
  { id: "beheim", ort: "1170 Wien, Hernals", adresse: "Beheimgasse, 1170 Wien, Österreich" },
  { id: "beheim2", ort: "1170 Wien, Hernals", adresse: "Beheimgasse, 1170 Wien, Österreich" },
  { id: "albrecht", ort: "1180 Wien, Währing", adresse: "Währinger Straße, 1180 Wien, Österreich" },
  { id: "albrecht-dg", ort: "1180 Wien, Währing", adresse: "Währinger Straße, 1180 Wien, Österreich" },
  { id: "ecoluxe", ort: "1140 Wien, Hadersdorf", adresse: "Hühnersteigstraße 19, 1140 Wien, Österreich" },
  { id: "obenzwei", ort: "1020 Wien, Leopoldstadt", adresse: "Vorgartenstraße, 1020 Wien, Österreich" },
  { id: "obenzwei-t", ort: "1020 Wien, Leopoldstadt", adresse: "Vorgartenstraße, 1020 Wien, Österreich" },
  { id: "penthouse", ort: "1010 Wien, Innere Stadt", adresse: "Seilergasse, 1010 Wien, Österreich" },
  { id: "maxing", ort: "1130 Wien, Hietzing", adresse: "Maxingstraße, 1130 Wien, Österreich" },
  { id: "schoenbrunn", ort: "1130 Wien, Hietzing", adresse: "Grünbergstraße, 1130 Wien, Österreich" },
  { id: "facade", ort: "1050 Wien, Margareten", adresse: "Margaretenstraße, 1050 Wien, Österreich" },
];

/* ---------- Geokodierung ----------
   Nominatim ist frei nutzbar, verlangt aber eine sprechende Kennung und
   maximal eine Anfrage je Sekunde. Ergebnisse landen in einem Cache, damit
   wiederholte Laeufe die Adressen nicht erneut abfragen. */
const GEO_CACHE = join(ZIEL, "_geocache.json");

async function geokodieren(adresse, cache) {
  if (cache[adresse]) return cache[adresse];
  const url = "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=" + encodeURIComponent(adresse);
  const antwort = await fetch(url, { headers: { "User-Agent": "UNIO Lage-Scores (daniel@ad.boutique)", "Accept": "application/json" } });
  if (!antwort.ok) throw new Error("Nominatim antwortete mit " + antwort.status);
  const treffer = await antwort.json();
  if (!treffer.length) throw new Error("Adresse nicht gefunden: " + adresse);
  const koord = { lat: parseFloat(treffer[0].lat), lon: parseFloat(treffer[0].lon) };
  cache[adresse] = koord;
  await new Promise((r) => setTimeout(r, 1200)); /* Nominatim fair benutzen */
  return koord;
}

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
  { key: "ubahn", name: "U-Bahn", gewicht: 40,
    filter: 'nwr["station"="subway"];nwr["railway"="subway_entrance"];',
    passt: (t) => t.station === "subway" || t.railway === "subway_entrance" },
  { key: "bahn", name: "S-Bahn und Zug", gewicht: 30,
    filter: 'nwr["railway"="station"]["station"!="subway"];nwr["railway"="halt"];',
    passt: (t) => (t.railway === "station" && t.station !== "subway") || t.railway === "halt" },
  { key: "tram", name: "Straßenbahn", gewicht: 22,
    filter: 'nwr["railway"="tram_stop"];',
    passt: (t) => t.railway === "tram_stop" },
  { key: "bus", name: "Bus", gewicht: 14,
    filter: 'nwr["highway"="bus_stop"];',
    passt: (t) => t.highway === "bus_stop" },
];

/* Abklingen über die Gehzeit. 20 Minuten ist die Grenze, ab der eine Haltestelle
   oder ein Geschäft für den Alltag nicht mehr zählt. Bis 5 Minuten fast voller Wert. */
const abfall = (min, grenze = 20) => Math.max(0, 1 - min / grenze);

async function oeffi(o) {
  const radius = 1400;
  /* Eine gebuendelte Abfrage statt vier: Overpass ist ein freier Dienst und
     drosselt bei vielen Einzelanfragen. Die Zuordnung zum Verkehrsmittel
     passiert danach anhand der Tags. */
  const inneres = MODI.map((m) => m.filter).join("")
    .replaceAll(";", "(around:" + radius + "," + o.lat + "," + o.lon + ");");
  const daten = await overpass("[out:json][timeout:60];(" + inneres + ");out center tags;");
  const gefunden = [];
  (daten.elements || []).map(ausgabe).filter(Boolean).forEach((e) => {
    const m = MODI.find((x) => x.passt(e.tags));
    if (!m) return;
    gefunden.push({
      modus: m.key, modusName: m.name, gewicht: m.gewicht,
      name: e.tags.name || m.name,
      min: gehMin(meter(o.lat, o.lon, e.lat, e.lon)),
    });
  });
  /* Je Modus und Name nur die naechste Haltestelle, sonst zaehlen Steige doppelt */
  const perSchluessel = new Map();
  for (const g of gefunden) {
    const k = g.modus + "|" + g.name;
    if (!perSchluessel.has(k) || perSchluessel.get(k).min > g.min) perSchluessel.set(k, g);
  }
  const halte = [...perSchluessel.values()];
  /* Score: bester Beitrag je Modus voll, weitere Modi mit halbem Gewicht dazu.
     So belohnt der Score Vielfalt, ohne dass zwanzig Bushaltestellen ein
     fehlendes U-Bahn-Netz überdecken. */
  const bestePro = new Map();
  for (const g of halte) {
    const wert = g.gewicht * abfall(g.min);
    if (!bestePro.has(g.modus) || bestePro.get(g.modus) < wert) bestePro.set(g.modus, wert);
  }
  const werte = [...bestePro.values()].sort((a, b) => b - a);
  const rohwert = werte.reduce((s, w, i) => s + (i === 0 ? w : w * 0.5), 0);
  /* Kalibrierung: Bezugswert ist eine sehr gut angebundene Wiener Adresse,
     also U-Bahn in wenigen Minuten plus zwei weitere Verkehrsmittel. */
  const punkte = Math.min(100, Math.round((rohwert / 55) * 100));
  return { punkte, halte: halte.sort((a, b) => a.min - b.min) };
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
  { kat: "Nahversorgung", gewicht: 26, filter: '["shop"~"^(supermarket|convenience|greengrocer)$"]',
    passt: (t) => ["supermarket", "convenience", "greengrocer"].includes(t.shop) },
  { kat: "Nahversorgung", gewicht: 10, filter: '["shop"="bakery"]', passt: (t) => t.shop === "bakery" },
  { kat: "Nahversorgung", gewicht: 14, filter: '["amenity"="pharmacy"]', passt: (t) => t.amenity === "pharmacy" },
  { kat: "Bildung", gewicht: 14, filter: '["amenity"="school"]', passt: (t) => t.amenity === "school" },
  { kat: "Bildung", gewicht: 12, filter: '["amenity"="kindergarten"]', passt: (t) => t.amenity === "kindergarten" },
  { kat: "Gesundheit", gewicht: 12, filter: '["amenity"="doctors"]', passt: (t) => t.amenity === "doctors" },
  { kat: "Grün und Freizeit", gewicht: 12, filter: '["leisure"~"^(park|garden|playground)$"]',
    passt: (t) => ["park", "garden", "playground"].includes(t.leisure) },
];

async function alltag(o) {
  const radius = 1300;
  /* Auch hier eine gebuendelte Abfrage statt sieben. */
  const inneres = ALLTAG.map((a) => "nwr" + a.filter + "(around:" + radius + "," + o.lat + "," + o.lon + ");").join("");
  const daten = await overpass("[out:json][timeout:60];(" + inneres + ");out center tags;");
  const treffer = (daten.elements || []).map(ausgabe).filter(Boolean);
  const ergebnis = ALLTAG.map((a) => {
    const passend = treffer.filter((e) => a.passt(e.tags))
      .map((e) => ({ name: e.tags.name || typName(e.tags) || a.kat, min: gehMin(meter(o.lat, o.lon, e.lat, e.lon)) }))
      .sort((x, y) => x.min - y.min);
    return { ...a, naechste: passend.slice(0, 3) };
  });
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
  /* Kategorien ohne Treffer weglassen: eine Ueberschrift ohne Zeilen sieht
     wie ein Fehler aus. Der Score sagt ueber die fehlende Kategorie ohnehin
     schon etwas ("3 von 7 Kategorien im Gehradius"). */
  return [oeff, ...[...nach.entries()].map(([kat, zeilen]) => ({ kat, zeilen: zeilen.slice(0, 3) }))]
    .filter((g) => g.zeilen.length > 0);
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
  const nurFehlende = nur === "--fehlende";
  let liste = OBJEKTE;
  if (nur && !nurFehlende) {
    liste = OBJEKTE.filter((o) => o.id === nur);
    if (!liste.length) { console.error("Kein Objekt mit der Kennung " + nur); process.exit(1); }
  }
  await mkdir(ZIEL, { recursive: true });

  /* Geo-Cache laden, damit ein zweiter Lauf die Adressen nicht neu abfragt */
  let cache = {};
  try { cache = JSON.parse(await readFile(GEO_CACHE, "utf8")); } catch (e) { /* erster Lauf */ }

  if (nurFehlende) {
    const vorhanden = new Set((await readdir(ZIEL).catch(() => [])).filter((f) => f.endsWith(".json") && !f.startsWith("_")).map((f) => f.replace(".json", "")));
    liste = OBJEKTE.filter((o) => !vorhanden.has(o.id));
    if (!liste.length) { console.log("Alle Objekte haben schon Lage-Daten."); return; }
    console.log(liste.length + " Objekte ohne Lage-Daten.");
  }

  console.log("Lage-Scores aus offenen Daten (Adresse → Koordinaten → Overpass). Rund 20 Sekunden je Objekt.");
  for (const o of liste) {
    try {
      /* Koordinaten: entweder mitgegeben oder aus der Adresse geokodiert */
      let ziel = o;
      if (o.lat == null || o.lon == null) {
        if (!o.adresse) throw new Error("weder Koordinaten noch Adresse");
        const k = await geokodieren(o.adresse, cache);
        ziel = { ...o, lat: k.lat, lon: k.lon };
      }
      const ergebnis = await rechne(ziel);
      await writeFile(join(ZIEL, o.id + ".json"), JSON.stringify(ergebnis, null, 2) + "\n", "utf8");
      await writeFile(GEO_CACHE, JSON.stringify(cache, null, 2) + "\n", "utf8");
    } catch (e) {
      console.error("  Fehler bei " + o.id + ": " + e.message + " (bestehende Datei bleibt)");
    }
  }
  console.log("Fertig → assets/data/lage/");
}

main();
