/* UNIO HUMAN. Reel-Renderer: aus Schnitt (Segmente aus dem Skript), Material und Marke entsteht eine fertige MP4-Datei.
   Technik: Bild für Bild auf Canvas (1080 × 1920, 30 fps), WebCodecs VideoEncoder (H.264) und AudioEncoder (AAC, sonst Opus),
   verpackt mit mp4-muxer. Deterministisch über gezieltes Spulen, läuft ohne Server und ohne Tokens.
   Strategie fließt ein: Hook als Titel, Serienname der Säule aus der Markenplattform, Handlungsaufruf in der Anrede der Marke,
   Untertitel in der Markenschrift mit Wort-Hervorhebung in der Akzentfarbe, Endkarte mit Logo und Claim. */

const HM_REEL = { b: 1080, h: 1920, fps: 30, vbit: 6e6 };
const hmReelSig = (segs) => (segs || []).map((s) => `${s.clip}:${s.von}:${s.dauer}:${(s.text || "").length}`).join("|");
const hmMuxer = () => hmSkriptLaden("https://cdn.jsdelivr.net/npm/mp4-muxer@5.2.1/build/mp4-muxer.min.js", "Mp4Muxer");

function hmReelTexte(c, b) {
  const p = window.hmMbPlattform ? hmMbPlattform(c.maklerId) : null;
  const w = b.w || {};
  const sie = (w.anrede || "Du") === "Sie";
  const s = p && (p.saeulen || []).find((x) => x.id === c.saeule || (window.HM_SAEULEN && HM_SAEULEN[c.saeule] && x.name === HM_SAEULEN[c.saeule].name));
  return {
    serie: s && s.serie ? s.serie.name : (window.HM_SAEULEN && HM_SAEULEN[c.saeule] ? HM_SAEULEN[c.saeule].name : ""),
    claim: (p && p.botschaften && p.botschaften.claim) || b.claim || "",
    cta: sie ? "Schreiben Sie mir." : "Schreib mir.",
    name: b.makler.name,
  };
}
function hmReelUmbruch(g, text, max) {
  const woerter = text.split(/\s+/).filter(Boolean); const zeilen = []; let z = [];
  woerter.forEach((w) => { const t = [...z, w].join(" "); if (g.measureText(t).width > max && z.length) { zeilen.push(z); z = [w]; } else z.push(w); });
  if (z.length) zeilen.push(z);
  return zeilen;
}
/* Untertitel: zwei Zeilen, das gerade gesprochene Wort in der Akzentfarbe (gleichmäßig über die Segmentdauer verteilt) */
function hmReelUntertitel(g, text, anteil, b, W, H, font) {
  g.font = `600 58px "${font}", system-ui, sans-serif`;
  const zeilen = hmReelUmbruch(g, text, W * 0.8);
  const alle = zeilen.flat(); const jetzt = Math.min(alle.length - 1, Math.floor(anteil * alle.length));
  const lh = 74; let y = H * 0.74 - ((zeilen.length - 1) * lh) / 2; let k = 0;
  zeilen.slice(0, 3).forEach((z) => {
    const breite = g.measureText(z.join(" ")).width; let x = (W - breite) / 2;
    z.forEach((w) => {
      const tw = g.measureText(w + " ").width;
      if (k === jetzt) {
        /* gesprochenes Wort: Fläche in der Akzentfarbe, Schrift hell, lesbar bei jedem Akzent */
        const ww = g.measureText(w).width; g.fillStyle = b.akzent; g.beginPath(); (g.roundRect ? g.roundRect(x - 10, y - 54, ww + 20, 70, 12) : g.rect(x - 10, y - 54, ww + 20, 70)); g.fill();
        g.fillStyle = hmKontrast(b.akzent, "#F7F5F1") >= 3 ? "#F7F5F1" : "#0B0A09"; g.fillText(w, x, y);
      } else { g.lineWidth = 10; g.strokeStyle = "rgba(11,10,9,.55)"; g.lineJoin = "round"; g.strokeText(w, x, y); g.fillStyle = "#F7F5F1"; g.fillText(w, x, y); }
      x += tw; k++;
    });
    y += lh;
  });
}
function hmReelCover(g, quelle, sw, sh, W, H, zoom) {
  const s = Math.max(W / sw, H / sh) * (zoom || 1);
  const dw = sw * s, dh = sh * s;
  g.drawImage(quelle, (W - dw) / 2, (H - dh) / 2, dw, dh);
}
function hmReelEndkarte(g, b, T, W, H, anteil) {
  g.fillStyle = b.akzent; g.fillRect(0, 0, W, H);
  g.fillStyle = "#F7F5F1"; g.textAlign = "center";
  g.font = `400 96px "${b.schrift.d}", Georgia, serif`;
  g.globalAlpha = Math.min(1, anteil * 3);
  g.fillText(b.vor + " " + b.nach, W / 2, H * 0.42);
  g.font = `400 46px "${b.schrift.t}", system-ui, sans-serif`;
  hmReelUmbruch(g, T.claim, W * 0.78).forEach((z, i) => g.fillText(z.join(" "), W / 2, H * 0.5 + i * 60));
  g.font = `500 40px "${b.schrift.t}", system-ui, sans-serif`;
  g.fillText(T.cta, W / 2, H * 0.68);
  g.globalAlpha = 1; g.textAlign = "left";
}
function hmReelWarte(el, ev) { return new Promise((res, rej) => { const ok = () => { el.removeEventListener(ev, ok); res(); }; el.addEventListener(ev, ok); el.addEventListener("error", () => rej(new Error("Datei nicht lesbar")), { once: true }); }); }

