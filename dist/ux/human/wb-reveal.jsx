/* Werkbank. Reveal in zehn Akten und Rückmeldung (Prozess v2, Schritt 15; Chef-Brief Kapitel 2, Stand 30.09.2026).
   Heute zeigen, morgen urteilen, am Vertrag. Eine Vollbild-Bühne ohne Bedienelemente, live vom Team geführt, dazu der
   Presenter im zweiten Fenster (?ansicht=reveal&presenter=1&makler=ID), synchron über BroadcastChannel("wb-reveal-" + mid).
   Am Folgetag die Rückmeldung je Vertragskriterium, dann die Wahl ohne Vorauswahl (?ansicht=rueckmeldung&makler=ID).
   Wo Stoff fehlt, entfällt die Folie und der Presenter nennt den Grund. Nie ein Mustersatz, nie eine erfundene Zahl.
   Ablage: hmStore "reveal" = { [mid]: { gestartet, am, folie (id der Folie), live, fragen, zitateFreigabe, achseBeruehrt, saetze } }
           hmStore "rueckmeldung" = { [mid]: { runde, offenAb, gestartet, teil1, falsch, wahl, sendung, pins, teilnehmer, dauerSek, abgeschickt,
                                               entwurfPin, entwurfKeiner (Entwürfe, damit nichts verloren geht) } }
   "am" entsteht erst, wenn Akt 9 im Termin (nicht in der Probe) zum ersten Mal erscheint; wb-stand.jsx liest rev.am und rm.abgeschickt.
   Sync: Nachrichten "folie" (id), "woche", "fassung", "schluss", dazu "hallo" (Presenter fragt beim Öffnen) und "stand"
   (Bühne antwortet mit Folie, Woche, Fassung). Die Bühne meldet ihren Stand auch selbst, sobald sie öffnet.
   Fassungen: Papier ist immer die helle Seite und steht auf der geteilten Bühne links. Welche Fassung hell ist, folgt wie in
   hmFeed12 aus dem Grundton der Welt (grundDunkel): in einer dunklen Welt steht die Empfehlung dunkel, der Gegenentwurf hell.
   Abweichungen von Auftrag A mit Grund: 5c und 6d nutzen nicht FeedBeitrag, weil es ein Sheet mit eigener Kopfzeile, Schließen-Knopf
   und eigenen Pfeiltasten auf window ist; auf der skalierten Bühne ohne Bedienelemente kollidiert das mit der Tastensteuerung.
   RvBeitrag übernimmt deshalb dessen Ehrlichkeitslogik (Entwurf, Satz zur Bildlücke, Prüfsatz bei Selbstauskunft) in Stufe C.
   6f nutzt nicht FeedVergleich, weil es Umschaltknöpfe zeigt, seine Breite selbst misst und beide Profile auf einem Grund setzt;
   die Bühne braucht je Fassung ihren eigenen Grund. Dort stehen zwei FeedProfil nebeneinander, Papier links. */

function hmRevealStil() {
  if (typeof document === "undefined" || document.getElementById("stil-reveal")) return;
  const s = document.createElement("style");
  s.id = "stil-reveal";
  s.textContent = `
/* Bühne: feste Fläche 1920 x 1080, per scale eingepasst */
.hm-rv-portal { position: fixed; inset: 0; z-index: 2147483000; overflow: hidden; }
.hm-rv-portal:focus { outline: none; }
.hm-rv-portal.still, .hm-rv-portal.still * { cursor: none; }
.hm-rv-rahmen { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; transform-origin: 0 0; }
.hm-rv-lage { position: absolute; inset: 0; }
.hm-rv-lage.ein { animation: hm-rv-ein 300ms ease-out both; }
@keyframes hm-rv-ein { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .hm-rv-lage.ein { animation: none; } }
.hm-rv-flaeche { position: absolute; inset: 0; width: 1920px; height: 1080px; overflow: hidden; font-family: "Power Grotesk", ui-sans-serif, system-ui, sans-serif; font-weight: 400; -webkit-font-smoothing: antialiased; }
/* :where hält die Spezifität niedrig, damit eingebettete Komponenten (FeedProfil) ihre eigenen Abstände behalten */
:where(.hm-rv-flaeche) p, :where(.hm-rv-flaeche) figure { margin: 0; }
.hm-rv-flaeche button { pointer-events: none; }
.hm-rv-flaeche [role="radiogroup"], .hm-rv-flaeche [role="tablist"], .hm-rv-flaeche .hm-seg { display: none !important; }
/* Drei Größenstufen, eine Familie, ein Schnitt */
.hm-rv-a { font-size: 88px; line-height: 96px; letter-spacing: -0.01em; max-width: 1440px; }
.hm-rv-b { font-size: 40px; line-height: 52px; }
.hm-rv-c { font-size: 22px; line-height: 32px; margin-top: 32px !important; }
.hm-rv-c + .hm-rv-c { margin-top: 0 !important; }
.hm-rv-a + .hm-rv-b, .hm-rv-b + .hm-rv-b { margin-top: 32px !important; }
/* Satzspiegel: links eine Spalte (160), rechts zwei (320), oben 120; erste Grundlinie Stufe A bei 58 Prozent */
.hm-rv-block { position: absolute; left: 160px; width: 1440px; }
.hm-rv-block.an-a { top: 552px; }
.hm-rv-block.an-b { top: 584px; }
.hm-rv-vertrag { position: absolute; left: 160px; top: 120px; width: 1440px; bottom: 96px; display: flex; flex-direction: column; }
.hm-rv-attribute { display: grid; gap: 0 48px; margin-top: 64px; }
.hm-rv-vertrag .fuss { margin-top: auto !important; }
.hm-rv-zwei { position: absolute; left: 160px; width: 1440px; top: 584px; display: grid; grid-template-columns: 1fr 1fr; gap: 0 160px; }
.hm-rv-entwuerfe { position: absolute; left: 160px; top: 360px; width: 1440px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; }
.hm-rv-entwurf { height: 240px; background: oklch(0.985 0 0); display: grid; place-items: center; padding: 24px; }
.hm-rv-portrait { position: absolute; right: 0; bottom: 0; width: 800px; height: 1080px; object-fit: contain; object-position: right bottom; }
/* Anwendungen ab Akt 5: Ansicht links, Begründung rechts unten */
.hm-rv-app { position: absolute; inset: 0; padding: 80px 320px 80px 160px; display: grid; grid-template-columns: minmax(0, 1fr) 480px; column-gap: 80px; }
.hm-rv-app.allein { grid-template-columns: minmax(0, 1fr); }
.hm-rv-app-bild { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 0; overflow: hidden; }
.hm-rv-begr { align-self: end; }
.hm-rv-karten { display: flex; gap: 40px; align-items: flex-start; }
/* Telefonfenster: oben Profilkopf und die neueste Woche, der Rest liegt wie am Telefon darunter */
.hm-rv-telefon { max-height: 920px; overflow: hidden; flex: none; }
.hm-rv-beitrag { position: absolute; inset: 0; padding: 80px 320px 80px 160px; display: grid; grid-template-columns: 600px minmax(0, 1fr); column-gap: 96px; }
.hm-rv-beitrag .bild { display: flex; flex-direction: column; justify-content: center; }
.hm-rv-beitrag .text { display: flex; flex-direction: column; min-height: 0; gap: 32px; padding-top: 80px; }
.hm-rv-beitrag .text > .hm-rv-begr { margin-top: auto; }
/* Caption höchstens 12 Zeilen; die Kennzeichnungen (Entwurf, Bildlücke, Prüfsatz) stehen außerhalb und werden nie abgeschnitten */
.hm-rv-caption { max-width: 60ch; max-height: 384px; overflow: hidden; display: flex; flex-direction: column; gap: 16px; }
.hm-rv-caption p { font-size: 22px; line-height: 32px; white-space: pre-line; }
.hm-rv-caption .hm-rv-c, .hm-rv-kennz .hm-rv-c { margin-top: 0 !important; }
.hm-rv-kennz { display: flex; flex-direction: column; gap: 8px; max-width: 60ch; }
.hm-rv-web { width: 1040px; height: 585px; border: 1px solid; display: flex; flex-direction: column; overflow: hidden; }
.hm-rv-web .kopf { padding: 28px 48px; }
.hm-rv-web .held { flex: 1; display: grid; grid-template-columns: 1fr 360px; gap: 48px; padding: 24px 48px 48px; min-height: 0; }
.hm-rv-web .claim { font-size: 64px; line-height: 1.08; letter-spacing: -0.01em; }
.hm-rv-web .unter { font-size: 22px; line-height: 32px; margin-top: 24px !important; max-width: 36ch; }
.hm-rv-web img { width: 360px; height: 100%; object-fit: cover; object-position: 50% 18%; }
.hm-rv-web .luecke { border: 1px solid; display: grid; place-items: center; padding: 24px; text-align: center; font-size: 22px; line-height: 32px; }
.hm-rv-geteilt { position: absolute; inset: 0; display: grid; grid-template-columns: 1fr 1fr; }
.hm-rv-haelfte { position: relative; display: flex; flex-direction: column; padding: 80px 96px; min-width: 0; }
.hm-rv-haelfte .mitte { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; min-height: 0; }
.hm-rv-haelfte .hm-rv-begr { margin-top: 32px; }
.hm-rv-voll { position: absolute; inset: 0; padding: 80px 320px 80px 160px; display: flex; flex-direction: column; }
.hm-rv-voll .mitte { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; min-height: 0; }
.hm-rv-vergleich { display: flex; gap: 40px; align-items: flex-end; }
.hm-rv-vergleich .text { max-width: 320px; }
.hm-rv-proben { display: flex; flex-direction: column; gap: 48px; }
.hm-rv-farbe .streifen { display: flex; width: 640px; height: 160px; border: 1px solid; }
.hm-rv-farbe .streifen i { display: block; flex-basis: 0; }
.hm-rv-farbe .rollen { margin-top: 32px; display: grid; gap: 8px; }
.hm-rv-farbe .rollen > div { display: flex; align-items: center; gap: 16px; }
.hm-rv-farbe .feld { width: 32px; height: 32px; border: 1px solid; flex: none; }
.hm-rv-farbe .rollen .hm-rv-c { margin-top: 0 !important; }
.hm-rv-zeichen-satz { max-width: 720px; }
.hm-rv-strom { width: 430px; }
.hm-rv-strom img { width: 430px; height: 538px; object-fit: cover; display: block; }
.hm-rv-strom .konto { display: flex; align-items: center; gap: 12px; height: 56px; }
.hm-rv-strom .konto i { width: 32px; height: 32px; border-radius: 50%; background: oklch(0.8 0 0); }
.hm-rv-strom .konto b { width: 120px; height: 12px; background: oklch(0.8 0 0); }

/* Presenter: normales Fenster */
.hm-rv-pres { min-height: 100vh; box-sizing: border-box; background: var(--paper); color: var(--ink); padding: 24px 32px 48px; display: grid; grid-template-columns: minmax(0, 2fr) minmax(300px, 1fr); gap: 24px 32px; align-items: start; }
@media (max-width: 980px) { .hm-rv-pres { grid-template-columns: 1fr; } }
.hm-rv-pres > div > h1 { font-size: 26px; line-height: 1.2; font-weight: 500; margin: 0; letter-spacing: -0.01em; }
.hm-rv-seite > div > h2 { font-size: 16px; line-height: 1.3; font-weight: 500; margin: 0 0 8px; }
:where(.hm-rv-pres) p { margin: 0; }
.hm-rv-pres .ort { font-size: 15px; color: var(--text-muted); margin-top: 4px; }
.hm-rv-vorschau { position: relative; width: 100%; overflow: hidden; background: var(--paper-2); margin-top: 16px; }
.hm-rv-vorschau.klein { margin-top: 0; }
.hm-rv-vorschau > div { position: absolute; left: 0; top: 0; transform-origin: 0 0; }
.hm-rv-steuer { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 16px; align-items: center; }
.hm-rv-steuer .gruppe { display: flex; gap: 6px; flex-wrap: wrap; }
.hm-rv-k { min-height: 44px; padding: 8px 16px; border: 1px solid var(--ink-3); border-radius: 10px; background: transparent; color: var(--ink); font: inherit; font-size: 15px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; }
.hm-rv-k.haupt { min-width: 140px; justify-content: center; }
.hm-rv-k[aria-pressed="true"] { box-shadow: inset 0 0 0 1px var(--ink); border-color: var(--ink); }
.hm-rv-k:disabled { opacity: .4; cursor: default; }
.hm-rv-k:focus-visible, .hm-rv-opt:focus-visible, .hm-rv-schalter:focus-visible, .hm-rv-klein:focus-visible, .hm-rv-feld:focus-visible { outline: 2px solid var(--signal-deep); outline-offset: 2px; }
.hm-rv-notiz { margin-top: 20px; font-size: 20px; line-height: 1.5; max-width: 70ch; }
.hm-rv-notiz .begr { margin-top: 12px; font-size: 17px; }
.hm-rv-seite { display: flex; flex-direction: column; gap: 24px; }
.hm-rv-zeit .gross { font-size: 30px; line-height: 1.15; font-variant-numeric: tabular-nums; }
.hm-rv-zeit .ueber { color: var(--signal-deep); }
.hm-rv-zeit p + p { margin-top: 4px; font-size: 15px; color: var(--text-muted); font-variant-numeric: tabular-nums; }
.hm-rv-liste { margin: 0; padding: 0; list-style: none; display: grid; gap: 8px; font-size: 14px; line-height: 1.45; }
.hm-rv-liste li { display: flex; gap: 8px; align-items: flex-start; }
.hm-rv-liste svg { flex: none; margin-top: 2px; }
.hm-rv-feld { width: 100%; box-sizing: border-box; border: 1px solid var(--ink-3); border-radius: 10px; background: var(--surface-raised); color: var(--ink); font: inherit; font-size: 16px; line-height: 1.45; padding: 10px 12px; resize: vertical; }

/* Knopf im Markenbuch */
.hm-rv-knopf { display: flex; flex-direction: column; gap: 12px; margin-top: 12px; }
.hm-rv-knopf .reihe { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.hm-rv-klein { border: 0; background: transparent; padding: 6px 0; font: inherit; font-size: 14px; color: var(--ink); text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
.hm-rv-team { border-top: 1px solid var(--hairline-dark); padding-top: 16px; display: grid; gap: 24px; }
.hm-rv-team h3 { font-size: 16px; font-weight: 500; margin: 0 0 6px; }
.hm-rv-team p { margin: 0; font-size: 14px; line-height: 1.5; }
.hm-rv-kand { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 6px 16px; align-items: start; padding: 10px 0; border-bottom: 1px solid var(--hairline-dark); }
.hm-rv-kand .u { color: var(--text-muted); font-size: 13px; }
.hm-rv-schalter { display: inline-flex; align-items: center; gap: 10px; min-height: 44px; border: 0; background: transparent; font: inherit; font-size: 14px; color: var(--ink); cursor: pointer; padding: 0; text-align: left; }
.hm-rv-schalter i { width: 36px; height: 20px; border-radius: 999px; border: 1px solid var(--ink-3); position: relative; flex: none; }
.hm-rv-schalter i::after { content: ""; position: absolute; top: 3px; left: 3px; width: 12px; height: 12px; border-radius: 50%; background: var(--ink-3); transition: left .12s; }
.hm-rv-schalter[aria-checked="true"] i { background: var(--ink); border-color: var(--ink); }
.hm-rv-schalter[aria-checked="true"] i::after { left: 19px; background: var(--paper); }
.hm-rv-schalter:disabled { opacity: .45; cursor: default; }
.hm-rv-gespeichert { font-size: 13px; color: var(--text-muted); }

/* Rückmeldung: einhändig am Telefon */
.hm-rv-rm { max-width: 820px; margin: 0 auto; padding: 24px 0 64px; box-sizing: border-box; width: 100%; min-width: 0; overflow-wrap: anywhere; color: var(--ink); font-size: 17px; line-height: 1.5; }
:where(.hm-rv-rm) p { margin: 0; }
:where(.hm-rv-rm) h1 { font-size: 32px; line-height: 1.15; font-weight: 400; margin: 0 0 8px; letter-spacing: -0.01em; }
:where(.hm-rv-rm) h2 { font-size: 24px; line-height: 1.25; font-weight: 400; margin: 0 0 12px; letter-spacing: -0.005em; }
:where(.hm-rv-rm) h3 { font-size: 20px; line-height: 1.3; font-weight: 500; margin: 0 0 6px; }
.hm-rv-rm > section, .hm-rv-rm > section > section { margin-top: 36px; }
.hm-rv-rm .leise { color: var(--text-muted); }
.hm-rv-rm .frage { margin-top: 16px; margin-bottom: 8px; font-weight: 500; }
.hm-rv-punkt { padding: 20px 0; border-top: 1px solid var(--hairline-dark); }
.hm-rv-wahl { display: grid; gap: 8px; }
.hm-rv-opt { min-height: 48px; padding: 10px 12px; border: 1px solid var(--ink-3); border-radius: 12px; background: transparent; color: var(--ink); font: inherit; font-size: 16px; line-height: 1.25; display: inline-flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; text-align: center; }
.hm-rv-opt[aria-pressed="true"] { box-shadow: inset 0 0 0 1px var(--ink); border-color: var(--ink); }
.hm-rv-opt:disabled { cursor: default; }
.hm-rv-telefone { display: grid; gap: 24px; }
.hm-rv-rahmen-tel { width: 100%; max-width: 100%; overflow: hidden; contain: inline-size; }
.hm-rv-telefone figure { margin: 0; display: flex; flex-direction: column; gap: 12px; align-items: stretch; }
.hm-rv-telefone figcaption { font-size: 15px; color: var(--text-muted); }
.hm-rv-nav { display: flex; justify-content: space-between; gap: 12px; margin-top: 32px; align-items: center; }
.hm-rv-nav .mitte { display: flex; flex-direction: column; align-items: center; text-align: center; font-size: 15px; color: var(--text-muted); }
.hm-rv-rm h2:focus { outline: none; }
.hm-rv-rm h2:focus-visible, .hm-rv-rm [tabindex="-1"]:focus-visible { outline: 2px solid var(--signal-deep); outline-offset: 4px; }
.hm-rv-pins { display: grid; gap: 8px; margin-top: 12px; }
.hm-rv-pin { padding: 12px 0; border-top: 1px solid var(--hairline-dark); display: grid; gap: 6px; }
.hm-rv-stand { display: grid; gap: 20px; }
.hm-rv-stand .raster { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
.hm-rv-stand .raster div span { display: block; font-size: 13px; color: var(--text-muted); }
.hm-rv-stand .raster div b { font-weight: 500; font-size: 15px; }
.hm-rv-hinweis { border-left: 2px solid var(--ink); padding: 4px 0 4px 12px; font-size: 14px; line-height: 1.5; }
`;
  document.head.appendChild(s);
}

