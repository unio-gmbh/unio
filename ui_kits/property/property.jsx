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

function FaktenLeiste({ onAngebot }) {
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
          <Button variant="signal" knob onClick={onAngebot}>Angebot legen</Button>
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


/* ===== Angebot legen — Slide-in-Drawer von rechts =====
   Unverbindliche Angebotsabgabe: Summe (mit Presets), Finanzierung, Kontakt.
   Demo-UI: Absenden zeigt den Bestaetigungszustand, kein Backend-Call. */
const ANGEBOT_PRESETS = [["Kaufpreis", 2400000], ["−2 %", 2352000], ["−5 %", 2280000]];
const eur = (n) => "€ " + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function AngebotDrawer({ offen, onClose }) {
  const [summe, setSumme] = React.useState(2400000);
  const [fin, setFin] = React.useState("Finanzierung mit Zusage");
  const [sent, setSent] = React.useState(false);
  React.useEffect(() => {
    if (!offen) return;
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", esc);
    document.documentElement.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); document.documentElement.style.overflow = ""; };
  }, [offen]);
  const setDigits = (v) => { const d = parseInt(String(v).replace(/\D/g, ""), 10); setSumme(isNaN(d) ? 0 : d); };
  return (
    <div aria-hidden={!offen} style={{ position: "fixed", inset: 0, zIndex: 90, pointerEvents: offen ? "auto" : "none" }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(11,10,9,0.45)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", opacity: offen ? 1 : 0, transition: "opacity 400ms var(--ease-unio)" }}></div>
      {/* Panel */}
      <aside role="dialog" aria-modal="true" aria-label="Kaufangebot legen" className="u-grain" style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: "min(460px, 100vw)",
        background: "var(--paper)", boxShadow: "-30px 0 80px -30px rgba(11,10,9,0.5)",
        transform: offen ? "translateX(0)" : "translateX(105%)", transition: "transform 520ms var(--ease-unio)",
        display: "flex", flexDirection: "column", overflowY: "auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 26px", borderBottom: "1px solid var(--hairline-dark)" }}>
          <DataLabel tone="light" marker>Objekt 042 · Refugium am Waldrand</DataLabel>
          <IconButton glyph="✕" label="Schließen" onClick={onClose} />
        </div>
        {sent ? (
          <div style={{ padding: "48px 30px", textAlign: "center", display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
            <span style={{ display: "inline-flex", width: 58, height: 58, borderRadius: "50%", background: "var(--signal-soft)", color: "var(--signal-deep)", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m4 10.5 4 4 8-9"></path></svg>
            </span>
            <h3 style={{ margin: 0, font: "500 26px/1.15 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Angebot übermittelt.</h3>
            <p style={{ margin: 0, font: "400 15px/1.6 var(--font-display)", color: "var(--text-muted)", maxWidth: 320 }}>
              Dein Angebot über <strong style={{ color: "var(--ink)" }}>{eur(summe)}</strong> ist bei uns. Wir melden uns zur Bestätigung, mit Daten, nicht mit Floskeln.
            </p>
            <span className="u-label" style={{ color: "var(--text-muted)", marginTop: 6 }}>Antwort in &lt; 2 h · Unverbindlich</span>
            <Button variant="ghost" onClick={onClose} style={{ marginTop: 8 }}>Zurück zum Objekt</Button>
          </div>
        ) : (
          <div style={{ padding: "26px 26px 30px", display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <h3 style={{ margin: 0, font: "500 28px/1.1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Angebot legen<span style={{ color: "var(--signal)" }}>.</span></h3>
              <p style={{ margin: "10px 0 0", font: "400 14px/1.6 var(--font-display)", color: "var(--text-muted)" }}>
                Unverbindlich: Du signalisierst dein Angebot, wir stimmen alles Weitere persönlich mit dir ab.
              </p>
            </div>
            <div>
              <span className="u-label" style={{ display: "block", fontSize: 10, color: "var(--text-muted)", marginBottom: 8 }}>DEIN ANGEBOT</span>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, background: "var(--surface-raised)", borderRadius: 14, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", padding: "14px 18px" }}>
                <input value={eur(summe)} onChange={(e) => setDigits(e.target.value)} inputMode="numeric" aria-label="Angebotssumme in Euro"
                  style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", font: "500 26px var(--font-mono)", letterSpacing: "-0.01em", color: "var(--ink)" }} />
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                {ANGEBOT_PRESETS.map(([l, v]) => (
                  <button key={l} type="button" onClick={() => setSumme(v)} style={{
                    font: "500 12.5px var(--font-display)", fontFamily: "inherit", cursor: "pointer", padding: "8px 14px",
                    borderRadius: "var(--r-pill)", border: "none",
                    background: summe === v ? "var(--ink)" : "transparent",
                    color: summe === v ? "var(--paper)" : "var(--text-muted)",
                    boxShadow: summe === v ? "none" : "inset 0 0 0 1px var(--hairline-dark)",
                    transition: "all var(--dur-fast) var(--ease-unio)",
                  }}>{l}</button>
                ))}
              </div>
              <div className="u-label" style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 10 }}>
                Kaufpreis {eur(2400000)} · Abweichung {summe >= 2400000 ? "+" : "−"}{Math.abs(Math.round((summe / 2400000 - 1) * 1000) / 10).toLocaleString("de-AT")} %
              </div>
            </div>
            <window.UNIODesignSystem_b6216a.Select label="Finanzierung" options={["Finanzierung mit Zusage", "Eigenkapital", "Finanzierung in Klärung"]} value={fin} onChange={(v) => setFin(v && v.target ? v.target.value : v)} />
            <window.UNIODesignSystem_b6216a.Input label="Name" placeholder="Vor- und Nachname" />
            <window.UNIODesignSystem_b6216a.Input label="E-Mail" placeholder="name@firma.at" />
            <Button variant="signal" size="lg" knob onClick={() => setSent(true)}>Angebot übermitteln</Button>
            <p style={{ margin: 0, font: "400 12px/1.6 var(--font-display)", color: "var(--text-muted)" }}>
              Kein rechtsverbindliches Kaufanbot: Die Abgabe signalisiert dein Interesse, alles Rechtliche passiert danach, gemeinsam und dokumentiert.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}

function App() {
  const [idx, setIdx] = React.useState(0);
  const [angebot, setAngebot] = React.useState(false);
  return (
    <div style={{ fontFamily: "var(--font-display)" }}>
      <window.SiteNav active="immobilien.html" cta={{ label: "Besichtigung", onClick: null }} />
      <Galerie idx={idx} setIdx={setIdx} />
      <FaktenLeiste onAngebot={() => setAngebot(true)} />
      <Daten />
      <Anfrage />
      <AngebotDrawer offen={angebot} onClose={() => setAngebot(false)} />
      <window.SiteFooter />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
