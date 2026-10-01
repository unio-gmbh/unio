/* Werkbank. Bewegte Marke (Brandmark-Analyse, Funktion F4).
   Drei ruhige Bewegungen, alle 1,6 Sekunden, ohne Effekt: Zeichnen (Kontur der Pfade, dann Füllung), Aufdecken (Maske von links),
   Akzent zuletzt (Wortmarke steht, Akzent setzt nach 400 ms). Schleife oder einmalig. prefers-reduced-motion zeigt das Endbild.
   Export als animiertes SVG (CSS im SVG) und als WebM über canvas.captureStream und MediaRecorder, im Reel-Outro 1080 x 1920.
   Zeichnen braucht die Schrift als Pfade (hmLkSvgPfade), die beiden anderen laufen auch mit Text. */

const HM_LB_ARTEN = [["zeichnen", "Zeichnen"], ["aufdecken", "Aufdecken"], ["akzent", "Akzent zuletzt"]];
const HM_LB_DAUER = 1600;

function hmLbStil() {
  if (typeof document === "undefined" || document.getElementById("stil-logo-bewegt")) return;
  const s = document.createElement("style"); s.id = "stil-logo-bewegt";
  s.textContent = `
.hm-lb { display: grid; gap: 18px; }
.hm-lb-kopf { display: flex; flex-wrap: wrap; gap: 10px 18px; align-items: center; }
.hm-lb-buehne { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(150px, 0.5fr); gap: 18px; align-items: stretch; }
.hm-lb-papier { border-radius: 18px; background: #F5F1EA; box-shadow: inset 0 0 0 1px var(--hairline-dark); display: grid; place-items: center; padding: 32px; min-height: 220px; }
.hm-lb-papier.dunkel { background: #141210; }
.hm-lb-papier svg { width: min(100%, 520px); height: auto; max-height: 160px; display: block; }
.hm-lb-outro { border-radius: 18px; background: #141210; box-shadow: inset 0 0 0 1px var(--hairline-dark); aspect-ratio: 9 / 16; display: grid; place-items: center; padding: 16px; position: relative; overflow: hidden; }
.hm-lb-outro svg { width: 80%; height: auto; max-height: 40%; }
.hm-lb-outro span { position: absolute; left: 0; right: 0; bottom: 10px; text-align: center; font-size: 11px; color: rgba(247,245,241,.6); }
.hm-lb-zeile { display: flex; flex-wrap: wrap; gap: 10px 16px; align-items: center; font-size: 14px; color: var(--ink-2); }
.hm-lb-schalter { display: inline-flex; gap: 8px; align-items: center; font-size: 14px; color: var(--ink); cursor: pointer; }
.hm-lb-schalter input { width: 16px; height: 16px; accent-color: var(--ink); }
.hm-lb-leise { font-size: 13px; color: var(--text-muted); margin: 0; }
@media (max-width: 760px) { .hm-lb-buehne { grid-template-columns: minmax(0, 1fr); } .hm-lb-outro { max-width: 200px; } }`;
  document.head.appendChild(s);
}

