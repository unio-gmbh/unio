/* UNIO LENS — Helfer + Chart-Primitive. Mehrfarbige Graphen: Orange→Grau/Weiß + Gelb→Weiß. */
const U_RM_DASH = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
const R = 12; // globaler Radius, bewusst dezent

function useInView(threshold = 0.25) {
  const ref = React.useRef(null);
  const [run, setRun] = React.useState(U_RM_DASH);
  React.useEffect(() => {
    if (U_RM_DASH || !ref.current) return;
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setRun(true); io.disconnect(); } }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, run];
}
function Reveal({ children, delay = 0, style }) {
  const [ref, run] = useInView(0.15);
  return (
    <div ref={ref} style={{ opacity: run ? 1 : 0, transform: run ? "none" : "translateY(16px)", transition: `opacity 750ms var(--ease-unio) ${delay}ms, transform 800ms var(--ease-unio) ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}
function RevealL({ children, style }) {
  const [ref, run] = useInView(0.1);
  return <div ref={ref} style={{ opacity: run ? 1 : 0, transform: run ? "none" : "translateY(12px)", transition: "all 700ms var(--ease-unio)", ...style }}>{children}</div>;
}

/* Zähler: hoch bei Sichtbarkeit, ganze Zahlen, de-AT */
function useCountUp(target, run, dur = 1100) {
  const [v, setV] = React.useState(U_RM_DASH ? target : 0);
  React.useEffect(() => {
    if (!run || U_RM_DASH) { setV(target); return; }
    const t0 = performance.now();
    let raf;
    const tick = (t) => { const p = Math.min(1, (t - t0) / dur); setV(Math.round(target * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return v;
}
function BigNum({ value, unit, sub, prefix, dur }) {
  const [ref, run] = useInView(0.4);
  const n = useCountUp(typeof value === "number" ? value : 0, run, dur);
  const disp = typeof value === "number" ? n.toLocaleString("de-AT") : value;
  return (
    <div ref={ref}>
      <div style={{ font: "500 clamp(38px, 3.4vw, 60px)/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>
        {prefix && <span style={{ fontSize: "0.5em", fontWeight: 400, marginRight: 4, color: "var(--text-muted)" }}>{prefix}</span>}
        {disp}{unit && <span style={{ fontSize: "0.4em", fontWeight: 400, marginLeft: 5, color: "var(--text-muted)" }}>{unit}</span>}
      </div>
      {sub && <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 9.5, marginTop: 12 }}>{sub}</div>}
    </div>
  );
}

/* Card-Shell: weiß, dezente Hairline, wenig Rundung */
function Card({ pad = 26, children, style, hover }) {
  const [h, setH] = React.useState(false);
  return (
    <div onMouseEnter={() => hover && setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h && hover ? "var(--card-hover, #F7F3EC)" : "var(--card-bg, #FFFFFF)", borderRadius: R, boxShadow: h ? "inset 0 0 0 1px var(--card-line, var(--hairline-dark)), 0 12px 40px -18px rgba(11,10,9,.22)" : "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", padding: pad, transition: "box-shadow .35s var(--ease-unio), transform .35s var(--ease-unio), background-color .25s var(--ease-unio)", transform: h ? "translateY(-3px)" : "none", ...style }}>
      {children}
    </div>
  );
}
function CardHead({ label, title, sub, right }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
      <div>
        {label && <div className="u-label" style={{ color: "var(--signal-deep)", fontSize: 9 }}>{label}</div>}
        <div style={{ font: "500 19px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: label ? 10 : 0 }}>{title}</div>
        {sub && <div style={{ font: "400 12.5px/1.5 var(--font-display)", color: "var(--text-muted)", marginTop: 7 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

/* Area-Chart: Orange-Verlauf → transparent, animiert einzeichnend */
function AreaChart({ data, height = 120, color = "var(--signal)" }) {
  const [ref, run] = useInView(0.4);
  const w = 320, h = height, max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - 8 - ((v - min) / (max - min || 1)) * (h - 20)]);
  const line = pts.map((p) => p.join(",")).join(" ");
  const area = `0,${h} ${line} ${w},${h}`;
  const gid = "ag" + React.useMemo(() => Math.random().toString(36).slice(2, 7), []);
  return (
    <svg ref={ref} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height, display: "block" }}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.28" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <polygon points={area} fill={`url(#${gid})`} style={{ opacity: run ? 1 : 0, transition: "opacity 900ms var(--ease-unio)" }} />
      <polyline points={line} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000, strokeDashoffset: run ? 0 : 1000, transition: "stroke-dashoffset 1400ms var(--ease-unio)" }} />
    </svg>
  );
}

/* Balken: Orange→Grau abgestuft (jüngste Balken am kräftigsten) */
function Bars({ data, height = 120, mono }) {
  const [ref, run] = useInView(0.4);
  const max = Math.max(...data);
  return (
    <div ref={ref} style={{ display: "flex", alignItems: "flex-end", gap: 5, height }}>
      {data.map((v, i) => {
        const t = i / (data.length - 1);
        const col = mono ? `rgba(11,10,9,${0.12 + t * 0.5})` : `color-mix(in oklch, var(--signal) ${30 + t * 70}%, #E2DCCF)`;
        return <span key={i} style={{ flex: 1, height: run ? (v / max * 100) + "%" : "0%", background: col, borderRadius: 3, transition: `height 900ms var(--ease-unio) ${i * 45}ms` }}></span>;
      })}
    </div>
  );
}

/* Donut / Ring mit Prozent */
function Ring({ value, size = 92, label, color = "var(--signal)" }) {
  const [ref, run] = useInView(0.4);
  const r = size / 2 - 7, C = 2 * Math.PI * r;
  return (
    <div ref={ref} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EDE8DF" strokeWidth="5" />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={run ? C * (1 - value / 100) : C} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: "stroke-dashoffset 1200ms var(--ease-unio)" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", font: "500 18px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{value}%</div>
      </div>
      {label && <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5 }}>{label}</span>}
    </div>
  );
}

