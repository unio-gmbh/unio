/* Werkbank. Werkzeuge Stufe 3 (Strategie): Leitfaden für den Workshop, Mitschrift, Plan bis live.
   Leitfaden und Plan sind Regeln ohne Tokens. Die Mitschrift läuft mit Whisper im Browser (transformers.js). */

/* ---------- Leitfaden: aus den Antworten die Fragen, die im Gespräch zählen ---------- */
function hmLeitfaden(a, m) {
  const out = [];
  const add = (art, thema, frage, grund) => out.push({ art, thema, frage, grund });
  const sie = (a.anrede || "").startsWith("Sie");
  const kan = a.kanaele || [];
  const maxKan = { "Bis 2 Stunden": 1, "2 bis 4 Stunden": 2, "4 bis 8 Stunden": 3 }[a.zeit] || 4;
  if (kan.length > maxKan) add("klaeren", "Kanäle", `Welche ${maxKan === 1 ? "eine Plattform" : maxKan + " Kanäle"} zuerst: ${kan.slice(0, maxKan).map((k) => ({ linkedin: "LinkedIn", instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", youtube: "YouTube" })[k] || k).join(" und ")}?`, `${a.zeit} im Monat tragen ${maxKan} ${maxKan === 1 ? "Kanal" : "Kanäle"}, genannt sind ${kan.length}.`);
  if ((a.kamera || 3) <= 3 && (a.formate || []).some((f) => ["talking", "qa"].includes(f))) add("klaeren", "Kamera", "Wie fühlt sich ein Skript mit Teleprompter an, und wer ist beim Dreh dabei?", `Kamera-Komfort ${a.kamera || 3} von 5, gewählt sind Talking Head oder Frage und Antwort.`);
  if (a.sichtbar === "Lange nicht") add("klaeren", "Kamera", "Probedreh von fünf Minuten am Ende des Workshops?", "Letzter Auftritt vor Publikum ist lange her.");
  if ((a.erfolge || 3) <= 2) add("vertiefen", "Beweise", "Welche zwei Kunden würden in zwei Sätzen über die Zusammenarbeit sprechen?", `Über eigene Erfolge sprechen: ${a.erfolge} von 5. Kompetenz besser zeigen lassen als behaupten.`);
  if ((a.hindernis || []).includes("Provision")) add("vertiefen", "Wie ich arbeite", "Die Provision in einem Satz: was kostet es, was bekommt der Kunde?", "Die Provision hätte Kunden fast abgehalten. Das wird der Kern der Säule Wie ich arbeite.");
  if ((a.s5 || 50) >= 65 && (a.tabus || []).includes("Politik")) add("klaeren", "Grenzen", "Meinung zum Markt ja, Politik nein: wo genau liegt die Linie, etwa bei Mietrecht oder Widmung?", "Meinungsstark eingeschätzt, Politik ist tabu.");
  if (["6 bis 8", "9 bis 10"].includes(a.graetzl_anteil)) add("bestaetigen", "Grätzl", `${a.graetzl ? a.graetzl.split(",")[0] : "Das Grätzl"} als festes Format, einmal im Monat?`, `${a.graetzl_anteil} der letzten zehn Abschlüsse lagen dort.`);
  if (sie && kan.some((k) => ["instagram", "tiktok"].includes(k))) add("klaeren", "Anrede", "Sie auch auf Instagram, konsequent in allen Texten?", "Sie überall gewählt, Instagram ist geplant, dort ist das Du üblich.");
  if (a.worte && a.ideal) add("vertiefen", "Positionierung", `Was muss passieren, damit aus "${a.worte}" in einem Jahr "${a.ideal}" wird?`, "Selbstbild heute und Ziel in zwölf Monaten.");
  if (!a.fremdbild) add("klaeren", "Fremdbild", "Drei Menschen, die kurz sagen, wofür sie dich empfehlen würden.", "Das Fremdbild fehlt. Es korrigiert den blinden Fleck.");
  const geschichte = [["aufgewachsen", "Herkunft"], ["wendepunkt", "Wendepunkt"], ["abgeraten", "Abgeraten"], ["belege", "Belege"], ["fehler", "Fehler"], ["kundensatz", "Kundenstimme"]].filter(([k]) => !a[k]).map((x) => x[1]);
  if (geschichte.length) add("vertiefen", "Geschichte", `Im Gespräch erfragen: ${geschichte.join(", ")}.`, "Aus diesen Antworten entsteht die Brand Story.");
  if (a.ziel) add("bestaetigen", "Ziel", `Ziel in zwölf Monaten: ${a.ziel}. Woran messen wir es im Quartals-Review?`, "Ein Ziel ohne Messgröße lässt sich nicht prüfen.");
  if ((a.seite == null ? 50 : a.seite) <= 35) add("bestaetigen", "Zielgruppe", "Eigentümer zuerst: Inhalte für Verkäufer, nicht für Käufer?", "Auf dem Regler klar bei den Eigentümern.");
  return out;
}
const HM_LF_ART = { klaeren: "Klären", vertiefen: "Vertiefen", bestaetigen: "Bestätigen" };

