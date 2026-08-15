/* UNIO Endkunden-Portal: eigenstaendiges, responsives Layout rund um die Explore.
   Bewusst OHNE DashShell: App-artig, Bottom-Tabs mobil, Pill-Navigation am Desktop. */

const EK_CSS = `
  .ek{min-height:100vh;background:var(--paper);color:var(--ink);font-family:var(--font-display),'Helvetica Neue',sans-serif;}
  .ek *{box-sizing:border-box;}
  .ek-mono{font-family:var(--font-mono),ui-monospace,monospace;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--text-muted);}
  .ek-top{position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;gap:14px;
    padding:14px clamp(16px,4vw,40px);background:color-mix(in srgb,var(--paper) 88%,transparent);backdrop-filter:blur(14px);
    border-bottom:1px solid var(--hairline-dark);}
  .ek-top img{height:15px;display:block;}
  .ek-nav{display:flex;gap:4px;background:#FFFFFF;border-radius:999px;padding:4px;box-shadow:inset 0 0 0 1px var(--hairline-dark);}
  .ek-nav button{border:none;cursor:pointer;border-radius:999px;padding:8px 16px;background:transparent;
    color:var(--text-muted);font:500 12.5px var(--font-display);transition:all .25s var(--ease-unio);white-space:nowrap;}
  .ek-nav button.on{background:var(--ink);color:#F7F5F1;}
  .ek-ava{width:34px;height:34px;border-radius:999px;background:var(--signal);color:var(--on-signal);border:none;cursor:pointer;
    display:grid;place-items:center;font:600 11.5px var(--font-display);letter-spacing:.02em;flex:0 0 auto;}
  .ek-main{max-width:1080px;margin:0 auto;padding:clamp(20px,4vw,40px) clamp(16px,4vw,40px) 120px;}
  .ek h1{font:500 clamp(26px,4vw,40px)/1.06 var(--font-display);letter-spacing:-.03em;margin:6px 0 4px;}
  .ek h1 i{color:var(--signal);font-style:normal;}
  .ek-sub{font-size:14.5px;color:var(--text-muted);margin:0 0 26px;max-width:520px;line-height:1.6;}
  .ek-card{background:var(--surface-raised);border-radius:18px;box-shadow:inset 0 0 0 1px var(--hairline-dark);padding:20px;}
  .ek-rchip{display:inline-flex;align-items:center;font-family:var(--font-mono),ui-monospace,monospace;font-size:8px;letter-spacing:.11em;
    text-transform:uppercase;color:var(--signal-deep);background:rgba(255,170,9,.13);border:1px solid rgba(255,170,9,.4);
    border-radius:99px;padding:3px 8px;}
  .ek-pill{display:inline-flex;align-items:center;font-family:var(--font-mono),ui-monospace,monospace;font-size:8px;letter-spacing:.11em;
    text-transform:uppercase;border-radius:99px;padding:4px 9px;border:1px solid var(--hairline-dark);color:var(--text-muted);background:#FFFFFF;}
  .ek-pill.hot{color:var(--signal-deep);border-color:rgba(255,170,9,.4);background:rgba(255,170,9,.13);}
  .ek-pill.ok{color:#2E7D46;border-color:rgba(46,125,70,.3);background:rgba(46,125,70,.09);}
  .ek-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;cursor:pointer;text-decoration:none;
    background:var(--ink);color:#F7F5F1;border-radius:999px;padding:11px 20px;font:500 13.5px var(--font-display);transition:transform .25s var(--ease-unio);}
  .ek-btn:hover{transform:translateY(-1px);}
  .ek-btn.ghost{background:#FFFFFF;color:var(--ink);box-shadow:inset 0 0 0 1px var(--hairline-dark);}
  .ek-btn.tiny{padding:8px 14px;font-size:12px;}
  /* Start */
  .ek-hero{position:relative;display:block;border-radius:22px;overflow:hidden;text-decoration:none;color:#fff;min-height:230px;}
  .ek-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease-unio);}
  .ek-hero:hover img{transform:scale(1.03);}
  .ek-hero .sc{position:absolute;inset:0;background:linear-gradient(200deg,rgba(11,10,9,.08) 30%,rgba(11,10,9,.72));}
  .ek-hero .in{position:absolute;left:22px;right:22px;bottom:20px;display:flex;align-items:flex-end;justify-content:space-between;gap:14px;flex-wrap:wrap;}
  .ek-hero b{display:block;font:500 clamp(22px,3vw,30px)/1.1 var(--font-display);letter-spacing:-.02em;}
  .ek-hero span.k{font-family:var(--font-mono),ui-monospace,monospace;font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.8);}
  .ek-hero .go{background:#F7F5F1;color:var(--ink);border-radius:999px;padding:11px 20px;font:500 13.5px var(--font-display);white-space:nowrap;}
  .ek-grid2{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:12px;}
  .ek-hl{position:relative;display:block;border-radius:18px;overflow:hidden;cursor:pointer;border:none;padding:0;text-align:left;
    aspect-ratio:4/4.6;background:var(--surface-raised);font-family:inherit;}
  .ek-hl img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .ek-hl .sc{position:absolute;inset:0;background:linear-gradient(185deg,rgba(11,10,9,.02) 35%,rgba(11,10,9,.74));}
  .ek-hl .neu{position:absolute;top:12px;left:12px;background:var(--signal);color:var(--on-signal);border-radius:99px;padding:4px 9px;
    font-family:var(--font-mono),ui-monospace,monospace;font-size:8px;letter-spacing:.12em;text-transform:uppercase;}
  .ek-hl .cap{position:absolute;left:14px;right:14px;bottom:13px;color:#fff;}
  .ek-hl .cap b{display:block;font:500 16.5px/1.15 var(--font-display);letter-spacing:-.01em;}
  .ek-hl .cap .m{font-family:var(--font-mono),ui-monospace,monospace;font-size:8.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.82);display:block;margin-top:3px;}
  .ek-hl .cap .p{display:flex;align-items:center;gap:8px;margin-top:7px;font:500 14px var(--font-display);}
  .ek-hl .cap .ek-rchip{background:rgba(255,170,9,.22);color:#FFC64D;border-color:rgba(255,170,9,.45);}
  .ek-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:12px;}
  .ek-stat{background:var(--surface-raised);border-radius:16px;box-shadow:inset 0 0 0 1px var(--hairline-dark);padding:16px 18px;cursor:pointer;border:none;text-align:left;font-family:inherit;}
  .ek-stat b{display:block;font:500 26px var(--font-display);letter-spacing:-.02em;color:var(--ink);}
  .ek-stat span{font-size:12.5px;color:var(--text-muted);}
  /* Listenzeilen */
  .ek-row{display:flex;align-items:center;gap:14px;background:var(--surface-raised);border-radius:16px;
    box-shadow:inset 0 0 0 1px var(--hairline-dark);padding:14px 16px;margin-bottom:10px;}
  .ek-row img{width:58px;height:58px;border-radius:12px;object-fit:cover;flex:0 0 auto;}
  .ek-row .mid{flex:1;min-width:0;}
  .ek-row .mid b{display:block;font:500 15px var(--font-display);letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .ek-row .mid .s{font-size:12.5px;color:var(--text-muted);margin-top:2px;display:block;}
  /* Suchprofile */
  .ek-sp{background:var(--surface-raised);border-radius:18px;box-shadow:inset 0 0 0 1px var(--hairline-dark);padding:18px 20px;margin-bottom:12px;}
  .ek-sp .head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;}
  .ek-sp .head b{font:500 17px var(--font-display);letter-spacing:-.01em;}
  .ek-sp .params{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px;}
  .ek-sw{position:relative;width:40px;height:23px;border-radius:99px;border:none;cursor:pointer;background:var(--hairline-dark);transition:background .25s var(--ease-unio);flex:0 0 auto;}
  .ek-sw.on{background:var(--signal);}
  .ek-sw::after{content:"";position:absolute;top:3px;left:3px;width:17px;height:17px;border-radius:99px;background:#fff;transition:transform .25s var(--ease-unio);}
  .ek-sw.on::after{transform:translateX(17px);}
  /* Angebote */
  .ek-ang{background:var(--surface-raised);border-radius:18px;box-shadow:inset 0 0 0 1px var(--hairline-dark);overflow:hidden;margin-bottom:12px;}
  .ek-ang .top{display:flex;align-items:center;gap:14px;padding:16px 18px;}
  .ek-ang .top img{width:64px;height:64px;border-radius:14px;object-fit:cover;}
  .ek-ang .zeile{display:flex;justify-content:space-between;gap:10px;padding:11px 18px;border-top:1px solid var(--hairline-dark);font-size:13.5px;}
  .ek-ang .zeile span{color:var(--text-muted);}
  .ek-ang .zeile b{font-weight:500;}
  .ek-acts{display:flex;gap:8px;flex-wrap:wrap;padding:14px 18px;border-top:1px solid var(--hairline-dark);background:rgba(255,170,9,.05);}
  /* Chats */
  .ek-chatwrap{display:grid;grid-template-columns:320px 1fr;gap:14px;min-height:480px;}
  .ek-chli{display:flex;align-items:center;gap:12px;width:100%;border:none;background:var(--surface-raised);border-radius:16px;
    box-shadow:inset 0 0 0 1px var(--hairline-dark);padding:13px 14px;margin-bottom:9px;cursor:pointer;text-align:left;font-family:inherit;}
  .ek-chli.on{box-shadow:inset 0 0 0 1.5px var(--ink);}
  .ek-chli img{width:44px;height:44px;border-radius:99px;object-fit:cover;}
  .ek-chli .n{flex:1;min-width:0;}
  .ek-chli .n b{display:block;font:500 14.5px var(--font-display);}
  .ek-chli .n span{display:block;font-size:12px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;}
  .ek-unread{min-width:19px;height:19px;border-radius:99px;background:var(--signal);color:var(--on-signal);display:grid;place-items:center;
    font:600 10.5px var(--font-display);padding:0 5px;}
  .ek-conv{display:flex;flex-direction:column;background:var(--surface-raised);border-radius:18px;box-shadow:inset 0 0 0 1px var(--hairline-dark);overflow:hidden;}
  .ek-conv .chead{display:flex;align-items:center;gap:11px;padding:13px 16px;border-bottom:1px solid var(--hairline-dark);}
  .ek-conv .chead img{width:36px;height:36px;border-radius:99px;object-fit:cover;}
  .ek-msgs{flex:1;overflow-y:auto;padding:18px 16px;display:flex;flex-direction:column;gap:9px;}
  .ek-msg{max-width:78%;border-radius:15px;padding:10px 14px;font-size:13.8px;line-height:1.5;}
  .ek-msg.ich{align-self:flex-end;background:var(--ink);color:#F7F5F1;border-bottom-right-radius:5px;}
  .ek-msg.er{align-self:flex-start;background:#EFEBE3;border-bottom-left-radius:5px;}
  .ek-msg .t{display:block;font-family:var(--font-mono),ui-monospace,monospace;font-size:7.5px;letter-spacing:.1em;opacity:.55;margin-top:5px;text-transform:uppercase;}
  .ek-inp{display:flex;gap:9px;padding:12px;border-top:1px solid var(--hairline-dark);}
  .ek-inp input{flex:1;border:none;background:#EFEBE3;border-radius:999px;padding:11px 17px;font:400 13.5px var(--font-display);color:var(--ink);outline:none;}
  /* Dokumente */
  .ek-dok{display:flex;align-items:center;gap:13px;background:var(--surface-raised);border-radius:14px;
    box-shadow:inset 0 0 0 1px var(--hairline-dark);padding:13px 15px;margin-bottom:8px;cursor:pointer;}
  .ek-dok .ico{flex:0 0 36px;width:36px;height:36px;border-radius:10px;background:rgba(255,170,9,.12);color:var(--signal-deep);display:grid;place-items:center;}
  .ek-dok b{display:block;font:500 14px var(--font-display);}
  .ek-dok span.u{display:block;font-family:var(--font-mono),ui-monospace,monospace;font-size:8px;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);margin-top:2px;}
  /* Profil */
  .ek-set{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:15px 0;border-bottom:1px solid var(--hairline-dark);}
  .ek-set b{display:block;font:500 14.5px var(--font-display);}
  .ek-set span{display:block;font-size:12.5px;color:var(--text-muted);margin-top:2px;}
  .ek-input{width:100%;border:none;background:#FFFFFF;box-shadow:inset 0 0 0 1px var(--hairline-dark);border-radius:12px;
    padding:12px 15px;font:400 14px var(--font-display);color:var(--ink);outline:none;}
  /* Bottom-Tabs mobil */
  .ek-tabbar{display:none;}
  .ek-secthead{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin:30px 0 13px;}
  .ek-secthead h2{font:500 19px var(--font-display);letter-spacing:-.02em;margin:0;}
  @media (max-width:860px){
    .ek-nav{display:none;}
    .ek-grid2{grid-template-columns:1fr 1fr;}
    .ek-hl:last-child{display:none;}
    .ek-stats{grid-template-columns:repeat(3,1fr);}
    .ek-chatwrap{grid-template-columns:1fr;min-height:0;}
    .ek-conv{position:fixed;inset:0;z-index:60;border-radius:0;}
    .ek-tabbar{position:fixed;left:0;right:0;bottom:0;z-index:50;display:flex;justify-content:space-around;
      padding:8px max(10px,env(safe-area-inset-left)) max(12px,env(safe-area-inset-bottom));
      background:color-mix(in srgb,var(--paper) 90%,transparent);backdrop-filter:blur(16px);border-top:1px solid var(--hairline-dark);}
    .ek-tabbar button{display:flex;flex-direction:column;align-items:center;gap:4px;border:none;background:transparent;cursor:pointer;
      color:var(--text-muted);font:500 9.5px var(--font-display);padding:5px 9px;border-radius:12px;}
    .ek-tabbar button.on{color:var(--ink);}
    .ek-tabbar button.on svg{color:var(--signal-deep);}
    .ek-main{padding-bottom:110px;}
  }
  @media (max-width:520px){
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
  suche: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "m21 21-4.3-4.3"],
  angebote: ["M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z", "M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2", "M2 12h20"],
  chats: ["M21 12a8 8 0 0 1-8 8H4l1.6-3.2A8 8 0 1 1 21 12z"],
  doks: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6"],
  profil: ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M4 21v-1a7 7 0 0 1 14 0v1"],
};

/* ---------- Demo-Daten ---------- */
const EK_DATA = {
  user: { name: "Valentina Hofer", initials: "VH", mail: "valentina.hofer@gmail.com", tel: "+43 664 210 44 87" },
  highlights: [
    { img: "../../assets/img/beheim.jpg", t: "Penthouse Beheim", ort: "1170 Wien · Hernals", preis: "€ 1,70 Mio", rendite: "3,1", profil: "Dachgeschoss Wien West", neu: "Vor 2 Std" },
    { img: "../../assets/img/albrecht.jpg", t: "Das Albrecht · Top 12", ort: "1180 Wien · Währing", preis: "€ 470.000", rendite: "3,6", profil: "Anlage bis 500k", neu: "Gestern" },
    { img: "../../assets/img/schoenbrunn.jpg", t: "Schönbrunn-Blick", ort: "1130 Wien · Hietzing", preis: "€ 890.000", rendite: "3,5", profil: "Dachgeschoss Wien West", neu: "Vor 3 Tagen" },
  ],
  profile: [
    { id: 1, name: "Dachgeschoss Wien West", aktiv: true, treffer: 14, neu: 3, params: ["1140 bis 1180 Wien", "3 bis 4 Zimmer", "90 bis 140 m²", "Terrasse", "bis € 1,8 Mio"] },
    { id: 2, name: "Anlage bis 500k", aktiv: true, treffer: 8, neu: 1, params: ["1100, 1110, 1210 Wien", "2 bis 3 Zimmer", "Rendite ≥ 3,5 %", "vermietbar", "bis € 500.000"] },
    { id: 3, name: "Haus Umland Süd", aktiv: false, treffer: 5, neu: 0, params: ["Mödling, Perchtoldsdorf", "Haus mit Garten", "ab 130 m²", "bis € 1,2 Mio"] },
  ],
  angebote: [
    { id: "beheim", img: "../../assets/img/beheim.jpg", t: "Penthouse Beheim", ort: "1170 Wien", betrag: "€ 1.680.000", status: "Gegenangebot", statusTone: "hot", makler: "Lukas Brandtner", detail: [["Dein Angebot", "€ 1.680.000"], ["Gegenangebot Verkäufer", "€ 1.720.000"], ["Gültig bis", "22.08.2026"], ["Übermittelt", "11.08.2026"]], aktiv: true },
    { id: "albrecht", img: "../../assets/img/albrecht.jpg", t: "Das Albrecht · Top 12", ort: "1180 Wien", betrag: "€ 455.000", status: "In Prüfung", statusTone: "", makler: "Sarah Leitner", detail: [["Dein Angebot", "€ 455.000"], ["Beim Verkäufer seit", "14.08.2026"], ["Antwort erwartet", "bis 19.08.2026"]], aktiv: true },
    { id: "obenzwei", img: "../../assets/img/obenzwei.jpg", t: "ObenZwei · Penthouse", ort: "1020 Wien", betrag: "€ 2.050.000", status: "Nicht angenommen", statusTone: "", makler: "Lukas Brandtner", detail: [["Dein Angebot", "€ 2.050.000"], ["Abgeschlossen", "28.07.2026"]], aktiv: false },
  ],
  chats: [
    { id: 1, name: "Lukas Brandtner", rolle: "Makler · Penthouse Beheim", img: "../../assets/team/portrait-02.jpg", unread: 2, msgs: [
      { ich: false, txt: "Guten Morgen! Der Verkäufer hat auf Ihr Angebot reagiert: Gegenangebot € 1.720.000, gültig bis 22.08.", t: "09:12" },
      { ich: false, txt: "Wenn Sie möchten, gehe ich die Kalkulation gern noch einmal mit Ihnen durch. Die UNIO-Vermietdaten sprechen weiterhin für das Objekt.", t: "09:13" },
      { ich: true, txt: "Danke! Ich schaue mir das heute Abend an. Können wir für Freitag eine zweite Besichtigung fixieren?", t: "11:40" },
    ]},
    { id: 2, name: "Sarah Leitner", rolle: "Maklerin · Das Albrecht", img: "../../assets/team/portrait-05.jpg", unread: 0, msgs: [
      { ich: false, txt: "Ihr Angebot für Top 12 ist beim Bauträger. Ich melde mich, sobald es eine Rückmeldung gibt.", t: "Gestern" },
      { ich: true, txt: "Perfekt, danke für die schnelle Abwicklung!", t: "Gestern" },
    ]},
    { id: 3, name: "UNIO Concierge", rolle: "Finanzierung und Services", img: "../../assets/team/nikita-avatar.jpg", unread: 1, msgs: [
      { ich: false, txt: "Für das Penthouse Beheim liegt eine erste Finanzierungsindikation vor: ab 3,4 % effektiv bei 30 Jahren Laufzeit. Sollen wir einen Termin mit unserem Finanzierungspartner aufsetzen?", t: "14:02" },
    ]},
  ],
  dokumente: [
    { objekt: "Penthouse Beheim", hinweis: "Angebot gelegt", docs: [
      ["Bau- und Ausstattungsbeschreibung", "PDF · 24 Seiten · Stand 06/2026"],
      ["Energieausweis", "PDF · HWB 24,8 · Klasse A"],
      ["Grundriss Top 12", "PDF · Maßstab 1:100"],
      ["Kaufanbot (Entwurf)", "PDF · Version 2 · vom Makler"],
    ]},
    { objekt: "Das Albrecht · Top 12", hinweis: "Angebot gelegt", docs: [
      ["Bau- und Ausstattungsbeschreibung", "PDF · 18 Seiten"],
      ["Energieausweis", "PDF · HWB 27,3 · Klasse B"],
    ]},
  ],
  gekauft: { t: "Maxingstraße 22 · Top 7", ort: "1130 Wien · Hietzing", img: "../../assets/img/maxingstrasse-zimmer.jpg", seit: "Gekauft 03/2025", docs: [
    ["Kaufvertrag", "PDF · beglaubigt · 03/2025"],
    ["Übergabeprotokoll", "PDF · 04/2025"],
    ["Betriebskostenabrechnung 2025", "PDF · Hausverwaltung"],
  ]},
};

/* ---------- Bausteine ---------- */
function EkSectHead({ k, h, extra }) {
  return (
    <div className="ek-secthead">
      <div>
        <span className="ek-mono" style={{ color: "var(--signal-deep)" }}>{k}</span>
        <h2>{h}</h2>
      </div>
      {extra}
    </div>
  );
}
function EkDok({ name, unter }) {
  return (
    <div className="ek-dok">
      <span className="ico"><EkI d={EK_ICONS.doks} s={15} /></span>
      <div style={{ flex: 1, minWidth: 0 }}><b>{name}</b><span className="u">{unter}</span></div>
      <span style={{ font: "500 12.5px var(--font-display)", color: "var(--text-muted)", whiteSpace: "nowrap" }}>Ansehen →</span>
    </div>
  );
}

/* ---------- Screens ---------- */
function EkStart({ go }) {
  return (
    <div>
      <span className="ek-mono" style={{ color: "var(--signal-deep)" }}>Willkommen zurück</span>
      <h1>Guten Morgen, Valentina<i>.</i></h1>
      <p className="ek-sub">3 neue Objekte passen zu deinen Suchprofilen, ein Angebot hat eine Rückmeldung.</p>
      <a className="ek-hero" href="/ux/explore">
        <img src="../../assets/img/obenzwei-terrasse.jpg" alt="" />
        <span className="sc" aria-hidden="true"></span>
        <span className="in">
          <span><span className="k">Entdecken · Feed · Liste</span><b>Explore öffnen</b></span>
          <span className="go">Los geht's →</span>
        </span>
      </a>
      <div className="ek-stats">
        <button className="ek-stat" onClick={() => go("suche")}><b>2</b><span>aktive Suchprofile</span></button>
        <button className="ek-stat" onClick={() => go("angebote")}><b>2</b><span>Angebote draußen</span></button>
        <button className="ek-stat" onClick={() => go("chats")}><b>3</b><span>neue Nachrichten</span></button>
      </div>
      <EkSectHead k="Neu für deine Suche" h="Highlights" extra={<button className="ek-btn ghost tiny" onClick={() => go("suche")}>Suchprofile</button>} />
      <div className="ek-grid2">
        {EK_DATA.highlights.map((o) => (
          <a key={o.t} className="ek-hl" href="/ux/objekt?von=portal">
            <img src={o.img} alt="" loading="lazy" />
            <span className="sc" aria-hidden="true"></span>
            <span className="neu">{o.neu}</span>
            <span className="cap">
              <span className="m">{o.profil}</span>
              <b>{o.t}</b>
              <span className="m">{o.ort}</span>
              <span className="p">{o.preis} <span className="ek-rchip">Rendite {o.rendite} %</span></span>
            </span>
          </a>
        ))}
      </div>
      <p className="ek-mono" style={{ marginTop: 14 }}>Rendite kalkuliert aus UNIO-Vermietdaten: Jahresnettomiete zu Kaufpreis · Demo-Daten</p>
    </div>
  );
}

function EkSuche() {
  const [profile, setProfile] = React.useState(EK_DATA.profile);
  const [neuOffen, setNeuOffen] = React.useState(false);
  const toggle = (id) => setProfile((p) => p.map((x) => x.id === id ? { ...x, aktiv: !x.aktiv } : x));
  return (
    <div>
      <span className="ek-mono" style={{ color: "var(--signal-deep)" }}>Suchprofile</span>
      <h1>Deine Suchen<i>.</i></h1>
      <p className="ek-sub">Mehrere Profile an verschiedenen Standorten, jedes mit eigenen Parametern. Auch die Rendite kannst du als Kriterium setzen, UNIO rechnet sie aus echten Vermietdaten.</p>
      {profile.map((p) => (
        <div key={p.id} className="ek-sp">
          <div className="head">
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <b>{p.name}</b>
              {p.neu > 0 && p.aktiv && <span className="ek-pill hot">{p.neu} neu</span>}
              <span className="ek-pill">{p.treffer} Treffer</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="ek-mono">{p.aktiv ? "Aktiv" : "Pausiert"}</span>
              <button className={"ek-sw" + (p.aktiv ? " on" : "")} onClick={() => toggle(p.id)} aria-label="Profil aktivieren"></button>
            </div>
          </div>
          <div className="params">
            {p.params.map((x) => <span key={x} className="ek-pill" style={{ fontSize: 9, padding: "6px 11px" }}>{x}</span>)}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 15, flexWrap: "wrap" }}>
            <a className="ek-btn tiny" href="/ux/explore">Treffer in der Explore →</a>
            <button className="ek-btn ghost tiny">Bearbeiten</button>
          </div>
        </div>
      ))}
      {neuOffen ? (
        <div className="ek-card" style={{ marginTop: 4 }}>
          <b style={{ font: "500 16px var(--font-display)" }}>Neues Suchprofil</b>
          <div style={{ display: "grid", gap: 9, marginTop: 14 }}>
            <input className="ek-input" placeholder="Name, z. B. Altbau Innenstadt" />
            <input className="ek-input" placeholder="Standorte, z. B. 1010, 1040, 1050 Wien" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
              <input className="ek-input" placeholder="Budget bis, z. B. € 900.000" />
              <input className="ek-input" placeholder="Rendite ab, z. B. 3,5 %" />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="ek-btn tiny" onClick={() => setNeuOffen(false)}>Profil anlegen</button>
              <button className="ek-btn ghost tiny" onClick={() => setNeuOffen(false)}>Abbrechen</button>
            </div>
          </div>
        </div>
      ) : (
        <button className="ek-btn ghost" style={{ width: "100%", justifyContent: "center", padding: "15px 20px" }} onClick={() => setNeuOffen(true)}>+ Neues Suchprofil anlegen</button>
      )}
    </div>
  );
}

function EkAngebote({ go }) {
  return (
    <div>
      <span className="ek-mono" style={{ color: "var(--signal-deep)" }}>Angebote</span>
      <h1>Deine Angebote<i>.</i></h1>
      <p className="ek-sub">Alles, was gerade draußen ist, mit Status in Echtzeit. Bei aktiven Angeboten kannst du direkt die nächsten Schritte anstoßen.</p>
      {EK_DATA.angebote.map((a) => (
        <div key={a.id} className="ek-ang" style={a.aktiv ? null : { opacity: .62 }}>
          <div className="top">
            <img src={a.img} alt="" loading="lazy" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <b style={{ font: "500 16px var(--font-display)", letterSpacing: "-.01em", display: "block" }}>{a.t}</b>
              <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{a.ort} · Makler: {a.makler}</span>
            </div>
            <span className={"ek-pill " + a.statusTone}>{a.status}</span>
          </div>
          {a.detail.map(([k, v]) => (
            <div key={k} className="zeile"><span>{k}</span><b>{v}</b></div>
          ))}
          {a.aktiv && (
            <div className="ek-acts">
              <button className="ek-btn tiny">Finanzierung anfragen</button>
              <button className="ek-btn ghost tiny">Anwalt für Verträge</button>
              <button className="ek-btn ghost tiny">Möbel-Empfehlungen</button>
              <button className="ek-btn ghost tiny" onClick={() => go("chats")}>Chat mit {a.makler.split(" ")[0]}</button>
            </div>
          )}
        </div>
      ))}
      <p className="ek-mono" style={{ marginTop: 6 }}>Finanzierung, Rechtsberatung und Einrichtung laufen über geprüfte UNIO-Partner</p>
    </div>
  );
}

function EkChats() {
  const [aktivId, setAktivId] = React.useState(null);
  const [chats, setChats] = React.useState(EK_DATA.chats);
  const [text, setText] = React.useState("");
  const endRef = React.useRef(null);
  const aktiv = chats.find((c) => c.id === aktivId);
  const oeffne = (id) => { setChats((cs) => cs.map((c) => c.id === id ? { ...c, unread: 0 } : c)); setAktivId(id); };
  const senden = () => {
    const t = text.trim(); if (!t || !aktiv) return;
    setChats((cs) => cs.map((c) => c.id === aktiv.id ? { ...c, msgs: [...c.msgs, { ich: true, txt: t, t: "Jetzt" }] } : c));
    setText("");
  };
  React.useEffect(() => { if (endRef.current) endRef.current.scrollIntoView({ block: "end" }); }, [chats, aktivId]);
  const istMobil = window.matchMedia("(max-width:860px)").matches;
  return (
    <div>
      <span className="ek-mono" style={{ color: "var(--signal-deep)" }}>Nachrichten</span>
      <h1>Deine Chats<i>.</i></h1>
      <p className="ek-sub">Direkter Draht zu deinen Maklern und zum UNIO Concierge, alles an einem Ort.</p>
      <div className="ek-chatwrap">
        <div>
          {chats.map((c) => (
            <button key={c.id} className={"ek-chli" + (c.id === aktivId ? " on" : "")} onClick={() => oeffne(c.id)}>
              <img src={c.img} alt="" />
              <span className="n"><b>{c.name}</b><span>{c.msgs[c.msgs.length - 1].txt}</span></span>
              {c.unread > 0 && <span className="ek-unread">{c.unread}</span>}
            </button>
          ))}
        </div>
        {aktiv && (
          <div className="ek-conv">
            <div className="chead">
              {istMobil && <button className="ek-btn ghost tiny" onClick={() => setAktivId(null)} style={{ padding: "7px 12px" }}>←</button>}
              <img src={aktiv.img} alt="" />
              <div><b style={{ font: "500 14.5px var(--font-display)", display: "block" }}>{aktiv.name}</b>
                <span className="ek-mono" style={{ fontSize: 8 }}>{aktiv.rolle}</span></div>
            </div>
            <div className="ek-msgs">
              {aktiv.msgs.map((m, i) => (
                <div key={i} className={"ek-msg " + (m.ich ? "ich" : "er")}>{m.txt}<span className="t">{m.t}</span></div>
              ))}
              <div ref={endRef}></div>
            </div>
            <div className="ek-inp">
              <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && senden()} placeholder="Nachricht schreiben ..." />
              <button className="ek-btn" onClick={senden} style={{ padding: "11px 18px" }}>Senden</button>
            </div>
          </div>
        )}
        {!aktiv && !istMobil && (
          <div className="ek-conv" style={{ display: "grid", placeItems: "center" }}>
            <span className="ek-mono">Chat auswählen</span>
          </div>
        )}
      </div>
    </div>
  );
}

function EkDoks() {
  return (
    <div>
      <span className="ek-mono" style={{ color: "var(--signal-deep)" }}>Dokumente</span>
      <h1>Deine Unterlagen<i>.</i></h1>
      <p className="ek-sub">Alle Dokumente zu deinen Objekten, immer in der aktuellen Version. Dazu deine gekauften Immobilien mit allem, was dazugehört.</p>
      {EK_DATA.dokumente.map((g) => (
        <div key={g.objekt} style={{ marginBottom: 26 }}>
          <EkSectHead k={g.hinweis} h={g.objekt} />
          {g.docs.map(([n, u]) => <EkDok key={n} name={n} unter={u} />)}
        </div>
      ))}
      <EkSectHead k="Dein Eigentum" h="Gekaufte Immobilien" />
      <div className="ek-card" style={{ padding: 0, overflow: "hidden", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px" }}>
          <img src={EK_DATA.gekauft.img} alt="" style={{ width: 64, height: 64, borderRadius: 14, objectFit: "cover" }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <b style={{ font: "500 16px var(--font-display)", display: "block" }}>{EK_DATA.gekauft.t}</b>
            <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{EK_DATA.gekauft.ort}</span>
          </div>
          <span className="ek-pill ok">{EK_DATA.gekauft.seit}</span>
        </div>
        <div style={{ padding: "0 12px 12px" }}>
          {EK_DATA.gekauft.docs.map(([n, u]) => <EkDok key={n} name={n} unter={u} />)}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "6px 4px 2px" }}>
            <button className="ek-btn ghost tiny">Vermietung mit UNIO</button>
            <button className="ek-btn ghost tiny">Marktwert ansehen</button>
            <button className="ek-btn ghost tiny">Hausverwaltung kontaktieren</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EkProfil() {
  const [n1, setN1] = React.useState(true);
  const [n2, setN2] = React.useState(true);
  const [n3, setN3] = React.useState(false);
  return (
    <div style={{ maxWidth: 620 }}>
      <span className="ek-mono" style={{ color: "var(--signal-deep)" }}>Einstellungen</span>
      <h1>Dein Profil<i>.</i></h1>
      <p className="ek-sub">Kontaktdaten, Benachrichtigungen und dein Finanzierungsrahmen.</p>
      <div className="ek-card">
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
          <span className="ek-ava" style={{ width: 52, height: 52, fontSize: 16 }}>{EK_DATA.user.initials}</span>
          <div><b style={{ font: "500 17px var(--font-display)", display: "block" }}>{EK_DATA.user.name}</b>
            <span className="ek-mono">Endkunden-Konto · seit 02/2025</span></div>
        </div>
        <div style={{ display: "grid", gap: 9 }}>
          <input className="ek-input" defaultValue={EK_DATA.user.mail} />
          <input className="ek-input" defaultValue={EK_DATA.user.tel} />
        </div>
      </div>
      <EkSectHead k="Mitteilungen" h="Benachrichtigungen" />
      <div className="ek-card" style={{ paddingTop: 4, paddingBottom: 4 }}>
        {[["Neue Treffer für Suchprofile", "Push und E-Mail, sobald ein Objekt passt", n1, setN1],
          ["Angebots-Updates", "Statusänderungen und Gegenangebote sofort", n2, setN2],
          ["UNIO-Empfehlungen", "Marktberichte und passende Services", n3, setN3]].map(([t, s, v, set]) => (
          <div key={t} className="ek-set" style={t === "UNIO-Empfehlungen" ? { borderBottom: "none" } : null}>
            <div><b>{t}</b><span>{s}</span></div>
            <button className={"ek-sw" + (v ? " on" : "")} onClick={() => set(!v)} aria-label={t}></button>
          </div>
        ))}
      </div>
      <EkSectHead k="Kaufkraft" h="Finanzierungsrahmen" />
      <div className="ek-card">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div><b style={{ font: "500 26px var(--font-display)", letterSpacing: "-.02em" }}>bis € 1,9 Mio</b>
            <span style={{ display: "block", fontSize: 12.5, color: "var(--text-muted)", marginTop: 3 }}>Vorab geprüft mit UNIO-Finanzierungspartner · Stand 07/2026</span></div>
          <button className="ek-btn ghost tiny">Aktualisieren</button>
        </div>
      </div>
      <button className="ek-btn ghost" style={{ marginTop: 22 }}>Abmelden</button>
    </div>
  );
}

/* ---------- Portal-Shell ---------- */
function EndkundePortal({ role, onRole }) {
  const [tab, setTab] = React.useState("start");
  const go = (t) => { setTab(t); window.scrollTo(0, 0); };
  const TABS = [["start", "Start"], ["suche", "Suchen"], ["angebote", "Angebote"], ["chats", "Chats"], ["doks", "Dokumente"], ["profil", "Profil"]];
  let view;
  if (tab === "suche") view = <EkSuche />;
  else if (tab === "angebote") view = <EkAngebote go={go} />;
  else if (tab === "chats") view = <EkChats />;
  else if (tab === "doks") view = <EkDoks />;
  else if (tab === "profil") view = <EkProfil />;
  else view = <EkStart go={go} />;
  return (
    <div className="ek">
      <style>{EK_CSS}</style>
      <header className="ek-top">
        <img src="../../assets/logo/unio-logo-black.svg" alt="UNIO" />
        <nav className="ek-nav">
          {TABS.map(([id, l]) => (
            <button key={id} className={tab === id ? "on" : ""} onClick={() => go(id)}>{l}</button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <window.RoleSwitch role={role} onRole={onRole} />
          <button className="ek-ava" onClick={() => go("profil")} aria-label="Profil">{EK_DATA.user.initials}</button>
        </div>
      </header>
      <main className="ek-main">{view}</main>
      <nav className="ek-tabbar">
        {TABS.slice(0, 5).map(([id, l]) => (
          <button key={id} className={tab === id ? "on" : ""} onClick={() => go(id)}>
            <EkI d={EK_ICONS[id]} s={19} />{l}
          </button>
        ))}
      </nav>
    </div>
  );
}
Object.assign(window, { EndkundePortal });
