/* UNIO HUMAN. Inhalte: Board, Beitrag in vier Schritten, Kalender, Freigaben, Wirkung, Assistent.
   Funktionsumfang wie Lucida OS, Aufbau neu: eine Liste, ein Beitrag, ein nächster Schritt. */

const hmContent = (fn) => hmStore.patch("content", (l) => fn(l || []));
const setBeitrag = (id, patch, text, wer) => { let c0; if (patch.zustand === "freigabe") patch = { ...patch, freigabeSeit: new Date().toISOString() }; hmContent((l) => l.map((c) => { if (c.id === id) { c0 = c; return { ...c, ...patch }; } return c; })); if (text && c0) hmEvent(c0.maklerId, "content", `${c0.titel}: ${text}`, wer || "Team"); };
const HM_MAKLER_GRUPPEN = [["idee", "Ideen", ["idee"]], ["arbeit", "In Arbeit", ["planung", "dreh", "schnitt", "aenderung"]], ["freigabe", "Wartet auf dich", ["freigabe"]], ["geplant", "Geplant", ["freigegeben"]], ["online", "Online", ["online"]]];

function Inhalte2({ m, teamSicht, sub, setSub, oeffne }) {
  const alle = useHm("content") || [];
  const makler = useHm("makler") || [];
  const [mf, setMf] = React.useState("alle");
  const liste = alle.filter((c) => (m ? c.maklerId === m.id : mf === "alle" || c.maklerId === mf));
  const s = sub || "liste";
  const [ideen, setIdeen] = React.useState(false);
  const zielM = m || makler.find((x) => x.id === mf);
  const monatName = new Date(2026, 9, 1).toLocaleDateString("de-AT", { month: "long" });
  const csv = () => { const b = hmBrand(zielM.id); const l = liste.filter((c) => ["freigegeben", "geplant", "freigabe"].includes(c.zustand)); hmCsvLaden(`metricool-${b.vor.toLowerCase()}`, hmMetricoolCsv(l, b)); toast(`${l.length} Beiträge als CSV für Metricool`); };
  const neu = () => { const id = "n" + Date.now(); hmContent((l) => [{ id, maklerId: m ? m.id : (mf !== "alle" ? mf : "elif"), titel: "Neue Idee", typ: "reel", saeule: "markt", zustand: "idee", kanaele: ["instagram", "facebook"], skript: "", caption: "", manager: "Daniel Hayden", cutter: "Ahmet", clips: [], kommentare: [], notizen: [], korrekturen: 0, erstellt: "2026-09-28" }, ...l]); oeffne(id); };
  return <div>
    <Kopf titel={m ? "Inhalte" : "Produktion"} rechts={<><Tabs klein tabs={[["liste", "Liste"], ["kalender", "Kalender"], ["material", m ? "Material" : "Mediathek"]]} akt={s} set={setSub} />{zielM && <button className="hm-klein-btn hell" onClick={() => setIdeen(true)}>Ideen für {monatName}</button>}<Btn knob="plus" onClick={neu}>Idee</Btn></>} />
    {!m && s !== "material" && <div className="hm-row" style={{ marginTop: 14, gap: 14 }}><select className="hm-sel" value={mf} onChange={(e) => setMf(e.target.value)} aria-label="Makler"><option value="alle">Alle Makler</option>{makler.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select>{zielM && <button className="hm-link" onClick={csv}>CSV für Metricool</button>}</div>}
    {zielM && <Sheet offen={ideen} zu={() => setIdeen(false)} titel={`Ideen für ${monatName}`} unter={zielM.name} breit><IdeenGenerator m={zielM} zu={() => setIdeen(false)} /></Sheet>}
    {s === "liste" && <InhaltListe liste={liste} teamSicht={teamSicht || !m} oeffne={oeffne} alleMakler={!m} />}
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
  if (!c) return <Leer titel="Beitrag nicht gefunden." aktion={<Btn onClick={zurueck}>Zurück</Btn>} />;
  return teamSicht ? <Werkstatt c={c} zurueck={zurueck} /> : <Abstimmung c={c} zurueck={zurueck} />;
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
      <label className="hm-feld"><span>Schnitt</span><select value={c.cutter} onChange={(e) => set({ cutter: e.target.value })}>{[...new Set(["Automatisch", ...HM_TEAM.map((t) => t.name), c.cutter].filter(Boolean))].map((t) => <option key={t}>{t}</option>)}</select></label>
    </div>
    <div>
      <div className="hm-row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
        <div className="hm-mono">Skript · gesprochener Text in Anführungszeichen · {sz.woerter} Wörter, {sz.sekunden} s</div>
        <div className="hm-row" style={{ gap: 6 }}><select className="hm-sel" value="" onChange={(e) => { const v = vorlagen.find((x) => x.id === e.target.value); if (v) set({ skript: v.text }); }}><option value="">Vorlage einsetzen</option>{vorlagen.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}</select><button className="hm-chip ki" onClick={() => setCheck(hmSkriptCheck(c.skript, b))}>Prüfen lassen</button></div>
      </div>
      <textarea className="hm-skript" rows={9} value={c.skript} onChange={(e) => set({ skript: e.target.value })} placeholder={'"Erster Satz ist der Hook, unter 12 Wörtern."\n"Dann die Aussage."\n"Zum Schluss eine Frage an die Zuschauer."'} />
      {check && <div className="hm-check">{check.map((x, i) => <div key={i} className={x.ok ? "ok" : "no"}><i>{x.ok ? <Ico n="haken" g={12} /> : <Ico n="x" g={12} />}</i>{x.t}</div>)}</div>}
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
    <div className="hm-medien klein">{passend.map((k) => <button key={k.id} className={"hm-medium" + (gewaehlt.includes(k.id) ? " on" : "")} onClick={() => toggle(k.id)}><div className="bild">{k.typ === "video" ? <VideoBild src={hmVideoSrc(k.src)} t={k.von + 0.5} poster={k.poster} /> : <img src={k.src} alt="" />}{gewaehlt.includes(k.id) && <span className="nr"><Ico n="haken" g={12} /></span>}</div><div className="t">{k.titel}</div><div className="tags">{k.tags.slice(0, 2).map((t) => <span key={t}>{t}</span>)}</div></button>)}</div>
    <div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-mono">2 · Schnitt aus dem Skript</div><Btn onClick={schneiden} knob="schnitt">{c.schnitt ? "Neu schneiden" : "Automatisch schneiden"}</Btn></div>
    {c.schnitt ? <SchnittPlayer segs={c.schnitt} clips={clips} b={b} onChange={(segs) => set({ schnitt: segs })} /> : <div className="hm-daten">Ein Clip je Satz, Bildwechsel dazwischen, Endkarte am Schluss.</div>}
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
    <div><div className="hm-mono" style={{ marginBottom: 8 }}>Kanäle</div><div className="hm-chips">{K.map(([id, t]) => <button key={id} className={"hm-chip" + ((c.kanaele || []).includes(id) ? " on" : "")} onClick={() => set({ kanaele: (c.kanaele || []).includes(id) ? c.kanaele.filter((x) => x !== id) : [...(c.kanaele || []), id] })}>{t}</button>)}</div><div className="hm-daten" style={{ marginTop: 10 }}>Geht nach der Freigabe automatisch online.</div></div>
    <div className="hm-phase-fuss"><span className="hm-mono">Wird automatisch gespeichert</span><Btn disabled={!(c.caption && c.termin && (c.kanaele || []).length)} onClick={weiter}>Weiter zur Freigabe</Btn></div>
  </div>;
}

function Phase4({ c, set, b, teamSicht }) {
  const [notiz, setNotiz] = React.useState("");
  const [mail, setMail] = React.useState(false);
  const fehlt = [["Schnitt oder Bilder", !!(c.schnitt && c.schnitt.length) || (c.typ !== "reel" && (c.clips || []).length > 0) || !!c.thumb], ["Caption", !!c.caption], ["Termin", !!c.termin], ["Kanal", (c.kanaele || []).length > 0]].filter((x) => !x[1]).map((x) => x[0]);
  const kontakte = ((hmStore.get("kontakte") || {})[c.maklerId] || []).filter((k) => k.freigabe);
  const frist = c.termin ? (() => { const d = new Date(c.termin); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10); })() : "";
  return <div className="hm-stack">
    {c.zustand === "freigabe" && !teamSicht && <div className="hm-stack" style={{ gap: 10 }}><div style={{ fontSize: 20, color: "var(--ink)", letterSpacing: "-.01em" }}>Passt das so?</div><div className="hm-row"><Btn onClick={() => set({ zustand: "freigegeben" }, "freigegeben")}>Freigeben</Btn><button className="hm-link" disabled={c.korrekturen >= 2 && !notiz} onClick={() => { set({ zustand: "aenderung", korrekturen: (c.korrekturen || 0) + 1, notizen: notiz ? [...(c.notizen || []), { von: b.makler.name, t: Date.now(), text: notiz }] : c.notizen }, "Änderung gewünscht"); setNotiz(""); }}>Änderung wünschen</button></div><div className="hm-mono">Ohne Rückmeldung automatisch freigegeben am {hmDatum(frist)}.</div></div>}
    {teamSicht && !["freigabe", "freigegeben", "online"].includes(c.zustand) && <div className="hm-stack" style={{ gap: 10 }}>{fehlt.length ? <div className="hm-note">Es fehlt noch: {fehlt.join(", ")}.</div> : <div className="hm-mono">Geht an {kontakte.map((k) => k.name).join(", ") || "die Freigabe-Verantwortlichen"}.</div>}<div className="hm-row"><Btn disabled={fehlt.length > 0} onClick={() => set({ zustand: "freigabe" }, "zur Freigabe gesendet")}>Zur Freigabe senden</Btn><button className="hm-link" onClick={() => setMail(!mail)}>{mail ? "Mail ausblenden" : "So sieht die Mail aus"}</button></div>{mail && <div className="hm-mailvorschau"><b>Zur Freigabe: {c.titel}</b><br /><br />Hallo {b.vor},<br />dein Beitrag ist fertig und geht am {hmDatum(c.termin)} um {hmZeit(c.termin)} online. Ein Klick: freigeben oder Änderung wünschen.<br /><br />Dein UNIO Team</div>}</div>}
    {c.zustand === "freigabe" && teamSicht && <div className="hm-mono">Wartet auf {b.makler.name}. Automatische Freigabe am {hmDatum(frist)}.</div>}
    {c.zustand === "freigegeben" && <div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-mono">Geht am {hmDatum(c.termin)} um {hmZeit(c.termin)} online.</div>{teamSicht && <button className="hm-link" onClick={() => set({ zustand: "online", kz: { reach: 3200 + Math.round(Math.random() * 6000), saves: 30, sends: 40, likes: 220, kommentare: 12 } }, "veröffentlicht")}>Demo: jetzt veröffentlichen</button>}</div>}
    {c.zustand === "online" && c.kz && <div className="hm-wz" style={{ marginTop: 0 }}>{[["Erreicht", c.kz.reach], ["Gespeichert", c.kz.saves], ["Geteilt", c.kz.sends], ["Likes", c.kz.likes]].map(([t, v]) => <div key={t}><b style={{ fontSize: 22 }}>{v.toLocaleString("de-AT")}</b><span>{t}</span></div>)}</div>}
    <div>{(c.notizen || []).map((k, i) => <div key={i} className="hm-msg"><Avatar name={k.von} /><div><div className="w">{k.von} · {hmRel(k.t)}</div>{k.text}</div></div>)}<div className="hm-inp"><input value={notiz} onChange={(e) => setNotiz(e.target.value)} placeholder="Notiz zur Freigabe" onKeyDown={(e) => { if (e.key === "Enter" && notiz.trim()) { set({ notizen: [...(c.notizen || []), { von: teamSicht ? "Daniel Hayden" : b.makler.name, t: Date.now(), text: notiz }] }); setNotiz(""); } }} /></div></div>
  </div>;
}

function InhalteKalender({ liste, m, oeffne }) {
  const drehtage = useHm("drehtage") || [];
  const [mon, setMon] = React.useState(9);
  const first = new Date(2026, mon - 1, 1); const tage = new Date(2026, mon, 0).getDate(); const off = (first.getDay() + 6) % 7;
  const iso = (d) => `2026-${String(mon).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const neu = (datum) => { const id = "n" + Date.now(); hmContent((l) => [{ id, maklerId: m ? m.id : "elif", titel: "Neue Idee", typ: "reel", saeule: "markt", zustand: "idee", termin: datum + "T18:00", kanaele: ["instagram", "facebook"], skript: "", caption: "", manager: "Daniel Hayden", cutter: "Ahmet", clips: [], kommentare: [], notizen: [], korrekturen: 0 }, ...l]); oeffne(id); };
  return <div>
    <div className="hm-row" style={{ justifyContent: "space-between", marginTop: 20 }}><div className="hm-h hm-h2">{first.toLocaleDateString("de-AT", { month: "long", year: "numeric" })}</div><div className="hm-seg"><button onClick={() => setMon(Math.max(8, mon - 1))} aria-label="Voriger Monat"><Ico n="zurueck" /></button><button className="on" onClick={() => setMon(9)}>Heute</button><button onClick={() => setMon(Math.min(12, mon + 1))} aria-label="Nächster Monat"><Ico n="weiter" /></button></div></div>
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
    <Kopf titel={offen.length ? `${offen.length} ${offen.length === 1 ? "Beitrag wartet" : "Beiträge warten"}${teamSicht ? " auf Makler" : " auf dich"}.` : "Alles freigegeben."} text={teamSicht ? "Was offen ist, wird am Vortag automatisch freigegeben." : "Ansehen, freigeben oder eine Änderung wünschen. Zwei Runden sind frei."} rechts={<Tabs klein tabs={[["liste", "Liste"], ["kanban", "Spalten"]]} akt={ansicht} set={setAnsicht} />} />
    {ansicht === "liste" ? <div className="hm-stack" style={{ marginTop: 22 }}>{offen.map((c) => { const b = hmBrand(c.maklerId); return <div key={c.id} className="hm-fz" onClick={() => oeffne(c.id)}>{c.thumb ? <img src={c.thumb} alt="" /> : <div className="hm-leerbild klein">{HM_TYPEN[c.typ]}</div>}<div style={{ minWidth: 0, flex: 1 }}><div className="hm-row" style={{ gap: 8 }}><span className="hm-typ">{HM_TYPEN[c.typ]}</span>{!m && <span className="hm-mono">{b.makler.name}</span>}</div><div className="t">{c.titel}</div><div className="s">{(c.caption || "").split("\n")[0]}</div><div className="hm-mono" style={{ marginTop: 6 }}>{hmDatum(c.termin)} {hmZeit(c.termin)} · Runde {c.korrekturen || 0} von 2</div></div>{!teamSicht && <div className="hm-row" style={{ gap: 6 }} onClick={(e) => e.stopPropagation()}><Btn onClick={() => setBeitrag(c.id, { zustand: "freigegeben" }, "freigegeben", b.makler.name)}>Freigeben</Btn></div>}</div>; })}{!offen.length && <Leer titel="Nichts offen." text="Neue Beiträge landen hier, sobald sie fertig geschnitten sind." />}</div>
      : <div className="hm-board" style={{ gridTemplateColumns: "repeat(3, minmax(220px, 1fr))" }}>{spalten.map(([z, t]) => { const l = liste.filter((c) => c.zustand === z); return <div key={z} className="hm-spalte"><div className="hd"><span><i style={{ background: hmSpalte(z).farbe }}></i>{t}</span><span className="n">{l.length}</span></div>{l.map((c) => <Karte key={c.id} c={c} oeffne={oeffne} maklerName={!m ? (makler.find((x) => x.id === c.maklerId) || {}).name : null} />)}</div>; })}</div>}
  </div>;
}

function Wirkung({ m, oeffne, teamSicht }) {
  const reports = ((useHm("reports") || {})[m.id]) || [];
  const [imp, setImp] = React.useState(false);
  const importKnopf = teamSicht ? <><button className="hm-klein-btn hell" onClick={() => setImp(true)}>Insights importieren</button><Sheet offen={imp} zu={() => setImp(false)} titel="Insights importieren" unter={m.name} breit><ReportImport m={m} zu={() => setImp(false)} /></Sheet></> : null;
  const alle = useHm("content") || [];
  const [i, setI] = React.useState(reports.length - 1);
  const online = alle.filter((c) => c.maklerId === m.id && c.zustand === "online" && c.kz).sort((a, b) => b.kz.reach - a.kz.reach);
  const r = reports[i], prev = reports[i - 1];
  if (!r) return <div><Kopf titel="Wirkung" rechts={importKnopf} /><Leer titel="Die ersten Zahlen kommen nach dem ersten Monat online." text="Reichweite, Follower, gespeicherte und geteilte Beiträge. Automatisch am Monatsersten." /></div>;
  const d = (k) => prev ? Math.round((r[k] - prev[k]) / prev[k] * 100) : null;
  return <div>
    <Kopf titel="Wirkung" rechts={<><Tabs klein tabs={reports.map((x, j) => [String(j), new Date(x.monat + "-01").toLocaleDateString("de-AT", { month: "long" })])} akt={String(i)} set={(x) => setI(+x)} />{importKnopf}</>} />
    <div className="hm-wz">{[["reach", "Erreicht, Summe der Beiträge"], ["follower", "Follower"], ["sendsK", "Geteilt je 1.000 erreicht"], ["savesK", "Gespeichert je 1.000 erreicht"]].map(([k, t]) => { const je = (x, key) => x ? Math.round((x[key.replace("K", "")] / Math.max(1, x.reach)) * 10000) / 10 : null; const wert = k.endsWith("K") ? je(r, k) : r[k]; const alt = k.endsWith("K") ? je(prev, k) : prev ? prev[k] : null; const v = alt ? Math.round(((wert - alt) / alt) * 100) : null; return <div key={k}><b>{wert.toLocaleString("de-AT")}</b><span>{t}{v != null && <em style={{ color: v >= 0 ? "var(--positive)" : "var(--signal-deep)" }}>{v >= 0 ? "+" : ""}{v} %</em>}</span></div>; })}</div>
    {reports.length > 1 && <><div className="hm-sek">Verlauf</div><div className="hm-gruppe" style={{ padding: "8px 16px 12px" }}><div style={{ maxWidth: 520 }}><Sparkline data={reports.map((x) => x.reach)} aktiv={i} /></div><div className="hm-row" style={{ gap: 0, justifyContent: "space-between", maxWidth: 520 }}>{reports.map((x) => <span key={x.monat} className="hm-daten">{new Date(x.monat + "-01").toLocaleDateString("de-AT", { month: "short" })}</span>)}</div></div></>}
    <div className="hm-sek">Beiträge nach Reichweite</div>
    <div className="hm-gruppe">{online.map((c) => <div key={c.id} className="hm-reihe klick" onClick={() => oeffne(c.id)}>{c.thumb ? <img className="bild" src={c.thumb} alt="" /> : <span className="bild"></span>}<div className="m"><div className="t">{c.titel}</div><div className="u">{HM_TYPEN[c.typ]} · {hmDatum(c.termin)}</div></div><div className="r"><span className="hm-daten">{c.kz.reach.toLocaleString("de-AT")} · {c.kz.saves} gesp. · {c.kz.sends} geteilt</span><span className="hm-chev"><Ico n="weiter" /></span></div></div>)}</div>
    <div className="hm-sek">Was wir daraus machen</div>
    <div className="hm-gruppe">{r.empf.map((e) => <div key={e} className="hm-reihe"><div className="m"><div className="t" style={{ whiteSpace: "normal" }}>{e}</div></div></div>)}</div>
    <QuartalsReview m={m} teamSicht={teamSicht} />
  </div>;
}

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
    <button className="hm-fab" onClick={() => setOffen(true)} aria-label="Fragen"><Ico n="frage" g={20} /></button>
    <Sheet offen={offen} zu={() => { setOffen(false); setAntwort(null); }} titel="Assistent" unter="Kurze Antworten aus deinen Daten. Im Prototyp regelbasiert, ohne KI-Aufruf.">
      <div className="hm-stack">{fragen.map(([f, fn]) => <button key={f} className="hm-zeile klick" onClick={() => setAntwort({ f, a: fn() })}><div className="m"><div className="t">{f}</div></div><div className="r"><Ico n="weiter" /></div></button>)}
        {antwort && <div className="hm-card"><div className="hm-mono">{antwort.f}</div><div style={{ whiteSpace: "pre-line", marginTop: 8, color: "var(--ink)" }}>{antwort.a}</div></div>}</div>
    </Sheet>
  </>;
}

function HM_LISTEN_GRUPPEN(team) { return [["wartet", team ? "Wartet auf Freigabe" : "Wartet auf dich", ["freigabe"]], ["aenderung", "Änderung gewünscht", ["aenderung"]], ["arbeit", "In Arbeit", ["planung", "dreh", "schnitt"]], ["geplant", "Geplant", ["freigegeben"]], ["idee", "Ideen", ["idee"]], ["online", "Online", ["online"]], ["pausiert", "Pausiert", ["pausiert"]]]; }

function InhaltListe({ liste, teamSicht, oeffne, alleMakler }) {
  const makler = useHm("makler") || [];
  const [f, setF] = React.useState("alle");
  const G = HM_LISTEN_GRUPPEN(teamSicht).map(([id, t, zs]) => [id, t, liste.filter((c) => zs.includes(c.zustand)).sort((a, b) => (a.termin || "9").localeCompare(b.termin || "9"))]).filter((g) => g[2].length);
  const name = (id) => (makler.find((x) => x.id === id) || {}).name || "";
  return <div>
    <div className="hm-filter"><button className={f === "alle" ? "on" : ""} onClick={() => setF("alle")}>Alle<span className="n">{liste.length}</span></button>{G.map(([id, t, l]) => <button key={id} className={f === id ? "on" : ""} onClick={() => setF(id)}>{t}<span className="n">{l.length}</span></button>)}</div>
    {G.filter((g) => f === "alle" || g[0] === f).map(([id, t, l]) => <div key={id}>
      <div className="hm-sek">{t}</div>
      <div className="hm-gruppe">{l.map((c) => <div key={c.id} className="hm-reihe klick" onClick={() => oeffne(c.id)}>
        {c.thumb ? <img className="bild" src={c.thumb} alt="" /> : <span className="bild" style={{ display: "grid", placeItems: "center", fontSize: 11, color: "var(--text-muted)" }}>{HM_TYPEN[c.typ]}</span>}
        <div className="m"><div className="t">{c.titel}</div><div className="u">{[HM_TYPEN[c.typ], c.termin ? `${hmDatum(c.termin)} ${hmZeit(c.termin)}` : "ohne Termin", alleMakler ? name(c.maklerId) : null, id === "arbeit" ? hmSpalte(c.zustand).name : null].filter(Boolean).join(" · ")}</div></div>
        <div className="r" onClick={(e) => id === "idee" && !teamSicht && e.stopPropagation()}>
          {id === "idee" && !teamSicht ? <><button className="hm-klein-btn" onClick={() => setBeitrag(c.id, { zustand: "planung" }, "Idee gewählt", name(c.maklerId))}>Machen wir</button><button className="hm-klein-btn hell" onClick={() => setBeitrag(c.id, { zustand: "pausiert" }, "Idee verworfen", name(c.maklerId))}>Nein</button></> : id === "online" && c.kz ? <span className="hm-daten">{c.kz.reach.toLocaleString("de-AT")} erreicht</span> : null}
          <span className="hm-chev"><Ico n="weiter" /></span>
        </div>
      </div>)}</div>
    </div>)}
    {!liste.length && <Leer titel="Noch keine Inhalte." text="Neue Ideen kommen jeden Monat aus deiner Strategie." />}
  </div>;
}

function hmDatumLang(iso) {
  if (!iso) return "noch offen";
  const d = new Date(iso);
  return d.toLocaleDateString("de-AT", { weekday: "long", day: "numeric", month: "long" }) + (iso.length > 10 ? `, ${iso.slice(11, 16)} Uhr` : "");
}

function hmKanalText(k) { const n = (k || []).map((x) => (HM_KANAELE[x] ? HM_KANAELE[x].name : x)); return n.length > 1 ? n.slice(0, -1).join(", ") + " und " + n[n.length - 1] : n[0] || "keinem Kanal"; }

function hmVerlaufPunkte(c) {
  const reihe = ["idee", "planung", "dreh", "schnitt", "freigabe", "freigegeben", "online"];
  const pos = Math.max(0, reihe.indexOf(c.zustand === "aenderung" ? "schnitt" : c.zustand === "pausiert" ? "idee" : c.zustand));
  return [["Idee", 0], ["Skript", 1], ["Dreh", 2], ["Schnitt", 3], ["Abstimmung", 4], ["Eingeplant", 5], ["Online", 6]].map(([t, i]) => ({ t, fertig: i < pos, jetzt: i === pos }));
}

/* Ein Beitrag, zwei Ansichten: Abstimmung für den Makler, Werkstatt für das Team */

function Vorschau({ c, b, clips }) {
  const [kanal, setKanal] = React.useState((c.kanaele || []).includes("instagram") ? "instagram" : "facebook");
  const bilder = (c.clips || []).map((i) => clips.find((k) => k.id === i)).filter((k) => k && k.typ === "foto");
  return <div className="hm-stack" style={{ alignItems: "center", gap: 12 }}>
    <Tabs klein tabs={[["instagram", "Instagram"], ["facebook", "Facebook"]]} akt={kanal} set={setKanal} />
    <Handy kanal={kanal} b={b} caption={c.caption}>
      {c.schnitt && c.schnitt.length ? <SchnittPlayer segs={c.schnitt} clips={clips} b={b} kompakt /> : bilder.length ? <div className="hm-karussell">{bilder.map((k) => <img key={k.id} src={k.src} alt="" />)}</div> : c.thumb ? <img src={c.thumb} alt="" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }} /> : <div className="hm-leerbild">Vorschau erscheint mit dem Material</div>}
    </Handy>
  </div>;
}

function Verlauf({ c }) {
  return <div className="hm-verlauf2">{hmVerlaufPunkte(c).map((p) => <div key={p.t} className={(p.fertig ? "ok " : "") + (p.jetzt ? "jetzt" : "")}><i></i><span>{p.t}</span></div>)}</div>;
}

function Gespraech({ c, set, von, platzhalter }) {
  const [t, setT] = React.useState("");
  const msgs = [...(c.kommentare || []), ...(c.notizen || [])].sort((a, b) => a.t - b.t);
  const senden = () => { if (!t.trim()) return; set({ kommentare: [...(c.kommentare || []), { von, t: Date.now(), text: t }] }, "neue Nachricht"); setT(""); };
  return <div>
    {msgs.map((k, i) => <div key={i} className={"hm-blase" + (k.von === von ? " ich" : "")}><div className="w">{k.von} · {hmRel(k.t)}</div><div className="x">{k.text}</div></div>)}
    <div className="hm-inp"><input value={t} onChange={(e) => setT(e.target.value)} placeholder={platzhalter} onKeyDown={(e) => e.key === "Enter" && senden()} /><button className="hm-klein-btn" disabled={!t.trim()} onClick={senden}>Senden</button></div>
  </div>;
}

function Abstimmung({ c, zurueck }) {
  const clips = useClips(c.maklerId);
  const b = hmBrand(c.maklerId);
  const set = (patch, text) => setBeitrag(c.id, patch, text, b.makler.name);
  const [aendern, setAendern] = React.useState(false);
  const [wunsch, setWunsch] = React.useState("");
  const [capEdit, setCapEdit] = React.useState(false);
  const [klein, setKlein] = React.useState(false);
  const hook = ((c.skript || "").match(/"([^"]+)"/) || [])[1] || (c.skript || "").split("\n")[0];
  const frist = c.termin ? (() => { const d = new Date(c.termin); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10); })() : "";
  const frei = 2 - (c.korrekturen || 0);
  const stufe = { idee: "Noch eine Idee", planung: "Das Team schreibt das Skript", dreh: "Wird gedreht", schnitt: "Wird geschnitten", aenderung: "Deine Änderung wird umgesetzt", freigabe: "Wartet auf dich", freigegeben: "Eingeplant", online: "Online", pausiert: "Pausiert" }[c.zustand];
  const kostet = frei <= 0;
  const senden = () => {
    set({ zustand: "aenderung", korrekturen: (c.korrekturen || 0) + 1, kostenpflichtig: kostet || c.kostenpflichtig, kommentare: [...(c.kommentare || []), { von: b.makler.name, t: Date.now(), text: wunsch + (kostet ? " (kostenpflichtig)" : "") }] }, kostet ? "kostenpflichtige Änderung gewünscht" : "Änderung gewünscht");
    if (kostet) hmStore.patch("tickets", (l) => [...(l || []), { id: "t" + Date.now(), maklerId: c.maklerId, titel: `Aufwand schätzen: ${c.titel}`, owner: "Daniel", zustand: "wartet_team", faellig: HM_HEUTE, text: `Dritte Runde: ${wunsch}` }]);
    setWunsch(""); setAendern(false); toast(kostet ? "Wir nennen dir vorher den Aufwand." : "Ist beim Team. Du bekommst die neue Fassung zur Abstimmung.");
  };
  return <div>
    <button className="hm-zurueck" onClick={zurueck}><Ico n="zurueck" />Inhalte</button>
    <div className="hm-abst">
      <div className="hm-abst-l"><Vorschau c={c} b={b} clips={clips} /></div>
      <div className="hm-abst-r">
        <span className={"hm-status" + (c.zustand === "freigabe" ? " stark" : "")}><i style={{ background: hmSpalte(c.zustand).farbe }}></i>{stufe}</span>
        <h2 className="hm-h hm-h1" style={{ margin: "12px 0 0" }}>{c.titel}</h2>
        <div className="hm-abst-block"><div className="hm-mono">Geht online</div><div className="v">{hmDatumLang(c.termin)}</div><div className="u">auf {hmKanalText(c.kanaele)}</div></div>
        <div className="hm-abst-block"><div className="hm-mono">Worum es geht</div><div className="v">{hook || c.titel}</div><div className="u">{HM_TYPEN[c.typ]} aus deiner Säule {HM_SAEULEN[c.saeule] ? HM_SAEULEN[c.saeule].name : ""}</div></div>
        {c.caption && <div className="hm-abst-block"><div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-mono">Text zum Beitrag</div>{c.zustand === "freigabe" && <button className="hm-link" onClick={() => setCapEdit(!capEdit)}>{capEdit ? "Fertig" : "Selbst anpassen"}</button>}</div>{capEdit ? <textarea className="hm-skript" rows={5} value={c.caption} onChange={(e) => set({ caption: e.target.value })} /> : <div className="cap">{c.caption}</div>}</div>}
        {c.zustand === "freigabe" && !aendern && <div className="hm-abst-aktion"><Btn onClick={() => { set({ zustand: "freigegeben", freigabe: { von: b.makler.name, zeit: new Date().toISOString() } }, "abgestimmt: passt so"); toast(`Eingeplant für ${hmDatumLang(c.termin)}`); }}>Passt so</Btn><button className="hm-link" onClick={() => setAendern(true)}>{kostet ? "Weitere Änderung" : "Etwas ändern"}</button><button className="hm-link" onClick={() => setKlein(true)}>Passt, mit Kleinigkeit</button><div className="hm-mono" style={{ width: "100%" }}>{frei > 0 ? `Noch ${frei} ${frei === 1 ? "Änderungswunsch" : "Änderungswünsche"} frei.` : "Beide Änderungswünsche sind verbraucht. Jede weitere Runde kostet 150 € je Stunde, wir nennen dir vorher den Aufwand."} Wenn du nichts sagst, geht der Beitrag am {hmDatum(frist)} so online.</div></div>}
        {klein && <div className="hm-abst-aktion"><textarea className="hm-skript" rows={2} autoFocus value={wunsch} onChange={(e) => setWunsch(e.target.value)} placeholder="Tippfehler, ein Wort, ein Bildausschnitt. Kostet keinen Änderungswunsch." /><div className="hm-row"><Btn disabled={!wunsch.trim()} onClick={() => { set({ zustand: "freigegeben", kleinigkeit: wunsch, freigabe: { von: b.makler.name, zeit: new Date().toISOString() }, kommentare: [...(c.kommentare || []), { von: b.makler.name, t: Date.now(), text: "Passt, mit Kleinigkeit: " + wunsch }] }, "abgestimmt mit Kleinigkeit"); setWunsch(""); setKlein(false); toast("Eingeplant. Das Team korrigiert die Kleinigkeit vorher."); }}>Passt so, mit dieser Kleinigkeit</Btn><button className="hm-link" onClick={() => setKlein(false)}>Abbrechen</button></div></div>}
        {aendern && <div className="hm-abst-aktion"><div className="hm-chips">{["Anderer Einstieg", "Kürzer", "Anderes Bild", "Text anpassen", "Anderer Termin"].map((x) => <button key={x} className="hm-chip" onClick={() => setWunsch((w) => (w ? w + ", " : "") + x)}>{x}</button>)}</div><textarea className="hm-skript" rows={3} autoFocus value={wunsch} onChange={(e) => setWunsch(e.target.value)} placeholder="Was soll anders sein? Ein Satz reicht." /><div className="hm-row"><Btn disabled={!wunsch.trim()} onClick={senden}>An das Team</Btn><button className="hm-link" onClick={() => setAendern(false)}>Abbrechen</button></div></div>}
        {c.zustand === "idee" && <div className="hm-abst-aktion"><Btn onClick={() => set({ zustand: "planung" }, "Idee gewählt")}>Machen wir</Btn><button className="hm-link" onClick={() => set({ zustand: "pausiert" }, "Idee verworfen")}>Lieber nicht</button></div>}
        {c.freigabe && ["freigegeben", "online"].includes(c.zustand) && <div className="hm-abst-block"><div className="hm-mono">Abgestimmt</div><div className="u">Von {c.freigabe.von} am {new Date(c.freigabe.zeit).toLocaleString("de-AT", { dateStyle: "medium", timeStyle: "short" })}{c.freigabe.auto ? ", automatisch nach Ablauf der Frist" : ""}</div></div>}
        {c.zustand === "online" && c.kz && <div className="hm-abst-block"><div className="hm-mono">Wirkung bisher</div><div className="v">{c.kz.reach.toLocaleString("de-AT")} erreicht</div><div className="u">{c.kz.saves} gespeichert · {c.kz.sends} geteilt · {c.kz.likes} Likes</div></div>}
        <div className="hm-abst-block"><div className="hm-mono">Verlauf</div><Verlauf c={c} /></div>
        <div className="hm-abst-block"><div className="hm-mono">Gespräch mit dem Team</div><Gespraech c={c} set={set} von={b.makler.name} platzhalter="Frage oder Hinweis an das Team" /></div>
      </div>
    </div>
  </div>;
}

function Werkstatt({ c, zurueck }) {
  const clips = useClips(c.maklerId);
  const b = hmBrand(c.maklerId);
  const set = (patch, text) => setBeitrag(c.id, patch, text, "Team");
  const [tab, setTab] = React.useState(c.zustand === "schnitt" || c.zustand === "aenderung" ? "schnitt" : c.zustand === "freigabe" || c.zustand === "freigegeben" ? "text" : "skript");
  const abgabe = hmAbgabeCheck(c, b, clips);
  const bereit = abgabe.bereit;
  const [grafik, setGrafik] = React.useState(false);
  const aktion = {
    idee: [c.skript ? "Zum Dreh" : "Skript schreiben", () => c.skript ? set({ zustand: "dreh" }, "bereit zum Dreh") : setTab("skript"), false],
    planung: ["Zum Dreh", () => set({ zustand: "dreh" }, "bereit zum Dreh"), !c.skript],
    dreh: ["Gedreht", () => { set({ zustand: "schnitt" }, "gedreht"); setTab("schnitt"); }, false],
    schnitt: [`An ${b.vor} schicken`, () => set({ zustand: "freigabe" }, "zur Abstimmung geschickt"), !bereit],
    aenderung: [`Wieder an ${b.vor} schicken`, () => set({ zustand: "freigabe" }, "neue Fassung zur Abstimmung"), !bereit],
    freigabe: [`Liegt bei ${b.vor}`, () => {}, true],
    freigegeben: ["Demo: jetzt veröffentlichen", () => set({ zustand: "online", kz: { reach: 3200 + Math.round(Math.random() * 6000), saves: 30, sends: 40, likes: 220, kommentare: 12 } }, "veröffentlicht"), false],
    online: null, pausiert: ["Wieder aufnehmen", () => set({ zustand: "planung" }, "wieder aufgenommen"), false],
  }[c.zustand];
  const fehlt = [!c.caption && "Text", !c.termin && "Termin", !(c.kanaele || []).length && "Kanal", c.typ === "reel" && !(c.schnitt && c.schnitt.length) && "Schnitt"].filter(Boolean);
  const score = hmViralScore(c, clips);
  return <div>
    <div className="hm-werk-kopf">
      <button className="hm-zurueck" onClick={zurueck}><Ico n="zurueck" />Zurück</button>
      <div className="hm-row" style={{ gap: 10 }}>
        {c.zustand === "freigabe" && <button className="hm-link" onClick={() => { hmEvent(c.maklerId, "erinnerung", `Erinnerung: ${c.titel}`, "Team"); toast("Erinnert"); }}>Erinnern</button>}
        {["freigabe", "aenderung", "schnitt"].includes(c.zustand) && <KopierKnopf text={`${location.origin}${location.pathname}?rolle=makler&makler=${c.maklerId}&beitrag=${c.id}&ansicht=link`} label="Abstimmungslink" />}
        {aktion && <Btn disabled={aktion[2]} onClick={aktion[1]}>{aktion[0]}</Btn>}
      </div>
    </div>
    {c.kleinigkeit && c.zustand === "freigegeben" && <div className="hm-hinweis" style={{ marginTop: 10 }}>Vor dem Posten korrigieren: {c.kleinigkeit} <button className="hm-link" onClick={() => set({ kleinigkeit: null }, "Kleinigkeit korrigiert")}>Erledigt</button></div>}
    <input className="hm-titel-edit" value={c.titel} onChange={(e) => set({ titel: e.target.value })} aria-label="Titel" />
    <div className="hm-mono" style={{ marginTop: 4 }}>{b.makler.name} · <span className="hm-status"><i style={{ background: hmSpalte(c.zustand).farbe }}></i>{hmSpalte(c.zustand).name}</span>{(c.zustand === "schnitt" || c.zustand === "aenderung") && fehlt.length ? ` · Es fehlt noch: ${fehlt.join(", ")}` : ""}</div>
    <div className="hm-werk">
      <div className="hm-werk-l">
        <Tabs tabs={[["skript", "Skript"], ["schnitt", c.typ === "reel" ? "Schnitt" : "Bilder"], ["text", "Text"], ["gespraech", "Gespräch", [...(c.kommentare || []), ...(c.notizen || [])].length]]} akt={tab} set={setTab} />
        <div style={{ marginTop: 18 }}>
          {tab === "skript" && <SkriptTab c={c} set={set} b={b} />}
          {tab === "schnitt" && <SchnittTab c={c} set={set} b={b} clips={clips} />}
          {tab === "text" && <TextTab c={c} set={set} b={b} />}
          {tab === "gespraech" && <Gespraech c={c} set={set} von="Daniel Hayden" platzhalter={`Nachricht an ${b.vor} oder das Team`} />}
        </div>
      </div>
      <aside className="hm-werk-r">
        {!(tab === "schnitt" && c.schnitt && c.schnitt.length) && <Vorschau c={c} b={b} clips={clips} />}
        <div className="hm-gruppe" style={{ padding: "2px 14px" }}><div className="hm-insp">
          <label><span>Format</span><select value={c.typ} onChange={(e) => set({ typ: e.target.value })}>{Object.entries(HM_TYPEN).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
          <label><span>Säule</span><select value={c.saeule} onChange={(e) => set({ saeule: e.target.value })}>{Object.entries(HM_SAEULEN).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}</select></label>
          <label><span>Betreut von</span><select value={c.manager} onChange={(e) => set({ manager: e.target.value })}>{HM_TEAM.map((t) => <option key={t.id}>{t.name}</option>)}</select></label>
          <label><span>Schneidet</span><select value={c.cutter} onChange={(e) => set({ cutter: e.target.value })}>{[...new Set(["Automatisch", ...HM_TEAM.map((t) => t.name), c.cutter].filter(Boolean))].map((t) => <option key={t}>{t}</option>)}</select></label>
          <label><span>Drehtag</span><input type="date" value={c.drehtag || ""} onChange={(e) => set({ drehtag: e.target.value })} /></label>
          <label><span>Drehort</span><select value={c.drehort || "Objekt"} onChange={(e) => set({ drehort: e.target.value })}>{["Objekt", "Grätzl", "Büro", "Studio", "Beim Kunden"].map((x) => <option key={x}>{x}</option>)}</select></label>
          <label><span>Stil</span><select value={c.stil || "Vlog, natürlich"} onChange={(e) => set({ stil: e.target.value })}>{["Vlog, natürlich", "Erklärend", "Kundenstimme", "Rundgang"].map((x) => <option key={x}>{x}</option>)}</select></label>
          <label><span>Geht online</span><input type="datetime-local" value={(c.termin || "").slice(0, 16)} onChange={(e) => set({ termin: e.target.value })} /></label>
          {!c.termin && <div className="kan"><span>Vorschlag</span><div>{hmPostingSlots(b.makler, 2).map((x) => <button key={x.iso} title={x.grund} onClick={() => set({ termin: x.iso })}>{hmDatum(x.iso)} {x.iso.slice(11, 16)}</button>)}</div></div>}
          <div className="kan"><span>Kanäle</span><div>{[["instagram", "IG"], ["facebook", "FB"], ["linkedin", "LI"], ["tiktok", "TT"]].map(([k, t]) => <button key={k} className={(c.kanaele || []).includes(k) ? "on" : ""} title={HM_KANAELE[k].name} onClick={() => set({ kanaele: (c.kanaele || []).includes(k) ? c.kanaele.filter((x) => x !== k) : [...(c.kanaele || []), k] })}>{t}</button>)}</div></div>
          <div><span>Prognose</span><b title={score.faktoren.map((f) => `${f.t} ${f.p}`).join(" · ")}>{score.score} von 100</b></div>
          <div><span>Änderungswünsche</span><b>{c.korrekturen || 0} von 2{c.kostenpflichtig ? ", weitere kostenpflichtig" : ""}</b></div>
        </div></div>
        {["schnitt", "aenderung", "freigabe"].includes(c.zustand) && <div><div className="hm-mono" style={{ margin: "4px 2px 8px" }}>Abgabe-Check · {abgabe.punkte.filter((x) => x.ok).length} von {abgabe.punkte.length}</div><AbgabeCheck c={c} /></div>}
        {c.typ !== "reel" && <button className="hm-klein-btn hell" style={{ alignSelf: "flex-start" }} onClick={() => setGrafik(true)}>Grafiken erzeugen</button>}
        <div><div className="hm-mono" style={{ margin: "4px 2px 8px" }}>Verlauf</div><Verlauf c={c} /></div>
      </aside>
      <Sheet offen={grafik} zu={() => setGrafik(false)} titel="Grafiken" unter={c.titel} breit><GrafikGenerator m={b.makler} c={c} zu={() => setGrafik(false)} /></Sheet>
    </div>
  </div>;
}

function SkriptTab({ c, set, b }) {
  const vorlagen = useHm("vorlagen") || [];
  const [check, setCheck] = React.useState(null);
  const [tp, setTp] = React.useState(false);
  const sz = hmSprechzeit(c.skript);
  return <div className="hm-stack">
    <div className="hm-row" style={{ justifyContent: "space-between" }}>
      <span className="hm-daten">{sz.woerter} Wörter gesprochen · {sz.sekunden} s</span>
      <div className="hm-row" style={{ gap: 8 }}><select className="hm-sel" value="" onChange={(e) => { const v = vorlagen.find((x) => x.id === e.target.value); if (v) set({ skript: v.text }); }}><option value="">Aus Vorlage</option>{vorlagen.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}</select><button className="hm-klein-btn hell" onClick={() => setCheck(hmSkriptCheck(c.skript, b))}>Prüfen</button><button className="hm-klein-btn hell" disabled={!sz.woerter} onClick={() => setTp(true)}>Teleprompter</button></div>
    </div>
    <textarea className="hm-skript gross" rows={12} value={c.skript} onChange={(e) => { set({ skript: e.target.value }); setCheck(null); }} placeholder={'"Der erste Satz ist der Einstieg, unter 12 Wörtern."\n"Dann die Aussage."\n"Zum Schluss eine Frage."\n\nGesprochenes in Anführungszeichen, Regieanweisungen ohne.'} />
    {tp && <Teleprompter skript={c.skript} zu={() => setTp(false)} />}
    {check && <div className="hm-check">{check.map((x, i) => <div key={i} className={x.ok ? "ok" : "no"}><i>{x.ok ? <Ico n="haken" g={12} /> : <Ico n="x" g={12} />}</i>{x.t}</div>)}</div>}
    {b.w && <div className="hm-stack" style={{ gap: 6 }}><div className="hm-mono">Einstiege aus der Strategie von {b.vor}</div><div className="hm-chips">{b.w.hooks.slice(0, 5).map((h) => <button key={h} className="hm-chip" onClick={() => set({ skript: `"${h}"\n` + (c.skript || "") })}>{h}</button>)}</div></div>}
  </div>;
}

function SchnittTab({ c, set, b, clips }) {
  const passend = clips.filter((k) => c.typ === "reel" ? true : k.typ === "foto");
  const gewaehlt = c.clips || [];
  const toggle = (id) => set({ clips: gewaehlt.includes(id) ? gewaehlt.filter((x) => x !== id) : [...gewaehlt, id] });
  const vorschlag = () => { const a = clips.filter((k) => k.tags.includes("Gesicht")).slice(0, 3).map((k) => k.id); const bb = clips.filter((k) => k.tags.includes("Objekt") || k.tags.includes("Stadt")).slice(0, 2).map((k) => k.id); set({ clips: [...new Set([...a, ...bb])] }); };
  const schneiden = () => { const q = clips.filter((k) => gewaehlt.includes(k.id)); set({ schnitt: hmAutoSchnitt(c, q.length ? q : clips) }, "automatisch geschnitten"); };
  return <div className="hm-stack">
    {c.typ === "reel" && c.schnitt && c.schnitt.length > 0 && <SchnittPlayer segs={c.schnitt} clips={clips} b={b} onChange={(segs) => set({ schnitt: segs })} />}
    <div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-mono">{c.typ === "reel" ? `Material · ${gewaehlt.length} gewählt` : `Bilder · Reihenfolge wie gewählt`}</div><div className="hm-row" style={{ gap: 8 }}>{c.typ === "reel" && <button className="hm-klein-btn hell" onClick={vorschlag}>Passendes wählen</button>}{c.typ === "reel" && <button className="hm-klein-btn" onClick={schneiden}>{c.schnitt ? "Neu schneiden" : "Aus dem Skript schneiden"}</button>}</div></div>
    <div className="hm-medien klein">{passend.map((k) => <button key={k.id} className={"hm-medium" + (gewaehlt.includes(k.id) ? " on" : "")} onClick={() => toggle(k.id)}><div className="bild">{k.typ === "video" ? <VideoBild src={hmVideoSrc(k.src)} t={k.von + 0.5} poster={k.poster} /> : <img src={k.src} alt="" />}{gewaehlt.includes(k.id) && <span className="nr">{c.typ === "reel" ? <Ico n="haken" g={12} /> : gewaehlt.indexOf(k.id) + 1}</span>}</div><div className="t">{k.titel}</div></button>)}</div>
    {c.typ === "reel" && <label className="hm-feld"><span>Für den Feinschnitt</span><textarea rows={2} value={c.briefing || ""} onChange={(e) => set({ briefing: e.target.value })} placeholder="Tempo, Musik, Einblendungen" /></label>}
  </div>;
}

function TextTab({ c, set, b }) {
  return <div className="hm-stack">
    <div className="hm-row" style={{ justifyContent: "space-between" }}><span className="hm-daten">{(c.caption || "").length} Zeichen</span><button className="hm-klein-btn hell" onClick={() => set({ caption: hmCaption(c, b.br, b.w) })}>Aus Skript und Marke</button></div>
    <textarea className="hm-skript gross" rows={8} value={c.caption || ""} onChange={(e) => set({ caption: e.target.value })} placeholder="Die erste Zeile entscheidet. Danach eine Frage, dann Hashtags." />
    {c.caption && <div className="hm-pruefliste" style={{ fontSize: 13 }}>{hmCaptionCheck(c.caption, b.w, c.titel, (c.kanaele || [])[0]).map((x) => <div key={x.t} className={x.ok ? "ok" : "nein"}><Ico n={x.ok ? "haken" : "x"} />{x.t}</div>)}</div>}
    <div className="hm-mono">Anrede und Ton aus der Marke von {b.vor}: {b.w ? b.w.anredeRegel : "noch offen"}.</div>
  </div>;
}

/* Automatik beim Start: abgelaufene Abstimmungsfristen (Tag vor dem Termin) werden protokolliert freigegeben */
function hmAutomatik() {
  const faellig = (hmStore.get("content") || []).filter((c) => c.zustand === "freigabe" && c.termin && (() => { const d = new Date(c.termin); d.setDate(d.getDate() - 1); return hmIsoLokal(d) < HM_HEUTE; })());
  faellig.forEach((c) => setBeitrag(c.id, { zustand: "freigegeben", freigabe: { von: "Automatisch", zeit: new Date().toISOString(), auto: true } }, "automatisch freigegeben, Frist abgelaufen", "System"));
  return faellig.length;
}
Object.assign(window, { hmAutomatik, Abstimmung, Werkstatt, Gespraech, Verlauf, Vorschau, SkriptTab, SchnittTab, TextTab, hmDatumLang, InhaltListe, HM_LISTEN_GRUPPEN, Inhalte2, Board, Karte, Beitrag, InhalteKalender, FreigabenQ, Wirkung, Assistent, setBeitrag });
