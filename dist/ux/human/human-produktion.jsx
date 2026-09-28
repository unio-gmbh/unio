/* UNIO HUMAN. Werkzeuge für den Monatszyklus (docs/UNIO_HUMAN_ROADMAP.md, Abschnitt 2.5):
   Ideen-Generator, Teleprompter, Abgabe-Check, Caption-Prüfung, Posting-Planer mit Metricool-CSV,
   Report aus dem Insights-Export. Alles regelbasiert im Browser, ohne Tokens, deterministisch.
   Nutzt globale Helfer aus human-store, human-ui, human-os-data, human-werkzeuge und human-more. */

/* ---------- Kleine Helfer ---------- */
const hmProdHeute = () => window.HM_HEUTE || new Date().toISOString().slice(0, 10);
const hmProdTag = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const hmProdDiff = (a, b) => Math.round((Date.parse(b.slice(0, 10) + "T12:00") - Date.parse(a.slice(0, 10) + "T12:00")) / 864e5);
const hmProdTT = (iso) => `${iso.slice(8, 10)}.${iso.slice(5, 7)}.`;
const HM_PROD_TAGE = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const HM_PROD_UHRZEITEN = ["07:30", "12:00", "17:00", "18:00", "19:30", "21:00"]; /* wie die Auswahl in Phase3 */
const HM_PROD_TYP_PLURAL = { reel: "Reels", carousel: "Carousels", beitrag: "Bildbeiträge", story: "Stories" };
if (window.HM_ICO && !window.HM_ICO.pause) window.HM_ICO.pause = "M5.5 3.5v9M10.5 3.5v9";

function hmProdNaechsterMonat() {
  const h = hmProdHeute(); const y = +h.slice(0, 4), mo = +h.slice(5, 7);
  return mo === 12 ? `${y + 1}-01` : `${y}-${String(mo + 1).padStart(2, "0")}`;
}
function hmProdMonatName(mon) { return new Date(mon + "-01T12:00").toLocaleDateString("de-AT", { month: "long", year: "numeric" }); }

/* Emoji-Erkennung: Unicode-Eigenschaft, sonst grobe Bereiche */
const HM_PROD_EMOJI = (() => { try { return new RegExp("\\p{Extended_Pictographic}", "u"); } catch (e) { return /[\u2600-\u27BF]|[\uD83C-\uDBFF][\uDC00-\uDFFF]/; } })();

/* Wörter vergleichbar machen: klein, ohne Satzzeichen, Zahlwörter als Ziffern, 12.400 als 12400 */
const HM_PROD_ZAHLWORT = { null: "0", zwei: "2", drei: "3", vier: "4", "fünf": "5", sechs: "6", sieben: "7", acht: "8", neun: "9", zehn: "10", elf: "11", "zwölf": "12", zwanzig: "20", "dreißig": "30", vierzig: "40", "fünfzig": "50", sechzig: "60", siebzig: "70", achtzig: "80", neunzig: "90", hundert: "100", tausend: "1000" };
function hmWortNorm(t) {
  return String(t || "").replace(/[„“”"»«‚‘’'()[\]]/g, " ").split(/\s+/).map((w) => {
    let x = w.toLowerCase().replace(/^[^a-z0-9ßà-öø-ÿ]+|[^a-z0-9ßà-öø-ÿ]+$/g, "");
    if (/^\d[\d.,]*$/.test(x)) x = /^\d{1,3}(\.\d{3})+$/.test(x) ? x.replace(/\./g, "") : x.replace(",", ".");
    return HM_PROD_ZAHLWORT[x] || x;
  }).filter(Boolean);
}
function hmZahlenIn(t) {
  const ohne = String(t || "").replace(/#[^\s#]+/g, " ").replace(/https?:\/\/\S+/g, " ");
  return [...new Set(hmWortNorm(ohne).filter((w) => /^\d/.test(w)))];
}
function hmProdLev(a, b) {
  const d = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) { let prev = d[0]; d[0] = i; for (let j = 1; j <= b.length; j++) { const tmp = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = tmp; } }
  return d[b.length];
}
const HM_PROD_STOPP = new Set(["eine", "einer", "eines", "einem", "einen", "dass", "wird", "sind", "warum", "mein", "meine", "meiner", "deine", "ihre", "wirklich", "gerade", "diese", "dieser", "ohne", "nach", "beim", "sich"]);
function hmProdAehnlich(a, b) {
  const na = hmWortNorm(a), nb = hmWortNorm(b);
  if (na.join(" ") === nb.join(" ")) return true;
  const A = new Set(na.filter((w) => w.length >= 4 && !HM_PROD_STOPP.has(w))), B = new Set(nb.filter((w) => w.length >= 4 && !HM_PROD_STOPP.has(w)));
  if (!A.size || !B.size) return false;
  let g = 0; A.forEach((x) => { if (B.has(x)) g++; });
  return g / (A.size + B.size - g) >= 0.6;
}

/* Gesprochene Sätze: Zitate im Skript, sonst Zeilen ohne Regieanweisung */
function hmSprechSaetze(skript) {
  const s = String(skript || "");
  const z = (s.match(/"[^"]+"|„[^"“]+[“"]/g) || []).map((x) => x.replace(/["„“]/g, "").trim()).filter(Boolean);
  if (z.length) return z;
  return s.split(/\n+/).map((l) => l.replace(/^\s*(Kachel|Story|Folie|Slide)\s*\d+\s*:\s*/i, "").trim()).filter((l) => l && !/^\[.*\]$/.test(l));
}

/* Anrede aus dem Weg. hmWeg setzt w.anrede nur bei "Sie" exakt, deshalb zusätzlich die Regel lesen. */
function hmAnredeVon(w, kanal) {
  if (!w) return "Du";
  if (w.anrede === "Sie") return "Sie";
  const r = w.anredeRegel || "";
  if (/^Sie/.test(r)) return "Sie";
  if (/^Du auf Instagram/.test(r)) return kanal === "linkedin" ? "Sie" : "Du";
  return "Du";
}
function hmProdKanaele(w) {
  const k = ((w && w.kanaele) || []).filter((x) => ["instagram", "facebook", "linkedin", "tiktok"].includes(x));
  if (k.includes("instagram") && !k.includes("facebook")) k.push("facebook");
  return k.length ? k : ["instagram", "facebook"];
}

/* ---------- 1. Ideen-Generator ---------- */
const HM_PROD_STANDARDWEG = { saeulen: { markt: 25, wissen: 25, meinung: 15, persoenlich: 20, beweise: 15 }, formate: ["talking", "carousel", "qa"], kanaele: ["instagram", "facebook"], bezirke: [], anrede: "Du", anredeRegel: "", graetzl: "" };
const HM_HOOK_MUSTER = { zahl: "Zahl", frage: "Frage", mythos: "Mythos", graetzl: "Grätzl", ablauf: "Ablauf" };
const HM_PROD_MUSTER_FORMAT = { zahl: ["carousel", "talking"], frage: ["qa", "talking"], mythos: ["talking", "qa"], graetzl: ["spaziergang", "walkthrough", "talking"], ablauf: ["carousel", "behind", "talking"], objekt: ["walkthrough", "behind"], anlass: ["talking", "qa", "carousel"] };

/* Vorlagen je Säule und Muster, je zwei Varianten. x = { B: Ort, J: Jahr, a: (du, sie) } */
const HM_IDEEN_VORLAGEN = {
  markt: {
    zahl: [(x) => [`${x.B} in drei Zahlen: Preise, Nachfrage, Angebot`, `3 Zahlen, die ${x.B} gerade verändern.`], (x) => [`Was ein Quadratmeter in ${x.B} ${x.J} kostet`, `So viel kostet ein Quadratmeter in ${x.B} ${x.J}.`]],
    frage: [(x) => [`Was kostet eine Wohnung in ${x.B} wirklich`, `Was kostet eine Wohnung in ${x.B} wirklich?`], (x) => [`Kaufen oder warten in ${x.B}`, x.a(`Kaufen oder warten? Was ich dir in ${x.B} rate.`, `Kaufen oder warten? Was ich Ihnen in ${x.B} rate.`)]],
    mythos: [(x) => [`Mythos: In ${x.B} fallen die Preise`, `In ${x.B} fallen die Preise? 3 Zahlen dagegen.`], (x) => [`Mythos: Altbau ist immer teurer`, `Ist Altbau immer teurer als Neubau? Ein Vergleich aus ${x.B}.`]],
    graetzl: [(x) => [`Grätzl-Check ${x.B} in 60 Sekunden`, `${x.B} in 60 Sekunden: 3 Ecken, die sich ändern.`], (x) => [`Die Straße in ${x.B}, die sich am schnellsten ändert`, `Welche Straße in ${x.B} ändert sich am schnellsten?`]],
    ablauf: [(x) => [`Wie ein Angebotspreis in ${x.B} entsteht`, `So entsteht ein Angebotspreis in ${x.B}, in 4 Schritten.`], (x) => [`Neubau oder Bestand in ${x.B}: der Vergleich`, `Neubau oder Bestand in ${x.B}? 3 Punkte im Vergleich.`]],
  },
  wissen: {
    zahl: [(x) => ["Meine Provision in drei Zahlen erklärt", "3 Zahlen zu meiner Provision, ohne Kleingedrucktes."], (x) => ["Fünf Schritte vom Erstgespräch bis zum Notar", "5 Schritte vom ersten Gespräch bis zum Notar."]],
    frage: [(x) => ["Was ich für meine Provision eigentlich mache", "Was mache ich eigentlich für meine Provision?"], (x) => ["Warum ich vor jedem Verkauf drei Vergleichspreise zeige", "Warum zeige ich vor jedem Verkauf 3 Vergleichspreise?"]],
    mythos: [(x) => ["Mythos: Makler sperren nur die Tür auf", "Makler sperren nur die Tür auf? Das passiert wirklich."], (x) => [x.a("Mythos: Ein Alleinauftrag bindet dich ewig", "Mythos: Ein Alleinauftrag bindet Sie ewig"), x.a("Ein Alleinauftrag bindet dich ewig? Stimmt nicht.", "Ein Alleinauftrag bindet Sie ewig? Stimmt nicht.")]],
    graetzl: [(x) => [`Warum ich fast nur in ${x.B} arbeite`, `Warum arbeite ich fast nur in ${x.B}?`], (x) => [`Was ich in ${x.B} nie verspreche`, `3 Dinge, die ich in ${x.B} nie verspreche.`]],
    ablauf: [(x) => ["So läuft eine Besichtigung bei mir", "So läuft eine Besichtigung bei mir, in 4 Schritten."], (x) => ["Was ich bewusst nicht mache", "3 Dinge, die ich in meinem Job bewusst nicht mache."]],
  },
  meinung: {
    zahl: [(x) => ["Drei Sätze, die ich keinem Verkäufer sage", "3 Sätze, die ich keinem Verkäufer sage."], (x) => ["Drei Dinge, die sich in meiner Branche ändern müssen", "3 Dinge, die sich in meiner Branche ändern müssen."]],
    frage: [(x) => ["Braucht es wirklich 20 Besichtigungen", "Braucht ein Verkauf wirklich 20 Besichtigungen?"], (x) => ["Ist das höchste Angebot das beste", "Ist das höchste Angebot wirklich das beste?"]],
    mythos: [(x) => ["Mythos: Im Winter verkauft sich nichts", "Im Winter verkauft sich nichts? Meine Meinung."], (x) => ["Mythos: Ohne Home Staging kein Verkauf", "Ohne Home Staging kein Verkauf? Ich sehe das anders."]],
    graetzl: [(x) => [`Was ${x.B} besser macht als sein Ruf`, `Was macht ${x.B} besser als sein Ruf?`], (x) => [`Meine ehrliche Meinung zu ${x.B}`, `Meine ehrliche Meinung zu ${x.B}, in 30 Sekunden.`]],
    ablauf: [(x) => ["Warum ich keinen Wunschpreis ansetze", "Warum setze ich keinen Wunschpreis an?"], (x) => ["Was ein gutes Exposé wirklich braucht", "Was braucht ein gutes Exposé wirklich? 3 Dinge."]],
  },
  persoenlich: {
    zahl: [(x) => ["Mein Dienstag in fünf Stationen", "Mein Dienstag in 5 Stationen."], (x) => ["Drei Dinge, die ich im ersten Jahr gelernt habe", "3 Dinge, die ich im ersten Jahr gelernt habe."]],
    frage: [(x) => ["Warum ich diesen Beruf gewählt habe", "Warum habe ich ausgerechnet diesen Beruf gewählt?"], (x) => ["Was mich an meinem Beruf am meisten freut", "Was freut mich an meinem Beruf am meisten?"]],
    mythos: [(x) => ["Was Leute über meinen Beruf denken", x.a("Was glaubst du, was ich den ganzen Tag mache?", "Was glauben Sie, was ich den ganzen Tag mache?")], (x) => ["Mein größter Fehler im ersten Jahr", "Mein größter Fehler im ersten Jahr, und was ich geändert habe."]],
    graetzl: [(x) => [`Mein Lieblingsplatz in ${x.B}`, `Mein Lieblingsplatz in ${x.B}, in 30 Sekunden.`], (x) => [`Ein Vormittag in ${x.B}`, x.a(`Komm mit, ein Vormittag in ${x.B}.`, `Kommen Sie mit, ein Vormittag in ${x.B}.`)]],
    ablauf: [(x) => ["So bereite ich mich auf ein Erstgespräch vor", "So bereite ich mich auf ein Erstgespräch vor, 3 Schritte."], (x) => ["Mein Montag vor dem ersten Termin", "Mein Montag beginnt um 7 Uhr, und zwar so."]],
  },
  beweise: {
    zahl: [(x) => [`Drei Abschlüsse, drei Geschichten aus ${x.B}`, `3 Abschlüsse, 3 Geschichten aus ${x.B}.`], (x) => ["Ein Verkauf in drei Zahlen", "Ein Verkauf in 3 Zahlen: Preis, Tage, Angebote."]],
    frage: [(x) => ["Wie lange ein Verkauf bei mir dauert", "Wie lange dauert ein Verkauf bei mir wirklich?"], (x) => ["Was Kunden nach der Übergabe sagen", "Was sagen Kunden eine Woche nach der Übergabe?"]],
    mythos: [(x) => ["Online-Bewertung gegen echten Verkaufspreis", "Online-Bewertung oder echter Preis: wer lag näher?"], (x) => ["Mythos: Leere Wohnungen verkaufen sich schlecht", "Leere Wohnung, schwer verkäuflich? Vorher und nachher."]],
    graetzl: [(x) => [`Verkauft in ${x.B}: was den Ausschlag gab`, `Verkauft in ${x.B}. Was hat den Ausschlag gegeben?`], (x) => [`Schlüsselübergabe in ${x.B}`, `Schlüsselübergabe in ${x.B}: der Moment danach.`]],
    ablauf: [(x) => ["Vom Anruf bis zum Schlüssel, ein echter Fall", "Ein echter Fall in 4 Schritten, vom Anruf bis zum Schlüssel."], (x) => ["Vorher und nachher: eine Wohnung vor dem Verkauf", "So sah die Wohnung vor 6 Wochen aus."]],
  },
};

