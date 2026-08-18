/* UNIO Makler-Dashboard, Basis: geteilter State (liest die Endkunden-State-Machine!),
   Kontakte-Datenmodell, Heute-Triage, UI-Bausteine (Slide-Over, Command-K, Cheatsheet).
   Prozesslogik: docs/MAKLER_DASHBOARD_PROZESSLOGIK.md ("Ein Zustand, zwei Perspektiven"). */

/* ---------- State-Contract ---------- */
const MK_K = { kontakte: "unio_mk_kontakte", deals: "unio_mk_deals", heute: "unio_mk_heute", ziele: "unio_mk_ziele" };
const mkLese = (k, fb) => { try { return JSON.parse(localStorage.getItem(k)) || fb; } catch (e) { return fb; } };
const mkSchreibe = (k, v) => localStorage.setItem(k, JSON.stringify(v));

function mkSeed() {
  if (localStorage.getItem("unio_mk_seed_v1")) return;
  const vorMin = (n) => Date.now() - n * 60000;
  mkSchreibe(MK_K.kontakte, [
    { id: "valentina", name: "Valentina Hofer", initials: "VH", typ: "kaeufer", phase: "Verhandlung", tel: "+43 664 210 44 87", mail: "valentina.hofer@gmail.com", seit: "02/2025", letzter: "Heute 09:13", kaufkraft: "verifiziert", budget: 1051000, sequenz: null, neuSeit: null, ekVerknuepft: true,
      notiz: "Sucht Dachgeschoss Wien West, Partner Jonas entscheidet mit." },
    { id: "berger", name: "Familie Berger", initials: "FB", typ: "kaeufer", phase: "Neu", tel: "+43 699 114 22 60", mail: "familie.berger@gmx.at", seit: "Heute", letzter: "Noch kein Kontakt", kaufkraft: null, budget: null, sequenz: null, neuSeit: vorMin(2), quelle: "unio.at · Anfrage Gründerzeit-Juwel",
      notiz: "" },
    { id: "maier", name: "Dr. Anna Maier", initials: "AM", typ: "eigentuemer", phase: "Bewertung", tel: "+43 1 402 88 71", mail: "a.maier@chello.at", seit: "08/2026", letzter: "Vor 2 Tagen", kaufkraft: null, budget: null, sequenz: { name: "Eigentümer-Farming", tag: 4, gesamt: 21 }, neuSeit: null, objektHint: "Zinshaus Rötzergasse, 1170",
      notiz: "Erbschaft, überlegt Verkauf im Herbst. Bewertung zugesagt." },
    { id: "schuster", name: "Herbert Schuster", initials: "HS", typ: "eigentuemer", phase: "Alleinvermittlung", tel: "+43 676 550 12 09", mail: "h.schuster@aon.at", seit: "06/2026", letzter: "Gestern", kaufkraft: null, budget: null, sequenz: null, neuSeit: null, objektHint: "Schönbrunn-Blick, 1130",
      notiz: "Auftrag unterschrieben, will wöchentlichen Bericht." },
    { id: "klein", name: "Mario Klein", initials: "MK", typ: "kaeufer", phase: "Heiß", tel: "+43 660 771 45 30", mail: "mario.klein@icloud.com", seit: "07/2026", letzter: "Vor 8 Tagen", kaufkraft: "selbst", budget: 1650000, sequenz: { name: "Neukäufer-Nurture", tag: 9, gesamt: 21 }, neuSeit: null,
      notiz: "Will Beheim-Maisonette sehen, wartet auf Rückruf." },
    { id: "brandl", name: "Sophie Brandl", initials: "SB", typ: "kaeufer", phase: "Qualifizierung", tel: "+43 664 909 33 18", mail: "sophie.brandl@gmail.com", seit: "Vor 3 Tagen", letzter: "Vor 3 Tagen", kaufkraft: null, budget: null, sequenz: { name: "Neukäufer-Nurture", tag: 2, gesamt: 21 }, neuSeit: null, quelle: "CIRCLE · Empfehlung L. Brandtner",
      notiz: "" },
  ]);
  mkSchreibe(MK_K.deals, {
    akquise: [
      { id: "ak1", kontaktId: "maier", objekt: "Zinshaus Rötzergasse, 1170", phase: 1, wert: 1180000, naechste: "Bewertung präsentieren · Do 21.08.", faul: false },
      { id: "ak2", kontaktId: "schuster", objekt: "Schönbrunn-Blick, 1130", phase: 2, wert: 890000, naechste: "Fotos beauftragen", faul: false },
      { id: "ak3", kontaktId: null, name: "Fam. Leitgeb", objekt: "Reihenhaus Mauer, 1230", phase: 0, wert: 740000, naechste: null, faul: true },
    ],
    statisch: [
      { id: "st1", kontaktId: "klein", objId: "beheim2", zustand: "gemerkt" },
      { id: "st2", kontaktId: "berger", objId: "facade", zustand: "gemerkt" },
    ],
  });
  mkSchreibe(MK_K.heute, { done: [], snoozed: {}, chatBeantwortet: [] });
  mkSchreibe(MK_K.ziele, { jahresziel: 180000, erreicht: 96500, wocheSoll: { kontakte: 8, besichtigungen: 3, anbote: 1 }, wocheIst: { kontakte: 5, besichtigungen: 2, anbote: 1 } });
  localStorage.setItem("unio_mk_seed_v1", "1");
}

