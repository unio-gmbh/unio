/* Werkbank. Website-Baukasten: Marke einmal wählen, alle sechs Looks tragen sie.
   Mechanismus (Benchmark docs/werkbank/research/BENCHMARK_WEBSITE_BAUKASTEN.md):
   1. Markendatensatz aus Branding und Markenwelt (hmWebTheme): Akzent, Schriftpaar, Logo, Grundton, nur aus kuratierten Listen.
   2. Jede Vorlage wird als srcdoc gebaut (hmWebHtml): Bilder als eigenes IMG-Objekt, statischer Modus ohne Scroll-Animation,
      dadurch sieht die Vorschau in jedem Rahmen fertig aus.
   3. Theme per CSS-Variablen, sofort und ohne Neuladen (hmWebThemeAnwenden). Inhalte per DOM (hmWebInhalt).
   4. Prüfung nach jedem Aufbau (hmWebPruefen): Namen passen in die Breite, keine Platzhalter, keine leeren Bilder.
   Bilder: eine Bibliothek aus Uploads, Porträts, Bildwelt und UNIO-Archiv. Bildfelder merken sich nur die ID und den Fokuspunkt. */

const HM_WEB_GERAETE = [
  { id: "desktop", name: "Desktop", w: 1280, h: 800, ico: "M2 3.5h12v7.5H2zM6 13.5h4M8 11v2.5" },
  { id: "tablet", name: "Tablet", w: 834, h: 1112, ico: "M3.5 1.5h9v13h-9zM7 12.5h2" },
  { id: "mobil", name: "Mobil", w: 390, h: 844, ico: "M5 1.5h6v13H5zM7.3 12.5h1.4" },
];
const HM_WEB_GRUNDTOENE = [
  { id: "welt", name: "Aus deiner Welt", satz: "Grund, Text und Linien der Markenwelt" },
  { id: "papier", name: "Papier", satz: "Warmes Hell der Vorlage" },
  { id: "nacht", name: "Nacht", satz: "Dunkel, Akzent leuchtet" },
];
const HM_WEB_GF = {
  "Fraunces": "Fraunces:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400",
  "Playfair Display": "Playfair+Display:ital,wght@0,400;0,500;0,600;1,400",
  "DM Serif Display": "DM+Serif+Display:ital@0;1",
  "Space Grotesk": "Space+Grotesk:wght@300;400;500;600",
  "Manrope": "Manrope:wght@300;400;500;600",
  "Hanken Grotesk": "Hanken+Grotesk:wght@300;400;500;600",
  "Newsreader": "Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400",
  "Instrument Sans": "Instrument+Sans:wght@400;500;600",
};
const HM_WEB_LIMITS = { name: 40, region: 60, headline: 70, bio: 420, zitat: 160, stats: 60, referenzen: 220, adresse: 80, instagram: 40 };
const HM_WEB_LANG = ["bio", "zitat", "referenzen"];
/* Bildfelder. keys: welche IMG-Schlüssel der Vorlagen sie füllen */
const HM_WEB_SLOTS = [
  { id: "portrait", name: "Porträt", satz: "Freigestellt, hochkant", format: "3/4", min: 1000, looks: "alle Looks" },
  { id: "titel", name: "Titelbild", satz: "Objekt oder Grätzl, quer", format: "16/10", min: 1600, looks: "Look 2, 3, 4" },
  ...[1, 2, 3, 4, 5, 6].map((i) => ({ id: "life" + i, name: "Stimmung " + i, satz: i === 4 ? "Großes Bild im Social-Raster" : "Social-Raster und Bänder", format: "4/5", min: 900, looks: "Social" })),
];
const HM_WEB_ARCHIV = ["lifestyle-paar.jpg", "terrasse-golden.png", "interieur-esszimmer.jpg", "dachlounge.jpg", "essen-gruen.jpg", "skyline-terrasse.png", "interieur-wurzelholz.jpg", "kueche-schwarz.jpg", "penthouse-glas.png", "schlafzimmer-dach.jpg", "terrasse-tag.png", "villen-abend.jpg", "wohnen-beige.jpg", "fassade-historisch.png", "villen-strasse.jpg", "drohne-wienerwald.jpg"];
const HM_WEB_ARCHIV_IMG = ["vienna-facades.jpg", "vienna-street.jpg", "vienna-garden.jpg", "albrechts-fassade.jpg", "albrechts-hof.jpg", "obenzwei-terrasse.jpg", "obenzwei-dinner.jpg", "lifestyle-wine.jpg", "int-kitchen.jpg", "int-bath.jpg", "schoenbrunn.jpg", "zinshaus-fassaden.jpg"];