/* Anlässe Oktober bis Dezember, Österreich. EZB-Termine laut Sitzungskalender 2026 (bei neuem Jahr prüfen). */
const HM_ANLAESSE_Q4 = [
  { id: "heizsaison", datum: "2026-10-01", name: "Beginn der Heizsaison", saeule: "markt", alt: "wissen", format: "carousel", t: (x) => ["Heizkosten und Energieausweis: worauf Käufer jetzt schauen", x.a("Was verrät der Energieausweis über deine Heizkosten?", "Was verrät der Energieausweis über Ihre Heizkosten?")] },
  { id: "quartal", datum: "2026-10-15", name: "Quartalszahlen Q3", saeule: "markt", alt: "meinung", format: "carousel", t: (x) => [`Das dritte Quartal in ${x.B}`, `Das 3. Quartal in ${x.B}, in 3 Zahlen.`] },
  { id: "zeitumstellung", datum: "2026-10-25", name: "Zeitumstellung", saeule: "wissen", alt: "persoenlich", format: "talking", t: (x) => ["Besichtigen, wenn es früh dunkel wird", "Ab jetzt ist es um 17 Uhr dunkel. So besichtigen wir."] },
  { id: "nationalfeiertag", datum: "2026-10-26", name: "Nationalfeiertag", saeule: "persoenlich", alt: "markt", format: "spaziergang", t: (x) => [`Nationalfeiertag: mein Weg durch ${x.B}`, `26. Oktober, frei: mein Lieblingsweg durch ${x.B}.`] },
  { id: "ezb-okt", datum: "2026-10-29", name: "Zinsentscheid der EZB", saeule: "markt", alt: "meinung", format: "talking", t: (x) => ["Zinsentscheid der EZB: was er für Käufer heißt", x.a("Die EZB hat entschieden. Was heißt das für deine Rate?", "Die EZB hat entschieden. Was heißt das für Ihre Rate?")] },
  { id: "allerheiligen", datum: "2026-11-01", name: "Allerheiligen", saeule: "wissen", alt: "beweise", format: "talking", hinweis: "behutsam, ohne Trauerbilder", t: (x) => ["Eine Wohnung geerbt: die ersten drei Schritte", x.a("Eine Wohnung geerbt? 3 Schritte, bevor du entscheidest.", "Eine Wohnung geerbt? 3 Schritte, bevor Sie entscheiden.")] },
  { id: "martini", datum: "2026-11-11", name: "Martini", saeule: "persoenlich", alt: "markt", format: "spaziergang", t: (x) => [`Martini: das beste Gansl in ${x.B}`, `Wo gibt es in ${x.B} das beste Martinigansl?`] },
  { id: "adventmarkt", datum: "2026-11-20", name: "Adventmärkte öffnen", saeule: "persoenlich", alt: "markt", format: "spaziergang", t: (x) => [`Adventmarkt in ${x.B}: ein Rundgang`, x.a(`Komm mit auf den Adventmarkt in ${x.B}.`, `Kommen Sie mit auf den Adventmarkt in ${x.B}.`)] },
  { id: "advent", datum: "2026-11-29", name: "Erster Advent", saeule: "meinung", alt: "markt", format: "talking", t: (x) => ["Verkaufen im Advent: lohnt sich das", "Verkaufen im Advent? Warum das oft gut läuft."] },
  { id: "steuer", datum: "2026-12-01", name: "Jahresende, Steuer", saeule: "markt", alt: "wissen", format: "carousel", t: (x) => ["Vor dem 31. Dezember: was Anleger klären", x.a("Anlegerwohnung? 3 Fragen an deinen Steuerberater vor dem 31.12.", "Anlegerwohnung? 3 Fragen an Ihren Steuerberater vor dem 31.12.")] },
  { id: "ezb-dez", datum: "2026-12-17", name: "Zinsentscheid der EZB", saeule: "markt", alt: "meinung", format: "carousel", t: (x) => [`Zinsen zum Jahresende: was ${x.J + 1} bringt`, `Letzter Zinsentscheid ${x.J}. Was heißt das für ${x.J + 1}?`] },
  { id: "rueckblick", datum: "2026-12-28", name: "Jahresrückblick", saeule: "beweise", alt: "persoenlich", format: "carousel", t: (x) => [`Mein Jahr ${x.J} in Zahlen`, `${x.J} in 3 Zahlen: Abschlüsse, Tage, Menschen.`] },
];

/* Säulenquoten: Weg normalisieren, "Wie ich arbeite" mindestens 15 %, Anzahl je Säule nach größtem Rest */
function hmSaeulenPlan(saeulen, anzahl) {
  const ids = Object.keys(HM_SAEULEN);
  const q = {}; ids.forEach((k) => (q[k] = Math.max(0, +((saeulen || {})[k]) || 0)));
  const sum = ids.reduce((n, k) => n + q[k], 0) || 1;
  ids.forEach((k) => (q[k] = (q[k] * 100) / sum));
  if (q.wissen < 15) { const fehlt = 15 - q.wissen; const rest = ids.filter((k) => k !== "wissen"); const rs = rest.reduce((n, k) => n + q[k], 0) || 1; rest.forEach((k) => (q[k] -= (fehlt * q[k]) / rs)); q.wissen = 15; }
  const roh = ids.map((k) => [k, (q[k] * anzahl) / 100]);
  const n = {}; roh.forEach(([k, v]) => (n[k] = Math.floor(v)));
  let frei = anzahl - ids.reduce((s, k) => s + n[k], 0);
  [...roh].sort((a, b) => (b[1] - Math.floor(b[1])) - (a[1] - Math.floor(a[1]))).forEach(([k]) => { if (frei > 0) { n[k]++; frei--; } });
  const min = Math.ceil(anzahl * 0.15);
  while (n.wissen < min) { const gr = ids.filter((k) => k !== "wissen").sort((a, b) => n[b] - n[a])[0]; if (!n[gr]) break; n[gr]--; n.wissen++; }
  const quote = {}; ids.forEach((k) => (quote[k] = Math.round(q[k])));
  return { quote, n };
}

