/* UNIO Endkunden-Portal, Basis: Objektkatalog, geteilter State (localStorage-Contract
   mit Explore und Objektseite), Seed-Daten und alle Sheet-Bausteine.
   Prozesslogik: docs/ENDKUNDEN_PORTAL_PROZESSLOGIK.md ("Ein Zustand, viele Fenster"). */

/* ---------- Objektkatalog (ids = Explore-POOL) ---------- */
const EK_KATALOG = {
  "beheim":       { t: "Penthouse Beheim",       ort: "1170 Wien · Hernals",      bezirk: "1170", preisNum: 1700000, mieteJahr: 52800, qm: 141, zi: 3, img: "/assets/img/beheim.jpg" },
  "beheim2":      { t: "Beheim · Garten-Maisonette", ort: "1170 Wien · Hernals",  bezirk: "1170", preisNum: 1650000, mieteJahr: 54000, qm: 138, zi: 4, img: "/assets/img/beheim-2.jpg" },
  "albrecht":     { t: "Das Albrecht · Top 12",  ort: "1180 Wien · Währing",      bezirk: "1180", preisNum: 470000,  mieteJahr: 16800, qm: 54,  zi: 2, img: "/assets/img/albrecht.jpg" },
  "albrecht-dg":  { t: "Das Albrecht · Dachgeschoss", ort: "1180 Wien · Währing", bezirk: "1180", preisNum: 1490000, mieteJahr: 49200, qm: 122, zi: 4, img: "/assets/img/albrechts-dachgeschoss.jpg" },
  "ecoluxe":      { t: "Villa Ecoluxe",          ort: "1190 Wien · Grinzing",     bezirk: "1190", preisNum: 2400000, mieteJahr: 66000, qm: 210, zi: 6, img: "/assets/img/ecoluxe.jpg" },
  "obenzwei":     { t: "ObenZwei · Penthouse",   ort: "1020 Wien · Leopoldstadt", bezirk: "1020", preisNum: 2100000, mieteJahr: 63600, qm: 168, zi: 4, img: "/assets/img/obenzwei.jpg" },
  "obenzwei-t":   { t: "ObenZwei · Terrasse",    ort: "1020 Wien · Leopoldstadt", bezirk: "1020", preisNum: 2100000, mieteJahr: 63600, qm: 168, zi: 4, img: "/assets/img/obenzwei-terrasse.jpg" },
  "penthouse":    { t: "Penthouse über den Dächern", ort: "1010 Wien · Innere Stadt", bezirk: "1010", preisNum: 4000000, mieteJahr: 100800, qm: 245, zi: 5, img: "/assets/img/penthouse.jpg" },
  "maxing":       { t: "Maxingstraße 22 · Top 7", ort: "1130 Wien · Hietzing",    bezirk: "1130", preisNum: 980000,  mieteJahr: 33600, qm: 96,  zi: 3, img: "/assets/img/maxingstrasse-zimmer.jpg" },
  "schoenbrunn":  { t: "Schönbrunn-Blick",       ort: "1130 Wien · Hietzing",     bezirk: "1130", preisNum: 890000,  mieteJahr: 31200, qm: 88,  zi: 3, img: "/assets/img/schoenbrunn.jpg" },
  "facade":       { t: "Gründerzeit-Juwel",      ort: "1050 Wien · Margareten",   bezirk: "1050", preisNum: 1100000, mieteJahr: 39600, qm: 118, zi: 4, img: "/assets/img/vienna-facade.jpg" },
};
const ekObj = (id) => EK_KATALOG[id] || { t: id, ort: "Wien", bezirk: "", preisNum: 0, mieteJahr: 0, qm: 0, zi: 0, img: "/assets/img/vienna-street.jpg" };

/* ---------- Geld- und Kennzahl-Helfer ---------- */
const ekEur = (n) => "€ " + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const ekRendite = (o) => o.preisNum && o.mieteJahr ? (o.mieteJahr / o.preisNum * 100).toFixed(1).replace(".", ",") : null;
/* Annuitaet-Naeherung 3,8 % / 30 Jahre; Nebenkosten AT ~10,2 % (GrESt, Eintragung, Vertrag, Provision) */
const EK_NK = [["Grunderwerbsteuer", 0.035], ["Grundbucheintragung", 0.011], ["Vertragserrichtung", 0.02], ["Maklerprovision (3 % + USt)", 0.036]];
const ekRate = (preisNum, kk) => { if (!kk) return null; const rest = preisNum * 1.102 - kk.ek; return rest <= 0 ? 0 : Math.round(rest * 0.00466 / 10) * 10; };
const ekLeistbar = (preisNum, kk) => { const r = ekRate(preisNum, kk); return r !== null && r <= kk.rate; };
const ekBudget = (kk) => Math.round((kk.rate / 0.00466 + kk.ek) / 1.102 / 1000) * 1000;
const ekFristTage = (iso) => Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000));

/* ---------- localStorage-Contract (auch von Explore + Objektseite gelesen) ---------- */
const EK_K = { profil: "unio_ek_profil", bez: "unio_ek_beziehungen", coll: "unio_ek_collections", events: "unio_ek_events", chats: "unio_ek_chats" };
const ekLese = (k, fb) => { try { return JSON.parse(localStorage.getItem(k)) || fb; } catch (e) { return fb; } };
const ekSchreibe = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const EK_STEPS_ABW = ["Kaufvertrag", "Treuhand", "Grundbuch", "Übergabe"];

/* Dokumente je Objekt-Zustand: entsperren sich mit dem Fortschritt, nichts wird doppelt gepflegt */
function ekDokumente(zustand, phase) {
  const basis = [["Bau- und Ausstattungsbeschreibung", "PDF · Stand 06/2026"], ["Energieausweis", "PDF · Klasse A"], ["Grundriss", "PDF · 1:100"]];
  if (["anbot_aktiv", "gegenangebot"].includes(zustand)) return [...basis, ["Kaufanbot", "Version 2 · bindend"]];
  if (["angenommen", "abwicklung"].includes(zustand)) {
    const abw = [["Kaufanbot", "angenommen"], ["Kaufvertragsentwurf", "Dr. Weiss & Partner"]];
    if ((phase || 0) >= 2) abw.push(["Treuhandbestätigung", "Erlag bestätigt"]);
    if ((phase || 0) >= 3) abw.push(["Grundbuchauszug (neu)", "eingetragen"]);
    return [...basis, ...abw];
  }
  if (zustand === "eigentum") return [["Kaufvertrag", "beglaubigt"], ["Übergabeprotokoll", "unterzeichnet"], ["Betriebskosten 2025", "Hausverwaltung"], ["Energieausweis", "PDF · Klasse A"]];
  return basis;
}

