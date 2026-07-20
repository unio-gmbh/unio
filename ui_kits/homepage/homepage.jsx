/* UNIO Startseite — Endkunde zuerst (Suche + Highlights), animiertes System-Bento,
   Bauträger- & CIRCLE-Abholer. Bausteine aus site-shared.jsx. */
const {
  GlassPanel: GPx, GlassCard: GCx, DataOverlay: DOx, FlutedGlass: FGx,
  StatBlock: SBx, DataLabel: DLx, Button: Bx, IconButton: IBx,
} = window.UNIODesignSystem_b6216a;
const { useTick, Reveal, SiteNav, Chapter, PropCard, OBJEKT_DB, SiteFooter, U_RM: RMx, LivePill: LPx, Annotation: Anx, SignalRaster: SRx, StatFrame: SFx } = window;

/* ---------- Hero-Neubau: „Der Markt wird lesbar“ als Choreografie (Briefing v1) ---------- */
function Hero() {
  const [t, setT] = React.useState(RMx ? 99999 : 0);
  const [sy, setSy] = React.useState(0);
  const mob = window.useMobile();
  const vidRef = React.useRef(null);
  React.useEffect(() => {
    const v = vidRef.current;
    if (!v || RMx) return; // bei Reduced-Motion bleibt das Poster stehen
    v.muted = true;
    // Mehrere Anlaeufe: Autoplay wird je nach Browser/Netz erst spaeter erlaubt.
    // Schlaegt alles fehl, bleibt das Poster (echtes Video-Standbild) sichtbar.
    const go = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    go();
    const evts = ["canplay", "loadeddata", "canplaythrough"];
    evts.forEach((e) => v.addEventListener(e, go));
    const onVis = () => { if (!document.hidden) go(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { evts.forEach((e) => v.removeEventListener(e, go)); document.removeEventListener("visibilitychange", onVis); };
  }, []);
  React.useEffect(() => {
    if (RMx) return;
    const t0 = performance.now();
    let raf;
    const tick = (now) => { const el = now - t0; setT(el); if (el < 3600) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  React.useEffect(() => {
    const on = () => setSy(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const reveal = RMx ? 1 : Math.min(1, Math.max(0, (t - 900) / 1600)); // 900–2500 ms
  const annIn = t > 2500;
  const lineIn = (i) => t > 120 + i * 240;
  const panelIn = (i) => t > 300 + i * 260;

  const H = { margin: 0, font: "500 clamp(52px, 8.2vw, 138px)/0.96 var(--font-display)", letterSpacing: "-0.035em", color: "var(--ink)", whiteSpace: "nowrap" };
  const marg = { font: "11px var(--font-mono)", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", whiteSpace: "nowrap" };
  const lineDir = [-110, 120, -90];
  const lineStyle = (i) => ({ opacity: lineIn(i) ? 1 : 0, filter: lineIn(i) ? "blur(0)" : "blur(10px)", transform: `translateX(${lineIn(i) ? 0 : lineDir[i]}px)`, transition: "opacity 1000ms var(--ease-unio), filter 1000ms var(--ease-unio), transform 1100ms var(--ease-unio)" });
  const ctaStatic = { opacity: lineIn(2) ? 1 : 0, transform: lineIn(2) ? "none" : "translateY(16px)", transition: "opacity 900ms var(--ease-unio), transform 900ms var(--ease-unio)" };
  // Scroll → Hero wird vollflächig: Pudding + Radius kollabieren
  const bleed = RMx ? 0 : Math.min(1, sy / 320);
  const pad = (v, to) => to === undefined ? Math.round(v * (1 - bleed)) : Math.round(v + (to - v) * bleed);
  const panelStyle = (i, f) => ({
    position: "relative", overflow: "hidden", aspectRatio: "3 / 3.6", background: "var(--paper-2)",
    boxShadow: "inset 0 0 0 1px var(--ink-3)", borderRadius: 6,
    opacity: panelIn(i) ? 1 : 0,
    transform: `translateY(${panelIn(i) ? 0 : 30}px)`,
    transition: "opacity 800ms var(--ease-unio), box-shadow 400ms",
  });

  return (
    <section id="top" data-screen-label="Hero" style={{ position: "sticky", top: 0, zIndex: 0, height: "100svh", overflow: "hidden", background: "var(--ink)" }}>
      <video ref={vidRef} poster="../../assets/img/hero-poster.jpg" muted loop autoPlay playsInline preload={RMx ? "none" : "auto"}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", backgroundImage: "url(../../assets/img/hero-poster.jpg)", backgroundSize: "cover", backgroundPosition: "center", transform: `scale(${1 + (RMx ? 0 : sy * 0.0002)})` }}>
        <source src="../../assets/video/hero-fenster.webm" type="video/webm" />
        <source src="../../assets/video/hero-fenster.mp4" type="video/mp4" />
      </video>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.55) 0%, rgba(11,10,9,0.15) 30%, rgba(11,10,9,0.2) 60%, rgba(11,10,9,0.55))" }}></div>
      <div className="u-grain" style={{ position: "absolute", inset: 0 }}></div>

      <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(24px, 5vw, 96px)", opacity: 1 - bleed * 1.4 }}>
        <h1 style={{ margin: 0, font: `500 ${mob ? "clamp(40px, 11.5vw, 56px)" : "clamp(56px, 9vw, 168px)"}/0.94 var(--font-display)`, letterSpacing: "-0.04em", color: "#FFFFFF", maxWidth: 1200 }}>
          <span style={{ display: "block", ...lineStyle(0) }}>Real Estate</span>
          <span style={{ display: "block", ...lineStyle(1) }}>Finally Simple<span style={{ display: "inline-block", width: "0.14em", height: "0.14em", borderRadius: 4, background: "var(--signal)", marginLeft: "0.08em", verticalAlign: "baseline" }}></span></span>
        </h1>
        <p style={{ maxWidth: 520, margin: "clamp(24px, 3vh, 40px) 0 0", font: "400 clamp(17px, 1.7vw, 21px)/1.6 var(--font-display)", color: "rgba(247,245,241,0.9)", ...ctaStatic }}>
          Wir bauen Technologie, damit Menschen besser kaufen, verkaufen und beraten können. Alles daran hat ein Ziel: dass du findest, was du wirklich suchst.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: "clamp(28px, 4vh, 44px)", flexWrap: "wrap", ...ctaStatic }}>
          <Bx size="lg" variant="paper" knob onClick={() => (location.hash = "suche")}>Immobilie finden</Bx>
          <Bx size="lg" variant="glass" tone="dark" glyph="▷">Wie es funktioniert</Bx>
        </div>
      </div>
    </section>
  );
}

/* ---------- Suche + Highlight-Immobilien (Endkunde zuerst) ---------- */
function SucheHighlights() {
  const [q, setQ] = React.useState("");
  const [hov, setHov] = React.useState(-1);
  const mob = window.useMobile();
  const treffer = OBJEKT_DB.filter((o) => !q.trim() || (o.q + " " + o.t + " " + o.adr).toLowerCase().includes(q.trim().toLowerCase()));
  const shown = treffer.slice(0, 3);
  return (
    <section id="suche" data-screen-label="Suche" className="u-grain" style={{ position: "relative", zIndex: 2, background: "var(--paper)", borderRadius: "28px 28px 0 0", marginTop: "-4vh", boxShadow: "0 -30px 60px -30px rgba(11,10,9,0.4)", padding: mob ? "96px 6vw 120px" : "150px 6vw 185px" }}>
      <div style={{ position: "relative", zIndex: 1 }}>
      <Chapter title={<span>Finde dein<br />nächstes Zuhause.</span>} copy="Kuratierte Wiener Projekte und Einzelobjekte — jedes davon live und transparent vermarktet." style={{ marginBottom: mob ? 44 : 72 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, maxWidth: 680, background: "var(--surface-raised)", borderRadius: "var(--r-pill)", padding: "8px 8px 8px 24px", boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)" }}>
        <span aria-hidden="true" style={{ font: "15px var(--font-mono)", color: "var(--text-muted)" }}>→</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={mob ? "Bezirk, Projekt, Objektart" : "Bezirk, Projekt oder Objektart — z. B. Penthouse 1020"}
          style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "none", font: "400 16px var(--font-display)", color: "var(--ink-2)" }}
        />
        <Bx variant="signal" knob onClick={() => window.open(window.UNIO_SEARCH_URL + (q ? "&search=" + encodeURIComponent(q) : ""), "_blank")}>Suchen</Bx>
      </div>
      {q.trim() ? (
        <div className="u-label" style={{ marginTop: 14, color: "var(--text-muted)", fontSize: 10 }}>{treffer.length} Treffer im Bestand</div>
      ) : null}
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: 24, marginTop: 24 }}>
        {shown.map((o, i) => (
          <Reveal key={o.t} delay={i * 90}>
            <PropCard o={o} hov={hov === i} onHov={(v) => setHov(v === false ? -1 : i)} />
          </Reveal>
        ))}
        {shown.length === 0 && (
          <div style={{ gridColumn: mob ? "auto" : "span 3", padding: "40px 0", color: "var(--text-muted)", font: "400 16px var(--font-display)" }}>
            Kein Treffer im kuratierten Bestand — starte die Suche im Dashboard <a href={window.UNIO_SEARCH_URL} target="_blank" rel="noopener" style={{ color: "var(--signal-deep)" }}>app.unio.at ↗</a>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
        <Bx variant="ghost" onClick={() => location.assign("immobilien.html")}>Alle Immobilien ansehen</Bx>
        <Bx variant="ghost" onClick={() => window.open(window.UNIO_BEWERTUNG_URL, "_blank")}>Eigene Immobilie bewerten ↗</Bx>
      </div>
      </div>
    </section>
  );
}

/* ---------- Statement + Zahlen ---------- */
function Markt() {
  const mob = window.useMobile();
  const statSize = mob ? "clamp(64px, 17vw, 84px)" : "clamp(84px, 8.4vw, 148px)";
  return (
    <section id="markt" data-screen-label="Markt" className="u-grain" style={{ background: "var(--paper-2)", padding: mob ? "100px 6vw 100px" : "160px 6vw 160px" }}>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 1.4fr) minmax(0, 1fr)", gap: mob ? 24 : 64, alignItems: mob ? "start" : "end" }}>
        <Reveal><h2 style={{ margin: 0, font: `500 ${mob ? "clamp(34px, 9vw, 44px)" : "clamp(40px, 4.4vw, 76px)"}/1.02 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>
          Echte Deals<br />durch echte Daten.
        </h2></Reveal>
        <p style={{ margin: 0, font: `400 ${mob ? 15.5 : 18}px/1.6 var(--font-display)`, color: "var(--text-muted)", maxWidth: 420 }}>
          Hinter jeder Immobilie steht ein Mensch mit einem Plan. Unsere Daten sorgen dafür, dass Plan und Objekt zueinanderfinden: transparent, nachvollziehbar, ohne Umwege.
        </p>
      </div>
      {/* Eine Zahl pro Zielgruppe, jede verlinkt auf ihre Seite */}
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: mob ? 36 : 48, marginTop: mob ? 64 : 120, borderTop: "1px solid var(--hairline-dark)", paddingTop: mob ? 44 : 60 }}>
        {[
          ["Wenn du verkaufst", "immobilien.html", 80, "%", "weniger Aufwand — wir übernehmen Vermarktung, Prüfung und Abwicklung"],
          ["Wenn du baust", "bautraeger.html", 100, "%", "Transparenz — jede Anfrage live in LENS"],
          ["Wenn du makelst", "makler.html", 100, "%", "Provision ab € 150K Jahresumsatz · CIRCLE"],
        ].map(([grp, href, val, unit, label]) => (
          <a key={href} href={href} style={{ textDecoration: "none", display: "block" }}>
            <span className="u-label" style={{ fontSize: 10, color: "var(--signal-deep)" }}>{grp} →</span>
            <div style={{ marginTop: 10 }}>
              <SBx value={val} unit={unit} label={label} tone="light" size={statSize} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------- Bauträger & CIRCLE abholen ---------- */
function Zielgruppen() {
  const mob = window.useMobile();
  return (
    <section id="zielgruppen" data-screen-label="Zielgruppen" className="u-grain" style={{ background: "var(--paper-2)", padding: mob ? "100px 6vw 110px" : "160px 5vw 180px" }}>
      <Chapter title={<span>Für die, die den Markt<br />bewegen.</span>} style={{ marginBottom: mob ? 44 : 76 }} />
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 16 : 24 }}>
        {/* Bauträger — Orange-Panel */}
        <div className="u-grain" style={{ background: "var(--signal)", borderRadius: "var(--r-panel)", padding: "clamp(32px, 4vw, 52px)", color: "#FFFFFF", display: "flex", flexDirection: "column", minHeight: 420 }}>
          <span className="u-label" style={{ color: "rgba(255,245,239,0.92)", fontSize: 10 }}>Für Bauträger</span>
          <h3 style={{ margin: "18px 0 0", font: "500 clamp(28px, 2.6vw, 42px)/1.05 var(--font-display)", letterSpacing: "-0.03em" }}>
            Wissen, was funktioniert<br />bevor gebaut wird.
          </h3>
          <p style={{ margin: "16px 0 0", font: "400 16px/1.6 var(--font-display)", color: "rgba(255,245,239,0.9)", maxWidth: 420 }}>
            Wir testen dein Projekt live am Markt und steuern Marketing und Vertrieb datenbasiert bis zum Abverkauf — 100 % erfolgsbasiert.
          </p>
          <div style={{ display: "flex", gap: 28, marginTop: 30, borderTop: "1px solid rgba(255,255,255,0.35)", paddingTop: 22 }}>
            {[["+31 %", "über Zielpreis · Ecoluxe"], ["282", "Anfragen · ein Projekt"], ["T+38", "Ø Abverkauf"]].map(([v, k]) => (
              <div key={k}>
                <div style={{ font: "500 26px/1 var(--font-display)", letterSpacing: "-0.02em", color: "#FFFFFF" }}>{v}</div>
                <div className="u-label" style={{ color: "rgba(255,245,239,0.92)", fontSize: 10, marginTop: 7 }}>{k}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "auto", paddingTop: 28 }}>
            <Bx variant="paper" size="lg" knob onClick={() => location.assign("bautraeger.html")}>Projekt prüfen lassen</Bx>
          </div>
        </div>
        {/* CIRCLE — Porträt einer Partnerin + Zitat, Du */}
        <div style={{ position: "relative", borderRadius: "var(--r-panel)", overflow: "hidden", minHeight: 420 }}>
          <img src="../../assets/team/portrait-03.jpg" alt="CIRCLE Partner:in" style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: mob ? "116%" : "142%", maxWidth: "none", height: "100%", objectFit: "cover", objectPosition: "center 16%" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.24), rgba(11,10,9,0.68))" }}></div>
          <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", padding: "clamp(32px, 4vw, 52px)", color: "var(--text-inverse)", zIndex: 3 }}>
            <span className="u-label" style={{ color: "var(--text-inverse-muted)", fontSize: 10 }}>Für Makler:innen · CIRCLE</span>
            <h3 style={{ margin: "18px 0 0", font: "500 clamp(28px, 2.6vw, 42px)/1.05 var(--font-display)", letterSpacing: "-0.03em", textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}>
              Nicht die Agentur.<br />Nicht das Portal. Du.
            </h3>
            <figure style={{ margin: "20px 0 0", padding: "2px 0 2px 16px", borderLeft: "1.5px solid var(--signal)", maxWidth: 400 }}>
              <blockquote style={{ margin: 0, font: "400 16px/1.55 var(--font-display)", color: "rgba(247,245,241,0.92)", textShadow: "0 1px 14px rgba(0,0,0,0.45)" }}>„Ich wollte nie ein Büro über mir. Ich wollte ein System hinter mir."</blockquote>
              <figcaption className="u-label" style={{ fontSize: 9.5, color: "rgba(247,245,241,0.75)", marginTop: 8, textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>[PLATZHALTER: Name] · CIRCLE Partnerin · Wien</figcaption>
            </figure>
            <div style={{ marginTop: "auto", paddingTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Bx variant="glass" tone="dark" size="lg" knob onClick={() => location.assign("makler.html")}>CIRCLE entdecken</Bx>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Produkte ---------- */
const PRODUKTE = [
  ["NOVA", "Marktvalidierung in Echtzeit. NOVA zeigt, ob Projekt, Pricing oder Grundrisse den Nerv der Zielgruppe treffen — und liefert datenbasierte Handlungsempfehlungen für fundierte Entscheidungen schon vor dem Verkaufsstart.", "bautraeger.html#system", "Für Bauträger"],
  ["CIRCLE", "Circle verbindet die besten Makler:innen zu einer leistungsorientierten Community. Selbstständig im Handeln, aber mit dem Rückhalt eines starken Netzwerks — inklusive High-End-Software, Support und Beteiligung.", "makler.html", "Für Makler:innen"],
  ["LEAD ENGINE", "Skalierbare Leadgenerierung über die relevanten Kanäle — mit sauberem Tracking, kreativer Iteration und einem Setup, das Nachfrage in planbaren Vertrieb übersetzt.", "bautraeger.html#system", "Für Bauträger"],
  ["LENS", "Lens liefert volle Transparenz über Projekte, Leads und Vertriebsperformance. Von der Planung bis zum Abschluss zeigt das Dashboard alle relevanten Daten in Echtzeit — für präzise Steuerung und bessere Ergebnisse.", "bautraeger.html#system", "Für Bauträger"],
];
function Produkte() {
  const [hov, setHov] = React.useState(-1);
  const mob = window.useMobile();
  return (
    <section id="produkte" data-screen-label="Produkte" className="u-grain" style={{ background: "var(--paper)", padding: mob ? "110px 6vw" : "175px 6vw" }}>
      <div style={{ textAlign: "center", maxWidth: 900, margin: "0 auto 80px" }}>
        <span className="u-label" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "8px 16px", borderRadius: "var(--r-pill)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}>
          <span aria-hidden="true" style={{ width: 13, height: 13, borderRadius: "50%", border: "2px solid var(--signal)", borderRightColor: "transparent", transform: "rotate(-45deg)" }}></span>Produkte
        </span>
        <h2 style={{ margin: "26px 0 0", font: "500 clamp(36px, 4.6vw, 76px)/1.04 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>
          High-End-Software und<br />Community vereint.
        </h2>
        <p style={{ margin: "26px auto 0", font: "400 17px/1.7 var(--font-display)", color: "var(--text-muted)", maxWidth: 520 }}>
          Vier Produkte, ein Prinzip: Technologie übernimmt das Rechnen und Verwalten, Menschen übernehmen Beratung und Entscheidung.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(4, 1fr)", gap: mob ? 14 : 20 }}>
        {PRODUKTE.map(([t, c, href, ziel], i) => (
          <Reveal key={t} delay={i * 90}>
            <a href={href} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(-1)}
              style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none", background: "#FFFFFF", borderRadius: "var(--r-card)", padding: "34px 30px 32px", boxShadow: hov === i ? "inset 0 0 0 1px var(--hairline-dark), var(--shadow-soft)" : "inset 0 0 0 1px var(--hairline-dark)", transform: hov === i ? "translateY(-4px)" : "none", transition: "all var(--dur-fast) var(--ease-unio)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ margin: 0, font: "500 26px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{t}</h3>
                <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--signal)", opacity: hov === i ? 1 : 0, transition: "opacity var(--dur-fast) var(--ease-unio)" }}></span>
              </div>
              <p style={{ margin: "28px 0 0", font: "400 14px/1.7 var(--font-display)", color: "var(--text-muted)" }}>{c}</p>
              <span style={{ marginTop: "auto", paddingTop: 24, font: "500 13.5px var(--font-display)", color: hov === i ? "var(--signal-deep)" : "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: 7, transition: "color var(--dur-fast) var(--ease-unio)" }}>
                {ziel} <span style={{ font: "12px var(--font-mono)" }}>→</span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Produkte-Ende ---------- */
function App() {
  return (
    <div style={{ fontFamily: "var(--font-display)" }}>
      <SiteNav active="index.html" />
      <Hero />
      <SucheHighlights />
      <Markt />
      <Produkte />
      <window.SystemBento />
      <Zielgruppen />
      <SiteFooter />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
