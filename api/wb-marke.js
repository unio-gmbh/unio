/* Werkbank: Markenplattform mit der Claude-Kette (Vercel Serverless Function, Node, ESM).
   Standard und Prompts: docs/werkbank/MARKENQUALITAET.md. Datenvertrag: docs/werkbank/MARKE_SCHEMA.md.

   POST /api/wb-marke
   Header  Authorization: Basic <base64("beliebig:Passwort")>, dasselbe Passwort wie middleware.js für /ux.
   Body    { antworten, weg, mitschrift, material, makler?, branding?, welten?, phase?, freigabe? }
           phase "gate1"     Schritte 1 bis 3: Einsicht, drei Territorien, Kritik und Auswahl (für Gate 1)
           phase "plattform" Schritte 4 bis 6 und Schlussprüfung, braucht freigabe { einsicht, territorium, schaerfung? }
           phase "voll"      alles in einem Aufruf (Standard)
   Antwort 200 { ok, plattform, pruefung, kette }  oder  { ok, gate1, kette }
           401 ohne gültiges Passwort, 429 über 20 Aufrufe pro Stunde je IP,
           503 { fallback: "regeln" } ohne ANTHROPIC_API_KEY oder ohne SDK, 502 { fallback: "regeln" } bei Fehlern der Kette.

   Umgebung (Vercel > Settings > Environment Variables):
     ANTHROPIC_API_KEY  Pflicht, nie im Code
     WB_MODEL        optional, Standard "claude-opus-5-5"
     UX_PASSWORT        optional, sonst das Passwort aus middleware.js
   Abhängigkeit: "@anthropic-ai/sdk" in package.json ergänzen. Fehlt sie, antwortet die Funktion mit 503 und fallback. */

export const config = { maxDuration: 300 };

const MODELL = process.env.WB_MODEL || "claude-opus-5-5";
const PASSWORT = process.env.UX_PASSWORT || "UnioUX";
const LIMIT = 20;
const FENSTER_MS = 3600 * 1000;
const aufrufe = new Map();

/* ---------- Prompts (identisch mit docs/werkbank/MARKENQUALITAET.md, Kapitel 5) ---------- */
const SYSTEM = `Du bist Strategiechef einer Brand- und Social-Media-Agentur in Wien, die Personenmarken für Immobilienmakler baut. Du arbeitest für UNIO. Dein Maßstab sind die Liefergegenstände einer High-End-Agentur: Einsicht, Positionierung, Markenplattform, verbale Identität mit Beispielen, Story in drei Längen, Säulen als ausgearbeitete Serien, Konzeptideen, Startplan. Das Ergebnis muss so spezifisch sein, dass es für keinen anderen Makler in Wien passt.

Arbeitsregeln
1. Quelle ist ausschließlich das Dossier. Erfinde keine Fakten: keine Zahlen, Orte, Namen, Auszeichnungen, Jahreszahlen, Zitate. Fehlt etwas, schreibe genau: "Kommt aus dem Workshop: <was fehlt>".
2. Zitiere und verdichte die eigenen Worte des Maklers aus Freitexten und Workshop-Zitaten. Eigene Worte schlagen jede eigene Formulierung.
3. Jede Behauptung braucht einen Beleg aus dem Dossier. Zahlen nur, wenn sie im Dossier stehen, immer mit Ort oder Zeitraum.
4. Anrede: öffentliche Texte folgen der Anrede-Regel im Dossier, je Kanal. Texte an das Team (Skizzen, Abläufe, Begründungen) sind neutral formuliert.
5. Stil: Deutsch, Satzschreibung, kurze Sätze, Verben vor Adjektiven. Ein Ort oder eine Zahl schlägt jedes Adjektiv. Keine Ausrufezeichen, keine Emojis, keine Gedankenstriche, keine Überschriften-Vorspänne.
6. Verbotene Wörter, harte Fehler: Traumimmobilie, Ihr Partner für, mit Leidenschaft, kompetent und zuverlässig, Immobilienprofi, maßgeschneidert, rundum sorglos, auf Augenhöhe, Mehrwert, ganzheitlich, individuelle Lösungen, Ihr Zuhause ist unsere Mission, seriös, Experte an Ihrer Seite, einzigartig, exklusiv ohne Beleg. Ebenso zu meiden: Traumwohnung, einmalige Gelegenheit, revolutionär, Luxus, Premium, hochwertig, perfekt, garantiert.
7. Forschung, die gilt: Vertrauen hat drei Teile, Fähigkeit, Wohlwollen, Integrität (Mayer, Davis, Schoorman 1995), und Integrität wiegt schwerer als Sympathie (Brambilla 2021). Die Säule "Wie ich arbeite" ist Pflicht, mindestens 15 Prozent. Fehlergeschichten erst, wenn Belege da sind (Pratfall, Aronson 1966). Die Tonalität widerspricht nie dem heutigen Fremdbild, das Ziel in einem Jahr ist Richtung, nicht Stimme (Malär 2011). Säulen hängen an Anlässen, mit denen Kunden kommen (Category Entry Points, Romaniuk). Wiedererkennbarkeit entsteht zuerst über Gesicht und Bildausschnitt, Farbe trägt am wenigsten (Romaniuk 2018). Archetypen sind Sprachbild, keine Diagnose.
8. Die Messlatte: Würde ein Satz auch auf einen anderen Makler passen, ist er falsch. Schreib ihn neu, bis er nur auf diesen passt.

Niveau, nicht Inhalt. Übernimm aus diesem Beispiel keine Formulierung:
Schwach: "Ihr kompetenter Partner für Zinshäuser in Wien."
Stark: "Für Erbengemeinschaften und Anleger in Döbling, Währing und Hietzing ist Markus Leitner der Makler, der den Zeitpunkt vor den Abschluss stellt. Anders als Vermittler, die vom Abschluss leben. Einer Erbengemeinschaft riet er, zwei Jahre zu warten. Sie kam mit 600.000 mehr zurück."
Schwach: Serie "Markt-Update". Stark: Serie "Sievering in Zahlen": einmal im Monat drei Zahlen aus dem Grundbuch, ein eigener Abschluss als Einordnung, keine Prognose.`;

