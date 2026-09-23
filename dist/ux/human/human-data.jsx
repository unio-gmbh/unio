/* UNIO HUMAN. Stammdaten: Etappen, Fragebogen, Milieus, Archetypen, Formate
   und der regelbasierte Strategie-Generator (zwei Wege).
   Quelle: docs/UNIO_HUMAN_PLAN.md Kap. 3, 6, 7. Zahlen sind Arbeitsstand. */

const HM_ETAPPEN = [
  { id: 0, name: "Ankommen", ziel: "Zugang aktiv, Erwartungen klar", tage: "Tag 0 bis 1" },
  { id: 1, name: "Entdecken", ziel: "Fragebogen in fünf Kapiteln", tage: "Tag 1 bis 3" },
  { id: 2, name: "Gespräch", ziel: "Strategie-Workshop mit Daniel", tage: "Tag 3 bis 7" },
  { id: 3, name: "Strategie", ziel: "Dein Weg, geprüft und präsentiert", tage: "Tag 7 bis 10" },
  { id: 4, name: "Aufbau", ziel: "Branding, Website, Konten, Drehtermine", tage: "Tag 10 bis 24" },
  { id: 5, name: "Erster Dreh", ziel: "Drehtag, Rohschnitt, Freigabe", tage: "Tag 14 bis 28" },
  { id: 6, name: "Live", ziel: "Kalender voll für vier Wochen", tage: "bis Tag 30" },
];

/* Sinus-Milieus als Wohnbilder, ohne Fachbegriffe im UI */
const HM_MILIEUS = [
  { id: "kons", titel: "Die gute Adresse", bild: "Altbau mit Stuck, Parkett, Bibliothek, Blick ins Grüne", code: "Exklusivität, Beständigkeit, Diskretion", intern: "Konservativ-gehoben", farbe: "#3B3A36" },
  { id: "post", titel: "Qualität ohne Prahlerei", bild: "Holz, Licht, Bücher, Fahrrad im Hof, Markt um die Ecke", code: "Sinn, Qualität, Nachhaltigkeit", intern: "Postmateriell", farbe: "#5E6B4F" },
  { id: "perf", titel: "Am Puls", bild: "Glas, klare Linien, Dachterrasse, U-Bahn in drei Minuten", code: "Effizienz, Design, Zeitgewinn", intern: "Performer", farbe: "#2C4250" },
  { id: "exp", titel: "Das Besondere", bild: "Loft im Szenequartier, Kunst, Rohbeton, Ateliers", code: "Inspiration, First Mover, Kultur", intern: "Expeditiv", farbe: "#7E3E22" },
  { id: "neo", titel: "Natürlich wohnen", bild: "Lehmputz, Gemeinschaftsgarten, Lastenrad, Photovoltaik", code: "Zukunft, Leichtigkeit, Natur", intern: "Neo-ökologisch", farbe: "#48684E" },
  { id: "mitte", titel: "Platz für die Familie", bild: "Reihenhaus mit Garten, Spielplatz, Schule zu Fuß, Parkplatz", code: "Sicherheit, Planbarkeit, Preis-Leistung", intern: "Adaptiv-pragmatische Mitte", farbe: "#8A6B4A" },
  { id: "nost", titel: "Verlässlich daheim", bild: "Gepflegte Wohnung in der Vorstadt, Nachbarn, Garage, Balkon nach Süden", code: "Heimat, Robustheit, Verlässlichkeit", intern: "Nostalgisch-bürgerlich", farbe: "#6B5E52" },
];

/* Archetypen mit Profil auf den fünf Reglern (0 bis 100):
   s1 aufrichtig(0) bis aufregend(100), s2 kompetent(0) bis nahbar(100),
   s3 ruhig(0) bis energisch(100), s4 klassisch(0) bis modern(100),
   s5 zurückhaltend(0) bis meinungsstark(100) */
