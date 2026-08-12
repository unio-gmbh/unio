/* UNIO Dashboard v2 — geteilte Muster (§4/§5 des Briefings).
   Baut auf dash-helpers.jsx (Card, Icon, Chip, Bars, useInView …). */
const { Icon: PIcon, Card: PCard, useInView: pUseInView, Img: PImg } = window;
const P_RM = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);

/* ===== §5.3 Status-Pill-System (backend-weit verbindlich) ===== */
function StatusPill({ kind, children }) {
  const dot = (color, pulse) => (
    <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: color, flex: "none", animation: pulse && !P_RM ? "uPulse 2s var(--ease-unio) infinite" : "none" }}></span>
  );
  const base = { display: "inline-flex", alignItems: "center", gap: 7, fontSize: 9, padding: "5px 11px", borderRadius: 999, whiteSpace: "nowrap" };
  const label = children;
  switch (kind) {
    case "aktiv":
      return <span className="u-label" style={{ ...base, background: "var(--signal-soft)", color: "var(--signal-deep)" }}>{dot("var(--signal)", true)}{label}</span>;
    case "neu":
      return <span className="u-label" style={{ ...base, background: "var(--signal-soft)", color: "var(--signal-deep)" }}>{dot("var(--signal)")}{label}</span>;
    case "kontaktiert":
      return <span className="u-label" style={{ ...base, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}><PIcon name="check" size={11} stroke="var(--text-muted)" />{label}</span>;
    case "kontaktversuch":
      return <span className="u-label" style={{ ...base, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}>{label}</span>;
    case "qualifiziert":
      return <span className="u-label" style={{ ...base, background: "var(--signal)", color: "var(--on-signal)" }}>{label}</span>;
    case "reserviert":
      return <span className="u-label" style={{ ...base, boxShadow: "inset 0 0 0 1px rgba(233,111,43,0.4)", color: "var(--signal-deep)" }}>{label}</span>;
    case "verkauft":
      return <span className="u-label" style={{ ...base, background: "var(--ink)", color: "var(--paper)" }}>{label}</span>;
    case "verloren":
      return <span className="u-label" style={{ ...base, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "rgba(20,18,16,0.4)" }}>{label}</span>;
    default: /* neutral: Objektart, Quelle, „zum Verkauf" */
      return <span className="u-label" style={{ ...base, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}>{label}</span>;
  }
}

/* ===== §4.2 Kopfzeilen-KPI-Chips ===== */
function KpiChip({ value, label, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", alignItems: "flex-start", gap: 14, background: "#FFFFFF", border: "none", cursor: onClick ? "pointer" : "default", borderRadius: 12, padding: "13px 16px", boxShadow: h && onClick ? "inset 0 0 0 1px var(--hairline-dark), 0 8px 24px -14px rgba(11,10,9,.25)" : "inset 0 0 0 1px var(--hairline-dark)", transition: "box-shadow .3s var(--ease-unio)", textAlign: "left" }}>
      <div>
        <div style={{ font: "500 20px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{value}</div>
        <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5, marginTop: 8 }}>{label}</div>
      </div>
      {onClick && <PIcon name="arrow" size={13} stroke="var(--text-muted)" style={{ transform: "rotate(-45deg)", opacity: h ? 1 : 0.4, transition: "opacity .3s" }} />}
    </button>
  );
}

/* ===== Seitenkopf: Display-Headline + Akzentwort, rechts KPI-Chips + CTA ===== */
function PageHead({ title, accent, sub, chips, cta }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, flexWrap: "wrap", marginBottom: 40, paddingTop: 20 }}>
      <div>
        <h1 style={{ margin: 0, font: "500 clamp(34px, 3.4vw, 52px)/1.02 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>
          {title}{accent && <> <span style={{ color: "var(--signal)" }}>{accent}</span></>}
        </h1>
        {sub && <p style={{ margin: "16px 0 0", font: "400 16px/1.5 var(--font-display)", color: "var(--text-muted)", maxWidth: 460 }}>{sub}</p>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        {chips && chips.map((c, i) => <KpiChip key={i} value={c.value} label={c.label} onClick={c.onClick} />)}
        {cta}
      </div>
    </div>
  );
}

/* ===== §5.2 Filterleiste ===== */
function GhostPill({ children, onClick, active, icon }) {
  return (
    <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "none", cursor: "pointer", borderRadius: 999, padding: "10px 15px", font: "500 13px var(--font-display)", background: active ? "var(--ink)" : "transparent", color: active ? "var(--paper)" : "var(--ink-2)", boxShadow: active ? "none" : "inset 0 0 0 1px var(--hairline-dark)", transition: "all .25s var(--ease-unio)", whiteSpace: "nowrap" }}>
      {icon}{children}{!active && <PIcon name="arrow" size={12} stroke="var(--text-muted)" style={{ transform: "rotate(90deg)" }} />}
    </button>
  );
}
function PillSwitch({ label, on, onToggle }) {
  return (
    <button onClick={onToggle} style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "none", cursor: "pointer", borderRadius: 999, padding: "8px 14px 8px 8px", font: "500 13px var(--font-display)", background: "transparent", color: on ? "var(--ink)" : "var(--text-muted)", boxShadow: `inset 0 0 0 1px ${on ? "rgba(233,111,43,0.4)" : "var(--hairline-dark)"}`, transition: "all .25s var(--ease-unio)", whiteSpace: "nowrap" }}>
      <span aria-hidden="true" style={{ width: 32, height: 18, borderRadius: 999, background: on ? "var(--signal-soft)" : "var(--paper-2)", position: "relative", flex: "none", transition: "background .25s" }}>
        <span style={{ position: "absolute", top: 3, left: on ? 16 : 3, width: 12, height: 12, borderRadius: "50%", background: on ? "var(--signal)" : "rgba(20,18,16,0.35)", transition: "left .25s var(--ease-unio), background .25s" }}></span>
      </span>
      {label}
    </button>
  );
}
function FilterBar({ children, style }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", background: "#FFFFFF", borderRadius: 14, padding: "12px 14px", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", ...style }}>
      {children}
    </div>
  );
}
function KiSearch({ placeholder, value, onChange, style }) {
  const [foc, setFoc] = React.useState(false);
  return (
    <label style={{ flex: 1, minWidth: 220, display: "flex", alignItems: "center", gap: 11, background: "var(--paper)", borderRadius: 10, padding: "11px 15px", boxShadow: `inset 0 0 0 1.5px ${foc ? "var(--signal)" : "transparent"}`, transition: "box-shadow .25s var(--ease-unio)", ...style }}>
      <span style={{ color: "var(--signal-deep)", flex: "none" }}><PIcon name="spark" size={16} stroke="var(--signal-deep)" /></span>
      <input value={value} onChange={(e) => onChange && onChange(e.target.value)} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)} placeholder={placeholder}
        style={{ flex: 1, border: "none", outline: "none", background: "none", font: "400 14px var(--font-mono)", color: "var(--ink-2)" }} />
      <span aria-hidden="true" style={{ flex: "none", font: "600 10px var(--font-mono)", letterSpacing: "0.06em", color: "var(--text-muted)", padding: "4px 8px", borderRadius: 6, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>⌘K</span>
    </label>
  );
}
function ViewToggle({ view, onView }) {
  return (
    <div style={{ display: "inline-flex", gap: 3, background: "var(--paper)", borderRadius: 999, padding: 4 }}>
      {[["grid", "grid"], ["list", "rows"]].map(([id, ic]) => {
        const on = view === id;
        return <button key={id} onClick={() => onView(id)} aria-label={id} style={{ width: 32, height: 30, borderRadius: 999, border: "none", cursor: "pointer", background: on ? "#FFFFFF" : "transparent", boxShadow: on ? "inset 0 0 0 1px var(--hairline-dark)" : "none", display: "inline-flex", alignItems: "center", justifyContent: "center", color: on ? "var(--ink)" : "var(--text-muted)" }}><PIcon name={ic} size={15} /></button>;
      })}
    </div>
  );
}

