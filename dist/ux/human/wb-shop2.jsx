/* Werkbank. Shop und Betrieb, Stufe 2 (Roadmap 2.4 bis 2.7): Grafik-Generator, Format-Lotse,
   Anfrage-Sortierer, Drehtag-Planer, Fristen-Wächter, Community-Postfach. Alles regelbasiert,
   im Browser, ohne Tokens. Reine Funktionen nehmen optional Eingabedaten, sonst lesen sie hmStore. */

/* ---------- Kleine Helfer ---------- */
const hmShopNorm = (s) => String(s || "").toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
const hmShopTokens = (s) => hmShopNorm(s).split(/[^a-z0-9²]+/).filter(Boolean);
const hmShopUnd = (a) => (a.length <= 1 ? a[0] || "" : a.slice(0, -1).join(", ") + " und " + a[a.length - 1]);
const hmShopZahl = (x) => Number(x || 0).toLocaleString("de-AT", { maximumFractionDigits: 1 });
const hmShopSlug = (s) => hmShopNorm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function hmShopDatei(blob, name) {
  const a = document.createElement("a"); const u = URL.createObjectURL(blob);
  a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 4000);
}
/* Stichwort am Wortanfang, Mehrwort-Stichworte als Folge */
function hmShopTrifft(normText, kw) {
  const k = hmShopNorm(kw);
  const re = new RegExp("(^|[^a-z0-9])" + k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return re.test(normText);
}

/* Werktage in Wien: Wochenende und gesetzliche Feiertage bis Anfang 2027 */
const HM_FEIERTAGE = new Set(["2026-10-26", "2026-11-01", "2026-12-08", "2026-12-25", "2026-12-26", "2027-01-01", "2027-01-06"]);
const hmTagePlus = (iso, n) => { const d = new Date(iso + "T12:00"); d.setDate(d.getDate() + n); return hmIsoLokal(d); };
function hmIstWerktag(iso) { const d = new Date(iso + "T12:00"); return d.getDay() !== 0 && d.getDay() !== 6 && !HM_FEIERTAGE.has(iso); }
function hmWerktagePlus(iso, n) {
  let t = iso;
  if (n <= 0) { while (!hmIstWerktag(t)) t = hmTagePlus(t, 1); return t; }
  let k = 0;
  while (k < n) { t = hmTagePlus(t, 1); if (hmIstWerktag(t)) k++; }
  return t;
}
const hmBezirk = (s) => String(s || "").replace(/^\d{4}\s*/, "").trim();
function hmAlterText(ms, jetzt) {
  const min = Math.max(0, Math.round(((jetzt || Date.now()) - ms) / 6e4));
  if (min < 1) return "gerade eben";
  if (min < 60) return `seit ${min} Min`;
  const h = Math.floor(min / 60);
  if (h < 24) return h < 3 && min % 60 ? `seit ${h} Std ${min % 60} Min` : `seit ${h} Std`;
  const t = Math.floor(h / 24);
  return t === 1 ? "seit 1 Tag" : `seit ${t} Tagen`;
}

/* ======================================================================
   1. Grafik-Generator (Canvas 2D)
   ====================================================================== */
const HM_GRAFIK_FARBEN = { grund: "#F7F5F1", text: "#0B0A09", leise: "#6E685D", linie: "rgba(11,10,9,.14)", flaeche: "#F0EDE6" };
const HM_GRAFIK_MASSE = { "4:5": [1080, 1350], "9:16": [1080, 1920], "1:1": [1080, 1080] };
const HM_GRAFIK_VORLAGEN = [
  { id: "carousel", name: "Carousel", format: "4:5", satz: "Mehrere Kacheln, erste mit Hook, letzte mit Handlungsaufruf." },
  { id: "objekt", name: "Objekt", format: "4:5", satz: "Objektfoto mit Titel, Lage, Preis, Fläche und Zimmern, als Post und Story." },
  { id: "story", name: "Story", format: "9:16", satz: "Die gleichen Zeilen im Hochformat, mit Platz für die Instagram-Leisten." },
];
const HM_GRAFIK_ZEILE = /^\s*(?:Kachel|Story|Folie|Slide)\s*\d+\s*[:.]\s*(.+)$/i;
const HM_GRAFIK_B0 = { vor: "", nach: "", initialen: "", schrift: { d: "Power Grotesk", t: "Power Grotesk" }, akzent: "#FFAA09", logo: "wort", makler: { name: "", region: "" }, claim: "" };
const hmGrafikOhnePrefix = (z) => { const m = String(z || "").match(HM_GRAFIK_ZEILE); return (m ? m[1] : String(z || "")).trim(); };
const hmGrafikFont = (gewicht, px, fam) => `${gewicht} ${Math.round(px)}px "${fam}", ${fam === "Outfit" ? "system-ui, sans-serif" : "ui-serif, Georgia, serif"}`;
const hmGrafikAbstand = (ctx, px) => { if ("letterSpacing" in ctx) ctx.letterSpacing = px + "px"; };
const hmGrafikHandle = (b) => "@" + (b.vor + "." + b.nach).toLowerCase().replace(/\s/g, "") + ".immo";

/* Kacheln aus einem Beitrag: "Kachel 1: ..." Zeilen, sonst gesprochene Sätze, sonst Titel plus Handlungsaufruf */
function hmGrafikKacheln(c, b) {
  const s = (c && c.skript) || "";
  const k = s.split("\n").map((z) => z.match(HM_GRAFIK_ZEILE)).filter(Boolean).map((x) => x[1].trim());
  if (k.length >= 2) return k;
  const zitate = (s.match(/"[^"]+"|„[^"“]+[“"]/g) || []).map((x) => x.replace(/["„“]/g, "").trim()).filter(Boolean);
  const hook = (c && c.titel) || (b && b.w && b.w.hooks && b.w.hooks[0]) || "Was deine Wohnung heute wert ist";
  const l = zitate.length >= 2 ? zitate : [hook, ...zitate.filter((z) => z !== hook)];
  if (l.length < 2 || !/speicher|teil|schreib|kommentar|termin|melde|frag/i.test(l[l.length - 1])) l.push("Speichern und teilen");
  return l;
}
/* Erste Zahl einer Zeile als große Ziffer, mit Einheit */
function hmGrafikZahl(text) {
  const m = String(text || "").match(/(\d{1,3}(?:[.,]\d{3})+|\d+(?:[.,]\d+)?)\s*(Prozent|%|m²|m2|Euro|€|Jahren|Jahre|Monate|Wochen|Tage|Minuten|Stunden|Zimmer)?/i);
  if (!m) return null;
  const roh = (m[2] || "").toLowerCase();
  const e = { prozent: "%", "%": "%", "m²": "m²", m2: "m²", euro: "€", "€": "€" }[roh] || m[2] || "";
  return { zahl: e ? `${m[1]} ${e}` : m[1], einheit: e };
}
function hmGrafikUmbruch(ctx, text, maxB) {
  const woerter = String(text || "").split(/\s+/).filter(Boolean); const zeilen = []; let z = "";
  woerter.forEach((w) => { const t = z ? z + " " + w : w; if (!z || ctx.measureText(t).width <= maxB) z = t; else { zeilen.push(z); z = w; } });
  if (z) zeilen.push(z);
  return zeilen;
}
function hmGrafikPassend(ctx, text, { fam, gewicht = 400, max, min, breite, zeilen, sperren = -0.02 }) {
  for (let px = max; px >= min; px -= 4) {
    ctx.font = hmGrafikFont(gewicht, px, fam); hmGrafikAbstand(ctx, px * sperren);
    const l = hmGrafikUmbruch(ctx, text, breite);
    if (l.length <= zeilen && !l.some((x) => ctx.measureText(x).width > breite)) return { px, l };
  }
  ctx.font = hmGrafikFont(gewicht, min, fam); hmGrafikAbstand(ctx, min * sperren);
  return { px: min, l: hmGrafikUmbruch(ctx, text, breite).slice(0, zeilen) };
}
function hmGrafikZeilen(ctx, zeilen, x, y, lh) { zeilen.forEach((z, i) => ctx.fillText(z, x, y + i * lh)); }
function hmGrafikMono(ctx, text, x, y, ausr, farbe, px = 22) {
  ctx.font = hmGrafikFont(400, px, "Outfit"); hmGrafikAbstand(ctx, px * 0.12);
  ctx.fillStyle = farbe || HM_GRAFIK_FARBEN.leise; ctx.textAlign = ausr || "left";
  ctx.fillText(String(text).toUpperCase(), x, y); ctx.textAlign = "left";
}
function hmGrafikPfeil(ctx, x, y, len, farbe) {
  ctx.strokeStyle = farbe; ctx.lineWidth = 3; ctx.lineCap = "round"; ctx.lineJoin = "round";
  ctx.beginPath(); ctx.moveTo(x - len, y); ctx.lineTo(x, y); ctx.moveTo(x - 15, y - 15); ctx.lineTo(x, y); ctx.lineTo(x - 15, y + 15); ctx.stroke();
}
/* Logo als Text: Wortmarke, Monogramm oder Name mit Punkt, wie BrandLogo */
function hmGrafikLogo(ctx, b, x, y, px, farbe) {
  const f = b.schrift.d; ctx.fillStyle = farbe; ctx.textAlign = "left";
  if (b.logo === "monogramm") {
    const r = px * 0.9, cx = x + r, cy = y - px * 0.34;
    ctx.strokeStyle = farbe; ctx.lineWidth = Math.max(2, px * 0.06);
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.font = hmGrafikFont(400, px * 0.78, f); hmGrafikAbstand(ctx, 0); ctx.textAlign = "center";
    ctx.fillText(b.initialen, cx, cy + px * 0.27); ctx.textAlign = "left";
    ctx.fillStyle = b.akzent; ctx.beginPath(); ctx.arc(cx + r * 0.68, cy - r * 0.68, px * 0.13, 0, Math.PI * 2); ctx.fill();
    return r * 2;
  }
  hmGrafikAbstand(ctx, -px * 0.02);
  ctx.font = hmGrafikFont(400, px, f); const vor = b.vor + " "; ctx.fillText(vor, x, y); let w = ctx.measureText(vor).width;
  ctx.font = hmGrafikFont(b.logo === "wort" ? 600 : 400, px, f); ctx.fillText(b.nach, x + w, y); w += ctx.measureText(b.nach).width;
  if (b.logo === "punkt") { ctx.fillStyle = b.akzent; ctx.beginPath(); ctx.arc(x + w + px * 0.22, y - px * 0.1, px * 0.12, 0, Math.PI * 2); ctx.fill(); w += px * 0.34; }
  return w;
}
function hmGrafikCover(ctx, img, x, y, w, h) {
  if (!img) { ctx.fillStyle = HM_GRAFIK_FARBEN.flaeche; ctx.fillRect(x, y, w, h); hmGrafikMono(ctx, "Foto folgt", x + w / 2, y + h / 2, "center"); return; }
  const s = Math.max(w / img.width, h / img.height), sw = w / s, sh = h / s;
  ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x, y, w, h);
}

const HM_GRAFIK_BILDER = {};
function hmGrafikBild(url) {
  if (!HM_GRAFIK_BILDER[url]) HM_GRAFIK_BILDER[url] = new Promise((res) => {
    const im = new Image(); im.crossOrigin = "anonymous";
    im.onload = () => res(im); im.onerror = () => { delete HM_GRAFIK_BILDER[url]; res(null); };
    im.src = url;
  });
  return HM_GRAFIK_BILDER[url];
}
const HM_GRAFIK_FONTS = {};
function hmGrafikSchriften(b) {
  const d = b.schrift.d, t = b.schrift.t, k = d + "|" + t;
  if (!HM_GRAFIK_FONTS[k]) HM_GRAFIK_FONTS[k] = (document.fonts
    ? Promise.all([`400 80px "${d}"`, `600 80px "${d}"`, `400 32px "${t}"`, `600 32px "${t}"`, `400 24px "Outfit"`].map((f) => document.fonts.load(f).catch(() => null)))
    : Promise.resolve()).then(() => true);
  return HM_GRAFIK_FONTS[k];
}

