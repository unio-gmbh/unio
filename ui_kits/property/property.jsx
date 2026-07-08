const {
  GlassPanel, DataOverlay, StatBlock, DataLabel,
  Button, IconButton, Chip, Tag,
} = window.UNIODesignSystem_b6216a;

const GALERIE = [
  { src: "../../assets/photos/hufhaus-front.jpg", label: "Ansicht Süd" },
  { src: "../../assets/photos/hufhaus-pool-abend.jpg", label: "Pool · Abend" },
  { src: "../../assets/photos/hufhaus-garten.jpg", label: "Garten" },
  { src: "../../assets/photos/hufhaus-hang.jpg", label: "Hanglage" },
  { src: "../../assets/photos/drohne-wienerwald.jpg", label: "Lage · Wienerwald" },
];

function Galerie({ idx, setIdx }) {
  return (
    <section data-screen-label="Galerie" style={{ position: "relative", height: "100vh", overflow: "hidden", background: "var(--ink)" }}>
      {GALERIE.map((g, i) => (
        <img
          key={g.src}
          src={g.src}
          alt={g.label}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: i === idx ? 1 : 0,
            transition: "opacity var(--dur-base) var(--ease-unio)",
          }}
        />
      ))}

      {/* Kopfzeile: Objekt-Tags (Nav liegt darüber) */}
      <div style={{ position: "absolute", top: 92, right: 32, display: "flex", gap: 8, zIndex: 40 }}>
        <Tag>Objekt 042</Tag>
        <Tag signal>Verfügbar</Tag>
      </div>

      {/* Galerie-Steuerung + Indikator */}
      <div style={{ position: "absolute", right: 32, bottom: 32, display: "flex", alignItems: "center", gap: 14 }}>
        <span className="u-label" style={{ color: "var(--text-inverse)", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>
          {String(idx + 1).padStart(2, "0")} / {String(GALERIE.length).padStart(2, "0")} — {GALERIE[idx].label}
        </span>
        <IconButton glyph="←" label="Zurück" onClick={() => setIdx((idx + GALERIE.length - 1) % GALERIE.length)} />
        <IconButton glyph="→" label="Weiter" onClick={() => setIdx((idx + 1) % GALERIE.length)} />
      </div>

      {/* Titel */}
      <div style={{ position: "absolute", left: 32, bottom: 32, color: "var(--text-inverse)", maxWidth: 700 }}>
        <DataLabel marker>1140 Wien · 48.1954° N, 16.2891° O</DataLabel>
        <h1 style={{ margin: "12px 0 0", font: "500 clamp(44px, 5vw, 84px)/0.98 var(--font-display)", letterSpacing: "-0.03em", textShadow: "0 2px 40px rgba(0,0,0,0.4)" }}>
          Refugium<br />am Waldrand
        </h1>
      </div>
    </section>
  );
}

function FaktenLeiste() {
  const [tags, setTags] = React.useState(["Waldrand"]);
  const toggle = (t) => setTags((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  return (
    <div data-screen-label="Faktenleiste" style={{ position: "sticky", top: 0, zIndex: 50, marginTop: "-96px", padding: "0 32px" }}>
      <GlassPanel tone="dark" padding="20px 28px" shadow style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 36, alignItems: "baseline" }}>
          <div>
            <span style={{ font: "500 30px var(--font-display)", letterSpacing: "-0.02em" }}>€ 2,4 Mio.</span>
            <div className="u-label" style={{ color: "var(--text-inverse-muted)", marginTop: 4 }}>Kaufpreis · 2 Häuser</div>
          </div>
          <div>
            <span style={{ font: "16px var(--font-mono)" }}>14 830 m²</span>
            <div className="u-label" style={{ color: "var(--text-inverse-muted)", marginTop: 4 }}>Grundfläche</div>
          </div>
          <div>
            <span style={{ font: "16px var(--font-mono)" }}>25 Min.</span>
            <div className="u-label" style={{ color: "var(--text-inverse-muted)", marginTop: 4 }}>ins Zentrum</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {["Waldrand", "Pool", "2 Häuser"].map((t) => (
            <Chip key={t} selected={tags.includes(t)} onToggle={() => toggle(t)}>{t}</Chip>
          ))}
          <Button variant="paper" knob>Besichtigung anfragen</Button>
        </div>
      </GlassPanel>
    </div>
  );
}

