/* UNIO CIRCLE — Community-Hub: Puls, Saisonziel, Saison-Ink, Voting, Referral, Board (opt-in), Meilensteine. */
const { Card: CCard, CardHead: CHead, Chip: CChip, Reveal: CRv, RevealL: CRvL } = window;
const CIc = (p) => <window.Icon {...p} />;

const PULS = [
  { ini: "EN", t1: "Elena Novak · 50. Besichtigung", pill: "Meilenstein", when: "vor 1 h" },
  { ini: "JP", t1: "Deal abgeschlossen · 1170 Wien", t2: "Jonas Peer · Doppelmakler", when: "vor 2 h" },
  { ini: "C", t1: "Neues Quartals-Voting geöffnet", t2: "Q4 Marketing-Budget · endet in 5 Tagen", when: "vor 4 h" },
  { ini: "MW", t1: "Markus Wolf hat Lisa Maurer geworben", t2: "Referral · Onboarding gestartet", when: "gestern" },
  { ini: "SB", t1: "Sophie Berger · Serie: 21 Tage Erstkontakt unter 2 h", pill: "Beste Serie", when: "gestern" },
];
const BOARD = [
  ["01", "EN", "Elena Novak", "1.240", "+2", "pos"], ["02", "JP", "Jonas Peer", "1.185", "·", null],
  ["03", "SB", "Sophie Berger", "1.120", "+1", "pos"], ["04", "MW", "Markus Wolf", "1.045", "-3", "neg"],
];
const MEILEN = [["100. qualifizierter Lead", "Juli"], ["Beste Serie · 23 Tage", "Juni"], ["€ 1 Mio. begleitetes Volumen", "Mai"]];

function CAvatar({ ini, size = 36 }) {
  return <span style={{ width: size, height: size, borderRadius: "50%", background: "var(--paper-2)", flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", font: `600 ${size < 30 ? 9 : 12}px var(--font-display)`, color: "rgba(20,18,16,.55)" }}>{ini}</span>;
}
function MsPill({ children }) {
  return <span className="u-label" style={{ display: "inline-block", padding: "4px 10px", borderRadius: 999, background: "var(--signal-soft)", color: "var(--signal-deep)", fontSize: 8 }}>{children}</span>;
}
function PulsItem({ e, compact }) {
  return (
    <div style={{ display: "flex", gap: compact ? 10 : 14, padding: compact ? "10px 0" : "16px 0", borderBottom: "1px solid var(--hairline)", alignItems: compact ? "center" : "flex-start" }}>
      <CAvatar ini={e.ini} size={compact ? 24 : 36} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: `500 ${compact ? 12.5 : 15}px var(--font-display)`, color: "var(--ink)", whiteSpace: compact ? "nowrap" : "normal", overflow: compact ? "hidden" : "visible", textOverflow: "ellipsis" }}>{e.t1}</div>
        {!compact && <div style={{ marginTop: 5 }}>{e.pill ? <MsPill>{e.pill}</MsPill> : <span className="u-label" style={{ fontSize: 8, color: "var(--text-muted)" }}>{e.t2}</span>}</div>}
      </div>
      <span className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", flex: "none" }}>{e.when}</span>
    </div>
  );
}