/* Textkachel für Carousel (4:5) und Story (9:16) */
function hmGrafikText(ctx, W, H, b, kacheln, i) {
  const F = HM_GRAFIK_FARBEN, P = 96, story = H > 1500;
  const oben = story ? 250 : P + 34, unten = story ? H - 330 : H - P, breite = W - 2 * P;
  const n = kacheln.length, text = kacheln[i] || "", erste = i === 0, letzte = n > 1 && i === n - 1;
  const d = b.schrift.d, t = b.schrift.t, pad = (x) => String(x).padStart(2, "0");
  hmGrafikLogo(ctx, b, P, oben, 32, F.text);
  if (!story && n > 1) hmGrafikMono(ctx, `${pad(i + 1)} / ${pad(n)}`, W - P, oben - 4, "right");
  hmGrafikMono(ctx, hmGrafikHandle(b), P, unten, "left");
  if (!letzte && !story && n > 1) hmGrafikPfeil(ctx, W - P, unten - 8, 56, F.text);
  ctx.fillStyle = F.text;
  if (erste) {
    const { px, l } = hmGrafikPassend(ctx, text, { fam: d, max: story ? 132 : 124, min: 60, breite, zeilen: story ? 7 : 6 });
    const lh = px * 1.04, block = (l.length - 1) * lh;
    const y0 = story ? Math.round(H * 0.5 - block / 2) : unten - 150 - block;
    ctx.fillStyle = b.akzent; ctx.fillRect(P, y0 - px - 44, 72, 8);
    ctx.fillStyle = F.text; hmGrafikZeilen(ctx, l, P, y0, lh);
    return;
  }
  if (letzte) {
    const { px, l } = hmGrafikPassend(ctx, text, { fam: d, max: 100, min: 56, breite, zeilen: 4 });
    const lh = px * 1.04, y0 = story ? Math.round(H * 0.4) : oben + 340;
    hmGrafikZeilen(ctx, l, P, y0, lh);
    const yl = y0 + (l.length - 1) * lh;
    ctx.fillStyle = b.akzent; ctx.fillRect(P, yl + px * 0.24, Math.min(breite, ctx.measureText(l[l.length - 1] || "").width), 6);
    ctx.fillStyle = F.text; ctx.font = hmGrafikFont(400, 34, t); hmGrafikAbstand(ctx, 0);
    ctx.fillText(b.makler.name || "", P, yl + px * 0.24 + 110);
    if (b.claim) { ctx.fillStyle = F.leise; const c = hmGrafikPassend(ctx, b.claim, { fam: t, max: 28, min: 24, breite, zeilen: 2, sperren: 0 }); hmGrafikZeilen(ctx, c.l, P, yl + px * 0.24 + 160, c.px * 1.35); }
    return;
  }
  const z = hmGrafikZahl(text);
  if (z) {
    const y = story ? Math.round(H * 0.4) : oben + 400;
    const g = hmGrafikPassend(ctx, z.zahl, { fam: d, max: 300, min: 120, breite, zeilen: 1, sperren: -0.03 });
    ctx.fillText(g.l[0] || "", P, y);
    const r = hmGrafikPassend(ctx, text, { fam: t, max: 52, min: 36, breite, zeilen: 5, sperren: -0.01 });
    hmGrafikZeilen(ctx, r.l, P, y + 90 + r.px * 0.4, r.px * 1.3);
    return;
  }
  const { px, l } = hmGrafikPassend(ctx, text, { fam: d, max: 88, min: 52, breite, zeilen: 7 });
  const lh = px * 1.06;
  const y0 = story ? Math.round(H * 0.47 - ((l.length - 1) * lh) / 2) : oben + 260 + px;
  hmGrafikZeilen(ctx, l, P, y0, lh);
}

/* Objekt: 4:5 als Post, 9:16 als Story */
function hmGrafikObjekt(ctx, W, H, b, o, img) {
  const F = HM_GRAFIK_FARBEN, P = 96, story = H > 1500, breite = W - 2 * P, d = b.schrift.d, t = b.schrift.t;
  const bildH = Math.round(H * (story ? 0.56 : 0.52));
  hmGrafikCover(ctx, img, 0, 0, W, bildH);
  const y = bildH + (story ? 96 : 84);
  hmGrafikMono(ctx, o.loc || "", P, y);
  ctx.fillStyle = F.text;
  const ti = hmGrafikPassend(ctx, o.t || "", { fam: d, max: story ? 88 : 76, min: 48, breite, zeilen: 2 });
  hmGrafikZeilen(ctx, ti.l, P, y + 34 + ti.px, ti.px * 1.05);
  if (story) {
    const zeile = [o.price, o.m2, o.zi].filter(Boolean).join("  ·  ");
    const r = hmGrafikPassend(ctx, zeile, { fam: t, max: 42, min: 28, breite, zeilen: 1, sperren: 0 });
    ctx.fillText(r.l[0] || "", P, H - 420);
    hmGrafikLogo(ctx, b, P, H - 330, 30, F.text);
    hmGrafikMono(ctx, hmGrafikHandle(b), W - P, H - 334, "right");
    return;
  }
  const yl = H - P - 190, spalte = breite / 3;
  ctx.fillStyle = F.linie; ctx.fillRect(P, yl, breite, 2);
  [["Preis", o.price], ["Fläche", o.m2], ["Zimmer", o.zi]].forEach(([k, v], i) => {
    const x = P + i * spalte;
    hmGrafikMono(ctx, k, x, yl + 56, "left", F.leise, 20);
    ctx.fillStyle = F.text;
    const r = hmGrafikPassend(ctx, v || "", { fam: t, max: 40, min: 24, breite: spalte - 24, zeilen: 1, sperren: 0 });
    ctx.fillText(r.l[0] || "", x, yl + 112);
  });
  hmGrafikLogo(ctx, b, P, H - P + 8, 28, F.text);
  hmGrafikMono(ctx, hmGrafikHandle(b), W - P, H - P + 4, "right", F.leise, 20);
}

/* Zeichnet eine Kachel. vorlage: carousel | objekt | story. format: 4:5 | 9:16 | 1:1 (Standard nach Vorlage).
   daten: { kacheln: [..], i } für Text, { objekt } für Objekt. skala < 1 für Vorschau. */
async function hmGrafikRender(canvas, { format, vorlage = "carousel", b, daten = {}, skala = 1 } = {}) {
  b = b || HM_GRAFIK_B0;
  const fmt = format || (vorlage === "story" ? "9:16" : "4:5");
  const [W, H] = HM_GRAFIK_MASSE[fmt] || HM_GRAFIK_MASSE["4:5"];
  await hmGrafikSchriften(b);
  const o = daten.objekt || null;
  const img = o && o.img ? await hmGrafikBild(o.img) : null;
  canvas.width = Math.round(W * skala); canvas.height = Math.round(H * skala);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(skala, 0, 0, skala, 0, 0);
  ctx.textBaseline = "alphabetic"; ctx.textAlign = "left";
  ctx.fillStyle = HM_GRAFIK_FARBEN.grund; ctx.fillRect(0, 0, W, H);
  if (vorlage === "objekt" && o) hmGrafikObjekt(ctx, W, H, b, o, img);
  else hmGrafikText(ctx, W, H, b, daten.kacheln && daten.kacheln.length ? daten.kacheln : [daten.text || ""], daten.i || 0);
  hmGrafikAbstand(ctx, 0);
  return canvas;
}

let hmJsZipP = null;
const hmJsZip = () => (window.JSZip ? Promise.resolve(window.JSZip) : hmJsZipP || (hmJsZipP = new Promise((res, rej) => {
  const s = document.createElement("script");
  s.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
  s.onload = () => res(window.JSZip); s.onerror = (e) => { hmJsZipP = null; rej(e); };
  document.head.appendChild(s);
})));

function GrafikGenerator({ m, c, zu }) {
  useHm("branding"); useHm("strategien");
  const b = hmBrand(m.id);
  const quellen = (useHm("content") || []).filter((x) => x.maklerId === m.id && ["carousel", "story", "beitrag"].includes(x.typ));
  const erste = c ? c.id : ((quellen.find((x) => hmGrafikKacheln(x).length > 2) || quellen[0] || {}).id || null);
  const [vorlage, setVorlage] = React.useState(c && c.typ === "story" ? "story" : "carousel");
  const [quelle, setQuelle] = React.useState(erste);
  const textAus = (id) => hmGrafikKacheln((hmStore.get("content") || []).find((x) => x.id === id) || (c && c.id === id ? c : null), b).join("\n");
  const [text, setText] = React.useState(() => textAus(erste));
  const objekte = React.useMemo(() => hmWebObjekte(), []);
  const [obj, setObj] = React.useState(0);
  const [lade, setLade] = React.useState(false);
  const leinwand = React.useRef([]);
  const zeilen = text.split("\n").map(hmGrafikOhnePrefix).filter(Boolean).slice(0, 10);
  const kacheln = vorlage === "objekt"
    ? [{ format: "4:5", name: "Post" }, { format: "9:16", name: "Story" }]
    : zeilen.map((z, i) => ({ format: vorlage === "story" ? "9:16" : "4:5", name: i === 0 ? "Hook" : i === zeilen.length - 1 && zeilen.length > 1 ? "Handlung" : "Kachel" }));
  const opts = (i, skala) => (vorlage === "objekt"
    ? { vorlage: "objekt", format: kacheln[i].format, b, daten: { objekt: objekte[obj] }, skala }
    : { vorlage, b, daten: { kacheln: zeilen, i }, skala });
  React.useEffect(() => {
    let aus = false;
    const t = setTimeout(() => { kacheln.forEach((k, i) => { const cv = leinwand.current[i]; if (cv && !aus) hmGrafikRender(cv, opts(i, 0.4)).catch(() => {}); }); }, 180);
    return () => { aus = true; clearTimeout(t); };
  }, [vorlage, text, obj, b.akzent, b.schriftId, b.logo, b.claim, b.portrait]);
  const slug = hmShopSlug(`${b.vor}-${b.nach}-${vorlage === "objekt" ? hmShopSlug(objekte[obj].t) : vorlage}`);
  const dateiname = (i) => `${slug}-${String(i + 1).padStart(2, "0")}${vorlage === "objekt" ? (kacheln[i].format === "9:16" ? "-story" : "-post") : ""}.png`;
  const png = async (i) => { const cv = document.createElement("canvas"); await hmGrafikRender(cv, opts(i, 1)); return new Promise((res, rej) => { try { cv.toBlob((bl) => (bl ? res(bl) : rej(new Error("leer"))), "image/png"); } catch (e) { rej(e); } }); };
  const einzeln = async (i) => { try { hmShopDatei(await png(i), dateiname(i)); } catch (e) { toast("Export nicht möglich, das Bild ist gesperrt"); } };
  const alle = async () => {
    setLade(true);
    try { const Z = await hmJsZip(); const z = new Z(); for (let i = 0; i < kacheln.length; i++) z.file(dateiname(i), await png(i)); hmShopDatei(await z.generateAsync({ type: "blob" }), slug + ".zip"); toast(`${kacheln.length} Kacheln als ZIP geladen`); }
    catch (e) { toast("ZIP nicht möglich, Verbindung prüfen"); }
    setLade(false);
  };
  const waehleQuelle = (id) => { setQuelle(id); if (id) setText(textAus(id)); };
  const V = HM_GRAFIK_VORLAGEN.find((v) => v.id === vorlage);
  return <div className="hm-sh-grafik">
    <div className="hm-stack">
      <div className="hm-seg klein">{HM_GRAFIK_VORLAGEN.map((v) => <button key={v.id} className={vorlage === v.id ? "on" : ""} onClick={() => setVorlage(v.id)}>{v.name}</button>)}</div>
      <div className="hm-daten">{V.satz}</div>
      {vorlage === "objekt" ? <>
        <div className="hm-abschnitt-t">Objekt</div>
        <div className="hm-gruppe hm-sh-objekte">{objekte.map((o, i) => <div key={o.t} className="hm-reihe klick" onClick={() => setObj(i)}><img className="bild" src={o.img} alt="" /><div className="m"><div className="t">{o.t}</div><div className="u">{o.loc} · {o.price}</div></div><div className="r">{obj === i ? <Ico n="haken" /> : null}</div></div>)}</div>
      </> : <>
        {quellen.length > 0 && <><div className="hm-abschnitt-t">Aus deinen Beiträgen</div>
          <div className="hm-chips">{quellen.map((x) => <button key={x.id} className={"hm-chip" + (quelle === x.id ? " on" : "")} onClick={() => waehleQuelle(x.id)}>{x.titel}</button>)}<button className={"hm-chip" + (!quelle ? " on" : "")} onClick={() => setQuelle(null)}>Eigener Text</button></div></>}
        <label className="hm-feld"><span>Eine Zeile pro Kachel. Erste Zeile Hook, letzte Handlungsaufruf.</span><textarea rows={Math.max(5, zeilen.length + 1)} value={text} onChange={(e) => { setText(e.target.value); setQuelle(null); }} /></label>
        {zeilen.length > 10 && <div className="hm-hinweis">Mehr als 10 Kacheln, nur die ersten 10 werden gesetzt.</div>}
      </>}
      <div className="hm-row" style={{ justifyContent: "space-between" }}>
        <span className="hm-daten">{kacheln.length} {kacheln.length === 1 ? "Kachel" : "Kacheln"} · PNG 1080 px breit</span>
        <Btn knob={<Ico n="runter" />} disabled={!kacheln.length || lade} onClick={alle}>{lade ? "Wird gepackt" : "Alle als ZIP"}</Btn>
      </div>
      {zu && <button className="hm-link" style={{ alignSelf: "flex-start" }} onClick={zu}>Fertig</button>}
    </div>
    <div className="hm-sh-kacheln">
      {kacheln.map((k, i) => <figure key={vorlage + i} className={k.format === "9:16" ? "hoch" : ""}>
        <canvas ref={(el) => { leinwand.current[i] = el; }} aria-label={`Kachel ${i + 1}`} />
        <figcaption><span className="hm-daten">{String(i + 1).padStart(2, "0")} {k.name}</span><button className="hm-klein-btn hell" onClick={() => einzeln(i)}><Ico n="runter" /> PNG laden</button></figcaption>
      </figure>)}
      {!kacheln.length && <Leer titel="Noch kein Text." text="Schreib links eine Zeile pro Kachel." />}
    </div>
  </div>;
}

