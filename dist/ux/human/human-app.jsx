/* UNIO HUMAN. Screens: Shell, Reise, Fragebogen, zwei Wege, Strategie, Brand-Profil, Team.
   Ein Zustand, zwei Linsen: ?rolle=makler|team, ?makler=<id>. */

const { useState, useEffect, useMemo, useRef } = React;

const hmParams = new URLSearchParams(location.search);
const hmFmtDate = (iso) => { const d = new Date(iso); return d.toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit" }); };
const hmRel = (t) => { const h = Math.round((Date.now() - t) / 36e5); return h < 1 ? "jetzt" : h < 24 ? `vor ${h} h` : `vor ${Math.round(h / 24)} T`; };
const hmHeute = () => "2026-09-23";

let hmToastFn = () => {};
function Toast() { const [t, setT] = useState(""); const [on, setOn] = useState(false); useEffect(() => { hmToastFn = (x) => { setT(x); setOn(true); setTimeout(() => setOn(false), 2200); }; }, []); return <div className={"hm-toast" + (on ? " on" : "")}>{t}</div>; }
const toast = (t) => hmToastFn(t);

function Pill({ z }) { return <span className={"hm-pill z-" + z}><i></i>{HM_ZUSTAND[z] || z}</span>; }
function Btn({ children, knob = "→", ghost, paper, ...r }) { return <button className={"hm-btn" + (ghost ? " hm-ghost" : "") + (paper ? " hm-paper" : "")} {...r}>{children}{!ghost && <span className="k">{knob}</span>}</button>; }

/* ---------- Shell ---------- */
function App() {
  const [rolle, setRolle] = useState(hmParams.get("rolle") === "team" ? "team" : "makler");
  const makler = useHm("makler") || [];
  const [mid, setMid] = useState(hmParams.get("makler") || "sara");
  const [screen, setScreen] = useState(hmParams.get("screen") || (rolle === "team" ? "heute" : "reise"));
  const m = makler.find((x) => x.id === mid) || makler[0];
  useEffect(() => { const p = new URLSearchParams({ rolle, makler: mid, screen }); history.replaceState(null, "", "?" + p); }, [rolle, mid, screen]);
  const go = (s, opts) => { setScreen(s); if (opts && opts.makler) setMid(opts.makler); window.scrollTo({ top: 0 }); };
  return (
    <div className="hm-app">
      <header className="hm-top">
        <img src="/assets/logo/unio-logo-black.svg" alt="UNIO" />
        <h1>Human</h1>
        <div className="hm-right">
          {rolle === "makler" && <select className="hm-sel" value={mid} onChange={(e) => { setMid(e.target.value); setScreen("reise"); }}>{makler.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select>}
          <div className="hm-seg"><button className={rolle === "makler" ? "on" : ""} onClick={() => { setRolle("makler"); setScreen("reise"); }}>Makler</button><button className={rolle === "team" ? "on" : ""} onClick={() => { setRolle("team"); setScreen("heute"); }}>Team</button></div>
          <button className="hm-chip" title="Demo-Daten zurücksetzen" onClick={() => { hmStore.reset(); location.reload(); }}>Reset</button>
        </div>
      </header>
      {rolle === "makler" ? (m ? <MaklerView m={m} screen={screen} go={go} /> : null) : <TeamView screen={screen} go={go} />}
      <Toast />
    </div>
  );
}

/* ---------- Makler ---------- */
function MaklerView({ m, screen, go }) {
  const schritte = (useHm("schritte") || []).filter((s) => s.maklerId === m.id);
  const fb = (useHm("fragebogen") || {})[m.id];
  const st = (useHm("strategien") || {})[m.id];
  const offen = schritte.filter((s) => s.zustand === "wartet_makler" || s.zustand === "freigabe").length;
  const posts = (useHm("posts") || []).filter((p) => p.maklerId === m.id && p.zustand === "freigabe").length;
  const ideenOffen = (useHm("ideen") || []).filter((i) => i.maklerId === m.id && i.zustand === "vorgeschlagen").length;
  const nav = [["reise", "Reise", offen], ["fragebogen", "Fragebogen"], ["strategie", "Strategie", st && !st.gewaehlt ? 1 : 0], ["brand", "Brand-Profil"], ["aufbau", "Aufbau"], ["inhalte", "Inhalte", posts + (ideenOffen ? 1 : 0)], ["kalender", "Kalender"], ["auftraege", "Aufträge"], ["report", "Report"], ["nachrichten", "Nachrichten"]];
  return (
    <div className="hm-body">
      <nav className="hm-side">
        {nav.map(([id, t, b]) => <a key={id} className={screen === id ? "on" : ""} onClick={() => go(id)}>{t}{b ? <span className="hm-badge">{b}</span> : null}</a>)}
        <div className="hm-who">{m.name}<br />{m.abo} · Tag {m.tag}</div>
      </nav>
      <main className="hm-main">
        {screen === "reise" && <Reise m={m} schritte={schritte} fb={fb} st={st} go={go} />}
        {screen === "fragebogen" && <Fragebogen m={m} fb={fb} go={go} />}
        {screen === "strategie" && <Strategie m={m} fb={fb} st={st} go={go} />}
        {screen === "brand" && <BrandProfil m={m} st={st} go={go} />}
        {screen === "aufbau" && <Aufbau m={m} st={st} />}
        {screen === "inhalte" && <Inhalte m={m} st={st} />}
        {screen === "kalender" && <Kalender maklerId={m.id} makler={[m]} />}
        {screen === "auftraege" && <Auftraege m={m} st={st} />}
        {screen === "report" && <Report m={m} st={st} />}
        {screen === "nachrichten" && <Nachrichten m={m} schritte={schritte} />}
      </main>
    </div>
  );
}

function etappeAktuell(schritte) {
  for (const e of HM_ETAPPEN) { const s = schritte.filter((x) => x.etappe === e.id); if (s.length && s.some((x) => x.zustand !== "fertig")) return e.id; }
  return 6;
}

function Reise({ m, schritte, fb, st, go }) {
  const events = (useHm("events") || []).filter((e) => e.maklerId === m.id).slice(0, 6);
  const akt = etappeAktuell(schritte);
  const naechster = schritte.find((s) => s.zustand === "wartet_makler" || s.zustand === "freigabe");
  const team = schritte.filter((s) => ["in_arbeit", "geplant", "wartet_team"].includes(s.zustand));
  const ziel = (s) => { if (!s) return null; if (s.id.endsWith("fragebogen")) return "fragebogen"; if (s.id.endsWith("wege") || s.id.endsWith("praesentation")) return "strategie"; return null; };
  const cta = ziel(naechster);
  const tagText = m.tag > 30 ? `Monat ${Math.floor(m.tag / 30)}` : `Tag ${m.tag} von 30`;
  return (
    <div>
      <div className="hm-mono">{tagText} · {m.abo}</div>
      <h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>{m.tag <= 1 ? `Willkommen, ${m.name.split(" ")[0]}.` : m.tag > 30 ? "Dein Monat." : `Deine Reise, ${m.name.split(" ")[0]}.`}</h2>
      <p className="hm-sub">{m.tag <= 3 ? "In 30 Tagen bist du live. Erst lernen wir dich kennen, dann bauen wir, dann drehen wir. Jeder Schritt hat einen Termin und einen Verantwortlichen." : m.tag > 30 ? "Dein Content-Zyklus läuft. Hier siehst du, was diesen Monat ansteht und was beim Team liegt." : "Was jetzt zählt, steht oben. Alles andere läuft sichtbar im Hintergrund."}</p>

      <div className="hm-etappen">
        {HM_ETAPPEN.map((e) => { const s = schritte.filter((x) => x.etappe === e.id); const fertig = s.length && s.every((x) => x.zustand === "fertig"); return (
          <div key={e.id} className={"hm-et" + (fertig ? " fertig" : e.id === akt ? " aktiv" : "")}><div className="n">{String(e.id).padStart(2, "0")} · {e.tage}</div><div className="t">{e.name}</div><div className="z">{e.ziel}</div></div>); })}
      </div>

      <div className="hm-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", marginTop: 28 }}>
        <div className="hm-card hm-dark">
          <div className="hm-mono">Dein nächster Schritt</div>
          {naechster ? (<>
            <h3 className="hm-h hm-h2" style={{ margin: "12px 0 8px" }}>{naechster.titel}</h3>
            <div style={{ color: "var(--text-inverse-muted)", marginBottom: 20 }}>Bis {hmFmtDate(naechster.faellig)}{naechster.zustand === "freigabe" ? " · danach automatische Freigabe" : ""}</div>
            {cta ? <Btn paper onClick={() => go(cta)}>{cta === "fragebogen" ? (fb && fb.kapitelFertig && fb.kapitelFertig.length ? "Weiter im Fragebogen" : "Fragebogen starten") : "Ansehen"}</Btn> : <Btn paper onClick={() => { hmStore.patch("schritte", (l) => l.map((s) => s.id === naechster.id ? { ...s, zustand: "fertig" } : s)); hmEvent(m.id, "schritt", `${naechster.titel}: erledigt`, m.name); toast("Erledigt"); }}>Erledigt</Btn>}
          </>) : (<>
            <h3 className="hm-h hm-h2" style={{ margin: "12px 0 8px" }}>Nichts offen bei dir.</h3>
            <div style={{ color: "var(--text-inverse-muted)" }}>{team.length ? `Das Team arbeitet an ${team.length} ${team.length === 1 ? "Schritt" : "Schritten"}.` : "Alles erledigt."}</div>
          </>)}
        </div>
        <div className="hm-card">
          <div className="hm-mono">Beim Team</div>
          <div className="hm-list" style={{ marginTop: 8 }}>
            {team.length ? team.map((s) => <div key={s.id} className="hm-li"><div><div className="t">{s.titel}</div><div className="m">{s.owner} · bis {hmFmtDate(s.faellig)}</div></div><Pill z={s.zustand} /></div>) : <div className="hm-empty" style={{ padding: 20 }}>Gerade nichts in Arbeit.</div>}
          </div>
        </div>
      </div>

      {st && st.gewaehlt && <div className="hm-card" style={{ marginTop: 16, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
        <div className="hm-sw">{st.wege[st.gewaehlt].palette.map((c, i) => <i key={i} style={{ background: c }}></i>)}</div>
        <div style={{ flex: 1, minWidth: 220 }}><div className="hm-mono">Dein Weg · Version {st.version}</div><div style={{ fontSize: 18, color: "var(--ink)", marginTop: 4 }}>{st.wege[st.gewaehlt].archetyp.name}. {st.wege[st.gewaehlt].leitidee}</div></div>
        <Btn ghost onClick={() => go("strategie")}>Strategie ansehen</Btn>
      </div>}

      {m.tag > 30 && <div style={{ marginTop: 28 }}><div className="hm-mono">Für dich gerechnet</div><Empfehlungen makler={[m]} nurMakler={m.id} /></div>}
      <div style={{ marginTop: 36 }}>
        <div className="hm-mono">Zuletzt</div>
        <div style={{ marginTop: 8 }}>{events.length ? events.map((e) => <div key={e.id} className="hm-ev"><div className="d">{hmRel(e.t)}</div><div>{e.text} <span style={{ color: "var(--text-muted)" }}>· {e.akteur}</span></div></div>) : <div className="hm-ev"><div className="d">jetzt</div><div>Zugang aktiviert · System</div></div>}</div>
      </div>
    </div>
  );
}

/* ---------- Fragebogen ---------- */
function Fragebogen({ m, fb, go }) {
  const [kap, setKap] = useState(null);
  const [idx, setIdx] = useState(0);
  const [reveal, setReveal] = useState(false);
  const antworten = (fb && fb.antworten) || {};
  const fertig = (fb && fb.kapitelFertig) || [];
  const save = (id, v) => hmStore.patch("fragebogen", (all) => ({ ...(all || {}), [m.id]: { ...(fb || {}), antworten: { ...(((all || {})[m.id] || {}).antworten || antworten), [id]: v }, kapitelFertig: fertig } }));

  if (kap == null) {
    const done = HM_KAPITEL_PFLICHT.every((k) => fertig.includes(k.id));
    const beantwortet = Object.keys(antworten).length;
    return (
      <div>
        <div className="hm-mono">Etappe 01 · Entdecken</div>
        <h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>{done ? "Dein Fragebogen ist fertig." : "Fünf Kapitel. Achtzehn Minuten."}</h2>
        <p className="hm-sub">{done ? "Du kannst jede Antwort ändern. Deine Strategie rechnet dann neu. Kapitel 6 schreibt deine Geschichte, wann du willst." : "Es gibt keine falschen Antworten. Wir fragen nach dem, was du getan hast, nicht nach dem, was du über dich denkst. Am Ende jedes Kapitels siehst du, was wir daraus lesen. Unterbrechen geht jederzeit."}</p>
        <div className="hm-kap">
          {HM_KAPITEL.map((k, i) => { const f = fertig.includes(k.id); const n = k.fragen.filter((q) => antworten[q.id] != null).length; return (
            <button key={k.id} className={"hm-kapc" + (f ? " fertig" : "")} onClick={() => { setKap(i); setIdx(0); setReveal(false); }}>
              <div className="hm-mono">Kapitel {i + 1}{k.optional ? " · Vertiefung, optional" : ""}</div><div className="t">{k.name}</div><div className="s">{k.intro}</div>
              <div className="hm-mono">{f ? "Fertig" : n ? `${n} von ${k.fragen.length}` : `${k.fragen.length} Fragen`}</div>
            </button>); })}
        </div>
        <div style={{ marginTop: 26, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {done ? <Btn onClick={() => go("strategie")}>Zu deinen zwei Wegen</Btn> : <Btn onClick={() => { const next = HM_KAPITEL.findIndex((k) => !fertig.includes(k.id)); setKap(next < 0 ? 0 : next); setIdx(0); setReveal(false); }}>{beantwortet ? "Weitermachen" : "Kapitel 1 starten"}</Btn>}
          <span className="hm-mono">{beantwortet} von {HM_FRAGEN_GESAMT} Fragen beantwortet</span>
        </div>
      </div>
    );
  }

  const K = HM_KAPITEL[kap];
  const q = K.fragen[idx];
  const val = antworten[q && q.id];
  const kannWeiter = q && (q.typ === "text" || q.typ === "sortieren" || (q.typ === "paare" ? Object.keys(val || {}).length >= 4 : Array.isArray(val) ? val.length > 0 : val != null) || !!antworten[q.id + "_frei"]);

  const finishKapitel = () => {
    const neu = fertig.includes(K.id) ? fertig : [...fertig, K.id];
    const alle = HM_KAPITEL_PFLICHT.every((k) => neu.includes(k.id));
    const schonFertig = fb && fb.fertig;
    hmStore.patch("fragebogen", (all) => ({ ...(all || {}), [m.id]: { antworten, kapitelFertig: neu, fertig: alle } }));
    if (alle) {
      const wege = hmZweiWege(antworten);
      hmStore.patch("strategien", (all) => { const alt = (all || {})[m.id]; return { ...(all || {}), [m.id]: alt && schonFertig ? { ...alt, wege, version: alt.version + 1 } : { wege, gewaehlt: null, version: 1, status: "entwurf" } }; });
      hmStore.patch("schritte", (l) => l.map((s) => s.id === `${m.id}-fragebogen` ? { ...s, zustand: "fertig" } : s.id === `${m.id}-wege` ? { ...s, zustand: "wartet_makler" } : s));
      hmEvent(m.id, "fragebogen", "Fragebogen abgeschlossen, zwei Wege berechnet", m.name);
    } else hmEvent(m.id, "fragebogen", `Kapitel ${kap + 1} abgeschlossen`, m.name);
    setReveal(true);
  };

  if (reveal) return <KapitelReveal kap={kap} antworten={antworten} onWeiter={() => { setReveal(false); if (HM_KAPITEL[kap].id !== "rhythmus" && kap + 1 < HM_KAPITEL.length) { setKap(kap + 1); setIdx(0); } else { setKap(null); go("strategie"); } }} onUebersicht={() => { setReveal(false); setKap(null); }} />;

  return (
    <div className="hm-q">
      <div className="hm-row" style={{ justifyContent: "space-between" }}>
        <div className="hm-mono">Kapitel {kap + 1} · {K.name}</div>
        <div className="hm-dots">{K.fragen.map((f, i) => <i key={f.id} className={i === idx ? "on" : antworten[f.id] != null ? "done" : ""}></i>)}</div>
      </div>
      <h2 className="hm-h hm-h2">{q.frage}</h2>
      {q.hilfe && <div className="hilfe">{q.hilfe}</div>}
      <div className="body"><Frage q={q} val={val} set={(v) => save(q.id, v)} freiVal={antworten[q.id + "_frei"]} setFrei={(v) => save(q.id + "_frei", v)} /></div>
      <div className="nav">
        <button className="hm-chip" onClick={() => { if (idx === 0) setKap(null); else setIdx(idx - 1); }}>{idx === 0 ? "Übersicht" : "Zurück"}</button>
        <span className="hm-mono">{idx + 1} von {K.fragen.length}</span>
        {idx + 1 < K.fragen.length ? <Btn disabled={!kannWeiter} onClick={() => setIdx(idx + 1)}>Weiter</Btn> : <Btn disabled={!kannWeiter} onClick={finishKapitel}>Kapitel abschließen</Btn>}
      </div>
    </div>
  );
}

function Frei({ q, freiVal, setFrei }) {
  if (!q.frei) return null;
  return <input className="hm-text" style={{ fontSize: 17, marginTop: 22 }} placeholder={q.frei} value={freiVal || ""} onChange={(e) => setFrei(e.target.value)} />;
}
function Frage({ q, val, set, freiVal, setFrei }) {
  const toggleMulti = (x, max) => { const l = Array.isArray(val) ? val : []; if (l.includes(x)) set(l.filter((y) => y !== x)); else if (l.length < (max || 99)) set([...l, x]); else if (max === 1) set([x]); };
  if (q.typ === "gruppen") { const G = q.gruppen === "regionen" ? HM_REGIONEN.map((g) => ({ n: g.gruppe, o: g.orte })) : HM_IMMOTYPEN.map((g) => ({ n: g.gruppe, o: g.typen })); const l = val || []; return <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{G.map((g) => <div key={g.n}><div className="hm-mono" style={{ marginBottom: 8 }}>{g.n}</div><div className="hm-chips">{g.o.map((o) => <button key={o} className={"hm-chip" + (l.includes(o) ? " on" : "")} onClick={() => toggleMulti(o, q.max)}>{o}</button>)}</div></div>)}<div className="hm-mono">{l.length} von {q.max} gewählt</div><Frei q={q} freiVal={freiVal} setFrei={setFrei} /></div>; }
  if (q.typ === "auswahl") return <div><div className="hm-opts">{q.optionen.map((o) => <button key={o} className={"hm-opt" + (val === o ? " on" : "")} onClick={() => set(o)}>{o}<span className="g">{val === o ? "●" : "○"}</span></button>)}</div><Frei q={q} freiVal={freiVal} setFrei={setFrei} /></div>;
  if (q.typ === "mehrfach") return <div><div className="hm-opts">{q.optionen.map((o) => { const on = (val || []).includes(o); return <button key={o} className={"hm-opt" + (on ? " on" : "")} onClick={() => toggleMulti(o, q.max)}>{o}<span className="g">{on ? "●" : "+"}</span></button>; })}</div><Frei q={q} freiVal={freiVal} setFrei={setFrei} /></div>;
  if (q.typ === "bezirke") return <div className="hm-chips">{HM_BEZIRKE.map((b) => <button key={b} className={"hm-chip" + ((val || []).includes(b) ? " on" : "")} onClick={() => toggleMulti(b, 6)}>{b}</button>)}</div>;
  if (q.typ === "slider") { const v = val == null ? 50 : val; return <div className="hm-slider"><div className="lab"><span style={{ opacity: v > 60 ? .45 : 1 }}>{q.links}</span><span style={{ opacity: v < 40 ? .45 : 1 }}>{q.rechts}</span></div><input type="range" min="0" max="100" value={v} onChange={(e) => set(+e.target.value)} /><div className="hm-mono" style={{ textAlign: "center", marginTop: 8 }}>{val == null ? "Regler bewegen" : v < 40 ? q.links : v > 60 ? q.rechts : "Dazwischen"}</div></div>; }
  if (q.typ === "skala") return <div><div className="hm-skala">{[1, 2, 3, 4, 5].map((n) => <button key={n} className={val === n ? "on" : ""} onClick={() => set(n)}>{n}</button>)}</div><div className="hm-row" style={{ justifyContent: "space-between", marginTop: 10, maxWidth: 392 }}><span className="hm-mono">{q.von}</span><span className="hm-mono">{q.bis}</span></div></div>;
  if (q.typ === "text") return q.lang ? <textarea className="hm-text" rows={4} style={{ fontSize: 19, lineHeight: 1.4, resize: "vertical" }} placeholder={q.platzhalter} value={val || ""} onChange={(e) => set(e.target.value)} autoFocus /> : <input className="hm-text" placeholder={q.platzhalter} value={val || ""} onChange={(e) => set(e.target.value)} autoFocus />;
  if (q.typ === "sortieren") { const l = (val && val.length) ? val : q.optionen; const mv = (i, d) => { const n = [...l]; const j = i + d; if (j < 0 || j >= n.length) return; [n[i], n[j]] = [n[j], n[i]]; set(n); }; return <div className="hm-sort">{l.map((k, i) => <div key={k} className="it"><span className="n">{String(i + 1).padStart(2, "0")}</span><span className="t">{HM_KANAELE[k].name}</span><button onClick={() => mv(i, -1)}>↑</button><button onClick={() => mv(i, 1)}>↓</button></div>)}</div>; }
  if (q.typ === "paare") { const v = val || {}; return <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{HM_BILDPAARE.map((p) => <div key={p.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>{["a", "b"].map((k) => <button key={k} className={"hm-karte" + (v[p.id] === k ? " on" : "")} onClick={() => set({ ...v, [p.id]: k })}><div className="img" style={{ background: p[k].f, height: 56 }}></div><div className="tx" style={{ padding: "10px 14px 12px" }}><div className="t" style={{ fontSize: 15 }}>{p[k].t}</div></div></button>)}</div>)}<div className="hm-mono">{Object.keys(v).length} von {HM_BILDPAARE.length}</div></div>; }
  if (q.typ === "karten") {
    const items = q.karten === "milieus" ? HM_MILIEUS.map((x) => ({ id: x.id, t: x.titel, s: x.bild, bg: x.farbe })) : q.karten === "archetypen" ? HM_ARCHETYPEN.map((x) => ({ id: x.id, t: x.name, s: x.satz, bg: x.palette[0], bg2: x.palette[2] })) : Object.entries(HM_FORMATE).map(([id, x]) => ({ id, t: x.name, s: `${x.was}. ${x.dauer}.`, bg: "#E7E2D8" }));
    return <div className="hm-karten">{items.map((it) => { const on = (val || []).includes(it.id); return <button key={it.id} className={"hm-karte" + (on ? " on" : "")} onClick={() => toggleMulti(it.id, q.max)}><div className="img" style={{ background: it.bg2 ? `linear-gradient(135deg, ${it.bg} 60%, ${it.bg2})` : it.bg }}></div><div className="tx"><div className="t">{it.t}</div><div className="s">{it.s}</div></div></button>; })}</div>;
  }
  return null;
}

function KapitelReveal({ kap, antworten: a, onWeiter, onUebersicht }) {
  const K = HM_KAPITEL[kap];
  let kopf = "", body = null;
  if (K.id === "weg") { const g = (a.gruende || [])[0] || "Vertrauen"; kopf = `Deine Kunden kommen wegen ${g.toLowerCase()} zu dir.`; body = <p className="hm-sub">Das ist dein stärkster Beweis. Nicht das Inserat, nicht die Provision. {(a.ausloeser || []).length ? `Meist beginnt es mit: ${a.ausloeser.join(", ").toLowerCase()}.` : ""}</p>; }
  if (K.id === "menschen") { const ms = (a.milieus || []).map((id) => HM_MILIEUS.find((x) => x.id === id)).filter(Boolean); kopf = ms.length ? `${ms.map((x) => x.titel).join(" und ")}.` : "Deine Menschen."; body = <div className="hm-karten">{ms.map((x) => <div key={x.id} className="hm-karte"><div className="img" style={{ background: x.farbe }}></div><div className="tx"><div className="t">{x.titel}</div><div className="s">{x.bild}</div><div className="hm-mono" style={{ marginTop: 6 }}>Spricht auf: {x.code}</div></div></div>)}</div>; }
  if (K.id === "art") { const s = hmArchetypScores(a)[0].t; kopf = `${s.name}.`; body = <><p className="hm-sub">{s.satz} Das ist eine erste Lesung aus deinen Reglern{a.archetyp ? " und deiner Bildwahl" : ""}. Im nächsten Schritt bekommst du zwei Wege, einen der das verstärkt und einen der dich dehnt.</p><div className="hm-sw">{s.palette.map((c, i) => <i key={i} style={{ background: c }}></i>)}</div></>; }
  if (K.id === "marke") { kopf = a.behalten === "Neu aufsetzen" ? "Wir setzen neu auf." : a.behalten === "Behalten und schärfen" ? "Wir schärfen, was da ist." : "Wir bauen von Grund auf."; body = <><p className="hm-sub">Vorhanden: {(a.bestand || []).join(", ") || "noch nichts"}. {(a.assets || []).length ? `Dein Zeichen: ${a.assets.join(" und ").toLowerCase()}. Das taucht in jedem Video und jeder Grafik auf.` : ""}</p></>; }
  if (K.id === "rhythmus") { kopf = "Zwei Wege liegen bereit."; body = <p className="hm-sub">Aus deinen {HM_FRAGEN_GESAMT} Antworten haben wir zwei vollständige Strategien gerechnet. Beide passen zu dir, sie setzen unterschiedliche Schwerpunkte. Du wählst, Daniel prüft, dann geht es ins Gespräch. Kapitel 6 schreibt deine Geschichte in die Strategie, wann du magst.</p>; }
  if (K.id === "geschichte") { kopf = "Deine Geschichte steht."; body = <p className="hm-sub">Herkunft, Wende, Wohlwollen, Belege, Fehler, Fremdbild: daraus wird deine Brand Story in acht Beats. Die Strategie hat sich gerade neu gerechnet, Version plus eins.</p>; }
  return (
    <div className="hm-reveal">
      <div className="hm-mono">Kapitel {kap + 1} abgeschlossen</div>
      <h2 className="hm-h hm-h1">{kopf}</h2>
      {body}
      <div className="hm-row" style={{ marginTop: 10 }}>
        <Btn onClick={onWeiter}>{HM_KAPITEL[kap].id === "rhythmus" || kap + 1 >= HM_KAPITEL.length ? "Zur Strategie" : `Kapitel ${kap + 2}: ${HM_KAPITEL[kap + 1].name}`}</Btn>
        <button className="hm-chip" onClick={onUebersicht}>Später weitermachen</button>
      </div>
    </div>
  );
}

/* ---------- Zwei Wege und Strategie ---------- */
function Saeulen({ s, dark }) { return <div className="hm-bars">{Object.entries(s).sort((x, y) => y[1] - x[1]).map(([k, v]) => <div key={k} className="hm-bar"><span>{HM_SAEULEN[k].name}</span><div className="tr" style={dark ? { background: "rgba(247,245,241,.15)" } : {}}><i style={{ width: v + "%", background: dark ? "var(--signal)" : "" }}></i></div><span className="v">{v} %</span></div>)}</div>; }

function WegKarte({ w, key_, on, onWahl, kompakt }) {
  return (
    <div className={"hm-weg" + (on ? " on" : "")}>
      <div className="kopf"><div><div className="hm-mono">Weg {key_.toUpperCase()} · {w.rolle} · {w.archetyp.achse}</div><h3 className="hm-h name">{w.archetyp.name}</h3><div className="satz">{w.archetyp.satz}</div></div><div className="hm-sw">{w.palette.map((c, i) => <i key={i} style={{ background: c }}></i>)}</div></div>
      <div className="hm-quote">{w.satz}</div>
      <div className="hm-sec"><div className="hm-mono">Säulen</div><Saeulen s={w.saeulen} /></div>
      <div className="hm-sec"><div className="hm-mono">Formate und Kanäle</div><div className="hm-tags">{w.formate.map((f) => <span key={f} className="hm-tag">{HM_FORMATE[f].name}</span>)}{w.kanaele.map((k) => <span key={k} className="hm-tag" style={{ background: "var(--signal-soft)" }}>{HM_KANAELE[k].name}</span>)}</div><div style={{ fontSize: 13, color: "var(--text-muted)" }}>{w.frequenz}</div></div>
      {!kompakt && <div className="hm-sec"><div className="hm-mono">Drei von 30 Hooks</div><div className="hm-hooks">{w.hooks.slice(0, 3).map((h, i) => <div key={i}>{h}</div>)}</div></div>}
      <div className="hm-pf"><div><b>Passt, weil</b><ul>{w.passt.map((x, i) => <li key={i}>{x}</li>)}</ul></div><div><b>Fordert dich, weil</b><ul>{w.fordert.length ? w.fordert.map((x, i) => <li key={i}>{x}</li>) : <li>Wenig. Dieser Weg liegt nah an dem, was du heute schon bist.</li>}</ul></div></div>
      {onWahl && <Btn onClick={onWahl} style={{ alignSelf: "flex-start" }}>{on ? "Gewählt" : "Diesen Weg wählen"}</Btn>}
    </div>
  );
}

function Strategie({ m, fb, st, go }) {
  const [zeige, setZeige] = useState(null);
  if (!st || !fb || !fb.fertig) return <div><div className="hm-mono">Etappe 03 · Strategie</div><h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>Erst der Fragebogen, dann deine Strategie.</h2><p className="hm-sub">Sobald alle fünf Kapitel beantwortet sind, rechnen wir zwei Wege für dich. Das dauert keine Sekunde.</p><div style={{ marginTop: 24 }}><Btn onClick={() => go("fragebogen")}>Zum Fragebogen</Btn></div></div>;
  const wahl = (k) => {
    hmStore.patch("strategien", (all) => ({ ...all, [m.id]: { ...st, gewaehlt: k, status: "entwurf" } }));
    hmStore.patch("schritte", (l) => l.map((s) => s.id === `${m.id}-wege` ? { ...s, zustand: "fertig" } : s.id === `${m.id}-workshop` && s.zustand === "offen" ? { ...s, zustand: "geplant" } : s.id === `${m.id}-review` && s.zustand === "offen" ? { ...s, zustand: "wartet_team" } : s));
    hmEvent(m.id, "strategie", `Weg ${k.toUpperCase()} gewählt: ${st.wege[k].archetyp.name}`, m.name);
    toast(`Weg ${k.toUpperCase()} gewählt. Daniel prüft als Nächstes.`);
    setZeige(null);
  };
  if (!st.gewaehlt) return (
    <div>
      <div className="hm-mono">Etappe 01 · Zwei Wege</div>
      <h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>Zwei Wege für deine Marke.</h2>
      <p className="hm-sub">Beide kommen aus deinen Antworten. Weg A verstärkt, was du heute schon bist. Weg B setzt einen Kontrast und fordert etwas mehr. Du wählst, Daniel prüft, im Gespräch schärfen wir.</p>
      <div className="hm-wege"><WegKarte w={st.wege.a} key_="a" onWahl={() => wahl("a")} /><WegKarte w={st.wege.b} key_="b" onWahl={() => wahl("b")} /></div>
      <div className="hm-card" style={{ marginTop: 16 }}><div className="hm-mono">Wie gerechnet</div><div style={{ marginTop: 8, fontSize: 14, color: "var(--text-muted)", lineHeight: 1.5 }}>Fünf Regler (Aaker-Dimensionen), deine Bildwahl, die Wohnwelten deiner Kunden, dein Ziel und dein Kamera-Komfort ergeben eine Rangliste von sechs Figuren. Weg A ist Platz eins, Weg B der beste Kandidat auf einer anderen Achse. Rangliste: {st.wege.scores.map((s) => `${s.name} ${s.score}`).join(" · ")}.</div></div>
    </div>
  );
  const k = zeige || st.gewaehlt;
  const w = st.wege[k];
  const andere = k === "a" ? "b" : "a";
  return (
    <div>
      <div className="hm-row" style={{ justifyContent: "space-between" }}>
        <div><div className="hm-mono">Etappe 03 · Strategie · Version {st.version} · {st.status === "aktiv" ? "Aktiv" : st.status === "geprueft" ? "Geprüft von Daniel" : "Entwurf, Prüfung offen"}</div><h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>{w.archetyp.name}.</h2></div>
        <div className="hm-seg"><button className={k === st.gewaehlt ? "on" : ""} onClick={() => setZeige(null)}>Dein Weg</button><button className={k !== st.gewaehlt ? "on" : ""} onClick={() => setZeige(andere)}>Weg {andere.toUpperCase()} ansehen</button></div>
      </div>
      {k !== st.gewaehlt && <div className="hm-card" style={{ marginTop: 16, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}><span style={{ flex: 1 }}>Du siehst den nicht gewählten Weg. Wechseln geht bis zum Workshop jederzeit.</span><Btn ghost onClick={() => wahl(k)}>Zu diesem Weg wechseln</Btn></div>}
      <StrategieReveal w={w} m={m} />
    </div>
  );
}

function StrategieReveal({ w, m }) {
  const [akt, setAkt] = useState(0);
  const refs = useRef([]);
  const sections = [
    ["Positionierung", <div className="hm-quote" style={{ fontSize: 22, lineHeight: 1.35 }}>{w.satz}</div>],
    ["Brand Story", <div className="hm-beats">{w.story.map((b) => <div key={b.beat} className="hm-beat"><b>{b.beat}</b>{b.text}</div>)}</div>],
    ["Archetyp", <><p className="hm-sub" style={{ marginTop: 0 }}>{w.archetyp.satz} Leitidee: {w.leitidee}</p><div className="hm-tags">{w.ton.map((t) => <span key={t} className="hm-tag">{t}</span>)}</div></>],
    ["Deine Menschen", <div className="hm-karten">{w.milieus.map((x) => <div key={x.id} className="hm-karte"><div className="img" style={{ background: x.farbe }}></div><div className="tx"><div className="t">{x.titel}</div><div className="s">{x.bild}</div><div className="hm-mono" style={{ marginTop: 6 }}>{x.code}</div></div></div>)}<div className="hm-karte"><div className="tx"><div className="t">Fokus: {w.fokus}</div><div className="s">{w.bezirke.length ? w.bezirke.join(", ") : "Deine Bezirke"}</div><div className="hm-mono" style={{ marginTop: 6 }}>Anrede: {w.anrede}</div></div></div></div>],
    ["Distinctive Assets", <><p className="hm-sub" style={{ marginTop: 0 }}>Was in jedem Post wiederkehrt, damit man dich in einer Sekunde erkennt. Reihenfolge nach Wirkung: dein Gesicht zuerst, dann dein Name, dann Schrift, zuletzt Farbe (Romaniuk, Ehrenberg-Bass).</p><div className="hm-tags"><span className="hm-tag" style={{ background: "var(--signal-soft)" }}>Dein Gesicht, gleicher Bildausschnitt</span>{(w.assets.length ? w.assets : ["Eine Farbe", "Ein Satz"]).map((a) => <span key={a} className="hm-tag">{a}</span>)}<span className="hm-tag">Intro-Muster: gleicher erster Satz</span>{w.graetzl ? <span className="hm-tag">Dein Ort: {w.graetzl}</span> : null}</div></>],
    ["Nähe und Grenzen", <><p className="hm-sub" style={{ marginTop: 0 }}>Nicht wie viel Privates, sondern welches. Sichtbar: {w.privat.length ? w.privat.join(", ").toLowerCase() : "Alltag im Beruf und dein Grätzl"}. {w.tabus.length ? `Nie: ${w.tabus.join(", ").toLowerCase()}.` : ""} Kundenfrust und Politik bleiben immer draußen (Weijs 2019).</p><div className="hm-quote">Anrede: {w.anredeRegel}. Bei Widerspruch zwischen Zielgruppe und deiner Art gewinnt deine Art (Gretry 2017).</div><div style={{ fontSize: 13, color: "var(--text-muted)" }}>Fehlergeschichten kommen erst, wenn drei Kompetenzbelege online sind (Pratfall-Bedingung, Aronson 1966). {w.belege ? "Belege liegen vor." : "Belege fehlen noch, Kapitel 6."}</div></>],
    ["Säulen", <><Saeulen s={w.saeulen} /><div className="hm-beats" style={{ marginTop: 8 }}>{Object.entries(w.saeulen).map(([k]) => <div key={k} className="hm-beat"><b>{HM_SAEULEN[k].name}</b>{HM_SAEULEN[k].was}</div>)}</div></>],
    ["Formate, Kanäle, Rhythmus", <><div className="hm-beats">{w.formate.map((f) => <div key={f} className="hm-beat"><b>{HM_FORMATE[f].name} · {HM_FORMATE[f].dauer}</b>{HM_FORMATE[f].was}</div>)}</div><div className="hm-list" style={{ marginTop: 8 }}>{w.kanaele.map((k) => <div key={k} className="hm-li"><span className="t">{HM_KANAELE[k].name}</span><span className="m">{HM_KANAELE[k].rhythmus}</span><span></span></div>)}</div><div className="hm-quote">{w.frequenz}. Buffer-Daten: 3 bis 5 Posts pro Woche verdoppeln das Follower-Wachstum, Wochen ohne Post liegen unter der Basis.</div></>],
    ["30 Hooks", <><div className="hm-hooks">{w.hooks.map((h, i) => <div key={i}>{h}</div>)}</div><div style={{ fontSize: 13, color: "var(--text-muted)" }}>Fünf von dreißig. Die übrigen entstehen aus deinen Objekten und dem Kalender, geprüft im Workshop.</div></>],
    ["Bio", <div className="hm-quote" style={{ fontSize: 18 }}>{w.bio}</div>],
    ["Farbwelt und Schrift", <div className="hm-bp">{w.palette.map((c, i) => <div key={i} className="hm-swatch" style={{ background: c, color: i === 1 ? w.palette[0] : w.palette[1] }}><span className="hm-mono">{["Grund", "Fläche", "Akzent"][i]}</span><span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13 }}>{c}</span></div>)}<div className="hm-swatch" style={{ background: "var(--paper-2)" }}><span className="hm-mono">Schrift</span><span className="hm-type">Aa</span><span style={{ fontSize: 13 }}>{w.schrift[0]} für Titel, {w.schrift[1]} für Daten</span></div></div>],
    ["90 Tage", <><div className="hm-beats">{[["Monat 1", "Aufbau, erster Drehtag, 8 Posts, Konten verbunden, Website live. Zuerst Kompetenz: drei Belege, dann Ablauf, dann Persönliches."], ["Monat 2", "Zweiter Drehtag, Rhythmus " + w.frequenz.split(",")[0].toLowerCase() + ", erste Carousels aus Marktdaten, erste Fehler-und-Learning-Geschichte"], ["Monat 3", "Dritter Drehtag, Zweitverwertung auf allen Kanälen, Quartals-Review mit Version 2"]].map(([t, x]) => <div key={t} className="hm-beat"><b>{t}</b>{x}</div>)}</div><div className="hm-quote">Dein Anker: {w.cue || "ein fester Termin pro Woche, den wir im Workshop festlegen"}. Eine Gewohnheit braucht im Median 66 Tage (Lally 2010), ein fester Auslöser verdoppelt fast die Chance (Gollwitzer, d = 0,65).</div></>],
    ["Ziele", <><p className="hm-sub" style={{ marginTop: 0 }}>Ziel: {w.ziel}. Gemessen an Reichweite, Saves, Sends, Profilbesuchen und Anfragen. Ehrliche Erwartung: nach 90 Tagen sitzt die Routine und die ersten Signale sind da, Anfragen brauchen 6 bis 12 Monate.</p></>],
  ];
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setAkt(+e.target.dataset.i); }), { rootMargin: "-30% 0px -60% 0px" });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [w]);
  return (
    <div className="hm-strat">
      <div className="idx">{sections.map(([t], i) => <button key={t} className={akt === i ? "on" : ""} onClick={() => refs.current[i].scrollIntoView({ behavior: "smooth", block: "start" })}><span className="n">{String(i + 1).padStart(2, "0")}</span>{t}</button>)}</div>
      <div>{sections.map(([t, body], i) => <div key={t} className="hm-sblock" data-i={i} ref={(el) => (refs.current[i] = el)} style={{ scrollMarginTop: 90 }}><div className="hm-mono">{String(i + 1).padStart(2, "0")}</div><h3 className="hm-h hm-h2">{t}</h3>{body}</div>)}</div>
    </div>
  );
}

