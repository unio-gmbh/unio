/* Werkbank. "Ihr Stand": ein Link, eine Seite für den Makler (Prozess v2, Schritt 1, Takt 3; docs/werkbank/branding-v2/schritte/01_auftakt.md 3.4 bis 3.8).
   Drei Reiter: Ablauf (vierzehn Momente mit Datum und Dauer), Einwilligungen (acht Zwecke mit Frist), Ihr Stand (so haben wir gelesen).
   Aufruf: im Makler-Bereich unter Heute oder als eigener Link ?ansicht=stand&makler=<id> (ohne Menü).
   Ablage: hmStore "auftrag" = { [mid]: { einwilligungen: { 1..8: { wert, datum, fassung, wer } }, termine: { <moment>: iso, wochentage: [1..5] }, portraitTermin } }
   Jede Minutenangabe kommt aus HM_STAND_DAUER über hmDauerText, es gibt keinen zweiten Minutentext. Der Makler wird immer gesiezt. */

function hmStandStil() {
  if (typeof document === "undefined" || document.getElementById("stil-stand")) return;
  const s = document.createElement("style"); s.id = "stil-stand";
  s.textContent = `
.hm-stand { display: grid; gap: 28px; }
.hm-stand-reiter { display: flex; gap: 24px; border-bottom: 1px solid var(--hairline-dark); }
.hm-stand-reiter button { border: 0; background: none; padding: 0 0 12px; font: inherit; font-size: 16px; color: var(--text-muted); cursor: pointer; box-shadow: inset 0 -1.5px 0 transparent; }
.hm-stand-reiter button[aria-selected="true"] { color: var(--ink); box-shadow: inset 0 -1.5px 0 var(--ink); }
.hm-stand-reiter button:focus-visible { outline: 2px solid var(--ink); outline-offset: 4px; }
.hm-stand-titel { font-size: clamp(40px, 6vw, 88px); line-height: .98; letter-spacing: -.03em; font-weight: 400; margin: 0; text-wrap: balance; max-width: 16ch; }
.hm-stand-quelle { font-size: 14px; color: var(--text-muted); margin-top: 10px; }
.hm-stand-intro { font-size: clamp(18px, 1.6vw, 20px); line-height: 1.5; max-width: 34em; margin: 14px 0 0; color: var(--ink); }
.hm-stand-summe { font-size: 16px; line-height: 1.5; max-width: 44em; margin: 0; color: var(--ink-2); }
.hm-stand-plan { display: grid; max-width: 820px; }
.hm-stand-s { display: grid; grid-template-columns: 88px minmax(0, 1fr) auto; gap: 16px; align-items: baseline; padding: 16px 0 16px 14px; border-top: 1px solid var(--hairline-dark); position: relative; }
.hm-stand-s:last-child { border-bottom: 1px solid var(--hairline-dark); }
.hm-stand-s .dt, .hm-stand-s .dauer { font-family: "Outfit", system-ui, sans-serif; font-size: 13px; color: var(--ink-2); }
.hm-stand-s .dauer { font-size: 12.5px; text-align: right; white-space: nowrap; }
.hm-stand-s .t { font-size: 16px; color: var(--ink); }
.hm-stand-s .u { font-size: 14px; line-height: 1.45; color: var(--ink-2); margin-top: 3px; }
.hm-stand-s.fertig .t, .hm-stand-s.fertig .u, .hm-stand-s.fertig .dt, .hm-stand-s.fertig .dauer { color: var(--text-muted); }
.hm-stand-s.jetzt::before { content: ""; position: absolute; left: 0; top: 14px; bottom: 14px; width: 2px; background: var(--ink); }
.hm-stand-s .tun { margin-top: 12px; }
.hm-einw-liste { display: grid; max-width: 820px; }
.hm-einw { display: grid; gap: 10px; padding: 20px 0; border-top: 1px solid var(--hairline-dark); }
.hm-einw:last-child { border-bottom: 1px solid var(--hairline-dark); }
.hm-einw .t { font-size: 17px; color: var(--ink); }
.hm-einw p { margin: 0; font-size: 15px; line-height: 1.5; color: var(--ink-2); max-width: 60ch; }
.hm-einw .frist { font-size: 14px; color: var(--ink); }
.hm-einw-knoepfe { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; max-width: 480px; }
.hm-einw-knoepfe button { height: 48px; border: 0; border-radius: 12px; background: transparent; box-shadow: inset 0 0 0 1px var(--hairline-dark); font: inherit; font-size: 15px; color: var(--ink); cursor: pointer; }
.hm-einw-knoepfe button:hover { box-shadow: inset 0 0 0 1px var(--ink); }
.hm-einw-knoepfe button[aria-pressed="true"] { box-shadow: inset 0 0 0 2px var(--ink); }
.hm-einw-knoepfe button:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
.hm-einw .stand { display: flex; gap: 14px; align-items: baseline; font-size: 15px; color: var(--ink); flex-wrap: wrap; }
.hm-stand-daten { display: grid; gap: 6px; max-width: 60ch; }
.hm-stand-daten p { margin: 0; font-size: 15px; line-height: 1.55; color: var(--ink-2); }
.hm-stand-fakten { display: grid; max-width: 980px; }
.hm-stand-fakt { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 24px; align-items: baseline; padding: 14px 0; border-top: 1px solid var(--hairline-dark); }
.hm-stand-fakt:last-child { border-bottom: 1px solid var(--hairline-dark); }
.hm-stand-fakt .w { font-size: clamp(22px, 2.4vw, 34px); line-height: 1.25; letter-spacing: -.01em; color: var(--ink); }
.hm-stand-fakt .q { font-size: 16px; color: var(--text-muted); }
.hm-stand-fehlt { display: grid; gap: 8px; max-width: 60ch; }
.hm-stand-fehlt h3 { margin: 0; font-size: clamp(26px, 2.4vw, 30px); font-weight: 400; letter-spacing: -.01em; }
.hm-stand-fehlt p { margin: 0; font-size: 16px; line-height: 1.5; color: var(--ink-2); }
.hm-stand-los { display: grid; gap: 10px; justify-items: start; }
.hm-stand-los .hm-daten { font-size: 14px; }
.hm-stand-karte { width: 100%; display: flex; align-items: baseline; gap: 18px; padding: 18px 20px; border: 0; border-radius: 18px; background: var(--surface-raised); box-shadow: inset 0 0 0 1px var(--hairline-dark); text-align: left; font: inherit; cursor: pointer; color: var(--ink); }
.hm-stand-karte:hover { box-shadow: inset 0 0 0 1px var(--ink); }
.hm-stand-karte .m { flex: 1; min-width: 0; } .hm-stand-karte .t { font-size: 16px; } .hm-stand-karte .u { font-size: 14px; color: var(--ink-2); margin-top: 3px; }
.hm-stand-karte .z { font-size: 14px; color: var(--text-muted); white-space: nowrap; }
@media (max-width: 640px) {
  .hm-stand-s { grid-template-columns: 72px minmax(0, 1fr); }
  .hm-stand-s .dauer { grid-column: 2; text-align: left; }
  .hm-stand-fakt { grid-template-columns: minmax(0, 1fr); gap: 4px; }
  .hm-stand-reiter { gap: 18px; } .hm-stand-reiter button { font-size: 15px; }
}`;
  document.head.appendChild(s);
}