async function hmReelRender({ c, segs, clips, b, stand }) {
  if (!window.VideoEncoder) throw new Error("Dieser Browser kann keine Videos erzeugen (WebCodecs fehlt).");
  const M = await hmMuxer();
  const { b: W, h: H, fps } = HM_REEL;
  const T = hmReelTexte(c, b);
  await Promise.all([document.fonts.load(`600 58px "${b.schrift.t}"`), document.fonts.load(`400 96px "${b.schrift.d}"`)]).catch(() => {});
  const cfgV = { codec: "avc1.640028", width: W, height: H, bitrate: HM_REEL.vbit, framerate: fps };
  if (!(await VideoEncoder.isConfigSupported(cfgV)).supported) cfgV.codec = "avc1.4d0028";
  let acodec = "aac"; const cfgA = { codec: "mp4a.40.2", sampleRate: 48000, numberOfChannels: 1, bitrate: 128000 };
  if (!window.AudioEncoder || !(await AudioEncoder.isConfigSupported(cfgA)).supported) { acodec = "opus"; cfgA.codec = "opus"; }
  const mitTon = !!window.AudioEncoder && (await AudioEncoder.isConfigSupported(cfgA)).supported;
  const muxer = new M.Muxer({ target: new M.ArrayBufferTarget(), video: { codec: "avc", width: W, height: H }, ...(mitTon ? { audio: { codec: acodec, sampleRate: 48000, numberOfChannels: 1 } } : {}), fastStart: "in-memory" });
  const venc = new VideoEncoder({ output: (ch, meta) => muxer.addVideoChunk(ch, meta), error: (e) => { throw e; } });
  venc.configure(cfgV);
  const cv = document.createElement("canvas"); cv.width = W; cv.height = H; const g = cv.getContext("2d");
  const gesamt = segs.reduce((n, s) => n + s.dauer, 0);
  const frames = Math.round(gesamt * fps);
  /* Quellen vorbereiten: ein Video-Element je Datei, Bilder geladen */
  const videos = {}, bilder = {};
  for (const s of segs) {
    const k = clips.find((x) => x.id === s.clip); if (!k) continue;
    if (k.typ === "video" && !videos[k.src]) { const v = document.createElement("video"); v.muted = true; v.playsInline = true; v.preload = "auto"; v.crossOrigin = "anonymous"; v.src = hmVideoSrc(k.src); await hmReelWarte(v, "loadeddata"); videos[k.src] = v; }
    if (k.typ === "foto" && !bilder[k.src]) { const im = new Image(); im.crossOrigin = "anonymous"; im.src = k.src; await im.decode().catch(() => {}); bilder[k.src] = im; }
  }
  /* Bild für Bild */
  let f = 0, start = 0;
  for (let si = 0; si < segs.length; si++) {
    const s = segs[si]; const k = clips.find((x) => x.id === s.clip); const n = Math.round(s.dauer * fps);
    for (let j = 0; j < n; j++, f++) {
      const anteil = j / Math.max(1, n - 1);
      g.fillStyle = "#0B0A09"; g.fillRect(0, 0, W, H);
      if (s.clip === "ende" || !k) hmReelEndkarte(g, b, T, W, H, anteil);
      else if (k.typ === "video") { const v = videos[k.src]; const t = s.von + j / fps; if (Math.abs(v.currentTime - t) > 0.0005) { v.currentTime = t; await hmReelWarte(v, "seeked"); } hmReelCover(g, v, v.videoWidth, v.videoHeight, W, H, 1); }
      else { const im = bilder[k.src]; if (im && im.naturalWidth) hmReelCover(g, im, im.naturalWidth, im.naturalHeight, W, H, 1 + 0.08 * anteil); }
      if (s.clip !== "ende") {
        const verlauf = g.createLinearGradient(0, H * 0.55, 0, H); verlauf.addColorStop(0, "rgba(11,10,9,0)"); verlauf.addColorStop(1, "rgba(11,10,9,.45)"); g.fillStyle = verlauf; g.fillRect(0, H * 0.55, W, H * 0.45);
        if (si === 0 && T.serie) { g.font = `500 34px "${b.schrift.t}", system-ui, sans-serif`; const sw = g.measureText(T.serie).width; g.fillStyle = "#0B0A09"; g.fillRect(56, 112, sw + 40, 60); g.fillStyle = "#F7F5F1"; g.fillText(T.serie, 76, 154); g.fillStyle = b.akzent; g.fillRect(56, 172, sw + 40, 6); }
        if (s.text && s.rolle === "Hook") {
          /* Erster Eindruck: Hook groß im oberen Drittel, in der Display-Schrift, auf ruhiger Fläche */
          g.font = `400 88px "${b.schrift.d}", Georgia, serif`; const zeilen = hmReelUmbruch(g, s.text, W * 0.82);
          const hoehe = zeilen.length * 100 + 60; g.fillStyle = "rgba(247,245,241,.92)"; g.fillRect(56, 230, W - 112, hoehe);
          g.fillStyle = "#0B0A09"; zeilen.forEach((z, i) => g.fillText(z.join(" "), 96, 230 + 100 + i * 100));
          g.fillStyle = b.akzent; g.fillRect(56, 230 + hoehe, (W - 112) * anteil, 6);
        } else if (s.text) hmReelUntertitel(g, s.text, anteil, b, W, H, b.schrift.t);
      }
      const frame = new VideoFrame(cv, { timestamp: Math.round((f / fps) * 1e6), duration: Math.round(1e6 / fps) });
      venc.encode(frame, { keyFrame: f % (fps * 2) === 0 }); frame.close();
      if (venc.encodeQueueSize > 8) await new Promise((r) => setTimeout(r, 0));
      if (f % 15 === 0 && stand) stand({ t: "Bilder", p: Math.round((f / frames) * 100) });
    }
    start += s.dauer;
  }
  await venc.flush();
  /* Ton: Originalton der Talking-Head-Stellen, Bildwechsel und Endkarte still */
  if (mitTon) {
    stand && stand({ t: "Ton", p: 100 });
    const sr = 48000; const out = new Float32Array(Math.ceil(gesamt * sr)); const dec = {};
    const ctx = new OfflineAudioContext(1, sr, sr); let pos = 0;
    for (const s of segs) {
      const k = clips.find((x) => x.id === s.clip);
      if (k && k.typ === "video" && s.rolle !== "Bildwechsel") {
        try {
          if (!dec[k.src]) dec[k.src] = await ctx.decodeAudioData(await (await fetch(hmVideoSrc(k.src))).arrayBuffer());
          const ab = dec[k.src]; const ch = ab.getChannelData(0); const f0 = Math.floor(s.von * ab.sampleRate); const len = Math.floor(s.dauer * sr); const r = ab.sampleRate / sr;
          for (let i = 0; i < len; i++) { const v = ch[f0 + Math.floor(i * r)] || 0; const blende = Math.min(1, i / 480, (len - i) / 480); out[Math.floor(pos * sr) + i] = v * blende; }
        } catch (e) { console.warn("Ton:", e); }
      }
      pos += s.dauer;
    }
    const aenc = new AudioEncoder({ output: (ch, meta) => muxer.addAudioChunk(ch, meta), error: (e) => { throw e; } });
    aenc.configure(cfgA);
    const block = 1024;
    for (let i = 0; i < out.length; i += block) { const teil = out.subarray(i, Math.min(out.length, i + block)); aenc.encode(new AudioData({ format: "f32-planar", sampleRate: sr, numberOfFrames: teil.length, numberOfChannels: 1, timestamp: Math.round((i / sr) * 1e6), data: teil })); }
    await aenc.flush();
  }
  muxer.finalize();
  Object.values(videos).forEach((v) => { v.removeAttribute("src"); v.load(); });
  return { blob: new Blob([muxer.target.buffer], { type: "video/mp4" }), dauer: gesamt, frames, codec: cfgV.codec, ton: mitTon ? acodec : "ohne" };
}

