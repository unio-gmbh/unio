/* Werkbank. Schriftpool der Logo-Werkstatt auf Grundlage aller Google Fonts.
   HM_GFONTS (wb-fonts-katalog.jsx) hält den Katalog: Familie, Kategorie, Gewichte, Strichstärke, Breite, Rang. Der kuratierte Pool
   HM_LK_SCHRIFTEN bleibt der Start; das Team erweitert ihn je Makler (logos[mid].schriften), eine Markenrichtung bringt ihre Schriften mit.
   Eignung für Logos wird gerechnet und begründet: Gewichte, Kategorie, Abstand zum Markt der Nische (wb-brands.jsx), Verbreitung.
   Geladen wird über die Google-Fonts-CSS (css2), gezeichnet über document.fonts; Pfade für den Export kommen weiter aus hmFontDatei. */

const HM_FONTS_KAT = { serif: "Serife", sans: "Grotesk", display: "Display", hand: "Schreibschrift", mono: "Festbreite" };
const HM_FONTS_ALLERWELT = ["Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Inter", "Arial", "Helvetica", "Raleway", "Nunito", "Oswald", "Playfair Display", "Merriweather", "PT Sans", "Source Sans 3", "Work Sans"];

function hmGfont(f) {
  const r = (window.HM_GFONTS || []).find((x) => x[0] === f);
  if (!r) return null;
  return { f: r[0], kat: r[1], k: r[1] === "serif" ? "serif" : r[1] === "sans" || r[1] === "mono" ? "sans" : r[1] === "display" ? "serif" : "serif", w: r[2], dicke: r[3], breite: r[4], rang: r[5], variabel: !!r[6] };
}
/* Schriftklasse für den Marktvergleich (wb-brands.jsx) */
function hmGfontKlasse(f) {
  const s = (window.HM_LK_SCHRIFTEN || []).find((x) => x.f === f);
  if (s) return s.k === "serif" ? (/Display|Playfair/.test(f) ? "serif_display" : "antiqua") : (/Space|Manrope/.test(f) ? "geometrisch" : "grotesk");
  const g = hmGfont(f); if (!g) return "grotesk";
  if (g.kat === "hand") return "script";
  if (g.kat === "display") return /Slab|Rockwell|Arvo|Zilla|Roboto Slab|Bitter/.test(f) ? "slab" : "serif_display";
  if (g.kat === "serif") return /Slab|Arvo|Zilla|Bitter|Rokkitt/.test(f) ? "slab" : "antiqua";
  return /Geometric|Futura|Jost|Poppins|Montserrat|Outfit|Urbanist|Lexend|Manrope|Space Grotesk|Sora|Figtree|Plus Jakarta|Josefin|Questrial|Nunito|Quicksand/.test(f) ? "geometrisch" : "grotesk";
}
/* Eintrag für den Pool aus dem Katalog: Gewichte auf 400 bis 700 begrenzt, höchstens drei */
function hmGfontPoolEintrag(f, herkunft) {
  const g = hmGfont(f); if (!g) return null;
  const w = g.w.filter((x) => x >= 300 && x <= 800); const pick = [400, 500, 600, 700].filter((x) => w.includes(x)); const gew = (pick.length ? pick : w.length ? [w[0]] : [400]).slice(0, 3);
  return { f, k: g.k, w: gew, kat: g.kat, herkunft: herkunft || "Katalog" };
}
/* Der Pool eines Maklers: kuratiert plus eigene Ergänzungen plus Schriften der Richtung */
function hmLkPool(mid, opt) {
  const o = opt || {}; const out = []; const add = (e) => { if (e && !out.some((x) => x.f === e.f)) out.push(e); };
  const eigen = ((hmStore.get("logos") || {})[mid] || {}).schriften || [];
  if (o.richtung && window.hmRichtungParameter) {
    try { const P = hmRichtungParameter(o.richtung, mid); (P.fonts || []).forEach((f) => add((window.HM_LK_SCHRIFTEN || []).find((x) => x.f === f) || hmGfontPoolEintrag(f, "Richtung"))); } catch (e) { /* ohne Richtung */ }
    const b = hmBrand(mid); if (b.schrift) { [b.schrift.d, b.schrift.t].forEach((f) => add((window.HM_LK_SCHRIFTEN || []).find((x) => x.f === f) || hmGfontPoolEintrag(f, "Marke"))); }
    eigen.forEach((e) => add(hmGfontPoolEintrag(e.f, "Team")));
    if (out.length) return out;
  }
  (window.HM_LK_SCHRIFTEN || []).forEach((s) => add({ ...s, herkunft: "kuratiert" }));
  eigen.forEach((e) => add(hmGfontPoolEintrag(e.f, "Team")));
  return out;
}
function hmFontsPoolSetzen(mid, f, an) {
  hmStore.patch("logos", (a) => { const x = { ...((a || {})[mid] || {}) }; const l = (x.schriften || []).filter((e) => e.f !== f); x.schriften = an ? [...l, { f, am: new Date().toISOString().slice(0, 10) }] : l; return { ...(a || {}), [mid]: x }; });
  hmEvent(mid, "branding", an ? `Schrift ${f} in den Pool genommen` : `Schrift ${f} aus dem Pool entfernt`, "Team");
}
/* Eignung für ein Logo, 0 bis 100, mit Sätzen. Kein Geschmack: Gewichte, Kategorie, Verbreitung, Abstand zum Markt */
function hmFontsEignung(g, nische) {
  let p = 50; const s = [];
  const nw = g.w.filter((x) => x >= 300 && x <= 800).length;
  if (g.variabel || nw >= 3) { p += 15; s.push(g.variabel ? "variable Schrift, jedes Gewicht möglich" : `${nw} Gewichte für Wortmarke und Text`); } else if (nw === 1) { p -= 10; s.push("nur ein Gewicht, kein Spiel zwischen Logo und Text"); }
  if (g.kat === "hand") { p -= 20; s.push("Schreibschrift, im Profilbild klein schwer lesbar"); }
  if (g.kat === "display") { p -= 5; s.push("Display-Schrift, nur für das Logo, nicht für Text"); }
  if (g.kat === "mono") { p -= 15; s.push("Festbreite, wirkt wie Code"); }
  if (HM_FONTS_ALLERWELT.includes(g.f) || (g.rang != null && g.rang <= 12)) { p -= 20; s.push("sehr verbreitet, sieht aus wie jede zweite Website"); }
  else if (g.rang != null && g.rang <= 60) { p -= 6; s.push("verbreitet"); }
  else if (g.rang != null && g.rang <= 400) { p += 4; s.push("bewährt, aber nicht überall"); }
  else if (g.rang != null && g.rang > 900) { p -= 4; s.push("kaum erprobt, Lizenz und Zeichensatz vor dem Einsatz prüfen"); }
  if (/ SC$/.test(g.f)) { p -= 8; s.push("Kapitälchen-Schnitt, nur für Versalien"); }
  if (g.w.length >= 5 && !g.variabel) { p += 4; }
  if (g.dicke != null && (g.dicke <= 2 || g.dicke >= 9)) { p -= 8; s.push(g.dicke <= 2 ? "sehr dünne Striche, bricht im Favicon" : "sehr fette Striche, erdrückt den Namen"); }
  if (nische && window.hmBrandMuster) {
    try {
      /* Grob vergleichen: Grotesk mit geometrischer Grotesk, Antiqua mit Display-Serife */
      const M = hmBrandMuster(nische); const kl = hmGfontKlasse(g.f); const n = M.n || 0;
      const gruppe = (k) => (k === "geometrisch" ? "grotesk" : k === "serif_display" ? "antiqua" : k);
      const zahl = M.klasse.filter((x) => gruppe(x[0]) === gruppe(kl)).reduce((a, x) => a + x[1], 0); const anteil = n ? zahl / n : 0;
      const name = { grotesk: "Grotesk", antiqua: "Antiqua", script: "Schreibschrift", slab: "Egyptienne" }[gruppe(kl)] || gruppe(kl);
      if (n >= 6) { if (anteil >= 0.5) { p -= 12; s.push(`${zahl} von ${n} Referenzen in dieser Nische setzen auf ${name}, damit geht die Schrift im Markt unter`); } else if (anteil <= 0.2) { p += 10; s.push(zahl ? `nur ${zahl} von ${n} Referenzen in dieser Nische setzen auf ${name}, das hebt ab` : `keine der ${n} Referenzen in dieser Nische setzt auf ${name}, das hebt ab`); } }
    } catch (e) { /* ohne Markt */ }
  }
  return { punkte: Math.max(0, Math.min(100, p)), saetze: s };
}
function hmFontsSuche(q, kat, nische, n) {
  const s = String(q || "").trim().toLowerCase();
  const l = (window.HM_GFONTS || []).filter((r) => (!kat || r[1] === kat) && (!s || r[0].toLowerCase().includes(s))).map((r) => hmGfont(r[0]));
  return l.map((g) => ({ g, ...hmFontsEignung(g, nische) })).sort((a, b) => b.punkte - a.punkte || (a.g.rang || 9999) - (b.g.rang || 9999)).slice(0, n || 24);
}
/* Laden über die Google-Fonts-CSS, einmal je Familie */
const hmFontsGeladen = {};
function hmFontsLaden(familien) {
  const l = [].concat(familien || []).filter(Boolean);
  return Promise.all(l.map((f) => {
    const g = hmGfont(f); if (!g || (window.HM_LK_SCHRIFTEN || []).some((x) => x.f === f)) return Promise.resolve(true);
    if (!hmFontsGeladen[f]) {
      const w = (hmGfontPoolEintrag(f) || { w: [400] }).w;
      const link = document.createElement("link"); link.rel = "stylesheet"; link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(f).replace(/%20/g, "+")}:wght@${w.join(";")}&display=swap`;
      document.head.appendChild(link);
      hmFontsGeladen[f] = new Promise((ok) => { link.onload = ok; link.onerror = ok; setTimeout(ok, 4000); }).then(() => Promise.all(w.map((x) => document.fonts.load(`${x} 40px "${f}"`).catch(() => null)))).then(() => true);
    }
    return hmFontsGeladen[f];
  }));
}
function useFontsPool(mid, opt) {
  const [v, setV] = React.useState(0);
  useHm("logos");
  const pool = hmLkPool(mid, opt); const key = pool.map((x) => x.f).join("|");
  React.useEffect(() => { let weg = false; hmFontsLaden(pool.map((x) => x.f)).then(() => { if (!weg) { setV((x) => x + 1); try { window.dispatchEvent(new Event("hm-schrift-geladen")); } catch (e) { /* kein Fenster */ } } }); return () => { weg = true; }; }, [key]);
  return { pool, version: v };
}

function hmFontsStil() {
  if (typeof document === "undefined" || document.getElementById("stil-fonts")) return;
  const s = document.createElement("style"); s.id = "stil-fonts";
  s.textContent = `
.hm-fp { display: grid; gap: 18px; }
.hm-fp-kopf { display: flex; flex-wrap: wrap; gap: 10px 18px; align-items: baseline; }
.hm-fp-kopf h3 { margin: 0; font-size: 20px; font-weight: 400; letter-spacing: -.01em; }
.hm-fp-satz { margin: 0; font-size: 14px; line-height: 1.5; color: var(--ink-2); max-width: 70ch; }
.hm-fp-pool { display: flex; flex-wrap: wrap; gap: 8px; }
.hm-fp-chip { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--hairline-dark); font-size: 15px; color: var(--ink); }
.hm-fp-chip small { font-size: 12px; color: var(--text-muted); font-family: var(--font-body, inherit); }
.hm-fp-chip button { border: 0; background: none; padding: 0; font: inherit; font-size: 12px; color: var(--text-muted); cursor: pointer; font-family: var(--font-body, inherit); }
.hm-fp-chip button:hover { color: var(--ink); }
.hm-fp-suche { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.hm-fp-suche input { flex: 1 1 220px; border: 0; background: var(--surface-raised); box-shadow: inset 0 0 0 1px var(--hairline-dark); border-radius: 12px; padding: 11px 14px; font: inherit; font-size: 15px; color: var(--ink); }
.hm-fp-suche input:focus { outline: none; box-shadow: inset 0 0 0 2px var(--ink); }
.hm-fp-liste { display: grid; }
.hm-fp-zeile { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1.6fr) auto auto; gap: 16px; align-items: center; padding: 12px 0; border-top: 1px solid var(--hairline-dark); }
.hm-fp-zeile:last-child { border-bottom: 1px solid var(--hairline-dark); }
.hm-fp-probe { font-size: 26px; line-height: 1.1; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hm-fp-probe small { display: block; font-size: 12px; color: var(--text-muted); font-family: var(--font-body, inherit); margin-top: 4px; letter-spacing: 0; }
.hm-fp-grund { font-size: 13px; line-height: 1.45; color: var(--ink-2); }
.hm-fp-punkte { font-size: 14px; color: var(--ink); font-variant-numeric: tabular-nums; white-space: nowrap; }
.hm-fp-leise { font-size: 13px; color: var(--text-muted); margin: 0; }
@media (max-width: 760px) { .hm-fp-zeile { grid-template-columns: minmax(0, 1fr) auto; } .hm-fp-grund { grid-column: 1 / -1; } }`;
  document.head.appendChild(s);
}

/* Team: Pool sehen und aus dem Katalog erweitern. Schriften im Suchergebnis laden beim Anzeigen */
function SchriftPool({ mid, teamSicht, richtung }) {
  hmFontsStil(); useHm("logos");
  const nische = window.hmBrandNische ? hmBrandNische(mid) : null;
  const nn = nische && window.HM_BRAND_NISCHEN ? (HM_BRAND_NISCHEN.find((x) => x[0] === nische) || [])[1] : null;
  const [q, setQ] = React.useState("");
  const [kat, setKat] = React.useState("");
  const [n, setN] = React.useState(12);
  const pool = hmLkPool(mid, { richtung });
  const treffer = React.useMemo(() => hmFontsSuche(q, kat, nische, n), [q, kat, nische, n]);
  const [geladen, setGeladen] = React.useState(0);
  React.useEffect(() => { let weg = false; hmFontsLaden(treffer.map((t) => t.g.f)).then(() => !weg && setGeladen((x) => x + 1)); return () => { weg = true; }; }, [treffer.map((t) => t.g.f).join("|")]);
  const imPool = (f) => pool.some((x) => x.f === f);
  const b = hmBrand(mid); const probe = b.makler && b.makler.name ? b.makler.name : "Markus Leitner";
  const gesamt = (window.HM_GFONTS || []).length;
  return <div className="hm-fp">
    <div className="hm-fp-kopf"><h3>Schriftpool</h3><span className="hm-fp-leise">{pool.length} im Pool, {gesamt} Google Fonts im Katalog</span></div>
    <p className="hm-fp-satz">Der kuratierte Pool bleibt der Start. {richtung ? "Die gewählte Richtung bringt ihre Schriften mit." : "Das Team erweitert ihn je Makler."} Die Eignung ist gerechnet: Gewichte, Lesbarkeit klein, Verbreitung{nn ? ` und Abstand zum Markt in ${nn}` : ""}. Kein Geschmack.</p>
    <div className="hm-fp-pool">{pool.map((s) => <span key={s.f} className="hm-fp-chip" style={{ fontFamily: `"${s.f}", ${s.k === "serif" ? "Georgia, serif" : "system-ui, sans-serif"}` }}>{s.f}<small>{s.herkunft}</small>{teamSicht && s.herkunft === "Team" && <button type="button" onClick={() => hmFontsPoolSetzen(mid, s.f, false)} aria-label={`${s.f} entfernen`}>entfernen</button>}</span>)}</div>
    {teamSicht && <>
      <div className="hm-fp-suche">
        <input value={q} onChange={(e) => { setQ(e.target.value); setN(12); }} placeholder="Schrift suchen, zum Beispiel Cormorant, Archivo, Libre" aria-label="Schrift suchen" />
        <div className="hm-chips" role="group" aria-label="Kategorie">{[["", "Alle"], ...Object.entries(HM_FONTS_KAT)].map(([id, t]) => <button key={id} type="button" className={"hm-chip" + (kat === id ? " on" : "")} aria-pressed={kat === id} onClick={() => { setKat(id); setN(12); }}>{t}</button>)}</div>
      </div>
      <div className="hm-fp-liste">{treffer.map(({ g, punkte, saetze }) => <div key={g.f} className="hm-fp-zeile">
        <div className="hm-fp-probe" style={{ fontFamily: `"${g.f}", ${g.k === "serif" ? "Georgia, serif" : "system-ui, sans-serif"}` }}>{probe}<small>{g.f}, {HM_FONTS_KAT[g.kat]}, {g.variabel ? "variabel" : g.w.join(", ")}</small></div>
        <div className="hm-fp-grund">{saetze.length ? saetze.join(". ") + "." : "Ohne Auffälligkeit."}</div>
        <div className="hm-fp-punkte">{punkte} von 100</div>
        {imPool(g.f) ? <span className="hm-fp-leise">im Pool</span> : <button type="button" className="hm-link" onClick={() => hmFontsPoolSetzen(mid, g.f, true)}>In den Pool</button>}
      </div>)}</div>
      {treffer.length >= n && <button type="button" className="hm-link" onClick={() => setN(n + 12)}>Mehr zeigen</button>}
    </>}
  </div>;
}

function hmSelbsttestFonts() {
  const out = []; const t = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: e.message }); } };
  const G = window.HM_GFONTS || [];
  t("Katalog mit über 1200 Familien in fünf Kategorien", () => ({ ok: G.length >= 1200 && new Set(G.map((r) => r[1])).size === 5, detail: `${G.length} Familien` }));
  t("Kuratierter Pool im Katalog enthalten", () => { const fehlt = (window.HM_LK_SCHRIFTEN || []).filter((s) => s.f !== "Power Grotesk" && !hmGfont(s.f)); return { ok: !fehlt.length, detail: fehlt.map((x) => x.f).join(", ") }; });
  t("Pool ohne Ergänzung gleich kuratiert", () => { const alt = hmStore.get("logos"); try { hmStore.put("logos", { ...(alt || {}), __t: {} }); const p = hmLkPool("__t"); return { ok: p.length === (window.HM_LK_SCHRIFTEN || []).length, detail: `${p.length}` }; } finally { hmStore.put("logos", alt); } });
  t("Ergänzung landet im Pool und lässt sich entfernen", () => { const alt = hmStore.get("logos"); try { hmStore.put("logos", { ...(alt || {}), __t: {} }); hmFontsPoolSetzen("__t", "Cormorant Garamond", true); const a = hmLkPool("__t").some((x) => x.f === "Cormorant Garamond"); hmFontsPoolSetzen("__t", "Cormorant Garamond", false); const b = hmLkPool("__t").some((x) => x.f === "Cormorant Garamond"); return { ok: a && !b }; } finally { hmStore.put("logos", alt); } });
  t("Allerweltsschriften werden abgewertet", () => { const r = hmFontsEignung(hmGfont("Roboto") || { f: "Roboto", kat: "sans", w: [400, 700], rang: 1 }, null); const c = hmFontsEignung(hmGfont("Cormorant Garamond") || { f: "Cormorant Garamond", kat: "serif", w: [400, 500, 600, 700], rang: 200 }, null); return { ok: r.punkte < c.punkte && r.saetze.some((s) => /verbreitet/.test(s)), detail: `Roboto ${r.punkte}, Cormorant ${c.punkte}` }; });
  t("Schreibschrift verliert Punkte, Begründung als Satz", () => { const g = G.find((r) => r[1] === "hand"); if (!g) return { ok: true, detail: "keine Schreibschrift" }; const e = hmFontsEignung(hmGfont(g[0]), null); return { ok: e.punkte < 50 && e.saetze.some((s) => /Schreibschrift/.test(s)) }; });
  t("Schriftklasse für den Markt aus dem Katalog", () => ({ ok: hmGfontKlasse("Newsreader") === "antiqua" && hmGfontKlasse("Instrument Sans") === "grotesk" && ["antiqua", "serif_display", "grotesk", "geometrisch", "script", "slab"].includes(hmGfontKlasse("Cormorant Garamond")) }));
  t("Suche findet nach Namen und Kategorie", () => { const l = hmFontsSuche("corm", "", null, 10); return { ok: l.length >= 1 && l.every((x) => /corm/i.test(x.g.f)), detail: l.map((x) => x.g.f).join(", ") }; });
  t("Texte ohne Ausrufezeichen und Gedankenstriche", () => { const s = Object.values(HM_FONTS_KAT).join(" ") + String(SchriftPool); return { ok: !/[\u2013\u2014]/.test(s) && !/[^!]![^=]/.test(s.replace(/!\w|!\(|!\[|!\./g, "")) }; });
  return out;
}

Object.assign(window, { HM_FONTS_KAT, hmGfont, hmGfontKlasse, hmGfontPoolEintrag, hmLkPool, hmFontsPoolSetzen, hmFontsEignung, hmFontsSuche, hmFontsLaden, useFontsPool, SchriftPool, hmFontsStil, hmSelbsttestFonts });
