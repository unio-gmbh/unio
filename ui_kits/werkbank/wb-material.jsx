/* Werkbank. Materialherstellung: jede Vorlage (HTML oder SVG im DOM) wird zur PNG-Datei.
   Eigener Exporter nach dem Prinzip von html-to-image: Element klonen, berechnete Stile inline, Bilder als data-URL,
   Schriften (Google Fonts und Power Grotesk) als eingebettete @font-face, dann SVG foreignObject auf Canvas.
   Das Materialpaket bündelt Profil-Posts, Stories, Visitenkarte, Exposé-Titel, Signatur und das Markenbuch als ZIP. */

const hmMatCache = {};
async function hmAlsDataUrl(url) {
  if (!url || url.startsWith("data:")) return url;
  if (hmMatCache[url]) return hmMatCache[url];
  const blob = await (await fetch(url)).blob();
  return (hmMatCache[url] = await new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(blob); }));
}
/* Schriften der Marke als eingebettetes CSS (woff2 als data-URL) */
async function hmSchriftCss(familien) {
  const teile = [];
  const google = familien.filter((f) => f && f !== "Power Grotesk");
  if (google.length) {
    const url = "https://fonts.googleapis.com/css2?" + google.map((f) => "family=" + encodeURIComponent(f) + ":wght@400;500;600;700").join("&") + "&display=swap";
    const k = "css:" + url;
    if (!hmMatCache[k]) {
      let css = await (await fetch(url)).text();
      /* nur latin-Blöcke behalten, Dateien einbetten */
      const bloecke = css.split("}").filter((b) => b.includes("@font-face") && (!b.includes("/*") || /\/\* (latin|latin-ext) \*\//.test(b)));
      const aus = [];
      for (const b of bloecke) { const m = b.match(/url\((https:[^)]+)\)/); if (!m) continue; aus.push(b.replace(m[1], await hmAlsDataUrl(m[1])) + "}"); }
      hmMatCache[k] = aus.join("\n");
    }
    teile.push(hmMatCache[k]);
  }
  if (familien.includes("Power Grotesk")) {
    for (const [w, d] of [[400, "Regular"], [500, "Medium"], [700, "Bold"]]) teile.push(`@font-face{font-family:"Power Grotesk";font-weight:${w};src:url(${await hmAlsDataUrl(new URL(`../../assets/fonts/PowerGrotesk-${d}.woff2`, location.href).href)}) format("woff2")}`);
  }
  return teile.join("\n");
}
function hmStileInline(quelle, ziel) {
  const cs = getComputedStyle(quelle);
  let s = ""; for (let i = 0; i < cs.length; i++) { const p = cs[i]; s += `${p}:${cs.getPropertyValue(p)};`; }
  ziel.setAttribute("style", s);
  const q = quelle.children, z = ziel.children;
  for (let i = 0; i < q.length; i++) if (z[i]) hmStileInline(q[i], z[i]);
}
async function hmBilderInline(el) {
  for (const im of el.querySelectorAll("img")) { try { im.setAttribute("src", await hmAlsDataUrl(im.currentSrc || im.src)); } catch (e) {} }
  for (const im of el.querySelectorAll("image")) { const h = im.getAttribute("href") || im.getAttribute("xlink:href"); if (h) { try { im.setAttribute("href", await hmAlsDataUrl(new URL(h, location.href).href)); } catch (e) {} } }
  for (const x of el.querySelectorAll("*")) { const bg = x.style.backgroundImage; const m = bg && bg.match(/url\("?([^")]+)"?\)/); if (m && !m[1].startsWith("data:")) { try { x.style.backgroundImage = `url("${await hmAlsDataUrl(new URL(m[1], location.href).href)}")`; } catch (e) {} } }
}
/* Element als PNG in Zielbreite (z. B. 1080) */
async function hmAlsPng(el, breite, familien, hoehe) {
  const r = el.getBoundingClientRect();
  const w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
  const klon = el.cloneNode(true);
  hmStileInline(el, klon);
  klon.style.margin = "0"; klon.style.transform = "none";
  await hmBilderInline(klon);
  /* verwendete Schriften aus dem Element sammeln, nur echte Webfonts */
  const gefunden = new Set(familien || []);
  [el, ...el.querySelectorAll("*")].forEach((x) => { const f = getComputedStyle(x).fontFamily.split(",")[0].replace(/["']/g, "").trim(); if (f && !/^(ui-|system-ui|sans-serif|serif|monospace|Georgia|-apple)/.test(f)) gefunden.add(f); });
  const css = await hmSchriftCss([...gefunden]);
  const xml = new XMLSerializer().serializeToString(klon);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><foreignObject x="0" y="0" width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>${css}</style>${xml}</div></foreignObject></svg>`;
  const img = new Image();
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  await img.decode();
  const k = breite / w;
  const c = document.createElement("canvas"); c.width = Math.round(w * k); c.height = hoehe || Math.round(h * k);
  const g = c.getContext("2d"); g.scale(k, (hoehe || h * k) / h); g.drawImage(img, 0, 0);
  return new Promise((res) => c.toBlob(res, "image/png"));
}

/* Materialpaket: sucht die Vorlagen im Markenbuch (data-material) und packt sie als PNG, dazu Signatur als HTML */
async function hmMaterialPaket(m, stand) {
  /* Öffentliche Ausgabe: die freigegebene Version der Marke, falls vorhanden */
  const b = window.hmMarkeB ? hmMarkeB(m.id, "oeffentlich") : hmBrand(m.id);
  const JSZip = await hmJszip(); const zip = new JSZip();
  const slug = hmDateiname(b.vor + "-" + b.nach);
  const fam = [b.schrift.d, b.schrift.t];
  const teile = [...document.querySelectorAll("[data-material]")];
  for (let i = 0; i < teile.length; i++) {
    const el = teile[i]; const [ordner, name, breite, hoehe] = el.dataset.material.split("|");
    stand && stand(`${i + 1} von ${teile.length}: ${name}`);
    try { zip.file(`${ordner}/${slug}-${name}.png`, await hmAlsPng(el.firstElementChild || el, +breite || 1080, fam, +hoehe || 0)); } catch (e) { console.warn("Material", name, e); }
    if (ordner === "signatur") zip.file(`signatur/${slug}-signatur.html`, `<!doctype html><meta charset="utf-8">${(el.firstElementChild || el).outerHTML}`);
  }
  stand && stand("Logos");
  if (b.logo === "konzept" && b.logoKonzept && window.hmLkSvgPfade) { try { zip.file(`logo/${slug}-logo.svg`, await hmLkSvgPfade(b.logoKonzept, b)); zip.file(`logo/${slug}-logo-hell.svg`, await hmLkSvgPfade(b.logoKonzept, b, { invert: true })); } catch (e) { zip.file(`logo/${slug}-logo.svg`, hmLkSvgText(b.logoKonzept, b)); } }
  else if (window.hmLogoSvg) for (const t of HM_LOGO_TYPEN) zip.file(`logo/${slug}-${t.id}.svg`, await hmLogoSvg(b, t.id));
  if (b.portrait) zip.file(`portrait/${slug}-portrait.png`, await (await fetch(b.portrait)).blob());
  const p = window.hmMbPlattform ? hmMbPlattform(m.id) : null;
  if (p) zip.file("markenplattform.json", JSON.stringify(p, null, 2));
  stand && stand("Wird gepackt");
  hmLaden(await zip.generateAsync({ type: "blob" }), `${slug}-materialpaket.zip`);
  return teile.length;
}
function MaterialKnopf({ m }) {
  const [stand, setStand] = React.useState(null);
  const los = async () => { try { const n = await hmMaterialPaket(m, setStand); toast(`${n} Materialien als PNG, dazu Logos und Porträt`); } catch (e) { console.warn(e); toast("Materialpaket konnte nicht erstellt werden"); } setStand(null); };
  return <button className="hm-link" disabled={!!stand} onClick={los}>{stand || "Materialpaket laden"}</button>;
}

Object.assign(window, { hmAlsDataUrl, hmSchriftCss, hmAlsPng, hmMaterialPaket, MaterialKnopf });