function ekSeed() {
  if (localStorage.getItem("unio_ek_seed_v2")) return;
  const inTagen = (n) => new Date(Date.now() + n * 86400000).toISOString();
  ekSchreibe(EK_K.profil, {
    onboarding: false, storyGesehen: false, partner: null,
    kaufkraft: null,
    suchprofile: [
      { id: 1, name: "Dachgeschoss Wien West", aktiv: true, typ: "eigennutzung", frequenz: "sofort", params: ["1140 bis 1180 Wien", "3 bis 4 Zimmer", "90 bis 140 m²", "Terrasse", "bis € 1,8 Mio"], treffer: 14, neu: 3 },
      { id: 2, name: "Anlage bis 500k", aktiv: true, typ: "anlage", frequenz: "taeglich", params: ["1100, 1110, 1210 Wien", "2 bis 3 Zimmer", "Rendite ≥ 3,5 %", "vermietbar", "bis € 500.000"], treffer: 8, neu: 1 },
    ],
    ntypen: { preis: true, partner: true, projekt: true, graetzl: false },
  });
  ekSchreibe(EK_K.bez, {
    "beheim":     { zustand: "gegenangebot", termin: "Besichtigt am 08.08.", anbot: { betrag: 1680000, frist: inTagen(5), gegen: 1720000, verlauf: [{ wer: "du", betrag: 1680000, zeit: "11.08." }, { wer: "verkaeufer", betrag: 1720000, zeit: "16.08." }] } },
    "albrecht":   { zustand: "anbot_aktiv", termin: "Besichtigt am 12.08.", anbot: { betrag: 455000, frist: inTagen(8), gegen: null, verlauf: [{ wer: "du", betrag: 455000, zeit: "14.08." }] } },
    "obenzwei-t": { zustand: "termin", termin: "Mo 18.08. · 14:00" },
    "schoenbrunn":{ zustand: "besichtigt", termin: "Besichtigt am 15.08." },
    "maxing":     { zustand: "eigentum" },
  });
  ekSchreibe(EK_K.coll, [
    { id: "merkliste", name: "Meine Merkliste", objekte: ["penthouse", "ecoluxe", "obenzwei-t", "schoenbrunn"], partner: false, makler: false, kommentare: {} },
    { id: "anlage27", name: "Anlage 2027", objekte: ["albrecht", "facade"], partner: false, makler: false, kommentare: { "albrecht": [{ von: "Du", txt: "Rendite passt, Lage top. Anbot ist draußen.", zeit: "14.08." }] } },
  ]);
  ekSchreibe(EK_K.events, [
    { id: 1, typ: "gegenangebot", objId: "beheim", titel: "Gegenangebot erhalten", sub: "€ 1.720.000 · Frist läuft", zeit: "Heute 09:12", gelesen: false },
    { id: 2, typ: "treffer", objId: "albrecht-dg", titel: "Neuer Treffer", sub: "Dachgeschoss Wien West", zeit: "Heute 07:40", gelesen: false },
    { id: 3, typ: "preis", objId: "ecoluxe", titel: "Preis gesenkt", sub: "€ 2,50 Mio auf € 2,40 Mio (-4 %)", zeit: "Gestern", gelesen: false },
    { id: 4, typ: "termin", objId: "obenzwei-t", titel: "Besichtigung morgen", sub: "Mo 18.08. · 14:00 · Praterstraße", zeit: "Gestern", gelesen: true },
    { id: 5, typ: "feedback", objId: "schoenbrunn", titel: "Wie war die Besichtigung?", sub: "Schönbrunn-Blick · Fr 15.08.", zeit: "15.08.", gelesen: true },
    { id: 6, typ: "projekt", objId: "albrecht", titel: "Baufortschritt Das Albrecht", sub: "2 neue Updates", zeit: "14.08.", gelesen: true },
    { id: 7, typ: "graetzl", objId: "beheim", titel: "Nebenan verkauft", sub: "1170 Hernals · € 890.000 · 102 m²", zeit: "13.08.", gelesen: true },
  ]);
  ekSchreibe(EK_K.chats, {
    "beheim": { name: "Lukas Brandtner", rolle: "Makler · Penthouse Beheim", img: "/assets/team/portrait-02.jpg", antwortzeit: "< 2 h", msgs: [
      { ich: false, txt: "Guten Morgen! Der Verkäufer hat reagiert: Gegenangebot € 1.720.000, gültig bis 22.08.", t: "09:12" },
      { ich: false, txt: "Wenn Sie möchten, gehe ich die Kalkulation gern noch einmal mit Ihnen durch.", t: "09:13" },
      { ich: true, txt: "Danke! Ich schaue es mir heute Abend an.", t: "11:40" },
    ]},
    "albrecht": { name: "Sarah Leitner", rolle: "Maklerin · Das Albrecht", img: "/assets/team/portrait-05.jpg", antwortzeit: "< 3 h", msgs: [
      { ich: false, txt: "Ihr Anbot für Top 12 liegt beim Bauträger. Ich melde mich, sobald es Rückmeldung gibt.", t: "Gestern" },
      { ich: true, txt: "Perfekt, danke für die schnelle Abwicklung!", t: "Gestern" },
    ]},
    "concierge": { name: "UNIO Concierge", rolle: "Finanzierung · Recht · Services", img: "/assets/team/nikita-avatar.jpg", antwortzeit: "< 1 h", msgs: [
      { ich: false, txt: "Willkommen! Ich kümmere mich um Finanzierung, Vertragspartner und alles rund um deinen Kauf. Ein Prozess, ein Ansprechpartner.", t: "12.08." },
    ]},
  });
  localStorage.setItem("unio_ek_seed_v2", "1");
}

function ekLadeAlles() {
  ekSeed();
  return { profil: ekLese(EK_K.profil, {}), bez: ekLese(EK_K.bez, {}), coll: ekLese(EK_K.coll, []), events: ekLese(EK_K.events, []), chats: ekLese(EK_K.chats, {}) };
}
function ekPersist(d) { ekSchreibe(EK_K.profil, d.profil); ekSchreibe(EK_K.bez, d.bez); ekSchreibe(EK_K.coll, d.coll); ekSchreibe(EK_K.events, d.events); ekSchreibe(EK_K.chats, d.chats); }
function ekNeuesEvent(d, typ, objId, titel, sub) {
  d.events.unshift({ id: Date.now(), typ, objId, titel, sub, zeit: "Jetzt", gelesen: false });
}
function ekChatNachricht(d, threadId, ich, txt) {
  if (!d.chats[threadId]) {
    const o = ekObj(threadId);
    d.chats[threadId] = { name: "Lukas Brandtner", rolle: "Makler · " + o.t, img: "/assets/team/portrait-02.jpg", antwortzeit: "< 2 h", msgs: [] };
  }
  d.chats[threadId].msgs.push({ ich, txt, t: "Jetzt" });
}

/* Zustandsabhaengige CTA-Logik (Tabelle 5 der Prozesslogik) */
function ekCta(zustand) {
  switch (zustand) {
    case "termin":       return { primaer: "Termin ansehen", sekundaer: "Anbot legen" };
    case "besichtigt":   return { primaer: "Anbot legen", sekundaer: "Feedback geben" };
    case "anbot_aktiv":  return { primaer: "Anbot ansehen", sekundaer: "Chat" };
    case "gegenangebot": return { primaer: "Auf Gegenangebot reagieren", sekundaer: "Chat" };
    case "angenommen":
    case "abwicklung":   return { primaer: "Kaufreise öffnen", sekundaer: "Chat" };
    case "eigentum":     return { primaer: "Mein Objekt öffnen", sekundaer: null };
    default:             return { primaer: "Besichtigung buchen", sekundaer: "Anbot legen" };
  }
}
const EK_ZUSTAND_LABEL = { gemerkt: "Gemerkt", termin: "Termin fixiert", besichtigt: "Besichtigt", anbot_aktiv: "Anbot in Prüfung", gegenangebot: "Gegenangebot", angenommen: "Angenommen", abwicklung: "In Abwicklung", eigentum: "Dein Eigentum", abgelehnt: "Archiviert" };

