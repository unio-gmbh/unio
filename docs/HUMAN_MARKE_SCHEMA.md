# UNIO HUMAN. Datenvertrag Marke (v1, 28.09.2026)

Gemeinsame Schnittstelle für drei Bauteile, die parallel entstehen:
- **Plattform** (`ui_kits/human/human-plattform.jsx`): erzeugt die Markenplattform aus Fragebogen, Workshop-Mitschrift, Material und gewähltem Strategie-Weg, prüft ihre Qualität.
- **Markenwelten** (`ui_kits/human/human-markenwelten.jsx`): kuratierte visuelle Identitätssysteme und deren Anwendungen.
- **Markenbuch** (`ui_kits/human/human-markenbuch.jsx`): zeigt beides als Ergebnis für Makler und Team, druckbar.

Ziel: ein Ergebnis wie von einer High-End-Brand- und Social-Agentur. Maßstab sind die Liefergegenstände solcher Agenturen: Einsicht, Positionierung, Markenplattform, verbale Identität mit Beispielen, Story in drei Längen, visuelles System mit Idee, Säulen als ausgearbeitete Serien, Konzeptideen, Startplan. Spezifisch für genau diesen Makler, nie austauschbar.

## Quellen, die der Generator liest (alle über hmStore)

- `fragebogen[mid].antworten`: Keys siehe `human-data.jsx` (u.a. seit, herkunft, immotypen, abschluesse, gruende, hindernis, ausloeser, milieus, phasen, bezirke, graetzl, graetzl_anteil, seite, gefuehl, unity, s1 bis s5, archetyp, bildpaare, werte, worte, ideal, erfolge, fokus, privat, tabus, anrede, bestand, follower, behalten, assets, vorbilder, kamera, zeit, formate, kanaele, ziel, verfuegbar, cue, fremdbild, aufgewachsen, wendepunkt, abgeraten, belege, fehler, kundensatz).
- `strategien[mid]`: `{ wege: { a, b }, gewaehlt }`. Ein Weg (aus `hmWeg`) hat u.a. archetyp { id, name, achse, leitidee, ... }, satz, story [{ titel, text }], saeulen { markt, wissen, meinung, persoenlich, beweise: Prozent }, formate, kanaele, frequenz, ton, hooks, bio, leitidee, anrede ("Du" oder "Sie"), anredeRegel, bezirke, privat, passt, fordert.
- `meetings` (Mitschrift mit `zitate`, `transkript`), `branding[mid]` (logo, schrift, akzent, claim, material), `hmBrand(mid)`.

## Objekt `plattform` (Ergebnis von `hmPlattform(mid)`)

```js
{
  version: 1, quelle: "regeln" | "claude", erstellt: "ISO",
  einsicht: { zielgruppe: "", spannung: "", konvention: "", weisseStelle: "" },
  positionierung: { satz: "", fuerWen: "", was: "", andersAls: "", weil: "" },
  versprechen: "",
  rolle: { name: "", satz: "" },                       // Archetyp in eigenen Worten
  werte: [{ name: "", verhalten: "", nie: "" }],       // 3 Werte, je als Verhalten
  persoenlichkeit: [{ wort: "", heisst: "", heisstNicht: "" }],  // 3 bis 4
  stimme: {
    regler: { ernst: 0-100, persoenlich: 0-100, begeistert: 0-100, sachlich: 0-100 },
    regeln: [""], sagen: [""], vermeiden: [""],
    beispiele: [{ wo: "", so: "", nicht: "" }]         // mindestens 4: Caption, Erstnachricht, Absage, Website
  },
  botschaften: { claim: "", claimAlternativen: [""], einSatz: "", dreiSaetze: "", ueberMich: "", boilerplate: "" },
  story: { herkunft: "", spannung: "", wendepunkt: "", haltung: "", versprechen: "", kurz: "", mittel: "", lang: "" },
  beweise: [{ behauptung: "", beleg: "", quelle: "" }],
  saeulen: [{
    id: "", name: "", zweck: "", frage: "", anteil: 0,
    formate: [""],
    serie: { name: "", idee: "", ablauf: [""], hookFormel: "", rhythmus: "", beispiele: [{ titel: "", hook: "", skizze: "" }] }
  }],
  konzepte: [{ name: "", idee: "", warum: "", umsetzung: [""], kanal: "" }],   // 3 Konzeptideen
  start30: [{ woche: 1, beitraege: [{ titel: "", saeule: "", format: "" }] }],
  visuell: { welt: "id aus HM_MARKENWELTEN", idee: "", bildsprache: { regeln: [""], motive: [""], vermeiden: [""] }, zeichen: "" },
  qualitaet: { gesamt: 0-100, kriterien: [{ name: "", wert: 0-100, hinweis: "" }], klischees: [""], aehnlichkeit: 0-100 }
}
```

