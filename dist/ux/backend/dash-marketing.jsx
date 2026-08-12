/* UNIO — Meta Marketing: Kampagnen-Transparenz ohne Ads-Manager-Komplexität (Fassung A mit CPL). */
const MMIc = (p) => <window.Icon {...p} />;
const MM_RM = window.DASH_P_RM;

const KAMPAGNEN = [
  { obj: "Villa Ecoluxe", img: "/assets/img/ecoluxe.jpg", st: "aktiv", stL: "Aktiv", laufzeit: "SEIT 12. MAI · FLIGHT 2", spent: 1240, budget: 2500, kpi: "LEADS 34 +12 % · QUAL. 38 % +4 % · CPL € 36 -8 %", weeks: [4, 6, 5, 8, 7, 11], placements: [["FEED", 58], ["STORIES", 27], ["REELS", 15]], leads: [["16.07. · 07:41", "META · FEED", "QUALIFIZIERT"], ["15.07. · 19:22", "META · STORIES", "OFFEN"], ["15.07. · 12:05", "META · FEED", "QUALIFIZIERT"]], pulse: true, best: true },
  { obj: "Penthouse Beheim", img: "/assets/img/beheim.jpg", st: "aktiv", stL: "Aktiv", laufzeit: "SEIT 2. JUNI · FLIGHT 1", spent: 780, budget: 1500, kpi: "LEADS 21 +6 % · QUAL. 33 % +2 % · CPL € 41 -3 %", weeks: [3, 4, 4, 6, 5, 7], placements: [["FEED", 64], ["STORIES", 22], ["REELS", 14]], leads: [["16.07. · 06:58", "META · FEED", "OFFEN"], ["15.07. · 17:40", "META · REELS", "QUALIFIZIERT"]] },
  { obj: "Das Albrecht", img: "/assets/img/albrecht.jpg", st: "angefragt", stL: "Boost angefragt", laufzeit: "SEIT 28. APR · FLIGHT 3", spent: 2380, budget: 2500, kpi: "LEADS 28 +9 % · QUAL. 41 % +5 % · CPL € 33 -11 %", weeks: [5, 7, 6, 9, 8, 10], placements: [["FEED", 51], ["STORIES", 31], ["REELS", 18]], leads: [["15.07. · 21:10", "META · FEED", "QUALIFIZIERT"]] },
  { obj: "ObenZwei", img: "/assets/img/obenzwei.jpg", st: "pausiert", stL: "Pausiert", laufzeit: "PAUSIERT SEIT 30. JUNI", spent: 1500, budget: 1500, kpi: "LEADS 12 · QUAL. 25 % · CPL € 48", weeks: [4, 5, 3, 2, 1, 0], placements: [["FEED", 72], ["STORIES", 20], ["REELS", 8]], leads: [] },
];