/* ---------- Farben ---------- */
function hmWebRgb(h) { const x = String(h || "#000").replace("#", ""); const n = parseInt(x.length === 3 ? x.split("").map((c) => c + c).join("") : x.slice(0, 6), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function hmWebLum(h) { const [r, g, b] = hmWebRgb(h).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; }
function hmWebKontrast(a, b) { const x = hmWebLum(a), y = hmWebLum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
function hmWebMix(a, p, b) { return `color-mix(in srgb, ${a} ${p}%, ${b})`; }
function hmWebMixHex(a, p, b) { const x = hmWebRgb(a), y = hmWebRgb(b); return "#" + x.map((v, i) => Math.round(v * p / 100 + y[i] * (100 - p) / 100).toString(16).padStart(2, "0")).join(""); }

/* ---------- Markendatensatz ---------- */
function hmWebWelt(mid) { try { return window.hmMbWelt ? hmMbWelt(mid, window.hmMbPlattform ? hmMbPlattform(mid) : null) : null; } catch (e) { return null; } }
function hmWebTheme(mid, ov) {
  const b = hmBrand(mid);
  const web = (hmStore.get("website") || {})[mid] || {};
  const t = { akzentId: b.akzentId, schriftId: b.schriftId, logo: b.logo, grundton: web.grundton || "welt", ...(ov || {}) };
  const ak = HM_WEB_AKZENTE.find((x) => x.id === t.akzentId) || HM_WEB_AKZENTE[0];
  const welt = hmWebWelt(mid);
  const f = t.grundton === "welt" && welt && welt.farben ? welt.farben : null;
  const grund = f ? f.grund : t.grundton === "nacht" ? "#0B0A09" : "#EAE7DE";
  const r = { ...t, akzent: ak.hex, akzentName: ak.name, schrift: HM_WEB_SCHRIFTEN[t.schriftId] || HM_WEB_SCHRIFTEN.editorial, welt, farben: f, grund, dunkel: t.grundton === "nacht" || (f ? hmWebLum(f.grund) < 0.25 : false), vor: b.vor, nach: b.nach, initialen: b.initialen };
  /* Logo aus der Werkstatt: als SVG-Text in den Kopf, Farbe folgt der Tinte der Vorlage */
  if (t.logo === "konzept" && b.logoKonzept && window.hmLkSvgText) { r.logoFont = b.logoKonzept.font; r.logoSvg = hmLkSvgText(b.logoKonzept, { ...b, akzent: hmWebAkzentText(r) }, { farbe: "currentColor" }).replace("<svg ", '<svg style="height:1.5em;width:auto;display:block;overflow:visible" '); }
  return r;
}
/* Wie der Akzent auf diesem Grund als Text wirkt: passt er nicht, eine abgedunkelte oder aufgehellte Fassung */
function hmWebAkzentText(t) {
  const a = t.akzent;
  if (hmWebKontrast(a, t.grund) >= 3) return a;
  return t.dunkel ? hmWebMixHex(a, 55, "#FFFFFF") : hmWebMixHex(a, 58, "#141312");
}

function hmWebThemeAnwenden(doc, t) {
  const html = doc && doc.documentElement; if (!html || !doc.head) return;
  const set = (k, v) => html.style.setProperty(k, v);
  ["--bg", "--paper", "--card", "--ink", "--ink-soft", "--line", "--on-solid"].forEach((k) => html.style.removeProperty(k));
  const f = t.farben;
  if (f) {
    const hell = t.dunkel ? "#000000" : "#FFFFFF";
    set("--bg", f.grund); set("--paper", hmWebMix(f.grund, 72, hell)); set("--card", hmWebMix(f.grund, 45, hell));
    set("--ink", f.text); set("--ink-soft", hmWebMix(f.text, 66, f.grund)); set("--line", hmWebMix(f.linie, 45, f.grund)); set("--on-solid", f.grund);
  }
  html.classList.toggle("dark", !!t.dunkel);
  const txt = hmWebAkzentText(t);
  set("--loden", txt); set("--loden-2", hmWebMix(txt, 80, "#000")); set("--clay", hmWebMix(t.akzent, 22, t.grund)); set("--head-tint", hmWebMix(t.akzent, 12, t.grund)); set("--on-loden", hmWebLum(txt) > 0.45 ? "#141312" : "#FFFFFF");
  const s = t.schrift;
  if ((s.d === "Power Grotesk" || s.t === "Power Grotesk") && !doc.getElementById("hm-pg")) {
    const st = doc.createElement("style"); st.id = "hm-pg";
    st.textContent = [["Light", 300], ["Regular", 400], ["Medium", 500], ["Bold", 700]].map(([n, w]) => `@font-face{font-family:"Power Grotesk";font-weight:${w};font-display:swap;src:url(${hmAbs("../../assets/fonts/PowerGrotesk-" + n + ".woff2")}) format("woff2")}`).join("");
    doc.head.appendChild(st);
  }
  [s.d, s.t, t.logoFont].filter((x) => x && HM_WEB_GF[x]).forEach((fam) => {
    const id = "hm-f-" + fam.replace(/\W/g, "");
    if (doc.getElementById(id)) return;
    const l = doc.createElement("link"); l.id = id; l.rel = "stylesheet"; l.href = `https://fonts.googleapis.com/css2?family=${HM_WEB_GF[fam]}&display=swap`; doc.head.appendChild(l);
  });
  set("--fd", `"${s.d}", Georgia, serif`); set("--fb", `"${s.t}", system-ui, sans-serif`);
  doc.querySelectorAll(".brand").forEach((e) => {
    if (t.logo === "konzept" && t.logoSvg) { e.innerHTML = t.logoSvg; return; }
    e.innerHTML = t.logo === "monogramm" ? `<span style="display:inline-grid;place-items:center;width:1.9em;height:1.9em;border-radius:50%;border:1.5px solid currentColor;font-size:.8em">${t.initialen}</span>` : t.logo === "punkt" ? `${t.vor} ${t.nach}<span style="color:${hmWebAkzentText(t)}">.</span>` : `${t.vor} <b>${t.nach}</b>`;
  });
}

/* ---------- Vorlage als srcdoc ---------- */
const hmWebQuellen = {};
function hmWebQuelle(n) {
  if (!hmWebQuellen[n]) hmWebQuellen[n] = fetch(hmShowcaseSrc(n)).then((r) => { if (!r.ok) throw new Error("Look " + n + " nicht erreichbar"); return r.text(); }).then((s) => s.replace(/var IMG = \{[\s\S]*?\};?\s*<\/script>/, "var IMG = __HM_IMG__;</script>"));
  hmWebQuellen[n].catch(() => { delete hmWebQuellen[n]; });
  return hmWebQuellen[n];
}
/* Die Vorlagen bauen die Navigation als helle Glasfläche. Auf dunklem Grund wird sie dunkel, mit heller Schrift */
const HM_WEB_DUNKEL_CSS = "html.dark header .nav{background:color-mix(in srgb,var(--card) 80%,transparent)!important;border-color:color-mix(in srgb,var(--ink) 14%,transparent)!important;box-shadow:0 8px 30px rgba(0,0,0,.25)!important}html.dark header .nav .brand,html.dark header .nav a:not(.btn),html.dark header .nav button:not(.btn),html.dark header .nav span:not(.arw){color:var(--ink)!important}html.dark header .nav svg{color:var(--ink)}html.dark header .nav .nav-partner img{filter:invert(1)}html.dark{--uink:var(--ink);--uink-2:color-mix(in srgb,var(--ink) 82%,var(--bg))}html.dark .btn:not(.solid):not(.loden){background:color-mix(in srgb,var(--ink) 8%,transparent)!important;border-color:color-mix(in srgb,var(--ink) 34%,transparent)!important;color:var(--ink)!important}html.dark .btn:not(.solid):not(.loden):hover{background:var(--ink)!important;color:var(--bg)!important}";
const HM_WEB_STATISCH = `<script>(function(){var mm=window.matchMedia.bind(window);window.matchMedia=function(q){if(/prefers-reduced-motion/.test(q))return{matches:true,media:q,onchange:null,addListener:function(){},removeListener:function(){},addEventListener:function(){},removeEventListener:function(){},dispatchEvent:function(){return false}};return mm(q);};})();</` + `script>`;
function hmWebHtml(quelle, n, karte, opt) {
  const o = opt || {};
  const basis = o.basis || new URL(hmShowcaseSrc(n), location.href).href.replace(/[^/]*$/, "");
  const kopf = `<base href="${basis}">${o.animiert ? "" : HM_WEB_STATISCH}<style id="hm-web-basis">#tweak,#tweakBtn{display:none!important}${o.animiert ? "" : "html,*{scroll-behavior:auto!important}"}${o.mini ? "main>section:not(:first-of-type),footer,#kontakt{display:none!important}body{overflow:hidden!important}" : ""}.hm-leer{background:var(--clay)!important}${HM_WEB_DUNKEL_CSS}</style>`;
  return quelle.replace(/<head([^>]*)>/i, (m) => m + kopf).replace("__HM_IMG__", JSON.stringify(karte));
}

/* ---------- Bibliothek ---------- */
const HM_BILD_MASS = {};
async function hmWebBlobsLaden(mid) {
  const jobs = [];
  (((hmStore.get("webbilder") || {})[mid]) || []).forEach((x) => { if (!HM_BLOB_URL["wi:" + x.id]) jobs.push(hmBlobs.get("wi:" + x.id).then((bl) => { if (bl) HM_BLOB_URL["wi:" + x.id] = URL.createObjectURL(bl); })); });
  (((hmStore.get("bildwelt_bilder") || {})[mid]) || []).forEach((x) => { if (x.lokal && !HM_BLOB_URL["bw:" + x.id]) jobs.push(hmBlobs.get("bw:" + x.id).then((bl) => { if (bl) HM_BLOB_URL["bw:" + x.id] = URL.createObjectURL(bl); })); });
  (((hmStore.get("portraits") || {})[mid] || {}).liste || []).forEach((x) => { if (!x.url && !HM_BLOB_URL["p:" + x.id]) jobs.push(hmBlobs.get("p:" + x.id).then((bl) => { if (bl) HM_BLOB_URL["p:" + x.id] = URL.createObjectURL(bl); })); });
  await Promise.all(jobs.map((j) => j.catch(() => {})));
}
function hmBildBibliothek(mid) {
  const out = [];
  (((hmStore.get("webbilder") || {})[mid]) || []).forEach((x) => { const u = HM_BLOB_URL["wi:" + x.id]; if (u) out.push({ ref: "wi:" + x.id, url: u, name: x.name, quelle: x.quelle === "material" ? "Material" : "Hochgeladen", gruppe: "eigen", w: x.w, h: x.h, alpha: x.alpha }); });
  (((hmStore.get("portraits") || {})[mid] || {}).liste || []).forEach((x) => { const u = x.url || HM_BLOB_URL["p:" + x.id]; if (u) out.push({ ref: "p:" + x.id, url: u, name: x.name || "Porträt", quelle: "Porträt", gruppe: "portrait", w: x.w, h: x.h, alpha: true }); });
  (((hmStore.get("bildwelt_bilder") || {})[mid]) || []).forEach((x) => { const u = HM_BLOB_URL["bw:" + x.id] || x.url; if (u) out.push({ ref: "bw:" + x.id, url: u, name: x.titel, quelle: "Bildwelt, KI", gruppe: "bildwelt", ki: true }); });
  const mat = (((hmStore.get("branding") || {})[mid] || {}).material || []).filter((x) => x.vorschau && !x.bild);
  mat.forEach((x) => out.push({ ref: "mt:" + x.id, url: x.vorschau, name: x.name, quelle: "Material, nur Vorschau", gruppe: "eigen", klein: true }));
  HM_WEB_ARCHIV.forEach((f) => out.push({ ref: "ar:photos/" + f, url: hmAbs("../../assets/photos/" + f), name: f.replace(/\.\w+$/, "").replace(/-/g, " "), quelle: "UNIO-Archiv", gruppe: "archiv" }));
  HM_WEB_ARCHIV_IMG.forEach((f) => out.push({ ref: "ar:img/" + f, url: hmAbs("../../assets/img/" + f), name: f.replace(/\.\w+$/, "").replace(/-/g, " "), quelle: "UNIO-Archiv", gruppe: "archiv" }));
  return out;
}
function hmBildAusRef(mid, ref, bib) {
  if (!ref) return null;
  return (bib || hmBildBibliothek(mid)).find((x) => x.ref === ref) || null;
}
function useBildBibliothek(mid) {
  useHm("webbilder"); useHm("portraits"); useHm("bildwelt_bilder"); useHm("branding");
  const [stand, setStand] = React.useState(0);
  const sig = JSON.stringify([((hmStore.get("webbilder") || {})[mid] || []).length, (((hmStore.get("portraits") || {})[mid] || {}).liste || []).length, ((hmStore.get("bildwelt_bilder") || {})[mid] || []).length]);
  React.useEffect(() => { let weg = false; hmWebBlobsLaden(mid).then(() => !weg && setStand((x) => x + 1)); return () => { weg = true; }; }, [mid, sig]);
  return React.useMemo(() => hmBildBibliothek(mid), [mid, sig, stand]);
}
/* Upload: Original in IndexedDB, sehr große Bilder auf 3000 px lange Kante, Transparenz bleibt erhalten */
async function hmWebBildSpeichern(mid, datei, opt) {
  const id = "wb" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const url = URL.createObjectURL(datei);
  const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
  let blob = datei, w = img.naturalWidth, h = img.naturalHeight;
  const png = /png|webp/.test(datei.type);
  let alpha = false;
  try { const c = document.createElement("canvas"); c.width = 24; c.height = 24; const g = c.getContext("2d"); g.drawImage(img, 0, 0, 24, 24); const d = g.getImageData(0, 0, 24, 24).data; for (let i = 3; i < d.length; i += 4) if (d[i] < 250) { alpha = true; break; } } catch (e) {}
  if (Math.max(w, h) > 3000) {
    const k = 3000 / Math.max(w, h); const c = document.createElement("canvas"); c.width = Math.round(w * k); c.height = Math.round(h * k);
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    blob = await new Promise((res) => c.toBlob(res, alpha || png ? "image/png" : "image/jpeg", 0.9)); w = c.width; h = c.height;
  }
  URL.revokeObjectURL(url);
  await hmBlobs.put("wi:" + id, blob);
  HM_BLOB_URL["wi:" + id] = URL.createObjectURL(blob);
  const e = { id, name: datei.name || "Bild", w, h, alpha, quelle: (opt && opt.quelle) || "upload", datum: new Date().toISOString() };
  hmStore.patch("webbilder", (a) => ({ ...(a || {}), [mid]: [e, ...(((a || {})[mid]) || [])] }));
  return "wi:" + id;
}
async function hmWebDateienHoch(mid, files, opt) {
  const refs = [];
  for (const f of [...files].filter((x) => /^image\//.test(x.type))) { try { refs.push(await hmWebBildSpeichern(mid, f, opt)); } catch (e) { console.warn("Bild", f.name, e); } }
  return refs;
}

/* ---------- Inhalte ---------- */
function hmWebObjekteFuer(mid) { return hmWebObjekte(); }
function hmWebKarte(mid, b, web, bib) {
  const obj = hmWebObjekteFuer(mid);
  const bil = web.bilder || {};
  const url = (slot) => { const x = hmBildAusRef(mid, (bil[slot] || {}).ref, bib); return x ? x.url : null; };
  const archiv = HM_WEB_ARCHIV.slice(0, 6).map((f) => hmAbs("../../assets/photos/" + f));
  const k = {};
  ["penthouse", "altbau", "stadthaus", "zinshaus", "neubau", "dg", "garten", "villa", "vorsorge"].forEach((key, i) => { k[key] = obj[i % obj.length].img; });
  k.neubau = url("titel") || obj[4 % obj.length].img;
  ["ref_penthouse", "ref_altbau", "ref_anlage", "ref_villa", "ref_vorsorge"].forEach((key, i) => { k[key] = obj[(i + 3) % obj.length].img; });
  for (let i = 1; i <= 6; i++) k["life" + i] = url("life" + i) || archiv[i - 1];
  k.hero = url("portrait") || (b.portrait ? hmAbs(b.portrait) : hmWebPlatzhalter(b));
  k._obj = obj.map((o) => o.img);
  return k;
}

/* Bilder auf die Größe der Vorlage bringen: die Showcases sind für 940 px (WebP, rund 50 KB) und ein Porträt von 635 x 1300 px gebaut.
   Große Fotos (bis 8 MB, 4000 px) bremsen die Scroll-Animation und die Porträt-Maske. Ergebnis wird je Sitzung gemerkt. */
const HM_WEB_KLEIN = new Map();
function hmWebZiel(key) { return key === "hero" ? { h: 1300 } : key === "neubau" ? { w: 1600 } : { w: 1000 }; }
function hmWebBildKlein(url, ziel) {
  if (!url || typeof url !== "string" || url.startsWith("data:image/svg")) return Promise.resolve(url);
  const k = url + "|" + (ziel.w || "") + "x" + (ziel.h || "");
  if (HM_WEB_KLEIN.has(k)) return HM_WEB_KLEIN.get(k);
  const p = (async () => {
    const img = new Image(); img.decoding = "async"; img.src = url; await img.decode();
    const nw = img.naturalWidth, nh = img.naturalHeight; if (!nw || !nh) return url;
    const f = Math.min(1, ziel.w ? ziel.w / nw : ziel.h / nh);
    const w = Math.max(1, Math.round(nw * f)), h = Math.max(1, Math.round(nh * f));
    const c = document.createElement("canvas"); c.width = w; c.height = h; const g = c.getContext("2d");
    g.drawImage(img, 0, 0, w, h);
    let alpha = false;
    if (/\.png|image\/png|^blob:|webp/i.test(url)) { try { const t = document.createElement("canvas"); t.width = 32; t.height = 32; const tg = t.getContext("2d"); tg.drawImage(img, 0, 0, 32, 32); const d = tg.getImageData(0, 0, 32, 32).data; for (let i = 3; i < d.length; i += 4) if (d[i] < 250) { alpha = true; break; } } catch (e) { alpha = false; } }
    let blob = await new Promise((r) => c.toBlob(r, "image/webp", 0.82));
    if (!blob || blob.type !== "image/webp") blob = await new Promise((r) => c.toBlob(r, alpha ? "image/png" : "image/jpeg", 0.85));
    if (!blob) return url;
    return URL.createObjectURL(blob);
  })().catch(() => url);
  HM_WEB_KLEIN.set(k, p);
  return p;
}
async function hmWebKarteKlein(karte) {
  const out = {};
  await Promise.all(Object.entries(karte || {}).map(async ([key, u]) => {
    out[key] = Array.isArray(u) ? await Promise.all(u.map((x) => hmWebBildKlein(x, { w: 1000 }))) : await hmWebBildKlein(u, hmWebZiel(key));
  }));
  return out;
}
/* Baudaten mit verkleinerten Bildern. Solange neu gerechnet wird, bleibt der letzte Stand stehen */
function useBauKlein(bau) {
  const [k, setK] = React.useState(null);
  React.useEffect(() => { let weg = false; hmWebKarteKlein(bau.karte).then((x) => { if (!weg) setK({ sig: bau.sig, karte: x }); }); return () => { weg = true; }; }, [bau.sig]);
  return k ? { ...bau, karte: k.karte, sig: k.sig } : null;
}
/* Ohne Porträt: Monogramm auf Markenfläche statt Loch im Hero. Die Prüfung meldet es als Hinweis */
function hmWebPlatzhalter(b) {
  const f = hmWebMixHex(b.akzent || "#1F3A5F", 18, "#F0EDE6"), t = hmWebMixHex(b.akzent || "#1F3A5F", 70, "#141312");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600"><!--hm-platzhalter--><rect width="1200" height="1600" fill="${f}"/><circle cx="600" cy="700" r="260" fill="none" stroke="${t}" stroke-width="6" opacity=".5"/><text x="600" y="790" font-family="Georgia, serif" font-size="260" text-anchor="middle" fill="${t}">${(b.initialen || "").replace(/[<&]/g, "")}</text><text x="600" y="1120" font-family="Helvetica, Arial, sans-serif" font-size="44" letter-spacing="8" text-anchor="middle" fill="${t}" opacity=".7">PORTRÄT FOLGT</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
function hmWebFokus(web) {
  const out = {}; const bil = web.bilder || {};
  Object.entries(bil).forEach(([slot, v]) => { if (v && v.fx != null) out[slot] = `${v.fx}% ${v.fy}%`; });
  return out;
}

function hmWebInhalt(doc, F, t, karte, fokus) {
  const html = doc.documentElement;
  const region = (F.region || "Wien").split(",")[0].trim();
  const mail = F.mail || "", tel = F.tel || "", ig = F.instagram || "";
  const objekte = hmWebObjekte().map((o, i) => (karte && Array.isArray(karte._obj) && karte._obj[i] ? { ...o, img: karte._obj[i] } : o));
  const handle = (ig || "").replace("@", "");
  const paare = [["Immobilien mit Strategie, Sichtbarkeit und persönlicher Begleitung.", F.headline], ["Immobilien, persönlich verkauft.", F.headline], ["Für mich ist eine Immobilie kein Objekt, sondern ein Lebensraum.", F.zitat], ["marcus@example.at", mail], ["@marcus.weiss.immo", ig], ["marcus.weiss.immo", handle], ["+43 (0)1 000 00 00", tel], ["Marcus", t.vor], ["Weiss", t.nach], ["· Wien", "· " + region], ["Wien )", region + " )"]];
  const w = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  let n; while ((n = w.nextNode())) { let s = n.nodeValue; paare.forEach(([a, z]) => { if (z != null && s.includes(a)) s = s.split(a).join(z); }); if (s !== n.nodeValue) n.nodeValue = s; }
  ["alt", "aria-label", "title"].forEach((at) => doc.querySelectorAll(`[${at}]`).forEach((e) => e.setAttribute(at, e.getAttribute(at).replace(/Marcus/g, t.vor).replace(/Weiss/g, t.nach))));
  doc.querySelectorAll(".intro-body, .h2-introtext").forEach((e) => { if (F.bio) e.textContent = F.bio; });
  /* Headline und Unterzeile gezielt je Vorlage, auch wenn sie über Zeilenumbrüche oder Akzentpunkte verteilt sind */
  if (F.headline) doc.querySelectorAll(".hero-pos, .h2-lead, .h5-sub, .h6-h, .h7-h").forEach((e) => { const punkt = e.querySelector("em, .dot, [class*=punkt]"); e.textContent = F.headline.replace(/\.$/, ""); if (punkt && /^\.$/.test(punkt.textContent.trim())) e.appendChild(punkt); else if (/\.$/.test(F.headline)) e.appendChild(doc.createTextNode(".")); });
  const kurz = (F.bio || "").split(/(?<=[.?])\s+/).reduce((acc, satz) => (acc + " " + satz).trim().length <= 190 ? (acc + " " + satz).trim() : acc, "");
  doc.querySelectorAll(".h6-sub").forEach((e) => { if (kurz) e.textContent = kurz; else e.style.display = "none"; });
  /* Vorlagentext: keine erfundenen Jahre, keine Gedankenstriche */
  const wd = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT); let dn;
  while ((dn = wd.nextNode())) { const v = dn.nodeValue; if (!/[\u2013\u2014]|Seit über \d+ Jahren/.test(v)) continue; dn.nodeValue = v.replace(/Seit über \d+ Jahren[^.]*\.\s*/g, "").replace(/\s+[\u2013\u2014]\s+/g, ", ").replace(/\s*[\u2013\u2014]\s*$/g, ",").replace(/^\s*[\u2013\u2014]\s*/g, "").replace(/[\u2013\u2014]/g, "-"); }
  const stats = (F.stats || "").split(" · ").filter(Boolean).map((s) => { const [x, ...r] = s.split(" "); return [x, r.join(" ")]; });
  /* Kennzahlen: nur, was der Makler angibt. Erfundene Werte der Vorlagen (Tage bis Abschluss, Weiterempfehlung, Scores) verschwinden */
  const factBoxen = new Set([...doc.querySelectorAll(".fact")].map((f) => f.parentElement));
  factBoxen.forEach((box) => [...box.querySelectorAll(":scope > .fact")].forEach((f, i) => { if (stats[i]) { const a = f.querySelector(".n"), b2 = f.querySelector(".l"); if (a) a.textContent = stats[i][0]; if (b2) b2.textContent = stats[i][1]; f.style.display = ""; } else f.style.display = "none"; }));
  doc.querySelectorAll(".hdl").forEach((e) => { if (/\d/.test(e.textContent)) e.style.display = "none"; });
  doc.querySelectorAll("a, button").forEach((e) => { const tn = [...e.childNodes].find((c) => c.nodeType === 3 && /\(\d+\)/.test(c.nodeValue)); if (tn) tn.nodeValue = tn.nodeValue.replace(/\s*\(\d+\)/, ""); });
  const wt = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT); let wn; while ((wn = wt.nextNode())) { if (wn.nodeValue.trim() === "Wien" && region !== "Wien") wn.nodeValue = wn.nodeValue.replace("Wien", region); }
  doc.querySelectorAll("#grid .card").forEach((c, i) => { const o = objekte[i % objekte.length]; const q = (s) => c.querySelector(s); if (q("h3")) q("h3").textContent = o.t; if (q(".loc")) q(".loc").textContent = o.loc; if (q(".price")) q(".price").textContent = o.price; const bs = c.querySelectorAll(".specs b"); if (bs[0]) bs[0].textContent = o.m2; if (bs[1]) bs[1].textContent = o.zi; if (q("img")) { q("img").src = o.img; q("img").alt = o.t; } });
  /* Referenzen: nur echte Stimmen, ohne erfundene Kennzahlen */
  const refSek = doc.getElementById("referenzen");
  if (refSek) {
    if (F.referenzen) doc.querySelectorAll("#car .ref-card").forEach((r, i) => { if (i === 0) { const q = (s) => r.querySelector(s); if (q(".rquote")) q(".rquote").textContent = F.referenzen; if (q("h3")) q("h3").textContent = "Kundenstimme"; if (q(".rloc")) q(".rloc").textContent = region; if (q(".rmetric")) q(".rmetric").style.display = "none"; if (q(".rbadge")) q(".rbadge").textContent = "Freigegeben"; } else r.style.display = "none"; });
    else refSek.style.display = "none";
  }
  const zeige = (id, an) => { const e = doc.getElementById(id); if (e) e.style.display = an ? "" : "none"; doc.querySelectorAll(`a[href="#${id}"]`).forEach((a) => { a.style.display = an ? "" : "none"; }); };
  zeige("referenzen", !!F.referenzen);
  zeige("social", !!ig);
  doc.querySelectorAll('a[href^="mailto:"]').forEach((e) => e.setAttribute("href", "mailto:" + mail));
  doc.querySelectorAll('a[href^="tel:"]').forEach((e) => e.setAttribute("href", "tel:" + tel.replace(/[^+\d]/g, "")));
  const fb = doc.querySelector(".foot-bottom"); if (fb && (F.firma || F.gisa) && !fb.querySelector(".hm-impressum")) { const s = doc.createElement("span"); s.className = "hm-impressum"; s.textContent = `Impressum: ${F.firma || "Firma folgt"} · GISA ${F.gisa || "folgt"}${F.behoerde ? " · " + F.behoerde : ""}`; fb.appendChild(s); }
  /* Fokuspunkte der Bildfelder */
  const nachUrl = {};
  Object.entries(fokus || {}).forEach(([slot, pos]) => { const key = slot === "titel" ? "neubau" : slot === "portrait" ? "hero" : slot; if (karte[key]) nachUrl[karte[key]] = pos; });
  doc.querySelectorAll("img").forEach((im) => { const p = nachUrl[im.getAttribute("src")]; if (p) im.style.objectPosition = p; });
  doc.title = `${t.vor} ${t.nach}, Immobilien in ${region}`;
  html.classList.remove("pre");
}

/* Prüfung und Korrektur: große Namen in die Breite einpassen, dann melden, was noch auffällt */
function hmWebPruefen(doc) {
  const out = []; const win = doc.defaultView; if (!win || !doc.body) return out;
  const vw = doc.documentElement.clientWidth;
  const kopf = [...doc.querySelectorAll("main > section, body > section, #stage, #mhero")].slice(0, 3);
  doc.querySelectorAll("[data-hm-fit]").forEach((el) => { el.style.fontSize = ""; el.removeAttribute("data-hm-fit"); });
  const gross = [];
  kopf.forEach((sek) => sek.querySelectorAll("*").forEach((el) => { if (!el.childNodes.length || el.offsetParent === null) return; const txt = [...el.childNodes].filter((c) => c.nodeType === 3).map((c) => c.nodeValue).join("").trim(); if (!txt) return; const fs = parseFloat(win.getComputedStyle(el).fontSize); if (fs >= 56) gross.push(el); }));
  gross.forEach((el) => {
    for (let i = 0; i < 4; i++) {
      const r = el.getBoundingClientRect(); const breit = Math.max(r.width, el.scrollWidth);
      const rechts = r.left + breit;
      if (rechts <= vw - 2 && r.left >= -2) break;
      const platz = vw - Math.max(8, r.left) - 8;
      const fs = parseFloat(win.getComputedStyle(el).fontSize);
      el.style.fontSize = Math.floor(fs * Math.max(0.4, platz / breit)) + "px"; el.setAttribute("data-hm-fit", "1");
      if (i === 0) out.push({ art: "fix", t: `„${el.textContent.trim().slice(0, 24)}“ auf Breite eingepasst` });
    }
  });
  const text = doc.body.innerText || "";
  const rest = (text.match(/Marcus|Weiss|example\.at|000 00 00|Lorem/g) || []);
  if (rest.length) out.push({ art: "fehler", t: `Platzhalter übrig: ${[...new Set(rest)].join(", ")}` });
  if ([...doc.querySelectorAll("img")].some((im) => im.offsetParent !== null && (im.getAttribute("src") || "").includes("hm-platzhalter"))) out.push({ art: "hinweis", t: "Porträt fehlt, bis dahin steht das Monogramm" });
  const leer = [...doc.querySelectorAll("img")].filter((im) => im.offsetParent !== null && (!im.getAttribute("src") || (im.complete && im.naturalWidth === 0)));
  if (leer.length) out.push({ art: "fehler", t: `${leer.length} Bild${leer.length > 1 ? "er" : ""} ohne Inhalt` });
  if (doc.documentElement.scrollWidth > vw + 2) out.push({ art: "fehler", t: "Seite breiter als der Bildschirm" });
  return out;
}

function hmWebFelderMap(m, b, web) { return Object.fromEntries(hmWebFelder(m, b, web).map((f) => [f.id, f.wert])); }

/* ---------- Rahmen mit Doppelpuffer: neuer Aufbau erst sichtbar, wenn er fertig ist ---------- */
function WebRahmen({ n, geraet = "desktop", html, theme, F, karte, fokus, mini, onPruef, maxHoehe }) {
  const box = React.useRef(null), buehne = React.useRef(null), aktiv = React.useRef(null);
  const [breite, setBreite] = React.useState(0);
  const [bereit, setBereit] = React.useState(false);
  const g = HM_WEB_GERAETE.find((x) => x.id === geraet) || HM_WEB_GERAETE[0];
  React.useEffect(() => { const el = box.current; if (!el) return; const ro = new ResizeObserver(() => setBreite(el.clientWidth)); ro.observe(el); setBreite(el.clientWidth); return () => ro.disconnect(); }, []);
  const themeRef = React.useRef(theme); themeRef.current = theme;
  const pruef = (doc) => { const r = hmWebPruefen(doc); onPruef && onPruef(r); };
  React.useEffect(() => {
    if (!html || !buehne.current) return;
    let weg = false;
    const f = document.createElement("iframe");
    f.title = `Look ${n}`; f.setAttribute("tabindex", mini ? "-1" : "0"); f.width = g.w; f.height = g.h;
    f.style.cssText = `width:${g.w}px;height:${g.h}px;opacity:0;${mini ? "pointer-events:none;" : ""}`;
    f.onload = async () => {
      if (weg) return;
      const doc = f.contentDocument;
      try { hmWebThemeAnwenden(doc, themeRef.current); hmWebInhalt(doc, F, themeRef.current, karte, fokus); } catch (e) { console.warn("Look", n, e); }
      try { await Promise.race([doc.fonts.ready, new Promise((r) => setTimeout(r, 1500))]); } catch (e) {}
      await new Promise((r) => setTimeout(r, 120));
      if (weg) return;
      try { hmWebPruefen(doc); } catch (e) {}
      f.style.opacity = "1";
      const alt = aktiv.current; aktiv.current = f; setBereit(true);
      if (alt && alt !== f) setTimeout(() => alt.remove(), 220);
      /* Erst melden, wenn die sichtbaren Bilder da sind, sonst meldet die Prüfung Bilder, die nur noch laden */
      try { const sichtbar = [...doc.images].filter((i) => i.offsetParent !== null && !(i.complete && i.naturalWidth)); await Promise.race([Promise.all(sichtbar.map((i) => new Promise((r) => { i.addEventListener("load", r, { once: true }); i.addEventListener("error", r, { once: true }); }))), new Promise((r) => setTimeout(r, 3000))]); } catch (e) {}
      if (weg) return;
      try { pruef(doc); } catch (e) {}
    };
    f.srcdoc = html;
    buehne.current.appendChild(f);
    return () => { weg = true; if (aktiv.current !== f) f.remove(); };
  }, [html, geraet]);
  /* Theme und Inhalte ohne Neuaufbau: Farbe, Schrift, Logo, Grundton sofort */
  const tSig = JSON.stringify([theme.akzentId, theme.schriftId, theme.logo, theme.grundton]);
  React.useEffect(() => { const f = aktiv.current; if (!f || !f.contentDocument) return; hmWebThemeAnwenden(f.contentDocument, theme); const doc = f.contentDocument; Promise.race([doc.fonts.ready, new Promise((r) => setTimeout(r, 900))]).then(() => { try { pruef(doc); } catch (e) {} }); }, [tSig]);
  React.useEffect(() => () => { if (aktiv.current) aktiv.current.remove(); }, []);
  const hMax = maxHoehe || 720;
  let s = breite ? breite / g.w : 0.4;
  if (g.id !== "desktop" && !mini) s = Math.min(s, hMax / g.h);
  const w = Math.round(g.w * s), h = Math.round((mini ? g.h : Math.min(g.h, g.id === "desktop" ? hMax / s : g.h)) * s);
  return <div ref={box} className={"hm-wr" + (mini ? " mini" : "") + " g-" + g.id}>
    <div className="hm-wr-geraet" style={{ width: w, height: h }}>
      <div ref={buehne} className="hm-wr-buehne" style={{ transform: `scale(${s})`, width: g.w, height: mini ? g.h : Math.round(h / s) }} />
      {!bereit && <div className="hm-wr-lade"><span></span></div>}
    </div>
  </div>;
}

/* ---------- Stil-Leiste: kuratierte Auswahl, Überfahren zeigt, Klick übernimmt ---------- */
function StilKachel({ id, offen, setOffen, titel, wert, zeichen, children }) {
  const ref = React.useRef(null);
  React.useEffect(() => { if (offen !== id) return; const zu = (e) => { if (ref.current && !ref.current.contains(e.target)) setOffen(null); }; const esc = (e) => e.key === "Escape" && setOffen(null); document.addEventListener("mousedown", zu); document.addEventListener("keydown", esc); return () => { document.removeEventListener("mousedown", zu); document.removeEventListener("keydown", esc); }; }, [offen]);
  return <div className="hm-stil-k" ref={ref}>
    <button className={"hm-stil-knopf" + (offen === id ? " on" : "")} onClick={() => setOffen(offen === id ? null : id)} aria-expanded={offen === id}>
      <span className="z">{zeichen}</span><span className="tx"><span className="l">{titel}</span><span className="v">{wert}</span></span>
      <svg className="hm-ico" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4" /></svg>
    </button>
    {offen === id && <div className="hm-stil-pop" role="dialog" aria-label={titel}>{children}</div>}
  </div>;
}

function StilLeiste({ m, t, setVorschau, look, setLook, setAlle, teamSicht }) {
  const [offen, setOffen] = React.useState(null);
  /* Menü zu, auf welchem Weg auch immer: die Vorschau zeigt wieder die gespeicherte Marke */
  React.useEffect(() => { setVorschau(null); }, [offen]);
  const b = hmBrand(m.id);
  const empfS = HM_SCHRIFTPAARE[b.aid] || [], empfA = HM_AKZENT_EMPF[b.aid] || [];
  const setBr = (patch) => { hmStore.patch("branding", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), ...patch, status: (((a || {})[m.id] || {}).status === "freigegeben" ? "geaendert" : ((a || {})[m.id] || {}).status || "entwurf") } })); hmEvent(m.id, "branding", "Stil geändert: " + Object.keys(patch).join(", "), teamSicht ? "Team" : m.name); setVorschau(null); };
  const setWeb = (patch) => { hmStore.patch("website", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), ...patch } })); setVorschau(null); };
  const hov = (ov) => ({ onMouseEnter: () => setVorschau(ov), onFocus: () => setVorschau(ov), onMouseLeave: () => setVorschau(null), onBlur: () => setVorschau(null) });
  const lk = HM_LOOKS.find((l) => l.n === look) || HM_LOOKS[0];
  const bT = { ...b, akzent: t.akzent, schrift: t.schrift };
  return <div className="hm-stil">
    <StilKachel id="look" offen={offen} setOffen={setOffen} titel="Look" wert={`${String(look).padStart(2, "0")} ${lk.name}`} zeichen={<img src={lk.bild} alt="" />}>
      <div className="hm-stil-looks">{HM_LOOKS.map((l) => <button key={l.n} className={look === l.n ? "on" : ""} onClick={() => { setLook(l.n); setOffen(null); }}><img src={l.bild} alt="" /><span className="t">{String(l.n).padStart(2, "0")} {l.name}</span><span className="s">{l.satz}</span></button>)}</div>
      <button className="hm-link" style={{ marginTop: 12 }} onClick={() => { setAlle(true); setOffen(null); }}>Alle sechs mit deiner Marke vergleichen</button>
    </StilKachel>
    <StilKachel id="farbe" offen={offen} setOffen={setOffen} titel="Akzent" wert={t.akzentName} zeichen={<i className="hm-stil-dot" style={{ background: t.akzent }} />}>
      <div className="hm-stil-farben">{HM_WEB_AKZENTE.map((x) => { const k = hmWebKontrast(x.hex, t.grund); return <button key={x.id} className={t.akzentId === x.id ? "on" : ""} {...hov({ akzentId: x.id })} onClick={() => setBr({ akzent: x.id })}>
        <i style={{ background: x.hex }}>{t.akzentId === x.id && <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={hmWebLum(x.hex) > 0.45 ? "#141312" : "#fff"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5l3 3 6-7" /></svg>}</i>
        <span className="t">{x.name}</span><span className="s">{empfA.includes(x.id) ? "Empfohlen · " : ""}{k >= 4.5 ? "auch für Text" : k >= 3 ? "für Überschriften" : "nur Flächen, Text wird angepasst"}</span>
      </button>; })}</div>
      <div className="hm-stil-fuss">Gilt für die ganze Marke: Website, Visitenkarte, Posts und Markenbuch.</div>
    </StilKachel>
    <StilKachel id="schrift" offen={offen} setOffen={setOffen} titel="Schrift" wert={t.schrift.name} zeichen={<span style={{ fontFamily: hmFont(t.schrift.d), fontSize: 18 }}>Aa</span>}>
      <div className="hm-stil-schriften">{Object.entries(HM_WEB_SCHRIFTEN).sort((x, y) => (empfS.includes(y[0]) ? 1 : 0) - (empfS.includes(x[0]) ? 1 : 0)).map(([id, f]) => <button key={id} className={t.schriftId === id ? "on" : ""} {...hov({ schriftId: id })} onClick={() => setBr({ schrift: id })}>
        <span className="d" style={{ fontFamily: hmFont(f.d) }}>{b.vor} {b.nach}</span>
        <span className="b" style={{ fontFamily: `"${f.t}", system-ui, sans-serif` }}>{(b.claim || "").slice(0, 60)}</span>
        <span className="n">{f.name}{empfS.includes(id) ? " · empfohlen" : ""}<em>{f.d === f.t ? f.d : `${f.d} und ${f.t}`}</em></span>
      </button>)}</div>
      <div className="hm-stil-fuss">Überschrift und Text als Paar. Alle frei lizenziert.</div>
    </StilKachel>
    <StilKachel id="logo" offen={offen} setOffen={setOffen} titel="Logo" wert={t.logo === "konzept" ? "Aus der Werkstatt" : (HM_LOGO_TYPEN.find((x) => x.id === t.logo) || {}).name} zeichen={<span className="hm-stil-logo"><BrandLogo b={{ ...bT, logo: t.logo }} typ={t.logo} h={t.logo === "monogramm" ? 22 : 12} /></span>}>
      <div className="hm-stil-logos">{b.logoKonzept && <button className={t.logo === "konzept" ? "on" : ""} {...hov({ logo: "konzept" })} onClick={() => setBr({ logo: "konzept" })}><span className="bild"><BrandLogo b={{ ...bT, logo: "konzept", logoKonzept: b.logoKonzept }} typ="konzept" h={b.logoKonzept.art === "monogramm" ? 48 : 26} /></span><span className="t">Aus der Werkstatt</span><span className="s">{b.logoKonzept.font}</span></button>}{HM_LOGO_TYPEN.map((x) => <button key={x.id} className={t.logo === x.id ? "on" : ""} {...hov({ logo: x.id })} onClick={() => setBr({ logo: x.id })}><span className="bild"><BrandLogo b={{ ...bT, logo: x.id }} typ={x.id} h={x.id === "monogramm" ? 48 : 26} /></span><span className="t">{x.name}</span><span className="s">{x.satz}</span></button>)}</div>
    </StilKachel>
    <StilKachel id="grund" offen={offen} setOffen={setOffen} titel="Grundton" wert={(HM_WEB_GRUNDTOENE.find((x) => x.id === t.grundton) || {}).name} zeichen={<i className="hm-stil-dot" style={{ background: t.grund, boxShadow: "inset 0 0 0 1px rgba(11,10,9,.2)" }} />}>
      <div className="hm-stil-gruende">{HM_WEB_GRUNDTOENE.map((x) => { const tt = hmWebTheme(m.id, { akzentId: t.akzentId, grundton: x.id }); const deaktiv = x.id === "welt" && !tt.farben; return <button key={x.id} disabled={deaktiv} className={t.grundton === x.id ? "on" : ""} {...hov({ grundton: x.id })} onClick={() => setWeb({ grundton: x.id })}>
        <span className="flaeche" style={{ background: tt.grund, color: tt.farben ? tt.farben.text : tt.dunkel ? "#F7F5F1" : "#181A17" }}><span style={{ fontFamily: hmFont(t.schrift.d) }}>{b.nach}</span><i style={{ background: hmWebAkzentText(tt) }} /></span>
        <span className="t">{x.id === "welt" && tt.welt ? `Welt ${tt.welt.name}` : x.name}</span><span className="s">{deaktiv ? "Erst Markenwelt wählen" : x.satz}</span>
      </button>; })}</div>
    </StilKachel>
  </div>;
}

/* ---------- Bildfelder ---------- */
function BildSlot({ m, slot, wert, bild, onSetzen, onWahl, onFokus, fokusAn, onTausch }) {
  const [ueber, setUeber] = React.useState(false);
  const drop = async (e) => {
    e.preventDefault(); setUeber(false);
    const ref = e.dataTransfer.getData("text/wb-bild"); const von = e.dataTransfer.getData("text/wb-slot");
    if (von && von !== slot.id) { onTausch(von, slot.id); return; }
    if (ref) { onSetzen(ref); return; }
    if (e.dataTransfer.files && e.dataTransfer.files.length) { const refs = await hmWebDateienHoch(m.id, e.dataTransfer.files); if (refs[0]) onSetzen(refs[0]); }
  };
  const klick = (e) => { if (!fokusAn || !bild) return; const r = e.currentTarget.getBoundingClientRect(); onFokus(Math.round((e.clientX - r.left) / r.width * 100), Math.round((e.clientY - r.top) / r.height * 100)); };
  const warn = bild && ((bild.w && bild.w < slot.min && bild.h < slot.min) ? `Klein, ab ${slot.min} px besser` : bild.klein ? "Nur Vorschau, Original fehlt" : slot.id === "portrait" && bild.alpha === false ? "Nicht freigestellt, Look 1 braucht Freisteller" : null);
  return <figure className={"hm-slot" + (ueber ? " ueber" : "") + (fokusAn ? " fokus" : "")} onDragOver={(e) => { e.preventDefault(); setUeber(true); }} onDragLeave={() => setUeber(false)} onDrop={drop}>
    <div className="rahmen" style={{ aspectRatio: slot.format }} onClick={klick} draggable={!!bild && !fokusAn} onDragStart={(e) => e.dataTransfer.setData("text/wb-slot", slot.id)}>
      {bild ? <img src={bild.url} alt={slot.name} style={{ objectPosition: wert && wert.fx != null ? `${wert.fx}% ${wert.fy}%` : "50% 50%", objectFit: slot.id === "portrait" ? "contain" : "cover" }} /> : <span className="leer">Bild hierher ziehen</span>}
      {fokusAn && bild && <i className="ring" style={{ left: `${wert && wert.fx != null ? wert.fx : 50}%`, top: `${wert && wert.fy != null ? wert.fy : 50}%` }} />}
      {bild && bild.ki && <span className="ki">KI</span>}
    </div>
    <figcaption>
      <span className="t">{slot.name}<em>{slot.looks}</em></span>
      <span className="s">{warn ? <b>{warn}</b> : bild ? (wert && wert.ref ? bild.quelle : slot.id === "portrait" ? bild.quelle || "Aktives Porträt" : "Vorschlag, " + (bild.quelle || "")) : slot.satz}</span>
      <span className="a"><button className="hm-link" onClick={onWahl}>Wählen</button>{bild && slot.id !== "portrait" && <button className="hm-link" onClick={() => onFokus(null)}>{fokusAn ? "Fertig" : "Fokus"}</button>}{wert && wert.ref && <button className="hm-link" onClick={() => onSetzen(null)}>Zurücksetzen</button>}</span>
    </figcaption>
  </figure>;
}

function BildWahl({ m, offen, zu, onWahl, slot }) {
  const bib = useBildBibliothek(m.id);
  const [tab, setTab] = React.useState("alle");
  const [ueber, setUeber] = React.useState(false);
  React.useEffect(() => { if (offen) setTab(slot && slot.id === "portrait" ? "portrait" : "alle"); }, [offen]);
  const tabs = [["alle", "Alle"], ["eigen", "Hochgeladen"], ["portrait", "Porträts"], ["bildwelt", "Bildwelt"], ["archiv", "UNIO-Archiv"]].filter(([id]) => id === "alle" || bib.some((x) => x.gruppe === id));
  const liste = bib.filter((x) => tab === "alle" || x.gruppe === tab);
  const hoch = async (files) => { const refs = await hmWebDateienHoch(m.id, files); if (refs.length === 1 && slot) { onWahl(refs[0]); zu(); } else if (refs.length) { toast(`${refs.length} Bilder in der Bibliothek`); setTab("eigen"); } };
  return <Sheet offen={offen} zu={zu} titel={slot ? `${slot.name} wählen` : "Bibliothek"} breit>
    <div className="hm-seg" style={{ marginBottom: 14, flexWrap: "wrap" }}>{tabs.map(([id, n]) => <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{n} <span className="hm-daten">{id === "alle" ? bib.length : bib.filter((x) => x.gruppe === id).length}</span></button>)}</div>
    <label className={"hm-drop klein" + (ueber ? " ueber" : "")} onDragOver={(e) => { e.preventDefault(); setUeber(true); }} onDragLeave={() => setUeber(false)} onDrop={(e) => { e.preventDefault(); setUeber(false); hoch(e.dataTransfer.files); }}><input type="file" multiple hidden accept="image/*" onChange={(e) => hoch(e.target.files)} /><span>Neue Bilder hierher ziehen oder wählen. Sie landen in der Bibliothek.</span></label>
    <div className="hm-bib" style={{ marginTop: 14 }}>{liste.map((x) => <button key={x.ref} className="hm-bib-b" draggable onDragStart={(e) => e.dataTransfer.setData("text/wb-bild", x.ref)} onClick={() => { onWahl(x.ref); zu(); }}>
      <span className="bild"><img src={x.url} alt="" loading="lazy" onLoad={(e) => { HM_BILD_MASS[x.ref] = [e.target.naturalWidth, e.target.naturalHeight]; }} />{x.ki && <span className="ki">KI</span>}</span>
      <span className="t">{x.name}</span><span className="s">{x.quelle}{x.w ? ` · ${x.w} × ${x.h}` : ""}</span>
    </button>)}</div>
  </Sheet>;
}

function WebBilder({ m, web, set }) {
  const bib = useBildBibliothek(m.id);
  const [wahl, setWahl] = React.useState(null);
  const [fokus, setFokus] = React.useState(null);
  const [ueber, setUeber] = React.useState(false);
  const b = hmBrand(m.id);
  const bil = web.bilder || {};
  const setzeSlot = (id, patch) => set({ bilder: { ...bil, [id]: patch ? { ...(bil[id] || {}), ...patch } : undefined } });
  const tausch = (von, nach) => set({ bilder: { ...bil, [von]: bil[nach], [nach]: bil[von] } });
  const bildFuer = (slot) => {
    const v = bil[slot.id];
    if (v && v.ref) return hmBildAusRef(m.id, v.ref, bib);
    if (slot.id === "portrait") return b.portrait ? { url: b.portrait, quelle: "Aktives Porträt", alpha: true } : null;
    if (slot.id === "titel") { const o = hmWebObjekte()[4]; return { url: o.img, quelle: "Aus dem Bestand" }; }
    const i = +slot.id.replace("life", ""); return { url: hmAbs("../../assets/photos/" + HM_WEB_ARCHIV[i - 1]), quelle: "UNIO-Archiv" };
  };
  /* Mehrere Dateien auf einmal: füllen die Stimmungsfelder, die noch Vorschläge sind */
  const vieleHoch = async (files) => {
    const refs = await hmWebDateienHoch(m.id, files); if (!refs.length) return;
    const frei = HM_WEB_SLOTS.filter((s) => s.id.startsWith("life") && !(bil[s.id] && bil[s.id].ref));
    const neu = { ...bil }; refs.forEach((r, i) => { if (frei[i]) neu[frei[i].id] = { ref: r }; });
    set({ bilder: neu });
    toast(`${refs.length} Bilder hochgeladen${frei.length ? `, ${Math.min(refs.length, frei.length)} direkt eingesetzt` : ", liegen in der Bibliothek"}`);
  };
  const eigene = bib.filter((x) => x.gruppe !== "archiv");
  return <div>
    <label className={"hm-drop" + (ueber ? " ueber" : "")} onDragOver={(e) => { e.preventDefault(); setUeber(true); }} onDragLeave={() => setUeber(false)} onDrop={(e) => { e.preventDefault(); setUeber(false); if (e.dataTransfer.files.length) vieleHoch(e.dataTransfer.files); }}>
      <input type="file" multiple hidden accept="image/*" onChange={(e) => vieleHoch(e.target.files)} />
      <span><b>Bilder hierher ziehen</b><br />Sie füllen die freien Stimmungsfelder und landen in der Bibliothek.</span>
    </label>
    {eigene.length > 0 && <div className="hm-film" aria-label="Eigene Bilder, auf ein Feld ziehen">{eigene.slice(0, 24).map((x) => <img key={x.ref} src={x.url} alt={x.name} title={`${x.name}, auf ein Feld ziehen`} draggable onDragStart={(e) => e.dataTransfer.setData("text/wb-bild", x.ref)} />)}<button className="hm-link" onClick={() => setWahl({ id: "_bib", name: "Bibliothek" })}>Alle {bib.length}</button></div>}
    <div className="hm-slots">{HM_WEB_SLOTS.map((s) => <BildSlot key={s.id} m={m} slot={s} wert={bil[s.id]} bild={bildFuer(s)} fokusAn={fokus === s.id}
      onSetzen={(ref) => setzeSlot(s.id, ref ? { ref, fx: null, fy: null } : null)} onWahl={() => setWahl(s)} onTausch={tausch}
      onFokus={(x, y) => { if (x == null) { setFokus(fokus === s.id ? null : s.id); return; } setzeSlot(s.id, { ...(bil[s.id] || {}), fx: x, fy: y }); }} />)}</div>
    <div className="hm-mono" style={{ marginTop: 12 }}>Objektfotos kommen aus deinem Bestand. Fokus: auf „Fokus“ tippen, dann in das Bild klicken. Felder lassen sich untereinander tauschen, einfach ziehen.</div>
    <BildWahl m={m} offen={!!wahl} zu={() => setWahl(null)} slot={wahl && wahl.id !== "_bib" ? wahl : null} onWahl={(ref) => wahl && wahl.id !== "_bib" && setzeSlot(wahl.id, { ref, fx: null, fy: null })} />
  </div>;
}

/* ---------- Textfelder mit Grenzen ---------- */
function WebFeld({ f, setF }) {
  const [edit, setEdit] = React.useState(false);
  const lim = HM_WEB_LIMITS[f.id];
  const lang = HM_WEB_LANG.includes(f.id);
  const [wert, setWert] = React.useState(f.wert || "");
  React.useEffect(() => { if (!edit) setWert(f.wert || ""); }, [f.wert, edit]);
  const fertig = () => { setEdit(false); if (wert !== (f.wert || "")) setF(f.id, wert); };
  const ueber = lim && wert.length > lim;
  return <div className={"hm-wfeld" + (!f.wert && f.pflicht ? " fehlt" : "")}>
    {edit ? <div className="hm-wfeld-edit">
      <span className="l">{f.label}{f.pflicht ? " *" : ""}</span>
      {lang ? <textarea autoFocus rows={f.id === "bio" ? 5 : 3} value={wert} maxLength={lim ? lim + 40 : undefined} onChange={(e) => setWert(e.target.value)} onBlur={fertig} onKeyDown={(e) => e.key === "Escape" && (setWert(f.wert || ""), setEdit(false))} />
        : <input autoFocus value={wert} maxLength={lim ? lim + 20 : undefined} onChange={(e) => setWert(e.target.value)} onBlur={fertig} onKeyDown={(e) => { if (e.key === "Enter") e.target.blur(); if (e.key === "Escape") { setWert(f.wert || ""); setEdit(false); } }} />}
      <span className={"z" + (ueber ? " rot" : "")}>{lim ? `${wert.length} von ${lim}${ueber ? ", bitte kürzen, sonst bricht die Zeile" : ""}` : ""}</span>
    </div> : <button onClick={() => setEdit(true)}><span className="l">{f.label}{f.pflicht ? " *" : ""}</span><span className="v">{f.wert || "Fehlt"}</span><span className="q">{f.eigen ? <>Von dir geändert · <span className="hm-link" role="button" tabIndex={0} onClick={(e) => { e.stopPropagation(); setF(f.id, null); }}>Vorschlag zurück</span></> : f.quelle}{lim && f.wert && f.wert.length > lim ? " · zu lang" : ""}</span></button>}
  </div>;
}

/* ---------- Website ---------- */
function Website({ m, setSub, teamSicht }) {
  useHm("website"); useHm("branding"); useHm("markenbuch");
  const b = hmBrand(m.id);
  const web = (hmStore.get("website") || {})[m.id] || {};
  const welt = hmWebWelt(m.id);
  const look = web.look || (welt && welt.websiteLook) || 1;
  const felder = hmWebFelder(m, b, web);
  const [vorschau, setVorschau] = React.useState(null);
  const [geraet, setGeraet] = React.useState(() => { try { return localStorage.getItem("unio_hm_web_geraet") || "desktop"; } catch (e) { return "desktop"; } });
  const [alle, setAlle] = React.useState(false);
  const [tab, setTab] = React.useState("inhalte");
  const [pruef, setPruef] = React.useState(null);
  const bib = useBildBibliothek(m.id);
  const set = (patch) => hmStore.patch("website", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), ...patch } }));
  const setF = (id, v) => { const fe = { ...(web.felder || {}) }; if (v == null) delete fe[id]; else fe[id] = v; set({ felder: fe }); };
  const setG = (g) => { setGeraet(g); try { localStorage.setItem("unio_hm_web_geraet", g); } catch (e) {} };
  if (!b.fertig && b.br.status !== "geaendert") return <Leer titel="Kommt nach deinem Branding." text="Sobald das Branding freigegeben ist, füllt sich die Seite fast von selbst." aktion={<Btn onClick={() => setSub("design")}>Zum Branding</Btn>} />;
  const t = hmWebTheme(m.id, vorschau);
  const textFelder = felder.filter((f) => !["schrift", "akzent", "logo", "portrait"].includes(f.id));
  const pflichtOffen = felder.filter((f) => f.pflicht && !f.wert && f.id !== "portrait").concat(!b.portrait && !((web.bilder || {}).portrait || {}).ref ? [{ id: "portrait" }] : []);
  const gefuellt = felder.filter((f) => f.wert).length;
  const status = web.status || "entwurf";
  const domain = (felder.find((f) => f.id === "domain") || {}).wert;
  return <div>
    <Kopf titel="Website" ueber={`${gefuellt} von ${felder.length} Angaben da`}
      rechts={status === "live" ? <span className="hm-ez z-fertig">Live auf {domain}</span> : status === "pruefung" ? (teamSicht ? <Btn onClick={() => { set({ status: "live" }); hmEvent(m.id, "website", "Website live geschaltet", "Daniel"); toast("Live"); }}>Live schalten</Btn> : <span className="hm-ez z-wartet_team">In Prüfung bei Daniel</span>) : <Btn disabled={pflichtOffen.length > 0} onClick={() => { set({ status: "pruefung" }); hmEvent(m.id, "website", "Website zur Prüfung gesendet", m.name); toast("An Daniel zur Prüfung"); }}>{pflichtOffen.length ? `Noch ${pflichtOffen.length} Pflichtfelder` : "Zur Prüfung senden"}</Btn>} />
    {window.QuelleStand && <div style={{ margin: "-4px 0 12px" }}><QuelleStand m={m} kurz /></div>}
    <StilLeiste m={m} t={t} setVorschau={setVorschau} look={look} setLook={(n) => { set({ look: n }); setAlle(false); }} setAlle={setAlle} teamSicht={teamSicht} />
    {alle ? <WebWand m={m} t={t} geraet={geraet} setG={setG} look={look} web={web} bib={bib} felder={felder} waehle={(n) => { set({ look: n }); setAlle(false); }} zurueck={() => setAlle(false)} />
    : <div className="hm-web-split">
      <div className="hm-web-felder">
        <div className="hm-seg" style={{ marginBottom: 16 }}>{[["inhalte", "Inhalte"], ["bilder", "Bilder"], ["recht", "Rechtliches"]].map(([id, n]) => <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{n}</button>)}</div>
        {tab === "bilder" && <WebBilder m={m} web={web} set={set} />}
        {tab !== "bilder" && Object.entries(HM_WEB_GRUPPEN).filter(([g]) => (tab === "recht") === (g === "Recht")).map(([g, [titel, text]]) => { const l = textFelder.filter((f) => f.gruppe === g); if (!l.length) return null; return <div key={g} style={{ marginBottom: 22 }}>
          <div className="hm-sek" style={{ marginTop: 0 }}>{titel}<span className="hm-daten">{l.filter((f) => f.wert).length} / {l.length}</span></div>
          <div className="hm-gruppe" style={{ padding: "0 16px" }}>{l.map((f) => <WebFeld key={f.id} f={f} setF={setF} />)}</div>
          <div className="hm-mono" style={{ margin: "6px 4px 0" }}>{text}</div>
          {g === "Recht" && <div className="hm-pruefliste" style={{ margin: "12px 4px 0", fontSize: 13 }}>{hmImpressumCheck(Object.fromEntries(felder.map((f) => [f.id, f.wert]))).map((x) => <div key={x.t} className={x.ok ? "ok" : "nein"}><Ico n={x.ok ? "haken" : "x"} />{x.t}</div>)}</div>}
        </div>; })}
      </div>
      <div className="hm-web-vorschau"><WebVorschau m={m} t={t} look={look} geraet={geraet} setG={setG} web={web} bib={bib} felder={felder} setAlle={setAlle} pruef={pruef} setPruef={setPruef} /></div>
    </div>}
  </div>;
}

