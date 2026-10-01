/* Werkbank. Logo-Erlebnis für den Makler (Prozess v2, C5): das Logo als Ergebnis, nicht als Konfigurator.
   Der Makler wählt weder Schrift, Farbe noch Logo. Er sieht, woraus sein Logo entsteht, wo es arbeitet, wie es hell und
   dunkel aussieht, und urteilt an drei Fragen aus dem Markenvertrag über die Entwürfe, die das Team gemerkt hat.
   Baut auf wb-logo.jsx auf (LogoKonzept, hmLkFormen, hmLkFassung, hmLkStichworte, HM_LK_KRITERIEN) und auf BrandLogo,
   falls noch kein Entwurf aus der Werkstatt übernommen ist. Ablage der Antworten wie in der Werkstatt:
   hmStore "logos"[mid].bewertung[spec.id][kriterium] = true oder false, dazu .notiz als Text.
   Der Makler wird immer gesiezt, Herr oder Frau wird nie geraten. Keine Eyebrows, keine Textzeichen als Icons. */

/* ---------- Stil: einmalig <style id="stil-logo-erlebnis">, Klassen hm-le-* ---------- */
const HM_LE_CSS = `
.hm-le { display: grid; gap: 64px; min-width: 0; container-type: inline-size; color: var(--ink); }
.hm-le.allein { max-width: 980px; margin: 0 auto; padding: 40px 24px 96px; box-sizing: border-box; }
.hm-le :focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
.hm-le-h { font-size: 24px; font-weight: 400; letter-spacing: -.015em; line-height: 1.15; margin: 0 0 20px; color: var(--ink); }
.hm-le-leise { font-size: 15px; line-height: 1.5; color: var(--text-muted); margin: 0; max-width: 60ch; }
.hm-le-logo { display: block; max-width: 100%; }
.hm-le-logo svg { display: block; width: 100%; height: auto; }
.hm-le-logo-b { display: block; max-width: 100%; overflow: hidden; }
.hm-le-logo-b svg { display: block; max-width: 100%; }
.hm-le-buehne { display: grid; gap: 22px; }
.hm-le-papier { background: #F5F1EA; color: #0B0A09; border-radius: 20px; box-shadow: inset 0 0 0 1px var(--hairline-dark); display: grid; place-items: center; padding: 80px 48px; min-height: 300px; overflow: hidden; box-sizing: border-box; }
.hm-le-herkunft { font-size: 15px; line-height: 1.5; color: var(--text-muted); margin: 0; max-width: 60ch; }
.hm-le-claim { font-size: clamp(28px, 3.6vw, 44px); line-height: 1.06; letter-spacing: -.02em; margin: 0; color: var(--ink); max-width: 20ch; text-wrap: balance; overflow-wrap: anywhere; }
.hm-le-zutaten { display: grid; }
.hm-le-zutat { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 8px 28px; padding: 24px 0; border-top: 1px solid var(--hairline-dark); align-items: start; }
.hm-le-zutat:last-child { border-bottom: 1px solid var(--hairline-dark); }
.hm-le-zutat .l { font-size: 15px; color: var(--text-muted); padding-top: 5px; }
.hm-le-zutat .w { font-size: 26px; line-height: 1.2; letter-spacing: -.01em; color: var(--ink); min-width: 0; overflow-wrap: anywhere; }
.hm-le-zutat .w.z { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.hm-le-zutat .s { font-size: 15px; line-height: 1.5; color: var(--text-muted); margin: 8px 0 0; max-width: 56ch; }
.hm-le-zeichen { width: 56px; height: 56px; border-radius: 12px; background: #F5F1EA; color: #0B0A09; box-shadow: inset 0 0 0 1px var(--hairline-dark); display: grid; place-items: center; padding: 10px; box-sizing: border-box; flex: none; overflow: hidden; }
.hm-le-einsatz { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 28px; }
.hm-le-einsatz figure { margin: 0; display: grid; gap: 12px; align-content: start; min-width: 0; }
.hm-le-einsatz figcaption { font-size: 14px; line-height: 1.45; color: var(--text-muted); }
.hm-le-einsatz .breit { grid-column: 1 / -1; }
.hm-le-vk-paar { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.hm-le-vk { aspect-ratio: 85 / 55; background: #F5F1EA; color: #0B0A09; box-shadow: inset 0 0 0 1px var(--hairline-dark), 0 22px 40px -28px rgba(12,11,9,.5); border-radius: 6px; padding: 8% 9%; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; min-width: 0; box-sizing: border-box; }
.hm-le-vk .c { font-size: 12px; line-height: 1.35; color: #3B3833; }
.hm-le-vk .n { font-size: 12px; line-height: 1.4; color: #0B0A09; font-weight: 500; }
.hm-le-vk .k { font-size: 10.5px; line-height: 1.5; color: #3B3833; }
.hm-le-profile { display: flex; gap: 28px; flex-wrap: wrap; }
.hm-le-profil { display: grid; gap: 8px; justify-items: center; font-size: 13px; color: var(--text-muted); }
.hm-le-rund { width: 96px; height: 96px; border-radius: 50%; overflow: hidden; background: #F5F1EA; color: #0B0A09; display: grid; place-items: center; box-shadow: inset 0 0 0 1px var(--hairline-dark); padding: 22px; box-sizing: border-box; }
.hm-le-rund.foto { padding: 0; }
.hm-le-rund img { width: 100%; height: 100%; object-fit: cover; display: block; }
.hm-le-rund .leer { font-size: 11px; line-height: 1.3; text-align: center; color: #4A4640; }
.hm-le-web { min-height: 68px; background: #FFFFFF; box-shadow: inset 0 0 0 1px var(--hairline-dark); border-radius: 14px; display: flex; align-items: center; gap: 10px 24px; padding: 16px 24px; font-size: 13px; color: #3B3833; overflow: hidden; box-sizing: border-box; }
.hm-le-web .l { margin-right: auto; color: #0B0A09; display: flex; flex: none; min-width: 0; max-width: 55%; }
.hm-le-web .cta { padding: 8px 14px; border-radius: 999px; font-size: 13px; white-space: nowrap; }
.hm-le-web { overflow: hidden; }
@container (max-width: 640px) { .hm-le-web .nav { display: none; } }
.hm-le-tab { display: flex; align-items: center; gap: 10px; background: #FFFFFF; box-shadow: inset 0 0 0 1px var(--hairline-dark); border-radius: 12px 12px 0 0; padding: 10px 16px; width: max-content; max-width: 100%; font-size: 12.5px; color: #3B3833; box-sizing: border-box; }
.hm-le-tab .titel { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hm-le-tab-leiste { background: var(--paper-2); border-radius: 12px 12px 0 0; padding: 8px 8px 0; box-shadow: inset 0 0 0 1px var(--hairline-dark); overflow: hidden; }
.hm-le-fav { width: 16px; height: 16px; display: grid; place-items: center; flex: none; overflow: hidden; }
.hm-le-sig { background: #FFFFFF; box-shadow: inset 0 0 0 1px var(--hairline-dark); border-radius: 14px; padding: 22px 24px; display: grid; gap: 12px; color: #0B0A09; font-size: 13px; line-height: 1.5; justify-items: start; }
.hm-le-sig .c { color: #3B3833; }
.hm-le-fassungen { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.hm-le-fassung { margin: 0; display: grid; gap: 10px; min-width: 0; }
.hm-le-fassung .f { aspect-ratio: 4 / 3; display: grid; place-items: center; border-radius: 16px; padding: 14%; overflow: hidden; box-shadow: inset 0 0 0 1px var(--hairline-dark); box-sizing: border-box; }
.hm-le-fassung figcaption { font-size: 14px; color: var(--text-muted); }
.hm-le-urteil { display: grid; gap: 48px; }
.hm-le-entwurf { display: grid; gap: 24px; padding-top: 36px; border-top: 1px solid var(--hairline-dark); }
.hm-le-entwurf-bild { display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr); gap: 16px; align-items: stretch; }
.hm-le-entwurf-bild .hm-le-papier { padding: 48px 36px; min-height: 0; }
.hm-le-entwurf-bild .hm-le-vk { aspect-ratio: auto; height: 100%; }
.hm-le-entwurf-nr { font-size: 14px; color: var(--text-muted); }
.hm-le-fragen { display: grid; }
.hm-le-frage { display: grid; grid-template-columns: minmax(0, 1fr) 240px; gap: 12px 28px; align-items: center; padding: 14px 0; border-top: 1px solid var(--hairline-dark); }
.hm-le-frage:last-child { border-bottom: 1px solid var(--hairline-dark); }
.hm-le-frage .t { font-size: 16px; line-height: 1.4; color: var(--ink); }
.hm-le-janein { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.hm-le-janein button { height: 48px; border: 0; border-radius: 12px; background: transparent; box-shadow: inset 0 0 0 1px var(--hairline-dark); font: inherit; font-size: 15px; color: var(--ink); cursor: pointer; }
.hm-le-janein button:hover { box-shadow: inset 0 0 0 1px var(--ink); }
.hm-le-janein button[aria-pressed="true"] { box-shadow: inset 0 0 0 2px var(--ink); }
.hm-le-janein button:disabled { cursor: default; opacity: .55; }
.hm-le-notiz { display: grid; gap: 8px; }
.hm-le-notiz label { font-size: 15px; color: var(--ink); }
.hm-le-notiz textarea { border: 0; background: var(--paper-2); border-radius: 12px; padding: 12px 14px; font: inherit; font-size: 15px; line-height: 1.5; color: var(--ink); min-height: 76px; resize: vertical; width: 100%; box-sizing: border-box; }
.hm-le-notiz textarea:read-only { color: var(--text-muted); }
.hm-le-status { font-size: 14px; color: var(--text-muted); min-height: 20px; }
.hm-le-freigabe { font-size: 15px; color: var(--text-muted); margin: 0; padding-top: 20px; border-top: 1px solid var(--hairline-dark); }
@media (max-width: 860px) {
  .hm-le-fassungen { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 720px) {
  .hm-le { gap: 48px; }
  .hm-le.allein { padding: 24px 16px 72px; }
  .hm-le-h { font-size: 22px; }
  .hm-le-papier { padding: 44px 20px; min-height: 200px; border-radius: 16px; }
  .hm-le-zutat { grid-template-columns: minmax(0, 1fr); gap: 4px; padding: 18px 0; }
  .hm-le-zutat .w { font-size: 22px; }
  .hm-le-einsatz, .hm-le-fassungen, .hm-le-entwurf-bild { grid-template-columns: minmax(0, 1fr); }
  .hm-le-entwurf-bild .hm-le-vk { aspect-ratio: 85 / 55; height: auto; }
  .hm-le-frage { grid-template-columns: minmax(0, 1fr); gap: 10px; }
  .hm-le-web { padding: 14px 16px; gap: 14px; }
  .hm-le-web .nav { display: none; }
}
`;
function hmLogoErlebnisStil() {
  if (typeof document === "undefined" || document.getElementById("stil-logo-erlebnis")) return;
  const s = document.createElement("style"); s.id = "stil-logo-erlebnis"; s.textContent = HM_LE_CSS; document.head.appendChild(s);
}