/* ======================================================================
   2. Format-Lotse
   ====================================================================== */
const HM_LOTSE_STUNDENSATZ = 150; /* ADB-Standardkondition für Zusatzaufwand (Vault: Feedback, Dos & Donts), gleich wie die dritte Korrekturrunde */
const HM_LOTSE_AUFWAND = 1.5;      // h Planungsschritt und Freigabe-Loop je Sonderformat (Plan Kap. 5.1)
const HM_LOTSE_KONZEPTE = {
  interview: { name: "Interview", w: ["interview", "gespraech", "befrag", "zu wort", "erzaehl", "testimonial", "kundenstimme", "stimme"] },
  kunde: { name: "Kunden", w: ["kunde", "kundin", "kaeufer", "verkaeufer", "eigentuemer", "familie", "paar", "mieter", "erstkaeufer"] },
  frage: { name: "Frage und Antwort", w: ["frage", "faq", "antwort", "erklaer", "tipp", "ratgeber"] },
  aussen: { name: "Außen", w: ["balkon", "terrasse", "garten", "dachterrasse", "loggia", "aussen", "draussen", "innenhof"] },
  drohne: { name: "Drohne", medium: true, w: ["drohne", "luftaufnahme", "luftbild", "von oben", "vogelperspektive", "ueberflug"] },
  rundgang: { name: "Rundgang", medium: true, w: ["rundgang", "walkthrough", "durchgang", "begehung", "roomtour", "room tour", "hausfuehrung", "tour durch"] },
  video: { name: "Video", medium: true, w: ["video", "film", "clip", "bewegtbild"] },
  reel: { name: "Reel", medium: true, w: ["reel", "shorts", "tiktok", "hochformat", "kurzvideo"] },
  grafik: { name: "Grafik", medium: true, w: ["grafik", "carousel", "karussell", "kachel", "slide", "infografik", "beitrag"] },
  plakat: { name: "Plakat", medium: true, w: ["plakat", "poster", "aushang", "schaufenster", "banner", "a1", "a2"] },
  flyer: { name: "Flyer", medium: true, w: ["flyer", "folder", "prospekt", "handzettel", "postwurf", "broschuere", "mappe", "expose"] },
  print: { name: "Druck", medium: true, w: ["druck", "gedruckt", "print", "papier", "auflage"] },
  visitenkarte: { name: "Visitenkarte", medium: true, w: ["visitenkarte"] },
  story: { name: "Story", medium: true, w: ["story", "stories"] },
  foto: { name: "Fotos", medium: true, w: ["foto", "bilder", "shooting", "fotograf"] },
  markt: { name: "Marktzahlen", w: ["markt", "zahlen", "preise", "statistik", "daten", "quadratmeter", "vergleich", "entwicklung"] },
  objekt: { name: "Objekt", w: ["objekt", "wohnung", "haus", "immobilie", "villa", "zinshaus", "penthouse", "neubau", "altbau", "dachgeschoss", "loft"] },
  person: { name: "Auftritt vor der Kamera", w: ["portrait", "portraet", "gesicht", "persoenlich", "vorstellung", "vor der kamera", "ueber mich", "talking"] },
  alltag: { name: "Alltag und Übergabe", w: ["uebergabe", "schluessel", "einzug", "hinter den kulissen", "behind", "alltag", "buero", "team", "besichtigung"] },
  graetzl: { name: "Grätzl", w: ["graetzl", "viertel", "bezirk", "nachbarschaft", "spaziergang", "strasse", "kaffee", "lokal"] },
  auto: { name: "ohne Drehtag", w: ["automatisch", "ki", "ai", "ohne dreh", "aus fotos", "schnell", "animiert"] },
};
/* Profile: wie stark ein Standardformat ein Konzept abdeckt (0 bis 1). key = Schlüssel in HM_FORMATE für auftraege.vorschlag */
const HM_LOTSE_FORMATE = [
  { id: "ai-reel", quelle: "katalog", p: { reel: 1, video: 0.8, objekt: 0.9, auto: 1, foto: 0.6 } },
  { id: "carousel", quelle: "katalog", key: "carousel", p: { grafik: 1, markt: 1, frage: 0.5, objekt: 0.3 } },
  { id: "story-set", quelle: "katalog", p: { story: 1, grafik: 0.6, objekt: 0.6, alltag: 0.3 } },
  { id: "walkthrough", quelle: "katalog", key: "walkthrough", p: { rundgang: 1, objekt: 1, video: 1, reel: 0.7, aussen: 0.3 } },
  { id: "drohne", quelle: "katalog", p: { drohne: 1, video: 0.9, objekt: 0.8, aussen: 0.5, graetzl: 0.3 } },
  { id: "visitenkarte", quelle: "katalog", p: { visitenkarte: 1, print: 0.8, person: 0.3 } },
  { id: "faltmappe", quelle: "katalog", p: { flyer: 1, print: 1, objekt: 0.5 } },
  { id: "plakat", quelle: "katalog", p: { plakat: 1, print: 1, objekt: 0.7, flyer: 0.4 } },
  { id: "talking", quelle: "drehtag", key: "talking", p: { person: 1, video: 0.8, reel: 0.9, frage: 0.6, markt: 0.5 } },
  { id: "spaziergang", quelle: "drehtag", key: "spaziergang", p: { graetzl: 1, video: 0.8, reel: 0.8, person: 0.5, aussen: 0.4 } },
  { id: "qa", quelle: "drehtag", key: "qa", p: { frage: 1, interview: 0.7, kunde: 0.5, video: 0.7, reel: 0.7, person: 0.4 } },
  { id: "behind", quelle: "drehtag", key: "behind", p: { alltag: 1, kunde: 0.9, interview: 0.6, video: 0.7, reel: 0.7, person: 0.4, aussen: 0.3 } },
];
function hmLotseKonzepte(text) {
  const tok = hmShopTokens(text);
  const satz = " " + tok.join(" ") + " ";
  return Object.keys(HM_LOTSE_KONZEPTE).filter((k) => HM_LOTSE_KONZEPTE[k].w.some((s) => (s.includes(" ") ? satz.includes(" " + s) : s.length >= 4 ? tok.some((t) => t.startsWith(s)) : tok.includes(s))));
}
function hmLotseFormat(f) {
  if (f.quelle === "drehtag") { const x = HM_FORMATE[f.id] || { name: f.id }; return { id: f.id, quelle: "drehtag", name: x.name, preis: 0, team: true, kontingent: "videos", vorschlagKey: f.key || null }; }
  const k = HM_KATALOG.find((x) => x.id === f.id) || { name: f.id, preis: null };
  return { id: f.id, quelle: "katalog", name: k.name, preis: k.preis, team: !!k.team, kontingent: k.kontingent || null, vorschlagKey: f.key || null };
}
function hmLotsePreis(format) {
  const p = format.preis || 0;
  const sonder = Math.round((p + HM_LOTSE_AUFWAND * HM_LOTSE_STUNDENSATZ) / 10) * 10;
  const std = p === 0 ? (format.quelle === "drehtag" ? "Aus dem Kontingent am Drehtag" : "Aus dem Kontingent") : `${p} €`;
  return { preisSonder: sonder, preisDiff: sonder - p, preisText: `${std} statt ca. ${sonder} € als Sonderformat` };
}
/* Freie Beschreibung gegen den Katalog: nächstes Standardformat, Ähnlichkeit, Preisunterschied, Begründung */
function hmFormatLotse(text) {
  const T = hmLotseKonzepte(text);
  if (!T.length) return { format: null, prozent: 0, preisDiff: 0, preisText: "", begruendung: String(text || "").trim() ? "Keine bekannten Stichworte. Als Sonderformat mit Briefing anlegen." : "Beschreibung fehlt.", empfehlung: "sonder", alternativen: [], konzepte: [] };
  const g = (k) => (HM_LOTSE_KONZEPTE[k].medium ? 1.5 : 1);
  const summe = T.reduce((n, k) => n + g(k), 0);
  const bewertet = HM_LOTSE_FORMATE.map((f) => {
    const treffer = T.filter((k) => f.p[k]);
    const prozent = Math.round((T.reduce((n, k) => n + g(k) * (f.p[k] || 0), 0) / summe) * 100);
    return { f, prozent, treffer, fehlend: T.filter((k) => !f.p[k]) };
  }).sort((a, b) => b.prozent - a.prozent || b.treffer.length - a.treffer.length);
  const baue = (x) => {
    const format = hmLotseFormat(x.f); const preis = hmLotsePreis(format);
    const name = (k) => HM_LOTSE_KONZEPTE[k].name;
    const ablauf = format.quelle === "drehtag" ? "Läuft am nächsten Drehtag aus dem Kontingent, ohne Briefing und Freigabe-Loop." : format.team ? "Standardablauf mit festem Preis." : "Läuft automatisch, ohne Team.";
    const empfehlung = x.prozent >= 50 ? "standard" : x.prozent >= 30 ? "anpassen" : "sonder";
    const begruendung = empfehlung === "sonder" ? "Kein Standardformat passt gut genug. Als Sonderformat mit Briefing anlegen."
      : `Deckt ${hmShopUnd(x.treffer.map(name))} ab.${x.fehlend.length ? ` Nicht abgedeckt: ${hmShopUnd(x.fehlend.map(name))}.` : ""} ${ablauf}`;
    return { format, prozent: x.prozent, ...preis, begruendung, empfehlung };
  };
  const bestes = baue(bewertet[0]);
  return { ...bestes, alternativen: bewertet.slice(1, 3).filter((x) => x.prozent > 0).map(baue), konzepte: T.map((k) => HM_LOTSE_KONZEPTE[k].name) };
}

