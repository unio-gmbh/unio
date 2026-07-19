/* UNIO — Kontakt. Formular + direkte Wege. */
const {
  GlassPanel: GPk, Button: Bk, Input: Ink, Select: Selk, Checkbox: Chk,
} = window.UNIODesignSystem_b6216a;
const { SiteNav, SiteFooter, Chapter, submitLead, validEmail, LeadError } = window;

function KontaktForm() {
  const [sent, setSent] = React.useState(false);
  const [einverst, setEinverst] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const isDemo = /[?&]demo=1/.test(location.search);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [rolle, setRolle] = React.useState("Bauträger:in");
  const [msg, setMsg] = React.useState(isDemo ? "Ich möchte eine Demo buchen — 30 Minuten durch LENS und die Plattform." : "");
  const formRef = React.useRef(null);
  const mob = window.useMobile();
  const canSend = einverst && name.trim().length > 1 && validEmail(email);
  const send = async () => {
    if (!canSend || busy) return;
    setBusy(true); setErr(false);
    const ok = await submitLead("kontakt", { name, email, rolle, nachricht: msg, demo: isDemo });
    setBusy(false);
    if (ok) setSent(true); else setErr(true);
  };
  const focusForm = (demoText) => {
    if (demoText && !msg) setMsg("Ich möchte eine Demo buchen — 30 Minuten durch LENS und die Plattform.");
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      const first = formRef.current.querySelector("input");
      if (first) setTimeout(() => first.focus(), 450);
    }
  };
  return (
    <section className="u-grain" style={{ background: "var(--paper)", padding: mob ? "120px 6vw 90px" : "180px 6vw 120px", minHeight: "100vh" }}>
      <Chapter title={<span>Sprechen wir.<br />Mit Daten, nicht Floskeln.</span>} copy="Wir antworten innerhalb von 48 Stunden — mit einer ersten Einschätzung, nicht mit einem Newsletter." style={{ marginBottom: mob ? 44 : 84 }} />
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 1.1fr) minmax(0, 0.9fr)", gap: mob ? 28 : 48, alignItems: "start" }}>
        <div ref={formRef} style={{ background: "var(--surface-raised)", borderRadius: "var(--r-card)", padding: mob ? "24px 22px" : "34px 36px", boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)" }}>
          {sent ? (
            <div style={{ padding: "30px 0", textAlign: "center" }}>
              <span style={{ display: "inline-flex", width: 64, height: 64, borderRadius: "50%", background: "var(--signal-soft)", color: "var(--signal-deep)", alignItems: "center", justifyContent: "center", font: "26px var(--font-mono)" }}>✓</span>
              <div style={{ font: "500 22px var(--font-display)", color: "var(--ink)", marginTop: 18 }}>Danke. Du hörst von uns.</div>
              <p style={{ margin: "10px 0 0", color: "var(--text-muted)", font: "400 15px var(--font-display)" }}>Innerhalb von 48 Stunden, mit Daten.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 18 : 24 }}>
                <Ink label="Name" placeholder="Vor- und Nachname" name="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
                <Ink label="E-Mail" placeholder="name@firma.at" type="email" name="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Selk label="Ich bin" options={["Bauträger:in", "Makler:in", "Eigentümer:in", "Käufer:in"]} value={rolle} onChange={(v) => setRolle(v && v.target ? v.target.value : v)} />
              <Ink label="Worum geht es?" placeholder="Projekt, Objekt oder Frage — ein Satz genügt" name="nachricht" value={msg} onChange={(e) => setMsg(e.target.value)} />
              <Chk label="Ich bin einverstanden, dass UNIO mich kontaktiert." checked={einverst} onChange={setEinverst} />
              <div>
                <Bk variant="signal" size="lg" knob disabled={!canSend || busy} onClick={send}>{busy ? "Wird gesendet …" : "Nachricht senden"}</Bk>
                <LeadError show={err} />
              </div>
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[["Demo buchen", "Live durch LENS und die Plattform — 30 Minuten.", "Demo anfragen"], ["Immobilie bewerten", "Kostenlos, datenbasiert, in 48 Stunden.", "Zur Bewertung ↗"], ["CIRCLE-Bewerbung", "Für Makler:innen mit Track-Record.", "Zur Makler-Seite"]].map(([t, p, cta], i) => (
            <div key={t} style={{ background: i === 0 ? "var(--signal)" : "var(--surface-raised)", color: i === 0 ? "#FFFFFF" : "var(--ink-2)", borderRadius: "var(--r-card)", padding: "24px 26px", boxShadow: i === 0 ? "var(--shadow-float)" : "inset 0 0 0 1px var(--hairline-dark)" }}>
              <div style={{ font: "500 19px var(--font-display)", letterSpacing: "-0.01em", color: i === 0 ? "#FFFFFF" : "var(--ink)" }}>{t}</div>
              <p style={{ margin: "8px 0 14px", font: "400 14px/1.55 var(--font-display)", color: i === 0 ? "rgba(255,245,239,0.9)" : "var(--text-muted)" }}>{p}</p>
              <Bk size="sm" variant={i === 0 ? "paper" : "ghost"} onClick={() => { if (i === 0) focusForm(true); if (i === 1) window.open(window.UNIO_BEWERTUNG_URL, "_blank"); if (i === 2) location.assign("makler.html"); }}>{cta}</Bk>
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
