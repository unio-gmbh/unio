/* UNIO HUMAN. Datenbasis für Einrichtung, Branding, Content-Produktion und Team (v2).
   Funktionsumfang orientiert sich an Lucida OS (Content Board, 4 Phasen je Inhalt, Kalender,
   Freigaben, Insights, Marketing-Brief, Meetings, Kontakte, Ressourcen), Wording und Aufbau neu.
   Demo-Material ausschließlich aus dem UNIO-Repo (assets/img, assets/photos, assets/video). */

const HM_UNIO_SOCIAL_MAIL = "social@unio.at";   // ZU BESTÄTIGEN: Adresse, die Makler als Admin hinterlegen
const HM_UNIO_META_BUSINESS = "UNIO GmbH";       // Name des Meta-Business-Kontos für Partner-Zugriff

/* ---------- Einrichtung (Diagramm: Block On-Boarding) ---------- */
const HM_EINRICHTUNG = [
  { id: "vertrag", titel: "Vertrag", satz: "Einmal lesen, digital unterschreiben.", dauer: "3 Min", wer: "Du", gruppe: "Start" },
  { id: "plattform", titel: "UNIO kennenlernen", satz: "In vier Bildern, wie du hier arbeitest.", dauer: "4 Min", wer: "Du", gruppe: "Start" },
  { id: "import", titel: "Kunden und Objekte übernehmen", satz: "Deinen Bestand bringen wir mit, du wählst nur die Quelle.", dauer: "5 Min", wer: "Du und Team", gruppe: "Start" },
  { id: "konten", titel: "Social-Media-Konten", satz: "Vorhandene verbinden oder neue anlegen, Schritt für Schritt.", dauer: "10 bis 20 Min", wer: "Du", gruppe: "Sichtbarkeit" },
  { id: "foto", titel: "Portrait-Fotos", satz: "Termin buchen oder eigene Fotos hochladen.", dauer: "2 Min", wer: "Du", gruppe: "Sichtbarkeit" },
  { id: "strategie", titel: "Strategie-Termin", satz: "Das Gespräch mit Daniel, danach steht deine Marke.", dauer: "2 Min", wer: "Du", gruppe: "Marke" },
  { id: "backoffice", titel: "Backoffice", satz: "Shop, Girafee und Orakel in je einer Minute.", dauer: "3 Min", wer: "Du", gruppe: "Werkzeuge" },
  { id: "visitenkarten", titel: "Visitenkarten", satz: "Entstehen aus deinem Branding. Prüfen, bestellen, fertig.", dauer: "1 Min", wer: "Du", gruppe: "Marke", braucht: "branding" },
  { id: "shop", titel: "Shop einrichten", satz: "Foto und Logo für alle Bestellungen hinterlegen.", dauer: "1 Min", wer: "Du", gruppe: "Werkzeuge", braucht: "branding" },
  { id: "tutorials", titel: "Tutorials", satz: "Kurze Videos, wann immer du sie brauchst.", dauer: "je 2 Min", wer: "Du", gruppe: "Werkzeuge" },
];

const HM_PLATTFORMEN = [
  { id: "instagram", name: "Instagram", pflicht: true, farbe: "#C13584",
    anlegen: ["Instagram-App öffnen und auf Registrieren tippen", "Mit deiner geschäftlichen E-Mail-Adresse anmelden, nicht mit der privaten", "Benutzernamen wählen (Vorschläge unten)", "Profilbild: dein Portrait aus dem Zuschnitt", "Einstellungen, Kontotyp und Tools, zu professionellem Konto wechseln, Kategorie Immobilienmakler"],
    haben: ["Einstellungen, Kontotyp und Tools öffnen", "Zu professionellem Konto wechseln, falls noch privat", "Kategorie Immobilienmakler wählen", "Kontaktdaten auf geschäftlich stellen"] },
  { id: "facebook", name: "Facebook-Seite", pflicht: true, farbe: "#1877F2",
    anlegen: ["facebook.com/pages/create öffnen", "Seitenname: dein Name plus Immobilien", "Kategorie Immobilienmakler", "Profil- und Titelbild aus dem Brand-Kit hochladen", "Seite mit deinem Instagram-Konto verknüpfen (Einstellungen, Verknüpfte Konten)"],
    haben: ["Seite öffnen, Einstellungen, Verknüpfte Konten", "Instagram verknüpfen, damit Beiträge gespiegelt werden"] },
  { id: "linkedin", name: "LinkedIn", pflicht: false, farbe: "#0A66C2",
    anlegen: ["linkedin.com öffnen, Jetzt Mitglied werden", "Titelzeile aus deinem Positionierungssatz übernehmen (unten)", "Portrait und Banner aus dem Brand-Kit hochladen", "Standort Wien, Branche Immobilien"],
    haben: ["Profil öffnen, Titelzeile anpassen (Vorschlag unten)", "Banner aus dem Brand-Kit hochladen"] },
  { id: "tiktok", name: "TikTok", pflicht: false, farbe: "#111111",
    anlegen: ["TikTok-App öffnen und mit der geschäftlichen E-Mail registrieren", "Profil, Menü, Konto verwalten, zu Business-Konto wechseln", "Kategorie Immobilien wählen"],
    haben: ["Menü, Konto verwalten, zu Business-Konto wechseln"] },
];