function hmWebBau(m, look, web, bib, felder, mini) {
  const b = hmBrand(m.id);
  const F = Object.fromEntries(felder.map((f) => [f.id, f.wert]));
  const karte = hmWebKarte(m.id, b, web, bib);
  return { F, karte, fokus: hmWebFokus(web), sig: JSON.stringify([look, F, karte, web.bilder, mini]) };
}
function useWebHtml(n, bau, mini, animiert) {
  const [html, setHtml] = React.useState(null);
  const [fehler, setFehler] = React.useState(null);
  React.useEffect(() => { if (!bau) return; let weg = false; const id = setTimeout(() => hmWebQuelle(n).then((q) => { if (!weg) { setHtml(hmWebHtml(q, n, bau.karte, { mini, animiert: !!animiert })); setFehler(null); } }).catch((e) => !weg && setFehler(e.message)), html ? 250 : 0); return () => { weg = true; clearTimeout(id); }; }, [n, bau && bau.sig, !!animiert]);
  return [html, fehler];
}

function GeraeteWahl({ geraet, setG }) {
  return <div className="hm-seg klein hm-geraete" role="radiogroup" aria-label="Gerät">{HM_WEB_GERAETE.map((g) => <button key={g.id} role="radio" aria-checked={geraet === g.id} className={geraet === g.id ? "on" : ""} onClick={() => setG(g.id)} title={`${g.name}, ${g.w} px`}><svg className="hm-ico" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={g.ico} /></svg><span>{g.name}</span></button>)}</div>;
}