/* Ideen im Content-Schema, zustand "idee". Reihenfolge: Anlässe nach Datum, dann Säulen reihum. */
function hmIdeen(m, monat, anzahl = 20) {
  const mid = m && m.id ? m.id : String(m || "");
  const mon = /^\d{4}-\d{2}$/.test(monat || "") ? monat : hmProdNaechsterMonat();
  const b = window.hmBrand ? hmBrand(mid) : { w: null };
  const w = b.w || HM_PROD_STANDARDWEG;
  const kanaele = hmProdKanaele(w);
  const du = hmAnredeVon(w, kanaele[0]) === "Du";
  const J = +mon.slice(0, 4);
  const x = { J, B: "Wien", a: (d, s) => (du ? d : s) };
  const bez = [...new Set([...(w.bezirke || []), ...(m && m.region ? [m.region] : [])].map((z) => String(z).replace(/^\d{4}\s/, "").trim()).filter(Boolean))];
  if (!bez.length) bez.push("Wien");
  const graetzl = String(w.graetzl || "").split(",")[0].trim();
  if (graetzl && hmWoerter(graetzl) <= 2 && !bez.includes(graetzl)) bez.push(graetzl);
  x.B = bez[0];
  const plan = hmSaeulenPlan(w.saeulen, anzahl);
  const rest = { ...plan.n };
  const vorhanden = (hmStore.get("content") || []).filter((c) => c.maklerId === mid).map((c) => c.titel || "");
  const neu = [];
  const doppelt = (t) => vorhanden.some((v) => hmProdAehnlich(v, t)) || neu.some((i) => hmProdAehnlich(i.titel, t));
  const formate = (w.formate || []).filter((f) => HM_FORMATE[f]);
  if (!formate.length) formate.push("talking", "carousel", "qa");
  let fz = 0;
  const formatFuer = (mu, wunsch) => [wunsch, ...(HM_PROD_MUSTER_FORMAT[mu] || [])].filter(Boolean).find((f) => formate.includes(f)) || formate[fz++ % formate.length];
  const stempel = Date.now().toString(36);
  const add = (s, titel, hook, muster, fmt, grund, extra) => {
    neu.push({ id: `${mid}-${mon}-${neu.length}-${stempel}`, maklerId: mid, titel, typ: fmt === "carousel" ? "carousel" : "reel", saeule: s, format: fmt, zustand: "idee", kanaele: [...kanaele], erstellt: hmProdHeute(), skript: `"${hook}"`, caption: "", manager: "Daniel Hayden", cutter: "Ahmet", akteure: "", drehtag: "", termin: "", clips: [], schnitt: null, kommentare: [], notizen: [], korrekturen: 0, monat: mon, muster, grund, quelle: "ideen-generator", ...(extra || {}) });
    rest[s]--;
  };

  /* 1. Objekte aus dem Bestand: innerhalb der Säule Beweise, nie mehr als die kleinste Säule und 10 % */
  const objekte = (((hmStore.get("bestand") || {})[mid] || {}).objekte || []).filter((o) => o && o.titel);
  const andere = Object.keys(plan.n).filter((k) => k !== "beweise" && plan.n[k] > 0).map((k) => plan.n[k]);
  const objN = objekte.length ? Math.max(0, Math.min(objekte.length, rest.beweise, Math.max(1, Math.floor(anzahl * 0.1)), andere.length ? Math.min(...andere) : 1)) : 0;
  let oi = 0;
  for (const o of objekte) {
    if (oi >= objN) break;
    const titel = `Rundgang: ${o.titel}`;
    if (doppelt(titel)) continue;
    const kurz = String(o.titel).split(/\s+/).slice(0, 5).join(" ");
    add("beweise", titel, `${kurz}: 3 Dinge, die man erst vor Ort sieht.`, "objekt", formatFuer("objekt"), `Objekt aus deinem Bestand${o.ort ? ", " + o.ort : ""}. Objekte bleiben die kleinste Gruppe.`, { objekt: o.titel });
    oi++;
  }

  /* 2. Anlässe der Saison, höchstens ein Viertel der Ideen */
  const mm = mon.slice(5, 7);
  const anMax = Math.ceil(anzahl / 4);
  let an = 0;
  HM_ANLAESSE_Q4.filter((a) => a.datum.slice(5, 7) === mm).forEach((a) => {
    if (an >= anMax) return;
    const s = rest[a.saeule] > 0 ? a.saeule : a.alt && rest[a.alt] > 0 ? a.alt : null;
    if (!s) return;
    const [titel, hook] = a.t(x);
    if (doppelt(titel)) return;
    const datum = `${J}${a.datum.slice(4)}`;
    add(s, titel, hook, "anlass", formatFuer("anlass", a.format), `${a.name} am ${hmProdTT(datum)}${a.hinweis ? ", " + a.hinweis + "." : ""}`, { anlass: datum });
    an++;
  });

  /* 3. Säulen auffüllen: Muster reihum, Orte reihum */
  const ids = Object.keys(HM_SAEULEN);
  const reihe = Object.keys(HM_HOOK_MUSTER);
  /* Jede Vorlage erst einmal, ein anderer Ort nur, wenn der erste schon im Plan steht. Zweite Runde erlaubt Wiederholung mit anderem Ort. */
  const benutzt = new Set();
  ids.forEach((s, si) => {
    const V = HM_IDEEN_VORLAGEN[s] || {};
    for (const wieder of [false, true]) {
      fuellen: for (let v = 0; v < 2; v++) for (let p = 0; p < bez.length; p++) for (let j = 0; j < reihe.length; j++) {
        if (rest[s] <= 0) break fuellen;
        const mu = reihe[(j + si) % reihe.length];
        const f = (V[mu] || [])[v];
        const key = `${s}|${mu}|${v}`;
        if (!f || (!wieder && benutzt.has(key))) continue;
        const [titel, hook] = f({ ...x, B: bez[p] });
        if (doppelt(titel)) continue;
        add(s, titel, hook, mu, formatFuer(mu), `${s === "wissen" ? "Pflichtsäule" : "Säule"} ${HM_SAEULEN[s].name}, ${plan.quote[s]} % deiner Strategie. Muster ${HM_HOOK_MUSTER[mu]}.`);
        benutzt.add(key);
      }
    }
  });

  const anl = neu.filter((i) => i.anlass).sort((a, b) => a.anlass.localeCompare(b.anlass));
  const gruppen = ids.map((s) => neu.filter((i) => !i.anlass && i.saeule === s)).filter((g) => g.length);
  const rr = [];
  for (let k = 0; gruppen.some((g) => g.length > k); k++) gruppen.forEach((g) => { if (g[k]) rr.push(g[k]); });
  return [...anl, ...rr];
}

function IdeenGenerator({ m, zu }) {
  const start = hmProdNaechsterMonat();
  const monate = [0, 1, 2].map((i) => { const d = new Date(start + "-01T12:00"); d.setMonth(d.getMonth() + i); return hmProdTag(d).slice(0, 7); });
  const [monat, setMonat] = React.useState(start);
  const [anzahl, setAnzahl] = React.useState(20);
  const [aus, setAus] = React.useState({});
  const ideen = React.useMemo(() => hmIdeen(m, monat, anzahl), [m && m.id, monat, anzahl]);
  React.useEffect(() => setAus({}), [monat, anzahl]);
  const b = hmBrand(m.id);
  const gewaehlt = ideen.filter((i) => !aus[i.id]);
  const plan = {}; gewaehlt.forEach((i) => (plan[i.saeule] = (plan[i.saeule] || 0) + 1));
  const uebernehmen = () => {
    const neu = gewaehlt.map((i) => ({ ...i }));
    hmStore.patch("content", (l) => [...neu, ...(l || [])]);
    hmEvent(m.id, "idee", `${neu.length} Ideen für ${hmProdMonatName(monat)} angelegt`, "Team");
    toast(`${neu.length} ${neu.length === 1 ? "Idee" : "Ideen"} übernommen`);
    if (zu) zu();
  };
  return <div className="hm-stack">
    <div className="hm-row" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
      <div className="hm-seg">{monate.map((v) => <button key={v} className={monat === v ? "on" : ""} onClick={() => setMonat(v)}>{new Date(v + "-01T12:00").toLocaleDateString("de-AT", { month: "long" })}</button>)}</div>
      <div className="hm-seg">{[10, 20].map((n) => <button key={n} className={anzahl === n ? "on" : ""} onClick={() => setAnzahl(n)}>{n} Ideen</button>)}</div>
    </div>
    {!b.w && <div className="hm-hinweis">Noch keine Strategie gewählt. Die Ideen folgen einer Standardverteilung.</div>}
    {gewaehlt.length > 0 && <div className="hm-rechnung">{Object.keys(HM_SAEULEN).filter((k) => plan[k]).map((k) => <div key={k}><b>{plan[k]}</b><span>{HM_SAEULEN[k].name}</span></div>)}</div>}
    {ideen.length ? <div className="hm-gruppe">{ideen.map((i) => { const an = !aus[i.id]; return <div key={i.id} className="hm-reihe klick" onClick={() => setAus({ ...aus, [i.id]: an })}>
      <span className={"hm-prod-wahl" + (an ? " on" : "")} role="checkbox" aria-checked={an}>{an && <Ico n="haken" />}</span>
      <div className="m"><div className="t">{i.titel}</div><div className="u">{HM_SAEULEN[i.saeule].name} · {HM_FORMATE[i.format] ? HM_FORMATE[i.format].name : HM_TYPEN[i.typ]}{i.anlass ? ` · ${hmProdTT(i.anlass)}` : ""}</div><div className="u hm-prod-grund">{i.grund}</div></div>
    </div>; })}</div> : <Leer titel="Keine neuen Ideen." text="Alle Vorlagen für diesen Monat sind schon im Plan." />}
    <div className="hm-row" style={{ justifyContent: "space-between" }}>
      <span className="hm-daten">{gewaehlt.length} von {ideen.length} gewählt</span>
      <Btn disabled={!gewaehlt.length} onClick={uebernehmen} knob={<Ico n="plus" />}>{gewaehlt.length} {gewaehlt.length === 1 ? "Idee" : "Ideen"} übernehmen</Btn>
    </div>
  </div>;
}

/* ---------- 2. Teleprompter ---------- */
/* Vollbild, 0,3 s je Wort bei Tempo 1. Leertaste oder Tippen: Pause. Pfeil hoch und runter: Tempo.
   Pfeil links und rechts: Satz zurück und vor. Escape schließt. Läuft als Portal an document.body. */
function Teleprompter({ skript, zu }) {
  if (window.HM_ICO && !window.HM_ICO.pause) window.HM_ICO.pause = "M5.5 3.5v9M10.5 3.5v9";
  const saetze = React.useMemo(() => hmSprechSaetze(skript), [skript]);
  const kum = React.useMemo(() => { const k = [0]; saetze.forEach((s) => k.push(k[k.length - 1] + Math.max(1, hmWoerter(s)))); return k; }, [saetze]);
  const gesamt = kum[kum.length - 1];
  const [tempo, setTempo] = React.useState(1);
  const [spiegel, setSpiegel] = React.useState(false);
  const [lauf, setLauf] = React.useState(false);
  const [count, setCount] = React.useState(saetze.length ? 3 : null);
  const [idx, setIdx] = React.useState(0);
  const [fertig, setFertig] = React.useState(false);
  const pos = React.useRef(0), idxRef = React.useRef(0), tempoRef = React.useRef(1);
  const fenster = React.useRef(null), bahn = React.useRef(null), zeilen = React.useRef([]);
  tempoRef.current = tempo;

  const setzen = React.useCallback(() => {
    const p = pos.current; let i = 0;
    while (i < saetze.length - 1 && p >= kum[i + 1]) i++;
    const el = zeilen.current[i], f = fenster.current, bb = bahn.current;
    if (el && f && bb) {
      const frac = Math.min(1, Math.max(0, (p - kum[i]) / Math.max(1, kum[i + 1] - kum[i])));
      const y = el.offsetTop + el.offsetHeight * frac;
      bb.style.transform = `translate3d(0, ${Math.round(f.clientHeight * 0.38 - y)}px, 0)`;
    }
    if (i !== idxRef.current) { idxRef.current = i; setIdx(i); }
  }, [saetze, kum]);

  React.useLayoutEffect(() => { setzen(); const r = () => setzen(); window.addEventListener("resize", r); return () => window.removeEventListener("resize", r); }, [setzen]);

  React.useEffect(() => {
    if (count == null) return;
    if (count === 0) { setCount(null); setLauf(true); return; }
    const t = setTimeout(() => setCount((c) => (c == null ? null : c - 1)), 1000);
    return () => clearTimeout(t);
  }, [count]);

  React.useEffect(() => {
    if (!lauf) return;
    let last = performance.now(), raf = 0;
    const schritt = (now) => {
      pos.current += (now - last) / (300 / tempoRef.current);
      last = now;
      if (pos.current >= gesamt) { pos.current = gesamt; setzen(); setLauf(false); setFertig(true); return; }
      setzen();
      raf = requestAnimationFrame(schritt);
    };
    raf = requestAnimationFrame(schritt);
    return () => cancelAnimationFrame(raf);
  }, [lauf, gesamt, setzen]);

  React.useEffect(() => {
    const vorher = document.body.style.overflow; document.body.style.overflow = "hidden";
    let lock = null;
    try { if (navigator.wakeLock) navigator.wakeLock.request("screen").then((l) => (lock = l)).catch(() => {}); } catch (e) {}
    return () => { document.body.style.overflow = vorher; try { if (lock) lock.release(); } catch (e) {} };
  }, []);

  const neustart = () => { pos.current = 0; setFertig(false); setLauf(false); setzen(); setCount(3); };
  const umschalten = () => {
    if (!saetze.length) return;
    if (fertig) { neustart(); return; }
    if (count != null) { setCount(null); setLauf(false); return; }
    setLauf((l) => !l);
  };
  const springen = (d) => { const i = Math.min(saetze.length - 1, Math.max(0, idxRef.current + d)); pos.current = kum[i]; setFertig(false); setzen(); };
  const tempoAendern = (d) => setTempo((t) => Math.round(Math.min(2, Math.max(0.5, t + d)) * 10) / 10);

  const taste = React.useRef(null);
  taste.current = (e) => {
    const k = e.key;
    if (k === "Escape") zu();
    else if (k === " " || e.code === "Space") umschalten();
    else if (k === "ArrowUp") tempoAendern(0.1);
    else if (k === "ArrowDown") tempoAendern(-0.1);
    else if (k === "ArrowLeft") springen(-1);
    else if (k === "ArrowRight") springen(1);
    else return;
    e.preventDefault(); e.stopPropagation();
  };
  React.useEffect(() => { const k = (e) => taste.current && taste.current(e); window.addEventListener("keydown", k, true); return () => window.removeEventListener("keydown", k, true); }, []);

  const restSek = Math.max(0, Math.round(((gesamt - (kum[idx] || 0)) * 0.3) / tempo));
  const stopp = (fn) => (e) => { e.stopPropagation(); fn(); };
  const inhalt = <div className="hm-tp" role="dialog" aria-modal="true" aria-label="Teleprompter">
    <div className="hm-tp-kopf">
      <button className="hm-tp-knopf" onClick={zu} aria-label="Schließen"><Ico n="x" g={18} /></button>
      <span className="hm-tp-info hm-daten">{saetze.length ? `Satz ${idx + 1} von ${saetze.length} · noch ${restSek} s` : ""}</span>
      <button className={"hm-tp-knopf" + (spiegel ? " on" : "")} aria-pressed={spiegel} onClick={() => setSpiegel(!spiegel)}>Spiegeln</button>
    </div>
    <div className="hm-tp-fenster" ref={fenster} onClick={umschalten}>
      {saetze.length ? <div className={"hm-tp-spiegel" + (spiegel ? " an" : "")}><div className="hm-tp-bahn" ref={bahn}>{saetze.map((s, i) => <p key={i} ref={(el) => (zeilen.current[i] = el)} className={i === idx ? "jetzt" : i < idx ? "war" : ""}>{s}</p>)}</div></div>
        : <div className="hm-tp-ende"><div>Im Skript steht noch kein gesprochener Text.</div></div>}
      {saetze.length > 0 && <div className="hm-tp-linie" aria-hidden="true"></div>}
      {count != null && count > 0 && <div className="hm-tp-count" aria-live="assertive">{count}</div>}
      {fertig && <div className="hm-tp-ende"><div>Fertig.</div><div className="hm-row" style={{ gap: 10 }}><button className="hm-tp-knopf on" onClick={stopp(neustart)}>Nochmal</button><button className="hm-tp-knopf" onClick={stopp(zu)}>Schließen</button></div></div>}
    </div>
    <div className="hm-tp-fuss">
      <button className="hm-tp-knopf" onClick={() => springen(-1)} aria-label="Satz zurück"><Ico n="zurueck" g={18} /></button>
      <button className="hm-tp-knopf gross" onClick={umschalten} aria-label={lauf ? "Pause" : "Start"}><Ico n={lauf ? "pause" : "play"} g={22} /></button>
      <button className="hm-tp-knopf" onClick={() => springen(1)} aria-label="Satz vor"><Ico n="weiter" g={18} /></button>
      <label className="hm-tp-tempo"><span>Tempo</span><input type="range" min="0.5" max="2" step="0.1" value={tempo} onChange={(e) => setTempo(+e.target.value)} /><b className="hm-daten">{(0.3 / tempo).toFixed(2).replace(".", ",")} s je Wort</b></label>
    </div>
  </div>;
  return window.ReactDOM && ReactDOM.createPortal ? ReactDOM.createPortal(inhalt, document.body) : inhalt;
}

