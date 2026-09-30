/* Werkbank. Logo-Werkstatt nach dem Looka-Prinzip, aber aus der Marke statt aus dem Katalog.
   Looka und Brandmark: Vorlieben über Beispiele, viele Entwürfe, die dazulernen, jeder Entwurf sofort im Einsatz.
   Bewusst anders (Prozess v2, C5): keine Clipart-Symbole, keine freie Farbwahl. Zeichen kommen aus der Idee und der Markenwelt,
   Schriften aus einem kuratierten Pool, Farben aus dem Branding. Das Team kuratiert, der Makler urteilt am Markenvertrag.
   Ein Entwurf ist eine kleine Spezifikation (spec). hmLkLayout macht daraus Bauteile, die als SVG-Text (Vorschau, Website)
   oder als Pfade (Export, hmFontDatei plus hmTextPfad) ausgegeben werden. */

const HM_LK_SCHRIFTEN = [
  { f: "Newsreader", k: "serif", w: [400, 500] }, { f: "Fraunces", k: "serif", w: [400, 600] }, { f: "Playfair Display", k: "serif", w: [400, 600] },
  { f: "DM Serif Display", k: "serif", w: [400] }, { f: "Instrument Sans", k: "sans", w: [400, 500, 600] }, { f: "Space Grotesk", k: "sans", w: [400, 600] },
  { f: "Manrope", k: "sans", w: [400, 600] }, { f: "Hanken Grotesk", k: "sans", w: [400, 600] },
];
const HM_LK_ARTEN = [
  { id: "satz", name: "Wortmarke" }, { id: "gesperrt", name: "Versalien gesperrt" }, { id: "gestapelt", name: "Gestapelt" },
  { id: "monogramm", name: "Monogramm" }, { id: "zeichen", name: "Zeichen und Name" }, { id: "teilung", name: "Maßstab" }, { id: "punkt", name: "Name mit Punkt" },
];
const HM_LK_RICHTUNGEN = [
  { id: "antiqua", name: "Antiqua, leise", arten: ["satz", "gestapelt"], k: "serif" },
  { id: "grotesk", name: "Grotesk, gesperrt", arten: ["gesperrt", "teilung"], k: "sans" },
  { id: "zeichen", name: "Mit Zeichen", arten: ["zeichen"] },
  { id: "initialen", name: "Initialen", arten: ["monogramm"] },
];
/* Zeichen je Markenwelt, dazu die Ratlinie, wenn die Idee vom Rat handelt */
const HM_LK_WELT_ZEICHEN = { ruhig: "fenster", editorial: "folio", graetzl: "graetzl", klar: "schriftfeld", warm: "bogen", kontrast: "kante" };
const HM_LK_ZEICHEN_NAME = { ratlinie: "Ratlinie", fenster: "Fenster 3:4", folio: "Folio", graetzl: "Grätzl-Linie", schriftfeld: "Schriftfeld", bogen: "Bogen", kante: "Kante" };
const HM_LK_KRITERIEN = ["Passt zur Haltung aus dem Markenvertrag", "Im Profilbild klein noch lesbar", "Verwechselt man mit keinem anderen Makler"];

