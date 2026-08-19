/* UNIO Dashboard — App-Wiring: Shell + Screen-Routing.
   Makler-Rolle: 8 Bereiche, Command-K, G-Shortcuts, geteilter State mit dem Endkunden-Portal. */
const { DashShell, DashObject, ProjektView, ImmoUebersicht, Kalender, AnlageWizard } = window;

function DashApp() {
  const [screen, setScreen] = React.useState("dashboard");
  const [role, setRole] = React.useState(() => (location.search.match(/[?&]rolle=([a-z]+)/) || [])[1] || "makler");
  const [mk, setMk] = React.useState(() => window.mkLadeAlles());
  const [kontaktOffen, setKontaktOffen] = React.useState(null);
  const [dealOffen, setDealOffen] = React.useState(null);
  const [dealsTab, setDealsTab] = React.useState("verkauf");
  const [cmdk, setCmdk] = React.useState(false);
  const [cheat, setCheat] = React.useState(false);

  const tueMk = (fn) => setMk((prev) => { const d = JSON.parse(JSON.stringify(prev)); fn(d); window.mkPersist(d); return d; });
  const nav = (id) => { setScreen(id); setKontaktOffen(null); setDealOffen(null); window.scrollTo(0, 0); };
  const pickRole = (r) => { setRole(r); setScreen("dashboard"); window.scrollTo(0, 0); };

  /* geheZu: jede Triage-Zeile, jedes Suchergebnis landet im richtigen Kontext */
  const geheZu = (ziel) => {
    if (ziel.art === "kontakt") { setScreen("kontakte"); setKontaktOffen(ziel.id); }
    else if (ziel.art === "deal") { setScreen("deals"); setDealsTab("verkauf"); setDealOffen(ziel.id); }
    else if (ziel.art === "objekt") { if (ziel.report) sessionStorage.setItem("unio_mk_report", "1"); setScreen("objekt"); }
    else if (ziel.art === "screen") { setScreen(ziel.id); if (ziel.tab) setDealsTab(ziel.tab); }
    window.scrollTo(0, 0);
  };

  /* Frische Daten, wenn das Endkunden-Portal (zweites Fenster) etwas geaendert hat */
  React.useEffect(() => {
    const f = () => setMk(window.mkLadeAlles());
    window.addEventListener("storage", f);
    document.addEventListener("visibilitychange", f);
    return () => { window.removeEventListener("storage", f); document.removeEventListener("visibilitychange", f); };
  }, []);

  /* Command-K + G-Shortcuts + Cheatsheet */
  React.useEffect(() => {
    let gWartet = 0;
    const f = (e) => {
      const tippt = ["INPUT", "TEXTAREA"].includes((e.target || {}).tagName) || (e.target || {}).isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCmdk((x) => !x); return; }
      if (tippt) return;
      if (e.key === "?") { setCheat((x) => !x); return; }
      if (e.key.toLowerCase() === "g") { gWartet = Date.now(); return; }
      if (gWartet && Date.now() - gWartet < 900) {
        const z = { h: "dashboard", k: "kontakte", o: "objekte", d: "deals", c: "circle", m: "marketing", z: "ziele" }[e.key.toLowerCase()];
        if (z) { setScreen(z); window.scrollTo(0, 0); }
        gWartet = 0;
      }
    };
    document.addEventListener("keydown", f);
    return () => document.removeEventListener("keydown", f);
  }, []);

  if (role === "endkunde") {
    return <window.EndkundePortal role={role} onRole={pickRole} />;
  }
  if (role === "bt") {
    return (
      <DashShell active="dashboard" onNav={nav}
        nav={[["", [["Dashboard", "dashboard", "dashboard"]]]]}
        user={{ initials: "JK", name: "Jacob Kapsch", mail: "maxingstrasse@unio.at" }}
        cta={{ label: "Projekt einreichen", glyph: "+", onClick: () => window.open("/kontakt", "_blank", "noopener") }}
        headerExtra={<window.RoleSwitch role={role} onRole={pickRole} />}>
        <window.BautraegerHome />
      </DashShell>
    );
  }

  const active = ["objekt", "projekt", "anlage"].includes(screen) ? "objekte"
    : screen === "saisonrueckblick" ? "circle"
    : ["shop", "meta"].includes(screen) ? "marketing"
    : ["leads", "angebote", "abgeber"].includes(screen) ? "kontakte"
    : screen === "stats" ? "ziele" : screen;
  let view;
  if (screen === "objekt") view = <DashObject onNav={nav} />;
  else if (screen === "projekt") view = <ProjektView onNav={nav} />;
  else if (screen === "objekte") view = <window.MkObjekte geheZu={geheZu} onNav={nav} />;
  else if (screen === "anlage") view = <window.MkObjekte geheZu={geheZu} onNav={nav} />;
  else if (screen === "kalender") view = <Kalender />;
  else if (screen === "kontakte" || screen === "leads" || screen === "abgeber") view = <window.MkKontakte mk={mk} tueMk={tueMk} geheZu={geheZu} offenId={kontaktOffen} setOffenId={setKontaktOffen} />;
  else if (screen === "deals" || screen === "angebote") view = <window.MkDeals key={dealsTab} mk={mk} tueMk={tueMk} geheZu={geheZu} offenDeal={dealOffen} setOffenDeal={setDealOffen} initialTab={dealsTab} />;
  else if (screen === "marketing" || screen === "shop" || screen === "meta") view = <window.MkMarketing onNav={nav} />;
  else if (screen === "ziele" || screen === "stats") view = <window.MkZieleBereich mk={mk} tueMk={tueMk} onNav={nav} />;
  else if (screen === "settings") view = <window.MkSettings />;
  else if (screen === "circle") view = <window.MkCircle onNav={nav} geheZu={geheZu} tueMk={tueMk} />;
  else if (screen === "saisonrueckblick") view = <window.MkCircle onNav={nav} geheZu={geheZu} tueMk={tueMk} />;
  else view = <window.MkHeuteSeite mk={mk} tueMk={tueMk} geheZu={geheZu} onNav={nav} />;
  return (
    <React.Fragment>
      <DashShell active={active} onNav={nav} headerExtra={<window.RoleSwitch role={role} onRole={pickRole} />}>{view}</DashShell>
      <window.MkCommandK offen={cmdk} onClose={() => setCmdk(false)} mk={mk} geheZu={(z) => { geheZu(z); setCmdk(false); }} />
      <window.MkCheatsheet offen={cheat} onClose={() => setCheat(false)} />
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<DashApp />);
