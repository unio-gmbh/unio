/* UNIO HUMAN. Etappe 4 bis Zyklus: Aufbau, Inhalte (Ideen, Drehplan, Freigaben, Bibliothek),
   Kalender, Aufträge und Shop, Report und Review, Nachrichten; Team: Produktion, Kalender,
   Tickets, Empfehlungs-Engine, Einstellungen. Plus Seed für diese Sammlungen. */

const HM_HEUTE = "2026-09-23";
const hmISO = (y, m, d) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const hmTage = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5);
const hmMonatName = (iso) => new Date(iso).toLocaleDateString("de-AT", { month: "long", year: "numeric" });

/* ---------- Katalog, Regeln ---------- */
const HM_ABOS = [
  { id: "pb", name: "Personal Brand", preis: 599, kontingent: { videos: 3, fotos: 10, grafiken: 7 }, drehtage: 1, note: "monatlich kündbar" },
  { id: "pbp", name: "Personal Brand Premium", preis: 1190, kontingent: { videos: 5, fotos: 15, grafiken: 7 }, drehtage: 1, note: "ab 6 Monaten, Vor-Ort-Session monatlich, Ads-Betreuung" },
];
const HM_KATALOG = [
  { id: "ai-reel", art: "standard", name: "AI-Immobilienreel", preis: 99, was: "Aus Objektfotos, ohne Drehtag, in 24 Stunden", team: false, kontingent: "videos" },
  { id: "carousel", art: "standard", name: "Markt-Carousel", preis: 0, was: "Aus Vorlage und LENS-Daten, aus dem Kontingent", team: false, kontingent: "grafiken" },
  { id: "story-set", art: "standard", name: "Story-Set (5 Stück)", preis: 0, was: "Aus Vorlage, Brand-Profil und Objekt", team: false, kontingent: "grafiken" },
  { id: "walkthrough", art: "standard", name: "Objekt-Walkthrough", preis: 149, was: "Am nächsten Drehtag, 30 bis 60 Sekunden", team: true, kontingent: "videos" },
  { id: "drohne", art: "standard", name: "Drohnenvideo", preis: 349, was: "Eigener Termin, wetterabhängig", team: true },
  { id: "visitenkarte", art: "print", name: "Visitenkarten 250 Stück", preis: 59, was: "Aus dem Brand-Profil, druckfertig in Minuten", team: false },
  { id: "faltmappe", art: "print", name: "Faltmappe 100 Stück", preis: 349, was: "UNIO-Vorlage, dein Branding", team: false },
  { id: "plakat", art: "print", name: "Objekt-Plakat A1", preis: 89, was: "Aus Objekt und Brand-Profil", team: false },
  { id: "sonder", art: "sonder", name: "Sonderformat", preis: null, was: "Beschreib, was du brauchst. Wir schlagen das nächstliegende Standardformat vor.", team: true },
];
const HM_STUFEN = ["Briefing", "Termin", "Produktion", "Ergebnis", "Fertig"];
const HM_REGELN = [
  { id: "sammel", name: "Sammel-Drehtag", param: "gleiche Region, Fenster 10 Tage", ersparnis: 1.5, einheit: "h pro Termin", was: "Zwei oder mehr Drehtage in derselben Region innerhalb von 10 Tagen zusammenlegen." },
  { id: "location", name: "Geteilte Location", param: "Format Studio oder Büro im selben Monat", ersparnis: 120, einheit: "€ pro Monat", was: "Ein Studiotag für mehrere Makler." },
  { id: "standard", name: "Standard statt Sonder", param: "Ähnlichkeit zu Katalogformat", ersparnis: 1.5, einheit: "h pro Auftrag", was: "Sonderwunsch ähnelt einem Katalogformat: Standard anbieten." },
  { id: "vorprod", name: "Vorproduktion", param: "40 % Kontingent ungenutzt am 20.", ersparnis: 1, einheit: "Drehtag", was: "Evergreen-Inhalte am nächsten Drehtag vorproduzieren." },
  { id: "batch", name: "Schnitt-Batch", param: "mehr als 5 Rohschnitte offen", ersparnis: 0.5, einheit: "h pro Schnitt", was: "Gleiche Vorlage, ein Durchgang." },
  { id: "latenz", name: "Freigabe-Latenz", param: "Median über 4 Tage", ersparnis: 2, einheit: "Tage pro Post", was: "Erinnerungsrhythmus anpassen, Auto-Freigabe erklären." },
  { id: "gesicht", name: "Gesichts-Quote", param: "unter 50 % der Posts", ersparnis: null, einheit: "Wirkung", was: "Fotos mit Gesicht: plus 38 % Likes (Bakhshi et al.)." },
  { id: "zweit", name: "Zweitverwertung", param: "Reel nur auf einem Kanal", ersparnis: null, einheit: "Reichweite", was: "Freigegebene Reels auch für TikTok, Shorts, Facebook planen." },
];
const HM_FARBWELTEN = [
  { id: "ink", name: "Tinte", p: ["#0B0A09", "#F7F5F1", "#FFAA09"] },
  { id: "papier", name: "Papier", p: ["#F7F5F1", "#1B1A16", "#B4633C"] },
  { id: "stahl", name: "Stahl", p: ["#2C4250", "#ECEDEB", "#FFAA09"] },
  { id: "gruen", name: "Grün", p: ["#21402C", "#F0EDE6", "#E69600"] },
  { id: "terra", name: "Terra", p: ["#7E3E22", "#F7F5F1", "#FFAA09"] },
];