function hmLkZufall(seed) { let a = 0; for (const ch of String(seed)) a = (Math.imul(a, 31) + ch.charCodeAt(0)) | 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function hmLkKontext(mid) {
  const b = hmBrand(mid);
  const welt = window.hmMbWelt ? hmMbWelt(mid, window.hmMbPlattform ? hmMbPlattform(mid) : null) : null;
  const idee = [b.claim, b.br.claim, welt && welt.zeichen && welt.zeichen.name].filter(Boolean).join(" ");
  const zeichen = [/\bRat\b/i.test(idee) ? "ratlinie" : null, welt ? HM_LK_WELT_ZEICHEN[welt.id] : null].filter(Boolean);
  if (!zeichen.length) zeichen.push("fenster");
  return { b, welt, zeichen };
}

/* Entwürfe: gleichmäßig über die Arten, Schriften aus dem Branding bevorzugt */
function hmLkKonzepte(mid, opt) {
  const o = opt || {}; const k = hmLkKontext(mid); const b = k.b;
  const r = hmLkZufall(mid + "|" + (o.runde || 0) + "|" + (o.basis ? o.basis.id : "") + "|" + (o.richtungen || []).join(","));
  const wahl = (l) => l[Math.floor(r() * l.length)];
  const markeD = HM_LK_SCHRIFTEN.find((x) => x.f === b.schrift.d), markeT = HM_LK_SCHRIFTEN.find((x) => x.f === b.schrift.t);
  const richt = HM_LK_RICHTUNGEN.filter((x) => (o.richtungen || []).includes(x.id));
  const arten = richt.length ? [...new Set(richt.flatMap((x) => x.arten))] : HM_LK_ARTEN.map((x) => x.id);
  const klasse = richt.map((x) => x.k).filter(Boolean);
  const pool = HM_LK_SCHRIFTEN.filter((x) => !klasse.length || klasse.includes(x.k));
  const schrift = () => { const z = r(); const s = z < 0.45 && markeD && pool.includes(markeD) ? markeD : z < 0.65 && markeT && pool.includes(markeT) ? markeT : wahl(pool.length ? pool : HM_LK_SCHRIFTEN); return s; };
  const n = o.anzahl || 18; const out = [];
  for (let i = 0; i < n; i++) {
    let art, s;
    if (o.basis) { art = o.basis.art; const gleiche = HM_LK_SCHRIFTEN.filter((x) => x.k === (HM_LK_SCHRIFTEN.find((y) => y.f === o.basis.font) || {}).k); s = i === 0 ? HM_LK_SCHRIFTEN.find((x) => x.f === o.basis.font) || wahl(gleiche) : wahl(gleiche.length ? gleiche : HM_LK_SCHRIFTEN); }
    else { art = arten[i % arten.length]; s = schrift(); }
    const versal = art === "gesperrt" || art === "teilung" ? true : art === "satz" ? r() < 0.15 : false;
    const spec = {
      art, font: s.f, gewicht: wahl(s.w), versal,
      laufweite: art === "gesperrt" ? 0.16 + r() * 0.16 : art === "teilung" ? 0 : art === "satz" ? -0.02 + r() * 0.04 : 0.02,
      zeichen: art === "zeichen" ? (o.basis && o.basis.zeichen && i < n / 2 ? o.basis.zeichen : wahl(k.zeichen)) : null,
      lage: art === "zeichen" ? (r() < 0.5 ? "links" : "oben") : art === "monogramm" ? (r() < 0.5 ? "gestapelt" : "nebeneinander") : null,
      akzent: art === "punkt" || art === "zeichen" || r() < 0.3,
    };
    if (o.basis && i > 0) { spec.laufweite = Math.max(-0.03, (o.basis.laufweite || 0) + (r() - 0.5) * 0.08); spec.lage = o.basis.lage && r() < 0.6 ? o.basis.lage : spec.lage; }
    spec.id = "lk" + hmLkZufall(JSON.stringify(spec))().toString(36).slice(2, 9);
    if (!out.some((x) => x.id === spec.id)) out.push(spec);
  }
  return out;
}

/* Messen: Vorschau mit Canvas, Export mit echten Schriftmetriken */
const HM_LK_MESS = { ctx: null };
function hmLkMessCanvas(text, font, gewicht, size, ls) {
  if (!HM_LK_MESS.ctx) HM_LK_MESS.ctx = document.createElement("canvas").getContext("2d");
  const x = HM_LK_MESS.ctx; x.font = `${gewicht} ${size}px "${font}"`;
  return x.measureText(text).width + Math.max(0, [...text].length - 1) * (ls || 0) * size;
}
function hmLkName(b, spec) { const n = `${b.vor} ${b.nach}`.trim(); return spec.versal ? n.toUpperCase() : n; }

/* Bauteile eines Entwurfs, in Einheiten mit Höhe um 100 */
function hmLkLayout(spec, b, mess) {
  const M = mess || hmLkMessCanvas; const ink = "INK", akz = "AKZ";
  const T = (text, x, y, size, o) => ({ typ: "text", text, x, y, size, font: (o && o.font) || spec.font, gewicht: (o && o.gewicht) || spec.gewicht, ls: o && o.ls != null ? o.ls : spec.laufweite, fill: (o && o.fill) || ink, anchor: (o && o.anchor) || "start" });
  const teile = []; let W = 0, H = 100;
  const zeichen = (z, x, y, g) => hmLkZeichenTeile(z, x, y, g, spec.akzent ? akz : ink, ink, b);
  if (spec.art === "satz" || spec.art === "punkt") {
    const name = hmLkName(b, spec); const size = 52; const w = M(name, spec.font, spec.gewicht, size, spec.laufweite);
    teile.push(T(name, 0, 66, size)); W = w;
    if (spec.art === "punkt") { teile.push({ typ: "kreis", cx: w + 9, cy: 62, r: 6, fill: akz }); W = w + 16; }
    H = 90;
  } else if (spec.art === "gesperrt") {
    const name = hmLkName(b, spec); const size = 30; teile.push(T(name, 0, 58, size)); W = M(name, spec.font, spec.gewicht, size, spec.laufweite); H = 80;
    if (spec.akzent) { teile.push({ typ: "rect", x: 0, y: 70, w: 24, h: 2.5, fill: akz }); }
  } else if (spec.art === "gestapelt") {
    const vor = b.vor.toUpperCase(), nach = b.nach; const s1 = 17, s2 = 54;
    teile.push(T(vor, 2, 26, s1, { ls: 0.3, gewicht: Math.min(600, spec.gewicht + 100) }));
    teile.push(T(nach, 0, 86, s2, { ls: -0.015 }));
    W = Math.max(M(vor, spec.font, Math.min(600, spec.gewicht + 100), s1, 0.3) + 2, M(nach, spec.font, spec.gewicht, s2, -0.015)); H = 100;
    if (spec.akzent) teile.push({ typ: "rect", x: 2, y: 36, w: 18, h: 2.5, fill: akz });
  } else if (spec.art === "monogramm") {
    const [a, c] = [b.vor[0] || "", b.nach[0] || ""];
    if (spec.lage === "gestapelt") {
      const s = 50; const wa = M(a, spec.font, spec.gewicht, s, 0), wc = M(c, spec.font, spec.gewicht, s, 0); W = Math.max(wa, wc) + 4;
      teile.push(T(a, W / 2, 46, s, { anchor: "middle", ls: 0 }), T(c, W / 2, 98, s, { anchor: "middle", ls: 0 })); H = 108;
      teile.push({ typ: "rect", x: 2, y: 54, w: W - 4, h: 2, fill: spec.akzent ? akz : ink });
    } else {
      const s = 70; const wa = M(a, spec.font, spec.gewicht, s, 0), wc = M(c, spec.font, spec.gewicht, s, 0);
      teile.push(T(a, 0, 76, s, { ls: 0 }), { typ: "rect", x: wa + 10, y: 18, w: 2.5, h: 64, fill: spec.akzent ? akz : ink }, T(c, wa + 22, 76, s, { ls: 0 })); W = wa + 22 + wc; H = 96;
    }
  } else if (spec.art === "zeichen") {
    const name = hmLkName(b, spec); const size = 40; const w = M(name, spec.font, spec.gewicht, size, spec.laufweite);
    if (spec.lage === "oben") { const g = 58; const zw = zeichen(spec.zeichen, 0, 0, g); teile.push(...zw.teile, T(name, 0, g + 50, size)); W = Math.max(zw.w, w); H = g + 62; }
    else { const g = 64; const zw = zeichen(spec.zeichen, 0, 8, g); teile.push(...zw.teile, T(name, zw.w + 18, 58, size)); W = zw.w + 18 + w; H = 84; }
  } else if (spec.art === "zeichen-nur") {
    const zw = zeichen(spec.zeichen || "fenster", 4, 4, 64); teile.push(...zw.teile); W = zw.w + 6; H = 72;
  } else if (spec.art === "teilung") {
    /* Maßstab: jeder Buchstabe in einer Zelle gleicher Breite, darunter die Teilung */
    const name = hmLkName(b, spec).split(""); const size = 30; const zelle = size * 0.74;
    name.forEach((ch, i) => { if (ch.trim()) teile.push(T(ch, i * zelle + zelle / 2, 52, size, { anchor: "middle", ls: 0 })); });
    W = name.length * zelle; H = 84;
    teile.push({ typ: "rect", x: 0, y: 66, w: W, h: 1.5, fill: ink });
    name.forEach((ch, i) => teile.push({ typ: "rect", x: i * zelle, y: i % 5 === 0 ? 60 : 63, w: 1.5, h: i % 5 === 0 ? 7.5 : 4.5, fill: ink }));
    teile.push({ typ: "rect", x: W - 1.5, y: 60, w: 1.5, h: 7.5, fill: ink });
    if (spec.akzent) teile.push({ typ: "rect", x: 0, y: 66, w: zelle * 2, h: 1.5, fill: akz });
  }
  return { teile, W: Math.ceil(W + 2), H };
}
function hmLkZeichenTeile(z, x, y, g, akz, ink, b) {
  const t = [];
  if (z === "ratlinie") { const w = g * 1.1; t.push({ typ: "rect", x, y: y + g * 0.14, w: g * 0.08, h: g * 0.72, fill: akz }, { typ: "rect", x: x + g * 0.08, y: y + g * 0.48, w: w - g * 0.16, h: g * 0.04, fill: akz }, { typ: "rect", x: x + w - g * 0.08, y: y + g * 0.3, w: g * 0.08, h: g * 0.4, fill: akz }); return { teile: t, w }; }
  if (z === "fenster") { const w = g * 0.75; t.push({ typ: "rahmen", x, y, w: w - g * 0.1, h: g - g * 0.1, s: g * 0.05, fill: ink }, { typ: "rect", x: x + g * 0.1, y: y + g - g * 0.08, w: w - g * 0.1, h: g * 0.05, fill: akz }, { typ: "rect", x: x + w - g * 0.05, y: y + g * 0.1, w: g * 0.05, h: g - g * 0.13, fill: akz }); return { teile: t, w }; }
  if (z === "bogen") { const w = g * 0.72; t.push({ typ: "pfad", d: `M${x} ${y + w / 2}A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2}L${x + w} ${y + g}L${x} ${y + g}Z`, fill: akz }); return { teile: t, w }; }
  if (z === "kante") { const w = g; t.push({ typ: "rahmen", x, y, w, h: g, s: g * 0.04, fill: ink }, { typ: "rect", x, y: y + g * 0.618, w, h: g * 0.382, fill: ink }, { typ: "rect", x, y: y + g * 0.6, w: w * 0.4, h: g * 0.05, fill: akz }); return { teile: t, w }; }
  if (z === "schriftfeld") { const w = g * 1.2, zw = w / 3, zh = g / 3; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) t.push({ typ: "rahmen", x: x + i * zw, y: y + j * zh, w: zw, h: zh, s: g * 0.025, fill: ink }); t.push({ typ: "rect", x: x + 2 * zw, y: y + 2 * zh, w: zw, h: zh, fill: akz }); return { teile: t, w }; }
  if (z === "graetzl") { const w = g * 1.2; const r = hmLkZufall(b.vor + b.nach); let px = x, py = y + g * 0.7, d = `M${px} ${py}`; for (let i = 0; i < 4; i++) { px += w / 4; py = y + g * (0.2 + r() * 0.6); d += `L${px.toFixed(1)} ${py.toFixed(1)}`; } t.push({ typ: "linie", d, s: g * 0.05, fill: ink }, { typ: "kreis", cx: px, cy: py, r: g * 0.08, fill: akz }); return { teile: t, w: w + g * 0.1 }; }
  /* folio */ { const w = g * 0.9; t.push({ typ: "rect", x, y: y + g * 0.7, w, h: g * 0.04, fill: ink }, { typ: "text", text: "01", x, y: y + g * 0.6, size: g * 0.46, font: "Instrument Sans", gewicht: 500, ls: 0, fill: akz, anchor: "start" }); return { teile: t, w }; }
}

