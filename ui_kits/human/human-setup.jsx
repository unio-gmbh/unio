/* UNIO HUMAN. Werkzeuge Stufe 4 (Setups): Logos als Vektorpfade, Brand-Kit als ZIP, Kontrast, Farben aus
   vorhandenem Logo, Website als Paket, Impressum-Prüfung. Alles im Browser, ohne Tokens. */

/* ---------- Bibliotheken per Script-Tag (kein import() wegen Babel) ---------- */
const hmSkriptLaden = (() => { const c = {}; return (url, global) => c[url] || (c[url] = new Promise((res, rej) => { if (window[global]) return res(window[global]); const s = document.createElement("script"); s.src = url; s.onload = () => res(window[global]); s.onerror = () => { delete c[url]; rej(new Error("Laden fehlgeschlagen: " + url)); }; document.head.appendChild(s); })); })();
const hmJszip = () => hmSkriptLaden("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js", "JSZip");
const hmOpentype = () => hmSkriptLaden("https://cdnjs.cloudflare.com/ajax/libs/opentype.js/1.3.4/opentype.min.js", "opentype");

/* ---------- Schrift als Datei: Fontsource (WOFF), Power Grotesk aus dem Repo ---------- */
const hmFontCache = {};
function hmFontsource(name, gewicht) {
  if (name === "Power Grotesk") return new URL(`../../assets/fonts/PowerGrotesk-${gewicht >= 600 ? "Bold" : "Regular"}.woff`, location.href).href;
  const id = name.toLowerCase().replace(/\s+/g, "-");
  const w = name === "DM Serif Display" ? 400 : gewicht;
  return `https://cdn.jsdelivr.net/fontsource/fonts/${id}@latest/latin-${w}-normal.woff`;
}
async function hmFontDatei(name, gewicht) {
  const url = hmFontsource(name, gewicht);
  if (!hmFontCache[url]) hmFontCache[url] = (async () => { const ot = await hmOpentype(); const buf = await (await fetch(url)).arrayBuffer(); return ot.parse(buf); })().catch((e) => { delete hmFontCache[url]; throw e; });
  return hmFontCache[url];
}
/* Text als Pfad mit Laufweite (em) und Kerning; gibt d-String und Breite zurück */
function hmTextPfad(font, text, x, y, groesse, laufweite) {
  const k = groesse / font.unitsPerEm; let d = ""; let pos = x; let vorher = null;
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    if (vorher) pos += font.getKerningValue(vorher, g) * k;
    d += g.getPath(pos, y, groesse).toPathData(2);
    pos += g.advanceWidth * k + laufweite * groesse; vorher = g;
  }
  return { d, breite: pos - x };
}
/* Logo wie BrandLogo, aber als Pfade: druckfähig ohne installierte Schrift */
async function hmLogoSvg(b, typ, farbe) {
  const ink = farbe || "#0B0A09";
  const fd = b.schrift ? b.schrift.d : "Power Grotesk";
  const rund = (v) => Math.round(v * 10) / 10;
  if (typ === "monogramm") {
    const f = await hmFontDatei(fd, 400);
    const t = hmTextPfad(f, b.initialen, 0, 0, 38, -1 / 38);
    const x = 50 - t.breite / 2;
    const p = hmTextPfad(f, b.initialen, x, 62, 38, -1 / 38);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="47" fill="none" stroke="${ink}" stroke-width="3"/><path d="${p.d}" fill="${ink}"/><circle cx="78" cy="26" r="6" fill="${b.akzent}"/></svg>`;
  }
  const f4 = await hmFontDatei(fd, 400), f7 = typ === "wort" ? await hmFontDatei(fd, 700) : f4;
  const ls = -1.5 / 42;
  const a = hmTextPfad(f4, b.vor + " ", 0, 44, 42, ls);
  const n = hmTextPfad(f7, b.nach, a.breite, 44, 42, ls);
  let breite = a.breite + n.breite, extra = "";
  if (typ === "punkt") { extra = `<circle cx="${rund(breite + 8)}" cy="38" r="6" fill="${b.akzent}"/>`; breite += 16; }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 0 ${rund(breite + 4)} 60"><path d="${a.d}${n.d}" fill="${ink}"/>${extra}</svg>`;
}
async function hmSvgZuPng(svg, breite) {
  const img = new Image();
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
  const vb = svg.match(/viewBox="([^"]+)"/)[1].split(" ").map(Number);
  const c = document.createElement("canvas"); c.width = breite; c.height = Math.round((breite * vb[3]) / vb[2]);
  c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
  URL.revokeObjectURL(url);
  return new Promise((res) => c.toBlob(res, "image/png"));
}
const hmLaden = (blob, name) => { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); };

