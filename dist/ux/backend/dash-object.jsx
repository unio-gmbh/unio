/* UNIO LENS — Objekt/Projektdetail v2: Galerie, Tabs, Einheiten, Umgebung, Export. */
const { Reveal: ORv, RevealL: ORvL, Card: OCard, CardHead: OHead, Ring: ORing, Tabs: OTabs, Chip: OChip, useInView: oInView } = window;

const GAL = ["/assets/img/albrecht.jpg", "/assets/img/albrecht-dusk.jpg", "/assets/img/beheim.jpg", "/assets/img/int-bath.jpg", "/assets/img/int-kitchen.jpg"];
const FACTS = [["Bauträger", "neopartement VI"], ["Architekt", "Dipl.-Ing. Paul Prinz"], ["Preis von", "€ 279.000"], ["Preis bis", "€ 1.599.000"], ["Fläche gesamt", "857 m²"]];
const UNITS = [
  ["Top 1", "€ 279.000", "50 m²", 2, 100, "Aktiv"], ["Top 2", "€ 399.000", "74 m²", 4, 100, "Aktiv"],
  ["Top 3", "€ 539.000", "100 m²", 4, 100, "Reserviert"], ["Top 4", "€ 399.000", "75 m²", 3, 66, "Aktiv"],
  ["Haus 1", "€ 739.000", "130 m²", 6, 100, "Aktiv"], ["Haus 2", "€ 719.000", "125 m²", 6, 40, "Aktiv"],
];
const POI = [["Walk Score", "99", "Sehr gut zu Fuß"], ["Transit", "25", "Wenige Treffer"], ["Alltag", "89", "Sehr gute Nahversorgung"], ["Schulen", "10/10", "Überdurchschnittlich"]];
const EXPORT = [["IS", "ImmobilienScout24.at", "8. Juni 2026, 18:10", 17, "var(--signal-deep)"], ["W", "willhaben.at", "9. Juni 2026, 13:43", 24, "var(--signal)"]];
const INT = [
  ["Nikita Neznamov", "DG-Maisonette · 137 m²", "€ 250.000", "pos", "Angenommen"],
  ["Marcin Fituch", "Traum Penthouse Hernals", "€ 666.000", "pos", "Angenommen"],
  ["Laurenz Wurzer", "Top 3 · 100 m²", "€ 100.000", "neg", "Abgelehnt"],
];