const SCHRITT = {
  einsicht: `Schritt 1 von 6: Einsicht.
Lies das Dossier wie ein Stratege vor dem ersten Termin. Beschreibe die Zielgruppe als Bild aus Anlass, Ort, Objekt und Lebensphase, nicht als Demografie. Finde die eine Spannung, die diese Kunden vor der Entscheidung umtreibt. Beschreibe die Konvention, mit der Makler in dieser Gegend und diesem Segment heute auftreten. Finde die weiße Stelle: was niemand besetzt und dieser Makler belegen kann. Jede Aussage stützt sich auf ein Detail im Dossier. Liste diese Details in "stuetzen", wörtlich.`,
  territorien: `Schritt 2 von 6: drei Positionierungs-Territorien.
Entwickle aus der Einsicht drei deutlich verschiedene Richtungen. Je Territorium: ein Name aus zwei bis vier Wörtern, die Kernidee in einem Satz, ein Positionierungssatz nach dem Muster "Für [wen] ist [Name] [der Makler / die Maklerin], [der / die ...]. Anders als [...]. [Beleg].", eine Claim-Idee mit höchstens fünf Wörtern, der stärkste Beleg aus dem Dossier und das größte Risiko. Wenn das Dossier es hergibt: ein Territorium aus Herkunft oder Zugehörigkeit, eines aus einer Haltung gegen den eigenen Vorteil, eines aus Ort oder Objekt.`,
  kritik: `Schritt 3 von 6: Kritik und Auswahl.
Bewerte jedes Territorium streng wie ein Creative Director, je Kriterium 0 bis 5 Punkte: Spezifität (Ort, Zahl, eigene Worte), Unterscheidbarkeit (passt nur auf diesen Makler), Glaubwürdigkeit (Beleg im Dossier), Anschluss (passt zum heutigen Fremdbild, zur Anrede und zu den Grenzen), Umsetzbarkeit (trägt Serien für zwölf Monate mit dem genannten Zeitbudget). Wähle eines. Begründe in höchstens drei Sätzen. Schärfe es: was aus den anderen beiden übernommen wird und welcher Satz noch zu allgemein ist.`,
  plattform: `Schritt 4 von 6: Markenplattform.
Baue auf dem gewählten Territorium und seiner Schärfung. Positionierung mit satz, fuerWen, was, andersAls, weil. Versprechen in einem Satz, in der Anrede der Website. Rolle: die Figur in eigenen Worten, name und satz. Drei Werte als Verhalten, je mit einem Satz "nie". Drei bis vier Persönlichkeitswörter aus dem heutigen Fremdbild mit heisst und heisstNicht. Botschaften: Claim mit höchstens fünf Wörtern, drei Alternativen, ein Satz, drei Sätze, "Über mich" in Ich-Form für die Website, Boilerplate in dritter Person. Story mit herkunft, spannung, wendepunkt, haltung, versprechen, dazu kurz (höchstens 35 Wörter), mittel (70 bis 100 Wörter), lang (160 bis 220 Wörter), in Ich-Form. Beweise: jede Behauptung mit Beleg aus dem Dossier und Quelle. Fehlen Wendepunkt oder Kundensatz, markiere die Lücke mit "Kommt aus dem Workshop: ...". In "lang" steht dann an dieser Stelle "[Kommt aus dem Workshop: Wendepunkt]".`,
  stimme: `Schritt 5 von 6: verbale Identität.
Regler von 0 bis 100 für ernst, persoenlich, begeistert, sachlich, abgeleitet aus Reglern und Worten im Dossier. Sechs bis acht Regeln, die ein Texter ohne Rückfrage anwenden kann. Wörter, die diese Marke sagt (Orte, Objekte, eigene Wörter aus dem Dossier), und Wörter, die sie nie sagt. Mindestens fünf Beispiele mit wo, so und nicht: Caption auf dem ersten Kanal, erste Antwort auf eine Anfrage, Absage oder Abraten, erster Satz der Website, Bio. "so" folgt der Anrede-Regel des jeweiligen Kanals. "nicht" zeigt die typische Branchenfloskel, die diese Marke vermeidet.`,
  serien: `Schritt 6 von 6: Säulen als Serien, Konzepte, Startplan, Bildwelt.
Übernimm Säulen und Anteile aus dem Strategie-Weg: vier bis fünf Säulen, "wissen" mindestens 15 Prozent, Summe 100. Jede Säule wird eine Serie mit eigenem Namen, nie ein Gattungsname wie "Markt-Update". Je Serie: Idee, Ablauf in drei bis fünf Schritten, Hook-Formel, Rhythmus mit Tag und Kanal, genau drei Beispielbeiträge mit Titel, Hook (höchstens zehn Wörter, funktioniert ohne Ton) und Skizze. Nutze Grätzl, Straßen, Objekte, Belege und den festen Wochentermin aus dem Dossier. Drei Konzepte: ein Launch für die ersten 30 Tage, ein wiederkehrendes Signature-Format, eine Community- oder Kooperationsidee im Grätzl, je mit Idee, Warum samt Evidenz, Umsetzung in Schritten und Kanal. Startplan: vier Wochen mit je drei bis vier Beiträgen aus den Serien, Kompetenz vor Persönlichem. Bildwelt: wähle eine Welt-ID aus der Liste im Dossier, formuliere Bildidee, Regeln, Motive, Vermeiden und das wiederkehrende Zeichen.`,
  pruefung: `Schlussprüfung vor Gate 2.
Prüfe die Plattform wie der Creative Director gegen die Matrix und die Arbeitsregeln: verbotene Wörter, Gedankenstriche, Ausrufezeichen, Anrede je Kanal, erfundene Fakten (jede Zahl und jeder Ort muss im Dossier stehen), Sätze, die auf jeden Makler passen würden, Hooks über zehn Wörter, Behauptungen ohne Beleg. Gib Korrekturen als Liste mit pfad (zum Beispiel botschaften.claim oder saeulen[2].serie.beispiele[1].hook), alt, neu und grund. Ändere nur, was gegen eine Regel verstößt oder austauschbar ist. Bewerte danach jedes Kriterium von 0 bis 100 und nenne höchstens fünf Hinweise für den Creative Director.`,
};