const HM_ARCHETYPEN = [
  { id: "kenner", name: "Der Kenner", intern: "Sage", satz: "Du erklärst den Markt, bevor andere ihn verstehen.", regler: [20, 25, 35, 55, 60], achse: "Autorität",
    saeulen: { markt: 35, wissen: 25, meinung: 15, persoenlich: 15, beweise: 10 },
    formate: ["carousel", "talking", "qa"], kanaele: ["linkedin", "instagram"],
    ton: ["präzise, ruhig, belegt", "Zahlen mit Quelle", "kein Ausrufezeichen"],
    palette: ["#1B1A16", "#F7F5F1", "#B87400"], schrift: ["Power Grotesk", "JetBrains Mono"],
    leitidee: "Der Markt wird lesbar." },
  { id: "begleiter", name: "Der Begleiter", intern: "Caregiver", satz: "Du bist da, wenn es um mehr als vier Wände geht.", regler: [30, 85, 40, 45, 30], achse: "Nähe",
    saeulen: { markt: 10, wissen: 25, meinung: 10, persoenlich: 35, beweise: 20 },
    formate: ["talking", "spaziergang", "behind"], kanaele: ["instagram", "facebook"],
    ton: ["warm, klar, ohne Floskeln", "Geschichten von Menschen", "Du-Ansprache"],
    palette: ["#F0EDE6", "#383429", "#B4633C"], schrift: ["Power Grotesk", "Power Grotesk"],
    leitidee: "Ankommen beginnt mit Zuhören." },
  { id: "gestalter", name: "Der Gestalter", intern: "Creator", satz: "Du zeigst, was aus einem Raum werden kann.", regler: [65, 50, 60, 85, 55], achse: "Moderne",
    saeulen: { markt: 15, wissen: 20, meinung: 20, persoenlich: 20, beweise: 25 },
    formate: ["walkthrough", "carousel", "behind"], kanaele: ["instagram", "tiktok"],
    ton: ["visuell, knapp, konkret", "Vorher und Nachher", "Materialien benennen"],
    palette: ["#0B0A09", "#D1D3D5", "#FFAA09"], schrift: ["Power Grotesk", "JetBrains Mono"],
    leitidee: "Raum ist, was man daraus macht." },
  { id: "entdecker", name: "Der Entdecker", intern: "Explorer", satz: "Du kennst jedes Grätzl, bevor es alle kennen.", regler: [70, 60, 80, 70, 65], achse: "Moderne",
    saeulen: { markt: 25, wissen: 15, meinung: 20, persoenlich: 25, beweise: 15 },
    formate: ["spaziergang", "talking", "qa"], kanaele: ["instagram", "tiktok", "youtube"],
    ton: ["neugierig, schnell, lokal", "Straßennamen statt Bezirke", "Fragen an die Community"],
    palette: ["#F7F5F1", "#21402C", "#E69600"], schrift: ["Power Grotesk", "Power Grotesk"],
    leitidee: "Wien, Straße für Straße." },
  { id: "fels", name: "Der Fels", intern: "Ruler", satz: "Bei dir ist der Verkauf eine Entscheidung, kein Risiko.", regler: [15, 20, 30, 30, 75], achse: "Autorität",
    saeulen: { markt: 30, wissen: 20, meinung: 25, persoenlich: 10, beweise: 15 },
    formate: ["talking", "carousel", "qa"], kanaele: ["linkedin", "instagram"],
    ton: ["klar, entschieden, knapp", "Standpunkte mit Begründung", "keine Weichmacher"],
    palette: ["#0B0A09", "#F7F5F1", "#7E3E22"], schrift: ["Power Grotesk", "JetBrains Mono"],
    leitidee: "Sicher bis zum Notar." },
  { id: "gastgeber", name: "Der Gastgeber", intern: "Everyman", satz: "Bei dir fühlt sich jeder willkommen, vom ersten Kaffee an.", regler: [45, 80, 65, 50, 35], achse: "Nähe",
    saeulen: { markt: 15, wissen: 15, meinung: 10, persoenlich: 35, beweise: 25 },
    formate: ["behind", "talking", "spaziergang"], kanaele: ["instagram", "facebook", "tiktok"],
    ton: ["locker, herzlich, direkt", "Alltag zeigen", "Menschen vor Objekten"],
    palette: ["#F7F5F1", "#1B1A16", "#5E7A8E"], schrift: ["Power Grotesk", "Power Grotesk"],
    leitidee: "Immobilien sind Menschen mit Adresse." },
];