function Leitfaden({ m }) {
  const fb = (useHm("fragebogen") || {})[m.id];
  if (!fb || !fb.antworten || !Object.keys(fb.antworten).length) return <Leer titel="Noch keine Antworten." text="Der Leitfaden entsteht, sobald der Fragebogen beantwortet ist." />;
  const L = hmLeitfaden(fb.antworten, m);
  const drucken = () => hmDrucken(`Leitfaden ${m.name}`, `<h1>Workshop ${m.name}</h1>${Object.keys(HM_LF_ART).map((k) => { const l = L.filter((x) => x.art === k); return l.length ? `<h2>${HM_LF_ART[k]}</h2>${l.map((x) => `<p><b>${x.thema}.</b> ${x.frage}<br><small>${x.grund}</small></p>`).join("")}` : ""; }).join("")}`, "body{font:14px/1.5 'Hanken Grotesk',system-ui;max-width:640px;margin:40px auto;padding:0 24px}h1{font:400 28px 'Fraunces',serif}h2{font-size:15px;margin-top:26px}small{color:#666}");
  return <div className="hm-stack">
    <div className="hm-row" style={{ justifyContent: "space-between" }}><span className="hm-daten">{L.length} Punkte aus {Object.keys(fb.antworten).length} Antworten</span><button className="hm-link" onClick={drucken}>Drucken</button></div>
    {Object.keys(HM_LF_ART).map((k) => { const l = L.filter((x) => x.art === k); return l.length ? <div key={k}><div className="hm-sek" style={{ marginTop: 8 }}>{HM_LF_ART[k]} · {l.length}</div><div className="hm-gruppe">{l.map((x, i) => <div key={i} className="hm-reihe"><div className="m"><div className="t" style={{ whiteSpace: "normal" }}>{x.frage}</div><div className="u" style={{ whiteSpace: "normal" }}>{x.thema} · {x.grund}</div></div></div>)}</div></div> : null; })}
  </div>;
}

