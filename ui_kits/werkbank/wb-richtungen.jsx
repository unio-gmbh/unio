/* Werkbank. Markenrichtungen aus der Recherche.
   Antwort auf die Frage: Wie wird aus dem Branding-Research und dem Katalog der 65 Referenzen ein System, das coolere Marken erzeugt.
   Eine Richtung ist eine Haltung mit Gegenbild zum Markt, die der Generator in Parameter übersetzt: Schriften, Logoarten, Zeichen,
   Akzentfamilie, Markenwelt, Bildsprache, Website-Look und Verbote. Die Empfehlung ist begründet, nie Geschmack
   (FRAGEN_WIRKUNG Regel 4: eine Wahl hat höchstens zwei kuratierte Optionen, eine davon markiert und begründet).
   Quellen: docs/werkbank/branding-v2/research/MAKLER_BRANDS.md (Katalog und Muster), R5-makler.md, R1-studios.md, R2-art-direction.md,
   schritte/10_system.md und 06_territorien.md.
   Liest: hmStore "fragebogen"[mid].antworten (worte, erfolge, seite, immotypen), hmBrandNische, hmBrandMuster (wb-brands.jsx),
   HM_LK_ARTEN und HM_LK_ZEICHEN_NAME (wb-logo.jsx), HM_MARKENWELTEN (wb-markenwelten.jsx), HM_WEB_AKZENTE (wb-os-data.jsx),
   HM_GFONTS (wb-fonts-katalog.jsx, nur wenn geladen). Schreibt nichts. */

function hmRichtungStil() {
  if (typeof document === "undefined" || document.getElementById("stil-richtungen")) return;
  const s = document.createElement("style"); s.id = "stil-richtungen";
  s.textContent = `
.hm-ri { display: grid; gap: 22px; max-width: 880px; }
.hm-ri-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.hm-ri-chips .hm-chip { cursor: pointer; }
.hm-ri-chips .hm-chip:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
.hm-ri-satz { font-size: clamp(22px, 2.4vw, 30px); line-height: 1.25; letter-spacing: -.02em; color: var(--ink); margin: 0; max-width: 26em; text-wrap: balance; }
.hm-ri-gegen { display: grid; border-top: 1px solid var(--hairline-dark); border-bottom: 1px solid var(--hairline-dark); }
.hm-ri-gegen > div { display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 16px; padding: 12px 0; font-size: 15px; line-height: 1.45; color: var(--ink-2); }
.hm-ri-gegen > div + div { border-top: 1px solid var(--hairline-dark); }
.hm-ri-gegen .k { color: var(--text-muted); }
.hm-ri-gegen .wir { color: var(--ink); }
.hm-ri-block { display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 16px; align-items: baseline; }
.hm-ri-block .k { font-size: 13px; color: var(--text-muted); }
.hm-ri-block .v { font-size: 15px; line-height: 1.5; color: var(--ink-2); margin: 0; }
.hm-ri-block .v b { font-weight: 500; color: var(--ink); }
.hm-ri-liste { margin: 0; padding: 0; list-style: none; display: grid; }
.hm-ri-liste li { font-size: 15px; line-height: 1.45; color: var(--ink-2); padding: 7px 0; }
.hm-ri-liste li + li { border-top: 1px solid var(--hairline-dark); }
.hm-ri-liste.lose li { padding: 3px 0; }
.hm-ri-liste.lose li + li { border-top: 0; }
.hm-ri-gruende { border-top: 1px solid var(--hairline-dark); padding-top: 14px; display: grid; gap: 8px; }
.hm-ri-gruende .kopf { font-size: 13px; color: var(--text-muted); display: flex; justify-content: space-between; gap: 12px; }
.hm-ri-gruende .kopf .pkt { font-family: "Outfit", system-ui, sans-serif; font-size: 12px; color: var(--ink-2); }
.hm-ri-leer { font-size: 15px; color: var(--text-muted); }
.hm-ri-link { border: 0; background: none; padding: 0; font: inherit; font-size: 14px; color: var(--ink); text-decoration: underline; text-underline-offset: 3px; cursor: pointer; justify-self: start; }
.hm-ri-link:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
.hm-ri-mehr { display: grid; gap: 18px; border-top: 1px solid var(--hairline-dark); padding-top: 18px; }
@media (max-width: 640px) { .hm-ri-gegen > div, .hm-ri-block { grid-template-columns: 1fr; gap: 4px; } }
`;
  document.head.appendChild(s);
}

/* Acht Richtungen. Jede folgt aus Mustern des Katalogs, nichts ist erfunden; Namen und Details sind geschärft.
   schriften.klasse nutzt die Klassen der Referenzen (HM_BRAND_KLASSE_X): antiqua, serif_display, grotesk, geometrisch, slab, script.
   arten sind Logoarten der Werkstatt (HM_LK_ARTEN), zeichen sind Zeichen der Werkstatt (HM_LK_ZEICHEN_NAME), akzent.ids aus HM_WEB_AKZENTE. */
