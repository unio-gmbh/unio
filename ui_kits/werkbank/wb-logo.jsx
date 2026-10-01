/* Werkbank. Logo-Werkstatt v2: Messen, Variieren und Ausleiten nach Brandmark, aber aus der Marke statt aus dem Katalog.
   Grundlage: erlebnis/BRANDMARK_ANALYSE.md ("kopieren" und "bewusst nicht"), 10_system A2, 10.3 bis 10.5, Prozess v2 C5,
   Auftrag C in erlebnis/CHEF_BRIEFS.md.
   Bewusst anders als Brandmark: keine Clipart, keine Symbolsuche, keine freie Farbwahl, keine Effekte, kein Endlosstrom.
   Zeichen kommen nur aus Idee, Welt und den Wörtern der Marke (HM_LK_WORT_ZEICHEN, geschlossen), Schriften aus dem Pool,
   Farben aus dem Branding. Das Team kuratiert, der Makler urteilt am Markenvertrag.
   Ein Entwurf ist eine kleine Spezifikation (spec). hmLkLayout macht daraus Bauteile, die als SVG-Text (Vorschau, Website),
   als Pfade (Export über hmFontDatei und hmTextPfad) oder auf ein unverbundenes Canvas (Messen) ausgegeben werden.
   Ablage: hmStore "logos" = { [mid]: { merk, bewertung, gewaehlt, stichworte: { aus: [id], eigen: [wort] }, zuletzt: [spec] } },
   übernommen wird nach "branding"[mid].logoKonzept. */

/* ---------- Stil: einmalig <style id="stil-logo">, Klassen hm-lk2-* ---------- */
const HM_LK_CSS = `
.hm-lk2 { display: grid; gap: 22px; min-width: 0; }
.hm-lk2 :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
.hm-lk2-h3 { font-size: 17px; font-weight: 500; margin: 0; color: var(--ink); letter-spacing: -0.005em; }
.hm-lk2-h4 { font-size: 14px; font-weight: 500; margin: 0 0 8px; color: var(--ink); }
.hm-lk2-leise { font-size: 13px; line-height: 1.5; color: var(--text-muted); margin: 0; max-width: 64ch; }
.hm-lk2-vh { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.hm-lk2-stw { display: grid; gap: 10px; }
.hm-lk2-stw-kopf { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 14px; }
.hm-lk2-stw-fest { padding: 7px 13px; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--hairline-dark); font-size: 14px; color: var(--ink); }
.hm-lk2-stw-neu { display: flex; flex-wrap: wrap; gap: 8px 12px; align-items: center; }
.hm-lk2-stw-neu input { border: 0; background: var(--paper-2); border-radius: 999px; padding: 9px 16px; font-size: 14px; color: var(--ink); width: 240px; max-width: 100%; }
.hm-lk2-kopfzeile { display: flex; flex-wrap: wrap; gap: 10px 16px; align-items: center; justify-content: space-between; }
.hm-lk2-kopfzeile .rechts { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
.hm-lk2-buehne-f { margin: 0; display: grid; gap: 10px; }
.hm-lk2-buehne { background: #F5F1EA; color: #0B0A09; border: 1px solid var(--hairline-dark); border-radius: 16px; min-height: 250px; display: grid; place-items: center; padding: 56px 40px; overflow: hidden; }
.hm-lk2-unter { font-size: 13px; line-height: 1.45; color: var(--text-muted); }
.hm-lk2-aktionen { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; }
.hm-lk2-ideen { display: grid; gap: 16px; padding-top: 18px; border-top: 1px solid var(--hairline-dark); }
.hm-lk2-achsen { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.hm-lk2-geschwister { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 14px; }
.hm-lk2-mini { border: 0; background: none; padding: 0; display: grid; gap: 6px; text-align: left; cursor: pointer; color: var(--ink); font: inherit; min-width: 0; }
.hm-lk2-mini .karte { aspect-ratio: 85 / 55; background: #F5F1EA; color: #0B0A09; border: 1px solid var(--hairline-dark); border-radius: 6px; padding: 10px 12px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; }
.hm-lk2-mini .karte .c { font-size: 9px; line-height: 1.3; color: #4A4640; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hm-lk2-mini .t { font-size: 12px; color: var(--text-muted); }
.hm-lk2-mini:hover .karte { border-color: var(--ink); }
.hm-lk2-reihe { display: flex; flex-wrap: wrap; gap: 8px; }
.hm-lk2-klein { border: 1px solid var(--hairline-dark); background: #F5F1EA; color: #0B0A09; border-radius: 8px; height: 52px; padding: 8px 12px; display: grid; place-items: center; cursor: pointer; }
.hm-lk2-klein:hover { border-color: var(--ink); }
.hm-lk2-raster { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 26px 18px; transition: opacity .2s; }
.hm-lk2-kachel { display: grid; gap: 6px; align-content: start; min-width: 0; }
.hm-lk2-bild { height: 124px; border: 1px solid var(--hairline-dark); border-radius: 10px; background: #F5F1EA; color: #0B0A09; display: grid; place-items: center; padding: 14px; cursor: pointer; overflow: hidden; }
.hm-lk2-kachel.on .hm-lk2-bild { border-color: var(--ink); box-shadow: inset 0 0 0 1px var(--ink); }
.hm-lk2-kachel .titel { font-size: 13px; color: var(--ink); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hm-lk2-kachel .knoepfe { display: flex; gap: 14px; }
.hm-lk2-kachel .knoepfe .hm-link { font-size: 12px; }
.hm-lk2-einzel { display: grid; gap: 14px; }
.hm-lk2-blaettern { display: flex; align-items: center; gap: 12px; font-size: 13px; color: var(--text-muted); }
.hm-lk2-rund { width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--hairline-dark); background: transparent; color: var(--ink); display: grid; place-items: center; cursor: pointer; }
.hm-lk2-rund:hover { border-color: var(--ink); }
.hm-lk2-merk { display: grid; gap: 10px; padding-top: 18px; border-top: 1px solid var(--hairline-dark); }
.hm-lk2-merkliste { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px; }
.hm-lk2-mk { display: flex; justify-content: space-between; align-items: center; gap: 10px; border: 1px solid var(--hairline-dark); background: #F5F1EA; border-radius: 10px; padding: 10px 12px; cursor: pointer; color: #0B0A09; text-align: left; font: inherit; }
.hm-lk2-mk .d { font-size: 12px; color: #4A4640; }
.hm-lk2-editor { display: grid; }
.hm-lk2-zeile { display: grid; grid-template-columns: 170px minmax(0, 1fr) 92px 118px; gap: 8px 14px; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--hairline-dark); font-size: 14px; color: var(--ink); }
.hm-lk2-zeile input[type=range] { width: 100%; accent-color: var(--ink); }
.hm-lk2-zeile output { font-variant-numeric: tabular-nums; }
.hm-lk2-zeile .hm-seg { grid-column: 2 / -1; justify-self: start; }
.hm-lk2-zeile .satz { grid-column: 2 / -1; font-size: 13px; color: var(--text-muted); }
.hm-lk2 .hm-link:disabled { opacity: .45; cursor: default; }
.hm-lk2-grenze { font-size: 12px; color: var(--ink); display: inline-flex; gap: 5px; align-items: center; }
.hm-lk2-regeln { display: grid; gap: 10px; }
.hm-lk2-regel { display: grid; grid-template-columns: 190px minmax(0, 1fr) 130px; gap: 6px 18px; padding: 14px 0; border-bottom: 1px solid var(--hairline-dark); align-items: start; }
.hm-lk2-regel .n { font-size: 14px; font-weight: 500; color: var(--ink); }
.hm-lk2-regel .w { font-size: 14px; color: var(--ink); font-variant-numeric: tabular-nums; }
.hm-lk2-regel .s { grid-column: 2; font-size: 14px; line-height: 1.5; color: var(--text-muted); margin: 0; }
.hm-lk2-regel .st { grid-column: 3; grid-row: 1 / span 2; display: inline-flex; gap: 6px; align-items: center; font-size: 13px; color: var(--ink); }
.hm-lk2-paket { display: flex; flex-wrap: wrap; gap: 12px 20px; align-items: center; }
.hm-lk2-matrix-w { overflow-x: auto; }
.hm-lk2-matrix { border-collapse: collapse; width: 100%; min-width: 660px; }
.hm-lk2-matrix thead th { font-size: 12px; font-weight: 500; color: var(--text-muted); text-align: left; padding: 0 6px 8px; }
.hm-lk2-matrix tbody th { font-size: 13px; font-weight: 400; color: var(--ink); text-align: left; padding: 6px 10px 6px 0; white-space: nowrap; }
.hm-lk2-matrix td { padding: 4px; }
.hm-lk2-zelle { width: 100%; height: 72px; border: 1px solid var(--hairline-dark); border-radius: 8px; display: grid; place-items: center; padding: 8px; cursor: pointer; overflow: hidden; }
.hm-lk2-zelle:hover { border-color: var(--ink); }
.hm-lk2-fav { display: flex; flex-wrap: wrap; gap: 22px; }
.hm-lk2-fav figure { margin: 0; display: grid; gap: 6px; justify-items: start; }
.hm-lk2-fav figcaption { font-size: 12px; color: var(--text-muted); }
.hm-lk2-fav .px { display: flex; align-items: flex-end; gap: 10px; }
.hm-lk2-fav canvas { display: block; }
.hm-lk2-fav canvas.gross { image-rendering: pixelated; border: 1px solid var(--hairline-dark); border-radius: 4px; }
.hm-lk2-form { display: grid; gap: 16px; }
.hm-lk2-form .f { display: grid; gap: 6px; font-size: 13px; color: var(--ink); }
.hm-lk2-form input[type=number], .hm-lk2-form select { border: 0; background: var(--paper-2); border-radius: 10px; padding: 9px 12px; font-size: 14px; color: var(--ink); width: 180px; }
.hm-lk2-form .zwei { display: flex; flex-wrap: wrap; gap: 16px; }
.hm-lk2-form .haken { display: inline-flex; gap: 8px; align-items: center; font-size: 14px; color: var(--ink); }
.hm-lk2-anw { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 30px 24px; }
.hm-lk2-anw figure { margin: 0; display: grid; gap: 8px; align-content: start; min-width: 0; }
.hm-lk2-anw figcaption { font-size: 13px; color: var(--text-muted); }
.hm-lk2-anw .breit { grid-column: 1 / -1; }
.hm-lk2-vk-paar { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.hm-lk2-vk { aspect-ratio: 85 / 55; background: #F5F1EA; color: #0B0A09; border: 1px solid var(--hairline-dark); border-radius: 4px; padding: 7% 8%; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; min-width: 0; }
.hm-lk2-vk .c { font-size: 11px; line-height: 1.35; color: #3B3833; }
.hm-lk2-vk .k { font-size: 10px; line-height: 1.5; color: #3B3833; }
.hm-lk2-web { min-height: 64px; background: #FFFFFF; border: 1px solid var(--hairline-dark); border-radius: 10px; display: flex; align-items: center; flex-wrap: wrap; gap: 10px 22px; padding: 12px 20px; font-size: 13px; color: #3B3833; }
.hm-lk2-web .l { margin-right: auto; color: #0B0A09; display: flex; }
.hm-lk2-web .cta { padding: 7px 14px; border-radius: 999px; font-size: 13px; }
.hm-lk2-schild { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.hm-lk2-schild > div { aspect-ratio: 3 / 1; border: 1px solid var(--hairline-dark); display: grid; place-items: center; padding: 5%; overflow: hidden; }
.hm-lk2-sig { background: #FFFFFF; border: 1px solid var(--hairline-dark); border-radius: 10px; padding: 18px 20px; display: grid; gap: 10px; color: #0B0A09; font-size: 13px; line-height: 1.5; justify-items: start; }
.hm-lk2-sig .c { color: #3B3833; }
.hm-lk2-ig { display: grid; grid-template-columns: minmax(0, 1fr) 150px; gap: 18px; align-items: start; }
.hm-lk2-ig-kopf { display: flex; gap: 16px; align-items: center; padding: 16px; background: #FFFFFF; border: 1px solid var(--hairline-dark); border-radius: 10px; color: #0B0A09; }
.hm-lk2-ig-bild { width: 84px; height: 84px; border-radius: 50%; flex: none; overflow: hidden; border: 1px solid var(--hairline-dark); display: grid; place-items: center; text-align: center; background: #FFFFFF; }
.hm-lk2-ig-bild img { width: 100%; height: 100%; object-fit: cover; display: block; }
.hm-lk2-ig-bild span { font-size: 10px; line-height: 1.3; color: #4A4640; padding: 8px; }
.hm-lk2-reel { aspect-ratio: 9 / 16; background: #141210; color: #F1EEE7; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 14px; text-align: center; }
.hm-lk2-reel .c { font-size: 11px; line-height: 1.35; color: #F1EEE7; }
.hm-lk2-luecke { font-size: 13px; line-height: 1.45; color: var(--text-muted); margin: 0; }
@media (max-width: 720px) {
  .hm-lk2-anw, .hm-lk2-ig { grid-template-columns: minmax(0, 1fr); }
  .hm-lk2-zeile { grid-template-columns: 1fr auto; }
  .hm-lk2-zeile input[type=range], .hm-lk2-zeile .hm-seg, .hm-lk2-zeile .satz { grid-column: 1 / -1; }
  .hm-lk2-regel { grid-template-columns: 1fr; }
  .hm-lk2-regel .s, .hm-lk2-regel .st { grid-column: 1; grid-row: auto; }
  .hm-lk2-buehne { padding: 36px 20px; min-height: 180px; }
}
`;
function hmLkStil() {
  if (typeof document === "undefined" || document.getElementById("stil-logo")) return;
  const s = document.createElement("style"); s.id = "stil-logo"; s.textContent = HM_LK_CSS; document.head.appendChild(s);
}

/* ---------- Pool, Arten, Richtungen ---------- */
const HM_LK_SCHRIFTEN = [
  { f: "Newsreader", k: "serif", w: [400, 500] }, { f: "Fraunces", k: "serif", w: [400, 600] }, { f: "Playfair Display", k: "serif", w: [400, 600] },
  { f: "DM Serif Display", k: "serif", w: [400] }, { f: "Instrument Sans", k: "sans", w: [400, 500, 600] }, { f: "Space Grotesk", k: "sans", w: [400, 600] },
  { f: "Manrope", k: "sans", w: [400, 600] }, { f: "Hanken Grotesk", k: "sans", w: [400, 600] },
];
/* punkt bleibt renderbar (alte Specs), wird aber nicht mehr vorgeschlagen: Punkt nach dem Namen zählt nicht als Erkennung */
const HM_LK_ARTEN = [
  { id: "satz", name: "Wortmarke" }, { id: "gesperrt", name: "Versalien gesperrt" }, { id: "gestapelt", name: "Gestapelt" },
  { id: "monogramm", name: "Monogramm" }, { id: "zeichen", name: "Zeichen und Name" }, { id: "teilung", name: "Maßstab" },
  { id: "dickte", name: "Feste Dickte" }, { id: "punkt", name: "Name mit Punkt" },
];
const HM_LK_STANDARD_ARTEN = ["satz", "gesperrt", "gestapelt", "monogramm", "zeichen", "teilung", "dickte"];
const HM_LK_RICHTUNGEN = [
  { id: "antiqua", name: "Antiqua, leise", arten: ["satz", "gestapelt"], k: "serif" },
  { id: "grotesk", name: "Grotesk, gesperrt", arten: ["gesperrt", "teilung"], k: "sans" },
  { id: "bemasst", name: "Bemaßt", arten: ["dickte", "teilung"] },
  { id: "zeichen", name: "Mit Zeichen", arten: ["zeichen"] },
  { id: "initialen", name: "Initialen", arten: ["monogramm"] },
];
/* Zeichen je Markenwelt, falls kein Wort der Welt in der Tabelle steht */
const HM_LK_WELT_ZEICHEN = { ruhig: "fenster", editorial: "folio", graetzl: "graetzl", klar: "schriftfeld", warm: "bogen", kontrast: "kante" };
const HM_LK_ZEICHEN_NAME = { ratlinie: "Ratlinie", ratstrich: "Ratstrich", zeitmass: "Zeitmaß", fenster: "Fenster 3:4", folio: "Folio", graetzl: "Grätzl-Linie", schriftfeld: "Schriftfeld", bogen: "Bogen", kante: "Kante" };
const HM_LK_KRITERIEN = ["Passt zur Haltung aus dem Markenvertrag", "Im Profilbild klein noch lesbar", "Verwechselt man mit keinem anderen Makler"];

/* Geschlossene Tabelle: Wort der Marke zu Zeichen aus der Idee. Einträge in "zeichen", die Arten sind (teilung), schlagen eine Anordnung vor.
   Muster prüfen genau ein kleingeschriebenes Wort. Keine Symbolsuche, keine Icons von außen. */
const HM_LK_WORT_ZEICHEN = [
  { muster: /^(rat|rats|rates|beratung|beraten|berater|beraterin)$/, zeichen: ["ratlinie", "ratstrich"], wort: "Rat" },
  { muster: /^(zeit|zeiten|dauer|jahr|jahre|jahren|warten|wartezeit|woche|wochen|zeitmaß|zeitmass)$/, zeichen: ["zeitmass"], wort: "Zeit" },
  { muster: /^(fenster|raum|räume|raeume|weite)$/, zeichen: ["fenster"], wort: "Fenster" },
  { muster: /^(grätzl|graetzl|grätzel|straße|strasse|straßen|ort|orte|bezirk)$/, zeichen: ["graetzl"], wort: "Grätzl" },
  { muster: /^(maß|mass|maße|plan|pläne|raster|maßstab|massstab|schriftfeld|bauplan)$/, zeichen: ["schriftfeld", "teilung"], wort: "Maß" },
  { muster: /^(bogen|altbau|gründerzeit|gruenderzeit)$/, zeichen: ["bogen"], wort: "Bogen" },
  { muster: /^(kante|klar|klare|klarheit|entscheidung|entscheiden)$/, zeichen: ["kante"], wort: "Kante" },
  { muster: /^(folge|folgen|ausgabe|serie|folio)$/, zeichen: ["folio"], wort: "Folge" },
];

