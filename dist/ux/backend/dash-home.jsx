/* UNIO LENS — Dashboard-Home v2: große Zahlen, Weißraum, Orange-Verläufe. */
const { Reveal: DRv, RevealL: DRvL, BigNum, Card: DCard, CardHead, AreaChart, Bars, Ring, Chip: DChip } = window;

/* Masonry-Zelle: misst die natürliche Inhaltshöhe und übersetzt sie in feine Grid-Reihen (8px-Einheit, 24px-Gap) — Kacheln behalten ihre echte Höhe, das Raster packt dicht ohne Streckung. */
function Mason({ span, delay, children }) {
  const ref = React.useRef(null);
  const [rows, setRows] = React.useState(12);
  React.useLayoutEffect(() => {
    const el = ref.current; if (!el) return undefined;
    let raf = 0;
    const measure = () => { const h = el.offsetHeight; if (!h) return; const n = Math.max(2, Math.ceil((h + 24) / 32)); setRows((r) => (r === n ? r : n)); };
    measure();
    const ro = new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); });
    ro.observe(el);
    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div style={{ gridColumn: "span " + span, gridRowEnd: "span " + rows, minWidth: 0 }}>
      <DRv delay={delay}><div ref={ref}>{children}</div></DRv>
    </div>
  );
}

const KPI = [
  { v: 12, sub: "Neue Leads · 7 Tage", spark: [4, 6, 5, 8, 7, 9, 10, 12], deltaN: 22 },
  { v: 41, sub: "Objekte in Vermarktung", spark: [30, 32, 31, 35, 38, 37, 40, 41], deltaN: 8 },
  { v: 6, sub: "Offene Angebote", spark: [2, 3, 3, 4, 4, 5, 5, 6], deltaN: 12 },
  { kind: "provision", earned: 33350, abger: 31200, referral: 2150, percentile: 22, sub: "Verdiente Provision" },
];
const PIPE = [["Qualifiziert", 41, 100], ["Besichtigt", 22, 54], ["Angebot", 9, 22], ["Kaufvertrag", 4, 10]];
const ACT = [
  ["Lead telefonisch kontaktieren", "Refugium am Waldrand · seit 2 h offen", "warn", "Jetzt"],
  ["Kaufanbot prüfen", "Villa Ecoluxe · Elena Novak", null, "Heute"],
  ["Exposé freigeben", "Zinshaus Stockerauer Straße", null, "Diese Woche"],
];
const OBJ = [
  { img: "/assets/img/albrecht.jpg", t: "Das Albrecht — Townhäuser", loc: "1170 Wien", score: 94, price: "€ 6 240/m²" },
  { img: "/assets/img/obenzwei.jpg", t: "Obenzwei — Penthouse", loc: "1020 Wien", score: 88, price: "€ 8 950/m²" },
  { img: "/assets/img/beheim.jpg", t: "Penthouse Beheim", loc: "1170 Wien", score: 91, price: "€ 7 480/m²" },
];

