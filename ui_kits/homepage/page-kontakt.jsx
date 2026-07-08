/* UNIO — Kontakt. Formular + direkte Wege. */
const {
  GlassPanel: GPk, Button: Bk, Input: Ink, Select: Selk, Checkbox: Chk,
} = window.UNIODesignSystem_b6216a;
const { SiteNav, SiteFooter, Chapter } = window;

function KontaktForm() {
  const [sent, setSent] = React.useState(false);
  const [einverst, setEinverst] = React.useState(false);
  return (
    <section className="u-grain" style={{ background: "var(--paper)", padding: "180px 6vw 120px", minHeight: "100vh" }}>
      <Chapter title={<span>Sprechen wir.<br />Mit Daten, nicht Floskeln.</span>} copy="Wir antworten innerhalb von 48 Stunden — mit einer ersten Einschätzung, nicht mit einem Newsletter." style={{ marginBottom: 84 }} />
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)", gap: 48, alignItems: "start" }}>
        <div style={{ background: "var(--surface-raised)", borderRadius: "var(--r-card)", padding: "34px 36px", boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)" }}>
          {sent ? (
            <div style={{ padding: "30px 0", textAlign: "center" }}>
              <span style={{ display: "inline-flex", width: 64, height: 64, borderRadius: "50%", background: "var(--signal-soft)", color: "var(--signal-deep)", alignItems: "center", justifyContent: "center", font: "26px var(--font-mono)" }}>✓</span>
              <div style={{ font: "500 22px var(--font-display)", color: "var(--ink)", marginTop: 18 }}>Danke. Sie hören von uns.</div>
              <p style={{ margin: "10px 0 0", color: "var(--text-muted)", font: "400 15px var(--font-display)" }}>Innerhalb von 48 Stunden, mit Daten.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <Ink label="Name" placeholder="Vor- und Nachname" />
                <Ink label="E-Mail" placeholder="name@firma.at" />
              </div>
              <Selk label="Ich bin" options={["Bauträger:in", "Makler:in", "Eigentümer:in", "Käufer:in"]} />
              <Ink label="Worum geht es?" placeholder="Projekt, Objekt oder Frage — ein Satz genügt" />
              <Chk label="Ich bin einverstanden, dass UNIO mich kontaktiert." checked={einverst} onChange={setEinverst} />
              <div>
                <Bk variant="signal" size="lg" knob disabled={!einverst} onClick={() => setSent(true)}>Nachricht senden</Bk>
              </div>
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[["Demo buchen", "Live durch LENS und die Plattform — 30 Minuten.", "Demo anfragen"], ["Immobilie bewerten", "Kostenlos, datenbasiert, in 48 Stunden.", "Zur Bewertung ↗"], ["CIRCLE-Bewerbung", "Für Makler:innen mit Track-Record.", "Zur Makler-Seite"]].map(([t, p, cta], i) => (
            <div key={t} style={{ background: i === 0 ? "var(--signal)" : "var(--surface-raised)", color: i === 0 ? "#FFFFFF" : "var(--ink-2)", borderRadius: "var(--r-card)", padding: "24px 26px", boxShadow: i === 0 ? "var(--shadow-float)" : "inset 0 0 0 1px var(--hairline-dark)" }}>
              <div style={{ font: "500 19px var(--font-display)", letterSpacing: "-0.01em", color: i === 0 ? "#FFFFFF" : "var(--ink)" }}>{t}</div>
              <p style={{ margin: "8px 0 14px", font: "400 14px/1.55 var(--font-display)", color: i === 0 ? "rgba(255,245,239,0.9)" : "var(--text-muted)" }}>{p}</p>
              <Bk size="sm" variant={i === 0 ? "paper" : "ghost"} onClick={() => { if (i === 1) window.open(window.UNIO_BEWERTUNG_URL, "_blank"); if (i === 2) location.assign("makler.html"); }}>{cta}</Bk>
            </div>
          ))}
          <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 10, marginTop: 6 }}>UNIO · Wien · office@unio.at · app.unio.at</span>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div style={{ fontFamily: "var(--font-display)" }}>
      <SiteNav active="kontakt.html" />
      <KontaktForm />
      <SiteFooter />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