/* Sperrgrenzen je Art. laufweite in em; bei teilung und dickte bestimmt die Zelle den Abstand */
const HM_LK_GRENZEN = {
  satz: { laufweite: [-0.03, 0.06], verhaeltnis: [0.8, 1.6], zelle: [0.62, 0.9] },
  punkt: { laufweite: [-0.03, 0.06], verhaeltnis: [0.8, 1.6], zelle: [0.62, 0.9] },
  gesperrt: { laufweite: [0.08, 0.32], verhaeltnis: [0.8, 1.6], zelle: [0.62, 0.9] },
  gestapelt: { laufweite: [-0.02, 0.08], verhaeltnis: [0.8, 1.6], zelle: [0.62, 0.9] },
  monogramm: { laufweite: [-0.03, 0.06], verhaeltnis: [0.8, 1.6], zelle: [0.62, 0.9] },
  zeichen: { laufweite: [-0.03, 0.2], verhaeltnis: [0.8, 1.6], zelle: [0.62, 0.9] },
  "zeichen-nur": { laufweite: [-0.03, 0.2], verhaeltnis: [0.8, 1.6], zelle: [0.62, 0.9] },
  teilung: { laufweite: [0, 0], verhaeltnis: [0.8, 1.6], zelle: [0.62, 0.9] },
  dickte: { laufweite: [0, 0], verhaeltnis: [0.8, 1.6], zelle: [0.62, 0.9] },
};
/* Farben der Fassungen. Tinte, Papier, Nacht und Kreide wie in den Markenwelten */
const HM_LK_TINTE = "#0B0A09", HM_LK_PAPIER = "#F5F1EA", HM_LK_NACHT = "#141210", HM_LK_KREIDE = "#F1EEE7";
const HM_LK_FASSUNGEN = [
  { id: "positiv", name: "Positiv", satz: "Tinte auf Papier", grund: HM_LK_PAPIER },
  { id: "negativ", name: "Negativ", satz: "Kreide auf Nacht", grund: HM_LK_NACHT },
  { id: "akzent", name: "Akzent", satz: "Ganz in der Akzentfarbe auf Papier", grund: HM_LK_PAPIER },
  { id: "schwarz", name: "Schwarz", satz: "Einfarbig schwarz, für Stempel und einfarbigen Druck", grund: "#FFFFFF" },
  { id: "weiss", name: "Weiß", satz: "Einfarbig weiß, für dunkle Fotos und Flächen", grund: HM_LK_NACHT },
  { id: "ohneAkzent", name: "Ohne Akzent", satz: "Nur Tinte, wenn die Akzentfarbe nicht zur Verfügung steht", grund: HM_LK_PAPIER },
];
/* Stammstärke (em, Schnitt 400) und Versalhöhe (em) als Startwerte, bis die Schriftdatei gemessen ist */
const HM_LK_STAMM_START = { "Newsreader": 0.078, "Fraunces": 0.085, "Playfair Display": 0.095, "DM Serif Display": 0.105, "Instrument Sans": 0.085, "Space Grotesk": 0.082, "Manrope": 0.083, "Hanken Grotesk": 0.08, "Power Grotesk": 0.09 };
const HM_LK_VERSAL_START = { "Newsreader": 0.66, "Fraunces": 0.69, "Playfair Display": 0.708, "DM Serif Display": 0.7, "Instrument Sans": 0.72, "Space Grotesk": 0.7, "Manrope": 0.72, "Hanken Grotesk": 0.7, "Power Grotesk": 0.7 };
/* Achsen der Ideen-Leiste und welche Felder ein Geschwister ändern darf (abhängige Werte eingeschlossen) */
const HM_LK_ACHSEN = { schrift: ["font", "gewicht"], anordnung: ["art", "lage", "versal", "laufweite", "zelle"], zeichen: ["zeichen", "art", "lage", "laufweite", "versal"], laufweite: ["laufweite", "zelle"], akzent: ["akzent"] };
const HM_LK_ACHSEN_NAMEN = [["schrift", "Schrift"], ["anordnung", "Anordnung"], ["zeichen", "Zeichen"], ["laufweite", "Laufweite"], ["akzent", "Akzent"]];
const HM_LK_FELDER = ["art", "font", "gewicht", "versal", "laufweite", "zeichen", "lage", "akzent", "verhaeltnis", "zelle", "staerke", "minLinie"];
/* Sichtbare Sätze an einer Stelle, damit der Selbsttest sie prüfen kann */
const HM_LK_SAETZE = {
  keinZeichen: "Zu diesem Wort gibt es kein Zeichen aus der Idee. Neue Zeichen zeichnet das Team von Hand.",
  versalFest: "In dieser Anordnung immer Versalien.",
  zelleFest: "In dieser Anordnung bestimmt die Zelle den Abstand.",
  ratstrichHoehe: "Der Ratstrich folgt immer der Versalhöhe.",
  ratstrichLage: "Der Ratstrich steht immer links vom Namen.",
  grenze: "Grenze erreicht",
  paketSchrift: "Die Schriftdatei ist nicht erreichbar. Das Paket wird nicht erstellt, damit keine Ersatzschrift darin landet.",
  dateiSchrift: "Die Schriftdatei ist nicht erreichbar. Die Datei wird nicht erstellt, damit keine Ersatzschrift darin landet.",
  profilRegel: "Auf Instagram und LinkedIn ist Ihr Profilbild Ihr Porträt. Das Monogramm gilt für Google-Profil, Favicon und Flächen ohne Gesicht.",
  kohorteMakler: "Das Team prüft einen ähnlichen Entwurf.",
  schild: "Schildmaß fehlt.",
  kontakt: "Telefon und E-Mail aus der Einrichtung",
  portrait: "Porträt aus dem Porträt-Termin",
  claim: "Claim aus dem Branding",
  cmyk: "folgt nach dem Druckproof",
  zaehltNicht: "zählt nicht als Erkennung",
  keineGeschwister: "Auf dieser Achse gibt es für diesen Entwurf keine Geschwister.",
};

