/* UNIO — Makler / CIRCLE v2 (Korrektur-Briefing 04.07.): 9 Kapitel, Menschlichkeit als
   Gestaltungsprinzip. 01 Mensch-Raster-Hero · 02 Drei Fragen · 03 Gesichter des CIRCLE ·
   04 System-Bento (bento.jsx, makler-Variante) · 05 Admin-Porträt · 06 Rechner ·
   07 Beteiligung · 08 Bewegung (Ink) · 09 Schritte + Bewerbung. Du-Register. */
const { GlassPanel: GPm, Button: Bm } = window.UNIODesignSystem_b6216a;
const { SiteNav, SiteFooter } = window;
const { Kap, GridLines, Fx, CountUp, useOnceInView, BT_EASE, BT_RM } = window.BT;

/* Raster-Zellen für den Hero-Dissolve (deterministisch) */
const MK_CELLS = [];
for (let c = 0; c < 6; c++) for (let r = 0; r < 11; r++) {
  const h = ((r * 7 + c * 13) % 10) / 10;
  if (h < ((c + 1) / 6) * 0.9) MK_CELLS.push([c, r, (r + c) % 2 === 0, (r * 5 + c * 3) % 19 === 0, (r + c) % 3]);
}

/* Sticky Micro-Pill „Bewerben" ab 50 % Scrolltiefe (Desktop) */
function MkSticky() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const on = () => {
      const max = document.body.scrollHeight - innerHeight;
      const p = max > 0 ? scrollY / max : 0;
      setShow(innerWidth >= 900 && p > 0.5 && p < 0.92);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, []);
  return (
    <a href="#bewerben" data-track="sticky_cta" style={{
      position: "fixed", right: 20, bottom: 20, zIndex: 70, height: 44,
      display: "inline-flex", alignItems: "center", gap: 10, padding: "0 20px",
      borderRadius: "var(--r-pill)", textDecoration: "none",
      background: "var(--glass-dark-2)", WebkitBackdropFilter: "blur(18px)", backdropFilter: "blur(18px)",
      boxShadow: "inset 0 0 0 1px var(--hairline-light), var(--shadow-float)",
      color: "var(--text-inverse)", font: "500 14px var(--font-display)",
      opacity: show ? 1 : 0, transform: show ? "none" : "translateY(14px)", pointerEvents: show ? "auto" : "none",
      transition: `all var(--dur-fast) ${BT_EASE}`,
    }}>Bewerben <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>→</span></a>
  );
}

/* ===== 01 · HERO — Mensch trifft Raster ===== */
function MkDock({ top, label, show, delay }) {
  return (
    <div style={{ position: "absolute", top, left: 0, transform: "translateX(-40%)", display: "flex", alignItems: "center", opacity: show ? 1 : 0, transition: `opacity 700ms ${BT_EASE} ${delay}ms`, zIndex: 4 }}>
      <span className="u-label" style={{ fontSize: 10, color: "var(--text-inverse)", background: "var(--glass-dark)", WebkitBackdropFilter: "blur(14px)", backdropFilter: "blur(14px)", padding: "8px 13px", borderRadius: "var(--r-pill)", boxShadow: "inset 0 0 0 1px var(--hairline-light)", whiteSpace: "nowrap" }}>{label}</span>
      <span aria-hidden="true" style={{ width: 38, height: 1, background: "var(--hairline-light-strong)" }}></span>
    </div>
  );
}