/* ---------- Kontrast (WCAG 2.2) ---------- */
function hmKontrastInfo(hex) {
  const aufPapier = hmKontrast(hex, "#F7F5F1"), weissDrauf = hmKontrast("#FFFFFF", hex);
  return { aufPapier, weissDrauf, text: aufPapier >= 4.5, knopf: weissDrauf >= 4.5, gross: aufPapier >= 3 };
}
const hmZahl = (v) => v.toLocaleString("de-AT", { maximumFractionDigits: 1 });

/* ---------- Brand-Kit als ZIP ---------- */
async function hmBrandKit(m, stand) {
  const b = hmBrand(m.id);
  const JSZip = await hmJszip();
  const zip = new JSZip();
  const slug = (b.vor + "-" + b.nach).toLowerCase().replace(/[^a-z0-9äöüß-]/g, "");
  for (const t of HM_LOGO_TYPEN) {
    stand && stand(`Logo ${t.name}`);
    for (const [v, farbe] of [["dunkel", "#0B0A09"], ["hell", "#F7F5F1"]]) {
      const svg = await hmLogoSvg(b, t.id, farbe);
      zip.file(`logo/${slug}-${t.id}-${v}.svg`, svg);
      zip.file(`logo/${slug}-${t.id}-${v}.png`, await hmSvgZuPng(svg, 2000));
    }
  }
  if (b.portrait) { stand && stand("Porträt"); zip.file(`portrait/${slug}-portrait.png`, await (await fetch(b.portrait)).blob()); }
  const k = hmKontrastInfo(b.akzent);
  zip.file("farben.txt", [`Akzent ${b.akzent}`, "Grund #F7F5F1", "Text #0B0A09", "Fläche #F0EDE6", "Linie #D1D3D5", "", `Akzent auf Grund: ${hmZahl(k.aufPapier)} zu 1 (${k.text ? "für Text geeignet" : k.gross ? "nur für große Schrift und Flächen" : "nur für Flächen"})`, `Weiß auf Akzent: ${hmZahl(k.weissDrauf)} zu 1 (${k.knopf ? "für Knöpfe geeignet" : "für Knöpfe dunkle Schrift verwenden"})`].join("\n"));
  zip.file("schriften.txt", `${b.schrift.d} für Überschriften, ${b.schrift.t} für Text.\nBeide frei verfügbar über Google Fonts (fonts.google.com). Die Logos sind in Pfade umgewandelt und brauchen keine Schrift.`);
  zip.file("leitidee.txt", `${b.claim}\n\n${b.bio || ""}`.trim());
  stand && stand("Wird gepackt");
  hmLaden(await zip.generateAsync({ type: "blob" }), `${slug}-brand-kit.zip`);
}
function BrandKitKnopf({ m }) {
  const [stand, setStand] = React.useState(null);
  const los = async () => { try { await hmBrandKit(m, setStand); toast("Brand-Kit geladen"); } catch (e) { console.warn(e); toast("Brand-Kit konnte nicht erstellt werden"); } setStand(null); };
  return <div className="hm-reihe klick" onClick={() => !stand && los()}><div className="m"><div className="t">Brand-Kit</div><div className="u">{stand || "Logos als Vektor und PNG, Porträt, Farben mit Kontrast, Schriften"}</div></div><div className="r"><Ico n="runter" /></div></div>;
}
async function hmLogoLaden(b, typ, format) {
  const svg = await hmLogoSvg(b, typ);
  const name = `${(b.vor + "-" + b.nach).toLowerCase()}-${typ}`;
  if (format === "png") hmLaden(await hmSvgZuPng(svg, 2000), name + ".png"); else hmLaden(new Blob([svg], { type: "image/svg+xml" }), name + ".svg");
}