/* ---------- Kleine Helfer ---------- */
function hmLkZufall(seed) { let a = 0; for (const ch of String(seed)) a = (Math.imul(a, 31) + ch.charCodeAt(0)) | 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const hmLkZahl = (v, d) => Number(v).toLocaleString("de-AT", { minimumFractionDigits: d, maximumFractionDigits: d });
const hmLkArtName = (id) => (HM_LK_ARTEN.find((x) => x.id === id) || {}).name || id;
function hmLkRgb(hex) { let x = String(hex || "#000").replace("#", ""); if (x.length === 3) x = x.split("").map((z) => z + z).join(""); return [0, 2, 4].map((i) => parseInt(x.substr(i, 2), 16) || 0); }
function hmLkLum(hex) { const k = [0.2126, 0.7152, 0.0722]; return hmLkRgb(hex).reduce((s, v, i) => { const c = v / 255; return s + k[i] * (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)); }, 0); }
function hmLkKontrast(a, b) { const x = hmLkLum(a), y = hmLkLum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
/* Akzent lesbar machen: über hmWeltLesbar aus den Markenwelten, sonst gleiche Regel hier */
function hmLkLesbarAuf(fg, bg, ziel) {
  if (typeof hmWeltLesbar === "function") return hmWeltLesbar(fg, bg, ziel);
  if (hmLkKontrast(fg, bg) >= ziel) return fg;
  const misch = (a, c, t) => { const A = hmLkRgb(a), B = hmLkRgb(c); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join(""); };
  const pole = [HM_LK_TINTE, "#FFFFFF"].sort((x, y) => hmLkKontrast(y, bg) - hmLkKontrast(x, bg));
  for (const pol of pole) for (let t = 0.1; t <= 1.001; t += 0.1) { const m = misch(fg, pol, t); if (hmLkKontrast(m, bg) >= ziel) return m; }
  return pole[0];
}
function hmLkWoerter(text) { return String(text || "").split(/[^A-Za-zÄÖÜäöüß]+/).filter(Boolean); }
function hmLkWortTreffer(w) { const l = String(w || "").toLowerCase(); return HM_LK_WORT_ZEICHEN.find((e) => e.muster.test(l)) || null; }
function hmLkNeueId(s) { const o = {}; HM_LK_FELDER.forEach((k) => { o[k] = s[k] == null ? null : s[k]; }); return "lk" + hmLkZufall(JSON.stringify(o))().toString(36).slice(2, 9); }

/* ---------- Stichworte der Marke ---------- */
function hmLkStichworte(mid) { return hmLkStichworteMitWelt(mid).liste; }
function hmLkStichworteMitWelt(mid) {
  const b = hmBrand(mid);
  const st = (((hmStore.get("logos") || {})[mid] || {}).stichworte) || {};
  const aus = st.aus || [], eigen = st.eigen || [];
  let p = null; try { p = window.hmMbPlattform ? hmMbPlattform(mid) : null; } catch (e) { p = null; }
  let welt = null; try { welt = window.hmMbWelt ? hmMbWelt(mid, p) : null; } catch (e) { welt = null; }
  const idee = (((hmStore.get("marke2") || {})[mid] || {}).idee) || {};
  const quellen = [
    ["claim", b.br && b.br.claim ? b.br.claim : (b.w ? b.claim : "")], ["claim", b.br && b.br.claim],
    ["idee", idee.satz], ["idee", idee.zeichen && idee.zeichen.name],
    ["welt", welt && welt.zeichen && welt.zeichen.name], ["welt", welt && welt.name],
    ["visuell", p && p.visuell && typeof p.visuell.zeichen === "string" ? p.visuell.zeichen : ""],
    ...(((p && p.persoenlichkeit) || []).map((x) => ["persoenlichkeit", typeof x === "string" ? x : x && x.wort])),
    ...eigen.map((w) => ["eigen", w]),
  ];
  const out = [];
  quellen.forEach(([quelle, text]) => {
    if (!text || typeof text !== "string") return;
    for (const w of hmLkWoerter(text)) {
      const e = hmLkWortTreffer(w); if (!e) continue;
      const id = hmDateiname(e.wort); if (out.some((x) => x.id === id)) continue;
      out.push({ id, wort: w.charAt(0).toUpperCase() + w.slice(1), quelle, zeichen: e.zeichen.slice(), an: !aus.includes(id), welt: quelle === "welt" && welt ? welt.name : null });
    }
  });
  /* Welt ohne passendes Wort: ihr festes Zeichen */
  if (welt && !out.some((x) => x.quelle === "welt") && HM_LK_WELT_ZEICHEN[welt.id]) {
    const z = HM_LK_WELT_ZEICHEN[welt.id]; const id = "welt-" + welt.id;
    if (!out.some((x) => x.zeichen.includes(z))) out.push({ id, wort: welt.name, quelle: "welt", zeichen: [z], an: !aus.includes(id), welt: welt.name });
  }
  return { liste: out, welt };
}
function hmLkQuelleText(s) {
  return { claim: "aus dem Claim", idee: "aus der Idee", welt: `aus der Welt ${s.welt || ""}`.trim(), visuell: "aus der Erscheinung", persoenlichkeit: "aus der Persönlichkeit", eigen: "vom Team ergänzt" }[s.quelle] || "";
}
function hmLkHerkunftVon(s, z) {
  if (!s) return null;
  if (s.quelle === "welt") return { typ: "welt", welt: s.welt || s.wort, zeichen: z };
  if (s.quelle === "claim" || s.quelle === "idee") return { typ: "idee", zeichen: z, wort: s.wort };
  return { typ: "stichwort", wort: s.wort, zeichen: z };
}
/* Herkunft in der Unterzeile ("Kein Wert ohne warum") */
function hmLkHerkunftText(spec, b) {
  const h = spec && spec.herkunft;
  if (h && h.typ === "bestand") return "aus Bestandslogo";
  if (h && h.typ === "welt") return "aus Welt " + h.welt;
  if (h && h.typ === "idee") return "aus Idee: " + (HM_LK_ZEICHEN_NAME[h.zeichen] || hmLkArtName(h.zeichen) || h.wort);
  if (h && h.typ === "stichwort") return "aus Stichwort " + h.wort;
  if (b && b.logoKonzept && spec && b.logoKonzept.id === spec.id) return "übernommenes Logo";
  if (b && b.schrift && spec && (spec.font === b.schrift.d || spec.font === b.schrift.t)) return "aus der Schrift der Marke";
  return "aus dem Schriftpool";
}

/* Kontext: aktive Stichworte ergeben die Zeichen, jedes mit seiner Herkunft */
function hmLkKontext(mid, stw) {
  const b = hmBrand(mid);
  const sw = hmLkStichworteMitWelt(mid); const alle = sw.liste; const welt = sw.welt;
  let aktiv = alle.filter((x) => x.an);
  if (Array.isArray(stw)) {
    const w = stw.map((x) => typeof x === "string" ? x.toLowerCase() : (x && (x.id || String(x.wort || "").toLowerCase())));
    aktiv = alle.filter((x) => w.includes(x.id) || w.includes(String(x.wort).toLowerCase()));
  }
  const zeichen = [], herkunft = {}, arten = [];
  aktiv.forEach((s) => s.zeichen.forEach((z) => {
    if (HM_LK_ZEICHEN_NAME[z]) { if (!zeichen.includes(z)) { zeichen.push(z); herkunft[z] = hmLkHerkunftVon(s, z); } }
    else if (!arten.includes(z)) { arten.push(z); herkunft[z] = hmLkHerkunftVon(s, z); }
  }));
  if (!zeichen.length) { zeichen.push("fenster"); herkunft.fenster = welt ? { typ: "welt", welt: welt.name, zeichen: "fenster" } : null; }
  return { b, welt, zeichen, herkunft, arten, stichworte: aktiv };
}

/* ---------- Sperrgrenzen ---------- */
function hmLkKlemmen(spec) {
  const s = { ...(spec || {}) };
  const art = s.art || "satz"; s.art = art;
  const g = HM_LK_GRENZEN[art] || HM_LK_GRENZEN.satz;
  const kl = (v, ab, d) => { const n = typeof v === "number" && isFinite(v) ? v : d; return Math.min(ab[1], Math.max(ab[0], n)); };
  const lw = s.favicon ? [g.laufweite[0], g.laufweite[1] + (g.laufweite[1] > g.laufweite[0] ? 0.02 : 0)] : g.laufweite;
  s.laufweite = kl(s.laufweite, lw, lw[0] <= 0 && lw[1] >= 0 ? 0 : lw[0]);
  s.verhaeltnis = kl(s.verhaeltnis, g.verhaeltnis, 1);
  s.zelle = kl(s.zelle, g.zelle, art === "teilung" ? 0.74 : art === "dickte" && !s.versal ? 0.68 : 0.8);
  s.staerke = kl(s.staerke, [1, 1.4], 1);
  s.minLinie = kl(s.minLinie, [0, 60], 0);
  const sch = HM_LK_SCHRIFTEN.find((x) => x.f === s.font);
  if (sch) { const w = typeof s.gewicht === "number" ? s.gewicht : 400; s.gewicht = sch.w.reduce((a, x) => Math.abs(x - w) < Math.abs(a - w) ? x : a, sch.w[0]); }
  else if (typeof s.gewicht !== "number") s.gewicht = 400;
  s.versal = art === "gesperrt" || art === "teilung" ? true : !!s.versal;
  s.akzent = !!s.akzent;
  const mitZeichen = art === "zeichen" || art === "zeichen-nur" || art === "dickte";
  s.zeichen = mitZeichen && s.zeichen ? s.zeichen : null;
  if (art === "zeichen" || (art === "dickte" && s.zeichen)) s.lage = s.zeichen === "ratstrich" ? "links" : (["links", "oben", "unten", "rechts"].includes(s.lage) ? s.lage : "links");
  else if (art === "monogramm") s.lage = ["nebeneinander", "gestapelt", "spalte"].includes(s.lage) ? s.lage : "nebeneinander";
  else if (art === "dickte") s.lage = s.lage === "gestapelt" ? "gestapelt" : null;
  else s.lage = null;
  return s;
}
function hmLkHatZeichen(spec) { return !!(spec && spec.zeichen && spec.zeichen !== "ratstrich" && (spec.art === "zeichen" || spec.art === "dickte" || spec.art === "zeichen-nur")); }

/* ---------- Entwürfe ---------- */
function hmLkKonzepte(mid, opt) {
  const o = opt || {}; const k = hmLkKontext(mid, o.stichworte); const b = k.b;
  const r = hmLkZufall(mid + "|" + (o.runde || 0) + "|" + (o.basis ? o.basis.id : "") + "|" + (o.richtungen || []).join(",") + (o.achse ? "|" + o.achse : ""));
  if (o.basis && o.achse) return hmLkGeschwister(hmLkKlemmen(o.basis), o.achse, k).slice(0, 6);
  const wahl = (l) => l[Math.floor(r() * l.length)];
  const markeD = HM_LK_SCHRIFTEN.find((x) => b.schrift && x.f === b.schrift.d), markeT = HM_LK_SCHRIFTEN.find((x) => b.schrift && x.f === b.schrift.t);
  const richt = HM_LK_RICHTUNGEN.filter((x) => (o.richtungen || []).includes(x.id));
  const arten = richt.length ? [...new Set(richt.flatMap((x) => x.arten))] : HM_LK_STANDARD_ARTEN;
  const klasse = richt.map((x) => x.k).filter(Boolean);
  const pool = HM_LK_SCHRIFTEN.filter((x) => !klasse.length || klasse.includes(x.k));
  const schrift = () => { const z = r(); return z < 0.45 && markeD && pool.includes(markeD) ? markeD : z < 0.65 && markeT && pool.includes(markeT) ? markeT : wahl(pool.length ? pool : HM_LK_SCHRIFTEN); };
  const n = Math.min(18, o.anzahl || 18); const out = [];
  let zNr = 0, dickteNr = 0;
  const ideeZeichen = k.zeichen.includes("ratlinie") ? "ratlinie" : k.zeichen[0];
  /* Die Art "zeichen" zeigt zuerst die übrigen Zeichen, weil die erste Dickte das Zeichen der Idee trägt */
  const zReihe = arten.includes("dickte") ? [...k.zeichen.filter((z) => z !== ideeZeichen), ideeZeichen] : k.zeichen;
  for (let i = 0; i < n; i++) {
    let art, s, zeichen = null, lage = null;
    if (o.basis) {
      art = o.basis.art; const gleiche = HM_LK_SCHRIFTEN.filter((x) => x.k === (HM_LK_SCHRIFTEN.find((y) => y.f === o.basis.font) || {}).k);
      s = i === 0 ? HM_LK_SCHRIFTEN.find((x) => x.f === o.basis.font) || wahl(gleiche) : wahl(gleiche.length ? gleiche : HM_LK_SCHRIFTEN);
      if (art === "zeichen") zeichen = o.basis.zeichen && i < n / 2 ? o.basis.zeichen : wahl(k.zeichen);
      if (art === "dickte") zeichen = o.basis.zeichen || null;
    } else {
      art = arten[i % arten.length]; s = schrift();
      if (art === "zeichen") zeichen = zReihe[zNr++ % zReihe.length];
      if (art === "dickte") {
        /* Erste Dickte der Runde: Schrift der Marke mit dem Zeichen der Idee (Gegenprüfung Markus: Dickte mit Ratlinie) */
        if (dickteNr === 0) { s = (markeD && pool.includes(markeD) ? markeD : markeT && pool.includes(markeT) ? markeT : s); zeichen = ideeZeichen; lage = "links"; }
        else zeichen = r() < 0.35 ? wahl(k.zeichen) : null;
        dickteNr++;
      }
    }
    const versal = art === "gesperrt" || art === "teilung" ? true : art === "satz" ? r() < 0.15 : art === "dickte" ? r() < 0.25 : false;
    if (!lage) lage = art === "zeichen" || (art === "dickte" && zeichen) ? (zeichen === "ratstrich" ? "links" : wahl(["links", "oben", "unten", "rechts"])) : art === "monogramm" ? wahl(["nebeneinander", "gestapelt", "spalte"]) : art === "dickte" ? (r() < 0.25 ? "gestapelt" : null) : null;
    let spec = {
      art, font: s.f, gewicht: wahl(s.w), versal,
      laufweite: art === "gesperrt" ? 0.16 + r() * 0.16 : art === "teilung" || art === "dickte" ? 0 : art === "satz" ? -0.02 + r() * 0.04 : 0.02,
      zeichen, lage,
      akzent: art === "punkt" || art === "zeichen" || (art === "dickte" && !!zeichen) || r() < 0.3,
      verhaeltnis: o.basis && o.basis.verhaeltnis ? o.basis.verhaeltnis : 1,
      zelle: art === "dickte" ? (o.basis && o.basis.zelle ? o.basis.zelle : versal ? 0.8 + r() * 0.06 : 0.64 + r() * 0.06) : art === "teilung" ? 0.74 : undefined,
    };
    if (o.basis && i > 0) { spec.laufweite = Math.max(-0.03, (o.basis.laufweite || 0) + (r() - 0.5) * 0.08); spec.lage = o.basis.lage && r() < 0.6 ? o.basis.lage : spec.lage; }
    spec = hmLkKlemmen(spec);
    spec.herkunft = spec.zeichen ? (k.herkunft[spec.zeichen] || null) : (o.basis && o.basis.herkunft && !o.basis.zeichen ? o.basis.herkunft : null);
    spec.id = hmLkNeueId(spec);
    if (!out.some((x) => x.id === spec.id)) out.push(spec);
  }
  return out;
}

/* Geschwister: ändern nur die Felder ihrer Achse (HM_LK_ACHSEN) */
function hmLkGeschwister(basis, achse, k) {
  const out = [];
  const add = (patch, herkunft) => {
    const s = hmLkKlemmen({ ...basis, ...patch });
    s.herkunft = herkunft !== undefined ? herkunft : basis.herkunft || null;
    s.id = hmLkNeueId(s);
    if (s.id !== basis.id && !out.some((x) => x.id === s.id)) out.push(s);
  };
  const standardLw = { satz: 0, punkt: 0, gesperrt: 0.18, gestapelt: 0.02, monogramm: 0.02, zeichen: 0.01, teilung: 0, dickte: 0 };
  const hatZ = (basis.art === "zeichen" || basis.art === "dickte") && !!basis.zeichen;
  if (achse === "schrift") {
    const b = k.b; const klasse = (HM_LK_SCHRIFTEN.find((x) => x.f === basis.font) || {}).k;
    const rang = (x) => (b.schrift && (x.f === b.schrift.d || x.f === b.schrift.t) ? 0 : x.k === klasse ? 1 : 2);
    HM_LK_SCHRIFTEN.filter((x) => x.f !== basis.font).sort((x, y) => rang(x) - rang(y)).forEach((x) => add({ font: x.f, gewicht: basis.gewicht }));
  } else if (achse === "anordnung") {
    if (hatZ) {
      ["links", "oben", "unten", "rechts"].filter((l) => l !== basis.lage).forEach((l) => add({ lage: l }));
      add(basis.art === "zeichen" ? { art: "dickte", laufweite: 0 } : { art: "zeichen", laufweite: standardLw.zeichen });
    } else {
      if (basis.art === "monogramm") ["nebeneinander", "gestapelt", "spalte"].filter((l) => l !== basis.lage).forEach((l) => add({ lage: l }));
      if (basis.art === "dickte") add({ lage: basis.lage === "gestapelt" ? null : "gestapelt" });
      ["satz", "gesperrt", "gestapelt", "dickte", "teilung", "monogramm"].filter((a) => a !== basis.art).forEach((a) => add({
        art: a, laufweite: standardLw[a], lage: a === "monogramm" ? "spalte" : null,
        versal: a === "gesperrt" || a === "teilung" ? true : (basis.art === "gesperrt" || basis.art === "teilung" ? false : basis.versal),
        zelle: a === "teilung" ? 0.74 : a === "dickte" ? (basis.versal ? 0.8 : 0.68) : basis.zelle,
      }));
    }
  } else if (achse === "zeichen") {
    const pool = k.zeichen.filter((z) => z !== basis.zeichen);
    if (basis.art === "zeichen" || basis.art === "dickte") {
      pool.forEach((z) => add({ zeichen: z, lage: basis.lage || "links" }, k.herkunft[z] || null));
      if (basis.zeichen) add(basis.art === "dickte" ? { zeichen: null, lage: null } : { art: "satz", zeichen: null, lage: null, laufweite: basis.laufweite }, null);
    } else if (basis.art !== "monogramm" && basis.art !== "zeichen-nur") {
      pool.forEach((z) => add({ art: "zeichen", zeichen: z, lage: "links" }, k.herkunft[z] || null));
    }
  } else if (achse === "laufweite") {
    if (basis.art === "dickte" || basis.art === "teilung") {
      [0.66, 0.72, 0.76, 0.8, 0.84, 0.88].filter((z) => Math.abs(z - basis.zelle) > 0.015).forEach((z) => add({ zelle: z }));
    } else if (basis.art !== "monogramm" && basis.art !== "zeichen-nur") {
      const g = (HM_LK_GRENZEN[basis.art] || HM_LK_GRENZEN.satz).laufweite; const schritte = 6;
      for (let i = 0; i <= schritte; i++) { const v = Math.round((g[0] + (g[1] - g[0]) * i / schritte) * 1000) / 1000; if (Math.abs(v - basis.laufweite) > 0.006) add({ laufweite: v }); }
    }
  } else if (achse === "akzent") {
    add({ akzent: !basis.akzent });
  }
  return out;
}

/* Vorgeschlagen: drei Entwürfe aus den aktiven Stichworten */
function hmLkVorschlaege(mid) {
  const k = hmLkKontext(mid); const b = k.b;
  const d = HM_LK_SCHRIFTEN.find((x) => b.schrift && x.f === b.schrift.d) || HM_LK_SCHRIFTEN[0];
  const t = HM_LK_SCHRIFTEN.find((x) => b.schrift && x.f === b.schrift.t && x.k === "sans") || HM_LK_SCHRIFTEN.find((x) => x.f === "Instrument Sans");
  const out = [];
  /* Reihenfolge: vom Team ergänzte Wörter zuerst, dann je Stichwort sein erstes Zeichen, danach die übrigen */
  const reihe = [...k.stichworte.filter((s) => s.quelle === "eigen"), ...k.stichworte.filter((s) => s.quelle !== "eigen")];
  const paare = [...reihe.map((s) => [s, s.zeichen[0]]), ...reihe.flatMap((s) => s.zeichen.slice(1).map((z) => [s, z]))];
  for (const [s, z] of paare) {
    if (out.length >= 3) break;
    let spec = null;
    if (z === "teilung") spec = { art: "teilung", font: t.f, gewicht: 500, versal: true, laufweite: 0, zelle: 0.74, akzent: true };
    else if (z === "zeitmass") spec = { art: "dickte", font: d.f, gewicht: d.w[0], versal: false, laufweite: 0, zelle: 0.68, zeichen: "zeitmass", lage: "rechts", akzent: true };
    else if (HM_LK_ZEICHEN_NAME[z]) spec = { art: "zeichen", font: d.f, gewicht: d.w[0], versal: false, laufweite: 0.01, zeichen: z, lage: "links", akzent: true };
    if (!spec) continue;
    spec = hmLkKlemmen(spec); spec.herkunft = hmLkHerkunftVon(s, z); spec.id = hmLkNeueId(spec);
    if (!out.some((x) => x.id === spec.id)) out.push(spec);
  }
  return out;
}

/* ---------- Messen: Canvas für die Vorschau, Schriftdatei für Stamm und Versalhöhe ---------- */
const HM_LK_MESS = { ctx: null };
function hmLkMessCanvas(text, font, gewicht, size, ls) {
  if (!HM_LK_MESS.ctx) HM_LK_MESS.ctx = document.createElement("canvas").getContext("2d");
  const x = HM_LK_MESS.ctx; x.font = `${gewicht} ${size}px "${font}"`;
  return x.measureText(text).width + Math.max(0, [...text].length - 1) * (ls || 0) * size;
}
function hmLkName(b, spec) { const n = `${b.vor} ${b.nach}`.trim(); return spec.versal ? n.toUpperCase() : n; }
const HM_LK_STAMM = {}, HM_LK_VERSAL = {}, HM_LK_STAMM_P = {};
function hmLkStammSofort(font, gewicht) {
  const k = font + "|" + gewicht; if (HM_LK_STAMM[k]) return HM_LK_STAMM[k];
  return (HM_LK_STAMM_START[font] || 0.085) * (1 + ((gewicht || 400) - 400) / 400 * 0.55);
}
function hmLkVersalSofort(font, gewicht) { return HM_LK_VERSAL[font + "|" + gewicht] || HM_LK_VERSAL_START[font] || 0.7; }
/* Stammstärke aus dem Glyph "l": waagrechter Schnitt auf halber Höhe, Abstand der ersten beiden Kanten */
function hmLkStammMessen(font) {
  const g = font.charToGlyph("l"); const upm = font.unitsPerEm || 1000;
  const bb = g.getBoundingBox(); const yMitte = -((bb.y1 + bb.y2) / 2) * 1000 / upm;
  const cmds = g.getPath(0, 0, 1000).commands; const xs = []; let px = 0, py = 0, sx = 0, sy = 0;
  const kante = (x1, y1, x2, y2) => { if ((y1 - yMitte) * (y2 - yMitte) < 0) xs.push(x1 + (x2 - x1) * (yMitte - y1) / (y2 - y1)); };
  cmds.forEach((c) => {
    if (c.type === "M") { px = sx = c.x; py = sy = c.y; }
    else if (c.type === "L") { kante(px, py, c.x, c.y); px = c.x; py = c.y; }
    else if (c.type === "Q" || c.type === "C") {
      let lx = px, ly = py;
      for (let i = 1; i <= 12; i++) { const t = i / 12, u = 1 - t; let x, y;
        if (c.type === "Q") { x = u * u * px + 2 * u * t * c.x1 + t * t * c.x; y = u * u * py + 2 * u * t * c.y1 + t * t * c.y; }
        else { x = u * u * u * px + 3 * u * u * t * c.x1 + 3 * u * t * t * c.x2 + t * t * t * c.x; y = u * u * u * py + 3 * u * u * t * c.y1 + 3 * u * t * t * c.y2 + t * t * t * c.y; }
        kante(lx, ly, x, y); lx = x; ly = y; }
      px = c.x; py = c.y;
    } else if (c.type === "Z") { kante(px, py, sx, sy); px = sx; py = sy; }
  });
  xs.sort((a, b) => a - b);
  const s = xs.length >= 2 ? (xs[1] - xs[0]) / 1000 : ((bb.x2 - bb.x1) / upm) * 0.5;
  return isFinite(s) && s > 0.01 && s < 0.3 ? s : null;
}
function hmLkStamm(font, gewicht) {
  const k = font + "|" + gewicht;
  if (HM_LK_STAMM[k]) return Promise.resolve(HM_LK_STAMM[k]);
  if (!HM_LK_STAMM_P[k]) HM_LK_STAMM_P[k] = hmFontDatei(font, gewicht).then((f) => {
    const s = hmLkStammMessen(f) || hmLkStammSofort(font, gewicht);
    const os2 = f.tables && f.tables.os2; const upm = f.unitsPerEm || 1000;
    let cap = os2 && os2.sCapHeight ? os2.sCapHeight / upm : 0;
    if (!cap) { const h = f.charToGlyph("H").getBoundingBox(); cap = h.y2 / upm; }
    HM_LK_STAMM[k] = s; if (cap > 0.4 && cap < 0.95) HM_LK_VERSAL[k] = cap;
    try { window.dispatchEvent(new Event("hm-lk-stamm")); } catch (e) { /* ohne Fenster kein Ereignis */ }
    return s;
  }).catch(() => { delete HM_LK_STAMM_P[k]; return hmLkStammSofort(font, gewicht); });
  return HM_LK_STAMM_P[k];
}

/* ---------- Bauteile eines Entwurfs, in Einheiten mit Höhe um 100 ---------- */
function hmLkLayout(spec0, b, mess) {
  const spec = hmLkKlemmen(spec0);
  const M = mess || hmLkMessCanvas; const ink = "INK", akz = "AKZ";
  const stamm = hmLkStammSofort(spec.font, spec.gewicht), kapF = hmLkVersalSofort(spec.font, spec.gewicht);
  const T = (text, x, y, size, o) => ({ typ: "text", text, x, y, size, font: (o && o.font) || spec.font, gewicht: (o && o.gewicht) || spec.gewicht, ls: o && o.ls != null ? o.ls : spec.laufweite, fill: (o && o.fill) || ink, anchor: (o && o.anchor) || "start", dicke: spec.staerke > 1 ? (spec.staerke - 1) * stamm * size : 0 });
  const teile = []; let W = 0, H = 100, S = stamm * 40 * spec.staerke, kap = kapF * 40, zellen = null;
  /* Name in fester Dickte: jede Letter optisch mittig in einer Zelle gleicher Breite, Wortabstand genau eine Zelle */
  const dickte = (x0, base, size, zeilen) => {
    const z = spec.zelle * size; const tt = []; const zl = []; let n = 0;
    zeilen.forEach((zeile, j) => { const ch = [...zeile]; ch.forEach((c, i) => { if (c.trim()) tt.push(T(c, x0 + i * z + z / 2, base + j * size * 1.12, size, { anchor: "middle", ls: 0 })); if (j === 0) zl.push(z); }); n = Math.max(n, ch.length); });
    zellen = zl; return { teile: tt, w: n * z };
  };
  /* Zeichen neben, über, unter dem Namen; Ratstrich immer links in Versalhöhe (FEED_FINAL E23) */
  const mitZeichen = (block, size) => {
    const z = spec.zeichen || "fenster"; const v = spec.verhaeltnis; const Sz = stamm * size * spec.staerke; const F = { AKZ: spec.akzent ? akz : ink, INK: ink };
    const bau = (x, y, g) => hmLkZeichenTeile(z, x, y, g, F, Sz, b);
    S = Sz; kap = kapF * size;
    if (z === "ratstrich") { const kh = kapF * size, base = 58, gap = size * 0.26; teile.push({ typ: "rect", x: 0, y: base - kh, w: Sz, h: kh, fill: F.AKZ }); const nb = block(Sz + gap, base); teile.push(...nb.teile); W = Sz + gap + nb.w; H = 84; return; }
    if (spec.lage === "oben") { const zw = bau(0, 0, 58 * v); const nb = block(0, zw.h + 50); teile.push(...zw.teile, ...nb.teile); W = Math.max(zw.w, nb.w); H = zw.h + 62; return; }
    if (spec.lage === "unten") { const nb = block(0, 44); const zw = bau(0, 62, 58 * v); teile.push(...nb.teile, ...zw.teile); W = Math.max(zw.w, nb.w); H = 62 + zw.h + 6; return; }
    const g = 64 * v; const probe = bau(0, 0, g); const off = Math.max(0, probe.h / 2 - 40); const zy = 40 + off - probe.h / 2;
    if (spec.lage === "rechts") { const nb = block(0, 58 + off); const zw = bau(nb.w + 18, zy, g); teile.push(...nb.teile, ...zw.teile); W = nb.w + 18 + zw.w; H = 84 + 2 * off; return; }
    const zw = bau(0, zy, g); const nb = block(zw.w + 18, 58 + off); teile.push(...zw.teile, ...nb.teile); W = zw.w + 18 + nb.w; H = 84 + 2 * off;
  };
  if (spec.art === "satz" || spec.art === "punkt") {
    const name = hmLkName(b, spec); const size = 52; const w = M(name, spec.font, spec.gewicht, size, spec.laufweite);
    teile.push(T(name, 0, 66, size)); W = w; S = stamm * size * spec.staerke; kap = kapF * size;
    if (spec.art === "punkt") { teile.push({ typ: "kreis", cx: w + 9, cy: 62, r: 6, fill: akz }); W = w + 16; }
    H = 90;
  } else if (spec.art === "gesperrt") {
    const name = hmLkName(b, spec); const size = 30; teile.push(T(name, 0, 58, size)); W = M(name, spec.font, spec.gewicht, size, spec.laufweite); H = 80; S = stamm * size * spec.staerke; kap = kapF * size;
    if (spec.akzent) { teile.push({ typ: "rect", x: 0, y: 70, w: 24, h: 2.5, fill: akz }); }
  } else if (spec.art === "gestapelt") {
    /* Nachname: Laufweite der Spec minus 0,035 em, damit alte Specs (0,02) wie bisher bei minus 0,015 stehen */
    const vor = b.vor.toUpperCase(), nach = b.nach; const s1 = 17, s2 = 54; const lsN = spec.laufweite - 0.035;
    teile.push(T(vor, 2, 26, s1, { ls: 0.3, gewicht: Math.min(600, spec.gewicht + 100) }));
    teile.push(T(nach, 0, 86, s2, { ls: lsN }));
    W = Math.max(M(vor, spec.font, Math.min(600, spec.gewicht + 100), s1, 0.3) + 2, M(nach, spec.font, spec.gewicht, s2, lsN)); H = 100; S = stamm * s2 * spec.staerke; kap = kapF * s2;
    if (spec.akzent) teile.push({ typ: "rect", x: 2, y: 36, w: 18, h: 2.5, fill: akz });
  } else if (spec.art === "monogramm") {
    const [a, c] = [b.vor[0] || "", b.nach[0] || ""];
    if (spec.lage === "gestapelt") {
      const s = 50; const wa = M(a, spec.font, spec.gewicht, s, 0), wc = M(c, spec.font, spec.gewicht, s, 0); W = Math.max(wa, wc) + 4;
      teile.push(T(a, W / 2, 46, s, { anchor: "middle", ls: 0 }), T(c, W / 2, 98, s, { anchor: "middle", ls: 0 })); H = 108; S = stamm * s * spec.staerke; kap = kapF * s;
      teile.push({ typ: "rect", x: 2, y: 54, w: W - 4, h: 2, fill: spec.akzent ? akz : ink });
    } else if (spec.lage === "spalte") {
      /* Initialen untereinander, linksbündig, ohne Kreis, Punkt oder Trennstrich: die erste Spalte der gestapelten Form */
      const s = 50; const wa = M(a, spec.font, spec.gewicht, s, 0), wc = M(c, spec.font, spec.gewicht, s, 0);
      teile.push(T(a, 0, 46, s, { ls: 0 }), T(c, 0, 98, s, { ls: 0 })); W = Math.max(wa, wc); H = 108; S = stamm * s * spec.staerke; kap = kapF * s;
    } else {
      const s = 70; const wa = M(a, spec.font, spec.gewicht, s, 0), wc = M(c, spec.font, spec.gewicht, s, 0);
      teile.push(T(a, 0, 76, s, { ls: 0 }), { typ: "rect", x: wa + 10, y: 18, w: 2.5, h: 64, fill: spec.akzent ? akz : ink }, T(c, wa + 22, 76, s, { ls: 0 })); W = wa + 22 + wc; H = 96; S = stamm * s * spec.staerke; kap = kapF * s;
    }
  } else if (spec.art === "zeichen") {
    const name = hmLkName(b, spec);
    mitZeichen((x, base) => ({ teile: [T(name, x, base, 40)], w: M(name, spec.font, spec.gewicht, 40, spec.laufweite) }), 40);
  } else if (spec.art === "zeichen-nur") {
    const F = { AKZ: spec.akzent ? akz : ink, INK: ink }; const z = spec.zeichen || "fenster";
    const probe = hmLkZeichenTeile(z, 0, 0, 64, F, S, b); const zw = hmLkZeichenTeile(z, 4, 4 + Math.max(0, (64 - probe.h) / 2), 64, F, S, b);
    teile.push(...zw.teile); W = zw.w + 6; H = 72;
  } else if (spec.art === "teilung") {
    /* Maßstab: jeder Buchstabe in einer Zelle gleicher Breite, darunter die Teilung */
    const name = hmLkName(b, spec).split(""); const size = 30; const zelle = size * spec.zelle;
    name.forEach((ch, i) => { if (ch.trim()) teile.push(T(ch, i * zelle + zelle / 2, 52, size, { anchor: "middle", ls: 0 })); });
    W = name.length * zelle; H = 84; S = stamm * size * spec.staerke; kap = kapF * size; zellen = name.map(() => zelle);
    teile.push({ typ: "rect", x: 0, y: 66, w: W, h: 1.5, fill: ink });
    name.forEach((ch, i) => teile.push({ typ: "rect", x: i * zelle, y: i % 5 === 0 ? 60 : 63, w: 1.5, h: i % 5 === 0 ? 7.5 : 4.5, fill: ink }));
    teile.push({ typ: "rect", x: W - 1.5, y: 60, w: 1.5, h: 7.5, fill: ink });
    if (spec.akzent) teile.push({ typ: "rect", x: 0, y: 66, w: zelle * 2, h: 1.5, fill: akz });
  } else if (spec.art === "dickte") {
    if (spec.zeichen) mitZeichen((x, base) => dickte(x, base, 40, [hmLkName(b, spec)]), 40);
    else if (spec.lage === "gestapelt") { const size = 44; const d = dickte(0, 44, size, spec.versal ? [b.vor.toUpperCase(), b.nach.toUpperCase()] : [b.vor, b.nach]); teile.push(...d.teile); W = d.w; H = 44 + size * 1.12 + 14; S = stamm * size * spec.staerke; kap = kapF * size; }
    else { const size = 44; const d = dickte(0, 58, size, [hmLkName(b, spec)]); teile.push(...d.teile); W = d.w; H = 80; S = stamm * size * spec.staerke; kap = kapF * size; }
  }
  /* Favicon: eine Akzentlinie unter der Mindeststärke wird Fläche */
  if (spec.minLinie > 0) teile.forEach((t) => {
    if (t.fill !== akz) return;
    if (t.typ === "rect") { if (t.w < spec.minLinie) { t.x -= (spec.minLinie - t.w) / 2; t.w = spec.minLinie; } if (t.h < spec.minLinie) t.h = spec.minLinie; }
    else if (t.typ === "linie" && t.s < spec.minLinie) t.s = spec.minLinie;
  });
  return { teile, W: Math.ceil(W + 2), H, S, kap, zellen, stamm };
}
/* Zeichen aus der Idee. S ist die Strichstärke aus dem Stamm der Schrift (statt fester Faktoren) */
function hmLkZeichenTeile(z, x, y, g, F, S, b) {
  const t = []; const akz = F.AKZ, ink = F.INK;
  if (z === "ratlinie") { const w = g * 1.1, hs = S * 0.6; t.push({ typ: "rect", x, y: y + g * 0.14, w: S, h: g * 0.72, fill: akz }, { typ: "rect", x: x + S, y: y + g * 0.5 - hs / 2, w: w - 2 * S, h: hs, fill: akz }, { typ: "rect", x: x + w - S, y: y + g * 0.3, w: S, h: g * 0.4, fill: akz }); return { teile: t, w, h: g }; }
  if (z === "ratstrich") { t.push({ typ: "rect", x, y: y + g * 0.14, w: S, h: g * 0.72, fill: akz }); return { teile: t, w: S, h: g }; }
  if (z === "zeitmass") { const w = g * 1.5, eh = g * 0.36, hs = S * 0.6; t.push({ typ: "rect", x, y, w: S, h: eh, fill: akz }, { typ: "rect", x, y: y + eh / 2 - hs / 2, w, h: hs, fill: akz }, { typ: "rect", x: x + w - S, y, w: S, h: eh, fill: akz }); return { teile: t, w, h: eh }; }
  if (z === "fenster") { const w = g * 0.75, rw = w - g * 0.1, rh = g - g * 0.1; t.push({ typ: "rahmen", x, y, w: rw, h: rh, s: S, fill: ink }, { typ: "rect", x: x + g * 0.1, y: y + g - S, w: rw, h: S, fill: akz }, { typ: "rect", x: x + w - S, y: y + g * 0.1, w: S, h: rh - S, fill: akz }); return { teile: t, w, h: g }; }
  if (z === "bogen") { const w = g * 0.72; t.push({ typ: "pfad", d: `M${x} ${y + w / 2}A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2}L${x + w} ${y + g}L${x} ${y + g}Z`, fill: akz }); return { teile: t, w, h: g }; }
  if (z === "kante") { const w = g; t.push({ typ: "rahmen", x, y, w, h: g, s: S * 0.8, fill: ink }, { typ: "rect", x, y: y + g * 0.618, w, h: g * 0.382, fill: ink }, { typ: "rect", x, y: y + g * 0.618 - S * 1.2, w: w * 0.4, h: S * 1.2, fill: akz }); return { teile: t, w, h: g }; }
  if (z === "schriftfeld") { const w = g * 1.2, zw = w / 3, zh = g / 3; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) t.push({ typ: "rahmen", x: x + i * zw, y: y + j * zh, w: zw, h: zh, s: S * 0.5, fill: ink }); t.push({ typ: "rect", x: x + 2 * zw, y: y + 2 * zh, w: zw, h: zh, fill: akz }); return { teile: t, w, h: g }; }
  if (z === "graetzl") { const w = g * 1.2; const r = hmLkZufall(((b && b.vor) || "") + ((b && b.nach) || "")); let px = x, py = y + g * 0.7, d = `M${px} ${py}`; for (let i = 0; i < 4; i++) { px += w / 4; py = y + g * (0.2 + r() * 0.6); d += `L${px.toFixed(1)} ${py.toFixed(1)}`; } t.push({ typ: "linie", d, s: S, fill: ink }, { typ: "kreis", cx: px, cy: py, r: Math.max(g * 0.08, S * 1.1), fill: akz }); return { teile: t, w: w + g * 0.1, h: g }; }
  /* folio */ { const w = g * 0.9; t.push({ typ: "rect", x, y: y + g * 0.7, w, h: S * 0.7, fill: ink }, { typ: "text", text: "01", x, y: y + g * 0.6, size: g * 0.46, font: "Instrument Sans", gewicht: 500, ls: 0, fill: akz, anchor: "start", dicke: 0 }); return { teile: t, w, h: g }; }
}