/* ---------- Feste Setzungen aus 15_reveal ---------- */
const HM_RV_MINUTEN = [2, 3, 3, 3, 5, 15, 10, 4, 10, 2];
const HM_RV_AKTE = ["Rahmen", "Seine Worte", "Einsicht", "Vertrag", "Weg und Idee", "Empfehlung in Anwendung", "Gegenentwurf", "Schrift, Farbe, Wortmarke, Zeichen", "Fragen", "Abschluss"];
/* Sätze, die im Termin nie fallen (Sprechzettel, nur Presenter) */
const HM_RV_SPERRLISTE = ["Gefällt es Ihnen?", "Wie finden Sie das?", "Was sagen Sie?", "Mögen Sie ...", "Wir haben uns gedacht ...", "Das ist nur ein Vorschlag", "Das können wir jederzeit ändern"];
const HM_RV_ANSICHTEN = [["feed", "Feed"], ["profil", "Profil"], ["karte", "Karte"], ["wortmarke", "Wortmarke"], ["zeichen", "Zeichen"], ["farbe", "Farbe"], ["schrift", "Schrift"]];
const HM_RV_ANSICHT_FELD = { feed: "feed.kacheln", profil: "feed.profilkopf", karte: "", wortmarke: "system.wortmarke", zeichen: "system.zeichen", farbe: "system.farbe", schrift: "system.typo" };
const HM_RV_URTEIL = { trifft: "Trifft", teilweise: "Trifft teilweise", nicht: "Trifft nicht" };
const HM_RV_FASSUNG = { papier: "Eher Papier", gleich: "Beide gleich", dunkel: "Eher dunkel" };
const HM_RV_PINART = [["beobachtung", "Das fällt mir auf"], ["frage", "Das frage ich"], ["aenderung", "Das soll anders sein"]];
const HM_RV_GRUENDE = [["spielraum", "Spielraum"], ["tatsache", "Tatsache"], ["wahl", "Wahl"], ["ausserhalb", "Außerhalb"]];
const HM_RV_ENTSCHEIDUNG = [["umsetzen", "Umsetzen"], ["nicht", "Nicht umsetzen"]];
/* Zuordnung zu Zielschritt nach dem Präfix von ort.feld (15_reveal 3.9); die spezifischere Zeile steht zuerst */
const HM_RV_ZIELSCHRITTE = [
  { praefix: ["serieSignatur.namen"], schritt: 12, spielraum: "Grund Wahl" },
  { praefix: ["system.farbe", "system.typo", "bauteil.portraet"], schritt: 10, spielraum: "im Spielraum, wenn system.spielraum den Pfad führt" },
  { praefix: ["system.wortmarke", "system.zeichen", "system.raster"], schritt: 10, spielraum: "nicht im Spielraum" },
  { praefix: ["bild.kontaktbogen", "feed.kacheln[].bild"], schritt: 11, spielraum: "Ausschnitt im Spielraum, die Regel nicht" },
  { praefix: ["serien", "feed.kacheln[].serie"], schritt: 12, spielraum: "nicht im Spielraum" },
  { praefix: ["feed.kacheln[].caption", "textImBild", "feed.profilkopf"], schritt: 13, spielraum: "im Spielraum, wenn die Stimmregeln halten" },
  { praefix: ["beweise"], schritt: 7, spielraum: "Grund Tatsache mit Beleg" },
  { praefix: ["botschaften.claim", "stimme"], schritt: 8, spielraum: "nicht im Spielraum, neue Version" },
  { praefix: ["markenvertrag", "positionierung"], schritt: 7, spielraum: "nicht im Spielraum, neuer Vertrag" },
  { praefix: ["idee"], schritt: 9, spielraum: "nicht im Spielraum, Creative Director" },
];
const HM_RV_ZAHLWORT = ["Null", "Ein", "Zwei", "Drei", "Vier", "Fünf", "Sechs", "Sieben", "Acht", "Neun", "Zehn", "Elf", "Zwölf"];
const HM_RV_NEUTRAL = { bg: "oklch(0.94 0 0)", fg: "oklch(0.20 0 0)" };

/* ---------- Kleine Helfer ---------- */
const hmRvS = (x) => String(x == null ? "" : x).replace(/\s+/g, " ").trim();
function hmRvLeer(t) {
  const s = hmRvS(t);
  if (!s) return true;
  if (typeof hmPfIstLuecke === "function" && hmPfIstLuecke(s)) return true;
  return /^Kommt aus dem Workshop/.test(s) || /^\[.*\]$/.test(s);
}
const hmRvText = (t) => (hmRvLeer(t) ? null : hmRvS(t));
/* Du-Form im Text an den Makler ist ein Fehler, den das Team vor dem Termin behebt */
const hmRvDu = (t) => /\b(du|dich|dir|dein|deine|deinen|deinem|deiner|deines)\b/i.test(hmRvS(t));
const hmRvWoerter = (t) => hmRvS(t).split(" ").filter((w) => /[A-Za-zÄÖÜäöüß0-9]/.test(w));
const hmRvZahlwort = (n) => HM_RV_ZAHLWORT[n] || String(n);
/* Stufe A nur bei höchstens drei Zeilen (88 px Power Grotesk auf 1440 px, rund 29 Zeichen je Zeile).
   Mit geladener Schrift wird gemessen, sonst gilt die sichere Grenze von 75 Zeichen. */
function hmRvStufe(t) {
  const s = hmRvS(t);
  if (s.length > 90) return "b";
  if (s.length <= 60) return "a";
  try {
    if (typeof hmWeltUmbruch === "function" && typeof document !== "undefined" && document.fonts && document.fonts.check('400 88px "Power Grotesk"')) return hmWeltUmbruch(s, "Power Grotesk", 88, 400, -0.01, 1440).length <= 3 ? "a" : "b";
  } catch (e) { /* Schätzung */ }
  return s.length <= 75 ? "a" : "b";
}
/* Erster Satz auf die Fläche, der Rest in den Sprechzettel (eine Aussage je Fläche) */
function hmRvErsterSatz(t) {
  const s = hmRvS(t);
  const teile = s.split(/(?<=[.?…])\s+(?=["„»]?[A-ZÄÖÜ])/);
  return { erster: teile[0] || s, rest: teile.slice(1).join(" ") };
}
/* Grundton der Welt wie in hmFeed12: dunkler Grund, wenn der Grund dunkler ist als der Text */
function hmRvLum(hex) {
  let h = String(hex || "").trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(h)) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  const k = [0.2126, 0.7152, 0.0722];
  return [0, 2, 4].reduce((sum, i, j) => { const c = parseInt(h.slice(i, i + 2), 16) / 255; return sum + k[j] * (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)); }, 0);
}
function hmRvWeltDunkel(welt) {
  const F = welt && welt.farben; if (!F) return false;
  const g = hmRvLum(F.grund), t = hmRvLum(F.text);
  return g != null && t != null && g < t;
}
/* Pol einer Fassung auf der Achse Grundton: "papier" (hell) oder "dunkel" */
const hmRvPol = (grundDunkel, v) => ((v === "empfehlung") === !!grundDunkel ? "dunkel" : "papier");
const hmRvPolName = (pol) => (pol === "papier" ? "Papier" : "Dunkel");
/* Reihenfolge auf geteilter Fläche: Papier links, egal welche Fassung die Empfehlung ist */
const hmRvReihe = (grundDunkel) => (grundDunkel ? ["gegenentwurf", "empfehlung"] : ["empfehlung", "gegenentwurf"]);
const hmRvFassungName = (v) => (v === "empfehlung" ? "Empfehlung" : "Gegenentwurf");
/* Hinweistext ohne doppeltes "Akt n" */
const hmRvHinweisText = (h) => (/^Akt \d/.test(h.text) ? h.text : `Akt ${h.akt}: ${h.text}`);
const hmRvFam = (f) => (typeof hmWeltFam === "function" ? hmWeltFam(f || "Power Grotesk") : hmFont(f || "Power Grotesk"));
const hmRvGross = (t) => { const s = hmRvS(t); return s ? s[0].toUpperCase() + s.slice(1) : s; };
function hmRvDatum(x) {
  if (!x) return null;
  if (x instanceof Date) return isNaN(x.getTime()) ? null : x;
  const s = String(x);
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d, 12, 0, 0); }
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}
const hmRvTag = (d) => (d ? d.toLocaleDateString("de-AT", { weekday: "long", day: "numeric", month: "long" }) : "");
const hmRvTagKurz = (d) => (d ? d.toLocaleDateString("de-AT", { day: "numeric", month: "long", year: "numeric" }) : "");
function hmRvUhr(d) { if (!d) return ""; const h = d.getHours(), mi = d.getMinutes(); return mi ? `${h}:${String(mi).padStart(2, "0")} Uhr` : `${h} Uhr`; }
const hmRvMinSek = (sek) => { const s = Math.max(0, Math.round(Math.abs(sek))); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };
function hmRvOffenAb(am) { const t = Date.parse(am); return isNaN(t) ? null : new Date(t + 864e5).toISOString(); }
function hmRvIso(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function hmRvWerktagPlus(d, n) {
  const x = new Date(d); let k = 0;
  while (k < n) { x.setDate(x.getDate() + 1); const fei = typeof HM_FEIERTAGE !== "undefined" && HM_FEIERTAGE.has(hmRvIso(x)); if (x.getDay() !== 0 && x.getDay() !== 6 && !fei) k++; }
  return x;
}
function hmRevealNachricht(typ, wert, von) { return { typ, wert, von, zeit: Date.now() }; }
const hmRvWenigBewegung = () => typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function RvIco({ ok }) {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ok ? <path d="M3.5 8.5l3 3 6-7" /> : <circle cx="8" cy="8" r="5.25" />}</svg>;
}

/* ---------- Regel Q3 für die Sätze in Akt 1 ---------- */
const HM_RV_NEBENSATZ = ["dass", "weil", "wenn", "ob", "als"];
const HM_RV_FUNKTION = new Set(["und", "oder", "aber", "zwischen", "in", "im", "am", "an", "auf", "bei", "beim", "mit", "nach", "von", "vom", "zu", "zum", "zur", "über", "unter", "vor", "hinter", "neben", "bis", "aus", "für", "gegen", "ohne", "um", "rund", "nahe", "der", "die", "das", "den", "dem", "des", "ein", "eine", "einen", "einem", "einer", "eines", "nicht", "nie", "auch", "noch", "schon", "sehr", "so", "wie"]);
const HM_RV_HILFSVERB = /^(ist|sind|war|waren|bin|bist|habe|hat|haben|hatte|hatten|wird|werden|wurde|kann|können|konnte|muss|müssen|soll|sollen|will|wollen|darf|dürfen|mag|gibt|geht|kommt|weiß|lässt|bleibt|macht|sage|sagt)$/;
function hmRvSatzRegel(satz) {
  const s = hmRvS(satz);
  if (!s) return { ok: false, grund: "leer" };
  const w = hmRvWoerter(s);
  const erstes = (w[0] || "").replace(/[^A-Za-zÄÖÜäöüß]/g, "").toLowerCase();
  if (/!/.test(s)) return { ok: false, grund: "Ausrufezeichen" };
  if (!/^["„»]?[A-ZÄÖÜ]/.test(s) || !/[.?…]["“«]?$/.test(s)) return { ok: false, grund: "kein ganzer Satz" };
  if (w.length < 6) return { ok: false, grund: `nur ${w.length} Wörter, mindestens sechs` };
  if (HM_RV_NEBENSATZ.includes(erstes)) return { ok: false, grund: `Nebensatz ohne Hauptsatz, beginnt mit ${hmRvGross(erstes)}` };
  const zahlen = w.filter((x) => /\d/.test(x)).length;
  if (zahlen && (zahlen * 5 >= w.length || /\d[\d.,]*\s*(%|Prozent|Wochen|Monate|Monaten|Jahre|Jahren|Tage|Tagen|Mio|Millionen|Euro|€|m²)/i.test(s))) return { ok: false, grund: "Zahl als Hauptinhalt" };
  const klein = w.slice(1).map((x) => x.replace(/[^A-Za-zÄÖÜäöüß]/g, "")).filter((x) => x && x === x.toLowerCase());
  const inhalt = klein.filter((x) => !HM_RV_FUNKTION.has(x));
  if (!inhalt.length) return { ok: false, grund: "reine Ortsangabe" };
  if (!klein.some((x) => HM_RV_HILFSVERB.test(x) || (!HM_RV_FUNKTION.has(x) && /(e|t|en|st|n)$/.test(x)))) return { ok: false, grund: "kein Verb erkennbar" };
  return { ok: true, grund: "" };
}

/* Begründung: ein Satz, höchstens 20 Wörter, nie "Aus Ihrem Vertrag", nie dasselbe Anfangswort wie der Satz davor */
function hmRvBegrRegel(satz, vorher) {
  const s = hmRvS(satz); const w = hmRvWoerter(s);
  if (!s) return { ok: false, grund: "leer" };
  if (w.length > 20) return { ok: false, grund: `${w.length} Wörter, höchstens 20` };
  if (/^Aus Ihrem Vertrag/i.test(s)) return { ok: false, grund: "beginnt mit Aus Ihrem Vertrag" };
  if (/!/.test(s) || /[.?]\s+[A-ZÄÖÜ]/.test(s)) return { ok: false, grund: "mehr als ein Satz oder Ausrufezeichen" };
  if (HM_RV_SPERRLISTE.some((x) => s.toLowerCase().includes(x.replace(" ...", "").toLowerCase()))) return { ok: false, grund: "Satz aus der Sperrliste" };
  const a = (x) => (hmRvWoerter(x)[0] || "").replace(/[^A-Za-zÄÖÜäöüß]/g, "").toLowerCase();
  if (vorher && a(vorher) === a(s)) return { ok: false, grund: "gleiches Anfangswort wie der Satz davor" };
  return { ok: true, grund: "" };
}

/* ---------- Quellen ---------- */
function hmRvTermin(mid, opt) {
  const o = opt || {};
  const m = (hmStore.get("makler") || []).find((x) => x.id === mid) || { id: mid, tag: 0 };
  const auf = o.auftrag || ((hmStore.get("auftrag") || {})[mid]) || {};
  const t = auf.termine || {};
  let T = {};
  try { T = window.hmStandTermine ? hmStandTermine(m) : {}; } catch (e) { T = {}; }
  const roh = t.reveal || T.reveal || null;
  const start = hmRvDatum(roh);
  const mitZeit = !!roh && String(roh).length > 10;
  const dauer = Number((auf.dauer && auf.dauer.reveal) || 60);
  const ende = start && mitZeit ? new Date(start.getTime() + dauer * 60000) : null;
  const rev = o.reveal || {};
  let ab = null, abZeit = false;
  if (rev.am) { ab = hmRvDatum(hmRvOffenAb(rev.am)); abZeit = true; }
  else if (ende) { ab = new Date(ende.getTime() + 864e5); abZeit = true; }
  else { const r = t.rueckmeldung || T.rueckmeldung || null; ab = hmRvDatum(r); abZeit = !!r && String(r).length > 10; }
  const mit = (((auf.entscheider || {}).mit) || []).filter((x) => x && (x.art === "entscheidet" || x.entscheidet === "ja" || x.entscheidet === true) && x.rolle);
  return { start, mitZeit, ende, ab, abZeit, dauer, freigabe: hmRvDatum(t.freigabe || T.freigabe || null), mit };
}
const hmRvAbText = (T) => `${hmRvTag(T.ab)}${T.abZeit ? ", " + hmRvUhr(T.ab) : ""}`;
function hmRvRueckZeile(T) { return T.ab ? `Ihre Rückmeldung ab ${hmRvAbText(T)}, etwa 15 Minuten.` : "Ihre Rückmeldung am Tag danach, etwa 15 Minuten."; }

function hmRvFeed(mid, variante, o) {
  const opt = o || {};
  if (opt.feed === false) return null;
  if (opt.feed && opt.feed[variante] !== undefined) return opt.feed[variante];
  if (typeof window.hmFeed12 !== "function") return null;
  try { return hmFeed12(mid, variante); } catch (e) { return null; }
}
function hmRvPinReihe(feed) {
  if (!feed || !Array.isArray(feed.posts)) return [];
  return feed.posts.filter((x) => x && (x.woche === 1 || x.angepinnt)).sort((a, b) => a.nr - b.nr).slice(0, 3);
}
function hmRvSerienBeispiele(p) {
  return ((p && p.saeulen) || []).flatMap((s) => ((s.serie && s.serie.beispiele) || []).map((x, i) => ({ titel: hmRvText(x.titel), hook: hmRvText(x.hook), serie: s.serie.name, nr: i + 1 }))).filter((x) => x.titel || x.hook);
}
/* Kandidaten für Akt 1: nur Workshop-Quellen, seine eigenen Worte */
function hmRvZitatKandidaten(mid, p, o) {
  const m = (hmStore.get("makler") || []).find((x) => x.id === mid) || {};
  const vor = hmRvS(m.name).split(" ")[0];
  const meetings = (((o && o.meetings) || hmStore.get("meetings") || [])).filter((x) => x && x.maklerId === mid);
  const workshop = meetings.find((x) => /workshop/i.test(x.titel || "")) || null;
  const herkunft = (datum, titel) => { const d = hmRvDatum(datum); const tag = d ? d.toLocaleDateString("de-AT", { day: "numeric", month: "long" }) : ""; if (!titel || /workshop/i.test(titel)) return tag ? `Ihr Workshop am ${tag}.` : "Aus Ihrem Workshop."; return tag ? `${titel} am ${tag}.` : `${titel}.`; };
  const out = [];
  const dazu = (satz, datum, titel) => { const s = hmRvS(satz).replace(/^["„»]+/, "").replace(/["“«]+$/, ""); if (!s || out.some((x) => x.satz === s)) return; out.push({ satz: s, herkunft: herkunft(datum, titel) }); };
  const st = ((p || {}).einsicht || {}).stuetzen;
  (Array.isArray(st) ? st : []).forEach((x) => dazu(typeof x === "string" ? x : x && (x.satz || x.text), (x && x.datum) || (workshop && workshop.datum), "Workshop"));
  meetings.forEach((mt) => {
    (mt.zitate || []).forEach((z) => dazu(typeof z === "string" ? z : z && (z.satz || z.text), mt.datum, mt.titel));
    String(mt.transkript || "").split("\n").forEach((l) => { const r = l.match(/^\s*([^:\d]{2,40}):\s*(.+)$/); if (r && vor && r[1].trim().startsWith(vor)) dazu(r[2], mt.datum, mt.titel); });
  });
  return out.slice(0, 12);
}
/* Attribute des Vertrags: hmAttributAufloesen, sonst Persönlichkeit der Plattform; Du-Texte werden zur Lücke */
function hmRvVertrag(mid, o) {
  if (o && o.vertrag !== undefined) return o.vertrag;
  try { if (typeof window.hmVertragEingefroren === "function") { const v = hmVertragEingefroren(mid); if (v) return v; } } catch (e) { /* weiter */ }
  return ((hmStore.get("markenvertrag") || {})[mid]) || null;
}
function hmRvAttribute(mid, p, o) {
  const v = hmRvVertrag(mid, o);
  let liste = [];
  if (typeof window.hmAttributAufloesen === "function" && v && Array.isArray(v.attribute)) {
    liste = v.attribute.map((x, i) => { try { const r = hmAttributAufloesen(v, i) || {}; return { id: x.id || "a" + (i + 1), name: r.name || x.name, heisst: r.heisst, heisstNicht: r.heisstNicht }; } catch (e) { return null; } }).filter(Boolean);
  }
  if (!liste.length) liste = ((p && p.persoenlichkeit) || []).map((x, i) => ({ id: "p" + (i + 1), name: x.wort, heisst: x.heisst, heisstNicht: x.heisstNicht }));
  const putz = (t) => hmRvText(hmRvS(t).replace(/\s*Aus deinen Reglern abgeleitet[^.]*\./, ""));
  return liste.slice(0, 5).map((x) => {
    const h = putz(x.heisst), n = putz(x.heisstNicht);
    const du = hmRvDu(h) || hmRvDu(n);
    return { id: x.id, name: hmRvGross(x.name), heisst: du ? null : h, heisstNicht: du ? null : n, du };
  }).filter((x) => x.name);
}
function hmRvFalschListe(mid, p, o) {
  const v = hmRvVertrag(mid, o);
  if (typeof window.hmVertragFalschListe === "function" && v) {
    try { const l = hmVertragFalschListe(v); if (Array.isArray(l) && l.length) return l.map((x) => hmRvText(typeof x === "string" ? x : x && x.text)).filter(Boolean); } catch (e) { /* Rückfall */ }
  }
  return ((p && p.werte) || []).map((w) => hmRvText(w && w.nie)).filter((t) => t && !hmRvDu(t));
}
function hmRvSendung(mid) {
  const s = (((hmStore.get("marke2") || {})[mid]) || {}).serieSignatur || {};
  const namen = (s.namen || []).map((x) => hmRvText(typeof x === "string" ? x : x && x.name)).filter(Boolean).slice(0, 2);
  const empf = typeof s.empfehlung === "number" ? namen[s.empfehlung] : hmRvText(s.empfehlung && s.empfehlung.name ? s.empfehlung.name : s.empfehlung);
  return { namen, empfehlung: empf || null };
}
/* Serienname der Signatur aus Auftrag A: feed.signatur.serie, sonst .name; bei gespeicherten Kacheln (dort fehlt feed.signatur)
   die Serie auf Signaturplatz 2; die Plattform-Säule nur als letzter Rückfall */
