/* UNIO Dashboard — Shell: helle Sidebar, Stroke-Icons, viel Weißraum. */
const { Button: DBtn } = window.UNIODesignSystem_b6216a;
const { Icon: DIcon } = window;

/* 8 Arbeitsbereiche statt 18 Punkte: kein Eintrag ohne vollwertigen Screen.
   Portale und Medien leben in der Objekt-Akte, System-Punkte im Zahnrad (Einstellungen). */
const NAV = [
  ["", [["Heute", "dashboard", "dashboard"], ["Kalender", "kalender", "kalender"]]],
  ["Arbeit", [["Kontakte", "kontakte", "kontakte"], ["Objekte", "objekte", "objekte"], ["Deals", "deals", "angebote"]]],
  ["Netzwerk", [["CIRCLE", "circle", "benutzer"], ["Marketing", "marketing", "spark"]]],
  ["Steuerung", [["Ziele", "ziele", "stats"], ["Einstellungen", "settings", "settings"]]],
];

/* Mobile Tab-Bar: die vier Feld-Ziele sichtbar statt im Drawer, Capture in der
   Mitte (Eingabe-Ersparnis ist Bindungs-Hebel Nr. 1). Alles Konfigurierende
   bleibt im Drawer hinter dem Menue-Button. Nur fuer die Makler-Rolle. */
const FELD_TABS = [["Heute", "dashboard", "dashboard"], ["Kalender", "kalender", "kalender"], null, ["Kontakte", "kontakte", "kontakte"], ["Objekte", "objekte", "objekte"]];