function mkLadeAlles() {
  mkSeed();
  if (window.ekSeed) window.ekSeed();
  return {
    kontakte: mkLese(MK_K.kontakte, []),
    deals: mkLese(MK_K.deals, { akquise: [], statisch: [] }),
    heute: mkLese(MK_K.heute, { done: [], snoozed: {}, chatBeantwortet: [] }),
    ziele: mkLese(MK_K.ziele, {}),
    bez: window.ekLese(window.EK_K.bez, {}),
    ekChats: window.ekLese(window.EK_K.chats, {}),
    ekProfil: window.ekLese(window.EK_K.profil, {}),
  };
}
function mkPersist(d) {
  mkSchreibe(MK_K.kontakte, d.kontakte); mkSchreibe(MK_K.deals, d.deals);
  mkSchreibe(MK_K.heute, d.heute); mkSchreibe(MK_K.ziele, d.ziele);
  window.ekSchreibe(window.EK_K.bez, d.bez); window.ekSchreibe(window.EK_K.chats, d.ekChats);
}
const mkKontakt = (d, id) => d.kontakte.find((k) => k.id === id) || { name: "Kontakt", initials: "?" };

/* Verkaufs-Pipeline: Spalten = Endkunden-Zustaende, gespiegelt */
const MK_SPALTEN = [
  ["gemerkt", "Interessiert"], ["termin", "Besichtigung"], ["besichtigt", "Nachfassen"],
  ["anbot_aktiv", "Anbot"], ["gegenangebot", "Verhandlung"], ["abwicklung", "Abwicklung"], ["eigentum", "Abgeschlossen"],
];
/* Alle Verkaufs-Deals: live aus der Endkunden-State-Machine (Valentina) + statische Demo-Deals */
function mkVerkaufsDeals(d) {
  const live = Object.entries(d.bez)
    .filter(([, b]) => b.zustand && b.zustand !== "abgelehnt")
    .map(([objId, b]) => ({ id: "ek-" + objId, kontaktId: "valentina", objId, zustand: b.zustand === "angenommen" ? "abwicklung" : b.zustand, b, live: true }));
  const liveIds = new Set(live.map((x) => x.objId));
  const statisch = d.deals.statisch.filter((s) => !liveIds.has(s.objId)).map((s) => ({ ...s, live: false }));
  return [...live, ...statisch];
}

