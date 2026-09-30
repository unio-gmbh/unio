/* Werkbank. Feed im Profilkopf (Auftrag A der Chef-Briefs, 30.09.2026).
   Der Makler sieht sein Instagram-Profil nach Woche 1 bis 4: Profilkopf, die Startwoche angepinnt in der Anzeige [3, 2, 1],
   darunter der Strom mit dem neuesten Beitrag links oben, jede Kachel mit Caption. Grundlage: 13_feed 3.3 bis 3.14,
   FEED_FINAL 5 und 6, docs/werkbank/erlebnis/CHEF_BRIEFS.md Kapitel 1.
   Quelle der Inhalte in fester Reihenfolge: marke2[mid].feed.kacheln (zwölf Einträge, unverändert), sonst Regelpfad aus
   hmMbPlattform(mid). Nie HM_WELT_HOOKS, nie hmWeltFeedPosts, nie die Vorgaben aus hmWeltPostDaten: die Daten für WeltPost
   baut dieses Modul selbst. Liest plattformen, marke2, branding, portraits, auftrag. Schreibt nichts in hmStore. */

/* ---------- CSS, einmalig ---------- */
function hmFeed2Stil() {
  if (typeof document === "undefined" || document.getElementById("stil-feed2")) return;
  const s = document.createElement("style");
  s.id = "stil-feed2";
  s.textContent = `
.hm-fd2-vergleich, .hm-fd2-spalte, .hm-fd2-beitrag, .hm-fd2-abschnitt { --fd2-leise: rgba(27, 26, 22, .74); }
.hm-fd2-abschnitt { display: block; min-width: 0; }
.hm-fd2-absatz { font-size: 16px; line-height: 24px; max-width: 60ch; margin: 8px 0 20px; color: var(--ink); }
.hm-fd2-vergleich { display: flex; flex-direction: column; gap: 14px; min-width: 0; }
.hm-fd2-modus, .hm-fd2-wochen { display: grid; border: 1px solid var(--hairline-dark); border-radius: 12px; overflow: hidden; background: var(--surface-raised); align-self: flex-start; max-width: 100%; }
.hm-fd2-modus { grid-template-columns: repeat(3, auto); }
.hm-fd2-wochen { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.hm-fd2-modus button, .hm-fd2-wochen button { appearance: none; border: 0; border-left: 1px solid var(--hairline-dark); background: transparent; color: var(--ink); font: inherit; font-size: 14px; line-height: 20px; padding: 9px 16px; cursor: pointer; text-align: left; }
.hm-fd2-modus button:first-child, .hm-fd2-wochen button:first-child { border-left: 0; }
.hm-fd2-modus button.on, .hm-fd2-wochen button.on { background: var(--ink); color: var(--paper); }
.hm-fd2-wochen button { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; padding: 8px 14px; min-width: 0; }
.hm-fd2-wochen .d { font-size: 12px; line-height: 16px; color: var(--fd2-leise); font-variant-numeric: tabular-nums; white-space: nowrap; }
.hm-fd2-wochen button.on .d { color: var(--paper); }
.hm-fd2-achse { margin: 0; font-size: 15px; line-height: 22px; max-width: 60ch; color: var(--ink); }
.hm-fd2-hinweis { margin: 0; font-size: 14px; line-height: 20px; color: var(--ink); border-left: 2px solid var(--ink); padding-left: 10px; max-width: 60ch; }
.hm-fd2-profile { display: flex; flex-direction: column; align-items: center; gap: 28px; min-width: 0; }
.hm-fd2-profile.neben { flex-direction: row; justify-content: center; align-items: flex-start; gap: 24px; }
.hm-fd2-rahmen { margin: 0; display: flex; flex-direction: column; gap: 10px; width: 100%; min-width: 0; }
.hm-fd2-rahmen figcaption { font-size: 14px; line-height: 20px; color: var(--ink); }
.hm-fd2-spalte { width: 100%; margin: 0 auto; background: var(--paper-2); color: var(--ink); padding-bottom: 14px; min-width: 0; }
.hm-fd2-kopf { padding: 14px 12px 14px; }
.hm-fd2-konto { font-size: 15px; line-height: 20px; font-weight: 600; overflow-wrap: anywhere; }
.hm-fd2-leise { color: var(--fd2-leise); font-weight: 400; }
.hm-fd2-oben { display: flex; align-items: center; gap: 14px; margin-top: 12px; }
.hm-fd2-bild { width: 80px; height: 80px; border-radius: 50%; overflow: hidden; flex: none; background: var(--surface-raised); border: 1px solid var(--hairline-dark); }
.hm-fd2-bild img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 18%; display: block; }
.hm-fd2-bild.luecke { display: grid; place-items: center; text-align: center; padding: 6px; font-size: 12px; line-height: 14px; color: var(--fd2-leise); }
.hm-fd2-wer { min-width: 0; }
.hm-fd2-name { font-size: 15px; line-height: 20px; font-weight: 600; }
.hm-fd2-zeile { font-size: 13px; line-height: 18px; color: var(--fd2-leise); }
.hm-fd2-bio { font-size: 14px; line-height: 20px; margin-top: 10px; overflow-wrap: anywhere; }
.hm-fd2-hls { display: flex; gap: 14px; margin-top: 16px; }
.hm-fd2-hl { appearance: none; border: 0; background: none; padding: 0; margin: 0; font: inherit; color: var(--ink); display: flex; flex-direction: column; align-items: center; gap: 6px; width: 72px; cursor: pointer; }
.hm-fd2-hl:disabled { cursor: default; }
.hm-fd2-hl-kreis { display: block; width: 64px; height: 64px; border-radius: 50%; overflow: hidden; position: relative; background: var(--surface-raised); border: 1px solid var(--hairline-dark); }
.hm-fd2-hl-bild { position: absolute; left: 0; top: 0; }
.hm-fd2-hl-bild svg { display: block; }
.hm-fd2-hl-name { font-size: 12px; line-height: 16px; max-width: 72px; text-align: center; overflow-wrap: anywhere; }
.hm-fd2-raster { display: flex; flex-direction: column; }
.hm-fd2-reihe { display: grid; grid-template-columns: repeat(3, auto); justify-content: space-between; }
.hm-fd2-reihe.neu { animation: hmFd2Ein 240ms cubic-bezier(.2, .7, .2, 1) both; }
@keyframes hmFd2Ein { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .hm-fd2-reihe.neu { animation: none; } }
.hm-fd2-kachel { appearance: none; border: 0; padding: 0; margin: 0; display: block; position: relative; overflow: hidden; background: var(--surface-raised); cursor: pointer; }
.hm-fd2-kachel svg { display: block; }
.hm-fd2-pin { position: absolute; top: 6px; right: 6px; width: 20px; height: 20px; border-radius: 50%; background: var(--surface-raised); color: var(--ink); display: grid; place-items: center; pointer-events: none; }
.hm-fd2-kachel:focus-visible { outline: 2px solid var(--ink); outline-offset: -2px; box-shadow: inset 0 0 0 4px var(--paper); }
.hm-fd2-hl:focus-visible, .hm-fd2-modus button:focus-visible, .hm-fd2-wochen button:focus-visible, .hm-fd2-blaettern button:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; position: relative; z-index: 1; }
.hm-fd2-beitrag { display: grid; grid-template-columns: minmax(0, 400px) minmax(0, 1fr); gap: 28px; align-items: start; }
.hm-fd2-medium svg { display: block; max-width: 100%; height: auto; }
.hm-fd2-blaettern { display: flex; align-items: center; gap: 12px; margin-top: 12px; font-size: 14px; line-height: 20px; color: var(--ink); font-variant-numeric: tabular-nums; }
.hm-fd2-blaettern button { width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--hairline-dark); background: var(--surface-raised); color: var(--ink); display: grid; place-items: center; cursor: pointer; padding: 0; }
.hm-fd2-blaettern button:disabled { opacity: .45; cursor: default; }
.hm-fd2-satz, .hm-fd2-lese { font-size: 17px; line-height: 1.5; margin: 14px 0 0; color: var(--ink); max-width: 60ch; }
.hm-fd2-text > .hm-fd2-lese:first-child { margin-top: 0; }
.hm-fd2-text > .hm-fd2-lese:first-child + .hm-fd2-caption { margin-top: 16px; }
.hm-fd2-caption { font-size: 17px; line-height: 1.5; max-width: 60ch; color: var(--ink); white-space: pre-line; }
.hm-fd2-notiz { border-top: 1px solid var(--hairline-dark); padding-top: 2px; max-width: 60ch; }
.hm-fd2-caption p { margin: 0 0 1em; }
.hm-fd2-caption .luecke { color: var(--fd2-leise); padding-left: 12px; border-left: 2px solid var(--hairline-dark); }
.hm-fd2-caption .entwurf { padding-left: 12px; border-left: 2px solid var(--hairline-dark); }
.hm-fd2-auftrag { display: block; font-size: 14px; line-height: 20px; color: var(--ink); margin-top: 4px; }
.hm-fd2-team { margin-top: 22px; padding-top: 16px; border-top: 1px solid var(--hairline-dark); font-size: 14px; line-height: 20px; color: var(--ink); }
.hm-fd2-team h4 { font-size: 14px; line-height: 20px; font-weight: 600; margin: 14px 0 6px; }
.hm-fd2-team h4:first-child { margin-top: 0; }
.hm-fd2-team ul, .hm-fd2-pruef ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
.hm-fd2-team li { display: grid; grid-template-columns: minmax(0, 150px) minmax(0, 1fr); gap: 10px; }
.hm-fd2-team code, .hm-fd2-pruef code { font-size: 12px; line-height: 18px; overflow-wrap: anywhere; }
.hm-fd2-pruef { margin-top: 32px; display: grid; gap: 22px; font-size: 14px; line-height: 20px; color: var(--ink); }
.hm-fd2-pruef h4 { font-size: 16px; line-height: 22px; font-weight: 600; margin: 0 0 8px; }
.hm-fd2-pruef .zeile { display: grid; grid-template-columns: 18px minmax(0, 230px) minmax(0, 1fr); gap: 10px; align-items: start; }
.hm-fd2-pruef .luecke { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 90px) minmax(0, 220px); gap: 10px; }
.hm-fd2-pruef .zeichen { padding-top: 2px; color: var(--ink); }
@media (max-width: 760px) { .hm-fd2-beitrag { grid-template-columns: minmax(0, 1fr); gap: 18px; } }
@media (max-width: 560px) {
  .hm-overlay:has(.hm-fd2-beitrag) { padding: 0; }
  .hm-sheet:has(.hm-fd2-beitrag) { width: 100%; min-height: 100%; border-radius: 0; }
  .hm-fd2-team li, .hm-fd2-pruef .zeile, .hm-fd2-pruef .luecke { grid-template-columns: minmax(0, 1fr); gap: 2px; }
  .hm-fd2-pruef .zeichen { display: none; }
}
@media (max-width: 460px) {
  .hm-fd2-modus, .hm-fd2-wochen { width: 100%; }
  .hm-fd2-modus { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .hm-fd2-modus button { padding: 9px 8px; font-size: 13px; line-height: 18px; text-align: center; }
  .hm-fd2-wochen button { padding: 8px 8px; }
}
`;
  document.head.appendChild(s);
}

/* ---------- Takt und feste Sätze ---------- */
const HM_FEED2_TAKT = {
  plaetze: [
    { platz: 1, rolle: "Signatur", gesicht: true },
    { platz: 2, rolle: "Nutzen mit Gesicht", gesicht: true },
    { platz: 3, rolle: "Sache ohne Gesicht", gesicht: false },
  ],
  gesichtFormate: ["talking", "qa", "spaziergang", "behind"],
  karussellFormate: ["carousel", "walkthrough"],
  signaturNr: [2, 4, 7, 10],
  gesichtNr: [5, 8, 11],
  sacheNr: [3, 6, 9],
  gegenton: [6, 12],
  flaeche: [6],
  objektNr: 12,
  angepinnt: [3, 2, 1],
  tage: [1, 3, 5],
};
const HM_FD2_LUECKE = {
  hook: "[Erster Satz nach der Hook-Formel der Serie, schreibt das Team]",
  einloesung: "[Einlösung in zwei bis vier Sätzen, schreibt das Team]",
  weitergeben: "[Satz zum Weitergeben an eine benannte Person]",
};
const HM_FD2_AUFTRAG = {
  hook: "Ersten Satz nach der Hook-Formel der Serie schreiben, höchstens 90 Zeichen.",
  einloesung: "Einlösung in zwei bis vier kurzen Sätzen nach stimme.verbindlich schreiben.",
  beleg: "Beleg wörtlich aus plattform.beweise übernehmen.",
  weitergeben: "Satz zum Weitergeben an eine benannte Person oder Rolle schreiben, kein Satz doppelt im Takt.",
};
const HM_FD2_MAKLER_LUECKE = "Diesen Teil schreiben wir mit Ihnen vor dem Live-Tag.";
/* Achsensatz: HELL ist der vom Chef vorgegebene Wortlaut. In einer Welt mit dunklem Grund (Kontrast) kehrt sich der Grundton
   um, der Gegenentwurf steht dort auf hellem Grund; der Satz sagt dann die Wahrheit statt des festen Wortlauts. pole bleibt
   ["papier", "dunkel"], weil die Achse dieselbe ist, nur von der anderen Seite. Mit dem Chef abzustimmen. */
const HM_FD2_ACHSE_HELL = "Dieselben zwölf Beiträge auf dunklem Grund: nur der Grundton wechselt, damit Sie allein die Wirkung der Form vergleichen.";
const HM_FD2_ACHSE_DUNKEL = "Dieselben zwölf Beiträge auf hellem Grund: nur der Grundton wechselt, damit Sie allein die Wirkung der Form vergleichen.";
const HM_FD2_FORMAT = { reel: "Reel", karussell: "Karussell", post: "Einzelbild" };
/* Zahl mit Einheit, wie sie im Beleg steht (Ziffern oder Zahlwort). */
const HM_FD2_ZAHL = "(?<![A-Za-zÄÖÜäöüß])(?:\\d+(?:[.,]\\d+)?|[Ee]ine?|[Zz]wei|[Dd]rei|[Vv]ier|[Ff]ünf|[Ss]echs|[Ss]ieben|[Aa]cht|[Nn]eun|[Zz]ehn|[Ee]lf|[Zz]wölf)\\s?(?:Wochen|Woche|Monaten|Monate|Monat|Jahren|Jahre|Jahr|Prozent|%)(?![A-Za-zÄÖÜäöüß])";
/* Kaufpreis: Mio., Millionen, Euro, Eurozeichen oder Tausendergruppen (600.000). Ein Beleg mit Preis bleibt ganz aus dem Feed. */
const HM_FD2_PREIS = /\bMio\b\.?|\bMillion(?:en)?\b|\bEuro\b|€|\bEUR\b|\b\d{1,3}(?:\.\d{3})+\b/;
/* Titelbild der Highlights: Blickpunkt je Welt im 1080 x 1350-Beitrag. p = Gesicht im Porträt der Hook-Kachel
   (Porträt steht unten im Rahmen, Gesicht im oberen Drittel), ps = gespiegelte Kachel, t = erste Textzeile ohne Porträt. */