const HM_IMPORT_QUELLEN = ["onOffice", "Propstack", "JUSTIMMO", "Excel oder CSV", "willhaben-Profil", "Ich habe noch keinen Bestand"];

const HM_BACKOFFICE = [
  { id: "shop", titel: "Shop", satz: "Hier bestellst du Fotos, Videos, Print und Kampagnen. Standardformate laufen ohne Rückfrage, Sonderwünsche gehen als Ticket an uns." },
  { id: "girafee", titel: "Girafee", satz: "Kurzbeschreibung folgt vom Team. Hier steht später in zwei Sätzen, wofür du Girafee im Alltag nutzt." },
  { id: "orakel", titel: "Orakel", satz: "Kurzbeschreibung folgt vom Team. Hier steht später in zwei Sätzen, wofür du das Orakel im Alltag nutzt." },
];

const HM_TUTORIALS = [
  { id: "t1", titel: "So gibst du einen Beitrag frei", dauer: "1:40", video: "hinter-unio.mp4", poster: "../../assets/video/hinter-unio-poster.jpg" },
  { id: "t2", titel: "Ideen wählen in zwei Minuten", dauer: "2:05", video: "hinter-unio.mp4", poster: "../../assets/video/hinter-unio-poster.jpg" },
  { id: "t3", titel: "Drehtag: was du mitbringst", dauer: "1:20", video: "hufhaus.mp4", poster: "../../assets/img/hero-poster.jpg" },
  { id: "t4", titel: "Material hochladen vom Handy", dauer: "1:10", video: "explore-design.mp4", poster: "../../assets/photos/villen-abend.jpg" },
  { id: "t5", titel: "Deine Zahlen lesen", dauer: "2:30", video: "hero-fenster.mp4", poster: "../../assets/img/vienna-facades.jpg" },
];

/* ---------- Branding-Studio ---------- */
/* Schriftpaare und Akzentfarben 1:1 aus dem Design-Panel der Makler-Homepages (showcase/showcase1-6.html),
   damit das Branding ohne Übersetzung auf der Website landet. */
const HM_WEB_SCHRIFTEN = {
  editorial: { name: "Editorial", d: "Fraunces", t: "Hanken Grotesk" },
  klassisch: { name: "Klassisch", d: "Playfair Display", t: "Manrope" },
  zeitlos: { name: "Zeitlos", d: "DM Serif Display", t: "Manrope" },
  modern: { name: "Modern", d: "Space Grotesk", t: "Manrope" },
  unio: { name: "UNIO", d: "Power Grotesk", t: "Power Grotesk" },
};
const HM_WEB_AKZENTE = [
  { id: "orange", name: "UNIO Orange", hex: "#FFAA09" }, { id: "loden", name: "Loden", hex: "#33503F" },
  { id: "bordeaux", name: "Bordeaux", hex: "#6E2A3C" }, { id: "nachtblau", name: "Nachtblau", hex: "#1F3A5F" },
  { id: "terrakotta", name: "Terrakotta", hex: "#B45B3E" }, { id: "aubergine", name: "Aubergine", hex: "#4A2E52" },
  { id: "petrol", name: "Petrol", hex: "#1E4E4A" },
];
/* Empfehlung je Figur: zwei Schriftpaare, zwei Akzente */
const HM_SCHRIFTPAARE = {
  kenner: ["klassisch", "modern"], begleiter: ["editorial", "zeitlos"], gestalter: ["modern", "unio"],
  entdecker: ["editorial", "modern"], fels: ["zeitlos", "klassisch"], gastgeber: ["editorial", "unio"],
};
const HM_AKZENT_EMPF = {
  kenner: ["nachtblau", "petrol"], begleiter: ["terrakotta", "loden"], gestalter: ["orange", "aubergine"],
  entdecker: ["loden", "orange"], fels: ["bordeaux", "nachtblau"], gastgeber: ["terrakotta", "orange"],
};
const HM_LOOKS = [
  { n: 1, name: "Editorial Blend", satz: "Dein Name groß über dem Portrait.", bild: "../../assets/img/shop-look-1.jpg" },
  { n: 2, name: "Co-Brand", satz: "Objekt im Hero, du als Marke daneben.", bild: "../../assets/img/shop-look-2.jpg" },
  { n: 3, name: "System-nah", satz: "Hell, nah an der UNIO-Marke.", bild: "../../assets/img/shop-look-3.jpg" },
  { n: 4, name: "Split-Duo", satz: "Links Objekt, rechts du.", bild: "../../assets/img/shop-look-4.jpg" },
  { n: 5, name: "Makler rechts", satz: "Dein Portrait als hohes Panel.", bild: "../../assets/img/shop-look-5.jpg" },
  { n: 6, name: "Name im Rücken", satz: "Dein Nachname hinter dem Kopf.", bild: "../../assets/img/shop-look-6.jpg" },
];
const HM_LOGO_TYPEN = [
  { id: "wort", name: "Wortmarke", satz: "Dein Name, gesetzt in deiner Schrift. Am besten wiedererkennbar." },
  { id: "monogramm", name: "Monogramm", satz: "Deine Initialen im Kreis. Stark als Profilbild." },
  { id: "punkt", name: "Name mit Zeichen", satz: "Name plus ein Akzentpunkt in deiner Farbe." },
];
const HM_MATERIAL_ARTEN = ["Altes Logo", "Fotos von dir", "Objektfotos", "Inspiration", "Screenshot von Profilen", "Sonstiges"];