/* ---------- JSON-Schemas je Schritt (Structured Outputs) ---------- */
const S = { type: "string" };
const I = { type: "integer" };
const A = (items) => ({ type: "array", items });
const O = (properties) => ({ type: "object", properties, required: Object.keys(properties), additionalProperties: false });
const SAEULEN_IDS = ["markt", "wissen", "meinung", "persoenlich", "beweise"];
const FORMAT_IDS = ["talking", "spaziergang", "walkthrough", "carousel", "qa", "behind"];
const EINSICHT = O({ zielgruppe: S, spannung: S, konvention: S, weisseStelle: S });
const SCHEMA = {
  einsicht: O({ einsicht: EINSICHT, stuetzen: A(S) }),
  territorien: O({ territorien: A(O({ name: S, kernidee: S, positionierung: S, claimIdee: S, beleg: S, risiko: S })) }),
  kritik: O({ bewertungen: A(O({ territorium: S, spezifitaet: I, unterscheidbarkeit: I, glaubwuerdigkeit: I, anschluss: I, umsetzbarkeit: I, begruendung: S })), gewaehlt: I, begruendung: S, schaerfung: S }),
  plattform: O({
    positionierung: O({ satz: S, fuerWen: S, was: S, andersAls: S, weil: S }),
    versprechen: S,
    rolle: O({ name: S, satz: S }),
    werte: A(O({ name: S, verhalten: S, nie: S })),
    persoenlichkeit: A(O({ wort: S, heisst: S, heisstNicht: S })),
    botschaften: O({ claim: S, claimAlternativen: A(S), einSatz: S, dreiSaetze: S, ueberMich: S, boilerplate: S }),
    story: O({ herkunft: S, spannung: S, wendepunkt: S, haltung: S, versprechen: S, kurz: S, mittel: S, lang: S }),
    beweise: A(O({ behauptung: S, beleg: S, quelle: S })),
  }),
  stimme: O({ stimme: O({ regler: O({ ernst: I, persoenlich: I, begeistert: I, sachlich: I }), regeln: A(S), sagen: A(S), vermeiden: A(S), beispiele: A(O({ wo: S, so: S, nicht: S })) }) }),
  serien: O({
    saeulen: A(O({ id: { type: "string", enum: SAEULEN_IDS }, name: S, zweck: S, frage: S, anteil: I, formate: A({ type: "string", enum: FORMAT_IDS }), serie: O({ name: S, idee: S, ablauf: A(S), hookFormel: S, rhythmus: S, beispiele: A(O({ titel: S, hook: S, skizze: S })) }) })),
    konzepte: A(O({ name: S, idee: S, warum: S, umsetzung: A(S), kanal: S })),
    start30: A(O({ woche: I, beitraege: A(O({ titel: S, saeule: { type: "string", enum: SAEULEN_IDS }, format: { type: "string", enum: FORMAT_IDS } })) })),
    visuell: O({ welt: S, idee: S, bildsprache: O({ regeln: A(S), motive: A(S), vermeiden: A(S) }), zeichen: S }),
  }),
  pruefung: O({ korrekturen: A(O({ pfad: S, alt: S, neu: S, grund: S })), bewertung: O({ spezifitaet: I, unterscheidbarkeit: I, glaubwuerdigkeit: I, konsistenz: I, umsetzbarkeit: I }), hinweise: A(S) }),
};