function hmRvSignaturName(mid, p, feedE) {
  const feed = feedE !== undefined ? feedE : hmRvFeed(mid, "empfehlung", {});
  const sg = feed && feed.signatur;
  if (sg && hmRvText(sg.serie)) return hmRvS(sg.serie);
  if (sg && hmRvText(sg.name)) return hmRvS(sg.name);
  const nr = ((window.HM_FEED2_TAKT && window.HM_FEED2_TAKT.signaturNr) || [2])[0];
  const pl = feed && Array.isArray(feed.posts) ? feed.posts.find((x) => x && x.nr === nr && x.serie && hmRvText(x.serie.name)) : null;
  if (pl) return hmRvS(pl.serie.name);
  const s = ((p && p.saeulen) || []).find((x) => x.serie && hmRvText(x.serie.name));
  return s ? hmRvS(s.serie.name) : null;
}
/* Geprüft nur mit ausdrücklich vorliegender Unterlage; Fragebogen, Workshop und Kundennachricht bleiben seine Angabe */
function hmRvBelegStatus(x) {
  const q = hmRvS(x && x.quelle);
  if (!q || /^fehlt/i.test(q)) return "offen";
  if (/geprüft|Unterlage liegt vor|Kaufvertrag liegt vor|Grundbuchauszug/i.test(q) && !/prüfen|Selbstauskunft|steht aus/i.test(q)) return "geprueft";
  return "angabe";
}
function hmRvKennzahl(p) {
  for (const x of ((p && p.beweise) || [])) {
    const s = hmRvText(x && x.beleg); if (!s) continue;
    const r = s.match(/(\d+(?:[.,]\d+)?)\s*(Wochen|Monaten|Monate|Jahren|Jahre|Prozent)/);
    if (r) return `${r[1]} ${r[2]}`;
  }
  return null;
}
/* Kontaktdaten der Karte: fehlen sie, zeichnet der Renderer Platzhalter; die Fläche sagt das offen */
function hmRvKontaktFehlt(mid) {
  const kd = (((hmStore.get("einrichtung_daten") || {})[mid] || {}).visitenkarten) || {};
  const web = (((hmStore.get("website") || {})[mid] || {}).felder) || {};
  const k = ((hmStore.get("kontakte") || {})[mid] || [])[0] || {};
  const f = [];
  if (!(kd.tel || web.tel)) f.push("Telefon");
  if (!(kd.mail || web.mail || k.mail)) f.push("E-Mail");
  if (!web.adresse) f.push("Adresse");
  return f;
}
function hmRvKontaktSatz(f) {
  if (!f.length) return null;
  const liste = f.length === 1 ? f[0] : f.slice(0, -1).join(", ") + " und " + f[f.length - 1];
  return `${liste} ${f.length === 1 ? "ist" : "sind"} Platzhalter, bis Ihre Angaben vorliegen.`;
}
/* Dasselbe für das Team, ohne Anrede an den Makler */
function hmRvKontaktHinweis(f) {
  if (!f.length) return null;
  const liste = f.length === 1 ? f[0] : f.slice(0, -1).join(", ") + " und " + f[f.length - 1];
  return `Karte und Signatur: ${liste} ${f.length === 1 ? "fehlt" : "fehlen"}, der Renderer zeichnet Platzhalter. Angaben in der Einrichtung eintragen.`;
}
/* Karte der zweiten Fassung (6e): nur, wenn eine gespeichert ist; WeltKarte selbst kennt keinen Gegenton */
function hmRvKarteGegen(mid, o) {
  if (o && o.karteGegen !== undefined) return o.karteGegen;
  const m2 = ((hmStore.get("marke2") || {})[mid]) || {};
  const k = (m2.gegenentwurf && m2.gegenentwurf.karte) || m2.karteGegen || null;
  if (!k) return null;
  const vorn = typeof k === "string" ? k : k.vorn || k.url || null;
  return vorn ? { vorn, hinten: (typeof k === "object" && k.hinten) || null } : null;
}
function hmRvBegrQuelle(mid, o) {
  const m2 = (o && o.marke2) || ((hmStore.get("marke2") || {})[mid]) || {};
  return [].concat((m2.idee && m2.idee.begruendung) || [], m2.begruendung || []).filter((x) => x && hmRvText(x.satz));
}
function hmRvZielschritt(feld) {
  const f = hmRvS(feld).replace(/\[\d+\]/g, "[]");
  if (!f) return null;
  return HM_RV_ZIELSCHRITTE.find((z) => z.praefix.some((p) => f.startsWith(p))) || null;
}
const hmRvZaehltRunde = (team) => !!team && team.grund === "ausserhalb" && team.entscheidung === "umsetzen";

/* ---------- Schriften vorladen, Status "bereit" erst danach ---------- */
const HM_RV_SCHRIFT = { sig: "", status: "offen", fehlt: [], p: null };
const hmRvSchriftSig = (b) => ["Power Grotesk", b && b.schrift && b.schrift.d, b && b.schrift && b.schrift.t].filter(Boolean).join("|");
function hmRvSchriftenLaden(b) {
  const sig = hmRvSchriftSig(b);
  if (HM_RV_SCHRIFT.sig === sig && HM_RV_SCHRIFT.p) return HM_RV_SCHRIFT.p;
  HM_RV_SCHRIFT.sig = sig; HM_RV_SCHRIFT.status = "laedt"; HM_RV_SCHRIFT.fehlt = [];
  if (typeof document === "undefined" || !document.fonts || !document.fonts.load) { HM_RV_SCHRIFT.status = "bereit"; HM_RV_SCHRIFT.p = Promise.resolve(true); return HM_RV_SCHRIFT.p; }
  const fam = [...new Set(sig.split("|"))];
  HM_RV_SCHRIFT.p = Promise.all(fam.map((f) => document.fonts.load(`400 40px "${f}"`).then((l) => ({ f, ok: !!(l && l.length) })).catch(() => ({ f, ok: false })))).then((r) => {
    HM_RV_SCHRIFT.fehlt = r.filter((x) => !x.ok).map((x) => x.f);
    HM_RV_SCHRIFT.status = HM_RV_SCHRIFT.fehlt.length ? "fehlt" : "bereit";
    return !HM_RV_SCHRIFT.fehlt.length;
  });
  /* Porträt vorladen, damit die Bühne im Termin keine Netzanfrage braucht */
  try { if (b && b.portrait) { const i = new Image(); i.src = b.portrait; } } catch (e) { /* ohne Porträt */ }
  return HM_RV_SCHRIFT.p;
}
/* Bilder vorladen: Strom-Pool, Porträt, Bilder der Beiträge; einmal je Adresse, damit die Bühne offline trägt */
const HM_RV_BILDER = new Map();
function hmRvBilderVorladen(umg) {
  if (typeof Image === "undefined" || !umg) return;
  const urls = [];
  (umg.pool || []).forEach((x) => urls.push(typeof x === "string" ? x : x && x.url));
  if (umg.b && umg.b.portrait) urls.push(umg.b.portrait);
  ["empfehlung", "gegenentwurf"].forEach((v) => {
    const f = umg.feed && umg.feed[v];
    ((f && f.posts) || []).forEach((x) => { const bi = x && x.daten && x.daten.bild; const u = bi && (bi.img || bi.url); if (typeof u === "string") urls.push(u); });
  });
  urls.filter((u) => typeof u === "string" && u && !HM_RV_BILDER.has(u)).forEach((u) => { try { const i = new Image(); i.src = u; HM_RV_BILDER.set(u, i); } catch (e) { /* ohne Vorladen */ } });
}
function useRvSchriften(b) {
  const sig = hmRvSchriftSig(b);
  const [st, setSt] = React.useState(HM_RV_SCHRIFT.sig === sig ? HM_RV_SCHRIFT.status : "laedt");
  React.useEffect(() => { let weg = false; hmRvSchriftenLaden(b).then(() => { if (!weg) setSt(HM_RV_SCHRIFT.status); }); return () => { weg = true; }; }, [sig]);
  return st;
}

/* ---------- Der Ablauf: Folien, Hinweise, Bereitschaft ---------- */
function hmRevealFolien(mid, opt) {
  const o = opt || {};
  const folien = [], hinweise = [];
  const H = (akt, text) => hinweise.push({ akt, text });
  const rev = o.reveal || ((hmStore.get("reveal") || {})[mid]) || {};
  const p = o.plattform !== undefined ? o.plattform : (window.hmMbPlattform ? hmMbPlattform(mid) : null);
  const pl = p || {};
  const b = o.b || hmBrand(mid);
  const welt = o.welt !== undefined ? o.welt : (window.hmMbWelt ? hmMbWelt(mid, p) : null);
  const T = hmRvTermin(mid, { reveal: rev, auftrag: o.auftrag });
  const attrs = hmRvAttribute(mid, p, o);
  const feedE = hmRvFeed(mid, "empfehlung", o), feedG = hmRvFeed(mid, "gegenentwurf", o);
  const hatProfil = o.feedProfil !== undefined ? !!o.feedProfil : typeof window.FeedProfil === "function";
  const pool = o.strom !== undefined ? o.strom : (window.HM_STROM_POOL || null);
  const begrQ = hmRvBegrQuelle(mid, o);
  const zaehler = {};
  const kriterium = (k) => { if (k == null || k === "") return null; if (typeof k === "number") return (attrs[k] || {}).name || null; const a = attrs.find((x) => x.id === k); return a ? a.name : hmRvText(k); };
  const begr = (ansicht, fassung) => {
    if (!ansicht) return null;
    const key = ansicht + "|" + fassung; const n = zaehler[key] || 0; zaehler[key] = n + 1;
    const x = begrQ.filter((y) => y.ansicht === ansicht && (!y.fassung || y.fassung === fassung))[n];
    return x ? { satz: hmRvS(x.satz), kriterium: kriterium(x.kriterium) } : null;
  };
  const add = (akt, unter, art, titel, fassung, daten, notiz, begrAnsicht) => folien.push({ id: "f" + unter, akt, unter, titel, notiz: notiz || "", minuten: 0, fassung, art, daten: daten || {}, begruendung: begr(begrAnsicht, fassung === "geteilt" || fassung === "neutral" ? "empfehlung" : fassung) });

  /* Akt 0 Rahmen */
  const z0 = [];
  if (T.ende) z0.push(`Bis ${hmRvUhr(T.ende)}.`); else H(0, "Termin ohne Uhrzeit: die Zeile zum Ende entfällt.");
  z0.push(hmRvRueckZeile(T));
  const e5 = o.einwilligung5 || (window.hmEinwilligung ? hmEinwilligung(mid, 5) : "offen");
  add(0, "0", "rahmen", "Rahmen", "neutral", { satz: "Heute zeigen wir. Morgen entscheiden Sie.", stufe: "a", zeilen: z0 },
    "Warum wir hier sind, wann Schluss ist, dass heute nichts entschieden wird. " + (e5 === "ja" ? "Aufzeichnung nur, wenn alle Anwesenden jetzt zustimmen. Jede Person einzeln fragen; ohne Zustimmung aller keine Aufnahme." : "Keine Aufzeichnung: die Einwilligung zur Aufzeichnung der Präsentation liegt nicht vor."));

  /* Akt 1 Seine Worte: nur freigegebene Sätze, Regel Q3 */
  const kand = o.zitate || hmRvZitatKandidaten(mid, p, o);
  const frei = rev.zitateFreigabe || {};
  const saetze1 = kand.filter((z) => frei[z.satz] && hmRvSatzRegel(z.satz).ok).slice(0, 3);
  if (saetze1.length < 3) H(1, "Akt 1 entfällt: weniger als drei freigegebene Sätze.");
  else saetze1.forEach((z, i) => add(1, "1" + "abc"[i], "satz", `Satz ${i + 1}`, "neutral", { satz: z.satz, stufe: hmRvStufe(z.satz), zeilen: [z.herkunft] }, i === 2 ? "Stehen lassen, nicht vorlesen. Danach ein Satz zur Verbindung." : "Stehen lassen, nicht vorlesen."));

  /* Akt 2 Einsicht: der unbequeme Teil wird gesprochen, nicht gezeigt */
  const ei = pl.einsicht || {};
  const spannung = hmRvText(ei.spannung), weiss = hmRvText(ei.weisseStelle);
  const unbequem = hmRvText(ei.unbequem) || hmRvText(ei.konvention);
  const notiz2 = unbequem ? `Aussprechen, steht nicht auf der Fläche: ${unbequem}` : "Der unbequeme Teil fehlt.";
  if (!unbequem) H(2, "Unbequemer Teil der Einsicht fehlt.");
  /* Eine Aussage je Fläche: der erste Satz steht, der Rest geht in den Sprechzettel */
  const vorname = hmRvS(((hmStore.get("makler") || []).find((x) => x.id === mid) || {}).name).split(" ")[0];
  const nenntIhn = (t) => !!vorname && vorname.length > 1 && new RegExp("(^|[^A-Za-zÄÖÜäöüß])" + vorname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "([^A-Za-zÄÖÜäöüß]|$)").test(t);
  if (spannung) {
    const s = hmRvErsterSatz(spannung);
    if (nenntIhn(s.erster)) H(2, `Fläche Einsicht nennt ${vorname} beim Namen und spricht in dritter Person über ihn. Vor dem Termin auf Sie umstellen.`);
    add(2, "2a", "einsicht", "Einsicht", "neutral", { satz: s.erster, stufe: hmRvStufe(s.erster) }, [s.rest ? `Dazu sagen: ${s.rest}` : "", notiz2].filter(Boolean).join(" "));
  } else H(2, "Fläche Einsicht entfällt: einsicht.spannung fehlt.");
  if (weiss) {
    const s = hmRvErsterSatz(weiss);
    if (nenntIhn(s.erster)) H(2, `Fläche Weiße Stelle nennt ${vorname} beim Namen und spricht in dritter Person über ihn. Vor dem Termin auf Sie umstellen.`);
    add(2, "2b", "weisse", "Weiße Stelle", "neutral", { satz: s.erster, stufe: hmRvStufe(s.erster) }, [s.rest ? `Dazu sagen: ${s.rest}` : "", spannung ? "" : notiz2].filter(Boolean).join(" "));
  } else H(2, "Fläche Weiße Stelle entfällt: einsicht.weisseStelle fehlt.");

  /* Akt 3 Vertrag */
  const pos = hmRvText(pl.positionierung && pl.positionierung.satz);
  const q = o.quelle !== undefined ? o.quelle : (window.hmQuelle ? hmQuelle(mid) : null);
  if (!q) H(3, "Vertrag noch nicht bestätigt: die Fläche zeigt die Lücke.");
  attrs.filter((a) => a.du).forEach((a) => H(3, `Attribut ${a.name}: Text in Du-Form, auf der Fläche steht nur der Name.`));
  if (pos || attrs.length) add(3, "3", "vertrag", "Vertrag", "neutral", { satz: pos, attribute: attrs.map((a) => ({ name: a.name, heisst: a.heisst, heisstNicht: a.heisstNicht })), zeile: q ? `Bestätigt am ${hmRvTagKurz(hmRvDatum(q.eingefrorenAm))}, Version ${q.version}.` : "Noch nicht bestätigt." }, "Daran messen Sie morgen.");
  else H(3, "Akt 3 entfällt: Positionierung und Attribute fehlen.");

  /* Akt 4 Weg und Idee */
  const kandE = (ei.kandidaten || []).filter((x) => x && hmRvText(typeof x === "string" ? x : x.satz));
  if (kandE.length >= 2) add(4, "4a", "kandidaten", "Einsichten", "neutral", { satz: `${hmRvZahlwort(kandE.length)} Einsichten haben wir geprüft. Eine blieb.`.replace(/^Ein /, "Eine "), stufe: "a" }, kandE.map((x) => hmRvText(x.grund)).filter(Boolean).join(" ") || "Je ein Satz, warum eine Einsicht fiel.");
  const st = o.strategie !== undefined ? o.strategie : ((hmStore.get("strategien") || {})[mid] || null);
  if (st && st.wege && st.wege.a && st.wege.b) {
    const g = st.gewaehlt || "a";
    const r = ["a", "b"].map((k) => ({ leitidee: hmRvText(st.wege[k].leitidee), name: st.wege[k].archetyp && st.wege[k].archetyp.name, blieb: k === g }));
    if (r.every((x) => x.leitidee)) {
      const weil = hmRvText(st.verworfenWeil || (st.wege[g === "a" ? "b" : "a"] || {}).verworfenWeil);
      if (!weil) H(4, "Grund, warum die zweite Richtung fiel, fehlt.");
      add(4, "4b", "richtungen", "Zwei Richtungen", "neutral", { richtungen: r }, weil ? `Ein Satz, warum die andere Richtung fiel: ${weil}` : "Warum die andere Richtung fiel, in einem Satz sagen.");
    } else H(4, "4b entfällt: Leitidee einer Richtung fehlt.");
  } else H(4, "4b entfällt: keine zwei Richtungen gespeichert.");
  const lg = o.logos !== undefined ? (o.logos || {}) : ((hmStore.get("logos") || {})[mid] || {});
  const ueber = (b.logoKonzept && b.logoKonzept.id) || lg.gewaehlt || null;
  const verw = (lg.merk || []).filter((s) => s && s.id && s.id !== ueber).slice(0, 3);
  if (verw.length) {
    const artName = (s) => ((window.HM_LK_ARTEN || []).find((x) => x.id === s.art) || {}).name || "Entwurf";
    const ohne = verw.filter((s) => !hmRvText(s.satz || s.grund || s.verworfenWeil)).length;
    if (ohne) H(4, `${ohne} verworfene Entwürfe ohne Satz: die Fläche nennt nur Art und Schrift.`);
    add(4, "4c", "entwuerfe", "Verworfene Entwürfe", "neutral", { entwuerfe: verw.map((s) => ({ spec: s, satz: hmRvText(s.satz || s.grund || s.verworfenWeil) || `${artName(s)} in ${s.font}.` })) }, "Je Entwurf ein Satz, warum er fiel.");
  } else H(4, "4c entfällt: keine verworfenen Entwürfe gemerkt.");
  const bew = (pl.beweise || []).filter((x) => x && hmRvText(x.beleg));
  if (bew.length) {
    const n = { geprueft: 0, angabe: 0, offen: 0 }; bew.forEach((x) => { n[hmRvBelegStatus(x)]++; });
    const teile = [];
    if (n.angabe === bew.length) teile.push("Alle sind heute Ihre Angabe. Vor dem Live-Tag prüfen wir sie mit Ihren Unterlagen.");
    else { if (n.geprueft) teile.push(`Geprüft: ${n.geprueft}.`); if (n.angabe) teile.push(`Ihre Angabe, geprüft vor dem Live-Tag: ${n.angabe}.`); if (n.offen) teile.push(`Noch ohne Quelle: ${n.offen}.`); }
    add(4, "4d", "belege", "Belege", "neutral", { satz: `${hmRvZahlwort(bew.length)} ${bew.length === 1 ? "Beleg trägt" : "Belege tragen"} Ihre Marke.`, stufe: "a", unter: teile.join(" ") }, bew.map((x) => `${hmRvS(x.behauptung)} (${{ geprueft: "geprüft", angabe: "Ihre Angabe", offen: "ohne Quelle" }[hmRvBelegStatus(x)]}).`).join(" "));
  } else H(4, "4d entfällt: keine Belege.");
  const claim = hmRvText((b.br && b.br.claim) || (pl.botschaften && pl.botschaften.claim));
  const ideeText = welt && hmRvText(welt.idee) && !hmRvDu(welt.idee) ? hmRvS(welt.idee) : null;
  if (welt && hmRvText(welt.idee) && !ideeText) H(4, "Idee der Welt steht in Du-Form und bleibt von der Fläche.");
  if (claim) { add(4, "4e", "idee", "Claim und Idee", "neutral", { claim, idee: ideeText, portrait: b.portrait || null }, "Das ist die Idee, noch keine Anwendung.", "idee"); if (!b.portrait) H(4, "4e ohne Porträt: der Claim steht auf dem Bühnengrund."); }
  else H(4, "4e entfällt: Claim fehlt.");

  /* Akt 5 Empfehlung in Anwendung, Akt 6 Gegenentwurf: gleiche Ansichten, eigene Gründe */
  const bsp = hmRvSerienBeispiele(pl);
  if (!hatProfil) H(5, "Feed-Modul fehlt: Rückfall auf die Serienbeispiele der Plattform.");
  const kontaktFehlt = o.kontaktFehlt || hmRvKontaktFehlt(mid);
  const kontakt = hmRvKontaktSatz(kontaktFehlt);
  const gd = o.grundDunkel !== undefined ? !!o.grundDunkel : hmRvWeltDunkel(welt);
  const fassungsFolgen = (akt, v, u) => {
    const gegen = v === "gegenentwurf";
    if (pool && pool.length) add(akt, u + (gegen ? "b" : "a"), "strom", "Strom", v, { variante: v }, "Sagen Sie Stopp, sobald Sie sich sehen. Dann: Woran? Dann: Erkennen Sie sich darin?");
    else H(akt, gegen ? "6b entfällt: Lizenz des Bildpools fehlt." : "Strom nicht startbar: Lizenz des Bildpools fehlt.");
    if (hatProfil || bsp.length >= 3) add(akt, u + (gegen ? "c" : "b"), "profil", gegen ? "Profil nach Woche 4" : "Profil, Woche 1 bis 4", v, { variante: v, woche: gegen ? 4 : 1 }, gegen ? "Dasselbe Profil nach Woche 4." : "Wochenregler von Woche 1 bis 4.", "profil");
    else H(akt, `${u}${gegen ? "c" : "b"} entfällt: weder Feed-Modul noch drei Serienbeispiele.`);
    const pins = hmRvPinReihe(gegen ? feedG : feedE);
    if (pins.length) pins.forEach((post, i) => add(akt, u + (gegen ? "d" : "c") + (i + 1), "beitrag", `Beitrag ${post.nr}`, v, { variante: v, nr: post.nr }, "Beitrag stehen lassen, die Caption nicht vorlesen.", "beitrag"));
    else if (bsp.length >= 3) { H(akt, "Beiträge ohne Feed-Modul: Serienbeispiele ohne Caption."); bsp.slice(0, 3).forEach((x, i) => add(akt, u + (gegen ? "d" : "c") + (i + 1), "beitrag", `Beispiel ${i + 1}`, v, { variante: v, beispiel: x }, "Beispiel stehen lassen.", "beitrag")); }
    else H(akt, "Beiträge entfallen: keine Beiträge vorhanden.");
  };
  fassungsFolgen(5, "empfehlung", "5");
  if (welt) {
    if (kontakt) H(5, hmRvKontaktHinweis(kontaktFehlt));
    add(5, "5d1", "karte", "Visitenkarte", "empfehlung", { variante: "empfehlung", kontakt }, "Druckprobe in die Hand geben, wenn sie vorliegt.", "karte");
    add(5, "5d2", "signatur", "Signatur", "empfehlung", { variante: "empfehlung", kontakt }, "", "signatur");
    add(5, "5d3", "website", "Website, erster Bildschirm", "empfehlung", { variante: "empfehlung", claim, unter: hmRvText(pl.versprechen) || hmRvText(pl.positionierung && pl.positionierung.was) }, "Vereinfachte Ansicht des ersten Bildschirms.", "website");
  } else H(5, "5d entfällt: keine Markenwelt gewählt.");
  const achse = (feedG && feedG.achse) || null;
  const achseName = (achse && achse.name) || "tonwert";
  if (achse && hmRvText(achse.satz)) add(6, "6a", "achse", "Achse", "gegenentwurf", { satz: hmRvS(achse.satz), stufe: hmRvStufe(achse.satz) }, "Ein Satz zur Achse, dann weiter.");
  else H(6, "6a entfällt: Satz zur Achse fehlt.");
  fassungsFolgen(6, "gegenentwurf", "6");
  const karte2 = hmRvKarteGegen(mid, o);
  if (karte2) add(6, "6e", "karte2", "Visitenkarte, Gegenentwurf", "gegenentwurf", { variante: "gegenentwurf", vorn: karte2.vorn, hinten: karte2.hinten }, "Dieselbe Karte in der zweiten Fassung.");
  else H(6, "6e entfällt: eine Karte der zweiten Fassung liegt nicht vor.");
  const saetze = rev.saetze || {};
  if (!hmRvText(saetze.empfehlung)) H(6, "Zwei Sätze zur Empfehlung fehlen.");
  if (!hmRvText(saetze.gegenentwurf)) H(6, "Zwei Sätze zum Gegenentwurf fehlen.");
  const [links, rechts] = hmRvReihe(gd);
  if (hatProfil || bsp.length >= 3) add(6, "6f", "vergleich", "Nebeneinander", "geteilt", { empfehlung: hmRvText(saetze.empfehlung), gegenentwurf: hmRvText(saetze.gegenentwurf) },
    `Beide nach Woche 4. Links Papier (${hmRvFassungName(links)}), rechts dunkel (${hmRvFassungName(rechts)}).`);

  /* Akt 7: Schrift, Farbe, Wortmarke, zuletzt das Zeichen; bei Achse Grundton jede Fläche geteilt */
  const f7 = achseName === "tonwert" ? "geteilt" : "empfehlung";
  if (achseName !== "tonwert") H(7, `Achse ${achseName}: der Renderer zeigt den Grundton nicht geteilt.`);
  const kennzahl = hmRvKennzahl(pl);
  if (!kennzahl) H(7, "Schrift: keine Kennzahl mit Einheit in den Belegen, die Probe zeigt die Lücke.");
  add(7, "7a", "schrift", "Schrift", f7, { claim, kennzahl, fliesstext: hmRvText(pl.botschaften && pl.botschaften.einSatz) || pos }, "", "schrift");
  if (welt) add(7, "7b", "farbe", "Farbe", f7, { proportion: welt.proportion || null }, "", "farbe"); else H(7, "Farbe entfällt: keine Markenwelt gewählt.");
  add(7, "7c", "wortmarke", "Wortmarke", f7, {}, "", "wortmarke");
  const zSatz = welt && welt.zeichen && hmRvText(welt.zeichen.satz) && !hmRvDu(welt.zeichen.satz) ? hmRvS(welt.zeichen.satz) : null;
  if (welt && welt.zeichen && hmRvText(welt.zeichen.satz) && !zSatz) H(7, "Herleitung des Zeichens steht in Du-Form und bleibt von der Fläche.");
  if (welt) add(7, "7d", "zeichen", "Zeichen", f7, { name: welt.zeichen && welt.zeichen.name, satz: zSatz }, "Das Zeichen zuletzt. Es ist die Auflösung, keine Behauptung.", "zeichen");
  else H(7, "Zeichen entfällt: keine Markenwelt gewählt.");

  /* Akt 8 Fragen: die geteilte Zeichen-Fläche bleibt stehen */
  add(8, "8", welt ? "zeichen" : "fragen", "Fragen", welt ? f7 : "neutral", welt ? { name: welt.zeichen && welt.zeichen.name, satz: zSatz } : {}, "Welche Fragen haben Sie? Jede Frage im Presenter notieren. Meinungen und Änderungen: Schreiben Sie das morgen dazu, mit einer Nacht Abstand.");

  /* Akt 9 Abschluss: neutral, kein Logo, keine Fassung */
  add(9, "9", "abschluss", "Abschluss", "neutral", { satz: "Morgen entscheiden Sie.", stufe: "a", zeilen: [hmRvRueckZeile(T), "Danach zeigen wir Ihnen die Änderungen in Ihrer Freigabe."] }, "Pünktlich enden.");

  /* Begründungen prüfen: Pflicht in Akt 4 bis 7 für Formentscheidungen */
  const PFLICHT = new Set(["idee", "profil", "beitrag", "website", "karte", "signatur", "schrift", "farbe", "wortmarke", "zeichen"]);
  let vorher = null;
  folien.forEach((f) => {
    if (f.akt < 4 || f.akt > 7) return;
    if (f.begruendung) { const r = hmRvBegrRegel(f.begruendung.satz, vorher); if (!r.ok) { H(f.akt, `${f.titel}: Begründung verworfen, ${r.grund}.`); f.begruendung = null; } else vorher = f.begruendung.satz; }
    if (!f.begruendung && PFLICHT.has(f.art)) H(f.akt, `${f.titel}: Begründung fehlt.`);
  });
  /* Du-Form in Texten der Bühne */
  folien.forEach((f) => { const d = f.daten; const t = [d.satz, d.unter, d.claim, d.idee, ...(d.zeilen || []), ...((d.richtungen || []).map((x) => x.leitidee))].filter(Boolean); if (t.some(hmRvDu)) H(f.akt, `${f.titel}: Text in Du-Form, vor dem Termin auf Sie umstellen.`); });
  /* Minuten je Folie aus den Minuten des Akts, in Viertelminuten; die letzte Folie nimmt den Rest, die Summe stimmt genau */
  HM_RV_MINUTEN.forEach((min, akt) => {
    const l = folien.filter((f) => f.akt === akt); if (!l.length) return;
    const q = Math.floor((min / l.length) * 4) / 4;
    l.forEach((f, i) => { f.minuten = i < l.length - 1 ? q : Math.round((min - q * (l.length - 1)) * 4) / 4; });
  });

  /* Bereitschaft */
  const mb = o.mbStand || (window.hmMbStand ? hmMbStand(mid) : { status: "entwurf" });
  const rot = feedE && Array.isArray(feedE.pruefung) ? feedE.pruefung.filter((x) => x && x.ok === false && x.pflicht !== false && x.stufe !== "hinweis") : null;
  const sch = o.schrift || HM_RV_SCHRIFT;
  const schOk = sch.status === "bereit" && (!!o.schrift || sch.sig === hmRvSchriftSig(b));
  const bereit = [
    { name: "Gate 2", ok: mb.status === "freigegeben", detail: mb.status === "freigegeben" ? "Markenbuch freigegeben." : "Markenbuch noch nicht freigegeben." },
    { name: "Porträt", ok: !!b.portrait, detail: b.portrait ? "Porträt liegt vor." : "Porträt aus dem Porträt-Termin fehlt." },
    { name: "Feed-Prüfung", ok: !!rot && !rot.length, detail: !feedE ? "Feed-Modul fehlt." : rot.length ? `${rot.length === 1 ? "Eine Pflichtregel" : rot.length + " Pflichtregeln"} offen:${rot.slice(0, 2).map((x) => x.name).join(", ")}.` : "Ohne rote Pflichtregel." },
    { name: "Drei Sätze für Akt 1", ok: saetze1.length >= 3, detail: `${saetze1.length} von 3 freigegeben.` },
    { name: "Strom-Pool", ok: !!(pool && pool.length), detail: pool && pool.length ? "Bildpool lizenziert." : "Lizenz des Bildpools fehlt." },
    { name: "Schriften", ok: schOk, detail: schOk ? "Power Grotesk und die Markenschriften sind geladen." : sch.status === "fehlt" ? `Nicht geladen: ${(sch.fehlt || []).join(", ")}.` : "Schriften laden noch." },
  ];
  hinweise.sort((x, y) => x.akt - y.akt);
  return { folien, hinweise, bereit };
}

