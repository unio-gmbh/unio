/* Werkbank. Marktreferenzen für die Logo-Werkstatt.
   Attribute der bekanntesten Maklermarken (Personen und Häuser) in vier Nischen, aus der Recherche vom 01.10.2026
   (Katalog in docs/werkbank/branding-v2/research/MAKLER_BRANDS.md, Screenshots nur lokal). Keine fremden Logos, nur Beschreibung.
   Die Werkstatt liest daraus: die Nische des Maklers, die Muster seiner Nische, die nächste Referenz zu einem Entwurf,
   die Klischees der Nische und die Landkarte (Antiqua bis Grotesk, Wortmarke bis Zeichen). Trainingsdaten im Sinn von Regeln, nicht von Gewichten. */

const HM_BRAND_NISCHEN = [["wohnen", "Wohnen"], ["luxus", "Wohnen Luxus"], ["projekt", "Projektvertrieb"], ["gewerbe", "Gewerbe"]];
const HM_BRAND_KLASSE_X = { antiqua: 0.1, serif_display: 0.22, script: 0.05, slab: 0.5, grotesk: 0.85, geometrisch: 0.95 };
const HM_BRAND_ART_Y = { wortmarke: 0.1, gestapelt: 0.22, monogramm: 0.5, zeichen_und_name: 0.78, emblem: 0.95 };
const HM_BRAND_KLISCHEE_MOTIVE = ["haus", "dach", "schluessel", "wappen"];
const HM_BRAND_NAME = { art: { wortmarke: "Wortmarke", gestapelt: "gestapelte Wortmarke", monogramm: "Monogramm", zeichen_und_name: "Zeichen und Name", emblem: "Emblem" }, klasse: { antiqua: "Antiqua", serif_display: "Display-Serife", script: "Schreibschrift", slab: "Egyptienne", grotesk: "Grotesk", geometrisch: "geometrische Grotesk" }, motiv: { keins: "ohne Zeichen", initialen: "Initialen", haus: "Haus", dach: "Dach", schluessel: "Schlüssel", linie: "Linie", punkt: "Punkt", wappen: "Wappen", abstrakt: "abstraktes Zeichen", ort: "Ortszeichen", sonstiges: "eigenes Zeichen" }, stimmung: { hell: "hell", dunkel: "dunkel", warm: "warm", kuehl: "kühl", gold: "Gold" } };

/* Wird aus der Recherche befüllt (siehe hmBrandDatenLaden am Dateiende) */
let HM_BRAND_REFERENZ = [];