const HM_SAEULEN = {
  markt: { name: "Markt und Grätzl", was: "Preise, Nachfrage, Entwicklungen in deinen Bezirken" },
  wissen: { name: "Prozess und Wissen", was: "Wie Verkauf, Kauf, Finanzierung und Übergabe wirklich laufen" },
  meinung: { name: "Meinung", was: "Deine Haltung zu Markt, Politik, Mythen der Branche" },
  persoenlich: { name: "Persönlich", was: "Dein Alltag, deine Herkunft, dein Grätzl, dein Team" },
  beweise: { name: "Beweise", was: "Abschlüsse, Kundenstimmen, Vorher und Nachher, Objekte" },
};

const HM_FORMATE = {
  talking: { name: "Talking Head", was: "Du sprichst 30 bis 60 Sekunden direkt in die Kamera", dauer: "30 bis 60 s" },
  spaziergang: { name: "Grätzl-Spaziergang", was: "Du gehst durch dein Viertel und erzählst", dauer: "45 bis 90 s" },
  walkthrough: { name: "Objekt-Walkthrough", was: "Rundgang durch ein Objekt, dein Kommentar", dauer: "30 bis 60 s" },
  carousel: { name: "Markt-Carousel", was: "6 bis 8 Kacheln mit Zahlen, Checkliste, Vergleich", dauer: "Grafik" },
  qa: { name: "Frage und Antwort", was: "Eine Kundenfrage, eine klare Antwort", dauer: "20 bis 40 s" },
  behind: { name: "Behind the scenes", was: "Besichtigung, Übergabe, Büro, Team", dauer: "15 bis 45 s" },
};

const HM_KANAELE = {
  instagram: { name: "Instagram", rhythmus: "3 bis 4 Posts pro Woche, tägliche Stories" },
  linkedin: { name: "LinkedIn", rhythmus: "2 bis 3 Posts pro Woche" },
  tiktok: { name: "TikTok", rhythmus: "Zweitverwertung der Reels, 2 bis 3 pro Woche" },
  facebook: { name: "Facebook", rhythmus: "Spiegel von Instagram" },
  youtube: { name: "YouTube Shorts", rhythmus: "Zweitverwertung, 2 pro Woche" },
};

