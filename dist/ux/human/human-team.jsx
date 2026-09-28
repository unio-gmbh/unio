/* UNIO HUMAN. Heute (Makler und Team), Akquise, Makler-Arbeitsbereich, Meetings, Kontakte, Ressourcen. */

function MaklerHeute({ m, go, oeffne }) {
  const content = (useHm("content") || []).filter((c) => c.maklerId === m.id);
  const { st } = useEinrichtung(m.id);
  const drehtage = (useHm("drehtage") || []).filter((d) => d.slots.some((s) => s.maklerId === m.id) && d.status !== "fertig" && d.datum >= "2026-09-28" && d.datum <= "2026-10-05");
  const fb = (useHm("fragebogen") || {})[m.id];
  const strat = (useHm("strategien") || {})[m.id];
  useHm("branding");
  const b = hmBrand(m.id);
  const [ein, setEin] = React.useState(null);
  const P = (useHm("portraits") || {})[m.id];
  const portraitWahl = P && P.auswahlOffen && !P.gewaehlt ? [...P.liste].filter((e) => e.id === P.aktiv || (e.score || 0) >= 70).sort((x, y) => (y.score || 0) - (x.score || 0)).slice(0, 3) : null;
  const freigaben = content.filter((c) => c.zustand === "freigabe");
  const ideen = content.filter((c) => c.zustand === "idee");
  const offenE = HM_EINRICHTUNG.filter((e) => st[e.id] !== "fertig");
  const woche = content.filter((c) => c.zustand !== "freigabe" && c.termin && c.termin.slice(0, 10) >= "2026-09-28" && c.termin.slice(0, 10) <= "2026-10-05");
  const agenda = [...drehtage.map((d) => ({ k: d.datum, t: "Drehtag", u: `${hmDatum(d.datum)} · ${d.location}`, z: null })), ...woche.map((c) => ({ k: c.termin, t: c.titel, u: `${hmDatum(c.termin)} ${hmZeit(c.termin)}`, z: c.zustand, id: c.id }))].sort((a, b2) => a.k.localeCompare(b2.k));
  /* Eine Sache, die nur hier steht: Meilensteine der Marke. Freigaben und Einrichtung haben eigene Abschnitte. */
  let next = null;
  if (st.vertrag !== "fertig") next = ["Vertrag unterschreiben", "Drei Minuten, danach geht es los.", () => setEin("vertrag")];
  else if (!fb || !fb.fertig) next = ["Fragebogen beantworten", "Rund 18 Minuten. Daraus entstehen zwei Wege für deine Marke.", () => go("marke", { sub: "fragebogen" })];
  else if (strat && !strat.gewaehlt) next = ["Deinen Weg wählen", "Zwei Strategien liegen bereit.", () => go("marke", { sub: "konzept" })];
  else if (strat && strat.gewaehlt && !b.fertig) next = ["Branding freigeben", "Logo, Schrift und Farbe sind vorbereitet.", () => go("marke", { sub: "design" })];
  else if (!freigaben.length && ideen.length) next = [`${ideen.length} Ideen für Oktober`, "Wähle, was wir drehen.", () => go("inhalte")];
  const datum = new Date(2026, 8, 28).toLocaleDateString("de-AT", { weekday: "long", day: "numeric", month: "long" });
  return <div>
    <Kopf ueber={datum} titel={`Guten Morgen, ${m.name.split(" ")[0]}.`} />
    {next && <button className="hm-weiter gross" onClick={next[2]}><div><div className="hm-mono" style={{ color: "var(--text-inverse-muted)" }}>Als Nächstes</div><div style={{ fontSize: 26, letterSpacing: "-.02em", marginTop: 6 }}>{next[0]}</div><div style={{ color: "var(--text-inverse-muted)", marginTop: 4, fontSize: 15 }}>{next[1]}</div></div><span className="k">→</span></button>}
    {portraitWahl && <><div className="hm-sek">Dein Porträt vom Foto-Termin<button onClick={() => hmPortraitWaehlen(m.id, P.aktiv, "makler")}>Vorschlag passt</button></div>
      <div className="hm-portraits wahl">{portraitWahl.map((e) => <figure key={e.id} className={e.id === P.aktiv ? "on" : ""}><button className="hm-portrait-bild" onClick={() => { hmPortraitWaehlen(m.id, e.id, "makler"); toast("Porträt gewählt. Website und Visitenkarte übernehmen es."); }}><img src={e.url || HM_BLOB_URL["p:" + e.id]} alt="" />{e.id === P.aktiv && <span className="hm-portrait-haken"><Ico n="haken" /></span>}</button><figcaption><span>{e.id === P.aktiv ? "Unser Vorschlag" : hmScoreText(e.score)}</span></figcaption></figure>)}</div></>}
    {freigaben.length > 0 && <><div className="hm-sek">{freigaben.length === 1 ? "Ein Beitrag wartet auf dich" : `${freigaben.length} Beiträge warten auf dich`}</div>
      <div className="hm-review">{freigaben.map((c) => <div key={c.id}>{c.thumb ? <img src={c.thumb} alt="" onClick={() => oeffne(c.id)} /> : <div className="platz" onClick={() => oeffne(c.id)}></div>}<div className="txt"><div className="t">{c.titel}</div><div className="u">{HM_TYPEN[c.typ]} · geplant {hmDatum(c.termin)}</div><div className="a"><button className="hm-klein-btn" onClick={() => setBeitrag(c.id, { zustand: "freigegeben" }, "freigegeben", m.name)}>Freigeben</button><button className="hm-klein-btn hell" onClick={() => oeffne(c.id)}>Ansehen</button></div></div></div>)}</div></>}
    {offenE.length > 0 && <><div className="hm-sek">Einrichtung · {HM_EINRICHTUNG.length - offenE.length} von {HM_EINRICHTUNG.length}<button onClick={() => go("einrichtung")}>Alle ansehen</button></div>
      <div className="hm-gruppe">{offenE.slice(0, 4).map((e) => { const z = st[e.id] || "offen"; const gesperrt = e.braucht && !b.fertig; return <div key={e.id} className="hm-reihe klick" onClick={() => setEin(e.id)}><div className="m"><div className="t">{e.titel}</div><div className="u">{gesperrt ? "Kommt nach deinem Branding" : e.satz}</div></div><div className="r">{z !== "offen" && <span className="hm-status"><i style={{ background: z === "wartet_team" ? "var(--ink)" : "var(--signal)" }}></i>{HM_EZ[z]}</span>}<span className="hm-chev">›</span></div></div>; })}</div></>}
    {agenda.length > 0 && <><div className="hm-sek">Diese Woche</div>
      <div className="hm-gruppe">{agenda.map((a, i) => <div key={i} className={"hm-reihe" + (a.id ? " klick" : "")} onClick={() => a.id && oeffne(a.id)}><div className="m"><div className="t">{a.t}</div><div className="u">{a.u}</div></div><div className="r">{a.z ? <span className="hm-status"><i style={{ background: hmSpalte(a.z).farbe }}></i>{hmSpalte(a.z).name}</span> : <span className="hm-status"><i style={{ background: "var(--signal)" }}></i>Termin</span>}{a.id && <span className="hm-chev">›</span>}</div></div>)}</div></>}
    {!next && !freigaben.length && !offenE.length && !agenda.length && <Leer titel="Alles erledigt." text="Wir arbeiten an deinen nächsten Beiträgen." />}
    <EinrichtungSheet id={ein} m={m} zu={() => setEin(null)} go={go} />
  </div>;
}