/* Prompt für eine spätere Higgsfield-Anbindung: Bildwelt aus Branding und Fragebogen */
function hmBildweltPrompt(w, a, br) {
  const akz = br && br.akzent ? (HM_WEB_AKZENTE.find((x) => x.id === br.akzent) || {}).hex : (w.palette || [])[2];
  const milieu = (w.milieus || []).map((x) => x.bild).join("; ");
  return [
    `Editorial real estate photography, Vienna, ${w.bezirke.length ? w.bezirke.join(", ").replace(/\d{4}\s/g, "") : "Wien"}`,
    milieu ? `living worlds: ${milieu}` : "",
    `mood: ${w.archetyp.leitidee}`,
    `colour world anchored on ${akz}`,
    (a && a.bildpaare && Object.values(a.bildpaare).filter((v) => v === "a").length >= 3) ? "warm golden light, people in frame, tactile materials" : "cool daylight, clean architecture, calm composition",
    "natural, no text, no logos, 4:5",
  ].filter(Boolean).join(", ");
}

/* ---------- Content-Produktion (Lucida-Umfang) ---------- */
const HM_SPALTEN = [
  { id: "idee", name: "Idee", makler: "Ideen", farbe: "var(--steel)" },
  { id: "planung", name: "Planung", makler: "In Arbeit", farbe: "#E69600" },
  { id: "dreh", name: "Dreh", makler: "In Arbeit", farbe: "#5E7A8E" },
  { id: "schnitt", name: "Schnitt", makler: "In Arbeit", farbe: "#7E3E22" },
  { id: "freigabe", name: "Zur Freigabe", makler: "Wartet auf dich", farbe: "#FFAA09" },
  { id: "aenderung", name: "Änderung", makler: "In Arbeit", farbe: "#B87400" },
  { id: "freigegeben", name: "Freigegeben", makler: "Geplant", farbe: "#48684E" },
  { id: "online", name: "Online", makler: "Online", farbe: "#3F7A52" },
  { id: "pausiert", name: "Pausiert", makler: "Pausiert", farbe: "#B9B4AA" },
];
const HM_TYPEN = { reel: "Reel", carousel: "Carousel", beitrag: "Beitrag", story: "Story" };
const HM_PHASEN = [
  { id: 1, name: "Idee und Skript", satz: "Was wird gesagt, wer ist dabei, wann wird gedreht." },
  { id: 2, name: "Dreh und Schnitt", satz: "Material wählen, automatisch schneiden, feinschleifen." },
  { id: 3, name: "Text und Termin", satz: "Caption, Kanäle, Veröffentlichung." },
  { id: 4, name: "Freigabe", satz: "Vorschau prüfen, freigeben, einplanen." },
];
const HM_VORLAGEN = [
  { id: "v1", global: true, name: "Reel · Drei Fehler", woerter: 50, text: "\"Drei Fehler, die ich bei fast jedem Verkauf sehe.\"\n\"Erstens: ...\"\n\"Zweitens: ...\"\n\"Drittens: ...\"\n\"Welcher davon kostet am meisten? Schreib es in die Kommentare.\"" },
  { id: "v2", global: true, name: "Reel · Vorher und Nachher", woerter: 30, text: "\"So sah die Wohnung vor sechs Wochen aus.\"\n[Schnitt auf Nachher]\n\"Und so heute. Was hat den Unterschied gemacht?\"" },
  { id: "v3", global: true, name: "Carousel · Erklärstück in fünf Kacheln", woerter: 54, text: "Kachel 1: Frage als Hook\nKachel 2: Warum das wichtig ist\nKachel 3: Die Zahl\nKachel 4: Was du tun kannst\nKachel 5: Speichern und teilen" },
  { id: "v4", global: true, name: "Reel · Meinung und Beleg", woerter: 36, text: "\"Meine Meinung: ...\"\n\"Und hier ist der Beleg: ...\"\n\"Siehst du das anders?\"" },
  { id: "v5", global: true, name: "Reel · Aus deiner Sicht", woerter: 20, text: "\"Du stehst vor der Tür deiner ersten eigenen Wohnung.\"\n\"Das sind die drei Dinge, die du jetzt prüfst.\"" },
  { id: "v6", global: true, name: "Story · Hinter den Kulissen", woerter: 37, text: "Story 1: Ankommen am Objekt\nStory 2: Der Moment der Besichtigung\nStory 3: Frage an die Community mit Umfrage" },
  { id: "v7", global: true, name: "Beitrag · Lange Geschichte", woerter: 20, text: "Ein Satz Einstieg.\nDrei Absätze Geschichte.\nEin Satz Haltung.\nFrage an die Leser." },
];

