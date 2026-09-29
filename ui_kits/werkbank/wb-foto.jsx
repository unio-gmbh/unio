/* Werkbank. Porträts.
   Foto-Engine ist der Makler-Zuschnitt (/maklerzuschnitt). Die Werkbank schickt Fotos per postMessage,
   das Werkzeug erkennt das Gesicht, platziert es nach der Guideline (3:4, Nase 40 bis 60 %, 73 %),
   stellt frei und liefert ein PNG in Originalauflösung samt Qualitätswert zurück.
   Ablage: IndexedDB im Prototyp, im Betrieb Objektspeicher (gleiche Schlüssel p:<id> und o:<id>). */

const HM_ZS_SRC = (auto) => (location.pathname.startsWith("/ux/") ? "/maklerzuschnitt?embed=1" : "../../tools/maklerzuschnitt/index.html?embed=1") + (auto ? "&auto=1" : "");
const HM_PORTRAIT_SEED = { markus: { url: "../../assets/team/portrait-06-freigestellt.png", w: 1115, h: 1487, score: 94 } };

const hmBlobs = (() => {
  let dbP = null;
  const db = () => dbP || (dbP = new Promise((res, rej) => { const r = indexedDB.open("unio_hm_blobs", 1); r.onupgradeneeded = () => r.result.createObjectStore("b"); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }));
  const tx = async (mode, fn) => { const d = await db(); return new Promise((res, rej) => { const t = d.transaction("b", mode); const q = fn(t.objectStore("b")); t.oncomplete = () => res(q.result); t.onerror = () => rej(t.error); }); };
  return { put: (k, v) => tx("readwrite", (s) => s.put(v, k)), get: (k) => tx("readonly", (s) => s.get(k)), del: (k) => tx("readwrite", (s) => s.delete(k)) };
})();
const HM_BLOB_URL = {};

/* Aktives Porträt eines Maklers als URL, synchron (für hmBrand) */
function hmPortraitUrl(mid) {
  const P = (hmStore.get("portraits") || {})[mid];
  if (!P || !P.aktiv) return null;
  const e = P.liste.find((x) => x.id === P.aktiv);
  if (!e) return null;
  return e.url || HM_BLOB_URL["p:" + e.id] || null;
}
/* Vor dem ersten Rendern: Blobs aller aktiven Porträts in URLs umwandeln, Demo-Seed anlegen */
async function hmPortraitsLaden() {
  const all = hmStore.get("portraits");
  if (!all) {
    const seed = {};
    Object.entries(HM_PORTRAIT_SEED).forEach(([mid, s]) => { seed[mid] = { aktiv: "seed-" + mid, liste: [{ id: "seed-" + mid, name: "Studio, Foto-Termin", url: s.url, w: s.w, h: s.h, score: s.score, quelle: "termin", datum: "2026-09-18T10:00:00" }] }; });
    hmStore.put("portraits", seed);
    return;
  }
  try { await Promise.all(Object.values(all).flatMap((P) => P.liste.filter((e) => !e.url).map(async (e) => { const b = await hmBlobs.get("p:" + e.id); if (b) HM_BLOB_URL["p:" + e.id] = URL.createObjectURL(b); }))); } catch (err) { console.warn("Porträts:", err); }
}

async function hmPortraitSpeichern(mid, erg, quelle, ersetzt) {
  const id = ersetzt || "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  await hmBlobs.put("p:" + id, erg.blob);
  if (erg.original) await hmBlobs.put("o:" + id, erg.original);
  if (HM_BLOB_URL["p:" + id]) URL.revokeObjectURL(HM_BLOB_URL["p:" + id]);
  HM_BLOB_URL["p:" + id] = URL.createObjectURL(erg.blob);
  const eintrag = { id, name: (erg.original && erg.original.name) || erg.name, w: erg.w, h: erg.h, score: erg.meta.score, meta: erg.meta, quelle, datum: new Date().toISOString() };
  hmStore.patch("portraits", (a) => {
    const all = a || {}; const P = all[mid] || { liste: [] };
    const liste = ersetzt ? P.liste.map((x) => (x.id === id ? { ...eintrag, gewaehltVon: x.gewaehltVon } : x)) : [...P.liste, eintrag];
    const beste = [...liste].sort((x, y) => (y.score || 0) - (x.score || 0))[0];
    return { ...all, [mid]: { ...P, liste, aktiv: P.gewaehlt ? P.aktiv : beste.id } };
  });
  return id;
}
function hmPortraitWaehlen(mid, id, wer) {
  hmStore.patch("portraits", (a) => ({ ...a, [mid]: { ...a[mid], aktiv: id, gewaehlt: wer || "makler", auswahlOffen: false } }));
}
function hmPortraitLoeschen(mid, id) {
  hmBlobs.del("p:" + id).catch(() => {}); hmBlobs.del("o:" + id).catch(() => {});
  hmStore.patch("portraits", (a) => { const P = a[mid]; const liste = P.liste.filter((x) => x.id !== id); const beste = [...liste].sort((x, y) => (y.score || 0) - (x.score || 0))[0]; return { ...a, [mid]: { ...P, liste, aktiv: P.aktiv === id ? (beste && beste.id) || null : P.aktiv, gewaehlt: P.aktiv === id ? null : P.gewaehlt } }; });
}
const hmScoreText = (s) => (s >= 85 ? "Sehr gut" : s >= 70 ? "Gut" : s >= 50 ? "Brauchbar" : "Nicht geeignet");