/* Ein Pfad- oder Textelement bekommt die Klassen der Bewegung, Akzentteile werden an ihrer Farbe erkannt */
function hmLbMarkieren(svg, akz) {
  const istAkz = (tag) => new RegExp(`(fill|stroke)="${akz}"`, "i").test(tag);
  let pfade = 0;
  const inner = svg.replace(/<(path|rect|circle|text)\b([^>]*?)(\/?)>/g, (m, tag, attrs, schluss) => {
    if (/class="lb-/.test(attrs)) return m;
    const akzent = istAkz(m) ? " lb-akz" : "";
    if (tag === "text") return `<${tag}${attrs} class="lb-t${akzent}"${schluss}>`;
    const fillNone = /fill="none"/.test(attrs);
    const fill = (attrs.match(/fill="([^"]+)"/) || [])[1];
    pfade++;
    if (fillNone) return `<${tag}${attrs} pathLength="1" class="lb-l${akzent}"${schluss}>`;
    return `<${tag}${attrs} pathLength="1" stroke="${fill}" class="lb-p${akzent}"${schluss}>`;
  });
  return { svg: inner, pfade };
}
function hmLbCss(art, schleife, hatText) {
  const it = schleife ? "infinite" : "1";
  const D = `${HM_LB_DAUER}ms`;
  /* Alle Bewegungen teilen eine Dauer, damit die Schleife für alle Teile gleich lang ist. Prozente auf 1600 ms:
     25 Prozent sind 400 ms, 56 Prozent sind 900 ms, 75 Prozent sind 1200 ms */
  const gemeinsam = `@media (prefers-reduced-motion: reduce) { .lb-p, .lb-l, .lb-t, .lb-akz, .lb-clip rect { animation: none !important; } .lb-p { fill-opacity: 1; stroke-opacity: 0; } .lb-l { stroke-dashoffset: 0; } .lb-akz, .lb-t { opacity: 1; } .lb-clip rect { transform: none; } }`;
  if (art === "zeichnen") return `
@keyframes lb-zeichnen { 0% { stroke-dashoffset: 1; fill-opacity: 0; stroke-opacity: 1; } 56% { stroke-dashoffset: 0; fill-opacity: 0; stroke-opacity: 1; } 75% { fill-opacity: 1; stroke-opacity: 0; } 100% { stroke-dashoffset: 0; fill-opacity: 1; stroke-opacity: 0; } }
@keyframes lb-linie { 0% { stroke-dashoffset: 1; } 56% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 0; } }
@keyframes lb-text { 0% { opacity: 0; } 40% { opacity: 0; } 75% { opacity: 1; } 100% { opacity: 1; } }
.lb-p { stroke-width: 0.9; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 1; fill-opacity: 0; animation: lb-zeichnen ${D} ease-out ${it} forwards; }
.lb-l { stroke-dasharray: 1; stroke-dashoffset: 1; animation: lb-linie ${D} ease-out ${it} forwards; }
.lb-t { opacity: 0; animation: lb-text ${D} ease-out ${it} forwards; }
.lb-p.lb-akz, .lb-l.lb-akz { animation-delay: 400ms; }
${gemeinsam}`;
  if (art === "aufdecken") return `
@keyframes lb-wipe { 0% { transform: scaleX(0); } 56% { transform: scaleX(1); } 100% { transform: scaleX(1); } }
.lb-clip rect { transform-box: view-box; transform-origin: left center; transform: scaleX(0); animation: lb-wipe ${D} cubic-bezier(.4, 0, .2, 1) ${it} forwards; }
${gemeinsam}`;
  return `
@keyframes lb-akzent { 0% { opacity: 0; } 25% { opacity: 0; } 56% { opacity: 1; } 100% { opacity: 1; } }
.lb-akz { opacity: 0; animation: lb-akzent ${D} ease-out ${it} forwards; }
${gemeinsam}`;
}
/* Aus dem SVG eines Entwurfs wird ein animiertes SVG. Liefert { svg, pfade, hatText } */
function hmLbAnimieren(svgRoh, art, F, schleife) {
  const svg = String(svgRoh || "");
  const kopf = (svg.match(/^<svg[^>]*>/) || [""])[0];
  const fuss = "</svg>";
  let innen = svg.slice(kopf.length).replace(/<\/svg>\s*$/, "");
  const hatText = /<text\b/.test(innen);
  const mark = hmLbMarkieren(innen, F.AKZ);
  innen = mark.svg;
  const box = (kopf.match(/viewBox="([^"]+)"/) || [, "0 0 100 100"])[1].trim().split(/\s+/).map(Number);
  if (art === "aufdecken") {
    const id = "lbClip" + Math.abs(hmLbHash(svg)).toString(36);
    innen = `<defs><clipPath id="${id}" class="lb-clip"><rect x="${box[0] - 2}" y="${box[1] - 2}" width="${box[2] + 4}" height="${box[3] + 4}"/></clipPath></defs><g clip-path="url(#${id})">${innen}</g>`;
  }
  const stil = `<style>${hmLbCss(art, schleife, hatText)}</style>`;
  return { svg: kopf + stil + innen + fuss, pfade: mark.pfade, hatText };
}
function hmLbHash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h | 0; }
function hmLbSpeichern(blob, name) {
  if (window.hmLaden) return hmLaden(blob, name);
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
/* WebM: das animierte SVG wird als Bild geladen und über 1,8 s in eine 1080 x 1920 Leinwand gezeichnet */
async function hmLbWebm(svgAnim, F, name) {
  if (typeof MediaRecorder === "undefined" || !HTMLCanvasElement.prototype.captureStream) throw new Error("Dieser Browser kann kein WebM aufzeichnen.");
  const img = new Image();
  const url = URL.createObjectURL(new Blob([svgAnim], { type: "image/svg+xml" }));
  await new Promise((ok, nein) => { img.onload = ok; img.onerror = () => nein(new Error("SVG konnte nicht geladen werden")); img.src = url; });
  const c = document.createElement("canvas"); c.width = 1080; c.height = 1920; const g = c.getContext("2d");
  const box = (String(svgAnim).match(/viewBox="([^"]+)"/) || [, "0 0 100 40"])[1].trim().split(/\s+/).map(Number);
  const w = 1080 * 0.72, h = w * (box[3] / box[2]);
  const stream = c.captureStream(30); const rec = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : "video/webm" });
  const teile = []; rec.ondataavailable = (e) => { if (e.data && e.data.size) teile.push(e.data); };
  const fertig = new Promise((ok) => { rec.onstop = ok; });
  rec.start(100);
  const t0 = performance.now();
  await new Promise((ok) => { const tick = () => { g.fillStyle = F.GRUND; g.fillRect(0, 0, 1080, 1920); g.drawImage(img, (1080 - w) / 2, (1920 - h) / 2, w, h); if (performance.now() - t0 < HM_LB_DAUER + 300) requestAnimationFrame(tick); else ok(); }; requestAnimationFrame(tick); });
  rec.stop(); await fertig; URL.revokeObjectURL(url);
  hmLbSpeichern(new Blob(teile, { type: "video/webm" }), name);
}