/* ---------- 4. Caption-Prüfung ---------- */
const HM_PROD_THEMEN = ["Wohnung", "Immobilie", "Haus", "Eigentum", "Kauf", "Verkauf", "Miete", "Finanzierung", "Zinshaus", "Altbau", "Neubau", "Grundbuch", "Provision", "Makler", "Erbe", "Erbschaft", "Anleger", "Vorsorgewohnung", "Quadratmeter", "Preis", "Besichtigung", "Grätzl", "Wien"];
const HM_PROD_CTA = /\b(schreib|kommentier|speicher|teil (es|das|den|die|ihn)|teilen sie|link in|melde dich|melden sie|ruf|rufen sie|termin (buchen|vereinbaren|ausmachen)|folge mir|folgen sie|schick|dm\b|nachricht an mich)/i;
const HM_PROD_DU = /\b(du|dich|dir|dein|deine|deinem|deinen|deiner|deines|euch|euer)\b|\b(schreib|komm|schau|frag|ruf|teil|speicher|folg|melde dich)\b(?!en)/i;
const HM_PROD_SIE = /\b(Sie|Ihnen|Ihr|Ihre|Ihrem|Ihren|Ihrer|Ihres)\b/;
function hmProdSuchbegriffe(w, thema) {
  const orte = ((w && w.bezirke) || []).map((b) => String(b).replace(/^\d{4}\s/, ""));
  const g = String((w && w.graetzl) || "").split(",")[0].trim();
  const t = hmWortNorm(thema).filter((x) => x.length >= 6 && !HM_PROD_STOPP.has(x) && !/^\d/.test(x));
  return [...new Set([...orte, ...(g && hmWoerter(g) <= 3 ? [g] : []), ...t, ...HM_PROD_THEMEN])];
}
function hmCaptionCheck(caption, w, thema, kanal) {
  const t = String(caption || "");
  if (!t.trim()) return [{ ok: false, t: "Caption fehlt." }];
  const out = [];
  const erste = (t.split("\n").find((z) => z.trim()) || "").trim();
  out.push(erste.length < 100 ? { ok: true, t: `Erste Zeile mit ${erste.length} Zeichen.` } : { ok: false, t: `Erste Zeile hat ${erste.length} Zeichen. Unter 100 bleiben.` });
  const anfang = t.slice(0, 125).toLowerCase();
  const begriffe = hmProdSuchbegriffe(w, thema);
  const treffer = begriffe.find((x) => anfang.includes(x.toLowerCase()));
  out.push(treffer ? { ok: true, t: `Suchbegriff „${treffer}“ in den ersten 125 Zeichen.` } : { ok: false, t: `Kein Suchbegriff in den ersten 125 Zeichen, etwa ${begriffe.slice(0, 2).join(" oder ")}.` });
  const tags = t.match(/#[A-Za-z0-9_ßÀ-ÖØ-öø-ÿ]+/g) || [];
  out.push(tags.length >= 3 && tags.length <= 5 ? { ok: true, t: `${tags.length} Hashtags.` } : { ok: false, t: `${tags.length} Hashtags. 3 bis 5 sind richtig.` });
  const saetze = t.replace(/#[^\s#]+/g, " ").split(/[.?!\n]+/).map((s) => s.trim()).filter(Boolean);
  const cta = saetze.filter((s) => HM_PROD_CTA.test(s)).length;
  out.push(cta === 1 ? { ok: true, t: "Genau ein Handlungsaufruf." } : cta === 0 ? { ok: false, t: "Kein Handlungsaufruf. Ein Satz wie Schreib mir oder Speichern für später." } : { ok: false, t: `${cta} Handlungsaufrufe. Einer reicht.` });
  out.push(HM_PROD_EMOJI.test(t) ? { ok: false, t: "Enthält Emojis. Bitte entfernen." } : { ok: true, t: "Keine Emojis." });
  out.push(t.includes("!") ? { ok: false, t: "Enthält Ausrufezeichen. Punkt statt Ausrufezeichen." } : { ok: true, t: "Keine Ausrufezeichen." });
  const du = HM_PROD_DU.test(t), sie = HM_PROD_SIE.test(t);
  const soll = hmAnredeVon(w, kanal || "instagram");
  const ist = du ? "Du" : sie ? "Sie" : null;
  out.push(du && sie ? { ok: false, t: "Du und Sie gemischt. Eine Anrede wählen." } : !ist ? { ok: true, t: "Keine direkte Anrede, passt zu beidem." } : ist !== soll ? { ok: false, t: `Caption ${ist === "Sie" ? "siezt" : "duzt"}, die Strategie sieht ${soll} vor.` } : { ok: true, t: `Anrede einheitlich (${ist}).` });
  out.push(t.length <= 2200 ? { ok: true, t: `${t.length} von 2.200 Zeichen.` } : { ok: false, t: `${t.length} Zeichen. Instagram erlaubt 2.200.` });
  return out;
}

/* ---------- 3. Abgabe-Check ---------- */
/* Vault-Regel: Untertitel vor jeder Abgabe gegenlesen, Namen, Tippfehler. Erst bei grün an den Makler. */
const HM_PROD_TIPPFEHLER = [["wohung", "Wohnung"], ["immoblie", "Immobilie"], ["immobilen", "Immobilien"], ["seperat", "separat"], ["standart", "Standard"], ["vorraus", "voraus"], ["wiederrum", "wiederum"], ["provison", "Provision"], ["finazierung", "Finanzierung"], ["besichtung", "Besichtigung"], ["grundbruch", "Grundbuch"], ["nähmlich", "nämlich"], ["garnicht", "gar nicht"], ["strasse", "Straße"]];
function hmProdTippfehler(text) {
  const s = String(text || "");
  const tok = hmWortNorm(s);
  const out = [];
  HM_PROD_TIPPFEHLER.forEach(([f, r]) => { if (tok.some((w) => w === f || (f.length > 6 && w.endsWith(f)))) out.push(`${f} statt ${r}`); });
  const dop = s.match(/(^|\s)([A-Za-zßÀ-ÖØ-öø-ÿ]{2,})\s+\2(?=[\s.,?:;]|$)/i);
  if (dop) out.push(`doppeltes Wort „${dop[2]}“`);
  if (/\S {2,}\S/.test(s)) out.push("doppeltes Leerzeichen");
  if (/ [,.?:;]/.test(s)) out.push("Leerzeichen vor Satzzeichen");
  return out;
}
function hmProdNamePruefen(text, name) {
  const teile = String(name || "").split(/\s+/).filter(Boolean);
  if (teile.length < 2) return [];
  const vor = teile[0], nach = teile[teile.length - 1];
  const tok = String(text || "").split(/\s+/).map((w) => w.replace(/^[^A-Za-z0-9ßÀ-ÖØ-öø-ÿ]+|[^A-Za-z0-9ßÀ-ÖØ-öø-ÿ]+$/g, "")).filter(Boolean);
  const f = new Set();
  for (let i = 0; i < tok.length - 1; i++) {
    const a = tok[i], b = tok[i + 1];
    if (hmProdLev(a.toLowerCase(), vor.toLowerCase()) <= 1 && hmProdLev(b.toLowerCase(), nach.toLowerCase()) <= 2 && !(a === vor && b === nach)) f.add(`${a} ${b}`);
  }
  tok.forEach((t) => { if ((t !== nach && t.toLowerCase() === nach.toLowerCase()) || (t !== vor && t.toLowerCase() === vor.toLowerCase())) f.add(t); });
  return [...f];
}
function hmAbgabeCheck(c, b, clips) {
  const punkte = [];
  const P = (ok, t) => punkte.push({ ok: !!ok, t });
  const reel = c.typ === "reel";
  const w = b && b.w;
  const name = (b && b.makler && b.makler.name) || "";
  const zitate = ((c.skript || "").match(/"[^"]+"|„[^"“]+[“"]/g) || []).map((x) => x.replace(/["„“]/g, "").trim()).filter(Boolean);
  const segs = c.schnitt && c.schnitt.length ? c.schnitt : null;
  const untertitel = segs ? segs.filter((s) => s.text).map((s) => s.text) : [];
  const utText = untertitel.join(" ");

  if (reel) {
    if (!zitate.length) P(false, "Skript ohne gesprochenen Text in Anführungszeichen.");
    else if (!segs) P(false, "Noch kein Schnitt. Untertitel sind erst danach prüfbar.");
    else {
      const zaehl = (l) => l.reduce((m, x) => ((m[x] = (m[x] || 0) + 1), m), {});
      const A = zaehl(hmWortNorm(zitate.join(" "))), U = zaehl(hmWortNorm(utText));
      const fehlt = Object.keys(A).filter((k) => (U[k] || 0) < A[k]);
      const extra = Object.keys(U).filter((k) => (A[k] || 0) < U[k]);
      P(!fehlt.length && !extra.length, !fehlt.length && !extra.length ? `Untertitel stimmen Wort für Wort mit dem Skript überein (${hmWoerter(zitate.join(" "))} Wörter).` : `Untertitel weichen ab.${fehlt.length ? " Fehlt: " + fehlt.slice(0, 5).map((x) => `„${x}“`).join(", ") + "." : ""}${extra.length ? " Zusätzlich: " + extra.slice(0, 5).map((x) => `„${x}“`).join(", ") + "." : ""}`);
    }
  }

  const oeffentlich = [utText, c.caption || ""].join("\n");
  const namen = hmProdNamePruefen([c.skript || "", oeffentlich].join("\n"), name);
  P(!namen.length, namen.length ? `Name prüfen: ${namen.map((x) => `„${x}“`).join(", ")} statt „${name}“.` : name && oeffentlich.includes(name) ? `Name „${name}“ korrekt geschrieben.` : "Name kommt nicht vor oder ist korrekt.");

  const tipp = hmProdTippfehler(utText + "\n" + (c.caption || ""));
  P(!tipp.length, tipp.length ? `Tippfehler: ${tipp.slice(0, 4).join(", ")}.` : "Keine bekannten Tippfehler in Untertiteln und Caption.");

  const zS = new Set(hmZahlenIn(zitate.length ? zitate.join(" ") : c.skript || ""));
  const fremd = [...new Set([...hmZahlenIn(utText), ...hmZahlenIn(c.caption || "")])].filter((z) => !zS.has(z));
  P(!fremd.length, fremd.length ? `Zahlen ohne Entsprechung im Skript: ${fremd.join(", ")}.` : zS.size ? `Zahlen einheitlich (${[...zS].join(", ")}).` : "Keine Zahlen im Text.");

  if (reel) {
    const dauer = segs ? segs.reduce((n, s) => n + (+s.dauer || 0), 0) : hmSprechzeit(c.skript).sekunden;
    P(dauer < 60, `Länge ${Math.round(dauer)} s${segs ? "" : " geschätzt"}${dauer < 60 ? "." : ", für Reels unter 60 bleiben."}`);
    const ende = !!(segs && segs.some((s) => s.rolle === "Endkarte" || s.clip === "ende"));
    P(ende, ende ? "Endkarte vorhanden." : "Endkarte fehlt.");
  }

  const kanal = (c.kanaele || [])[0] || "instagram";
  const cap = hmCaptionCheck(c.caption, w, c.titel, kanal);
  const capOffen = cap.filter((x) => !x.ok);
  P(!capOffen.length, capOffen.length ? `Caption: ${capOffen.length} ${capOffen.length === 1 ? "Punkt" : "Punkte"} offen.` : `Caption geprüft, alle ${cap.length} Punkte erfüllt.`);

  P((c.kanaele || []).length > 0, (c.kanaele || []).length ? `Kanäle: ${(c.kanaele || []).map((k) => (window.HM_KANAELE && HM_KANAELE[k] ? HM_KANAELE[k].name : k)).join(", ")}.` : "Kein Kanal gewählt.");
  const termOk = !!c.termin && c.termin.slice(0, 10) >= hmProdHeute();
  P(termOk, !c.termin ? "Kein Termin gesetzt." : termOk ? `Termin ${hmProdTT(c.termin)} ${c.termin.slice(11, 16)}.` : "Termin liegt in der Vergangenheit.");

  /* Energieausweis-Vorlage-Gesetz (EAVG 2012, § 3): Anzeigen für Verkauf oder Vermietung nennen HWB und fGEE, sonst bis 1.450 € Strafe */
  const objektPost = c.typ === "walkthrough" || !!c.objekt || (c.saeule === "beweise" && /\b(verkauf|miete|zu haben|verfügbar|m²|zimmer|preis|€)/i.test((c.caption || "") + " " + (c.titel || "")));
  /* Seit der EAVG-Novelle (01.07.2026): HWB, Endenergiebedarf und Energieklasse; bei älteren Ausweisen HWB und fGEE */
  if (objektPost) { const t = c.caption || ""; const hwb = /HWB/i.test(t), alt = /fGEE/i.test(t), neu = /(EEB|Endenergie)/i.test(t) && /Klasse\s*[A-G]/i.test(t); P(hwb && (alt || neu), hwb && (alt || neu) ? "Energieausweis-Angaben in der Caption." : "Objekt-Beitrag: Energiekennzahlen fehlen (HWB, Endenergiebedarf und Klasse, bei älteren Ausweisen HWB und fGEE)."); }
  /* Grenzen der Meta-Schnittstelle für Reels */
  if (reel && segs) { const d = segs.reduce((n, s) => n + (+s.dauer || 0), 0); P(d >= 3, d >= 3 ? "Mindestlänge für die Meta-Schnittstelle erreicht." : "Reels brauchen mindestens 3 Sekunden."); }

  const ok = punkte.filter((x) => x.ok).length;
  return { punkte, score: Math.round((ok / punkte.length) * 100), bereit: ok === punkte.length, caption: cap };
}