function MkAkteBloecke() {
  const [checks, setChecks] = React.useState({ fotos: true, energie: true, grundbuch: true, preis: true, expose: false });
  const [syncFehler, setSyncFehler] = React.useState(true);
  const [report, setReport] = React.useState(() => sessionStorage.getItem("unio_mk_report") === "1");
  const [gesendet, setGesendet] = React.useState(false);
  React.useEffect(() => { sessionStorage.removeItem("unio_mk_report"); }, []);
  const fertig = Object.values(checks).filter(Boolean).length;
  const CHECKS = [["fotos", "Professionelle Fotos (12+)"], ["energie", "Energieausweis (HWB im Inserat, Pflicht)"], ["grundbuch", "Grundbuchauszug aktuell (ImmoUnited)"], ["preis", "Preisstrategie freigegeben"], ["expose", "Exposé final (mit FAGG-Belehrung)"]];
  const karte = { background: "var(--surface-raised)", borderRadius: 16, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", padding: "18px 20px", marginTop: 14 };
  return (
    <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 0 10px" }}>
      <style>{window.MK_CSS}</style>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 14 }}>
        <div style={karte}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <b style={{ font: "500 16px var(--font-display)", color: "var(--ink)" }}>Vermarktungsreife</b>
            <span className={"mk-pill " + (fertig === 5 ? "ok" : "hot")}>{fertig}/5</span>
          </div>
          {CHECKS.map(([k, l]) => (
            <div key={k} className={"mk-check" + (checks[k] ? " done" : "")}>
              <span className="box" onClick={() => setChecks({ ...checks, [k]: !checks[k] })}>{checks[k] ? "✓" : ""}</span>
              <span style={{ flex: 1 }}>{l}</span>
            </div>
          ))}
          <button className="mk-btn signal" disabled={fertig < 5} style={{ width: "100%", marginTop: 12, opacity: fertig < 5 ? .45 : 1, cursor: fertig < 5 ? "not-allowed" : "pointer" }}>
            {fertig < 5 ? "Veröffentlichen · gesperrt bis 5/5 (Gate)" : "Auf allen Kanälen veröffentlichen"}
          </button>
        </div>
        <div style={karte}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <b style={{ font: "500 16px var(--font-display)", color: "var(--ink)" }}>Portal-Sync</b>
            <span className="mk-mono">Live-Status je Kanal</span>
          </div>
          {[["unio.at + Explore-Feed", "ok", "Synchron · 118 Aufrufe heute"], ["willhaben", "ok", "Synchron · Anfragen-Import aktiv"], ["ImmoScout24", syncFehler ? "fehler" : "ok", syncFehler ? "Fehler: Titelbild unter Mindestauflösung" : "Synchron · neu übertragen"]].map(([kanal, st, sub]) => (
            <div key={kanal} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--hairline-dark)" }}>
              <span style={{ width: 9, height: 9, borderRadius: 99, background: st === "ok" ? "#2E7D46" : "#B3261E", flex: "0 0 auto" }}></span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <b style={{ font: "500 13.5px var(--font-display)", color: "var(--ink)", display: "block" }}>{kanal}</b>
                <span style={{ fontSize: 11.5, color: st === "fehler" ? "#B3261E" : "var(--text-muted)" }}>{sub}</span>
              </div>
              {st === "fehler" && <button className="mk-btn ghost tiny" onClick={() => setSyncFehler(false)}>Neu übertragen</button>}
            </div>
          ))}
          <p className="mk-mono" style={{ marginTop: 10 }}>Einmal erfasst, überall synchron · keine Doppeleingabe</p>
        </div>
        <div style={karte}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <b style={{ font: "500 16px var(--font-display)", color: "var(--ink)" }}>Eigentümer-Report</b>
            <span className="mk-mono">Auf Knopfdruck</span>
          </div>
          <p style={{ margin: "0 0 12px", fontSize: 13, lineHeight: 1.55, color: "var(--text-muted)" }}>Reichweite, Anfragen, Besichtigungen und Feedback der Woche, automatisch aus der Akte aggregiert. Kein Zusammensuchen mehr.</p>
          {report ? (
            <div style={{ background: "#fff", borderRadius: 12, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", padding: "13px 15px" }}>
              {[["Exposé-Aufrufe", "118 (+22 %)"], ["Anfragen", "12"], ["Besichtigungen", "2 · nächste Sa 10:00"], ["Feedback", "„Sehr hell, Preis ambitioniert“ (2x)"], ["Empfehlung", "Preis halten, 2 Wochen beobachten"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "6px 0", borderBottom: "1px dashed var(--hairline-dark)", fontSize: 12.5 }}>
                  <span style={{ color: "var(--text-muted)" }}>{k}</span><b style={{ fontWeight: 500, color: "var(--ink)", textAlign: "right" }}>{v}</b>
                </div>
              ))}
              <button className="mk-btn signal" style={{ width: "100%", marginTop: 10 }} disabled={gesendet} onClick={() => setGesendet(true)}>{gesendet ? "Gesendet ✓ · Kopie im Audit-Trail" : "An H. Schuster senden"}</button>
            </div>
          ) : (
            <button className="mk-btn" style={{ width: "100%" }} onClick={() => setReport(true)}>Report für diese Woche erstellen</button>
          )}
        </div>
      </div>
    </div>
  );
}

