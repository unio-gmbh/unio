/* UNIO HUMAN. Heute (Makler und Team), Akquise, Makler-Arbeitsbereich, Meetings, Kontakte, Ressourcen. */

function MaklerHeute({ m, go, oeffne }) {
  const content = (useHm("content") || []).filter((c) => c.maklerId === m.id);
  const { st } = useEinrichtung(m.id);
  const drehtage = (useHm("drehtage") || []).filter((d) => d.slots.some((s) => s.maklerId === m.id) && d.status !== "fertig" && d.datum >= "2026-09-28").sort((a, b) => a.datum.localeCompare(b.datum));
  const fb = (useHm("fragebogen") || {})[m.id];
  const strat = (useHm("strategien") || {})[m.id];
  useHm("branding");
  const b = hmBrand(m.id);
  const events = (useHm("events") || []).filter((e) => e.maklerId === m.id).slice(0, 5);
  const einFertig = HM_EINRICHTUNG.filter((e) => st[e.id] === "fertig").length;
  const freigaben = content.filter((c) => c.zustand === "freigabe");
  const ideen = content.filter((c) => c.zustand === "idee");
  const woche = content.filter((c) => c.termin && c.termin.slice(0, 10) >= "2026-09-28" && c.termin.slice(0, 10) <= "2026-10-05").sort((a, b2) => a.termin.localeCompare(b2.termin));
  /* genau eine nächste Sache */
  let next = null;
  if (st.vertrag !== "fertig") next = ["Vertrag unterschreiben", "Drei Minuten, danach geht es los.", () => go("einrichtung")];
  else if (!fb || !fb.fertig) next = ["Fragebogen beantworten", "18 Minuten. Daraus entstehen zwei Wege für deine Marke.", () => go("marke", { sub: "fragebogen" })];
  else if (strat && !strat.gewaehlt) next = ["Deinen Weg wählen", "Zwei Strategien liegen bereit.", () => go("marke", { sub: "konzept" })];
  else if (freigaben.length) next = [`${freigaben.length} ${freigaben.length === 1 ? "Beitrag wartet" : "Beiträge warten"} auf dich`, `Zuerst: ${freigaben[0].titel}`, () => oeffne(freigaben[0].id)];
  else if (strat && strat.gewaehlt && !b.fertig) next = ["Branding ansehen und freigeben", "Logo, Schrift und Farbe sind vorbereitet.", () => go("marke", { sub: "design" })];
  else if (einFertig < HM_EINRICHTUNG.length) { const e = HM_EINRICHTUNG.find((x) => st[x.id] !== "fertig" && st[x.id] !== "wartet_team"); if (e) next = [e.titel, e.satz, () => go("einrichtung")]; }
  if (!next && ideen.length) next = [`${ideen.length} Ideen für Oktober`, "Wähle, was wir drehen.", () => go("inhalte")];
  const tagText = m.tag > 30 ? `Monat ${Math.floor(m.tag / 30)}` : `Tag ${m.tag} von 30`;
  return <div>
    <div className="hm-mono">{tagText} · {m.abo}</div>
    <h2 className="hm-h hm-h1" style={{ marginTop: 10 }}>Guten Morgen, {m.name.split(" ")[0]}.</h2>
    {next ? <button className="hm-weiter gross" onClick={next[2]}><div><div className="hm-mono" style={{ color: "var(--text-inverse-muted)" }}>Als Nächstes</div><div style={{ fontSize: 28, letterSpacing: "-.02em", marginTop: 6 }}>{next[0]}</div><div style={{ color: "var(--text-inverse-muted)", marginTop: 4 }}>{next[1]}</div></div><span className="k">→</span></button> : <div className="hm-weiter gross" style={{ cursor: "default" }}><div><div className="hm-mono" style={{ color: "var(--text-inverse-muted)" }}>Als Nächstes</div><div style={{ fontSize: 28, letterSpacing: "-.02em", marginTop: 6 }}>Nichts. Wir arbeiten.</div></div></div>}
    <div className="hm-heute-grid">
      {einFertig < HM_EINRICHTUNG.length && <button className="hm-card klick" onClick={() => go("einrichtung")}><div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-mono">Einrichtung</div><Ring wert={einFertig / HM_EINRICHTUNG.length} groesse={40} dicke={4} /></div><div style={{ fontSize: 22, color: "var(--ink)", marginTop: 8 }}>{einFertig} von {HM_EINRICHTUNG.length} erledigt</div><div className="hm-sub" style={{ fontSize: 14, marginTop: 4 }}>{HM_EINRICHTUNG.filter((e) => st[e.id] === "wartet_team").length} liegen beim Team</div></button>}
      <div className="hm-card"><div className="hm-mono">Diese Woche</div><div className="hm-list" style={{ marginTop: 6 }}>{drehtage.slice(0, 1).map((d) => <Zeile key={d.id} titel={`Drehtag, ${hmDatum(d.datum)}`} unter={d.location} rechts={<span className="hm-dotz" style={{ background: "var(--signal)" }}></span>} />)}{woche.map((c) => <Zeile key={c.id} titel={c.titel} unter={`${hmDatum(c.termin)} ${hmZeit(c.termin)}`} rechts={<ZPunkt z={c.zustand} />} onClick={() => oeffne(c.id)} />)}{!woche.length && !drehtage.length && <div style={{ fontSize: 14, color: "var(--text-muted)", padding: "10px 0" }}>Ruhige Woche.</div>}</div></div>
      {b.w && <button className="hm-card klick" onClick={() => go("marke")}><div className="hm-mono">Deine Marke</div><div style={{ margin: "14px 0 10px" }}><BrandLogo b={b} h={28} /></div><div style={{ fontSize: 14, color: "var(--text-muted)" }}>{b.fertig ? "Freigegeben" : "Entwurf"} · {b.w.archetyp.name} · {b.schrift.name}</div></button>}
    </div>
    <div style={{ marginTop: 30 }}><div className="hm-mono">Zuletzt</div><div style={{ marginTop: 8 }}>{events.map((e) => <div key={e.id} className="hm-ev"><div className="d">{hmRel(e.t)}</div><div>{e.text} <span style={{ color: "var(--text-muted)" }}>· {e.akteur}</span></div></div>)}</div></div>
  </div>;
}

function TeamHeute({ go, oeffne, oeffneMakler }) {
  const makler = useHm("makler") || [];
  const content = useHm("content") || [];
  const ein = useHm("einrichtung") || {};
  const leads = useHm("leads") || [];
  const branding = useHm("branding") || {};
  const web = useHm("website") || {};
  const name = (id) => (makler.find((x) => x.id === id) || {}).name || id;
  const aufgaben = [];
  makler.forEach((m) => { HM_EINRICHTUNG.forEach((e) => { if ((ein[m.id] || {})[e.id] === "wartet_team") aufgaben.push({ k: "Einrichtung", t: `${e.titel} bestätigen`, m: m.id, go: () => oeffneMakler(m.id, "einrichtung") }); }); });
  content.filter((c) => c.zustand === "schnitt" && !c.schnittFertig).forEach((c) => aufgaben.push({ k: "Schnitt", t: c.titel, m: c.maklerId, go: () => oeffne(c.id) }));
  content.filter((c) => c.zustand === "aenderung").forEach((c) => aufgaben.push({ k: "Änderung", t: c.titel, m: c.maklerId, go: () => oeffne(c.id) }));
  content.filter((c) => c.zustand === "dreh").forEach((c) => aufgaben.push({ k: "Dreh", t: c.titel, m: c.maklerId, go: () => oeffne(c.id) }));
  Object.entries(web).forEach(([mid, w]) => { if (w.status === "pruefung") aufgaben.push({ k: "Website", t: "Website prüfen und live schalten", m: mid, go: () => oeffneMakler(mid, "marke", "website") }); });
  Object.entries(branding).forEach(([mid, b2]) => { if (b2.status === "entwurf" || b2.status === "geaendert") aufgaben.push({ k: "Branding", t: "Branding-Entwurf prüfen", m: mid, go: () => oeffneMakler(mid, "marke", "design") }); });
  const warten = content.filter((c) => c.zustand === "freigabe");
  return <div>
    <Kopf ueber={`Team · ${new Date(2026, 8, 28).toLocaleDateString("de-AT", { weekday: "long", day: "2-digit", month: "long" })}`} titel={aufgaben.length ? `${aufgaben.length} Dinge brauchen uns.` : "Nichts brauchen uns gerade."} text={`${warten.length} Beiträge warten auf Makler. ${leads.filter((l) => l.stufe !== "onboarding").length} Kontakte in der Akquise.`} />
    <div className="hm-heute-grid" style={{ gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)" }}>
      <div className="hm-card"><div className="hm-mono">Wartet auf uns</div><div className="hm-list" style={{ marginTop: 6 }}>{aufgaben.map((a, i) => <Zeile key={i} links={<span className="hm-typ">{a.k}</span>} titel={a.t} unter={name(a.m)} onClick={a.go} rechts="→" />)}{!aufgaben.length && <div style={{ padding: "12px 0", color: "var(--text-muted)" }}>Frei.</div>}</div></div>
      <div className="hm-stack">
        <div className="hm-card"><div className="hm-mono">Wartet auf Makler</div><div className="hm-list" style={{ marginTop: 6 }}>{warten.map((c) => <Zeile key={c.id} titel={c.titel} unter={`${name(c.maklerId)} · ${hmDatum(c.termin)}`} onClick={() => oeffne(c.id)} rechts={<button className="hm-chip" onClick={(e) => { e.stopPropagation(); hmEvent(c.maklerId, "erinnerung", `Erinnerung: ${c.titel} freigeben`, "Team"); toast("Erinnert"); }}>Erinnern</button>} />)}</div></div>
        <div className="hm-card"><div className="hm-mono">Empfehlungen</div><Empfehlungen makler={makler} kurz /></div>
      </div>
    </div>
  </div>;
}

function Akquise({ oeffneMakler }) {
  const leads = useHm("leads") || [];
  const [detail, setDetail] = React.useState(null);
  const [ueber, setUeber] = React.useState(null);
  const set = (id, patch) => hmStore.patch("leads", (l) => l.map((x) => x.id === id ? { ...x, ...patch } : x));
  const l = leads.find((x) => x.id === detail);
  const starten = (lead) => {
    const id = lead.name.split(" ")[0].toLowerCase() + Date.now().toString(36).slice(-3);
    hmStore.patch("makler", (a) => [...(a || []), { id, name: lead.name, kurz: lead.name.split(" ").map((x) => x[0]).join(""), region: lead.ort, abo: "Personal Brand", tag: 0, kontingent: { videos: 3, fotos: 10, grafiken: 7 }, verbraucht: { videos: 0, fotos: 0, grafiken: 0 } }]);
    hmStore.patch("schritte", (a) => [...(a || []), ...hmSchritteFuer(id, 0)]);
    hmStore.patch("einrichtung", (a) => ({ ...(a || {}), [id]: {} }));
    hmStore.patch("kontakte", (a) => ({ ...(a || {}), [id]: [{ name: lead.name, rolle: "Makler", mail: "", freigabe: true }] }));
    set(lead.id, { stufe: "onboarding", maklerId: id, naechstes: "Einrichtung läuft" });
    hmEvent(id, "akquise", "Onboarding gestartet, Zugang verschickt", "Nikita");
    toast(`${lead.name} ist angelegt. Der Zugang geht per Mail raus.`);
    setDetail(null);
  };
  return <div>
    <Kopf ueber="Akquise" titel="Vom ersten Kontakt bis zum Start." text="Recherche, Kennenlernen, Nachfassen, Deep Dive. Wer unterschreibt, startet mit einem Klick ins Onboarding." rechts={<Btn knob="+" onClick={() => { const id = "l" + Date.now(); hmStore.patch("leads", (a) => [{ id, name: "Neuer Kontakt", ort: "Wien", quelle: "Recherche", stufe: "research", naechstes: "Erste Nachricht senden", notiz: "", owner: "Nikita" }, ...(a || [])]); setDetail(id); }}>Kontakt</Btn>} />
    <div className="hm-board" style={{ gridTemplateColumns: `repeat(${HM_AKQUISE_STUFEN.length}, minmax(210px, 1fr))` }}>{HM_AKQUISE_STUFEN.map((s) => { const ls = leads.filter((x) => x.stufe === s.id); return <div key={s.id} className={"hm-spalte" + (ueber === s.id ? " ueber" : "")} onDragOver={(e) => { e.preventDefault(); setUeber(s.id); }} onDragLeave={() => setUeber(null)} onDrop={(e) => { e.preventDefault(); setUeber(null); set(e.dataTransfer.getData("text/plain"), { stufe: s.id }); }}>
      <div className="hd"><span>{s.name}</span><span className="n">{ls.length}</span></div>
      {ls.map((x) => <div key={x.id} className="hm-kk" draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", x.id)} onClick={() => setDetail(x.id)}><div className="hm-row" style={{ gap: 8 }}><Avatar name={x.name} /><div style={{ minWidth: 0 }}><div className="t" style={{ margin: 0 }}>{x.name}</div><div className="hm-mono">{x.ort}</div></div></div><div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8 }}>{x.naechstes}</div></div>)}
    </div>; })}</div>
    <Sheet offen={!!l} zu={() => setDetail(null)} titel={l ? l.name : ""} unter={l ? `${l.ort} · über ${l.quelle} · ${l.owner}` : ""}>
      {l && <div className="hm-stack">
        <div className="hm-feld2"><label className="hm-feld"><span>Name</span><input value={l.name} onChange={(e) => set(l.id, { name: e.target.value })} /></label><label className="hm-feld"><span>Region</span><input value={l.ort} onChange={(e) => set(l.id, { ort: e.target.value })} /></label></div>
        <label className="hm-feld"><span>Nächster Schritt</span><input value={l.naechstes} onChange={(e) => set(l.id, { naechstes: e.target.value })} /></label>
        <label className="hm-feld"><span>Notiz</span><textarea rows={3} value={l.notiz} onChange={(e) => set(l.id, { notiz: e.target.value })} /></label>
        <div className="hm-seg">{HM_AKQUISE_STUFEN.map((s) => <button key={s.id} className={l.stufe === s.id ? "on" : ""} onClick={() => set(l.id, { stufe: s.id })}>{s.name.split(" ")[0]}</button>)}</div>
        {l.maklerId ? <Btn onClick={() => { setDetail(null); oeffneMakler(l.maklerId, "einrichtung"); }}>Zur Einrichtung</Btn> : <Btn onClick={() => starten(l)}>Vertrag unterschrieben, Onboarding starten</Btn>}
      </div>}
    </Sheet>
  </div>;
}

function MaklerListe({ oeffneMakler }) {
  const makler = useHm("makler") || [];
  const ein = useHm("einrichtung") || {};
  const content = useHm("content") || [];
  return <div>
    <Kopf ueber="Makler" titel={`${makler.length} Makler im Programm.`} text="Jeder hat einen eigenen Arbeitsbereich mit Inhalten, Marke, Einrichtung und Wirkung." />
    <div className="hm-maklerkarten">{makler.map((m) => { const e = ein[m.id] || {}; const f = HM_EINRICHTUNG.filter((x) => e[x.id] === "fertig").length; const b = hmBrand(m.id); const offen = content.filter((c) => c.maklerId === m.id && c.zustand === "freigabe").length; return <button key={m.id} className="hm-card klick" onClick={() => oeffneMakler(m.id)}>
      <div className="hm-row" style={{ gap: 12 }}><Avatar name={m.name} gross bild={b.portrait} /><div style={{ minWidth: 0 }}><div style={{ fontSize: 18, color: "var(--ink)" }}>{m.name}</div><div className="hm-mono">{m.region} · {m.tag > 30 ? `Monat ${Math.floor(m.tag / 30)}` : `Tag ${m.tag}`}</div></div></div>
      <div className="hm-row" style={{ gap: 14, marginTop: 16 }}><div className="hm-row" style={{ gap: 6 }}><Ring wert={f / HM_EINRICHTUNG.length} groesse={28} dicke={3} /><span className="hm-mono">{f}/{HM_EINRICHTUNG.length}</span></div><span className="hm-mono">{b.fertig ? "Marke freigegeben" : b.w ? "Marke im Entwurf" : "Fragebogen offen"}</span>{offen ? <span className="hm-ez z-freigabe">{offen} Freigaben</span> : null}</div>
    </button>; })}</div>
  </div>;
}

function Meetings({ m }) {
  const alle = useHm("meetings") || [];
  const liste = alle.filter((x) => !m || x.maklerId === m.id).sort((a, b) => b.datum.localeCompare(a.datum));
  const [detail, setDetail] = React.useState(null);
  const d = liste.find((x) => x.id === detail);
  return <div>
    <Kopf ueber="Meetings" titel="Jedes Gespräch, festgehalten." text="Aufnahme, Transkript, Zusammenfassung und Aufgaben landen automatisch hier. Transkription im Betrieb mit Whisper." rechts={<a className="hm-btn" href="https://meet.google.com/new" target="_blank" rel="noopener" style={{ textDecoration: "none" }}>Meeting starten<span className="k">↗</span></a>} />
    <div className="hm-stack" style={{ marginTop: 22 }}>{liste.map((x) => <button key={x.id} className="hm-card klick" onClick={() => setDetail(x.id)}><div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-h hm-h3">{x.titel}</div><span className="hm-mono">{hmDatum(x.datum)} · {x.dauer} Min</span></div><div className="hm-sub" style={{ fontSize: 14 }}>{x.zusammenfassung}</div><div className="hm-mono" style={{ marginTop: 8 }}>{x.aufgaben.length} Aufgaben · {x.teilnehmer.join(", ")}</div></button>)}{!liste.length && <Leer titel="Noch keine Meetings." text="Der Strategie-Workshop erscheint hier mit Transkript." />}</div>
    <Sheet offen={!!d} zu={() => setDetail(null)} titel={d ? d.titel : ""} unter={d ? `${hmDatum(d.datum)} · ${d.dauer} Minuten · ${d.teilnehmer.join(", ")}` : ""} breit>
      {d && <div className="hm-stack"><div className="hm-card" style={{ background: "var(--paper-2)", boxShadow: "none" }}><div className="hm-mono">Zusammenfassung</div><div style={{ marginTop: 6, color: "var(--ink)" }}>{d.zusammenfassung}</div></div><div><div className="hm-mono" style={{ marginBottom: 6 }}>Aufgaben</div>{d.aufgaben.map((a) => <Haken key={a} an={false} set={() => toast("Als Aufgabe übernommen")}>{a}</Haken>)}</div><div><div className="hm-mono" style={{ marginBottom: 6 }}>Transkript</div><div className="hm-transkript">{d.transkript}</div></div></div>}
    </Sheet>
  </div>;
}

function Kontakte({ m }) {
  const k = useHm("kontakte") || {};
  const liste = k[m.id] || [];
  const set = (i, patch) => hmStore.patch("kontakte", (a) => ({ ...a, [m.id]: (a[m.id] || []).map((x, j) => j === i ? { ...x, ...patch } : x) }));
  return <div>
    <Kopf ueber="Kontakte" titel="Wer mitarbeitet." text="Wer Freigabe hat, bekommt eine Mail, sobald ein Beitrag fertig ist." />
    <div className="hm-mono" style={{ marginTop: 22, marginBottom: 10 }}>UNIO Team</div>
    <div className="hm-maklerkarten">{HM_TEAM.map((t) => <div key={t.id} className="hm-card"><div className="hm-row" style={{ gap: 10 }}><Avatar name={t.name} /><div><div style={{ color: "var(--ink)" }}>{t.name}</div><div className="hm-mono">{t.rolle}</div></div></div></div>)}</div>
    <div className="hm-mono" style={{ marginTop: 26, marginBottom: 10 }}>Bei {m.name}</div>
    <div className="hm-card">{liste.map((x, i) => <Zeile key={i} links={<Avatar name={x.name} />} titel={x.name} unter={`${x.rolle}${x.mail ? " · " + x.mail : ""}`} rechts={<button className={"hm-schalter" + (x.freigabe ? " an" : "")} onClick={() => set(i, { freigabe: !x.freigabe })}><i></i>Freigabe</button>} />)}<div style={{ marginTop: 10 }}><button className="hm-chip" onClick={() => hmStore.patch("kontakte", (a) => ({ ...a, [m.id]: [...(a[m.id] || []), { name: "Neue Person", rolle: "Assistenz", mail: "", freigabe: false }] }))}>+ Person</button></div></div>
  </div>;
}

function Ressourcen({ m }) {
  const vorlagen = useHm("vorlagen") || [];
  const [neu, setNeu] = React.useState(false);
  const [name, setName] = React.useState(""); const [text, setText] = React.useState("");
  const b = m ? hmBrand(m.id) : null;
  return <div>
    <Kopf ueber="Ressourcen" titel="Vorlagen und Marke." text="Skript-Vorlagen gelten für alle oder nur für einen Makler. Sie sind im Skript eines Beitrags mit einem Klick eingesetzt." rechts={<Btn knob="+" onClick={() => setNeu(true)}>Vorlage</Btn>} />
    {b && b.w && <><div className="hm-mono" style={{ marginTop: 22, marginBottom: 10 }}>Marke von {m.name}</div><div className="hm-card hm-row" style={{ gap: 20 }}><BrandLogo b={b} h={26} /><span className="hm-mono">{b.schrift.name} · {(HM_WEB_AKZENTE.find((x) => x.id === b.akzentId) || {}).name}</span><i style={{ width: 22, height: 22, borderRadius: 6, background: b.akzent }}></i></div></>}
    {[["Nur für " + (m ? m.name : "diesen Makler"), vorlagen.filter((v) => m && v.maklerId === m.id)], ["Für alle", vorlagen.filter((v) => v.global)]].map(([t, l]) => <div key={t}><div className="hm-mono" style={{ marginTop: 22, marginBottom: 10 }}>{t} · {l.length}</div><div className="hm-card">{l.map((v) => <Zeile key={v.id} titel={v.name} unter={`${v.woerter} Wörter · ${v.text.split("\n")[0]}`} />)}{!l.length && <div style={{ fontSize: 14, color: "var(--text-muted)" }}>Noch keine.</div>}</div></div>)}
    <Sheet offen={neu} zu={() => setNeu(false)} titel="Neue Vorlage" fuss={<Btn disabled={!name.trim() || !text.trim()} onClick={() => { hmStore.patch("vorlagen", (a) => [...(a || []), { id: "v" + Date.now(), name, text, woerter: hmWoerter(text), global: !m, maklerId: m ? m.id : null }]); setNeu(false); setName(""); setText(""); toast("Vorlage gespeichert"); }}>Speichern</Btn>}>
      <div className="hm-stack"><label className="hm-feld"><span>Name</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Reel · Drei Zahlen" /></label><label className="hm-feld"><span>Text</span><textarea rows={8} value={text} onChange={(e) => setText(e.target.value)} placeholder={'"Hook"\n"Aussage"\n"Frage"'} /></label></div>
    </Sheet>
  </div>;
}

/* Arbeitsbereich eines Maklers für das Team (entspricht einem Projekt in Lucida) */
function Arbeitsbereich({ m, sub, setSub, oeffne, zurueck, bereich, setBereich }) {
  const content = (useHm("content") || []).filter((c) => c.maklerId === m.id);
  const b = hmBrand(m.id);
  const tabs = [["ueberblick", "Überblick"], ["inhalte", "Inhalte"], ["freigaben", "Freigaben", content.filter((c) => c.zustand === "freigabe").length], ["wirkung", "Wirkung"], ["marke", "Marke"], ["einrichtung", "Einrichtung"], ["meetings", "Meetings"], ["kontakte", "Kontakte"], ["ressourcen", "Ressourcen"]];
  const t = bereich || "ueberblick";
  return <div>
    <button className="hm-zurueck" onClick={zurueck}>← Makler</button>
    <div className="hm-row" style={{ gap: 14, margin: "12px 0 18px" }}><Avatar name={m.name} gross bild={b.portrait} /><div><div className="hm-h hm-h2">{m.name}</div><div className="hm-mono">{m.region} · {m.abo} · {m.tag > 30 ? `Monat ${Math.floor(m.tag / 30)}` : `Tag ${m.tag}`}</div></div></div>
    <Tabs tabs={tabs} akt={t} set={(x) => { setBereich(x); setSub(null); }} />
    <div style={{ marginTop: 22 }}>
      {t === "ueberblick" && <Ueberblick m={m} setBereich={setBereich} oeffne={oeffne} />}
      {t === "inhalte" && <Inhalte2 m={m} teamSicht sub={sub} setSub={setSub} oeffne={oeffne} />}
      {t === "freigaben" && <FreigabenQ m={m} teamSicht oeffne={oeffne} />}
      {t === "wirkung" && <Wirkung m={m} teamSicht oeffne={oeffne} />}
      {t === "marke" && <Marke m={m} sub={sub} setSub={setSub} go={() => {}} teamSicht />}
      {t === "einrichtung" && <Einrichtung m={m} go={() => {}} teamSicht />}
      {t === "meetings" && <Meetings m={m} />}
      {t === "kontakte" && <Kontakte m={m} />}
      {t === "ressourcen" && <Ressourcen m={m} />}
    </div>
  </div>;
}

function Ueberblick({ m, setBereich, oeffne }) {
  const content = (useHm("content") || []).filter((c) => c.maklerId === m.id);
  const zaehl = (zs) => content.filter((c) => zs.includes(c.zustand)).length;
  const next = content.filter((c) => c.termin && c.termin >= "2026-09-28").sort((a, b) => a.termin.localeCompare(b.termin)).slice(0, 5);
  const reach = content.filter((c) => c.kz).reduce((n, c) => n + c.kz.reach, 0);
  return <div>
    <div className="hm-kz gross">{[["In der Pipeline", zaehl(["idee", "planung", "dreh", "schnitt", "aenderung"]), "inhalte"], ["Wartet auf Freigabe", zaehl(["freigabe"]), "freigaben"], ["Geplant", zaehl(["freigegeben"]), "inhalte"], ["Reichweite gesamt", reach.toLocaleString("de-AT"), "wirkung"]].map(([t, v, z]) => <button key={t} onClick={() => setBereich(z)}><b>{v}</b><span>{t}</span></button>)}</div>
    <div className="hm-card" style={{ marginTop: 16 }}><div className="hm-mono">Als Nächstes online</div><div className="hm-list" style={{ marginTop: 6 }}>{next.map((c) => <Zeile key={c.id} links={c.thumb ? <img src={c.thumb} alt="" className="hm-mini" /> : <span className="hm-mini leer"></span>} titel={c.titel} unter={`${hmDatum(c.termin)} ${hmZeit(c.termin)} · ${HM_TYPEN[c.typ]}`} rechts={<ZPunkt z={c.zustand} />} onClick={() => oeffne(c.id)} />)}</div></div>
  </div>;
}

Object.assign(window, { MaklerHeute, TeamHeute, Akquise, MaklerListe, Meetings, Kontakte, Ressourcen, Arbeitsbereich, Ueberblick });
