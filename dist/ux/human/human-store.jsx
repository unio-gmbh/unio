/* UNIO HUMAN. Datenschicht als Adapter.
   Alle Screens sprechen nur mit hmStore (get, put, patch, on).
   Implementierung 1: localStorage (Keys unio_hm_*), Storage-Events halten zwei Fenster synchron.
   Implementierung 2 (später): HTTP gegen Supabase oder Zero-One mit gleicher Schnittstelle. */

const HM_PREFIX = "unio_hm_";
const HM_SEED_FLAG = "unio_hm_seed_v5";

function hmMakeLocalAdapter() {
  const subs = new Set();
  const read = (k) => { try { const v = localStorage.getItem(HM_PREFIX + k); return v ? JSON.parse(v) : null; } catch { return null; } };
  const write = (k, v) => { try { localStorage.setItem(HM_PREFIX + k, JSON.stringify(v)); } catch {} subs.forEach((f) => f(k, v)); };
  window.addEventListener("storage", (e) => { if (e.key && e.key.startsWith(HM_PREFIX)) { const k = e.key.slice(HM_PREFIX.length); let v = null; try { v = JSON.parse(e.newValue); } catch {} subs.forEach((f) => f(k, v)); } });
  return {
    get: read,
    put: write,
    patch: (k, fn) => { const v = fn(read(k)); write(k, v); return v; },
    on: (f) => { subs.add(f); return () => subs.delete(f); },
    reset: () => { Object.keys(localStorage).filter((k) => k.startsWith(HM_PREFIX)).forEach((k) => localStorage.removeItem(k)); localStorage.removeItem(HM_SEED_FLAG); },
  };
}

const hmStore = hmMakeLocalAdapter();

/* Ereignis anhängen: genau eines pro Aktion */
function hmEvent(maklerId, typ, text, akteur) {
  hmStore.patch("events", (l) => [{ id: Math.random().toString(36).slice(2), t: Date.now(), maklerId, typ, text, akteur: akteur || "System" }, ...(l || [])].slice(0, 400));
}

/* Schritt-Zustände: offen, geplant, in_arbeit, wartet_makler, wartet_team, freigabe, fertig, blockiert */
const HM_ZUSTAND = {
  offen: "Offen", geplant: "Geplant", in_arbeit: "In Arbeit", wartet_makler: "Wartet auf dich", wartet_team: "Beim Team", freigabe: "In Freigabe", fertig: "Fertig", blockiert: "Blockiert",
};