function MmPill({ st, children, pulse }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 7, fontSize: 9, padding: "5px 11px", borderRadius: 999, whiteSpace: "nowrap" };
  if (st === "aktiv") return <span className="u-label" style={{ ...base, background: "var(--signal-soft)", color: "var(--signal-deep)" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)", animation: pulse && !MM_RM ? "uPulse 2s var(--ease-unio) infinite" : "none" }}></span>{children}</span>;
  if (st === "angefragt") return <span className="u-label" style={{ ...base, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--signal-deep)" }}>{children}</span>;
  return <span className="u-label" style={{ ...base, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}>{children}</span>;
}

function MetaMarketing({ onNav }) {
  const { Reveal: Rv, RevealL: RvL } = window;
  const [boost, setBoost] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [angefragt, setAngefragt] = React.useState({});
  return (
    <div style={{ maxWidth: 1360, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
        <span className="u-label" style={{ fontSize: 8.5, padding: "6px 13px", borderRadius: 999, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}>Meta-Daten · Stand 08:00</span>
      </div>
      <RvL style={{ marginTop: 36 }}>
        <h1 style={{ margin: 0, font: "500 clamp(34px, 3.4vw, 52px)/1.02 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Meta Marketing<span style={{ color: "var(--signal)" }}>.</span></h1>
        <p style={{ margin: "16px 0 0", font: "400 16px/1.5 var(--font-display)", color: "var(--text-muted)", maxWidth: 460 }}>Deine Kampagnen, deine Leads, dein Hebel.</p>
      </RvL>
      {/* Band + Ink-Anker */}
      <Rv>
        <div style={{ display: "flex", alignItems: "stretch", gap: 40, marginTop: 48, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "baseline", columnGap: "clamp(20px, 2.4vw, 44px)", flex: 1, minWidth: 520 }}>
            {[["3", null, "Aktive Kampagnen", null], ["86", null, "Leads · 30 Tage", "+12 %"], ["38", "%", "Qualifizierungsquote", "+4 %"], ["€ 36", null, "Ø CPL", "-8 %"]].map(([v, suf, l, d], i) => (
              <React.Fragment key={l}>
                {i > 0 && <span style={{ width: 1, height: 44, background: "rgba(20,18,16,.14)", alignSelf: "center" }}></span>}
                <div>
                  <div style={{ font: "600 46px/1 var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{v}{suf && <span style={{ fontSize: 20, color: "rgba(20,18,16,.4)", marginLeft: 6, fontWeight: 500 }}>{suf}</span>}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 12, whiteSpace: "nowrap" }}>
                    <span className="u-label" style={{ fontSize: 9.5, color: "rgba(20,18,16,.45)", whiteSpace: "nowrap" }}>{l}</span>
                    {d && <span style={{ font: "10px var(--font-mono)", color: d.startsWith("+") ? "var(--signal)" : "rgba(20,18,16,.4)" }}>{d}</span>}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div style={{ background: "var(--ink)", borderRadius: 14, padding: "22px 26px", color: "var(--paper)", cursor: "pointer", minWidth: 250 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
              <span className="u-label" style={{ fontSize: 8.5, color: "rgba(251,250,246,.55)" }}>Stärkste Kampagne</span>
              <span style={{ width: 30, height: 30, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 0 1px rgba(247,245,241,0.2)" }}><MMIc name="arrow" size={13} stroke="var(--paper)" style={{ transform: "rotate(45deg)" }} /></span>
            </div>
            <div style={{ font: "500 15px var(--font-display)", marginTop: 14 }}>Villa Ecoluxe</div>
            <div style={{ font: "600 44px/1 var(--font-display)", letterSpacing: "-0.02em", marginTop: 10, fontVariantNumeric: "tabular-nums" }}>18<span style={{ fontSize: 16, color: "rgba(251,250,246,.5)", marginLeft: 7, fontWeight: 500 }}>Leads · 7 Tage</span></div>
            <div style={{ font: "600 9px var(--font-mono)", letterSpacing: "0.1em", color: "rgba(251,250,246,.55)", marginTop: 12 }}>BESTE QUAL.-QUOTE · 41 %</div>
          </div>
        </div>
      </Rv>
      {/* Kampagnen-Karten */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 56 }}>
        {KAMPAGNEN.map((k, i) => <KampagnenKarte key={k.obj} k={k} delay={i * 60} angefragt={!!angefragt[k.obj]} onBoost={() => setBoost(k)} onPreview={() => setPreview(k)} />)}
        {/* Leerzeile: Objekt ohne Kampagne */}
        <Rv delay={280}>
          <div style={{ borderRadius: 14, border: "1.5px dashed var(--hairline-dark)", padding: "26px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <span style={{ font: "400 14.5px var(--font-display)", color: "var(--text-muted)" }}>Für <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Garten-Refugium Wienerwald</strong> läuft keine Kampagne.</span>
            <button onClick={() => setBoost({ obj: "Garten-Refugium Wienerwald", img: "/assets/img/vienna-garden.jpg", neu: true })} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "10px 20px", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "500 13px var(--font-display)", color: "var(--ink)" }}>Nachfrage aufbauen</button>
          </div>
        </Rv>
      </div>
      <div style={{ font: "8.5px var(--font-mono)", letterSpacing: "0.1em", color: "rgba(20,18,16,0.35)", margin: "20px 4px 0" }}>ATTRIBUTION 7 TAGE KLICK · STEUERUNG ÜBER DIE ENGINE</div>
      {boost && <BoostSheet k={boost} onClose={() => setBoost(null)} onSent={() => { setAngefragt((s) => ({ ...s, [boost.obj]: true })); setBoost(null); }} />}
      {preview && <CreativeOverlay k={preview} onClose={() => setPreview(null)} onChange={() => { setPreview(null); setBoost(preview); }} />}
    </div>
  );
}

function KampagnenKarte({ k, delay, onBoost, onPreview, angefragt }) {
  const { Reveal: Rv } = window;
  const [open, setOpen] = React.useState(false);
  const [ref, run] = window.useInView(0.2);
  const st = angefragt ? "angefragt" : k.st;
  const stL = angefragt ? "Boost angefragt" : k.stL;
  const maxW = Math.max(...k.weeks, 1);
  return (
    <Rv delay={delay}>
      <div style={{ background: "var(--card-bg, #FFFFFF)", borderRadius: 14, boxShadow: "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", padding: 24 }}>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 24, alignItems: "center" }}>
          {/* Zone 1: Objekt */}
          <div style={{ display: "flex", alignItems: "center", gap: 15, minWidth: 240 }}>
            <img src={k.img} alt="" style={{ width: 72, height: 72, borderRadius: 12, objectFit: "cover", flex: "none", filter: st === "pausiert" ? "grayscale(0.6)" : "none" }} />
            <div>
              <div style={{ font: "500 16px var(--font-display)", color: "var(--ink)" }}>{k.obj}</div>
              <div style={{ marginTop: 7 }}><MmPill st={st} pulse={k.pulse}>{stL}</MmPill></div>
              <div style={{ font: "8.5px var(--font-mono)", letterSpacing: "0.08em", color: "var(--text-muted)", marginTop: 8 }}>{k.laufzeit}</div>
            </div>
          </div>
          {/* Zone 2: Budget-Lineal + Kennzahlenzeile */}
          <div style={{ minWidth: 0, padding: "0 8px" }}>
            <div style={{ position: "relative", height: 4, borderRadius: 2, background: "#E9E4DC", maxWidth: 420 }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: 4, borderRadius: 2, background: "var(--signal)", width: run ? (k.spent / k.budget * 100) + "%" : "0%", transition: "width 900ms var(--ease-unio)" }}></div>
              <span style={{ position: "absolute", left: "100%", top: -4, width: 1, height: 12, background: "rgba(20,18,16,.35)" }}></span>
            </div>
            <div style={{ font: "9px var(--font-mono)", letterSpacing: "0.08em", color: "var(--text-muted)", marginTop: 10 }}>€ {k.spent.toLocaleString("de-AT")} VON € {k.budget.toLocaleString("de-AT")} · JULI</div>
            <div style={{ font: "10px var(--font-mono)", letterSpacing: "0.05em", color: "var(--ink-2)", marginTop: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{k.kpi}</div>
          </div>
          {/* Zone 3: Creative + Expand */}
          <button onClick={onPreview} aria-label="Creative ansehen" style={{ border: "none", cursor: "pointer", padding: 0, borderRadius: 10, overflow: "hidden", width: 54, height: 96, flex: "none", position: "relative" }}>
            <img src={k.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <span style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,10,9,.5), transparent 60%)" }}></span>
            <span style={{ position: "absolute", left: 6, bottom: 5, font: "600 7px var(--font-mono)", letterSpacing: "0.08em", color: "#FBFAF6" }}>9:16</span>
          </button>
          <button onClick={() => setOpen((v) => !v)} aria-label="Aufklappen" style={{ width: 34, height: 34, borderRadius: "50%", border: "none", cursor: "pointer", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--ink)" }}><MMIc name="arrow" size={14} style={{ transform: open ? "rotate(-90deg)" : "rotate(90deg)", transition: "transform .3s var(--ease-unio)" }} /></button>
        </div>
        {/* Aufgeklappt */}
        <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 300ms var(--ease-unio)" }}>
          <div style={{ overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1.2fr", gap: 32, marginTop: 26, paddingTop: 24, borderTop: "1px solid var(--hairline)" }}>
              <div>
                <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginBottom: 12 }}>Leads pro Woche</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 90 }}>
                  {k.weeks.map((v, i) => {
                    const best = v === maxW;
                    return <span key={i} style={{ flex: 1, height: open ? (v / maxW * 100) + "%" : "0%", minHeight: v ? 3 : 0, background: best ? "var(--signal)" : "color-mix(in oklch, var(--signal) 32%, #E2DCCF)", borderRadius: 3, transition: `height 700ms var(--ease-unio) ${i * 60}ms` }}></span>;
                  })}
                </div>
                <div style={{ font: "8px var(--font-mono)", letterSpacing: "0.08em", color: "var(--text-muted)", marginTop: 8 }}>KW 24 – 29 · BESTE WOCHE {maxW} LEADS</div>
              </div>
              <div>
                <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginBottom: 12 }}>Placement-Split</div>
                <div style={{ display: "flex", gap: 3, height: 10, borderRadius: 5, overflow: "hidden" }}>
                  {k.placements.map(([n, v], i) => <span key={n} style={{ width: v + "%", background: i === 0 ? "var(--signal)" : i === 1 ? "color-mix(in oklch, var(--signal) 55%, #E2DCCF)" : "color-mix(in oklch, var(--signal) 28%, #E2DCCF)", borderRadius: 3 }}></span>)}
                </div>
                <div style={{ marginTop: 12 }}>
                  {k.placements.map(([n, v]) => (
                    <div key={n} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--hairline)" }}>
                      <span style={{ font: "8.5px var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)" }}>{n}</span>
                      <span style={{ font: "11px var(--font-mono)", color: "var(--ink)" }}>{v} %</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginBottom: 12 }}>Letzte Leads</div>
                {k.leads.length ? k.leads.map(([t, src, q], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: "1px solid var(--hairline)" }}>
                    <span style={{ font: "9.5px var(--font-mono)", color: "var(--text-muted)", flex: "none" }}>{t}</span>
                    <span style={{ font: "8px var(--font-mono)", letterSpacing: "0.06em", color: "rgba(20,18,16,0.4)", flex: 1 }}>{src}</span>
                    <span className="u-label" style={{ fontSize: 7.5, padding: "4px 9px", borderRadius: 999, ...(q === "QUALIFIZIERT" ? { background: "var(--signal-soft)", color: "var(--signal-deep)" } : { boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }) }}>{q}</span>
                  </div>
                )) : <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>Keine Leads seit Pause.</span>}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 22 }}>
              <button onClick={onBoost} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "10px 20px", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "500 13px var(--font-display)", color: "var(--ink)" }}>Boost anfragen</button>
              <button onClick={onPreview} style={{ border: "none", background: "none", cursor: "pointer", font: "500 13px var(--font-display)", color: "var(--signal-deep)", padding: 0 }}>Creatives ansehen</button>
              <button style={{ border: "none", background: "none", cursor: "pointer", font: "500 13px var(--font-display)", color: "rgba(20,18,16,0.55)", padding: 0, marginLeft: "auto" }}>Pausieren</button>
              <span style={{ font: "7.5px var(--font-mono)", letterSpacing: "0.1em", color: "rgba(20,18,16,0.35)" }}>WIRKT AB MORGEN 00:00</span>
            </div>
          </div>
        </div>
      </div>
    </Rv>
  );
}

/* Boost-Flow: Sheet von rechts, drei Entscheidungen */
function BoostSheet({ k, onClose, onSent }) {
  const [betrag, setBetrag] = React.useState(500);
  const [eigener, setEigener] = React.useState("");
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 150, background: "rgba(11,10,9,0.25)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 420, maxWidth: "94vw", background: "#FBFAF6", borderLeft: "1px solid var(--hairline-dark)", boxShadow: "-24px 0 60px -30px rgba(11,10,9,0.4)", animation: "dashPanelIn 400ms var(--ease-unio)", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 26px", borderBottom: "1px solid var(--hairline-dark)" }}>
          <div style={{ font: "500 19px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>{k.neu ? "Kampagne anfragen" : "Boost anfragen"}</div>
          <button aria-label="Schließen" onClick={onClose} style={{ width: 30, height: 30, borderRadius: "50%", border: "none", cursor: "pointer", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}><MMIc name="x" size={14} /></button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "22px 26px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 16px", borderRadius: 12, background: "#FFFFFF", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
            <img src={k.img} alt="" style={{ width: 46, height: 46, borderRadius: 10, objectFit: "cover", flex: "none" }} />
            <div>
              <div style={{ font: "500 14px var(--font-display)", color: "var(--ink)" }}>{k.obj}</div>
              <div style={{ font: "8.5px var(--font-mono)", letterSpacing: "0.08em", color: "var(--text-muted)", marginTop: 4 }}>{k.neu ? "NOCH KEINE KAMPAGNE" : k.laufzeit}</div>
            </div>
          </div>
          <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 26 }}>Zusatzbudget</div>
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            {[250, 500, 1000].map((b) => (
              <button key={b} onClick={() => { setBetrag(b); setEigener(""); }} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "10px 18px", background: betrag === b && !eigener ? "var(--ink)" : "transparent", boxShadow: betrag === b && !eigener ? "none" : "inset 0 0 0 1px var(--hairline-dark)", font: "500 13px var(--font-mono)", color: betrag === b && !eigener ? "var(--paper)" : "var(--ink)", fontVariantNumeric: "tabular-nums" }}>€ {b}</button>
            ))}
            <input value={eigener} onChange={(e) => setEigener(e.target.value)} placeholder="Eigener Betrag" style={{ width: 120, border: "none", outline: "none", borderRadius: 999, padding: "10px 16px", background: "#FFFFFF", boxShadow: eigener ? "inset 0 0 0 2px var(--signal)" : "inset 0 0 0 1px var(--hairline-dark)", font: "500 13px var(--font-mono)", color: "var(--ink)" }} />
          </div>
          <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 26 }}>Nachricht an die Engine</div>
          <textarea placeholder="Optional, 2 Zeilen" rows={2} style={{ display: "block", width: "100%", boxSizing: "border-box", marginTop: 12, border: "none", outline: "none", borderRadius: 10, padding: "12px 15px", background: "#FFFFFF", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "400 13px/1.5 var(--font-display)", color: "var(--ink)", resize: "vertical" }}></textarea>
          <div style={{ font: "8px var(--font-mono)", letterSpacing: "0.1em", color: "rgba(20,18,16,0.35)", marginTop: 18 }}>DIE ANFRAGE GEHT ALS AUFTRAG AN DIE ENGINE. KEIN DIREKTEINGRIFF IN META.</div>
        </div>
        <div style={{ padding: "18px 26px", borderTop: "1px solid var(--hairline-dark)" }}>
          <button onClick={onSent} style={{ width: "100%", border: "none", cursor: "pointer", borderRadius: 999, padding: "13px 0", background: "var(--ink)", color: "var(--paper)", font: "500 14px var(--font-display)" }}>Anfrage senden</button>
        </div>
      </div>
    </div>
  );
}