/* ===== §5.4 Objektkarte ===== */
function ObjektCard({ o, delay = 0, onOpen }) {
  const [h, setH] = React.useState(false);
  const [ref, run] = pUseInView(0.15);
  return (
    <div ref={ref} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={onOpen}
      style={{ height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", background: "#FFFFFF", borderRadius: 14, padding: 8, cursor: "pointer", boxShadow: h ? "inset 0 0 0 1px var(--hairline-dark), 0 16px 44px -20px rgba(11,10,9,.28)" : "inset 0 0 0 1px var(--hairline-dark)", transform: run ? (h ? "translateY(-4px)" : "none") : "translateY(16px)", opacity: run ? 1 : 0, transition: `transform .4s var(--ease-unio) ${delay}ms, opacity .5s var(--ease-unio) ${delay}ms, box-shadow .4s var(--ease-unio)` }}>
      <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", flex: "none" }}>
        <PImg src={o.img} alt={o.title} style={{ display: "block", width: "100%", height: 168, objectFit: "cover", filter: o.entwurf ? "grayscale(0.7) brightness(1.03)" : "none", transform: h ? "scale(1.03)" : "scale(1)", transition: "opacity 520ms var(--ease-unio), transform .7s var(--ease-unio)" }} />
        {/* Scrim + EINE Information auf dem Foto: der Nachfrage-Score */}
        <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 72, background: "linear-gradient(to top, rgba(11,10,9,0.45), transparent)" }}></div>
        {!o.entwurf && o.demand != null && <span className="u-label" style={{ position: "absolute", right: 12, bottom: 12, fontSize: 8.5, padding: "5px 11px", borderRadius: 999, background: "rgba(11,10,9,0.35)", WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)", color: "#FBFAF6" }}>Nachfrage {o.demand}</span>}
        {/* Schnellaktionen bei Hover — links unten, Icon färbt sich orange */}
        <div style={{ position: "absolute", left: 12, bottom: 12, display: "flex", gap: 6, opacity: h ? 1 : 0, transform: h ? "none" : "translateY(6px)", transition: "all .3s var(--ease-unio)" }}>
          {[["angebote", "Exposé"], ["ext", "Teilen"], ["edit", "Bearbeiten"]].map(([ic, l]) => <QuickIc key={ic} ic={ic} l={l} />)}
        </div>
      </div>
      <div style={{ padding: "16px 12px 12px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
          <span style={{ font: "500 16.5px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.title}</span>
          {o.entwurf ? <StatusPill kind="neutral">Entwurf</StatusPill> : <StatusPill kind="aktiv">Aktiv</StatusPill>}
        </div>
        <div style={{ font: "400 12.5px var(--font-display)", color: "rgba(20,18,16,0.42)", marginTop: 7, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.addr}</div>
        {/* Fakten: m² · Zimmer · Preis — je mit subtilem Icon */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--hairline)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "11.5px var(--font-mono)", color: "var(--ink-2)", whiteSpace: "nowrap" }}><PIcon name="area" size={12} stroke="var(--text-muted)" />{o.qm != null ? o.qm + " m²" : "—"}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "11.5px var(--font-mono)", color: "var(--ink-2)", whiteSpace: "nowrap" }}><PIcon name="door" size={12} stroke="var(--text-muted)" />{o.rooms != null ? o.rooms + " Zi." : "—"}</span>
          <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, font: "500 13.5px var(--font-display)", color: "var(--ink)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}><PIcon name="tag" size={12} stroke="var(--text-muted)" />{o.price}</span>
        </div>
      </div>
    </div>
  );
}
/* Schnellaktion-Icon: eigener Hover-Zustand → orange */
function QuickIc({ ic, l }) {
  const [ih, setIh] = React.useState(false);
  return (
    <span title={l} onMouseEnter={() => setIh(true)} onMouseLeave={() => setIh(false)} style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(251,250,246,0.92)", display: "inline-flex", alignItems: "center", justifyContent: "center", transition: "box-shadow .2s var(--ease-unio)", boxShadow: ih ? "0 0 0 1.5px var(--signal)" : "none" }}><PIcon name={ic} size={13} stroke={ih ? "var(--signal)" : "var(--ink)"} /></span>
  );
}

/* ===== §5.6 Leerzustand ===== */
function EmptyState({ icon = "leads", text }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "48px 24px", borderRadius: 12, boxShadow: "inset 0 0 0 1.5px transparent", border: "1.5px dashed var(--hairline-dark)", textAlign: "center" }}>
      <PIcon name={icon} size={26} stroke="var(--signal-deep)" />
      <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 10 }}>{text}</span>
    </div>
  );
}