/* ---------- Dauer: eine Quelle (01_auftakt 3.6) ---------- */
const HM_STAND_DAUER = {
  auftakt: { name: "Auftakt-Gespräch", min: 30, art: "Setzung" },
  upload: { name: "Logo und Fotos hochladen", min: 5, art: "Setzung" },
  fragebogen: { name: "Fragebogen", min: 15, art: "Setzung" },
  fremdbild: { name: "Fremdbild-Link", min: 2, art: "Setzung" },
  bildwahl: { name: "Bildwahl", min: 4, art: "Setzung" },
  workshop: { name: "Workshop mit Probedreh", min: 110, art: "Setzung" },
  richtung: { name: "Richtungstermin", min: 20, art: "Setzung" },
  vertrag: { name: "Markenvertrag", min: 5, art: "Setzung" },
  stimme: { name: "Stimme", min: 4, art: "Setzung" },
  portrait: { name: "Porträt-Termin", min: 75, art: "Setzung" },
  reveal: { name: "Reveal", min: 60, art: "Setzung" },
  rueckmeldung: { name: "Rückmeldung", min: 15, art: "Setzung" },
  freigabe: { name: "Freigabe", min: 8, art: "Setzung" },
  drehtag: { name: "Drehtag", min: 210, art: "Annahme" },
  uebergabe: { name: "Übergabe", min: 45, art: "Setzung" },
  umfeld: { name: "Vorschau für das Umfeld", min: 15, art: "Setzung" },
  live: { name: "Live-Termin", min: 30, art: "Setzung" },
  rueckblick: { name: "Rückblick", min: 30, art: "Setzung" },
  import: { name: "Bestand gemeinsam übernehmen", min: 20, art: "Angebot" },
};
function hmDauerMin(aufgaben) { return [].concat(aufgaben || []).reduce((s, a) => s + ((HM_STAND_DAUER[a] || {}).min || 0), 0); }
/* "21 Min." oder "3 Std. 30 Min."; runden: auf volle fünf Minuten aufgerundet */
function hmDauerText(min, runden) {
  let n = Math.max(0, Math.round(Number(min) || 0));
  if (runden) n = Math.ceil(n / 5) * 5;
  if (n < 60) return `${n} Min.`;
  const h = Math.floor(n / 60), r = n % 60;
  return r ? `${h} Std. ${r} Min.` : `${h} Std.`;
}
/* Die Aufgaben dieses Links, getrennt benannt: "21 Minuten: Fragebogen 15, Fremdbild-Link 2, Bildwahl 4." */
function hmStandLinkDauer() {
  const teile = ["fragebogen", "fremdbild", "bildwahl"];
  return { min: hmDauerMin(teile), teile: teile.map((a) => ({ id: a, name: HM_STAND_DAUER[a].name, min: HM_STAND_DAUER[a].min })), text: `${hmDauerMin(teile)} Minuten: ${teile.map((a) => `${HM_STAND_DAUER[a].name} ${HM_STAND_DAUER[a].min}`).join(", ")}.` };
}

/* ---------- Datum ---------- */
const HM_STAND_TAG = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const HM_STAND_MONAT = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const hmStandD = (iso) => new Date(String(iso).slice(0, 10) + "T12:00:00");
function hmStandKurz(iso) { if (!iso) return "offen"; const d = hmStandD(iso); return `${HM_STAND_TAG[d.getDay()].slice(0, 2)} ${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.`; }
function hmStandLang(iso, mitTag = true) { if (!iso) return "offen"; const d = hmStandD(iso); return `${mitTag ? HM_STAND_TAG[d.getDay()] + ", " : ""}${d.getDate()}. ${HM_STAND_MONAT[d.getMonth()]}`; }
const HM_STAND_ZAHL = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf", "dreizehn", "vierzehn"];
const hmStandZahl = (n, gross) => { const w = n === 1 && !gross ? "ein" : (HM_STAND_ZAHL[n] || String(n)); return gross ? w.charAt(0).toUpperCase() + w.slice(1) : w; };