const HM_MARKEN_RICHTUNGEN = [
  {
    id: "verlag", name: "Verlag",
    satz: "Die Marke arbeitet wie eine Redaktion: jedes Haus ist eine Geschichte, nicht ein Inserat.",
    herkunft: "The Modern House und Inigo wurden von früheren Redakteuren von Wallpaper und The World of Interiors gegründet und bauen die Seite wie ein Magazin: Objektnamen statt Adressen, Architekten im Titel, Serifen-Preise, cremefarbene oder dunkelgrüne Flächen, keine Suchleiste im Hero (MAKLER_BRANDS, Muster Wohnen Luxus; R5 1.1). 3SI zeigt mit Antiqua, Creme und Kupfer, dass das auch im Wiener Zinshausgeschäft trägt.",
    gegenbild: { kohorte: "Suchmaske über dem Bild, Listing-Karussell, Kennzahlen-Band und Portal-Fotos mit Weitwinkel.", wir: "Eine Zeile Text statt Suche, ein Haus mit Namen und Geschichte, für das Haus gemachte Bilder, Preis und Quadratmeter erst im Text." },
    nischen: ["wohnen", "luxus"],
    schriften: { d: ["Libre Caslon Display", "Newsreader", "Fraunces", "EB Garamond"], t: ["Libre Caslon Text", "Source Serif 4", "Inter"], klasse: "antiqua" },
    arten: ["satz", "gestapelt", "zeichen"],
    zeichen: ["folio"],
    akzent: { familie: "gruen", ids: ["loden", "petrol"], vermeiden: ["gold", "bankblau", "orange als Signal"] },
    welt: "editorial",
    bild: ["Jedes Haus bekommt eigene Bilder, keine Portal-Fotos und kein Weitwinkel.", "Die erste Kachel eines Objekts trägt keinen Text, die Geschichte steht im Text darunter.", "Orte und Interieurs ohne Menschen, die Person tritt als Kuratorin oder Kurator auf."],
    website: "editorial",
    vermeiden: ["Suchmaske im Hero", "Listing-Karussell", "Kennzahlen-Band", "das Wort Objekt im Fließtext", "Traumimmobilie und exklusiv ohne Beleg"],
    passt: { worte: ["kuratiert", "neugierig", "architektur", "geschichte", "stil", "gestaltet", "leidenschaftlich", "ästhetisch"], erfolge: [1, 3], seite: "beide", immotypen: ["Altbau", "Architekt", "Loft", "Villa", "Denkmalschutz", "Sanierung"] },
  },
  {
    id: "instanz", name: "Instanz",
    satz: "Die Marke ist die Stelle, die den Markt erklärt, bevor sie etwas verkauft.",
    herkunft: "OTTO Immobilien gibt seit 2009 den Ersten Wiener Zinshaus-Marktbericht heraus und positioniert sich damit als Marktinstanz statt als Vermittler, in Burgunder und Taupe statt Blau oder Gold (MAKLER_BRANDS, Wohnen und Muster Wien). JLL und die Gewerbe-Weltmarken zeigen im Hero Research statt Objekte. Die Edelman-LinkedIn-Studie 2024 nennt starke Daten als Merkmal der besten Inhalte (R5 1.5).",
    gegenbild: { kohorte: "Bankblau mit Rot bei den Netzwerken, Zahlen als Trophäenkacheln, Claims aus Werte und Generationen ohne Methode.", wir: "Eine neutrale Grotesk, eine eigene Marktzahl mit Quelle als Kern jeder Seite, Burgunder oder Taupe als einzige Farbe neben Schwarz und Weiß." },
    nischen: ["wohnen", "projekt", "gewerbe"],
    schriften: { d: ["Inter Tight", "Hanken Grotesk", "Schibsted Grotesk", "Instrument Sans"], t: ["Inter", "Source Sans 3", "IBM Plex Sans"], klasse: "grotesk" },
    arten: ["gesperrt", "satz", "teilung"],
    zeichen: ["schriftfeld", "zeitmass"],
    akzent: { familie: "rot", ids: ["bordeaux", "aubergine"], vermeiden: ["bankblau", "gold", "signalrot"] },
    welt: "klar",
    bild: ["Daten als ruhige Grafik auf Papierton, keine Lichtbahnen auf Blau.", "Fassaden und Straßenzüge in neutralem Tageslicht, kein Luftbild mit Stephansdom.", "Die Person beim Einordnen und Erklären, nicht in Pose."],
    website: "corporate",
    vermeiden: ["Trophäenkacheln mit Zahlen", "Stephansdom und Skyline", "Daten-Lichtbahnen auf Blau", "Stempel-Badges mit Jahreszahl", "Marktpost ohne Zahl und Quelle"],
    passt: { worte: ["markt", "zahlen", "analytisch", "fundiert", "genau", "sachlich", "daten", "kompetent", "klar"], erfolge: [2, 4], seite: "eigentuemer", immotypen: ["Zinshaus", "Anlegerwohnung", "Büro", "Bauträger", "Gewerbe", "Investment"] },
  },
  {
    id: "rat", name: "Rat",
    satz: "Beleg vor Lob: die Marke zeigt, was sie weiß, und lässt andere sagen, wie gut sie ist.",
    herkunft: "Die Luxusnische codiert Vertrauen über Antiqua, dünne Striche und Dunkelheit, Aaron Kirman trennt den Namen mit einer einzigen Linie als wiederholbares Zeichen ohne Haus-Symbolik (MAKLER_BRANDS, Muster Personen). DAHLER baut Personenmarken über Marktanalysen und Presse statt über Instagram (R5 1.4). Die Werkbank hat das für Markus Leitner als Ratstrich in Newsreader mit Amber gesetzt.",
    gegenbild: { kohorte: "Umsatz und Rang neben dem Namen, Presselogo-Leiste, Business-Porträt im Anzug, Traumimmobilie als Claim.", wir: "Eine Antiqua in Gemischtschreibung, eine Linie als Zeichen, eine warme Akzentfarbe, Kundenstimmen und Ablauf statt Eigenlob." },
    nischen: ["wohnen", "luxus", "gewerbe"],
    schriften: { d: ["Newsreader", "Source Serif 4", "Literata", "Spectral"], t: ["Source Serif 4", "Inter", "Instrument Sans"], klasse: "antiqua" },
    arten: ["zeichen", "dickte", "satz"],
    zeichen: ["ratstrich", "ratlinie"],
    akzent: { familie: "warm", ids: ["amber", "terrakotta"], vermeiden: ["gold", "bankblau", "schwarz mit gold"] },
    welt: "ruhig",
    bild: ["Die Person im Gespräch oder beim Durchgehen eines Hauses, nie am Schreibtisch und nie in Pose.", "Ein Motiv pro Bild, viel Wand und Boden, seitliches Tageslicht.", "Zahlen gehören in den Text, nicht auf das Bild."],
    website: "personal",
    vermeiden: ["Rangzahl als Logo", "Presselogo-Leiste", "Just Sold und Just Listed", "Gold auf Schwarz", "Superlative ohne Zahl"],
    passt: { worte: ["genau", "ruhig", "verlässlich", "ehrlich", "geduldig", "diskret", "beratend", "gründlich", "verbindlich"], erfolge: [1, 3], seite: "eigentuemer", immotypen: ["Zinshaus", "Altbau", "Erbe", "Anlegerwohnung", "Denkmalschutz", "Eigentumswohnung"] },
  },
  {
    id: "graetzl", name: "Grätzl",
    satz: "Der Ort ist das Zeichen: die Marke gehört zu einem Viertel und benennt es bei seinen Straßen.",
    herkunft: "Peter Wetherell hat aus dem Nachnamen eine Mayfair-Institution gemacht, der Ort ist der Claim; Marlies Muhr trägt drei Städte im Logo (MAKLER_BRANDS, Muster Personen). Die Wiener Muster lassen genau diese Stelle frei: eine Marke, die den Grätzl-Namen zum Zeichen macht, mit Fassadendetails statt Luftbildern (Muster Wien). Die Werkbank hat das für Elif Demir als Grätzl-Linie in Fraunces gesetzt.",
    gegenbild: { kohorte: "Luftbild über die Innere Stadt, gestyltes Dachgeschoss mit Samt und Marmor, Claim ohne Lage.", wir: "Straßennamen und Ecken des eigenen Viertels als Bild und Text, eine warme Antiqua, Terrakotta, Menschen aus dem Grätzl mit ihrer Einwilligung." },
    nischen: ["wohnen", "projekt"],
    schriften: { d: ["Fraunces", "Vollkorn", "Alegreya", "Gelasio"], t: ["Alegreya", "Nunito Sans", "Source Sans 3"], klasse: "antiqua" },
    arten: ["zeichen", "dickte", "gestapelt"],
    zeichen: ["graetzl"],
    akzent: { familie: "erde", ids: ["terrakotta", "amber", "loden"], vermeiden: ["gold", "bankblau", "stephansdom als bild"] },
    welt: "graetzl",
    bild: ["Straßenecken, Ladenzeilen und Hauseingänge des Viertels, Kamera in Kopfhöhe.", "Menschen aus dem Grätzl nur mit Einwilligung und im Arbeitskontext.", "Jede Objektserie nennt die Straße im Titel, nie nur den Bezirk."],
    website: "personal",
    vermeiden: ["Luftbild mit Stephansdom", "Dachgeschoss-Interieur mit Samt und Marmor", "Haus-Piktogramm", "englischer Claim", "Floskeln aus Werte und Generationen"],
    passt: { worte: ["herzlich", "nah", "lokal", "verwurzelt", "ehrlich", "schnell", "grätzl", "nahbar", "zuhause"], erfolge: [2, 4], seite: "kaeufer", immotypen: ["Erstbezug", "Neubau", "Reihenhaus", "Mietwohnung", "Eigentumswohnung", "Doppelhaus"] },
  },
  {
    id: "signatur", name: "Signatur",
    satz: "Die Person ist die Marke, aber als Arbeit in Bewegung, nicht als Pose vor Gold und Skyline.",
    herkunft: "Zwölf von fünfzehn Personenmarken arbeiten mit Wortmarke, Monogramm oder Initialen; Ryan Serhant macht aus RS und einer Wortmarke ein echtes System, Barnes codiert Luxus allein über eine Didone-Wortmarke (MAKLER_BRANDS, Muster Personen und Wohnen Luxus). Das Bild zeigt die Person in Bewegung, nicht am Schreibtisch. SERHANT zeigt Makler bewusst im Video, um Vertrauen zu schaffen (R5 1.2).",
    gegenbild: { kohorte: "Schwarz plus Gold oder Sand, Nacht-Skyline, Drohnenvilla, Umsatz neben dem Namen, Presselogo-Leiste.", wir: "Didone in Versalien, Schwarz und Weiß plus eine kalte Farbe, Monogramm und Wortmarke als System, die Person geht durch ihre Stadt." },
    nischen: ["luxus", "wohnen"],
    schriften: { d: ["Bodoni Moda", "Playfair Display", "Libre Bodoni", "GFS Didot", "DM Serif Display"], t: ["Inter", "Manrope", "Libre Franklin"], klasse: "serif_display" },
    arten: ["gesperrt", "monogramm", "gestapelt"],
    zeichen: ["kante"],
    akzent: { familie: "kuehl", ids: ["petrol", "nachtblau"], vermeiden: ["gold", "sand", "navy mit gold"] },
    welt: "kontrast",
    bild: ["Die Person in Bewegung in der Stadt, beim Gehen, Zeigen, Verhandeln.", "Schwarzweiß als Grundton, eine kalte Farbe als einziger Akzent.", "Kein Luxusauto, keine Skyline bei Nacht, kein Pool in der Dämmerung."],
    website: "personal",
    vermeiden: ["Gold auf Schwarz", "Nacht-Skyline", "Drohnenvilla bei Nacht", "Presselogo-Leiste", "Umsatz oder Rang als Logo"],
    passt: { worte: ["ehrgeizig", "energisch", "meinungsstark", "sichtbar", "verhandlung", "erfolg", "mutig", "direkt", "selbstbewusst"], erfolge: [4, 5], seite: "beide", immotypen: ["Luxus", "Penthouse", "Villa", "Off-Market", "Dachgeschoss"] },
  },
  {
    id: "system", name: "System",
    satz: "Die Marke wirkt wie ein Produkt: ein Monogramm, das als System arbeitet, und Daten statt Versprechen.",
    herkunft: "Daniel Daggers macht mit DDRE aus Initialen eine Tech-Marke, kein Haus-Symbol, keine Serifen, ein Akzent in Türkis, wirkt wie ein Produkt und nicht wie ein Makler (MAKLER_BRANDS, Wohnen Luxus). Compass hat das konsequenteste Schwarzweiß der Branche mit Tech-Produkt-Ästhetik. fäm Properties zeigt Zahlungsplan und Startpreis als Daten im Hero und macht Off-Plan mit Renderings ehrlich sichtbar (Muster Projekt und Gewerbe).",
    gegenbild: { kohorte: "Fette Grotesk auf Bankblau, Haus-Icon, Glasfassade von unten, Rendering, das wie ein Foto tut.", wir: "Geometrische Grotesk, Monogramm als wiederholbares System, Preis und Daten offen im Hero, Rendering als Rendering gekennzeichnet." },
    nischen: ["projekt", "gewerbe", "luxus"],
    schriften: { d: ["Space Grotesk", "Manrope", "Geist", "Sora", "Outfit"], t: ["Inter", "Geist", "IBM Plex Sans"], klasse: "geometrisch" },
    arten: ["monogramm", "dickte", "teilung"],
    zeichen: ["schriftfeld"],
    akzent: { familie: "kuehl", ids: ["petrol", "orange"], vermeiden: ["bankblau", "gold", "lichtbahnen auf blau"] },
    welt: "klar",
    bild: ["Daten und Pläne als Grafik, in einem sichtbaren Raster.", "Architektur in Details und Tageslicht, Renderings immer als Rendering benannt.", "Teamporträts streng vereinheitlicht, gleicher Ausschnitt, gleiches Licht."],
    website: "katalog",
    vermeiden: ["Haus-Icon", "Glasfassade von unten", "Daten-Lichtbahnen auf Blau", "Rendering als Foto ausgegeben", "Skyline bei Sonnenuntergang"],
    passt: { worte: ["modern", "digital", "effizient", "strukturiert", "transparent", "technik", "präzise", "innovativ", "systematisch"], erfolge: [3, 5], seite: "kaeufer", immotypen: ["Bauträger", "Erstbezug", "Neubau", "Büro", "Abverkauf", "Retail"] },
  },
  {
    id: "haus_zahl", name: "Haus und Zahl",
    satz: "Das konkrete Haus, sein Grätzl und seine Zahl sind das Zeichen, nicht ein Stern und nicht die Skyline.",
    herkunft: "Die Wiener Muster enden mit einer freien Stelle: eine Marke, die das konkrete Haus, den Grätzl-Namen und die Zahl (Fläche, Rendite, Baujahr) zum Zeichen macht, in einer Farbe, die weder Blau noch Gold noch Bordeaux ist, mit Fotos von Fassadendetails statt Luftbildern (MAKLER_BRANDS, Muster Wien). Arnold Investments zeigt mit einer Typo-Idee, einem Stiegenhaus und ohne Suchmaske, wie Investorenton entsteht. Keine der 65 Referenzen setzt eine Egyptienne.",
    gegenbild: { kohorte: "Grotesk-Wortmarke in Versalien mit Zusatz Immobilien, Luftbild über die Innere Stadt, Gold auf Dunkel, Störer-Sticker.", wir: "Egyptienne mit fester Dickte oder Maßstab, Hausnummer und Baujahr als Bildelemente, Fassadendetail statt Luftbild, Loden oder Terrakotta als Farbe." },
    nischen: ["wohnen", "gewerbe", "projekt"],
    schriften: { d: ["Bitter", "Zilla Slab", "Roboto Slab", "IBM Plex Serif"], t: ["IBM Plex Sans", "Source Sans 3", "IBM Plex Mono"], klasse: "slab" },
    arten: ["dickte", "teilung", "zeichen"],
    zeichen: ["graetzl", "zeitmass"],
    akzent: { familie: "erde", ids: ["loden", "terrakotta", "amber"], vermeiden: ["gold", "bankblau", "bordeaux"] },
    welt: "klar",
    bild: ["Fassadendetails, Hausnummern, Türen und Stiegenhäuser statt Luftbild.", "Jedes Objektbild trägt Baujahr oder Fläche als kleine Zahl in der Folio-Zeile, nie als Störer.", "Senkrechte Linien bleiben senkrecht, kein Weitwinkel."],
    website: "katalog",
    vermeiden: ["Gold auf Schwarz", "gesperrte Serif-Versalien", "Stephansdom oder Skyline", "Suchmaske im Hero", "Störer-Sticker", "Monogramm im Quadrat"],
    passt: { worte: ["genau", "konkret", "sachlich", "zahl", "haus", "baujahr", "rendite", "handfest", "nüchtern"], erfolge: [2, 4], seite: "eigentuemer", immotypen: ["Zinshaus", "Altbau", "Sanierung", "Anlegerwohnung", "Denkmalschutz", "Betriebsobjekt"] },
  },
  {
    id: "stille", name: "Stille",
    satz: "Die Marke spricht leise: eine Antiqua in Gemischtschreibung, viel Weißraum, kein Gold und kein Superlativ.",
    herkunft: "John Taylor braucht nur Jahreszahl und Antiqua, um Alter und Riviera zu erzählen; Inigo verkauft historische Häuser mit Patina wie einen Buchumschlag (MAKLER_BRANDS, Wohnen Luxus). Luxus entsteht durch Schrift und Weißraum, nicht durch Gold und Zeichen (Muster Wohnen Luxus). Die Jüngeren ersetzen Gold längst durch eine einzige disziplinierte Farbe, Sotheby's stellt ein einziges Objekt wie ein Kunstwerk auf eine dunkle Bühne.",
    gegenbild: { kohorte: "Gesperrte Serif-Versalien, Gold auf Dunkelblau, Pool in der Dämmerung, dunkles Overlay auf Fullscreen-Video.", wir: "Gemischt gesetzte Antiqua, Terrakotta oder Grün als einzige Farbe, ein Objekt pro Seite, Material in Nahaufnahme." },
    nischen: ["luxus", "wohnen"],
    schriften: { d: ["Cormorant Garamond", "EB Garamond", "Libre Caslon Text", "Crimson Pro"], t: ["EB Garamond", "Lora", "Karla"], klasse: "antiqua" },
    arten: ["satz", "gestapelt"],
    zeichen: ["fenster"],
    akzent: { familie: "erde", ids: ["terrakotta", "loden"], vermeiden: ["gold", "bankblau", "schwarz mit gold"] },
    welt: "ruhig",
    bild: ["Interieurs ohne Menschen, Material in Nahaufnahme: Holz, Stein, Stoff.", "Ein Objekt pro Seite, viel Weißraum rundherum.", "Tageslicht, keine Dämmerung mit Pool und kein Video mit dunklem Overlay."],
    website: "editorial",
    vermeiden: ["Gold", "Versalien gesperrt", "Pool in der Dämmerung", "dunkles Overlay auf Fullscreen-Video", "exklusiv und einzigartig als Claim"],
    passt: { worte: ["diskret", "leise", "ruhig", "zurückhaltend", "vertrauen", "qualität", "still", "elegant", "unaufgeregt"], erfolge: [1, 2], seite: "eigentuemer", immotypen: ["Villa", "Penthouse", "Luxus", "Off-Market", "Altbau", "Dachgeschoss"] },
  },
];