function TeamHeute({ go, oeffne, oeffneMakler }) {
  const makler = useHm("makler") || [];
  const content = useHm("content") || [];
  const ein = useHm("einrichtung") || {};
  const branding = useHm("branding") || {};
  const web = useHm("website") || {};
  const name = (id) => (makler.find((x) => x.id === id) || {}).name || id;
  const auf = [];
  makler.forEach((m) => HM_EINRICHTUNG.forEach((e) => { if ((ein[m.id] || {})[e.id] === "wartet_team") auf.push({ k: "Einrichtung", t: e.titel, m: m.id, go: () => oeffneMakler(m.id, "einrichtung") }); }));
  Object.entries(branding).forEach(([mid, b2]) => { if (b2.status === "entwurf" || b2.status === "geaendert") auf.push({ k: "Marke", t: "Branding prüfen", m: mid, go: () => oeffneMakler(mid, "marke", "design") }); });
  Object.entries(web).forEach(([mid, w]) => { if (w.status === "pruefung") auf.push({ k: "Website", t: "Prüfen und live schalten", m: mid, go: () => oeffneMakler(mid, "marke", "website") }); });
  content.filter((c) => ["aenderung", "schnitt", "dreh"].includes(c.zustand)).forEach((c) => auf.push({ k: hmSpalte(c.zustand).name, t: c.titel, m: c.maklerId, go: () => oeffne(c.id) }));
  const warten = content.filter((c) => c.zustand === "freigabe");
  const datum = new Date(2026, 8, 28).toLocaleDateString("de-AT", { weekday: "long", day: "numeric", month: "long" });
  return <div>
    <Kopf ueber={datum} titel="Heute" />
    <div className="hm-sek">Braucht uns · {auf.length}</div>
    <div className="hm-gruppe">{auf.map((a, i) => <div key={i} className="hm-reihe klick" onClick={a.go}><div className="m"><div className="t">{a.t}</div><div className="u">{a.k} · {name(a.m)}</div></div><div className="r"><span className="hm-chev">›</span></div></div>)}{!auf.length && <div className="hm-reihe"><div className="m"><div className="u">Nichts offen.</div></div></div>}</div>
    {warten.length > 0 && <><div className="hm-sek">Wartet auf Makler · {warten.length}</div><div className="hm-gruppe">{warten.map((c) => <div key={c.id} className="hm-reihe klick" onClick={() => oeffne(c.id)}><div className="m"><div className="t">{c.titel}</div><div className="u">{name(c.maklerId)} · geplant {hmDatum(c.termin)}</div></div><div className="r"><button className="hm-klein-btn hell" onClick={(e) => { e.stopPropagation(); hmEvent(c.maklerId, "erinnerung", `Erinnerung: ${c.titel}`, "Team"); toast("Erinnert"); }}>Erinnern</button><span className="hm-chev">›</span></div></div>)}</div></>}
    <div className="hm-sek">Sparpotenzial</div>
    <Empfehlungen makler={makler} kurz />
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
    <div className="hm-row" style={{ justifyContent: "space-between", marginTop: 20 }}><p className="hm-sub" style={{ margin: 0 }}>Skript-Vorlagen für alle oder für einzelne Makler. Im Beitrag mit einem Klick eingesetzt.</p><Btn knob="+" onClick={() => setNeu(true)}>Vorlage</Btn></div>
    {(m ? [["Nur für " + m.name, vorlagen.filter((v) => v.maklerId === m.id)], ["Für alle", vorlagen.filter((v) => v.global)]] : [["Für alle", vorlagen.filter((v) => v.global)], ["Für einzelne Makler", vorlagen.filter((v) => !v.global)]]).map(([t, l]) => <div key={t}><div className="hm-sek">{t} · {l.length}</div><div className="hm-gruppe">{l.map((v) => <div key={v.id} className="hm-reihe"><div className="m"><div className="t">{v.name}</div><div className="u">{v.woerter} Wörter · {v.text.split("\n")[0]}</div></div></div>)}{!l.length && <div className="hm-reihe"><div className="m"><div className="u">Noch keine.</div></div></div>}</div></div>)}
    <Sheet offen={neu} zu={() => setNeu(false)} titel="Neue Vorlage" fuss={<Btn disabled={!name.trim() || !text.trim()} onClick={() => { hmStore.patch("vorlagen", (a) => [...(a || []), { id: "v" + Date.now(), name, text, woerter: hmWoerter(text), global: !m, maklerId: m ? m.id : null }]); setNeu(false); setName(""); setText(""); toast("Vorlage gespeichert"); }}>Speichern</Btn>}>
      <div className="hm-stack"><label className="hm-feld"><span>Name</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Reel · Drei Zahlen" /></label><label className="hm-feld"><span>Text</span><textarea rows={8} value={text} onChange={(e) => setText(e.target.value)} placeholder={'"Hook"\n"Aussage"\n"Frage"'} /></label></div>
    </Sheet>
  </div>;
}

