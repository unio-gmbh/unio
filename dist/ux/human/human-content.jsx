/* UNIO HUMAN. Inhalte: Board, Beitrag in vier Schritten, Kalender, Freigaben, Wirkung, Assistent.
   Funktionsumfang wie Lucida OS, Aufbau neu: eine Liste, ein Beitrag, ein nächster Schritt. */

const hmContent = (fn) => hmStore.patch("content", (l) => fn(l || []));
const setBeitrag = (id, patch, text, wer) => { let c0; hmContent((l) => l.map((c) => { if (c.id === id) { c0 = c; return { ...c, ...patch }; } return c; })); if (text && c0) hmEvent(c0.maklerId, "content", `${c0.titel}: ${text}`, wer || "Team"); };
const HM_MAKLER_GRUPPEN = [["idee", "Ideen", ["idee"]], ["arbeit", "In Arbeit", ["planung", "dreh", "schnitt", "aenderung"]], ["freigabe", "Wartet auf dich", ["freigabe"]], ["geplant", "Geplant", ["freigegeben"]], ["online", "Online", ["online"]]];

function Inhalte2({ m, teamSicht, sub, setSub, oeffne }) {
  const alle = useHm("content") || [];
  const liste = alle.filter((c) => !m || c.maklerId === m.id);
  const s = sub || "board";
  return <div>
    <Kopf ueber={m ? (teamSicht ? `Inhalte · ${m.name}` : "Inhalte") : "Produktion · alle Makler"} titel={s === "kalender" ? "Was wann erscheint." : s === "material" ? "Material." : teamSicht || !m ? "Vom Einfall bis online." : "Dein Content."}
      text={s === "board" ? (teamSicht || !m ? "Ziehen, um den Stand zu ändern. Jede Karte öffnet den Beitrag mit allen vier Schritten." : "Oben links deine Ideen. Was dich braucht, steht unter Wartet auf dich.") : null}
      rechts={<div className="hm-row"><Tabs klein tabs={[["board", "Board"], ["kalender", "Kalender"], ["material", "Material"]]} akt={s} set={setSub} /><Btn onClick={() => { const id = "n" + Date.now(); hmContent((l) => [{ id, maklerId: m ? m.id : "elif", titel: "Neue Idee", typ: "reel", saeule: "markt", zustand: "idee", kanaele: ["instagram", "facebook"], skript: "", caption: "", manager: "Daniel Hayden", cutter: "Ahmet", clips: [], kommentare: [], notizen: [], korrekturen: 0, erstellt: "2026-09-28" }, ...l]); oeffne(id); }} knob="+">Idee</Btn></div>} />
    {s === "board" && <Board liste={liste} teamSicht={teamSicht || !m} oeffne={oeffne} alleMakler={!m} />}
    {s === "kalender" && <InhalteKalender liste={liste} m={m} oeffne={oeffne} />}
    {s === "material" && <Mediathek m={m} teamSicht={teamSicht} />}
  </div>;
}

function Karte({ c, oeffne, drag, maklerName, stimme }) {
  return <div className="hm-kk" draggable={drag} onDragStart={(e) => e.dataTransfer.setData("text/plain", c.id)} onClick={() => oeffne(c.id)}>
    {c.thumb && <img src={c.thumb} alt="" />}
    <div className="hm-row" style={{ justifyContent: "space-between" }}><span className="hm-typ">{HM_TYPEN[c.typ]}</span>{c.termin && <span className="hm-mono">{hmDatum(c.termin)}</span>}</div>
    <div className="t">{c.titel}</div>
    {maklerName && <div className="hm-mono" style={{ marginTop: 4 }}>{maklerName}</div>}
    {stimme && <div className="hm-row" style={{ gap: 6, marginTop: 8 }} onClick={(e) => e.stopPropagation()}><button className="hm-chip" onClick={() => setBeitrag(c.id, { zustand: "planung" }, "Idee gewählt", "Makler")}>Machen wir</button><button className="hm-chip" onClick={() => setBeitrag(c.id, { zustand: "pausiert" }, "Idee verworfen", "Makler")}>Nein</button></div>}
  </div>;
}

