/* Hero Fassung 2 (nur Variante 2). Zwei Buehnen, ein Prinzip: ein Medium, eine Aussage,
   Bewegung kommt vom Scrollen und nicht aus einer Schleife.
   Vorbilder, selbst angesehen am 20.11.2026: rivian.com (Bild als eingerueckte Karte mit runden Ecken),
   apple.com/macbook-air (grosse ruhige Zeile, Inhalte in Karten), aman.com (ein Bild, kaum Text),
   landonorris.com (der Mensch als Hero, Portraet wird beim Scrollen zur Karte), linear.app (Zeilen aus der Maske).
   Regeln: nur transform, opacity und clip-path. Keine Unschaerfe. Einmal beim Laden, danach nur Scroll.
   Mit ?hero=alt zeigt Variante 2 zum Vergleich wieder den bisherigen Hero. */
const H2_RUHIG = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
const H2_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const { Button: H2Btn } = window.UNIODesignSystem_b6216a;

/* Zeile, die einmal aus einer Maske aufsteigt. Der Text bleibt fuer Vorleser ein normaler Text. */
function H2Zeile({ da, i = 0, children }) {
  return (
    <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.08em", marginBottom: "-0.08em" }}>
      <span style={{ display: "block", transform: da ? "none" : "translateY(108%)", transition: H2_RUHIG ? "none" : `transform 1000ms ${H2_EASE} ${140 + i * 90}ms` }}>{children}</span>
    </span>
  );
}