const HM_GRUENDE = ["Empfehlung von Bekannten", "Persönlicher Eindruck beim Erstgespräch", "Preis-Einschätzung war realistisch", "Kennt den Bezirk", "Schnelle Rückmeldung", "Klare Erklärung des Ablaufs", "Diskretion", "Netzwerk an Käufern", "Professionelle Fotos und Exposé", "Sympathie"];
const HM_HINDERNISSE = ["Provision", "Bindungsdauer", "Zweifel am Preis", "Schlechte Erfahrung mit Maklern", "Wollten selbst verkaufen", "Anderer Makler war schon im Gespräch"];
const HM_AUSLOESER = ["Erbe", "Trennung", "Familie wächst", "Kinder ziehen aus", "Investment", "Umzug aus beruflichen Gründen", "Verkleinern im Alter"];
const HM_LEBENSPHASEN = ["Erste Wohnung", "Familiengründung", "Zweiter Aufbruch (50 plus)", "Investoren", "Erben", "Unternehmer"];
const HM_GEFUEHLE = ["Sicher", "Verstanden", "Entlastet", "Gut beraten", "Stolz", "Zuhause", "Klüger", "Begleitet"];
const HM_TABUS = ["Politik", "Luxus zeigen", "Familie zeigen", "Preise nennen", "Kunden erkennbar zeigen", "Konkurrenz kommentieren"];
const HM_ZIELE = ["Mehr Abgeber-Anfragen", "Käufer-Community aufbauen", "Bekannt im Bezirk werden", "Team aufbauen", "Investoren erreichen"];
const HM_ZEIT = ["Bis 2 Stunden", "2 bis 4 Stunden", "4 bis 8 Stunden", "Mehr als 8 Stunden"];
const HM_BESTAND = ["Logo", "Farben", "Website", "Instagram", "LinkedIn", "Facebook", "TikTok", "YouTube", "Professionelle Fotos"];
const HM_ASSETS = ["Eine Farbe", "Ein Ort", "Ein Satz", "Ein Gegenstand", "Eine Geste", "Ein Kleidungsstück"];
const HM_BEZIRKE = ["1010 Innere Stadt", "1020 Leopoldstadt", "1030 Landstraße", "1040 Wieden", "1050 Margareten", "1060 Mariahilf", "1070 Neubau", "1080 Josefstadt", "1090 Alsergrund", "1100 Favoriten", "1120 Meidling", "1130 Hietzing", "1140 Penzing", "1150 Rudolfsheim", "1160 Ottakring", "1170 Hernals", "1180 Währing", "1190 Döbling", "1200 Brigittenau", "1210 Floridsdorf", "1220 Donaustadt", "1230 Liesing", "Umland Süd", "Umland Nord"];

/* Fragebogen: fünf Kapitel, ein Screen pro Frage.
   typ: auswahl | mehrfach | slider | karten | text | bezirke | sortieren | zahl | skala */