/* ---------- Mitschrift: Whisper im Browser ---------- */
const HM_TF = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2/dist/transformers.min.js";
/* Dynamischer Import an Babel vorbei (Babel würde import() in require() umschreiben) */
const hmImport = new Function("u", "return import(u)");
/* Whisper läuft in einem Worker, damit die Oberfläche während der Mitschrift bedienbar bleibt. */
let hmAsrWorker = null, hmAsrN = 0;
const hmAsrWarte = {};
function hmTranskribieren(modell, daten, opt, fortschritt) {
  if (!hmAsrWorker) {
    const src = `import { pipeline, env } from "${HM_TF}";
env.allowLocalModels = false;
const P = {};
self.onmessage = async (e) => {
  const { id, modell, daten, opt } = e.data;
  try {
    if (!P[modell]) P[modell] = pipeline("automatic-speech-recognition", "onnx-community/whisper-" + modell, { dtype: "q8", device: "wasm", progress_callback: (p) => { if (p.status === "progress" && p.file && p.file.endsWith(".onnx")) self.postMessage({ id, p: Math.round(p.progress || 0) }); } });
    const asr = await P[modell];
    self.postMessage({ id, laeuft: true });
    self.postMessage({ id, r: await asr(daten, opt) });
  } catch (err) { P[modell] = null; self.postMessage({ id, fehler: String((err && err.message) || err) }); }
};`;
    hmAsrWorker = new Worker(URL.createObjectURL(new Blob([src], { type: "text/javascript" })), { type: "module" });
    hmAsrWorker.onmessage = (e) => { const w = hmAsrWarte[e.data.id]; if (!w) return; if (e.data.p != null) w.f && w.f({ p: e.data.p }); else if (e.data.laeuft) w.f && w.f({ laeuft: true }); else { delete hmAsrWarte[e.data.id]; e.data.fehler ? w.nein(new Error(e.data.fehler)) : w.ja(e.data.r); } };
  }
  const id = ++hmAsrN;
  return new Promise((ja, nein) => { hmAsrWarte[id] = { ja, nein, f: fortschritt }; hmAsrWorker.postMessage({ id, modell, daten, opt }, [daten.buffer]); });
}
/* Glossar: typische Hörfehler bei Immobilien- und UNIO-Begriffen, Namen aus Team und Makler, fremde Schriftzeichen raus */
const HM_GLOSSAR = { "Lieds": "Leads", "Lied": "Lead", "Lids": "Leads", "Mobilien": "Immobilien", "Reals": "Reels", "Rils": "Reels", "Linked In": "LinkedIn", "Insta": "Instagram", "Unio": "UNIO", "unio": "UNIO", "Jakob": "Jacob", "Grundbuchs": "Grundbuchs", "Zinshäuser": "Zinshäuser", "Personal-Brand": "Personal Brand", "Magler": "Makler", "Maklerin": "Maklerin", "Mobilier": "Immobilien", "Mobilie": "Immobilie", "Expose": "Exposé" };
function hmGlossar(text, namen) {
  let t = text.replace(/[^\p{Script=Latin}\p{N}\p{P}\p{Zs}€%§]/gu, "").replace(/\s{2,}/g, " ");
  Object.entries(HM_GLOSSAR).forEach(([a, z]) => { t = t.replace(new RegExp(`\\b${a}\\b`, "g"), z); });
  const lev = (a, b) => { const d = Array.from({ length: a.length + 1 }, (_, i) => [i]); for (let j = 1; j <= b.length; j++) d[0][j] = j; for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[a.length][b.length]; };
  (namen || []).filter((n) => n.length >= 5).forEach((n) => { t = t.replace(/\b[A-ZÄÖÜ][a-zäöüß]{3,}\b/g, (w) => (w !== n && Math.abs(w.length - n.length) <= 1 && lev(w.toLowerCase(), n.toLowerCase()) === 1 ? n : w)); });
  return t.trim();
}
async function hmAudio16k(file) {
  const buf = await file.arrayBuffer();
  const ctx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 16000, 16000);
  const roh = await ctx.decodeAudioData(buf);
  const len = Math.ceil(roh.duration * 16000);
  const off = new OfflineAudioContext(1, len, 16000);
  const src = off.createBufferSource(); src.buffer = roh; src.connect(off.destination); src.start();
  const r = await off.startRendering();
  return { daten: r.getChannelData(0), dauer: roh.duration };
}
/* Aufgaben und Zitate aus dem Text, ohne Tokens */
function hmAuswerten(saetze) {
  const aufgabe = /\b(bis|machen wir|mache ich|schicke|schickst|kümmere|übernehme|bereite|klären|nächste woche|montag|dienstag|mittwoch|donnerstag|freitag)\b/i;
  const zitat = /\b(kunden|immer|nie|ich bin|mir ist wichtig|ehrlich|vertrauen|unterschied)\b/i;
  return {
    aufgaben: saetze.filter((s) => aufgabe.test(s.text)).slice(0, 8).map((s) => s.text),
    zitate: saetze.filter((s) => zitat.test(s.text) && s.text.split(" ").length >= 6 && s.text.split(" ").length <= 30).slice(0, 5).map((s) => s.text),
  };
}
const hmZeitcode = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