/* Heute-Triage: EINE priorisierte Liste aus allen Quellen */
function mkTriage(d) {
  const items = [];
  const kk = d.ekProfil.kaufkraft;
  d.kontakte.forEach((k) => {
    if (k.neuSeit) items.push({ id: "lead-" + k.id, prio: 0, typ: "lead", titel: "Neuer Lead: " + k.name, sub: (k.quelle || "unio.at") + " · unbeantwortet", timer: k.neuSeit, aktion: "Antworten", ziel: { art: "kontakt", id: k.id } });
  });
  Object.entries(d.bez).forEach(([objId, b]) => {
    const o = window.ekObj(objId);
    if (b.zustand === "gegenangebot" && b.anbot) items.push({ id: "frist-" + objId, prio: 1, typ: "frist", titel: "Gegenangebot offen: " + o.t, sub: window.ekEur(b.anbot.gegen) + " · Frist noch " + window.ekFristTage(b.anbot.frist) + " Tage · Valentina Hofer", aktion: "Deal öffnen", ziel: { art: "deal", id: objId } });
    if (b.zustand === "anbot_aktiv" && b.anbot) items.push({ id: "anbot-" + objId, prio: 1, typ: "anbot", titel: "Anbot liegt vor: " + o.t, sub: window.ekEur(b.anbot.betrag) + " · dem Verkäufer vorlegen · Valentina Hofer", aktion: "Deal öffnen", ziel: { art: "deal", id: objId } });
    if (b.zustand === "besichtigt") items.push({ id: "nachfassen-" + objId, prio: 2, typ: "nachfassen", titel: "Nachfassen: " + o.t, sub: "Besichtigung war " + (b.termin || "") + " · Feedback einholen", aktion: "Anrufen", ziel: { art: "deal", id: objId } });
    if (b.zustand === "termin" && b.termin) items.push({ id: "termin-" + objId, prio: 3, typ: "termin", titel: "Besichtigung bestätigt: " + o.t, sub: b.termin + " · Unterlagen bereitlegen", aktion: "Objekt-Akte", ziel: { art: "objekt", id: objId } });
  });
  if (!d.heute.chatBeantwortet.includes("klein")) items.push({ id: "msg-klein", prio: 2, typ: "nachricht", titel: "Unbeantwortet: Mario Klein", sub: "„Können wir die Maisonette diese Woche sehen?“ · vor 8 Tagen", aktion: "Antworten", ziel: { art: "kontakt", id: "klein" } });
  if (!d.heute.chatBeantwortet.includes("schuster")) items.push({ id: "report-schuster", prio: 3, typ: "report", titel: "Wochenbericht fällig: Herbert Schuster", sub: "Schönbrunn-Blick · 12 Anfragen, 2 Besichtigungen diese Woche", aktion: "Report erstellen", ziel: { art: "objekt", id: "schoenbrunn" } });
  if (kk && kk.status === "pruefung") items.push({ id: "kk-val", prio: 2, typ: "kunde", titel: "Finanzierungsprüfung angefragt: Valentina Hofer", sub: "Budget laut Selbstangabe " + window.ekEur(kk.budget) + " · an Partner übergeben", aktion: "Erledigt melden", ziel: { art: "kontakt", id: "valentina" } });
  const jetzt = Date.now();
  return items
    .filter((i) => !d.heute.done.includes(i.id))
    .filter((i) => !(d.heute.snoozed[i.id] && d.heute.snoozed[i.id] > jetzt))
    .sort((a, b) => a.prio - b.prio);
}