function LogoBewegt({ spec, b }) {
  hmLbStil();
  const [art, setArt] = React.useState("zeichnen");
  const [schleife, setSchleife] = React.useState(false);
  const [dunkel, setDunkel] = React.useState(false);
  const [roh, setRoh] = React.useState(null);
  const [tick, setTick] = React.useState(0);
  const [meldung, setMeldung] = React.useState("");
  const F = hmLkFassung(b, dunkel ? "negativ" : "hell");
  /* Beide Fassungen laden: Papier für die Bühne, Nacht für das Reel-Outro */
  React.useEffect(() => {
    let weg = false; setRoh(null);
    (async () => {
      const lade = async (f) => { try { return { svg: await hmLkSvgPfade(spec, b, { fassung: f }), pfade: true }; } catch (e) { return { svg: hmLkSvgText(spec, b, { fassung: f }), pfade: false }; } };
      const [hell, nacht] = await Promise.all([lade("hell"), lade("negativ")]);
      if (!weg) setRoh({ hell, nacht });
    })();
    return () => { weg = true; };
  }, [spec && spec.id, b.akzent]);
  const akt = roh ? (dunkel ? roh.nacht : roh.hell) : null;
  const anim = React.useMemo(() => (akt ? hmLbAnimieren(akt.svg, art, F, schleife) : null), [akt, art, schleife, F.AKZ]);
  const FN = hmLkFassung(b, "negativ");
  const animOutro = React.useMemo(() => (roh ? hmLbAnimieren(roh.nacht.svg, art, FN, schleife) : null), [roh, art, schleife, FN.AKZ]);
  const name = `${hmDateiname(b.vor + "-" + b.nach)}-logo-${art}`;
  const svgLaden = () => anim && hmLbSpeichern(new Blob([anim.svg], { type: "image/svg+xml" }), name + ".svg");
  const webm = async () => { if (!anim) return; setMeldung("WebM wird aufgezeichnet, etwa zwei Sekunden."); try { await hmLbWebm(hmLbAnimieren(roh.nacht.svg, art, FN, false).svg, FN, name + ".webm"); setMeldung("WebM gespeichert."); } catch (e) { setMeldung(e.message); } };
  return <div className="hm-lb">
    <div className="hm-lb-kopf">
      <div className="hm-chips" role="group" aria-label="Bewegung">{HM_LB_ARTEN.map(([id, n]) => <button key={id} type="button" className={"hm-chip" + (art === id ? " on" : "")} aria-pressed={art === id} onClick={() => { setArt(id); setTick((x) => x + 1); }}>{n}</button>)}</div>
      <label className="hm-lb-schalter"><input type="checkbox" checked={schleife} onChange={(e) => { setSchleife(e.target.checked); setTick((x) => x + 1); }} />Schleife</label>
      <label className="hm-lb-schalter"><input type="checkbox" checked={dunkel} onChange={(e) => setDunkel(e.target.checked)} />Auf Nacht</label>
      <button type="button" className="hm-link" onClick={() => setTick((x) => x + 1)}>Neu abspielen</button>
    </div>
    <div className="hm-lb-buehne">
      <div className={"hm-lb-papier" + (dunkel ? " dunkel" : "")}>{anim ? <div key={tick + art + (schleife ? "s" : "")} dangerouslySetInnerHTML={{ __html: anim.svg }} /> : <span className="hm-lb-leise">Schrift wird geladen.</span>}</div>
      <div className="hm-lb-outro">{animOutro && <div key={"o" + tick + art} dangerouslySetInnerHTML={{ __html: animOutro.svg }} />}<span>Reel-Outro, 1080 x 1920</span></div>
    </div>
    {anim && art === "zeichnen" && !akt.pfade && <p className="hm-lb-leise">Zeichnen braucht die Schrift als Pfade. Die Schriftdatei ließ sich gerade nicht laden, der Text blendet stattdessen ein.</p>}
    <div className="hm-lb-zeile">
      <span>1,6 Sekunden, kein Effekt. Mit eingeschränkter Bewegung im System steht sofort das Endbild.</span>
      <button type="button" className="hm-link" onClick={svgLaden} disabled={!anim}>Animiertes SVG laden</button>
      <button type="button" className="hm-link" onClick={webm} disabled={!anim}>WebM für Reels laden</button>
      {meldung && <span className="hm-lb-leise">{meldung}</span>}
    </div>
  </div>;
}