function FormatLotse({ text, waehle }) {
  const r = React.useMemo(() => hmFormatLotse(text), [text]);
  if (!String(text || "").trim()) return null;
  if (!r.format) return <div className="hm-daten">{r.begruendung}</div>;
  const ablauf = (f) => (f.quelle === "drehtag" ? "Am nächsten Drehtag" : f.team ? "Mit dem Team" : "Automatisch");
  return <div className="hm-gruppe">
    <div className="hm-reihe"><div className="m"><div className="t">{r.format.name}</div><div className="u hm-sh-umbruch">{r.begruendung}</div></div><div className="r"><span className="hm-sh-prozent">{r.prozent} %</span></div></div>
    <div className="hm-reihe"><div className="m"><div className="t">{r.preisText}</div><div className="u">{ablauf(r.format)}{r.empfehlung === "anpassen" ? " · mit kurzem Briefing" : ""}</div></div>{waehle && r.empfehlung !== "sonder" && <div className="r"><button className="hm-klein-btn" onClick={() => waehle(r.format, r)}>Standard nehmen</button></div>}</div>
    {r.alternativen.map((a) => <div key={a.format.id} className={"hm-reihe" + (waehle ? " klick" : "")} onClick={() => waehle && waehle(a.format, a)}><div className="m"><div className="t">{a.format.name}</div><div className="u">{a.prozent} % · {a.preisText}</div></div></div>)}
  </div>;
}

/* ======================================================================
   3. Anfrage-Sortierer
   ====================================================================== */
const HM_ANFRAGE_ARTEN = [
  { id: "Technik", tage: 1, w: ["login", "passwort", "zugang", "zugriff", "einlogg", "geht nicht", "funktioniert nicht", "fehlermeldung", "bug", "absturz", "laedt nicht", "hochladen", "upload", "verbind", "verknuepf", "offline", "domain", "app"] },
  { id: "Rechnung", tage: 3, w: ["rechnung", "zahlung", "bezahl", "abbuch", "abgebucht", "lastschrift", "gutschrift", "storno", "kuendig", "mahnung", "uid", "ueberweis", "abo"] },
  { id: "Termin", tage: 1, w: ["termin", "drehtag", "verschieb", "absag", "uhrzeit", "kalender", "verfuegbar", "passt mir", "kann nicht am", "treffen"] },
  { id: "Korrektur", tage: 2, w: ["korrektur", "aender", "falsch", "tippfehler", "fehler im", "fehler in", "untertitel", "schnitt", "kuerzer", "laenger", "austausch", "ersetz", "stimmt nicht", "anders", "ausbesser", "zu leise", "zu laut", "musik", "caption"] },
  { id: "Sonderwunsch", tage: 2, w: ["haette gern", "haetten gern", "moechte", "wunsch", "wuensch", "idee", "neues format", "zusaetzlich", "extra", "sonder", "koennt ihr", "koenntet ihr", "drohne", "interview", "plakat", "flyer", "kampagne", "werbung", "anzeige", "shooting"] },
];
/* Owner-Regeln nach HM_TEAM, erste passende Zeile gilt */
const HM_ANFRAGE_OWNER = [
  { art: "Rechnung", owner: "nikita", grund: "Vertrag und Abrechnung" },
  { art: "Technik", wenn: /(website|domain|impressum|logo)/, owner: "daniel", grund: "Website und Marke" },
  { art: "Technik", wenn: /(anzeige|werbekonto|ads|kampagne|meta business)/, owner: "florian", grund: "Werbekonten und Marketing" },
  { art: "Technik", owner: "ahmet", grund: "Agent Success, Werkzeug und Zugang" },
  { art: "Korrektur", wenn: /(logo|farbe|schrift|branding|website|visitenkarte)/, owner: "daniel", grund: "Marke" },
  { art: "Korrektur", owner: "ahmet", grund: "Produktion und Schnitt" },
  { art: "Termin", wenn: /(workshop|strategie|review|quartal)/, owner: "daniel", grund: "Strategie-Termine" },
  { art: "Termin", owner: "ahmet", grund: "Drehtage und Produktion" },
  { art: "Sonderwunsch", wenn: /(kampagne|werbung|anzeige|ads|reichweite|newsletter|google)/, owner: "florian", grund: "Marketing und Kampagnen" },
  { art: "Sonderwunsch", owner: "daniel", grund: "Sonderformate prüft Daniel" },
  { art: "Sonstiges", owner: "ahmet", grund: "Erster Ansprechpartner" },
];
const HM_ANFRAGE_STOPP = new Set(["warum", "dieser", "diese", "dieses", "einen", "einer", "eines", "keine", "schon", "bitte", "danke", "wieder", "heute", "morgen", "unser", "unsere", "euren", "meine", "meinen", "meinem", "haben", "hatte", "koennt", "koennen", "wuerde", "sollte", "nicht", "immer", "damit", "wegen", "ueber", "video", "beitrag", "carousel", "wurde", "werden", "machen", "gerne", "hallo"]);
const hmTeamVorname = (id) => ((HM_TEAM.find((t) => t.id === id) || {}).name || id).split(" ")[0];

/* Nachricht aus dem Backoffice-Chat wird Ticket: Art, Owner, Frist, Titel, dringend */
function hmAnfrageSortieren(text, opt) {
  const o = opt || {};
  const heute = o.heute || HM_HEUTE;
  const roh = String(text || "").trim();
  const ohneGruss = roh.replace(/^\s*(hallo|hi|hey|servus|liebe[rs]?|guten (morgen|tag|abend)|grüß gott|gruess gott)\b[^,.\n]*[,.\n]\s*/i, "");
  const N = hmShopNorm(ohneGruss);
  const punkte = {}; const treffer = {};
  HM_ANFRAGE_ARTEN.forEach((a) => { treffer[a.id] = a.w.filter((k) => hmShopTrifft(N, k)); punkte[a.id] = treffer[a.id].length; });
  /* Bezug auf einen Beitrag des Maklers */
  const content = o.content || (window.hmStore ? hmStore.get("content") : null) || [];
  const woerter = new Set(hmShopTokens(ohneGruss).filter((w) => w.length >= 5 && !HM_ANFRAGE_STOPP.has(w)));
  let bezug = null, bs = 0;
  content.filter((c) => !o.maklerId || c.maklerId === o.maklerId).forEach((c) => { const s = hmShopTokens(c.titel).filter((w) => w.length >= 5 && woerter.has(w)).length; if (s > bs) { bs = s; bezug = c; } });
  if (bezug && punkte.Korrektur > 0) punkte.Korrektur += 1;
  const max = Math.max(0, ...Object.values(punkte));
  const art = o.art || (max > 0 ? HM_ANFRAGE_ARTEN.find((a) => punkte[a.id] === max).id : "Sonstiges");
  const dringendAuto = /(^|[^a-z])(dringend|sofort|asap|eilig|notfall|umgehend|heute noch|bis heute|bis morgen|morgen frueh|so schnell wie)/.test(N) || (art === "Technik" && /(geht nicht mehr|offline|nichts geht)/.test(N));
  const dringend = o.dringend != null ? !!o.dringend : dringendAuto;
  const regel = HM_ANFRAGE_OWNER.find((r) => r.art === art && (!r.wenn || r.wenn.test(N))) || HM_ANFRAGE_OWNER[HM_ANFRAGE_OWNER.length - 1];
  const basis = (HM_ANFRAGE_ARTEN.find((a) => a.id === art) || { tage: 3 }).tage;
  const fristTage = dringend ? (art === "Technik" ? 0 : Math.min(basis, 1)) : basis;
  const frist = hmWerktagePlus(heute, fristTage);
  /* Titel: erster Satz ohne Gruß und Füllwörter, an Wortgrenze gekürzt */
  let kern = (ohneGruss.split("\n")[0] || "").trim();
  const ende = kern.search(/[^\d][.?!](\s|$)/);
  if (ende >= 0) kern = kern.slice(0, ende + 1);
  for (let i = 0; i < 3; i++) kern = kern.replace(/^(bitte|kurz|ich wollte (kurz )?fragen,? ob|könnt ihr|koennt ihr|könntet ihr|können wir|wäre es möglich,?|ist es möglich,?)\s+/i, "");
  kern = kern.replace(/[.?!,;:\s]+$/, "");
  if (kern.length > 56) {
    const komma = kern.slice(0, 56).lastIndexOf(",");
    kern = komma >= 20 ? kern.slice(0, komma) : kern.slice(0, Math.max(20, kern.slice(0, 56).lastIndexOf(" ")));
    kern = kern.replace(/[,;:\s]+$/, "");
  }
  kern = kern.charAt(0).toUpperCase() + kern.slice(1);
  const titel = kern ? (art === "Sonstiges" ? kern : `${art}: ${kern}`) : "";
  /* Treffer in der Schreibweise des Maklers zeigen */
  const orig = ohneGruss.split(/[^A-Za-zÄÖÜäöüß0-9]+/).filter(Boolean);
  const hits = [...new Set((treffer[art] || []).map((kw) => { const k = kw.split(" "); const i = orig.findIndex((w) => hmShopNorm(w).startsWith(k[0])); return i >= 0 ? orig.slice(i, i + k.length).join(" ") : kw; }))];
  return {
    art, owner: hmTeamVorname(regel.owner), ownerId: regel.owner, frist, fristTage, titel, dringend,
    bezug: bezug ? { id: bezug.id, titel: bezug.titel } : null,
    gruende: { art: hits.length ? `Stichworte: ${hits.join(", ")}` : "Keine eindeutigen Stichworte", owner: regel.grund, frist: `${fristTage === 0 ? "Heute" : fristTage === 1 ? "1 Werktag" : fristTage + " Werktage"}${dringend ? ", dringend" : ""}` },
  };
}

const HM_ANFRAGE_BEISPIELE = [
  ["Untertitel", "Hallo Ahmet, im Reel zum Grundbuch ist der Untertitel falsch, bitte bis morgen ändern."],
  ["Drohne", "Könnt ihr für das Zinshaus in der Sieveringer Straße auch ein Drohnenvideo machen?"],
  ["Rechnung", "Die Rechnung für September wurde doppelt abgebucht."],
];

function AnfrageSortierer({ m, zu }) {
  const [text, setText] = React.useState("");
  const [ueber, setUeber] = React.useState({});
  const r = React.useMemo(() => hmAnfrageSortieren(text, { maklerId: m && m.id, art: ueber.art, dringend: ueber.dringend }), [text, ueber.art, ueber.dringend, m && m.id]);
  const lotse = React.useMemo(() => (r.art === "Sonderwunsch" ? hmFormatLotse(text) : null), [r.art, text]);
  const owner = ueber.owner || r.owner;
  const titel = ueber.titel != null ? ueber.titel : r.titel;
  const set = (x) => setUeber((u) => ({ ...u, ...x }));
  const anlegen = () => {
    if (!text.trim() || !titel.trim()) { toast("Bitte kurz beschreiben"); return; }
    const zusatz = [r.bezug ? `Bezug: ${r.bezug.titel}.` : "", lotse && lotse.format && lotse.empfehlung !== "sonder" ? `Nächstes Standardformat: ${lotse.format.name}, ${lotse.prozent} %.` : ""].filter(Boolean).join(" ");
    const t = { id: "t" + Date.now(), maklerId: m ? m.id : null, titel: titel.trim(), owner, zustand: "wartet_team", faellig: r.frist, text: text.trim() + (zusatz ? " " + zusatz : ""), art: r.art, dringend: r.dringend, quelle: "chat", bezug: r.bezug ? r.bezug.id : null };
    hmStore.patch("tickets", (l) => [...(l || []), t]);
    if (m) hmEvent(m.id, "ticket", `Anfrage als Ticket an ${owner}: ${t.titel}`, m.name);
    toast(`Ticket an ${owner}, fällig ${hmFmtDate(r.frist)}`);
    setText(""); setUeber({});
    if (zu) zu();
  };
  return <div className="hm-stack">
    <label className="hm-feld"><span>Nachricht</span><textarea rows={4} value={text} placeholder="Was brauchst du vom Team?" onChange={(e) => { setText(e.target.value); set({ titel: undefined }); }} /></label>
    {!text.trim() && <div className="hm-chips">{HM_ANFRAGE_BEISPIELE.map(([k, v]) => <button key={k} className="hm-chip" onClick={() => setText(v)}>Beispiel {k}</button>)}</div>}
    {text.trim() ? <>
      <div className="hm-abschnitt-t">Vorschlag</div>
      <div className="hm-gruppe">
        <div className="hm-reihe"><div className="m"><div className="t">Art</div><div className="u">{r.gruende.art}</div></div><div className="r"><select className="hm-sel" value={r.art} onChange={(e) => set({ art: e.target.value, owner: undefined })}>{[...HM_ANFRAGE_ARTEN.map((a) => a.id), "Sonstiges"].map((a) => <option key={a} value={a}>{a}</option>)}</select></div></div>
        <div className="hm-reihe"><div className="m"><div className="t">Owner</div><div className="u">{ueber.owner ? "Von Hand gewählt" : r.gruende.owner}</div></div><div className="r"><select className="hm-sel" value={owner} onChange={(e) => set({ owner: e.target.value })}>{HM_TEAM.map((t) => <option key={t.id} value={t.name.split(" ")[0]}>{t.name.split(" ")[0]}</option>)}</select></div></div>
        <div className="hm-reihe"><div className="m"><div className="t">Frist {hmDatum(r.frist)}</div><div className="u">{r.gruende.frist}</div></div><div className="r"><button className={"hm-chip" + (r.dringend ? " on" : "")} onClick={() => set({ dringend: !r.dringend })}>Dringend</button></div></div>
        <div className="hm-reihe"><div className="m"><div className="u">Titel</div><input className="hm-sh-titel" value={titel} onChange={(e) => set({ titel: e.target.value })} /></div></div>
        {r.bezug && <div className="hm-reihe"><div className="m"><div className="t">{r.bezug.titel}</div><div className="u">Bezug erkannt</div></div></div>}
      </div>
      {lotse && lotse.format && <><div className="hm-abschnitt-t">Nächstes Standardformat</div><FormatLotse text={text} /></>}
      <div className="hm-row" style={{ justifyContent: "flex-end" }}><Btn knob={<Ico n="plus" />} onClick={anlegen}>Als Ticket anlegen</Btn></div>
    </> : <div className="hm-daten">Art, Owner und Frist erscheinen beim Tippen.</div>}
  </div>;
}