function Board({ liste, teamSicht, oeffne, alleMakler }) {
  const makler = useHm("makler") || [];
  const name = (id) => alleMakler ? ((makler.find((x) => x.id === id) || {}).name || "") : null;
  const [ueber, setUeber] = React.useState(null);
  if (!teamSicht) return <div className="hm-board makler">{HM_MAKLER_GRUPPEN.map(([id, t, zs]) => { const l = liste.filter((c) => zs.includes(c.zustand)); return <div key={id} className={"hm-spalte" + (id === "freigabe" && l.length ? " wichtig" : "")}><div className="hd"><span>{t}</span><span className="n">{l.length}</span></div>{l.map((c) => <Karte key={c.id} c={c} oeffne={oeffne} stimme={id === "idee"} />)}{!l.length && <div className="leer">Nichts hier.</div>}</div>; })}</div>;
  return <div className="hm-board">{HM_SPALTEN.map((sp) => { const l = liste.filter((c) => c.zustand === sp.id); return <div key={sp.id} className={"hm-spalte" + (ueber === sp.id ? " ueber" : "")} onDragOver={(e) => { e.preventDefault(); setUeber(sp.id); }} onDragLeave={() => setUeber(null)} onDrop={(e) => { e.preventDefault(); setUeber(null); const id = e.dataTransfer.getData("text/plain"); setBeitrag(id, { zustand: sp.id }, `nach ${sp.name} verschoben`); }}>
    <div className="hd"><span><i style={{ background: sp.farbe }}></i>{sp.name}</span><span className="n">{l.length}</span></div>
    {l.map((c) => <Karte key={c.id} c={c} oeffne={oeffne} drag maklerName={name(c.maklerId)} />)}
  </div>; })}</div>;
}

