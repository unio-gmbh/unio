/* UNIO Website — geteilte Bausteine für alle Seiten.
   Lädt vor den Seiten-Skripten; exportiert über window. */
const {
  GlassPanel, GlassCard, DataOverlay, FlutedGlass, StatBlock, DataLabel,
  Button, IconButton, Chip, Tag, Input, Select,
} = window.UNIODesignSystem_b6216a;

const APP_URL = "https://app.unio.at";
const BEWERTUNG_URL = "https://bewertung.unio.at";
const SEARCH_URL = "https://app.unio.at/listing?listingType=SALE&bbox=16.20248%2C48.09298%2C16.54512%2C48.32316";
const PROJEKT_URL = "projekt.html";

/* Lead-Submission: zentraler Handler für alle Formulare.
   Endpoint ist eine Vercel Function (api/lead.js). Dort muss noch ein
   Mail-/CRM-Provider angebunden werden; bis dahin landen Leads im
   Vercel-Log der Function. */
const LEAD_ENDPOINT = "/api/lead";
async function submitLead(type, data) {
  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: type, page: location.pathname, ts: new Date().toISOString(), ...data }),
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}
const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim());
/* Sanfter Fehlerhinweis unter Formularen, mit E-Mail-Ausweg */
function LeadError({ show }) {
  if (!show) return null;
  return (
    <p role="alert" style={{ margin: "10px 0 0", font: "400 13.5px/1.5 var(--font-display)", color: "var(--signal-deep)" }}>
      Senden hat nicht geklappt. Bitte direkt an <a href="mailto:office@unio.at" style={{ color: "var(--signal-deep)" }}>office@unio.at</a> schreiben.
    </p>
  );
}

/* Mobile-Breakpoint: eine Quelle für alle Seiten (< 900px = mobil/klein) */
const U_MQ_MOBILE = window.matchMedia ? window.matchMedia("(max-width: 767px)") : null;
function useMobile() {
  const [m, setM] = React.useState(U_MQ_MOBILE ? U_MQ_MOBILE.matches : false);
  React.useEffect(() => {
    if (!U_MQ_MOBILE) return;
    const on = (e) => setM(e.matches);
    if (U_MQ_MOBILE.addEventListener) U_MQ_MOBILE.addEventListener("change", on);
    else U_MQ_MOBILE.addListener(on);
    return () => {
      if (U_MQ_MOBILE.removeEventListener) U_MQ_MOBILE.removeEventListener("change", on);
      else U_MQ_MOBILE.removeListener(on);
    };
  }, []);
  return m;
}

/* Loop-Ticker für Bento-Animationen */
function useTick(steps, ms) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setT((x) => (x + 1) % steps), ms);
    return () => clearInterval(id);
  }, [steps, ms]);
  return t;
}