/* Zuschnitt-Fenster: das Werkzeug im Frame. Sichtbar zum Nachjustieren, oder unsichtbar im Stapel (auto). */
function Zuschnitt({ dateien, auto, zu, ergebnis, fertig, titel }) {
  const ref = React.useRef(null);
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    const f = (e) => {
      if (e.origin !== location.origin || !ref.current || e.source !== ref.current.contentWindow) return;
      const d = e.data || {};
      if (d.typ === "zs:bereit") ref.current.contentWindow.postMessage({ typ: "zs:bilder", dateien }, location.origin);
      if (d.typ === "zs:ergebnis") { setN((x) => x + 1); ergebnis(d); }
      if (d.typ === "zs:fertig") fertig && fertig();
    };
    window.addEventListener("message", f);
    return () => window.removeEventListener("message", f);
  }, []);
  const frame = <iframe ref={ref} src={HM_ZS_SRC(auto)} title="Zuschnitt" className={auto ? "hm-zs-stapel" : "hm-zs-frame"} />;
  if (auto) return <div className="hm-zs-lauf"><div className="hm-zs-balken"><i style={{ width: `${Math.round((n / dateien.length) * 100)}%` }}></i></div><span className="hm-daten">{n} von {dateien.length}</span><span>Gesicht erkennen, freistellen, zuschneiden</span>{frame}</div>;
  return <Sheet offen voll titel={titel || "Zuschnitt"} unter="Automatisch nach der Guideline. Ziehen, um zu korrigieren." zu={zu}>{frame}</Sheet>;
}

function Dateiablage({ onDateien, text, klein, accept = "image/*" }) {
  const [ueber, setUeber] = React.useState(false);
  const passt = (f) => accept.split(",").some((t) => { t = t.trim(); return t.endsWith("/*") ? f.type.startsWith(t.slice(0, -1)) : t.startsWith(".") ? f.name.toLowerCase().endsWith(t) : f.type === t; });
  return <label className={"hm-drop" + (klein ? " klein" : "") + (ueber ? " ueber" : "")} onDragOver={(e) => { e.preventDefault(); setUeber(true); }} onDragLeave={() => setUeber(false)} onDrop={(e) => { e.preventDefault(); setUeber(false); const l = [...e.dataTransfer.files].filter(passt); if (l.length) onDateien(l); }}>
    <input type="file" accept={accept} multiple hidden onChange={(e) => { const l = [...e.target.files]; e.target.value = ""; if (l.length) onDateien(l); }} />
    <span className="hm-row" style={{ gap: 10, justifyContent: "center" }}><Ico n="hoch" />{text}</span>
  </label>;
}

