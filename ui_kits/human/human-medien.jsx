/* UNIO HUMAN. Mediathek (Rohmaterial-Datenbank) und Auto-Schnitt-Player.
   Idee: Alles vom Drehtag landet hier, bekommt Tags und Transkript. Der Schnitt entsteht aus dem
   Skript des Beitrags: gesprochene Sätze auf Talking-Head-Clips, dazwischen Bildwechsel, am Ende die Endkarte. */

const hmVideoSrc = (src) => (src.startsWith("blob:") || src.startsWith("../") || src.startsWith("/") ? src : "../../assets/video/" + src);
const HM_SITZUNG_CLIPS = [];

/* Standbilder aus Videos: ein Video-Element je Datei, Zeitpunkte nacheinander, Ergebnis zwischengespeichert */
const hmFrameCache = {};
const hmFrameVideos = {};
function hmFrame(src, t) {
  const key = src + "@" + t;
  if (hmFrameCache[key]) return hmFrameCache[key];
  let q = hmFrameVideos[src];
  if (!q) {
    const v = document.createElement("video"); v.muted = true; v.preload = "auto"; v.playsInline = true;
    const bereit = new Promise((res) => { v.onloadeddata = () => res(true); v.onerror = () => res(false); setTimeout(() => res(false), 25000); });
    v.src = src;
    q = hmFrameVideos[src] = { v, kette: bereit };
  }
  hmFrameCache[key] = q.kette = q.kette.then((ok) => ok === false ? false : new Promise((res) => {
    const v = q.v; let fertig = false;
    const ende = (x) => { if (!fertig) { fertig = true; v.onseeked = null; res(x); } };
    v.onseeked = () => { try { const c = document.createElement("canvas"); const k = 260 / Math.max(v.videoWidth, v.videoHeight); c.width = v.videoWidth * k; c.height = v.videoHeight * k; c.getContext("2d").drawImage(v, 0, 0, c.width, c.height); ende(c.toDataURL("image/jpeg", .75)); } catch { ende(null); } };
    setTimeout(() => ende(null), 8000);
    try { v.currentTime = Math.min(t, (v.duration || t + 1) - 0.1); } catch { ende(null); }
  })).then((x) => x, () => null);
  return hmFrameCache[key].then((x) => (typeof x === "string" ? x : null));
}
function VideoBild({ src, t, poster }) {
  const [u, setU] = React.useState(null);
  React.useEffect(() => { let an = true; hmFrame(src, t).then((x) => an && setU(x)); return () => { an = false; }; }, [src, t]);
  return u ? <img src={u} alt="" /> : poster ? <img src={poster} alt="" /> : <div className="hm-lade"></div>;
}   // hochgeladene Dateien leben nur in dieser Sitzung (Object-URLs)

function useClips(mid) {
  const gespeichert = useHm("clips") || [];
  const [, tick] = React.useState(0);
  React.useEffect(() => { const f = () => tick((x) => x + 1); window.addEventListener("hm-clips", f); return () => window.removeEventListener("hm-clips", f); }, []);
  return [...gespeichert, ...HM_SITZUNG_CLIPS].filter((c) => !mid || c.maklerId === "alle" || c.maklerId === mid);
}