/* Scroll-Reveal */
function Reveal({ children, delay = 0, style }) {
  const ref = React.useRef(null);
  const [inView, setIn] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setIn(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: `all var(--dur-base) var(--ease-unio) ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* Navigation (alle Seiten) */
const NAV_LINKS = [
  ["Makler", "makler.html"],
  ["Bauträger", "bautraeger.html"],
  /* Variante 2 und 3: zur neuen Suche im Repo. Variante 1 fuehrt wie live in die App. */
  ["Immobilien", typeof window !== "undefined" && window.UNIO_V2 === true ? "immobilien.html" : SEARCH_URL],
  ["Story", "story.html"],
  ["Kontakt", "kontakt.html"],
];
function NavLink({ href, label, on, solid }) {
  const [h, setH] = React.useState(false);
  const col = solid ? (on || h ? "var(--ink)" : "var(--text-muted)") : (on || h ? "#FFFFFF" : "rgba(247,245,241,0.72)");
  return (
    <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: "relative", color: col, textDecoration: "none", paddingBottom: 4, transition: "color 300ms var(--ease-unio)" }}>
      {label}
      <span aria-hidden="true" style={{ position: "absolute", left: 0, bottom: 0, height: 1.5, width: on || h ? "100%" : "0%", background: "var(--signal)", transition: "width 300ms var(--ease-unio)" }}></span>
    </a>
  );
}
function SiteNav({ active, cta }) {
  const c = cta || { label: "Login", onClick: () => window.open("https://app.unio.at/auth/redirect?callbackUrl=%2F", "_blank") };
  const [pill, setPill] = React.useState(false);
  const mob = useMobile();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const on = () => setPill(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  React.useEffect(() => {
    document.documentElement.style.overflow = open && mob ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open, mob]);
  React.useEffect(() => { if (!mob) setOpen(false); }, [mob]);
  const skipLink = (
    <a className="u-skip" href="#main" onClick={(e) => { e.preventDefault(); const s = document.querySelector("section"); if (s) { s.setAttribute("tabindex", "-1"); s.focus({ preventScroll: true }); s.scrollIntoView(); } }}>
      Zum Inhalt springen
    </a>
  );
  if (mob) {
    const line = (r) => ({ display: "block", width: 18, height: 1.5, background: "var(--ink)", borderRadius: 2, transition: "transform 400ms var(--ease-unio), opacity 300ms", transformOrigin: "center", transform: r });
    return (
      <React.Fragment>
        {skipLink}
        {/* Overlay-Menü */}
        <div aria-hidden={!open} style={{
          position: "fixed", inset: 0, zIndex: 59,
          background: "rgba(247,245,241,0.9)",
          WebkitBackdropFilter: "blur(28px) saturate(1.6)", backdropFilter: "blur(28px) saturate(1.6)",
          opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
          transition: "opacity 450ms var(--ease-unio)",
          display: "flex", flexDirection: "column", padding: "110px 28px 34px",
        }}>
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {NAV_LINKS.map(([l, href], i) => (
              <a key={href} href={href} onClick={() => setOpen(false)} style={{
                display: "flex", alignItems: "baseline", gap: 14, textDecoration: "none",
                padding: "16px 0", borderBottom: "1px solid var(--hairline-dark)",
                font: "500 30px/1 var(--font-display)", letterSpacing: "-0.02em",
                color: active === href ? "var(--ink)" : "var(--ink-2)",
                opacity: open ? 1 : 0, transform: open ? "none" : "translateY(16px)",
                transition: `opacity 500ms var(--ease-unio) ${80 + i * 60}ms, transform 550ms var(--ease-unio) ${80 + i * 60}ms`,
              }}>
                <span style={{ font: "11px var(--font-mono)", color: active === href ? "var(--signal-deep)" : "var(--text-muted)" }}>0{i + 1}</span>
                {l}
                {active === href && <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--signal)", alignSelf: "center" }}></span>}
              </a>
            ))}
          </nav>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 14, opacity: open ? 1 : 0, transform: open ? "none" : "translateY(16px)", transition: "opacity 500ms var(--ease-unio) 420ms, transform 550ms var(--ease-unio) 420ms" }}>
            <button onClick={() => { setOpen(false); if (c.onClick) c.onClick(); }} style={{
              cursor: "pointer", fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 500,
              padding: "16px 24px", borderRadius: 12, border: "none",
              background: "var(--signal)", color: "var(--on-signal)", width: "100%",
            }}>{c.label}</button>
            <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 10 }}>UNIO · Wien · app.unio.at</span>
          </div>
        </div>
        {/* Leiste */}
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60, padding: pill ? "10px 14px" : "14px 16px", transition: "padding .55s var(--ease-unio)" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "9px 9px 9px 18px", borderRadius: pill ? 12 : 14,
            background: "rgba(247,245,241,0.62)",
            border: "0.5px solid rgba(20,18,16,0.12)",
            WebkitBackdropFilter: "blur(24px) saturate(1.8)", backdropFilter: "blur(24px) saturate(1.8)",
            boxShadow: "0 8px 30px rgba(20,18,16,.1), inset 0 1px 0 rgba(255,255,255,.6)",
            transition: "border-radius .55s var(--ease-unio)",
          }}>
            <a href="index.html" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <img src="../../assets/logo/unio-logo-black.svg" alt="UNIO" style={{ height: 16, width: "auto", display: "block" }} />
            </a>
            <button aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open} onClick={() => setOpen((o) => !o)} style={{
              cursor: "pointer", border: "none", background: open ? "var(--ink)" : "rgba(255,255,255,0.55)",
              width: 40, height: 40, borderRadius: 10, display: "inline-flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 4.5, transition: "background 400ms var(--ease-unio)",
              boxShadow: "inset 0 0 0 0.5px rgba(20,18,16,0.18)",
            }}>
              <span aria-hidden="true" style={{ ...line(open ? "translateY(3px) rotate(45deg)" : "none"), background: open ? "var(--paper)" : "var(--ink)" }}></span>
              <span aria-hidden="true" style={{ ...line(open ? "translateY(-3px) rotate(-45deg)" : "none"), background: open ? "var(--paper)" : "var(--ink)" }}></span>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
    {skipLink}
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60, padding: pill ? "16px 40px" : "22px 40px", transition: "padding .65s var(--ease-unio)" }}>
      <div style={{
        width: "100%", maxWidth: pill ? 760 : 2200, margin: "0 auto", /* Zahl statt "none": max-width ist sonst nicht animierbar */
        display: "flex", alignItems: "center",
        padding: pill ? "9px 10px 9px 22px" : "12px 12px 12px 26px",
        borderRadius: pill ? 12 : 16,
        background: pill ? "rgba(247,245,241,0.62)" : "rgba(247,245,241,0.5)",
        border: "0.5px solid " + (pill ? "rgba(20,18,16,0.12)" : "rgba(255,255,255,0.42)"),
        WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        backdropFilter: "blur(24px) saturate(1.8)",
        boxShadow: pill ? "0 8px 30px rgba(20,18,16,.1), inset 0 1px 0 rgba(255,255,255,.6)" : "0 8px 34px rgba(11,10,9,.18), inset 0 1px 0 rgba(255,255,255,.5)",
        transition: "background .65s var(--ease-unio), border-color .65s var(--ease-unio), padding .65s var(--ease-unio), max-width .65s var(--ease-unio), box-shadow .65s var(--ease-unio), border-radius .65s var(--ease-unio)",
      }}>
        <div style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
          <a href="index.html" style={{ display: "flex", alignItems: "center", flex: "0 0 auto", textDecoration: "none" }}>
            <img src="../../assets/logo/unio-logo-black.svg" alt="UNIO" style={{ height: 18, width: "auto", display: "block" }} />
          </a>
        </div>
        <span aria-hidden="true" style={{ flex: "1 1 0" }}></span>
        <nav style={{ display: "flex", gap: pill ? 22 : 28, flex: "0 0 auto", font: `500 ${pill ? 13 : 14}px var(--font-display)`, transition: "gap .65s var(--ease-unio), font-size .65s var(--ease-unio)" }}>
          {NAV_LINKS.map(([l, href]) => (
            <NavLink key={href} href={href} label={l} on={active === href} solid={true} />
          ))}
        </nav>
        <span aria-hidden="true" style={{ flex: "1 1 0" }}></span>
        <div style={{ display: "flex", justifyContent: "flex-end", flex: "0 0 auto" }}>
        <button onClick={c.onClick || undefined} style={{
          flex: "0 0 auto", cursor: "pointer", fontFamily: "var(--font-display)",
          fontSize: 13, fontWeight: 500, padding: "10px 20px", borderRadius: pill ? 8 : 999, whiteSpace: "nowrap",
          border: "0.5px solid " + (pill ? "var(--signal)" : "rgba(20,18,16,0.28)"),
          background: pill ? "var(--signal)" : "rgba(255,255,255,0.55)",
          color: pill ? "var(--on-signal)" : "var(--ink)",
          transition: "all .55s var(--ease-unio)",
        }}>{c.label}</button>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
}

/* Seiten-Hero mit Riffelglas-Streifen (Transparenz-Motiv) */
function PageHero({ img, pos = "center", headline, sub, children, height = "88vh", reveal = 0.55, glow = false }) {
  const [p, setP] = React.useState(0);
  const mob = useMobile();
  React.useEffect(() => {
    const on = () => setP(Math.min(1, window.scrollY / (window.innerHeight * 0.7)));
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section data-screen-label="Hero" style={{ position: "relative", background: "var(--paper)", padding: mob ? "82px 14px 0" : "98px 40px 0", overflow: "hidden" }}>
      {glow && <div className="u-herglow" aria-hidden="true" style={{ position: "absolute", left: "-10%", top: "10%", width: "55%", height: "80%", zIndex: 0, pointerEvents: "none", background: "radial-gradient(60% 60% at 20% 40%, rgba(255,170,9,.20) 0%, rgba(255,219,87,.10) 42%, transparent 72%)", animation: p !== undefined ? "heroGlowDrift 30s ease-in-out infinite alternate" : "none" }}></div>}
      <div style={{ position: "relative", height: mob ? "78svh" : height, minHeight: mob ? 440 : 520, overflow: "hidden", borderRadius: mob ? 18 : 22, border: "0.5px solid var(--hairline-dark)", boxShadow: "0 1px 0 rgba(255,255,255,.6) inset", background: "var(--ink)" }}>
        <FlutedGlass reveal={reveal + p * (1 - reveal)} side="left" strength={12} style={{ position: "absolute", inset: 0 }}>
          <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, display: "block" }} />
        </FlutedGlass>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.3), transparent 34%, transparent 52%, rgba(11,10,9,0.62))", pointerEvents: "none" }}></div>
        <div style={{ position: "absolute", left: mob ? 20 : "clamp(28px, 4vw, 60px)", right: mob ? 20 : "clamp(28px, 4vw, 60px)", bottom: mob ? 24 : "clamp(40px, 6vh, 60px)", color: "var(--text-inverse)" }}>
          <h1 style={{ margin: 0, font: `500 ${mob ? "clamp(34px, 9.4vw, 44px)" : "clamp(44px, 5.6vw, 96px)"}/1.02 var(--font-display)`, letterSpacing: "-0.03em", textShadow: "0 2px 40px rgba(0,0,0,0.4)", maxWidth: 980 }}>{headline}</h1>
          {sub && <p style={{ margin: mob ? "14px 0 0" : "22px 0 0", maxWidth: 500, font: `400 ${mob ? 15.5 : 18}px/1.55 var(--font-display)`, color: "var(--text-inverse-muted)" }}>{sub}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

/* Kapitel-Header (nr nur bei echten Aufzählungen setzen) */
function Chapter({ nr, title, copy, tone = "light", style }) {
  const dark = tone === "dark";
  const mob = useMobile();
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(U_RM);
  React.useEffect(() => {
    if (U_RM || !ref.current) return;
    const io = new IntersectionObserver((e) => setSeen(e[0].isIntersecting), { threshold: 0, rootMargin: "-12% 0px -12% 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const rev = (d) => ({ opacity: seen ? 1 : 0, filter: seen ? "blur(0)" : "blur(8px)", transform: seen ? "none" : "translateY(20px)", transition: `opacity 900ms var(--ease-unio) ${d}ms, filter 900ms var(--ease-unio) ${d}ms, transform 950ms var(--ease-unio) ${d}ms` });
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : (IST_V2 ? `${spalten(7)} minmax(0, 1fr)` : (nr ? "64px minmax(0, 1.35fr) minmax(0, 1fr)" : "minmax(0, 1.35fr) minmax(0, 1fr)")), gap: mob ? 16 : (IST_V2 ? RASTER_ABSTAND : 44), alignItems: mob ? "start" : "end", ...style }}>
      {nr ? <span style={{ font: "14px var(--font-mono)", color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)", paddingBottom: mob ? 0 : 8, ...rev(0) }}>{nr}</span> : null}
      <h2 style={{ margin: 0, font: `500 ${mob ? "clamp(30px, 8vw, 38px)" : "clamp(34px, 3.6vw, 60px)"}/1.06 var(--font-display)`, letterSpacing: "-0.03em", color: dark ? "var(--text-inverse)" : "var(--ink)", ...rev(90) }}>{title}</h2>
      {copy ? <p style={{ margin: 0, font: `400 ${mob ? 15.5 : 17}px/1.7 var(--font-display)`, color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)", maxWidth: 440, ...rev(180) }}>{copy}</p> : <span></span>}
    </div>
  );
}

/* Makler-Register (Demo-Stand): echte UNIO Partner, die live eine eigene Seite haben.
   slug = Pfad der Partnerseite auf www.unio.at (live: /marcus-weiss usw.).
   url: null heisst: noch keine eigene Seite, die Zeile ist dann nicht klickbar.
   In der Plattform kommt das aus agents[] des Objekts (siehe docs/makler-praesenz). */
const MAKLER_BASIS = "https://www.unio.at/";
const MAKLER_DB = {
  "marcus-weiss": { name: "Marcus Anthofer-Weiss", img: "../../assets/team/makler/marcus-anthofer-weiss.jpg?v=4", ed: "../../assets/team/editorial/marcus-anthofer-weiss", film: true, makler: true, region: "Wien und Umgebung", url: MAKLER_BASIS + "marcus-weiss" },
  "lara-jonas": { name: "Lara Jonas", img: "../../assets/team/makler/lara-jonas.jpg?v=4", ed: "../../assets/team/editorial/lara-jonas", film: true, makler: true, region: "Wien", url: MAKLER_BASIS + "lara-jonas" },
  "wenzel-waechter": { name: "Wenzel Wächter", img: "../../assets/team/makler/wenzel-waechter.jpg?v=4", ed: "../../assets/team/editorial/wenzel-waechter", film: true, makler: true, region: "Founder · Vertrieb", url: null },
  "nikita-neznamov": { name: "Nikita Neznamov", img: "../../assets/team/makler/nikita-neznamov.jpg?v=4", ed: "../../assets/team/editorial/nikita-neznamov", film: true, makler: true, region: "Founder · Technologie", url: null },
  "alexander-maurer": { name: "Alexander Maurer", img: "../../assets/team/makler/alexander-maurer.jpg?v=4", ed: "../../assets/team/editorial/alexander-maurer", film: true, makler: true, region: "Bezirk Mödling", url: MAKLER_BASIS + "alexander-maurer" },
  "philipp-trattner": { name: "Philipp Trattner", ed: "../../assets/team/editorial/philipp-trattner", film: true, makler: true, region: "Trattner & Söhne", url: "https://www.trattner-soehne.at" },
  /* Weitere Menschen bei UNIO (nur in der Uebersicht, nicht im Makler-Streifen).
     Positionen der Founder wie auf der Story-Seite (TEAM_PORTRAITS in page-story.jsx). */
  "johannes-lindner": { name: "Johannes Lindner", ed: "../../assets/team/editorial/johannes-lindner", film: true, region: "Founder · Vertrieb", url: null },
  "florian-hoermann": { name: "Florian Hörmann", ed: "../../assets/team/editorial/florian-hoermann", film: true, region: "Founder · Vertrieb", url: null },
  "fabian-fuhrmann": { name: "Fabian Fuhrmann", ed: "../../assets/team/editorial/fabian-fuhrmann", film: true, region: "Founder · Vertrieb", url: null },
  "jacob-kapsch": { name: "Jacob Kapsch", ed: "../../assets/team/editorial/jacob-kapsch", film: true, region: "Founder · Marketing", url: null },
  "daniel-hayden": { name: "Daniel Hayden", ed: "../../assets/team/editorial/daniel-hayden", film: true, region: "Founder · Marketing", url: null },
  "marcin-fituch": { name: "Marcin Fituch", ed: "../../assets/team/editorial/marcin-fituch", film: true, region: "Founder · Technologie", url: null },
};
/* Variante 2: Seiten mit einer 2 in der Adresse (/2, /makler2, /immobilien2 ...).
   Der Build setzt dort window.UNIO_V2. Variante 1 bleibt unveraendert, dort sind
   Makler-Kreis und CIRCLE-Gesichter aus. ?makler=1 schaltet sie lokal zum Testen ein. */
const MAKLER_SICHTBAR = typeof window !== "undefined" && (window.UNIO_V2 === true || /[?&]makler=1(&|$)/.test(location.search));
/* Raster: 12 Spalten, Abstand 24 Pixel, Rand 6vw. spalten(n) ist die exakte Breite von n Spalten
   inklusive der Abstaende dazwischen. Damit liegen auch Innenkanten auf dem Raster.
   Variante 1 behaelt ihre alten Masse. */
const RASTER_ABSTAND = 24;
const spalten = (n) => `calc((100% - ${11 * RASTER_ABSTAND}px) / 12 * ${n} + ${(n - 1) * RASTER_ABSTAND}px)`;
const IST_V2 = typeof window !== "undefined" && window.UNIO_V2 === true;
const maklerVon = (o) => (o && o.mk && MAKLER_DB[o.mk]) || null;
const maklerInitialen = (name) => (name || "").split(/[\s-]+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

/* Makler-Kreis: eine Komponente, feste Groessen (Karte 40, Objektseite 36, CIRCLE 116).
   Ohne Foto erscheinen Initialen auf Ink, nie ein leerer Kreis. */
function MaklerKreis({ m, size = 34, zoom = false }) {
  const [kaputt, setKaputt] = React.useState(false);
  return (
    <span style={{ position: "relative", flex: "none", display: "block", width: size, height: size, borderRadius: "50%", overflow: "hidden", background: "var(--ink)", boxShadow: "0 0 0 1px var(--hairline-dark)" }}>
      {m.img && !kaputt
        ? <img src={m.img} alt="" onError={() => setKaputt(true)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: m.pos || "center 30%", transform: zoom ? "scale(1.12)" : "scale(1)", transition: "transform var(--dur-fast) var(--ease-unio)" }} />
        : <span aria-hidden="true" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", font: `500 ${Math.round(size * 0.36)}px var(--font-display)`, letterSpacing: "0.02em", color: "var(--paper)" }}>{maklerInitialen(m.name)}</span>}
    </span>
  );
}

/* Makler-Marke: EIN Kreis im Objektbild, rechts oben. Kein weiterer Text, keine weitere Zeile.
   Maus oder Tastatur: der Name gleitet links heraus. Finger: Tippen fuehrt direkt zur Partnerseite.
   Liegt als eigenes Element ueber der Karte (kein Link im Link). oben/rechts = Abstand zur Kartenkante. */
function MaklerMarke({ m, oben = 20, rechts = 20 }) {
  const [h, setH] = React.useState(false);
  if (!m || !MAKLER_SICHTBAR) return null;
  const inhalt = (
    <React.Fragment>
      <span style={{ position: "relative", zIndex: 2, flex: "none", display: "block", borderRadius: "50%", boxShadow: h ? "0 0 0 2px rgba(253,252,250,1), 0 6px 18px rgba(11,10,9,0.4)" : "0 0 0 2px rgba(253,252,250,0.95), 0 4px 14px rgba(11,10,9,0.3)", transition: "box-shadow var(--dur-fast) var(--ease-unio)" }}>
        <MaklerKreis m={m} size={40} zoom={h} />
      </span>
      <span className="u-label" aria-hidden="true" style={{ position: "relative", zIndex: 1, marginRight: -18, paddingLeft: 14, paddingRight: 26, height: 30, display: "inline-flex", alignItems: "center", borderRadius: 15, whiteSpace: "nowrap", fontSize: 10, letterSpacing: "0.06em", background: "var(--glass-dark)", WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)", color: "var(--text-inverse)", boxShadow: "inset 0 0 0 1px var(--hairline-light)", pointerEvents: "none", opacity: h ? 1 : 0, transform: h ? "translateX(0)" : "translateX(14px)", transition: "opacity var(--dur-fast) var(--ease-unio), transform var(--dur-fast) var(--ease-unio)" }}>{m.name}</span>
    </React.Fragment>
  );
  const st = { position: "absolute", top: oben, right: rechts, zIndex: 3, display: "flex", flexDirection: "row-reverse", alignItems: "center", textDecoration: "none", borderRadius: 999 };
  const ev = { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false), onFocus: () => setH(true), onBlur: () => setH(false) };
  return m.url
    ? <a href={m.url} aria-label={m.name + ", betreut dieses Objekt. Profil ansehen"} style={st} {...ev}>{inhalt}</a>
    : <span title={m.name} style={st} {...ev}>{inhalt}</span>;
}

/* CIRCLE-Gesichter: die Community als Streifen grosser Editorial-Portraets (4:5).
   Der Name steht IM Bild, einzeilig, unten links. Keine Kreise mit Text darunter.
   Maus: das Portraet wird zum Film (5 Sekunden, stumm). Finger: der Film laeuft,
   sobald die Karte im Bild steht. Karte fuehrt zur Partnerseite, wenn es eine gibt.
   Eine Komponente fuer Startseite (fuer="suchende") und CIRCLE-Seite (fuer="makler").
   Zeigt nur Partner mit Editorial-Material (Feld ed). */
function CirclePortraet({ m, breite }) {
  const [an, setAn] = React.useState(false);
  const ref = React.useRef(null);
  const vid = React.useRef(null);
  const ruhig = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const touch = !!(window.matchMedia && matchMedia("(hover: none)").matches);
  React.useEffect(() => {
    if (!touch || ruhig || !ref.current || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((e) => setAn(e[0].intersectionRatio > 0.7), { threshold: [0, 0.7, 1] });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  React.useEffect(() => {
    const v = vid.current; if (!v) return;
    if (an && !ruhig) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } else { v.pause(); }
  }, [an]);
  const maus = touch ? {} : { onMouseEnter: () => setAn(true), onMouseLeave: () => setAn(false), onFocus: () => setAn(true), onBlur: () => setAn(false) };
  const st = { position: "relative", flex: "none", width: breite, aspectRatio: "4 / 5", borderRadius: "var(--r-card)", overflow: "hidden", display: "block", textDecoration: "none", background: "var(--ink)", scrollSnapAlign: "start" };
  const inhalt = (
    <React.Fragment>
      <img src={m.ed + ".jpg"} alt={"Porträt von " + m.name} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: an ? "scale(1.03)" : "scale(1)", transition: "transform var(--dur-slow) var(--ease-unio)" }} />
      {m.film && <video ref={vid} src={m.ed + ".mp4"} muted loop playsInline preload="none" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: an && !ruhig ? 1 : 0, transition: "opacity var(--dur-fast) var(--ease-unio)" }}></video>}
      <span aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0) 52%, rgba(11,10,9,0.66) 100%)" }}></span>
      <span style={{ position: "absolute", left: 20, right: 20, bottom: 18, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, color: "var(--text-inverse)" }}>
        <span style={{ minWidth: 0 }}>
          <span style={{ display: "block", font: "500 clamp(16px, 1.25vw, 19px)/1.15 var(--font-display)", letterSpacing: "-0.02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</span>
          <span className="u-label" style={{ display: "block", marginTop: 6, fontSize: 9.5, color: "rgba(247,245,241,0.78)" }}>{m.region}</span>
        </span>
        {m.url && <span aria-hidden="true" style={{ flex: "none", font: "14px var(--font-mono)", opacity: an ? 1 : 0.55, transform: an ? "translate(2px,-2px)" : "none", transition: "all var(--dur-fast) var(--ease-unio)" }}>↗</span>}
      </span>
    </React.Fragment>
  );
  return m.url
    ? <a ref={ref} href={m.url} aria-label={m.name + ", Profil ansehen"} style={st} {...maus}>{inhalt}</a>
    : <div ref={ref} style={st} {...maus}>{inhalt}</div>;
}
function CircleGesichter({ fuer = "suchende" }) {
  const mob = useMobile();
  if (!MAKLER_SICHTBAR) return null;
  const makler = fuer === "makler";
  const liste = Object.keys(MAKLER_DB).map((slug) => ({ slug, ...MAKLER_DB[slug] })).filter((m) => m.makler && m.ed);
  const breite = mob ? "72vw" : spalten(3);
  const band = React.useRef(null);
  const weiter = (r) => { const el = band.current; if (el) el.scrollBy({ left: r * (el.clientWidth + RASTER_ABSTAND) / 4 * 2, behavior: "smooth" }); };
  return (
    <section data-screen-label="CIRCLE Gesichter" className="u-grain" style={{ position: "relative", zIndex: 2, background: "var(--paper)", padding: mob ? "84px 6vw 96px" : "140px 6vw 150px" }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Kopf im selben Spaltenmass wie Chapter: Ueberschrift links, Text rechts auf derselben Linie */}
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : `${spalten(7)} minmax(0, 1fr)`, gap: mob ? 16 : RASTER_ABSTAND, alignItems: mob ? "start" : "end", marginBottom: mob ? 36 : 72 }}>
          <h2 style={{ margin: 0, font: `500 ${mob ? "clamp(30px, 8vw, 38px)" : "clamp(34px, 3.6vw, 60px)"}/1.06 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>
            {makler ? <span>Der CIRCLE<br />wächst.</span> : <span>Hinter jedem Objekt<br />steht ein Mensch.</span>}
          </h2>
          <div style={{ maxWidth: 440 }}>
            <p style={{ margin: 0, font: `400 ${mob ? 15.5 : 17}px/1.7 var(--font-display)`, color: "var(--text-muted)" }}>
              {makler
                ? "Im CIRCLE steht deine Person vorn: mit eigener Seite, eigenem Auftritt und sichtbar bei jedem deiner Objekte."
                : "Die Makler im CIRCLE kennen ihre Objekte und ihr Grätzl. Sie beraten persönlich, von der ersten Frage bis zum Notar."}
            </p>
            <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
              {makler
                ? <Button variant="signal" knob onClick={() => (location.hash = "bewerben")}>Platz im CIRCLE anfragen</Button>
                : <Button variant="solid" knob onClick={() => location.assign("makler.html")}>CIRCLE entdecken</Button>}
              <a href="partner.html" style={{ font: "500 14.5px var(--font-display)", color: "var(--ink)", textDecoration: "underline", textDecorationColor: "rgba(11,10,9,0.25)", textUnderlineOffset: 4 }}>Alle Partner ansehen</a>
            </div>
          </div>
        </div>
        <div ref={band} style={{ display: "flex", gap: mob ? 12 : RASTER_ABSTAND, overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", margin: mob ? "0 -6vw" : 0, padding: mob ? "0 6vw" : 0, scrollPaddingLeft: mob ? "6vw" : 0 }}>
          {liste.map((m) => <CirclePortraet key={m.slug} m={m} breite={breite} />)}
        </div>
        {/* Mehr als vier Menschen: zwei ruhige Pfeile rechts unter dem Streifen (nur Desktop) */}
        {!mob && liste.length > 4 && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
            {[[-1, "←", "Zurück"], [1, "→", "Weiter"]].map(([r, z, t]) => (
              <button key={t} type="button" aria-label={t} onClick={() => weiter(r)} style={{ width: 46, height: 46, borderRadius: "50%", border: "1px solid var(--hairline-dark)", background: "none", cursor: "pointer", font: "16px var(--font-mono)", color: "var(--ink)" }}>{z}</button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* Objektkarte (Fassung 2). Ruhig und eindeutig:
   - Kein Status-Pill, kein Punkt, keine Nachfrage-Zahl.
   - Der Status steht als schlichtes Wort am Anfang der Datenzeile ("Verfügbar", "Reserviert").
   - Ein Projekt ist sofort erkennbar: dunkle Marke "Projekt" im Bild, Datenzeile nennt
     die Einheiten, Preis beginnt mit "ab".
   - Makler als Kreis rechts oben im Bild. Zwei Links (Objekt, Makler), nie verschachtelt. */
function PropCard({ o, hov, onHov }) {
  const m = maklerVon(o);
  const pr = o.projekt;
  const daten = pr
    ? [pr.einheiten + " Einheiten", pr.frei != null ? pr.frei + " verfügbar" : null].filter(Boolean)
    : [o.qm + " m²", o.zi + " Zi."];
  return (
    <div
      onMouseEnter={onHov} onMouseLeave={() => onHov && onHov(false)}
      style={{ position: "relative", background: "var(--surface-raised)", borderRadius: "var(--r-card)", padding: 8, boxShadow: hov ? "inset 0 0 0 1px var(--hairline-dark), var(--shadow-soft)" : "inset 0 0 0 1px var(--hairline-dark)", transform: hov ? "translateY(-4px)" : "none", transition: "all var(--dur-fast) var(--ease-unio)" }}>
      <a href={PROJEKT_URL} style={{ textDecoration: "none", display: "block" }}>
        <div style={{ position: "relative", borderRadius: "calc(var(--r-card) - 8px)", overflow: "hidden" }}>
          <img src={o.img} alt={o.t} loading="lazy" style={{ display: "block", width: "100%", height: 210, objectFit: "cover", transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform var(--dur-slow) var(--ease-unio)" }} />
          {pr && (
            <span className="u-label" style={{ position: "absolute", left: 12, top: 12, fontSize: 10, padding: "7px 12px", borderRadius: 8, background: "var(--ink)", color: "var(--paper)" }}>Projekt</span>
          )}
        </div>
        <div style={{ padding: "16px 16px 14px" }}>
          <div style={{ font: "500 21px/1.15 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.t}</div>
          <div style={{ font: "400 15px/1.4 var(--font-display)", color: "var(--text-muted)", marginTop: 6 }}>{o.adr}</div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginTop: 16, paddingTop: 13, borderTop: "1px solid var(--hairline-dark)" }}>
            <span style={{ font: "400 14px/1.3 var(--font-display)", color: "var(--text-muted)", minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {!pr && <span style={{ fontWeight: 500, color: "var(--ink)" }}>{o.status || "Verfügbar"}</span>}
              {!pr && " · "}{daten.join(" · ")}
            </span>
            <span style={{ flex: "none", font: "500 16px/1.3 var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>{pr && o.price !== "Auf Anfrage" ? "ab " : ""}{o.price}</span>
          </div>
        </div>
      </a>
      <MaklerMarke m={m} />
    </div>
  );
}

/* ll = ungefähre Lage (Bezirks-Ebene) für die Kartenansicht — keine Adressen.
   qm/zi/score: Demo-Werte (Arbeitsstand). mk: Demo-Zuordnung auf MAKLER_DB. */
const OBJEKT_DB = [
  { img: "../../assets/img/albrecht.jpg", t: "Das Albrecht", adr: "Wien 1170, Hernals", projekt: { einheiten: 9 }, qm: 145, zi: 5, score: 94, price: "€ 1,85 Mio", q: "albrecht townhaus neubau 1170 hernals haus", ll: [48.2277, 16.3268], mk: "marcus-weiss" },
  { img: "../../assets/img/obenzwei.jpg", t: "ObenZwei", adr: "Wien 1020, Leopoldstadt", qm: 131, zi: 4, score: 89, price: "Auf Anfrage", q: "obenzwei penthouse terrasse 1020 leopoldstadt wohnung", ll: [48.2172, 16.3985], mk: "lara-jonas" },
  { img: "../../assets/img/beheim.jpg", t: "Penthouse Beheim", adr: "Beheimgasse, 1170 Wien", qm: 138, zi: 4, score: 91, price: "€ 1,70 Mio", q: "beheim penthouse erstbezug 1170 wohnung terrasse", ll: [48.2325, 16.3157], mk: "wenzel-waechter" },
  { img: "../../assets/img/vienna-garden.jpg", t: "Garten-Refugium", adr: "Wien-Umland, Wienerwald", qm: 210, zi: 6, score: 87, price: "€ 1,90 Mio", q: "haus garten pool gruen wienerwald refugium", ll: [48.1531, 16.2345], mk: "alexander-maurer" },
  { img: "../../assets/img/penthouse.jpg", t: "Penthouse über den Dächern", adr: "Wien 1010, Innere Stadt", qm: 178, zi: 5, score: 96, price: "€ 4,00 Mio", q: "penthouse dachterrasse innenstadt wohnung luxus", ll: [48.2091, 16.3713], mk: "marcus-weiss" },
  { img: "../../assets/img/int-kitchen.jpg", t: "Stadtwohnung mit Charakter", adr: "Wien 1040, Wieden", qm: 96, zi: 3, score: 88, price: "€ 890.000", q: "altbau wohnung saniert 1040 wieden kueche", ll: [48.1926, 16.3665], mk: "lara-jonas" },
];
/* Weitere Beispielobjekte, nur fuer die Suche in Variante 2 (Vorgabe Daniel, 20.11.2026: mehr Beispiele).
   Namen aus dem Repo (Startseite, Bautraeger-Seite). Flaeche, Zimmer, Lage und Makler sind Demo-Werte, Preise bewusst offen. */
const OBJEKT_MEHR = [
  { img: "../../assets/img/ecoluxe.jpg", t: "Villa Ecoluxe", adr: "Wien, Neubau mit Pool", qm: 240, zi: 6, price: "Auf Anfrage", q: "villa ecoluxe haus neubau pool garten", ll: [48.2455, 16.2710], mk: "marcus-weiss" },
  { img: "../../assets/img/maxingstrasse-zimmer.jpg", t: "Maxingstraße 72", adr: "Wien 1130, Hietzing", qm: 118, zi: 4, status: "Bieterverfahren", price: "Auf Anfrage", q: "maxingstrasse stilaltbau altbau wohnung 1130 hietzing", ll: [48.1820, 16.2990], mk: "nikita-neznamov" },
  { img: "../../assets/img/albrechts-fassade.jpg", t: "Albrechts Townhouses", adr: "Wien, Stilhaus mit Dachausbau", qm: 132, zi: 4, price: "Auf Anfrage", q: "albrechts townhouse haus neubau", ll: [48.2210, 16.3080], mk: "wenzel-waechter" },
  { img: "../../assets/img/albrechts-dachgeschoss.jpg", t: "Albrechts Dachgeschoss", adr: "Wien, Dachgeschoss im Stilhaus", qm: 104, zi: 3, price: "Auf Anfrage", q: "albrechts dachgeschoss penthouse wohnung", ll: [48.2222, 16.3105], mk: "wenzel-waechter" },
  { img: "../../assets/img/albrechts-wohnen.jpg", t: "Albrechts Gartenwohnung", adr: "Wien, Erdgeschoss mit Garten", qm: 96, zi: 3, price: "Auf Anfrage", q: "albrechts garten wohnung erdgeschoss", ll: [48.2198, 16.3060], mk: "alexander-maurer" },
];

/* Footer */
function SiteFooter() {
  const mob = useMobile();
  return (
    <footer data-screen-label="Footer" className="u-grain" style={{ position: "relative", overflow: "hidden", background: "var(--paper-2)", color: "var(--ink-2)", padding: mob ? "110px 6vw 36px" : "175px 6vw 44px" }}>
      <EmberGlow variant="still" corner="86% 88%" />
      <div style={{ position: "relative", zIndex: 1 }}>
      <h2 style={{ margin: 0, font: `500 ${mob ? "clamp(44px, 12.5vw, 60px)" : "clamp(58px, 7.2vw, 128px)"}/0.98 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>
        Move as one<span style={{ color: "var(--signal)" }}>.</span>
      </h2>
      <div style={{ display: "flex", gap: 12, marginTop: mob ? 28 : 36, flexWrap: "wrap" }}>
        <Button size="lg" variant="paper" knob onClick={() => (location.href = "kontakt.html?demo=1")}>Demo buchen</Button>
        <Button size="lg" variant="ghost" onClick={() => (location.href = "kontakt.html")}>Kontakt</Button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, auto)" : "repeat(4, auto)", justifyContent: "start", gap: mob ? "14px 40px" : "12px 48px", marginTop: mob ? 52 : 72, font: "400 14.5px var(--font-display)" }}>
        {NAV_LINKS.map(([l, href]) => (
          <a key={href} href={href} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{l}</a>
        ))}
        <a href="/wissen" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Wissen</a>
        <a href="https://app.unio.at/auth/redirect?callbackUrl=%2F" target="_blank" rel="noopener" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Login ↗</a>
        <a href={BEWERTUNG_URL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Bewertung ↗</a>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--hairline-dark)", marginTop: mob ? 40 : 56, paddingTop: 24, gap: 20, flexWrap: "wrap" }}>
        <img src="../../assets/logo/unio-logo-black.svg" alt="UNIO" style={{ height: 18, width: "auto" }} />
        <div style={{ display: "flex", gap: mob ? 18 : 28, alignItems: "center", flexWrap: "wrap" }}>
          <a href="impressum.html" style={{ font: "400 13px var(--font-display)", color: "var(--text-muted)", textDecoration: "none" }}>Impressum</a>
          <a href="datenschutz.html" style={{ font: "400 13px var(--font-display)", color: "var(--text-muted)", textDecoration: "none" }}>Datenschutz</a>
          <a href="agb.html" style={{ font: "400 13px var(--font-display)", color: "var(--text-muted)", textDecoration: "none" }}>AGB</a>
          <a href="https://www.instagram.com/unio.home/" target="_blank" rel="noopener" aria-label="UNIO auf Instagram" style={{ color: "var(--text-muted)", display: "inline-flex" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
          </a>
          <a href="https://www.linkedin.com/company/real-unio-gmbh/" target="_blank" rel="noopener" aria-label="UNIO auf LinkedIn" style={{ color: "var(--text-muted)", display: "inline-flex", marginLeft: mob ? -6 : -12 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
          </a>
        </div>
      </div>
      </div>
    </footer>
  );
}

/* ===== Software-Schicht-Bausteine (Startseiten-Briefing §3) ===== */
const U_RM = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
/* Globales Headline-Reveal: animiert alle Hero-/Section-Headlines (h1,h2) auf allen Seiten,
   beim Scroll-Eintritt, in beide Richtungen. Idempotent, überschreibt sich per IO neu. */
(() => {
  if (U_RM || window.__uHeadlineReveal) return;
  window.__uHeadlineReveal = true;
  const apply = (el, on) => {
    el.style.transition = "opacity 900ms cubic-bezier(.32,.72,0,1), transform 950ms cubic-bezier(.32,.72,0,1), filter 900ms cubic-bezier(.32,.72,0,1)";
    el.style.opacity = on ? "1" : "0";
    el.style.transform = on ? "none" : "translateY(22px)";
    el.style.filter = on ? "blur(0)" : "blur(9px)";
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => apply(e.target, e.isIntersecting)), { threshold: 0, rootMargin: "-12% 0px -12% 0px" });
  const scan = () => {
    document.querySelectorAll("section h1, section h2").forEach((el) => {
      if (el.dataset.rv || el.closest("[data-rv-skip]") || (el.style && el.style.filter)) return;
      el.dataset.rv = "1";
      const r = el.getBoundingClientRect();
      const vis = r.top < innerHeight && r.bottom > 0;
      apply(el, false);
      if (vis) requestAnimationFrame(() => requestAnimationFrame(() => apply(el, true)));
      io.observe(el);
    });
  };
  const boot = () => { scan(); setTimeout(scan, 500); setTimeout(scan, 1500); };
  if (document.readyState === "complete" || document.readyState === "interactive") setTimeout(boot, 200);
  else addEventListener("DOMContentLoaded", boot);
})();
(() => {
  if (document.getElementById("u-shared-anim-site")) return;
  const s = document.createElement("style");
  s.id = "u-shared-anim-site";
  s.textContent = [
    "@keyframes uPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,170,9,.55)}70%{box-shadow:0 0 0 7px rgba(255,170,9,0)}}",
    "@keyframes uPulseInv{0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,.6)}70%{box-shadow:0 0 0 8px rgba(255,255,255,0)}}",
    "@keyframes uCell{from{opacity:.14}to{opacity:.85}}",
    "@keyframes uDraw{to{stroke-dashoffset:0}}",
    "@keyframes uMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}",
    "@keyframes bMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}",
    "@keyframes emberDrift{0%{transform:translate3d(-5%,-3%,0) rotate(-3deg) scale(1)}50%{transform:translate3d(4%,5%,0) rotate(4deg) scale(1.12)}100%{transform:translate3d(-2%,3%,0) rotate(-5deg) scale(1.05)}}",
    "@keyframes heroGlowDrift{0%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(-6%,4.5%,0) scale(1.16)}100%{transform:translate3d(4%,-3%,0) scale(1.08)}}",
    "@media (prefers-reduced-motion: reduce){.u-herglow{animation:none!important}}",
    "@media (prefers-reduced-motion: reduce){.u-ember{animation:none!important}}",
    "@media (prefers-reduced-motion: reduce){.u-marquee{animation:none!important}}",
    /* Mobile: dekorative Kapitel-Marker ausblenden, iOS-Zoom auf Formularfeldern verhindern */
    "@media (max-width:767px){.u-kap{display:none!important}}",
    "@media (max-width:767px){input,select,textarea{font-size:16px!important}}",
    "html{-webkit-text-size-adjust:100%}",
    /* Hover-Feedback für alle Buttons und CTA-Links: dezente Aufhellung + Lift,
       Press bleibt das bestehende scale(0.985) */
    "@media (hover:hover){",
    "button{transition:filter .35s var(--ease-unio),transform .35s var(--ease-unio),box-shadow .35s var(--ease-unio)}",
    "button:hover:not(:disabled){filter:brightness(1.06)}",
    "button:active:not(:disabled){transform:scale(.985)}",
    "a[data-track]:hover{filter:brightness(1.08)}",
    "}",
    /* Tastatur-Navigation: sichtbarer Fokus im Signal-Stil */
    "a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,[tabindex]:focus-visible{outline:2px solid var(--signal)!important;outline-offset:3px;}",
    /* Skip-Link: unsichtbar bis fokussiert */
    ".u-skip{position:fixed;left:16px;top:-64px;z-index:120;background:var(--ink);color:var(--paper);font:500 14px var(--font-display);padding:12px 18px;border-radius:10px;text-decoration:none;transition:top .25s ease;}",
    ".u-skip:focus{top:16px;}",
  ].join("\n");
  document.head.appendChild(s);
})();

/* Tracking: data-track-Klicks an Vercel Web Analytics weiterreichen.
   (Web Analytics muss im Vercel-Dashboard des Projekts aktiviert sein.) */
(() => {
  if (window.__uTrack) return;
  window.__uTrack = true;
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  document.addEventListener("click", (e) => {
    const el = e.target && e.target.closest ? e.target.closest("[data-track]") : null;
    if (el) window.va("event", { name: el.getAttribute("data-track") });
  }, true);
})();

/* Live-Signal: Pill mit pulsierendem Orange-Punkt */
function LivePill({ label = "Live", dark = true, style }) {
  return (
    <span className="u-label" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10, padding: "6px 12px", borderRadius: "var(--r-pill)", background: dark ? "var(--glass-dark)" : "var(--surface-raised)", WebkitBackdropFilter: dark ? "blur(12px)" : "none", backdropFilter: dark ? "blur(12px)" : "none", boxShadow: dark ? "inset 0 0 0 1px var(--hairline-light)" : "inset 0 0 0 1px var(--hairline-dark)", color: dark ? "var(--text-inverse)" : "var(--ink-2)", ...style }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal)", animation: U_RM ? "none" : "uPulse 2.2s var(--ease-unio) infinite" }}></span>{label}
    </span>
  );
}

/* Ember-Signature (Direktive v2): Glüh-Zone in einer Ecke, driftet, nie unter Text. */
function EmberGlow({ variant = "signatur", corner = "92% 88%", style }) {
  const still = variant === "still";
  const mask = `radial-gradient(75% 75% at ${corner}, #000 35%, transparent 82%)`;
  return (
    <div className="u-ember" aria-hidden="true" style={{
      position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", willChange: "transform",
      animation: U_RM ? "none" : `emberDrift ${still ? 52 : 42}s ease-in-out infinite alternate`,
      opacity: still ? 0.55 : 0.85,
      filter: "blur(80px)",
      WebkitMaskImage: mask, maskImage: mask,
      background: [
        `radial-gradient(60% 70% at ${corner}, rgba(255,170,9,.34) 0%, rgba(255,170,9,.12) 44%, transparent 82%)`,
        "radial-gradient(56% 66% at 80% 78%, rgba(255,219,87,.34) 0%, rgba(255,219,87,.1) 46%, transparent 84%)",
        "radial-gradient(48% 56% at 66% 62%, rgba(255,170,9,.24) 0%, rgba(255,170,9,.06) 48%, transparent 86%)",
      ].join(", "),
      ...style,
    }}></div>
  );
}

/* Einblendungs-Grammatik: Hairline + Mono-Label + Wert, dockt an Fotos an */
function Annotation({ top, left, right, bottom, label, value, show = true, delay = 0, dark = true, lineSide = "left", style }) {
  const line = <span aria-hidden="true" style={{ width: 38, height: 1, background: dark ? "var(--hairline-light-strong)" : "rgba(11,10,9,0.4)", flex: "none" }}></span>;
  return (
    <div style={{ position: "absolute", top, left, right, bottom, display: "flex", alignItems: "center", zIndex: 5, opacity: show ? 1 : 0, transform: show ? "none" : "translateY(10px)", transition: `all 650ms var(--ease-unio) ${delay}ms`, pointerEvents: "none", ...style }}>
      {lineSide === "left" && line}
      <span style={{ background: dark ? "var(--glass-dark)" : "rgba(253,252,250,0.9)", WebkitBackdropFilter: "blur(14px)", backdropFilter: "blur(14px)", boxShadow: `inset 0 0 0 1px ${dark ? "var(--hairline-light)" : "var(--hairline-dark)"}`, borderRadius: 10, padding: "8px 12px", color: dark ? "var(--text-inverse)" : "var(--ink-2)" }}>
        <span className="u-label" style={{ display: "block", fontSize: 10, color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)" }}>{label}</span>
        {value && <span style={{ font: "13px var(--font-mono)", display: "block", marginTop: 3 }}>{value}</span>}
      </span>
      {lineSide === "right" && line}
    </div>
  );
}

/* Signal-Raster: Dreiecks-Raster mit driftenden Orange-Zellen */
function SignalRaster({ cols = 8, rows = 9, pulse = false, style }) {
  const cells = React.useMemo(() => Array.from({ length: cols * rows }, (_, i) => {
    const h = (i * 2654435761 + 971) % 1000;
    return { up: h % 2 === 0, sig: h % 11 === 0, dur: 2.6 + (h % 5) * 0.7, del: (h % 7) * 0.5 };
  }), [cols, rows]);
  return (
    <div aria-hidden="true" style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gridAutoRows: "1fr", width: "100%", height: "100%", ...style }}>
      {cells.map((c, i) => (
        <span key={i} style={{
          clipPath: c.up ? "polygon(50% 0, 0 100%, 100% 100%)" : "polygon(50% 100%, 0 0, 100% 0)",
          background: c.sig ? "var(--signal)" : "var(--paper-3)",
          opacity: c.sig ? 0.85 : 0.5,
          animation: U_RM ? "none" : `uCell ${pulse ? c.dur * 0.5 : c.dur}s ease-in-out ${c.del}s infinite alternate`,
        }}></span>
      ))}
    </div>
  );
}

/* UI-Miniatur: LENS-Browser mit selbstzeichnender Kurve */
function UIMiniLens({ width = 200, play = true, style }) {
  return (
    <div style={{ width, borderRadius: 12, overflow: "hidden", background: "var(--surface-raised)", boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)", ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "7px 10px", background: "var(--paper-2)", borderBottom: "1px solid var(--hairline-dark)" }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--paper-3)" }}></span>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--paper-3)" }}></span>
        <span style={{ font: "10px var(--font-mono)", color: "var(--text-muted)", marginLeft: 5, letterSpacing: "0.06em" }}>app.unio.at · LENS</span>
        <span style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: "var(--signal)", animation: U_RM ? "none" : "uPulse 2.2s var(--ease-unio) infinite" }}></span>
      </div>
      <div style={{ padding: "10px 10px 8px" }}>
        <svg viewBox="0 0 120 44" style={{ width: "100%", display: "block" }} aria-hidden="true">
          <line x1="0" y1="36" x2="120" y2="36" stroke="var(--hairline-dark)" strokeWidth="1" />
          <polyline points="2,34 22,30 40,31 58,24 76,20 94,12 118,6" fill="none" stroke="var(--signal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            style={{ strokeDasharray: 150, strokeDashoffset: U_RM || !play ? 0 : 150, animation: U_RM || !play ? "none" : "uDraw 1.8s var(--ease-unio) 300ms forwards" }} />
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ font: "10px var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase" }}>Anfragen</span>
          <span style={{ font: "10px var(--font-mono)", color: "var(--signal-deep)" }}>↗</span>
        </div>
      </div>
    </div>
  );
}

/* Scrub-Helper: Scroll-Progress 0..1 innerhalb einer gepinnten Sektion */
function usePinProgress() {
  const ref = React.useRef(null);
  const [p, setP] = React.useState(U_RM ? 1 : 0);
  React.useEffect(() => {
    if (U_RM) return;
    /* Scroll-Events auf Frames buendeln: ein Messen + setState pro rAF statt pro Event,
       sonst rendert jeder Pin auf Mobilgeraeten mehrfach pro Frame (Ruckeln). */
    let raf = 0;
    const messen = () => {
      raf = 0;
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      setP(Math.min(1, Math.max(0, -r.top / total)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(messen); };
    messen();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { if (raf) cancelAnimationFrame(raf); window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  return [ref, p];
}

/* Porträt-Datenkarte (Health-Card-Referenz): runder Hairline-Frame auf dem Bild,
   große Kennzahl + ↗, Sparkline mit Punkten, Caption unten */
function StatFrame({ value, unit, label, caption, graph = "spark", children, spark = [4, 2.6, 5, 3.4, 6, 7.4], marks = ["Q1", "Q2", "Q3"], show = true, delay = 0, inset = 14, style }) {
  const max = Math.max(...spark), min = Math.min(...spark);
  const pts = spark.map((p, i) => `${4 + (i / (spark.length - 1)) * 92},${30 - ((p - min) / (max - min)) * 24}`);
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset, borderRadius: 18, border: "1px solid rgba(255,255,255,0.55)", zIndex: 5, pointerEvents: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "16px 16px 12px", color: "#FFFFFF", textShadow: "0 1px 14px rgba(0,0,0,0.45)", opacity: show ? 1 : 0, transition: `opacity 800ms var(--ease-unio) ${delay}ms`, ...style }}>
      <div style={{ transform: show ? "none" : "translateY(-8px)", transition: `transform 800ms var(--ease-unio) ${delay}ms` }}>
        <span style={{ font: "500 clamp(26px, 2.4vw, 38px)/1 var(--font-display)", letterSpacing: "-0.02em" }}>
          {value}{unit && <span style={{ fontSize: "0.5em", fontWeight: 400, marginLeft: 3 }}>{unit}</span>}
          <span style={{ font: "12px var(--font-mono)", marginLeft: 7, verticalAlign: "6px" }}>↗</span>
        </span>
        <div className="u-label" style={{ fontSize: 10, marginTop: 7, color: "rgba(255,255,255,0.92)", maxWidth: "14ch", lineHeight: 1.5 }}>{label}</div>
      </div>
      <div style={{ transform: show ? "none" : "translateY(8px)", transition: `transform 800ms var(--ease-unio) ${delay}ms` }}>
        {children}
        {graph === "spark" && (
          <div>
            <svg viewBox="0 0 100 34" preserveAspectRatio="none" style={{ width: "100%", height: 34, display: "block" }}>
              <polyline points={pts.join(" ")} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.1" vectorEffect="non-scaling-stroke" />
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "4px 2px 0" }}>
              {marks.map((m) => <span key={m} style={{ font: "10px var(--font-mono)", letterSpacing: "0.08em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>{m}</span>)}
            </div>
          </div>
        )}
        {caption && <p style={{ margin: "9px 0 0", font: "400 11px/1.45 var(--font-display)", color: "rgba(255,255,255,0.92)", textAlign: "center" }}>{caption}</p>}
      </div>
    </div>
  );
}

/* AI-ready FAQ — eine Komponente, beide Seiten. Antworten immer im DOM,
   FAQPage-JSON-LD wortgleich, natives button[aria-expanded]-Akkordeon. */
function FaqBlock({ nr = "10", label = "Fragen", title, subline, items = [], anchor, defaultOpen = 0 }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const mob = useMobile();
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(U_RM);
  React.useEffect(() => {
    const id = "faq-jsonld-" + nr;
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.id = id;
      s.textContent = JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      });
      document.head.appendChild(s);
    }
  }, [nr]);
  React.useEffect(() => {
    if (U_RM || !ref.current) return;
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} data-track={"chapter_view_" + nr} data-screen-label={label} className="u-grain" style={{ position: "relative", background: "var(--paper)", padding: mob ? "110px 6vw 110px" : "175px 7vw 175px" }}>
      <div aria-hidden="true" className="u-kap" style={{ position: "absolute", left: "2.4vw", top: 96, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <span style={{ font: "11px var(--font-mono)", color: "var(--text-muted)" }}>{nr}</span>
        <span style={{ width: 1, height: 54, background: "var(--hairline-dark)" }}></span>
        <span className="u-label" style={{ fontSize: 10, color: "var(--text-muted)", writingMode: "vertical-rl" }}>{label}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "minmax(0, 0.8fr) minmax(0, 1.2fr)", gap: mob ? 36 : 48, position: "relative" }}>
        <div style={{ alignSelf: "start", opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(18px)", transition: "all 700ms var(--ease-unio)" }}>
          <h2 style={{ margin: 0, font: "500 clamp(30px, 3vw, 48px)/1.05 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>{title}</h2>
          {subline && <p style={{ margin: "16px 0 0", font: "400 16px/1.6 var(--font-display)", color: "var(--text-muted)", maxWidth: 340 }}>{subline}</p>}
        </div>
        <div>
          {items.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} style={{ borderTop: "1px solid var(--hairline-dark)", opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(18px)", transition: `all 600ms var(--ease-unio) ${i * 70}ms` }}>
                <h3 style={{ margin: 0 }}>
                  <button aria-expanded={isOpen} aria-controls={"faq-" + nr + "-" + i} id={"faqq-" + nr + "-" + i}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, padding: "22px 0", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                    <span style={{ font: "500 18px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>{q}</span>
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" style={{ flex: "none" }} aria-hidden="true">
                      <path d="M2 8h12"></path>
                      <path d="M8 2v12" style={{ transformOrigin: "center", transform: isOpen ? "scaleY(0)" : "scaleY(1)", transition: "transform 360ms var(--ease-unio)" }}></path>
                    </svg>
                  </button>
                </h3>
                <div id={"faq-" + nr + "-" + i} role="region" aria-labelledby={"faqq-" + nr + "-" + i}
                  style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0, transition: "grid-template-rows 360ms var(--ease-unio), opacity 360ms var(--ease-unio)" }}>
                  <div style={{ overflow: "hidden" }}>
                    <p style={{ margin: "0 0 22px", font: "400 15.5px/1.65 var(--font-display)", color: "var(--text-muted)", maxWidth: 600 }}>
                      {a}
                      {items[i][2] && (
                        <a href={items[i][2].href} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginLeft: 10, font: "500 14.5px var(--font-display)", color: "var(--signal-deep)", textDecoration: "none", borderBottom: "1px solid var(--signal)", paddingBottom: 1 }}>
                          {items[i][2].label} <span style={{ font: "11px var(--font-mono)" }}>→</span>
                        </a>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {anchor && (
            <div style={{ borderTop: "1px solid var(--hairline-dark)", display: "flex", alignItems: "center", gap: 14, padding: "24px 0 0", opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(18px)", transition: `all 600ms var(--ease-unio) ${items.length * 70}ms` }}>
              {anchor.img && <img src={anchor.img} alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", objectPosition: "center 22%", flex: "none" }} />}
              <p style={{ margin: 0, font: "400 15px/1.55 var(--font-display)", color: "var(--ink-2)" }}>
                {anchor.text} <a href="kontakt.html" style={{ color: "var(--signal-deep)", textDecoration: "none", borderBottom: "1px solid var(--signal)" }}>{anchor.link}</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* Raster zur Kontrolle: ?raster=1 legt 12 Spalten ueber die Seite
   (Rand 6vw, Abstand 24 Pixel). Taste G blendet es ein und aus. Nur ein Pruefwerkzeug. */
(function () {
  if (typeof document === "undefined") return;
  let el = null;
  const zeig = (an) => {
    if (!el) {
      el = document.createElement("div");
      el.setAttribute("aria-hidden", "true");
      el.style.cssText = "position:fixed;inset:0;z-index:99999;pointer-events:none;padding:0 6vw;display:grid;grid-template-columns:repeat(12,1fr);gap:24px;";
      for (let i = 0; i < 12; i++) { const c = document.createElement("div"); c.style.cssText = "background:rgba(255,170,9,0.10);box-shadow:inset 1px 0 0 rgba(255,120,0,0.45),inset -1px 0 0 rgba(255,120,0,0.45);"; el.appendChild(c); }
      document.body.appendChild(el);
    }
    el.style.display = an ? "grid" : "none";
  };
  let an = /[?&]raster=1(&|$)/.test(location.search);
  if (an) { if (document.body) zeig(true); else document.addEventListener("DOMContentLoaded", () => zeig(true)); }
  document.addEventListener("keydown", (e) => {
    if ((e.key === "g" || e.key === "G") && !e.metaKey && !e.ctrlKey && !/input|textarea|select/i.test((e.target.tagName || ""))) { an = !an; zeig(an); }
  });
})();

/* ---------- Bewegte Bilder (Variante 2) ----------
   Das Haus steht still, nur die Menschen gehen. Standbild und Film sind deckungsgleich (leb-<name>.jpg ist das erste Bild
   von leb-<name>.mp4). wann: "sicht" (laeuft, solange sichtbar), "hover" (laeuft nur bei an=true), "nie".
   Namen: fruehling, herbst, cafe, dazu je eine Fassung im Stil der Makler-Filme: fruehling-circle, herbst-circle, cafe-circle. */
const LEB_ALT = { fruehling: "Straßenansicht mit Altbau und ausgebautem Dach", herbst: "Straßenansicht im Herbst mit Neubau und Altbau", cafe: "Eckhaus mit Café im Erdgeschoss" };
function LebBild({ bild: wunsch, wann = "sicht", an, pos, stil, genau }) {
  /* Variante 3 (window.UNIO_FILM === "circle") zeigt ueberall die schnellere Fassung. genau: Name unveraendert nehmen. */
  const bild = !genau && window.UNIO_FILM === "circle" && !/-circle$/.test(wunsch) ? wunsch + "-circle" : wunsch;
  const ruhig = U_RM;
  const ref = React.useRef(null);
  const vid = React.useRef(null);
  const [sicht, setSicht] = React.useState(false);
  const [bereit, setBereit] = React.useState(false);
  React.useEffect(() => {
    if (wann !== "sicht" || ruhig || !ref.current || typeof IntersectionObserver !== "function") return;
    const io = new IntersectionObserver(([e]) => setSicht(e.isIntersecting), { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [wann]);
  const laeuft = !ruhig && (wann === "sicht" ? sicht : wann === "hover" ? !!an : false);
  React.useEffect(() => { const v = vid.current; if (!v) return; if (laeuft) { const q = v.play(); if (q && q.catch) q.catch(() => {}); } else v.pause(); }, [laeuft, bereit]);
  React.useEffect(() => { setBereit(false); }, [bild]);
  const voll = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: pos || "center" };
  const basis = "../../assets/video/leb-" + bild;
  return (
    <div ref={ref} style={{ position: "relative", overflow: "hidden", background: "var(--paper-2)", ...stil }}>
      <img src={basis + ".jpg"} alt={LEB_ALT[bild.replace("-circle", "")] || ""} loading="lazy" style={voll} />
      {!ruhig && wann !== "nie" && (sicht || an || bereit) && <video key={bild} ref={vid} src={basis + ".mp4"} muted loop playsInline preload="auto" aria-hidden="true" onCanPlay={() => setBereit(true)} style={{ ...voll, opacity: bereit && (laeuft || wann === "sicht") ? 1 : 0, transition: "opacity 500ms ease" }}></video>}
    </div>
  );
}
/* Stoerer fuer die Trefferliste. Alle drei haben dieselbe Kartenrundung und sitzen auf dem Raster der Liste. */
function StoererBreit({ bild = "herbst", stil }) {
  return (
    <div style={{ position: "relative", minHeight: 320, borderRadius: "var(--r-card)", overflow: "hidden", ...stil }}>
      <LebBild bild={bild} stil={{ position: "absolute", inset: 0 }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(11,10,9,0.66), rgba(11,10,9,0.14) 64%, rgba(11,10,9,0))" }}></div>
      <div style={{ position: "absolute", left: 28, bottom: 28, right: 28, maxWidth: 400 }}>
        <span className="u-label" style={{ fontSize: 10, color: "rgba(247,245,241,0.8)" }}>Für Eigentümer</span>
        <p style={{ margin: "10px 0 0", font: "500 clamp(24px, 2.3vw, 36px)/1.05 var(--font-display)", letterSpacing: "-0.03em", color: "var(--text-inverse)" }}>Du willst verkaufen?</p>
        <p style={{ margin: "10px 0 20px", font: "400 16px/1.55 var(--font-display)", color: "rgba(247,245,241,0.86)" }}>Erfahre in wenigen Minuten, was deine Immobilie wert ist.</p>
        <Button variant="signal" knob data-track="stoerer_bewerten" onClick={() => window.open(BEWERTUNG_URL, "_blank")}>Immobilie kostenlos bewerten</Button>
      </div>
    </div>
  );
}
function StoererKarte({ bild = "fruehling", pos = "30% center" }) {
  const [an, setAn] = React.useState(false);
  return (
    <a href="kontakt.html" data-track="stoerer_vormerken" onMouseEnter={() => setAn(true)} onMouseLeave={() => setAn(false)} style={{ display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box", textDecoration: "none", background: "var(--signal)", borderRadius: "var(--r-card)", padding: 8 }}>
      <LebBild bild={bild} wann="hover" an={an} pos={pos} stil={{ height: 210, flex: "none", borderRadius: "calc(var(--r-card) - 8px)" }} />
      <div style={{ padding: "16px 16px 14px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ font: "500 21px/1.15 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", whiteSpace: "nowrap" }}>Zuerst bei UNIO</div>
        <div style={{ font: "400 15px/1.4 var(--font-display)", color: "rgba(11,10,9,0.74)", marginTop: 6 }}>Projekte vor dem Vermarktungsstart</div>
        <div style={{ marginTop: "auto", paddingTop: 13, borderTop: "1px solid rgba(11,10,9,0.22)", display: "flex", justifyContent: "space-between", alignItems: "baseline", font: "500 16px/1.3 var(--font-display)", color: "var(--ink)" }}><span>Vormerken</span><span aria-hidden="true" style={{ font: "14px var(--font-mono)" }}>→</span></div>
      </div>
    </a>
  );
}
function StoererZeile({ bild = "cafe", pos = "60% 70%", stil }) {
  const mob = useMobile();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: mob ? 14 : 24, padding: 8, paddingRight: mob ? 8 : 20, borderRadius: "var(--r-card)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", background: "var(--surface-raised)", flexWrap: mob ? "wrap" : "nowrap", ...stil }}>
      <LebBild bild={bild} pos={pos} stil={{ flex: "none", width: mob ? "100%" : 200, height: 112, borderRadius: "calc(var(--r-card) - 8px)" }} />
      <span style={{ flex: 1, minWidth: 0, padding: mob ? "0 8px" : 0 }}>
        <span style={{ display: "block", font: "500 20px/1.2 var(--font-display)", letterSpacing: "-0.015em", color: "var(--ink)" }}>Nichts Passendes dabei?</span>
        <span style={{ display: "block", font: "400 15px/1.5 var(--font-display)", color: "var(--text-muted)", marginTop: 5 }}>Sag uns, was du suchst. Ein Makler aus dem CIRCLE meldet sich.</span>
      </span>
      <span style={{ flex: "none", padding: mob ? "0 0 8px 8px" : 0 }}><Button variant="ghost" size="sm" data-track="stoerer_suchauftrag" onClick={() => location.assign("kontakt.html")}>Suche beschreiben</Button></span>
    </div>
  );
}


/* Startscreen mit Film (Variante 2). Karte so breit wie die Navigation, bleibt am Desktop stehen, der naechste Abschnitt schiebt sich darueber. */
function HeroFilm({ bild, zeilen, marke, text, knoepfe = [], unten, klein, fest }) {
  const mob = useMobile();
  return (
    <section id="top" data-screen-label="Hero" style={{ position: fest && !mob && !U_RM ? "sticky" : "relative", top: 0, zIndex: 0, background: "var(--paper)", padding: mob ? "82px 14px 0" : `98px 40px ${unten || "0"}` }}>
      <div style={{ position: "relative", height: mob ? "min(78svh, 620px)" : "calc(100svh - 120px)", minHeight: mob ? 480 : 520, borderRadius: mob ? 18 : 22, overflow: "hidden", background: "var(--ink)" }}>
        <LebBild bild={bild} stil={{ position: "absolute", inset: 0 }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.3), rgba(11,10,9,0.04) 30%, rgba(11,10,9,0.5) 68%, rgba(11,10,9,0.82))" }}></div>
        <div style={{ position: "absolute", left: mob ? 22 : "calc(6vw - 40px)", right: mob ? 22 : "calc(6vw - 40px)", bottom: mob ? 26 : "clamp(36px, 6vh, 64px)", display: "grid", gridTemplateColumns: mob ? "1fr" : `${spalten(7)} minmax(0, 1fr)`, gap: 24, alignItems: "end" }}>
          <h1 style={{ margin: 0, font: `500 ${mob ? (klein ? "clamp(30px, 8.4vw, 42px)" : "clamp(36px, 10.5vw, 54px)") : (klein ? "clamp(38px, 4.3vw, 78px)" : "clamp(48px, 6vw, 108px)")}/${klein ? 1.02 : 0.96} var(--font-display)`, letterSpacing: "-0.04em", color: "var(--text-inverse)" }}>
            {zeilen.map((z, k) => <span key={z} style={{ display: "block", whiteSpace: mob ? "normal" : "nowrap" }}>{z}{k === zeilen.length - 1 && <span style={{ color: "var(--signal)" }}>.</span>}</span>)}
          </h1>
          <div>
            {marke && <p className="u-label" style={{ margin: "0 0 12px", fontSize: 10, color: "rgba(247,245,241,0.8)" }}>{marke}</p>}
            <p style={{ margin: 0, maxWidth: 440, font: `400 ${mob ? 15.5 : 17}px/1.6 var(--font-display)`, color: "rgba(247,245,241,0.92)" }}>{text}</p>
            {knoepfe.length > 0 && <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
              {knoepfe.map(([t, auf], k) => k === 0 ? <Button key={t} size="lg" variant="paper" knob data-track="hero_cta_primary" onClick={auf}>{t}</Button> : <Button key={t} size="lg" variant="glass" tone="dark" data-track="hero_cta_secondary" onClick={auf}>{t}</Button>)}
            </div>}
          </div>
        </div>
      </div>
    </section>
  );
}
/* Umschalter unten links: Film oder bisheriger Hero. Adresse: ?hero=film | alt.
   Welche Film-Fassung laeuft, bestimmt die Variante: /…2 ruhig, /…3 schneller im Stil der Makler-Filme. */
function HeroSchalter({ alt, film }) {
  const m = (location.search.match(/[?&]hero=([a-z]+)/) || [])[1] === "alt" ? "alt" : "film";
  const liste = [["film", "Film", "Startscreen mit Film"], ["alt", "Bisher", "Bisheriger Hero"]];
  return (
    <React.Fragment>
      {m === "alt" ? alt : film("")}
      <nav aria-label="Hero-Fassungen" style={{ position: "fixed", left: 16, bottom: 16, zIndex: 80, display: "flex", alignItems: "center", gap: 4, padding: "6px 8px 6px 14px", borderRadius: 999, background: "var(--ink)", color: "var(--paper)", boxShadow: "0 10px 30px rgba(11,10,9,0.25)" }}>
        <span className="u-label" style={{ fontSize: 9.5, color: "rgba(247,245,241,0.7)", marginRight: 6 }}>Hero</span>
        {liste.map(([k, z, t]) => <a key={k} href={"?hero=" + k} title={t} aria-current={k === m ? "true" : undefined} style={{ height: 30, padding: "0 12px", borderRadius: 999, display: "grid", placeItems: "center", textDecoration: "none", whiteSpace: "nowrap", font: "500 12.5px var(--font-display)", background: k === m ? "var(--signal)" : "transparent", color: k === m ? "#1A1305" : "var(--paper)" }}>{z}</a>)}
      </nav>
    </React.Fragment>
  );
}
/* Flacher Stoerer mit Film ueber die ganze Seitenbreite, ohne Kasten. Fuehrt in die Suche (Startseite nach dem Versprechen).
   Der Film sitzt unten buendig, damit die Menschen auf dem Gehsteig im Ausschnitt bleiben. Der Text steht oben, frei davon. */
function StoererBand({ bild = "herbst", pos = "center 100%" }) {
  const mob = useMobile();
  return (
    <section data-screen-label="Stoerer Immobilien" style={{ position: "relative", zIndex: 1, height: mob ? 380 : "clamp(340px, 44vh, 460px)", overflow: "hidden", background: "var(--ink)" }}>
      <LebBild bild={bild} pos={pos} stil={{ position: "absolute", inset: 0 }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,10,9,0.74), rgba(11,10,9,0.42) 34%, rgba(11,10,9,0) 62%)" }}></div>
      <div style={{ position: "absolute", left: "6vw", right: "6vw", top: mob ? 28 : "clamp(30px, 5vh, 52px)", display: "flex", flexDirection: mob ? "column" : "row", alignItems: mob ? "flex-start" : "center", justifyContent: "space-between", gap: 20 }}>
        <p style={{ margin: 0, font: `500 ${mob ? "clamp(26px, 7.4vw, 34px)" : "clamp(30px, 3.2vw, 52px)"}/1.04 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--text-inverse)" }}>Entdecke weitere Immobilien<br />in unserer Suche.</p>
        <Button size="lg" variant="paper" knob data-track="stoerer_immobilien" onClick={() => location.assign("immobilien.html")}>Alle Immobilien</Button>
      </div>
    </section>
  );
}

Object.assign(window, {
  UNIO_APP_URL: APP_URL, UNIO_BEWERTUNG_URL: BEWERTUNG_URL, UNIO_SEARCH_URL: SEARCH_URL,
  useTick, useMobile, Reveal, SiteNav, PageHero, Chapter, PropCard, OBJEKT_DB, SiteFooter, FaqBlock,
  MAKLER_DB, maklerVon, MaklerKreis, MaklerMarke, CircleGesichter, CirclePortraet, spalten, RASTER_ABSTAND, IST_V2,
  U_RM, LivePill, Annotation, SignalRaster, UIMiniLens, usePinProgress, StatFrame, EmberGlow,
  submitLead, validEmail, LeadError,
  LebBild, StoererBreit, StoererKarte, StoererZeile, StoererBand, HeroFilm, HeroSchalter, OBJEKT_MEHR,
});