/* ---------- Seed für Etappe 4 bis Zyklus ---------- */
function hmSeedMore() {
  const drehtage = [
    { id: "d1", datum: hmISO(2026, 9, 11), region: "Döbling", location: "Büro Markus Leitner, 1190", slots: [{ maklerId: "markus", von: "09:00", bis: "12:00" }], status: "fertig", plan: [] },
    { id: "d2", datum: hmISO(2026, 9, 29), region: "Favoriten", location: "Reumannplatz und Objekt Laxenburger Straße", slots: [{ maklerId: "elif", von: "13:00", bis: "16:00" }], status: "geplant",
      plan: [
        { shot: "Talking Head: Hook 01", format: "talking", hook: "Kommt rein, so läuft eine Übergabe bei uns.", dauer: "45 s", ort: "Objekt, Wohnzimmer", done: false },
        { shot: "Grätzl-Spaziergang Reumannplatz", format: "spaziergang", hook: "Ein Vormittag in Favoriten.", dauer: "90 s", ort: "Reumannplatz", done: false },
        { shot: "Behind the scenes: Schlüsselübergabe", format: "behind", hook: "Der Moment, in dem alle lachen.", dauer: "20 s", ort: "Objekt, Eingang", done: false },
        { shot: "Portraits 10 Stück", format: "foto", hook: "", dauer: "20 min", ort: "Innenhof", done: false },
        { shot: "Talking Head: Frage und Antwort", format: "qa", hook: "Die Frage, die jeder Käufer stellt.", dauer: "30 s", ort: "Objekt, Küche", done: false },
      ] },
    { id: "d3", datum: hmISO(2026, 10, 6), region: "Döbling", location: "Objekt Sieveringer Straße, 1190", slots: [{ maklerId: "markus", von: "09:00", bis: "12:00" }], status: "geplant",
      plan: [
        { shot: "Talking Head: Marktzahlen Döbling Q3", format: "talking", hook: "Was eine Wohnung in Döbling 2026 wirklich wert ist.", dauer: "60 s", ort: "Büro", done: false },
        { shot: "Frage und Antwort: erstes Angebot", format: "qa", hook: "Warum das erste Angebot selten das beste ist.", dauer: "40 s", ort: "Büro", done: false },
        { shot: "Objekt-Walkthrough Sieveringer", format: "walkthrough", hook: "Zinshaus, Baujahr 1902, drei Zahlen.", dauer: "60 s", ort: "Objekt", done: false },
      ] },
    { id: "d4", datum: hmISO(2026, 10, 9), region: "Neubau", location: "offen", slots: [{ maklerId: "sara", von: "10:00", bis: "13:00" }], status: "vorschlag", plan: [] },
    { id: "d5", datum: hmISO(2026, 10, 8), region: "Döbling", location: "offen", slots: [{ maklerId: "sara", von: "14:00", bis: "17:00" }], status: "vorschlag", plan: [] },
  ];
  const ideen = [];
  const mk = (maklerId, monat, list) => list.forEach(([saeule, format, hook, zustand], i) => ideen.push({ id: `${maklerId}-i${monat}-${i}`, maklerId, monat, saeule, format, hook, zustand }));
  mk("markus", "2026-10", [["markt", "carousel", "Döbling in fünf Zahlen: was sich seit Jänner geändert hat", "vorgeschlagen"], ["wissen", "talking", "Warum das erste Angebot selten das beste ist", "gewaehlt"], ["meinung", "talking", "Besichtigungstourismus bringt keinen Euro", "vorgeschlagen"], ["beweise", "walkthrough", "Zinshaus Sieveringer Straße: Baujahr 1902, drei Zahlen", "gewaehlt"], ["persoenlich", "behind", "Mein Dienstag beginnt im Grundbuch", "vorgeschlagen"], ["markt", "carousel", "Erbschaft in Döbling: die drei häufigsten Fehler", "vorgeschlagen"], ["wissen", "qa", "Was kostet mich ein Makler wirklich", "verworfen"], ["meinung", "carousel", "Fünf Mythen über den Wiener Zinshausmarkt", "vorgeschlagen"]]);
  mk("elif", "2026-10", [["persoenlich", "spaziergang", "Ein Vormittag in Favoriten, vom Reumannplatz bis zum Objekt", "gewaehlt"], ["wissen", "qa", "Die Frage, die jeder Erstkäufer stellt", "gewaehlt"], ["markt", "carousel", "Neubau in Favoriten: drei Projekte, drei Preise", "vorgeschlagen"], ["beweise", "behind", "Schlüsselübergabe bei Familie K.", "gewaehlt"], ["persoenlich", "talking", "Warum ich Quereinsteigerin bin und das gut ist", "vorgeschlagen"], ["wissen", "carousel", "Finanzierung in fünf Schritten", "vorgeschlagen"], ["meinung", "talking", "Luxus interessiert mich nicht, Zuhause schon", "vorgeschlagen"]]);
  const posts = [
    { id: "p1", maklerId: "markus", kanal: "linkedin", format: "carousel", titel: "Döbling Q3: Preise, Nachfrage, Angebot", termin: hmISO(2026, 9, 16), zustand: "veroffentlicht", kz: { reach: 4820, saves: 61, sends: 22, likes: 143 }, gesicht: false },
    { id: "p2", maklerId: "markus", kanal: "instagram", format: "talking", titel: "Der häufigste Preisfehler in Wien", termin: hmISO(2026, 9, 19), zustand: "veroffentlicht", kz: { reach: 7210, saves: 38, sends: 51, likes: 210 }, gesicht: true },
    { id: "p3", maklerId: "markus", kanal: "instagram", format: "talking", titel: "Reel 1: Warum das erste Angebot selten das beste ist", termin: hmISO(2026, 9, 26), zustand: "freigabe", frist: hmISO(2026, 9, 27), korrekturen: 0, gesicht: true, asset: "a3" },
    { id: "p4", maklerId: "markus", kanal: "instagram", format: "carousel", titel: "Drei Zahlen, die jeder Verkäufer kennen sollte", termin: hmISO(2026, 9, 30), zustand: "geplant", gesicht: false },
    { id: "p5", maklerId: "markus", kanal: "linkedin", format: "talking", titel: "Reel 2: So lesen Sie das Grundbuch", termin: hmISO(2026, 10, 2), zustand: "im_schnitt", gesicht: true },
    { id: "p6", maklerId: "elif", kanal: "instagram", format: "spaziergang", titel: "Grätzl-Check Favoriten in 60 Sekunden", termin: hmISO(2026, 9, 9), zustand: "veroffentlicht", kz: { reach: 12400, saves: 88, sends: 190, likes: 640 }, gesicht: true },
    { id: "p7", maklerId: "elif", kanal: "tiktok", format: "spaziergang", titel: "Grätzl-Check Favoriten (Zweitverwertung)", termin: hmISO(2026, 9, 10), zustand: "veroffentlicht", kz: { reach: 21800, saves: 40, sends: 310, likes: 1120 }, gesicht: true },
    { id: "p8", maklerId: "elif", kanal: "instagram", format: "behind", titel: "Schlüsselübergabe bei Familie K.", termin: hmISO(2026, 9, 17), zustand: "veroffentlicht", kz: { reach: 6300, saves: 12, sends: 44, likes: 380 }, gesicht: true },
    { id: "p9", maklerId: "elif", kanal: "instagram", format: "carousel", titel: "Finanzierung in fünf Schritten", termin: hmISO(2026, 9, 24), zustand: "freigabe", frist: hmISO(2026, 9, 25), korrekturen: 1, gesicht: false, asset: "a7" },
    { id: "p10", maklerId: "elif", kanal: "instagram", format: "talking", titel: "Die Frage, die jeder Erstkäufer stellt", termin: hmISO(2026, 10, 1), zustand: "geplant", gesicht: true },
    { id: "p11", maklerId: "elif", kanal: "instagram", format: "qa", titel: "Was kostet ein Makler wirklich", termin: hmISO(2026, 8, 27), zustand: "veroffentlicht", kz: { reach: 5100, saves: 140, sends: 60, likes: 300 }, gesicht: true },
  ];
  const assets = [
    { id: "a1", maklerId: "markus", typ: "Foto", name: "Portraits Drehtag 11.09. (15 Stück)", version: 1, quelle: "d1", zustand: "freigegeben" },
    { id: "a2", maklerId: "markus", typ: "Video", name: "Rohmaterial Drehtag 11.09.", version: 1, quelle: "d1", zustand: "roh" },
    { id: "a3", maklerId: "markus", typ: "Video", name: "Reel 1, Schnitt v1, 9:16 mit Untertiteln", version: 1, quelle: "d1", zustand: "freigabe" },
    { id: "a4", maklerId: "markus", typ: "Grafik", name: "Carousel Döbling Q3 (8 Kacheln)", version: 2, quelle: "Vorlage", zustand: "freigegeben" },
    { id: "a5", maklerId: "markus", typ: "Logo", name: "Wortmarke Leitner Immobilien, SVG-Set", version: 1, quelle: "Branding", zustand: "freigegeben" },
    { id: "a6", maklerId: "elif", typ: "Video", name: "Grätzl-Check Favoriten, 9:16 und 1:1", version: 2, quelle: "Drehtag 04.09.", zustand: "freigegeben" },
    { id: "a7", maklerId: "elif", typ: "Grafik", name: "Carousel Finanzierung, v2 nach Korrektur", version: 2, quelle: "Vorlage", zustand: "freigabe" },
    { id: "a8", maklerId: "elif", typ: "Print", name: "Visitenkarten, druckfertig", version: 1, quelle: "LaTeX", zustand: "freigegeben" },
    { id: "a9", maklerId: "elif", typ: "Website", name: "elifdemir.at, Look Warm", version: 3, quelle: "Brand-Profil", zustand: "live" },
  ];
  const auftraege = [
    { id: "o1", maklerId: "markus", katalog: "walkthrough", name: "Objekt-Walkthrough Sieveringer Straße", preis: 149, stufe: 1, zustand: "in_arbeit", datum: hmISO(2026, 9, 20), wer: "Ahmet", kontingent: "videos", termin: "d3" },
    { id: "o2", maklerId: "elif", katalog: "visitenkarte", name: "Visitenkarten 250 Stück", preis: 59, stufe: 4, zustand: "fertig", datum: hmISO(2026, 8, 3), wer: "System" },
    { id: "o3", maklerId: "elif", katalog: "ai-reel", name: "AI-Immobilienreel Laxenburger Straße", preis: 99, stufe: 2, zustand: "in_arbeit", datum: hmISO(2026, 9, 22), wer: "System" },
    { id: "o4", maklerId: "elif", katalog: "sonder", name: "Sonderformat: Kunden-Interview am Balkon", preis: null, stufe: 0, zustand: "wartet_team", datum: hmISO(2026, 9, 21), wer: "Daniel", vorschlag: "behind" },
  ];
  const tickets = [
    { id: "t1", maklerId: "elif", titel: "Sonderformat prüfen: Kunden-Interview", owner: "Daniel", zustand: "wartet_team", faellig: hmISO(2026, 9, 24), text: "Ähnelt Behind the scenes plus Frage und Antwort. Standard vorschlagen." },
    { id: "t2", maklerId: "markus", titel: "Instagram-Übernahme: Zugriff fehlt", owner: "Daniel", zustand: "blockiert", faellig: hmISO(2026, 9, 22), text: "Meta Business Partner-Anfrage noch nicht bestätigt." },
    { id: "t3", maklerId: "sara", titel: "Vertrag an Team Court zur Prüfung", owner: "Nikita", zustand: "fertig", faellig: hmISO(2026, 9, 21), text: "" },
  ];
  const reports = {
    elif: [
      { monat: "2026-07", reach: 18200, follower: 2140, saves: 120, sends: 210, posts: 12, gesicht: 58, beste: ["Warum ich Quereinsteigerin bin", "Favoriten in drei Preisen"], empf: ["Zweitverwertung auf TikTok aktivieren", "Stories täglich", "Mehr Frage und Antwort"] },
      { monat: "2026-08", reach: 31500, follower: 2610, saves: 260, sends: 480, posts: 14, gesicht: 71, beste: ["Was kostet ein Makler wirklich", "Übergabe bei Familie M."], empf: ["TikTok bringt 40 % der Reichweite, Rhythmus halten", "Carousels für Saves ausbauen", "Hook in den ersten 2 Sekunden"] },
      { monat: "2026-09", reach: 45600, follower: 3180, saves: 280, sends: 604, posts: 13, gesicht: 77, beste: ["Grätzl-Check Favoriten", "Schlüsselübergabe Familie K."], empf: ["Säule Markt unter 10 %, im Oktober zwei Carousels", "Sends sind dein Signal, mehr Grätzl", "Kontingent: 2 Videos ungenutzt, vorproduzieren"] },
    ],
    markus: [
      { monat: "2026-09", reach: 12030, follower: 1420, saves: 99, sends: 73, posts: 4, gesicht: 50, beste: ["Der häufigste Preisfehler in Wien", "Döbling Q3"], empf: ["Erste Woche live, Rhythmus 3 pro Woche halten", "LinkedIn Carousel liefert Saves, weiter so", "Gesicht in 50 % der Posts, Ziel 70 %"] },
    ],
  };
  const setups = {
    markus: { branding: { variante: "Behalten und schärfen", farbwelt: "ink", status: "fertig" }, website: { look: "Klar", status: "in_arbeit", felder: { headline: "Der Markt wird lesbar.", region: "Döbling, Währing, Hietzing" } }, konten: { instagram: true, facebook: true, meta: false, unio: false, posting: false }, tour: { status: "fertig" }, drehtermine: ["d1", "d3"] },
    elif: { branding: { variante: "Neu aufsetzen", farbwelt: "papier", status: "fertig" }, website: { look: "Warm", status: "fertig", felder: { headline: "Immobilien sind Menschen mit Adresse.", region: "Favoriten, Meidling, Liesing" } }, konten: { instagram: true, facebook: true, meta: true, unio: true, posting: true }, tour: { status: "fertig" }, drehtermine: ["d2"] },
    sara: { branding: { variante: null, farbwelt: null, status: "offen" }, website: { look: null, status: "offen", felder: {} }, konten: { instagram: false, facebook: false, meta: false, unio: false, posting: false }, tour: { status: "offen" }, drehtermine: [] },
  };
  hmStore.put("drehtage", drehtage); hmStore.put("ideen", ideen); hmStore.put("posts", posts); hmStore.put("assets", assets);
  hmStore.put("auftraege", auftraege); hmStore.put("tickets", tickets); hmStore.put("reports", reports); hmStore.put("setups", setups); hmStore.put("empf_status", {});
}
window.hmSeedMore = hmSeedMore;

/* ---------- Empfehlungs-Engine ---------- */
function hmEngine({ drehtage, posts, makler, auftraege, ideen }) {
  const out = [];
  const name = (id) => (makler.find((m) => m.id === id) || {}).name || id;
  /* Sammel-Drehtag: gleiche Region, 10 Tage */
  const offen = drehtage.filter((d) => d.status !== "fertig");
  for (let i = 0; i < offen.length; i++) for (let j = i + 1; j < offen.length; j++) {
    const a = offen[i], b = offen[j];
    if (a.region === b.region && Math.abs(hmTage(a.datum, b.datum)) <= 10 && a.slots[0].maklerId !== b.slots[0].maklerId) out.push({ id: `sammel-${a.id}-${b.id}`, regel: "sammel", titel: `Sammel-Drehtag ${a.region}`, text: `${name(a.slots[0].maklerId)} (${hmFmtDate(a.datum)}) und ${name(b.slots[0].maklerId)} (${hmFmtDate(b.datum)}) drehen in ${a.region} innerhalb von ${Math.abs(hmTage(a.datum, b.datum))} Tagen. Auf einen Tag legen.`, ersparnis: "1,5 h Anfahrt und Aufbau, ca. 40 € Fahrt", fuer: "team", aktion: { typ: "merge", a: a.id, b: b.id } });
  }
  /* Vorproduktion */
  makler.forEach((m) => { const r = m.kontingent.videos - m.verbraucht.videos; if (m.tag > 30 && r / m.kontingent.videos >= .4) out.push({ id: `vorprod-${m.id}`, regel: "vorprod", titel: `Vorproduktion für ${m.name}`, text: `${r} von ${m.kontingent.videos} Videos im Monat ungenutzt. Am nächsten Drehtag zwei Evergreen-Talking-Heads vorproduzieren.`, ersparnis: "Ein zusätzlicher Drehtag im nächsten Monat entfällt", fuer: "beide", maklerId: m.id }); });
  /* Standard statt Sonder */
  auftraege.filter((o) => o.katalog === "sonder" && o.zustand !== "fertig" && o.vorschlag).forEach((o) => out.push({ id: `standard-${o.id}`, regel: "standard", titel: "Standard statt Sonderformat", text: `"${o.name.replace("Sonderformat: ", "")}" von ${name(o.maklerId)} ähnelt ${HM_FORMATE[o.vorschlag].name}. Als Standardformat anbieten, Kontingent statt Aufpreis.`, ersparnis: "Planungsschritt und Freigabe-Loop entfallen, ca. 1,5 h", fuer: "team", aktion: { typ: "standard", auftrag: o.id } }));
  /* Schnitt-Batch */
  const schnitt = posts.filter((p) => p.zustand === "im_schnitt"); if (schnitt.length > 5) out.push({ id: "batch", regel: "batch", titel: "Schnitt-Batch", text: `${schnitt.length} Rohschnitte offen. In einem Durchgang mit gleicher Vorlage schneiden.`, ersparnis: `${(schnitt.length * .5).toFixed(1)} h`, fuer: "team" });
  /* Freigabe-Latenz */
  makler.forEach((m) => { const f = posts.filter((p) => p.maklerId === m.id && p.zustand === "freigabe" && hmTage(p.termin, HM_HEUTE) >= 0); f.forEach((p) => { if (hmTage(p.frist, HM_HEUTE) >= -1) out.push({ id: `latenz-${p.id}`, regel: "latenz", titel: `Freigabe offen: ${m.name}`, text: `"${p.titel}" wartet seit ${Math.max(0, hmTage(p.termin, HM_HEUTE) + 3)} Tagen. Automatische Freigabe am ${hmFmtDate(p.frist)}.`, ersparnis: "Kein Nachfragen, Termin bleibt", fuer: "team", maklerId: m.id }); }); });
  /* Gesichts-Quote und Zweitverwertung (Makler) */
  makler.forEach((m) => {
    const mp = posts.filter((p) => p.maklerId === m.id && p.zustand === "veroffentlicht");
    if (mp.length >= 3) { const q = Math.round(mp.filter((p) => p.gesicht).length / mp.length * 100); if (q < 60) out.push({ id: `gesicht-${m.id}`, regel: "gesicht", titel: "Mehr Gesicht", text: `${q} % deiner Posts zeigen dich. Fotos und Videos mit Gesicht bekommen im Schnitt 38 % mehr Likes.`, ersparnis: "Wirkung", fuer: "makler", maklerId: m.id }); }
    const reels = mp.filter((p) => ["talking", "spaziergang", "behind"].includes(p.format));
    reels.forEach((r) => { if (!mp.some((x) => x.titel.startsWith(r.titel.split(" (")[0]) && x.kanal !== r.kanal)) out.push({ id: `zweit-${r.id}`, regel: "zweit", titel: "Zweitverwertung", text: `"${r.titel}" lief nur auf ${HM_KANAELE[r.kanal].name}. Auch für TikTok, Shorts und Facebook planen.`, ersparnis: "Reichweite ohne Dreh", fuer: "makler", maklerId: m.id, aktion: { typ: "zweit", post: r.id } }); });
    /* Säulen-Balance */
    const mi = ideen.filter((i) => i.maklerId === m.id && i.zustand === "gewaehlt");
    if (mi.length >= 3) { const s = {}; mi.forEach((i) => (s[i.saeule] = (s[i.saeule] || 0) + 1)); Object.keys(HM_SAEULEN).forEach((k) => { if (!s[k]) out.push({ id: `saeule-${m.id}-${k}`, regel: "saeule", titel: `Säule fehlt: ${HM_SAEULEN[k].name}`, text: `Im Oktober ist keine Idee aus "${HM_SAEULEN[k].name}" gewählt. Eine dazunehmen hält die Mischung.`, ersparnis: "Balance", fuer: "makler", maklerId: m.id }); }); }
  });
  return out;
}