function hmLkFarben(b, farbe, invert) { return { INK: invert ? "#F7F5F1" : (farbe || "#0B0A09"), AKZ: b.akzent || "#B17834" }; }
/* Bauteile als SVG. text: wie ein Textteil ausgegeben wird (als <text> oder als Pfad) */
function hmLkBauteileSvg(L, F, textFn, opt) {
  const esc = (x) => String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const el = L.teile.map((t) => {
    const fill = F[t.fill] || t.fill;
    if (t.typ === "text") return textFn(t, fill, esc);
    if (t.typ === "rect") return `<rect x="${t.x.toFixed(1)}" y="${t.y.toFixed(1)}" width="${t.w.toFixed(1)}" height="${t.h.toFixed(1)}" fill="${fill}"/>`;
    if (t.typ === "rahmen") return `<rect x="${(t.x + t.s / 2).toFixed(1)}" y="${(t.y + t.s / 2).toFixed(1)}" width="${(t.w - t.s).toFixed(1)}" height="${(t.h - t.s).toFixed(1)}" fill="none" stroke="${fill}" stroke-width="${t.s.toFixed(1)}"/>`;
    if (t.typ === "kreis") return `<circle cx="${t.cx.toFixed(1)}" cy="${t.cy.toFixed(1)}" r="${t.r.toFixed(1)}" fill="${fill}"/>`;
    if (t.typ === "pfad") return `<path d="${t.d}" fill="${fill}"/>`;
    if (t.typ === "linie") return `<path d="${t.d}" fill="none" stroke="${fill}" stroke-width="${t.s.toFixed(1)}" stroke-linejoin="round" stroke-linecap="round"/>`;
    return "";
  }).join("");
  const o = opt || {};
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L.W} ${L.H}"${o.hoehe ? ` height="${o.hoehe}"` : ""} role="img" aria-label="${esc(o.label || "Logo")}">${el}</svg>`;
}
/* SVG als Text: Vorschau, Website-Kopf, Download ohne Pfade */
function hmLkSvgText(spec, b, o) {
  const opt = o || {}; const L = hmLkLayout(spec, b); const F = hmLkFarben(b, opt.farbe, opt.invert);
  return hmLkBauteileSvg(L, F, (t, fill, esc) => `<text x="${t.x.toFixed(1)}" y="${t.y}" font-family="&quot;${t.font}&quot;, serif" font-weight="${t.gewicht}" font-size="${t.size}" letter-spacing="${(t.ls * t.size).toFixed(2)}" text-anchor="${t.anchor}" fill="${fill}">${esc(t.text)}</text>`, { hoehe: opt.hoehe, label: b.vor + " " + b.nach });
}
/* Export: Schrift in Pfade, unabhängig von installierten Schriften. Maße aus den echten Schriftmetriken */
async function hmLkSvgPfade(spec, b, o) {
  const opt = o || {}; const F = hmLkFarben(b, opt.farbe, opt.invert);
  const fonts = {};
  for (const t of hmLkLayout(spec, b, () => 10).teile.filter((x) => x.typ === "text")) { const k = t.font + "|" + t.gewicht; if (!fonts[k]) fonts[k] = await hmFontDatei(t.font, t.gewicht); }
  const f = (font, gewicht) => fonts[font + "|" + gewicht] || Object.values(fonts)[0];
  const L = hmLkLayout(spec, b, (text, font, gewicht, size, ls) => hmTextPfad(f(font, gewicht), text, 0, 0, size, ls || 0).breite);
  return hmLkBauteileSvg(L, F, (t, fill) => { const ff = f(t.font, t.gewicht); const w = hmTextPfad(ff, t.text, 0, 0, t.size, t.ls).breite; const x = t.anchor === "middle" ? t.x - w / 2 : t.x; return `<path d="${hmTextPfad(ff, t.text, x, t.y, t.size, t.ls).d}" fill="${fill}"/>`; }, { label: b.vor + " " + b.nach });
}
async function hmLkLaden(spec, b) {
  try { const svg = await hmLkSvgPfade(spec, b); hmLaden(new Blob([svg], { type: "image/svg+xml" }), `${hmDateiname(b.vor + "-" + b.nach)}-logo-${spec.art}.svg`); }
  catch (e) { console.warn(e); hmLaden(new Blob([hmLkSvgText(spec, b)], { type: "image/svg+xml" }), `${hmDateiname(b.vor + "-" + b.nach)}-logo-${spec.art}.svg`); }
}
/* Schriften des Pools laden, dann neu setzen */
let hmLkSchriftenP = null;
function hmLkSchriftenLaden() {
  if (!hmLkSchriftenP) hmLkSchriftenP = Promise.all(HM_LK_SCHRIFTEN.flatMap((s) => s.w.map((w) => document.fonts.load(`${w} 40px "${s.f}"`).catch(() => null)))).then(() => true);
  return hmLkSchriftenP;
}
function useLkSchriften() { const [da, setDa] = React.useState(false); React.useEffect(() => { let weg = false; hmLkSchriftenLaden().then(() => !weg && setDa(true)); return () => { weg = true; }; }, []); return da; }

