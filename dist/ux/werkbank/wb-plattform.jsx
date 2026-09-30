/* Werkbank. Markenplattform: regelbasierter Generator, Qualitätsprüfung, Versionen, Claude-Anbindung.
   Datenvertrag: docs/werkbank/MARKE_SCHEMA.md (Objekt plattform). Standard und Claude-Kette: docs/werkbank/MARKENQUALITAET.md.
   Grundsatz: Die eigenen Worte des Maklers werden zitiert und verdichtet. Dazu Satzbausteine je Figur,
   Anlass (Category Entry Point), Wohnwelt und Säule. Fehlt ein Freitext, steht dort eine ehrliche Lücke
   ("Kommt aus dem Workshop"), nie eine Erfindung.
   Speicher: hmStore "plattformen" = { [maklerId]: { aktuell: plattform, versionen: [plattform, ...] } }, neueste zuerst, höchstens 12.
   Diese Datei enthält kein JSX: die reinen Funktionen laufen auch ohne Browser (Test mit JavaScriptCore). */

const HM_PF_LUECKE = "Kommt aus dem Workshop";
const HM_PF_WELT_IDS = ["ruhig", "editorial", "graetzl", "klar", "warm", "kontrast"];

/* ---------- 1. Kleine Helfer ---------- */
function hmPfS(v) { return v == null ? "" : String(v).replace(/\s+/g, " ").trim(); }
function hmPfOrt(b) { return hmPfS(b).replace(/^\d{4}\s+/, ""); }
function hmPfListe(l) { const x = (l || []).filter(Boolean); return x.length <= 1 ? (x[0] || "") : x.slice(0, -1).join(", ") + " und " + x[x.length - 1]; }
function hmPfGross(s) { s = hmPfS(s); return s ? s[0].toUpperCase() + s.slice(1) : s; }
function hmPfKlein(s) { s = hmPfS(s); return s ? s[0].toLowerCase() + s.slice(1) : s; }
function hmPfPunkt(s) { s = hmPfS(s); return !s ? s : /[.?:“"]$/.test(s) ? s : s + "."; }
function hmPfOhnePunkt(s) { return hmPfS(s).replace(/[.]+$/, ""); }
function hmPfWoerter(s) { return hmPfS(s).split(" ").filter(Boolean).length; }
function hmPfLuecke(was) { return `${HM_PF_LUECKE}: ${was}`; }
function hmPfIstLuecke(s) { return hmPfS(s).startsWith(HM_PF_LUECKE) || /\[Kommt aus dem Workshop/.test(hmPfS(s)); }
const HM_PF_ZAHLWORT = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn", "zwanzig"];
const HM_PF_TAGE = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
const HM_PF_TAG_ADV = { Montag: "montags", Dienstag: "dienstags", Mittwoch: "mittwochs", Donnerstag: "donnerstags", Freitag: "freitags", Samstag: "samstags", Sonntag: "sonntags" };
const HM_PF_KANALNAME = { instagram: "Instagram", linkedin: "LinkedIn", tiktok: "TikTok", facebook: "Facebook", youtube: "YouTube Shorts" };

/* Sätze trennen, ohne an Abkürzungen wie "Mio." oder "z. B." zu zerbrechen */
const HM_PF_ABK = /\b(Mio|Mrd|ca|bzw|Nr|inkl|exkl|Str|Tsd|Dr|Mag|Ing|z|B|u|a|vgl|etc)\.$/;
function hmPfSaetze(t) {
  const s = hmPfS(t); if (!s) return [];
  const w = s.split(" "); const out = []; let buf = "";
  for (let i = 0; i < w.length; i++) {
    buf += (buf ? " " : "") + w[i];
    const next = w[i + 1];
    if (/[.?]$/.test(w[i]) && next && /^[A-ZÄÖÜ„"\d]/.test(next) && !HM_PF_ABK.test(w[i]) && !/^\d+\.$/.test(w[i])) { out.push(buf); buf = ""; }
  }
  if (buf) out.push(buf);
  return out.map(hmPfPunkt);
}
function hmPfTeile(satz) { return hmPfOhnePunkt(satz).split(/,\s+/).map(hmPfS).filter(Boolean); }
function hmPfStrassen(t) {
  const re = /(?:[A-ZÄÖÜ][a-zäöüß]+er (?:Straße|Gasse|Platz|Weg|Allee|Markt|Ring|Kai|Zeile|Lände|Hauptstraße))|(?:[A-ZÄÖÜ][A-Za-zÄÖÜäöüß-]*(?:straße|gasse|platz|weg|allee|markt|kai|zeile|lände|park))/g;
  return [...new Set(hmPfS(t).match(re) || [])];
}
/* Präposition passend zum Ort: am Reumannplatz, in der Quellenstraße, in Sievering */
function hmPfIn(o) { o = hmPfS(o); if (!o) return ""; if (/(platz|markt|enring|rnring| ring|kai|lände|park)$/i.test(o)) return `am ${o}`; if (/(straße|gasse|weg|allee|zeile|steig)$/i.test(o)) return `in der ${o}`; return `in ${o}`; }
function hmPfAn(o) { o = hmPfS(o); if (/(platz|markt|enring|rnring| ring|kai|lände|park)$/i.test(o)) return `am ${o}`; if (/(straße|gasse|weg|allee|zeile|steig)$/i.test(o)) return `an der ${o}`; return `in ${o}`; }
function hmPfAus(o) { o = hmPfS(o); if (/(platz|markt|enring|rnring| ring|kai|lände|park)$/i.test(o)) return `rund um den ${o}`; if (/(straße|gasse|weg|allee|zeile|steig)$/i.test(o)) return `aus der ${o}`; return `aus ${o}`; }
function hmPfKern(a) {
  const g = hmPfS(a.graetzl).split(",")[0].replace(/^(rund ums|rund um|um|zwischen|am|im|beim|bei)\s+((den|die|das|dem|der)\s+)?/i, "").trim();
  return g || hmPfOrt((a.bezirke || [])[0]) || hmPfS(a.bezirke_frei).split(",")[0] || "";
}
/* Ein Satz ohne finites Verb bekommt ein "Ich habe" (z. B. "Einer Erbengemeinschaft geraten, ...") */
function hmPfIch(satz) {
  const s = hmPfS(satz); if (!s) return s;
  if (/^(Ich|Wir|Mein|Meine|Meinem|Meinen|Meiner|Einmal|Letztes|Vor|Als|Nach|Seit|Damals|Heute|Sie|Er|Es|Die|Der|Das)\b/.test(s)) return s;
  const finit = /\b(bin|bist|ist|sind|war|waren|hat|habe|hatte|hatten|haben|wurde|wurden|wollte|kam|kamen|ging|gab|lebte|wohnte|arbeitete|sagte|riet)\b/;
  if (!finit.test(s) && /\bge\w+(t|en)\b/.test(s)) return "Ich habe " + hmPfKlein(s);
  return s;
}
/* Herkunft in Ich-Form: "Döbling, Elternhaus in Grinzing, mein Großvater ..." wird zu
   "Ich bin in Döbling aufgewachsen, Elternhaus in Grinzing. Mein Großvater ..." */
function hmPfHerkunft(t) {
  const saetze = hmPfSaetze(t); if (!saetze.length) return { text: "", ort: "", immo: "" };
  const finit = /\b(bin|ist|war|hat|habe|hatte|haben|wurde|lebte|wohnte|arbeitete|wuchs)\b/;
  let ort = "";
  const erster = saetze[0];
  const teile = hmPfTeile(erster);
  let neu = [];
  if (teile.length && !finit.test(teile[0]) && /^[A-ZÄÖÜ]/.test(teile[0]) && hmPfWoerter(teile[0]) <= 4) {
    ort = teile[0];
    let satz = `Ich bin in ${ort} aufgewachsen`;
    const rest = [];
    teile.slice(1).forEach((x) => { if (/^(mein|meine|meinem|meinen)\b/i.test(x)) rest.push(hmPfPunkt(hmPfGross(x))); else satz += ", " + x; });
    neu = [hmPfPunkt(satz), ...rest];
  } else {
    neu = [erster];
    const m = erster.match(/\bin ([A-ZÄÖÜ][\wäöüß-]+(?: [A-ZÄÖÜ][\wäöüß-]+)?)/); if (m) ort = m[1];
  }
  const alle = [...neu, ...saetze.slice(1)];
  const immo = alle.find((x) => /Immobil|Haus|Häuser|Wohnung|verwalt|Makler|saniert|Genossenschaft|Grundbuch|Bau/.test(x)) || "";
  return { text: alle.join(" "), ort, immo };
}
function hmPfWeiblich(m) {
  if (m && (m.geschlecht === "w" || m.geschlecht === "m")) return m.geschlecht === "w";
  const vor = hmPfS(m && m.name).split(" ")[0];
  return /^(Elif|Sara|Mira|Katharina|Lara|Anna|Julia|Lena|Sophie|Marie|Nina|Eva|Karin|Evgenia|Andrea|Elisabeth|Ines|Iris|Ruth|Doris|Birgit|Petra|Sabine|Claudia|Esra|Aylin|Selin|Merve|Leyla)$/.test(vor) || (/a$/.test(vor) && !/^(Luca|Nikita|Joshua|Andrea)$/.test(vor));
}

/* ---------- 2. Wortschatz: Objekte, Anlässe, Hindernisse, Werte, Wörter ---------- */
const HM_PF_OBJ = {
  "Eigentumswohnung Altbau": ["Altbauwohnung", "Altbauwohnungen", "f"], "Eigentumswohnung Neubau": ["Neubauwohnung", "Neubauwohnungen", "f"],
  "Erstbezug vom Bauträger": ["Erstbezugswohnung", "Erstbezugswohnungen", "f"], "Dachgeschoss und Penthouse": ["Dachgeschosswohnung", "Dachgeschosswohnungen", "f"],
  "Loft": ["Loft", "Lofts", "n"], "Einfamilienhaus": ["Einfamilienhaus", "Einfamilienhäuser", "n"], "Doppelhaus und Reihenhaus": ["Reihenhaus", "Reihenhäuser", "n"],
  "Villa": ["Villa", "Villen", "f"], "Landhaus und Bauernhof": ["Landhaus", "Landhäuser", "n"], "Ferienimmobilie und Zweitwohnsitz": ["Ferienwohnung", "Ferienwohnungen", "f"],
  "Baugrundstück": ["Grundstück", "Grundstücke", "n"], "Mietwohnung": ["Mietwohnung", "Mietwohnungen", "f"], "Möbliert und Temporär": ["möblierte Wohnung", "möblierte Wohnungen", "f"],
  "Studentenwohnen": ["Studentenwohnung", "Studentenwohnungen", "f"], "Mikroapartments": ["Mikroapartment", "Mikroapartments", "n"],
  "Zinshaus": ["Zinshaus", "Zinshäuser", "n"], "Anlegerwohnung": ["Anlegerwohnung", "Anlegerwohnungen", "f"], "Vorsorgewohnung": ["Vorsorgewohnung", "Vorsorgewohnungen", "f"],
  "Bauträgerprojekt und Abverkauf": ["Projektwohnung", "Projektwohnungen", "f"], "Paketverkauf und Portfolio": ["Portfolio", "Portfolios", "n"],
  "Denkmalschutz und Sanierung": ["Sanierungsobjekt", "Sanierungsobjekte", "n"], "Büro": ["Büro", "Büros", "n"], "Geschäftslokal und Retail": ["Geschäftslokal", "Geschäftslokale", "n"],
  "Gastronomie und Hotel": ["Gastronomieobjekt", "Gastronomieobjekte", "n"], "Lager und Logistik": ["Lagerfläche", "Lagerflächen", "f"], "Praxis und Ordination": ["Ordination", "Ordinationen", "f"],
  "Betriebsobjekt": ["Betriebsobjekt", "Betriebsobjekte", "n"], "Luxus und Off-Market": ["Off-Market-Objekt", "Off-Market-Objekte", "n"],
  "Erbschaft und Nachlass": ["geerbte Immobilie", "geerbte Immobilien", "f"], "Scheidung und Trennung": ["Immobilie nach Trennung", "Immobilien nach Trennung", "f"],
  "Zwangsversteigerung": ["Versteigerungsobjekt", "Versteigerungsobjekte", "n"], "Landwirtschaft und Forst": ["Landwirtschaftsfläche", "Landwirtschaftsflächen", "f"],
  "Neues Wohnen (Co-Living, Baugruppe)": ["Baugruppenwohnung", "Baugruppenwohnungen", "f"],
};
const HM_PF_ART = {
  ein: { n: "ein", f: "eine", m: "ein" }, einen: { n: "ein", f: "eine", m: "einen" }, der: { n: "das", f: "die", m: "der" },
  dein: { n: "dein", f: "deine", m: "dein" }, Ihr: { n: "Ihr", f: "Ihre", m: "Ihr" }, derselbe: { n: "dasselbe", f: "dieselbe", m: "derselbe" },
};
function hmPfObjekt(typ) { const o = HM_PF_OBJ[typ] || [typ, typ, "n"]; return { typ: o[0], plural: o[1], g: o[2], quelle: typ }; }
function hmPfObjGruppe(obj) {
  const t = obj.map((o) => o.quelle).join(" ");
  if (/Zinshaus|Anleger|Vorsorge|Portfolio|Denkmal/.test(t)) return "invest";
  if (/Erstbezug|Neubau|Bauträger/.test(t)) return "neubau";
  if (/Einfamilien|Reihenhaus|Villa|Landhaus|Grundstück/.test(t)) return "haus";
  if (/Büro|Geschäft|Gastronomie|Lager|Praxis|Betrieb/.test(t)) return "gewerbe";
  return "wohnung";
}

/* Anlässe, mit denen Kunden kommen, bevor sie an Verkauf denken (Category Entry Points, Romaniuk) */
const HM_PF_CEP = {
  "Erbe": { wer: "Erben", frage: "Verkaufen, vermieten oder behalten?", spannung: "Wer erbt, entscheidet selten allein und selten ohne Zeitdruck. Der Markt belohnt Geduld, am Familientisch zählt schnelle Klarheit.", rechnung: "Mietertrag nach Rücklage gegen Verkaufserlös nach Steuer", titel: (o) => `Geerbt in ${o}: verkaufen oder behalten`, hook: (o) => `Geerbt in ${o}? Diese Rechnung gehört vor jeden Verkauf.`, cta: ["Schicken Sie das an Ihre Miterben.", "Schick das an deine Miterben."], partner: "einem Notariat und einer Steuerberatung", abend: "Erben ohne Streit" },
  "Investment": { wer: "Anleger", frage: "Was bleibt nach Rücklage, Leerstand und Steuer?", spannung: "Anleger rechnen in Rendite und entscheiden am Ende oft nach Gefühl.", rechnung: "Bruttorendite gegen das, was nach Leerstand, Rücklage und Steuer bleibt", titel: (o) => `Was eine Anlage in ${o} wirklich abwirft`, hook: (o) => `Rendite in ${o}: was nach Steuer wirklich bleibt.`, cta: ["Schicken Sie das an jemanden, der gerade eine Anlage rechnet.", "Schick das an jemanden, der gerade eine Anlage rechnet."], partner: "einer Hausverwaltung und einer Steuerberatung", abend: "Anlegen ohne Bauchgefühl" },
  "Trennung": { wer: "Paare in Trennung", frage: "Wer bleibt, wer geht, und was ist die Wohnung wert?", spannung: "Zwei Menschen müssen gemeinsam verkaufen, während sie sich trennen.", rechnung: "Auszahlen gegen gemeinsam verkaufen", titel: (o) => `Trennung und Wohnung in ${o}: drei Wege`, hook: () => "Getrennt, aber gemeinsam im Grundbuch. Drei Wege.", cta: ["Speichern Sie sich das für das nächste Gespräch.", "Speicher dir das für das nächste Gespräch."], partner: "einer Mediation und einer Kanzlei für Familienrecht", abend: "Trennen ohne Verlust" },
  "Familie wächst": { wer: "junge Familien", frage: "Wie viel mehr Platz ist leistbar?", spannung: "Die Wohnung wird zu klein, bevor die Finanzierung steht.", rechnung: "Monatsrate heute gegen Monatsrate für ein Zimmer mehr", titel: (o) => `Ein Zimmer mehr in ${o}: was es kostet`, hook: (o) => `Ein Zimmer mehr in ${o}. Was das im Monat kostet.`, cta: ["Schicken Sie das an jemanden, dem die Wohnung gerade zu klein wird.", "Schick das an jemanden, dem die Wohnung gerade zu klein wird."], partner: "einer Finanzierungsberatung", abend: "Die erste größere Wohnung" },
  "Kinder ziehen aus": { wer: "Eltern mit ausgezogenen Kindern", frage: "Behalten oder verkleinern?", spannung: "Das Haus ist zu groß geworden und hängt voller Erinnerungen.", rechnung: "Erhaltungskosten des Hauses gegen eine kleinere Wohnung im selben Bezirk", titel: (o) => `Zu groß geworden: das Haus in ${o}`, hook: () => "Das Haus ist zu groß geworden. Und jetzt?", cta: ["Speichern Sie sich das für später.", "Speicher dir das für später."], partner: "einer Steuerberatung", abend: "Weniger Fläche, gleiches Grätzl" },
  "Umzug aus beruflichen Gründen": { wer: "Zuzügler mit neuem Job", frage: "Was geht sich bis zum ersten Arbeitstag aus?", spannung: "Der neue Job beginnt an einem fixen Datum. Der Wohnungsmarkt kennt keine Fristen.", rechnung: "Kaufen gegen Mieten für die ersten zwei Jahre", titel: (o) => `Neu in ${o}: kaufen oder erst mieten`, hook: (o) => `Neuer Job, fixes Datum, ${o}. So geht es sich aus.`, cta: ["Schicken Sie das an jemanden, der gerade nach Wien zieht.", "Schick das an jemanden, der gerade nach Wien zieht."], partner: "einem Relocation-Service", abend: "Ankommen in Wien" },
  "Verkleinern im Alter": { wer: "Eigentümer vor dem Verkleinern", frage: "Wohin, wenn das Haus zu viel wird?", spannung: "Weniger Fläche soll nicht weniger Leben heißen.", rechnung: "Verkaufserlös gegen eine barrierearme Wohnung im selben Grätzl", titel: (o) => `Kleiner wohnen in ${o}`, hook: (o) => `Kleiner wohnen, ohne ${o} zu verlassen.`, cta: ["Schicken Sie das an Ihre Eltern.", "Schick das an deine Eltern."], partner: "einem Notariat und einer Seniorenberatung", abend: "Kleiner wohnen im eigenen Grätzl" },
};
const HM_PF_CEP_STANDARD = { wer: "Eigentümer", frage: "Was ist meine Immobilie heute wert?", spannung: "Eigentümer wissen selten, was ihre Immobilie heute wert ist, und fragen ungern, weil jede Frage nach Auftrag klingt.", rechnung: "Wunschpreis gegen das, was vergleichbare Objekte zuletzt erzielt haben", titel: (o) => `Was eine Wohnung in ${o} heute wert ist`, hook: (o) => `Was eine Wohnung in ${o} heute wert ist.`, cta: ["Speichern Sie sich das für später.", "Speicher dir das für später."], partner: "einer Hausverwaltung", abend: "Was ist mein Zuhause wert" };

const HM_PF_HINDERNIS = {
  "Provision": { serie: "Die Provision, ehrlich", satz: "Und bevor das erste Gespräch beginnt, steht die Provision im Raum.", t1: "Was die Provision kostet, und was drinsteckt", h1: () => "Was die Provision kostet, in einem Satz.", s1: "Satz und Bemessung als große Zahl im ersten Bild [prüfen: eigene Konditionen eintragen]. Danach drei Leistungen, die in diesem Betrag stecken, jeweils mit dem Aufwand in Stunden." },
  "Bindungsdauer": { serie: "Der Auftrag, Satz für Satz", satz: "Und die Laufzeit eines Vermittlungsauftrags klingt nach Falle.", t1: "Warum ein Vermittlungsauftrag eine Laufzeit hat", h1: () => "Warum der Auftrag eine Laufzeit hat.", s1: "Laufzeit, Kündigung, was in dieser Zeit passiert. Drei Kacheln, je ein Vertragssatz in Alltagssprache." },
  "Zweifel am Preis": { serie: "Drei Vergleichspreise", satz: "Und jeder Preis klingt nach Bauchgefühl, solange niemand zeigt, woher er kommt.", t1: "Wie ein Preis entsteht: drei Vergleichspreise", h1: () => "Drei Vergleichspreise, bevor ich einen Preis nenne.", s1: "Drei echte Vergleichsobjekte, anonymisiert, mit Fläche und Preis je m². Dann die Spanne, dann der Preis, dann was ihn nach oben oder unten bewegt." },
  "Schlechte Erfahrung mit Maklern": { serie: "Was ich nicht mache", satz: "Und viele haben schon einmal einen Makler erlebt, der nach dem Auftrag nicht mehr anrief.", t1: "Was nach dem Auftrag passiert, Woche für Woche", h1: () => "Was nach der Unterschrift passiert, Woche für Woche.", s1: "Ein echter Ablauf als Zeitachse: Termine, Rückmeldungen, Unterlagen. Jede Woche ein Satz, was passiert ist." },
  "Wollten selbst verkaufen": { serie: "Selbst verkaufen, ehrlich gerechnet", satz: "Und viele wollen zuerst selbst verkaufen, um die Provision zu sparen.", t1: "Privat verkaufen: was es wirklich kostet", h1: () => "Selbst verkaufen spart die Provision. Und kostet das hier.", s1: "Zeitaufwand, Besichtigungen, Unterlagen, Haftung. Ehrlich gerechnet, auch dort, wo sich der Privatverkauf auszahlt." },
  "Anderer Makler war schon im Gespräch": { serie: "Die zweite Meinung", satz: "Und oft war schon ein anderer Makler da, mit einem Preis, der gut klang.", t1: "Wann sich eine zweite Meinung lohnt", h1: (sie) => sie ? "Sie haben schon einen Makler? Prüfen Sie diese drei Punkte." : "Du hast schon einen Makler? Prüf diese drei Punkte.", s1: "Drei Prüfpunkte: Vergleichswerte, Vermarktungsplan, Rückmeldung pro Woche. Kein Wort über andere Makler." },
};
const HM_PF_GRUND = {
  "Empfehlung von Bekannten": ["Warum die meisten über Empfehlung kommen", "Was nach einer Empfehlung als Erstes passiert."],
  "Persönlicher Eindruck beim Erstgespräch": ["Was ich im Erstgespräch frage", "Fünf Fragen, die ich jedem Eigentümer stelle."],
  "Preis-Einschätzung war realistisch": ["So entsteht eine Preiseinschätzung", "Wie ich einen Preis einschätze, in drei Schritten."],
  "Kennt den Bezirk": ["Was der Bezirk mit dem Preis macht", "Zwei Straßen, zwei Preise. Warum."],
  "Schnelle Rückmeldung": ["Was nach dem ersten Anruf passiert", "Was in den ersten 48 Stunden nach dem Anruf passiert."],
  "Klare Erklärung des Ablaufs": ["Der Ablauf in sechs Schritten", "Vom ersten Termin bis zum Notar, in sechs Schritten."],
  "Diskretion": ["Verkaufen ohne Inserat", "Wie ein Verkauf ohne Inserat abläuft."],
  "Netzwerk an Käufern": ["Verkauft vor dem Inserat: wie das geht", "Warum manche Objekte nie online stehen."],
  "Professionelle Fotos und Exposé": ["Ein Exposé entsteht", "Was in einem Exposé steht, das verkauft."],
  "Sympathie": ["Das erste Gespräch, ungeschnitten", "So klingt das erste Gespräch bei mir."],
};
const HM_PF_WERTE = {
  "Sicherheit": { verhalten: (c) => `Jede Preisaussage kommt mit Vergleichswerten aus ${c.o0}.`, nie: "Nie ein Preis, nur weil der Eigentümer ihn hören will." },
  "Verlässlichkeit": { verhalten: () => "Jede Zusage hat ein Datum, jede Woche gibt es eine Rückmeldung, auch ohne Neuigkeit.", nie: "Nie eine Zusage ohne Datum." },
  "Tradition": { verhalten: () => "Die Geschichte des Hauses kommt vor der Bewertung: Baujahr, Umbauten, wer dort gewohnt hat.", nie: "Nie ein Altbau als bloße Quadratmeterzahl." },
  "Selbstbestimmung": { verhalten: () => "Optionen mit ihren Folgen liegen auf dem Tisch, die Entscheidung bleibt beim Kunden.", nie: "Nie Druck mit Fristen, die es nicht gibt." },
  "Leistung": { verhalten: () => "Gemessen wird, was zählt: Tage bis zum Anbot, Abstand zur Erstschätzung.", nie: "Nie ein Ergebnis schöner reden, als es war." },
  "Genuss": { verhalten: (c) => `Gezeigt wird, wie sich ein Ort anfühlt: Licht am Nachmittag, der Weg zum Markt ${c.inK}.`, nie: "Nie ein Exposé ohne das Leben rundherum." },
  "Abenteuer": { verhalten: (c) => `Neue Ecken ${c.inK} werden besucht, bevor sie in den Portalen auftauchen.`, nie: "Nie ein Grätzl nur vom Schreibtisch aus beurteilen." },
  "Hilfsbereitschaft": { verhalten: () => "Finanzierung und Ablauf werden erklärt, auch wenn daraus kein Auftrag wird.", nie: (c) => c.kundensatz ? "Nie jemandem das Gefühl geben, zu wenig zu wissen." : "Nie eine Frage abtun, auch nicht beim dritten Mal." },
  "Gerechtigkeit": { verhalten: () => "Alle Bieter bekommen dieselbe Information zur selben Zeit.", nie: "Nie ein Angebot, das an anderen vorbeigeht." },
  "Einfluss": { verhalten: () => "Eigentümer, Notar und Hausverwaltung sitzen an einem Tisch, bevor es kompliziert wird.", nie: "Nie Netzwerk als Ausrede für fehlende Transparenz." },
};
const HM_PF_GRUNDWERT = {
  "Diskretion": { name: "Diskretion", verhalten: "Auf Wunsch ohne Inserat: Käufer sehen das Objekt erst nach Prüfung.", nie: "Nie ein Objekt oder einen Namen ohne Einverständnis öffentlich." },
  "Preis-Einschätzung war realistisch": { name: "Realismus", verhalten: "Der erste Preis ist der, den der Markt zahlt, nicht der, der den Auftrag bringt.", nie: "Nie ein Lockpreis für die Unterschrift." },
  "Kennt den Bezirk": { name: "Ortskenntnis", verhalten: "Bewertet wird Straße für Straße, nicht nach Postleitzahl.", nie: "Nie ein Preis aus dem Bezirksdurchschnitt." },
  "Schnelle Rückmeldung": { name: "Tempo", verhalten: "Antwort am selben Werktag, auch wenn es nur ein Zwischenstand ist.", nie: "Nie eine Anfrage über das Wochenende liegen lassen." },
  "Klare Erklärung des Ablaufs": { name: "Klarheit", verhalten: "Jeder Schritt wird angekündigt, bevor er passiert.", nie: "Nie ein Fachwort ohne Erklärung." },
  "Sympathie": { name: "Nähe", verhalten: "Termine dort, wo der Kunde zu Hause ist, auch am Küchentisch.", nie: "Nie ein Gespräch nach Skript." },
  "Empfehlung von Bekannten": { name: "Weiterempfehlbarkeit", verhalten: "Jeder Abschluss soll eine Empfehlung wert sein, auch der schwierige.", nie: "Nie ein Kunde, der sich nach dem Notar allein gelassen fühlt." },
  "Netzwerk an Käufern": { name: "Netzwerk", verhalten: "Vorgemerkte Käufer werden vor dem Inserat gefragt.", nie: "Nie Käufer, die nur auf dem Papier existieren." },
  "Persönlicher Eindruck beim Erstgespräch": { name: "Aufmerksamkeit", verhalten: "Das Erstgespräch gehört dem Kunden, das Objekt kommt danach.", nie: "Nie ein Erstgespräch mit Blick auf die Uhr." },
  "Professionelle Fotos und Exposé": { name: "Sorgfalt", verhalten: "Fotos und Exposé entstehen, als ginge es um das eigene Haus.", nie: "Nie ein Handyfoto im Inserat." },
};
const HM_PF_WORT = {
  genau: ["Zahlen stimmen auf die Kommastelle, jede Quelle wird genannt.", "Pedantisch oder belehrend."],
  ruhig: ["Kein Druck im Ton, Pausen dürfen stehen, der Satz endet mit Punkt.", "Langsam oder unentschlossen."],
  verlässlich: ["Was zugesagt ist, passiert zum genannten Termin.", "Starr oder ohne Spielraum."],
  zuverlässig: ["Was zugesagt ist, passiert zum genannten Termin.", "Starr oder ohne Spielraum."],
  herzlich: ["Menschen vor Objekten, Namen statt Aktenzeichen.", "Anbiedernd oder distanzlos."],
  schnell: ["Antwort am selben Tag, Entscheidungen ohne Umweg.", "Hektisch oder oberflächlich."],
  ehrlich: ["Sagt Nein, wenn ein Preis nicht passt, und sagt warum.", "Schroff oder verletzend."],
  direkt: ["Kommt im ersten Satz zur Sache.", "Grob oder ungeduldig."],
  geduldig: ["Erklärt zweimal, ohne dass es jemand merkt.", "Passiv oder abwartend."],
  neugierig: ["Fragt nach, bevor bewertet wird.", "Aufdringlich oder indiskret."],
  klar: ["Ein Gedanke pro Satz, eine Botschaft pro Beitrag.", "Kühl oder knapp angebunden."],
  sachlich: ["Fakten zuerst, Meinung als Meinung gekennzeichnet.", "Trocken oder unnahbar."],
  diskret: ["Namen, Adressen und Preise nur mit Freigabe.", "Verschlossen oder geheimnisvoll."],
  humorvoll: ["Ein trockener Satz darf sein, nie auf Kosten der Kunden.", "Albern oder ironisch über Kunden."],
  freundlich: ["Grüßt mit Namen, bedankt sich für Fragen.", "Unverbindlich oder beliebig."],
  kompetent: ["Jede Aussage lässt sich belegen.", "Überheblich oder belehrend."],
  hilfsbereit: ["Hilft auch, wenn kein Auftrag daraus wird.", "Aufopfernd oder ohne Grenzen."],
  engagiert: ["Bleibt dran, bis die letzte Unterlage da ist.", "Übereifrig oder drängend."],
  entspannt: ["Kein Termin wirkt gehetzt.", "Nachlässig."],
  offen: ["Sagt, was er weiß und was nicht.", "Beliebig oder ohne Haltung."],
  warm: ["Spricht Menschen an, nicht Zielgruppen.", "Süßlich."],
  nahbar: ["Zeigt Alltag und Grätzl, nicht nur Objekte.", "Privat oder distanzlos."],
  energisch: ["Tempo im Schnitt, klare Verben.", "Laut oder hektisch."],
  meinungsstark: ["Bezieht Stellung und begründet sie.", "Rechthaberisch."],
  zurückhaltend: ["Lässt Ergebnisse und Kunden sprechen.", "Unsichtbar."],
};

/* ---------- 3. Figur: Satzbausteine je Archetyp ---------- */
const HM_PF_FIGUR = {
  kenner: {
    rolle: (c) => c.fem ? "Die, die den Markt lesbar macht" : "Der, der den Markt lesbar macht",
    rolleSatz: (c) => `Erklärt ${c.objText} in ${c.ortText} so, dass ${c.cepWer} vor dem Verkauf entscheiden können. Mit Zahlen, die man nachprüfen kann.`,
    was: (c) => c.warten ? "den richtigen Zeitpunkt vor den schnellen Abschluss stellt" : "den Markt erklärt, bevor verkauft wird",
    andersAls: (c) => c.warten ? "Vermittler, die vom Abschluss leben und darum immer zum Verkauf raten" : "Makler, die mit Versprechen statt mit Zahlen arbeiten",
    haltung: (c) => c.warten ? "Ein Haus verkauft man einmal. Die Entscheidung davor verdient mehr Zeit als das Inserat." : "Wer den Markt versteht, entscheidet ruhiger. Darum kommt die Erklärung vor dem Verkauf.",
    versprechen: (c) => c.an("website", `Sie wissen, was ${HM_PF_ART.Ihr[c.obj0.g]} ${c.obj0.typ} wert ist und ob sich der Verkauf jetzt lohnt, bevor Sie unterschreiben.`, `Du weißt, was ${HM_PF_ART.dein[c.obj0.g]} ${c.obj0.typ} wert ist und ob sich der Verkauf jetzt lohnt, bevor du unterschreibst.`),
    claims: (c) => [c.warten && "Rat vor Auftrag.", c.kern && `${c.kern} in Zahlen.`, "Der Markt wird lesbar.", "Erst verstehen. Dann verkaufen."],
    signatur: (c) => /Grundbuch/i.test(c.cue.text) && c.cue.tag ? `Der Grundbuch-${c.cue.tag}` : "Die Zahl der Woche",
    signaturIdee: (c) => /Grundbuch/i.test(c.cue.text) ? `Jeden ${c.cue.tag} nach dem ${c.cue.anker || "Grundbuch-Termin"}: eine Eintragung aus ${c.kern || c.o0}, anonymisiert, und was sie über den Markt sagt. 60 Sekunden, immer im selben Bildausschnitt, Schlusssatz „${c.claim}“` : `Jede Woche eine Zahl aus ${c.kern || c.o0} und was sie für ${c.cepWer} bedeutet. Immer am selben Tag, im selben Bildausschnitt, mit dem Schlusssatz „${c.claim}“`,
    vermeiden: ["Schnäppchen", "Hammerpreis", "jetzt zuschlagen", "garantiert"],
  },
  fels: {
    rolle: (c) => c.fem ? "Die Ruhe bis zum Notar" : "Der Ruhepunkt bis zum Notar",
    rolleSatz: (c) => `Führt ${c.cepWer} in ${c.ortText} ohne Umweg zur Entscheidung und bleibt bis zum Notar dabei.`,
    was: (c) => c.warten ? "Klartext spricht, auch wenn der Klartext lautet: noch nicht verkaufen" : "Klartext spricht und den Verkauf bis zum Notar führt",
    andersAls: () => "Makler, die Eigentümern den Preis sagen, den sie hören wollen",
    haltung: () => "Ein klares Nein am Anfang erspart drei schlechte Wochen am Ende.",
    versprechen: (c) => c.an("website", "Sie wissen in jeder Phase, wo der Verkauf steht, und niemand drängt Sie.", "Du weißt in jeder Phase, wo der Verkauf steht, und niemand drängt dich."),
    claims: (c) => [c.warten && "Erst entscheiden. Dann verkaufen.", "Sicher bis zum Notar.", c.kern && `Klartext für ${c.kern}.`],
    signatur: () => "Klartext in 60 Sekunden",
    signaturIdee: (c) => `Eine Frage aus einem echten Gespräch, eine klare Antwort in 60 Sekunden, ohne Weichmacher. Immer am selben Tag, Schlusssatz „${c.claim}“`,
    vermeiden: ["vielleicht", "eventuell", "grundsätzlich", "garantiert"],
  },
  begleiter: {
    rolle: (c) => c.fem ? "Die Konstante in einer Umbruchphase" : "Der Ruhige in einer Umbruchphase",
    rolleSatz: (c) => `Begleitet ${c.cepWer} in ${c.ortText} durch eine Lebensphase, in der die Wohnung nur ein Teil der Frage ist.`,
    was: () => "zuhört, bevor verkauft wird, und den Ablauf so erklärt, dass niemand allein entscheidet",
    andersAls: () => "Makler, die über Quadratmeter reden, wenn es um einen Lebensabschnitt geht",
    haltung: () => "Ankommen beginnt mit Zuhören. Der Verkauf ist nur ein Teil davon.",
    versprechen: (c) => c.an("website", "Sie wissen bei jedem Schritt, was als Nächstes passiert, und müssen nichts allein entscheiden.", "Du weißt bei jedem Schritt, was als Nächstes passiert, und musst nichts allein entscheiden."),
    claims: (c) => ["Erst zuhören. Dann verkaufen.", c.kern && `${c.kern}, in Ruhe.`, "Ankommen beginnt mit Zuhören."],
    signatur: () => "Die Frage vom Küchentisch",
    signaturIdee: (c) => `Eine Frage, die Kunden am Küchentisch stellen, und die ehrliche Antwort. Immer am selben Tag, Schlusssatz „${c.claim}“`,
    vermeiden: ["Kundenstamm", "Objektakquise", "Abschlussquote"],
  },
  gestalter: {
    rolle: (c) => c.fem ? "Die mit dem Blick für den Raum" : "Der mit dem Blick für den Raum",
    rolleSatz: (c) => `Zeigt bei ${c.objText} in ${c.ortText}, was ein Raum werden kann, bevor er inseriert wird.`,
    was: () => "zeigt, was ein Raum werden kann, bevor er inseriert wird",
    andersAls: () => "Inserate, die Räume abfotografieren, statt zu zeigen, was sie können",
    haltung: () => "Ein Raum ist, was man daraus macht. Das Exposé beginnt beim Grundriss, nicht beim Weitwinkel.",
    versprechen: (c) => c.an("website", "Käufer sehen in Ihrer Wohnung, was sie werden kann. Das entscheidet mit über den Preis.", "Käufer sehen in deiner Wohnung, was sie werden kann. Das entscheidet mit über den Preis."),
    claims: (c) => ["Raum ist, was man daraus macht.", c.kern && `${c.kern}, neu gesehen.`, "Nicht inseriert. Gezeigt."],
    signatur: () => "Ein Raum, zwei Leben",
    signaturIdee: (c) => `Ein Grundriss, zwei Möglichkeiten, wie man darin lebt. Immer im selben Aufbau, Schlusssatz „${c.claim}“`,
    vermeiden: ["Wohntraum", "Designerwohnung", "stylish"],
  },
  entdecker: {
    rolle: (c) => c.fem ? "Die, die jede Straße kennt" : "Der, der jede Straße kennt",
    rolleSatz: (c) => `Kennt ${c.kern || c.o0} Straße für Straße und sieht Entwicklungen, bevor sie im Preis stehen.`,
    was: (c) => `jede Straße ${c.inK} kennt und Veränderungen sieht, bevor sie im Preis stehen`,
    andersAls: () => "Portale, die ein Grätzl auf Postleitzahl und Quadratmeterpreis reduzieren",
    haltung: () => "Eine Adresse ist mehr als eine Postleitzahl. Wer das Grätzl kennt, kauft besser.",
    versprechen: (c) => c.an("website", "Sie wissen, wie es sich in der Straße lebt, bevor Sie zum ersten Mal klingeln.", "Du weißt, wie es sich in der Straße lebt, bevor du zum ersten Mal klingelst."),
    claims: (c) => [c.kern && (/(straße|gasse|weg|allee|zeile)$/i.test(c.kern) ? `${c.kern}, Haus für Haus.` : `${c.kern}, Straße für Straße.`), "Wien, Straße für Straße.", "Mehr als eine Postleitzahl."],
    signatur: (c) => `${c.kern || c.o0} in 60 Sekunden`,
    signaturIdee: (c) => `Eine Straße, eine Veränderung, eine Zahl, 60 Sekunden im Gehen. Immer am selben Tag, Schlusssatz „${c.claim}“`,
    vermeiden: ["Hotspot", "Trendviertel", "angesagt"],
  },
  gastgeber: {
    rolle: (c) => c.fem ? "Die Maklerin mit offener Tür" : "Der Makler mit offener Tür",
    rolleSatz: (c) => `Erklärt jeden Schritt vom ersten Kaffee an, für ${c.cepWer} in ${c.ortText}, ohne dass sich jemand klein fühlt.`,
    was: () => "vom ersten Kaffee an erklärt, ohne dass sich jemand klein fühlt",
    andersAls: () => "Makler, die man erst beim Notar persönlich kennenlernt",
    haltung: () => "Immobilien sind Menschen mit Adresse. Wer fragt, bekommt eine Antwort, auch beim dritten Mal.",
    versprechen: (c) => c.an("website", "Sie verstehen jeden Schritt, von der Finanzierung bis zur Übergabe, und fühlen sich dabei nie fehl am Platz.", "Du verstehst jeden Schritt, von der Finanzierung bis zur Übergabe, und fühlst dich dabei nie fehl am Platz."),
    claims: (c) => [c.kern && c.worte.includes("ehrlich") && `${c.kern}, ehrlich erklärt.`, "Immobilien sind Menschen mit Adresse.", c.o0 && `Willkommen in ${c.o0}.`],
    signatur: (c) => `Kaffee mit ${c.vor}`,
    signaturIdee: (c) => `Eine Frage aus der Community, beantwortet beim Kaffee ${c.inK}. Immer am selben Tag, Schlusssatz „${c.claim}“`,
    vermeiden: ["Kundenstamm", "Leads", "Abschlussquote"],
  },
};

/* ---------- 4. Kontext: alles, was der Generator über den Makler weiß ---------- */
function hmPfQuellen(mid, opt) {
  opt = opt || {};
  const S = (k) => { try { return hmStore.get(k); } catch (e) { return null; } };
  const makler = opt.makler || (S("makler") || []).find((x) => x.id === mid) || { id: mid, name: "" };
  const fb = (S("fragebogen") || {})[mid];
  const a = opt.antworten || (fb && fb.antworten) || {};
  const st = (S("strategien") || {})[mid];
  let w = opt.weg || (st && st.wege ? (st.wege[st.gewaehlt || "a"] || st.wege.a) : null);
  if (!w && Object.keys(a).length && typeof hmZweiWege === "function") w = hmZweiWege(a).a;
  const meetings = opt.meetings || (S("meetings") || []).filter((x) => x.maklerId === mid);
  const branding = opt.branding || (S("branding") || {})[mid] || {};
  return { mid, makler, a, w, meetings, branding, mitschrift: opt.mitschrift || null };
}
function hmPfZitate(q) {
  const vor = hmPfS(q.makler.name).split(" ")[0];
  const out = [];
  (q.meetings || []).forEach((mt) => {
    (mt.zitate || []).forEach((z) => out.push(hmPfS(z)));
    String(mt.transkript || "").split("\n").forEach((l) => { const m = l.match(/^\s*([^:\d]{2,40}):\s*(.+)$/); if (m && vor && m[1].trim().startsWith(vor)) out.push(hmPfS(m[2])); });
  });
  if (q.mitschrift) {
    const t = typeof q.mitschrift === "string" ? q.mitschrift : [...(q.mitschrift.zitate || []), q.mitschrift.transkript || ""].join("\n");
    String(t).split("\n").forEach((l) => { const m = l.match(/^\s*([^:\d]{2,40}):\s*(.+)$/); if (m && vor && m[1].trim().startsWith(vor)) out.push(hmPfS(m[2])); else if (!m && hmPfWoerter(l) >= 6 && hmPfWoerter(l) <= 30) out.push(hmPfS(l)); });
  }
  return [...new Set(out.filter((z) => hmPfWoerter(z) >= 4))].slice(0, 8);
}
function hmPfAnrede(a, w, kontext) {
  const r = hmPfS(a && a.anrede);
  if (/^Sie/.test(r) || (!r && w && w.anrede === "Sie")) return "Sie";
  if (/^Du auf Instagram/.test(r)) return ["instagram", "tiktok", "facebook", "youtube", "story"].includes(kontext) ? "Du" : "Sie";
  if (/^Du, überall/.test(r)) return ["linkedin", "website"].includes(kontext) ? "neutral" : "Du";
  if (!r && w && w.anrede === "Du") return "Du";
  return "Sie";
}
function hmPfCue(t) {
  const s = hmPfS(t); if (!s) return { text: "", tag: "", zeit: "", anker: "" };
  const tag = (s.match(/Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag/) || [])[0] || "";
  const zm = s.match(/(\d{1,2})(?::(\d{2}))?\s*Uhr|(\d{1,2}):(\d{2})/);
  const zeit = zm ? (zm[1] ? (zm[2] ? `${zm[1]}:${zm[2]} Uhr` : `${zm[1]} Uhr`) : `${zm[3]}:${zm[4]} Uhr`) : "";
  const anker = hmPfS((s.match(/nach dem ([^,]+?)(?:,|$| um | \d)/i) || [])[1]);
  return { text: s, tag, zeit, anker };
}

function hmPfKontext(q) {
  const a = q.a || {}; const w = q.w || null;
  const name = hmPfS(q.makler.name) || "Der Makler";
  const [vor, ...rest] = name.split(" ");
  const fem = hmPfWeiblich(q.makler);
  const orte = (a.bezirke || []).map(hmPfOrt).filter(Boolean).slice(0, 3);
  const kern = hmPfKern(a);
  const obj = (a.immotypen || []).map(hmPfObjekt);
  const obj0 = obj[0] || { typ: "Wohnung", plural: "Wohnungen", g: "f", quelle: "" };
  const abschl = hmPfSaetze(a.abschluesse).map((s) => ({ satz: s, teile: hmPfTeile(s) }));
  const belege = hmPfSaetze(a.belege).map((s) => ({ satz: s, teile: hmPfTeile(s) }));
  const cepKeys = (a.ausloeser || []).filter((k) => HM_PF_CEP[k]);
  const cep0 = HM_PF_CEP[cepKeys[0]] || HM_PF_CEP_STANDARD;
  let werListe = cepKeys.slice(0, 2).map((k) => HM_PF_CEP[k].wer);
  if (/Erbengemeinschaft/.test(a.abschluesse + " " + a.abgeraten)) werListe = werListe.map((x) => x === "Erben" ? "Erbengemeinschaften" : x);
  const seite = a.seite == null ? 50 : a.seite;
  const eigentuemer = seite < 40, kaeufer = seite > 60;
  if (!werListe.length) werListe = [eigentuemer ? "Eigentümer" : kaeufer ? "Käufer" : "Eigentümer und Käufer"];
  const abgeraten = hmPfS(a.abgeraten);
  const herkunft = hmPfHerkunft(a.aufgewachsen);
  const cue = hmPfCue(a.cue);
  const strassen = [...new Set([...hmPfStrassen(a.graetzl), ...hmPfStrassen(a.abschluesse), ...hmPfStrassen(a.belege)])];
  const unity = hmPfS(a.unity).split(/,\s*/).map(hmPfS).filter(Boolean);
  const worte = hmPfS(a.worte).toLowerCase().split(/[,;]\s*|\s+und\s+/).map(hmPfS).filter(Boolean).slice(0, 4);
  const kanaele = (w && w.kanaele && w.kanaele.length) ? w.kanaele : ((a.kanaele && a.kanaele.length) ? a.kanaele.slice(0, 2) : ["instagram"]);
  const erlaubt = (a.formate && a.formate.length) ? a.formate : (w && w.formate) || Object.keys(typeof HM_FORMATE !== "undefined" ? HM_FORMATE : { carousel: 1, talking: 1, qa: 1 });
  const aid = (w && w.archetyp && w.archetyp.id) || (a.archetyp && a.archetyp[0]) || "kenner";
  const c = {
    q, a, w, aid, figur: HM_PF_FIGUR[aid] || HM_PF_FIGUR.kenner, name, vor, nach: rest.join(" "), fem,
    der: fem ? "die" : "der", Makler: fem ? "Maklerin" : "Makler", er: fem ? "sie" : "er", Er: fem ? "Sie" : "Er",
    orte, o0: orte[0] || kern || "Wien", o1: orte[1] || "", ortText: hmPfListe(orte) || kern || "Wien", kern, kernLang: hmPfS(a.graetzl), strassen,
    obj, obj0, objText: hmPfListe(obj.slice(0, 2).map((o) => o.plural)) || "Wohnungen", objGruppe: hmPfObjGruppe(obj),
    cepKeys, cep0, cepWer: hmPfListe(werListe), eigentuemer, kaeufer,
    hindernis: a.hindernis || [], gruende: a.gruende || [], gefuehl: a.gefuehl || [],
    abschl, belege, abgeraten, warten: /warten|Jahre|später|noch nicht/i.test(abgeraten),
    herkunft, wendepunkt: hmPfS(a.wendepunkt), fehler: hmPfS(a.fehler), kundensatz: hmPfS(a.kundensatz).replace(/^["„“]|["“”]$/g, ""),
    unity, worte, ideal: hmPfS(a.ideal), cue, vorbild: hmPfS(a.vorbilder), zitate: hmPfZitate(q),
    tabus: a.tabus || [], privat: a.privat || [], erfolge: a.erfolge || 3, pratfallOk: belege.length >= 1,
    kanaele, k0: kanaele[0], formateErlaubt: erlaubt, tage: (a.verfuegbar || []).filter((x) => HM_PF_TAGE.includes(x)),
    seit: hmPfS(a.seit), herkunftWeg: hmPfS(a.herkunft), milieus: (a.milieus || []).map((id) => (typeof HM_MILIEUS !== "undefined" ? HM_MILIEUS : []).find((m) => m.id === id)).filter(Boolean),
    phasen: a.phasen || [], anteil: hmPfS(a.graetzl_anteil), branding: q.branding || {}, leer: !Object.keys(a).length,
  };
  c.inK = hmPfIn(kern || c.o0); c.ausK = hmPfAus(kern || c.o0);
  c.signaturMitCue = aid === "kenner" && /Grundbuch/i.test(cue.text) && !!cue.tag;
  c.an = (kontext, sie, du) => hmPfAnrede(a, w, kontext) === "Sie" ? sie : du;
  c.sieK0 = hmPfAnrede(a, w, c.k0) === "Sie";
  const claims = c.figur.claims(c).filter(Boolean);
  const markeClaim = hmPfS(c.branding.claim);
  /* Der freigegebene Claim aus dem Branding hat Vorrang, Satzbausteine der Figur sind nur Alternativen (Prozess v2, C5) */
  c.claim = markeClaim || claims[0] || "Der Markt wird lesbar.";
  c.claimAlt = [...new Set([...claims.slice(1), markeClaim].filter((x) => x && x !== c.claim))].slice(0, 3);
  return c;
}
function hmPfFormat(c, wunsch) {
  const f = wunsch.find((x) => c.formateErlaubt.includes(x));
  return f || c.formateErlaubt[0] || wunsch[0];
}
function hmPfSeitPhrase(seit) { return { "Unter 2 Jahren": "seit knapp zwei Jahren", "2 bis 5 Jahre": "seit einigen Jahren", "5 bis 10 Jahre": "seit mehr als fünf Jahren", "Über 10 Jahre": "seit mehr als zehn Jahren" }[seit] || ""; }
function hmPfWegPhrase(h) { return { "Aus der Familie": "das Geschäft kenne ich aus der Familie", "Quereinstieg aus dem Verkauf": "vorher war ich im Verkauf", "Aus Bau oder Architektur": "ich komme vom Bau", "Aus Finanz oder Recht": "ich komme aus Finanz und Recht", "Über ein eigenes Investment": "angefangen hat es mit einer eigenen Anlage" }[h] || ""; }
function hmPfWegPhrase3(h) { return { "Aus der Familie": "aus einer Familie, in der Immobilien Alltag waren", "Quereinstieg aus dem Verkauf": "aus dem Verkauf", "Aus Bau oder Architektur": "vom Bau", "Aus Finanz oder Recht": "aus Finanz und Recht", "Über ein eigenes Investment": "über eine eigene Anlage in die Branche" }[h] || ""; }

/* ---------- 5. Bausteine der Plattform ---------- */
function hmPfEinsicht(c) {
  if (c.leer) return { zielgruppe: hmPfLuecke("für wen du arbeitest, als Bild statt als Zielgruppe."), spannung: hmPfLuecke("was deine Kunden vor der Entscheidung umtreibt."), konvention: hmPfLuecke("wie Makler in deiner Gegend heute auftreten."), weisseStelle: hmPfLuecke("die Stelle, die niemand besetzt.") };
  const objPhrase = c.eigentuemer && c.obj.length ? `, die ${HM_PF_ART.einen[c.obj0.g]} ${c.obj0.typ}${c.obj[1] ? ` oder ${HM_PF_ART.einen[c.obj[1].g]} ${c.obj[1].typ}` : ""} besitzen` : c.kaeufer ? `, die ${c.phasen.includes("Erste Wohnung") ? "zum ersten Mal " : ""}kaufen` : "";
  const milieu = c.milieus.length ? ` Wohnwelten: ${hmPfListe(c.milieus.map((m) => m.titel))}.` : "";
  const unity = c.unity.length ? ` ${c.fem ? "Eine" : "Einer"} von ihnen ist ${c.vor} selbst: ${hmPfListe(c.unity)}.` : "";
  const konv = {
    invest: "Investment-Makler zeigen Renditen, Fassaden und das Wort Off-Market. Über die Entscheidung vor dem Verkauf spricht kaum jemand.",
    neubau: "Neubau-Vermarktung zeigt Renderings und Ausstattungslisten. Wie man die erste Finanzierung versteht, erklärt kaum jemand.",
    haus: "Hausverkäufe laufen über Drohnenbilder und Grundstücksflächen. Was es heißt, ein Familienhaus aufzugeben, kommt nicht vor.",
    gewerbe: "Gewerbe-Exposés listen Flächen und Frequenzen. Wer dort arbeiten soll, kommt nicht vor.",
    wohnung: "Wohnungsinserate zeigen Weitwinkel-Wohnzimmer und Quadratmeter. Wie sich das Grätzl anfühlt, steht nirgends.",
  }[c.objGruppe];
  let weiss;
  if (c.abgeraten) weiss = `Kaum ein Makler in ${c.o0} sagt öffentlich: ${c.warten ? "jetzt noch nicht verkaufen" : "dieser Verkauf passt gerade nicht"}. ${c.vor} hat es getan und kann es belegen.`;
  else if (c.kundensatz) weiss = `Kaum ein Makler in ${c.o0} wird von Kunden so beschrieben: „${hmPfOhnePunkt(c.kundensatz)}.“ Genau diese Stelle ist frei.`;
  else if (["6 bis 8", "9 bis 10"].includes(c.anteil) && c.kern) weiss = `Niemand ist ${c.inK} so dicht dran: ${c.anteil} der letzten zehn Abschlüsse lagen dort.`;
  else if (c.unity.length) weiss = `Kaum ein Makler in ${c.o0} ist selbst ${c.fem ? "eine" : "einer"} von ihnen: ${hmPfListe(c.unity)}.`;
  else weiss = hmPfLuecke("die Stelle im Markt, die niemand besetzt. Im Gespräch suchen wir sie in deinen Abschlüssen.");
  return {
    zielgruppe: `${hmPfGross(c.cepWer)} in ${c.ortText}${objPhrase}.${milieu}${unity}`,
    spannung: `${c.cep0.spannung}${c.hindernis[0] && HM_PF_HINDERNIS[c.hindernis[0]] ? " " + HM_PF_HINDERNIS[c.hindernis[0]].satz : ""}`,
    konvention: konv,
    weisseStelle: weiss,
  };
}
function hmPfWeil(c) {
  if (c.abgeraten) return `Belegt durch die eigene Geschichte: „${hmPfOhnePunkt(c.abgeraten)}.“`;
  if (c.belege.length) return `Belegt: ${c.belege[0].satz}`;
  if (c.kundensatz && ["gastgeber", "begleiter", "entdecker"].includes(c.aid)) return `Belegt durch eine Kundennachricht: „${hmPfOhnePunkt(c.kundensatz)}.“`;
  if (c.abschl.length) return `Belegt durch die letzten Abschlüsse, zum Beispiel: ${c.abschl[0].satz}`;
  if (c.anteil) return `Belegt: ${c.anteil} der letzten zehn Abschlüsse lagen ${c.inK}.`;
  return hmPfLuecke("ein Beleg, den ein skeptischer Verkäufer prüfen kann.");
}
function hmPfPositionierung(c) {
  if (c.leer) return { satz: hmPfLuecke("die Positionierung, sobald der Fragebogen beantwortet ist."), fuerWen: hmPfLuecke("für wen."), was: hmPfLuecke("was du tust."), andersAls: hmPfLuecke("wogegen du dich absetzt."), weil: hmPfLuecke("warum man es dir glaubt.") };
  const objPhrase = c.eigentuemer && c.obj.length ? ` mit ${HM_PF_ART.ein[c.obj0.g] === "eine" ? "einer" : "einem"} ${c.obj0.typ}${c.obj[1] ? ` oder ${HM_PF_ART.ein[c.obj[1].g] === "eine" ? "einer" : "einem"} ${c.obj[1].typ}` : ""}` : "";
  const fuerWen = `${c.cepWer} in ${c.ortText}${objPhrase}`;
  const was = c.figur.was(c), andersAls = c.figur.andersAls(c), weil = hmPfWeil(c);
  return { satz: `Für ${fuerWen} ist ${c.name} ${c.der} ${c.Makler}, ${c.der} ${was}. Anders als ${andersAls}. ${weil}`, fuerWen, was, andersAls, weil };
}
function hmPfWerte(c) {
  const out = (c.a.werte || []).slice(0, 2).map((n) => { const d = HM_PF_WERTE[n]; if (!d) return null; return { name: n, verhalten: d.verhalten(c), nie: typeof d.nie === "function" ? d.nie(c) : d.nie }; }).filter(Boolean);
  for (const g of c.gruende) { if (out.length >= 3) break; const d = HM_PF_GRUNDWERT[g]; if (d && !out.some((x) => x.name === d.name)) out.push({ ...d }); }
  while (out.length < 3) out.push({ name: hmPfLuecke("ein Wert"), verhalten: "Im Workshop an einem echten Abschluss festmachen.", nie: "Wird mit dem Wert festgelegt." });
  return out;
}
function hmPfPersoenlichkeit(c) {
  const a = c.a; let woerter = c.worte.slice();
  let abgeleitet = false;
  if (!woerter.length) {
    abgeleitet = true;
    const s = (k) => (a[k] == null ? 50 : a[k]);
    woerter = [s("s2") < 45 ? "kompetent" : s("s2") > 55 ? "nahbar" : "klar", s("s3") < 45 ? "ruhig" : s("s3") > 55 ? "energisch" : "direkt", s("s5") > 60 ? "meinungsstark" : s("s5") < 40 ? "zurückhaltend" : "sachlich"];
  }
  return woerter.slice(0, 4).map((wo) => {
    const d = HM_PF_WORT[wo.toLowerCase()];
    return { wort: wo, heisst: d ? d[0] + (abgeleitet ? " Aus deinen Reglern abgeleitet, im Workshop mit Kundenstimmen prüfen." : "") : "So beschreiben dich Kunden heute. Der Ton bleibt nah an diesem Wort.", heisstNicht: d ? d[1] : "Eine Pose für die Kamera." };
  });
}
function hmPfRegler(a) {
  const s = (k) => (a[k] == null ? 50 : a[k]);
  const r = (x) => Math.max(0, Math.min(100, Math.round(x)));
  return { ernst: r(100 - (s("s1") + s("s3")) / 2), persoenlich: r(s("s2")), begeistert: r((s("s1") + s("s3")) / 2), sachlich: r(100 - s("s2") * 0.6 - s("s3") * 0.4) };
}
function hmPfStimme(c, bausteine) {
  const a = c.a, w = c.w || {};
  const s3 = a.s3 == null ? 50 : a.s3;
  const regeln = [
    `Anrede: ${w.anredeRegel || (c.an("website", "Sie", "Du") === "Sie" ? "Sie auf allen Kanälen" : "Du auf allen Kanälen")}.`,
    s3 < 45 ? "Sätze bis 15 Wörter, ein Gedanke pro Satz, die Erklärung kommt vor der Pointe." : "Kurze Sätze, Tempo vor Erklärung, Wir-Sprache ist erlaubt.",
    ...(c.w && c.w.archetyp && c.w.archetyp.ton ? c.w.archetyp.ton.slice(0, 2).map((t) => hmPfPunkt(hmPfGross(t))) : []),
    c.erfolge <= 2 ? "Kompetenz indirekt zeigen: Ablauf, Zahlen und Kundenstimmen statt Eigenlob." : c.erfolge >= 4 ? "Eigene Ergebnisse dürfen vorkommen, höchstens in jedem vierten Beitrag." : "Ergebnisse immer mit Zahl, Ort und Zeitraum.",
    c.tabus.length ? `Nie Thema: ${hmPfListe(c.tabus)}.` : "Grenzen werden im Workshop festgelegt.",
    c.worte.length ? `Klingt wie heute (${hmPfListe(c.worte)})${c.ideal ? `, wächst in Richtung „${c.ideal}“` : ""}. Das Ziel ist Richtung, nicht Stimme.` : hmPfLuecke("die drei Wörter, mit denen Kunden dich heute beschreiben."),
    "Keine Ausrufezeichen, keine Emojis, keine Gedankenstriche.",
  ];
  if (!regeln.some((r) => /Zahlen mit Quelle/.test(r))) regeln.push("Zahlen immer mit Quelle, Ort und Zeitraum.");
  const sagen = [...new Set([c.kern, ...c.strassen.slice(0, 2), ...c.obj.slice(0, 2).map((o) => o.typ), ...c.worte.slice(0, 2), ...(c.warten ? ["Zeitpunkt"] : []), ...(c.cepKeys.includes("Erbe") ? ["Erbengemeinschaft"] : []), ...c.gefuehl.slice(0, 1).map((g) => g.toLowerCase())].filter(Boolean))].slice(0, 8);
  const vermeiden = [...c.figur.vermeiden, "Traumimmobilie", "Ihr Partner für", "exklusiv ohne Beleg", "einzigartig", ...(c.an("website", "Sie", "Du") === "Sie" ? ["Du-Form"] : [])];
  const ctaK0 = c.an(c.k0, c.cep0.cta[0], c.cep0.cta[1]);
  const fragenErst = { invest: "Baujahr, Nutzfläche und die laufenden Mietverträge", neubau: "Wunschbezirk, Budget und Einzugstermin", haus: "Grundstücksfläche, Baujahr und Heizung", gewerbe: "Fläche, Widmung und Mietstand", wohnung: "Fläche, Stockwerk und Freifläche" }[c.objGruppe];
  const termin = c.tage.length ? `am ${c.tage[0]}${c.tage[1] ? " oder " + c.tage[1] : ""}${(c.a.verfuegbar || []).includes("Vormittag") ? " am Vormittag" : (c.a.verfuegbar || []).includes("Nachmittag") ? " am Nachmittag" : ""}` : "diese Woche";
  const beispiele = [
    { wo: `Caption ${HM_PF_KANALNAME[c.k0] || c.k0}`, so: `${bausteine.markt1Hook} ${c.belege[0] ? "Zuletzt: " + c.belege[0].satz : c.abschl[0] ? "Zuletzt: " + c.abschl[0].satz : ""} ${ctaK0}`.replace(/\s+/g, " ").trim(),
      nicht: c.an(c.k0, `Ihr Partner für Immobilien in ${c.o0}. Mit Leidenschaft finden wir Ihre Traumimmobilie. Jetzt anfragen.`, `Dein Partner für Immobilien in ${c.o0}. Mit Leidenschaft finden wir deine Traumimmobilie. Jetzt anfragen.`) },
    { wo: "Erste Antwort auf eine Anfrage", so: c.kaeufer ? c.an("erstkontakt", `Guten Tag [Name], danke für Ihre Nachricht. Damit ich Ihnen passende Wohnungen in ${c.ortText} zeigen kann, brauche ich drei Angaben: Budget, Zimmer und Einzugstermin. Passt Ihnen ein Telefonat ${termin}?`, `Hallo [Name], danke für deine Nachricht. Damit ich dir passende Wohnungen in ${c.ortText} zeigen kann, brauche ich drei Angaben: Budget, Zimmer und Einzugstermin. Passt dir ein Telefonat ${termin}?`) : c.an("erstkontakt", `Guten Tag [Name], danke für Ihre Nachricht zu ${HM_PF_ART.Ihr[c.obj0.g].toLowerCase() === "ihr" ? "Ihrem" : "Ihrer"} ${c.obj0.typ} in ${c.o0}. Für eine ehrliche Einschätzung brauche ich drei Angaben: ${fragenErst}. Passt Ihnen ein Telefonat ${termin}?`, `Hallo [Name], danke für deine Nachricht zu ${HM_PF_ART.dein[c.obj0.g] === "deine" ? "deiner" : "deinem"} ${c.obj0.typ} in ${c.o0}. Für eine ehrliche Einschätzung brauche ich drei Angaben: ${fragenErst}. Passt dir ein Telefonat ${termin}?`),
      nicht: "Sehr geehrte Damen und Herren, vielen Dank für Ihr Interesse. Wir melden uns in Kürze. Ihr kompetentes und zuverlässiges Immobilienteam." },
    { wo: "Absage oder Abraten", so: c.kaeufer ? c.an("erstkontakt", `Diese Wohnung würde ich Ihnen nicht empfehlen: Die Rate liegt über dem, was Sie sich vorgenommen haben. Ich schicke Ihnen bis Freitag zwei Alternativen${c.o1 ? " in " + c.o1 : ""}, die besser passen.`, `Diese Wohnung würde ich dir nicht empfehlen: Die Rate liegt über dem, was du dir vorgenommen hast. Ich schick dir bis Freitag zwei Alternativen${c.o1 ? " in " + c.o1 : ""}, die besser passen.`) : c.an("erstkontakt", c.warten ? `Ich würde ${HM_PF_ART.Ihr[c.obj0.g]} ${c.obj0.typ} derzeit nicht verkaufen. Die Zahlen sprechen für Geduld, und Sie haben keinen Zeitdruck. Ich melde mich in sechs Monaten mit neuen Vergleichswerten, wenn Sie das möchten.` : `Zu diesem Preis kann ich ${HM_PF_ART.Ihr[c.obj0.g]} ${c.obj0.typ} nicht ehrlich anbieten. Drei Vergleichswerte aus ${c.o0} liegen darunter, ich schicke sie Ihnen gern. Wenn Sie danach neu entscheiden, bin ich da.`, c.warten ? `Ich würde ${HM_PF_ART.dein[c.obj0.g]} ${c.obj0.typ} gerade nicht verkaufen. Die Zahlen sprechen für Geduld, und du hast keinen Zeitdruck. Ich melde mich in sechs Monaten mit neuen Vergleichswerten, wenn du magst.` : `Zu diesem Preis kann ich ${HM_PF_ART.dein[c.obj0.g]} ${c.obj0.typ} nicht ehrlich anbieten. Drei Vergleichswerte aus ${c.o0} liegen darunter, ich schick sie dir gern. Wenn du danach neu entscheidest, bin ich da.`),
      nicht: "Leider können wir Ihr Objekt aktuell nicht in unser exklusives Portfolio aufnehmen. Wir wünschen Ihnen alles Gute." },
    { wo: "Website, erster Satz", so: c.an("website", `${c.eigentuemer ? `Sie überlegen, ${HM_PF_ART.Ihr[c.obj0.g]} ${c.obj0.typ} in ${c.o0} zu verkaufen?` : `Sie suchen in ${c.o0}?`} ${c.warten ? "Zuerst klären wir, ob jetzt der richtige Zeitpunkt ist." : (c.eigentuemer ? "Zuerst klären wir, was es wirklich wert ist." : "Zuerst klären wir, was passt und was leistbar ist.")}`, `${c.eigentuemer ? `Du überlegst, ${HM_PF_ART.dein[c.obj0.g]} ${c.obj0.typ} in ${c.o0} zu verkaufen?` : `Du suchst in ${c.o0}?`} ${c.warten ? "Zuerst klären wir, ob jetzt der richtige Zeitpunkt ist." : (c.eigentuemer ? "Zuerst klären wir, was es wirklich wert ist." : "Zuerst klären wir, was passt und was leistbar ist.")}`),
      nicht: "Willkommen auf unserer Website. Wir sind Ihr Experte an Ihrer Seite für ganzheitliche Immobilienlösungen." },
    { wo: `Bio ${HM_PF_KANALNAME[c.k0] || c.k0}`, so: `${c.Makler} für ${c.objText} in ${c.ortText}. ${c.claim}`, nicht: "Immobilienprofi aus Leidenschaft. Maßgeschneiderte Lösungen für Ihre Wünsche." },
  ];
  return { regler: hmPfRegler(a), regeln, sagen, vermeiden, beispiele };
}

/* ---------- 6. Säulen als Serien ---------- */
function hmPfSerieMarkt(c) {
  const k = c.kern || c.o0, kan = c.k0;
  const zahl = (c.belege.find((b) => /\d/.test(b.satz)) || c.abschl.find((b) => /\d/.test(b.satz)) || {}).satz;
  if (["kenner", "fels"].includes(c.aid)) return {
    name: `${k} in Zahlen`,
    idee: `Einmal im Monat drei Zahlen zu ${hmPfListe([k, ...c.orte.filter((o) => o !== k).slice(0, 2)])}: Kaufpreis je m², Zeit bis zum Anbot, ein eigener Abschluss als Einordnung. Keine Prognose, nur was sich belegen lässt.`,
    ablauf: ["Zahlen aus Grundbuch und UNIO-Marktdaten für das Quartal ziehen, Quelle notieren.", `Eine Frage wählen, die ${c.cepWer} ${c.inK} gerade stellen.`, "Kachel 1 stellt die Frage, Kacheln 2 bis 4 zeigen je eine Zahl mit Quelle, Kachel 5 den eigenen Fall, Kachel 6 die Einordnung.", c.formateErlaubt.includes("talking") ? "Am selben Tag 45 Sekunden Talking Head mit der wichtigsten Zahl." : "Am selben Tag eine Story mit der wichtigsten Zahl."],
    hookFormel: c.an(kan, "[Eine Zahl] in [Grätzl]. Was das für Ihr [Objekt] heißt.", "[Eine Zahl] in [Grätzl]. Was das für dein [Objekt] heißt."),
    beispiele: [
      { titel: `${k} in Zahlen: ${c.obj0.plural}`, hook: `Was ${HM_PF_ART.ein[c.obj0.g]} ${c.obj0.typ} ${c.inK} heute kostet, in drei Zahlen.`, skizze: `Kaufpreise je m² im Quartal, Zeit bis zum Anbot, Spanne der letzten Abschlüsse. Einordnung mit dem eigenen Fall${zahl ? `: ${zahl}` : ` [${HM_PF_LUECKE}: ein Abschluss mit Zahl]`}` },
      { titel: c.cep0.titel(c.o1 || c.o0), hook: c.cep0.hook(c.o1 || c.o0), skizze: `${c.cep0.rechnung}, an einem Beispiel aus ${c.o1 || c.o0}. Zahlen als Spanne, Quelle auf der letzten Kachel. Endet mit der Frage: ${c.cep0.frage}` },
      { titel: c.o1 ? `${c.o0} gegen ${c.o1}` : `${k} gegen den Bezirk`, hook: c.o1 ? `${c.o0} gegen ${c.o1}: ${HM_PF_ART.derselbe[c.obj0.g]} ${c.obj0.typ}, zwei Preise.` : `${k} gegen den Rest von ${c.o0}: zwei Preise.`, skizze: `Zwei vergleichbare Objekte, zwei Lagen, ein Preisunterschied. Drei Gründe dafür: Lage in der Straße, Zustand, Mietverhältnisse. Quelle: Grundbuch und eigene Abschlüsse.` },
    ],
  };
  if (c.aid === "gestalter") return {
    name: `Vorher, nachher, ${k}`,
    idee: `Ein Raum ${c.inK}, zweimal gezeigt: wie er übergeben wurde und was aus ihm werden kann. Mit Material, Licht und einer Zahl zum Preis.`,
    ablauf: ["Objekt wählen, bei dem ein Eingriff den Wert sichtbar verändert.", "Vorher im selben Bildausschnitt fotografieren wie nachher.", "Drei Materialien benennen, eine Zahl zu Kosten oder Wirkung.", "Als Carousel oder Walkthrough, Schluss mit der Frage, welcher Raum als Nächstes kommt."],
    hookFormel: "[Raum] in [Grätzl]. Vorher, nachher, [eine Zahl].",
    beispiele: [
      { titel: `Ein ${c.obj0.typ} ${c.inK}, neu gedacht`, hook: `Diese ${c.obj0.typ === "Loft" ? "Fläche" : "Wohnung"} sah vor sechs Wochen anders aus.`, skizze: "Gleicher Ausschnitt vorher und nachher, drei Eingriffe, was sie gekostet haben, was sie am Preis verändern." },
      { titel: "Ein Grundriss, zwei Leben", hook: "Ein Grundriss. Zwei Arten, darin zu leben.", skizze: "Derselbe Grundriss als Skizze für eine Familie und für ein Paar mit Homeoffice. Welche Wand bleibt, welche fällt." },
      { titel: `Licht ${c.inK}`, hook: "Warum Licht mehr wert ist als Quadratmeter.", skizze: "Dieselbe Wohnung um 9, 13 und 17 Uhr. Was die Ausrichtung für Käufer bedeutet." },
    ],
  };
  const str = c.strassen.slice(0, 2);
  return {
    name: /(straße|gasse|weg|allee|zeile)$/i.test(k) ? `${k}, Haus für Haus` : `${k}, Straße für Straße`,
    idee: `Ein Spaziergang, eine Straße, 60 Sekunden. ${c.vor} zeigt, was sich ${c.inK} verändert und was es kostet, dort zu wohnen.`,
    ablauf: ["Eine Straße wählen, nach der gerade gesucht wird oder die sich sichtbar verändert.", "Drei Stationen festlegen: ein Haus, ein Geschäft, ein Ort, an dem man sich trifft.", "Im Gehen sprechen, eine Zahl pro Folge, keine Moderation am Stand.", "Schluss mit einer Frage an die Community: welche Straße als Nächstes."],
    hookFormel: "[Straße] in 60 Sekunden. [Eine Veränderung], [eine Zahl].",
    beispiele: [
      ...str.map((s) => ({ titel: `${s} in 60 Sekunden`, hook: `${s}: was sich hier gerade ändert.`, skizze: `Start ${hmPfAn(s)}, drei Stationen, eine Zahl zu Mieten oder Kaufpreisen im Umkreis. Schluss mit der Frage nach der nächsten Straße.` })),
      { titel: `${k} am Samstag`, hook: `Ein Samstag ${c.inK}, und was eine Wohnung hier kostet.`, skizze: `Markt, Café, Spielplatz: drei Orte, die Käufer vor der Besichtigung sehen sollten. Eine Preisspanne am Ende.` },
      { titel: "Die Straße, die ihr vorschlagt", hook: c.an(kan, `Welche Straße ${c.inK} soll ich als Nächstes zeigen?`, `Welche Straße ${c.inK} soll ich als Nächstes zeigen?`), skizze: "Kommentare der letzten Folge sammeln, die meistgenannte Straße drehen, die Person, die sie vorgeschlagen hat, im Text nennen (mit Einverständnis)." },
    ].slice(0, 3),
  };
}
function hmPfSerieWissen(c) {
  const h = HM_PF_HINDERNIS[c.hindernis[0]];
  const kan = c.k0, sie = c.sieK0;
  const g = c.gruende.find((x) => HM_PF_GRUND[x]) || "Klare Erklärung des Ablaufs";
  const nies = hmPfWerte(c).map((x) => x.nie).filter((x) => !hmPfIstLuecke(x)).slice(0, 3);
  const fehlerFolge = c.fehler ? (c.pratfallOk ? ` Folge 4 erzählt den eigenen Fehler: „${hmPfOhnePunkt(c.fehler)}.“` : " Der eigene Fehler aus dem Fragebogen wird Folge 4, sobald drei Belege online sind (Pratfall-Regel).") : "";
  const b = [
    h ? { titel: h.t1, hook: h.h1(sie), skizze: h.s1 } : { titel: "Wie ich arbeite, in 60 Sekunden", hook: "Wie ich arbeite, in 60 Sekunden.", skizze: "Sechs Schritte vom ersten Termin bis zum Notar, je ein Satz, je ein Bild." },
    { titel: "Was ich nicht mache", hook: `Drei Dinge, die ich als ${c.Makler} nicht mache.`, skizze: nies.length ? `Drei Sätze, je einer pro Kachel: ${nies.join(" ")}` : "Drei Grenzen aus dem Workshop, je eine pro Kachel." },
    { titel: HM_PF_GRUND[g][0], hook: HM_PF_GRUND[g][1], skizze: `Der Grund, aus dem Kunden gewählt haben (${g}), als Ablauf gezeigt statt behauptet. Ein echter Fall, anonymisiert.` },
  ];
  return {
    name: h ? h.serie : "Wie ich arbeite",
    idee: `${h ? `Was Kunden in ${c.o0} fast abgehalten hätte (${c.hindernis[0]}), wird zur Serie` : `Die unsichtbare Arbeit in ${c.o0} wird sichtbar`}: eine Frage pro Folge, eine klare Antwort, eine Grenze. Pflichtsäule, weil Integrität vor Sympathie zählt.${fehlerFolge}`,
    ablauf: ["Eine echte Frage aus einem Erstgespräch notieren, möglichst wörtlich.", "Antwort in drei Sätzen: Zahl, Leistung, Grenze.", `Als ${c.formateErlaubt.includes("qa") ? "Frage und Antwort" : "Carousel"} umsetzen, die Frage als Texteinblendung im ersten Bild.`, "Jede Folge wandert danach auf die Website, Seite Wie ich arbeite."],
    hookFormel: c.an(kan, "Was Sie für [Leistung] zahlen, und was Sie dafür bekommen.", "Was du für [Leistung] zahlst, und was du dafür bekommst."),
    beispiele: b,
  };
}
function hmPfSerieMeinung(c) {
  const kan = c.k0, k = c.kern || c.o0;
  const politik = c.tabus.includes("Politik") ? "Markt ja, Politik nein: Mietrecht und Widmung nur als Folge für Eigentümer, nie als Parteifrage." : "Meinung als Meinung kennzeichnen, Gegenstimmen sachlich beantworten.";
  if (c.abgeraten) {
    const empf = hmPfKlein((c.abgeraten.match(/\b(?:einer|einem|einen)\s+[A-ZÄÖÜ][\wäöüß-]+/i) || [])[0] || "einem Kunden");
    return {
      name: c.warten ? "Noch nicht verkaufen" : "Wann ich abrate",
      idee: `Die Haltung hinter dem Abraten als Serie: wann ${c.warten ? "Warten" : "ein Nein"} mehr bringt und wann ein Verkauf jetzt richtig ist. Beginnt mit der eigenen Geschichte: „${hmPfOhnePunkt(c.abgeraten)}.“`,
      ablauf: ["Eine Situation aus der Praxis wählen, anonymisiert.", "Erst die Entscheidung, dann die Rechnung dahinter, dann das Ergebnis.", `${c.formateErlaubt.includes("talking") ? "Talking Head" : "Carousel"}, 45 Sekunden, ruhig, ohne Musik.`, politik],
      hookFormel: "Warum ich [Kunde] vom [Schritt] abgeraten habe.",
      beispiele: [
        { titel: `Warum ich ${empf} vom Verkauf abgeraten habe`, hook: "Ich habe vom Verkauf abgeraten. Hier ist die Rechnung.", skizze: `Die Geschichte in eigenen Worten: „${hmPfOhnePunkt(c.abgeraten)}.“ Danach die Rechnung, warum ${c.warten ? "Warten" : "das Nein"} mehr gebracht hat, und wann es nicht so ist.` },
        { titel: c.warten ? "Wann Warten mehr bringt, und wann nicht" : "Drei Gründe, einen Verkauf zu verschieben", hook: c.an(kan, "Drei Situationen, in denen ich zum Warten rate.", "Drei Situationen, in denen ich zum Warten rate."), skizze: { invest: "Befristete Mietverträge vor dem Auslaufen, Sanierung vor dem Verkauf, eine Erbengemeinschaft ohne gemeinsame Linie. Je ein Satz, je eine Rechnung.", wohnung: "Sanierung vor dem Verkauf, eine Wohnung ohne Ersatz, ein Markt im Umbruch. Je ein Satz, je eine Rechnung.", neubau: "Finanzierung noch offen, Fertigstellung verschoben, Zinsen im Umbruch. Je ein Satz, je eine Rechnung.", haus: "Kein Ersatz in Sicht, Sanierung vor dem Verkauf, Familie ohne Einigung. Je ein Satz, je eine Rechnung.", gewerbe: "Mietvertrag vor Verlängerung, Leerstand vor Neuvermietung, Widmung in Prüfung. Je ein Satz, je eine Rechnung." }[c.objGruppe] },
        { titel: `Der Mythos vom schnellen Verkauf in ${c.o0}`, hook: "Schnell verkauft heißt nicht gut verkauft.", skizze: "Ein Satz zum Mythos, zwei Zahlen dagegen, ein Satz zur eigenen Regel. Quelle auf der letzten Kachel." },
      ],
    };
  }
  if (["kenner", "fels"].includes(c.aid)) {
    const myth = { invest: ["Das erste Angebot ist das schlechteste.", "Off-Market bringt immer mehr.", "Ein Zinshaus verkauft man am besten saniert."], neubau: ["Erstbezug ist immer teurer.", "Beim Bauträger verhandelt man nicht.", "Ohne Eigenkapital geht gar nichts."], haus: ["Ein Haus verkauft sich im Frühling besser.", "Der Garten zählt nicht zum Preis.", "Ein hoher Angebotspreis bringt am Ende mehr."], gewerbe: ["Leerstand drückt den Preis immer.", "Gewerbe kauft nur, wer Rendite rechnet.", "Ein Mieter im Haus ist immer ein Vorteil."], wohnung: ["Ein hoher Angebotspreis bringt am Ende mehr.", "Im Winter verkauft man schlechter.", "Das erste Angebot ist das schlechteste."] }[c.objGruppe];
    return {
      name: `Klartext ${k}`,
      idee: `Ein Mythos der Branche pro Folge, eine klare Antwort mit Zahl. Standpunkt statt Stimmung, für ${c.cepWer} in ${c.ortText}.`,
      ablauf: ["Einen Satz wählen, den Kunden im Erstgespräch sagen.", "Stimmt, stimmt nicht oder kommt darauf an, mit einem Grund.", "Talking Head, 40 Sekunden, der Mythos als Texteinblendung.", politik],
      hookFormel: "[Mythos]. Stimmt nicht, und zwar deshalb.",
      beispiele: myth.map((m) => ({ titel: `Mythos: ${hmPfOhnePunkt(m)}`, hook: `${hmPfOhnePunkt(m)}? Stimmt so nicht.`, skizze: `Der Mythos in einem Satz, die eigene Erfahrung aus ${c.o0} dagegen, eine Zahl mit Quelle.` })),
    };
  }
  return {
    name: `Frag ${c.vor}`,
    idee: `Die Community fragt, ${c.vor} antwortet mit Haltung: eine Frage pro Folge, beantwortet ${c.inK}. Macht Meinung nahbar und liefert Themen für Monate.`,
    ablauf: ["Fragen aus Kommentaren, Nachrichten und Besichtigungen sammeln.", "Eine Frage pro Folge, Antwort mit eigener Meinung und einem Beispiel.", `${c.formateErlaubt.includes("qa") ? "Frage und Antwort" : "Talking Head"}, 30 Sekunden, Frage als Texteinblendung.`, politik],
    hookFormel: c.an(kan, "Ihre Frage: [Frage]. Meine Antwort in 30 Sekunden.", "Deine Frage: [Frage]. Meine Antwort in 30 Sekunden."),
    beispiele: [
      { titel: `Frag ${c.vor}: ${hmPfOhnePunkt(c.cep0.frage)}`, hook: c.cep0.frage, skizze: `Die Frage wörtlich eingeblendet, die Antwort mit einem Beispiel aus ${c.o0}, eine Zahl am Ende.` },
      { titel: `Frag ${c.vor}: Lohnt sich ${c.o0} noch`, hook: `Lohnt sich ${c.o0} noch? Meine ehrliche Antwort.`, skizze: "Zwei Argumente dafür, eines dagegen, und für wen es sich lohnt." },
      { titel: `Frag ${c.vor}: Was ich anders sehe`, hook: "Was ich an meiner Branche anders sehe.", skizze: "Eine Gewohnheit der Branche, die eigene Regel dagegen, ein Beispiel aus dem Alltag." },
    ],
  };
}
function hmPfSeriePersoenlich(c) {
  const kan = c.k0, k = c.kern || c.o0;
  const familieTabu = c.tabus.includes("Familie zeigen");
  const b = [];
  const cueFrei = c.cue.tag && !c.signaturMitCue;
  if (c.cue.anker && cueFrei) b.push({ titel: `Nach dem ${c.cue.anker}: was heute auffiel`, hook: /Grundbuch/i.test(c.cue.anker) ? "Was heute im Grundbuch stand, und was es bedeutet." : `${c.cue.tag || "Heute"}, ${c.cue.zeit || "nach dem Termin"}. Eine Sache, die mir aufgefallen ist.`, skizze: `Direkt nach dem Termin (${c.cue.text}), 60 Sekunden, ein Gedanke, ohne Namen und Objektdaten.` });
  if (c.herkunft.text) b.push({ titel: `Aufgewachsen in ${c.herkunft.ort || k}`, hook: c.herkunft.immo && hmPfWoerter(c.herkunft.immo) <= 12 ? c.herkunft.immo : `Warum ich ${c.herkunft.ort || k} nicht nur von Besichtigungen kenne.`, skizze: `Ein Ort aus der Kindheit, ein Satz zur ersten Berührung mit Immobilien, in eigenen Worten: „${hmPfOhnePunkt(c.herkunft.text)}.“${familieTabu ? " Familie wird erzählt, nie gezeigt." : ""}` });
  if (c.unity.length) b.push({ titel: `${c.fem ? "Eine" : "Einer"} von ihnen: ${c.unity[0]}`, hook: `Warum ich ${c.o0} nicht nur beruflich kenne.`, skizze: `Ein Termin im eigenen Umfeld (${hmPfListe(c.unity)}), gefilmt nur mit Einverständnis der anderen.` });
  if (c.fehler && c.privat.includes("Fehler und Learnings")) b.push({ titel: "Was ich heute anders mache", hook: "Ein Fehler, den ich nicht noch einmal mache.", skizze: c.pratfallOk ? `In eigenen Worten: „${hmPfOhnePunkt(c.fehler)}.“ Erst nach drei Belegen online (Pratfall-Regel).` : `In eigenen Worten: „${hmPfOhnePunkt(c.fehler)}.“ Gesperrt, bis drei Belege online sind (Pratfall-Regel).` });
  if (c.privat.includes("Team und Büro")) b.push({ titel: `Ein ${c.cue.tag || "Montag"} im Büro`, hook: "So sieht mein Büro aus, bevor die Termine beginnen.", skizze: "Team, Kaffee, der Plan für die Woche. 30 Sekunden, ohne Kundendaten auf Bildschirmen." });
  if (c.privat.includes("Sport und Hobby")) b.push({ titel: "Nach Feierabend", hook: "Was ich mache, wenn keine Besichtigung ansteht.", skizze: `Das Hobby als Brücke ins Grätzl ${k}, 30 Sekunden, kein Objekt im Bild.` });
  b.push({ titel: `Mein ${k}`, hook: `Mein Lieblingsort ${c.inK}, und warum.`, skizze: "Ein Ort, ein Satz, warum er für Käufer zählt. Im Gehen gedreht." });
  const name = cueFrei && c.cue.zeit ? `${c.cue.tag}, ${c.cue.zeit}` : c.herkunft.ort ? `Aus ${c.herkunft.ort}` : `Mein ${k}`;
  return {
    name,
    idee: cueFrei ? `Fester Termin, feste Serie: ${c.cue.text}, danach 60 Sekunden aus dem Alltag. Der Termin ist der Anker, damit die Serie nicht vom Vorsatz abhängt.${familieTabu ? " Grätzl und Arbeit ja, Familie nie im Bild." : ""}` : `Persönlich heißt hier: Herkunft, Grätzl und Alltag, nicht Privatleben.${c.herkunft.ort ? ` Der rote Faden ist ${c.herkunft.ort}: dort aufgewachsen, dort zu Hause.` : ""}${familieTabu ? " Familie wird erzählt, nie gezeigt." : ""}`,
    ablauf: ["Handy liegt bereit, ein Satz ist vorbereitet.", `60 Sekunden, ein Gedanke, ein Ort aus ${k}.`, "Kein Schnitt außer Anfang und Ende, Untertitel automatisch, das Team prüft Namen.", "Gleicher Bildausschnitt jede Woche, damit das Format wiedererkannt wird."],
    hookFormel: cueFrei ? `${c.cue.tag}, ${c.cue.zeit || "nach dem Termin"}. [Eine Beobachtung aus dem Alltag].` : c.herkunft.ort ? `[Ort in ${c.herkunft.ort}]. [Was er mit meiner Arbeit zu tun hat].` : "[Ort in meinem Grätzl]. [Warum er zählt].",
    beispiele: b.slice(0, 3),
  };
}
function hmPfSerieBeweise(c) {
  const k = c.kern || c.o0, kan = c.k0;
  const schluessel = (x) => { const w = hmPfS(x.teile[0]).split(" "); return (w[0] || "") + " " + (w[1] || "").slice(0, 6); };
  const quellen = [];
  [...c.belege, ...c.abschl].forEach((x) => { if (!/^[A-ZÄÖÜ]/.test(x.satz)) return; if (quellen.some((y) => schluessel(y) === schluessel(x))) return; quellen.push(x); });
  const leise = c.erfolge <= 2;
  const fall = (x) => {
    const t = x.teile; const obj = t[0] || "Ein Abschluss";
    const dauer = (x.satz.match(/(\d+)\s*(Wochen|Tage|Monate)/) || [])[0];
    const proz = (x.satz.match(/(\d+)\s*Prozent über[^,.]*/) || [])[0];
    const titel = dauer ? `${obj}: ${dauer}` : proz ? `${obj}: ${proz}` : obj;
    let grund = t.slice(1).find((z) => /entscheidend|Ausschlag|kam über|über (Instagram|Facebook|LinkedIn|TikTok|den Notar|die Website)|Empfehlung|Bestandskund|Diskretion/i.test(z)) || "";
    if (/^Empfehlung$/i.test(grund)) grund = "kam über eine Empfehlung"; else if (/^Bestandskundin$/i.test(grund)) grund = "eine Kundin kam zurück"; else if (/^Bestandskunde$/i.test(grund)) grund = "ein Kunde kam zurück";
    const hook = dauer ? `${obj}, ${dauer}. So lief es.` : proz ? `${proz}. Wie das zustande kam.` : grund ? `${obj}: ${grund}.` : `${obj}. Was den Ausschlag gab.`;
    return { titel, hook, skizze: `Zeitachse in sechs Kacheln, in eigenen Worten: „${hmPfOhnePunkt(x.satz)}.“ Ausgangslage, Entscheidung, Dauer, Ergebnis. Namen und Adresse nur mit Freigabe.` };
  };
  const b = quellen.slice(0, 3).map(fall);
  if (c.kundensatz && b.length < 3) b.push({ titel: "Was Kunden sagen", hook: `„${hmPfOhnePunkt(c.kundensatz)}.“`, skizze: "Der Satz aus der Kundennachricht, wörtlich, mit Datum und Freigabe. Dazu ein Bild vom Ort, nicht von der Person." });
  while (b.length < 3) b.push({ titel: hmPfLuecke("ein Beleg mit Zahl, Ort und Zeitraum"), hook: "[Zahl], [Ort], [Zeitraum]. So lief es.", skizze: "Wird aus den Belegen der letzten 24 Monate gebaut, sobald sie vorliegen." });
  const name = ["kenner", "fels"].includes(c.aid) ? `Fallakte ${k}` : c.aid === "gestalter" ? "Vorher, nachher, verkauft" : c.aid === "entdecker" ? `Verkauft ${c.inK}` : "Schlüsselmoment";
  return {
    name,
    idee: `Ein abgeschlossener Fall aus ${c.ortText} pro Folge, erzählt als Ablauf statt als Erfolgsmeldung: Ausgangslage, Entscheidung, Dauer, Ergebnis.${leise ? " Weil du ungern über Erfolge sprichst, erzählt der Ablauf, nicht das Lob." : ""}`,
    ablauf: ["Einen Fall wählen, dessen Ablauf für andere lehrreich ist.", "Freigabe des Kunden einholen oder vollständig anonymisieren.", "Sechs Kacheln oder 45 Sekunden: Ausgangslage, Entscheidung, Dauer, Ergebnis, was es gezeigt hat, eine Frage.", "Energiekennzahlen nennen, wenn das Objekt gezeigt wird (EAVG)."],
    hookFormel: "[Objekt], [Zahl]. So lief es.",
    beispiele: b.slice(0, 3),
  };
}
function hmPfSaeulen(c) {
  const basis = (c.w && c.w.saeulen) || { markt: 30, wissen: 25, meinung: 15, persoenlich: 15, beweise: 15 };
  let ids = Object.keys(basis).filter((k) => basis[k] >= 10).sort((x, y) => basis[y] - basis[x]);
  if (!ids.includes("wissen")) ids.push("wissen");
  ids = ids.slice(0, 5);
  if (ids.length < 4) ["markt", "wissen", "persoenlich", "beweise", "meinung"].forEach((k) => { if (ids.length < 4 && !ids.includes(k)) ids.push(k); });
  const anteile = {}; ids.forEach((k) => { anteile[k] = basis[k] || 10; });
  if (anteile.wissen < 15) anteile.wissen = 15;
  const summe = ids.reduce((n, k) => n + anteile[k], 0);
  ids.forEach((k) => { anteile[k] = Math.round((anteile[k] / summe) * 100); });
  const diff = 100 - ids.reduce((n, k) => n + anteile[k], 0); anteile[ids[0]] += diff;
  const bau = { markt: hmPfSerieMarkt, wissen: hmPfSerieWissen, meinung: hmPfSerieMeinung, persoenlich: hmPfSeriePersoenlich, beweise: hmPfSerieBeweise };
  const fmt = { markt: ["carousel", "spaziergang", "talking"], wissen: ["qa", "talking", "carousel"], meinung: ["talking", "qa"], persoenlich: ["spaziergang", "behind", "talking"], beweise: ["carousel", "walkthrough", "behind"] };
  const zweck = {
    markt: (x) => `Kompetenz vor Ort zeigen: ${x.cepWer} sehen, dass sich ${x.vor} ${x.inK} auskennt, mit Zahlen und Straßennamen. Anlass: ${x.cep0.frage}`,
    wissen: () => "Integrität sichtbar machen: Ablauf, Kosten und Grenzen offen legen. In Österreich hält die Mehrheit die Maklerarbeit für unsichtbar (IS24).",
    meinung: (x) => `Haltung zeigen, an der man ${x.vor} erkennt und von anderen unterscheidet.`,
    persoenlich: (x) => `Nähe über Herkunft, Grätzl und Alltag. ${x.fem ? "Sie" : "Er"} ist Mensch, nicht Inserat.`,
    beweise: () => "Belege statt Behauptungen: abgeschlossene Fälle mit Zahl, Ort und Zeitraum.",
  };
  const frage = { markt: (x) => x.kaeufer ? `Was bekomme ich ${x.inK} für mein Budget?` : `Was ist ${x.obj.length ? HM_PF_ART.ein[x.obj0.g] + " " + x.obj0.typ : "eine Wohnung"} ${x.inK} heute wert?`, wissen: (x) => (HM_PF_HINDERNIS[x.hindernis[0]] ? { "Provision": "Was kostet der Makler, und was bekomme ich dafür?", "Bindungsdauer": "Worauf lasse ich mich mit dem Auftrag ein?", "Zweifel am Preis": "Woher kommt dieser Preis?", "Schlechte Erfahrung mit Maklern": "Was passiert nach der Unterschrift?", "Wollten selbst verkaufen": "Warum nicht selbst verkaufen?", "Anderer Makler war schon im Gespräch": "Wem glaube ich?" }[x.hindernis[0]] : "Wie läuft das mit einem Makler ab?"), meinung: (x) => x.abgeraten ? "Muss ich jetzt verkaufen?" : "Was denkt jemand, der den Markt kennt?", persoenlich: (x) => `Wer ist ${x.vor}, und passt ${x.fem ? "sie" : "er"} zu mir?`, beweise: () => "Hat das bei anderen funktioniert?" };
  const proWoche = (c.a.zeit === "Bis 2 Stunden") ? 3 : 4;
  const proMonat = proWoche * 4;
  const tagListe = c.tage.length ? c.tage : c.cue.tag ? [c.cue.tag] : [];
  return ids.map((id, i) => {
    const tagDefault = tagListe.length ? tagListe[i % tagListe.length] : "";
    const serie = bau[id](c);
    const n = Math.max(1, Math.round((anteile[id] / 100) * proMonat));
    const freq = n >= 7 ? "Zweimal pro Woche" : n >= 5 ? "Wöchentlich, in manchen Wochen zweimal" : n >= 4 ? "Wöchentlich" : n >= 2 ? "Alle zwei Wochen" : "Einmal im Monat";
    const tag = id === "persoenlich" && c.cue.tag && !c.signaturMitCue ? `${HM_PF_TAG_ADV[c.cue.tag]} ${c.cue.anker ? "nach dem " + c.cue.anker : c.cue.zeit}` : tagDefault ? HM_PF_TAG_ADV[tagDefault] : "";
    const kan = c.kanaele.map((k) => HM_PF_KANALNAME[k] || k);
    serie.rhythmus = `${freq}${tag ? ", " + tag : ""}, auf ${kan[0]}${kan[1] ? ", Zweitverwertung auf " + hmPfListe(kan.slice(1)) : ""}. Etwa ${n} ${n === 1 ? "Beitrag" : "Beiträge"} im Monat.`;
    const formate = [...new Set(fmt[id].filter((f) => c.formateErlaubt.includes(f)))].slice(0, 2);
    return { id, name: (typeof HM_SAEULEN !== "undefined" && HM_SAEULEN[id] ? HM_SAEULEN[id].name : id), zweck: zweck[id](c), frage: frage[id](c), anteil: anteile[id], formate: formate.length ? formate : [hmPfFormat(c, fmt[id])], serie };
  });
}

/* ---------- 7. Botschaften, Story, Beweise ---------- */
function hmPfStory(c, pos, versprechen) {
  if (c.leer) { const l = hmPfLuecke("deine Geschichte, sobald Fragebogen und Workshop stehen."); return { herkunft: l, spannung: l, wendepunkt: l, haltung: l, versprechen: l, kurz: l, mittel: l, lang: l }; }
  const seitP = hmPfSeitPhrase(c.seit), wegP = hmPfWegPhrase(c.herkunftWeg);
  const herkunft = c.herkunft.text || (seitP || wegP ? hmPfPunkt(`Ich bin ${seitP || "heute"} ${c.Makler}${wegP ? ", " + wegP : ""}`) : hmPfLuecke("wo du aufgewachsen bist und wie du zu Immobilien kamst."));
  const h = HM_PF_HINDERNIS[c.hindernis[0]];
  const spannung = `${c.cep0.spannung}${h ? " " + h.satz : ""}`;
  const wendepunkt = c.wendepunkt ? c.wendepunkt : hmPfLuecke("der Moment, in dem du fast aufgehört hättest, und was dich umgedreht hat.");
  const abgIch = c.abgeraten ? hmPfSaetze(c.abgeraten).map((s, i) => (i === 0 ? hmPfIch(s) : s)).join(" ") : "";
  const haltung = `${c.figur.haltung(c)}${abgIch ? " " + abgIch : ""}`;
  const heute = c.kaeufer ? `Heute begleite ich Käufer in ${c.ortText}${c.phasen.includes("Erste Wohnung") ? ", oft beim ersten Kauf" : ""}.` : `Heute verkaufe ich ${c.objText} in ${c.ortText}.`;
  const nachsatz = c.abgeraten ? (c.warten ? "Und ich sage auch, wenn Warten mehr bringt." : "Und ich rate ab, wenn ein Verkauf gerade nicht passt.") : c.kundensatz ? `Eine Kundin, ein Kunde hat es so gesagt: „${hmPfOhnePunkt(c.kundensatz)}.“` : "";
  const herkunftKurz = c.herkunft.text ? (c.herkunft.ort && c.herkunft.immo && !c.herkunft.immo.startsWith("Ich bin in") ? `Aufgewachsen in ${c.herkunft.ort}. ${c.herkunft.immo}` : hmPfSaetze(c.herkunft.text)[0]) : herkunft;
  const kurz = [herkunftKurz, heute, nachsatz].filter((x) => x && !hmPfIstLuecke(x)).join(" ");
  const beleg = c.belege[0] ? `Zuletzt: ${c.belege[0].satz}` : c.abschl[0] ? `Zuletzt: ${c.abschl[0].satz}` : "";
  const mittel = [c.herkunft.text || herkunft, heute, c.wendepunkt, c.figur.haltung(c), abgIch, !abgIch ? beleg : ""].filter((x) => x && !hmPfIstLuecke(x)).join(" ");
  const menschen = c.unity.length ? `Viele meiner Kunden kenne ich nicht nur beruflich: ${hmPfListe(c.unity)}.` : "";
  const belegLang = c.belege.length ? `Was ich einem skeptischen Verkäufer zeigen würde: ${c.belege.map((b) => hmPfOhnePunkt(b.satz)).join(". ")}.` : "";
  const lang = [herkunft, seitP && c.herkunft.text ? hmPfPunkt(`Makler bin ich ${seitP}${wegP ? ", " + wegP : ""}`) : "", spannung, c.wendepunkt ? c.wendepunkt : "[Kommt aus dem Workshop: Wendepunkt]", haltung, belegLang, menschen, versprechen].filter(Boolean).join(" ");
  return { herkunft, spannung, wendepunkt, haltung, versprechen, kurz, mittel, lang };
}
function hmPfBotschaften(c, pos, story) {
  if (c.leer) { const l = hmPfLuecke("Botschaften, sobald der Fragebogen beantwortet ist."); return { claim: l, claimAlternativen: [], einSatz: l, dreiSaetze: l, ueberMich: l, boilerplate: l }; }
  const was3 = c.kaeufer ? `begleitet Käufer in ${c.ortText}` : `verkauft ${c.objText} in ${c.ortText}`;
  const einSatz = `${c.name} ${was3}${c.warten ? " und sagt auch, wann man besser wartet" : c.abgeraten ? " und rät ab, wenn ein Verkauf nicht passt" : ""}.`;
  const beleg = c.belege[0] ? `Belegt: ${c.belege[0].satz}` : c.abschl[0] ? `Zuletzt: ${c.abschl[0].satz}` : hmPfLuecke("ein Beleg.");
  const dreiSaetze = `${einSatz} ${c.Er} ist ${c.der} ${c.Makler}, ${c.der} ${pos.was}. ${beleg}`.replace(/\s+/g, " ");
  const seitP = hmPfSeitPhrase(c.seit);
  const cta = c.cepKeys.includes("Erbe") ? c.an("website", "Schreiben Sie mir, wenn Sie ein Haus geerbt haben und noch nicht wissen, was damit passieren soll.", "Schreib mir, wenn du ein Haus geerbt hast und noch nicht weißt, was damit passieren soll.") : c.kaeufer ? c.an("website", "Schreiben Sie mir, wonach Sie suchen. Ich antworte am selben Werktag.", "Schreib mir, wonach du suchst. Ich antworte am selben Werktag.") : c.an("website", `Schreiben Sie mir, wenn Sie wissen wollen, wo ${HM_PF_ART.Ihr[c.obj0.g]} ${c.obj0.typ} heute steht.`, `Schreib mir, wenn du wissen willst, wo ${HM_PF_ART.dein[c.obj0.g]} ${c.obj0.typ} heute steht.`);
  const ueberMich = [story.kurz, c.figur.haltung(c), cta].filter(Boolean).join(" ");
  const weg3 = hmPfWegPhrase3(c.herkunftWeg);
  const boilerplate = `${c.name} ist ${c.Makler} in ${c.ortText} mit Schwerpunkt ${c.objText}.${seitP ? ` ${c.Er} ist ${seitP} in der Branche${weg3 ? " und kommt " + weg3 : ""}.` : ""} ${beleg}`.replace(/\s+/g, " ").trim();
  return { claim: c.claim, claimAlternativen: c.claimAlt, einSatz, dreiSaetze, ueberMich, boilerplate };
}
function hmPfBeweise(c) {
  const out = [];
  c.belege.forEach((b) => {
    const obj = b.teile[0] || "Ergebnis";
    const d = (b.satz.match(/(\d+)\s*(Wochen|Tage|Monate)/) || [])[0], p = (b.satz.match(/(\d+)\s*Prozent über[^,.]*/) || [])[0], n = b.satz.match(/(\d+)\s*Abschlüsse\s*(\d{4})?/);
    const beh = d ? `${obj}: verkauft in ${d}` : p ? `${obj}: ${p}` : n ? `${n[1]} Abschlüsse${n[2] ? " im Jahr " + n[2] : ""}` : obj;
    out.push({ behauptung: beh, beleg: b.satz, quelle: "Fragebogen, Belege aus 24 Monaten (vor Veröffentlichung mit Unterlagen prüfen)" });
  });
  if (c.abgeraten) out.push({ behauptung: "Rät ab, wenn ein Verkauf gerade nicht passt, auch gegen die eigene Provision", beleg: c.abgeraten, quelle: "Fragebogen, Deine Geschichte" });
  if (c.anteil && c.kern) out.push({ behauptung: `Kennt ${c.kern} aus eigenen Abschlüssen`, beleg: `${c.anteil} der letzten zehn Abschlüsse lagen dort.`, quelle: "Fragebogen, Grätzl-Anteil" });
  if (c.abschl.length) out.push({ behauptung: `Verkauft ${c.objText} in ${c.ortText}`, beleg: c.abschl.map((x) => x.satz).join(" "), quelle: "Fragebogen, letzte drei Abschlüsse" });
  const gef = c.gefuehl.length ? hmPfListe(c.gefuehl.map((g) => g.toLowerCase())) : "gut beraten";
  const zitat = c.zitate.find((z) => /gedrängt|gefühlt|gesagt|beraten|sicher|verstanden|nie|immer/i.test(z));
  if (c.kundensatz) out.push({ behauptung: `Kunden fühlen sich ${gef}`, beleg: `„${hmPfOhnePunkt(c.kundensatz)}.“`, quelle: "Kundennachricht, wörtlich (Freigabe einholen)" });
  else if (zitat) out.push({ behauptung: `Kunden fühlen sich ${gef}`, beleg: `„${hmPfOhnePunkt(zitat)}.“ (eigene Wiedergabe im Workshop)`, quelle: "Workshop-Mitschrift. Fremdbild steht aus: ein Kundensatz wörtlich." });
  else out.push({ behauptung: `Kunden fühlen sich ${gef}`, beleg: hmPfLuecke("ein Satz aus einer echten Kundennachricht, wörtlich."), quelle: "fehlt" });
  if (!out.length) out.push({ behauptung: hmPfLuecke("deine stärkste Behauptung"), beleg: hmPfLuecke("Zahl, Ort, Zeitraum."), quelle: "fehlt" });
  return out;
}
function hmPfKonzepte(c, saeulen) {
  const s = (id) => saeulen.find((x) => x.id === id);
  const kan = c.kanaele.map((k) => HM_PF_KANALNAME[k] || k);
  const kanal = hmPfListe(kan.slice(0, 2));
  const k = c.kern || c.o0;
  const tagSlot = c.cue.text || (c.tage[0] ? `${c.tage[0]} Vormittag` : "ein fester Tag pro Woche");
  const launch = {
    name: `${hmPfOhnePunkt(c.claim)}: die ersten 30 Tage`,
    idee: `Der erste Monat erzählt eine Sache: ${c.vor} ist ${c.der} ${c.Makler}, ${c.der} ${c.figur.was(c)}. Erst Haltung und Belege, dann der Alltag. So steht die Kompetenz, bevor Persönliches kommt.`,
    warum: "Kompetenz vor Verletzlichkeit: Wer zuerst Belege zeigt, darf später Fehler erzählen (Pratfall, Aronson 1966). Wiederholung mit Variation baut Vertrautheit auf (Bornstein 1989). Ein fester Wochenanker macht aus Vorsatz Gewohnheit (Gollwitzer und Sheeran 2006, d = 0,65).",
    umsetzung: [
      `Tag 1: Profil umstellen. Bio „${c.Makler} für ${c.objText} in ${c.ortText}. ${c.claim}“, Porträt im gleichen Bildausschnitt, Link zur Website.`,
      `Tag 2: Launch-Beitrag mit der Story in mittlerer Länge auf ${kan[0]}, ${c.formateErlaubt.includes("talking") ? "als Talking Head" : "als Carousel"}.`,
      `Woche 1: „${s("wissen") ? s("wissen").serie.beispiele[0].titel : "Wie ich arbeite"}“ und „${s("markt") ? s("markt").serie.beispiele[0].titel : "der erste Marktbeitrag"}“.`,
      `Woche 2: der erste Beleg aus „${s("beweise") ? s("beweise").serie.name : "den Abschlüssen"}“, dazu die erste Folge von „${c.figur.signatur(c)}“.`,
      `Woche 3: die erste Folge von „${s("persoenlich") ? s("persoenlich").serie.name : "Persönlich"}“, danach eine Frage an die Community.`,
      "Woche 4: Rückblick in Zahlen (Reichweite, Speichern, Weiterleiten, Anfragen), danach der Plan für Monat 2.",
    ],
    kanal,
  };
  const signatur = {
    name: c.figur.signatur(c),
    idee: c.figur.signaturIdee(c),
    warum: "Wiedererkennbarkeit entsteht aus Wiederholung: gleiches Format, gleicher Satz, gleicher Tag (Distinctive Assets, Romaniuk 2018; Mere Exposure, Bornstein 1989). Das Gesicht ist das stärkste Zeichen, die Farbe das schwächste.",
    umsetzung: [`Fester Slot: ${tagSlot}.`, "Vorlage einmal bauen: Bildausschnitt, Texteinblendung, Schlusssatz.", "Zehn Themen vorab als Liste, damit keine Woche leer bleibt.", "Nach zwölf Wochen auswerten: Weiterleitungen und Speichern je Reichweite, danach schärfen oder ersetzen."],
    kanal,
  };
  const unityOrt = (c.unity.map((u) => (u.match(/\b(?:im|in der|beim|am)\s+(.+)$/) || [])[0]).find(Boolean)) || "";
  let community;
  if (["kenner", "fels", "begleiter"].includes(c.aid)) {
    const notar = /Notar/i.test(c.a.abschluesse + " " + c.ideal);
    community = {
      name: `Runder Tisch ${k}: ${c.cep0.abend}`,
      idee: `Einmal im Quartal ein Abend mit ${c.cep0.partner} für ${c.cepWer} in ${c.ortText}. Keine Verkaufsveranstaltung, sondern die Fragen, die vor jeder Entscheidung stehen.`,
      warum: `${notar ? "Ein Abschluss kam schon über den Notar, und das Ziel lautet: „" + c.ideal + "“. Partner, denen Kunden ohnehin vertrauen, übertragen Vertrauen. " : "Partner, denen Kunden ohnehin vertrauen, übertragen Vertrauen. "}${c.unity.length ? `Der Ort liegt im eigenen Umfeld (${hmPfListe(c.unity)}): geteilte Zugehörigkeit ist ein starkes Vertrauenssignal (Cialdini, Unity, Evidenz mittel).` : "Der Ort liegt im Grätzl, nicht im Büro."}`,
      umsetzung: [`Zwei Partner im Bezirk gewinnen und den Abend gemeinsam mit ${c.cep0.partner} planen.`, `Ort wählen${unityOrt ? ", etwa " + unityOrt : ` ${c.inK}`}, höchstens 20 Plätze.`, "Einladung über LinkedIn, Newsletter und die Partner, drei Fragen vorab sammeln.", "Am Abend die drei Fragen beantworten, danach als Carousel-Serie verwerten, ohne Namen.", "Teilnehmer nur mit Einverständnis zeigen."],
      kanal: `Vor Ort, danach ${hmPfListe([...kan.slice(0, 2), "Newsletter"])}`,
    };
  } else if (c.aid === "gestalter") {
    community = {
      name: `Offene Baustelle ${k}`,
      idee: `Mit einer Tischlerei, einem Architekturbüro oder einer Malerin aus ${k} ein Objekt vom Rohzustand bis zur Übergabe zeigen. Jeder Partner bekommt eine eigene Folge.`,
      warum: "Handwerk aus dem Grätzl macht die Veränderung glaubwürdig und bringt die Reichweite der Partner mit (Kollaboration auf Instagram, bis zu drei Partner je Beitrag).",
      umsetzung: ["Drei Betriebe aus dem Grätzl anfragen.", "Ein Objekt mit sichtbarem Potenzial wählen.", "Je Partner eine Folge, als Collaborator-Beitrag veröffentlicht.", "Zum Abschluss eine Besichtigung mit allen Partnern."],
      kanal: `${kanal}, Kollaboration mit den Partnern`,
    };
  } else {
    const str = c.strassen.filter((x) => x !== c.kern).slice(0, 3);
    community = {
      name: `Grätzl-Partner ${k}`,
      idee: `Drei Betriebe ${c.ausK}${str.length ? ` (${hmPfListe(str)})` : ""} werden je eine Folge: Bäckerei, Café, Werkstatt. Daraus entsteht eine Grätzl-Karte für Käufer, gedruckt und digital.`,
      warum: `Käufer entscheiden über das Grätzl, bevor sie die Wohnung sehen. Lokale Partner teilen die Beiträge in ihre Community.${c.unity.length ? ` ${c.vor} ist selbst ${c.fem ? "eine" : "einer"} von ihnen (${hmPfListe(c.unity)}), das trägt die Serie (Cialdini, Unity, Evidenz mittel).` : ""}`,
      umsetzung: ["Drei Betriebe ansprechen, persönlich, nicht per Mail.", "Je Betrieb eine Folge im Gehen, 60 Sekunden, Partner als Collaborator.", "Grätzl-Karte als PDF und Aushang bei den Partnern, mit QR-Code zur Website.", "Nach drei Monaten ein Grätzl-Frühstück mit allen Partnern und Kunden."],
      kanal: `${kanal}, Aushang im Grätzl`,
    };
  }
  return [launch, signatur, community];
}
function hmPfStart30(c, saeulen) {
  const proWoche = (c.a.zeit === "Bis 2 Stunden") ? 3 : 4;
  const q = {}; saeulen.forEach((s) => { q[s.id] = s.serie.beispiele.map((b) => ({ titel: b.titel, saeule: s.id, format: s.formate[0] })); });
  const soll = {}; saeulen.forEach((s) => { soll[s.id] = s.anteil / 100; });
  const genutzt = {}; saeulen.forEach((s) => { genutzt[s.id] = 0; });
  let gesamt = 0;
  const launchSaeule = saeulen.find((s) => s.id === (c.abgeraten ? "meinung" : "persoenlich")) ? (c.abgeraten ? "meinung" : "persoenlich") : saeulen[0].id;
  const wochen = [];
  for (let wk = 1; wk <= 4; wk++) {
    const n = wk === 1 ? Math.max(3, proWoche - 1) : proWoche;
    const beitraege = [];
    if (wk === 1) { beitraege.push({ titel: c.abgeraten ? "Warum ich so arbeite: die Geschichte in 90 Sekunden" : `Wer ich bin, in 90 Sekunden`, saeule: launchSaeule, format: hmPfFormat(c, ["talking", "carousel"]) }); genutzt[launchSaeule]++; gesamt++; }
    const vorrang = wk <= 2 ? ["wissen", "markt", "beweise", "meinung", "persoenlich"] : [];
    while (beitraege.length < n) {
      const offen = saeulen.map((s) => s.id).filter((id) => q[id].length && !beitraege.some((b) => b.saeule === id));
      const kandidaten = offen.length ? offen : saeulen.map((s) => s.id).filter((id) => q[id].length);
      if (!kandidaten.length) break;
      kandidaten.sort((x, y) => {
        const vx = vorrang.indexOf(x), vy = vorrang.indexOf(y);
        const dx = soll[x] * (gesamt + 1) - genutzt[x], dy = soll[y] * (gesamt + 1) - genutzt[y];
        if (wk <= 2 && vx !== vy) return (vx < 0 ? 9 : vx) - (vy < 0 ? 9 : vy);
        return dy - dx;
      });
      /* Pratfall: persönliche Fehlergeschichten nie in Woche 1 und 2 */
      const id = kandidaten.find((x) => !(wk <= 2 && x === "persoenlich" && /Fehler|anders mache/.test((q[x][0] || {}).titel || ""))) || kandidaten[0];
      beitraege.push(q[id].shift()); genutzt[id]++; gesamt++;
    }
    wochen.push({ woche: wk, beitraege });
  }
  return wochen;
}
function hmPfVisuell(c) {
  const bp = c.a.bildpaare || {};
  const welten = (typeof window !== "undefined" && Array.isArray(window.HM_MARKENWELTEN) && window.HM_MARKENWELTEN.length) ? window.HM_MARKENWELTEN : null;
  const ids = welten ? welten.map((x) => x.id) : HM_PF_WELT_IDS;
  const aff = {
    ruhig: { arch: { kenner: 3, fels: 2, begleiter: 2 }, bp: { bp1: "a", bp3: "b", bp5: "b", bp6: "b" }, mil: ["kons", "post"] },
    klar: { arch: { kenner: 3, fels: 2, gestalter: 1 }, bp: { bp1: "b", bp2: "b", bp4: "b", bp5: "b" }, mil: ["perf"] },
    editorial: { arch: { gestalter: 3, kenner: 2, entdecker: 1 }, bp: { bp1: "a", bp4: "b", bp6: "b" }, mil: ["exp", "kons"] },
    graetzl: { arch: { entdecker: 3, gastgeber: 3, begleiter: 1 }, bp: { bp3: "a", bp6: "a", bp4: "a" }, mil: ["mitte", "neo", "nost"] },
    warm: { arch: { gastgeber: 3, begleiter: 3 }, bp: { bp2: "a", bp5: "a", bp6: "a", bp4: "a" }, mil: ["mitte", "nost", "post"] },
    kontrast: { arch: { fels: 3, gestalter: 2 }, bp: { bp1: "b", bp4: "b", bp5: "b" }, mil: ["perf", "exp"] },
  };
  const score = (id) => {
    const f = aff[id] || aff[String(id).replace("ä", "ae")] || { arch: {}, bp: {}, mil: [] };
    let s = (f.arch[c.aid] || 0) * 3;
    Object.keys(f.bp).forEach((k) => { if (bp[k] === f.bp[k]) s += 1; });
    (c.a.milieus || []).forEach((m) => { if (f.mil.includes(m)) s += 1; });
    const wObj = welten && welten.find((x) => x.id === id);
    if (wObj && (wObj.passtZu || []).includes(c.aid)) s += 3;
    return s;
  };
  /* Vorrang: der Vorschlag aus wb-markenwelten.jsx, damit Plattform und Markenbuch dieselbe Welt zeigen */
  let welt = null, weltObj = null;
  if (typeof window !== "undefined" && typeof window.hmWeltVorschlag === "function") {
    try {
      let b = { aid: c.aid };
      try { if (typeof hmBrand === "function" && c.q.mid) b = { ...hmBrand(c.q.mid), aid: c.aid }; } catch (e) { b = { aid: c.aid }; }
      const v = window.hmWeltVorschlag(b, c.a, c.aid);
      if (v && v.id) { welt = v.id; weltObj = v.welt || (welten && welten.find((x) => x.id === v.id)) || null; }
    } catch (e) { welt = null; }
  }
  if (!welt) { welt = ids.slice().sort((x, y) => score(y) - score(x))[0] || "ruhig"; weltObj = welten && welten.find((x) => x.id === welt); }
  const k = c.kern || c.o0;
  const akzent = (typeof HM_WEB_AKZENTE !== "undefined" && c.branding.akzent) ? (HM_WEB_AKZENTE.find((x) => x.id === c.branding.akzent) || {}).name : "";
  const ideeText = {
    ruhig: `Ruhe als Zeichen: viel Fläche, ein Motiv pro Bild, ${akzent || "die Akzentfarbe"} nur für die eine Zahl, die zählt. ${k} im Tageslicht, nie als Postkarte.`,
    klar: `Das Haus als Dokument: Fassade, Plan, Zahl. Alles lesbar, nichts dekoriert. ${k} so gezeigt, wie ein Gutachten es sehen würde.`,
    editorial: `Wie eine Zeitungsseite über ${k}: große Headline, ein Foto, eine These.`,
    graetzl: `Das Grätzl ist die Bühne: Straßen, Geschäfte, Menschen ${c.ausK}, ${c.vor} mittendrin.`,
    warm: `Nähe im Bild: Hände, Tische, Abendlicht, ${c.vor} im Gespräch statt vor der Fassade.`,
    kontrast: "Klartext in Hell und Dunkel, eine Akzentfarbe, harte Schnitte, kein Filter.",
  }[welt] || (weltObj && weltObj.idee) || "";
  const BP = {
    bp1: { a: "Altbau-Details statt Fassaden-Totale: Stiegenhaus, Stuck, Kastenfenster.", b: "Klare Linien: Glas, Beton, Licht auf Flächen." },
    bp2: { a: "Hände und Gespräche am Tisch, echte Situationen statt gestellter Handschläge.", b: "Zahlen und Pläne im Bild: Grundriss, Auszug, Bildschirm, immer lesbar." },
    bp3: { a: "Straßenleben: Markt, Café, Hof am Samstag.", b: "Ruhige Eingänge, Stiegenhaus, Lobby, ohne Menschen." },
    bp4: { a: "Handschrift erlaubt: Notizen, Skizzen, eine Unterschrift.", b: "Klare Typografie: eine Schrift, eine große Zahl pro Bild." },
    bp5: { a: "Goldenes Abendlicht, warme Töne.", b: "Kühles Tageslicht, kein Filter, keine Abendstimmung." },
    bp6: { a: "Menschen im Bild, Kunden nur mit schriftlicher Freigabe.", b: "Räume ohne Menschen. Der einzige Mensch im Bild ist der Makler selbst." },
  };
  const regeln = ["Gesicht zuerst: gleicher Bildausschnitt in jedem Talking Head, Augen im oberen Drittel.", ...Object.keys(BP).filter((kk) => bp[kk]).map((kk) => BP[kk][bp[kk]])].slice(0, 6);
  if (regeln.length < 3) regeln.push("Echte Fotos aus dem eigenen Bestand, keine Symbolbilder.", "Ein Motiv pro Bild, viel Ruhe drumherum.");
  const motivObj = { invest: ["Gründerzeitfassade", "Stiegenhaus mit Originalgeländer", "Grundbuchauszug, geschwärzt"], neubau: ["Rohbau mit Kran", "Schlüsselübergabe im leeren Raum", "Grundriss mit Maßen"], haus: ["Einfahrt und Garten", "Küche mit Blick ins Grüne", "Grundstücksgrenze"], gewerbe: ["Schaufenster", "leere Fläche vor dem Umbau", "Grundriss mit Frequenz"], wohnung: ["Fenster mit Blick in die Straße", "Stiegenhaus", "Küche am Vormittag"] }[c.objGruppe];
  const motive = [...c.strassen.slice(0, 2).map((s) => `${s}, Straßenzug im Tageslicht`), `${motivObj[0]} ${c.inK}`, ...motivObj.slice(1), c.cue.anker ? `Der Weg vom ${c.cue.anker}` : "", c.herkunft.ort && c.herkunft.ort !== k ? `${c.herkunft.ort}, ein Ort aus der Kindheit` : ""].filter(Boolean).slice(0, 6);
  const tabuBild = { "Familie zeigen": "Familie im Bild, auch im Hintergrund", "Kunden erkennbar zeigen": "Erkennbare Kunden ohne schriftliche Freigabe", "Luxus zeigen": "Statussymbole: Autos, Uhren, Champagner", "Preise nennen": "Preise im Bild", "Politik": "Plakate und Parteisymbole im Hintergrund", "Konkurrenz kommentieren": "Schilder und Logos anderer Makler" };
  const vermeiden = [...c.tabus.map((t) => tabuBild[t]).filter(Boolean), "Symbolbilder: Handschlag, Schlüssel vor weißem Grund", "Drohnenflug ohne Bezug zum Objekt", "KI-generierte Menschen oder Räume ohne Kennzeichnung"];
  const assets = c.a.assets || [];
  const zeichenTeile = [];
  assets.forEach((x) => {
    if (x === "Ein Satz") zeichenTeile.push(`der Schlusssatz „${c.claim}“ am Ende jedes Videos`);
    if (x === "Eine Farbe") zeichenTeile.push(`${akzent || "eine Akzentfarbe"} als einzige Akzentfarbe`);
    if (x === "Ein Ort") zeichenTeile.push(`${k} als wiederkehrender Drehort`);
    if (x === "Eine Geste") zeichenTeile.push(`eine wiederkehrende Geste zum Einstieg ${`[${HM_PF_LUECKE}: welche]`}`);
    if (x === "Ein Gegenstand") zeichenTeile.push(`ein Gegenstand, der in jedem Video vorkommt [${HM_PF_LUECKE}: welcher]`);
    if (x === "Ein Kleidungsstück") zeichenTeile.push(`ein wiederkehrendes Kleidungsstück [${HM_PF_LUECKE}: welches]`);
  });
  const zeichen = zeichenTeile.length ? `${hmPfGross(hmPfListe(zeichenTeile))}. Dazu immer derselbe Bildausschnitt. Das Gesicht ist das stärkste Zeichen, die Farbe allein trägt nicht.` : `Derselbe Bildausschnitt und der Schlusssatz „${c.claim}“. Das Gesicht ist das stärkste Zeichen, die Farbe allein trägt nicht.`;
  if (weltObj && weltObj.bildsprache) {
    /* Die Welt liefert Leitbild, Bildregeln und Zeichen. Der Makler liefert Orte, Grenzen und sein eigenes Zeichen. */
    const bs = weltObj.bildsprache;
    const uniq = (l, n) => [...new Set(l.filter(Boolean))].slice(0, n);
    const strasse = c.strassen.find((x) => x !== c.kern);
    const konkret = c.kern || c.o0 ? ` Für ${c.vor} heißt das: ${c.kern || c.o0}${strasse ? " und die " + strasse : ""} als wiederkehrende Orte. ${regeln[1] || "Echte Orte statt Symbolbilder."}` : "";
    return {
      welt,
      idee: `${hmPfPunkt(weltObj.idee || ideeText)}${konkret}`,
      bildsprache: {
        regeln: uniq([...(bs.regeln || []), ...regeln.slice(0, 3)], 7),
        motive: uniq([...motive.slice(0, 3), ...(bs.motive || [])], 7),
        vermeiden: uniq([...c.tabus.map((t) => tabuBild[t]), ...(bs.vermeiden || []), ...vermeiden.slice(-3)], 7),
      },
      zeichen: `${weltObj.zeichen && weltObj.zeichen.name ? hmPfPunkt(weltObj.zeichen.name) + " " : ""}${zeichen}`,
    };
  }
  return { welt, idee: ideeText, bildsprache: { regeln, motive, vermeiden }, zeichen };
}

/* ---------- 8. Generator ---------- */
function hmPlattform(mid, opt) {
  opt = opt || {};
  const q = hmPfQuellen(mid, opt);
  const c = hmPfKontext(q);
  const einsicht = hmPfEinsicht(c);
  const positionierung = hmPfPositionierung(c);
  const versprechen = c.leer ? hmPfLuecke("dein Versprechen.") : c.figur.versprechen(c);
  const saeulen = hmPfSaeulen(c);
  const markt = saeulen.find((s) => s.id === "markt");
  const story = hmPfStory(c, positionierung, versprechen);
  const p = {
    version: 1, quelle: "regeln", erstellt: new Date().toISOString(),
    einsicht, positionierung, versprechen,
    rolle: { name: c.ideal ? hmPfGross(c.ideal) : c.figur.rolle(c), satz: c.leer ? hmPfLuecke("deine Rolle.") : c.figur.rolleSatz(c) },
    werte: hmPfWerte(c),
    persoenlichkeit: hmPfPersoenlichkeit(c),
    stimme: hmPfStimme(c, { markt1Hook: markt ? markt.serie.beispiele[0].hook : `${c.kern || c.o0}, heute.` }),
    botschaften: hmPfBotschaften(c, positionierung, story),
    story,
    beweise: hmPfBeweise(c),
    saeulen,
    konzepte: hmPfKonzepte(c, saeulen),
    start30: hmPfStart30(c, saeulen),
    visuell: hmPfVisuell(c),
    qualitaet: { gesamt: 0, kriterien: [], klischees: [], aehnlichkeit: 0 },
  };
  if (!opt.ohneQualitaet) p.qualitaet = hmMarkenQualitaet(p, mid, { kontext: c, andere: opt.andere });
  return p;
}

/* ---------- 9. Qualitätsprüfung ---------- */
const HM_PF_KLISCHEES = [
  ["Traumimmobilie", /traumimmobilie/i], ["Ihr Partner für", /\b(ihr|dein) partner für/i], ["mit Leidenschaft", /mit leidenschaft/i],
  ["kompetent und zuverlässig", /kompetent(e|es|er)? und zuverlässig/i], ["Immobilienprofi", /immobilienprofi/i], ["maßgeschneidert", /maßgeschneidert/i],
  ["rundum sorglos", /rundum.?sorglos/i], ["auf Augenhöhe", /auf augenhöhe/i], ["Mehrwert", /mehrwert/i], ["ganzheitlich", /ganzheitlich/i],
  ["individuelle Lösungen", /individuelle lösung/i], ["Ihr Zuhause ist unsere Mission", /zuhause ist unsere mission/i], ["seriös", /seriös/i],
  ["Experte an Ihrer Seite", /experte an (ihrer|deiner) seite/i], ["einzigartig", /einzigartig/i],
];
const HM_PF_FLOSKELN = [/traumwohnung/i, /einmalige gelegenheit/i, /revolutionär/i, /game.?changer/i, /aus einer hand/i, /\bluxus/i, /\bpremium/i, /hochwertig/i, /wohlfühl/i, /\bperfekt/i, /garantiert/i];
/* Alle Texte der Plattform mit Pfad; Negativbeispiele und Vermeiden-Listen zählen nicht */
function hmPfAlleTexte(p) {
  const out = [];
  const lauf = (v, pfad) => {
    if (v == null) return;
    if (typeof v === "string") { out.push({ pfad, text: v }); return; }
    if (Array.isArray(v)) { v.forEach((x, i) => lauf(x, `${pfad}[${i}]`)); return; }
    if (typeof v === "object") Object.keys(v).forEach((k) => {
      const pf = pfad ? `${pfad}.${k}` : k;
      if (["qualitaet", "quelle", "erstellt", "id", "welt", "format", "saeule", "gespeichert"].includes(k)) return;
      if (pf === "stimme.vermeiden" || (/^stimme\.beispiele\[\d+\]$/.test(pfad) && k === "nicht")) return;
      if (pfad.endsWith(".formate") || k === "formate") return;
      lauf(v[k], pf);
    });
  };
  lauf(p, "");
  return out;
}
/* Öffentliche Texte mit ihrem Kanal, für die Anrede-Prüfung */
function hmPfOeffentlich(p, c) {
  const k0 = c ? c.k0 : "instagram";
  const out = [];
  const add = (text, kontext, wo) => { if (text && !hmPfIstLuecke(text)) out.push({ text, kontext, wo }); };
  add(p.versprechen, "website", "Versprechen");
  add(p.botschaften && p.botschaften.ueberMich, "website", "Über mich");
  ["kurz", "mittel", "lang", "versprechen"].forEach((x) => add(p.story && p.story[x], "website", `Story ${x}`));
  ((p.stimme && p.stimme.beispiele) || []).forEach((b) => add(b.so, /Caption|Bio/.test(b.wo) ? (/LinkedIn/.test(b.wo) ? "linkedin" : /Instagram|TikTok|Facebook/.test(b.wo) ? "instagram" : k0) : /Website/.test(b.wo) ? "website" : "erstkontakt", b.wo));
  (p.saeulen || []).forEach((s) => { add(s.serie && s.serie.hookFormel, k0, `Hook-Formel ${s.serie.name}`); ((s.serie && s.serie.beispiele) || []).forEach((b) => add(b.hook, k0, `Hook ${b.titel}`)); });
  return out;
}
function hmPfDuFormen(t) { return /\b(du|dich|dir|dein|deine|deinen|deinem|deiner|deines)\b/i.test(t.replace(/„[^“]*“/g, "")); }
function hmPfSieFormen(t) { const s = t.replace(/„[^“]*“/g, ""); return /\b(Ihnen|Ihrem|Ihren|Ihrer|Ihres)\b/.test(s) || /[a-zäöüß,] (Sie|Ihr|Ihre)\b/.test(s); }
/* Markentexte: was die Marke ausdrückt. Methodentexte (Abläufe, Begründungen, Regeln) dürfen gleich sein. */
function hmPfMarkentexte(p) {
  const t = [];
  const push = (x) => { if (x && typeof x === "string" && !hmPfIstLuecke(x)) t.push(x); };
  Object.values(p.einsicht || {}).forEach(push); Object.values(p.positionierung || {}).forEach(push); push(p.versprechen);
  push(p.rolle && p.rolle.name); push(p.rolle && p.rolle.satz);
  (p.werte || []).forEach((w) => { push(w.verhalten); push(w.nie); });
  const b = p.botschaften || {}; [b.claim, b.einSatz, b.dreiSaetze, b.ueberMich, b.boilerplate, ...(b.claimAlternativen || [])].forEach(push);
  Object.values(p.story || {}).forEach(push);
  (p.saeulen || []).forEach((s) => { const se = s.serie || {}; [se.name, se.idee, se.hookFormel].forEach(push); (se.beispiele || []).forEach((x) => { push(x.titel); push(x.hook); }); });
  (p.konzepte || []).forEach((k) => { push(k.name); push(k.idee); });
  push(p.visuell && p.visuell.idee); push(p.visuell && p.visuell.zeichen);
  ((p.stimme && p.stimme.beispiele) || []).forEach((x) => push(x.so));
  return t;
}
function hmPfNorm(t) { return hmPfS(t).toLowerCase().replace(/[„“"()\[\]:;,.?]/g, " ").split(/\s+/).filter(Boolean); }
function hmPfTrigramme(texte) {
  const set = new Set();
  texte.forEach((t) => { const w = hmPfNorm(t); for (let i = 0; i + 2 < w.length; i++) set.add(w[i] + " " + w[i + 1] + " " + w[i + 2]); });
  return set;
}
function hmPfJaccard(A, B) { if (!A.size || !B.size) return 0; let n = 0; A.forEach((x) => { if (B.has(x)) n++; }); return n / (A.size + B.size - n); }
function hmPfAndere(mid) {
  const S = (k) => { try { return hmStore.get(k); } catch (e) { return null; } };
  const gespeichert = S("plattformen") || {};
  const fb = S("fragebogen") || {};
  const ids = [...new Set([...(S("makler") || []).map((m) => m.id), ...Object.keys(fb)])].filter((id) => id !== mid);
  return ids.map((id) => ({ id, p: (gespeichert[id] && gespeichert[id].aktuell) || (fb[id] && fb[id].antworten && Object.keys(fb[id].antworten).length ? hmPlattform(id, { ohneQualitaet: true }) : null) })).filter((x) => x.p);
}
function hmMarkenQualitaet(p, mid, opt) {
  opt = opt || {};
  const c = opt.kontext || hmPfKontext(hmPfQuellen(mid, opt));
  const alle = hmPfAlleTexte(p);
  const hinweise = [];
  /* Harte Fehler: Klischees aus dem Datenvertrag */
  const klischees = [];
  alle.forEach(({ pfad, text }) => {
    HM_PF_KLISCHEES.forEach(([wort, re]) => { if (re.test(text)) klischees.push(`${wort} (${pfad})`); });
    hmPfSaetze(text).forEach((s) => { if (/exklusiv/i.test(s) && !/\d/.test(s)) klischees.push(`exklusiv ohne Beleg (${pfad})`); });
  });
  const floskeln = alle.filter(({ pfad, text }) => !/(\.vermeiden|^stimme\.regeln)/.test(pfad) && HM_PF_FLOSKELN.some((re) => re.test(text))).map((x) => x.pfad);

  /* 1. Spezifität: Ort, Zahl oder eigene Worte in den Kerntexten */
  const frei = ["abschluesse", "abgeraten", "aufgewachsen", "wendepunkt", "belege", "fehler", "kundensatz", "unity", "graetzl", "worte", "ideal", "cue", "vorbilder"].map((k) => hmPfS(c.a[k])).concat(c.zitate).filter(Boolean);
  const eigene = new Set(); frei.forEach((t) => { const w = hmPfNorm(t); for (let i = 0; i + 2 < w.length; i++) eigene.add(w.slice(i, i + 3).join(" ")); });
  const orte = [...new Set([c.kern, ...c.orte, ...c.strassen, c.herkunft.ort].filter(Boolean))];
  const kern = [
    ["Einsicht, Zielgruppe", p.einsicht.zielgruppe], ["Einsicht, Spannung", p.einsicht.spannung], ["Weiße Stelle", p.einsicht.weisseStelle],
    ["Positionierung", p.positionierung.satz], ["Versprechen", p.versprechen], ["Ein Satz", p.botschaften.einSatz], ["Drei Sätze", p.botschaften.dreiSaetze],
    ["Story kurz", p.story.kurz], ["Story mittel", p.story.mittel],
    ...p.saeulen.map((s) => [`Serie ${s.serie.name}`, s.serie.name + " " + s.serie.idee]),
    ...p.saeulen.flatMap((s) => s.serie.beispiele.map((b) => [`Beispiel ${b.titel}`, b.titel + " " + b.hook + " " + b.skizze])),
    ...p.konzepte.map((k) => [`Konzept ${k.name}`, k.name + " " + k.idee]),
  ].filter(([, t]) => t && !hmPfIstLuecke(t));
  let nOrt = 0, nZahl = 0, nEigen = 0; const schwach = [];
  kern.forEach(([wo, t]) => {
    const hatOrt = orte.some((o) => t.includes(o)), hatZahl = /\d/.test(t);
    const w = hmPfNorm(t); let hatEigen = false; for (let i = 0; i + 2 < w.length; i++) if (eigene.has(w.slice(i, i + 3).join(" "))) { hatEigen = true; break; }
    if (hatOrt) nOrt++; if (hatZahl) nZahl++; if (hatEigen) nEigen++;
    if (!hatOrt && !hatZahl && !hatEigen) schwach.push(wo);
  });
  const luecken = alle.filter((x) => hmPfIstLuecke(x.text)).length;
  /* Offene Lücken senken die Spezifität: eine Plattform aus Platzhaltern ist nicht spezifisch */
  const spez = kern.length ? Math.round(((kern.length - schwach.length) / kern.length) * 100 * (kern.length / (kern.length + luecken * 0.5))) : 0;
  const spezHinweis = kern.length ? `${kern.length - schwach.length} von ${kern.length} Kerntexten mit Ort, Zahl oder eigenen Worten (Ort ${nOrt}, Zahl ${nZahl}, eigene Worte ${nEigen}).${schwach.length ? " Ohne Anker: " + schwach.slice(0, 3).join(", ") + "." : ""}${luecken ? ` ${luecken} Lücken offen, sie kommen aus dem Workshop.` : ""}` : "Noch keine Kerntexte, der Fragebogen fehlt.";

  /* 2. Unterscheidbarkeit: Jaccard auf Wort-Trigrammen gegen die anderen Makler */
  const eigenSet = hmPfTrigramme(hmPfMarkentexte(p));
  const andere = opt.andere || hmPfAndere(mid);
  let max = 0, maxId = "";
  andere.forEach(({ id, p: o }) => { const j = hmPfJaccard(eigenSet, hmPfTrigramme(hmPfMarkentexte(o))); if (j > max) { max = j; maxId = id; } });
  const aehnlichkeit = Math.round(max * 100);
  const unter = andere.length ? Math.max(0, Math.min(100, Math.round(100 - Math.max(0, aehnlichkeit - 5) * 3))) : 70;
  const unterHinweis = andere.length ? `Größte Textähnlichkeit ${aehnlichkeit} Prozent (mit ${maxId}), Jaccard auf Wort-Trigrammen der Markentexte über ${andere.length} ${andere.length === 1 ? "Plattform" : "Plattformen"}.${aehnlichkeit > 15 ? " Zu viele gleiche Bausteine: eigene Worte aus dem Workshop ergänzen." : ""}` : "Kein Vergleich möglich, im Store liegt keine andere Plattform.";

  /* 3. Glaubwürdigkeit: jede Behauptung hat einen Beleg, keine Zahl ohne Quelle */
  const offen = p.beweise.filter((b) => !hmPfS(b.beleg) || hmPfIstLuecke(b.beleg)).map((b) => b.behauptung);
  const quelleZahlen = new Set((JSON.stringify(c.a) + " " + c.zitate.join(" ")).match(/\d+(?:[.,]\d+)*/g) || []);
  ["2026", "1", "2", "3", "4", "5", "6", "10", "24", "30", "48", "60", "90"].forEach((z) => quelleZahlen.add(z));
  const pruef = [["Einsicht", Object.values(p.einsicht).join(" ")], ["Positionierung", p.positionierung.satz], ["Botschaften", [p.botschaften.einSatz, p.botschaften.dreiSaetze, p.botschaften.ueberMich, p.botschaften.boilerplate].join(" ")], ["Story", p.story.lang], ["Beweise", p.beweise.map((b) => b.behauptung + " " + b.beleg).join(" ")]];
  const ohneQuelle = [];
  pruef.forEach(([wo, t]) => { (hmPfS(t).match(/\d+(?:[.,]\d+)*/g) || []).forEach((z) => { if (!quelleZahlen.has(z) && !ohneQuelle.includes(`${z} (${wo})`)) ohneQuelle.push(`${z} (${wo})`); }); });
  const posBeleg = !hmPfIstLuecke(p.positionierung.weil);
  let glaub = 100 - offen.length * 15 - ohneQuelle.length * 20 - (posBeleg ? 0 : 20);
  if (c.fehler && !c.pratfallOk && JSON.stringify(p.story).includes(hmPfOhnePunkt(c.fehler))) { glaub -= 15; hinweise.push("Fehlergeschichte in der Story, bevor Belege da sind (Pratfall-Regel)."); }
  glaub = Math.max(0, Math.min(100, glaub));
  const glaubHinweis = `${p.beweise.length - offen.length} von ${p.beweise.length} Behauptungen belegt.${offen.length ? " Offen: " + offen.join(", ") + "." : ""}${ohneQuelle.length ? " Zahl ohne Quelle: " + ohneQuelle.join(", ") + "." : ""}${posBeleg ? "" : " Die Positionierung hat noch keinen Beleg."}`;

  /* 4. Konsistenz: Anrede je Kanal, Ton ohne Ausrufezeichen, Striche, Emojis */
  const oeff = hmPfOeffentlich(p, c);
  const anredeFehler = [];
  oeff.forEach(({ text, kontext, wo }) => {
    const soll = hmPfAnrede(c.a, c.w, kontext);
    if (soll === "Sie" && hmPfDuFormen(text)) anredeFehler.push(`${wo}: Du statt Sie`);
    if ((soll === "Du" || soll === "neutral") && hmPfSieFormen(text)) anredeFehler.push(`${wo}: Sie statt Du`);
  });
  const ausruf = alle.filter((x) => /!/.test(x.text)).map((x) => x.pfad);
  const striche = alle.filter((x) => /[\u2013\u2014]/.test(x.text)).map((x) => x.pfad);
  const emojis = alle.filter((x) => /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(x.text)).map((x) => x.pfad);
  const konsist = Math.max(0, 100 - anredeFehler.length * 12 - ausruf.length * 10 - striche.length * 10 - emojis.length * 10 - floskeln.length * 5);
  const konsHinweis = `${oeff.length} öffentliche Texte geprüft, Anrede: ${(c.w && c.w.anredeRegel) || hmPfAnrede(c.a, c.w, "website")}.${anredeFehler.length ? " " + anredeFehler.slice(0, 3).join("; ") + "." : " Anrede durchgehend passend."}${ausruf.length ? ` ${ausruf.length} Ausrufezeichen.` : ""}${striche.length ? ` ${striche.length} Gedankenstriche.` : ""}${emojis.length ? ` ${emojis.length} Emojis.` : ""}${floskeln.length ? ` Floskeln in: ${floskeln.slice(0, 3).join(", ")}.` : ""}`;

  /* 5. Umsetzbarkeit: jede Säule eine Serie mit drei Beispielen, Pflichtsäule, Plan */
  const maengel = [];
  if (p.saeulen.length < 4 || p.saeulen.length > 5) maengel.push(`${p.saeulen.length} Säulen statt 4 bis 5`);
  const wissen = p.saeulen.find((s) => s.id === "wissen");
  if (!wissen || wissen.anteil < 15) maengel.push("Pflichtsäule Wie ich arbeite unter 15 Prozent");
  p.saeulen.forEach((s) => {
    const se = s.serie || {};
    if (!se.name || !se.idee || !se.hookFormel || !se.rhythmus) maengel.push(`${s.name}: Serie unvollständig`);
    if (!se.ablauf || se.ablauf.length < 3) maengel.push(`${s.name}: Ablauf unter drei Schritten`);
    const bsp = (se.beispiele || []).filter((b) => b.titel && b.hook && b.skizze && !hmPfIstLuecke(b.titel));
    if (bsp.length < 3) maengel.push(`${s.name}: ${bsp.length} von 3 Beispielen`);
  });
  const langeHooks = p.saeulen.flatMap((s) => s.serie.beispiele).filter((b) => hmPfWoerter(b.hook) > 12).map((b) => b.titel);
  if (p.konzepte.length !== 3) maengel.push(`${p.konzepte.length} Konzepte statt 3`);
  if (p.start30.length !== 4 || p.start30.some((w) => w.beitraege.length < 3 || w.beitraege.length > 4)) maengel.push("Startplan nicht vier Wochen mit 3 bis 4 Beiträgen");
  const umsetz = Math.max(0, 100 - maengel.length * 15 - Math.min(15, langeHooks.length * 3));
  const umsHinweis = `${p.saeulen.length} Säulen, ${p.saeulen.reduce((n, s) => n + s.serie.beispiele.length, 0)} Beispielbeiträge, ${p.konzepte.length} Konzepte, ${p.start30.reduce((n, w) => n + w.beitraege.length, 0)} Beiträge im Startplan.${maengel.length ? " Mängel: " + maengel.join("; ") + "." : ""}${langeHooks.length ? ` Hook über 12 Wörter: ${langeHooks.slice(0, 2).join(", ")}.` : ""}`;

  const kriterien = [
    { name: "Spezifität", wert: spez, hinweis: spezHinweis },
    { name: "Unterscheidbarkeit", wert: unter, hinweis: unterHinweis },
    { name: "Glaubwürdigkeit", wert: glaub, hinweis: glaubHinweis },
    { name: "Konsistenz", wert: konsist, hinweis: konsHinweis },
    { name: "Umsetzbarkeit", wert: umsetz, hinweis: umsHinweis },
  ];
  const gew = [25, 20, 25, 15, 15];
  let gesamt = Math.round(kriterien.reduce((n, k, i) => n + k.wert * gew[i], 0) / 100);
  if (klischees.length) { gesamt = Math.min(gesamt - klischees.length * 10, 50); hinweise.unshift(`Harter Fehler: ${klischees.length} Klischee${klischees.length === 1 ? "" : "s"} (${klischees.slice(0, 3).join(", ")}). Vor der Freigabe ersetzen.`); }
  gesamt = Math.max(0, Math.min(100, gesamt));
  kriterien.forEach((k) => { if (k.wert < 70) hinweise.push(`${k.name}: ${k.hinweis}`); });
  return { gesamt, kriterien, klischees, aehnlichkeit, hinweise };
}

/* ---------- 10. Speichern, Versionen ---------- */
function hmPlattformSpeichern(mid, plattform) {
  let gespeichert = null;
  hmStore.patch("plattformen", (s) => {
    const alle = s || {};
    const cur = alle[mid] || { versionen: [] };
    const nr = cur.versionen.length ? (cur.versionen[0].version || cur.versionen.length) + 1 : 1;
    gespeichert = { ...plattform, version: nr, gespeichert: new Date().toISOString() };
    return { ...alle, [mid]: { aktuell: gespeichert, versionen: [gespeichert, ...cur.versionen].slice(0, 12) } };
  });
  if (typeof hmEvent === "function") hmEvent(mid, "plattform", `Markenplattform Version ${gespeichert.version} gespeichert (${gespeichert.quelle === "claude" ? "Claude" : "Regeln"}, Qualität ${(gespeichert.qualitaet || {}).gesamt || 0})`, "System");
  return gespeichert;
}
function hmPlattformAktuell(mid) { const s = (hmStore.get("plattformen") || {})[mid]; return s ? s.aktuell : null; }
function hmPlattformVersionen(mid) { const s = (hmStore.get("plattformen") || {})[mid]; return s ? s.versionen : []; }

/* ---------- 11. Claude-Kette über /api/wb-marke (unter /ux: /ux/api/marke), mit Rückfall auf die Regeln ---------- */
/* Unter /ux läuft die Schnittstelle über den Rewrite /ux/api/marke, dann schickt der Browser das UX-Passwort selbst mit */
const HM_PF_API = typeof location !== "undefined" && location.pathname.startsWith("/ux/") ? "/ux/api/marke" : "/api/wb-marke";
function hmPfAnfrage(mid, extra) {
  const q = hmPfQuellen(mid);
  const letzte = q.meetings.slice().sort((x, y) => String(y.datum).localeCompare(String(x.datum)))[0];
  return {
    makler: { id: mid, name: q.makler.name, region: q.makler.region },
    antworten: q.a, weg: q.w,
    mitschrift: letzte ? { datum: letzte.datum, zusammenfassung: letzte.zusammenfassung, zitate: letzte.zitate || [], transkript: letzte.transkript || "" } : null,
    material: ((q.branding && q.branding.material) || []).map((x) => ({ name: x.name, art: x.art })),
    branding: { claim: q.branding.claim || "", akzent: q.branding.akzent || "", schrift: q.branding.schrift || "" },
    welten: (typeof window !== "undefined" && Array.isArray(window.HM_MARKENWELTEN)) ? window.HM_MARKENWELTEN.map((w) => ({ id: w.id, name: w.name, passtZu: w.passtZu })) : HM_PF_WELT_IDS.map((id) => ({ id })),
    ...(extra || {}),
  };
}
function hmPfAuth(opt) {
  let pw = (opt && opt.passwort) || (typeof window !== "undefined" && window.HM_UX_PASSWORT) || "";
  if (!pw) { try { pw = sessionStorage.getItem("unio_hm_ux_pw") || ""; } catch (e) { pw = ""; } }
  return pw ? { Authorization: "Basic " + btoa("ux:" + pw) } : {};
}
/* Füllt fehlende Felder aus der Regel-Plattform, damit das Ergebnis immer dem Schema entspricht */
function hmPfZusammenfuehren(claude, regeln) {
  const out = { ...regeln };
  Object.keys(regeln).forEach((k) => {
    const v = claude ? claude[k] : undefined;
    if (v == null || (Array.isArray(v) && !v.length) || (typeof v === "string" && !v.trim())) return;
    out[k] = (typeof v === "object" && !Array.isArray(v) && typeof regeln[k] === "object" && !Array.isArray(regeln[k])) ? { ...regeln[k], ...v } : v;
  });
  return out;
}
async function hmPlattformClaude(mid, opt) {
  opt = opt || {};
  const regeln = hmPlattform(mid, { ohneQualitaet: true });
  const rueckfall = (grund) => {
    const p = { ...regeln, quelle: "regeln" };
    p.qualitaet = hmMarkenQualitaet(p, mid);
    p.qualitaet.hinweise = [`Claude nicht verfügbar (${grund}). Ergebnis aus den Regeln.`, ...(p.qualitaet.hinweise || [])];
    if (typeof hmEvent === "function") hmEvent(mid, "plattform", `Markenplattform aus Regeln, Claude nicht verfügbar: ${grund}`, "System");
    if (opt.speichern) return hmPlattformSpeichern(mid, p);
    return p;
  };
  if (typeof fetch !== "function") return rueckfall("kein Netz");
  let ctrl = null, timer = null;
  try { ctrl = new AbortController(); timer = setTimeout(() => ctrl.abort(), opt.timeoutMs || 290000); } catch (e) { ctrl = null; }
  try {
    const res = await fetch(opt.url || HM_PF_API, { method: "POST", headers: { "Content-Type": "application/json", ...hmPfAuth(opt) }, body: JSON.stringify(hmPfAnfrage(mid, { phase: "voll", freigabe: opt.freigabe || null })), signal: ctrl ? ctrl.signal : undefined });
    if (timer) clearTimeout(timer);
    let body = null; try { body = await res.json(); } catch (e) { body = null; }
    if (!res.ok || !body || !body.plattform) return rueckfall(body && body.fallback ? `Status ${res.status}, ${body.fehler || "kein Schlüssel"}` : `Status ${res.status}`);
    const p = hmPfZusammenfuehren(body.plattform, regeln);
    p.quelle = "claude"; p.erstellt = new Date().toISOString(); p.version = 1;
    p.qualitaet = hmMarkenQualitaet(p, mid);
    if (body.pruefung && Array.isArray(body.pruefung.hinweise)) p.qualitaet.hinweise = [...(p.qualitaet.hinweise || []), ...body.pruefung.hinweise.map((x) => `Schlussprüfung Claude: ${x}`)];
    if (typeof hmEvent === "function") hmEvent(mid, "plattform", `Markenplattform mit Claude erstellt, Qualität ${p.qualitaet.gesamt}`, "System");
    return opt.speichern ? hmPlattformSpeichern(mid, p) : p;
  } catch (e) {
    if (timer) clearTimeout(timer);
    return rueckfall(e && e.name === "AbortError" ? "Zeitüberschreitung" : "Netzwerkfehler");
  }
}
/* Gate 1: nur Einsicht, drei Territorien und die Auswahl, zur Prüfung durch den Creative Director */
async function hmPlattformEinsichtClaude(mid, opt) {
  opt = opt || {};
  try {
    const res = await fetch(opt.url || HM_PF_API, { method: "POST", headers: { "Content-Type": "application/json", ...hmPfAuth(opt) }, body: JSON.stringify(hmPfAnfrage(mid, { phase: "gate1" })) });
    const body = await res.json();
    if (!res.ok || !body.gate1) return { ok: false, grund: body && body.fehler ? body.fehler : `Status ${res.status}`, fallback: "regeln" };
    return { ok: true, ...body.gate1 };
  } catch (e) { return { ok: false, grund: "Netzwerkfehler", fallback: "regeln" }; }
}

/* ---------- 12. Selbsttest ---------- */
const HM_PF_SCHEMA = {
  top: ["version", "quelle", "erstellt", "einsicht", "positionierung", "versprechen", "rolle", "werte", "persoenlichkeit", "stimme", "botschaften", "story", "beweise", "saeulen", "konzepte", "start30", "visuell", "qualitaet"],
  einsicht: ["zielgruppe", "spannung", "konvention", "weisseStelle"], positionierung: ["satz", "fuerWen", "was", "andersAls", "weil"], rolle: ["name", "satz"],
  stimme: ["regler", "regeln", "sagen", "vermeiden", "beispiele"], regler: ["ernst", "persoenlich", "begeistert", "sachlich"],
  botschaften: ["claim", "claimAlternativen", "einSatz", "dreiSaetze", "ueberMich", "boilerplate"], story: ["herkunft", "spannung", "wendepunkt", "haltung", "versprechen", "kurz", "mittel", "lang"],
  saeule: ["id", "name", "zweck", "frage", "anteil", "formate", "serie"], serie: ["name", "idee", "ablauf", "hookFormel", "rhythmus", "beispiele"],
  konzept: ["name", "idee", "warum", "umsetzung", "kanal"], visuell: ["welt", "idee", "bildsprache", "zeichen"], qualitaet: ["gesamt", "kriterien", "klischees", "aehnlichkeit"],
};
function hmPfSchemaFehler(p) {
  const f = [];
  const hat = (o, keys, wo) => keys.forEach((k) => { if (!o || !(k in o)) f.push(`${wo}.${k}`); });
  hat(p, HM_PF_SCHEMA.top, "plattform");
  ["einsicht", "positionierung", "rolle", "stimme", "botschaften", "story", "visuell", "qualitaet"].forEach((k) => hat(p[k], HM_PF_SCHEMA[k], k));
  hat(p.stimme && p.stimme.regler, HM_PF_SCHEMA.regler, "stimme.regler");
  (p.saeulen || []).forEach((s, i) => { hat(s, HM_PF_SCHEMA.saeule, `saeulen[${i}]`); hat(s.serie, HM_PF_SCHEMA.serie, `saeulen[${i}].serie`); (s.serie.beispiele || []).forEach((b, j) => hat(b, ["titel", "hook", "skizze"], `saeulen[${i}].beispiele[${j}]`)); });
  (p.konzepte || []).forEach((k, i) => hat(k, HM_PF_SCHEMA.konzept, `konzepte[${i}]`));
  (p.werte || []).forEach((w, i) => hat(w, ["name", "verhalten", "nie"], `werte[${i}]`));
  (p.persoenlichkeit || []).forEach((w, i) => hat(w, ["wort", "heisst", "heisstNicht"], `persoenlichkeit[${i}]`));
  (p.beweise || []).forEach((w, i) => hat(w, ["behauptung", "beleg", "quelle"], `beweise[${i}]`));
  (p.stimme.beispiele || []).forEach((w, i) => hat(w, ["wo", "so", "nicht"], `stimme.beispiele[${i}]`));
  (p.start30 || []).forEach((w, i) => { hat(w, ["woche", "beitraege"], `start30[${i}]`); (w.beitraege || []).forEach((b, j) => hat(b, ["titel", "saeule", "format"], `start30[${i}].beitraege[${j}]`)); });
  if ((p.persoenlichkeit || []).length < 3 || (p.persoenlichkeit || []).length > 4) f.push("persoenlichkeit: 3 bis 4");
  if ((p.werte || []).length !== 3) f.push("werte: genau 3");
  if ((p.stimme.beispiele || []).length < 4) f.push("stimme.beispiele: mindestens 4");
  if (!/^\d{4}-\d{2}-\d{2}T/.test(p.erstellt)) f.push("erstellt: kein ISO-Datum");
  return f;
}
function hmSelbsttestPlattform() {
  const out = [];
  const T = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: "Fehler: " + (e && e.message) }); } };
  const seed = (typeof window !== "undefined" && window.HM_SEED_ANTWORTEN) || (typeof HM_SEED_ANTWORTEN !== "undefined" ? HM_SEED_ANTWORTEN : {});
  const makler = { markus: { id: "markus", name: "Markus Leitner", region: "1190 Döbling" }, elif: { id: "elif", name: "Elif Demir", region: "1100 Favoriten" }, sara: { id: "sara", name: "Sara Novak", region: "1070 Neubau" } };
  const mtM = [{ id: "t1", maklerId: "markus", datum: "2026-09-11T10:00", zitate: [], transkript: "Daniel: Was sagen Kunden nach dem Abschluss über Sie?\nMarkus: Dass sie sich nie gedrängt gefühlt haben." }];
  const pE = hmPlattform("elif", { makler: makler.elif, antworten: seed.elif, meetings: [], branding: {}, ohneQualitaet: true });
  const pM = hmPlattform("markus", { makler: makler.markus, antworten: seed.markus, meetings: mtM, branding: { claim: "Rat vor Auftrag.", akzent: "amber" }, andere: [{ id: "elif", p: pE }] });
  const pS = hmPlattform("sara", { makler: makler.sara, antworten: {}, meetings: [], branding: {}, andere: [{ id: "markus", p: pM }] });
  const pE2 = hmPlattform("elif", { makler: makler.elif, antworten: seed.elif, meetings: [], branding: {}, andere: [{ id: "markus", p: pM }] });
  const alleText = (p) => hmPfAlleTexte(p).map((x) => x.text).join("\n");
  const cM = hmPfKontext(hmPfQuellen("markus", { makler: makler.markus, antworten: seed.markus, meetings: mtM, branding: {} }));
  const cE = hmPfKontext(hmPfQuellen("elif", { makler: makler.elif, antworten: seed.elif, meetings: [], branding: {} }));

  T("Schema Markus", () => { const f = hmPfSchemaFehler(pM); return { ok: !f.length, detail: f.join(", ") || `${Object.keys(pM).length} Felder` }; });
  T("Schema Elif und Sara", () => { const f = [...hmPfSchemaFehler(pE2), ...hmPfSchemaFehler(pS)]; return { ok: !f.length, detail: f.slice(0, 5).join(", ") || "vollständig" }; });
  T("Keine Klischees, Ausrufezeichen, Striche, Emojis", () => {
    const fehler = [];
    [["Markus", pM], ["Elif", pE2], ["Sara", pS]].forEach(([n, p]) => { if (p.qualitaet.klischees.length) fehler.push(`${n}: ${p.qualitaet.klischees[0]}`); const t = alleText(p); if (/!/.test(t)) fehler.push(`${n}: Ausrufezeichen`); if (/[\u2013\u2014]/.test(t)) fehler.push(`${n}: Gedankenstrich`); if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(t)) fehler.push(`${n}: Emoji`); });
    return { ok: !fehler.length, detail: fehler.join("; ") || "sauber" };
  });
  T("Säulen als Serien", () => {
    const f = [];
    [pM, pE2].forEach((p) => { if (p.saeulen.length < 4 || p.saeulen.length > 5) f.push("Anzahl"); if (p.saeulen.reduce((n, s) => n + s.anteil, 0) !== 100) f.push("Summe"); const w = p.saeulen.find((s) => s.id === "wissen"); if (!w || w.anteil < 15) f.push("Pflichtsäule"); p.saeulen.forEach((s) => { if (s.serie.beispiele.length !== 3 || s.serie.ablauf.length < 3) f.push(s.id); }); });
    return { ok: !f.length, detail: f.join(", ") || pM.saeulen.map((s) => `${s.serie.name} ${s.anteil}`).join(" · ") };
  });
  T("Eigene Worte von Markus", () => {
    const t = alleText(pM);
    const soll = ["Sievering", "600.000", "Grundbuch", "Erbengemeinschaft", "Großvater hat Zinshäuser verwaltet", "4,2 Mio.", "Grundbuch-Dienstag", "nie gedrängt"];
    const fehlt = soll.filter((x) => !t.includes(x));
    return { ok: !fehlt.length, detail: fehlt.length ? "fehlt: " + fehlt.join(", ") : "alle acht Anker gefunden" };
  });
  T("Ehrliche Lücken statt Erfindung", () => {
    const f = [];
    if (!hmPfIstLuecke(pM.story.wendepunkt)) f.push("Wendepunkt Markus erfunden");
    if (!/\[Kommt aus dem Workshop: Wendepunkt\]/.test(pM.story.lang)) f.push("Platzhalter in Story lang fehlt");
    if (hmPfIstLuecke(pE2.story.wendepunkt)) f.push("Wendepunkt Elif nicht übernommen");
    if (!hmPfIstLuecke(pS.positionierung.satz)) f.push("Sara ohne Antworten hat Positionierung");
    return { ok: !f.length, detail: f.join(", ") || "Lücken korrekt markiert" };
  });
  T("Anrede Markus Sie, überall", () => { const o = hmPfOeffentlich(pM, cM).filter((x) => hmPfDuFormen(x.text)); return { ok: !o.length, detail: o.map((x) => x.wo).join(", ") || `${hmPfOeffentlich(pM, cM).length} Texte in Sie` }; });
  T("Anrede Elif je Kanal", () => {
    const o = hmPfOeffentlich(pE2, cE);
    const insta = o.filter((x) => x.kontext === "instagram"), web = o.filter((x) => x.kontext === "website" || x.kontext === "erstkontakt");
    const f = [...insta.filter((x) => hmPfSieFormen(x.text)).map((x) => x.wo + " Sie"), ...web.filter((x) => hmPfDuFormen(x.text)).map((x) => x.wo + " Du")];
    return { ok: !f.length && insta.some((x) => hmPfDuFormen(x.text)) && web.some((x) => /\bSie\b/.test(x.text)), detail: f.join(", ") || `${insta.length} Instagram in Du, ${web.length} Website und Erstkontakt in Sie` };
  });
  T("Unterscheidbarkeit Markus und Elif", () => ({ ok: pM.qualitaet.aehnlichkeit < 20 && pE2.qualitaet.aehnlichkeit < 20, detail: `Markus ${pM.qualitaet.aehnlichkeit} Prozent, Elif ${pE2.qualitaet.aehnlichkeit} Prozent` }));
  T("Startplan und Konzepte", () => {
    const f = [];
    [pM, pE2].forEach((p) => { if (p.start30.length !== 4) f.push("Wochen"); p.start30.forEach((w) => { if (w.beitraege.length < 3 || w.beitraege.length > 4) f.push(`Woche ${w.woche}`); if (w.beitraege.some((b) => !p.saeulen.some((s) => s.id === b.saeule))) f.push("Säule unbekannt"); }); if (p.konzepte.length !== 3) f.push("Konzepte"); });
    const w1 = pM.start30[0].beitraege.map((b) => b.saeule);
    if (w1.includes("persoenlich") && !pM.saeulen.find((s) => s.id === "persoenlich")) f.push("Pratfall");
    return { ok: !f.length, detail: f.join(", ") || pM.start30.map((w) => w.beitraege.length).join("+") + " Beiträge" };
  });
  T("Welt aus der Zuordnung", () => { const ids = (typeof window !== "undefined" && Array.isArray(window.HM_MARKENWELTEN) && window.HM_MARKENWELTEN.length) ? window.HM_MARKENWELTEN.map((x) => x.id) : HM_PF_WELT_IDS; return { ok: ids.includes(pM.visuell.welt) && ids.includes(pE2.visuell.welt) && pM.visuell.welt !== pE2.visuell.welt, detail: `Markus ${pM.visuell.welt}, Elif ${pE2.visuell.welt}` }; });
  T("Qualität erkennt Klischee als harten Fehler", () => { const x = JSON.parse(JSON.stringify(pM)); x.botschaften.claim = "Ihr Partner für Zinshäuser."; const q = hmMarkenQualitaet(x, "markus", { kontext: cM, andere: [] }); return { ok: q.klischees.length >= 1 && q.gesamt <= 50, detail: `${q.klischees.join(", ")}, gesamt ${q.gesamt}` }; });
  T("Qualität erkennt Zahl ohne Quelle", () => { const x = JSON.parse(JSON.stringify(pM)); x.positionierung.satz += " 93 Prozent Weiterempfehlung."; const q = hmMarkenQualitaet(x, "markus", { kontext: cM, andere: [] }); const g = q.kriterien.find((k) => k.name === "Glaubwürdigkeit"); return { ok: g.wert <= 80 && /93/.test(g.hinweis), detail: `${g.wert}: ${g.hinweis}` }; });
  T("Qualität erkennt falsche Anrede", () => { const x = JSON.parse(JSON.stringify(pM)); x.versprechen = "Du weißt, was dein Haus wert ist."; const q = hmMarkenQualitaet(x, "markus", { kontext: cM, andere: [] }); const k = q.kriterien.find((z) => z.name === "Konsistenz"); return { ok: k.wert < 100 && /Du statt Sie/.test(k.hinweis), detail: `${k.wert}` }; });
  T("Rangfolge der Qualität", () => ({ ok: pM.qualitaet.gesamt >= 75 && pS.qualitaet.gesamt < pM.qualitaet.gesamt, detail: `Markus ${pM.qualitaet.gesamt}, Elif ${pE2.qualitaet.gesamt}, Sara ${pS.qualitaet.gesamt}` }));
  T("Versionen im Store", () => {
    const id = "selbsttest_pf";
    const a = hmPlattformSpeichern(id, pS), b = hmPlattformSpeichern(id, pS);
    const ok = a.version === 1 && b.version === 2 && hmPlattformAktuell(id).version === 2 && hmPlattformVersionen(id).length === 2;
    hmStore.patch("plattformen", (s) => { const x = { ...(s || {}) }; delete x[id]; return x; });
    hmStore.patch("events", (l) => (l || []).filter((e) => e.maklerId !== id));
    return { ok, detail: `Versionen ${a.version} und ${b.version}` };
  });
  T("Zusammenführen mit Claude-Teilergebnis", () => { const m = hmPfZusammenfuehren({ botschaften: { claim: "Test." }, saeulen: [] }, pM); return { ok: m.botschaften.claim === "Test." && m.botschaften.einSatz === pM.botschaften.einSatz && m.saeulen.length === pM.saeulen.length, detail: "fehlende Felder aus den Regeln" }; });
  return out;
}

Object.assign(window, {
  hmPlattform, hmMarkenQualitaet, hmPlattformSpeichern, hmPlattformAktuell, hmPlattformVersionen,
  hmPlattformClaude, hmPlattformEinsichtClaude, hmSelbsttestPlattform,
  HM_PF_LUECKE, HM_PF_KLISCHEES, HM_PF_WELT_IDS, HM_PF_SCHEMA, hmPfSchemaFehler,
});
