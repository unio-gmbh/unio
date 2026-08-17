/* UNIO Endkunden-Portal: 5-Tab-IA (Start, Entdecken, Merkliste, Aktivität, Profil).
   "Ein Zustand, viele Fenster": alle Screens lesen Käuferprofil + Objekt-Beziehungen
   aus dem geteilten localStorage-Contract (dash-ek-basis.jsx).
   Prozesslogik: docs/ENDKUNDEN_PORTAL_PROZESSLOGIK.md */

const { EkSheet, EkSlotPicker, EK_SLOTS_STD, EkAnbotSheet, EkReaktionSheet, EkKaufkraftSheet, EkQuizSheet, EkDokumentSheet, EkPreisarchivSheet, EkVergleichSheet, EkStoryViewer } = window;
const { ekObj, ekEur, ekRendite, ekRate, ekLeistbar, ekFristTage, EK_NK, ekLadeAlles, ekPersist, ekNeuesEvent, ekChatNachricht, ekCta, EK_ZUSTAND_LABEL, EK_STEPS_ABW } = window;

const EK_NUTZER = { name: "Valentina Hofer", initials: "VH", mail: "valentina.hofer@gmail.com", tel: "+43 664 210 44 87" };
const ekObjektUrl = (id) => "/ux/objekt?von=portal&obj=" + id;

/* Aktive Kaufprozesse (fuer Kaufreise-Karte und Zaehler) */
const ekAktiveProzesse = (bez) => Object.entries(bez).filter(([, b]) => ["anbot_aktiv", "gegenangebot", "angenommen", "abwicklung"].includes(b.zustand));

