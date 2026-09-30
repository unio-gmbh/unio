/* Werkbank. Fragebogen v2 und Bildwahl (Prozess v2, Schritte 2 und 3; docs/werkbank/branding-v2/FRAGEN_WIRKUNG.md, schritte/03_vorlieben.md).
   23 Fragen, jede mit Wirkung auf die Marke. Nur Fakten sind vorbelegt und werden bestätigt. Haltungen sind nie vorbelegt:
   frühere eigene Worte stehen als Zitat mit "Übernehmen" unter der Frage, nie als gesetzter Wert.
   Danach die Bildwahl: Fotopaare ohne Worte am Bild, Tippen wählt, ein ungezähltes Probepaar vorab, dann Schriftprobe und altes Logo.
   Ablage: hmStore "fragebogen2" = { [mid]: { antworten, pos, start, fertig, zeiten, nachgefragt, seiten } }, "vorlieben" = { [mid]: {...} }, "fremdbild" = { [mid]: [antwort] }.
   Die Antworten werden zusätzlich in die Felder des ersten Fragebogens geschrieben, damit Strategie und Plattform sie lesen. */

function hmF2Stil() {
  if (typeof document === "undefined" || document.getElementById("stil-fragen2")) return;
  const s = document.createElement("style"); s.id = "stil-fragen2";
  s.textContent = `
.hm-f2-start, .hm-f2-ende { max-width: 760px; display: grid; gap: 18px; }
.hm-f2-start .hm-h1, .hm-f2-ende .hm-h1 { font-size: clamp(32px, 4.6vw, 52px); letter-spacing: -.025em; margin: 0; }
.hm-f2-versprechen { display: grid; gap: 1px; border-radius: 18px; overflow: hidden; background: var(--hairline-dark); box-shadow: inset 0 0 0 1px var(--hairline-dark); }
.hm-f2-versprechen > div { background: var(--surface-raised); padding: 16px 18px; display: grid; gap: 4px; } .hm-f2-versprechen b { font-weight: 500; color: var(--ink); } .hm-f2-versprechen span { color: var(--ink-2); font-size: 14px; line-height: 1.5; }
.hm-f2-kopf { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; font-size: 14px; color: var(--ink-2); margin-bottom: 22px; padding-bottom: 12px; border-bottom: 1px solid var(--hairline-dark); }
.hm-f2-split { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(260px, 1fr); gap: 32px; align-items: start; }
.hm-f2-titel { font-family: "Newsreader", Georgia, serif; font-weight: 400; font-size: clamp(26px, 3.2vw, 38px); line-height: 1.12; letter-spacing: -.015em; margin: 0; color: var(--ink); text-wrap: balance; }
.hm-f2-hilfe { margin: 12px 0 0; color: var(--ink-2); font-size: 15px; line-height: 1.5; max-width: 58ch; }
.hm-f2-wofuer { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-top: 14px; font-size: 13px; color: var(--text-muted); }
.hm-f2-wofuer em { font-style: normal; color: var(--signal-deep); }
.hm-f2-eingabe { margin-top: 24px; }
.hm-f2-frueher { margin-top: 14px; padding: 12px 14px; border-left: 2px solid var(--hairline-dark); display: grid; gap: 8px; justify-items: start; font-size: 15px; line-height: 1.5; color: var(--ink-2); }
.hm-f2-nav { display: flex; align-items: center; gap: 14px; margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--hairline-dark); }
.hm-f2-text textarea, .hm-f2-frei, .hm-f2-drei input, .hm-f2-fall input, .hm-f2-fall textarea { width: 100%; box-sizing: border-box; border: 0; background: var(--surface-raised); box-shadow: inset 0 0 0 1px var(--hairline-dark); border-radius: 12px; padding: 12px 14px; font: inherit; font-size: 16px; line-height: 1.5; color: var(--ink); resize: vertical; }
.hm-f2-text textarea:focus, .hm-f2-frei:focus, .hm-f2-drei input:focus, .hm-f2-fall input:focus, .hm-f2-fall textarea:focus { outline: none; box-shadow: inset 0 0 0 2px var(--ink); }
.hm-f2-frei { margin-top: 12px; }
.hm-f2-optionen { display: flex; flex-wrap: wrap; gap: 8px; }
.hm-f2-option { border: 0; background: var(--surface-raised); box-shadow: inset 0 0 0 1px var(--hairline-dark); border-radius: 999px; padding: 11px 16px; font-size: 15px; color: var(--ink); cursor: pointer; transition: box-shadow .1s, background .1s; }
.hm-f2-option:hover { box-shadow: inset 0 0 0 1px var(--ink); } .hm-f2-option.on { background: var(--ink); color: var(--paper); box-shadow: none; }
.hm-f2-option.gross { border-radius: 16px; padding: 16px 18px; display: grid; gap: 4px; text-align: left; flex: 1 1 240px; } .hm-f2-option.gross b { font-weight: 500; } .hm-f2-option.gross span { font-size: 14px; opacity: .8; }
.hm-f2-stufen .stufen { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 6px; margin-bottom: 10px; }
.hm-f2-stufen .stufen button { height: 48px; border: 0; border-radius: 12px; background: var(--surface-raised); box-shadow: inset 0 0 0 1px var(--hairline-dark); cursor: pointer; display: grid; place-items: center; }
.hm-f2-stufen .stufen button i { width: 10px; height: 10px; border-radius: 50%; background: var(--hairline-dark); } .hm-f2-stufen .stufen button.on { background: var(--ink); } .hm-f2-stufen .stufen button.on i { background: var(--paper); }
.hm-f2-stufen .hm-row { font-size: 14px; color: var(--ink-2); }
.hm-f2-stufen .gewaehlt { font-size: 15px; color: var(--ink); margin-top: 8px; min-height: 22px; }
.hm-f2-faelle { display: grid; gap: 12px; }
.hm-f2-fall { display: grid; gap: 8px; padding: 14px; border-radius: 16px; background: var(--paper-2); }
.hm-f2-fall .kopf { display: flex; justify-content: space-between; } .hm-f2-fall .obj { font-weight: 500; }
.hm-f2-fall .zahlen { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; } .hm-f2-fall label { display: grid; gap: 4px; font-size: 12px; color: var(--text-muted); }
.hm-f2-drei { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.hm-f2-stimmen { display: grid; gap: 18px; }
.hm-f2-stimme .lage { font-size: 14px; color: var(--text-muted); margin-bottom: 8px; }
.hm-f2-stimme .paar { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.hm-f2-stimme .paar button { border: 0; text-align: left; background: var(--surface-raised); box-shadow: inset 0 0 0 1px var(--hairline-dark); border-radius: 14px; padding: 14px 16px; font-family: "Newsreader", Georgia, serif; font-size: 17px; line-height: 1.4; color: var(--ink); cursor: pointer; }
.hm-f2-stimme .paar button.on { box-shadow: inset 0 0 0 2px var(--ink); background: #FFFFFF; }
.hm-f2-label { display: grid; gap: 6px; margin-top: 16px; font-size: 14px; color: var(--ink-2); }
.hm-f2-paar { display: grid; grid-template-columns: minmax(0, 1fr) 44px minmax(0, 1fr); align-items: stretch; }
.hm-f2-paar .wahl { border: 0; background: none; padding: 0; cursor: pointer; display: block; }
.hm-f2-paar .bild { display: block; aspect-ratio: 4 / 5; border-radius: 16px; overflow: hidden; background: var(--paper-2); box-shadow: inset 0 0 0 1px var(--hairline-dark); transition: box-shadow .12s, opacity .18s; }
.hm-f2-paar .wahl:hover .bild { box-shadow: 0 0 0 1px var(--ink); } .hm-f2-paar .wahl.on .bild { box-shadow: 0 0 0 3px var(--ink); }
.hm-f2-paar .wahl:focus-visible { outline: none; } .hm-f2-paar .wahl:focus-visible .bild { box-shadow: 0 0 0 3px var(--ink); }
.hm-f2-paar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.hm-f2-paar .gleich { border: 0; background: none; cursor: pointer; writing-mode: vertical-rl; transform: rotate(180deg); font: inherit; font-size: 13px; color: var(--ink-2); padding: 0; justify-self: center; }
.hm-f2-paar .gleich.on { color: var(--ink); text-decoration: underline; text-underline-offset: 4px; }
.hm-f2-paar.weg .bild { opacity: .35; }
.hm-f2-tasten { margin-top: 12px; font-size: 13px; color: var(--text-muted); }
.hm-f2-schrift { height: 100%; display: grid; place-items: center; padding: 24px; font-size: clamp(26px, 3vw, 40px); line-height: 1.1; text-align: center; background: #F5F1EA; color: #191714; }
.hm-f2-leer { width: 100%; height: 100%; display: grid; place-items: center; color: var(--text-muted); font-size: 13px; }
.hm-f2-logo { height: 160px; border-radius: 16px; background: #FFFFFF; box-shadow: inset 0 0 0 1px var(--hairline-dark); display: grid; place-items: center; padding: 20px; } .hm-f2-logo img { max-height: 100%; max-width: 100%; }
.hm-f2-karte { width: min(340px, 100%); aspect-ratio: 85 / 55; background: #FFFFFF; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,.08), inset 0 0 0 1px var(--hairline-dark); padding: 7% 8%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; color: #191714; margin-top: 12px; }
.hm-f2-karte img { height: 22%; max-width: 60%; object-fit: contain; object-position: left; } .hm-f2-karte span { font-size: 12px; line-height: 1.4; }
.hm-f2-grund { font-size: 14px; color: var(--ink-2); margin-top: 8px; }
.hm-f2-hinweis { font-size: 14px; color: var(--signal-deep); margin: 0 0 14px; }
.hm-f2-wirkung { position: sticky; top: 16px; background: var(--surface-raised); border-radius: 18px; box-shadow: inset 0 0 0 1px var(--hairline-dark); padding: 16px 18px; max-height: calc(100vh - 120px); overflow: auto; }
.hm-f2-wirkung.gross { position: static; max-height: none; }
.hm-f2-wirkung .kopf { display: flex; justify-content: space-between; font-size: 14px; color: var(--ink); margin-bottom: 10px; }
.hm-f2-wirkung ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.hm-f2-wirkung li { padding-left: 12px; border-left: 2px solid var(--hairline-dark); } .hm-f2-wirkung li.an { border-left-color: var(--ink); }
.hm-f2-wirkung .w { font-size: 13px; color: var(--text-muted); line-height: 1.4; } .hm-f2-wirkung .a { font-size: 14px; color: var(--ink); margin-top: 2px; line-height: 1.4; }
.hm-f2-fremdbild { display: grid; gap: 10px; justify-items: start; padding: 18px 0; border-top: 1px solid var(--hairline-dark); border-bottom: 1px solid var(--hairline-dark); }
.hm-f2-fremdbild h2 { margin: 0; font-size: 22px; font-weight: 400; letter-spacing: -.01em; }
.hm-f2-fremdbild p { margin: 0; font-size: 15px; line-height: 1.5; color: var(--ink-2); max-width: 58ch; }
@media (max-width: 900px) { .hm-f2-split { grid-template-columns: minmax(0, 1fr); } .hm-f2-wirkung { position: static; max-height: none; } .hm-f2-drei { grid-template-columns: minmax(0, 1fr); } }`;
  document.head.appendChild(s);
}

