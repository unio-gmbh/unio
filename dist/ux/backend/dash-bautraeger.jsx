/* UNIO Dashboard — Bauträger-Sicht (echtes BT-Dashboard, ins neue Design übertragen).
   Tabs: Übersicht · Leads · Marketing. Daten aus den realen Screenshots. */
const { Icon: BIcon, Reveal: BRv, Card: BCard, CardHead: BHead, Bars: BBars, Chip: BChip, useInView: bInView, useCountUp: bCount, Img: BImg } = window;

const BT_PROJECTS = [
  { id: "all", t: "Alle Projekte", sub: "Marketing über alle Projekte", imgs: ["/assets/img/albrecht.jpg", "/assets/img/beheim.jpg"] },
  { id: "p1", t: "Bieterverfahren – Stilaltbau zum Selbstgestalten", sub: "Wien · Fertiggestellt", meta: "0 / 1 Einheiten frei", chip: "Aktiv", imgs: ["/assets/img/schoenbrunn.jpg"] },
  { id: "p2", t: "Bieterverfahren – Stilaltbau, 1130 Wien", sub: "Wien · Fertiggestellt", meta: "5 Einheiten frei", chip: "Aktiv", imgs: ["/assets/img/int-kitchen.jpg"] },
];
const BT_KPI = [
  { v: 53, sub: "Neue Leads (7 Tage)", note: "54 in der Vorwoche", delta: "-2 % vs. Vorwoche", icon: "leads" },
  { v: 297, sub: "Kontakte", note: "331 Interessen gesamt", icon: "kontakte" },
  { v: 24, pct: true, sub: "Qualifizierungsrate", note: "79 qualifizierte Leads", bar: 24, icon: "stats" },
  { v: 31, sub: "Besichtigungen", note: "9 % der Interessen", icon: "kalender" },
  { v: 56, sub: "Unbearbeitet > 48 h", note: "Neue Leads ohne Statuswechsel", hot: true, icon: "actions" },
];
const BT_FUNNEL = [
  ["Neu", 331, 100], ["Kontaktversuch", 193, 58], ["Kontaktiert", 103, 31], ["Qualifiziert", 79, 24], ["Besichtigung", 31, 9],
];
const BT_CONV = ["58 %", "53 %", "77 %", "39 %"];
const BT_STATUS = [["Neu", 68, "#F2CE63"], ["Kontaktversuch", 90, "var(--signal)"], ["Kontaktiert", 24, "#D98A06"], ["Qualifiziert", 48, "#B06B10"], ["Besichtigung", 31, "#7A4A0E"], ["Verloren", 70, "#C2402A"]];
const BT_HANDLUNG = [
  ["DM", "Daniel Martin", "57 Tage"], ["PA", "Philip Altenburger", "57 Tage"], ["KS", "Klara Szekffy", "57 Tage"], ["FB", "Flo Boehm", "56 Tage"], ["NW", "Nick Willemsens", "56 Tage"],
];
const BT_WEEKS = { labels: ["18.05.", "01.06.", "15.06.", "29.06.", "13.07.", "27.07."], data: [2, 4, 57, 27, 19, 20, 30, 8, 70, 66, 29, 12] };
const BT_HEAT = {
  cols: ["0–5", "6–8", "9–11", "12–14", "15–17", "18–20", "21–23"],
  rows: [["Mo", [0, 0, 5, 0, 7, 10, 0]], ["Di", [4, 0, 9, 15, 8, 8, 19]], ["Mi", [0, 9, 9, 5, 6, 13, 12]], ["Do", [4, 6, 14, 12, 13, 16, 12]], ["Fr", [0, 4, 5, 12, 5, 6, 8]], ["Sa", [0, 0, 14, 7, 4, 7, 0]], ["So", [4, 0, 0, 4, 5, 6, 0]]],
};
const BT_SOURCES = [
  ["Meta / Zapier", 192, 65, "var(--signal)", 17], ["Willhaben", 75, 25, "#F2CE63", 41], ["ImmoScout24", 22, 7, "#B06B10", 24], ["Erstinteresse im Projekt", 3, 1, "#8A857B", 33], ["Landing Page / Web", 3, 1, "#55524C", 0], ["Sonstige (2)", 2, 0, "#D8D2C6", 0],
];
const BT_EINHEITEN = [
  ["/assets/img/schoenbrunn.jpg", "Bieterverfahren – Stilaltbau nahe Schönbrunn", "Projekt", 217],
  ["/assets/img/int-bath.jpg", "Top 3 · Maxingstraße 72, 1130 Wien", null, 49],
  ["/assets/img/int-kitchen.jpg", "Top 5 · Maxingstraße 72, 1130 Wien", null, 19],
  ["/assets/img/beheim-2.jpg", "Top 1 · Maxingstraße 72, 1130 Wien", null, 14],
  ["/assets/img/albrecht-dusk.jpg", "Top 7 · Maxingstraße 72, 1130 Wien", null, 14],
  ["/assets/img/ecoluxe.jpg", "Top 2 · Maxingstraße 72, 1130 Wien", null, 9],
];
const BT_LEADS = [
  ["Daniel Martin", "Meta / Zapier", "Neu", "57 Tage", true], ["Philip Altenburger", "Meta / Zapier", "Neu", "57 Tage", true], ["Klara Szekffy", "Willhaben", "Kontaktversuch", "57 Tage", true], ["Flo Boehm", "Meta / Zapier", "Kontaktiert", "56 Tage", false], ["Nick Willemsens", "ImmoScout24", "Qualifiziert", "56 Tage", false], ["Sarah Brunner", "Willhaben", "Besichtigung", "12 Tage", false], ["Georg Steiner", "Meta / Zapier", "Qualifiziert", "8 Tage", false],
];
const BT_SPEND = [26, 27, 28, 29, 30, 29, 27, 26, 63, 120, 46, 41, 46, 59, 55, 61, 33, 34, 30, 28, 33];
const BT_LEADLINE = [6, 5, 4, 7, 9, 6, 4, 3, 8, 19, 12, 9, 8, 11, 10, 12, 6, 7, 5, 6, 8];