/* ---------- CSS ---------- */
const EK_CSS = `
  .ek{min-height:100vh;background:var(--paper);color:var(--ink);font-family:var(--font-display),'Helvetica Neue',sans-serif;}
  .ek *{box-sizing:border-box;}
  .ek-mono{font-family:var(--font-mono),ui-monospace,monospace;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--text-muted);}
  .ek-top{position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;gap:14px;
    padding:14px clamp(16px,4vw,40px);background:color-mix(in srgb,var(--paper) 88%,transparent);backdrop-filter:blur(14px);
    border-bottom:1px solid var(--hairline-dark);}
  .ek-top img{height:15px;display:block;}
  .ek-nav{display:flex;gap:4px;background:#FFFFFF;border-radius:999px;padding:4px;box-shadow:inset 0 0 0 1px var(--hairline-dark);}
  .ek-nav button,.ek-nav a{border:none;cursor:pointer;border-radius:999px;padding:8px 16px;background:transparent;text-decoration:none;
    color:var(--text-muted);font:500 12.5px var(--font-display);font-family:inherit;transition:all .2s var(--ease-unio);white-space:nowrap;position:relative;}
  .ek-nav .on{background:var(--ink);color:#F7F5F1;}
  .ek-dot{position:absolute;top:5px;right:7px;width:6px;height:6px;border-radius:99px;background:var(--signal);}
  .ek-ava{width:34px;height:34px;border-radius:999px;background:var(--signal);color:var(--on-signal);border:none;cursor:pointer;
    display:grid;place-items:center;font:600 11.5px var(--font-display);font-family:inherit;letter-spacing:.02em;flex:0 0 auto;}
  .ek-main{max-width:1080px;margin:0 auto;padding:clamp(20px,4vw,40px) clamp(16px,4vw,40px) 120px;overflow-x:clip;}
  .ek h1{font:500 clamp(26px,4vw,40px)/1.06 var(--font-display);letter-spacing:-.03em;margin:6px 0 4px;}
  .ek h1 i{color:var(--signal);font-style:normal;}
  .ek-sub{font-size:14.5px;color:var(--text-muted);margin:0 0 24px;max-width:540px;line-height:1.6;}
  .ek-card{background:var(--surface-raised);border-radius:18px;box-shadow:inset 0 0 0 1px var(--hairline-dark);padding:20px;}
  .ek-rchip{display:inline-flex;align-items:center;font-family:var(--font-mono),ui-monospace,monospace;font-size:8px;letter-spacing:.11em;
    text-transform:uppercase;color:var(--signal-deep);background:rgba(255,170,9,.13);border:1px solid rgba(255,170,9,.4);border-radius:99px;padding:3px 8px;}
  .ek-pill{display:inline-flex;align-items:center;gap:5px;font-family:var(--font-mono),ui-monospace,monospace;font-size:8px;letter-spacing:.11em;
    text-transform:uppercase;border-radius:99px;padding:4px 9px;border:1px solid var(--hairline-dark);color:var(--text-muted);background:#FFFFFF;}
  .ek-pill.hot{color:var(--signal-deep);border-color:rgba(255,170,9,.4);background:rgba(255,170,9,.13);}
  .ek-pill.ok{color:#2E7D46;border-color:rgba(46,125,70,.3);background:rgba(46,125,70,.09);}
  .ek-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;cursor:pointer;text-decoration:none;
    background:var(--ink);color:#F7F5F1;border-radius:999px;padding:11px 20px;font:500 13.5px var(--font-display);font-family:inherit;transition:transform .2s var(--ease-unio);}
  .ek-btn:hover{transform:translateY(-1px);}
  .ek-btn.ghost{background:#FFFFFF;color:var(--ink);box-shadow:inset 0 0 0 1px var(--hairline-dark);}
  .ek-btn.signal{background:var(--signal);color:#1A1305;}
  .ek-btn.tiny{padding:8px 14px;font-size:12px;}
  .ek-secthead{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin:30px 0 13px;}
  .ek-secthead h2{font:500 19px var(--font-display);letter-spacing:-.02em;margin:0;}
  .ek-back{border:none;background:none;cursor:pointer;font:500 13.5px var(--font-display);font-family:inherit;color:var(--text-muted);padding:0;margin-bottom:14px;display:inline-flex;gap:6px;}
  /* Start */
  .ek-hero{position:relative;display:block;border-radius:22px;overflow:hidden;text-decoration:none;color:#fff;min-height:210px;}
  .ek-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .4s var(--ease-unio);}
  .ek-hero:hover img{transform:scale(1.03);}
  .ek-hero .sc{position:absolute;inset:0;background:linear-gradient(200deg,rgba(11,10,9,.08) 30%,rgba(11,10,9,.72));}
  .ek-hero .in{position:absolute;left:22px;right:22px;bottom:20px;display:flex;align-items:flex-end;justify-content:space-between;gap:14px;flex-wrap:wrap;}
  .ek-hero b{display:block;font:500 clamp(22px,3vw,30px)/1.1 var(--font-display);letter-spacing:-.02em;}
  .ek-hero span.k{font-family:var(--font-mono),ui-monospace,monospace;font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.8);}
  .ek-hero .go{background:#F7F5F1;color:var(--ink);border-radius:999px;padding:11px 20px;font:500 13.5px var(--font-display);white-space:nowrap;}
  .ek-kaufreise{display:flex;align-items:center;gap:14px;width:100%;text-align:left;border:none;cursor:pointer;font-family:inherit;
    background:linear-gradient(120deg,var(--signal),#E8940A);color:#FFFFFF;border-radius:20px;padding:18px 20px;margin-bottom:14px;
    box-shadow:0 14px 32px -14px rgba(232,148,10,.55);}
  .ek-kaufreise img{width:52px;height:52px;border-radius:13px;object-fit:cover;}
  .ek-kaufreise b{display:block;font:500 16px var(--font-display);letter-spacing:-.01em;}
  .ek-kaufreise .s{font-size:12.5px;color:rgba(255,255,255,.85);}
  .ek-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:12px;}
  .ek-stat{background:var(--surface-raised);border-radius:16px;box-shadow:inset 0 0 0 1px var(--hairline-dark);padding:16px 18px;cursor:pointer;border:none;text-align:left;font-family:inherit;color:var(--ink);}
  .ek-stat b{display:block;font:500 26px var(--font-display);letter-spacing:-.02em;color:var(--ink);}
  .ek-stat span{font-size:12.5px;color:var(--text-muted);}
  .ek-match{position:relative;display:block;border-radius:22px;overflow:hidden;text-decoration:none;color:#fff;aspect-ratio:16/9;max-height:340px;width:100%;}
  .ek-match img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .ek-match .sc{position:absolute;inset:0;background:linear-gradient(190deg,rgba(11,10,9,.05) 30%,rgba(11,10,9,.78));}
  .ek-match .mk{position:absolute;top:14px;left:14px;background:var(--signal);color:var(--on-signal);border-radius:99px;padding:5px 11px;
    font-family:var(--font-mono),ui-monospace,monospace;font-size:8px;letter-spacing:.13em;text-transform:uppercase;}
  .ek-match .cap{position:absolute;left:18px;right:18px;bottom:16px;}
  .ek-match .cap b{display:block;font:500 22px/1.15 var(--font-display);letter-spacing:-.02em;}
  .ek-match .cap .why{font-size:12.5px;color:rgba(255,255,255,.85);margin-top:5px;display:block;}
  .ek-grid2{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:12px;}
  .ek-hl{position:relative;display:block;border-radius:18px;overflow:hidden;cursor:pointer;border:none;padding:0;text-align:left;
    aspect-ratio:4/4.6;background:var(--surface-raised);font-family:inherit;text-decoration:none;}
  .ek-hl img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .ek-hl .sc{position:absolute;inset:0;background:linear-gradient(185deg,rgba(11,10,9,.02) 35%,rgba(11,10,9,.74));}
  .ek-hl .neu{position:absolute;top:12px;left:12px;background:var(--signal);color:var(--on-signal);border-radius:99px;padding:4px 9px;
    font-family:var(--font-mono),ui-monospace,monospace;font-size:8px;letter-spacing:.12em;text-transform:uppercase;}
  .ek-hl .cap{position:absolute;left:14px;right:14px;bottom:13px;color:#fff;}
  .ek-hl .cap b{display:block;font:500 16.5px/1.15 var(--font-display);letter-spacing:-.01em;}
  .ek-hl .cap .m{font-family:var(--font-mono),ui-monospace,monospace;font-size:8.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.82);display:block;margin-top:3px;}
  .ek-hl .cap .p{display:flex;align-items:center;gap:8px;margin-top:7px;font:500 14px var(--font-display);flex-wrap:wrap;}
  .ek-hl .cap .ek-rchip{background:rgba(255,170,9,.22);color:#FFC64D;border-color:rgba(255,170,9,.45);}
  .ek-story{display:flex;gap:14px;overflow-x:auto;padding:4px 2px 8px;}
  .ek-story button{border:none;background:none;cursor:pointer;font-family:inherit;display:flex;flex-direction:column;align-items:center;gap:7px;flex:0 0 auto;}
  .ek-story .ring{width:62px;height:62px;border-radius:99px;padding:3px;background:linear-gradient(135deg,var(--signal),#B87400);}
  .ek-story .ring.aus{background:var(--hairline-dark);}
  .ek-story .ring img{width:100%;height:100%;border-radius:99px;object-fit:cover;border:2.5px solid var(--paper);}
  .ek-story span{font:500 10.5px var(--font-display);color:var(--ink);}
  /* Zeilen */
  .ek-row{display:flex;align-items:center;gap:14px;background:var(--surface-raised);border-radius:16px;
    box-shadow:inset 0 0 0 1px var(--hairline-dark);padding:14px 16px;margin-bottom:10px;border:none;width:100%;text-align:left;font-family:inherit;cursor:pointer;text-decoration:none;color:inherit;}
  .ek-row img{width:58px;height:58px;border-radius:12px;object-fit:cover;flex:0 0 auto;}
  .ek-row .mid{flex:1;min-width:0;}
  .ek-row .mid b{display:block;font:500 15px var(--font-display);letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--ink);}
  .ek-row .mid .s{font-size:12.5px;color:var(--text-muted);margin-top:2px;display:block;}
  /* Aktivitaet */
  .ek-seg{display:inline-flex;gap:3px;background:#FFFFFF;border-radius:999px;padding:3px;box-shadow:inset 0 0 0 1px var(--hairline-dark);margin-bottom:16px;}
  .ek-seg button{border:none;cursor:pointer;border-radius:999px;padding:8px 18px;background:transparent;color:var(--text-muted);font:500 12.5px var(--font-display);font-family:inherit;}
  .ek-seg .on{background:var(--ink);color:#F7F5F1;}
  .ek-ev{display:flex;align-items:center;gap:13px;background:var(--surface-raised);border-radius:16px;box-shadow:inset 0 0 0 1px var(--hairline-dark);
    padding:13px 15px;margin-bottom:9px;border:none;width:100%;text-align:left;font-family:inherit;cursor:pointer;color:var(--ink);overflow:hidden;}
  .ek-ev.frisch{box-shadow:inset 0 0 0 1.5px rgba(255,170,9,.5);}
  .ek-ev img{width:48px;height:48px;border-radius:11px;object-fit:cover;}
  .ek-ev .mid{flex:1;min-width:0;}
  .ek-ev .mid b{display:block;font:500 14px var(--font-display);color:var(--ink);}
  .ek-ev .mid span{display:block;font-size:12.5px;color:var(--text-muted);margin-top:2px;}
  .ek-ev .zeit{font-family:var(--font-mono),ui-monospace,monospace;font-size:8px;letter-spacing:.1em;color:var(--text-muted);white-space:nowrap;align-self:flex-start;margin-top:3px;}
  /* Chat */
  .ek-chatwrap{display:grid;grid-template-columns:minmax(0,320px) minmax(0,1fr);gap:14px;min-height:480px;}
  .ek-chatwrap > div{min-width:0;}
  .ek-chli{display:flex;align-items:center;gap:12px;width:100%;border:none;background:var(--surface-raised);border-radius:16px;color:var(--ink);overflow:hidden;
    box-shadow:inset 0 0 0 1px var(--hairline-dark);padding:13px 14px;margin-bottom:9px;cursor:pointer;text-align:left;font-family:inherit;}
  .ek-chli.on{box-shadow:inset 0 0 0 1.5px var(--ink);}
  .ek-chli img{width:44px;height:44px;border-radius:99px;object-fit:cover;}
  .ek-chli .n{flex:1;min-width:0;}
  .ek-chli .n b{display:block;font:500 14.5px var(--font-display);}
  .ek-chli .n span{display:block;font-size:12px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;}
  .ek-conv{display:flex;flex-direction:column;background:var(--surface-raised);border-radius:18px;box-shadow:inset 0 0 0 1px var(--hairline-dark);overflow:hidden;}
  .ek-conv .chead{display:flex;align-items:center;gap:11px;padding:13px 16px;border-bottom:1px solid var(--hairline-dark);}
  .ek-conv .chead img{width:36px;height:36px;border-radius:99px;object-fit:cover;}
  .ek-msgs{flex:1;overflow-y:auto;padding:18px 16px;display:flex;flex-direction:column;gap:9px;max-height:420px;}
  .ek-msg{max-width:78%;border-radius:15px;padding:10px 14px;font-size:13.8px;line-height:1.5;}
  .ek-msg.ich{align-self:flex-end;background:var(--ink);color:#F7F5F1;border-bottom-right-radius:5px;}
  .ek-msg.er{align-self:flex-start;background:#EFEBE3;border-bottom-left-radius:5px;}
  .ek-msg .t{display:block;font-family:var(--font-mono),ui-monospace,monospace;font-size:7.5px;letter-spacing:.1em;opacity:.55;margin-top:5px;text-transform:uppercase;}
  .ek-chips{display:flex;gap:7px;flex-wrap:wrap;padding:0 12px 10px;}
  .ek-chips button{border:1px solid var(--hairline-dark);background:#FFFFFF;border-radius:99px;padding:7px 13px;cursor:pointer;
    font:500 11.5px var(--font-display);font-family:inherit;color:var(--ink);}
  .ek-inp{display:flex;gap:9px;padding:12px;border-top:1px solid var(--hairline-dark);}
  .ek-inp input{flex:1;border:none;background:#EFEBE3;border-radius:999px;padding:11px 17px;font:400 13.5px var(--font-display);font-family:inherit;color:var(--ink);outline:none;min-width:0;}
  /* Profil / Einstellungen */
  .ek-set{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:15px 0;border-bottom:1px solid var(--hairline-dark);}
  .ek-set:last-child{border-bottom:none;}
  .ek-set b{display:block;font:500 14.5px var(--font-display);}
  .ek-set span{display:block;font-size:12.5px;color:var(--text-muted);margin-top:2px;}
  .ek-sheet button,.ek-sheet a{color:var(--ink);}
  .ek-sheet .ek-btn{color:#F7F5F1;}
  .ek-sheet .ek-btn.ghost{color:var(--ink);}
  .ek-sheet .ek-btn.signal{color:#1A1305;}
  .ek-sw{position:relative;width:40px;height:23px;border-radius:99px;border:none;cursor:pointer;background:var(--hairline-dark);transition:background .2s var(--ease-unio);flex:0 0 auto;}
  .ek-sw.on{background:var(--signal);}
  .ek-sw::after{content:"";position:absolute;top:3px;left:3px;width:17px;height:17px;border-radius:99px;background:#fff;transition:transform .2s var(--ease-unio);}
  .ek-sw.on::after{transform:translateX(17px);}
  .ek-input{width:100%;border:none;background:#FFFFFF;box-shadow:inset 0 0 0 1px var(--hairline-dark);border-radius:12px;
    padding:12px 15px;font:400 14px var(--font-display);font-family:inherit;color:var(--ink);outline:none;}
  .ek-sp{background:var(--surface-raised);border-radius:18px;box-shadow:inset 0 0 0 1px var(--hairline-dark);padding:18px 20px;margin-bottom:12px;}
  .ek-sp .head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;}
  .ek-sp .head b{font:500 17px var(--font-display);letter-spacing:-.01em;}
  .ek-sp .params{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px;}
  /* Kaufreise */
  .ek-stepper{display:flex;align-items:flex-start;margin:18px 0 6px;overflow-x:auto;padding-bottom:6px;}
  .ek-stepper .lin{flex:1;min-width:14px;height:1.5px;margin-top:12px;background:var(--hairline-dark);}
  .ek-stepper .lin.an{background:var(--signal);}
  .ek-stepper .st{display:flex;flex-direction:column;align-items:center;gap:6px;flex:none;padding:0 4px;}
  .ek-stepper .st i{width:25px;height:25px;border-radius:99px;display:grid;place-items:center;font:600 10px var(--font-mono),monospace;font-style:normal;
    background:#FFFFFF;color:var(--text-muted);box-shadow:inset 0 0 0 1px var(--hairline-dark);}
  .ek-stepper .st.done i{background:var(--signal);color:#1A1305;box-shadow:none;}
  .ek-stepper .st.now i{background:var(--ink);color:var(--paper);box-shadow:none;}
  .ek-stepper .st span{font-family:var(--font-mono),ui-monospace,monospace;font-size:7.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted);white-space:nowrap;}
  .ek-stepper .st.now span{color:var(--ink);}
  .ek-task{display:flex;align-items:center;justify-content:space-between;gap:12px;background:rgba(255,170,9,.07);border:1px solid rgba(255,170,9,.3);
    border-radius:14px;padding:13px 16px;margin-top:12px;flex-wrap:wrap;}
  .ek-person{display:flex;align-items:center;gap:10px;}
  .ek-person img{width:34px;height:34px;border-radius:99px;object-fit:cover;}
  .ek-person b{display:block;font:500 13.5px var(--font-display);}
  .ek-person span{display:block;font-family:var(--font-mono),ui-monospace,monospace;font-size:7.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted);}
  /* Ring */
  .ek-ring{display:flex;align-items:center;gap:16px;}
  .ek-ring svg{flex:0 0 auto;}
  .ek-ring .li{font-size:13px;color:var(--ink-2,var(--ink));display:flex;gap:8px;align-items:baseline;margin-top:5px;}
  /* Merkliste */
  .ek-collcard{position:relative;display:block;width:100%;text-align:left;border:none;cursor:pointer;font-family:inherit;color:#fff;
    border-radius:18px;overflow:hidden;aspect-ratio:16/9;background:var(--surface-raised);}
  .ek-collcard img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .ek-collcard .sc{position:absolute;inset:0;background:linear-gradient(185deg,rgba(11,10,9,.05) 40%,rgba(11,10,9,.72));}
  .ek-collcard .cap{position:absolute;left:16px;right:16px;bottom:13px;color:#fff;}
  .ek-collcard .cap b{display:block;font:500 18px var(--font-display);letter-spacing:-.01em;}
  .ek-collcard .cap span{font-family:var(--font-mono),ui-monospace,monospace;font-size:8.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.8);}
  .ek-collgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;}
  .ek-objcard{position:relative;border-radius:16px;overflow:hidden;background:var(--surface-raised);box-shadow:inset 0 0 0 1px var(--hairline-dark);}
  .ek-objcard.sel{box-shadow:inset 0 0 0 2px var(--signal);}
  .ek-objcard a.bild{display:block;position:relative;aspect-ratio:4/3;}
  .ek-objcard a.bild img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .ek-objcard .info{padding:12px 14px;}
  .ek-objcard .info b{display:block;font:500 14.5px var(--font-display);letter-spacing:-.01em;}
  .ek-objcard .info .m{font-size:12px;color:var(--text-muted);display:block;margin-top:2px;}
  .ek-objcard .acts{display:flex;align-items:center;gap:8px;padding:0 14px 12px;}
  .ek-objcard .acts button{border:1px solid var(--hairline-dark);background:#FFFFFF;border-radius:99px;padding:6px 11px;cursor:pointer;
    font:500 11px var(--font-display);font-family:inherit;color:var(--ink);}
  .ek-objcard .von{position:absolute;top:10px;left:10px;background:rgba(11,10,9,.7);color:#fff;border-radius:99px;padding:4px 9px;
    font-family:var(--font-mono),ui-monospace,monospace;font-size:7.5px;letter-spacing:.12em;text-transform:uppercase;backdrop-filter:blur(6px);}
  /* Sheets */
  .ek-sheetwrap{position:fixed;inset:0;z-index:120;pointer-events:none;}
  .ek-sheetwrap.open{pointer-events:auto;}
  .ek-sheetwrap .back{position:absolute;inset:0;background:rgba(11,10,9,.45);opacity:0;transition:opacity .3s var(--ease-unio);}
  .ek-sheetwrap.open .back{opacity:1;}
  .ek-sheet{position:absolute;left:50%;bottom:0;transform:translate(-50%,105%);width:min(560px,100vw);max-height:88vh;overflow-y:auto;
    background:var(--paper);border-radius:22px 22px 0 0;padding:14px 22px calc(24px + env(safe-area-inset-bottom));
    transition:transform .35s cubic-bezier(0.32,0.72,0,1);}
  .ek-sheetwrap.open .ek-sheet{transform:translate(-50%,0);}
  .ek-sheet .griff{width:38px;height:4px;border-radius:99px;background:var(--hairline-dark);margin:0 auto 14px;}
  .ek-sheet h3{font:500 21px var(--font-display);letter-spacing:-.02em;margin:0 0 4px;}
  .ek-sheet .sub{font-size:13.5px;color:var(--text-muted);line-height:1.55;margin:0 0 16px;}
  .ek-slots{display:grid;gap:9px;}
  .ek-slots button{display:flex;justify-content:space-between;align-items:center;border:1px solid var(--hairline-dark);background:#FFFFFF;
    border-radius:14px;padding:14px 17px;cursor:pointer;font:500 14px var(--font-display);font-family:inherit;color:var(--ink);}
  .ek-slots button:hover{border-color:var(--ink);}
  .ek-slots .frei{font-family:var(--font-mono),ui-monospace,monospace;font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:#2E7D46;}
  .ek-quizopts{display:flex;flex-wrap:wrap;gap:8px;}
  .ek-quizopts button{border:1px solid var(--hairline-dark);background:#FFFFFF;border-radius:99px;padding:10px 16px;cursor:pointer;
    font:500 13px var(--font-display);font-family:inherit;color:var(--ink);}
  .ek-quizopts button.on{background:var(--ink);color:#F7F5F1;border-color:var(--ink);}
  .ek-bildpaar{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .ek-bildpaar button{position:relative;border:none;cursor:pointer;border-radius:16px;overflow:hidden;aspect-ratio:4/3;padding:0;font-family:inherit;}
  .ek-bildpaar img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .ek-bildpaar span{position:absolute;left:10px;bottom:10px;color:#fff;font:500 14px var(--font-display);text-shadow:0 1px 8px rgba(0,0,0,.5);}
  .ek-bildpaar button.on{outline:3px solid var(--signal);outline-offset:-3px;}
  .ek-prog{height:3px;border-radius:99px;background:var(--hairline-dark);margin-bottom:18px;overflow:hidden;}
  .ek-prog i{display:block;height:100%;background:var(--signal);transition:width .3s var(--ease-unio);}
  .ek-vgl{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .ek-vgl img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:13px;}
  .ek-vgl .z{display:flex;justify-content:space-between;font-size:13px;padding:7px 0;border-bottom:1px solid var(--hairline-dark);}
  .ek-vgl .z b{font-weight:500;}
  .ek-doc{background:#FFFFFF;border-radius:14px;box-shadow:inset 0 0 0 1px var(--hairline-dark);padding:26px 22px;margin-bottom:14px;}
  .ek-doc .kopfzeile{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid var(--ink);padding-bottom:12px;margin-bottom:14px;}
  .ek-doc .zeile{display:flex;justify-content:space-between;font-size:12.5px;padding:6px 0;border-bottom:1px dashed var(--hairline-dark);color:var(--ink-2,var(--ink));}
  /* Story-Viewer */
  .ek-storyview{position:fixed;inset:0;z-index:140;background:#0B0A09;display:flex;flex-direction:column;}
  .ek-storyview .bars{display:flex;gap:5px;padding:14px 14px 0;}
  .ek-storyview .bars i{flex:1;height:2.5px;border-radius:99px;background:rgba(255,255,255,.25);}
  .ek-storyview .bars i.an{background:#F7F5F1;}
  .ek-storyview .bild{flex:1;position:relative;}
  .ek-storyview .bild img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.92;}
  .ek-storyview .cap{position:absolute;left:20px;right:20px;bottom:28px;color:#fff;z-index:2;}
  .ek-storyview .cap b{display:block;font:500 22px/1.2 var(--font-display);letter-spacing:-.02em;}
  .ek-storyview .cap span{font-size:13.5px;color:rgba(255,255,255,.8);}
  .ek-storyview .sc{position:absolute;inset:0;background:linear-gradient(185deg,rgba(11,10,9,.3),transparent 30%,transparent 60%,rgba(11,10,9,.6));}
  .ek-storyview .x{position:absolute;top:26px;right:16px;z-index:3;width:36px;height:36px;border-radius:99px;border:none;cursor:pointer;
    background:rgba(255,255,255,.15);color:#fff;font-size:16px;backdrop-filter:blur(8px);}
  /* Explore nativ eingebettet */
  .ek-explframe{position:fixed;left:0;right:0;top:63px;bottom:0;z-index:30;background:#0B0A09;}
  .ek-explframe iframe{display:block;width:100%;height:100%;border:none;}
  /* Bottom-Tabs mobil */
  .ek-tabbar{display:none;}
  @media (max-width:860px){
    .ek-nav{display:none;}
    .ek-grid2{grid-template-columns:repeat(2,minmax(0,1fr));}
    .ek-hl.dritte{display:none;}
    .ek-collgrid{grid-template-columns:minmax(0,1fr);}
    .ek-chatwrap{grid-template-columns:minmax(0,1fr);min-height:0;}
    .ek-conv{position:fixed;inset:0;z-index:60;border-radius:0;}
    .ek-conv .ek-msgs{max-height:none;}
    .ek-tabbar{position:fixed;left:0;right:0;bottom:0;z-index:50;display:flex;justify-content:space-around;
      padding:8px max(10px,env(safe-area-inset-left)) max(12px,env(safe-area-inset-bottom));
      background:color-mix(in srgb,var(--paper) 90%,transparent);backdrop-filter:blur(16px);border-top:1px solid var(--hairline-dark);}
    .ek-tabbar button,.ek-tabbar a{display:flex;flex-direction:column;align-items:center;gap:4px;border:none;background:transparent;cursor:pointer;
      color:var(--text-muted);font:500 9.5px var(--font-display);font-family:inherit;padding:5px 9px;border-radius:12px;position:relative;text-decoration:none;}
    .ek-tabbar .on{color:var(--ink);}
    .ek-tabbar .on svg{color:var(--signal-deep);}
    .ek-main{padding-bottom:110px;}
    .ek-explframe{top:62px;bottom:calc(64px + env(safe-area-inset-bottom));}
    .ek-stats{gap:8px;}
    .ek-stat{padding:13px 14px;}
    .ek-stat b{font-size:21px;}
  }
`;

