/* UNIO Bauträger v3 — Bausteine: Kapitel-Marker, Grid-Hairlines, Sticky-CTA,
   Kapitel 04 (Pipeline-Linie) + 05 (Lernkurve, gepinnt). Korrektur-Briefing 04.07. */
const { GlassPanel: GPsys, Button: Bsys } = window.UNIODesignSystem_b6216a;

const BT_EASE = "var(--ease-unio)";
const BT_RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Einmaliger IntersectionObserver-Trigger */
function useOnceInView(threshold = 0.3) {
  const ref = React.useRef(null);
  const [inView, setIn] = React.useState(BT_RM);
  React.useEffect(() => {
    if (BT_RM) return;
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { setIn(true); io.disconnect(); }
    }, { threshold });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* Count-up (900 ms, Ease-Out) */
function CountUp({ to, run, dur = 900, fmt }) {
  const [v, setV] = React.useState(BT_RM ? to : 0);
  React.useEffect(() => {
    if (!run || BT_RM) return;
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      setV(Math.round(to * e));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, dur]);
  return <span>{fmt ? fmt(v) : v}</span>;
}

/* Reversibler Scroll-Trigger: blendet beim Rein- UND Rausscrollen (vor & zurück) */
function Fx({ children, delay = 0, y = 26, style }) {
  const ref = React.useRef(null);
  const [on, setOn] = React.useState(BT_RM);
  React.useEffect(() => {
    if (BT_RM) return;
    const io = new IntersectionObserver((es) => setOn(es[0].isIntersecting), { threshold: 0.18 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : `translateY(${y}px)`, transition: `opacity 700ms ${BT_EASE} ${delay}ms, transform 700ms ${BT_EASE} ${delay}ms`, ...style }}>{children}</div>
  );
}

/* Kapitel-Marker (RIVVA): Mono + vertikale Hairline am Sektionsrand */
function Kap({ nr, label, dark }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "2.4vw", top: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, zIndex: 3 }}>
      <span style={{ width: 1, height: 46, background: dark ? "var(--hairline-light)" : "var(--hairline-dark)" }}></span>
      <span className="u-label" style={{ writingMode: "vertical-rl", fontSize: 9, letterSpacing: "0.18em", color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)" }}>{nr} — {label}</span>
    </div>
  );
}

/* Vertikale Grid-Hairlines (helle Sektionen) */
function GridLines() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {[25, 50, 75].map((p) => (
        <span key={p} style={{ position: "absolute", left: p + "%", top: 0, bottom: 0, width: 1, background: "rgba(11,10,9,0.05)" }}></span>
      ))}
    </div>
  );
}

/* Sticky Micro-CTA: Glas-Pill ab 50 % Scrolltiefe, Desktop, nicht am Funnel */
function StickyCTA() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const on = () => {
      const max = document.body.scrollHeight - innerHeight;
      const p = max > 0 ? scrollY / max : 0;
      setShow(innerWidth >= 900 && p > 0.5 && p < 0.93);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, []);
  return (
    <a href="#funnel" data-track="sticky_cta" style={{
      position: "fixed", right: 20, bottom: 20, zIndex: 70, height: 44,
      display: "inline-flex", alignItems: "center", gap: 10, padding: "0 20px",
      borderRadius: "var(--r-pill)", textDecoration: "none",
      background: "var(--glass-dark-2)", WebkitBackdropFilter: "blur(18px)", backdropFilter: "blur(18px)",
      boxShadow: "inset 0 0 0 1px var(--hairline-light), var(--shadow-float)",
      color: "var(--text-inverse)", font: "500 14px var(--font-display)",
      opacity: show ? 1 : 0, transform: show ? "none" : "translateY(14px)",
      pointerEvents: show ? "auto" : "none",
      transition: `all var(--dur-fast) ${BT_EASE}`,
    }}>Projekt prüfen <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>→</span></a>
  );
}