function DashCircle({ onNav }) {
  const [voted, setVoted] = React.useState(false);
  const [ref, run] = window.useInView(0.3);
  const [sheet, setSheet] = React.useState(false);
  const [member, setMember] = React.useState(true);
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setLoaded(true), 550); return () => clearTimeout(t); }, []);
  return (
    <div style={{ maxWidth: 1360, margin: "0 auto" }}>
      {/* Kopfzone (v2.8-Maße) */}
      <CRvL style={{ marginTop: 72 }}>
        <h1 style={{ margin: 0, font: "600 clamp(38px, 4.4vw, 64px)/1.05 var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>CIRCLE<span style={{ color: "var(--signal)" }}>.</span></h1>
        <p style={{ margin: "22px 0 0", font: "400 17px/1.55 var(--font-display)", color: "rgba(20,18,16,.55)", maxWidth: 520 }}>Was sich in der Community bewegt: Meilensteine, Deals, Votings und deine Saison Q3.</p>
      </CRvL>
      <CRv>
        <div style={{ display: "flex", alignItems: "baseline", columnGap: 44, marginTop: 56, flexWrap: "wrap" }}>
          {[["38", null, "Aktive Makler"], ["12", null, "Deals diese Saison"], ["€ 212", "Mio", "Umgesetztes Volumen · gesamt"], ["18", "%", "Dein Perzentil · Top-Segment"]].map(([v, suf, l], i) => (
            <React.Fragment key={l}>
              {i > 0 && <span style={{ width: 1, height: 44, background: "rgba(20,18,16,.14)", alignSelf: "center" }}></span>}
              <div>
                <div style={{ font: "600 46px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{v}{suf && <span style={{ fontSize: 20, color: "rgba(20,18,16,.4)", marginLeft: 6, fontWeight: 500 }}>{suf}</span>}</div>
                <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 12 }}>{l}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </CRv>

      {/* Bento 5/4/3 */}
      <div style={{ marginTop: 120, display: "grid", gridTemplateColumns: "5fr 4fr 3fr", gap: 24, alignItems: "start" }}>
        {/* Puls, hoch */}
        <CRv style={{ gridRow: "span 2", height: "100%" }}>
          <CCard style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CHead title="CIRCLE-Puls" right={<span style={{ width: 36, height: 36, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}><CIc name="arrow" size={14} style={{ transform: "rotate(-45deg)" }} stroke="var(--ink)" /></span>} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {!loaded && Array.from({ length: 5 }, (_, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: "1px solid var(--hairline)", alignItems: "center" }}>
                  <span style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--paper-2)", animation: "circleSkel 1.4s ease-in-out infinite" }}></span>
                  <span style={{ flex: 1, height: 12, borderRadius: 6, background: "var(--paper-2)", animation: "circleSkel 1.4s ease-in-out infinite", animationDelay: i * 80 + "ms" }}></span>
                </div>
              ))}
              {loaded && PULS.map((e, i) => <PulsItem key={i} e={e} />)}
              <button style={{ marginTop: "auto", paddingTop: 18, alignSelf: "flex-start", border: "none", background: "none", cursor: "pointer", font: "500 15px var(--font-display)", color: "var(--signal-deep)" }}>Alle Aktivitäten →</button>
            </div>
          </CCard>
        </CRv>

        {/* Saisonziel */}
        <CRv delay={60}><SaisonzielCard refEl={ref} run={run} /></CRv>

        {/* Saison Q3 — Ink-Anker */}
        <CRv delay={100}>
          <div onClick={() => onNav && onNav("saisonrueckblick")} style={{ background: "var(--ink)", borderRadius: window.DASH_R || 12, padding: 26, color: "var(--paper)", cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ font: "500 18px var(--font-display)" }}>Saison Q3</span>
              <span style={{ width: 34, height: 34, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 0 1px rgba(247,245,241,0.2)" }}><CIc name="arrow" size={14} stroke="var(--paper)" style={{ transform: "rotate(-45deg)" }} /></span>
            </div>
            <div style={{ font: "600 56px/1 var(--font-display)", letterSpacing: "-0.03em", marginTop: 22, fontVariantNumeric: "tabular-nums" }}>46<span style={{ fontSize: 20, color: "rgba(251,250,246,.5)", marginLeft: 6, fontWeight: 500 }}>Tage</span></div>
            <div className="u-label" style={{ fontSize: 8, color: "rgba(251,250,246,.55)", marginTop: 12 }}>verbleibend · Rückblick am 30.09.</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(13, 10px)", gap: 7, marginTop: 22 }}>
              {Array.from({ length: 13 }, (_, i) => (
                <span key={i} style={{ width: 10, height: 10, borderRadius: 3, background: i < 6 ? "var(--signal)" : i === 6 ? "var(--paper)" : "rgba(251,250,246,.18)", outline: i === 6 ? "2px solid var(--signal)" : "none", outlineOffset: 1 }}></span>
              ))}
            </div>
            <div className="u-label" style={{ fontSize: 8, color: "rgba(251,250,246,.55)", marginTop: 18 }}>Woche 7 von 13</div>
          </div>
        </CRv>

        {/* Voting */}
        <CRv delay={80}>
          <CCard>
            <CHead title="Quartals-Voting" right={<CChip>41 Stimmen</CChip>} />
            <p style={{ margin: 0, font: "500 17px/1.4 var(--font-display)", color: "var(--ink)" }}>Wohin fließt der Q4-Schwerpunkt des Community-Marketings?</p>
            {[["Meta-Kampagnen", 54, "var(--signal)"], ["Content-Studio", 31, "color-mix(in oklch, var(--signal) 62%, #E2DCCF)"], ["Events & Formate", 15, "color-mix(in oklch, var(--signal) 32%, #E2DCCF)"]].map(([n, v, col], i) => (
              <div key={n} style={{ marginTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 7 }}>
                  <span style={{ font: "500 14px var(--font-display)", color: "var(--ink)", display: "inline-flex", alignItems: "center", gap: 7 }}>{voted && i === 0 && <CIc name="check" size={13} stroke="var(--signal-deep)" />}{n}</span>
                  <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{v} %</span>
                </div>
                <div style={{ position: "relative", height: 3, borderRadius: 2, background: "var(--paper-2)" }}><div style={{ position: "absolute", height: 3, borderRadius: 2, background: col, width: v + "%" }}></div></div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
              <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>Endet in 5 Tagen</span>
              {voted
                ? <span className="u-label" style={{ fontSize: 8.5, color: "var(--ink)" }}>Deine Stimme · Meta-Kampagnen</span>
                : <button onClick={() => setVoted(true)} style={{ border: "none", cursor: "pointer", padding: "10px 20px", borderRadius: 999, background: "var(--ink)", color: "var(--paper)", font: "500 14px var(--font-display)" }}>Abstimmen</button>}
            </div>
          </CCard>
        </CRv>

        {/* Referral */}
        <CRv delay={120}><ReferralCard /></CRv>

        {/* Board (wide) */}
        <CRv style={{ gridColumn: "span 2" }}>
          <CCard>
            <CHead title="Saison-Board" right={<CChip>Opt-in · 21 von 38 nehmen teil</CChip>} />
            <button onClick={() => setSheet(true)} className="u-label" style={{ display: "block", border: "none", background: "none", cursor: "pointer", padding: 0, textAlign: "left", fontSize: 8, color: "var(--text-muted)", marginTop: -6 }}>Saison-Index aus Antwortzeit, Besichtigungs- und Follow-up-Disziplin · keine Umsätze</button>
            {member ? (
            <div style={{ marginTop: 14 }}>
              {BOARD.map(([r, ini, n, idx, d, tone]) => (
                <div key={r} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid var(--hairline)" }}>
                  <span style={{ width: 24, font: "12px var(--font-mono)", color: "rgba(20,18,16,.45)" }}>{r}</span>
                  <CAvatar ini={ini} />
                  <span style={{ flex: 1, font: "500 15px var(--font-display)", color: "var(--ink)" }}>{n}</span>
                  <span style={{ font: "600 16px var(--font-display)", fontVariantNumeric: "tabular-nums", color: "var(--ink)" }}>{idx}</span>
                  <span style={{ width: 52, textAlign: "right", font: "12px var(--font-mono)", color: tone === "pos" ? "var(--signal-deep)" : "rgba(20,18,16,.4)" }}>{d}</span>
                </div>
              ))}
              <div style={{ textAlign: "center", padding: "8px 0", font: "12px var(--font-mono)", color: "rgba(20,18,16,.3)", letterSpacing: "0.3em" }}>···</div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderRadius: 12, background: "rgba(255,170,9,.06)", marginTop: 6 }}>
                <span style={{ width: 24, font: "12px var(--font-mono)", color: "rgba(20,18,16,.45)" }}>12</span>
                <CAvatar ini="DH" />
                <span style={{ flex: 1, font: "500 15px var(--font-display)", color: "var(--ink)" }}>Du</span>
                <span style={{ font: "600 16px var(--font-display)", fontVariantNumeric: "tabular-nums", color: "var(--ink)" }}>860</span>
                <span style={{ width: 52, textAlign: "right", font: "12px var(--font-mono)", color: "var(--signal-deep)" }}>+4</span>
              </div>
            </div>
            ) : (
            <div style={{ marginTop: 18, borderRadius: 14, border: "1.5px dashed var(--hairline-dark)", padding: "36px 28px", textAlign: "center" }}>
              <p style={{ margin: 0, font: "500 16px var(--font-display)", color: "var(--ink)" }}>Miss dich mit dem CIRCLE, wenn du willst.</p>
              <p className="u-label" style={{ margin: "12px 0 0", fontSize: 8, color: "var(--text-muted)" }}>Saison-Index aus Verhaltens-Kennzahlen · keine Umsätze · Austritt jederzeit</p>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 20 }}>
                <button onClick={() => setMember(true)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "10px 20px", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "500 13px var(--font-display)", color: "var(--ink)" }}>Teilnehmen</button>
                <button onClick={() => setSheet(true)} style={{ border: "none", background: "none", cursor: "pointer", padding: 0, font: "500 13px var(--font-display)", color: "var(--signal-deep)" }}>Was fließt ein?</button>
              </div>
            </div>
            )}
          </CCard>
        </CRv>

        {/* Meilensteine */}
        <CRv delay={60}>
          <CCard>
            <CHead title="Deine Meilensteine" right={<span style={{ width: 36, height: 36, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}><CIc name="arrow" size={14} style={{ transform: "rotate(-45deg)" }} stroke="var(--ink)" /></span>} />
            {MEILEN.map(([t, m], i) => (
              <div key={t} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: i < MEILEN.length - 1 ? "1px solid var(--hairline)" : "none" }}>
                <span style={{ font: "500 15px var(--font-display)", color: "var(--ink)" }}>{t}</span>
                <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{m}</span>
              </div>
            ))}
            <button style={{ marginTop: 16, border: "none", background: "none", cursor: "pointer", padding: 0, font: "500 15px var(--font-display)", color: "var(--signal-deep)" }}>Profil ansehen →</button>
          </CCard>
        </CRv>
      </div>
      {sheet && <IndexSheet onClose={() => setSheet(false)} member={member} onLeave={() => { setMember(false); setSheet(false); }} />}
    </div>
  );
}

/* Info-Sheet: Index-Definition (§3.6) */
function IndexSheet({ onClose, member, onLeave }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(11,10,9,0.35)", display: "flex", alignItems: "center", justifyContent: "center", padding: 28 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(520px, 100%)", background: "#FFFFFF", borderRadius: 16, padding: 30, boxShadow: "0 30px 70px rgba(11,10,9,0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <div style={{ font: "500 19px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>Was fließt in den Saison-Index ein?</div>
          <button onClick={onClose} aria-label="Schließen" style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4 }}><CIc name="x" size={16} /></button>
        </div>
        <p style={{ margin: "12px 0 0", font: "400 14px/1.6 var(--font-display)", color: "var(--text-muted)" }}>Der Index misst Verhalten, das du direkt steuerst — nie Umsätze, nie Marktglück. Jede Kennzahl ist mit einer Qualitäts-Gegenmetrik gekoppelt.</p>
        <div style={{ marginTop: 20 }}>
          {[["Antwortzeit", "Erstkontakt unter 2 h", "Gegenmetrik: Qualifizierungsquote"], ["Besichtigungs-Disziplin", "Quote gebuchter Besichtigungen", "Gegenmetrik: No-Show- & Abschlussquote"], ["Follow-up-Disziplin", "Erledigte Suggested Actions", "Gegenmetrik: Ansichtsquote"]].map(([t, s, g]) => (
            <div key={t} style={{ padding: "14px 0", borderTop: "1px solid var(--hairline)" }}>
              <div style={{ font: "500 14px var(--font-display)", color: "var(--ink)" }}>{t}</div>
              <div style={{ font: "400 13px var(--font-display)", color: "var(--text-muted)", marginTop: 4 }}>{s}</div>
              <div className="u-label" style={{ fontSize: 8, color: "var(--signal-deep)", marginTop: 6 }}>{g}</div>
            </div>
          ))}
        </div>
        <p className="u-label" style={{ margin: "16px 0 0", fontSize: 8, color: "var(--text-muted)" }}>Wer eine Gegenmetrik reißt, sammelt in der Hauptmetrik nichts. Gewichtung: Arbeitsstand.</p>
        {member && <button onClick={onLeave} style={{ marginTop: 18, border: "none", background: "none", cursor: "pointer", padding: 0, font: "500 13px var(--font-display)", color: "var(--text-muted)", textDecoration: "underline" }}>Teilnahme beenden — eigene Einträge verschwinden sofort</button>}
      </div>
    </div>
  );
}