function DashHome({ onNav, kopfAus }) {
  const [custom, setCustom] = React.useState(false);
  const [classic, setClassic] = React.useState(() => { try { return localStorage.getItem("unio-dash-style") === "classic"; } catch (e) { return false; } });
  React.useEffect(() => { document.body.classList.toggle("dash-classic", classic); try { localStorage.setItem("unio-dash-style", classic ? "classic" : "light"); } catch (e) {} window.dispatchEvent(new CustomEvent("unio-style", { detail: classic })); }, [classic]);
  React.useEffect(() => { const f = (e) => setClassic(!!e.detail); window.addEventListener("unio-style", f); return () => window.removeEventListener("unio-style", f); }, []);
  const WIDGETS = {
    actions: { span: 5, node: (
      <DCard>
        <CardHead title="Nächste Schritte" right={<span style={{ display: "inline-flex", gap: 6 }}>
          <button style={{ border: "none", cursor: "pointer", background: "transparent", font: "600 9px var(--font-mono)", letterSpacing: "0.1em", padding: "5px 10px", borderRadius: 999, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}>24 OFFEN</button>
          <button style={{ border: "none", cursor: "pointer", background: "transparent", font: "600 9px var(--font-mono)", letterSpacing: "0.1em", padding: "5px 10px", borderRadius: 999, boxShadow: "inset 0 0 0 1px rgba(194,64,42,0.35)", color: "#C2402A" }}>3 ÜBERFÄLLIG</button>
        </span>} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ACT.map(([t, s, tone, when], i) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 13, padding: "15px 17px", borderRadius: 10, background: i === 0 ? "var(--signal-soft)" : "transparent", boxShadow: i === 0 ? "inset 0 0 0 1px rgba(255,170,9,0.3)" : "inset 0 0 0 1px var(--hairline-dark)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", flex: "none", background: i === 0 ? "var(--signal)" : "var(--paper-3)", animation: i === 0 ? "uPulse 2.2s var(--ease-unio) infinite" : "none" }}></span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: "500 14px var(--font-display)", color: "var(--ink)" }}>{t}</div>
                <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 4 }}>{s}</div>
              </div>
              <span className="u-label" style={{ fontSize: 8.5, color: tone === "warn" ? "var(--signal-deep)" : "var(--text-muted)", whiteSpace: "nowrap" }}>{when}</span>
            </div>
          ))}
        </div>
      </DCard>
    ) },
    kalender: { span: 3, node: <KalenderPreview onNav={onNav} /> },
    pipeline: { span: 5, node: (
      <DCard>
        <CardHead title="Vom Lead zum Abschluss" right={<DChip>Q3 2026</DChip>} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 6 }}>
          {PIPE.map(([n, v, pct], i) => (
            <div key={n} style={{ display: "grid", gridTemplateColumns: "130px 1fr 46px", gap: 16, alignItems: "center" }}>
              <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 10 }}>{n}</span>
              <PipeBar pct={pct} i={i} />
              <span style={{ font: "14px var(--font-mono)", color: "var(--ink)", textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>
      </DCard>
    ) },
    provision: { span: 3, node: <Provisionsstand /> },
    // Katalog-Widgets = echte Karten von der Statistik-Seite
    erstkontakt: { span: 6, label: "Erstkontakt-Quote (Statistik)", node: (
      <DCard>
        <CardHead label="Performance" title="Erstkontakt-Quote" right={<DChip>2 h</DChip>} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
          <p style={{ margin: 0, font: "400 14px/1.6 var(--font-display)", color: "var(--text-muted)", maxWidth: 300 }}>Wie schnell dein erster Anruf beim Lead sitzt — der stärkste Hebel auf die Abschlussquote.</p>
          <div style={{ textAlign: "right" }}>
            <div style={{ font: "500 clamp(48px, 5vw, 72px)/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>84 <span style={{ fontSize: "0.4em", color: "var(--signal-deep)" }}>%</span></div>
            <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 9, marginTop: 8 }}>innerhalb 2 h kontaktiert</div>
          </div>
        </div>
        <div style={{ marginTop: 18 }}><PipeBar pct={84} i={0} /></div>
      </DCard>
    ) },
    verlauf: { span: 6, label: "Aktivitätsverlauf (Statistik)", node: (
      <DCard>
        <CardHead label="Verlauf" title="Aktivität · 30 Tage" right={<span className="u-label" style={{ color: "var(--text-muted)", fontSize: 9 }}>Anfragen · Views</span>} />
        <window.AreaChart data={[8, 12, 10, 16, 14, 20, 18, 24, 21, 27, 24, 30, 28, 34]} height={140} />
      </DCard>
    ) },
    statusmix: { span: 4, label: "Status-Mix (Statistik)", node: (
      <DCard>
        <CardHead label="Status-Mix" title="Objekt-Portfolio" />
        <SegBar segs={STATUSMIX} total={STATUSMIX.reduce((s, m) => s + m[1], 0)} />
        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 16 }}>
          {STATUSMIX.map(([n, v, c]) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--hairline-dark)" }}>
              <span style={{ width: 9, height: 9, borderRadius: 3, background: c, flex: "none" }}></span>
              <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)", flex: 1 }}>{n}</span>
              <span style={{ font: "13px var(--font-mono)", color: "var(--ink)" }}>{v}</span>
            </div>
          ))}
        </div>
      </DCard>
    ) },
    herkunft: { span: 4, label: "Kontakt-Herkunft (Statistik)", node: (
      <DCard>
        <CardHead label="Kontakt-Herkunft" title="Woher die Leads kommen" />
        {[["Meta", 62], ["willhaben", 44], ["ImmobilienScout24", 28], ["Direkt / Empfehlung", 14]].map(([n, v], i) => (
          <MiniHerkunft key={n} n={n} v={v} max={62} i={i} />
        ))}
      </DCard>
    ) },
    immobilien: { span: 3, label: "Meine Immobilien", node: (
      <DCard>
        <CardHead label="Portfolio" title="Meine Immobilien" right={<DChip>12</DChip>} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[["Das Albrecht — Haus 4", "Aktiv · 1170 Wien"], ["Villa Ecoluxe", "Aktiv · 1140 Wien"]].map(([t, s]) => (
            <div key={t} style={{ padding: "12px 14px", borderRadius: 10, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
              <div style={{ font: "500 13px var(--font-display)", color: "var(--ink)" }}>{t}</div>
              <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 4 }}>{s}</div>
            </div>
          ))}
        </div>
      </DCard>
    ) },
    streak: { span: 3, label: "Erstkontakt-Streak", node: <StreakWidget /> },
    circle: { span: 3, label: "Community (CIRCLE)", node: <window.CircleHomeWidget onNav={onNav} /> },
    referral: { span: 3, label: "Referral (CIRCLE)", node: <window.ReferralCard /> },
  };
  const CATALOG = ["erstkontakt", "verlauf", "statusmix", "herkunft", "immobilien", "streak", "circle", "referral"];
  const [order, setOrder] = React.useState(["actions", "kalender", "pipeline", "provision", "referral", "circle"]);
  const DEFAULT_ORDER = ["actions", "kalender", "pipeline", "provision", "referral", "circle"];
  const WLABEL = { actions: "Nächste Schritte", kalender: "Kalender", pipeline: "Pipeline", provision: "Provisionsstand", circle: "Community (CIRCLE)" };
  const removed = CATALOG.concat(DEFAULT_ORDER).filter((id) => !order.includes(id));
  const SPANS = [3, 4, 5, 6];
  const drag = React.useRef(null);
  const [over, setOver] = React.useState(null);
  const onDrop = (target) => {
    const from = drag.current; drag.current = null; setOver(null);
    if (!from) return;
    setOrder((o) => {
      const a = o.filter((x) => x !== from);
      const idx = target ? a.indexOf(target) : a.length;
      a.splice(idx < 0 ? a.length : idx, 0, from);
      return a;
    });
  };
  const [spanOverride, setSpanOverride] = React.useState({});
  const spanOf = (id) => spanOverride[id] || WIDGETS[id].span;
  const cycleSpan = (id) => setSpanOverride((s) => ({ ...s, [id]: SPANS[(SPANS.indexOf(spanOf(id)) + 1) % SPANS.length] }));
  return (
    <div style={{ maxWidth: 1360, margin: "0 auto", paddingBottom: custom ? 80 : 0 }}>
      {/* Utility-Leiste (Datum · Anpassen · Live) */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginTop: 4, flexWrap: "wrap" }}>
        <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>Donnerstag, 16. Juli 2026</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button aria-label="Anpassen" onClick={() => setCustom((v) => !v)} style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "none", cursor: "pointer", borderRadius: 999, padding: "8px 14px", background: custom ? "var(--ink)" : "transparent", boxShadow: custom ? "none" : "inset 0 0 0 1px var(--hairline-dark)", font: "500 12px var(--font-display)", color: custom ? "var(--paper)" : "var(--text-muted)" }}><window.Icon name="sliders" size={14} stroke={custom ? "var(--paper)" : "var(--text-muted)"} />{custom ? "Fertig" : "Anpassen"}</button>
        <DChip tone="pos"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)" }}></span>Alle Portale synchron</DChip>
        </div>
      </div>

      {/* ZONE 1 · Kopf: Textblock, darunter das Stat-Band (eine Achse, eine Baseline) */}
      {!kopfAus && (
        <DRvL style={{ marginTop: 72 }}>
          <h1 style={{ margin: 0, font: "600 clamp(38px, 4.6vw, 64px)/1.05 var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>Guten Morgen, Daniel.</h1>
          <p style={{ margin: "22px 0 0", font: "400 17px/1.55 var(--font-display)", color: "rgba(20,18,16,.55)", maxWidth: 480 }}>Seit gestern: 2 neue Leads, die Nachfrage zur Villa Ecoluxe zieht an. Dein stärkster Hebel heute: Antwortzeit.</p>
        </DRvL>
      )}
      <DRv style={kopfAus ? { marginTop: 8 } : null}><StatBand onNav={onNav} /></DRv>
      {/* Erstkontakt-Quote — 1:1 das Statistik-Modul, direkt unter den Zahlen */}
      <DRv style={{ marginTop: 56 }}><ErstkontaktModul /></DRv>

      {/* ZONE 2 · Drei-Spalten-Bento (Reihe A+B verzahnt) */}
      <div className="dash-bento" style={{ marginTop: kopfAus ? 40 : 72, display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", gridAutoRows: 8, columnGap: 24, rowGap: 24, gridAutoFlow: "row dense", alignItems: "start" }}>
        {/* Links, 4 Spalten — der Tages-Anker in natürlicher Höhe */}
        <Mason span={4}><TagesTimeline onNav={onNav} /></Mason>
        {order.map((id, i) => {
          const w = WIDGETS[id];
          const span = spanOf(id);
          const dragging = drag.current === id;
          return (
            <Mason key={id} span={span} delay={60 + i * 40}>
              <div
                draggable={custom}
                onDragStart={(e) => { drag.current = id; if (e.dataTransfer) e.dataTransfer.effectAllowed = "move"; }}
                onDragEnd={() => { drag.current = null; setOver(null); }}
                onDragOver={(e) => { if (custom) { e.preventDefault(); if (over !== id) setOver(id); } }}
                onDrop={() => onDrop(id)}
                style={{ position: "relative", display: "flex", flexDirection: "column", borderRadius: 14, cursor: custom ? "grab" : "default", boxShadow: over === id && custom ? "0 0 0 2px var(--signal)" : custom ? "0 0 0 1.5px var(--hairline-dark)" : "none", transition: "box-shadow 200ms var(--ease-unio), transform 300ms var(--ease-unio)", transform: custom ? "translateY(-2px)" : "none", opacity: dragging ? 0.4 : 1 }}
              >
                {custom && (
                  <div style={{ position: "absolute", top: 10, left: 10, right: 10, zIndex: 5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ display: "inline-flex", padding: "5px 8px", borderRadius: 8, background: "#FBFAF6", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", pointerEvents: "none" }}><window.Icon name="grid" size={13} stroke="var(--text-muted)" /></span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button aria-label="Größe" onClick={() => cycleSpan(id)} style={{ cursor: "pointer", height: 26, padding: "0 11px", borderRadius: 999, border: "none", background: "#FBFAF6", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "600 10px var(--font-mono)", letterSpacing: "0.08em", color: "var(--ink)" }}>{["S", "M", "L", "XL"][SPANS.indexOf(span)]}</button>
                      <button aria-label="Entfernen" onClick={() => setOrder((o) => o.filter((x) => x !== id))} style={{ width: 26, height: 26, borderRadius: "50%", border: "none", cursor: "pointer", background: "#FBFAF6", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}><window.Icon name="x" size={13} stroke="var(--text-muted)" /></button>
                    </div>
                  </div>
                )}
                <div style={{ flex: 1, display: "grid", opacity: custom ? 0.96 : 1, pointerEvents: custom ? "none" : "auto" }}>{w.node}</div>
              </div>
            </Mason>
          );
        })}
        {custom && (
          <div onDragOver={(e) => { e.preventDefault(); setOver(null); }} onDrop={() => onDrop(null)} style={{ gridColumn: "span 3", gridRowEnd: "span 5", minHeight: 120, borderRadius: 14, border: "1.5px dashed " + (over === null && drag.current ? "var(--signal)" : "var(--hairline-dark)"), display: "flex", alignItems: "center", justifyContent: "center", color: over === null && drag.current ? "var(--signal-deep)" : "var(--text-muted)", background: over === null && drag.current ? "var(--signal-soft)" : "transparent", transition: "all 200ms var(--ease-unio)" }}>
            <span className="u-label" style={{ fontSize: 9 }}>Hierher ziehen</span>
          </div>
        )}
      </div>

      {/* Off-Canvas Katalog beim Anpassen */}
      {custom && (
        <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 320, maxWidth: "86vw", zIndex: 95, background: "#FBFAF6", boxShadow: "-24px 0 60px -30px rgba(11,10,9,0.4)", borderLeft: "1px solid var(--hairline-dark)", display: "flex", flexDirection: "column", animation: "dashPanelIn 500ms var(--ease-unio)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 22px 16px", borderBottom: "1px solid var(--hairline-dark)" }}>
            <div>
              <div style={{ font: "500 17px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Bausteine</div>
              <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 5 }}>Ziehen oder klicken zum Hinzufügen</div>
            </div>
            <button aria-label="Schließen" onClick={() => setCustom(false)} style={{ width: 30, height: 30, borderRadius: "50%", border: "none", cursor: "pointer", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}><window.Icon name="close" size={14} stroke="var(--text-muted)" /></button>
          </div>
          <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--hairline-dark)" }}>
            <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginBottom: 10 }}>Darstellung</div>
            <div style={{ display: "inline-flex", gap: 4, background: "#FFFFFF", borderRadius: 999, padding: 4, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
              {[["Klassisch", true], ["Leicht", false]].map(([l, val]) => (
                <button key={l} onClick={() => setClassic(val)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "7px 16px", background: classic === val ? "var(--ink)" : "transparent", color: classic === val ? "var(--paper)" : "var(--text-muted)", font: "500 12px var(--font-display)", transition: "background .25s var(--ease-unio)" }}>{l}</button>
              ))}
            </div>
            <div className="u-label" style={{ fontSize: 7.5, color: "var(--text-muted)", marginTop: 8 }}>Gilt systemweit auf allen Seiten</div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 22px 22px", display: "flex", flexDirection: "column", gap: 10 }}>
            {removed.length === 0 && <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>Alle Bausteine aktiv.</span>}
            {removed.map((id) => (
              <div key={id} draggable onDragStart={(e) => { drag.current = id; if (e.dataTransfer) e.dataTransfer.effectAllowed = "move"; }} onDragEnd={() => { drag.current = null; setOver(null); }} onClick={() => setOrder((o) => [...o, id])}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 15px", borderRadius: 11, cursor: "grab", background: "#FFFFFF", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", transition: "box-shadow 200ms" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "inset 0 0 0 1.5px var(--signal)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "inset 0 0 0 1px var(--hairline-dark)")}>
                <span style={{ width: 34, height: 34, borderRadius: 8, flex: "none", background: "var(--signal-soft)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><window.Icon name={CATALOG.includes(id) ? "chart" : "grid"} size={16} stroke="var(--signal-deep)" /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: "500 13px var(--font-display)", color: "var(--ink)" }}>{w2label(id, WLABEL, WIDGETS)}</div>
                  <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 3 }}>{CATALOG.includes(id) ? "Statistik-Widget" : "Standard-Baustein"}</div>
                </div>
                <span style={{ color: "var(--signal-deep)", fontSize: 18, lineHeight: 1 }}>+</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, padding: "16px 22px", borderTop: "1px solid var(--hairline-dark)" }}>
            <button onClick={() => { setOrder(DEFAULT_ORDER); setSpanOverride({}); }} style={{ flex: 1, border: "none", cursor: "pointer", borderRadius: 999, padding: "11px 0", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "500 12px var(--font-display)", color: "var(--text-muted)" }}>Zurücksetzen</button>
            <button onClick={() => setCustom(false)} style={{ flex: 1, border: "none", cursor: "pointer", borderRadius: 999, padding: "11px 0", background: "var(--signal)", color: "var(--on-signal)", font: "500 12px var(--font-display)" }}>Fertig</button>
          </div>
        </div>
      )}

      {/* ZONE 3 · Reihe C: Performance + Watchlist */}
      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "minmax(0, 7fr) minmax(0, 5fr)", gap: 24, alignItems: "start" }}>
        <DRv><DCard style={{ height: "100%" }}>
          <CardHead title="Reichweite & Anfragen" right={<DChip>30 Tage</DChip>} />
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "center" }}>
            <BigNum value={48200} sub="Impressionen · 30 Tage" />
            <Bars data={[8, 12, 9, 15, 13, 18, 16, 22, 19, 24, 21, 27]} height={96} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 0, marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--hairline-dark)" }}>
            {[["Ø Score", "87"], ["Ø Antwortzeit", "< 2 h"], ["Qualifiziert", "41 %"]].map(([k, v], i) => (
              <div key={k} style={{ paddingLeft: i === 0 ? 0 : 20, boxShadow: i === 0 ? "none" : "inset 1px 0 0 var(--hairline-dark)" }}>
                <div style={{ font: "17px var(--font-mono)", color: "var(--ink)" }}>{v}</div>
                <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 6 }}>{k}</div>
              </div>
            ))}
          </div>
        </DCard></DRv>
        <DRv delay={70}><Watchlist onNav={onNav} /></DRv>
      </div>

      {/* ZONE 4 · Objekte in Vermarktung */}
      <DRv>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "96px 4px 24px" }}>
          <h2 style={{ margin: 0, font: "500 22px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Objekte in Vermarktung</h2>
          <button onClick={() => onNav && onNav("objekte")} style={{ background: "none", border: "none", cursor: "pointer", font: "500 13px var(--font-display)", color: "var(--signal-deep)" }}>Alle ansehen →</button>
        </div>
      </DRv>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 24 }}>
        {OBJ.map((o, i) => (
          <DRv key={o.t} delay={i * 70}>
            <div onClick={() => onNav && onNav("objekte")} style={{ cursor: "pointer" }}>
              <DCard pad={10} hover>
                <div style={{ position: "relative", borderRadius: 8, overflow: "hidden" }}>
                  <img src={o.img} alt={o.t} style={{ display: "block", width: "100%", height: 172, objectFit: "cover" }} />
                  <span className="u-label" style={{ position: "absolute", top: 12, left: 12, fontSize: 9, padding: "6px 11px", borderRadius: 999, background: "var(--glass-dark)", WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)", color: "var(--text-inverse)", display: "inline-flex", alignItems: "center", gap: 7 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)" }}></span>Aktiv</span>
                </div>
                <div style={{ padding: "16px 14px 12px" }}>
                  <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 9 }}>{o.loc}</div>
                  <div style={{ font: "500 17px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 8 }}>{o.t}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, borderTop: "1px solid var(--hairline-dark)", paddingTop: 13 }}>
                    <span style={{ font: "14px var(--font-mono)", color: "var(--ink-2)" }}>{o.price}</span>
                    <span style={{ font: "13px var(--font-mono)", color: "var(--text-muted)" }}>↗</span>
                  </div>
                </div>
              </DCard>
            </div>
          </DRv>
        ))}
      </div>
    </div>
  );
}