/* ---------- Termine: Regeln aus 01_auftakt 3.5 ---------- */
const HM_STAND_WOCHENTAG = { Montag: 1, Dienstag: 2, Mittwoch: 3, Donnerstag: 4, Freitag: 5 };
function hmStandWochentage(mid) {
  const t = ((hmStore.get("auftrag") || {})[mid] || {}).termine || {};
  if (Array.isArray(t.wochentage) && t.wochentage.length) return t.wochentage;
  const a = ((hmStore.get("fragebogen") || {})[mid] || {}).antworten || {};
  const l = (a.verfuegbar || []).map((x) => HM_STAND_WOCHENTAG[x]).filter(Boolean);
  return l.length ? l : [2, 4];
}
/* k Werktage zurück */
function hmStandZurueck(iso, k) { let x = iso, i = 0; while (i < k) { x = hmTagePlus(x, -1); if (hmIstWerktag(x)) i++; } return x; }
function hmStandStart(m) {
  const t = ((hmStore.get("auftrag") || {})[m.id] || {}).termine || {};
  if (t.auftakt) return String(t.auftakt).slice(0, 10);
  const d = new Date(HM_HEUTE + "T12:00:00"); d.setDate(d.getDate() - (m.tag || 0));
  return hmWerktagePlus(hmIsoLokal(d), 0);
}
function hmStandTermine(m) {
  const t = ((hmStore.get("auftrag") || {})[m.id] || {}).termine || {};
  const wt = hmStandWochentage(m.id);
  const istMt = (iso) => hmIstWerktag(iso) && wt.includes(hmStandD(iso).getDay());
  const naechsterMt = (iso) => { let x = iso; for (let i = 0; i < 30 && !istMt(x); i++) x = hmTagePlus(x, 1); return x; };
  const letzterMtBis = (iso) => { let x = iso; for (let i = 0; i < 30 && !istMt(x); i++) x = hmTagePlus(x, -1); return x; };
  const W = hmWerktagePlus;
  const tag = (x) => (x ? String(x).slice(0, 10) : null);
  const auftakt = hmStandStart(m);
  const link = tag(t.link) || W(auftakt, 2);
  const linkBis = tag(t.linkBis) || W(link, 2);
  const workshop = tag(t.workshop) || naechsterMt(W(linkBis, 1));
  const richtung = tag(t.richtung) || letzterMtBis(W(workshop, 5));
  const vertrag = tag(t.vertrag) || W(richtung, 2);
  const reveal = tag(t.reveal) || naechsterMt(W(vertrag, 9));
  const portrait = tag(t.portrait) || letzterMtBis(hmStandZurueck(reveal, 4));
  const rueckmeldung = tag(t.rueckmeldung) || hmTagePlus(reveal, 1);
  const freigabe = tag(t.freigabe) || W(reveal, 3);
  const drehtag = tag(t.drehtag) || W(reveal, 5);
  const uebergabe = tag(t.uebergabe) || W(reveal, 10);
  const umfeld = tag(t.umfeld) || W(reveal, 11);
  const live = tag(t.live) || W(reveal, 13);
  const liveB = tag(t.liveB) || W(reveal, 18);
  let rueckblick = tag(t.rueckblick);
  if (!rueckblick) {
    let x = hmTagePlus(live, 30); const j = hmStandD(x).getFullYear();
    const gesperrt = (iso) => (iso >= `${j}-12-24` && iso <= `${j + 1}-01-06`) || (iso >= `${j - 1}-12-24` && iso <= `${j}-01-06`);
    for (let i = 0; i < 40 && (!istMt(x) || gesperrt(x)); i++) x = hmTagePlus(x, 1);
    rueckblick = x;
  }
  return { auftakt, start: auftakt, link, linkBis, workshop, richtung, vertrag, portrait, reveal, rueckmeldung, rueckmeldungAb: rueckmeldung + "T11:00", freigabe, drehtag, uebergabe, umfeld, live, liveB, rueckblick };
}

/* ---------- Einwilligungen (01_auftakt 3.2 und 3.8), Anzeige in der Reihenfolge der ersten Nutzung ---------- */
const HM_EINWILLIGUNGEN = [
  { n: 7, fassung: 1, name: "KI-Verarbeitung", frist: "werktag1",
    wofuer: "Claude, das Sprachmodell, mit dem wir arbeiten, liest Texte ohne Namen Dritter: die Seiten, die Sie freigeben, Ihre Antworten im Fragebogen und die Mitschrift des Workshops. So schlagen wir Angaben mit Beleg vor, fragen gezielt nach und halten Ihre eigenen Worte genau fest.",
    nein: "Kein Text geht an einen KI-Dienst. Das Team liest und wertet von Hand aus, Rückfragen kommen aus festen Vorlagen. Ihre Marke entsteht vollständig, aber die Rückfragen sind allgemeiner, und die Entwürfe greifen Ihre eigenen Formulierungen weniger genau auf." },
  { n: 1, fassung: 1, name: "Ihr öffentlicher Auftritt", frist: "werktag1",
    wofuer: "Wir lesen Ihre Website, Ihr Google-Profil, Ihre Instagram-Bio und Ihre eigenen Inserate, damit Sie im Fragebogen bestätigen statt eintragen.",
    nein: "Wir lesen nur Ihren Bestand und Ihre Konten, den Rest tragen Sie im Fragebogen selbst ein." },
  { n: 8, fassung: 1, name: "Beispiele fremder Auftritte", frist: "linkBis",
    wofuer: "Sie können uns bis zu drei Auftritte zeigen, die Sie nicht sein wollen. Wir lesen daraus nur ein Merkmal und löschen die Beispiele nach 14 Tagen.",
    nein: "Sie beschreiben in einem Satz, was Sie nicht sein wollen. Wir speichern keinen fremden Auftritt." },
  { n: 3, fassung: 1, name: "Fremdbild-Link", frist: "linkBis",
    wofuer: "Sie bekommen einen Link, den Sie selbst an drei Menschen schicken, die Sie empfehlen würden. Die Antwortenden stimmen auf ihrer Seite selbst zu.",
    nein: "Es gibt kein Fremdbild. Der Abgleich mit Ihren drei Wörtern entfällt." },
  { n: 2, fassung: 1, name: "Aufnahme im Workshop", frist: "workshop",
    wofuer: "Wir nehmen das Gespräch auf und übertragen es auf dem Rechner des Teams in Text. Aufgenommen wird nur, wenn alle Anwesenden zu Beginn zustimmen.",
    nein: "Wir schreiben mit und lesen Ihnen wichtige Sätze zur Bestätigung vor." },
  { n: 4, fassung: 1, name: "Objektfotos zeigen", frist: "revealMinus7",
    wofuer: "Eigene Objekte mit geklärten Bildrechten erscheinen im Feed-Vorschlag, im Markenbuch und im Reveal.",
    nein: "An ihrer Stelle stehen ruhige Flächen mit einem Satz, was dort später steht." },
  { n: 5, fassung: 1, name: "Reveal aufzeichnen", frist: "revealMinus2",
    wofuer: "Eine Aufzeichnung als Nachlese für Partner oder Büro. Aufgenommen wird nur, wenn alle Anwesenden zustimmen.",
    nein: "Die Nachlese besteht aus den Folien und unseren Notizen." },
  { n: 6, fassung: 1, name: "Gespräch am Drehtag aufnehmen", frist: "drehtag",
    wofuer: "Am Ende jedes Drehtags stellen wir höchstens zwei Fragen für Ihre nächsten Beiträge und nehmen die Antworten auf, damit wir sie nicht mitschreiben müssen. Ihre Clips selbst sind Teil des Auftrags und brauchen diese Einwilligung nicht.",
    nein: "Wir schreiben Ihre Antworten mit und schicken sie Ihnen zur Bestätigung." },
];
const HM_EINW_WERTE = [["ja", "Ja"], ["nein", "Nein"], ["spaeter", "Später"]];