/* Saisonrückblick — ruhige Zusammenfassung (§3.3), teilbar als Bild */
function SaisonRueckblick({ onNav }) {
  return (
    <div style={{ maxWidth: 880, margin: "0 auto" }}>
      <CRvL style={{ marginTop: 40 }}>
        <button onClick={() => onNav && onNav("circle")} style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "none", border: "none", cursor: "pointer", font: "500 14px var(--font-display)", color: "var(--text-muted)", padding: 0 }}><CIc name="back" size={16} /> CIRCLE</button>
      </CRvL>
      <CRvL style={{ marginTop: 48 }}>
        <div className="u-label" style={{ fontSize: 9, color: "var(--signal-deep)" }}>Saison Q3 2026 · Woche 7 von 13 · Zwischenstand</div>
        <h1 style={{ margin: "18px 0 0", font: "600 clamp(34px, 4vw, 56px)/1.08 var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>Deine Saison,<br />Stand heute.</h1>
        <p style={{ margin: "18px 0 0", font: "400 16px/1.6 var(--font-display)", color: "rgba(20,18,16,.55)", maxWidth: 480 }}>Der Rückblick erscheint am 30.09. — das hier ist dein Zwischenstand, ruhig zusammengefasst.</p>
      </CRvL>
      <CRv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", marginTop: 64 }}>
          {[["24", "%", "Besichtigungsquote · Ziel 30 %"], ["84", "%", "Erstkontakt-Quote · Top 18 %"], ["3", null, "Deals diese Saison"]].map(([v, suf, l], i) => (
            <div key={l} style={{ padding: i === 0 ? "4px 28px 4px 0" : "4px 28px", boxShadow: i === 0 ? "none" : "inset 1px 0 0 var(--hairline-dark)" }}>
              <div style={{ font: "600 clamp(38px,4vw,54px)/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{v}{suf && <span style={{ fontSize: 22, color: "var(--signal)", marginLeft: 4 }}>{suf}</span>}</div>
              <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 12 }}>{l}</div>
            </div>
          ))}
        </div>
      </CRv>
      <CRv>
        <CCard style={{ marginTop: 56 }}>
          <CHead label="Saison Q3" title="Meilensteine dieser Saison" />
          {MEILEN.map(([t, m], i) => (
            <div key={t} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: i < MEILEN.length - 1 ? "1px solid var(--hairline)" : "none" }}>
              <span style={{ font: "500 15px var(--font-display)", color: "var(--ink)" }}>{t}</span>
              <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{m}</span>
            </div>
          ))}
        </CCard>
      </CRv>
      <CRv>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, margin: "48px 0 80px" }}>
          <button style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "12px 24px", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "500 14px var(--font-display)", color: "var(--ink)" }}>Als Bild teilen</button>
        </div>
      </CRv>
    </div>
  );
}