/* ---------- Umgebung für die Renderer ---------- */
function hmRvUmgebung(m) {
  const mid = m.id;
  const b = hmBrand(mid);
  const pRoh = window.hmMbPlattform ? hmMbPlattform(mid) : null;
  const welt = window.hmMbWelt ? hmMbWelt(mid, pRoh) : null;
  const F = welt && window.hmWeltFarben ? hmWeltFarben(welt, b) : { grund: "#F5F1EA", text: "#191714", flaeche: "#E1DCD2", linie: "#B9B1A4", dunkel: "#141210", hell: "#F5F1EA", akzent: b.akzent || "#B17834" };
  return { m, mid, b, bb: { ...b, plattform: pRoh }, pRoh, p: pRoh || {}, welt, F, grundDunkel: hmRvWeltDunkel(welt), feed: { empfehlung: hmRvFeed(mid, "empfehlung", {}), gegenentwurf: hmRvFeed(mid, "gegenentwurf", {}) }, pool: window.HM_STROM_POOL || null };
}
/* Grund je Fassung aus demselben Ton wie hmFeed12: Empfehlung auf dem Grund der Welt, Gegenentwurf auf dem Gegenpol */
function hmRvGrund(umg, fassung) {
  const F = umg.F;
  if (fassung === "empfehlung") return { bg: F.grund, fg: F.text, dunkel: !!umg.grundDunkel };
  if (fassung === "gegenentwurf") return umg.grundDunkel ? { bg: F.hell, fg: F.dunkel, dunkel: false } : { bg: F.dunkel, fg: F.hell, dunkel: true };
  return { ...HM_RV_NEUTRAL, dunkel: false };
}
/* Ton des Gegenentwurfs für WeltPost-Rückfälle, wie tonGegen in hmFeed12 */
const hmRvTonGegen = (umg) => (umg.grundDunkel ? "hell" : "dunkel");
function hmRvSig(mid) {
  const g = (k) => (hmStore.get(k) || {})[mid] || null;
  const rev = g("reveal") || {};
  return JSON.stringify([rev.am, rev.gestartet, rev.zitateFreigabe, rev.saetze, rev.achseBeruehrt, g("plattformen"), g("marke2"), g("branding"), g("markenbuch"), g("logos"), g("strategien"), g("auftrag"), g("portraits"), (hmStore.get("meetings") || []).length]);
}

/* ---------- Bausteine der Bühne ---------- */
function RvSatzBlock({ d }) {
  return <div className={"hm-rv-block " + (d.stufe === "a" ? "an-a" : "an-b")}>
    <p className={d.stufe === "a" ? "hm-rv-a" : "hm-rv-b"}>{d.satz}</p>
    {d.unter && <p className="hm-rv-b">{d.unter}</p>}
    {(d.zeilen || []).filter(Boolean).map((z, i) => <p key={i} className="hm-rv-c">{z}</p>)}
  </div>;
}
function RvBegr({ begr }) {
  if (!begr) return null;
  return <div className="hm-rv-begr"><p className="hm-rv-b">{begr.satz}</p>{begr.kriterium && <p className="hm-rv-c">{begr.kriterium}</p>}</div>;
}
function RvApp({ children, begr, unter }) {
  return <div className={"hm-rv-app" + (begr ? "" : " allein")}>
    <div className="hm-rv-app-bild">{children}{unter && <p className="hm-rv-c">{unter}</p>}</div>
    {begr && <RvBegr begr={begr} />}
  </div>;
}
/* Rückfall ohne Feed-Modul: Serienbeispiele der Plattform, nie ein angebrochenes Raster */
function RvFeedRueckfall({ umg, variante, woche, breite }) {
  const bsp = hmRvSerienBeispiele(umg.p);
  const voll = Math.floor(bsp.length / 3) * 3;
  const liste = bsp.slice(0, Math.min(voll, Math.max(1, woche || 4) * 3));
  if (!umg.welt || !window.WeltPost || !liste.length) return null;
  const g = 2; const tw = Math.floor((breite - 2 * g) / 3);
  return <div style={{ width: breite, display: "grid", gridTemplateColumns: `repeat(3, ${tw}px)`, gap: g }}>
    {liste.map((x, i) => <WeltPost key={x.serie + x.nr + i} welt={umg.welt} b={umg.bb} art="hook" text={x.hook || x.titel} unter={x.titel} serie={{ name: x.serie, nr: x.nr }} ton={variante === "gegenentwurf" ? hmRvTonGegen(umg) : undefined} breite={tw} format="3:4" />)}
  </div>;
}
function RvProfil({ umg, variante, woche, breite }) {
  if (typeof window.FeedProfil === "function") return <FeedProfil m={umg.m} variante={variante} woche={woche} breite={breite} />;
  return <RvFeedRueckfall umg={umg} variante={variante} woche={woche} breite={breite} />;
}
/* Caption wie HmFd2Caption im Makler-Blick: aufeinanderfolgende Lücken als ein ruhiger Satz, Skizze als Entwurf gekennzeichnet.
   Ergebnis: [{ art: "stimme"|"entwurf"|"luecke", text }] */