/* ---------- Dossier: alles, was die Kette über den Makler weiß ---------- */
const LABEL = {
  seit: "Seit wann Makler", herkunft: "Wie dazu gekommen", immotypen: "Objekte, die wirklich verkauft werden", abschluesse: "Letzte drei Abschlüsse (eigene Worte)",
  gruende: "Warum Kunden gewählt haben", hindernis: "Was sie fast abgehalten hätte", ausloeser: "Anlässe, mit denen Kunden kommen", sichtbar: "Zuletzt vor Publikum oder Kamera",
  milieus: "Wohnwelten der Kunden", phasen: "Lebensphasen", bezirke: "Gegenden", graetzl: "Kern-Grätzl (eigene Worte)", graetzl_anteil: "Anteil der letzten zehn Abschlüsse im Grätzl",
  seite: "Eigentümer 0 bis Käufer 100", gefuehl: "Gefühl nach der Zusammenarbeit", unity: "Einer von ihnen bei (eigene Worte)",
  s1: "Aufrichtig 0 bis aufregend 100", s2: "Kompetent 0 bis nahbar 100", s3: "Ruhig 0 bis energisch 100", s4: "Klassisch 0 bis modern 100", s5: "Zurückhaltend 0 bis meinungsstark 100",
  archetyp: "Gewählte Figur", bildpaare: "Bildpaare (a oder b)", werte: "Werte", worte: "Drei Wörter heute, Fremdbild laut Makler (eigene Worte)", ideal: "Drei Wörter in einem Jahr (eigene Worte)",
  erfolge: "Wohlgefühl beim Sprechen über Erfolge 1 bis 5", fokus: "Reichweite 0 bis Bestand sichern 100", privat: "Darf öffentlich sein", tabus: "Nie zeigen oder sagen", anrede: "Anrede",
  bestand: "Existiert schon", follower: "Follower stärkster Kanal", behalten: "Erscheinungsbild", assets: "Mögliches Zeichen", vorbilder: "Vorbild-Account (eigene Worte)",
  kamera: "Kamera-Komfort 1 bis 5", zeit: "Zeit pro Monat", formate: "Vorstellbare Formate", kanaele: "Kanäle nach Wichtigkeit", ziel: "Ziel in zwölf Monaten", verfuegbar: "Drehtage",
  cue: "Fester Wochentermin für Content (eigene Worte)", fremdbild: "Fremdbild-Kontakte", aufgewachsen: "Herkunft (eigene Worte)", wendepunkt: "Wendepunkt (eigene Worte)",
  abgeraten: "Abgeraten gegen die eigene Provision (eigene Worte)", belege: "Belege aus 24 Monaten (eigene Worte)", fehler: "Beruflicher Fehler und Lernen (eigene Worte)", kundensatz: "Kundensatz wörtlich",
};
const txt = (v) => (v == null ? "" : typeof v === "string" ? v : Array.isArray(v) ? v.join(", ") : JSON.stringify(v));
function dossier(b) {
  const a = b.antworten || {};
  const w = b.weg || null;
  const z = [];
  z.push(`# Dossier ${b.makler && b.makler.name ? b.makler.name : "Makler"}${b.makler && b.makler.region ? ", " + b.makler.region : ""}`);
  z.push("## Fragebogen");
  Object.keys(LABEL).forEach((k) => { if (a[k] != null && txt(a[k]) !== "") z.push(`- ${LABEL[k]}: ${txt(a[k])}`); });
  Object.keys(a).filter((k) => !LABEL[k] && txt(a[k])).forEach((k) => z.push(`- ${k}: ${txt(a[k])}`));
  const fehlt = ["aufgewachsen", "wendepunkt", "abgeraten", "belege", "fehler", "kundensatz"].filter((k) => !txt(a[k]));
  if (fehlt.length) z.push(`- Nicht beantwortet, als Lücke markieren: ${fehlt.map((k) => LABEL[k].replace(" (eigene Worte)", "")).join(", ")}`);
  if (w) {
    z.push("## Gewählter Strategie-Weg");
    z.push(`- Figur: ${w.archetyp ? `${w.archetyp.name}, Achse ${w.archetyp.achse}, Leitidee "${w.archetyp.leitidee}"` : ""}`);
    z.push(`- Säulen in Prozent: ${txt(w.saeulen)}`);
    z.push(`- Formate: ${txt(w.formate)}; Kanäle: ${txt(w.kanaele)}; Frequenz: ${txt(w.frequenz)}`);
    z.push(`- Anrede-Regel: ${txt(w.anredeRegel || w.anrede)}`);
    z.push(`- Ton: ${txt(w.ton)}; Ziel: ${txt(w.ziel)}; Fokus: ${txt(w.fokus)}`);
    if (w.passt) z.push(`- Passt, weil: ${txt(w.passt)}`);
    if (w.fordert) z.push(`- Fordert, weil: ${txt(w.fordert)}`);
  }
  const m = b.mitschrift;
  if (m) {
    z.push("## Workshop-Mitschrift");
    if (m.datum) z.push(`- Datum: ${m.datum}`);
    if (m.zusammenfassung) z.push(`- Zusammenfassung: ${m.zusammenfassung}`);
    (m.zitate || []).forEach((q) => z.push(`- Zitat: "${q}"`));
    const t = txt(m.transkript || (typeof m === "string" ? m : ""));
    if (t) z.push(`### Transkript${t.length > 24000 ? " (erste 24.000 Zeichen, Rest gekürzt)" : ""}\n${t.slice(0, 24000)}`);
  } else z.push("## Workshop-Mitschrift\n- Noch kein Workshop. Alles, was nur im Gespräch entsteht, als Lücke markieren.");
  const mat = b.material || [];
  if (mat.length) z.push(`## Material\n${mat.map((x) => `- ${x.art || "Datei"}: ${x.name || ""}`).join("\n")}`);
  if (b.branding && (b.branding.claim || b.branding.akzent)) z.push(`## Branding heute\n- Claim: ${b.branding.claim || "keiner"}; Akzent: ${b.branding.akzent || "keiner"}; Schrift: ${b.branding.schrift || "keine"}`);
  const welten = (b.welten && b.welten.length) ? b.welten : ["ruhig", "editorial", "graetzl", "klar", "warm", "kontrast"].map((id) => ({ id }));
  z.push(`## Bildwelten zur Auswahl (Welt-ID)\n${welten.map((x) => `- ${x.id}${x.name ? " (" + x.name + ")" : ""}${x.passtZu ? ", passt zu " + x.passtZu.join(", ") : ""}`).join("\n")}`);
  return z.join("\n");
}