function Mitschrift({ m, zu }) {
  const [stand, setStand] = React.useState(null);
  const [erg, setErg] = React.useState(null);
  const [titel, setTitel] = React.useState("Strategie-Workshop");
  const [modell, setModell] = React.useState("small");
  const namen = [...new Set([...HM_TEAM.flatMap((t) => t.name.split(" ")), ...m.name.split(" "), "Jacob", "Wenzel"])];
  const los = async (dateien) => {
    const f = dateien[0]; if (!f) return;
    try {
      setStand({ t: "Ton wird gelesen" });
      const { daten, dauer } = await hmAudio16k(f);
      setStand({ t: "Modell wird geladen", p: 0 });
      const r = await hmTranskribieren(modell, daten, { language: "german", task: "transcribe", chunk_length_s: 30, stride_length_s: 5, return_timestamps: true }, (x) => setStand(x.laeuft ? { t: `Wird mitgeschrieben, ${hmZeitcode(dauer)} Minuten Ton` } : { t: "Modell wird geladen", p: x.p }));
      const saetze = (r.chunks || [{ text: r.text, timestamp: [0, dauer] }]).map((c) => ({ von: (c.timestamp && c.timestamp[0]) || 0, text: hmGlossar(c.text, namen) })).filter((s) => s.text);
      setErg({ saetze, dauer, datei: f.name, ...hmAuswerten(saetze) });
      setStand(null);
    } catch (e) { console.warn("Mitschrift:", e); setStand({ t: "Das hat nicht geklappt. Andere Datei versuchen.", fehler: true }); }
  };
  const speichern = () => {
    hmStore.patch("meetings", (l) => [{ id: "mt" + Date.now(), maklerId: m.id, titel, datum: `${HM_HEUTE}T10:00`, dauer: Math.max(1, Math.round(erg.dauer / 60)), teilnehmer: ["Daniel Hayden", m.name], zusammenfassung: erg.zitate.slice(0, 2).join(" ") || erg.saetze.slice(0, 2).map((s) => s.text).join(" "), aufgaben: erg.aufgaben, transkript: erg.saetze.map((s) => `${hmZeitcode(s.von)}  ${s.text}`).join("\n"), zitate: erg.zitate }, ...(l || [])]);
    hmEvent(m.id, "meeting", `${titel} mitgeschrieben`, "Daniel");
    toast("Gespräch gespeichert"); zu();
  };
  if (!erg) return <div className="hm-stack">
    {stand ? <div className="hm-zs-lauf"><div className="hm-zs-balken"><i style={{ width: `${stand.p != null ? stand.p : 60}%` }}></i></div><span className="hm-daten">{stand.p != null ? stand.p + " %" : ""}</span><span className={stand.fehler ? "hm-hinweis" : ""}>{stand.t}</span></div>
      : <Dateiablage onDateien={los} accept="audio/*,video/*,.m4a,.mp3,.wav" text="Aufnahme hierher ziehen oder wählen" />}
    {!stand && <div className="hm-seg klein" style={{ alignSelf: "flex-start" }}>{[["small", "Genau"], ["base", "Schnell"]].map(([v, t]) => <button key={v} className={modell === v ? "on" : ""} onClick={() => setModell(v)}>{t}</button>)}</div>}
    <div className="hm-daten">Audio oder Video. Die Mitschrift läuft auf diesem Rechner, die Aufnahme verlässt ihn nicht. Genau braucht etwa die halbe Länge der Aufnahme, beim ersten Mal lädt das Modell.</div>
  </div>;
  return <div className="hm-stack">
    <label className="hm-feld"><span>Titel</span><input value={titel} onChange={(e) => setTitel(e.target.value)} /></label>
    {erg.aufgaben.length > 0 && <div><div className="hm-abschnitt-t">Aufgaben · {erg.aufgaben.length}</div><div className="hm-gruppe" style={{ marginTop: 6 }}>{erg.aufgaben.map((t, i) => <div key={i} className="hm-reihe"><div className="m"><div className="t" style={{ whiteSpace: "normal" }}>{t}</div></div></div>)}</div></div>}
    {erg.zitate.length > 0 && <div><div className="hm-abschnitt-t">Zitate für die Brand Story · {erg.zitate.length}</div><div className="hm-gruppe" style={{ marginTop: 6 }}>{erg.zitate.map((t, i) => <div key={i} className="hm-reihe"><div className="m"><div className="t" style={{ whiteSpace: "normal" }}>{t}</div></div></div>)}</div></div>}
    <div><div className="hm-abschnitt-t">Mitschrift · {hmZeitcode(erg.dauer)}</div><div className="hm-transkript" style={{ marginTop: 6, maxHeight: 280, overflow: "auto" }}>{erg.saetze.map((s, i) => <div key={i}><span className="hm-daten">{hmZeitcode(s.von)}</span>  {s.text}</div>)}</div></div>
    <div className="hm-row" style={{ justifyContent: "space-between" }}><button className="hm-link" onClick={() => setErg(null)}>Andere Aufnahme</button><Btn onClick={speichern}>Speichern</Btn></div>
  </div>;
}

