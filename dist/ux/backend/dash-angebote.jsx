/* UNIO — Angebote (Kaufanbote): Band + Nächste-Frist-Anker, Tabelle, Detail-Sheet mit Timeline & DCS. */
const AGIc = (p) => <window.Icon {...p} />;
const AG_RM = window.DASH_P_RM;

const ANBOTE = [
  { obj: "Zinshaus-Etage Josefstadt", img: "/assets/img/vienna-facade.jpg", nr: "101", buyer: "Andrea Fischer", src: "LEAD · WILLHABEN", val: "€ 1,08 Mio", diff: "-6,1 % ZUM PREIS", diffPos: false, st: "pruefung", stL: "In Prüfung", frist: "ÜBERFÄLLIG 6 H", overdue: true, sig: "SIGNIERT 0/2" },
  { obj: "Penthouse Beheim", img: "/assets/img/beheim.jpg", nr: "063", buyer: "Sophie Berger", src: "LEAD · META", val: "€ 1,64 Mio", diff: "-3,5 % ZUM PREIS", diffPos: false, st: "eingegangen", stL: "Eingegangen", frist: "NOCH 14 H", sig: "SIGNIERT 0/2", pulse: true },
  { obj: "Villa Ecoluxe", img: "/assets/img/ecoluxe.jpg", nr: "029", buyer: "Elena Novak", src: "LEAD · META", val: "€ 2,32 Mio", diff: "-3,3 % ZUM PREIS", diffPos: false, st: "pruefung", stL: "In Prüfung", frist: "20.07. · NOCH 2 T", sig: "SIGNIERT 0/2" },
  { obj: "Das Albrecht — Haus 4", img: "/assets/img/albrecht.jpg", nr: "042", buyer: "Markus Wolf", src: "CIRCLE-EMPFEHLUNG", val: "€ 1,31 Mio", diff: "+1,6 % ZUM PREIS", diffPos: true, st: "gegen", stL: "Gegenangebot", frist: "22.07. · NOCH 4 T", sig: "SIGNIERT 1/2" },
  { obj: "Stadtwohnung Wieden", img: "/assets/img/int-kitchen.jpg", nr: "094", buyer: "Thomas Gruber", src: "LEAD · WILLHABEN", val: "€ 850.000", diff: "-4,5 % ZUM PREIS", diffPos: false, st: "angenommen", stL: "Angenommen", frist: "—", sig: "SIGNIERT 2/2", done: true },
  { obj: "Origins — Penthouse S", img: "/assets/img/penthouse.jpg", nr: "071", buyer: "Jonas Reiter", src: "LEAD · META", val: "€ 3,60 Mio", diff: "-8,9 % ZUM PREIS", diffPos: false, st: "abgelehnt", stL: "Abgelehnt", frist: "—", sig: "—" },
];
const AG_TIMELINE = [
  ["check", "Anbot eingegangen", "15.07. · 18:42 · € 1,64 Mio über UNIO", true],
  ["check", "Bonität geprüft", "16.07. · 09:10 · ERGEBNIS: POSITIV", true],
  ["mail", "Nachricht an Käuferin", "16.07. · 10:05 · Rückfrage zu Fixzins-Zusage", true],
  ["", "Entscheidung", "Frist: 17.07. · 09:00", false],
  ["", "Signatur Käuferin", "DCS-Strecke", false],
  ["", "Signatur Verkäufer", "DCS-Strecke", false],
];