/* Ein Beitrag in vier Schritten */
function Beitrag({ id, zurueck, teamSicht }) {
  const alle = useHm("content") || [];
  const c = alle.find((x) => x.id === id);
  const clips = useClips(c ? c.maklerId : null);
  const [p, setP] = React.useState(() => c ? ({ idee: 1, planung: 1, dreh: 2, schnitt: 2, aenderung: 2, freigabe: 4, freigegeben: 4, online: 4, pausiert: 1 }[c.zustand] || 1) : 1);
  if (!c) return <Leer titel="Beitrag nicht gefunden." aktion={<Btn onClick={zurueck}>Zurück</Btn>} />;
  const b = hmBrand(c.maklerId);
  const set = (patch, text) => setBeitrag(c.id, patch, text, teamSicht ? "Team" : b.makler.name);
  const fertig = { 1: !!c.skript, 2: !!(c.schnitt && c.schnitt.length) || (c.typ !== "reel" && (c.clips || []).length > 0), 3: !!(c.caption && c.termin && (c.kanaele || []).length), 4: ["freigegeben", "online"].includes(c.zustand) };
  return <div>
    <button className="hm-zurueck" onClick={zurueck}>← Inhalte</button>
    <div className="hm-kopf" style={{ marginTop: 10 }}>
      <div style={{ minWidth: 0, flex: 1 }}><div className="hm-row" style={{ gap: 10 }}><ZPunkt z={c.zustand} /><span className="hm-typ">{HM_TYPEN[c.typ]}</span><span className="hm-mono">{b.makler.name}</span></div>
        <input className="hm-titel-edit" value={c.titel} onChange={(e) => set({ titel: e.target.value })} /></div>
      {teamSicht && <select className="hm-sel" value={c.zustand} onChange={(e) => set({ zustand: e.target.value }, `Stand: ${hmSpalte(e.target.value).name}`)}>{HM_SPALTEN.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>}
    </div>
    <div className="hm-phasen">
      <nav>{HM_PHASEN.map((x) => <button key={x.id} className={(p === x.id ? "on " : "") + (fertig[x.id] ? "ok" : "")} onClick={() => setP(x.id)}><i>{fertig[x.id] ? "✓" : x.id}</i><span><b>{x.name}</b><small>{x.satz}</small></span></button>)}</nav>
      <div className="hm-phase">
        {p === 1 && <Phase1 c={c} set={set} b={b} clips={clips} teamSicht={teamSicht} weiter={() => { if (["idee", "planung"].includes(c.zustand)) set({ zustand: "dreh" }, "Skript fertig, bereit zum Dreh"); setP(2); }} />}
        {p === 2 && <Phase2 c={c} set={set} b={b} clips={clips} teamSicht={teamSicht} weiter={() => setP(3)} />}
        {p === 3 && <Phase3 c={c} set={set} b={b} weiter={() => setP(4)} />}
        {p === 4 && <Phase4 c={c} set={set} b={b} clips={clips} teamSicht={teamSicht} />}
      </div>
    </div>
  </div>;
}

function Phase1({ c, set, b, clips, teamSicht, weiter }) {
  const vorlagen = useHm("vorlagen") || [];
  const [check, setCheck] = React.useState(null);
  const [score, setScore] = React.useState(null);
  const [kom, setKom] = React.useState("");
  const sz = hmSprechzeit(c.skript);
  return <div className="hm-stack">
    <div className="hm-feld3">
      <label className="hm-feld"><span>Format</span><select value={c.typ} onChange={(e) => set({ typ: e.target.value })}>{Object.entries(HM_TYPEN).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
      <label className="hm-feld"><span>Säule</span><select value={c.saeule} onChange={(e) => set({ saeule: e.target.value })}>{Object.entries(HM_SAEULEN).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}</select></label>
      <label className="hm-feld"><span>Verantwortlich</span><select value={c.manager} onChange={(e) => set({ manager: e.target.value })}>{HM_TEAM.map((t) => <option key={t.id}>{t.name}</option>)}</select></label>
      <label className="hm-feld"><span>Schnitt</span><select value={c.cutter} onChange={(e) => set({ cutter: e.target.value })}>{["Ahmet", "Automatisch", ...HM_TEAM.map((t) => t.name)].map((t) => <option key={t}>{t}</option>)}</select></label>
    </div>
    <div>
      <div className="hm-row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
        <div className="hm-mono">Skript · gesprochener Text in Anführungszeichen · {sz.woerter} Wörter, {sz.sekunden} s</div>
        <div className="hm-row" style={{ gap: 6 }}><select className="hm-sel" value="" onChange={(e) => { const v = vorlagen.find((x) => x.id === e.target.value); if (v) set({ skript: v.text }); }}><option value="">Vorlage einsetzen</option>{vorlagen.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}</select><button className="hm-chip ki" onClick={() => setCheck(hmSkriptCheck(c.skript, b))}>Prüfen lassen</button></div>
      </div>
      <textarea className="hm-skript" rows={9} value={c.skript} onChange={(e) => set({ skript: e.target.value })} placeholder={'"Erster Satz ist der Hook, unter 12 Wörtern."\n"Dann die Aussage."\n"Zum Schluss eine Frage an die Zuschauer."'} />
      {check && <div className="hm-check">{check.map((x, i) => <div key={i} className={x.ok ? "ok" : "no"}><i>{x.ok ? "✓" : "!"}</i>{x.t}</div>)}</div>}
      {b.w && !c.skript && <div className="hm-row" style={{ gap: 6, marginTop: 8, flexWrap: "wrap" }}><span className="hm-mono">Hooks aus deiner Strategie</span>{b.w.hooks.slice(0, 3).map((h) => <button key={h} className="hm-chip" onClick={() => set({ skript: `"${h}"\n"..."\n"..."` })}>{h}</button>)}</div>}
    </div>
    <div className="hm-feld3">
      <label className="hm-feld"><span>Drehtag</span><input type="date" value={c.drehtag || ""} onChange={(e) => set({ drehtag: e.target.value })} /></label>
      <label className="hm-feld"><span>Geplant für</span><input type="date" value={(c.termin || "").slice(0, 10)} onChange={(e) => set({ termin: e.target.value + "T18:00" })} /></label>
      <label className="hm-feld"><span>Vor der Kamera</span><input value={c.akteure || ""} placeholder={b.makler.name} onChange={(e) => set({ akteure: e.target.value })} /></label>
    </div>
    <div className="hm-card hm-score">
      <div><div className="hm-h hm-h3">Wirkungs-Prognose</div><div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>Aus Hook, Länge, Gesicht, Säule und dem, was bei dir bisher funktioniert. Regelbasiert, ohne KI-Aufruf.</div></div>
      {score ? <div className="hm-row" style={{ gap: 14 }}><div className="wert">{score.score}</div><div className="hm-stack" style={{ gap: 2 }}>{score.faktoren.map((f) => <div key={f.t} style={{ fontSize: 12 }}>{f.t} <b>{f.p}</b></div>)}</div></div> : <Btn onClick={() => setScore(hmViralScore(c, clips))}>Berechnen</Btn>}
    </div>
    <div>
      <div className="hm-mono" style={{ marginBottom: 8 }}>Kommentare · {(c.kommentare || []).length}</div>
      {(c.kommentare || []).map((k, i) => <div key={i} className="hm-msg"><Avatar name={k.von} /><div><div className="w">{k.von} · {hmRel(k.t)}</div>{k.text}</div></div>)}
      <div className="hm-inp"><input value={kom} onChange={(e) => setKom(e.target.value)} placeholder="Frage, Idee, Hinweis. @ für Personen" onKeyDown={(e) => { if (e.key === "Enter" && kom.trim()) { set({ kommentare: [...(c.kommentare || []), { von: teamSicht ? "Daniel Hayden" : b.makler.name, t: Date.now(), text: kom }] }); setKom(""); } }} /><Btn disabled={!kom.trim()} onClick={() => { set({ kommentare: [...(c.kommentare || []), { von: teamSicht ? "Daniel Hayden" : b.makler.name, t: Date.now(), text: kom }] }); setKom(""); }}>Senden</Btn></div>
    </div>
    <div className="hm-phase-fuss"><span className="hm-mono">Wird automatisch gespeichert</span><Btn disabled={!c.skript} onClick={weiter}>Weiter zu Dreh und Schnitt</Btn></div>
  </div>;
}

function Phase2({ c, set, b, clips, teamSicht, weiter }) {
  const passend = clips.filter((k) => c.typ === "reel" ? true : k.typ === "foto" || k.tags.includes("Objekt"));
  const gewaehlt = c.clips || [];
  const toggle = (id) => set({ clips: gewaehlt.includes(id) ? gewaehlt.filter((x) => x !== id) : [...gewaehlt, id] });
  const vorschlag = () => { const a = clips.filter((k) => k.tags.includes("Gesicht")).slice(0, 3).map((k) => k.id); const bb = clips.filter((k) => k.tags.includes("Objekt") || k.tags.includes("Stadt")).slice(0, 2).map((k) => k.id); set({ clips: [...new Set([...a, ...bb])] }); };
  const schneiden = () => { const quelle = clips.filter((k) => gewaehlt.includes(k.id)); set({ schnitt: hmAutoSchnitt(c, quelle.length ? quelle : clips), zustand: ["idee", "planung", "dreh"].includes(c.zustand) ? "schnitt" : c.zustand }, "automatisch geschnitten"); };
  if (c.typ !== "reel") return <div className="hm-stack">
    <div className="hm-mono">Bilder für {HM_TYPEN[c.typ]} · Reihenfolge wie gewählt</div>
    <div className="hm-medien klein">{passend.filter((k) => k.typ === "foto").map((k) => <button key={k.id} className={"hm-medium" + (gewaehlt.includes(k.id) ? " on" : "")} onClick={() => toggle(k.id)}><div className="bild"><img src={k.src} alt="" />{gewaehlt.includes(k.id) && <span className="nr">{gewaehlt.indexOf(k.id) + 1}</span>}</div><div className="t">{k.titel}</div></button>)}</div>
    <div className="hm-phase-fuss"><span className="hm-mono">{gewaehlt.length} gewählt</span><Btn disabled={!gewaehlt.length} onClick={weiter}>Weiter zu Text und Termin</Btn></div>
  </div>;
  return <div className="hm-stack">
    <div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-mono">1 · Material aus der Mediathek · {gewaehlt.length} gewählt</div><button className="hm-chip ki" onClick={vorschlag}>Passendes vorschlagen</button></div>
    <div className="hm-medien klein">{passend.map((k) => <button key={k.id} className={"hm-medium" + (gewaehlt.includes(k.id) ? " on" : "")} onClick={() => toggle(k.id)}><div className="bild">{k.typ === "video" ? <VideoBild src={hmVideoSrc(k.src)} t={k.von + 0.5} poster={k.poster} /> : <img src={k.src} alt="" />}{gewaehlt.includes(k.id) && <span className="nr">✓</span>}</div><div className="t">{k.titel}</div><div className="tags">{k.tags.slice(0, 2).map((t) => <span key={t}>{t}</span>)}</div></button>)}</div>
    <div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-mono">2 · Schnitt aus dem Skript</div><Btn onClick={schneiden} knob="✂">{c.schnitt ? "Neu schneiden" : "Automatisch schneiden"}</Btn></div>
    {c.schnitt ? <SchnittPlayer segs={c.schnitt} clips={clips} b={b} onChange={(segs) => set({ schnitt: segs })} /> : <div className="hm-note">Jeder gesprochene Satz aus dem Skript bekommt einen Talking-Head-Clip, der erste ist der Hook. Nach jedem zweiten Satz ein Bildwechsel aus Objekt- oder Stadtmaterial, am Ende deine Endkarte. Untertitel kommen aus dem Skript.</div>}
    <label className="hm-feld"><span>Hinweise für den Feinschnitt</span><textarea rows={3} value={c.briefing || ""} onChange={(e) => set({ briefing: e.target.value })} placeholder="Tempo, Musik, Texteinblendungen, was unbedingt rein muss" /></label>
    <div className="hm-phase-fuss"><span className="hm-mono">{c.cutter === "Automatisch" ? "Schnitt ohne Feinschnitt" : `Feinschnitt: ${c.cutter}`}</span><Btn disabled={!c.schnitt} onClick={() => { set({ schnittFertig: true }, "Schnitt fertig"); weiter(); }}>Schnitt fertig</Btn></div>
  </div>;
}

function Phase3({ c, set, b, weiter }) {
  const K = [["instagram", "Instagram"], ["facebook", "Facebook"], ["linkedin", "LinkedIn"], ["tiktok", "TikTok"]];
  const tag = (n) => { const d = new Date(2026, 8, 28 + n); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  return <div className="hm-stack">
    <div><div className="hm-row" style={{ justifyContent: "space-between", marginBottom: 8 }}><div className="hm-mono">Caption · {(c.caption || "").length} Zeichen</div><button className="hm-chip ki" onClick={() => set({ caption: hmCaption(c, b.br, b.w) })}>Vorschlag aus Skript und Marke</button></div>
      <textarea className="hm-skript" rows={6} value={c.caption || ""} onChange={(e) => set({ caption: e.target.value })} placeholder="Erste Zeile ist die wichtigste. Danach eine Frage, dann Hashtags." /></div>
    <div className="hm-feld3">
      <label className="hm-feld"><span>Datum</span><input type="date" value={(c.termin || "").slice(0, 10)} onChange={(e) => set({ termin: e.target.value + "T" + (hmZeit(c.termin) || "18:00") })} /></label>
      <label className="hm-feld"><span>Uhrzeit</span><select value={hmZeit(c.termin) || "18:00"} onChange={(e) => set({ termin: ((c.termin || tag(1)).slice(0, 10)) + "T" + e.target.value })}>{["07:30", "12:00", "17:00", "18:00", "19:30", "21:00"].map((z) => <option key={z}>{z}</option>)}</select></label>
      <div className="hm-feld"><span>Schnell</span><div className="hm-row" style={{ gap: 6 }}>{[["Morgen", 1], ["In 3 Tagen", 3], ["Nächste Woche", 7]].map(([t, n]) => <button key={t} className="hm-chip" onClick={() => set({ termin: tag(n) + "T18:00" })}>{t}</button>)}</div></div>
    </div>
    <div><div className="hm-mono" style={{ marginBottom: 8 }}>Kanäle</div><div className="hm-chips">{K.map(([id, t]) => <button key={id} className={"hm-chip" + ((c.kanaele || []).includes(id) ? " on" : "")} onClick={() => set({ kanaele: (c.kanaele || []).includes(id) ? c.kanaele.filter((x) => x !== id) : [...(c.kanaele || []), id] })}>{t}</button>)}</div><div className="hm-note" style={{ marginTop: 10 }}>Zeitzone Wien. Gepostet wird automatisch, sobald freigegeben. Posting-Anbindung im Prototyp simuliert.</div></div>
    <div className="hm-phase-fuss"><span className="hm-mono">Wird automatisch gespeichert</span><Btn disabled={!(c.caption && c.termin && (c.kanaele || []).length)} onClick={weiter}>Weiter zur Freigabe</Btn></div>
  </div>;
}

function Phase4({ c, set, b, clips, teamSicht }) {
  const [kanal, setKanal] = React.useState((c.kanaele || ["instagram"])[0] === "facebook" ? "facebook" : "instagram");
  const [notiz, setNotiz] = React.useState("");
  const [mail, setMail] = React.useState(false);
  const checks = [["Schnitt oder Bilder", !!(c.schnitt && c.schnitt.length) || (c.typ !== "reel" && (c.clips || []).length > 0) || !!c.thumb], ["Caption", !!c.caption], ["Datum und Uhrzeit", !!c.termin], ["Mindestens ein Kanal", (c.kanaele || []).length > 0]];
  const bereit = checks.every((x) => x[1]);
  const kontakte = ((hmStore.get("kontakte") || {})[c.maklerId] || []).filter((k) => k.freigabe);
  const frist = c.termin ? (() => { const d = new Date(c.termin); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10); })() : "";
  const bilder = (c.clips || []).map((id) => clips.find((k) => k.id === id)).filter((k) => k && k.typ === "foto");
  return <div className="hm-freigabe">
    <div className="hm-stack">
      <div className="hm-check">{checks.map(([t, ok]) => <div key={t} className={ok ? "ok" : "no"}><i>{ok ? "✓" : ""}</i>{t}</div>)}</div>
      {c.zustand === "freigabe" && !teamSicht && <div className="hm-card hm-dark"><div className="hm-mono">Wartet auf dich</div><div style={{ fontSize: 20, margin: "6px 0 14px", letterSpacing: "-.01em" }}>Passt das so?</div><div className="hm-row"><Btn paper onClick={() => set({ zustand: "freigegeben" }, "freigegeben")}>Freigeben</Btn><button className="hm-chip" style={{ color: "var(--paper)", boxShadow: "inset 0 0 0 1px rgba(247,245,241,.3)" }} disabled={c.korrekturen >= 2 && !notiz} onClick={() => { set({ zustand: "aenderung", korrekturen: (c.korrekturen || 0) + 1, notizen: notiz ? [...(c.notizen || []), { von: b.makler.name, t: Date.now(), text: notiz }] : c.notizen }, "Änderung gewünscht"); setNotiz(""); }}>Änderung wünschen</button></div><div style={{ fontSize: 12, color: "var(--text-inverse-muted)", marginTop: 10 }}>Korrekturrunde {c.korrekturen || 0} von 2. Ohne Rückmeldung automatisch freigegeben am {hmDatum(frist)}.</div></div>}
      {teamSicht && c.zustand !== "freigabe" && !["freigegeben", "online"].includes(c.zustand) && <div className="hm-card"><div className="hm-h hm-h3">An den Makler senden</div><div style={{ fontSize: 13, color: "var(--text-muted)", margin: "4px 0 12px" }}>Geht an {kontakte.map((k) => k.name).join(", ") || "die Freigabe-Verantwortlichen"}. Freigabe per Mail oder im Dashboard.</div><div className="hm-row"><Btn disabled={!bereit} onClick={() => set({ zustand: "freigabe" }, "zur Freigabe gesendet")}>Zur Freigabe senden</Btn><button className="hm-chip" onClick={() => setMail(!mail)}>Mail-Vorschau</button></div>{mail && <div className="hm-mailvorschau"><b>Betreff:</b> Zur Freigabe: {c.titel}<br /><br />Hallo {b.vor},<br />dein Beitrag ist fertig und geht am {hmDatum(c.termin)} um {hmZeit(c.termin)} online.<br />Ein Klick: Freigeben oder Änderung wünschen.<br /><br />Dein UNIO Team</div>}</div>}
      {c.zustand === "freigegeben" && <div className="hm-card"><div className="hm-h hm-h3">Freigegeben</div><div style={{ fontSize: 13, color: "var(--text-muted)", margin: "4px 0 12px" }}>Geht am {hmDatum(c.termin)} um {hmZeit(c.termin)} auf {(c.kanaele || []).join(", ")} online.</div>{teamSicht && <button className="hm-chip" onClick={() => set({ zustand: "online", kz: { reach: 3200 + Math.round(Math.random() * 6000), saves: 30, sends: 40, likes: 220, kommentare: 12 } }, "veröffentlicht")}>Demo: jetzt veröffentlichen</button>}</div>}
      {c.zustand === "online" && c.kz && <div className="hm-card"><div className="hm-h hm-h3">Online seit {hmDatum(c.termin)}</div><div className="hm-kz">{[["Reichweite", c.kz.reach], ["Saves", c.kz.saves], ["Sends", c.kz.sends], ["Likes", c.kz.likes]].map(([t, v]) => <div key={t}><b>{v.toLocaleString("de-AT")}</b><span>{t}</span></div>)}</div></div>}
      <div><div className="hm-mono" style={{ marginBottom: 8 }}>Notizen zur Freigabe · {(c.notizen || []).length}</div>{(c.notizen || []).map((k, i) => <div key={i} className="hm-msg"><Avatar name={k.von} /><div><div className="w">{k.von} · {hmRel(k.t)}</div>{k.text}</div></div>)}<div className="hm-inp"><input value={notiz} onChange={(e) => setNotiz(e.target.value)} placeholder="Passt so, oder was soll anders sein?" onKeyDown={(e) => { if (e.key === "Enter" && notiz.trim()) { set({ notizen: [...(c.notizen || []), { von: teamSicht ? "Daniel Hayden" : b.makler.name, t: Date.now(), text: notiz }] }); setNotiz(""); } }} /></div></div>
    </div>
    <div>
      <div className="hm-row" style={{ justifyContent: "center", marginBottom: 10 }}><Tabs klein tabs={[["instagram", "Instagram"], ["facebook", "Facebook"]]} akt={kanal} set={setKanal} /></div>
      <Handy kanal={kanal} b={b} caption={c.caption}>
        {c.schnitt && c.schnitt.length ? <SchnittPlayer segs={c.schnitt} clips={clips} b={b} kompakt /> : bilder.length ? <div className="hm-karussell">{bilder.map((k) => <img key={k.id} src={k.src} alt="" />)}</div> : c.thumb ? <img src={c.thumb} alt="" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }} /> : <div className="hm-leerbild">Noch kein Material</div>}
      </Handy>
    </div>
  </div>;
}