function AbgabeCheck({ c }) {
  const alleClips = useHm("clips") || [];
  const clips = alleClips.filter((k) => k.maklerId === "alle" || k.maklerId === c.maklerId);
  const b = hmBrand(c.maklerId);
  const r = hmAbgabeCheck(c, b, clips);
  const offen = r.punkte.filter((x) => !x.ok).length;
  const capOffen = r.caption.filter((x) => !x.ok);
  return <div className="hm-stack" style={{ gap: 12 }}>
    <div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-h hm-h3">{r.bereit ? "Bereit für die Abgabe" : `${offen} ${offen === 1 ? "Punkt" : "Punkte"} offen`}</div><span className="hm-daten">{r.score} von 100</span></div>
    <div className="hm-pruefliste">{r.punkte.map((x, i) => <div key={i} className={x.ok ? "ok" : "nein"}><Ico n={x.ok ? "haken" : "x"} />{x.t}</div>)}</div>
    {capOffen.length > 0 && <><div className="hm-abschnitt-t">Caption im Detail</div><div className="hm-pruefliste">{capOffen.map((x, i) => <div key={i} className="nein"><Ico n="x" />{x.t}</div>)}</div></>}
  </div>;
}

/* ---------- 5. Posting-Slots ---------- */
/* Start-Hypothese Di und Do, 18 bis 21 Uhr. Ab vier Beiträgen mit Kennzahlen: Wochentage und Stunde
   mit der höchsten Reichweite je Beitrag. Mindestens ein freier Tag zwischen zwei Beiträgen. */
function hmPostingSlots(m, anzahl = 6) {
  const mid = m && m.id ? m.id : String(m || "");
  const content = (hmStore.get("content") || []).filter((c) => c.maklerId === mid);
  const belegt = content.filter((c) => c.termin && c.zustand !== "pausiert").map((c) => c.termin.slice(0, 10));
  const meetings = (hmStore.get("meetings") || []).filter((x) => x.maklerId === mid).map((x) => String(x.datum || "").slice(0, 13));
  const mitKz = content.filter((c) => c.kz && c.kz.reach && c.termin && c.termin.length > 10);
  const tage = {}, std = {};
  mitKz.forEach((c) => { const d = new Date(c.termin); (tage[d.getDay()] = tage[d.getDay()] || []).push(c.kz.reach); (std[d.getHours()] = std[d.getHours()] || []).push(c.kz.reach); });
  const avg = (a) => a.reduce((n, x) => n + x, 0) / a.length;
  const daten = mitKz.length >= 4 && Object.keys(tage).length >= 2;
  let wunsch = [2, 4], uhr = "18:00", rang = [2, 4, 3, 1, 5, 6, 0];
  if (daten) {
    rang = Object.keys(tage).map(Number).sort((a, b) => avg(tage[b]) - avg(tage[a]));
    wunsch = rang.slice(0, 2);
    rang = [...rang, ...[2, 4, 3, 1, 5, 6, 0].filter((x) => !rang.includes(x))];
    const h = Object.keys(std).map(Number).sort((a, b) => avg(std[b]) - avg(std[a]))[0];
    uhr = HM_PROD_UHRZEITEN.slice().sort((a, b) => Math.abs(+a.slice(0, 2) + +a.slice(3) / 60 - h) - Math.abs(+b.slice(0, 2) + +b.slice(3) / 60 - h))[0];
  }
  const out = [];
  const nah = (tag) => [...belegt, ...out.map((s) => s.iso.slice(0, 10))].some((x) => Math.abs(hmProdDiff(x, tag)) < 2);
  const heute = new Date(hmProdHeute() + "T12:00");
  for (let pass = 0; pass < 2 && out.length < anzahl; pass++) {
    const erlaubt = pass === 0 ? wunsch : rang;
    for (let i = 1; i <= 56 && out.length < anzahl; i++) {
      const d = new Date(heute); d.setDate(heute.getDate() + i);
      const wt = d.getDay();
      if (!erlaubt.includes(wt)) continue;
      const tag = hmProdTag(d);
      if (nah(tag)) continue;
      const iso = `${tag}T${uhr}`;
      if (meetings.includes(iso.slice(0, 13))) continue;
      const grund = pass === 1 ? `Ausweichtag ${HM_PROD_TAGE[wt]}, an den Wunschtagen ist schon etwas geplant.`
        : daten ? `${HM_PROD_TAGE[wt]} bringt bei dir im Schnitt ${Math.round(avg(tage[wt])).toLocaleString("de-AT")} Reichweite je Beitrag, beste Uhrzeit ${uhr}.`
        : `Start-Hypothese ${HM_PROD_TAGE[wt]}, 18 bis 21 Uhr. Wird mit deinen Zahlen genauer.`;
      out.push({ iso, grund });
    }
  }
  return out.sort((a, b) => a.iso.localeCompare(b.iso));
}

/* ---------- 6. Metricool-CSV ---------- */
/* Quelle: Metricool Help Center, "How to schedule posts in batch with a CSV file in Metricool"
   (help.metricool.com/en/article/how-to-schedule-posts-in-batch-with-a-csv-file-in-metricool-3wihqx)
   und "Common troubleshooting when importing CSV into Metricool" (help.metricool.com/en/article/common-troubleshooting-when-importing-csv-into-metricool-16c2syb),
   abgerufen 28.09.2026. Belegt: Spalten Text, Date, Time, Draft, je Netzwerk TRUE/FALSE (Facebook, Twitter/X, LinkedIn,
   GBP, Instagram, Pinterest, TikTok, YouTube, Threads, Bluesky), Picture Url 1 bis 10, Alt text picture 1 bis 10,
   Video Thumbnail Url, Video Cover Frame, Brand name, Instagram Post Type (POST, REEL, TRIAL_REEL, STORY),
   Instagram Show Reel On Feed, First Comment Text. Datum und Uhrzeit frei wählbar, beim Import dasselbe Format
   wählen (hier YYYY-MM-DD und HH:MM:SS). UTF-8, Medien als öffentliche Direktlinks, höchstens 50 Zeilen je Datei empfohlen.
   Format prüfen: Die offizielle Vorlage (Planer, CSV importieren) hat über 80 Spalten und darf laut Metricool
   nicht gekürzt werden. Vor dem ersten Echt-Import Kopfzeile und Schreibweise (Twitter oder X, YouTube)
   mit der heruntergeladenen Vorlage abgleichen und HM_METRICOOL_SPALTEN anpassen. */
const HM_METRICOOL_SPALTEN = ["Text", "Date", "Time", "Draft", "Facebook", "Twitter", "LinkedIn", "GBP", "Instagram", "Pinterest", "TikTok", "YouTube", "Threads", "Bluesky",
  ...Array.from({ length: 10 }, (_, i) => `Picture Url ${i + 1}`), ...Array.from({ length: 10 }, (_, i) => `Alt text picture ${i + 1}`),
  "Video Thumbnail Url", "Video Cover Frame", "Brand name", "Instagram Post Type", "Instagram Show Reel On Feed", "First Comment Text"];