const HM_F2_ALTERNATIVEN = ["Großbüro", "Einzelmakler", "Plattform", "Privatverkauf", "Bauträger-Vertrieb", "Weiß nicht"];
const HM_F2_WOHER = ["Empfehlung", "Notariat oder Anwalt", "Bestandskunden", "Portal", "Instagram oder LinkedIn", "Hausverwaltung", "Bank"];
const HM_F2_KANAELE = [["instagram", "Instagram"], ["linkedin", "LinkedIn"], ["facebook", "Facebook"], ["tiktok", "TikTok"], ["youtube", "YouTube"]];
const HM_F2_THEMEN = ["Sport und Hobby", "Familie", "Wohnort und Grätzl", "Meinung zum Markt", "Fehler und Learnings", "Politik und Gesellschaft", "Team und Büro", "Humor", "Preise nennen", "Kunden erkennbar zeigen", "Luxus zeigen"];
const HM_F2_STIMMEN = [
  { id: "s2", lage: "Ein Eigentümer fragt nach dem Wert seiner Wohnung.", a: "Nach den letzten Verkäufen in Ihrer Straße liegt der Wert in einer engen Spanne. Ich zeige Ihnen, woraus sie sich ergibt.", b: "Lassen Sie uns zuerst gemeinsam durch die Wohnung gehen. Danach sage ich Ihnen offen, was ich sehe." },
  { id: "s3", lage: "Ein neues Objekt geht online.", a: "Ab heute online: Altbau, drei Zimmer, Balkon in den Hof. Besichtigungen ab Donnerstag.", b: "Diese Wohnung wird nicht lange frei sein, und ich verstehe gut, warum." },
  { id: "s5", lage: "Die Preise im Bezirk bewegen sich.", a: "Die Preise sind im Quartal leicht gesunken. Was das für Verkäufer heißt, erkläre ich im Video.", b: "Wer jetzt auf höhere Preise wartet, wartet vermutlich zu lange." },
  { id: "s1", lage: "Ein Verkauf ist abgeschlossen.", a: "Verkauft. Danke an die Familie für das Vertrauen.", b: "Elf Tage, drei Anbote, ein Handschlag. So macht diese Arbeit Freude." },
];
const HM_F2_ZIELE = ["Mehr Abgeber-Anfragen", "Bekannt im Bezirk werden", "Investoren erreichen", "Käufer-Community aufbauen", "Team aufbauen"];
/* Formate in geprüften Sie-Sätzen, statt die Du-Texte aus HM_FORMATE umzuschreiben */
const HM_F2_FORMATE_SIE = {
  talking: "Sie sprechen 30 bis 60 Sekunden direkt in die Kamera.",
  spaziergang: "Sie gehen durch Ihr Viertel und erzählen.",
  walkthrough: "Rundgang durch ein Objekt, mit Ihrem Kommentar.",
  carousel: "Sechs bis acht Kacheln mit Zahlen, Checkliste oder Vergleich.",
  qa: "Eine Kundenfrage, eine klare Antwort von Ihnen.",
  behind: "Besichtigung, Übergabe, Büro oder Team, so wie es ist.",
};
const HM_F2_STUFEN = ["Nur Eigentümer", "Fast nur Eigentümer", "Mehr Eigentümer", "Beide gleich", "Mehr Käufer", "Fast nur Käufer", "Nur Käufer"];
const HM_F2_NACHFRAGE = "Was genau haben Sie in dem Moment gesagt oder getan?";