function BrandProfil({ m, st, go }) {
  if (!st || !st.gewaehlt) return <div><div className="hm-mono">Brand-Profil</div><h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>Entsteht aus deinem Weg.</h2><p className="hm-sub">Sobald du einen Weg gewählt hast, steht hier alles, was Website, Grafiken und Print brauchen: Farben, Schrift, Leitidee, Bio, Zeichen.</p><div style={{ marginTop: 24 }}><Btn onClick={() => go("strategie")}>Zur Strategie</Btn></div></div>;
  const w = st.wege[st.gewaehlt];
  return (
    <div>
      <div className="hm-mono">Brand-Profil · Version {st.version}</div>
      <h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>{m.name}</h2>
      <p className="hm-sub">{w.leitidee} Eine Seite, aus der Website, Grafik-Vorlagen und Print automatisch entstehen.</p>
      <div className="hm-bp" style={{ marginTop: 28 }}>
        {w.palette.map((c, i) => <div key={i} className="hm-swatch" style={{ background: c, color: i === 1 ? w.palette[0] : w.palette[1] }}><span className="hm-mono">{["Grund", "Fläche", "Akzent"][i]}</span><span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13 }}>{c}</span></div>)}
        <div className="hm-swatch" style={{ background: "var(--surface-raised)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}><span className="hm-mono">Schrift</span><span className="hm-type">Aa Bb 0123</span><span style={{ fontSize: 13 }}>{w.schrift[0]} und {w.schrift[1]}</span></div>
      </div>
      <div className="hm-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", marginTop: 16 }}>
        <div className="hm-card"><div className="hm-mono">Bio</div><div style={{ marginTop: 8, fontSize: 17, color: "var(--ink)" }}>{w.bio}</div></div>
        <div className="hm-card"><div className="hm-mono">Zeichen</div><div className="hm-tags" style={{ marginTop: 8 }}>{(w.assets.length ? w.assets : ["Eine Farbe", "Ein Satz"]).map((a) => <span key={a} className="hm-tag">{a}</span>)}</div><div className="hm-mono" style={{ marginTop: 14 }}>Tonalität</div><div className="hm-tags" style={{ marginTop: 8 }}>{w.ton.map((t) => <span key={t} className="hm-tag">{t}</span>)}</div></div>
        <div className="hm-card"><div className="hm-mono">Entsteht daraus</div><div className="hm-list" style={{ marginTop: 8 }}>{[["Makler-Website", "Look aus dem Shop, Felder gefüllt"], ["Grafik-Vorlagen", "Carousel, Static, Story"], ["Print", "Visitenkarte, Faltmappe, Plakat"], ["Portrait-Zuschnitt", "/maklerzuschnitt"]].map(([t, s]) => <div key={t} className="hm-li"><span className="t">{t}</span><span className="m">{s}</span><Pill z={st.status === "aktiv" ? "fertig" : "offen"} /></div>)}</div></div>
      </div>
    </div>
  );
}

