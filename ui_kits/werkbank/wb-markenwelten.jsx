/* Werkbank. Markenwelten (v1, 29.09.2026)
   Sechs kuratierte visuelle Identitätssysteme für Makler, nach docs/werkbank/MARKE_SCHEMA.md
   (Objekt markenwelt und Renderer). Jede Welt hat eine gestalterische Idee, ein wiedererkennbares
   Zeichen, Farbrollen mit Proportion, einen Schriftschlüssel aus HM_WEB_SCHRIFTEN (damit die Website
   passt), eine Bildsprache mit Regeln, ein Raster und einen passenden Website-Look.
   Renderer zeichnen SVG auf festen Formaten und skalieren über "breite" in px:
   Post 1080 x 1350, Story 1080 x 1920, Karte 85 x 55 mm (850 x 550), Exposé A4 (2100 x 2970),
   Signatur 1200 x 300. Akzent und Porträt kommen aus hmBrand(mid), Objektfotos aus hmWebObjekte().
   Keine Bitmaps außer echten Fotos, keine Glyphen als Icons, kein Schmuck ohne Bedeutung. */

/* ---------- Die sechs Welten (Datenvertrag markenwelt) ---------- */
const HM_MARKENWELTEN = [
  {
    id: "ruhig", name: "Weite",
    idee: "Die Marke zeigt Raum, bevor sie spricht: eine Wand, ein Fenster, ein Satz.",
    passtZu: ["begleiter", "fels", "kenner"],
    schrift: "zeitlos",
    farben: { grund: "#EEEBE5", text: "#25231F", flaeche: "#E1DCD2", linie: "#B9B1A4" },
    proportion: { grund: 78, text: 16, akzent: 6 },
    zeichen: { name: "Das Fenster 3:4", satz: "Jedes Bild und jede Zahl sitzt in einem hohen Fenster im Verhältnis 3:4 an der oberen Kante. Eine versetzte Linie in der Akzentfarbe zeigt die Tiefe der Laibung. Im Profil wechselt das Fenster zwischen links und rechts." },
    bildsprache: {
      regeln: ["Ein Motiv pro Bild, viel Wand und Boden rundherum.", "Seitliches Tageslicht, kein Blitz, keine Lampen als Effekt.", "Kamera in Kopfhöhe, senkrechte Linien bleiben senkrecht."],
      motive: ["Leere Räume am Vormittag", "Fensterbank mit Blick in den Hof", "Stiegenhaus im Streiflicht", "Porträt frontal, ruhiger Blick in die Kamera"],
      vermeiden: ["Weitwinkel, der Räume größer macht", "Dekoration nur für das Foto", "Mehrere Menschen im Bild", "Schrift im Foto"],
    },
    raster: { rand: 0.11, spalten: 4 },
    websiteLook: 5,
  },
  {
    id: "editorial", name: "Feuilleton",
    idee: "Jeder Beitrag ist eine Seite aus deinem eigenen Stadtmagazin über Wohnen in Wien.",
    passtZu: ["kenner", "entdecker", "gestalter"],
    schrift: "klassisch",
    farben: { grund: "#F4F1EA", text: "#1A1916", flaeche: "#E7E1D4", linie: "#1A1916" },
    proportion: { grund: 66, text: 26, akzent: 8 },
    zeichen: { name: "Die Folio-Zeile", satz: "Unten auf jeder Seite eine Zeile wie in einer Zeitschrift: dein Name als Titel, die Rubrik, die laufende Nummer. Die Nummer zählt jeden Beitrag weiter, so wird der Feed zur Ausgabe." },
    bildsprache: {
      regeln: ["Reportage statt Inszenierung: echte Situationen, vorhandenes Licht.", "Jedes Bild bekommt eine Bildunterschrift mit Ort.", "Mutige Ausschnitte: Hände, Material, eine Ecke des Raums."],
      motive: ["Details wie Türklinke, Parkett, Stuck", "Die Straße vor dem Haus", "Porträt im Gespräch, halbnah", "Grundriss als ganze Seite"],
      vermeiden: ["Renderings ohne Umgebung", "Weichzeichner und Vignetten", "Posen mit verschränkten Armen", "Bilder ohne Bildunterschrift"],
    },
    raster: { rand: 0.07, spalten: 6 },
    websiteLook: 1,
  },
  {
    id: "graetzl", name: "Grätzl",
    idee: "Die Marke ist der Stadtplan deines Viertels: Straße für Straße, Ecke für Ecke.",
    passtZu: ["entdecker", "gastgeber", "begleiter"],
    schrift: "modern",
    farben: { grund: "#F2EFE7", text: "#1C1F1A", flaeche: "#DFE3D6", linie: "#1C1F1A" },
    proportion: { grund: 64, text: 22, akzent: 14 },
    zeichen: { name: "Die Grätzl-Linie", satz: "Ein Straßenzug als eine durchgehende Linie in der Akzentfarbe, aus deinem Namen und deinem Bezirk errechnet und damit nur deine. Sie endet in einem Punkt: dort, wo das Objekt liegt oder du gerade bist." },
    bildsprache: {
      regeln: ["Immer ein erkennbarer Ort: Ecke, Fassade, Straßenschild.", "Aus der Fußgängerperspektive, Menschen dürfen durchs Bild gehen.", "Tageslicht, das Wetter darf man sehen."],
      motive: ["Kreuzungen und Straßenecken", "Märkte, Lokale, Parks im Grätzl", "Hauseingänge mit Hausnummer", "Du im Gehen, auf dem Weg zur Besichtigung"],
      vermeiden: ["Drohnenbilder ohne Straßenbezug", "Innenräume ohne Blick nach draußen", "Wahrzeichen statt Grätzl", "Skylines aus dem Archiv"],
    },
    raster: { rand: 0.08, spalten: 6 },
    websiteLook: 4,
  },
  {
    id: "klar", name: "Maßstab",
    idee: "Klarheit als Haltung: ein sichtbares Raster wie auf einem Bauplan, in dem jede Zahl ihren festen Platz hat.",
    passtZu: ["gestalter", "kenner", "fels"],
    schrift: "unio",
    farben: { grund: "#F5F5F2", text: "#121315", flaeche: "#E7E8E5", linie: "#B7BBBD" },
    proportion: { grund: 70, text: 20, akzent: 10 },
    zeichen: { name: "Das Schriftfeld", satz: "Wie unten rechts auf jedem Bauplan: ein Feld aus Haarlinien mit Fläche, Lage, Preis und Name, immer an derselben Stelle. Genau ein Kästchen ist in der Akzentfarbe gefüllt, dort steht, worum es geht." },
    bildsprache: {
      regeln: ["Architektur frontal oder exakt im rechten Winkel.", "Kühles Tageslicht, neutrale Farben, kein Filter.", "Foto und Grundriss gehören zusammen."],
      motive: ["Fassaden frontal", "Grundrisse und Schnitte", "Material im Streiflicht", "Porträt vor ruhiger Wand"],
      vermeiden: ["Schiefe Horizonte", "Warme Filter", "Lifestyle-Szenen mit Sektglas", "Mehr als ein Akzentfeld pro Fläche"],
    },
    raster: { rand: 0.06, spalten: 6 },
    websiteLook: 3,
  },
  {
    id: "warm", name: "Abendlicht",
    idee: "Wie spätes Licht in einer Wiener Altbauwohnung: warme Flächen, weiche Formen, Menschen im Mittelpunkt.",
    passtZu: ["begleiter", "gastgeber"],
    schrift: "editorial",
    farben: { grund: "#F2EADF", text: "#3A2E26", flaeche: "#E7D9C7", linie: "#CBB8A1" },
    proportion: { grund: 62, text: 20, akzent: 18 },
    zeichen: { name: "Der Bogen", satz: "Das Rundbogenfenster der Gründerzeit als Form für jedes Foto und jedes Porträt: oben rund, unten gerade, immer im Verhältnis 5 zu 7. Als volle Fläche in der Akzentfarbe trägt der Bogen die Zahlen." },
    bildsprache: {
      regeln: ["Warmes Licht am späten Nachmittag, Lampen dürfen brennen.", "Menschen im Bild, echte Momente statt Posen.", "Materialien, die man angreifen möchte: Holz, Stoff, Keramik."],
      motive: ["Küchentisch mit zwei Tassen", "Hände bei der Schlüsselübergabe", "Holzboden im Gegenlicht", "Porträt mit offenem Blick, leicht seitlich"],
      vermeiden: ["Kaltes Blitzlicht", "Leere, sterile Räume", "Gestellter Handschlag in die Kamera", "Graue Tage ohne Lichtstimmung"],
    },
    raster: { rand: 0.09, spalten: 4 },
    websiteLook: 2,
  },
  {
    id: "kontrast", name: "Kontrast",
    idee: "Papier und Schwarz, dazwischen eine harte Kante: Entscheidungen statt Stimmungen.",
    passtZu: ["fels", "kenner", "gestalter"],
    schrift: "zeitlos",
    farben: { grund: "#131211", text: "#F3F0EA", flaeche: "#E9E5DD", linie: "#3B3834" },
    proportion: { grund: 58, text: 32, akzent: 10 },
    zeichen: { name: "Die Kante", satz: "Eine waagrechte Kante im Goldenen Schnitt teilt jede Fläche in Hell und Dunkel. Die Headline steht auf der Kante oder hängt direkt darunter, unten stehen nur Fakten. Wo die Kante beginnt, sitzt ein kurzer Balken in der Akzentfarbe." },
    bildsprache: {
      regeln: ["Harte Schatten, Schwarz darf schwarz sein.", "Architektur als Form: Kanten, Linien, Volumen.", "Porträt ernst und direkt, frontal."],
      motive: ["Fassaden im Streiflicht", "Stiegen und Geländer als Grafik", "Abendaufnahmen mit Licht von innen", "Porträt vor dunklem Grund"],
      vermeiden: ["Pastelltöne und Weichzeichner", "Unruhige Hintergründe", "Lächeln auf Kommando", "Farbfilter"],
    },
    raster: { rand: 0.07, spalten: 12 },
    websiteLook: 6,
  },
];

/* ---------- Gestaltungsparameter je Welt (nicht Teil des Datenvertrags) ----------
   objekte: Reihenfolge der Fotos aus hmWebObjekte(), passend zur Bildsprache.
   feed: neun Plätze wie im Profil, Zeile für Zeile. Hell und Dunkel, Bild und Schrift wechseln. */
const HM_WELT_STIL = {
  ruhig: { dGewicht: 400, ls: -0.01, serie: "Ein Raum", objekte: [8, 5, 7, 1, 0, 2],
    feed: [{ art: "hook", portrait: true }, { art: "objekt", bild: 0, spiegel: true }, { art: "zahl" }, { art: "objekt", bild: 1, spiegel: true }, { art: "zitat", ton: "flaeche" }, { art: "objekt", bild: 2, spiegel: true }, { art: "serie" }, { art: "hook", spiegel: true, ton: "flaeche" }, { art: "objekt", bild: 3 }] },
  editorial: { dGewicht: 400, ls: -0.015, serie: "Stadtgespräch", objekte: [0, 6, 5, 2, 7, 1],
    feed: [{ art: "serie", bild: 1 }, { art: "hook" }, { art: "objekt", bild: 0 }, { art: "zitat", ton: "dunkel" }, { art: "objekt", bild: 2 }, { art: "zahl", ton: "flaeche" }, { art: "objekt", bild: 3 }, { art: "hook", portrait: true }, { art: "objekt", bild: 4 }] },
  graetzl: { dGewicht: 600, ls: -0.02, serie: "Grätzl-Check", objekte: [6, 2, 0, 7, 4, 1],
    feed: [{ art: "hook" }, { art: "objekt", bild: 0 }, { art: "serie", ton: "dunkel" }, { art: "objekt", bild: 1 }, { art: "zahl" }, { art: "hook", portrait: true, ton: "flaeche" }, { art: "zitat", ton: "flaeche" }, { art: "objekt", bild: 2 }, { art: "objekt", bild: 3 }] },
  klar: { dGewicht: 500, ls: -0.02, serie: "Drei Zahlen", objekte: [5, 1, 8, 7, 0, 3],
    feed: [{ art: "hook" }, { art: "objekt", bild: 0 }, { art: "zahl" }, { art: "objekt", bild: 1 }, { art: "serie" }, { art: "objekt", bild: 2 }, { art: "zitat", ton: "dunkel" }, { art: "hook", portrait: true }, { art: "objekt", bild: 3 }] },
  warm: { dGewicht: 400, ls: -0.01, serie: "Angekommen", objekte: [2, 0, 7, 4, 6, 8],
    feed: [{ art: "hook", portrait: true }, { art: "objekt", bild: 0 }, { art: "zitat", ton: "akzent" }, { art: "objekt", bild: 1 }, { art: "zahl", ton: "flaeche" }, { art: "objekt", bild: 2 }, { art: "serie" }, { art: "hook", bild: 3 }, { art: "objekt", bild: 4 }] },
  kontrast: { dGewicht: 400, ls: -0.015, serie: "Klartext", objekte: [5, 0, 4, 7, 1, 6],
    feed: [{ art: "hook", portrait: true }, { art: "objekt", bild: 0 }, { art: "zahl" }, { art: "zitat" }, { art: "objekt", bild: 1 }, { art: "hook" }, { art: "objekt", bild: 2 }, { art: "serie" }, { art: "objekt", bild: 3 }] },
};
const HM_WELT_ARTEN = ["hook", "zahl", "zitat", "objekt", "serie"];
const HM_WELT_RUBRIK = { hook: "Standpunkt", zahl: "Markt", zitat: "Gespräch", objekt: "Objekt", serie: "Serie" };
const HM_WELT_HOOKS = ["Warum das erste Angebot selten das beste ist.", "Drei Fragen vor jeder Besichtigung.", "Was sich im Grätzl gerade verändert.", "So liest man ein Grundbuch.", "Der häufigste Preisfehler in Wien."];
/* Welche Antwort je Bildpaar zur Welt passt (a eher warm, b eher kühl), siehe HM_BILDPAARE */
const HM_WELT_BILDPAARE = {
  ruhig: { bp1: "a", bp4: "b", bp5: "b", bp6: "b" },
  editorial: { bp1: "a", bp2: "b", bp3: "a", bp4: "a", bp6: "a" },
  graetzl: { bp1: "a", bp2: "a", bp3: "a", bp6: "a" },
  klar: { bp1: "b", bp2: "b", bp3: "b", bp4: "b", bp5: "b", bp6: "b" },
  warm: { bp1: "a", bp2: "a", bp3: "a", bp4: "a", bp5: "a", bp6: "a" },
  kontrast: { bp1: "a", bp2: "b", bp3: "b", bp4: "b" },
};
/* Antwort "Was könnte dein wiedererkennbares Zeichen werden?" (HM_ASSETS), erste Welt zählt mehr */
const HM_WELT_ASSETS = { "Eine Farbe": ["warm", "kontrast"], "Ein Ort": ["graetzl", "editorial"], "Ein Satz": ["editorial", "kontrast"], "Ein Gegenstand": ["ruhig", "klar"], "Eine Geste": ["warm", "ruhig"], "Ein Kleidungsstück": ["kontrast", "ruhig"] };
/* Verfügbare Schnitte der geladenen Schriften, damit nichts künstlich fett gerechnet wird */
const HM_WELT_SCHNITTE = { "DM Serif Display": [400], "Playfair Display": [400, 700], "Fraunces": [400, 600], "Space Grotesk": [400, 600], "Power Grotesk": [300, 400, 500, 700], "Manrope": [400, 600], "Hanken Grotesk": [400, 600] };
const HM_WELT_SERIF = ["DM Serif Display", "Playfair Display", "Fraunces"];
const HM_WELT_FAKTOR = { "DM Serif Display": 0.5, "Playfair Display": 0.53, "Fraunces": 0.54, "Space Grotesk": 0.57, "Power Grotesk": 0.56, "Manrope": 0.57, "Hanken Grotesk": 0.54 };

