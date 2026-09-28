/* UNIO HUMAN v3. Shell: zwei Rollen, je fünf Bereiche, jede Ansicht mit eigener URL.
   Makler: Heute · Marke · Inhalte · Wirkung · Shop   (Einrichtung und Freigaben leben in Heute)
   Team:   Heute · Akquise · Makler · Produktion · Einstellungen   (Empfehlungen und Freigaben leben in Heute und Produktion) */

function DemoMenu({ rolle, setRolle, makler, mid, setMid, go }) {
  const [offen, setOffen] = useState(false);
  return <div className="hm-demo">
    <button className="hm-chip" onClick={() => setOffen(!offen)} aria-expanded={offen}>Demo</button>
    {offen && <div className="hm-demo-pop" onMouseLeave={() => setOffen(false)}>
      <div className="hm-mono">Ansicht</div>
      <div className="hm-seg"><button className={rolle === "makler" ? "on" : ""} onClick={() => { setRolle("makler"); go("heute"); }}>Makler</button><button className={rolle === "team" ? "on" : ""} onClick={() => { setRolle("team"); go("heute"); }}>Team</button></div>
      {rolle === "makler" && <><div className="hm-mono">Makler</div><div className="hm-gruppe">{makler.map((x) => <div key={x.id} className="hm-reihe klick" onClick={() => { setMid(x.id); go("heute"); setOffen(false); }}><div className="m"><div className="t">{x.name}</div><div className="u">{x.tag > 30 ? `Monat ${Math.floor(x.tag / 30)}` : `Tag ${x.tag}`}</div></div><div className="r">{x.id === mid ? <Ico n="haken" /> : ""}</div></div>)}</div></>}
      <button className="hm-link" onClick={() => { hmStore.reset(); location.reload(); }}>Demo-Daten zurücksetzen</button>
    </div>}
  </div>;
}

/* Befehlsmenü: Cmd oder Strg + K. Bereiche, Makler, Beiträge. Pfeiltasten, Return, Escape. */
function Befehle({ rolle, nav, go, oeffne, oeffneMakler }) {
  const [offen, setOffen] = useState(false);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  React.useEffect(() => { const k = (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOffen((o) => !o); setQ(""); setI(0); } }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);
  if (!offen) return null;
  const makler = hmStore.get("makler") || [];
  const content = hmStore.get("content") || [];
  const n = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const alle = [
    ...nav.map(([id, t]) => ({ t, u: "Bereich", los: () => go(id) })),
    ...(rolle === "team" ? makler.map((x) => ({ t: x.name, u: "Makler", los: () => oeffneMakler(x.id) })) : []),
    ...content.slice(0, 200).map((c) => ({ t: c.titel, u: `Beitrag · ${hmSpalte(c.zustand).name}`, los: () => oeffne(c.id) })),
  ];
  const treffer = (q ? alle.filter((x) => n(x.t + " " + x.u).includes(n(q))) : alle.slice(0, nav.length + makler.length)).slice(0, 8);
  const waehle = (x) => { if (!x) return; x.los(); setOffen(false); };
  return <div className="hm-overlay" onMouseDown={(e) => e.target === e.currentTarget && setOffen(false)}>
    <div className="hm-befehle" role="dialog" aria-label="Befehle">
      <input autoFocus value={q} placeholder="Springen zu Bereich, Makler oder Beitrag" onChange={(e) => { setQ(e.target.value); setI(0); }} onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setI((x) => Math.min(treffer.length - 1, x + 1)); } if (e.key === "ArrowUp") { e.preventDefault(); setI((x) => Math.max(0, x - 1)); } if (e.key === "Enter") waehle(treffer[i]); if (e.key === "Escape") setOffen(false); }} />
      <div className="hm-gruppe">{treffer.map((x, j) => <div key={x.u + x.t + j} className={"hm-reihe klick" + (j === i ? " an" : "")} onMouseEnter={() => setI(j)} onClick={() => waehle(x)}><div className="m"><div className="t">{x.t}</div><div className="u">{x.u}</div></div></div>)}{!treffer.length && <div className="hm-reihe"><div className="m"><div className="u">Nichts gefunden.</div></div></div>}</div>
    </div>
  </div>;
}