/* ---------- Makler: Aufbau ---------- */
function Aufbau({ m, st }) {
  const setups = useHm("setups") || {}; const s = setups[m.id] || {}; const drehtage = useHm("drehtage") || [];
  const [det, setDet] = useState(null);
  const put = (patch) => { hmStore.patch("setups", (all) => ({ ...all, [m.id]: { ...s, ...patch } })); };
  const w = st && st.gewaehlt ? st.wege[st.gewaehlt] : null;
  const konten = s.konten || {}; const kontenN = Object.values(konten).filter(Boolean).length;
  const meine = drehtage.filter((d) => d.slots.some((x) => x.maklerId === m.id) && d.status !== "vorschlag");
  const cards = [
    { id: "branding", t: "Branding", z: s.branding && s.branding.status, sub: s.branding && s.branding.farbwelt ? `${s.branding.variante} · Farbwelt ${HM_FARBWELTEN.find((f) => f.id === s.branding.farbwelt).name}` : "Farben, Schrift, Leitidee aus deinem Weg", owner: "Daniel" },
    { id: "website", t: "Website", z: s.website && s.website.status, sub: s.website && s.website.look ? `Look ${s.website.look}` : "Aus dem Brand-Profil, du prüfst nur", owner: "System" },
    { id: "konten", t: "Konten", z: kontenN === 5 ? "fertig" : kontenN ? "in_arbeit" : "wartet_makler", sub: `${kontenN} von 5 verbunden`, owner: "Du" },
    { id: "tour", t: "Dein Werkzeug", z: s.tour && s.tour.status, sub: "Vier Minuten, dann kennst du alles", owner: "System" },
    { id: "dreh", t: "Drehtage", z: meine.length >= 3 ? "fertig" : meine.length ? "in_arbeit" : "wartet_makler", sub: meine.length ? `${meine.length} gebucht` : "Drei Termine im Quartal", owner: "Du" },
  ];
  if (!w) return <div><div className="hm-mono">Etappe 04 · Aufbau</div><h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>Der Aufbau startet mit deinem Weg.</h2><p className="hm-sub">Branding, Website und Vorlagen entstehen aus der gewählten Strategie. Erst wählen, dann bauen.</p></div>;
  return (
    <div>
      <div className="hm-mono">Etappe 04 · Aufbau · Tag 10 bis 24</div>
      <h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>Fünf Dinge, parallel.</h2>
      <p className="hm-sub">Drei davon macht das Team oder das System. Zwei brauchen dich: Konten verbinden und Drehtage buchen.</p>
      <div className="hm-kap">{cards.map((c) => <button key={c.id} className={"hm-kapc" + (c.z === "fertig" ? " fertig" : "")} onClick={() => setDet(c.id)}><div className="hm-mono">{c.owner}</div><div className="t">{c.t}</div><div className="s">{c.sub}</div><div style={{ marginTop: "auto" }}><Pill z={c.z || "offen"} /></div></button>)}</div>
      {det === "branding" && <div className="hm-card" style={{ marginTop: 20 }}>
        <div className="hm-row" style={{ justifyContent: "space-between" }}><div><div className="hm-mono">Branding</div><h3 className="hm-h hm-h2" style={{ marginTop: 6 }}>Farbwelt wählen.</h3></div><button className="hm-chip" onClick={() => setDet(null)}>Schließen</button></div>
        <p className="hm-sub">Aus deinem Weg kommen drei Vorschläge, die erste ist die Empfehlung. Daniel legt Schrift und Leitidee danach fest.</p>
        <div className="hm-seg" style={{ marginTop: 16 }}>{["Behalten und schärfen", "Neu aufsetzen"].map((v) => <button key={v} className={(s.branding || {}).variante === v ? "on" : ""} onClick={() => put({ branding: { ...(s.branding || {}), variante: v, status: "in_arbeit" } })}>{v}</button>)}</div>
        <div className="hm-bp" style={{ marginTop: 16 }}>{[{ id: "weg", name: "Aus deinem Weg", p: w.palette }, ...HM_FARBWELTEN.slice(0, 3)].map((f) => <button key={f.id} className="hm-karte" style={{ boxShadow: (s.branding || {}).farbwelt === f.id ? "inset 0 0 0 2px var(--ink)" : "" }} onClick={() => { put({ branding: { ...(s.branding || {}), farbwelt: f.id, status: "in_arbeit" } }); hmEvent(m.id, "branding", `Farbwelt ${f.name} gewählt`, m.name); toast("Farbwelt gespeichert, Daniel legt Schrift und Leitidee fest"); }}><div className="img" style={{ background: `linear-gradient(90deg, ${f.p[0]} 55%, ${f.p[1]} 55% 85%, ${f.p[2]} 85%)` }}></div><div className="tx"><div className="t">{f.name}</div><div className="s hm-mono">{f.p.join(" · ")}</div></div></button>)}</div>
        <div className="hm-card" style={{ marginTop: 16, background: "var(--paper-2)", boxShadow: "none" }}><div className="hm-mono">Leitidee und Schrift (Vorschlag)</div><div style={{ fontSize: 20, color: "var(--ink)", marginTop: 6 }}>{w.leitidee}</div><div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{w.schrift[0]} für Titel, {w.schrift[1]} für Daten. Wortmarke aus dem Schriftpaar, Bildmarke auf Wunsch als Option.</div></div>
      </div>}
      {det === "website" && <div className="hm-card" style={{ marginTop: 20 }}>
        <div className="hm-row" style={{ justifyContent: "space-between" }}><div><div className="hm-mono">Website</div><h3 className="hm-h hm-h2" style={{ marginTop: 6 }}>Entsteht aus dem Profil.</h3></div><button className="hm-chip" onClick={() => setDet(null)}>Schließen</button></div>
        <div className="hm-seg" style={{ marginTop: 16 }}>{["Klar", "Warm", "Editorial"].map((l) => <button key={l} className={(s.website || {}).look === l ? "on" : ""} onClick={() => put({ website: { ...(s.website || {}), look: l, status: "in_arbeit" } })}>{l}</button>)}</div>
        <div style={{ marginTop: 16, borderRadius: 18, overflow: "hidden", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
          <div style={{ background: w.palette[0], color: w.palette[1], padding: "clamp(24px, 4vw, 56px)", minHeight: 260, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 10 }}>
            <div className="hm-mono" style={{ color: "inherit", opacity: .7 }}>{m.name} · {(s.website && s.website.felder && s.website.felder.region) || (w.bezirke.join(", ") || "Wien")}</div>
            <div style={{ fontSize: "clamp(30px, 4vw, 54px)", letterSpacing: "-.03em", lineHeight: .98, maxWidth: "16ch" }}>{(s.website && s.website.felder && s.website.felder.headline) || w.leitidee}</div>
            <div style={{ maxWidth: "52ch", opacity: .8, fontSize: 15 }}>{w.bio}</div>
            <div style={{ marginTop: 8 }}><span style={{ display: "inline-block", background: w.palette[2], color: w.palette[0], borderRadius: 999, padding: "10px 18px", fontSize: 14 }}>Erstgespräch vereinbaren</span></div>
          </div>
          <div style={{ padding: "14px 18px", display: "flex", gap: 18, fontSize: 13, color: "var(--text-muted)", flexWrap: "wrap" }}><span>Portraits: aus Drehtag 1</span><span>Objekte: aus NOVA</span><span>Bewertungen: aus CIRCLE</span><span>Domain: {m.name.toLowerCase().replace(/\s/g, "")}.at</span></div>
        </div>
        <div className="hm-row" style={{ marginTop: 14 }}><Btn onClick={() => { put({ website: { ...(s.website || {}), status: "freigabe" } }); toast("Entwurf an Daniel zur Prüfung"); }}>Entwurf so prüfen lassen</Btn><span className="hm-mono">Daniel prüft, dann live in 2 Tagen</span></div>
      </div>}
      {det === "konten" && <div className="hm-card" style={{ marginTop: 20 }}>
        <div className="hm-row" style={{ justifyContent: "space-between" }}><div><div className="hm-mono">Konten</div><h3 className="hm-h hm-h2" style={{ marginTop: 6 }}>Fünf Häkchen.</h3></div><button className="hm-chip" onClick={() => setDet(null)}>Schließen</button></div>
        <div className="hm-list" style={{ marginTop: 10 }}>{[["instagram", "Instagram auf Professional-Konto umstellen", "Einstellungen, Konto, zu professionellem Konto wechseln"], ["facebook", "Facebook-Seite anlegen oder verknüpfen", "Wird Spiegel von Instagram"], ["meta", "Meta Business Suite einrichten", "Beide Konten in einem Business-Konto"], ["unio", "UNIO als Partner freigeben", "Business Partner-Zugriff, du bleibst Inhaber"], ["posting", "Posting-Werkzeug verbinden", "Erledigt das Team, sobald der Zugriff steht"]].map(([k, t, h]) => <div key={k} className="hm-li"><div><div className="t">{t}</div><div className="m">{h}</div></div><Pill z={konten[k] ? "fertig" : "wartet_makler"} /><button className="hm-chip" onClick={() => { put({ konten: { ...konten, [k]: !konten[k] } }); if (!konten[k]) hmEvent(m.id, "konten", `${t}: erledigt`, m.name); }}>{konten[k] ? "Zurück" : "Erledigt"}</button></div>)}</div>
      </div>}
      {det === "tour" && <div className="hm-card hm-dark" style={{ marginTop: 20 }}>
        <div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-mono">Dein Werkzeug in vier Schritten</div><button className="hm-chip" style={{ color: "var(--paper)", boxShadow: "inset 0 0 0 1px rgba(247,245,241,.3)" }} onClick={() => setDet(null)}>Schließen</button></div>
        <div className="hm-beats" style={{ marginTop: 14 }}>{[["Reise", "Oben steht immer, was als Nächstes von dir gebraucht wird. Alles andere läuft sichtbar im Hintergrund."], ["Inhalte", "Jeden Monat wählst du aus 20 Ideen. Vor dem Drehtag siehst du den Plan, danach gibst du frei. Zwei Buttons, nie mehr."], ["Kalender", "Drehtage, Posts, Fristen. Was rot ist, wartet auf dich."], ["Nachrichten", "Jede Rückfrage hängt an einem Schritt. Kein Chat, in dem Dinge verloren gehen."]].map(([t, x]) => <div key={t} className="hm-beat" style={{ background: "rgba(247,245,241,.08)", color: "var(--paper)" }}><b style={{ color: "var(--signal)" }}>{t}</b>{x}</div>)}</div>
        <div style={{ marginTop: 16 }}><Btn paper onClick={() => { put({ tour: { status: "fertig" } }); toast("Tour abgeschlossen"); setDet(null); }}>Verstanden</Btn></div>
      </div>}
      {det === "dreh" && <DrehBuchung m={m} drehtage={drehtage} schliessen={() => setDet(null)} />}
    </div>
  );
}

function DrehBuchung({ m, drehtage, schliessen }) {
  const meine = drehtage.filter((d) => d.slots.some((x) => x.maklerId === m.id));
  const andere = drehtage.filter((d) => !d.slots.some((x) => x.maklerId === m.id) && d.status !== "fertig");
  const region = m.region.replace(/^\d{4}\s/, "");
  const buchen = (d) => { hmStore.patch("drehtage", (l) => l.map((x) => x.id === d.id ? { ...x, status: "geplant", location: x.location === "offen" ? `Region ${x.region}, Ort folgt` : x.location } : x)); hmStore.patch("setups", (all) => ({ ...all, [m.id]: { ...(all[m.id] || {}), drehtermine: [...((all[m.id] || {}).drehtermine || []), d.id] } })); hmEvent(m.id, "drehtag", `Drehtag ${hmFmtDate(d.datum)} gebucht`, m.name); toast("Gebucht. Ahmet bestätigt und plant die Shotlist."); };
  const mitfahren = (d) => { hmStore.patch("drehtage", (l) => l.map((x) => x.id === d.id ? { ...x, slots: [...x.slots, { maklerId: m.id, von: "13:00", bis: "15:00" }] } : x)); hmEvent(m.id, "drehtag", `Sammel-Drehtag ${hmFmtDate(d.datum)} in ${d.region} gebucht`, m.name); toast("Sammel-Drehtag gebucht"); };
  return (
    <div className="hm-card" style={{ marginTop: 20 }}>
      <div className="hm-row" style={{ justifyContent: "space-between" }}><div><div className="hm-mono">Drehtage</div><h3 className="hm-h hm-h2" style={{ marginTop: 6 }}>Drei Termine im Quartal.</h3></div><button className="hm-chip" onClick={schliessen}>Schließen</button></div>
      <p className="hm-sub">Ein Drehtag dauert drei Stunden und liefert Material für einen Monat. Termine, an denen das Team schon in deiner Nähe ist, sparen Anfahrt und sind zuerst gelistet.</p>
      <div className="hm-list" style={{ marginTop: 10 }}>
        {meine.map((d) => <div key={d.id} className="hm-li"><div><div className="t">{hmFmtDate(d.datum)} · {d.region}</div><div className="m">{d.location} · {d.slots.find((x) => x.maklerId === m.id).von} bis {d.slots.find((x) => x.maklerId === m.id).bis}{d.slots.length > 1 ? " · Sammel-Drehtag" : ""}</div></div><Pill z={d.status === "fertig" ? "fertig" : d.status === "vorschlag" ? "offen" : "geplant"} />{d.status === "vorschlag" ? <Btn onClick={() => buchen(d)}>Buchen</Btn> : <span></span>}</div>)}
        {andere.filter((d) => d.region === region || true).map((d) => <div key={d.id} className="hm-li"><div><div className="t">{hmFmtDate(d.datum)} · {d.region}{d.region === region ? " · in deiner Region" : ""}</div><div className="m">Team ist vor Ort ({d.slots.map((x) => x.von).join(", ")}). Nachmittags-Slot frei.</div></div><span className="hm-pill" style={{ background: d.region === region ? "var(--signal-soft)" : "" }}><i style={{ background: "var(--signal)" }}></i>Sammel-Drehtag</span><Btn ghost onClick={() => mitfahren(d)}>Dazubuchen</Btn></div>)}
      </div>
    </div>
  );
}

/* ---------- Makler: Inhalte (Zyklus) ---------- */
function Inhalte({ m, st }) {
  const [tab, setTab] = useState("ideen");
  const ideen = (useHm("ideen") || []).filter((i) => i.maklerId === m.id);
  const posts = (useHm("posts") || []).filter((p) => p.maklerId === m.id);
  const assets = (useHm("assets") || []).filter((a) => a.maklerId === m.id);
  const drehtage = (useHm("drehtage") || []).filter((d) => d.slots.some((x) => x.maklerId === m.id) && d.status !== "fertig").sort((a, b) => a.datum.localeCompare(b.datum));
  const w = st && st.gewaehlt ? st.wege[st.gewaehlt] : null;
  const frei = posts.filter((p) => p.zustand === "freigabe");
  const tabs = [["ideen", "Ideen", ideen.filter((i) => i.zustand === "vorgeschlagen").length], ["dreh", "Drehplan"], ["freigabe", "Freigaben", frei.length], ["plan", "Geplant"], ["bib", "Bibliothek"]];
  if (!w) return <div><div className="hm-mono">Inhalte</div><h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>Erst die Strategie, dann die Inhalte.</h2><p className="hm-sub">Ideen, Drehplan und Freigaben bauen auf deinen Säulen auf.</p></div>;
  return (
    <div>
      <div className="hm-mono">Inhalte · Oktober 2026 · Kontingent {m.kontingent.videos - m.verbraucht.videos} Videos, {m.kontingent.fotos - m.verbraucht.fotos} Fotos, {m.kontingent.grafiken - m.verbraucht.grafiken} Grafiken offen</div>
      <h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>Dein Monat.</h2>
      <div className="hm-seg" style={{ marginTop: 18 }}>{tabs.map(([id, t, n]) => <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{t}{n ? ` · ${n}` : ""}</button>)}</div>
      {tab === "ideen" && <Ideen m={m} w={w} ideen={ideen} />}
      {tab === "dreh" && <Drehplan m={m} drehtage={drehtage} />}
      {tab === "freigabe" && <Freigaben m={m} posts={frei} assets={assets} />}
      {tab === "plan" && <Geplant m={m} posts={posts} />}
      {tab === "bib" && <Bibliothek assets={assets} />}
    </div>
  );
}

function Ideen({ m, w, ideen }) {
  const offen = ideen.filter((i) => i.zustand === "vorgeschlagen");
  const gew = ideen.filter((i) => i.zustand === "gewaehlt");
  const set = (id, z) => { hmStore.patch("ideen", (l) => l.map((i) => i.id === id ? { ...i, zustand: z } : i)); if (z === "gewaehlt") hmEvent(m.id, "idee", "Idee gewählt", m.name); };
  const quote = {}; gew.forEach((i) => (quote[i.saeule] = (quote[i.saeule] || 0) + 1));
  const cur = offen[0];
  const neu = () => { const s = Object.keys(w.saeulen).sort((a, b) => (quote[a] || 0) - (quote[b] || 0))[0]; const f = w.formate[Math.floor(Math.random() * w.formate.length)]; const h = w.hooks[Math.floor(Math.random() * w.hooks.length)]; hmStore.patch("ideen", (l) => [...l, { id: `${m.id}-n${Date.now()}`, maklerId: m.id, monat: "2026-10", saeule: s, format: f, hook: h, zustand: "vorgeschlagen" }]); };
  return (
    <div className="hm-grid" style={{ gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)", marginTop: 20 }}>
      <div>
        {cur ? <div className="hm-card" style={{ minHeight: 320, display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="hm-row" style={{ justifyContent: "space-between" }}><span className="hm-mono">{HM_SAEULEN[cur.saeule].name} · {HM_FORMATE[cur.format].name}</span><span className="hm-mono">{offen.length} offen</span></div>
          <h3 className="hm-h hm-h2" style={{ flex: 1 }}>{cur.hook}</h3>
          <div style={{ fontSize: 14, color: "var(--text-muted)" }}>{HM_FORMATE[cur.format].was}. {HM_FORMATE[cur.format].dauer}. Säule "{HM_SAEULEN[cur.saeule].name}": {HM_SAEULEN[cur.saeule].was.toLowerCase()}.</div>
          <div className="hm-row"><Btn onClick={() => set(cur.id, "gewaehlt")}>Ja, machen wir</Btn><button className="hm-chip" onClick={() => set(cur.id, "verworfen")}>Nein</button><button className="hm-chip" onClick={() => set(cur.id, "spaeter")}>Später</button></div>
        </div> : <div className="hm-card" style={{ minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}><h3 className="hm-h hm-h2">Alle Ideen gesichtet.</h3><div style={{ color: "var(--text-muted)" }}>{gew.length} gewählt. Ahmet baut daraus den Drehplan.</div><div><Btn ghost onClick={neu}>Noch eine Idee</Btn></div></div>}
        <div className="hm-card" style={{ marginTop: 12, background: "var(--paper-2)", boxShadow: "none" }}><div className="hm-mono">Woher die Ideen kommen</div><div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6, lineHeight: 1.5 }}>Aus deinen Säulen ({Object.entries(w.saeulen).map(([k, v]) => `${HM_SAEULEN[k].name} ${v} %`).join(", ")}), dem Kalender (Saison, Feiertage), deinen Objekten aus NOVA, Marktdaten aus LENS und der Wirkung deiner letzten Posts. Im Prototyp aus den 30 Hooks deines Wegs.</div></div>
      </div>
      <div className="hm-card">
        <div className="hm-mono">Gewählt für Oktober · {gew.length}</div>
        <div className="hm-bars" style={{ margin: "12px 0 16px" }}>{Object.entries(w.saeulen).map(([k, v]) => <div key={k} className="hm-bar"><span>{HM_SAEULEN[k].name}</span><div className="tr"><i style={{ width: Math.min(100, (quote[k] || 0) / Math.max(1, gew.length) * 100) + "%", background: (quote[k] || 0) ? "" : "transparent" }}></i></div><span className="v">{quote[k] || 0} / Ziel {Math.round(v / 100 * 8)}</span></div>)}</div>
        <div className="hm-list">{gew.map((i) => <div key={i.id} className="hm-li"><div><div className="t">{i.hook}</div><div className="m">{HM_SAEULEN[i.saeule].name} · {HM_FORMATE[i.format].name}</div></div><span></span><button className="hm-chip" onClick={() => set(i.id, "vorgeschlagen")}>Zurück</button></div>)}</div>
      </div>
    </div>
  );
}

function Drehplan({ m, drehtage }) {
  const d = drehtage[0];
  const [tp, setTp] = useState(null);
  if (!d) return <div className="hm-empty" style={{ marginTop: 20 }}>Kein Drehtag geplant. Buche unter Aufbau.</div>;
  const toggle = (i) => hmStore.patch("drehtage", (l) => l.map((x) => x.id === d.id ? { ...x, plan: x.plan.map((p, j) => j === i ? { ...p, done: !p.done } : p) } : x));
  const slot = d.slots.find((x) => x.maklerId === m.id) || d.slots[0];
  return (
    <div className="hm-grid" style={{ gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)", marginTop: 20 }}>
      <div className="hm-card">
        <div className="hm-row" style={{ justifyContent: "space-between" }}><div><div className="hm-mono">Nächster Drehtag · in {hmTage(HM_HEUTE, d.datum)} Tagen</div><h3 className="hm-h hm-h2" style={{ marginTop: 6 }}>{hmFmtDate(d.datum)}, {slot.von} bis {slot.bis}</h3><div style={{ color: "var(--text-muted)", marginTop: 4 }}>{d.location}{d.slots.length > 1 ? " · Sammel-Drehtag, du bist der zweite Slot" : ""}</div></div><Pill z={d.status === "geplant" ? "geplant" : "offen"} /></div>
        {d.plan.length ? <div className="hm-list" style={{ marginTop: 12 }}>{d.plan.map((p, i) => <div key={i} className="hm-li" style={{ gridTemplateColumns: "auto minmax(0, 1fr) auto" }}><button className="hm-chip" style={{ width: 34, padding: 0, height: 34 }} onClick={() => toggle(i)}>{p.done ? "●" : "○"}</button><div><div className="t" style={{ textDecoration: p.done ? "line-through" : "" }}>{p.shot}</div><div className="m">{p.ort} · {p.dauer}{p.hook ? ` · Hook: ${p.hook}` : ""}</div></div>{p.hook ? <button className="hm-chip" onClick={() => setTp(p)}>Skript</button> : <span></span>}</div>)}</div> : <div className="hm-empty" style={{ marginTop: 12, padding: 20 }}>Shotlist entsteht aus deinen gewählten Ideen. Ahmet legt sie 5 Tage vor dem Dreh an.</div>}
        <div style={{ marginTop: 14, fontSize: 13, color: "var(--text-muted)" }}>Mitbringen: zwei Outfits (ein helles, ein dunkles), Schlüssel für das Objekt, Ruhe. Teleprompter und Licht bringt Ahmet.</div>
      </div>
      <div className="hm-card hm-dark" style={{ minHeight: 280 }}>
        <div className="hm-mono">Teleprompter</div>
        {tp ? <><h3 className="hm-h hm-h2" style={{ margin: "10px 0 14px" }}>{tp.hook}</h3><div style={{ fontSize: 17, lineHeight: 1.6, color: "var(--text-inverse-muted)" }}>{tp.format === "spaziergang" ? "Wir starten hier am Platz. Was du hier nicht siehst: die Preise. Ich zeig dir drei Ecken, an denen sich in zwei Jahren alles geändert hat." : tp.format === "qa" ? "Die Frage bekomme ich in jedem zweiten Gespräch. Die kurze Antwort: es kommt drauf an. Die ehrliche Antwort: drei Dinge." : "Erste drei Sekunden: der Satz oben, direkt in die Kamera. Dann ein Beispiel aus deiner Praxis, ohne Namen. Am Ende ein Satz, der zum Kommentieren einlädt."}</div><div className="hm-mono" style={{ marginTop: 16 }}>{tp.dauer} · Hook in den ersten 3 Sekunden · Untertitel kommen automatisch</div></> : <div style={{ color: "var(--text-inverse-muted)", marginTop: 10 }}>Tippe bei einem Shot auf Skript. Am Drehtag läuft das hier auf dem Handy neben der Kamera.</div>}
      </div>
    </div>
  );
}

function Freigaben({ m, posts, assets }) {
  const act = (p, z) => {
    hmStore.patch("posts", (l) => l.map((x) => x.id === p.id ? (z === "freigegeben" ? { ...x, zustand: "geplant" } : { ...x, zustand: "im_schnitt", korrekturen: (x.korrekturen || 0) + 1 }) : x));
    hmStore.patch("assets", (l) => l.map((a) => a.id === p.asset ? { ...a, zustand: z === "freigegeben" ? "freigegeben" : "korrektur" } : a));
    hmEvent(m.id, "freigabe", `${p.titel}: ${z === "freigegeben" ? "freigegeben" : "Änderung gewünscht"}`, m.name);
    toast(z === "freigegeben" ? `Freigegeben. Geht am ${hmFmtDate(p.termin)} online.` : "Änderung an Ahmet. Runde " + ((p.korrekturen || 0) + 1) + " von 2.");
  };
  if (!posts.length) return <div className="hm-empty" style={{ marginTop: 20 }}>Nichts wartet auf deine Freigabe.</div>;
  return (
    <div className="hm-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", marginTop: 20 }}>
      {posts.map((p) => { const a = assets.find((x) => x.id === p.asset); return (
        <div key={p.id} className="hm-card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="hm-row" style={{ justifyContent: "space-between" }}><span className="hm-mono">{HM_KANAELE[p.kanal].name} · {HM_FORMATE[p.format].name}</span><Pill z="freigabe" /></div>
          <div style={{ aspectRatio: p.format === "carousel" ? "1" : "9/16", maxHeight: 300, borderRadius: 14, background: "linear-gradient(160deg, var(--ink-3), var(--ink))", color: "var(--paper)", padding: 18, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}><div className="hm-mono" style={{ color: "var(--signal)" }}>{a ? `Version ${a.version}` : "Vorschau"}</div><div style={{ fontSize: 22, letterSpacing: "-.02em", lineHeight: 1.05 }}>{p.titel}</div></div>
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Geplant für {hmFmtDate(p.termin)}. Ohne Rückmeldung automatisch freigegeben am {hmFmtDate(p.frist)}. Korrekturrunden: {p.korrekturen || 0} von 2{(p.korrekturen || 0) >= 2 ? ", weitere kostenpflichtig" : ""}.</div>
          <div className="hm-row"><Btn onClick={() => act(p, "freigegeben")}>Freigeben</Btn><button className="hm-chip" onClick={() => act(p, "aenderung")}>Änderung wünschen</button></div>
        </div>); })}
    </div>
  );
}

const HM_POST_Z = { geplant: "Geplant", veroffentlicht: "Veröffentlicht", im_schnitt: "Im Schnitt", freigabe: "In Freigabe" };
function Geplant({ m, posts }) {
  const l = [...posts].sort((a, b) => b.termin.localeCompare(a.termin));
  return <div className="hm-card" style={{ marginTop: 20 }}><div className="hm-mono">Alle Posts · {l.length}</div><div className="hm-list" style={{ marginTop: 8 }}>{l.map((p) => <div key={p.id} className="hm-li" style={{ gridTemplateColumns: "70px minmax(0, 1fr) auto auto" }}><span className="hm-mono">{hmFmtDate(p.termin)}</span><div><div className="t">{p.titel}</div><div className="m">{HM_KANAELE[p.kanal].name} · {HM_FORMATE[p.format].name}{p.kz ? ` · ${p.kz.reach.toLocaleString("de-AT")} Reichweite · ${p.kz.saves} Saves · ${p.kz.sends} Sends` : ""}</div></div><span className={"hm-pill z-" + (p.zustand === "veroffentlicht" ? "fertig" : p.zustand === "geplant" ? "geplant" : p.zustand === "freigabe" ? "freigabe" : "in_arbeit")}><i></i>{HM_POST_Z[p.zustand]}</span>{p.gesicht ? <span className="hm-mono">Gesicht</span> : <span></span>}</div>)}</div></div>;
}

function Bibliothek({ assets }) {
  return <div className="hm-karten" style={{ marginTop: 20 }}>{assets.map((a) => <div key={a.id} className="hm-karte"><div className="img" style={{ background: { Foto: "#8A6B4A", Video: "#2C4250", Grafik: "#B87400", Logo: "#0B0A09", Print: "#48684E", Website: "#5E7A8E" }[a.typ] || "#D1D3D5" }}></div><div className="tx"><div className="hm-mono">{a.typ} · v{a.version}</div><div className="t" style={{ fontSize: 15 }}>{a.name}</div><div className="s">Quelle: {a.quelle} · Rechte: bei dir ab Produktion</div><div style={{ marginTop: 6 }}><Pill z={a.zustand === "freigegeben" || a.zustand === "live" ? "fertig" : a.zustand === "freigabe" ? "freigabe" : "in_arbeit"} /></div></div></div>)}{!assets.length && <div className="hm-empty">Noch leer. Füllt sich mit dem ersten Drehtag.</div>}</div>;
}

/* ---------- Kalender ---------- */
function Kalender({ maklerId, makler }) {
  const [mon, setMon] = useState(9);
  const drehtage = useHm("drehtage") || []; const posts = useHm("posts") || []; const schritte = useHm("schritte") || [];
  const name = (id) => (makler.find((m) => m.id === id) || {}).kurz || id;
  const first = new Date(2026, mon - 1, 1); const days = new Date(2026, mon, 0).getDate(); const off = (first.getDay() + 6) % 7;
  const items = (iso) => {
    const l = [];
    drehtage.filter((d) => d.datum === iso && (!maklerId || d.slots.some((s) => s.maklerId === maklerId))).forEach((d) => l.push({ t: `Dreh ${d.region}${!maklerId ? " " + d.slots.map((s) => name(s.maklerId)).join("+") : ""}`, k: "dreh", v: d.status === "vorschlag" }));
    posts.filter((p) => p.termin === iso && (!maklerId || p.maklerId === maklerId)).forEach((p) => l.push({ t: (!maklerId ? name(p.maklerId) + " " : "") + p.titel, k: p.zustand }));
    posts.filter((p) => p.frist === iso && p.zustand === "freigabe" && (!maklerId || p.maklerId === maklerId)).forEach((p) => l.push({ t: "Auto-Freigabe " + p.titel, k: "frist" }));
    schritte.filter((s) => s.faellig === iso && s.zustand !== "fertig" && (!maklerId || s.maklerId === maklerId) && ["workshop", "review", "praesentation"].some((k) => s.id.endsWith(k))).forEach((s) => l.push({ t: (!maklerId ? name(s.maklerId) + " " : "") + s.titel, k: "termin" }));
    return l;
  };
  const col = { dreh: "var(--signal)", veroffentlicht: "var(--positive)", geplant: "var(--ink)", freigabe: "var(--signal-deep)", im_schnitt: "var(--steel)", frist: "var(--signal-deep)", termin: "var(--ink-3)" };
  return (
    <div>
      <div className="hm-row" style={{ justifyContent: "space-between" }}><div><div className="hm-mono">Kalender</div><h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>{first.toLocaleDateString("de-AT", { month: "long", year: "numeric" })}</h2></div><div className="hm-seg"><button onClick={() => setMon(Math.max(8, mon - 1))}>←</button><button className="on" onClick={() => setMon(9)}>Heute</button><button onClick={() => setMon(Math.min(11, mon + 1))}>→</button></div></div>
      <div className="hm-row" style={{ marginTop: 14, gap: 16 }}>{[["dreh", "Drehtag"], ["geplant", "Post geplant"], ["veroffentlicht", "Veröffentlicht"], ["frist", "Freigabefrist"], ["termin", "Gespräch"]].map(([k, t]) => <span key={k} className="hm-mono" style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><i style={{ width: 8, height: 8, borderRadius: "50%", background: col[k], display: "inline-block" }}></i>{t}</span>)}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 4, marginTop: 18 }}>
        {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => <div key={d} className="hm-mono" style={{ padding: "0 8px 6px" }}>{d}</div>)}
        {Array.from({ length: off }).map((_, i) => <div key={"o" + i}></div>)}
        {Array.from({ length: days }).map((_, i) => { const iso = hmISO(2026, mon, i + 1); const l = items(iso); const heute = iso === HM_HEUTE; return <div key={iso} style={{ minHeight: 96, borderRadius: 12, background: heute ? "var(--surface-raised)" : "var(--paper-2)", boxShadow: heute ? "inset 0 0 0 2px var(--ink)" : "", padding: 8, display: "flex", flexDirection: "column", gap: 4 }}><div className="hm-mono" style={{ color: heute ? "var(--ink)" : "" }}>{i + 1}</div>{l.map((x, j) => <div key={j} style={{ fontSize: 11.5, lineHeight: 1.3, display: "flex", gap: 5, alignItems: "flex-start", opacity: x.v ? .5 : 1 }}><i style={{ width: 7, height: 7, borderRadius: "50%", background: col[x.k] || "var(--steel)", flex: "none", marginTop: 3 }}></i><span style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{x.t}</span></div>)}</div>; })}
      </div>
    </div>
  );
}

/* ---------- Aufträge und Shop ---------- */
function Auftraege({ m, st }) {
  const auftraege = (useHm("auftraege") || []).filter((o) => o.maklerId === m.id).sort((a, b) => b.datum.localeCompare(a.datum));
  const [sonder, setSonder] = useState("");
  const [kat, setKat] = useState("alle");
  const w = st && st.gewaehlt ? st.wege[st.gewaehlt] : null;
  const bestellen = (k) => {
    if (k.art === "sonder") { if (!sonder.trim()) { toast("Bitte kurz beschreiben"); return; } const id = "o" + Date.now(); hmStore.patch("auftraege", (l) => [...l, { id, maklerId: m.id, katalog: "sonder", name: "Sonderformat: " + sonder, preis: null, stufe: 0, zustand: "wartet_team", datum: HM_HEUTE, wer: "Daniel", vorschlag: w ? w.formate[0] : "talking" }]); hmStore.patch("tickets", (l) => [...l, { id: "t" + Date.now(), maklerId: m.id, titel: "Sonderformat prüfen: " + sonder, owner: "Daniel", zustand: "wartet_team", faellig: hmISO(2026, 9, 25), text: "Nächstliegendes Standardformat vorschlagen." }]); hmEvent(m.id, "auftrag", "Sonderformat angefragt, Ticket am Team-Board", m.name); setSonder(""); toast("Angefragt. Daniel meldet sich am Schritt, spätestens in 2 Tagen."); return; }
    hmStore.patch("auftraege", (l) => [...l, { id: "o" + Date.now(), maklerId: m.id, katalog: k.id, name: k.name, preis: k.preis, stufe: k.team ? 0 : 2, zustand: "in_arbeit", datum: HM_HEUTE, wer: k.team ? "Ahmet" : "System", kontingent: k.kontingent }]);
    if (k.kontingent) hmStore.patch("makler", (l) => l.map((x) => x.id === m.id ? { ...x, verbraucht: { ...x.verbraucht, [k.kontingent]: x.verbraucht[k.kontingent] + 1 } } : x));
    hmEvent(m.id, "auftrag", `${k.name} bestellt`, m.name); toast(k.team ? "Bestellt. Kommt auf den nächsten Drehtag." : "Bestellt. Läuft automatisch, Ergebnis in 24 Stunden.");
  };
  const rest = (k) => m.kontingent[k] - m.verbraucht[k];
  const liste = HM_KATALOG.filter((k) => kat === "alle" || k.art === kat);
  return (
    <div>
      <div className="hm-mono">Aufträge · {m.abo}</div>
      <h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>Bestellen, ohne zu fragen.</h2>
      <p className="hm-sub">Standardformate laufen ohne Team und werden aus deinem Kontingent verrechnet. Sonderwünsche gehen als Ticket an Daniel, mit Vorschlag für das nächstliegende Standardformat.</p>
      <div className="hm-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", marginTop: 24 }}>{[["videos", "Videos"], ["fotos", "Fotos"], ["grafiken", "Grafiken"]].map(([k, t]) => <div key={k} className="hm-card" style={{ padding: 16 }}><div className="hm-mono">{t} diesen Monat</div><div style={{ fontSize: 34, letterSpacing: "-.03em", color: "var(--ink)", marginTop: 6 }}>{rest(k)} <span style={{ fontSize: 14, color: "var(--text-muted)", letterSpacing: 0 }}>von {m.kontingent[k]} offen</span></div><div className="hm-bar" style={{ gridTemplateColumns: "1fr", marginTop: 8 }}><div className="tr"><i style={{ width: (m.verbraucht[k] / m.kontingent[k] * 100) + "%" }}></i></div></div></div>)}</div>
      {w && <div className="hm-card hm-dark" style={{ marginTop: 16 }}><div className="hm-mono">Empfohlen für dich</div><div className="hm-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", marginTop: 12 }}>{[["Markt-Carousel Oktober", "Deine Säule Markt ist unterbesetzt. Aus LENS-Daten für " + (w.bezirke[0] || "deinen Bezirk").replace(/^\d{4}\s/, "") + ", aus dem Kontingent.", "carousel"], ["Visitenkarten aus dem Brand-Profil", "Dein Branding steht. 250 Stück, druckfertig in Minuten.", "visitenkarte"]].map(([t, x, id]) => <div key={id} style={{ padding: 14, borderRadius: 14, background: "rgba(247,245,241,.08)" }}><div style={{ fontSize: 17 }}>{t}</div><div style={{ fontSize: 13, color: "var(--text-inverse-muted)", margin: "4px 0 12px", lineHeight: 1.45 }}>{x}</div><Btn paper onClick={() => bestellen(HM_KATALOG.find((k) => k.id === id))}>Bestellen</Btn></div>)}</div></div>}
      <div className="hm-row" style={{ marginTop: 28, justifyContent: "space-between" }}><h3 className="hm-h hm-h2">Katalog</h3><div className="hm-seg">{[["alle", "Alle"], ["standard", "Content"], ["print", "Print"], ["sonder", "Sonder"]].map(([k, t]) => <button key={k} className={kat === k ? "on" : ""} onClick={() => setKat(k)}>{t}</button>)}</div></div>
      <div className="hm-karten" style={{ marginTop: 14 }}>{liste.map((k) => <div key={k.id} className="hm-karte"><div className="tx" style={{ gap: 8, minHeight: 190 }}><div className="hm-row" style={{ justifyContent: "space-between" }}><span className="hm-mono">{k.art === "print" ? "Print" : k.art === "sonder" ? "Sonder" : k.team ? "Mit Drehtag" : "Automatisch"}</span><span className="hm-mono" style={{ color: "var(--ink)" }}>{k.preis == null ? "Auf Anfrage" : k.preis === 0 ? "Im Kontingent" : k.preis + " €"}</span></div><div className="t">{k.name}</div><div className="s">{k.was}</div>{k.kontingent && k.preis === 0 && <div className="hm-mono">{rest(k.kontingent)} {k.kontingent} offen</div>}{k.art === "sonder" && <input className="hm-inp" style={{ display: "block", border: 0, background: "var(--paper-2)", borderRadius: 10, padding: "9px 12px", fontSize: 14, width: "100%" }} placeholder="Was brauchst du?" value={sonder} onChange={(e) => setSonder(e.target.value)} />}<div style={{ marginTop: "auto" }}><Btn ghost onClick={() => bestellen(k)}>{k.art === "sonder" ? "Anfragen" : "Bestellen"}</Btn></div></div></div>)}</div>
      <h3 className="hm-h hm-h2" style={{ marginTop: 36 }}>Meine Aufträge</h3>
      <div className="hm-list" style={{ marginTop: 10 }}>{auftraege.map((o) => <div key={o.id} className="hm-card" style={{ marginBottom: 10, display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 14, alignItems: "center" }}><div><div className="hm-row" style={{ justifyContent: "space-between" }}><div style={{ fontSize: 17, color: "var(--ink)" }}>{o.name}</div><span className="hm-mono">{hmFmtDate(o.datum)} · {o.wer} · {o.preis == null ? "Preis nach Prüfung" : o.preis === 0 ? "Kontingent" : o.preis + " €"}</span></div><div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 4, marginTop: 12 }}>{HM_STUFEN.map((s, i) => <div key={s}><div style={{ height: 4, borderRadius: 2, background: i <= o.stufe ? "var(--ink)" : "var(--paper-2)" }}></div><div className="hm-mono" style={{ marginTop: 6, color: i === o.stufe ? "var(--ink)" : "" }}>{s}</div></div>)}</div>{o.vorschlag && o.zustand !== "fertig" && <div style={{ marginTop: 10, fontSize: 13, color: "var(--signal-deep)" }}>Vorschlag vom Team: als {HM_FORMATE[o.vorschlag].name} aus dem Kontingent statt Aufpreis.</div>}</div><Pill z={o.zustand} /></div>)}{!auftraege.length && <div className="hm-empty">Noch keine Aufträge.</div>}</div>
    </div>
  );
}