const HM_KAPITEL = [
  { id: "weg", name: "Dein Weg", intro: "Wo du herkommst und warum Kunden dich wählen.", fragen: [
    { id: "seit", typ: "auswahl", frage: "Seit wann bist du Makler?", optionen: ["Unter 2 Jahren", "2 bis 5 Jahre", "5 bis 10 Jahre", "Über 10 Jahre"] },
    { id: "herkunft", typ: "auswahl", frage: "Wie bist du dazu gekommen?", optionen: ["Aus der Familie", "Quereinstieg aus dem Verkauf", "Aus Bau oder Architektur", "Aus Finanz oder Recht", "Über ein eigenes Investment", "Anders"] },
    { id: "abschluesse", typ: "auswahl", frage: "Deine letzten Abschlüsse: was war das meistens?", optionen: ["Eigentumswohnungen Altbau", "Eigentumswohnungen Neubau", "Häuser", "Zinshäuser und Investment", "Vermietung", "Gemischt"] },
    { id: "gruende", typ: "mehrfach", frage: "Warum haben diese Kunden dich gewählt?", hilfe: "Bis zu drei.", max: 3, optionen: HM_GRUENDE },
    { id: "hindernis", typ: "mehrfach", frage: "Was hätte sie fast abgehalten?", max: 2, optionen: HM_HINDERNISSE },
    { id: "ausloeser", typ: "mehrfach", frage: "Womit kommen Kunden zu dir, bevor sie an Verkauf denken?", max: 3, optionen: HM_AUSLOESER },
  ]},
  { id: "menschen", name: "Deine Menschen", intro: "Für wen du arbeitest, als Bild statt als Zielgruppe.", fragen: [
    { id: "milieus", typ: "karten", frage: "Welche zwei Wohnwelten sind deine Kunden?", hilfe: "Tippe zwei Karten.", max: 2, karten: "milieus" },
    { id: "phasen", typ: "mehrfach", frage: "In welcher Lebensphase sind sie meistens?", max: 3, optionen: HM_LEBENSPHASEN },
    { id: "bezirke", typ: "bezirke", frage: "Deine Bezirke und Grätzl", hilfe: "Wo du wirklich unterwegs bist, nicht wo du gern wärst." },
    { id: "seite", typ: "slider", frage: "Eigentümer oder Käufer?", links: "Eigentümer", rechts: "Käufer" },
    { id: "gefuehl", typ: "mehrfach", frage: "Wie soll sich ein Kunde fühlen, nachdem er mit dir gearbeitet hat?", max: 2, optionen: HM_GEFUEHLE },
  ]},
  { id: "art", name: "Deine Art", intro: "Fünf Regler und ein Bild. Es gibt kein richtig.", fragen: [
    { id: "s1", typ: "slider", frage: "Aufrichtig oder aufregend?", links: "Aufrichtig", rechts: "Aufregend" },
    { id: "s2", typ: "slider", frage: "Kompetent oder nahbar?", links: "Kompetent", rechts: "Nahbar" },
    { id: "s3", typ: "slider", frage: "Ruhig oder energisch?", links: "Ruhig", rechts: "Energisch" },
    { id: "s4", typ: "slider", frage: "Klassisch oder modern?", links: "Klassisch", rechts: "Modern" },
    { id: "s5", typ: "slider", frage: "Zurückhaltend oder meinungsstark?", links: "Zurückhaltend", rechts: "Meinungsstark" },
    { id: "archetyp", typ: "karten", frage: "Welche Figur bist du am ehesten?", hilfe: "Eine Karte.", max: 1, karten: "archetypen" },
    { id: "worte", typ: "text", frage: "Drei Wörter, die Freunde über dich sagen würden", platzhalter: "zum Beispiel: direkt, geduldig, neugierig" },
    { id: "tabus", typ: "mehrfach", frage: "Was würdest du nie zeigen oder sagen?", max: 3, optionen: HM_TABUS },
    { id: "anrede", typ: "auswahl", frage: "Mit Kunden: Du oder Sie?", optionen: ["Du", "Sie", "Kommt drauf an"] },
  ]},
  { id: "marke", name: "Deine Marke heute", intro: "Was schon da ist und was dich wiedererkennbar macht.", fragen: [
    { id: "bestand", typ: "mehrfach", frage: "Was existiert schon?", max: 9, optionen: HM_BESTAND },
    { id: "follower", typ: "auswahl", frage: "Wie viele Menschen folgen dir heute auf deinem stärksten Kanal?", optionen: ["Unter 500", "500 bis 2.000", "2.000 bis 10.000", "Über 10.000"] },
    { id: "behalten", typ: "auswahl", frage: "Willst du dein bestehendes Erscheinungsbild behalten?", optionen: ["Behalten und schärfen", "Neu aufsetzen", "Ich habe keines"] },
    { id: "assets", typ: "mehrfach", frage: "Was könnte dein wiedererkennbares Zeichen werden?", hilfe: "Bis zu zwei.", max: 2, optionen: HM_ASSETS },
    { id: "vorbilder", typ: "text", frage: "Ein Account, der dir gefällt, und warum", platzhalter: "@name, weil ..." },
  ]},
  { id: "rhythmus", name: "Dein Rhythmus", intro: "Was machbar ist und wohin es gehen soll.", fragen: [
    { id: "kamera", typ: "skala", frage: "Wie wohl fühlst du dich vor der Kamera?", von: "Gar nicht", bis: "Sehr" },
    { id: "zeit", typ: "auswahl", frage: "Wie viel Zeit pro Monat kannst du für Content geben?", optionen: HM_ZEIT },
    { id: "formate", typ: "karten", frage: "Welche Formate kannst du dir vorstellen?", hilfe: "So viele du willst.", max: 6, karten: "formate" },
    { id: "kanaele", typ: "sortieren", frage: "Deine Kanäle nach Wichtigkeit", hilfe: "Oben ist wichtig.", optionen: ["instagram", "linkedin", "tiktok", "facebook", "youtube"] },
    { id: "ziel", typ: "auswahl", frage: "Dein Ziel in zwölf Monaten", optionen: HM_ZIELE },
    { id: "verfuegbar", typ: "mehrfach", frage: "Wann passen dir Drehtage?", max: 4, optionen: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Vormittag", "Nachmittag"] },
  ]},
];

const HM_FRAGEN_GESAMT = HM_KAPITEL.reduce((n, k) => n + k.fragen.length, 0);

/* Strategie-Generator: zwei Wege aus den Antworten. Rein regelbasiert (Prototyp). */
function hmArchetypScores(a) {
  const regler = ["s1", "s2", "s3", "s4", "s5"].map((k) => (a[k] == null ? 50 : a[k]));
  return HM_ARCHETYPEN.map((t) => {
    const dist = Math.sqrt(t.regler.reduce((s, v, i) => s + Math.pow(v - regler[i], 2), 0));
    let score = 100 - dist / 2.2;
    if (a.archetyp && a.archetyp[0] === t.id) score += 18;
    const m = a.milieus || [];
    if (t.achse === "Autorität" && (m.includes("kons") || m.includes("perf") || m.includes("fels"))) score += 6;
    if (t.achse === "Nähe" && (m.includes("mitte") || m.includes("nost") || m.includes("post"))) score += 6;
    if (t.achse === "Moderne" && (m.includes("exp") || m.includes("neo") || m.includes("perf"))) score += 6;
    if (a.ziel === "Investoren erreichen" && t.achse === "Autorität") score += 5;
    if (a.ziel === "Bekannt im Bezirk werden" && (t.id === "entdecker" || t.id === "gastgeber")) score += 5;
    if ((a.kamera || 3) <= 2 && t.formate[0] === "talking") score -= 6;
    return { t, score: Math.round(score) };
  }).sort((x, y) => y.score - x.score);
}

function hmWeg(t, a, rolle, gegen) {
  const milieus = (a.milieus || []).map((id) => HM_MILIEUS.find((m) => m.id === id)).filter(Boolean);
  const bez = (a.bezirke || []).slice(0, 3);
  const bezText = bez.length ? bez.map((b) => b.replace(/^\d{4}\s/, "")).join(", ") : "deinen Bezirken";
  const seite = a.seite == null ? 50 : a.seite;
  const fokus = seite < 40 ? "Eigentümer" : seite > 60 ? "Käufer" : "Eigentümer und Käufer";
  const ziel = a.ziel || "Mehr Abgeber-Anfragen";
  const erlaubteFormate = (a.formate && a.formate.length) ? a.formate : Object.keys(HM_FORMATE);
  const formate = t.formate.filter((f) => erlaubteFormate.includes(f));
  while (formate.length < 3) { const n = erlaubteFormate.find((f) => !formate.includes(f)); if (!n) break; formate.push(n); }
  const kanalReihe = (a.kanaele && a.kanaele.length) ? a.kanaele : ["instagram", "linkedin"];
  const kanaele = [...new Set([...t.kanaele.filter((k) => kanalReihe.slice(0, 3).includes(k)), kanalReihe[0]])].slice(0, 3);
  const grund = (a.gruende || [])[0] || "Vertrauen";
  const ausl = (a.ausloeser || [])[0];
  const tabus = a.tabus || [];
  const anrede = a.anrede === "Sie" ? "Sie" : "Du";
  const zeit = a.zeit || HM_ZEIT[1];
  const hooks = {
    kenner: [`Was eine Wohnung in ${bezText} 2026 wirklich wert ist.`, "Drei Zahlen, die jeder Verkäufer kennen sollte.", "Der häufigste Preisfehler in Wien.", "Warum das erste Angebot selten das beste ist.", `So liest du das Grundbuch in ${bezText}.`],
    begleiter: [`${ausl ? ausl + ": " : ""}Was jetzt wirklich zählt.`, "Der Moment, in dem meine Kunden aufatmen.", "Was ich beim ersten Kaffee immer frage.", "Verkaufen ist Abschied. Und ein Anfang.", "Drei Dinge, die ich jedem Erben sage."],
    gestalter: ["Diese Wohnung sah vor sechs Wochen anders aus.", `Was in ${bezText} unter dem Teppich liegt.`, "Ein Grundriss, zwei Leben.", "Warum Licht mehr wert ist als Quadratmeter.", "Vorher, nachher, verkauft."],
    entdecker: [`Die Straße in ${bezText}, die niemand kennt.`, "Hier wohnt Wien in fünf Jahren.", `Mein Lieblingsplatz in ${bezText}, und was er kostet.`, "Grätzl-Check in 60 Sekunden.", "Wo der Bäcker den Preis macht."],
    fels: ["Meine Meinung: Der Preis ist nie das Problem.", "Was ich Verkäufern nicht verspreche.", "Drei Sätze, die einen Deal retten.", "Warum ich Besichtigungstourismus ablehne.", `Klartext zum Markt in ${bezText}.`],
    gastgeber: ["Kommt rein, so läuft eine Übergabe bei uns.", "Mein Team, mein Grätzl, mein Montag.", "Die Frage, die jeder Käufer stellt.", `Ein Vormittag in ${bezText}.`, "Warum bei uns immer Kaffee steht."],
  }[t.id];
  const satz = {
    kenner: `Für ${fokus} in ${bezText}, die den Markt verstehen wollen, bevor sie entscheiden, bin ich der Makler, der Zahlen erklärt statt Versprechen zu machen.`,
    begleiter: `Für ${fokus} in ${bezText}, die in einer Lebensphase verkaufen oder kaufen, in der mehr zählt als der Preis, bin ich die Maklerin oder der Makler, der zuhört, bevor er handelt.`,
    gestalter: `Für ${fokus} in ${bezText}, die sehen wollen, was ein Raum werden kann, bin ich der Makler, der Immobilien inszeniert statt inseriert.`,
    entdecker: `Für ${fokus}, die ${bezText} lieben oder entdecken wollen, bin ich der Makler, der jede Straße kennt und jede Entwicklung zuerst sieht.`,
    fels: `Für ${fokus} in ${bezText}, die eine sichere Entscheidung wollen, bin ich der Makler, der Klartext spricht und den Verkauf bis zum Notar führt.`,
    gastgeber: `Für ${fokus} in ${bezText}, die einen Makler zum Anfassen wollen, bin ich der, bei dem man sich vom ersten Gespräch an willkommen fühlt.`,
  }[t.id];
  const story = [
    { beat: "Herkunft", text: a.herkunft ? `${a.herkunft}. Seit ${(a.seit || "einigen Jahren").toLowerCase()} im Geschäft.` : "Dein Weg in die Branche, in einem Satz." },
    { beat: "Reibung", text: `Kunden zögern wegen ${((a.hindernis || [])[0] || "schlechter Erfahrungen").toLowerCase()}. Die Branche hat das verdient.` },
    { beat: "Wendepunkt", text: `Der Moment, in dem du gemerkt hast: ${grund} entscheidet, nicht das Inserat.` },
    { beat: "Haltung", text: t.leitidee },
    { beat: "Beweis", text: `${a.abschluesse || "Deine Abschlüsse"} in ${bezText}. Zahlen folgen aus deinem Bestand.` },
    { beat: "Menschen", text: milieus.length ? milieus.map((m) => m.titel).join(" und ") + "." : "Deine zwei Wohnwelten." },
    { beat: "Versprechen", text: `${(a.gefuehl || ["Sicher"]).join(" und ")}: so fühlen sich deine Kunden nach dem Abschluss.` },
    { beat: "Signatur", text: (a.assets || []).length ? `Dein Zeichen: ${a.assets.map((x) => x.toLowerCase()).join(", ")}.` : "Ein wiederkehrendes Zeichen, das wir gemeinsam festlegen." },
  ];
  const passt = [];
  const fordert = [];
  const pick = a.archetyp && a.archetyp[0];
  if (pick === t.id) passt.push("Du hast diese Figur selbst gewählt."); else if (pick) fordert.push(`Du hast ${HM_ARCHETYPEN.find((x) => x.id === pick).name} gewählt, dieser Weg geht einen Schritt weiter.`);
  if (t.achse === "Autorität") { if ((a.s2 ?? 50) < 45) passt.push("Dein Regler steht auf kompetent."); else fordert.push("Dein Regler steht auf nahbar, dieser Weg verlangt mehr Zahlen und Haltung."); }
  if (t.achse === "Nähe") { if ((a.s2 ?? 50) > 55) passt.push("Dein Regler steht auf nahbar."); else fordert.push("Du zeigst dich mehr als bisher, auch privat."); }
  if (t.achse === "Moderne") { if ((a.s4 ?? 50) > 55) passt.push("Dein Regler steht auf modern."); else fordert.push("Visuell mutiger als dein bisheriger Auftritt."); }
  if ((a.kamera || 3) >= 4 && formate.includes("talking")) passt.push("Du fühlst dich vor der Kamera wohl, Talking Heads tragen den Weg.");
  if ((a.kamera || 3) <= 2 && formate.includes("talking")) fordert.push("Talking Heads brauchen Übung, die ersten zwei Drehtage sind Training.");
  if (milieus.some((m) => (t.achse === "Autorität" && ["kons", "perf"].includes(m.id)) || (t.achse === "Nähe" && ["mitte", "nost", "post"].includes(m.id)) || (t.achse === "Moderne" && ["exp", "neo", "perf"].includes(m.id)))) passt.push("Passt zu den Wohnwelten deiner Kunden.");
  if (tabus.includes("Familie zeigen") && t.saeulen.persoenlich >= 30) fordert.push("Die Säule Persönlich ist groß, Familie bleibt trotzdem außen vor: Alltag und Grätzl statt Privates.");
  if (gegen) fordert.push(`Setzt sich bewusst gegen ${gegen.name} ab: ${t.achse} statt ${gegen.achse}.`);
  if (!passt.length) passt.push("Passt zu deinem Ziel: " + ziel.toLowerCase() + ".");
  const frequenz = zeit === HM_ZEIT[0] ? "3 Posts pro Woche, ein Drehtag pro Monat" : zeit === HM_ZEIT[3] ? "5 Posts pro Woche, zwei Drehtage pro Monat" : "3 bis 4 Posts pro Woche, ein Drehtag pro Monat";
  const bio = `${t.name.replace("Der ", "")} für ${fokus.toLowerCase()} in ${bezText}. ${t.leitidee} ${anrede === "Du" ? "Schreib mir." : "Schreiben Sie mir."}`;
  return {
    rolle, archetyp: t, satz, story, milieus, saeulen: t.saeulen, formate, kanaele, frequenz, ton: t.ton, palette: t.palette, schrift: t.schrift,
    leitidee: t.leitidee, hooks, bio, passt, fordert, ziel, fokus, bezirke: bez, anrede,
    assets: a.assets || [], tabus,
  };
}

function hmZweiWege(a) {
  const scores = hmArchetypScores(a);
  const A = scores[0].t;
  /* Weg B: bester Kandidat auf einer anderen Achse, damit die Wahl echt ist */
  const B = (scores.slice(1).find((s) => s.t.achse !== A.achse) || scores[1]).t;
  return {
    scores: scores.map((s) => ({ id: s.t.id, name: s.t.name, score: s.score })),
    a: hmWeg(A, a, "Verstärken", null),
    b: hmWeg(B, a, "Dehnen", A),
  };
}

Object.assign(window, { HM_ETAPPEN, HM_MILIEUS, HM_ARCHETYPEN, HM_SAEULEN, HM_FORMATE, HM_KANAELE, HM_KAPITEL, HM_FRAGEN_GESAMT, HM_BEZIRKE, HM_ZEIT, hmZweiWege, hmArchetypScores });