/* ---------- Plan bis live: 30 Tage rückwärts, Stand aus den echten Daten ---------- */
const HM_PLAN = [["vertrag", "Vertrag", 0], ["fragebogen", "Fragebogen", 3], ["workshop", "Workshop", 7], ["strategie", "Strategie steht", 10], ["konten", "Konten verbunden", 12], ["branding", "Branding freigegeben", 14], ["portrait", "Porträt", 14], ["dreh", "Erster Drehtag", 18], ["website", "Website live", 21], ["freigabe", "Erster Beitrag abgestimmt", 24], ["live", "Live", 30]];
function hmPlan(m) {
  const e = (hmStore.get("einrichtung") || {})[m.id] || {};
  const fb = (hmStore.get("fragebogen") || {})[m.id];
  const st = (hmStore.get("strategien") || {})[m.id];
  const br = (hmStore.get("branding") || {})[m.id] || {};
  const P = (hmStore.get("portraits") || {})[m.id];
  const web = (hmStore.get("website") || {})[m.id] || {};
  const c = (hmStore.get("content") || []).filter((x) => x.maklerId === m.id);
  const dreh = (hmStore.get("drehtage") || []).filter((d) => d.slots.some((s) => s.maklerId === m.id));
  const erledigt = {
    vertrag: e.vertrag === "fertig", fragebogen: !!(fb && fb.fertig), workshop: e.strategie === "fertig", strategie: !!(st && st.gewaehlt), konten: e.konten === "fertig",
    branding: br.status === "freigegeben", portrait: !!(P && P.aktiv), dreh: dreh.some((d) => d.status === "fertig") || c.some((x) => ["schnitt", "freigabe", "freigegeben", "geplant", "online"].includes(x.zustand)),
    website: web.status === "live", freigabe: c.some((x) => ["freigegeben", "geplant", "online"].includes(x.zustand)), live: c.some((x) => x.zustand === "online"),
  };
  const start = new Date(HM_HEUTE + "T12:00"); start.setDate(start.getDate() - (m.tag || 0));
  return HM_PLAN.map(([id, name, tag]) => { const d = new Date(start); d.setDate(d.getDate() + tag); const iso = hmIsoLokal(d); return { id, name, tag, iso, fertig: erledigt[id], spaet: !erledigt[id] && iso < HM_HEUTE }; });
}
function PlanBisLive({ m, kurz }) {
  useHm("einrichtung"); useHm("content"); useHm("portraits"); useHm("website"); useHm("branding");
  const plan = hmPlan(m);
  const offen = plan.filter((p) => !p.fertig);
  const live = plan[plan.length - 1];
  if (kurz) return offen.length && !live.fertig ? <div className="hm-plan-kurz"><div className="hm-plan-balken">{plan.map((p) => <i key={p.id} className={p.fertig ? "ok" : p.spaet ? "spaet" : ""} title={p.name}></i>)}</div><span>{live.fertig ? "Live" : `Live am ${hmFmtDate(live.iso)}`} · als Nächstes {offen[0].name}{offen[0].spaet ? ", überfällig" : `, bis ${hmFmtDate(offen[0].iso)}`}</span></div> : null;
  return <div className="hm-gruppe">{plan.map((p) => <div key={p.id} className="hm-reihe"><span className={"hm-plan-punkt" + (p.fertig ? " ok" : p.spaet ? " spaet" : "")}>{p.fertig ? <Ico n="haken" g={12} /> : null}</span><div className="m"><div className="t">{p.name}</div><div className="u">Tag {p.tag} · {hmFmtDate(p.iso)}{p.spaet ? " · überfällig" : ""}</div></div></div>)}</div>;
}

