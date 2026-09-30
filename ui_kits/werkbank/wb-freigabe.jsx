/* Werkbank. Eine Quelle (Prozess v2, Umbau-Etappe 3, Grundstufe).
   Die Freigabe friert die Marke als Version mit SHA-256-Prüfsumme ein. Öffentliche Ausgaben (Website-Paket, Materialpaket,
   Captions) lesen über hmMarkeB(mid, "oeffentlich") nur noch diese Version. Das Team arbeitet weiter am Entwurf und sieht,
   wo er von der freigegebenen Version abweicht. Die Anrede hat genau eine Definition: hmAnrede.
   Ablage: hmStore "marke2" = { [mid]: { quelle: { version, eingefrorenAm, freigegebenVon, inhalt, pruefsumme }, historie: [] } } */

const HM_ANREDE_KANAELE = ["instagram", "facebook", "tiktok", "linkedin", "website", "email"];

/* Die eine Anrede-Regel: eingefrorene Version zuerst, sonst aus dem Fragebogen */
function hmAnrede(mid, kanal) {
  const q = ((hmStore.get("marke2") || {})[mid] || {}).quelle;
  if (q && q.inhalt && q.inhalt.anrede && q.inhalt.anrede[kanal]) return q.inhalt.anrede[kanal];
  const a = ((hmStore.get("fragebogen") || {})[mid] || {}).antworten || {};
  const b = hmBrand(mid);
  return window.hmPfAnrede ? hmPfAnrede(a, b.w, kanal) : "Sie";
}
function hmAnredeRegel(mid) {
  const l = HM_ANREDE_KANAELE.map((k) => [k, hmAnrede(mid, k)]);
  const alle = [...new Set(l.map((x) => x[1]))];
  if (alle.length === 1) return alle[0] === "Sie" ? "Sie auf allen Kanälen" : alle[0] === "Du" ? "Du auf allen Kanälen" : "Neutral auf allen Kanälen";
  const name = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", linkedin: "LinkedIn", website: "Website", email: "E-Mail" };
  return alle.map((v) => `${v === "neutral" ? "neutral" : v} auf ${l.filter((x) => x[1] === v).map((x) => name[x[0]]).join(", ")}`).join("; ");
}

/* Was eingefroren wird: alles, was nach außen sichtbar ist */
function hmQuelleInhalt(mid) {
  const b = hmBrand(mid);
  const welt = window.hmMbWelt ? hmMbWelt(mid, window.hmMbPlattform ? hmMbPlattform(mid) : null) : null;
  const p = window.hmMbPlattform ? hmMbPlattform(mid) : null;
  const a = ((hmStore.get("fragebogen") || {})[mid] || {}).antworten || {};
  const anrede = {}; HM_ANREDE_KANAELE.forEach((k) => { anrede[k] = window.hmPfAnrede ? hmPfAnrede(a, b.w, k) : "Sie"; });
  return {
    makler: b.makler.name || "", claim: b.claim || "", akzentId: b.akzentId, akzent: b.akzent, schriftId: b.schriftId, schrift: b.schrift,
    logo: b.logo, logoKonzept: b.logoKonzept || null, welt: welt ? welt.id : null, anrede,
    versprechen: (p && p.versprechen) || "", positionierung: (p && p.positionierung && (p.positionierung.satz || p.positionierung.kurz)) || "",
  };
}
function hmQuelleKanonisch(o) {
  if (Array.isArray(o)) return "[" + o.map(hmQuelleKanonisch).join(",") + "]";
  if (o && typeof o === "object") return "{" + Object.keys(o).sort().map((k) => JSON.stringify(k) + ":" + hmQuelleKanonisch(o[k])).join(",") + "}";
  return JSON.stringify(o === undefined ? null : o);
}
async function hmQuellePruefsumme(inhalt) {
  const txt = hmQuelleKanonisch(inhalt);
  try { const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(txt)); return [...new Uint8Array(h)].map((x) => x.toString(16).padStart(2, "0")).join(""); }
  catch (e) { let a = 2166136261; for (const ch of txt) { a ^= ch.charCodeAt(0); a = Math.imul(a, 16777619); } return "fnv-" + (a >>> 0).toString(16); }
}
async function hmQuelleEinfrieren(mid, wer, was) {
  const inhalt = hmQuelleInhalt(mid);
  const pruefsumme = await hmQuellePruefsumme(inhalt);
  const alt = ((hmStore.get("marke2") || {})[mid] || {});
  if (alt.quelle && alt.quelle.pruefsumme === pruefsumme) return alt.quelle;
  const [h, n] = String((alt.quelle && alt.quelle.version) || "0.9").split(".").map(Number);
  const version = alt.quelle ? `${h}.${n + 1}` : "1.0";
  const quelle = { version, eingefrorenAm: new Date().toISOString(), freigegebenVon: wer || "Team", inhalt, pruefsumme };
  hmStore.patch("marke2", (s) => ({ ...(s || {}), [mid]: { quelle, historie: [{ version, datum: quelle.eingefrorenAm, wer: quelle.freigegebenVon, was: was || "Freigabe", pruefsumme }, ...((alt.historie) || [])].slice(0, 30) } }));
  hmEvent(mid, "marke", `Marke als Version ${version} eingefroren`, wer || "Team");
  return quelle;
}
function hmQuelle(mid) { return ((hmStore.get("marke2") || {})[mid] || {}).quelle || null; }
/* Wo der Entwurf von der freigegebenen Version abweicht */
function hmQuelleAbweichung(mid) {
  const q = hmQuelle(mid); if (!q) return [];
  const jetzt = hmQuelleInhalt(mid); const name = { claim: "Claim", akzentId: "Akzent", schriftId: "Schrift", logo: "Logo", logoKonzept: "Logo", welt: "Markenwelt", anrede: "Anrede", versprechen: "Versprechen", positionierung: "Positionierung" };
  return [...new Set(Object.keys(name).filter((k) => hmQuelleKanonisch(jetzt[k]) !== hmQuelleKanonisch(q.inhalt[k])).map((k) => name[k]))];
}
/* Marke lesen: "oeffentlich" nimmt die eingefrorene Version, sonst den Entwurf */
function hmMarkeB(mid, modus) {
  const b = hmBrand(mid); const q = modus === "oeffentlich" ? hmQuelle(mid) : null;
  if (!q) return b;
  const i = q.inhalt;
  return { ...b, claim: i.claim || b.claim, akzentId: i.akzentId, akzent: i.akzent, schriftId: i.schriftId, schrift: i.schrift || b.schrift, logo: i.logo, logoKonzept: i.logoKonzept, quelleVersion: q.version };
}
function hmQuelleThemaUeber(mid) { const q = hmQuelle(mid); return q ? { akzentId: q.inhalt.akzentId, schriftId: q.inhalt.schriftId, logo: q.inhalt.logo } : null; }

