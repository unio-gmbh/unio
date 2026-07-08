/* UNIO — Referenz-Strecke (Bauträger) · exakte Portierung von unio-referenz-sequenz_3.html
   Phasen: 0–56 % Horizontalfahrt (P0–P4) · 56–66 % HALT · 66–78 % Marquee-Panel steigt
   von unten · 78–100 % Finale (Zeilen verdichten sich → CTA → Licht-Panel).
   Mobile: Pin bleibt, eigene Größenlogik. prefers-reduced-motion: vertikale Abfolge. */
const { Button: Bsq } = window.UNIODesignSystem_b6216a;

const SEQ_NAMES = ["Ecoluxe", "Origins", "Albrecht", "ObenZwei", "Das Beheim", "Das Wimmer", "Jardin Hermes"];
const SEQ_CLAIM = "Echte Deals durch echte Daten";
const sqClamp = (v, a, b) => Math.max(a, Math.min(b, v));
const sstep = (t) => { t = sqClamp(t, 0, 1); return t * t * (3 - 2 * t); };
const CREAM = "#F3F0EA";
const seqMono = { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#98928A" };

const SQ_IMG = "../../assets/img/", SQ_PH = "../../assets/photos/";
const SEQ_ROW_A = {
  top: [["../../assets/marketing/ecoluxe-print.png", 20], [SQ_IMG + "ecoluxe-wide.jpg", 30], ["../../assets/marketing/ecoluxe-unterlagen.png", 17]],
  low: [[SQ_IMG + "ecoluxe.jpg", 16], [SQ_PH + "hufhaus-pool-abend.jpg", 26]],
};
const SEQ_ROW_B = {
  top: [["../../assets/marketing/albrecht-print.png", 20], [SQ_IMG + "albrecht.jpg", 30], ["../../assets/marketing/albrecht-unterlagen.png", 17]],
  low: [[SQ_IMG + "beheim.jpg", 16], [SQ_IMG + "albrecht-dusk.jpg", 26]],
};

function SeqTile({ src, w, mobile }) {
  return (
    <div style={{ border: "1.5px solid var(--ink)", background: CREAM, padding: "clamp(4px, 0.55vw, 9px)", flexShrink: 0 }}>
      <img src={src} alt="" loading="lazy" style={{ display: "block", width: (mobile ? w * 1.9 : w) + "vw", height: "auto", filter: "saturate(0.92)" }} />
    </div>
  );
}

function SeqHl({ ghost, px, children, mobile }) {
  return (
    <div data-px={px} style={{
      font: `700 clamp(46px, ${mobile ? "13vw" : "9.5vw"}, 150px)/0.98 var(--font-display)`, letterSpacing: "-0.04em", willChange: "transform",
      color: ghost ? "transparent" : "var(--ink)", WebkitTextStroke: ghost ? "1.5px var(--ink)" : "0",
    }}>{children}</div>
  );
}

function SeqHead({ name, sup, dat, desc, side, final, mobile }) {
  return (
    <div data-panel="1" style={{ height: "100%", flexShrink: 0, position: "relative", width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 7vw", alignItems: final ? "center" : "flex-start", textAlign: final ? "center" : "left" }}>
      <div data-px="1.05" aria-hidden="true" style={{ position: "absolute", left: final ? "50%" : "10vw", top: mobile ? "10vh" : "14vh", marginLeft: final ? "-42vw" : 0, font: "700 clamp(64px, 13vw, 200px)/1 var(--font-display)", letterSpacing: "-0.04em", color: "transparent", WebkitTextStroke: "1.2px rgba(11,10,9,0.16)", willChange: "transform", whiteSpace: "nowrap" }}>{name}</div>
      <div data-px={final ? "1.18" : "1.2"} style={{ font: "700 clamp(46px, 10vw, 158px)/0.96 var(--font-display)", letterSpacing: "-0.04em", willChange: "transform", position: "relative", zIndex: 2, color: "var(--ink)" }}>
        {name}<sup style={{ fontFamily: "var(--font-mono)", fontSize: "0.15em", fontWeight: 500, letterSpacing: "0.2em", color: "var(--signal)" }}>{sup}</sup>
      </div>
      <div data-px="0.94" style={{ display: "flex", gap: "2.6em", marginTop: "4vh", willChange: "transform", flexWrap: "wrap", justifyContent: final ? "center" : "flex-start", ...seqMono }}>
        {dat.map(([b, s]) => (
          <div key={s}>
            <b style={{ display: "block", font: "700 clamp(18px, 2.3vw, 32px)/1.1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{b}</b>
            <span style={{ display: "block", marginTop: 6 }}>{s}</span>
          </div>
        ))}
      </div>
      <p data-px="0.94" style={{ maxWidth: 420, margin: final ? "3.5vh auto 0" : "3.5vh 0 0", font: "400 15px/1.55 var(--font-display)", color: "#5F5A54", willChange: "transform" }}>{desc}</p>
      {side && !mobile && (
        <div data-px="1.12" data-side="1" style={{ position: "absolute", right: "-6vw", top: "50%", transform: "translateY(-50%)", border: "1.5px solid var(--ink)", background: CREAM, padding: 7, width: "20vw", willChange: "transform", zIndex: 1 }}>
          <img src={side} alt="" style={{ display: "block", width: "100%", filter: "saturate(0.9)" }} />
        </div>
      )}
    </div>
  );
}

function SeqMqRow({ rowIdx, claim, registerRef }) {
  const mkSet = (k) => (
    <div key={k} className="set" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
      {claim
        ? Array.from({ length: 4 }).map((_, i) => (
            <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 1.1vw, 13px)", letterSpacing: "0.34em", textTransform: "uppercase", color: "rgba(243,240,234,0.5)", padding: "12px 0.9em", borderTop: "1px solid rgba(243,240,234,0.12)", borderBottom: "1px solid rgba(243,240,234,0.12)", whiteSpace: "nowrap" }}>{SEQ_CLAIM + "  ▲"}</span>
          ))
        : SEQ_NAMES.map((_, i) => (
            <React.Fragment key={i}>
              <span style={{ font: "700 clamp(42px, 8.5vw, 124px)/1 var(--font-display)", letterSpacing: "-0.035em", padding: "0 0.32em", whiteSpace: "nowrap", color: (i + rowIdx) % 2 === 0 ? CREAM : "transparent", WebkitTextStroke: (i + rowIdx) % 2 === 0 ? "0" : "1.5px rgba(243,240,234,0.8)" }}>
                {SEQ_NAMES[(i + rowIdx * 2) % SEQ_NAMES.length]}
              </span>
              <i aria-hidden="true" style={{ width: "clamp(8px, 1.1vw, 16px)", height: "clamp(8px, 1.1vw, 16px)", flexShrink: 0, clipPath: "polygon(50% 100%, 0 0, 100% 0)", background: "var(--ink)" }}></i>
            </React.Fragment>
          ))}
    </div>
  );
  return (
    <div ref={registerRef} style={{ whiteSpace: "nowrap", display: "flex", alignItems: "center", willChange: "transform, opacity", padding: "clamp(3px, 0.9vh, 10px) 0" }}>
      {[0, 1, 2].map(mkSet)}
    </div>
  );
}

const SEQ_MQ_CFG = [[1, 1, false], [-1, 0.75, false], [1, 0.45, true], [-1, 0.9, false], [1, 0.65, false]];

function SeqPinned({ mobile }) {
  const seqRef = React.useRef(null), trackRef = React.useRef(null), railRef = React.useRef(null),
    panelRef = React.useRef(null), ctaRef = React.useRef(null), lpRef = React.useRef(null);
  const mqEls = React.useRef([]);

  React.useEffect(() => {
    const seq = seqRef.current, track = trackRef.current, rail = railRef.current,
      panel = panelRef.current, ctaEl = ctaRef.current, lp = lpRef.current;
    if (!seq || !track) return;
    const layers = [...seq.querySelectorAll("[data-px]")].map((el) => ({ el, f: +el.dataset.px, panel: el.closest("[data-panel]") }));
    const mqs = SEQ_MQ_CFG.map(([dir, speed], i) => ({ el: mqEls.current[i], dir, speed, x: 0, w: 0 }));
    const measure = () => mqs.forEach((m) => { if (m.el && m.el.firstChild) m.w = m.el.firstChild.getBoundingClientRect().width; });
    measure();
    addEventListener("resize", measure);
    let lastY = scrollY, vel = 0;
    const onScroll = () => { vel += (scrollY - lastY) * 0.07; lastY = scrollY; };
    addEventListener("scroll", onScroll, { passive: true });

    const T_END = 0.56, RISE_START = 0.66, RISE_END = 0.78;
    let raf, last = performance.now();
    const tick = (now) => {
      const dt = Math.min(50, now - last) / 16.6; last = now; vel *= 0.92;
      const r = seq.getBoundingClientRect();
      const p = sqClamp(-r.top / (r.height - innerHeight), 0, 1);
      const vw = innerWidth;
      const travel = track.scrollWidth - vw;
      const X = travel * sstep(p / T_END);
      track.style.transform = "translate3d(" + -X + "px,0,0)";
      if (rail) rail.style.width = p * 100 + "%";

      layers.forEach((l) => {
        try {
          if (!l.panel) return;
          const off = l.panel.offsetLeft + l.panel.offsetWidth / 2 - X - vw / 2;
          l.el.style.transform = "translate3d(" + off * (l.f - 1) + "px,0,0)" + (l.el.dataset.side ? " translateY(-50%)" : "");
        } catch (e) { /* Layer nie die Fahrt blockieren lassen */ }
      });

      const rise = sstep((p - RISE_START) / (RISE_END - RISE_START));
      panel.style.transform = "translateY(" + (101 - 101 * rise) + "%)";
      const baseRad = vw < 900 ? 20 : 28;
      const rad = baseRad * (1 - sstep((rise - 0.75) / 0.25));
      panel.style.borderRadius = rad + "px " + rad + "px 0 0";

      const fp = sqClamp((p - RISE_END) / (1 - RISE_END), 0, 1);
      const conv = sstep((fp - 0.28) / 0.34);
      const mid = (mqs.length - 1) / 2;
      mqs.forEach((m, i) => {
        if (!m.el) return;
        m.x += m.dir * (0.55 + vel) * m.speed * dt;
        if (m.w > 0) m.x = ((m.x % m.w) + m.w) % m.w;
        const ty = -(i - mid) * conv * (m.el.offsetHeight + 2) * 0.92;
        m.el.style.transform = "translate3d(" + -m.x + "px," + ty + "px,0)";
        m.el.style.opacity = String(1 - conv * (i === Math.round(mid) ? 0.9 : 1));
      });
      if (ctaEl) ctaEl.style.opacity = String(sstep((fp - 0.42) / 0.2));
      if (lp) lp.style.transform = "translateY(" + (101 - 101 * sstep((fp - 0.68) / 0.28)) + "%)";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", onScroll); removeEventListener("resize", measure); };
  }, [mobile]);

  const pimgStyle = (low) => ({
    height: "100%", flexShrink: 0, position: "relative",
    width: mobile ? "170vw" : "118vw", display: "flex", flexDirection: "column", justifyContent: "center",
    gap: mobile ? "2.6vh" : "3.5vh", padding: mobile ? "0 4vw" : "0 5vw",
  });
  const rowStyle = (low) => ({
    display: "flex", gap: mobile ? "3vw" : "2.2vw", alignItems: low ? "flex-start" : "flex-end",
    paddingLeft: low ? (mobile ? "12vw" : "9vw") : 0, willChange: "transform",
  });

  return (
    <section ref={seqRef} data-screen-label="Referenz-Strecke" style={{ height: mobile ? "820vh" : "780vh", position: "relative", background: "var(--paper)" }}>
      <div style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden" }}>
        <div ref={trackRef} style={{ position: "absolute", top: 0, left: 0, height: "100%", display: "flex", willChange: "transform" }}>
          {/* P0 — Auftakt */}
          <div data-panel="1" style={{ height: "100%", flexShrink: 0, position: "relative", width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 7vw" }}>
            <div style={{ ...seqMono, marginBottom: "3.5vh" }}>Referenzen · Wien 2024–2026</div>
            <SeqHl px="1.14" mobile={mobile}>Nicht inseriert.</SeqHl>
            <SeqHl px="0.92" ghost mobile={mobile}>Inszeniert.</SeqHl>
            <div style={{ marginTop: "3vh", maxWidth: 560 }}>
              <div style={{ ...seqMono, color: "var(--signal-deep)", marginBottom: 14 }}>Brand & Launch System</div>
              <p style={{ margin: 0, font: "400 clamp(15px, 1.5vw, 19px)/1.6 var(--font-display)", color: "var(--text-muted)" }}>
                High-end Positionierung, Projektstory und eine digitale Präsenz auf Premium-Niveau — inklusive Homepage, Landingpages, Funnel und sämtlicher Vermarktungsunterlagen.
              </p>
            </div>
            <div style={{ position: "absolute", right: "6vw", bottom: "7vh", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ ...seqMono, color: "var(--ink)" }}>Scroll</span>
              <i style={{ display: "block", width: mobile ? 38 : 56, height: 1.5, background: "var(--ink)" }}></i>
            </div>
          </div>
          {/* P1 — Bildwand Ecoluxe (zwei versetzte Reihen) */}
          <div data-panel="1" style={pimgStyle(false)}>
            <div data-px="0.93" style={rowStyle(false)}>
              {SEQ_ROW_A.top.map(([src, w]) => <SeqTile key={src + w} src={src} w={w} mobile={mobile} />)}
            </div>
            <div data-px="1.07" style={rowStyle(true)}>
              {SEQ_ROW_A.low.map(([src, w]) => <SeqTile key={src + w} src={src} w={w} mobile={mobile} />)}
            </div>
          </div>
          {/* P2 — Ecoluxe */}
          <SeqHead
            name="Ecoluxe" sup="/25" mobile={mobile}
            dat={[["282", "Anfragen"], ["+31 %", "über Zielpreis"], ["Wien", "Wohnbau · Neubau"]]}
            desc="Live am Markt getestet, positioniert und über dem Zielpreis abverkauft — bevor klassische Vermarktung überhaupt gestartet wäre."
            side={SQ_IMG + "vienna-garden.jpg"}
          />
          {/* P3 — Bildwand Albrecht (zwei versetzte Reihen) */}
          <div data-panel="1" style={pimgStyle(true)}>
            <div data-px="1.07" style={rowStyle(true)}>
              {SEQ_ROW_B.low.map(([src, w]) => <SeqTile key={src + w} src={src} w={w} mobile={mobile} />)}
            </div>
            <div data-px="0.93" style={rowStyle(false)}>
              {SEQ_ROW_B.top.map(([src, w]) => <SeqTile key={src + w} src={src} w={w} mobile={mobile} />)}
            </div>
          </div>
          {/* P4 — Albrecht, zentrierte Schluss-Komposition */}
          <SeqHead
            final name="Albrecht" sup="/26" mobile={mobile}
            dat={[["61", "Anfragen · 2 Wochen"], ["Live", "Pipeline in LENS"], ["Wien", "Bestand · Revitalisierung"]]}
            desc="Vom ersten Test bis zur Besichtigung in einem System — jede Anfrage nachvollziehbar, jeder Schritt steuerbar."
          />
        </div>

        {/* Marquee-Panel (steigt von unten) */}
        <div ref={panelRef} style={{ position: "absolute", inset: 0, background: "var(--signal)", zIndex: 10, transform: "translateY(101%)", willChange: "transform", borderRadius: "28px 28px 0 0", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", boxShadow: "0 -30px 80px -30px rgba(11,10,9,0.5)" }}>
          <div aria-hidden="true" style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "9vw", zIndex: 5, pointerEvents: "none", background: "linear-gradient(90deg, var(--signal), transparent)" }}></div>
          <div aria-hidden="true" style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "9vw", zIndex: 5, pointerEvents: "none", background: "linear-gradient(-90deg, var(--signal), transparent)" }}></div>
          {SEQ_MQ_CFG.map(([dir, speed, claim], i) => (
            <SeqMqRow key={i} rowIdx={i} claim={claim} registerRef={(el) => (mqEls.current[i] = el)} />
          ))}
          <div ref={ctaRef} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 8, opacity: 0, pointerEvents: "none", padding: "0 6vw" }}>
            <h2 style={{ margin: 0, font: "700 clamp(42px, 8.5vw, 124px)/1 var(--font-display)", letterSpacing: "-0.035em", color: "#FFFFFF", textAlign: "center", textShadow: "0 2px 44px rgba(120,40,4,0.45)" }}>Projekt prüfen<br />lassen.</h2>
          </div>
          <div ref={lpRef} style={{ position: "absolute", inset: 0, background: "var(--paper)", transform: "translateY(101%)", willChange: "transform", zIndex: 6 }}></div>
        </div>

        {/* Fortschritts-Rail */}
        <div style={{ position: "absolute", left: mobile ? "6vw" : "7vw", right: mobile ? "6vw" : "7vw", bottom: mobile ? 16 : 22, height: 1.5, background: "rgba(11,10,9,0.14)", zIndex: 20 }}>
          <i ref={railRef} style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 0, background: "var(--signal)", display: "block" }}></i>
        </div>
      </div>
    </section>
  );
}

/* reduced-motion: ruhige vertikale Abfolge */
function SeqVertikal() {
  return (
    <section data-screen-label="Referenz-Strecke">
      <div className="u-grain" style={{ background: "var(--paper)", padding: "90px 7vw 60px" }}>
        <div style={{ ...seqMono, marginBottom: 20 }}>Referenzen · Wien 2024–2026</div>
        <h2 style={{ margin: 0, font: "700 clamp(44px, 7vw, 120px)/0.98 var(--font-display)", letterSpacing: "-0.04em", color: "var(--ink)" }}>Nicht inseriert.<br /><span style={{ color: "transparent", WebkitTextStroke: "1.5px var(--ink)" }}>Inszeniert.</span></h2>
      </div>
      {[["Ecoluxe", "/25", [["282", "Anfragen"], ["+31 %", "über Zielpreis"]], SEQ_ROW_A], ["Albrecht", "/26", [["61", "Anfragen · 2 Wochen"], ["Live", "Pipeline in LENS"]], SEQ_ROW_B]].map(([n, sup, dat, row]) => (
        <div key={n} className="u-grain" style={{ background: "var(--paper)", padding: "40px 7vw 70px" }}>
          <div style={{ font: "700 clamp(40px, 7vw, 110px)/1 var(--font-display)", letterSpacing: "-0.04em", color: "var(--ink)" }}>
            {n}<sup style={{ fontFamily: "var(--font-mono)", fontSize: "0.15em", letterSpacing: "0.2em", color: "var(--signal)" }}>{sup}</sup>
          </div>
          <div style={{ display: "flex", gap: "2.4em", margin: "3vh 0", flexWrap: "wrap", ...seqMono }}>
            {dat.map(([b, s]) => <div key={s}><b style={{ display: "block", font: "700 24px/1.1 var(--font-display)", color: "var(--ink)" }}>{b}</b><span style={{ display: "block", marginTop: 6 }}>{s}</span></div>)}
          </div>
          <div style={{ display: "flex", gap: 14, overflowX: "auto" }}>
            {row.top.map(([src, w]) => <SeqTile key={src} src={src} w={Math.min(w * 1.4, 34)} />)}
          </div>
        </div>
      ))}
    </section>
  );
}

function ProjektStrecke() {
  const [mode, setMode] = React.useState(null);
  React.useEffect(() => {
    const decide = () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) setMode("vertikal");
      else setMode(window.innerWidth < 900 ? "mobile" : "pin");
    };
    decide();
    addEventListener("resize", decide);
    return () => removeEventListener("resize", decide);
  }, []);
  if (!mode) return null;
  if (mode === "vertikal") return <SeqVertikal />;
  return <SeqPinned mobile={mode === "mobile"} />;
}