/* ---------- Hilfen ---------- */
function ipVon(req) { return String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || (req.socket && req.socket.remoteAddress) || "unbekannt"; }
function begrenzt(ip) {
  const jetzt = Date.now();
  const l = (aufrufe.get(ip) || []).filter((t) => jetzt - t < FENSTER_MS);
  if (l.length >= LIMIT) { aufrufe.set(ip, l); return Math.ceil((FENSTER_MS - (jetzt - l[0])) / 1000); }
  l.push(jetzt); aufrufe.set(ip, l);
  return 0;
}
function erlaubt(req) {
  const auth = String(req.headers.authorization || "");
  if (!auth.startsWith("Basic ")) return false;
  try { const d = Buffer.from(auth.slice(6), "base64").toString("utf8"); return d.slice(d.indexOf(":") + 1) === PASSWORT; } catch (e) { return false; }
}
/* Letzte Sicherung der Stilregeln: Gedankenstriche und Ausrufezeichen werden ersetzt */
function saeubern(v) {
  if (typeof v === "string") return v.replace(/\s*[\u2013\u2014]\s*/g, ", ").replace(/!/g, ".").replace(/,\s*,/g, ",");
  if (Array.isArray(v)) return v.map(saeubern);
  if (v && typeof v === "object") { const o = {}; Object.keys(v).forEach((k) => { o[k] = saeubern(v[k]); }); return o; }
  return v;
}
const KLISCHEES = [/traumimmobilie/i, /\b(ihr|dein) partner für/i, /mit leidenschaft/i, /kompetent(e|es|er)? und zuverlässig/i, /immobilienprofi/i, /maßgeschneidert/i, /rundum.?sorglos/i, /auf augenhöhe/i, /mehrwert/i, /ganzheitlich/i, /individuelle lösung/i, /zuhause ist unsere mission/i, /seriös/i, /experte an (ihrer|deiner) seite/i, /einzigartig/i];
function klischeesIn(p) {
  const out = [];
  const lauf = (v, pfad) => {
    if (typeof v === "string") { KLISCHEES.forEach((re) => { if (re.test(v)) out.push(pfad); }); return; }
    if (Array.isArray(v)) return v.forEach((x, i) => lauf(x, `${pfad}[${i}]`));
    if (v && typeof v === "object") Object.keys(v).forEach((k) => { if (k === "nicht" || k === "vermeiden") return; lauf(v[k], pfad ? `${pfad}.${k}` : k); });
  };
  lauf(p, "");
  return [...new Set(out)];
}
/* Korrektur an einem Pfad wie "saeulen[2].serie.beispiele[1].hook" setzen, nur wenn der alte Text passt */
function setzePfad(obj, pfad, alt, neu) {
  const teile = String(pfad).replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
  let o = obj;
  for (let i = 0; i < teile.length - 1; i++) { if (o == null) return false; o = o[teile[i]]; }
  const k = teile[teile.length - 1];
  if (!o || typeof o[k] !== "string") return false;
  if (alt && o[k].trim() !== String(alt).trim() && !o[k].includes(String(alt).trim())) return false;
  o[k] = alt && o[k].trim() !== String(alt).trim() ? o[k].replace(String(alt).trim(), neu) : neu;
  return true;
}