/* Nicht freigegebene Beiträge gehen als Entwurf (Draft TRUE). Reels brauchen c.video als öffentliche URL der fertigen Datei. */
function hmMetricoolCsv(beitraege, b) {
  const clips = hmStore.get("clips") || window.HM_CLIPS_SEED || [];
  const abs = (u) => { if (!u) return ""; try { return new URL(u, location.href).href; } catch (e) { return u; } };
  const esc = (v) => { const s = String(v == null ? "" : v); return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  const B = (x) => (x ? "TRUE" : "FALSE");
  const zeilen = (beitraege || []).map((c) => {
    const k = c.kanaele || [];
    const bilder = c.typ === "reel" ? [c.video || c.videoUrl].filter(Boolean) : (c.clips || []).map((id) => clips.find((x) => x.id === id)).filter((x) => x && x.typ === "foto").map((x) => x.src);
    if (!bilder.length && c.typ !== "reel" && c.thumb) bilder.push(c.thumb);
    const t = c.termin || "";
    const r = {
      Text: c.caption || c.titel || "", Date: t.slice(0, 10), Time: t.length > 10 ? t.slice(11, 16) + ":00" : "", Draft: B(!["freigegeben", "online"].includes(c.zustand)),
      Facebook: B(k.includes("facebook")), Twitter: "FALSE", LinkedIn: B(k.includes("linkedin")), GBP: "FALSE", Instagram: B(k.includes("instagram")), Pinterest: "FALSE",
      TikTok: B(k.includes("tiktok")), YouTube: B(k.includes("youtube")), Threads: "FALSE", Bluesky: "FALSE",
      "Video Thumbnail Url": c.typ === "reel" ? abs(c.thumb) : "", "Video Cover Frame": "", "Brand name": (b && b.br && b.br.metricool) || "",
      "Instagram Post Type": c.typ === "reel" ? "REEL" : c.typ === "story" ? "STORY" : "POST", "Instagram Show Reel On Feed": B(c.typ === "reel"), "First Comment Text": "",
    };
    bilder.slice(0, 10).forEach((u, i) => { r[`Picture Url ${i + 1}`] = abs(u); r[`Alt text picture ${i + 1}`] = c.titel || ""; });
    return HM_METRICOOL_SPALTEN.map((h) => esc(r[h] || ""));
  });
  return [HM_METRICOOL_SPALTEN.map(esc), ...zeilen].map((z) => z.join(",")).join("\r\n");
}
function hmCsvLaden(name, text) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a"); a.href = url; a.download = /\.csv$/i.test(name) ? name : name + ".csv";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/* ---------- 7. Report aus dem Insights-Export ---------- */
/* Meta Business Suite: Insights, Inhalte, Daten exportieren, Instagram, Beiträge, CSV.
   Englische Kopfzeile (Stand 2025/26, aus Exporten, von Meta nicht offiziell dokumentiert): Post ID, Account ID,
   Account username, Account name, Description, Duration (sec), Publish time, Permalink, Post type, Data comment,
   Date, Views, Reach, Likes, Shares, Follows, Comments, Saves. Die Spalte Date enthält "Lifetime", kein Datum.
   Deutsche Namen sind rekonstruiert und schwanken je Export (Poststeady: Namen wandern zwischen Exporten,
   etwa Accounts reached statt Reach). Deshalb Zuordnung über Synonyme, beide Sprachen, mit echtem Export prüfen. */
const HM_INSIGHTS_SPALTEN = [
  ["id", "Beitrags-ID", ["post id", "beitrags-id", "beitrags id", "id des beitrags", "media id", "medien-id"]],
  ["konto", "Konto", ["account username", "konto-benutzername", "benutzername des kontos", "benutzername", "account name", "kontoname"]],
  ["text", "Beschreibung", ["description", "beschreibung", "caption", "bildunterschrift", "titel", "title"]],
  ["dauer", "Dauer", ["duration (sec)", "duration", "dauer (sek.)", "dauer (sekunden)", "dauer"]],
  ["zeit", "Veröffentlichungszeitpunkt", ["publish time", "veröffentlichungszeitpunkt", "veröffentlichungszeit", "veröffentlicht am", "veröffentlicht", "published", "date", "datum"]],
  ["link", "Permalink", ["permalink", "link", "url"]],
  ["typ", "Beitragstyp", ["post type", "beitragstyp", "media type", "medientyp", "art des beitrags", "typ", "type"]],
  ["views", "Aufrufe", ["views", "aufrufe", "impressions", "impressionen", "plays", "wiedergaben"]],
  ["reach", "Reichweite", ["reach", "reichweite", "accounts reached", "erreichte konten", "erreichte accounts"]],
  ["likes", "Gefällt mir", ["likes", "gefällt mir-angaben", "gefällt mir", "gefällt mir angaben", "reactions", "reaktionen"]],
  ["shares", "Geteilt", ["shares", "geteilte inhalte", "geteilt", "teilen", "mal geteilt", "sends", "reposts"]],
  ["follows", "Follows", ["follows", "neue follower", "follower", "follows gewonnen"]],
  ["kommentare", "Kommentare", ["comments", "kommentare"]],
  ["saves", "Gespeichert", ["saves", "gespeicherte beiträge", "gespeicherte inhalte", "gespeichert", "speicherungen", "saved"]],
];
const hmProdKopfNorm = (s) => String(s || "").replace(/^\uFEFF/, "").toLowerCase().replace(/[„“”"'‚‘’]/g, "").replace(/\s+/g, " ").trim();
function hmProdDatum(s) {
  const t = String(s || "").trim(); let m;
  const p = (x) => String(x).padStart(2, "0");
  if ((m = t.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{1,2}):(\d{2}))?/))) return `${m[1]}-${m[2]}-${m[3]}T${p(m[4] || 12)}:${m[5] || "00"}`;
  if ((m = t.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2,4})(?:,?\s+(\d{1,2}):(\d{2}))?/))) { const y = m[3].length === 2 ? "20" + m[3] : m[3]; return `${y}-${p(m[2])}-${p(m[1])}T${p(m[4] || 12)}:${m[5] || "00"}`; }
  if ((m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})(?:,?\s+(\d{1,2}):(\d{2})\s*(AM|PM)?)?/i))) {
    const a = +m[1], b = +m[2]; const mo = a > 12 ? b : a, d = a > 12 ? a : b; const y = m[3].length === 2 ? "20" + m[3] : m[3];
    let h = m[4] != null ? +m[4] : 12; if (m[6]) { const pm = /pm/i.test(m[6]); if (pm && h < 12) h += 12; if (!pm && h === 12) h = 0; }
    return `${y}-${p(mo)}-${p(d)}T${p(h)}:${m[5] || "00"}`;
  }
  return "";
}
function hmProdTyp(s) {
  const t = String(s || "").toLowerCase();
  if (/reel|video/.test(t)) return "reel";
  if (/karussell|carousel|album/.test(t)) return "carousel";
  if (/story/.test(t)) return "story";
  return "beitrag";
}
function hmInsightsLesen(text) {
  const rows = hmCsv(String(text || "").replace(/^\uFEFF/, ""));
  const zuordnen = (kopf) => {
    const h = kopf.map(hmProdKopfNorm); const map = {}; const frei = (i) => !Object.values(map).includes(i);
    HM_INSIGHTS_SPALTEN.forEach(([id, , syn]) => {
      let i = -1;
      for (const s of syn) { i = h.findIndex((x, j) => x === s && frei(j)); if (i >= 0) break; }
      if (i < 0) for (const s of syn.filter((x) => x.length >= 5)) { i = h.findIndex((x, j) => x.includes(s) && frei(j)); if (i >= 0) break; }
      if (i >= 0) map[id] = i;
    });
    return map;
  };
  let kopfZeile = -1, map = {};
  for (let r = 0; r < Math.min(5, rows.length); r++) { const mp = zuordnen(rows[r]); if (Object.keys(mp).length >= 3) { kopfZeile = r; map = mp; break; } }
  if (kopfZeile < 0) return { zeilen: [], spalten: {}, fehlt: HM_INSIGHTS_SPALTEN.map((x) => x[1]), sprache: "" };
  const kopf = rows[kopfZeile];
  const g = (r, k) => (map[k] != null ? String(r[map[k]] ?? "").trim() : "");
  const zahl = (v) => { const s = String(v || "").replace(/[^\d]/g, ""); return s ? parseInt(s, 10) : 0; };
  let zeilen = rows.slice(kopfZeile + 1).map((r) => ({
    id: g(r, "id"), text: g(r, "text"), zeit: hmProdDatum(g(r, "zeit")), link: g(r, "link"), typ: hmProdTyp(g(r, "typ")), typRoh: g(r, "typ"),
    dauer: parseFloat(g(r, "dauer").replace(",", ".")) || 0, views: zahl(g(r, "views")), reach: zahl(g(r, "reach")), likes: zahl(g(r, "likes")),
    shares: zahl(g(r, "shares")), follows: zahl(g(r, "follows")), kommentare: zahl(g(r, "kommentare")), saves: zahl(g(r, "saves")),
  })).filter((z) => z.id || z.text || z.reach);
  /* Spalte Datum mit "Gesamte Laufzeit" statt Datum: dann Zeit leer lassen */
  if (map.zeit != null && !zeilen.some((z) => z.zeit)) zeilen = zeilen.map((z) => ({ ...z, zeit: "" }));
  const spalten = {}; Object.keys(map).forEach((k) => (spalten[k] = kopf[map[k]]));
  const wichtig = ["zeit", "reach", "saves", "shares", "typ"];
  const fehlt = HM_INSIGHTS_SPALTEN.filter(([id]) => wichtig.includes(id) && map[id] == null).map((x) => x[1]);
  const hk = kopf.map(hmProdKopfNorm).join("|");
  const sprache = /reichweite|beschreibung|beitragstyp|veröffentlich|kommentare/.test(hk) ? "de" : /reach|description|post type|publish/.test(hk) ? "en" : "";
  return { zeilen, spalten, fehlt, sprache };
}
function hmProdPasst(r, content) {
  const tag = (r.zeit || "").slice(0, 10);
  const erste = hmWortNorm(String(r.text || "").split("\n")[0].split(/[.?]\s/)[0]).join(" ");
  const live = content.filter((c) => !["idee", "pausiert"].includes(c.zustand));
  return live.find((c) => c.termin && tag && c.termin.slice(0, 10) === tag)
    || live.find((c) => { const t = hmWortNorm(c.titel).join(" "); return t.length > 8 && (erste.includes(t) || hmWortNorm(r.text).join(" ").includes(t)); })
    || null;
}
/* Monatseintrag im Format der reports-Einträge. Reichweite ist die Summe je Beitrag (keine Konto-Reichweite).
   Gesicht ist eine Näherung: zugeordneter Beitrag mit Gesichts-Clip, sonst Reels als Gesicht gezählt. */