/* Kleine Statistik-Pille rechts oben im Kopf */
function BtMiniStat({ icon, v, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 13, background: "#FFFFFF", borderRadius: 14, padding: "14px 20px", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
      <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--signal-soft)", color: "var(--signal-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}><BIcon name={icon} size={16} /></span>
      <div>
        <div style={{ font: "600 19px/1 var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{v}</div>
        <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 5 }}>{sub}</div>
      </div>
    </div>
  );
}

/* Projekt-Wahl-Karte */
function BtProjektCard({ p, on, onPick }) {
  const [h, setH] = React.useState(false);
  return (
    <div onClick={onPick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ width: 280, flex: "none", cursor: "pointer", background: "#FFFFFF", borderRadius: 14, overflow: "hidden", boxShadow: on ? "0 0 0 2px var(--signal)" : h ? "inset 0 0 0 1px var(--hairline-dark), 0 14px 34px rgba(11,10,9,.08)" : "inset 0 0 0 1px var(--hairline-dark)", transform: h ? "translateY(-2px)" : "none", transition: "all 300ms var(--ease-unio)" }}>
      <div style={{ position: "relative", height: 130, display: "grid", gridTemplateColumns: p.imgs.length > 1 ? "1fr 1fr" : "1fr", gap: 2 }}>
        {p.imgs.map((src, i) => <BImg key={i} src={src} alt="" style={{ width: "100%", height: 130, objectFit: "cover" }} />)}
        <span className="u-label" style={{ position: "absolute", top: 10, left: 10, fontSize: 8.5, padding: "5px 11px", borderRadius: 999, background: p.chip ? "rgba(255,255,255,.92)" : "rgba(11,10,9,.72)", color: p.chip ? "var(--signal-deep)" : "#FFFFFF", backdropFilter: "blur(6px)" }}>{p.chip || "2 Projekte"}</span>
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ font: "500 14.5px/1.3 var(--font-display)", color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.t}</div>
        <div style={{ font: "400 12px var(--font-display)", color: "var(--text-muted)", marginTop: 5 }}>{p.sub}</div>
        {p.meta && <div className="u-label" style={{ fontSize: 8, color: "var(--signal-deep)", marginTop: 8 }}>{p.meta}</div>}
      </div>
    </div>
  );
}