/* Mediathek: Clips mit Ein- und Ausstieg in UNIO-Videos, dazu Fotos. Tags werden beim Hochladen automatisch vergeben (im Prototyp vorbelegt). */
const HM_CLIPS_SEED = [
  { id: "c1", poster: "../../assets/video/hinter-unio-poster.jpg", typ: "video", src: "hinter-unio.mp4", von: 0.5, bis: 7, titel: "Einstieg in die Kamera", tags: ["Gesicht", "Innen", "Hochformat", "Talking Head"], transkript: "Begrüßung, Blick direkt in die Kamera", quelle: "Beispielmaterial Hinter UNIO" },
  { id: "c2", poster: "../../assets/video/hinter-unio-poster.jpg", typ: "video", src: "hinter-unio.mp4", von: 8, bis: 18, titel: "Erklärung, ruhig", tags: ["Gesicht", "Innen", "Hochformat", "Talking Head"], transkript: "Erklärt einen Ablauf in ruhigem Ton", quelle: "Beispielmaterial Hinter UNIO" },
  { id: "c3", poster: "../../assets/video/hinter-unio-poster.jpg", typ: "video", src: "hinter-unio.mp4", von: 19, bis: 30, titel: "Haltung, energisch", tags: ["Gesicht", "Innen", "Hochformat", "Talking Head"], transkript: "Bezieht Position, mehr Energie", quelle: "Beispielmaterial Hinter UNIO" },
  { id: "c4", poster: "../../assets/video/hinter-unio-poster.jpg", typ: "video", src: "hinter-unio.mp4", von: 31, bis: 44, titel: "Beispiel aus der Praxis", tags: ["Gesicht", "Innen", "Hochformat", "Talking Head"], transkript: "Erzählt ein Beispiel", quelle: "Beispielmaterial Hinter UNIO" },
  { id: "c5", poster: "../../assets/video/hinter-unio-poster.jpg", typ: "video", src: "hinter-unio.mp4", von: 45, bis: 62, titel: "Abschluss und Frage", tags: ["Gesicht", "Innen", "Hochformat", "Talking Head"], transkript: "Fasst zusammen, stellt eine Frage", quelle: "Beispielmaterial Hinter UNIO" },
  { id: "c6", poster: "../../assets/photos/hufhaus-pool-abend.jpg", typ: "video", src: "hufhaus.mp4", von: 0, bis: 5, titel: "Villa mit Pool, Abendlicht", tags: ["Objekt", "Außen", "Querformat", "Drohne"], transkript: "", quelle: "Objektvideo Hufhaus" },
  { id: "c7", poster: "../../assets/img/int-kitchen.jpg", typ: "video", src: "explore-kling-c.mp4", von: 0, bis: 5, titel: "Leere Wohnung, Tageslicht", tags: ["Objekt", "Innen", "Querformat"], transkript: "", quelle: "Objektvideo" },
  { id: "c8", poster: "../../assets/photos/hufhaus-garten.jpg", typ: "video", src: "explore-design.mp4", von: 0, bis: 12, titel: "Garten mit Lavendel", tags: ["Objekt", "Außen", "Hochformat"], transkript: "", quelle: "Objektvideo" },
  { id: "c9", poster: "../../assets/img/vienna-facades.jpg", typ: "video", src: "hero-fenster.mp4", von: 0, bis: 5, titel: "Wien, Blick über die Dächer", tags: ["Stadt", "Außen", "Querformat"], transkript: "", quelle: "UNIO Website" },
  { id: "c10", poster: "../../assets/img/maxingstrasse-zimmer.jpg", typ: "video", src: "transition-riffel-a.mp4", von: 0, bis: 5, titel: "Raum mit Bogenfenster", tags: ["Objekt", "Innen", "Übergang"], transkript: "", quelle: "UNIO Website" },
  { id: "f1", typ: "foto", src: "../../assets/img/albrechts-wohnen.jpg", titel: "Das Albrecht, Wohnen", tags: ["Objekt", "Innen"] },
  { id: "f2", typ: "foto", src: "../../assets/img/albrechts-fassade.jpg", titel: "Das Albrecht, Fassade", tags: ["Objekt", "Außen"] },
  { id: "f3", typ: "foto", src: "../../assets/img/beheim.jpg", titel: "Beheimgasse", tags: ["Objekt", "Außen"] },
  { id: "f4", typ: "foto", src: "../../assets/img/obenzwei-terrasse.jpg", titel: "Oben Zwei, Terrasse", tags: ["Objekt", "Außen"] },
  { id: "f5", typ: "foto", src: "../../assets/img/vienna-street.jpg", titel: "Wiener Straße", tags: ["Stadt", "Außen"] },
  { id: "f6", typ: "foto", src: "../../assets/photos/interieur-esszimmer.jpg", titel: "Esszimmer", tags: ["Objekt", "Innen"] },
  { id: "f7", typ: "foto", src: "../../assets/photos/lifestyle-paar.jpg", titel: "Paar im Wohnraum", tags: ["Menschen", "Innen"] },
  { id: "f8", typ: "foto", src: "../../assets/photos/terrasse-golden.png", titel: "Terrasse im Abendlicht", tags: ["Objekt", "Außen"] },
];