/* Pill-Tabs */
function Tabs({ items, active, onPick }) {
  return (
    <div style={{ display: "inline-flex", gap: 4, background: "#FFFFFF", borderRadius: 999, padding: 5, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
      {items.map(([id, label, badge]) => {
        const on = active === id;
        return (
          <button key={id} onClick={() => onPick(id)} style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "none", cursor: "pointer", borderRadius: 999, padding: "9px 16px", font: "500 13.5px var(--font-display)", background: on ? "var(--ink)" : "transparent", color: on ? "var(--paper)" : "var(--text-muted)", transition: "all .25s var(--ease-unio)" }}>
            {label}{badge != null && <span style={{ font: "10px var(--font-mono)", padding: "2px 7px", borderRadius: 999, background: on ? "rgba(255,255,255,0.16)" : "var(--paper-2)", color: on ? "var(--paper)" : "var(--text-muted)" }}>{badge}</span>}
          </button>
        );
      })}
    </div>
  );
}

function Chip({ children, tone }) {
  const c = tone === "pos" ? ["var(--signal-soft)", "var(--signal-deep)"] : tone === "warn" ? ["var(--signal-soft)", "var(--signal-deep)"] : tone === "neg" ? ["rgba(194,64,42,0.1)", "#C2402A"] : ["var(--paper-2)", "var(--text-muted)"];
  return <span className="u-label" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 9, padding: "5px 11px", borderRadius: 999, background: c[0], color: c[1] }}>{children}</span>;
}

/* 1.5px-Stroke-Icon-Set (Briefing §13: keine Text-Glyphen). */
const ICON_PATHS = {
  dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  actions: "M13 2 3 14h7l-1 8 10-12h-7z",
  objekte: "M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6",
  kontakte: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 4-6 8-6s8 2 8 6",
  leads: "M22 12h-4l-3 9L9 3l-3 9H2",
  angebote: "M9 3h9l3 3v15H6V3zM9 3v4h9M9 13h6M9 17h6",
  kalender: "M3 5h18v16H3zM3 9h18M8 3v4M16 3v4",
  firma: "M3 21V7l6-4 6 4v14M15 11h6v10M3 21h18M7 10h.01M7 14h.01M11 10h.01M11 14h.01",
  benutzer: "M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  portale: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18",
  analyse: "M4 20V10M10 20V4M16 20v-6M22 20H2",
  stats: "M3 3v18h18M8 14l3-4 3 3 4-6",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.4 3H9.6l-.4 2.9a7 7 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.4 2.9h4.8l.4-2.9a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6a7 7 0 0 0 .1-1z",
  back: "M19 12H5M12 19l-7-7 7-7",
  pin: "M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12zM12 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  ext: "M14 3h7v7M21 3l-9 9M19 14v6H4V5h6",
  edit: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.7.6 2.7.7A2 2 0 0 1 22 16.9z",
  check: "M20 6 9 17l-5-5",
  download: "M12 3v12M7 10l5 5 5-5M5 21h14",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  arrow: "M5 12h14M13 6l6 6-6 6",
  plus: "M12 5v14M5 12h14",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  layers: "M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18",
  rows: "M3 5h18M3 12h18M3 19h18",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  upload: "M12 15V3M7 8l5-5 5 5M5 21h14",
  dot: "M12 12h.01",
  x: "M18 6 6 18M6 6l12 12",
  home: "M3 11l9-8 9 8M5 9v11h5v-6h4v6h5V9",
  sliders: "M4 6h10M18 6h2M4 12h2M10 12h10M4 18h8M16 18h4M14 4v4M6 10v4M12 16v4",
  area: "M3 3h18v18H3zM7 17 17 7",
  door: "M6 21V4h12v17M4 21h16M14 12h.01",
  tag: "M20.6 13.4 11 3H4v7l9.6 10.4a2 2 0 0 0 2.8 0l4.2-4.2a2 2 0 0 0 0-2.8zM7.5 7.5h.01",
};
function Icon({ name, size = 18, stroke = "currentColor", sw = 1.5, style }) {
  const d = ICON_PATHS[name] || ICON_PATHS.objekte;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", ...style }}>
      {d.split("M").filter(Boolean).map((seg, i) => <path key={i} d={"M" + seg} />)}
    </svg>
  );
}

/* Bild mit sauberem Ladeverhalten: neutraler Platzhalter, sanftes Einblenden statt hartem Pop-in. */
function Img({ src, alt = "", style, imgRef, ...rest }) {
  const [on, setOn] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => { const el = ref.current; if (el && el.complete && el.naturalWidth > 0) setOn(true); }, [src]);
  return (
    <img ref={(n) => { ref.current = n; if (imgRef) imgRef.current = n; }} src={src} alt={alt} loading="lazy" decoding="async"
      onLoad={() => setOn(true)}
      style={{ backgroundColor: "#ECE8E0", opacity: on ? 1 : 0, transition: "opacity 520ms var(--ease-unio)", ...style }} {...rest} />
  );
}

Object.assign(window, { useInView, Reveal, RevealL, useCountUp, BigNum, Card, CardHead, AreaChart, Bars, Ring, Tabs, Chip, Icon, Img, U_RM_DASH, DASH_R: R });