function LogoKonzept({ spec, b, h = 44, farbe, invert, style }) {
  const svg = hmLkSvgText(spec, b, { farbe, invert });
  return <span className="hm-lk-logo" style={{ height: h, display: "inline-block", ...(style || {}) }} dangerouslySetInnerHTML={{ __html: svg.replace("<svg ", `<svg height="${h}" `) }} />;
}
/* Monogramm oder Zeichen für runde Flächen, aus demselben Entwurf abgeleitet */
function hmLkProfilSpec(spec) { return spec.art === "zeichen" ? { ...spec, art: "zeichen-nur" } : { ...spec, art: "monogramm", versal: false, lage: spec.art === "monogramm" ? spec.lage : "nebeneinander" }; }

function LogoImEinsatz({ spec, b }) {
  const papier = "#F5F1EA", nacht = "#141210";
  return <div className="hm-lk-einsatz">
    <figure><div className="hm-lk-profil" style={{ background: papier }}><LogoKonzept spec={hmLkProfilSpec(spec)} b={b} h={spec.art === "zeichen" ? 50 : 46} /></div><figcaption>Profilbild</figcaption></figure>
    <figure><div className="hm-lk-karte" style={{ background: papier }}><LogoKonzept spec={spec} b={b} h={spec.art === "monogramm" ? 34 : 22} /><div className="k">{b.claim}</div></div><figcaption>Visitenkarte</figcaption></figure>
    <figure><div className="hm-lk-kopf"><LogoKonzept spec={spec} b={b} h={spec.art === "monogramm" ? 26 : 16} /><span>Objekte</span><span>Verkaufen</span><i style={{ background: b.akzent }}>Erstgespräch</i></div><figcaption>Website</figcaption></figure>
    <figure><div className="hm-lk-post" style={{ background: nacht }}><div className="t">{b.claim}</div><LogoKonzept spec={spec} b={b} h={spec.art === "monogramm" ? 22 : 12} invert /></div><figcaption>Post</figcaption></figure>
  </div>;
}