function ArrowCircle({ onClick }) {
  return <button onClick={onClick} aria-label="Details" style={{ width: 34, height: 34, borderRadius: "50%", flex: "none", border: "none", cursor: "pointer", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--ink-2)" }}><window.Icon name="arrow" size={14} stroke="var(--ink-2)" style={{ transform: "rotate(-45deg)" }} /></button>;
}

function NakedKpi({ k, first, onNav }) {
  const { useCountUp, useInView } = window;
  const [ref, run] = useInView(0.4);
  const [hov, setHov] = React.useState(false);
  const n = useCountUp(k.v, run, 1100);
  const val = run ? (k.v >= 1000 ? Math.round(n).toLocaleString("de-AT") : Math.round(n)) : 0;
  const dPos = k.deltaN > 0;
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => onNav && onNav("stats")}
      style={{ cursor: "pointer", padding: first ? "4px 28px 4px 0" : "4px 28px", boxShadow: first ? "none" : "inset 1px 0 0 var(--hairline-dark)" }}>
      <div style={{ font: "500 clamp(34px,3.4vw,46px)/1 var(--font-display)", letterSpacing: "-0.03em", color: hov ? "var(--signal-deep)" : "var(--ink)", fontVariantNumeric: "tabular-nums", transition: "color 300ms var(--ease-unio)" }}>
        {k.prefix && <span style={{ fontSize: "0.5em", color: "rgba(11,10,9,0.4)", marginRight: 3 }}>{k.prefix}</span>}{val}{k.unit && <span style={{ fontSize: "0.45em", color: "rgba(11,10,9,0.4)", marginLeft: 5 }}>{k.unit}</span>}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
        <span className="u-label" style={{ fontSize: 9, color: "rgba(11,10,9,0.45)" }}>{k.sub}</span>
        <span style={{ font: "11px var(--font-mono)", color: dPos ? "var(--signal-deep)" : "rgba(11,10,9,0.4)" }}>{dPos ? "+" : ""}{k.deltaN} %</span>
        {k.pz && <span className="u-label" style={{ fontSize: 7.5, padding: "4px 9px", borderRadius: 999, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--signal-deep)" }}>{k.pz}</span>}
      </div>
    </div>
  );
}
/* ===== v2.7 §2 · Stat-Band: alle Kopf-Kennzahlen als EINE kompakte Gruppe, eine Baseline ===== */
function StatBand({ onNav }) {
  const { useCountUp, useInView } = window;
  const [ref, run] = useInView(0.4);
  const divider = <span className="dash-kpi-div" aria-hidden="true" style={{ width: 1, height: 44, alignSelf: "baseline", background: "rgba(20,18,16,.14)", fontSize: 0 }}></span>;
  return (
    <div ref={ref} className="dash-statband" style={{ display: "flex", alignItems: "baseline", columnGap: "clamp(20px, 2.4vw, 44px)", rowGap: 28, marginTop: 64, flexWrap: "wrap" }}>
      {/* Vier KPIs: Neue Leads · Aktive Leads · In Vermarktung · Offene Angebote */}
      {KPI.map((k, i) => <React.Fragment key={k.sub}>{i > 0 && divider}{k.kind === "provision" ? <ProvisionBandKpi k={k} onNav={onNav} /> : <BandKpi k={k} onNav={onNav} />}</React.Fragment>)}
    </div>
  );
}
function BandKpi({ k, onNav }) {
  const { useCountUp, useInView } = window;
  const [ref, run] = useInView(0.4);
  const [hov, setHov] = React.useState(false);
  const n = useCountUp(k.v, run, 1100);
  const val = run ? (k.v >= 1000 ? Math.round(n).toLocaleString("de-AT") : Math.round(n)) : 0;
  const dPos = k.deltaN > 0;
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => onNav && onNav("stats")} style={{ cursor: "pointer" }}>
      <div style={{ font: "600 clamp(30px, 3vw, 46px)/1 var(--font-display)", letterSpacing: "-0.01em", color: hov ? "var(--signal-deep)" : "var(--ink)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", transition: "color 300ms var(--ease-unio)" }}>
        {k.prefix && <span style={{ fontSize: 24, color: "rgba(20,18,16,.4)", marginRight: 4, fontWeight: 500 }}>{k.prefix}</span>}{val}{k.unit && <span style={{ fontSize: 20, color: "rgba(20,18,16,.4)", marginLeft: 6, fontWeight: 500 }}>{k.unit}</span>}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 12, whiteSpace: "nowrap" }}>
        <span className="u-label" style={{ fontSize: 10, color: "rgba(20,18,16,.45)", whiteSpace: "nowrap" }}>{k.sub}</span>
        <span style={{ font: "10px var(--font-mono)", letterSpacing: "0.14em", color: dPos ? "var(--signal)" : "rgba(20,18,16,.4)" }}>{dPos ? "+" : ""}{k.deltaN}&nbsp;%</span>
      </div>
    </div>
  );
}
/* Verdiente Provision (Provisionsstand + Referral, kumuliert) — mit selbst wählbarem Ziel und Vergleich zur CIRCLE-Community. */
const PROV_TARGET_KEY = "unio_provision_target";
const PROV_TARGET_EVT = "unio-prov-target";
function useProvTarget() {
  const read = () => { const s = Number(window.localStorage && localStorage.getItem(PROV_TARGET_KEY)); return s >= 5000 ? s : 50000; };
  const [target, set] = React.useState(read);
  React.useEffect(() => {
    const h = () => set(read());
    window.addEventListener(PROV_TARGET_EVT, h);
    return () => window.removeEventListener(PROV_TARGET_EVT, h);
  }, []);
  const setTarget = (v) => { try { localStorage.setItem(PROV_TARGET_KEY, String(v)); } catch (e) {} set(v); window.dispatchEvent(new Event(PROV_TARGET_EVT)); };
  return [target, setTarget];
}
window.useProvTarget = useProvTarget;
function ProvisionBandKpi({ k, onNav }) {
  const { useCountUp, useInView } = window;
  const [ref, run] = useInView(0.4);
  const [hov, setHov] = React.useState(false);
  const [target] = useProvTarget();
  const n = useCountUp(k.earned, run, 1200);
  const val = run ? Math.round(n).toLocaleString("de-AT") : 0;
  const pct = Math.min(100, Math.round((k.earned / target) * 100));
  return (
    <div ref={ref} style={{ position: "relative" }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => onNav && onNav("stats")}>
      <div style={{ cursor: "pointer" }}>
        <div style={{ font: "600 clamp(30px, 3vw, 46px)/1 var(--font-display)", letterSpacing: "-0.01em", color: hov ? "var(--signal-deep)" : "var(--ink)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", transition: "color 300ms var(--ease-unio)", display: "inline-flex", alignItems: "flex-start" }}>
          <span><span style={{ fontSize: 24, color: "rgba(20,18,16,.4)", marginRight: 4, fontWeight: 500 }}>€</span>{val}</span>
          <sup style={{ font: "600 10px var(--font-mono)", letterSpacing: "0.1em", color: "var(--signal-deep)", background: "var(--signal-soft)", borderRadius: 999, padding: "4px 9px", marginLeft: 8, top: 2, position: "relative", whiteSpace: "nowrap" }}>TOP {k.percentile}&nbsp;%</sup>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 12, whiteSpace: "nowrap" }}>
          <span className="u-label" style={{ fontSize: 10, color: "rgba(20,18,16,.45)" }}>{k.sub}</span>
          <span style={{ font: "10px var(--font-mono)", letterSpacing: "0.14em", color: "var(--signal)" }}>{pct}&nbsp;% VOM ZIEL</span>
        </div>
      </div>
    </div>
  );
}