/* ---------- Sichtbare Sätze an einer Stelle, damit der Selbsttest sie prüfen kann ---------- */
const HM_LE_SAETZE = {
  gestaltet: "Das Team gestaltet gerade. Sobald es Entwürfe gibt, sehen Sie sie hier zuerst.",
  urteil: "Das Team entscheidet mit Ihrem Urteil.",
  urteilIntro: "Drei Fragen aus Ihrem Markenvertrag. Bitte urteilen Sie an den Fragen, nicht nach Geschmack.",
  keinZeichen: "Ihr Name steht allein. Die Erkennung liegt in der Anordnung, nicht in einem Zeichen daneben.",
  punktZeichen: "Ein Punkt in Ihrer Farbe schließt den Namen ab.",
  nameSo: "So, wie Sie ihn schreiben.",
  fassungen: "Auf hellem Grund dunkel, auf dunklem Grund hell. Ihre Farbe bleibt auf beiden lesbar. Für Stempel und einfarbigen Druck gibt es Ihr Logo auch ganz in Schwarz.",
  einsatz: "Fünf Stellen, an denen Ihr Logo täglich arbeitet. Alles mit Ihren echten Angaben, nichts ist Dekoration.",
  zutaten: "Drei Zutaten, alle aus Ihrer Marke. Nichts davon kommt aus einem Katalog.",
  kontaktFolgt: "Telefon und E-Mail folgen aus Ihrer Einrichtung.",
  portraitFolgt: "Porträt folgt",
  profilRegel: "Auf Instagram und LinkedIn ist Ihr Profilbild Ihr Porträt. Ohne Gesicht, etwa im Google-Profil, steht Ihr Zeichen.",
  gespeichert: "Gespeichert",
  hell: "Auf hellem Grund",
  dunkel: "Auf dunklem Grund",
  einfarbig: "Einfarbig, für Stempel und Druck",
  visitenkarte: "Visitenkarte, 85 mal 55 Millimeter, Vorder- und Rückseite",
  profil: "Profilbild",
  websiteKopf: "Kopf Ihrer Website",
  favicon: "Reiter im Browser, das kleine Zeichen in echter Größe",
  signatur: "Signatur unter Ihren E-Mails",
  auffaellt: "Was Ihnen auffällt",
  schriftStimme: (worte) => worte ? `Gewählt für eine Stimme, die ${worte} klingt.` : "Gewählt für die Stimme Ihrer Marke.",
  schriftWelt: (welt) => `Die Schrift Ihrer Markenwelt ${welt}.`,
  ausWort: (wort, quelle) => `Aus Ihrem Wort ${wort}${quelle ? ", " + quelle : ""}.`,
  herkunftSpec: (text, font) => `Ihr Logo kommt ${text}, gesetzt in ${font}.`,
  herkunftOhne: (font) => `Ihr Name, gesetzt in ${font}, der Schrift Ihrer Marke.`,
  freigegeben: (version, datum) => `Freigegeben als Version ${version} am ${datum}.`,
  entwurfNr: (i, n) => `Entwurf ${i} von ${n}`,
};
/* Anordnungen ohne Fachbegriffe */
const HM_LE_ART_SATZ = {
  satz: "Ihr Name in einer Zeile.",
  gesperrt: "Ihr Name in Großbuchstaben, mit Luft zwischen den Buchstaben.",
  gestapelt: "Vorname klein darüber, Nachname groß darunter.",
  monogramm: "Ihre Initialen.",
  zeichen: "Ein Zeichen neben Ihrem Namen.",
  teilung: "Jeder Buchstabe bekommt gleich viel Raum, darunter eine Maßlinie.",
  dickte: "Jeder Buchstabe bekommt gleich viel Raum.",
  punkt: "Ihr Name mit einem Punkt in Ihrer Farbe.",
  wort: "Ihr Name in einer Zeile, der Nachname betont.",
};