function LogoWerkstatt({ m, teamSicht }) {
  useHm("logos"); useHm("branding");
  const da = useLkSchriften();
  const b = hmBrand(m.id);
  const st = (hmStore.get("logos") || {})[m.id] || {};
  const [richtungen, setRichtungen] = React.useState([]);
  const [runde, setRunde] = React.useState(0);
  const [basis, setBasis] = React.useState(null);
  const [fokus, setFokus] = React.useState(null);
  const konzepte = React.useMemo(() => hmLkKonzepte(m.id, { runde, richtungen, basis }), [m.id, runde, richtungen.join(","), basis && basis.id, b.akzentId, b.schriftId]);
  const aktiv = fokus || konzepte[0];
  const merk = st.merk || [];
  const set = (patch) => hmStore.patch("logos", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), ...patch } }));
  const merken = (s) => { const drin = merk.some((x) => x.id === s.id); if (!drin && merk.length >= 3) { toast("Höchstens drei Entwürfe für den Makler"); return; } set({ merk: drin ? merk.filter((x) => x.id !== s.id) : [...merk, s] }); };
  const uebernehmen = (s) => { hmStore.patch("branding", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), logoKonzept: s, status: (((a || {})[m.id] || {}).status === "freigegeben" ? "geaendert" : ((a || {})[m.id] || {}).status || "entwurf") } })); set({ gewaehlt: s.id }); hmEvent(m.id, "branding", "Logo übernommen: " + (HM_LK_ARTEN.find((x) => x.id === s.art) || {}).name, teamSicht ? "Team" : m.name); toast("Logo übernommen. Website, Karte und Material zeigen es jetzt."); };
  const k = hmLkKontext(m.id);
  return <div className="hm-lk">
    <p className="hm-sub" style={{ marginTop: 0 }}>Entwürfe aus Name, Schrift und Idee der Marke. Zeichen aus der Markenwelt{k.welt ? ` ${k.welt.name}` : ""}{k.zeichen.includes("ratlinie") ? " und der Ratlinie" : ""}, keine Symbole aus dem Katalog. Farben aus dem Branding.</p>
    <div className="hm-row" style={{ gap: 8, flexWrap: "wrap", marginTop: 12 }}>
      <span className="hm-daten">Richtung</span>
      {HM_LK_RICHTUNGEN.map((r) => <button key={r.id} className={"hm-chip" + (richtungen.includes(r.id) ? " on" : "")} onClick={() => { setBasis(null); setRichtungen((l) => l.includes(r.id) ? l.filter((x) => x !== r.id) : [...l, r.id]); }}>{r.name}</button>)}
      <span style={{ flex: 1 }} />
      {basis && <button className="hm-link" onClick={() => setBasis(null)}>Alle Richtungen</button>}
      <button className="hm-link" onClick={() => { setBasis(null); setRunde((x) => x + 1); }}>Neue Runde</button>
    </div>
    {basis && <div className="hm-daten" style={{ marginTop: 8 }}>Mehr davon: Varianten zu {(HM_LK_ARTEN.find((x) => x.id === basis.art) || {}).name} in {basis.font}</div>}
    <div className="hm-lk-split">
      <div className="hm-lk-raster" style={{ opacity: da ? 1 : 0.4 }}>{konzepte.map((s) => { const gemerkt = merk.some((x) => x.id === s.id); return <div key={s.id} className={"hm-lk-k" + (aktiv && aktiv.id === s.id ? " on" : "") + (gemerkt ? " gemerkt" : "")}>
        <button className="bild" onClick={() => setFokus(s)} aria-label={`Entwurf ${(HM_LK_ARTEN.find((x) => x.id === s.art) || {}).name}`}><LogoKonzept spec={s} b={b} h={s.art === "monogramm" ? 56 : s.art === "gestapelt" || (s.art === "zeichen" && s.lage === "oben") ? 58 : 34} /></button>
        <div className="u"><span>{(HM_LK_ARTEN.find((x) => x.id === s.art) || {}).name}{s.zeichen ? ", " + HM_LK_ZEICHEN_NAME[s.zeichen] : ""}</span><span className="hm-daten">{s.font}</span></div>
        <div className="a"><button className="hm-link" onClick={() => { setBasis(s); setFokus(s); }}>Mehr davon</button><button className="hm-link" onClick={() => merken(s)}>{gemerkt ? "Gemerkt" : "Merken"}</button></div>
      </div>; })}</div>
      <div className="hm-lk-seite">
        {aktiv && <>
          <div className="hm-lk-gross"><LogoKonzept spec={aktiv} b={b} h={aktiv.art === "monogramm" ? 110 : 64} /></div>
          <LogoImEinsatz spec={aktiv} b={b} />
          <div className="hm-row" style={{ gap: 14, marginTop: 14, flexWrap: "wrap" }}>
            <Btn onClick={() => uebernehmen(aktiv)}>Als Logo übernehmen</Btn>
            <button className="hm-link" onClick={() => merken(aktiv)}>{merk.some((x) => x.id === aktiv.id) ? "Von der Liste nehmen" : "Für den Makler merken"}</button>
            <button className="hm-link" onClick={() => hmLkLaden(aktiv, b)}>SVG laden</button>
          </div>
        </>}
        <div className="hm-lk-merk">
          <div className="hm-sek" style={{ marginTop: 22 }}>Für den Makler<span className="hm-daten">{merk.length} von 3</span></div>
          {!merk.length ? <div className="hm-daten">Bis zu drei Entwürfe merken. Der Makler bewertet sie am Markenvertrag, das Team entscheidet.</div>
            : <div className="hm-lk-merkliste">{merk.map((s) => { const bw = (st.bewertung || {})[s.id] || {}; const ja = HM_LK_KRITERIEN.filter((x) => bw[x] === true).length, nein = HM_LK_KRITERIEN.filter((x) => bw[x] === false).length; return <button key={s.id} className="hm-lk-mk" onClick={() => setFokus(s)}><LogoKonzept spec={s} b={b} h={26} /><span className="hm-daten">{ja || nein ? `Makler: ${ja} ja, ${nein} nein` : "noch nicht bewertet"}{st.gewaehlt === s.id ? " · übernommen" : ""}</span></button>; })}</div>}
        </div>
      </div>
    </div>
  </div>;
}