/* ---------- Team ---------- */
function TeamView({ screen, go }) {
  const makler = useHm("makler") || [];
  const schritte = useHm("schritte") || [];
  const [akte, setAkte] = useState(null);
  const offenTeam = schritte.filter((s) => ["wartet_team", "in_arbeit", "geplant"].includes(s.zustand) && s.owner !== "Makler" && s.owner !== "System");
  const tickets = (useHm("tickets") || []).filter((t) => t.zustand !== "fertig").length;
  const nav = [["heute", "Heute", offenTeam.length], ["pipeline", "Makler"], ["review", "Strategie-Review"], ["produktion", "Produktion"], ["kalender", "Kalender"], ["tickets", "Tickets", tickets], ["empfehlungen", "Empfehlungen"], ["einstellungen", "Einstellungen"]];
  return (
    <div className="hm-body">
      <nav className="hm-side">{nav.map(([id, t, b]) => <a key={id} className={screen === id ? "on" : ""} onClick={() => { setAkte(null); go(id); }}>{t}{b ? <span className="hm-badge">{b}</span> : null}</a>)}<div className="hm-who">Team · Daniel, Ahmet, Nikita</div></nav>
      <main className="hm-main">
        {akte ? <Akte m={makler.find((x) => x.id === akte)} schritte={schritte.filter((s) => s.maklerId === akte)} zurueck={() => setAkte(null)} /> :
          screen === "heute" ? <Heute makler={makler} schritte={schritte} openAkte={setAkte} /> :
          screen === "pipeline" ? <Pipeline makler={makler} schritte={schritte} openAkte={setAkte} /> :
          screen === "produktion" ? <Produktion makler={makler} /> :
          screen === "kalender" ? <Kalender makler={makler} /> :
          screen === "tickets" ? <Tickets makler={makler} /> :
          screen === "empfehlungen" ? <Empfehlungen makler={makler} /> :
          screen === "einstellungen" ? <Einstellungen /> :
          <Review makler={makler} />}
      </main>
    </div>
  );
}