/* ===== §4.3 Empfehlungs-Textkarte ===== */
function RecoCard({ label, value, meta, tone, arrow, style }) {
  const hi = tone === "hi";
  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 12, padding: "22px 24px", background: hi ? "linear-gradient(135deg, rgba(255,170,9,0.22), rgba(255,219,87,0.12) 55%, #F9EFE5)" : "#F9EFE5", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", ...style }}>
      {label && <div className="u-label" style={{ color: "var(--signal-deep)", fontSize: 9 }}>{label}</div>}
      {value && <div style={{ font: "500 clamp(26px, 2.4vw, 38px)/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 14, fontVariantNumeric: "tabular-nums" }}>{value}</div>}
      {meta && <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 9, marginTop: 12 }}>{meta}</div>}
      {arrow && <span style={{ position: "absolute", top: 20, right: 20, color: "var(--signal-deep)" }}><PIcon name="arrow" size={15} stroke="var(--signal-deep)" style={{ transform: "rotate(-45deg)" }} /></span>}
    </div>
  );
}

/* ===== §5.1 Tabelle ===== */
function Table({ cols, children }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 14, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: cols.map((c) => c.w || "1fr").join(" "), gap: 20, padding: "16px 24px", borderBottom: "1px solid var(--hairline-dark)" }}>
        {cols.map((c, i) => <span key={i} className="u-label" style={{ color: "rgba(20,18,16,0.4)", fontSize: 8.5, textAlign: c.right ? "right" : "left" }}>{c.label}</span>)}
      </div>
      {children}
    </div>
  );
}
function Row({ cols, cells, onClick, delay = 0 }) {
  const [h, setH] = React.useState(false);
  const [ref, run] = pUseInView(0.05);
  return (
    <div ref={ref} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={onClick}
      style={{ display: "grid", gridTemplateColumns: cols.map((c) => c.w || "1fr").join(" "), gap: 20, padding: "18px 24px", borderBottom: "1px solid var(--hairline-dark)", alignItems: "center", cursor: onClick ? "pointer" : "default", background: h ? "#F7F3EC" : "transparent", opacity: run ? 1 : 0, transform: run ? "none" : "translateY(8px)", transition: `background .2s, opacity .5s var(--ease-unio) ${delay}ms, transform .5s var(--ease-unio) ${delay}ms` }}>
      {cells.map((cell, i) => (
        <div key={i} style={{ textAlign: cols[i].right ? "right" : "left", minWidth: 0 }}>{cell}</div>
      ))}
    </div>
  );
}
/* Zweizeilige Zelle */
function Cell2({ a, b, mono }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ font: "500 14px var(--font-display)", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a}</div>
      {b && <div className="u-label" style={{ color: "rgba(20,18,16,0.45)", fontSize: 8.5, marginTop: 5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", ...(mono ? {} : {}) }}>{b}</div>}
    </div>
  );
}

Object.assign(window, { StatusPill, KpiChip, PageHead, GhostPill, PillSwitch, FilterBar, KiSearch, ViewToggle, ObjektCard, EmptyState, RecoCard, Table, Row, Cell2, Ruler, Delta, DASH_P_RM: P_RM });

/* ===== v2.2 §4 Delta-Pill — Richtung trägt Vorzeichen, nicht Farbe ===== */
function Delta({ v }) {
  if (v == null || v === 0) return null;
  const pos = v > 0;
  return <span className="u-label" style={{ fontSize: 8.5, padding: "4px 9px", borderRadius: 999, background: pos ? "var(--signal-soft)" : "transparent", boxShadow: pos ? "none" : "inset 0 0 0 1px var(--hairline-dark)", color: pos ? "var(--signal-deep)" : "rgba(20,18,16,0.4)", fontVariantNumeric: "tabular-nums" }}>{pos ? "+" : "−"}{Math.abs(v)} %</span>;
}

/* ===== v2.2 §3 Skalen-Lineal — Wert groß, Tick-Lineal + Orange-Marker, Mono-Pole ===== */
function Ruler({ label, value, poleL, poleR, pos, cmp, cmpLabel, note }) {
  const [ref, run] = pUseInView(0.4);
  return (
    <div ref={ref} style={{ padding: "14px 0" }}>
      {(label || value) && <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        {label && <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5 }}>{label}</span>}
        {value && <span style={{ font: "500 20px var(--font-mono)", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{value}</span>}
      </div>}
      <div style={{ position: "relative", height: 26 }}>
        <div aria-hidden="true" style={{ position: "absolute", top: 12, left: 0, right: 0, height: 12, backgroundImage: "repeating-linear-gradient(90deg, var(--hairline-dark) 0 1px, transparent 1px 5%)" }}></div>
        <div aria-hidden="true" style={{ position: "absolute", top: 17, left: 0, right: 0, height: 1, background: "var(--hairline-dark)" }}></div>
        {cmp != null && <span aria-hidden="true" style={{ position: "absolute", top: 6, left: `calc(${cmp}% - 1px)`, width: 2, height: 14, background: "#C9C2B6" }}></span>}
        <span style={{ position: "absolute", top: 5, left: `calc(${run ? pos : 50}% - 6px)`, width: 12, height: 12, borderRadius: "50%", background: "var(--signal)", boxShadow: "0 0 0 4px var(--signal-soft)", transition: "left 600ms cubic-bezier(.34,1.3,.5,1)" }}></span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 8 }}>{poleL}</span>
        {cmpLabel && <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 8 }}>{cmpLabel}</span>}
        <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 8 }}>{poleR}</span>
      </div>
      {note && <p style={{ margin: "12px 0 0", font: "400 12.5px/1.5 var(--font-display)", color: "var(--text-muted)" }}>{note}</p>}
    </div>
  );
}
