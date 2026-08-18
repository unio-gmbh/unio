/* UNIO Dashboard v2 — Kontakte (§6.5), Kalender (§6.6), Anlage-Wizard (§6.7). */
const { Icon: WIcon, Reveal: WReveal } = window;
const { PageHead: WPageHead, FilterBar: WFilterBar, GhostPill: WGhostPill, PillSwitch: WPillSwitch, StatusPill: WStatus, Table: WTable, Row: WRow, Cell2: WCell2, RecoCard: WReco } = window;
const { Button: WBtn } = window.UNIODesignSystem_b6216a;
const W_RM = window.DASH_P_RM;

/* ===== §6.5 Kontakte ===== */
const KONTAKTE_DB = [
  { name: "Sophie Berger", mail: "s.berger@gmx.at", tel: "+43 660 1234567", anf: 3, immo: 1, seit: "12.06.2026", pos: "center 22%", img: "../../assets/team/portrait-05.jpg" },
  { name: "Markus Wolf", mail: "m.wolf@firma.at", tel: "+43 664 9988776", anf: 5, immo: 2, seit: "04.05.2026", pos: "center 20%", img: "../../assets/team/portrait-06.jpg" },
  { name: "Elena Novak", mail: "elena.novak@outlook.com", tel: "+43 699 2020202", anf: 2, immo: 1, seit: "28.04.2026", pos: "center 24%", img: "../../assets/team/portrait-07.jpg" },
  { name: "Thomas Gruber", mail: "t.gruber@gmail.com", tel: "+43 650 4433221", anf: 1, immo: 0, seit: "19.07.2026", pos: "center 20%", img: "../../assets/team/portrait-08.jpg" },
  { name: "Andrea Fischer", mail: "a.fischer@gmx.net", tel: "+43 676 5551234", anf: 4, immo: 3, seit: "02.03.2026", pos: "center 22%", img: null },
];
function Avatar({ img, name, pos }) {
  if (img) return <img src={img} alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", objectPosition: pos, flex: "none" }} />;
  const ini = name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return <span style={{ width: 40, height: 40, borderRadius: "50%", flex: "none", background: "var(--paper-2)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 13px var(--font-display)", color: "var(--text-muted)" }}>{ini}</span>;
}
function TelPill({ tel }) {
  return <span className="u-label" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 9, padding: "6px 12px", borderRadius: 999, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--ink-2)" }}><WIcon name="phone" size={12} stroke="var(--ink-2)" />{tel}</span>;
}
function MonoPill({ children }) {
  return <span className="u-label" style={{ fontSize: 9, padding: "6px 11px", borderRadius: 999, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}>{children}</span>;
}
function Kontakte() {
  const [q, setQ] = React.useState("");
  const list = KONTAKTE_DB.filter((k) => !q.trim() || (k.name + k.mail).toLowerCase().includes(q.toLowerCase()));
  const cols = [{ label: "Kontakt", w: "2fr" }, { label: "Telefon", w: "1.2fr" }, { label: "Anfragen", w: "1fr" }, { label: "Erstellt", w: "1fr" }, { label: "", w: "40px", right: true }];
  return (
    <div>
      <WPageHead title="Kontakte" accent="pflegen"
        chips={[{ value: KONTAKTE_DB.length, label: "Kontakte" }]}
        cta={<WBtn variant="signal" size="sm" knob="+">Kontakt anlegen</WBtn>} />
      <WReveal>
        <WFilterBar style={{ marginBottom: 24 }}>
          <label style={{ flex: 1, minWidth: 220, display: "flex", alignItems: "center", gap: 11, background: "var(--paper)", borderRadius: 10, padding: "11px 15px" }}>
            <WIcon name="search" size={15} stroke="var(--text-muted)" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name oder E-Mail suchen" style={{ flex: 1, border: "none", outline: "none", background: "none", font: "400 14px var(--font-display)", color: "var(--ink-2)" }} />
          </label>
          <WGhostPill>Sortieren: Zuletzt erstellt</WGhostPill>
        </WFilterBar>
      </WReveal>
      <WTable cols={cols}>
        {list.map((k, i) => (
          <WRow key={k.mail} cols={cols} delay={i * 45} onClick={() => {}} cells={[
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}><Avatar img={k.img} name={k.name} pos={k.pos} /><WCell2 a={k.name} b={k.mail + " · seit " + k.seit} /></div>,
            <TelPill tel={k.tel} />,
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><MonoPill>{k.anf} Anfragen</MonoPill><MonoPill>{k.immo} Immobilien</MonoPill></div>,
            <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 9 }}>{k.seit}</span>,
            <WIcon name="arrow" size={15} stroke="var(--text-muted)" />,
          ]} />
        ))}
      </WTable>
    </div>
  );
}