/* Saisonziel — mit funktionierendem „Ziel anpassen“ (Slider, Speichern/Abbrechen) */
function SaisonzielCard({ refEl, run }) {
  const [edit, setEdit] = React.useState(false);
  const [ziel, setZiel] = React.useState(30);
  const [draft, setDraft] = React.useState(30);
  const pct = Math.min(100, Math.round(24 / ziel * 100));
  return (
    <CCard>
      <CHead title="Mein Saisonziel" right={<CChip>Q3 2026</CChip>} />
      <div style={{ font: "600 56px/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>24<span style={{ fontSize: 24, color: "var(--signal-deep)", marginLeft: 3 }}>%</span></div>
      <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 12 }}>Besichtigungsquote · Ziel {ziel} %</div>
      <div ref={refEl} style={{ position: "relative", width: 220, height: 3, borderRadius: 2, background: "var(--paper-2)", marginTop: 14 }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: 3, borderRadius: 2, background: "var(--signal)", width: run ? pct + "%" : "0%", transition: "width 1000ms var(--ease-unio)" }}></div>
        <span style={{ position: "absolute", left: "100%", top: -4, width: 1, height: 11, background: "rgba(20,18,16,.35)" }}></span>
      </div>
      <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 10 }}>No-Show-Quote stabil · 4 %</div>
      {edit ? (
        <div style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <input type="range" min={20} max={50} step={1} value={draft} onChange={(e) => setDraft(+e.target.value)} style={{ flex: 1, accentColor: "var(--signal)" }} />
            <span style={{ font: "500 15px var(--font-mono)", color: "var(--ink)", minWidth: 46, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{draft} %</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14 }}>
            <button onClick={() => { setZiel(draft); setEdit(false); }} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "9px 18px", background: "var(--ink)", color: "var(--paper)", font: "500 13px var(--font-display)" }}>Speichern</button>
            <button onClick={() => { setDraft(ziel); setEdit(false); }} style={{ border: "none", background: "none", cursor: "pointer", padding: 0, font: "500 13px var(--font-display)", color: "var(--text-muted)" }}>Abbrechen</button>
          </div>
        </div>
      ) : (
        <button onClick={() => { setDraft(ziel); setEdit(true); }} style={{ display: "inline-flex", marginTop: 22, border: "none", cursor: "pointer", borderRadius: 999, padding: "10px 18px", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "500 13px var(--font-display)", color: "var(--ink)" }}>Ziel anpassen</button>
      )}
    </CCard>
  );
}