/* Die 23 Fragen. wirkt: was die Antwort in der Marke verändert, in Worten des Maklers */
const HM_F2 = [
  { id: "f1", nr: "2.1", gruppe: "Ihr Gebiet", typ: "bestaetigen", frage: "Stimmt das noch?", hilfe: "Aus Ihrem ersten Fragebogen und Ihrem Bestand. Bestätigen oder ändern.", wirkt: "Ihre Zielgruppe, Ihr Ortsbezug und die Orte in den Namen Ihrer Serien.", min: 1 },
  { id: "f2", nr: "2.2", gruppe: "Ihr Gebiet", typ: "stufen", frage: "Denken Sie an Ihre letzten zehn Aufträge: Für wen haben Sie gearbeitet?", links: "Nur Eigentümer", rechts: "Nur Käufer", wirkt: "Für wen Ihre Marke spricht und für wen ausdrücklich nicht.", min: 0.5 },
  { id: "f3", nr: "2.3", gruppe: "Ihre Fälle", typ: "faelle", nachfrage: true, frage: "Ihre letzten drei Abschlüsse: Was gab jeweils den Ausschlag?", hilfe: "Die Objekte stehen schon da. Den Ausschlag in Ihren Worten, Dauer und Abweichung als Zahl, wenn Sie sie wissen.", wirkt: "Die Belege Ihrer Marke und das „weil“ in Ihrem Markenvertrag.", min: 4 },
  { id: "f4", nr: "2.4", gruppe: "Ihre Fälle", typ: "eine", optionen: HM_F2_ALTERNATIVEN, frage: "Beim {fall1}: Wen hätte die Kundschaft ohne Sie beauftragt?", wirkt: "Wovon sich Ihre Positionierung abgrenzt.", min: 0.5 },
  { id: "f5", nr: "2.5", gruppe: "Ihre Fälle", typ: "text", nachfrage: true, frage: "Was konnten Sie in diesem Fall, was {alternative} nicht gekonnt hätte?", platz: "Ein, zwei Sätze.", wirkt: "Die Stelle im Markt, die nur Sie besetzen.", min: 1.5 },
  { id: "f6", nr: "2.6", gruppe: "Ihre Fälle", typ: "text", nachfrage: true, frueher: "abgeraten", schnell: ["Noch nie", "Lieber im Workshop erzählen"], frage: "Wann haben Sie zuletzt jemandem abgeraten, obwohl es Sie Provision gekostet hat? Was ist daraus geworden?", platz: "Was war, was Sie geraten haben, wie es ausging.", wirkt: "Ein Beleg gegen den eigenen Vorteil, stärkster Baustein für Vertrauen.", min: 2 },
  { id: "f7", nr: "2.7", gruppe: "Ihre Kunden", typ: "mehrfach", max: 2, frei: true, optionen: ["Provision", "Bindungsdauer", "Zweifel am Preis", "Schlechte Erfahrung mit Maklern", "Wollten selbst verkaufen", "Anderer Makler war im Gespräch"], frage: "Was hätte die Kundschaft beim {fall1} fast davon abgehalten, Sie zu beauftragen?", wirkt: "Die Spannung, die Ihre Inhalte auflösen.", min: 0.5 },
  { id: "f8", nr: "2.8", gruppe: "Ihre Kunden", typ: "text", frage: "Beim {fall1} schrieben Sie: „{ausschlag}“. Was hatte die Verkäuferseite davon ganz konkret?", frageOhne: "Beim {fall1}: Was hatte die Verkäuferseite von Ihrer Arbeit ganz konkret?", platz: "Kurz, konkret.", wirkt: "Ihre Werte und Ihr Versprechen.", min: 1 },
  { id: "f9", nr: "2.9", gruppe: "Ihre Kunden", typ: "text", frage: "Und warum war genau das wichtig?", platz: "Kurz.", wirkt: "Das Versprechen auf Ihrer Website.", min: 1 },
  { id: "f10", nr: "2.10", gruppe: "Ihre Kunden", typ: "mehrfach", max: 3, frei: true, optionen: ["Erbe", "Trennung", "Familie wächst", "Kinder ziehen aus", "Investment", "Umzug aus beruflichen Gründen", "Verkleinern im Alter"], frage: "Mit welchem Anlass kamen Ihre letzten Kunden zu Ihnen?", wirkt: "Ihre Zielgruppe und die Themen der Staffeln Ihrer Sendung.", min: 0.5 },
  { id: "f11", nr: "2.11", gruppe: "Ihre Kunden", typ: "text", bedingt: (a) => !((a.f3 || []).some((x) => /(erb|famil|paar|kund|eigent|anleger|investor)/i.test((x.ausschlag || "") + " " + (x.objekt || "")))), frage: "Beim {fall1}: Wer hat verkauft, in welcher Lebenslage? Ein Satz.", platz: "Ein Satz, ohne Namen.", wirkt: "Das Bild Ihrer Zielgruppe.", min: 0.5 },
  { id: "f12", nr: "2.12", gruppe: "Ihre Kunden", typ: "mehrfach", max: 3, frei: true, optionen: HM_F2_WOHER, frage: "Woher kamen Ihre letzten Aufträge?", wirkt: "Welche Kanäle wichtig sind und mit wem Sie kooperieren.", min: 0.5 },
  { id: "f13", nr: "2.13", gruppe: "Ihre Kunden", typ: "text", frueher: "unity", frage: "Bei welchen Menschen sind Sie einer von ihnen?", platz: "Ein Satz.", wirkt: "Zugehörigkeit: eigene Wörter in Serien und im Community-Konzept.", min: 0.5 },
  { id: "f14", nr: "2.14", gruppe: "Ihre Kanäle", typ: "kanaele", frage: "Wo sind Sie heute, wo wollen Sie sein?", wirkt: "Ihr Kanalplan und der Profilkopf im Feed-Vorschlag.", min: 0.5 },
  { id: "f15", nr: "2.15", gruppe: "Ihre Kanäle", typ: "anrede", frage: "Wie sprechen Sie Menschen dort an?", wirkt: "Jeder öffentliche Text dieses Kanals, über eine einzige Regel.", min: 0.5 },
  { id: "f16", nr: "2.16", gruppe: "Ihre Stimme", typ: "drei", frueher: "worte", frage: "Mit welchen drei Wörtern beschreiben Sie Ihre Arbeit?", wirkt: "Ihre Persönlichkeit, abgeglichen mit dem Fremdbild.", min: 0.5 },
  { id: "f17", nr: "2.17", gruppe: "Ihre Stimme", typ: "stimmen", frage: "Welcher Satz klingt eher nach Ihnen?", hilfe: "Vier Situationen, je zwei Sätze. Es gibt kein richtig.", wirkt: "Tonregler, Satzlänge und die Richtung Ihrer Schrift.", min: 1.5 },
  { id: "f18", nr: "2.18", gruppe: "Ihre Stimme", typ: "eine", optionen: ["Nein", "Nur auf Nachfrage", "Ja"], frage: "Beim {fall1}: Haben Sie diesen Verkauf öffentlich gemacht?", wirkt: "Ob Erfolge leise oder mit Zahl erzählt werden.", min: 0.3 },
  { id: "f19", nr: "2.19", gruppe: "Ihre Grenzen", typ: "sichtbar", frage: "Was darf sichtbar sein, was nie?", wirkt: "Verbote in Stimme, Bildsprache und Serien.", min: 1 },
  { id: "f20", nr: "2.20", gruppe: "Ihr Rhythmus", typ: "formate", frage: "Welche Formate machen Sie gern, welche gehen, welche nie?", wirkt: "Ihr Formatmix, die Serien und der Fotobrief.", min: 0.5 },
  { id: "f21", nr: "2.21", gruppe: "Ihr Rhythmus", typ: "eine", optionen: ["Bis 2 Stunden", "2 bis 4 Stunden", "4 bis 8 Stunden", "Mehr als 8 Stunden"], frage: "Wie viel Zeit können Sie im Monat fest einplanen, Dreh und Freigabe eingerechnet?", wirkt: "Wie viele Beiträge pro Woche und welche Formate tragen.", min: 0.3 },
  { id: "f22", nr: "2.22", gruppe: "Ihr Rhythmus", typ: "text", frueher: "cue", frage: "Welcher feste Termin in Ihrer Woche ist schon da, an den eine halbe Stunde anschließen könnte?", platz: "Wochentag, Uhrzeit und woran es anschließt", wirkt: "Sendetag und Uhrzeit Ihrer Signatur-Serie.", min: 0.5 },
  { id: "f23", nr: "2.23", gruppe: "Ihr Ziel", typ: "ziel", frueher: "ziel", frage: "Was soll sich durch Ihre Marke in zwölf Monaten geändert haben?", wirkt: "Das Erfolgsmaß, an dem wir nach zwölf Wochen messen.", min: 1 },
];
/* Bildwahl. Bis der Paarsatz aus eigenem Shooting da ist, Übergangsbilder aus dem UNIO-Archiv (paarStatus "uebergang") */
const HM_F2_BILD = [
  { id: "b0", nr: "3.0", gruppe: "Bildwahl", typ: "paar", probe: true, frage: "Zum Ausprobieren: Tippen Sie auf das Bild, das Ihnen eher gefällt.", hilfe: "Diese Wahl zählt nicht. Danach folgen die Paare, die zählen.", a: { src: "img/vienna-garden.jpg" }, b: { src: "photos/interieur-esszimmer.jpg" }, wirkt: "Nichts, nur zum Ausprobieren.", min: 0.1 },
  { id: "b1", nr: "3.1", gruppe: "Bildwahl", typ: "paar", uebergang: true, frage: "Welches Licht passt eher zu Ihnen?", a: { src: "photos/terrasse-golden.png", t: "Gerichtet, mit Schatten" }, b: { src: "photos/terrasse-tag.png", t: "Weiches Tageslicht" }, wirkt: "Die Lichtregel in Fotobrief und Bildsprache.", min: 0.2 },
  { id: "b2", nr: "3.2", gruppe: "Bildwahl", typ: "paar", uebergang: true, frage: "Welches Ortsbild passt eher zu Ihnen?", a: { src: "img/schoenbrunn.jpg", t: "Mit Menschen, von hinten" }, b: { src: "img/vienna-garden.jpg", t: "Leerer Ort" }, wirkt: "Ob Ihre Ortsbilder belebt oder still sind.", min: 0.2 },
  { id: "b3", nr: "3.3", gruppe: "Bildwahl", typ: "paar", uebergang: true, frage: "Welche Stimmung passt eher zu Ihnen?", a: { src: "photos/interieur-esszimmer.jpg", t: "Wärmer", filter: "sepia(.22) saturate(1.08) hue-rotate(-6deg)" }, b: { src: "photos/interieur-esszimmer.jpg", t: "Neutral", filter: "saturate(.88) hue-rotate(6deg) brightness(1.03)" }, wirkt: "Die Tonkurve aller Bilder. Das Farbsystem bleibt.", min: 0.2 },
  { id: "b4", nr: "3.4", gruppe: "Bildwahl", typ: "paar", uebergang: true, portrait: true, bedingt: (a, mid) => !!hmBrand(mid).portrait, frage: "Welcher Ausschnitt passt eher zu Ihnen?", a: { t: "Halbnah, mit Raum" }, b: { t: "Nah, das Gesicht" }, wirkt: "Rohskizzen, Feed und die Achse des Gegenentwurfs.", min: 0.2 },
  { id: "b5", nr: "3.5", gruppe: "Bildwahl", typ: "paar", schrift: true, frage: "Derselbe Satz in zwei Schriften. Welcher klingt nach Ihnen?", a: { f: "Newsreader", t: "Antiqua" }, b: { f: "Instrument Sans", t: "Grotesk" }, wirkt: "Die Richtung Ihrer Schrift innerhalb der Klasse, die Ihre Stimme vorgibt.", min: 0.2 },
  { id: "b6", nr: "3.6", gruppe: "Ihr bisheriges Logo", typ: "logoTeile", frage: "Ihr bisheriges Logo: Woran hängen Sie?", hilfe: "Tippen Sie an, was bleiben soll.", wirkt: "Was aus Ihrem Bestand in der neuen Marke wiederzufinden sein muss.", min: 0.5 },
  { id: "b7", nr: "3.7", gruppe: "Ihr bisheriges Logo", typ: "logoUrteil", frage: "Wie gehen wir mit Ihrem Logo um?", wirkt: "Ob Wortmarke und Logofarben in der Familie des Bestands bleiben.", min: 0.3 },
  { id: "b8", nr: "3.8", gruppe: "Nicht ich", typ: "nichtIch", optional: true, frage: "Optional: Welche Auftritte wollen Sie nicht sein?", wirkt: "Verbote im Gestaltungsbrief und in der Bildsprache.", min: 1 },
];

function hmF2Stand(mid) { return (hmStore.get("fragebogen2") || {})[mid] || {}; }
function hmF2Alt(mid) { return ((hmStore.get("fragebogen") || {})[mid] || {}).antworten || {}; }
function hmF2Logo(mid) { return ((((hmStore.get("branding") || {})[mid] || {}).material) || []).find((x) => (x.art === "Altes Logo" || x.art === "Logo") && x.vorschau) || null; }
function hmF2Liste(mid, a) { return [...HM_F2, ...HM_F2_BILD].filter((q) => !q.bedingt || q.bedingt(a || {}, mid)).filter((q) => !(q.typ === "logoTeile" || q.typ === "logoUrteil") || hmF2Logo(mid)); }
/* Seite von Pol a je Makler zufällig, einmal gewürfelt und gespeichert */
function hmF2Seiten(mid) {
  const st = hmF2Stand(mid);
  if (st.seiten) return st.seiten;
  const s = {}; HM_F2_BILD.filter((q) => q.typ === "paar").forEach((q) => { s[q.id] = Math.random() < 0.5 ? "ab" : "ba"; });
  hmStore.patch("fragebogen2", (x) => ({ ...(x || {}), [mid]: { ...((x || {})[mid] || {}), seiten: s } }));
  return s;
}