function hmStandMakler(mid) { return (hmStore.get("makler") || []).find((x) => x.id === mid) || { id: mid, tag: 0, name: "" }; }
/* Frist je Zweck: { iso, text } */
function hmEinwFrist(mid, n, T) {
  const e = HM_EINWILLIGUNGEN.find((x) => x.n === n); if (!e) return null;
  T = T || hmStandTermine(hmStandMakler(mid));
  switch (e.frist) {
    case "werktag1": { const iso = hmWerktagePlus(T.auftakt, 1); return { iso, text: `Offen bis ${hmStandLang(iso)}, 18 Uhr` }; }
    case "linkBis": return { iso: T.linkBis, text: `Offen bis ${hmStandLang(T.linkBis)}, dem Ende des Fragebogens` };
    case "workshop": return { iso: T.workshop, text: `Offen bis zum Workshop am ${hmStandLang(T.workshop, false)}` };
    case "revealMinus7": { const iso = hmStandZurueck(T.reveal, 7); return { iso, text: `Offen bis ${hmStandLang(iso)}` }; }
    case "revealMinus2": { const iso = hmStandZurueck(T.reveal, 2); return { iso, text: `Offen bis ${hmStandLang(iso)}` }; }
    case "drehtag": return { iso: T.drehtag, text: `Offen bis zum ersten Drehtag am ${hmStandLang(T.drehtag, false)}` };
    default: return null;
  }
}
function hmEinwEintrag(mid, n) { return (((hmStore.get("auftrag") || {})[mid] || {}).einwilligungen || {})[n] || null; }
/* Gilt nur mit Datum. Ohne Entscheidung "offen"; offen oder später zählt nach der Frist als Nein */
function hmEinwilligung(mid, n) {
  const e = hmEinwEintrag(mid, n);
  const gueltig = !!(e && e.datum && ["ja", "nein", "spaeter"].includes(e.wert));
  if (gueltig && e.wert !== "spaeter") return e.wert;
  let f = null; try { f = hmEinwFrist(mid, n); } catch (x) { f = null; }
  if (f && f.iso && HM_HEUTE > f.iso) return "nein";
  return gueltig ? "spaeter" : "offen";
}
function hmEinwSetzen(mid, n, wert, wer) {
  const e = HM_EINWILLIGUNGEN.find((x) => x.n === n) || {};
  const eintrag = { wert, datum: new Date().toISOString(), fassung: e.fassung || 1, wer: wer || "Makler" };
  hmStore.patch("auftrag", (a) => { const x = { ...((a || {})[mid] || {}) }; x.einwilligungen = { ...(x.einwilligungen || {}), [n]: eintrag }; return { ...(a || {}), [mid]: x }; });
  hmEvent(mid, "einwilligung", `Einwilligung ${n} (${e.name}): ${wert}, Fassung ${e.fassung || 1}`, wer || "Makler");
}

