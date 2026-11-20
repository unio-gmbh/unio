/* Vorlagen (nur Variante 2): alle Vorschlaege als echte, benutzbare Bausteine zum Ansehen.
   Je Element mehrere Varianten untereinander. Reiter oben: Startseite, CIRCLE, Bautraeger, Story, Effekt, Struktur.
   Vorbilder, selbst angesehen am 20.11.2026: airbnb.com, compass.com, thefold.news, takumi.uno,
   lesintranquilles.com, linear.app, apple.com, rivian.com, dejongm.com.
   Demo-Inhalte: Objekte aus OBJEKT_DB, Zahlen und Saetze aus den bestehenden Seiten. Nichts erfunden. */
const { SiteNav: VNav, OBJEKT_DB: VDB, PropCard: VCard, MaklerKreis: VKreis, maklerVon: vMakler, spalten: vsp, useMobile: vMob, CircleFilm: VFilm } = window;
const { Button: VBtn } = window.UNIODesignSystem_b6216a;
const V_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const G = "var(--font-display)";
const A = "../../assets/img/";

/* Rahmen um jede Vorlage: Nummer, Name, Variante, Vorbild */
function Vorlage({ nr, titel, variante, was, vorbild, children, dunkel }) {
  return (
    <div style={{ marginTop: 72 }}>
      <div style={{ padding: "0 6vw", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
          <span style={{ font: "500 15px " + G, color: "var(--signal-deep)" }}>{nr}{variante}</span>
          <span style={{ font: "500 20px/1.2 " + G, letterSpacing: "-0.015em", color: "var(--ink)" }}>{titel}</span>
          <span style={{ font: "400 15px/1.5 " + G, color: "var(--text-muted)" }}>{was}</span>
        </div>
        {vorbild && <span className="u-label" style={{ fontSize: 10, color: "var(--text-muted)" }}>Vorbild: {vorbild}</span>}
      </div>
      <div style={{ borderTop: "1px solid var(--hairline-dark)", borderBottom: "1px solid var(--hairline-dark)", background: dunkel ? "var(--ink)" : "var(--paper)" }}>{children}</div>
    </div>
  );
}
function Gruppe({ nr, titel, text }) {
  return (
    <div style={{ padding: "110px 6vw 0", display: "grid", gridTemplateColumns: `${vsp(7)} minmax(0, 1fr)`, gap: 24, alignItems: "end" }}>
      <h2 style={{ margin: 0, font: "500 clamp(30px, 3.4vw, 56px)/1.04 " + G, letterSpacing: "-0.03em", color: "var(--ink)" }}><span style={{ color: "var(--signal-deep)" }}>{nr}</span> {titel}</h2>
      <p style={{ margin: 0, maxWidth: 440, font: "400 16px/1.65 " + G, color: "var(--text-muted)" }}>{text}</p>
    </div>
  );
}
const Pfeile = ({ auf, hell }) => (
  <div style={{ display: "flex", gap: 8 }}>
    {[[-1, "←", "Zurück"], [1, "→", "Weiter"]].map(([r, z, t]) => (
      <button key={t} type="button" aria-label={t} onClick={() => auf(r)} style={{ width: 42, height: 42, borderRadius: "50%", border: hell ? "1px solid rgba(247,245,241,0.3)" : "1px solid var(--hairline-dark)", background: "none", cursor: "pointer", font: "15px var(--font-mono)", color: hell ? "var(--paper)" : "var(--ink)" }}>{z}</button>
    ))}
  </div>
);
function useBand() {
  const ref = React.useRef(null);
  const auf = (r) => { const el = ref.current; if (el) el.scrollBy({ left: r * el.clientWidth * 0.75, behavior: "smooth" }); };
  return [ref, auf];
}
const band = { display: "flex", gap: 24, overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", padding: "0 6vw", scrollPaddingLeft: "6vw" };

/* ---------- 1 Objekte in Reihen ---------- */
function Reihe({ titel, sub, liste, breit }) {
  const [ref, auf] = useBand();
  return (
    <div style={{ padding: "44px 0" }}>
      <div style={{ padding: "0 6vw", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 22 }}>
        <div><div style={{ font: "500 26px/1.1 " + G, letterSpacing: "-0.02em", color: "var(--ink)" }}>{titel}</div>{sub && <div style={{ font: "400 15px " + G, color: "var(--text-muted)", marginTop: 6 }}>{sub}</div>}</div>
        <Pfeile auf={auf} />
      </div>
      <div ref={ref} style={band}>
        {liste.map((o, i) => <div key={o.t + i} style={{ flex: "none", width: breit || vsp(3), scrollSnapAlign: "start" }}><VCard o={o} /></div>)}
      </div>
    </div>
  );
}
function Reihen1A() {
  return <div><Reihe titel="Neu bei UNIO" sub="Zuletzt dazugekommen" liste={VDB} /><Reihe titel="Dachgeschoss und Penthouse" liste={[VDB[1], VDB[2], VDB[4], VDB[0], VDB[5]]} /><Reihe titel="Projekte" sub="Mehrere Einheiten, ein Haus" liste={[VDB[0], VDB[3], VDB[1], VDB[2], VDB[4]]} /></div>;
}
function Reihen1B() {
  const themen = { "Neu": VDB, "Dachgeschoss": [VDB[1], VDB[2], VDB[4], VDB[0]], "Projekte": [VDB[0], VDB[3], VDB[5], VDB[1]], "Mit Garten": [VDB[3], VDB[0], VDB[2], VDB[5]] };
  const [t, setT] = React.useState("Neu");
  const [ref, auf] = useBand();
  return (
    <div style={{ padding: "56px 0" }}>
      <div style={{ padding: "0 6vw", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, marginBottom: 26, flexWrap: "wrap" }}>
        <div role="tablist" style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          {Object.keys(themen).map((k) => <button key={k} role="tab" aria-selected={k === t} onClick={() => setT(k)} style={{ border: "none", background: "none", padding: "0 0 8px", cursor: "pointer", font: "500 clamp(22px, 2.2vw, 34px)/1.1 " + G, letterSpacing: "-0.025em", color: k === t ? "var(--ink)" : "rgba(11,10,9,0.3)", borderBottom: k === t ? "2px solid var(--ink)" : "2px solid transparent", transition: `color 250ms ${V_EASE}` }}>{k}</button>)}
        </div>
        <Pfeile auf={auf} />
      </div>
      <div ref={ref} style={band}>{themen[t].map((o, i) => <div key={t + o.t + i} style={{ flex: "none", width: vsp(3), scrollSnapAlign: "start" }}><VCard o={o} /></div>)}</div>
    </div>
  );
}
function Reihen1C() {
  const gross = VDB[4], rest = [VDB[1], VDB[2], VDB[0], VDB[5]];
  const m = vMakler(gross);
  return (
    <div style={{ padding: "56px 6vw", display: "grid", gridTemplateColumns: `${vsp(6)} minmax(0, 1fr)`, gap: 24 }}>
      <a href="projekt.html" style={{ position: "relative", display: "block", borderRadius: "var(--r-panel)", overflow: "hidden", minHeight: 520, textDecoration: "none", color: "var(--paper)" }}>
        <img src={gross.img} alt={gross.t} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <span aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0) 50%, rgba(11,10,9,0.7))" }}></span>
        <span style={{ position: "absolute", left: 28, right: 28, bottom: 26, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
          <span><span style={{ display: "block", font: "500 clamp(26px, 2.6vw, 40px)/1.05 " + G, letterSpacing: "-0.025em" }}>{gross.t}</span><span style={{ display: "block", marginTop: 8, font: "400 16px " + G, color: "rgba(247,245,241,0.8)" }}>{gross.adr} · {gross.price}</span></span>
          {m && <span style={{ flex: "none", borderRadius: "50%", boxShadow: "0 0 0 2px rgba(253,252,250,0.95)" }}><VKreis m={m} size={48} /></span>}
        </span>
      </a>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 24 }}>{rest.map((o) => <VCard key={o.t} o={o} />)}</div>
    </div>
  );
}

/* ---------- 2 Zahlenzeile ---------- */
const ZAHLEN = [["100 %", "Transparenz", "Jede Anfrage live in LENS", "Wenn du baust"], ["80 %", "weniger Aufwand", "Vermarktung, Prüfung und Abwicklung übernehmen wir", "Wenn du verkaufst"], ["100 %", "Provision", "Ab € 150.000 Jahresumsatz im CIRCLE", "Wenn du makelst"]];
function Zahlen2A() {
  return (
    <div style={{ padding: "72px 6vw" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 24, borderTop: "2px solid var(--ink)" }}>
        {ZAHLEN.map(([z, k, t, w], i) => (
          <div key={w} style={{ padding: "18px 0 0", borderLeft: i ? "1px solid var(--hairline-dark)" : "none", paddingLeft: i ? 24 : 0, marginLeft: i ? -24 : 0 }}>
            <div className="u-label" style={{ fontSize: 10, color: "var(--text-muted)" }}>{w}</div>
            <div style={{ font: "500 clamp(64px, 8vw, 148px)/0.95 " + G, letterSpacing: "-0.05em", color: "var(--ink)", marginTop: 14, fontVariantNumeric: "tabular-nums" }}>{z}</div>
            <div style={{ font: "500 20px/1.2 " + G, letterSpacing: "-0.015em", color: "var(--ink)", marginTop: 10 }}>{k}</div>
            <div style={{ font: "400 15px/1.55 " + G, color: "var(--text-muted)", marginTop: 6, maxWidth: 300 }}>{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Zahlen2B() {
  return (
    <div style={{ padding: "64px 6vw" }}>
      {ZAHLEN.map(([z, k, t, w]) => (
        <div key={w} style={{ display: "grid", gridTemplateColumns: `${vsp(3)} ${vsp(4)} minmax(0, 1fr)`, gap: 24, alignItems: "baseline", padding: "26px 0", borderTop: "1px solid var(--hairline-dark)" }}>
          <span style={{ font: "400 16px " + G, color: "var(--text-muted)" }}>{w}</span>
          <span style={{ font: "500 clamp(40px, 4.6vw, 80px)/1 " + G, letterSpacing: "-0.04em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{z} <span style={{ font: "500 clamp(20px, 1.8vw, 28px)/1 " + G, letterSpacing: "-0.02em" }}>{k}</span></span>
          <span style={{ font: "400 16px/1.55 " + G, color: "var(--text-muted)" }}>{t}</span>
        </div>
      ))}
    </div>
  );
}
function Zahlen2C() {
  return (
    <div style={{ padding: "96px 6vw" }}>
      <p style={{ margin: 0, font: "500 clamp(34px, 4.4vw, 84px)/1.08 " + G, letterSpacing: "-0.035em", color: "var(--ink)", maxWidth: "18em" }}>
        <span style={{ color: "var(--signal-deep)", whiteSpace: "nowrap" }}>100 %</span> Transparenz, wenn du baust. <span style={{ color: "var(--signal-deep)", whiteSpace: "nowrap" }}>80 %</span> weniger Aufwand, wenn du verkaufst. <span style={{ color: "var(--signal-deep)", whiteSpace: "nowrap" }}>100 %</span> Provision, wenn du makelst.
      </p>
    </div>
  );
}

/* ---------- 3 Aussage ---------- */
function Aussage3A({ satz, bild }) {
  return (
    <div style={{ padding: "130px 6vw 0", textAlign: "center" }}>
      <p style={{ margin: "0 auto", maxWidth: "15em", font: "500 clamp(38px, 5.2vw, 100px)/1.02 " + G, letterSpacing: "-0.04em", color: "var(--ink)", textWrap: "balance" }}>{satz}</p>
      <div style={{ margin: "72px auto 0", width: vsp(8), aspectRatio: "16 / 8", borderRadius: "24px 24px 0 0", overflow: "hidden" }}><img src={bild} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div>
    </div>
  );
}
function Aussage3B({ satz, bild }) {
  return (
    <div style={{ padding: "96px 6vw", display: "grid", gridTemplateColumns: `${vsp(7)} minmax(0, 1fr)`, gap: 24, alignItems: "end" }}>
      <p style={{ margin: 0, font: "500 clamp(36px, 4.6vw, 88px)/1.03 " + G, letterSpacing: "-0.04em", color: "var(--ink)", textWrap: "balance" }}>{satz}</p>
      <div style={{ aspectRatio: "4 / 5", borderRadius: "var(--r-panel)", overflow: "hidden" }}><img src={bild} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div>
    </div>
  );
}
function Aussage3C({ satz, bild }) {
  return (
    <div style={{ padding: "10px" }}>
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", minHeight: 620, display: "flex", alignItems: "flex-end" }}>
        <img src={bild} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <span aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.1), rgba(11,10,9,0.66))" }}></span>
        <p style={{ position: "relative", margin: 0, padding: "0 calc(6vw - 10px) 64px", maxWidth: "16em", font: "500 clamp(38px, 5vw, 96px)/1.02 " + G, letterSpacing: "-0.04em", color: "#FFFFFF", textWrap: "balance" }}>{satz}</p>
      </div>
    </div>
  );
}

/* ---------- 4 Hervorgehobenes Objekt ---------- */
function Objekt4({ ton }) {
  const o = VDB[4], m = vMakler(o);
  const dunkel = ton === "ink";
  const bg = dunkel ? "var(--ink)" : ton === "signal" ? "var(--signal)" : "var(--paper-2)";
  const fg = dunkel ? "var(--paper)" : ton === "signal" ? "#1A1305" : "var(--ink)";
  const leise = dunkel ? "rgba(247,245,241,0.66)" : ton === "signal" ? "rgba(26,19,5,0.7)" : "var(--text-muted)";
  return (
    <div style={{ background: bg, color: fg, padding: "96px 6vw", display: "grid", gridTemplateColumns: `${vsp(4)} ${vsp(4)} minmax(0, 1fr)`, gap: 24, alignItems: "center" }}>
      <div>
        <div style={{ font: "400 16px " + G, color: leise }}>Objekt im Fokus</div>
        <div style={{ font: "500 clamp(34px, 3.8vw, 68px)/1.02 " + G, letterSpacing: "-0.035em", marginTop: 14 }}>{o.t}</div>
        <div style={{ font: "400 17px/1.5 " + G, color: leise, marginTop: 14 }}>{o.adr}</div>
      </div>
      <a href="projekt.html" style={{ display: "block", aspectRatio: "4 / 5", borderRadius: "var(--r-panel)", overflow: "hidden", boxShadow: "0 40px 90px -30px rgba(11,10,9,0.45)" }}><img src={o.img} alt={o.t} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></a>
      <div style={{ paddingLeft: 12 }}>
        <div style={{ font: "500 clamp(26px, 2.6vw, 44px)/1 " + G, letterSpacing: "-0.03em" }}>{o.price}</div>
        <div style={{ font: "400 16px " + G, color: leise, marginTop: 8 }}>{o.qm} m² · {o.zi} Zimmer</div>
        {m && <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 34, paddingTop: 22, borderTop: dunkel ? "1px solid rgba(247,245,241,0.2)" : "1px solid rgba(11,10,9,0.18)" }}>
          <VKreis m={m} size={48} />
          <span><span style={{ display: "block", font: "500 16px " + G }}>{m.name}</span><span style={{ display: "block", font: "400 14px " + G, color: leise, marginTop: 2 }}>berät zu diesem Objekt</span></span>
        </div>}
        <div style={{ marginTop: 26 }}><VBtn variant={dunkel ? "paper" : "solid"} knob onClick={() => location.assign("projekt.html")}>Objekt ansehen</VBtn></div>
      </div>
    </div>
  );
}

/* ---------- 5 System mit Reitern ---------- */
const SYS = [["Analyse", "Der Markt wird lesbar", "Nachfrage, Preise und Zielgruppen je Lage, bevor das erste Inserat erscheint.", "lens-analyse.jpg"], ["Objekte", "Alles an einem Ort", "Exposé, Unterlagen, Portale und Anfragen zu jedem Objekt in einer Ansicht.", "lens-immobilien.jpg"], ["Am Objekt", "Jede Anfrage zählt", "Besichtigungen, Angebote und der Stand der Vermarktung, live und nachvollziehbar.", "lens-objekt.jpg"]];
function System5A() {
  const [i, setI] = React.useState(0);
  return (
    <div style={{ padding: "72px 6vw 0" }}>
      <div role="tablist" style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {SYS.map(([k], n) => <button key={k} role="tab" aria-selected={n === i} onClick={() => setI(n)} style={{ height: 44, padding: "0 22px", borderRadius: 999, cursor: "pointer", font: "500 15px " + G, border: "1px solid " + (n === i ? "var(--ink)" : "var(--hairline-dark)"), background: n === i ? "var(--ink)" : "transparent", color: n === i ? "var(--paper)" : "var(--ink)", transition: `background 250ms ${V_EASE}, color 250ms ${V_EASE}` }}>{k}</button>)}
      </div>
      <p style={{ margin: "30px auto 0", textAlign: "center", maxWidth: 560, font: "400 17px/1.6 " + G, color: "var(--text-muted)" }}><b style={{ fontWeight: 500, color: "var(--ink)" }}>{SYS[i][1]}.</b> {SYS[i][2]}</p>
      <div style={{ position: "relative", margin: "44px auto 0", width: vsp(10), aspectRatio: "16 / 9", borderRadius: "20px 20px 0 0", overflow: "hidden", boxShadow: "0 0 0 1px var(--hairline-dark), 0 -30px 80px -40px rgba(11,10,9,0.3)", background: "var(--paper-2)" }}>
        {SYS.map(([k, , , b], n) => <img key={k} src={A + b} alt={n === i ? "Ansicht " + k + " der Plattform" : ""} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", opacity: n === i ? 1 : 0, transition: `opacity 500ms ${V_EASE}` }} />)}
      </div>
    </div>
  );
}
function System5B() {
  const [i, setI] = React.useState(0);
  return (
    <div style={{ padding: "80px 6vw", display: "grid", gridTemplateColumns: `${vsp(4)} minmax(0, 1fr)`, gap: 24, alignItems: "center" }}>
      <div>
        {SYS.map(([k, t, x], n) => (
          <button key={k} onClick={() => setI(n)} aria-pressed={n === i} style={{ display: "block", width: "100%", textAlign: "left", border: "none", borderTop: "1px solid var(--hairline-dark)", background: "none", padding: "22px 0", cursor: "pointer" }}>
            <span style={{ display: "block", font: "500 clamp(22px, 2vw, 30px)/1.15 " + G, letterSpacing: "-0.02em", color: n === i ? "var(--ink)" : "rgba(11,10,9,0.32)", transition: `color 250ms ${V_EASE}` }}>{t}</span>
            <span style={{ display: "grid", gridTemplateRows: n === i ? "1fr" : "0fr", transition: `grid-template-rows 400ms ${V_EASE}` }}><span style={{ overflow: "hidden" }}><span style={{ display: "block", paddingTop: 10, font: "400 16px/1.6 " + G, color: "var(--text-muted)" }}>{x}</span></span></span>
          </button>
        ))}
      </div>
      <div style={{ position: "relative", aspectRatio: "16 / 10", borderRadius: 20, overflow: "hidden", boxShadow: "0 0 0 1px var(--hairline-dark), 0 30px 80px -40px rgba(11,10,9,0.35)", background: "var(--paper-2)" }}>
        {SYS.map(([k, , , b], n) => <img key={k} src={A + b} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", opacity: n === i ? 1 : 0, transition: `opacity 500ms ${V_EASE}` }} />)}
      </div>
    </div>
  );
}

/* ---------- 6 Navigation ---------- */
function NavDemo({ art }) {
  const [an, setAn] = React.useState(false);
  const fest = art === "fest";
  const leiste = fest
    ? { left: "6vw", right: "6vw", top: 14, height: 56, borderRadius: 14, padding: "0 20px", background: an ? "rgba(253,252,250,0.96)" : "rgba(253,252,250,0)", color: an ? "var(--ink)" : "#FFFFFF", boxShadow: an ? "0 0 0 1px var(--hairline-dark)" : "none", transition: `background 250ms ${V_EASE}, color 250ms ${V_EASE}` }
    : art === "linie"
      ? { left: 0, right: 0, top: 0, height: 60, borderRadius: 0, padding: "0 6vw", background: an ? "var(--paper)" : "rgba(253,252,250,0)", color: an ? "var(--ink)" : "#FFFFFF", borderBottom: an ? "1px solid var(--hairline-dark)" : "1px solid rgba(255,255,255,0.25)", transition: `background 250ms ${V_EASE}, color 250ms ${V_EASE}` }
      : { left: an ? "24%" : "3%", right: an ? "24%" : "3%", top: 14, height: an ? 46 : 56, borderRadius: an ? 999 : 14, padding: an ? "0 14px" : "0 20px", background: "rgba(253,252,250,0.9)", color: "var(--ink)", fontSize: an ? 13 : 15, transition: "all 650ms cubic-bezier(0.32,0.72,0,1)" };
  return (
    <div style={{ position: "relative", height: 300, overflow: "hidden", background: `url(${A}hero-poster.jpg) center/cover` }}>
      <div style={{ position: "absolute", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, font: "500 15px " + G, ...leiste }}>
        <b style={{ fontWeight: 600, letterSpacing: "0.08em" }}>UNIO</b>
        <span style={{ display: "flex", gap: 26 }}><span>Makler</span><span>Bauträger</span><span>Immobilien</span><span>Story</span></span>
        <span>Login</span>
      </div>
      <button type="button" onClick={() => setAn(!an)} style={{ position: "absolute", left: "6vw", bottom: 20, height: 40, padding: "0 18px", borderRadius: 999, border: "none", background: "rgba(253,252,250,0.94)", font: "500 14px " + G, cursor: "pointer" }}>{an ? "Zurück nach oben" : "Scrollen simulieren"}</button>
    </div>
  );
}

/* ---------- 7 Tafeln zum Schieben ---------- */
const TAFELN = [["Objekt in Minuten", "Dokumente rein, die KI baut daraus die komplette Vermarktung.", "int-kitchen.jpg"], ["Ein Klick, alle Kanäle", "Alle relevanten Portale, dazu Meta und Google. Export, Update und Rückzug inklusive.", "albrechts-wohnen.jpg"], ["Jeder Lead zählt", "Kommunikation, Besichtigungen und Follow-ups laufen strukturiert über die Plattform.", "obenzwei-dinner.jpg"], ["Kaufangebote, digital", "Nachvollziehbar und rechtssicher, ohne E-Mail-Pingpong.", "albrechts-schlafen.jpg"]];
function Tafeln7A() {
  const [ref, auf] = useBand();
  return (
    <div style={{ padding: "72px 0" }}>
      <div style={{ padding: "0 6vw", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 32 }}>
        <div style={{ font: "500 clamp(32px, 3.6vw, 60px)/1.04 " + G, letterSpacing: "-0.03em", color: "var(--ink)" }}>80 % weniger Administration.<br />100 % mehr Menschlichkeit.</div>
        <Pfeile auf={auf} />
      </div>
      <div ref={ref} style={band}>
        {TAFELN.map(([t, x, b], n) => (
          <div key={t} style={{ flex: "none", width: vsp(5), scrollSnapAlign: "start" }}>
            <div style={{ aspectRatio: "5 / 4", borderRadius: "var(--r-panel)", overflow: "hidden" }}><img src={A + b} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div>
            <div style={{ font: "400 15px " + G, color: "var(--text-muted)", marginTop: 18, fontVariantNumeric: "tabular-nums" }}>Schritt {n + 1} von {TAFELN.length}</div>
            <div style={{ font: "500 26px/1.15 " + G, letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 6 }}>{t}</div>
            <div style={{ font: "400 16px/1.6 " + G, color: "var(--text-muted)", marginTop: 8, maxWidth: 420 }}>{x}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Tafeln7B() {
  return (
    <div style={{ padding: "72px 6vw", display: "grid", gridTemplateColumns: `${vsp(5)} minmax(0, 1fr)`, gap: 24, alignItems: "start" }}>
      <div style={{ position: "sticky", top: 120, font: "500 clamp(32px, 3.6vw, 60px)/1.04 " + G, letterSpacing: "-0.03em", color: "var(--ink)" }}>80 % weniger Administration.<br />100 % mehr Menschlichkeit.</div>
      <div>
        {TAFELN.map(([t, x], n) => (
          <div key={t} style={{ display: "grid", gridTemplateColumns: `${vsp(1)} minmax(0, 1fr)`, gap: 24, padding: "30px 0", borderTop: "1px solid var(--hairline-dark)" }}>
            <span style={{ font: "500 20px " + G, color: "var(--signal-deep)", fontVariantNumeric: "tabular-nums" }}>{n + 1}</span>
            <span><span style={{ display: "block", font: "500 clamp(24px, 2.2vw, 34px)/1.15 " + G, letterSpacing: "-0.02em", color: "var(--ink)" }}>{t}</span><span style={{ display: "block", font: "400 17px/1.6 " + G, color: "var(--text-muted)", marginTop: 10, maxWidth: 520 }}>{x}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 8 Zuerst bei UNIO ---------- */
function Zuerst8A() {
  const [ref, auf] = useBand();
  return (
    <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "80px 0" }}>
      <div style={{ padding: "0 6vw", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 30 }}>
        <div><div style={{ font: "500 clamp(32px, 3.6vw, 60px)/1.04 " + G, letterSpacing: "-0.03em" }}>Zuerst bei UNIO.</div><div style={{ font: "400 17px/1.6 " + G, color: "rgba(247,245,241,0.66)", marginTop: 12, maxWidth: 480 }}>Objekte, die noch auf keinem Portal stehen. Vorgemerkte sehen sie zuerst.</div></div>
        <Pfeile auf={auf} hell />
      </div>
      <div ref={ref} style={band}>
        {[VDB[4], VDB[1], VDB[3], VDB[2], VDB[5]].map((o) => (
          <a key={o.t} href="projekt.html" style={{ flex: "none", width: vsp(4), scrollSnapAlign: "start", textDecoration: "none", color: "var(--paper)" }}>
            <div style={{ position: "relative", aspectRatio: "4 / 3", borderRadius: "var(--r-card)", overflow: "hidden" }}><img src={o.img} alt={o.t} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /><span className="u-label" style={{ position: "absolute", left: 12, top: 12, fontSize: 10, padding: "7px 12px", borderRadius: 8, background: "var(--signal)", color: "#1A1305" }}>Vor Veröffentlichung</span></div>
            <div style={{ font: "500 22px/1.15 " + G, letterSpacing: "-0.02em", marginTop: 16 }}>{o.t}</div>
            <div style={{ font: "400 15px " + G, color: "rgba(247,245,241,0.66)", marginTop: 6 }}>{o.adr}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
function Zuerst8B() {
  return (
    <div style={{ padding: "80px 6vw", display: "grid", gridTemplateColumns: `${vsp(5)} minmax(0, 1fr)`, gap: 24, alignItems: "start" }}>
      <div>
        <div style={{ font: "500 clamp(32px, 3.6vw, 60px)/1.04 " + G, letterSpacing: "-0.03em", color: "var(--ink)" }}>Zuerst bei UNIO.</div>
        <div style={{ font: "400 17px/1.6 " + G, color: "var(--text-muted)", marginTop: 14, maxWidth: 420 }}>Objekte, die noch auf keinem Portal stehen. Wer sich vormerkt, sieht sie zuerst.</div>
        <div style={{ marginTop: 26 }}><VBtn variant="solid" knob>Vormerken lassen</VBtn></div>
      </div>
      <div>
        {[VDB[4], VDB[1], VDB[3]].map((o) => (
          <a key={o.t} href="projekt.html" style={{ display: "grid", gridTemplateColumns: `${vsp(2)} minmax(0, 1fr) auto`, gap: 24, alignItems: "center", padding: "18px 0", borderTop: "1px solid var(--hairline-dark)", textDecoration: "none", color: "var(--ink)" }}>
            <img src={o.img} alt="" style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: 12, display: "block" }} />
            <span><span style={{ display: "block", font: "500 22px/1.15 " + G, letterSpacing: "-0.02em" }}>{o.t}</span><span style={{ display: "block", font: "400 15px " + G, color: "var(--text-muted)", marginTop: 6 }}>{o.adr} · {o.price}</span></span>
            <span style={{ font: "400 15px " + G, color: "var(--signal-deep)", whiteSpace: "nowrap" }}>Vor Veröffentlichung</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---------- 9 Schalter Bewegung, 10 Fuss ---------- */
function Schalter({ form }) {
  const [an, setAn] = React.useState(() => { try { return localStorage.getItem("unio_bewegung") !== "aus"; } catch (e) { return true; } });
  const um = () => { const n = !an; setAn(n); try { localStorage.setItem("unio_bewegung", n ? "an" : "aus"); } catch (e) {} };
  if (form === "text") return <button type="button" onClick={um} aria-pressed={an} style={{ border: "none", background: "none", padding: 0, cursor: "pointer", font: "400 15px " + G, color: "inherit", textDecoration: "underline", textUnderlineOffset: 4, textDecorationColor: "currentColor" }}>Bewegung: {an ? "an" : "aus"}</button>;
  return (
    <button type="button" role="switch" aria-checked={an} onClick={um} style={{ display: "inline-flex", alignItems: "center", gap: 12, border: "none", background: "none", padding: 0, cursor: "pointer", font: "400 15px " + G, color: "inherit" }}>
      Bewegung
      <span style={{ position: "relative", width: 46, height: 26, borderRadius: 999, background: an ? "var(--signal)" : "rgba(128,128,128,0.4)", transition: `background 200ms ${V_EASE}` }}><span style={{ position: "absolute", top: 3, left: an ? 23 : 3, width: 20, height: 20, borderRadius: "50%", background: "#FDFCFA", transition: `left 200ms ${V_EASE}` }}></span></span>
    </button>
  );
}
function Fuss({ ton, schalter }) {
  const dunkel = ton === "ink";
  const fg = dunkel ? "var(--paper)" : "var(--ink)", leise = dunkel ? "rgba(247,245,241,0.6)" : "var(--text-muted)", linie = dunkel ? "rgba(247,245,241,0.18)" : "var(--hairline-dark)";
  const sp = [["Für dich", ["Immobilien", "Verkaufen", "Wissen"]], ["Für Profis", ["Makler", "Bauträger", "Plattform"]], ["UNIO", ["Story", "Menschen", "Kontakt"]]];
  return (
    <div style={{ background: dunkel ? "var(--ink)" : "var(--paper-2)", color: fg, padding: "110px 6vw 34px" }}>
      <div style={{ display: "grid", gridTemplateColumns: `${vsp(6)} repeat(3, minmax(0, 1fr))`, gap: 24, alignItems: "start" }}>
        <div>
          <div style={{ font: "500 clamp(52px, 6.6vw, 124px)/0.96 " + G, letterSpacing: "-0.04em" }}>Move as one<span style={{ color: "var(--signal)" }}>.</span></div>
          <div style={{ display: "flex", gap: 12, marginTop: 30 }}><VBtn size="lg" variant={dunkel ? "paper" : "solid"} knob>Demo buchen</VBtn><VBtn size="lg" variant={dunkel ? "glass" : "ghost"} tone="dark">Kontakt</VBtn></div>
        </div>
        {sp.map(([k, l]) => <div key={k}><div style={{ font: "400 15px " + G, color: leise }}>{k}</div>{l.map((x) => <div key={x} style={{ font: "500 18px/1.2 " + G, letterSpacing: "-0.01em", marginTop: 12 }}>{x}</div>)}</div>)}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginTop: 96, paddingTop: 22, borderTop: "1px solid " + linie, font: "400 15px " + G, color: leise }}>
        <span>UNIO · Wien · Kärntnerstraße 12</span>
        <span style={{ display: "flex", gap: 26, alignItems: "center", color: fg }}><Schalter form={schalter} /><span style={{ color: leise }}>Impressum</span><span style={{ color: leise }}>Datenschutz</span></span>
      </div>
    </div>
  );
}

/* ---------- Heroes fuer Bautraeger und Story ---------- */
function HeroSub({ art, zeilen, text, knopf, bild, film }) {
  const gross = "500 clamp(64px, 10vw, 196px)/0.92 " + G;
  if (art === "rahmen") return (
    <div style={{ padding: 10 }}>
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", height: "min(86vh, 820px)", minHeight: 560 }}>
        <img src={bild} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <span aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.3), rgba(11,10,9,0.05) 35%, rgba(11,10,9,0.66))" }}></span>
        <div style={{ position: "absolute", left: "calc(6vw - 10px)", right: "calc(6vw - 10px)", bottom: 56, display: "grid", gridTemplateColumns: `${vsp(7)} minmax(0, 1fr)`, gap: 24, alignItems: "end", color: "#FFFFFF" }}>
          <div style={{ font: "500 clamp(48px, 6.4vw, 120px)/0.96 " + G, letterSpacing: "-0.04em" }}>{zeilen.map((z) => <span key={z} style={{ display: "block" }}>{z}</span>)}</div>
          <div><p style={{ margin: 0, font: "400 17px/1.6 " + G, color: "rgba(247,245,241,0.92)", maxWidth: 440 }}>{text}</p><div style={{ marginTop: 22 }}><VBtn size="lg" variant="paper" knob>{knopf}</VBtn></div></div>
        </div>
      </div>
    </div>
  );
  return (
    <div style={{ padding: "110px 6vw 0" }}>
      <div style={{ font: gross, letterSpacing: "-0.05em", color: "var(--ink)" }}>{zeilen.map((z, i) => <span key={z} style={{ display: "block" }}>{z}{i === zeilen.length - 1 && <span style={{ color: "var(--signal)" }}>.</span>}</span>)}</div>
      <div style={{ display: "grid", gridTemplateColumns: `${vsp(7)} minmax(0, 1fr)`, gap: 24, alignItems: "end", marginTop: 44 }}>
        <div><VBtn size="lg" variant="solid" knob>{knopf}</VBtn></div>
        <p style={{ margin: 0, font: "400 17px/1.65 " + G, color: "var(--text-muted)", maxWidth: 440 }}>{text}</p>
      </div>
      {film
        ? <div style={{ display: "grid", gridTemplateColumns: `${vsp(4)} ${vsp(4)} minmax(0, 1fr)`, gap: 24, marginTop: 60 }}><div></div><VFilm stil={{ aspectRatio: "4 / 5", borderRadius: "24px 24px 0 0" }} /><div></div></div>
        : <div style={{ marginTop: 60, height: "min(62vh, 620px)", borderRadius: "24px 24px 0 0", overflow: "hidden" }}><img src={bild} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div>}
    </div>
  );
}

/* ---------- Struktur ---------- */
const HEUTE = [["Startseite", "8.600", "Hero, Objekte, Versprechen, Produkte, System, Zielgruppen"], ["Makler (CIRCLE)", "24.200", "17 Abschnitte: Community, Plattform, Verwaltung, Vorteile, Rechner, Beteiligung, Marke, Bewegung, Schritte, Vergleich, Fragen, Bewerbung"], ["Bauträger", "12.600", "Hero, Problem, System, LENS, Nutzen, Ausgangslagen, Formular, Fragen"], ["Story", "13.400", "Hero, Erkenntnis, Statement, Fusion, Warum, Menschen"], ["Immobilien", "leitet in die App", "Suche und Verkaufen auf einer Seite"]];
const NEU = [
  ["Startseite", "/", "bleibt", "Kürzer: Hero, Objekt-Reihen, Menschen, Versprechen, drei Türen (Kaufen, Verkaufen, Profis)."],
  ["Immobilien", "/immobilien", "bleibt", "Nur Suche und Objekt-Reihen."],
  ["Verkaufen", "/verkaufen", "neu, ausgegliedert", "Eigentümer haben heute keine eigene Seite, der Teil steckt unter der Suche. Eigene Seite mit Bewertung, Ablauf und Makler."],
  ["Menschen", "/menschen", "neu", "Die Übersicht aller Makler und des Teams. Heute als Vorschau unter /partner2."],
  ["CIRCLE", "/makler", "gekürzt", "Community, Vorteile, Marke, Bewerbung. Die Seite ist heute fast dreimal so lang wie die Startseite."],
  ["Provisionsrechner", "/makler/rechner", "neu, ausgegliedert", "Der Rechner ist ein Werkzeug, das Makler teilen und wieder aufrufen. Er verdient eine eigene Adresse."],
  ["Plattform", "/plattform", "neu, ausgegliedert", "System, LENS, Smart Exposé und NOVA stehen heute dreimal: auf Startseite, CIRCLE und Bauträger. Eine Seite, auf die alle drei verweisen."],
  ["International", "/makler/international", "neu", "Neue Städte und Länder anfragen. Heute als Abschnitt unter /makler2."],
  ["Bauträger", "/bautraeger", "gekürzt", "Problem, Ergebnis, Ausgangslagen, Anfrage. Die LENS-Vorführung wandert auf die Plattform-Seite."],
  ["Story", "/story", "bleibt", "Die Menschen-Reihe verlinkt auf /menschen statt sie zu wiederholen."],
  ["Wissen", "/wissen", "bleibt", "Je Ratgeber ein Makler als Ansprechperson."],
];
function Struktur() {
  const zelle = { padding: "16px 24px 16px 0", borderTop: "1px solid var(--hairline-dark)", font: "400 16px/1.5 " + G, color: "var(--ink)", verticalAlign: "top", textAlign: "left" };
  return (
    <div>
      <Gruppe nr="S" titel="Seitenstruktur" text="Gemessen am heutigen Stand von Variante 2 bei 1440 Pixel Breite. Die CIRCLE-Seite ist mit Abstand die längste, und drei Themen stehen mehrfach auf verschiedenen Seiten." />
      <div style={{ padding: "48px 6vw 0" }}>
        <div style={{ font: "500 22px " + G, letterSpacing: "-0.015em", marginBottom: 6 }}>Heute</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}><tbody>
          {HEUTE.map(([s, h, i]) => <tr key={s}><td style={{ ...zelle, width: "22%", fontWeight: 500 }}>{s}</td><td style={{ ...zelle, width: "18%", fontVariantNumeric: "tabular-nums", color: "var(--text-muted)" }}>{h}{/\d/.test(h) ? " Pixel hoch" : ""}</td><td style={{ ...zelle, color: "var(--text-muted)" }}>{i}</td></tr>)}
        </tbody></table>
        <div style={{ font: "500 22px " + G, letterSpacing: "-0.015em", margin: "72px 0 6px" }}>Vorschlag</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}><tbody>
          {NEU.map(([s, p, st, w]) => <tr key={s}><td style={{ ...zelle, width: "16%", fontWeight: 500 }}>{s}</td><td style={{ ...zelle, width: "18%", fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--text-muted)" }}>{p}</td><td style={{ ...zelle, width: "16%", color: /neu/.test(st) ? "var(--signal-deep)" : "var(--text-muted)" }}>{st}</td><td style={{ ...zelle, color: "var(--text-muted)" }}>{w}</td></tr>)}
        </tbody></table>
        <p style={{ margin: "40px 0 0", maxWidth: 760, font: "400 17px/1.65 " + G, color: "var(--text-muted)" }}>Navigation danach: Immobilien, Verkaufen, Makler, Bauträger, Story. Plattform und Menschen hängen im Fuß der Seite und werden aus den Abschnitten heraus verlinkt. So bleibt die Leiste bei fünf Punkten.</p>
      </div>
    </div>
  );
}

/* ---------- Bewegte Bilder: das Haus steht still, nur die Menschen gehen ----------
   Grundlage: drei Strassenansichten von Daniel, daraus je zwei Filme ohne Kamerabewegung (assets/video/leb-*.mp4):
   "ruhig" (wie das Ausgangsbild) und "circle" (warmes Licht, grosse unscharfe Passanten vorn, wie die Makler-Filme).
   Bausteine LebBild, StoererBreit, StoererKarte, StoererZeile liegen in site-shared.jsx und laufen auf /immobilien2.
   Vorbilder, selbst angesehen am 20.11.2026: airbnb.com (Hinweiskarte in der Trefferliste), compass.com (Vorab-Objekte),
   apple.com und rivian.com (Film als Startbild, laeuft nur, wenn sichtbar), aman.com (ruhige breite Bilder).
   Die Bilder sind Beispiele ohne Projektnamen, deshalb stehen hier keine Namen, Adressen oder Preise. */
const { LebBild, StoererBreit, StoererKarte, StoererZeile } = window;
const lbVerlauf = (richtung) => ({ position: "absolute", inset: 0, background: richtung === "links" ? "linear-gradient(90deg, rgba(11,10,9,0.66), rgba(11,10,9,0.14) 62%, rgba(11,10,9,0))" : "linear-gradient(180deg, rgba(11,10,9,0.12) 30%, rgba(11,10,9,0.7))" });
const lbGross = { margin: 0, font: "500 clamp(26px, 3vw, 48px)/1.04 " + G, letterSpacing: "-0.03em", color: "var(--text-inverse)" };
const lbKlein = { margin: 0, font: "400 16px/1.55 " + G, color: "rgba(247,245,241,0.86)" };
const LbLink = ({ children, hell }) => <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "500 15px " + G, color: hell ? "var(--text-inverse)" : "var(--ink)", borderBottom: "1px solid currentColor", paddingBottom: 3 }}>{children} <span aria-hidden="true" style={{ font: "13px var(--font-mono)" }}>→</span></span>;
const lbChip = (an) => ({ height: 38, padding: "0 16px", borderRadius: 999, cursor: "pointer", border: "1px solid var(--hairline-dark)", background: an ? "var(--ink)" : "transparent", color: an ? "var(--paper)" : "var(--ink)", font: "500 14px " + G, whiteSpace: "nowrap" });

/* H Startscreens: derselbe Aufbau, Film und Stil umschaltbar */
const LB_ORTE = [["fruehling", "Straße"], ["herbst", "Herbst"], ["cafe", "Eckhaus"]];
function StartScreen({ zeilen, text, knopf, zweiter, start = "herbst" }) {
  const mob = vMob();
  const [ort, setOrt] = React.useState(start);
  const [stil, setStil] = React.useState("ruhig");
  const bild = stil === "circle" ? ort + "-circle" : ort;
  return (
    <div style={{ padding: "44px 6vw" }}>
      <div style={{ position: "relative", height: mob ? 560 : "min(86vh, 820px)", minHeight: 520, borderRadius: 24, overflow: "hidden", background: "var(--ink)" }}>
        <LebBild bild={bild} stil={{ position: "absolute", inset: 0 }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.28), rgba(11,10,9,0.05) 34%, rgba(11,10,9,0.72))" }}></div>
        <div style={{ position: "absolute", left: mob ? 22 : 44, right: mob ? 22 : 44, bottom: mob ? 26 : 44, display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 7fr) minmax(0, 5fr)", gap: 24, alignItems: "end" }}>
          <h3 style={{ margin: 0, font: `500 ${mob ? "clamp(38px, 11vw, 56px)" : "clamp(48px, 6vw, 108px)"}/0.96 ` + G, letterSpacing: "-0.04em", color: "var(--text-inverse)" }}>
            {zeilen.map((z, k) => <span key={z} style={{ display: "block", whiteSpace: "nowrap" }}>{z}{k === zeilen.length - 1 && <span style={{ color: "var(--signal)" }}>.</span>}</span>)}
          </h3>
          <div>
            <p style={{ ...lbKlein, fontSize: 17, maxWidth: 440 }}>{text}</p>
            <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
              <VBtn size="lg" variant="paper" knob>{knopf}</VBtn>
              {zweiter && <VBtn size="lg" variant="glass" tone="dark">{zweiter}</VBtn>}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
        <span style={{ font: "400 15px " + G, color: "var(--text-muted)", marginRight: 4 }}>Stil</span>
        {[["ruhig", "Ruhig"], ["circle", "Wie die Makler-Filme"]].map(([k, t]) => <button key={k} type="button" aria-pressed={stil === k} onClick={() => setStil(k)} style={lbChip(stil === k)}>{t}</button>)}
        <span style={{ font: "400 15px " + G, color: "var(--text-muted)", margin: "0 4px 0 18px" }}>Bild</span>
        {LB_ORTE.map(([k, t]) => <button key={k} type="button" aria-pressed={ort === k} onClick={() => setOrt(k)} style={lbChip(ort === k)}>{t}</button>)}
      </div>
    </div>
  );
}
/* Alle sechs Filme nebeneinander */
function FilmVergleich() {
  const mob = vMob();
  return (
    <div style={{ padding: "44px 6vw", display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 24 }}>
      {["", "-circle"].map((s) => LB_ORTE.map(([k, t]) => (
        <div key={k + s}>
          <LebBild bild={k + s} stil={{ aspectRatio: "16 / 9", borderRadius: 16 }} />
          <div style={{ font: "400 14px " + G, color: "var(--text-muted)", marginTop: 10 }}>{t}, {s ? "wie die Makler-Filme" : "ruhig"}</div>
        </div>
      )))}
    </div>
  );
}

/* L1 Stoerer in der Trefferliste (so auf /immobilien2 eingebaut) */
function StoererListe() {
  const mob = vMob();
  const breit = { gridColumn: mob ? "auto" : "span 2" };
  return (
    <div style={{ padding: "44px 6vw", display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(4, minmax(0, 1fr))", gap: 24 }}>
      <VCard o={VDB[0]} /><VCard o={VDB[1]} />
      <StoererBreit stil={breit} />
      <VCard o={VDB[2]} /><StoererKarte /><VCard o={VDB[3]} /><VCard o={VDB[4]} />
      <StoererZeile stil={{ gridColumn: mob ? "auto" : "span 4" }} />
    </div>
  );
}

/* Startseite */
function Tueren({ drei }) {
  const mob = vMob();
  const [an, setAn] = React.useState(-1);
  const tueren = [["fruehling", "Ich suche.", "Jedes Objekt wird von einem Menschen betreut.", "Objekte ansehen", "30% center"], ["cafe", "Ich verkaufe.", "Volle Transparenz von der Bewertung bis zur Übergabe.", "Immobilie bewerten", "center"]].concat(drei ? [["herbst", "Ich baue.", "Makler und Marketing, verbunden zu einem System.", "Projekt prüfen lassen", "80% center"]] : []);
  return (
    <div style={{ padding: "44px 6vw", display: "grid", gridTemplateColumns: mob ? "1fr" : `repeat(${tueren.length}, minmax(0, 1fr))`, gap: 24 }}>
      {tueren.map(([b, t, s, l, pos], k) => (
        <a key={t} href="#effekt" onMouseEnter={() => setAn(k)} onMouseLeave={() => setAn(-1)} style={{ position: "relative", display: "block", aspectRatio: drei ? "4 / 5" : "4 / 3", borderRadius: 24, overflow: "hidden", textDecoration: "none" }}>
          <LebBild bild={b} wann="hover" an={an === k} pos={pos} stil={{ position: "absolute", inset: 0 }} />
          <div aria-hidden="true" style={lbVerlauf()}></div>
          <div style={{ position: "absolute", left: 28, right: 28, bottom: 26 }}>
            <p style={{ ...lbGross, fontSize: drei ? "clamp(24px, 2.4vw, 38px)" : lbGross.fontSize }}>{t}</p>
            <p style={{ ...lbKlein, margin: "10px 0 16px", maxWidth: 380 }}>{s}</p>
            <LbLink hell>{l}</LbLink>
          </div>
        </a>
      ))}
    </div>
  );
}
function BreitesBild({ bild, pos, satz, knopf }) {
  return (
    <div style={{ padding: "44px 6vw" }}>
      <div style={{ position: "relative", aspectRatio: "21 / 9", minHeight: 320, borderRadius: 24, overflow: "hidden" }}>
        <LebBild bild={bild} pos={pos} stil={{ position: "absolute", inset: 0 }} />
        <div aria-hidden="true" style={lbVerlauf()}></div>
        <div style={{ position: "absolute", left: 32, right: 32, bottom: 30, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <p style={{ ...lbGross, maxWidth: 760 }}>{satz}</p>
          {knopf && <VBtn size="lg" variant="paper" knob>{knopf}</VBtn>}
        </div>
      </div>
    </div>
  );
}
/* Bild sieben Spalten, Inhalt fuenf Spalten */
function BildUndText({ bild, marke, titel, text, link, kinder, rechts }) {
  const mob = vMob();
  const b = <LebBild bild={bild} stil={{ aspectRatio: "3 / 2", borderRadius: 24 }} />;
  const t = (
    <div style={{ padding: mob ? 0 : (rechts ? "0 clamp(0px, 3vw, 56px) 0 0" : "0 0 0 clamp(0px, 3vw, 56px)") }}>
      {marke && <span className="u-label" style={{ fontSize: 10, color: "var(--text-muted)" }}>{marke}</span>}
      <p style={{ ...lbGross, color: "var(--ink)", marginTop: 14 }}>{titel}</p>
      {text && <p style={{ margin: "16px 0 0", maxWidth: 420, font: "400 17px/1.65 " + G, color: "var(--text-muted)" }}>{text}</p>}
      {kinder}
      {link && <div style={{ marginTop: 24 }}><LbLink>{link}</LbLink></div>}
    </div>
  );
  return (
    <div style={{ padding: "64px 6vw", display: "grid", gridTemplateColumns: mob ? "1fr" : (rechts ? `minmax(0, 1fr) ${vsp(7)}` : `${vsp(7)} minmax(0, 1fr)`), gap: 24, alignItems: "center" }}>
      {rechts && !mob ? <React.Fragment>{t}{b}</React.Fragment> : <React.Fragment>{b}{t}</React.Fragment>}
    </div>
  );
}
function BautraegerZahlen() {
  return (
    <div style={{ marginTop: 26, borderTop: "2px solid var(--ink)" }}>
      {[["100 %", "Transparenz", "Jede Anfrage live in LENS"], ["80 %", "weniger Aufwand", "Vermarktung, Prüfung und Abwicklung übernehmen wir"]].map(([z, w, s]) => (
        <div key={w} style={{ display: "grid", gridTemplateColumns: "96px minmax(0, 1fr)", gap: 16, padding: "14px 0", borderBottom: "1px solid var(--hairline-dark)", alignItems: "baseline" }}>
          <span style={{ font: "500 26px/1 " + G, letterSpacing: "-0.02em", color: "var(--ink)", whiteSpace: "nowrap" }}>{z}</span>
          <span><span style={{ display: "block", font: "500 16px/1.3 " + G, color: "var(--ink)" }}>{w}</span><span style={{ display: "block", font: "400 14.5px/1.5 " + G, color: "var(--text-muted)", marginTop: 3 }}>{s}</span></span>
        </div>
      ))}
    </div>
  );
}

/* Karte */
function Karte3A() {
  const mob = vMob();
  const [an, setAn] = React.useState(-1);
  return (
    <div style={{ padding: "44px 6vw", display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 24 }}>
      {[["fruehling", "30% center"], ["herbst", "80% center"], ["cafe", "center"]].map(([b, pos], k) => (
        <a key={b} href="#effekt" onMouseEnter={() => setAn(k)} onMouseLeave={() => setAn(-1)} style={{ display: "block", textDecoration: "none", background: "var(--surface-raised)", borderRadius: "var(--r-card)", padding: 8, boxShadow: an === k ? "inset 0 0 0 1px var(--hairline-dark), var(--shadow-soft)" : "inset 0 0 0 1px var(--hairline-dark)", transition: "box-shadow 300ms ease" }}>
          <div style={{ position: "relative" }}>
            <LebBild bild={b} wann="hover" an={an === k} pos={pos} stil={{ height: 260, borderRadius: "calc(var(--r-card) - 8px)" }} />
            <span className="u-label" style={{ position: "absolute", left: 12, top: 12, fontSize: 10, padding: "7px 12px", borderRadius: 8, background: "var(--ink)", color: "var(--paper)" }}>Projekt</span>
          </div>
          <div style={{ padding: "16px 16px 14px" }}>
            <div style={{ font: "500 21px/1.15 " + G, letterSpacing: "-0.02em", color: "var(--ink)" }}>Beispielprojekt {k + 1}</div>
            <div style={{ font: "400 15px/1.4 " + G, color: "var(--text-muted)", marginTop: 6 }}>Mit der Maus darüberfahren</div>
          </div>
        </a>
      ))}
    </div>
  );
}

function EffektSeite() {
  return (
    <div id="effekt">
      <Gruppe nr="H" titel="Startscreens mit Film" text="Derselbe Aufbau für drei Seiten. Unter jedem Bild lassen sich Stil und Motiv umschalten: ruhig wie dein Ausgangsbild oder wie die Makler-Filme." />
      <Vorlage nr="H" variante="A" titel="Startseite" was="Zum Vergleich mit Hero A, D, E und F unter /2" vorbild="rivian.com, apple.com"><StartScreen start="herbst" zeilen={["Real Estate", "Finally Simple"]} text="Suchen, verkaufen, bauen: ein System, getragen von Menschen, die ihr Viertel kennen." knopf="Immobilien ansehen" zweiter="Immobilie bewerten" /></Vorlage>
      <Vorlage nr="H" variante="B" titel="Bauträger" was="Ersetzt die zweigeteilte Karte" vorbild="rivian.com"><StartScreen start="fruehling" zeilen={["Projekte planbar", "und erfolgreich"]} text="Die stärksten Makler der Stadt, das beste Marketing und volle Transparenz: verbunden für deinen Abverkauf." knopf="Projekt prüfen lassen" /></Vorlage>
      <Vorlage nr="H" variante="C" titel="Story" was="Die Stadt als Bühne" vorbild="apple.com"><StartScreen start="cafe" zeilen={["Move", "as one"]} text="Vertrieb, Marketing und Technologie haben einander jahrelang zugearbeitet. 2026 wurden sie ein Unternehmen." knopf="Die Menschen ansehen" /></Vorlage>
      <Vorlage nr="H" variante="Filme" titel="Alle sechs Filme" was="Oben ruhig, unten wie die Makler-Filme"><FilmVergleich /></Vorlage>

      <Gruppe nr="L1" titel="Störer in der Trefferliste" text="Auf /immobilien2 laufen zwei davon: breit nach dem vierten Objekt, orange Karte nach dem neunten. Die Zeile bleibt als Baustein in Reserve." />
      <Vorlage nr="L1" variante="A, B, C" titel="Gemischt zwischen den Treffern" was="Breit mit Knopf, Karte in Orange, schmale Zeile" vorbild="airbnb.com, compass.com"><StoererListe /></Vorlage>

      <Gruppe nr="ST" titel="Startseite" text="Drei Stellen, an denen ein lebendes Bild ein heutiges Element ersetzen kann." />
      <Vorlage nr="ST" variante="A" titel="Zwei Türen" was="Suchen und Verkaufen, lebt beim Darüberfahren" vorbild="compass.com"><Tueren /></Vorlage>
      <Vorlage nr="ST" variante="B" titel="Drei Türen" was="Ersetzt die Zielgruppen-Weiche" vorbild="compass.com, aman.com"><Tueren drei /></Vorlage>
      <Vorlage nr="ST" variante="C" titel="Breites Bild vor den Objekten" was="Führt in die Suche" vorbild="aman.com, apple.com"><BreitesBild bild="herbst" pos="center 62%" satz={<span>Entdecke weitere Immobilien<br />in unserer Suche.</span>} knopf="Alle Immobilien" /></Vorlage>
      <Vorlage nr="ST" variante="D" titel="Menschen hinter den Objekten" was="Führt zu den Partnern, vor dem CIRCLE-Streifen" vorbild="aman.com"><BildUndText bild="cafe" marke="CIRCLE" titel="Makler, die ihr Viertel kennen." text="Hinter jedem Objekt steht ein Mensch aus dem CIRCLE. Lerne die Partner kennen." link="Alle Partner ansehen" /></Vorlage>

      <Gruppe nr="BT" titel="Bauträger" text="Das Projekt in seiner Straße, mit Leben davor: genau das Bild, das ein Bauträger von seinem Haus sehen will." />
      <Vorlage nr="BT" variante="A" titel="Bild und Zahlen" was="Ersetzt den Abschnitt Nutzen" vorbild="aman.com, thefold.news"><BildUndText bild="fruehling" marke="Wenn du baust" titel="Dein Projekt, mitten im Leben." kinder={<BautraegerZahlen />} link="Projekt prüfen lassen" /></Vorlage>
      <Vorlage nr="BT" variante="B" titel="Abschluss vor dem Formular" was="Ein Satz, ein Knopf" vorbild="rivian.com"><BreitesBild bild="herbst-circle" pos="center 60%" satz="Projekte planbar und erfolgreich." knopf="Projekt prüfen lassen" /></Vorlage>
      <Vorlage nr="BT" variante="C" titel="Referenzen als lebende Karten" was="Je Projekt ein Film, lebt beim Darüberfahren" vorbild="airbnb.com"><Karte3A /></Vorlage>

      <Gruppe nr="SY" titel="Story" text="Die Stadt als ruhiger Hintergrund für die großen Sätze." />
      <Vorlage nr="SY" variante="A" titel="Satz im lebenden Bild" was="Ersetzt einen der festgehaltenen Abschnitte" vorbild="rivian.com, apple.com"><BreitesBild bild="cafe-circle" satz="Einzeln lindert man Symptome. Gemeinsam baut man ein System." /></Vorlage>
      <Vorlage nr="SY" variante="B" titel="Text links, Bild rechts" was="Übergang zu den Menschen" vorbild="aman.com"><BildUndText rechts bild="cafe" marke="Story" titel="Move as one." text="Vertrieb, Marketing und Technologie haben einander jahrelang zugearbeitet. 2026 wurden sie ein Unternehmen." link="Die Menschen ansehen" /></Vorlage>
    </div>
  );
}

/* ---------- Seite ---------- */
const REITER = [["start", "Startseite"], ["circle", "CIRCLE"], ["bautraeger", "Bauträger"], ["story", "Story"], ["effekt", "Bewegte Bilder"], ["struktur", "Struktur"]];
function VorlagenSeite() {
  const lies = () => { const h = location.hash.replace("#", ""); return REITER.some((r) => r[0] === h) ? h : "start"; };
  const [r, setR] = React.useState(lies);
  React.useEffect(() => { const f = () => { setR(lies()); window.scrollTo(0, 0); }; window.addEventListener("hashchange", f); return () => window.removeEventListener("hashchange", f); }, []);
  const stadt = A + "vienna-facades.jpg";
  return (
    <div style={{ fontFamily: G, background: "var(--paper)", minHeight: "100vh", paddingBottom: 140 }}>
      <VNav active="" />
      <div style={{ padding: "170px 6vw 0", display: "grid", gridTemplateColumns: `${vsp(7)} minmax(0, 1fr)`, gap: 24, alignItems: "end" }}>
        <h1 style={{ margin: 0, font: "500 clamp(48px, 5.4vw, 92px)/1 " + G, letterSpacing: "-0.03em", color: "var(--ink)" }}>Vorlagen<span style={{ color: "var(--signal)" }}>.</span></h1>
        <p style={{ margin: 0, maxWidth: 440, font: "400 17px/1.65 " + G, color: "var(--text-muted)" }}>Jedes Element in mehreren Varianten, als echter Baustein zum Anfassen. Jede Variante hat eine Kennung wie 1A oder 3B. Nenne mir die Kennungen, die du willst.</p>
      </div>
      <div style={{ position: "sticky", top: 84, zIndex: 40, margin: "44px 6vw 0", display: "flex", gap: 6, padding: 6, borderRadius: 999, background: "rgba(253,252,250,0.94)", boxShadow: "0 0 0 1px var(--hairline-dark)", width: "max-content", maxWidth: "88vw", overflowX: "auto" }}>
        {REITER.map(([k, t]) => <a key={k} href={"#" + k} aria-current={k === r ? "page" : undefined} style={{ height: 40, padding: "0 20px", borderRadius: 999, display: "grid", placeItems: "center", textDecoration: "none", whiteSpace: "nowrap", font: "500 15px " + G, background: k === r ? "var(--ink)" : "transparent", color: k === r ? "var(--paper)" : "var(--ink)" }}>{t}</a>)}
      </div>

      {r === "start" && <div>
        <Gruppe nr="1" titel="Objekte auf der Startseite" text="Heute drei Beispielkarten. Vorschlag: Reihen zum seitlichen Schieben, je Reihe ein Thema." />
        <Vorlage nr="1" variante="A" titel="Drei Reihen" was="Je Thema eine eigene Reihe mit Pfeilen" vorbild="airbnb.com"><Reihen1A /></Vorlage>
        <Vorlage nr="1" variante="B" titel="Eine Reihe, Themen als Reiter" was="Kürzer, die Themen sind die Überschrift" vorbild="airbnb.com, apple.com"><Reihen1B /></Vorlage>
        <Vorlage nr="1" variante="C" titel="Ein großes, vier kleine" was="Ein Objekt führt, daneben ein ruhiges Raster" vorbild="compass.com"><Reihen1C /></Vorlage>

        <Gruppe nr="2" titel="Das UNIO-Versprechen" text="Heute zählen drei Zahlen unscharf ein. Vorschlag: sofort lesbar, mit Haarlinien." />
        <Vorlage nr="2" variante="A" titel="Zeitungs-Zahlen" was="Drei Spalten, dicke Linie oben, Haarlinien dazwischen" vorbild="thefold.news"><Zahlen2A /></Vorlage>
        <Vorlage nr="2" variante="B" titel="Zeilen" was="Je Zielgruppe eine Zeile auf dem Raster" vorbild="thefold.news"><Zahlen2B /></Vorlage>
        <Vorlage nr="2" variante="C" titel="Ein Satz" was="Die drei Zahlen als ein großer Satz" vorbild="dejongm.com"><Zahlen2C /></Vorlage>

        <Gruppe nr="3" titel="Aussage-Abschnitt" text="Heute färbt sich Text Wort für Wort ein, während die Seite festgehalten wird. Vorschlag: ein Satz, ein Bild, kein Festhalten." />
        <Vorlage nr="3" variante="A" titel="Mittig mit Bild darunter" was="Der Satz steht frei, das Bild schließt den Abschnitt ab" vorbild="takumi.uno"><Aussage3A satz="Der Markt wird lesbar." bild={stadt} /></Vorlage>
        <Vorlage nr="3" variante="B" titel="Satz links, Bild rechts" was="Sieben zu fünf Spalten" vorbild="aman.com"><Aussage3B satz="Der Markt wird lesbar." bild={A + "albrechts-hof.jpg"} /></Vorlage>
        <Vorlage nr="3" variante="C" titel="Satz im Bild" was="Bild im Rahmen wie der Hero" vorbild="rivian.com"><Aussage3C satz="Der Markt wird lesbar." bild={A + "albrecht-dusk.jpg"} /></Vorlage>

        <Gruppe nr="4" titel="Ein Objekt im Fokus" text="Gibt es heute nicht. Ein Objekt allein auf einer Fläche, mit seinem Makler." />
        <Vorlage nr="4" variante="A" titel="Helle Fläche" was="Ruhig, passt in jede Seite" vorbild="lesintranquilles.com"><Objekt4 ton="hell" /></Vorlage>
        <Vorlage nr="4" variante="B" titel="Dunkle Fläche" was="Stärkster Kontrast zum Rest der Seite" vorbild="lesintranquilles.com"><Objekt4 ton="ink" /></Vorlage>
        <Vorlage nr="4" variante="C" titel="Akzentfläche" was="Laut, nur für ein besonderes Objekt" vorbild="lesintranquilles.com"><Objekt4 ton="signal" /></Vorlage>

        <Gruppe nr="5" titel="System-Bereich" text="Heute laufen zehn kleine Animationen gleichzeitig. Vorschlag: ein großes Bild der Plattform, das man selbst umschaltet." />
        <Vorlage nr="5" variante="A" titel="Reiter über dem Bild" was="Mittig, das Bild steht auf dem unteren Rand" vorbild="linear.app"><System5A /></Vorlage>
        <Vorlage nr="5" variante="B" titel="Liste links, Bild rechts" was="Der aktive Punkt klappt auf" vorbild="apple.com"><System5B /></Vorlage>

        <Gruppe nr="6" titel="Navigation" text="Heute zieht sich die Leiste beim Scrollen zu einer Pille zusammen. Drücke auf Scrollen simulieren." />
        <Vorlage nr="6" variante="A" titel="Form bleibt, Grund blendet ein" was="Leiste sitzt fest auf dem Raster" vorbild="apple.com, rivian.com"><NavDemo art="fest" /></Vorlage>
        <Vorlage nr="6" variante="B" titel="Volle Breite mit Linie" was="Keine Karte, nur eine Linie unter der Leiste" vorbild="aman.com, compass.com"><NavDemo art="linie" /></Vorlage>
        <Vorlage nr="6" variante="Alt" titel="Wie heute" was="Zum Vergleich: Leiste schrumpft zur Pille"><NavDemo art="pille" /></Vorlage>

        <Gruppe nr="8" titel="Zuerst bei UNIO" text="Gibt es heute nicht. Eigene Reihe für Objekte vor der Veröffentlichung. Die gezeigten Objekte sind Beispiele." />
        <Vorlage nr="8" variante="A" titel="Dunkle Reihe" was="Hebt sich klar von den normalen Objekten ab" vorbild="compass.com" dunkel><Zuerst8A /></Vorlage>
        <Vorlage nr="8" variante="B" titel="Liste mit Vormerken" was="Ruhiger, mit einem Knopf zum Vormerken" vorbild="compass.com"><Zuerst8B /></Vorlage>

        <Gruppe nr="9" titel="Schalter Bewegung und Fuß der Seite" text="Heute bewegt sich im Fuß eine unscharfe Glut. Vorschlag: ruhige Fläche, dazu ein Schalter, mit dem Besucher Bewegung abstellen." />
        <Vorlage nr="9A / 10" variante="A" titel="Heller Fuß, Schalter als Text" was="Unauffällig neben Impressum" vorbild="thefold.news"><Fuss ton="hell" schalter="text" /></Vorlage>
        <Vorlage nr="9B / 10" variante="B" titel="Dunkler Fuß, Schalter als Schieber" was="Klarer Abschluss der Seite" vorbild="thefold.news" dunkel><Fuss ton="ink" schalter="schieber" /></Vorlage>
      </div>}

      {r === "circle" && <div>
        <Gruppe nr="7" titel="Verwaltung" text="Heute wird die Seite über 8,2 Bildschirmhöhen festgehalten. Vorschlag: dieselben Inhalte, ohne Festhalten." />
        <Vorlage nr="7" variante="A" titel="Tafeln zum Schieben" was="Vier Schritte nebeneinander, mit Pfeilen" vorbild="airbnb.com"><Tafeln7A /></Vorlage>
        <Vorlage nr="7" variante="B" titel="Überschrift bleibt, Schritte laufen" was="Links steht die Aussage, rechts die Schritte" vorbild="apple.com"><Tafeln7B /></Vorlage>
        <Gruppe nr="3" titel="Aussage-Abschnitt" text="Der Satz der CIRCLE-Seite in den drei Formen." />
        <Vorlage nr="C3" variante="A" titel="Mittig mit Bild darunter" was="" vorbild="takumi.uno"><Aussage3A satz="Du baust auf, was dir gehört." bild="../../assets/team/gruppe-serioes.jpg" /></Vorlage>
        <Vorlage nr="C3" variante="B" titel="Satz links, Bild rechts" was="" vorbild="aman.com"><Aussage3B satz="Du baust auf, was dir gehört." bild="../../assets/team/editorial/lara-jonas.jpg" /></Vorlage>
        <Gruppe nr="5" titel="System-Bereich" text="Derselbe Baustein wie auf der Startseite, hier für Makler." />
        <Vorlage nr="C5" variante="B" titel="Liste links, Bild rechts" was="" vorbild="apple.com"><System5B /></Vorlage>
        <Gruppe nr="2" titel="Drei Aussagen" text="Die Zahlenzeile mit den Aussagen der CIRCLE-Seite." />
        <Vorlage nr="C2" variante="A" titel="Zeitungs-Zahlen" was="" vorbild="thefold.news"><Zahlen2A /></Vorlage>
      </div>}

      {r === "bautraeger" && <div>
        <Gruppe nr="H" titel="Hero Bauträger" text="Heute eine zweigeteilte Karte mit Riffelglas. Zwei Vorschläge in der Form der neuen Startseite." />
        <Vorlage nr="BH" variante="A" titel="Bild im Rahmen" was="Wie Hero A der Startseite" vorbild="rivian.com"><HeroSub art="rahmen" zeilen={["Makler und Marketing,", "verbunden zu einem System."]} text="Die stärksten Makler der Stadt, das beste Marketing und volle Transparenz: verbunden für deinen Abverkauf." knopf="Projekt prüfen lassen" bild={A + "albrecht-dusk.jpg"} /></Vorlage>
        <Vorlage nr="BH" variante="B" titel="Schrift zuerst" was="Wie Hero D und E der Startseite" vorbild="lesintranquilles.com"><HeroSub art="schrift" zeilen={["Projekte planbar", "und erfolgreich"]} text="Die stärksten Makler der Stadt, das beste Marketing und volle Transparenz: verbunden für deinen Abverkauf." knopf="Projekt prüfen lassen" bild={A + "albrechts-fassade.jpg"} /></Vorlage>
        <Gruppe nr="5" titel="LENS zeigen" text="Heute eine festgehaltene Vorführung über 3,2 Bildschirmhöhen. Vorschlag: ein Bild, das man selbst umschaltet." />
        <Vorlage nr="B5" variante="A" titel="Reiter über dem Bild" was="" vorbild="linear.app"><System5A /></Vorlage>
        <Gruppe nr="2" titel="Nutzen in Zahlen" text="Die Zahlenzeile als Zeilen." />
        <Vorlage nr="B2" variante="B" titel="Zeilen" was="" vorbild="thefold.news"><Zahlen2B /></Vorlage>
        <Gruppe nr="4" titel="Ein Projekt im Fokus" text="Ein Beispielprojekt allein auf einer Fläche." />
        <Vorlage nr="B4" variante="B" titel="Dunkle Fläche" was="" vorbild="lesintranquilles.com"><Objekt4 ton="ink" /></Vorlage>
      </div>}

      {r === "story" && <div>
        <Gruppe nr="H" titel="Hero Story" text="Heute eine zweigeteilte Karte. Zwei Vorschläge, die Menschen und Aussage nach vorn stellen." />
        <Vorlage nr="SH" variante="A" titel="Schrift zuerst, Gruppenbild" was="Die Aussage füllt die Breite, darunter das Team" vorbild="lesintranquilles.com"><HeroSub art="schrift" zeilen={["Move", "as one"]} text="Vertrieb, Marketing und Technologie haben einander jahrelang zugearbeitet. 2026 wurden sie ein Unternehmen." knopf="Die Menschen ansehen" bild="../../assets/team/gruppe-serioes.jpg" /></Vorlage>
        <Vorlage nr="SH" variante="B" titel="Schrift zuerst, Menschen im Film" was="Statt des Gruppenbilds der geschnittene Film" vorbild="landonorris.com"><HeroSub art="schrift" film zeilen={["Move", "as one"]} text="Vertrieb, Marketing und Technologie haben einander jahrelang zugearbeitet. 2026 wurden sie ein Unternehmen." knopf="Die Menschen ansehen" /></Vorlage>
        <Gruppe nr="3" titel="Aussage-Abschnitt" text="Heute zwei festgehaltene Abschnitte hintereinander (3,4 und 3,0 Bildschirmhöhen). Vorschlag: ein Satz, ein Bild." />
        <Vorlage nr="S3" variante="A" titel="Mittig mit Bild darunter" was="" vorbild="takumi.uno"><Aussage3A satz="Einzeln lindert man Symptome. Gemeinsam baut man ein System." bild="../../assets/team/gruppe-serioes.jpg" /></Vorlage>
        <Vorlage nr="S3" variante="C" titel="Satz im Bild" was="" vorbild="rivian.com"><Aussage3C satz="Einzeln lindert man Symptome. Gemeinsam baut man ein System." bild={A + "vienna-street.jpg"} /></Vorlage>
      </div>}

      {r === "effekt" && <EffektSeite />}
      {r === "struktur" && <Struktur />}
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<VorlagenSeite />);
