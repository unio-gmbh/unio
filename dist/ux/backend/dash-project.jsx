/* UNIO Dashboard — Projektansicht (Projektdetails, Backend). Screenshots 09.16/09.17. */
const { Icon: PjIcon, Reveal: PjRev, Tabs: PjTabs, StatusPill: PjStatus, Table: PjTable, Row: PjRow, Cell2: PjCell2 } = window;
const { Button: PjBtn } = window.UNIODesignSystem_b6216a;

const PJ_GAL = [
  "/assets/img/albrecht.jpg",
  { typ: "video", src: "/assets/video/explore-design.mp4", poster: "/assets/img/albrechts-fassade.jpg", dauer: "0:48" },
  { typ: "tour", embed: "about:blank", poster: "/assets/img/albrechts-wohnen.jpg" },
  "/assets/img/albrecht-dusk.jpg", "/assets/img/beheim.jpg", "/assets/img/int-bath.jpg", "/assets/img/int-kitchen.jpg",
];
const PJ_FACTS = [["objekte", "Bauträger", "neopartement VI"], ["objekte", "Architekt", "Dipl.-Ing. Paul Prinz"], ["actions", "Preis von", "€ 279.000"], ["actions", "Preis bis", "€ 1.599.000"], ["objekte", "Fläche gesamt", "857,28 m²"]];
const PJ_UNITS = [
  ["Ruhiges Leben im Grünen", "Top 1", "€ 279.000", "50,24 m²", 2, "Marcus Anthofer-Weiss", "Aktiv"],
  ["Ruhiges Leben im Grünen", "Top 2", "€ 399.000", "74,41 m²", 4, "Marcus Anthofer-Weiss", "Aktiv"],
  ["Ruhiges Leben im Grünen", "Top 3", "€ 539.000", "100,5 m²", 4, "Laurenz Wurzer", "Reserviert"],
  ["Ruhiges Leben im Grünen", "Top 4", "€ 399.000", "74,78 m²", 3, "Marcus Anthofer-Weiss", "Aktiv"],
  ["Königlich wohnen", "Haus 2", "€ 719.000", "125 m²", 6, "Marcus Anthofer-Weiss", "Aktiv"],
  ["Penthouse Rohdachboden", "5 · Deluxe", "€ 1.599.000", "179,99 m²", 5, "Marcus Anthofer-Weiss", "Aktiv"],
];
const PJ_POI = [["Walk Score", "99", "Sehr gut zu Fuß"], ["Transit", "25", "Wenige Treffer"], ["Alltag", "89", "Sehr gute Nahversorgung"], ["Schulen", "10/10", "Überdurchschnittlich"]];
const PJ_EXPORT = [["IS", "ImmobilienScout24.at", "8. Juni 2026, 18:10", 17, "var(--signal-deep)"], ["W", "willhaben.at", "9. Juni 2026, 13:43", 24, "var(--signal)"]];