/* ---------- Die vierzehn Momente mit Stand aus den echten Daten ---------- */
function hmStandSchritte(m) {
  const mid = m.id;
  const fb2 = (hmStore.get("fragebogen2") || {})[mid] || {};
  const fb = (hmStore.get("fragebogen") || {})[mid] || {};
  const a = fb.antworten || {};
  const st = (hmStore.get("strategien") || {})[mid];
  const rev = (hmStore.get("reveal") || {})[mid] || {};
  const rm = (hmStore.get("rueckmeldung") || {})[mid] || {};
  const web = (hmStore.get("website") || {})[mid] || {};
  const auf = (hmStore.get("auftrag") || {})[mid] || {};
  const mb = window.hmMbStand ? hmMbStand(mid) : {};
  const q = window.hmQuelle ? hmQuelle(mid) : null;
  const T = hmStandTermine(m);
  const vorbei = (iso) => !!iso && HM_HEUTE > String(iso).slice(0, 10);
  const bezirk = String((a.bezirke || [])[0] || m.region || "").replace(/^\d{4}\s*/, "");
  const live = web.status === "live";
  const offenAb = String(rm.offenAb || T.rueckmeldungAb);
  const oa = new Date(offenAb.length > 10 ? offenAb : offenAb + "T11:00");
  const offenText = `Öffnet am ${hmStandLang(hmIsoLokal(oa))}, ${oa.getHours()}${oa.getMinutes() ? "." + String(oa.getMinutes()).padStart(2, "0") : ""} Uhr.`;
  const L = [
    { id: "auftakt", art: "gespraech", name: "Auftakt-Gespräch", datum: T.auftakt, aufgaben: ["auftakt", "upload"], tun: "Plan, Termine und Einwilligungen. Danach laden Sie Logo und Fotos hoch.", fertig: HM_HEUTE >= T.auftakt },
    { id: "link", art: "link", name: "Fragebogen und Bildwahl", datum: T.link, bis: T.linkBis, aufgaben: ["fragebogen", "fremdbild", "bildwahl"], tun: "23 Fragen zu Ihren Fällen und Kunden, danach vier Fotopaare und eine Schriftprobe.", fertig: !!fb2.fertig || !!fb.fertig, aktion: "fragebogen", knopf: "Fragebogen öffnen" },
    { id: "workshop", art: "termin", name: "Workshop", datum: T.workshop, aufgaben: ["workshop"], tun: bezirk ? `Ihre Fälle aus ${bezirk}, in Ihren Worten.` : "Ihre Fälle, in Ihren Worten.", fertig: !!st },
    { id: "richtung", art: "termin", name: "Richtungstermin", datum: T.richtung, aufgaben: ["richtung"], tun: "Zwei Richtungen, eine davon empfehlen wir mit Begründung.", fertig: !!(st && st.gewaehlt && (st.status === "aktiv" || st.status === "geprueft")) },
    { id: "vertrag", art: "link", name: "Markenvertrag und Stimme im Link", datum: T.vertrag, aufgaben: ["vertrag", "stimme"], tun: "Sie bestätigen in wenigen Sätzen, wofür Ihre Marke steht und wie sie klingt.", fertig: !!rev.am || mb.status === "pruefung" || mb.status === "freigegeben" },
    auf.portraitTermin === false ? null : { id: "portrait", art: "termin", name: "Porträt-Termin", datum: T.portrait, aufgaben: ["portrait"], tun: "Vorgemerkt. Nur wenn die vorhandenen Porträts nicht reichen.", fertig: !!rev.am || vorbei(T.portrait) },
    { id: "reveal", art: "termin", name: "Reveal", datum: T.reveal, aufgaben: ["reveal"], tun: "Wir zeigen Ihre Marke im Einsatz. Heute zeigen wir, am Tag danach entscheiden Sie.", fertig: !!rev.am },
    { id: "rueckmeldung", art: "link", name: "Ihre Rückmeldung im Link", datum: T.rueckmeldung, aufgaben: ["rueckmeldung"], tun: rm.abgeschickt ? "Abgeschickt. Danke." : offenText, fertig: !!rm.abgeschickt, aktion: rev.am ? "rueckmeldung" : null, knopf: "Rückmeldung geben" },
    { id: "freigabe", art: "link", name: "Freigabe im Link", datum: T.freigabe, aufgaben: ["freigabe"], tun: "Sie geben die Marke frei. Ab dann gilt diese Fassung überall.", fertig: !!q },
    { id: "drehtag", art: "termin", name: "Drehtag", datum: T.drehtag, aufgaben: ["drehtag"], tun: "Vorgemerkt. Dauer geschätzt, genau nach dem Fotobrief.", fertig: !!q && vorbei(T.drehtag) },
    { id: "uebergabe", art: "termin", name: "Übergabe", datum: T.uebergabe, aufgaben: ["uebergabe"], tun: "Website, Konten und die ersten Beiträge gehen an Sie.", fertig: !!q && vorbei(T.uebergabe) },
    { id: "umfeld", art: "link", name: "Vorschau für das Umfeld", datum: T.umfeld, aufgaben: ["umfeld"], tun: "Ein Link für Menschen, die es vor allen anderen sehen sollen.", fertig: !!q && vorbei(T.umfeld) },
    { id: "live", art: "termin", name: "Live-Tag", datum: T.live, aufgaben: ["live"], tun: live ? "Ihre Marke ist live." : `Braucht Ihre Rückmeldung eine größere Änderung, wird es ${hmStandLang(T.liveB)}.`, fertig: live },
    { id: "rueckblick", art: "termin", name: "Rückblick", datum: T.rueckblick, aufgaben: ["rueckblick"], tun: "Was die ersten 30 Tage gebracht haben und was wir ändern.", fertig: live && vorbei(T.rueckblick) },
  ].filter(Boolean).map((s) => ({ ...s, min: hmDauerMin(s.aufgaben) }));
  const naechster = L.find((x) => !x.fertig) || null;
  const einwOffen = HM_EINWILLIGUNGEN.filter((e) => ["offen", "spaeter"].includes(hmEinwilligung(mid, e.n))).length;
  const summe = L.reduce((s, x) => s + x.min, 0);
  return { L, naechster, T, einwOffen, summe };
}