/* ===== §6.6 Kalender ===== */
const EVENTS = { 3: [["09:30", "Besichtigung Beheim", true]], 8: [["11:00", "Notartermin Albrecht", false]], 15: [["14:00", "Besichtigung Ecoluxe", true], ["16:30", "Fototermin ObenZwei", false]], 17: [["10:00", "Besichtigung Villa Hietzing", true]], 22: [["13:00", "Team-Sync", false]], 24: [["15:30", "Besichtigung Origins", true]] };
function KalenderMonatUNUSED() {
  const first = 1; // Juli 2026 startet Mi (Index 2, Mo=0)
  const offset = 2, days = 31, today = 16;
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  const wd = ["MO", "DI", "MI", "DO", "FR", "SA", "SO"];
  return (
    <div>
      <WPageHead title="Kalender" sub="Synchron mit deinem Google Kalender." />
      <WReveal>
        <WFilterBar style={{ marginBottom: 24 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 13px 7px 7px", borderRadius: 999, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
            <span style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--signal)", color: "var(--on-signal)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 11px var(--font-display)" }}>DH</span>
            <span style={{ font: "500 13px var(--font-display)", color: "var(--ink)" }}>Daniel Hayden</span>
            <WIcon name="arrow" size={12} stroke="var(--text-muted)" style={{ transform: "rotate(90deg)" }} />
          </span>
          <WPillSwitch label="Nur Besichtigungen" on={true} onToggle={() => {}} />
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            <WGhostPill>Heute</WGhostPill>
            <span style={{ font: "500 16px var(--font-display)", color: "var(--ink)" }}>Juli 2026</span>
            <div style={{ display: "inline-flex", gap: 4 }}>
              {[["<", "back"], [">", "arrow"]].map(([, ic], i) => <button key={i} style={{ width: 32, height: 32, borderRadius: 8, border: "none", cursor: "pointer", background: "var(--paper)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--ink-2)" }}><WIcon name={ic} size={14} /></button>)}
            </div>
          </span>
        </WFilterBar>
      </WReveal>
      <div style={{ background: "#FFFFFF", borderRadius: 14, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
          {wd.map((w, i) => <div key={w} className="u-label" style={{ fontSize: 8.5, color: "rgba(20,18,16,0.4)", padding: "16px 16px 12px", textAlign: "right", background: i >= 5 ? "rgba(239,234,226,0.4)" : "transparent" }}>{w}</div>)}
          {cells.map((d, i) => {
            const col = i % 7;
            const ev = d ? EVENTS[d] : null;
            return (
              <div key={i} style={{ minHeight: 108, padding: "10px 10px 12px", borderTop: "1px solid var(--hairline-dark)", borderLeft: col ? "1px solid var(--hairline-dark)" : "none", background: col >= 5 ? "rgba(239,234,226,0.4)" : "transparent" }}>
                {d && <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {d === today
                    ? <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--signal)", color: "var(--on-signal)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 12px var(--font-mono)" }}>{d}</span>
                    : <span style={{ font: "11px var(--font-mono)", color: "var(--text-muted)" }}>{d}</span>}
                </div>}
                {ev && <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 8 }}>
                  {ev.map(([time, title, besicht], k) => (
                    <div key={k} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 8px", borderRadius: 7, background: besicht ? "var(--signal-soft)" : "#FFFFFF", boxShadow: besicht ? "none" : "inset 0 0 0 1px var(--hairline-dark)", borderLeft: "2px solid var(--signal)" }}>
                      {besicht && <WIcon name="kalender" size={11} stroke="var(--signal-deep)" />}
                      <span style={{ font: "9px var(--font-mono)", color: besicht ? "var(--signal-deep)" : "var(--text-muted)", flex: "none" }}>{time}</span>
                      <span style={{ font: "500 11px var(--font-display)", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</span>
                    </div>
                  ))}
                </div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ===== v3 Teil 3 · Kalender: Woche (Timeline-Grammatik) + Monat + Tages-Sheet ===== */
const WEEK_EV = {
  13: [[11, 1, "Fototermin ObenZwei", false]],
  14: [[9, 1, "Team-Sync", false]],
  15: [[14, 1, "Besichtigung Ecoluxe", true], [16.5, 1, "Fototermin ObenZwei", false]],
  16: [[9.5, 1, "Besichtigung Beheim", true], [12.5, 0.5, "Rückruf Elena Novak", false], [14, 1, "Besichtigung Ecoluxe", true], [16.5, 1, "Übergabe Albrecht Top 4", false]],
  17: [[10, 1, "Besichtigung Villa Hietzing", true]],
};
function Kalender() {
  const [view, setView] = React.useState("woche");
  const [sheet, setSheet] = React.useState(null); // Tag für Tages-Sheet
  const today = 16;
  /* Sieben Spalten passen mobil nicht: unter 760 px zeigen wir einen Tag als
     Agenda mit Tagesstreifen darüber, so wie es Kalender am Telefon machen. */
  const [schmal, setSchmal] = React.useState(() => window.matchMedia("(max-width: 760px)").matches);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const f = (e) => setSchmal(e.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  const [tag, setTag] = React.useState(16);
  const uhr = (t) => String(Math.floor(t)).padStart(2, "0") + ":" + (t % 1 ? "30" : "00");
  const week = [13, 14, 15, 16, 17, 18, 19];
  const wd = ["MO", "DI", "MI", "DO", "FR", "SA", "SO"];
  const H0 = 8, H1 = 18, PXH = 52;
  const offset = 2, days = 31;
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: 32, paddingTop: 20 }}>
        <div>
          <h1 style={{ margin: 0, font: "500 clamp(34px, 3.4vw, 52px)/1.02 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Kalender<span style={{ color: "var(--signal)" }}>.</span></h1>
          <span className="u-label" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, fontSize: 8.5, padding: "6px 13px", borderRadius: 999, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)", animation: W_RM ? "none" : "uPulse 2s var(--ease-unio) infinite" }}></span>Google Sync
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "inline-flex", gap: 4, background: "#FFFFFF", borderRadius: 999, padding: 4, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
            {[["woche", schmal ? "Tag" : "Woche"], ["monat", "Monat"]].map(([id, l]) => (
              <button key={id} onClick={() => setView(id)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "8px 18px", background: view === id ? "var(--ink)" : "transparent", color: view === id ? "var(--paper)" : "var(--text-muted)", font: "500 12.5px var(--font-display)", transition: "background .25s var(--ease-unio)" }}>{l}</button>
            ))}
          </div>
          <WGhostPill>Heute</WGhostPill>
          <span style={{ font: "500 16px var(--font-display)", color: "var(--ink)" }}>{view === "woche" ? "13. – 19. Juli 2026" : "Juli 2026"}</span>
          <div style={{ display: "inline-flex", gap: 4 }}>
            {["back", "arrow"].map((ic, i) => <button key={i} aria-label={i ? "Weiter" : "Zurück"} style={{ width: 32, height: 32, borderRadius: 8, border: "none", cursor: "pointer", background: "var(--paper)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--ink-2)" }}><WIcon name={ic} size={14} /></button>)}
          </div>
        </div>
      </div>

      {schmal && view === "woche" ? (
        /* ===== Mobil: ein Tag als Agenda ===== */
        <WReveal>
        <div style={{ background: "var(--card-bg, #FFFFFF)", borderRadius: 14, boxShadow: "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", overflow: "hidden" }}>
          {/* nowrap inline: MK_CSS laesst mobil pauschal alle Flex-Reihen umbrechen,
              hier soll der Streifen aber in einer Zeile scrollen. */}
          <div style={{ display: "flex", flexWrap: "nowrap", gap: 6, overflowX: "auto", padding: "12px 12px 10px", scrollbarWidth: "none", borderBottom: "1px solid var(--hairline-dark)" }}>
            {week.map((d, i) => {
              const on = d === tag, hat = (WEEK_EV[d] || []).length > 0;
              return (
                <button key={d} onClick={() => setTag(d)} aria-pressed={on}
                  style={{ flex: "0 0 auto", border: "none", cursor: "pointer", borderRadius: 12, padding: "9px 12px 8px", minWidth: 46,
                    background: on ? "var(--ink)" : "transparent", boxShadow: on ? "none" : "inset 0 0 0 1px var(--hairline-dark)",
                    display: "grid", justifyItems: "center", gap: 4, fontFamily: "inherit" }}>
                  <span className="u-label" style={{ fontSize: 7.5, color: on ? "rgba(247,245,241,.65)" : "var(--text-muted)" }}>{wd[i]}</span>
                  <span style={{ font: "500 15px var(--font-mono)", color: on ? "var(--paper)" : "var(--ink)" }}>{d}</span>
                  <span style={{ width: 5, height: 5, borderRadius: 99, background: hat ? "var(--signal)" : "transparent" }}></span>
                </button>
              );
            })}
          </div>
          <div style={{ padding: "16px 16px 18px" }}>
            <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>
              {tag === today ? "Heute" : wd[week.indexOf(tag)] + ", " + tag + ". August"} · {(WEEK_EV[tag] || []).length} {(WEEK_EV[tag] || []).length === 1 ? "Termin" : "Termine"}
            </div>
            {(WEEK_EV[tag] || []).length === 0 ? (
              <p style={{ margin: "14px 0 0", font: "400 14px/1.6 var(--font-display)", color: "var(--text-muted)" }}>
                Kein Termin an diesem Tag. Gute Gelegenheit für Rückrufe.
              </p>
            ) : (
              <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
                {WEEK_EV[tag].slice().sort((a, b) => a[0] - b[0]).map(([t, dur, titel, bes], k) => (
                  <div key={k} style={{ display: "flex", gap: 13, alignItems: "flex-start", padding: "13px 15px", borderRadius: 12,
                    background: bes ? "var(--signal-soft)" : "#FFFFFF", boxShadow: bes ? "inset 0 0 0 1px rgba(255,170,9,0.3)" : "inset 0 0 0 1px var(--hairline-dark)",
                    borderLeft: "3px solid var(--signal)" }}>
                    <span style={{ font: "13px var(--font-mono)", color: bes ? "var(--signal-deep)" : "var(--text-muted)", flex: "0 0 auto", paddingTop: 2 }}>{uhr(t)}</span>
                    <div style={{ minWidth: 0 }}>
                      <b style={{ display: "block", font: "500 15px var(--font-display)", color: "var(--ink)" }}>{titel}</b>
                      <span className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 5, display: "block" }}>
                        {dur >= 1 ? dur + " Std" : "30 Min"}{bes ? " · Besichtigung" : ""} · bis {uhr(t + dur)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setSheet(tag)}
              style={{ width: "100%", marginTop: 16, border: "none", cursor: "pointer", borderRadius: 999, padding: "13px 20px",
                background: "#FFFFFF", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "500 14px var(--font-display)", fontFamily: "inherit", color: "var(--ink)" }}>
              Tag im Detail öffnen
            </button>
          </div>
        </div>
        </WReveal>
      ) : view === "woche" ? (
        <WReveal>
        <div style={{ background: "var(--card-bg, #FFFFFF)", borderRadius: 14, boxShadow: "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", overflow: "hidden" }}>
          {/* Tageskopf */}
          <div style={{ display: "grid", gridTemplateColumns: "56px repeat(7, minmax(0, 1fr))", borderBottom: "1px solid var(--hairline-dark)" }}>
            <span></span>
            {week.map((d, i) => (
              <div key={d} style={{ padding: "14px 12px", textAlign: "center", background: i >= 5 ? "rgba(239,234,226,0.4)" : "transparent" }}>
                <span className="u-label" style={{ fontSize: 8, color: "var(--text-muted)" }}>{wd[i]}</span>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, marginLeft: 8, borderRadius: "50%", font: "500 12px var(--font-mono)", color: "var(--ink)", boxShadow: d === today ? "0 0 0 2px var(--signal)" : "none" }}>{d}</span>
              </div>
            ))}
          </div>
          {/* Zeitraster */}
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "56px repeat(7, minmax(0, 1fr))", height: (H1 - H0) * PXH }}>
            <div style={{ position: "relative" }}>
              {Array.from({ length: H1 - H0 }, (_, i) => (
                <span key={i} className="u-label" style={{ position: "absolute", top: i * PXH - 5, right: 10, fontSize: 7.5, color: "rgba(20,18,16,0.35)" }}>{String(H0 + i).padStart(2, "0")}:00</span>
              ))}
            </div>
            {week.map((d, col) => (
              <div key={d} onClick={() => setSheet(d)} style={{ position: "relative", borderLeft: "1px solid var(--hairline-dark)", background: col >= 5 ? "rgba(239,234,226,0.4)" : "transparent", cursor: "pointer" }}>
                {Array.from({ length: H1 - H0 }, (_, i) => <span key={i} style={{ position: "absolute", top: i * PXH, left: 0, right: 0, height: 1, background: "var(--hairline)" }}></span>)}
                {(WEEK_EV[d] || []).map(([t, dur, title, bes], k) => (
                  <div key={k} style={{ position: "absolute", top: (t - H0) * PXH + 2, left: 5, right: 5, height: dur * PXH - 5, borderRadius: 8, padding: "7px 10px", overflow: "hidden", background: bes ? "var(--signal-soft)" : "#FFFFFF", boxShadow: bes ? "inset 0 0 0 1px rgba(255,170,9,0.3)" : "inset 0 0 0 1px var(--hairline-dark)", borderLeft: "2px solid var(--signal)" }}>
                    <div style={{ font: "9px var(--font-mono)", color: bes ? "var(--signal-deep)" : "var(--text-muted)" }}>{String(Math.floor(t)).padStart(2, "0")}:{t % 1 ? "30" : "00"}</div>
                    <div style={{ font: "500 11.5px var(--font-display)", color: "var(--ink)", marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
                  </div>
                ))}
              </div>
            ))}
            {/* Jetzt-Linie (08:12) */}
            <div style={{ position: "absolute", left: 56, right: 0, top: (8.2 - H0) * PXH, height: 1, background: "var(--signal)", zIndex: 3 }}>
              <span style={{ position: "absolute", left: -5, top: -3, width: 7, height: 7, borderRadius: "50%", background: "var(--signal)" }}></span>
            </div>
          </div>
        </div>
        </WReveal>
      ) : (
        <WReveal>
        <div style={{ background: "var(--card-bg, #FFFFFF)", borderRadius: 14, boxShadow: "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
            {wd.map((w, i) => <div key={w} className="u-label" style={{ fontSize: 8.5, color: "rgba(20,18,16,0.4)", padding: "16px 16px 12px", textAlign: "right", background: i >= 5 ? "rgba(239,234,226,0.4)" : "transparent" }}>{w}</div>)}
            {cells.map((d, i) => {
              const col = i % 7;
              const ev = d ? EVENTS[d] : null;
              const extra = ev && ev.length > 2 ? ev.length - 2 : 0;
              return (
                <div key={i} onClick={() => d && setSheet(d)} style={{ height: schmal ? 58 : 96, overflow: "hidden", padding: schmal ? "6px 4px" : "8px 10px 10px", borderTop: "1px solid var(--hairline-dark)", borderLeft: col ? "1px solid var(--hairline-dark)" : "none", background: col >= 5 ? "rgba(239,234,226,0.4)" : "transparent", cursor: d ? "pointer" : "default" }}>
                  {d && <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", font: "11px var(--font-mono)", color: d === today ? "var(--ink)" : "var(--text-muted)", boxShadow: d === today ? "0 0 0 2px var(--signal)" : "none" }}>{d}</span>
                  </div>}
                  {ev && <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
                    {ev.slice(0, 2).map(([time, title, besicht], k) => (
                      <div key={k} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 7px", borderRadius: 6, background: besicht ? "var(--signal-soft)" : "#FFFFFF", boxShadow: besicht ? "none" : "inset 0 0 0 1px var(--hairline-dark)" }}>
                        <span style={{ font: "8.5px var(--font-mono)", color: besicht ? "var(--signal-deep)" : "var(--text-muted)", flex: "none" }}>{time}</span>
                        <span style={{ font: "500 10.5px var(--font-display)", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</span>
                      </div>
                    ))}
                    {extra > 0 && <span style={{ font: "600 9px var(--font-mono)", letterSpacing: "0.08em", color: "var(--signal-deep)" }}>+{extra}</span>}
                  </div>}
                </div>
              );
            })}
          </div>
        </div>
        </WReveal>
      )}

      {/* Tages-Sheet von rechts */}
      {sheet != null && (
        <div onClick={() => setSheet(null)} style={{ position: "fixed", inset: 0, zIndex: 120, background: "rgba(11,10,9,0.25)" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: schmal ? 0 : "auto", width: schmal ? "auto" : 420, maxWidth: "100%", background: "#FBFAF6", borderLeft: "1px solid var(--hairline-dark)", boxShadow: "-24px 0 60px -30px rgba(11,10,9,0.4)", animation: "dashPanelIn 400ms var(--ease-unio)", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 26px", borderBottom: "1px solid var(--hairline-dark)" }}>
              <div>
                <div style={{ font: "500 20px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{wd[(sheet + offset - 1) % 7] ? "" : ""}{sheet}. Juli 2026</div>
                <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 5 }}>{(EVENTS[sheet] || []).length} Termine</div>
              </div>
              <button aria-label="Schließen" onClick={() => setSheet(null)} style={{ width: 30, height: 30, borderRadius: "50%", border: "none", cursor: "pointer", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}><WIcon name="x" size={14} /></button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 26px", display: "flex", flexDirection: "column", gap: 10 }}>
              {(EVENTS[sheet] || []).map(([time, title, besicht], k) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, padding: "15px 17px", borderRadius: 11, background: besicht ? "var(--signal-soft)" : "#FFFFFF", boxShadow: besicht ? "inset 0 0 0 1px rgba(255,170,9,0.3)" : "inset 0 0 0 1px var(--hairline-dark)" }}>
                  <span style={{ font: "11px var(--font-mono)", color: besicht ? "var(--signal-deep)" : "var(--text-muted)", flex: "none" }}>{time}</span>
                  <span style={{ font: "500 13.5px var(--font-display)", color: "var(--ink)", flex: 1 }}>{title}</span>
                  {besicht && <span className="u-label" style={{ fontSize: 7.5, color: "var(--signal-deep)" }}>Besichtigung</span>}
                </div>
              ))}
              {!(EVENTS[sheet] || []).length && (
                <div style={{ borderRadius: 12, border: "1.5px dashed var(--hairline-dark)", padding: "36px 20px", textAlign: "center" }}>
                  <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>Keine Termine an diesem Tag.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== §6.7 Anlage-Wizard ===== */
const ARTEN = [
  ["Wohnung", "objekte", "Eigentum, Vorsorge, Erstbezug"],
  ["Haus", "home", "Einfamilien-, Reihen- oder Doppelhaus"],
  ["Grundstück", "pin", "Bauland, Widmung, Projektfläche"],
  ["Büro", "firma", "Gewerbe- und Bürofläche"],
  ["Geschäftslokal", "objekte", "Retail, Gastronomie, Ordination"],
  ["Projekt", "layers", "Mehrere Einheiten als Bauträger"],
];
const DOCS = [["BAB", true], ["Grundrisse", true], ["Energieausweis", true], ["Grundbuchauszug", false]];
function AnlageWizard({ onNav }) {
  const [step, setStep] = React.useState(1);
  const [art, setArt] = React.useState(-1);
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <div style={{ paddingTop: 20, marginBottom: 40 }}>
        <button onClick={() => onNav && onNav("objekte")} style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "none", background: "none", cursor: "pointer", font: "500 13px var(--font-display)", color: "var(--text-muted)", marginBottom: 24 }}><WIcon name="back" size={15} stroke="var(--text-muted)" />Zurück zu den Objekten</button>
        <div className="u-label" style={{ color: "var(--signal-deep)", fontSize: 9 }}>Schritt {step} von 3 · {step === 1 ? "Objektart" : step === 2 ? "KI-Analyse" : "Formular"}</div>
        <div style={{ height: 4, borderRadius: 2, marginTop: 16, background: "var(--paper-2)", overflow: "hidden", maxWidth: 320 }}>
          <div style={{ height: "100%", width: (step / 3 * 100) + "%", background: "var(--signal)", transition: "width .5s var(--ease-unio)" }}></div>
        </div>
      </div>

      {step === 1 && (
        <WReveal>
          <div className="u-label" style={{ color: "var(--signal-deep)", fontSize: 9 }}>Art der Immobilie</div>
          <h1 style={{ margin: "14px 0 0", font: "500 clamp(30px, 3vw, 46px)/1.02 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Wähle den passenden Einstieg.</h1>
          <p style={{ margin: "16px 0 40px", font: "400 16px var(--font-display)", color: "var(--text-muted)" }}>Die Objektart bestimmt Felder, KI-Analyse und Exposé-Vorlage.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
            {ARTEN.map(([label, ic, desc], i) => {
              const on = art === i;
              return (
                <button key={label} onClick={() => setArt(i)} style={{ position: "relative", textAlign: "left", border: "none", cursor: "pointer", background: "#FFFFFF", borderRadius: 14, padding: "26px 24px", boxShadow: `inset 0 0 0 ${on ? 1.5 : 1}px ${on ? "var(--signal)" : "var(--hairline-dark)"}`, transform: on ? "translateY(-2px)" : "none", transition: "all .25s var(--ease-unio)" }}
                  onMouseEnter={(e) => { if (!on) e.currentTarget.style.boxShadow = "inset 0 0 0 1.5px var(--signal)", e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { if (!on) e.currentTarget.style.boxShadow = "inset 0 0 0 1px var(--hairline-dark)", e.currentTarget.style.transform = "none"; }}>
                  <WIcon name={ic} size={24} stroke="var(--signal-deep)" />
                  {on && <span style={{ position: "absolute", top: 18, right: 18, width: 20, height: 20, borderRadius: "50%", background: "var(--signal)", color: "var(--on-signal)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><WIcon name="check" size={12} stroke="var(--on-signal)" /></span>}
                  <div style={{ font: "500 19px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 22 }}>{label}</div>
                  <div style={{ font: "400 13px/1.5 var(--font-display)", color: "var(--text-muted)", marginTop: 8 }}>{desc}</div>
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 32 }}>
            <WBtn variant="signal" size="md" knob disabled={art < 0} onClick={() => setStep(2)}>Weiter</WBtn>
          </div>
        </WReveal>
      )}

      {step === 2 && (
        <WReveal>
          <WReco tone="hi" label="Gewählte Immobilienart" value={art >= 0 ? ARTEN[art][0] : "Wohnung"} meta="Als Entwurf angelegt." arrow style={{ marginBottom: 28 }} />
          <div style={{ background: "#FFFFFF", borderRadius: 14, padding: 30, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
            <div className="u-label" style={{ color: "var(--signal-deep)", fontSize: 9 }}>KI-Analyse</div>
            <h2 style={{ margin: "12px 0 0", font: "500 26px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Dokumente sammeln und analysieren lassen.</h2>
            <p style={{ margin: "12px 0 28px", font: "400 15px/1.6 var(--font-display)", color: "var(--text-muted)", maxWidth: 560 }}>Die UNIO KI liest Unterlagen aus, strukturiert die Objektdaten und schlägt Exposétexte vor. Du prüfst und gibst frei.</p>
            <div style={{ border: "1.5px dashed var(--hairline-dark)", borderRadius: 12, padding: "40px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <WIcon name="upload" size={26} stroke="var(--signal-deep)" />
              <div style={{ font: "500 16px var(--font-display)", color: "var(--ink)" }}>Dokumente für die KI-Analyse hinzufügen</div>
              <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 9 }}>PDF · BILDER · DOC · TXT</div>
            </div>
            <p className="u-label" style={{ color: "var(--signal-deep)", fontSize: 9, marginTop: 18 }}>Nur Analyse-Unterlagen. Galeriebilder gehören in den Medien-Schritt.</p>
            <div style={{ marginTop: 24 }}>
              {DOCS.map(([n, on], i) => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderTop: i === 0 ? "none" : "1px solid var(--hairline-dark)" }}>
                  <span style={{ width: 34, height: 34, borderRadius: 8, background: "#EFEAE2", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none", color: "var(--text-muted)" }}><WIcon name="objekte" size={15} stroke="var(--text-muted)" /></span>
                  <span style={{ flex: 1, font: "500 14px var(--font-display)", color: "var(--ink)" }}>{n}</span>
                  <WPillSwitch label={on ? "aktiv" : "aus"} on={on} onToggle={() => {}} />
                </div>
              ))}
              <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 9, textAlign: "right", marginTop: 12 }}>3 von 4 für Analyse aktiv</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
              <WBtn variant="signal" size="md" knob>KI-Analyse starten</WBtn>
              <button style={{ border: "none", background: "none", cursor: "pointer", font: "500 13px var(--font-display)", color: "var(--text-muted)" }}>Prompt anzeigen</button>
              <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5, marginLeft: "auto" }}>Analyse-Modell: UNIO-1</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
            <WBtn variant="ghost" size="md" onClick={() => setStep(1)}>Zurück</WBtn>
            <WBtn variant="signal" size="md" knob onClick={() => onNav && onNav("objekte")}>Weiter zum Formular</WBtn>
          </div>
        </WReveal>
      )}
    </div>
  );
}

Object.assign(window, { Kontakte, Kalender, AnlageWizard });