/* Vorbelegung: nur Fakten (f1, Objekte der Fälle, Kanäle aus den Konten). Haltungen bleiben leer */
function hmF2Faelle(txt) {
  return String(txt || "").split(/\.\s+(?=[A-ZÄÖÜ])/).map((s) => s.trim().replace(/\.$/, "")).filter(Boolean).slice(0, 3).map((s) => ({ objekt: s.split(",").slice(0, 2).join(",").trim(), ausschlag: "", wochen: "", abweichung: "", quelle: "erster Fragebogen" }));
}
function hmF2Vorbelegen(mid) {
  const a = hmF2Alt(mid); const v = {};
  if (a.bezirke || a.graetzl || a.immotypen || a.seit) v.f1 = { bezirke: a.bezirke || [], graetzl: a.graetzl || "", immotypen: a.immotypen || [], seit: a.seit || "", bestaetigt: false };
  const f = hmF2Faelle(a.abschluesse); if (f.length) v.f3 = f;
  const konten = (a.bestand || []).map((x) => String(x).toLowerCase());
  const k = {}; HM_F2_KANAELE.forEach(([id]) => { if (konten.includes(id)) k[id] = "aktiv"; });
  if (Object.keys(k).length) v.f14 = k;
  return v;
}
/* Frühere eigene Worte: als Zitat unter der Frage, übernommen nur auf Knopfdruck */
function hmF2Frueher(mid, q) {
  if (!q.frueher) return null;
  const a = hmF2Alt(mid); const w = a[q.frueher];
  if (!w || (Array.isArray(w) && !w.length)) return null;
  if (q.typ === "drei") { const l = String(w).split(/,\s*/).filter(Boolean).slice(0, 3); return l.length ? { text: l.join(", "), wert: l.concat(["", "", ""]).slice(0, 3) } : null; }
  if (q.typ === "ziel") return { text: String(w), wert: { wahl: HM_F2_ZIELE.includes(w) ? w : "", zaehlen: a.ziel_frei || "" } };
  return { text: String(w), wert: String(w) };
}

/* Rückschreiben in die Felder des ersten Fragebogens, damit die bestehende Kette die neuen Antworten liest */
function hmF2InV1(v, alt) {
  const a = { ...(alt || {}) };
  if (v.f1) { a.bezirke = v.f1.bezirke; a.graetzl = v.f1.graetzl; a.immotypen = v.f1.immotypen; a.seit = v.f1.seit; }
  if (v.f2) a.seite = Math.round((v.f2 - 1) / 6 * 100);
  if (v.f3) {
    const f = v.f3.filter((x) => x.objekt);
    a.abschluesse = f.map((x) => x.objekt + (x.ausschlag ? ", " + x.ausschlag : "")).join(". ");
    const b = f.filter((x) => x.wochen || x.abweichung).map((x) => `${x.objekt.split(",")[0]}${x.wochen ? ", " + x.wochen + " Wochen" : ""}${x.abweichung ? ", " + x.abweichung + " Prozent zum Angebotspreis" : ""}`);
    if (b.length) a.belege = b.join(". ") + ".";
  }
  if (typeof v.f6 === "string" && v.f6 && !/^Noch nie$|^Lieber im Workshop/.test(v.f6)) a.abgeraten = v.f6;
  if (v.f7) { a.hindernis = v.f7.wahl || []; a.hindernis_frei = v.f7.frei || ""; }
  if (v.f10) { a.ausloeser = v.f10.wahl || []; a.ausloeser_frei = v.f10.frei || ""; }
  if (v.f13) a.unity = v.f13;
  if (v.f14) { const r = { aktiv: 0, aufbauen: 1, nicht: 2 }; a.kanaele = HM_F2_KANAELE.map(([id]) => id).filter((id) => v.f14[id] && v.f14[id] !== "nicht").sort((x, y) => r[v.f14[x]] - r[v.f14[y]]); }
  if (v.f15) { const w = Object.values(v.f15); a.anrede = w.every((x) => x === "Sie") ? "Sie, überall" : w.every((x) => x === "Du") ? "Du, überall" : v.f15.instagram === "Du" && v.f15.website === "Sie" ? "Du auf Instagram, Sie sonst" : "Sie, überall"; }
  if (v.f16) a.worte = v.f16.filter(Boolean).join(", ");
  if (v.f17) HM_F2_STIMMEN.forEach((x) => { if (v.f17[x.id]) a[x.id] = v.f17[x.id] === "a" ? 25 : 75; });
  if (v.f18) a.erfolge = v.f18 === "Nein" ? 1 : v.f18 === "Ja" ? 4 : 3;
  if (v.f19) { a.privat = Object.entries(v.f19).filter(([, w]) => w === "zeigen").map(([t]) => t).filter((t) => HM_PRIVAT.includes(t)); a.tabus = Object.entries(v.f19).filter(([, w]) => w === "nie").map(([t]) => (t === "Familie" ? "Familie zeigen" : t === "Politik und Gesellschaft" ? "Politik" : t)).filter((t) => HM_TABUS.includes(t)).slice(0, 3); }
  if (v.f20) { a.formate = Object.entries(v.f20).filter(([, w]) => w !== "nie").map(([k]) => k); if (v.f20.talking === "nie") a.kamera = Math.min(a.kamera || 3, 2); }
  if (v.f21) a.zeit = v.f21;
  if (v.f22) a.cue = v.f22;
  if (v.f23) { if (v.f23.wahl) a.ziel = v.f23.wahl; a.ziel_frei = v.f23.zaehlen || ""; }
  if (v.b1 || v.b3) { const bp = { ...(a.bildpaare || {}) }; const warm = v.b3 === "a" || (v.b3 !== "b" && v.b1 === "a"); bp.bp5 = warm ? "a" : "b"; if (v.b2) bp.bp6 = v.b2 === "a" ? "a" : "b"; a.bildpaare = bp; }
  return a;
}
function hmF2Speichern(mid, patch) {
  hmStore.patch("fragebogen2", (s) => { const x = { ...((s || {})[mid] || {}) }; return { ...(s || {}), [mid]: { ...x, ...patch, antworten: { ...(x.antworten || {}), ...(patch.antworten || {}) } } }; });
  const st = hmF2Stand(mid); const v = st.antworten || {};
  hmStore.patch("fragebogen", (s) => { const x = { ...((s || {})[mid] || {}) }; return { ...(s || {}), [mid]: { ...x, antworten: hmF2InV1(v, x.antworten) } }; });
  const portrait = !!hmBrand(mid).portrait;
  hmStore.patch("vorlieben", (s) => ({ ...(s || {}), [mid]: { licht: v.b1 || null, mensch: v.b2 || null, farbtemperatur: v.b3 || null, ausschnitt: portrait ? (v.b4 || null) : "offen", typografie: v.b5 || null, bestandBehalten: v.b6 || [], bestandUrteil: v.b7 || null, nichtIch: v.b8 || [], paarStatus: "uebergang", seiten: st.seiten || null } }));
}
/* Abschluss legt keine Strategie mehr an: das Team startet die Schritte 5 und 6 selbst */
function hmF2Abschliessen(mid, wer) {
  hmF2Speichern(mid, { fertig: new Date().toISOString() });
  hmStore.patch("fragebogen", (s) => { const x = { ...((s || {})[mid] || {}) }; return { ...(s || {}), [mid]: { ...x, fertig: true, kapitelFertig: (window.HM_KAPITEL || []).map((k) => k.id) } }; });
  hmEvent(mid, "fragebogen", "Fragebogen v2 und Bildwahl abgeschlossen, Schritte 5 und 6 kann das Team starten", wer || "Makler");
}