function WebVorschau({ m, t, look, geraet, setG, web, bib, felder, setAlle, pruef, setPruef }) {
  const bau = useBauKlein(hmWebBau(m, look, web, bib, felder, false)) || { F: {}, karte: {}, fokus: {}, sig: "", leer: true };
  /* Bewegung: die Vorlage mit Scroll-Animation und weichem Scrollen (Lenis), zum Durchscrollen im Rahmen */
  const [bewegt, setBewegt] = React.useState(false);
  const [html, fehler] = useWebHtml(look, bau.leer ? null : bau, false, bewegt);
  const g = HM_WEB_GERAETE.find((x) => x.id === geraet);
  const b = hmBrand(m.id);
  const oeffnen = async () => {
    const w = window.open("", "_blank"); if (!w) { toast("Pop-up blockiert"); return; }
    const q = await hmWebQuelle(look);
    w.document.open(); w.document.write(hmWebHtml(q, look, bau.karte, { animiert: true })); w.document.close();
    const los = () => { try { hmWebThemeAnwenden(w.document, t); hmWebInhalt(w.document, bau.F, t, bau.karte, bau.fokus); setTimeout(() => hmWebPruefen(w.document), 900); } catch (e) { console.warn(e); } };
    if (w.document.readyState === "complete") los(); else w.addEventListener("load", los);
  };
  const fixes = (pruef || []).filter((x) => x.art === "fix"), fehlerL = (pruef || []).filter((x) => x.art === "fehler");
  return <div>
    <div className="hm-web-leiste">
      <span className="hm-row" style={{ gap: 10 }}><GeraeteWahl geraet={geraet} setG={setG} /><div className="hm-seg klein" role="radiogroup" aria-label="Darstellung"><button role="radio" aria-checked={!bewegt} className={!bewegt ? "on" : ""} onClick={() => setBewegt(false)} title="Fertiger Zustand, ohne Animation">Standbild</button><button role="radio" aria-checked={bewegt} className={bewegt ? "on" : ""} onClick={() => setBewegt(true)} title="Mit Scroll-Animation, im Rahmen scrollen">Bewegung</button></div></span>
      <span className="hm-row" style={{ gap: 14 }}><button className="hm-link" onClick={() => setAlle(true)}>Alle Looks</button><button className="hm-link" onClick={oeffnen}>Groß öffnen</button><button className="hm-link" onClick={() => { const ueber = window.hmQuelleThemaUeber && hmQuelleThemaUeber(m.id); const bo = window.hmMarkeB ? hmMarkeB(m.id, "oeffentlich") : b; hmWebsitePaket(m, bo, bau.F, look, ueber ? hmWebTheme(m.id, ueber) : t, bau.karte, bau.fokus).then(() => toast(ueber ? "Paket mit der freigegebenen Version geladen" : "Paket geladen")).catch((e) => { console.warn(e); toast("Paket konnte nicht erstellt werden"); }); }}>Paket</button></span>
    </div>
    {fehler ? <div className="hm-leer"><div className="t">Vorschau nicht erreichbar</div><div className="s">{fehler}</div></div>
      : <WebRahmen n={look} geraet={geraet} html={html} theme={t} F={bau.F} karte={bau.karte} fokus={bau.fokus} onPruef={setPruef} maxHoehe={geraet === "desktop" ? 640 : 700} />}
    <div className="hm-web-pruef">
      {pruef == null ? <span className="hm-daten">Wird geprüft</span> : fehlerL.length ? fehlerL.map((x) => <span key={x.t} className="nein"><Ico n="x" g={12} />{x.t}</span>) : <span className="ok"><Ico n="haken" g={12} />Geprüft: Namen passen, keine Platzhalter, alle Bilder da</span>}
      {(pruef || []).filter((x) => x.art === "hinweis").map((x) => <span key={x.t} className="hm-daten">{x.t}</span>)}
      {fixes.length > 0 && <span className="hm-daten">{fixes.length} automatisch eingepasst</span>}
      <span className="hm-daten" style={{ marginLeft: "auto" }}>{bewegt ? "Im Rahmen scrollen · " : ""}{g.w} px</span>
    </div>
  </div>;
}