/* ---------- Icons ---------- */
function EkI({ d, s = 17 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}
const EK_ICONS = {
  start: ["M3 10.5 12 3l9 7.5", "M5 9.5V21h14V9.5", "M10 21v-6h4v6"],
  explore: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "m15.5 8.5-2 5-5 2 2-5z"],
  merk: ["M12 21s-7.5-4.6-9.8-9A5.6 5.6 0 0 1 12 6.3 5.6 5.6 0 0 1 21.8 12c-2.3 4.4-9.8 9-9.8 9z"],
  akt: ["M21 12a8 8 0 0 1-8 8H4l1.6-3.2A8 8 0 1 1 21 12z"],
  profil: ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M4 21v-1a7 7 0 0 1 14 0v1"],
  doks: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6"],
};

/* ---------- Generisches Bottom-Sheet ---------- */
function EkSheet({ offen, onClose, children, breit }) {
  React.useEffect(() => {
    if (!offen) return;
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", esc);
    document.documentElement.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); document.documentElement.style.overflow = ""; };
  }, [offen]);
  return (
    <div className={"ek-sheetwrap" + (offen ? " open" : "")} aria-hidden={!offen}>
      <div className="back" onClick={onClose}></div>
      <div className="ek-sheet" role="dialog" aria-modal="true" style={breit ? { width: "min(720px,100vw)" } : null}>
        <div className="griff"></div>
        {offen ? children : null}
      </div>
    </div>
  );
}