/* Referral — auch als Home-Widget nutzbar */
function ReferralCard() {
  return (
    <CCard>
      <CHead title="Referral" right={<span style={{ width: 36, height: 36, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}><CIc name="arrow" size={14} style={{ transform: "rotate(-45deg)" }} stroke="var(--ink)" /></span>} />
      <div style={{ font: "600 44px/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}><span style={{ fontSize: 22, color: "var(--signal-deep)", marginRight: 4, fontWeight: 500 }}>€</span>2.150</div>
      <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 12 }}>Dein Referral-Anteil · laufendes Jahr</div>
      <div style={{ marginTop: 18 }}>
        {[["Geworbene Makler", "2"], ["Davon aktiv", "2"]].map(([k, v], i) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: i ? "1px solid var(--hairline)" : "none" }}>
            <span style={{ font: "500 14px var(--font-display)", color: "var(--ink)" }}>{k}</span><span style={{ font: "12px var(--font-mono)", color: "var(--text-muted)" }}>{v}</span>
          </div>
        ))}
      </div>
      <CopyPill />
    </CCard>
  );
}

function CopyPill() {
  const [ok, setOk] = React.useState(false);
  return (
    <button onClick={() => { setOk(true); setTimeout(() => setOk(false), 1800); }} style={{ display: "inline-flex", marginTop: 22, border: "none", cursor: "pointer", borderRadius: 999, padding: "10px 18px", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: ok ? "600 10px var(--font-mono)" : "500 13px var(--font-display)", letterSpacing: ok ? "0.14em" : "normal", color: ok ? "var(--signal-deep)" : "var(--ink)" }}>{ok ? "LINK KOPIERT" : "Einladungslink teilen"}</button>
  );
}

/* Home-Widget (S) — die letzten 2 Puls-Einträge + eigener Saisonstand */
function CircleHomeWidget({ onNav }) {
  const { Card: C, CardHead: CH } = window;
  return (
    <div onClick={() => onNav && onNav("circle")} style={{ cursor: "pointer", height: "100%" }}>
      <C style={{ height: "100%" }}>
        <CH label="Circle" title="Community" right={<span style={{ width: 34, height: 34, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}><CIc name="arrow" size={13} style={{ transform: "rotate(-45deg)" }} stroke="var(--ink)" /></span>} />
        <div>
          {PULS.slice(0, 2).map((e, i) => <PulsItem key={i} e={e} compact />)}
        </div>
        <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 14 }}>Saison Q3 · Top 18 % · Woche 7/13</div>
      </C>
    </div>
  );
}

Object.assign(window, { DashCircle, CircleHomeWidget, SaisonRueckblick, ReferralCard });