/* Porträt-Verwaltung für Makler und Team. Ein Ort für Hochladen, Auswahl und Nachbearbeitung. */
function Portraits({ m, teamSicht, kompakt }) {
  const P = (useHm("portraits") || {})[m.id] || { liste: [] };
  const [job, setJob] = React.useState(null);
  const [voll, setVoll] = React.useState(null);
  const aktiv = P.liste.find((x) => x.id === P.aktiv);
  const hochladen = (dateien) => setJob({ dateien, auto: dateien.length > 1 || teamSicht, quelle: teamSicht ? "termin" : "upload" });
  const nachbearbeiten = async (e) => { const o = await hmBlobs.get("o:" + e.id).catch(() => null); if (!o) { toast("Original nicht mehr vorhanden, bitte neu hochladen"); return; } setJob({ dateien: [o], auto: false, quelle: e.quelle, ersetzt: e.id }); };
  const sortiert = [...P.liste].sort((x, y) => (y.score || 0) - (x.score || 0));
  return <div className="hm-stack">
    {aktiv && <div className="hm-portrait-kopf">
      <button className="hm-portrait-bild gross" onClick={() => setVoll(aktiv)}><img src={aktiv.url || HM_BLOB_URL["p:" + aktiv.id]} alt="Aktives Porträt" /></button>
      <div className="hm-stack" style={{ gap: 6, minWidth: 0 }}>
        <div className="hm-h hm-h3">{teamSicht ? "Aktives Porträt" : "Dein Porträt"}</div>
        <div className="hm-sub" style={{ margin: 0 }}>Website, Visitenkarte, Shop und Profilbild nutzen dieses Bild.</div>
        <div className="hm-daten">{aktiv.w} × {aktiv.h} px · PNG, freigestellt · {hmScoreText(aktiv.score)}</div>
        {aktiv.meta && aktiv.meta.hinweise && aktiv.meta.hinweise.length > 0 && <div className="hm-hinweis">{aktiv.meta.hinweise.join(", ")}. Ein neues Foto verbessert Website und Visitenkarte.</div>}
        <div className="hm-row" style={{ gap: 14, marginTop: 4 }}><a className="hm-link" href={aktiv.url || HM_BLOB_URL["p:" + aktiv.id]} download={`${hmDateiname(m.name)}-portrait.png`}>Herunterladen</a>{!aktiv.url && <button className="hm-link" onClick={() => nachbearbeiten(aktiv)}>Nachjustieren</button>}</div>
      </div>
    </div>}
    {!kompakt && sortiert.length > 1 && <div>
      <div className="hm-abschnitt-t">{P.gewaehlt ? "Weitere Aufnahmen" : "Automatisch gewählt: die beste Aufnahme"}</div>
      <div className="hm-portraits">{sortiert.map((e) => <figure key={e.id} className={e.id === P.aktiv ? "on" : ""}>
        <button className="hm-portrait-bild" onClick={() => hmPortraitWaehlen(m.id, e.id, teamSicht ? "team" : "makler")} aria-label="Als Porträt verwenden"><img src={e.url || HM_BLOB_URL["p:" + e.id]} alt="" />{e.id === P.aktiv && <span className="hm-portrait-haken"><Ico n="haken" /></span>}</button>
        <figcaption><span>{(e.meta && e.meta.hinweise && e.meta.hinweise[0]) || hmScoreText(e.score)}</span>{e.id !== P.aktiv && !e.url && <button className="hm-link" onClick={() => hmPortraitLoeschen(m.id, e.id)}>Entfernen</button>}</figcaption>
      </figure>)}</div>
    </div>}
    {job && job.auto ? <Zuschnitt dateien={job.dateien} auto ergebnis={(d) => hmPortraitSpeichern(m.id, d, job.quelle)} fertig={() => { setJob(null); toast("Porträts zugeschnitten und freigestellt"); hmEvent(m.id, "foto", `${job.dateien.length} Porträts automatisch zugeschnitten`, teamSicht ? "Team" : m.name); }} />
      : <Dateiablage onDateien={hochladen} klein={!!aktiv} text={aktiv ? "Weitere Fotos hinzufügen" : "Fotos hierher ziehen oder wählen"} />}
    {job && !job.auto && <Zuschnitt dateien={job.dateien} titel={job.ersetzt ? "Nachjustieren" : "Zuschnitt"} zu={() => setJob(null)} ergebnis={async (d) => { await hmPortraitSpeichern(m.id, d, job.quelle, job.ersetzt); }} fertig={() => { setJob(null); toast("Porträt übernommen"); }} />}
    {voll && <Sheet offen titel="Porträt" zu={() => setVoll(null)}><div className="hm-schach"><img src={voll.url || HM_BLOB_URL["p:" + voll.id]} alt="" style={{ width: "100%", display: "block" }} /></div></Sheet>}
  </div>;
}

Object.assign(window, { hmBlobs, HM_BLOB_URL, hmPortraitUrl, hmPortraitsLaden, hmPortraitSpeichern, hmPortraitWaehlen, Portraits, Zuschnitt, Dateiablage, hmScoreText });