const HM_FD2_FOKUS = {
  ruhig: { p: [718, 330], ps: [386, 330], t: [300, 900] },
  editorial: { p: [762, 760], t: [300, 200] },
  graetzl: { p: [789, 640], t: [300, 200] },
  klar: { p: [777, 650], t: [320, 220] },
  warm: { p: [733, 830], t: [300, 210] },
  kontrast: { p: [789, 395], t: [300, 640] },
};

/* ---------- kleine Helfer ---------- */
const hmFd2S = (x) => (x == null ? "" : String(x)).trim();
const hmFd2Zwei = (n) => String(n).padStart(2, "0");
function hmFd2Sicher(fn, ersatz) { try { const v = fn(); return v == null ? ersatz : v; } catch (e) { return ersatz; } }
/* Lückenmarken der Plattform ("[...]" oder hmPfLuecke) gelten als fehlend */
function hmFd2IstLuecke(s) {
  const t = hmFd2S(s);
  if (!t) return true;
  if (typeof window !== "undefined" && window.hmPfIstLuecke && hmFd2Sicher(() => window.hmPfIstLuecke(t), false)) return true;
  return /^\[/.test(t);
}
const hmFd2Wert = (s) => (hmFd2IstLuecke(s) ? "" : hmFd2S(s));
function hmFd2Iso(d) { return `${d.getFullYear()}-${hmFd2Zwei(d.getMonth() + 1)}-${hmFd2Zwei(d.getDate())}`; }
function hmFd2Tag(iso, n) { const d = new Date(iso + "T12:00:00"); d.setDate(d.getDate() + n); return hmFd2Iso(d); }
function hmFd2Woerter(t) { return hmFd2S(t).split(/\s+/).filter((w) => /[0-9A-Za-zÄÖÜäöüß]/.test(w)).length; }
function hmFd2Treffer(t) { return hmFd2S(t).match(new RegExp(HM_FD2_ZAHL, "g")) || []; }
/* wörtlich enthalten; nur die Großschreibung am Satzanfang darf abweichen */
const hmFd2Enthaelt = (text, teil) => hmFd2S(text).toLowerCase().includes(hmFd2S(teil).toLowerCase());
/* Paar-Syntax {Sie|du} erst beim Rendern auflösen */
function hmFd2Anrede(text, anrede) {
  const du = /^du$/i.test(hmFd2S(anrede));
  return String(text == null ? "" : text).replace(/\{([^{}|]*)\|([^{}|]*)\}/g, (_, a, b) => (du ? b : a));
}
function hmFd2Sprache(t) {
  const s = String(t || ""); const f = [];
  if (s.includes("!")) f.push("Ausrufezeichen");
  if (/[\u2013\u2014]/.test(s)) f.push("Gedankenstrich");
  const m = s.match(/link in bio|folgen sie|schreiben sie mir/i);
  if (m) f.push(`Formelsatz "${m[0]}"`);
  return f;
}
const hmFd2Preis = (t) => HM_FD2_PREIS.test(hmFd2S(t));
/* Satzvergleich ohne Groß- und Kleinschreibung und Satzzeichen */
const hmFd2Norm = (s) => hmFd2S(s).toLowerCase().replace(/[^0-9a-zäöüß]+/g, " ").trim();
const hmFd2Saetze = (s) => hmFd2S(s).split(/(?<=[.?;])\s+/).filter(Boolean);
/* Bio-Zeile als Satzteil: beginnt klein oder endet auf ein kleingeschriebenes Wort (Relativsatz, Verb am Ende) */
function hmFd2Satzteil(s) {
  const t = hmFd2S(s).replace(/[.,;:]+$/, "");
  if (!t) return false;
  const w = t.split(/\s+/);
  return /^[a-zäöüß]/.test(t) || /^[a-zäöüß]/.test(w[w.length - 1]);
}
/* Ist das Porträt in dieser Welt tatsächlich gezeichnet? Die Hook-Kachel zeigt es in allen sechs Welten,
   die Serien-Kachel nur im Feuilleton, das Zitat nur in der Weite (Stand wb-markenwelten.jsx). */
function hmFd2PortraitSichtbar(daten, b, weltId) {
  if (!daten || !daten.portrait || !(b && b.portrait)) return false;
  if (daten.art === "hook") return true;
  if (daten.art === "serie") return weltId === "editorial";
  if (daten.art === "zitat") return weltId === "ruhig";
  return false;
}
function hmFd2Feiertag(iso) { return !!iso && typeof HM_FEIERTAGE !== "undefined" && !!HM_FEIERTAGE && HM_FEIERTAGE.has(iso); }
/* Nächster Tag, der weder Feiertag noch Sonntag ist */
function hmFd2Werktag(iso) {
  let x = iso;
  for (let i = 0; i < 7 && x && (hmFd2Feiertag(x) || new Date(x + "T12:00:00").getDay() === 0); i++) x = hmFd2Tag(x, 1);
  return x;
}
function hmFd2Lum(hex) {
  let x = String(hex || "#000000").replace("#", "");
  if (x.length === 3) x = x.split("").map((z) => z + z).join("");
  const k = [0.2126, 0.7152, 0.0722];
  return [0, 2, 4].reduce((s, i, j) => { const c = (parseInt(x.substr(i, 2), 16) || 0) / 255; return s + k[j] * (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)); }, 0);
}
function hmFd2DatumKurz(iso) { return iso ? new Date(iso + "T12:00:00").toLocaleDateString("de-AT", { weekday: "short", day: "numeric", month: "numeric" }) : "Datum folgt"; }
function hmFd2DatumLang(iso) { return iso ? new Date(iso + "T12:00:00").toLocaleDateString("de-AT", { weekday: "long", day: "numeric", month: "long" }) : "Datum folgt"; }
function hmFd2Wochentag(iso) { return iso ? new Date(iso + "T12:00:00").toLocaleDateString("de-AT", { weekday: "long" }) : ""; }
function hmFd2FolgeText(x) {
  if (!x || !x.serie) return "";
  if (x.serie.folge === 0) return "Staffelplakat";
  return x.serie.folge ? "Folge " + hmFd2Zwei(x.serie.folge) : "";
}
function hmFd2Titel(x) {
  if (x.luecke && x.luecke.art === "objekt") return "Wechselplatz für Ihr erstes Objekt";
  const n = x.serie && x.serie.name;
  if (!n) return "Beitrag " + x.nr;
  if (x.serie.folge === 0) return n + ", Staffelplakat";
  return x.serie.folge ? n + " " + hmFd2Zwei(x.serie.folge) : n;
}
/* Highlight-Name in ein bis zwei Wörtern. Endet der Serienname auf Präposition und Hauptwort, trägt dieser Schluss
   meist die Idee ("Sievering in Zahlen" wird "In Zahlen"). Jede Kürzung geht dem Team zur Freigabe. */
function hmFd2Kurzname(n) {
  const w = hmFd2S(n).split(/\s+/).filter(Boolean).map((x) => x.replace(/[.,:;?]+$/, ""));
  if (w.length <= 2) return { name: w.join(" "), gekuerzt: false };
  const praep = /^(in|im|vor|nach|am|an|auf|zum|zur|mit|von|für|über|unter|ohne|seit|bei)$/i;
  const artikel = /^(der|die|das|den|dem|des|ein|eine|einer|eines|und)$/i;
  const gross = (x) => /^[A-ZÄÖÜ0-9]/.test(x);
  const L = w.length - 1;
  if (gross(w[L]) && praep.test(w[L - 1])) return { name: w[L - 1].charAt(0).toUpperCase() + w[L - 1].slice(1) + " " + w[L], gekuerzt: true };
  const kern = w.filter((x) => gross(x) && !praep.test(x) && !artikel.test(x));
  return { name: kern.length ? kern.slice(0, 2).join(" ") : w.slice(-2).join(" "), gekuerzt: true };
}

/* ---------- Termine ---------- */
function hmFd2Live(mid, m, opt) {
  if (opt && opt.live !== undefined) return { iso: opt.live ? String(opt.live).slice(0, 10) : null, feld: "opt.live" };
  const t = hmFd2Sicher(() => (((hmStore.get("auftrag") || {})[mid] || {}).termine || {}).live, null);
  if (t) return { iso: String(t).slice(0, 10), feld: "auftrag.termine.live" };
  const s = hmFd2Sicher(() => (window.hmStandTermine && m && m.id ? window.hmStandTermine(m).live : null), null);
  if (s) {
    /* Die Schätzung darf nicht auf einen Feiertag fallen: dann schlagen wir den nächsten Werktag vor */
    const roh = String(s).slice(0, 10); const iso = hmFd2Werktag(roh);
    return { iso, feld: "hmStandTermine(m).live", geschaetzt: true, verschoben: iso !== roh ? roh : null };
  }
  return { iso: null, feld: null };
}
/* Woche 1 komplett am Live-Tag, ab Woche 2 Di, Do, Sa; Feiertag oder Sonntag schiebt auf den nächsten Tag */
function hmFd2Datum(live, nr) {
  if (!live) return null;
  const w = Math.ceil(nr / 3);
  if (w === 1) return live;
  const d = new Date(live + "T12:00:00");
  const montag = hmFd2Tag(live, -((d.getDay() + 6) % 7));
  return hmFd2Werktag(hmFd2Tag(montag, 7 * (w - 1) + HM_FEED2_TAKT.tage[(nr - 1) % 3]));
}

/* ---------- Belege: nur Zahl mit Einheit, nie mit Kaufpreis ---------- */
function hmFd2Belege(p) {
  return ((p && p.beweise) || []).map((x, i) => {
    const text = hmFd2Wert(x && x.beleg);
    const treffer = hmFd2Treffer(text);
    if (!treffer.length || hmFd2Preis(text)) return null;
    const quelle = hmFd2S(x.quelle);
    return { ref: "b" + (i + 1), i, text, zahl: treffer[0], treffer, behauptung: hmFd2Wert(x.behauptung), quelle, status: /prüfen|selbstauskunft/i.test(quelle) ? "selbstauskunft" : "geprueft" };
  }).filter(Boolean);
}
/* Belege, die wegen eines Kaufpreises draußen bleiben (für Prüfliste und Lücken) */
function hmFd2PreisBelege(p) {
  return ((p && p.beweise) || []).map((x, i) => ({ ref: "b" + (i + 1), i, text: hmFd2Wert(x && x.beleg) })).filter((b) => b.text && hmFd2Preis(b.text));
}

/* ---------- Profil ---------- */
function hmFd2Konto(m2) {
  const f = m2 && m2.vorab && m2.vorab.fakten;
  let k = null;
  if (Array.isArray(f)) { const e = f.find((x) => x && x.feld === "kanaele"); k = e ? e.wert : null; }
  else if (f && f.kanaele) k = f.kanaele.wert || f.kanaele;
  const liste = Array.isArray(k) ? k : (k && typeof k === "object") ? Object.keys(k).map((x) => ({ kanal: x, ...(k[x] && typeof k[x] === "object" ? k[x] : { status: k[x] }) })) : [];
  const ig = liste.find((x) => x && /instagram/i.test(hmFd2S(x.kanal)));
  const name = ig ? hmFd2S(ig.konto || ig.kontoname || ig.handle || ig.name) : "";
  return name ? name.replace(/^@/, "") : null;
}
function hmFd2Bio(p, anrede) {
  /* nur die Instagram-Bio, nicht "Bio LinkedIn" */
  const beisp = ((p && p.stimme && p.stimme.beispiele) || []).map((x, i) => ({ x, i })).filter((e) => e.x && /\bbio\b/i.test(hmFd2S(e.x.wo)) && !/linkedin|facebook|tiktok|website|xing/i.test(hmFd2S(e.x.wo)));
  let zeilen = [], herkunft = [], grund = [];
  if (beisp.length) {
    beisp.forEach((e) => hmFd2Wert(e.x.so).split(/\n+/).forEach((z) => { if (hmFd2S(z) && zeilen.length < 3) { zeilen.push(hmFd2S(z)); herkunft.push(`plattform.stimme.beispiele[${e.i}].so`); } }));
  } else {
    const pos = (p && p.positionierung) || {};
    const was = hmFd2Wert(pos.was), wen = hmFd2Wert(pos.fuerWen), claim = hmFd2Wert(p && p.botschaften && p.botschaften.claim);
    /* positionierung.was ist oft ein Relativsatz ("..., der den Zeitpunkt vor den Abschluss stellt"). Großschreiben macht daraus
       keinen Satz: dann bleibt die Zeile eine Lücke mit Auftrag ans Team. */
    const teil = was && hmFd2Satzteil(was);
    zeilen = [was && !teil ? was : "", wen ? (/^für\s/i.test(wen) ? wen : "Für " + wen) : "", claim];
    grund = [teil ? "satzteil" : "", "", ""];
    herkunft = ["plattform.positionierung.was", "plattform.positionierung.fuerWen", "plattform.botschaften.claim"];
  }
  while (zeilen.length < 3) { zeilen.push(""); herkunft.push("fehlt"); }
  zeilen = zeilen.slice(0, 3).map((z, i) => { const t = hmFd2Anrede(z, anrede); if (t && t.length > 60) grund[i] = "lang"; return t && t.length <= 60 ? t : null; });
  /* zusammen höchstens 150 Zeichen: sonst die längste Zeile als Lücke */
  const summe = () => zeilen.filter(Boolean).join("\n").length;
  while (summe() > 150) { let l = -1; zeilen.forEach((z, i) => { if (z && (l < 0 || z.length > zeilen[l].length)) l = i; }); zeilen[l] = null; grund[l] = "summe"; }
  return { zeilen, herkunft: herkunft.slice(0, 3), grund: [0, 1, 2].map((i) => grund[i] || (zeilen[i] ? "" : "fehlt")) };
}
/* Drei Serien mit den meisten Beiträgen. Titelbild ist der Beitrag, dessen Porträt tatsächlich gezeichnet ist, sonst ein eigenes Bild, sonst der erste. */
function hmFd2Highlights(posts, weltId, b) {
  const z = {};
  posts.slice().sort((a, c) => a.nr - c.nr).forEach((x) => { const n = x.serie && x.serie.name; if (!n || (x.luecke && (x.luecke.art === "text" || x.luecke.art === "objekt"))) return; (z[n] = z[n] || []).push(x.nr); });
  const hol = (nr) => posts.find((y) => y.nr === nr);
  const liste = Object.keys(z).sort((a, c) => z[c].length - z[a].length || z[a][0] - z[c][0]).slice(0, 3).map((n) => {
    const aus = z[n];
    const mitGesicht = aus.find((nr) => hmFd2PortraitSichtbar((hol(nr) || {}).daten, b, weltId));
    const mitBild = aus.find((nr) => { const d = (hol(nr) || {}).daten; return d && d.bild && d.bild.img; });
    const k = hmFd2Kurzname(n);
    return { name: k.name, gekuerzt: k.gekuerzt, serie: n, ausNr: aus, coverNr: mitGesicht || mitBild || aus[0] };
  });
  while (liste.length < 3) liste.push({ name: null, serie: null, ausNr: [], coverNr: null });
  return liste;
}