/* ---------- Ein Schritt der Kette ---------- */
async function schritt(client, Anthropic, name, dossierText, kontext, protokoll, opt) {
  const t0 = Date.now();
  const inhalt = [
    { type: "text", text: dossierText, cache_control: { type: "ephemeral" } },
    { type: "text", text: `${kontext ? kontext + "\n\n" : ""}${SCHRITT[name]}\n\nAntworte ausschließlich mit JSON nach dem Schema.` },
  ];
  const stream = client.messages.stream({
    model: MODELL,
    max_tokens: opt.maxTokens,
    system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
    output_config: { effort: opt.effort, format: { type: "json_schema", schema: SCHEMA[name] } },
    messages: [{ role: "user", content: inhalt }],
  });
  const msg = await stream.finalMessage();
  const u = msg.usage || {};
  protokoll.push({ schritt: name, ms: Date.now() - t0, input: u.input_tokens || 0, output: u.output_tokens || 0, cacheGelesen: u.cache_read_input_tokens || 0, stop: msg.stop_reason });
  if (msg.stop_reason === "refusal") { const e = new Error(`Schritt ${name}: abgelehnt${msg.stop_details && msg.stop_details.category ? " (" + msg.stop_details.category + ")" : ""}`); e.code = "refusal"; throw e; }
  if (msg.stop_reason === "max_tokens") { const e = new Error(`Schritt ${name}: Antwort abgeschnitten, max_tokens erhöhen`); e.code = "max_tokens"; throw e; }
  const text = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  try { return JSON.parse(text); } catch (e) { const f = new Error(`Schritt ${name}: kein gültiges JSON`); f.code = "json"; throw f; }
}