function DashObject({ onNav }) {
  const [tab, setTab] = React.useState("daten");
  const [g, setG] = React.useState(0);
  const [mode, setMode] = React.useState("backend");
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <ORvL style={{ marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <button onClick={() => onNav && onNav("objekte")} style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "none", border: "none", cursor: "pointer", font: "500 14px var(--font-display)", color: "var(--text-muted)", padding: 0 }}>
            <span style={{ display: "inline-flex" }}><window.Icon name="back" size={16} /></span> Immobilien-Details
          </button>
          <div style={{ display: "inline-flex", gap: 3, background: "#FFFFFF", borderRadius: 999, padding: 4, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
            {[["backend", "Backend"], ["public", "Endkunde"]].map(([id, l]) => {
              const on = mode === id;
              return <button key={id} onClick={() => setMode(id)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "8px 18px", font: "500 13px var(--font-display)", background: on ? "var(--ink)" : "transparent", color: on ? "var(--paper)" : "var(--text-muted)", transition: "all .25s var(--ease-unio)" }}>{l}</button>;
            })}
          </div>
        </div>
      </ORvL>

      {mode === "public" ? <ExposePublic /> : (
      <React.Fragment>
      {/* Galerie: großes Bild + Miniaturen */}
      <ORv style={{ marginTop: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gap: 12, height: 380 }}>
          <div style={{ position: "relative", borderRadius: 14, overflow: "hidden" }}>
            {GAL.map((s, i) => <img key={s} src={s} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === g ? 1 : 0, transition: "opacity 600ms var(--ease-unio)" }} />)}
          </div>
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 12, minHeight: 0 }}>
            {[1, 2].map((row) => (
              <div key={row} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 12, minHeight: 0 }}>
                {GAL.slice(row * 2 - 1, row * 2 + 1).map((s, i) => {
                  const idx = row * 2 - 1 + i;
                  const last = row === 2 && i === 1;
                  return (
                    <div key={s} onMouseEnter={() => setG(idx)} style={{ position: "relative", borderRadius: 12, overflow: "hidden", cursor: "pointer", minHeight: 0, boxShadow: idx === g ? "inset 0 0 0 2px var(--signal)" : "none" }}>
                      <img src={s} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      {last && <div style={{ position: "absolute", inset: 0, background: "rgba(11,10,9,0.6)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--paper)", font: "500 12px var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>+4 Fotos</div>}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </ORv>

      {/* Kopf-Karte */}
      <ORv delay={60}>
        <OCard style={{ marginTop: 20 }} pad={30}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "start" }}>
            <div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <OChip tone="pos"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)" }}></span>Status: Aktiv</OChip>
                <OChip tone="warn">In Planung</OChip><OChip>Wohnbau</OChip>
              </div>
              <h1 style={{ margin: "20px 0 0", font: "500 clamp(30px, 3vw, 46px)/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Albrechts Townhouses</h1>
              <p style={{ margin: "14px 0 0", font: "400 15px var(--font-display)", color: "var(--text-muted)" }}>◎ Stockerauer Straße 53, 2100 Korneuburg</p>
              <p style={{ margin: "18px 0 0", font: "400 15px/1.6 var(--font-display)", color: "var(--text-body)", maxWidth: 520 }}>Neubauprojekt mit Dachgeschoßwohnungen und Reihenhäusern — hochwertige Ausstattung, Gärten, Terrassen und optionalen Stellplätzen.</p>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ borderRadius: 12, padding: "20px 24px", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", minWidth: 120 }}>
                <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5 }}>Einheiten</div>
                <div style={{ font: "500 36px/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", marginTop: 12 }}>10</div>
              </div>
              <div style={{ borderRadius: 12, padding: "20px 24px", background: "var(--signal-soft)", boxShadow: "inset 0 0 0 1px rgba(255,170,9,0.3)", minWidth: 180 }}>
                <div className="u-label" style={{ color: "var(--signal-deep)", fontSize: 8.5 }}>Preisspanne</div>
                <div style={{ font: "500 22px/1.2 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 12 }}>€ 279k – 1,6 Mio.</div>
              </div>
            </div>
          </div>
        </OCard>
      </ORv>

      <MkAkteBloecke />
      <window.ProjektBanner onNav={onNav} />
      <div style={{ margin: "28px 0 24px" }}><OTabs items={[["daten", "Daten"], ["interessenten", "Interessenten", 5], ["export", "Plattform Export"], ["abschluss", "Abschluss"], ["aktivitaet", "Aktivität"], ["ki", "KI-Analyse"]]} active={tab} onPick={setTab} /></div>

      {tab === "daten" && <DatenTab />}
      {tab === "interessenten" && <window.InteressentenFunnelTab />}
      {tab === "export" && <window.PlattformExportTab />}
      {tab === "abschluss" && <window.BlankTab label="Abschluss" />}
      {tab === "aktivitaet" && <window.AktivitaetTab />}
      {tab === "ki" && <window.BlankTab label="KI-Analyse" />}
      </React.Fragment>
      )}
    </div>
  );
}

/* Endkunden-Exposé — öffentliche Property-Seite (wie Homepage-Property). */
function ExposePublic() {
  const { Button: EBtn, Icon: EIcon } = window.UNIODesignSystem_b6216a.Button ? window.UNIODesignSystem_b6216a : {};
  const Btn = window.UNIODesignSystem_b6216a.Button;
  const Ic = window.Icon, Rl = window.Ruler;
  const GAL = ["/assets/img/ecoluxe.jpg", "/assets/img/int-kitchen.jpg", "/assets/img/int-bath.jpg", "/assets/img/vienna-garden.jpg", "/assets/img/vienna-facade.jpg"];
  const [big, setBig] = React.useState(0);
  const stat = (v, k, sub, inv) => (
    <div style={{ borderRadius: 14, padding: "20px 22px", background: inv ? "var(--ink)" : "#FFFFFF", color: inv ? "var(--paper)" : "var(--ink)", boxShadow: inv ? "none" : "inset 0 0 0 1px var(--hairline-dark)", minWidth: 120 }}>
      <div className="u-label" style={{ fontSize: 8, color: inv ? "rgba(247,245,241,0.6)" : "var(--text-muted)" }}>{k}{sub && <span style={{ marginLeft: 6, opacity: 0.7 }}>{sub}</span>}</div>
      <div style={{ font: "500 30px/1 var(--font-display)", letterSpacing: "-0.03em", marginTop: 12, fontVariantNumeric: "tabular-nums" }}>{v}</div>
    </div>
  );
  const kv = (k, v) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "13px 0", borderBottom: "1px solid var(--hairline-dark)" }}>
      <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 9 }}>{k}</span>
      <span style={{ font: "13px var(--font-mono)", color: "var(--ink-2)" }}>{v}</span>
    </div>
  );
  return (
    <div style={{ marginTop: 20 }}>
      {/* Galerie: großes Bild + Miniaturen (Text NUR unter dem Bild) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
        <div style={{ gridColumn: "span 4", position: "relative", borderRadius: 16, overflow: "hidden", height: 440 }}>
          {GAL.map((s, i) => <img key={s} src={s} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === big ? 1 : 0, transition: "opacity 500ms var(--ease-unio)" }} />)}
          <span className="u-label" style={{ position: "absolute", right: 16, bottom: 16, fontSize: 9, padding: "8px 14px", borderRadius: 999, background: "var(--glass-dark)", WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)", color: "var(--text-inverse)" }}>{big + 1} / 33 · Galerie öffnen</span>
        </div>
        {GAL.slice(1, 5).map((s, i) => (
          <div key={s} onMouseEnter={() => setBig(i + 1)} style={{ position: "relative", borderRadius: 12, overflow: "hidden", height: 118, cursor: "pointer", boxShadow: big === i + 1 ? "inset 0 0 0 2px var(--signal)" : "none" }}>
            <img src={s} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        ))}
      </div>

      {/* Zwei Spalten: Inhalt + Sticky-Sidebar */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)", gap: 32, marginTop: 40, alignItems: "start" }}>
        <div>
          <h1 style={{ margin: 0, font: "500 clamp(34px,4vw,58px)/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>ECOLUX — Ihr eigenes<br />Refugium<span style={{ color: "var(--signal)" }}>.</span></h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 22 }}>
            <window.StatusPill kind="aktiv">Aktiv</window.StatusPill>
            {["Zum Verkauf", "Villa", "#57", "1140 Wien"].map((t) => <window.StatusPill key={t} kind="neutral">{t}</window.StatusPill>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginTop: 28 }}>
            {stat("242,7", "Wohnfläche", "m²", true)}{stat("3", "Bäder", "+ 2 WC")}{stat("15.000", "Grund", "m²")}{stat("2022", "Baujahr", "Erstbezug")}
          </div>

          <h2 style={{ margin: "44px 0 0", font: "500 22px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Über dieses Objekt</h2>
          <p style={{ margin: "18px 0 0", font: "400 15px/1.75 var(--font-display)", color: "var(--text-body)", maxWidth: 560 }}>Auf fast 15.000 m² Privatgrund, eingebettet in Wald und Natur, erwartet Sie dieses außergewöhnliche Refugium am westlichen Rand Wiens. Zwei Häuser mit rund 195 m² Wohnfläche, ein Naturpool, Sauna, weitläufige Terrassen und ein großzügiger Garten.</p>
          <button style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 18, border: "none", background: "none", cursor: "pointer", font: "500 13px var(--font-display)", color: "var(--signal-deep)" }}>Vollständige Beschreibung <Ic name="arrow" size={13} stroke="var(--signal-deep)" style={{ transform: "rotate(90deg)" }} /></button>

          <h2 style={{ margin: "44px 0 8px", font: "500 22px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Raumprofil</h2>
          <Rl label="Fläche je Zimmer" value="47 m²" poleL="Effizient" poleR="Großzügig" pos={62} note="Sehr großzügige Raumzuschnitte." />
          <Rl label="Außenflächen-Anteil" value="36 %" poleL="Kompakt" poleR="Weitläufig" pos={70} />

          <h2 style={{ margin: "44px 0 8px", font: "500 22px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Highlights</h2>
          <div>{kv("Grundstück", "14.830 m²")}{kv("Außenbereich", "Naturpool, Sauna, Terrassen")}{kv("Anbindung", "25 Min. ins Zentrum")}{kv("Erstbezug", "Baujahr 2022")}{kv("Kellerabteil", "Inklusive")}</div>

          <h2 style={{ margin: "44px 0 18px", font: "500 22px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Ausstattung</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 32px" }}>
            {[["Etage", "2. DG"], ["Heizung", "Fußbodenheizung"], ["WC", "3"], ["Energieträger", "Luftwärmepumpe"], ["Ausrichtung", "N/O"], ["Parkplatz", "Vorhanden"], ["Außenbereiche", "Terrasse, Garten"], ["Klimaanlage", "Vorhanden"], ["Zustand", "Neuwertig"]].map(([k, v]) => kv(k, v))}
          </div>

          <h2 style={{ margin: "44px 0 16px", font: "500 22px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Energieausweis</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ width: 60, height: 60, borderRadius: 12, background: "var(--ink)", color: "var(--paper)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 26px var(--font-display)", flex: "none" }}>C</span>
            <div style={{ display: "flex", gap: 40 }}>
              <div><div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>Art</div><div style={{ font: "14px var(--font-mono)", color: "var(--ink-2)", marginTop: 6 }}>Bedarfsausweis</div></div>
              <div><div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>fGEE</div><div style={{ font: "14px var(--font-mono)", color: "var(--ink-2)", marginTop: 6 }}>0,73</div></div>
            </div>
          </div>
        </div>

        {/* Sticky-Sidebar */}
        <div style={{ position: "sticky", top: 88, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 26, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
            <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>Kaufpreis</div>
            <div style={{ font: "500 34px var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", marginTop: 12 }}>€ 4.950.000</div>
            <p style={{ margin: "12px 0 20px", font: "400 13px/1.5 var(--font-display)", color: "var(--text-muted)" }}>Verfügbar ab Bezugsfertig · Makler: Boom Living GmbH</p>
            <Btn variant="solid" size="md" knob style={{ width: "100%", justifyContent: "center" }}>Besichtigung anfragen</Btn>
            <button onClick={(e) => { e.currentTarget.textContent = "Zugestellt ✓ · Namhaftmachung dokumentiert (17.08., 11:58)"; }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", marginTop: 14, border: "none", background: "none", cursor: "pointer", font: "500 13px var(--font-display)", fontFamily: "inherit", color: "var(--ink-2)" }}>Exposé erhalten <Ic name="download" size={14} stroke="var(--ink-2)" /></button>
          </div>
          {/* Marktdaten LIVE */}
          <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 26, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: 8 }}>Marktdaten <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--signal-deep)" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)" }}></span>Live</span></span>
              <Ic name="arrow" size={13} stroke="var(--text-muted)" style={{ transform: "rotate(-45deg)" }} />
            </div>
            <div style={{ font: "500 44px/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", marginTop: 18 }}>18</div>
            <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 8 }}>Anfragen · letzte 7 Tage</div>
            <div style={{ marginTop: 16 }}><window.Bars data={[4, 6, 5, 7, 6, 9, 8, 11, 9, 13]} height={54} /></div>
            <div style={{ marginTop: 18 }}>
              {[["Besichtigungen geplant", "12"], ["Ø Antwortzeit", "< 24 h"], ["Exposé-Abrufe", "118"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid var(--hairline-dark)" }}>
                  <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{k}</span><span style={{ font: "12px var(--font-mono)", color: "var(--ink)" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: 12, marginTop: 16 }}>
              <div style={{ borderRadius: 12, padding: "16px 18px", background: "var(--signal-soft)" }}><div style={{ font: "500 24px var(--font-display)", color: "var(--ink)" }}>72 %</div><div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 8 }}>Nachfrage über Bezirksschnitt</div></div>
              <div style={{ borderRadius: 12, padding: "16px 18px", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}><div style={{ font: "500 24px var(--font-display)", color: "var(--ink)" }}>46</div><div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 8 }}>Auf Merklisten vorgemerkt</div></div>
            </div>
          </div>
          {/* Makler */}
          <div style={{ background: "#FFFFFF", borderRadius: 16, padding: 22, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 42, height: 42, borderRadius: "50%", background: "var(--signal)", color: "var(--on-signal)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 14px var(--font-display)", flex: "none" }}>WW</span>
              <div><div style={{ font: "500 15px var(--font-display)", color: "var(--ink)" }}>Wenzel Wächter</div><div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 4 }}>UNIO Partner · Boom Living</div></div>
            </div>
            <p className="u-label" style={{ margin: "16px 0 0", fontSize: 8.5, color: "var(--text-muted)" }}>Kontaktdaten geschützt — nach Login sichtbar.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExposePublicOLD2() {
  const { GlassPanel: GP, DataLabel: DL, Button: EBtn, IconButton: EIB, Tag: ETag } = window.UNIODesignSystem_b6216a;
  const GAL = ["/assets/img/ecoluxe.jpg", "/assets/img/vienna-garden.jpg", "/assets/img/int-kitchen.jpg", "/assets/img/int-bath.jpg"];
  const [idx, setIdx] = React.useState(0);
  return (
    <div style={{ margin: "20px -40px -80px", fontFamily: "var(--font-display)" }}>
      {/* Vollbild-Galerie */}
      <section style={{ position: "relative", height: "82vh", minHeight: 560, overflow: "hidden", background: "var(--ink)" }}>
        {GAL.map((s, i) => <img key={s} src={s} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === idx ? 1 : 0, transition: "opacity var(--dur-base) var(--ease-unio)" }} />)}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.28), transparent 34%, transparent 52%, rgba(11,10,9,0.66))" }}></div>
        <div style={{ position: "absolute", top: 26, right: 32, display: "flex", gap: 8 }}><ETag>Objekt 057</ETag><ETag signal>Zum Verkauf</ETag></div>
        <div style={{ position: "absolute", right: 32, bottom: 32, display: "flex", alignItems: "center", gap: 14 }}>
          <span className="u-label" style={{ color: "var(--text-inverse)", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>{String(idx + 1).padStart(2, "0")} / {String(GAL.length).padStart(2, "0")}</span>
          <EIB glyph="←" label="Zurück" onClick={() => setIdx((idx + GAL.length - 1) % GAL.length)} />
          <EIB glyph="→" label="Weiter" onClick={() => setIdx((idx + 1) % GAL.length)} />
        </div>
        <div style={{ position: "absolute", left: 40, bottom: 40, color: "var(--text-inverse)", maxWidth: 760 }}>
          <DL marker>1140 Wien · Penzing · 15.000 m²</DL>
          <h1 style={{ margin: "14px 0 0", font: "500 clamp(40px, 5vw, 80px)/0.98 var(--font-display)", letterSpacing: "-0.03em", textShadow: "0 2px 40px rgba(0,0,0,0.4)" }}>ECOLUX —<br />Ihr eigenes Refugium</h1>
        </div>
      </section>

      {/* Glas-Faktenleiste, überlappend */}
      <div style={{ position: "relative", zIndex: 10, margin: "-72px 40px 0" }}>
        <GP tone="dark" padding="22px 28px" shadow style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 40, alignItems: "baseline" }}>
            <div><div style={{ font: "500 30px var(--font-display)", letterSpacing: "-0.02em" }}>€ 4,95 Mio.</div><div className="u-label" style={{ color: "var(--text-inverse-muted)", marginTop: 4 }}>Kaufpreis</div></div>
            <div><div style={{ font: "16px var(--font-mono)" }}>242,7 m²</div><div className="u-label" style={{ color: "var(--text-inverse-muted)", marginTop: 4 }}>Wohnfläche</div></div>
            <div><div style={{ font: "16px var(--font-mono)" }}>2022</div><div className="u-label" style={{ color: "var(--text-inverse-muted)", marginTop: 4 }}>Baujahr</div></div>
          </div>
          <EBtn variant="paper" knob>Besichtigung anfragen</EBtn>
        </GP>
      </div>

      {/* Beschreibung + Ausstattung über Foto */}
      <section className="u-grain" style={{ background: "var(--paper)", padding: "96px 40px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)", gap: 64 }}>
          <div>
            <h2 style={{ margin: 0, font: "500 clamp(28px,3vw,44px)/1.04 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Natur, Ruhe und Weltstadt in einem.</h2>
            <p style={{ margin: "22px 0 0", font: "400 16px/1.7 var(--font-display)", color: "var(--text-body)", maxWidth: 560 }}>Auf fast 15.000 m² Privatgrund, eingebettet in Wald und Natur, erwartet Sie dieses außergewöhnliche Refugium am westlichen Rand Wiens. Zwei Häuser mit rund 195 m² Wohnfläche, ein Naturpool, Sauna, weitläufige Terrassen und ein großzügiger Garten.</p>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "0 40px", marginTop: 32 }}>
              {[["Grundstück", "14.830 m²"], ["Anbindung", "25 Min. ins Zentrum"], ["Ausstattung", "Naturpool, Sauna, Kamin"], ["Status", "Bezugsfertig"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "13px 0", borderBottom: "1px solid var(--hairline-dark)" }}>
                  <span className="u-label" style={{ color: "var(--signal-deep)", fontSize: 9 }}>{k}</span>
                  <span style={{ font: "13px var(--font-mono)", color: "var(--ink-2)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative", borderRadius: "var(--r-panel)", overflow: "hidden", minHeight: 340 }}>
            <img src="/assets/img/vienna-garden.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", left: 18, bottom: 18, right: 18 }}>
              <GP tone="dark" padding="16px 20px" radius={16} grain={false} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div><div style={{ font: "500 16px var(--font-display)" }}>Wenzel Wächter</div><span className="u-label" style={{ color: "var(--text-inverse-muted)", fontSize: 9 }}>Ihr Ansprechpartner</span></div>
                <EBtn variant="paper" size="sm" knob="›">Kontakt</EBtn>
              </GP>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ExposePublicOLD() {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", height: 420 }}>
        <img src="/assets/img/ecoluxe.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 45%, rgba(11,10,9,0.6))" }}></div>
        <div style={{ position: "absolute", left: 32, bottom: 30, color: "var(--paper)" }}>
          <span className="u-label" style={{ fontSize: 9, padding: "5px 11px", borderRadius: 999, background: "var(--signal)", color: "var(--on-signal)" }}>Zum Verkauf</span>
          <h1 style={{ margin: "16px 0 0", font: "500 clamp(30px, 3.2vw, 50px)/1 var(--font-display)", letterSpacing: "-0.03em", textShadow: "0 2px 30px rgba(0,0,0,0.4)" }}>ECOLUX — Ihr eigenes 15.000 m² Refugium</h1>
          <p style={{ margin: "12px 0 0", font: "400 15px var(--font-display)", color: "rgba(247,245,241,0.9)", display: "inline-flex", alignItems: "center", gap: 7 }}><window.Icon name="pin" size={14} stroke="rgba(247,245,241,0.9)" />Hühnersteigstraße 19, 1140 Wien, Penzing</p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20, marginTop: 20, alignItems: "start" }}>
        <div style={{ background: "#FFFFFF", borderRadius: 14, padding: 30, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
          <div style={{ font: "500 34px var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>€ 4.950.000</div>
          <div style={{ display: "flex", gap: 32, marginTop: 22, paddingTop: 20, borderTop: "1px solid var(--hairline-dark)" }}>
            {[["242,7 m²", "Wohnfläche"], ["3", "Bäder"], ["2022", "Baujahr"]].map(([v, k]) => (
              <div key={k}><div style={{ font: "18px var(--font-mono)", color: "var(--ink)" }}>{v}</div><div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 6 }}>{k}</div></div>
            ))}
          </div>
          <p style={{ margin: "24px 0 0", font: "400 15px/1.7 var(--font-display)", color: "var(--text-body)", maxWidth: 560 }}>Auf fast 15.000 m² Privatgrund, eingebettet in Wald und Natur, erwartet Sie dieses außergewöhnliche Refugium am westlichen Rand Wiens. Zwei Häuser mit rund 195 m² Wohnfläche, ein Naturpool, Sauna, weitläufige Terrassen und ein großzügiger Garten.</p>
        </div>
        <div style={{ background: "#FFFFFF", borderRadius: 14, padding: 26, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
          <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>Ihr Ansprechpartner</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
            <span style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--signal)", color: "var(--on-signal)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 14px var(--font-display)" }}>WW</span>
            <div><div style={{ font: "500 15px var(--font-display)", color: "var(--ink)" }}>Wenzel Wächter</div><div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 4 }}>Immobilienmakler</div></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
            <window.UNIODesignSystem_b6216a.Button variant="signal" size="md" knob>Besichtigung anfragen</window.UNIODesignSystem_b6216a.Button>
            <window.UNIODesignSystem_b6216a.Button variant="ghost" size="md">Exposé herunterladen</window.UNIODesignSystem_b6216a.Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DatenTab() {
  return (
    <React.Fragment>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 16 }}>
        {FACTS.map((f, i) => (
          <ORv key={f[0]} delay={i * 50}><OCard pad={20} style={{ height: "100%" }}>
            <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5 }}>{f[0]}</div>
            <div style={{ font: "500 17px/1.3 var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)", marginTop: 12 }}>{f[1]}</div>
          </OCard></ORv>
        ))}
      </div>

      {/* Einheiten-Profil (v2.2 §3) */}
      <ORv style={{ marginTop: 20 }}>
        <OCard>
          <OHead label="Einheiten-Profil" title="Wo die Einheiten im Projekt liegen" right={<OChip>10 Einheiten</OChip>} />
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "0 48px" }}>
            <window.Ruler label="Preisspanne" value="€ 539k" poleL="€ 279k" poleR="€ 1,6 Mio" pos={34} note="Median bei € 539.000, 4 Einheiten unter € 400.000." />
            <window.Ruler label="Fläche je Zimmer" value="24 m²" poleL="Kompakt" poleR="Großzügig" pos={58} note="Durchschnittlich 24 m² je Zimmer — leicht über Neubauschnitt." />
          </div>
          <div style={{ marginTop: 18, paddingTop: 20, borderTop: "1px solid var(--hairline-dark)" }}>
            <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5, marginBottom: 12 }}>Vermarktungsstand</div>
            <div style={{ display: "flex", gap: 3 }}>
              {UNITS.map((u, i) => {
                const c = u[5] === "Reserviert" ? "#F0873F" : "color-mix(in oklch, var(--signal) 55%, #E2DCCF)";
                return <span key={i} style={{ flex: 1, height: 12, borderRadius: 3, background: c }}></span>;
              })}
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
              {[["Verkauft", "var(--signal)"], ["Reserviert", "#F0873F"], ["Aktiv", "color-mix(in oklch, var(--signal) 55%, #E2DCCF)"]].map(([n, c]) => (
                <span key={n} className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: c }}></span>{n}</span>
              ))}
            </div>
          </div>
        </OCard>
      </ORv>

      {/* Einheiten-Tabelle */}
      <ORv style={{ marginTop: 20 }}>
        <OCard pad={0}>
          <div style={{ padding: "24px 26px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <OHead title="Einheiten" right={null} />
            <OChip>10 Einheiten</OChip>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 0.7fr 1.2fr 0.9fr", padding: "0 26px 12px", borderBottom: "1px solid var(--hairline-dark)" }}>
            {["Top / Titel", "Preis", "Fläche", "Zimmer", "Fortschritt", "Status"].map((h) => <span key={h} className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5 }}>{h}</span>)}
          </div>
          {UNITS.map((u, i) => <UnitRow key={u[0]} u={u} i={i} last={i === UNITS.length - 1} />)}
        </OCard>
      </ORv>

      {/* Umgebung */}
      <ORv style={{ marginTop: 20 }}>
        <OCard>
          <OHead label="Umgebung" title="Projektumgebung im Überblick" right={<OChip>20 POIs</OChip>} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 0 }}>
            {POI.map(([k, v, s], i) => (
              <div key={k} style={{ padding: "8px 24px", borderLeft: i ? "1px solid var(--hairline-dark)" : "none" }}>
                <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5 }}>{k}</div>
                <div style={{ font: "500 clamp(30px,3vw,44px)/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", marginTop: 12 }}>{v}</div>
                <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 8, marginTop: 10 }}>{s}</div>
              </div>
            ))}
          </div>
        </OCard>
      </ORv>
    </React.Fragment>
  );
}

function InteressentenTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {INT.map((r, i) => (
        <ORv key={r[0]} delay={i * 60}>
          <OCard pad={20} hover>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 20, alignItems: "center" }}>
              <span style={{ width: 42, height: 42, borderRadius: "50%", background: "var(--paper-2)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 14px var(--font-display)", color: "var(--ink)" }}>{r[0].split(" ").map((w) => w[0]).join("")}</span>
              <div>
                <div style={{ font: "500 15px var(--font-display)", color: "var(--ink)" }}>{r[0]}</div>
                <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 5 }}>{r[1]}</div>
              </div>
              <span style={{ font: "16px var(--font-mono)", color: "var(--ink)" }}>{r[2]}</span>
              <OChip tone={r[3]}>{r[4]}</OChip>
            </div>
          </OCard>
        </ORv>
      ))}
    </div>
  );
}

function ExportTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {EXPORT.map(([logo, name, date, count, col], i) => (
        <ORv key={name} delay={i * 70}>
          <OCard>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ width: 46, height: 46, borderRadius: 11, background: col, color: "#FFF", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 16px var(--font-display)", flex: "none" }}>{logo}</span>
              <div style={{ flex: 1 }}>
                <div style={{ font: "500 17px var(--font-display)", color: "var(--ink)" }}>{name} <span style={{ font: "12px var(--font-mono)", color: "var(--text-muted)" }}>↗</span></div>
                <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 5 }}>Projekt & Einheiten per OpenImmo-Gruppenkennung exportieren</div>
              </div>
              <OChip tone="pos"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)" }}></span>{date}</OChip>
            </div>
            <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--hairline-dark)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 9 }}>Übertragungen ({count}) · alle erfolgreich</span>
              <div style={{ display: "flex", gap: 8 }}><OChip>XML-Vorschau</OChip><OChip tone="warn">Aktualisierung</OChip></div>
            </div>
          </OCard>
        </ORv>
      ))}
      <ORv delay={160}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 26px", borderRadius: 12, background: "#FFFFFF", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
          <span className="u-label" style={{ color: "var(--text-muted)" }}>2 Plattformen verbunden</span>
          <window.UNIODesignSystem_b6216a.Button variant="signal" size="sm" knob>Exportieren</window.UNIODesignSystem_b6216a.Button>
        </div>
      </ORv>
    </div>
  );
}