/* ---------- CSS ---------- */
const MK_CSS = `
  .mk-pill{display:inline-flex;align-items:center;gap:5px;font-family:var(--font-mono),ui-monospace,monospace;font-size:8px;letter-spacing:.11em;
    text-transform:uppercase;border-radius:99px;padding:4px 9px;border:1px solid var(--hairline-dark);color:var(--text-muted);background:#FFFFFF;white-space:nowrap;}
  .mk-pill.hot{color:var(--signal-deep);border-color:rgba(255,170,9,.4);background:rgba(255,170,9,.13);}
  .mk-pill.ok{color:#2E7D46;border-color:rgba(46,125,70,.3);background:rgba(46,125,70,.09);}
  .mk-pill.rot{color:#B3261E;border-color:rgba(179,38,30,.3);background:rgba(179,38,30,.07);}
  .mk-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;cursor:pointer;text-decoration:none;
    background:var(--ink);color:#F7F5F1;border-radius:999px;padding:10px 18px;font:500 13px var(--font-display);font-family:inherit;transition:transform .15s var(--ease-unio);}
  .mk-btn:hover{transform:translateY(-1px);}
  .mk-btn.ghost{background:#FFFFFF;color:var(--ink);box-shadow:inset 0 0 0 1px var(--hairline-dark);}
  .mk-btn.signal{background:var(--signal);color:#1A1305;}
  .mk-btn.tiny{padding:7px 12px;font-size:11.5px;}
  .mk-card{background:var(--surface-raised);border-radius:16px;box-shadow:inset 0 0 0 1px var(--hairline-dark);padding:18px 20px;}
  .mk-secthead{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin:26px 0 12px;}
  .mk-secthead h2{font:500 18px var(--font-display);letter-spacing:-.02em;margin:0;color:var(--ink);}
  .mk-mono{font-family:var(--font-mono),ui-monospace,monospace;font-size:9px;letter-spacing:.13em;text-transform:uppercase;color:var(--text-muted);}
  /* Triage */
  .mk-triage{display:flex;align-items:center;gap:13px;background:var(--surface-raised);border-radius:14px;box-shadow:inset 0 0 0 1px var(--hairline-dark);
    padding:12px 14px;margin-bottom:8px;color:var(--ink);}
  .mk-triage.lead{box-shadow:inset 0 0 0 1.5px rgba(255,170,9,.55);}
  .mk-triage .tico{flex:0 0 36px;width:36px;height:36px;border-radius:10px;display:grid;place-items:center;background:rgba(255,170,9,.12);color:var(--signal-deep);font:600 12px var(--font-display);}
  .mk-triage .mid{flex:1;min-width:0;}
  .mk-triage .mid b{display:block;font:500 14px var(--font-display);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .mk-triage .mid span{display:block;font-size:12px;color:var(--text-muted);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .mk-triage .acts{display:flex;gap:6px;align-items:center;flex:0 0 auto;}
  .mk-triage .kbd{border:1px solid var(--hairline-dark);background:#fff;border-radius:7px;padding:4px 8px;cursor:pointer;
    font-family:var(--font-mono),monospace;font-size:9px;color:var(--text-muted);}
  .mk-timer{font-family:var(--font-mono),ui-monospace,monospace;font-size:9px;letter-spacing:.08em;color:#B3261E;white-space:nowrap;}
  /* Zero-State */
  .mk-zero{position:relative;border-radius:20px;overflow:hidden;min-height:380px;display:flex;align-items:flex-end;}
  .mk-zero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .mk-zero .sc{position:absolute;inset:0;background:linear-gradient(185deg,rgba(11,10,9,.05) 40%,rgba(11,10,9,.66));}
  .mk-zero .cap{position:relative;padding:26px;color:#fff;}
  .mk-zero .cap b{display:block;font:500 26px var(--font-display);letter-spacing:-.02em;}
  .mk-zero .cap span{font-size:13.5px;color:rgba(255,255,255,.85);}
  /* Kanban */
  .mk-board{display:flex;gap:12px;overflow-x:auto;padding-bottom:14px;align-items:flex-start;}
  .mk-col{flex:0 0 250px;background:rgba(20,18,16,.035);border-radius:16px;padding:10px;min-height:120px;}
  .mk-col.dropbar{outline:2px dashed rgba(255,170,9,.6);outline-offset:-2px;}
  .mk-col .kopf{display:flex;justify-content:space-between;align-items:center;padding:4px 6px 10px;}
  .mk-col .kopf b{font:500 12.5px var(--font-display);color:var(--ink);}
  .mk-dealcard{background:#FFFFFF;border-radius:12px;box-shadow:inset 0 0 0 1px var(--hairline-dark);padding:11px 12px;margin-bottom:8px;cursor:pointer;}
  .mk-dealcard.faul{box-shadow:inset 0 0 0 1px rgba(179,38,30,.35);}
  .mk-dealcard img{width:100%;aspect-ratio:16/7;object-fit:cover;border-radius:8px;margin-bottom:8px;}
  .mk-dealcard b{display:block;font:500 13px var(--font-display);color:var(--ink);}
  .mk-dealcard .m{display:block;font-size:11px;color:var(--text-muted);margin-top:2px;}
  .mk-dealcard .fuss{display:flex;justify-content:space-between;align-items:center;margin-top:8px;gap:6px;}
  /* Slide-Over */
  .mk-overwrap{position:fixed;inset:0;z-index:120;pointer-events:none;}
  .mk-overwrap.open{pointer-events:auto;}
  .mk-overwrap .back{position:absolute;inset:0;background:rgba(11,10,9,.38);opacity:0;transition:opacity .25s var(--ease-unio);}
  .mk-overwrap.open .back{opacity:1;}
  .mk-over{position:absolute;top:0;right:0;bottom:0;width:min(560px,100vw);background:var(--paper);overflow-y:auto;
    box-shadow:-30px 0 80px -30px rgba(11,10,9,.45);transform:translateX(105%);transition:transform .3s cubic-bezier(0.32,0.72,0,1);padding:22px 24px;}
  .mk-overwrap.open .mk-over{transform:translateX(0);}
  .mk-over h3{font:500 21px var(--font-display);letter-spacing:-.02em;margin:0;color:var(--ink);}
  /* Thread */
  .mk-msg{max-width:82%;border-radius:13px;padding:9px 13px;font-size:13px;line-height:1.5;margin-bottom:7px;}
  .mk-msg.ich{margin-left:auto;background:var(--ink);color:#F7F5F1;border-bottom-right-radius:4px;}
  .mk-msg.er{background:#EFEBE3;color:var(--ink);border-bottom-left-radius:4px;}
  .mk-msg .t{display:block;font-family:var(--font-mono),monospace;font-size:7px;letter-spacing:.1em;opacity:.55;margin-top:4px;text-transform:uppercase;}
  /* Tabelle */
  .mk-tab{width:100%;border-collapse:collapse;}
  .mk-tab th{text-align:left;font-family:var(--font-mono),monospace;font-size:8px;letter-spacing:.12em;text-transform:uppercase;color:var(--signal-deep);
    padding:8px 12px;border-bottom:1.5px solid var(--ink);}
  .mk-tab td{padding:0 12px;height:47px;border-bottom:1px solid var(--hairline-dark);font-size:13px;color:var(--ink);vertical-align:middle;}
  .mk-tab tr.zeile{cursor:pointer;}
  .mk-tab tr.zeile:hover{background:rgba(255,255,255,.75);}
  .mk-tab tr .hoveracts{opacity:0;display:flex;gap:5px;transition:opacity .12s;}
  .mk-tab tr:hover .hoveracts{opacity:1;}
  .mk-ava{width:28px;height:28px;border-radius:99px;background:var(--ink);color:var(--paper);display:inline-grid;place-items:center;font:600 9.5px var(--font-display);}
  .mk-views{display:flex;gap:7px;flex-wrap:wrap;margin:0 0 14px;}
  .mk-views button{border:1px solid var(--hairline-dark);background:#FFFFFF;border-radius:99px;padding:8px 14px;cursor:pointer;
    font:500 12px var(--font-display);font-family:inherit;color:var(--text-muted);}
  .mk-views button.on{background:var(--ink);color:#F7F5F1;border-color:var(--ink);}
  /* Checklisten */
  .mk-check{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--hairline-dark);font-size:13.5px;color:var(--ink);}
  .mk-check:last-child{border-bottom:none;}
  .mk-check .box{width:20px;height:20px;border-radius:7px;border:1.5px solid var(--hairline-dark);display:grid;place-items:center;cursor:pointer;background:#fff;flex:0 0 auto;font-size:11px;}
  .mk-check.done .box{background:var(--signal);border-color:var(--signal);color:#1A1305;}
  .mk-check.done span{color:var(--text-muted);}
  /* Command-K */
  .mk-cmdk{position:fixed;inset:0;z-index:160;display:grid;place-items:start center;padding-top:14vh;background:rgba(11,10,9,.35);}
  .mk-cmdk .box{width:min(620px,92vw);background:var(--paper);border-radius:18px;box-shadow:0 40px 100px -30px rgba(11,10,9,.6);overflow:hidden;}
  .mk-cmdk input{width:100%;border:none;outline:none;background:transparent;padding:18px 22px;font:400 16px var(--font-display);font-family:inherit;color:var(--ink);border-bottom:1px solid var(--hairline-dark);}
  .mk-cmdk .erg{max-height:340px;overflow-y:auto;padding:8px;}
  .mk-cmdk .zeile{display:flex;align-items:center;gap:11px;padding:10px 14px;border-radius:11px;cursor:pointer;font:400 14px var(--font-display);color:var(--ink);}
  .mk-cmdk .zeile.on,.mk-cmdk .zeile:hover{background:rgba(20,18,16,.06);}
  .mk-cmdk .zeile .k{font-family:var(--font-mono),monospace;font-size:8px;letter-spacing:.11em;text-transform:uppercase;color:var(--signal-deep);width:64px;flex:0 0 auto;}
  .mk-kbdhint{font-family:var(--font-mono),monospace;font-size:8.5px;letter-spacing:.08em;color:var(--text-muted);border:1px solid var(--hairline-dark);border-radius:6px;padding:3px 7px;background:#fff;}
  /* Sub-Navigation innerhalb eines Bereichs (Objekte, CIRCLE) */
  .mk-subnav{display:flex;gap:6px;flex-wrap:wrap;padding:5px;border-radius:999px;background:#FFFFFF;
    box-shadow:inset 0 0 0 1px var(--hairline-dark);width:max-content;max-width:100%;}
  .mk-subnav button{border:none;cursor:pointer;border-radius:999px;padding:9px 16px;background:transparent;color:var(--text-muted);
    font:500 12.5px var(--font-display);font-family:inherit;white-space:nowrap;transition:all .18s var(--ease-unio);}
  .mk-subnav button.on{background:var(--ink);color:#F7F5F1;}
  .mk-subnav .zahl{font-family:var(--font-mono),monospace;font-size:9px;opacity:.75;margin-left:5px;}
  /* ===== Globale Responsive-Haertung fuer das gesamte Dashboard ===== */
  main{overflow-x:clip;}
  main table{max-width:100%;}
  .mk-scrollx{overflow-x:auto;-webkit-overflow-scrolling:touch;}
  /* Das 12-Spalten-Bento braucht rund 1700 px Viewport (1360 Inhalt + Sidebar + Padding).
     Darunter zwei Spalten, ab 900 px eine: nichts wird mehr abgeschnitten. */
  @media (max-width:1690px){
    .dash-bento{grid-template-columns:repeat(2,minmax(0,1fr))!important;grid-auto-rows:auto!important;}
    .dash-bento > *{grid-column:span 1!important;grid-row:auto!important;grid-row-end:auto!important;min-width:0;}
  }
  @media (max-width:900px){
    .dash-bento{grid-template-columns:minmax(0,1fr)!important;}
  }
  .dash-bento > *{min-width:0;}
  @media (max-width:1400px){
    .dash-statband{column-gap:26px!important;row-gap:22px!important;margin-top:44px!important;}
    .dash-statband .dash-kpi-div{display:none!important;}
    .dash-statband > *{min-width:0;}
  }
  @media (max-width:1100px){
    main{padding-left:26px!important;padding-right:26px!important;}
  }
  @media (max-width:900px){
    .mk-chatwrap,.mk-two{grid-template-columns:minmax(0,1fr)!important;}
    /* left/right statt 100vw: 100vw zaehlt die Scrollbar mit und laeuft ueber. */
    .mk-over{left:0!important;right:0!important;width:auto!important;}
  }
  /* ===== Sidebar wird auf schmalen Screens ein Overlay-Drawer =====
     Die Innenabstaende von Kopf und Inhalt stehen inline (clamp) in dash-shell.jsx. */
  @media (max-width:1000px){
    .dash-head{height:64px!important;}
    .dash-stylepill{display:none;}
    .dash-main{padding-top:4px!important;}
  }
  /* Alt-Screens (Projekt, Objekt-Akte, CIRCLE) mobil entspannen: mehrspaltige Grids
     werden schmaler, fixe Breiten geben nach, Flex-Reihen brechen um. */
  @media (max-width:860px){
    .mk-drei{grid-template-columns:minmax(0,1fr)!important;}
    .mk-facts{grid-template-columns:repeat(2,minmax(0,1fr))!important;}
    main [style*="display: flex"]{flex-wrap:wrap;}
  }
  @media (max-width:520px){
    .mk-facts{grid-template-columns:minmax(0,1fr)!important;}
  }
  /* Kennzahlen-Reihen: die Spaltenzahl steckt intrinsisch im Element
     (auto-fit + min()), damit sie auch ohne dieses Stylesheet stimmt.
     Hier nur noch das engere Raster fuer kleine Flaechen. */
  .mk-kennz{gap:clamp(10px,2vw,16px);}
  .mk-kennz > * > div{overflow-wrap:anywhere;}
  /* Sub-Navigation mobil: eine Zeile scrollende Pills mit Snap (Material 3 / HIG) */
  @media (max-width:760px){
    .mk-subnav{flex-wrap:nowrap!important;overflow-x:auto;scroll-snap-type:x proximity;
      width:100%;border-radius:14px;scrollbar-width:none;}
    .mk-subnav::-webkit-scrollbar{display:none;}
    .mk-subnav button{scroll-snap-align:start;min-height:40px;}
  }
  /* Detailseiten-Kopf mobil: Zurueck links, Aktion rechts, beide mit Label */
  @media (max-width:760px){
    main [style*="justify-content: space-between"] > button[class]{white-space:nowrap;}
    .mkg + * ,.mkg{max-width:100%;}
  }
  /* Die Tab-Leiste scrollt in der Komponente selbst (dash-helpers.jsx),
     hier nur die Leiste ohne sichtbaren Scrollbalken. */
  .u-tabscroll::-webkit-scrollbar{display:none;}
  /* Interessenten-Zeilen brechen intrinsisch um (Flex-Wrap im Element selbst). */
  /* Padding und Kennzahlen skalieren mit der Flaeche, nicht mit Breakpoints:
     der Kopf selbst bricht per Flex-Wrap um (siehe dash-project.jsx). */
  .mk-projkarte{padding:clamp(18px,4vw,30px);}
  @media (max-width:860px){
    /* Der Kopf traegt mobil nur Menue und Rollenwahl; "Immobilie anlegen" lebt in Objekte > Entwuerfe */
    .dash-cta{display:none;}
    .dash-head{gap:8px!important;}
    .dash-headright{gap:8px!important;min-width:0;}
  }
`;

