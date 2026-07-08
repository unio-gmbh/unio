/* UNIO — Immobilien (Sie-Register): „Ich suche" + „Ich verkaufe". */
const {
  GlassPanel: GPi, Button: Bi, Input: Ini, Select: Seli,
} = window.UNIODesignSystem_b6216a;
const { SiteNav, SiteFooter, PageHero, Chapter, Reveal, PropCard, OBJEKT_DB } = window;

/* Ich suche — Immobiliensuche (Filterleiste + Ergebnis-Grid, wie app.unio.at/listing) */
function SucheIm() {
  const [q, setQ] = React.useState("");
  const [typ, setTyp] = React.useState("Alle");
  const [bezirk, setBezirk] = React.useState("Alle");
  const [preis, setPreis] = React.useState("Alle");
  const [hov, setHov] = React.useState(-1);
  const typen = ["Alle", "Penthouse", "Haus", "Wohnung", "Neubau"];
  const priceVal = (o) => { const m = (o.price || "").match(/([\d.,]+)\s*Mio/); if (m) return parseFloat(m[1].replace(".", "").replace(",", ".")) * 1e6; const n = (o.price || "").replace(/[^\d]/g, ""); return n ? +n : null; };
  const treffer = OBJEKT_DB.filter((o) => {
    if (q.trim() && !(o.q + " " + o.t + " " + o.loc).toLowerCase().includes(q.trim().toLowerCase())) return false;
    if (typ !== "Alle" && !(o.tags.join(" ") + " " + o.q).toLowerCase().includes(typ.toLowerCase())) return false;
    if (bezirk !== "Alle" && !o.loc.includes(bezirk.replace("Wien ", ""))) return false;
    if (preis !== "Alle") { const v = priceVal(o); if (v == null) return false; if (preis === "bis 1 Mio" && v > 1e6) return false; if (preis === "1–2 Mio" && (v < 1e6 || v > 2e6)) return false; if (preis === "ab 2 Mio" && v < 2e6) return false; }
    return true;
  });
  const selStyle = { appearance: "none", WebkitAppearance: "none", font: "500 14px var(--font-display)", padding: "11px 34px 11px 16px", borderRadius: "var(--r-pill)", border: "none", cursor: "pointer", background: "var(--surface-raised)", color: "var(--ink-2)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", outline: "none" };
  const wrapSel = (val, set, opts, label) => (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <select value={val} onChange={(e) => set(e.target.value)} style={selStyle}>
        {opts.map((o) => <option key={o} value={o}>{o === "Alle" ? label : o}</option>)}
      </select>
      <span aria-hidden="true" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", font: "11px var(--font-mono)", color: "var(--text-muted)", pointerEvents: "none" }}>▾</span>
    </span>
  );
  return (
    <section id="suche" className="u-grain" style={{ background: "var(--paper)", padding: "175px 6vw 175px" }}>
      <Chapter title={<span>Ich suche.</span>} copy="Der aktuelle UNIO-Bestand — jedes Objekt live und transparent vermarktet." style={{ marginBottom: 72 }} />
      {/* Suchfeld */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, maxWidth: 720, background: "var(--surface-raised)", borderRadius: "var(--r-pill)", padding: "8px 8px 8px 24px", boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)" }}>
        <span aria-hidden="true" style={{ font: "15px var(--font-mono)", color: "var(--text-muted)" }}>→</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Bezirk, Projekt oder Objektart"
          style={{ flex: 1, border: "none", outline: "none", background: "none", font: "400 16px var(--font-display)", color: "var(--ink-2)" }} />
        <Bi variant="signal" knob onClick={() => window.open(window.UNIO_SEARCH_URL, "_blank")}>Zur App</Bi>
      </div>
      {/* Filterleiste */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18, alignItems: "center" }}>
        {wrapSel(typ, setTyp, typen, "Objektart")}
        {wrapSel(bezirk, setBezirk, ["Alle", "1020", "1040", "1170", "Innenstadt", "Umland"], "Bezirk")}
        {wrapSel(preis, setPreis, ["Alle", "bis 1 Mio", "1–2 Mio", "ab 2 Mio"], "Preis")}
        {(typ !== "Alle" || bezirk !== "Alle" || preis !== "Alle" || q) && (
          <button onClick={() => { setQ(""); setTyp("Alle"); setBezirk("Alle"); setPreis("Alle"); }} style={{ background: "none", border: "none", cursor: "pointer", font: "500 13px var(--font-display)", color: "var(--signal-deep)", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 6 }}>Zurücksetzen ×</button>
        )}
        <span className="u-label" style={{ marginLeft: "auto", color: "var(--text-muted)", fontSize: 10 }}>{treffer.length} von {OBJEKT_DB.length} Objekten</span>
      </div>
      {/* Ergebnis-Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 28 }}>
        {treffer.map((o, i) => (
          <Reveal key={o.t} delay={(i % 3) * 70}>
            <PropCard o={o} hov={hov === i} onHov={(v) => setHov(v === false ? -1 : i)} />
          </Reveal>
        ))}
        {treffer.length === 0 && (
          <div style={{ gridColumn: "span 3", padding: "48px 0", textAlign: "center", color: "var(--text-muted)", font: "400 16px var(--font-display)" }}>
            Kein Treffer mit diesen Filtern — <button onClick={() => { setQ(""); setTyp("Alle"); setBezirk("Alle"); setPreis("Alle"); }} style={{ background: "none", border: "none", cursor: "pointer", font: "inherit", color: "var(--signal-deep)", textDecoration: "underline" }}>Filter zurücksetzen</button>
          </div>
        )}
      </div>
      <div style={{ marginTop: 32 }}>
        <Bi variant="ghost" onClick={() => window.open(window.UNIO_SEARCH_URL, "_blank")}>Alle Objekte in der App ansehen ↗</Bi>
      </div>
    </section>
  );
}

/* Ich verkaufe — sechs Nutzen */
const NUTZEN = [
  ["01", "Der richtige Preis", "Datenbasiert statt Bauchgefühl — Preisband aus echten Markt- und Nachfragedaten."],
  ["02", "Käufer, die passen", "Zielgruppen nach Milieu und Lebensphase — nicht nach Klick-Zufall."],
  ["03", "Verkauft, bevor es online geht", "Vorgemerkte Käufer-Community — auf Wunsch vollständig diskret."],
  ["04", "Vermarktung mit Wirkung", "Inszeniert statt nur inseriert — Story, Fotografie, Kampagne."],
  ["05", "Live-Transparenz", "Reichweite, Anfragen, Besichtigungen und Angebote in Echtzeit — Sie sehen alles."],
  ["06", "Sicher bis zum Notar", "Ein Ansprechpartner von der Bewertung bis zur Übergabe."],
];
function VerkaufenIm() {
  return (
    <section id="verkaufen" style={{ background: "var(--paper-2)", padding: "175px 6vw 175px" }} className="u-grain">
      <Chapter title={<span>Ich verkaufe.</span>} copy="Sechs Gründe, warum Eigentümer:innen mit UNIO verkaufen — jeder davon belegbar." style={{ marginBottom: 84 }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {NUTZEN.map(([n, t, p], i) => (
          <Reveal key={n} delay={(i % 3) * 90}>
            <div style={{ borderRadius: "var(--r-card)", padding: "26px 28px", background: "var(--surface-raised)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", minHeight: 200 }}>
              <span style={{ font: "13px var(--font-mono)", color: "var(--signal-deep)" }}>{n}</span>
              <div style={{ font: "500 20px/1.2 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 30 }}>{t}</div>
              <p style={{ margin: "10px 0 0", font: "400 14.5px/1.6 var(--font-display)", color: "var(--text-muted)" }}>{p}</p>
            </div>
          </Reveal>
        ))}
      </div>
      {/* Eigentümer-Sicht: Live-Transparenz als Datenpanel über Objektfoto */}
      <div style={{ position: "relative", borderRadius: "var(--r-panel)", overflow: "hidden", marginTop: 64, minHeight: 420 }}>
        <img src="../../assets/img/obenzwei.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(11,10,9,0.55), transparent 60%)" }}></div>
        <div style={{ position: "relative", padding: "clamp(28px, 4vw, 52px)", maxWidth: 480 }}>
          <GPi tone="dark" padding="26px 28px">
            <span className="u-label" style={{ color: "var(--text-inverse-muted)", fontSize: 10 }}>Ihre Sicht in LENS · live</span>
            {[["Reichweite", "48 200"], ["Anfragen", "27"], ["Besichtigungen", "9"], ["Angebote", "2", true]].map(([k, v, sig], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "11px 0", borderTop: i === 0 ? "none" : "1px solid var(--hairline-light)", marginTop: i === 0 ? 12 : 0 }}>
                <span className="u-label" style={{ color: "var(--text-inverse-muted)" }}>{k}</span>
                <span style={{ font: "16px var(--font-mono)", color: sig ? "var(--signal)" : "var(--text-inverse)" }}>{v}</span>
              </div>
            ))}
          </GPi>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
        <Bi variant="signal" size="lg" knob onClick={() => window.open(window.UNIO_BEWERTUNG_URL, "_blank")}>Immobilie kostenlos bewerten</Bi>
        <Bi variant="ghost" size="lg" onClick={() => location.assign("kontakt.html")}>Diskret verkaufen — Gespräch</Bi>
      </div>
    </section>
  );
}

function App() {
  return (
    <div style={{ fontFamily: "var(--font-display)" }}>
      <SiteNav active="immobilien.html" />
      <PageHero
        img="../../assets/img/penthouse.jpg"
        pos="center 40%"
        headline={<span>Suchen oder verkaufen</span>}
        sub="Kuratierte Objekte für Suchende. Volle Transparenz für Eigentümer:innen."
      >
        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <Bi size="lg" variant="paper" knob onClick={() => window.open(window.UNIO_BEWERTUNG_URL, "_blank")}>Immobilie bewerten</Bi>
          <Bi size="lg" variant="glass" tone="dark" onClick={() => (location.hash = "suche")}>Objekte ansehen</Bi>
        </div>
      </PageHero>
      <SucheIm />
      <VerkaufenIm />
      <SiteFooter />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