/* ---------- Slot-Picker (ein Baustein für alle Termine) ---------- */
function EkSlotPicker({ titel, sub, slots, onWahl, onAnders }) {
  return (
    <React.Fragment>
      <h3>{titel}</h3>
      <p className="sub">{sub || "Drei bestätigbare Slots. Du wählst, der Rest läuft automatisch."}</p>
      <div className="ek-slots">
        {slots.map((s) => (
          <button key={s} onClick={() => onWahl(s)}>{s}<span className="frei">Sofort fixierbar</span></button>
        ))}
      </div>
      <button className="ek-btn ghost" style={{ width: "100%", marginTop: 12 }} onClick={onAnders}>Anderen Termin im Chat vereinbaren</button>
    </React.Fragment>
  );
}
const EK_SLOTS_STD = ["Di 19.08. · 09:00", "Mi 20.08. · 14:00", "Fr 22.08. · 10:30"];

/* ---------- Anbot-Sheet ---------- */
function EkAnbotSheet({ objId, vorschlag, ek, onSenden }) {
  const o = ekObj(objId);
  const [betrag, setBetrag] = React.useState(vorschlag || o.preisNum);
  const presets = [o.preisNum, Math.round(o.preisNum * 0.97 / 1000) * 1000, Math.round(o.preisNum * 0.95 / 1000) * 1000];
  const kk = ek.profil.kaufkraft;
  const abw = ((betrag / o.preisNum - 1) * 100).toFixed(1).replace(".", ",").replace("-", "minus ");
  return (
    <React.Fragment>
      <h3>Anbot legen<i style={{ color: "var(--signal)", fontStyle: "normal" }}>.</i></h3>
      <p className="sub">{o.t} · Kaufpreis {ekEur(o.preisNum)}. Dein Anbot ist nach Übermittlung <b>10 Tage rechtlich bindend</b>.</p>
      <input className="ek-input" style={{ font: "500 24px var(--font-display)", padding: "16px 18px" }} value={ekEur(betrag)}
        onChange={(e) => { const v = parseInt(e.target.value.replace(/\D/g, ""), 10); setBetrag(isNaN(v) ? 0 : v); }} inputMode="numeric" aria-label="Anbotssumme" />
      <div style={{ display: "flex", gap: 8, margin: "10px 0 4px", flexWrap: "wrap" }}>
        {presets.map((p, i) => (
          <button key={p} className={"ek-btn tiny " + (betrag === p ? "" : "ghost")} onClick={() => setBetrag(p)}>{i === 0 ? "Kaufpreis" : ekEur(p)}</button>
        ))}
      </div>
      <p className="ek-mono" style={{ margin: "8px 0 0" }}>Abweichung {betrag >= o.preisNum ? "+" : ""}{abw} % · 2 weitere Interessenten aktiv (UNIO-Daten)</p>
      {kk && <p className="ek-mono" style={{ margin: "6px 0 0", color: ekLeistbar(o.preisNum, kk) ? "#2E7D46" : "#B84A00" }}>
        {ekLeistbar(o.preisNum, kk) ? (kk.status === "verifiziert" ? "In deinem verifizierten Rahmen" : "In deinem Rahmen (Selbstangabe)") : "Über deinem Finanzierungsrahmen"} · Rate ≈ {ekEur(ekRate(o.preisNum, kk))}/Monat</p>}
      <button className="ek-btn signal" style={{ width: "100%", marginTop: 16, padding: "15px 20px" }} onClick={() => onSenden(betrag)}>Anbot verbindlich übermitteln</button>
      <p className="ek-mono" style={{ textAlign: "center", marginTop: 10 }}>Demo · Anbot und Fristen Arbeitsstand, keine Rechtsberatung</p>
    </React.Fragment>
  );
}