function AgPill({ st, children, pulse }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 7, fontSize: 9, padding: "5px 11px", borderRadius: 999, whiteSpace: "nowrap" };
  if (st === "eingegangen") return <span className="u-label" style={{ ...base, background: "var(--signal-soft)", color: "var(--signal-deep)" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)", animation: pulse && !AG_RM ? "uPulse 2s var(--ease-unio) infinite" : "none" }}></span>{children}</span>;
  if (st === "gegen") return <span className="u-label" style={{ ...base, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--signal-deep)" }}>{children}</span>;
  if (st === "angenommen") return <span className="u-label" style={{ ...base, background: "var(--ink)", color: "var(--paper)" }}>{children}</span>;
  if (st === "abgelehnt") return <span className="u-label" style={{ ...base, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "rgba(20,18,16,0.4)" }}>{children}</span>;
  return <span className="u-label" style={{ ...base, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}>{children}</span>;
}

function AngeboteSeite({ onNav }) {
  const { Reveal: Rv, RevealL: RvL } = window;
  const [filter, setFilter] = React.useState("Alle");
  const [sel, setSel] = React.useState(null);
  const map = { Offen: ["eingegangen"], "In Prüfung": ["pruefung"], Gegenangebot: ["gegen"], Entschieden: ["angenommen", "abgelehnt"] };
  const rows = filter === "Alle" ? ANBOTE : ANBOTE.filter((a) => map[filter].includes(a.st));
  return (
    <div style={{ maxWidth: 1360, margin: "0 auto" }}>
      <RvL style={{ marginTop: 40 }}>
        <h1 style={{ margin: 0, font: "500 clamp(34px, 3.4vw, 52px)/1.02 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Angebote<span style={{ color: "var(--signal)" }}>.</span></h1>
        <p style={{ margin: "16px 0 0", font: "400 16px/1.5 var(--font-display)", color: "var(--text-muted)", maxWidth: 460 }}>Alle Kaufanbote, Fristen und Signaturen an einem Ort.</p>
      </RvL>
      {/* Band + Ink-Anker */}
      <Rv>
        <div style={{ display: "flex", alignItems: "stretch", gap: 40, marginTop: 48, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "baseline", columnGap: "clamp(20px, 2.4vw, 44px)", flex: 1, minWidth: 520 }}>
            {[["6", null, "Offene Anbote", null], ["€ 8,3", "Mio", "Volumen offen", null], ["9", "h", "Ø Reaktionszeit", null], ["38", "%", "Abschlussquote · 30 Tage", "+6 %"]].map(([v, suf, l, d], i) => (
              <React.Fragment key={l}>
                {i > 0 && <span style={{ width: 1, height: 44, background: "rgba(20,18,16,.14)", alignSelf: "center" }}></span>}
                <div>
                  <div style={{ font: "600 46px/1 var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{v}{suf && <span style={{ fontSize: 20, color: "rgba(20,18,16,.4)", marginLeft: 6, fontWeight: 500 }}>{suf}</span>}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 12, whiteSpace: "nowrap" }}>
                    <span className="u-label" style={{ fontSize: 9.5, color: "rgba(20,18,16,.45)", whiteSpace: "nowrap" }}>{l}</span>
                    {d && <span style={{ font: "10px var(--font-mono)", color: "var(--signal)" }}>{d}</span>}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div onClick={() => setSel(ANBOTE[1])} style={{ background: "var(--ink)", borderRadius: 14, padding: "22px 26px", color: "var(--paper)", cursor: "pointer", minWidth: 250 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
              <span className="u-label" style={{ fontSize: 8.5, color: "rgba(251,250,246,.55)" }}>Nächste Frist</span>
              <span style={{ width: 30, height: 30, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 0 1px rgba(247,245,241,0.2)" }}><AGIc name="arrow" size={13} stroke="var(--paper)" style={{ transform: "rotate(-45deg)" }} /></span>
            </div>
            <div style={{ font: "600 44px/1 var(--font-display)", letterSpacing: "-0.02em", marginTop: 16, fontVariantNumeric: "tabular-nums" }}>14<span style={{ fontSize: 20, color: "rgba(251,250,246,.5)", marginLeft: 5, fontWeight: 500 }}>h</span></div>
            <div style={{ font: "600 9px var(--font-mono)", letterSpacing: "0.1em", color: "rgba(251,250,246,.55)", marginTop: 12 }}>PENTHOUSE BEHEIM · S. BERGER</div>
          </div>
        </div>
      </Rv>
      {/* EINE Filterleiste, sticky */}
      <div style={{ position: "sticky", top: 0, zIndex: 30, background: "#F4F2EE", padding: "14px 0", marginTop: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {["Alle", "Offen", "In Prüfung", "Gegenangebot", "Entschieden"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "9px 16px", background: filter === f ? "var(--ink)" : "transparent", boxShadow: filter === f ? "none" : "inset 0 0 0 1px var(--hairline-dark)", font: "500 12.5px var(--font-display)", color: filter === f ? "var(--paper)" : "var(--ink)", transition: "background .25s var(--ease-unio)" }}>{f}</button>
          ))}
          <button style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "9px 16px", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "500 12.5px var(--font-display)", color: "var(--ink)", marginLeft: 8 }}>Objekt: Alle</button>
          <span className="u-label" style={{ marginLeft: "auto", fontSize: 8.5, color: "var(--text-muted)" }}>Aktualisiert 16.07. · 08:12</span>
        </div>
      </div>
      {/* Tabelle */}
      <Rv>
        <div style={{ background: "var(--card-bg, #FFFFFF)", borderRadius: 14, boxShadow: "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", overflow: "hidden", marginTop: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.1fr 1.1fr 1fr 0.9fr", padding: "13px 22px", borderBottom: "1px solid var(--hairline-dark)" }}>
            {["Objekt", "Käufer:in", "Anbot", "Status", "Frist", "Signatur"].map((hd) => <span key={hd} className="u-label" style={{ fontSize: 8, color: "var(--text-muted)" }}>{hd}</span>)}
          </div>
          {rows.map((a, i) => (
            <div key={a.obj + a.buyer} onClick={() => setSel(a)} onMouseEnter={(e) => (e.currentTarget.style.background = "#F7F3EC")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.1fr 1.1fr 1fr 0.9fr", alignItems: "center", height: 72, padding: "0 22px", borderBottom: i < rows.length - 1 ? "1px solid var(--hairline)" : "none", cursor: "pointer", transition: "background .2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 13, minWidth: 0 }}>
                <img src={a.img} alt="" style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover", flex: "none" }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ font: "500 14px var(--font-display)", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.obj}</div>
                  <div style={{ font: "10px var(--font-mono)", color: "var(--text-muted)", marginTop: 3 }}>#{a.nr}</div>
                </div>
              </div>
              <div>
                <div style={{ font: "500 13.5px var(--font-display)", color: "var(--ink)" }}>{a.buyer}</div>
                <div style={{ font: "9px var(--font-mono)", letterSpacing: "0.08em", color: "var(--text-muted)", marginTop: 3 }}>{a.src}</div>
              </div>
              <div>
                <div style={{ font: "500 15px var(--font-display)", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{a.val}</div>
                <div style={{ font: "9px var(--font-mono)", letterSpacing: "0.06em", color: a.diffPos ? "var(--signal-deep)" : "rgba(20,18,16,0.4)", marginTop: 3 }}>{a.diff}</div>
              </div>
              <div><AgPill st={a.st} pulse={a.pulse}>{a.stL}</AgPill></div>
              <div style={{ font: "10.5px var(--font-mono)", letterSpacing: "0.05em", color: a.overdue ? "#C2402A" : "var(--text-muted)" }}>{a.frist}</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "10px var(--font-mono)", letterSpacing: "0.05em", color: "var(--text-muted)" }}>{a.sig}{a.done && <AGIc name="check" size={12} stroke="var(--signal-deep)" />}</div>
            </div>
          ))}
        </div>
      </Rv>
      {sel && <AnbotSheet a={sel} onClose={() => setSel(null)} />}
    </div>
  );
}

function AnbotSheet({ a, onClose }) {
  const [counter, setCounter] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 150, background: "rgba(11,10,9,0.25)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 480, maxWidth: "94vw", background: "#FBFAF6", borderLeft: "1px solid var(--hairline-dark)", boxShadow: "-24px 0 60px -30px rgba(11,10,9,0.4)", animation: "dashPanelIn 400ms var(--ease-unio)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--hairline-dark)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <img src={a.img} alt="" style={{ width: 48, height: 48, borderRadius: 11, objectFit: "cover" }} />
              <div>
                <div style={{ font: "500 15px var(--font-display)", color: "var(--ink)" }}>{a.obj}</div>
                <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 4 }}>{a.buyer}</div>
              </div>
            </div>
            <button aria-label="Schließen" onClick={onClose} style={{ width: 30, height: 30, borderRadius: "50%", border: "none", cursor: "pointer", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", flex: "none" }}><AGIc name="x" size={14} /></button>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 20, flexWrap: "wrap" }}>
            <span style={{ font: "600 32px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{a.val}</span>
            <span style={{ font: "10px var(--font-mono)", letterSpacing: "0.06em", color: a.diffPos ? "var(--signal-deep)" : "rgba(20,18,16,0.4)" }}>{a.diff}</span>
            <AgPill st={a.st} pulse={a.pulse}>{a.stL}</AgPill>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "22px 28px" }}>
          <div className="u-label" style={{ fontSize: 8.5, color: "var(--signal-deep)" }}>Verlauf</div>
          <div style={{ marginTop: 16 }}>
            {AG_TIMELINE.map(([ic, t, meta, past], i) => (
              <div key={t} style={{ display: "flex", gap: 13, paddingBottom: i < AG_TIMELINE.length - 1 ? 20 : 0, position: "relative" }}>
                {i < AG_TIMELINE.length - 1 && <span style={{ position: "absolute", left: 12, top: 26, bottom: 0, width: 1, background: "var(--hairline-dark)" }}></span>}
                <span style={{ width: 25, height: 25, borderRadius: "50%", background: past ? "var(--signal-soft)" : "transparent", boxShadow: past ? "none" : "inset 0 0 0 1.5px var(--hairline-dark)", color: "var(--signal-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none", zIndex: 1 }}>{past && ic && <AGIc name={ic} size={11} />}</span>
                <div>
                  <div style={{ font: "500 13px var(--font-display)", color: past ? "var(--ink)" : "rgba(20,18,16,0.35)" }}>{t}</div>
                  <div style={{ font: "9.5px var(--font-mono)", letterSpacing: "0.05em", color: past ? "var(--text-muted)" : "rgba(20,18,16,0.3)", marginTop: 4 }}>{meta}</div>
                </div>
              </div>
            ))}
            {sent && (
              <div style={{ display: "flex", gap: 13, marginTop: 20 }}>
                <span style={{ width: 25, height: 25, borderRadius: "50%", background: "var(--signal)", color: "var(--on-signal)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}><AGIc name="check" size={11} stroke="var(--on-signal)" /></span>
                <div>
                  <div style={{ font: "500 13px var(--font-display)", color: "var(--ink)" }}>Gegenangebot gesendet</div>
                  <div style={{ font: "9.5px var(--font-mono)", color: "var(--text-muted)", marginTop: 4 }}>SOEBEN · € 1,68 MIO</div>
                </div>
              </div>
            )}
          </div>
          <div className="u-label" style={{ fontSize: 8.5, color: "var(--signal-deep)", marginTop: 30 }}>Dokumente</div>
          <div style={{ marginTop: 12, borderRadius: 12, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", background: "#FFFFFF" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: "1px solid var(--hairline)" }}>
              <AGIc name="angebote" size={16} stroke="var(--ink-2)" />
              <span style={{ flex: 1, font: "500 13px var(--font-display)", color: "var(--ink)" }}>Kaufanbot.pdf</span>
              <span style={{ font: "9px var(--font-mono)", letterSpacing: "0.08em", color: "var(--text-muted)" }}>DCS · VERSION 2</span>
            </div>
            {[["Sophie Berger", "AUSSTEHEND", false], ["UNIO-VERSE GmbH", "AUSSTEHEND", false]].map(([n, st]) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: "1px solid var(--hairline)" }}>
                <AGIc name="benutzer" size={14} stroke="var(--text-muted)" />
                <span style={{ flex: 1, font: "400 13px var(--font-display)", color: "var(--ink)" }}>{n}</span>
                <span style={{ font: "9px var(--font-mono)", letterSpacing: "0.08em", color: "var(--text-muted)" }}>{st}</span>
                <button style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "6px 12px", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "500 11px var(--font-display)", color: "var(--ink)" }}>Erinnern</button>
              </div>
            ))}
          </div>
          {counter && (
            <div style={{ marginTop: 22, borderRadius: 12, background: "#FFFFFF", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", padding: 20 }}>
              <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>Gegenangebot</div>
              <input defaultValue="€ 1.680.000" style={{ display: "block", width: "100%", boxSizing: "border-box", marginTop: 10, border: "none", outline: "none", borderRadius: 9, padding: "12px 14px", background: "var(--paper)", boxShadow: "inset 0 0 0 2px var(--signal)", font: "500 16px var(--font-mono)", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }} />
              <textarea placeholder="Optionale Nachricht (2 Zeilen)" rows={2} style={{ display: "block", width: "100%", boxSizing: "border-box", marginTop: 10, border: "none", outline: "none", borderRadius: 9, padding: "12px 14px", background: "var(--paper)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "400 13px/1.5 var(--font-display)", color: "var(--ink)", resize: "vertical" }}></textarea>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                <button onClick={() => { setSent(true); setCounter(false); }} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "10px 22px", background: "var(--ink)", color: "var(--paper)", font: "500 13px var(--font-display)" }}>Senden</button>
              </div>
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 28px", borderTop: "1px solid var(--hairline-dark)", background: "#FBFAF6" }}>
          <button style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "12px 24px", background: "var(--ink)", color: "var(--paper)", font: "500 13.5px var(--font-display)" }}>Annehmen</button>
          <button onClick={() => setCounter((v) => !v)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "12px 22px", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "500 13.5px var(--font-display)", color: "var(--ink)" }}>Gegenangebot</button>
          <button style={{ border: "none", background: "none", cursor: "pointer", font: "500 13px var(--font-display)", color: "rgba(20,18,16,0.55)", marginLeft: "auto" }}>Ablehnen</button>
        </div>
        <div style={{ font: "8.5px var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)", padding: "0 28px 16px", background: "#FBFAF6" }}>ANNEHMEN STARTET DIE SIGNATURSTRECKE</div>
      </div>
    </div>
  );
}

Object.assign(window, { AngeboteSeite });