const HM_RV_LUECKE_SATZ = "Diesen Teil schreiben wir mit Ihnen vor dem Live-Tag.";
function hmRvCaptionTeile(post, anrede) {
  if (!post) return [];
  const an = (s) => (typeof hmFd2Anrede === "function" ? hmFd2Anrede(s, anrede) : String(s).replace(/\{([^{}|]*)\|([^{}|]*)\}/g, (_, a, b) => (/^du$/i.test(anrede || "") ? b : a)));
  const t = post.captionTeile;
  if (!t) {
    /* Ohne Teile: Klammertexte sind Team-Lücken und werden zum ruhigen Satz */
    const roh = String(post.caption || "");
    const ohne = roh.replace(/\[[^\]]*\]/g, "").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    const out = ohne ? [{ art: "stimme", text: an(ohne) }] : [];
    if (ohne !== roh.trim()) out.push({ art: "luecke", text: HM_RV_LUECKE_SATZ });
    return out;
  }
  const l = post.captionLuecken || [], ent = post.captionEntwurf || [];
  const out = []; let vorher = false;
  ["hook", "einloesung", "beleg", "weitergeben"].forEach((k) => {
    const roh = String(t[k] == null ? "" : t[k]).trim(); if (!roh) return;
    if (l.includes(k)) { if (!vorher) out.push({ art: "luecke", text: HM_RV_LUECKE_SATZ }); vorher = true; return; }
    vorher = false;
    if (ent.includes(k)) { out.push({ art: "entwurf", text: an(roh).replace(/\s*\[[^\]]*\]/g, " (ergänzen wir mit Ihnen)") }); return; }
    out.push({ art: "stimme", text: an(roh) });
  });
  return out;
}
/* Kennzeichnungen neben der Caption, gleichwertig in Stufe C: Tageslücke, Bildlücke, Prüfsatz bei Selbstauskunft, Format */
function hmRvBeitragKennz(post) {
  if (!post) return [];
  const out = [];
  const objekt = post.luecke && post.luecke.art === "objekt";
  if (objekt) out.push(post.luecke.ersatz && post.luecke.ersatz.titel ? `Bis dahin erscheint an diesem Tag: ${post.luecke.ersatz.titel}.` : "Was an diesem Tag stattdessen erscheint, legen wir mit Ihnen vor dem Live-Tag fest.");
  if (post.luecke && !objekt && hmRvText(post.luecke.satz)) out.push(hmRvS(post.luecke.satz));
  if (post.beleg && post.beleg.status === "selbstauskunft") out.push("Diese Zahl prüfen wir vor dem Live-Tag mit Ihren Unterlagen.");
  if (post.format === "reel") out.push("Das Reel drehen wir am Drehtag.");
  if (post.format === "karussell") out.push("Karussell, erste Seite. Weitere Seiten schreiben wir nach Ihrer Rückmeldung.");
  return out;
}
function RvBeitrag({ f, umg, variante }) {
  const d = f.daten;
  const feed = umg.feed[variante];
  const post = d.nr != null && feed && Array.isArray(feed.posts) ? feed.posts.find((x) => x.nr === d.nr) : null;
  const x = d.beispiel;
  const teile = hmRvCaptionTeile(post, feed && feed.anrede);
  const kennz = hmRvBeitragKennz(post);
  const famT = hmRvFam(umg.b.schrift && umg.b.schrift.t);
  return <div className="hm-rv-beitrag">
    <div className="bild">
      {window.WeltPost && umg.welt && post ? (post.daten ? <WeltPost welt={umg.welt} b={umg.bb} daten={post.daten} breite={600} /> : <WeltPost welt={umg.welt} b={umg.bb} art={post.art} text={post.text} unter={post.unter} serie={post.serie ? { name: post.serie.name, nr: post.serie.folge } : null} ton={post.ton} breite={600} />) : null}
      {window.WeltPost && umg.welt && !post && x ? <WeltPost welt={umg.welt} b={umg.bb} art="hook" text={x.hook || x.titel} unter={x.titel} serie={{ name: x.serie, nr: x.nr }} ton={variante === "gegenentwurf" ? hmRvTonGegen(umg) : undefined} breite={600} /> : null}
    </div>
    <div className="text">
      {teile.length > 0 && <div className="hm-rv-caption">{teile.map((t, i) => (t.art === "stimme"
        ? <p key={i} style={{ fontFamily: famT }}>{t.text}</p>
        : t.art === "entwurf"
          ? <div key={i}><p className="hm-rv-c">Entwurf, den wir mit Ihnen ausformulieren:</p><p style={{ fontFamily: famT }}>{t.text}</p></div>
          : <p key={i} className="hm-rv-c">{t.text}</p>))}</div>}
      {kennz.length > 0 && <div className="hm-rv-kennz">{kennz.map((t) => <p key={t} className="hm-rv-c">{t}</p>)}</div>}
      <RvBegr begr={f.begruendung} />
    </div>
  </div>;
}
function RvWebsite({ umg, d, variante }) {
  const F = umg.F; const g = hmRvGrund(umg, variante);
  const bg = g.bg, fg = g.fg, dunkel = g.dunkel;
  const sch = umg.b.schrift || {};
  return <div className="hm-rv-web" style={{ background: bg, color: fg, borderColor: F.linie }}>
    <div className="kopf">{window.BrandLogo && <BrandLogo b={umg.b} h={30} farbe={dunkel ? undefined : fg} invert={dunkel} />}</div>
    <div className="held">
      <div>{d.claim && <p className="claim" style={{ fontFamily: hmRvFam(sch.d) }}>{d.claim}</p>}{d.unter && <p className="unter" style={{ fontFamily: hmRvFam(sch.t) }}>{d.unter}</p>}</div>
      {umg.b.portrait ? <img src={umg.b.portrait} alt="" /> : <div className="luecke" style={{ borderColor: F.linie }}>Porträt aus dem Porträt-Termin</div>}
    </div>
  </div>;
}
/* Zeichen im Gegenton: derselbe Zeichner, der Grundton getauscht (helle Welt: Grund wird dunkel, dunkle Welt: Grund wird hell) */
function RvZeichenGegen({ welt, b, breite, grundDunkel }) {
  const w = hmWeltHol(welt);
  if (typeof useHmWeltSchriften === "function") useHmWeltSchriften(b, w);
  const uid = "rvz" + String(React.useId()).replace(/[^A-Za-z0-9]/g, "");
  const c = hmWeltCtx(w, b, 600, 400, uid);
  const gegen = grundDunkel ? "hell" : "dunkel", zurueck = grundDunkel ? "dunkel" : "hell";
  c.ton = (name) => hmWeltTon(c, name === "grund" ? gegen : name === gegen ? zurueck : name);
  return <svg className="hm-welt-svg" width={breite} height={Math.round(breite * 2 / 3)} viewBox="0 0 600 400" role="img" aria-label={`${w.name}, Zeichen auf ${grundDunkel ? "hellem" : "dunklem"} Grund`} xmlns="http://www.w3.org/2000/svg">{HM_WELT_ZEICHNER[w.id].zeichen(c)}</svg>;
}
function RvZeichen({ umg, gegen, breite }) {
  if (!umg.welt) return null;
  if (gegen && typeof hmWeltCtx === "function" && typeof hmWeltTon === "function" && window.HM_WELT_ZEICHNER) return <RvZeichenGegen welt={umg.welt} b={umg.bb} breite={breite} grundDunkel={umg.grundDunkel} />;
  return window.WeltZeichen ? <WeltZeichen welt={umg.welt} b={umg.bb} breite={breite} /> : null;
}
/* Inhalt einer Seite in Akt 7 und 8 */
function RvSeite7({ f, umg, v }) {
  const d = f.daten; const F = umg.F; const G = hmRvGrund(umg, v); const dunkel = G.dunkel;
  const sch = umg.b.schrift || {};
  if (f.art === "schrift") return <div className="hm-rv-proben">
    <div>{d.claim && <p style={{ fontFamily: hmRvFam(sch.d), fontSize: 64, lineHeight: 1.1, letterSpacing: "-0.01em" }}>{d.claim}</p>}<p className="hm-rv-c">Claim, {sch.d}</p></div>
    <div>{d.kennzahl ? <><p style={{ fontFamily: hmRvFam(sch.d), fontSize: 120, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{d.kennzahl}</p><p className="hm-rv-c">Kennzahl, {sch.d}</p></> : <p className="hm-rv-c">Eine Kennzahl zeigen wir, sobald ein Beleg mit Zahl vorliegt.</p>}</div>
    <div>{d.fliesstext && <p style={{ fontFamily: hmRvFam(sch.t), fontSize: 22, lineHeight: "32px", maxWidth: 600 }}>{d.fliesstext}</p>}<p className="hm-rv-c">Fließtext, {sch.t}</p></div>
  </div>;
  if (f.art === "farbe") {
    const pr = d.proportion || {};
    const akz = v === "gegenentwurf" && typeof hmWeltLesbar === "function" ? hmWeltLesbar(F.akzent, G.bg, 3) : F.akzent;
    const rollen = [["Grund", G.bg, pr.grund], ["Text", G.fg, pr.text], ["Akzent", akz, pr.akzent]];
    return <div className="hm-rv-farbe">
      {rollen.every((x) => x[2] != null) && <div className="streifen">{rollen.map(([n, c, a]) => <i key={n} style={{ background: c, flexGrow: a }} />)}</div>}
      <div className="rollen">{rollen.map(([n, c, a]) => <div key={n}><span className="feld" style={{ background: c }} /><p className="hm-rv-c">{n}{a != null ? `, ${a} Prozent` : ""}, {String(c).toUpperCase()}</p></div>)}</div>
    </div>;
  }
  if (f.art === "wortmarke") return window.BrandLogo ? <BrandLogo b={umg.b} h={120} farbe={dunkel ? undefined : G.fg} invert={dunkel} /> : null;
  if (f.art === "zeichen") return <div><RvZeichen umg={umg} gegen={v === "gegenentwurf"} breite={600} />{d.name && <p className="hm-rv-c">{d.name}</p>}{d.satz && <p className="hm-rv-c hm-rv-zeichen-satz">{d.satz}</p>}</div>;
  if (f.art === "vergleich") return <div className="hm-rv-vergleich">
    <div className="hm-rv-telefon"><RvProfil umg={umg} variante={v} woche={4} breite={400} /></div>
    <div className="text">{v === "empfehlung" ? <>{d.empfehlung && <p className="hm-rv-b">{d.empfehlung}</p>}<p className="hm-rv-c">Unsere Empfehlung.</p></> : d.gegenentwurf ? <p className="hm-rv-b">{d.gegenentwurf}</p> : null}<p className="hm-rv-c">{hmRvPolName(hmRvPol(umg.grundDunkel, v))}.</p></div>
  </div>;
  return null;
}
function RvStrom({ umg, variante }) {
  const feed = umg.feed[variante];
  const posts = feed && Array.isArray(feed.posts) ? feed.posts : [];
  const eigene = [posts.find((x) => x.nr === 4) || posts[1], posts.find((x) => x.nr === 1)].filter(Boolean);
  const plaetze = variante === "gegenentwurf" ? [3, 7] : [2, 6];
  const fremde = (umg.pool || []).slice(0, 7);
  const reihe = []; let fi = 0, ei = 0;
  for (let i = 0; i < 9; i++) { if (plaetze.includes(i) && eigene[ei]) reihe.push({ eigen: eigene[ei++] }); else if (fremde[fi]) reihe.push({ fremd: fremde[fi++] }); }
  const ende = reihe.map((x) => !!x.eigen).lastIndexOf(true);
  const [i, setI] = React.useState(0);
  React.useEffect(() => { if (ende < 0 || i >= ende) return undefined; const t = setTimeout(() => setI(i + 1), 2500); return () => clearTimeout(t); }, [i, ende]);
  const x = reihe[i];
  return <div className="hm-rv-strom">{x && x.eigen && window.WeltPost && umg.welt ? <WeltPost welt={umg.welt} b={umg.bb} daten={x.eigen.daten} breite={430} /> : x && x.fremd ? <figure><div className="konto" aria-hidden="true"><i /><b /></div><img src={x.fremd.url || x.fremd} alt="" /></figure> : null}</div>;
}

/* Eine Fläche der Bühne, 1920 x 1080 */
function RvFlaeche({ f, umg, woche, fassung }) {
  if (!f) return <div className="hm-rv-flaeche" style={{ background: HM_RV_NEUTRAL.bg }} />;
  const eff = f.akt >= 5 && f.akt <= 8 && fassung ? fassung : f.fassung;
  const d = f.daten;
  const w = woche || d.woche || 4;
  if (eff === "geteilt") {
    /* Papier links, dunkel rechts; die Begründung gilt der Empfehlung und steht nur in deren Hälfte */
    return <div className="hm-rv-flaeche"><div className="hm-rv-geteilt">{hmRvReihe(umg.grundDunkel).map((v) => { const g = hmRvGrund(umg, v); return <div key={v} className="hm-rv-haelfte" style={{ background: g.bg, color: g.fg }}><div className="mitte"><RvSeite7 f={f} umg={umg} v={v} /></div>{f.art !== "vergleich" && v === "empfehlung" && <RvBegr begr={f.begruendung} />}</div>; })}</div></div>;
  }
  const g = hmRvGrund(umg, eff);
  const v = eff === "gegenentwurf" ? "gegenentwurf" : "empfehlung";
  let inhalt = null;
  if (["rahmen", "satz", "einsicht", "weisse", "kandidaten", "belege", "achse", "abschluss"].includes(f.art)) inhalt = <RvSatzBlock d={d} />;
  else if (f.art === "vertrag") inhalt = <div className="hm-rv-vertrag">
    {d.satz && <p className="hm-rv-b">{d.satz}</p>}
    {(d.attribute || []).length > 0 && <div className="hm-rv-attribute" style={{ gridTemplateColumns: `repeat(${d.attribute.length}, minmax(0, 1fr))` }}>{d.attribute.map((a) => <div key={a.name}><p className="hm-rv-b">{a.name}</p>{a.heisst && <p className="hm-rv-c">{a.heisst}</p>}{a.heisstNicht && <p className="hm-rv-c">Nicht: {a.heisstNicht}</p>}</div>)}</div>}
    <p className="hm-rv-c fuss">{d.zeile}</p>
  </div>;
  else if (f.art === "richtungen") inhalt = <div className="hm-rv-zwei">{d.richtungen.map((x) => <div key={x.leitidee}><p className="hm-rv-b">{x.leitidee}</p><p className="hm-rv-c">{x.name ? x.name + ". " : ""}{x.blieb ? "Geblieben." : "Verworfen."}</p></div>)}</div>;
  else if (f.art === "entwuerfe") inhalt = <div className="hm-rv-entwuerfe">{d.entwuerfe.map((x) => <figure key={x.spec.id}><div className="hm-rv-entwurf">{window.LogoKonzept && <LogoKonzept spec={x.spec} b={umg.b} h={56} />}</div><figcaption className="hm-rv-c">{x.satz}</figcaption></figure>)}</div>;
  else if (f.art === "idee") inhalt = <>
    {d.portrait && <img className="hm-rv-portrait" src={d.portrait} alt="" />}
    <div className="hm-rv-block an-a" style={d.portrait ? { width: 880 } : null}>
      <p className="hm-rv-a">{d.claim}</p>
      {d.idee && <p className="hm-rv-b">{d.idee}</p>}
      {f.begruendung && <div style={{ marginTop: 48 }}><RvBegr begr={f.begruendung} /></div>}
    </div>
  </>;
  else if (f.art === "strom") inhalt = <RvApp><RvStrom key={v} umg={umg} variante={v} /></RvApp>;
  else if (f.art === "profil") inhalt = <RvApp begr={f.begruendung}><div className="hm-rv-telefon"><RvProfil umg={umg} variante={v} woche={w} breite={500} /></div></RvApp>;
  else if (f.art === "beitrag") inhalt = <RvBeitrag f={f} umg={umg} variante={v} />;
  else if (f.art === "karte") inhalt = <RvApp begr={f.begruendung} unter={["Visitenkarte, vorn und hinten.", d.kontakt].filter(Boolean).join(" ")}><div className="hm-rv-karten">{window.WeltKarte && umg.welt && <><WeltKarte welt={umg.welt} b={umg.bb} seite="vorn" breite={420} /><WeltKarte welt={umg.welt} b={umg.bb} seite="hinten" breite={420} /></>}</div></RvApp>;
  else if (f.art === "karte2") inhalt = <RvApp begr={f.begruendung} unter="Visitenkarte der zweiten Fassung, vorn und hinten."><div className="hm-rv-karten">{[d.vorn, d.hinten].filter(Boolean).map((u, i) => <img key={i} src={u} alt="" style={{ width: 420, height: "auto", display: "block" }} />)}</div></RvApp>;
  else if (f.art === "signatur") inhalt = <RvApp begr={f.begruendung} unter={["E-Mail-Signatur.", d.kontakt].filter(Boolean).join(" ")}>{window.WeltSignatur && umg.welt && <WeltSignatur welt={umg.welt} b={umg.bb} breite={880} />}</RvApp>;
  else if (f.art === "website") inhalt = <RvApp begr={f.begruendung}><RvWebsite umg={umg} d={d} variante={v} /></RvApp>;
  else if (["schrift", "farbe", "wortmarke", "zeichen", "vergleich"].includes(f.art)) inhalt = <div className="hm-rv-voll"><div className="mitte"><RvSeite7 f={f} umg={umg} v={v} /></div>{f.art !== "vergleich" && <RvBegr begr={f.begruendung} />}</div>;
  return <div className="hm-rv-flaeche" data-akt={f.akt} style={{ background: g.bg, color: g.fg }}>{inhalt}</div>;
}
/* Verkleinerte Fläche für den Presenter, nicht bedienbar */
function RvVorschau({ f, umg, woche, fassung, klein }) {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(klein ? 320 : 900);
  React.useEffect(() => {
    const el = ref.current; if (!el) return undefined;
    el.setAttribute("inert", "");
    if (typeof ResizeObserver === "undefined") { setW(el.clientWidth || w); return undefined; }
    const ro = new ResizeObserver(() => setW(el.clientWidth)); ro.observe(el); setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  const s = (w || 1) / 1920;
  return <div ref={ref} className={"hm-rv-vorschau" + (klein ? " klein" : "")} style={{ height: Math.round(1080 * s) }} aria-hidden="true">
    <div style={{ width: 1920, height: 1080, transform: `scale(${s})` }}><RvFlaeche f={f} umg={umg} woche={woche} fassung={fassung} /></div>
  </div>;
}

/* ---------- Bühne und Presenter ---------- */
function RevealBuehne({ m, presenter, onClose, probe }) {
  hmRevealStil();
  const mid = m.id;
  const revAlle = useHm("reveal");
  ["plattformen", "marke2", "branding", "markenbuch", "logos", "strategien", "auftrag", "portraits"].forEach((k) => useHm(k));
  const rev = (revAlle || {})[mid] || {};
  /* probe=1 aus der Adresse beim ersten Rendern merken; wb-app schreibt die Adresse danach um */
  const [probeAdresse] = React.useState(() => typeof location !== "undefined" && new URLSearchParams(location.search).get("probe") === "1");
  const istProbe = probe != null ? !!probe : probeAdresse;
  const sig = hmRvSig(mid);
  const umg = React.useMemo(() => hmRvUmgebung(m), [mid, sig]);
  /* Schriften und Bilder vorladen, auch im Presenter-Fenster und in der Bühne über ?ansicht=reveal */
  const schrift = useRvSchriften(umg.b);
  const d = React.useMemo(() => hmRevealFolien(mid, { plattform: umg.pRoh, b: umg.b, welt: umg.welt, feed: umg.feed }), [mid, sig, umg, schrift]);
  React.useEffect(() => {
    hmRvBilderVorladen(umg);
    d.folien.filter((x) => x.art === "karte2").forEach((x) => hmRvBilderVorladen({ pool: [x.daten.vorn, x.daten.hinten].filter(Boolean) }));
  }, [umg, d]);
  const n = d.folien.length;
  /* Beide Fenster beginnen bei der ersten Folie; der Presenter übernimmt den Stand erst aus der Antwort der Bühne */
  const [st, setSt] = React.useState({ index: 0, prev: null, woche: null, fassung: null });
  const [geschlossen, setGeschlossen] = React.useState(false);
  const von = React.useRef("w" + Math.random().toString(36).slice(2, 10)).current;
  const letzte = React.useRef(0);
  const kanal = React.useRef(null);
  const hatKanal = typeof BroadcastChannel !== "undefined";
  const zuRef = React.useRef(onClose); zuRef.current = onClose;
  const folienRef = React.useRef(d.folien); folienRef.current = d.folien;
  const stRef = React.useRef(st); stRef.current = st;

  /* Folie über ihre id finden, damit beide Fenster auch bei abweichender Folienzahl dieselbe Fläche zeigen */
  const indexVon = (wert) => {
    const l = folienRef.current;
    if (typeof wert === "number") return l.length ? Math.max(0, Math.min(l.length - 1, wert)) : -1;
    return l.findIndex((x) => x.id === wert);
  };
  const senden = (typ, wert) => {
    const x = hmRevealNachricht(typ, wert, von);
    if (typ !== "hallo") letzte.current = x.zeit;
    if (kanal.current) kanal.current.postMessage(x);
    const folie = typ === "folie" ? wert : typ === "stand" && wert ? wert.folie : undefined;
    if (folie === undefined && kanal.current) return;
    hmStore.patch("reveal", (a) => { const alt = (a || {})[mid] || {}; return { ...(a || {}), [mid]: { ...alt, ...(folie !== undefined ? { folie } : {}), ...(kanal.current ? {} : { live: x }) } }; });
  };
  const sendenStand = () => { const s = stRef.current; const f0 = folienRef.current[s.index]; senden("stand", { folie: f0 ? f0.id : null, woche: s.woche, fassung: s.fassung }); };
  const anwenden = (x) => {
    if (x.typ === "folie" || x.typ === "stand") {
      const w = x.typ === "stand" ? (x.wert || {}) : { folie: x.wert };
      const i = indexVon(w.folie); if (i < 0) return;
      setSt((s) => {
        if (x.typ === "stand") return { index: i, prev: s.index === i ? s.prev : s.index, woche: w.woche || null, fassung: w.fassung || null };
        return s.index === i ? s : { index: i, prev: s.index, woche: null, fassung: null };
      });
    } else if (x.typ === "woche") setSt((s) => ({ ...s, woche: x.wert }));
    else if (x.typ === "fassung") setSt((s) => ({ ...s, fassung: x.wert }));
    else if (x.typ === "hallo") { if (!presenter) sendenStand(); }
    else if (x.typ === "schluss") { if (presenter) setGeschlossen(true); else if (zuRef.current) zuRef.current(); }
  };
  /* Synchronisation: BroadcastChannel, sonst hmStore mit Storage-Events; letzte Nachricht gewinnt, eigenes Echo zählt nicht.
     Beim Öffnen meldet die Bühne ihren Stand, der Presenter fragt mit "hallo" nach. */
  React.useEffect(() => {
    if (hatKanal) {
      const k = new BroadcastChannel("wb-reveal-" + mid); kanal.current = k;
      k.onmessage = (e) => {
        const x = e.data || {};
        if (!x.typ || x.von === von) return;
        if (x.typ !== "hallo") { if (x.zeit < letzte.current) return; letzte.current = x.zeit; }
        anwenden(x);
      };
    }
    if (presenter) senden("hallo", null); else sendenStand();
    return () => { if (kanal.current) { kanal.current.close(); kanal.current = null; } };
  }, [mid]);
  React.useEffect(() => {
    const x = rev.live; if (hatKanal || !x || x.von === von) return;
    if (x.typ !== "hallo") { if (x.zeit <= letzte.current) return; letzte.current = x.zeit; }
    anwenden(x);
  }, [rev.live && rev.live.zeit]);

  const go = (i) => { const z = Math.max(0, Math.min(n - 1, i)); if (z === st.index) return; setSt((s) => ({ index: z, prev: s.index, woche: null, fassung: null })); senden("folie", d.folien[z].id); };
  const setWoche = (w) => { setSt((s) => ({ ...s, woche: w })); senden("woche", w); };
  const setFassung = (v) => { setSt((s) => ({ ...s, fassung: v })); senden("fassung", v); };
  const warVoll = React.useRef(false);
  const schliessen = () => { warVoll.current = false; senden("schluss", null); if (zuRef.current) zuRef.current(); };
  const schliessenRef = React.useRef(schliessen); schliessenRef.current = schliessen;

  /* Tasten: rechts und Leertaste weiter, links zurück, Escape schließt die Bühne */
  React.useEffect(() => {
    const k = (e) => {
      const t = e.target; if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
      if (presenter && t && t.tagName === "BUTTON" && (e.key === " " || e.key === "Enter")) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); go(st.index + 1); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(st.index - 1); }
      else if (e.key === "Escape" && !presenter) { e.preventDefault(); schliessen(); }
    };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  });
  /* Im Vollbild fängt der Browser den ersten Escape ab und beendet nur das Vollbild: dann schließt die Bühne mit */
  React.useEffect(() => {
    if (presenter || typeof document === "undefined") return undefined;
    if (document.fullscreenElement) warVoll.current = true;
    const h = () => { if (document.fullscreenElement) warVoll.current = true; else if (warVoll.current) { warVoll.current = false; schliessenRef.current(); } };
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);
  /* Termin, nicht Probe: gestartet beim Öffnen der Bühne, am erst beim ersten Erscheinen von Akt 9 */
  React.useEffect(() => {
    if (presenter || istProbe) return;
    hmStore.patch("reveal", (a) => { const x = (a || {})[mid] || {}; return x.gestartet ? (a || {}) : { ...(a || {}), [mid]: { ...x, gestartet: new Date().toISOString() } }; });
  }, []);
  const f = d.folien[Math.min(st.index, n - 1)];
  React.useEffect(() => {
    if (presenter || istProbe || !f || f.akt !== 9) return;
    if ((((hmStore.get("reveal") || {})[mid]) || {}).am) return;
    hmStore.patch("reveal", (a) => { const x = (a || {})[mid] || {}; return x.am ? (a || {}) : { ...(a || {}), [mid]: { ...x, am: new Date().toISOString() } }; });
    hmEvent(mid, "reveal", "Präsentation gezeigt. Die Rückmeldung öffnet in 24 Stunden.", "Team");
  }, [f && f.id]);
  /* Überblendung nur innerhalb eines Akts, dann alte Lage entfernen */
  React.useEffect(() => { if (st.prev == null) return undefined; const t = setTimeout(() => setSt((s) => ({ ...s, prev: null })), 320); return () => clearTimeout(t); }, [st.index]);
  /* Mauszeiger nach zwei Sekunden ohne Bewegung ausblenden */
  const [still, setStill] = React.useState(false);
  const timer = React.useRef(null);
  const bewegt = () => { setStill(false); clearTimeout(timer.current); timer.current = setTimeout(() => setStill(true), 2000); };
  React.useEffect(() => { if (presenter) return undefined; bewegt(); return () => clearTimeout(timer.current); }, []);
  const [vp, setVp] = React.useState({ w: typeof window !== "undefined" ? window.innerWidth : 1920, h: typeof window !== "undefined" ? window.innerHeight : 1080 });
  React.useEffect(() => { if (presenter) return undefined; const r = () => setVp({ w: window.innerWidth, h: window.innerHeight }); window.addEventListener("resize", r); return () => window.removeEventListener("resize", r); }, []);
  const lageRef = React.useRef(null);
  React.useEffect(() => { if (lageRef.current) lageRef.current.setAttribute("inert", ""); });
  /* Fokus ins Portal, damit die Leertaste keinen Knopf im Markenbuch dahinter auslöst */
  const portalRef = React.useRef(null);
  React.useEffect(() => {
    if (presenter) return undefined;
    const vorher = typeof document !== "undefined" ? document.activeElement : null;
    if (portalRef.current) { try { portalRef.current.focus({ preventScroll: true }); } catch (e) { portalRef.current.focus(); } }
    return () => { try { if (vorher && vorher.focus && document.contains(vorher)) vorher.focus({ preventScroll: true }); } catch (e) { /* Fokus bleibt */ } };
  }, []);

  const woche = st.woche || (f && f.daten.woche) || 4;
  if (presenter) return <RvPresenter m={m} umg={umg} d={d} st={st} f={f} woche={woche} go={go} setWoche={setWoche} setFassung={setFassung} istProbe={istProbe} geschlossen={geschlossen} />;

  const s = Math.min(vp.w / 1920, vp.h / 1080);
  const ox = Math.round((vp.w - 1920 * s) / 2), oy = Math.round((vp.h - 1080 * s) / 2);
  const fp = st.prev != null ? d.folien[st.prev] : null;
  const blend = !!(fp && f && fp.akt === f.akt && !hmRvWenigBewegung());
  const eff = f && f.akt >= 5 && f.akt <= 8 && st.fassung ? st.fassung : f && f.fassung;
  const grund = eff === "geteilt" ? HM_RV_NEUTRAL : hmRvGrund(umg, eff);
  const vollbild = () => { try { if (!document.fullscreenElement && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {}); } catch (e) { /* ohne Vollbild */ } };
  const buehne = <div ref={portalRef} tabIndex={-1} className={"hm-rv-portal" + (still ? " still" : "")} style={{ background: grund.bg }} onMouseMove={bewegt} onClick={vollbild} role="presentation">
    <div ref={lageRef} className="hm-rv-rahmen" style={{ transform: `translate(${ox}px, ${oy}px) scale(${s})` }}>
      {blend && <div className="hm-rv-lage" key={"v" + fp.id}><RvFlaeche f={fp} umg={umg} woche={woche} fassung={null} /></div>}
      <div className={"hm-rv-lage" + (blend ? " ein" : "")} key={f ? f.id : "leer"}><RvFlaeche f={f} umg={umg} woche={woche} fassung={st.fassung} /></div>
    </div>
  </div>;
  return typeof document !== "undefined" && window.ReactDOM && ReactDOM.createPortal ? ReactDOM.createPortal(buehne, document.body) : buehne;
}

/* Hinweise in zehn Sekunden lesbar: zuerst der laufende Akt, fehlende Begründungen gezählt, der Rest aufklappbar */
const hmRvIstBegrFehlt = (h) => /: Begründung fehlt\.$/.test(h.text);
function RvHinweise({ hinweise, akt }) {
  const jetzt = hinweise.filter((h) => h.akt === akt && !hmRvIstBegrFehlt(h));
  const begr = hinweise.filter(hmRvIstBegrFehlt);
  const rest = hinweise.filter((h) => h.akt !== akt && !hmRvIstBegrFehlt(h));
  return <div>
    <h2>Hinweise</h2>
    {jetzt.length ? <ul className="hm-rv-liste">{jetzt.map((h, i) => <li key={i}><span>{hmRvHinweisText(h)}</span></li>)}</ul> : <p className="ort">Keine für diesen Akt.</p>}
    {begr.length > 0 && <p className="ort">{`Begründung fehlt bei ${begr.length === 1 ? "einer Ansicht" : begr.length + " Ansichten"}.`}</p>}
    {rest.length > 0 && <details style={{ marginTop: 8 }}>
      <summary className="ort" style={{ cursor: "pointer" }}>{`Weitere Hinweise (${rest.length})`}</summary>
      <ul className="hm-rv-liste" style={{ marginTop: 8 }}>{rest.map((h, i) => <li key={i}><span>{hmRvHinweisText(h)}</span></li>)}</ul>
    </details>}
  </div>;
}

function RvPresenter({ m, umg, d, st, f, woche, go, setWoche, setFassung, istProbe, geschlossen }) {
  const [jetzt, setJetzt] = React.useState(Date.now());
  React.useEffect(() => { const t = setInterval(() => setJetzt(Date.now()), 1000); return () => clearInterval(t); }, []);
  const start = React.useRef(Date.now());
  const aktStart = React.useRef({ akt: f ? f.akt : 0, t: Date.now() });
  if (f && aktStart.current.akt !== f.akt) aktStart.current = { akt: f.akt, t: Date.now() };
  const [frage, setFrage] = React.useState("");
  const fragen = ((((hmStore.get("reveal") || {})[m.id]) || {}).fragen) || [];
  if (!f) return <div className="hm-rv-pres"><p>Kein Ablauf vorhanden.</p></div>;
  const naechste = d.folien[st.index + 1] || null;
  const rest = HM_RV_MINUTEN[f.akt] * 60 - (jetzt - aktStart.current.t) / 1000;
  const gesamtSoll = [...new Set(d.folien.map((x) => x.akt))].reduce((s, a) => s + HM_RV_MINUTEN[a], 0) * 60;
  const gesamt = (jetzt - start.current) / 1000;
  const zeigeWoche = (f.akt === 5 || f.akt === 6) && f.art === "profil";
  const zeigeFassung = f.akt >= 5 && f.akt <= 8;
  const pflicht = f.akt >= 4 && f.akt <= 7 && ["idee", "profil", "beitrag", "website", "karte", "signatur", "schrift", "farbe", "wortmarke", "zeichen"].includes(f.art);
  const notieren = () => {
    const t = hmRvS(frage); if (!t) return;
    hmStore.patch("reveal", (a) => { const x = (a || {})[m.id] || {}; return { ...(a || {}), [m.id]: { ...x, fragen: [...(x.fragen || []), { id: "q" + Date.now().toString(36), text: t, folie: f.id, zeit: new Date().toISOString() }] } }; });
    setFrage("");
    if (typeof toast === "function") toast("Frage notiert");
  };
  return <div className="hm-rv-pres">
    <div>
      <h1>Akt {f.akt}, {HM_RV_AKTE[f.akt]}</h1>
      <p className="ort">{f.titel}. Folie {st.index + 1} von {d.folien.length}.{istProbe ? " Probe, zählt nicht als Termin." : ""}{geschlossen ? " Die Bühne ist geschlossen." : ""}</p>
      <RvVorschau f={f} umg={umg} woche={woche} fassung={st.fassung} />
      <div className="hm-rv-steuer">
        <button className="hm-rv-k haupt" onClick={() => go(st.index - 1)} disabled={st.index === 0}>Zurück</button>
        <button className="hm-rv-k haupt" onClick={() => go(st.index + 1)} disabled={!naechste}>Weiter</button>
        {zeigeWoche && <div className="gruppe" role="group" aria-label="Woche">{[1, 2, 3, 4].map((w) => <button key={w} className="hm-rv-k" aria-pressed={woche === w} onClick={() => setWoche(w)}>Woche {w}</button>)}</div>}
        {zeigeFassung && <div className="gruppe" role="group" aria-label="Fassung">{[[null, "Wie geplant"], ["empfehlung", `Empfehlung, ${hmRvPolName(hmRvPol(umg.grundDunkel, "empfehlung"))}`], ["gegenentwurf", `Gegenentwurf, ${hmRvPolName(hmRvPol(umg.grundDunkel, "gegenentwurf"))}`]].map(([v, t]) => <button key={t} className="hm-rv-k" aria-pressed={st.fassung === v} onClick={() => setFassung(v)}>{t}</button>)}</div>}
      </div>
      <div className="hm-rv-notiz">
        <p>{f.notiz || "Kein Sprechzettel für diese Folie."}</p>
        {f.begruendung ? <p className="begr">Begründung: {f.begruendung.satz}{f.begruendung.kriterium ? ` Kriterium: ${f.begruendung.kriterium}.` : ""}</p> : pflicht ? <p className="begr">Begründung fehlt.</p> : null}
      </div>
    </div>
    <aside className="hm-rv-seite">
      <div className="hm-rv-zeit" aria-live="off">
        <p className={"gross" + (rest < 0 ? " ueber" : "")}>{rest >= 0 ? `Akt ${f.akt}: noch ${hmRvMinSek(rest)}` : `Akt ${f.akt}: ${hmRvMinSek(rest)} über der Zeit`}</p>
        <p>Gesamt {hmRvMinSek(gesamt)} von {hmRvMinSek(gesamtSoll)}</p>
        <p>Diese Folie etwa {String(f.minuten).replace(".", ",")} Min.</p>
      </div>
      <div>{naechste ? <><RvVorschau f={naechste} umg={umg} woche={naechste.daten.woche || 4} fassung={null} klein /><p className="ort">Als Nächstes: {naechste.titel}</p></> : <p>Letzte Folie.</p>}</div>
      <div>
        <h2><label htmlFor="hm-rv-frage">Frage notieren</label></h2>
        <textarea id="hm-rv-frage" className="hm-rv-feld" rows={3} value={frage} onChange={(e) => setFrage(e.target.value)} />
        <div className="hm-rv-steuer" style={{ marginTop: 8 }}><button className="hm-rv-k" onClick={notieren} disabled={!hmRvS(frage)}>Frage speichern</button>{fragen.length > 0 && <span className="ort">{fragen.length === 1 ? "Eine Frage notiert." : `${fragen.length} Fragen notiert.`}</span>}</div>
      </div>
      <RvHinweise hinweise={d.hinweise} akt={f.akt} />
      <div><h2>Bereitschaft</h2><ul className="hm-rv-liste">{d.bereit.map((x) => <li key={x.name}><RvIco ok={x.ok} /><span>{x.name}. {x.detail}</span></li>)}</ul></div>
      <div><h2>Nie sagen</h2><ul className="hm-rv-liste">{HM_RV_SPERRLISTE.map((x) => <li key={x}><span>{x}</span></li>)}</ul></div>
    </aside>
  </div>;
}

/* ---------- Knopf im Markenbuch ---------- */
function RevealKnopf({ m, teamSicht }) {
  hmRevealStil();
  const mid = m.id;
  const revAlle = useHm("reveal");
  ["plattformen", "markenbuch", "marke2", "branding", "meetings", "logos", "strategien", "auftrag", "portraits", "rueckmeldung"].forEach((k) => useHm(k));
  const b = hmBrand(mid);
  const schrift = useRvSchriften(b);
  const sig = hmRvSig(mid);
  const d = React.useMemo(() => hmRevealFolien(mid), [mid, sig, schrift]);
  const alle = d.bereit.every((x) => x.ok);
  const [offen, setOffen] = React.useState(false);
  const [probe, setProbe] = React.useState(true);
  const [details, setDetails] = React.useState(false);
  const basis = typeof location !== "undefined" ? location.href.split("?")[0].split("#")[0] : "";
  const presUrl = `${basis}?ansicht=reveal&presenter=1&makler=${encodeURIComponent(mid)}${alle ? "" : "&probe=1"}`;
  const rmUrl = `${basis}?ansicht=rueckmeldung&makler=${encodeURIComponent(mid)}`;
  const starten = () => {
    try { if (!document.fullscreenElement && document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {}); } catch (e) { /* ohne Vollbild */ }
    setProbe(!alle); setOffen(true);
  };
  const schliessen = () => { try { if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {}); } catch (e) { /* schon zu */ } setOffen(false); };
  const rev = (revAlle || {})[mid] || {};
  return <div className="hm-rv-knopf">
    <div className="reihe">
      <Btn onClick={starten}>{alle ? "Reveal starten" : "Probe starten"}</Btn>
      <Btn ghost onClick={() => window.open(presUrl, "wb-reveal-presenter-" + mid, "popup,width=1280,height=820")}>Presenter öffnen</Btn>
      <KopierKnopf text={rmUrl} label="Link zur Rückmeldung kopieren" />
      {teamSicht && <button className="hm-rv-klein" aria-expanded={details} onClick={() => setDetails(!details)}>{details ? "Details schließen" : "Details"}</button>}
    </div>
    <ul className="hm-rv-liste" aria-label="Bereitschaft">{d.bereit.map((x) => <li key={x.name}><RvIco ok={x.ok} /><span>{x.ok ? x.name + "." : `${x.name}: ${x.detail}`}</span></li>)}</ul>
    {teamSicht && details && <RvTeamDetails m={m} d={d} rev={rev} />}
    {offen && <RevealBuehne m={m} presenter={false} probe={probe} onClose={schliessen} />}
  </div>;
}

function RvTeamDetails({ m, d, rev }) {
  const mid = m.id;
  const p = window.hmMbPlattform ? hmMbPlattform(mid) : null;
  const kand = hmRvZitatKandidaten(mid, p);
  const attrs = hmRvAttribute(mid, p);
  const frei = rev.zitateFreigabe || {};
  const achse = rev.achseBeruehrt || [];
  const saetze = rev.saetze || {};
  const [gespeichert, setGespeichert] = React.useState(false);
  const setRev = (fn) => hmStore.patch("reveal", (a) => { const x = (a || {})[mid] || {}; return { ...(a || {}), [mid]: { ...x, ...fn(x) } }; });
  const freigeben = (satz, an) => {
    setRev((x) => { const z = { ...(x.zitateFreigabe || {}) }; if (an) z[satz] = new Date().toISOString().slice(0, 10); else delete z[satz]; return { zitateFreigabe: z }; });
    hmEvent(mid, "reveal", an ? `Satz für Akt 1 im Workshop öffentlich bestätigt: „${satz}“` : `Freigabe für Akt 1 zurückgenommen: „${satz}“`, "Team");
  };
  const achseSetzen = (i) => setRev((x) => { const l = x.achseBeruehrt || []; return { achseBeruehrt: l.includes(i) ? l.filter((y) => y !== i) : l.length >= 3 ? l : [...l, i].sort((a, c) => a - c) }; });
  const satzSetzen = (k, t) => { setRev((x) => ({ saetze: { ...(x.saetze || {}), [k]: t } })); setGespeichert(true); };
  return <div className="hm-rv-team">
    <div>
      <h3>Sätze für Akt 1</h3>
      <p className="u">Nur Sätze, die der Makler am Ende des Workshops öffentlich bestätigt hat. Die Regel verlangt einen ganzen Satz mit mindestens sechs Wörtern.</p>
      {kand.length ? kand.map((z) => { const r = hmRvSatzRegel(z.satz); const an = !!frei[z.satz]; return <div key={z.satz} className="hm-rv-kand">
        <div><p>„{z.satz}“</p><p className="u">{z.herkunft}{r.ok ? "" : ` Nicht verwendbar: ${r.grund}.`}</p></div>
        <button className="hm-rv-schalter" role="switch" aria-checked={an} disabled={!r.ok && !an} onClick={() => freigeben(z.satz, !an)}><i aria-hidden="true" />Im Workshop öffentlich bestätigt</button>
      </div>; }) : <p>Noch keine Sätze aus dem Workshop gespeichert.</p>}
    </div>
    <div>
      <h3>Attribute, die die Achse berühren</h3>
      <p className="u">Höchstens drei. Nur dort fragt die Rückmeldung zusätzlich nach der Fassung.</p>
      <div className="hm-rv-steuer" role="group" aria-label="Attribute an der Achse">{attrs.map((a, i) => <button key={a.id} className="hm-rv-k" aria-pressed={achse.includes(i)} disabled={!achse.includes(i) && achse.length >= 3} onClick={() => achseSetzen(i)}>{a.name}</button>)}</div>
      {!attrs.length && <p>Attribute folgen aus dem Markenvertrag.</p>}
    </div>
    <div>
      <h3><label htmlFor="hm-rv-s-e">Zwei Sätze zur Empfehlung</label></h3>
      <textarea id="hm-rv-s-e" className="hm-rv-feld" rows={3} value={saetze.empfehlung || ""} onChange={(e) => satzSetzen("empfehlung", e.target.value)} />
      <h3 style={{ marginTop: 16 }}><label htmlFor="hm-rv-s-g">Zwei Sätze zum Gegenentwurf</label></h3>
      <textarea id="hm-rv-s-g" className="hm-rv-feld" rows={3} value={saetze.gegenentwurf || ""} onChange={(e) => satzSetzen("gegenentwurf", e.target.value)} />
      <p className="hm-rv-gespeichert" aria-live="polite">{gespeichert ? "Gespeichert" : ""}</p>
    </div>
    <div><h3>Hinweise zum Ablauf</h3><ul className="hm-rv-liste">{d.hinweise.map((h, i) => <li key={i}><span>{hmRvHinweisText(h)}</span></li>)}</ul></div>
    {rev.am && <div><h3>Rückmeldung</h3><RueckmeldungStand m={m} /></div>}
  </div>;
}

/* ---------- Rückmeldung am Folgetag ---------- */
function hmRvRueckmeldungLeer(offenAb) {
  return { runde: 1, offenAb: offenAb || null, gestartet: null, teil1: {}, falsch: {}, wahl: null, sendung: { name: null, keinerPasst: false, satz: "" }, pins: [], teilnehmer: [], dauerSek: null, abgeschickt: null, entwurfPin: null, entwurfKeiner: "" };
}
/* Speichert sofort; nach dem Abschicken nur noch das Team (opt.team) */
function hmRueckmeldungSpeichern(mid, patch, opt) {
  const o = opt || {};
  const rev = ((hmStore.get("reveal") || {})[mid]) || {};
  const ab = rev.am ? hmRvOffenAb(rev.am) : null;
  let erg = null;
  hmStore.patch("rueckmeldung", (a) => {
    const alleRm = a || {};
    const alt = alleRm[mid] || hmRvRueckmeldungLeer(ab);
    if (alt.abgeschickt && !o.team) { erg = alt; return alleRm; }
    const p = typeof patch === "function" ? patch(alt) : (patch || {});
    erg = { ...alt, ...p, runde: alt.runde || 1, offenAb: alt.offenAb || ab, gestartet: alt.gestartet || (o.team ? null : new Date().toISOString()) };
    return { ...alleRm, [mid]: erg };
  });
  return erg;
}
function hmRevealStand(mid) {
  const rev = ((hmStore.get("reveal") || {})[mid]) || {};
  const rm = ((hmStore.get("rueckmeldung") || {})[mid]) || null;
  const offenAb = rev.am ? hmRvOffenAb(rev.am) : null;
  const offen = !!offenAb && Date.parse(offenAb) <= Date.now();
  const status = rm && rm.abgeschickt ? "abgeschickt" : rm && rm.gestartet ? "begonnen" : offen ? "offen" : rev.am ? "gezeigt" : rev.gestartet ? "laeuft" : "geplant";
  return { status, gestartet: rev.gestartet || null, am: rev.am || null, offenAb, offen, begonnen: (rm && rm.gestartet) || null, abgeschickt: (rm && rm.abgeschickt) || null, dauerSek: rm && rm.dauerSek != null ? rm.dauerSek : null, fragen: (rev.fragen || []).length };
}
/* Wahl gegen Urteil: die gewählte Fassung liegt auf dem Pol, den Teil 1 seltener genannt hat (Pol je nach Grundton der Welt) */
function hmRvWahlGegenUrteil(rm, achse, grundDunkel) {
  if (!rm || !rm.wahl) return false;
  let papier = 0, dunkel = 0;
  (achse || []).forEach((i) => { const f = ((rm.teil1 || {})[i] || {}).fassung; if (f === "papier") papier++; if (f === "dunkel") dunkel++; });
  const pol = hmRvPol(grundDunkel, rm.wahl);
  return (pol === "papier" && dunkel > papier) || (pol === "dunkel" && papier > dunkel);
}
function hmRvZuSchnell(rm) {
  if (!rm || !rm.abgeschickt || rm.dauerSek == null || rm.dauerSek >= 90) return false;
  const t = Object.values(rm.teil1 || {}), f = Object.values(rm.falsch || {});
  return t.length > 0 && t.every((x) => x.urteil === "trifft") && f.every((x) => x.wert === "trifft");
}

/* Gleichrangige Knöpfe, nichts vorgewählt, gewählt mit Kontur und Haken statt Füllung */
function RvWahl({ optionen, wert, set, label, gesperrt, viele }) {
  return <div className="hm-rv-wahl" role="group" aria-label={label} style={{ gridTemplateColumns: viele ? "repeat(auto-fill, minmax(128px, 1fr))" : `repeat(${optionen.length}, minmax(0, 1fr))` }}>
    {optionen.map(([id, t]) => <button key={id} className="hm-rv-opt" aria-pressed={wert === id} disabled={gesperrt} onClick={() => set(id)}>{wert === id && <RvIco ok />}{t}</button>)}
  </div>;
}
function useRvBreite(ref, start, aktiv) {
  const [w, setW] = React.useState(start);
  React.useEffect(() => { const el = ref.current; if (!el || typeof ResizeObserver === "undefined") return undefined; const ro = new ResizeObserver(() => setW(el.clientWidth || start)); ro.observe(el); setW(el.clientWidth || start); return () => ro.disconnect(); }, [aktiv]);
  return w;
}

function Rueckmeldung({ m, allein }) {
  hmRevealStil();
  const mid = m.id;
  const revAlle = useHm("reveal"); const rmAlle = useHm("rueckmeldung");
  ["plattformen", "marke2", "auftrag", "branding", "markenbuch"].forEach((k) => useHm(k));
  const rev = (revAlle || {})[mid] || {};
  const rm = (rmAlle || {})[mid] || null;
  const umg = React.useMemo(() => hmRvUmgebung(m), [mid, hmRvSig(mid)]);
  const attrs = React.useMemo(() => hmRvAttribute(mid, umg.pRoh), [umg]);
  const falschListe = React.useMemo(() => hmRvFalschListe(mid, umg.pRoh), [umg]);
  const T = hmRvTermin(mid, { reveal: rev });
  const offenAb = rev.am ? hmRvOffenAb(rev.am) : null;
  const offen = !!offenAb && Date.parse(offenAb) <= Date.now();
  const [teil, setTeil] = React.useState(1);
  const [nachlese, setNachlese] = React.useState("empfehlung");
  const [nachleseOffen, setNachleseOffen] = React.useState(false);
  const [gespeichert, setGespeichert] = React.useState(null);
  const [bestaetigen, setBestaetigen] = React.useState(false);
  /* Entwürfe liegen sofort in der Ablage, damit beim Abbrechen nichts verloren geht */
  const [keinerOffen, setKeinerOffen] = React.useState(() => !!(rm && hmRvS(rm.entwurfKeiner)));
  const [keinerSatz, setKeinerSatzRoh] = React.useState(() => (rm && rm.entwurfKeiner) || "");
  const [pin, setPinRoh] = React.useState(() => (rm && rm.entwurfPin) || { ansicht: null, text: "", art: null });
  const box = React.useRef(null);
  const bw = useRvBreite(box, 320, offen && !(rm && rm.abgeschickt));
  React.useEffect(() => { if (offen && !(rm && rm.gestartet)) hmRueckmeldungSpeichern(mid, {}); }, [offen]);
  const kopfRef = React.useRef(null);
  const ersterTeil = React.useRef(true);
  React.useEffect(() => { if (ersterTeil.current) { ersterTeil.current = false; return; } if (kopfRef.current) kopfRef.current.focus(); }, [teil]);

  if (!offen) {
    const satz = T.ab ? `Ihre Rückmeldung öffnet am ${hmRvTag(T.ab)}${T.abZeit ? " um " + hmRvUhr(T.ab) : ""}.` : "Ihre Rückmeldung öffnet am Tag nach Ihrer Präsentation.";
    return <div className="hm-rv-rm"><p>{satz}</p></div>;
  }
  const r = rm || hmRvRueckmeldungLeer(offenAb);
  const fertig = !!r.abgeschickt;
  const sp = (patch) => { if (fertig) return; hmRueckmeldungSpeichern(mid, patch); setGespeichert(new Date()); };
  const setPin = (p) => { setPinRoh(p); sp({ entwurfPin: p }); };
  const setKeinerSatz = (t) => { setKeinerSatzRoh(t); sp({ entwurfKeiner: t }); };
  const gd = umg.grundDunkel;
  const reihe = hmRvReihe(gd);
  const t1 = (i, patch) => sp((alt) => ({ teil1: { ...(alt.teil1 || {}), [i]: { ...((alt.teil1 || {})[i] || {}), ...patch } } }));
  const fa = (i, patch) => sp((alt) => ({ falsch: { ...(alt.falsch || {}), [i]: { ...((alt.falsch || {})[i] || {}), ...patch } } }));
  const achse = rev.achseBeruehrt || [];
  const saetze = rev.saetze || {};
  const sendung = hmRvSendung(mid);
  const sigName = hmRvSignaturName(mid, umg.pRoh, umg.feed.empfehlung);
  const runden = typeof window.hmRundenGenutzt === "function" ? Number(window.hmRundenGenutzt(mid)) || 0 : 0;
  const telefon = Math.max(240, Math.floor(bw >= 820 ? Math.min(390, (bw - 24) / 2) : Math.min(390, bw)));  /* Telefonbreite wie in 13_feed: min(390, (Breite minus 24) / 2), unter 820 px untereinander */
  const ansichtName = (id) => (HM_RV_ANSICHTEN.find((x) => x[0] === id) || [id, id])[1];
  const urteilSatz = (() => {
    const teile = achse.filter((i) => attrs[i] && ((r.teil1 || {})[i] || {}).fassung).map((i) => `bei ${attrs[i].name} ${HM_RV_FASSUNG[r.teil1[i].fassung].replace(/^E/, "e").replace(/^B/, "b")}`);
    return teile.length ? `In Teil 1 haben Sie ${teile.join(", ")} gesehen.` : null;
  })();
  const offenTeile = [];
  const n1 = attrs.filter((a, i) => !((r.teil1 || {})[i] || {}).urteil).length + falschListe.filter((x, i) => !((r.falsch || {})[i] || {}).wert).length;
  if (n1) offenTeile.push(`Teil 1 (${n1 === 1 ? "ein Punkt" : hmRvZahlwort(n1).toLowerCase() + " Punkte"})`);
  if (!r.wahl) offenTeile.push("Teil 2");
  if (sendung.namen.length >= 2 && !(r.sendung || {}).name && !(r.sendung || {}).keinerPasst) offenTeile.push("Teil 3");
  const pinSpeichern = () => {
    if (!pin.art || !hmRvS(pin.text)) return;
    const neu = { id: "p" + Date.now().toString(36), ort: { ansicht: pin.ansicht, fassung: null, feld: HM_RV_ANSICHT_FELD[pin.ansicht] || "" }, text: hmRvS(pin.text), art: pin.art, team: { grund: null, entscheidung: null, zielschritt: null } };
    sp((alt) => ({ pins: [...(alt.pins || []), neu], entwurfPin: null }));
    setPinRoh({ ansicht: null, text: "", art: null });
  };
  const keinerSpeichern = () => {
    const s = hmRvS(keinerSatz); if (!s) return;
    sp((alt) => ({ sendung: { name: null, keinerPasst: true, satz: s }, entwurfKeiner: "", pins: [...(alt.pins || []).filter((x) => !(x.ort && x.ort.feld === "serieSignatur.namen")), { id: "p" + Date.now().toString(36), ort: { ansicht: "sendung", fassung: null, feld: "serieSignatur.namen" }, text: s, art: "aenderung", team: { grund: "wahl", entscheidung: null, zielschritt: 12 } }] }));
    setKeinerOffen(false); setKeinerSatzRoh("");
  };
  const abschicken = () => {
    const jetzt = new Date();
    const dauer = r.gestartet ? Math.round((jetzt.getTime() - Date.parse(r.gestartet)) / 1000) : null;
    hmRueckmeldungSpeichern(mid, { abgeschickt: jetzt.toISOString(), dauerSek: dauer });
    hmEvent(mid, "rueckmeldung", "Rückmeldung abgeschickt", allein ? m.name : "Makler");
    setBestaetigen(false);
  };

  if (fertig) {
    const ab = hmRvDatum(r.abgeschickt) || new Date();
    const fragenBis = hmRvWerktagPlus(ab, 1);
    const minAend = hmRvWerktagPlus(ab, 2);
    const aendBis = T.freigabe && T.freigabe > minAend ? T.freigabe : minAend;
    return <div className="hm-rv-rm">
      <h1>Danke.</h1>
      <p>Ihre Fragen beantworten wir bis {hmRvTag(fragenBis)}. Änderungen zeigen wir Ihnen bis {hmRvTag(aendBis)} in Ihrer Freigabe.</p>
      <section aria-label="Ihre Antworten">
        <h2>Ihre Antworten</h2>
        {attrs.map((a, i) => { const e = (r.teil1 || {})[i] || {}; return <p key={a.id}>{a.name}: {e.urteil ? HM_RV_URTEIL[e.urteil] : "ohne Antwort"}{e.fassung ? `, ${HM_RV_FASSUNG[e.fassung]}` : ""}{e.stelle ? `, Stelle: ${ansichtName(e.stelle)}` : ""}.</p>; })}
        <p>Gewählte Fassung: {r.wahl ? `${r.wahl === "empfehlung" ? "unsere Empfehlung" : "der Gegenentwurf"}, ${hmRvPolName(hmRvPol(gd, r.wahl))}` : "keine"}.</p>
        {(r.sendung || {}).name && <p>Name Ihrer Sendung: {r.sendung.name}.</p>}
        {(r.pins || []).map((x) => <p key={x.id}>{(HM_RV_PINART.find((y) => y[0] === x.art) || ["", ""])[1]}: {x.text}</p>)}
      </section>
    </div>;
  }

  return <div className="hm-rv-rm" ref={box}>
    <header>
      <h1>Ihre Rückmeldung.</h1>
      <p>Etwa 15 Minuten. Zwei Runden sind enthalten, genutzt: {runden}.</p>
      {T.mit.map((x) => <p key={x.rolle}>Beantworten Sie das gemeinsam mit {x.rolle}.</p>)}
      {T.mit.length > 0 && <div className="hm-rv-wahl" role="group" aria-label="Wer beantwortet mit" style={{ marginTop: 12, gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>{T.mit.map((x) => { const an = (r.teilnehmer || []).includes(x.rolle); return <button key={x.rolle} className="hm-rv-opt" aria-pressed={an} onClick={() => sp((alt) => ({ teilnehmer: an ? (alt.teilnehmer || []).filter((y) => y !== x.rolle) : [...(alt.teilnehmer || []), x.rolle] }))}>{an && <RvIco ok />}Mit {x.rolle} beantwortet</button>; })}</div>}
    </header>

    {/* Nachlese eingeklappt, damit jeder Teil am Telefon kurz bleibt; Teil 2 zeigt beide Fassungen ohnehin groß */}
    {teil !== 2 && <section aria-label="Nachlese" style={{ marginTop: 20 }}>
      <button className="hm-rv-k" aria-expanded={nachleseOffen} aria-controls="hm-rv-nachlese" onClick={() => setNachleseOffen(!nachleseOffen)}>{nachleseOffen ? "Fassungen ausblenden" : "Beide Fassungen ansehen"}</button>
      {nachleseOffen && <div id="hm-rv-nachlese" style={{ marginTop: 16 }}>
        <p className="leise">Beide Fassungen nach Woche 4, in der Reihenfolge des Termins.</p>
        <div className="hm-rv-steuer" role="group" aria-label="Fassung ansehen">{[["empfehlung", "Empfehlung ansehen"], ["gegenentwurf", "Gegenentwurf ansehen"]].map(([v, txt]) => <button key={v} className="hm-rv-k" aria-pressed={nachlese === v} onClick={() => setNachlese(v)}>{txt}</button>)}</div>
        <div className="hm-rv-rahmen-tel" style={{ marginTop: 16 }}><RvProfil umg={umg} variante={nachlese} woche={4} breite={Math.min(390, bw)} /></div>
      </div>}
    </section>}

    {teil === 1 && <section aria-label="Teil 1">
      <h2 tabIndex={-1} ref={kopfRef}>Trifft die Marke Ihren Vertrag?</h2>
      {!attrs.length && <p>Die Punkte aus Ihrem Vertrag zeigen wir Ihnen, sobald er bestätigt ist.</p>}
      {attrs.map((a, i) => { const e = (r.teil1 || {})[i] || {}; return <div key={a.id} className="hm-rv-punkt">
        <h3>{a.name}</h3>
        {a.heisst && <p>{a.heisst}</p>}
        {a.heisstNicht && <p className="leise">Heißt nicht: {a.heisstNicht}</p>}
        <p className="frage">Trifft die Marke das?</p>
        <RvWahl label={`${a.name}: Trifft die Marke das?`} optionen={[["trifft", "Trifft"], ["teilweise", "Trifft teilweise"], ["nicht", "Trifft nicht"]]} wert={e.urteil} set={(v) => t1(i, { urteil: v, stelle: v === "trifft" ? null : e.stelle || null })} />
        {(e.urteil === "teilweise" || e.urteil === "nicht") && <><p className="frage">Zeigen Sie uns die Stelle.</p><RvWahl viele label={`${a.name}: Stelle`} optionen={HM_RV_ANSICHTEN} wert={e.stelle} set={(v) => t1(i, { stelle: v })} /></>}
        {achse.includes(i) && <><p className="frage">Welche Fassung trifft es besser?</p><RvWahl label={`${a.name}: Welche Fassung trifft es besser?`} optionen={[["papier", "Eher Papier"], ["gleich", "Beide gleich"], ["dunkel", "Eher dunkel"]]} wert={e.fassung} set={(v) => t1(i, { fassung: v })} /></>}
      </div>; })}
      {falschListe.length > 0 && <div className="hm-rv-punkt">
        <h3>Was falsch wäre</h3>
        <p className="leise">Kommt etwas davon in Ihrer Marke vor?</p>
        {falschListe.map((x, i) => { const e = (r.falsch || {})[i] || {}; return <div key={i} style={{ marginTop: 16 }}>
          <p className="frage">{x}</p>
          <RvWahl label={x} optionen={[["trifft", "Nein"], ["nicht", "Ja, hier"]]} wert={e.wert} set={(v) => fa(i, { wert: v, stelle: v === "trifft" ? null : e.stelle || null })} />
          {e.wert === "nicht" && <div style={{ marginTop: 8 }}><RvWahl viele label={`${x}: Stelle`} optionen={HM_RV_ANSICHTEN} wert={e.stelle} set={(v) => fa(i, { stelle: v })} /></div>}
        </div>; })}
      </div>}
    </section>}

    {teil === 2 && <section aria-label="Teil 2">
      <h2 tabIndex={-1} ref={kopfRef}>Ihre Wahl.</h2>
      {achse.length > 0 && urteilSatz && <p>{urteilSatz}</p>}
      {/* Papier zuerst, wie auf der geteilten Bühne; der Name folgt aus dem Grundton der Welt */}
      <div className="hm-rv-telefone" style={{ gridTemplateColumns: bw >= 820 ? "1fr 1fr" : "1fr", marginTop: 16 }}>
        {reihe.map((v) => <figure key={v}>
          <figcaption>{hmRvPolName(hmRvPol(gd, v))}</figcaption>
          <div className="hm-rv-rahmen-tel"><RvProfil umg={umg} variante={v} woche={4} breite={telefon} /></div>
          <button className="hm-rv-opt" aria-pressed={r.wahl === v} onClick={() => sp({ wahl: v })}>{r.wahl === v && <RvIco ok />}{r.wahl === v ? "Gewählt" : "Diese Fassung wählen"}</button>
          {v === "empfehlung" ? <><p>Unsere Empfehlung</p>{hmRvText(saetze.empfehlung) && <p className="leise">{saetze.empfehlung}</p>}</> : hmRvText(saetze.gegenentwurf) ? <p className="leise">{saetze.gegenentwurf}</p> : null}
        </figure>)}
      </div>
    </section>}

    {teil === 3 && <section aria-label="Teil 3">
      {sendung.namen.length >= 2 ? <>
        <h2 tabIndex={-1} ref={kopfRef}>Wie soll Ihre Sendung heißen?</h2>
        <RvWahl label="Name Ihrer Sendung" optionen={sendung.namen.map((x) => [x, x])} wert={(r.sendung || {}).name} set={(v) => sp((alt) => ({ sendung: { name: v, keinerPasst: false, satz: "" }, pins: (alt.pins || []).filter((x) => !(x.ort && x.ort.feld === "serieSignatur.namen")) }))} />
        {sendung.empfehlung && <p className="leise" style={{ marginTop: 8 }}>Unsere Empfehlung: {sendung.empfehlung}.</p>}
      </> : <p tabIndex={-1} ref={kopfRef}>Den Namen Ihrer Sendung zeigen wir Ihnen mit der nächsten Runde.{sigName ? ` Bis dahin arbeiten wir mit ${sigName}.` : ""}</p>}
      <div style={{ marginTop: 16 }}>
        {(r.sendung || {}).keinerPasst ? <p className="leise">Keiner passt: {r.sendung.satz}</p> : <button className="hm-rv-klein" aria-expanded={keinerOffen} onClick={() => setKeinerOffen(!keinerOffen)}>Keiner passt.</button>}
        {keinerOffen && <div style={{ marginTop: 8 }}>
          <label htmlFor="hm-rv-keiner" className="frage" style={{ display: "block" }}>Ein Satz dazu</label>
          <textarea id="hm-rv-keiner" className="hm-rv-feld" rows={2} value={keinerSatz} onChange={(e) => setKeinerSatz(e.target.value)} />
          <div className="hm-rv-nav" style={{ marginTop: 8, justifyContent: "flex-start" }}><button className="hm-rv-opt" onClick={keinerSpeichern} disabled={!hmRvS(keinerSatz)}>Speichern</button></div>
        </div>}
      </div>
    </section>}

    {teil === 4 && <section aria-label="Teil 4">
      <h2 tabIndex={-1} ref={kopfRef}>Noch etwas?</h2>
      <p className="frage">Wo?</p>
      <RvWahl viele label="Ansicht der Anmerkung" optionen={HM_RV_ANSICHTEN} wert={pin.ansicht} set={(v) => setPin({ ...pin, ansicht: v })} />
      <label htmlFor="hm-rv-pin" className="frage" style={{ display: "block" }}>Ihre Anmerkung</label>
      <textarea id="hm-rv-pin" className="hm-rv-feld" rows={3} value={pin.text} onChange={(e) => setPin({ ...pin, text: e.target.value })} />
      <p className="frage">Wie ordnen Sie das ein?</p>
      <RvWahl label="Einordnung" optionen={HM_RV_PINART} wert={pin.art} set={(v) => setPin({ ...pin, art: v })} />
      <div className="hm-rv-nav" style={{ marginTop: 12, justifyContent: "flex-start" }}><button className="hm-rv-opt" onClick={pinSpeichern} disabled={!pin.art || !hmRvS(pin.text)}>Anmerkung speichern</button></div>
      {(r.pins || []).filter((x) => x.ort && x.ort.ansicht !== "sendung").length > 0 && <div className="hm-rv-pins">{r.pins.filter((x) => x.ort && x.ort.ansicht !== "sendung").map((x) => <div key={x.id} className="hm-rv-pin">
        <p>{x.text}</p>
        <p className="leise">{(HM_RV_PINART.find((y) => y[0] === x.art) || ["", ""])[1]}{x.ort.ansicht ? `, ${ansichtName(x.ort.ansicht)}` : ""}</p>
        <div><button className="hm-rv-klein" onClick={() => sp((alt) => ({ pins: (alt.pins || []).filter((y) => y.id !== x.id) }))}>Entfernen</button></div>
      </div>)}</div>}
      <section aria-label="Abschicken">
        <h2>Abschicken</h2>
        <p>{offenTeile.length ? `Noch offen: ${offenTeile.join(", ")}. Sie können trotzdem abschicken.` : "Alles beantwortet."}</p>
        {!bestaetigen ? <div className="hm-rv-nav" style={{ justifyContent: "flex-start" }}><Btn onClick={() => setBestaetigen(true)}>Abschicken</Btn></div> : <div style={{ marginTop: 12 }}>
          <p>Nach dem Abschicken können Sie nichts mehr ändern.</p>
          <div className="hm-rv-nav" style={{ justifyContent: "flex-start" }}><Btn onClick={abschicken}>Jetzt abschicken</Btn><Btn ghost onClick={() => setBestaetigen(false)}>Noch nicht</Btn></div>
        </div>}
      </section>
    </section>}

    <div className="hm-rv-nav">
      {teil > 1 ? <button className="hm-rv-opt" onClick={() => setTeil(teil - 1)}>Zurück</button> : <span />}
      <div className="mitte"><span>Teil {teil} von 4</span><span aria-live="polite">{gespeichert ? `Gespeichert um ${gespeichert.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" })}` : ""}</span></div>
      {teil < 4 ? <button className="hm-rv-opt" onClick={() => setTeil(teil + 1)}>Weiter</button> : <span />}
    </div>
  </div>;
}

/* ---------- Stand der Rückmeldung für das Team ---------- */
function RueckmeldungStand({ m }) {
  hmRevealStil();
  const mid = m.id;
  const rmAlle = useHm("rueckmeldung"); const revAlle = useHm("reveal"); useHm("plattformen");
  const rev = (revAlle || {})[mid] || {};
  const rm = (rmAlle || {})[mid] || null;
  const p = window.hmMbPlattform ? hmMbPlattform(mid) : null;
  const attrs = hmRvAttribute(mid, p);
  const falschListe = hmRvFalschListe(mid, p);
  const gd = hmRvWeltDunkel(window.hmMbWelt ? hmMbWelt(mid, p) : null);
  const achse = rev.achseBeruehrt || [];
  const saetze = rev.saetze || {};
  const offenAb = rev.am ? hmRvDatum(hmRvOffenAb(rev.am)) : null;
  const zeit = (iso) => { const d = hmRvDatum(iso); return d ? `${hmRvTag(d)}, ${hmRvUhr(d)}` : "noch nicht"; };
  const team = (id, patch) => hmRueckmeldungSpeichern(mid, (alt) => ({ pins: (alt.pins || []).map((x) => (x.id === id ? { ...x, team: { ...(x.team || {}), ...patch } } : x)) }), { team: true });
  const antwort = (id, text) => hmStore.patch("reveal", (a) => { const x = (a || {})[mid] || {}; return { ...(a || {}), [mid]: { ...x, fragen: (x.fragen || []).map((q) => (q.id === id ? { ...q, antwort: text } : q)) } }; });
  const fragen = rev.fragen || [];
  const ansichtName = (id) => (HM_RV_ANSICHTEN.find((x) => x[0] === id) || [id, id === "sendung" ? "Sendung" : id || "ohne Ansicht"])[1];
  return <div className="hm-rv-stand">
    <div className="raster">
      <div><span>Offen ab</span><b>{offenAb ? `${hmRvTag(offenAb)}, ${hmRvUhr(offenAb)}` : "nach Akt 9"}</b></div>
      <div><span>Begonnen</span><b>{zeit(rm && rm.gestartet)}</b></div>
      <div><span>Abgeschickt</span><b>{zeit(rm && rm.abgeschickt)}</b></div>
      <div><span>Dauer</span><b>{rm && rm.dauerSek != null ? `${hmRvMinSek(rm.dauerSek)} Min.` : "offen"}</b></div>
    </div>
    {!hmRvText(saetze.empfehlung) && <p className="hm-rv-hinweis">Zwei Sätze zur Empfehlung fehlen, der Makler sieht dort nichts.</p>}
    {!hmRvText(saetze.gegenentwurf) && <p className="hm-rv-hinweis">Zwei Sätze zum Gegenentwurf fehlen, der Makler sieht dort nichts.</p>}
    {rm && hmRvWahlGegenUrteil(rm, achse, gd) &&<p className="hm-rv-hinweis">Wahl gegen Urteil: prüfen, ob ein Kriterium fehlt.</p>}
    {rm && hmRvZuSchnell(rm) && <p className="hm-rv-hinweis">Unter 90 Sekunden und überall trifft: kurz anrufen und fragen, ob alles gesehen wurde.</p>}
    {rm && <div>
      <h3>Urteil je Attribut</h3>
      <ul className="hm-rv-liste">{attrs.map((a, i) => { const e = (rm.teil1 || {})[i] || {}; return <li key={a.id}><span>{a.name}: {e.urteil ? HM_RV_URTEIL[e.urteil] : "ohne Antwort"}{achse.includes(i) ? `, Fassung: ${e.fassung ? HM_RV_FASSUNG[e.fassung] : "ohne Antwort"}` : ""}{e.stelle ? `, Stelle: ${ansichtName(e.stelle)}` : ""}.</span></li>; })}
        {falschListe.map((x, i) => { const e = (rm.falsch || {})[i] || {}; return <li key={"f" + i}><span>Was falsch wäre, {x}: {e.wert === "trifft" ? "Nein" : e.wert === "nicht" ? `Ja, hier${e.stelle ? " (" + ansichtName(e.stelle) + ")" : ""}` : "ohne Antwort"}.</span></li>; })}
      </ul>
      <p style={{ marginTop: 8 }}>Wahl: {rm.wahl ? `${hmRvFassungName(rm.wahl)} (${hmRvPolName(hmRvPol(gd, rm.wahl))})` : "noch keine"}. Sendung: {(rm.sendung || {}).name || ((rm.sendung || {}).keinerPasst ? `keiner passt, „${rm.sendung.satz}“` : "noch keine Wahl")}.</p>
    </div>}
    {rm && HM_RV_PINART.slice().reverse().map(([art, name]) => { const l = (rm.pins || []).filter((x) => x.art === art); if (!l.length) return null; return <div key={art}>
      <h3>{name}</h3>
      {l.map((x) => { const z = hmRvZielschritt(x.ort && x.ort.feld); const tm = x.team || {}; return <div key={x.id} className="hm-rv-pin">
        <p>{x.text}</p>
        <p className="hm-rv-gespeichert">{ansichtName(x.ort && x.ort.ansicht)}. {z ? `Vorschlag: Schritt ${z.schritt}, ${z.spielraum}.` : "Kein Feld, das Team ordnet zu."}</p>
        {art === "aenderung" && <>
          <RvWahl label="Grund" optionen={HM_RV_GRUENDE} wert={tm.grund} set={(v) => team(x.id, { grund: v, zielschritt: z ? z.schritt : tm.zielschritt || null })} />
          <RvWahl label="Entscheidung" optionen={HM_RV_ENTSCHEIDUNG} wert={tm.entscheidung} set={(v) => team(x.id, { entscheidung: v })} />
          <p className="hm-rv-gespeichert">{hmRvZaehltRunde(tm) ? "Zählt als Runde." : "Zählt nicht als Runde."}</p>
        </>}
        {art === "frage" && <textarea className="hm-rv-feld" rows={2} aria-label="Antwort" value={tm.antwort || ""} onChange={(e) => team(x.id, { antwort: e.target.value })} />}
      </div>; })}
    </div>; })}
    <div>
      <h3>Fragen aus dem Termin</h3>
      {fragen.length ? fragen.map((q) => <div key={q.id} className="hm-rv-pin"><p>{q.text}</p><textarea className="hm-rv-feld" rows={2} aria-label="Antwort" value={q.antwort || ""} onChange={(e) => antwort(q.id, e.target.value)} /></div>) : <p>Keine Fragen notiert.</p>}
    </div>
  </div>;
}

/* ---------- Selbsttest ohne DOM und ohne Schreiben in hmStore ---------- */
function hmRvTexte(d) {
  const out = [];
  const lauf = (x, k) => { if (x == null || k === "spec" || k === "portrait" || k === "url" || k === "daten") return; if (typeof x === "string") out.push(x); else if (Array.isArray(x)) x.forEach((y) => lauf(y)); else if (typeof x === "object") Object.keys(x).forEach((kk) => lauf(x[kk], kk)); };
  d.folien.forEach((f) => { lauf(f.titel); lauf(f.notiz); lauf(f.daten); if (f.begruendung) lauf(f.begruendung.satz); });
  d.hinweise.forEach((h) => lauf(h.text));
  return out;
}
function hmSelbsttestReveal() {
  const out = []; const t = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: e.message }); } };
  const frei6 = ["Ich rate lieber zum Warten ab.", "Ein Verkauf braucht zuerst einen Grund.", "Ich sage auch Nein zu Aufträgen."];
  const probe = { reveal: { zitateFreigabe: Object.fromEntries(frei6.map((s) => [s, "2026-09-11"])) }, zitate: frei6.map((s) => ({ satz: s, herkunft: "Ihr Workshop am 11. September." })), strom: null, schrift: { status: "bereit" } };
  const d = hmRevealFolien("markus", probe);
  const F = d.folien;
  t("Akte aufsteigend von 0 bis 9", () => ({ ok: F.length > 0 && F[0].akt === 0 && F[F.length - 1].akt === 9 && F.every((f, i) => i === 0 || f.akt >= F[i - 1].akt), detail: F.map((f) => f.unter).join(" ") }));
  t("Zeichen zuletzt vor Akt 8, nach Schrift, Farbe und Wortmarke", () => {
    const vor8 = F.filter((f) => f.akt < 8); const letzte = vor8[vor8.length - 1];
    const iz = F.findIndex((f) => f.art === "zeichen");
    const ok = !!letzte && letzte.art === "zeichen" && ["schrift", "farbe", "wortmarke"].every((a) => { const i = F.findIndex((f) => f.art === a); return i >= 0 && i < iz; });
    return { ok, detail: letzte ? letzte.unter : "keine Folie" };
  });
  t("Alle Gegenentwurf-Folien nach allen Empfehlungs-Folien", () => {
    const e = F.map((f, i) => (f.fassung === "empfehlung" ? i : -1)).filter((i) => i >= 0), g = F.map((f, i) => (f.fassung === "gegenentwurf" ? i : -1)).filter((i) => i >= 0);
    return { ok: e.length > 0 && g.length > 0 && Math.max(...e) < Math.min(...g), detail: `${e.length} Empfehlung, ${g.length} Gegenentwurf` };
  });
  t("Akt 9 neutral, ohne Logo und ohne Fassung", () => { const f = F[F.length - 1]; return { ok: f.akt === 9 && f.fassung === "neutral" && f.art === "abschluss" && !/logo/i.test(JSON.stringify(f.daten)), detail: f.daten.satz }; });
  t("Satzregel lehnt den Dass-Satz ab", () => { const r = hmRvSatzRegel("Dass sie sich nie gedrängt gefühlt haben."); return { ok: !r.ok, detail: r.grund }; });
  t("Satzregel lehnt fünf Wörter ab", () => { const r = hmRvSatzRegel("Ich rate lieber zum Warten."); return { ok: !r.ok, detail: r.grund }; });
  t("Satzregel nimmt einen freigegebenen ganzen Satz mit sechs Wörtern", () => ({ ok: hmRvWoerter(frei6[0]).length === 6 && hmRvSatzRegel(frei6[0]).ok && F.filter((f) => f.akt === 1).length === 3, detail: frei6[0] }));
  t("Satzregel lehnt reine Ortsangabe ab", () => { const r = hmRvSatzRegel("Sievering, zwischen Sieveringer Straße und Agnesgasse."); return { ok: !r.ok, detail: r.grund }; });
  t("Ohne Freigaben entfällt Akt 1 mit Hinweis", () => { const x = hmRevealFolien("markus", { reveal: { zitateFreigabe: {} }, zitate: probe.zitate, strom: null }); return { ok: !x.folien.some((f) => f.akt === 1) && x.hinweise.some((h) => h.akt === 1 && /Akt 1 entfällt/.test(h.text)) }; });
  t("Markus: Akt 1 entfällt zu Recht", () => { const s = "Dass sie sich nie gedrängt gefühlt haben."; const x = hmRevealFolien("markus", { reveal: { zitateFreigabe: { [s]: "2026-09-11" } }, strom: null }); return { ok: !x.folien.some((f) => f.akt === 1), detail: `${hmRvZitatKandidaten("markus", null).length} Kandidaten` }; });
  t("Kein gesperrter Satz, kein Ausrufezeichen, kein Gedankenstrich", () => { const schlecht = hmRvTexte(d).filter((s) => /Gefällt|Wie finden Sie|!|\u2013|\u2014/.test(s)); return { ok: !schlecht.length, detail: schlecht.slice(0, 2).join(" | ") }; });
  t("Begründungsregel", () => {
    const lang = "Wir zeigen hier sehr viele Dinge auf einmal, damit Sie sehen, wie alles zusammen wirkt und warum es genau so bleibt.";
    return { ok: !hmRvBegrRegel(lang).ok && !hmRvBegrRegel("Aus Ihrem Vertrag folgt die Ruhe.").ok && !hmRvBegrRegel("Die Ziffern tragen die Idee.", "Die Farbe bleibt ruhig.").ok && hmRvBegrRegel("Amber erscheint nur dort, wo eine Dauer steht.", "Die Ziffern tragen die Idee.").ok };
  });
  t("Minuten je Akt nach 15_reveal", () => { const akte = [...new Set(F.map((f) => f.akt))]; const ok = akte.every((a) => Math.abs(F.filter((f) => f.akt === a).reduce((s, f) => s + f.minuten, 0) - HM_RV_MINUTEN[a]) <= 0.5); return { ok, detail: akte.map((a) => `${a}:${HM_RV_MINUTEN[a]}`).join(" ") }; });
  t("Rückmeldung startet ohne jede Vorauswahl", () => { const r = hmRvRueckmeldungLeer(null); return { ok: !Object.keys(r.teil1).length && !Object.keys(r.falsch).length && r.wahl === null && r.sendung.name === null && !r.sendung.keinerPasst && !r.pins.length && !r.abgeschickt }; });
  t("offenAb genau 24 Stunden nach am", () => { const am = "2026-11-05T10:57:00.000Z"; return { ok: Date.parse(hmRvOffenAb(am)) - Date.parse(am) === 864e5, detail: hmRvOffenAb(am) }; });
  t("Nachricht mit typ, wert, von und zeit", () => { const x = hmRevealNachricht("folie", 3, "w1"); return { ok: x.typ === "folie" && x.wert === 3 && x.von === "w1" && typeof x.zeit === "number" && Object.keys(x).length === 4 }; });
  t("Zielschritt nach Feld", () => ({ ok: hmRvZielschritt("system.farbe.akzent").schritt === 10 && hmRvZielschritt("feed.kacheln[3].caption").schritt === 13 && hmRvZielschritt("serieSignatur.namen").schritt === 12 && hmRvZielschritt("beweise[1]").schritt === 7 && hmRvZielschritt("") === null }));
  t("Runde zählt nur bei Außerhalb und Umsetzen", () => ({ ok: hmRvZaehltRunde({ grund: "ausserhalb", entscheidung: "umsetzen" }) && !hmRvZaehltRunde({ grund: "spielraum", entscheidung: "umsetzen" }) && !hmRvZaehltRunde({ grund: "ausserhalb", entscheidung: "nicht" }) }));
  t("Wahl gegen Urteil und zu schnelles Durchklicken", () => {
    const rm = { wahl: "empfehlung", teil1: { 0: { urteil: "trifft", fassung: "dunkel" }, 1: { urteil: "trifft", fassung: "dunkel" } }, falsch: { 0: { wert: "trifft" } }, abgeschickt: "2026-11-06T11:10:00Z", dauerSek: 70 };
    /* In einer dunklen Welt ist die Empfehlung der dunkle Pol: dieselbe Antwort ist dort keine Wahl gegen das Urteil */
    return { ok: hmRvWahlGegenUrteil(rm, [0, 1], false) && !hmRvWahlGegenUrteil({ ...rm, wahl: "gegenentwurf" }, [0, 1], false) && !hmRvWahlGegenUrteil(rm, [0, 1], true) && hmRvWahlGegenUrteil({ ...rm, wahl: "gegenentwurf" }, [0, 1], true) && hmRvZuSchnell(rm) && !hmRvZuSchnell({ ...rm, dauerSek: 300 }) };
  });
  t("Pole nach Grundton: Papier links, in dunkler Welt ist der Gegenentwurf Papier", () => {
    const hell = { farben: { grund: "#F5F1EA", text: "#191714" } }, dunkel = { farben: { grund: "#131211", text: "#EEEAE3" } };
    const ok = !hmRvWeltDunkel(hell) && hmRvWeltDunkel(dunkel) && hmRvPol(false, "empfehlung") === "papier" && hmRvPol(true, "empfehlung") === "dunkel" && hmRvPol(true, "gegenentwurf") === "papier"
      && hmRvReihe(false)[0] === "empfehlung" && hmRvReihe(true)[0] === "gegenentwurf";
    const g = hmRvGrund({ grundDunkel: true, F: { grund: "#131211", text: "#EEEAE3", hell: "#EEEAE3", dunkel: "#131211" } }, "gegenentwurf");
    const x = hmRevealFolien("markus", { ...probe, grundDunkel: true, feedProfil: true });
    const f6 = x.folien.find((f) => f.unter === "6f");
    return { ok: ok && g.bg === "#EEEAE3" && !g.dunkel && (!f6 || /Links Papier \(Gegenentwurf\)/.test(f6.notiz)), detail: f6 ? f6.notiz : "6f fehlt" };
  });
  t("Beitrag: Entwurf, Bildlücke und Selbstauskunft sind gekennzeichnet", () => {
    const post = { captionTeile: { hook: "Zinshaus, elf Wochen.", einloesung: "Zeitachse in sechs Kacheln.", beleg: "", weitergeben: "[x]" }, captionLuecken: ["weitergeben"], captionEntwurf: ["einloesung"], luecke: { art: "bild", satz: "Das Bild zu diesem Beitrag entsteht am Porträt-Termin." }, beleg: { status: "selbstauskunft" }, format: "post" };
    const teile = hmRvCaptionTeile(post, "Sie"); const k = hmRvBeitragKennz(post);
    return { ok: teile.some((t) => t.art === "entwurf") && teile.some((t) => t.art === "luecke") && k.includes("Das Bild zu diesem Beitrag entsteht am Porträt-Termin.") && k.includes("Diese Zahl prüfen wir vor dem Live-Tag mit Ihren Unterlagen."), detail: teile.map((t) => t.art).join(",") };
  });
  t("Sendungsname aus feed.signatur.serie", () => ({ ok: hmRvSignaturName("markus", null, { signatur: { id: "s", name: "Säule", serie: "Rat vor Auftrag" }, posts: [] }) === "Rat vor Auftrag" && hmRvSignaturName("markus", null, { signatur: { id: "s", name: "Säule", serie: null }, posts: [] }) === "Säule" }));
  t("Stufe A höchstens drei Zeilen, erster Satz allein auf der Fläche", () => {
    const lang = "Dieser Satz ist mit Absicht so lang geschrieben, dass er auf der Bühne mehr als drei Zeilen belegen würde.";
    const s = hmRvErsterSatz("Erster Satz steht hier. Zweiter Satz folgt danach.");
    return { ok: hmRvStufe(lang) === "b" && hmRvStufe("Heute zeigen wir. Morgen entscheiden Sie.") === "a" && s.erster === "Erster Satz steht hier." && s.rest === "Zweiter Satz folgt danach.", detail: String(lang.length) };
  });
  t("Hinweis ohne doppeltes Akt", () => ({ ok: hmRvHinweisText({ akt: 1, text: "Akt 1 entfällt: weniger als drei freigegebene Sätze." }) === "Akt 1 entfällt: weniger als drei freigegebene Sätze." && hmRvHinweisText({ akt: 4, text: "4d entfällt: keine Belege." }) === "Akt 4: 4d entfällt: keine Belege." }));
  t("Bereitschaft vollständig", () => ({ ok: ["Gate 2", "Porträt", "Feed-Prüfung", "Drei Sätze für Akt 1", "Strom-Pool", "Schriften"].every((n) => d.bereit.some((x) => x.name === n)), detail: d.bereit.filter((x) => !x.ok).map((x) => x.name).join(", ") || "alles bereit" }));
  return out;
}

Object.assign(window, { hmRevealFolien, RevealBuehne, RevealKnopf, Rueckmeldung, RueckmeldungStand, hmRevealStand, hmRueckmeldungSpeichern, hmRevealNachricht, hmSelbsttestReveal, hmRevealStil, HM_RV_SPERRLISTE });