const HM_RICHTUNG_WEBSITE_NAME = { editorial: "Editorial", katalog: "Katalog", personal: "Personenseite", corporate: "Corporate" };
/* Logoarten der Werkstatt in den Arten der Referenzen (hmBrandMuster liest logo.art) */
const HM_RICHTUNG_ART_REF = { satz: "wortmarke", gesperrt: "wortmarke", dickte: "wortmarke", teilung: "wortmarke", gestapelt: "gestapelt", monogramm: "monogramm", zeichen: "zeichen_und_name" };

function hmRichtung(id) { return HM_MARKEN_RICHTUNGEN.find((r) => r.id === id) || null; }
function hmRichtungAntworten(mid) { return (((hmStore.get("fragebogen") || {})[mid] || {}).antworten) || {}; }
function hmRichtungWorte(a) { return String(a.worte || "").toLowerCase().split(/[,;\n]+|\s+und\s+/).map((w) => w.trim()).filter(Boolean); }
function hmRichtungNischenName(n) { return ((window.HM_BRAND_NISCHEN || []).find((x) => x[0] === n) || [])[1] || n; }
function hmRichtungKlasseName(k) { return (((window.HM_BRAND_NAME || {}).klasse || {})[k]) || k; }
function hmRichtungArtName(k) { return (((window.HM_BRAND_NAME || {}).art || {})[k]) || k; }
const hmRichtungZitat = (w) => "„" + w + "“";

