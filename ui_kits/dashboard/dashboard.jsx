/* UNIO Dashboard — App-Wiring: Shell + Screen-Routing. */
const { DashShell, DashHome, DashStats, DashObject, ProjektView, ImmoUebersicht, Leads, Kontakte, Kalender, AnlageWizard } = window;

function DashApp() {
  const [screen, setScreen] = React.useState("dashboard");
  const [role, setRole] = React.useState("makler");
  const nav = (id) => { setScreen(id); window.scrollTo(0, 0); };
  const pickRole = (r) => { setRole(r); setScreen("dashboard"); window.scrollTo(0, 0); };
  if (role === "endkunde") {
    return <window.EndkundePortal role={role} onRole={pickRole} />;
  }
  if (role === "bt") {
    return (
      <DashShell active="dashboard" onNav={nav}
        nav={[["", [["Dashboard", "dashboard", "dashboard"]]]]}
        user={{ initials: "JK", name: "Jacob Kapsch", mail: "maxingstrasse@unio.at" }}
        cta={{ label: "Projekt einreichen", glyph: "+", onClick: () => {} }}
        headerExtra={<window.RoleSwitch role={role} onRole={pickRole} />}>
        <window.BautraegerHome />
      </DashShell>
    );
  }
  const active = screen === "objekt" || screen === "projekt" || screen === "anlage" ? "objekte" : screen === "saisonrueckblick" ? "circle" : screen;
  let view;
  if (screen === "objekt") view = <DashObject onNav={nav} />;
  else if (screen === "projekt") view = <ProjektView onNav={nav} />;
  else if (screen === "objekte") view = <ImmoUebersicht onNav={nav} />;
  else if (screen === "anlage") view = <AnlageWizard onNav={nav} />;
  else if (screen === "leads") view = <Leads />;
  else if (screen === "kontakte") view = <Kontakte />;
  else if (screen === "kalender") view = <Kalender />;
  else if (screen === "stats") view = <DashStats onNav={nav} />;
  else if (screen === "angebote") view = <window.AngeboteSeite onNav={nav} />;
  else if (screen === "shop") view = <window.ShopSeite onNav={nav} />;
  else if (screen === "meta") view = <window.MetaMarketing onNav={nav} />;
  else if (screen === "circle") view = <window.DashCircle onNav={nav} />;
  else if (screen === "saisonrueckblick") view = <window.SaisonRueckblick onNav={nav} />;
  else view = <DashHome onNav={nav} />;
  return (
    <DashShell active={active} onNav={nav} headerExtra={<window.RoleSwitch role={role} onRole={pickRole} />}>{view}</DashShell>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<DashApp />);