/* ---------- Timer (Speed-to-Lead) ---------- */
function MkTimer({ seit }) {
  const [, tick] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => tick((x) => x + 1), 1000); return () => clearInterval(t); }, []);
  const s = Math.max(0, Math.floor((Date.now() - seit) / 1000));
  const txt = s < 3600 ? Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0") + " Min" : Math.floor(s / 3600) + " h " + Math.floor((s % 3600) / 60) + " Min";
  return <span className="mk-timer">⏱ {txt}</span>;
}

/* ---------- Slide-Over ---------- */
function MkOver({ offen, onClose, children, breit }) {
  React.useEffect(() => {
    if (!offen) return;
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [offen]);
  return (
    <div className={"mk-overwrap" + (offen ? " open" : "")} aria-hidden={!offen}>
      <div className="back" onClick={onClose}></div>
      <aside className="mk-over" style={breit ? { width: "min(680px,100vw)" } : null}>{offen ? children : null}</aside>
    </div>
  );
}

/* ---------- Command-K + G-Shortcuts + Cheatsheet ---------- */
function MkCommandK({ offen, onClose, mk, geheZu }) {
  const [q, setQ] = React.useState("");
  const [idx, setIdx] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => { if (offen) { setQ(""); setIdx(0); setTimeout(() => ref.current && ref.current.focus(), 50); } }, [offen]);
  if (!offen) return null;
  const alle = [
    ...mk.kontakte.map((k) => ({ k: "Kontakt", t: k.name, tu: () => geheZu({ art: "kontakt", id: k.id }) })),
    ...Object.entries(window.EK_KATALOG).map(([id, o]) => ({ k: "Objekt", t: o.t, tu: () => geheZu({ art: "objekt", id }) })),
    { k: "Aktion", t: "Neuer Kontakt anlegen", tu: () => geheZu({ art: "screen", id: "kontakte" }) },
    { k: "Aktion", t: "Termin anlegen", tu: () => geheZu({ art: "screen", id: "kalender" }) },
    { k: "Aktion", t: "Eigentümer-Report erstellen", tu: () => geheZu({ art: "objekt", id: "schoenbrunn" }) },
    { k: "View", t: "Heute", tu: () => geheZu({ art: "screen", id: "dashboard" }) },
    { k: "View", t: "Deals · Käufer-Pipeline", tu: () => geheZu({ art: "screen", id: "deals" }) },
    { k: "View", t: "Ziele · on pace", tu: () => geheZu({ art: "screen", id: "ziele" }) },
  ];
  const erg = alle.filter((x) => x.t.toLowerCase().includes(q.toLowerCase())).slice(0, 8);
  const waehle = (e) => { e.tu(); onClose(); };
  return (
    <div className="mk-cmdk" onClick={onClose}>
      <div className="box" onClick={(e) => e.stopPropagation()}>
        <input ref={ref} value={q} placeholder="Suchen oder Aktion ausführen ..." onChange={(e) => { setQ(e.target.value); setIdx(0); }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") setIdx(Math.min(idx + 1, erg.length - 1));
            else if (e.key === "ArrowUp") setIdx(Math.max(idx - 1, 0));
            else if (e.key === "Enter" && erg[idx]) waehle(erg[idx]);
            else if (e.key === "Escape") onClose();
          }} />
        <div className="erg">
          {erg.map((e, i) => (
            <div key={e.k + e.t} className={"zeile" + (i === idx ? " on" : "")} onClick={() => waehle(e)}>
              <span className="k">{e.k}</span>{e.t}
            </div>
          ))}
          {erg.length === 0 && <div className="zeile" style={{ color: "var(--text-muted)" }}>Nichts gefunden</div>}
        </div>
      </div>
    </div>
  );
}