function setZustand(id, z, akteur) { let s0; hmStore.patch("schritte", (l) => l.map((s) => { if (s.id === id) { s0 = s; return { ...s, zustand: z }; } return s; })); if (s0) hmEvent(s0.maklerId, "schritt", `${s0.titel}: ${HM_ZUSTAND[z]}`, akteur || "Team"); }

function Heute({ makler, schritte, openAkte }) {
  const heute = hmHeute();
  const name = (id) => (makler.find((m) => m.id === id) || {}).name || id;
  const meine = schritte.filter((s) => ["wartet_team", "in_arbeit", "geplant"].includes(s.zustand) && !["Makler", "System"].includes(s.owner)).sort((a, b) => a.faellig.localeCompare(b.faellig));
  const ueberf = meine.filter((s) => s.faellig < heute);
  const wartenMakler = schritte.filter((s) => s.zustand === "wartet_makler" || s.zustand === "freigabe");
  const empf = [];
  const dreh = schritte.filter((s) => s.id.endsWith("-dreh") && s.zustand !== "fertig");
  if (dreh.length >= 2) empf.push({ t: "Sammel-Drehtag prüfen", s: `${dreh.map((d) => name(d.maklerId)).join(" und ")} haben offene Drehtage. Gleiche Region innerhalb von 10 Tagen: zusammenlegen spart ca. 1,5 h Anfahrt und Aufbau.` });
  makler.forEach((m) => { const r = m.kontingent.videos - m.verbraucht.videos; if (m.tag > 30 && r / m.kontingent.videos >= .4) empf.push({ t: `Vorproduktion für ${m.name}`, s: `${r} von ${m.kontingent.videos} Videos im Monat ungenutzt. Am nächsten Drehtag Evergreen-Inhalte vorproduzieren.` }); });
  const events = (useHm("events") || []).slice(0, 8);
  return (
    <div>
      <div className="hm-mono">Team · {new Date(2026, 8, 23).toLocaleDateString("de-AT", { weekday: "long", day: "2-digit", month: "long" })}</div>
      <h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>{meine.length ? `${meine.length} ${meine.length === 1 ? "Schritt liegt" : "Schritte liegen"} beim Team.` : "Nichts liegt beim Team."}</h2>
      <p className="hm-sub">{ueberf.length ? `${ueberf.length} davon überfällig. ` : ""}{wartenMakler.length} warten auf Makler. Empfehlungen unten sind Rechnungen, keine Tipps.</p>
      <div className="hm-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", marginTop: 28 }}>
        <div className="hm-card"><div className="hm-mono">Wartet auf uns</div><div className="hm-list" style={{ marginTop: 8 }}>{meine.length ? meine.map((s) => <div key={s.id} className="hm-li"><div><div className="t">{s.titel}</div><div className="m"><button className="hm-chip" style={{ padding: "2px 8px", fontSize: 12 }} onClick={() => openAkte(s.maklerId)}>{name(s.maklerId)}</button> {s.owner} · bis {hmFmtDate(s.faellig)}{s.faellig < heute ? " · überfällig" : ""}</div></div><Pill z={s.zustand} /><select className="hm-sel" value={s.zustand} onChange={(e) => setZustand(s.id, e.target.value, s.owner)}>{Object.entries(HM_ZUSTAND).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>) : <div className="hm-empty">Frei.</div>}</div></div>
        <div className="hm-card"><div className="hm-mono">Wartet auf Makler</div><div className="hm-list" style={{ marginTop: 8 }}>{wartenMakler.map((s) => <div key={s.id} className="hm-li"><div><div className="t">{s.titel}</div><div className="m">{name(s.maklerId)} · bis {hmFmtDate(s.faellig)}</div></div><Pill z={s.zustand} /><button className="hm-chip" onClick={() => { hmEvent(s.maklerId, "erinnerung", `Erinnerung: ${s.titel}`, "Team"); toast("Erinnerung gesendet"); }}>Erinnern</button></div>)}</div></div>
      </div>
      <div className="hm-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", marginTop: 16 }}>
        <div className="hm-card hm-dark"><div className="hm-mono">Empfehlungen · alle unter Empfehlungen</div>{empf.length ? empf.map((e, i) => <div key={i} style={{ padding: "14px 0", borderBottom: i < empf.length - 1 ? "1px solid rgba(247,245,241,.14)" : 0 }}><div style={{ fontSize: 17, marginBottom: 4 }}>{e.t}</div><div style={{ color: "var(--text-inverse-muted)", fontSize: 14, lineHeight: 1.45 }}>{e.s}</div><div className="hm-row" style={{ marginTop: 10 }}><Btn paper onClick={() => toast("Angenommen")}>Annehmen</Btn><button className="hm-chip" style={{ color: "var(--paper)", boxShadow: "inset 0 0 0 1px rgba(247,245,241,.3)" }} onClick={() => toast("Abgelehnt, Grund gespeichert")}>Ablehnen</button></div></div>) : <div style={{ color: "var(--text-inverse-muted)", marginTop: 8 }}>Keine Regel feuert heute.</div>}</div>
        <div className="hm-card"><div className="hm-mono">Zuletzt</div><div style={{ marginTop: 8 }}>{events.map((e) => <div key={e.id} className="hm-ev"><div className="d">{hmRel(e.t)}</div><div>{e.text} <span style={{ color: "var(--text-muted)" }}>· {name(e.maklerId)} · {e.akteur}</span></div></div>)}</div></div>
      </div>
    </div>
  );
}