/* Empfehlung: Richtungen sortiert nach Punkten, jede mit Sätzen, die eine Zahl oder ein Zitat aus den Antworten tragen.
   Punkte: Nische 2, je passendes Wort des Maklers 2 (höchstens 3 Wörter), erfolge 1, seite 1, je Objektart 1 (höchstens 2),
   Marktabstand zusammen höchstens 2: Schriftklasse unter einem Viertel der Nische 2, unter 40 Prozent 1, über 60 Prozent minus 1; Logoart unter einem Viertel 1.
   Die eigenen Wörter wiegen schwerer als der Abstand zum Markt, weil die Richtung zur Person passen muss, bevor sie sich vom Markt abhebt. */
function hmRichtungAufzaehlung(l) { return l.length <= 1 ? l.join("") : l.slice(0, -1).join(", ") + " und " + l[l.length - 1]; }
function hmRichtungEmpfehlung(mid) {
  const a = hmRichtungAntworten(mid);
  const nische = window.hmBrandNische ? hmBrandNische(mid) : "wohnen";
  const nn = hmRichtungNischenName(nische);
  const M = window.hmBrandMuster ? hmBrandMuster(nische) : { n: 0, klasse: [], art: [] };
  const worte = hmRichtungWorte(a);
  const erfolge = typeof a.erfolge === "number" ? a.erfolge : null;
  const seite = typeof a.seite === "number" ? a.seite : null;
  const typen = a.immotypen || [];
  const zahl = (liste, key) => ((liste || []).find((x) => x[0] === key) || [null, 0])[1];
  const out = HM_MARKEN_RICHTUNGEN.map((r) => {
    let p = 0; const g = [];
    if (r.nischen.includes(nische)) { p += 2; g.push(`Nische ${nn} mit ${M.n} Referenzen im Katalog ist für diese Richtung vorgesehen.`); }
    const treffer = worte.filter((w) => r.passt.worte.some((x) => w === x || w.startsWith(x) || x.startsWith(w)));
    if (treffer.length) { p += 2 * Math.min(3, treffer.length); g.push(`${treffer.length === 1 ? "Ihr Wort" : "Ihre Wörter"} ${hmRichtungAufzaehlung(treffer.map(hmRichtungZitat))} ${treffer.length === 1 ? "spricht" : "sprechen"} für diese Richtung.`); }
    if (erfolge != null && r.passt.erfolge) { const [lo, hi] = r.passt.erfolge; if (erfolge >= lo && erfolge <= hi) { p += 1; g.push(`Über Erfolge sprechen: ${erfolge} von 5, die Richtung rechnet mit ${lo} bis ${hi}.`); } }
    if (seite != null && r.passt.seite) { const ziel = r.passt.seite; const ok = ziel === "beide" ? seite >= 35 && seite <= 65 : ziel === "eigentuemer" ? seite <= 40 : seite >= 60; if (ok) { p += 1; g.push(`Der Regler Eigentümer oder Käufer steht auf ${seite} von 100, die Richtung zielt auf ${ziel === "beide" ? "beide Seiten" : ziel === "eigentuemer" ? "Eigentümer" : "Käufer"}.`); } }
    const tt = typen.filter((t) => r.passt.immotypen.some((x) => t.toLowerCase().includes(x.toLowerCase())));
    if (tt.length) { p += Math.min(2, tt.length); g.push(`${tt.length === 1 ? "Objektart" : tt.length + " Objektarten"} ${hmRichtungAufzaehlung(tt.slice(0, 3).map(hmRichtungZitat))} ${tt.length === 1 ? "passt" : "passen"} zu dieser Richtung.`); }
    if (M.n) {
      let ab = 0;
      const k = zahl(M.klasse, r.schriften.klasse); const anteil = k / M.n;
      const kn = hmRichtungKlasseName(r.schriften.klasse);
      if (anteil < 0.25) { ab += 2; const top = M.klasse[0]; g.push(`In ${nn} setzen ${top ? top[1] : 0} von ${M.n} Referenzen auf ${top ? hmRichtungKlasseName(top[0]) : "eine Klasse"}, diese Richtung weicht mit ${kn} ab${k ? ` (${k} von ${M.n})` : " (keine Referenz)"}.`); }
      else if (anteil < 0.4) { ab += 1; g.push(`In ${nn} nutzen ${k} von ${M.n} Referenzen ${kn}, die Richtung hält Abstand zur Mehrheit.`); }
      else if (anteil > 0.6) { ab -= 1; g.push(`In ${nn} nutzen schon ${k} von ${M.n} Referenzen ${kn}, wenig Abstand zum Markt.`); }
      const artRef = HM_RICHTUNG_ART_REF[r.arten[0]]; const ka = zahl(M.art, artRef);
      if (ka / M.n < 0.25) { ab += 1; g.push(`Die Logoart ${hmRichtungArtName(artRef)} kommt in ${nn} nur ${ka} von ${M.n} Mal vor.`); }
      p += Math.min(2, ab);
    }
    return { richtung: r, punkte: p, gruende: g };
  });
  return out.sort((x, y) => y.punkte - x.punkte || HM_MARKEN_RICHTUNGEN.indexOf(x.richtung) - HM_MARKEN_RICHTUNGEN.indexOf(y.richtung));
}