/* ---------- Reaktions-Sheet Gegenangebot: genau 3 Wege ---------- */
function EkReaktionSheet({ objId, ek, onAnnehmen, onNeuesAnbot, onAblehnen }) {
  const o = ekObj(objId); const b = ek.bez[objId];
  const tage = ekFristTage(b.anbot.frist);
  return (
    <React.Fragment>
      <h3>Gegenangebot: {ekEur(b.anbot.gegen)}</h3>
      <p className="sub">{o.t} · Dein Anbot war {ekEur(b.anbot.betrag)}. Das Gegenangebot ist noch <b>{tage} {tage === 1 ? "Tag" : "Tage"}</b> gültig (echte Bindungsfrist).</p>
      <div style={{ display: "grid", gap: 9 }}>
        <button className="ek-btn signal" style={{ padding: "15px 20px" }} onClick={onAnnehmen}>Annehmen · {ekEur(b.anbot.gegen)}</button>
        <button className="ek-btn ghost" style={{ padding: "15px 20px" }} onClick={onNeuesAnbot}>Neues Anbot legen (Vorschlag: {ekEur(Math.round((b.anbot.betrag + b.anbot.gegen) / 2 / 1000) * 1000)})</button>
        <button className="ek-btn ghost" style={{ padding: "15px 20px", color: "var(--text-muted)" }} onClick={onAblehnen}>Ablehnen und Suche fortsetzen</button>
      </div>
      <p className="ek-mono" style={{ textAlign: "center", marginTop: 12 }}>Bei Annahme startet automatisch die Abwicklung: Vertrag, Treuhand, Grundbuch</p>
    </React.Fragment>
  );
}

