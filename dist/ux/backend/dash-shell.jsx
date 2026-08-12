/* UNIO Dashboard — Shell: helle Sidebar, Stroke-Icons, viel Weißraum. */
const { Button: DBtn } = window.UNIODesignSystem_b6216a;
const { Icon: DIcon } = window;

const NAV = [
  ["", [["Dashboard", "dashboard", "dashboard"], ["Suggested Actions", "actions", "actions"], ["Leads", "leads", "leads"], ["Kalender", "kalender", "kalender"], ["CIRCLE", "circle", "kontakte"]]],
  ["Verwaltung", [["Immobilien", "objekte", "objekte"], ["Entwürfe & Anlage", "anlage", "plus"], ["Kontakte", "kontakte", "kontakte"], ["Angebote", "angebote", "angebote"], ["Abgeber-Leads", "abgeber", "leads"]]],
  ["Marketing", [["Meta Marketing", "meta", "spark"], ["Shop", "shop", "grid"], ["Portale", "portale", "portale"], ["Medien", "medien", "layers"]]],
  ["System", [["Statistiken", "stats", "stats"], ["Integrationen", "integ", "layers"], ["Rollen & Rechte", "rollen", "benutzer"], ["Einstellungen", "settings", "settings"]]],
];

/* Darstellung Klassisch/Leicht — global im Header, gilt auf allen Seiten */
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
  const [open, setOpen] = React.useState(true);
  const navItems = nav || NAV;
  const u = user || { initials: "DH", name: "Daniel Hayden", mail: "daniel@unio.at" };
  const c = cta || { label: "Immobilie anlegen", glyph: "+", onClick: () => onNav && onNav("objekte") };
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F4F2EE", fontFamily: "var(--font-display)" }}>
      <aside style={{ width: open ? 250 : 0, flex: "none", background: "#FBFAF7", overflow: "hidden", transition: "width .5s var(--ease-unio)", position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", boxShadow: "1px 0 0 var(--hairline-dark)" }}>
        <div style={{ width: 250, display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ padding: "26px 24px 22px", display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/assets/logo/unio-logo-black.svg" alt="UNIO" style={{ height: 18 }} />
            <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 9, letterSpacing: "0.18em" }}>Dashboard</span>
          </div>
          <nav style={{ flex: 1, overflowY: "auto", padding: "6px 14px 24px" }}>
            {navItems.map(([grp, items]) => (
              <div key={grp} style={{ marginTop: grp ? 26 : 0 }}>
                {grp && <div className="u-label" style={{ color: "var(--text-muted)", fontSize: 8.5, padding: "0 12px 10px" }}>{grp}</div>}
                {items.map(([label, id, gl]) => {
                  const on = active === id;
                  return (
                    <button key={id} onClick={() => onNav && onNav(id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 13, padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", background: on ? "#FFFFFF" : "transparent", color: on ? "var(--ink)" : "var(--text-muted)", font: `${on ? 600 : 500} 14px var(--font-display)`, textAlign: "left", boxShadow: on ? "inset 0 0 0 1px var(--hairline-dark)" : "none", transition: "background .2s var(--ease-unio), color .2s" }}
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

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <header style={{ position: "sticky", top: 0, zIndex: 30, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 72, background: "rgba(244,242,238,0.8)", WebkitBackdropFilter: "blur(16px)", backdropFilter: "blur(16px)" }}>
          <button onClick={() => setOpen((v) => !v)} aria-label="Menü" style={{ width: 38, height: 38, borderRadius: 10, border: "none", cursor: "pointer", background: "#FFFFFF", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--ink-2)" }}><DIcon name="layers" size={17} /></button>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {headerExtra}
            <StylePillSwitch />
            <DBtn variant="signal" size="sm" knob={c.glyph || "+"} onClick={c.onClick}>{c.label}</DBtn>
          </div>
        </header>
        <main style={{ flex: 1, minWidth: 0, padding: "8px 40px 80px" }}>{children}</main>
      </div>
    </div>
  );
}
/* Rollen-Umschalter: Makler- vs. Bauträger-Sicht */
function RoleSwitch({ role, onRole }) {
  return (
    <div title="Ansicht" style={{ display: "inline-flex", gap: 3, background: "#FFFFFF", borderRadius: 999, padding: 3, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
      {[["Makler", "makler"], ["Bauträger", "bt"]].map(([l, id]) => (
        <button key={id} onClick={() => onRole(id)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "6px 13px", background: role === id ? "var(--signal)" : "transparent", color: role === id ? "var(--on-signal)" : "var(--text-muted)", font: "500 11.5px var(--font-display)", transition: "background .25s var(--ease-unio)" }}>{l}</button>
      ))}
    </div>
  );
}
Object.assign(window, { DashShell, RoleSwitch });