/* Makler: drei Entwürfe, geurteilt am Markenvertrag, nicht nach Geschmack */
function LogoBewertung({ m }) {
  useHm("logos"); useLkSchriften();
  const b = hmBrand(m.id);
  const st = (hmStore.get("logos") || {})[m.id] || {};
  const merk = st.merk || [];
  if (!merk.length) return null;
  const setB = (id, krit, v) => hmStore.patch("logos", (a) => { const x = { ...((a || {})[m.id] || {}) }; const bw = { ...(x.bewertung || {}) }; bw[id] = { ...(bw[id] || {}), [krit]: v }; return { ...(a || {}), [m.id]: { ...x, bewertung: bw } }; });
  return <section className="hm-lk-bewertung">
    <div className="hm-mono">Logo-Entwürfe</div>
    <p className="hm-sub" style={{ margin: "6px 0 0", fontSize: 14 }}>Bitte nicht nach Geschmack urteilen, sondern an drei Fragen aus Ihrem Markenvertrag. Das Team entscheidet danach.</p>
    {merk.map((s) => { const bw = (st.bewertung || {})[s.id] || {}; return <div key={s.id} className="hm-lk-bw">
      <div className="bild"><LogoKonzept spec={s} b={b} h={s.art === "monogramm" ? 48 : 30} /></div>
      <LogoImEinsatz spec={s} b={b} />
      <div className="fragen">{HM_LK_KRITERIEN.map((k) => <div key={k} className="hm-reihe"><div className="m"><div className="t" style={{ whiteSpace: "normal" }}>{k}</div></div><div className="hm-seg klein"><button className={bw[k] === true ? "on" : ""} onClick={() => setB(s.id, k, true)}>Ja</button><button className={bw[k] === false ? "on" : ""} onClick={() => setB(s.id, k, false)}>Nein</button></div></div>)}</div>
    </div>; })}
  </section>;
}