/* Arbeitsbereich eines Maklers für das Team (entspricht einem Projekt in Lucida) */
function Arbeitsbereich({ m, sub, setSub, oeffne, zurueck, bereich, setBereich }) {
  const b = hmBrand(m.id);
  const tabs = [["ueberblick", "Überblick"], ["inhalte", "Inhalte"], ["wirkung", "Wirkung"], ["marke", "Marke"], ["einrichtung", "Einrichtung"], ["gespraeche", "Gespräche"]];
  const t = bereich || "ueberblick";
  return <div>
    <button className="hm-zurueck" onClick={zurueck}>‹ Makler</button>
    <div className="hm-row" style={{ gap: 14, margin: "10px 0 18px" }}><Avatar name={m.name} gross bild={b.portrait} /><div><div className="hm-h hm-h2">{m.name}</div><div className="hm-mono">{m.region} · {m.abo} · {m.tag > 30 ? `Monat ${Math.floor(m.tag / 30)}` : `Tag ${m.tag}`}</div></div></div>
    <Tabs tabs={tabs} akt={t} set={(x) => { setBereich(x); setSub(null); }} />
    <div style={{ marginTop: 8 }}>
      {t === "ueberblick" && <Ueberblick m={m} setBereich={setBereich} oeffne={oeffne} />}
      {t === "inhalte" && <Inhalte2 m={m} teamSicht sub={sub} setSub={setSub} oeffne={oeffne} />}
      {t === "wirkung" && <Wirkung m={m} oeffne={oeffne} />}
      {t === "marke" && <Marke m={m} sub={sub} setSub={setSub} go={() => {}} teamSicht />}
      {t === "einrichtung" && <Einrichtung m={m} go={() => {}} teamSicht />}
      {t === "gespraeche" && <Meetings m={m} />}
    </div>
  </div>;
}