/* Nische des Maklers: Team-Setzung in logos[mid].nische, sonst aus den Objektarten des Fragebogens */
function hmBrandNische(mid) {
  const st = (hmStore.get("logos") || {})[mid] || {};
  if (st.nische) return st.nische;
  const a = ((hmStore.get("fragebogen") || {})[mid] || {}).antworten || {};
  const typen = a.immotypen || [];
  const hat = (re) => typen.some((x) => re.test(x));
  if (hat(/Büro|Retail|Gastronomie|Lager|Praxis|Betriebsobjekt/)) return "gewerbe";
  if (hat(/Bauträger|Abverkauf|Erstbezug/) && !hat(/Zinshaus|Villa|Penthouse/)) return "projekt";
  if (hat(/Luxus|Villa|Penthouse|Off-Market/)) return "luxus";
  return "wohnen";
}
function hmBrandReferenzen(nische, typ) { return HM_BRAND_REFERENZ.filter((r) => (!nische || r.nische === nische) && (!typ || r.typ === typ)); }
function hmBrandZaehlen(liste, pfad) { const z = {}; liste.forEach((r) => { const v = pfad.split(".").reduce((o, k) => (o || {})[k], r); if (v != null) z[v] = (z[v] || 0) + 1; }); return Object.entries(z).sort((a, b) => b[1] - a[1]); }
function hmBrandMuster(nische) {
  const l = hmBrandReferenzen(nische);
  return { n: l.length, klasse: hmBrandZaehlen(l, "logo.schriftklasse"), art: hmBrandZaehlen(l, "logo.art"), motiv: hmBrandZaehlen(l, "logo.zeichenMotiv"), stimmung: hmBrandZaehlen(l, "farben.stimmung"), versal: l.filter((r) => r.logo.versal).length, personen: l.filter((r) => r.typ === "person").length };
}
/* Klischees der Nische: Zeichenmotive und genannte Klischees, nach Häufigkeit */
function hmBrandKlischees(nische) {
  const l = hmBrandReferenzen(nische); const z = {};
  l.forEach((r) => { (r.klischees || []).forEach((k) => { z[k] = (z[k] || 0) + 1; }); if (HM_BRAND_KLISCHEE_MOTIVE.includes(r.logo.zeichenMotiv)) { const n = HM_BRAND_NAME.motiv[r.logo.zeichenMotiv]; z[n] = (z[n] || 0) + 1; } });
  return Object.entries(z).sort((a, b) => b[1] - a[1]).map(([k, n]) => ({ klischee: k, n }));
}
/* Unser Entwurf in den Attributen der Referenzen */
function hmBrandSpecAttribute(spec0) {
  const spec = window.hmLkKlemmen ? hmLkKlemmen(spec0 || {}) : (spec0 || {});
  const S = (window.HM_LK_SCHRIFTEN || []).find((x) => x.f === spec.font) || {};
  const klasse = S.k === "serif" ? (/Display|Playfair/.test(spec.font || "") ? "serif_display" : "antiqua") : (/Space|Manrope/.test(spec.font || "") ? "geometrisch" : "grotesk");
  const art = spec.art === "monogramm" ? "monogramm" : spec.art === "zeichen" ? "zeichen_und_name" : spec.art === "gestapelt" ? "gestapelt" : "wortmarke";
  const motiv = spec.art === "monogramm" ? "initialen" : !spec.zeichen ? "keins" : /ratlinie|ratstrich|zeitmass|graetzl|kante/.test(spec.zeichen) ? "linie" : /fenster|schriftfeld|bogen/.test(spec.zeichen) ? "abstrakt" : /folio/.test(spec.zeichen) ? "punkt" : "sonstiges";
  return { schriftklasse: klasse, art, zeichenMotiv: motiv, versal: !!spec.versal, laufweite: spec.laufweite > 0.12 ? "gesperrt" : spec.laufweite < 0 ? "eng" : "normal", akzentfarbe: !!spec.akzent };
}
/* Ähnlichkeit 0 bis 1 zwischen unserem Entwurf und einer Referenz, mit Gründen */
function hmBrandAehnlichkeit(attr, r) {
  const g = []; let s = 0;
  if (attr.schriftklasse === r.logo.schriftklasse) { s += 0.3; g.push("gleiche Schriftklasse"); } else if ((attr.schriftklasse === "antiqua" && r.logo.schriftklasse === "serif_display") || (attr.schriftklasse === "serif_display" && r.logo.schriftklasse === "antiqua") || (attr.schriftklasse === "grotesk" && r.logo.schriftklasse === "geometrisch") || (attr.schriftklasse === "geometrisch" && r.logo.schriftklasse === "grotesk")) { s += 0.18; g.push("verwandte Schriftklasse"); }
  if (attr.art === r.logo.art) { s += 0.3; g.push("gleiche Logoart"); }
  if (attr.zeichenMotiv === r.logo.zeichenMotiv) { s += 0.2; g.push(attr.zeichenMotiv === "keins" ? "beide ohne Zeichen" : "gleiches Zeichenmotiv"); }
  if (attr.versal === !!r.logo.versal) { s += 0.1; g.push(attr.versal ? "beide in Versalien" : "beide gemischt gesetzt"); }
  if (attr.laufweite === r.logo.laufweite) { s += 0.1; g.push("gleiche Laufweite"); }
  return { score: Math.round(s * 100) / 100, gruende: g };
}
function hmBrandNaechste(spec, nische, k) {
  const attr = hmBrandSpecAttribute(spec);
  const l = hmBrandReferenzen(nische).map((r) => ({ r, ...hmBrandAehnlichkeit(attr, r) })).sort((a, b) => b.score - a.score);
  return { attr, liste: l.slice(0, k || 3), naechste: l[0] || null };
}
/* Satz für den Prüfstand: wie nah am Markt der Nische */
function hmBrandAbstandSatz(spec, mid) {
  const nische = hmBrandNische(mid); const nn = (HM_BRAND_NISCHEN.find((x) => x[0] === nische) || [])[1] || nische;
  const { naechste, attr } = hmBrandNaechste(spec, nische, 1);
  if (!naechste) return { wert: "keine Referenzen", satz: `Für ${nn} liegen noch keine Referenzen vor.`, nah: false };
  const nah = naechste.score >= 0.7;
  return { wert: `${Math.round(naechste.score * 100)} Prozent wie ${naechste.r.name}`, satz: nah ? `Nah an ${naechste.r.name} (${naechste.r.typ === "person" ? "Personenmarke" : "Haus"}, ${naechste.r.land}): ${naechste.gruende.join(", ")}. Eine Achse ändern, damit der Entwurf nicht in der Kohorte verschwindet.` : `Weit genug von ${naechste.r.name}, der nächsten Referenz in ${nn}: ${naechste.gruende.length ? naechste.gruende.join(", ") : "nichts gemeinsam"}.`, nah, attr, nische };
}
/* Punkte der Landkarte: x Antiqua bis Grotesk, y Wortmarke bis Zeichen. Leichter fester Versatz je Referenz, damit sich nichts deckt */
function hmBrandLandkarte(nische, spec) {
  const j = (id, k) => { let h = 2166136261; for (const c of id + k) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return ((h >>> 0) % 1000) / 1000 - 0.5; };
  const P = hmBrandReferenzen(nische).map((r) => ({ id: r.id, name: r.name, typ: r.typ, x: Math.min(0.97, Math.max(0.03, (HM_BRAND_KLASSE_X[r.logo.schriftklasse] ?? 0.5) + j(r.id, "x") * 0.12)), y: Math.min(0.97, Math.max(0.03, (HM_BRAND_ART_Y[r.logo.art] ?? 0.5) + j(r.id, "y") * 0.12)), dunkel: r.farben && (r.farben.stimmung === "dunkel" || r.farben.stimmung === "gold") }));
  let eigen = null;
  if (spec) { const a = hmBrandSpecAttribute(spec); eigen = { x: HM_BRAND_KLASSE_X[a.schriftklasse] ?? 0.5, y: HM_BRAND_ART_Y[a.art] ?? 0.5 }; }
  return { punkte: P, eigen };
}