/* ---------- Farben ---------- */
function hmLkFarben(b, farbe, invert) { return { INK: invert ? "#F7F5F1" : (farbe || "#0B0A09"), AKZ: b.akzent || "#B17834" }; }
function hmLkFassung(b, fassung) {
  const F = (typeof fassung === "string" ? HM_LK_FASSUNGEN.find((x) => x.id === fassung) : fassung) || HM_LK_FASSUNGEN[0];
  const akz = (b && b.akzent) || "#B17834"; const name = F.name;
  if (F.id === "negativ") return { INK: HM_LK_KREIDE, AKZ: hmLkLesbarAuf(akz, HM_LK_NACHT, 3), GRUND: HM_LK_NACHT, name };
  if (F.id === "akzent") { const a = hmLkLesbarAuf(akz, HM_LK_PAPIER, 3); return { INK: a, AKZ: a, GRUND: HM_LK_PAPIER, name }; }
  if (F.id === "schwarz") return { INK: "#000000", AKZ: "#000000", GRUND: "#FFFFFF", name };
  if (F.id === "weiss") return { INK: "#FFFFFF", AKZ: "#FFFFFF", GRUND: HM_LK_NACHT, name };
  if (F.id === "ohneAkzent") return { INK: HM_LK_TINTE, AKZ: HM_LK_TINTE, GRUND: HM_LK_PAPIER, name };
  return { INK: HM_LK_TINTE, AKZ: hmLkLesbarAuf(akz, HM_LK_PAPIER, 3), GRUND: HM_LK_PAPIER, name };
}

/* ---------- Ausgabe als SVG ---------- */
function hmLkBauteileSvg(L, F, textFn, opt) {
  const esc = (x) => String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const el = L.teile.map((t) => {
    const fill = F[t.fill] || t.fill;
    if (t.typ === "text") return textFn(t, fill, esc);
    if (t.typ === "rect") return `<rect x="${t.x.toFixed(1)}" y="${t.y.toFixed(1)}" width="${t.w.toFixed(1)}" height="${t.h.toFixed(1)}" fill="${fill}"/>`;
    if (t.typ === "rahmen") return `<rect x="${(t.x + t.s / 2).toFixed(1)}" y="${(t.y + t.s / 2).toFixed(1)}" width="${(t.w - t.s).toFixed(1)}" height="${(t.h - t.s).toFixed(1)}" fill="none" stroke="${fill}" stroke-width="${t.s.toFixed(2)}"/>`;
    if (t.typ === "kreis") return `<circle cx="${t.cx.toFixed(1)}" cy="${t.cy.toFixed(1)}" r="${t.r.toFixed(1)}" fill="${fill}"/>`;
    if (t.typ === "pfad") return `<path d="${t.d}" fill="${fill}"/>`;
    if (t.typ === "linie") return `<path d="${t.d}" fill="none" stroke="${fill}" stroke-width="${t.s.toFixed(2)}" stroke-linejoin="round" stroke-linecap="round"/>`;
    return "";
  }).join("");
  const o = opt || {};
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L.W} ${L.H}"${o.hoehe ? ` height="${o.hoehe}"` : ""} role="img" aria-label="${esc(o.label || "Logo")}">${el}</svg>`;
}
const hmLkStrich = (t, fill) => t.dicke ? ` stroke="${fill}" stroke-width="${t.dicke.toFixed(2)}" stroke-linejoin="round"` : "";
/* SVG als Text: Vorschau, Website-Kopf, Download ohne Pfade */
function hmLkSvgText(spec, b, o) {
  const opt = o || {}; const L = hmLkLayout(spec, b); const F = opt.fassung ? hmLkFassung(b, opt.fassung) : hmLkFarben(b, opt.farbe, opt.invert);
  return hmLkBauteileSvg(L, F, (t, fill, esc) => `<text x="${t.x.toFixed(1)}" y="${t.y}" font-family="&quot;${t.font}&quot;, serif" font-weight="${t.gewicht}" font-size="${t.size}" letter-spacing="${(t.ls * t.size).toFixed(2)}" text-anchor="${t.anchor}" fill="${fill}"${hmLkStrich(t, fill)}>${esc(t.text)}</text>`, { hoehe: opt.hoehe, label: b.vor + " " + b.nach });
}
/* Export: Schrift in Pfade, unabhängig von installierten Schriften. Maße aus den echten Schriftmetriken.
   Scheitert eine Schriftdatei, wird das Versprechen abgelehnt (keine Ersatzschrift). */