function Ueberblick({ m, setBereich, oeffne }) {
  const content = (useHm("content") || []).filter((c) => c.maklerId === m.id);
  const ein = (useHm("einrichtung") || {})[m.id] || {};
  const k = useHm("kontakte") || {};
  const personen = k[m.id] || [];
  const setK = (i, patch) => hmStore.patch("kontakte", (a) => ({ ...a, [m.id]: (a[m.id] || []).map((x, j) => j === i ? { ...x, ...patch } : x) }));
  const next = content.filter((c) => c.termin && c.termin >= "2026-09-28" && c.zustand !== "pausiert").sort((a, b) => a.termin.localeCompare(b.termin)).slice(0, 5);
  const f = HM_EINRICHTUNG.filter((e) => ein[e.id] === "fertig").length;
  const wt = HM_EINRICHTUNG.filter((e) => ein[e.id] === "wartet_team");
  return <div>
    <div className="hm-sek">Als Nächstes online</div>
    <div className="hm-gruppe">{next.map((c) => <div key={c.id} className="hm-reihe klick" onClick={() => oeffne(c.id)}>{c.thumb ? <img className="bild" src={c.thumb} alt="" /> : <span className="bild"></span>}<div className="m"><div className="t">{c.titel}</div><div className="u">{hmDatum(c.termin)} {hmZeit(c.termin)} · {HM_TYPEN[c.typ]}</div></div><div className="r"><span className="hm-status"><i style={{ background: hmSpalte(c.zustand).farbe }}></i>{hmSpalte(c.zustand).name}</span><span className="hm-chev">›</span></div></div>)}{!next.length && <div className="hm-reihe"><div className="m"><div className="u">Nichts geplant.</div></div></div>}</div>
    <div className="hm-sek">Einrichtung</div>
    <div className="hm-gruppe"><div className="hm-reihe klick" onClick={() => setBereich("einrichtung")}><Ring wert={f / HM_EINRICHTUNG.length} groesse={34} dicke={4} /><div className="m"><div className="t">{f} von {HM_EINRICHTUNG.length} erledigt</div><div className="u">{wt.length ? `Beim Team: ${wt.map((e) => e.titel).join(", ")}` : "Nichts beim Team"}</div></div><div className="r"><span className="hm-chev">›</span></div></div></div>
    <div className="hm-sek">Personen<button onClick={() => hmStore.patch("kontakte", (a) => ({ ...a, [m.id]: [...(a[m.id] || []), { name: "Neue Person", rolle: "Assistenz", mail: "", freigabe: false }] }))}>Hinzufügen</button></div>
    <div className="hm-gruppe">{personen.map((x, i) => <div key={i} className="hm-reihe"><Avatar name={x.name} /><div className="m"><div className="t">{x.name}</div><div className="u">{x.rolle}{x.mail ? " · " + x.mail : ""}</div></div><div className="r"><button className={"hm-schalter" + (x.freigabe ? " an" : "")} onClick={() => setK(i, { freigabe: !x.freigabe })}><i></i>Gibt frei</button></div></div>)}</div>
  </div>;
}

Object.assign(window, { MaklerHeute, TeamHeute, Akquise, MaklerListe, Meetings, Kontakte, Ressourcen, Arbeitsbereich, Ueberblick });