function hmBrandStil() {
  if (typeof document === "undefined" || document.getElementById("stil-brands")) return;
  const s = document.createElement("style"); s.id = "stil-brands";
  s.textContent = `
.hm-br { display: grid; gap: 22px; }
.hm-br-kopf { display: flex; flex-wrap: wrap; gap: 10px 18px; align-items: baseline; }
.hm-br-kopf h3 { margin: 0; font-size: 20px; font-weight: 400; letter-spacing: -.01em; }
.hm-br-satz { margin: 0; font-size: 15px; line-height: 1.5; color: var(--ink-2); max-width: 70ch; }
.hm-br-karte { border-radius: 18px; background: var(--surface-raised); box-shadow: inset 0 0 0 1px var(--hairline-dark); padding: 14px; }
.hm-br-karte svg { width: 100%; height: auto; display: block; }
.hm-br-liste { display: grid; }
.hm-br-ref { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 2fr) auto; gap: 16px; padding: 12px 0; border-top: 1px solid var(--hairline-dark); font-size: 14px; align-items: baseline; }
.hm-br-ref:last-child { border-bottom: 1px solid var(--hairline-dark); }
.hm-br-ref .n { color: var(--ink); } .hm-br-ref .n span { color: var(--text-muted); display: block; font-size: 13px; }
.hm-br-ref .b { color: var(--ink-2); line-height: 1.45; } .hm-br-ref .s { color: var(--text-muted); white-space: nowrap; font-variant-numeric: tabular-nums; }
.hm-br-muster { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px 24px; }
.hm-br-muster h4 { margin: 0 0 6px; font-size: 13px; font-weight: 400; color: var(--text-muted); }
.hm-br-muster div div { display: flex; justify-content: space-between; gap: 10px; font-size: 14px; padding: 4px 0; border-top: 1px solid var(--hairline-dark); color: var(--ink-2); }
.hm-br-muster b { font-weight: 400; color: var(--ink); font-variant-numeric: tabular-nums; }
.hm-br-leise { font-size: 13px; color: var(--text-muted); margin: 0; }
@media (max-width: 700px) { .hm-br-ref { grid-template-columns: minmax(0, 1fr); gap: 4px; } }`;
  document.head.appendChild(s);
}