/* Anzeige: Version, Prüfsumme, Abweichungen */
function QuelleStand({ m, kurz }) {
  useHm("marke2"); useHm("branding"); useHm("markenbuch");
  const q = hmQuelle(m.id);
  if (!q) return kurz ? null : <div className="hm-daten">Noch keine freigegebene Version. Die Freigabe friert die Marke ein.</div>;
  const ab = hmQuelleAbweichung(m.id);
  return <div className={"hm-quelle" + (ab.length ? " ab" : "")}>
    <span>Version {q.version}, freigegeben am {new Date(q.eingefrorenAm).toLocaleDateString("de-AT")} von {q.freigegebenVon}</span>
    {!kurz && <span className="hm-daten">Prüfsumme {q.pruefsumme.slice(0, 12)}</span>}
    {ab.length > 0 && <span className="w">Entwurf weicht ab: {ab.join(", ")}. Öffentlich gilt weiter Version {q.version}.</span>}
  </div>;
}

function hmSelbsttestFreigabe() {
  const out = []; const t = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: e.message }); } };
  const i = hmQuelleInhalt("markus");
  t("Kanonische Form unabhängig von der Reihenfolge", () => ({ ok: hmQuelleKanonisch({ b: 1, a: [2, { d: 3, c: 4 }] }) === hmQuelleKanonisch({ a: [2, { c: 4, d: 3 }], b: 1 }) }));
  t("Inhalt vollständig", () => ({ ok: !!i.claim && !!i.akzent && !!i.schrift && HM_ANREDE_KANAELE.every((k) => i.anrede[k]), detail: `${i.claim}, ${i.akzentId}, ${i.schriftId}` }));
  t("Anrede nur über hmAnrede", () => ({ ok: ["Sie", "Du", "neutral"].includes(hmAnrede("markus", "instagram")) && typeof hmAnredeRegel("markus") === "string", detail: hmAnredeRegel("markus") }));
  t("Öffentlich liest die eingefrorene Version", () => { const q = hmQuelle("markus"); if (!q) return { ok: true, detail: "noch nicht eingefroren" }; const b = hmMarkeB("markus", "oeffentlich"); return { ok: b.claim === q.inhalt.claim && b.akzent === q.inhalt.akzent, detail: "Version " + q.version }; });
  return out;
}

Object.assign(window, { hmAnrede, hmAnredeRegel, hmQuelleInhalt, hmQuelleKanonisch, hmQuellePruefsumme, hmQuelleEinfrieren, hmQuelle, hmQuelleAbweichung, hmMarkeB, hmQuelleThemaUeber, QuelleStand, hmSelbsttestFreigabe });