/* ---------- Oberfläche ---------- */
function EinwilligungKarte({ m, e, wer, T }) {
  const w = hmEinwilligung(m.id, e.n);
  const ein = hmEinwEintrag(m.id, e.n);
  const f = hmEinwFrist(m.id, e.n, T);
  const [aendern, setAendern] = React.useState(false);
  const entschieden = (w === "ja" || w === "nein") && !aendern;
  const abgelaufen = w === "nein" && !(ein && ein.datum && ein.wert === "nein");
  const seit = abgelaufen && f ? hmStandLang(f.iso, false) : ein && ein.datum ? hmStandLang(hmIsoLokal(new Date(ein.datum)), false) : "";
  const setzen = (id) => { hmEinwSetzen(m.id, e.n, id, wer); setAendern(false); };
  return <div className="hm-einw">
    <div className="t">{e.name}</div>
    <p>{e.wofuer}</p>
    <p>Wenn nicht: {e.nein}</p>
    {entschieden ? <div className="stand">
      <span>{w === "ja" ? "Ja" : "Nein"}, seit {seit}{abgelaufen ? ", weil die Frist ohne Antwort abgelaufen ist" : ""}.</span>
      <button className="hm-link" onClick={() => setAendern(true)}>Ändern</button>
    </div> : <>
      {f && <div className="frist">{f.text}.{w === "spaeter" ? " Sie haben Später gewählt." : ""}</div>}
      <div className="hm-einw-knoepfe" role="group" aria-label={e.name}>{HM_EINW_WERTE.map(([id, t]) => <button key={id} aria-pressed={w === id && !aendern ? "true" : "false"} onClick={() => setzen(id)}>{t}</button>)}</div>
    </>}
  </div>;
}

function StandAblauf({ m, d, aktion }) {
  const { L, naechster, T, summe } = d;
  const a = ((hmStore.get("fragebogen") || {})[m.id] || {}).antworten || {};
  const ort = String(a.graetzl || "").split(",")[0].trim() || String((a.bezirke || [])[0] || m.region || "").replace(/^\d{4}\s*/, "");
  const termine = L.filter((x) => x.art === "termin").length, aufgaben = L.filter((x) => x.art === "link").length;
  const dreh = L.find((x) => x.id === "drehtag");
  const live = L.find((x) => x.id === "live");
  const monatRb = HM_STAND_MONAT[hmStandD(T.rueckblick).getMonth()];
  return <>
    <header>
      <h1 className="hm-h hm-stand-titel">{hmStandLang(T.live)}.</h1>
      <p className="hm-stand-intro">{live && live.fertig ? `Seit diesem Tag ist Ihre Marke live${ort ? " in " + ort : ""}. Der Rückblick folgt am ${hmStandLang(T.rueckblick, false)}.` : `Geplant als Ihr Live-Tag${ort ? " in " + ort : ""}. Fest wird er mit Ihrer Rückmeldung nach dem Reveal. Bis zum Rückblick im ${monatRb} sind es ${hmStandZahl(termine)} Termine mit uns und ${hmStandZahl(aufgaben)} kurze Aufgaben im Link.`}</p>
    </header>
    <p className="hm-stand-summe">Ihre Zeit insgesamt: etwa {hmDauerText(summe, true)}{dreh ? `, davon etwa ${hmDauerText(dreh.min, true)} am Drehtag` : ""}. Die Zeiten sind unsere Schätzung, wir messen und korrigieren sie.</p>
    <section className="hm-stand-plan" aria-label="Ablauf">
      {L.map((s) => { const jetzt = !!naechster && naechster.id === s.id; const los = jetzt ? aktion(s) : null; return <div key={s.id} className={"hm-stand-s" + (s.fertig ? " fertig" : jetzt ? " jetzt" : "")} aria-current={jetzt ? "step" : undefined}>
        <div className="dt">{hmStandKurz(s.datum)}</div>
        <div className="m">
          <div className="t">{s.name}{s.fertig ? ", erledigt" : ""}</div>
          <div className="u">{s.tun}{s.bis && !s.fertig ? ` Bis ${hmStandLang(s.bis)}.` : ""}</div>
          {los && <div className="tun"><Btn onClick={los}>{s.knopf}</Btn></div>}
        </div>
        <div className="dauer">{hmDauerText(s.min)}</div>
      </div>; })}
    </section>
  </>;
}

function StandEinwilligungen({ m, allein, T }) {
  const beantwortet = HM_EINWILLIGUNGEN.filter((e) => ["ja", "nein"].includes(hmEinwilligung(m.id, e.n))).length;
  const monatRb = HM_STAND_MONAT[hmStandD(T.rueckblick).getMonth()];
  return <>
    <header><h1 className="hm-h hm-stand-titel">{beantwortet ? `${hmStandZahl(beantwortet, true)} von acht beantwortet.` : "Acht Fragen zu Ihren Daten. Jede hat eine Frist."}</h1>
      <p className="hm-stand-intro">Nichts ist vorgewählt. Jede Entscheidung gilt ab sofort und lässt sich ändern. Einen Werktag vor jeder offenen Frist erinnern wir Sie einmal.</p></header>
    <section className="hm-einw-liste" aria-label="Einwilligungen">{HM_EINWILLIGUNGEN.map((e) => <EinwilligungKarte key={e.n} m={m} e={e} T={T} wer={allein ? "Makler" : "Team"} />)}</section>
    <section className="hm-stand-daten" aria-label="Was mit Ihren Daten passiert">
      <h2 className="hm-h hm-h3">Was mit Ihren Daten passiert</h2>
      <p>Wir lesen Ihren Bestand ohne Kontakte und nur die Quellen, zu denen Sie Ja gesagt haben.</p>
      <p>Alles liegt in der geschützten Werkbank von UNIO. Sie brauchen kein Konto bei einem fremden Werkzeug.</p>
      <p>An Claude, das Sprachmodell, mit dem wir arbeiten, geht nur etwas, wenn Sie der KI-Verarbeitung zustimmen: freigegebene Texte, gerundete Eckdaten Ihrer Abschlüsse, Ihre Antworten und die Mitschrift des Workshops. Nie Adressen, Kontakte oder Bilder.</p>
      <p>Sehen können es Sie und das Team, das Ihre Marke baut. Wer mitentscheidet, bekommt die Einladungen von Ihnen weitergeleitet, wir speichern keine Kontaktdaten dieser Person.</p>
      <p>Screenshots Ihres heutigen Auftritts löschen wir nach dem Rückblick im {monatRb}. Wann wir Aufnahmen löschen, steht hier, sobald es festgelegt ist.</p>
    </section>
  </>;
}