function BrandLandkarte({ nische, spec, b }) {
  hmBrandStil();
  const { punkte, eigen } = hmBrandLandkarte(nische, spec);
  const W = 560, H = 340, R = 40;
  const X = (x) => R + x * (W - 2 * R), Y = (y) => H - R - y * (H - 2 * R);
  const akz = (b && b.akzent) || "#B17834";
  return <div className="hm-br-karte"><svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Landkarte der Nische: Schriftklasse waagrecht, Logoart senkrecht">
    <line x1={R} y1={Y(0)} x2={W - R} y2={Y(0)} stroke="var(--hairline-dark)" /><line x1={X(0)} y1={R} x2={X(0)} y2={H - R} stroke="var(--hairline-dark)" />
    <line x1={X(0.5)} y1={R} x2={X(0.5)} y2={H - R} stroke="var(--hairline-dark)" strokeDasharray="2 4" /><line x1={R} y1={Y(0.5)} x2={W - R} y2={Y(0.5)} stroke="var(--hairline-dark)" strokeDasharray="2 4" />
    <text x={R} y={H - 14} fontSize="12" fill="var(--text-muted)">Antiqua</text><text x={W - R} y={H - 14} fontSize="12" fill="var(--text-muted)" textAnchor="end">Grotesk</text>
    <text x={12} y={Y(0) - 4} fontSize="12" fill="var(--text-muted)">Wortmarke</text><text x={12} y={R + 12} fontSize="12" fill="var(--text-muted)">Zeichen</text>
    {punkte.map((p) => p.typ === "person"
      ? <g key={p.id}><circle cx={X(p.x)} cy={Y(p.y)} r="6" fill={p.dunkel ? "var(--ink)" : "none"} stroke="var(--ink)" strokeWidth="1.2"><title>{p.name}, Personenmarke</title></circle></g>
      : <g key={p.id}><rect x={X(p.x) - 5.5} y={Y(p.y) - 5.5} width="11" height="11" fill={p.dunkel ? "var(--ink)" : "none"} stroke="var(--ink)" strokeWidth="1.2"><title>{p.name}, Haus</title></rect></g>)}
    {eigen && <g><circle cx={X(eigen.x)} cy={Y(eigen.y)} r="11" fill={akz} /><text x={X(eigen.x) + 16} y={Y(eigen.y) + 4} fontSize="12" fill="var(--ink)">Ihr Entwurf</text></g>}
  </svg>
    <p className="hm-br-leise" style={{ marginTop: 8 }}>Kreis: Personenmarke. Quadrat: Haus. Gefüllt: dunkler Auftritt. Der farbige Punkt ist der aktuelle Entwurf.</p>
  </div>;
}

