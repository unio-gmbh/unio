/* Werkbank. Betrieb: Lead-Radar (Akquise), Zero-One-Brücke (Datenaustausch), Selbsttest (alle Prüfungen auf einen Blick). */

/* ---------- Lead-Radar: Liste einlesen, zusammenführen, bewerten, an den Nachfass-Takt übergeben ---------- */
const HM_RADAR_BEISPIEL = "Name;Ort;Quelle;Inserate;Follower;Website;Notiz\nKatharina Weiss;1130 Hietzing;Empfehlung;14;900;ja;Villen und Häuser\nPhilipp Brandl;1190 Döbling;willhaben;22;300;ja;Zinshäuser, sehr aktiv\nNina Koller;1070 Neubau;Instagram;6;5400;nein;Postet selbst Reels\nMarkus Egger;Baden;willhaben;3;150;nein;Umland\nLaura Pichler;1030 Landstraße;ImmoScout24;11;1200;ja;Neubauprojekte\nNina Koller;1070 Neubau;Veranstaltung;6;5400;nein;doppelt\nStefan Haas;1220 Donaustadt;willhaben;18;80;ja;Erstbezug, viele Inserate, kaum Präsenz";
function hmRadarBewerten(z) {
  const inserate = +z.inserate || 0, follower = +z.follower || 0;
  const aktiv = Math.min(40, inserate * 2);                       // Aktivität: Inserate im Portal
  const wien = /^1\d{3}\b|wien/i.test(z.ort || "") ? 25 : /mödling|baden|klosterneuburg|purkersdorf/i.test(z.ort || "") ? 12 : 5;
  const luecke = follower < 1000 ? 25 : follower < 3000 ? 15 : 5; // wenig Präsenz, viel Geschäft: größter Hebel für eine Marke
  const web = /ja|true|1/i.test(z.website || "") ? 5 : 10;
  const punkte = Math.min(100, aktiv + wien + luecke + web);
  const grund = [inserate >= 10 ? `${inserate} Inserate` : null, follower < 1000 ? "kaum Präsenz auf Social Media" : follower > 3000 ? "schon sichtbar" : null, wien >= 25 ? "Wien" : null].filter(Boolean).join(", ");
  return { punkte, grund };
}
function hmRadarLesen(text) {
  const zeilen = hmCsv(text); const kopf = (zeilen[0] || []).map((h) => h.toLowerCase().trim());
  const i = (n) => kopf.findIndex((h) => n.some((x) => h.includes(x)));
  const idx = { name: i(["name"]), ort: i(["ort", "region", "bezirk"]), quelle: i(["quelle"]), inserate: i(["inserat", "objekte", "listings"]), follower: i(["follower"]), website: i(["website", "web"]), notiz: i(["notiz", "bemerkung"]) };
  const vorhanden = new Set((hmStore.get("leads") || []).map((l) => l.name.toLowerCase()));
  const seen = new Map(); let doppelt = 0;
  zeilen.slice(1).forEach((r) => {
    const z = Object.fromEntries(Object.entries(idx).map(([k, j]) => [k, j >= 0 ? String(r[j] || "").trim() : ""]));
    if (!z.name) return;
    const key = z.name.toLowerCase();
    if (seen.has(key)) { doppelt++; return; }
    seen.set(key, { ...z, ...hmRadarBewerten(z), schonDa: vorhanden.has(key) });
  });
  return { liste: [...seen.values()].sort((a, b) => b.punkte - a.punkte), doppelt };
}
function LeadRadar({ zu }) {
  const [erg, setErg] = React.useState(null);
  const [wahl, setWahl] = React.useState({});
  const laden = async (f) => { const r = hmRadarLesen(await f.text()); setErg(r); setWahl(Object.fromEntries(r.liste.filter((x) => !x.schonDa && x.punkte >= 50).map((x) => [x.name, true]))); };
  const uebernehmen = () => {
    const neu = erg.liste.filter((x) => wahl[x.name]).map((x) => ({ id: "l" + Date.now() + Math.random().toString(36).slice(2, 5), name: x.name, ort: x.ort || "Wien", quelle: x.quelle || "Liste", stufe: "research", naechstes: "Erste Nachricht", notiz: [x.notiz, `Radar ${x.punkte}: ${x.grund}`].filter(Boolean).join(". "), owner: "Nikita", radar: x.punkte }));
    hmStore.patch("leads", (a) => [...neu, ...(a || [])]);
    hmEvent(null, "akquise", `${neu.length} Kontakte aus dem Lead-Radar übernommen`, "Nikita");
    toast(`${neu.length} Kontakte übernommen, der Nachfass-Takt startet heute`); zu();
  };
  if (!erg) return <div className="hm-stack">
    <label className="hm-drop" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) laden(f); }}><input type="file" accept=".csv,.txt" hidden onChange={(e) => { const f = e.target.files[0]; e.target.value = ""; if (f) laden(f); }} /><span className="hm-row" style={{ gap: 10, justifyContent: "center" }}><Ico n="hoch" />Liste als CSV hierher ziehen</span></label>
    <div className="hm-row" style={{ gap: 16 }}><button className="hm-link" onClick={() => laden(new File([HM_RADAR_BEISPIEL], "radar.csv"))}>Mit Beispielliste ausprobieren</button><span className="hm-daten">Name, Ort, Quelle, Inserate, Follower, Website</span></div>
  </div>;
  const n = Object.values(wahl).filter(Boolean).length;
  return <div className="hm-stack">
    <div className="hm-daten">{erg.liste.length} Kontakte, {erg.doppelt} {erg.doppelt === 1 ? "Dublette" : "Dubletten"} zusammengeführt. Punkte aus Aktivität, Region und Präsenzlücke.</div>
    <div className="hm-gruppe">{erg.liste.map((x) => <div key={x.name} className="hm-reihe klick" onClick={() => !x.schonDa && setWahl({ ...wahl, [x.name]: !wahl[x.name] })}><span className={"hm-prod-wahl" + (wahl[x.name] ? " on" : "")}>{wahl[x.name] && <Ico n="haken" g={12} />}</span><div className="m"><div className="t">{x.name}</div><div className="u">{x.ort}{x.grund ? ` · ${x.grund}` : ""}{x.schonDa ? " · schon in der Akquise" : ""}</div></div><div className="r"><span className="hm-daten">{x.punkte}</span></div></div>)}</div>
    <div className="hm-row" style={{ justifyContent: "space-between" }}><button className="hm-link" onClick={() => setErg(null)}>Andere Liste</button><Btn disabled={!n} onClick={uebernehmen}>{n} übernehmen</Btn></div>
  </div>;
}