/* ---------- Start (Für dich) ---------- */
function EkStart({ ek, tue, oeffneSheet, go, oeffneKaufreise, oeffneStory }) {
  const prozesse = ekAktiveProzesse(ek.bez);
  const gegen = prozesse.find(([, b]) => b.zustand === "gegenangebot");
  const profile = ek.profil.suchprofile.filter((p) => p.aktiv);
  const neuGesamt = profile.reduce((s, p) => s + (p.neu || 0), 0);
  const ungelesen = ek.events.filter((e) => !e.gelesen).length;
  const HIGHLIGHTS = [
    { id: "albrecht-dg", profil: "Dachgeschoss Wien West", neu: "Vor 2 Std" },
    { id: "facade", profil: "Anlage bis 500k", neu: "Gestern" },
    { id: "beheim2", profil: "Dachgeschoss Wien West", neu: "Vor 3 Tagen" },
  ];
  const kk = ek.profil.kaufkraft;
  const matchId = kk
    ? (["albrecht-dg", "facade", "maxing", "schoenbrunn", "albrecht"].find((id) => ekLeistbar(ekObj(id).preisNum, kk) && !["eigentum", "abgelehnt"].includes((ek.bez[id] || {}).zustand)) || "albrecht")
    : "albrecht-dg";
  const matchObj = ekObj(matchId);
  return (
    <div>
      <span className="ek-mono" style={{ color: "var(--signal-deep)" }}>Willkommen zurück</span>
      <h1>Guten Morgen, Valentina<i>.</i></h1>
      <p className="ek-sub">{neuGesamt} neue Objekte passen zu deinen Suchprofilen{gegen ? ", ein Gegenangebot wartet auf dich" : ""}.</p>

      {prozesse.length > 0 && (
        <button className="ek-kaufreise" onClick={() => oeffneKaufreise(gegen ? gegen[0] : prozesse[0][0])}>
          <img src={ekObj(gegen ? gegen[0] : prozesse[0][0]).img} alt="" />
          <span style={{ flex: 1, minWidth: 0 }}>
            <b>Deine Kaufreise · {prozesse.length} {prozesse.length === 1 ? "Objekt" : "Objekte"}</b>
            <span className="s">{gegen ? "Gegenangebot " + ekEur(gegen[1].anbot.gegen) + " · noch " + ekFristTage(gegen[1].anbot.frist) + " Tage" : "Alles im Plan, nichts offen"}</span>
          </span>
          <span className="ek-pill" style={{ background: "rgba(255,255,255,.22)", borderColor: "rgba(255,255,255,.45)", color: "#FFFFFF" }}>{gegen ? "Reagieren" : "Öffnen"}</span>
        </button>
      )}

      <div className="ek-story">
        <button onClick={oeffneStory}>
          <span className={"ring" + (ek.profil.storyGesehen ? " aus" : "")}><img src="../../assets/img/albrecht.jpg" alt="" /></span>
          <span>Das Albrecht</span>
        </button>
      </div>

      <button className="ek-hero" onClick={() => go("explore")} style={{ marginTop: 6, width: "100%", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", padding: 0 }}>
        <img src="../../assets/img/obenzwei-terrasse.jpg" alt="" />
        <span className="sc" aria-hidden="true"></span>
        <span className="in">
          <span><span className="k">Entdecken · Feed · Liste</span><b style={{ color: "#fff" }}>Explore öffnen</b></span>
          <span className="go">Los geht's →</span>
        </span>
      </button>

      <div className="ek-stats">
        <button className="ek-stat" onClick={() => go("profil")}><b>{profile.length}</b><span>aktive Suchprofile</span></button>
        <button className="ek-stat" onClick={() => prozesse.length ? oeffneKaufreise(prozesse[0][0]) : go("profil")}><b>{prozesse.length}</b><span>Anbote draußen</span></button>
        <button className="ek-stat" onClick={() => go("akt")}><b>{ungelesen}</b><span>neue Ereignisse</span></button>
      </div>

      <div className="ek-secthead">
        <div><span className="ek-mono" style={{ color: "var(--signal-deep)" }}>Kuratiert, einmal pro Woche</span><h2>Dein Match der Woche</h2></div>
      </div>
      <a className="ek-match" href={ekObjektUrl(matchId)}>
        <img src={matchObj.img} alt="" />
        <span className="sc" aria-hidden="true"></span>
        <span className="mk">Match der Woche</span>
        <span className="cap">
          <b>{matchObj.t}</b>
          <span className="why">Passt zu deiner Suche: {matchObj.zi} Zimmer, {matchObj.ort.split(" · ")[1]}{kk ? " · Rate ≈ " + ekEur(ekRate(matchObj.preisNum, kk)) + "/Monat, in deinem Rahmen" : " · unter Budget"}</span>
        </span>
      </a>

      <div className="ek-secthead">
        <div><span className="ek-mono" style={{ color: "var(--signal-deep)" }}>Neu für deine Suche</span><h2>Highlights</h2></div>
        <button className="ek-btn ghost tiny" onClick={() => go("profil")}>Suchprofile</button>
      </div>
      <div className="ek-grid2">
        {HIGHLIGHTS.map((h, i) => {
          const o = ekObj(h.id);
          return (
            <a key={h.id} className={"ek-hl" + (i === 2 ? " dritte" : "")} href={ekObjektUrl(h.id)}>
              <img src={o.img} alt="" loading="lazy" />
              <span className="sc" aria-hidden="true"></span>
              <span className="neu">{h.neu}</span>
              <span className="cap">
                <span className="m">{h.profil}</span>
                <b>{o.t}</b>
                <span className="m">{o.ort}</span>
                <span className="p">{ekEur(o.preisNum)} <span className="ek-rchip">{kk && ekLeistbar(o.preisNum, kk) ? "Leistbar · " + ekEur(ekRate(o.preisNum, kk)) + "/M" : "Rendite " + ekRendite(o) + " %"}</span></span>
              </span>
            </a>
          );
        })}
      </div>

      <div className="ek-secthead">
        <div><span className="ek-mono" style={{ color: "var(--signal-deep)" }}>Echte Verkaufspreise</span><h2>Dein Grätzl</h2></div>
      </div>
      <button className="ek-row" onClick={() => oeffneSheet({ typ: "preisarchiv", bezirk: "1170" })}>
        <img src={ekObj("beheim").img} alt="" />
        <span className="mid"><b>1170 Hernals: 12 Verkäufe, ⌀ € 6.900/m²</b><span className="s">Finale Kaufpreise aus Grundbuchdaten, letzte 12 Monate</span></span>
        <span className="ek-mono">Ansehen →</span>
      </button>
      <p className="ek-mono" style={{ marginTop: 10 }}>Rendite aus UNIO-Vermietdaten · Raten Demo-Rechnung 3,8 % / 30 J. · alles Arbeitsstand</p>
    </div>
  );
}

/* ---------- Merkliste (Collections) ---------- */
function EkMerkliste({ ek, tue, oeffneSheet }) {
  const [offenId, setOffenId] = React.useState(null);
  const [auswahl, setAuswahl] = React.useState([]);
  const coll = ek.coll.find((c) => c.id === offenId);
  const partner = ek.profil.partner;

  if (coll) {
    const toggleAuswahl = (id) => setAuswahl(auswahl.includes(id) ? auswahl.filter((x) => x !== id) : [...auswahl, id].slice(-2));
    return (
      <div>
        <button className="ek-back" onClick={() => { setOffenId(null); setAuswahl([]); }}>← Alle Listen</button>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <h1 style={{ margin: 0 }}>{coll.name}<i>.</i></h1>
          <div style={{ display: "flex", gap: 8 }}>
            {!coll.partner && <button className="ek-btn ghost tiny" onClick={() => oeffneSheet({ typ: "partner", collId: coll.id })}>+ Partner</button>}
            {!coll.makler && <button className="ek-btn ghost tiny" onClick={() => oeffneSheet({ typ: "makler", collId: coll.id })}>Mit Makler teilen</button>}
            {auswahl.length === 2 && <button className="ek-btn tiny" onClick={() => oeffneSheet({ typ: "vergleich", ids: auswahl })}>Vergleichen</button>}
          </div>
        </div>
        <p className="ek-sub" style={{ marginTop: 6 }}>
          {coll.objekte.length} Objekte{coll.partner ? " · geteilt mit " + partner.name : ""}{coll.makler ? " · Lukas kann Vorschläge einspielen" : ""} · Für den Vergleich zwei Objekte antippen (lange Karte).
        </p>
        <div className="ek-collgrid">
          {coll.objekte.map((id) => {
            const o = ekObj(id);
            const komm = (coll.kommentare[id] || []);
            const b = ek.bez[id];
            return (
              <div key={id} className={"ek-objcard" + (auswahl.includes(id) ? " sel" : "")}>
                <a className="bild" href={ekObjektUrl(id)}>
                  <img src={o.img} alt="" loading="lazy" />
                  {coll.makler && komm.some((k) => k.von === "Lukas") && <span className="von">Vorschlag von Lukas · Nur bei UNIO</span>}
                </a>
                <div className="info">
                  <b>{o.t}</b>
                  <span className="m">{o.ort} · {ekEur(o.preisNum)}{b ? " · " + EK_ZUSTAND_LABEL[b.zustand] : ""}</span>
                </div>
                <div className="acts">
                  <button onClick={() => oeffneSheet({ typ: "chat", threadId: id })}>💬 {komm.length || ""} Kommentar{komm.length === 1 ? "" : "e"}</button>
                  <button onClick={() => toggleAuswahl(id)}>{auswahl.includes(id) ? "✓ Ausgewählt" : "Vergleichen"}</button>
                  {coll.partner && komm.some((k) => k.von !== "Du") && <span className="ek-pill hot">{partner.initials} hat reagiert</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <span className="ek-mono" style={{ color: "var(--signal-deep)" }}>Collections</span>
      <h1>Deine Merklisten<i>.</i></h1>
      <p className="ek-sub">Benennbar, teilbar, gemeinsam. Lade deinen Partner ein oder teile eine Liste mit deinem Makler, er ergänzt Off-Market-Vorschläge direkt hinein.</p>
      <div style={{ display: "grid", gap: 12 }}>
        {ek.coll.map((c) => {
          const cover = ekObj(c.objekte[0] || "penthouse");
          return (
            <button key={c.id} className="ek-collcard" onClick={() => setOffenId(c.id)}>
              <img src={cover.img} alt="" />
              <span className="sc" aria-hidden="true"></span>
              <span className="cap">
                <b>{c.name}</b>
                <span>{c.objekte.length} Objekte{c.partner ? " · mit " + (ek.profil.partner || {}).name : ""}{c.makler ? " · mit Makler" : ""}</span>
              </span>
            </button>
          );
        })}
        <button className="ek-btn ghost" style={{ width: "100%", justifyContent: "center", padding: "15px 20px" }}
          onClick={() => tue((d) => { d.coll.push({ id: "c" + Date.now(), name: "Neue Liste", objekte: [], partner: false, makler: false, kommentare: {} }); })}>+ Neue Liste anlegen</button>
      </div>
    </div>
  );
}

/* ---------- Aktivität (ein Stream: Ereignisse + Chats) ---------- */
function EkAktivitaet({ ek, tue, oeffneSheet, oeffneKaufreise, chatId, setChatId }) {
  const [seg, setSeg] = React.useState(chatId ? "chats" : "alle");
  React.useEffect(() => { if (chatId) setSeg("chats"); }, [chatId]);
  const [text, setText] = React.useState("");
  const endRef = React.useRef(null);
  const chat = chatId ? ek.chats[chatId] : null;
  const istMobil = window.matchMedia("(max-width:860px)").matches;
  React.useEffect(() => { if (endRef.current) endRef.current.scrollIntoView({ block: "end" }); }, [ek.chats, chatId]);
  React.useEffect(() => { tue((d) => { d.events.forEach((e) => { e.gelesen = true; }); }); }, []);

  const senden = () => {
    const t = text.trim(); if (!t || !chatId) return;
    tue((d) => ekChatNachricht(d, chatId, true, t));
    setText("");
  };
  const aktion = (ev) => {
    if (ev.typ === "gegenangebot") return oeffneSheet({ typ: "reaktion", objId: ev.objId });
    if (ev.typ === "feedback") return oeffneSheet({ typ: "feedback", objId: ev.objId });
    if (ev.typ === "termin") return oeffneSheet({ typ: "termindetail", objId: ev.objId });
    if (ev.typ === "projekt") return oeffneSheet({ typ: "story" });
    if (ev.typ === "graetzl") return oeffneSheet({ typ: "preisarchiv", bezirk: ekObj(ev.objId).bezirk });
    if (ev.typ === "kaufkraft") return oeffneSheet({ typ: "kaufkraft" });
    if (ev.typ === "phase" || ev.typ === "anbot") return oeffneKaufreise(ev.objId);
    window.location.href = ekObjektUrl(ev.objId);
  };
  const chips = chatId && chatId !== "concierge" ? (() => {
    const b = ek.bez[chatId]; const out = [];
    if (b && (b.zustand === "termin")) out.push(["Termin ändern", () => oeffneSheet({ typ: "slot", objId: chatId })]);
    if (b && ["anbot_aktiv", "gegenangebot", "angenommen", "abwicklung"].includes(b.zustand)) out.push(["Anbot ansehen", () => oeffneKaufreise(chatId)]);
    out.push(["Unterlagen anfordern", () => tue((d) => ekChatNachricht(d, chatId, true, "Könnten Sie mir bitte die vollständigen Unterlagen freischalten?"))]);
    return out;
  })() : chatId === "concierge" ? [["Finanzierung starten", () => oeffneSheet({ typ: "kaufkraft" })]] : [];

  return (
    <div>
      <span className="ek-mono" style={{ color: "var(--signal-deep)" }}>Aktivität</span>
      <h1>Was sich getan hat<i>.</i></h1>
      <p className="ek-sub">Ereignisse und Nachrichten an einem Ort. Jede Karte hat genau eine Aktion.</p>
      <div className="ek-seg">
        {[["alle", "Alle"], ["chats", "Nachrichten"]].map(([id, l]) => (
          <button key={id} className={seg === id ? "on" : ""} onClick={() => { setSeg(id); setChatId(null); }}>{l}</button>
        ))}
      </div>

      {seg === "alle" && (
        <div>
          {ek.events.map((ev) => (
            <button key={ev.id} className={"ek-ev" + (ev.gelesen ? "" : " frisch")} onClick={() => aktion(ev)}>
              <img src={ekObj(ev.objId).img} alt="" loading="lazy" />
              <span className="mid"><b>{ev.titel}</b><span>{ev.sub}</span></span>
              <span className="zeit">{ev.zeit}</span>
            </button>
          ))}
          <p className="ek-mono" style={{ textAlign: "center", marginTop: 18 }}>Du bist auf dem Stand ✓</p>
        </div>
      )}

      {seg === "chats" && (
        <div className="ek-chatwrap">
          <div>
            {Object.entries(ek.chats).map(([id, c]) => (
              <button key={id} className={"ek-chli" + (id === chatId ? " on" : "")} onClick={() => setChatId(id)}>
                <img src={c.img} alt="" />
                <span className="n"><b>{c.name}</b><span>{c.msgs.length ? c.msgs[c.msgs.length - 1].txt : c.rolle}</span></span>
              </button>
            ))}
          </div>
          {chat && (
            <div className="ek-conv">
              <div className="chead">
                {istMobil && <button className="ek-btn ghost tiny" onClick={() => setChatId(null)} style={{ padding: "7px 12px" }}>←</button>}
                <img src={chat.img} alt="" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <b style={{ font: "500 14.5px var(--font-display)", display: "block" }}>{chat.name}</b>
                  <span className="ek-mono" style={{ fontSize: 8 }}>{chat.rolle} · antwortet ⌀ {chat.antwortzeit}</span>
                </div>
              </div>
              <div className="ek-msgs">
                {chat.msgs.map((m, i) => (
                  <div key={i} className={"ek-msg " + (m.ich ? "ich" : "er")}>{m.txt}<span className="t">{m.t}</span></div>
                ))}
                <div ref={endRef}></div>
              </div>
              {chips.length > 0 && <div className="ek-chips">{chips.map(([l, fn]) => <button key={l} onClick={fn}>{l}</button>)}</div>}
              <div className="ek-inp">
                <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && senden()} placeholder="Nachricht schreiben ..." />
                <button className="ek-btn" onClick={senden} style={{ padding: "11px 18px" }}>Senden</button>
              </div>
            </div>
          )}
          {!chat && !istMobil && <div className="ek-conv" style={{ display: "grid", placeItems: "center" }}><span className="ek-mono">Chat auswählen</span></div>}
        </div>
      )}
    </div>
  );
}

/* ---------- Kaufreise (Sendungsverfolgung bis Grundbuch) ---------- */
function EkKaufreise({ ek, tue, objId, oeffneSheet, zurueck, setChatId, go }) {
  const o = ekObj(objId); const b = ek.bez[objId];
  if (!b) return null;
  const prozesse = ekAktiveProzesse(ek.bez);
  const inAbwicklung = b.zustand === "angenommen" || b.zustand === "abwicklung";
  const phase = b.phase || 0;
  const kaufpreis = b.anbot ? (b.anbot.angenommen || b.anbot.gegen || b.anbot.betrag) : o.preisNum;
  const PERSONEN = [
    { n: "Dr. Weiss & Partner", r: "Vertragserrichtung", img: "../../assets/team/portrait-07.jpg" },
    { n: "Dr. Weiss & Partner", r: "Treuhänder", img: "../../assets/team/portrait-07.jpg" },
    { n: "Dr. Weiss & Partner", r: "Grundbuch", img: "../../assets/team/portrait-07.jpg" },
    { n: "Lukas Brandtner", r: "Makler · Übergabe", img: "../../assets/team/portrait-02.jpg" },
  ];
  const TASKS = ["Kaufvertragsentwurf freigeben", "Treuhanderlag bestätigen", "Grundbucheintragung läuft, nichts zu tun", "Übergabetermin wählen"];
  const naechstePhase = () => tue((d) => {
    const db = d.bez[objId];
    if (phase === 3) { db.zustand = "eigentum"; ekNeuesEvent(d, "phase", objId, "Schlüsselübergabe erledigt", o.t + " gehört dir. Willkommen zuhause!"); }
    else { db.zustand = "abwicklung"; db.phase = phase + 1; ekNeuesEvent(d, "phase", objId, EK_STEPS_ABW[phase] + " abgeschlossen", o.t + " · nächster Schritt: " + EK_STEPS_ABW[phase + 1]); }
  });
  return (
    <div>
      <button className="ek-back" onClick={zurueck}>← Start</button>
      {prozesse.length > 1 && (
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 14 }}>
          {prozesse.map(([id]) => (
            <button key={id} className={"ek-btn tiny " + (id === objId ? "" : "ghost")} onClick={() => go(id)}>{ekObj(id).t.split(" · ")[0]}</button>
          ))}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <img src={o.img} alt="" style={{ width: 64, height: 64, borderRadius: 15, objectFit: "cover" }} />
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ margin: 0 }}>{o.t}<i>.</i></h1>
          <p className="ek-sub" style={{ margin: "4px 0 0" }}>{o.ort} · {ekEur(kaufpreis)}</p>
        </div>
        <span className={"ek-pill " + (b.zustand === "gegenangebot" ? "hot" : inAbwicklung ? "ok" : "")}>{EK_ZUSTAND_LABEL[b.zustand]}</span>
      </div>

      {!inAbwicklung && b.anbot && (
        <div className="ek-card" style={{ marginTop: 20 }}>
          <div className="ek-secthead" style={{ margin: "0 0 10px" }}><h2>Dein Anbot</h2><span className="ek-mono">{b.zustand === "gegenangebot" ? "Frist: noch " + ekFristTage(b.anbot.frist) + " Tage" : "Beim Verkäufer"}</span></div>
          {b.anbot.verlauf.map((v, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--hairline-dark)", fontSize: 14 }}>
              <span style={{ color: "var(--text-muted)" }}>{v.wer === "du" ? "Dein Anbot" : "Gegenangebot Verkäufer"} · {v.zeit}</span>
              <b style={{ fontWeight: 500 }}>{ekEur(v.betrag)}</b>
            </div>
          ))}
          <div style={{ display: "flex", gap: 9, marginTop: 14, flexWrap: "wrap" }}>
            {b.zustand === "gegenangebot"
              ? <button className="ek-btn signal" onClick={() => oeffneSheet({ typ: "reaktion", objId })}>Auf Gegenangebot reagieren</button>
              : <span className="ek-pill">In Prüfung · Antwort erwartet in 2 bis 4 Tagen</span>}
            <button className="ek-btn ghost tiny" onClick={() => setChatId(objId)}>Chat mit Lukas</button>
          </div>
        </div>
      )}

      {inAbwicklung && (
        <div className="ek-card" style={{ marginTop: 20 }}>
          <div className="ek-secthead" style={{ margin: "0 0 4px" }}><h2>Abwicklung</h2><span className="ek-mono">Der standardisierte Weg bis ins Grundbuch</span></div>
          <div className="ek-stepper">
            {EK_STEPS_ABW.map((s, i) => (
              <React.Fragment key={s}>
                {i > 0 && <span className={"lin" + (i <= phase ? " an" : "")}></span>}
                <span className={"st" + (i < phase ? " done" : i === phase ? " now" : "")}><i>{i < phase ? "✓" : i + 1}</i><span>{s}</span></span>
              </React.Fragment>
            ))}
          </div>
          <div className="ek-task">
            <div className="ek-person">
              <img src={PERSONEN[phase].img} alt="" />
              <div><b>{PERSONEN[phase].n}</b><span>{PERSONEN[phase].r} · zuständig</span></div>
            </div>
            {phase === 3
              ? (b.uebergabe
                ? <button className="ek-btn tiny" onClick={naechstePhase}>Demo: Übergabe abschließen · {b.uebergabe}</button>
                : <button className="ek-btn tiny" onClick={() => oeffneSheet({ typ: "slot", objId, zweck: "uebergabe" })}>Übergabetermin wählen</button>)
              : phase === 2
                ? <button className="ek-btn ghost tiny" onClick={naechstePhase}>Demo: Eintragung abschließen</button>
                : <button className="ek-btn tiny" onClick={naechstePhase}>{TASKS[phase]}</button>}
          </div>
        </div>
      )}

      <div className="ek-card" style={{ marginTop: 14 }}>
        <div className="ek-secthead" style={{ margin: "0 0 8px" }}><h2>Was kommt dazu</h2><span className="ek-mono">Nebenkosten, vorweg gerechnet</span></div>
        {EK_NK.map(([n, f]) => (
          <div key={n} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--hairline-dark)", fontSize: 13.5 }}>
            <span style={{ color: "var(--text-muted)" }}>{n}</span><b style={{ fontWeight: 500 }}>{ekEur(kaufpreis * f)}</b>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", fontSize: 14.5 }}>
          <b style={{ fontWeight: 500 }}>Gesamt inkl. Kaufpreis</b><b style={{ fontWeight: 500 }}>{ekEur(kaufpreis * 1.102)}</b>
        </div>
        {ek.profil.kaufkraft && (
          <p style={{ margin: "9px 0 0", fontSize: 12.5, color: ekLeistbar(kaufpreis, ek.profil.kaufkraft) ? "#2E7D46" : "#B84A00" }}>
            {ekLeistbar(kaufpreis, ek.profil.kaufkraft)
              ? "✓ In deinem Rahmen: Rate ≈ " + ekEur(ekRate(kaufpreis, ek.profil.kaufkraft)) + "/Monat" + (ek.profil.kaufkraft.status === "verifiziert" ? " · Finanzierung verifiziert" : "")
              : "Über deinem Rahmen (Rate ≈ " + ekEur(ekRate(kaufpreis, ek.profil.kaufkraft)) + "/Monat). Der Concierge prüft gern Alternativen."}
          </p>
        )}
      </div>

      <div className="ek-card" style={{ marginTop: 14 }}>
        <div className="ek-secthead" style={{ margin: "0 0 8px" }}><h2>Dokumente</h2><span className="ek-mono">Entsperren sich mit dem Fortschritt</span></div>
        {[["Kaufanbot", "Version 2", true],
          ["Kaufvertragsentwurf", "Dr. Weiss & Partner", inAbwicklung],
          ["Treuhandbestätigung", "nach Erlag", inAbwicklung && phase >= 2],
          ["Grundbuchauszug (neu)", "nach Eintragung", inAbwicklung && phase >= 3]].map(([n, u, frei]) => (
          <button key={n} className="ek-row" style={{ marginBottom: 8, opacity: frei ? 1 : .5, padding: "12px 14px" }} disabled={!frei}
            onClick={() => oeffneSheet({ typ: "dokument", name: n, objId, unter: u })}>
            <span className="mid"><b style={{ fontSize: 14 }}>{n}</b><span className="s">{u}</span></span>
            <span className="ek-mono">{frei ? "Ansehen →" : "Gesperrt"}</span>
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        <button className="ek-btn ghost tiny" onClick={() => oeffneSheet({ typ: "kaufkraft" })}>{ek.profil.kaufkraft && ek.profil.kaufkraft.status !== "selbst" ? "Finanzierung: " + (ek.profil.kaufkraft.status === "verifiziert" ? "verifiziert ✓" : "in Prüfung") : "Finanzierung fixieren"}</button>
        <button className="ek-btn ghost tiny" onClick={() => setChatId("concierge")}>Anwalt und Fragen: Concierge</button>
      </div>
      <p className="ek-mono" style={{ marginTop: 14 }}>Demo · Fristen und Rechtsschritte Arbeitsstand, keine Rechtsberatung</p>
    </div>
  );
}

/* ---------- Profil ---------- */
function EkProfil({ ek, tue, oeffneSheet, setChatId, go, onRole }) {
  const p = ek.profil;
  const kk = p.kaufkraft;
  const eigentum = Object.entries(ek.bez).filter(([, b]) => b.zustand === "eigentum");
  const checks = [
    ["Suchprofil angelegt", p.suchprofile.length > 0],
    ["Kaufkraft hinterlegt", !!kk],
    ["Partner eingeladen", !!p.partner],
    ["Erste Besichtigung", Object.values(ek.bez).some((b) => ["termin", "besichtigt", "anbot_aktiv", "gegenangebot", "angenommen", "abwicklung", "eigentum"].includes(b.zustand))],
  ];
  const done = checks.filter(([, x]) => x).length;
  const R = 26, U = 2 * Math.PI * R;
  return (
    <div style={{ maxWidth: 640 }}>
      <span className="ek-mono" style={{ color: "var(--signal-deep)" }}>Profil</span>
      <h1>{EK_NUTZER.name}<i>.</i></h1>
      <p className="ek-sub">Suchprofile, Kaufkraft, Dokumente und Einstellungen.</p>

      <div className="ek-card">
        <div className="ek-ring">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r={R} fill="none" stroke="var(--hairline-dark)" strokeWidth="5" />
            <circle cx="32" cy="32" r={R} fill="none" stroke="var(--signal)" strokeWidth="5" strokeLinecap="round"
              strokeDasharray={U} strokeDashoffset={U * (1 - done / checks.length)} transform="rotate(-90 32 32)" />
            <text x="32" y="37" textAnchor="middle" style={{ font: "600 14px var(--font-display)", fill: "var(--ink)" }}>{done}/4</text>
          </svg>
          <div style={{ flex: 1 }}>
            <b style={{ font: "500 15.5px var(--font-display)" }}>Bereit zum Kauf</b>
            {checks.map(([l, x]) => (
              <div key={l} className="li"><span style={{ color: x ? "#2E7D46" : "var(--text-muted)" }}>{x ? "✓" : "○"}</span>{l}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="ek-secthead"><h2>Suchprofile</h2><button className="ek-btn ghost tiny" onClick={() => oeffneSheet({ typ: "quiz" })}>+ Neues Profil</button></div>
      {p.suchprofile.map((sp) => (
        <div key={sp.id} className="ek-sp">
          <div className="head">
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <b>{sp.name}</b>
              {sp.neu > 0 && sp.aktiv && <span className="ek-pill hot">{sp.neu} neu</span>}
              <span className="ek-pill">{sp.treffer} Treffer</span>
            </div>
            <button className={"ek-sw" + (sp.aktiv ? " on" : "")} aria-label="Profil aktiv"
              onClick={() => tue((d) => { const x = d.profil.suchprofile.find((y) => y.id === sp.id); x.aktiv = !x.aktiv; })}></button>
          </div>
          <div className="params">{sp.params.map((x) => <span key={x} className="ek-pill" style={{ fontSize: 9, padding: "6px 11px" }}>{x}</span>)}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap", alignItems: "center" }}>
            <button className="ek-btn tiny" onClick={() => go("explore")}>Treffer in der Explore →</button>
            <button className="ek-btn ghost tiny" onClick={() => oeffneSheet({ typ: "quiz", profilId: sp.id })}>Bearbeiten</button>
            <span className="ek-mono" style={{ marginLeft: "auto" }}>Alerts:</span>
            {["sofort", "taeglich", "aus"].map((f) => (
              <button key={f} className={"ek-btn tiny " + (sp.frequenz === f ? "" : "ghost")} style={{ padding: "6px 11px", fontSize: 10.5 }}
                onClick={() => tue((d) => { const x = d.profil.suchprofile.find((y) => y.id === sp.id); x.frequenz = f; })}>{f === "sofort" ? "Sofort" : f === "taeglich" ? "Täglich" : "Aus"}</button>
            ))}
          </div>
        </div>
      ))}

      <div className="ek-secthead"><h2>Kaufkraft</h2></div>
      <div className="ek-card">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <b style={{ font: "500 26px var(--font-display)", letterSpacing: "-.02em" }}>{kk ? "bis " + ekEur(kk.budget) : "Noch nicht hinterlegt"}</b>
            <span style={{ display: "block", fontSize: 12.5, color: "var(--text-muted)", marginTop: 3 }}>
              {kk ? (kk.status === "verifiziert" ? "Verifiziert durch UNIO-Finanzierungspartner ✓" : kk.status === "pruefung" ? "Wird gerade geprüft, Antwort im Concierge-Chat" : "Selbstangabe, bleibt auf deinem Gerät") : "Damit zeigen wir dir nur Leistbares, inklusive Nebenkosten"}
            </span>
          </div>
          <button className="ek-btn ghost tiny" onClick={() => oeffneSheet({ typ: "kaufkraft" })}>{kk ? "Anpassen" : "Jetzt hinterlegen"}</button>
        </div>
      </div>

      <div className="ek-secthead"><h2>Haushalt</h2></div>
      <div className="ek-card">
        {p.partner ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="ek-ava" style={{ background: "var(--ink)", color: "var(--paper)" }}>{p.partner.initials}</span>
            <div style={{ flex: 1 }}><b style={{ font: "500 14.5px var(--font-display)" }}>{p.partner.name}</b>
              <span style={{ display: "block", fontSize: 12.5, color: "var(--text-muted)" }}>Sieht geteilte Listen, kann kommentieren und herzen</span></div>
            <button className="ek-btn ghost tiny" onClick={() => tue((d) => { d.profil.partner = null; })}>Entfernen</button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between", flexWrap: "wrap" }}>
            <span style={{ fontSize: 13.5, color: "var(--text-muted)" }}>Über 60 % suchen zu zweit. Lade deinen Partner ein.</span>
            <button className="ek-btn tiny" onClick={() => oeffneSheet({ typ: "partner" })}>+ Partner einladen</button>
          </div>
        )}
      </div>

      {eigentum.length > 0 && <React.Fragment>
        <div className="ek-secthead"><h2>Dein Eigentum</h2></div>
        {eigentum.map(([id]) => {
          const o = ekObj(id);
          return (
            <div key={id} className="ek-card" style={{ padding: 0, overflow: "hidden", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px" }}>
                <img src={o.img} alt="" style={{ width: 58, height: 58, borderRadius: 13, objectFit: "cover" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <b style={{ font: "500 15.5px var(--font-display)", display: "block" }}>{o.t}</b>
                  <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{o.ort} · Marktwert heute ≈ {ekEur(o.preisNum * 1.06)} (+6 % seit Kauf)</span>
                </div>
                <span className="ek-pill ok">Eigentum</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "0 16px 14px" }}>
                <button className="ek-btn ghost tiny" onClick={() => setChatId("concierge")}>Vermietung mit UNIO</button>
                <button className="ek-btn ghost tiny" onClick={() => oeffneSheet({ typ: "preisarchiv", bezirk: o.bezirk })}>Marktwert im Grätzl</button>
              </div>
            </div>
          );
        })}
      </React.Fragment>}

      <div className="ek-secthead"><h2>Dokumente</h2><span className="ek-mono">Pro Objekt · entsperren sich mit dem Fortschritt</span></div>
      {(() => {
        const gruppen = Object.entries(ek.bez).filter(([, b]) => ["anbot_aktiv", "gegenangebot", "angenommen", "abwicklung", "eigentum"].includes(b.zustand));
        if (gruppen.length === 0) return <div className="ek-card"><span style={{ fontSize: 13.5, color: "var(--text-muted)" }}>Noch keine Dokumente. Sie erscheinen hier, sobald du ein Anbot legst.</span></div>;
        return gruppen.map(([id, b]) => {
          const o = ekObj(id);
          return (
            <div key={id} className="ek-card" style={{ padding: "14px 16px", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 10 }}>
                <img src={o.img} alt="" style={{ width: 38, height: 38, borderRadius: 10, objectFit: "cover" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <b style={{ font: "500 14.5px var(--font-display)", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.t}</b>
                </div>
                <span className={"ek-pill " + (b.zustand === "eigentum" ? "ok" : "hot")}>{window.EK_ZUSTAND_LABEL[b.zustand]}</span>
              </div>
              <div style={{ display: "grid", gap: 6 }}>
                {window.ekDokumente(b.zustand, b.phase).map(([n, u]) => (
                  <button key={n} className="ek-row" style={{ marginBottom: 0, padding: "10px 12px" }} onClick={() => oeffneSheet({ typ: "dokument", name: n, objId: id, unter: u })}>
                    <span className="mid"><b style={{ fontSize: 13.5 }}>{n}</b><span className="s">{u}</span></span>
                    <span className="ek-mono">Ansehen →</span>
                  </button>
                ))}
              </div>
            </div>
          );
        });
      })()}

      <div className="ek-secthead"><h2>Benachrichtigungen</h2></div>
      <div className="ek-card" style={{ paddingTop: 4, paddingBottom: 4 }}>
        {[["preis", "Preisänderungen gemerkter Objekte", "Sofort-Push"],
          ["partner", "Partner-Aktivität in Listen", "Täglicher Digest"],
          ["projekt", "Baufortschritt gefolgter Projekte", "Digest"],
          ["graetzl", "Verkäufe in deinem Grätzl", "Wöchentlicher Digest"]].map(([k, t, s]) => (
          <div key={k} className="ek-set">
            <div><b>{t}</b><span>{s}</span></div>
            <button className={"ek-sw" + (p.ntypen[k] ? " on" : "")} aria-label={t}
              onClick={() => tue((d) => { d.profil.ntypen[k] = !d.profil.ntypen[k]; })}></button>
          </div>
        ))}
        <div className="ek-set">
          <div><b>Anbot- und Kaufreise-Updates</b><span>Sofort-Push + E-Mail · transaktional, nicht abschaltbar</span></div>
          <span className="ek-pill ok">Immer an</span>
        </div>
      </div>

      <div className="ek-secthead"><h2>Konto</h2></div>
      <div className="ek-card" style={{ display: "grid", gap: 9 }}>
        <input className="ek-input" defaultValue={EK_NUTZER.mail} />
        <input className="ek-input" defaultValue={EK_NUTZER.tel} />
      </div>
      <button className="ek-btn ghost" style={{ marginTop: 18 }} onClick={() => onRole("makler")}>Abmelden</button>
    </div>
  );
}

/* ---------- Portal-Shell ---------- */
function EndkundePortal({ role, onRole }) {
  const [ek, setEk] = React.useState(ekLadeAlles);
  const [tab, setTab] = React.useState("start");
  const [sheet, setSheet] = React.useState(null);
  const [kaufreiseObj, setKaufreiseObj] = React.useState(null);
  const [chatId, setChatIdRaw] = React.useState(null);
  const [story, setStory] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  const tue = (fn) => setEk((prev) => { const d = JSON.parse(JSON.stringify(prev)); fn(d); ekPersist(d); return d; });
  const go = (t) => { setTab(t); setKaufreiseObj(null); window.scrollTo(0, 0); };
  const setChatId = (id) => { setChatIdRaw(id); if (id) { setTab("akt"); setKaufreiseObj(null); } window.scrollTo(0, 0); };
  const oeffneKaufreise = (objId) => { setTab("start"); setKaufreiseObj(objId); window.scrollTo(0, 0); };
  const zeigToast = (t) => { setToast(t); setTimeout(() => setToast(null), 2600); };
  const oeffneSheet = (s) => { if (s.typ === "story") setStory(true); else if (s.typ === "chat") setChatId(s.threadId); else setSheet(s); };
  const schliesse = () => setSheet(null);

  /* Deep-Links von Objektseite/Explore + Onboarding (einmalig, ueberspringbar) */
  React.useEffect(() => {
    const q = window.location.search;
    const kr = (q.match(/[?&]kaufreise=([a-z0-9-]+)/) || [])[1];
    const tb = (q.match(/[?&]tab=([a-z]+)/) || [])[1];
    const ch = (q.match(/[?&]chat=([a-z0-9-]+)/) || [])[1];
    if (kr) setKaufreiseObj(kr);
    else if (tb && ["start", "merk", "akt", "profil"].includes(tb)) setTab(tb);
    if (ch) setChatIdRaw(ch);
    if (kr || tb || ch) { if (!ek.profil.onboarding) tue((d) => { d.profil.onboarding = true; }); }
    else if (!ek.profil.onboarding) setSheet({ typ: "quiz", onboarding: true });
  }, []);

  const quizFertig = (q) => {
    tue((d) => {
      d.profil.onboarding = true;
      if (sheet && sheet.profilId) {
        const sp = d.profil.suchprofile.find((x) => x.id === sheet.profilId);
        sp.params = [q.bez.join(", ") + " Wien", q.zi + " Zimmer", "bis " + ekEur(q.budget), q.typ === "anlage" ? "Rendite zählt" : "Eigennutzung", q.stil || "offen"];
        sp.typ = q.typ;
      } else if (!sheet || !sheet.onboarding || d.profil.suchprofile.length === 0) {
        d.profil.suchprofile.push({ id: Date.now(), name: (q.typ === "anlage" ? "Anlage " : "") + (q.bez[0] ? "Wien " + q.bez[0] : "Wien"), aktiv: true, typ: q.typ, frequenz: "sofort", params: [q.bez.join(", ") + " Wien", q.zi + " Zimmer", "bis " + ekEur(q.budget), q.stil || "offen"], treffer: 12, neu: 12 });
      }
    });
    schliesse(); zeigToast("14 Objekte passen zu dir");
  };

  const anbotSenden = (objId, betrag) => {
    tue((d) => {
      const alt = d.bez[objId] || {};
      d.bez[objId] = { ...alt, zustand: "anbot_aktiv", anbot: { betrag, frist: new Date(Date.now() + 10 * 86400000).toISOString(), gegen: null, verlauf: [...(alt.anbot ? alt.anbot.verlauf : []), { wer: "du", betrag, zeit: "Jetzt" }] } };
      ekNeuesEvent(d, "anbot", objId, "Anbot übermittelt", ekObj(objId).t + " · " + ekEur(betrag) + " · 10 Tage bindend");
      const verif = d.profil.kaufkraft && d.profil.kaufkraft.status === "verifiziert";
      ekChatNachricht(d, objId, false, "Ihr Anbot über " + ekEur(betrag) + " ist eingegangen" + (verif ? ", inklusive Ihres verifizierten Finanzierungs-Badges. Das erhöht die Annahme-Wahrscheinlichkeit deutlich" : "") + ". Ich lege es dem Verkäufer heute noch vor.");
    });
    schliesse(); zeigToast("Anbot übermittelt · 10 Tage bindend");
  };

  const sheetInhalt = () => {
    if (!sheet) return null;
    const s = sheet;
    if (s.typ === "quiz") return <EkQuizSheet profil={s.profilId} kaufkraft={ek.profil.kaufkraft} onFertig={quizFertig} onSkip={() => { tue((d) => { d.profil.onboarding = true; }); schliesse(); }} />;
    if (s.typ === "kaufkraft") return <EkKaufkraftSheet ek={ek}
      onSpeichern={(kk) => { tue((d) => { d.profil.kaufkraft = kk; const n = Object.values(window.EK_KATALOG).filter((o) => ekLeistbar(o.preisNum, kk)).length; ekNeuesEvent(d, "kaufkraft", "maxing", "Kaufkraft aktualisiert: bis " + ekEur(kk.budget), n + " Objekte in deinem Feed sind damit leistbar"); }); schliesse(); zeigToast("Kaufkraft gespeichert · Feed sortiert sich neu"); }}
      onPruefen={(kk) => { tue((d) => { d.profil.kaufkraft = kk; ekChatNachricht(d, "concierge", true, "Ich möchte meine Finanzierung prüfen lassen. Budget laut Selbstangabe: " + ekEur(kk.budget) + "."); ekChatNachricht(d, "concierge", false, "Gern! Ich habe Ihre Daten an unseren Finanzierungspartner übergeben. Sie hören binnen 24 h von uns, die Indikation liegt aktuell bei 3,4 % effektiv."); }); schliesse(); setChatId("concierge"); }} />;
    if (s.typ === "anbot") return <EkAnbotSheet objId={s.objId} vorschlag={s.vorschlag} ek={ek} onSenden={(b) => anbotSenden(s.objId, b)} />;
    if (s.typ === "reaktion") return <EkReaktionSheet objId={s.objId} ek={ek}
      onAnnehmen={() => { tue((d) => { const b = d.bez[s.objId]; b.zustand = "abwicklung"; b.phase = 0; b.anbot.angenommen = b.anbot.gegen; ekNeuesEvent(d, "phase", s.objId, "Einigung erzielt", ekObj(s.objId).t + " · " + ekEur(b.anbot.gegen) + " · Abwicklung startet"); ekChatNachricht(d, s.objId, false, "Wunderbar! Ich informiere den Verkäufer. Nächster Schritt: Kaufvertragsentwurf von Dr. Weiss & Partner, kommt in 3 bis 5 Werktagen hierher."); }); schliesse(); oeffneKaufreise(s.objId); zeigToast("Einigung! Die Abwicklung startet"); }}
      onNeuesAnbot={() => { const b = ek.bez[s.objId]; setSheet({ typ: "anbot", objId: s.objId, vorschlag: Math.round((b.anbot.betrag + b.anbot.gegen) / 2 / 1000) * 1000 }); }}
      onAblehnen={() => { tue((d) => { d.bez[s.objId].zustand = "abgelehnt"; ekNeuesEvent(d, "treffer", "albrecht-dg", "Suche fortgesetzt", "3 ähnliche Objekte warten in deinem Feed"); }); schliesse(); zeigToast("Abgelehnt · deine Suche läuft weiter"); }} />;
    if (s.typ === "slot") return <EkSlotPicker titel={s.zweck === "uebergabe" ? "Übergabetermin wählen" : "Besichtigung buchen"} slots={EK_SLOTS_STD}
      onWahl={(t) => { tue((d) => { if (s.zweck === "uebergabe") { d.bez[s.objId].uebergabe = t; ekNeuesEvent(d, "termin", s.objId, "Übergabe fixiert", t); } else { d.bez[s.objId] = { ...(d.bez[s.objId] || {}), zustand: "termin", termin: t }; ekNeuesEvent(d, "termin", s.objId, "Besichtigung fixiert", ekObj(s.objId).t + " · " + t); } }); schliesse(); zeigToast("Termin fixiert: " + t); }}
      onAnders={() => { schliesse(); setChatId(s.objId); }} />;
    if (s.typ === "termindetail") { const b = ek.bez[s.objId]; return (
      <React.Fragment>
        <h3>Besichtigung</h3>
        <p className="sub">{ekObj(s.objId).t} · {b && b.termin}</p>
        <div style={{ display: "grid", gap: 9 }}>
          <button className="ek-btn" onClick={() => { schliesse(); setChatId(s.objId); }}>Frage an den Makler</button>
          <button className="ek-btn ghost" onClick={() => setSheet({ typ: "slot", objId: s.objId })}>Verschieben</button>
          <button className="ek-btn ghost" style={{ color: "var(--text-muted)" }} onClick={() => { tue((d) => { d.bez[s.objId].zustand = "gemerkt"; d.bez[s.objId].termin = null; }); schliesse(); zeigToast("Termin abgesagt"); }}>Absagen</button>
        </div>
      </React.Fragment>); }
    if (s.typ === "feedback") return (
      <React.Fragment>
        <h3>Wie war {ekObj(s.objId).t}?</h3>
        <p className="sub">Drei Antworten, zehn Sekunden. Dein Makler plant damit den nächsten Schritt.</p>
        <div className="ek-quizopts">
          {["Will ich haben", "Interessant, aber Fragen", "Nichts für mich"].map((x) => (
            <button key={x} onClick={() => { tue((d) => { ekChatNachricht(d, s.objId, true, "Besichtigungs-Feedback: " + x); }); if (x === "Will ich haben") { setSheet({ typ: "anbot", objId: s.objId }); } else { schliesse(); zeigToast("Feedback gesendet"); } }}>{x}</button>
          ))}
        </div>
      </React.Fragment>);
    if (s.typ === "dokument") return <EkDokumentSheet name={s.name} objId={s.objId} unter={s.unter} />;
    if (s.typ === "preisarchiv") return <EkPreisarchivSheet bezirk={s.bezirk} kk={ek.profil.kaufkraft} />;
    if (s.typ === "vergleich") return <EkVergleichSheet ids={s.ids} ek={ek} />;
    if (s.typ === "partner") return (
      <React.Fragment>
        <h3>Partner einladen</h3>
        <p className="sub">Gemeinsame Listen, Kommentare und Herzen. Dein Partner sieht nur, was du teilst.</p>
        <input className="ek-input" defaultValue="jonas.hofer@gmail.com" />
        <button className="ek-btn signal" style={{ width: "100%", marginTop: 12, padding: "14px 20px" }}
          onClick={() => { tue((d) => { d.profil.partner = { name: "Jonas Hofer", initials: "JH" }; if (s.collId) { const c = d.coll.find((x) => x.id === s.collId); c.partner = true; const oid = c.objekte[0]; if (oid) { c.kommentare[oid] = [...(c.kommentare[oid] || []), { von: "Jonas", txt: "Die gefällt mir richtig gut. Terrasse!", zeit: "Jetzt" }]; } } ekNeuesEvent(d, "treffer", "obenzwei-t", "Jonas ist dabei", "Er hat eure Liste schon kommentiert"); }); schliesse(); zeigToast("Einladung gesendet · Jonas ist dabei"); }}>Einladung senden</button>
      </React.Fragment>);
    if (s.typ === "makler") return (
      <React.Fragment>
        <h3>Mit deinem Makler teilen</h3>
        <p className="sub">Lukas sieht nur diese Liste, kommentiert und spielt passende Off-Market-Objekte ein. Du siehst alles, er nur Freigegebenes.</p>
        <button className="ek-btn signal" style={{ width: "100%", padding: "14px 20px" }}
          onClick={() => { tue((d) => { const c = d.coll.find((x) => x.id === s.collId); c.makler = true; if (!c.objekte.includes("beheim2")) c.objekte.push("beheim2"); c.kommentare["beheim2"] = [{ von: "Lukas", txt: "Off-Market, noch nicht online: passt exakt in euer Raster. Vorschlag von mir.", zeit: "Jetzt" }]; ekNeuesEvent(d, "treffer", "beheim2", "Vorschlag von Lukas", "Off-Market · nur bei UNIO"); }); schliesse(); zeigToast("Geteilt · Lukas hat schon einen Vorschlag"); }}>Liste mit Lukas teilen</button>
      </React.Fragment>);
    return null;
  };

  const TABS = [["start", "Start"], ["explore", "Entdecken"], ["merk", "Merkliste"], ["akt", "Aktivität"], ["profil", "Profil"]];
  const ungelesen = ek.events.filter((e) => !e.gelesen).length;
  let view;
  if (kaufreiseObj) view = <EkKaufreise ek={ek} tue={tue} objId={kaufreiseObj} oeffneSheet={oeffneSheet} zurueck={() => setKaufreiseObj(null)} setChatId={setChatId} go={setKaufreiseObj} />;
  else if (tab === "explore") view = (
    <div className="ek-explframe">
      <iframe src="/ux/explore?embed=1" title="Explore" allow="autoplay"></iframe>
    </div>
  );
  else if (tab === "merk") view = <EkMerkliste ek={ek} tue={tue} oeffneSheet={oeffneSheet} />;
  else if (tab === "akt") view = <EkAktivitaet ek={ek} tue={tue} oeffneSheet={oeffneSheet} oeffneKaufreise={oeffneKaufreise} chatId={chatId} setChatId={setChatIdRaw} />;
  else if (tab === "profil") view = <EkProfil ek={ek} tue={tue} oeffneSheet={oeffneSheet} setChatId={setChatId} go={go} onRole={onRole} />;
  else view = <EkStart ek={ek} tue={tue} oeffneSheet={oeffneSheet} go={go} oeffneKaufreise={oeffneKaufreise} oeffneStory={() => setStory(true)} />;

  const tabItem = ([id, l], mobil) => {
    const inhalt = mobil ? <React.Fragment><window.EkI d={window.EK_ICONS[id === "merk" ? "merk" : id === "akt" ? "akt" : id === "explore" ? "explore" : id]} s={19} />{l}</React.Fragment> : l;
    return (
      <button key={id} className={tab === id && !kaufreiseObj ? "on" : ""} onClick={() => go(id)}>
        {inhalt}{id === "akt" && ungelesen > 0 && <span className="ek-dot"></span>}
      </button>
    );
  };

  return (
    <div className="ek">
      <style>{window.EK_CSS}</style>
      <header className="ek-top">
        <img src="../../assets/logo/unio-logo-black.svg" alt="UNIO" />
        <nav className="ek-nav">{TABS.map((t) => tabItem(t, false))}</nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <window.RoleSwitch role={role} onRole={onRole} />
          <button className="ek-ava" onClick={() => go("profil")} aria-label="Profil">{EK_NUTZER.initials}</button>
        </div>
      </header>
      <main className="ek-main">{view}</main>
      <nav className="ek-tabbar">{TABS.map((t) => tabItem(t, true))}</nav>
      <EkSheet offen={!!sheet} onClose={() => { if (sheet && sheet.typ === "quiz" && sheet.onboarding) tue((d) => { d.profil.onboarding = true; }); schliesse(); }}>{sheetInhalt()}</EkSheet>
      {story && <EkStoryViewer onEnde={() => { setStory(false); tue((d) => { d.profil.storyGesehen = true; }); }} />}
      {toast && (
        <div style={{ position: "fixed", left: "50%", bottom: 92, transform: "translateX(-50%)", zIndex: 150, background: "var(--ink)", color: "var(--paper)", borderRadius: 999, padding: "11px 20px", font: "500 13.5px var(--font-display)", boxShadow: "0 18px 40px -16px rgba(11,10,9,.5)", whiteSpace: "nowrap" }}>
          <span style={{ color: "var(--signal)", marginRight: 8 }}>✓</span>{toast}
        </div>
      )}
    </div>
  );
}
Object.assign(window, { EndkundePortal });