/* Erstkontakt-Quote — identisches Modul wie auf der Statistik-Seite */
function ErstkontaktModul() {
  const { Card: C, CardHead: CH, RecoCard: Reco } = window;
  return (
    <C>
      <CH label="Performance" title="Erstkontakt-Quote" right={<span className="u-label" style={{ fontSize: 9, padding: "5px 11px", borderRadius: 999, background: "var(--signal-soft)", color: "var(--signal-deep)" }}>Bearbeitet</span>} />
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 40, alignItems: "center" }}>
        <div>
          <p style={{ margin: "0 0 22px", font: "400 15px/1.6 var(--font-display)", color: "var(--text-muted)", maxWidth: 380 }}>Wie schnell dein erster Anruf beim Lead sitzt — der stärkste Hebel auf die Abschlussquote.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Reco tone="hi" label="Eingegangene Leads 7 Tage" value="45" style={{ minWidth: 150, padding: "18px 20px" }} />
            <div style={{ minWidth: 150, borderRadius: 12, padding: "18px 20px", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
              <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5 }}>First Lead Call erledigt</div>
              <div style={{ font: "500 30px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 14, fontVariantNumeric: "tabular-nums" }}>38</div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ font: "500 clamp(56px, 6vw, 92px)/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>84 <span style={{ fontSize: "0.4em", color: "var(--signal-deep)" }}>%</span></div>
          <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 9, marginTop: 10 }}>innerhalb 2 h kontaktiert</div>
          <div style={{ marginTop: 18 }}><window.PipeBar pct={84} i={0} /></div>
          <div style={{ font: "600 9px var(--font-mono)", letterSpacing: "0.12em", color: "var(--text-muted)", marginTop: 12 }}>QUALIFIZIERUNGSQUOTE STABIL · 64 %</div>
        </div>
      </div>
    </C>
  );
}
function ErstkontaktStatUNUSED({ onNav }) {
  const { useCountUp, useInView } = window;
  const [ref, run] = useInView(0.4);
  return (
    <div ref={ref} onClick={() => onNav && onNav("stats")} style={{ cursor: "pointer", minWidth: 300, maxWidth: 340, textAlign: "right" }}>
      <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>Erstkontakt-Quote · 7 Tage</div>
      <div style={{ font: "500 clamp(72px, 8vw, 116px)/0.86 var(--font-display)", letterSpacing: "-0.04em", color: "var(--ink)", fontVariantNumeric: "tabular-nums", marginTop: 8 }}>{Math.round(pct)}<span style={{ fontSize: "0.4em", color: "var(--signal-deep)", marginLeft: 2 }}>%</span></div>
      {/* Skalen-Lineal */}
      <div style={{ marginTop: 20 }}>
        <div style={{ position: "relative", height: 6, borderRadius: 3, background: "#EFEAE2", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: (run ? 84 : 0) + "%", background: "var(--signal)", borderRadius: 3, transition: "width 900ms var(--ease-unio)" }}></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span className="u-label" style={{ fontSize: 7.5, color: "rgba(11,10,9,0.4)" }}>innerhalb 2 h kontaktiert</span>
          <span className="u-label" style={{ fontSize: 7.5, color: "rgba(11,10,9,0.4)" }}>Ziel 90 %</span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        {[["45", "Leads eingegangen"], ["38", "First Calls erledigt"]].map(([v, l], i) => (
          <div key={l} style={{ padding: i === 0 ? "0 20px 0 0" : "0 0 0 20px", boxShadow: i === 0 ? "none" : "inset 1px 0 0 var(--hairline-dark)", textAlign: i === 0 ? "right" : "left" }}>
            <div style={{ font: "500 18px var(--font-display)", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{v}</div>
            <div className="u-label" style={{ fontSize: 7.5, color: "var(--text-muted)", marginTop: 5 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
const HEUTE = [
  ["leads", "Sophie Berger", "Neuer Lead · Penthouse Beheim · vor 2 h"],
  ["leads", "Markus Wolf", "Neuer Lead · Das Albrecht · vor 5 h"],
  ["kalender", "Beheim · 09:30", "Besichtigung · Sophie Berger"],
  ["kalender", "Ecoluxe · 14:00", "Besichtigung · Elena Novak"],
];

/* ===== v2.4 §4 · Tages-Timeline "Dein Tag" (hohe linke Karte) ===== */
const WOCHE = [["Mo", 13], ["Di", 14], ["Mi", 15], ["Do", 16, true], ["Fr", 17], ["Sa", 18], ["So", 19]];
const TAG = [
  { t: "08:00", kind: "lead", title: "Neuer Lead · Sophie Berger", sub: "Penthouse Beheim · vor 2 h" },
  { t: "09:30", kind: "termin", title: "Besichtigung · Beheim", sub: "09:30 · Sophie Berger", next: true },
  { t: "11:00", kind: "lead", title: "Neuer Lead · Markus Wolf", sub: "Das Albrecht · vor 5 h" },
  { t: "12:30", kind: "termin", title: "Rückruf · Elena Novak", sub: "12:30 · Villa Ecoluxe" },
  { t: "14:00", kind: "termin", title: "Besichtigung · Ecoluxe", sub: "14:00 · Elena Novak", confirm: true },
  { t: "15:30", kind: "lead", title: "Neuer Lead · Jonas Reiter", sub: "ObenZwei · vor 20 min" },
  { t: "16:30", kind: "termin", title: "Übergabe · Albrecht Top 4", sub: "16:30 · Familie Berger" },
];
function TagesTimeline({ onNav }) {
  const { Card: C, Icon: Ic } = window;
  const [ref, run] = window.useInView(0.25);
  const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
  return (
    <C style={{ height: "100%", display: "flex", flexDirection: "column", maxHeight: 560, minHeight: 0 }}>
      <CardHead title="Dein Tag" right={<ArrowCircle onClick={() => onNav && onNav("kalender")} />} />
      {/* Wochenstrip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 4, marginBottom: 26 }}>
        {WOCHE.map(([d, n, today]) => (
          <div key={d} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "6px 0", cursor: "pointer" }}>
            <span className="u-label" style={{ fontSize: 8, color: "var(--text-muted)" }}>{d}</span>
            <span style={{ width: 28, height: 28, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 13px var(--font-display)", background: today ? "var(--ink)" : "transparent", color: today ? "var(--paper)" : "var(--ink-2)" }}>{n}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: [15, 16, 17].includes(n) ? "var(--signal)" : "transparent" }}></span>
          </div>
        ))}
      </div>
      {/* Zeitschiene */}
      <div ref={ref} style={{ position: "relative", flex: 1, minHeight: 0, paddingLeft: 52, overflowY: "auto" }}>
        <div style={{ position: "absolute", left: 44, top: 0, bottom: 0, width: 1.5, background: "var(--hairline-dark)" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: run ? "100%" : "0%", background: "linear-gradient(var(--hairline-dark), var(--hairline-dark))", transition: "height 600ms var(--ease-unio)" }}></div>
        </div>
        {/* Jetzt-Linie */}
        <div style={{ position: "absolute", left: 30, right: 0, top: "38%", display: "flex", alignItems: "center", gap: 0, opacity: run ? 1 : 0, transition: "opacity 500ms var(--ease-unio) 600ms" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--signal)", flex: "none" }}></span>
          <span style={{ flex: 1, height: 1.5, background: "var(--signal)" }}></span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {TAG.map((e, i) => (
            <div key={i} style={{ position: "relative", opacity: run ? 1 : 0, transform: run ? "none" : "translateY(10px)", transition: `all 500ms var(--ease-unio) ${700 + i * 120}ms` }}>
              <span style={{ position: "absolute", left: -52, top: 13, font: "10px var(--font-mono)", color: "var(--text-muted)" }}>{e.t}</span>
              <span style={{ position: "absolute", left: -10, top: 15, width: 9, height: 9, borderRadius: "50%", background: e.next ? "var(--signal)" : "var(--paper-3)", boxShadow: "0 0 0 3px var(--card, #FBFAF6)" }}></span>
              <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "12px 14px", borderRadius: 10, background: e.next ? "var(--signal-soft)" : "transparent", boxShadow: e.next ? "inset 0 0 0 1px rgba(255,170,9,0.3)" : "inset 0 0 0 1px var(--hairline-dark)" }}>
                <Ic name={e.kind === "termin" ? "kalender" : "spark"} size={16} stroke="var(--ink-2)" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: "500 13px var(--font-display)", color: "var(--ink)" }}>{e.title}</div>
                  <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 4 }}>{e.sub}</div>
                </div>
                {e.confirm && <button style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "6px 12px", background: "var(--signal)", color: "var(--on-signal)", font: "600 10px var(--font-display)", letterSpacing: "0.04em", flex: "none" }}>Bestätigen</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => onNav && onNav("kalender")} style={{ marginTop: 20, alignSelf: "flex-start", background: "none", border: "none", cursor: "pointer", font: "500 13px var(--font-display)", color: "var(--signal-deep)" }}>Zum Kalender →</button>
    </C>
  );
}

/* ===== v2.4 §5 · Kalender-Preview (Ink-Anker, Punktraster) ===== */
function KalenderPreview({ onNav }) {
  const { Icon: Ic } = window;
  const [ref, run] = window.useInView(0.3);
  const days = Array.from({ length: 35 }, (_, i) => i - 1); // Monatsraster, 1..30
  const bes = [3, 8, 15, 16, 17, 22, 26]; // Tage mit Besichtigungen
  const today = 16;
  return (
    <div ref={ref} onClick={() => onNav && onNav("kalender")} style={{ cursor: "pointer", background: "var(--ink)", borderRadius: window.DASH_R || 12, padding: 26, color: "var(--paper)", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ font: "500 18px var(--font-display)", color: "var(--paper)" }}>Kalender</span>
        <span style={{ width: 34, height: 34, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 0 1px rgba(247,245,241,0.2)" }}><Ic name="arrow" size={14} stroke="var(--paper)" style={{ transform: "rotate(-45deg)" }} /></span>
      </div>
      <div style={{ display: "flex", gap: 28, marginTop: 22 }}>
        {[["7", "Termine · diese Woche", "up"], ["2", "Besichtigungen · heute", null]].map(([v, l, dir]) => (
          <div key={l}>
            <div style={{ font: "500 30px/1 var(--font-display)", letterSpacing: "-0.03em", display: "inline-flex", alignItems: "center", gap: 6 }}>{v}{dir === "up" && <span style={{ font: "13px var(--font-mono)", color: "var(--signal)" }}>↑</span>}</div>
            <div className="u-label" style={{ fontSize: 8, color: "rgba(247,245,241,0.55)", marginTop: 8 }}>{l}</div>
          </div>
        ))}
      </div>
      {/* Punktraster — echte Wochenspalten (Juli 2026: 1. = Mittwoch), Heute mit Ring */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 7, marginTop: 24 }}>
        {["M", "D", "M", "D", "F", "S", "S"].map((d, i) => <span key={i} className="u-label" style={{ fontSize: 7, color: "rgba(247,245,241,0.4)", textAlign: "center" }}>{d}</span>)}
        {days.map((d, i) => {
          const valid = d >= 1 && d <= 31;
          const isBes = bes.includes(d), isToday = d === today;
          return <span key={i} title={valid ? `${d}. Juli` : ""} style={{ width: 9, height: 9, borderRadius: "50%", margin: "0 auto", background: !valid ? "transparent" : isToday ? "transparent" : isBes ? "var(--signal)" : "rgba(247,245,241,0.25)", boxShadow: isToday ? "0 0 0 2px var(--signal)" : "none", transform: run ? "scale(1)" : "scale(0)", transition: `transform 300ms var(--ease-unio) ${i * 12}ms` }}></span>;
        })}
      </div>
    </div>
  );
}

/* ===== §6.1 Home-Ausbau unter dem Fold ===== */
const ARBEIT = [
  ["leads", "Neue Leads", 7, [["Sophie Berger", "Penthouse Beheim · vor 2 h"], ["Markus Wolf", "Das Albrecht · vor 5 h"]]],
  ["kalender", "Gebuchte Besichtigungen", 3, [["Beheim · heute 09:30", "Sophie Berger"], ["Ecoluxe · Do 14:00", "Elena Novak"]]],
];
const HANDLUNG = [
  ["Refugium am Waldrand", "1140 Wien", "D. Hayden", 8, 3, 2, 62],
  ["Penthouse Vorgartenstraße", "1020 Wien", "L. Vogt", 5, 2, 0, 74],
  ["Zinshaus Stockerauer Str.", "1210 Wien", "D. Hayden", 3, 1, 1, 55],
];
const STATUSMIX = [["Aktiv", 41, "var(--signal)"], ["Reserviert", 12, "#F0873F"], ["In Vorbereitung", 9, "#F6A56C"], ["Verkauft", 6, "#C9C2B6"]];
/* ===== §6.1 Home-Ausbau unter dem Fold ===== */
function Arbeitsbereich({ onNav }) {
  const { Card: C, Reveal: Rv, Icon: Ic } = window;
  return (
    <>
      <div style={{ display: "flex", alignItems: "baseline", margin: "40px 4px 20px" }}>
        <h2 style={{ margin: 0, font: "500 22px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Mein Arbeitsbereich</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20 }}>
        {ARBEIT.map(([ic, title, n, rows], k) => (
          <Rv key={title} delay={k * 70}>
            <C style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <Ic name={ic} size={18} stroke="var(--ink-2)" />
                <span style={{ font: "500 16px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)", flex: 1 }}>{title}</span>
                <span className="u-label" style={{ fontSize: 9, padding: "4px 10px", borderRadius: 999, background: "var(--signal-soft)", color: "var(--signal-deep)" }}>{n}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {rows.map(([a, b]) => (
                  <div key={a} style={{ display: "flex", flexDirection: "column", gap: 4, padding: "11px 13px", borderRadius: 9, background: "var(--paper)" }}>
                    <span style={{ font: "500 13.5px var(--font-display)", color: "var(--ink)" }}>{a}</span>
                    <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{b}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => onNav && onNav(ic)} style={{ marginTop: 16, alignSelf: "flex-start", background: "none", border: "none", cursor: "pointer", font: "500 13px var(--font-display)", color: "var(--signal-deep)", display: "inline-flex", alignItems: "center", gap: 7 }}>Alle anzeigen <Ic name="arrow" size={13} stroke="var(--signal-deep)" /></button>
            </C>
          </Rv>
        ))}
      </div>
    </>
  );
}
function HomeBelowFold({ onNav }) {
  const { Card: C, CardHead: CH, Reveal: Rv, Icon: Ic, RecoCard: Reco, Table: T, Row: Rw, Cell2: C2, AreaChart: AC, GhostPill: GP, FilterBar: FB } = window;
  const mixTotal = STATUSMIX.reduce((s, m) => s + m[1], 0);
  const hcols = [{ label: "Immobilie", w: "1.8fr" }, { label: "Makler", w: "1fr" }, { label: "Offen", w: "0.7fr", right: true }, { label: "Überfällig", w: "0.9fr", right: true }, { label: "Ansichtsquote", w: "1fr", right: true }];
  const acols = [{ label: "Action", w: "2fr" }, { label: "Kontakt", w: "1.1fr" }, { label: "Immobilie", w: "1.3fr" }, { label: "Views", w: "0.6fr", right: true }, { label: "Fällig", w: "0.9fr", right: true }];
  return (
    <>
      {/* 1 · Insight der Woche (Signatur der Statistikseite, ganz oben) */}
      <Rv style={{ marginTop: 20 }}>
        <div style={{ position: "relative", overflow: "hidden", borderRadius: 14, padding: "24px 28px", background: "linear-gradient(120deg, rgba(255,170,9,0.18), rgba(255,219,87,0.08) 55%, #F9EFE5)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div className="u-label" style={{ color: "var(--signal-deep)", fontSize: 9 }}>Insight der Woche</div>
            <div style={{ font: "500 20px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 12 }}>82 % der empfohlenen Aktionen wurden umgesetzt.</div>
            <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
              {["Sicht: Team", "Person: Daniel Hayden", "Zeitraum: 30 Tage"].map((p) => <span key={p} className="u-label" style={{ fontSize: 8.5, padding: "5px 11px", borderRadius: 999, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}>{p}</span>)}
            </div>
          </div>
          <span className="u-label" style={{ fontSize: 8.5, padding: "6px 12px", borderRadius: 999, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}>Stand 16.07. 08:12</span>
        </div>
      </Rv>
      {/* 2 · Erstkontakt-Quote — Modul-Hero (§4.1) */}
      <Rv style={{ marginTop: 20 }}>
        <C>
          <CH label="Performance" title="Erstkontakt-Quote" right={<span className="u-label" style={{ fontSize: 9, padding: "5px 11px", borderRadius: 999, background: "var(--signal-soft)", color: "var(--signal-deep)" }}>Bearbeitet</span>} />
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 40, alignItems: "center" }}>
            <div>
              <p style={{ margin: "0 0 22px", font: "400 15px/1.6 var(--font-display)", color: "var(--text-muted)", maxWidth: 380 }}>Wie schnell dein erster Anruf beim Lead sitzt — der stärkste Hebel auf die Abschlussquote.</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Reco tone="hi" label="Eingegangene Leads 7 Tage" value="45" style={{ minWidth: 150, padding: "18px 20px" }} />
                <div style={{ minWidth: 150, borderRadius: 12, padding: "18px 20px", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
                  <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5 }}>First Lead Call erledigt</div>
                  <div style={{ font: "500 30px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 14, fontVariantNumeric: "tabular-nums" }}>38</div>
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ font: "500 clamp(56px, 6vw, 92px)/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>84 <span style={{ fontSize: "0.4em", color: "var(--signal-deep)" }}>%</span></div>
              <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 9, marginTop: 10 }}>innerhalb 2 h kontaktiert</div>
              <div style={{ marginTop: 18 }}><window.PipeBar pct={84} i={0} /></div>
              <div style={{ font: "600 9px var(--font-mono)", letterSpacing: "0.12em", color: "var(--text-muted)", marginTop: 12 }}>QUALIFIZIERUNGSQUOTE STABIL · 64 %</div>
            </div>
          </div>
        </C>
      </Rv>

      {/* 3 · Ergänzende Werte als nacktes Mini-Band (keine Boxen, 1.2) */}
      <Rv style={{ marginTop: 36 }}>
        <div style={{ display: "flex", alignItems: "baseline", columnGap: 32, flexWrap: "wrap", padding: "0 4px" }}>
          {[["1,8 h", "Zeit bis 1. View", false], ["3", "Überfällige Risiken", true]].map(([v, l, red], i) => (
            <React.Fragment key={l}>
              {i > 0 && <span style={{ width: 1, height: 32, background: "rgba(20,18,16,.14)", alignSelf: "center" }}></span>}
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span style={{ font: "500 32px/1 var(--font-display)", letterSpacing: "-0.02em", color: red ? "#C2402A" : "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{v}</span>
                <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{l}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </Rv>

      {/* 6 · Aktivitätsverlauf + Status-Mix + Kontakt-Funnel */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20, marginTop: 20 }}>
        <Rv>
          <C>
            <CH label="Verlauf" title="Aktivität · 30 Tage" right={<span className="u-label" style={{ color: "var(--text-muted)", fontSize: 9 }}>Anfragen · Views</span>} />
            <AC data={[8, 12, 10, 16, 14, 20, 18, 24, 21, 27, 24, 30, 28, 34]} height={150} />
          </C>
        </Rv>
        <Rv delay={80}>
          <C style={{ height: "100%" }}>
            <CH label="Status-Mix" title="Objekt-Portfolio" />
            <SegBar segs={STATUSMIX} total={mixTotal} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, marginTop: 18 }}>
              {STATUSMIX.map(([n, v, c]) => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid var(--hairline-dark)" }}>
                  <span style={{ width: 9, height: 9, borderRadius: 3, background: c, flex: "none" }}></span>
                  <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)", flex: 1 }}>{n}</span>
                  <span style={{ font: "13px var(--font-mono)", color: "var(--ink)" }}>{v}</span>
                </div>
              ))}
            </div>
          </C>
        </Rv>
      </div>

      {/* 7 · Handlungsdruck + Kontakt-Herkunft-Spalte */}
      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 20, marginTop: 20, alignItems: "start" }}>
        <Rv>
          <div style={{ margin: "4px 4px 18px" }}>
            <h2 style={{ margin: 0, font: "500 20px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Immobilien mit Handlungsdruck</h2>
          </div>
          <T cols={hcols}>
            {HANDLUNG.map(([t, loc, m, offen, spät, spätn, quote], i) => (
              <Rw key={t} cols={hcols} delay={i * 50} onClick={() => onNav && onNav("objekte")} cells={[
                <C2 a={t} b={loc} />,
                <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>{m}</span>,
                <span style={{ font: "14px var(--font-mono)", color: "var(--ink)" }}>{offen}</span>,
                <span style={{ font: "14px var(--font-mono)", color: spätn > 0 ? "#C2402A" : "var(--text-muted)" }}>{spätn > 0 ? spätn : "—"}</span>,
                <span style={{ font: "14px var(--font-mono)", color: "var(--ink)" }}>{quote} %</span>,
              ]} />
            ))}
          </T>
        </Rv>
        <Rv delay={80}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <C>
              <CH label="Kontakt-Herkunft" title="Woher die Leads kommen" />
              {[["Meta", 62], ["willhaben", 44], ["ImmobilienScout24", 28], ["Direkt / Empfehlung", 14]].map(([n, v], i) => (
                <MiniHerkunft key={n} n={n} v={v} max={62} i={i} />
              ))}
            </C>
            <C>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 16 }}>
                {[["1 : 9", "Matching-Quote"], ["< 2 h", "Ø Antwortzeit"]].map(([v, k]) => (
                  <div key={k}>
                    <div style={{ font: "500 24px var(--font-mono)", color: "var(--ink)" }}>{v}</div>
                    <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 8 }}>{k}</div>
                  </div>
                ))}
              </div>
            </C>
          </div>
        </Rv>
      </div>

      {/* 8 · Kritische Actions */}
      <Rv style={{ marginTop: 20 }}>
        <div style={{ margin: "24px 4px 18px" }}>
          <h2 style={{ margin: 0, font: "500 20px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Kritische Actions</h2>
        </div>
        <T cols={acols}>
          {[["Lead telefonisch kontaktieren", "Telefonat · Hoch", "Sophie Berger", "Penthouse Beheim", 12, "seit 2 h", true], ["Angebot nachfassen", "E-Mail · Hoch", "Markus Wolf", "Das Albrecht", 8, "heute", false], ["Besichtigung bestätigen", "Termin · Mittel", "Elena Novak", "Villa Ecoluxe", 5, "Do 14:00", false]].map(([a, s, k, o, v, f, red], i) => (
            <Rw key={a} cols={acols} delay={i * 50} onClick={() => {}} cells={[
              <C2 a={a} b={s} />,
              <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>{k}</span>,
              <span style={{ font: "500 13.5px var(--font-display)", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>{o}</span>,
              <span style={{ font: "14px var(--font-mono)", color: "var(--ink)" }}>{v}</span>,
              <span style={{ font: "13px var(--font-mono)", color: red ? "#C2402A" : "var(--text-muted)" }}>{f}</span>,
            ]} />
          ))}
        </T>
      </Rv>
    </>
  );
}
function w2label(id, WLABEL, WIDGETS) { return WLABEL[id] || (WIDGETS[id] && WIDGETS[id].label) || id; }
function MiniStatCard({ title, value, unit, delta, bars }) {
  const { Card: C, useInView } = window;
  const [ref, run] = useInView(0.4);
  const max = Math.max(...bars);
  const dPos = !String(delta).startsWith("−");
  return (
    <C>
      <div ref={ref}>
        <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{title}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 12 }}>
          <span style={{ font: "500 clamp(30px,3vw,40px)/0.9 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{value}</span>
          {unit && <span style={{ font: "13px var(--font-mono)", color: "var(--text-muted)" }}>{unit}</span>}
          <span style={{ font: "11px var(--font-mono)", color: dPos ? "var(--signal-deep)" : "var(--text-muted)", marginLeft: "auto" }}>{delta}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 34, marginTop: 16 }}>
          {bars.map((b, i) => (
            <span key={i} style={{ flex: 1, height: run ? (b / max * 100) + "%" : "0%", background: `color-mix(in oklch, var(--signal) ${100 - i * 6}%, #E2DCCF)`, borderRadius: 2, transition: `height 700ms var(--ease-unio) ${i * 40}ms` }}></span>
          ))}
        </div>
      </div>
    </C>
  );
}
function MiniHerkunft({ n, v, max, i }) {
  const [ref, run] = window.useInView(0.4);
  const col = `color-mix(in oklch, var(--signal) ${100 - i * 18}%, #E2DCCF)`;
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 34px", gap: 12, alignItems: "center", padding: "9px 0" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}><span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{n}</span></div>
        <div style={{ height: 7, borderRadius: 4, background: "#EFEAE2", overflow: "hidden" }}>
          <div style={{ height: "100%", width: run ? (v / max * 100) + "%" : "0%", background: col, borderRadius: 4, transition: `width 900ms var(--ease-unio) ${i * 80}ms` }}></div>
        </div>
      </div>
      <span style={{ font: "13px var(--font-mono)", color: "var(--ink)", textAlign: "right" }}>{v}</span>
    </div>
  );
}
/* ===== v2.2 §1 Nachfrage-Watchlist ===== */
const WATCH = [
  ["Top 5 · Das Albrecht", "1170 Wien · 137 m²", "/assets/img/albrecht.jpg", 18, 22, { anf: 18, bes: 4, exp: 240, pm: "6 240" }, 72, 58],
  ["Penthouse S · Origins", "1180 Wien · 168 m²", "/assets/img/penthouse.jpg", 14, 15, { anf: 14, bes: 3, exp: 190, pm: "9 100" }, 88, 60],
  ["DG · ObenZwei", "1020 Wien · 112 m²", "/assets/img/obenzwei.jpg", 11, 8, { anf: 11, bes: 2, exp: 150, pm: "8 950" }, 84, 60],
  ["Villa Ecoluxe", "1190 Wien · 210 m²", "/assets/img/ecoluxe.jpg", 9, -6, { anf: 9, bes: 1, exp: 120, pm: "11 400" }, 96, 55],
  ["Top 3 · Beheim", "1170 Wien · 100 m²", "/assets/img/beheim.jpg", 6, -12, { anf: 6, bes: 0, exp: 80, pm: "7 480" }, 64, 58],
];
function Watchlist({ onNav }) {
  const { Card: C, CardHead: CH, Icon: Ic, Delta: D, Ruler: Rl } = window;
  const [open, setOpen] = React.useState(-1);
  return (
    <C pad={0}>
      <div style={{ padding: "24px 24px 6px" }}>
        <CH label="Nachfrage" title="Gefragte Einheiten" right={<span className="u-label" style={{ fontSize: 8.5, padding: "5px 11px", borderRadius: 999, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}>7 Tage</span>} />
      </div>
      {WATCH.map(([t, sub, img, anf, delta, kv, pmPos, cmp], i) => {
        const on = open === i;
        return (
          <div key={t} style={{ borderTop: "1px solid var(--hairline-dark)" }}>
            <button onClick={() => setOpen(on ? -1 : i)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 13, padding: "14px 24px", border: "none", background: on ? "#F7F3EC" : "transparent", cursor: "pointer", textAlign: "left" }}>
              <img src={img} alt="" style={{ width: 28, height: 28, borderRadius: 8, objectFit: "cover", flex: "none" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: "500 13.5px var(--font-display)", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t}</div>
                <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 4 }}>{sub}</div>
              </div>
              <span style={{ font: "14px var(--font-mono)", color: "var(--ink)", flex: "none" }}>{anf}</span>
              <D v={delta} />
              <Ic name="arrow" size={13} stroke="var(--text-muted)" style={{ transform: on ? "rotate(90deg)" : "rotate(90deg)", opacity: 0.5, flex: "none" }} />
            </button>
            <div style={{ display: "grid", gridTemplateRows: on ? "1fr" : "0fr", transition: "grid-template-rows 300ms var(--ease-unio)" }}>
              <div style={{ overflow: "hidden" }}>
                <div style={{ padding: "4px 24px 20px" }}>
                  {[["Anfragen 7 Tage", kv.anf], ["Besichtigungen geplant", kv.bes], ["Exposé-Abrufe", kv.exp], ["Preis / m²", "€ " + kv.pm]].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--hairline-dark)" }}>
                      <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{k}</span>
                      <span style={{ font: "12px var(--font-mono)", color: "var(--ink)" }}>{v}</span>
                    </div>
                  ))}
                  <Rl poleL="Günstig" poleR="Premium" pos={pmPos} cmp={cmp} cmpLabel="Bezirk" note={"Preis/m² dieser Einheit gegen Bezirksschnitt."} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div style={{ padding: "16px 24px", borderTop: "1px solid var(--hairline-dark)" }}>
        <button onClick={() => onNav && onNav("objekte")} style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "none", background: "none", cursor: "pointer", font: "500 13px var(--font-display)", color: "var(--signal-deep)" }}>Alle Einheiten <Ic name="arrow" size={13} stroke="var(--signal-deep)" /></button>
      </div>
    </C>
  );
}

/* ===== v2.2 §2 Provisionsstand — die eine invertierte Ink-Kachel ===== */
function Provisionsstand() {
  const { Icon: Ic, useCountUp, useInView } = window;
  const [ref, run] = useInView(0.4);
  const n = useCountUp(48600, run, 1100);
  const [target, setTarget] = window.useProvTarget();
  const [edit, setEdit] = React.useState(false);
  const earned = 33350;
  const pct = Math.min(100, Math.round((earned / target) * 100));
  return (
    <div ref={ref} style={{ background: "#FBFAF6", borderRadius: window.DASH_R || 12, padding: 26, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>Provisionsstand</span>
        <span className="u-label" style={{ fontSize: 8.5, padding: "5px 11px", borderRadius: 999, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}>2026</span>
      </div>
      <div style={{ font: "500 clamp(34px, 3.4vw, 44px)/1 var(--font-display)", letterSpacing: "-0.03em", marginTop: 18, fontVariantNumeric: "tabular-nums", color: "var(--ink)" }}><span style={{ color: "var(--signal-deep)" }}>€</span> {run ? n.toLocaleString("de-AT") : "0"}</div>
      <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 12 }}>Laufendes Jahr · nach UNIO-Anteil</div>
      <div style={{ marginTop: 22 }}>
        {[["Abgerechnet", "€ 31.200", false], ["Offen aus Pipeline", "€ 17.400", true]].map(([k, v, hi]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid var(--hairline-dark)" }}>
            <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>{k}</span>
            <span style={{ font: "13px var(--font-mono)", color: hi ? "var(--signal-deep)" : "var(--ink)" }}>{v}</span>
          </div>
        ))}
      </div>
      {/* Jahresziel — unten in der Kachel einstellbar */}
      <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid var(--hairline-dark)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>Jahresziel · {pct} % erreicht</span>
          <button onClick={() => setEdit((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", font: "500 12px var(--font-display)", color: "var(--signal-deep)", padding: 0 }}>{edit ? "Fertig" : "Ziel anpassen"}</button>
        </div>
        <div style={{ height: 5, borderRadius: 999, background: "rgba(20,18,16,.08)", overflow: "hidden", marginTop: 12 }}>
          <div style={{ height: "100%", width: (run ? pct : 0) + "%", borderRadius: 999, background: "linear-gradient(90deg, var(--signal), var(--signal-deep))", transition: "width 1100ms var(--ease-unio)" }}></div>
        </div>
        {edit && (
          <div style={{ marginTop: 16 }}>
            <div style={{ font: "600 26px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}><span style={{ fontSize: 15, color: "rgba(20,18,16,.4)", marginRight: 3 }}>€</span>{target.toLocaleString("de-AT")}</div>
            <input type="range" min={20000} max={150000} step={5000} value={target} onChange={(e) => setTarget(Number(e.target.value))} style={{ width: "100%", marginTop: 12, accentColor: "var(--signal)" }} />
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {[50000, 75000, 100000].map((t) => (
                <button key={t} onClick={() => setTarget(t)} style={{ cursor: "pointer", border: "none", borderRadius: 999, padding: "7px 13px", font: "500 11px var(--font-mono)", background: target === t ? "var(--signal)" : "transparent", color: target === t ? "#FFFFFF" : "var(--ink)", boxShadow: target === t ? "none" : "inset 0 0 0 1px var(--hairline-dark)" }}>€ {(t / 1000)}k</button>
              ))}
            </div>
          </div>
        )}
      </div>
      <button style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 10, border: "none", cursor: "pointer", borderRadius: 999, padding: "9px 18px", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--ink)", font: "500 13px var(--font-display)" }}>
        Zur Abrechnung <Ic name="arrow" size={13} stroke="var(--ink)" />
      </button>
    </div>
  );
}

function SegBar({ segs, total }) {
  const [ref, run] = window.useInView(0.4);
  return (
    <div ref={ref} style={{ display: "flex", gap: 3, height: 10, borderRadius: 5, overflow: "hidden" }}>
      {segs.map(([n, v, c], i) => (
        <span key={n} style={{ width: run ? (v / total * 100) + "%" : "0%", background: c, borderRadius: 3, transition: `width 900ms var(--ease-unio) ${i * 90}ms` }}></span>
      ))}
    </div>
  );
}
function MixDonut({ segs, total }) {
  const [ref, run] = window.useInView(0.4);
  const size = 130, r = 52, C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flex: "none" }}>
      {segs.map(([n, v, col], i) => {
        const frac = v / total, off = acc; acc += frac;
        return <circle key={n} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={col} strokeWidth="14" strokeDasharray={`${run ? frac * C : 0} ${C}`} strokeDashoffset={-off * C} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: `stroke-dasharray 900ms var(--ease-unio) ${i * 120}ms` }} />;
      })}
    </svg>
  );
}

function PipeBar({ pct, i }) {
  const [ref, run] = window.useInView(0.5);
  const col = `color-mix(in oklch, var(--signal) ${100 - i * 16}%, #E2DCCF)`;
  return (
    <div ref={ref} style={{ height: 10, borderRadius: 5, background: "var(--paper-2)", overflow: "hidden" }}>
      <div style={{ height: "100%", width: run ? pct + "%" : "0%", background: col, borderRadius: 5, transition: `width 1000ms var(--ease-unio) ${i * 90}ms` }}></div>
    </div>
  );
}
/* ===== Gamification Phase 1 · Streak-Punktraster (S-Widget, privat) ===== */
function StreakWidget() {
  const [ref, run] = window.useInView(0.4);
  // 21 Tage, Wochenenden pausieren (kein Verlust), heute = Ring
  const days = [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 2, null, null, null]; // 1 = < 2 h, 0 = Pause (WE), 2 = heute
  return (
    <DCard>
      <CardHead label="Streak" title="Erstkontakt unter 2 h" right={<DChip>Q3 2026</DChip>} />
      <div ref={ref} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ font: "500 40px/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>9</span>
        <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>Tage in Folge</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 6, marginTop: 18, maxWidth: 150 }}>
        {days.map((d, i) => (
          <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: d === 1 ? "var(--signal)" : d === 0 ? "var(--paper-2)" : "transparent", boxShadow: d === 2 ? "0 0 0 2px var(--signal)" : "none", opacity: d === null ? 0 : 1, transform: run ? "scale(1)" : "scale(0)", transition: `transform 300ms var(--ease-unio) ${i * 20}ms` }}></span>
        ))}
      </div>
      <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 16 }}>Beste Serie: 23 Tage · Wochenenden pausieren</div>
    </DCard>
  );
}

/* ===== Statistiken-Bühne (v2.3 §7): Analytics-Umzüge von der Home ===== */
const STAT_KPI = [
  { v: 24, sub: "Offene Actions", deltaN: -12 },
  { v: 96, sub: "Betreute Kontakte", deltaN: 8 },
  { v: 71, unit: "%", sub: "Ansichtsquote", deltaN: 6, pz: "Top 22 % im Circle" },
  { v: 148, sub: "Erledigt · 30 Tage", deltaN: 22, pz: "Top 15 % im Circle" },
];
function DashStats({ onNav }) {
  return (
    <div style={{ maxWidth: 1360, margin: "0 auto" }}>
      <DRvL style={{ marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ margin: 0, font: "500 clamp(30px, 3vw, 46px)/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Statistiken<span style={{ color: "var(--signal)" }}>.</span></h1>
            <p style={{ margin: "14px 0 0", font: "400 15px var(--font-display)", color: "var(--text-muted)" }}>Warum es so ist: Analyse & Performance, letzte 30 Tage.</p>
          </div>
        </div>
      </DRvL>
      {/* EINE Filterleiste, sticky unter dem Kopf */}
      <div style={{ position: "sticky", top: 0, zIndex: 30, background: "#F4F2EE", padding: "14px 0", marginTop: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {["Zeitraum: Letzte 30 Tage", "Makler: Daniel Hayden", "Sicht: Team"].map((p) => (
            <button key={p} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "9px 16px", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "500 12.5px var(--font-display)", color: "var(--ink)" }}>{p}</button>
          ))}
          <span className="u-label" style={{ marginLeft: "auto", fontSize: 8.5, color: "var(--text-muted)" }}>Aktualisiert 16.07. · 08:12</span>
        </div>
      </div>
      {/* nackte KPI-Zeile (§7: Sekundär-KPIs als nackte Gruppe) */}
      <DRv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", marginTop: 48 }}>
          {STAT_KPI.map((k, i) => <NakedKpi key={k.sub} k={k} first={i === 0} onNav={onNav} />)}
        </div>
      </DRv>
      <div style={{ marginTop: 40 }}><HomeBelowFold onNav={onNav} /></div>
    </div>
  );
}
/* Eigenstaendige Original-Kacheln fuer die neue Heute-Startseite */
function PipelineCard() {
  return (
    <DCard style={{ height: "100%" }}>
      <CardHead title="Vom Lead zum Abschluss" right={<DChip>Q3 2026</DChip>} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 6 }}>
        {PIPE.map(([n, v, pct], i) => (
          <div key={n} style={{ display: "grid", gridTemplateColumns: "minmax(0, 110px) minmax(0, 1fr) 46px", gap: 14, alignItems: "center" }}>
            <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 9.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n}</span>
            <PipeBar pct={pct} i={i} />
            <span style={{ font: "14px var(--font-mono)", color: "var(--ink)", textAlign: "right" }}>{v}</span>
          </div>
        ))}
      </div>
    </DCard>
  );
}
function ReichweiteCard() {
  return (
    <DCard style={{ height: "100%" }}>
      <CardHead title="Reichweite & Anfragen" right={<DChip>30 Tage</DChip>} />
      <div className="mk-reich" style={{ display: "grid", gridTemplateColumns: "auto minmax(0, 1fr)", gap: 28, alignItems: "center" }}>
        <BigNum value={48200} sub="Impressionen · 30 Tage" />
        <Bars data={[8, 12, 9, 15, 13, 18, 16, 22, 19, 24, 21, 27]} height={96} />
      </div>
    </DCard>
  );
}
Object.assign(window, { DashHome, DashStats, PipeBar, TagesTimeline, ErstkontaktModul, PipelineCard, ReichweiteCard, HomeBelowFold, Watchlist });