/* Richtung in Generator-Parameter. Schriften werden gegen HM_GFONTS gefiltert, wenn der Katalog geladen ist. */
function hmRichtungParameter(richtung, mid) {
  const r = typeof richtung === "string" ? hmRichtung(richtung) : richtung;
  if (!r) return null;
  const kat = window.HM_GFONTS;
  const im = (f) => !kat || kat.some((x) => x[0] === f);
  const fonts = [...r.schriften.d, ...r.schriften.t].filter((f, i, l) => l.indexOf(f) === i && im(f));
  const akz = window.HM_WEB_AKZENTE || [];
  const vermeiden = [...r.vermeiden];
  if (mid && window.hmBrandKlischees && window.hmBrandNische) hmBrandKlischees(hmBrandNische(mid)).slice(0, 4).forEach((k) => { if (!vermeiden.some((v) => v.toLowerCase() === k.klischee.toLowerCase())) vermeiden.push(k.klischee); });
  return {
    fonts, arten: [...r.arten], zeichen: [...r.zeichen],
    akzentIds: r.akzent.ids.filter((id) => !akz.length || akz.some((x) => x.id === id)),
    welt: r.welt, vermeiden,
  };
}

function RichtungWahl({ mid, akt, set, teamSicht }) {
  hmRichtungStil();
  const emp = React.useMemo(() => hmRichtungEmpfehlung(mid), [mid]);
  const top = emp[0] ? emp[0].richtung.id : null;
  const aktiv = hmRichtung(akt) || (emp[0] && emp[0].richtung) || HM_MARKEN_RICHTUNGEN[0];
  const e = emp.find((x) => x.richtung.id === aktiv.id) || { punkte: 0, gruende: [] };
  const akz = window.HM_WEB_AKZENTE || [];
  const welt = (window.HM_MARKENWELTEN || []).find((w) => w.id === aktiv.welt);
  const zn = window.HM_LK_ZEICHEN_NAME || {};
  const an = (id) => ((window.HM_LK_ARTEN || []).find((x) => x.id === id) || {}).name || id;
  /* Kurz oben, Details hinter zwei Textlinks. Beide klappen beim Wechsel der Richtung wieder zu. */
  const [mehr, setMehr] = React.useState(false);
  const [alle, setAlle] = React.useState(false);
  React.useEffect(() => { setMehr(false); setAlle(false); }, [aktiv.id]);
  const gruende = alle ? e.gruende : e.gruende.slice(0, 4);
  return <div className="hm-ri">
    <div className="hm-ri-chips" role="group" aria-label="Markenrichtung">
      {emp.map(({ richtung: r }) => <button key={r.id} type="button" className={"hm-chip" + (aktiv.id === r.id ? " on" : "")} aria-pressed={aktiv.id === r.id} onClick={() => set && set(r.id)}>{r.name}{r.id === top ? ", empfohlen" : ""}</button>)}
    </div>
    <p className="hm-ri-satz">{aktiv.satz}</p>
    <div className="hm-ri-gegen">
      <div><span className="k">Der Markt</span><span>{aktiv.gegenbild.kohorte}</span></div>
      <div><span className="k">Wir</span><span className="wir">{aktiv.gegenbild.wir}</span></div>
    </div>
    <div className="hm-ri-gruende">
      <div className="kopf"><span>{aktiv.id === top ? "Warum wir diese Richtung empfehlen" : "Was für diese Richtung spricht"}</span>{teamSicht && <span className="pkt">{e.punkte} Punkte</span>}</div>
      {gruende.length ? <ul className="hm-ri-liste lose">{gruende.map((g, i) => <li key={i}>{g}</li>)}</ul> : <div className="hm-ri-leer">Aus den Antworten spricht nichts Konkretes für diese Richtung.</div>}
      {e.gruende.length > 4 && <button type="button" className="hm-ri-link" aria-expanded={alle} onClick={() => setAlle(!alle)}>{alle ? "Weniger Gründe" : `Alle Gründe (${e.gruende.length})`}</button>}
    </div>
    <button type="button" className="hm-ri-link" aria-expanded={mehr} onClick={() => setMehr(!mehr)}>{mehr ? "Weniger zur Richtung" : "Mehr zur Richtung"}</button>
    {mehr && <div className="hm-ri-mehr">
      {teamSicht && <div className="hm-ri-block"><span className="k">Herkunft</span><p className="v">{aktiv.herkunft}</p></div>}
      {teamSicht && <div className="hm-ri-block"><span className="k">Schriften</span><p className="v"><b>{aktiv.schriften.d.join(", ")}</b> für Headline und Logo, {aktiv.schriften.t.join(", ")} für Text. Klasse {hmRichtungKlasseName(aktiv.schriften.klasse)}.</p></div>}
      <div className="hm-ri-block"><span className="k">Form</span><p className="v">{aktiv.arten.map(an).join(", ")}{aktiv.zeichen.length ? ", Zeichen " + aktiv.zeichen.map((z) => zn[z] || z).join(" oder ") : ", ohne Zeichen"}. Farbe {aktiv.akzent.ids.map((id) => (akz.find((x) => x.id === id) || { name: id }).name).join(", ")}.{welt ? ` Markenwelt ${welt.name}.` : ""} Website {HM_RICHTUNG_WEBSITE_NAME[aktiv.website] || aktiv.website}.</p></div>
      <div className="hm-ri-block"><span className="k">Bild</span><ul className="hm-ri-liste">{aktiv.bild.map((b, i) => <li key={i}>{b}</li>)}</ul></div>
      <div className="hm-ri-block"><span className="k">Nie</span><ul className="hm-ri-liste">{aktiv.vermeiden.map((v, i) => <li key={i}>{v}</li>)}</ul></div>
    </div>}
  </div>;
}