/* Akquise (Diagramm: Block Agent Akquise) */
const HM_AKQUISE_STUFEN = [
  { id: "research", name: "Recherche und Erstkontakt" },
  { id: "kennenlernen", name: "Kennenlernen" },
  { id: "followup", name: "Nachfassen" },
  { id: "deepdive", name: "Deep Dive" },
  { id: "onboarding", name: "Onboarding" },
];

const HM_TEAM = [
  { id: "daniel", name: "Daniel Hayden", rolle: "Strategie und Marke", mail: "daniel@ad.boutique", kurz: "DH" },
  { id: "florian", name: "Florian Höhrmann", rolle: "Marketing", mail: "florian@ad.boutique", kurz: "FH" },
  { id: "ahmet", name: "Ahmet", rolle: "Produktion und Agent Success", mail: "", kurz: "AH" },
  { id: "nikita", name: "Nikita", rolle: "Akquise und Vertrag", mail: "", kurz: "NI" },
];

/* ---------- Regeln ohne KI-Aufruf (Prototyp) ---------- */
const hmWoerter = (t) => (t || "").trim().split(/\s+/).filter(Boolean).length;
function hmSprechzeit(skript) {
  const zitate = (skript || "").match(/"[^"]+"|„[^"“]+[“"]/g) || [];
  const w = zitate.reduce((n, z) => n + hmWoerter(z.replace(/["„“]/g, "")), 0);
  return { woerter: w, sekunden: Math.round(w * 0.3) };
}
function hmSkriptCheck(skript, br) {
  const z = ((skript || "").match(/"[^"]+"|„[^"“]+[“"]/g) || []).map((x) => x.replace(/["„“]/g, ""));
  const hook = z[0] || (skript || "").split("\n")[0] || "";
  const out = [];
  const hw = hmWoerter(hook);
  out.push(hw && hw <= 12 ? { ok: true, t: `Hook mit ${hw} Wörtern, passt in drei Sekunden.` } : { ok: false, t: `Hook hat ${hw} Wörter. Unter 12 bleiben, damit er in drei Sekunden sitzt.` });
  out.push(/\d/.test(hook) || /\?$/.test(hook.trim()) ? { ok: true, t: "Hook arbeitet mit Zahl oder Frage." } : { ok: false, t: "Eine Zahl oder Frage im ersten Satz hält besser." });
  const last = (z[z.length - 1] || "").trim();
  out.push(/\?|Kommentar|schreib|Link|Termin|melde/i.test(last) ? { ok: true, t: "Schluss mit Handlung für die Zuschauer." } : { ok: false, t: "Der letzte Satz sollte eine Frage oder Handlung enthalten." });
  const du = /\b(du|dich|dir|dein)\b/i.test(skript), sie = /\b(Sie|Ihnen|Ihr)\b/.test(skript);
  out.push(du && sie ? { ok: false, t: "Du und Sie gemischt. Eine Anrede wählen." } : { ok: true, t: `Anrede einheitlich (${sie ? "Sie" : "Du"}).` });
  const s = hmSprechzeit(skript).sekunden;
  out.push(s <= 60 ? { ok: true, t: `Sprechzeit ${s} Sekunden.` } : { ok: false, t: `Sprechzeit ${s} Sekunden. Für Reels unter 60 bleiben.` });
  return out;
}
function hmViralScore(c, clips) {
  const f = [];
  const check = hmSkriptCheck(c.skript);
  const hookOk = check[0].ok && check[1].ok;
  f.push({ t: "Hook", p: hookOk ? 22 : 10 });
  f.push({ t: "Gesicht im Bild", p: (c.clips || []).some((id) => ((clips || []).find((x) => x.id === id) || {}).tags?.includes("Gesicht")) || c.typ !== "reel" ? 18 : 6 });
  const s = hmSprechzeit(c.skript).sekunden;
  f.push({ t: "Länge", p: c.typ === "reel" ? (s >= 15 && s <= 45 ? 18 : 9) : 14 });
  f.push({ t: "Säule", p: ["persoenlich", "markt"].includes(c.saeule) ? 16 : 12 });
  f.push({ t: "Handlungsaufruf", p: check[2].ok ? 12 : 4 });
  f.push({ t: "Zweitverwertung", p: (c.kanaele || []).length >= 2 ? 10 : 4 });
  return { score: Math.min(99, f.reduce((n, x) => n + x.p, 0)), faktoren: f };
}
function hmCaption(c, br, w) {
  const hook = ((c.skript || "").match(/"([^"]+)"/) || [])[1] || c.titel;
  const du = !(w && w.anrede === "Sie");
  const orte = w && w.bezirke.length ? w.bezirke.map((b) => "#" + b.replace(/^\d{4}\s/, "").replace(/[^A-Za-zÄÖÜäöüß]/g, "")).slice(0, 2) : ["#Wien"];
  return `${hook}\n\n${du ? "Was würdest du anders machen? Schreib es mir." : "Wie sehen Sie das? Schreiben Sie mir."}\n\n${[...orte, "#Immobilien", "#Wien"].filter((v, i, a) => a.indexOf(v) === i).join(" ")}`;
}

/* Auto-Schnitt: Skript in Sätze, Talking-Head-Clips für gesprochene Sätze, B-Roll dazwischen, Endkarte. */
function hmAutoSchnitt(c, clips) {
  const saetze = ((c.skript || "").match(/"[^"]+"|„[^"“]+[“"]/g) || []).map((x) => x.replace(/["„“]/g, "").trim()).filter(Boolean);
  const a = clips.filter((k) => k.typ === "video" && k.tags.includes("Gesicht"));
  const b = clips.filter((k) => !k.tags.includes("Gesicht"));
  const seg = [];
  let ai = 0, bi = 0;
  const texte = saetze.length ? saetze : [c.titel];
  texte.forEach((t, i) => {
    const dauer = Math.max(1.6, Math.min(6, hmWoerter(t) * 0.33 + 0.4));
    const k = a[ai % Math.max(1, a.length)]; ai++;
    if (k) { const start = k.von + ((i * 1.7) % Math.max(0.1, (k.bis - k.von - dauer))); seg.push({ clip: k.id, von: +start.toFixed(1), dauer: +dauer.toFixed(1), text: t, rolle: i === 0 ? "Hook" : "Aussage" }); }
    if (i % 2 === 1 && b.length) { const kb = b[bi % b.length]; bi++; seg.push({ clip: kb.id, von: kb.von || 0, dauer: 1.8, text: "", rolle: "Bildwechsel" }); }
  });
  seg.push({ clip: "ende", von: 0, dauer: 2, text: "", rolle: "Endkarte" });
  return seg;
}