function StandGelesen({ m, d, aktion }) {
  const fb = (hmStore.get("fragebogen") || {})[m.id] || {};
  const fb2 = (hmStore.get("fragebogen2") || {})[m.id] || {};
  const a = fb.antworten || {};
  const b = hmBrand(m.id);
  const kanalNamen = ["Website", "LinkedIn", "Instagram", "Facebook", "TikTok", "YouTube"];
  const kanaele = (a.bestand || []).filter((x) => kanalNamen.includes(x));
  const bezirke = (a.bezirke || []).map((x) => String(x).replace(/^\d{4}\s*/, ""));
  const quelle = "aus Ihren Angaben";
  const fakten = [
    bezirke.length && { w: bezirke.join(", ") + ".", q: `Bezirke in Ihrer Reihenfolge, ${quelle}` },
    (a.immotypen || []).length && { w: a.immotypen.join(", ") + ".", q: `Objektarten, ${quelle}` },
    a.seit && { w: a.seit + ".", q: `Ihre Erfahrung, ${quelle}. Das Jahr fragen wir nach.` },
    kanaele.length && { w: kanaele.join(", ") + ".", q: `Ihre Kanäle heute, ${quelle}` },
  ].filter(Boolean).slice(0, 5);
  const titel = a.graetzl ? a.graetzl + "." : bezirke.length ? bezirke[0] + "." : null;
  const fehlt = [
    (a.bestand || []).includes("Logo") && !b.logoAlt && "Ihr Logo als Datei, am besten vom Gestalter.",
    "Ihre verkauften Objekte, damit wir rechnen statt schätzen.",
  ].filter(Boolean);
  const ld = hmStandLinkDauer();
  const los = aktion({ aktion: "fragebogen" });
  const begonnen = fb2.antworten && Object.keys(fb2.antworten).length > 0;
  if (!titel && !fakten.length) return <header><h1 className="hm-h hm-stand-titel">Noch kein Bestand übernommen.</h1><p className="hm-stand-intro">Wir schätzen nichts, um diese Seite zu füllen. Den Bestand übernehmen wir gerne mit Ihnen gemeinsam, das dauert {hmDauerText(hmDauerMin("import"))}</p></header>;
  return <>
    <header>
      <h1 className="hm-h hm-stand-titel">{titel}</h1>
      {a.graetzl && <div className="hm-stand-quelle">Ihr Grätzl, {quelle}</div>}
      <p className="hm-stand-intro">So haben wir Ihre Angaben gelesen. Im Fragebogen bestätigen oder ändern Sie jede Zeile. Erst danach arbeiten wir damit.</p>
    </header>
    <section className="hm-stand-fakten" aria-label="Ihre Angaben">{fakten.map((f) => <div key={f.q} className="hm-stand-fakt"><div className="w">{f.w}</div><div className="q">{f.q}</div></div>)}</section>
    <section className="hm-stand-fehlt"><h3>Was uns noch fehlt</h3>{fehlt.map((x) => <p key={x}>{x}</p>)}</section>
    <p className="hm-stand-summe">Gelesen aus Ihren Angaben{b.portrait ? " und einem Porträt" : ""}.</p>
    {los && <div className="hm-stand-los"><Btn onClick={los}>{fb2.fertig ? "Fragebogen ansehen" : begonnen ? "Fragebogen fortsetzen" : "Fragebogen beginnen"}</Btn><span className="hm-daten">{ld.text} Sie können jederzeit unterbrechen.</span></div>}
  </>;
}

const HM_STAND_REITER = [["ablauf", "Ablauf"], ["einwilligungen", "Einwilligungen"], ["stand", "Ihr Stand"]];
function IhrStand({ m, allein, oeffne, reiter: start }) {
  hmStandStil();
  useHm("auftrag"); useHm("fragebogen2"); useHm("fragebogen"); useHm("strategien"); useHm("reveal"); useHm("rueckmeldung"); useHm("marke2"); useHm("website"); useHm("markenbuch"); useHm("branding");
  const [reiter, setReiter] = React.useState(start || "ablauf");
  const d = hmStandSchritte(m);
  const aktion = (s) => { if (!s || !s.aktion) return null; return oeffne ? () => oeffne(s.aktion) : () => { location.href = `${location.pathname}?ansicht=${s.aktion}&makler=${encodeURIComponent(m.id)}`; }; };
  const tasten = (ev) => { const i = HM_STAND_REITER.findIndex((r) => r[0] === reiter); const n = ev.key === "ArrowRight" ? 1 : ev.key === "ArrowLeft" ? -1 : 0; if (!n) return; ev.preventDefault(); const z = HM_STAND_REITER[(i + n + HM_STAND_REITER.length) % HM_STAND_REITER.length][0]; setReiter(z); const el = document.getElementById("stand-reiter-" + z); if (el) el.focus(); };
  return <div className={"hm-stand" + (allein ? " allein" : "")}>
    <div className="hm-stand-reiter" role="tablist" aria-label={`Ihr Stand, ${m.name}`} onKeyDown={tasten}>
      {HM_STAND_REITER.map(([id, t]) => <button key={id} id={"stand-reiter-" + id} role="tab" aria-selected={reiter === id} tabIndex={reiter === id ? 0 : -1} aria-controls={"stand-teil-" + id} onClick={() => setReiter(id)}>{t}{id === "einwilligungen" && d.einwOffen ? `, ${d.einwOffen} offen` : ""}</button>)}
    </div>
    <div id={"stand-teil-" + reiter} role="tabpanel" aria-labelledby={"stand-reiter-" + reiter} className="hm-stand">
      {reiter === "ablauf" && <StandAblauf m={m} d={d} aktion={aktion} />}
      {reiter === "einwilligungen" && <StandEinwilligungen m={m} allein={allein} T={d.T} />}
      {reiter === "stand" && <StandGelesen m={m} d={d} aktion={aktion} />}
    </div>
  </div>;
}