/* ---------- Startseite: Film im Rahmen, wird beim Scrollen zur Karte im Raster ---------- */
function HeroV2() {
  const mob = window.useMobile();
  const wrap = React.useRef(null);
  const vid = React.useRef(null);
  const [da, setDa] = React.useState(H2_RUHIG);
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    if (H2_RUHIG) return;
    const t = setTimeout(() => setDa(true), 60);
    return () => clearTimeout(t);
  }, []);
  React.useEffect(() => {
    if (H2_RUHIG) return;
    let frei = true;
    const mess = () => {
      frei = true;
      const el = wrap.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const weg = Math.max(1, r.height - window.innerHeight);
      setP(Math.min(1, Math.max(0, -r.top / weg)));
    };
    const beiScroll = () => { if (frei) { frei = false; requestAnimationFrame(mess); } };
    window.addEventListener("scroll", beiScroll, { passive: true });
    window.addEventListener("resize", beiScroll);
    mess();
    return () => { window.removeEventListener("scroll", beiScroll); window.removeEventListener("resize", beiScroll); };
  }, []);
  React.useEffect(() => {
    const v = vid.current; if (!v || H2_RUHIG) return;
    const los = () => { const q = v.play(); if (q && q.catch) q.catch(() => {}); };
    v.addEventListener("canplay", los); los();
    return () => v.removeEventListener("canplay", los);
  }, []);

  const e = p * p * (3 - 2 * p); /* weicher Verlauf 0..1 */
  const seite = `calc(10px + (6vw - 10px) * ${e})`;
  const oben = `calc(10px + ${mob ? 70 : 88}px * ${e})`;
  const unten = `calc(10px + ${mob ? 16 : 20}vh * ${e})`;
  const radius = 16 + 8 * e;
  const rahmen = da
    ? `inset(${oben} ${seite} ${unten} ${seite} round ${radius}px)`
    : "inset(20% 26% 20% 26% round 28px)";
  const innen = mob ? "22px" : "clamp(28px, 3.4vw, 60px)";

  return (
    <section id="top" ref={wrap} data-screen-label="Hero" style={{ position: "relative", height: H2_RUHIG ? "100svh" : "170svh", background: "var(--paper)" }}>
      <div style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden" }}>
        {/* Medium: Standbild sofort, Film laedt nach */}
        <div style={{ position: "absolute", inset: 0, clipPath: rahmen, WebkitClipPath: rahmen, transition: p === 0 && !H2_RUHIG ? `clip-path 1300ms ${H2_EASE}, -webkit-clip-path 1300ms ${H2_EASE}` : "none", background: "var(--ink)" }}>
          <video ref={vid} poster="../../assets/img/hero-poster.jpg" muted loop playsInline preload={H2_RUHIG ? "none" : "metadata"}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: da ? `scale(${1 + 0.04 * e})` : "scale(1.1)", transition: p === 0 && !H2_RUHIG ? `transform 2400ms ${H2_EASE}` : "none" }}>
            <source src="../../assets/video/hero-fenster.webm" type="video/webm" />
            <source src="../../assets/video/hero-fenster.mp4" type="video/mp4" />
          </video>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.34) 0%, rgba(11,10,9,0.04) 34%, rgba(11,10,9,0.1) 55%, rgba(11,10,9,0.62) 100%)" }}></div>
        </div>

        {/* Text sitzt im Rahmen auf dem Raster: Zeile links ueber 7 Spalten, Absatz und Knoepfe ab Spalte 8 */}
        <div style={{ position: "absolute", left: `calc(6vw + ${innen} * ${e})`, right: `calc(6vw + ${innen} * ${e})`, bottom: `calc(${unten} + ${mob ? "26px" : "clamp(30px, 5.5vh, 64px)"})`, display: "grid", gridTemplateColumns: mob ? "1fr" : `${window.spalten(7)} minmax(0, 1fr)`, gap: mob ? 18 : 24, alignItems: "end", color: "#FFFFFF" }}>
          <h1 style={{ margin: 0, font: `500 ${mob ? "clamp(40px, 12vw, 58px)" : "clamp(52px, 7.2vw, 132px)"}/0.95 var(--font-display)`, letterSpacing: "-0.04em" }}>
            <H2Zeile da={da} i={0}>Real Estate</H2Zeile>
            <H2Zeile da={da} i={1}>Finally Simple<span style={{ color: "var(--signal)" }}>.</span></H2Zeile>
          </h1>
          <div style={{ opacity: da ? 1 : 0, transition: H2_RUHIG ? "none" : `opacity 700ms ${H2_EASE} 620ms`, maxWidth: 440 }}>
            <p style={{ margin: 0, font: `400 ${mob ? 15.5 : 17}px/1.6 var(--font-display)`, color: "rgba(247,245,241,0.92)" }}>
              Technologie, damit Menschen besser kaufen, verkaufen und beraten können. Damit du findest, was du wirklich suchst.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
              <H2Btn size="lg" variant="paper" knob onClick={() => (location.hash = "suche")}>Immobilie finden</H2Btn>
              <H2Btn size="lg" variant="glass" tone="dark" onClick={() => (location.hash = "produkte")}>Wie es funktioniert</H2Btn>
            </div>
          </div>
        </div>

        {/* Unter der Karte, sobald sie geschrumpft ist: eine ruhige Zeile auf dem Raster */}
        {!H2_RUHIG && (
          <div aria-hidden={e < 0.6} style={{ position: "absolute", left: "6vw", right: "6vw", bottom: mob ? "5vh" : "7vh", display: "grid", gridTemplateColumns: mob ? "1fr" : `${window.spalten(7)} minmax(0, 1fr)`, gap: 24, alignItems: "baseline", opacity: Math.max(0, (e - 0.55) / 0.45), color: "var(--ink)" }}>
            <span style={{ font: `500 ${mob ? 22 : "clamp(24px, 2.4vw, 40px)"}${mob ? "px" : ""}/1.1 var(--font-display)`, letterSpacing: "-0.025em" }}>Raum. Technologie. Mensch.</span>
            {!mob && <span style={{ font: "400 17px/1.6 var(--font-display)", color: "var(--text-muted)" }}>Kuratierte Objekte in Wien, persönlich betreut.</span>}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- CIRCLE-Seite: der Mensch ist der Hero ---------- */
/* Ein durchgehender Film: Jedes Mal, wenn vorne jemand am Makler vorbeigeht, steht dahinter der naechste.
   Geschnitten aus den sechs Einzelfilmen an den Momenten, in denen das Gesicht verdeckt ist
   (assets/team/editorial/circle-schnitt.mp4, 10,4 Sekunden, Schleife). Die Zeiten sagen, wer wann zu sehen ist. */
const CIRCLE_SCHNITT = [["marcus-weiss", 0], ["lara-jonas", 1.479], ["wenzel-waechter", 3.146], ["nikita-neznamov", 5.104], ["philipp-trattner", 7.021], ["alexander-maurer", 8.938]];
function useCircleSchnitt() {
  const leute = CIRCLE_SCHNITT.map(([slug]) => ({ slug, ...window.MAKLER_DB[slug] })).filter((m) => m.name);
  const [i, setI] = React.useState(0);
  const vid = React.useRef(null);
  React.useEffect(() => {
    const v = vid.current; if (!v || H2_RUHIG) return;
    let lauf = 0;
    const takt = () => {
      const t = v.currentTime; let k = 0;
      for (let n = 0; n < CIRCLE_SCHNITT.length; n++) if (t >= CIRCLE_SCHNITT[n][1]) k = n;
      setI((alt) => (alt === k ? alt : k));
      lauf = requestAnimationFrame(takt);
    };
    const los = () => { const q = v.play(); if (q && q.catch) q.catch(() => {}); };
    v.addEventListener("canplay", los); los();
    lauf = requestAnimationFrame(takt);
    return () => { cancelAnimationFrame(lauf); v.removeEventListener("canplay", los); };
  }, []);
  return { leute, i, vid };
}
function CircleFilm({ stil }) {
  const { leute, i, vid } = useCircleSchnitt();
  const m = leute[i] || leute[0];
  return (
    <div style={{ position: "relative", overflow: "hidden", background: "var(--ink)", ...stil }}>
      <img src="../../assets/team/editorial/circle-schnitt.jpg" alt={"Porträt von " + m.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      {!H2_RUHIG && <video ref={vid} src="../../assets/team/editorial/circle-schnitt.mp4" muted loop playsInline preload="auto" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}></video>}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0) 58%, rgba(11,10,9,0.62) 100%)" }}></div>
      <div style={{ position: "absolute", left: 22, right: 22, bottom: 20, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, color: "var(--text-inverse)" }}>
        <span style={{ minWidth: 0 }}>
          <span style={{ display: "block", font: "500 clamp(18px, 1.7vw, 26px)/1.1 var(--font-display)", letterSpacing: "-0.02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</span>
          <span className="u-label" style={{ display: "block", marginTop: 7, fontSize: 10, color: "rgba(247,245,241,0.8)" }}>{m.region}</span>
        </span>
        <span className="u-label" style={{ flex: "none", fontSize: 10, color: "rgba(247,245,241,0.8)", fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")} / {String(leute.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
function HeroMkV2() {
  const mob = window.useMobile();
  const [da, setDa] = React.useState(H2_RUHIG);
  React.useEffect(() => {
    if (H2_RUHIG) return;
    const t = setTimeout(() => setDa(true), 60);
    return () => clearTimeout(t);
  }, []);
  return (
    <section id="top" data-track="chapter_view_01" data-screen-label="Hero" className="u-grain" style={{ position: "relative", zIndex: 0, background: "var(--paper)", padding: mob ? "112px 6vw 64px" : "clamp(120px, 17vh, 180px) 6vw clamp(64px, 9vh, 110px)" }}>
      <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: mob ? "1fr" : `${window.spalten(7)} minmax(0, 1fr)`, gap: mob ? 36 : 24, alignItems: "end" }}>
        <div>
          <h1 style={{ margin: 0, font: `500 ${mob ? "clamp(40px, 12vw, 58px)" : "clamp(52px, 6.6vw, 120px)"}/0.96 var(--font-display)`, letterSpacing: "-0.04em", color: "var(--ink)" }}>
            <H2Zeile da={da} i={0}>Agent-First</H2Zeile>
            <H2Zeile da={da} i={1}>beginnt hier<span style={{ color: "var(--signal)" }}>.</span></H2Zeile>
          </h1>
          <div style={{ opacity: da ? 1 : 0, transition: H2_RUHIG ? "none" : `opacity 700ms ${H2_EASE} 560ms` }}>
            <p style={{ margin: mob ? "20px 0 0" : "28px 0 0", maxWidth: 520, font: `400 ${mob ? 15.5 : 17}px/1.65 var(--font-display)`, color: "var(--text-muted)" }}>
              CIRCLE ist die Community für Makler, die ihren Beruf lieben. Echtes Unternehmertum, getragen von Technologie, Marketing und einer Infrastruktur, die dich weiterbringt.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
              <H2Btn size="lg" knob data-track="hero_cta_primary" onClick={() => (location.hash = "rechner")}>Was bleibt für dich? Zum Rechner</H2Btn>
              <H2Btn size="lg" variant="ghost" data-track="hero_cta_secondary" onClick={() => (location.hash = "bewerben")}>Jetzt bewerben</H2Btn>
            </div>
            {/* Drei Aussagen als ruhige Zeile mit Haarlinien, kein Glas */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 24, marginTop: mob ? 36 : "clamp(40px, 7vh, 84px)", paddingTop: 18, borderTop: "1px solid var(--hairline-dark)" }}>
              {[["100 %", "Provision"], ["Deine", "Marke"], ["Beteiligung", "möglich"]].map(([v, k]) => (
                <div key={k} style={{ minWidth: 0 }}>
                  <div style={{ font: `500 ${mob ? 18 : 24}px/1.1 var(--font-display)`, letterSpacing: "-0.02em", color: "var(--ink)", whiteSpace: "nowrap" }}>{v}</div>
                  <div className="u-label" style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 6 }}>{k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Rechts ueber 5 Spalten: der geschnittene Film */}
        <CircleFilm stil={{ aspectRatio: "4 / 5", borderRadius: "var(--r-panel)", clipPath: da ? "inset(0 round 24px)" : "inset(100% 0 0 0 round 24px)", WebkitClipPath: da ? "inset(0 round 24px)" : "inset(100% 0 0 0 round 24px)", transition: H2_RUHIG ? "none" : `clip-path 1200ms ${H2_EASE} 120ms, -webkit-clip-path 1200ms ${H2_EASE} 120ms` }} />
      </div>
    </section>
  );
}

/* ---------- Startseite, Vorschlag B: Mensch und Raum ---------- */
/* Links die Aussage, rechts ein echter Rundgang: der Makler fuehrt selbst durch das Objekt. */
function HeroB() {
  const mob = window.useMobile();
  const [da, setDa] = React.useState(H2_RUHIG);
  const vid = React.useRef(null);
  React.useEffect(() => { if (H2_RUHIG) return; const t = setTimeout(() => setDa(true), 60); return () => clearTimeout(t); }, []);
  React.useEffect(() => { const v = vid.current; if (!v || H2_RUHIG) return; const q = v.play(); if (q && q.catch) q.catch(() => {}); }, []);
  const maske = da ? "inset(0 round 24px)" : "inset(100% 0 0 0 round 24px)";
  return (
    <section id="top" data-screen-label="Hero" className="u-grain" style={{ position: "relative", background: "var(--paper)", padding: mob ? "108px 6vw 56px" : "118px 6vw 64px", minHeight: mob ? 0 : "100svh", display: "flex", alignItems: "stretch" }}>
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "grid", gridTemplateColumns: mob ? "1fr" : `${window.spalten(7)} minmax(0, 1fr)`, gap: mob ? 32 : 24, alignItems: "end" }}>
        <div style={{ paddingBottom: mob ? 0 : 8 }}>
          <h1 style={{ margin: 0, font: `500 ${mob ? "clamp(40px, 12vw, 58px)" : "clamp(52px, 7vw, 128px)"}/0.95 var(--font-display)`, letterSpacing: "-0.04em", color: "var(--ink)" }}>
            <H2Zeile da={da} i={0}>Real Estate</H2Zeile>
            <H2Zeile da={da} i={1}>Finally Simple<span style={{ color: "var(--signal)" }}>.</span></H2Zeile>
          </h1>
          <div style={{ opacity: da ? 1 : 0, transition: H2_RUHIG ? "none" : `opacity 700ms ${H2_EASE} 560ms` }}>
            <p style={{ margin: mob ? "20px 0 0" : "28px 0 0", maxWidth: 480, font: `400 ${mob ? 15.5 : 17}px/1.65 var(--font-display)`, color: "var(--text-muted)" }}>
              Technologie, damit Menschen besser kaufen, verkaufen und beraten können. Hinter jedem Objekt steht jemand, der es kennt.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
              <H2Btn size="lg" variant="solid" knob onClick={() => (location.hash = "suche")}>Immobilie finden</H2Btn>
              <H2Btn size="lg" variant="ghost" onClick={() => (location.hash = "produkte")}>Wie es funktioniert</H2Btn>
            </div>
          </div>
        </div>
        <div style={{ position: "relative", height: mob ? "auto" : "min(calc(100svh - 182px), 780px)", aspectRatio: mob ? "4 / 5" : "auto", borderRadius: "var(--r-panel)", overflow: "hidden", background: "var(--ink)", clipPath: maske, WebkitClipPath: maske, transition: H2_RUHIG ? "none" : `clip-path 1200ms ${H2_EASE} 120ms, -webkit-clip-path 1200ms ${H2_EASE} 120ms` }}>
          <img src="../../assets/video/makler-wenzel-jardin.jpg" alt="Wenzel Wächter vor dem Projekt Jardin Hermes" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          {!H2_RUHIG && <video ref={vid} src="../../assets/video/makler-wenzel-jardin.mp4" muted loop playsInline preload="auto" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}></video>}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0) 62%, rgba(11,10,9,0.6) 100%)" }}></div>
          <div style={{ position: "absolute", left: 22, right: 22, bottom: 20, color: "var(--text-inverse)" }}>
            <span style={{ display: "block", font: "500 clamp(18px, 1.7vw, 26px)/1.1 var(--font-display)", letterSpacing: "-0.02em" }}>Wenzel Wächter</span>
            <span className="u-label" style={{ display: "block", marginTop: 7, fontSize: 10, color: "rgba(247,245,241,0.8)" }}>Führt durch Jardin Hermes</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Startseite, Vorschlag C: der Mensch in der Mitte ---------- */
/* Die Aussage rahmt den Menschen: eine Zeile links, eine rechts, in der Mitte der geschnittene Film. */
function HeroC() {
  const mob = window.useMobile();
  const [da, setDa] = React.useState(H2_RUHIG);
  React.useEffect(() => { if (H2_RUHIG) return; const t = setTimeout(() => setDa(true), 60); return () => clearTimeout(t); }, []);
  const maske = da ? "inset(0 round 24px)" : "inset(50% 0 50% 0 round 24px)";
  const zeile = { margin: 0, font: `500 ${mob ? "clamp(40px, 12vw, 58px)" : "clamp(34px, 4.3vw, 82px)"}/0.96 var(--font-display)`, letterSpacing: "-0.04em", color: "var(--ink)", whiteSpace: mob ? "normal" : "nowrap" };
  const film = <CircleFilm stil={{ aspectRatio: "4 / 5", width: "100%", justifySelf: "center", borderRadius: "var(--r-panel)", clipPath: maske, WebkitClipPath: maske, transition: H2_RUHIG ? "none" : `clip-path 1300ms ${H2_EASE} 80ms, -webkit-clip-path 1300ms ${H2_EASE} 80ms` }} />;
  if (mob) return (
    <section id="top" data-screen-label="Hero" className="u-grain" style={{ position: "relative", background: "var(--paper)", padding: "108px 6vw 56px" }}>
      <h1 style={zeile}><H2Zeile da={da} i={0}>Real Estate</H2Zeile><H2Zeile da={da} i={1}>Finally Simple<span style={{ color: "var(--signal)" }}>.</span></H2Zeile></h1>
      <div style={{ marginTop: 28 }}>{film}</div>
      <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}><H2Btn size="lg" variant="solid" knob onClick={() => (location.hash = "suche")}>Immobilie finden</H2Btn></div>
    </section>
  );
  return (
    <section id="top" data-screen-label="Hero" className="u-grain" style={{ position: "relative", background: "var(--paper)", padding: "118px 6vw 64px", minHeight: "100svh", display: "flex", alignItems: "center" }}>
      <h1 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Real Estate Finally Simple.</h1>
      <div style={{ position: "relative", zIndex: 1, width: "100%", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 24, alignItems: "center" }}>
        <div style={{ textAlign: "right" }}>
          <div aria-hidden="true" style={zeile}><H2Zeile da={da} i={0}>Real Estate</H2Zeile></div>
          <p style={{ margin: "26px 0 0 auto", maxWidth: 340, font: "400 17px/1.65 var(--font-display)", color: "var(--text-muted)", opacity: da ? 1 : 0, transition: H2_RUHIG ? "none" : `opacity 700ms ${H2_EASE} 620ms` }}>Hinter jedem Objekt steht ein Mensch, der es kennt.</p>
        </div>
        {film}
        <div>
          <div aria-hidden="true" style={zeile}><H2Zeile da={da} i={1}>Finally Simple<span style={{ color: "var(--signal)" }}>.</span></H2Zeile></div>
          <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap", opacity: da ? 1 : 0, transition: H2_RUHIG ? "none" : `opacity 700ms ${H2_EASE} 620ms` }}>
            <H2Btn size="lg" variant="solid" knob onClick={() => (location.hash = "suche")}>Immobilie finden</H2Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Startseite, Vorschlag D: Schrift zuerst ---------- */
/* Eine sehr grosse Zeile ueber die ganze Breite, darunter drei Bilder auf dem Raster: Raum, Mensch, Objekt. */
function HeroD() {
  const mob = window.useMobile();
  const [da, setDa] = React.useState(H2_RUHIG);
  const vid = React.useRef(null);
  React.useEffect(() => { if (H2_RUHIG) return; const t = setTimeout(() => setDa(true), 60); return () => clearTimeout(t); }, []);
  React.useEffect(() => { const v = vid.current; if (!v || H2_RUHIG) return; const q = v.play(); if (q && q.catch) q.catch(() => {}); }, []);
  const maske = (n) => ({ clipPath: da ? "inset(0 round 20px)" : "inset(100% 0 0 0 round 20px)", WebkitClipPath: da ? "inset(0 round 20px)" : "inset(100% 0 0 0 round 20px)", transition: H2_RUHIG ? "none" : `clip-path 1200ms ${H2_EASE} ${380 + n * 110}ms, -webkit-clip-path 1200ms ${H2_EASE} ${380 + n * 110}ms` });
  const hoch = mob ? "auto" : "clamp(240px, 38vh, 420px)";
  return (
    <section id="top" data-screen-label="Hero" className="u-grain" style={{ position: "relative", background: "var(--paper)", padding: mob ? "108px 6vw 56px" : "clamp(120px, 16vh, 170px) 6vw 64px" }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 style={{ margin: 0, font: `500 ${mob ? "clamp(44px, 13.5vw, 64px)" : "clamp(72px, 11.6vw, 228px)"}/0.9 var(--font-display)`, letterSpacing: "-0.05em", color: "var(--ink)" }}>
          <H2Zeile da={da} i={0}>Real Estate</H2Zeile>
          <H2Zeile da={da} i={1}>Finally Simple<span style={{ color: "var(--signal)" }}>.</span></H2Zeile>
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : `${window.spalten(7)} minmax(0, 1fr)`, gap: mob ? 18 : 24, alignItems: "end", marginTop: mob ? 24 : "clamp(28px, 5vh, 56px)", opacity: da ? 1 : 0, transition: H2_RUHIG ? "none" : `opacity 700ms ${H2_EASE} 560ms` }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <H2Btn size="lg" variant="solid" knob onClick={() => (location.hash = "suche")}>Immobilie finden</H2Btn>
            <H2Btn size="lg" variant="ghost" onClick={() => (location.hash = "produkte")}>Wie es funktioniert</H2Btn>
          </div>
          <p style={{ margin: 0, maxWidth: 440, font: `400 ${mob ? 15.5 : 17}px/1.65 var(--font-display)`, color: "var(--text-muted)" }}>Technologie, damit Menschen besser kaufen, verkaufen und beraten können. Damit du findest, was du wirklich suchst.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : `${window.spalten(6)} ${window.spalten(3)} minmax(0, 1fr)`, gap: mob ? 10 : 24, marginTop: mob ? 32 : "clamp(36px, 6vh, 72px)" }}>
          <div style={{ position: "relative", height: hoch, aspectRatio: mob ? "16 / 10" : "auto", gridColumn: mob ? "1 / -1" : "auto", overflow: "hidden", background: "var(--ink)", ...maske(0) }}>
            <video ref={vid} poster="../../assets/img/hero-poster.jpg" muted loop playsInline preload={H2_RUHIG ? "none" : "metadata"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
              <source src="../../assets/video/hero-fenster.webm" type="video/webm" />
              <source src="../../assets/video/hero-fenster.mp4" type="video/mp4" />
            </video>
          </div>
          <CircleFilm stil={{ height: hoch, aspectRatio: mob ? "4 / 5" : "auto", ...maske(1) }} />
          <div style={{ position: "relative", height: hoch, aspectRatio: mob ? "4 / 5" : "auto", overflow: "hidden", background: "var(--paper-2)", ...maske(2) }}>
            <img src="../../assets/img/obenzwei-terrasse.jpg" alt="Dachterrasse mit Blick über Wien" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Umschalter fuer die Abstimmung: /2?hero=a|b|c|d, mit ?hero=alt der bisherige Hero.
   Eine kleine Leiste unten links fuehrt durch die Vorschlaege. Nur in Variante 2. */
function HeroWahl({ alt }) {
  const m = (location.search.match(/[?&]hero=([a-z]+)/) || [])[1] || "a";
  const liste = [["a", "A", "Film wird zur Karte"], ["b", "B", "Mensch und Raum"], ["c", "C", "Mensch in der Mitte"], ["d", "D", "Schrift zuerst"], ["alt", "Alt", "Bisheriger Hero"]];
  const hero = m === "alt" ? alt : m === "b" ? <HeroB /> : m === "c" ? <HeroC /> : m === "d" ? <HeroD /> : <HeroV2 />;
  return (
    <React.Fragment>
      {hero}
      <nav aria-label="Hero-Vorschläge" style={{ position: "fixed", left: 16, bottom: 16, zIndex: 80, display: "flex", alignItems: "center", gap: 4, padding: "6px 8px 6px 14px", borderRadius: 999, background: "var(--ink)", color: "var(--paper)", boxShadow: "0 10px 30px rgba(11,10,9,0.25)" }}>
        <span className="u-label" style={{ fontSize: 9.5, color: "rgba(247,245,241,0.7)", marginRight: 6 }}>Hero</span>
        {liste.map(([k, z, t]) => (
          <a key={k} href={"?hero=" + k} title={t} aria-current={k === m ? "true" : undefined} style={{ minWidth: 34, height: 30, padding: "0 10px", borderRadius: 999, display: "grid", placeItems: "center", textDecoration: "none", font: "500 12.5px var(--font-display)", background: k === m ? "var(--signal)" : "transparent", color: k === m ? "#1A1305" : "var(--paper)" }}>{z}</a>
        ))}
      </nav>
    </React.Fragment>
  );
}

Object.assign(window, { HeroV2, HeroMkV2, HeroB, HeroC, HeroD, HeroWahl, CircleFilm });