function BrandReferenzen({ mid, spec, b, teamSicht }) {
  hmBrandStil(); useHm("logos");
  const nische = hmBrandNische(mid); const nn = (HM_BRAND_NISCHEN.find((x) => x[0] === nische) || [])[1] || nische;
  const M = hmBrandMuster(nische);
  const { liste, attr } = hmBrandNaechste(spec, nische, 5);
  const K = hmBrandKlischees(nische).slice(0, 6);
  const setNische = (n) => hmStore.patch("logos", (a) => ({ ...(a || {}), [mid]: { ...((a || {})[mid] || {}), nische: n } }));
  const top = (l, name) => l.slice(0, 3).map(([k, n]) => `${n} ${name[k] || k}`).join(", ");
  return <div className="hm-br">
    <div className="hm-br-kopf"><h3>Der Markt in {nn}</h3>
      {teamSicht && <div className="hm-chips" role="group" aria-label="Nische">{HM_BRAND_NISCHEN.map(([id, n]) => <button key={id} type="button" className={"hm-chip" + (nische === id ? " on" : "")} aria-pressed={nische === id} onClick={() => setNische(id)}>{n}</button>)}</div>}
    </div>
    {!M.n ? <p className="hm-br-satz">Für diese Nische liegen noch keine Referenzen vor.</p> : <>
      <p className="hm-br-satz">{M.n} Referenzen, davon {M.personen} Personenmarken. Schrift: {top(M.klasse, HM_BRAND_NAME.klasse)}. Logoart: {top(M.art, HM_BRAND_NAME.art)}. Zeichen: {top(M.motiv, HM_BRAND_NAME.motiv)}. Grundton: {top(M.stimmung, HM_BRAND_NAME.stimmung)}. {M.versal} von {M.n} setzen in Versalien.</p>
      <BrandLandkarte nische={nische} spec={spec} b={b} />
      <div className="hm-br-muster">
        <div><h4>Schriftklasse</h4>{M.klasse.map(([k, n]) => <div key={k}><span>{HM_BRAND_NAME.klasse[k] || k}</span><b>{n}</b></div>)}</div>
        <div><h4>Logoart</h4>{M.art.map(([k, n]) => <div key={k}><span>{HM_BRAND_NAME.art[k] || k}</span><b>{n}</b></div>)}</div>
        <div><h4>Zeichenmotiv</h4>{M.motiv.map(([k, n]) => <div key={k}><span>{HM_BRAND_NAME.motiv[k] || k}</span><b>{n}</b></div>)}</div>
        <div><h4>Klischees der Nische</h4>{K.length ? K.map((k) => <div key={k.klischee}><span>{k.klischee}</span><b>{k.n}</b></div>) : <div><span>keine gezählt</span></div>}</div>
      </div>
      {spec && <>
        <p className="hm-br-satz">Ihr Entwurf: {HM_BRAND_NAME.art[attr.art]}, {HM_BRAND_NAME.klasse[attr.schriftklasse]}, {HM_BRAND_NAME.motiv[attr.zeichenMotiv]}. Die nächsten Referenzen:</p>
        <div className="hm-br-liste">{liste.map(({ r, score, gruende }) => <div key={r.id} className="hm-br-ref">
          <div className="n">{r.name}<span>{r.typ === "person" ? "Personenmarke" : "Haus"}, {r.land}{r.stadt ? ", " + r.stadt : ""}</span></div>
          <div className="b">{HM_BRAND_NAME.art[r.logo.art]}, {HM_BRAND_NAME.klasse[r.logo.schriftklasse]}{r.logo.versal ? ", Versalien" : ""}, {HM_BRAND_NAME.motiv[r.logo.zeichenMotiv]}, {HM_BRAND_NAME.stimmung[(r.farben || {}).stimmung] || ""}. {r.staerke}{gruende.length ? ` Gemeinsam: ${gruende.join(", ")}.` : ""}</div>
          <div className="s">{Math.round(score * 100)} Prozent</div>
        </div>)}</div>
      </>}
      <p className="hm-br-leise">Referenzen beschreiben, sie zeigen keine fremden Logos. Quelle: Recherche vom 01.10.2026, Katalog in docs/werkbank/branding-v2/research/MAKLER_BRANDS.md.</p>
    </>}
  </div>;
}