/* Kurzkarte für Heute: nur Text, kein Balken */
function StandKarte({ m, oeffne }) {
  hmStandStil();
  useHm("auftrag"); useHm("fragebogen2"); useHm("fragebogen"); useHm("reveal"); useHm("rueckmeldung"); useHm("strategien");
  const { L, naechster } = hmStandSchritte(m);
  const erledigt = L.filter((x) => x.fertig).length;
  return <button className="hm-stand-karte" onClick={oeffne}>
    <div className="m"><div className="t">Ihr Stand</div><div className="u">{naechster ? `Als Nächstes: ${naechster.name}, ${hmStandKurz(naechster.datum)}` : "Alles erledigt, Ihre Marke ist live."}</div></div>
    <span className="z">{erledigt} von {L.length}</span>
  </button>;
}

function hmSelbsttestStand() {
  const out = []; const t = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: e.message }); } };
  const m = hmStandMakler("markus");
  const mitAuftrag = (patch, fn) => { const alt = hmStore.get("auftrag"); try { hmStore.put("auftrag", patch(alt || {})); return fn(); } finally { hmStore.put("auftrag", alt); } };
  t("Acht Einwilligungen mit Zweck, Folge, Frist und Fassung", () => ({ ok: HM_EINWILLIGUNGEN.length === 8 && new Set(HM_EINWILLIGUNGEN.map((e) => e.n)).size === 8 && HM_EINWILLIGUNGEN.every((e) => e.wofuer && e.nein && e.frist && e.fassung) }));
  t("Reihenfolge der ersten Nutzung", () => ({ ok: HM_EINWILLIGUNGEN.map((e) => e.n).join(",") === "7,1,8,3,2,4,5,6" }));
  t("Keine Einwilligung ohne Datum gilt als Ja", () => mitAuftrag((a) => ({ ...a, __test: { einwilligungen: { 7: { wert: "ja" } } } }), () => { const w = hmEinwilligung("__test", 7); return { ok: w !== "ja", detail: w }; }));
  t("Vierzehn Momente aus echten Daten", () => { const s = hmStandSchritte(m); return { ok: s.L.length === 14 && s.L.every((x) => x.datum && x.min > 0), detail: s.naechster ? "Als Nächstes " + s.naechster.name : "alles erledigt" }; });
  t("Summe für Markus 683 Minuten", () => { const s = hmStandSchritte(m); return { ok: s.summe === 683, detail: `${s.summe} Min., angezeigt ${hmDauerText(s.summe, true)}` }; });
  t("Termine an Werktagen, ohne Feiertage", () => { const T = hmStandTermine(m); const l = ["auftakt", "link", "linkBis", "workshop", "richtung", "vertrag", "portrait", "reveal", "freigabe", "drehtag", "uebergabe", "umfeld", "live", "liveB", "rueckblick"]; const bad = l.filter((k) => !hmIstWerktag(T[k])); return { ok: !bad.length, detail: bad.join(", ") || `Reveal ${T.reveal}, live ${T.live}` }; });
  t("Regeln wie im Beispiel (Gespräch am 05.10.)", () => mitAuftrag((a) => ({ ...a, markus: { ...(a.markus || {}), termine: { auftakt: "2026-10-05" } } }), () => { const T = hmStandTermine(m); const soll = { link: "2026-10-07", linkBis: "2026-10-09", workshop: "2026-10-13", richtung: "2026-10-20", vertrag: "2026-10-22", portrait: "2026-10-29", reveal: "2026-11-05", freigabe: "2026-11-10", drehtag: "2026-11-12", uebergabe: "2026-11-19", umfeld: "2026-11-20", live: "2026-11-24", liveB: "2026-12-01", rueckblick: "2027-01-07" }; const bad = Object.keys(soll).filter((k) => T[k] !== soll[k]); return { ok: !bad.length, detail: bad.map((k) => `${k} ${T[k]}`).join(", ") || "alle Termine wie im Dokument" }; }));
  t("Link-Dauer aus derselben Quelle", () => { const l = hmStandLinkDauer(); return { ok: l.min === 21 && l.text === "21 Minuten: Fragebogen 15, Fremdbild-Link 2, Bildwahl 4.", detail: l.text }; });
  t("Immer Sie, nie Hallo, keine Anrede-Logik", () => { const src = [IhrStand, StandAblauf, StandEinwilligungen, StandGelesen, EinwilligungKarte].map(String).join("\n"); return { ok: !/Hallo/.test(src) && !/hmAnrede/.test(src) }; });
  t("Kein Minutenliteral außerhalb von HM_STAND_DAUER", () => { const src = [IhrStand, StandAblauf, StandEinwilligungen, StandGelesen, hmStandSchritte, StandKarte].map(String).join("\n"); const treffer = src.match(/\d+\s*(Minuten|Min\.|Stunden|Std\.)/g) || []; return { ok: !treffer.length, detail: treffer.join(", ") }; });
  return out;
}

Object.assign(window, { HM_EINWILLIGUNGEN, HM_STAND_DAUER, hmDauerMin, hmDauerText, hmStandLinkDauer, hmEinwilligung, hmEinwSetzen, hmEinwFrist, hmStandTermine, hmStandSchritte, hmStandKurz, hmStandLang, IhrStand, StandKarte, EinwilligungKarte, hmSelbsttestStand, hmStandStil });