/* ===== Immobilien: reduzierte Variante (nur Hero-Slides, scroll-snap) ===== */
function ImmoGalerie({ items }) {
  return (
    <div style={{ display: "flex", gap: 2, overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", margin: "32px -6vw 0", padding: "0 6vw" }}>
      {items.map((o) => (
        <a key={o.t} href="projekt.html" style={{ scrollSnapAlign: "start", position: "relative", width: "min(72vw, 860px)", height: "min(62vh, 560px)", flex: "none", overflow: "hidden", borderRadius: "var(--r-card)", textDecoration: "none" }}>
          <img src={o.img} alt={o.t} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.22), transparent 34%, transparent 58%, rgba(11,10,9,0.55))" }}></div>
          <span className="u-label" style={{ position: "absolute", top: 22, left: 26, color: "var(--text-inverse)", fontSize: 10, textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>{o.loc}</span>
          <span className="u-label" style={{ position: "absolute", top: 22, right: 26, color: "var(--text-inverse)", fontSize: 10, textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>{o.live ? "LIVE VERMARKTET" : o.price}</span>
          <div style={{ position: "absolute", left: 26, bottom: 24, right: 26, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
            <span style={{ font: "500 clamp(26px, 3vw, 44px)/1.02 var(--font-display)", letterSpacing: "-0.03em", color: "var(--text-inverse)", textShadow: "0 2px 30px rgba(0,0,0,0.4)" }}>{o.t}</span>
            <span style={{ font: "14px var(--font-mono)", color: "var(--text-inverse)", flex: "none" }}>↗</span>
          </div>
        </a>
      ))}
    </div>
  );
}

Object.assign(window, { ProjektStrecke, ImmoGalerie });