/* ---------- Kleine Helfer ---------- */
function hmLeLum(hex) { let x = String(hex || "#000").replace("#", ""); if (x.length === 3) x = x.split("").map((z) => z + z).join(""); const k = [0.2126, 0.7152, 0.0722]; return [0, 2, 4].reduce((s, i, j) => { const c = (parseInt(x.substr(i, 2), 16) || 0) / 255; return s + k[j] * (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)); }, 0); }
function hmLeKontrast(a, b) { const x = hmLeLum(a), y = hmLeLum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
function hmLeKontakt(mid) {
  const kd = ((((hmStore.get("einrichtung_daten") || {})[mid]) || {}).visitenkarten) || {};
  const web = ((((hmStore.get("website") || {})[mid]) || {}).felder) || {};
  const k0 = ((hmStore.get("kontakte") || {})[mid] || [])[0] || {};
  return { tel: kd.tel || web.tel || "", mail: kd.mail || web.mail || k0.mail || "" };
}
function hmLeDatum(iso) { try { return new Date(iso).toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit", year: "numeric" }); } catch (e) { return String(iso || "").slice(0, 10); } }
/* Antworten des Maklers, gleiches Schema wie LogoBewertung in der Werkstatt */
function hmLeBewerten(mid, specId, kriterium, wert) {
  hmStore.patch("logos", (a) => { const x = { ...((a || {})[mid] || {}) }; const bw = { ...(x.bewertung || {}) }; bw[specId] = { ...(bw[specId] || {}), [kriterium]: wert }; return { ...(a || {}), [mid]: { ...x, bewertung: bw } }; });
}
function hmLeNotiz(mid, specId, text) { hmLeBewerten(mid, specId, "notiz", text); }

/* Logo in einer Form (haupt, gestapelt, profil, zeichen, favicon), begrenzt in Breite und Höhe, ohne Überlauf auf kleinen Schirmen.
   Mit spec aus der Werkstatt, sonst BrandLogo aus dem Branding. */
function LeLogo({ spec, b, form = "haupt", maxW = 400, maxH = 80, fassung, invert, farbe }) {
  if (spec) {
    /* zeichenRoh: das Zeichen des Entwurfs allein, auch der Ratstrich, der sonst keine Fläche trägt */
    const formen = hmLkFormen(spec); const s = form === "zeichenRoh" ? hmLkKlemmen({ ...spec, art: "zeichen-nur" }) : (formen[form] || formen.haupt);
    const L = hmLkLayout(s, b); const ratio = Math.max(0.2, L.W / Math.max(1, L.H));
    const w = Math.max(8, Math.min(maxW, maxH * ratio));
    const svg = hmLkSvgText(s, b, { fassung, invert, farbe });
    return <span className="hm-le-logo" style={{ width: `min(100%, ${Math.round(w)}px)` }} dangerouslySetInnerHTML={{ __html: svg }} />;
  }
  const typ = form === "profil" || form === "favicon" || form === "zeichen" ? "monogramm" : b.logo;
  const n = `${b.vor} ${b.nach}`.length;
  const ratio = typ === "monogramm" ? 1 : (n * 0.52 * 42 + 30) / 60;
  const h = Math.max(8, Math.round(Math.min(maxH, maxW / ratio)));
  return <span className="hm-le-logo-b"><BrandLogo b={b} typ={typ} h={h} invert={invert} farbe={farbe} /></span>;
}

/* Ja und Nein als zwei gleich breite Konturknöpfe, der gewählte mit 2 px Kontur */
function LeJaNein({ wert, set, gesperrt, name }) {
  return <div className="hm-le-janein" role="group" aria-label={name}>
    <button type="button" aria-pressed={wert === true} disabled={gesperrt} onClick={() => set(true)}>Ja</button>
    <button type="button" aria-pressed={wert === false} disabled={gesperrt} onClick={() => set(false)}>Nein</button>
  </div>;
}

/* Ein gemerkter Entwurf: groß auf Papier und in der Karte, darunter die drei Fragen und die freie Zeile */
function LeEntwurf({ spec, b, mid, i, n, bw, teamSicht, claim }) {
  const [status, setStatus] = React.useState("");
  const [notiz, setNotiz] = React.useState(bw.notiz || "");
  React.useEffect(() => { setNotiz(bw.notiz || ""); }, [spec.id]);
  const merke = () => { setStatus(HM_LE_SAETZE.gespeichert); clearTimeout(merke.t); merke.t = setTimeout(() => setStatus(""), 1800); };
  const antwort = (k, v) => { hmLeBewerten(mid, spec.id, k, v); merke(); };
  const notizSpeichern = () => { if ((bw.notiz || "") !== notiz) { hmLeNotiz(mid, spec.id, notiz); merke(); } };
  const notizId = `hm-le-notiz-${mid}-${spec.id}`;
  return <article className="hm-le-entwurf" aria-label={HM_LE_SAETZE.entwurfNr(i, n)}>
    <div className="hm-le-entwurf-bild">
      <div className="hm-le-papier"><LeLogo spec={spec} b={b} maxW={460} maxH={spec.art === "monogramm" ? 120 : 84} /></div>
      <div className="hm-le-vk"><LeLogo spec={spec} b={b} maxW={190} maxH={spec.art === "monogramm" ? 46 : 28} />{claim && <div className="c">{claim}</div>}</div>
    </div>
    <div className="hm-le-entwurf-nr">{HM_LE_SAETZE.entwurfNr(i, n)}</div>
    <div className="hm-le-fragen">{HM_LK_KRITERIEN.map((k) => <div key={k} className="hm-le-frage"><div className="t">{k}</div><LeJaNein name={k} wert={bw[k]} gesperrt={teamSicht} set={(v) => antwort(k, v)} /></div>)}</div>
    <div className="hm-le-notiz">
      <label htmlFor={notizId}>{HM_LE_SAETZE.auffaellt}</label>
      <textarea id={notizId} value={notiz} readOnly={teamSicht} onChange={(e) => setNotiz(e.target.value)} onBlur={notizSpeichern} />
    </div>
    <div className="hm-le-status" role="status" aria-live="polite">{status}</div>
  </article>;
}

/* ---------- Das Erlebnis ---------- */
function LogoErlebnis({ m, teamSicht, allein }) {
  hmLogoErlebnisStil();
  useHm("branding"); useHm("logos"); useHm("marke2"); useHm("portraits"); useHm("einrichtung_daten");
  const mid = m.id;
  const b = hmBrand(mid);
  const spec = b.logoKonzept || null;
  const st = (hmStore.get("logos") || {})[mid] || {};
  const merk = (st.merk || []).filter((x) => x && x.art && x.id);
  const da = useLkSchriften(); useLkStamm([spec, ...merk].filter(Boolean));
  const name = (b.makler && b.makler.name) || `${b.vor} ${b.nach}`;
  const claim = (b.br && b.br.claim) || (b.w && b.w.leitidee) || "";
  const kontakt = hmLeKontakt(mid);
  const fb = ((hmStore.get("fragebogen") || {})[mid] || {}).antworten || {};
  let welt = null; try { welt = window.hmMbWelt ? hmMbWelt(mid, window.hmMbPlattform ? hmMbPlattform(mid) : null) : null; } catch (e) { welt = null; }
  const quelle = window.hmQuelle ? hmQuelle(mid) : null;
  const ctaText = hmLeKontrast("#FFFFFF", b.akzent) >= 4.5 ? "#FFFFFF" : "#0B0A09";

  /* Zutat 1: Anordnung in Worten */
  const artSatz = spec ? (HM_LE_ART_SATZ[spec.art] || "") : (HM_LE_ART_SATZ[b.logo] || HM_LE_ART_SATZ.wort);
  /* Zutat 2: Schrift mit Grund aus der Stimme oder der Markenwelt */
  const worte = typeof fb.worte === "string" && fb.worte.trim() ? fb.worte.trim().replace(/\.$/, "") : "";
  const schriftGrund = worte ? HM_LE_SAETZE.schriftStimme(worte) : (welt && typeof HM_WEB_SCHRIFTEN !== "undefined" && welt.schrift === b.schriftId ? HM_LE_SAETZE.schriftWelt(welt.name) : HM_LE_SAETZE.schriftStimme(""));
  /* Zutat 3: Zeichen aus dem Wort */
  let stw = []; try { stw = hmLkStichworte(mid); } catch (e) { stw = []; }
  const z = spec ? spec.zeichen : null;
  const hatZ = !!(spec && z && (spec.art === "zeichen" || spec.art === "dickte" || spec.art === "zeichen-nur"));
  const artAusWort = spec && spec.art === "teilung" ? "teilung" : null;
  const treffer = hatZ ? stw.find((s) => s.zeichen.includes(z)) : artAusWort ? stw.find((s) => s.zeichen.includes(artAusWort)) : null;
  const wort = (treffer && treffer.wort) || (spec && spec.herkunft && spec.herkunft.wort) || "";
  const quelleText = treffer ? hmLkQuelleText(treffer) : "";
  const zeichenWert = hatZ ? (HM_LK_ZEICHEN_NAME[z] || z) : artAusWort ? "Maßlinie" : (!spec && b.logo === "punkt") ? "Punkt" : "Wortmarke";
  const zeichenSatz = hatZ || artAusWort ? (wort ? HM_LE_SAETZE.ausWort(wort, quelleText) : HM_LE_SAETZE.keinZeichen) : (!spec && b.logo === "punkt") ? HM_LE_SAETZE.punktZeichen : HM_LE_SAETZE.keinZeichen;
  const herkunft = spec ? HM_LE_SAETZE.herkunftSpec(hmLkHerkunftText(spec, b).replace(/^aus Idee: /, "aus Ihrer Idee, mit dem Zeichen ").replace(/^aus Welt /, "aus Ihrer Markenwelt ").replace(/^aus Stichwort /, "aus Ihrem Wort ").replace(/^übernommenes Logo$/, "aus der Werkstatt"), spec.font) : HM_LE_SAETZE.herkunftOhne(b.schrift.d);

  return <div className={"hm-le" + (allein ? " allein" : "")} style={{ opacity: da ? 1 : 0.85, transition: "opacity .3s" }}>
    <section className="hm-le-buehne" aria-label="Ihr Logo">
      <div className="hm-le-papier"><LeLogo spec={spec} b={b} maxW={560} maxH={spec && spec.art === "monogramm" ? 150 : 100} /></div>
      <p className="hm-le-herkunft">{herkunft}</p>
      {claim && <p className="hm-le-claim" style={{ fontFamily: hmFont(b.schrift.d) }}>{claim}</p>}
    </section>

    <section aria-label="Woraus es entsteht">
      <h2 className="hm-le-h">Woraus es entsteht</h2>
      <p className="hm-le-leise" style={{ marginBottom: 22 }}>{HM_LE_SAETZE.zutaten}</p>
      <div className="hm-le-zutaten">
        <div className="hm-le-zutat"><div className="l">Ihr Name</div><div><div className="w">{name}</div><p className="s">{HM_LE_SAETZE.nameSo} {artSatz}</p></div></div>
        <div className="hm-le-zutat"><div className="l">Die Schrift Ihrer Stimme</div><div><div className="w" style={{ fontFamily: hmFont(b.schrift.d) }}>{b.schrift.d}{b.schrift.t && b.schrift.t !== b.schrift.d ? <span style={{ fontFamily: hmFont(b.schrift.t), color: "var(--text-muted)", fontSize: 18 }}> und {b.schrift.t}</span> : null}</div><p className="s">{b.schrift.name}. {schriftGrund}</p></div></div>
        <div className="hm-le-zutat"><div className="l">Das Zeichen aus Ihrem Wort</div><div><div className="w z">{(hatZ || artAusWort || (!spec && b.logo === "punkt")) && <span className="hm-le-zeichen"><LeLogo spec={spec} b={b} form={hatZ ? "zeichenRoh" : artAusWort ? "haupt" : "profil"} maxW={38} maxH={36} /></span>}<span>{zeichenWert}</span></div><p className="s">{zeichenSatz}</p></div></div>
      </div>
    </section>

    <section aria-label="Im Einsatz">
      <h2 className="hm-le-h">Im Einsatz</h2>
      <p className="hm-le-leise" style={{ marginBottom: 22 }}>{HM_LE_SAETZE.einsatz}</p>
      <div className="hm-le-einsatz">
        <figure className="breit">
          <div className="hm-le-vk-paar">
            <div className="hm-le-vk"><LeLogo spec={spec} b={b} maxW={220} maxH={spec && spec.art === "monogramm" ? 52 : 32} />{claim && <div className="c">{claim}</div>}</div>
            <div className="hm-le-vk"><LeLogo spec={spec} b={b} form="gestapelt" maxW={150} maxH={48} /><div><div className="n">{name}</div><div className="k">{kontakt.tel || kontakt.mail ? <>{kontakt.tel && <div>{kontakt.tel}</div>}{kontakt.mail && <div>{kontakt.mail}</div>}</> : HM_LE_SAETZE.kontaktFolgt}</div></div></div>
          </div>
          <figcaption>{HM_LE_SAETZE.visitenkarte}</figcaption>
        </figure>
        <figure>
          <div className="hm-le-profile">
            <div className="hm-le-profil"><div className={"hm-le-rund" + (b.portrait ? " foto" : "")}>{b.portrait ? <img src={b.portrait} alt={`Porträt von ${name}`} /> : <span className="leer">{HM_LE_SAETZE.portraitFolgt}</span>}</div><span>Instagram, LinkedIn</span></div>
            <div className="hm-le-profil"><div className="hm-le-rund"><LeLogo spec={spec} b={b} form="profil" maxW={52} maxH={52} /></div><span>Google, Flächen ohne Gesicht</span></div>
          </div>
          <figcaption>{HM_LE_SAETZE.profil}. {HM_LE_SAETZE.profilRegel}</figcaption>
        </figure>
        <figure>
          <div className="hm-le-tab-leiste"><div className="hm-le-tab"><span className="hm-le-fav"><LeLogo spec={spec} b={b} form="favicon" maxW={16} maxH={16} /></span><span className="titel">{name}</span></div></div>
          <figcaption>{HM_LE_SAETZE.favicon}</figcaption>
        </figure>
        <figure className="breit">
          <div className="hm-le-web" style={{ fontFamily: hmFont(b.schrift.t) }}><span className="l"><LeLogo spec={spec} b={b} maxW={220} maxH={spec && spec.art === "monogramm" ? 40 : 26} /></span><span className="nav">Objekte</span><span className="nav">Verkaufen</span><span className="nav">Über mich</span><span className="cta" style={{ background: b.akzent, color: ctaText }}>Erstgespräch</span></div>
          <figcaption>{HM_LE_SAETZE.websiteKopf}</figcaption>
        </figure>
        <figure className="breit">
          <div className="hm-le-sig"><LeLogo spec={spec} b={b} maxW={150} maxH={spec && spec.art === "monogramm" ? 44 : 30} /><div><div style={{ fontWeight: 500 }}>{name}</div>{claim && <div className="c">{claim}</div>}</div>{(kontakt.tel || kontakt.mail) && <div className="c">{kontakt.tel && <div>{kontakt.tel}</div>}{kontakt.mail && <div>{kontakt.mail}</div>}</div>}</div>
          <figcaption>{HM_LE_SAETZE.signatur}</figcaption>
        </figure>
      </div>
    </section>

    <section aria-label="Hell und dunkel">
      <h2 className="hm-le-h">Hell und dunkel</h2>
      <p className="hm-le-leise" style={{ marginBottom: 22 }}>{HM_LE_SAETZE.fassungen}</p>
      <div className="hm-le-fassungen">
        {[["positiv", HM_LE_SAETZE.hell, {}], ["negativ", HM_LE_SAETZE.dunkel, { invert: true }], ["schwarz", HM_LE_SAETZE.einfarbig, { farbe: "#000000" }]].map(([f, t, o]) => { const F = hmLkFassung(b, f); return <figure key={f} className="hm-le-fassung"><div className="f" style={{ background: F.GRUND }}><LeLogo spec={spec} b={b} maxW={260} maxH={spec && spec.art === "monogramm" ? 96 : 64} fassung={spec ? f : undefined} invert={!spec && o.invert} farbe={!spec ? o.farbe : undefined} /></div><figcaption>{t}</figcaption></figure>; })}
      </div>
    </section>

    <section className="hm-le-urteil" aria-label="Ihr Urteil">
      <div>
        <h2 className="hm-le-h">Ihr Urteil</h2>
        <p className="hm-le-leise">{merk.length ? `${HM_LE_SAETZE.urteilIntro} ${HM_LE_SAETZE.urteil}` : HM_LE_SAETZE.gestaltet}</p>
      </div>
      {merk.map((s, i) => <LeEntwurf key={s.id} spec={s} b={b} mid={mid} i={i + 1} n={merk.length} bw={(st.bewertung || {})[s.id] || {}} teamSicht={!!teamSicht} claim={claim} />)}
      {merk.length > 0 && <p className="hm-le-leise">{HM_LE_SAETZE.urteil}</p>}
    </section>

    {quelle && <p className="hm-le-freigabe">{HM_LE_SAETZE.freigegeben(quelle.version, hmLeDatum(quelle.eingefrorenAm))}</p>}
  </div>;
}

/* ---------- Selbsttest ---------- */
function hmSelbsttestLogoErlebnis() {
  const out = []; const t = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: e.message }); } };
  const saetze = [...Object.values(HM_LE_SAETZE).map((x) => typeof x === "function" ? x("Rat", "aus dem Claim") : x), ...Object.values(HM_LE_ART_SATZ), ...HM_LK_KRITERIEN, "Woraus es entsteht", "Im Einsatz", "Hell und dunkel", "Ihr Urteil", "Ihr Name", "Die Schrift Ihrer Stimme", "Das Zeichen aus Ihrem Wort", "Instagram, LinkedIn", "Google, Flächen ohne Gesicht", "Objekte", "Verkaufen", "Über mich", "Erstgespräch", "Ja", "Nein"];
  t("Texte ohne Ausrufezeichen und Gedankenstriche", () => { const bad = saetze.filter((x) => /[!\u2013\u2014]/.test(String(x))); return { ok: !bad.length, detail: bad.slice(0, 2).join(" | ").slice(0, 80) }; });
  t("Kein Hallo, kein Du im Makler-Text", () => { const bad = saetze.filter((x) => /\bhallo\b/i.test(x) || /\b(du|dein|deine|deinen|deinem|deiner|dich|dir)\b/i.test(x)); return { ok: !bad.length, detail: bad.slice(0, 2).join(" | ").slice(0, 80) }; });
  t("Pflichtsätze vorhanden", () => ({ ok: HM_LE_SAETZE.urteil === "Das Team entscheidet mit Ihrem Urteil." && HM_LE_SAETZE.gestaltet === "Das Team gestaltet gerade. Sobald es Entwürfe gibt, sehen Sie sie hier zuerst." }));
  t("Ja und Nein gleich breit, 48 px, ohne Füllung, gewählt mit 2 px Kontur", () => ({ ok: /hm-le-janein \{[^}]*grid-template-columns: 1fr 1fr/.test(HM_LE_CSS) && /hm-le-janein button \{[^}]*height: 48px[^}]*background: transparent/.test(HM_LE_CSS) && /aria-pressed="true"\] \{[^}]*inset 0 0 0 2px var\(--ink\)/.test(HM_LE_CSS) }));
  t("Bewertung schreibt ins Schema der Werkstatt", () => {
    const mid = "le-selbsttest"; const vorher = hmStore.get("logos");
    try {
      hmLeBewerten(mid, "lkTest", HM_LK_KRITERIEN[0], true); hmLeBewerten(mid, "lkTest", HM_LK_KRITERIEN[1], false); hmLeNotiz(mid, "lkTest", "Notiz");
      const bw = (((hmStore.get("logos") || {})[mid] || {}).bewertung || {}).lkTest || {};
      const ja = HM_LK_KRITERIEN.filter((x) => bw[x] === true).length, nein = HM_LK_KRITERIEN.filter((x) => bw[x] === false).length;
      return { ok: bw[HM_LK_KRITERIEN[0]] === true && bw[HM_LK_KRITERIEN[1]] === false && bw.notiz === "Notiz" && ja === 1 && nein === 1, detail: `${ja} ja, ${nein} nein` };
    } finally { hmStore.put("logos", vorher); }
  });
  const rendern = (mid, name) => {
    if (typeof document === "undefined" || !window.ReactDOM || !ReactDOM.createRoot) return null;
    const el = document.createElement("div"); const root = ReactDOM.createRoot(el);
    try { ReactDOM.flushSync(() => root.render(<LogoErlebnis m={{ id: mid, name }} teamSicht={false} />)); return el.innerHTML; }
    finally { try { root.unmount(); } catch (e) { /* ohne Baum nichts abzubauen */ } }
  };
  const makler = hmStore.get("makler") || [];
  const ohne = makler.find((x) => !((hmStore.get("branding") || {})[x.id] || {}).logoKonzept) || makler[0];
  const mit = makler.find((x) => ((hmStore.get("branding") || {})[x.id] || {}).logoKonzept);
  t("Rendert ohne gemerkte Entwürfe ohne Fehler, mit Satz des Teams", () => {
    if (!ohne) return { ok: true, detail: "keine Makler im Seed" };
    const vorher = hmStore.get("logos");
    try { hmStore.put("logos", { ...(vorher || {}), [ohne.id]: { ...((vorher || {})[ohne.id] || {}), merk: [] } }); const html = rendern(ohne.id, ohne.name); if (html === null) return { ok: true, detail: "ohne Dokument" }; return { ok: html.includes(HM_LE_SAETZE.gestaltet) && html.includes("<svg") && !html.includes("Ihr Urteil.</h2>Ja"), detail: ohne.name }; }
    finally { hmStore.put("logos", vorher); }
  });
  t("Rendert mit übernommenem Logo und Entwürfen, Fragen und Knöpfe da", () => {
    const mid = mit ? mit.id : (ohne && ohne.id); if (!mid) return { ok: true, detail: "keine Makler im Seed" };
    const vorher = hmStore.get("logos");
    try {
      const spec = hmLkKlemmen({ art: "satz", font: "Newsreader", gewicht: 400, laufweite: 0 }); spec.id = "lkLeTest";
      hmStore.put("logos", { ...(vorher || {}), [mid]: { ...((vorher || {})[mid] || {}), merk: [spec] } });
      const html = rendern(mid, (mit || ohne).name); if (html === null) return { ok: true, detail: "ohne Dokument" };
      const fragen = HM_LK_KRITERIEN.every((k) => html.includes(k)); const knoepfe = (html.match(/aria-pressed=/g) || []).length;
      return { ok: fragen && knoepfe >= 6 && html.includes(HM_LE_SAETZE.urteil) && html.includes(HM_LE_SAETZE.entwurfNr(1, 1)), detail: `${knoepfe} Knöpfe` };
    } finally { hmStore.put("logos", vorher); }
  });
  t("Stil einmalig im Kopf", () => { if (typeof document === "undefined") return { ok: true }; hmLogoErlebnisStil(); hmLogoErlebnisStil(); return { ok: document.querySelectorAll("#stil-logo-erlebnis").length === 1 }; });
  return out;
}

Object.assign(window, { LogoErlebnis, hmLogoErlebnisStil, hmSelbsttestLogoErlebnis });