/* ---------- Farben aus vorhandenem Logo (Rebranding) ---------- */
async function hmLogoFarbe(src) {
  const img = new Image(); img.crossOrigin = "anonymous";
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = src; });
  const c = document.createElement("canvas"); const k = Math.min(1, 160 / Math.max(img.width, img.height)); c.width = Math.max(1, img.width * k); c.height = Math.max(1, img.height * k);
  const g = c.getContext("2d", { willReadFrequently: true }); g.drawImage(img, 0, 0, c.width, c.height);
  const d = g.getImageData(0, 0, c.width, c.height).data; const eimer = {};
  for (let i = 0; i < d.length; i += 4) {
    const [r, gr, bl, a] = [d[i], d[i + 1], d[i + 2], d[i + 3]];
    if (a < 128) continue;
    const max = Math.max(r, gr, bl), min = Math.min(r, gr, bl);
    if (max - min < 28 || max > 240 || max < 25) continue; /* Grau, Weiß, Schwarz auslassen */
    const key = [r >> 4, gr >> 4, bl >> 4].join(","); eimer[key] = (eimer[key] || 0) + 1;
  }
  const top = Object.entries(eimer).sort((a, b) => b[1] - a[1])[0];
  if (!top) return null;
  const [r, gr, bl] = top[0].split(",").map((x) => (+x << 4) + 8);
  const hex = "#" + [r, gr, bl].map((x) => x.toString(16).padStart(2, "0")).join("").toUpperCase();
  const dist = (h) => { const q = h.match(/\w\w/g).map((x) => parseInt(x, 16)); return (q[0] - r) ** 2 + (q[1] - gr) ** 2 + (q[2] - bl) ** 2; };
  const naechste = [...HM_WEB_AKZENTE].sort((a, b) => dist(a.hex) - dist(b.hex))[0];
  return { hex, naechste };
}
function LogoFarbe({ m, set }) {
  const br = (useHm("branding") || {})[m.id] || {};
  const logo = (br.material || []).find((x) => x.art === "Logo" && x.vorschau);
  const [f, setF] = React.useState(null);
  React.useEffect(() => { if (logo) hmLogoFarbe(logo.vorschau).then(setF).catch(() => setF(null)); }, [logo && logo.id]);
  if (!logo || !f) return null;
  return <div className="hm-row" style={{ gap: 10, fontSize: 13, color: "var(--text-muted)" }}><i style={{ width: 16, height: 16, borderRadius: 4, background: f.hex, flex: "none" }}></i><span>Aus deinem Logo: {f.hex}, am nächsten {f.naechste.name}.</span>{br.akzent !== f.naechste.id && <button className="hm-link" onClick={() => set({ akzent: f.naechste.id })}>Übernehmen</button>}</div>;
}

/* ---------- Impressum-Prüfung (ECG § 5, MedienG § 25, GewO) ---------- */
const HM_RECHTSFORM = /(^|\s)(e\.\s?U\.|GmbH|OG|KG|AG|GesbR)(?=$|[\s,])/;
function hmImpressumCheck(F) {
  const P = [];
  const add = (ok, t) => P.push({ ok, t });
  add(!!F.firma && HM_RECHTSFORM.test(F.firma), F.firma ? (HM_RECHTSFORM.test(F.firma) ? `Firmenwortlaut ${F.firma}` : "Rechtsform fehlt im Firmenwortlaut, etwa e.U. oder GmbH") : "Firmenwortlaut fehlt");
  add(!!F.adresse, F.adresse ? "Anschrift vorhanden" : "Anschrift fehlt");
  add(!!F.mail && !!F.tel, F.mail && F.tel ? "E-Mail und Telefon vorhanden" : "E-Mail oder Telefon fehlt");
  add(/^\d{6,9}$/.test((F.gisa || "").replace(/\s/g, "")), F.gisa ? (/^\d{6,9}$/.test(F.gisa.replace(/\s/g, "")) ? `GISA-Zahl ${F.gisa}` : "GISA-Zahl besteht nur aus Ziffern") : "GISA-Zahl fehlt");
  add(/Magistrat|Bezirkshauptmannschaft|Stadt/i.test(F.behoerde || ""), F.behoerde ? (/Magistrat|Bezirkshauptmannschaft|Stadt/i.test(F.behoerde) ? `Behörde ${F.behoerde}` : "Behörde: Magistrat oder Bezirkshauptmannschaft angeben") : "Gewerbebehörde fehlt");
  add(!F.uid || /^ATU\d{8}$/.test(F.uid.replace(/\s/g, "")), F.uid ? (/^ATU\d{8}$/.test(F.uid.replace(/\s/g, "")) ? `UID ${F.uid}` : "UID hat das Format ATU und acht Ziffern") : "UID nicht angegeben, nur nötig bei UID-Pflicht");
  add(!!F.kammer, F.kammer ? "Kammer und Fachgruppe angegeben" : "Kammer und Fachgruppe fehlen");
  add(!!F.haftpflicht, F.haftpflicht ? "Berufshaftpflicht angegeben" : "Berufshaftpflicht fehlt, für Immobilienmakler Pflicht");
  return P;
}