/* Alle sechs Looks nebeneinander, live mit der Marke. Nur sichtbare Kacheln bauen. */
function WandKachel({ m, n, t, geraet, web, bib, felder, aktiv, waehle }) {
  const ref = React.useRef(null);
  const [sicht, setSicht] = React.useState(false);
  React.useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setSicht(true)), { rootMargin: "200px" }); io.observe(el); return () => io.disconnect(); }, []);
  const bau = useBauKlein(hmWebBau(m, n, web, bib, felder, true)) || { F: {}, karte: {}, fokus: {}, sig: "", leer: true };
  const [html] = useWebHtml(n, bau.leer ? null : bau, true);
  const [pr, setPr] = React.useState(null);
  const l = HM_LOOKS.find((x) => x.n === n);
  return <button ref={ref} className={"hm-wand-k" + (aktiv ? " on" : "")} onClick={() => waehle(n)}>
    {sicht ? <WebRahmen n={n} geraet={geraet} html={html} theme={t} F={bau.F} karte={bau.karte} fokus={bau.fokus} mini onPruef={setPr} /> : <div className="hm-wr mini" style={{ aspectRatio: geraet === "mobil" ? "390/844" : "1280/800" }} />}
    <span className="t">{String(n).padStart(2, "0")} {l.name}{aktiv ? " · gewählt" : ""}</span>
    <span className="s">{l.satz}{pr && pr.some((x) => x.art === "fehler") ? " · Hinweis in der Vorschau" : ""}</span>
  </button>;
}
function WebWand({ m, t, geraet, setG, look, web, bib, felder, waehle, zurueck }) {
  return <div style={{ marginTop: 18 }}>
    <div className="hm-web-leiste"><GeraeteWahl geraet={geraet === "tablet" ? "desktop" : geraet} setG={(g) => setG(g === "tablet" ? "desktop" : g)} /><button className="hm-link" onClick={zurueck}>Zurück zum Bearbeiten</button></div>
    <div className={"hm-wand" + (geraet === "mobil" ? " mobil" : "")}>{HM_LOOKS.map((l) => <WandKachel key={l.n} m={m} n={l.n} t={t} geraet={geraet === "mobil" ? "mobil" : "desktop"} web={web} bib={bib} felder={felder} aktiv={l.n === look} waehle={waehle} />)}</div>
    <div className="hm-mono" style={{ marginTop: 10 }}>Farbe, Schrift, Logo und Grundton oben ändern: alle sechs Looks folgen sofort. Ein Klick wählt den Look.</div>
  </div>;
}