function hmSelbsttestBrands() {
  const out = []; const t = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: e.message }); } };
  t("Referenzen vollständig und in vier Nischen", () => { const n = new Set(HM_BRAND_REFERENZ.map((r) => r.nische)); const bad = HM_BRAND_REFERENZ.filter((r) => !r.id || !r.name || !r.logo || !r.logo.art || !r.logo.schriftklasse || !r.farben); return { ok: HM_BRAND_REFERENZ.length >= 40 && n.size === 4 && !bad.length, detail: `${HM_BRAND_REFERENZ.length} Referenzen, Nischen ${[...n].join(", ")}${bad.length ? ", unvollständig: " + bad.map((x) => x.id || "?").join(", ") : ""}` }; });
  t("Ids eindeutig", () => ({ ok: new Set(HM_BRAND_REFERENZ.map((r) => r.id)).size === HM_BRAND_REFERENZ.length }));
  t("Attribute nur aus dem Schema", () => { const bad = HM_BRAND_REFERENZ.filter((r) => !HM_BRAND_NAME.art[r.logo.art] || !HM_BRAND_NAME.klasse[r.logo.schriftklasse] || !HM_BRAND_NAME.motiv[r.logo.zeichenMotiv] || !HM_BRAND_NAME.stimmung[r.farben.stimmung]); return { ok: !bad.length, detail: bad.slice(0, 4).map((x) => x.id).join(", ") }; });
  t("Nische von Markus ist Wohnen, Team kann setzen", () => { const alt = hmStore.get("logos"); try { const n0 = hmBrandNische("markus"); hmStore.put("logos", { ...(alt || {}), markus: { ...((alt || {}).markus || {}), nische: "gewerbe" } }); const n1 = hmBrandNische("markus"); return { ok: n0 === "wohnen" && n1 === "gewerbe", detail: n0 + ", dann " + n1 }; } finally { hmStore.put("logos", alt); } });
  t("Entwurf wird in Attribute übersetzt", () => { const a = hmBrandSpecAttribute({ art: "zeichen", font: "Newsreader", zeichen: "ratstrich", versal: false, laufweite: 0.02, akzent: true }); return { ok: a.schriftklasse === "antiqua" && a.art === "zeichen_und_name" && a.zeichenMotiv === "linie", detail: JSON.stringify(a) }; });
  t("Ähnlichkeit zwischen 0 und 1 mit Gründen", () => { const r = HM_BRAND_REFERENZ[0]; if (!r) return { ok: true, detail: "ohne Daten" }; const s = hmBrandAehnlichkeit(hmBrandSpecAttribute(hmBrand("markus").logoKonzept || {}), r); return { ok: s.score >= 0 && s.score <= 1 && Array.isArray(s.gruende) }; });
  t("Landkarte: alle Punkte im Feld", () => { const L = hmBrandLandkarte(null, hmBrand("markus").logoKonzept); return { ok: L.punkte.every((p) => p.x > 0 && p.x < 1 && p.y > 0 && p.y < 1) && !!L.eigen, detail: `${L.punkte.length} Punkte` }; });
  t("Texte ohne Ausrufezeichen und Gedankenstriche", () => { const s = HM_BRAND_REFERENZ.map((r) => [r.name, r.claim, r.staerke, ...(r.klischees || [])].join(" ")).join(" ") + Object.values(HM_BRAND_NAME).map((o) => Object.values(o).join(" ")).join(" "); return { ok: !/[!\u2013\u2014]/.test(s) }; });
  return out;
}
/* Daten anhängen (aus wb-brands-daten.jsx), damit die Liste eine Quelle hat */
function hmBrandDatenLaden(liste) { HM_BRAND_REFERENZ = Array.isArray(liste) ? liste : []; window.HM_BRAND_REFERENZ = HM_BRAND_REFERENZ; }

Object.assign(window, { HM_BRAND_NISCHEN, HM_BRAND_NAME, hmBrandNische, hmBrandReferenzen, hmBrandMuster, hmBrandKlischees, hmBrandSpecAttribute, hmBrandAehnlichkeit, hmBrandNaechste, hmBrandAbstandSatz, hmBrandLandkarte, BrandLandkarte, BrandReferenzen, hmSelbsttestBrands, hmBrandDatenLaden, hmBrandStil });
window.HM_BRAND_REFERENZ = HM_BRAND_REFERENZ;