/* ---------- Report und Review ---------- */
function Report({ m, st }) {
  const reports = ((useHm("reports") || {})[m.id]) || [];
  const [i, setI] = useState(reports.length - 1);
  const r = reports[i];
  if (!r) return <div><div className="hm-mono">Report</div><h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>Der erste Report kommt nach dem ersten Monat live.</h2><p className="hm-sub">Reichweite, Saves, Sends, Follower, deine besten Posts und drei Empfehlungen. Automatisch am Monatsersten.</p></div>;
  const prev = reports[i - 1];
  const delta = (k) => prev ? Math.round((r[k] - prev[k]) / prev[k] * 100) : null;
  const KZ = [["reach", "Reichweite"], ["follower", "Follower"], ["saves", "Saves"], ["sends", "Sends"]];
  const quartal = reports.length >= 3;
  return (
    <div>
      <div className="hm-row" style={{ justifyContent: "space-between" }}><div><div className="hm-mono">Report</div><h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>{hmMonatName(r.monat + "-01")}</h2></div><div className="hm-seg">{reports.map((x, j) => <button key={x.monat} className={j === i ? "on" : ""} onClick={() => setI(j)}>{new Date(x.monat + "-01").toLocaleDateString("de-AT", { month: "short" })}</button>)}</div></div>
      <div className="hm-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", marginTop: 24 }}>{KZ.map(([k, t]) => { const d = delta(k); return <div key={k} className="hm-card" style={{ padding: 18 }}><div className="hm-mono">{t}</div><div style={{ fontSize: 36, letterSpacing: "-.03em", color: "var(--ink)", marginTop: 6, fontVariantNumeric: "tabular-nums" }}>{r[k].toLocaleString("de-AT")}</div>{d != null && <div className="hm-mono" style={{ color: d >= 0 ? "var(--positive)" : "var(--signal-deep)", marginTop: 4 }}>{d >= 0 ? "+" : ""}{d} % zum Vormonat</div>}</div>; })}</div>
      <div className="hm-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", marginTop: 16 }}>
        <div className="hm-card"><div className="hm-mono">Verlauf Reichweite</div><Sparkline data={reports.map((x) => x.reach)} aktiv={i} /><div className="hm-row" style={{ justifyContent: "space-between", marginTop: 6 }}>{reports.map((x) => <span key={x.monat} className="hm-mono">{new Date(x.monat + "-01").toLocaleDateString("de-AT", { month: "short" })}</span>)}</div></div>
        <div className="hm-card"><div className="hm-mono">Beste Posts · {r.posts} Posts · Gesicht in {r.gesicht} %</div><div className="hm-hooks" style={{ marginTop: 6 }}>{r.beste.map((b) => <div key={b}>{b}</div>)}</div><div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 10 }}>Sends zählen für Reichweite bei Nicht-Followern am meisten, Saves für Autorität. Beide steigen bei dir.</div></div>
        <div className="hm-card hm-dark"><div className="hm-mono">Drei Empfehlungen</div><div className="hm-hooks" style={{ marginTop: 6 }}>{r.empf.map((e) => <div key={e} style={{ color: "var(--paper)", borderColor: "rgba(247,245,241,.14)" }}>{e}</div>)}</div></div>
      </div>
      {quartal && st && <div className="hm-card" style={{ marginTop: 16 }}>
        <div className="hm-row" style={{ justifyContent: "space-between" }}><div><div className="hm-mono">Quartals-Review · Q3 2026 · Strategie Version {st.version}</div><h3 className="hm-h hm-h2" style={{ marginTop: 6 }}>Was sich geändert hat.</h3></div><Pill z={st.version >= 2 ? "fertig" : "geplant"} /></div>
        <div className="hm-beats" style={{ marginTop: 14 }}>{[["Reichweite", `+${Math.round((reports[2].reach - reports[0].reach) / reports[0].reach * 100)} % in drei Monaten, TikTok liefert den größten Anteil.`], ["Säulen", "Persönlich und Grätzl tragen. Markt ist zu klein, Version 2 hebt Markt von 15 auf 25 %."], ["Formate", "Grätzl-Spaziergang ist dein stärkstes Format. Talking Heads werden kürzer (30 statt 60 s)."], ["Rhythmus", "13 Posts pro Monat gehalten. Ziel bleibt 3 bis 4 pro Woche, Stories täglich."], ["Ziel", `${st.wege[st.gewaehlt].ziel}: erste Anfragen aus Instagram, 6 bis 12 Monate für stabile Wirkung.`], ["Nächstes Gespräch", "45 Minuten mit Daniel, Dossier liegt bereit."]].map(([t, x]) => <div key={t} className="hm-beat"><b>{t}</b>{x}</div>)}</div>
      </div>}
    </div>
  );
}
function Sparkline({ data, aktiv }) {
  const W = 320, H = 90, max = Math.max(...data), min = Math.min(...data) * .8;
  const pts = data.map((v, i) => [10 + i * ((W - 20) / Math.max(1, data.length - 1)), H - 10 - (v - min) / (max - min || 1) * (H - 30)]);
  return <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", marginTop: 8, display: "block" }}><path d={`M${pts.map((p) => p.join(",")).join(" L")} L${pts[pts.length - 1][0]},${H} L${pts[0][0]},${H} Z`} fill="var(--signal-soft)" /><path d={`M${pts.map((p) => p.join(",")).join(" L")}`} fill="none" stroke="var(--ink)" strokeWidth="1.5" />{pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={i === aktiv ? 5 : 3} fill={i === aktiv ? "var(--signal)" : "var(--ink)"} />)}</svg>;
}