function CaptureSheet({ onZu, onAnlegen }) {
  const [ok, setOk] = React.useState(null);
  const AKTIONEN = [
    ["plus", "Neues Objekt anlegen", "Adresse und Fotos reichen für den Entwurf", "anlegen"],
    ["mic", "Notiz sprechen", "Die KI extrahiert Kontakt, Objekt und Aufgaben"],
    ["kamera", "Foto ins Objekt", "Landet in der Akte, mit KI-Textvorschlag"],
    ["phone", "Anruf notieren", "Ein Tap fürs Ergebnis, landet im Kontakt-Thread"],
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 90 }} onClick={onZu}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(11,10,9,.35)" }}></div>
      <div onClick={(e) => e.stopPropagation()} style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: "#FBFAF7", borderRadius: "20px 20px 0 0", padding: "10px 18px calc(18px + env(safe-area-inset-bottom, 0px))", boxShadow: "0 -18px 50px -20px rgba(11,10,9,.4)" }}>
        <div style={{ width: 36, height: 4, borderRadius: 99, background: "var(--hairline-dark)", margin: "0 auto 14px" }}></div>
        {ok ? (
          <p style={{ margin: "8px 0 14px", font: "400 14px/1.5 var(--font-display)", color: "var(--ink-2)", textAlign: "center" }}>{ok} <span style={{ color: "var(--text-muted)" }}>(Demo)</span></p>
        ) : AKTIONEN.map(([ic, t, sub, art]) => (
          <button key={t} onClick={() => { if (art === "anlegen") { onZu(); onAnlegen && onAnlegen(); } else setOk(t + ": gespeichert, du findest es im Kontakt-Thread."); }}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "13px 10px", border: "none", cursor: "pointer", background: "transparent", borderRadius: 12, textAlign: "left", fontFamily: "inherit" }}>
            <span style={{ width: 40, height: 40, borderRadius: 99, background: "#FFFFFF", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--signal-deep)", flex: "none" }}><DIcon name={ic} size={17} /></span>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: "block", font: "500 14.5px var(--font-display)", color: "var(--ink)" }}>{t}</span>
              <span style={{ display: "block", font: "400 12px var(--font-display)", color: "var(--text-muted)", marginTop: 2 }}>{sub}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MobileTabBar({ active, onNav, onCapture }) {
  return (
    <nav aria-label="Schnellzugriff" style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 60, display: "flex", alignItems: "stretch", justifyContent: "space-around", background: "rgba(251,250,247,.97)", WebkitBackdropFilter: "blur(14px)", backdropFilter: "blur(14px)", boxShadow: "0 -1px 0 var(--hairline-dark)", padding: "6px 4px calc(6px + env(safe-area-inset-bottom, 0px))" }}>
      {FELD_TABS.map((t, i) => {
        if (!t) return (
          <button key="capture" onClick={onCapture} aria-label="Capture: Notiz, Foto, Anruf"
            style={{ alignSelf: "center", width: 46, height: 46, borderRadius: 99, border: "none", cursor: "pointer", background: "var(--signal)", color: "var(--on-signal)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px -6px rgba(20,18,16,.35)", margin: "0 4px", flex: "none" }}>
            <DIcon name="mic" size={20} />
          </button>
        );
        const [label, id, gl] = t;
        const on = active === id;
        return (
          <button key={id} onClick={() => onNav && onNav(id)}
            style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "7px 2px", border: "none", cursor: "pointer", background: "transparent", color: on ? "var(--ink)" : "var(--text-muted)", fontFamily: "inherit" }}>
            <span style={{ color: on ? "var(--signal-deep)" : "inherit", display: "inline-flex" }}><DIcon name={gl} size={18} /></span>
            <span style={{ font: `${on ? 600 : 500} 10px var(--font-display)` }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

/* Darstellung Klassisch/Leicht — Demo-Werkzeug fuer Pitches (zwei Looks zeigen),
   kein Produkt-Feature: im Produkt wird Dichte ueber die Abstands-Skala geregelt. */
function StylePillSwitch() {
  const [classic, setClassic] = React.useState(() => { try { return localStorage.getItem("unio-dash-style") === "classic"; } catch (e) { return false; } });
  React.useEffect(() => { document.body.classList.toggle("dash-classic", classic); }, []);
  React.useEffect(() => { const f = (e) => setClassic(!!e.detail); window.addEventListener("unio-style", f); return () => window.removeEventListener("unio-style", f); }, []);
  const set = (val) => { setClassic(val); document.body.classList.toggle("dash-classic", val); try { localStorage.setItem("unio-dash-style", val ? "classic" : "light"); } catch (e) {} window.dispatchEvent(new CustomEvent("unio-style", { detail: val })); };
  return (
    <div title="Darstellung" style={{ display: "inline-flex", gap: 3, background: "#FFFFFF", borderRadius: 999, padding: 3, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
      {[["Klassisch", true], ["Leicht", false]].map(([l, val]) => (
        <button key={l} onClick={() => set(val)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "6px 13px", background: classic === val ? "var(--ink)" : "transparent", color: classic === val ? "var(--paper)" : "var(--text-muted)", font: "500 11.5px var(--font-display)", transition: "background .25s var(--ease-unio)" }}>{l}</button>
      ))}
    </div>
  );
}

function DashShell({ active, onNav, cta, children, nav, user, headerExtra }) {
  /* Sidebar: Spalte am Desktop, Overlay-Drawer auf schmalen Screens (reaktiv per matchMedia) */
  const mq = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(max-width: 1000px)") : null;
  const [mobil, setMobil] = React.useState(() => !!(mq && mq.matches));
  const [open, setOpen] = React.useState(() => !(mq && mq.matches));
  React.useEffect(() => {
    if (!mq) return;
    const f = (e) => { const m = e.matches; setMobil(m); setOpen(!m); };
    mq.addEventListener ? mq.addEventListener("change", f) : mq.addListener(f);
    return () => { mq.removeEventListener ? mq.removeEventListener("change", f) : mq.removeListener(f); };
  }, []);
  const navUndZu = (id) => { if (onNav) onNav(id); if (mobil) setOpen(false); };
  const navItems = nav || NAV;
  const feldBar = mobil && !nav; /* Tab-Bar nur fuer die Makler-Rolle */
  const [capture, setCapture] = React.useState(false);
  const u = user || { initials: "DH", name: "Daniel Hayden", mail: "daniel@unio.at" };
  /* "Immobilie anlegen" fuehrt DIREKT in den Anlage-Wizard, nicht nur zur Liste:
     Flag fuer den Mount, Event falls die Objekte-Seite schon offen ist. */
  const zumWizard = () => {
    try { sessionStorage.setItem("unio_mk_ziel_tab", "anlage"); } catch (e) {}
    if (onNav) onNav("objekte");
    window.dispatchEvent(new CustomEvent("unio-objekte-tab", { detail: "anlage" }));
  };
  /* Eine Primaeraktion pro Screen: cta={false} blendet den globalen CTA aus
     (Detailseiten tragen ihre Kontextaktion selbst). */
  const c = cta === false ? null : (cta || { label: "Immobilie anlegen", glyph: "+", onClick: zumWizard });
  return (
    <div className="dash-shell" style={{ display: "flex", minHeight: "100vh", background: "#F4F2EE", fontFamily: "var(--font-display)" }}>
      <aside className="dash-side" style={mobil
        ? { width: 250, flex: "none", background: "#FBFAF7", overflow: "hidden", position: "fixed", left: 0, top: 0, zIndex: 70, height: "100vh", display: "flex", flexDirection: "column",
            transform: open ? "translateX(0)" : "translateX(-100%)", transition: "transform .28s var(--ease-unio)",
            boxShadow: open ? "24px 0 70px -30px rgba(11,10,9,.5)" : "none" }
        : { width: open ? 250 : 0, flex: "none", background: "#FBFAF7", overflow: "hidden", transition: "width .5s var(--ease-unio)", position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", boxShadow: "1px 0 0 var(--hairline-dark)" }}>
        <div style={{ width: 250, display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ padding: "26px 24px 22px", display: "flex", alignItems: "center", gap: 10 }}>
            <img src="../../assets/logo/unio-logo-black.svg" alt="UNIO" style={{ height: 18 }} />
            <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 9, letterSpacing: "0.18em" }}>Dashboard</span>
          </div>
          <nav style={{ flex: 1, overflowY: "auto", padding: "6px 14px 24px" }}>
            {navItems.map(([grp, items]) => (
              <div key={grp} style={{ marginTop: grp ? 26 : 0 }}>
                {grp && <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5, padding: "0 12px 10px" }}>{grp}</div>}
                {items.map(([label, id, gl]) => {
                  const on = active === id;
                  return (
                    <button key={id} onClick={() => navUndZu(id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 13, padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", background: on ? "#FFFFFF" : "transparent", color: on ? "var(--ink)" : "var(--text-muted)", font: `${on ? 600 : 500} 14px var(--font-display)`, textAlign: "left", boxShadow: on ? "inset 0 0 0 1px var(--hairline-dark)" : "none", transition: "background .2s var(--ease-unio), color .2s" }}
                      onMouseEnter={(e) => { if (!on) e.currentTarget.style.color = "var(--ink)"; }}
                      onMouseLeave={(e) => { if (!on) e.currentTarget.style.color = "var(--text-muted)"; }}>
                      <span aria-hidden="true" style={{ width: 18, display: "inline-flex", justifyContent: "center", color: on ? "var(--signal-deep)" : "inherit" }}><DIcon name={gl} size={17} /></span>
                      {label}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
          <div style={{ padding: "16px 20px", borderTop: "1px solid var(--hairline-dark)", display: "flex", alignItems: "center", gap: 11 }}>
            <span style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--signal)", color: "var(--on-signal)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 13px var(--font-display)", flex: "none" }}>{u.initials}</span>
            <div style={{ lineHeight: 1.3 }}>
              <div style={{ font: "500 13px var(--font-display)", color: "var(--ink)" }}>{u.name}</div>
              <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 8 }}>{u.mail}</div>
            </div>
          </div>
        </div>
      </aside>
      {mobil && (
        <div onClick={() => setOpen(false)} aria-hidden="true"
          style={{ position: "fixed", inset: 0, zIndex: 65, background: "rgba(11,10,9,.35)",
            opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity .28s var(--ease-unio)" }}></div>
      )}

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Innenabstaende skalieren inline mit der Flaeche, damit der Kopf auch dann
            haelt, wenn das Makler-Stylesheet (noch) nicht geladen ist. */}
        <header className="dash-head" style={{ position: "sticky", top: 0, zIndex: 30, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "0 clamp(16px, 3vw, 40px)", height: 72, background: "rgba(244,242,238,0.8)", WebkitBackdropFilter: "blur(16px)", backdropFilter: "blur(16px)" }}>
          <button onClick={() => setOpen((v) => !v)} aria-label="Menü" style={{ width: 38, height: 38, borderRadius: 10, border: "none", cursor: "pointer", background: "#FFFFFF", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--ink-2)" }}><DIcon name="layers" size={17} /></button>
          <div className="dash-headright" style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0, overflow: "hidden" }}>
            {headerExtra}
            <span className="dash-stylepill"><StylePillSwitch /></span>
            {c && <span className="dash-cta"><DBtn variant="signal" size="sm" knob={c.glyph || "+"} onClick={c.onClick}>{c.label}</DBtn></span>}
          </div>
        </header>
        <main className="dash-main" style={{ flex: 1, minWidth: 0, padding: feldBar ? "8px clamp(16px, 3vw, 40px) 130px" : "8px clamp(16px, 3vw, 40px) 80px" }}>
          <style>{window.MK_CSS}{window.MK_HEUTE_CSS || ""}</style>
          {children}
        </main>
      </div>
      {feldBar && <MobileTabBar active={active} onNav={navUndZu} onCapture={() => setCapture(true)} />}
      {capture && <CaptureSheet onZu={() => setCapture(false)} onAnlegen={zumWizard} />}
    </div>
  );
}
/* Rollen-Umschalter: Makler- vs. Bauträger-Sicht */
function RoleSwitch({ role, onRole }) {
  return (
    <div title="Ansicht" style={{ display: "inline-flex", gap: 3, background: "#FFFFFF", borderRadius: 999, padding: 3, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
      {[["Makler", "makler"], ["Bauträger", "bt"], ["Endkunde", "endkunde"]].map(([l, id]) => (
        <button key={id} onClick={() => onRole(id)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "6px 13px", background: role === id ? "var(--signal)" : "transparent", color: role === id ? "var(--on-signal)" : "var(--text-muted)", font: "500 11.5px var(--font-display)", transition: "background .25s var(--ease-unio)" }}>{l}</button>
      ))}
    </div>
  );
}
Object.assign(window, { DashShell, RoleSwitch });