/* ---------- Kaufkraft-Sheet ---------- */
function EkKaufkraftSheet({ ek, onSpeichern, onPruefen }) {
  const kk = ek.profil.kaufkraft || {};
  const [eigen, setEigen] = React.useState(kk.ek || 300000);
  const [netto, setNetto] = React.useState(kk.netto || 7500);
  const [rate, setRate] = React.useState(kk.rate || 2600);
  const budget = ekBudget({ ek: eigen, rate });
  const feld = (label, v, set, schritt) => (
    <div>
      <span className="ek-mono">{label}</span>
      <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
        <button className="ek-btn ghost tiny" onClick={() => set(Math.max(0, v - schritt))}>-</button>
        <input className="ek-input" style={{ textAlign: "center", fontWeight: 500 }} value={ekEur(v)} readOnly />
        <button className="ek-btn ghost tiny" onClick={() => set(v + schritt)}>+</button>
      </div>
    </div>
  );
  return (
    <React.Fragment>
      <h3>Deine Kaufkraft<i style={{ color: "var(--signal)", fontStyle: "normal" }}>.</i></h3>
      <p className="sub">Damit zeigen wir dir nur Leistbares, inklusive Nebenkosten (~10 %). Bleibt auf deinem Gerät, bis du prüfen lässt.</p>
      <div style={{ display: "grid", gap: 14 }}>
        {feld("Eigenkapital", eigen, setEigen, 25000)}
        {feld("Haushaltsnetto / Monat", netto, setNetto, 250)}
        {feld("Wunschrate / Monat", rate, setRate, 100)}
      </div>
      <div className="ek-card" style={{ marginTop: 16, textAlign: "center", background: "#FFFFFF" }}>
        <span className="ek-mono">Dein Budget (Demo-Rechnung, 3,8 % / 30 J.)</span>
        <b style={{ display: "block", font: "500 30px var(--font-display)", letterSpacing: "-.02em", marginTop: 4 }}>bis {ekEur(budget)}</b>
      </div>
      <div style={{ display: "flex", gap: 9, marginTop: 14 }}>
        <button className="ek-btn" style={{ flex: 1 }} onClick={() => onSpeichern({ ek: eigen, netto, rate, budget, status: "selbst" })}>Speichern</button>
        <button className="ek-btn ghost" style={{ flex: 1 }} onClick={() => onPruefen({ ek: eigen, netto, rate, budget, status: "pruefung" })}>Kostenlos prüfen lassen</button>
      </div>
    </React.Fragment>
  );
}

/* ---------- Onboarding- und Suchprofil-Quiz (5 Screens) ---------- */
function EkQuizSheet({ profil, onFertig, onSkip }) {
  const [schritt, setSchritt] = React.useState(0);
  const [bez, setBez] = React.useState(profil ? [] : ["1170", "1180"]);
  const [budget, setBudget] = React.useState(1500000);
  const [zi, setZi] = React.useState("3 bis 4");
  const [typ, setTyp] = React.useState("eigennutzung");
  const [stil, setStil] = React.useState(null);
  const BEZIRKE = ["1010", "1020", "1050", "1130", "1140", "1170", "1180", "1190"];
  const weiter = () => schritt < 4 ? setSchritt(schritt + 1) : onFertig({ bez, budget, zi, typ, stil });
  const frage = [
    { t: "Wo suchst du?", sub: "Tippe deine Bezirke an, mehrere möglich.", body: (
      <div className="ek-quizopts">{BEZIRKE.map((b) => (
        <button key={b} className={bez.includes(b) ? "on" : ""} onClick={() => setBez(bez.includes(b) ? bez.filter((x) => x !== b) : [...bez, b])}>{b}</button>
      ))}</div>) },
    { t: "Dein Budget?", sub: "Grob reicht, du kannst es jederzeit ändern.", body: (
      <div>
        <b style={{ font: "500 30px var(--font-display)", letterSpacing: "-.02em", display: "block", textAlign: "center", marginBottom: 12 }}>{ekEur(budget)}</b>
        <input type="range" min="300000" max="4000000" step="50000" value={budget} onChange={(e) => setBudget(parseInt(e.target.value, 10))} style={{ width: "100%", accentColor: "var(--signal)" }} />
      </div>) },
    { t: "Wie groß?", sub: "Zimmeranzahl, ungefähr.", body: (
      <div className="ek-quizopts">{["1 bis 2", "2 bis 3", "3 bis 4", "4+"].map((z) => (
        <button key={z} className={zi === z ? "on" : ""} onClick={() => setZi(z)}>{z} Zimmer</button>
      ))}</div>) },
    { t: "Wohnen oder anlegen?", sub: "Danach richten sich Kennzahlen und Feed.", body: (
      <div className="ek-quizopts">
        <button className={typ === "eigennutzung" ? "on" : ""} onClick={() => setTyp("eigennutzung")}>Selbst wohnen</button>
        <button className={typ === "anlage" ? "on" : ""} onClick={() => setTyp("anlage")}>Anlegen (Rendite zählt)</button>
      </div>) },
    { t: "Was spricht dich an?", sub: "Ein Tippen genügt.", body: (
      <div className="ek-bildpaar">
        <button className={stil === "altbau" ? "on" : ""} onClick={() => setStil("altbau")}><img src="/assets/img/vienna-facade.jpg" alt="" /><span>Altbau</span></button>
        <button className={stil === "neubau" ? "on" : ""} onClick={() => setStil("neubau")}><img src="/assets/img/albrecht.jpg" alt="" /><span>Neubau</span></button>
      </div>) },
  ][schritt];
  return (
    <React.Fragment>
      <div className="ek-prog"><i style={{ width: ((schritt + 1) / 5 * 100) + "%" }}></i></div>
      <h3>{frage.t}</h3>
      <p className="sub">{frage.sub}</p>
      {frage.body}
      <div style={{ display: "flex", gap: 9, marginTop: 18 }}>
        <button className="ek-btn signal" style={{ flex: 1, padding: "14px 20px" }} onClick={weiter}>{schritt === 4 ? "Fertig, zeig mir Objekte" : "Weiter"}</button>
        <button className="ek-btn ghost" onClick={onSkip}>Überspringen</button>
      </div>
    </React.Fragment>
  );
}