function hmSelbsttestLogo() {
  const out = []; const t = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: e.message }); } };
  const mid = "markus"; const b = hmBrand(mid);
  const l = hmLkKonzepte(mid, {});
  t("18 Entwürfe über alle Arten", () => { const arten = new Set(l.map((x) => x.art)); return { ok: l.length >= 16 && arten.size >= 6, detail: `${l.length} Entwürfe, ${arten.size} Arten` }; });
  t("Schriften nur aus dem Pool", () => ({ ok: l.every((x) => HM_LK_SCHRIFTEN.some((s) => s.f === x.font)) }));
  t("Zeichen aus Idee und Welt", () => { const z = hmLkKontext(mid).zeichen; return { ok: z.length >= 1 && l.filter((x) => x.art === "zeichen").every((x) => z.includes(x.zeichen)), detail: z.join(", ") }; });
  t("Layout ohne NaN", () => { const bad = l.filter((s) => { const L = hmLkLayout(s, b, () => 100); return !isFinite(L.W) || !isFinite(L.H) || /NaN|undefined/.test(hmLkSvgText(s, b)); }); return { ok: !bad.length, detail: bad.map((x) => x.art).join(", ") }; });
  t("Mehr davon bleibt in der Art", () => { const v = hmLkKonzepte(mid, { basis: l[0] }); return { ok: v.length >= 8 && v.every((x) => x.art === l[0].art), detail: l[0].art }; });
  t("Richtung Initialen liefert Monogramme", () => { const v = hmLkKonzepte(mid, { richtungen: ["initialen"] }); return { ok: v.every((x) => x.art === "monogramm") }; });
  return out;
}

Object.assign(window, { HM_LK_SCHRIFTEN, HM_LK_ARTEN, hmLkKonzepte, hmLkLayout, hmLkSvgText, hmLkSvgPfade, hmLkLaden, LogoKonzept, LogoImEinsatz, LogoWerkstatt, LogoBewertung, hmSelbsttestLogo, hmLkProfilSpec });