function HeroMk() {
  const [docked, setDocked] = React.useState(BT_RM);
  const mob = window.useMobile();
  React.useEffect(() => {
    if (BT_RM) return;
    const t = setTimeout(() => setDocked(true), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <section id="top" data-track="chapter_view_01" data-screen-label="Hero" style={{ position: mob ? "relative" : "sticky", top: 0, zIndex: 0, background: "var(--paper)", padding: mob ? "82px 14px 0" : "98px 40px 0" }}>
      <style>{`@keyframes mkDrift { from { transform: translateY(-4px); } to { transform: translateY(5px); } }`}</style>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 52fr) minmax(0, 48fr)", minHeight: mob ? "auto" : "calc(100svh - 120px)", borderRadius: mob ? 18 : 22, overflow: "hidden", border: "0.5px solid var(--hairline-dark)", boxShadow: "0 1px 0 rgba(255,255,255,.6) inset" }}>
        {/* Links: Off-White, Headline + verankerte CTAs */}
        <div className="u-grain" style={{ position: "relative", overflow: "hidden", background: "var(--paper)", display: "flex", flexDirection: "column", justifyContent: "center", padding: mob ? "56px 24px 44px" : "185px 4vw 120px 7vw" }}>
          <div className="u-herglow" aria-hidden="true" style={{ position: "absolute", left: "-14%", top: "8%", width: "60%", height: "80%", zIndex: 0, pointerEvents: "none", background: "radial-gradient(60% 60% at 20% 40%, rgba(255,170,9,.18) 0%, rgba(255,219,87,.09) 44%, transparent 72%)", animation: BT_RM ? "none" : "heroGlowDrift 30s ease-in-out infinite alternate" }}></div>
          <GridLines />
          <h1 style={{ margin: 0, font: `500 ${mob ? "clamp(31px, 8.4vw, 40px)" : "clamp(40px, 4.4vw, 76px)"}/1.04 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)", position: "relative" }}>
            Agent-First beginnt hier.<br />Werde UNIO Partner<span style={{ color: "var(--signal)" }}>.</span>
          </h1>
          <p style={{ margin: mob ? "18px 0 0" : "24px 0 0", font: `400 ${mob ? 15.5 : 17}px/1.6 var(--font-display)`, color: "var(--text-muted)", maxWidth: 430, position: "relative" }}>
            CIRCLE ist die Agent-First Community für Top-Makler: mehr Netto, konstanter Dealflow, Personal Brand Growth und echte Ownership.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap", position: "relative" }}>
            <Bm size="lg" knob data-track="hero_cta_primary" onClick={() => (location.hash = "rechner")}>Was bleibt für dich? Zum Rechner</Bm>
            <Bm size="lg" variant="ghost" data-track="hero_cta_secondary" onClick={() => (location.hash = "bewerben")}>Jetzt bewerben</Bm>
          </div>
        </div>
        {/* Rechts: Porträt, rechter Rand löst sich ins Raster auf — Gesicht bleibt scharf */}
        {/* Rechts: Gruppenbild des Gründerteams — vollständig sichtbar, saubere Fakten-Leiste */}
        <div style={{ position: "relative", minHeight: mob ? 380 : 480, background: "var(--paper-2)", display: "flex", alignItems: "center", justifyContent: "center", padding: mob ? "0 16px 16px" : "32px 32px 32px 0" }}>
          <div style={{ position: "relative", width: "100%", height: "100%", minHeight: mob ? 360 : 420, borderRadius: "var(--r-panel)", overflow: "hidden", boxShadow: "var(--shadow-float)" }}>
            <img src="../../assets/team/gruppe-serioes.jpg" alt="Das UNIO Gründerteam" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 45%, rgba(11,10,9,0.55))" }}></div>
            {/* saubere Fakten-Leiste am unteren Rand, nichts abgeschnitten */}
            <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, display: "flex", background: "var(--glass-dark)", WebkitBackdropFilter: "blur(20px)", backdropFilter: "blur(20px)", borderRadius: 16, boxShadow: "inset 0 0 0 1px var(--hairline-light)", overflow: "hidden", opacity: docked ? 1 : 0, transform: docked ? "none" : "translateY(12px)", transition: `all 700ms ${BT_EASE}` }}>
              {[["100 %", "Provision"], ["Deine", "Marke"], ["Beteiligung", "möglich"]].map(([v, k], i) => (
                <div key={k} style={{ flex: 1, padding: "14px 16px", borderLeft: i === 0 ? "none" : "1px solid var(--hairline-light)", color: "var(--text-inverse)" }}>
                  <div style={{ font: "500 18px/1 var(--font-display)", letterSpacing: "-0.02em" }}>{v}</div>
                  <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-inverse-muted)", marginTop: 5 }}>{k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== 02 · DIE DREI FRAGEN — gepinnt, große Hintergrundzahl 01→02→03 ===== */
const FRAGEN_MK = [
  ["Warum gibst du die Hälfte ab", "an eine Marke, die nicht deine ist?"],
  ["Warum verwaltest du Papier", "statt Beziehungen zu führen?"],
  ["Warum baust du auf, was dir", "am Ende nicht gehört?"],
];
const PILLARS_MK = [
  ["01", "Ownership statt Abhängigkeit", "CIRCLE dreht das alte Margensystem um: Deine Provision gehört dir — und über das UNIO Share-Modell partizipierst du am Netzwerk, das du selbst mit aufbaust.", [["100 %", "Provision ab €150K p.a."], ["85 %", "Provision bis €150K p.a."]]],
  ["02", "Enablement durch Infrastruktur & Tech", "Statt Kontrolle: Enablement. Digitales Backoffice, KI-Portfoliomanagement, immersive Exposés, Smart Matching, intelligentes Lead Management, digitales Closing und KI-Telefonassistent.", [["8+", "Tech-Module"], ["~80 %", "weniger Admin"]]],
  ["03", "Unternehmertum mit Community-Power", "Du bleibst unabhängig und baust deine eigene Marke auf — aber nicht allein. Austausch, Standards, Zusammenarbeit und gemeinsames Momentum statt Einzelkämpfer-Modus.", [["20 %", "Gewinn-Ausschüttung"], ["49 %", "Share an Top-Performer"]]],
  ["04", "Projekt-Pipeline statt Zufalls-Dealflow", "Das UNIO-Akquise-Team holt exklusive, kuratierte Projekte. Alle Projekte werden aufbereitet, vom Inhouse-Marketing ins richtige Licht gerückt — und du bekommst vorqualifizierte Leads.", [["exklusiv", "kuratierter Dealflow"], ["25 %", "passiv aus Recruits"]]],
  ["05", "Deine Marketing-Superpower", "CIRCLE ist für Makler, die nicht „mitlaufen\" wollen. Individuelle Markenstrategie, Personal Branding und volle Content-Produktion unter deinem Namen.", [["3", "Kurzvideos / Monat"], ["10", "Fotos / Monat"]]],
];
function FragenMk() {
  const mob = window.useMobile();
  return (
    <section data-track="chapter_view_02" data-screen-label="Vorteile" className="u-grain" style={{ position: "relative", zIndex: 2, background: "var(--paper)", padding: mob ? "96px 6vw 100px" : "150px 7vw 160px", borderRadius: "28px 28px 0 0", marginTop: -28, boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)" }}>
      <GridLines />
      <Kap nr="02" label="Vorteile" />
      <div style={{ maxWidth: 900, marginBottom: mob ? 44 : 80 }}>
        <h2 style={{ margin: 0, font: `500 ${mob ? "clamp(30px, 8vw, 38px)" : "clamp(34px, 3.8vw, 64px)"}/1.05 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>
          Fünf Hebel, die dich<br />skalieren lassen.
        </h2>
        <p style={{ margin: "22px 0 0", font: `400 ${mob ? 15 : 17}px/1.7 var(--font-display)`, color: "var(--text-muted)", maxWidth: 520 }}>
          CIRCLE kombiniert Einkommen, Dealflow, Growth und Ownership in einem Operating Model — damit du wie ein Unternehmer wächst, ohne deine Unabhängigkeit zu verlieren.
        </p>
      </div>
      <div style={{ position: "relative" }}>
        {PILLARS_MK.map(([nr, t, c, stats], i) => (
          <Fx key={nr} delay={i * 80}>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "64px minmax(0, 1.5fr) minmax(0, 1fr)", gap: mob ? "12px 0" : "0 40px", padding: mob ? "36px 0" : "56px 0", borderTop: "1px solid var(--hairline-dark)", alignItems: "start" }}>
              <span style={{ font: "14px var(--font-mono)", color: "var(--signal-deep)", paddingTop: mob ? 0 : 6 }}>{nr}</span>
              <div>
                <h3 style={{ margin: 0, font: `500 ${mob ? "clamp(21px, 5.6vw, 26px)" : "clamp(22px, 2.2vw, 30px)"}/1.15 var(--font-display)`, letterSpacing: "-0.02em", color: "var(--ink)" }}>{t}</h3>
                <p style={{ margin: "14px 0 0", font: "400 15px/1.7 var(--font-display)", color: "var(--text-muted)", maxWidth: 460 }}>{c}</p>
              </div>
              <div style={{ display: "flex", gap: mob ? 28 : 36, justifyContent: mob ? "flex-start" : "flex-end", alignItems: "baseline", flexWrap: "wrap", marginTop: mob ? 8 : 0 }}>
                {stats.map(([v, k]) => (
                  <div key={k} style={{ textAlign: mob ? "left" : "right" }}>
                    <div style={{ font: `500 ${mob ? "clamp(26px, 7vw, 34px)" : "clamp(30px, 3vw, 46px)"}/1 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--signal)" }}>{v}</div>
                    <div className="u-label" style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 8, maxWidth: 140 }}>{k}</div>
                  </div>
                ))}
              </div>
            </div>
          </Fx>
        ))}
      </div>
    </section>
  );
}
/* CIRCLE-Antwort — eigener Beat, wortweise */
function AntwortMk() {
  const antwort = "CIRCLE ist die Antwort: eine kuratierte Community selbstständiger Makler:innen — mit Software, Dealflow und echter Beteiligung.".split(" ");
  const pRef = React.useRef(null);
  const [lit, setLit] = React.useState(BT_RM ? antwort.length : 0);
  React.useEffect(() => {
    if (BT_RM) return;
    const on = () => {
      const el = pRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const prog = oaClamp((innerHeight * 0.82 - r.top) / (r.height + innerHeight * 0.25));
      setLit(Math.round(prog * antwort.length));
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <section data-screen-label="Antwort" className="u-grain" style={{ position: "relative", zIndex: 2, background: "var(--paper)" }}>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8vw" }}>
        <p ref={pRef} style={{ margin: 0, font: "500 clamp(26px, 3vw, 52px)/1.3 var(--font-display)", letterSpacing: "-0.02em", maxWidth: 960, textAlign: "center" }}>
          {antwort.map((w, i) => (
            <span key={i} style={{ color: i < lit ? "var(--ink)" : "rgba(11,10,9,0.16)", transition: "color 300ms var(--ease-unio)" }}>{w}{i < antwort.length - 1 ? " " : ""}</span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ===== 03 · GESICHTER DES CIRCLE — Porträt-Datenkarten ===== */
function MkSpark({ pts }) {
  const max = Math.max(...pts), min = Math.min(...pts);
  const d = pts.map((p, i) => `${(i / (pts.length - 1)) * 100},${30 - ((p - min) / (max - min)) * 24}`).join(" ");
  return (
    <svg viewBox="0 0 100 34" preserveAspectRatio="none" style={{ width: "100%", height: 22, display: "block", margin: "7px 0 5px" }} aria-hidden="true">
      <polyline points={d} fill="none" stroke="var(--signal)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const MK_FACES = [
  { img: "../../assets/team/portrait-01.jpg", pos: "center 22%", stat: "12 Abschlüsse", sub: "/25 · [PLATZHALTER]", spark: [2, 4, 3, 6, 8], off: 0 },
  { img: "../../assets/team/portrait-02.jpg", pos: "center 20%", stat: "Seit 2024", sub: "im CIRCLE · [PLATZHALTER]", spark: [3, 5, 6, 6, 9], off: 32 },
  { img: "../../assets/team/portrait-03.jpg", pos: "center 22%", stat: "1020–1220", sub: "Fokus Wien · [PLATZHALTER]", spark: [4, 3, 5, 7, 8], off: 64 },
];

function GesichterMk() {
  const mob = window.useMobile();
  return (
    <section data-track="chapter_view_03" data-screen-label="Gesichter" className="u-grain" style={{ position: "relative", zIndex: 3, background: "var(--paper-2)", padding: mob ? "96px 6vw 110px" : "150px 7vw 175px", borderRadius: "28px 28px 0 0", marginTop: -28, boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)" }}>
      <Kap nr="03" label="Gesichter" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, flexWrap: "wrap", marginBottom: mob ? 40 : 80 }}>
        <h2 style={{ margin: 0, font: `500 ${mob ? "clamp(28px, 7.6vw, 36px)" : "clamp(32px, 3.4vw, 56px)"}/1.04 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>
          Gesichter des CIRCLE.
        </h2>
        <span className="u-label" style={{ color: "var(--text-muted)" }}>Kuratiert · Wien zuerst</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: mob ? 12 : 16, alignItems: "start" }}>
        {MK_FACES.map((f, i) => (
          <Fx key={f.stat} delay={i * 100}>
            <div style={{ marginTop: mob ? 0 : f.off, position: "relative", aspectRatio: "3 / 4", borderRadius: "var(--r-card)", overflow: "hidden", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
              <img src={f.img} alt="CIRCLE-Partner:in" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: f.pos }} />
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.05), transparent 42%, rgba(11,10,9,0.5))" }}></div>
              <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, borderRadius: "var(--r-inner)", background: "var(--glass-dark)", WebkitBackdropFilter: "blur(14px)", backdropFilter: "blur(14px)", boxShadow: "inset 0 0 0 1px var(--hairline-light)", padding: "12px 14px", color: "var(--text-inverse)" }}>
                <div style={{ font: "500 20px/1 var(--font-display)", letterSpacing: "-0.02em" }}>{f.stat}<span style={{ font: "11px var(--font-mono)", marginLeft: 6, color: "var(--signal)" }}>↗</span></div>
                <MkSpark pts={f.spark} />
                <span className="u-label" style={{ fontSize: 8, color: "var(--text-inverse-muted)" }}>{f.sub}</span>
              </div>
            </div>
          </Fx>
        ))}
        <Fx delay={300}>
          <div style={{ marginTop: mob ? 0 : 56, aspectRatio: "3 / 4", borderRadius: "var(--r-card)", background: "var(--signal)", color: "#FFFFFF", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "22px 22px 20px" }}>
            <span aria-hidden="true" style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFFFFF", marginBottom: 16 }}></span>
            <div style={{ font: "500 20px/1.25 var(--font-display)", letterSpacing: "-0.02em" }}>Die ersten Plätze im CIRCLE werden gerade vergeben — deiner?</div>
            <a href="#bewerben" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, font: "500 14px var(--font-display)", color: "#FFFFFF", textDecoration: "none" }}>Bewerben <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>→</span></a>
          </div>
        </Fx>
      </div>
    </section>
  );
}

/* ===== 04b · OBJEKTANLAGE, LIVE — gepinnte Verwandlungs-Sequenz (Briefing v2) ===== */
const OA_DOCS = ["BAB", "GRUNDRISSE", "ENERGIEAUSWEIS", "GRUNDBUCHSAUSZUG", "FOTOS", "NUTZWERTGUTACHTEN"];
const OA_START = [[-30, 14, -9], [118, 8, 7], [-26, 64, 6], [116, 68, -6], [-32, 40, 4], [120, 38, -8]];
const OA_MID = [[38, 30, -5], [50, 26, 6], [42, 46, 3], [54, 44, -7], [36, 38, 8], [52, 36, -3]];
const OA_ASSETS = ["EXPOSÉ", "ONLINE-INSERAT", "BROSCHÜRE", "FALTSCHILD / BAUTAFEL"];
const oaClamp = (v) => Math.min(1, Math.max(0, v));

function OaDocIcon() {
  return (
    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" stroke="var(--ink-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 1h8l4 4v11H1z"></path><path d="M9 1v4h4"></path>
    </svg>
  );
}

function ObjektanlageMk() {
  const [ref, p] = window.usePinProgress();
  if (BT_RM) {
    /* reduced-motion: statisches Vorher/Nachher-Diptychon */
    return (
      <section id="objektanlage" data-screen-label="Objektanlage" className="u-grain" style={{ background: "var(--paper)", padding: "175px 7vw" }}>
        <Kap nr="04b" label="Objektanlage" />
        <h2 style={{ margin: "0 0 40px", font: "500 clamp(30px, 3.2vw, 52px)/1.05 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Objektanlage, live.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 24, alignItems: "center" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>{OA_DOCS.map((d) => (<span key={d} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 16px", borderRadius: 10, background: "var(--surface-raised)", boxShadow: "inset 0 0 0 1px var(--ink-3)", font: "10px var(--font-mono)", letterSpacing: "0.1em" }}><OaDocIcon />{d}</span>))}</div>
          <div style={{ width: 120, height: 120, borderRadius: 14, overflow: "hidden", position: "relative" }}><window.SignalRaster cols={5} rows={5} /></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>{OA_ASSETS.map((a) => (<span key={a} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 16px", borderRadius: 10, background: "var(--surface-raised)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "10px var(--font-mono)", letterSpacing: "0.1em" }}>{a} ✓</span>))}</div>
        </div>
        <p style={{ margin: "36px 0 0", font: "16px var(--font-mono)", color: "var(--ink)" }}>42 % weniger Tipparbeit pro Objekt.</p>
        <p style={{ margin: "10px 0 0", font: "400 15px var(--font-display)", color: "var(--text-muted)" }}>Du prüfst und gibst frei — den Rest macht das System.</p>
      </section>
    );
  }
  const ph1 = oaClamp(p / 0.35), ph2 = oaClamp((p - 0.35) / 0.25), ph3 = oaClamp((p - 0.6) / 0.4);
  const headline = p < 0.35 ? "Drag and Drop deiner Dokumente" : p < 0.6 ? "Die UNIO KI liest, strukturiert und erstellt" : "Fertig zur Freigabe.";
  return (
    <section id="objektanlage" ref={ref} data-track="chapter_view_04b" data-screen-label="Objektanlage" style={{ height: "300vh", position: "relative", background: "var(--paper)" }}>
      <div className="u-grain" style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden", display: "grid", gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)", alignItems: "center", padding: "0 7vw", gap: 32 }}>
        <GridLines />
        <Kap nr="04b" label="Objektanlage" />
        {/* Links: stehende Headline + Scrub-Kreisbogen */}
        <div style={{ position: "relative" }}>
          <h2 style={{ margin: 0, font: "500 clamp(30px, 3vw, 50px)/1.05 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", minHeight: "2.2em" }}>{headline}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 44 }}>
            <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
              <circle cx="17" cy="17" r="14" fill="none" stroke="var(--hairline-dark)" strokeWidth="1.5" />
              <circle cx="17" cy="17" r="14" fill="none" stroke="var(--signal)" strokeWidth="1.5" strokeDasharray={2 * Math.PI * 14} strokeDashoffset={(1 - p) * 2 * Math.PI * 14} transform="rotate(-90 17 17)" strokeLinecap="round" />
            </svg>
            <span className="u-label" style={{ fontSize: 10, color: "var(--text-muted)" }}>{p < 0.35 ? "Der Papierstapel" : p < 0.6 ? "Der Kern" : "Die fertige Immobilie"}</span>
          </div>
          {/* Schluss-Stat + Mensch-Anker */}
          <div style={{ marginTop: 34, opacity: ph3 > 0.55 ? 1 : 0, transform: ph3 > 0.55 ? "none" : "translateY(14px)", transition: `all 600ms ${BT_EASE}` }}>
            <div style={{ font: "500 clamp(26px, 2.4vw, 40px)/1.1 var(--font-mono)", color: "var(--ink)" }}>42 %</div>
            <div className="u-label" style={{ color: "var(--text-muted)", marginTop: 6 }}>weniger Tipparbeit pro Objekt</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: "var(--r-pill)", background: "var(--ink)", color: "var(--paper)", font: "500 13.5px var(--font-display)" }}>
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: "var(--signal)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "9px var(--font-mono)", color: "#FFF" }}>✓</span>
                Freigeben
              </span>
              <span style={{ font: "400 13.5px/1.5 var(--font-display)", color: "var(--text-muted)", maxWidth: "26ch" }}>Du prüfst und gibst frei — den Rest macht das System.</span>
            </div>
          </div>
        </div>
        {/* Rechts: Bühne */}
        <div style={{ position: "relative", height: "72svh" }}>
          {/* Kern */}
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%, -50%) scale(${0.7 + 0.3 * ph2})`, width: 150, height: 150, borderRadius: 16, overflow: "hidden", opacity: Math.max(0.25, ph2), boxShadow: ph2 > 0.2 && ph3 < 0.9 ? "0 0 0 5px var(--signal-soft)" : "none", transition: "box-shadow 400ms" }}>
            <window.SignalRaster cols={5} rows={5} pulse={ph2 > 0.3 && ph3 < 0.6} style={{ position: "absolute", inset: 0 }} />
          </div>
          {/* Fortschritts-Hairline unterm Kern */}
          <div style={{ position: "absolute", left: "50%", top: "calc(50% + 92px)", transform: "translateX(-50%)", width: 150, height: 1.5, background: "var(--hairline-dark)", opacity: ph2 > 0 && ph3 < 0.4 ? 1 : 0 }}>
            <div style={{ height: "100%", width: ph2 * 100 + "%", background: "var(--signal)" }}></div>
          </div>
          {/* Phase 1: Dokument-Karten fliegen ein, sammeln sich */}
          {OA_DOCS.map((d, i) => {
            const [sx, sy, rot] = OA_START[i];
            const [mx, my, mrot] = OA_MID[i];
            const k = oaClamp(ph1 * 1.3 - i * 0.06);
            const x = sx + (mx - sx) * k, y = sy + (my - sy) * k, r = rot + (mrot - rot) * k;
            const shrink = ph2;
            return (
              <div key={d} style={{
                position: "absolute", left: x + "%", top: y + "%",
                transform: `rotate(${r * (1 - shrink)}deg) scale(${1 - 0.75 * shrink}) translate(${shrink * (50 - x)}%, ${shrink * (42 - y)}%)`,
                opacity: 1 - oaClamp((ph2 - 0.55) / 0.3),
                display: "inline-flex", alignItems: "center", gap: 9, padding: "13px 17px", borderRadius: 10,
                background: "var(--surface-raised)", boxShadow: "inset 0 0 0 1px var(--ink-3), var(--shadow-float)",
                font: "10px var(--font-mono)", letterSpacing: "0.1em", color: "var(--ink-2)", whiteSpace: "nowrap",
              }}><OaDocIcon />{d}</div>
            );
          })}
          {/* Phase 3: Assets fächern rechts heraus */}
          {OA_ASSETS.map((a, i) => {
            const k = oaClamp(ph3 * 1.5 - i * 0.14);
            const on = k > 0.12;
            return (
              <div key={a} style={{
                position: "absolute", left: "58%", top: 14 + i * 19 + "%",
                transform: on ? "translateX(0)" : "translateX(-28px)", opacity: on ? 1 : 0,
                transition: `all 500ms ${BT_EASE}`,
                display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 17px", borderRadius: 10,
                background: "var(--surface-raised)", boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)",
                font: "10px var(--font-mono)", letterSpacing: "0.1em", color: "var(--ink-2)", whiteSpace: "nowrap",
              }}>
                {a}
                <span style={{ width: 17, height: 17, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 0 1.5px var(--signal)", color: "var(--signal-deep)", font: "9px var(--font-mono)", transform: on ? "scale(1)" : "scale(0)", transition: `transform 350ms ${BT_EASE} 180ms` }}>✓</span>
              </div>
            );
          })}
          {/* Suchprofil-Match-Chip als letztes Asset */}
          <div style={{ position: "absolute", left: "58%", top: "90%", opacity: ph3 > 0.8 ? 1 : 0, transform: ph3 > 0.8 ? "none" : "translateX(-28px)", transition: `all 500ms ${BT_EASE}`, display: "inline-flex", alignItems: "center", gap: 9, padding: "11px 16px", borderRadius: "var(--r-pill)", background: "var(--signal-soft)", boxShadow: "inset 0 0 0 1px rgba(255,170,9,0.4)", font: "500 13px var(--font-display)", color: "var(--signal-deep)", whiteSpace: "nowrap" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal)" }}></span>Passender Käufer gefunden
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== 05 · 80 % WENIGER ADMIN — Porträt-Moment mit Glas-Chips ===== */
function AdminMk() {
  const [ref, p] = window.usePinProgress();
  const mob = window.useMobile();
  const chips = ["Exposé", "CRM", "Termine", "Closing", "Abrechnung"];
  const scatter = [[8, 8, -7], [52, 4, 5], [64, 40, 9], [6, 48, -4], [34, 26, 3]];
  const k = BT_RM ? 1 : oaClamp(p / 0.16 * 1.4);          // 0–0.16: Chips sortieren
  const done = k > 0.8;
  const slide = BT_RM ? 0 : oaClamp((p - 0.34) / 0.14);   // späterer Start: mehr Abstand, nächstes Panel bleibt länger verborgen
  const oaP = BT_RM ? 1 : oaClamp((p - 0.5) / 0.5);       // Objektanlage-Animation
  const ph1 = oaClamp(oaP / 0.35), ph2 = oaClamp((oaP - 0.35) / 0.25), ph3 = oaClamp((oaP - 0.6) / 0.4);
  const oaHead = oaP < 0.35 ? "Drag and Drop deiner Dokumente" : oaP < 0.6 ? "Die UNIO KI liest, strukturiert und erstellt" : "Fertig zur Freigabe.";
  if (BT_RM) {
    return (
      <section data-track="chapter_view_05" data-screen-label="Admin" className="u-grain" style={{ background: "var(--paper-2)", padding: "175px 7vw" }}>
        <Kap nr="05" label="Entlastung" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0, font: "500 clamp(32px, 3.4vw, 54px)/1.04 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>80 % weniger Admin.<br />100 % mehr Makeln.</h2>
            <p style={{ margin: "20px 0 0", font: "400 17px/1.6 var(--font-display)", color: "var(--text-muted)", maxWidth: 460 }}>Die Plattform räumt sichtbar weg, was dich vom Gespräch abhält.</p>
          </div>
          <div style={{ position: "relative", height: 360, borderRadius: "var(--r-panel)", overflow: "hidden" }}>
            <img src="../../assets/photos/lifestyle-paar.jpg" alt="[PLATZHALTER: Partner:in im Gespräch]" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }} />
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="objektanlage" ref={ref} data-track="chapter_view_05" data-screen-label="Admin" style={{ height: "660vh", position: "relative", background: "var(--paper-2)" }}>
      <div className="u-grain" style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden", background: "var(--paper)" }}>
        {/* weicher Farb-Crossfade: paper-2 desaturiert nach paper */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--paper-2)", opacity: 1 - slide }}></div>
        <GridLines />
        <Kap nr="05" label={slide > 0.5 ? "Objektanlage" : "Entlastung"} />
        {/* Horizontaler Zwei-Panel-Track: Admin → Objektanlage-Auftakt */}
        <div style={{ position: "absolute", inset: 0, display: "flex", width: "200%", transform: `translateX(${-slide * 50}%)` }}>
          {/* Panel A — Admin */}
          <div style={{ width: "50%", flex: "none", display: "flex", alignItems: "center", padding: mob ? "92px 6vw 40px" : "175px 11vw 110px 7vw" }}>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 1fr) minmax(0, 1fr)", gap: mob ? 24 : 56, alignItems: "center", width: "100%" }}>
              <div>
                <h2 style={{ margin: 0, font: `500 ${mob ? "clamp(27px, 7.2vw, 34px)" : "clamp(32px, 3.4vw, 54px)"}/1.05 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>
                  80 % weniger Admin.<br />100 % mehr Makeln.
                </h2>
                <p style={{ margin: "16px 0 0", font: `400 ${mob ? 15 : 17}px/1.6 var(--font-display)`, color: "var(--text-muted)", maxWidth: 460 }}>
                  Die Plattform räumt sichtbar weg, was dich vom Gespräch abhält — scroll, und der Stapel sortiert sich.
                </p>
              </div>
              <div style={{ position: "relative", height: mob ? 300 : 400, borderRadius: "var(--r-panel)", overflow: "hidden" }}>
                <img src="../../assets/photos/lifestyle-paar.jpg" alt="[PLATZHALTER: Partner:in im Gespräch]" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }} />
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.18), rgba(11,10,9,0.42))" }}></div>
                <span className="u-label" style={{ position: "absolute", left: 16, top: 14, fontSize: 9, color: "var(--text-inverse)", textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>[PLATZHALTER: Partner:in im Gespräch]</span>
                {chips.map((c, i) => {
                  const [sx, sy, rot] = scatter[i];
                  const ki = oaClamp(k * 1.4 - i * 0.09);
                  const x = sx + (66 - sx) * ki, y = sy + (11 + i * 13.5 - sy) * ki;
                  return (
                    <div key={c} style={{
                      position: "absolute", left: x + "%", top: y + "%",
                      transform: `rotate(${rot * (1 - ki)}deg)`,
                      background: "var(--glass-dark)", WebkitBackdropFilter: "blur(18px)", backdropFilter: "blur(18px)",
                      boxShadow: "inset 0 0 0 1px var(--hairline-light)", borderRadius: "var(--r-pill)",
                      padding: "10px 18px", color: "var(--text-inverse)", font: "500 14px var(--font-display)",
                      display: "inline-flex", alignItems: "center", gap: 9, whiteSpace: "nowrap",
                    }}>
                      {c}
                      <span style={{ width: 16, height: 16, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "9px var(--font-mono)", background: ki > 0.92 ? "var(--signal)" : "rgba(255,255,255,0.15)", color: ki > 0.92 ? "#FFFFFF" : "transparent", transition: `all 300ms ${BT_EASE}` }}>✓</span>
                    </div>
                  );
                })}
                <span className="u-label" style={{ position: "absolute", left: 16, bottom: 14, color: "var(--text-inverse)", fontSize: 10, textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}>{done ? "Sortiert · Automatisch" : "Dein Alltag heute"}</span>
              </div>
            </div>
          </div>
          {/* Panel B — Objektanlage: Animation LINKS, Headline RECHTS. Läuft in-place per oaP */}
          <div style={{ width: "50%", flex: "none", position: "relative", display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 1.2fr) minmax(0, 0.8fr)", alignItems: "center", gap: mob ? 12 : 32, padding: mob ? "92px 6vw 30px" : "0 7vw 0 11vw", overflow: "hidden" }}>
            {/* Bühne */}
            <div style={{ position: "relative", height: mob ? "38svh" : "72svh", gridRow: mob ? 2 : "auto" }}>
              <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%, -50%) scale(${0.7 + 0.3 * ph2})`, width: 150, height: 150, borderRadius: 16, overflow: "hidden", opacity: Math.max(0.25, Math.max(1 - ph1, ph2)), boxShadow: ph2 > 0.2 && ph3 < 0.9 ? "0 0 0 5px var(--signal-soft)" : "none", transition: "box-shadow 400ms" }}>
                <window.SignalRaster cols={5} rows={5} pulse={ph2 > 0.3 && ph3 < 0.6} style={{ position: "absolute", inset: 0 }} />
              </div>
              <div style={{ position: "absolute", left: "50%", top: "calc(50% + 92px)", transform: "translateX(-50%)", width: 150, height: 1.5, background: "var(--hairline-dark)", opacity: ph2 > 0 && ph3 < 0.4 ? 1 : 0 }}>
                <div style={{ height: "100%", width: ph2 * 100 + "%", background: "var(--signal)" }}></div>
              </div>
              {OA_DOCS.map((d, i) => {
                const [sx, sy, rot] = OA_START[i];
                const [mx, my, mrot] = OA_MID[i];
                const kk = oaClamp(ph1 * 1.3 - i * 0.06);
                const x = sx + (mx - sx) * kk, y = sy + (my - sy) * kk, r = rot + (mrot - rot) * kk;
                const shrink = ph2;
                return (
                  <div key={d} style={{ position: "absolute", left: x + "%", top: y + "%", transform: `rotate(${r * (1 - shrink)}deg) scale(${1 - 0.75 * shrink}) translate(${shrink * (50 - x)}%, ${shrink * (42 - y)}%)`, opacity: 1 - oaClamp((ph2 - 0.55) / 0.3), display: "inline-flex", alignItems: "center", gap: 9, padding: "13px 17px", borderRadius: 10, background: "var(--surface-raised)", boxShadow: "inset 0 0 0 1px var(--ink-3), var(--shadow-float)", font: "10px var(--font-mono)", letterSpacing: "0.1em", color: "var(--ink-2)", whiteSpace: "nowrap" }}><OaDocIcon />{d}</div>
                );
              })}
              {OA_ASSETS.map((a, i) => {
                const kk = oaClamp(ph3 * 1.5 - i * 0.14);
                const on = kk > 0.12;
                return (
                  <div key={a} style={{ position: "absolute", left: mob ? "34%" : "56%", top: 14 + i * 19 + "%", transform: on ? "translateX(0)" : "translateX(-28px)", opacity: on ? 1 : 0, transition: `all 500ms ${BT_EASE}`, display: "inline-flex", alignItems: "center", gap: 10, padding: mob ? "10px 13px" : "13px 17px", borderRadius: 10, background: "var(--surface-raised)", boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)", font: `${mob ? 9 : 10}px var(--font-mono)`, letterSpacing: "0.1em", color: "var(--ink-2)", whiteSpace: "nowrap" }}>
                    {a}
                    <span style={{ width: 17, height: 17, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 0 1.5px var(--signal)", color: "var(--signal-deep)", font: "9px var(--font-mono)", transform: on ? "scale(1)" : "scale(0)", transition: `transform 350ms ${BT_EASE} 180ms` }}>✓</span>
                  </div>
                );
              })}
              <div style={{ position: "absolute", left: mob ? "34%" : "56%", top: "90%", opacity: ph3 > 0.8 ? 1 : 0, transform: ph3 > 0.8 ? "none" : "translateX(-28px)", transition: `all 500ms ${BT_EASE}`, display: "inline-flex", alignItems: "center", gap: 9, padding: "11px 16px", borderRadius: "var(--r-pill)", background: "var(--signal-soft)", boxShadow: "inset 0 0 0 1px rgba(255,170,9,0.4)", font: `500 ${mob ? 12 : 13}px var(--font-display)`, color: "var(--signal-deep)", whiteSpace: "nowrap" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal)" }}></span>Passender Käufer gefunden
              </div>
            </div>
            {/* Headline rechts (mobil oben) */}
            <div style={{ position: "relative", gridRow: mob ? 1 : "auto" }}>
              <h2 style={{ margin: 0, font: `500 ${mob ? "clamp(22px, 6vw, 28px)" : "clamp(28px, 3vw, 50px)"}/1.08 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)", minHeight: "2.2em" }}>{oaHead}</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: mob ? 16 : 44 }}>
                <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
                  <circle cx="17" cy="17" r="14" fill="none" stroke="var(--hairline-dark)" strokeWidth="1.5" />
                  <circle cx="17" cy="17" r="14" fill="none" stroke="var(--signal)" strokeWidth="1.5" strokeDasharray={2 * Math.PI * 14} strokeDashoffset={(1 - oaP) * 2 * Math.PI * 14} transform="rotate(-90 17 17)" strokeLinecap="round" />
                </svg>
                <span className="u-label" style={{ fontSize: 10, color: "var(--text-muted)" }}>{oaP < 0.35 ? "Der Papierstapel" : oaP < 0.6 ? "Der Kern" : "Die fertige Immobilie"}</span>
              </div>
              <div style={{ marginTop: 34, opacity: ph3 > 0.55 ? 1 : 0, transform: ph3 > 0.55 ? "none" : "translateY(14px)", transition: `all 600ms ${BT_EASE}` }}>
                <div style={{ font: "500 clamp(26px, 2.4vw, 40px)/1.1 var(--font-mono)", color: "var(--ink)" }}>42 %</div>
                <div className="u-label" style={{ color: "var(--text-muted)", marginTop: 6 }}>weniger Tipparbeit pro Objekt</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: "var(--r-pill)", background: "var(--ink)", color: "var(--paper)", font: "500 13.5px var(--font-display)" }}>
                    <span style={{ width: 16, height: 16, borderRadius: "50%", background: "var(--signal)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "9px var(--font-mono)", color: "#FFF" }}>✓</span>
                    Freigeben
                  </span>
                  <span style={{ font: "400 13.5px/1.5 var(--font-display)", color: "var(--text-muted)", maxWidth: "24ch" }}>Du prüfst und gibst frei — den Rest macht das System.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== 06 · DER RECHNER — hell, Count-up nach Slider-Release ===== */
function RechnerMk() {
  const [umsatz, setUmsatz] = React.useState(150000);
  const software = (599 + 199) * 12; // beide Pakete verpflichtend
  const unioCut = 0.15 * Math.min(umsatz, 150000); // 15 % bis 150K, 0 % darüber
  const unio = umsatz - unioCut - software;
  const klassisch = umsatz * 0.5;
  const delta = unio - klassisch;
  const dispRef = React.useRef(delta);
  const [disp, setDisp] = React.useState(delta);
  React.useEffect(() => {
    if (BT_RM) { dispRef.current = delta; setDisp(delta); return; }
    const id = setTimeout(() => {
      const from = dispRef.current, to = delta, t0 = performance.now();
      const step = (now) => {
        const k = Math.min(1, (now - t0) / 550), e = 1 - Math.pow(1 - k, 3);
        const v = from + (to - from) * e;
        dispRef.current = v;
        setDisp(v);
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 200);
    return () => clearTimeout(id);
  }, [delta]);
  const fmt = (n) => "€ " + Math.round(n).toLocaleString("de-AT");
  const mob = window.useMobile();
  return (
    <section id="rechner" data-track="chapter_view_06" data-screen-label="Rechner" className="u-grain" style={{ position: "relative", zIndex: 6, background: "var(--paper)", padding: mob ? "96px 6vw 110px" : "150px 7vw 175px", borderRadius: "28px 28px 0 0", marginTop: -28, boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)" }}>
      <GridLines />
      <Kap nr="06" label="Rechner" />
      <div style={{ maxWidth: 640, marginBottom: mob ? 40 : 80, position: "relative" }}>
        <Fx>
          <h2 style={{ margin: 0, font: `500 ${mob ? "clamp(28px, 7.6vw, 36px)" : "clamp(32px, 3.4vw, 56px)"}/1.04 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>
            Ein Modell, das<br />Leistung belohnt.
          </h2>
          <p style={{ margin: "18px 0 0", font: "400 17px/1.6 var(--font-display)", color: "var(--text-muted)", maxWidth: 440 }}>
            Unser Provisionsmodell ist darauf ausgelegt, dass du mit wachsendem Umsatz mehr behältst — transparent und unternehmerfreundlich. Deinen Vorteil berechnen.
            Beweg den Regler — der Unterschied ist keine Meinung, sondern Arithmetik.
          </p>
        </Fx>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 1fr) minmax(0, 1.15fr)", gap: 14, position: "relative" }}>
        <div style={{ borderRadius: "var(--r-card)", padding: mob ? "22px 20px" : "28px 30px", background: "var(--surface-raised)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }} data-track="rechner_interact">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span className="u-label" style={{ color: "var(--text-muted)" }}>Dein Provisionsumsatz / Jahr</span>
            <span style={{ font: "500 26px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{fmt(umsatz)}</span>
          </div>
          <input
            type="range" min="60000" max="600000" step="10000" value={umsatz}
            onChange={(e) => setUmsatz(+e.target.value)}
            style={{ width: "100%", marginTop: 44, accentColor: "#FFAA09" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ font: "11px var(--font-mono)", color: "var(--text-muted)" }}>€ 60K</span>
            <span style={{ font: "11px var(--font-mono)", color: "var(--text-muted)" }}>€ 600K</span>
          </div>
          <div style={{ marginTop: 30, borderTop: "1px solid var(--hairline-dark)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {[["CIRCLE: dein Netto", unio, "var(--signal)", 1], ["Klassisches Büro: ~50 %", klassisch, "var(--ink-3)", klassisch / unio]].map(([l, v, c, w]) => (
              <div key={l}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ font: "400 13.5px var(--font-display)", color: "var(--text-muted)" }}>{l}</span>
                  <span style={{ font: "15px var(--font-mono)", color: "var(--ink-2)" }}>{fmt(v)}</span>
                </div>
                <div style={{ height: 10, borderRadius: 5, background: "var(--paper-3)", marginTop: 7, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: Math.max(4, w * 100) + "%", background: c, borderRadius: 5, transition: `width 400ms ${BT_EASE}` }}></div>
                </div>
              </div>
            ))}
          </div>
          <p className="u-label" style={{ margin: "18px 0 0", color: "var(--text-muted)", fontSize: 10, lineHeight: 1.6 }}>
            Pflicht-Pakete: UNIO Plattform (€ 199) + Infrastruktur (€ 599) = € 798 / Monat abgezogen · 15 % Provisionsanteil bis € 150K, 0 % darüber.
          </p>
        </div>
        <div className="u-grain" style={{ borderRadius: "var(--r-card)", padding: "clamp(28px, 3vw, 40px)", background: "var(--signal)", color: "#FFFFFF", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-soft)" }}>
          <span className="u-label" style={{ color: "rgba(255,245,239,0.85)", fontSize: 10 }}>Dein Vorsprung / Jahr</span>
          <div style={{ font: "500 clamp(48px, 5vw, 84px)/1 var(--font-display)", letterSpacing: "-0.03em", marginTop: 18, fontVariantNumeric: "tabular-nums" }}>{fmt(disp)}</div>
          <p style={{ margin: "18px 0 0", font: "400 16px/1.6 var(--font-display)", color: "rgba(255,245,239,0.9)", maxWidth: 380 }}>
            Gleiche Deals, gleiche Arbeit — aber deine Marke, deine Provision, dein Anteil an dem, was du aufbaust.
          </p>
          <div style={{ marginTop: "auto", paddingTop: 26 }}>
            <Bm variant="paper" size="lg" knob data-track="rechner_result_cta" onClick={() => (location.hash = "bewerben")}>Als CIRCLE Partner bewerben</Bm>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== 07 · ECHTE BETEILIGUNG — Typo-Moment ===== */
function BeteiligungMk() {
  return (
    <section data-track="chapter_view_07" data-screen-label="Beteiligung" className="u-grain" style={{ position: "relative", zIndex: 7, background: "var(--paper-2)", padding: "clamp(120px, 18vh, 220px) 7vw", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", borderRadius: "28px 28px 0 0", marginTop: -28, boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)" }}>
      <GridLines />
      <Kap nr="07" label="Beteiligung" />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <Fx>
          <h2 style={{ margin: 0, font: "500 clamp(44px, 6vw, 104px)/1 var(--font-display)", letterSpacing: "-0.04em", color: "var(--ink)", maxWidth: 900 }}>
            Du baust auf,<br />was <span style={{ color: "transparent", WebkitTextStroke: "1.5px var(--ink)" }}>dir</span> gehört<span style={{ color: "var(--signal)" }}>.</span>
          </h2>
        </Fx>
        <div style={{ width: "100%", maxWidth: 720, marginTop: 84 }}>
          {[["Unternehmensbeteiligung", "für Top-Performer"], ["Gewinnbeteiligung", "für die Community"], ["Details", "im persönlichen Gespräch"]].map(([k, v], i) => (
            <Fx key={k} delay={i * 100}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 24, padding: "18px 0", borderTop: "1px solid var(--hairline-dark)", alignItems: "baseline" }}>
                <span className="u-label" style={{ color: "var(--text-muted)" }}>{k}</span>
                <span style={{ font: "400 17px var(--font-display)", color: "var(--ink-2)", textAlign: "right" }}>{v}</span>
              </div>
            </Fx>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== 08 · DIE BEWEGUNG — Orange, der Kreis schließt sich ===== */
function BewegungMk() {
  const faces = ["portrait-01.jpg", "portrait-02.jpg", "portrait-03.jpg", "portrait-04.jpg", "portrait-02.jpg", "portrait-03.jpg"];
  const ref = React.useRef(null);
  const circWrapRef = React.useRef(null);
  const mob = window.useMobile();
  const [prog, setProg] = React.useState(BT_RM ? 1 : 0);
  React.useEffect(() => {
    if (BT_RM) return;
    const on = () => {
      // Kreis ist sticky gepinnt, Fortschritt laeuft ueber die Wrapper-Hoehe
      const cw = circWrapRef.current;
      if (!cw) return;
      const rw = cw.getBoundingClientRect();
      const total = Math.max(1, cw.offsetHeight - innerHeight);
      setProg(oaClamp((innerHeight * 0.55 - rw.top) / total));
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, [mob]);
  const R = 128, C = 2 * Math.PI * R;
  const N = faces.length + 1; // + Du
  const pos = (i) => {
    const a = (-90 + (i * 360) / N) * (Math.PI / 180);
    return [160 + R * Math.cos(a), 160 + R * Math.sin(a)];
  };
  const duOn = prog > 0.96;
  return (
    <section ref={ref} data-track="chapter_view_08" data-screen-label="Bewegung" className="u-grain" style={{ position: "relative", zIndex: 8, background: "var(--signal)", padding: mob ? "96px 6vw" : "clamp(96px, 13vh, 150px) 7vw", color: "#FFFFFF", borderRadius: "28px 28px 0 0", marginTop: -28, boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.35)" }}>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 1.1fr) minmax(0, 0.9fr)", gap: mob ? 48 : 56, alignItems: "start", position: "relative", width: "100%" }}>
        {/* Desktop: Text pinnt parallel zum Kreis */}
        <div style={mob ? undefined : { position: "sticky", top: "calc(50vh - 150px)" }}>
          <Fx>
            <h2 style={{ margin: 0, font: `500 ${mob ? "clamp(28px, 7.6vw, 36px)" : "clamp(32px, 3.6vw, 58px)"}/1.04 var(--font-display)`, letterSpacing: "-0.03em" }}>
              Eine Bewegung.<br />Kein Maklerpool.
            </h2>
            <p style={{ margin: "20px 0 0", font: "400 17px/1.6 var(--font-display)", color: "rgba(255,245,239,0.9)", maxWidth: 460 }}>
              Kuratiert statt offen für alle: Wir nehmen Makler:innen auf, die Ownership wollen — und geben ihnen dafür Software, Dealflow und Beteiligung.
            </p>
          </Fx>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 44 }}>
            {["Ownership", "Transparenz", "Kuratiert", "Wien zuerst"].map((v) => (
              <span key={v} className="u-label" style={{ fontSize: 10, padding: "7px 14px", borderRadius: "var(--r-pill)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)", color: "rgba(255,245,239,0.9)" }}>{v}</span>
            ))}
          </div>
        </div>
        {/* Der Kreis schließt sich: SVG-Bahn zeichnet sich, Porträts docken an.
            Hoher Wrapper + sticky, damit die Animation komplett sichtbar bleibt. */}
        <div ref={circWrapRef} style={{ height: "220vh" }}>
        <div style={{ position: "sticky", top: mob ? "calc(50vh - min(44vw, 180px))" : "calc(50vh - 180px)" }}>
        <div style={{ position: "relative", width: "min(100%, 360px)", aspectRatio: "1", margin: "0 auto" }}>
          <svg viewBox="0 0 320 320" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }} aria-hidden="true">
            <circle cx="160" cy="160" r={R} fill="none" stroke="rgba(255,245,239,0.9)" strokeWidth="1.5" strokeDasharray={C} strokeDashoffset={(1 - Math.min(1, prog * 1.04)) * C} transform="rotate(-90 160 160)" strokeLinecap="round" />
            {faces.map((_, i) => {
              const [x1, y1] = pos(i), [x2, y2] = pos(i + 1);
              const on = prog > (i + 1.6) / (N + 1);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,245,239,0.45)" strokeWidth="1" style={{ opacity: on ? 1 : 0, transition: "opacity 500ms" }} />;
            })}
          </svg>
          {faces.map((f, i) => {
            const [x, y] = pos(i);
            const on = prog > (i + 1) / (N + 1);
            return (
              <span key={i} style={{ position: "absolute", left: (x / 320) * 100 + "%", top: (y / 320) * 100 + "%", transform: `translate(-50%, -50%) scale(${on ? 1 : 0.4})`, opacity: on ? 1 : 0, transition: `all 500ms ${BT_EASE}`, width: 58, height: 58, borderRadius: "50%", overflow: "hidden", boxShadow: "0 0 0 3px var(--signal), inset 0 0 0 1px rgba(255,255,255,0.5)" }}>
                <img src={"../../assets/team/" + f} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 22%" }} />
              </span>
            );
          })}
          {(() => { const [x, y] = pos(faces.length); return (
            <span style={{ position: "absolute", left: (x / 320) * 100 + "%", top: (y / 320) * 100 + "%", transform: `translate(-50%, -50%) scale(${duOn ? 1 : 0.4})`, opacity: duOn ? 1 : 0, transition: `all 500ms ${BT_EASE}`, width: 58, height: 58, borderRadius: "50%", background: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 13px var(--font-display)", color: "var(--signal-deep)", animation: duOn && !BT_RM ? "uPulseInv 2s var(--ease-unio) infinite" : "none" }}>+ Du</span>
          ); })()}
          <span className="u-label" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", fontSize: 10, color: "rgba(255,245,239,0.9)", textAlign: "center" }}>Der Kreis<br />schließt sich.</span>
        </div>
        </div>
        </div>
      </div>
      {/* Zweiter Teil: Gesichter des CIRCLE */}
      <div style={{ marginTop: 120, borderTop: "1px solid rgba(255,255,255,0.28)", paddingTop: 72 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, flexWrap: "wrap", marginBottom: 56 }}>
          <h3 style={{ margin: 0, font: "500 clamp(26px, 2.8vw, 42px)/1.05 var(--font-display)", letterSpacing: "-0.03em", color: "#FFFFFF" }}>Gesichter des CIRCLE.</h3>
          <span className="u-label" style={{ color: "rgba(255,245,239,0.82)" }}>Kuratiert · Wien zuerst</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: mob ? 14 : 20 }}>
          {MK_FACES.map((f, i) => (
            <Fx key={f.stat} delay={i * 100}>
              <div style={{ position: "relative", aspectRatio: "3 / 4", borderRadius: "var(--r-card)", overflow: "hidden", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.28)" }}>
                <img src={f.img} alt="CIRCLE-Partner:in" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: f.pos }} />
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.05), transparent 42%, rgba(11,10,9,0.5))" }}></div>
                <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, borderRadius: "var(--r-inner)", background: "var(--glass-dark)", WebkitBackdropFilter: "blur(14px)", backdropFilter: "blur(14px)", boxShadow: "inset 0 0 0 1px var(--hairline-light)", padding: "12px 14px", color: "var(--text-inverse)" }}>
                  <div style={{ font: "500 20px/1 var(--font-display)", letterSpacing: "-0.02em" }}>{f.stat}<span style={{ font: "11px var(--font-mono)", marginLeft: 6, color: "var(--signal)" }}>↗</span></div>
                  <MkSpark pts={f.spark} />
                  <span className="u-label" style={{ fontSize: 8, color: "var(--text-inverse-muted)" }}>{f.sub}</span>
                </div>
              </div>
            </Fx>
          ))}
        </div>
      </div>
    </section>
  );
}
function SchritteMk() {
  const [sent, setSent] = React.useState(false);
  const mob = window.useMobile();
  const twoCol = { display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 12 };
  const feld = { font: "400 15px var(--font-display)", padding: "15px 17px", borderRadius: "var(--r-inner)", border: "none", outline: "none", background: "#FFFFFF", color: "var(--ink-2)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", width: "100%", fontFamily: "inherit" };
  const selFeld = { ...feld, appearance: "none", WebkitAppearance: "none", cursor: "pointer", paddingRight: 40, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235F5A54' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" };
  return (
    <section id="bewerben" data-track="chapter_view_09" data-screen-label="Bewerbung" className="u-grain" style={{ position: "relative", zIndex: 9, background: "var(--paper)", padding: mob ? "96px 6vw 120px" : "150px 7vw 185px", borderRadius: "28px 28px 0 0", marginTop: -28, boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)" }}>
      <GridLines />
      <Kap nr="09" label="Bewerben" />
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 0.9fr) minmax(0, 1.1fr)", gap: 16, position: "relative", alignItems: "start" }}>
        {/* Schritte */}
        <div style={{ borderRadius: "var(--r-card)", padding: "clamp(24px, 3vw, 34px)", background: "var(--surface-raised)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
          <div style={{ font: "500 22px/1.2 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Jetzt bewerben</div>
          {[["01", "Bewerbung", "Track-Record & Motivation — zwei Zeilen genügen.", false], ["02", "Gespräch", "Persönlich, auf Augenhöhe — inkl. aller Beteiligungsdetails.", true], ["03", "Onboarding", "Plattform, Projekte, Community — du startest nie bei null.", false]].map(([n, t2, p, human]) => (
            <div key={n} style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 14, padding: "18px 0", borderBottom: "1px solid var(--hairline-dark)", alignItems: "baseline" }}>
              <span style={{ font: "12px var(--font-mono)", color: "var(--signal-deep)" }}>{n}</span>
              <div>
                <div style={{ font: "500 16px var(--font-display)", color: "var(--ink)" }}>{t2}</div>
                <p style={{ margin: "5px 0 0", font: "400 13.5px/1.5 var(--font-display)", color: "var(--text-muted)" }}>{p}</p>
                {human && (
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
                    <span style={{ width: 40, height: 40, borderRadius: "50%", flex: "none", border: "1px dashed var(--hairline-dark)", background: "var(--paper-2)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "7px var(--font-mono)", letterSpacing: "0.06em", color: "var(--text-muted)" }}>FOTO</span>
                    <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)", lineHeight: 1.5 }}>[PLATZHALTER: wer das Gespräch führt — Name, Rolle]<br />Du sprichst mit einem Menschen, nicht mit einem Funnel.</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Formular */}
        <div style={{ borderRadius: "var(--r-card)", padding: "clamp(24px, 3vw, 34px)", background: "var(--surface-raised)", boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "26px 0" }} data-track="bewerbung_submit">
              <span style={{ display: "inline-flex", width: 60, height: 60, borderRadius: "50%", background: "var(--signal-soft)", color: "var(--signal-deep)", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m4 10.5 4 4 8-9"></path></svg>
              </span>
              <div style={{ font: "500 21px var(--font-display)", color: "var(--ink)", marginTop: 16 }}>Danke. Wir melden uns — persönlich.</div>
              <p style={{ margin: "8px 0 0", font: "400 14px var(--font-display)", color: "var(--text-muted)" }}>Antwort in 48 h.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ font: "500 22px/1.2 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: 6 }}>Deine Bewerbung</div>
              <div style={twoCol}>
                <input placeholder="Name" style={feld} />
                <input placeholder="E-Mail" style={feld} />
              </div>
              <div style={twoCol}>
                <select defaultValue="" style={selFeld}>
                  <option value="" disabled>Spezialisierung</option>
                  <option>Wohnimmobilien</option>
                  <option>Anlage / Zinshaus</option>
                  <option>Neubau / Projekte</option>
                  <option>Luxus / Penthouse</option>
                  <option>Gewerbe</option>
                </select>
                <select defaultValue="" style={selFeld}>
                  <option value="" disabled>Bisheriges Anstellungsverhältnis</option>
                  <option>Angestellt in Maklerbüro</option>
                  <option>Selbstständig / eigene Firma</option>
                  <option>Freier Handelsvertreter</option>
                  <option>Quereinstieg</option>
                </select>
              </div>
              <div style={twoCol}>
                <select defaultValue="" style={selFeld}>
                  <option value="" disabled>Provisionsumsatz / Jahr</option>
                  <option>Unter € 100K</option>
                  <option>€ 100K–150K</option>
                  <option>€ 150K–300K</option>
                  <option>Über € 300K</option>
                </select>
                <input placeholder="Fokus-Bezirke — z. B. 1020–1220" style={feld} />
              </div>
              <textarea placeholder="Was treibt dich persönlich an? — zwei Zeilen genügen." rows={3} style={{ ...feld, resize: "vertical" }}></textarea>              <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", marginTop: 6 }}>
                <Bm variant="signal" size="lg" knob onClick={() => setSent(true)}>Als CIRCLE Partner bewerben</Bm>
              </div>
              <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 10 }}>Persönliches Gespräch statt Auswahlverfahren · Antwort in 48 h</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ===== DEINE MARKE. DEIN ASSET — Personal Brand in Aktion ===== */
const MK_MARKETING = [
  { src: "../../assets/marketing/albrecht-print.png" },
  { src: "../../assets/marketing/ecoluxe-print.png" },
  { src: "../../assets/marketing/obenzwei-print.png" },
  { src: "../../assets/marketing/origins-print.png" },
  { src: "../../assets/marketing/beheim-print-1.png" },
  { src: "../../assets/marketing/beheim-print-2.png" },
];
const MK_MENSCHEN = [
  { src: "../../assets/marketing/albrecht-desk.jpg" },
  { src: "../../assets/team/community-duo.jpg" },
  { src: "../../assets/marketing/beheim-desk.jpg" },
  { src: "../../assets/team/community-spatenstich.jpg" },
  { src: "../../assets/marketing/albrecht-desk-2.jpg" },
  { src: "../../assets/team/portrait-05.jpg" },
  { src: "../../assets/marketing/obenzwei-phones.jpg" },
  { src: "../../assets/team/community-baustelle.jpg" },
  { src: "../../assets/team/portrait-01.jpg" },
  { src: "../../assets/team/community-dachfenster.jpg" },
];
function MkRow({ items, reverse, hov, dur }) {
  const [tip, setTip] = React.useState(-1);
  const mob = window.useMobile();
  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ display: "flex", gap: hov ? 30 : 16, width: "max-content", animation: BT_RM ? "none" : `bMarquee ${dur}s linear infinite`, animationDirection: reverse ? "reverse" : "normal", animationPlayState: hov ? "paused" : "running", transition: "gap .5s cubic-bezier(.32,.72,0,1)" }}>
        {items.concat(items).map((m, i) => (
          <div key={i} onMouseEnter={() => setTip(i)} onMouseLeave={() => setTip(-1)}
            style={{ flex: "none", width: mob ? "min(64vw, 260px)" : "clamp(300px, 30vw, 420px)", aspectRatio: "1 / 1", borderRadius: 14, overflow: "hidden", boxShadow: "inset 0 0 0 0.5px var(--hairline-dark)", padding: tip === i ? 10 : 0, background: "var(--paper-2)", transition: "padding .5s cubic-bezier(.32,.72,0,1)" }}>
            <img src={m.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: tip === i ? 8 : 0, transition: "border-radius .5s" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
function MarkeAssetMk() {
  const [mqHov, setMqHov] = React.useState(false);
  const mob = window.useMobile();
  const dur = 58;
  const stats = [["116.525", "Aufrufe · 1 Reel · 16 Sek."], ["4.391", "Follower organisch"], ["541", "Saves = warme Leads"], ["173", "Profil-Klicks aus 1 Reel"]];
  return (
    <section data-screen-label="Marke" className="u-grain" style={{ position: "relative", zIndex: 7, background: "var(--paper-2)", padding: mob ? "100px 6vw" : "175px 7vw", borderRadius: "28px 28px 0 0", marginTop: -28, boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)" }}>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 0.9fr) minmax(0, 1.1fr)", gap: mob ? 32 : 56, alignItems: "center" }}>
        <div>
          <span className="u-label" style={{ color: "var(--signal-deep)" }}>Personal Brand in Aktion</span>
          <h2 style={{ margin: "22px 0 0", font: `500 ${mob ? "clamp(29px, 7.8vw, 38px)" : "clamp(34px, 4.2vw, 68px)"}/1.05 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>
            Deine Marke.<br /><span style={{ color: "var(--signal)" }}>Dein Asset. Lebenslang.</span>
          </h2>
          <p style={{ margin: "24px 0 0", font: "400 16px/1.7 var(--font-display)", color: "var(--text-muted)", maxWidth: 440 }}>
            Ein Inhouse-Team produziert unter deinem Namen: 3 Kurzvideos, 10 Fotos und 2 Grafiken im Monat — inkl. deiner eigenen Personal-Brand-Website. Volle IP-Rechte ab Produktion. Verlässt du UNIO, nimmst du alles mit.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 28 }}>
            {["Markenstrategie", "Content-Produktion", "Funnel-Integration", "Deine Website"].map((c) => (
              <span key={c} className="u-label" style={{ fontSize: 10, padding: "8px 15px", borderRadius: "var(--r-pill)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}>{c}</span>
            ))}
          </div>
        </div>
        <div style={{ background: "#FFFFFF", borderRadius: "var(--r-panel)", padding: "26px 26px 22px", boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--ink)", color: "var(--paper)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 13px var(--font-display)", flex: "none" }}>LV</span>
            <div style={{ flex: 1 }}>
              <div style={{ font: "500 15px var(--font-display)", color: "var(--ink)" }}>@linda.vienna</div>
              <div className="u-label" style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 3 }}>Top-Maklerin im UNIO-Netzwerk · Wien</div>
            </div>
            <span className="u-label" style={{ fontSize: 9, color: "var(--signal-deep)", display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal)" }}></span>Live</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}>
            {stats.map(([v, k]) => (
              <div key={k} style={{ background: "var(--paper-2)", borderRadius: "var(--r-inner)", padding: "16px 18px" }}>
                <div style={{ font: "500 26px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--signal)" }}>{v}</div>
                <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 8 }}>{k}</div>
              </div>
            ))}
          </div>
          <p className="u-label" style={{ margin: "18px 0 0", fontSize: 9, color: "var(--text-muted)" }}>✳ Reichweite als Resultat eines Systems — kein Glücksfall.</p>
        </div>
      </div>
      {/* Zwei-Reihen-Bild-Marquee: oben Marketing (→), unten Menschen (←) */}
      <div style={{ marginTop: 96, display: "flex", flexDirection: "column", gap: 16 }}
        onMouseEnter={() => setMqHov(true)} onMouseLeave={() => setMqHov(false)}>
        <MkRow items={MK_MARKETING} reverse={false} hov={mqHov} dur={dur} />
        <MkRow items={MK_MENSCHEN} reverse={true} hov={mqHov} dur={dur} />
      </div>
    </section>
  );
}

/* ===== DER UNTERSCHIED — klassischer Makler vs. CIRCLE (clean, ohne Kachel) ===== */
const VERGLEICH = [
  ["Provisionsaufteilung", "Splits oft mit Gebühren oder Bedingungen", "Bis 100 %, unabhängig vom Umsatz"],
  ["Eigene Marke", "Bleibt meist außen vor", "UNIO baut deine Brand für dich auf"],
  ["Dealflow", "Zufällig, Portfolios bei Agenturen", "Kontinuierlich & kuratiert"],
  ["Infrastruktur", "Fragmentiert und veraltet", "Integrierte High-End-Plattform"],
  ["Unternehmenswert", "Kein Anteil am Wachstum", "Echte Unternehmensbeteiligung"],
  ["Passives Einkommen", "Keine Quellen", "Referral + Gewinn-Ausschüttung"],
];
function VergleichMk() {
  const mob = window.useMobile();
  return (
    <section data-screen-label="Vergleich" className="u-grain" style={{ position: "relative", zIndex: 9, background: "var(--paper)", padding: mob ? "100px 6vw" : "175px 7vw", borderRadius: "28px 28px 0 0", marginTop: -28, boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)" }}>
      <div style={{ textAlign: "center", maxWidth: 820, margin: mob ? "0 auto 44px" : "0 auto 80px" }}>
        <span className="u-label" style={{ color: "var(--signal-deep)" }}>Der Unterschied</span>
        <h2 style={{ margin: "22px 0 0", font: `500 ${mob ? "clamp(28px, 7.6vw, 36px)" : "clamp(34px, 4.2vw, 68px)"}/1.05 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>
          Der klassische Makler<br />vs. UNIO CIRCLE.
        </h2>
      </div>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {!mob && (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, 1fr)", gap: 24, padding: "0 0 16px", borderBottom: "1px solid var(--hairline-dark)" }}>
            <span></span>
            <span className="u-label" style={{ color: "var(--text-muted)", textAlign: "right" }}>Klassischer Makler</span>
            <span className="u-label" style={{ color: "var(--signal-deep)", textAlign: "right" }}>UNIO CIRCLE</span>
          </div>
        )}
        {VERGLEICH.map(([k, a, b], i) => (
          <Fx key={k} delay={i * 60}>
            {mob ? (
              <div style={{ padding: "22px 0", borderBottom: "1px solid var(--hairline-dark)" }}>
                <span style={{ font: "500 17px var(--font-display)", color: "var(--ink)", display: "block" }}>{k}</span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 12 }}>
                  <div>
                    <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5, display: "block", marginBottom: 6 }}>Klassisch</span>
                    <span style={{ font: "400 13.5px/1.5 var(--font-display)", color: "var(--text-muted)" }}>{a}</span>
                  </div>
                  <div>
                    <span className="u-label" style={{ color: "var(--signal-deep)", fontSize: 8.5, display: "block", marginBottom: 6 }}>UNIO CIRCLE</span>
                    <span style={{ font: "500 13.5px/1.5 var(--font-display)", color: "var(--signal-deep)", display: "inline-flex", gap: 6, alignItems: "baseline" }}>
                      <span aria-hidden="true" style={{ color: "var(--signal)" }}>✓</span>{b}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, 1fr)", gap: 24, padding: "26px 0", borderBottom: "1px solid var(--hairline-dark)", alignItems: "center" }}>
                <span style={{ font: "500 17px var(--font-display)", color: "var(--ink)" }}>{k}</span>
                <span style={{ font: "400 14.5px/1.5 var(--font-display)", color: "var(--text-muted)", textAlign: "right" }}>{a}</span>
                <span style={{ font: "500 14.5px/1.5 var(--font-display)", color: "var(--signal-deep)", textAlign: "right", display: "inline-flex", gap: 8, justifyContent: "flex-end", alignItems: "baseline" }}>
                  <span aria-hidden="true" style={{ color: "var(--signal)" }}>✓</span>{b}
                </span>
              </div>
            )}
          </Fx>
        ))}
      </div>
    </section>
  );
}

function FaqMk() {
  return (
    <window.FaqBlock
      nr="10" label="Fragen"
      title={<span>Was du<br />wissen willst.</span>}
      subline="Ehrliche Antworten — kein Kleingedrucktes."
      items={[
        ["Was kostet mich UNIO?", "Ein Software-Beitrag von € 599/Monat — dafür behältst du 85 % Provision ab dem ersten Deal und 100 % ab € 150k Track-Record. Keine versteckten Gebühren."],
        ["Behalte ich meine eigene Marke?", "Ja. Du trittst unter deinem eigenen Namen auf; UNIO liefert System, Software und Dealflow im Hintergrund, ohne sich vor deine Marke zu stellen."],
        ["Bin ich angestellt oder selbstständig?", "Du bleibst selbstständig und handelst auf eigene Rechnung — CIRCLE ist ein Netzwerk, kein Anstellungsverhältnis. [PLATZHALTER: rechtl. Konstruktion bestätigen]"],
        ["Wie funktioniert die Beteiligung?", "Top-Performer bekommen echte Unternehmensbeteiligung, die Community eine Gewinnbeteiligung — du baust also mit an dem, wovon du profitierst. [PLATZHALTER: Beteiligungsdetails]"],
        ["Muss ich meine Bestandskunden mitbringen?", "Nein. Deine Bestandskunden bleiben deine Sache — du kannst sie einbringen, musst aber nicht. Dealflow bekommst du ohnehin über das System."],
        ["Wie schnell bin ich startklar?", "Nach Bewerbung und Gespräch folgt ein kompaktes Onboarding auf Plattform, Projekte und Community — du startest nie bei null."],
        ["Für wen ist der CIRCLE nichts?", "Für alle, die nur einen Maklerpool suchen: CIRCLE ist kuratiert und auf Ownership ausgelegt — wer kein eigenes Geschäft aufbauen will, ist woanders besser aufgehoben."],
      ]}
      anchor={{ text: "Noch was offen? Schreib uns zwei Zeilen — echte Antwort von einem Menschen.", link: "Schreib uns", img: "../../assets/team/portrait-01.jpg" }}
    />
  );
}

/* ===== BENEFITS — Pipeline ohne Freiheitsverlust (drei Karten) ===== */
function BenefitsMk() {
  const cards = [
    ["Exklusiver Dealflow", "Das UNIO-Akquise Team holt für dich einen ständigen Projektflow. Exklusive, kuratierte Projekte und Einzelobjekte."],
    ["Bereits aufbereitete Projekte", "Alle Projekte werden vom UNIO Team aufbereitet und gepflegt. Marketingunterlagen werden erstellt und das Inhouse Marketing Team rückt das Projekt für dich ins richtige Licht."],
    ["Leadflow für UNIO Projekte", "Profitiere vom Inhouse Vertriebsteam von UNIO. Du bekommst bereits vorqualifizierte Leads und kannst dich ausschließlich auf den Verkauf konzentrieren."],
  ];
  const mob = window.useMobile();
  return (
    <section data-screen-label="Benefits" className="u-grain" style={{ position: "relative", zIndex: 6, background: "var(--paper)", padding: mob ? "100px 6vw" : "175px 7vw", borderRadius: "28px 28px 0 0", marginTop: -28, boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)" }}>
      <div style={{ textAlign: "center", maxWidth: 820, margin: mob ? "0 auto 48px" : "0 auto 88px" }}>
        <span className="u-label" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "8px 16px", borderRadius: "var(--r-pill)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", border: "2px solid var(--signal)", borderRightColor: "transparent", transform: "rotate(-45deg)" }}></span>Benefits
        </span>
        <h2 style={{ margin: "26px 0 0", font: `500 ${mob ? "clamp(27px, 7.4vw, 34px)" : "clamp(34px, 4.2vw, 68px)"}/1.08 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>
          Eine ständige Pipeline<br />ohne deine Freiheit zu verlieren.
        </h2>
        <p style={{ margin: "26px auto 0", font: `400 ${mob ? 15 : 17}px/1.7 var(--font-display)`, color: "var(--text-muted)", maxWidth: 560 }}>
          Alleine eine große Pipeline aufzubauen ist nahezu unmöglich: Beziehungen brauchen Zeit, Portfolios gehören oft großen Agenturen. UNIO öffnet den Zugang, damit dein Dealflow konstant bleibt und du unabhängig skalierst.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: mob ? 14 : 24 }}>
        {cards.map(([t, c], i) => (
          <Fx key={t} delay={i * 100}>
            <div style={{ background: "var(--surface-raised)", borderRadius: "var(--r-card)", padding: "34px 32px", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", minHeight: 200 }}>
              <div style={{ font: "500 22px/1.2 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{t}</div>
              <p style={{ margin: "16px 0 0", font: "400 14.5px/1.7 var(--font-display)", color: "var(--text-muted)" }}>{c}</p>
            </div>
          </Fx>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 64 }}>
        <Bm size="lg" variant="signal" knob onClick={() => (location.hash = "bewerben")}>Werde Teil der UNIO-Community</Bm>
      </div>
    </section>
  );
}

function App() {
  return (
    <div style={{ fontFamily: "var(--font-display)" }}>
      <SiteNav active="makler.html" cta={{ label: "Bewerben", onClick: () => (location.hash = "bewerben") }} />
      <HeroMk />
      <FragenMk />
      <AntwortMk />
      <window.SystemBento makler />
      <AdminMk />
      <BenefitsMk />
      <RechnerMk />
      <BeteiligungMk />
      <MarkeAssetMk />
      <BewegungMk />
      <SchritteMk />
      <VergleichMk />
      <FaqMk />
      <MkSticky />
      <SiteFooter />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