/* ---------- Grundfunktionen: Welt, Farbe, Schrift, Maß ---------- */
function hmWeltHol(welt) {
  if (welt && typeof welt === "object" && welt.id) return HM_MARKENWELTEN.find((w) => w.id === welt.id) || welt;
  return HM_MARKENWELTEN.find((w) => w.id === welt) || HM_MARKENWELTEN[0];
}
/* b mit der Schrift der Welt, für Vorschauen vor der Wahl */
function hmWeltMarke(welt, b) {
  const w = hmWeltHol(welt);
  const s = (typeof HM_WEB_SCHRIFTEN !== "undefined" && HM_WEB_SCHRIFTEN[w.schrift]) || null;
  return s ? { ...(b || {}), schrift: s, schriftId: w.schrift } : { ...(b || {}) };
}
function hmWeltRgb(h) {
  let x = String(h || "#000000").replace("#", "");
  if (x.length === 3) x = x.split("").map((z) => z + z).join("");
  return [0, 2, 4].map((i) => parseInt(x.substr(i, 2), 16) || 0);
}
function hmWeltLum(h) {
  const k = [0.2126, 0.7152, 0.0722];
  return hmWeltRgb(h).reduce((s, v, i) => { const c = v / 255; return s + k[i] * (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)); }, 0);
}
function hmWeltKontrast(a, b) { const x = hmWeltLum(a), y = hmWeltLum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
function hmWeltMisch(a, b, t) { const A = hmWeltRgb(a), B = hmWeltRgb(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join(""); }
/* Farbe so weit Richtung Schwarz oder Weiß schieben, bis der Kontrast zum Grund reicht */
function hmWeltLesbar(fg, bg, ziel) {
  if (hmWeltKontrast(fg, bg) >= ziel) return fg;
  const pol = hmWeltLum(bg) > 0.3 ? "#0B0A09" : "#FFFFFF";
  for (let t = 0.1; t <= 1.001; t += 0.1) { const m = hmWeltMisch(fg, pol, t); if (hmWeltKontrast(m, bg) >= ziel) return m; }
  return pol;
}
function hmWeltFarben(welt, b) {
  const w = hmWeltHol(welt); const f = w.farben;
  const akzent = (b && b.akzent) || "#33503F";
  const lg = hmWeltLum(f.grund) >= hmWeltLum(f.text);
  const hell = lg ? f.grund : f.text, dunkel = lg ? f.text : f.grund;
  const kand = [hell, dunkel, "#FFFFFF", "#0B0A09"];
  const aufAkzent = hmWeltKontrast(hell, akzent) >= 4.5 ? hell : hmWeltKontrast(dunkel, akzent) >= 4.5 ? dunkel : kand.sort((x, y) => hmWeltKontrast(y, akzent) - hmWeltKontrast(x, akzent))[0];
  return { ...f, akzent, hell, dunkel, aufAkzent };
}
/* Farbrollen je Fläche: bg, fg, leise (Text 4,5 zu 1), linie, akz (große Schrift 3 zu 1), akzText, akzStrich */
function hmWeltTon(c, name) {
  const F = c.F; let bg, fg;
  if (name === "flaeche") { bg = F.flaeche; fg = [F.text, F.dunkel, F.hell].sort((x, y) => hmWeltKontrast(y, bg) - hmWeltKontrast(x, bg))[0]; }
  else if (name === "dunkel") { bg = F.dunkel; fg = F.hell; }
  else if (name === "hell") { bg = F.hell; fg = F.dunkel; }
  else if (name === "akzent") { bg = F.akzent; fg = F.aufAkzent; }
  else { bg = F.grund; fg = F.text; }
  return {
    name, bg, fg,
    leise: hmWeltLesbar(hmWeltMisch(fg, bg, 0.3), bg, 4.5),
    linie: name === "grund" ? F.linie : hmWeltMisch(fg, bg, 0.72),
    akz: hmWeltLesbar(F.akzent, bg, 3), akzText: hmWeltLesbar(F.akzent, bg, 4.5), akzStrich: hmWeltLesbar(F.akzent, bg, 1.6),
    flaeche: bg === F.flaeche ? F.grund : F.flaeche,
  };
}
function hmWeltSchnitt(font, w) {
  const l = HM_WELT_SCHNITTE[font] || [400, 700];
  return l.reduce((best, x) => (Math.abs(x - w) < Math.abs(best - w) ? x : best), l[0]);
}
function hmWeltFam(f) { return HM_WELT_SERIF.includes(f) ? `"${f}", ui-serif, Georgia, serif` : `"${f}", ui-sans-serif, system-ui, sans-serif`; }

/* Textmaß: Canvas misst mit der echten Schrift, ohne DOM schätzt eine Zeichentabelle (für Tests) */
const HM_WELT_MESS = { ctx: null, cache: new Map(), geladen: new Set() };
function hmWeltSchaetz(text, font, size, weight) {
  const f = (HM_WELT_FAKTOR[font] || 0.55) * (weight >= 600 ? 1.06 : 1);
  let e = 0;
  for (const ch of String(text)) {
    if (ch === " ") e += 0.5; else if (/[0-9€]/.test(ch)) e += 1.12; else if (/[A-ZÄÖÜ]/.test(ch)) e += 1.3;
    else if (/[iljtfr.,:;'!|()\-]/.test(ch)) e += 0.58; else if (/[mwMW]/.test(ch)) e += 1.5; else e += 1;
  }
  return e * f * size;
}
function hmWeltMiss(text, font, size, weight, ls) {
  const k = font + "|" + weight + "|" + size + "|" + (ls || 0) + "|" + text;
  const v = HM_WELT_MESS.cache.get(k); if (v != null) return v;
  let w = null;
  try {
    if (typeof document !== "undefined" && document.createElement) {
      if (!HM_WELT_MESS.ctx) HM_WELT_MESS.ctx = document.createElement("canvas").getContext("2d");
      const x = HM_WELT_MESS.ctx;
      if (x) { x.font = `${weight || 400} ${size}px ${hmWeltFam(font)}`; w = x.measureText(text).width; }
    }
  } catch (e) { w = null; }
  if (w == null) w = hmWeltSchaetz(text, font, size, weight || 400);
  w += Math.max(0, String(text).length - 1) * (ls || 0) * size;
  HM_WELT_MESS.cache.set(k, w);
  return w;
}
function hmWeltUmbruch(text, font, size, weight, ls, w) {
  const out = [];
  String(text == null ? "" : text).split(/\n/).forEach((abs) => {
    const worte = abs.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
    let akt = "";
    worte.forEach((wort) => { const t = akt ? akt + " " + wort : wort; if (!akt || hmWeltMiss(t, font, size, weight, ls) <= w) akt = t; else { out.push(akt); akt = wort; } });
    if (akt) out.push(akt);
  });
  return out;
}
/* Satz: bricht um und verkleinert bis zur Mindestgröße, kürzt erst danach sichtbar mit Auslassung */
function hmWeltSatz(text, o) {
  const font = o.font, weight = o.weight || 400, ls = o.ls || 0, w = Math.max(10, o.w), zeilen = o.zeilen || 3, lh = o.lh || 1.1;
  const min = o.min || Math.round(o.size * 0.62);
  let size = o.size;
  const zuBreit = (z, s) => z.some((l) => hmWeltMiss(l, font, s, weight, ls) > w);
  const zuHoch = (z, s) => !!o.hoehe && (z.length - 1) * s * lh + s * 0.96 > o.hoehe;
  let z = hmWeltUmbruch(text, font, size, weight, ls, w);
  while ((z.length > zeilen || zuBreit(z, size) || zuHoch(z, size)) && size > min) { size = Math.max(min, Math.floor(size * 0.94)); z = hmWeltUmbruch(text, font, size, weight, ls, w); }
  if (z.length > zeilen) {
    z = z.slice(0, zeilen);
    let l = z[zeilen - 1].replace(/[.,;:]$/, "") + "…";
    while (l.length > 2 && hmWeltMiss(l, font, size, weight, ls) > w) l = l.slice(0, -2).replace(/\s+$/, "") + "…";
    z[zeilen - 1] = l;
  }
  return { z, size, lh, font, weight, ls };
}
const hmWR = (v) => Math.round(v * 10) / 10;
const hmWUnten = (s, y) => y + s.size * 0.76 + (s.z.length - 1) * s.size * s.lh;
function hmWeltSaat(s) { let h = 2166136261; for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function hmWeltZufall(seed) { let a = seed || 1; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function hmWeltBezirk(b) {
  const roh = (b && b.w && b.w.bezirke && b.w.bezirke[0]) || (b && b.makler && b.makler.region) || "Wien";
  const m = String(roh).match(/^(\d{4})\s+(.+)$/);
  return m ? { plz: m[1], name: m[2], voll: roh } : { plz: "", name: String(roh), voll: String(roh) };
}
function hmWeltVoll(b) { return (b && b.makler && b.makler.name) || [b && b.vor, b && b.nach].filter(Boolean).join(" ") || "Vorname Nachname"; }
function hmWeltMonat() { const d = new Date(); return String(d.getMonth() + 1).padStart(2, "0") + "/" + d.getFullYear(); }
function hmWeltSlug(t) { return String(t || "").toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9.]/g, ""); }
function hmWeltKontakt(b) {
  const id = b && b.makler && b.makler.id; let tel = "", mail = "", adresse = "";
  try {
    if (typeof hmStore !== "undefined" && id) {
      const kd = (((hmStore.get("einrichtung_daten") || {})[id] || {}).visitenkarten) || {};
      const web = (((hmStore.get("website") || {})[id] || {}).felder) || {};
      const k = ((hmStore.get("kontakte") || {})[id] || [])[0] || {};
      tel = kd.tel || web.tel || ""; mail = kd.mail || web.mail || k.mail || ""; adresse = web.adresse || "";
    }
  } catch (e) { /* Store fehlt, dann Platzhalter */ }
  return { tel: tel || "+43 1 000 00 00", mail: mail || hmWeltSlug((b && b.vor) || "name") + "." + hmWeltSlug((b && b.nach) || "") + "@beispiel.at", web: "unio.at", adresse: (adresse || "Kärntner Straße 12, 1010 Wien").replace(/\s*\(UNIO\)\s*$/, "") };
}
function hmWeltObjekte() {
  try { if (typeof hmWebObjekte === "function") return hmWebObjekte(); } catch (e) { /* ohne location */ }
  return [
    ["Das Albrecht, Dachgeschoss", "Wieden · 1040", "€ 1.290.000", "128 m²", "4 Zi", "albrechts-dachgeschoss.jpg"],
    ["Beheimgasse", "Hernals · 1170", "€ 468.000", "64 m²", "2 Zi", "beheim.jpg"],
    ["Oben Zwei, Terrasse", "Leopoldstadt · 1020", "€ 1.190.000", "118 m²", "4 Zi", "obenzwei-terrasse.jpg"],
    ["Zinshaus, Gründerzeit", "Margareten · 1050", "Preis auf Anfrage", "1.180 m²", "12 Einheiten", "zinshaus-fassaden.jpg"],
    ["EcoLuxe, Erstbezug", "Donaustadt · 1220", "€ 540.000", "71 m²", "3 Zi", "ecoluxe.jpg"],
    ["Penthouse am Ring", "Innere Stadt · 1010", "€ 3.450.000", "196 m²", "5 Zi", "penthouse.jpg"],
    ["Wohnen bei Schönbrunn", "Hietzing · 1130", "€ 1.080.000", "104 m²", "3 Zi", "schoenbrunn.jpg"],
    ["Das Albrecht, Wohnen", "Wieden · 1040", "€ 720.000", "82 m²", "3 Zi", "albrechts-wohnen.jpg"],
    ["Maxingstraße", "Hietzing · 1130", "€ 890.000", "96 m²", "3 Zi", "maxingstrasse-zimmer.jpg"],
  ].map(([t, loc, price, m2, zi, img]) => ({ t, loc, price, m2, zi, img: "../../assets/img/" + img }));
}
/* Objekt aus Index, URL oder Objekt; Mittelpunkte aus Ortsangaben werden zu Kommas */
function hmWeltObjekt(x, welt) {
  const st = HM_WELT_STIL[hmWeltHol(welt).id]; const obj = hmWeltObjekte();
  let o;
  if (typeof x === "number") o = obj[st.objekte[((x % st.objekte.length) + st.objekte.length) % st.objekte.length] % obj.length];
  else if (typeof x === "string") o = { t: "", loc: "", img: x };
  else o = x || obj[0];
  o = { ...o };
  o.loc = String(o.loc || "").replace(/\s*·\s*/g, ", ");
  return o;
}
function hmWeltEnergie(o) { return o && o.hwb ? `HWB ${o.hwb} kWh/m²a, Klasse ${o.klasse || "folgt"}${o.fgee ? ", fGEE " + o.fgee : ""}` : "Energieausweis: HWB und Klasse folgen"; }
const hmWeltZwei = (n) => String(n == null ? 1 : n).padStart(2, "0");

/* Schriften nachladen und danach neu messen */
function useHmWeltSchriften(b, welt) {
  const [, setN] = React.useState(0);
  const sch = (b && b.schrift) || (typeof HM_WEB_SCHRIFTEN !== "undefined" && HM_WEB_SCHRIFTEN[hmWeltHol(welt).schrift]) || {};
  const key = (sch.d || "") + "|" + (sch.t || "");
  React.useEffect(() => {
    if (typeof document === "undefined" || !document.fonts || !document.fonts.load) return undefined;
    const offen = [sch.d, sch.t].filter((f) => f && !HM_WELT_MESS.geladen.has(f));
    if (!offen.length) return undefined;
    let aus = false;
    Promise.all(offen.flatMap((f) => [document.fonts.load(`400 40px "${f}"`), document.fonts.load(`600 40px "${f}"`)]).map((p) => p.catch(() => null))).then(() => {
      offen.forEach((f) => HM_WELT_MESS.geladen.add(f));
      HM_WELT_MESS.cache.clear();
      if (!aus) setN((n) => n + 1);
    });
    return () => { aus = true; };
  }, [key]);
}
function useHmWeltUid() { return "hw" + String(React.useId ? React.useId() : Math.random()).replace(/[^A-Za-z0-9]/g, ""); }

/* Zeichenkontext für eine Fläche W x H */
function hmWeltCtx(welt, b, W, H, uid) {
  const w = hmWeltHol(welt); const bb = b || {};
  const sch = bb.schrift || (typeof HM_WEB_SCHRIFTEN !== "undefined" && HM_WEB_SCHRIFTEN[w.schrift]) || { d: "Power Grotesk", t: "Power Grotesk" };
  const st = HM_WELT_STIL[w.id];
  const r = Math.round(w.raster.rand * W);
  let n = 0;
  const bez = hmWeltBezirk(bb);
  const c = {
    W, H, welt: w, b: bb, st, r, sp: w.raster.spalten, col: (W - 2 * r) / w.raster.spalten, F: hmWeltFarben(w, bb), bez,
    fd: sch.d, ft: sch.t, wd: hmWeltSchnitt(sch.d, st.dGewicht), wdk: hmWeltSchnitt(sch.d, 700), wt: hmWeltSchnitt(sch.t, 400), wtk: hmWeltSchnitt(sch.t, 600),
    saat: hmWeltSaat(hmWeltVoll(bb) + "|" + bez.voll), k: W / 1080,
    neu: () => uid + "n" + (n++),
  };
  c.ton = (name) => hmWeltTon(c, name);
  c.S = (text, o) => hmWeltSatz(text, { ...o, font: o.d ? c.fd : c.ft, weight: o.weight || (o.d ? (o.dick ? c.wdk : c.wd) : (o.fett ? c.wtk : c.wt)), ls: o.ls != null ? o.ls : (o.d ? st.ls : 0) });
  return c;
}

/* ---------- SVG-Bausteine ---------- */
function hmWText(c, s, o) {
  const lh = s.size * s.lh;
  const y0 = o.unten != null ? o.unten - (s.z.length - 1) * lh : o.y + s.size * 0.76;
  const stil = {}; if (s.ls) stil.letterSpacing = s.ls + "em"; if (o.tab) stil.fontVariantNumeric = "tabular-nums";
  return <text key={o.key || c.neu()} x={hmWR(o.x)} y={hmWR(y0)} fontFamily={hmWeltFam(s.font)} fontSize={s.size} fontWeight={s.weight} fill={o.fill} textAnchor={o.anchor || "start"} opacity={o.op} style={stil}>{s.z.map((l, i) => <tspan key={i} x={hmWR(o.x)} dy={i ? hmWR(lh) : 0}>{l}</tspan>)}</text>;
}
function hmWPfadRechteck(x, y, w, h) { return `M${hmWR(x)} ${hmWR(y)}h${hmWR(w)}v${hmWR(h)}h${hmWR(-w)}z`; }
function hmWeltBogen(x, y, w, h) { const r = w / 2; return `M${hmWR(x)} ${hmWR(y + r)}A${hmWR(r)} ${hmWR(r)} 0 0 1 ${hmWR(x + w)} ${hmWR(y + r)}L${hmWR(x + w)} ${hmWR(y + h)}L${hmWR(x)} ${hmWR(y + h)}Z`; }
function hmWBild(c, o) {
  const id = c.neu(); const d = o.d || hmWPfadRechteck(o.x, o.y, o.w, o.h);
  return <g key={id}><defs><clipPath id={id}><path d={d} /></clipPath></defs>{o.bg ? <path d={d} fill={o.bg} /> : null}{o.src ? <image href={o.src} x={hmWR(o.x)} y={hmWR(o.y)} width={hmWR(o.w)} height={hmWR(o.h)} preserveAspectRatio={o.pos || "xMidYMid slice"} clipPath={`url(#${id})`} /> : null}</g>;
}
/* Porträt: freigestellt, steht unten auf der Fläche. Ohne Porträt stehen die Initialen, kein Ersatzfoto. */
function hmWPortrait(c, o) {
  const id = c.neu(); const d = o.d || hmWPfadRechteck(o.x, o.y, o.w, o.h); const z = o.zoom || 0.94;
  const kid = [];
  if (o.bg) kid.push(<path key="g" d={d} fill={o.bg} />);
  if (c.b.portrait) { const pw = o.w * z, ph = o.h * z; kid.push(<image key="p" href={c.b.portrait} x={hmWR(o.x + (o.w - pw) / 2)} y={hmWR(o.y + o.h - ph)} width={hmWR(pw)} height={hmWR(ph)} preserveAspectRatio="xMidYMax meet" clipPath={`url(#${id})`} />); }
  else { const s = Math.min(o.w, o.h) * 0.36; kid.push(<text key="m" x={hmWR(o.x + o.w / 2)} y={hmWR(o.y + o.h * 0.58 + s * 0.3)} textAnchor="middle" fontFamily={hmWeltFam(c.fd)} fontSize={hmWR(s)} fontWeight={c.wd} fill={o.fill || c.F.text}>{c.b.initialen || ""}</text>); }
  return <g key={id}><defs><clipPath id={id}><path d={d} /></clipPath></defs>{kid}</g>;
}
/* Wortmarke nach b.logo: wort, punkt (Akzentpunkt nach dem Namen) oder monogramm */
function hmWName(c, o) {
  const b = c.b; const typ = o.typ || b.logo || "wort";
  const vor = b.vor || "", nach = b.nach || "";
  let size = o.size; const ls = -0.015;
  if (typ === "monogramm") {
    const R = size * 0.95, cx = o.anchor === "end" ? o.x - R : o.anchor === "middle" ? o.x : o.x + R, cy = o.y - size * 0.36;
    return <g key={c.neu()}><circle cx={hmWR(cx)} cy={hmWR(cy)} r={hmWR(R)} fill="none" stroke={o.fill} strokeWidth={hmWR(Math.max(1.5, size * 0.06))} /><text x={hmWR(cx)} y={hmWR(cy + size * 0.33)} textAnchor="middle" fontFamily={hmWeltFam(c.fd)} fontSize={hmWR(size * 0.9)} fontWeight={c.wd} fill={o.fill}>{b.initialen || ""}</text><circle cx={hmWR(cx + R * 0.66)} cy={hmWR(cy - R * 0.66)} r={hmWR(R * 0.15)} fill={c.F.akzent} /></g>;
  }
  const wk = typ === "wort" ? c.wdk : c.wd;
  const breite = (s) => hmWeltMiss(vor + " ", c.fd, s, c.wd, ls) + hmWeltMiss(nach, c.fd, s, wk, ls);
  let w = breite(size);
  const dot = typ === "punkt";
  const extra = (s) => (dot ? s * 0.44 : 0);
  if (o.maxW && w + extra(size) > o.maxW) { size = size * o.maxW / (w + extra(size)); w = breite(size); }
  const full = w + extra(size);
  const x0 = o.anchor === "end" ? o.x - full : o.anchor === "middle" ? o.x - full / 2 : o.x;
  return <g key={c.neu()}><text x={hmWR(x0)} y={hmWR(o.y)} fontFamily={hmWeltFam(c.fd)} fontSize={hmWR(size)} fontWeight={c.wd} fill={o.fill} style={{ letterSpacing: ls + "em" }}>{vor + " "}<tspan fontWeight={wk}>{nach}</tspan></text>{dot ? <circle cx={hmWR(x0 + w + size * 0.26)} cy={hmWR(o.y - size * 0.14)} r={hmWR(size * 0.14)} fill={c.F.akzent} /> : null}</g>;
}
/* Mehrere kurze Werte in einer Zeile, getrennt durch Abstand statt Trennzeichen */
function hmWZeile(c, werte, o) {
  let x = o.x; const out = [];
  werte.filter(Boolean).forEach((v) => { const s = c.S(v, { size: o.size, w: 2000, zeilen: 1, fett: o.fett }); out.push(hmWText(c, s, { x, unten: o.y, fill: o.fill, tab: true })); x += hmWeltMiss(v, s.font, s.size, s.weight, 0) + o.gap; });
  return <g key={c.neu()}>{out}</g>;
}
function hmWKontaktBlock(c, o) {
  const k = hmWeltKontakt(c.b); const zeilen = o.zeilen || [k.tel, k.mail, k.web];
  const lh = o.size * 1.38;
  return <g key={c.neu()}>{zeilen.map((z, i) => hmWText(c, c.S(z, { size: o.size, w: o.w, zeilen: 1, min: o.size * 0.86 }), { x: o.x, unten: o.unten - (zeilen.length - 1 - i) * lh, fill: o.fill, tab: true, anchor: o.anchor }))}</g>;
}

/* Weite: Fenster 3:4 mit versetzter Laibung */
function hmWFenster(c, t, o) {
  const d = o.d != null ? o.d : Math.round(c.W * 0.022); const sw = hmWR(Math.max(2, c.W * 0.0028));
  const el = [<rect key="l" x={hmWR(o.x - d)} y={hmWR(o.y + d)} width={hmWR(o.w)} height={hmWR(o.h)} fill="none" stroke={t.akzStrich} strokeWidth={sw} />];
  if (o.src) el.push(hmWBild(c, { x: o.x, y: o.y, w: o.w, h: o.h, src: o.src, bg: t.flaeche }));
  else if (o.portrait) el.push(hmWPortrait(c, { x: o.x, y: o.y, w: o.w, h: o.h, bg: t.flaeche, fill: t.fg, zoom: 0.96 }));
  else el.push(<rect key="f" x={hmWR(o.x)} y={hmWR(o.y)} width={hmWR(o.w)} height={hmWR(o.h)} fill={t.flaeche} stroke={t.linie} strokeWidth={hmWR(Math.max(1.5, c.W * 0.0018))} />);
  return <g key={c.neu()}>{el}</g>;
}
/* Feuilleton: Folio-Zeile mit Name, Rubrik und laufender Nummer */
function hmWFolio(c, t, o) {
  const { W, r } = c; const k = o.k || c.k; const y = o.y;
  return <g key={c.neu()}>
    <line x1={r} x2={W - r} y1={hmWR(y)} y2={hmWR(y)} stroke={t.fg} strokeWidth={hmWR(Math.max(1.5, 2 * k))} />
    {hmWName(c, { x: r, y: y + 44 * k, size: 30 * k, fill: t.fg, maxW: W * 0.36, typ: c.b.logo === "monogramm" ? "wort" : undefined })}
    {o.rubrik ? hmWText(c, c.S(o.rubrik, { size: 22 * k, w: W * 0.26, zeilen: 1 }), { x: W / 2, unten: y + 44 * k, fill: t.akzText, anchor: "middle" }) : null}
    {hmWText(c, c.S(o.rechts || "Nr. " + String(o.nr == null ? 1 : o.nr).padStart(3, "0"), { size: 22 * k, w: W * 0.22, zeilen: 1 }), { x: W - r, unten: y + 44 * k, fill: t.fg, anchor: "end", tab: true })}
  </g>;
}
/* Grätzl: Straßenzug aus geraden Stücken und 45-Grad-Knicken, errechnet aus Name und Bezirk */
function hmWeltStrasse(c, o) {
  const R = hmWeltZufall((c.saat + (o.salz || 0) * 7919) >>> 0);
  const an = o.anflug === "oben" ? { x: o.nach.x, y: o.nach.y - (o.lang || 120) } : o.anflug === "links" ? { x: o.nach.x - (o.lang || 110), y: o.nach.y } : o.anflug === "rechts" ? { x: o.nach.x + (o.lang || 110), y: o.nach.y } : null;
  const ziel = an || o.nach; const n = o.knicke || 3;
  const pts = [o.von];
  for (let i = 1; i <= n; i++) { const f = i / (n + 1) + (R() - 0.5) * 0.1; pts.push({ x: o.von.x + (ziel.x - o.von.x) * f, y: o.band[0] + (o.band[1] - o.band[0]) * R() }); }
  pts.push(ziel); if (an) pts.push(o.nach);
  let d = `M${hmWR(pts[0].x)} ${hmWR(pts[0].y)}`;
  for (let i = 1; i < pts.length; i++) {
    const P = pts[i - 1], Q = pts[i]; const dx = Q.x - P.x, dy = Q.y - P.y; const ax = Math.abs(dx), ay = Math.abs(dy);
    if (ax >= ay) d += ` L${hmWR(P.x + Math.sign(dx) * (ax - ay))} ${hmWR(P.y)}`; else d += ` L${hmWR(P.x)} ${hmWR(P.y + Math.sign(dy) * (ay - ax))}`;
    d += ` L${hmWR(Q.x)} ${hmWR(Q.y)}`;
  }
  return d;
}
function hmWLinie(c, t, o) { return <path key={c.neu()} d={hmWeltStrasse(c, o)} fill="none" stroke={o.farbe || t.akzStrich} strokeWidth={hmWR(o.sw || 16 * c.k)} strokeLinejoin="round" strokeLinecap="round" />; }
function hmWMarke(c, t, x, y, k) { const s = k || c.k; return <g key={c.neu()}><circle cx={hmWR(x)} cy={hmWR(y)} r={hmWR(30 * s)} fill={t.bg} stroke={t.fg} strokeWidth={hmWR(4 * s)} /><circle cx={hmWR(x)} cy={hmWR(y)} r={hmWR(13 * s)} fill={t.fg} /></g>; }
function hmWOrt(c, t, x, y, a, b2, k) {
  const s = k || c.k; const w = Math.max(60, c.W - x - c.r);
  return <g key={c.neu()}>{hmWText(c, c.S(a, { fett: 1, size: 30 * s, w, zeilen: 1 }), { x, unten: y + 10 * s, fill: t.fg })}{b2 ? hmWText(c, c.S(b2, { size: 24 * s, w, zeilen: 1 }), { x, unten: y + 46 * s, fill: t.leise }) : null}</g>;
}
/* Maßstab: Spaltenraster und Schriftfeld */
function hmWRaster(c, t, y1, y2) { const out = []; for (let i = 0; i <= c.sp; i++) { const x = hmWR(c.r + i * c.col); out.push(<line key={i} x1={x} x2={x} y1={hmWR(y1)} y2={hmWR(y2)} stroke={t.linie} strokeWidth={hmWR(Math.max(1, 1.5 * c.k))} />); } return <g key={c.neu()}>{out}</g>; }
function hmWSchriftfeld(c, t, o) {
  const sp = o.spalten || 2; const cw = o.w / sp; const rows = Math.ceil(o.felder.length / sp); const k = o.k || c.k;
  const lab = o.lab || 21 * k, val = o.val || 34 * k, pad = 16 * k;
  const el = [];
  o.felder.forEach(([l, v], i) => {
    const x = o.x + (i % sp) * cw, y = o.y + Math.floor(i / sp) * o.h; const an = i === o.akzent;
    if (an) el.push(<rect key={"a" + i} x={hmWR(x)} y={hmWR(y)} width={hmWR(cw)} height={hmWR(o.h)} fill={c.F.akzent} />);
    el.push(hmWText(c, c.S(l, { size: lab, w: cw - 2 * pad, zeilen: 1 }), { x: x + pad, unten: y + pad + lab * 0.9, fill: an ? c.F.aufAkzent : t.leise, op: an ? 0.82 : undefined }));
    el.push(hmWText(c, c.S(v || "folgt", { fett: 1, size: val, min: val * 0.7, w: cw - 2 * pad, zeilen: 1 }), { x: x + pad, unten: y + o.h - pad * 1.3, fill: an ? c.F.aufAkzent : t.fg, tab: true }));
  });
  const sw = hmWR(Math.max(1.2, 1.6 * k));
  el.push(<rect key="r" x={hmWR(o.x)} y={hmWR(o.y)} width={hmWR(o.w)} height={hmWR(rows * o.h)} fill="none" stroke={t.fg} strokeWidth={sw} />);
  for (let i = 1; i < sp; i++) el.push(<line key={"v" + i} x1={hmWR(o.x + i * cw)} x2={hmWR(o.x + i * cw)} y1={hmWR(o.y)} y2={hmWR(o.y + rows * o.h)} stroke={t.fg} strokeWidth={sw} />);
  for (let i = 1; i < rows; i++) el.push(<line key={"h" + i} x1={hmWR(o.x)} x2={hmWR(o.x + o.w)} y1={hmWR(o.y + i * o.h)} y2={hmWR(o.y + i * o.h)} stroke={t.fg} strokeWidth={sw} />);
  return <g key={c.neu()}>{el}</g>;
}
/* Kontrast: Balken am Beginn der Kante, liegt auf der oberen Fläche */
function hmWBalken(c, oben, y, k) { const s = k || c.k; const w = Math.round(c.r + (c.W - 2 * c.r) / 6); const f = hmWeltKontrast(c.F.akzent, oben.bg) >= 1.5 ? c.F.akzent : oben.akzStrich; return <rect key={c.neu()} x={0} y={hmWR(y - 16 * s)} width={w} height={hmWR(16 * s)} fill={f} />; }
function hmWFakten(c, t, o, x, y, w, k) {
  const s = k || c.k; const f = [["Fläche", o.m2], ["Zimmer", o.zi], ["Preis", o.price]].filter(([, v]) => v); const cw = w / f.length;
  return <g key={c.neu()}>{f.map(([l, v], i) => <g key={i}>{hmWText(c, c.S(l, { size: 22 * s, w: cw - 20 * s, zeilen: 1 }), { x: x + i * cw, unten: y, fill: t.leise })}{hmWText(c, c.S(v, { fett: 1, size: 34 * s, min: 24 * s, w: cw - 20 * s, zeilen: 1 }), { x: x + i * cw, unten: y + 48 * s, fill: t.fg, tab: true })}</g>)}</g>;
}
const hmWGrund = (W, H, f, key) => <rect key={key || "bg"} x={0} y={0} width={W} height={H} fill={f} />;

/* ---------- Zeichner je Welt ---------- */
const HM_WELT_ZEICHNER = {};

HM_WELT_ZEICHNER.ruhig = {
  post(c, p) {
    const { W, H, r } = c; const bw = W - 2 * r;
    const t = c.ton(p.ton || (p.art === "zitat" ? "flaeche" : "grund"));
    const fw = Math.round(W * 0.45), fh = Math.round(fw * 4 / 3), d = Math.round(W * 0.022);
    const fx = p.spiegel ? r + d : W - r - fw, fy = r; const fen = { x: fx, y: fy, w: fw, h: fh, d };
    const y0 = fy + fh + d + 64;
    const el = [hmWGrund(W, H, t.bg)];
    if (p.art === "objekt") {
      const o = p.bild; el.push(hmWFenster(c, t, { ...fen, src: o.img }));
      const s1 = c.S(p.text || o.t, { d: 1, size: 64, min: 42, w: bw, zeilen: 2, lh: 1.06 });
      el.push(hmWText(c, s1, { x: r, y: y0, fill: t.fg }));
      const yb = hmWUnten(s1, y0) + 56;
      el.push(hmWText(c, c.S(p.unter || o.loc, { size: 28, w: bw, zeilen: 1 }), { x: r, unten: yb, fill: t.leise }));
      el.push(hmWText(c, c.S([o.m2, o.zi, o.price].filter(Boolean).join(", "), { size: 28, w: bw, zeilen: 1 }), { x: r, unten: yb + 40, fill: t.fg, tab: true }));
    } else if (p.art === "zahl") {
      el.push(hmWFenster(c, t, fen));
      el.push(hmWText(c, c.S(p.text, { d: 1, size: 330, min: 110, w: fw - 90, zeilen: 1, lh: 1, ls: -0.03 }), { x: fx + 44, unten: fy + fh - 56, fill: t.akz, tab: true }));
      el.push(hmWText(c, c.S(p.unter, { d: 1, size: 60, min: 40, w: bw, zeilen: 4, lh: 1.08 }), { x: r, y: y0, fill: t.fg }));
    } else if (p.art === "zitat") {
      el.push(hmWFenster(c, t, { ...fen, portrait: !!c.b.portrait || !p.bild, src: !c.b.portrait && p.bild ? p.bild.img : null }));
      el.push(hmWText(c, c.S("„" + p.text + "“", { d: 1, size: 84, min: 40, w: bw, zeilen: 5, lh: 1.08, hoehe: H - r - 70 - y0 }), { x: r, y: y0, fill: t.fg }));
    } else if (p.art === "serie") {
      el.push(hmWFenster(c, t, fen));
      el.push(hmWText(c, c.S(hmWeltZwei(p.serie.nr), { d: 1, size: 220, min: 110, w: fw - 90, zeilen: 1, lh: 1 }), { x: fx + 44, y: fy + 48, fill: t.akz, tab: true }));
      el.push(hmWText(c, c.S(p.serie.name, { fett: 1, size: 32, w: fw - 90, zeilen: 2, lh: 1.25 }), { x: fx + 44, unten: fy + fh - 50, fill: t.fg }));
      el.push(hmWText(c, c.S(p.text, { d: 1, size: 70, min: 44, w: bw, zeilen: 4, lh: 1.08 }), { x: r, y: y0, fill: t.fg }));
    } else {
      el.push(hmWFenster(c, t, { ...fen, portrait: p.portrait, src: !p.portrait && p.bild ? p.bild.img : null }));
      el.push(hmWText(c, c.S(p.text, { d: 1, size: 96, min: 46, w: bw, zeilen: 5, lh: 1.06, hoehe: H - r - 70 - y0 }), { x: r, y: y0, fill: t.fg }));
    }
    if (p.art === "zitat") el.push(hmWText(c, c.S(p.unter || hmWeltVoll(c.b), { fett: 1, size: 28, w: W / 2, zeilen: 1 }), { x: r, unten: H - r, fill: t.fg }));
    else el.push(hmWName(c, { x: r, y: H - r, size: 32, fill: t.fg, maxW: W / 2 }));
    el.push(hmWText(c, c.S(c.bez.name, { size: 26, w: W / 3, zeilen: 1 }), { x: W - r, unten: H - r, fill: t.leise, anchor: "end" }));
    return el;
  },
  story(c, p) {
    const { W, H, r } = c; const t = c.ton(p.ton || "grund"); const top = Math.round(H * 0.14), bot = Math.round(H * 0.8);
    const fw = Math.round(W * 0.6), fh = Math.round(fw * 4 / 3), d = Math.round(W * 0.022);
    const el = [hmWGrund(W, H, t.bg), hmWFenster(c, t, { x: W - r - fw, y: top, w: fw, h: fh, d, portrait: p.portrait, src: p.portrait ? null : p.bild && p.bild.img })];
    el.push(hmWText(c, c.S(p.text, { d: 1, size: 74, min: 46, w: W - 2 * r, zeilen: 3, lh: 1.08 }), { x: r, y: top + fh + d + 72, fill: t.fg }));
    el.push(hmWName(c, { x: r, y: bot, size: 34, fill: t.fg, maxW: W / 2 }));
    el.push(hmWText(c, c.S(c.bez.name, { size: 28, w: W / 3, zeilen: 1 }), { x: W - r, unten: bot, fill: t.leise, anchor: "end" }));
    return el;
  },
  karte(c, p) {
    const { W, H } = c; const r = Math.round(W * 0.08);
    if (p.seite === "hinten") {
      const t = c.ton("flaeche"); const fw = 200, fh = 267, fx = W - r - fw, fy = Math.round((H - fh) / 2) - 8;
      return [hmWGrund(W, H, t.bg), hmWFenster(c, t, { x: fx, y: fy, w: fw, h: fh, d: 12 }),
        hmWText(c, c.S(c.b.initialen || "", { d: 1, size: 110, w: fw - 40, zeilen: 1, lh: 1 }), { x: fx + fw / 2, unten: fy + fh - 40, fill: t.akz, anchor: "middle" }),
        hmWText(c, c.S(c.b.claim || "", { d: 1, size: 36, min: 28, w: fx - r - 50, zeilen: 3, lh: 1.12 }), { x: r, y: r, fill: t.fg }),
        hmWName(c, { x: r, y: H - r, size: 38, fill: t.fg, maxW: fx - r - 50 })];
    }
    const t = c.ton("grund"); const fw = 170, fh = 227, fx = W - r - fw;
    return [hmWGrund(W, H, t.bg), hmWFenster(c, t, { x: fx, y: r, w: fw, h: fh, d: 11, portrait: true }),
      hmWName(c, { x: r, y: r + 40, size: 46, fill: t.fg, maxW: fx - r - 40 }),
      hmWText(c, c.S("Immobilien in " + c.bez.name, { size: 27, w: fx - r - 40, zeilen: 2 }), { x: r, y: r + 70, fill: t.leise }),
      hmWKontaktBlock(c, { x: r, unten: H - r, size: 27, w: W - 2 * r, fill: t.fg })];
  },
  signatur(c) {
    const t = c.ton("grund"); const fx = 58, fy = 38, fw = 168, fh = 224; const x = fx + fw + 64;
    return [hmWGrund(c.W, c.H, t.bg), hmWFenster(c, t, { x: fx, y: fy, w: fw, h: fh, d: 10, portrait: true }),
      hmWName(c, { x, y: 104, size: 46, fill: t.fg, maxW: c.W - x - 40 }),
      hmWText(c, c.S(c.b.claim || "", { size: 26, w: c.W - x - 40, zeilen: 1 }), { x, unten: 150, fill: t.leise }),
      hmWZeile(c, [hmWeltKontakt(c.b).tel, hmWeltKontakt(c.b).mail, "unio.at"], { x, y: 226, size: 25, gap: 36, fill: t.fg })];
  },
  expose(c, o) {
    const { W, H, r } = c; const t = c.ton("grund"); const bw = W - 2 * r;
    const fw = Math.round(W * 0.56), fh = Math.round(fw * 4 / 3), fx = W - r - fw, d = Math.round(W * 0.022);
    const el = [hmWGrund(W, H, t.bg), hmWFenster(c, t, { x: fx, y: r, w: fw, h: fh, d, src: o.img })];
    const y0 = r + fh + d + 130;
    const st = c.S(o.t, { d: 1, size: 130, min: 80, w: bw, zeilen: 2, lh: 1.04 });
    el.push(hmWText(c, st, { x: r, y: y0, fill: t.fg }));
    const yl = hmWUnten(st, y0) + 86;
    el.push(hmWText(c, c.S(o.loc, { size: 44, w: bw, zeilen: 1 }), { x: r, unten: yl, fill: t.leise }));
    el.push(hmWFakten(c, t, o, r, yl + 120, bw * 0.72, 1.7));
    el.push(hmWText(c, c.S(hmWeltEnergie(o), { size: 32, w: bw, zeilen: 1 }), { x: r, unten: yl + 290, fill: t.leise }));
    const pw = 210, ph = 280;
    el.push(hmWFenster(c, t, { x: W - r - pw, y: H - r - ph, w: pw, h: ph, d: 14, portrait: true }));
    el.push(hmWKontaktBlock(c, { x: r, unten: H - r, size: 34, w: bw - pw - 60, fill: t.fg, zeilen: [hmWeltVoll(c.b), hmWeltKontakt(c.b).tel, hmWeltKontakt(c.b).mail] }));
    return el;
  },
  zeichen(c) {
    const t = c.ton("grund"); const fw = 180, fh = 240;
    return [hmWGrund(c.W, c.H, t.bg), hmWFenster(c, t, { x: 360, y: 60, w: fw, h: fh, d: 16 }), hmWName(c, { x: 60, y: c.H - 60, size: 30, fill: t.fg, maxW: 220 })];
  },
  probe(c, src) { const t = c.ton("grund"); return [hmWGrund(c.W, c.H, t.bg), hmWFenster(c, t, { x: 120, y: 90, w: 420, h: 560, d: 22, src })]; },
};

HM_WELT_ZEICHNER.editorial = {
  post(c, p) {
    const { W, H, r, col } = c; const bw = W - 2 * r;
    const t = c.ton(p.ton || "grund"); const yF = H - r - 60;
    const el = [hmWGrund(W, H, t.bg), hmWFolio(c, t, { y: yF, rubrik: p.art === "serie" ? p.serie.name : HM_WELT_RUBRIK[p.art], nr: p.nr })];
    if (p.art === "objekt") {
      const o = p.bild; const ph = Math.round(H * 0.5);
      el.push(hmWBild(c, { x: r, y: r, w: bw, h: ph, src: o.img, bg: t.flaeche }));
      el.push(hmWText(c, c.S(`${o.loc}. ${[o.m2, o.zi].filter(Boolean).join(", ")}.`, { size: 22, w: bw, zeilen: 1 }), { x: r, unten: r + ph + 38, fill: t.leise, tab: true }));
      const yT = r + ph + 84; const st = c.S(p.text || o.t, { d: 1, size: 78, min: 50, w: bw, zeilen: 2, lh: 1.02 });
      el.push(hmWText(c, st, { x: r, y: yT, fill: t.fg }));
      el.push(hmWText(c, c.S(o.price, { fett: 1, size: 30, w: bw, zeilen: 1 }), { x: r, unten: hmWUnten(st, yT) + 58, fill: t.fg, tab: true }));
    } else if (p.art === "zahl") {
      const sz = c.S(p.text, { d: 1, dick: 1, size: 460, min: 150, w: bw, zeilen: 1, lh: 1, ls: -0.035 });
      el.push(hmWText(c, sz, { x: r - sz.size * 0.02, y: r + 10, fill: t.fg, tab: true }));
      el.push(hmWText(c, c.S(p.unter, { d: 1, size: 54, min: 36, w: 4 * col, zeilen: 5, lh: 1.1 }), { x: r + 2 * col, unten: yF - 64, fill: t.fg }));
    } else if (p.art === "zitat") {
      el.push(hmWText(c, c.S("„" + p.text + "“", { d: 1, size: 132, min: 46, w: bw, zeilen: 7, lh: 1.04, hoehe: yF - 150 - r }), { x: r, y: r + 20, fill: t.fg }));
      el.push(hmWText(c, c.S(p.unter, { fett: 1, size: 28, w: bw, zeilen: 1 }), { x: r, unten: yF - 56, fill: t.akzText }));
    } else if (p.art === "serie") {
      const sm = c.S(p.serie.name, { d: 1, dick: 1, size: 150, min: 70, w: bw, zeilen: 1, lh: 1, ls: -0.02 });
      el.push(hmWText(c, sm, { x: r, y: r, fill: t.fg }));
      const yL = hmWUnten(sm, r) + 34;
      el.push(<line key="ml" x1={r} x2={W - r} y1={yL} y2={yL} stroke={t.fg} strokeWidth={2} />);
      el.push(hmWText(c, c.S("Folge " + p.serie.nr, { size: 24, w: bw / 2, zeilen: 1 }), { x: r, unten: yL + 42, fill: t.fg }));
      el.push(hmWText(c, c.S(c.bez.name, { size: 24, w: bw / 2, zeilen: 1 }), { x: W - r, unten: yL + 42, fill: t.leise, anchor: "end" }));
      const yB = yL + 76; const yH = yF - 44 - 64 - 60;
      el.push(p.portrait ? hmWPortrait(c, { x: r, y: yB, w: bw, h: yH - 60 - yB, bg: t.flaeche, fill: t.fg }) : hmWBild(c, { x: r, y: yB, w: bw, h: yH - 60 - yB, src: p.bild && p.bild.img, bg: t.flaeche }));
      el.push(hmWText(c, c.S(p.text, { d: 1, size: 60, min: 40, w: bw, zeilen: 2, lh: 1.06 }), { x: r, unten: yF - 44, fill: t.fg }));
    } else {
      const port = p.portrait && !!c.b.portrait; const py = Math.round(H * 0.4);
      el.push(hmWText(c, c.S(p.text, { d: 1, size: port ? 104 : 136, min: 58, w: bw, zeilen: port ? 3 : 6, lh: 1.02, ls: -0.015, hoehe: port ? py - r - 40 : yF - r - (p.unter ? 330 : 100) }), { x: r, y: r + 6, fill: t.fg }));
      if (port) el.push(hmWPortrait(c, { x: W / 2 - 20, y: py, w: W / 2 - r + 20, h: yF - py, fill: t.fg, zoom: 1 }));
      if (p.unter) el.push(hmWText(c, c.S(p.unter, { size: 30, w: port ? 3 * col - 30 : 4 * col, zeilen: 5, lh: 1.4 }), { x: port ? r : r + 2 * col, unten: yF - 56, fill: t.fg }));
    }
    return el;
  },
  story(c, p) {
    const { W, H, r } = c; const t = c.ton(p.ton || "grund"); const top = Math.round(H * 0.14), bot = Math.round(H * 0.8); const bw = W - 2 * r;
    const el = [hmWGrund(W, H, t.bg), hmWName(c, { x: r, y: top + 56, size: 64, fill: t.fg, maxW: bw, typ: c.b.logo === "monogramm" ? "wort" : undefined })];
    el.push(<line key="ml" x1={r} x2={W - r} y1={top + 92} y2={top + 92} stroke={t.fg} strokeWidth={2} />);
    const yB = top + 130, hB = 760;
    el.push(p.portrait ? hmWPortrait(c, { x: r, y: yB, w: bw, h: hB, bg: t.flaeche, fill: t.fg }) : hmWBild(c, { x: r, y: yB, w: bw, h: hB, src: p.bild && p.bild.img, bg: t.flaeche }));
    el.push(hmWText(c, c.S(p.portrait ? hmWeltVoll(c.b) + ", " + c.bez.name : (p.bild && p.bild.loc) || c.bez.name, { size: 24, w: bw, zeilen: 1 }), { x: r, unten: yB + hB + 40, fill: t.leise }));
    el.push(hmWText(c, c.S(p.text, { d: 1, size: 72, min: 46, w: bw, zeilen: 3, lh: 1.04 }), { x: r, y: yB + hB + 90, fill: t.fg }));
    el.push(hmWFolio(c, t, { y: bot - 44, rubrik: "Story", nr: p.nr || 1 }));
    return el;
  },
  karte(c, p) {
    const { W, H } = c; const r = Math.round(W * 0.07);
    if (p.seite === "hinten") {
      const t = c.ton("dunkel");
      return [hmWGrund(W, H, t.bg), hmWText(c, c.S(c.b.claim || "", { d: 1, size: 54, min: 34, w: W - 2 * r, zeilen: 4, lh: 1.06 }), { x: r, y: r, fill: t.fg }),
        hmWFolio(c, t, { y: H - r - 44, rubrik: "", rechts: "Immobilien, " + c.bez.name, k: 0.95 })];
    }
    const t = c.ton("grund");
    return [hmWGrund(W, H, t.bg), hmWName(c, { x: r, y: r + 52, size: 64, fill: t.fg, maxW: W - 2 * r, typ: c.b.logo === "monogramm" ? "wort" : undefined }),
      <line key="ml" x1={r} x2={W - r} y1={r + 96} y2={r + 96} stroke={t.fg} strokeWidth={1.8} />,
      hmWKontaktBlock(c, { x: r, unten: r + 96 + 150, size: 28, w: W - 2 * r, fill: t.fg, zeilen: [hmWeltKontakt(c.b).tel, hmWeltKontakt(c.b).mail] }),
      <line key="fl" x1={r} x2={W - r} y1={H - r - 44} y2={H - r - 44} stroke={t.fg} strokeWidth={1.8} />,
      hmWText(c, c.S("Immobilien, " + c.bez.voll, { size: 26, w: W * 0.6, zeilen: 1 }), { x: r, unten: H - r, fill: t.fg }),
      hmWText(c, c.S("unio.at", { size: 26, w: W * 0.3, zeilen: 1 }), { x: W - r, unten: H - r, fill: t.akzText, anchor: "end" })];
  },
  signatur(c) {
    const t = c.ton("grund"); const k = hmWeltKontakt(c.b); const x = 44;
    return [hmWGrund(c.W, c.H, t.bg), hmWName(c, { x, y: 96, size: 54, fill: t.fg, maxW: 760, typ: c.b.logo === "monogramm" ? "wort" : undefined }),
      <line key="ml" x1={x} x2={c.W - x} y1={128} y2={128} stroke={t.fg} strokeWidth={2} />,
      hmWText(c, c.S(c.b.claim || "", { d: 1, size: 32, w: c.W - 2 * x, zeilen: 1 }), { x, unten: 186, fill: t.fg }),
      hmWZeile(c, [k.tel, k.mail, "unio.at"], { x, y: 246, size: 25, gap: 36, fill: t.fg }),
      hmWText(c, c.S("Immobilien, " + c.bez.voll, { size: 25, w: 380, zeilen: 1 }), { x: c.W - x, unten: 246, fill: t.akzText, anchor: "end" })];
  },
  expose(c, o) {
    const { W, H, r } = c; const t = c.ton("grund"); const bw = W - 2 * r; const k = 1.9;
    const el = [hmWGrund(W, H, t.bg), hmWName(c, { x: r, y: r + 96, size: 110, fill: t.fg, maxW: bw, typ: c.b.logo === "monogramm" ? "wort" : undefined })];
    el.push(<line key="ml" x1={r} x2={W - r} y1={r + 160} y2={r + 160} stroke={t.fg} strokeWidth={3.5} />);
    const yB = r + 230, hB = 1330;
    el.push(hmWBild(c, { x: r, y: yB, w: bw, h: hB, src: o.img, bg: t.flaeche }));
    el.push(hmWText(c, c.S(`${o.loc}. ${[o.m2, o.zi].filter(Boolean).join(", ")}.`, { size: 36, w: bw, zeilen: 1 }), { x: r, unten: yB + hB + 64, fill: t.leise, tab: true }));
    const yT = yB + hB + 150; const st = c.S(o.t, { d: 1, size: 150, min: 90, w: bw, zeilen: 2, lh: 1.02 });
    el.push(hmWText(c, st, { x: r, y: yT, fill: t.fg }));
    const yf = hmWUnten(st, yT) + 150;
    el.push(hmWFakten(c, t, o, r, yf, bw * 0.75, k));
    el.push(hmWText(c, c.S(hmWeltEnergie(o), { size: 34, w: bw, zeilen: 1 }), { x: r, unten: yf + 200, fill: t.leise }));
    el.push(hmWKontaktBlock(c, { x: r, unten: H - r - 150, size: 36, w: bw, fill: t.fg, zeilen: [hmWeltKontakt(c.b).tel + "   " + hmWeltKontakt(c.b).mail] }));
    el.push(hmWFolio(c, t, { y: H - r - 84, rubrik: "Exposé", rechts: "Stand " + hmWeltMonat(), k }));
    return el;
  },
  zeichen(c) {
    const t = c.ton("grund");
    return [hmWGrund(c.W, c.H, t.bg), hmWText(c, c.S("024", { d: 1, dick: 1, size: 170, w: 400, zeilen: 1, lh: 1 }), { x: c.W - c.r, unten: 250, fill: t.fg, anchor: "end", tab: true }), hmWFolio(c, t, { y: 292, rubrik: "Rubrik", nr: 24, k: 0.62 })];
  },
  probe(c, src) {
    const t = c.ton("grund");
    return [hmWGrund(c.W, c.H, t.bg), hmWBild(c, { x: 60, y: 60, w: 480, h: 600, src, bg: t.flaeche }), hmWText(c, c.S("Bildunterschrift mit Ort, " + c.bez.name + ".", { size: 26, w: 480, zeilen: 1 }), { x: 60, unten: 712, fill: t.leise })];
  },
};

HM_WELT_ZEICHNER.graetzl = {
  post(c, p) {
    const { W, H, r } = c; const bw = W - 2 * r;
    const t = c.ton(p.ton || (p.art === "zitat" ? "flaeche" : "grund"));
    const el = [hmWGrund(W, H, t.bg)];
    const weg = (von, nach, band, anflug, salz) => { el.push(hmWLinie(c, t, { von, nach, band, anflug, salz })); el.push(hmWMarke(c, t, nach.x, nach.y)); };
    if (p.art === "objekt") {
      const o = p.bild; const ph = Math.round(H * 0.56); const my = Math.round(H * 0.685), mx = r + 22;
      el.push(hmWBild(c, { x: 0, y: 0, w: W, h: ph, src: o.img, bg: t.flaeche }));
      weg({ x: W + 40, y: ph + 52 }, { x: mx, y: my }, [ph + 40, ph + 70], "oben", p.nr);
      el.push(hmWOrt(c, t, mx + 60, my, o.loc, ""));
      const yT = my + 80; const st = c.S(p.text || o.t, { d: 1, size: 62, min: 42, w: bw, zeilen: 2, lh: 1.02 });
      el.push(hmWText(c, st, { x: r, y: yT, fill: t.fg }));
      el.push(hmWText(c, c.S([o.m2, o.zi, o.price].filter(Boolean).join(", "), { size: 28, w: bw, zeilen: 1 }), { x: r, unten: hmWUnten(st, yT) + 54, fill: t.leise, tab: true }));
    } else if (p.art === "zahl") {
      const sz = c.S(p.text, { d: 1, size: 420, min: 150, w: bw, zeilen: 1, lh: 1, ls: -0.04 });
      el.push(hmWText(c, sz, { x: r - sz.size * 0.03, y: r - 10, fill: t.fg, tab: true }));
      el.push(hmWText(c, c.S(p.unter, { d: 1, size: 54, min: 38, w: bw, zeilen: 4, lh: 1.06 }), { x: r, y: hmWUnten(sz, r - 10) + 70, fill: t.fg }));
      const my = Math.round(H * 0.86), mx = W - r - 300;
      weg({ x: -40, y: H * 0.8 }, { x: mx, y: my }, [H * 0.79, H * 0.9], "links", p.nr);
      el.push(hmWOrt(c, t, mx + 56, my, c.bez.name, c.bez.plz ? c.bez.plz + " Wien" : ""));
    } else if (p.art === "zitat") {
      el.push(hmWText(c, c.S("„" + p.text + "“", { d: 1, size: 104, min: 42, w: bw, zeilen: 7, lh: 1.04, hoehe: H * 0.68 - r }), { x: r, y: r, fill: t.fg }));
      const my = Math.round(H * 0.84), mx = r + 330;
      weg({ x: -40, y: H * 0.76 }, { x: mx, y: my }, [H * 0.74, H * 0.8], "links", p.nr);
      el.push(hmWOrt(c, t, mx + 56, my, p.unter || hmWeltVoll(c.b), c.bez.name));
    } else if (p.art === "serie") {
      const sn = c.S(p.serie.name, { d: 1, size: 110, min: 64, w: bw, zeilen: 2, lh: 1.0 });
      el.push(hmWText(c, sn, { x: r, y: r, fill: t.fg }));
      const y2 = hmWUnten(sn, r) + 64;
      el.push(hmWText(c, c.S("Folge " + p.serie.nr, { fett: 1, size: 30, w: bw, zeilen: 1 }), { x: r, unten: y2, fill: t.akzText }));
      el.push(hmWText(c, c.S(p.text, { d: 1, size: 60, min: 40, w: bw, zeilen: 4, lh: 1.06 }), { x: r, y: y2 + 70, fill: t.fg }));
      const my = Math.round(H * 0.84), mx = W - r - 300;
      weg({ x: -40, y: H * 0.78 }, { x: mx, y: my }, [H * 0.76, H * 0.9], "links", p.nr);
      el.push(hmWOrt(c, t, mx + 56, my, c.bez.name, ""));
    } else if (p.portrait && c.b.portrait) {
      const pw = 470, px = W - r - pw + 30, gy = Math.round(H * 0.8), py = Math.round(H * 0.3);
      el.push(hmWText(c, c.S(p.text, { d: 1, size: 96, min: 50, w: px - r - 30, zeilen: 7, lh: 1.02, hoehe: H * 0.66 - r }), { x: r, y: r, fill: t.fg }));
      el.push(hmWPortrait(c, { x: px, y: py, w: pw, h: gy - py, zoom: 1, fill: t.fg }));
      weg({ x: -40, y: H * 0.72 }, { x: px - 30, y: gy }, [H * 0.7, H * 0.78], "links", p.nr);
      el.push(hmWOrt(c, t, r, gy + 90, c.bez.name, c.bez.plz ? c.bez.plz + " Wien" : ""));
    } else {
      el.push(hmWText(c, c.S(p.text, { d: 1, size: 132, min: 56, w: bw, zeilen: 6, lh: 1.0, hoehe: H * 0.64 - r }), { x: r, y: r, fill: t.fg }));
      const my = Math.round(H * 0.8), mx = W - r - 300;
      weg({ x: -40, y: H * 0.72 }, { x: mx, y: my }, [H * 0.68, H * 0.9], "links", p.nr);
      el.push(hmWOrt(c, t, mx + 56, my, c.bez.name, c.bez.plz ? c.bez.plz + " Wien" : ""));
    }
    return el;
  },
  story(c, p) {
    const { W, H, r } = c; const t = c.ton(p.ton || "grund"); const top = Math.round(H * 0.14); const bw = W - 2 * r;
    const el = [hmWGrund(W, H, t.bg), hmWText(c, c.S(p.text, { d: 1, size: 92, min: 56, w: bw, zeilen: 4, lh: 1.0 }), { x: r, y: top, fill: t.fg })];
    el.push(p.portrait ? hmWPortrait(c, { x: 0, y: 760, w: W, h: 520, bg: t.flaeche, fill: t.fg }) : hmWBild(c, { x: 0, y: 760, w: W, h: 520, src: p.bild && p.bild.img, bg: t.flaeche }));
    const my = 1400, mx = W - r - 320;
    el.push(hmWLinie(c, t, { von: { x: -40, y: 1340 }, nach: { x: mx, y: my }, band: [1330, 1420], anflug: "links" }));
    el.push(hmWMarke(c, t, mx, my));
    el.push(hmWOrt(c, t, mx + 56, my, c.bez.name, hmWeltVoll(c.b)));
    return el;
  },
  karte(c, p) {
    const { W, H } = c; const r = Math.round(W * 0.08); const k = 0.9;
    if (p.seite === "hinten") {
      const t = c.ton("flaeche"); const mx = Math.round(W * 0.6), my = Math.round(H * 0.58);
      return [hmWGrund(W, H, t.bg), hmWName(c, { x: r, y: r + 36, size: 38, fill: t.fg, maxW: W * 0.6 }),
        hmWLinie(c, t, { von: { x: -30, y: H * 0.46 }, nach: { x: mx, y: my }, band: [H * 0.36, H * 0.74], anflug: "links", sw: 13 }),
        hmWMarke(c, t, mx, my, k), hmWOrt(c, t, mx + 46, my, c.bez.name, c.bez.plz ? c.bez.plz + " Wien" : "", k)];
    }
    const t = c.ton("grund"); const a = hmWeltKontakt(c.b).adresse.split(","); const mx = r + 270, my = H - r - 30;
    return [hmWGrund(W, H, t.bg), hmWName(c, { x: r, y: r + 40, size: 46, fill: t.fg, maxW: W - 2 * r }),
      hmWText(c, c.S("Immobilien in " + c.bez.name, { size: 27, w: W - 2 * r, zeilen: 1 }), { x: r, unten: r + 88, fill: t.leise }),
      hmWKontaktBlock(c, { x: r, unten: r + 210, size: 27, w: W - 2 * r, fill: t.fg, zeilen: [hmWeltKontakt(c.b).tel, hmWeltKontakt(c.b).mail] }),
      hmWLinie(c, t, { von: { x: -30, y: my - 60 }, nach: { x: mx, y: my }, band: [my - 80, my - 30], anflug: "links", sw: 12 }),
      hmWMarke(c, t, mx, my, k), hmWOrt(c, t, mx + 46, my, (a[0] || "").trim(), (a[1] || "").trim(), k)];
  },
  signatur(c) {
    const t = c.ton("grund"); const k = hmWeltKontakt(c.b); const x = 44; const mx = 880, my = 250;
    return [hmWGrund(c.W, c.H, t.bg), hmWName(c, { x, y: 92, size: 48, fill: t.fg, maxW: 760 }),
      hmWText(c, c.S(c.b.claim || "", { size: 26, w: 780, zeilen: 1 }), { x, unten: 140, fill: t.leise }),
      hmWZeile(c, [k.tel, k.mail, "unio.at"], { x, y: 196, size: 25, gap: 36, fill: t.fg }),
      hmWLinie(c, t, { von: { x: -20, y: 262 }, nach: { x: mx, y: my }, band: [240, 278], anflug: "links", sw: 10 }),
      hmWMarke(c, t, mx, my, 0.72), hmWOrt(c, t, mx + 38, my - 4, c.bez.name, "", 0.84)];
  },
  expose(c, o) {
    const { W, H, r } = c; const t = c.ton("grund"); const bw = W - 2 * r; const ph = Math.round(H * 0.52); const k = 1.9;
    const el = [hmWGrund(W, H, t.bg), hmWBild(c, { x: 0, y: 0, w: W, h: ph, src: o.img, bg: t.flaeche })];
    const mx = r + 40, my = ph + 250;
    el.push(hmWLinie(c, t, { von: { x: W + 60, y: ph + 90 }, nach: { x: mx, y: my }, band: [ph + 70, ph + 120], anflug: "oben", lang: 110, sw: 30 }));
    el.push(hmWMarke(c, t, mx, my, k)); el.push(hmWOrt(c, t, mx + 100, my, o.loc, "", k));
    const yT = my + 170; const st = c.S(o.t, { d: 1, size: 130, min: 80, w: bw, zeilen: 2, lh: 1.02 });
    el.push(hmWText(c, st, { x: r, y: yT, fill: t.fg }));
    const yf = hmWUnten(st, yT) + 160;
    el.push(hmWFakten(c, t, o, r, yf, bw * 0.8, k));
    el.push(hmWText(c, c.S(hmWeltEnergie(o), { size: 34, w: bw, zeilen: 1 }), { x: r, unten: yf + 200, fill: t.leise }));
    el.push(hmWName(c, { x: r, y: H - r - 110, size: 64, fill: t.fg, maxW: bw * 0.6 }));
    el.push(hmWKontaktBlock(c, { x: r, unten: H - r, size: 34, w: bw, fill: t.fg, zeilen: [hmWeltKontakt(c.b).tel + "   " + hmWeltKontakt(c.b).mail] }));
    return el;
  },
  zeichen(c) {
    const t = c.ton("grund"); const mx = 400, my = 250;
    return [hmWGrund(c.W, c.H, t.bg), hmWLinie(c, t, { von: { x: -20, y: 160 }, nach: { x: mx, y: my }, band: [110, 300], anflug: "links", knicke: 4, sw: 14 }), hmWMarke(c, t, mx, my, 0.9), hmWOrt(c, t, mx + 46, my, c.bez.name, "", 0.9)];
  },
  probe(c, src) { const t = c.ton("grund"); return [hmWGrund(c.W, c.H, t.bg), hmWBild(c, { x: 0, y: 0, w: c.W, h: 560, src, bg: t.flaeche }), hmWLinie(c, t, { von: { x: c.W + 20, y: 610 }, nach: { x: 90, y: 700 }, band: [600, 630], anflug: "oben", lang: 70, sw: 14 }), hmWMarke(c, t, 90, 700, 0.9)]; },
};

HM_WELT_ZEICHNER.klar = {
  post(c, p) {
    const { W, H, r, col } = c; const bw = W - 2 * r;
    const t = c.ton(p.ton || "grund"); const fh = 96, fy = H - r - 2 * fh, fx = r + 2 * col;
    const nr = String(p.nr == null ? 1 : p.nr).padStart(3, "0");
    const el = [hmWGrund(W, H, t.bg), hmWRaster(c, t, r, H - r)];
    let felder = [["Thema", HM_WELT_RUBRIK[p.art]], ["Bezirk", c.bez.name], ["Blatt", nr], ["Stand", hmWeltMonat()]], akz = 0;
    if (p.art === "objekt") {
      const o = p.bild; const ph = Math.round(4 * col);
      el.push(hmWBild(c, { x: r, y: r, w: bw, h: ph, src: o.img, bg: t.flaeche }));
      el.push(hmWText(c, c.S(p.text || o.t, { d: 1, size: 62, min: 42, w: bw - 28, zeilen: 2, lh: 1.02 }), { x: r + 14, y: r + ph + 46, fill: t.fg }));
      felder = [["Fläche", o.m2], ["Zimmer", o.zi], ["Lage", o.loc], ["Preis", o.price]]; akz = 3;
    } else if (p.art === "zahl") {
      const sz = c.S(p.text, { d: 1, dick: 1, size: 470, min: 150, w: bw - 28, zeilen: 1, lh: 1, ls: -0.04 });
      el.push(hmWText(c, sz, { x: r + 6, y: r + 16, fill: t.fg, tab: true }));
      el.push(hmWText(c, c.S(p.unter, { d: 1, size: 56, min: 38, w: 4 * col - 28, zeilen: 5, lh: 1.06 }), { x: fx + 14, y: hmWUnten(sz, r + 16) + 80, fill: t.fg }));
    } else if (p.art === "zitat") {
      el.push(hmWText(c, c.S("„" + p.text + "“", { d: 1, size: 110, min: 42, w: 5 * col - 28, zeilen: 8, lh: 1.04, hoehe: fy - 80 - r }), { x: r + col + 14, y: r + 24, fill: t.fg }));
      felder = [["Stimme", p.unter || hmWeltVoll(c.b)], ["Bezirk", c.bez.name], ["Blatt", nr], ["Thema", HM_WELT_RUBRIK.zitat]];
    } else if (p.art === "serie") {
      const q = 2 * col;
      el.push(<rect key="mq" x={hmWR(r)} y={r} width={hmWR(q)} height={hmWR(q)} fill={c.F.akzent} />);
      el.push(hmWText(c, c.S(hmWeltZwei(p.serie.nr), { d: 1, dick: 1, size: 200, min: 80, w: q - 40, zeilen: 1, lh: 1 }), { x: r + 20, unten: r + q - 26, fill: c.F.aufAkzent, tab: true }));
      el.push(hmWText(c, c.S(p.serie.name, { d: 1, size: 56, min: 36, w: 4 * col - 28, zeilen: 3, lh: 1.04 }), { x: r + q + 14, y: r + 20, fill: t.fg }));
      el.push(hmWText(c, c.S(p.text, { d: 1, size: 70, min: 46, w: bw - 28, zeilen: 5, lh: 1.04 }), { x: r + 14, y: r + q + 60, fill: t.fg }));
      felder = [["Serie", p.serie.name], ["Folge", String(p.serie.nr)], ["Bezirk", c.bez.name], ["Blatt", nr]]; akz = -1;
    } else {
      const port = p.portrait && !!c.b.portrait; const py = Math.round(H * 0.28);
      el.push(hmWText(c, c.S(p.text, { d: 1, size: port ? 96 : 124, min: 50, w: (port ? 3 : 5) * col - 28, zeilen: port ? 8 : 7, lh: 1.02, hoehe: fy - r - 24 - (port || !p.unter ? 60 : 260) }), { x: r + 14, y: r + 24, fill: t.fg }));
      if (port) el.push(hmWPortrait(c, { x: r + 3 * col, y: py, w: 3 * col, h: fy - py, zoom: 1, fill: t.fg }));
      else if (p.unter) el.push(hmWText(c, c.S(p.unter, { size: 30, w: 4 * col - 28, zeilen: 4, lh: 1.35 }), { x: fx + 14, unten: fy - 40, fill: t.fg }));
    }
    el.push(hmWSchriftfeld(c, t, { x: fx, y: fy, w: 4 * col, h: fh, felder, akzent: akz }));
    el.push(hmWName(c, { x: r + 14, y: H - r - 24, size: 30, fill: t.fg, maxW: 2 * col - 28 }));
    return el;
  },
  story(c, p) {
    const { W, H, r, col } = c; const t = c.ton(p.ton || "grund"); const top = Math.round(H * 0.14), bot = Math.round(H * 0.8); const fh = 96;
    const el = [hmWGrund(W, H, t.bg), hmWRaster(c, t, r, H - r)];
    el.push(hmWText(c, c.S(p.text, { d: 1, size: 84, min: 50, w: 5 * col - 28, zeilen: 5, lh: 1.02 }), { x: r + 14, y: top, fill: t.fg }));
    el.push(p.portrait ? hmWPortrait(c, { x: r + 2 * col, y: 740, w: 4 * col, h: bot - 2 * fh - 740, zoom: 1, fill: t.fg }) : hmWBild(c, { x: r, y: 800, w: W - 2 * r, h: 480, src: p.bild && p.bild.img, bg: t.flaeche }));
    el.push(hmWSchriftfeld(c, t, { x: r + 2 * col, y: bot - 2 * fh, w: 4 * col, h: fh, felder: [["Thema", "Story"], ["Bezirk", c.bez.name], ["Name", hmWeltVoll(c.b)], ["Stand", hmWeltMonat()]], akzent: 0 }));
    el.push(hmWName(c, { x: r + 14, y: bot - 24, size: 30, fill: t.fg, maxW: 2 * col - 28 }));
    return el;
  },
  karte(c, p) {
    const { W, H } = c; const r = c.r; const col = c.col;
    if (p.seite === "hinten") {
      const t = c.ton("grund"); const q = 2 * col;
      return [hmWGrund(W, H, t.bg), hmWRaster(c, t, r, H - r), <rect key="mq" x={hmWR(r + 4 * col)} y={hmWR(H - r - q)} width={hmWR(q)} height={hmWR(q)} fill={c.F.akzent} />,
        hmWText(c, c.S(c.b.initialen || "", { d: 1, dick: 1, size: 96, w: q - 30, zeilen: 1, lh: 1 }), { x: r + 4 * col + 16, unten: H - r - 20, fill: c.F.aufAkzent }),
        hmWName(c, { x: r + 12, y: r + 50, size: 44, fill: t.fg, maxW: 4 * col - 24 }),
        hmWText(c, c.S("Immobilien in " + c.bez.name, { size: 27, w: 4 * col - 24, zeilen: 2 }), { x: r + 12, y: r + 76, fill: t.leise })];
    }
    const t = c.ton("grund"); const kk = hmWeltKontakt(c.b); const fh = 88;
    return [hmWGrund(W, H, t.bg), hmWRaster(c, t, r, H - r), hmWName(c, { x: r + 12, y: r + 56, size: 50, fill: t.fg, maxW: 6 * col - 24 }),
      hmWText(c, c.S("Immobilien in " + c.bez.name, { size: 27, w: 6 * col - 24, zeilen: 1 }), { x: r + 12, unten: r + 104, fill: t.leise }),
      hmWSchriftfeld(c, t, { x: r, y: H - r - 2 * fh, w: 6 * col, h: fh, felder: [["Telefon", kk.tel], ["E-Mail", kk.mail], ["Bezirk", c.bez.voll], ["Netzwerk", "UNIO, unio.at"]], akzent: 3, lab: 25, val: 29, k: 0.8 })];
  },
  signatur(c) {
    const t = c.ton("grund"); const k = hmWeltKontakt(c.b); const x = 40, y = 40, w = c.W - 80, h = 220, lw = 430;
    return [hmWGrund(c.W, c.H, t.bg), <rect key="sf" x={x} y={y} width={w} height={h} fill="none" stroke={t.fg} strokeWidth={1.6} />, <line key="sv" x1={x + lw} x2={x + lw} y1={y} y2={y + h} stroke={t.fg} strokeWidth={1.6} />,
      hmWName(c, { x: x + 20, y: y + 86, size: 44, fill: t.fg, maxW: lw - 40 }),
      hmWText(c, c.S("Immobilien in " + c.bez.name, { size: 24, w: lw - 40, zeilen: 2 }), { x: x + 20, y: y + 118, fill: t.leise }),
      hmWSchriftfeld(c, t, { x: x + lw, y, w: w - lw, h: h / 2, felder: [["Telefon", k.tel], ["E-Mail", k.mail], ["Bezirk", c.bez.voll], ["Netzwerk", "UNIO, unio.at"]], akzent: 0, lab: 20, val: 27, k: 0.9 })];
  },
  expose(c, o) {
    const { W, H, r, col } = c; const t = c.ton("grund"); const bw = W - 2 * r;
    const el = [hmWGrund(W, H, t.bg), hmWRaster(c, t, r, H - r)];
    const ph = 1560;
    el.push(hmWBild(c, { x: r, y: r, w: bw, h: ph, src: o.img, bg: t.flaeche }));
    const st = c.S(o.t, { d: 1, size: 130, min: 80, w: bw - 40, zeilen: 2, lh: 1.02 });
    el.push(hmWText(c, st, { x: r + 20, y: r + ph + 90, fill: t.fg }));
    el.push(hmWText(c, c.S(o.loc, { size: 44, w: bw - 40, zeilen: 1 }), { x: r + 20, unten: hmWUnten(st, r + ph + 90) + 80, fill: t.leise }));
    const fh = 170, fy = H - r - 2 * fh;
    el.push(hmWSchriftfeld(c, t, { x: r + 2 * col, y: fy, w: 4 * col, h: fh, spalten: 3, felder: [["Fläche", o.m2], ["Zimmer", o.zi], ["Preis", o.price], ["Lage", o.loc], ["HWB", o.hwb ? o.hwb + " kWh/m²a" : "folgt"], ["Klasse", o.klasse || "folgt"]], akzent: 2, lab: 34, val: 50, k: 1.8 }));
    el.push(hmWName(c, { x: r + 20, y: fy + 60, size: 56, fill: t.fg, maxW: 2 * col - 40 }));
    el.push(hmWKontaktBlock(c, { x: r + 20, unten: H - r - 30, size: 32, w: 2 * col - 40, fill: t.fg }));
    return el;
  },
  zeichen(c) {
    const t = c.ton("grund");
    return [hmWGrund(c.W, c.H, t.bg), hmWRaster(c, t, 30, c.H - 30), hmWSchriftfeld(c, t, { x: c.r + 2 * c.col, y: 190, w: 4 * c.col, h: 80, felder: [["Fläche", "96 m²"], ["Zimmer", "3 Zi"], ["Lage", c.bez.name], ["Preis", "€ 890.000"]], akzent: 3, lab: 16, val: 24, k: 0.6 })];
  },
  probe(c, src) { const t = c.ton("grund"); return [hmWGrund(c.W, c.H, t.bg), hmWRaster(c, t, 0, c.H), hmWBild(c, { x: c.r, y: 90, w: c.W - 2 * c.r, h: 540, src, bg: t.flaeche })]; },
};

HM_WELT_ZEICHNER.warm = {
  post(c, p) {
    const { W, H, r } = c; const bw = W - 2 * r;
    const t = c.ton(p.ton || (p.art === "zahl" ? "flaeche" : p.art === "zitat" ? "akzent" : "grund"));
    const tint = hmWeltMisch(c.F.flaeche, c.F.akzent, 0.16);
    const el = [hmWGrund(W, H, t.bg)];
    if (p.art === "objekt") {
      const o = p.bild; const aw = 600, ah = 840; const fx = r + aw + 48, fw = W - r - fx;
      el.push(hmWBild(c, { x: r, y: r, w: aw, h: ah, d: hmWeltBogen(r, r, aw, ah), src: o.img, bg: t.flaeche }));
      let yy = r + ah;
      [o.price, o.zi, o.m2].filter(Boolean).forEach((f) => { const s = c.S(f, { d: 1, size: 44, min: 26, w: fw, zeilen: 1, lh: 1.05 }); el.push(hmWText(c, s, { x: fx, unten: yy, fill: t.fg, tab: true })); yy -= (s.z.length - 1) * s.size * s.lh + 74; });
      const st = c.S(p.text || o.t, { d: 1, size: 62, min: 42, w: bw, zeilen: 2, lh: 1.04 });
      el.push(hmWText(c, st, { x: r, y: r + ah + 58, fill: t.fg }));
      el.push(hmWText(c, c.S(o.loc, { size: 28, w: bw, zeilen: 1 }), { x: r, unten: hmWUnten(st, r + ah + 58) + 52, fill: t.leise }));
    } else if (p.art === "zahl") {
      const aw = 620, ah = 868;
      el.push(<path key="zb" d={hmWeltBogen(r, r, aw, ah)} fill={c.F.akzent} />);
      el.push(hmWText(c, c.S(p.text, { d: 1, size: 320, min: 110, w: aw - 100, zeilen: 1, lh: 1, ls: -0.03 }), { x: r + 50, unten: r + ah - 70, fill: c.F.aufAkzent, tab: true }));
      el.push(hmWText(c, c.S(p.unter, { d: 1, size: 50, min: 34, w: bw, zeilen: 3, lh: 1.08 }), { x: r, y: r + ah + 56, fill: t.fg }));
      el.push(hmWName(c, { x: r, y: H - r, size: 30, fill: t.fg, maxW: W / 2 }));
    } else if (p.art === "zitat") {
      const aw = 230, ah = 322, ax = W - r - aw, ay = H - r - ah;
      el.push(hmWText(c, c.S("„" + p.text + "“", { d: 1, size: 112, min: 44, w: bw, zeilen: 8, lh: 1.06, hoehe: ay - 60 - r }), { x: r, y: r, fill: t.fg }));
      el.push(hmWPortrait(c, { x: ax, y: ay, w: aw, h: ah, d: hmWeltBogen(ax, ay, aw, ah), bg: hmWeltMisch(c.F.grund, c.F.akzent, 0.1), zoom: 0.92, fill: c.F.text }));
      el.push(hmWText(c, c.S(p.unter || hmWeltVoll(c.b), { fett: 1, size: 30, w: ax - r - 40, zeilen: 2 }), { x: r, unten: H - r - 40, fill: t.fg }));
      el.push(hmWText(c, c.S(c.bez.name, { size: 26, w: ax - r - 40, zeilen: 1 }), { x: r, unten: H - r, fill: t.leise }));
    } else if (p.art === "serie") {
      const aw = 420, ah = 588; const sx = r + aw + 48;
      el.push(<path key="sb" d={hmWeltBogen(r, r, aw, ah)} fill="none" stroke={t.fg} strokeWidth={3} />);
      el.push(hmWText(c, c.S(hmWeltZwei(p.serie.nr), { d: 1, size: 220, min: 100, w: aw - 80, zeilen: 1, lh: 1 }), { x: r + aw / 2, unten: r + ah - 70, fill: t.akz, anchor: "middle", tab: true }));
      el.push(hmWText(c, c.S(p.serie.name, { d: 1, size: 54, min: 36, w: W - r - sx, zeilen: 3, lh: 1.04 }), { x: sx, unten: r + ah, fill: t.fg }));
      el.push(hmWText(c, c.S(p.text, { d: 1, size: 70, min: 46, w: bw, zeilen: 4, lh: 1.06 }), { x: r, y: r + ah + 70, fill: t.fg }));
      el.push(hmWName(c, { x: r, y: H - r, size: 30, fill: t.fg, maxW: W / 2 }));
    } else {
      const aw = 500, ah = 700, ax = W - r - aw, ay = H - r - ah; const d = hmWeltBogen(ax, ay, aw, ah);
      el.push(hmWText(c, c.S(p.text, { d: 1, size: 104, min: 50, w: bw, zeilen: 5, lh: 1.04, hoehe: ay - 50 - r }), { x: r, y: r, fill: t.fg }));
      el.push(p.portrait || !p.bild ? hmWPortrait(c, { x: ax, y: ay, w: aw, h: ah, d, bg: tint, zoom: 0.9, fill: t.fg }) : hmWBild(c, { x: ax, y: ay, w: aw, h: ah, d, src: p.bild.img, bg: t.flaeche }));
      if (p.unter) el.push(hmWText(c, c.S(p.unter, { size: 28, w: ax - r - 44, zeilen: 6, lh: 1.4 }), { x: r, unten: H - r - 70, fill: t.fg }));
      el.push(hmWName(c, { x: r, y: H - r, size: 30, fill: t.fg, maxW: ax - r - 40 }));
    }
    return el;
  },
  story(c, p) {
    const { W, H, r } = c; const t = c.ton(p.ton || "grund"); const top = Math.round(H * 0.14), bot = Math.round(H * 0.8);
    const aw = 680, ah = 952, ax = (W - aw) / 2; const d = hmWeltBogen(ax, top, aw, ah);
    const el = [hmWGrund(W, H, t.bg), p.portrait ? hmWPortrait(c, { x: ax, y: top, w: aw, h: ah, d, bg: hmWeltMisch(c.F.flaeche, c.F.akzent, 0.16), zoom: 0.9, fill: t.fg }) : hmWBild(c, { x: ax, y: top, w: aw, h: ah, d, src: p.bild && p.bild.img, bg: t.flaeche })];
    el.push(hmWText(c, c.S(p.text, { d: 1, size: 70, min: 46, w: W - 2 * r, zeilen: 3, lh: 1.06 }), { x: r, y: top + ah + 56, fill: t.fg }));
    el.push(hmWName(c, { x: r, y: bot, size: 32, fill: t.fg, maxW: W / 2 }));
    return el;
  },
  karte(c, p) {
    const { W, H } = c; const r = Math.round(W * 0.09);
    if (p.seite === "hinten") {
      const t = c.ton("akzent"); const aw = 200, ah = 280, ax = (W - aw) / 2, ay = 70;
      return [hmWGrund(W, H, t.bg), <path key="hb" d={hmWeltBogen(ax, ay, aw, ah)} fill="none" stroke={t.fg} strokeWidth={4} />,
        hmWText(c, c.S(c.b.initialen || "", { d: 1, size: 92, w: aw - 40, zeilen: 1, lh: 1 }), { x: W / 2, unten: ay + ah - 50, fill: t.fg, anchor: "middle" }),
        hmWName(c, { x: W / 2, y: H - r + 10, size: 36, fill: t.fg, anchor: "middle", maxW: W - 2 * r })];
    }
    const t = c.ton("grund"); const ah = H - 2 * r, aw = Math.round(ah * 5 / 7); const x = r + aw + 44; const w = W - r - x;
    return [hmWGrund(W, H, t.bg), hmWPortrait(c, { x: r, y: r, w: aw, h: ah, d: hmWeltBogen(r, r, aw, ah), bg: hmWeltMisch(c.F.flaeche, c.F.akzent, 0.16), zoom: 0.92, fill: t.fg }),
      hmWName(c, { x, y: r + 40, size: 44, fill: t.fg, maxW: w }),
      hmWText(c, c.S(c.b.claim || "", { size: 26, w, zeilen: 3, lh: 1.3 }), { x, y: r + 70, fill: t.leise }),
      hmWKontaktBlock(c, { x, unten: H - r, size: 27, w, fill: t.fg })];
  },
  signatur(c) {
    const t = c.ton("grund"); const k = hmWeltKontakt(c.b); const ax = 56, ay = 30, aw = 172, ah = 240; const x = ax + aw + 60;
    return [hmWGrund(c.W, c.H, t.bg), hmWPortrait(c, { x: ax, y: ay, w: aw, h: ah, d: hmWeltBogen(ax, ay, aw, ah), bg: hmWeltMisch(c.F.flaeche, c.F.akzent, 0.16), zoom: 0.92, fill: t.fg }),
      hmWName(c, { x, y: 104, size: 46, fill: t.fg, maxW: c.W - x - 40 }),
      hmWText(c, c.S(c.b.claim || "", { size: 26, w: c.W - x - 40, zeilen: 1 }), { x, unten: 150, fill: t.leise }),
      hmWZeile(c, [k.tel, k.mail, "unio.at"], { x, y: 226, size: 25, gap: 36, fill: t.fg })];
  },
  expose(c, o) {
    const { W, H, r } = c; const t = c.ton("grund"); const bw = W - 2 * r;
    const aw = 1100, ah = 1540; const fx = r + aw + 90, fw = W - r - fx;
    const el = [hmWGrund(W, H, t.bg), hmWBild(c, { x: r, y: r, w: aw, h: ah, d: hmWeltBogen(r, r, aw, ah), src: o.img, bg: t.flaeche })];
    let yy = r + ah;
    [o.price, o.zi, o.m2].filter(Boolean).forEach((f) => { const s = c.S(f, { d: 1, size: 84, min: 48, w: fw, zeilen: 1, lh: 1.05 }); el.push(hmWText(c, s, { x: fx, unten: yy, fill: t.fg, tab: true })); yy -= (s.z.length - 1) * s.size * s.lh + 130; });
    const yT = r + ah + 130; const st = c.S(o.t, { d: 1, size: 130, min: 80, w: bw, zeilen: 2, lh: 1.04 });
    el.push(hmWText(c, st, { x: r, y: yT, fill: t.fg }));
    const yl = hmWUnten(st, yT) + 90;
    el.push(hmWText(c, c.S(o.loc, { size: 44, w: bw, zeilen: 1 }), { x: r, unten: yl, fill: t.leise }));
    el.push(hmWText(c, c.S(hmWeltEnergie(o), { size: 34, w: bw, zeilen: 1 }), { x: r, unten: yl + 70, fill: t.leise }));
    const pw = 260, ph = 364, px = W - r - pw, py = H - r - ph;
    el.push(hmWPortrait(c, { x: px, y: py, w: pw, h: ph, d: hmWeltBogen(px, py, pw, ph), bg: hmWeltMisch(c.F.flaeche, c.F.akzent, 0.16), zoom: 0.92, fill: t.fg }));
    el.push(hmWName(c, { x: r, y: H - r - 170, size: 64, fill: t.fg, maxW: px - r - 60 }));
    el.push(hmWKontaktBlock(c, { x: r, unten: H - r, size: 34, w: px - r - 60, fill: t.fg, zeilen: [hmWeltKontakt(c.b).tel, hmWeltKontakt(c.b).mail] }));
    return el;
  },
  zeichen(c) {
    const t = c.ton("grund");
    return [hmWGrund(c.W, c.H, t.bg), <path key="z1" d={hmWeltBogen(150, 60, 150, 210)} fill={c.F.akzent} />, <path key="z2" d={hmWeltBogen(330, 60, 150, 210)} fill="none" stroke={t.fg} strokeWidth={3} />, hmWName(c, { x: 150, y: 340, size: 28, fill: t.fg, maxW: 330 })];
  },
  probe(c, src) { const t = c.ton("grund"); return [hmWGrund(c.W, c.H, t.bg), hmWBild(c, { x: 100, y: 60, w: 400, h: 560, d: hmWeltBogen(100, 60, 400, 560), src, bg: t.flaeche })]; },
};

HM_WELT_ZEICHNER.kontrast = {
  post(c, p) {
    const { W, H, r, col } = c; const bw = W - 2 * r; const yK = Math.round(H * 0.618);
    const inv = p.art === "zitat" || p.art === "serie";
    const oben = c.ton(inv ? "grund" : "flaeche"), unten = c.ton(inv ? "flaeche" : "grund");
    const el = [hmWGrund(W, H, unten.bg, "u"), <rect key="o" x={0} y={0} width={W} height={yK} fill={oben.bg} />];
    const fuss = () => { el.push(hmWName(c, { x: r, y: H - r, size: 32, fill: unten.fg, maxW: W / 2 })); el.push(hmWText(c, c.S(c.bez.name, { size: 26, w: W / 3, zeilen: 1 }), { x: W - r, unten: H - r, fill: unten.leise, anchor: "end" })); };
    if (p.art === "objekt") {
      const o = p.bild;
      el.push(hmWBild(c, { x: 0, y: 0, w: W, h: yK, src: o.img, bg: oben.bg }));
      el.push(hmWBalken(c, oben, yK));
      const st = c.S(p.text || o.t, { d: 1, size: 66, min: 44, w: bw, zeilen: 2, lh: 1.02 });
      el.push(hmWText(c, st, { x: r, y: yK + 60, fill: unten.fg }));
      el.push(hmWText(c, c.S(o.loc, { size: 26, w: bw, zeilen: 1 }), { x: r, unten: hmWUnten(st, yK + 60) + 50, fill: unten.leise }));
      el.push(hmWFakten(c, unten, o, r, H - r - 48, bw, 1));
    } else if (p.art === "zahl") {
      const sz = c.S(p.text, { d: 1, size: 520, min: 170, w: bw, zeilen: 1, lh: 1, ls: -0.04 });
      el.push(hmWText(c, sz, { x: r - sz.size * 0.03, unten: yK - 40, fill: oben.fg, tab: true }));
      el.push(hmWBalken(c, oben, yK));
      el.push(hmWText(c, c.S(p.unter, { d: 1, size: 54, min: 36, w: bw, zeilen: 4, lh: 1.06 }), { x: r, y: yK + 64, fill: unten.fg }));
      fuss();
    } else if (p.art === "zitat") {
      el.push(hmWText(c, c.S("„" + p.text + "“", { d: 1, size: 112, min: 42, w: bw, zeilen: 8, lh: 1.02, hoehe: yK - 56 - r - 20 }), { x: r, unten: yK - 56, fill: oben.fg }));
      el.push(hmWBalken(c, oben, yK));
      el.push(hmWText(c, c.S(p.unter || hmWeltVoll(c.b), { fett: 1, size: 32, w: bw, zeilen: 1 }), { x: r, unten: yK + 96, fill: unten.fg }));
      el.push(hmWText(c, c.S(c.bez.name, { size: 26, w: bw, zeilen: 1 }), { x: r, unten: yK + 138, fill: unten.leise }));
      el.push(hmWName(c, { x: r, y: H - r, size: 32, fill: unten.fg, maxW: W / 2 }));
    } else if (p.art === "serie") {
      el.push(hmWText(c, c.S(p.serie.name, { d: 1, size: 64, min: 40, w: bw * 0.5, zeilen: 3, lh: 1.04 }), { x: r, y: r, fill: oben.fg }));
      const nf = hmWeltKontrast(c.F.akzent, oben.bg) >= 3 ? c.F.akzent : oben.fg;
      el.push(hmWText(c, c.S(hmWeltZwei(p.serie.nr), { d: 1, size: 440, min: 160, w: bw * 0.62, zeilen: 1, lh: 1, ls: -0.04 }), { x: W - r, unten: yK - 40, fill: nf, anchor: "end", tab: true }));
      el.push(hmWBalken(c, oben, yK));
      el.push(hmWText(c, c.S(p.text, { d: 1, size: 60, min: 40, w: bw, zeilen: 4, lh: 1.06 }), { x: r, y: yK + 64, fill: unten.fg }));
      el.push(hmWName(c, { x: r, y: H - r, size: 32, fill: unten.fg, maxW: W / 2 }));
    } else {
      const port = p.portrait && !!c.b.portrait; const pw = 470;
      if (port) el.push(hmWPortrait(c, { x: W - r - pw + 20, y: Math.round(H * 0.1), w: pw, h: yK - Math.round(H * 0.1), zoom: 1, fill: oben.fg }));
      el.push(hmWText(c, c.S(p.text, { d: 1, size: port ? 92 : 136, min: 50, w: port ? bw - pw - 10 : bw, zeilen: port ? 7 : 6, lh: 1.0, hoehe: yK - 50 - r - 20 }), { x: r, unten: yK - 50, fill: oben.fg }));
      el.push(hmWBalken(c, oben, yK));
      if (p.unter) el.push(hmWText(c, c.S(p.unter, { size: 34, w: 8 * col, zeilen: 4, lh: 1.35 }), { x: r, y: yK + 64, fill: unten.fg }));
      fuss();
    }
    return el;
  },
  story(c, p) {
    const { W, H, r } = c; const yK = Math.round(H * 0.618); const bot = Math.round(H * 0.8);
    const oben = c.ton("flaeche"), unten = c.ton("grund");
    const el = [hmWGrund(W, H, unten.bg, "u"), <rect key="o" x={0} y={0} width={W} height={yK} fill={oben.bg} />];
    el.push(p.portrait ? hmWPortrait(c, { x: 0, y: Math.round(H * 0.12), w: W, h: yK - Math.round(H * 0.12), zoom: 1, fill: oben.fg }) : hmWBild(c, { x: 0, y: 0, w: W, h: yK, src: p.bild && p.bild.img, bg: oben.bg }));
    el.push(hmWBalken(c, oben, yK));
    el.push(hmWText(c, c.S(p.text, { d: 1, size: 76, min: 48, w: W - 2 * r, zeilen: 3, lh: 1.04 }), { x: r, y: yK + 70, fill: unten.fg }));
    el.push(hmWName(c, { x: r, y: bot, size: 34, fill: unten.fg, maxW: W / 2 }));
    return el;
  },
  karte(c, p) {
    const { W, H } = c; const r = Math.round(W * 0.07); const yK = Math.round(H * 0.618);
    if (p.seite === "hinten") {
      const oben = c.ton("grund"), unten = c.ton("flaeche");
      return [hmWGrund(W, H, unten.bg, "u"), <rect key="o" x={0} y={0} width={W} height={yK} fill={oben.bg} />,
        hmWText(c, c.S(c.b.claim || "", { d: 1, size: 44, min: 30, w: W - 2 * r, zeilen: 3, lh: 1.04 }), { x: r, unten: yK - 34, fill: oben.fg }), hmWBalken(c, oben, yK, 0.8),
        hmWText(c, c.S("Partner von UNIO, unio.at", { size: 26, w: W - 2 * r, zeilen: 1 }), { x: r, unten: H - r + 6, fill: unten.leise })];
    }
    const oben = c.ton("flaeche"), unten = c.ton("grund");
    return [hmWGrund(W, H, unten.bg, "u"), <rect key="o" x={0} y={0} width={W} height={yK} fill={oben.bg} />,
      hmWName(c, { x: r, y: yK - 36, size: 58, fill: oben.fg, maxW: W - 2 * r }), hmWBalken(c, oben, yK, 0.8),
      hmWKontaktBlock(c, { x: r, unten: H - r + 8, size: 27, w: W * 0.55, fill: unten.fg }),
      hmWText(c, c.S(c.bez.voll, { size: 27, w: W * 0.35, zeilen: 1 }), { x: W - r, unten: H - r + 8, fill: unten.leise, anchor: "end" })];
  },
  signatur(c) {
    const k = hmWeltKontakt(c.b); const yK = Math.round(c.H * 0.618); const x = 44;
    const oben = c.ton("flaeche"), unten = c.ton("grund");
    return [hmWGrund(c.W, c.H, unten.bg, "u"), <rect key="o" x={0} y={0} width={c.W} height={yK} fill={oben.bg} />,
      hmWName(c, { x, y: yK - 34, size: 58, fill: oben.fg, maxW: 700 }), hmWText(c, c.S(c.b.claim || "", { size: 25, w: 420, zeilen: 2, lh: 1.25 }), { x: c.W - x, unten: yK - 34, fill: oben.leise, anchor: "end" }), hmWBalken(c, oben, yK, 0.8),
      hmWZeile(c, [k.tel, k.mail, "unio.at"], { x, y: yK + 70, size: 25, gap: 36, fill: unten.fg })];
  },
  expose(c, o) {
    const { W, H, r } = c; const bw = W - 2 * r; const yK = Math.round(H * 0.618);
    const oben = c.ton("flaeche"), unten = c.ton("grund"); const k = 1.9;
    const el = [hmWGrund(W, H, unten.bg, "u"), hmWBild(c, { x: 0, y: 0, w: W, h: yK, src: o.img, bg: oben.bg }), hmWBalken(c, oben, yK, k)];
    const st = c.S(o.t, { d: 1, size: 130, min: 80, w: bw, zeilen: 2, lh: 1.02 });
    el.push(hmWText(c, st, { x: r, y: yK + 120, fill: unten.fg }));
    const yl = hmWUnten(st, yK + 120) + 90;
    el.push(hmWText(c, c.S(o.loc, { size: 44, w: bw, zeilen: 1 }), { x: r, unten: yl, fill: unten.leise }));
    el.push(hmWFakten(c, unten, o, r, yl + 150, bw * 0.8, k));
    el.push(hmWText(c, c.S(hmWeltEnergie(o), { size: 34, w: bw, zeilen: 1 }), { x: r, unten: yl + 330, fill: unten.leise }));
    el.push(hmWName(c, { x: r, y: H - r - 60, size: 60, fill: unten.fg, maxW: bw * 0.5 }));
    el.push(hmWKontaktBlock(c, { x: W - r, unten: H - r - 60, size: 34, w: bw * 0.45, fill: unten.fg, anchor: "end", zeilen: [hmWeltKontakt(c.b).tel, hmWeltKontakt(c.b).mail] }));
    return el;
  },
  zeichen(c) {
    const yK = Math.round(c.H * 0.618); const oben = c.ton("flaeche"), unten = c.ton("grund");
    return [hmWGrund(c.W, c.H, unten.bg, "u"), <rect key="o" x={0} y={0} width={c.W} height={yK} fill={oben.bg} />, hmWName(c, { x: c.r, y: yK - 26, size: 40, fill: oben.fg, maxW: c.W - 2 * c.r }), hmWBalken(c, oben, yK, 0.7), hmWText(c, c.S("Nur Fakten", { size: 22, w: 300, zeilen: 1 }), { x: c.r, unten: yK + 60, fill: unten.leise })];
  },
  probe(c, src) { const yK = Math.round(c.H * 0.618); const oben = c.ton("flaeche"), unten = c.ton("grund"); return [hmWGrund(c.W, c.H, unten.bg, "u"), hmWBild(c, { x: 0, y: 0, w: c.W, h: yK, src, bg: oben.bg }), hmWBalken(c, oben, yK, 0.9)]; },
};

/* ---------- Daten für einen Post normalisieren ---------- */
function hmWeltPostDaten(welt, b, p, i) {
  const w = hmWeltHol(welt); const st = HM_WELT_STIL[w.id];
  const art = HM_WELT_ARTEN.includes(p.art) ? p.art : "hook";
  const hooks = (b.w && b.w.hooks && b.w.hooks.length) ? b.w.hooks : HM_WELT_HOOKS;
  const idx = i || 0;
  let bild = null;
  if (p.bild != null && p.bild !== "" && !(b.portrait && p.bild === b.portrait)) bild = hmWeltObjekt(p.bild, w);
  else if (art === "objekt") bild = hmWeltObjekt(0, w);
  else if (art === "serie") bild = hmWeltObjekt(1, w);
  const sr = p.serie;
  const serie = art === "serie" || sr ? { name: (typeof sr === "string" ? sr : sr && sr.name) || st.serie, nr: (sr && typeof sr === "object" && sr.nr) || p.folge || 1 } : null;
  const leer = (v) => v == null || v === "";
  const text = !leer(p.text) ? p.text : !leer(p.hook) ? p.hook : art === "zahl" ? "3" : art === "zitat" ? (b.claim || "") : art === "objekt" ? (bild ? bild.t : "") : hooks[idx % hooks.length];
  const unter = !leer(p.unter) ? p.unter : !leer(p.titel) && art !== "objekt" ? p.titel : art === "zahl" ? "Fehler, die ich bei fast jedem Verkauf sehe." : art === "zitat" ? hmWeltVoll(b) : art === "objekt" ? (bild ? bild.loc : "") : "";
  return { ...p, art, text, unter, bild, serie, nr: p.nr != null ? p.nr : 24 - idx, portrait: !!p.portrait || (!!b.portrait && p.bild === b.portrait), spiegel: !!p.spiegel };
}
/* Feed: Muster der Welt, Inhalte ohne art (z. B. Serienbeispiele aus der Plattform) füllen die Schriftplätze */
function hmWeltFeedPosts(welt, b, posts) {
  const w = hmWeltHol(welt); const muster = HM_WELT_STIL[w.id].feed.map((f) => ({ ...f }));
  const liste = Array.isArray(posts) ? posts.filter(Boolean) : [];
  const mitArt = liste.filter((x) => HM_WELT_ARTEN.includes(x.art)); const ohneArt = liste.filter((x) => !HM_WELT_ARTEN.includes(x.art));
  let k = 0;
  mitArt.slice(0, 9).forEach((x, i) => { muster[i] = { ...x }; k = i + 1; });
  let q = 0;
  muster.forEach((f, i) => { if (i < k || q >= ohneArt.length) return; if (f.art === "hook" || f.art === "serie") { const x = ohneArt[q++]; muster[i] = { ...f, text: x.hook || x.text, unter: x.titel || x.unter, serie: f.art === "serie" ? (x.serie || f.serie) : undefined }; } });
  return muster.slice(0, 9).map((f, i) => hmWeltPostDaten(w, b, f, i));
}
function hmWeltAlt(w, p) { return `${w.name}, ${p.art === "objekt" && p.bild ? p.bild.t : p.text}`; }

/* ---------- Renderer (React-Komponenten) ---------- */
function WeltPost({ welt, b, art, text, unter, bild, serie, portrait, ton, spiegel, nr, breite = 360, format, daten }) {
  const w = hmWeltHol(welt); const bb = b || {};
  useHmWeltSchriften(bb, w);
  const uid = useHmWeltUid();
  const p = daten || hmWeltPostDaten(w, bb, { art, text, unter, bild, serie, portrait, ton, spiegel, nr }, 0);
  const c = hmWeltCtx(w, bb, 1080, 1350, uid);
  const eng = format === "3:4";
  return <svg className="hm-welt-svg" width={breite} height={Math.round(breite * (eng ? 4 / 3 : 1.25))} viewBox={eng ? "33.75 0 1012.5 1350" : "0 0 1080 1350"} role="img" aria-label={hmWeltAlt(w, p)} xmlns="http://www.w3.org/2000/svg">{HM_WELT_ZEICHNER[w.id].post(c, p)}</svg>;
}
function WeltStory({ welt, b, text, bild, portrait, breite = 240 }) {
  const w = hmWeltHol(welt); const bb = b || {};
  useHmWeltSchriften(bb, w);
  const uid = useHmWeltUid();
  const port = !!portrait || (!!bild && bild === bb.portrait) || (!bild && !!bb.portrait);
  const p = hmWeltPostDaten(w, bb, { art: "hook", text: text || bb.claim, bild: port ? null : (bild == null ? 0 : bild), portrait: port }, 0);
  if (!port && !p.bild) p.bild = hmWeltObjekt(0, w);
  const c = hmWeltCtx(w, bb, 1080, 1920, uid);
  return <svg className="hm-welt-svg" width={breite} height={Math.round(breite * 1920 / 1080)} viewBox="0 0 1080 1920" role="img" aria-label={`${w.name}, Story`} xmlns="http://www.w3.org/2000/svg">{HM_WELT_ZEICHNER[w.id].story(c, p)}</svg>;
}
function WeltFeed({ welt, b, posts, breite = 360, luecke, kopf }) {
  const w = hmWeltHol(welt); const bb = b || {};
  const liste = hmWeltFeedPosts(w, bb, posts);
  const g = luecke != null ? luecke : Math.max(1, Math.round(breite / 180));
  const tw = Math.floor(((breite - 2 * g) / 3) * 10) / 10;
  return <div className="hm-welt-feed" style={{ width: breite }}>
    {kopf ? <WeltProfilKopf welt={w} b={bb} breite={breite} /> : null}
    <div className="hm-welt-feed-raster" style={{ display: "grid", gridTemplateColumns: `repeat(3, ${tw}px)`, gap: g }}>{liste.map((p, i) => <WeltPost key={i} welt={w} b={bb} daten={p} breite={tw} format="3:4" />)}</div>
  </div>;
}
function WeltProfilKopf({ welt, b, breite }) {
  const F = hmWeltFarben(welt, b); const s = breite / 360; const sch = b.schrift || {};
  const handle = (hmWeltSlug(b.vor) + "." + hmWeltSlug(b.nach)).replace(/\.$/, "") + ".immo";
  return <div className="hm-welt-kopf" style={{ display: "flex", gap: 12 * s, alignItems: "center", padding: `${10 * s}px 0` }}>
    <div style={{ width: 56 * s, height: 56 * s, borderRadius: "50%", overflow: "hidden", background: F.flaeche, flex: "none", display: "grid", placeItems: "center", fontFamily: hmWeltFam(sch.d), fontSize: 22 * s, color: F.text }}>{b.portrait ? <img src={b.portrait} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 12%" }} /> : b.initialen}</div>
    <div style={{ minWidth: 0, fontFamily: hmWeltFam(sch.t) }}><div style={{ fontSize: 14 * s, fontWeight: 600 }}>{handle}</div><div style={{ fontSize: 12.5 * s, opacity: 0.75, lineHeight: 1.35 }}>{b.bio || b.claim}</div></div>
  </div>;
}
function WeltKarte({ welt, b, seite = "vorn", breite = 340 }) {
  const w = hmWeltHol(welt); const bb = b || {};
  useHmWeltSchriften(bb, w);
  const uid = useHmWeltUid(); const c = hmWeltCtx(w, bb, 850, 550, uid);
  return <svg className="hm-welt-svg hm-welt-karte-svg" width={breite} height={Math.round(breite * 55 / 85)} viewBox="0 0 850 550" role="img" aria-label={`${w.name}, Visitenkarte ${seite}`} xmlns="http://www.w3.org/2000/svg">{HM_WELT_ZEICHNER[w.id].karte(c, { seite })}</svg>;
}
function WeltSignatur({ welt, b, breite = 520 }) {
  const w = hmWeltHol(welt); const bb = b || {};
  useHmWeltSchriften(bb, w);
  const uid = useHmWeltUid(); const c = hmWeltCtx(w, bb, 1200, 300, uid);
  return <svg className="hm-welt-svg" width={breite} height={Math.round(breite / 4)} viewBox="0 0 1200 300" role="img" aria-label={`${w.name}, E-Mail-Signatur`} xmlns="http://www.w3.org/2000/svg">{HM_WELT_ZEICHNER[w.id].signatur(c)}</svg>;
}
function WeltExpose({ welt, b, objekt, breite = 420 }) {
  const w = hmWeltHol(welt); const bb = b || {};
  useHmWeltSchriften(bb, w);
  const uid = useHmWeltUid(); const c = hmWeltCtx(w, bb, 2100, 2970, uid);
  const o = hmWeltObjekt(objekt == null ? 0 : objekt, w);
  return <svg className="hm-welt-svg hm-welt-expose-svg" width={breite} height={Math.round(breite * 297 / 210)} viewBox="0 0 2100 2970" role="img" aria-label={`${w.name}, Exposé ${o.t || ""}`} xmlns="http://www.w3.org/2000/svg">{HM_WELT_ZEICHNER[w.id].expose(c, o)}</svg>;
}
function WeltZeichen({ welt, b, breite = 300 }) {
  const w = hmWeltHol(welt); const bb = b || {};
  useHmWeltSchriften(bb, w);
  const uid = useHmWeltUid(); const c = hmWeltCtx(w, bb, 600, 400, uid);
  return <svg className="hm-welt-svg" width={breite} height={Math.round(breite * 2 / 3)} viewBox="0 0 600 400" role="img" aria-label={`${w.name}, Zeichen: ${w.zeichen.name}`} xmlns="http://www.w3.org/2000/svg">{HM_WELT_ZEICHNER[w.id].zeichen(c)}</svg>;
}
function WeltProbe({ welt, b, bild, breite = 160 }) {
  const w = hmWeltHol(welt); const bb = b || {};
  const uid = useHmWeltUid(); const c = hmWeltCtx(w, bb, 600, 800, uid);
  const o = hmWeltObjekt(bild == null ? 0 : bild, w);
  return <svg className="hm-welt-svg" width={breite} height={Math.round(breite * 4 / 3)} viewBox="0 0 600 800" role="img" aria-label={`${w.name}, Bildbeispiel ${o.t || ""}`} xmlns="http://www.w3.org/2000/svg">{HM_WELT_ZEICHNER[w.id].probe(c, o.img)}</svg>;
}

/* Breite eines Elements beobachten (für Tafel und Auswahl) */
function useHmWeltBreite(ref, start, sel) {
  const [bw, setBw] = React.useState(start);
  React.useEffect(() => {
    const el = ref.current; if (!el || typeof ResizeObserver === "undefined") return undefined;
    const miss = () => { const z = sel ? el.querySelector(sel) : el; if (z && z.clientWidth) setBw(Math.floor(z.clientWidth)); };
    const ro = new ResizeObserver(miss); ro.observe(el); miss();
    return () => ro.disconnect();
  }, []);
  return bw;
}

/* Übersicht der Welt: Idee, Zeichen, Farben mit Anteil, Schrift, Bildsprache, Anwendung, Raster */
function WeltTafel({ welt, b, breite }) {
  const w = hmWeltHol(welt); const bb = b || {};
  const box = React.useRef(null);
  const gemessen = useHmWeltBreite(box, breite || 1000);
  const bw = breite || gemessen;
  const F = hmWeltFarben(w, bb); const sch = bb.schrift || (typeof HM_WEB_SCHRIFTEN !== "undefined" && HM_WEB_SCHRIFTEN[w.schrift]) || { d: "Power Grotesk", t: "Power Grotesk", name: "UNIO" };
  const s = Math.max(11, Math.min(18, bw / 1200 * 16));
  const spalten = bw < 700 ? 1 : bw < 1000 ? 2 : 3;
  const feldB = (bw - 6 * s * 2 - (spalten - 1) * 2 * s) / spalten;
  const look = (typeof HM_LOOKS !== "undefined" ? HM_LOOKS : []).find((l) => l.n === w.websiteLook);
  const archetypen = (typeof HM_ARCHETYPEN !== "undefined" ? HM_ARCHETYPEN : []);
  const passt = w.passtZu.map((id) => (archetypen.find((a) => a.id === id) || { name: id }).name).join(", ");
  const st = HM_WELT_STIL[w.id]; const rollen = [["Grund", F.grund, w.proportion.grund], ["Text", F.text, w.proportion.text], ["Akzent", F.akzent, w.proportion.akzent]];
  const kfarben = [["Grund", F.grund], ["Text", F.text], ["Fläche", F.flaeche], ["Linie", F.linie], ["Akzent", F.akzent]];
  const L = ({ titel, liste }) => <div className="hm-welt-tafel-liste"><div className="k">{titel}</div><ul>{liste.map((x) => <li key={x}>{x}</li>)}</ul></div>;
  return <div ref={box} className="hm-welt-tafel" style={{ fontSize: s, background: F.grund, color: F.text, "--hm-welt-linie": hmWeltMisch(F.text, F.grund, 0.78), fontFamily: hmWeltFam(sch.t) }}>
    <div className="hm-welt-tafel-kopf" style={{ gridTemplateColumns: spalten === 1 ? "1fr" : "minmax(0,1fr) minmax(0,1.3fr)" }}>
      <div className="hm-welt-tafel-name" style={{ fontFamily: hmWeltFam(sch.d), fontWeight: hmWeltSchnitt(sch.d, st.dGewicht) }}>{w.name}</div>
      <div className="hm-welt-tafel-idee">{w.idee}</div>
    </div>
    <div className="hm-welt-tafel-raster" style={{ gridTemplateColumns: `repeat(${spalten}, minmax(0, 1fr))` }}>
      <section className="hm-welt-tafel-feld"><h4>Zeichen: {w.zeichen.name}</h4><WeltZeichen welt={w} b={bb} breite={Math.floor(feldB)} /><p>{w.zeichen.satz}</p></section>
      <section className="hm-welt-tafel-feld"><h4>Farben und Anteile</h4>
        <div className="hm-welt-tafel-balken">{rollen.map(([n, f, pz]) => <i key={n} style={{ flex: `${pz} 1 0`, background: f }} title={`${n} ${pz} Prozent`} />)}</div>
        <div className="hm-welt-tafel-anteile">{rollen.map(([n, , pz]) => <span key={n} style={{ flex: `${pz} 1 0` }}>{n} {pz} %</span>)}</div>
        <div className="hm-welt-tafel-farben">{kfarben.map(([n, f]) => <div key={n}><i style={{ background: f }} /><span>{n}</span><span className="hex">{f.toUpperCase()}</span></div>)}</div>
        <p>Akzent aus deinem Branding. Auf dem Grund {hmWeltKontrast(F.akzent, F.grund).toLocaleString("de-AT", { maximumFractionDigits: 1 })} zu 1, als Schrift darauf {hmWeltKontrast(F.aufAkzent, F.akzent).toLocaleString("de-AT", { maximumFractionDigits: 1 })} zu 1.</p>
      </section>
      <section className="hm-welt-tafel-feld"><h4>Schrift: {sch.name || w.schrift}</h4>
        <div className="hm-welt-tafel-aa" style={{ fontFamily: hmWeltFam(sch.d), fontWeight: hmWeltSchnitt(sch.d, st.dGewicht) }}>Aa</div>
        <div className="hm-welt-tafel-probe-d" style={{ fontFamily: hmWeltFam(sch.d), fontWeight: hmWeltSchnitt(sch.d, st.dGewicht), letterSpacing: st.ls + "em" }}>{bb.claim || w.idee}</div>
        <p>{sch.d} für Headlines, Zahlen und Zitate. {sch.t} für Text und Daten, zum Beispiel € 1.290.000, 128 m², 4 Zimmer.</p>
      </section>
      <section className="hm-welt-tafel-feld hm-welt-tafel-breit" style={{ gridColumn: spalten > 1 ? "span " + Math.min(2, spalten) : undefined }}><h4>Bildsprache</h4>
        <div className="hm-welt-tafel-proben">{[0, 1, 2].map((i) => <WeltProbe key={i} welt={w} b={bb} bild={i} breite={Math.floor(Math.min(feldB * 0.62, (feldB * Math.min(2, spalten) - 4 * s) / 3))} />)}</div>
        <div className="hm-welt-tafel-listen"><L titel="Regeln" liste={w.bildsprache.regeln} /><L titel="Motive" liste={w.bildsprache.motive} /><L titel="Vermeiden" liste={w.bildsprache.vermeiden} /></div>
      </section>
      <section className="hm-welt-tafel-feld"><h4>Im Einsatz</h4>
        <div className="hm-welt-tafel-anwendung"><WeltPost welt={w} b={bb} art="hook" portrait={!!bb.portrait} breite={Math.floor(feldB * 0.46)} /><WeltKarte welt={w} b={bb} breite={Math.floor(feldB * 0.5)} /></div>
        <p>Raster mit {Math.round(w.raster.rand * 100)} Prozent Rand und {w.raster.spalten} Spalten. Website im Look {w.websiteLook}{look ? ", " + look.name : ""}. Passt zu {passt}.</p>
      </section>
    </div>
  </div>;
}

/* ---------- Vorschlag: welche Welt passt zu diesem Makler ---------- */
function hmWeltVorschlag(b, antworten, archetypId) {
  const a = antworten || {};
  const aid = archetypId || (b && b.aid) || (Array.isArray(a.archetyp) && a.archetyp[0]) || "kenner";
  const werte = Object.entries(a.bildpaare || {}).filter(([, v]) => v === "a" || v === "b");
  const n = werte.length, warm = werte.filter(([, v]) => v === "a").length, kuehl = n - warm;
  const gewicht = n >= 3 ? 1 : n > 0 ? 0.5 : 0;
  const assets = Array.isArray(a.assets) ? a.assets : [];
  const zahl = (v) => (typeof v === "number" ? v : (v != null && v !== "" && !isNaN(+v)) ? +v : null);
  const s3 = zahl(a.s3), s4 = zahl(a.s4);
  const zeilen = HM_MARKENWELTEN.map((w, reihe) => {
    let p = 0;
    const ix = w.passtZu.indexOf(aid);
    if (ix >= 0) p += 30 + (ix === 0 ? 8 : 0);
    const pref = HM_WELT_BILDPAARE[w.id] || {};
    let treffer = 0, gegen = 0;
    werte.forEach(([k, v]) => { if (!pref[k]) return; if (pref[k] === v) treffer++; else gegen++; });
    p += (treffer * 5 - gegen * 3) * gewicht;
    const as = assets.filter((x) => (HM_WELT_ASSETS[x] || []).includes(w.id));
    as.forEach((x) => { p += HM_WELT_ASSETS[x][0] === w.id ? 9 : 6; });
    if (w.id === "graetzl" && a.graetzl && String(a.graetzl).trim()) p += 5;
    if (s4 != null) { if (s4 >= 65 && ["klar", "kontrast", "graetzl"].includes(w.id)) p += 4; if (s4 <= 35 && ["editorial", "ruhig", "warm"].includes(w.id)) p += 4; }
    if (s3 != null) { if (s3 <= 35 && ["ruhig", "klar"].includes(w.id)) p += 3; if (s3 >= 65 && ["graetzl", "kontrast"].includes(w.id)) p += 3; }
    return { id: w.id, name: w.name, punkte: Math.round(p * 10) / 10, treffer, gegen, assets: as, archetyp: ix >= 0, erste: ix === 0, reihe };
  }).sort((x, y) => y.punkte - x.punkte || (y.erste - x.erste) || x.reihe - y.reihe);
  const best = zeilen[0]; const w = hmWeltHol(best.id);
  const arch = (typeof HM_ARCHETYPEN !== "undefined" ? HM_ARCHETYPEN : []).find((x) => x.id === aid);
  const archName = arch ? arch.name : aid;
  const g = [];
  g.push(best.archetyp ? `Passt zu deiner Figur ${archName}.` : `${archName} ist nicht die erste Figur dieser Welt, den Ausschlag geben deine Antworten.`);
  if (!n) g.push("Die Bildpaare fehlen noch, deshalb folgt die Welt vor allem deiner Figur.");
  else g.push(`${warm} von ${n} Bildpaaren warm, ${kuehl} kühl: deine Bildwelt ist ${warm > kuehl ? "eher warm" : kuehl > warm ? "eher kühl" : "ausgewogen"}.` + (n < 3 ? ` Bei ${n === 1 ? "einem Paar" : n + " Paaren"} ist das eine erste Annahme.` : ""));
  if (best.treffer) g.push(`${best.treffer === 1 ? "Ein Bildpaar trifft" : best.treffer + " Bildpaare treffen"} die Bildsprache von ${w.name} genau.`);
  if (best.assets.length) g.push(`Du hast ${best.assets.map((x) => "„" + x + "“").join(" und ")} als mögliches Zeichen genannt. ${w.zeichen.name} macht daraus ein festes Element.`);
  const look = (typeof HM_LOOKS !== "undefined" ? HM_LOOKS : []).find((l) => l.n === w.websiteLook);
  g.push(`Die Website bekommt dazu den Look ${w.websiteLook}${look ? ", " + look.name : ""}.`);
  return { id: best.id, welt: w, punkte: best.punkte, begruendung: g, rangfolge: zeilen.map(({ id, name, punkte }) => ({ id, name, punkte })), bildpaare: { n, warm, kuehl }, archetyp: aid };
}

/* ---------- Auswahl der sechs Welten mit echter Vorschau ---------- */
function WeltWahl({ mid, wert, set }) {
  if (typeof useHm === "function") { useHm("fragebogen"); useHm("branding"); useHm("portraits"); }
  const bRoh = hmBrand(mid);
  const antworten = (((typeof hmStore !== "undefined" && hmStore.get("fragebogen")) || {})[mid] || {}).antworten || {};
  const v = hmWeltVorschlag(bRoh, antworten, bRoh.aid);
  const box = React.useRef(null);
  const vb = useHmWeltBreite(box, 320, ".hm-welt-wahl-vorschau");
  const fw = Math.max(120, Math.round(vb * 0.6)), kw = Math.max(80, vb - fw - 12);
  const archetypen = (typeof HM_ARCHETYPEN !== "undefined" ? HM_ARCHETYPEN : []);
  const reihe = [v.id, ...HM_MARKENWELTEN.map((w) => w.id).filter((id) => id !== v.id)];
  return <div className="hm-welt-wahl" ref={box}>
    <div className="hm-welt-wahl-grund"><div className="t">Vorschlag für dich: {v.welt.name}</div>{v.begruendung.map((x, i) => <p key={i}>{x}</p>)}</div>
    <div className="hm-welt-wahl-raster">{reihe.map((id) => {
      const w = hmWeltHol(id); const b = hmWeltMarke(w, bRoh); const an = wert === id;
      const passt = w.passtZu.map((x) => (archetypen.find((a) => a.id === x) || { name: x }).name).join(", ");
      return <button key={id} type="button" className={"hm-welt-wahl-karte" + (an ? " on" : "")} aria-pressed={an} onClick={() => set && set(id)}>
        <div className="hm-welt-wahl-vorschau"><WeltFeed welt={w} b={b} breite={fw} /><div className="hm-welt-wahl-karten"><WeltKarte welt={w} b={b} breite={kw} /><WeltKarte welt={w} b={b} seite="hinten" breite={kw} /></div></div>
        <div className="t">{w.name}{an ? ", gewählt" : ""}</div>
        {id === v.id ? <div className="empf">Empfehlung aus deinem Fragebogen</div> : null}
        <div className="s">{w.idee}</div>
        <div className="m">{w.zeichen.name}. Schrift {(typeof HM_WEB_SCHRIFTEN !== "undefined" && HM_WEB_SCHRIFTEN[w.schrift] || {}).name || w.schrift}, Website-Look {w.websiteLook}.</div>
        <div className="m">Passt zu {passt}.</div>
      </button>;
    })}</div>
  </div>;
}

/* ---------- Signatur als HTML für Mailprogramme (Tabellen, Inline-Styles) ---------- */
function hmWeltSignaturHtml(welt, b) {
  const w = hmWeltHol(welt); const bb = b || {}; const F = hmWeltFarben(w, bb); const k = hmWeltKontakt(bb);
  const sch = bb.schrift || (typeof HM_WEB_SCHRIFTEN !== "undefined" && HM_WEB_SCHRIFTEN[w.schrift]) || { d: "Georgia", t: "Arial" };
  const esc = (x) => String(x == null ? "" : x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const fd = `'${sch.d}', Georgia, serif`, ft = `'${sch.t}', Arial, sans-serif`;
  const hell = hmWeltLum(F.grund) > 0.3; const text = hell ? F.text : F.dunkel; const leise = hmWeltMisch(text, "#FFFFFF", 0.35);
  const name = `<td style="font-family:${fd};font-size:20px;line-height:1.2;color:${text};padding:0 0 4px 0;">${esc(hmWeltVoll(bb))}</td>`;
  const claim = `<td style="font-family:${ft};font-size:13px;line-height:1.4;color:${leise};padding:0 0 8px 0;">${esc(bb.claim || "")}</td>`;
  const kontakt = `<td style="font-family:${ft};font-size:13px;line-height:1.5;color:${text};">${esc(k.tel)}&nbsp;&nbsp;&nbsp;<a href="mailto:${esc(k.mail)}" style="color:${text};text-decoration:none;">${esc(k.mail)}</a>&nbsp;&nbsp;&nbsp;<a href="https://unio.at" style="color:${text};text-decoration:none;">unio.at</a></td>`;
  const rahmen = {
    ruhig: `border-left:2px solid ${F.akzent};padding-left:14px;`,
    editorial: `border-top:1px solid ${text};padding-top:8px;`,
    graetzl: `border-bottom:4px solid ${F.akzent};padding-bottom:10px;`,
    klar: `border:1px solid ${text};padding:10px 12px;`,
    warm: `border-left:6px solid ${F.akzent};padding-left:14px;`,
    kontrast: `border-top:4px solid ${F.akzent};padding-top:8px;`,
  }[w.id] || "";
  return `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr><td style="${rahmen}"><table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr>${name}</tr><tr>${claim}</tr><tr>${kontakt}</tr></table></td></tr></table>`;
}

/* ---------- Selbsttest ---------- */
function hmSelbsttestWelten() {
  const out = [];
  const T = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: "Fehler: " + (e && e.message) }); } };
  const striche = /[\u2013\u2014]/;
  const klischees = ["Traumimmobilie", "Ihr Partner für", "mit Leidenschaft", "kompetent und zuverlässig", "Immobilienprofi", "maßgeschneidert", "rundum sorglos", "auf Augenhöhe", "Mehrwert", "ganzheitlich", "individuelle Lösungen", "Ihr Zuhause ist unsere Mission", "seriös", "Experte an Ihrer Seite", "einzigartig", "exklusiv"];
  const archIds = ["kenner", "begleiter", "gestalter", "entdecker", "fels", "gastgeber"];
  const hex = /^#[0-9A-Fa-f]{6}$/;
  const texte = (w) => [w.name, w.idee, w.zeichen.name, w.zeichen.satz, ...w.bildsprache.regeln, ...w.bildsprache.motive, ...w.bildsprache.vermeiden].join(" ");
  const bT = { makler: { id: "test", name: "Elif Demir" }, vor: "Elif", nach: "Demir", initialen: "ED", akzent: "#B45B3E", claim: "Immobilien sind Menschen mit Adresse.", logo: "punkt", schrift: { d: "Fraunces", t: "Hanken Grotesk" }, w: { bezirke: ["1100 Favoriten"], hooks: ["Favoriten in 60 Sekunden: drei Ecken, die sich gerade ändern."] }, portrait: null, aid: "entdecker" };

  T("Sechs Welten mit den festen IDs", () => { const ids = HM_MARKENWELTEN.map((w) => w.id); return { ok: ids.join() === "ruhig,editorial,graetzl,klar,warm,kontrast", detail: ids.join(", ") }; });
  T("Schema vollständig", () => {
    const f = [];
    HM_MARKENWELTEN.forEach((w) => {
      ["id", "name", "idee"].forEach((k) => { if (!w[k]) f.push(w.id + " " + k); });
      if (!Array.isArray(w.passtZu) || w.passtZu.length < 2 || w.passtZu.length > 3 || w.passtZu.some((x) => !archIds.includes(x))) f.push(w.id + " passtZu");
      if (typeof HM_WEB_SCHRIFTEN !== "undefined" && !HM_WEB_SCHRIFTEN[w.schrift]) f.push(w.id + " schrift");
      if (!["editorial", "klassisch", "zeitlos", "modern", "unio"].includes(w.schrift)) f.push(w.id + " schrift-schluessel");
      ["grund", "text", "flaeche", "linie"].forEach((k) => { if (!hex.test(w.farben[k] || "")) f.push(w.id + " farbe " + k); });
      const pz = w.proportion; if (pz.grund + pz.text + pz.akzent !== 100) f.push(w.id + " proportion");
      if (!w.zeichen || !w.zeichen.name || !w.zeichen.satz) f.push(w.id + " zeichen");
      ["regeln", "motive", "vermeiden"].forEach((k) => { if (!Array.isArray(w.bildsprache[k]) || w.bildsprache[k].length < 3) f.push(w.id + " bildsprache " + k); });
      if (!(w.raster.rand > 0 && w.raster.rand < 0.2) || !(w.raster.spalten >= 2)) f.push(w.id + " raster");
      if (!(w.websiteLook >= 1 && w.websiteLook <= 6)) f.push(w.id + " websiteLook");
      if (!HM_WELT_ZEICHNER[w.id] || !HM_WELT_STIL[w.id]) f.push(w.id + " zeichner");
    });
    return { ok: !f.length, detail: f.join(", ") || "alle Felder da" };
  });
  T("Jede Figur hat eine Welt, Looks verschieden", () => { const fehlt = archIds.filter((a) => !HM_MARKENWELTEN.some((w) => w.passtZu.includes(a))); const looks = new Set(HM_MARKENWELTEN.map((w) => w.websiteLook)); return { ok: !fehlt.length && looks.size === 6, detail: fehlt.length ? "ohne Welt: " + fehlt.join(", ") : `${looks.size} Looks` }; });
  T("Texte ohne Striche, Ausrufezeichen und Klischees", () => { const f = []; HM_MARKENWELTEN.forEach((w) => { const t = texte(w); if (striche.test(t)) f.push(w.id + " Strich"); if (/!/.test(t)) f.push(w.id + " Ausrufezeichen"); klischees.forEach((k) => { if (t.toLowerCase().includes(k.toLowerCase())) f.push(w.id + " " + k); }); }); return { ok: !f.length, detail: f.join(", ") || "sauber" }; });
  T("Kontrast Text auf Grund", () => { const f = HM_MARKENWELTEN.filter((w) => hmWeltKontrast(w.farben.text, w.farben.grund) < 7).map((w) => w.id + " " + hmWeltKontrast(w.farben.text, w.farben.grund).toFixed(1)); return { ok: !f.length, detail: f.join(", ") || "alle mindestens 7 zu 1" }; });
  T("Leiser Text und Akzentschrift lesbar mit allen Akzenten", () => {
    const f = []; const akz = typeof HM_WEB_AKZENTE !== "undefined" ? HM_WEB_AKZENTE.map((x) => x.hex) : ["#FFAA09", "#1F3A5F"];
    HM_MARKENWELTEN.forEach((w) => akz.forEach((a) => { const c = hmWeltCtx(w, { ...bT, akzent: a }, 1080, 1350, "t"); ["grund", "flaeche", "dunkel", "akzent"].forEach((n) => { const t = c.ton(n); if (hmWeltKontrast(t.leise, t.bg) < 4.5) f.push(`${w.id} ${n} leise ${a}`); if (hmWeltKontrast(t.akzText, t.bg) < 4.5) f.push(`${w.id} ${n} akzText ${a}`); if (hmWeltKontrast(t.fg, t.bg) < 4.5) f.push(`${w.id} ${n} fg ${a}`); }); if (hmWeltKontrast(c.F.aufAkzent, a) < 3) f.push(`${w.id} aufAkzent ${a}`); }));
    return { ok: !f.length, detail: f.slice(0, 6).join(", ") || `${akz.length} Akzente je Welt geprüft` };
  });
  T("Satz passt in Breite und Zeilen", () => { const s = hmWeltSatz("Ein sehr langer Satz, der in eine schmale Spalte muss und trotzdem lesbar bleibt, auch mit Umlauten wie Größe.", { font: "Fraunces", size: 90, min: 40, w: 420, zeilen: 3 }); const breit = s.z.some((l) => hmWeltMiss(l, "Fraunces", s.size, 400, 0) > 420); return { ok: s.z.length <= 3 && (!breit || s.size === 40), detail: `${s.z.length} Zeilen, ${s.size} px` }; });
  T("Grätzl-Linie fest je Makler, verschieden je Name", () => {
    const o = { von: { x: -40, y: 900 }, nach: { x: 700, y: 1080 }, band: [920, 1200], anflug: "links" };
    const a1 = hmWeltStrasse(hmWeltCtx("graetzl", bT, 1080, 1350, "a"), o), a2 = hmWeltStrasse(hmWeltCtx("graetzl", bT, 1080, 1350, "b"), o);
    const b1 = hmWeltStrasse(hmWeltCtx("graetzl", { ...bT, makler: { name: "Markus Leitner" } }, 1080, 1350, "c"), o);
    const ende = a1.trim().split(/\s+L?/).slice(-2).join(" ");
    return { ok: a1 === a2 && a1 !== b1 && /700 1080$/.test(a1), detail: ende };
  });
  T("Alle Renderer ohne NaN und undefined", () => {
    const f = []; let n = 0;
    const pruef = (el, wo) => {
      if (el == null || typeof el === "boolean") return;
      if (Array.isArray(el)) { el.forEach((x) => pruef(x, wo)); return; }
      if (typeof el === "string" || typeof el === "number") { if (typeof el === "number" && isNaN(el)) f.push(wo + " NaN"); if (/undefined|NaN/.test(String(el))) f.push(wo + " Text " + el); return; }
      if (el.props) { n++; Object.entries(el.props).forEach(([k, v]) => { if (k === "children") return; if (typeof v === "number" && !isFinite(v)) f.push(`${wo} ${k}`); if (typeof v === "string" && /NaN|undefined/.test(v)) f.push(`${wo} ${k}=${v.slice(0, 40)}`); }); pruef(el.props.children, wo); }
    };
    const bs = [bT, { ...bT, portrait: "portrait.png", logo: "monogramm", akzent: "#FFAA09", w: null }, { ...bT, logo: "wort", akzent: "#1F3A5F", makler: { name: "Maximilian Grünberg-Hohenwarth" }, vor: "Maximilian", nach: "Grünberg-Hohenwarth" }];
    HM_MARKENWELTEN.forEach((w) => bs.forEach((b, bi) => {
      const Z = HM_WELT_ZEICHNER[w.id];
      HM_WELT_ARTEN.forEach((art) => [false, true].forEach((port) => { const c = hmWeltCtx(w, b, 1080, 1350, "t"); pruef(Z.post(c, hmWeltPostDaten(w, b, { art, portrait: port, spiegel: port }, 3)), `${w.id} ${art} ${bi}`); }));
      hmWeltFeedPosts(w, b, [{ titel: "Folge eins", hook: "Was kostet ein Makler wirklich", serie: "Klartext" }]).forEach((p, i) => pruef(Z.post(hmWeltCtx(w, b, 1080, 1350, "t"), p), `${w.id} feed ${i}`));
      pruef(Z.story(hmWeltCtx(w, b, 1080, 1920, "t"), hmWeltPostDaten(w, b, { art: "hook", bild: 0 }, 0)), w.id + " story");
      pruef(Z.story(hmWeltCtx(w, b, 1080, 1920, "t"), hmWeltPostDaten(w, b, { art: "hook", portrait: true }, 0)), w.id + " story porträt");
      ["vorn", "hinten"].forEach((s) => pruef(Z.karte(hmWeltCtx(w, b, 850, 550, "t"), { seite: s }), w.id + " karte " + s));
      pruef(Z.signatur(hmWeltCtx(w, b, 1200, 300, "t")), w.id + " signatur");
      pruef(Z.expose(hmWeltCtx(w, b, 2100, 2970, "t"), hmWeltObjekt(0, w)), w.id + " expose");
      pruef(Z.zeichen(hmWeltCtx(w, b, 600, 400, "t")), w.id + " zeichen");
      pruef(Z.probe(hmWeltCtx(w, b, 600, 800, "t"), "x.jpg"), w.id + " probe");
    }));
    return { ok: !f.length && n > 1000, detail: f.slice(0, 5).join(", ") || `${n} Elemente geprüft` };
  });
  T("Feed abwechslungsreich", () => { const f = []; HM_MARKENWELTEN.forEach((w) => { const l = hmWeltFeedPosts(w, bT); const arten = new Set(l.map((p) => p.art)); const obj = l.filter((p) => p.art === "objekt"); if (l.length !== 9 || arten.size < 4 || obj.length < 3 || new Set(obj.map((p) => p.bild.img)).size !== obj.length) f.push(w.id); }); return { ok: !f.length, detail: f.join(", ") || "9 Posts, mindestens 4 Arten, keine doppelten Fotos" }; });
  T("Feed nimmt Serienbeispiele ohne art auf", () => { const l = hmWeltFeedPosts("editorial", bT, [{ titel: "Folge 1", hook: "Warum Döbling anders tickt", serie: "Klartext" }, { titel: "Folge 2", hook: "Drei Zahlen zum Zinshaus", serie: "Klartext" }]); const t = l.map((p) => p.text); return { ok: t.includes("Warum Döbling anders tickt") && t.includes("Drei Zahlen zum Zinshaus") && l.some((p) => p.art === "objekt"), detail: l.map((p) => p.art).join(", ") }; });
  T("Vorschlag Entdecker, warm, Ort", () => { const v = hmWeltVorschlag(bT, { bildpaare: { bp1: "a", bp2: "a", bp3: "a", bp4: "a", bp5: "a", bp6: "a" }, assets: ["Ein Ort"] }, "entdecker"); return { ok: v.id === "graetzl" && v.begruendung.length >= 3, detail: v.id + ": " + v.begruendung.join(" ") }; });
  T("Vorschlag Kenner, kühl, Gegenstand", () => { const v = hmWeltVorschlag(bT, { bildpaare: { bp1: "b", bp2: "b", bp3: "b", bp4: "b", bp5: "b", bp6: "b" }, assets: ["Ein Gegenstand"] }, "kenner"); return { ok: v.id === "klar", detail: v.rangfolge.map((x) => x.id + " " + x.punkte).join(", ") }; });
  T("Vorschlag Gastgeber, warm", () => { const v = hmWeltVorschlag(bT, { bildpaare: { bp1: "a", bp2: "a", bp3: "a", bp4: "a", bp5: "a", bp6: "a" } }, "gastgeber"); return { ok: v.id === "warm", detail: v.rangfolge.slice(0, 3).map((x) => x.id + " " + x.punkte).join(", ") }; });
  T("Vorschlag ohne Antworten folgt der Figur", () => { const f = archIds.filter((a) => !hmWeltHol(hmWeltVorschlag(bT, {}, a).id).passtZu.includes(a)); const fels = hmWeltVorschlag(bT, {}, "fels").id; return { ok: !f.length && fels === "kontrast", detail: f.join(", ") || "Fels: " + fels }; });
  T("Vorschlag mit wenigen Bildpaaren nennt die Annahme", () => { const v = hmWeltVorschlag(bT, { bildpaare: { bp5: "a" } }, "begleiter"); const t = v.begruendung.join(" "); return { ok: /erste Annahme/.test(t) && !striche.test(t) && !/!/.test(t), detail: t }; });
  T("Signatur als HTML", () => { const h = hmWeltSignaturHtml("klar", bT); return { ok: /<table/.test(h) && /Elif Demir/.test(h) && /mailto:/.test(h) && !striche.test(h), detail: h.length + " Zeichen" }; });
  T("Schrift der Welt für die Vorschau", () => { const b = hmWeltMarke("klar", bT); return { ok: typeof HM_WEB_SCHRIFTEN === "undefined" || (b.schrift.d === HM_WEB_SCHRIFTEN.unio.d && b.schriftId === "unio" && bT.schrift.d === "Fraunces"), detail: b.schrift && b.schrift.d }; });
  return out;
}

Object.assign(window, {
  HM_MARKENWELTEN, HM_WELT_STIL, HM_WELT_ZEICHNER,
  hmWeltHol, hmWeltMarke, hmWeltFarben, hmWeltKontrast, hmWeltVorschlag, hmWeltFeedPosts, hmWeltSignaturHtml, hmSelbsttestWelten,
  WeltPost, WeltStory, WeltFeed, WeltKarte, WeltSignatur, WeltExpose, WeltTafel, WeltZeichen, WeltProbe, WeltWahl,
});