function MiniProg({ pct, i }) {
  const [ref, run] = oInView(0.5);
  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1, height: 6, borderRadius: 3, background: "var(--paper-2)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: run ? pct + "%" : "0%", background: "var(--signal)", borderRadius: 3, transition: `width 900ms var(--ease-unio) ${i * 60}ms` }}></div>
      </div>
      <span style={{ font: "11px var(--font-mono)", color: "var(--text-muted)" }}>{pct}%</span>
    </div>
  );
}
function UnitRow({ u, i, last }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ borderBottom: last && !open ? "none" : "1px solid var(--hairline-dark)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 0.7fr 1.2fr 0.9fr 30px", padding: "18px 26px", alignItems: "center", background: open ? "#F7F3EC" : "transparent" }}>
        <button onClick={() => setOpen((v) => !v)} style={{ border: "none", background: "none", cursor: "pointer", textAlign: "left", padding: 0, font: "500 14px var(--font-display)", color: "var(--ink)" }}>{u[0]}</button>
        <span style={{ font: "13px var(--font-mono)", color: "var(--ink-2)" }}>{u[1]}</span>
        <span style={{ font: "13px var(--font-mono)", color: "var(--text-muted)" }}>{u[2]}</span>
        <span style={{ font: "13px var(--font-mono)", color: "var(--text-muted)" }}>{u[3]}</span>
        <MiniProg pct={u[4]} i={i} />
        <span><window.StatusPill kind={u[5] === "Reserviert" ? "reserviert" : "aktiv"}>{u[5]}</window.StatusPill></span>
        <button onClick={() => setOpen((v) => !v)} aria-label="Aufklappen" style={{ border: "none", background: "none", cursor: "pointer", justifySelf: "end", color: "var(--text-muted)" }}><window.Icon name="arrow" size={14} style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform .3s" }} /></button>
      </div>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 300ms var(--ease-unio)" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "0 48px", padding: "4px 26px 22px" }}>
            <window.Ruler label="Preis / m²" value={u[6] || "€ 5 390"} poleL="€ 4 200" poleR="€ 9 100" pos={u[7] || 42} cmp={60} cmpLabel="Projekt-Ø" note="Preis/m² dieser Einheit gegen Projektspanne." />
            <window.Ruler label="Fläche je Zimmer" value={u[8] || "25 m²"} poleL="Kompakt" poleR="Großzügig" pos={u[9] || 55} cmp={50} cmpLabel="Projekt-Ø" note="Zimmergröße gegen Projektschnitt." />
          </div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { DashObject });