/* ===== Kapitel 04 — DAS SYSTEM: Pipeline-Linie mit vier Erklär-Animationen ===== */

function St1Chips({ run }) {
  const chips = ["Preisband", "Grundrisse", "Zielgruppen", "Milieus"];
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {chips.map((c, i) => (
        <span key={c} style={{
          font: "500 13px var(--font-display)", padding: "8px 14px", borderRadius: "var(--r-pill)",
          color: "var(--ink-2)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", background: "#FFFFFF",
          display: "inline-flex", alignItems: "center", gap: 8,
          opacity: run ? 1 : 0, transform: run ? "scale(1)" : "scale(0.88)",
          transition: `all 600ms ${BT_EASE} ${i * 110}ms`,
        }}>
          {c}
          <span style={{
            width: 15, height: 15, borderRadius: "50%", background: "var(--signal)", color: "#fff",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            transform: run ? "scale(1)" : "scale(0)", transition: `transform 400ms ${BT_EASE} ${500 + i * 110}ms`,
          }}>
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m1.5 5.5 2.5 2.5 4.5-6"></path></svg>
          </span>
        </span>
      ))}
    </div>
  );
}

function St2Funnel({ run }) {
  const rows = [["Leads", 1], ["Qualifiziert", 0.62], ["Besichtigung", 0.34], ["Kauf", 0.16]];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9, maxWidth: 360 }}>
      {rows.map(([n, w], i) => (
        <div key={n} style={{ display: "grid", gridTemplateColumns: "104px 1fr", gap: 12, alignItems: "center" }}>
          <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 9 }}>{n}</span>
          <div style={{ height: 8, borderRadius: 4, background: "rgba(11,10,9,0.08)", overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 4, width: run ? w * 100 + "%" : "3%", background: i === rows.length - 1 ? "var(--signal)" : "var(--ink-3)", transition: `width 900ms ${BT_EASE} ${i * 120}ms` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function St3Matching({ run }) {
  const L = [22, 58, 94, 130], R = [30, 66, 102];
  return (
    <svg viewBox="0 0 320 152" style={{ width: "100%", maxWidth: 360, height: "auto" }} aria-hidden="true">
      {[["M20 22 L300 66", 0], ["M20 94 L300 30", 1], ["M20 130 L300 102", 2]].map(([d, i]) => (
        <path key={d} d={d} stroke="rgba(11,10,9,0.16)" strokeWidth="1" fill="none" pathLength="1"
          strokeDasharray="1" strokeDashoffset={run ? 0 : 1} style={{ transition: `stroke-dashoffset 900ms ${BT_EASE} ${i * 140}ms` }} />
      ))}
      <path d="M20 58 L300 66" stroke="var(--signal)" strokeWidth="1.5" fill="none" pathLength="1"
        strokeDasharray="1" strokeDashoffset={run ? 0 : 1} style={{ transition: `stroke-dashoffset 1000ms ${BT_EASE} 500ms` }} />
      {L.map((y, i) => (
        <circle key={"l" + y} cx="20" cy={y} r="5" fill={y === 58 ? "var(--signal)" : "rgba(11,10,9,0.3)"}
          style={{ opacity: run ? 1 : 0, transition: `opacity 400ms ${BT_EASE} ${i * 90}ms` }} />
      ))}
      {R.map((y, i) => (
        <circle key={"r" + y} cx="300" cy={y} r="5" fill={y === 66 ? "var(--signal)" : "rgba(11,10,9,0.3)"}
          style={{ opacity: run ? 1 : 0, transition: `opacity 400ms ${BT_EASE} ${200 + i * 90}ms` }} />
      ))}
      <text x="14" y="150" fill="rgba(11,10,9,0.5)" style={{ font: "9px var(--font-mono)", letterSpacing: "0.14em" }}>EINHEITEN</text>
      <text x="236" y="150" fill="rgba(11,10,9,0.5)" style={{ font: "9px var(--font-mono)", letterSpacing: "0.14em" }}>KÄUFERPROFILE</text>
    </svg>
  );
}

function St4Lens({ run }) {
  return (
    <div style={{ maxWidth: 360, borderRadius: 14, overflow: "hidden", boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)", background: "var(--paper)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 12px", background: "var(--paper-2)", borderBottom: "1px solid var(--hairline-dark)" }}>
        {[0, 1, 2].map((k) => <span key={k} style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--paper-3)" }}></span>)}
        <span style={{ marginLeft: 8, font: "10px var(--font-mono)", color: "var(--text-muted)" }}>app.unio.at</span>
        <span className="u-label" style={{ marginLeft: "auto", fontSize: 8, color: "var(--signal-deep)", display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)" }}></span>Anfragen · live
        </span>
      </div>
      <div style={{ padding: "14px 12px 12px" }}>
        <svg viewBox="0 0 300 90" style={{ width: "100%", height: "auto" }} aria-hidden="true">
          <path d="M6 76 L48 66 L90 70 L132 52 L174 56 L216 34 L258 26 L294 12"
            stroke="var(--signal)" strokeWidth="1.5" fill="none" pathLength="1"
            strokeDasharray="1" strokeDashoffset={run ? 0 : 1} style={{ transition: `stroke-dashoffset 1300ms ${BT_EASE} 200ms` }} />
          {[76, 52, 26].map((y, i) => (
            <circle key={y} cx={[6, 132, 258][i]} cy={y} r="3" fill="var(--signal)"
              style={{ opacity: run ? 1 : 0, transition: `opacity 350ms ${BT_EASE} ${400 + i * 260}ms` }} />
          ))}
        </svg>
      </div>
    </div>
  );
}

const BT_STATIONEN = [
  { mod: "NOVA", t: "Markttest, bevor gebaut wird", p: "Preisband, Grundrisse und Zielgruppen werden am echten Markt validiert — jede Projektentscheidung mit Beleg.", A: St1Chips },
  { mod: "LEAD ENGINE", t: "Nachfrage mit Substanz", p: "Kampagnen mit sauberem Tracking und Qualifizierung — aus Reichweite wird planbare Nachfrage.", A: St2Funnel },
  { mod: "CIRCLE", t: "Passende Käufer zuerst", p: "Einheiten und Käuferprofile finden zueinander, bevor das Inserat live ist — kuratierte Makler schließen ab.", A: St3Matching },
  { mod: "LENS", t: "Steuerung in Echtzeit", p: "Jeder Schritt live im Dashboard — was gelernt wird, fließt vorne wieder ein.", A: St4Lens },
];

function SystemLine() {
  const secRef = React.useRef(null);
  const [p, setP] = React.useState(BT_RM ? 1 : 0);
  React.useEffect(() => {
    if (BT_RM) return;
    const on = () => {
      const el = secRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(Math.max(0, Math.min(1, (innerHeight * 0.75 - r.top) / r.height)));
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <section ref={secRef} id="system" data-track="chapter_view_04" data-screen-label="System" className="u-grain" style={{ position: "relative", background: "var(--paper)", padding: "185px 7vw 185px" }}>
      <GridLines />
      <Kap nr="04" label="System" />
      <div style={{ maxWidth: 620, position: "relative" }}>
        <Fx>
          <h2 style={{ margin: 0, font: "500 clamp(34px, 3.6vw, 60px)/1.02 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>
            Ein System.<br />Vier Stationen.
          </h2>
        </Fx>
      </div>
      <div style={{ position: "relative", marginTop: 120 }}>
        {/* durchgehende, scrollgetriebene Linie */}
        <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(11,10,9,0.12)" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: (p * 100) + "%", background: "var(--signal)" }}></div>
        </div>
        {BT_STATIONEN.map((s, i) => {
          const [ref, run] = useOnceInView(0.4);
          const left = i % 2 === 0;
          return (
            <div key={s.mod} ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 60px", padding: "80px 0", position: "relative" }}>
              <span aria-hidden="true" style={{ position: "absolute", left: "50%", top: 94, transform: "translateX(-50%)", width: 11, height: 11, borderRadius: "50%", background: run ? "var(--signal)" : "var(--paper-3)", boxShadow: run ? "0 0 0 5px var(--signal-soft)" : "inset 0 0 0 1px var(--hairline-dark)", transition: `all 500ms ${BT_EASE}` }}></span>
              <div style={{ gridColumn: left ? 1 : 2, gridRow: 1, textAlign: left ? "right" : "left", paddingRight: left ? 44 : 0, paddingLeft: left ? 0 : 44 }}>
                <span style={{ font: "11px var(--font-mono)", letterSpacing: "0.18em", color: "var(--signal-deep)" }}>{s.mod}</span>
                <h3 style={{ margin: "12px 0 0", font: "500 24px/1.15 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{s.t}</h3>
                <p style={{ margin: "10px 0 0", font: "400 14.5px/1.6 var(--font-display)", color: "var(--text-muted)", maxWidth: 380, marginLeft: left ? "auto" : 0 }}>{s.p}</p>
              </div>
              <div style={{ gridColumn: left ? 2 : 1, gridRow: 1, paddingLeft: left ? 44 : 0, paddingRight: left ? 0 : 44, display: "flex", justifyContent: left ? "flex-start" : "flex-end", alignItems: "center" }}>
                <s.A run={run} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ===== Kapitel 05 — DIE LERNKURVE: ein wachsendes LENS-Panel (gepinnt) ===== */
const LK_STAGES = [
  { tag: 30, t: "Kampagnen kalibrieren", rows: ["Erste Leads · Basisqualität", "Zielgruppen-Hypothesen im Test"] },
  { tag: 90, t: "Lead-Qualität steigt", rows: ["Cost/Lead sinkt messbar", "Makler-Feedback schärft das Targeting"] },
  { tag: 180, t: "Steuerbarer Abverkauf", rows: ["Lead-Volumen × Qualität planbar", "Zielgruppen-Treffsicherheit validiert"] },
];
const LK_BARS = [3, 4, 3, 5, 6, 5, 7, 6, 8, 9, 8, 10, 11, 12];

function Lernkurve() {
  const secRef = React.useRef(null);
  const [p, setP] = React.useState(BT_RM ? 1 : 0);
  React.useEffect(() => {
    if (BT_RM) return;
    const on = () => {
      const el = secRef.current;
      if (!el) return;
      setP(Math.max(0, Math.min(1, (scrollY - el.offsetTop) / (el.offsetHeight - innerHeight))));
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  const stage = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
  const barsOn = [5, 10, 14][stage];
  return (
    <section ref={secRef} data-track="chapter_view_05" data-screen-label="Lernkurve" style={{ height: "250vh", position: "relative", background: "var(--signal)" }}>
      <div className="u-grain" style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 7vw" }}>
        <Kap nr="05" label="Lernkurve" dark />
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr) 56px", gap: "clamp(28px, 4vw, 64px)", alignItems: "center" }}>
          <div>
            <span className="u-label" style={{ color: "rgba(255,245,239,0.85)" }}>Ein Dashboard, das voller wird</span>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginTop: 14 }}>
              <span style={{ font: "500 clamp(80px, 9vw, 150px)/0.86 var(--font-display)", letterSpacing: "-0.05em", color: "transparent", WebkitTextStroke: "1.5px rgba(255,245,239,0.7)" }}>{String(LK_STAGES[stage].tag).padStart(3, "0").slice(0, -2)}</span>
              <span style={{ font: "500 clamp(80px, 9vw, 150px)/0.86 var(--font-display)", letterSpacing: "-0.05em", color: "#FFFFFF" }}>{String(LK_STAGES[stage].tag).padStart(3, "0").slice(-2)}</span>
              <span style={{ font: "500 clamp(20px, 2.2vw, 34px) var(--font-display)", letterSpacing: "-0.02em", color: "#FFFFFF", paddingBottom: "0.18em", marginLeft: 6 }}>Tage</span>
            </div>
            <h2 style={{ margin: "18px 0 0", font: "500 clamp(26px, 2.6vw, 42px)/1.05 var(--font-display)", letterSpacing: "-0.03em", color: "#FFFFFF" }}>
              {LK_STAGES[stage].t}.
            </h2>
            <p style={{ margin: "16px 0 0", font: "400 16px/1.6 var(--font-display)", color: "rgba(255,245,239,0.92)", maxWidth: 380 }}>
              Jede Kampagnen-Runde und jedes Makler-Feedback macht die Leads besser und die Zielgruppen schärfer.
            </p>
          </div>
          {/* Das EINE Panel */}
          <div style={{ borderRadius: 16, overflow: "hidden", background: "var(--paper)", boxShadow: "0 34px 80px -28px rgba(120,40,4,0.55)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 14px", background: "var(--paper-2)", borderBottom: "1px solid var(--hairline-dark)" }}>
              {[0, 1, 2].map((k) => <span key={k} style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--paper-3)" }}></span>)}
              <span style={{ marginLeft: 8, font: "11px var(--font-mono)", color: "var(--text-muted)" }}>LENS · Performance</span>
              <span className="u-label" style={{ marginLeft: "auto", fontSize: 9, color: "var(--signal-deep)" }}>Tag {LK_STAGES[stage].tag}</span>
            </div>
            <div style={{ padding: "18px 18px 16px" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 64 }}>
                {LK_BARS.map((v, i) => (
                  <span key={i} style={{ flex: 1, maxWidth: 10, borderRadius: 99, height: (v / 12) * 100 + "%", background: i < barsOn ? (i === barsOn - 1 ? "var(--signal)" : "rgba(11,10,9,0.22)") : "rgba(11,10,9,0.07)", transition: `background 400ms ${BT_EASE}` }}></span>
                ))}
              </div>
              <div style={{ marginTop: 16, borderTop: "1px solid var(--hairline-dark)" }}>
                {LK_STAGES.map((st, si) => (
                  <div key={st.tag} style={{ opacity: stage >= si ? 1 : 0.18, transform: stage >= si ? "none" : "translateY(6px)", transition: `all 600ms ${BT_EASE}` }}>
                    {st.rows.map((r) => (
                      <div key={r} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: "1px solid var(--hairline-dark)" }}>
                        <span style={{ font: "400 13.5px var(--font-display)", color: "var(--ink-2)" }}>{r}</span>
                        <span className="u-label" style={{ fontSize: 9, color: stage >= si ? "var(--signal-deep)" : "var(--text-muted)" }}>Tag {st.tag}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Tag-Skala (Lineal) */}
          <div aria-hidden="true" style={{ position: "relative", height: 320, alignSelf: "center" }}>
            <div style={{ position: "absolute", right: 26, top: 0, bottom: 0, width: 1, borderLeft: "1px solid rgba(255,255,255,0.45)", background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.55) 0 1px, transparent 1px 20px)", backgroundSize: "8px 100%", backgroundRepeat: "no-repeat" }}></div>
            <span style={{ position: "absolute", right: 22, top: `calc(${p * 100}% - 9px)`, width: 18, height: 2.5, borderRadius: 99, background: "var(--ink)", transition: BT_RM ? "none" : "top 120ms linear" }}></span>
            {[["30", 20], ["90", 52], ["180", 88]].map(([d, y]) => (
              <span key={d} style={{ position: "absolute", right: 0, top: y + "%", font: "10px var(--font-mono)", color: "rgba(255,245,239,0.9)" }}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { BT: { useOnceInView, CountUp, Fx, Kap, GridLines, StickyCTA, SystemLine, Lernkurve, BT_EASE, BT_RM } });