/* ---------- Website als Paket ---------- */
/* Im Paket: eigene Dateien relativ, UNIO-Bilder von der Basis-Adresse */
function hmPaketAbs(u) { try { if (/^(portrait\.png|data:|https?:|blob:)/.test(u)) return new URL(u, location.href).href; return new URL(u.replace(/^(\.\.\/)+assets\//, ""), HM_BASIS + "/assets/").href; } catch (e) { return u; } }
/* Paket = Original-Template + Füll-Skript + Daten + Porträt. Öffnet sich ohne HUMAN, Bilder der Objekte von unio.at. */
async function hmWebsitePaket(m, b, F, look) {
  const JSZip = await hmJszip();
  const zip = new JSZip();
  const html = await (await fetch(hmShowcaseSrc(look))).text();
  const basis = location.pathname.startsWith("/ux/") ? location.origin : "https://www.unio.at";
  const bb = { vor: b.vor, nach: b.nach, initialen: b.initialen, logo: b.logo, akzent: b.akzent, schrift: b.schrift, makler: { name: b.makler.name }, portrait: b.portrait ? "portrait.png" : null };
  if (b.portrait) zip.file("portrait.png", await (await fetch(b.portrait)).blob());
  /* Funktionen samt Babel-Hilfsfunktionen (_toArray usw.) mitnehmen, damit das Skript alleine läuft */
  const quelle = [hmWebObjekte, hmFuelleTemplate].map((f) => f.toString());
  const helfer = new Set();
  const sammle = (txt) => (txt.match(/\b_[a-zA-Z]+\b/g) || []).forEach((n) => { if (!helfer.has(n) && n !== "_loop" && typeof window[n] === "function") { helfer.add(n); sammle(window[n].toString()); } });
  quelle.forEach(sammle);
  const skript = `<script>
/* UNIO HUMAN: Inhalte für ${b.makler.name}, erzeugt am ${new Date().toLocaleDateString("de-AT")}. */
var HM_BASIS = ${JSON.stringify(basis)};
var hmAbs = ${hmPaketAbs.toString()};
${[...helfer].map((n) => window[n].toString()).join("\n")}
${quelle.join("\n")}
window.addEventListener("load", function () { hmFuelleTemplate(document, ${JSON.stringify(F)}, ${JSON.stringify(bb)}); });
</scr` + `ipt>`;
  zip.file("index.html", html.replace("</body>", skript + "\n</body>"));
  zip.file("LIESMICH.txt", `Website ${b.makler.name}, Look ${look}.\n\nindex.html im Browser öffnen oder den Ordner auf einen Webspace laden.\nVor dem Livegang: Domain ${F.domain || ""}, Impressum und Datenschutz prüfen.\nIm Betrieb veröffentlicht UNIO direkt über die Vercel-Schnittstelle.`);
  hmLaden(await zip.generateAsync({ type: "blob" }), `${(b.vor + "-" + b.nach).toLowerCase()}-website.zip`);
}

Object.assign(window, { hmSkriptLaden, hmJszip, hmOpentype, hmFontDatei, hmTextPfad, hmLogoSvg, hmSvgZuPng, hmLaden, hmKontrastInfo, hmZahl, hmBrandKit, BrandKitKnopf, hmLogoLaden, hmLogoFarbe, LogoFarbe, hmImpressumCheck, hmWebsitePaket });