/* ---------- Beitrag anlegen ---------- */
function hmFd2Neu(nr) {
  const platz = ((nr - 1) % 3) + 1;
  return {
    id: "f" + nr, nr, woche: Math.ceil(nr / 3), platz, datum: null, angepinnt: nr <= 3,
    serie: { name: "", folge: null }, saeule: "", saeuleId: "", format: platz === 3 ? "post" : "reel", art: "hook",
    text: "", unter: "", gesicht: platz !== 3, gegenton: HM_FEED2_TAKT.gegenton.includes(nr), textgefuehrt: HM_FEED2_TAKT.flaeche.includes(nr),
    ton: "grund", beleg: null, captionTeile: { hook: "", einloesung: "", beleg: "", weitergeben: "" }, captionLuecken: [], captionEntwurf: [], captionPreis: [], caption: "",
    seiten: [], luecke: null, ersatz: null, bildUrl: null, herkunft: [], daten: null, befunde: [],
  };
}
function hmFd2FormatAus(f) {
  if (HM_FEED2_TAKT.gesichtFormate.includes(f)) return "reel";
  if (HM_FEED2_TAKT.karussellFormate.includes(f)) return "karussell";
  return "post";
}
/* Stoff (aus start30 oder Serienbeispiel) in den Beitrag übernehmen, wörtlich */
function hmFd2Fuellen(x, st, o) {
  const s = st.s || null; const serie = s && s.serie ? s.serie : null;
  x.serie = { name: hmFd2Wert(serie && serie.name) || hmFd2Wert(s && s.name), folge: o.plakat ? 0 : null };
  x.saeule = hmFd2Wert(s && s.name); x.saeuleId = s ? hmFd2S(s.id) : "";
  x.text = o.plakat ? x.serie.name : st.titel;
  x.herkunft.push({ teil: "Text im Bild", feld: o.plakat ? st.feldSerie + ".name" : st.feldTitel });
  if (o.format) x.format = o.format; else if (st.format) x.format = hmFd2FormatAus(st.format);
  if (o.art) x.art = o.art;
  const bsp = st.bsp || {};
  /* Kaufpreise nie in die Caption: ein Teil mit Preis wird zur Lücke */
  const preis = [];
  const ohnePreis = (t, teil) => { if (t && hmFd2Preis(t)) { if (!preis.includes(teil)) preis.push(teil); return ""; } return t; };
  const hookRoh = ohnePreis(hmFd2Wert(bsp.hook), "hook"); const titel = ohnePreis(st.titel, "hook");
  let hook = "", hookFeld = "";
  if (o.plakat) { hook = x.serie.name ? x.serie.name + "." : ""; hookFeld = st.feldSerie + ".name"; }
  else if (hookRoh && hookRoh.length <= 90) { hook = hookRoh; hookFeld = st.feldBsp + ".hook"; }
  else if (titel && titel.length <= 90) { hook = titel; hookFeld = st.feldTitel; }
  else { hook = hookRoh || titel; hookFeld = hookRoh ? st.feldBsp + ".hook" : st.feldTitel; }
  if (hook && !o.plakat) { const i = preis.indexOf("hook"); if (i >= 0) preis.splice(i, 1); }
  const einl = ohnePreis(o.plakat ? hmFd2Wert(serie && serie.idee) : hmFd2Wert(bsp.skizze), "einloesung");
  const weiter = ohnePreis(hmFd2Wert(serie && serie.weitergeben), "weitergeben");
  x.captionTeile = { hook: hook || HM_FD2_LUECKE.hook, einloesung: einl || HM_FD2_LUECKE.einloesung, beleg: "", weitergeben: weiter || HM_FD2_LUECKE.weitergeben };
  x.captionLuecken = [!hook && "hook", !einl && "einloesung", !weiter && "weitergeben"].filter(Boolean);
  /* Skizze und Serienidee sind Produktionsnotizen, keine fertige Stimme: im Makler-Blick als Entwurf gekennzeichnet */
  x.captionEntwurf = einl ? ["einloesung"] : [];
  x.captionPreis = preis;
  x.herkunft.push({ teil: "Erster Satz", feld: hook ? hookFeld : "Lücke" });
  x.herkunft.push({ teil: "Einlösung", feld: einl ? (o.plakat ? st.feldSerie + ".idee" : st.feldBsp + ".skizze") : "Lücke" });
  x.herkunft.push({ teil: "Weitergeben", feld: weiter ? st.feldSerie + ".weitergeben" : "Lücke" });
  return x;
}
function hmFd2TextLuecke(x, rolle, serieName) {
  x.serie = { name: serieName || "", folge: null };
  x.text = "Diese Folge schreiben wir mit Ihnen.";
  x.luecke = { art: "text", satz: HM_FD2_MAKLER_LUECKE, rolle, auftrag: `${rolle}: Titel, Text im Bild und Caption aus dem Themenvorrat schreiben, nie erfinden.`, ersatz: null };
  x.captionTeile = { hook: HM_FD2_LUECKE.hook, einloesung: HM_FD2_LUECKE.einloesung, beleg: "", weitergeben: HM_FD2_LUECKE.weitergeben };
  x.captionLuecken = ["hook", "einloesung", "weitergeben"];
  x.herkunft.push({ teil: "Text im Bild", feld: "Lücke: " + rolle });
  return x;
}