/* Creative-Preview Overlay */
function CreativeOverlay({ k, onClose, onChange }) {
  const [fmt, setFmt] = React.useState("9:16");
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 160, background: "rgba(11,10,9,0.4)", display: "flex", alignItems: "center", justifyContent: "center", padding: 28 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(720px, 100%)", maxHeight: "90vh", overflowY: "auto", background: "#FBFAF6", borderRadius: 18, padding: 30, boxShadow: "0 30px 80px rgba(11,10,9,0.35)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ font: "500 18px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>Creative · {k.obj}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "inline-flex", gap: 4, background: "#FFFFFF", borderRadius: 999, padding: 4, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
              {["9:16", "1:1"].map((f) => <button key={f} onClick={() => setFmt(f)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "6px 14px", background: fmt === f ? "var(--ink)" : "transparent", color: fmt === f ? "var(--paper)" : "var(--text-muted)", font: "500 11px var(--font-mono)" }}>{f}</button>)}
            </div>
            <button aria-label="Schließen" onClick={onClose} style={{ width: 30, height: 30, borderRadius: "50%", border: "none", cursor: "pointer", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}><MMIc name="x" size={14} /></button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 22 }}>
          <div style={{ position: "relative", width: fmt === "9:16" ? 250 : 380, aspectRatio: fmt === "9:16" ? "9/16" : "1/1", borderRadius: 14, overflow: "hidden", transition: "width .35s var(--ease-unio)" }}>
            <img src={k.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <span style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,10,9,.55), transparent 45%)" }}></span>
            <div style={{ position: "absolute", left: 18, right: 18, bottom: 18, color: "#FBFAF6" }}>
              <div style={{ font: "600 8px var(--font-mono)", letterSpacing: "0.2em" }}>ZUM VERKAUF · WIEN</div>
              <div style={{ font: "600 20px/1.15 var(--font-display)", letterSpacing: "-0.01em", marginTop: 8 }}>{k.obj}. Jetzt besichtigen.</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 22 }}>
          {[["PRIMÄRTEXT", "Klarheit statt Inserat: " + k.obj + " mit echten Daten, echter Nachfrage und direktem Besichtigungslink."], ["HEADLINE", k.obj + " — jetzt besichtigen"]].map(([l, t]) => (
            <div key={l} style={{ padding: "12px 0", borderTop: "1px solid var(--hairline)" }}>
              <span style={{ font: "600 8px var(--font-mono)", letterSpacing: "0.14em", color: "var(--text-muted)" }}>{l}</span>
              <p style={{ margin: "7px 0 0", font: "400 13.5px/1.5 var(--font-display)", color: "var(--ink)" }}>{t}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18 }}>
          <span style={{ font: "8.5px var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)" }}>LÄUFT SEIT 12. MAI · 3 VARIANTEN</span>
          <button onClick={onChange} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "10px 20px", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "500 13px var(--font-display)", color: "var(--ink)" }}>Änderung anfragen</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MetaMarketing });