function hmSelbsttestRichtungen() {
  const out = []; const t = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: e.message }); } };
  const R = HM_MARKEN_RICHTUNGEN;
  const pflicht = ["id", "name", "satz", "herkunft", "gegenbild", "nischen", "schriften", "arten", "zeichen", "akzent", "welt", "bild", "website", "vermeiden", "passt"];
  t("Acht Richtungen vollständig", () => { const fehlt = R.flatMap((r) => pflicht.filter((k) => r[k] == null || (Array.isArray(r[k]) && !r[k].length && k !== "zeichen")).map((k) => r.id + "." + k)); const ok = R.length === 8 && !fehlt.length && R.every((r) => r.gegenbild.kohorte && r.gegenbild.wir && r.schriften.d.length >= 3 && r.schriften.d.length <= 5 && r.schriften.t.length >= 2 && r.schriften.t.length <= 3 && r.bild.length === 3); return { ok, detail: fehlt.join(", ") || `${R.length} Richtungen` }; });
  t("Ids eindeutig", () => { const ids = R.map((r) => r.id); return { ok: new Set(ids).size === ids.length, detail: ids.join(", ") }; });
  t("Alle Schriften in HM_GFONTS", () => { const kat = window.HM_GFONTS; if (!kat) return { ok: false, detail: "HM_GFONTS fehlt, wb-fonts-katalog.jsx ist nicht eingebunden" }; const fehlt = R.flatMap((r) => [...r.schriften.d, ...r.schriften.t].filter((f) => !kat.some((x) => x[0] === f)).map((f) => r.id + ": " + f)); return { ok: !fehlt.length, detail: fehlt.join(", ") || `${kat.length} Familien im Katalog` }; });
  t("Zeichen- und Arten-Ids gültig", () => { const arten = (window.HM_LK_ARTEN || []).map((x) => x.id); const zn = window.HM_LK_ZEICHEN_NAME || {}; const fehlt = R.flatMap((r) => [...r.arten.filter((a) => !arten.includes(a)), ...r.zeichen.filter((z) => !zn[z])].map((x) => r.id + ": " + x)); return { ok: !fehlt.length && arten.length > 0, detail: fehlt.join(", ") }; });
  t("Akzent-Ids in HM_WEB_AKZENTE", () => { const akz = (window.HM_WEB_AKZENTE || []).map((x) => x.id); const fehlt = R.flatMap((r) => r.akzent.ids.filter((id) => !akz.includes(id)).map((id) => r.id + ": " + id)); return { ok: !fehlt.length && akz.length > 0, detail: fehlt.join(", ") }; });
  t("Welten gültig", () => { const w = (window.HM_MARKENWELTEN || []).map((x) => x.id); const fehlt = R.filter((r) => !w.includes(r.welt)).map((r) => r.id + ": " + r.welt); return { ok: !fehlt.length && w.length > 0, detail: fehlt.join(", ") }; });
  t("Nischen und Schriftklassen gültig", () => { const n = (window.HM_BRAND_NISCHEN || []).map((x) => x[0]); const kl = Object.keys(window.HM_BRAND_KLASSE_X || { antiqua: 1, serif_display: 1, script: 1, slab: 1, grotesk: 1, geometrisch: 1 }); const fehlt = R.flatMap((r) => [...r.nischen.filter((x) => !n.includes(x)), ...(kl.includes(r.schriften.klasse) ? [] : [r.schriften.klasse])].map((x) => r.id + ": " + x)); return { ok: !fehlt.length && n.length > 0, detail: fehlt.join(", ") }; });
  t("Keine Ausrufezeichen oder Gedankenstriche in Texten", () => { const texte = R.flatMap((r) => [r.name, r.satz, r.herkunft, r.gegenbild.kohorte, r.gegenbild.wir, ...r.bild, ...r.vermeiden, ...r.akzent.vermeiden]); const bad = texte.filter((x) => new RegExp("[!\\u2014\\u2013]").test(x)); return { ok: !bad.length, detail: bad.slice(0, 2).join(" | ") }; });
  t("Empfehlung für markus mit Zahl oder Zitat je Satz", () => { const e = hmRichtungEmpfehlung("markus"); const alle = e.flatMap((x) => x.gruende); const ohne = alle.filter((s) => !/\d|„/.test(s)); return { ok: e.length === 8 && alle.length >= 3 && !ohne.length, detail: ohne[0] || `${alle.length} Sätze` }; });
  t("Markus bekommt Rat oder Haus und Zahl, begründet", () => { const e = hmRichtungEmpfehlung("markus"); const top = e[0]; return { ok: !!top && ["rat", "haus_zahl"].includes(top.richtung.id) && top.gruende.length >= 2, detail: top ? `${top.richtung.name}, ${top.punkte} Punkte, ${top.gruende.length} Gründe` : "leer" }; });
  t("Elif bekommt Grätzl, begründet", () => { const e = hmRichtungEmpfehlung("elif"); const top = e[0]; return { ok: !!top && top.richtung.id === "graetzl" && top.gruende.length >= 2, detail: top ? `${top.richtung.name}, ${top.punkte} Punkte` : "leer" }; });
  t("Parameter vollständig und aus den Katalogen", () => { const bad = R.filter((r) => { const p = hmRichtungParameter(r, "markus"); return !p || p.fonts.length < 4 || !p.arten.length || !p.akzentIds.length || !p.welt || !p.vermeiden.length; }).map((r) => r.id); return { ok: !bad.length, detail: bad.join(", ") }; });
  t("Empfehlung ohne Antworten läuft", () => { const e = hmRichtungEmpfehlung("niemand-" + Date.now()); return { ok: e.length === 8 && e.every((x) => typeof x.punkte === "number"), detail: e[0] ? e[0].richtung.name : "" }; });
  t("Komponente rendert ohne Fehler", () => { if (!window.ReactDOMServer && !(window.ReactDOM && ReactDOM.createRoot)) return { ok: true, detail: "kein Renderer, übersprungen" }; const el = document.createElement("div"); const root = ReactDOM.createRoot(el); const vorher = console.error; let fehler = null; console.error = (...a) => { fehler = a.join(" "); }; try { ReactDOM.flushSync(() => root.render(<RichtungWahl mid="markus" akt={null} set={() => {}} teamSicht={true} />)); } finally { console.error = vorher; } const html = el.innerHTML; root.unmount(); const kurz = !/Herkunft/.test(html) && (html.match(/<li/g) || []).length <= 4; return { ok: !fehler && /empfohlen/.test(html) && /Der Markt/.test(html) && /Mehr zur Richtung/.test(html) && kurz, detail: fehler || (kurz ? `${html.length} Zeichen, Kurzansicht` : "Details sind schon aufgeklappt") }; });
  return out;
}

Object.assign(window, { HM_MARKEN_RICHTUNGEN, hmRichtungEmpfehlung, hmRichtungParameter, RichtungWahl, hmRichtungStil, hmSelbsttestRichtungen });
