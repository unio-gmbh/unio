/* UNIO — Story v2 (Korrektur-Briefing 05.07.): ein oranger Punkt als roter Faden.
   Sequenz: 01 Ursprung (Hero) · 02 Erkenntnis (5 Seiten, horizontal) · 03 Fusion (Sankey)
   · 04 Warum·Wie·Was (Golden Circle) · 05 Menschen · 06 Roadmap (horizontal) · 07 Finale.
   Hinweis: der Faden nutzt var(--signal) #FFAA09 (System-Akzent) statt des Briefing-Hex
   #E96F2B, damit EIN Orange über die ganze Website konsistent bleibt. */
const { GlassPanel: GPs, Button: Bs, FlutedGlass: FGs } = window.UNIODesignSystem_b6216a;
const { SiteNav, SiteFooter, Chapter, Reveal, usePinProgress, UIMiniLens, U_RM: RMs, SignalRaster: SRs } = window;
const stC = (v) => Math.min(1, Math.max(0, v));

/* Kapitel-Marker mit vertikaler Hairline */
function KapSt({ nr, label, dark = false }) {
  return (
    <div aria-hidden="true" className="u-kap" style={{ position: "absolute", left: "2.4vw", top: 96, zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <span style={{ font: "11px var(--font-mono)", color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)" }}>{nr}</span>
      <span style={{ width: 1, height: 54, background: dark ? "var(--hairline-light)" : "var(--hairline-dark)" }}></span>
      <span className="u-label" style={{ fontSize: 8, color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)", writingMode: "vertical-rl" }}>{label}</span>
    </div>
  );
}
const stackCard = (z, bg) => ({ position: "relative", zIndex: z, background: bg, borderRadius: "28px 28px 0 0", marginTop: -28, boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)" });

/* ===== 01 · URSPRUNG (Hero) — die Riffelung klärt sich wortlos ===== */
function HeroSt() {
  const [t, setT] = React.useState(RMs ? 99999 : 0);
  React.useEffect(() => {
    if (RMs) return;
    const t0 = performance.now();
    let raf;
    const tick = (now) => { const el = now - t0; setT(el); if (el < 2800) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const reveal = RMs ? 1 : stC((t - 700) / 1600);
  const mob = window.useMobile();
  return (
    <section id="top" data-screen-label="Hero" style={{ position: mob ? "relative" : "sticky", top: 0, zIndex: 0, background: "var(--paper)", padding: mob ? "82px 14px 0" : "98px 40px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 52fr) minmax(0, 48fr)", minHeight: mob ? "auto" : "calc(100svh - 120px)", borderRadius: mob ? 18 : 22, overflow: "hidden", border: "0.5px solid var(--hairline-dark)", boxShadow: "0 1px 0 rgba(255,255,255,.6) inset" }}>
        <div className="u-grain" style={{ position: "relative", overflow: "hidden", background: "var(--paper)", display: "flex", flexDirection: "column", justifyContent: "center", padding: mob ? "56px 24px 44px" : "185px 4vw 120px 7vw" }}>
          <h1 style={{ margin: 0, font: `500 ${mob ? "clamp(30px, 8.2vw, 40px)" : "clamp(40px, 4.4vw, 76px)"}/1.05 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>
            Der Markt war eine Blackbox.<br />Also bauten wir<br />Klarheit<span style={{ color: "var(--signal)" }}>.</span>
          </h1>
          <p className="u-label" style={{ margin: "26px 0 0", color: "var(--text-muted)" }}>Die Geschichte hinter UNIO · Wien</p>
          <p style={{ margin: "18px 0 0", font: `400 ${mob ? 15.5 : 17}px/1.6 var(--font-display)`, color: "var(--text-muted)", maxWidth: 420 }}>
            Vertrieb, Marketing und Technologie haben einander jahrelang zugearbeitet. 2026 wurden sie ein Unternehmen.
          </p>
        </div>
        <div style={{ position: "relative", overflow: "hidden", background: "var(--paper-3)", minHeight: mob ? 340 : undefined }}>
          <img src="../../assets/img/vienna-facade.jpg" alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "sepia(0.5) saturate(0.7)", opacity: 1 - reveal * 0.9, transition: "opacity 300ms linear" }} />
          <FGs reveal={reveal} side="left" strength={13} style={{ position: "absolute", inset: 0 }}>
            <img src="../../assets/img/albrecht.jpg" alt="Das Albrecht — Gegenwart" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          </FGs>
          <span className="u-label" style={{ position: "absolute", left: 20, bottom: 16, fontSize: 9, color: "var(--text-inverse)", textShadow: "0 1px 10px rgba(0,0,0,0.6)" }}>{reveal > 0.85 ? "Gegenwart · Das Albrecht" : "Herkunft"}</span>
        </div>
      </div>
    </section>
  );
}

/* ===== 02 · ERKENNTNIS — fünf Perspektiven als gepinnte Horizontal-Strecke ===== */
const PERSPEKT = [
  ["01", "Der Eigentümer", "inseriert und hört monatelang — nichts."],
  ["02", "Die Maklerin", "verwaltet Papier, statt Menschen zu beraten."],
  ["03", "Der Bauträger", "baut auf Hoffnung, weil der Markt erst nach dem Baustart antwortet."],
  ["04", "Der Käufer", "vergleicht Inserate statt Wahrheiten."],
  ["05", "Der Vermarkter", "schaltet Kampagnen in eine Blackbox."],
];
function ErkenntnisSt() {
  const [ref, p] = usePinProgress();
  const n = PERSPEKT.length;
  // Track fährt über 0–0.82 durch; danach kurzer Halt
  const shift = stC(p / 0.86) * (n - 1);
  if (RMs) {
    return (
      <section data-screen-label="Erkenntnis" className="u-grain" style={{ ...stackCard(3, "var(--paper)"), padding: "185px 7vw" }}>
        <KapSt nr="02" label="Erkenntnis" />
        <h2 style={{ margin: "0 0 48px", font: "500 clamp(30px, 3.2vw, 52px)/1.08 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", maxWidth: 880 }}>
          Wir kannten dieselben Probleme<br /><span style={{ color: "var(--text-muted)" }}>von fünf verschiedenen Seiten.</span>
        </h2>
        {PERSPEKT.map(([nr, wer, was]) => (
          <div key={nr} style={{ display: "grid", gridTemplateColumns: "52px 220px 1fr", gap: 24, padding: "34px 0", borderTop: "1px solid var(--hairline-dark)", alignItems: "baseline" }}>
            <span style={{ font: "13px var(--font-mono)", color: "var(--signal-deep)" }}>{nr}</span>
            <span style={{ font: "500 19px var(--font-display)", color: "var(--ink)" }}>{wer}</span>
            <span style={{ font: "400 16px/1.6 var(--font-display)", color: "var(--text-muted)" }}>{was}</span>
          </div>
        ))}
        <p style={{ margin: "64px 0 0", font: "500 clamp(20px, 2vw, 30px)/1.4 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", maxWidth: 720 }}>
          <span aria-hidden="true" style={{ display: "inline-block", width: 11, height: 11, borderRadius: "50%", background: "var(--signal)", marginRight: 14 }}></span>
          Einzeln lindert man Symptome. Gemeinsam baut man ein System. Also taten wir, was in dieser Branche niemand tut: Wir haben fusioniert.
        </p>
      </section>
    );
  }
  return (
    <section ref={ref} data-screen-label="Erkenntnis" style={{ height: "340vh", ...stackCard(3, "var(--paper)") }}>
      <div className="u-grain" style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden" }}>
        <KapSt nr="02" label="Erkenntnis" />
        <div style={{ position: "absolute", left: "7vw", top: "13vh", right: "7vw", zIndex: 4 }}>
          <h2 style={{ margin: 0, font: "500 clamp(26px, 2.8vw, 44px)/1.08 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)", maxWidth: 620 }}>
            Wir kannten dieselben Probleme<br /><span style={{ color: "var(--text-muted)" }}>von fünf verschiedenen Seiten.</span>
          </h2>
        </div>
        {/* horizontaler Track */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", width: n * 100 + "%", transform: `translateX(${-(shift / n) * 100}%)` }}>
          {PERSPEKT.map(([nr, wer, was]) => (
            <div key={nr} style={{ width: (100 / n) + "%", flex: "none", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 7vw" }}>
              <span aria-hidden="true" style={{ position: "absolute", left: "5vw", top: "22%", font: "500 clamp(180px, 34vw, 460px)/0.8 var(--font-display)", letterSpacing: "-0.05em", color: "rgba(11,10,9,0.06)", pointerEvents: "none", userSelect: "none" }}>{nr}</span>
              <div style={{ position: "relative", maxWidth: 560 }}>
                <span style={{ font: "13px var(--font-mono)", color: "var(--signal-deep)" }}>{nr} / 05</span>
                <h3 style={{ margin: "18px 0 0", font: "500 clamp(34px, 4.6vw, 76px)/1.02 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>{wer}</h3>
                <p style={{ margin: "20px 0 0", font: "400 clamp(17px, 1.7vw, 24px)/1.5 var(--font-display)", color: "var(--text-muted)", maxWidth: 440 }}>{was}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Fortschritts-Punkte */}
        <div style={{ position: "absolute", left: "7vw", bottom: "9vh", display: "flex", gap: 8 }}>
          {PERSPEKT.map((_, i) => (
            <span key={i} style={{ width: i === Math.round(shift) ? 22 : 7, height: 7, borderRadius: 4, background: i === Math.round(shift) ? "var(--signal)" : "var(--hairline-dark)", transition: "all 300ms var(--ease-unio)" }}></span>
          ))}
        </div>
      </div>
    </section>
  );
}
/* orange Statement nach der Strecke — allein auf viel Weißraum */
function StatementSt() {
  const [ref, p] = usePinProgress();
  const words = "Einzeln lindert man Symptome. Gemeinsam baut man ein System. Also taten wir, was in dieser Branche niemand tut: Wir haben fusioniert.".split(" ");
  const lit = RMs ? words.length : Math.round(stC(p / 0.82) * words.length);
  if (RMs) {
    return (
      <section data-screen-label="Statement" className="u-grain" style={{ ...stackCard(3, "var(--paper)"), padding: "150px 7vw 170px" }}>
        <p style={{ margin: "0 auto", font: "500 clamp(24px, 3vw, 46px)/1.32 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", maxWidth: 920, textAlign: "center" }}>{words.join(" ")}</p>
      </section>
    );
  }
  return (
    <section ref={ref} data-screen-label="Statement" style={{ height: "300vh", ...stackCard(3, "var(--paper)") }}>
      <div className="u-grain" style={{ position: "sticky", top: 0, height: "100svh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8vw" }}>
        <p style={{ margin: 0, font: "500 clamp(28px, 3.4vw, 56px)/1.3 var(--font-display)", letterSpacing: "-0.02em", maxWidth: 1000, textAlign: "center" }}>
          {words.map((w, i) => (
            <span key={i} style={{ color: i < lit ? "var(--ink)" : "rgba(11,10,9,0.16)", transition: "color 300ms var(--ease-unio)" }}>{w}{i < words.length - 1 ? " " : ""}</span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ===== 03 · FÜNF UNTERNEHMEN, EINE MISSION — Fusions-Fluss (ohne Trattner) ===== */
const FIRMEN = [["Boom Living", 0], ["Ad Boutique", 1], ["appworks", 2], ["marlin", 2], ["DCS", 2]];
const KNOTEN = ["Vertrieb", "Marketing", "Technologie & Automation"];
const DISZ_KARTEN = [
  ["Vertrieb", "BOOM LIVING", "Jahrzehnte Wiener Abschlusserfahrung — Menschen, die Märkte lesen und Deals schließen."],
  ["Marketing", "Ad Boutique", "Kampagnen, Stories und Performance für Immobilien — 1 Mrd. Impressionen über Kampagnen."],
  ["Technologie & Automation", "appworks · marlin · Digital Contract Solutions", "Software, Daten und digitale Verträge — das Betriebssystem unter allem."],
];
function FusionFlow() {
  const ref = React.useRef(null);
  const [fp, setFp] = React.useState(RMs ? 1 : 0);
  React.useEffect(() => {
    if (RMs) return;
    const on = () => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      setFp(stC((innerHeight * 0.88 - r.top) / (r.height * 0.85)));
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  const seg = (a, b) => stC((fp - a) / (b - a));
  const l1 = seg(0.08, 0.45), l2 = seg(0.45, 0.75), fin = fp > 0.82;
  const srcY = (i) => 72 + i * 64;
  const nodeY = (i) => 96 + i * 104;
  const draw = (k, len) => ({ strokeDasharray: len, strokeDashoffset: (1 - k) * len });
  const mob = window.useMobile();
  return (
    <section data-screen-label="Fusion" className="u-grain" style={{ ...stackCard(4, "var(--paper-2)"), padding: mob ? "96px 6vw 110px" : "150px 7vw 175px" }}>
      <KapSt nr="03" label="Fusion" />
      <Chapter title={<span>Fünf Unternehmen.<br />Eine Mission.</span>} copy="2026 — Die Fusion: Drei Disziplinen verschmelzen zu einer Kategorie, die es so nicht gab." style={{ marginBottom: mob ? 44 : 76 }} />
      <div ref={ref} style={{ position: "relative", overflowX: mob ? "auto" : "visible", WebkitOverflowScrolling: "touch" }}>
        <span aria-hidden="true" style={{ position: "absolute", right: "4%", top: "8%", font: "500 clamp(120px, 20vw, 300px)/0.8 var(--font-display)", letterSpacing: "-0.05em", color: "rgba(255,170,9,0.07)", pointerEvents: "none", userSelect: "none" }}>1</span>
        <svg viewBox="0 0 800 400" style={{ width: "100%", minWidth: mob ? 620 : 0, display: "block", overflow: "visible", position: "relative" }} aria-label="Fusions-Fluss: fünf Unternehmen fließen in drei Disziplinen und weiter in UNIO">
          {FIRMEN.map(([f, k], i) => (
            <g key={f}>
              <line x1="150" y1={srcY(i)} x2="400" y2={nodeY(k)} stroke="var(--hairline-dark)" strokeWidth="1.2" style={draw(stC(l1 * 1.35 - i * 0.07), 320)} />
              {f === "Ad Boutique" && (
                <line x1="150" y1={srcY(i)} x2="400" y2={nodeY(0)} stroke="var(--hairline-dark)" strokeWidth="1.2" style={draw(stC(l1 * 1.35 - i * 0.07), 320)} />
              )}
              <circle cx="150" cy={srcY(i)} r="4.5" fill="var(--ink)" opacity={0.2 + 0.8 * stC(l1 * 2 - i * 0.1)} />
              <text x="136" y={srcY(i) + 4} textAnchor="end" style={{ font: "10.5px var(--font-mono)", letterSpacing: "0.06em", fill: "var(--ink-2)" }}>{f}</text>
            </g>
          ))}
          {KNOTEN.map((nm, i) => (
            <g key={nm}>
              <line x1="400" y1={nodeY(i)} x2="700" y2="200" stroke="var(--hairline-dark)" strokeWidth="1.2" style={draw(stC(l2 * 1.3 - i * 0.1), 330)} />
              <circle cx="400" cy={nodeY(i)} r="6" fill="none" stroke="var(--ink)" strokeWidth="1.5" opacity={0.25 + 0.75 * stC(l1 * 1.6 - 0.4)} />
              <text x="400" y={nodeY(i) - 16} textAnchor="middle" style={{ font: "10.5px var(--font-mono)", letterSpacing: "0.1em", fill: "var(--ink)", textTransform: "uppercase", opacity: 0.3 + 0.7 * l1 }}>{nm}</text>
            </g>
          ))}
          <circle cx="700" cy="200" r={fin ? 11 : 5} fill="var(--signal)" style={{ transition: "r 400ms var(--ease-unio)" }} />
          <text x="700" y="238" textAnchor="middle" style={{ font: "12px var(--font-mono)", letterSpacing: "0.14em", fill: "var(--signal-deep)", opacity: fin ? 1 : 0, transition: "opacity 400ms" }}>UNIO · 2026</text>
        </svg>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: mob ? 14 : 24, marginTop: mob ? 44 : 80 }}>
        {DISZ_KARTEN.map(([t, firms, ptxt], i) => (
          <Reveal key={t} delay={i * 100}>
            <div style={{ background: "var(--surface-raised)", borderRadius: "var(--r-card)", padding: "26px 28px 24px", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", minHeight: 210 }}>
              <span style={{ font: "11px var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--signal-deep)" }}>{firms}</span>
              <div style={{ font: "500 22px/1.15 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 34 }}>{t}</div>
              <p style={{ margin: "10px 0 0", font: "400 14px/1.6 var(--font-display)", color: "var(--text-muted)" }}>{ptxt}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ===== 04 · WARUM · WIE · WAS — Golden Circle (Ring-Labels, Zentrum nur Punkt) ===== */
const HOW_LABELS = ["Raum", "Technologie", "Mensch"];
const WHAT_CHIPS = ["NOVA", "LEAD ENGINE", "CIRCLE", "LENS"];
const CIRCLE_COPY = [
  ["WARUM", "Der Markt ist eine Blackbox. Menschen verdienen Klarheit.", "Die Überzeugung hinter der Fusion — und der Maßstab für jede Entscheidung seither."],
  ["WIE", "Raum · Technologie · Mensch.", "Drei Disziplinen, die einander brauchen — keine funktioniert allein."],
  ["WAS", "Ein Betriebssystem für Immobilienvertrieb.", "NOVA, LEAD ENGINE, CIRCLE und LENS — vier Module, ein System. Live in LENS."],
];
function GoldenCircle() {
  const [ref, p] = usePinProgress();
  const mob = window.useMobile();
  const seg = (a, b) => stC((p - a) / (b - a));
  const r1 = seg(0.04, 0.3), r2 = seg(0.32, 0.58), r3 = seg(0.6, 0.88);
  const R = [74, 128, 182];
  const pos = (r, deg) => { const a = (deg * Math.PI) / 180; return [210 + r * Math.cos(a), 210 + r * Math.sin(a)]; };
  const ring = (r, k) => { const C = 2 * Math.PI * r; return <circle cx="210" cy="210" r={r} fill="none" stroke="var(--ink-3)" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray={C} strokeDashoffset={(1 - k) * C} transform="rotate(-90 210 210)" strokeLinecap="round" />; };
  const active = p < 0.32 ? 0 : p < 0.6 ? 1 : 2;
  const copy = CIRCLE_COPY[active];
  const ringLabel = (txt, r, k) => {
    const [x, y] = pos(r, -90);
    return <span className="u-label" style={{ position: "absolute", left: (x / 420) * 100 + "%", top: (y / 420) * 100 + "%", transform: "translate(-50%, -50%)", fontSize: 10, padding: "5px 12px", borderRadius: "var(--r-pill)", background: "var(--paper)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: k > 0.5 ? "var(--signal-deep)" : "var(--text-muted)", opacity: k > 0.2 ? 1 : 0, transition: "all 400ms var(--ease-unio)", whiteSpace: "nowrap" }}>{txt}</span>;
  };
  return (
    <section ref={ref} data-screen-label="Warum" style={{ height: "260vh", ...stackCard(5, "var(--paper-2)") }}>
      <div className="u-grain" style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden", display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 1.1fr) minmax(0, 0.9fr)", alignItems: "center", alignContent: mob ? "center" : undefined, padding: mob ? "80px 6vw 30px" : "0 6vw", gap: mob ? 20 : 24 }}>
        <KapSt nr="04" label="Warum · Wie · Was" />
        <div style={{ position: "relative", width: mob ? "min(78vw, 42svh)" : "min(100%, 62svh)", aspectRatio: "1", margin: "0 auto" }}>
          <svg viewBox="0 0 420 420" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }} aria-hidden="true">
            {ring(R[0], r1)}{ring(R[1], r2)}{ring(R[2], r3)}
          </svg>
          {/* Zentrum: nur der orange Punkt (der Faden) */}
          <span style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%, -50%) scale(${0.6 + 0.4 * r1})`, width: 18, height: 18, borderRadius: "50%", background: "var(--signal)", boxShadow: "0 0 0 6px var(--signal-soft)", animation: RMs ? "none" : "uPulse 2.4s var(--ease-unio) infinite" }}></span>
          {/* Ring-Labels WARUM / WIE / WAS */}
          {ringLabel("Warum", R[0], r1)}
          {ringLabel("Wie", R[1], r2)}
          {ringLabel("Was", R[2], r3)}
          {/* WIE-Sublabels auf Ring 2 */}
          {HOW_LABELS.map((l, i) => {
            const [x, y] = pos(R[1], -30 + i * 120);
            const on = r2 > (i + 1) / 3.6;
            return <span key={l} className="u-label" style={{ position: "absolute", left: (x / 420) * 100 + "%", top: (y / 420) * 100 + "%", transform: "translate(-50%, -50%)", fontSize: 10, padding: "6px 12px", borderRadius: "var(--r-pill)", background: "var(--paper)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--ink-2)", opacity: on ? 1 : 0, transition: "opacity 400ms var(--ease-unio)", whiteSpace: "nowrap" }}>{l}</span>;
          })}
          {/* WAS-Module auf Ring 3, LENS mit Miniatur */}
          {WHAT_CHIPS.map((c, i) => {
            const deg = -90 + i * 90 + 45;
            const [x, y] = pos(R[2], deg);
            const on = r3 > (i + 1) / 5;
            const isLens = c === "LENS";
            return (
              <div key={c} style={{ position: "absolute", left: (x / 420) * 100 + "%", top: (y / 420) * 100 + "%", transform: "translate(-50%, -50%)", opacity: on ? 1 : 0, transition: "opacity 400ms var(--ease-unio)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <span className="u-label" style={{ fontSize: 9, padding: "6px 12px", borderRadius: "var(--r-pill)", background: isLens ? "var(--signal)" : "var(--paper)", color: isLens ? "#FFF" : "var(--ink-2)", boxShadow: isLens ? "none" : "inset 0 0 0 1px var(--hairline-dark)", whiteSpace: "nowrap" }}>{c}</span>
                {isLens && on && <UIMiniLens width={150} play={on} />}
              </div>
            );
          })}
        </div>
        {/* Copy rechts, vertikal mittig, wechselt pro Ring */}
        <div style={{ alignSelf: "center", textAlign: mob ? "center" : "left" }}>
          <span style={{ font: "12px var(--font-mono)", letterSpacing: "0.18em", color: "var(--signal-deep)" }}>{copy[0]}</span>
          <h2 style={{ margin: "14px 0 0", font: `500 ${mob ? "clamp(21px, 5.8vw, 27px)" : "clamp(28px, 2.8vw, 46px)"}/1.1 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)", minHeight: "2.2em" }}>{copy[1]}</h2>
          <p style={{ margin: "16px 0 0", font: `400 ${mob ? 14 : 16}px/1.6 var(--font-display)`, color: "var(--text-muted)", maxWidth: 380, marginLeft: mob ? "auto" : 0, marginRight: mob ? "auto" : 0 }}>{copy[2]}</p>
        </div>
      </div>
    </section>
  );
}

/* ===== 05 · DIE MENSCHEN DAHINTER ===== */
const TEAM_PORTRAITS = [
  { src: "../../assets/team/portrait-01.jpg", pos: "center 22%", nm: "Jacob Kapsch", role: "Founder", disz: "Marketing", v: "1 Mrd.", label: "Impressionen · Kampagnen", spark: [3, 5, 4, 7, 9] },
  { src: "../../assets/team/portrait-02.jpg", pos: "center 20%", nm: "Johannes Lindner", role: "Founder", disz: "Vertrieb", v: "300 Mio+", label: "€ Projektvolumen", spark: [2, 4, 6, 5, 8] },
  { src: "../../assets/team/portrait-03.jpg", pos: "center 22%", nm: "Nikita Neznamov", role: "Founder", disz: "Technologie", v: "140+", label: "Datenpunkte je Objekt", spark: [4, 3, 6, 8, 7] },
  { src: "../../assets/team/portrait-04.jpg", pos: "center 18%", nm: "Wenzel Waechter", role: "Founder", disz: "Vertrieb", v: "T+38", label: "Ø Tage bis Abverkauf", spark: [8, 7, 5, 4, 2] },
  { src: "../../assets/team/portrait-05.jpg", pos: "center 20%", nm: "Florian Hörmann", role: "Founder", disz: "Vertrieb", v: "25+", label: "Makler im CIRCLE", spark: [2, 4, 5, 7, 8] },
  { src: "../../assets/team/portrait-06.jpg", pos: "center 18%", nm: "Daniel Hayden", role: "Founder", disz: "Marketing", v: "9", label: "Kanäle im Kampagnen-Mix", spark: [3, 5, 6, 7, 9] },
  { src: "../../assets/team/portrait-07.jpg", pos: "center 20%", nm: "Marcin Fituch", role: "Founder", disz: "Technologie", v: "8+", label: "Tech-Module in LENS", spark: [2, 3, 5, 6, 8] },
  { src: "../../assets/team/portrait-08.jpg", pos: "center 18%", nm: "Fabian Fuhrmann", role: "Founder", disz: "Vertrieb", v: "5", label: "Unternehmen fusioniert", spark: [4, 5, 6, 8, 9] },
];
function SparkSt({ pts }) {
  const max = Math.max(...pts), min = Math.min(...pts);
  const d = pts.map((p, i) => `${(i / (pts.length - 1)) * 100},${34 - ((p - min) / (max - min)) * 28}`).join(" ");
  return (
    <svg viewBox="0 0 100 38" preserveAspectRatio="none" style={{ width: "100%", height: 34, display: "block" }} aria-hidden="true">
      <polyline points={d} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
function PortraitSt({ p, delay }) {
  const [on, setOn] = React.useState(false);
  return (
    <Reveal delay={delay}>
      <figure style={{ margin: 0 }}>
        <div onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)} onClick={() => setOn((v) => !v)}
          style={{ position: "relative", borderRadius: "var(--r-card)", overflow: "hidden", aspectRatio: "3 / 4", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", cursor: "pointer", background: "var(--paper-2)" }}>
          <img src={p.src} alt="Gründerporträt" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: p.pos, transform: on ? "scale(1.03)" : "scale(1)", filter: on ? "brightness(0.72)" : "brightness(1)", transition: "all var(--dur-base) var(--ease-unio)" }} />
          <div style={{ position: "absolute", inset: 12, borderRadius: 16, border: "1px solid rgba(255,255,255,0.55)", opacity: on ? 1 : 0, transition: "opacity var(--dur-base) var(--ease-unio)", pointerEvents: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "16px 16px 12px", color: "#FFFFFF" }}>
            <div>
              <span style={{ font: "500 28px/1 var(--font-display)", letterSpacing: "-0.02em" }}>{p.v}<span style={{ font: "12px var(--font-mono)", marginLeft: 6 }}>↗</span></span>
              <div className="u-label" style={{ fontSize: 9, marginTop: 7, color: "rgba(255,255,255,0.85)" }}>{p.label}</div>
            </div>
            <div>
              <SparkSt pts={p.spark} />
              <span className="u-label" style={{ display: "inline-block", fontSize: 9, padding: "5px 11px", borderRadius: "var(--r-pill)", background: "rgba(255,255,255,0.2)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5)", marginTop: 10 }}>{p.disz}</span>
            </div>
          </div>
        </div>
        <figcaption style={{ marginTop: 12 }}>
          <span style={{ display: "block", font: "500 16px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>{p.nm}</span>
          <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 10, marginTop: 4, display: "block" }}>{p.role}</span>
        </figcaption>
      </figure>
    </Reveal>
  );
}
function TeamSt() {
  const [fun, setFun] = React.useState(false);
  const mob = window.useMobile();
  return (
    <section data-screen-label="Menschen" className="u-grain" style={{ ...stackCard(6, "var(--paper)"), padding: 0, overflow: "hidden" }}>
      <KapSt nr="05" label="Menschen" />
      <div onMouseEnter={() => setFun(true)} onMouseLeave={() => setFun(false)} onClick={() => setFun((v) => !v)}
        style={{ position: "relative", width: "100%", height: "82svh", minHeight: 560, cursor: "pointer", overflow: "hidden" }}>
        <img src="../../assets/team/gruppe-serioes.jpg" alt="Das UNIO Gründerteam" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <img src="../../assets/team/gruppe-lustig.jpg" alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", opacity: fun ? 1 : 0, transition: "opacity var(--dur-base) var(--ease-unio)" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.28), transparent 34%, transparent 52%, rgba(11,10,9,0.68))" }}></div>
        <div style={{ position: "absolute", left: "7vw", right: "7vw", bottom: "8vh", color: "var(--text-inverse)" }}>
          <h2 style={{ margin: 0, font: "500 clamp(40px, 5vw, 88px)/1 var(--font-display)", letterSpacing: "-0.03em", textShadow: "0 2px 40px rgba(0,0,0,0.4)" }}>
            Die Menschen dahinter.
          </h2>
          <p style={{ margin: "20px 0 0", font: "400 18px/1.6 var(--font-display)", color: "rgba(247,245,241,0.9)", maxWidth: 520 }}>
            Acht Gründer, drei Disziplinen, eine Firma. Ernst können wir — Spaß auch.
          </p>
        </div>
        <span className="u-label" style={{ position: "absolute", right: 22, top: 100, color: "var(--text-inverse)", fontSize: 10, background: "var(--glass-dark)", WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)", padding: "7px 13px", borderRadius: "var(--r-pill)", boxShadow: "inset 0 0 0 1px var(--hairline-light)" }}>
          {fun ? "…und so wirklich." : "So sehen wir offiziell aus —"}
        </span>
      </div>
      <div style={{ padding: mob ? "48px 6vw 110px" : "72px 7vw 175px" }}>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: mob ? 12 : 14 }}>
          {TEAM_PORTRAITS.map((p, i) => <PortraitSt key={p.src} p={p} delay={(i % 4) * 80} />)}
        </div>
      </div>
    </section>
  );
}

/* ===== 06 · WO WIR STEHEN. WOHIN WIR GEHEN — Roadmap, horizontal gepinnt ===== */
const MEILEN = [
  { j: "2024", t: "Die Säulen arbeiten getrennt", type: "past" },
  { j: "2025", t: "Erste gemeinsame Projekte — Ecoluxe, Albrecht", type: "past" },
  { j: "2026", t: "Die Fusion · Validierungsjahr — wir beweisen es gerade.", type: "now" },
  { j: "—", t: "[PLATZHALTER: Ziel CIRCLE-Partner]", type: "future" },
  { j: "—", t: "[PLATZHALTER: Projekte im System]", type: "future" },
  { j: "—", t: "[PLATZHALTER: Expansion]", type: "future" },
];
function marker(m) {
  return {
    width: 15, height: 15, borderRadius: "50%", flex: "none",
    background: m.type === "now" ? "var(--signal)" : m.type === "past" ? "var(--ink)" : "transparent",
    boxShadow: m.type === "future" ? "inset 0 0 0 1.5px var(--ink-3)" : m.type === "now" ? "0 0 0 5px var(--signal-soft)" : "none",
    animation: m.type === "now" && !RMs ? "uPulse 2.2s var(--ease-unio) infinite" : "none",
  };
}
function SkalaSt() {
  const [ref, p] = usePinProgress();
  const mob = window.useMobile();
  const W = mob ? 88 : 42; // Breite pro Meilenstein in vw-Prozent des Tracks
  const shift = stC(p / 0.9);
  if (RMs) {
    return (
      <section data-screen-label="Meilensteine" className="u-grain" style={{ ...stackCard(7, "var(--paper-2)"), padding: "175px 7vw" }}>
        <KapSt nr="06" label="Roadmap" />
        <h2 style={{ margin: "0 0 56px", font: "500 clamp(32px, 3.4vw, 56px)/1.04 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Wo wir stehen.<br />Wohin wir gehen.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {MEILEN.map((m, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={marker(m)}></span>
              <span style={{ font: "13px var(--font-mono)", color: m.type === "now" ? "var(--signal-deep)" : "var(--ink)" }}>{m.j}</span>
              <p style={{ margin: 0, font: "400 14px/1.5 var(--font-display)", color: m.type === "future" ? "var(--text-muted)" : "var(--ink-2)" }}>{m.t}</p>
            </div>
          ))}
        </div>
        <p className="u-label" style={{ margin: "48px 0 0", color: "var(--text-muted)", fontSize: 10 }}>Offene Punkte tragen wir ein, wenn sie erreicht sind — nicht vorher.</p>
      </section>
    );
  }
  return (
    <section ref={ref} data-screen-label="Meilensteine" style={{ height: "320vh", ...stackCard(7, "var(--paper-2)") }}>
      <div className="u-grain" style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <KapSt nr="06" label="Roadmap" />
        <div style={{ position: "absolute", left: "7vw", top: "13vh" }}>
          <h2 style={{ margin: 0, font: "500 clamp(28px, 3vw, 50px)/1.04 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Wo wir stehen.<br />Wohin wir gehen.</h2>
        </div>
        <span aria-hidden="true" style={{ position: "absolute", right: "5vw", top: "16vh", font: "500 clamp(140px, 22vw, 340px)/0.8 var(--font-display)", letterSpacing: "-0.05em", color: "rgba(255,170,9,0.07)", pointerEvents: "none", userSelect: "none" }}>2026</span>
        {/* Lineal-Track */}
        <div style={{ position: "relative", marginTop: "6vh" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, top: 30, height: 14, backgroundImage: "repeating-linear-gradient(90deg, var(--hairline-dark) 0 1px, transparent 1px 24px)", borderBottom: "1.5px solid var(--ink-3)" }}></div>
          <div style={{ display: "flex", width: MEILEN.length * W + "%", transform: `translateX(${-shift * (MEILEN.length * W - 100) * (100 / (MEILEN.length * W))}%)`, transition: "none", paddingLeft: mob ? "6vw" : "7vw" }}>
            {MEILEN.map((m, i) => (
              <div key={i} style={{ width: (100 / MEILEN.length) + "%", flex: "none", display: "flex", flexDirection: "column", gap: 14, paddingRight: "4vw" }}>
                <span style={marker(m)}></span>
                <span style={{ font: "14px var(--font-mono)", color: m.type === "now" ? "var(--signal-deep)" : m.type === "future" ? "var(--text-muted)" : "var(--ink)" }}>{m.j}</span>
                <p style={{ margin: 0, font: "400 15px/1.5 var(--font-display)", color: m.type === "future" ? "var(--text-muted)" : "var(--ink-2)", maxWidth: "22ch" }}>{m.t}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="u-label" style={{ position: "absolute", left: "7vw", bottom: "9vh", color: "var(--text-muted)", fontSize: 10 }}>Offene Punkte tragen wir ein, wenn sie erreicht sind — nicht vorher.</p>
      </div>
    </section>
  );
}

/* ===== 07 · FINALE ===== */
function FinaleSt() {
  return (
    <section data-screen-label="Finale" className="u-grain" style={{ ...stackCard(8, "var(--paper)"), padding: "150px 7vw 175px", textAlign: "center" }}>
      <KapSt nr="07" label="Finale" />
      <p style={{ margin: "0 auto 30px", font: "400 clamp(17px, 1.8vw, 22px)/1.55 var(--font-display)", color: "var(--text-muted)", maxWidth: 560 }}>
        Was als Überzeugung begann, ist heute ein System. Und wir fangen gerade erst an.
      </p>
      <h2 style={{ margin: 0, font: "500 clamp(40px, 5vw, 84px)/1 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>
        Raum. Technologie.<br />Mensch<span style={{ color: "var(--signal)" }}>.</span>
      </h2>
      <div style={{ marginTop: 34 }}>
        <Bs size="lg" variant="signal" knob onClick={() => location.assign("kontakt.html")}>Mit uns sprechen</Bs>
      </div>
    </section>
  );
}

function App() {
  return (
    <div style={{ fontFamily: "var(--font-display)" }}>
      <SiteNav active="story.html" />
      <HeroSt />
      <ErkenntnisSt />
      <StatementSt />
      <FusionFlow />
      <GoldenCircle />
      <TeamSt />
      <SkalaSt />
      <div style={{ position: "relative", zIndex: 9 }}><SiteFooter /></div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