function hmSelbsttestLogoBewegt() {
  const out = []; const t = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: e.message }); } };
  const b = hmBrand("markus"); const spec = b.logoKonzept || hmLkKonzepte("markus", {})[0]; const F = hmLkFassung(b, "hell");
  const roh = hmLkSvgText(spec, b, { fassung: "hell" });
  const A = HM_LB_ARTEN.map(([id]) => hmLbAnimieren(roh, id, F, false));
  t("Drei Bewegungen, drei verschiedene Ergebnisse", () => ({ ok: new Set(A.map((x) => x.svg)).size === 3 && A.every((x) => /<style>/.test(x.svg) && /^<svg/.test(x.svg) && /<\/svg>$/.test(x.svg)) }));
  t("Jedes Pfadelement bekommt pathLength 1", () => { const a = A[0]; const n = (a.svg.match(/pathLength="1"/g) || []).length; return { ok: n === a.pfade && n >= 1, detail: `${n} Elemente` }; });
  t("Endbild bei eingeschränkter Bewegung", () => ({ ok: A.every((x) => /prefers-reduced-motion: reduce/.test(x.svg)) }));
  t("Endzustand bleibt stehen (fill-mode forwards)", () => ({ ok: A.every((x) => /forwards/.test(x.svg)) }));
  t("Schleife setzt infinite, einmalig nicht", () => { const s = hmLbAnimieren(roh, "zeichnen", F, true).svg; return { ok: /infinite/.test(s) && !/infinite/.test(A[0].svg) }; });
  t("Aufdecken maskiert über clipPath", () => ({ ok: /<clipPath id="lbClip/.test(A[1].svg) && /clip-path="url\(#lbClip/.test(A[1].svg) }));
  t("Akzentteile an der Farbe erkannt", () => { const n = (A[2].svg.match(/lb-akz/g) || []).length; return { ok: spec.akzent === false || n >= 1, detail: `${n} Akzentteile, Akzent ${F.AKZ}` }; });
  t("Dauer 1,6 Sekunden überall", () => ({ ok: A.every((x) => (x.svg.match(/1600ms/g) || []).length >= 1) && HM_LB_DAUER === 1600 }));
  t("Sichtbare Texte ohne Ausrufezeichen und Gedankenstriche", () => { const s = String(LogoBewegt) + HM_LB_ARTEN.map((x) => x[1]).join(" "); return { ok: !/[!\u2013\u2014]/.test(s.replace(/!==|!\w|!\(|!\[/g, "")) }; });
  return out;
}

Object.assign(window, { HM_LB_ARTEN, HM_LB_DAUER, hmLbAnimieren, hmLbCss, hmLbWebm, LogoBewegt, hmLbStil, hmSelbsttestLogoBewegt });