function InhalteKalender({ liste, m, oeffne }) {
  const drehtage = useHm("drehtage") || [];
  const [mon, setMon] = React.useState(9);
  const first = new Date(2026, mon - 1, 1); const tage = new Date(2026, mon, 0).getDate(); const off = (first.getDay() + 6) % 7;
  const iso = (d) => `2026-${String(mon).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const neu = (datum) => { const id = "n" + Date.now(); hmContent((l) => [{ id, maklerId: m ? m.id : "elif", titel: "Neue Idee", typ: "reel", saeule: "markt", zustand: "idee", termin: datum + "T18:00", kanaele: ["instagram", "facebook"], skript: "", caption: "", manager: "Daniel Hayden", cutter: "Ahmet", clips: [], kommentare: [], notizen: [], korrekturen: 0 }, ...l]); oeffne(id); };
  return <div>
    <div className="hm-row" style={{ justifyContent: "space-between", marginTop: 20 }}><div className="hm-h hm-h2">{first.toLocaleDateString("de-AT", { month: "long", year: "numeric" })}</div><div className="hm-seg"><button onClick={() => setMon(Math.max(8, mon - 1))}>←</button><button className="on" onClick={() => setMon(9)}>Heute</button><button onClick={() => setMon(Math.min(12, mon + 1))}>→</button></div></div>
    <div className="hm-mkal">
      {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => <div key={d} className="hm-mono kopf">{d}</div>)}
      {Array.from({ length: off }).map((_, i) => <div key={"o" + i}></div>)}
      {Array.from({ length: tage }).map((_, i) => { const d = iso(i + 1); const cs = liste.filter((c) => (c.termin || "").slice(0, 10) === d); const dt = drehtage.filter((x) => x.datum === d && (!m || x.slots.some((s) => s.maklerId === m.id))); return <div key={d} className={"tag" + (d === "2026-09-28" ? " heute" : "")} onDoubleClick={() => neu(d)}>
        <div className="n">{i + 1}</div>
        {dt.map((x) => <div key={x.id} className="ev dreh">Drehtag {x.region}</div>)}
        {cs.map((c) => <div key={c.id} className="ev" style={{ borderColor: hmSpalte(c.zustand).farbe }} onClick={() => oeffne(c.id)}>{hmZeit(c.termin)} {c.titel}</div>)}
      </div>; })}
    </div>
    <div className="hm-note" style={{ marginTop: 10 }}>Doppelklick auf einen Tag legt eine Idee für dieses Datum an.</div>
  </div>;
}

function FreigabenQ({ m, teamSicht, oeffne }) {
  const alle = useHm("content") || [];
  const makler = useHm("makler") || [];
  const liste = alle.filter((c) => !m || c.maklerId === m.id);
  const [ansicht, setAnsicht] = React.useState("liste");
  const offen = liste.filter((c) => c.zustand === "freigabe");
  const spalten = [["freigabe", "Wartet auf Freigabe"], ["freigegeben", "Freigegeben"], ["online", "Online"]];
  return <div>
    <Kopf ueber={teamSicht ? "Freigaben" : "Freigaben"} titel={offen.length ? `${offen.length} ${offen.length === 1 ? "Beitrag wartet" : "Beiträge warten"}${teamSicht ? " auf Makler" : " auf dich"}.` : "Alles freigegeben."} text={teamSicht ? "Was offen ist, wird am Vortag automatisch freigegeben." : "Ansehen, freigeben oder eine Änderung wünschen. Zwei Runden sind frei."} rechts={<Tabs klein tabs={[["liste", "Liste"], ["kanban", "Spalten"]]} akt={ansicht} set={setAnsicht} />} />
    {ansicht === "liste" ? <div className="hm-stack" style={{ marginTop: 22 }}>{offen.map((c) => { const b = hmBrand(c.maklerId); return <div key={c.id} className="hm-fz" onClick={() => oeffne(c.id)}>{c.thumb ? <img src={c.thumb} alt="" /> : <div className="hm-leerbild klein">{HM_TYPEN[c.typ]}</div>}<div style={{ minWidth: 0, flex: 1 }}><div className="hm-row" style={{ gap: 8 }}><span className="hm-typ">{HM_TYPEN[c.typ]}</span>{!m && <span className="hm-mono">{b.makler.name}</span>}</div><div className="t">{c.titel}</div><div className="s">{(c.caption || "").split("\n")[0]}</div><div className="hm-mono" style={{ marginTop: 6 }}>{hmDatum(c.termin)} {hmZeit(c.termin)} · Runde {c.korrekturen || 0} von 2</div></div>{!teamSicht && <div className="hm-row" style={{ gap: 6 }} onClick={(e) => e.stopPropagation()}><Btn onClick={() => setBeitrag(c.id, { zustand: "freigegeben" }, "freigegeben", b.makler.name)}>Freigeben</Btn></div>}</div>; })}{!offen.length && <Leer titel="Nichts offen." text="Neue Beiträge landen hier, sobald sie fertig geschnitten sind." />}</div>
      : <div className="hm-board" style={{ gridTemplateColumns: "repeat(3, minmax(220px, 1fr))" }}>{spalten.map(([z, t]) => { const l = liste.filter((c) => c.zustand === z); return <div key={z} className="hm-spalte"><div className="hd"><span><i style={{ background: hmSpalte(z).farbe }}></i>{t}</span><span className="n">{l.length}</span></div>{l.map((c) => <Karte key={c.id} c={c} oeffne={oeffne} maklerName={!m ? (makler.find((x) => x.id === c.maklerId) || {}).name : null} />)}</div>; })}</div>}
  </div>;
}

function Wirkung({ m, teamSicht, oeffne }) {
  const alle = useHm("content") || [];
  const st = (useHm("strategien") || {})[m.id];
  const [tab, setTab] = React.useState("ueberblick");
  const online = alle.filter((c) => c.maklerId === m.id && c.zustand === "online" && c.kz).sort((a, b) => b.kz.reach - a.kz.reach);
  return <div>
    <div className="hm-row" style={{ justifyContent: "flex-end" }}><Tabs klein tabs={[["ueberblick", "Überblick"], ["beitraege", "Beiträge"]]} akt={tab} set={setTab} /></div>
    {tab === "ueberblick" ? <Report m={m} st={st} /> : <div>
      <Kopf ueber="Wirkung · Beiträge" titel="Was funktioniert." text="Sortiert nach Reichweite. Sends zeigen, was geteilt wird, Saves, was bleibt." />
      <div className="hm-tabelle"><div className="kopf"><span>Beitrag</span><span>Reichweite</span><span>Saves</span><span>Sends</span><span>Likes</span></div>{online.map((c) => <div key={c.id} className="zeile" onClick={() => oeffne(c.id)}><span className="t">{c.thumb && <img src={c.thumb} alt="" />}{c.titel}<small>{HM_TYPEN[c.typ]} · {hmDatum(c.termin)}</small></span><span>{c.kz.reach.toLocaleString("de-AT")}</span><span>{c.kz.saves}</span><span>{c.kz.sends}</span><span>{c.kz.likes}</span></div>)}{!online.length && <div style={{ padding: 20, color: "var(--text-muted)" }}>Noch nichts online.</div>}</div>
      <div className="hm-note" style={{ marginTop: 12 }}>Im Betrieb kommen die Zahlen täglich aus Meta und LinkedIn. Im Prototyp Demo-Werte.</div>
    </div>}
  </div>;
}

/* Assistent: kontextbezogene Kurzhilfen, regelbasiert */
function Assistent({ m }) {
  const [offen, setOffen] = React.useState(false);
  const [antwort, setAntwort] = React.useState(null);
  const b = m ? hmBrand(m.id) : null;
  const content = (hmStore.get("content") || []).filter((c) => !m || c.maklerId === m.id);
  const fragen = [
    ["Was steht diese Woche an?", () => { const l = content.filter((c) => c.termin && c.termin >= "2026-09-28" && c.termin <= "2026-10-05"); return l.length ? l.map((c) => `${hmDatum(c.termin)}: ${c.titel} (${hmSpalte(c.zustand).name})`).join("\n") : "Diese Woche ist nichts geplant."; }],
    ["Drei Hooks für nächste Woche", () => b && b.w ? b.w.hooks.slice(0, 3).map((h, i) => `${i + 1}. ${h}`).join("\n") : "Erst braucht es eine Strategie."],
    ["Was wartet auf Freigabe?", () => { const l = content.filter((c) => c.zustand === "freigabe"); return l.length ? l.map((c) => `${c.titel}, geplant ${hmDatum(c.termin)}`).join("\n") : "Nichts. Alles freigegeben."; }],
    ["Welche Säule fehlt gerade?", () => { if (!b || !b.w) return "Erst braucht es eine Strategie."; const z = {}; content.filter((c) => c.zustand !== "pausiert").forEach((c) => (z[c.saeule] = (z[c.saeule] || 0) + 1)); const fehl = Object.keys(b.w.saeulen).sort((x, y) => (z[x] || 0) - (z[y] || 0))[0]; return `${HM_SAEULEN[fehl].name}: ${z[fehl] || 0} Beiträge in Arbeit, Ziel ${b.w.saeulen[fehl]} Prozent. Vorschlag: ${b.w.hooks.find((h) => h) || ""}`; }],
  ];
  return <>
    <button className="hm-fab" onClick={() => setOffen(true)} aria-label="Assistent">✦</button>
    <Sheet offen={offen} zu={() => { setOffen(false); setAntwort(null); }} titel="Assistent" unter="Kurze Antworten aus deinen Daten. Im Prototyp regelbasiert, ohne KI-Aufruf.">
      <div className="hm-stack">{fragen.map(([f, fn]) => <button key={f} className="hm-zeile klick" onClick={() => setAntwort({ f, a: fn() })}><div className="m"><div className="t">{f}</div></div><div className="r">→</div></button>)}
        {antwort && <div className="hm-card"><div className="hm-mono">{antwort.f}</div><div style={{ whiteSpace: "pre-line", marginTop: 8, color: "var(--ink)" }}>{antwort.a}</div></div>}</div>
    </Sheet>
  </>;
}

Object.assign(window, { Inhalte2, Board, Karte, Beitrag, InhalteKalender, FreigabenQ, Wirkung, Assistent, setBeitrag });