/* ---------- Nachrichten (Makler) ---------- */
function Nachrichten({ m, schritte }) {
  const msgs = (useHm("nachrichten") || []).filter((n) => n.maklerId === m.id);
  const [sel, setSel] = useState(null); const [txt, setTxt] = useState("");
  const threads = [...new Set(msgs.map((n) => n.schrittId))];
  const offene = schritte.filter((s) => s.zustand !== "fertig");
  const send = () => { if (!txt.trim() || !sel) return; hmStore.patch("nachrichten", (l) => [...(l || []), { id: Math.random().toString(36).slice(2), maklerId: m.id, schrittId: sel, von: m.name, t: Date.now(), text: txt }]); hmEvent(m.id, "nachricht", "Nachricht an das Team", m.name); setTxt(""); toast("Gesendet. Antwort kommt am Schritt."); };
  const titel = (id) => (schritte.find((s) => s.id === id) || {}).titel || id;
  return (
    <div>
      <div className="hm-mono">Nachrichten</div>
      <h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>Jede Frage hat einen Ort.</h2>
      <p className="hm-sub">Nachrichten hängen immer an einem Schritt. So weiß das Team sofort, worum es geht, und nichts geht in einem Chat verloren.</p>
      <div className="hm-grid" style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)", marginTop: 24 }}>
        <div className="hm-card"><div className="hm-mono">Schritt wählen</div><div className="hm-list" style={{ marginTop: 8 }}>{[...threads.map((id) => schritte.find((s) => s.id === id)).filter(Boolean), ...offene.filter((s) => !threads.includes(s.id))].map((s) => <div key={s.id} className="hm-li" style={{ cursor: "pointer", background: sel === s.id ? "var(--paper-2)" : "", margin: "0 -8px", padding: "10px 8px", borderRadius: 10 }} onClick={() => setSel(s.id)}><div><div className="t">{s.titel}</div><div className="m">{s.owner}{msgs.filter((n) => n.schrittId === s.id).length ? ` · ${msgs.filter((n) => n.schrittId === s.id).length} Nachrichten` : ""}</div></div><Pill z={s.zustand} /><span></span></div>)}</div></div>
        <div className="hm-card"><div className="hm-mono">{sel ? titel(sel) : "Kein Schritt gewählt"}</div><div style={{ marginTop: 8 }}>{msgs.filter((n) => n.schrittId === sel).map((n) => <div key={n.id} className="hm-msg"><span className="hm-av" style={{ background: n.von === m.name ? "var(--ink)" : "var(--signal)", color: n.von === m.name ? "var(--paper)" : "var(--on-signal)" }}>{n.von.slice(0, 1)}</span><div><div className="w">{n.von} · {hmRel(n.t)}</div>{n.text}</div></div>)}{sel && !msgs.filter((n) => n.schrittId === sel).length && <div className="hm-empty" style={{ padding: 20 }}>Noch nichts. Schreib die erste Nachricht.</div>}</div><div className="hm-inp"><input placeholder={sel ? "Deine Frage zu diesem Schritt" : "Erst links einen Schritt wählen"} disabled={!sel} value={txt} onChange={(e) => setTxt(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} /><Btn onClick={send} disabled={!sel}>Senden</Btn></div></div>
      </div>
    </div>
  );
}