function hmReportAus(m, zeilen, monat) {
  const mid = m && m.id ? m.id : String(m || "");
  const alle = Array.isArray(zeilen) ? zeilen : (zeilen && zeilen.zeilen) || [];
  const zaehl = {}; alle.forEach((r) => { if (r.zeit) zaehl[r.zeit.slice(0, 7)] = (zaehl[r.zeit.slice(0, 7)] || 0) + 1; });
  const mon = monat || Object.keys(zaehl).sort((a, b) => zaehl[b] - zaehl[a])[0] || hmProdHeute().slice(0, 7);
  const z = Object.keys(zaehl).length ? alle.filter((r) => r.zeit && r.zeit.slice(0, 7) === mon) : alle;
  const sum = (k) => z.reduce((n, r) => n + (r[k] || 0), 0);
  const frueher = (((hmStore.get("reports") || {})[mid]) || []).filter((r) => r.monat < mon).sort((a, b) => a.monat.localeCompare(b.monat));
  const prev = frueher[frueher.length - 1];
  const content = (hmStore.get("content") || []).filter((c) => c.maklerId === mid);
  const clips = hmStore.get("clips") || window.HM_CLIPS_SEED || [];
  const paare = z.map((r) => ({ r, c: hmProdPasst(r, content) }));
  const gesichtN = paare.filter(({ r, c }) => (c && (c.clips || []).some((id) => ((clips.find((k) => k.id === id) || {}).tags || []).includes("Gesicht"))) || (c ? c.typ === "reel" : r.typ === "reel")).length;
  const posts = z.length;
  const gesicht = posts ? Math.round((gesichtN / posts) * 100) : 0;
  const nf = (n) => n.toLocaleString("de-AT", { maximumFractionDigits: 1 });
  const beste = [...paare].sort((a, b) => (b.r.shares * 3 + b.r.saves * 2 + b.r.reach / 100) - (a.r.shares * 3 + a.r.saves * 2 + a.r.reach / 100)).slice(0, 2)
    .map(({ r, c }) => (c ? c.titel : String(r.text || "").split("\n")[0].split(/[.?]\s/)[0].replace(/#\S+/g, "").trim().slice(0, 60)) || `Beitrag vom ${hmProdTT(r.zeit || mon + "-01")}`);

  const regeln = [];
  const y = +mon.slice(0, 4), mo = +mon.slice(5, 7);
  const proWoche = posts / (new Date(y, mo, 0).getDate() / 7);
  regeln.push(proWoche < 3 ? { p: 1, t: `${nf(proWoche)} Posts pro Woche, unter 3. Rhythmus auf 3 bis 5 heben, das verdoppelt das Wachstum` } : { p: 5, t: `Rhythmus gehalten, ${nf(proWoche)} Posts pro Woche` });
  const mitC = paare.filter((x) => x.c);
  const b = window.hmBrand ? hmBrand(mid) : { w: null };
  if (mitC.length >= Math.max(3, posts / 2) && b.w) {
    const anteil = {}; mitC.forEach(({ c }) => (anteil[c.saeule] = (anteil[c.saeule] || 0) + 1));
    const tief = Object.keys(b.w.saeulen).filter((k) => b.w.saeulen[k] > 0).map((k) => [k, Math.round(((anteil[k] || 0) / mitC.length) * 100)]).sort((a, c2) => a[1] - c2[1])[0];
    if (tief && tief[1] < 10) regeln.push({ p: 2, t: `Säule ${HM_SAEULEN[tief[0]].name} bei ${tief[1]} %, im nächsten Ideen-Set ausgleichen` });
  }
  const jeTyp = {}; z.forEach((r) => { const j = (jeTyp[r.typ] = jeTyp[r.typ] || { n: 0, s: 0, v: 0 }); j.n++; j.s += r.shares; j.v += r.saves; });
  const typen = Object.keys(jeTyp);
  if (typen.length) {
    const tS = typen.sort((a, c2) => jeTyp[c2].s / jeTyp[c2].n - jeTyp[a].s / jeTyp[a].n)[0];
    const tV = [...typen].sort((a, c2) => jeTyp[c2].v / jeTyp[c2].n - jeTyp[a].v / jeTyp[a].n)[0];
    const s = Math.round(jeTyp[tS].s / jeTyp[tS].n), v = Math.round(jeTyp[tV].v / jeTyp[tV].n);
    regeln.push({ p: 3, t: tS === tV ? `${HM_PROD_TYP_PLURAL[tS]} tragen Sends und Saves, ${s} und ${v} je Beitrag, davon mehr` : `${HM_PROD_TYP_PLURAL[tS]} holen ${s} Sends, ${HM_PROD_TYP_PLURAL[tV]} ${v} Saves je Beitrag, beide Signale halten` });
  }
  const einzeln = mitC.filter(({ c }) => c.typ === "reel" && (c.kanaele || []).length < 2).length;
  if (einzeln) regeln.push({ p: 2, t: `${einzeln} ${einzeln === 1 ? "Reel" : "Reels"} nur auf einem Kanal, auch für TikTok, Shorts und Facebook planen` });
  if (posts && gesicht < 50) regeln.push({ p: 2, t: `Gesicht in ${gesicht} % der Posts, Ziel 70 %` });
  if (prev && prev.reach) { const d = Math.round(((sum("reach") - prev.reach) / prev.reach) * 100); regeln.push({ p: 4, t: `Reichweite ${d >= 0 ? "plus" : "minus"} ${Math.abs(d)} % zum Vormonat` }); }
  regeln.push({ p: 6, t: "Die zwei besten Beiträge als Vorlage in die Bibliothek" });
  regeln.push({ p: 7, t: "Hook in den ersten 2 Sekunden prüfen" });
  const empf = regeln.sort((a, c2) => a.p - c2.p).slice(0, 3).map((x) => x.t);

  const follows = sum("follows");
  return { monat: mon, reach: sum("reach"), follower: (prev ? prev.follower : 0) + follows, saves: sum("saves"), sends: sum("shares"), posts, gesicht, beste, empf, quelle: "Meta Business Suite", neueFollower: follows };
}

/* Beispiel mit deutscher Kopfzeile (rekonstruiert), September 2026, zehn Beiträge von Elif Demir */
const HM_INSIGHTS_BEISPIEL = [
  "Beitrags-ID,Konto-ID,Konto-Benutzername,Kontoname,Beschreibung,Dauer (Sek.),Veröffentlichungszeitpunkt,Permalink,Beitragstyp,Datenkommentar,Datum,Aufrufe,Reichweite,„Gefällt mir“-Angaben,Geteilte Inhalte,Follows,Kommentare,Gespeicherte Beiträge",
  '17900000000000001,17841400000000000,elif.demir.immo,Elif Demir,"Was eine Wohnung in Favoriten 2026 kostet. Speichern für später. #Favoriten #Immobilien #Wien",,01.09.2026 18:00,https://www.instagram.com/p/DEMO01/,IG Karussell,,Gesamte Laufzeit,7100,5200,210,31,6,9,96',
  '17900000000000002,17841400000000000,elif.demir.immo,Elif Demir,"Wie viel Eigenmittel brauchst du wirklich? Schreib mir. #Finanzierung #Favoriten #Wien",41,03.09.2026 18:00,https://www.instagram.com/reel/DEMO02/,IG Reel,,Gesamte Laufzeit,6900,4800,260,58,5,17,61',
  '17900000000000003,17841400000000000,elif.demir.immo,Elif Demir,"Montag im Büro am Reumannplatz. Wer kommt auf einen Kaffee vorbei? #Favoriten #Immobilien #Wien",,05.09.2026 12:00,https://www.instagram.com/p/DEMO03/,IG Bild,,Gesamte Laufzeit,2900,2100,150,6,1,12,4',
  '17900000000000004,17841400000000000,elif.demir.immo,Elif Demir,"Grätzl-Check Favoriten in 60 Sekunden. Drei Ecken, die sich gerade ändern. Welche fehlt? Schreib es mir. #Favoriten #Immobilien #Wien",58,09.09.2026 18:00,https://www.instagram.com/reel/DEMO04/,IG Reel,,Gesamte Laufzeit,17800,12400,640,190,14,41,88',
  '17900000000000005,17841400000000000,elif.demir.immo,Elif Demir,"Mein Lieblingsplatz in Meidling, in 30 Sekunden. Wo ist deiner? #Meidling #Immobilien #Wien",34,12.09.2026 18:00,https://www.instagram.com/reel/DEMO05/,IG Reel,,Gesamte Laufzeit,12600,8900,520,140,9,28,35',
  '17900000000000006,17841400000000000,elif.demir.immo,Elif Demir,"Finanzierung: 5 Begriffe, die du kennen solltest. Speichern für später. #Finanzierung #Immobilien #Wien",,15.09.2026 18:00,https://www.instagram.com/p/DEMO06/,IG Karussell,,Gesamte Laufzeit,5400,3900,180,27,4,6,110',
  '17900000000000007,17841400000000000,elif.demir.immo,Elif Demir,"Schlüsselübergabe bei Familie K. Der Moment danach. Was sagt man da? #Favoriten #Immobilien #Wien",29,17.09.2026 18:00,https://www.instagram.com/reel/DEMO07/,IG Reel,,Gesamte Laufzeit,8800,6300,380,44,3,22,12',
  '17900000000000008,17841400000000000,elif.demir.immo,Elif Demir,"Warum ich Quereinsteigerin bin, und warum das gut ist. Schreib mir deine Frage. #Favoriten #Immobilien #Wien",47,20.09.2026 18:00,https://www.instagram.com/reel/DEMO08/,IG Reel,,Gesamte Laufzeit,8600,6100,430,52,7,35,18',
  '17900000000000009,17841400000000000,elif.demir.immo,Elif Demir,"Neubau in Liesing: 3 Projekte im Vergleich. Speichern für später. #Liesing #Neubau #Wien",,24.09.2026 18:00,https://www.instagram.com/p/DEMO09/,IG Karussell,,Gesamte Laufzeit,6100,4400,160,24,2,8,72',
  '17900000000000010,17841400000000000,elif.demir.immo,Elif Demir,"Ein Vormittag in Liesing, vom Markt bis zur Besichtigung. Wo trinkst du deinen Kaffee? #Liesing #Immobilien #Wien",52,26.09.2026 18:00,https://www.instagram.com/reel/DEMO10/,IG Reel,,Gesamte Laufzeit,10300,7300,470,96,6,24,22',
].join("\n");

function ReportImport({ m, zu }) {
  const [quelle, setQuelle] = React.useState(null);
  const [monat, setMonat] = React.useState(null);
  const [follower, setFollower] = React.useState("");
  const [ueber, setUeber] = React.useState(false);
  const reports = ((useHm("reports") || {})[m.id]) || [];
  const lesen = (name, text) => {
    const d = hmInsightsLesen(text);
    if (!d.zeilen.length) { toast("Keine Beiträge erkannt. Bitte den Beitrags-Export aus der Meta Business Suite wählen."); return; }
    setQuelle({ name, d }); setMonat(null); setFollower("");
  };
  const laden = async (f) => { try { lesen(f.name, await f.text()); } catch (e) { toast("Datei nicht lesbar"); } };
  const eintrag = React.useMemo(() => (quelle ? hmReportAus(m, quelle.d, monat || undefined) : null), [quelle, monat, m.id, reports.length]);
  if (!quelle) return <div className="hm-stack">
    <label className={"hm-drop" + (ueber ? " ueber" : "")} onDragOver={(e) => { e.preventDefault(); setUeber(true); }} onDragLeave={() => setUeber(false)} onDrop={(e) => { e.preventDefault(); setUeber(false); const f = e.dataTransfer.files[0]; if (f) laden(f); }}>
      <input type="file" accept=".csv,text/csv" hidden onChange={(e) => { const f = e.target.files[0]; e.target.value = ""; if (f) laden(f); }} />
      <span className="hm-row" style={{ gap: 10, justifyContent: "center" }}><Ico n="hoch" />CSV aus der Meta Business Suite hierher ziehen oder wählen</span>
    </label>
    <div className="hm-daten">Meta Business Suite: Insights, Inhalte, Daten exportieren, Instagram, Beiträge, CSV. Deutsche und englische Spalten werden erkannt.</div>
    <div className="hm-row"><button className="hm-link" onClick={() => lesen("beispiel-september.csv", HM_INSIGHTS_BEISPIEL)}>Mit Beispieldatei ausprobieren</button></div>
  </div>;
  const monate = [...new Set(quelle.d.zeilen.map((r) => (r.zeit || "").slice(0, 7)).filter(Boolean))].sort();
  const fol = follower === "" ? eintrag.follower : (+String(follower).replace(/\D/g, "") || 0);
  const fertig = { ...eintrag, follower: fol };
  const name = hmProdMonatName(fertig.monat);
  const ersetzt = reports.some((r) => r.monat === fertig.monat);
  const speichern = () => {
    hmStore.patch("reports", (all) => { const a = all || {}; const l = (a[m.id] || []).filter((r) => r.monat !== fertig.monat); return { ...a, [m.id]: [...l, fertig].sort((x, y) => x.monat.localeCompare(y.monat)) }; });
    hmEvent(m.id, "report", `Monatsreport ${name} aus dem Meta-Export`, "Team");
    toast(`Report ${name} gespeichert`);
    if (zu) zu();
  };
  return <div className="hm-stack">
    <div className="hm-row" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
      <div><div className="hm-h hm-h3">{quelle.name}</div><div className="hm-daten">{quelle.d.zeilen.length} Beiträge · {Object.keys(quelle.d.spalten).length} Spalten erkannt{quelle.d.sprache ? ` · ${quelle.d.sprache === "de" ? "deutsch" : "englisch"}` : ""}</div></div>
      {monate.length > 1 && <div className="hm-seg">{monate.map((v) => <button key={v} className={fertig.monat === v ? "on" : ""} onClick={() => setMonat(v)}>{new Date(v + "-01T12:00").toLocaleDateString("de-AT", { month: "short" })}</button>)}</div>}
    </div>
    {quelle.d.fehlt.length > 0 && <div className="hm-hinweis">Nicht gefunden: {quelle.d.fehlt.join(", ")}. Diese Werte zählen als 0.</div>}
    <div className="hm-rechnung">{[[fertig.reach, "Erreicht, Summe je Beitrag"], [fertig.saves, "Gespeichert"], [fertig.sends, "Geteilt"], [fertig.posts, "Beiträge"], [fertig.gesicht + " %", "mit Gesicht, geschätzt"]].map(([v, t]) => <div key={t}><b>{typeof v === "number" ? v.toLocaleString("de-AT") : v}</b><span>{t}</span></div>)}</div>
    <label className="hm-feld"><span>Follower am Monatsende</span><input inputMode="numeric" value={follower === "" ? String(eintrag.follower) : follower} onChange={(e) => setFollower(e.target.value)} /></label>
    <div className="hm-daten">{eintrag.neueFollower} neue Follows im Export. Den Stand am Monatsende aus Instagram übernehmen, falls er abweicht.</div>
    <div className="hm-sek">Beste Beiträge</div>
    <div className="hm-gruppe">{fertig.beste.map((x) => <div key={x} className="hm-reihe"><div className="m"><div className="t">{x}</div></div></div>)}</div>
    <div className="hm-sek">Was wir daraus machen</div>
    <div className="hm-gruppe">{fertig.empf.map((x) => <div key={x} className="hm-reihe"><div className="m"><div className="t" style={{ whiteSpace: "normal" }}>{x}</div></div></div>)}</div>
    <div className="hm-row" style={{ justifyContent: "space-between" }}>
      <button className="hm-link" onClick={() => setQuelle(null)}>Andere Datei</button>
      <Btn onClick={speichern} knob={<Ico n="haken" />}>Als Monatsreport speichern</Btn>
    </div>
    {ersetzt && <div className="hm-daten">Ersetzt den vorhandenen Report für {name}.</div>}
  </div>;
}

/* ---------- 8. Selbsttest ---------- */
function hmSelbsttestProduktion() {
  const out = [];
  const T = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: "Fehler: " + (e && e.message) }); } };
  const makler = hmStore.get("makler") || [];
  const elif = makler.find((x) => x.id === "elif") || { id: "elif", name: "Elif Demir", region: "1100 Favoriten" };
  const markus = makler.find((x) => x.id === "markus") || { id: "markus", name: "Markus Leitner", region: "1190 Döbling" };
  const wDu = { anrede: "Du", anredeRegel: "Du auf Instagram und TikTok, Sie auf LinkedIn, Website und im Erstkontakt", bezirke: ["1100 Favoriten", "1120 Meidling"], saeulen: { markt: 15, wissen: 15, meinung: 10, persoenlich: 35, beweise: 25 } };
  const bDu = { makler: { name: "Elif Demir" }, vor: "Elif", nach: "Demir", w: wDu, br: {} };
  const striche = /[\u2013\u2014]/;

  T("Säulenplan mit Pflichtsäule", () => { const p = hmSaeulenPlan({ markt: 50, wissen: 5, meinung: 15, persoenlich: 20, beweise: 10 }, 20); const s = Object.values(p.n).reduce((a, b) => a + b, 0); return { ok: s === 20 && p.n.wissen >= 3, detail: JSON.stringify(p.n) }; });
  T("Ideen-Generator Oktober", () => {
    const l = hmIdeen(elif, "2026-10", 20);
    const titel = l.map((i) => i.titel);
    const alt = (hmStore.get("content") || []).filter((c) => c.maklerId === elif.id).map((c) => c.titel);
    const fehler = [];
    if (l.length !== 20) fehler.push(`${l.length} statt 20`);
    if (new Set(titel).size !== titel.length) fehler.push("doppelte Titel");
    if (l.some((i) => i.zustand !== "idee" || !/^".+"$/.test(i.skript) || !i.grund || !HM_TYPEN[i.typ])) fehler.push("Schema");
    if (l.filter((i) => i.saeule === "wissen").length < 3) fehler.push("Pflichtsäule unter 15 %");
    if (l.some((i) => alt.some((a) => hmProdAehnlich(a, i.titel)))) fehler.push("Wiederholung");
    if (l.some((i) => /!/.test(i.titel + i.skript) || striche.test(i.titel + i.skript + i.grund))) fehler.push("Ausrufe- oder Gedankenstrich");
    if (!l.some((i) => i.anlass)) fehler.push("kein Anlass");
    return { ok: !fehler.length, detail: fehler.join(", ") || `${l.length} Ideen, ${l.filter((i) => i.anlass).length} Anlässe, Wie ich arbeite ${l.filter((i) => i.saeule === "wissen").length}` };
  });
  T("Ideen in der Anrede des Wegs", () => {
    const bm = hmBrand(markus.id); const soll = hmAnredeVon(bm.w, hmProdKanaele(bm.w || HM_PROD_STANDARDWEG)[0]);
    const l = hmIdeen(markus, "2026-11", 20); const text = l.map((i) => i.skript + " " + i.titel).join(" ");
    const du = /\b(du|dich|dir|dein|deine|deinen)\b/i.test(text), sie = /\b(Sie|Ihnen|Ihr|Ihre)\b/.test(text);
    return { ok: soll === "Sie" ? !du : !sie, detail: `Soll ${soll}, gefunden ${du ? "Du " : ""}${sie ? "Sie" : ""}`.trim() };
  });
  T("Sprechsätze", () => { const a = hmSprechSaetze('"Eins."\nRegie\n"Zwei Sätze hier."'); const b = hmSprechSaetze("Kachel 1: Frage\n[Bild]\nKachel 2: Antwort"); return { ok: a.length === 2 && b.length === 2 && b[0] === "Frage", detail: JSON.stringify([a, b]) }; });
  T("Caption gut", () => { const r = hmCaptionCheck("Favoriten in 60 Sekunden: drei Ecken, die sich gerade ändern.\n\nWelche Ecke fehlt? Schreib es mir.\n\n#Favoriten #Immobilien #Wien", wDu, "Grätzl-Check Favoriten"); return { ok: r.every((x) => x.ok), detail: r.filter((x) => !x.ok).map((x) => x.t).join(" ") }; });
  T("Caption schlecht", () => { const r = hmCaptionCheck("Unglaublich, was hier passiert, das musst du sehen und Sie werden staunen, " + "x".repeat(40) + "! \uD83D\uDE00\nSchreib mir. Speichern nicht vergessen.\n#a #b #c #d #e #f #g", wDu, ""); const nein = r.filter((x) => !x.ok).length; return { ok: nein >= 6, detail: `${nein} Punkte offen` }; });
  const basis = { id: "test", maklerId: "elif", titel: "Grätzl-Check Favoriten in 60 Sekunden", typ: "reel", saeule: "markt", zustand: "schnitt", kanaele: ["instagram", "facebook"], termin: "2026-10-06T18:00", clips: [],
    skript: '"Favoriten in 60 Sekunden. Drei Ecken, die sich gerade ändern."\n"Erstens der Reumannplatz."\n"Ich bin Elif Demir und kenne jede Straße."\n"Welche Ecke fehlt? Schreib es mir."',
    caption: "Favoriten in 60 Sekunden: drei Ecken, die sich gerade ändern.\n\nWelche Ecke fehlt? Schreib es mir.\n\n#Favoriten #Immobilien #Wien" };
  const seed = window.HM_CLIPS_SEED || [];
  T("Abgabe sauber", () => { const c = { ...basis, schnitt: hmAutoSchnitt(basis, seed) }; const r = hmAbgabeCheck(c, bDu, seed); return { ok: r.bereit, detail: r.punkte.filter((x) => !x.ok).map((x) => x.t).join(" ") || `${r.punkte.length} Punkte grün` }; });
  T("Abgabe mit Fehlern", () => {
    const segs = hmAutoSchnitt(basis, seed).map((s) => ({ ...s }));
    segs.forEach((s) => { if (/Elif Demir/.test(s.text)) s.text = "Ich bin Elif Demirr und kenne jede Straße."; if (/60 Sekunden/.test(s.text)) s.text = s.text.replace("60", "70"); });
    const r = hmAbgabeCheck({ ...basis, schnitt: segs }, bDu, seed);
    const t = r.punkte.filter((x) => !x.ok).map((x) => x.t).join(" ");
    return { ok: !r.bereit && /Name/.test(t) && /Untertitel/.test(t) && /70/.test(t), detail: t };
  });
  T("Posting-Slots", () => {
    const s = hmPostingSlots(elif, 6);
    const alt = (hmStore.get("content") || []).filter((c) => c.maklerId === elif.id && c.termin && c.zustand !== "pausiert").map((c) => c.termin.slice(0, 10));
    const tage = s.map((x) => x.iso.slice(0, 10));
    const kollision = tage.some((t, i) => alt.some((a) => Math.abs(hmProdDiff(a, t)) < 2) || tage.some((u, j) => j !== i && Math.abs(hmProdDiff(u, t)) < 2));
    return { ok: s.length === 6 && !kollision && tage.every((t) => t > hmProdHeute()), detail: s.map((x) => x.iso).join(", ") };
  });
  T("Metricool-CSV", () => {
    const csv = hmMetricoolCsv([{ ...basis, zustand: "freigegeben" }], bDu); const rows = hmCsv(csv);
    const h = rows[0], r = rows[1] || [];
    return { ok: rows.length === 2 && h.length === r.length && h[0] === "Text" && r[h.indexOf("Instagram")] === "TRUE" && r[h.indexOf("Instagram Post Type")] === "REEL" && r[h.indexOf("Date")] === "2026-10-06" && r[h.indexOf("Draft")] === "FALSE", detail: `${h.length} Spalten` };
  });
  T("Insights deutsch", () => { const d = hmInsightsLesen(HM_INSIGHTS_BEISPIEL); const reach = d.zeilen.reduce((n, r) => n + r.reach, 0); return { ok: d.zeilen.length === 10 && reach === 61400 && d.zeilen[3].zeit === "2026-09-09T18:00" && d.zeilen.filter((r) => r.typ === "reel").length === 6 && !d.fehlt.length && d.sprache === "de", detail: `${d.zeilen.length} Zeilen, Reichweite ${reach}, Spalten ${Object.keys(d.spalten).join(" ")}` }; });
  T("Insights englisch", () => {
    const en = 'Post ID,Account ID,Account username,Account name,Description,Duration (sec),Publish time,Permalink,Post type,Data comment,Date,Views,Reach,Likes,Shares,Follows,Comments,Saves\n1789,1784,elif.demir.immo,Elif Demir,"Test, one",32,09/15/2026 18:00,https://www.instagram.com/reel/x/,IG reel,,Lifetime,"15,000",9800,410,120,14,20,55';
    const d = hmInsightsLesen(en); const r = d.zeilen[0] || {};
    return { ok: d.zeilen.length === 1 && r.reach === 9800 && r.views === 15000 && r.zeit === "2026-09-15T18:00" && r.typ === "reel" && r.saves === 55 && d.sprache === "en", detail: JSON.stringify(r) };
  });
  T("Monatsreport", () => { const r = hmReportAus(elif, hmInsightsLesen(HM_INSIGHTS_BEISPIEL), "2026-09"); const keys = ["monat", "reach", "follower", "saves", "sends", "posts", "gesicht", "beste", "empf"]; return { ok: keys.every((k) => k in r) && r.posts === 10 && r.reach === 61400 && r.empf.length === 3 && r.beste.length === 2, detail: r.empf.join(" | ") }; });
  T("Leere Caption", () => { const r = hmCaptionCheck("", wDu); return { ok: r.length === 1 && !r[0].ok, detail: r[0].t }; });
  return out;
}

Object.assign(window, {
  hmIdeen, IdeenGenerator, hmSaeulenPlan, HM_IDEEN_VORLAGEN, HM_ANLAESSE_Q4, HM_HOOK_MUSTER, HM_PROD_STANDARDWEG,
  Teleprompter, hmSprechSaetze, hmAnredeVon, hmWortNorm, hmZahlenIn,
  hmAbgabeCheck, AbgabeCheck, hmCaptionCheck, hmPostingSlots,
  hmMetricoolCsv, hmCsvLaden, HM_METRICOOL_SPALTEN,
  hmInsightsLesen, hmReportAus, ReportImport, HM_INSIGHTS_BEISPIEL, HM_INSIGHTS_SPALTEN,
  hmSelbsttestProduktion,
});
