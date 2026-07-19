/* UNIO Website — geteilte Bausteine für alle Seiten.
   Lädt vor den Seiten-Skripten; exportiert über window. */
const {
  GlassPanel, GlassCard, DataOverlay, FlutedGlass, StatBlock, DataLabel,
  Button, IconButton, Chip, Tag, Input, Select,
} = window.UNIODesignSystem_b6216a;

const APP_URL = "https://app.unio.at";
const BEWERTUNG_URL = "https://bewertung.unio.at";
const SEARCH_URL = "https://app.unio.at/listing?listingType=SALE";
const PROJEKT_URL = "projekt.html";

/* Mobile-Breakpoint: eine Quelle für alle Seiten (< 900px = mobil/klein) */
const U_MQ_MOBILE = window.matchMedia ? window.matchMedia("(max-width: 899px)") : null;
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
  ["Immobilien", "immobilien.html"],
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
  const c = cta || { label: "Login", onClick: () => window.open("https://app.unio.at", "_blank") };
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
  if (mob) {
    const line = (r) => ({ display: "block", width: 18, height: 1.5, background: "var(--ink)", borderRadius: 2, transition: "transform 400ms var(--ease-unio), opacity 300ms", transformOrigin: "center", transform: r });
    return (
      <React.Fragment>
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
            <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 9 }}>UNIO · Wien · app.unio.at</span>
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
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60, padding: pill ? "16px 40px" : "22px 6vw", transition: "padding .55s var(--ease-unio)" }}>
      <div style={{
        width: "100%", maxWidth: pill ? 760 : "none", margin: "0 auto",
        display: "flex", alignItems: "center",
        padding: pill ? "9px 10px 9px 22px" : "12px 12px 12px 26px",
        borderRadius: pill ? 12 : 16,
        background: pill ? "rgba(247,245,241,0.62)" : "rgba(247,245,241,0.5)",
        border: "0.5px solid " + (pill ? "rgba(20,18,16,0.12)" : "rgba(255,255,255,0.42)"),
        WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        backdropFilter: "blur(24px) saturate(1.8)",
        boxShadow: pill ? "0 8px 30px rgba(20,18,16,.1), inset 0 1px 0 rgba(255,255,255,.6)" : "0 8px 34px rgba(11,10,9,.18), inset 0 1px 0 rgba(255,255,255,.5)",
        transition: "background .55s var(--ease-unio), border-color .55s var(--ease-unio), padding .55s var(--ease-unio), max-width .55s var(--ease-unio), box-shadow .55s var(--ease-unio), border-radius .55s var(--ease-unio)",
      }}>
        <div style={{ flex: pill ? "0 0 auto" : "1 1 0", display: "flex", alignItems: "center" }}>
          <a href="index.html" style={{ display: "flex", alignItems: "center", flex: "0 0 auto", textDecoration: "none" }}>
            <img src="../../assets/logo/unio-logo-black.svg" alt="UNIO" style={{ height: 18, width: "auto", display: "block" }} />
          </a>
        </div>
        <nav style={{ display: "flex", gap: pill ? 22 : 28, marginLeft: pill ? 30 : 0, font: `500 ${pill ? 13 : 14}px var(--font-display)`, transition: "gap .55s var(--ease-unio)" }}>
          {NAV_LINKS.map(([l, href]) => (
            <NavLink key={href} href={href} label={l} on={active === href} solid={true} />
          ))}
        </nav>
        <div style={{ flex: pill ? "0 0 auto" : "1 1 0", display: "flex", justifyContent: "flex-end", marginLeft: pill ? "auto" : 0 }}>
        <button onClick={c.onClick || undefined} style={{
          flex: "0 0 auto", cursor: "pointer", fontFamily: "var(--font-display)",
          fontSize: 13, fontWeight: 500, padding: "10px 20px", borderRadius: pill ? 8 : 999,
          border: "0.5px solid " + (pill ? "var(--signal)" : "rgba(20,18,16,0.28)"),
          background: pill ? "var(--signal)" : "rgba(255,255,255,0.55)",
          color: pill ? "var(--on-signal)" : "var(--ink)",
          transition: "all .4s var(--ease-unio)",
        }}>{c.label}</button>
        </div>
      </div>
    </div>
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
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : (nr ? "64px minmax(0, 1.35fr) minmax(0, 1fr)" : "minmax(0, 1.35fr) minmax(0, 1fr)"), gap: mob ? 16 : 44, alignItems: mob ? "start" : "end", ...style }}>
      {nr ? <span style={{ font: "14px var(--font-mono)", color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)", paddingBottom: mob ? 0 : 8, ...rev(0) }}>{nr}</span> : null}
      <h2 style={{ margin: 0, font: `500 ${mob ? "clamp(30px, 8vw, 38px)" : "clamp(34px, 3.6vw, 60px)"}/1.06 var(--font-display)`, letterSpacing: "-0.03em", color: dark ? "var(--text-inverse)" : "var(--ink)", ...rev(90) }}>{title}</h2>
      {copy ? <p style={{ margin: 0, font: `400 ${mob ? 15.5 : 17}px/1.7 var(--font-display)`, color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)", maxWidth: 440, ...rev(180) }}>{copy}</p> : <span></span>}
    </div>
  );
}

/* Objektkarte (Endkunde — ohne B2B-Metriken) */
function PropCard({ o, hov, onHov }) {
  return (
    <a href={PROJEKT_URL}
      onMouseEnter={onHov} onMouseLeave={() => onHov && onHov(false)}
      style={{ textDecoration: "none", display: "block", background: "var(--surface-raised)", borderRadius: "var(--r-card)", padding: 8, boxShadow: hov ? "inset 0 0 0 1px var(--hairline-dark), var(--shadow-soft)" : "inset 0 0 0 1px var(--hairline-dark)", transform: hov ? "translateY(-4px)" : "none", transition: "all var(--dur-fast) var(--ease-unio)" }}>
      <div style={{ position: "relative", borderRadius: "calc(var(--r-card) - 8px)", overflow: "hidden" }}>
        <img src={o.img} alt={o.t} style={{ display: "block", width: "100%", height: 210, objectFit: "cover", transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform var(--dur-slow) var(--ease-unio)" }} />
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
          {o.tags.map((t) => (
            <span key={t} className="u-label" style={{ fontSize: 10, padding: "5px 10px", borderRadius: "var(--r-pill)", background: "var(--glass-dark)", WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)", color: "var(--text-inverse)", boxShadow: "inset 0 0 0 1px var(--hairline-light)" }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: "16px 16px 14px" }}>
        <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 10 }}>{o.loc}</span>
        <div style={{ font: "500 20px/1.15 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 6 }}>{o.t}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, borderTop: "1px solid var(--hairline-dark)", paddingTop: 12 }}>
          {o.live ? (
            <span className="u-label" style={{ fontSize: 10, color: "var(--signal-deep)", display: "inline-flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal)" }}></span>Live vermarktet
            </span>
          ) : (
            <span style={{ font: "14px var(--font-mono)", color: "var(--ink-2)" }}>{o.price}</span>
          )}
          <span style={{ font: "13px var(--font-mono)", color: "var(--text-muted)" }}>↗</span>
        </div>
      </div>
    </a>
  );
}

const OBJEKT_DB = [
  { img: "../../assets/img/albrecht.jpg", t: "Das Albrecht — Townhäuser", loc: "Wien · 1170", tags: ["Neubau", "8 Einheiten"], live: true, q: "albrecht townhaus neubau 1170 hernals haus" },
  { img: "../../assets/img/obenzwei.jpg", t: "Obenzwei — Penthouse", loc: "Wien · 2. Bezirk", tags: ["Penthouse", "Bestlage"], price: "Auf Anfrage", q: "obenzwei penthouse terrasse 1020 leopoldstadt wohnung" },
  { img: "../../assets/img/beheim.jpg", t: "Penthouse Beheim", loc: "Wien · 1170", tags: ["2 Penthäuser", "Erstbezug"], price: "€ 1,7 Mio", q: "beheim penthouse erstbezug 1170 wohnung terrasse" },
  { img: "../../assets/img/vienna-garden.jpg", t: "Garten-Refugium Wienerwald", loc: "Wien-Umland", tags: ["Haus", "Pool"], price: "€ 1,9 Mio", q: "haus garten pool gruen wienerwald refugium" },
  { img: "../../assets/img/penthouse.jpg", t: "Penthouse über den Dächern", loc: "Wien · Innenstadt", tags: ["Penthouse", "Dachterrasse"], price: "€ 4 Mio", q: "penthouse dachterrasse innenstadt wohnung luxus" },
  { img: "../../assets/img/int-kitchen.jpg", t: "Stadtwohnung mit Charakter", loc: "Wien · 1040", tags: ["Altbau", "Saniert"], price: "€ 890.000", q: "altbau wohnung saniert 1040 wieden kueche" },
];

/* Footer */
function SiteFooter() {
  const mob = useMobile();
  return (
    <footer data-screen-label="Footer" className="u-grain" style={{ position: "relative", overflow: "hidden", background: "var(--paper-2)", color: "var(--ink-2)", padding: mob ? "110px 6vw 36px" : "175px 6vw 44px" }}>
      <EmberGlow variant="still" corner="86% 88%" />
      <div style={{ position: "relative", zIndex: 1 }}>
      <h2 style={{ margin: 0, font: `500 ${mob ? "clamp(36px, 10vw, 48px)" : "clamp(44px, 5.4vw, 92px)"}/0.98 var(--font-display)`, letterSpacing: "-0.03em", color: "var(--ink)" }}>
        Raum. Technologie.<br />Mensch.
      </h2>
      <div style={{ display: "flex", gap: 12, marginTop: mob ? 28 : 36, flexWrap: "wrap" }}>
        <Button size="lg" variant="paper" knob>Demo buchen</Button>
        <Button size="lg" variant="ghost" onClick={() => (location.href = "kontakt.html")}>Kontakt</Button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, auto)" : "repeat(4, auto)", justifyContent: "start", gap: mob ? "14px 40px" : "12px 48px", marginTop: mob ? 52 : 72, font: "400 14.5px var(--font-display)" }}>
        {NAV_LINKS.map(([l, href]) => (
          <a key={href} href={href} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{l}</a>
        ))}
        <a href={APP_URL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Login ↗</a>
        <a href={BEWERTUNG_URL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Bewertung ↗</a>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--hairline-dark)", marginTop: mob ? 40 : 56, paddingTop: 24, gap: 20, flexWrap: "wrap" }}>
        <img src="../../assets/logo/unio-logo-black.svg" alt="UNIO" style={{ height: 18, width: "auto" }} />
        <div style={{ display: "flex", gap: mob ? 18 : 28, alignItems: "center", flexWrap: "wrap" }}>
          <a href="#" style={{ font: "400 13px var(--font-display)", color: "var(--text-muted)", textDecoration: "none" }}>Impressum</a>
          <a href="#" style={{ font: "400 13px var(--font-display)", color: "var(--text-muted)", textDecoration: "none" }}>Datenschutz</a>
          <span className="u-label" style={{ color: "var(--text-muted)" }}>© 2026 UNIO · Wien</span>
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
    "@media (max-width:899px){.u-kap{display:none!important}}",
    "@media (max-width:899px){input,select,textarea{font-size:16px!important}}",
    "html{-webkit-text-size-adjust:100%}",
  ].join("\n");
  document.head.appendChild(s);
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
        <span className="u-label" style={{ display: "block", fontSize: 9, color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)" }}>{label}</span>
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
        <span style={{ font: "8px var(--font-mono)", color: "var(--text-muted)", marginLeft: 5, letterSpacing: "0.06em" }}>app.unio.at · LENS</span>
        <span style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: "var(--signal)", animation: U_RM ? "none" : "uPulse 2.2s var(--ease-unio) infinite" }}></span>
      </div>
      <div style={{ padding: "10px 10px 8px" }}>
        <svg viewBox="0 0 120 44" style={{ width: "100%", display: "block" }} aria-hidden="true">
          <line x1="0" y1="36" x2="120" y2="36" stroke="var(--hairline-dark)" strokeWidth="1" />
          <polyline points="2,34 22,30 40,31 58,24 76,20 94,12 118,6" fill="none" stroke="var(--signal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            style={{ strokeDasharray: 150, strokeDashoffset: U_RM || !play ? 0 : 150, animation: U_RM || !play ? "none" : "uDraw 1.8s var(--ease-unio) 300ms forwards" }} />
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ font: "8px var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase" }}>Anfragen</span>
          <span style={{ font: "9px var(--font-mono)", color: "var(--signal-deep)" }}>↗</span>
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
    const on = () => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      setP(Math.min(1, Math.max(0, -r.top / total)));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
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
        <div className="u-label" style={{ fontSize: 9.5, marginTop: 7, color: "rgba(255,255,255,0.92)", maxWidth: "14ch", lineHeight: 1.5 }}>{label}</div>
      </div>
      <div style={{ transform: show ? "none" : "translateY(8px)", transition: `transform 800ms var(--ease-unio) ${delay}ms` }}>
        {children}
        {graph === "spark" && (
          <div>
            <svg viewBox="0 0 100 34" preserveAspectRatio="none" style={{ width: "100%", height: 34, display: "block" }}>
              <polyline points={pts.join(" ")} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.1" vectorEffect="non-scaling-stroke" />
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "4px 2px 0" }}>
              {marks.map((m) => <span key={m} style={{ font: "7.5px var(--font-mono)", letterSpacing: "0.08em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>{m}</span>)}
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
        <span className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", writingMode: "vertical-rl" }}>{label}</span>
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
                    <p style={{ margin: "0 0 22px", font: "400 15.5px/1.65 var(--font-display)", color: "var(--text-muted)", maxWidth: 600 }}>{a}</p>
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

Object.assign(window, {
  UNIO_APP_URL: APP_URL, UNIO_BEWERTUNG_URL: BEWERTUNG_URL, UNIO_SEARCH_URL: SEARCH_URL,
  useTick, useMobile, Reveal, SiteNav, PageHero, Chapter, PropCard, OBJEKT_DB, SiteFooter, FaqBlock,
  U_RM, LivePill, Annotation, SignalRaster, UIMiniLens, usePinProgress, StatFrame, EmberGlow,
});