/* ===== Übersicht ===== */
function BtKpiRow() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 18 }}>
      {BT_KPI.map((k, i) => (
        <BRv key={k.sub} delay={i * 50}><BCard pad={22}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>{k.sub}</span>
            <span style={{ color: k.hot ? "var(--signal-deep)" : "var(--text-muted)", opacity: .7 }}><BIcon name={k.icon} size={15} /></span>
          </div>
          <div style={{ font: "600 40px/1 var(--font-display)", letterSpacing: "-0.02em", color: k.hot ? "var(--signal-deep)" : "var(--ink)", marginTop: 16, fontVariantNumeric: "tabular-nums" }}>{k.v}{k.pct && <span style={{ fontSize: 22, color: "var(--text-muted)" }}>%</span>}</div>
          {k.delta && <div style={{ font: "10px var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)", marginTop: 8 }}>{k.delta}</div>}
          {k.bar != null && <div style={{ height: 4, borderRadius: 999, background: "rgba(20,18,16,.08)", overflow: "hidden", marginTop: 12 }}><div style={{ height: "100%", width: k.bar + "%", background: "var(--signal)", borderRadius: 999 }}></div></div>}
          <div style={{ font: "400 11.5px var(--font-display)", color: "var(--text-muted)", marginTop: 10 }}>{k.note}</div>
        </BCard></BRv>
      ))}
    </div>
  );
}