async function hmLkSvgPfade(spec, b, o) {
  const opt = o || {}; const F = opt.fassung ? hmLkFassung(b, opt.fassung) : hmLkFarben(b, opt.farbe, opt.invert);
  const fonts = {};
  for (const t of hmLkLayout(spec, b, () => 10).teile.filter((x) => x.typ === "text")) { const k = t.font + "|" + t.gewicht; if (!fonts[k]) fonts[k] = await hmFontDatei(t.font, t.gewicht); }
  const f = (font, gewicht) => fonts[font + "|" + gewicht] || Object.values(fonts)[0];
  const L = hmLkLayout(spec, b, (text, font, gewicht, size, ls) => hmTextPfad(f(font, gewicht), text, 0, 0, size, ls || 0).breite);
  return hmLkBauteileSvg(L, F, (t, fill) => { const ff = f(t.font, t.gewicht); const w = hmTextPfad(ff, t.text, 0, 0, t.size, t.ls).breite; const x = t.anchor === "middle" ? t.x - w / 2 : t.x; return `<path d="${hmTextPfad(ff, t.text, x, t.y, t.size, t.ls).d}" fill="${fill}"${hmLkStrich(t, fill)}/>`; }, { label: b.vor + " " + b.nach });
}
async function hmLkLaden(spec, b) {
  try { const svg = await hmLkSvgPfade(spec, b); hmLaden(new Blob([svg], { type: "image/svg+xml" }), `${hmDateiname(b.vor + "-" + b.nach)}-logo-${spec.art}.svg`); }
  catch (e) { console.warn(e); hmLaden(new Blob([hmLkSvgText(spec, b)], { type: "image/svg+xml" }), `${hmDateiname(b.vor + "-" + b.nach)}-logo-${spec.art}.svg`); }
}
/* SVG neu rahmen: Box, Rand, Grund, Quadrat mit Randanteil oder festes Seitenverhältnis */
function hmLkBox(svg) { const m = String(svg).match(/viewBox="([^"]+)"/); return m ? m[1].trim().split(/\s+/).map(Number) : [0, 0, 100, 100]; }
function hmLkInnen(svg) { return String(svg).replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, ""); }
function hmLkRahmen(svg, o) {
  const opt = o || {}; const innen = hmLkInnen(svg); const [x, y, w, h] = opt.box || hmLkBox(svg); const r = opt.rand || 0;
  let X = x - r, Y = y - r, B = w + 2 * r, H = h + 2 * r;
  if (opt.quadrat) { const seite = Math.max(w, h) / Math.max(0.2, 1 - 2 * opt.quadrat); X = x + w / 2 - seite / 2; Y = y + h / 2 - seite / 2; B = H = seite; }
  else if (opt.verhaeltnis) { if (B / H > opt.verhaeltnis) { const nh = B / opt.verhaeltnis; Y -= (nh - H) / 2; H = nh; } else { const nb = H * opt.verhaeltnis; X -= (nb - B) / 2; B = nb; } }
  const f = (v) => String(Math.round(v * 100) / 100);
  const groesse = opt.px ? ` width="${Math.round(opt.px)}" height="${Math.max(1, Math.round(opt.px * H / B))}"` : "";
  const bg = opt.grund ? `<rect x="${f(X)}" y="${f(Y)}" width="${f(B)}" height="${f(H)}" fill="${opt.grund}"/>` : "";
  const label = (String(svg).match(/aria-label="([^"]*)"/) || [])[1] || "Logo";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f(X)} ${f(Y)} ${f(B)} ${f(H)}"${groesse} role="img" aria-label="${label}">${bg}${innen}</svg>`;
}
/* Enge Box: das Pfad-SVG wird gerendert und die Deckung abgetastet ("Ränder beschneiden") */
async function hmLkEngBox(svg) {
  const [x, y, w, h] = hmLkBox(svg); const pad = Math.max(w, h) * 0.1;
  try {
    const box = [x - pad, y - pad, w + 2 * pad, h + 2 * pad]; const breite = 1200; const hoehe = Math.max(1, Math.round(breite * box[3] / box[2]));
    const url = URL.createObjectURL(new Blob([hmLkRahmen(svg, { box, px: breite })], { type: "image/svg+xml" }));
    const img = new Image(); await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
    const c = document.createElement("canvas"); c.width = breite; c.height = hoehe; const g = c.getContext("2d", { willReadFrequently: true }); g.drawImage(img, 0, 0, breite, hoehe); URL.revokeObjectURL(url);
    const d = g.getImageData(0, 0, breite, hoehe).data; let x0 = breite, y0 = hoehe, x1 = -1, y1 = -1;
    for (let j = 0; j < hoehe; j++) for (let i = 0; i < breite; i++) if (d[(j * breite + i) * 4 + 3] > 8) { if (i < x0) x0 = i; if (i > x1) x1 = i; if (j < y0) y0 = j; if (j > y1) y1 = j; }
    if (x1 < 0) return [x, y, w, h];
    const k = box[2] / breite; return [box[0] + x0 * k, box[1] + y0 * k, (x1 - x0 + 1) * k, (y1 - y0 + 1) * k];
  } catch (e) { return [x, y, w, h]; }
}
/* Eine Datei in einer Fassung: SVG mit Pfaden oder PNG aus der Pfad-SVG */
async function hmLkDatei(spec, b, o) {
  const opt = { fassung: "positiv", format: "svg", rand: 1, trim: true, grund: "transparent", breite: 2000, hoehe: 0, quadrat: 0, ...(o || {}) };
  let svg; try { svg = await hmLkSvgPfade(spec, b, { fassung: opt.fassung }); } catch (e) { const f = new Error("schrift"); f.schrift = true; throw f; }
  const kap = hmLkLayout(spec, b).kap;
  const box = opt.trim || opt.quadrat ? await hmLkEngBox(svg) : hmLkBox(svg);
  const grund = opt.grund === "papier" ? HM_LK_PAPIER : opt.grund === "nacht" ? HM_LK_NACHT : /^#/.test(opt.grund || "") ? opt.grund : null;
  const px = opt.format === "png" ? Math.max(1, Math.round(opt.breite || 2000)) : null;
  const neu = hmLkRahmen(svg, { box, rand: opt.quadrat ? 0 : (opt.rand || 0) * kap, grund, quadrat: opt.quadrat, verhaeltnis: !opt.trim && !opt.quadrat && opt.breite && opt.hoehe ? opt.breite / opt.hoehe : null, px });
  if (opt.format === "png") return await hmSvgZuPng(neu, px);
  return new Blob([neu], { type: "image/svg+xml" });
}

/* ---------- Schriften des Pools laden, dann neu setzen ---------- */
let hmLkSchriftenP = null;
function hmLkSchriftenLaden() {
  if (!hmLkSchriftenP) hmLkSchriftenP = Promise.all(HM_LK_SCHRIFTEN.flatMap((s) => s.w.map((w) => document.fonts.load(`${w} 40px "${s.f}"`).catch(() => null)))).then(() => true);
  return hmLkSchriftenP;
}
function useLkSchriften() { const [da, setDa] = React.useState(false); React.useEffect(() => { let weg = false; hmLkSchriftenLaden().then(() => !weg && setDa(true)); return () => { weg = true; }; }, []); return da; }
/* Stamm der Schriften messen, sobald sie gebraucht werden; neu zeichnen, wenn ein Wert da ist */
function useLkStamm(specs) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => { const f = () => setV((x) => x + 1); window.addEventListener("hm-lk-stamm", f); return () => window.removeEventListener("hm-lk-stamm", f); }, []);
  const keys = [...new Set((specs || []).filter(Boolean).map((s) => (s.font || "") + "|" + (s.gewicht || 400)))].sort().join(",");
  React.useEffect(() => { keys.split(",").filter(Boolean).forEach((k) => { const [f, w] = k.split("|"); if (window.hmFontDatei) hmLkStamm(f, +w); }); }, [keys]);
  return v;
}

/* ---------- Abgeleitete Formen ---------- */
function LogoKonzept({ spec, b, h = 44, farbe, invert, fassung, style }) {
  const svg = hmLkSvgText(spec, b, { farbe, invert, fassung });
  return <span className="hm-lk-logo" style={{ height: h, display: "inline-block", ...(style || {}) }} dangerouslySetInnerHTML={{ __html: svg.replace("<svg ", `<svg height="${h}" `) }} />;
}
/* Monogramm oder Zeichen für runde Flächen, aus demselben Entwurf abgeleitet.
   Neu: Dickte ergibt das Monogramm als Spalte (M über L), der Ratstrich allein trägt keine Fläche. */
function hmLkProfilSpec(spec) {
  if (spec.art === "zeichen" && spec.zeichen !== "ratstrich") return { ...spec, art: "zeichen-nur" };
  if (spec.art === "dickte") return { ...spec, art: "monogramm", versal: false, zeichen: null, lage: "spalte" };
  return { ...spec, art: "monogramm", versal: false, lage: spec.art === "monogramm" ? spec.lage : "nebeneinander" };
}
function hmLkGestapeltSpec(spec0) {
  const spec = hmLkKlemmen(spec0);
  if (spec.art === "dickte") return hmLkKlemmen({ ...spec, zeichen: null, lage: "gestapelt" });
  if (spec.art === "gestapelt") return spec;
  return hmLkKlemmen({ ...spec, art: "gestapelt", zeichen: null, lage: null, laufweite: 0.02 });
}
function hmLkFormen(spec0) {
  const spec = hmLkKlemmen(spec0); const hat = hmLkHatZeichen(spec);
  const haupt = spec.art === "monogramm" || spec.art === "zeichen-nur" ? hmLkKlemmen({ ...spec, art: "satz", zeichen: null, lage: null, laufweite: 0 }) : spec;
  const profil = hmLkKlemmen(hmLkProfilSpec(spec));
  const zeichen = hat ? hmLkKlemmen({ ...spec, art: "zeichen-nur" }) : (profil.art === "monogramm" ? profil : hmLkKlemmen({ ...spec, art: "monogramm", lage: "nebeneinander", versal: false }));
  return { haupt, gestapelt: hmLkGestapeltSpec(spec), zeichen, profil, favicon: hmLkFavicon(profil, 32), hatZeichen: hat };
}
/* Favicon nach Logo Crunch: unter 48 px Striche plus 20 Prozent, Laufweite plus 0,02 em, Akzentlinie unter 3 px wird Fläche */
const HM_LK_B_PROBE = { vor: "M", nach: "L", akzent: "#B17834" };
function hmLkFavicon(spec, px, b) {
  const s = hmLkKlemmen(spec);
  if (!(px < 48)) return s;
  const L = hmLkLayout(s, b || HM_LK_B_PROBE, (t, f, g, size, ls) => [...t].length * size * (0.62 + (ls || 0)));
  const k = (px * 0.76) / Math.max(L.W, L.H);
  const neu = hmLkKlemmen({ ...s, staerke: Math.min(1.4, (s.staerke || 1) * 1.2), laufweite: s.laufweite + 0.02, minLinie: 3 / k, favicon: true });
  neu.herkunft = s.herkunft || null; neu.id = hmLkNeueId(neu);
  return neu;
}
function hmLkHoehe(spec, b, maxW, maxH) { const L = hmLkLayout(spec, b); return Math.max(10, Math.round(Math.min(maxH, (maxW * L.H) / Math.max(1, L.W)))); }
function hmLkBeschreibung(s) { return hmLkArtName(s.art) + (s.zeichen ? ", " + HM_LK_ZEICHEN_NAME[s.zeichen] : "") + (s.art === "monogramm" && s.lage === "spalte" ? ", Spalte" : ""); }

/* ---------- Raster, Hash, Prüfstand ---------- */
function hmLkZeichnen(ctx, L, k, F) {
  const farbe = (f) => (F ? F[f] || f : "#000");
  for (const t of L.teile) {
    const c = farbe(t.fill); ctx.fillStyle = c; ctx.strokeStyle = c;
    if (t.typ === "text") {
      ctx.font = `${t.gewicht} ${t.size * k}px "${t.font}"`; const chars = [...t.text]; const ls = t.ls * t.size * k;
      const br = chars.map((ch) => ctx.measureText(ch).width); const gesamt = br.reduce((a, x) => a + x, 0) + ls * Math.max(0, chars.length - 1);
      let x = t.x * k - (t.anchor === "middle" ? gesamt / 2 : 0);
      chars.forEach((ch, i) => { ctx.fillText(ch, x, t.y * k); if (t.dicke) { ctx.lineWidth = t.dicke * k; ctx.lineJoin = "round"; ctx.strokeText(ch, x, t.y * k); } x += br[i] + ls; });
    } else if (t.typ === "rect") ctx.fillRect(t.x * k, t.y * k, t.w * k, t.h * k);
    else if (t.typ === "rahmen") { ctx.lineWidth = t.s * k; ctx.strokeRect((t.x + t.s / 2) * k, (t.y + t.s / 2) * k, (t.w - t.s) * k, (t.h - t.s) * k); }
    else if (t.typ === "kreis") { ctx.beginPath(); ctx.arc(t.cx * k, t.cy * k, t.r * k, 0, Math.PI * 2); ctx.fill(); }
    else if (t.typ === "pfad" || t.typ === "linie") { ctx.save(); ctx.scale(k, k); const p = new Path2D(t.d); if (t.typ === "pfad") ctx.fill(p); else { ctx.lineWidth = t.s; ctx.lineJoin = "round"; ctx.lineCap = "round"; ctx.stroke(p); } ctx.restore(); }
  }
}
/* Graustufen (Deckung 0 bis 255) eines Entwurfs in grid x grid, eingepasst und mittig, aus unverbundenen Canvas */
function hmLkRasterGrid(spec, b, px, grid, bezug) {
  const L = hmLkLayout(spec, b); const k = px / (bezug === "breite" ? L.W : Math.max(L.W, L.H));
  const w1 = L.W * k, h1 = L.H * k;
  const c1 = document.createElement("canvas"); c1.width = Math.max(1, Math.ceil(w1)); c1.height = Math.max(1, Math.ceil(h1)); hmLkZeichnen(c1.getContext("2d"), L, k);
  const c2 = document.createElement("canvas"); c2.width = grid; c2.height = grid;
  const g2 = c2.getContext("2d", { willReadFrequently: true }); g2.imageSmoothingEnabled = true; g2.imageSmoothingQuality = "high";
  const s = grid / Math.max(w1, h1); g2.drawImage(c1, (grid - w1 * s) / 2, (grid - h1 * s) / 2, c1.width * s, c1.height * s);
  const d = g2.getImageData(0, 0, grid, grid).data; const out = new Uint8Array(grid * grid);
  for (let i = 0; i < out.length; i++) out[i] = d[i * 4 + 3];
  return out;
}
function hmLkRaster(spec, b, px) { return hmLkRasterGrid(spec, b, px || 256, 32); }
/* Übereinstimmung: Deckung ab 100 von 255 als Punkt, mit rad Punkten Toleranz in beide Richtungen verglichen.
   Genauigkeit (was klein da ist, steht auch groß da) und Vollständigkeit (was groß da ist, überlebt klein) als harmonisches Mittel.
   Verschwindet ein Strich in der kleinen Fassung, sinkt die Vollständigkeit; ein Versatz um einen Punkt zählt nicht. */
function hmLkUebereinstimmung(a, r, grid, rad) {
  const g = grid || Math.round(Math.sqrt(a.length)); const d = rad == null ? 1 : rad;
  const A = Array.from(a, (v) => (v >= 100 ? 1 : 0)), R = Array.from(r, (v) => (v >= 100 ? 1 : 0));
  const dehnen = (B) => { const o = new Uint8Array(B.length); for (let y = 0; y < g; y++) for (let x = 0; x < g; x++) { if (!B[y * g + x]) continue; for (let dy = -d; dy <= d; dy++) for (let dx = -d; dx <= d; dx++) { const X = x + dx, Y = y + dy; if (X >= 0 && Y >= 0 && X < g && Y < g) o[Y * g + X] = 1; } } return o; };
  const dA = dehnen(A), dR = dehnen(R); let na = 0, nr = 0, pa = 0, pr = 0;
  for (let i = 0; i < A.length; i++) { if (A[i]) { na++; if (dR[i]) pa++; } if (R[i]) { nr++; if (dA[i]) pr++; } }
  const P = na ? pa / na : 1, Q = nr ? pr / nr : 1; return P + Q ? (2 * P * Q) / (P + Q) : 1;
}
function hmLkLesbar(spec, b, px, grid, bezug) { return hmLkUebereinstimmung(hmLkRasterGrid(spec, b, px, grid, bezug), hmLkRasterGrid(spec, b, bezug === "breite" ? grid * 2 : 256, grid, bezug), grid, grid > 64 ? 2 : 1); }
/* Silhouetten-Hash: je Bit ein Punkt (1 oder Deckung ab 128), als Hex-Text. Rein rechnend. */
function hmLkHash(bits) {
  const b = bits || []; let out = "";
  for (let i = 0; i < b.length; i += 4) { let n = 0; for (let j = 0; j < 4; j++) { const v = b[i + j] || 0; n = (n << 1) | (v === 1 || v >= 128 ? 1 : 0); } out += n.toString(16); }
  return out;
}
function hmLkHamming(a, c) { let d = 0; const n = Math.max(a.length, c.length); for (let i = 0; i < n; i++) { let x = parseInt(a[i] || "0", 16) ^ parseInt(c[i] || "0", 16); while (x) { d += x & 1; x >>= 1; } } return d; }
function hmLkSpecAbstand(a0, c0) {
  const a = hmLkKlemmen(a0), c = hmLkKlemmen(c0);
  return (a.art !== c.art ? 0.3 : 0) + (a.font !== c.font ? 0.2 : 0) + (a.zeichen !== c.zeichen ? 0.15 : 0) + (a.lage !== c.lage ? 0.1 : 0) + (a.versal !== c.versal ? 0.1 : 0) + (a.akzent !== c.akzent ? 0.05 : 0) + Math.min(0.1, Math.abs(a.laufweite - c.laufweite) / 0.3 * 0.1);
}
/* Kohorte: beide Entwürfe mit dem eigenen Namen gesetzt, damit die Form verglichen wird, nicht der Name */
function hmLkKohorte(spec, mid) {
  const alle = hmStore.get("branding") || {}; const makler = hmStore.get("makler") || []; const b = hmBrand(mid);
  let eigen = null; let best = null;
  for (const [id, br] of Object.entries(alle)) {
    if (id === mid || !br || !br.logoKonzept) continue;
    if (eigen === null) eigen = hmLkHash(hmLkRaster(spec, b, 256));
    const abstand = hmLkSpecAbstand(spec, br.logoKonzept);
    const hamming = hmLkHamming(eigen, hmLkHash(hmLkRaster(br.logoKonzept, b, 256)));
    const score = abstand + hamming / 1024;
    if (!best || score < best.score) best = { mid: id, name: (makler.find((x) => x.id === id) || {}).name || id, abstand, hamming, score };
  }
  return { naechster: best ? { mid: best.mid, name: best.name, abstand: best.abstand, hamming: best.hamming } : null };
}
function hmLkPruefen(spec0, b, o) {
  const opt = o || {}; const spec = hmLkKlemmen(spec0); const out = [];
  const stufe = (v) => (v >= 0.85 ? "ok" : v >= 0.7 ? "grenzwertig" : "nein");
  const pz = (v) => Math.round(v * 100) + " Prozent";
  const z1 = (v) => hmLkZahl(v, 1);
  const klein = spec.art === "monogramm" || spec.art === "zeichen-nur";
  if (!klein) {
    const v = hmLkLesbar(spec, b, 120, 256, "breite");
    const ab = v >= 0.85 ? null : [160, 200, 240].find((px) => hmLkLesbar(spec, b, px, 256, "breite") >= 0.85);
    out.push({ name: "Lesbar klein, liegend", wert: `${pz(v)} Übereinstimmung bei 120 px Breite`, stufe: stufe(v),
      satz: v >= 0.85 ? "Bei 120 px Breite bleibt die Wortmarke scharf. Das ist die Mindestgröße für Website-Kopf und Signatur."
        : (v >= 0.7 ? "Bei 120 px Breite werden feine Striche weich. " : "Bei 120 px Breite verschwimmen Striche und Abstände. ") + (ab ? `Ab ${ab} px Breite sicher lesbar.` : "Auch bei 240 px nicht sicher, im Website-Kopf eine kräftigere Anordnung wählen.") });
  }
  const p = klein ? spec : hmLkKlemmen(hmLkProfilSpec(spec));
  const werte = [16, 24, 32].map((px) => [px, hmLkLesbar(p, b, px, 32)]);
  const v16 = werte[0][1]; const sicher = werte.find(([, v]) => v >= 0.85);
  out.push({ name: p.art === "zeichen-nur" ? "Lesbar klein, Zeichen" : "Lesbar klein, Monogramm", wert: werte.map(([px, v]) => `${px} px: ${pz(v)}`).join(", "), stufe: stufe(v16),
    satz: (v16 >= 0.85 ? "Auch bei 16 px als Favicon klar." : sicher ? `Bei 16 px verschwimmt die Form. Ab ${sicher[0]} px sicher lesbar.` : "Bis 32 px verschwimmt die Form. Für Favicon und Google-Profil eine kräftigere Fassung wählen.") + " Verglichen mit der Fassung in 256 px mit einem Punkt Toleranz, Grenzen 85 und 70 Prozent als Setzung des Teams." });
  const L = hmLkLayout(spec, b); const mitAkzent = L.teile.some((t) => t.fill === "AKZ");
  const tp = hmLkKontrast(HM_LK_TINTE, HM_LK_PAPIER), kn = hmLkKontrast(HM_LK_KREIDE, HM_LK_NACHT), ap = hmLkKontrast(b.akzent, HM_LK_PAPIER), an = hmLkKontrast(b.akzent, HM_LK_NACHT);
  const anL = hmLkLesbarAuf(b.akzent, HM_LK_NACHT, 3);
  let kSt = "ok", kSatz = "Tinte und Kreide erreichen auf ihrem Grund weit mehr als 3 zu 1, das Ziel für die Wortmarke.";
  if (mitAkzent) {
    if (ap < 3) { kSt = "nein"; kSatz = `Der Akzent erreicht auf Papier nur ${z1(ap)} zu 1. Als Grafik braucht er 3 zu 1: in der Fassung Positiv wird er dunkler gesetzt, besser im Branding einen tieferen Ton wählen.`; }
    else if (an < 3) { kSt = "grenzwertig"; kSatz = `Auf Nacht wird der Akzent zu ${String(anL).toUpperCase()} aufgehellt, damit er 3 zu 1 erreicht. Die Fassung Negativ macht das von selbst.`; }
    else kSatz = "Tinte und Akzent erreichen auf Papier und Nacht mindestens 3 zu 1, das Ziel für Wortmarke und Akzent als Grafik.";
  }
  out.push({ name: "Kontrast", wert: `Tinte auf Papier ${z1(tp)} zu 1, Kreide auf Nacht ${z1(kn)} zu 1` + (mitAkzent ? `, Akzent auf Papier ${z1(ap)} zu 1, auf Nacht ${z1(an)} zu 1` : ""), satz: kSatz, stufe: kSt });
  const ko = hmLkKohorte(spec, opt.mid || (b.makler && b.makler.id));
  if (!ko.naechster) out.push({ name: "Abstand zur Kohorte", wert: "keine Vergleichslogos", satz: "Noch hat kein anderer Makler ein Logo aus der Werkstatt übernommen.", stufe: "ok" });
  else {
    const n = ko.naechster; const st = n.hamming <= 60 || n.abstand <= 0.1 ? "nein" : n.hamming <= 140 || n.abstand <= 0.25 ? "grenzwertig" : "ok";
    out.push({ name: "Abstand zur Kohorte", wert: `Umriss ${Math.round((n.hamming / 1024) * 100)} Prozent verschieden, Aufbau ${Math.round(n.abstand * 100)} Prozent verschieden`, stufe: st,
      satz: st === "ok" ? "Kein Logo eines anderen Maklers kommt in Umriss und Aufbau nahe. Verglichen wird mit Ihrem Namen in beiden Entwürfen, als Umriss in 32 mal 32 Punkten."
        : opt.teamSicht ? `Am nächsten liegt das Logo von ${n.name}. ${st === "nein" ? "Zu nah: Anordnung oder Zeichen ändern." : "Nah, aber unterscheidbar. Im selben Bezirk lieber eine andere Anordnung."}` : HM_LK_SAETZE.kohorteMakler });
  }
  const nicht = [];
  if (spec.art === "punkt") nicht.push("Punkt nach dem Namen");
  if (spec.art === "gesperrt" && spec.akzent) nicht.push("kurze Linie unter dem Namen");
  if (spec.art === "teilung") nicht.push("Maßlinie unter dem Namen");
  if (hmLkHatZeichen(spec) && spec.lage === "unten" && ["zeitmass", "ratlinie", "folio"].includes(spec.zeichen)) nicht.push("Linie unter dem Namen");
  const ja = [];
  if (spec.art === "dickte") ja.push("feste Dickte");
  if (spec.zeichen && (spec.art === "zeichen" || spec.art === "dickte" || spec.art === "zeichen-nur")) ja.push("Zeichen aus der Idee, " + HM_LK_ZEICHEN_NAME[spec.zeichen]);
  const nichtSatz = nicht.length ? `${nicht.join(", ").replace(/^./, (c) => c.toUpperCase())}: ${HM_LK_SAETZE.zaehltNicht}, weil Branchenstandard. ` : "";
  out.push({ name: "Erkennung", wert: ja.length ? "Kandidat: " + ja.join(", ") : "kein Eingriff aus der Idee", stufe: ja.length ? (nicht.length ? "grenzwertig" : "ok") : "nein",
    satz: nichtSatz + (ja.length ? "Ob der Eingriff bei 40 px sichtbar, aus der Idee herleitbar und in der Kohorte fremd ist, prüft das Team am Render." : `Punkt nach dem Namen, Kreis um die Initialen, Nachname fett, Unterstreichung und Farbwechsel zwischen Vor- und Nachname zählen nicht als Erkennung. Es braucht einen Eingriff aus der Idee.`) });
  if (spec.art === "dickte" && typeof document !== "undefined") {
    /* Sichtbare Form je Letter relativ zur Zellmitte (Tinte ohne Vor- und Nachbreite); gemessen wird die engste Lücke zweier Nachbarn */
    hmLkMessCanvas("", spec.font, spec.gewicht, 100, 0); const ctx = HM_LK_MESS.ctx;
    const form = (ch) => { const m = ctx.measureText(ch); return { l: (-m.width / 2 - (m.actualBoundingBoxLeft || 0)) / 100, r: (-m.width / 2 + (m.actualBoundingBoxRight || m.width)) / 100 }; };
    let eng = null;
    hmLkName(b, spec).split(/\s+/).forEach((wort) => { const ch = [...wort]; for (let i = 0; i < ch.length - 1; i++) { const gap = spec.zelle + form(ch[i + 1]).l - form(ch[i]).r; if (!eng || gap < eng.gap) eng = { gap, paar: ch[i] + ch[i + 1] }; } });
    if (eng) {
      const st = eng.gap < 0 ? "nein" : eng.gap < 0.02 ? "grenzwertig" : "ok";
      out.push({ name: "Zellen der Dickte", wert: `engste Lücke ${eng.paar}: ${hmLkZahl(eng.gap, 2)} em`, stufe: st,
        satz: st === "ok" ? "Jede Letter hat Luft zum Nachbarn, schmale Letter stehen sichtbar frei." : st === "grenzwertig" ? `Bei ${eng.paar} berühren sich die Formen fast. Zelle etwas breiter stellen oder das Team zeichnet eine schmalere Fassung.` : `Bei ${eng.paar} überlappen die Formen, die breite Letter ist größer als ihre Zelle. Zelle breiter stellen oder das Team zeichnet eine schmalere Fassung.` });
    }
  }
  return out;
}

/* ---------- Logo-Paket ---------- */
function hmLkPaketListe(spec, b) {
  const ordner = hmDateiname((b.vor || "") + "-" + (b.nach || "")) + "-logo";
  const z = hmLkHatZeichen(hmLkKlemmen(spec)) ? "zeichen" : "monogramm";
  const L = [];
  const beide = (name, form, formate, px, extra) => [["hell", "positiv"], ["dunkel", "negativ"]].forEach(([t, f]) => formate.forEach((fmt) => L.push({ pfad: `${ordner}/${name}-${t}.${fmt}`, art: form, px: fmt === "png" ? px : null, fassung: f, format: fmt, ...(extra || {}) })));
  beide("hauptlogo", "haupt", ["svg", "png"], 2000);
  beide("gestapelt", "gestapelt", ["svg", "png"], 2000);
  beide(z, "zeichen", ["svg", "png"], 2000);
  beide("profil-monogramm-1080", "profil", ["png"], 1080, { quadrat: 0.18 });
  beide("favicon-32", "favicon", ["png"], 32, { quadrat: 0.12 });
  beide("favicon-180", "favicon", ["png"], 180, { quadrat: 0.12 });
  L.push({ pfad: `${ordner}/anwendung.html`, art: "anwendung", px: null, fassung: null, format: "html" });
  return L;
}
async function hmLkPaket(spec0, b, mid, akteur, stand) {
  const spec = hmLkKlemmen(spec0); const liste = hmLkPaketListe(spec, b); const formen = hmLkFormen(spec);
  const melde = (t) => { if (stand) stand(t); };
  let JSZip; try { JSZip = await hmJszip(); } catch (e) { toast("Das Werkzeug zum Packen ist gerade nicht erreichbar. Bitte später noch einmal."); return false; }
  /* Alle Pfad-SVGs vorab und streng: fehlt eine Schriftdatei, entsteht kein Paket */
  const svg = {};
  try { for (const form of ["haupt", "gestapelt", "zeichen", "profil", "favicon"]) for (const f of ["positiv", "negativ"]) { melde("Schrift in Pfade: " + form); svg[form + "|" + f] = await hmLkSvgPfade(formen[form], b, { fassung: f }); } }
  catch (e) { console.warn(e); toast(HM_LK_SAETZE.paketSchrift); return false; }
  const kap = {}; ["haupt", "gestapelt", "zeichen", "profil", "favicon"].forEach((form) => { kap[form] = hmLkLayout(formen[form], b).kap; });
  const eng = {}; for (const k of Object.keys(svg)) eng[k] = await hmLkEngBox(svg[k]);
  const fertig = (form, fassung, extra) => hmLkRahmen(svg[form + "|" + fassung], { box: eng[form + "|" + fassung], rand: extra && extra.quadrat ? 0 : kap[form], ...(extra || {}) });
  const zip = new JSZip();
  for (const d of liste) {
    if (d.format === "html") continue;
    melde(d.pfad.split("/").pop());
    const extra = d.quadrat ? { quadrat: d.quadrat, grund: hmLkFassung(b, d.fassung).GRUND } : {};
    if (d.format === "png") zip.file(d.pfad, await hmSvgZuPng(fertig(d.art, d.fassung, { ...extra, px: d.px }), d.px));
    else zip.file(d.pfad, fertig(d.art, d.fassung, extra));
  }
  const html = hmLkAnwendungHtml(spec, b, {
    haupt: fertig("haupt", "positiv"), hauptDunkel: fertig("haupt", "negativ", { grund: HM_LK_NACHT }), gestapelt: fertig("gestapelt", "positiv"),
    profil: fertig("profil", "positiv", { quadrat: 0.18, grund: HM_LK_PAPIER }), eng: hmLkRahmen(svg["haupt|positiv"], { box: eng["haupt|positiv"] }), kap: kap.haupt,
  });
  zip.file(liste.find((x) => x.format === "html").pfad, html);
  melde("Wird gepackt");
  hmLaden(await zip.generateAsync({ type: "blob" }), hmDateiname(b.vor + "-" + b.nach) + "-logo.zip");
  hmEvent(mid, "branding", "Logo-Paket geladen", akteur || "Team");
  return true;
}
/* Schutzraum als bemaßte Zeichnung: X ist eine Versalhöhe */
function hmLkSchutzraumSvg(eng, kap) {
  const [x, y, w, h] = hmLkBox(eng); const k = kap || h * 0.3; const m = k * 2.2; const hl = Math.max(w, h) / 500; const f = (v) => v.toFixed(2); const fs = k * 0.55; const t = k * 0.25;
  const my = y + h / 2, mx = x + w / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f(x - m)} ${f(y - m)} ${f(w + 2 * m)} ${f(h + 2 * m)}" role="img" aria-label="Schutzraum: eine Versalhöhe rundum">`
    + `<rect x="${f(x - k)}" y="${f(y - k)}" width="${f(w + 2 * k)}" height="${f(h + 2 * k)}" fill="none" stroke="#8C857B" stroke-width="${f(hl)}"/>`
    + `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="none" stroke="#C9C2B6" stroke-width="${f(hl)}"/>`
    + hmLkInnen(eng)
    + `<path d="M${f(x - k)} ${f(my)}H${f(x)}M${f(x - k)} ${f(my - t)}V${f(my + t)}M${f(x)} ${f(my - t)}V${f(my + t)}M${f(mx)} ${f(y - k)}V${f(y)}M${f(mx - t)} ${f(y - k)}H${f(mx + t)}M${f(mx - t)} ${f(y)}H${f(mx + t)}" fill="none" stroke="#0B0A09" stroke-width="${f(hl * 1.5)}"/>`
    + `<text x="${f(x - k / 2)}" y="${f(my - t - fs * 0.3)}" font-size="${f(fs)}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" fill="#0B0A09">X</text>`
    + `<text x="${f(mx + t + fs * 0.4)}" y="${f(y - k / 2 + fs * 0.35)}" font-size="${f(fs)}" font-family="Helvetica, Arial, sans-serif" fill="#0B0A09">X</text></svg>`;
}
/* Anwendungsseite: eine druckbare Seite ohne externe Anfragen */
function hmLkAnwendungHtml(spec0, b, s) {
  const spec = hmLkKlemmen(spec0); const t = s || {};
  const esc = (x) => String(x == null ? "" : x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const name = (b.makler && b.makler.name) || `${b.vor} ${b.nach}`;
  const datum = new Date().toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit", year: "numeric" });
  const z = hmLkHatZeichen(spec) ? "zeichen" : "monogramm";
  const rgb = (hex) => hmLkRgb(hex).join(", ");
  const akzN = hmLkLesbarAuf(b.akzent, HM_LK_NACHT, 3), akzP = hmLkLesbarAuf(b.akzent, HM_LK_PAPIER, 3);
  const farben = [["Tinte", HM_LK_TINTE, "Logo auf hellem Grund"], ["Papier", HM_LK_PAPIER, "heller Grund"], ["Nacht", HM_LK_NACHT, "dunkler Grund"], ["Kreide", HM_LK_KREIDE, "Logo auf dunklem Grund"], ["Akzent", b.akzent, "Grundwert aus dem Branding"]];
  if (String(akzP).toLowerCase() !== String(b.akzent).toLowerCase()) farben.push(["Akzent auf Papier", akzP, "für 3 zu 1 auf Papier abgedunkelt"]);
  if (String(akzN).toLowerCase() !== String(b.akzent).toLowerCase()) farben.push(["Akzent auf Nacht", akzN, "für 3 zu 1 auf Nacht aufgehellt"]);
  const schnitt = { 400: "Regular", 500: "Medium", 600: "Semibold", 700: "Bold" };
  const schriften = []; [spec, hmLkGestapeltSpec(spec), hmLkKlemmen(hmLkProfilSpec(spec))].forEach((x) => hmLkLayout(x, b, () => 10).teile.filter((q) => q.typ === "text").forEach((q) => { const k = q.font + "|" + q.gewicht; if (!schriften.some((y) => y.k === k)) schriften.push({ k, font: q.font, gewicht: q.gewicht }); }));
  const dateien = [
    ["hauptlogo-hell / -dunkel (.svg, .png)", "Website-Kopf, E-Mail-Signatur, Exposé, Visitenkarte, Schild"],
    ["gestapelt-hell / -dunkel (.svg, .png)", "Rückseite der Visitenkarte, Reel-Endkarte, hohe Formate"],
    [`${z}-hell / -dunkel (.svg, .png)`, z === "zeichen" ? "das Zeichen allein, für sehr kleine Flächen und als Stempel" : "das Monogramm allein, für sehr kleine Flächen und als Stempel"],
    ["profil-monogramm-1080-hell / -dunkel (.png)", "Google-Profil und Flächen ohne Gesicht, 1080 mal 1080 px"],
    ["favicon-32-hell / -dunkel (.png)", "Favicon der Website, verstärkt für kleine Größen"],
    ["favicon-180-hell / -dunkel (.png)", "Symbol auf dem Home-Bildschirm von Smartphones"],
  ];
  const zeile = (c) => `<tr>${c.map((x) => `<td>${x}</td>`).join("")}</tr>`;
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Logo-Anwendung ${esc(name)}</title><style>
@page { size: A4; margin: 16mm; }
* { box-sizing: border-box; }
body { margin: 0; background: #FFFFFF; color: #0B0A09; font: 14px/1.55 -apple-system, "Helvetica Neue", Arial, sans-serif; }
main { max-width: 820px; margin: 0 auto; padding: 40px 24px 60px; }
h1 { font: 400 34px/1.1 Georgia, "Times New Roman", serif; margin: 0 0 6px; }
h2 { font: 400 21px/1.2 Georgia, "Times New Roman", serif; margin: 0 0 12px; }
section { padding: 26px 0; border-top: 1px solid #D8D2C8; break-inside: avoid; }
p { margin: 0 0 10px; max-width: 64ch; } .u { color: #4A4640; }
table { border-collapse: collapse; width: 100%; } td, th { text-align: left; padding: 7px 10px 7px 0; border-bottom: 1px solid #E6E1D8; vertical-align: top; } th { font-weight: 500; color: #4A4640; }
.flaechen { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.flaeche { padding: 40px 28px; display: flex; align-items: center; justify-content: center; border: 1px solid #D8D2C8; }
.flaeche svg { width: 100%; max-height: 90px; } .hell { background: ${HM_LK_PAPIER}; } .dunkel { background: ${HM_LK_NACHT}; }
.zeichnung { background: #FFFFFF; border: 1px solid #D8D2C8; padding: 16px; } .zeichnung svg { width: 100%; max-height: 260px; }
.profil svg { width: 120px; height: 120px; border-radius: 50%; }
.feld { display: inline-block; width: 14px; height: 14px; border: 1px solid #D8D2C8; vertical-align: -2px; margin-right: 8px; }
ol { margin: 0; padding-left: 20px; } li { margin-bottom: 6px; }
footer { padding-top: 18px; border-top: 1px solid #D8D2C8; color: #4A4640; font-size: 12px; }
</style></head><body><main>
<header><h1>Logo-Anwendung</h1><p class="u">${esc(name)}. Stand ${datum}, Version ${esc(spec.id || "")}.</p></header>
<section class="flaechen"><div class="flaeche hell">${t.haupt || ""}</div><div class="flaeche dunkel">${t.hauptDunkel || ""}</div></section>
<section><h2>Welche Datei wofür</h2><table><tbody>${dateien.map(zeile).join("")}</tbody></table>
<p style="margin-top:12px">"hell" steht für helle Gründe, "dunkel" für dunkle Gründe. SVG für Druck und Web in jeder Größe, PNG für Programme ohne SVG. Die Logodateien sind in Pfade umgewandelt und brauchen keine installierte Schrift.</p></section>
<section><h2>Schutzraum</h2><div class="zeichnung">${t.eng ? hmLkSchutzraumSvg(t.eng, t.kap) : ""}</div><p style="margin-top:12px">Rundum bleibt mindestens eine Versalhöhe der Schrift im Logo frei (X). In diesem Raum steht kein Text, keine Linie und keine Bildkante.</p></section>
<section><h2>Mindestgrößen</h2><table><thead><tr><th>Form</th><th>digital</th><th>Druck</th></tr></thead><tbody>${[["liegend", "120 px Breite", "25 mm"], ["gestapelt", "64 px Breite", "14 mm"], ["Monogramm", "16 px", "5 mm"]].map(zeile).join("")}</tbody></table></section>
<section><h2>Profilbild</h2><p>${esc(HM_LK_SAETZE.profilRegel)}</p><div class="profil">${t.profil || ""}</div></section>
<section><h2>Farben</h2><table><thead><tr><th>Rolle</th><th>HEX</th><th>RGB</th><th>CMYK</th></tr></thead><tbody>${farben.map(([n, hex, wofuer]) => zeile([`<span class="feld" style="background:${hex}"></span>${esc(n)}<br><span class="u">${esc(wofuer)}</span>`, String(hex).toUpperCase(), rgb(hex), HM_LK_SAETZE.cmyk])).join("")}</tbody></table></section>
<section><h2>Schriften</h2><table><thead><tr><th>Schrift</th><th>Schnitt</th><th>Lizenz</th></tr></thead><tbody>${schriften.map((x) => zeile([esc(x.font), `${x.gewicht} ${schnitt[x.gewicht] || ""}`.trim(), "SIL Open Font License 1.1"])).join("")}</tbody></table></section>
<section><h2>Nie</h2><ol><li>Nicht verzerren: das Logo nur im Ganzen und im eigenen Seitenverhältnis vergrößern oder verkleinern.</li><li>Keine Effekte: kein Schatten, kein Verlauf, keine Kontur, kein Glanz.</li><li>Keine anderen Farben: nur die Fassungen aus diesem Paket.</li></ol></section>
<footer>Stand ${datum}. Version ${esc(spec.id || "")}. Erstellt in der UNIO Werkbank.</footer>
</main></body></html>`;
}

/* ---------- Kleine Bausteine der Oberfläche ---------- */
function LkStufe({ stufe }) {
  const p = stufe === "ok" ? "M3.5 8.5l3 3 6-7" : stufe === "grenzwertig" ? "M3.5 8h9" : "M4 4l8 8M12 4l-8 8";
  const t = stufe === "ok" ? "In Ordnung" : stufe === "grenzwertig" ? "Grenzwertig" : "Nicht erfüllt";
  return <span className="st"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={p} /></svg>{t}</span>;
}
function LkSchieber({ label, min, max, step, wert, text, onChange }) {
  const id = "lk2-" + (React.useId ? React.useId() : label).replace(/[^A-Za-z0-9-]/g, "");
  const amRand = wert <= min + 1e-6 || wert >= max - 1e-6;
  return <div className="hm-lk2-zeile">
    <label htmlFor={id}>{label}</label>
    <input id={id} type="range" min={min} max={max} step={step} value={wert} aria-valuetext={text} onChange={(e) => onChange(parseFloat(e.target.value))} />
    <output htmlFor={id}>{text}</output>
    <span className="hm-lk2-grenze" aria-live="polite">{amRand ? HM_LK_SAETZE.grenze : ""}</span>
  </div>;
}
function LkSeg({ werte, akt, set, gesperrt, label }) {
  return <div className="hm-seg klein" role="group" aria-label={label}>{werte.map(([v, t]) => <button key={String(v)} type="button" className={akt === v ? "on" : ""} aria-pressed={akt === v} disabled={gesperrt} onClick={() => set(v)}>{t}</button>)}</div>;
}
function LkBuehne({ spec, b }) {
  return <figure className="hm-lk2-buehne-f">
    <div className="hm-lk2-buehne"><LogoKonzept spec={spec} b={b} h={hmLkHoehe(spec, b, 520, spec.art === "monogramm" ? 124 : 88)} /></div>
    <figcaption className="hm-lk2-unter">{hmLkBeschreibung(spec)}, {hmLkHerkunftText(spec, b)}, {spec.font} {spec.gewicht}</figcaption>
  </figure>;
}
function LkMini({ spec, b, text, onClick }) {
  return <button type="button" className="hm-lk2-mini" onClick={onClick} aria-label={`Übernehmen: ${hmLkBeschreibung(spec)}, ${text}`}>
    <span className="karte"><LogoKonzept spec={spec} b={b} h={hmLkHoehe(spec, b, 118, spec.art === "monogramm" ? 34 : 22)} /><span className="c">{b.claim}</span></span>
    <span className="t">{text}</span>
  </button>;
}
function hmLkAchsenText(s, achse) {
  if (achse === "schrift") return `${s.font} ${s.gewicht}`;
  if (achse === "anordnung") return hmLkArtName(s.art) + (s.lage ? ", " + { links: "links", oben: "oben", unten: "unten", rechts: "rechts", nebeneinander: "nebeneinander", gestapelt: "gestapelt", spalte: "Spalte" }[s.lage] : "");
  if (achse === "zeichen") return s.zeichen ? HM_LK_ZEICHEN_NAME[s.zeichen] : "ohne Zeichen";
  if (achse === "laufweite") return s.art === "dickte" || s.art === "teilung" ? `Zelle ${hmLkZahl(s.zelle, 2)} em` : `${hmLkZahl(s.laufweite, 3)} em`;
  return s.akzent ? "Akzent an" : "Akzent aus";
}
function hmLkKontakt(mid) {
  const kd = ((((hmStore.get("einrichtung_daten") || {})[mid]) || {}).visitenkarten) || {};
  const web = ((((hmStore.get("website") || {})[mid]) || {}).felder) || {};
  return { tel: kd.tel || web.tel || "", mail: kd.mail || web.mail || "" };
}
function hmLkClaim(b) { return (b.br && b.br.claim) || (b.w && b.w.leitidee) || ""; }

/* ---------- Stichworte als Steuerung ---------- */
function LogoStichworte({ mid, teamSicht }) {
  useHm("logos");
  const liste = hmLkStichworte(mid);
  const [wort, setWort] = React.useState(""); const [meldung, setMeldung] = React.useState(null);
  const setStw = (fn) => hmStore.patch("logos", (a) => { const x = { ...(a || {}) }; const m = { ...(x[mid] || {}) }; m.stichworte = fn({ aus: [], eigen: [], ...(m.stichworte || {}) }); x[mid] = m; return x; });
  const schalten = (id) => setStw((s) => ({ ...s, aus: s.aus.includes(id) ? s.aus.filter((x) => x !== id) : [...s.aus, id] }));
  const ergaenzen = () => {
    const w = wort.trim(); if (!w) return;
    const treffer = hmLkWoerter(w).map((x) => [x, hmLkWortTreffer(x)]).find(([, e]) => e);
    if (!treffer) { setMeldung(HM_LK_SAETZE.keinZeichen); return; }
    const [gefunden, e] = treffer; const id = hmDateiname(e.wort); const schon = liste.find((x) => x.id === id);
    setStw((s) => ({ ...s, eigen: schon ? s.eigen : [...new Set([...(s.eigen || []), gefunden])], aus: s.aus.filter((x) => x !== id) }));
    setMeldung(schon ? `${schon.wort} ist schon da und jetzt eingeschaltet.` : `${gefunden} ergibt ${e.zeichen.map((z) => HM_LK_ZEICHEN_NAME[z] || hmLkArtName(z)).join(" und ")}.`);
    setWort("");
  };
  return <div className="hm-lk2-stw">
    <div className="hm-lk2-stw-kopf"><h3 className="hm-lk2-h3">Stichworte der Marke</h3><span className="hm-lk2-leise">{teamSicht ? "Aus jedem eingeschalteten Wort entstehen Zeichen. Ausschalten nimmt sie aus der Runde." : "Aus diesen Wörtern Ihrer Marke entstehen die Zeichen."}</span></div>
    {!liste.length ? <p className="hm-lk2-leise">Noch kein Wort der Marke passt zu einem Zeichen. Die Entwürfe nutzen das Zeichen der Markenwelt.</p>
      : <div className="hm-chips">{liste.map((s) => teamSicht
        ? <button key={s.id} type="button" className={"hm-chip" + (s.an ? " on" : "")} aria-pressed={s.an} onClick={() => schalten(s.id)}>{s.wort}, {hmLkQuelleText(s)}</button>
        : <span key={s.id} className="hm-lk2-stw-fest">{s.wort}, {hmLkQuelleText(s)}</span>)}</div>}
    {teamSicht && <form className="hm-lk2-stw-neu" onSubmit={(e) => { e.preventDefault(); ergaenzen(); }}>
      <label className="hm-lk2-vh" htmlFor={"lk2-stw-" + mid}>Stichwort ergänzen</label>
      <input id={"lk2-stw-" + mid} value={wort} placeholder="Stichwort ergänzen" onChange={(e) => { setWort(e.target.value); setMeldung(null); }} />
      <button type="submit" className="hm-link">Ergänzen</button>
    </form>}
    {meldung && <p className="hm-lk2-leise" role="status">{meldung}</p>}
  </div>;
}

/* ---------- Feineditor mit Sperrgrenzen ---------- */
function LogoFeineditor({ spec: spec0, b, onChange, ausgang }) {
  hmLkStil();
  const spec = hmLkKlemmen(spec0);
  const start = React.useRef(null); if (!start.current) start.current = spec0;
  const basis = ausgang || start.current;
  const g = HM_LK_GRENZEN[spec.art] || HM_LK_GRENZEN.satz;
  const neu = (patch) => { const s = hmLkKlemmen({ ...spec, ...patch }); s.herkunft = spec.herkunft || null; s.id = hmLkNeueId(s); if (s.id !== spec.id && onChange) onChange(s); };
  const sch = HM_LK_SCHRIFTEN.find((x) => x.f === spec.font);
  const hatZ = (spec.art === "zeichen" || spec.art === "dickte") && !!spec.zeichen;
  const versalFest = spec.art === "gesperrt" || spec.art === "teilung";
  const ohneLauf = spec.art === "monogramm" || spec.art === "zeichen-nur";
  const laufFest = g.laufweite[0] === g.laufweite[1];
  const lagen = spec.art === "monogramm" ? [["nebeneinander", "Nebeneinander"], ["gestapelt", "Gestapelt"], ["spalte", "Spalte"]]
    : hatZ ? [["links", "Links"], ["oben", "Oben"], ["unten", "Unten"], ["rechts", "Rechts"]]
    : spec.art === "dickte" ? [["", "Liegend"], ["gestapelt", "Gestapelt"]] : null;
  return <div className="hm-lk2-editor">
    {!ohneLauf && (laufFest
      ? <div className="hm-lk2-zeile"><span>Laufweite</span><span className="satz">{HM_LK_SAETZE.zelleFest}</span></div>
      : <LkSchieber label="Laufweite" min={g.laufweite[0]} max={g.laufweite[1]} step={0.005} wert={spec.laufweite} text={`${hmLkZahl(spec.laufweite, 3)} em`} onChange={(v) => neu({ laufweite: v })} />)}
    {sch && sch.w.length > 1 && <div className="hm-lk2-zeile"><span>Gewicht</span><LkSeg label="Gewicht" werte={sch.w.map((w) => [w, String(w)])} akt={spec.gewicht} set={(w) => neu({ gewicht: w })} /></div>}
    {!ohneLauf && <div className="hm-lk2-zeile"><span>Groß oder klein</span><LkSeg label="Groß oder klein" werte={[[false, "Normal"], [true, "Versalien"]]} akt={spec.versal} gesperrt={versalFest} set={(v) => neu({ versal: v })} />{versalFest && <span className="satz">{HM_LK_SAETZE.versalFest}</span>}</div>}
    {hatZ && (spec.zeichen === "ratstrich"
      ? <div className="hm-lk2-zeile"><span>Zeichen zu Name</span><span className="satz">{HM_LK_SAETZE.ratstrichHoehe}</span></div>
      : <LkSchieber label="Zeichen zu Name" min={g.verhaeltnis[0]} max={g.verhaeltnis[1]} step={0.05} wert={spec.verhaeltnis} text={`${hmLkZahl(spec.verhaeltnis, 2)} zu 1`} onChange={(v) => neu({ verhaeltnis: v })} />)}
    {lagen && <div className="hm-lk2-zeile"><span>Lage</span><LkSeg label="Lage" werte={lagen} akt={spec.lage || ""} gesperrt={spec.zeichen === "ratstrich"} set={(v) => neu({ lage: v || null })} />{spec.zeichen === "ratstrich" && <span className="satz">{HM_LK_SAETZE.ratstrichLage}</span>}</div>}
    {spec.art === "dickte" && <LkSchieber label="Zellbreite" min={g.zelle[0]} max={g.zelle[1]} step={0.01} wert={spec.zelle} text={`${hmLkZahl(spec.zelle, 2)} em`} onChange={(v) => neu({ zelle: v })} />}
    <div className="hm-lk2-aktionen" style={{ paddingTop: 14 }}>
      <button type="button" className="hm-link" disabled={!basis || basis.id === spec.id} onClick={() => basis && onChange && onChange(basis)}>Zurücksetzen</button>
      <span className="hm-lk2-leise">Jede Änderung ergibt einen neuen Entwurf. Die Grenzen halten Lesbarkeit und Charakter der Anordnung.</span>
    </div>
  </div>;
}

/* ---------- Prüfstand "Faustregeln" ---------- */
function LogoPruefstand({ spec, b, mid, teamSicht }) {
  hmLkStil(); useHm("branding");
  const da = useLkSchriften(); const v = useLkStamm([spec]);
  const zeilen = React.useMemo(() => { if (!da) return null; try { return hmLkPruefen(spec, b, { mid, teamSicht }); } catch (e) { console.warn(e); return []; } }, [spec && spec.id, da, v, teamSicht, b.akzent, mid]);
  return <section className="hm-lk2-regeln" aria-label="Faustregeln">
    <h3 className="hm-lk2-h3">Faustregeln</h3>
    <p className="hm-lk2-leise">Im Browser gemessen, ohne Punktwert: jede Zeile steht für sich. Die Grenzwerte sind Setzungen des Teams, keine Normen.</p>
    {!zeilen ? <p className="hm-lk2-leise">Die Schriften laden noch.</p> : zeilen.map((z) => <div key={z.name} className="hm-lk2-regel">
      <div className="n">{z.name}</div><div className="w">{z.wert}</div><LkStufe stufe={z.stufe} /><p className="s">{z.satz}</p>
    </div>)}
  </section>;
}

/* ---------- Farbfassungen, Favicon, eigene Größe, Paket ---------- */
function hmLkIconMalen(c, spec, b, px, fassung) {
  if (!c) return; const F = hmLkFassung(b, fassung || "positiv"); const g = c.getContext("2d");
  g.clearRect(0, 0, px, px); g.fillStyle = F.GRUND; g.fillRect(0, 0, px, px);
  const L = hmLkLayout(spec, b); const k = (px * 0.76) / Math.max(L.W, L.H);
  g.save(); g.translate((px - L.W * k) / 2, (px - L.H * k) / 2); hmLkZeichnen(g, L, k, F); g.restore();
}
function LkPixel({ spec, b, px }) {
  const a = React.useRef(null), z = React.useRef(null);
  React.useEffect(() => { hmLkIconMalen(a.current, spec, b, px); hmLkIconMalen(z.current, spec, b, px); });
  return <span className="px"><canvas ref={a} width={px} height={px} style={{ width: px, height: px }} aria-hidden="true" /><canvas ref={z} className="gross" width={px} height={px} style={{ width: px * 4, height: px * 4 }} role="img" aria-label={`${px} px, vierfach vergrößert`} /></span>;
}
function LogoFassungen({ spec, b }) {
  hmLkStil(); const da = useLkSchriften(); useLkStamm([spec]);
  const [format, setFormat] = React.useState("svg");
  const [offen, setOffen] = React.useState(false);
  const [lauf, setLauf] = React.useState(null);
  const [eig, setEig] = React.useState({ form: "haupt", fassung: "positiv", breite: 1200, hoehe: "", rand: 1, grund: "transparent", trim: true, format: "png" });
  const formen = hmLkFormen(spec); const slug = hmDateiname(b.vor + "-" + b.nach);
  const zeilen = [["haupt", "Wortmarke"], ["gestapelt", "Gestapelt"], ["zeichen", formen.hatZeichen ? "Zeichen" : "Monogramm"], ["favicon", "Favicon"]];
  const dateiname = { haupt: "hauptlogo", gestapelt: "gestapelt", zeichen: formen.hatZeichen ? "zeichen" : "monogramm", favicon: "favicon" };
  const fehler = (e) => { console.warn(e); toast(e && e.schrift ? HM_LK_SAETZE.dateiSchrift : "Die Datei konnte nicht erstellt werden."); };
  const laden = async (form, f) => {
    try { const fav = form === "favicon"; const blob = await hmLkDatei(formen[form], b, { fassung: f.id, format, rand: 1, trim: true, grund: fav ? f.grund : "transparent", quadrat: fav ? 0.12 : 0, breite: fav ? 512 : 2000 }); hmLaden(blob, `${slug}-${dateiname[form]}-${hmDateiname(f.id)}.${format}`); }
    catch (e) { fehler(e); }
  };
  const eigenLaden = async () => {
    try { const blob = await hmLkDatei(formen[eig.form], b, { fassung: eig.fassung, format: eig.format, rand: Number(eig.rand) || 0, trim: eig.trim, grund: eig.grund, breite: Number(eig.breite) || 1200, hoehe: Number(eig.hoehe) || 0 }); hmLaden(blob, `${slug}-${dateiname[eig.form]}-${hmDateiname(eig.fassung)}-${Number(eig.breite) || 1200}.${eig.format}`); setOffen(false); }
    catch (e) { fehler(e); }
  };
  const paket = async () => { setLauf("Paket entsteht"); try { await hmLkPaket(spec, b, b.makler && b.makler.id, null, setLauf); } catch (e) { console.warn(e); toast("Das Paket konnte nicht erstellt werden."); } setLauf(null); };
  const profil = formen.profil;
  const setE = (patch) => setEig((x) => ({ ...x, ...patch }));
  return <div className="hm-lk2" style={{ opacity: da ? 1 : 0.5 }}>
    <div className="hm-lk2-paket">
      <Btn onClick={paket} disabled={!!lauf} knob="runter">{lauf ? "Paket entsteht" : "Logo-Paket laden"}</Btn>
      <p className="hm-lk2-leise" role="status">{lauf && lauf !== "Paket entsteht" ? lauf : `Hauptlogo, gestapelt, ${formen.hatZeichen ? "Zeichen" : "Monogramm"}, Profilbild für Google und Favicon, hell und dunkel, als SVG und PNG. Dazu eine Anwendungsseite zum Ausdrucken.`}</p>
    </div>
    <div className="hm-lk2-kopfzeile">
      <h3 className="hm-lk2-h3">Fassungen</h3>
      <div className="rechts"><LkSeg label="Format" werte={[["svg", "SVG"], ["png", "PNG"]]} akt={format} set={setFormat} /><button type="button" className="hm-link" onClick={() => setOffen(true)}>Eigene Größe</button></div>
    </div>
    <p className="hm-lk2-leise">Jede Zelle lädt ihre Datei, mit einer Versalhöhe Rand. Keine freie Farbwahl: die Farben kommen aus dem Branding, der Akzent wird je Grund auf 3 zu 1 gesetzt.</p>
    <div className="hm-lk2-matrix-w"><table className="hm-lk2-matrix">
      <thead><tr><th scope="col"><span className="hm-lk2-vh">Form</span></th>{HM_LK_FASSUNGEN.map((f) => <th key={f.id} scope="col" title={f.satz}>{f.name}</th>)}</tr></thead>
      <tbody>{zeilen.map(([id, name]) => <tr key={id}><th scope="row">{name}</th>{HM_LK_FASSUNGEN.map((f) => <td key={f.id}>
        <button type="button" className="hm-lk2-zelle" style={{ background: f.grund }} onClick={() => laden(id, f)} aria-label={`${name}, ${f.name}, als ${format.toUpperCase()} laden`} title={f.satz}>
          <LogoKonzept spec={formen[id]} b={b} fassung={f.id} h={hmLkHoehe(formen[id], b, 96, id === "haupt" ? 22 : 44)} />
        </button></td>)}</tr>)}</tbody>
    </table></div>
    <section className="hm-lk2-stw">
      <h3 className="hm-lk2-h3">Favicon, vorher und nachher</h3>
      <p className="hm-lk2-leise">Unter 48 px werden die Striche 20 Prozent kräftiger, die Laufweite öffnet sich um 0,02 em, und eine Akzentlinie unter 3 px wird zur Fläche. Links die echte Größe, rechts vierfach vergrößert, jeder Punkt ein Pixel.</p>
      <div className="hm-lk2-fav">{[32, 16].map((px) => [["Vorher", profil], ["Nachher", hmLkFavicon(profil, px, b)]].map(([t, s]) => <figure key={px + t}><LkPixel spec={s} b={b} px={px} /><figcaption>{t}, {px} px</figcaption></figure>))}</div>
    </section>
    <Sheet offen={offen} zu={() => setOffen(false)} titel="Eigene Größe" unter="Eine Datei in genau der Größe, die ein Programm oder eine Druckerei verlangt." fuss={<Btn onClick={eigenLaden} knob="runter">Laden</Btn>}>
      <div className="hm-lk2-form">
        <div className="f"><span>Form</span><LkSeg label="Form" werte={zeilen.map(([id, n]) => [id, n])} akt={eig.form} set={(v) => setE({ form: v })} /></div>
        <label className="f">Fassung<select value={eig.fassung} onChange={(e) => setE({ fassung: e.target.value })}>{HM_LK_FASSUNGEN.map((f) => <option key={f.id} value={f.id}>{f.name}, {f.satz}</option>)}</select></label>
        <div className="zwei">
          <label className="f">Breite in px<input type="number" min="16" max="8000" value={eig.breite} onChange={(e) => setE({ breite: e.target.value })} /></label>
          <label className="f">Höhe in px, leer für automatisch<input type="number" min="0" max="8000" value={eig.hoehe} disabled={eig.trim} onChange={(e) => setE({ hoehe: e.target.value })} /></label>
          <label className="f">Rand in Versalhöhen<input type="number" min="0" max="6" step="0.25" value={eig.rand} onChange={(e) => setE({ rand: e.target.value })} /></label>
        </div>
        <div className="f"><span>Grund</span><LkSeg label="Grund" werte={[["papier", "Papier"], ["nacht", "Nacht"], ["transparent", "Transparent"]]} akt={eig.grund} set={(v) => setE({ grund: v })} /></div>
        <label className="haken"><input type="checkbox" checked={eig.trim} onChange={(e) => setE({ trim: e.target.checked })} />Ränder beschneiden</label>
        {eig.trim && <p className="hm-lk2-leise">Mit beschnittenen Rändern folgt die Höhe aus der Breite, der Rand liegt genau um das Logo.</p>}
        <div className="f"><span>Format</span><LkSeg label="Format" werte={[["png", "PNG"], ["svg", "SVG"]]} akt={eig.format} set={(v) => setE({ format: v })} /></div>
      </div>
    </Sheet>
  </div>;
}

/* ---------- Anwendungen, flach und ohne Mockup-Vorlagen ---------- */
function LogoAnwendungen({ spec, b, m }) {
  hmLkStil(); useLkSchriften(); useLkStamm([spec]); useHm("einrichtung_daten"); useHm("website");
  const mid = (m && m.id) || (b.makler && b.makler.id);
  const k = hmLkKontakt(mid); const formen = hmLkFormen(spec);
  const name = (b.makler && b.makler.name) || `${b.vor} ${b.nach}`; const claim = hmLkClaim(b);
  const ctaText = hmLkKontrast("#FFFFFF", b.akzent) >= 4.5 ? "#FFFFFF" : HM_LK_TINTE;
  const Luecke = ({ t }) => <p className="hm-lk2-luecke">{t}</p>;
  const sigH = (() => { const L = hmLkLayout(formen.haupt, b); return Math.max(20, Math.ceil((150 * L.H) / Math.max(1, L.W))); })();
  const kontakt = k.tel || k.mail ? <div className="k">{k.tel && <div>{k.tel}</div>}{k.mail && <div>{k.mail}</div>}</div> : <Luecke t={HM_LK_SAETZE.kontakt} />;
  return <div className="hm-lk2-anw">
    <figure className="breit">
      <div className="hm-lk2-vk-paar">
        <div className="hm-lk2-vk"><LogoKonzept spec={formen.haupt} b={b} h={hmLkHoehe(formen.haupt, b, 210, 30)} />{claim ? <div className="c">{claim}</div> : <Luecke t={HM_LK_SAETZE.claim} />}</div>
        <div className="hm-lk2-vk"><LogoKonzept spec={formen.gestapelt} b={b} h={hmLkHoehe(formen.gestapelt, b, 150, 46)} /><div><div className="c" style={{ fontWeight: 500 }}>{name}</div>{kontakt}</div></div>
      </div>
      <figcaption>Visitenkarte, 85 x 55 mm, Vorder- und Rückseite</figcaption>
    </figure>
    <figure className="breit">
      <div className="hm-lk2-web"><span className="l"><LogoKonzept spec={formen.haupt} b={b} h={hmLkHoehe(formen.haupt, b, 200, 26)} /></span><span>Objekte</span><span>Verkaufen</span><span>Über mich</span><span className="cta" style={{ background: b.akzent, color: ctaText }}>Erstgespräch</span></div>
      <figcaption>Website-Kopf</figcaption>
    </figure>
    <figure className="breit">
      <div className="hm-lk2-schild">
        <div style={{ background: HM_LK_PAPIER }}><LogoKonzept spec={formen.haupt} b={b} fassung="positiv" h={hmLkHoehe(formen.haupt, b, 260, 60)} /></div>
        <div style={{ background: HM_LK_NACHT }}><LogoKonzept spec={formen.haupt} b={b} fassung="negativ" h={hmLkHoehe(formen.haupt, b, 260, 60)} /></div>
      </div>
      <figcaption>Schild als Montage im Verhältnis 3 zu 1, auf Papier und auf Nacht</figcaption>
      <Luecke t={`${HM_LK_SAETZE.schild} Die Montage zeigt nur das Verhältnis, das echte Maß kommt vom Haus oder der Verwaltung.`} />
    </figure>
    <figure>
      <div className="hm-lk2-sig"><LogoKonzept spec={formen.haupt} b={b} h={sigH} /><div><div style={{ fontWeight: 500 }}>{name}</div>{claim ? <div className="c">{claim}</div> : <Luecke t={HM_LK_SAETZE.claim} />}</div>{kontakt}</div>
      <figcaption>E-Mail-Signatur, liegend mindestens 120 px breit</figcaption>
    </figure>
    <figure>
      <div className="hm-lk2-ig">
        <div className="hm-lk2-ig-kopf">
          <div className="hm-lk2-ig-bild">{b.portrait ? <img src={b.portrait} alt={`Porträt von ${name}`} /> : <span>{HM_LK_SAETZE.portrait}</span>}</div>
          <div style={{ minWidth: 0 }}><div style={{ fontWeight: 500, fontSize: 14 }}>{name}</div><div style={{ fontSize: 12, color: "#4A4640" }}>Anzeigename</div></div>
        </div>
        <div className="hm-lk2-reel"><LogoKonzept spec={formen.gestapelt} b={b} fassung="negativ" h={hmLkHoehe(formen.gestapelt, b, 110, 50)} />{claim && <div className="c">{claim}</div>}</div>
      </div>
      <figcaption>Instagram: Profilbild ist das Porträt, rechts die Reel-Endkarte 9:16 mit gestapelter Wortmarke</figcaption>
    </figure>
  </div>;
}

/* Kleine Einsatzleiste, unverändert bis auf die erste Abbildung */
function LogoImEinsatz({ spec, b }) {
  const papier = "#F5F1EA", nacht = "#141210";
  return <div className="hm-lk-einsatz">
    <figure><div className="hm-lk-profil" style={{ background: papier }}><LogoKonzept spec={hmLkProfilSpec(spec)} b={b} h={spec.art === "zeichen" ? 50 : 46} /></div><figcaption>Favicon und Google-Profil</figcaption></figure>
    <figure><div className="hm-lk-karte" style={{ background: papier }}><LogoKonzept spec={spec} b={b} h={spec.art === "monogramm" ? 34 : 22} /><div className="k">{b.claim}</div></div><figcaption>Visitenkarte</figcaption></figure>
    <figure><div className="hm-lk-kopf"><LogoKonzept spec={spec} b={b} h={spec.art === "monogramm" ? 26 : 16} /><span>Objekte</span><span>Verkaufen</span><i style={{ background: b.akzent }}>Erstgespräch</i></div><figcaption>Website</figcaption></figure>
    <figure><div className="hm-lk-post" style={{ background: nacht }}><div className="t">{b.claim}</div><LogoKonzept spec={spec} b={b} h={spec.art === "monogramm" ? 22 : 12} invert /></div><figcaption>Post</figcaption></figure>
  </div>;
}

/* ---------- Werkstatt ---------- */
function LogoWerkstatt({ m, teamSicht }) {
  hmLkStil();
  useHm("logos"); useHm("branding"); useHm("marke2");
  const da = useLkSchriften();
  const b = hmBrand(m.id);
  const st = (hmStore.get("logos") || {})[m.id] || {};
  const [tab, setTab] = React.useState("entwuerfe");
  const [ansicht, setAnsicht] = React.useState("raster");
  const [richtungen, setRichtungen] = React.useState([]);
  const [runde, setRunde] = React.useState(0);
  const [basis, setBasis] = React.useState(null);
  const [fokus, setFokus] = React.useState(null);
  const [ausgang, setAusgang] = React.useState(null);
  const [achse, setAchse] = React.useState(null);
  const stwKey = JSON.stringify(st.stichworte || {});
  const konzepte = React.useMemo(() => hmLkKonzepte(m.id, { runde, richtungen, basis }), [m.id, runde, richtungen.join(","), basis && basis.id, b.akzentId, b.schriftId, stwKey]);
  const aktiv = fokus || konzepte[0];
  const geschwister = React.useMemo(() => (achse && aktiv ? hmLkKonzepte(m.id, { basis: aktiv, achse }) : []), [m.id, achse, aktiv && aktiv.id, stwKey]);
  const vorschlaege = React.useMemo(() => hmLkVorschlaege(m.id), [m.id, stwKey, b.schriftId]);
  const zuletzt = (st.zuletzt || []).filter((x) => x && x.art && x.id);
  useLkStamm([...konzepte, aktiv, ...geschwister, ...vorschlaege]);
  const merk = st.merk || [];
  const set = (patch) => hmStore.patch("logos", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), ...patch } }));
  const merkeZuletzt = (s) => hmStore.patch("logos", (a) => { const x = { ...((a || {})[m.id] || {}) }; x.zuletzt = [s, ...(x.zuletzt || []).filter((y) => y && y.id !== s.id)].slice(0, 8); return { ...(a || {}), [m.id]: x }; });
  const zeigen = (s) => { setFokus(s); setAusgang(s); merkeZuletzt(s); };
  const aendern = (s) => { setFokus(s); merkeZuletzt(s); };
  const merken = (s) => { const drin = merk.some((x) => x.id === s.id); if (!drin && merk.length >= 3) { toast("Höchstens drei Entwürfe für den Makler"); return; } set({ merk: drin ? merk.filter((x) => x.id !== s.id) : [...merk, s] }); };
  const uebernehmen = (s) => { hmStore.patch("branding", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), logoKonzept: s, status: (((a || {})[m.id] || {}).status === "freigegeben" ? "geaendert" : ((a || {})[m.id] || {}).status || "entwurf") } })); set({ gewaehlt: s.id }); hmEvent(m.id, "branding", "Logo übernommen: " + hmLkArtName(s.art), teamSicht ? "Team" : m.name); toast("Logo übernommen. Website, Karte und Material zeigen es jetzt."); };
  const blaettern = (d) => { if (!konzepte.length) return; const i = Math.max(0, konzepte.findIndex((x) => aktiv && x.id === aktiv.id)); zeigen(konzepte[(i + d + konzepte.length) % konzepte.length]); };
  React.useEffect(() => {
    if (tab !== "entwuerfe" || ansicht !== "einzel") return;
    const f = (e) => { const t = e.target; if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return; if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return; e.preventDefault(); blaettern(e.key === "ArrowRight" ? 1 : -1); };
    window.addEventListener("keydown", f); return () => window.removeEventListener("keydown", f);
  });
  const gemerkt = (s) => merk.some((x) => x.id === s.id);
  const aktionen = aktiv && <div className="hm-lk2-aktionen">
    <Btn onClick={() => uebernehmen(aktiv)}>Als Logo übernehmen</Btn>
    <button type="button" className="hm-link" onClick={() => merken(aktiv)}>{gemerkt(aktiv) ? "Von der Liste nehmen" : "Für den Makler merken"}</button>
    <button type="button" className="hm-link" onClick={() => hmLkLaden(aktiv, b)}>SVG laden</button>
  </div>;
  const idx = aktiv ? konzepte.findIndex((x) => x.id === aktiv.id) : -1;
  return <div className="hm-lk2">
    <p className="hm-sub" style={{ marginTop: 0 }}>Entwürfe aus Name, Schrift und Idee der Marke. Zeichen nur aus den Stichworten der Marke, keine Symbole aus dem Katalog. Farben aus dem Branding.</p>
    <LogoStichworte mid={m.id} teamSicht={teamSicht} />
    <Tabs tabs={[["entwuerfe", "Entwürfe"], ["fein", "Feinschliff"], ["regeln", "Faustregeln"], ["fassungen", "Fassungen"], ["anwendungen", "Anwendungen"]]} akt={tab} set={setTab} />
    {tab === "entwuerfe" && <>
      <div className="hm-lk2-kopfzeile">
        <div className="hm-chips" role="group" aria-label="Richtung">{HM_LK_RICHTUNGEN.map((r) => <button key={r.id} type="button" className={"hm-chip" + (richtungen.includes(r.id) ? " on" : "")} aria-pressed={richtungen.includes(r.id)} onClick={() => { setBasis(null); setFokus(null); setRichtungen((l) => l.includes(r.id) ? l.filter((x) => x !== r.id) : [...l, r.id]); }}>{r.name}</button>)}</div>
        <div className="rechts">
          <LkSeg label="Ansicht" werte={[["raster", "Raster"], ["einzel", "Einzelansicht"]]} akt={ansicht} set={setAnsicht} />
          <button type="button" className="hm-link" onClick={() => { setBasis(null); setFokus(null); setRunde((x) => x + 1); }}>Neue Runde</button>
        </div>
      </div>
      {basis && <p className="hm-lk2-leise">Mehr davon: Varianten zu {hmLkArtName(basis.art)} in {basis.font}. <button type="button" className="hm-link" onClick={() => setBasis(null)}>Alle Richtungen</button></p>}
      {aktiv && <LkBuehne spec={aktiv} b={b} />}
      {aktionen}
      {aktiv && <section className="hm-lk2-ideen" aria-label="Ideen">
        <div className="hm-lk2-achsen" role="group" aria-label="Ideen je Achse">{HM_LK_ACHSEN_NAMEN.map(([id, n]) => <button key={id} type="button" className={"hm-chip" + (achse === id ? " on" : "")} aria-pressed={achse === id} onClick={() => setAchse(achse === id ? null : id)}>{n}</button>)}</div>
        {achse && (geschwister.length ? <div className="hm-lk2-geschwister">{geschwister.map((s) => <LkMini key={s.id} spec={s} b={b} text={hmLkAchsenText(s, achse)} onClick={() => zeigen(s)} />)}</div> : <p className="hm-lk2-leise">{HM_LK_SAETZE.keineGeschwister}</p>)}
        {zuletzt.length > 0 && <div><h4 className="hm-lk2-h4">Zuletzt</h4><div className="hm-lk2-reihe">{zuletzt.map((s) => <button key={s.id} type="button" className="hm-lk2-klein" onClick={() => { setFokus(s); setAusgang(s); }} aria-label={"Zurück zu " + hmLkBeschreibung(s)}><LogoKonzept spec={s} b={b} h={hmLkHoehe(s, b, 120, s.art === "monogramm" ? 34 : 22)} /></button>)}</div></div>}
        {vorschlaege.length > 0 && <div><h4 className="hm-lk2-h4">Vorgeschlagen</h4><div className="hm-lk2-geschwister">{vorschlaege.map((s) => <LkMini key={s.id} spec={s} b={b} text={hmLkHerkunftText(s, b)} onClick={() => zeigen(s)} />)}</div></div>}
      </section>}
      {ansicht === "einzel" && aktiv ? <div className="hm-lk2-einzel">
        <div className="hm-lk2-blaettern">
          <button type="button" className="hm-lk2-rund" onClick={() => blaettern(-1)} aria-label="Voriger Entwurf"><Ico n="zurueck" /></button>
          <button type="button" className="hm-lk2-rund" onClick={() => blaettern(1)} aria-label="Nächster Entwurf"><Ico n="weiter" /></button>
          <span>{idx >= 0 ? `${idx + 1} von ${konzepte.length}` : "außerhalb der Runde"}. Mit den Pfeiltasten blättern.</span>
        </div>
        <div style={{ maxWidth: 520 }}><LogoImEinsatz spec={aktiv} b={b} /></div>
      </div> : <div className="hm-lk2-raster" style={{ opacity: da ? 1 : 0.4 }}>{konzepte.map((s) => <div key={s.id} className={"hm-lk2-kachel" + (aktiv && aktiv.id === s.id ? " on" : "")}>
        <button type="button" className="hm-lk2-bild" onClick={() => zeigen(s)} aria-pressed={!!(aktiv && aktiv.id === s.id)} aria-label={`Entwurf ${hmLkBeschreibung(s)}`}><LogoKonzept spec={s} b={b} h={hmLkHoehe(s, b, 150, s.art === "monogramm" ? 60 : 56)} /></button>
        <div className="titel">{hmLkBeschreibung(s)}</div>
        <div className="hm-lk2-unter">{hmLkHerkunftText(s, b)}, {s.font}</div>
        <div className="knoepfe"><button type="button" className="hm-link" onClick={() => { setBasis(s); zeigen(s); }}>Mehr davon</button><button type="button" className="hm-link" onClick={() => merken(s)}>{gemerkt(s) ? "Gemerkt" : "Merken"}</button></div>
      </div>)}</div>}
      <div className="hm-lk2-merk">
        <div className="hm-lk2-kopfzeile"><h3 className="hm-lk2-h3">Für den Makler</h3><span className="hm-lk2-unter">{merk.length} von 3</span></div>
        {!merk.length ? <p className="hm-lk2-leise">Bis zu drei Entwürfe merken. Der Makler bewertet sie am Markenvertrag, das Team entscheidet.</p>
          : <div className="hm-lk2-merkliste">{merk.map((s) => { const bw = (st.bewertung || {})[s.id] || {}; const ja = HM_LK_KRITERIEN.filter((x) => bw[x] === true).length, nein = HM_LK_KRITERIEN.filter((x) => bw[x] === false).length; return <button key={s.id} type="button" className="hm-lk2-mk" onClick={() => { setFokus(s); setAusgang(s); }}><LogoKonzept spec={s} b={b} h={26} /><span className="d">{ja || nein ? `Makler: ${ja} ja, ${nein} nein` : "noch nicht bewertet"}{st.gewaehlt === s.id ? ", übernommen" : ""}</span></button>; })}</div>}
      </div>
    </>}
    {tab === "fein" && aktiv && <>
      <LkBuehne spec={aktiv} b={b} />
      <LogoFeineditor spec={aktiv} b={b} ausgang={ausgang || konzepte[0]} onChange={aendern} />
      {aktionen}
    </>}
    {tab === "regeln" && aktiv && <>
      <LkBuehne spec={aktiv} b={b} />
      <LogoPruefstand spec={aktiv} b={b} mid={m.id} teamSicht={teamSicht} />
    </>}
    {tab === "fassungen" && aktiv && <LogoFassungen spec={aktiv} b={b} />}
    {tab === "anwendungen" && aktiv && <LogoAnwendungen spec={aktiv} b={b} m={m} />}
  </div>;
}

/* Makler: drei Entwürfe, geurteilt am Markenvertrag, nicht nach Geschmack */
function LogoBewertung({ m }) {
  useHm("logos"); useLkSchriften();
  const b = hmBrand(m.id);
  const st = (hmStore.get("logos") || {})[m.id] || {};
  const merk = st.merk || [];
  if (!merk.length) return null;
  const setB = (id, krit, v) => hmStore.patch("logos", (a) => { const x = { ...((a || {})[m.id] || {}) }; const bw = { ...(x.bewertung || {}) }; bw[id] = { ...(bw[id] || {}), [krit]: v }; return { ...(a || {}), [m.id]: { ...x, bewertung: bw } }; });
  return <section className="hm-lk-bewertung">
    <div className="hm-mono">Logo-Entwürfe</div>
    <p className="hm-sub" style={{ margin: "6px 0 0", fontSize: 14 }}>Bitte nicht nach Geschmack urteilen, sondern an drei Fragen aus Ihrem Markenvertrag. Das Team entscheidet danach.</p>
    {merk.map((s) => { const bw = (st.bewertung || {})[s.id] || {}; return <div key={s.id} className="hm-lk-bw">
      <div className="bild"><LogoKonzept spec={s} b={b} h={s.art === "monogramm" ? 48 : 30} /></div>
      <LogoImEinsatz spec={s} b={b} />
      <div className="fragen">{HM_LK_KRITERIEN.map((k) => <div key={k} className="hm-reihe"><div className="m"><div className="t" style={{ whiteSpace: "normal" }}>{k}</div></div><div className="hm-seg klein"><button className={bw[k] === true ? "on" : ""} onClick={() => setB(s.id, k, true)}>Ja</button><button className={bw[k] === false ? "on" : ""} onClick={() => setB(s.id, k, false)}>Nein</button></div></div>)}</div>
    </div>; })}
  </section>;
}

/* ---------- Selbsttest ohne DOM-Seiteneffekte (unverbundene Canvas zum Messen sind erlaubt) ---------- */
function hmSelbsttestLogo() {
  const out = []; const t = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: e.message }); } };
  const dom = typeof document !== "undefined" ? [document.head.childElementCount, document.body ? document.body.childElementCount : 0] : null;
  const mid = "markus"; const b = hmBrand(mid);
  const l = hmLkKonzepte(mid, {});
  const mess = () => 100;
  const gleich = (x, y) => (x == null && y == null) || x === y || (typeof x === "number" && typeof y === "number" && Math.abs(x - y) < 1e-9);
  /* Bestehende sechs */
  t("18 Entwürfe über alle Arten", () => { const arten = new Set(l.map((x) => x.art)); return { ok: l.length >= 16 && arten.size >= 6, detail: `${l.length} Entwürfe, ${arten.size} Arten` }; });
  t("Schriften nur aus dem Pool", () => ({ ok: l.every((x) => HM_LK_SCHRIFTEN.some((s) => s.f === x.font)) }));
  t("Zeichen aus Idee und Welt", () => { const z = hmLkKontext(mid).zeichen; return { ok: z.length >= 1 && l.filter((x) => x.art === "zeichen").every((x) => z.includes(x.zeichen)), detail: z.join(", ") }; });
  t("Layout ohne NaN", () => { const bad = l.filter((s) => { const L = hmLkLayout(s, b, mess); return !isFinite(L.W) || !isFinite(L.H) || /NaN|undefined/.test(hmLkSvgText(s, b)); }); return { ok: !bad.length, detail: bad.map((x) => x.art).join(", ") }; });
  t("Mehr davon bleibt in der Art", () => { const v = hmLkKonzepte(mid, { basis: l[0] }); return { ok: v.length >= 8 && v.every((x) => x.art === l[0].art), detail: l[0].art }; });
  t("Richtung Initialen liefert Monogramme", () => { const v = hmLkKonzepte(mid, { richtungen: ["initialen"] }); return { ok: v.every((x) => x.art === "monogramm") }; });
  /* Neu */
  t("Standardrunde ohne Punkt, mindestens sechs Arten, höchstens 18", () => { const arten = new Set(l.map((x) => x.art)); return { ok: !l.some((x) => x.art === "punkt") && arten.size >= 6 && l.length <= 18, detail: [...arten].join(", ") }; });
  t("Markus-Stichworte enthalten Rat mit Ratlinie", () => { const s = hmLkStichworte(mid); return { ok: s.some((x) => x.wort === "Rat" && x.zeichen.includes("ratlinie")), detail: s.map((x) => `${x.wort} (${x.quelle})`).join(", ") }; });
  t("Dickte mit Ratlinie in der Schrift der Marke", () => { const rat = hmLkStichworte(mid).find((x) => x.id === "rat"); if (!rat || !rat.an) return { ok: true, detail: "Rat ist ausgeschaltet" }; const d = l.find((x) => x.art === "dickte" && x.zeichen === "ratlinie"); return { ok: !!d && ["Newsreader", "Instrument Sans"].includes(d.font), detail: d ? d.font : "keine Dickte mit Ratlinie" }; });
  t("Geschwister ändern nur ihre Achse, höchstens sechs", () => {
    const basen = [l[0], l.find((x) => x.art === "zeichen"), l.find((x) => x.art === "dickte")].filter(Boolean); const fehl = [];
    basen.forEach((b0) => { const B = hmLkKlemmen(b0); Object.keys(HM_LK_ACHSEN).forEach((a) => { const g = hmLkKonzepte(mid, { basis: B, achse: a }); if (g.length > 6) fehl.push(a + " zu viele"); g.forEach((s) => HM_LK_FELDER.forEach((k) => { if (!HM_LK_ACHSEN[a].includes(k) && !gleich(s[k], B[k])) fehl.push(`${a}: ${k}`); })); }); });
    return { ok: !fehl.length, detail: fehl.slice(0, 4).join(", ") };
  });
  t("hmLkKlemmen hält Grenzen", () => {
    const s = hmLkKlemmen({ art: "gesperrt", font: "Newsreader", gewicht: 900, laufweite: 0.9, verhaeltnis: 3, zelle: 0.1, versal: false });
    const w = hmLkKlemmen({ art: "satz", font: "Instrument Sans", laufweite: -0.5 }); const d = hmLkKlemmen({ art: "dickte", laufweite: 0.2, zelle: 2 });
    return { ok: s.laufweite === 0.32 && s.verhaeltnis === 1.6 && s.zelle === 0.62 && s.gewicht === 500 && s.versal === true && w.laufweite === -0.03 && d.laufweite === 0 && d.zelle === 0.9, detail: `${s.laufweite}, ${s.verhaeltnis}, ${s.zelle}, ${s.gewicht}` };
  });
  t("Alte Specs rendern unverändert", () => {
    const alt = { id: "lk-markus-v2", art: "teilung", font: "Instrument Sans", gewicht: 500, versal: true, laufweite: 0, zeichen: null, lage: null, akzent: true };
    const k = hmLkKlemmen(alt); const L = hmLkLayout(alt, b, mess);
    return { ok: k.id === alt.id && k.art === alt.art && k.gewicht === 500 && k.laufweite === 0 && k.zelle === 0.74 && isFinite(L.W) && L.zellen && L.zellen.every((z) => Math.abs(z - 30 * 0.74) < 1e-9), detail: `W ${L.W}` };
  });
  t("Fassungen: Tinte und Akzent mindestens 3 zu 1 auf ihrem Grund", () => { const bad = HM_LK_FASSUNGEN.filter((f) => { const F = hmLkFassung(b, f.id); return hmLkKontrast(F.INK, F.GRUND) < 3 || hmLkKontrast(F.AKZ, F.GRUND) < 3; }); return { ok: HM_LK_FASSUNGEN.length === 6 && !bad.length, detail: bad.map((x) => x.id).join(", ") }; });
  t("Favicon bei 16 px mit dickeren Strichen", () => { const s = l.find((x) => x.art === "zeichen") || l[0]; const f = hmLkFavicon(s, 16, b); const a = hmLkLayout(s, b, mess), c = hmLkLayout(f, b, mess); const g = hmLkFavicon(s, 64, b); return { ok: c.S > a.S && f.minLinie > 0 && g.staerke === 1 && c.teile.some((x) => x.typ !== "text" || x.dicke > 0), detail: `${a.S.toFixed(2)} zu ${c.S.toFixed(2)}` }; });
  t("Paketliste mit allen Pflichtdateien", () => {
    const p = hmLkPaketListe(l[0], b).map((x) => x.pfad.split("/").pop()); const z = hmLkHatZeichen(l[0]) ? "zeichen" : "monogramm";
    const muss = ["hauptlogo", "gestapelt", z].flatMap((n) => ["hell", "dunkel"].flatMap((v) => [`${n}-${v}.svg`, `${n}-${v}.png`])).concat(["profil-monogramm-1080", "favicon-32", "favicon-180"].flatMap((n) => [`${n}-hell.png`, `${n}-dunkel.png`]), ["anwendung.html"]);
    const fehlt = muss.filter((x) => !p.includes(x)); const ordner = hmLkPaketListe(l[0], b).every((x) => x.pfad.startsWith(hmDateiname(b.vor + "-" + b.nach) + "-logo/"));
    return { ok: !fehlt.length && ordner, detail: fehlt.join(", ") };
  });
  t("Silhouetten-Hash deterministisch", () => { const bits = new Uint8Array(1024); for (let i = 0; i < 1024; i++) bits[i] = (i * 7) % 3 === 0 ? 1 : 0; const h = hmLkHash(bits), h2 = hmLkHash(bits.slice()); const x = bits.slice(); x[5] = x[5] ? 0 : 1; return { ok: h === h2 && h.length === 256 && hmLkHamming(h, h2) === 0 && hmLkHamming(h, hmLkHash(x)) === 1 }; });
  t("Dickte mit gleichen Zellbreiten und Wortabstand einer Zelle", () => { const s = hmLkKlemmen({ art: "dickte", font: "Newsreader", gewicht: 400, zelle: 0.8 }); const L = hmLkLayout(s, b, mess); const n = [...hmLkName(b, s)].length; const z = 0.8 * 44; return { ok: !!L.zellen && L.zellen.length === n && L.zellen.every((x) => Math.abs(x - z) < 1e-9) && Math.abs(L.W - Math.ceil(n * z + 2)) < 1e-9, detail: `${n} Zellen` }; });
  t("Sichtbare Texte ohne Ausrufezeichen und Gedankenstriche", () => {
    const html = hmLkAnwendungHtml(l[0], b, {}).replace(/<style[\s\S]*?<\/style>/, " ").replace(/<[^>]*>/g, " ");
    const texte = [...Object.values(HM_LK_SAETZE), ...HM_LK_ARTEN.map((x) => x.name), ...HM_LK_RICHTUNGEN.map((x) => x.name), ...HM_LK_FASSUNGEN.flatMap((x) => [x.name, x.satz]), ...Object.values(HM_LK_ZEICHEN_NAME), ...HM_LK_KRITERIEN, ...l.map((x) => hmLkHerkunftText(x, b)), ...hmLkStichworte(mid).map((x) => x.wort + ", " + hmLkQuelleText(x)), html];
    if (typeof document !== "undefined") try { hmLkPruefen(l[0], b, { mid, teamSicht: true }).forEach((z) => texte.push(z.name, z.wert, z.satz)); } catch (e) { texte.push("Prüfstand " + e.message); }
    const bad = texte.filter((x) => /[!\u2013\u2014]/.test(String(x)));
    return { ok: !bad.length, detail: bad.slice(0, 2).join(" | ").slice(0, 80) };
  });
  t("Keine DOM-Seiteneffekte", () => { if (!dom) return { ok: true, detail: "ohne Dokument" }; const jetzt = [document.head.childElementCount, document.body ? document.body.childElementCount : 0]; return { ok: jetzt[0] === dom[0] && jetzt[1] === dom[1] }; });
  return out;
}

Object.assign(window, {
  HM_LK_SCHRIFTEN, HM_LK_ARTEN, hmLkKonzepte, hmLkLayout, hmLkSvgText, hmLkSvgPfade, hmLkLaden, LogoKonzept, LogoImEinsatz, LogoWerkstatt, LogoBewertung, hmSelbsttestLogo, hmLkProfilSpec,
  HM_LK_WORT_ZEICHEN, HM_LK_GRENZEN, HM_LK_FASSUNGEN, HM_LK_STAMM_START, hmLkStil, hmLkStichworte, hmLkKlemmen, hmLkFassung, hmLkStamm, hmLkRaster, hmLkHash, hmLkPruefen, hmLkKohorte,
  hmLkFavicon, hmLkPaketListe, hmLkPaket, LogoFeineditor, LogoPruefstand, LogoFassungen, LogoAnwendungen,
  hmLkHerkunftText, hmLkFormen, hmLkDatei, hmLkAnwendungHtml, LogoStichworte,
  /* für das Logo-Erlebnis (wb-logo-erlebnis.jsx) */
  useLkSchriften, useLkStamm, HM_LK_KRITERIEN, HM_LK_ZEICHEN_NAME, hmLkHatZeichen, hmLkQuelleText, hmLkHoehe,
});
