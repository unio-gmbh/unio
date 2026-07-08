/* UNIO — Bauträger v3 (Korrektur-Briefing 04.07.): 10 Kapitel, variierte Architekturen.
   01 Split-Hero · 02 Treppen-Statement · 03 Beweis · 04 Pipeline (bt-system) ·
   05 Lernkurve (bt-system) · 06 Nutzen-Bento · 07 100 % · 08 Simulator ·
   09 Einwände · 10 Strecke + Funnel. Tracking-Events: data-track. */
const {
  GlassPanel: GPb, FlutedGlass: FGb, StatBlock: SBb, DataLabel: DLb,
  Button: Bb, IconButton: IBb, Tag: Tgb,
} = window.UNIODesignSystem_b6216a;
const { SiteNav, SiteFooter, Reveal } = window;
const { Kap, GridLines, StickyCTA, SystemLine, Lernkurve, CountUp, useOnceInView, Fx, BT_EASE } = window.BT;

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
  React.useEffect(() => {
    if (window.BT.BT_RM) return;
    const t1 = setTimeout(() => setReveal(1), 400);
    const t2 = setTimeout(() => setDocked(true), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <section id="top" data-track="chapter_view_01" data-screen-label="Hero" style={{ position: "relative", background: "var(--paper)", padding: "98px 40px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 52fr) minmax(0, 48fr)", minHeight: "calc(100svh - 120px)", borderRadius: 22, overflow: "hidden", border: "0.5px solid var(--hairline-dark)", boxShadow: "0 1px 0 rgba(255,255,255,.6) inset" }}>
        {/* Links: Off-White, Treppen-Satz */}
        <div className="u-grain" style={{ position: "relative", overflow: "hidden", background: "var(--paper)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "175px 4vw 120px 7vw" }}>
          <div className="u-herglow" aria-hidden="true" style={{ position: "absolute", left: "-14%", top: "8%", width: "60%", height: "80%", zIndex: 0, pointerEvents: "none", background: "radial-gradient(60% 60% at 20% 40%, rgba(255,170,9,.18) 0%, rgba(255,219,87,.09) 44%, transparent 72%)", animation: BT_RM ? "none" : "heroGlowDrift 30s ease-in-out infinite alternate" }}></div>
          <GridLines />
          <h1 style={{ margin: 0, font: "500 clamp(40px, 4.4vw, 76px)/1.02 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", position: "relative" }}>
            <span style={{ display: "block" }}>Wissen, was funktioniert</span>
            <span style={{ display: "block", marginLeft: "8%", color: "transparent", WebkitTextStroke: "1.5px var(--ink)" }}>bevor</span>
            <span style={{ display: "block", marginLeft: "16%" }}>gebaut wird<span style={{ color: "var(--signal)" }}>.</span></span>
          </h1>
          <p style={{ margin: "24px 0 0 16%", font: "400 17px/1.6 var(--font-display)", color: "var(--text-muted)", maxWidth: 380, position: "relative" }}>
            Markttest, Marketing und Vertrieb als ein datengesteuertes System.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 30, marginLeft: "16%", alignItems: "center", position: "relative" }}>
            <Bb size="lg" knob data-track="hero_cta_primary" onClick={() => (location.hash = "funnel")}>Projekt prüfen lassen</Bb>
            <Bb size="lg" variant="ghost" data-track="hero_cta_secondary" onClick={() => (location.hash = "system")}>So arbeiten wir</Bb>
          </div>
        </div>
        {/* Rechts: Projektfoto, Reveal-Choreografie */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: 480 }}>
          <FGb reveal={reveal} side="left" strength={13} style={{ position: "absolute", inset: 0 }}>
            <img src="../../assets/img/albrecht.jpg" alt="Das Albrecht — Townhäuser, Wien 1170" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </FGb>
          <DockPoint top="18%" right="8%" label="Preisband kalibriert" show={docked} delay={0} />
          <DockPoint top="42%" right="16%" label="Nachfrage-Score 72" show={docked} delay={160} />
          <DockPoint top="64%" right="7%" label="Top 4 reserviert" show={docked} delay={320} />
        </div>
      </div>
      {/* Kennzahlen-Reihe (StatBlock-Stil, groß & zentriert) */}
      <div style={{ position: "relative", zIndex: 5, margin: "150px auto 130px", paddingTop: 60, borderTop: "1px solid var(--hairline-dark)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48, maxWidth: 1200 }}>
        <SBb value="1 Mrd" label="Projektvolumen in der Pipeline" tone="light" size="clamp(84px, 8.4vw, 148px)" />
        <SBb value={100} unit="%" label="Transparenz durch UNIO Lens" tone="light" size="clamp(84px, 8.4vw, 148px)" />
        <SBb value="1 Mrd" label="Reichweite mit unseren Kampagnen" tone="light" size="clamp(84px, 8.4vw, 148px)" />
      </div>
    </section>
  );
}

/* ===== 02 · DAS PROBLEM — Treppen-Statement ===== */
const PROBLEME = [
  ["01", "Testing & Positionierung", "Brand Sprint, Creative Testing und Zielgruppen-Cluster liefern eine validierte Story — für höhere Preisresilienz und bessere Nachfrage."],
  ["02", "Lead Engine", "Realtime Demand, messbar bis zur Anfragequalität: KI-Qualifizierung, Intent Score und datenbasierte Sales-Execution bis zum Close."],
  ["03", "Circle", "Kuratierte Makler-Community (ab 100.000 € Jahresumsatz) sorgt für höhere Abschlussgeschwindigkeit, Fokus und messbar gesteuerten Vertrieb."],
  ["04", "Dashboard & Data Intelligence", "Live-Pipeline, Unit-Status und Predictions in Echtzeit — plus Data Engine, die aus Projekten lernt und jedes nächste Launch besser macht."],
];
function ProblemBt() {
  return (
    <section data-track="chapter_view_02" data-screen-label="System" className="u-grain" style={{ position: "relative", background: "var(--paper)", padding: "185px 7vw 160px" }}>
      <div style={{ maxWidth: 640, marginBottom: 100, position: "relative" }}>
        <h2 style={{ margin: 0, font: "500 clamp(34px, 4vw, 64px)/1.06 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>
          Projekte <em style={{ fontStyle: "italic" }}>planbarer</em><br />und erfolgreicher machen.
        </h2>
        <p style={{ margin: "22px 0 0", font: "400 16px/1.7 var(--font-display)", color: "var(--text-muted)", maxWidth: 500 }}>
          Bauträger brauchen kein weiteres Tool — sondern ein System, das den gesamten Projektzyklus optimiert: von Positionierung und Nachfrage bis zur Vertriebs-Execution und Echtzeit-Steuerung.
        </p>
      </div>
      <div style={{ position: "relative" }}>
        {PROBLEME.map(([nr, t, m], i) => (
          <Fx key={nr} delay={i * 90}>
            <div style={{ display: "grid", gridTemplateColumns: "64px minmax(0, 1.2fr) minmax(0, 1fr)", gap: "0 40px", padding: "48px 0", borderTop: "1px solid var(--hairline-dark)", alignItems: "start" }}>
              <span style={{ font: "14px var(--font-mono)", color: "var(--signal-deep)", paddingTop: 6 }}>{nr}</span>
              <h3 style={{ margin: 0, font: "500 clamp(24px, 2.6vw, 38px)/1.1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{t}</h3>
              <p style={{ margin: 0, font: "400 15px/1.7 var(--font-display)", color: "var(--text-muted)", maxWidth: 380 }}>{m}</p>
            </div>
          </Fx>
        ))}
      </div>
    </section>
  );
}

/* ===== 03 · DER BEWEIS — Formora-Slide + Treppen-Stats ===== */
function ProofBt() {
  const [ref, run] = useOnceInView(0.3);
  const stats = [
    { v: 61, k: "Anfragen / 2 Wo. · Das Albrecht", off: 0 },
    { v: 27, k: "Anfragen / 2 Wo. · Beheim", off: 44 },
    { v: 40, k: "Anfragen nach Übernahme · Penthouse € 4 Mio", off: 88 },
    { v: 25, k: "hochqual. Anfragen / Wo. · ObenZwei", off: 132 },
  ];
  return (
    <section data-track="chapter_view_03" data-screen-label="Beweis" className="u-grain" style={{ position: "relative", background: "var(--paper-2)", padding: "175px 7vw 175px" }}>
      <GridLines />
      <Kap nr="03" label="Beweis" />
      <div style={{ position: "relative", borderRadius: "var(--r-panel)", overflow: "hidden", boxShadow: "var(--shadow-soft)" }}>
        <img src="../../assets/img/ecoluxe-wide.jpg" alt="Villa Ecoluxe" style={{ display: "block", width: "100%", height: "min(70vh, 620px)", objectFit: "cover" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.34), transparent 36%, transparent 58%, rgba(11,10,9,0.5))" }}></div>
        <div aria-hidden="true" style={{ position: "absolute", inset: 18, border: "1px solid rgba(255,255,255,0.34)", borderRadius: 14, pointerEvents: "none" }}></div>
        {[["Case", "Villa Ecoluxe", { top: 34, left: 38 }], ["Status", "Verkauft", { top: 34, right: 38, textAlign: "right" }, true], ["Vermarktung", "Vor Baustart getestet", { bottom: 34, left: 38 }], ["Steuerung", "Live · LENS", { bottom: 34, right: 38, textAlign: "right" }]].map(([k, v, posi, sig]) => (
          <div key={k} style={{ position: "absolute", color: "var(--text-inverse)", ...posi }}>
            <span className="u-label" style={{ color: "var(--text-inverse-muted)" }}>{k}</span>
            <div style={{ font: "16px var(--font-mono)", marginTop: 4, color: sig ? "var(--signal)" : "inherit" }}>{v}</div>
          </div>
        ))}
        <div style={{ position: "absolute", left: 38, right: 38, top: "45%", color: "var(--text-inverse)" }}>
          <h2 style={{ margin: 0, font: "500 clamp(32px, 4vw, 64px)/1 var(--font-display)", letterSpacing: "-0.03em", textShadow: "0 2px 40px rgba(0,0,0,0.45)" }}>
            Verkauft, bevor der<br />Markt es glaubte.
          </h2>
        </div>
      </div>
      <a href="#funnel" data-track="inline_cta_beweis" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 72, font: "500 16px var(--font-display)", color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--hairline-dark)", paddingBottom: 4, position: "relative" }}>
        Ihr Projekt so prüfen lassen <span style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>→</span>
      </a>
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
      <div className="u-grain" style={{ position: BT_RM ? "relative" : "sticky", top: 0, minHeight: "100svh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "150px 7vw 90px" }}>
        <span aria-hidden="true" style={{ position: "absolute", right: "3%", top: "12%", font: "500 clamp(120px, 20vw, 300px)/0.8 var(--font-display)", letterSpacing: "-0.05em", color: "transparent", WebkitTextStroke: "1px rgba(11,10,9,0.06)", pointerEvents: "none", userSelect: "none" }}>Vertrieb</span>
        <div style={{ position: "relative", maxWidth: 640, marginBottom: 56 }}>
          <h2 style={{ margin: 0, font: "500 clamp(30px, 3.4vw, 54px)/1.06 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Performance Marketing & Demand</h2>
          <p style={{ margin: "18px 0 0", font: "400 16px/1.7 var(--font-display)", color: "var(--text-muted)", maxWidth: 520 }}>
            Skalierbare Leadgenerierung über die relevanten Kanäle — mit sauberem Tracking, kreativer Iteration und einem Setup, das Nachfrage in planbaren Vertrieb übersetzt.
          </p>
        </div>
        {/* Legende */}
        <div style={{ position: "relative", display: "flex", gap: 22, justifyContent: "flex-end", marginBottom: 40 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "11px var(--font-mono)", letterSpacing: "0.06em", color: "var(--signal-deep)" }}><span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--signal)" }}></span>Durch UNIO — der Zuwachs</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "11px var(--font-mono)", letterSpacing: "0.06em", color: "var(--text-muted)" }}><span style={{ width: 12, height: 12, borderRadius: 3, background: "#FFFFFF", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}></span>Basis</span>
        </div>
        {/* Balken */}
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "clamp(12px, 2vw, 28px)", alignItems: "end", height: "clamp(300px, 44vh, 460px)" }}>
          {FUNNEL.map((f, i) => {
            const win = BT_RM ? 1 : back(Math.max(0, Math.min(1, (p - i * 0.13) / 0.5)));
            const h = (f.conv / 100) * 100 * win;
            const orangeH = f.orange;
            return (
              <div key={f.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                <div style={{ font: "500 12px var(--font-mono)", color: "var(--signal-deep)", marginBottom: 8, opacity: win }}>{f.up}</div>
                <div style={{ font: "500 clamp(28px, 3.4vw, 52px)/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", marginBottom: 12 }}>{Math.round(f.conv * win)}<span style={{ fontSize: "0.4em" }}>%</span></div>
                <div style={{ position: "relative", width: "100%", height: h + "%", minHeight: win > 0.02 ? 6 : 0, borderRadius: "8px 8px 0 0", overflow: "hidden", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", transition: BT_RM ? "none" : "height 80ms linear", display: "flex", flexDirection: "column" }}>
                  {/* Orange (UNIO-Zuwachs) oben */}
                  <div style={{ height: orangeH + "%", background: "var(--signal)", position: "relative" }}>
                    {i === 0 && <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
                      <div style={{ flex: 56, background: "#E8971A", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px", font: "9px var(--font-mono)", color: "#fff" }}><span>Meta</span><span>56%</span></div>
                      <div style={{ flex: 19, background: "#F0A83F", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px", font: "9px var(--font-mono)", color: "#fff" }}><span>Google</span><span>19%</span></div>
                    </div>}
                  </div>
                  {/* Basis-Linie */}
                  <div style={{ borderTop: "1.5px dashed rgba(11,10,9,0.4)" }}></div>
                  {/* Weiß (Basis) unten */}
                  <div style={{ flex: 1, background: "#FFFFFF", position: "relative" }}>
                    {i === 0 && <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
                      <div style={{ flex: 19, borderBottom: "1px solid var(--hairline-dark)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px", font: "9px var(--font-mono)", color: "var(--text-muted)" }}><span>willhaben</span><span>19%</span></div>
                      <div style={{ flex: 6, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px", font: "9px var(--font-mono)", color: "var(--text-muted)" }}><span>ImmoScout24</span><span>6%</span></div>
                    </div>}
                  </div>
                </div>
                <div style={{ font: "500 14px var(--font-display)", color: "var(--ink)", marginTop: 14 }}>{f.n}</div>
                <div style={{ font: "9.5px var(--font-mono)", letterSpacing: "0.08em", color: "var(--text-muted)", marginTop: 5 }}>{f.drv}</div>
              </div>
            );
          })}
        </div>
        <p className="u-label" style={{ marginTop: 32, color: "var(--text-muted)", fontSize: 10 }}>[PLATZHALTER: echte Splits & Uplift-% — an Live-Daten koppeln]</p>
      </div>
    </section>
  );
}

/* ===== 06 · NUTZEN-BENTO (der einzige Karten-Moment) ===== */
function NCard({ span = 2, tone = "light", title, copy, children }) {
  const bg = tone === "dark" ? "var(--ink)" : tone === "orange" ? "var(--signal)" : "#FFFFFF";
  const fg = tone === "dark" ? "var(--text-inverse)" : tone === "orange" ? "#FFFFFF" : "var(--ink)";
  const muted = tone === "dark" ? "var(--text-inverse-muted)" : tone === "orange" ? "rgba(255,245,239,0.85)" : "var(--text-muted)";
  return (
    <div style={{ gridColumn: `span ${span}`, background: bg, borderRadius: "var(--r-card)", padding: "24px 24px 22px", boxShadow: tone === "light" ? "inset 0 0 0 1px var(--hairline-dark)" : "var(--shadow-float)", display: "flex", flexDirection: "column", gap: 10, minHeight: 230 }}>
      <div style={{ font: "500 19px/1.2 var(--font-display)", letterSpacing: "-0.02em", color: fg }}>{title}</div>
      {copy && <p style={{ margin: 0, font: "400 13.5px/1.55 var(--font-display)", color: muted, maxWidth: "40ch" }}>{copy}</p>}
      <div style={{ marginTop: "auto", paddingTop: 12 }}>{children}</div>
    </div>
  );
}
const nChip = { font: "500 12px var(--font-display)", padding: "6px 11px", borderRadius: "var(--r-pill)", background: "var(--signal-soft)", color: "var(--signal-deep)", boxShadow: "inset 0 0 0 1px rgba(255,170,9,0.35)", display: "inline-flex", alignItems: "center", gap: 6 };

function BentoBt() {
  const [ref, run] = useOnceInView(0.2);
  return (
    <section ref={ref} data-track="chapter_view_06" data-screen-label="Nutzen" style={{ position: "relative", background: "#FFFFFF", padding: "175px 7vw 175px" }}>
      <Kap nr="06" label="Nutzen" />
      <div style={{ maxWidth: 760, marginBottom: 80 }}>
        <Fx>
          <h2 style={{ margin: 0, font: "500 clamp(36px, 3.8vw, 64px)/1.02 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>
            Was Sie davon haben.
          </h2>
        </Fx>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}>
        <NCard span={4} tone="orange" title="Schneller zur Vorverwertungsquote." copy="Vorgemerkte Nachfrage zahlt direkt auf die von Banken geforderte Vorverkaufsquote ein — frühere Finanzierungsfreigabe, früherer Baustart.">
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <span style={{ font: "500 52px/1 var(--font-display)", letterSpacing: "-0.03em", color: "#FFFFFF", fontVariantNumeric: "tabular-nums" }}>
              <CountUp to={1240} run={run} fmt={(v) => v.toLocaleString("de-AT")} />
            </span>
            <span className="u-label" style={{ color: "rgba(255,245,239,0.85)", fontSize: 9 }}>Käuferprofile im Matching</span>
          </div>
        </NCard>
        <NCard span={2} title="CIRCLE — kuratierter Vertrieb." copy="Top-Makler-Community ab € 100.000 Jahresumsatz schließt schneller ab, gesteuert statt gehofft.">
          <span style={{ font: "500 44px/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--signal-deep)", fontVariantNumeric: "tabular-nums" }}>25+</span>
          <span className="u-label" style={{ display: "block", marginTop: 8, fontSize: 9, color: "var(--text-muted)" }}>Top-Performer im Pool</span>
        </NCard>
        <NCard span={2} title="Standzeit kostet Zinsen." copy="Jeder Monat weniger Vermarktungsdauer senkt die Zwischenfinanzierung — Tempo als Euro-Größe, nicht als Marketing-Wort.">
          <svg viewBox="0 0 200 46" style={{ width: "100%", maxWidth: 200, height: "auto" }} aria-hidden="true">
            <polyline points="4,8 40,14 76,12 112,24 148,30 192,40" fill="none" stroke="rgba(11,10,9,0.3)" strokeWidth="1.5" />
            <circle cx="192" cy="40" r="3.5" fill="var(--signal)" />
          </svg>
        </NCard>
        <NCard span={2} title="Der Mix wird getestet, bevor er gebaut wird." copy="Grundrisse, Preisband und Zielgruppen am echten Markt validiert — weniger Umplanung, weniger Margen-Risiko.">
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Preisband", "Grundrisse", "Zielgruppen"].map((c) => <span key={c} style={nChip}>{c}</span>)}
          </div>
        </NCard>
        <NCard span={2} title="Absagen fließen zurück ins Projekt." copy="Besichtigungs- und Absage-Gründe als strukturierter Rückkanal für Ausstattungs- und Preisentscheidungen.">
          <svg viewBox="0 0 200 40" style={{ width: 130, height: "auto" }} aria-hidden="true">
            <path d="M10 12 H150 a20 20 0 0 1 0 24 H60" fill="none" stroke="rgba(11,10,9,0.3)" strokeWidth="1.5" />
            <path d="M70 28 60 36l10 8" fill="none" stroke="var(--signal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(0,-8)" />
          </svg>
        </NCard>
        <NCard span={2} title="Ein Ansprechpartner statt drei Schnittstellen." copy="Agentur, Makler und Portal-Koordination fallen in ein System — keine Reporting-Meetings, Sie sehen live." />
        <NCard span={2} title="CIRCLE verkauft, wo andere inserieren." copy="Vorgemerkte Käufer aus der kuratierten Community — Abschlüsse oft, bevor das Projekt öffentlich wird.">
          <svg viewBox="0 0 120 40" style={{ width: 110, height: "auto" }} aria-hidden="true">
            {[16, 40, 64, 88].map((x, i) => <circle key={x} cx={x} cy="20" r="9" fill="none" stroke={i === 3 ? "var(--signal)" : "rgba(11,10,9,0.3)"} strokeWidth="1.5" />)}
            <circle cx="88" cy="20" r="3.5" fill="var(--signal)" />
          </svg>
        </NCard>
        <NCard span={2} title="Nachfrage mit Substanz." copy="Zielgruppen nach Milieus statt Reichweite um jeden Preis.">
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Eigennutzer", "1020–1220 Wien", "€ 0,6–1,8 Mio", "Familien & Paare"].map((c) => <span key={c} style={nChip}>{c}</span>)}
          </div>
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
      <Kap nr="07" label="Modell" />
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
          {[["Vergütung", "erfolgsbasiert am Abverkauf — kein Retainer"], ["Reporting", "entfällt — Sie sehen live (LENS)"], ["Markttest", "vor dem Baustart, am echten Markt"], ["Exit-Logik", "klare Meilensteine statt Bindungsfallen"]].map(([k, v], i) => (
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
  return (
    <section id="simulator" data-track="chapter_view_08" data-screen-label="Simulator" className="u-grain" style={{ position: "relative", background: "var(--paper-2)", padding: "175px 7vw 175px" }}>
      <GridLines />
      <Kap nr="08" label="Simulator" />
      <div style={{ maxWidth: 640, marginBottom: 76, position: "relative" }}>
        <Fx>
          <h2 style={{ margin: 0, font: "500 clamp(32px, 3.4vw, 56px)/1.03 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>
            Rechnen Sie es<br />selbst durch.
          </h2>
        </Fx>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.15fr)", gap: 14, position: "relative" }}>
        <div style={{ background: "var(--surface-raised)", borderRadius: "var(--r-card)", padding: "28px 30px", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
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
              <div key={n} style={{ display: "grid", gridTemplateColumns: "175px 1fr 64px", gap: 12, alignItems: "center", padding: "7px 0" }}>
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
          <span className="u-label" style={{ color: "rgba(255,245,239,0.85)", fontSize: 10 }}>Prognose Abverkauf</span>
          <div style={{ font: "500 clamp(48px, 5vw, 84px)/1 var(--font-display)", letterSpacing: "-0.03em", marginTop: 16, fontVariantNumeric: "tabular-nums" }}>
            {mstr.length < 2 && <span style={{ color: "rgba(255,255,255,0.3)" }}>0</span>}{mstr}
            <span style={{ fontSize: "0.38em", fontWeight: 400, marginLeft: 8 }}>Monate</span>
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 22, borderTop: "1px solid rgba(255,255,255,0.35)", paddingTop: 18 }}>
            <div><div style={{ font: "500 24px/1 var(--font-display)", color: "#FFFFFF" }}>{kaufMonat.toFixed(1)}</div><div className="u-label" style={{ color: "rgba(255,245,239,0.85)", fontSize: 9, marginTop: 6 }}>Käufe / Monat</div></div>
            <div><div style={{ font: "500 24px/1 var(--font-display)", color: "#FFFFFF" }}>{einheiten}</div><div className="u-label" style={{ color: "rgba(255,245,239,0.85)", fontSize: 9, marginTop: 6 }}>Einheiten</div></div>
          </div>
          <p style={{ margin: "18px 0 0", font: "400 13.5px/1.55 var(--font-display)", color: "rgba(255,245,239,0.92)", display: "flex", gap: 8, alignItems: "baseline" }} title="Qualitativer Zusammenhang — kein Zinssatz beziffert. Die konkrete Ersparnis hängt von Ihrer Finanzierungsstruktur ab.">
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
                <Bb variant="paper" size="sm" disabled={!mail.includes("@")} onClick={() => setPdfState("sent")}>Senden</Bb>
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

/* ===== 09 · EINWÄNDE — Akkordeon (Granger) ===== */
const EINWAENDE = [
  ["Was kostet es — und wann?", "100 % erfolgsbasiert: Wir verdienen am Abverkauf, nicht am Retainer — keine Setup-Kosten, kein monatliches Fixum. Unser Risiko liegt neben Ihrem."],
  ["Wie schnell sehen wir erste Daten?", "Der Markttest startet direkt nach der Unterlagen-Übergabe; erste Resonanzdaten liegen innerhalb des Testfensters vor. [PLATZHALTER: verbindliche Timeline]"],
  ["Was passiert mit unseren Bestandsmaklern?", "Ihre Bestandspartner bleiben eingebunden: CIRCLE ergänzt statt ersetzt, und die Zuordnung jeder Anfrage bleibt in LENS transparent nachvollziehbar. [PLATZHALTER: Details Partnermodell]"],
  ["Ist das bank- und beiratsfähig?", "Ja. Ihre Projektdaten bleiben Ihre, und die LENS-Auswertungen sind exportfähig — aufbereitet für Bank, Beirat und Gesellschafter."],
  ["Was, wenn das Projekt schon läuft?", "Ein Einstieg ist jederzeit möglich: Wir docken an den aktuellen Stand an und steuern ab dort datenbasiert weiter — auch mitten in der Vermarktung."],
  ["Wie steigen wir wieder aus?", "Über klare Meilensteine statt Bindungsfallen — definierte Exit-Punkte je Projektphase, vorab vereinbart."],
];
function EinwaendeBt() {
  return (
    <window.FaqBlock
      nr="09" label="Fragen"
      title={<span>Was Sie<br />wissen wollen.</span>}
      subline="Ehrliche Antworten — kein Kleingedrucktes."
      items={EINWAENDE}
      anchor={{ text: "Offene Frage? Wir rufen zurück — persönlich, nicht per Bot.", link: "Kontakt aufnehmen", img: "../../assets/team/portrait-02.jpg" }}
    />
  );
}

/* ===== 10 · FUNNEL — 3 Felder + Reassurance ===== */
function FunnelBt() {
  const [sent, setSent] = React.useState(false);
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
            Unser Team prüft Ihr Projekt auf Marktresonanz, mit echten Daten, bevor Sie Budget binden.
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
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input placeholder="Name" style={feld} />
                <input placeholder="E-Mail" style={feld} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input placeholder="Firma (optional)" style={feld} />
                <input placeholder="Telefon (optional)" style={feld} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input placeholder="Projekt-Standort — Bezirk oder Adresse" style={feld} />
                <select defaultValue="" style={selFeld}>
                  <option value="" disabled>Projektphase</option>
                  <option>Grundstück</option>
                  <option>Planung</option>
                  <option>Im Bau</option>
                  <option>Fertiggestellt</option>
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <select defaultValue="" style={selFeld}>
                  <option value="" disabled>Einheiten im Projekt</option>
                  <option>Unter 10</option>
                  <option>10–30</option>
                  <option>31–60</option>
                  <option>Über 60</option>
                </select>
                <select defaultValue="" style={selFeld}>
                  <option value="" disabled>Geplanter Vermarktungsstart</option>
                  <option>Sofort</option>
                  <option>In 3–6 Monaten</option>
                  <option>In 6–12 Monaten</option>
                  <option>Später / offen</option>
                </select>
              </div>
              <input placeholder="Projekt-Link oder Exposé-PDF (optional)" style={feld} />
              <textarea placeholder="Kurzbeschreibung — Lage, Einheiten-Mix, Besonderheiten (optional)" rows={3} style={{ ...feld, resize: "vertical", fontFamily: "inherit" }}></textarea>
              <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", marginTop: 6 }}>
                <Bb variant="signal" size="lg" knob onClick={() => setSent(true)}>Projekt einreichen</Bb>
                <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 10 }}>Vertraulich · Antwort in 48 h · mit Daten</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ===== Referenz-Störer: Bild-Marquee mit Hover-Gap (Briefing 06.07.) ===== */
const STOERER_PROJ = [
  { img: "../../assets/img/ecoluxe.jpg", n: "Ecoluxe", b: "Wien 1190", g: "bars", d: [4, 6, 5, 8, 7, 9], cap: "Anfragen / Woche" },
  { video: "../../assets/video/hufhaus.mp4", img: "../../assets/img/vienna-garden.jpg", n: "Das Wimmer", b: "Wien-Umland", g: "ring", d: [72], cap: "Nachfrage-Index" },
  { img: "../../assets/img/beheim.jpg", n: "Das Beheim", b: "Wien 1170", g: "dots", d: [3], cap: "Vermarktungsphase" },
  { img: "../../assets/img/obenzwei.jpg", n: "ObenZwei", b: "Wien 1020", g: "bars", d: [3, 5, 4, 7, 6, 8], cap: "Anfragen / Woche" },
  { img: "../../assets/img/penthouse.jpg", n: "Origins", b: "Wien 1180", g: "ring", d: [64], cap: "Nachfrage-Index" },
  { img: "../../assets/img/albrecht.jpg", n: "Das Albrecht", b: "Wien 1170", g: "dots", d: [4], cap: "Vermarktungsphase" },
];
const PHASEN = ["Analyse", "Testing", "Kampagne", "Besichtigung", "Abschluss"];
function StoererGraphic({ p }) {
  const cap = { font: "8.5px var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.82)" };
  if (p.g === "bars") {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 24 }}>
          {p.d.map((v, k) => <span key={k} style={{ flex: 1, height: (v / 9 * 100) + "%", background: "rgba(255,255,255,0.9)", borderRadius: 1 }}></span>)}
        </div>
        <div style={{ ...cap, marginTop: 8 }}>{p.cap} · steigend</div>
      </div>
    );
  }
  if (p.g === "ring") {
    const C = 2 * Math.PI * 13;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <svg width="34" height="34" viewBox="0 0 30 30" style={{ flex: "none" }}>
          <circle cx="15" cy="15" r="13" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <circle cx="15" cy="15" r="13" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray={C} strokeDashoffset={C * (1 - p.d[0] / 100)} transform="rotate(-90 15 15)" strokeLinecap="round" />
        </svg>
        <div>
          <div style={{ font: "500 16px/1 var(--font-display)", color: "#FFFFFF" }}>{p.d[0]}<span style={{ font: "9px var(--font-mono)", marginLeft: 2 }}>/100</span></div>
          <div style={{ ...cap, marginTop: 5 }}>{p.cap}</div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {PHASEN.map((_, k) => <span key={k} style={{ width: k === p.d[0] ? 20 : 7, height: 7, borderRadius: 4, background: k <= p.d[0] ? "#FFFFFF" : "rgba(255,255,255,0.4)", transition: "all .4s" }}></span>)}
      </div>
      <div style={{ ...cap, marginTop: 8 }}>{p.cap} · {PHASEN[p.d[0]]}</div>
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
                ? <video src={p.video} poster={p.img} muted loop autoPlay playsInline preload="auto" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", background: "var(--paper-3)" }}></video>
                : <img src={p.img} alt={p.n} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
              {!p.plain && <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.28) 0%, transparent 32%, transparent 58%, rgba(11,10,9,0.42))" }}></div>}
              {/* Health-Card-Grafik: Hairline-Frame + Label oben + variierende Grafik unten */}
              {!p.plain && <div aria-hidden="true" style={{ position: "absolute", inset: 12, borderRadius: 14, border: "1px solid rgba(255,255,255,0.5)", pointerEvents: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "14px 14px 12px", color: "#FFFFFF" }}>
                <div>
                  <div style={{ font: "500 18px/1 var(--font-display)", letterSpacing: "-0.01em" }}>{p.n}<span style={{ font: "10px var(--font-mono)", marginLeft: 6, verticalAlign: "2px" }}>↗</span></div>
                  <div style={{ font: "9px var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.82)", marginTop: 6 }}>{p.b}</div>
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
      <SystemLine />
      <FunnelGraphBt />
      <Lernkurve />
      <BentoBt />
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