/* ======================================================================
   4. Drehtag-Planer
   ====================================================================== */
const HM_DREH_SLOTS = [["09:00", "12:00"], ["13:00", "16:00"], ["16:30", "19:30"]];
const HM_DREH_SHOT = { talking: "Talking Head", qa: "Frage und Antwort", spaziergang: "Grätzl-Spaziergang", walkthrough: "Objekt-Walkthrough", behind: "Behind the scenes", foto: "Fotos" };
const HM_DREH_AUSSEN = ["spaziergang", "foto", "walkthrough"];
const HM_DREH_TYP = { anhaengen: "An Drehtag anhängen", sammel: "Sammel-Drehtag", einzeln: "Einzeltermin" };
function hmShopHook(c) {
  const s = c.skript || "";
  const q = (s.match(/"[^"]+"|„[^"“]+[“"]/) || [])[0];
  if (q) return q.replace(/["„“]/g, "").trim();
  const k = s.split("\n").map((z) => z.match(HM_GRAFIK_ZEILE)).find(Boolean);
  return k ? k[1].trim() : c.titel;
}
function hmShopDrehFormat(c) {
  if (c.typ === "carousel" || c.typ === "beitrag") return "foto";
  if (c.typ === "story") return "behind";
  const t = hmShopNorm(c.titel + " " + (c.skript || ""));
  if (/spaziergang|vormittag|graetzl|komm mit|ecke/.test(t)) return "spaziergang";
  if (/uebergabe|schluessel|hinter den kulissen|besichtigung/.test(t)) return "behind";
  if (/walkthrough|rundgang|zinshaus|baujahr/.test(t)) return "walkthrough";
  if (/frage|antwort/.test(t)) return "qa";
  return "talking";
}
function hmDrehShot(c, region, ausIdee) {
  const f = hmShopDrehFormat(c);
  const ort = { talking: "Büro", qa: "Büro", spaziergang: `Grätzl ${region}`, walkthrough: "Objekt", behind: "Objekt", foto: `${region}, außen und Objekt` }[f];
  return { shot: f === "foto" ? `Fotos für ${c.titel}` : `${HM_DREH_SHOT[f]}: ${c.titel}`, format: f, hook: f === "foto" ? "" : hmShopHook(c), dauer: f === "foto" ? "20 min" : (HM_FORMATE[f] || {}).dauer || "30 s", ort, done: false, maklerId: c.maklerId, beitrag: c.id, ausIdee: !!ausIdee };
}

/* Offene Drehwünsche bündeln: Beiträge in Planung oder Dreh ohne festen Drehtag plus Drehtage im Status vorschlag.
   Gleiche Region, gemeinsames Zeitfenster (höchstens 10 Tage), 3 Slots à 3 Stunden je Tag. */
function hmDrehtagPlan(eingabe) {
  const E = eingabe || {};
  const heute = E.heute || HM_HEUTE;
  const content = E.content || hmStore.get("content") || [];
  const drehtage = E.drehtage || hmStore.get("drehtage") || [];
  const makler = E.makler || hmStore.get("makler") || [];
  const M = (id) => makler.find((x) => x.id === id) || { id, name: id, region: "" };
  const frueh0 = hmWerktagePlus(heute, 1);
  const aktiv = drehtage.filter((d) => d.status !== "vorschlag" && d.status !== "fertig");
  const fest = (c) => c.drehtag && drehtage.some((d) => d.datum === c.drehtag && d.status !== "vorschlag" && d.slots.some((s) => s.maklerId === c.maklerId));
  const minD = (a, b) => (a < b ? a : b), maxD = (a, b) => (a > b ? a : b);
  /* 1 Wünsche je Makler und Region */
  const W = new Map();
  const wunsch = (maklerId, region) => { const k = maklerId + "|" + region; if (!W.has(k)) W.set(k, { maklerId, region, frueh: frueh0, spaet: hmTagePlus(heute, 21), ziel: null, beitraege: [], quellen: [] }); return W.get(k); };
  content.filter((c) => ["planung", "dreh"].includes(c.zustand) && !fest(c)).forEach((c) => {
    const w = wunsch(c.maklerId, hmBezirk(M(c.maklerId).region));
    w.spaet = minD(w.spaet, c.termin ? hmTagePlus(c.termin.slice(0, 10), -7) : hmTagePlus(heute, 21));
    w.beitraege.push(c);
  });
  drehtage.filter((d) => d.status === "vorschlag").forEach((d) => d.slots.forEach((s) => {
    const w = wunsch(s.maklerId, d.region);
    w.quellen.push(d.id); w.ziel = w.ziel ? minD(w.ziel, d.datum) : d.datum;
    w.frueh = maxD(w.frueh, hmTagePlus(d.datum, -5)); w.spaet = minD(w.spaet, hmTagePlus(d.datum, 5));
  }));
  const wuensche = [...W.values()].map((w) => ({ ...w, knapp: w.spaet < w.frueh, spaet: maxD(w.spaet, w.frueh) }));
  /* 2 Cluster je Region: gemeinsames Fenster nicht leer, höchstens 10 Tage, höchstens 3 Makler */
  const cluster = [];
  [...new Set(wuensche.map((w) => w.region))].forEach((region) => {
    const l = wuensche.filter((w) => w.region === region).sort((a, b) => (a.ziel || a.spaet).localeCompare(b.ziel || b.spaet));
    let akt = null;
    l.forEach((w) => {
      if (akt) {
        const lo = maxD(akt.lo, w.frueh), hi = minD(akt.hi, w.spaet);
        const ref = akt.gruppe[0].ziel || akt.lo, z = w.ziel || w.frueh;
        if (lo <= hi && Math.abs(hmTage(ref, z)) <= 10 && akt.gruppe.length < HM_DREH_SLOTS.length) { akt.gruppe.push(w); akt.lo = lo; akt.hi = hi; return; }
      }
      akt = { region, gruppe: [w], lo: w.frueh, hi: w.spaet }; cluster.push(akt);
    });
  });
  /* 3 Ausformulieren: Anker (geplanter Drehtag vor Ort) oder neuer Tag, Slots, Shotlist, Ersparnis */
  const frei = (d) => HM_DREH_SLOTS.filter(([v, bi]) => !d.slots.some((s) => v < s.bis && s.von < bi));
  const aussen = (w) => w.beitraege.filter((c) => HM_DREH_AUSSEN.includes(hmShopDrehFormat(c))).length;
  const shotsFuer = (w, anker) => {
    const mk = M(w.maklerId);
    let l = w.beitraege.map((c) => hmDrehShot(c, w.region));
    if (!l.length) l = content.filter((c) => c.maklerId === w.maklerId && c.zustand === "idee").slice(0, 3).map((c) => hmDrehShot(c, w.region, true));
    const rest = mk.kontingent && mk.verbraucht ? (mk.kontingent.fotos || 0) - (mk.verbraucht.fotos || 0) : 0;
    const hatPortraits = anker && (anker.plan || []).some((p) => /^Portraits/.test(p.shot) && (!p.maklerId || p.maklerId === w.maklerId));
    if (rest > 0 && !hatPortraits) l.push({ shot: `Portraits ${Math.min(rest, 10)} Stück`, format: "foto", hook: "", dauer: "20 min", ort: "Innenhof oder Büro", done: false, maklerId: w.maklerId, beitrag: null, ausIdee: false });
    return l;
  };
  const ausformen = (cl, belegt) => {
    const { gruppe, region, lo, hi } = cl;
    const neuIn = (d) => gruppe.filter((w) => !d.slots.some((s) => s.maklerId === w.maklerId));
    const ref = gruppe.map((w) => w.ziel).filter(Boolean).sort()[0] || lo;
    const anker = aktiv.filter((d) => d.region === region && d.datum >= lo && d.datum <= hi && neuIn(d).length <= frei(d).length)
      .sort((a, b) => Math.abs(hmTage(a.datum, ref)) - Math.abs(hmTage(b.datum, ref)))[0] || null;
    let datum = anker ? anker.datum : null, konflikt = false;
    if (!anker) {
      /* Neuer Tag frühestens 3 Werktage ab heute, damit Shotlist und Skripte stehen */
      const start = maxD(lo, hmWerktagePlus(heute, 3));
      const kand = [...gruppe.map((w) => w.ziel).filter((z) => z && z >= lo && z <= hi).sort(), start <= hi ? start : lo];
      for (const k of kand) { let t = k; while (t <= hi) { if (hmIstWerktag(t) && !belegt.has(t)) { datum = t; break; } t = hmTagePlus(t, 1); } if (datum) break; }
      if (!datum) { datum = lo; konflikt = true; }
      belegt.add(datum);
    }
    const neu = anker ? neuIn(anker) : [...gruppe].sort((a, b) => aussen(b) - aussen(a) || a.spaet.localeCompare(b.spaet));
    const zeiten = anker ? frei(anker) : HM_DREH_SLOTS;
    const slots = [];
    gruppe.filter((w) => anker && !neu.includes(w)).forEach((w) => { const s = anker.slots.find((x) => x.maklerId === w.maklerId); slots.push({ maklerId: w.maklerId, von: s.von, bis: s.bis, neu: false, shots: shotsFuer(w, anker), grund: "Schon eingeplant, Shotlist ergänzt", spaet: w.spaet }); });
    neu.forEach((w, i) => slots.push({ maklerId: w.maklerId, von: zeiten[i][0], bis: zeiten[i][1], neu: true, shots: shotsFuer(w, anker), spaet: w.spaet,
      grund: anker ? "Team ist schon vor Ort" : i === 0 && aussen(w) > 0 && neu.length > 1 ? "Außenaufnahmen am Vormittag" : `Spätestens ${hmFmtDate(w.spaet)}` }));
    const eingespart = Math.max(0, gruppe.length - (anker ? 0 : 1));
    const typ = anker ? "anhaengen" : gruppe.length > 1 ? "sammel" : "einzeln";
    const namen = hmShopUnd(gruppe.map((w) => M(w.maklerId).name));
    const text = typ === "anhaengen" ? `${namen} an den Drehtag am ${hmFmtDate(datum)} in ${region} anhängen. Das Team ist ohnehin vor Ort.`
      : typ === "sammel" ? `${namen} am ${hmFmtDate(datum)} in ${region} auf einen Tag legen.`
      : `Eigener Termin für ${namen}. Kein zweiter Makler in ${region} innerhalb von 10 Tagen.`;
    return { id: `dp-${hmShopSlug(region)}-${datum}-${gruppe.map((w) => w.maklerId).join("-")}`, typ, region, datum, drehtagId: anker ? anker.id : null, location: anker ? anker.location : `Region ${region}, Ort folgt`, slots, quellen: [...new Set(gruppe.flatMap((w) => w.quellen))], ersparnisTermine: eingespart, ersparnisStunden: eingespart * 1.5, text: text + (konflikt ? " Kein freier Werktag im Fenster, bitte Datum prüfen." : "") + (gruppe.some((w) => w.knapp) ? " Frist ist knapp." : ""), konflikt };
  };
  /* 4 Abo-Grenze: Drehtage pro Monat laut Abo, schon geplante zählen mit */
  const zurueckgestellt = [];
  const erlaubt = (id) => { const mk = M(id); const abo = HM_ABOS.find((a) => a.name === mk.abo) || { drehtage: 1 }; const schon = aktiv.filter((d) => d.datum >= heute && d.datum <= hmTagePlus(heute, 30) && d.slots.some((s) => s.maklerId === id)).length; return Math.max(0, abo.drehtage - schon); };
  let vorschlaege = [];
  for (let runde = 0; runde < 4; runde++) {
    const belegt = new Set(aktiv.map((d) => d.datum));
    vorschlaege = cluster.filter((cl) => cl.gruppe.length).map((cl) => ({ cl, v: ausformen(cl, belegt) }));
    let geaendert = false;
    [...new Set(wuensche.map((w) => w.maklerId))].forEach((id) => {
      const mit = vorschlaege.filter((x) => x.v.slots.some((s) => s.maklerId === id && s.neu));
      const n = erlaubt(id);
      if (mit.length <= n) return;
      mit.sort((a, b) => (a.v.typ === "anhaengen" ? 0 : 1) - (b.v.typ === "anhaengen" ? 0 : 1) || b.cl.gruppe.length - a.cl.gruppe.length || a.v.datum.localeCompare(b.v.datum));
      mit.slice(n).forEach((x) => { const w = x.cl.gruppe.find((g) => g.maklerId === id); x.cl.gruppe = x.cl.gruppe.filter((g) => g !== w); zurueckgestellt.push({ maklerId: id, name: M(id).name, region: x.cl.region, quellen: w.quellen, grund: `Abo enthält ${(HM_ABOS.find((a) => a.name === M(id).abo) || { drehtage: 1 }).drehtage} Drehtag im Monat, Wunsch bleibt stehen` }); geaendert = true; });
    });
    if (!geaendert) break;
  }
  const liste = vorschlaege.map((x) => x.v).sort((a, b) => a.datum.localeCompare(b.datum));
  return { vorschlaege: liste, zurueckgestellt, offen: wuensche.length, summeTermine: liste.reduce((n, v) => n + v.ersparnisTermine, 0), summeStunden: liste.reduce((n, v) => n + v.ersparnisStunden, 0) };
}

/* Vorschlag in hmStore "drehtage" schreiben (vorhandenes Format), Beiträge bekommen ihren Drehtag */
function hmDrehtagUebernehmen(v) {
  const plan = v.slots.flatMap((s) => s.shots);
  const neueSlots = v.slots.filter((s) => s.neu).map((s) => ({ maklerId: s.maklerId, von: s.von, bis: s.bis }));
  let id = v.drehtagId;
  hmStore.patch("drehtage", (l0) => {
    const l = l0 || [];
    if (v.drehtagId) return l.filter((d) => !v.quellen.includes(d.id)).map((d) => (d.id === v.drehtagId ? { ...d, slots: [...d.slots, ...neueSlots], plan: [...(d.plan || []), ...plan], location: d.location === "offen" ? v.location : d.location } : d));
    id = v.quellen[0] || "d" + Date.now().toString(36);
    return [...l.filter((d) => !v.quellen.includes(d.id)), { id, datum: v.datum, region: v.region, location: v.location, slots: neueSlots, status: "geplant", plan }];
  });
  const ids = plan.filter((p) => p.beitrag && !p.ausIdee).map((p) => p.beitrag);
  if (ids.length) hmStore.patch("content", (l) => (l || []).map((c) => (ids.includes(c.id) ? { ...c, drehtag: v.datum } : c)));
  if (hmStore.get("setups")) hmStore.patch("setups", (a) => { const n = { ...a }; v.slots.filter((s) => s.neu).forEach((s) => { const x = n[s.maklerId]; if (x) n[s.maklerId] = { ...x, drehtermine: [...new Set([...(x.drehtermine || []), id])] }; }); return n; });
  v.slots.forEach((s) => hmEvent(s.maklerId, "drehtag", s.neu ? `Drehtag ${hmFmtDate(v.datum)} in ${v.region} geplant, ${s.von} bis ${s.bis}` : `Shotlist für ${hmFmtDate(v.datum)} um ${s.shots.length} Shots ergänzt`, "Team"));
  return id;
}
function hmDrehtagIcs(v, s, name) {
  hmIcs({ titel: `UNIO Drehtag ${name}`, iso: `${v.datum}T${s.von}`, dauer: 180, ort: v.location, text: s.shots.map((p) => `${p.shot}${p.hook ? ", Hook: " + p.hook : ""} (${p.ort}, ${p.dauer})`).join("\n") });
}

function DrehtagPlaner({ zu }) {
  const drehtage = useHm("drehtage"); const content = useHm("content"); const makler = useHm("makler") || [];
  const plan = React.useMemo(() => hmDrehtagPlan({ drehtage: drehtage || [], content: content || [], makler }), [drehtage, content, makler]);
  const [auf, setAuf] = React.useState({});
  const name = (id) => (makler.find((x) => x.id === id) || {}).name || id;
  const uebernehmen = (v) => { hmDrehtagUebernehmen(v); toast(`${v.region}, ${hmFmtDate(v.datum)} übernommen`); };
  const alle = () => { const n = plan.vorschlaege.length, h = plan.summeStunden; plan.vorschlaege.forEach(hmDrehtagUebernehmen); toast(`${n} ${n === 1 ? "Drehtag" : "Drehtage"} übernommen, ${hmShopZahl(h)} h gespart`); if (zu) zu(); };
  return <div className="hm-stack">
    <div className="hm-rechnung">
      <div><b>{plan.offen}</b><span>Drehwünsche offen</span></div>
      <div><b>{plan.summeTermine}</b><span>{plan.summeTermine === 1 ? "Termin eingespart" : "Termine eingespart"}</span></div>
      <div><b>{hmShopZahl(plan.summeStunden)} h</b><span>Anfahrt und Aufbau, 1,5 h je Termin</span></div>
    </div>
    {!plan.vorschlaege.length && <Leer titel="Keine offenen Drehwünsche." text="Beiträge in Planung oder Dreh haben einen festen Drehtag." />}
    {plan.vorschlaege.map((v) => <div key={v.id}>
      <div className="hm-sek" style={{ marginTop: 14 }}><span>{v.region} · {hmDatum(v.datum)} · {HM_DREH_TYP[v.typ]}</span><button onClick={() => uebernehmen(v)}>Übernehmen</button></div>
      <div className="hm-gruppe">
        <div className="hm-reihe"><div className="m"><div className="u hm-sh-umbruch">{v.text}{v.ersparnisStunden ? ` Ersparnis ${hmShopZahl(v.ersparnisStunden)} h.` : ""} {v.location}.</div></div></div>
        {v.slots.map((s) => { const k = v.id + s.maklerId; const o = !!auf[k]; return <React.Fragment key={k}>
          <div className="hm-reihe klick" onClick={() => setAuf({ ...auf, [k]: !o })}>
            <div className="m"><div className="t">{name(s.maklerId)}, {s.von} bis {s.bis}</div><div className="u">{s.neu ? "Neuer Slot" : "Bestehender Slot"} · {s.shots.length} Shots · {s.grund}</div></div>
            <div className="r"><button className="hm-klein-btn hell" onClick={(e) => { e.stopPropagation(); hmDrehtagIcs(v, s, name(s.maklerId)); }}>Kalender</button><span className={"hm-sh-chev" + (o ? " auf" : "")}><Ico n="unten" /></span></div>
          </div>
          {o && s.shots.map((p, i) => <div key={i} className="hm-reihe hm-sh-shot"><div className="m"><div className="t">{p.shot}</div><div className="u hm-sh-umbruch">{p.ort} · {p.dauer}{p.hook ? ` · Hook: ${p.hook}` : ""}{p.ausIdee ? " · aus den Ideen" : ""}</div></div></div>)}
        </React.Fragment>; })}
      </div>
    </div>)}
    {plan.zurueckgestellt.length > 0 && <><div className="hm-sek">Zurückgestellt · {plan.zurueckgestellt.length}</div>
      <div className="hm-gruppe">{plan.zurueckgestellt.map((z, i) => <div key={i} className="hm-reihe"><div className="m"><div className="t">{z.name} · {z.region}</div><div className="u hm-sh-umbruch">{z.grund}</div></div></div>)}</div></>}
    {plan.vorschlaege.length > 1 && <div className="hm-row" style={{ justifyContent: "flex-end" }}><Btn knob={<Ico n="haken" />} onClick={alle}>Alle übernehmen</Btn></div>}
  </div>;
}

/* ======================================================================
   5. Fristen-Wächter und Community-Seed
   ====================================================================== */
const HM_COMMUNITY_KANAL = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", linkedin: "LinkedIn" };
const HM_COMMUNITY_TYP = { kommentar: "Kommentar", dm: "Nachricht" };
function hmCommunityBeispiele(jetzt) {
  const t = (min) => (jetzt || Date.now()) - min * 6e4;
  return [
    { id: "cm1", maklerId: "elif", kanal: "instagram", typ: "kommentar", von: "@lena.favoriten", text: "Und was kostet so eine Wohnung am Reumannplatz gerade?", beitrag: "k1", t: t(95), beantwortet: false, beantwortetAm: null },
    { id: "cm2", maklerId: "elif", kanal: "instagram", typ: "dm", von: "Jana K.", text: "Hallo Elif, wir suchen auch in Favoriten, drei Zimmer, Budget bis 400.000. Hast du diese Woche Zeit für ein Gespräch?", beitrag: "k2", t: t(25), beantwortet: false, beantwortetAm: null },
    { id: "cm3", maklerId: "elif", kanal: "tiktok", typ: "kommentar", von: "@wien.wohnen.jetzt", text: "Ist das Sonnwendviertel nicht schon teurer als der Vierte?", beitrag: "k1", t: t(240), beantwortet: false, beantwortetAm: null },
    { id: "cm4", maklerId: "markus", kanal: "linkedin", typ: "kommentar", von: "Thomas Berger", text: "Spannende Zahlen. Wie entwickeln sich die Zinshauspreise in 1190 im Vergleich zu 1180?", beitrag: "m1", t: t(70), beantwortet: false, beantwortetAm: null },
    { id: "cm5", maklerId: "markus", kanal: "instagram", typ: "dm", von: "Familie Wallner", text: "Guten Tag Herr Leitner, wir erben eine Wohnung in Grinzing und überlegen zu verkaufen. Können Sie uns eine Einschätzung geben?", beitrag: "m2", t: t(12), beantwortet: false, beantwortetAm: null },
  ];
}
/* Schreibt nur, wenn der Key fehlt */
function hmSeedCommunity() { if (hmStore.get("community") == null) hmStore.put("community", hmCommunityBeispiele(Date.now())); }

/* Alles, was liegt: {id, art, titel, maklerId, seit, ueberfaellig, text, aktion} */
function hmFristen(eingabe) {
  const E = eingabe || {};
  const g = (k) => (E[k] !== undefined ? E[k] : hmStore.get(k));
  const heute = E.heute || HM_HEUTE, jetzt = E.jetzt || Date.now();
  const content = g("content") || [], ein = g("einrichtung") || {}, einD = g("einrichtung_daten") || {}, tickets = g("tickets") || [];
  const makler = g("makler") || [], community = g("community") || [], events = g("events") || [], drehtage = g("drehtage") || [];
  const out = [];
  /* Freigaben länger als 3 Tage. Seit: freigabeSeit, sonst Ereignis "zur Freigabe gesendet", sonst geschätzt 6 Tage vor Termin */
  content.filter((c) => c.zustand === "freigabe").forEach((c) => {
    const ev = events.find((e) => e.maklerId === c.maklerId && e.text === `${c.titel}: zur Freigabe gesendet`);
    const seit = c.freigabeSeit ? String(c.freigabeSeit).slice(0, 10) : ev ? hmIsoLokal(new Date(ev.t)) : c.termin ? hmTagePlus(c.termin.slice(0, 10), -6) : null;
    if (!seit) return;
    const tage = hmTage(seit, heute);
    if (tage <= 3) return;
    out.push({ id: "fg-" + c.id, art: "Freigabe", titel: c.titel, maklerId: c.maklerId, seit, ueberfaellig: true, text: `Wartet seit ${tage} Tagen auf Freigabe${!c.freigabeSeit && !ev ? " (geschätzt)" : ""}`, aktion: { typ: "erinnern", label: "Erinnern", text: `Erinnerung: ${c.titel} freigeben` } });
  });
  /* Einrichtung beim Team */
  Object.entries(ein).forEach(([mid, st]) => Object.entries(st || {}).forEach(([bid, z]) => {
    if (z !== "wartet_team") return;
    const e = HM_EINRICHTUNG.find((x) => x.id === bid) || { titel: bid };
    const d = (einD[mid] || {})[bid] || {};
    const termin = d.terminIso ? d.terminIso.slice(0, 10) : null;
    out.push({ id: `ew-${mid}-${bid}`, art: "Einrichtung", titel: e.titel, maklerId: mid, seit: d.seit || termin || null, ueberfaellig: !!termin && termin < heute, text: termin ? (termin < heute ? `Termin war am ${hmFmtDate(termin)}, Schritt noch beim Team` : `Termin am ${hmFmtDate(termin)}`) : "Wartet auf das Team", aktion: { typ: "einrichtung", label: "Erledigt", baustein: bid } });
  }));
  /* Überfällige Tickets */
  tickets.filter((t) => t.zustand !== "fertig" && t.faellig && t.faellig < heute).forEach((t) => out.push({ id: "tk-" + t.id, art: "Ticket", titel: t.titel, maklerId: t.maklerId, seit: t.faellig, ueberfaellig: true, text: `${t.owner}, fällig seit ${hmFmtDate(t.faellig)}`, aktion: { typ: "ticket", label: "Erledigt", ticketId: t.id } }));
  /* Kontingent am 20. zu 40 Prozent ungenutzt, nur mit laufender Produktion */
  if (Number(heute.slice(8, 10)) >= 20) makler.forEach((m) => {
    if (!m.kontingent || !m.verbraucht) return;
    if (!drehtage.some((d) => d.status !== "vorschlag" && d.slots.some((s) => s.maklerId === m.id))) return;
    const teile = [["videos", "Videos"], ["fotos", "Fotos"], ["grafiken", "Grafiken"]].filter(([k]) => m.kontingent[k] && (m.kontingent[k] - (m.verbraucht[k] || 0)) / m.kontingent[k] >= 0.4).map(([k, n]) => `${m.kontingent[k] - (m.verbraucht[k] || 0)} von ${m.kontingent[k]} ${n}`);
    if (!teile.length) return;
    out.push({ id: `kt-${m.id}-${heute.slice(0, 7)}`, art: "Kontingent", titel: `Kontingent ungenutzt: ${m.name}`, maklerId: m.id, seit: heute.slice(0, 8) + "20", ueberfaellig: false, text: `${hmShopUnd(teile)} offen. Vorschlag: am nächsten Drehtag Evergreen-Inhalte vorproduzieren`, aktion: { typ: "vorproduktion", label: "An Ahmet", schluessel: `vorprod-${m.id}-${heute.slice(0, 7)}` } });
  });
  /* Community älter als 60 Minuten */
  community.filter((n) => !n.beantwortet && jetzt - n.t > 36e5).forEach((n) => out.push({ id: "cm-" + n.id, art: "Community", titel: `${HM_COMMUNITY_TYP[n.typ] || "Nachricht"} von ${n.von}`, maklerId: n.maklerId, seit: n.t, ueberfaellig: true, text: `${HM_COMMUNITY_KANAL[n.kanal] || n.kanal}, wartet ${hmAlterText(n.t, jetzt)}`, aktion: { typ: "erinnern", label: "Erinnern", text: `Erinnerung: ${HM_COMMUNITY_TYP[n.typ] || "Nachricht"} von ${n.von} beantworten` } }));
  const ms = (s) => (typeof s === "number" ? s : s ? new Date(s + "T12:00").getTime() : Infinity);
  return out.sort((a, b) => b.ueberfaellig - a.ueberfaellig || ms(a.seit) - ms(b.seit));
}

function FristenListe({ makler, oeffne, nur, leer }) {
  useHm("content"); useHm("einrichtung"); useHm("community"); useHm("drehtage"); useHm("makler");
  const tickets = useHm("tickets") || [];
  const [, setTick] = React.useState(0);
  React.useEffect(() => { hmSeedCommunity(); const i = setInterval(() => setTick((x) => x + 1), 60000); return () => clearInterval(i); }, []);
  const filter = typeof makler === "string" ? makler : makler && !Array.isArray(makler) ? makler.id : null;
  const alle = hmStore.get("makler") || [];
  const name = (id) => (alle.find((x) => x.id === id) || {}).name || id || "Team";
  const liste = hmFristen().filter((f) => (!filter || f.maklerId === filter) && (!nur || nur(f)));
  if (!liste.length && leer === null) return null;
  const tun = (f) => {
    const a = f.aktion;
    if (a.typ === "erinnern") { hmEvent(f.maklerId, "erinnerung", a.text, "Team"); toast("Erinnert"); }
    if (a.typ === "ticket") { hmStore.patch("tickets", (l) => (l || []).map((t) => (t.id === a.ticketId ? { ...t, zustand: "fertig" } : t))); toast("Ticket erledigt"); }
    if (a.typ === "einrichtung") { hmStore.patch("einrichtung", (e) => ({ ...(e || {}), [f.maklerId]: { ...((e || {})[f.maklerId] || {}), [a.baustein]: "fertig" } })); hmEvent(f.maklerId, "einrichtung", `${f.titel}: erledigt`, "Team"); toast("Erledigt"); }
    if (a.typ === "vorproduktion") { hmStore.patch("tickets", (l) => [...(l || []), { id: "t" + Date.now(), maklerId: f.maklerId, titel: `Vorproduktion: ${f.titel.replace("Kontingent ungenutzt: ", "")}`, owner: "Ahmet", zustand: "wartet_team", faellig: hmWerktagePlus(HM_HEUTE, 3), text: f.text, art: "Sonderwunsch", quelle: "fristen", schluessel: a.schluessel }]); toast("Ticket an Ahmet"); }
  };
  return <div className="hm-gruppe">
    {liste.map((f) => { const erledigt = f.aktion.typ === "vorproduktion" && tickets.some((t) => t.schluessel === f.aktion.schluessel); return <div key={f.id} className={"hm-reihe" + (oeffne ? " klick" : "")} onClick={() => oeffne && oeffne(f)}>
      <div className="m"><div className="t">{f.titel}</div><div className="u hm-sh-umbruch">{f.art}{filter ? "" : " · " + name(f.maklerId)} · {f.text}</div></div>
      <div className="r">{f.ueberfaellig && <span className="hm-status"><i className="hm-sh-rot-bg"></i>Überfällig</span>}{erledigt ? <span className="hm-status"><i style={{ background: "var(--ink)" }}></i>Beim Team</span> : <button className="hm-klein-btn hell" onClick={(e) => { e.stopPropagation(); tun(f); }}>{f.aktion.label}</button>}</div>
    </div>; })}
    {!liste.length && <div className="hm-reihe"><div className="m"><div className="u">Keine Frist läuft ab.</div></div></div>}
  </div>;
}

/* ======================================================================
   6. Community-Postfach: der Makler antwortet selbst, das Werkzeug erinnert nur
   ====================================================================== */
function Community({ m, kompakt }) {
  const alle = useHm("community") || [];
  const content = useHm("content") || [];
  const [jetzt, setJetzt] = React.useState(Date.now());
  React.useEffect(() => { hmSeedCommunity(); const i = setInterval(() => setJetzt(Date.now()), 30000); return () => clearInterval(i); }, []);
  const mid = m ? m.id || m : null;
  const meine = alle.filter((n) => !mid || n.maklerId === mid);
  const offen = meine.filter((n) => !n.beantwortet).sort((a, b) => a.t - b.t);
  const erledigt = meine.filter((n) => n.beantwortet).sort((a, b) => (b.beantwortetAm || 0) - (a.beantwortetAm || 0));
  const rot = offen.filter((n) => jetzt - n.t >= 36e5).length;
  const heute = erledigt.filter((n) => n.beantwortetAm && hmIsoLokal(new Date(n.beantwortetAm)) === hmIsoLokal(new Date(jetzt))).length;
  const titel = (id) => (content.find((c) => c.id === id) || {}).titel;
  const markieren = (n, an) => {
    hmStore.patch("community", (l) => (l || []).map((x) => (x.id === n.id ? { ...x, beantwortet: an, beantwortetAm: an ? Date.now() : null } : x)));
    if (an) { hmEvent(n.maklerId, "community", `${HM_COMMUNITY_TYP[n.typ] || "Nachricht"} von ${n.von} beantwortet`, (m && m.name) || "Makler"); toast("Als beantwortet markiert"); }
  };
  const zeile = (n, fertig) => { const alt = !fertig && jetzt - n.t >= 36e5; const bt = titel(n.beitrag); return <div key={n.id} className="hm-reihe hm-sh-nachricht">
    <div className="m">
      <div className="t">{n.von}</div>
      <div className="hm-sh-text">{n.text}</div>
      <div className="u hm-sh-umbruch">{HM_COMMUNITY_KANAL[n.kanal] || n.kanal} · {HM_COMMUNITY_TYP[n.typ] || "Nachricht"}{bt ? ` · ${bt}` : ""}</div>
    </div>
    <div className="r">
      {fertig ? <span className="hm-daten">beantwortet</span> : <span className={"hm-sh-alter" + (alt ? " rot" : "")}>{hmAlterText(n.t, jetzt)}</span>}
      <button className={"hm-klein-btn" + (fertig ? " hell" : "")} onClick={() => markieren(n, !fertig)}>{fertig ? "Zurück" : "Beantwortet"}</button>
    </div>
  </div>; };
  if (kompakt) return offen.length ? <><div className="hm-sek">Kommentare und Nachrichten · {offen.length}{rot ? <span className="hm-sh-rot" style={{ fontWeight: 400 }}>{rot} warten länger als 60 Minuten</span> : null}</div><div className="hm-gruppe">{offen.map((n) => zeile(n, false))}</div></> : null;
  return <div className="hm-stack">
    <div className="hm-rechnung">
      <div><b>{offen.length}</b><span>offen</span></div>
      <div><b className={rot ? "hm-sh-rot" : ""}>{rot}</b><span>länger als 60 Minuten</span></div>
      <div><b>{heute}</b><span>heute beantwortet</span></div>
    </div>
    <div className="hm-daten">Du antwortest selbst, am besten binnen 60 Minuten. Danach sinkt die Chance, dass aus einem Kommentar ein Gespräch wird.</div>
    {offen.length ? <div className="hm-gruppe">{offen.map((n) => zeile(n, false))}</div> : <Leer titel="Alles beantwortet." text="Neue Kommentare und Nachrichten erscheinen hier mit ihrer Wartezeit." />}
    {erledigt.length > 0 && <><div className="hm-sek">Beantwortet · {erledigt.length}</div><div className="hm-gruppe">{erledigt.slice(0, 5).map((n) => zeile(n, true))}</div></>}
  </div>;
}

/* ======================================================================
   7. Selbsttest der reinen Funktionen
   ====================================================================== */
function hmSelbsttestShop() {
  const out = [];
  const t = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail }); } catch (e) { out.push({ name, ok: false, detail: String((e && e.message) || e) }); } };
  /* Werktage */
  t("Werktage: Freitag plus 1 ist Montag", () => { const x = hmWerktagePlus("2026-10-02", 1); return { ok: x === "2026-10-05", detail: x }; });
  t("Werktage: Nationalfeiertag übersprungen", () => { const x = hmWerktagePlus("2026-10-23", 1); return { ok: x === "2026-10-27", detail: x }; });
  /* Grafik */
  t("Grafik: Kacheln aus Skript", () => { const k = hmGrafikKacheln({ skript: "Kachel 1: Wie viel Wohnung kann ich mir leisten?\nKachel 2: Eigenmittel, mindestens 20 Prozent\nKachel 3: Speichern und teilen" }); return { ok: k.length === 3 && k[1].startsWith("Eigenmittel"), detail: k.join(" | ") }; });
  t("Grafik: Kacheln ohne Skript bekommen Handlungsaufruf", () => { const k = hmGrafikKacheln({ titel: "Fünf Mythen über den Zinshausmarkt", skript: "" }); return { ok: k.length === 2 && k[1] === "Speichern und teilen", detail: k.join(" | ") }; });
  t("Grafik: Zahl mit Einheit", () => { const z = hmGrafikZahl("Die Rate, maximal 40 Prozent vom Netto"); return { ok: z && z.zahl === "40 %", detail: z && z.zahl }; });
  t("Grafik: Umbruch hält die Breite", () => { const cv = document.createElement("canvas"); const ctx = cv.getContext("2d"); ctx.font = "40px serif"; const l = hmGrafikUmbruch(ctx, "Warum das erste Angebot selten das beste ist und was du stattdessen tust", 300); return { ok: l.length > 1 && l.every((z) => ctx.measureText(z).width <= 300 || !z.includes(" ")), detail: `${l.length} Zeilen` }; });
  /* Format-Lotse */
  t("Lotse: Drohne", () => { const r = hmFormatLotse("Drohnenflug über das Haus mit Garten"); return { ok: r.format && r.format.id === "drohne" && r.prozent >= 60, detail: `${r.format && r.format.name}, ${r.prozent} %` }; });
  t("Lotse: Kunden-Interview am Balkon wird Behind the scenes", () => { const r = hmFormatLotse("Kunden-Interview am Balkon"); return { ok: r.format && r.format.vorschlagKey === "behind" && r.preisDiff > 0, detail: `${r.format && r.format.name}, ${r.prozent} %, ${r.preisText}` }; });
  t("Lotse: Rundgang als Video", () => { const r = hmFormatLotse("Rundgang durch die neue Wohnung als Video"); return { ok: r.format && r.format.id === "walkthrough" && r.prozent >= 90, detail: `${r.format && r.format.name}, ${r.prozent} %` }; });
  t("Lotse: Flyer wird Faltmappe", () => { const r = hmFormatLotse("Flyer für die Nachbarschaft"); return { ok: r.format && r.format.id === "faltmappe", detail: `${r.format && r.format.name}, ${r.prozent} %` }; });
  t("Lotse: ohne Stichworte", () => { const r = hmFormatLotse("Etwas ganz Neues"); return { ok: !r.format && r.prozent === 0 && r.empfehlung === "sonder", detail: r.begruendung }; });
  /* Anfrage-Sortierer */
  const bsp = [{ id: "m4", maklerId: "markus", titel: "So lesen Sie das Grundbuch" }, { id: "m3", maklerId: "markus", titel: "Warum das erste Angebot selten das beste ist" }];
  t("Anfrage: Korrektur, dringend, mit Bezug", () => { const r = hmAnfrageSortieren("Hallo Ahmet, im Reel zum Grundbuch ist der Untertitel falsch, bitte bis morgen ändern.", { maklerId: "markus", content: bsp }); return { ok: r.art === "Korrektur" && r.owner === "Ahmet" && r.dringend && r.frist === "2026-09-29" && r.bezug && r.bezug.id === "m4", detail: `${r.art}, ${r.owner}, ${r.frist}, ${r.titel}` }; });
  t("Anfrage: Rechnung an Nikita", () => { const r = hmAnfrageSortieren("Die Rechnung für September wurde doppelt abgebucht.", { content: [] }); return { ok: r.art === "Rechnung" && r.owner === "Nikita" && r.frist === "2026-10-01", detail: `${r.art}, ${r.owner}, ${r.frist}` }; });
  t("Anfrage: Sonderwunsch an Daniel", () => { const r = hmAnfrageSortieren("Könnt ihr für mein Penthouse auch ein Drohnenvideo machen?", { content: [] }); return { ok: r.art === "Sonderwunsch" && r.owner === "Daniel" && !r.dringend, detail: `${r.art}, ${r.owner}, ${r.titel}` }; });
  t("Anfrage: Termin an Ahmet", () => { const r = hmAnfrageSortieren("Können wir den Drehtag am 6. Oktober verschieben?", { content: [] }); return { ok: r.art === "Termin" && r.owner === "Ahmet" && r.fristTage === 1, detail: `${r.art}, ${r.owner}, ${r.titel}` }; });
  t("Anfrage: Technik heute, wenn dringend", () => { const r = hmAnfrageSortieren("Dringend: mein Passwort geht nicht mehr", { content: [] }); return { ok: r.art === "Technik" && r.fristTage === 0 && r.frist === "2026-09-28", detail: `${r.art}, ${r.owner}, ${r.frist}` }; });
  /* Drehtag-Planer */
  const mk = [
    { id: "markus", name: "Markus Leitner", region: "1190 Döbling", abo: "Personal Brand Premium", kontingent: { videos: 5, fotos: 15, grafiken: 7 }, verbraucht: { videos: 2, fotos: 15, grafiken: 3 } },
    { id: "sara", name: "Sara Novak", region: "1070 Neubau", abo: "Personal Brand", kontingent: { videos: 3, fotos: 10, grafiken: 7 }, verbraucht: { videos: 0, fotos: 0, grafiken: 0 } },
    { id: "elif", name: "Elif Demir", region: "1100 Favoriten", abo: "Personal Brand", kontingent: { videos: 3, fotos: 10, grafiken: 7 }, verbraucht: { videos: 1, fotos: 4, grafiken: 2 } },
  ];
  const dt = [
    { id: "d2", datum: "2026-09-29", region: "Favoriten", location: "Reumannplatz", slots: [{ maklerId: "elif", von: "13:00", bis: "16:00" }], status: "geplant", plan: [{ shot: "Portraits 10 Stück", format: "foto", hook: "", dauer: "20 min", ort: "Innenhof", done: false }] },
    { id: "d3", datum: "2026-10-06", region: "Döbling", location: "Objekt Sieveringer Straße", slots: [{ maklerId: "markus", von: "09:00", bis: "12:00" }], status: "geplant", plan: [] },
    { id: "d4", datum: "2026-10-09", region: "Neubau", location: "offen", slots: [{ maklerId: "sara", von: "10:00", bis: "13:00" }], status: "vorschlag", plan: [] },
    { id: "d5", datum: "2026-10-08", region: "Döbling", location: "offen", slots: [{ maklerId: "sara", von: "14:00", bis: "17:00" }], status: "vorschlag", plan: [] },
  ];
  const ct = [
    { id: "k6", maklerId: "elif", titel: "Neubau in Favoriten: drei Projekte, drei Preise", typ: "carousel", zustand: "planung", termin: "2026-10-10T18:00", drehtag: "", skript: "" },
    { id: "m5", maklerId: "markus", titel: "Zinshaus Sieveringer Straße", typ: "reel", zustand: "planung", termin: "", drehtag: "2026-10-06", skript: "" },
    { id: "s1", maklerId: "sara", titel: "Neubau, eine Straße, drei Jahrhunderte", typ: "reel", zustand: "idee", termin: "", drehtag: "", skript: "" },
  ];
  t("Drehtag: Sara an Döbling anhängen, Neubau zurückgestellt, 3 h gespart", () => {
    const p = hmDrehtagPlan({ makler: mk, drehtage: dt, content: ct, heute: "2026-09-28" });
    const d3 = p.vorschlaege.find((v) => v.drehtagId === "d3");
    const ok = d3 && d3.slots.some((s) => s.maklerId === "sara" && s.neu && s.von === "13:00") && d3.quellen.includes("d5") && p.zurueckgestellt.some((z) => z.maklerId === "sara" && z.region === "Neubau") && p.summeStunden === 3 && p.vorschlaege.some((v) => v.drehtagId === "d2" && v.slots[0].shots.length === 1);
    return { ok, detail: `${p.vorschlaege.map((v) => `${v.region} ${v.datum} ${v.typ}`).join(", ")}; ${hmShopZahl(p.summeStunden)} h` };
  });
  t("Drehtag: zwei Makler ohne Anker werden Sammel-Drehtag", () => {
    const p = hmDrehtagPlan({ makler: [{ ...mk[1], region: "1190 Döbling" }, mk[0]], drehtage: [], content: [{ ...ct[2], zustand: "planung", termin: "2026-10-20T18:00" }, { ...ct[1], drehtag: "", termin: "2026-10-22T18:00" }], heute: "2026-09-28" });
    const v = p.vorschlaege[0];
    return { ok: p.vorschlaege.length === 1 && v.typ === "sammel" && v.slots.length === 2 && v.ersparnisStunden === 1.5 && hmIstWerktag(v.datum), detail: v ? `${v.datum}, ${v.slots.map((s) => s.maklerId + " " + s.von).join(", ")}` : "kein Vorschlag" };
  });
  /* Fristen */
  t("Fristen: je Art ein Treffer", () => {
    const jetzt = Date.now();
    const f = hmFristen({ heute: "2026-09-28", jetzt, events: [], einrichtung_daten: {}, makler: [mk[2]], drehtage: dt,
      content: [{ id: "x1", maklerId: "elif", titel: "Test", zustand: "freigabe", termin: "2026-09-30T18:00" }, { id: "x2", maklerId: "elif", titel: "Frisch", zustand: "freigabe", termin: "2026-10-05T18:00" }],
      tickets: [{ id: "t9", titel: "Alt", owner: "Daniel", zustand: "blockiert", faellig: "2026-09-22" }, { id: "t8", titel: "Neu", owner: "Daniel", zustand: "offen", faellig: "2026-09-30" }],
      einrichtung: { markus: { konten: "wartet_team", foto: "fertig" } },
      community: [{ id: "c1", maklerId: "elif", kanal: "instagram", typ: "dm", von: "A", t: jetzt - 90 * 6e4 }, { id: "c2", maklerId: "elif", kanal: "instagram", typ: "dm", von: "B", t: jetzt - 10 * 6e4 }] });
    const n = (a) => f.filter((x) => x.art === a).length;
    return { ok: n("Freigabe") === 1 && n("Ticket") === 1 && n("Einrichtung") === 1 && n("Kontingent") === 1 && n("Community") === 1 && f[0].ueberfaellig, detail: f.map((x) => x.art).join(", ") };
  });
  t("Community: Beispiele für markus und elif", () => { const l = hmCommunityBeispiele(Date.now()); return { ok: l.length === 5 && l.every((x) => ["markus", "elif"].includes(x.maklerId) && !x.beantwortet), detail: `${l.length} Einträge` }; });
  t("Alter: rot ab 60 Minuten lesbar", () => { const j = Date.now(); const a = hmAlterText(j - 25 * 6e4, j), b = hmAlterText(j - 70 * 6e4, j); return { ok: a === "seit 25 Min" && b === "seit 1 Std 10 Min", detail: `${a}, ${b}` }; });
  return out;
}