function Mediathek({ m, teamSicht }) {
  const clips = useClips(m ? m.id : null);
  const content = useHm("content") || [];
  const [filter, setFilter] = React.useState("Alle");
  const [detail, setDetail] = React.useState(null);
  const tags = ["Alle", "Video", "Foto", "Gesicht", "Objekt", "Außen", "Innen", "Hochformat", "Ungenutzt"];
  const genutzt = (id) => content.filter((c) => (c.clips || []).includes(id) || (c.schnitt || []).some((s) => s.clip === id)).length;
  const liste = clips.filter((c) => filter === "Alle" || (filter === "Video" && c.typ === "video") || (filter === "Foto" && c.typ === "foto") || (filter === "Ungenutzt" && !genutzt(c.id)) || (c.tags || []).includes(filter));
  const upload = async (files) => {
    for (const f of [...files]) {
      const url = URL.createObjectURL(f);
      const video = f.type.startsWith("video/");
      let dauer = 0, hoch = false;
      if (video) await new Promise((res) => { const v = document.createElement("video"); v.preload = "metadata"; v.onloadedmetadata = () => { dauer = v.duration; hoch = v.videoHeight > v.videoWidth; res(); }; v.onerror = res; v.src = url; });
      else await new Promise((res) => { const i = new Image(); i.onload = () => { hoch = i.height > i.width; res(); }; i.onerror = res; i.src = url; });
      HM_SITZUNG_CLIPS.push({ id: "u" + Date.now() + Math.random().toString(36).slice(2, 5), typ: video ? "video" : "foto", src: url, von: 0, bis: dauer || 5, titel: f.name, tags: ["Neu", hoch ? "Hochformat" : "Querformat", "Wird analysiert"], transkript: "", quelle: "Hochgeladen, nur in dieser Sitzung", maklerId: m ? m.id : "alle", sitzung: true });
    }
    window.dispatchEvent(new Event("hm-clips"));
    toast(`${files.length} Dateien in der Mediathek`);
    setTimeout(() => { HM_SITZUNG_CLIPS.forEach((c) => { if (c.tags.includes("Wird analysiert")) c.tags = c.tags.filter((t) => t !== "Wird analysiert").concat(["Analysiert"]); }); window.dispatchEvent(new Event("hm-clips")); }, 1800);
  };
  return <div>
    <Kopf ueber={m ? `Material · ${m.name}` : "Mediathek · alle Makler"} titel="Alles Material an einem Ort." text="Vom Drehtag, vom Handy, vom Objekt. Der Schnitt greift automatisch darauf zu." rechts={<span className="hm-mono">{clips.length} Dateien · {clips.filter((c) => c.typ === "video").reduce((n, c) => n + (c.bis - c.von), 0).toFixed(0)} s Video</span>} />
    <label className="hm-drop" style={{ marginTop: 22 }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); upload(e.dataTransfer.files); }}><input type="file" accept="video/*,image/*" multiple hidden onChange={(e) => upload(e.target.files)} /><span>Videos und Fotos hierher ziehen. Vom Handy direkt nach dem Dreh, in voller Qualität.</span></label>
    <div className="hm-chips" style={{ marginTop: 16 }}>{tags.map((t) => <button key={t} className={"hm-chip" + (filter === t ? " on" : "")} onClick={() => setFilter(t)}>{t}</button>)}</div>
    <div className="hm-medien">{liste.map((c) => <button key={c.id} className="hm-medium" onClick={() => setDetail(c)}>
      <div className="bild">{c.typ === "video" ? <VideoBild src={hmVideoSrc(c.src)} t={c.von + 0.5} poster={c.poster} /> : <img src={c.src} alt="" />}{c.typ === "video" && <span className="dauer">{(c.bis - c.von).toFixed(0)} s</span>}</div>
      <div className="t">{c.titel}</div>
      <div className="tags">{(c.tags || []).slice(0, 3).map((t) => <span key={t}>{t}</span>)}{genutzt(c.id) ? <span className="gen">{genutzt(c.id)}× genutzt</span> : null}</div>
    </button>)}</div>
    <Sheet offen={!!detail} zu={() => setDetail(null)} titel={detail ? detail.titel : ""} unter={detail ? detail.quelle : ""}>
      {detail && <div className="hm-stack">
        {detail.typ === "video" ? <ClipVideo c={detail} /> : <img src={detail.src} alt="" style={{ width: "100%", borderRadius: 14 }} />}
        <div className="hm-chips">{(detail.tags || []).map((t) => <span key={t} className="hm-tag">{t}</span>)}</div>
        {detail.transkript && <div className="hm-note">Transkript: {detail.transkript}</div>}
        <div className="hm-mono">Genutzt in</div>
        <div className="hm-list">{content.filter((c) => (c.clips || []).includes(detail.id) || (c.schnitt || []).some((s) => s.clip === detail.id)).map((c) => <Zeile key={c.id} titel={c.titel} rechts={<ZPunkt z={c.zustand} />} />)}{!genutzt(detail.id) && <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Noch nirgends. Wird im nächsten passenden Schnitt vorgeschlagen.</div>}</div>
      </div>}
    </Sheet>
  </div>;
}

function ClipVideo({ c }) {
  const ref = React.useRef(null);
  React.useEffect(() => { const v = ref.current; if (!v) return; const start = () => { v.currentTime = c.von; v.play().catch(() => {}); }; const t = () => { if (v.currentTime >= c.bis) v.currentTime = c.von; }; v.addEventListener("loadedmetadata", start); v.addEventListener("timeupdate", t); return () => { v.removeEventListener("loadedmetadata", start); v.removeEventListener("timeupdate", t); }; }, [c.id]);
  return <video ref={ref} src={hmVideoSrc(c.src)} muted playsInline controls style={{ width: "100%", maxHeight: 460, borderRadius: 14, background: "#000" }} />;
}