function App() {
  const p = new URLSearchParams(location.search);
  const [rolle, setRolle] = useState(p.get("rolle") === "team" ? "team" : "makler");
  const [mid, setMid] = useState(p.get("makler") || "sara");
  const [screen, setScreen] = useState(p.get("screen") || "heute");
  const [sub, setSub] = useState(p.get("sub") || null);
  const [beitrag, setBeitragId] = useState(p.get("beitrag") || null);
  const [tm, setTm] = useState(p.get("tm") || null);
  const [bereich, setBereich] = useState(p.get("bereich") || null);
  const [post, setPost] = useState(false);
  const makler = useHm("makler") || [];
  const content = useHm("content") || [];
  const ein = useHm("einrichtung") || {};
  const leads = useHm("leads") || [];
  useHm("portraits");
  const m = makler.find((x) => x.id === mid) || makler[0];
  useEffect(() => { const q = new URLSearchParams({ rolle, makler: mid, screen }); if (sub) q.set("sub", sub); if (beitrag) q.set("beitrag", beitrag); if (tm) q.set("tm", tm); if (bereich) q.set("bereich", bereich); if (p.get("ansicht")) q.set("ansicht", p.get("ansicht")); history.replaceState(null, "", "?" + q); }, [rolle, mid, screen, sub, beitrag, tm, bereich]);
  const go = (s, o) => { setScreen(s); setSub((o && o.sub) || null); setBeitragId(null); window.scrollTo({ top: 0 }); };
  const oeffne = (id) => { setBeitragId(id); window.scrollTo({ top: 0 }); };
  const oeffneMakler = (id, ber, s) => { setRolle("team"); setScreen("makler"); setTm(id); setBereich(ber || "ueberblick"); setSub(s || null); setBeitragId(null); window.scrollTo({ top: 0 }); };
  if (!m) return null;
  /* Abstimmung per Link: nur der Beitrag, ohne Menü, für den Makler unterwegs */
  if (p.get("ansicht") === "link" && beitrag) return <div className="hm-app hm-link-ansicht"><header className="hm-top"><img src="../../assets/logo/unio-logo-black.svg" alt="UNIO" /></header><main className="hm-main" style={{ margin: "0 auto" }}><Abstimmung c={(content.find((c) => c.id === beitrag)) || content[0]} zurueck={() => { location.search = `?rolle=makler&makler=${mid}&screen=inhalte`; }} /></main><Toast /></div>;
  const st = ein[m.id] || {};
  const einOffen = HM_EINRICHTUNG.filter((e) => st[e.id] !== "fertig").length;
  const frei = content.filter((c) => c.maklerId === m.id && c.zustand === "freigabe").length;
  const navM = [["heute", "Heute", frei + (einOffen ? 1 : 0)], ["marke", "Marke"], ["inhalte", "Inhalte"], ["wirkung", "Wirkung"], ["shop", "Shop"]];
  const navT = [["heute", "Heute"], ["akquise", "Akquise", leads.filter((l) => !["onboarding", "archiv"].includes(l.stufe)).length], ["makler", "Makler"], ["produktion", "Produktion"], ["einstellungen", "Einstellungen"]];
  const nav = rolle === "makler" ? navM : navT;
  const teamM = tm && makler.find((x) => x.id === tm);
  return (
    <div className="hm-app">
      <header className="hm-top">
        <img src="../../assets/logo/unio-logo-black.svg" alt="UNIO" />
        <h1>Human</h1>
        <div className="hm-right">
          {rolle === "makler" && <button className="hm-chip" onClick={() => setPost(true)}>Nachrichten</button>}
          <DemoMenu rolle={rolle} setRolle={(r) => { setRolle(r); setTm(null); setBeitragId(null); }} makler={makler} mid={mid} setMid={setMid} go={go} />
        </div>
      </header>
      <div className="hm-body">
        <nav className="hm-side">
          {nav.map(([id, t, n]) => <a key={id} className={screen === id && !beitrag ? "on" : ""} onClick={() => { if (rolle === "team" && id === "makler") { setTm(null); setBereich(null); } go(id); }}>{t}{n ? <span className="hm-badge">{n}</span> : null}</a>)}
          <div className="hm-who">{rolle === "makler" ? <div className="hm-row" style={{ gap: 10 }}><Avatar name={m.name} bild={hmBrand(m.id).portrait} /><div>{m.name}<br />{m.abo}</div></div> : <>Team UNIO<br />Daniel, Florian, Ahmet, Nikita</>}</div>
        </nav>
        <main className="hm-main">
          {beitrag ? <Beitrag key={beitrag} id={beitrag} zurueck={() => setBeitragId(null)} teamSicht={rolle === "team"} /> : rolle === "makler" ? (
            screen === "heute" ? <MaklerHeute m={m} go={go} oeffne={oeffne} /> :
            screen === "einrichtung" ? <div><button className="hm-zurueck" onClick={() => go("heute")}><Ico n="zurueck" />Heute</button><Einrichtung m={m} go={go} /></div> :
            screen === "marke" ? <Marke m={m} sub={sub} setSub={setSub} go={go} /> :
            screen === "inhalte" ? <Inhalte2 m={m} sub={sub} setSub={setSub} oeffne={oeffne} /> :
            screen === "freigaben" ? <Inhalte2 m={m} sub={sub} setSub={setSub} oeffne={oeffne} /> :
            screen === "wirkung" ? <Wirkung m={m} oeffne={oeffne} /> :
            screen === "shop" ? <Auftraege m={m} st={(hmStore.get("strategien") || {})[m.id]} /> : null
          ) : (
            screen === "heute" ? <TeamHeute go={go} oeffne={oeffne} oeffneMakler={oeffneMakler} /> :
            screen === "akquise" ? <Akquise oeffneMakler={oeffneMakler} /> :
            screen === "makler" ? (teamM ? <Arbeitsbereich m={teamM} sub={sub} setSub={setSub} oeffne={oeffne} zurueck={() => { setTm(null); setBereich(null); }} bereich={bereich} setBereich={setBereich} /> : <MaklerListe oeffneMakler={oeffneMakler} />) :
            screen === "produktion" ? <Inhalte2 m={null} teamSicht sub={sub} setSub={setSub} oeffne={oeffne} /> :
            screen === "freigaben" ? <Inhalte2 m={null} teamSicht sub={sub} setSub={setSub} oeffne={oeffne} /> :
            screen === "empfehlungen" ? <TeamHeute go={go} oeffne={oeffne} oeffneMakler={oeffneMakler} /> :
            screen === "einstellungen" ? <Einstellungen /> : null
          )}
        </main>
      </div>
      <Assistent m={rolle === "makler" ? m : teamM || null} />
      <Befehle rolle={rolle} nav={nav} go={(x) => { if (rolle === "team" && x === "makler") { setTm(null); setBereich(null); } go(x); }} oeffne={oeffne} oeffneMakler={oeffneMakler} />
      <Sheet offen={post} zu={() => setPost(false)} titel="Nachrichten" breit><Nachrichten m={m} schritte={(hmStore.get("schritte") || []).filter((s) => s.maklerId === m.id)} /></Sheet>
      <Toast />
    </div>
  );
}

hmSeed();
hmAutomatik();
hmPortraitsLaden().finally(() => ReactDOM.createRoot(document.getElementById("root")).render(<App />));