function ProjektView({ onNav }) {
  const [tab, setTab] = React.useState("daten");
  const [g, setG] = React.useState(0);
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <PjRev style={{ marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => onNav && onNav("objekte")} style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "none", border: "none", cursor: "pointer", font: "500 15px var(--font-display)", color: "var(--text-muted)", padding: 0 }}><PjIcon name="back" size={16} /> Projektdetails</button>
          <PjBtn variant="signal" size="sm" knob="✎">Bearbeiten</PjBtn>
        </div>
      </PjRev>

      {/* Galerie: eine Komponente für alle Flächen (Hero mit Swipe, Thumbnails, Lightbox) */}
      <PjRev style={{ marginTop: 20 }}>
        <window.MkGalerie bilder={PJ_GAL} cover />
      </PjRev>

      {/* Kopf */}
      <PjRev delay={60}>
        <div className="mk-projkarte" style={{ background: "#FFFFFF", borderRadius: 14, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", marginTop: 20 }}>
          {/* Kopf bricht intrinsisch um (Flex-Wrap statt Media-Query): die Kennzahlen
              rutschen unter den Text, sobald sie nicht mehr daneben passen. */}
          <div className="mk-projkopf" style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "flex-start" }}>
            <div style={{ flex: "1 1 340px", minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <PjStatus kind="aktiv">Status: Aktiv</PjStatus><PjStatus kind="reserviert">In Planung</PjStatus><PjStatus kind="neutral">Wohnbau</PjStatus>
              </div>
              <h1 style={{ margin: "20px 0 0", font: "500 clamp(30px, 3vw, 46px)/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Albrechts Townhouses</h1>
              <p style={{ margin: "14px 0 0", font: "400 15px var(--font-display)", color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: 7 }}><PjIcon name="pin" size={14} stroke="var(--text-muted)" />Stockerauer Straße 53, 2100 Korneuburg</p>
              <p style={{ margin: "18px 0 0", font: "400 15px/1.6 var(--font-display)", color: "var(--text-body)", maxWidth: 560 }}>Neubauprojekt in Korneuburg mit Dachgeschosswohnungen und Reihenhäusern: hochwertige Ausstattung, Gärten, Terrassen und optionale Stellplätze.</p>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginTop: 20, padding: "12px 18px", borderRadius: 12, background: "var(--signal-soft)", width: "max-content", maxWidth: "100%" }}>
                <span className="u-label" style={{ fontSize: 8.5, color: "var(--signal-deep)" }}>Projektlead</span>
                <span style={{ font: "500 14px var(--font-display)", color: "var(--ink)" }}>Johannes Lindner</span>
                <span style={{ font: "12px var(--font-mono)", color: "var(--text-muted)" }}>johannes@unio.at · +43 676 5027473</span>
              </div>
            </div>
            <div className="mk-projzahlen" style={{ display: "flex", gap: 12, flexWrap: "wrap", flex: "1 1 302px", minWidth: 0 }}>
              <div style={{ borderRadius: 12, padding: "20px clamp(14px, 3.5vw, 24px)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", minWidth: 0, flex: "1 1 104px" }}>
                <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5 }}>Einheiten</div>
                <div style={{ font: "500 36px/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", marginTop: 12 }}>10</div>
              </div>
              <div style={{ borderRadius: 12, padding: "20px clamp(14px, 3.5vw, 24px)", background: "var(--signal-soft)", minWidth: 0, flex: "1 1 160px" }}>
                <div className="u-label" style={{ color: "var(--signal-deep)", fontSize: 8.5 }}>Preisspanne</div>
                <div style={{ font: "500 clamp(17px, 4.6vw, 20px)/1.2 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 12 }}>€ 279k bis 1,6 Mio.</div>
              </div>
            </div>
          </div>
        </div>
      </PjRev>

      <div style={{ margin: "28px 0 24px" }}><PjTabs items={[["daten", "Daten"], ["interessenten", "Interessenten", 127], ["export", "Plattform Export"]]} active={tab} onPick={setTab} /></div>

      {tab === "daten" && (
        <React.Fragment>
          <div className="mk-kennz" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 16 }}>
            {PJ_FACTS.map(([ic, k, v], i) => (
              <PjRev key={k} delay={i * 50}><div style={{ background: "#FFFFFF", borderRadius: 12, padding: 20, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", height: "100%" }}>
                <PjIcon name={ic} size={16} stroke="var(--signal-deep)" />
                <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5, marginTop: 16 }}>{k}</div>
                <div style={{ font: "500 17px/1.25 var(--font-display)", color: "var(--ink)", marginTop: 8, fontVariantNumeric: "tabular-nums", overflowWrap: "anywhere" }}>{v}</div>
              </div></PjRev>
            ))}
          </div>
          {/* Einheiten-Profil */}
          <PjRev style={{ marginTop: 20 }}>
            <div style={{ background: "#FFFFFF", borderRadius: 14, padding: 30, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div><div className="u-label" style={{ color: "var(--signal-deep)", fontSize: 9 }}>Einheiten-Profil</div><div style={{ font: "500 19px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 10 }}>Wo die Einheiten im Projekt liegen</div></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "0 48px" }}>
                <window.Ruler label="Preisspanne" value="€ 539k" poleL="€ 279k" poleR="€ 1,6 Mio" pos={34} note="Median bei € 539.000, 4 Einheiten unter € 400.000." />
                <window.Ruler label="Fläche je Zimmer" value="24 m²" poleL="Kompakt" poleR="Großzügig" pos={58} note="Ø 24 m² je Zimmer — leicht über Neubauschnitt." />
              </div>
            </div>
          </PjRev>
          {/* Einheiten-Tabelle */}
          <PjRev style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "4px 4px 16px" }}>
              <h2 style={{ margin: 0, font: "500 20px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Einheiten</h2>
              <PjBtn variant="signal" size="sm" knob="+">Einheit hinzufügen</PjBtn>
            </div>
            {(() => { const cols = [{ label: "Titel / Top", w: "2fr" }, { label: "Preis", w: "1fr", right: true }, { label: "Fläche", w: "1fr", right: true }, { label: "Zimmer", w: "0.6fr", right: true }, { label: "Makler", w: "1.2fr" }, { label: "Status", w: "1fr" }, { label: "", w: "36px", right: true }];
              return (
                <PjTable cols={cols}>
                  {PJ_UNITS.map((u, i) => (
                    <PjRow key={i} cols={cols} delay={i * 40} onClick={() => onNav && onNav("objekt")} cells={[
                      <PjCell2 a={u[1]} b={u[0]} />,
                      <span style={{ font: "14px var(--font-mono)", color: "var(--ink)" }}>{u[2]}</span>,
                      <span style={{ font: "13px var(--font-mono)", color: "var(--text-muted)" }}>{u[3]}</span>,
                      <span style={{ font: "13px var(--font-mono)", color: "var(--text-muted)" }}>{u[4]}</span>,
                      <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>{u[5]}</span>,
                      <PjStatus kind={u[6] === "Reserviert" ? "reserviert" : "aktiv"}>{u[6]}</PjStatus>,
                      <PjIcon name="ext" size={14} stroke="var(--text-muted)" />,
                    ]} />
                  ))}
                </PjTable>
              );
            })()}
          </PjRev>
          {/* Umgebung */}
          <PjRev style={{ marginTop: 20 }}>
            <div style={{ background: "#FFFFFF", borderRadius: 14, padding: 30, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
              <div className="u-label" style={{ color: "var(--signal-deep)", fontSize: 9 }}>Umgebung</div>
              <div style={{ font: "500 19px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", margin: "10px 0 24px" }}>Projektumgebung im Überblick</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {PJ_POI.map(([k, v, s], i) => (
                  <div key={k} style={{ padding: "8px 24px", borderLeft: i ? "1px solid var(--hairline-dark)" : "none" }}>
                    <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5 }}>{k}</div>
                    <div style={{ font: "500 clamp(30px,3vw,44px)/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", marginTop: 12 }}>{v}</div>
                    <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 8, marginTop: 10 }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </PjRev>
        </React.Fragment>
      )}

      {tab === "daten" && (
        <PjRev style={{ marginTop: 20 }}><window.MkLage exakt ort="2100 Korneuburg, Stockerauer Straße" datenId="korneuburg" /></PjRev>
      )}

      {tab === "interessenten" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[["Nikita Neznamov", "DG-Maisonette · 137 m²", "€ 250.000", "aktiv", "Angenommen"], ["Marcin Fituch", "Traum Penthouse Hernals", "€ 666.000", "aktiv", "Angenommen"], ["Laurenz Wurzer", "Top 3 · 100 m²", "€ 100.000", "verloren", "Abgelehnt"]].map((r, i) => (
            <PjRev key={r[0]} delay={i * 60}>
              <div className="mk-intzeile" style={{ background: "#FFFFFF", borderRadius: 12, padding: "clamp(14px, 3vw, 20px)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", display: "flex", flexWrap: "wrap", gap: "12px 20px", alignItems: "center" }}>
                <span style={{ flex: "0 0 auto", width: 42, height: 42, borderRadius: "50%", background: "var(--paper-2)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 14px var(--font-display)", color: "var(--ink)" }}>{r[0].split(" ").map((w) => w[0]).join("")}</span>
                <div style={{ flex: "1 1 160px", minWidth: 0 }}><div style={{ font: "500 15px var(--font-display)", color: "var(--ink)" }}>{r[0]}</div><div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 5 }}>{r[1]}</div></div>
                <span style={{ flex: "0 0 auto", font: "16px var(--font-mono)", color: "var(--ink)" }}>{r[2]}</span>
                <PjStatus kind={r[3]}>{r[4]}</PjStatus>
              </div>
            </PjRev>
          ))}
        </div>
      )}

      {tab === "export" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {PJ_EXPORT.map(([logo, name, date, count, col], i) => (
            <PjRev key={name} delay={i * 70}>
              <div style={{ background: "#FFFFFF", borderRadius: 14, padding: 26, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ width: 46, height: 46, borderRadius: 11, background: col, color: "#FFF", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 16px var(--font-display)", flex: "none" }}>{logo}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ font: "500 17px var(--font-display)", color: "var(--ink)" }}>{name} <PjIcon name="ext" size={13} stroke="var(--text-muted)" style={{ display: "inline", verticalAlign: "middle" }} /></div>
                    <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 5 }}>Projekt & Einheiten per OpenImmo-Gruppenkennung exportieren</div>
                  </div>
                  <PjStatus kind="aktiv">{date}</PjStatus>
                </div>
                <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--hairline-dark)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 9 }}>Übertragungen ({count}) · alle erfolgreich</span>
                  <div style={{ display: "flex", gap: 8 }}><PjStatus kind="neutral">XML-Vorschau</PjStatus><PjStatus kind="neutral">Aktualisierung</PjStatus></div>
                </div>
              </div>
            </PjRev>
          ))}
        </div>
      )}
    </div>
  );
}
Object.assign(window, { ProjektView });