## Objekt `markenwelt` (Eintrag in `HM_MARKENWELTEN`)

```js
{
  id: "", name: "", idee: "",                    // Leitbild in einem Satz
  passtZu: ["kenner", ...],                       // Archetyp-IDs aus human-data.jsx
  schrift: "editorial" | "klassisch" | "zeitlos" | "modern" | "unio",   // Schlüssel aus HM_WEB_SCHRIFTEN, damit die Website passt
  farben: { grund: "#", text: "#", flaeche: "#", linie: "#" },   // Akzent kommt aus dem Branding (b.akzent)
  proportion: { grund: 70, text: 20, akzent: 10 },
  zeichen: { name: "", satz: "" },                // das wiedererkennbare Element (distinctive asset)
  bildsprache: { regeln: [""], motive: [""], vermeiden: [""] },
  raster: { rand: 0.08, spalten: 6 },
  websiteLook: 1-6                                // passender Look aus showcase1 bis 6
}
```

Renderer (React-Komponenten, SVG oder HTML/CSS, keine Bitmaps außer echten Fotos):
- `WeltPost({ welt, b, art: "hook" | "zahl" | "zitat" | "objekt" | "serie", text, unter, bild, serie })` 1080 × 1350 skaliert
- `WeltStory({ welt, b, text, bild })` 1080 × 1920
- `WeltFeed({ welt, b, posts })` Raster aus 9 Posts wie im Instagram-Profil
- `WeltKarte({ welt, b, seite })` Visitenkarte 85 × 55
- `WeltSignatur({ welt, b })`, `WeltExpose({ welt, b, objekt })` Titelseite A4
- `WeltTafel({ welt, b })` Übersicht: Idee, Farben mit Proportion, Schrift, Zeichen, Bildsprache

`b` ist das Objekt aus `hmBrand(mid)` (vor, nach, initialen, makler.name, akzent, schrift { d, t }, claim, portrait, logo) plus `plattform` falls vorhanden.

## Regeln für alle drei Bauteile

- Babel standalone, globaler Scope, keine Neudeklaration von React-Hooks (immer `React.useState`), kein `import()`, eindeutige Namen, Export per `Object.assign(window, {...})`.
- Deutsch, Makler werden geduzt (ihre eigenen Texte folgen `w.anrede`). Keine Geviertstriche und keine Halbgeviertstriche, keine Emojis, keine Ausrufezeichen, keine Eyebrows über Headlines, keine Textzeichen als Icons (nur `<Ico n="..."/>`), Satzschreibung, kurze Sätze.
- Klischee-Liste (nie verwenden, im Qualitätstest als Fehler zählen): Traumimmobilie, Ihr Partner für, mit Leidenschaft, kompetent und zuverlässig, Immobilienprofi, maßgeschneidert, rundum sorglos, auf Augenhöhe, Mehrwert, ganzheitlich, individuelle Lösungen, Ihr Zuhause ist unsere Mission, seriös, Experte an Ihrer Seite, einzigartig, exklusiv (ohne Beleg).