/* ---------- Team: Produktion, Tickets, Empfehlungen, Einstellungen ---------- */
function Produktion({ makler }) {
  const drehtage = useHm("drehtage") || []; const posts = useHm("posts") || []; const ideen = useHm("ideen") || [];
  const name = (id) => (makler.find((m) => m.id === id) || {}).name || id;
  const [tab, setTab] = useState("dreh");
  const schnitt = posts.filter((p) => p.zustand === "im_schnitt"); const frei = posts.filter((p) => p.zustand === "freigabe");
  const setPost = (id, z) => hmStore.patch("posts", (l) => l.map((p) => p.id === id ? { ...p, zustand: z, frist: z === "freigabe" ? hmISO(2026, 9, 28) : p.frist } : p));
  return (
    <div>
      <div className="hm-mono">Produktion</div>
      <h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>Drehen, schneiden, liefern.</h2>
      <div className="hm-seg" style={{ marginTop: 18 }}>{[["dreh", `Drehtage · ${drehtage.filter((d) => d.status !== "fertig").length}`], ["schnitt", `Schnitt · ${schnitt.length}`], ["frei", `Freigaben offen · ${frei.length}`], ["ideen", `Ideen-Status`]].map(([k, t]) => <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{t}</button>)}</div>
      {tab === "dreh" && <div className="hm-list" style={{ marginTop: 20 }}>{[...drehtage].sort((a, b) => a.datum.localeCompare(b.datum)).map((d) => <div key={d.id} className="hm-card" style={{ marginBottom: 10 }}><div className="hm-row" style={{ justifyContent: "space-between" }}><div><div style={{ fontSize: 18, color: "var(--ink)" }}>{hmFmtDate(d.datum)} · {d.region}</div><div style={{ fontSize: 13, color: "var(--text-muted)" }}>{d.location} · {d.slots.map((s) => `${name(s.maklerId)} ${s.von} bis ${s.bis}`).join(" · ")}</div></div><div className="hm-row"><Pill z={d.status === "fertig" ? "fertig" : d.status === "vorschlag" ? "offen" : "geplant"} />{d.status === "geplant" && <button className="hm-chip" onClick={() => { hmStore.patch("drehtage", (l) => l.map((x) => x.id === d.id ? { ...x, status: "fertig" } : x)); d.slots.forEach((s) => hmEvent(s.maklerId, "drehtag", `Drehtag ${hmFmtDate(d.datum)} abgeschlossen, Rohmaterial in der Bibliothek`, "Ahmet")); toast("Drehtag abgeschlossen"); }}>Abschließen</button>}</div></div>{d.plan.length ? <div style={{ marginTop: 10, fontSize: 13, color: "var(--text-muted)" }}>Shotlist: {d.plan.length} Shots, {d.plan.filter((p) => p.done).length} erledigt. {d.plan.map((p) => p.shot).join(" · ")}</div> : <div style={{ marginTop: 10, fontSize: 13, color: "var(--signal-deep)" }}>Shotlist fehlt. Entsteht aus {ideen.filter((i) => d.slots.some((s) => s.maklerId === i.maklerId) && i.zustand === "gewaehlt").length} gewählten Ideen.</div>}</div>)}</div>}
      {tab === "schnitt" && <div className="hm-card" style={{ marginTop: 20 }}><div className="hm-mono">Schnitt-Queue · KI-Rohschnitt, Untertitel und Formatvarianten laufen automatisch, Feinschnitt durch Ahmet</div><div className="hm-list" style={{ marginTop: 8 }}>{schnitt.map((p) => <div key={p.id} className="hm-li"><div><div className="t">{p.titel}</div><div className="m">{name(p.maklerId)} · {HM_KANAELE[p.kanal].name} · geplant {hmFmtDate(p.termin)}{p.korrekturen ? ` · Korrekturrunde ${p.korrekturen}` : ""}</div></div><Pill z="in_arbeit" /><Btn ghost onClick={() => { setPost(p.id, "freigabe"); hmEvent(p.maklerId, "freigabe", `${p.titel}: bitte freigeben`, "Ahmet"); toast("An Makler zur Freigabe"); }}>Zur Freigabe</Btn></div>)}{!schnitt.length && <div className="hm-empty">Queue leer.</div>}</div></div>}
      {tab === "frei" && <div className="hm-card" style={{ marginTop: 20 }}><div className="hm-mono">Wartet auf Makler</div><div className="hm-list" style={{ marginTop: 8 }}>{frei.map((p) => <div key={p.id} className="hm-li"><div><div className="t">{p.titel}</div><div className="m">{name(p.maklerId)} · Auto-Freigabe {hmFmtDate(p.frist)} · Runde {p.korrekturen || 0} von 2</div></div><Pill z="freigabe" /><button className="hm-chip" onClick={() => { hmEvent(p.maklerId, "erinnerung", `Erinnerung: ${p.titel} freigeben`, "Ahmet"); toast("Erinnert"); }}>Erinnern</button></div>)}</div></div>}
      {tab === "ideen" && <div className="hm-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", marginTop: 20 }}>{makler.map((m) => { const mi = ideen.filter((i) => i.maklerId === m.id); if (!mi.length) return <div key={m.id} className="hm-card"><div className="hm-mono">{m.name}</div><div className="hm-empty" style={{ marginTop: 8, padding: 16 }}>Noch keine Ideen, Strategie fehlt.</div></div>; return <div key={m.id} className="hm-card"><div className="hm-mono">{m.name} · Oktober</div><div className="hm-bars" style={{ marginTop: 10 }}>{["gewaehlt", "vorgeschlagen", "verworfen", "spaeter"].map((z) => <div key={z} className="hm-bar"><span>{{ gewaehlt: "Gewählt", vorgeschlagen: "Offen", verworfen: "Verworfen", spaeter: "Später" }[z]}</span><div className="tr"><i style={{ width: mi.filter((i) => i.zustand === z).length / mi.length * 100 + "%" }}></i></div><span className="v">{mi.filter((i) => i.zustand === z).length}</span></div>)}</div></div>; })}</div>}
    </div>
  );
}