/* Text mit Bezügen auf frühere Antworten; ohne Ausschlag die Textvariante statt eines erfundenen Zitats */
function hmF2Text(t, a, q) {
  const fall = a.f3 && a.f3[0];
  const f1 = fall && fall.objekt ? fall.objekt.split(",")[0] : "letzten Abschluss";
  const ausschlag = fall && fall.ausschlag ? fall.ausschlag.trim().replace(/[.„“"]+$/g, "") : "";
  let s = String((!ausschlag && q && q.frageOhne) || t || "");
  s = s.replace("{fall1}", f1).replace("{ausschlag}", ausschlag).replace("{alternative}", a.f4 && a.f4 !== "Weiß nicht" ? ({ Plattform: "eine Plattform", Privatverkauf: "ein Privatverkauf", Großbüro: "ein Großbüro", Einzelmakler: "ein anderer Einzelmakler" }[a.f4] || "der Bauträger-Vertrieb") : "die Alternative");
  if ((a.f2 || 0) >= 5) s = s.replace("Verkäuferseite", "Käuferseite").replace("Wer hat verkauft", "Wer hat gekauft");
  return s;
}
function hmF2Beantwortet(q, v) {
  if (v == null || v === "") return false;
  if (q.typ === "bestaetigen") return !!v.bestaetigt;
  if (q.typ === "faelle") return Array.isArray(v) && v.some((x) => x.objekt && x.ausschlag);
  if (q.typ === "mehrfach") return (v.wahl || []).length > 0 || !!v.frei;
  if (q.typ === "drei") return v.filter(Boolean).length >= 1;
  if (q.typ === "stimmen") return Object.keys(v).length >= 4;
  if (q.typ === "kanaele") return Object.keys(v).length > 0;
  if (q.typ === "anrede" || q.typ === "sichtbar" || q.typ === "formate") return Object.keys(v).length > 0;
  if (q.typ === "ziel") return !!v.wahl;
  if (q.typ === "logoTeile" || q.typ === "nichtIch") return Array.isArray(v);
  return true;
}
function hmF2Kurz(q, v) {
  if (v == null) return "";
  if (q.typ === "bestaetigen") return [(v.graetzl || "").split(",")[0], ...(v.bezirke || []).map((x) => x.replace(/^\d{4}\s/, ""))].filter(Boolean).slice(0, 3).join(", ");
  if (q.typ === "stufen") return HM_F2_STUFEN[v - 1] || "";
  if (q.typ === "faelle") return v.filter((x) => x.ausschlag).map((x) => x.ausschlag).slice(0, 2).join("; ");
  if (q.typ === "mehrfach") return [...(v.wahl || []), v.frei].filter(Boolean).join(", ");
  if (q.typ === "drei") return v.filter(Boolean).join(", ");
  if (q.typ === "stimmen") return HM_F2_STIMMEN.map((x) => v[x.id] === "a" ? "ruhig, sachlich" : v[x.id] === "b" ? "nah, bestimmt" : "").filter(Boolean).slice(0, 1).join("");
  if (q.typ === "kanaele") return HM_F2_KANAELE.filter(([id]) => v[id] === "aktiv").map(([, n]) => n).join(", ") || "noch keiner aktiv";
  if (q.typ === "anrede") return [...new Set(Object.values(v))].length === 1 ? `${Object.values(v)[0]} überall` : "je Kanal verschieden";
  if (q.typ === "sichtbar") return `${Object.values(v).filter((x) => x === "nie").length} Themen nie`;
  if (q.typ === "formate") return Object.entries(v).filter(([, w]) => w === "gern").map(([k]) => (HM_FORMATE[k] || {}).name).filter(Boolean).join(", ");
  if (q.typ === "ziel") return v.wahl || "";
  if (q.typ === "paar") return v === "a" ? q.a.t : v === "b" ? q.b.t : "Beides gleich";
  if (q.typ === "logoTeile") return v.length ? v.join(", ") : "nichts davon";
  if (q.typ === "logoUrteil") return v === "schaerfen" ? "Schärfen" : "Neu";
  if (q.typ === "nichtIch") return `${v.filter(Boolean).length} Angaben`;
  return String(v).slice(0, 60);
}
/* Braucht die Antwort die eine Regel-Nachfrage? f5, f6 unter acht Wörtern, f3 ohne jede Zahl */
function hmF2BrauchtNachfrage(q, v) {
  if (!q.nachfrage || v == null) return false;
  if (q.typ === "faelle") return Array.isArray(v) && v.some((x) => x.objekt && x.ausschlag) && !v.some((x) => x.wochen || x.abweichung || /\d/.test(x.ausschlag || ""));
  if (typeof v !== "string" || (q.schnell || []).includes(v)) return false;
  return v.trim().split(/\s+/).filter(Boolean).length < 8;
}
/* Restzeit aus denselben Setzungen wie im Ablauf (Fragebogen, Fremdbild-Link, Bildwahl), anteilig nach Gewicht */
function hmF2Restzeit(liste, pos, fremdbildOffen) {
  const D = window.HM_STAND_DAUER || { fragebogen: { min: 15 }, fremdbild: { min: 2 }, bildwahl: { min: 4 } };
  const teil = (l, ab) => { const g = l.reduce((s, x) => s + (x.min || 0.5), 0) || 1; return l.filter((x) => liste.indexOf(x) >= ab).reduce((s, x) => s + (x.min || 0.5), 0) / g; };
  const F = liste.filter((x) => x.id.startsWith("f")), B = liste.filter((x) => x.id.startsWith("b") && !x.probe);
  return D.fragebogen.min * teil(F, pos) + D.bildwahl.min * teil(B, pos) + (fremdbildOffen ? D.fremdbild.min : 0);
}

/* ---------- Eingaben ---------- */
function F2Chip({ an, onClick, children }) { return <button className={"hm-chip" + (an ? " on" : "")} onClick={onClick} aria-pressed={!!an}>{children}</button>; }
function F2Bestaetigen({ v, upd }) {
  const x = v || { bezirke: [], graetzl: "", immotypen: [], seit: "" };
  const [edit, setEdit] = React.useState(null);
  const zeilen = [["graetzl", "Kern-Grätzl", x.graetzl], ["bezirke", "Bezirke", (x.bezirke || []).join(", ")], ["immotypen", "Objektarten", (x.immotypen || []).join(", ")], ["seit", "Am Markt seit", x.seit]];
  return <div className="hm-gruppe">{zeilen.map(([k, n, w]) => <div key={k} className="hm-reihe" style={{ alignItems: "flex-start" }}>
    <div className="m"><div className="u">{n}</div>{edit === k ? <input autoFocus className="hm-f2-frei" style={{ marginTop: 6 }} defaultValue={w} onBlur={(e) => { const val = e.target.value; upd({ [k]: ["bezirke", "immotypen"].includes(k) ? val.split(/,\s*/).filter(Boolean) : val }); setEdit(null); }} onKeyDown={(e) => e.key === "Enter" && e.target.blur()} /> : <div className="t" style={{ whiteSpace: "normal" }}>{w || "Fehlt"}</div>}</div>
    <button className="hm-link" onClick={() => setEdit(edit === k ? null : k)}>{edit === k ? "Fertig" : "Ändern"}</button>
  </div>)}
    <div className="hm-reihe"><div className="m"><div className="t">{x.bestaetigt ? "Bestätigt" : "Stimmt alles?"}</div></div><Btn onClick={() => upd({ bestaetigt: true })} knob="haken">{x.bestaetigt ? "Bestätigt" : "Ja, stimmt"}</Btn></div>
  </div>;
}
function F2LogoUrteil({ v, set, a, m }) {
  const lg = hmF2Logo(m.id);
  const teile = a.b6 || [];
  const empf = teile.length > 0 ? "schaerfen" : "neu";
  const grund = empf === "schaerfen" ? `Empfohlen, weil Sie ${teile.length > 1 ? teile.slice(0, -1).join(", ") + " und " + teile[teile.length - 1] : teile[0]} Ihres Logos behalten möchten.` : "Empfohlen, weil Sie an keinem Teil Ihres Logos hängen.";
  return <div>
    {lg && <div className="hm-f2-karte" aria-label="Ihr bisheriges Logo auf einer Visitenkarte"><img src={lg.vorschau} alt="Ihr bisheriges Logo" /><span>{m.name}<br />{m.region}</span></div>}
    <div className="hm-f2-optionen" style={{ marginTop: 16 }}>{[["schaerfen", "Schärfen", "Wortmarke und Farben bleiben in der Familie, nur präziser."], ["neu", "Neu", "Ein neues Zeichen aus Ihrer Idee."]].map(([k, n, s]) => <button key={k} className={"hm-f2-option gross" + (v === k ? " on" : "")} onClick={() => set(k)}><b>{n}{empf === k ? ", empfohlen" : ""}</b><span>{s}</span>{empf === k && <span>{grund}</span>}</button>)}</div>
  </div>;
}
function F2NichtIch({ v, set, m }) {
  const ja = window.hmEinwilligung ? hmEinwilligung(m.id, 8) === "ja" : false;
  const l = (Array.isArray(v) ? v : []).concat(["", "", ""]).slice(0, ja ? 3 : 1);
  return <div>
    <p className="hm-f2-hilfe" style={{ marginTop: 0, marginBottom: 12 }}>{ja ? "Ein Link, ein eingefügter Text oder ein Satz in Ihren Worten. Wir lesen nur ein Merkmal heraus und löschen die Beispiele nach 14 Tagen." : "Beschreiben Sie in einem Satz, was Sie nicht sein wollen. Wir speichern keinen fremden Auftritt."}</p>
    <div className={ja ? "hm-f2-drei" : ""}>{l.map((w, i) => <input key={i} className={ja ? "" : "hm-f2-frei"} style={ja ? undefined : { marginTop: 0 }} value={w} placeholder={ja ? "Link, Text oder ein Satz" : "Ein Satz"} onChange={(e) => set(l.map((x, j) => j === i ? e.target.value : x))} />)}</div>
  </div>;
}
function F2Eingabe({ q, v, set, a, m, weiter, zurueck, seiten }) {
  const upd = (patch) => set({ ...(v || {}), ...patch });
  if (q.typ === "text") return <div className="hm-f2-text">
    <textarea rows={3} value={typeof v === "string" ? v : ""} placeholder={q.platz} onChange={(e) => set(e.target.value)} autoFocus />
    {q.schnell && <div className="hm-row" style={{ gap: 8, marginTop: 10 }}>{q.schnell.map((s) => <F2Chip key={s} an={v === s} onClick={() => set(s)}>{s}</F2Chip>)}</div>}
  </div>;
  if (q.typ === "eine") return <div className="hm-f2-optionen">{q.optionen.map((o) => <button key={o} className={"hm-f2-option" + (v === o ? " on" : "")} onClick={() => set(o)}>{o}</button>)}</div>;
  if (q.typ === "mehrfach") { const w = (v && v.wahl) || []; return <div>
    <div className="hm-f2-optionen">{q.optionen.map((o) => <button key={o} className={"hm-f2-option" + (w.includes(o) ? " on" : "")} onClick={() => upd({ wahl: w.includes(o) ? w.filter((x) => x !== o) : w.length >= q.max ? [...w.slice(1), o] : [...w, o] })}>{o}</button>)}</div>
    {q.frei && <input className="hm-f2-frei" placeholder="In eigenen Worten, zählt genauso" value={(v && v.frei) || ""} onChange={(e) => upd({ frei: e.target.value })} />}
    <div className="hm-daten" style={{ marginTop: 8 }}>Bis zu {q.max}</div>
  </div>; }
  if (q.typ === "stufen") return <div className="hm-f2-stufen">
    <div className="stufen" role="radiogroup" aria-label={hmF2Text(q.frage, a, q)}>{HM_F2_STUFEN.map((t, i) => <button key={t} role="radio" aria-checked={v === i + 1} className={v === i + 1 ? "on" : ""} onClick={() => set(i + 1)} aria-label={t}><i /></button>)}</div>
    <div className="hm-row" style={{ justifyContent: "space-between" }}><span>{q.links}</span><span>{q.rechts}</span></div>
    <div className="gewaehlt" aria-live="polite">{v ? HM_F2_STUFEN[v - 1] : ""}</div>
  </div>;
  if (q.typ === "bestaetigen") return <F2Bestaetigen v={v} upd={upd} />;
  if (q.typ === "faelle") { const l = (v && v.length ? v : [{}, {}, {}]).concat([{}, {}, {}]).slice(0, 3); const setI = (i, patch) => set(l.map((x, j) => j === i ? { ...x, ...patch } : x));
    return <div className="hm-f2-faelle">{l.map((x, i) => <div key={i} className="hm-f2-fall">
      <div className="kopf"><span className="hm-daten">Fall {i + 1}</span>{x.quelle && <span className="hm-daten">aus {x.quelle}</span>}</div>
      <input className="obj" placeholder="Objekt und Lage" value={x.objekt || ""} onChange={(e) => setI(i, { objekt: e.target.value })} />
      <textarea rows={2} placeholder="Was gab den Ausschlag, in Ihren Worten" value={x.ausschlag || ""} onChange={(e) => setI(i, { ausschlag: e.target.value })} />
      <div className="zahlen"><label>Dauer<input inputMode="numeric" placeholder="Wochen" value={x.wochen || ""} onChange={(e) => setI(i, { wochen: e.target.value.replace(/[^\d,]/g, "") })} /></label><label>zum Angebotspreis<input inputMode="decimal" placeholder="Prozent, plus oder minus" value={x.abweichung || ""} onChange={(e) => setI(i, { abweichung: e.target.value.replace(/[^\d,+\-]/g, "") })} /></label></div>
    </div>)}<div className="hm-daten">Der Kaufpreis zählt nie als Beleg und erscheint nirgends.</div></div>; }
  if (q.typ === "kanaele") { const x = v || {}; return <div className="hm-gruppe">{HM_F2_KANAELE.map(([id, n]) => <div key={id} className="hm-reihe"><div className="m"><div className="t">{n}</div></div><div className="hm-seg klein">{[["aktiv", "Aktiv"], ["aufbauen", "Aufbauen"], ["nicht", "Nutze ich nicht"]].map(([k, t]) => <button key={k} className={x[id] === k ? "on" : ""} onClick={() => upd({ [id]: k })}>{t}</button>)}</div></div>)}</div>; }
  if (q.typ === "anrede") { const k = a.f14 || {}; const sichtbar = HM_F2_KANAELE.filter(([id]) => k[id] && k[id] !== "nicht").concat([["website", "Website"], ["email", "E-Mail"]]); const x = v || {};
    return <div className="hm-gruppe">{sichtbar.map(([id, n]) => <div key={id} className="hm-reihe"><div className="m"><div className="t">{n}</div></div><div className="hm-seg klein">{["Sie", "Du"].map((w) => <button key={w} className={x[id] === w ? "on" : ""} onClick={() => upd({ [id]: w })}>{w}</button>)}</div></div>)}</div>; }
  if (q.typ === "drei") { const l = (v || ["", "", ""]).concat(["", "", ""]).slice(0, 3); return <div className="hm-f2-drei">{l.map((w, i) => <input key={i} value={w} placeholder={["erstes Wort", "zweites Wort", "drittes Wort"][i]} onChange={(e) => set(l.map((x, j) => j === i ? e.target.value : x))} autoFocus={i === 0} />)}</div>; }
  if (q.typ === "stimmen") { const x = v || {}; return <div className="hm-f2-stimmen">{HM_F2_STIMMEN.map((s) => <div key={s.id} className="hm-f2-stimme"><div className="lage">{s.lage}</div><div className="paar">{["a", "b"].map((k) => <button key={k} className={x[s.id] === k ? "on" : ""} onClick={() => upd({ [s.id]: k })}>{s[k]}</button>)}</div></div>)}</div>; }
  if (q.typ === "sichtbar") { const x = v || {}; return <div className="hm-gruppe">{HM_F2_THEMEN.map((t) => <div key={t} className="hm-reihe"><div className="m"><div className="t">{t}</div></div><div className="hm-seg klein">{[["zeigen", "Zeigen"], ["nie", "Nie"]].map(([k, n]) => <button key={k} className={x[t] === k ? "on" : ""} onClick={() => upd({ [t]: k })}>{n}</button>)}</div></div>)}</div>; }
  if (q.typ === "formate") { const x = v || {}; return <div className="hm-gruppe">{Object.entries(HM_FORMATE).map(([id, f]) => <div key={id} className="hm-reihe"><div className="m"><div className="t">{f.name}</div><div className="u">{HM_F2_FORMATE_SIE[id] || ""}</div></div><div className="hm-seg klein">{[["gern", "Gern"], ["geht", "Geht"], ["nie", "Nie"]].map(([k, n]) => <button key={k} className={x[id] === k ? "on" : ""} onClick={() => upd({ [id]: k })}>{n}</button>)}</div></div>)}</div>; }
  if (q.typ === "ziel") { const x = v || {}; return <div><div className="hm-f2-optionen">{HM_F2_ZIELE.map((o) => <button key={o} className={"hm-f2-option" + (x.wahl === o ? " on" : "")} onClick={() => upd({ wahl: o })}>{o}</button>)}</div><label className="hm-f2-label">Woran würden Sie das zählen?<input className="hm-f2-frei" placeholder="Woran Sie das in zwölf Monaten zählen würden" value={x.zaehlen || ""} onChange={(e) => upd({ zaehlen: e.target.value })} /></label></div>; }
  if (q.typ === "paar") return <F2Paar q={q} v={v} set={set} m={m} weiter={weiter} zurueck={zurueck} seite={(seiten || {})[q.id] || "ab"} />;
  if (q.typ === "logoTeile") { const lg = hmF2Logo(m.id); const teile = ["Farbe", "Schrift", "Zeichen", "Name, wie er dasteht", "Form"]; const l = Array.isArray(v) ? v : []; return <div><div className="hm-f2-logo">{lg && <img src={lg.vorschau} alt="Ihr bisheriges Logo" />}</div><div className="hm-row" style={{ gap: 8, flexWrap: "wrap", marginTop: 14 }}>{teile.map((t) => <F2Chip key={t} an={l.includes(t)} onClick={() => set(l.includes(t) ? l.filter((x) => x !== t) : [...l, t])}>{t}</F2Chip>)}<F2Chip an={Array.isArray(v) && !l.length} onClick={() => set([])}>Nichts davon</F2Chip></div></div>; }
  if (q.typ === "logoUrteil") return <F2LogoUrteil v={v} set={set} a={a} m={m} />;
  if (q.typ === "nichtIch") return <F2NichtIch v={v} set={set} m={m} />;
  return null;
}
/* Ein Paar: kein Wort am Bild, Tippen wählt und blendet nach 180 ms das nächste Paar ein */
function F2Paar({ q, v, set, m, weiter, zurueck, seite }) {
  const [src, setSrc] = React.useState({});
  const [weg, setWeg] = React.useState(false);
  const b = hmBrand(m.id);
  React.useEffect(() => { let aus = false; ["a", "b"].forEach((k) => { const s = q[k].src; if (!s) return; const u = hmAbs("/assets/" + s); (window.hmWebBildKlein ? hmWebBildKlein(u, { w: 900 }) : Promise.resolve(u)).then((x) => !aus && setSrc((o) => ({ ...o, [k]: x }))); }); return () => { aus = true; }; }, [q.id]);
  const waehlen = (k) => { set(k); setWeg(true); setTimeout(() => { setWeg(false); if (weiter) weiter(k); }, 180); };
  const [links, rechts] = seite === "ba" ? ["b", "a"] : ["a", "b"];
  React.useEffect(() => {
    const taste = (e) => { const t = e.target && e.target.tagName; if (t === "INPUT" || t === "TEXTAREA") return;
      if (e.key === "ArrowLeft") { e.preventDefault(); waehlen(links); } else if (e.key === "ArrowRight") { e.preventDefault(); waehlen(rechts); } else if (e.key === "ArrowDown") { e.preventDefault(); waehlen("gleich"); } else if (e.key === "Backspace" && zurueck) { e.preventDefault(); zurueck(); } };
    window.addEventListener("keydown", taste); return () => window.removeEventListener("keydown", taste);
  }, [q.id, links]);
  const bild = (k) => {
    const o = q[k];
    if (q.schrift) return <div className="hm-f2-schrift" style={{ fontFamily: `"${o.f}", ${o.f === "Newsreader" ? "Georgia, serif" : "system-ui, sans-serif"}` }}>{b.claim || "Erst verstehen. Dann verkaufen."}</div>;
    if (q.portrait) return <img src={b.portrait} alt="" style={{ objectPosition: "50% 18%", transform: k === "b" ? "scale(1.9)" : "none", transformOrigin: "50% 20%" }} />;
    return src[k] ? <img src={src[k]} alt="" style={{ filter: o.filter || "none" }} /> : <div className="hm-f2-leer" />;
  };
  return <div>
    <div className={"hm-f2-paar" + (weg ? " weg" : "")}>
      <button className={"wahl" + (v === links ? " on" : "")} onClick={() => waehlen(links)} aria-pressed={v === links} aria-label={q.probe ? "Linkes Bild" : `Linkes Bild, ${q[links].t}`}><span className="bild">{bild(links)}</span></button>
      <button className={"gleich" + (v === "gleich" ? " on" : "")} onClick={() => waehlen("gleich")} aria-pressed={v === "gleich"}>Beides gleich</button>
      <button className={"wahl" + (v === rechts ? " on" : "")} onClick={() => waehlen(rechts)} aria-pressed={v === rechts} aria-label={q.probe ? "Rechtes Bild" : `Rechtes Bild, ${q[rechts].t}`}><span className="bild">{bild(rechts)}</span></button>
    </div>
    <div className="hm-f2-tasten">Auf dem Rechner: Pfeil links oder rechts wählt, Pfeil nach unten heißt beides gleich.</div>
  </div>;
}

/* Fremdbild-Link am Ende: nur mit Ja zu Einwilligung 3 */
function F2FremdbildLink({ m }) {
  useHm("auftrag"); useHm("fremdbild");
  const w = window.hmEinwilligung ? hmEinwilligung(m.id, 3) : "offen";
  const n = ((hmStore.get("fremdbild") || {})[m.id] || []).length;
  const url = `${location.origin}${location.pathname}?ansicht=fremdbild&makler=${encodeURIComponent(m.id)}`;
  const text = `Ich baue gerade meine Marke neu auf. Würden Sie mir mit drei Wörtern helfen? Es dauert eine Minute.`;
  const teilen = async () => { try { if (navigator.share) { await navigator.share({ title: "Drei Wörter", text, url }); return; } } catch (e) { return; } try { await navigator.clipboard.writeText(url); toast("Link kopiert"); } catch (e) { /* Rückfall unten */ } };
  const f = window.hmEinwFrist ? hmEinwFrist(m.id, 3) : null;
  return <section className="hm-f2-fremdbild" aria-label="Fremdbild-Link">
    <h2>Ein Link für drei Menschen, die Sie empfehlen würden</h2>
    {w === "ja" ? <>
      <p>Schicken Sie ihn selbst weiter, an Kundschaft, Partner oder Kollegen. Sie nennen drei Wörter für Ihre Arbeit, wir vergleichen sie mit Ihren eigenen. Die Antwortenden stimmen auf ihrer Seite selbst zu.{n ? ` Bisher ${n === 1 ? "eine Antwort" : n + " Antworten"}.` : ""}</p>
      <div className="hm-row" style={{ gap: 14, flexWrap: "wrap" }}>{typeof navigator !== "undefined" && navigator.share && <Btn onClick={teilen}>Link teilen</Btn>}<KopierKnopf text={url} label="Link kopieren" /></div>
    </> : w === "spaeter" || w === "offen" ? <p>Dafür brauchen wir Ihr Ja zum Fremdbild-Link unter Ihr Stand, Einwilligungen.{f ? ` ${f.text}.` : ""}</p> : <p>Sie haben Nein gesagt. Der Abgleich mit Ihren drei Wörtern entfällt.</p>}
  </section>;
}
/* Die Seite für die Antwortenden: drei Wörter, eigene Zustimmung, keine Namen */
function Fremdbild({ m }) {
  hmF2Stil();
  const [w, setW] = React.useState(["", "", ""]);
  const [ok, setOk] = React.useState(false);
  const [fertig, setFertig] = React.useState(false);
  const erlaubt = window.hmEinwilligung ? hmEinwilligung(m.id, 3) === "ja" : false;
  if (!erlaubt) return <div className="hm-f2-ende"><h1 className="hm-h hm-h1">Dieser Link ist nicht aktiv.</h1><p className="hm-sub">Bitte fragen Sie die Person, die ihn geschickt hat.</p></div>;
  if (fertig) return <div className="hm-f2-ende"><h1 className="hm-h hm-h1">Danke.</h1><p className="hm-sub">Ihre drei Wörter sind angekommen. Wir speichern keinen Namen und keine Kontaktdaten.</p></div>;
  const senden = () => { hmStore.patch("fremdbild", (s) => ({ ...(s || {}), [m.id]: [...((s || {})[m.id] || []), { worte: w.map((x) => x.trim()).filter(Boolean), am: new Date().toISOString(), zustimmung: true }] })); hmEvent(m.id, "fremdbild", "Neue Antwort im Fremdbild", "Link"); setFertig(true); };
  return <div className="hm-f2-start">
    <h1 className="hm-h hm-h1">Drei Wörter für {m.name}</h1>
    <p className="hm-sub">Mit welchen drei Wörtern beschreiben Sie die Arbeit von {m.name}? Es dauert eine Minute. Wir fragen nicht nach Ihrem Namen.</p>
    <div className="hm-f2-drei">{w.map((x, i) => <input key={i} value={x} placeholder={["erstes Wort", "zweites Wort", "drittes Wort"][i]} onChange={(e) => setW(w.map((y, j) => j === i ? e.target.value : y))} autoFocus={i === 0} />)}</div>
    <label className="hm-row" style={{ gap: 10, alignItems: "flex-start", fontSize: 15, color: "var(--ink-2)" }}><input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} style={{ marginTop: 4 }} />Ich bin einverstanden, dass UNIO meine drei Wörter ohne Namen speichert und {m.name} sie zusammen mit anderen Antworten sieht.</label>
    <Btn onClick={senden} disabled={!ok || !w.some((x) => x.trim())}>Absenden</Btn>
  </div>;
}

/* ---------- Ablauf ---------- */
function Fragebogen2({ m, allein, fertigZiel, teamSicht }) {
  hmF2Stil();
  useHm("fragebogen2"); useHm("auftrag"); useHm("branding"); useHm("portraits");
  const st = hmF2Stand(m.id);
  const a = st.antworten || {};
  const liste = hmF2Liste(m.id, a);
  const [pos, setPos] = React.useState(st.start ? Math.min(st.pos || 0, liste.length) : -1);
  const [nachfrage, setNachfrage] = React.useState(null);
  const [t0, setT0] = React.useState(Date.now());
  React.useEffect(() => { setT0(Date.now()); }, [pos]);
  React.useEffect(() => { if (st.start && !st.seiten) hmF2Seiten(m.id); }, [st.start]);
  const ld = window.hmStandLinkDauer ? hmStandLinkDauer() : { text: "21 Minuten: Fragebogen 15, Fremdbild-Link 2, Bildwahl 4." };
  const fotopaare = liste.filter((q) => q.typ === "paar" && !q.probe && !q.schrift).length;
  const starten = () => { const vor = hmF2Vorbelegen(m.id); hmF2Seiten(m.id); hmF2Speichern(m.id, { start: st.start || new Date().toISOString(), pos: 0, antworten: { ...vor, ...a }, vorbelegt: Object.keys(vor) }); setPos(0); };
  if (pos < 0) {
    const vorKeys = Object.keys(hmF2Vorbelegen(m.id));
    return <div className="hm-f2-start">
      <h1 className="hm-h hm-h1">Ihr Fragebogen</h1>
      <p className="hm-sub">23 Fragen zu Ihren Fällen und Kunden, danach {hmStandZahlWort(fotopaare)} Fotopaare und eine Schriftprobe. Etwa {ld.text} Sie können jederzeit unterbrechen, alles wird gespeichert.</p>
      <div className="hm-f2-versprechen">
        <div><b>Jede Frage verändert etwas.</b><span>Neben jeder Frage steht, wofür wir die Antwort brauchen. Rechts sehen Sie, wofür wir jede Antwort verwenden.</span></div>
        <div><b>Fakten stehen schon da.</b><span>{vorKeys.length ? `${vorKeys.length === 1 ? "Eine Angabe übernehmen" : vorKeys.length + " Angaben übernehmen"} wir aus Ihrem ersten Fragebogen und Ihren Konten. Sie bestätigen oder ändern nur.` : "Was wir schon wissen, bestätigen Sie nur."}</span></div>
        <div><b>Haltungen geben wir nie vor.</b><span>Was Sie denken und wie Sie arbeiten, schreiben nur Sie. Frühere Antworten zeigen wir Ihnen, übernommen werden sie nur, wenn Sie das möchten.</span></div>
      </div>
      <Btn onClick={starten}>{st.start ? "Weitermachen" : "Beginnen"}</Btn>
    </div>;
  }
  if (pos >= liste.length) {
    const fertig = !!st.fertig;
    const gezaehlt = liste.filter((q) => !q.probe && !q.optional);
    return <div className="hm-f2-ende">
      <h1 className="hm-h hm-h1">{fertig ? "Danke. Das war alles." : "Fast fertig."}</h1>
      <p className="hm-sub">{fertig ? "Ihre Antworten sind bei uns. Im Workshop hören wir die Geschichten dahinter." : `${gezaehlt.filter((q) => hmF2Beantwortet(q, a[q.id])).length} von ${gezaehlt.length} beantwortet. Offene Fragen besprechen wir im Workshop.`}</p>
      <F2FremdbildLink m={m} />
      <F2Wirkung liste={liste} a={a} gross />
      <div className="hm-row" style={{ gap: 14, marginTop: 20 }}>{!fertig && <Btn onClick={() => { hmF2Abschliessen(m.id, allein ? "Makler" : "Team"); toast("Fragebogen abgeschlossen"); }}>Abschicken</Btn>}<button className="hm-link" onClick={() => setPos(0)}>Antworten ansehen</button>{fertig && fertigZiel && <button className="hm-link" onClick={fertigZiel}>Zurück zu Ihrem Stand</button>}</div>
    </div>;
  }
  const q = liste[pos]; const v = a[q.id];
  const set = (val) => hmF2Speichern(m.id, { antworten: { [q.id]: val } });
  const vor = (wahl) => {
    const antwort = wahl !== undefined ? wahl : v;
    const z = { ...(st.zeiten || {}), [q.id]: Math.round((Date.now() - t0) / 1000) };
    const schon = st.nachgefragt || [];
    if (!nachfrage && hmF2BrauchtNachfrage(q, antwort) && !schon.includes(q.id)) { hmF2Speichern(m.id, { zeiten: z, nachgefragt: [...schon, q.id] }); setNachfrage(q.id); return; }
    setNachfrage(null); hmF2Speichern(m.id, { pos: pos + 1, zeiten: z }); setPos(pos + 1);
  };
  const zurueck = () => { setNachfrage(null); const p = Math.max(0, pos - 1); hmF2Speichern(m.id, { pos: p }); setPos(p); };
  const nurFragen = liste.filter((x) => x.id.startsWith("f")); const iF = nurFragen.indexOf(q);
  const bilder = liste.filter((x) => x.id.startsWith("b") && !x.probe); const iB = bilder.indexOf(q);
  const rest = Math.round(hmF2Restzeit(liste, pos, !((hmStore.get("fremdbild") || {})[m.id] || []).length));
  const vorbelegt = (st.vorbelegt || []).includes(q.id);
  const frueher = hmF2Frueher(m.id, q);
  const kopf = iF >= 0 ? `Frage ${iF + 1} von ${nurFragen.length}, ${q.gruppe}` : q.probe ? "Bildwahl, zum Ausprobieren" : `${q.gruppe}, ${iB + 1} von ${bilder.length}`;
  const zeigeTeamHinweis = teamSicht && q.typ === "paar" && q.uebergang;
  const ohnePortrait = teamSicht && q.id === "b5" && !hmBrand(m.id).portrait;
  return <div className="hm-f2">
    <div className="hm-f2-kopf"><span>{kopf}</span><span className="hm-daten">{rest <= 1 ? "noch etwa eine Minute" : `noch etwa ${rest} Minuten`}</span></div>
    <div className="hm-f2-split">
      <div className="hm-f2-frage" onKeyDown={(e) => { if (e.key === "Enter" && e.target.tagName !== "TEXTAREA" && q.typ !== "paar" && hmF2Beantwortet(q, v)) vor(); }}>
        {zeigeTeamHinweis && <p className="hm-f2-hinweis">Übergangsbilder, nicht der Paarsatz. Die Wahl zählt nicht für Kohorte und Pretest.</p>}
        {ohnePortrait && <p className="hm-f2-hinweis">Kein Porträt hinterlegt: Das Paar zum Ausschnitt entfällt, der Wert bleibt offen.</p>}
        {nachfrage === q.id ? <>
          <h2 className="hm-f2-titel">{HM_F2_NACHFRAGE}</h2>
          <p className="hm-f2-hilfe">Eine kurze Nachfrage zu Ihrer letzten Antwort. Sie können sie überspringen.</p>
          <div className="hm-f2-eingabe"><div className="hm-f2-text"><textarea rows={3} autoFocus value={a[q.id + "_nachfrage"] || ""} onChange={(e) => hmF2Speichern(m.id, { antworten: { [q.id + "_nachfrage"]: e.target.value } })} /></div></div>
          <div className="hm-f2-nav"><button className="hm-chip" onClick={() => setNachfrage(null)}>Zurück</button><span style={{ flex: 1 }} /><button className="hm-link" onClick={() => vor()}>Überspringen</button><Btn onClick={() => vor()} disabled={!(a[q.id + "_nachfrage"] || "").trim()}>Weiter</Btn></div>
        </> : <>
          <h2 className="hm-f2-titel">{hmF2Text(q.frage, a, q)}</h2>
          {q.hilfe && <p className="hm-f2-hilfe">{q.hilfe}</p>}
          <div className="hm-f2-wofuer"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg><span>Wofür wir das brauchen: {q.wirkt}</span>{vorbelegt && <em>vorbelegt, bitte prüfen</em>}</div>
          {frueher && !hmF2Beantwortet(q, v) && <div className="hm-f2-frueher"><span>Im ersten Fragebogen schrieben Sie: „{frueher.text}“</span><button className="hm-link" onClick={() => set(frueher.wert)}>Übernehmen</button></div>}
          <div className="hm-f2-eingabe"><F2Eingabe key={q.id} q={q} v={v} set={set} a={a} m={m} weiter={vor} zurueck={pos > 0 ? zurueck : null} seiten={st.seiten} /></div>
          <div className="hm-f2-nav">
            <button className="hm-chip" onClick={pos === 0 ? () => setPos(-1) : zurueck}>{pos === 0 ? "Übersicht" : "Zurück"}</button>
            <span style={{ flex: 1 }} />
            {!hmF2Beantwortet(q, v) && <button className="hm-link" onClick={() => vor()}>Überspringen</button>}
            {q.typ !== "paar" && <Btn onClick={() => vor()} disabled={!hmF2Beantwortet(q, v)}>{pos + 1 === liste.length ? "Zum Abschluss" : "Weiter"}</Btn>}
          </div>
        </>}
      </div>
      <F2Wirkung liste={liste} a={a} aktiv={q.id} />
    </div>
  </div>;
}
const hmStandZahlWort = (n) => ["keine", "ein", "zwei", "drei", "vier", "fünf"][n] || String(n);
function F2Wirkung({ liste, a, aktiv, gross }) {
  const l = liste.filter((q) => !q.probe);
  const beantwortet = l.filter((q) => hmF2Beantwortet(q, a[q.id]));
  return <aside className={"hm-f2-wirkung" + (gross ? " gross" : "")} aria-label="Wofür wir Ihre Antworten verwenden">
    <div className="kopf">Wofür wir Ihre Antworten verwenden<span className="hm-daten">{beantwortet.length} von {l.length}</span></div>
    {!beantwortet.length && <p className="hm-daten">Mit jeder Antwort erscheint hier, wofür wir sie verwenden.</p>}
    <ol>{beantwortet.map((q) => <li key={q.id} className={q.id === aktiv ? "an" : ""}><div className="w">{q.wirkt}</div><div className="a">{hmF2Kurz(q, a[q.id])}</div></li>)}</ol>
  </aside>;
}

function hmSelbsttestFragen2() {
  const out = []; const t = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: e.message }); } };
  t("23 Fragen, jede mit Wirkung", () => ({ ok: HM_F2.length === 23 && HM_F2.every((q) => q.wirkt && q.frage), detail: `${HM_F2.length} Fragen, ${HM_F2_BILD.length} Bildschirme Bildwahl` }));
  t("Vier Fotopaare und eine Schriftprobe, dazu ein Probepaar (C2)", () => { const p = HM_F2_BILD.filter((q) => q.typ === "paar"); return { ok: p.filter((q) => !q.probe && !q.schrift).length === 4 && p.filter((q) => q.schrift).length === 1 && p.filter((q) => q.probe).length === 1 && !HM_F2_BILD.some((q) => /Dichte|Material|Ordnung/.test(q.frage)) }; });
  const v = hmF2Vorbelegen("markus");
  t("Nur Fakten vorbelegt, Haltungen leer", () => { const haltung = ["f2", "f5", "f6", "f7", "f8", "f9", "f10", "f13", "f15", "f16", "f17", "f18", "f19", "f20", "f21", "f22", "f23"]; const belegt = haltung.filter((k) => v[k] != null); return { ok: !!v.f1 && !!v.f3 && !belegt.length, detail: belegt.length ? "vorbelegt: " + belegt.join(", ") : Object.keys(v).join(", ") }; });
  t("Frühere Worte als Zitat, nicht als Wert", () => { const q = HM_F2.find((x) => x.id === "f6"); const f = hmF2Frueher("markus", q); return { ok: !!f && !v.f6, detail: f ? f.text.slice(0, 40) : "kein früherer Text" }; });
  t("Fall-Karten aus dem ersten Fragebogen", () => ({ ok: (v.f3 || []).length === 3 && v.f3.every((x) => x.objekt && !x.ausschlag), detail: (v.f3 || []).map((x) => x.objekt).join(" | ") }));
  t("Ohne Ausschlag kein Zitat in der Frage", () => { const q = HM_F2.find((x) => x.id === "f8"); const s = hmF2Text(q.frage, { f3: [{ objekt: "Zinshaus Sieveringer Straße" }] }, q); return { ok: !/[„“"]/.test(s) && /Zinshaus/.test(s), detail: s }; });
  t("Käufer-Makler: Käuferseite statt Verkäuferseite", () => { const q = HM_F2.find((x) => x.id === "f8"); const s = hmF2Text(q.frage, { f2: 6, f3: [{ objekt: "Wohnung", ausschlag: "Ruhe" }] }, q); return { ok: /Käuferseite/.test(s) && !/Verkäuferseite/.test(s), detail: s }; });
  t("Eine Nachfrage nur bei knappen Antworten", () => { const q = HM_F2.find((x) => x.id === "f5"); return { ok: hmF2BrauchtNachfrage(q, "Diskret.") && !hmF2BrauchtNachfrage(q, "Ich habe die Erben zuerst einzeln angerufen und dann gemeinsam an einen Tisch geholt.") }; });
  t("Seite von Pol a stabil je Makler", () => { const alt = hmStore.get("fragebogen2"); try { hmStore.put("fragebogen2", { ...(alt || {}), __test: {} }); const s1 = JSON.stringify(hmF2Seiten("__test")); const s2 = JSON.stringify(hmF2Seiten("__test")); return { ok: s1 === s2 && Object.keys(JSON.parse(s1)).length === 6, detail: s1 }; } finally { hmStore.put("fragebogen2", alt); } });
  t("Kein Minutenliteral, Dauer aus derselben Quelle", () => { const src = String(Fragebogen2); return { ok: !/30 Minuten|Etwa \d+ Minuten/.test(src) && (!window.hmStandLinkDauer || hmStandLinkDauer().min === 21) }; });
  t("Rückschreiben in die bestehende Kette", () => { const a = hmF2InV1({ ...v, f2: 2, f3: [{ objekt: "Zinshaus Sievering", ausschlag: "Ehrliche Einschätzung", wochen: "11" }], b3: "a", b2: "b" }, {}); return { ok: a.seite === 17 && /11 Wochen/.test(a.belege) && a.bildpaare.bp5 === "a" && a.bildpaare.bp6 === "b" && !!a.bezirke, detail: a.belege }; });
  return out;
}

Object.assign(window, { HM_F2, HM_F2_BILD, hmF2Vorbelegen, hmF2Frueher, hmF2InV1, hmF2Speichern, hmF2Abschliessen, hmF2Stand, hmF2Text, Fragebogen2, F2Wirkung, Fremdbild, hmSelbsttestFragen2, hmF2Stil });