function Daten() {
  return (
    <section data-screen-label="Marktdaten" style={{ position: "relative", padding: "160px 32px 120px", background: "url(../../assets/photos/hufhaus-garten.jpg) center / cover" }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 380px) 1fr", gap: 48, alignItems: "start" }}>
        <DataOverlay
          variant="editorial"
          label="Marktlage 1140 Wien"
          animate
          metric={{ value: 94, label: "Nachfrage-Score", delta: "+12 %" }}
          rows={[
            { label: "Preis / m²", value: "6 240 €" },
            { label: "Vergleichsobjekte", value: "17" },
            { label: "Ø Abverkauf", value: "T+38", highlight: true },
          ]}
        />
        <div style={{ justifySelf: "end", maxWidth: 460, color: "var(--text-inverse)", textShadow: "0 2px 30px rgba(0,0,0,0.35)" }}>
          <h2 style={{ margin: 0, font: "500 clamp(32px, 3vw, 48px)/1.04 var(--font-display)", letterSpacing: "-0.03em" }}>
            Exklusives Refugium im 14. Bezirk.
          </h2>
          <p style={{ margin: "18px 0 0", font: "400 18px/1.6 var(--font-display)", color: "var(--text-inverse-muted)" }}>
            Zwei Häuser über dem Wiental, 14.830 m² Grund, Pool und eigener Waldzugang — und nur 25 Minuten ins Zentrum. Die Marktdaten links sind live; jede Zahl ist belegbar.
          </p>
        </div>
      </div>
    </section>
  );
}

function Anfrage() {
  const [sent, setSent] = React.useState(false);
  return (
    <section data-screen-label="Anfrage" className="u-grain" style={{ background: "var(--paper)", padding: "120px 32px 100px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, maxWidth: 1100, margin: "0 auto", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, font: "500 clamp(36px, 3.6vw, 60px)/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>
            Sprechen wir<br />über dieses Objekt.
          </h2>
          <p style={{ margin: "20px 0 0", color: "var(--text-muted)", maxWidth: 380 }}>
            Wir antworten innerhalb von zwei Stunden — mit Daten, nicht mit Floskeln.
          </p>
          <div style={{ marginTop: 32 }}>
            <StatBlock value="< 2 h" label="Antwortzeit · verbindlich" tone="light" size="40px" animate={false} />
          </div>
        </div>
        <GlassPanel tone="light" padding="var(--sp-6)" style={{ background: "var(--surface-raised)", backdropFilter: "none", WebkitBackdropFilter: "none", boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)" }} grain={false}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <DataLabel tone="light" marker>Anfrage übermittelt</DataLabel>
              <p style={{ margin: "14px 0 0", color: "var(--ink-2)" }}>Danke. Sie hören von uns — mit Zahlen.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <window.UNIODesignSystem_b6216a.Input label="Name" placeholder="Vor- und Nachname" />
              <window.UNIODesignSystem_b6216a.Input label="E-Mail" placeholder="name@firma.at" />
              <window.UNIODesignSystem_b6216a.Select label="Ich bin" options={["Käufer:in", "Eigentümer:in", "Makler:in"]} />
              <Button variant="signal" size="lg" knob onClick={() => setSent(true)}>Besichtigung anfragen</Button>
            </div>
          )}
        </GlassPanel>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 1100, margin: "96px auto 0", paddingTop: 24, borderTop: "1px solid var(--hairline-dark)" }}>
        <span className="u-label" style={{ color: "var(--text-muted)" }}>Objekt 042 · Arbeitsstand</span>
        <span className="u-label" style={{ color: "var(--text-muted)" }}>Antwort in &lt; 2 h</span>
      </div>
    </section>
  );
}

function App() {
  const [idx, setIdx] = React.useState(0);
  return (
    <div style={{ fontFamily: "var(--font-display)" }}>
      <window.SiteNav active="immobilien.html" cta={{ label: "Besichtigung", onClick: null }} />
      <Galerie idx={idx} setIdx={setIdx} />
      <FaktenLeiste />
      <Daten />
      <Anfrage />
      <window.SiteFooter />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