/* ---------- Handler ---------- */
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, fehler: "Nur POST" });
  if (!erlaubt(req)) { res.setHeader("WWW-Authenticate", 'Basic realm="UNIO", charset="UTF-8"'); return res.status(401).json({ ok: false, fehler: "Passwort fehlt oder falsch" }); }
  const warte = begrenzt(ipVon(req));
  if (warte) { res.setHeader("Retry-After", String(warte)); return res.status(429).json({ ok: false, fehler: `Höchstens ${LIMIT} Aufrufe pro Stunde`, fallback: "regeln" }); }
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ ok: false, fallback: "regeln", fehler: "ANTHROPIC_API_KEY fehlt" });

  let Anthropic;
  try { ({ default: Anthropic } = await import("@anthropic-ai/sdk")); } catch (e) { return res.status(503).json({ ok: false, fallback: "regeln", fehler: "Paket @anthropic-ai/sdk fehlt in package.json" }); }

  const b = req.body || {};
  if (!b.antworten || typeof b.antworten !== "object" || !Object.keys(b.antworten).length) return res.status(400).json({ ok: false, fallback: "regeln", fehler: "antworten fehlen" });
  const phase = ["gate1", "plattform", "voll"].includes(b.phase) ? b.phase : "voll";
  if (phase === "plattform" && !(b.freigabe && b.freigabe.einsicht && b.freigabe.territorium)) return res.status(400).json({ ok: false, fallback: "regeln", fehler: "freigabe mit einsicht und territorium fehlt" });

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 2 });
  const D = dossier(b);
  const protokoll = [];
  const kette = { modell: MODELL, phase, schritte: protokoll };
  const J = (x) => JSON.stringify(x, null, 1);

  try {
    let einsicht, territorien = null, auswahl = null, gewaehlt, schaerfung = "";
    if (phase === "plattform") {
      einsicht = b.freigabe.einsicht; gewaehlt = b.freigabe.territorium; schaerfung = b.freigabe.schaerfung || "";
    } else {
      const s1 = await schritt(client, Anthropic, "einsicht", D, "", protokoll, { effort: "medium", maxTokens: 16000 });
      einsicht = s1.einsicht;
      const s2 = await schritt(client, Anthropic, "territorien", D, `Einsicht aus Schritt 1:\n${J(s1)}`, protokoll, { effort: "high", maxTokens: 16000 });
      territorien = (s2.territorien || []).slice(0, 3);
      auswahl = await schritt(client, Anthropic, "kritik", D, `Einsicht:\n${J(einsicht)}\n\nTerritorien:\n${J(territorien)}`, protokoll, { effort: "medium", maxTokens: 16000 });
      gewaehlt = territorien[Math.max(0, Math.min(territorien.length - 1, auswahl.gewaehlt || 0))];
      schaerfung = auswahl.schaerfung || "";
      if (phase === "gate1") return res.status(200).json({ ok: true, gate1: saeubern({ einsicht, territorien, auswahl }), kette });
    }

    const basis = `Einsicht (freigegeben):\n${J(einsicht)}\n\nGewähltes Territorium:\n${J(gewaehlt)}\n\nSchärfung:\n${schaerfung}`;
    const s4 = await schritt(client, Anthropic, "plattform", D, basis, protokoll, { effort: "high", maxTokens: 32000 });
    const mitPlattform = `${basis}\n\nMarkenplattform aus Schritt 4:\n${J({ positionierung: s4.positionierung, versprechen: s4.versprechen, rolle: s4.rolle, botschaften: s4.botschaften, beweise: s4.beweise })}`;
    const [s5, s6] = await Promise.all([
      schritt(client, Anthropic, "stimme", D, mitPlattform, protokoll, { effort: "high", maxTokens: 24000 }),
      schritt(client, Anthropic, "serien", D, mitPlattform, protokoll, { effort: "high", maxTokens: 32000 }),
    ]);

    const welten = (b.welten && b.welten.length ? b.welten : [{ id: "ruhig" }]).map((x) => x.id);
    let plattform = {
      version: 1, quelle: "claude", erstellt: new Date().toISOString(),
      einsicht, ...s4, stimme: s5.stimme, saeulen: s6.saeulen, konzepte: s6.konzepte, start30: s6.start30, visuell: s6.visuell,
      qualitaet: { gesamt: 0, kriterien: [], klischees: [], aehnlichkeit: 0 },
    };
    if (!welten.includes(plattform.visuell && plattform.visuell.welt)) plattform.visuell = { ...(plattform.visuell || {}), welt: welten[0] };

    const pr = await schritt(client, Anthropic, "pruefung", D, `Plattform zur Prüfung:\n${J(plattform)}`, protokoll, { effort: "medium", maxTokens: 24000 });
    let angewendet = 0;
    (pr.korrekturen || []).forEach((k) => { if (k.pfad && typeof k.neu === "string" && setzePfad(plattform, k.pfad, k.alt, k.neu)) angewendet++; });
    plattform = saeubern(plattform);
    const kl = klischeesIn(plattform);
    const bw = pr.bewertung || {};
    const krit = [["Spezifität", bw.spezifitaet], ["Unterscheidbarkeit", bw.unterscheidbarkeit], ["Glaubwürdigkeit", bw.glaubwuerdigkeit], ["Konsistenz", bw.konsistenz], ["Umsetzbarkeit", bw.umsetzbarkeit]];
    const gew = [25, 20, 25, 15, 15];
    plattform.qualitaet = {
      gesamt: Math.round(krit.reduce((n, [, v], i) => n + (Number(v) || 0) * gew[i], 0) / 100),
      kriterien: krit.map(([name, v]) => ({ name, wert: Number(v) || 0, hinweis: "Einschätzung der Schlussprüfung. Die Regelprüfung im Browser rechnet nach." })),
      klischees: kl, aehnlichkeit: 0,
    };
    return res.status(200).json({ ok: true, plattform, pruefung: { korrekturen: (pr.korrekturen || []).length, angewendet, hinweise: [...(pr.hinweise || []), ...(kl.length ? [`Klischee gefunden in: ${kl.join(", ")}`] : [])] }, kette: { ...kette, territorien, auswahl } });
  } catch (err) {
    const status = err instanceof Anthropic.AuthenticationError ? 503 : err instanceof Anthropic.RateLimitError ? 429 : 502;
    console.error("WB_MARKE_FEHLER", err && (err.code || err.status), err && err.message);
    return res.status(status).json({ ok: false, fallback: "regeln", fehler: err && err.code ? err.message : status === 503 ? "Schlüssel ungültig" : status === 429 ? "Anthropic-Limit erreicht" : "Kette fehlgeschlagen", kette });
  }
}