function Tickets({ makler }) {
  const tickets = useHm("tickets") || [];
  const name = (id) => (makler.find((m) => m.id === id) || {}).name || id;
  const [neu, setNeu] = useState("");
  const set = (id, z) => hmStore.patch("tickets", (l) => l.map((t) => t.id === id ? { ...t, zustand: z } : t));
  return (
    <div>
      <div className="hm-mono">Tickets · {tickets.filter((t) => t.zustand !== "fertig").length} offen</div>
      <h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>Sonderwünsche und Blocker.</h2>
      <p className="hm-sub">Ein Ticket ist ein Schritt mit Owner und Frist, nur außerhalb der Etappen. Es entsteht aus Sonderformaten im Shop, aus Nachrichten oder von Hand.</p>
      <div className="hm-inp" style={{ maxWidth: 560, marginTop: 20 }}><input placeholder="Neues Ticket, z. B. Drohnengenehmigung 1190 prüfen" value={neu} onChange={(e) => setNeu(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && neu.trim()) { hmStore.patch("tickets", (l) => [...l, { id: "t" + Date.now(), maklerId: null, titel: neu, owner: "Daniel", zustand: "offen", faellig: hmISO(2026, 9, 30), text: "" }]); setNeu(""); toast("Ticket angelegt"); } }} /></div>
      <div className="hm-list" style={{ marginTop: 20 }}>{[...tickets].sort((a, b) => (a.zustand === "fertig") - (b.zustand === "fertig") || a.faellig.localeCompare(b.faellig)).map((t) => <div key={t.id} className="hm-card" style={{ marginBottom: 10, display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto auto", gap: 14, alignItems: "center" }}><div><div style={{ fontSize: 17, color: "var(--ink)" }}>{t.titel}</div><div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>{t.maklerId ? name(t.maklerId) + " · " : ""}{t.owner} · bis {hmFmtDate(t.faellig)}{t.faellig < HM_HEUTE && t.zustand !== "fertig" ? " · überfällig" : ""}{t.text ? ` · ${t.text}` : ""}</div></div><Pill z={t.zustand} /><select className="hm-sel" value={t.zustand} onChange={(e) => set(t.id, e.target.value)}>{Object.entries(HM_ZUSTAND).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>)}</div>
    </div>
  );
}

function Empfehlungen({ makler, nurMakler }) {
  const drehtage = useHm("drehtage") || []; const posts = useHm("posts") || []; const auftraege = useHm("auftraege") || []; const ideen = useHm("ideen") || [];
  const status = useHm("empf_status") || {};
  const alle = useMemo(() => hmEngine({ drehtage, posts, makler, auftraege, ideen }), [drehtage, posts, makler, auftraege, ideen]);
  const list = alle.filter((e) => nurMakler ? (e.maklerId === nurMakler && e.fuer !== "team") : e.fuer !== "makler");
  const setS = (id, s) => hmStore.patch("empf_status", (all) => ({ ...(all || {}), [id]: s }));
  const ausfuehren = (e) => {
    if (e.aktion && e.aktion.typ === "merge") { const a = drehtage.find((d) => d.id === e.aktion.a), b = drehtage.find((d) => d.id === e.aktion.b); hmStore.patch("drehtage", (l) => l.filter((d) => d.id !== b.id).map((d) => d.id === a.id ? { ...d, slots: [...d.slots, ...b.slots.map((s) => ({ ...s, von: "13:00", bis: "16:00" }))], status: "geplant", location: d.location === "offen" ? `Region ${d.region}, Ort folgt` : d.location } : d)); b.slots.forEach((s) => hmEvent(s.maklerId, "drehtag", `Drehtag auf ${hmFmtDate(a.datum)} zusammengelegt (Sammel-Drehtag ${a.region})`, "Team")); }
    if (e.aktion && e.aktion.typ === "standard") { hmStore.patch("auftraege", (l) => l.map((o) => o.id === e.aktion.auftrag ? { ...o, zustand: "wartet_makler", stufe: 1, preis: 0, kontingent: "videos" } : o)); const o = auftraege.find((x) => x.id === e.aktion.auftrag); hmEvent(o.maklerId, "auftrag", "Vorschlag: Standardformat aus dem Kontingent statt Sonderformat", "Daniel"); }
    if (e.aktion && e.aktion.typ === "zweit") { const p = posts.find((x) => x.id === e.aktion.post); hmStore.patch("posts", (l) => [...l, ...["tiktok", "facebook"].map((k) => ({ ...p, id: p.id + "-" + k, kanal: k, titel: p.titel + " (Zweitverwertung)", termin: hmISO(2026, 10, 3), zustand: "geplant", kz: undefined }))]); hmEvent(p.maklerId, "post", `${p.titel}: für TikTok und Facebook geplant`, "System"); }
    setS(e.id, "angenommen"); toast("Angenommen und ausgeführt");
  };
  const offen = list.filter((e) => !status[e.id]);
  const summe = offen.reduce((n, e) => n + (HM_REGELN.find((r) => r.id === e.regel) || {}).ersparnis * (typeof (HM_REGELN.find((r) => r.id === e.regel) || {}).ersparnis === "number" && (HM_REGELN.find((r) => r.id === e.regel) || {}).einheit.startsWith("h") ? 1 : 0), 0);
  return (
    <div>
      {!nurMakler && <><div className="hm-mono">Empfehlungs-Engine · {HM_REGELN.length} Regeln · {offen.length} offen</div><h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>{offen.length ? `${summe.toFixed(1).replace(".", ",")} Stunden liegen auf dem Tisch.` : "Nichts liegt auf dem Tisch."}</h2><p className="hm-sub">Jede Empfehlung ist eine Rechnung aus den Daten: Regel, Betroffene, Ersparnis, eine Handlung. Ablehnen speichert den Grund und verbessert die Regel.</p></>}
      <div className="hm-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", marginTop: nurMakler ? 20 : 24 }}>
        {list.map((e) => { const s = status[e.id]; const R = HM_REGELN.find((r) => r.id === e.regel) || {}; return <div key={e.id} className={"hm-card" + (s ? "" : " hm-dark")} style={{ display: "flex", flexDirection: "column", gap: 10, opacity: s ? .7 : 1 }}><div className="hm-row" style={{ justifyContent: "space-between" }}><span className="hm-mono">{R.name || e.regel}{e.maklerId && !nurMakler ? ` · ${(makler.find((m) => m.id === e.maklerId) || {}).name}` : ""}</span>{s && <Pill z={s === "angenommen" ? "fertig" : "blockiert"} />}</div><div style={{ fontSize: 19, letterSpacing: "-.01em" }}>{e.titel}</div><div style={{ fontSize: 14, lineHeight: 1.5, color: s ? "var(--text-muted)" : "var(--text-inverse-muted)" }}>{e.text}</div><div className="hm-mono" style={{ color: s ? "" : "var(--signal)" }}>Ersparnis: {e.ersparnis}</div>{!s && <div className="hm-row" style={{ marginTop: 4 }}><Btn paper onClick={() => ausfuehren(e)}>Annehmen</Btn><button className="hm-chip" style={{ color: "var(--paper)", boxShadow: "inset 0 0 0 1px rgba(247,245,241,.3)" }} onClick={() => { setS(e.id, "abgelehnt"); toast("Abgelehnt, Grund gespeichert"); }}>Ablehnen</button></div>}</div>; })}
        {!list.length && <div className="hm-empty">Keine Regel feuert.</div>}
      </div>
    </div>
  );
}

function Einstellungen() {
  const [tab, setTab] = useState("katalog");
  return (
    <div>
      <div className="hm-mono">Einstellungen · Admin</div>
      <h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>Was das System weiß.</h2>
      <div className="hm-seg" style={{ marginTop: 18 }}>{[["katalog", "Katalog und Abos"], ["regeln", "Regeln"], ["prompts", "Strategie-Schema"], ["adapter", "Datenschicht"]].map(([k, t]) => <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{t}</button>)}</div>
      {tab === "katalog" && <><div className="hm-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", marginTop: 20 }}>{HM_ABOS.map((a) => <div key={a.id} className="hm-card"><div className="hm-mono">Abo</div><div style={{ fontSize: 22, color: "var(--ink)", marginTop: 4 }}>{a.name}</div><div style={{ fontSize: 30, letterSpacing: "-.03em", color: "var(--ink)" }}>{a.preis} € <span style={{ fontSize: 13, color: "var(--text-muted)", letterSpacing: 0 }}>pro Monat · {a.note}</span></div><div className="hm-tags" style={{ marginTop: 10 }}>{Object.entries(a.kontingent).map(([k, v]) => <span key={k} className="hm-tag">{v} {k}</span>)}<span className="hm-tag">{a.drehtage} Drehtag</span></div></div>)}</div><div className="hm-card" style={{ marginTop: 12 }}><div className="hm-mono">Katalog · {HM_KATALOG.length} Positionen</div><div className="hm-list" style={{ marginTop: 8 }}>{HM_KATALOG.map((k) => <div key={k.id} className="hm-li"><div><div className="t">{k.name}</div><div className="m">{k.was}</div></div><span className="hm-mono">{k.team ? "Team" : "Automatisch"}</span><span className="hm-mono" style={{ color: "var(--ink)" }}>{k.preis == null ? "Anfrage" : k.preis === 0 ? "Kontingent" : k.preis + " €"}</span></div>)}</div><div style={{ fontSize: 13, color: "var(--signal-deep)", marginTop: 12 }}>Offen (Plan Kap. 14, Frage 1): Der Shop im Dashboard nennt 3 oder 5 Videos und 2 oder 7 Grafiken. Hier gilt 3/10/7 und 5/15/7 als Arbeitsstand.</div></div></>}
      {tab === "regeln" && <div className="hm-card" style={{ marginTop: 20 }}><div className="hm-list">{HM_REGELN.map((r) => <div key={r.id} className="hm-li" style={{ gridTemplateColumns: "minmax(0, 1fr) auto" }}><div><div className="t">{r.name}</div><div className="m">{r.was} Auslöser: {r.param}.</div></div><span className="hm-mono" style={{ color: "var(--ink)" }}>{r.ersparnis != null ? `${r.ersparnis} ${r.einheit}` : r.einheit}</span></div>)}</div></div>}
      {tab === "prompts" && <div className="hm-card" style={{ marginTop: 20 }}><div className="hm-mono">Ausgabe-Schema der Strategie · 13 Abschnitte · Prototyp regelbasiert, Produktion Claude API mit diesem Schema</div><div className="hm-beats" style={{ marginTop: 12 }}>{["Positionierungssatz", "Brand Story in 8 Beats", "Archetyp mit Leitplanken", "Zielmilieus (2) mit Code", "Persönlichkeitsprofil (5 Werte) und Tonalität", "Distinctive Assets", "Content-Säulen (4 bis 5) mit Anteil", "Formate, Kanäle, Frequenz", "30 Hooks, säulen-getaggt", "Bio-Texte", "90-Tage-Plan", "Ziele und Messgrößen", "Branding-Empfehlung (3 Farbwelten)"].map((t, i) => <div key={t} className="hm-beat"><b>{String(i + 1).padStart(2, "0")}</b>{t}</div>)}</div><div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 12 }}>Eingaben: 31 Fragebogen-Antworten, Workshop-Transkript, UNIO-Storyline, Milieu-Wissen. Regel: Weg A ist Platz eins der Rangliste, Weg B der beste Kandidat auf einer anderen Achse (Autorität, Nähe, Moderne).</div></div>}
      {tab === "adapter" && <div className="hm-card" style={{ marginTop: 20 }}><div className="hm-mono">Datenschicht · hmStore</div><div className="hm-list" style={{ marginTop: 8 }}>{[["Implementierung", "localStorage, Präfix unio_hm_, Storage-Events für Live-Sync zwischen Fenstern"], ["Sammlungen", "makler, schritte, fragebogen, strategien, setups, drehtage, ideen, posts, assets, auftraege, tickets, reports, nachrichten, events, empf_status"], ["Schnittstelle", "get(key), put(key, value), patch(key, fn), on(listener), reset()"], ["Umstellung", "Zweite Implementierung mit gleicher Schnittstelle gegen Supabase (Postgres, Auth, Storage, Realtime) oder Zero-One (HTTP). Screens bleiben unverändert."], ["Integrationen (Stubs)", "Kalender (Cal.com), Posting (Planable, Metricool, Meta Graph API), Transkription (Whisper), E-Signatur (Yousign), Speicher (Vercel Blob), Benachrichtigung (Gmail vorhanden, WhatsApp Business API)"]].map(([t, x]) => <div key={t} className="hm-li" style={{ gridTemplateColumns: "160px minmax(0, 1fr)" }}><span className="hm-mono" style={{ color: "var(--ink)" }}>{t}</span><span style={{ fontSize: 14 }}>{x}</span></div>)}</div></div>}
    </div>
  );
}

Object.assign(window, { Aufbau, Inhalte, Kalender, Auftraege, Report, Nachrichten, Produktion, Tickets, Empfehlungen, Einstellungen, hmEngine, HM_HEUTE });