/* Paket: genau die Vorschau, als eigenständige Seite. Bilder als Dateien, Theme und Inhalte per eingebettetem Skript. */
async function hmWebsitePaket(m, b, F, look, t, karte, fokus) {
  t = t || hmWebTheme(m.id);
  if (!karte) { const web = (hmStore.get("website") || {})[m.id] || {}; await hmWebBlobsLaden(m.id); karte = hmWebKarte(m.id, b, web, hmBildBibliothek(m.id)); fokus = hmWebFokus(web); }
  const JSZip = await hmJszip(); const zip = new JSZip();
  const basis = location.pathname.startsWith("/ux/") ? location.origin + "/" : "https://www.unio.at/";
  const neu = {}; const umbenannt = {}; let i = 0;
  for (const [k, u] of Object.entries(karte)) {
    if (typeof u !== "string") continue;
    if (!u) { neu[k] = ""; continue; }
    if (umbenannt[u]) { neu[k] = umbenannt[u]; continue; }
    try { const bl = await (await fetch(u)).blob(); const ext = (bl.type.split("/")[1] || "jpg").replace("jpeg", "jpg").replace("svg+xml", "svg").replace(/;.*$/, ""); const p = `bilder/${String(++i).padStart(2, "0")}-${k}.${ext}`; zip.file(p, bl); neu[k] = umbenannt[u] = p; } catch (e) { neu[k] = u; }
  }
  const fokusNeu = {}; Object.entries(fokus || {}).forEach(([s, p]) => { fokusNeu[s] = p; });
  const q = await hmWebQuelle(look);
  let html = hmWebHtml(q, look, neu, { animiert: true, basis: "./" }).replace('<base href="./">', "");
  const quelle = [hmWebRgb, hmWebLum, hmWebKontrast, hmWebMix, hmWebMixHex, hmWebAkzentText, hmWebThemeAnwenden, hmWebObjekte, hmWebInhalt, hmWebPruefen].map((f) => f.toString());
  const helfer = new Set();
  const sammle = (txt) => (txt.match(/\b_[a-zA-Z]+\b/g) || []).forEach((n) => { if (!helfer.has(n) && n !== "_loop" && typeof window[n] === "function") { helfer.add(n); sammle(window[n].toString()); } });
  quelle.forEach(sammle);
  const tt = { ...t, welt: t.welt ? { name: t.welt.name, farben: t.welt.farben } : null };
  const skript = `<script>
/* Werkbank: Website ${b.makler.name}, Look ${look}, erzeugt am ${new Date().toLocaleDateString("de-AT")}. */
var HM_BASIS = ${JSON.stringify(basis)};
var hmAbs = function (u) { return new URL(u.replace(/^(\\.\\.\\/)+/, ""), HM_BASIS).href; };
var HM_WEB_GF = ${JSON.stringify(HM_WEB_GF)};
${[...helfer].map((n) => window[n].toString()).join("\n")}
${quelle.join("\n")}
window.addEventListener("load", function () { var t = ${JSON.stringify(tt)}; hmWebThemeAnwenden(document, t); hmWebInhalt(document, ${JSON.stringify(F)}, t, ${JSON.stringify(neu)}, ${JSON.stringify(fokusNeu)}); setTimeout(function () { hmWebPruefen(document); }, 800); });
</scr` + `ipt>`;
  zip.file("index.html", html.replace("</body>", skript + "\n</body>"));
  zip.file("LIESMICH.txt", `Website ${b.makler.name}, Look ${look}.\n\nindex.html im Browser öffnen oder den Ordner auf einen Webspace laden.\nVor dem Livegang: Domain ${F.domain || ""}, Impressum und Datenschutz prüfen.\nBilder liegen im Ordner bilder. Objektdaten sind Beispiele aus dem UNIO-Bestand.\n`);
  hmLaden(await zip.generateAsync({ type: "blob" }), `${hmDateiname(b.vor + "-" + b.nach)}-website.zip`);
}

