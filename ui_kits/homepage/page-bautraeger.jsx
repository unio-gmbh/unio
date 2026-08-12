/* UNIO — Bauträger v4 (Feedback 05.08.): Story ohne Testing-Fokus, Problem→Lösung.
   01 Split-Hero (stärkste Makler + bestes Marketing) · Störer · 02 Problem→Lösung
   (gepinnt, ersetzt Leistungen + SystemLine) · 03 Beweis · Funnel-Graph ·
   Lernkurve/Dashboard · Nutzen-Bento (Risiko-Umkehr) · Zwei Ausgangslagen ·
   100 % Modell · Strecke · Funnel · Einwände. Tracking-Events: data-track. */
const {
  GlassPanel: GPb, FlutedGlass: FGb, StatBlock: SBb, DataLabel: DLb,
  Button: Bb, IconButton: IBb, Tag: Tgb,
} = window.UNIODesignSystem_b6216a;
const { SiteNav, SiteFooter, Reveal } = window;
const { Kap, GridLines, StickyCTA, SystemLine, Lernkurve, CountUp, useOnceInView, Fx, BT_EASE, BT_RM } = window.BT;

/* ===== Bridge-Störer (Direktive v2): reines Duotone-Foto-Band, ohne Overlay, ohne Text ===== */
function BridgeBt({ img }) {
  return (
    <section data-screen-label="Bridge" style={{ position: "relative", height: "56vh", minHeight: 380, overflow: "hidden", background: "var(--ink)" }}>
      <img src={img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
    </section>
  );
}

Object.assign(window, { BridgeBt });

/* ===== 01 · HERO — Split, Klarheits-Reveal als Lade-Choreografie ===== */
function DockPoint({ top, right, label, show, delay }) {
  return (
    <div style={{ position: "absolute", top, right, display: "flex", alignItems: "center", opacity: show ? 1 : 0, transform: show ? "none" : "translateY(10px)", transition: `all 700ms ${BT_EASE} ${delay}ms` }}>
      <span aria-hidden="true" style={{ width: 40, height: 1, background: "var(--hairline-light-strong)" }}></span>
      <span className="u-label" style={{ fontSize: 10, color: "var(--text-inverse)", background: "var(--glass-dark)", WebkitBackdropFilter: "blur(14px)", backdropFilter: "blur(14px)", padding: "8px 13px", borderRadius: "var(--r-pill)", boxShadow: "inset 0 0 0 1px var(--hairline-light)", whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );
}

function HeroBt() {
  const [reveal, setReveal] = React.useState(window.BT.BT_RM ? 1 : 0.06);
  const [docked, setDocked] = React.useState(window.BT.BT_RM);
  const mob = window.useMobile();
  React.useEffect(() => {
    if (window.BT.BT_RM) return;
    const t1 = setTimeout(() => setReveal(1), 400);
    const t2 = setTimeout(() => setDocked(true), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  const statSize = mob ? "clamp(60px, 16vw, 80px)" : "clamp(84px, 8.4vw, 148px)";
  return (
    <section id="top" data-track="chapter_view_01" data-screen-label="Hero" style={{ position: "relative", background: "var(--paper)", padding: mob ? "82px 14px 0" : "98px 40px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 52fr) minmax(0, 48fr)", minHeight: mob ? "auto" : "calc(100svh - 120px)", borderRadius: mob ? 18 : 22, overflow: "hidden", border: "0.5px solid var(--hairline-dark)", boxShadow: "0 1px 0 rgba(255,255,255,.6) inset" }}>
        {/* Links: Off-White, Treppen-Satz */}
        <div className="u-grain" style={{ position: "relative", overflow: "hidden", background: "var(--paper)", display: "flex", flexDirection: "column", justifyContent: "center", padding: mob ? "56px 24px 44px" : "175px 4vw 120px 7vw" }}>
          <div className="u-herglow" aria-hidden="true" style={{ position: "absolute", left: "-14%", top: "8%", width: "60%", height: "80%", zIndex: 0, pointerEvents: "none", background: "radial-gradient(60% 60% at 20% 40%, rgba(255,170,9,.18) 0%, rgba(255,219,87,.09) 44%, transparent 72%)", animation: BT_RM ? "none" : "heroGlowDrift 30s ease-in-out infinite alternate" }}></div>
          <GridLines />
          <h1 style={{ margin: 0, font: `500 ${mob ? "clamp(30px, 8vw, 40px)" : "clamp(36px, 4vw, 70px)"}/1.06 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)", position: "relative" }}>
            <span style={{ display: "block" }}>Makler und Marketing,</span>
            <span style={{ display: "block", marginLeft: mob ? "4%" : "8%", color: "transparent", WebkitTextStroke: "1.5px var(--ink)" }}>verbunden</span>
            <span style={{ display: "block", marginLeft: mob ? "8%" : "16%" }}>zu einem System<span style={{ color: "var(--signal)" }}>.</span></span>
          </h1>
          <p style={{ margin: mob ? "20px 0 0" : "24px 0 0 16%", font: `400 ${mob ? 15.5 : 17}px/1.6 var(--font-display)`, color: "var(--text-muted)", maxWidth: 400, position: "relative" }}>
            Die stärksten Makler der Stadt, das beste Marketing und volle Transparenz: verbunden für deinen Abverkauf.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: mob ? 24 : 30, marginLeft: mob ? 0 : "16%", alignItems: "center", position: "relative", flexWrap: "wrap" }}>
            <Bb size="lg" knob data-track="hero_cta_primary" onClick={() => (location.hash = "funnel")}>Projekt prüfen lassen</Bb>
            <Bb size="lg" variant="ghost" data-track="hero_cta_secondary" onClick={() => (location.hash = "system")}>So arbeiten wir</Bb>
          </div>
        </div>
        {/* Rechts: Projektfoto, Reveal-Choreografie */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: mob ? 380 : 480 }}>
          <FGb reveal={reveal} side="left" strength={13} style={{ position: "absolute", inset: 0 }}>
            <img src="../../assets/img/penthouse.jpg" alt="Origins — Penthouse, Wien 1180" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </FGb>
          <DockPoint top="18%" right="8%" label="Kampagne live" show={docked} delay={0} />
          <DockPoint top="42%" right="16%" label="Nachfrage-Score 72" show={docked} delay={160} />
          <DockPoint top="64%" right="7%" label="Top 4 reserviert" show={docked} delay={320} />
        </div>
      </div>
      {/* Kennzahlen-Reihe (StatBlock-Stil, groß & zentriert) */}
      <div style={{ position: "relative", zIndex: 5, margin: mob ? "72px auto 80px" : "150px auto 130px", paddingTop: mob ? 44 : 60, borderTop: "1px solid var(--hairline-dark)", display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: mob ? 36 : 48, maxWidth: 1200 }}>
        <SBb value="1 Mrd" label="Projektvolumen in der Pipeline" tone="light" size={statSize} />
        <SBb value={100} unit="%" label="Transparenz durch UNIO Lens" tone="light" size={statSize} />
        <SBb value="1 Mrd" label="Reichweite mit unseren Kampagnen" tone="light" size={statSize} />
      </div>
    </section>
  );
}

/* ===== 02 · PROBLEM → LÖSUNG — gepinnt, jedes Problem bekommt seine Antwort ===== */
const PL_PAARE = [
  ["Inserate warten, bis Nachfrage zufällig vorbeikommt.", "LEAD ENGINE", "Nachfrage, die wir schaffen.", "Kampagnen auf Meta und Google bringen planbare Nachfrage, messbar bis zur Anfragequalität. Wir gehen mit dem Marketing in Vorleistung."],
  ["Makler arbeiten nebeneinander, jeder für sich.", "CIRCLE", "Die stärksten Makler, verbunden.", "Eine kuratierte Community aus Top-Maklern verkauft dein Projekt gemeinsam: gesteuert statt gehofft, mit vorgemerkten Käufern."],
  ["Reporting kommt Wochen später, als PDF.", "LENS", "Du siehst alles. Live.", "Pipeline, Anfragen und Unit-Status in Echtzeit im Dashboard. Reporting-Meetings entfallen, du schaust einfach rein."],
  ["Entscheidungen fallen nach Gefühl.", "NOVA", "Der Markttest vor dem Baustart.", "Preisband und Grundrisse am echten Markt validieren, bevor gebaut wird: die nächste Ausbaustufe des Systems. Heute schon fließen alle Kampagnen-Daten zurück in dein Projekt."],
];
/* Produktband-Toene: Signal in drei Abstufungen, Zukunftsvision neutral */
const PL_SHADES = ["#FFAA09", "#EE9410", "#D97F06", "var(--paper-3, #ECE9E2)"];
function PlZeile({ paar, on, zukunft, mob, idx }) {
  const [problem, produkt, titel, copy] = paar;
  const band = PL_SHADES[Math.min(idx, PL_SHADES.length - 1)];
  return (
    <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 0.9fr) minmax(0, 1.1fr)", gap: mob ? 10 : 56, alignItems: "center", padding: mob ? "16px 0" : "13px 0", borderTop: "1px solid var(--hairline-dark)" }}>
      <div style={{ alignSelf: mob ? "start" : "center" }}>
        <span style={{ display: "inline-block", maxWidth: mob ? "none" : "24ch", font: `400 ${mob ? 15 : "clamp(15px, 1.25vw, 18px)"}/1.5 var(--font-display)`, color: on ? "var(--text-muted)" : "var(--ink)", textDecoration: "line-through", textDecorationThickness: 1.5, textDecorationColor: on ? "var(--signal)" : "transparent", transition: `color 500ms ${BT_EASE}, text-decoration-color 650ms ${BT_EASE}` }}>
          {problem}
        </span>
      </div>
      <div style={{ position: "relative", overflow: "hidden", opacity: on ? 1 : 0.18, transform: on ? "none" : "translateX(26px)", transition: `all 600ms ${BT_EASE}`, background: "#FFFFFF", borderRadius: "var(--r-card)", padding: mob ? "16px 48px 16px 18px" : "15px 58px 15px 22px", boxShadow: "inset 0 0 0 1px var(--hairline-dark), 0 1px 2px rgba(11,10,9,0.04)" }}>
        {/* vertikales Produktband am rechten Kartenrand */}
        <span style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: mob ? 32 : 38, background: band, display: "flex", alignItems: "center", justifyContent: "center", transform: on ? "none" : "translateX(100%)", transition: `transform 550ms ${BT_EASE}` }}>
          <span style={{ writingMode: "vertical-rl", font: "10px var(--font-mono)", letterSpacing: "0.2em", textTransform: "uppercase", color: zukunft ? "var(--text-muted)" : "#FFFFFF", whiteSpace: "nowrap" }}>{produkt}</span>
        </span>
        {zukunft && <span className="u-label" style={{ display: "block", fontSize: 10, color: "var(--text-muted)", marginBottom: 6 }}>Zukunftsvision</span>}
        <div style={{ font: `500 ${mob ? 17 : "clamp(17px, 1.5vw, 22px)"}/1.2 var(--font-display)`, letterSpacing: "-0.02em", color: "var(--ink)" }}>{titel}</div>
        <p style={{ margin: "6px 0 0", font: `400 ${mob ? 13 : 13.5}px/1.5 var(--font-display)`, color: "var(--text-muted)", maxWidth: "56ch" }}>{copy}</p>
      </div>
    </div>
  );
}
function ProblemBt() {
  const mob = window.useMobile();
  const secRef = React.useRef(null);
  const [p, setP] = React.useState(BT_RM ? 1 : 0);
  React.useEffect(() => {
    if (BT_RM) return;
    const on = () => {
      const el = secRef.current; if (!el) return;
      setP(Math.max(0, Math.min(1, (scrollY - el.offsetTop) / (el.offsetHeight - innerHeight))));
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  if (BT_RM) {
    return (
      <section id="system" data-track="chapter_view_02" data-screen-label="System" className="u-grain" style={{ position: "relative", background: "var(--paper)", padding: "100px 6vw 96px" }}>
        <Kap nr="02" label="System" />
        <div style={{ maxWidth: 640, marginBottom: 40, position: "relative" }}>
          <h2 style={{ margin: 0, font: "500 clamp(30px, 8vw, 40px)/1.06 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>
            Projekte <em style={{ fontStyle: "italic" }}>planbarer</em><br />und erfolgreicher machen.
          </h2>
          <p style={{ margin: "16px 0 0", font: "400 15px/1.65 var(--font-display)", color: "var(--text-muted)", maxWidth: 500 }}>
            Kein weiteres Tool, sondern ein System: Jedes Problem im Abverkauf bekommt eine Antwort.
          </p>
        </div>
        {PL_PAARE.map((paar, i) => (
          <PlZeile key={paar[1]} paar={paar} on={true} zukunft={i === 3} mob={true} idx={i} />
        ))}
      </section>
    );
  }
  if (mob) {
    /* Mobile: gepinnt, die vier Paare laufen als Schritte durch */
    const stepP = Math.max(0, Math.min(3.999, p * 4.4));
    const act = Math.min(3, Math.floor(stepP));
    const geloest = Math.min(4, act + (stepP - act > 0.35 ? 1 : 0));
    return (
      <section id="system" ref={secRef} data-track="chapter_view_02" data-screen-label="System" style={{ height: "280vh", position: "relative", background: "var(--paper)" }}>
        <div className="u-grain" style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "76px 6vw 34px" }}>
          <Kap nr="02" label="System" />
          <h2 style={{ margin: 0, font: "500 clamp(26px, 7vw, 34px)/1.08 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>
            Projekte <em style={{ fontStyle: "italic" }}>planbarer</em><br />und erfolgreicher machen.
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
            <svg width="30" height="30" viewBox="0 0 34 34" aria-hidden="true">
              <circle cx="17" cy="17" r="14" fill="none" stroke="var(--hairline-dark)" strokeWidth="1.5" />
              <circle cx="17" cy="17" r="14" fill="none" stroke="var(--signal)" strokeWidth="1.5" strokeDasharray={2 * Math.PI * 14} strokeDashoffset={(1 - p) * 2 * Math.PI * 14} transform="rotate(-90 17 17)" strokeLinecap="round" />
            </svg>
            <span className="u-label" style={{ fontSize: 10, color: "var(--text-muted)" }}>{Math.max(1, geloest)} von 4 gelöst</span>
          </div>
          <div style={{ position: "relative", minHeight: 310, marginTop: 20 }}>
            {PL_PAARE.map((paar, i) => (
              <div key={paar[1]} style={{ position: "absolute", inset: 0, opacity: act === i ? 1 : 0, transform: act === i ? "none" : (i < act ? "translateY(-14px)" : "translateY(14px)"), transition: `all 450ms ${BT_EASE}`, pointerEvents: act === i ? "auto" : "none" }}>
                <PlZeile paar={paar} on={act > i || stepP - i > 0.35} zukunft={i === 3} mob={true} idx={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="system" ref={secRef} data-track="chapter_view_02" data-screen-label="System" style={{ height: "300vh", position: "relative", background: "var(--paper)" }}>
      <div className="u-grain" style={{ position: "sticky", top: 0, minHeight: "100svh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(70px, 11vh, 120px) 7vw clamp(36px, 6vh, 70px)" }}>
        <GridLines />
        <Kap nr="02" label="System" />
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)", gap: 56, alignItems: "start", position: "relative" }}>
          <div>
            <h2 style={{ margin: 0, font: "500 clamp(30px, 3.2vw, 54px)/1.06 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>
              Projekte <em style={{ fontStyle: "italic" }}>planbarer</em><br />und erfolgreicher machen.
            </h2>
            <p style={{ margin: "20px 0 0", font: "400 16px/1.7 var(--font-display)", color: "var(--text-muted)", maxWidth: 400 }}>
              Kein weiteres Tool, sondern ein System: Jedes Problem im Abverkauf bekommt eine Antwort. Scroll, und die linke Seite erledigt sich.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 40 }}>
              <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
                <circle cx="17" cy="17" r="14" fill="none" stroke="var(--hairline-dark)" strokeWidth="1.5" />
                <circle cx="17" cy="17" r="14" fill="none" stroke="var(--signal)" strokeWidth="1.5" strokeDasharray={2 * Math.PI * 14} strokeDashoffset={(1 - p) * 2 * Math.PI * 14} transform="rotate(-90 17 17)" strokeLinecap="round" />
              </svg>
              <span className="u-label" style={{ fontSize: 10, color: "var(--text-muted)" }}>{Math.min(4, Math.floor(p * 4.6) + (p > 0.02 ? 1 : 0)) || 1} von 4 gelöst</span>
            </div>
          </div>
          <div>
            {PL_PAARE.map((paar, i) => (
              <PlZeile key={paar[1]} paar={paar} on={BT_RM || p * 4.6 - i > 0.5} zukunft={i === 3} mob={false} idx={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== 03 · DER BEWEIS — Formora-Slide + Treppen-Stats ===== */
function ProofBt() {
  const [ref, run] = useOnceInView(0.3);
  const mob = window.useMobile();
  const stats = [
    { v: 61, k: "Anfragen / 2 Wo. · Das Albrecht", off: 0 },
    { v: 27, k: "Anfragen / 2 Wo. · Beheim", off: 44 },
    { v: 40, k: "Anfragen nach Übernahme · Penthouse € 4 Mio", off: 88 },
    { v: 25, k: "hochqual. Anfragen / Wo. · ObenZwei", off: 132 },
  ];
  const edge = mob ? 20 : 38;
  const labels = mob
    ? [["Case", "Das Albrecht", { top: 22, left: edge }], ["Status", "Live vermarktet", { top: 22, right: edge, textAlign: "right" }, true]]
    : [["Case", "Das Albrecht", { top: 34, left: edge }], ["Status", "Live vermarktet", { top: 34, right: edge, textAlign: "right" }, true], ["Vermarktung", "Kampagne + CIRCLE", { bottom: 34, left: edge }], ["Steuerung", "Live · LENS", { bottom: 34, right: edge, textAlign: "right" }]];
  return (
    <section data-track="chapter_view_03" data-screen-label="Beweis" className="u-grain" style={{ position: "relative", background: "var(--paper-2)", padding: mob ? "100px 6vw 110px" : "175px 7vw 175px" }}>
      <GridLines />
      <Kap nr="03" label="Beweis" />
      <div style={{ position: "relative", borderRadius: "var(--r-panel)", overflow: "hidden", boxShadow: "var(--shadow-soft)" }}>
        <img src="../../assets/img/albrechts-hof.jpg" alt="Albrechts Townhouses, Blick über den Hof" style={{ display: "block", width: "100%", height: mob ? "min(64vh, 480px)" : "min(70vh, 620px)", objectFit: "cover" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.34), transparent 36%, transparent 58%, rgba(11,10,9,0.5))" }}></div>
        <div aria-hidden="true" style={{ position: "absolute", inset: mob ? 10 : 18, border: "1px solid rgba(255,255,255,0.34)", borderRadius: 14, pointerEvents: "none" }}></div>
        {labels.map(([k, v, posi, sig]) => (
          <div key={k} style={{ position: "absolute", color: "var(--text-inverse)", ...posi }}>
            <span className="u-label" style={{ color: "var(--text-inverse-muted)" }}>{k}</span>
            <div style={{ font: `${mob ? 13 : 16}px var(--font-mono)`, marginTop: 4, color: sig ? "var(--signal)" : "inherit" }}>{v}</div>
          </div>
        ))}
        <div style={{ position: "absolute", left: edge, right: edge, top: "45%", color: "var(--text-inverse)" }}>
          <h2 style={{ margin: 0, font: `500 ${mob ? "clamp(26px, 7.4vw, 34px)" : "clamp(32px, 4vw, 64px)"}/1.04 var(--font-display)`, letterSpacing: "-0.03em", textShadow: "0 2px 40px rgba(0,0,0,0.45)" }}>
            61 Anfragen.<br />Zwei Wochen.
          </h2>
        </div>
      </div>
      <div style={{ display: "flex", gap: 36, flexWrap: "wrap", marginTop: mob ? 44 : 72, position: "relative" }}>
        <a href="#funnel" data-track="inline_cta_beweis" style={{ display: "inline-flex", alignItems: "center", gap: 10, font: "500 16px var(--font-display)", color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--hairline-dark)", paddingBottom: 4 }}>
          Dein Projekt so prüfen lassen <span style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>→</span>
        </a>
        <a href="story.html" data-track="inline_link_story" style={{ display: "inline-flex", alignItems: "center", gap: 10, font: "400 16px var(--font-display)", color: "var(--text-muted)", textDecoration: "none", borderBottom: "1px solid var(--hairline-dark)", paddingBottom: 4 }}>
          Wer hinter UNIO steht <span style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>→</span>
        </a>
      </div>
    </section>
  );
}

/* ===== Lead-Funnel — UNIO-Effekt-Balken, horizontal, scrollgescrubbt (Briefing 06.07.) ===== */
const FUNNEL = [
  { n: "Angefragt", conv: 100, orange: 75, drv: "Meta & Google", up: "+75%" },
  { n: "Qualifiziert", conv: 52, orange: 38, drv: "Iteratives Testing", up: "+38%" },
  { n: "Besichtigt", conv: 34, orange: 44, drv: "CIRCLE-Community", up: "+44%" },
  { n: "Angebot gelegt", conv: 16, orange: 48, drv: "CIRCLE-Community", up: "+48%" },
  { n: "Kaufvertrag", conv: 3, orange: 52, drv: "CIRCLE-Community", up: "+52%" },
];
function FunnelGraphBt() {
  const secRef = React.useRef(null);
  const mob = window.useMobile();
  const [p, setP] = React.useState(BT_RM ? 1 : 0);
  React.useEffect(() => {
    if (BT_RM) return;
    const on = () => {
      const el = secRef.current; if (!el) return;
      setP(Math.max(0, Math.min(1, (scrollY - el.offsetTop) / (el.offsetHeight - innerHeight))));
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  const back = (x) => { const c = 1.7; return x < 0 ? 0 : x > 1 ? 1 : 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
  return (
    <section ref={secRef} data-track="chapter_view_03b" data-screen-label="Funnel" style={{ height: BT_RM ? "auto" : "250vh", position: "relative", background: "var(--paper-2)" }}>
      <div className="u-grain" style={{ position: BT_RM ? "relative" : "sticky", top: 0, minHeight: "100svh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: mob ? "96px 5vw 56px" : "150px 7vw 90px" }}>
        <span aria-hidden="true" style={{ position: "absolute", right: "3%", top: "12%", font: "500 clamp(120px, 20vw, 300px)/0.8 var(--font-display)", letterSpacing: "-0.05em", color: "transparent", WebkitTextStroke: "1px rgba(11,10,9,0.06)", pointerEvents: "none", userSelect: "none" }}>Vertrieb</span>
        <div style={{ position: "relative", maxWidth: 640, marginBottom: mob ? 32 : 56 }}>
          <h2 style={{ margin: 0, font: `500 ${mob ? "clamp(26px, 7vw, 32px)" : "clamp(30px, 3.4vw, 54px)"}/1.06 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>Performance Marketing & Demand</h2>
          <p style={{ margin: "18px 0 0", font: `400 ${mob ? 14.5 : 16}px/1.7 var(--font-display)`, color: "var(--text-muted)", maxWidth: 520, display: mob ? "none" : "block" }}>
            Skalierbare Leadgenerierung über die relevanten Kanäle — mit sauberem Tracking, kreativer Iteration und einem Setup, das Nachfrage in planbaren Vertrieb übersetzt.
          </p>
        </div>
        {/* Legende */}
        <div style={{ position: "relative", display: "flex", gap: mob ? 14 : 22, justifyContent: mob ? "flex-start" : "flex-end", flexWrap: "wrap", marginBottom: mob ? 24 : 40 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "11px var(--font-mono)", letterSpacing: "0.06em", color: "var(--signal-deep)" }}><span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--signal)" }}></span>Durch UNIO — der Zuwachs</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "11px var(--font-mono)", letterSpacing: "0.06em", color: "var(--text-muted)" }}><span style={{ width: 12, height: 12, borderRadius: 3, background: "#FFFFFF", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}></span>Basis</span>
        </div>
        {/* Balken */}
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: mob ? 6 : "clamp(12px, 2vw, 28px)", alignItems: "end", height: mob ? "clamp(220px, 36vh, 320px)" : "clamp(300px, 44vh, 460px)" }}>
          {FUNNEL.map((f, i) => {
            const win = BT_RM ? 1 : back(Math.max(0, Math.min(1, (p - i * 0.13) / 0.5)));
            const h = (f.conv / 100) * 100 * win;
            const orangeH = f.orange;
            return (
              <div key={f.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                <div style={{ font: `500 ${mob ? 10 : 12}px var(--font-mono)`, color: "var(--signal-deep)", marginBottom: mob ? 5 : 8, opacity: win }}>{f.up}</div>
                <div style={{ font: `500 ${mob ? "clamp(17px, 4.6vw, 24px)" : "clamp(28px, 3.4vw, 52px)"}/1 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)", marginBottom: mob ? 8 : 12 }}>{Math.round(f.conv * win)}<span style={{ fontSize: "0.4em" }}>%</span></div>
                <div style={{ position: "relative", width: "100%", height: h + "%", minHeight: win > 0.02 ? 6 : 0, borderRadius: "8px 8px 0 0", overflow: "hidden", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", transition: BT_RM ? "none" : "height 80ms linear", display: "flex", flexDirection: "column" }}>
                  {/* Orange (UNIO-Zuwachs) oben */}
                  <div style={{ height: orangeH + "%", background: "var(--signal)", position: "relative" }}>
                    {i === 0 && !mob && <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
                      <div style={{ flex: 56, background: "#E8971A", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px", font: "10px var(--font-mono)", color: "#fff" }}><span>Meta</span><span>56%</span></div>
                      <div style={{ flex: 19, background: "#F0A83F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px", font: "10px var(--font-mono)", color: "#fff" }}><span>Google</span><span>19%</span></div>
                    </div>}
                  </div>
                  {/* Basis-Linie */}
                  <div style={{ borderTop: "1.5px dashed rgba(11,10,9,0.4)" }}></div>
                  {/* Weiß (Basis) unten */}
                  <div style={{ flex: 1, background: "#FFFFFF", position: "relative" }}>
                    {i === 0 && !mob && <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
                      <div style={{ flex: 19, borderBottom: "1px solid var(--hairline-dark)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px", font: "10px var(--font-mono)", color: "var(--text-muted)" }}><span>willhaben</span><span>19%</span></div>
                      <div style={{ flex: 6, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px", font: "10px var(--font-mono)", color: "var(--text-muted)" }}><span>ImmoScout24</span><span>6%</span></div>
                    </div>}
                  </div>
                </div>
                <div style={{ font: `500 ${mob ? 10.5 : 14}px var(--font-display)`, color: "var(--ink)", marginTop: mob ? 9 : 14, textAlign: "center" }}>{f.n}</div>
                <div style={{ font: "10px var(--font-mono)", letterSpacing: "0.08em", color: "var(--text-muted)", marginTop: 5, display: mob ? "none" : "block" }}>{f.drv}</div>
              </div>
            );
          })}
        </div>
        <p className="u-label" style={{ marginTop: 32, color: "var(--text-muted)", fontSize: 10 }}>[PLATZHALTER: echte Splits & Uplift-% — an Live-Daten koppeln]</p>
      </div>
    </section>
  );
}

/* ===== LENS-SHOWCASE — das echte Dashboard baut sich beim Scrollen auf.
   Design und Inhalte 1:1 aus dem Dashboard-Design v2 (dash-bautraeger),
   Zahlen: Arbeitsstand eines laufenden Projekts. ===== */
const LENS_KPI = [
  ["53", "Neue Leads (7 Tage)", "-2 % VS. VORWOCHE", null, "54 in der Vorwoche"],
  ["297", "Kontakte", null, null, "331 Interessen gesamt"],
  ["24", "Qualifizierungsrate", null, 24, "79 qualifizierte Leads"],
  ["31", "Besichtigungen", null, null, "9 % der Interessen"],
];
const LENS_WOCHEN = [2, 4, 57, 27, 19, 20, 30, 8, 70, 66, 29];
const LENS_FUNNEL = [["Neu", 331, 100], ["Kontaktversuch", 193, 58], ["Kontaktiert", 103, 31], ["Qualifiziert", 79, 24], ["Besichtigung", 31, 9]];
const LENS_CONV = ["58 %", "53 %", "77 %", "39 %"];
const LENS_FRAMP = ["#F8DCA5", "#FACF7E", "#FBC157", "#FDB430", "#FFAA09"];
const LENS_STATUS = [["Neu", 68, "#F2CE63"], ["Kontaktversuch", 90, "var(--signal)"], ["Kontaktiert", 24, "#D98A06"], ["Qualifiziert", 48, "#B06B10"], ["Besichtigung", 31, "#7A4A0E"], ["Verloren", 70, "#C2402A"]];
const LENS_QUELLEN = [["Meta / Zapier", 192, 17, "var(--signal)"], ["Willhaben", 87, 41, "#F2CE63"], ["ImmoScout24", 25, 24, "#B06B10"], ["Erstinteresse im Projekt", 12, 33, "#8A857B"]];
const LENS_HEAT = {
  cols: ["0–5", "6–8", "9–11", "12–14", "15–17", "18–20", "21–23"],
  rows: [["Mo", [0, 0, 5, 0, 7, 10, 0]], ["Di", [4, 0, 9, 15, 8, 8, 19]], ["Mi", [0, 9, 9, 5, 6, 13, 12]], ["Do", [4, 6, 14, 12, 13, 16, 12]], ["Fr", [0, 4, 5, 12, 5, 6, 8]], ["Sa", [0, 0, 14, 7, 4, 7, 0]], ["So", [4, 0, 0, 4, 5, 6, 0]]],
};
const lensHeat = (t) => { const m = (a, b) => Math.round(a * t + b * (1 - t)); return `rgb(${m(255, 251)}, ${m(170, 248)}, ${m(9, 241)})`; };
const LENS_BEATS = [
  ["Jede Anfrage kommt an.", "Meta, Willhaben, ImmoScout24, Web: Jede Quelle landet im selben Dashboard, keine geht verloren."],
  ["Vom Lead zur Besichtigung.", "Die Pipeline zeigt jeden Schritt mit Konversionsrate. Du siehst, wo es fließt und wo es hakt."],
  ["Du weißt, welche Quelle liefert.", "Qualitätsrate je Kanal statt Bauchgefühl, und du siehst, wann die Anfragen kommen."],
];
function LensFrame({ children }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 16, boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: "1px solid var(--hairline-dark)", background: "var(--paper)" }}>
        <span aria-hidden="true" style={{ display: "flex", gap: 5 }}>{[0, 1, 2].map((i) => <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}></span>)}</span>
        <span style={{ font: "11px var(--font-mono)", letterSpacing: "0.08em", color: "var(--text-muted)" }}>app.unio.at · LENS</span>
        <span className="u-label" style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 9, padding: "5px 11px", borderRadius: 999, background: "var(--signal-soft, rgba(255,170,9,0.12))", color: "var(--signal-deep)" }}>
          <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)", animation: BT_RM ? "none" : "uPulse 2s var(--ease-unio) infinite" }}></span>Live
        </span>
      </div>
      <div style={{ position: "relative", padding: "clamp(16px, 1.6vw, 24px)" }}>{children}</div>
    </div>
  );
}
function LensShowcaseBt() {
  const secRef = React.useRef(null);
  const mob = window.useMobile();
  const [p, setP] = React.useState(BT_RM ? 1 : 0);
  React.useEffect(() => {
    if (BT_RM) return;
    const on = () => {
      const el = secRef.current; if (!el) return;
      setP(Math.max(0, Math.min(1, (scrollY - el.offsetTop) / (el.offsetHeight - innerHeight))));
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  const cl = (x) => Math.max(0, Math.min(1, x));
  const b = [cl(p / 0.3), cl((p - 0.35) / 0.28), cl((p - 0.7) / 0.28)];
  const act = p < 0.33 ? 0 : p < 0.68 ? 1 : 2;
  const statisch = BT_RM;
  const kOf = (i, desk) => BT_RM ? 1 : desk;
  const maxW = Math.max(...LENS_WOCHEN);
  const statusTotal = LENS_STATUS.reduce((a, x) => a + x[1], 0);
  const heatMax = Math.max(...LENS_HEAT.rows.flatMap(([, v]) => v));
  const uLbl = { fontSize: 8.5, color: "var(--text-muted)" };
  const panelBase = (i) => statisch ? { position: "relative", marginTop: i === 0 ? 0 : 18 } : { position: "absolute", inset: "clamp(16px, 1.6vw, 24px)", opacity: act === i ? 1 : 0, transform: act === i ? "none" : "translateY(14px)", transition: `all 500ms ${BT_EASE}`, pointerEvents: act === i ? "auto" : "none" };
  const inhalt = (
    <LensFrame>
      <div style={statisch ? undefined : { minHeight: mob ? "min(52svh, 350px)" : "min(56svh, 500px)", position: "relative" }}>
        {/* Beat 1: KPI-Karten wie im Dashboard + Leads pro Woche */}
        <div style={panelBase(0)}>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 10 }}>
            {LENS_KPI.map(([v, sub, delta, bar, note]) => (
              <div key={sub} style={{ background: "var(--paper)", borderRadius: 12, padding: mob ? "10px 12px" : "14px 15px", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
                <span className="u-label" style={uLbl}>{sub}</span>
                <div style={{ font: `600 ${mob ? "21px" : "clamp(24px, 2.2vw, 34px)"}/1 var(--font-display)`, letterSpacing: "-0.02em", color: "var(--ink)", marginTop: mob ? 7 : 10, fontVariantNumeric: "tabular-nums" }}>{v}{bar != null && <span style={{ fontSize: "0.55em", color: "var(--text-muted)" }}> %</span>}</div>
                {delta && <div style={{ font: "9px var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)", marginTop: 7 }}>{delta}</div>}
                {bar != null && <div style={{ height: 4, borderRadius: 999, background: "rgba(20,18,16,0.08)", overflow: "hidden", marginTop: 9 }}><div style={{ height: "100%", width: bar + "%", background: "var(--signal)", borderRadius: 999 }}></div></div>}
                <div style={{ font: `400 ${mob ? 9.5 : 10.5}px var(--font-display)`, color: "var(--text-muted)", marginTop: mob ? 5 : 7 }}>{note}</div>
              </div>
            ))}
          </div>
          <div className="u-label" style={{ ...uLbl, display: "block", margin: "16px 0 10px" }}>Leads pro Woche · letzte 12 Wochen</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: statisch ? 76 : (mob ? "clamp(52px, 8svh, 76px)" : "clamp(76px, 13svh, 120px)") }}>
            {LENS_WOCHEN.map((v, i) => (
              <span key={i} style={{ flex: 1, height: ((v / maxW) * 100 * kOf(0, b[0])) + "%", minHeight: 3, background: LENS_FRAMP[Math.min(4, Math.floor((i / LENS_WOCHEN.length) * 5))], borderRadius: 3, transition: "height 500ms var(--ease-unio)" }}></span>
            ))}
          </div>
        </div>
        {/* Beat 2: Pipeline mit Konversionen + Status-Segmentbalken */}
        <div style={panelBase(1)}>
          <div style={{ font: "500 15px/1.2 var(--font-display)", color: "var(--ink)" }}>Lead-Pipeline</div>
          <div style={{ font: "400 11px var(--font-display)", color: "var(--text-muted)", marginTop: 4 }}>Kumulierter Stufen-Durchlauf aller 331 Interessen.</div>
          <div style={{ display: "flex", gap: 0, marginTop: 16 }}>
            {LENS_FUNNEL.map(([label, n, pct], i) => {
              const k = kOf(1, cl(b[1] * 1.6 - i * 0.15));
              return (
                <React.Fragment key={label}>
                  {i > 0 && (
                    <div style={{ width: mob ? 22 : 34, flex: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, color: "var(--text-muted)" }}>
                      <span style={{ font: "500 12px var(--font-display)" }}>›</span>
                      {!mob && <span style={{ font: "8px var(--font-mono)", letterSpacing: "0.06em" }}>{LENS_CONV[i - 1]}</span>}
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="u-label" style={{ fontSize: 7.5, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginTop: 6 }}>
                      <span style={{ font: "600 clamp(16px, 1.6vw, 24px)/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", fontVariantNumeric: "tabular-nums", opacity: 0.3 + 0.7 * k, transition: "opacity 500ms var(--ease-unio)" }}>{n}</span>
                      {!mob && <span style={{ font: "9px var(--font-mono)", color: "var(--text-muted)" }}>{pct} %</span>}
                    </div>
                    <div style={{ height: statisch ? 62 : (mob ? 50 : "clamp(62px, 11svh, 96px)"), display: "flex", alignItems: "flex-end", marginTop: 10 }}>
                      <div style={{ width: "100%", height: Math.max(8, pct * k) + "%", borderRadius: 8, background: LENS_FRAMP[i], transition: "height 500ms var(--ease-unio)" }}></div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--hairline-dark)" }}>
            <span className="u-label" style={uLbl}>Aktueller Status</span>
            <div style={{ display: "flex", gap: 3, height: 8, borderRadius: 999, overflow: "hidden", marginTop: 9 }}>
              {LENS_STATUS.map(([l, n, c]) => <span key={l} style={{ width: ((n / statusTotal) * 100 * kOf(1, Math.max(0.15, b[1]))) + "%", background: c, transition: "width 500ms var(--ease-unio)" }}></span>)}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", marginTop: 10 }}>
              {LENS_STATUS.map(([l, n, c]) => (
                <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "400 10.5px var(--font-display)", color: "var(--text-muted)" }}>
                  <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: c, flex: "none" }}></span>{l} <b style={{ color: "var(--ink)", fontWeight: 600 }}>{n}</b>
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Beat 3: Quellenqualitaet + Eingangszeiten-Heatmap */}
        <div style={panelBase(2)}>
          <div style={{ font: "500 15px/1.2 var(--font-display)", color: "var(--ink)" }}>Quellenqualität</div>
          <div style={{ font: "400 11px var(--font-display)", color: "var(--text-muted)", marginTop: 4 }}>Wie gut konvertieren Leads je Quelle.</div>
          <div style={{ marginTop: 10 }}>
            {LENS_QUELLEN.map(([q, leads, rate, farbe], i) => {
              const k = kOf(2, cl(b[2] * 1.7 - i * 0.14));
              return (
                <div key={q} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr) 44px", gap: 10, alignItems: "center", padding: "7px 0", borderTop: i === 0 ? "none" : "1px solid var(--hairline-dark)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "400 12px var(--font-display)", color: "var(--ink-2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: farbe, flex: "none" }}></span>{q} <span style={{ font: "9px var(--font-mono)", color: "var(--text-muted)" }}>{leads}</span>
                  </span>
                  <div style={{ height: 7, borderRadius: 4, background: "rgba(20,18,16,0.07)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: (rate * 2 * k) + "%", background: farbe, borderRadius: 4, transition: "width 500ms var(--ease-unio)" }}></div>
                  </div>
                  <span style={{ font: "11px var(--font-mono)", color: "var(--ink)", textAlign: "right", opacity: 0.3 + 0.7 * k, transition: "opacity 500ms var(--ease-unio)" }}>{rate} %</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px 0 8px" }}>
            <span className="u-label" style={uLbl}>Lead-Eingangszeiten</span>
            <span className="u-label" style={{ fontSize: 8, padding: "4px 10px", borderRadius: 999, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}>Top: Di 21–23 Uhr · 19</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "26px repeat(7, 1fr)", gap: 3 }}>
            <span></span>
            {LENS_HEAT.cols.map((c) => <span key={c} className="u-label" style={{ fontSize: 7, color: "var(--text-muted)", textAlign: "center" }}>{c}</span>)}
            {LENS_HEAT.rows.map(([day, vals], ri) => (
              <React.Fragment key={day}>
                <span className="u-label" style={{ fontSize: 7.5, color: "var(--text-muted)", alignSelf: "center" }}>{day}</span>
                {vals.map((v, i) => {
                  const k = kOf(2, cl(b[2] * 2 - (ri * 0.06 + i * 0.02)));
                  const t = v ? 0.18 + (v / heatMax) * 0.82 : 0;
                  return <span key={i} style={{ height: mob ? 14 : "clamp(17px, 2.8svh, 24px)", borderRadius: 6, display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 8px var(--font-mono)", background: v ? lensHeat(t * k) : "#F7F4ED", color: v / heatMax > 0.55 ? "#FFFFFF" : v ? "var(--ink-2)" : "transparent", transition: "background 400ms var(--ease-unio)" }}>{v || ""}</span>;
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </LensFrame>
  );
  if (statisch) {
    return (
      <section id="lens" data-track="chapter_view_05b" data-screen-label="LENS" className="u-grain" style={{ position: "relative", background: "var(--paper)", padding: "100px 6vw 96px" }}>
        <Kap nr="05" label="LENS" />
        <div style={{ maxWidth: 640, marginBottom: 36 }}>
          <h2 style={{ margin: 0, font: "500 clamp(30px, 8vw, 40px)/1.05 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Dein Projekt.<br />Live<span style={{ color: "var(--signal)" }}>.</span></h2>
          <p style={{ margin: "16px 0 0", font: "400 15px/1.65 var(--font-display)", color: "var(--text-muted)", maxWidth: 480 }}>Das ist kein Mockup: So sieht LENS für ein laufendes Projekt aus. Reporting entfällt, du schaust einfach rein.</p>
        </div>
        {inhalt}
        <div style={{ marginTop: 24 }}>
          {LENS_BEATS.map(([t, c], i) => (
            <Fx key={t} delay={i * 80}>
              <div style={{ padding: "14px 0", borderTop: "1px solid var(--hairline-dark)" }}>
                <div style={{ font: "500 16px/1.3 var(--font-display)", color: "var(--ink)" }}>{t}</div>
                <p style={{ margin: "5px 0 0", font: "400 13px/1.55 var(--font-display)", color: "var(--text-muted)" }}>{c}</p>
              </div>
            </Fx>
          ))}
        </div>
        <p className="u-label" style={{ margin: "20px 0 0", color: "var(--text-muted)", fontSize: 9 }}>Echte Zahlen aus einem laufenden Projekt · Arbeitsstand</p>
      </section>
    );
  }
  if (mob) {
    return (
      <section id="lens" ref={secRef} data-track="chapter_view_05b" data-screen-label="LENS" style={{ height: "300vh", position: "relative", background: "var(--paper)" }}>
        <div className="u-grain" style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 5vw 28px" }}>
          <Kap nr="05" label="LENS" />
          <h2 style={{ margin: 0, font: "500 clamp(26px, 7vw, 34px)/1.08 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Dein Projekt. Live<span style={{ color: "var(--signal)" }}>.</span></h2>
          {/* aktiver Beat-Text wechselt mit dem Scroll */}
          <div style={{ position: "relative", minHeight: 72, marginTop: 12 }}>
            {LENS_BEATS.map(([t, c], i) => (
              <div key={t} style={{ position: "absolute", inset: 0, opacity: act === i ? 1 : 0, transform: act === i ? "none" : "translateY(10px)", transition: `all 400ms ${BT_EASE}`, pointerEvents: "none" }}>
                <div style={{ font: "500 15.5px/1.3 var(--font-display)", color: "var(--ink)" }}><span style={{ font: "11px var(--font-mono)", color: "var(--signal-deep)", marginRight: 8 }}>0{i + 1}</span>{t}</div>
                <p style={{ margin: "4px 0 0", font: "400 12.5px/1.5 var(--font-display)", color: "var(--text-muted)" }}>{c}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>{inhalt}</div>
          <p className="u-label" style={{ margin: "14px 0 0", color: "var(--text-muted)", fontSize: 8.5 }}>Echte Zahlen aus einem laufenden Projekt · Arbeitsstand</p>
        </div>
      </section>
    );
  }
  return (
    <section id="lens" ref={secRef} data-track="chapter_view_05b" data-screen-label="LENS" style={{ height: "320vh", position: "relative", background: "var(--paper)" }}>
      <div className="u-grain" style={{ position: "sticky", top: 0, minHeight: "100svh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(70px, 11vh, 120px) 7vw clamp(36px, 6vh, 70px)" }}>
        <GridLines />
        <Kap nr="05" label="LENS" />
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)", gap: 56, alignItems: "center", position: "relative" }}>
          <div>
            <h2 style={{ margin: 0, font: "500 clamp(30px, 3.2vw, 54px)/1.05 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Dein Projekt.<br />Live<span style={{ color: "var(--signal)" }}>.</span></h2>
            <p style={{ margin: "18px 0 0", font: "400 16px/1.65 var(--font-display)", color: "var(--text-muted)", maxWidth: 400 }}>
              Das ist kein Mockup: So sieht LENS für ein laufendes Projekt aus. Reporting entfällt, du schaust einfach rein.
            </p>
            <div style={{ marginTop: 30 }}>
              {LENS_BEATS.map(([t, c], i) => (
                <div key={t} style={{ padding: "13px 0", borderTop: "1px solid var(--hairline-dark)", opacity: act === i ? 1 : 0.35, transition: `opacity 400ms ${BT_EASE}` }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                    <span style={{ font: "12px var(--font-mono)", color: act === i ? "var(--signal-deep)" : "var(--text-muted)" }}>0{i + 1}</span>
                    <div>
                      <div style={{ font: "500 clamp(16px, 1.4vw, 20px)/1.3 var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>{t}</div>
                      <p style={{ margin: "5px 0 0", font: "400 13.5px/1.5 var(--font-display)", color: "var(--text-muted)", maxWidth: "42ch" }}>{c}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="u-label" style={{ margin: "22px 0 0", color: "var(--text-muted)", fontSize: 9 }}>Echte Zahlen aus einem laufenden Projekt · Arbeitsstand</p>
          </div>
          <div>{inhalt}</div>
        </div>
      </div>
    </section>
  );
}

/* ===== 06 · NUTZEN-BENTO (der einzige Karten-Moment) ===== */
function NCard({ span = 2, tone = "light", title, copy, children }) {
  const mob = window.useMobile();
  const bg = tone === "dark" ? "var(--ink)" : tone === "orange" ? "var(--signal)" : "#FFFFFF";
  const fg = tone === "dark" ? "var(--text-inverse)" : tone === "orange" ? "#FFFFFF" : "var(--ink)";
  const muted = tone === "dark" ? "var(--text-inverse-muted)" : tone === "orange" ? "rgba(255,245,239,0.92)" : "var(--text-muted)";
  return (
    <div style={{ gridColumn: mob ? "auto" : `span ${span}`, background: bg, borderRadius: "var(--r-card)", padding: "24px 24px 22px", boxShadow: tone === "light" ? "inset 0 0 0 1px var(--hairline-dark)" : "var(--shadow-float)", display: "flex", flexDirection: "column", gap: 10, minHeight: mob ? 0 : 230 }}>
      <div style={{ font: "500 19px/1.2 var(--font-display)", letterSpacing: "-0.02em", color: fg }}>{title}</div>
      {copy && <p style={{ margin: 0, font: "400 13.5px/1.55 var(--font-display)", color: muted, maxWidth: "40ch" }}>{copy}</p>}
      <div style={{ marginTop: "auto", paddingTop: 12 }}>{children}</div>
    </div>
  );
}
const nChip = { font: "500 12px var(--font-display)", padding: "6px 11px", borderRadius: "var(--r-pill)", background: "var(--signal-soft)", color: "var(--signal-deep)", boxShadow: "inset 0 0 0 1px rgba(255,170,9,0.35)", display: "inline-flex", alignItems: "center", gap: 6 };

function BentoBt() {
  const [ref, run] = useOnceInView(0.2);
  const mob = window.useMobile();
  return (
    <section ref={ref} data-track="chapter_view_06" data-screen-label="Nutzen" style={{ position: "relative", background: "#FFFFFF", padding: mob ? "100px 6vw 110px" : "175px 7vw 175px" }}>
      <Kap nr="06" label="Nutzen" />
      <div style={{ maxWidth: 760, marginBottom: mob ? 44 : 80 }}>
        <Fx>
          <h2 style={{ margin: 0, font: `500 ${mob ? "clamp(30px, 8vw, 38px)" : "clamp(36px, 3.8vw, 64px)"}/1.04 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>
            Was du davon hast.
          </h2>
        </Fx>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(6, 1fr)", gap: 14 }}>
        <NCard span={4} tone="orange" title="Wir gehen ins Risiko. Mit unserem Marketing." copy="Kreation, Kampagnen und Media gehen in Vorleistung, vergütet wird am Abverkauf. Wenig Risiko für dich, maximales Bemühen von uns.">
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <span style={{ font: "500 52px/1 var(--font-display)", letterSpacing: "-0.03em", color: "#FFFFFF", fontVariantNumeric: "tabular-nums" }}>€ 0</span>
            <span className="u-label" style={{ color: "rgba(255,245,239,0.92)", fontSize: 10 }}>Retainer · Setup-Kosten</span>
          </div>
        </NCard>
        <NCard span={2} title="Die stärksten Makler der Stadt." copy="CIRCLE ist kuratiert: Top-Makler ab € 100.000 Jahresumsatz, gesteuert statt gehofft.">
          <span style={{ font: "500 44px/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--signal-deep)", fontVariantNumeric: "tabular-nums" }}>25+</span>
          <span className="u-label" style={{ display: "block", marginTop: 8, fontSize: 10, color: "var(--text-muted)" }}>Top-Performer im Pool</span>
        </NCard>
        <NCard span={2} title="Du siehst alles. Live." copy="Pipeline, Anfragen und Unit-Status in LENS. Reporting-Meetings entfallen, du schaust einfach rein.">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9, font: "11px var(--font-mono)", letterSpacing: "0.08em", color: "var(--ink-2)", padding: "9px 14px", borderRadius: "var(--r-pill)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal)", animation: BT_RM ? "none" : "uPulse 2.2s var(--ease-unio) infinite" }}></span>
            app.unio.at · Anfragen live
          </span>
        </NCard>
        <NCard span={2} title="Schneller zur Vorverwertungsquote." copy="Vorgemerkte Nachfrage zahlt auf die von Banken geforderte Vorverkaufsquote ein: frühere Finanzierungsfreigabe, früherer Baustart.">
          <span style={{ font: "500 44px/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--signal-deep)", fontVariantNumeric: "tabular-nums" }}>
            <CountUp to={1240} run={run} fmt={(v) => v.toLocaleString("de-AT")} />
          </span>
          <span className="u-label" style={{ display: "block", marginTop: 8, fontSize: 10, color: "var(--text-muted)" }}>Käuferprofile im Matching</span>
        </NCard>
        <NCard span={2} title="Standzeit kostet Zinsen." copy="Jeder Monat weniger Vermarktungsdauer senkt die Zwischenfinanzierung: Tempo als Euro-Größe, nicht als Marketing-Wort.">
          <svg viewBox="0 0 200 46" style={{ width: "100%", maxWidth: 200, height: "auto" }} aria-hidden="true">
            <polyline points="4,8 40,14 76,12 112,24 148,30 192,40" fill="none" stroke="rgba(11,10,9,0.3)" strokeWidth="1.5" />
            <circle cx="192" cy="40" r="3.5" fill="var(--signal)" />
          </svg>
        </NCard>
        <NCard span={2} title="CIRCLE verkauft, wo andere inserieren." copy="Vorgemerkte Käufer aus der kuratierten Community: Abschlüsse oft, bevor das Projekt öffentlich ist.">
          <svg viewBox="0 0 120 40" style={{ width: 110, height: "auto" }} aria-hidden="true">
            {[16, 40, 64, 88].map((x, i) => <circle key={x} cx={x} cy="20" r="9" fill="none" stroke={i === 3 ? "var(--signal)" : "rgba(11,10,9,0.3)"} strokeWidth="1.5" />)}
            <circle cx="88" cy="20" r="3.5" fill="var(--signal)" />
          </svg>
        </NCard>
        <NCard span={2} title="Ein Ansprechpartner statt drei Schnittstellen." copy="Agentur, Makler und Portal-Koordination fallen in ein System. Keine Abstimmungsrunden, du siehst live." />
        <NCard span={2} title="Gutes Produkt, beste Chancen." copy="Wir sind ehrlich zu dir: Wenn das Produkt gut ist, hast du bei uns die besten Chancen am Markt.">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "500 13px var(--font-display)", color: "var(--signal-deep)" }}>
            <span style={{ width: 17, height: 17, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 0 1.5px var(--signal)", font: "10px var(--font-mono)" }}>✓</span>
            Ehrliche Einschätzung vorab
          </span>
        </NCard>
      </div>
    </section>
  );
}

/* ===== 07 · DAS MODELL — der große Zahlen-Moment ===== */
function ModellBt() {
  const [ref100, run100] = useOnceInView(0.35);
  return (
    <section data-track="chapter_view_07" data-screen-label="Modell" className="u-grain" style={{ position: "relative", background: "var(--paper)", padding: "175px 7vw 175px" }}>
      <GridLines />
      <Kap nr="08" label="Modell" />
      <div ref={ref100} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <Fx>
          <div style={{ font: "500 clamp(110px, 18vw, 280px)/0.95 var(--font-display)", letterSpacing: "-0.05em", color: "transparent", WebkitTextStroke: "1.5px rgba(11,10,9,0.55)", whiteSpace: "nowrap" }}>
            <CountUp to={100} run={run100} /><span style={{ WebkitTextStroke: "0", color: "var(--signal)" }}> %</span>
          </div>
        </Fx>
        <Fx delay={120}>
          <h2 style={{ margin: "20px 0 0", font: "500 clamp(26px, 2.6vw, 44px)/1.06 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>
            erfolgsbasiert. Null Risiko-Theater.
          </h2>
        </Fx>
        <div style={{ width: "100%", maxWidth: 720, marginTop: 44, textAlign: "left" }}>
          {[["Vergütung", "erfolgsbasiert am Abverkauf, kein Retainer"], ["Unser Einsatz", "Marketing, Kreation und Media gehen in Vorleistung"], ["Reporting", "entfällt, du siehst live (LENS)"], ["Exit-Logik", "klare Meilensteine statt Bindungsfallen"], ["Ausblick", "Markttest vor Baustart als nächste Ausbaustufe"]].map(([k, v], i) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 24, padding: "16px 0", borderTop: i === 0 ? "none" : "1px solid var(--hairline-dark)", alignItems: "baseline" }}>
              <span className="u-label" style={{ color: "var(--text-muted)" }}>{k}</span>
              <span style={{ font: "400 16px var(--font-display)", color: "var(--ink-2)", textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== 08 · SIMULATOR — Feinschliff + Soft-Conversion ===== */
function SimulatorBt() {
  const [einheiten, setEinheiten] = React.useState(12);
  const [leads, setLeads] = React.useState(400);
  const [mail, setMail] = React.useState("");
  const [pdfState, setPdfState] = React.useState("idle"); // idle | form | sent
  const RATES = [["Leads", 1], ["Qualifiziert", 0.3], ["Besichtigung", 0.084], ["Kauf", 0.025]];
  const kaufMonat = leads * 0.025;
  const monate = Math.max(1, Math.ceil(einheiten / kaufMonat));
  const mstr = String(monate);
  const mob = window.useMobile();
  return (
    <section id="simulator" data-track="chapter_view_08" data-screen-label="Simulator" className="u-grain" style={{ position: "relative", background: "var(--paper-2)", padding: mob ? "100px 6vw 110px" : "175px 7vw 175px" }}>
      <GridLines />
      <Kap nr="08" label="Simulator" />
      <div style={{ maxWidth: 640, marginBottom: mob ? 40 : 76, position: "relative" }}>
        <Fx>
          <h2 style={{ margin: 0, font: `500 ${mob ? "clamp(28px, 7.6vw, 36px)" : "clamp(32px, 3.4vw, 56px)"}/1.04 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>
            Rechne es<br />selbst durch.
          </h2>
        </Fx>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 1fr) minmax(0, 1.15fr)", gap: 14, position: "relative" }}>
        <div style={{ background: "var(--surface-raised)", borderRadius: "var(--r-card)", padding: mob ? "22px 20px" : "28px 30px", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
          {[["Einheiten im Projekt", einheiten, 4, 60, 1, setEinheiten], ["Leads / Monat (Kampagne)", leads, 100, 1200, 50, setLeads]].map(([l, val, min, max, step, set]) => (
            <div key={l} style={{ marginBottom: 24 }} data-track="simulator_interact">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span className="u-label" style={{ color: "var(--text-muted)" }}>{l}</span>
                <span style={{ font: "500 24px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{val}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={val} onChange={(e) => set(+e.target.value)} style={{ width: "100%", marginTop: 14, accentColor: "#FFAA09" }} />
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--hairline-dark)", paddingTop: 16 }}>
            {RATES.map(([n, r], i) => (
              <div key={n} style={{ display: "grid", gridTemplateColumns: mob ? "88px 1fr 44px" : "175px 1fr 64px", gap: 12, alignItems: "center", padding: "7px 0" }}>
                <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 10 }}>{n}</span>
                <div style={{ height: 8, borderRadius: 4, background: "var(--paper-3)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: Math.max(3, r * 100) + "%", background: i === RATES.length - 1 ? "var(--signal)" : "var(--ink-3)", borderRadius: 4, transition: `width 400ms ${BT_EASE}` }}></div>
                </div>
                <span style={{ font: "12px var(--font-mono)", color: "var(--ink-2)", textAlign: "right" }}>{Math.round(leads * r)}</span>
              </div>
            ))}
          </div>
          <p className="u-label" style={{ margin: "16px 0 0", color: "var(--text-muted)", fontSize: 10 }}>
            [PLATZHALTER: „Benchmarks aus X Wiener Wohnbau-Kampagnen 2024–2026" — Zahl folgt] · Arbeitswerte
          </p>
        </div>
        <div className="u-grain" style={{ background: "var(--signal)", borderRadius: "var(--r-card)", padding: "clamp(26px, 3vw, 38px)", color: "#FFFFFF", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-float)" }}>
          <span className="u-label" style={{ color: "rgba(255,245,239,0.92)", fontSize: 10 }}>Prognose Abverkauf</span>
          <div style={{ font: "500 clamp(48px, 5vw, 84px)/1 var(--font-display)", letterSpacing: "-0.03em", marginTop: 16, fontVariantNumeric: "tabular-nums" }}>
            {mstr.length < 2 && <span style={{ color: "rgba(255,255,255,0.3)" }}>0</span>}{mstr}
            <span style={{ fontSize: "0.38em", fontWeight: 400, marginLeft: 8 }}>Monate</span>
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 22, borderTop: "1px solid rgba(255,255,255,0.35)", paddingTop: 18 }}>
            <div><div style={{ font: "500 24px/1 var(--font-display)", color: "#FFFFFF" }}>{kaufMonat.toFixed(1)}</div><div className="u-label" style={{ color: "rgba(255,245,239,0.92)", fontSize: 10, marginTop: 6 }}>Käufe / Monat</div></div>
            <div><div style={{ font: "500 24px/1 var(--font-display)", color: "#FFFFFF" }}>{einheiten}</div><div className="u-label" style={{ color: "rgba(255,245,239,0.92)", fontSize: 10, marginTop: 6 }}>Einheiten</div></div>
          </div>
          <p style={{ margin: "18px 0 0", font: "400 13.5px/1.55 var(--font-display)", color: "rgba(255,245,239,0.92)", display: "flex", gap: 8, alignItems: "baseline" }} title="Qualitativer Zusammenhang — kein Zinssatz beziffert. Die konkrete Ersparnis hängt von deiner Finanzierungsstruktur ab.">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" style={{ flex: "none", transform: "translateY(2px)" }}><circle cx="7" cy="7" r="6"></circle><path d="M7 6.4v3.4M7 4.2v.2" strokeLinecap="round"></path></svg>
            Eingesparte Standzeit ≈ eingesparte Zwischenfinanzierung.
          </p>
          {/* Soft-Conversion */}
          <div style={{ marginTop: "auto", paddingTop: 22 }}>
            {pdfState === "idle" && (
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                <a href="#funnel" data-track="simulator_cta" style={{ display: "inline-flex", alignItems: "center", gap: 9, font: "500 15px var(--font-display)", color: "#FFFFFF", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.5)", paddingBottom: 3 }}>
                  Mit echten Zahlen rechnen <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>→</span>
                </a>
                <button data-track="simulator_pdf" onClick={() => setPdfState("form")} style={{ background: "none", border: "none", cursor: "pointer", font: "400 13px var(--font-display)", color: "rgba(255,245,239,0.9)", fontFamily: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}>
                  Ergebnis mit Bezirks-Benchmarks als PDF
                </button>
              </div>
            )}
            {pdfState === "form" && (
              <div style={{ display: "flex", gap: 8 }}>
                <input value={mail} onChange={(e) => setMail(e.target.value)} placeholder="E-Mail für den PDF-Versand" style={{ flex: 1, font: "400 14px var(--font-display)", padding: "12px 14px", borderRadius: "var(--r-inner)", border: "none", outline: "none", background: "rgba(255,255,255,0.18)", color: "#FFFFFF", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)" }} />
                <Bb variant="paper" size="sm" disabled={!mail.includes("@")} onClick={async () => { const ok = await window.submitLead("simulator-pdf", { email: mail, einheiten, leads }); if (ok) setPdfState("sent"); }}>Senden</Bb>
              </div>
            )}
            {pdfState === "sent" && (
              <span className="u-label" style={{ color: "#FFFFFF", fontSize: 10 }}>PDF unterwegs — mit Bezirks-Benchmarks.</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== ZWEI AUSGANGSLAGEN — Zielgruppen-Weiche, hell und aufgeräumt ===== */
function MandatPanel({ label, titel, copy, schritte, on, from, delayBase }) {
  const mob = window.useMobile();
  const dl = (n) => (on ? (delayBase + n) + "ms" : "0ms");
  return (
    <div style={{ position: "relative", borderRadius: "var(--r-panel)", background: "#FFFFFF", boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-soft)", padding: mob ? "24px 22px 26px" : "clamp(28px, 2.6vw, 40px)", opacity: on ? 1 : 0, transform: on ? "none" : `translateX(${from}px)`, transition: `all 750ms ${BT_EASE}`, display: "flex", flexDirection: "column" }}>
      <span className="u-label" style={{ display: "inline-flex", alignItems: "center", gap: 8, alignSelf: "flex-start", fontSize: 10, color: "var(--signal-deep)" }}>
        <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)" }}></span>{label}
      </span>
      <h3 style={{ margin: "16px 0 0", font: `500 ${mob ? "clamp(21px, 5.8vw, 26px)" : "clamp(22px, 2vw, 32px)"}/1.15 var(--font-display)`, letterSpacing: "-0.02em", color: "var(--ink)" }}>{titel}</h3>
      <p style={{ margin: "12px 0 0", font: `400 ${mob ? 14 : 15}px/1.6 var(--font-display)`, color: "var(--text-muted)", maxWidth: "48ch" }}>{copy}</p>
      {/* Mini-Ablauf: Punkte und Linie bauen sich gestaffelt auf */}
      <div style={{ marginTop: mob ? 20 : 26, position: "relative" }}>
        {schritte.map(([wann, was], i) => (
          <div key={wann} style={{ position: "relative", display: "grid", gridTemplateColumns: mob ? "88px 1fr" : "104px 1fr", gap: 14, alignItems: "baseline", padding: "9px 0 9px 22px", opacity: on ? 1 : 0, transform: on ? "none" : "translateY(10px)", transition: `all 500ms ${BT_EASE}`, transitionDelay: dl(i * 160) }}>
            {i < schritte.length - 1 && <span aria-hidden="true" style={{ position: "absolute", left: 4.5, top: 22, bottom: -12, width: 1, background: "var(--hairline-dark)" }}></span>}
            <span aria-hidden="true" style={{ position: "absolute", left: 0, top: 13, width: 10, height: 10, borderRadius: "50%", background: "var(--signal)", boxShadow: "0 0 0 3px var(--signal-soft, rgba(255,170,9,0.18))", transform: on ? "scale(1)" : "scale(0)", transition: `transform 400ms ${BT_EASE}`, transitionDelay: dl(i * 160 + 100) }}></span>
            <span className="u-label" style={{ fontSize: 10, color: "var(--text-muted)" }}>{wann}</span>
            <span style={{ font: `400 ${mob ? 13.5 : 14.5}px/1.5 var(--font-display)`, color: "var(--ink-2)" }}>{was}</span>
          </div>
        ))}
      </div>
      <a href="#funnel" data-track={"mandat_cta_" + label.split(" ")[0].toLowerCase()} style={{ display: "inline-flex", alignItems: "center", gap: 9, font: "500 15px var(--font-display)", color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--hairline-dark)", paddingBottom: 3, marginTop: "auto", paddingTop: 24, alignSelf: "flex-start" }}>
        Projekt prüfen lassen <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>→</span>
      </a>
    </div>
  );
}
function MandateBt() {
  const [ref, run] = useOnceInView(0.25);
  const mob = window.useMobile();
  return (
    <section data-screen-label="Ausgangslagen" className="u-grain" style={{ position: "relative", background: "var(--paper-2)", padding: mob ? "100px 6vw 100px" : "150px 7vw 150px" }}>
      <GridLines />
      <Kap nr="07" label="Ausgangslagen" />
      <div style={{ maxWidth: 720, marginBottom: mob ? 36 : 56, position: "relative" }}>
        <Fx>
          <h2 style={{ margin: 0, font: `500 ${mob ? "clamp(30px, 8vw, 38px)" : "clamp(34px, 3.6vw, 60px)"}/1.05 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>
            Zwei Ausgangslagen.<br />Ein System<span style={{ color: "var(--signal)" }}>.</span>
          </h2>
          <p style={{ margin: "18px 0 0", font: "400 16px/1.65 var(--font-display)", color: "var(--text-muted)", maxWidth: 520 }}>
            Egal, wo dein Projekt steht: Das System dahinter ist dasselbe, nur der Einstieg ist ein anderer.
          </p>
        </Fx>
      </div>
      <div ref={ref} style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 20 : 24, position: "relative", alignItems: "stretch" }}>
        <MandatPanel
          on={run} from={-44} delayBase={250}
          label="Abverkauf · Bestand"
          titel={<span>Du hast gekauft.<br />Jetzt soll es schnell gehen.</span>}
          copy="Das Zinshaus ist günstig eingekauft, die Einheiten sollen zügig und sauber in den Markt. Kein Markenaufbau nötig: Das System startet sofort."
          schritte={[["Tag 1", "Unterlagen und Preisliste übergeben"], ["Woche 1", "Kampagne und CIRCLE-Matching gehen live"], ["Ab Woche 2", "Besichtigungen und Angebote, alles live in LENS"]]}
        />
        <MandatPanel
          on={run} from={44} delayBase={400}
          label="Neuentwicklung · Launch"
          titel={<span>Du entwickelst neu.<br />Es braucht eine eigene Marke.</span>}
          copy="Dein Projekt braucht eine Positionierung und eine Story, die trägt. Wir bauen zuerst den Auftritt und starten dann den Vertrieb. Nicht inseriert, inszeniert."
          schritte={[["Schritt 1", "Positionierung und Projektstory"], ["Schritt 2", "Projektmarke, Homepage und Vermarktungsunterlagen"], ["Schritt 3", "Launch mit Kampagne und CIRCLE"]]}
        />
      </div>
    </section>
  );
}

/* ===== 09 · EINWÄNDE — Akkordeon (Granger) ===== */
const EINWAENDE = [
  ["Was kostet es — und wann?", "100 % erfolgsbasiert: Wir verdienen am Abverkauf, nicht am Retainer — keine Setup-Kosten, kein monatliches Fixum. Unser Risiko liegt neben deinem.", { href: "#simulator", label: "Zum Simulator" }],
  ["Wie schnell sehen wir erste Daten?", "Kampagnen-Setup und CIRCLE-Matching starten direkt nach der Unterlagen-Übergabe; Anfragen und Pipeline siehst du ab dem ersten Tag live in LENS. [PLATZHALTER: verbindliche Timeline]", { href: "#funnel", label: "Projekt einreichen" }],
  ["Was passiert mit unseren Bestandsmaklern?", "Deine Bestandspartner bleiben eingebunden: CIRCLE ergänzt statt ersetzt, und die Zuordnung jeder Anfrage bleibt in LENS transparent nachvollziehbar. [PLATZHALTER: Details Partnermodell]"],
  ["Ist das bank- und beiratsfähig?", "Ja. Deine Projektdaten bleiben deine, und die LENS-Auswertungen sind exportfähig — aufbereitet für Bank, Beirat und Gesellschafter."],
  ["Was, wenn das Projekt schon läuft?", "Ein Einstieg ist jederzeit möglich: Wir docken an den aktuellen Stand an und steuern ab dort datenbasiert weiter — auch mitten in der Vermarktung."],
  ["Wie steigen wir wieder aus?", "Über klare Meilensteine statt Bindungsfallen — definierte Exit-Punkte je Projektphase, vorab vereinbart."],
];
function EinwaendeBt() {
  return (
    <window.FaqBlock
      nr="09" label="Fragen"
      title={<span>Was du<br />wissen willst.</span>}
      subline="Ehrliche Antworten — kein Kleingedrucktes."
      items={EINWAENDE}
      anchor={{ text: "Offene Frage? Wir rufen zurück — persönlich, nicht per Bot.", link: "Kontakt aufnehmen", img: "../../assets/team/portrait-02.jpg" }}
    />
  );
}

/* ===== 10 · FUNNEL — 3 Felder + Reassurance ===== */
function FunnelBt() {
  const [sent, setSent] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [einverst, setEinverst] = React.useState(false);
  const fRef = React.useRef(null);
  const mob = window.useMobile();
  const send = async () => {
    const f = fRef.current;
    if (!f || !f.reportValidity() || !einverst || busy) return;
    const data = Object.fromEntries(new FormData(f).entries());
    setBusy(true); setErr(false);
    const ok = await window.submitLead("projekt", data);
    setBusy(false);
    if (ok) setSent(true); else setErr(true);
  };
  const twoCol = { display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 12 };
  const feld = { font: "400 15px var(--font-display)", padding: "15px 17px", borderRadius: "var(--r-inner)", border: "none", outline: "none", background: "#FFFFFF", color: "var(--ink-2)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", width: "100%" };
  const selFeld = { ...feld, appearance: "none", WebkitAppearance: "none", cursor: "pointer", paddingRight: 40, fontFamily: "var(--font-display)", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235F5A54' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" };
  return (
    <section id="funnel" data-track="chapter_view_10" data-screen-label="Funnel" className="u-grain" style={{ position: "relative", background: "var(--paper)", padding: "150px 7vw 185px" }}>
      <Kap nr="10" label="Projekt prüfen" />
      <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", textAlign: "center" }}>
        <Fx>
          <h2 style={{ margin: 0, font: "500 clamp(30px, 3.2vw, 52px)/1.04 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>
            Projekt prüfen lassen<span style={{ color: "var(--signal)" }}>.</span>
          </h2>
          <p style={{ margin: "18px auto 0", font: "400 16px/1.6 var(--font-display)", color: "var(--text-muted)", maxWidth: 520 }}>
            Unser Team prüft dein Projekt auf Marktresonanz, mit echten Daten, bevor du Budget bindest.
          </p>
        </Fx>
        <div style={{ marginTop: 36, textAlign: "left", background: "var(--surface-raised)", borderRadius: "var(--r-card)", padding: "clamp(24px, 3vw, 36px)", boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "16px 0" }} data-track="funnel_submit">
              <span style={{ display: "inline-flex", width: 60, height: 60, borderRadius: "50%", background: "var(--signal-soft)", color: "var(--signal-deep)", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m4 10.5 4 4 8-9"></path></svg>
              </span>
              <div style={{ font: "500 21px var(--font-display)", color: "var(--ink)", marginTop: 16 }}>Danke. Antwort in 48 h — mit Daten.</div>
            </div>
          ) : (
            <form ref={fRef} onSubmit={(e) => { e.preventDefault(); send(); }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={twoCol}>
                <input name="name" placeholder="Name" required autoComplete="name" style={feld} />
                <input name="email" type="email" placeholder="E-Mail" required autoComplete="email" style={feld} />
              </div>
              <div style={twoCol}>
                <input name="firma" placeholder="Firma (optional)" autoComplete="organization" style={feld} />
                <input name="telefon" type="tel" placeholder="Telefon (optional)" autoComplete="tel" style={feld} />
              </div>
              <div style={twoCol}>
                <input name="standort" placeholder="Projekt-Standort — Bezirk oder Adresse" required style={feld} />
                <select name="phase" defaultValue="" style={selFeld}>
                  <option value="" disabled>Projektphase</option>
                  <option>Grundstück</option>
                  <option>Planung</option>
                  <option>Im Bau</option>
                  <option>Fertiggestellt</option>
                </select>
              </div>
              <div style={twoCol}>
                <select name="einheiten" defaultValue="" style={selFeld}>
                  <option value="" disabled>Einheiten im Projekt</option>
                  <option>Unter 10</option>
                  <option>10–30</option>
                  <option>31–60</option>
                  <option>Über 60</option>
                </select>
                <select name="vermarktungsstart" defaultValue="" style={selFeld}>
                  <option value="" disabled>Geplanter Vermarktungsstart</option>
                  <option>Sofort</option>
                  <option>In 3–6 Monaten</option>
                  <option>In 6–12 Monaten</option>
                  <option>Später / offen</option>
                </select>
              </div>
              <input name="projektlink" placeholder="Projekt-Link oder Exposé-PDF (optional)" style={feld} />
              <textarea name="beschreibung" placeholder="Kurzbeschreibung — Lage, Einheiten-Mix, Besonderheiten (optional)" rows={3} style={{ ...feld, resize: "vertical", fontFamily: "inherit" }}></textarea>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", font: "400 13.5px/1.5 var(--font-display)", color: "var(--text-muted)", marginTop: 4 }}>
                <input type="checkbox" checked={einverst} onChange={(e) => setEinverst(e.target.checked)} style={{ marginTop: 2, accentColor: "#FFAA09" }} />
                Ich bin einverstanden, dass UNIO mich zu meinem Projekt kontaktiert. Details in der <a href="datenschutz.html" style={{ color: "var(--signal-deep)" }}>Datenschutzerklärung</a>.
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", marginTop: 6 }}>
                <Bb variant="signal" size="lg" knob disabled={!einverst || busy} onClick={send}>{busy ? "Wird gesendet …" : "Projekt einreichen"}</Bb>
                <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 10 }}>Vertraulich · Antwort in 48 h · mit Daten</span>
              </div>
              <window.LeadError show={err} />
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ===== Referenz-Störer: Bild-Marquee mit Hover-Gap (Briefing 06.07.) ===== */
/* Echte Kennzahlen (Arbeitsstand) je Projekt. Wo keine belastbare Zahl
   vorliegt (Origins, Das Wimmer), zeigt die Karte den Live-Status statt
   erfundener Werte. */
const STOERER_PROJ = [
  { img: "../../assets/img/ecoluxe.jpg", n: "Ecoluxe", b: "Wien 1190", g: "num", v: "282", cap: "Anfragen · Kampagne", plain: true },
  { video: "../../assets/video/hufhaus.mp4", img: "../../assets/img/vienna-garden.jpg", n: "Das Wimmer", b: "Wien-Umland", g: "live", cap: "Live vermarktet", plain: true },
  { img: "../../assets/img/beheim.jpg", n: "Das Beheim", b: "Wien 1170", g: "num", v: "27", cap: "Anfragen · 2 Wochen", plain: true },
  { img: "../../assets/img/obenzwei.jpg", n: "ObenZwei", b: "Wien 1020", g: "num", v: "25", cap: "hochqual. Anfragen / Woche", plain: true },
  { img: "../../assets/img/penthouse.jpg", n: "Origins", b: "Wien 1180", g: "live", cap: "Live vermarktet", plain: true },
  { img: "../../assets/img/albrecht.jpg", n: "Das Albrecht", b: "Wien 1170", g: "num", v: "61", cap: "Anfragen · 2 Wochen", plain: true },
];
function StoererGraphic({ p }) {
  const cap = { font: "10px var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.82)" };
  if (p.g === "num") {
    return (
      <div>
        <div style={{ font: "500 26px/1 var(--font-display)", letterSpacing: "-0.02em", color: "#FFFFFF" }}>{p.v}</div>
        <div style={{ ...cap, marginTop: 7 }}>{p.cap}</div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal)", animation: BT_RM ? "none" : "uPulse 2.2s var(--ease-unio) infinite" }}></span>
      <span style={cap}>{p.cap}</span>
    </div>
  );
}
function StoererBt() {
  const [hov, setHov] = React.useState(false);
  const [tip, setTip] = React.useState(-1);
  const [ref, run] = useOnceInView(0.2);
  const loop = STOERER_PROJ.concat(STOERER_PROJ);
  const first = STOERER_PROJ[0], last = STOERER_PROJ[STOERER_PROJ.length - 1];
  const words = "Der Vertrieb der Zukunft ist kein Inserat. Er ist ein System, das Nachfrage schafft, Makler vereint und alles sichtbar macht — in Echtzeit.".split(" ");
  const stRef = React.useRef(null);
  const [lit, setLit] = React.useState(BT_RM ? words.length : 0);
  React.useEffect(() => {
    if (BT_RM) return;
    const on = () => {
      const el = stRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const prog = Math.min(1, Math.max(0, (innerHeight * 0.82 - r.top) / (r.height + innerHeight * 0.25)));
      setLit(Math.round(prog * words.length));
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <section data-screen-label="Referenzen" className="u-grain" style={{ position: "relative", background: "var(--paper)", padding: "200px 0", overflow: "hidden" }}>
      <p ref={stRef} style={{ maxWidth: 1000, margin: "0 auto", padding: "0 7vw", textAlign: "center", font: "500 clamp(26px, 3vw, 52px)/1.3 var(--font-display)", letterSpacing: "-0.02em" }}>
        {words.map((w, i) => (
          <span key={i} style={{ color: i < lit ? "var(--ink)" : "rgba(11,10,9,0.16)", transition: "color 300ms var(--ease-unio)" }}>{w}{i < words.length - 1 ? " " : ""}</span>
        ))}
      </p>
      <div ref={ref} style={{ marginTop: 130, overflow: "hidden", opacity: run ? 1 : 0, transition: "opacity 800ms var(--ease-unio)" }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false); setTip(-1); }}>
        <div style={{ display: "flex", gap: hov ? 26 : 6, width: "max-content", animation: BT_RM ? "none" : "bMarquee 34s linear infinite", animationPlayState: hov ? "paused" : "running", transition: "gap .5s cubic-bezier(.32,.72,0,1)" }}>
          {loop.map((p, i) => (
            <div key={i} onMouseEnter={() => setTip(i)} onMouseLeave={() => setTip(-1)}
              style={{ position: "relative", flex: "none", width: "clamp(210px, 22vw, 300px)", aspectRatio: "4 / 5", borderRadius: 14, overflow: "hidden", boxShadow: "inset 0 0 0 0.5px var(--hairline-dark)", transform: tip === i ? "scale(1.02)" : "none", transition: "transform .5s cubic-bezier(.32,.72,0,1)" }}>
              {p.video
                ? <video src={p.video} poster={p.img} muted loop autoPlay playsInline preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", background: "var(--paper-3)" }}></video>
                : <img src={p.img} alt={p.n} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
              {!p.plain && <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.28) 0%, transparent 32%, transparent 58%, rgba(11,10,9,0.42))" }}></div>}
              {/* Health-Card-Grafik: Hairline-Frame + Label oben + variierende Grafik unten */}
              {!p.plain && <div aria-hidden="true" style={{ position: "absolute", inset: 12, borderRadius: 14, border: "1px solid rgba(255,255,255,0.5)", pointerEvents: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "14px 14px 12px", color: "#FFFFFF" }}>
                <div>
                  <div style={{ font: "500 18px/1 var(--font-display)", letterSpacing: "-0.01em" }}>{p.n}<span style={{ font: "10px var(--font-mono)", marginLeft: 6, verticalAlign: "2px" }}>↗</span></div>
                  <div style={{ font: "10px var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.82)", marginTop: 6 }}>{p.b}</div>
                </div>
                <StoererGraphic p={p} />
              </div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandLaunchBt() {
  return (
    <section data-screen-label="Brand" className="u-grain" style={{ position: "relative", background: "var(--paper)", padding: "185px 7vw" }}>
      <div style={{ maxWidth: 640 }}>
        <span className="u-label" style={{ color: "var(--signal-deep)" }}>Brand & Launch System</span>
        <p style={{ margin: "22px 0 0", font: "500 clamp(24px, 3vw, 46px)/1.32 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", maxWidth: 620 }}>
          High-end Positionierung, Projektstory und eine digitale Präsenz auf Premium-Niveau — inklusive Homepage, Landingpages, Funnel und sämtlicher Vermarktungsunterlagen.
        </p>
      </div>
    </section>
  );
}

function App() {
  return (
    <div style={{ fontFamily: "var(--font-display)" }}>
      <SiteNav active="bautraeger.html" cta={{ label: "Projekt prüfen lassen", onClick: () => (location.hash = "funnel") }} />
      <HeroBt />
      <StoererBt />
      <ProblemBt />
      <ProofBt />
      <FunnelGraphBt />
      <LensShowcaseBt />
      <BentoBt />
      <MandateBt />
      <ModellBt />
      <window.ProjektStrecke />
      <FunnelBt />
      <EinwaendeBt />
      <StickyCTA />
      <SiteFooter />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