function MkCheatsheet({ offen, onClose }) {
  if (!offen) return null;
  const Z = ([k, v]) => (
    <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 14, padding: "8px 0", borderBottom: "1px solid var(--hairline-dark)", fontSize: 13 }}>
      <span style={{ color: "var(--text-muted)" }}>{v}</span><span className="mk-kbdhint">{k}</span>
    </div>
  );
  return (
    <div className="mk-cmdk" onClick={onClose}>
      <div className="box" onClick={(e) => e.stopPropagation()} style={{ padding: "20px 24px" }}>
        <h3 style={{ font: "500 19px var(--font-display)", margin: "0 0 10px" }}>Tastatur</h3>
        {[["⌘ K", "Suchen und Aktionen"], ["G H", "Heute"], ["G K", "Kontakte"], ["G O", "Objekte"], ["G D", "Deals"], ["G C", "CIRCLE"], ["G Z", "Ziele"], ["E", "Triage-Zeile erledigt"], ["H", "Triage-Zeile snoozen"], ["?", "Dieses Cheatsheet"]].map(Z)}
      </div>
    </div>
  );
}

Object.assign(window, {
  MK_K, mkLese, mkSchreibe, mkSeed, mkLadeAlles, mkPersist, mkKontakt,
  MK_SPALTEN, mkVerkaufsDeals, mkTriage, MK_CSS, MkTimer, MkOver, MkCommandK, MkCheatsheet,
});