/* ---------- Dokument-Viewer ---------- */
function EkDokumentSheet({ name, objId, unter }) {
  const o = ekObj(objId);
  return (
    <React.Fragment>
      <h3>{name}</h3>
      <p className="sub">{o.t} · {unter || "PDF · aktuelle Version"}</p>
      <div className="ek-doc">
        <div className="kopfzeile">
          <b style={{ font: "500 16px var(--font-display)" }}>{name}</b>
          <span className="ek-mono">UNIO · {o.ort}</span>
        </div>
        {[["Objekt", o.t], ["Adresse", o.ort], ["Wohnfläche", o.qm + " m²"], ["Zimmer", String(o.zi)], ["Kaufpreis", ekEur(o.preisNum)], ["Stand", "08/2026"]].map(([k, v]) => (
          <div key={k} className="zeile"><span>{k}</span><b>{v}</b></div>
        ))}
        <p className="ek-mono" style={{ marginTop: 14 }}>Demo-Vorschau · Vollversion im Datenraum</p>
      </div>
      <div style={{ display: "flex", gap: 9 }}>
        <button className="ek-btn" style={{ flex: 1 }}>Herunterladen</button>
        <button className="ek-btn ghost" style={{ flex: 1 }}>Teilen</button>
      </div>
    </React.Fragment>
  );
}

/* ---------- Grätzl-Preisarchiv ---------- */
function EkPreisarchivSheet({ bezirk }) {
  const DATEN = {
    "1170": { schnitt: "€ 6.900", zeilen: [["Rötzergasse", "102 m²", "€ 890.000", "07/2026"], ["Hernalser Hauptstraße", "76 m²", "€ 512.000", "06/2026"], ["Beheimgasse", "134 m²", "€ 1.180.000", "05/2026"], ["Kalvarienberggasse", "88 m²", "€ 604.000", "04/2026"], ["Wattgasse", "64 m²", "€ 398.000", "03/2026"]] },
    "std":  { schnitt: "€ 7.400", zeilen: [["Musterg. (anonymisiert)", "95 m²", "€ 720.000", "07/2026"], ["Musterg. (anonymisiert)", "81 m²", "€ 615.000", "06/2026"], ["Musterg. (anonymisiert)", "120 m²", "€ 990.000", "05/2026"]] },
  };
  const d = DATEN[bezirk] || DATEN["std"];
  return (
    <React.Fragment>
      <h3>Verkauft im Grätzl: {bezirk || "Wien"}</h3>
      <p className="sub">Echte finale Kaufpreise aus Grundbuchdaten (Demo, Quelle IMMOunited). Durchschnitt: <b>{d.schnitt}/m²</b>, letzte 12 Monate.</p>
      <div className="ek-card" style={{ background: "#FFFFFF", padding: "6px 18px" }}>
        {d.zeilen.map(([s, qm, p, dat]) => (
          <div key={s + dat} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "12px 0", borderBottom: "1px solid var(--hairline-dark)", fontSize: 13.5 }}>
            <span style={{ flex: 1 }}>{s}</span><span className="ek-mono">{qm}</span><b style={{ fontWeight: 500 }}>{p}</b><span className="ek-mono">{dat}</span>
          </div>
        ))}
        <p className="ek-mono" style={{ padding: "12px 0" }}>Straßen gekürzt · volle Daten für UNIO-Kunden</p>
      </div>
    </React.Fragment>
  );
}

/* ---------- Vergleichs-Sheet ---------- */
function EkVergleichSheet({ ids, ek }) {
  const [a, b] = ids.map(ekObj);
  const kk = ek.profil.kaufkraft;
  const zeilen = [
    ["Kaufpreis", ekEur(a.preisNum), ekEur(b.preisNum)],
    ["Wohnfläche", a.qm + " m²", b.qm + " m²"],
    ["Preis / m²", ekEur(a.preisNum / a.qm), ekEur(b.preisNum / b.qm)],
    ["Zimmer", String(a.zi), String(b.zi)],
    ["Rendite", ekRendite(a) + " %", ekRendite(b) + " %"],
  ];
  if (kk) zeilen.push(["Rate / Monat", "≈ " + ekEur(ekRate(a.preisNum, kk)), "≈ " + ekEur(ekRate(b.preisNum, kk))]);
  return (
    <React.Fragment>
      <h3>Vergleich</h3>
      <p className="sub">{a.t} und {b.t}, Seite an Seite.</p>
      <div className="ek-vgl">
        <div><img src={a.img} alt="" /><b style={{ font: "500 14px var(--font-display)", display: "block", marginTop: 8 }}>{a.t}</b></div>
        <div><img src={b.img} alt="" /><b style={{ font: "500 14px var(--font-display)", display: "block", marginTop: 8 }}>{b.t}</b></div>
      </div>
      <div style={{ marginTop: 12 }}>
        {zeilen.map(([k, va, vb]) => (
          <div key={k} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 10, padding: "9px 0", borderBottom: "1px solid var(--hairline-dark)", fontSize: 13.5, alignItems: "baseline" }}>
            <b style={{ fontWeight: 500 }}>{va}</b><span className="ek-mono" style={{ textAlign: "center" }}>{k}</span><b style={{ fontWeight: 500, textAlign: "right" }}>{vb}</b>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

/* ---------- Story-Viewer (nur echte, datierte Projekt-Updates) ---------- */
const EK_STORIES = [
  { img: "/assets/img/albrechts-hof.jpg", t: "Innenhof fertig begrünt", s: "Das Albrecht · Update vom 14.08.2026" },
  { img: "/assets/img/albrechts-fassade.jpg", t: "Fassade zu 90 % abgeschlossen", s: "Das Albrecht · Update vom 12.08.2026" },
];
function EkStoryViewer({ onEnde }) {
  const [i, setI] = React.useState(0);
  const s = EK_STORIES[i];
  const weiter = () => i < EK_STORIES.length - 1 ? setI(i + 1) : onEnde();
  return (
    <div className="ek-storyview" onClick={weiter}>
      <div className="bild">
        <img src={s.img} alt="" />
        <span className="sc" aria-hidden="true"></span>
        <div className="bars" style={{ position: "absolute", left: 0, right: 0, top: 0, zIndex: 2 }}>
          {EK_STORIES.map((_, j) => <i key={j} className={j <= i ? "an" : ""}></i>)}
        </div>
        <button className="x" onClick={(e) => { e.stopPropagation(); onEnde(); }} aria-label="Schließen">✕</button>
        <div className="cap"><b>{s.t}</b><span>{s.s}</span></div>
      </div>
    </div>
  );
}

Object.assign(window, {
  EK_KATALOG, ekObj, ekEur, ekRendite, ekRate, ekLeistbar, ekBudget, ekFristTage, EK_NK,
  EK_K, ekLese, ekSchreibe, ekSeed, ekLadeAlles, ekPersist, ekNeuesEvent, ekChatNachricht,
  ekCta, EK_ZUSTAND_LABEL, EK_STEPS_ABW, ekDokumente, EK_CSS, EkI, EK_ICONS,
  EkSheet, EkSlotPicker, EK_SLOTS_STD, EkAnbotSheet, EkReaktionSheet, EkKaufkraftSheet,
  EkQuizSheet, EkDokumentSheet, EkPreisarchivSheet, EkVergleichSheet, EkStoryViewer,
});