Object.assign(window, {
  hmShopNorm, hmShopTokens, hmShopUnd, hmShopZahl, hmShopSlug, hmShopDatei, hmShopTrifft,
  HM_FEIERTAGE, hmTagePlus, hmIstWerktag, hmWerktagePlus, hmBezirk, hmAlterText,
  HM_GRAFIK_FARBEN, HM_GRAFIK_MASSE, HM_GRAFIK_VORLAGEN, hmGrafikKacheln, hmGrafikZahl, hmGrafikUmbruch, hmGrafikRender, hmGrafikSchriften, hmGrafikBild, hmJsZip, GrafikGenerator,
  HM_LOTSE_STUNDENSATZ, HM_LOTSE_AUFWAND, HM_LOTSE_KONZEPTE, HM_LOTSE_FORMATE, hmFormatLotse, FormatLotse,
  HM_ANFRAGE_ARTEN, HM_ANFRAGE_OWNER, hmAnfrageSortieren, AnfrageSortierer,
  HM_DREH_SLOTS, HM_DREH_TYP, hmDrehtagPlan, hmDrehtagUebernehmen, hmDrehtagIcs, DrehtagPlaner,
  HM_COMMUNITY_KANAL, HM_COMMUNITY_TYP, hmCommunityBeispiele, hmSeedCommunity, hmFristen, FristenListe, Community,
  hmSelbsttestShop,
});