/* Player für einen Schnitt: Segmente nacheinander, Untertitel aus dem Skript, 9:16 */
function SchnittPlayer({ segs, clips, b, onChange, kompakt }) {
  const [i, setI] = React.useState(0);
  const [laeuft, setLaeuft] = React.useState(false);
  const [ton, setTon] = React.useState(false);
  const vref = React.useRef(null);
  const s = segs[i];
  const clip = s && clips.find((c) => c.id === s.clip);
  React.useEffect(() => { if (!laeuft || !s) return; const t = setTimeout(() => { if (i + 1 < segs.length) setI(i + 1); else { setLaeuft(false); setI(0); } }, s.dauer * 1000); return () => clearTimeout(t); }, [laeuft, i, segs]);
  React.useEffect(() => { const v = vref.current; if (!v || !s) return; const los = () => { try { v.currentTime = s.von; } catch {} if (laeuft) v.play().catch(() => {}); }; if (v.readyState >= 1) los(); else v.onloadedmetadata = los; }, [i, laeuft, s && s.clip]);
  const gesamt = segs.reduce((n, x) => n + x.dauer, 0);
  const bis = segs.slice(0, i).reduce((n, x) => n + x.dauer, 0);
  const move = (j, d) => { const n = [...segs]; const k = j + d; if (k < 0 || k >= n.length) return; [n[j], n[k]] = [n[k], n[j]]; onChange && onChange(n); };
  const weg = (j) => { const n = segs.filter((_, x) => x !== j); onChange && onChange(n); setI(0); };
  const farbe = { Hook: "var(--signal)", Aussage: "var(--ink)", Bildwechsel: "#5E7A8E", Endkarte: b ? b.akzent : "#B87400" };
  return <div className={"hm-schnitt" + (kompakt ? " kompakt" : "")}>
    <div className="hm-916">
      {s && s.clip === "ende" ? <div className="ende" style={{ background: b ? b.akzent : "var(--ink)" }}>{b && <BrandLogo b={b} h={30} invert />}<div style={{ marginTop: 14, fontSize: 15 }}>{b ? b.claim : ""}</div><div className="hm-mono" style={{ color: "rgba(255,255,255,.8)", marginTop: 18 }}>Link in Bio</div></div>
        : clip && clip.typ === "video" ? <video key={clip.id} ref={vref} src={hmVideoSrc(clip.src)} muted={!ton} playsInline preload="auto" />
        : clip ? <img key={clip.id + i} src={clip.src} alt="" className={laeuft ? "kb" : ""} /> : <div className="ende" style={{ background: "#222" }}>Kein Material</div>}
      {s && s.text && <div className="ut"><span>{s.text}</span></div>}
      <div className="hm-916-kopf"><span>{s ? s.rolle : ""}</span><span>{(bis).toFixed(1)} / {gesamt.toFixed(1)} s</span></div>
    </div>
    <div className="hm-row" style={{ gap: 8, marginTop: 10 }}>
      <Btn onClick={() => setLaeuft(!laeuft)} knob={laeuft ? "❚❚" : "▶"}>{laeuft ? "Pause" : "Abspielen"}</Btn>
      <button className="hm-chip" onClick={() => { setI(0); setLaeuft(true); }}>Von vorn</button>
      <button className="hm-chip" onClick={() => setTon(!ton)}>{ton ? "Ton an" : "Ton aus"}</button>
    </div>
    {!kompakt && <div className="hm-timeline">{segs.map((x, j) => <div key={j} className={"seg" + (j === i ? " on" : "")} style={{ flex: x.dauer, borderColor: farbe[x.rolle] }} onClick={() => { setI(j); }}>
      <div className="r" style={{ color: farbe[x.rolle] }}>{x.rolle}</div>
      <div className="c">{x.clip === "ende" ? "Endkarte" : ((clips.find((c) => c.id === x.clip) || {}).titel || x.clip)}</div>
      {x.text && <div className="tx">{x.text}</div>}
      {onChange && <div className="ctl"><button onClick={(e) => { e.stopPropagation(); move(j, -1); }} aria-label="Nach vorne"><Ico n="zurueck" g={12} /></button><button onClick={(e) => { e.stopPropagation(); move(j, 1); }} aria-label="Nach hinten"><Ico n="weiter" g={12} /></button><button onClick={(e) => { e.stopPropagation(); weg(j); }}>×</button></div>}
    </div>)}</div>}
  </div>;
}

Object.assign(window, { VideoBild, hmFrame, Mediathek, ClipVideo, SchnittPlayer, useClips, hmVideoSrc, HM_SITZUNG_CLIPS });