function hmSchritteFuer(m, tag) {
  /* Standard-Schritte pro Etappe; Zustände aus dem Reise-Tag abgeleitet (Seed) */
  const S = (etappe, id, titel, owner, faellig, zustand) => ({ id: `${m}-${id}`, maklerId: m, etappe, titel, owner, faellig, zustand });
  const d = (n) => { const x = new Date(2026, 8, 23 - tag + n); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`; };
  const z = (start, ende) => (tag >= ende ? "fertig" : tag >= start ? "in_arbeit" : "offen");
  return [
    S(0, "vertrag", "Vertrag unterschrieben", "Nikita", d(0), tag >= 0 ? "fertig" : "offen"),
    S(0, "zugang", "Zugang und Willkommen", "System", d(0), tag >= 0 ? "fertig" : "offen"),
    S(0, "termin", "Workshop-Termin buchen", "Makler", d(1), tag >= 1 ? "fertig" : "wartet_makler"),
    S(1, "fragebogen", "Fragebogen beantworten", "Makler", d(3), tag >= 3 ? "fertig" : "wartet_makler"),
    S(1, "wege", "Deinen Weg wählen", "Makler", d(3), tag >= 3 ? "fertig" : "offen"),
    S(2, "workshop", "Strategie-Workshop", "Daniel", d(6), tag >= 6 ? "fertig" : tag >= 3 ? "geplant" : "offen"),
    S(2, "transkript", "Transkript und Zusammenfassung", "System", d(6), tag >= 6 ? "fertig" : "offen"),
    S(3, "review", "Strategie prüfen", "Daniel", d(8), tag >= 9 ? "fertig" : tag >= 6 ? "in_arbeit" : "offen"),
    S(3, "praesentation", "Strategie ansehen und bestätigen", "Makler", d(10), tag >= 10 ? "fertig" : tag >= 9 ? "wartet_makler" : "offen"),
    S(4, "branding", "Branding: Farben, Schrift, Leitidee", "Daniel", d(16), z(10, 16)),
    S(4, "website", "Website aus dem Brand-Profil", "System", d(20), z(14, 20)),
    S(4, "konten", "Instagram und Facebook verbinden", "Makler", d(14), tag >= 14 ? "fertig" : tag >= 10 ? "wartet_makler" : "offen"),
    S(4, "tour", "Tour durch dein Werkzeug", "System", d(11), z(10, 11)),
    S(4, "drehtermine", "Drei Drehtage buchen", "Makler", d(12), tag >= 12 ? "fertig" : tag >= 10 ? "wartet_makler" : "offen"),
    S(5, "drehplan", "Drehplan: Shotlist und Skripte", "Ahmet", d(17), z(14, 17)),
    S(5, "dreh", "Erster Drehtag", "Ahmet", d(18), tag >= 18 ? "fertig" : tag >= 12 ? "geplant" : "offen"),
    S(5, "schnitt", "Rohschnitt und Untertitel", "Ahmet", d(22), z(18, 22)),
    S(5, "freigabe", "Erstes Reel freigeben", "Makler", d(27), tag >= 24 ? "fertig" : tag >= 22 ? "freigabe" : "offen"),
    S(6, "posting", "Vier Wochen geplant", "System", d(28), z(24, 28)),
    S(6, "live", "Du bist live", "System", d(30), tag >= 30 ? "fertig" : "offen"),
  ];
}

/* Demo-Makler in drei Reisestadien: Tag 2, Tag 18, Monat 4 (Tag 120) */
const HM_SEED_MAKLER = [
  { id: "sara", name: "Sara Novak", kurz: "SN", region: "1070 Neubau", abo: "Personal Brand", tag: 2, kontingent: { videos: 3, fotos: 10, grafiken: 7 }, verbraucht: { videos: 0, fotos: 0, grafiken: 0 } },
  { id: "markus", name: "Markus Leitner", kurz: "ML", region: "1190 Döbling", abo: "Personal Brand Premium", tag: 18, kontingent: { videos: 5, fotos: 15, grafiken: 7 }, verbraucht: { videos: 2, fotos: 15, grafiken: 3 } },
  { id: "elif", name: "Elif Demir", kurz: "ED", region: "1100 Favoriten", abo: "Personal Brand", tag: 120, kontingent: { videos: 3, fotos: 10, grafiken: 7 }, verbraucht: { videos: 1, fotos: 4, grafiken: 2 } },
];

const HM_SEED_ANTWORTEN = {
  markus: { seit: "5 bis 10 Jahre", herkunft: "Aus Finanz oder Recht", immotypen: ["Zinshaus", "Anlegerwohnung", "Eigentumswohnung Altbau", "Denkmalschutz und Sanierung"], abschluesse: "Zinshaus Sieveringer Straße, 1902, 4,2 Mio., Erbengemeinschaft kam über den Notar. Anlegerwohnung Währing, 62 m², 420.000, Bestandskunde. Altbau Hietzing, 140 m², 1,3 Mio., Diskretion war entscheidend.", gruende: ["Preis-Einschätzung war realistisch", "Diskretion", "Kennt den Bezirk"], hindernis: ["Provision"], ausloeser: ["Erbe", "Investment"], milieus: ["kons", "perf"], phasen: ["Investoren", "Erben"], bezirke: ["1190 Döbling", "1180 Währing", "1130 Hietzing"], seite: 25, gefuehl: ["Sicher", "Gut beraten"], s1: 20, s2: 30, s3: 35, s4: 50, s5: 70, archetyp: ["kenner"], worte: "genau, ruhig, verlässlich", tabus: ["Politik", "Familie zeigen"], anrede: "Sie, überall", sichtbar: "Diesen Monat", graetzl: "Sievering, zwischen Sieveringer Straße und Agnesgasse", graetzl_anteil: "6 bis 8", unity: "Alteingesessene in Döbling, Väter im Ruderverein", bildpaare: { bp1: "a", bp2: "b", bp3: "b", bp4: "b", bp5: "b", bp6: "b" }, werte: ["Sicherheit", "Verlässlichkeit"], ideal: "der Zinshaus-Mann, dem Notare vertrauen", erfolge: 2, fokus: 70, privat: ["Wohnort und Grätzl", "Meinung zum Markt", "Fehler und Learnings"], cue: "Dienstag nach dem Grundbuch-Termin, 11 Uhr", aufgewachsen: "Döbling, Elternhaus in Grinzing, mein Großvater hat Zinshäuser verwaltet.", abgeraten: "Einer Erbengemeinschaft geraten, zwei Jahre zu warten, statt unter Druck zu verkaufen. Sie kamen mit 600.000 mehr zurück.", belege: "Zinshaus Sievering, 4,2 Mio., 11 Wochen. Anlegerwohnung Währing, 8 Prozent über Erstschätzung. 14 Abschlüsse 2025.", bestand: ["Logo", "Website", "LinkedIn", "Instagram"], follower: "500 bis 2.000", behalten: "Behalten und schärfen", assets: ["Eine Farbe", "Ein Satz"], vorbilder: "@wienerimmobilien, weil sachlich", kamera: 3, zeit: "2 bis 4 Stunden", formate: ["talking", "carousel", "qa"], kanaele: ["linkedin", "instagram", "facebook", "youtube", "tiktok"], ziel: "Investoren erreichen", verfuegbar: ["Dienstag", "Donnerstag", "Vormittag"] },
  elif: { seit: "2 bis 5 Jahre", herkunft: "Quereinstieg aus dem Verkauf", immotypen: ["Erstbezug vom Bauträger", "Eigentumswohnung Neubau", "Doppelhaus und Reihenhaus", "Mietwohnung"], abschluesse: "Erstbezug Laxenburger Straße, 78 m², 389.000, junge Familie über Instagram. Reihenhaus Liesing, 120 m², 610.000, Empfehlung. Mietwohnung Meidling, 55 m², Bestandskundin.", gruende: ["Sympathie", "Schnelle Rückmeldung", "Kennt den Bezirk"], hindernis: ["Zweifel am Preis"], ausloeser: ["Familie wächst", "Umzug aus beruflichen Gründen"], milieus: ["mitte", "neo"], phasen: ["Erste Wohnung", "Familiengründung"], bezirke: ["1100 Favoriten", "1120 Meidling", "1230 Liesing"], seite: 65, gefuehl: ["Zuhause", "Entlastet"], s1: 55, s2: 85, s3: 70, s4: 65, s5: 40, archetyp: ["gastgeber"], worte: "herzlich, schnell, ehrlich", tabus: ["Luxus zeigen"], anrede: "Du auf Instagram, Sie sonst", sichtbar: "Diese Woche", graetzl: "Rund um den Reumannplatz, bis zur Quellenstraße", graetzl_anteil: "6 bis 8", unity: "Kinder von Zuwanderern, junge Eltern in Favoriten", bildpaare: { bp1: "a", bp2: "a", bp3: "a", bp4: "a", bp5: "a", bp6: "a" }, werte: ["Hilfsbereitschaft", "Selbstbestimmung"], ideal: "die, die Favoriten kennt und ehrlich bleibt", erfolge: 4, fokus: 25, privat: ["Sport und Hobby", "Wohnort und Grätzl", "Team und Büro", "Humor", "Fehler und Learnings"], cue: "Montag nach dem Team-Frühstück, 9:30", aufgewachsen: "Favoriten, Per-Albin-Hansson-Siedlung. Meine Mutter hat 20 Jahre auf eine Genossenschaftswohnung gewartet.", wendepunkt: "Nach dem ersten Jahr ohne Abschluss wollte ich zurück in den Verkauf. Ein Erstkäufer-Paar hat mir nach der Übergabe geschrieben, dass ich die Einzige war, die ihnen die Finanzierung erklärt hat.", fehler: "Ich habe einmal einen Kaufpreis zu hoch angesetzt, weil der Verkäufer es wollte. Seitdem zeige ich drei Vergleichspreise und sage Nein, wenn es nicht passt.", kundensatz: "Elif hat uns nie das Gefühl gegeben, zu wenig zu wissen.", bestand: ["Instagram", "TikTok", "Professionelle Fotos"], follower: "2.000 bis 10.000", behalten: "Neu aufsetzen", assets: ["Ein Ort", "Eine Geste"], vorbilder: "@grätzlgeschichten, weil nah", kamera: 5, zeit: "4 bis 8 Stunden", formate: ["talking", "spaziergang", "behind", "walkthrough"], kanaele: ["instagram", "tiktok", "facebook", "linkedin", "youtube"], ziel: "Bekannt im Bezirk werden", verfuegbar: ["Montag", "Mittwoch", "Nachmittag"] },
};

function hmSeed() {
  if (localStorage.getItem(HM_SEED_FLAG)) return;
  hmStore.put("makler", HM_SEED_MAKLER);
  const schritte = HM_SEED_MAKLER.flatMap((m) => hmSchritteFuer(m.id, m.tag));
  hmStore.put("schritte", schritte);
  const antworten = {};
  const strategien = {};
  for (const m of HM_SEED_MAKLER) {
    const a = HM_SEED_ANTWORTEN[m.id];
    if (a) {
      antworten[m.id] = { antworten: a, kapitelFertig: window.HM_KAPITEL.map((k) => k.id), fertig: true };
      const wege = window.hmZweiWege(a);
      strategien[m.id] = { wege, gewaehlt: "a", version: m.tag > 90 ? 2 : 1, status: m.tag >= 10 ? "aktiv" : m.tag >= 6 ? "geprueft" : "entwurf" };
    }
  }
  hmStore.put("fragebogen", antworten);
  hmStore.put("strategien", strategien);
  hmStore.put("events", [
    { id: "e1", t: Date.now() - 3600e3 * 5, maklerId: "markus", typ: "schritt", text: "Rohschnitt Reel 1 hochgeladen", akteur: "Ahmet" },
    { id: "e2", t: Date.now() - 3600e3 * 26, maklerId: "sara", typ: "schritt", text: "Zugang aktiviert", akteur: "System" },
    { id: "e3", t: Date.now() - 3600e3 * 50, maklerId: "elif", typ: "report", text: "Monatsreport September erstellt", akteur: "System" },
  ]);
  hmStore.put("nachrichten", [
    { id: "n1", maklerId: "markus", schrittId: "markus-branding", von: "Daniel", t: Date.now() - 3600e3 * 30, text: "Zwei Farbwelten stehen zur Wahl, ich habe die dunkle vorausgewählt. Passt das zu Ihrem Büro?" },
    { id: "n2", maklerId: "markus", schrittId: "markus-branding", von: "Markus Leitner", t: Date.now() - 3600e3 * 28, text: "Ja, dunkel passt. Der Amber-Ton darf etwas zurückhaltender sein." },
  ]);
  if (window.hmSeedMore) window.hmSeedMore();
  localStorage.setItem(HM_SEED_FLAG, "1");
}

/* React-Hook: liest einen Key und rendert bei Änderung neu */
function useHm(key) {
  const [v, setV] = React.useState(() => hmStore.get(key));
  React.useEffect(() => hmStore.on((k, val) => { if (k === key) setV(val); }), [key]);
  return v;
}

Object.assign(window, { hmStore, hmEvent, hmSeed, useHm, HM_ZUSTAND, hmSchritteFuer });