function Pipeline({ makler, schritte, openAkte }) {
  return (
    <div>
      <div className="hm-mono">Makler · {makler.length} im Abo</div>
      <h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>Wo jeder steht.</h2>
      <div className="hm-pipe">{HM_ETAPPEN.map((e) => { const ms = makler.filter((m) => etappeAktuell(schritte.filter((s) => s.maklerId === m.id)) === e.id); return <div key={e.id} className="hm-col"><div className="hd"><span className="hm-mono">{String(e.id).padStart(2, "0")} {e.name}</span><span className="hm-mono">{ms.length || ""}</span></div>{ms.map((m) => { const off = schritte.filter((s) => s.maklerId === m.id && ["wartet_makler", "freigabe"].includes(s.zustand)).length; return <button key={m.id} className="hm-mk" onClick={() => openAkte(m.id)}><div className="hm-row" style={{ gap: 8 }}><span className="hm-av">{m.kurz}</span><span>{m.name}</span></div><div className="m">{m.tag > 30 ? `Monat ${Math.floor(m.tag / 30)}` : `Tag ${m.tag}`} · {m.region}{off ? ` · ${off} bei Makler` : ""}</div></button>; })}</div>; })}</div>
    </div>
  );
}

function Akte({ m, schritte, zurueck }) {
  const msgs = (useHm("nachrichten") || []).filter((n) => n.maklerId === m.id);
  const st = (useHm("strategien") || {})[m.id];
  const [txt, setTxt] = useState("");
  const [sel, setSel] = useState(null);
  const send = () => { if (!txt.trim()) return; hmStore.patch("nachrichten", (l) => [...(l || []), { id: Math.random().toString(36).slice(2), maklerId: m.id, schrittId: sel, von: "Daniel", t: Date.now(), text: txt }]); hmEvent(m.id, "nachricht", "Nachricht vom Team", "Daniel"); setTxt(""); toast("Gesendet"); };
  return (
    <div>
      <button className="hm-chip" onClick={zurueck}>← Zurück</button>
      <div className="hm-row" style={{ marginTop: 18, gap: 16 }}><span className="hm-av" style={{ width: 44, height: 44, fontSize: 14 }}>{m.kurz}</span><div><h2 className="hm-h hm-h2">{m.name}</h2><div className="hm-mono" style={{ marginTop: 4 }}>{m.abo} · {m.region} · Tag {m.tag} · Videos {m.verbraucht.videos}/{m.kontingent.videos} · Fotos {m.verbraucht.fotos}/{m.kontingent.fotos} · Grafiken {m.verbraucht.grafiken}/{m.kontingent.grafiken}</div></div></div>
      {st && st.gewaehlt && <div className="hm-card" style={{ marginTop: 20, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}><div className="hm-sw">{st.wege[st.gewaehlt].palette.map((c, i) => <i key={i} style={{ background: c }}></i>)}</div><div style={{ flex: 1 }}><div className="hm-mono">Weg {st.gewaehlt.toUpperCase()} · Version {st.version} · {st.status}</div><div style={{ fontSize: 17, color: "var(--ink)" }}>{st.wege[st.gewaehlt].archetyp.name}. {st.wege[st.gewaehlt].leitidee}</div></div></div>}
      <div className="hm-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", marginTop: 16 }}>
        <div className="hm-card"><div className="hm-mono">Schritte</div><div className="hm-list" style={{ marginTop: 8 }}>{HM_ETAPPEN.map((e) => { const ss = schritte.filter((s) => s.etappe === e.id); return ss.map((s, i) => <div key={s.id} className="hm-li" style={{ background: sel === s.id ? "var(--paper-2)" : "", margin: "0 -8px", padding: "10px 8px", borderRadius: 10 }} onClick={() => setSel(s.id)}><div><div className="t">{i === 0 ? <span className="hm-mono" style={{ marginRight: 8 }}>{String(e.id).padStart(2, "0")}</span> : null}{s.titel}</div><div className="m">{s.owner} · {hmFmtDate(s.faellig)}</div></div><Pill z={s.zustand} /><select className="hm-sel" value={s.zustand} onClick={(ev) => ev.stopPropagation()} onChange={(ev) => setZustand(s.id, ev.target.value, "Team")}>{Object.entries(HM_ZUSTAND).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>); })}</div></div>
        <div className="hm-card"><div className="hm-mono">Nachrichten {sel ? `· am Schritt "${(schritte.find((s) => s.id === sel) || {}).titel}"` : "· Schritt links wählen"}</div><div style={{ marginTop: 8 }}>{msgs.filter((n) => !sel || n.schrittId === sel).map((n) => <div key={n.id} className="hm-msg"><span className="hm-av" style={{ background: n.von === "Daniel" ? "var(--signal)" : "", color: n.von === "Daniel" ? "var(--on-signal)" : "" }}>{n.von.slice(0, 1)}</span><div><div className="w">{n.von} · {hmRel(n.t)}{n.schrittId && !sel ? ` · ${(schritte.find((s) => s.id === n.schrittId) || {}).titel}` : ""}</div>{n.text}</div></div>)}{!msgs.length && <div className="hm-empty" style={{ padding: 20 }}>Noch keine Nachrichten.</div>}</div><div className="hm-inp"><input placeholder={sel ? "Nachricht an den Schritt" : "Erst einen Schritt wählen"} disabled={!sel} value={txt} onChange={(e) => setTxt(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} /><Btn onClick={send} disabled={!sel}>Senden</Btn></div></div>
      </div>
    </div>
  );
}

function Review({ makler }) {
  const strategien = useHm("strategien") || {};
  const offen = makler.filter((m) => strategien[m.id]);
  const [mid, setMid] = useState((offen[0] || {}).id);
  const m = makler.find((x) => x.id === mid);
  const st = strategien[mid];
  const setStatus = (status) => { hmStore.patch("strategien", (all) => ({ ...all, [mid]: { ...st, status } })); hmStore.patch("schritte", (l) => l.map((s) => s.id === `${mid}-review` && status === "geprueft" ? { ...s, zustand: "fertig" } : s.id === `${mid}-praesentation` && status === "geprueft" ? { ...s, zustand: "wartet_makler" } : s)); hmEvent(mid, "strategie", `Strategie ${status}`, "Daniel"); toast(status === "geprueft" ? "Geprüft. Der Makler sieht die Strategie jetzt." : "Gespeichert"); };
  const wechsel = (k) => { hmStore.patch("strategien", (all) => ({ ...all, [mid]: { ...st, gewaehlt: k, version: st.version + 1 } })); hmEvent(mid, "strategie", `Daniel hat auf Weg ${k.toUpperCase()} gewechselt`, "Daniel"); toast(`Weg ${k.toUpperCase()}, Version ${st.version + 1}`); };
  if (!st) return <div className="hm-empty">Noch keine Strategie zu prüfen.</div>;
  return (
    <div>
      <div className="hm-row" style={{ justifyContent: "space-between" }}><div><div className="hm-mono">Strategie-Review</div><h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>{m.name}</h2></div><select className="hm-sel" value={mid} onChange={(e) => setMid(e.target.value)}>{offen.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></div>
      <p className="hm-sub">{st.gewaehlt ? `Makler hat Weg ${st.gewaehlt.toUpperCase()} gewählt. Status: ${st.status}, Version ${st.version}.` : "Makler hat noch nicht gewählt. Beide Wege sind sichtbar."}</p>
      <div className="hm-row" style={{ marginTop: 18 }}>{st.gewaehlt && st.status !== "aktiv" && <Btn onClick={() => setStatus(st.status === "geprueft" ? "aktiv" : "geprueft")}>{st.status === "geprueft" ? "Als aktiv setzen" : "Als geprüft freigeben"}</Btn>}{st.gewaehlt && <button className="hm-chip" onClick={() => wechsel(st.gewaehlt === "a" ? "b" : "a")}>Auf Weg {st.gewaehlt === "a" ? "B" : "A"} wechseln</button>}</div>
      <div className="hm-wege"><WegKarte w={st.wege.a} key_="a" on={st.gewaehlt === "a"} kompakt /><WegKarte w={st.wege.b} key_="b" on={st.gewaehlt === "b"} kompakt /></div>
      <div className="hm-card" style={{ marginTop: 16 }}><div className="hm-mono">Rangliste aus dem Fragebogen</div><div className="hm-bars" style={{ marginTop: 10 }}>{st.wege.scores.map((s) => <div key={s.id} className="hm-bar"><span>{s.name}</span><div className="tr"><i style={{ width: Math.max(0, Math.min(100, s.score)) + "%" }}></i></div><span className="v">{s.score}</span></div>)}</div></div>
    </div>
  );
}

hmSeed();
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