function BtPipeline() {
  const [ref, run] = bInView(0.3);
  const totalStatus = BT_STATUS.reduce((s, x) => s + x[1], 0);
  return (
    <BCard pad={28}>
      <BHead title="Lead-Pipeline" sub="Kumulierter Stufen-Durchlauf aller 331 Interessen." />
      <div ref={ref} style={{ display: "flex", gap: 0, alignItems: "stretch", marginTop: 24 }}>
        <div style={{ flex: 1, display: "flex", gap: 0 }}>
          {BT_FUNNEL.map(([label, n, pct], i) => (
            <React.Fragment key={label}>
              {i > 0 && (
                <div style={{ width: 44, flex: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, color: "var(--text-muted)" }}>
                  <span style={{ font: "500 13px var(--font-display)" }}>›</span>
                  <span style={{ font: "9px var(--font-mono)", letterSpacing: "0.08em" }}>{BT_CONV[i - 1]}</span>
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{label}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 8 }}>
                  <span style={{ font: "600 30px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{n}</span>
                  <span style={{ font: "10px var(--font-mono)", color: "var(--text-muted)" }}>{pct} %</span>
                </div>
                <div style={{ height: 96, display: "flex", alignItems: "flex-end", marginTop: 14 }}>
                  <div style={{ width: "100%", height: run ? Math.max(8, pct) + "%" : "0%", borderRadius: 8, background: `color-mix(in oklch, var(--signal) ${28 + (i / 4) * 72}%, #F5EFE2)`, transition: `height 900ms var(--ease-unio) ${i * 90}ms` }}></div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={{ width: 200, flex: "none", marginLeft: 28, paddingLeft: 28, borderLeft: "1px solid var(--hairline-dark)", display: "flex", flexDirection: "column", gap: 12 }}>
          {[["Gewonnen", "0", "var(--ink)"], ["Verloren", "70", "#C2402A"], ["Win-Rate", "0 %", "var(--ink)"]].map(([l, v, c]) => (
            <div key={l} style={{ background: "var(--paper-2)", borderRadius: 12, padding: "14px 18px" }}>
              <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{l}</div>
              <div style={{ font: "600 24px/1 var(--font-display)", color: c, marginTop: 7, fontVariantNumeric: "tabular-nums" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 28, paddingTop: 22, borderTop: "1px solid var(--hairline-dark)" }}>
        <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>Aktueller Status</div>
        <div style={{ display: "flex", gap: 3, height: 8, borderRadius: 999, overflow: "hidden", marginTop: 12 }}>
          {BT_STATUS.map(([l, n, c]) => <span key={l} style={{ width: (n / totalStatus * 100) + "%", background: c }}></span>)}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 22px", marginTop: 14 }}>
          {BT_STATUS.map(([l, n, c]) => (
            <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: 7, font: "400 12px var(--font-display)", color: "var(--text-muted)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: c, flex: "none" }}></span>{l}&nbsp;<b style={{ color: "var(--ink)", fontWeight: 600 }}>{n}</b>
            </span>
          ))}
        </div>
        <div style={{ font: "400 11px var(--font-display)", color: "var(--text-muted)", marginTop: 14 }}>Verlorene Leads werden ab Eingang gezählt; die erreichte Zwischenstufe ist nicht erfasst.</div>
      </div>
    </BCard>
  );
}

function BtHandlungsbedarf() {
  return (
    <BCard pad={28}>
      <BHead title="Handlungsbedarf" sub="Neue Leads ohne Reaktion seit über 48 Stunden." right={<span style={{ color: "var(--text-muted)" }}><BIcon name="dot" size={16} /></span>} />
      <div style={{ marginTop: 18 }}>
        {BT_HANDLUNG.map(([ini, name, tage], i) => (
          <div key={name} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 0", borderTop: i ? "1px solid var(--hairline-dark)" : "none" }}>
            <span style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--paper-2)", color: "var(--ink-2)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 11.5px var(--font-display)", flex: "none" }}>{ini}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: "500 13.5px var(--font-display)", color: "var(--ink)" }}>{name}</div>
              <div style={{ font: "400 11px var(--font-display)", color: "var(--text-muted)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Bieterverfahren – Stilaltbau zu…</div>
            </div>
            <BChip tone="warn">{tage}</BChip>
          </div>
        ))}
      </div>
    </BCard>
  );
}

function BtHeatmap() {
  const flat = BT_HEAT.rows.flatMap(([, vals]) => vals);
  const max = Math.max(...flat);
  return (
    <BCard pad={28}>
      <BHead title="Lead-Eingangszeiten" sub="Lead-Eingänge nach lokaler Uhrzeit." right={<BChip>Top: Di 21–23 Uhr · 19</BChip>} />
      <div style={{ display: "grid", gridTemplateColumns: "34px repeat(7, minmax(0, 1fr))", gap: 5, marginTop: 22 }}>
        <span></span>
        {BT_HEAT.cols.map((c) => <span key={c} className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", textAlign: "center" }}>{c}</span>)}
        {BT_HEAT.rows.map(([day, vals]) => (
          <React.Fragment key={day}>
            <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", alignSelf: "center" }}>{day}</span>
            {vals.map((v, i) => (
              <span key={i} title={v ? `${day} ${BT_HEAT.cols[i]} Uhr · ${v}` : ""} style={{ height: 34, borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 11px var(--font-mono)", background: v ? `color-mix(in oklch, var(--signal) ${18 + (v / max) * 82}%, #FBF8F1)` : "#F7F4ED", color: v / max > 0.55 ? "#FFFFFF" : v ? "var(--ink-2)" : "transparent" }}>{v || ""}</span>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}>
        <span className="u-label" style={{ fontSize: 8, color: "var(--text-muted)" }}>Weniger</span>
        {[0.15, 0.3, 0.5, 0.7, 0.9].map((t) => <span key={t} style={{ width: 22, height: 10, borderRadius: 999, background: `color-mix(in oklch, var(--signal) ${t * 100}%, #FBF8F1)` }}></span>)}
        <span className="u-label" style={{ fontSize: 8, color: "var(--text-muted)" }}>Mehr</span>
      </div>
    </BCard>
  );
}

function BtDonut() {
  const [ref, run] = bInView(0.35);
  const size = 190, r = 72, C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <BCard pad={28}>
      <BHead title="Kontakt-Herkunft" sub="Erstkontakt-Quelle aller 297 Kontakte." />
      <div ref={ref} style={{ display: "flex", gap: 34, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", width: size, height: size, flex: "none" }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {BT_SOURCES.map(([l, , pct, c]) => {
              const off = acc; acc += pct;
              return <circle key={l} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={c} strokeWidth="20" strokeDasharray={`${run ? Math.max(0.5, pct) / 100 * C : 0} ${C}`} strokeDashoffset={-off / 100 * C} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: "stroke-dasharray 1100ms var(--ease-unio)" }} />;
            })}
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ font: "600 34px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>297</span>
            <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 5 }}>Kontakte</span>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 260 }}>
          {BT_SOURCES.map(([l, n, pct, c], i) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 0", borderTop: i ? "1px solid var(--hairline-dark)" : "none" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: c, flex: "none" }}></span>
              <span style={{ flex: 1, font: "500 13px var(--font-display)", color: "var(--ink)" }}>{l}</span>
              <span style={{ font: "600 14px var(--font-display)", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{n}</span>
              <span style={{ font: "10px var(--font-mono)", color: "var(--text-muted)", width: 34, textAlign: "right" }}>{pct} %</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", font: "400 11.5px var(--font-display)", color: "var(--text-muted)" }}><span>Bezahlt (Meta): <b style={{ color: "var(--ink)" }}>65 %</b></span><span>Organisch: <b style={{ color: "var(--ink)" }}>35 %</b></span></div>
        <div style={{ height: 6, borderRadius: 999, background: "rgba(20,18,16,.08)", overflow: "hidden", marginTop: 10 }}><div style={{ height: "100%", width: "65%", background: "var(--signal)", borderRadius: 999 }}></div></div>
      </div>
    </BCard>
  );
}

function BtQuellen() {
  return (
    <BCard pad={28}>
      <BHead title="Quellenqualität" sub="Wie gut konvertieren Leads je Quelle." />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 110px 90px", gap: "0 16px", alignItems: "center", marginTop: 20, font: "400 12px var(--font-display)" }}>
        {["Quelle", "Leads", "Ergebnis", "Qual.-Rate"].map((h, i) => <span key={h} className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", paddingBottom: 12, textAlign: i > 0 ? "right" : "left" }}>{h}</span>)}
        {BT_SOURCES.map(([l, n, , c, q], i) => (
          <React.Fragment key={l}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 0", borderTop: "1px solid var(--hairline-dark)", font: "500 13px var(--font-display)", color: "var(--ink)" }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: c, flex: "none" }}></span>{l}</span>
            <span style={{ padding: "12px 0", borderTop: "1px solid var(--hairline-dark)", textAlign: "right", font: "600 13.5px var(--font-display)", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{n}</span>
            <span style={{ padding: "12px 0", borderTop: "1px solid var(--hairline-dark)" }}><span style={{ display: "block", height: 5, borderRadius: 999, background: "rgba(20,18,16,.08)", overflow: "hidden" }}><span style={{ display: "block", height: "100%", width: Math.min(100, n / 192 * 100) + "%", background: `color-mix(in oklch, var(--signal) ${40 + q}%, #E8E2D4)`, borderRadius: 999 }}></span></span></span>
            <span style={{ padding: "12px 0", borderTop: "1px solid var(--hairline-dark)", textAlign: "right", font: "500 12.5px var(--font-mono)", color: q >= 30 ? "var(--signal-deep)" : "var(--ink-2)" }}>{q} %</span>
          </React.Fragment>
        ))}
      </div>
    </BCard>
  );
}

function BtKampagnenBars() {
  const [ref, run] = bInView(0.35);
  const rows = [["2026_ADB_Maxing", 191], ["6_ADB_AlbrechtTownhouses", 1]];
  return (
    <BCard pad={28}>
      <BHead title="Meta-Kampagnen" sub="192 Meta-Leads · 58 % aller Interessen" />
      <div ref={ref} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 20 }}>
        {rows.map(([l, n]) => (
          <div key={l}>
            <div style={{ display: "flex", justifyContent: "space-between", font: "400 12px var(--font-display)", color: "var(--text-muted)", marginBottom: 8 }}><span style={{ font: "500 12.5px var(--font-mono)", color: "var(--ink-2)" }}>{l}</span><b style={{ color: "var(--ink)", fontWeight: 600 }}>{n}</b></div>
            <div style={{ height: 22, borderRadius: 7, background: "var(--paper-2)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: run ? Math.max(1.2, n / 191 * 100) + "%" : "0%", background: "linear-gradient(90deg, var(--signal), var(--signal-deep))", borderRadius: 7, transition: "width 1000ms var(--ease-unio)" }}></div>
            </div>
          </div>
        ))}
      </div>
    </BCard>
  );
}

function BtEinheiten() {
  const [ref, run] = bInView(0.3);
  return (
    <BCard pad={28}>
      <BHead title="Einheiten mit Nachfrage" sub="Interessen je Einheit im Projekt." />
      <div ref={ref} style={{ marginTop: 16 }}>
        {BT_EINHEITEN.map(([img, t, chip, n], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderTop: i ? "1px solid var(--hairline-dark)" : "none" }}>
            <span style={{ font: "500 11px var(--font-mono)", color: "var(--text-muted)", width: 14, flex: "none" }}>{i + 1}</span>
            <BImg src={img} alt="" style={{ width: 48, height: 40, borderRadius: 8, objectFit: "cover", flex: "none" }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ font: "500 13px var(--font-display)", color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t}</span>
                {chip && <BChip>{chip}</BChip>}
              </div>
              <div style={{ height: 4, borderRadius: 999, background: "rgba(20,18,16,.07)", overflow: "hidden", marginTop: 9 }}>
                <div style={{ height: "100%", width: run ? (n / 217 * 100) + "%" : "0%", background: "var(--signal)", borderRadius: 999, transition: `width 900ms var(--ease-unio) ${i * 70}ms` }}></div>
              </div>
            </div>
            <span style={{ font: "600 15px var(--font-display)", color: "var(--ink)", fontVariantNumeric: "tabular-nums", flex: "none" }}>{n}</span>
          </div>
        ))}
      </div>
    </BCard>
  );
}

function BtUebersicht() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <BRv><BtKpiRow /></BRv>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 22, alignItems: "start" }}>
        <BRv delay={60}><BtPipeline /></BRv>
        <BRv delay={120}><BtHandlungsbedarf /></BRv>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 22, alignItems: "start" }}>
        <BRv><BCard pad={28}>
          <BHead title="Leads pro Woche" sub="Eingegangene Interessen der letzten 12 Wochen · laufende Woche gedämpft." right={<span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>331 gesamt</span>} />
          <div style={{ marginTop: 24 }}><BBars data={BT_WEEKS.data} height={150} /></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>{BT_WEEKS.labels.map((l) => <span key={l} style={{ font: "9px var(--font-mono)", color: "var(--text-muted)" }}>{l}</span>)}</div>
        </BCard></BRv>
        <BRv delay={60}><BtHeatmap /></BRv>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 22, alignItems: "start" }}>
        <BRv><BtDonut /></BRv>
        <BRv delay={60}><BtQuellen /></BRv>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 22, alignItems: "start" }}>
        <BRv><BtKampagnenBars /></BRv>
        <BRv delay={60}><BtEinheiten /></BRv>
      </div>
    </div>
  );
}

/* ===== Leads ===== */
function BtLeads() {
  const STATUS_TONE = { Neu: "warn", Kontaktversuch: null, Kontaktiert: null, Qualifiziert: "pos", Besichtigung: "pos" };
  return (
    <BRv><BCard pad={28}>
      <BHead title="Leads" sub="331 Interessen · 297 Kontakte im Projekt." />
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 100px", gap: "0 16px", alignItems: "center", marginTop: 18 }}>
        {["Name", "Quelle", "Status", "Eingang"].map((h, i) => <span key={h} className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", paddingBottom: 12, textAlign: i === 3 ? "right" : "left" }}>{h}</span>)}
        {BT_LEADS.map(([name, quelle, status, tage, hot]) => (
          <React.Fragment key={name}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 11, padding: "13px 0", borderTop: "1px solid var(--hairline-dark)" }}>
              <span style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--paper-2)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 10.5px var(--font-display)", color: "var(--ink-2)", flex: "none" }}>{name.split(" ").map((w) => w[0]).join("")}</span>
              <span style={{ font: "500 13.5px var(--font-display)", color: "var(--ink)" }}>{name}</span>
            </span>
            <span style={{ padding: "13px 0", borderTop: "1px solid var(--hairline-dark)", font: "400 12.5px var(--font-display)", color: "var(--text-muted)" }}>{quelle}</span>
            <span style={{ padding: "13px 0", borderTop: "1px solid var(--hairline-dark)" }}><BChip tone={STATUS_TONE[status]}>{status}</BChip></span>
            <span style={{ padding: "13px 0", borderTop: "1px solid var(--hairline-dark)", textAlign: "right", font: "500 12px var(--font-mono)", color: hot ? "var(--signal-deep)" : "var(--text-muted)" }}>{tage}</span>
          </React.Fragment>
        ))}
      </div>
    </BCard></BRv>
  );
}

/* ===== Marketing ===== */
function BtMarketing() {
  const [range, setRange] = React.useState("30");
  const [chart, setChart] = React.useState("spend");
  const [ref, run] = bInView(0.25);
  const KPIS = [
    ["Ausgaben", "€ 803,82", "84 434 Impressionen · 2 072 Klicks"],
    ["Leads über Meta", "91", "43 % von 211 Interessen im Zeitraum", 43],
    ["Cost per Lead", "€ 8,83", "Meta-eigene Zählung: € 4,47 (180 Leads)"],
    ["CPL qualifiziert", "€ 42,31", "19 qualifizierte Leads"],
    ["CTR", "2,45 %", "Klicks / Impressionen"],
    ["CPC", "€ 0,39", "Ausgaben / Klicks"],
  ];
  const line = BT_LEADLINE, spend = BT_SPEND;
  const maxS = Math.max(...spend), maxL = Math.max(...line);
  const W = 100, H = 100;
  const pts = line.map((v, i) => `${(i / (line.length - 1)) * W},${H - (v / maxL) * 82}`).join(" ");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <BRv><BCard pad={22}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div style={{ display: "inline-flex", gap: 3, background: "var(--paper-2)", borderRadius: 999, padding: 3 }}>
            {["7", "30", "90"].map((r) => (
              <button key={r} onClick={() => setRange(r)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "7px 14px", background: range === r ? "#FFFFFF" : "transparent", color: range === r ? "var(--ink)" : "var(--text-muted)", font: "500 12px var(--font-display)", boxShadow: range === r ? "inset 0 0 0 1px var(--hairline-dark)" : "none" }}>{r} Tage</button>
            ))}
          </div>
          <span style={{ font: "500 12.5px var(--font-mono)", color: "var(--ink-2)" }}>08.07.2026 — 06.08.2026</span>
          <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginLeft: "auto" }}>Daten der letzten 90 Tage verfügbar</span>
        </div>
      </BCard></BRv>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 18 }}>
        {KPIS.map(([l, v, note, bar], i) => (
          <BRv key={l} delay={i * 40}><BCard pad={24}>
            <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>{l}</span>
            <div style={{ font: "600 34px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 14, fontVariantNumeric: "tabular-nums" }}>{v}</div>
            {bar != null && <div style={{ height: 4, borderRadius: 999, background: "rgba(20,18,16,.08)", overflow: "hidden", marginTop: 12 }}><div style={{ height: "100%", width: bar + "%", background: "var(--signal)", borderRadius: 999 }}></div></div>}
            <div style={{ font: "400 11.5px var(--font-display)", color: "var(--text-muted)", marginTop: 10 }}>{note}</div>
          </BCard></BRv>
        ))}
      </div>
      <BRv><BCard pad={28}>
        <BHead title="Tagesverlauf" sub="Zugeordnete Kampagnen im Zeitraum — Ausgaben, Leads, CTR und CPC pro Tag." right={
          <div style={{ display: "inline-flex", gap: 3, background: "var(--paper-2)", borderRadius: 999, padding: 3 }}>
            {[["spend", "Ausgaben & Leads"], ["ctr", "CTR"], ["cpc", "CPC"]].map(([id, l]) => (
              <button key={id} onClick={() => setChart(id)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "6px 12px", background: chart === id ? "#FFFFFF" : "transparent", color: chart === id ? "var(--ink)" : "var(--text-muted)", font: "500 11px var(--font-display)", boxShadow: chart === id ? "inset 0 0 0 1px var(--hairline-dark)" : "none" }}>{l}</button>
            ))}
          </div>
        } />
        <div ref={ref} style={{ position: "relative", height: 220, marginTop: 26 }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", gap: 6 }}>
            {spend.map((v, i) => (
              <span key={i} style={{ flex: 1, height: run ? (v / maxS * (chart === "spend" ? 100 : 55)) + "%" : "0%", background: `color-mix(in oklch, var(--signal) ${55 + (v / maxS) * 45}%, #F5EFE2)`, borderRadius: 4, transition: `height 800ms var(--ease-unio) ${i * 24}ms` }}></span>
            ))}
          </div>
          {chart === "spend" && (
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
              <polyline points={pts} fill="none" stroke="#7A4A0E" strokeWidth="0.9" strokeLinejoin="round" style={{ opacity: run ? 1 : 0, transition: "opacity 900ms var(--ease-unio) 500ms" }} />
            </svg>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
          {["08.07.", "13.07.", "18.07.", "23.07.", "28.07.", "01.08.", "06.08."].map((d) => <span key={d} style={{ font: "9px var(--font-mono)", color: "var(--text-muted)" }}>{d}</span>)}
        </div>
        <div style={{ font: "400 11.5px var(--font-display)", color: "var(--text-muted)", marginTop: 16 }}>Ausgaben (Balken) und Leads laut Meta (Linie) — getrennte Skalen, gemeinsamer Zeitverlauf.</div>
      </BCard></BRv>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 22, alignItems: "start" }}>
        <BRv><BCard pad={28}>
          <BHead title="Kampagnen" sub="1 Kampagne im Zeitraum." />
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1.3fr repeat(6, .7fr)", gap: "0 14px", alignItems: "center", marginTop: 18, font: "400 12px var(--font-display)" }}>
            {["Kampagne", "Projekt", "Ausgaben", "Impressionen", "Klicks", "Leads", "Qualifiziert", "CPL"].map((h, i) => <span key={h} className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", paddingBottom: 12, textAlign: i > 1 ? "right" : "left" }}>{h}</span>)}
            {[["2026_ADB_Maxing", "Bieterverfahren – Stilaltbau zu…", "€ 803,82", "84 434", "2 072", "91", "19", "€ 8,83"]].map((row) => row.map((cell, i) => (
              <span key={i} style={{ padding: "13px 0", borderTop: "1px solid var(--hairline-dark)", textAlign: i > 1 ? "right" : "left", font: i === 0 ? "500 12.5px var(--font-mono)" : i > 1 ? "500 13px var(--font-display)" : "400 12.5px var(--font-display)", color: i === 1 ? "var(--text-muted)" : "var(--ink)", fontVariantNumeric: "tabular-nums", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cell}</span>
            )))}
          </div>
          <div style={{ height: 4, width: 96, borderRadius: 999, background: "var(--signal)", marginTop: 4 }}></div>
        </BCard></BRv>
        <BRv delay={60}><BCard pad={28}>
          <BHead title="Besichtigungen im Zeitraum" />
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 16 }}>
            {[["Angefragt", 26, 100, null], ["Bestätigt", 16, 62, "62 %"], ["Durchgeführt", 0, 0, "0 %"]].map(([l, n, w, pct]) => (
              <div key={l}>
                <div style={{ display: "flex", justifyContent: "space-between", font: "400 12.5px var(--font-display)", color: "var(--text-muted)" }}>
                  <span>{l}</span><span><b style={{ color: "var(--ink)", fontWeight: 600 }}>{n}</b>{pct && <span style={{ font: "10px var(--font-mono)", marginLeft: 6 }}>{pct}</span>}</span>
                </div>
                <div style={{ height: 5, borderRadius: 999, background: "rgba(20,18,16,.08)", overflow: "hidden", marginTop: 8 }}><div style={{ height: "100%", width: w + "%", background: "var(--signal)", borderRadius: 999 }}></div></div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid var(--hairline-dark)", font: "400 12.5px var(--font-display)", color: "var(--text-muted)" }}>
              <span>Abgelehnt / storniert</span><b style={{ color: "#C2402A", fontWeight: 600 }}>10</b>
            </div>
          </div>
        </BCard></BRv>
      </div>
    </div>
  );
}

/* ===== Bauträger-Dashboard (Screen) ===== */
function BautraegerHome() {
  const [proj, setProj] = React.useState("all");
  const [tab, setTab] = React.useState("uebersicht");
  const { Tabs: BTabs } = window;
  return (
    <div style={{ maxWidth: 1360, margin: "0 auto" }}>
      <BRv>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap", marginTop: 26 }}>
          <div>
            <h1 style={{ margin: 0, font: "500 clamp(34px,3.4vw,46px)/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Dashboard</h1>
            <p style={{ margin: "14px 0 0", font: "400 14.5px/1.5 var(--font-display)", color: "var(--text-muted)", maxWidth: 480 }}>Wähle ein Projekt aus und sieh die dazugehörigen Kontakte und Interessen.</p>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <BtMiniStat icon="stats" v="€ 1.448" sub="Ausgaben · 90 Tage" />
            <BtMiniStat icon="kalender" v="30" sub="Besichtigungen · 90 Tage" />
          </div>
        </div>
      </BRv>
      <BRv delay={60}>
        <div style={{ display: "flex", gap: 18, marginTop: 34, overflowX: "auto", paddingBottom: 6 }}>
          {BT_PROJECTS.map((p) => <BtProjektCard key={p.id} p={p} on={proj === p.id} onPick={() => setProj(p.id)} />)}
        </div>
      </BRv>
      <BRv delay={100}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, margin: "30px 0 26px", flexWrap: "wrap" }}>
          <BTabs items={[["uebersicht", "Übersicht"], ["leads", "Leads"], ["marketing", "Marketing"]]} active={tab} onPick={setTab} />
          <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>297 Kontakte / 331 Interessen</span>
        </div>
      </BRv>
      {tab === "uebersicht" && <BtUebersicht />}
      {tab === "leads" && <BtLeads />}
      {tab === "marketing" && <BtMarketing />}
    </div>
  );
}

Object.assign(window, { BautraegerHome });