/* ---------- Regelpfad aus der Plattform ---------- */
function hmFd2Regel(mid, p, ctx) {
  const saeulen = ((p && p.saeulen) || []).filter(Boolean);
  const idx = {};
  saeulen.forEach((s, si) => ((s.serie && s.serie.beispiele) || []).forEach((bsp, bi) => { const t = hmFd2Wert(bsp && bsp.titel); if (t && !idx[t]) idx[t] = { si, bi, bsp, s }; }));
  const s30 = [];
  ((p && p.start30) || []).forEach((w, wi) => ((w && w.beitraege) || []).forEach((x, j) => { if (x && hmFd2Wert(x.titel)) s30.push({ ...x, titel: hmFd2Wert(x.titel), wi, j }); }));
  /* Signatur: Säule, die in start30 am häufigsten vorkommt, bei Gleichstand saeulen[0] */
  const zahl = {}; s30.forEach((x) => { zahl[x.saeule] = (zahl[x.saeule] || 0) + 1; });
  let sig = saeulen[0] || null;
  saeulen.forEach((s) => { if (sig && (zahl[s.id] || 0) > (zahl[sig.id] || 0)) sig = s; });
  const sigI = saeulen.indexOf(sig);
  const sigSerie = sig && sig.serie && hmFd2Wert(sig.serie.name) ? sig.serie : null;
  const sigBsp = ((sigSerie && sigSerie.beispiele) || []).filter((b) => b && hmFd2Wert(b.titel));
  const genutzt = new Set(sigBsp.map((b) => hmFd2Wert(b.titel)));
  const istGesicht = (f) => HM_FEED2_TAKT.gesichtFormate.includes(f);
  const ausStart = (x) => {
    const ix = idx[x.titel]; const s = ix ? ix.s : saeulen.find((y) => y.id === x.saeule) || null; const si = saeulen.indexOf(s);
    return { titel: x.titel, bsp: ix ? ix.bsp : null, s, format: x.format, feldTitel: `plattform.start30[${x.wi}].beitraege[${x.j}].titel`, feldBsp: ix ? `plattform.saeulen[${ix.si}].serie.beispiele[${ix.bi}]` : `plattform.start30[${x.wi}].beitraege[${x.j}]`, feldSerie: `plattform.saeulen[${si}].serie` };
  };
  const ausBsp = (s, si, bsp, bi, format) => ({ titel: hmFd2Wert(bsp.titel), bsp, s, format, feldTitel: `plattform.saeulen[${si}].serie.beispiele[${bi}].titel`, feldBsp: `plattform.saeulen[${si}].serie.beispiele[${bi}]`, feldSerie: `plattform.saeulen[${si}].serie` });
  const naechster = (gesicht) => {
    const x = s30.find((y) => !genutzt.has(y.titel) && (!sig || y.saeule !== sig.id) && istGesicht(y.format) === gesicht);
    if (!x) return null;
    genutzt.add(x.titel);
    return ausStart(x);
  };
  /* Ersatz für den Objektplatz: nächster unbenutzter Sache-Beitrag aus start30, sonst aus den Serienbeispielen */
  const ersatzStoff = () => {
    const a = naechster(false); if (a) return a;
    for (let si = 0; si < saeulen.length; si++) {
      const s = saeulen[si]; if (s === sig || istGesicht((s.formate || [])[0])) continue;
      const bl = (s.serie && s.serie.beispiele) || [];
      for (let bi = 0; bi < bl.length; bi++) { const t = hmFd2Wert(bl[bi] && bl[bi].titel); if (t && !genutzt.has(t)) { genutzt.add(t); return ausBsp(s, si, bl[bi], bi, (s.formate || [])[0]); } }
    }
    return null;
  };

  const posts = [];
  for (let nr = 1; nr <= 12; nr++) posts.push(hmFd2Neu(nr));
  const P = (nr) => posts[nr - 1];
  /* Folge 1: Staffelplakat der Signatur */
  if (sigSerie) hmFd2Fuellen(P(1), { titel: hmFd2Wert(sigSerie.name), s: sig, feldSerie: `plattform.saeulen[${sigI}].serie` }, { plakat: true, art: "serie", format: "post" });
  else hmFd2TextLuecke(P(1), "Staffelplakat der Signatur-Serie", "");
  /* Signatur-Folgen 01 bis 04 auf Folge 2, 4, 7, 10 */
  HM_FEED2_TAKT.signaturNr.forEach((nr, k) => {
    const bsp = sigBsp[k];
    if (bsp) { const bi = ((sigSerie && sigSerie.beispiele) || []).indexOf(bsp); hmFd2Fuellen(P(nr), ausBsp(sig, sigI, bsp, bi, null), { art: "hook", format: "reel" }); }
    else hmFd2TextLuecke(P(nr), `Signatur-Folge ${hmFd2Zwei(k + 1)} (${sigSerie ? hmFd2Wert(sigSerie.name) : "Signatur-Serie"})`, sigSerie ? hmFd2Wert(sigSerie.name) : "");
    P(nr).format = "reel";
  });
  /* Nutzen mit Gesicht und Sache ohne Gesicht in Veröffentlichungsfolge */
  [3, 5, 6, 8, 9, 11].forEach((nr) => {
    const gesicht = HM_FEED2_TAKT.gesichtNr.includes(nr);
    const st = naechster(gesicht);
    if (st) hmFd2Fuellen(P(nr), st, { art: "hook" });
    else hmFd2TextLuecke(P(nr), gesicht ? "Nutzen mit Gesicht" : "Sache ohne Gesicht", "");
    if (gesicht) P(nr).format = "reel";
    else if (P(nr).format === "reel") P(nr).format = "post";
  });
  /* Folge 12: Objekt-Wechselplatz */
  const x12 = P(HM_FEED2_TAKT.objektNr);
  const eigen = ctx.einw4 === "ja" ? (ctx.bilder || []).find((b) => b && b.gruppe === "eigen" && !b.ki && !b.klein && hmFd2S(b.url) && !/assets\/(img|photos)\//.test(b.url) && !(ctx.fremd || []).includes(b.url)) : null;
  const est = ersatzStoff();
  let ersatz = null;
  if (est) { ersatz = hmFd2Fuellen(hmFd2Neu(12), est, { art: "hook" }); if (ersatz.format === "reel") ersatz.format = "post"; }
  x12.serie = { name: "Objekt", folge: null };
  x12.art = "objekt"; x12.format = "post";
  if (eigen) {
    x12.bildUrl = eigen.url; x12.text = ""; x12.unter = "";
    x12.luecke = { art: "text", satz: "Titel und Lage dieses Objekts schreiben wir mit Ihnen vor dem Live-Tag.", rolle: "Objekttitel", auftrag: "Titel, Lage und Energiewerte (HWB, fGEE) des Objekts eintragen, Bildrechte vermerken.", ersatz: null };
    x12.captionTeile = { hook: "[Titel und Lage des Objekts, schreibt das Team]", einloesung: HM_FD2_LUECKE.einloesung, beleg: "", weitergeben: HM_FD2_LUECKE.weitergeben };
    x12.captionLuecken = ["hook", "einloesung", "weitergeben"];
    x12.herkunft.push({ teil: "Bild", feld: `hmBildBibliothek(${mid}) ${eigen.ref || ""}`.trim() });
  } else {
    x12.text = "Hier kommt Ihr erstes Objekt."; x12.unter = "";
    x12.luecke = {
      art: "objekt", satz: "Hier kommt Ihr erstes Objekt.",
      grund: ctx.einw4 !== "ja" ? `Einwilligung 4 (Objektfotos zeigen) steht auf "${ctx.einw4}".` : "Kein eigenes Objektbild mit geklärten Rechten in der Bibliothek.",
      auftrag: ersatz ? `Ersatz "${ersatz.text}" fertig produzieren; Objekt erscheint, sobald Einwilligung 4 und ein eigenes Bild vorliegen.` : "Für diesen Samstag fehlt ein Ersatzbeitrag ohne Gesicht: bitte einen Sache-Beitrag in den Serien anlegen.",
      ersatz: { titel: ersatz ? ersatz.text : null },
    };
    x12.ersatz = ersatz;
    if (ersatz) { x12.captionTeile = { ...ersatz.captionTeile }; x12.captionLuecken = ersatz.captionLuecken.slice(); x12.captionEntwurf = ersatz.captionEntwurf.slice(); x12.captionPreis = ersatz.captionPreis.slice(); x12.herkunft = ersatz.herkunft.map((h) => ({ teil: "Ersatz, " + h.teil, feld: h.feld })); }
    else { x12.captionTeile = { hook: HM_FD2_LUECKE.hook, einloesung: HM_FD2_LUECKE.einloesung, beleg: "", weitergeben: HM_FD2_LUECKE.weitergeben }; x12.captionLuecken = ["hook", "einloesung", "weitergeben"]; }
    x12.herkunft.push({ teil: "Text im Bild", feld: "Lückenkachel Objekt (13_feed 3.4)" });
  }
  hmFd2BelegeVerteilen(posts, ctx.belege);
  return { posts, signatur: sig ? { id: sig.id, name: hmFd2Wert(sig.name), serie: sigSerie ? hmFd2Wert(sigSerie.name) : null } : null };
}

/* Belege verteilen: je Woche höchstens einer sichtbar, jeder höchstens einmal.
   Zuerst ein Beitrag, dessen Text im Bild die Zahl eines Belegs schon wörtlich trägt; sonst ein Beitrag der Beweis-Säule,
   dessen Titel wörtlich im Beleg steht (derselbe Fall). Dessen Text im Bild übernimmt dann die Zahl mit Einheit per Regex.
   Ein Beleg wird nie an einen fremden Fall gehängt. */
function hmFd2BelegeVerteilen(posts, belege) {
  const benutzt = new Set();
  const frei = () => (belege || []).filter((b) => !benutzt.has(b.ref));
  const passt = (x) => frei().find((b) => b.treffer.some((t) => hmFd2Enthaelt(x.text, t)));
  const setze = (x, b, feld) => {
    benutzt.add(b.ref);
    x.beleg = { ref: b.ref, text: b.text, status: b.status, sichtbar: true, zahl: b.zahl, behauptung: b.behauptung };
    x.captionTeile.beleg = b.text;
    x.herkunft.push({ teil: "Beleg", feld: `plattform.beweise[${b.i}].beleg` });
    if (feld) x.herkunft.push({ teil: "Text im Bild, Zahl", feld });
  };
  for (let w = 1; w <= 4; w++) {
    const kand = posts.filter((x) => x.woche === w && !x.luecke && x.art !== "objekt" && x.art !== "serie");
    let fertig = false;
    for (const x of kand) { const b = passt(x); if (b) { setze(x, b, null); fertig = true; break; } }
    if (fertig) continue;
    /* Titel und Zahl müssen im selben Satz des Belegs stehen, sonst gehört die Zahl zu einem anderen Fall (Sammelbeleg) */
    let treffer = null;
    for (const x of kand.filter((y) => y.saeuleId === "beweise" && hmFd2S(y.text))) {
      for (const b of frei()) {
        const satz = hmFd2S(b.text).split(/(?<=[.;])\s+/).find((s) => hmFd2Enthaelt(s, x.text) && hmFd2Treffer(s).length);
        if (satz) { treffer = { x, b, zahl: hmFd2Treffer(satz)[0] }; break; }
      }
      if (treffer) break;
    }
    if (treffer) { const { x, b, zahl } = treffer; x.unter = x.text; x.text = zahl.charAt(0).toUpperCase() + zahl.slice(1) + "."; setze(x, b, `plattform.beweise[${b.i}].beleg (Regex)`); x.beleg.zahl = zahl; }
  }
  /* Übrige Beiträge, deren Text schon eine Belegzahl trägt: in der Pin-Reihe sichtbar (jeder Beleg nur einmal),
     ab Woche 2 nur dann sichtbar, wenn die Woche noch keinen hat. Sonst hängt der Beleg unsichtbar an der Caption,
     damit die Zahl eine Quelle hat, und die Prüfung meldet die zweite Zahl als Hinweis. */
  posts.forEach((x) => {
    if (x.beleg || x.luecke) return;
    const b = passt(x); if (!b) return;
    const voll = x.woche > 1 && posts.some((y) => y.woche === x.woche && y.beleg && y.beleg.sichtbar);
    setze(x, b, null);
    if (voll) x.beleg.sichtbar = false;
  });
}

/* ---------- Daten für WeltPost, ohne Vorgaben aus hmWeltPostDaten ---------- */
/* Das Staffelplakat (Folge 0) zeichnen wir als Hook-Kachel mit Porträt und dem Seriennamen als Text im Bild:
   die Serien-Kachel der Welten zeigt kein Gesicht (außer Feuilleton), nummeriert mit 01 und wiederholt den Namen. */
function hmFd2Daten(x, b, ton) {
  let art = ["hook", "zahl", "zitat", "objekt", "serie"].includes(x.art) ? x.art : "hook";
  const plakat = !!(x.serie && x.serie.folge === 0);
  const serie = x.serie && x.serie.name && !plakat ? { name: x.serie.name, nr: Math.max(1, x.serie.folge || 1) } : null;
  if (plakat || (art === "serie" && !serie)) art = "hook";
  const bild = art === "objekt" ? { t: x.text || "", loc: "", img: x.bildUrl || null, luecke: !x.bildUrl } : null;
  return { art, text: x.text || "", unter: x.unter || "", bild, serie, nr: x.nr, portrait: !!(x.gesicht && b && b.portrait), spiegel: x.nr % 2 === 0, ton, luecke: !!x.luecke };
}
/* Doppelte Sätze in der Caption zusammenführen (Hook, Skizze und Beleg sagen oft dasselbe).
   Steht der Beleg schon wörtlich weiter oben, entfällt der eigene Belegteil; x.beleg bleibt. */
function hmFd2Entdoppeln(x) {
  const t = x.captionTeile || {}; const l = x.captionLuecken || [];
  const gesehen = [];
  ["hook", "einloesung", "beleg", "weitergeben"].forEach((k) => {
    if (l.includes(k) || !hmFd2S(t[k])) return;
    if (k === "beleg") {
      const n = hmFd2Norm(t.beleg);
      if (gesehen.some((g) => g.includes(n))) { t.beleg = ""; x.herkunft.push({ teil: "Beleg", feld: "steht wörtlich schon weiter oben in der Caption" }); }
      else gesehen.push(n);
      return;
    }
    /* Zitate, die nur wiederholen, was schon oben steht, fallen weg ("in eigenen Worten: „...“") */
    const ohneZitat = hmFd2S(t[k]).replace(/\s*[„"]([^“”"]+)[“”"]/g, (m0, innen) => { const n = hmFd2Norm(innen); return n && gesehen.some((g) => g.includes(n)) ? "" : m0; });
    const rest = hmFd2Saetze(ohneZitat).filter((s) => { const n = hmFd2Norm(s); return n && !gesehen.some((g) => g.includes(n)); });
    const neu = rest.join(" ");
    if (neu !== hmFd2S(t[k])) {
      x.herkunft.push({ teil: k === "hook" ? "Erster Satz" : k === "einloesung" ? "Einlösung" : "Weitergeben", feld: "doppelte Sätze zusammengeführt" });
      if (!neu && k !== "hook") { t[k] = HM_FD2_LUECKE[k]; x.captionLuecken = l.concat([k]); x.captionEntwurf = (x.captionEntwurf || []).filter((e) => e !== k); return; }
      if (neu) t[k] = neu;
    }
    gesehen.push(hmFd2Norm(t[k]));
  });
  return x;
}
function hmFd2Seiten(x) {
  if (x.format !== "karussell") return [];
  const s = [{ nr: 1, rolle: "Titel", art: x.art, text: x.text, unter: x.unter }];
  if (x.beleg && x.beleg.zahl && !hmFd2Enthaelt(x.text, x.beleg.zahl)) s.push({ nr: 2, rolle: "Beleg", art: "hook", text: x.beleg.zahl + ".", unter: x.beleg.behauptung || "" });
  return s;
}

/* ---------- Hauptfunktion ---------- */
function hmFeed12(mid, variante, opt) {
  const v = variante === "gegenentwurf" ? "gegenentwurf" : "empfehlung";
  const o = opt || {};
  const m = o.makler ? { id: mid, ...o.makler } : (hmFd2Sicher(() => (hmStore.get("makler") || []).find((x) => x.id === mid), null) || { id: mid, name: "" });
  const b = hmFd2Sicher(() => hmBrand(mid), {}) || {};
  const p = o.plattform !== undefined ? o.plattform : hmFd2Sicher(() => (window.hmMbPlattform ? window.hmMbPlattform(mid) : null), null);
  const m2 = o.marke2 !== undefined ? (o.marke2 || {}) : hmFd2Sicher(() => (hmStore.get("marke2") || {})[mid], {}) || {};
  const welt = hmFd2Sicher(() => (window.hmMbWelt ? window.hmMbWelt(mid, p) : null), null) || ((typeof window !== "undefined" && window.HM_MARKENWELTEN) || [])[0] || null;
  const bb = { ...b, plattform: p };
  if (o.portrait !== undefined) bb.portrait = o.portrait || null;
  const anrede = o.anrede || hmFd2Sicher(() => (window.hmAnrede ? window.hmAnrede(mid, "instagram") : "Sie"), "Sie") || "Sie";
  const einw4 = o.einwilligung4 !== undefined ? o.einwilligung4 : hmFd2Sicher(() => (window.hmEinwilligung ? window.hmEinwilligung(mid, 4) : "offen"), "offen");
  const bilder = o.bilder !== undefined ? (o.bilder || []) : hmFd2Sicher(() => (window.hmBildBibliothek ? window.hmBildBibliothek(mid) : []), []);
  const fremd = hmFd2Sicher(() => (window.hmWeltObjekte ? window.hmWeltObjekte().map((x) => x.img) : []), []);
  const live = hmFd2Live(mid, m, o);
  const belege = hmFd2Belege(p);
  const preisBelege = hmFd2PreisBelege(p);
  const luecken = [];
  const hinweise = [];

  /* Quelle: gespeicherte Kacheln unverändert, sonst Regelpfad */
  const kach = m2.feed && Array.isArray(m2.feed.kacheln) && m2.feed.kacheln.length === 12 ? m2.feed.kacheln : null;
  let posts, quelle, signatur = null;
  if (kach) {
    quelle = "kacheln";
    posts = kach.map((k, i) => {
      const nr = Number(k && k.nr) || i + 1; const d = hmFd2Neu(nr);
      return { ...d, ...(k || {}), nr, id: "f" + nr, captionTeile: { ...d.captionTeile, ...((k && k.captionTeile) || {}) }, captionLuecken: (k && k.captionLuecken) || [], herkunft: ((k && k.herkunft) || []).concat([{ teil: "Kachel", feld: `marke2.feed.kacheln[${i}]` }]), befunde: [] };
    }).sort((a, b2) => a.nr - b2.nr);
  } else {
    quelle = p ? "plattform" : "leer";
    const r = hmFd2Regel(mid, p, { einw4, bilder, fremd, belege });
    posts = r.posts; signatur = r.signatur;
  }

  /* Grundton: in einer Welt mit dunklem Grund kehrt sich die Achse um */
  const F = (welt && welt.farben) || { grund: "#EEEBE5", text: "#25231F" };
  const grundDunkel = hmFd2Lum(F.grund) < hmFd2Lum(F.text);
  const tonNormal = v === "empfehlung" ? "grund" : (grundDunkel ? "hell" : "dunkel");
  const tonGegen = v === "empfehlung" ? (grundDunkel ? "hell" : "dunkel") : (grundDunkel ? "dunkel" : "hell");

  /* Folgen je Serie zählen, Daten, Captions, Ton, WeltPost-Daten */
  const zaehler = {};
  posts.forEach((x) => {
    if (x.serie && x.serie.name && x.serie.folge !== 0 && x.serie.folge == null) { zaehler[x.serie.name] = (zaehler[x.serie.name] || 0) + 1; x.serie = { ...x.serie, folge: zaehler[x.serie.name] }; }
    if (!x.datum) { x.datum = hmFd2Datum(live.iso, x.nr); x.herkunft.push({ teil: "Datum", feld: live.iso ? live.feld + (x.woche > 1 ? ", Di/Do/Sa" : "") : "Lücke" }); }
    if (!kach) hmFd2Entdoppeln(x);
    const t = x.captionTeile || {};
    x.caption = [t.hook, t.einloesung, t.beleg, t.weitergeben].some((s) => hmFd2S(s)) ? hmFd2Anrede([t.hook, t.einloesung, t.beleg, t.weitergeben].filter((s) => hmFd2S(s)).join("\n\n"), anrede) : hmFd2Anrede(x.caption, anrede);
    /* Ersatz kann aus hmStore stammen: erst kopieren, dann ergänzen */
    if (x.ersatz) {
      x.ersatz = { ...x.ersatz, captionTeile: { ...(x.ersatz.captionTeile || {}) }, captionLuecken: (x.ersatz.captionLuecken || []).slice(), herkunft: (x.ersatz.herkunft || []).slice() };
      if (!kach) hmFd2Entdoppeln(x.ersatz);
      const e = x.ersatz.captionTeile; x.ersatz.caption = hmFd2Anrede([e.hook, e.einloesung, e.beleg, e.weitergeben].filter((s) => hmFd2S(s)).join("\n\n"), anrede);
    }
    x.ton = x.gegenton ? tonGegen : tonNormal;
    x.daten = kach && x.daten ? { ...x.daten, ton: x.ton } : hmFd2Daten(x, bb, x.ton);
    if (!x.seiten || !x.seiten.length) x.seiten = hmFd2Seiten(x);
    /* Bildlücken: Gesicht ohne Porträt, Sache ohne eigenes Bild (die Fläche auf Folge 6 braucht keins) */
    if (!x.luecke && x.gesicht && !bb.portrait) x.luecke = { art: "bild", satz: "Ihr Bild für diesen Beitrag entsteht am Porträt-Termin.", auftrag: "Motiv aus dem Porträt-Termin nach Einstellung der Vorlage setzen (Kontaktbogen).", ersatz: null };
    else if (!x.luecke && !x.gesicht && !x.textgefuehrt && x.art !== "objekt") x.luecke = { art: "bild", satz: "Das Bild zu diesem Beitrag entsteht am Porträt-Termin.", auftrag: "Motiv ohne Gesicht nach der Bildsprache der Welt wählen (Ort, Detail, Raum), nie Archiv oder KI.", ersatz: null };
  });

  /* Profil */
  const bio = hmFd2Bio(p, anrede);
  const bezirk = hmFd2S(m.region).replace(/^\d{4}\s*/, "");
  const konto = hmFd2Konto(m2);
  const profil = {
    name: hmFd2S(m.name) || hmFd2S(b.makler && b.makler.name),
    konto,
    zeile: bezirk ? "Immobilien, " + bezirk : "Immobilien",
    bio: bio.zeilen,
    highlights: hmFd2Highlights(posts, welt && welt.id, bb),
    angepinnt: HM_FEED2_TAKT.angepinnt.slice(),
    profilbild: { url: bb.portrait || null, luecke: bb.portrait ? null : "Porträt aus dem Porträt-Termin" },
    herkunft: [{ teil: "Name", feld: "makler.name" }, { teil: "Kontoname", feld: konto ? "marke2.vorab.fakten.kanaele" : "Lücke" }, { teil: "Zeile", feld: bezirk ? "makler.region" : "Lücke" }].concat(bio.herkunft.map((f, i) => ({ teil: "Bio " + (i + 1), feld: bio.zeilen[i] ? f : "Lücke" }))),
  };

  /* Lücken sammeln, gleichartige zusammengefasst */
  const nrs = (fn) => posts.filter(fn).map((x) => x.nr).sort((a, c) => a - c);
  if (!bb.portrait) luecken.push({ was: "Porträt für Profilbild und die Gesichtskacheln " + nrs((x) => x.gesicht).join(", "), wer: "Makler", feld: "portraits" });
  if (!konto) luecken.push({ was: "Kontoname folgt", wer: "Makler", feld: "marke2.vorab.fakten.kanaele" });
  if (!bezirk) luecken.push({ was: "Bezirk für die Profilzeile", wer: "Team", feld: "makler.region" });
  bio.zeilen.forEach((z, i) => {
    if (z) return;
    if (bio.grund[i] === "satzteil") luecken.push({ was: "Bio-Zeile 1: positionierung.was ist ein Satzteil (Relativsatz) und muss als eigene Zeile formuliert werden, höchstens 60 Zeichen", wer: "Team", feld: "plattform.stimme.beispiele (wo: Bio) oder plattform.positionierung.was" });
    else luecken.push({ was: `Bio-Zeile ${i + 1} (höchstens 60 Zeichen, zusammen 150)`, wer: "Team", feld: "plattform.stimme.beispiele (wo: Bio)" });
  });
  profil.highlights.forEach((h) => { if (h.gekuerzt) luecken.push({ was: `Highlight-Name "${h.name}" für die Serie "${h.serie}" freigeben`, wer: "Team", feld: "plattform.saeulen[].serie.name" }); });
  if (!live.iso) luecken.push({ was: "Live-Tag folgt", wer: "Team", feld: "auftrag.termine.live" });
  else if (live.geschaetzt) luecken.push({ was: `Live-Tag ist geschätzt (Vorschlag ${hmFd2DatumLang(live.iso)}${live.verschoben ? ", weil " + hmFd2DatumLang(live.verschoben) + " ein Feiertag ist" : ""}), Termin eintragen`, wer: "Team", feld: "auftrag.termine.live" });
  if (live.verschoben) hinweise.push(`Der geschätzte Live-Tag ${hmFd2DatumLang(live.verschoben)} ist ein Feiertag oder Sonntag. Vorgeschlagen ist ${hmFd2DatumLang(live.iso)}.`);
  else if (live.iso && hmFd2Feiertag(live.iso)) hinweise.push(`Der Live-Tag ${hmFd2DatumLang(live.iso)} ist ein Feiertag: die erste Woche ginge an diesem Tag vollständig online. Termin mit dem Makler prüfen.`);
  preisBelege.forEach((b) => luecken.push({ was: `Beleg ${b.ref} nennt einen Kaufpreis und bleibt aus dem Feed. Ohne Preis neu fassen, wenn er gezeigt werden soll`, wer: "Team", feld: `plattform.beweise[${b.i}].beleg` }));
  const capPreis = nrs((x) => (x.captionPreis || []).length);
  if (capPreis.length) luecken.push({ was: "Caption ohne Kaufpreis neu schreiben für Folge " + capPreis.join(", "), wer: "Team", feld: "plattform.saeulen[].serie.beispiele[]" });
  const entwurf = nrs((x) => (x.captionEntwurf || []).length);
  if (entwurf.length) luecken.push({ was: "Einlösung aus der Skizze in der Stimme ausformulieren für Folge " + entwurf.join(", "), wer: "Team", feld: "plattform.saeulen[].serie.beispiele[].skizze" });
  const sacheBild = nrs((x) => x.luecke && x.luecke.art === "bild" && !x.gesicht);
  if (sacheBild.length) luecken.push({ was: "Motive ohne Gesicht für Folge " + sacheBild.join(", "), wer: "Team", feld: "bild.kontaktbogen" });
  posts.forEach((x) => { if (x.luecke && (x.luecke.art === "text" || x.luecke.art === "objekt")) luecken.push({ was: `Folge ${x.nr}: ${x.luecke.auftrag}`, wer: x.luecke.art === "objekt" && einw4 !== "ja" ? "Makler" : "Team", feld: x.luecke.art === "objekt" ? "auftrag.einwilligungen.4, webbilder" : "plattform.saeulen[].serie.beispiele" }); });
  ["einloesung", "weitergeben", "hook"].forEach((k) => { const l = nrs((x) => (x.captionLuecken || []).includes(k) && !(x.luecke && x.luecke.art === "text")); if (l.length) luecken.push({ was: `Caption, ${k === "einloesung" ? "Einlösung" : k === "weitergeben" ? "Satz zum Weitergeben" : "erster Satz"} für Folge ${l.join(", ")}`, wer: "Team", feld: k === "weitergeben" ? "plattform.saeulen[].serie.weitergeben" : "plattform.saeulen[].serie.beispiele[].skizze" }); });
  const pruefBel = nrs((x) => x.beleg && x.beleg.status === "selbstauskunft");
  if (pruefBel.length) luecken.push({ was: "Unterlagen für die Belege in Folge " + pruefBel.join(", "), wer: "Makler", feld: "plattform.beweise[].quelle" });

  /* Achse: Grundton in derselben Welt */
  const achseIdee = m2.idee && m2.idee.gezeigt && m2.idee.gezeigt.achse;
  if (achseIdee && achseIdee !== "tonwert") hinweise.push(`Achse ${achseIdee} kann der Renderer noch nicht, gezeigt wird der Grundton.`);
  const achse = { name: "tonwert", pole: ["papier", "dunkel"], satz: grundDunkel ? HM_FD2_ACHSE_DUNKEL : HM_FD2_ACHSE_HELL };

  /* Wochen: Pin-Reihe, darunter der Strom, neueste Zeile oben */
  const wochen = [1, 2, 3, 4].map((w) => {
    const zeilen = [HM_FEED2_TAKT.angepinnt.slice()];
    for (let k = w; k >= 2; k--) zeilen.push([3 * k, 3 * k - 1, 3 * k - 2]);
    const erster = posts.find((x) => x.nr === (w === 1 ? 1 : 3 * w - 2));
    return { woche: w, datum: erster ? erster.datum : null, zeilen };
  });

  const feed = {
    mid, variante: v, welt, b: bb, anrede, quelle, signatur, live, achse, hinweise,
    posts: posts.slice().sort((a, c) => c.nr - a.nr),
    profil, wochen, pruefung: [], luecken,
  };
  feed.pruefung = hmFd2Pruefen(feed, { fremd, belege, preisBelege, einw4, p, bio });
  return feed;
}

/* ---------- Prüfung ---------- */
function hmFd2Pruefen(f, ctx) {
  const out = [];
  const P = (name, ok, detail, stufe) => out.push({ name, ok: !!ok, detail: detail || "", stufe: stufe || (ok ? "ok" : "fehler") });
  const posts = f.posts; const nach = posts.slice().sort((a, b) => a.nr - b.nr);
  const woche = (w) => nach.filter((x) => x.woche === w);
  posts.forEach((x) => { x.befunde = []; });
  const B = (x, name, ok, detail) => x.befunde.push({ name, ok: !!ok, detail: detail || "" });

  P("Zwölf Beiträge, neuester zuerst", posts.length === 12 && posts[0].nr === 12 && posts[11].nr === 1, posts.map((x) => x.nr).join(", "));
  const jeWoche = [1, 2, 3, 4].map((w) => woche(w).map((x) => x.platz).join(""));
  P("Vier Wochen mit je drei Plätzen", jeWoche.every((s) => s === "123"), jeWoche.map((s, i) => `Woche ${i + 1}: ${s.length}`).join(", "));
  P("Angepinnt 3, 2, 1", f.profil.angepinnt.join() === "3,2,1", "Anzeige links nach rechts: " + f.profil.angepinnt.join(", "));
  const ges = nach.filter((x) => x.gesicht); const gw = [1, 2, 3, 4].map((w) => woche(w).filter((x) => x.gesicht).length);
  P("Gesicht auf Platz 1 und 2", ges.length === 8 && gw.every((n) => n <= 2) && ges.every((x) => x.platz <= 2), `geplant ${ges.length} von 12, je Zeile ${gw.join(", ")}`);
  /* Was wirklich zu sehen ist: das Porträt muss in der Kachel gezeichnet sein, nicht nur geplant */
  const weltId = f.welt && f.welt.id;
  const sieht = (x) => hmFd2PortraitSichtbar(x.daten, f.b, weltId);
  nach.forEach((x) => { if (x.gesicht && f.b && f.b.portrait) B(x, "Gesicht sichtbar gezeichnet", sieht(x), sieht(x) ? "Porträt in der Kachel" : `Kachelform "${x.daten && x.daten.art}" zeigt in dieser Welt kein Porträt`); });
  if (!(f.b && f.b.portrait)) P("Gesicht sichtbar gezeichnet", true, "Porträt fehlt: die acht Gesichtsplätze füllen sich am Porträt-Termin", "meldung");
  else { const ohneG = ges.filter((x) => !sieht(x)).map((x) => x.nr); P("Gesicht sichtbar gezeichnet", !ohneG.length, ohneG.length ? "Kein Porträt sichtbar in Folge " + ohneG.join(", ") : "alle acht Gesichtsplätze zeigen das Porträt"); }
  const gt = nach.filter((x) => x.gegenton).map((x) => x.nr);
  P("Gegenton nur Folge 6 und 12", gt.join() === "6,12", gt.length ? "Gegenton auf " + gt.join(", ") : "kein Gegenton");
  const pins = nach.filter((x) => x.nr <= 3);
  P("Pin-Kante", pins.every((x) => !x.gegenton && !x.textgefuehrt), pins.filter((x) => x.gegenton || x.textgefuehrt).map((x) => "Folge " + x.nr).join(", ") || "keine Pin-Kachel Gegenton oder textgeführt");
  const tf = nach.filter((x) => x.textgefuehrt);
  P("Textgeführt nur auf dem Sachplatz mit Gegenton", tf.every((x) => x.platz === 3 && x.gegenton) && tf.length <= 2, tf.map((x) => "Folge " + x.nr).join(", ") || "keine");

  /* Belege */
  const sichtbar = (x) => x.beleg && x.beleg.sichtbar;
  const ohne = [1, 2, 3, 4].filter((w) => !woche(w).some(sichtbar)).map((w) => (w === 1 ? "Pin-Reihe" : "Woche " + w));
  P("Beleg sichtbar je Zeile", true, ohne.length ? "Ohne sichtbaren Beleg: " + ohne.join(", ") : "jede Zeile trägt einen Beleg", ohne.length ? "meldung" : "ok");
  const doppelt = [2, 3, 4].filter((w) => woche(w).filter(sichtbar).length > 1);
  P("Höchstens ein sichtbarer Beleg je Woche", !doppelt.length, doppelt.length ? "Mehr als einer in Woche " + doppelt.join(", ") : "erfüllt");
  const pinRefs = pins.filter((x) => x.beleg).map((x) => x.beleg.ref);
  P("Beleg in der Pin-Reihe höchstens einmal", new Set(pinRefs).size === pinRefs.length, pinRefs.length ? pinRefs.join(", ") : "kein Beleg in der Pin-Reihe");
  const alleRefs = nach.filter((x) => x.beleg).map((x) => x.beleg.ref);
  P("Jeder Beleg höchstens einmal im Takt", new Set(alleRefs).size === alleRefs.length, alleRefs.join(", ") || "keine Belege");
  const falsch = [];
  nach.forEach((x) => {
    const tr = hmFd2Treffer(x.text);
    if (sichtbar(x)) {
      const ok = tr.length > 0 && tr.every((t) => hmFd2Enthaelt(x.beleg.text, t));
      B(x, "Beleg-Zahl wörtlich", ok, tr.join(", ") || "keine Zahl im Bild");
      if (!ok) falsch.push(x.nr);
    } else if (x.beleg) {
      const ok = tr.every((t) => hmFd2Enthaelt(x.beleg.text, t));
      B(x, "Beleg-Zahl wörtlich", ok, (tr.join(", ") || "keine Zahl im Bild") + ", Beleg nur in der Caption");
      if (!ok) falsch.push(x.nr);
    } else if (tr.some((t) => /\d/.test(t))) { falsch.push(x.nr); B(x, "Zahl ohne Beleg", false, tr.join(", ")); }
  });
  P("Beleg-Zahl im Bild wörtlich aus dem Beleg", !falsch.length, falsch.length ? "Folge " + falsch.join(", ") : "erfüllt");
  const zweit = nach.filter((x) => x.beleg && !x.beleg.sichtbar && hmFd2Treffer(x.text).length).map((x) => x.nr);
  P("Zweite Zahl in einer Woche", true, zweit.length ? `Folge ${zweit.join(", ")}: Zahl im Bild, Beleg nur in der Caption. Team prüft einen Tausch` : "keine", zweit.length ? "meldung" : "ok");
  /* Kaufpreise nie: weder im Beleg noch in Text im Bild oder Caption */
  const mitPreis = nach.filter((x) => hmFd2Preis([x.text, x.unter, x.caption, x.beleg && x.beleg.text].filter(Boolean).join(" "))).map((x) => x.nr);
  nach.forEach((x) => { if (mitPreis.includes(x.nr)) B(x, "Kein Kaufpreis", false, "Preis in Text im Bild, Caption oder Beleg"); });
  const aus = (ctx.preisBelege || []).map((b) => b.ref);
  P("Kein Kaufpreis im Beleg", !mitPreis.length, (mitPreis.length ? "Kaufpreis in Folge " + mitPreis.join(", ") : "kein Preis im Feed") + (aus.length ? "; ausgeschlossen: " + aus.join(", ") : ""));
  const sa = nach.filter((x) => x.beleg && x.beleg.status === "selbstauskunft").map((x) => x.nr);
  P("Belege mit Prüfvermerk", true, sa.length ? "Selbstauskunft in Folge " + sa.join(", ") + ", Unterlage vor dem Live-Tag" : "keine offenen Vermerke", sa.length ? "meldung" : "ok");

  /* Worte */
  const lang = [];
  nach.forEach((x) => { const n = hmFd2Woerter(x.text); B(x, "Text im Bild höchstens acht Wörter", n <= 8, n + " Wörter"); if (n > 8) lang.push(`Folge ${x.nr}: ${n} Wörter`); });
  P("Text im Bild höchstens acht Wörter", !lang.length, lang.join(", ") || "erfüllt");
  const hl = [];
  nach.forEach((x) => { const h = hmFd2S(x.captionTeile && x.captionTeile.hook); if (h && !(x.captionLuecken || []).includes("hook")) { B(x, "Erster Satz höchstens 90 Zeichen", h.length <= 90, h.length + " Zeichen"); if (h.length > 90) hl.push(`Folge ${x.nr}: ${h.length}`); } });
  P("Erster Satz höchstens 90 Zeichen", !hl.length, hl.join(", ") || "erfüllt");
  const spr = [];
  nach.forEach((x) => { const f2 = hmFd2Sprache([x.text, x.unter, x.caption].join("\n")); B(x, "Sprachprüfung", !f2.length, f2.join(", ") || "sauber"); if (f2.length) spr.push(`Folge ${x.nr}: ${f2.join(", ")}`); });
  const fp = hmFd2Sprache([f.profil.zeile].concat(f.profil.bio.filter(Boolean)).join("\n"));
  if (fp.length) spr.push("Profil: " + fp.join(", "));
  P("Sprachprüfung", !spr.length, spr.join("; ") || "keine Ausrufezeichen, keine Gedankenstriche, keine Formelsätze");

  /* Bilder */
  const bilder = [];
  nach.forEach((x) => { if (x.daten && x.daten.bild && x.daten.bild.img) bilder.push(x.daten.bild.img); });
  const fremdeBilder = bilder.filter((u) => (ctx.fremd || []).includes(u) || /assets\/img\//.test(u));
  P("Kein fremdes Bild", !fremdeBilder.length, fremdeBilder.length ? fremdeBilder.join(", ") : "nur eigene Bilder oder Lücken");
  const x12 = nach.find((x) => x.nr === 12);
  P("Folge 12 Wechselplatz", true, x12 && x12.luecke && x12.luecke.art === "objekt" ? `Lückenkachel, ${x12.luecke.grund} Ersatz: ${x12.luecke.ersatz && x12.luecke.ersatz.titel ? x12.luecke.ersatz.titel : "fehlt"}` : "eigenes Objekt mit Bild", x12 && x12.luecke && x12.luecke.art === "objekt" && !(x12.luecke.ersatz && x12.luecke.ersatz.titel) ? "meldung" : "ok");

  /* Profil */
  P("Profilbild", true, f.profil.profilbild.url ? "Porträt 1:1" : "Lücke bis zum Porträt-Termin", f.profil.profilbild.url ? "ok" : "meldung");
  P("Kontoname", true, f.profil.konto ? f.profil.konto : "Kontoname folgt, Quelle marke2.vorab.fakten.kanaele", f.profil.konto ? "ok" : "meldung");
  const bioT = f.profil.bio.filter(Boolean);
  const bioOk = f.profil.bio.length === 3 && bioT.every((z) => z.length <= 60) && bioT.join("\n").length <= 150;
  P("Bio drei Zeilen, höchstens 150 Zeichen", bioOk, `${bioT.join("\n").length} Zeichen, ${3 - bioT.length} Zeilen als Lücke`);
  const teil = ((ctx.bio && ctx.bio.grund) || []).indexOf("satzteil");
  P("Bio in ganzen Zeilen", true, teil >= 0 ? `Zeile ${teil + 1} wäre ein Satzteil (positionierung.was), steht als Lücke` : "keine Satzteile", teil >= 0 ? "meldung" : "ok");
  const liveFei = hmFd2Feiertag(f.live.iso);
  P("Live-Tag", true, f.live.iso ? `${hmFd2DatumLang(f.live.iso)}${f.live.geschaetzt ? ", geschätzt" : ""}${f.live.verschoben ? ", verschoben vom Feiertag " + hmFd2DatumLang(f.live.verschoben) : ""}${liveFei ? ", fällt auf einen Feiertag" : ""}` : "Live-Tag folgt", f.live.iso && !f.live.geschaetzt && !liveFei ? "ok" : "meldung");
  const capL = nach.filter((x) => (x.captionLuecken || []).length).length;
  P("Captions vollständig", true, capL ? `${capL} von 12 mit Lücken, schreibt das Team` : "alle Teile vorhanden", capL ? "meldung" : "ok");
  /* Fünf-Sekunden-Blick auf Woche 4 mit verdeckter Bio: für wen, wofür, wo, zwei Gesichter je Zeile */
  const pos = (ctx.p && ctx.p.positionierung) || {};
  const fuerWen = hmFd2Wert(pos.fuerWen);
  const wo = /,\s*\S/.test(f.profil.zeile);
  const gesichtSicht = [1, 2, 3, 4].map((w) => woche(w).filter(sieht).length);
  const fuenf = !!fuerWen && wo && gesichtSicht.every((n) => n === 2);
  P("Fünf-Sekunden-Blick", true, `für wen: ${fuerWen ? "ja" : "fehlt"}; wo: ${wo ? "ja" : "fehlt"}; sichtbare Gesichter je Zeile: ${gesichtSicht.join(", ")}`, fuenf ? "ok" : "meldung");
  return out;
}

/* ---------- Hooks ---------- */
function hmFd2Sig(v) { return JSON.stringify(v == null ? null : v, (k, x) => (typeof x === "string" && x.length > 160 ? x.length + ":" + x.slice(0, 40) + x.slice(-40) : x)); }
function useHmFeed12(mid, variante, aus) {
  const pl = useHm("plattformen"), m2 = useHm("marke2"), br = useHm("branding"), po = useHm("portraits"), au = useHm("auftrag");
  const [bilderStand, setBilderStand] = React.useState(0);
  /* Eigene Bilder liegen in IndexedDB: einmal laden, dann neu rechnen */
  React.useEffect(() => {
    let weg = false;
    if (!aus && window.hmWebBlobsLaden) Promise.resolve(window.hmWebBlobsLaden(mid)).then(() => { if (!weg) setBilderStand((x) => x + 1); }).catch(() => {});
    return () => { weg = true; };
  }, [mid, aus]);
  const welt = hmFd2Sicher(() => ((hmStore.get("markenbuch") || {})[mid] || {}).welt, "");
  const sig = hmFd2Sig([pl && pl[mid], m2 && m2[mid], br && br[mid], po && po[mid], au && au[mid], welt, bilderStand]);
  return React.useMemo(() => (aus ? null : hmFeed12(mid, variante)), [mid, variante, sig, aus]);
}
function useHmFd2Breite(ref, start) {
  const [w, setW] = React.useState(start);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const x0 = Math.floor(el.getBoundingClientRect().width); if (x0 > 0) setW(x0);
    if (typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver((e) => { const x = Math.floor(e[0].contentRect.width); if (x > 0) setW(x); });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return w;
}

/* ---------- Oberfläche ---------- */
function HmFd2PinIco() {
  return <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5.5 2.5h5M6.5 2.5v4L4 9.5h8L9.5 6.5v-4M8 9.5v4" /></svg>;
}
function HmFd2Punkt() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="8" cy="8" r="4.5" /></svg>;
}

function FeedKachel({ post, welt, b, breite, onClick }) {
  const label = [post.serie && post.serie.name ? post.serie.name : "Beitrag " + post.nr, hmFd2FolgeText(post), post.text || (post.luecke ? post.luecke.satz : "")].filter(Boolean).join(", ");
  return <button type="button" className="hm-fd2-kachel" aria-label={label} onClick={onClick} style={{ width: breite, height: Math.round(breite * 4 / 3) }}>
    <WeltPost welt={welt} b={b} daten={post.daten} breite={breite} format="3:4" />
    {post.angepinnt && <span className="hm-fd2-pin"><HmFd2PinIco /></span>}
  </button>;
}

/* Titelbild im 64-px-Kreis: vergrößerter Ausschnitt der Kachel, ausgerichtet auf das gezeichnete Gesicht, sonst auf die erste Textzeile */
function HmFd2Titelbild({ post, welt, b }) {
  const B = 182; const k = B / 1080;
  const id = (welt && welt.id) || "ruhig"; const fk = HM_FD2_FOKUS[id] || HM_FD2_FOKUS.ruhig;
  const port = hmFd2PortraitSichtbar(post.daten, b, id);
  const [cx, cy] = port ? (fk.ps && post.daten.spiegel ? fk.ps : fk.p) : fk.t;
  const left = Math.min(0, Math.max(64 - B, Math.round(32 - cx * k)));
  const top = Math.min(0, Math.max(64 - Math.round(B * 1.25), Math.round(32 - cy * k)));
  return <span className="hm-fd2-hl-bild" style={{ left, top }}><WeltPost welt={welt} b={b} daten={post.daten} breite={B} /></span>;
}

function FeedWochen({ feed, woche, setWoche }) {
  return <div className="hm-fd2-wochen" role="group" aria-label="Woche wählen">
    {feed.wochen.map((w) => <button key={w.woche} type="button" aria-pressed={woche === w.woche} className={woche === w.woche ? "on" : ""} onClick={() => setWoche(w.woche)}>
      <span className="t">Woche {w.woche}</span><span className="d">{hmFd2DatumKurz(w.datum)}</span>
      {hmFd2Feiertag(w.datum) && <span className="d">Feiertag</span>}
    </button>)}
  </div>;
}

function FeedProfil({ m, variante = "empfehlung", woche = 4, onWoche, breite = 390, onBeitrag, teamSicht, feed }) {
  hmFeed2Stil();
  const eigen = useHmFeed12(m.id, variante, !!feed);
  const f = feed || eigen;
  const ref = React.useRef(null);
  const W = Math.max(240, Math.min(breite, useHmFd2Breite(ref, breite)));
  /* Nur neu hinzukommende Zeilen blenden ein (sie werden frisch eingehängt), nie beim Zurückgehen */
  const wAkt = Math.min(4, Math.max(1, woche || 4));
  const letzte = React.useRef(wAkt); const neuVon = React.useRef(99);
  if (letzte.current !== wAkt) { neuVon.current = wAkt > letzte.current ? letzte.current + 1 : 99; letzte.current = wAkt; }
  const g = W >= 390 ? 2 : Math.max(1, Math.round(W / 195));
  const kachel = Math.floor(((W - 2 * g) / 3) * 10) / 10;
  const stand = f.wochen[wAkt - 1];
  const nachNr = (nr) => f.posts.find((x) => x.nr === nr);
  const pr = f.profil;
  /* Ohne onBeitrag öffnet das Profil den Beitrag selbst, damit jede Kachel als Schaltfläche auch wirkt */
  const [offenNr, setOffenNr] = React.useState(null);
  const oeffne = (x) => { if (onBeitrag) onBeitrag(x); else setOffenNr(x.nr); };
  const offenPost = !onBeitrag && offenNr != null ? nachNr(offenNr) : null;
  return <div className="hm-fd2-spalte" ref={ref} style={{ maxWidth: breite }} data-variante={f.variante} data-team={teamSicht ? "ja" : undefined}>
    <div className="hm-fd2-kopf">
      <div className="hm-fd2-konto">{pr.konto ? pr.konto : <span className="hm-fd2-leise">Kontoname folgt</span>}</div>
      <div className="hm-fd2-oben">
        <div className={"hm-fd2-bild" + (pr.profilbild.url ? "" : " luecke")}>{pr.profilbild.url ? <img src={pr.profilbild.url} alt={"Porträt " + pr.name} /> : <span>{pr.profilbild.luecke}</span>}</div>
        <div className="hm-fd2-wer"><div className="hm-fd2-name">{pr.name}</div><div className="hm-fd2-zeile">{pr.zeile}</div></div>
      </div>
      <div className="hm-fd2-bio">{pr.bio.map((z, i) => (z ? <div key={i}>{z}</div> : (i === 0 || pr.bio[i - 1]) ? <div key={i} className="hm-fd2-leise">Diese Zeile schreiben wir mit Ihnen vor dem Live-Tag.</div> : null))}</div>
      <div className="hm-fd2-hls">{pr.highlights.map((h, i) => {
        const x = h.coverNr ? nachNr(h.coverNr) : null;
        return <button key={i} type="button" className="hm-fd2-hl" disabled={!x} onClick={() => x && oeffne(x)} aria-label={h.name ? "Highlight " + h.name : "Highlight folgt"}>
          <span className="hm-fd2-hl-kreis">{x ? <HmFd2Titelbild post={x} welt={f.welt} b={f.b} /> : null}</span>
          <span className={"hm-fd2-hl-name" + (h.name ? "" : " hm-fd2-leise")}>{h.name || "folgt"}</span>
        </button>;
      })}</div>
    </div>
    {onWoche && <div style={{ padding: "0 12px 12px" }}><FeedWochen feed={f} woche={wAkt} setWoche={onWoche} /></div>}
    <div className="hm-fd2-raster" style={{ gap: g }}>
      {stand.zeilen.map((z, zi) => {
        const wk = zi === 0 ? 0 : Math.ceil(z[0] / 3);
        const neu = zi > 0 && wk >= neuVon.current && wk <= wAkt;
        return <div key={zi === 0 ? "pin" : "w" + wk} className={"hm-fd2-reihe" + (neu ? " neu" : "")} style={{ gap: g }}>
          {z.map((nr) => { const x = nachNr(nr); return x ? <FeedKachel key={nr} post={x} welt={f.welt} b={f.b} breite={kachel} onClick={() => oeffne(x)} /> : null; })}
        </div>;
      })}
    </div>
    {offenPost && <FeedBeitrag m={m} post={offenPost} variante={f.variante} feed={f} teamSicht={teamSicht} zu={() => setOffenNr(null)} />}
  </div>;
}

/* Caption in Lesegröße; Lücken im Makler-Blick als ein ruhiger Satz, im Team-Blick mit Arbeitsauftrag */
function HmFd2Caption({ x, anrede, teamSicht }) {
  const t = x.captionTeile || {}; const l = x.captionLuecken || []; const ent = x.captionEntwurf || [];
  const teile = [];
  let vorher = false;
  ["hook", "einloesung", "beleg", "weitergeben"].forEach((k) => {
    const roh = hmFd2S(t[k]); if (!roh) return;
    const luecke = l.includes(k);
    /* Makler-Blick: aufeinanderfolgende Lücken ergeben einen Satz */
    if (luecke && !teamSicht) { if (!vorher) teile.push(<p key={k} className="luecke">{HM_FD2_MAKLER_LUECKE}</p>); vorher = true; return; }
    vorher = false;
    /* Skizze als Entwurf kennzeichnen; eingebettete Lückenmarken werden im Makler-Blick zu einem ruhigen Hinweis */
    if (!luecke && ent.includes(k)) {
      const txt = hmFd2Anrede(roh, anrede);
      teile.push(<p key={k} className="entwurf">{teamSicht ? txt : "Entwurf, den wir mit Ihnen ausformulieren: " + txt.replace(/\s*\[[^\]]*\]/g, " (ergänzen wir mit Ihnen)")}{teamSicht ? <span className="hm-fd2-auftrag">Arbeitsauftrag: Skizze in zwei bis vier Sätzen in der Stimme des Maklers ausformulieren.</span> : null}</p>);
      return;
    }
    teile.push(<p key={k} className={luecke ? "luecke" : undefined}>{hmFd2Anrede(roh, anrede)}{luecke ? <span className="hm-fd2-auftrag">Arbeitsauftrag: {HM_FD2_AUFTRAG[k]}</span> : null}</p>);
  });
  return <div className="hm-fd2-caption">{teile}</div>;
}

function FeedBeitrag({ m, post, variante = "empfehlung", zu, teamSicht, feed }) {
  hmFeed2Stil();
  const eigen = useHmFeed12(m.id, variante, !!feed);
  const f = feed || eigen;
  const x = post ? (f.posts.find((y) => y.nr === post.nr) || post) : null;
  const seiten = x ? (x.seiten || []).map((s) => ({ ...x.daten, art: s.art || "hook", text: s.text || "", unter: s.unter || "", nr: x.nr })) : [];
  const [seite, setSeite] = React.useState(0);
  React.useEffect(() => { setSeite(0); }, [x ? x.nr : 0, f.variante]);
  React.useEffect(() => {
    if (!x || seiten.length < 2) return undefined;
    const k = (e) => { if (e.key === "ArrowRight") setSeite((s) => Math.min(seiten.length - 1, s + 1)); else if (e.key === "ArrowLeft") setSeite((s) => Math.max(0, s - 1)); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [x ? x.nr : 0, seiten.length]);
  if (!x) return null;
  const mb = Math.max(220, Math.min(400, (typeof window !== "undefined" ? window.innerWidth : 460) - 56));
  const daten = seiten.length ? seiten[Math.min(seite, seiten.length - 1)] : x.daten;
  const unter = [hmFd2DatumLang(x.datum), HM_FD2_FORMAT[x.format] || "Beitrag", x.angepinnt ? "angepinnt" : ""].filter(Boolean).join(", ");
  const objektLuecke = x.luecke && x.luecke.art === "objekt";
  const tag = hmFd2Wochentag(x.datum);
  return <Sheet offen={true} zu={zu} titel={hmFd2Titel(x)} unter={unter} breit>
    <div className="hm-fd2-beitrag">
      <div className="hm-fd2-medien">
        <div className="hm-fd2-medium"><WeltPost welt={f.welt} b={f.b} daten={daten} breite={mb} /></div>
        {seiten.length > 1 && <div className="hm-fd2-blaettern">
          <button type="button" onClick={() => setSeite((s) => Math.max(0, s - 1))} disabled={seite === 0} aria-label="Vorherige Seite"><Ico n="zurueck" /></button>
          <span aria-live="polite">Seite {seite + 1} von {seiten.length}</span>
          <button type="button" onClick={() => setSeite((s) => Math.min(seiten.length - 1, s + 1))} disabled={seite >= seiten.length - 1} aria-label="Nächste Seite"><Ico n="weiter" /></button>
        </div>}
        {x.format === "karussell" && <p className="hm-fd2-satz">Weitere Seiten schreiben wir nach Ihrer Rückmeldung.</p>}
        {x.format === "reel" && <p className="hm-fd2-satz">Das Reel drehen wir am Drehtag.</p>}
      </div>
      <div className="hm-fd2-text">
        {objektLuecke && (x.luecke.ersatz && x.luecke.ersatz.titel
          ? <p className="hm-fd2-lese">{`Bis dahin erscheint an diesem ${tag || "Tag"}: ${x.luecke.ersatz.titel}.`}</p>
          : <p className="hm-fd2-lese">Was an diesem Tag stattdessen erscheint, legen wir mit Ihnen vor dem Live-Tag fest.</p>)}
        <HmFd2Caption x={x} anrede={f.anrede} teamSicht={teamSicht} />
        {((x.luecke && !objektLuecke) || (x.beleg && x.beleg.status === "selbstauskunft")) && <div className="hm-fd2-notiz">
          {x.luecke && !objektLuecke && <p className="hm-fd2-lese">{x.luecke.satz}</p>}
          {x.beleg && x.beleg.status === "selbstauskunft" && <p className="hm-fd2-lese">Diese Zahl prüfen wir vor dem Live-Tag mit Ihren Unterlagen.</p>}
        </div>}
        {teamSicht && <div className="hm-fd2-team">
          <h4>Herkunft</h4>
          <ul>{(x.herkunft || []).map((h, i) => <li key={i}><span>{h.teil}</span><code>{h.feld}</code></li>)}</ul>
          <h4>Prüfbefunde</h4>
          <ul>{(x.befunde || []).map((b, i) => <li key={i}><span>{b.name}</span><span>{b.ok ? "erfüllt" : "offen"}{b.detail ? ", " + b.detail : ""}</span></li>)}</ul>
          {x.luecke && <><h4>Lücke</h4><p style={{ margin: 0 }}>{x.luecke.auftrag || x.luecke.satz}{x.luecke.grund ? " " + x.luecke.grund : ""}</p></>}
        </div>}
      </div>
    </div>
  </Sheet>;
}

function FeedVergleich({ m, teamSicht }) {
  hmFeed2Stil();
  const fe = useHmFeed12(m.id, "empfehlung");
  const fg = useHmFeed12(m.id, "gegenentwurf");
  const [modus, setModus] = React.useState("empfehlung");
  const [woche, setWoche] = React.useState(4);
  const [offen, setOffen] = React.useState(null);
  const ref = React.useRef(null);
  const W = useHmFd2Breite(ref, 820);
  const neben = modus === "nebeneinander";
  const zweiSpalten = neben && W >= 820;
  const breiteEin = zweiSpalten ? Math.min(390, Math.floor((W - 24) / 2)) : Math.min(390, W);
  const offVar = offen ? (neben ? offen.variante : modus) : "empfehlung";
  const offFeed = offVar === "gegenentwurf" ? fg : fe;
  const offPost = offen ? offFeed.posts.find((x) => x.nr === offen.nr) : null;
  const varianten = neben ? ["empfehlung", "gegenentwurf"] : [modus];
  return <div className="hm-fd2-vergleich" ref={ref}>
    <div className="hm-fd2-modus" role="group" aria-label="Entwurf wählen">
      {[["empfehlung", "Unsere Empfehlung"], ["gegenentwurf", "Gegenentwurf"], ["nebeneinander", "Nebeneinander"]].map(([id, t]) => <button key={id} type="button" aria-pressed={modus === id} className={modus === id ? "on" : ""} onClick={() => setModus(id)}>{t}</button>)}
    </div>
    {modus !== "empfehlung" && <p className="hm-fd2-achse">{fg.achse.satz}</p>}
    {teamSicht && fe.hinweise.map((h) => <p key={h} className="hm-fd2-hinweis">{h}</p>)}
    <FeedWochen feed={fe} woche={woche} setWoche={setWoche} />
    <div className={"hm-fd2-profile" + (zweiSpalten ? " neben" : "")}>
      {varianten.map((v) => <figure key={v} className="hm-fd2-rahmen" style={{ maxWidth: breiteEin }}>
        {neben && <figcaption>{v === "empfehlung" ? "Unsere Empfehlung" : "Gegenentwurf"}</figcaption>}
        <FeedProfil m={m} variante={v} woche={woche} breite={breiteEin} feed={v === "gegenentwurf" ? fg : fe} teamSicht={teamSicht} onBeitrag={(x) => setOffen({ nr: x.nr, variante: v })} />
      </figure>)}
    </div>
    {offPost && <FeedBeitrag m={m} post={offPost} variante={offVar} feed={offFeed} teamSicht={teamSicht} zu={() => setOffen(null)} />}
  </div>;
}

function FeedAbschnitt({ m, teamSicht }) {
  hmFeed2Stil();
  const f = useHmFeed12(m.id, "empfehlung", !teamSicht);
  return <section className="hm-fd2-abschnitt" data-material="vorschau|feed-woche-4|1080">
    <h3 className="hm-h hm-h2" style={{ margin: 0 }}>Ihr Feed in den ersten vier Wochen</h3>
    <p className="hm-fd2-absatz">Zwölf Beiträge in der Reihenfolge, in der sie erscheinen. Die erste Woche geht am Live-Tag vollständig online.</p>
    <FeedVergleich m={m} teamSicht={teamSicht} />
    {teamSicht && f && <div className="hm-fd2-pruef">
      <div>
        <h4>Prüfliste</h4>
        <ul>{f.pruefung.map((r) => <li key={r.name} className="zeile">
          <span className="zeichen">{r.stufe === "meldung" ? <HmFd2Punkt /> : <Ico n={r.ok ? "haken" : "x"} />}</span>
          <span>{r.name}{r.stufe === "meldung" ? ", Meldung" : r.ok ? "" : ", offen"}</span>
          <span>{r.detail}</span>
        </li>)}</ul>
      </div>
      <div>
        <h4>Lücken</h4>
        {f.luecken.length ? <ul>{f.luecken.map((l, i) => <li key={i} className="luecke"><span>{l.was}</span><span>{l.wer}</span><code>{l.feld}</code></li>)}</ul> : <p style={{ margin: 0 }}>Keine Lücken.</p>}
      </div>
    </div>}
  </section>;
}

/* ---------- Selbsttest ohne DOM-Seiteneffekte ---------- */
const HM_FD2_TESTPLATTFORM = {
  positionierung: { was: "Zinshäuser und Altbau in Döbling", fuerWen: "Erben und Anleger" },
  botschaften: { claim: "Rat vor Auftrag." },
  stimme: { beispiele: [] },
  saeulen: [
    { id: "meinung", name: "Meinung", anteil: 30, formate: ["talking", "qa"], serie: { name: "Geraten", idee: "Jede Folge ein Fall, in dem der Rat vor dem Auftrag kam.", beispiele: [
      { titel: "Zwei Jahre gewartet", hook: "Warum ich einer Erbengemeinschaft zum Warten geraten habe.", skizze: "Ausgangslage, Rat, Ergebnis in drei Sätzen." },
      { titel: "Eine Woche Bedenkzeit", hook: "Was Erben in der ersten Woche nicht entscheiden müssen." },
      { titel: "Der zu frühe Verkauf", hook: "Wann ein Verkauf zu früh kommt." },
    ] } },
    { id: "wissen", name: "Wissen", anteil: 25, formate: ["carousel", "qa"], serie: { name: "Vor der Unterschrift", beispiele: [
      { titel: "Der Vermittlungsauftrag", hook: "Was im Vermittlungsauftrag steht, bevor Sie unterschreiben." },
      { titel: "Der Grundbuchauszug", hook: "So lesen Sie einen Grundbuchauszug." },
      { titel: "Der Mietvertrag", hook: "Der Mietvertrag, vor der Unterschrift." },
    ] } },
    { id: "beweise", name: "Beweise", anteil: 25, formate: ["carousel", "walkthrough"], serie: { name: "Verbüchert", beispiele: [
      { titel: "Zinshaus: 11 Wochen", hook: "Zinshaus, 11 Wochen. So lief es.", skizze: "Zeitachse in sechs Kacheln." },
      { titel: "Anlegerwohnung: 8 Prozent", hook: "8 Prozent über der Erstschätzung. Wie das zustande kam." },
    ] } },
    { id: "persoenlich", name: "Persönlich", anteil: 20, formate: ["spaziergang"], serie: { name: "Alteingesessen", beispiele: [{ titel: "Ein Morgen in Sievering" }] } },
  ],
  start30: [
    { woche: 1, beitraege: [{ titel: "Zwei Jahre gewartet", saeule: "meinung", format: "talking" }, { titel: "Zinshaus: 11 Wochen", saeule: "beweise", format: "carousel" }, { titel: "Der Vermittlungsauftrag", saeule: "wissen", format: "carousel" }] },
    { woche: 2, beitraege: [{ titel: "Eine Woche Bedenkzeit", saeule: "meinung", format: "talking" }, { titel: "Ein Morgen in Sievering", saeule: "persoenlich", format: "spaziergang" }, { titel: "Anlegerwohnung: 8 Prozent", saeule: "beweise", format: "carousel" }] },
    { woche: 3, beitraege: [{ titel: "Der Grundbuchauszug", saeule: "wissen", format: "qa" }, { titel: "Der zu frühe Verkauf", saeule: "meinung", format: "qa" }, { titel: "Der Mietvertrag", saeule: "wissen", format: "carousel" }] },
    { woche: 4, beitraege: [{ titel: "Wer ich bin, in 90 Sekunden", saeule: "persoenlich", format: "talking" }, { titel: "Stand Sievering im November", saeule: "persoenlich", format: "carousel" }] },
  ],
  beweise: [
    { behauptung: "Zinshaus: verkauft in 11 Wochen", beleg: "Zinshaus in Sievering, verkauft in 11 Wochen.", quelle: "Fragebogen (vor Veröffentlichung mit Unterlagen prüfen)" },
    { behauptung: "8 Prozent über der Erstschätzung", beleg: "Anlegerwohnung in Währing, 8 Prozent über der Erstschätzung.", quelle: "Unterlage" },
    { behauptung: "Kaufpreis", beleg: "Verkauft um 1,2 Mio. Euro.", quelle: "Fragebogen" },
  ],
};
function hmSelbsttestFeed2() {
  const out = [];
  const T = (name, fn) => { try { const r = fn(); out.push({ name: "Feed2: " + name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name: "Feed2: " + name, ok: false, detail: String(e && e.message || e) }); } };
  const basis = { plattform: HM_FD2_TESTPLATTFORM, einwilligung4: "nein", bilder: [], live: "2026-11-24", makler: { name: "Test Makler", region: "1190 Döbling" }, marke2: {}, anrede: "Sie" };
  const mid = "__fd2test";
  const fe = hmFeed12(mid, "empfehlung", basis);
  const fg = hmFeed12(mid, "gegenentwurf", basis);
  const nr = (f, n) => f.posts.find((x) => x.nr === n);
  T("Zwölf Posts, neuester zuerst", () => ({ ok: fe.posts.length === 12 && fe.posts[0].nr === 12 && fe.posts[11].nr === 1, detail: fe.posts.map((x) => x.nr).join(",") }));
  T("Vier Wochen je drei", () => { const n = [1, 2, 3, 4].map((w) => fe.posts.filter((x) => x.woche === w).length); return { ok: fe.wochen.length === 4 && n.every((k) => k === 3), detail: n.join("+") }; });
  T("Angepinnt 3, 2, 1", () => ({ ok: fe.profil.angepinnt.join() === "3,2,1" && fe.wochen[0].zeilen.length === 1 && fe.wochen[3].zeilen[1].join() === "12,11,10", detail: fe.profil.angepinnt.join(",") }));
  T("Gesicht 8 von 12, höchstens 2 je Woche", () => { const g = fe.posts.filter((x) => x.gesicht); const w = [1, 2, 3, 4].map((k) => g.filter((x) => x.woche === k).length); return { ok: g.length === 8 && w.every((k) => k <= 2), detail: `${g.length}, je Woche ${w.join(",")}` }; });
  T("Gegenton nur Folge 6 und 12", () => { const g = fe.posts.filter((x) => x.gegenton).map((x) => x.nr).sort((a, b) => a - b); return { ok: g.join() === "6,12" && nr(fe, 6).ton !== nr(fe, 5).ton, detail: g.join(",") }; });
  T("Keine Pin-Kachel Gegenton oder textgeführt", () => ({ ok: fe.posts.filter((x) => x.nr <= 3).every((x) => !x.gegenton && !x.textgefuehrt) }));
  T("Signatur aus der häufigsten Säule", () => ({ ok: nr(fe, 1).art === "serie" && nr(fe, 1).text === "Geraten" && nr(fe, 2).text === "Zwei Jahre gewartet" && nr(fe, 10).luecke && nr(fe, 10).luecke.art === "text", detail: [1, 2, 4, 7, 10].map((n) => nr(fe, n).text).join(" / ") }));
  T("Gegenentwurf: nur der Ton wechselt", () => {
    const f = [];
    fe.posts.forEach((a, i) => { const b = fg.posts[i]; if (a.nr !== b.nr || a.text !== b.text || a.unter !== b.unter || a.caption !== b.caption || a.serie.name !== b.serie.name || a.serie.folge !== b.serie.folge || a.format !== b.format || (a.beleg && a.beleg.ref) !== (b.beleg && b.beleg.ref)) f.push("Inhalt " + a.nr); if (a.ton === b.ton) f.push("Ton " + a.nr); });
    return { ok: !f.length && fg.achse.name === "tonwert", detail: f.join(", ") || fe.posts.map((x, i) => x.ton + ">" + fg.posts[i].ton).slice(0, 3).join(" ") };
  });
  T("Achse mit genau dem Satz", () => ({ ok: fg.achse.satz === HM_FD2_ACHSE_HELL && fg.achse.pole.join() === "papier,dunkel" }));
  T("Kein Bild aus hmWeltObjekte() oder assets/img/", () => {
    const fremd = hmFd2Sicher(() => window.hmWeltObjekte().map((x) => x.img), []);
    const f3 = hmFeed12(mid, "empfehlung", { ...basis, einwilligung4: "ja", bilder: [{ gruppe: "eigen", url: "../../assets/img/penthouse.jpg" }, { gruppe: "archiv", url: "../../assets/photos/a.jpg" }, { gruppe: "bildwelt", ki: true, url: "blob:ki" }].concat(fremd.slice(0, 1).map((u) => ({ gruppe: "eigen", url: u }))) });
    const urls = [fe, fg, f3].flatMap((f) => f.posts.map((x) => x.daten && x.daten.bild && x.daten.bild.img).filter(Boolean));
    return { ok: !urls.some((u) => fremd.includes(u) || /assets\/img\//.test(u)) && nr(f3, 12).luecke && nr(f3, 12).luecke.art === "objekt", detail: urls.join(", ") || "keine Bild-URL" };
  });
  T("Folge 12 ohne Einwilligung 4 ist Lücke", () => { const x = nr(fe, 12); return { ok: x.art === "objekt" && x.luecke && x.luecke.art === "objekt" && x.text === "Hier kommt Ihr erstes Objekt." && x.unter === "" && !!x.luecke.ersatz.titel, detail: "Ersatz: " + (x.luecke.ersatz && x.luecke.ersatz.titel) }; });
  T("Folge 12 mit Einwilligung ohne eigenes Bild ist Lücke", () => { const f = hmFeed12(mid, "empfehlung", { ...basis, einwilligung4: "ja", bilder: [] }); const x = nr(f, 12); return { ok: x.luecke && x.luecke.art === "objekt" && !(x.daten.bild && x.daten.bild.img) }; });
  T("Folge 12 mit Einwilligung und eigenem Bild zeigt das Objekt", () => { const f = hmFeed12(mid, "empfehlung", { ...basis, einwilligung4: "ja", bilder: [{ gruppe: "eigen", url: "blob:eigen-1", ref: "wi:1" }] }); const x = nr(f, 12); return { ok: x.daten.bild && x.daten.bild.img === "blob:eigen-1" && !(x.luecke && x.luecke.art === "objekt") }; });
  T("Keine Texte mit Ausrufezeichen oder Gedankenstrich", () => { const t = [fe, fg].flatMap((f) => f.posts.flatMap((x) => [x.text, x.unter, x.caption]).concat(f.profil.bio.filter(Boolean), [f.profil.zeile, f.achse.satz])).join("\n"); return { ok: !t.includes("!") && !/[\u2013\u2014]/.test(t) }; });
  T("Bio höchstens 150 Zeichen und drei Zeilen", () => { const z = fe.profil.bio; const s = z.filter(Boolean).join("\n"); return { ok: z.length === 3 && s.length <= 150 && z.filter(Boolean).every((x) => x.length <= 60), detail: s.length + " Zeichen" }; });
  T("Kontoname ohne Quelle ist null", () => ({ ok: fe.profil.konto === null && hmFeed12(mid, "empfehlung", { ...basis, marke2: { vorab: { fakten: [{ feld: "kanaele", wert: [{ kanal: "instagram", status: "aktiv", konto: "@test.konto" }] }] } } }).profil.konto === "test.konto" }));
  T("Beleg-Zahl im Text im Bild steht wörtlich im Beleg", () => { const mit = fe.posts.filter((x) => x.beleg && x.beleg.sichtbar); return { ok: mit.length >= 2 && mit.every((x) => { const tr = hmFd2Treffer(x.text); return tr.length && tr.every((t) => hmFd2Enthaelt(x.beleg.text, t)); }) && !fe.posts.some((x) => x.beleg && /Mio|Euro/.test(x.beleg.text)), detail: mit.map((x) => x.nr + ":" + x.text).join(" / ") }; });
  T("Höchstens ein sichtbarer Beleg je Woche", () => ({ ok: [2, 3, 4].every((w) => fe.posts.filter((x) => x.woche === w && x.beleg && x.beleg.sichtbar).length <= 1) }));
  T("Anrede Sie löst {Sie|du} zu Sie auf", () => ({ ok: hmFd2Anrede("Schicken {Sie|du} das weiter.", "Sie") === "Schicken Sie das weiter." && hmFd2Anrede("{Sie|du}", "Du") === "du" }));
  T("Wochentage mit Feiertag", () => { const d = [1, 4, 5, 6, 7].map((n) => nr(fe, n).datum); const fei = typeof HM_FEIERTAGE !== "undefined" && HM_FEIERTAGE.has("2026-12-08"); return { ok: d[0] === "2026-11-24" && d[1] === "2026-12-01" && d[2] === "2026-12-03" && d[3] === "2026-12-05" && d[4] === (fei ? "2026-12-09" : "2026-12-08"), detail: d.join(", ") }; });
  T("Captions ohne Hashtags und Formelsätze", () => ({ ok: fe.posts.every((x) => !/#\w/.test(x.caption) && !hmFd2Sprache(x.caption).length) }));
  T("Ohne Plattform nur Lücken, kein Fülltext", () => { const f = hmFeed12(mid, "empfehlung", { ...basis, plattform: null }); return { ok: f.posts.length === 12 && f.posts.filter((x) => x.nr !== 12).every((x) => x.luecke && x.luecke.art === "text"), detail: f.posts[0].text }; });
  T("Kaufpreis mit Einheit im selben Beleg bleibt draußen", () => {
    const pl = { ...HM_FD2_TESTPLATTFORM, beweise: [
      { behauptung: "Zinshaus in 11 Wochen", beleg: "Zinshaus Sieveringer Straße, 4,2 Mio. Euro, 11 Wochen.", quelle: "Unterlage" },
      { behauptung: "Zwei Jahre gewartet", beleg: "Nach zwei Jahren Warten 600.000 mehr erzielt.", quelle: "Unterlage" },
      HM_FD2_TESTPLATTFORM.beweise[1],
    ] };
    const f = hmFeed12(mid, "empfehlung", { ...basis, plattform: pl });
    const preis = f.posts.filter((x) => hmFd2Preis([x.caption, x.text, x.unter, x.beleg && x.beleg.text].filter(Boolean).join(" "))).map((x) => x.nr);
    const zeile = f.pruefung.find((r) => r.name === "Kein Kaufpreis im Beleg");
    return { ok: !preis.length && zeile && zeile.ok && f.luecken.filter((l) => /Kaufpreis/.test(l.was)).length >= 2, detail: preis.length ? "Preis in Folge " + preis.join(", ") : (zeile && zeile.detail) };
  });
  T("Staffelplakat zeigt das Gesicht, ohne Nummer und ohne Doppelung", () => {
    const f = hmFeed12(mid, "empfehlung", { ...basis, portrait: "portrait-test.png" });
    const x = nr(f, 1); const d = x.daten;
    const welten = ((typeof HM_MARKENWELTEN !== "undefined" && HM_MARKENWELTEN) || []).map((w) => w.id);
    const ids = welten.length ? welten : ["ruhig", "editorial", "graetzl", "klar", "warm", "kontrast"];
    const alle = ids.every((id) => hmFd2PortraitSichtbar(d, f.b, id));
    const ges = f.posts.filter((y) => y.gesicht).every((y) => hmFd2PortraitSichtbar(y.daten, f.b, f.welt && f.welt.id));
    const zeile = f.pruefung.find((r) => r.name === "Gesicht sichtbar gezeichnet");
    const serieRuhig = hmFd2PortraitSichtbar({ art: "serie", portrait: true }, { portrait: "p.png" }, "ruhig");
    return { ok: x.art === "serie" && d.art === "hook" && d.portrait && !d.serie && d.text === "Geraten" && alle && ges && zeile && zeile.ok && !serieRuhig && nr(f, 2).serie.folge === 1, detail: `${d.art}, serie ${d.serie ? d.serie.nr : "keine"}, Gesichter sichtbar: ${ges}` };
  });
  T("Bio: Relativsatz wird Lücke statt Satzfragment", () => {
    const pl = { ...HM_FD2_TESTPLATTFORM, positionierung: { was: "den richtigen Zeitpunkt vor den schnellen Abschluss stellt", fuerWen: "Erben und Anleger" } };
    const f = hmFeed12(mid, "empfehlung", { ...basis, plattform: pl });
    return { ok: f.profil.bio[0] === null && f.profil.bio[1] === "Für Erben und Anleger" && f.luecken.some((l) => /Satzteil/.test(l.was)), detail: JSON.stringify(f.profil.bio) };
  });
  T("Kachelpfad verändert den Speicher nicht", () => {
    const kacheln = Array.from({ length: 12 }, (_, i) => ({ nr: i + 1, text: "Kachel " + (i + 1), serie: { name: "Testserie" }, captionTeile: { hook: "Satz " + (i + 1) + "." }, ersatz: i === 11 ? { text: "Ersatz", captionTeile: { hook: "Ersatz." } } : null }));
    const m2 = { feed: { kacheln } }; const vor = JSON.stringify(m2);
    const f = hmFeed12(mid, "empfehlung", { ...basis, marke2: m2 });
    return { ok: JSON.stringify(m2) === vor && f.posts.length === 12 && nr(f, 12).ersatz.caption === "Ersatz.", detail: vor === JSON.stringify(m2) ? "unverändert" : "verändert" };
  });
  T("Caption ohne doppelte Sätze, Skizze als Entwurf", () => {
    const x = hmFd2Entdoppeln({ captionTeile: { hook: "Zinshaus, 11 Wochen.", einloesung: "Zinshaus, 11 Wochen. Zeitachse in sechs Kacheln.", beleg: "Zeitachse in sechs Kacheln.", weitergeben: "" }, captionLuecken: ["weitergeben"], captionEntwurf: ["einloesung"], herkunft: [] });
    const t = x.captionTeile;
    const z = hmFd2Entdoppeln({ captionTeile: { hook: "Zinshaus, 11 Wochen. So lief es.", einloesung: "Zeitachse, in eigenen Worten: „Zinshaus, 11 Wochen.“ Ausgangslage, Ergebnis.", beleg: "Zinshaus, 11 Wochen.", weitergeben: "" }, captionLuecken: ["weitergeben"], captionEntwurf: ["einloesung"], herkunft: [] }).captionTeile;
    return { ok: t.einloesung === "Zeitachse in sechs Kacheln." && t.beleg === "" && z.einloesung === "Zeitachse, in eigenen Worten: Ausgangslage, Ergebnis." && z.beleg === "" && nr(fe, 3).captionEntwurf.includes("einloesung"), detail: JSON.stringify(t) + " / " + z.einloesung };
  });
  T("Werktag nach Feiertag und Sonntag", () => {
    const fei = hmFd2Feiertag("2026-10-26");
    return { ok: hmFd2Werktag("2026-10-25") === (fei ? "2026-10-27" : "2026-10-26") && hmFd2Werktag("2026-10-27") === "2026-10-27" && (!fei || hmFd2Werktag("2026-10-26") === "2026-10-27"), detail: hmFd2Werktag("2026-10-25") };
  });
  T("Highlight-Name behält die Serienidee", () => { const a = hmFd2Kurzname("Sievering in Zahlen"); const b2 = hmFd2Kurzname("Geraten"); return { ok: a.name === "In Zahlen" && a.gekuerzt && b2.name === "Geraten" && !b2.gekuerzt, detail: a.name }; });
  return out;
}

Object.assign(window, { hmFeed12, FeedProfil, FeedBeitrag, FeedVergleich, FeedAbschnitt, hmSelbsttestFeed2, HM_FEED2_TAKT });