/* ---------- Zero-One-Brücke: gleicher Vertrag als JSON, Export und Import ---------- */
const HM_ZO_SAMMLUNGEN = ["makler", "leads", "einrichtung", "einrichtung_daten", "fragebogen", "strategien", "branding", "plattformen", "markenbuch", "website", "content", "drehtage", "auftraege", "tickets", "reports", "meetings", "kontakte", "portraits", "bestand", "community", "events"];
function hmZeroOneExport(mid) {
  const daten = {};
  HM_ZO_SAMMLUNGEN.forEach((k) => {
    const v = hmStore.get(k); if (v == null) return;
    if (!mid) { daten[k] = v; return; }
    if (Array.isArray(v)) daten[k] = k === "makler" ? v.filter((x) => x.id === mid) : v.filter((x) => x && x.maklerId === mid);
    else if (typeof v === "object") daten[k] = v[mid] != null ? { [mid]: v[mid] } : {};
  });
  return { schema: "unio-wb/1", quelle: "UNIO", erstellt: new Date().toISOString(), makler: mid || "alle", daten };
}
function hmZeroOneImport(paket) {
  if (!paket || !/^unio-(wb|human)\/1$/.test(paket.schema) || !paket.daten) throw new Error("Unbekanntes Format. Erwartet schema unio-wb/1.");
  let n = 0;
  Object.entries(paket.daten).forEach(([k, v]) => {
    if (!HM_ZO_SAMMLUNGEN.includes(k)) return;
    const alt = hmStore.get(k);
    if (Array.isArray(v)) { const ids = new Set(v.map((x) => x && x.id)); hmStore.put(k, [...(Array.isArray(alt) ? alt.filter((x) => !ids.has(x && x.id)) : []), ...v]); n += v.length; }
    else { hmStore.put(k, { ...(alt || {}), ...v }); n += Object.keys(v).length; }
  });
  return n;
}
function ZeroOneBruecke() {
  const makler = useHm("makler") || [];
  const [mid, setMid] = React.useState("");
  const laden = () => { const p = hmZeroOneExport(mid || null); hmLaden(new Blob([JSON.stringify(p, null, 2)], { type: "application/json" }), `unio-wb-${mid || "alle"}-${HM_HEUTE}.json`); toast("Export geladen"); };
  const importieren = async (f) => { try { const n = hmZeroOneImport(JSON.parse(await f.text())); toast(`${n} Einträge übernommen`); } catch (e) { toast(e.message); } };
  return <div className="hm-stack" style={{ marginTop: 20 }}>
    <p className="hm-sub" style={{ margin: 0 }}>Gleicher Datenvertrag wie im Betrieb: Zero-One (marlin) oder ein eigenes Backend lesen und schreiben dieses Format, im Betrieb per Webhook.</p>
    <div className="hm-gruppe">
      <div className="hm-reihe"><div className="m"><div className="t">Exportieren</div><div className="u">Alle Sammlungen oder ein Makler, als JSON</div></div><div className="r"><select className="hm-sel" value={mid} onChange={(e) => setMid(e.target.value)}><option value="">Alle Makler</option>{makler.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select><button className="hm-klein-btn" onClick={laden}>Laden</button></div></div>
      <label className="hm-reihe klick"><div className="m"><div className="t">Importieren</div><div className="u">JSON im Format unio-wb/1, gleiche IDs werden ersetzt</div></div><div className="r"><Ico n="hoch" /></div><input type="file" accept=".json" hidden onChange={(e) => { const f = e.target.files[0]; e.target.value = ""; if (f) importieren(f); }} /></label>
    </div>
  </div>;
}

/* ---------- Selbsttest: alle Prüfungen der Werkzeuge an einem Ort ---------- */
function hmSelbsttestBetrieb() {
  const out = []; const t = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: e.message }); } };
  t("Lead-Radar bewertet und führt zusammen", () => { const r = hmRadarLesen(HM_RADAR_BEISPIEL); return { ok: r.liste.length === 6 && r.doppelt === 1 && r.liste[0].punkte >= r.liste[5].punkte, detail: `${r.liste.length} Kontakte, bester ${r.liste[0].name} ${r.liste[0].punkte}` }; });
  t("Zero-One Export und Import", () => { const p = hmZeroOneExport("markus"); const n = Object.keys(p.daten).length; return { ok: p.schema === "unio-wb/1" && n > 5, detail: `${n} Sammlungen` }; });
  t("Import-Mapper", () => { const z = hmCsv("Vorname;Nachname;E-Mail\nAnna;Gruber;a@b.at\nAnna;Gruber;A@B.at"); const r = hmPruefen(z, "kontakte", hmZuordnen(z[0]).map); return { ok: r.gut.length === 1 && r.dubletten === 1, detail: `${r.gut.length} übernommen, ${r.dubletten} Dublette` }; });
  t("Termin-Planer ohne Wochenende und Feiertag", () => { const s = hmSlots({ anzahl: 40 }); const schlecht = s.filter((x) => { const d = new Date(x.iso); return d.getDay() === 0 || d.getDay() === 6 || (window.hmIstWerktag && !hmIstWerktag(x.iso.slice(0, 10))); }); return { ok: s.length > 10 && !schlecht.length, detail: `${s.length} Slots` }; });
  t("Nachfass-Takt", () => { const n = hmNachfass({ name: "Test Person", ort: "1190 Döbling", stufe: "research" }); return { ok: !!n && n.runde === 0, detail: n ? n.name : "" }; });
  t("Leitfaden", () => { const a = (hmStore.get("fragebogen") || {}).markus; const l = a ? hmLeitfaden(a.antworten, { name: "Markus" }) : []; return { ok: l.length >= 5, detail: `${l.length} Punkte` }; });
  t("Plan bis live", () => { const m = (hmStore.get("makler") || [])[0]; const p = hmPlan(m); return { ok: p.length === 11, detail: `${p.filter((x) => x.fertig).length} von 11 erledigt` }; });
  t("Impressum-Prüfung", () => { const p = hmImpressumCheck({ firma: "Test e.U.", adresse: "x", mail: "a@b.at", tel: "1", gisa: "12345678", behoerde: "Magistrat Wien", kammer: "WKO", haftpflicht: "ja" }); return { ok: p.every((x) => x.ok), detail: `${p.length} Punkte` }; });
  t("Kontrast", () => { const k = hmKontrastInfo("#1F3A5F"); return { ok: k.aufPapier > 9, detail: hmZahl(k.aufPapier) + " zu 1" }; });
  t("Reel-Signatur erkennt geänderten Schnitt", () => { const a = [{ clip: "c1", von: 0.5, dauer: 2, text: "Hallo" }]; const b = [{ clip: "c1", von: 0.5, dauer: 2.4, text: "Hallo" }]; return { ok: hmReelSig(a) !== hmReelSig(b) && hmReelSig(a) === hmReelSig(JSON.parse(JSON.stringify(a))), detail: hmReelSig(a) }; });
  t("Reel-Encoder verfügbar", () => ({ ok: !!window.VideoEncoder && !!window.AudioEncoder, detail: window.VideoEncoder ? "WebCodecs vorhanden" : "WebCodecs fehlt" }));
  t("Sechs Markenwelten", () => ({ ok: (window.HM_MARKENWELTEN || []).length === 6 && HM_MARKENWELTEN.every((w) => HM_WEB_SCHRIFTEN[w.schrift] && w.websiteLook >= 1 && w.websiteLook <= 6), detail: (window.HM_MARKENWELTEN || []).map((w) => w.id).join(", ") }));
  t("Markenwelt-Vorschlag", () => { const b = hmBrand("markus"); const a = ((hmStore.get("fragebogen") || {}).markus || {}).antworten || {}; const v = hmWeltVorschlag(b, a, b.aid); return { ok: !!(v && v.id), detail: v ? `${v.id}: ${(v.begruendung || [])[0] || ""}` : "" }; });
  t("Glossar", () => ({ ok: hmGlossar("Die Lieds für Mobilien", []) === "Die Leads für Immobilien", detail: hmGlossar("Die Lieds für Mobilien", []) }));
  return out;
}
function Selbsttest() {
  const [lauf, setLauf] = React.useState(null);
  const los = () => {
    const gruppen = [["Betrieb", hmSelbsttestBetrieb], ["Produktion", window.hmSelbsttestProduktion], ["Shop", window.hmSelbsttestShop], ["Plattform", window.hmSelbsttestPlattform], ["Markenwelten", window.hmSelbsttestWelten], ["Bildwelt", window.hmSelbsttestBildwelt], ["Website", window.hmSelbsttestWeb]].filter(([, f]) => typeof f === "function");
    setLauf(gruppen.map(([name, f]) => { try { return [name, f()]; } catch (e) { return [name, [{ name: "Aufruf", ok: false, detail: e.message }]]; } }));
  };
  React.useEffect(los, []);
  if (!lauf) return null;
  const alle = lauf.flatMap(([, l]) => l); const ok = alle.filter((x) => x.ok).length;
  return <div className="hm-stack" style={{ marginTop: 20 }}>
    <div className="hm-rechnung"><div><b>{ok}</b><span>bestanden</span></div><div><b className={alle.length - ok ? "hm-sh-rot" : ""}>{alle.length - ok}</b><span>offen</span></div><div><b>{lauf.length}</b><span>Bereiche</span></div></div>
    <div className="hm-row"><button className="hm-link" onClick={los}>Erneut prüfen</button></div>
    {lauf.map(([name, l]) => <div key={name}><div className="hm-sek">{name} · {l.filter((x) => x.ok).length} von {l.length}</div><div className="hm-pruefliste">{l.map((x, i) => <div key={i} className={x.ok ? "ok" : "nein"}><Ico n={x.ok ? "haken" : "x"} />{x.name}{x.detail ? <span className="hm-daten" style={{ marginLeft: 8 }}>{String(x.detail).slice(0, 90)}</span> : null}</div>)}</div></div>)}
  </div>;
}

Object.assign(window, { HM_RADAR_BEISPIEL, hmRadarBewerten, hmRadarLesen, LeadRadar, HM_ZO_SAMMLUNGEN, hmZeroOneExport, hmZeroOneImport, ZeroOneBruecke, hmSelbsttestBetrieb, Selbsttest });