/* Knopf und Ergebnis in der Werkstatt */
function ReelExport({ c, b, clips, set }) {
  const [stand, setStand] = React.useState(null);
  const [url, setUrl] = React.useState(null);
  React.useEffect(() => { let weg = false; if (c.render) hmBlobs.get("r:" + c.id).then((bl) => { if (bl && !weg) setUrl(URL.createObjectURL(bl)); }).catch(() => {}); return () => { weg = true; }; }, [c.id, c.render && c.render.datum]);
  if (c.typ !== "reel") return null;
  const los = async () => {
    try {
      setStand({ t: "Vorbereiten", p: 0 });
      const r = await hmReelRender({ c, segs: c.schnitt, clips, b, stand: setStand });
      await hmBlobs.put("r:" + c.id, r.blob);
      setUrl(URL.createObjectURL(r.blob));
      set({ render: { datum: new Date().toISOString(), dauer: r.dauer, groesse: r.blob.size, codec: r.codec, ton: r.ton, segmente: c.schnitt.length, sig: hmReelSig(c.schnitt) } }, "Reel gerendert");
      toast("Reel fertig, MP4 in 1080 × 1920");
    } catch (e) { console.warn(e); toast(e.message || "Rendern fehlgeschlagen"); }
    setStand(null);
  };
  const veraltet = c.render && c.render.sig !== hmReelSig(c.schnitt);
  return <div className="hm-stack" style={{ gap: 10 }}>
    {stand ? <div className="hm-zs-lauf"><div className="hm-zs-balken"><i style={{ width: stand.p + "%" }}></i></div><span className="hm-daten">{stand.p} %</span><span>{stand.t === "Ton" ? "Ton wird gemischt" : "Bilder werden gerendert"}</span></div>
      : <div className="hm-row" style={{ gap: 10, justifyContent: "space-between" }}><span className="hm-daten">{c.render ? `MP4 · ${Math.round(c.render.dauer)} s · ${(c.render.groesse / 1e6).toFixed(1)} MB · Ton ${c.render.ton}` : "Noch nicht gerendert"}</span><span className="hm-row" style={{ gap: 8 }}>{url && <a className="hm-klein-btn hell" style={{ textDecoration: "none" }} href={url} download={`${hmDateiname(c.titel)}.mp4`}>Laden</a>}<button className="hm-klein-btn" disabled={!(c.schnitt && c.schnitt.length)} onClick={los}>{c.render ? (veraltet ? "Neu rendern" : "Nochmal rendern") : "Als MP4 rendern"}</button></span></div>}
    {url && !stand && <video src={url} controls playsInline style={{ width: "100%", maxWidth: 280, aspectRatio: "9/16", borderRadius: 14, background: "#000" }} />}
  </div>;
}

Object.assign(window, { hmReelSig, HM_REEL, hmReelRender, hmReelTexte, ReelExport, hmMuxer });