function hmSelbsttestWeb() {
  const out = []; const t2 = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: e.message }); } };
  const mid = "markus";
  const t = hmWebTheme(mid);
  t2("Theme aus kuratierten Listen", () => ({ ok: HM_WEB_AKZENTE.some((x) => x.hex === t.akzent) && !!HM_WEB_SCHRIFTEN[t.schriftId] && (HM_LOGO_TYPEN.some((x) => x.id === t.logo) || (t.logo === "konzept" && !!hmBrand(mid).logoKonzept)), detail: `${t.akzentName}, ${t.schrift.name}, ${t.logo}, ${t.grundton}` }));
  t2("Akzent als Text lesbar", () => { const alle = HM_WEB_AKZENTE.map((a) => { const tt = { ...t, akzent: a.hex }; return [a.name, hmWebKontrast(hmWebAkzentText(tt), tt.grund)]; }); const schlecht = alle.filter(([, k]) => k < 3); return { ok: !schlecht.length, detail: schlecht.map((x) => x[0]).join(", ") || "alle ab 3 zu 1" }; });
  t2("Vorschau ohne Scroll-Animation", () => { const h = hmWebHtml('<html><head></head><body><script>var IMG = __HM_IMG__;</script></body></html>', 1, { hero: "a.png" }, {}); return { ok: h.includes("prefers-reduced-motion") && h.includes('"hero":"a.png"') && h.includes("<base href=") }; });
  t2("Bildfelder und Bibliothek", () => { const bib = hmBildBibliothek(mid); const k = hmWebKarte(mid, hmBrand(mid), { bilder: { life1: { ref: bib.find((x) => x.gruppe === "archiv").ref } } }, bib); return { ok: bib.length >= 20 && k.life1 === bib.find((x) => x.gruppe === "archiv").url && !!k.neubau && Object.keys(k).length >= 21, detail: `${bib.length} Bilder in der Bibliothek` }; });
  t2("Zeichengrenzen", () => ({ ok: HM_WEB_LIMITS.headline === 70 && HM_WEB_LIMITS.bio >= 280 }));
  return out;
}

Object.assign(window, { HM_WEB_GERAETE, HM_WEB_SLOTS, hmWebTheme, hmWebThemeAnwenden, hmWebHtml, hmWebQuelle, hmWebInhalt, hmWebPruefen, hmWebKarte, hmBildBibliothek, hmWebBildSpeichern, hmWebDateienHoch, hmWebBlobsLaden, useBildBibliothek, Website, WebVorschau, WebRahmen, StilLeiste, WebBilder, BildWahl, hmWebsitePaket, hmSelbsttestWeb, hmWebAkzentText, hmWebKontrast });