/* ---------- Seed v2 ---------- */
function hmSeedOS() {
  const img = (f) => "../../assets/img/" + f;
  const ph = (f) => "../../assets/photos/" + f;
  const C = (id, maklerId, titel, typ, saeule, zustand, extra) => ({ id, maklerId, titel, typ, saeule, zustand, kanaele: ["instagram", "facebook"], erstellt: "2026-09-01", skript: "", caption: "", manager: "Daniel Hayden", cutter: "Ahmet", akteure: "", drehtag: "", termin: "", clips: [], schnitt: null, kommentare: [], notizen: [], korrekturen: 0, ...extra });
  const content = [
    C("k1", "elif", "Grätzl-Check Favoriten in 60 Sekunden", "reel", "markt", "online", { termin: "2026-09-09T18:00", thumb: img("vienna-street.jpg"), kz: { reach: 12400, saves: 88, sends: 190, likes: 640, kommentare: 41 }, skript: "\"Favoriten in 60 Sekunden. Drei Ecken, die sich gerade ändern.\"\n\"Erstens der Reumannplatz.\"\n\"Zweitens die Quellenstraße.\"\n\"Drittens das Sonnwendviertel.\"\n\"Welche Ecke fehlt? Schreib es mir.\"", clips: ["c1", "c9", "c4"] }),
    C("k2", "elif", "Schlüsselübergabe bei Familie K.", "reel", "beweise", "online", { termin: "2026-09-17T18:00", thumb: img("albrechts-wohnen.jpg"), kz: { reach: 6300, saves: 12, sends: 44, likes: 380, kommentare: 22 } }),
    C("k3", "elif", "Finanzierung in fünf Schritten", "carousel", "wissen", "freigabe", { termin: "2026-10-01T18:00", thumb: img("lens-analyse.jpg"), caption: "Finanzierung in fünf Schritten. Speichern für später.\n\n#Favoriten #Immobilien #Wien", skript: "Kachel 1: Wie viel Wohnung kann ich mir leisten?\nKachel 2: Eigenmittel, mindestens 20 Prozent\nKachel 3: Die Rate, maximal 40 Prozent vom Netto\nKachel 4: Fixzins oder variabel\nKachel 5: Speichern und teilen", korrekturen: 1, clips: ["f1", "f6"] }),
    C("k4", "elif", "Die Frage, die jeder Erstkäufer stellt", "reel", "wissen", "freigabe", { termin: "2026-10-04T18:00", thumb: ph("wohnen-beige.jpg"), skript: "\"Die Frage, die mir jeder Erstkäufer stellt.\"\n\"Wie viel muss ich wirklich selbst mitbringen?\"\n\"Die ehrliche Antwort: weniger als du denkst, aber mehr als null.\"\n\"Rechnen wir das gemeinsam? Schreib mir.\"", caption: "Die Frage, die mir jeder Erstkäufer stellt.\n\nWas würdest du anders machen? Schreib es mir.\n\n#Favoriten #Immobilien #Wien", clips: ["c1", "c2", "c7", "c5"] }),
    C("k5", "elif", "Ein Vormittag vom Reumannplatz bis zum Objekt", "reel", "persoenlich", "schnitt", { termin: "2026-10-07T18:00", drehtag: "2026-09-29", thumb: ph("villen-strasse.jpg"), skript: "\"Komm mit, ein Vormittag in Favoriten.\"\n\"Erst Kaffee am Reumannplatz.\"\n\"Dann zur Besichtigung in der Laxenburger Straße.\"\n\"Und du? Wo trinkst du deinen ersten Kaffee?\"" }),
    C("k6", "elif", "Neubau in Favoriten: drei Projekte, drei Preise", "carousel", "markt", "planung", { termin: "2026-10-10T18:00", thumb: img("ecoluxe.jpg") }),
    C("k7", "elif", "Warum ich Quereinsteigerin bin", "reel", "persoenlich", "idee", { thumb: ph("lifestyle-paar.jpg") }),
    C("k8", "elif", "Luxus interessiert mich nicht, Zuhause schon", "reel", "meinung", "idee", {}),
    C("k9", "elif", "Was kostet ein Makler wirklich", "reel", "wissen", "aenderung", { termin: "2026-10-12T18:00", thumb: img("int-kitchen.jpg"), notizen: [{ von: "Elif Demir", t: Date.now() - 36e5 * 20, text: "Bitte die Provisionszahl nicht als Grafik, lieber gesprochen." }] }),
    C("m1", "markus", "Döbling Q3: Preise, Nachfrage, Angebot", "carousel", "markt", "online", { termin: "2026-09-16T08:00", kanaele: ["linkedin"], thumb: img("zinshaus-fassaden.jpg"), kz: { reach: 4820, saves: 61, sends: 22, likes: 143, kommentare: 9 } }),
    C("m2", "markus", "Der häufigste Preisfehler in Wien", "reel", "wissen", "online", { termin: "2026-09-19T18:00", thumb: img("vienna-facade.jpg"), kz: { reach: 7210, saves: 38, sends: 51, likes: 210, kommentare: 17 } }),
    C("m3", "markus", "Warum das erste Angebot selten das beste ist", "reel", "wissen", "freigabe", { termin: "2026-09-30T18:00", thumb: img("beheim.jpg"), skript: "\"Warum das erste Angebot selten das beste ist.\"\n\"Weil der Markt noch nicht gesprochen hat.\"\n\"Wir warten auf drei Angebote, dann entscheiden Sie.\"\n\"Wie war das bei Ihrem Verkauf? Schreiben Sie mir.\"", caption: "Warum das erste Angebot selten das beste ist.\n\nWie sehen Sie das? Schreiben Sie mir.\n\n#Döbling #Immobilien #Wien", clips: ["c1", "c3", "f3", "c5"] }),
    C("m4", "markus", "So lesen Sie das Grundbuch", "reel", "wissen", "dreh", { termin: "2026-10-08T18:00", drehtag: "2026-10-06", skript: "\"Drei Zeilen im Grundbuch, die über den Preis entscheiden.\"\n\"A-Blatt: was ist es.\"\n\"B-Blatt: wem gehört es.\"\n\"C-Blatt: was lastet darauf.\"\n\"Fragen dazu? Schreiben Sie mir.\"" }),
    C("m5", "markus", "Zinshaus Sieveringer Straße: Baujahr 1902, drei Zahlen", "reel", "beweise", "planung", { drehtag: "2026-10-06", thumb: img("zinshaus-fassaden.jpg") }),
    C("m6", "markus", "Fünf Mythen über den Wiener Zinshausmarkt", "carousel", "meinung", "idee", {}),
    C("m7", "markus", "Erbschaft in Döbling: die drei häufigsten Fehler", "carousel", "markt", "idee", {}),
    C("s1", "sara", "Neubau, eine Straße, drei Jahrhunderte", "reel", "markt", "idee", { thumb: img("albrechts-hof.jpg") }),
    C("s2", "sara", "Was ein Loft in Neubau heute kostet", "carousel", "markt", "idee", {}),
  ];
  const clips = HM_CLIPS_SEED.map((c) => ({ ...c, maklerId: "alle", genutzt: 0 }));
  const branding = {
    elif: { status: "freigegeben", logo: "punkt", schrift: "editorial", akzent: "terrakotta", claim: "Immobilien sind Menschen mit Adresse.", material: [] },
    markus: { status: "freigegeben", logo: "wort", schrift: "klassisch", akzent: "nachtblau", claim: "Der Markt wird lesbar.", material: [] },
  };
  const einrichtung = {
    sara: { vertrag: "fertig", plattform: "offen", import: "offen", konten: "offen", foto: "offen", strategie: "offen", backoffice: "offen", visitenkarten: "offen", shop: "offen", tutorials: "offen" },
    markus: { vertrag: "fertig", plattform: "fertig", import: "fertig", konten: "wartet_team", foto: "fertig", strategie: "fertig", backoffice: "fertig", visitenkarten: "offen", shop: "fertig", tutorials: "fertig" },
    elif: { vertrag: "fertig", plattform: "fertig", import: "fertig", konten: "fertig", foto: "fertig", strategie: "fertig", backoffice: "fertig", visitenkarten: "fertig", shop: "fertig", tutorials: "fertig" },
  };
  const leads = [
    { id: "l1", name: "Katharina Weiss", ort: "1130 Hietzing", quelle: "Empfehlung", stufe: "kennenlernen", naechstes: "Kennenlernen am 30.09., 10:00", notiz: "Seit 12 Jahren, Villen und Häuser, sucht Marke statt Portal.", owner: "Nikita" },
    { id: "l2", name: "Jonas Berger", ort: "1070 Neubau", quelle: "Instagram", stufe: "research", naechstes: "Erste Nachricht senden", notiz: "Postet selbst Reels, 3.200 Follower.", owner: "Nikita" },
    { id: "l3", name: "Mira Hofer", ort: "Mödling", quelle: "Veranstaltung", stufe: "followup", naechstes: "Angebot nachfassen", notiz: "Umland Süd, Häuser, will LinkedIn aufbauen.", owner: "Nikita" },
    { id: "l4", name: "Leon Aigner", ort: "1020 Leopoldstadt", quelle: "Website", stufe: "deepdive", naechstes: "Deep Dive mit Daniel am 02.10.", notiz: "Bauträgerprojekte, Abverkauf.", owner: "Daniel" },
    { id: "l5", name: "Sara Novak", ort: "1070 Neubau", quelle: "Empfehlung", stufe: "onboarding", naechstes: "Einrichtung läuft", notiz: "Seit 22.09. im Onboarding.", owner: "Nikita", maklerId: "sara" },
  ];
  const meetings = [
    { id: "mt1", maklerId: "markus", titel: "Strategie-Workshop", datum: "2026-09-11T10:00", dauer: 74, teilnehmer: ["Daniel Hayden", "Markus Leitner"], zusammenfassung: "Kenner-Weg bestätigt. LinkedIn zuerst, Instagram zweiter Kanal. Säule Wie ich arbeite mit Provisionstransparenz. Keine Familie im Bild.", aufgaben: ["Daniel: Branding bis 16.09.", "Markus: Meta-Zugriff freigeben", "Ahmet: Drehtag 06.10. planen"], transkript: "Daniel: Was sagen Kunden nach dem Abschluss über Sie?\nMarkus: Dass sie sich nie gedrängt gefühlt haben.\nDaniel: Das wird Ihre Säule Wie ich arbeite." },
    { id: "mt2", maklerId: "elif", titel: "Quartals-Review Q3", datum: "2026-09-19T14:00", dauer: 46, teilnehmer: ["Daniel Hayden", "Elif Demir", "Ahmet"], zusammenfassung: "Reichweite plus 150 Prozent in drei Monaten. Grätzl-Format stärkstes Format. Markt-Säule anheben. Strategie Version 2.", aufgaben: ["Daniel: Strategie v2 bis 26.09.", "Ahmet: Zwei Markt-Carousels im Oktober"], transkript: "Elif: Die Spaziergänge laufen am besten.\nAhmet: Und werden am häufigsten geteilt." },
  ];
  const kontakte = {
    elif: [{ name: "Elif Demir", rolle: "Maklerin", mail: "elif.demir@beispiel.at", freigabe: true }, { name: "Tarik Demir", rolle: "Assistenz", mail: "assistenz@beispiel.at", freigabe: false }],
    markus: [{ name: "Markus Leitner", rolle: "Makler", mail: "m.leitner@beispiel.at", freigabe: true }],
    sara: [{ name: "Sara Novak", rolle: "Maklerin", mail: "sara.novak@beispiel.at", freigabe: true }],
  };
  hmStore.put("content", content); hmStore.put("clips", clips); hmStore.put("branding", branding);
  hmStore.put("einrichtung", einrichtung); hmStore.put("leads", leads); hmStore.put("meetings", meetings);
  hmStore.put("kontakte", kontakte); hmStore.put("vorlagen", HM_VORLAGEN); hmStore.put("website", {});
}

Object.assign(window, { HM_WEB_SCHRIFTEN, HM_WEB_AKZENTE, HM_AKZENT_EMPF, HM_LOOKS, HM_UNIO_SOCIAL_MAIL, HM_UNIO_META_BUSINESS, HM_EINRICHTUNG, HM_PLATTFORMEN, HM_IMPORT_QUELLEN, HM_BACKOFFICE, HM_TUTORIALS, HM_SCHRIFTPAARE, HM_LOGO_TYPEN, HM_MATERIAL_ARTEN, hmBildweltPrompt, HM_SPALTEN, HM_TYPEN, HM_PHASEN, HM_VORLAGEN, HM_CLIPS_SEED, HM_AKQUISE_STUFEN, HM_TEAM, hmWoerter, hmSprechzeit, hmSkriptCheck, hmViralScore, hmCaption, hmAutoSchnitt, hmSeedOS });