/* ---------- Quartals-Review: Dossier aus Zahlen, Säulen neu gewichten, Strategie als neue Version ---------- */
function hmQuartal(m) {
  const reports = ((hmStore.get("reports") || {})[m.id] || []).slice(-3);
  const st = (hmStore.get("strategien") || {})[m.id];
  const w = st && st.gewaehlt ? st.wege[st.gewaehlt] : null;
  const posts = (hmStore.get("content") || []).filter((c) => c.maklerId === m.id && c.zustand === "online" && c.kz);
  if (!w || !reports.length) return null;
  const wirkung = (c) => c.kz.reach / 1000 + (c.kz.saves || 0) * 0.5 + (c.kz.sends || 0) * 0.5;
  const nach = (key) => { const g = {}; posts.forEach((c) => { const k = c[key]; (g[k] = g[k] || []).push(c); }); return Object.entries(g).map(([k, l]) => ({ k, n: l.length, reach: Math.round(l.reduce((x, c) => x + c.kz.reach, 0) / l.length), wert: l.reduce((x, c) => x + wirkung(c), 0) / l.length })).sort((a, b) => b.wert - a.wert); };
  const saeulen = nach("saeule"), formate = nach("typ");
  const erst = reports[0], letzt = reports[reports.length - 1];
  const pct = (a, b) => (a ? Math.round(((b - a) / a) * 100) : 0);
  const quote = { ...w.saeulen };
  const beste = saeulen[0] && saeulen[0].k, schwach = [...saeulen].reverse().find((x) => x.k !== beste && x.k !== "wissen");
  const neu = { ...quote };
  if (beste && quote[beste] != null) neu[beste] = Math.min(40, quote[beste] + 5);
  if (schwach && quote[schwach.k] != null) neu[schwach.k] = Math.max(10, quote[schwach.k] - 5);
  const summe = Object.values(neu).reduce((x, y) => x + y, 0);
  if (summe !== 100) { const k = Object.keys(neu).find((x) => x !== beste && x !== (schwach && schwach.k) && x !== "wissen"); if (k) neu[k] += 100 - summe; }
  const fehlend = Object.keys(quote).filter((k) => !posts.some((c) => c.saeule === k));
  const zuletzt = (st.versionen || []).slice(-1)[0];
  const diff = zuletzt && hmTage(zuletzt.datum, HM_HEUTE) < 60 ? [] : Object.keys(neu).filter((k) => neu[k] !== quote[k]).map((k) => ({ k, von: quote[k], zu: neu[k] }));
  const punkte = [
    reports.length > 1 ? `Reichweite ${pct(erst.reach, letzt.reach) >= 0 ? "plus" : "minus"} ${Math.abs(pct(erst.reach, letzt.reach))} Prozent seit ${new Date(erst.monat + "-01").toLocaleDateString("de-AT", { month: "long" })}, Teilen ${pct(erst.sends, letzt.sends) >= 0 ? "plus" : "minus"} ${Math.abs(pct(erst.sends, letzt.sends))} Prozent.` : `${letzt.reach.toLocaleString("de-AT")} erreicht im ersten Monat.`,
    formate[0] ? `Stärkstes Format: ${HM_TYPEN[formate[0].k] || formate[0].k}, im Schnitt ${formate[0].reach.toLocaleString("de-AT")} erreicht.` : null,
    beste ? `Stärkste Säule: ${HM_SAEULEN[beste].name}.` : null,
    fehlend.length ? `Ohne Beitrag online: ${fehlend.map((k) => HM_SAEULEN[k].name).join(", ")}.` : null,
    letzt.gesicht != null && letzt.gesicht < 70 ? `Gesicht in ${letzt.gesicht} Prozent der Beiträge, Ziel 70.` : null,
  ].filter(Boolean);
  return { punkte, diff, neu, version: (st.versionen || []).length + 1, versionen: st.versionen || [] };
}
function QuartalsReview({ m, teamSicht }) {
  useHm("strategien"); useHm("reports"); useHm("content");
  const q = hmQuartal(m);
  if (!q) return null;
  const uebernehmen = () => {
    hmStore.patch("strategien", (a) => { const st = a[m.id]; const wege = { ...st.wege, [st.gewaehlt]: { ...st.wege[st.gewaehlt], saeulen: q.neu } }; return { ...a, [m.id]: { ...st, wege, versionen: [...(st.versionen || []), { v: q.version + 1, datum: HM_HEUTE, diff: q.diff }] } }; });
    hmEvent(m.id, "strategie", `Strategie Version ${q.version + 1}: ${q.diff.map((d) => `${HM_SAEULEN[d.k].name} ${d.von} auf ${d.zu} Prozent`).join(", ")}`, "Daniel");
    toast(`Strategie Version ${q.version + 1} gilt ab den nächsten Ideen`);
  };
  const letzte = q.versionen[q.versionen.length - 1];
  return <><div className="hm-sek">Quartal</div>
    <div className="hm-gruppe">{q.punkte.map((t) => <div key={t} className="hm-reihe"><div className="m"><div className="t" style={{ whiteSpace: "normal" }}>{t}</div></div></div>)}
      {q.diff.length > 0 && <div className="hm-reihe"><div className="m"><div className="t">Vorschlag für Version {q.version + 1}</div><div className="u" style={{ whiteSpace: "normal" }}>{q.diff.map((d) => `${HM_SAEULEN[d.k].name} ${d.von} auf ${d.zu} Prozent`).join(", ")}</div></div>{teamSicht && <div className="r"><button className="hm-klein-btn" onClick={uebernehmen}>Übernehmen</button></div>}</div>}
      {letzte && <div className="hm-reihe"><div className="m"><div className="u">Version {letzte.v} seit {hmFmtDate(letzte.datum)}</div></div></div>}
    </div></>;
}

Object.assign(window, { hmQuartal, QuartalsReview, hmGlossar, HM_GLOSSAR, hmLeitfaden, Leitfaden, Mitschrift, hmTranskribieren, hmImport, hmAudio16k, hmAuswerten, hmPlan, PlanBisLive, HM_PLAN });
