const { GlassPanel, Button } = window.UNIODesignSystem_b6216a;

/* Serien-System nach Grid-Vorlage — warme Welt (Orange / Hellbraun / Creme).
   4:5-Kacheln (Design 540×675, Render 360×450). Kopfzeile = Mono-Label + ↘,
   Fußzeile = Wortmarke + Index. Dazwischen reine Video-Kacheln ohne Overlay. */

const M = 28;
const TERRA = "#B4633C";

function Tile({ label, nr, bg, plain = false, children }) {
  return (
    <div style={{ width: 360, height: 450, overflow: "hidden", borderRadius: 6, flex: "none" }}>
      <div className={plain ? "" : "u-grain"} style={{ width: 540, height: 675, transform: "scale(0.6667)", transformOrigin: "top left", position: "relative", background: bg || "var(--paper)", overflow: "hidden", fontFamily: "var(--font-display)" }}>
        {children}
        {!plain && (
          <div style={{ position: "absolute", top: 22, left: M, right: M, display: "flex", justifyContent: "space-between", alignItems: "baseline", mixBlendMode: "difference", color: "var(--paper)", pointerEvents: "none" }}>
            <span style={{ font: "10px var(--font-mono)", letterSpacing: "0.16em", textTransform: "uppercase" }}>{label}</span>
            <span style={{ font: "16px var(--font-mono)" }}>↘</span>
          </div>
        )}
        {!plain && (
          <div style={{ position: "absolute", bottom: 20, left: M, right: M, display: "flex", justifyContent: "space-between", alignItems: "baseline", mixBlendMode: "difference", color: "var(--paper)", pointerEvents: "none" }}>
            <span style={{ font: "500 15px var(--font-display)", letterSpacing: "0.08em" }}>UNIO</span>
            <span style={{ font: "10px var(--font-mono)", letterSpacing: "0.14em" }}>{nr}/09</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Foto({ src, pos, filter }) {
  return <img src={src} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: pos || "center", filter: filter || "none" }} />;
}

function Video({ src }) {
  return <video src={src} autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}></video>;
}

const H = { margin: 0, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 0.98 };
const glassWord = {
  display: "inline-block",
  padding: "2px 16px 6px",
  background: "rgba(60,30,12,0.35)",
  WebkitBackdropFilter: "blur(18px)",
  backdropFilter: "blur(18px)",
  boxShadow: "inset 0 0 0 1px var(--hairline-light)",
  borderRadius: 10,
};
const mono = (s, extra) => ({ font: `${s}px var(--font-mono)`, letterSpacing: "0.14em", textTransform: "uppercase", ...extra });

function App() {
  return (
    <div style={{ background: "var(--ink)", minHeight: "100vh", padding: "40px 48px 48px" }}>
      <div style={{ maxWidth: 1128, margin: "0 auto 24px", display: "flex", justifyContent: "space-between", color: "var(--text-inverse-muted)" }}>
        <span style={mono(11, { color: "var(--text-inverse)" })}>UNIO — Serie 01</span>
        <span style={mono(11)}>Betriebssystem · Immobilienvertrieb</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 360px)", gap: 24, justifyContent: "center" }}>

        {/* 01 — warmes Porträt + Big Type */}
        <Tile label="Makler · Mensch" nr="01">
          <Foto src="../../assets/photos/lifestyle-paar.jpg" pos="center 25%" filter="sepia(0.14) saturate(1.05)" />
          <div style={{ position: "absolute", left: M, right: M, bottom: 72, color: "var(--paper)", textShadow: "0 2px 24px rgba(40,16,4,0.4)" }}>
            <h2 style={{ ...H, fontSize: 52, fontWeight: 300 }}>Mehr als</h2>
            <h2 style={{ ...H, fontSize: 52, marginTop: 6 }}><span style={glassWord}>makeln.</span></h2>
          </div>
        </Tile>

        {/* 02 — Creme + Signal-Typo + Bildstreifen (Ref-Kachel 2) */}
        <Tile label="System" nr="02" bg="var(--paper)">
          <div style={{ position: "absolute", left: M, top: 64, color: "var(--signal)" }}>
            <h2 style={{ ...H, fontSize: 42 }}>Aus Rohdaten ↘</h2>
          </div>
          <div style={{ position: "absolute", left: M, right: M, top: 230, display: "flex", gap: 10 }}>
            {[
              ["../../assets/photos/interieur-wurzelholz.jpg", "Raum"],
              ["../../assets/photos/terrasse-golden.png", "Daten"],
              ["../../assets/photos/hufhaus-pool-abend.jpg", "Deal"],
            ].map(([src, cap]) => (
              <figure key={cap} style={{ margin: 0, flex: 1 }}>
                <img src={src} alt="" style={{ display: "block", width: "100%", height: 118, objectFit: "cover" }} />
                <figcaption style={{ ...mono(9), color: TERRA, marginTop: 8 }}>{cap}</figcaption>
              </figure>
            ))}
          </div>
          <div style={{ position: "absolute", right: M, bottom: 116, textAlign: "right", color: "var(--signal)" }}>
            <h2 style={{ ...H, fontSize: 42 }}>werden echte Deals.</h2>
          </div>
        </Tile>

        {/* 03 — Video pur (Objekt) */}
        <Tile nr="03" plain bg="var(--ink-2)">
          <Video src="../../assets/video/hufhaus.mp4" />
        </Tile>

        {/* 04 — Glaspanel-Karte mit Pill-CTA über warmem Interieur */}
        <Tile label="Case · Vertrieb" nr="04">
          <Foto src="../../assets/photos/interieur-esszimmer.jpg" filter="sepia(0.1) saturate(1.05)" />
          <div style={{ position: "absolute", left: M, right: M, top: 150 }}>
            <GlassPanel tone="light" blur={22} padding="26px 26px 22px" radius={18}>
              <h2 style={{ ...H, fontSize: 30, color: "var(--ink)" }}>Vertrieb ist mehr als inserieren.</h2>
              <p style={{ margin: "12px 0 18px", font: "400 13px/1.5 var(--font-display)", color: "var(--text-muted)" }}>
                Akquise, Daten, Marketing, Matching und Closing — in einer Oberfläche statt in fünf Ordnern.
              </p>
              <Button size="sm" variant="paper" knob="›">Case ansehen</Button>
            </GlassPanel>
          </div>
        </Tile>

        {/* 05 — Terra-Statement (Ref-Kachel 5) */}
        <Tile label="Transparenz" nr="05" bg={TERRA}>
          <div style={{ position: "absolute", left: M, right: M, top: 200, color: "var(--paper)" }}>
            <h2 style={{ ...H, fontSize: 62 }}>Schluss<br />mit<br />Blackbox.</h2>
          </div>
          <span style={{ position: "absolute", left: M, top: 118, font: "300 34px var(--font-display)", color: "rgba(244,241,235,0.75)" }}>20</span>
          <span style={{ position: "absolute", right: M, bottom: 110, font: "300 34px var(--font-display)", color: "rgba(244,241,235,0.75)" }}>26</span>
        </Tile>

        {/* 06 — Kreis + getracktes Wort (Ref-Kachel 6) */}
        <Tile label="AI im Hintergrund" nr="06" bg="var(--paper)">
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 340, height: 340, transform: "translate(-50%, -50%)", borderRadius: "50%", background: "radial-gradient(closest-side, var(--signal) 0%, rgba(232,101,29,0.72) 55%, rgba(232,71,29,0) 100%)" }}></div>
          <div style={{ position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-58%)", textAlign: "center" }}>
            <span style={{ font: "300 44px var(--font-display)", letterSpacing: "0.42em", marginLeft: "0.42em", color: "var(--paper)", mixBlendMode: "difference" }}>MATCHING</span>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 110, textAlign: "center" }}>
            <span style={mono(10, { color: TERRA })}>Passende Käufer zuerst · 1 : 9 statt 1 : 200</span>
          </div>
        </Tile>

        {/* 07 — Video pur (Riffel-Transition) */}
        <Tile nr="07" plain bg="var(--ink-2)">
          <Video src="../../assets/video/transition-riffel-a.mp4" />
        </Tile>

        {/* 08 — Datenpanel über goldener Terrasse */}
        <Tile label="Echte Daten" nr="08">
          <Foto src="../../assets/photos/terrasse-golden.png" pos="center 70%" />
          <div style={{ position: "absolute", left: M, right: M, top: 70, bottom: 70, background: "rgba(46,22,8,0.45)", WebkitBackdropFilter: "blur(24px)", backdropFilter: "blur(24px)", borderRadius: 8, boxShadow: "inset 0 0 0 1px var(--hairline-light)", color: "var(--paper)", padding: "28px 28px 24px", display: "flex", flexDirection: "column" }}>
            <span style={mono(10, { color: "rgba(244,241,235,0.7)" })}><span style={{ display: "inline-block", width: 8, height: 8, background: "var(--signal)", marginRight: 10 }}></span>Nachfrage-Score · 1020 Wien</span>
            <div style={{ font: "500 110px/1 var(--font-display)", letterSpacing: "-0.04em", marginTop: 18 }}>94</div>
            <div style={{ borderTop: "1px solid var(--hairline-light)", marginTop: "auto", paddingTop: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <span style={mono(9, { color: "rgba(244,241,235,0.7)" })}>Preis / m²</span>
                <div style={{ font: "20px var(--font-mono)", marginTop: 6 }}>6 240 €</div>
              </div>
              <div>
                <span style={mono(9, { color: "rgba(244,241,235,0.7)" })}>Ø Abverkauf</span>
                <div style={{ font: "20px var(--font-mono)", marginTop: 6, color: "var(--signal)" }}>T+38</div>
              </div>
            </div>
          </div>
        </Tile>

        {/* 09 — Video pur (Riffel-Transition B) */}
        <Tile nr="09" plain bg="var(--ink-2)">
          <Video src="../../assets/video/transition-riffel-b.mp4" />
        </Tile>
      </div>

      <div style={{ maxWidth: 1128, margin: "24px auto 0", display: "flex", justifyContent: "space-between", color: "var(--text-inverse-muted)" }}>
        <span style={mono(11)}>01–09 · Feed-System 4:5 · Video-Kacheln ohne Overlay</span>
        <span style={mono(11)}>Wien · 2026 · Arbeitsstand</span>
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
