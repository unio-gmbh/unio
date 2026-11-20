/* Partner-Uebersicht: alle Makler im CIRCLE auf einer Seite (nur Variante 2).
   Ein Raster grosser Portraets im Format 4:5, Name im Bild. Karte fuehrt zur Partnerseite. */
const { SiteNav: NavP, SiteFooter: FootP, MAKLER_DB: DBP, CirclePortraet: PortraetP, useMobile: useMobP } = window;

function PartnerSeite() {
  const mob = useMobP();
  const liste = Object.keys(DBP).map((slug) => ({ slug, ...DBP[slug] })).filter((m) => m.ed);
  const sp = mob ? 2 : 4;
  const rest = sp - (liste.length % sp) || sp;
  return (
    <div style={{ fontFamily: "var(--font-display)", background: "var(--paper)" }}>
      <NavP active="makler.html" />
      <main id="main" className="u-grain" style={{ position: "relative", padding: mob ? "150px 6vw 96px" : "220px 6vw 150px" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 1.35fr) minmax(0, 1fr)", gap: mob ? 16 : 44, alignItems: mob ? "start" : "end", marginBottom: mob ? 40 : 72 }}>
            <h1 style={{ margin: 0, font: `500 ${mob ? "clamp(38px, 11vw, 52px)" : "clamp(48px, 5.4vw, 92px)"}/1 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>
              Die Menschen<br />im CIRCLE<span style={{ color: "var(--signal)" }}>.</span>
            </h1>
            <div style={{ maxWidth: 440 }}>
              <p style={{ margin: 0, font: `400 ${mob ? 15.5 : 17}px/1.7 var(--font-display)`, color: "var(--text-muted)" }}>
                Jede Immobilie bei UNIO wird von einem Menschen betreut, der sie kennt. Hier sind sie. Ein Klick führt zur eigenen Seite mit allen Objekten.
              </p>
              <span className="u-label" style={{ display: "block", marginTop: 18, fontSize: 10, color: "var(--text-muted)" }}>{liste.length} Partner · Wien und Umgebung</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${sp}, minmax(0, 1fr))`, gap: mob ? 10 : 16 }}>
            {liste.map((m) => <PortraetP key={m.slug} m={m} breite="100%" />)}
            {/* Die letzte Reihe wird immer voll: der freie Platz ist die Einladung */}
            <a href="makler.html#bewerben" style={{ gridColumn: "span " + rest, minHeight: mob ? 180 : 0, borderRadius: "var(--r-card)", background: "var(--signal)", color: "#1A1305", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: mob ? "20px 18px" : "28px 28px 24px" }}>
              <span aria-hidden="true" style={{ font: "300 44px/1 var(--font-display)" }}>+</span>
              <span>
                <span style={{ display: "block", font: `500 ${mob ? 22 : "clamp(26px, 2.6vw, 40px)"}${mob ? "px" : ""}/1.08 var(--font-display)`, letterSpacing: "-0.025em" }}>Dein Platz im CIRCLE.</span>
                <span className="u-label" style={{ display: "block", marginTop: 10, fontSize: 10, color: "rgba(26,19,5,0.72)" }}>Jetzt anfragen →</span>
              </span>
            </a>
          </div>
        </div>
      </main>
      <FootP />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<PartnerSeite />);
