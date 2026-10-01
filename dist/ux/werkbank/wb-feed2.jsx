/* Werkbank. Feed im Profilkopf (Auftrag A der Chef-Briefs, 30.09.2026).
   Der Makler sieht sein Instagram-Profil nach Woche 1 bis 4: Profilkopf, die Startwoche angepinnt in der Anzeige [3, 2, 1],
   darunter der Strom mit dem neuesten Beitrag links oben, jede Kachel mit Caption. Grundlage: 13_feed 3.3 bis 3.14,
   FEED_FINAL 5 und 6, docs/werkbank/erlebnis/CHEF_BRIEFS.md Kapitel 1.
   Quelle der Inhalte in fester Reihenfolge: marke2[mid].feed.kacheln (zwölf Einträge, unverändert), sonst Regelpfad aus
   hmMbPlattform(mid). Nie HM_WELT_HOOKS, nie hmWeltFeedPosts, nie die Vorgaben aus hmWeltPostDaten: die Daten für WeltPost
   baut dieses Modul selbst. Liest plattformen, marke2, branding, portraits, auftrag. Schreibt nichts in hmStore.
   Darstellung (Stand 01.10.2026): das Profil steht in einem Geräterahmen mit Statusleiste und neutralem Instagram-Chrome
   (Kontoname, Zahlen, Bio, Highlights, Reiter, Raster 3:4 mit 2 px Lücke). Kacheln wechseln die Form (hmFd2Form): Porträt nah und
   halbnah zeichnet hmFd2Zeichnen selbst mit den Farben und Schriften der Welt, weit bleibt die Hook-Kachel der Welt, Zahl mit großer
   Ziffer, Text in Papier oder Nacht, Objekt als Bild oder ruhige Fläche. Der Beitrag öffnet als Post im Gerät, Team-Hinweise darunter. */

/* ---------- CSS, einmalig ---------- */
function hmFeed2Stil() {
  if (typeof document === "undefined" || document.getElementById("stil-feed2")) return;
  const s = document.createElement("style");
  s.id = "stil-feed2";
  s.textContent = `
.hm-fd2-vergleich, .hm-fd2-geraet, .hm-fd2-beitrag, .hm-fd2-abschnitt { --fd2-leise: rgba(27, 26, 22, .74); }
.hm-fd2-abschnitt { display: block; min-width: 0; }
.hm-fd2-absatz { font-size: 16px; line-height: 24px; max-width: 60ch; margin: 8px 0 20px; color: var(--ink); }
.hm-fd2-vergleich { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
.hm-fd2-modus, .hm-fd2-wochen { display: grid; gap: 6px; align-self: flex-start; max-width: 100%; }
.hm-fd2-modus { grid-template-columns: repeat(3, auto); }
.hm-fd2-wochen { grid-template-columns: repeat(4, minmax(0, 1fr)); width: 100%; max-width: 560px; }
.hm-fd2-modus button, .hm-fd2-wochen button { appearance: none; border: 1px solid var(--hairline-dark); border-radius: 12px; background: var(--surface-raised); color: var(--ink); font: inherit; font-size: 14px; line-height: 20px; padding: 8px 14px; cursor: pointer; text-align: left; min-width: 0; }
.hm-fd2-modus button.on, .hm-fd2-wochen button.on { box-shadow: inset 0 0 0 2px var(--ink); border-color: var(--ink); }
.hm-fd2-wochen button { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; padding: 8px 12px; }
.hm-fd2-wochen .d { font-size: 12px; line-height: 16px; color: var(--fd2-leise); font-variant-numeric: tabular-nums; white-space: nowrap; }
.hm-fd2-wochensatz { margin: -6px 0 0; font-size: 15px; line-height: 22px; color: var(--ink); max-width: 60ch; }
.hm-fd2-achse { margin: 0; font-size: 15px; line-height: 22px; max-width: 60ch; color: var(--ink); }
.hm-fd2-hinweis { margin: 0; font-size: 14px; line-height: 20px; color: var(--ink); border-left: 2px solid var(--ink); padding-left: 10px; max-width: 60ch; }
.hm-fd2-profile { display: flex; flex-direction: column; align-items: center; gap: 28px; min-width: 0; }
.hm-fd2-profile.neben { flex-direction: row; justify-content: center; align-items: flex-start; gap: 28px; }
.hm-fd2-rahmen { margin: 0; display: flex; flex-direction: column; gap: 10px; width: 100%; min-width: 0; }
.hm-fd2-rahmen figcaption { font-size: 14px; line-height: 20px; color: var(--ink); text-align: center; }

/* Gerät: Rahmen 10 px, Ecken 44 px, Bildschirm neutral wie die App selbst */
.hm-fd2-geraet { width: 100%; margin: 0 auto; min-width: 0; display: flex; flex-direction: column; gap: 14px; }
.hm-fd2-phone { background: #15140F; border-radius: 44px; padding: 10px; box-shadow: 0 24px 60px -30px rgba(12, 11, 9, .55), inset 0 0 0 1px rgba(255, 255, 255, .06); }
.hm-fd2-phone .hm-fd2-screen { border-radius: 34px; }
.hm-fd2-screen { --ig-ink: #141414; --ig-leise: #737373; --ig-linie: #E6E6E6; --ig-grund: #FFFFFF; background: var(--ig-grund); color: var(--ig-ink); overflow: hidden; position: relative; min-width: 0; font-family: -apple-system, "SF Pro Text", "Helvetica Neue", ui-sans-serif, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
.hm-fd2-status { height: 44px; display: flex; align-items: center; justify-content: space-between; padding: 6px 22px 0; font-size: 15px; font-weight: 600; letter-spacing: -.01em; font-variant-numeric: tabular-nums; position: relative; }
.hm-fd2-status .insel { position: absolute; left: 50%; top: 8px; width: 96px; height: 26px; margin-left: -48px; border-radius: 13px; background: #15140F; }
.hm-fd2-status .rechts { display: flex; align-items: center; gap: 6px; }
.hm-fd2-status svg { display: block; }
.hm-fd2-nav { height: 44px; display: grid; grid-template-columns: 44px minmax(0, 1fr) 44px; align-items: center; padding: 0 8px; }
.hm-fd2-nav .mitte { text-align: center; font-size: 16px; line-height: 20px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hm-fd2-nav .mitte.leise, .hm-fd2-leise { color: var(--ig-leise); font-weight: 400; }
.hm-fd2-nav .ico { display: grid; place-items: center; width: 44px; height: 44px; color: var(--ig-ink); }
.hm-fd2-kopf { padding: 4px 16px 0; }
.hm-fd2-oben { display: grid; grid-template-columns: 90px minmax(0, 1fr); align-items: center; gap: 12px; }
.hm-fd2-bild { width: 90px; height: 90px; border-radius: 50%; padding: 4px; box-sizing: border-box; position: relative; }
.hm-fd2-bild.ring { background: conic-gradient(var(--fd2-akzent, #33503F) 0 100%); }
.hm-fd2-bild .innen { width: 100%; height: 100%; border-radius: 50%; overflow: hidden; background: #F0EEE9; box-shadow: 0 0 0 3px var(--ig-grund); display: grid; place-items: center; text-align: center; font-size: 11px; line-height: 13px; color: var(--ig-leise); padding: 0; }
.hm-fd2-bild .innen.luecke { padding: 8px; }
.hm-fd2-bild img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 14%; display: block; }
.hm-fd2-zahlen { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); text-align: center; gap: 4px; }
.hm-fd2-zahlen .n { font-size: 16px; line-height: 20px; font-weight: 700; font-variant-numeric: tabular-nums; }
.hm-fd2-zahlen .n.leise { color: var(--ig-leise); font-weight: 400; font-size: 14px; }
.hm-fd2-zahlen .l { font-size: 13px; line-height: 18px; color: var(--ig-ink); }
.hm-fd2-wer { margin-top: 12px; min-width: 0; }
.hm-fd2-name { font-size: 14px; line-height: 18px; font-weight: 600; overflow-wrap: anywhere; }
.hm-fd2-zeile { font-size: 14px; line-height: 18px; color: var(--ig-leise); }
.hm-fd2-bio { font-size: 14px; line-height: 18px; margin-top: 2px; overflow-wrap: anywhere; }
.hm-fd2-tasten { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 14px; }
.hm-fd2-tasten span { display: block; text-align: center; font-size: 14px; line-height: 32px; font-weight: 600; border-radius: 8px; background: #EFEFEF; color: var(--ig-ink); }
.hm-fd2-tasten span.voll { background: var(--ig-ink); color: #FFFFFF; }
.hm-fd2-hls { display: flex; gap: 14px; margin-top: 18px; padding: 0 16px; overflow: hidden; }
.hm-fd2-hl { appearance: none; border: 0; background: none; padding: 0; margin: 0; font: inherit; color: var(--ig-ink); display: flex; flex-direction: column; align-items: center; gap: 6px; width: 68px; flex: none; cursor: pointer; }
.hm-fd2-hl:disabled { cursor: default; }
.hm-fd2-hl-kreis { display: block; width: 64px; height: 64px; border-radius: 50%; overflow: hidden; position: relative; background: #F0EEE9; box-shadow: inset 0 0 0 1px var(--ig-linie); }
.hm-fd2-hl-kreis::after { content: ""; position: absolute; inset: 0; border-radius: 50%; box-shadow: inset 0 0 0 3px var(--ig-grund), inset 0 0 0 4px var(--ig-linie); pointer-events: none; }
.hm-fd2-hl-bild { position: absolute; left: 0; top: 0; }
.hm-fd2-hl-bild svg { display: block; }
.hm-fd2-hl-name { font-size: 12px; line-height: 16px; max-width: 68px; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hm-fd2-reiter { display: grid; grid-template-columns: 1fr 1fr; margin-top: 16px; border-top: 1px solid var(--ig-linie); }
.hm-fd2-reiter span { display: grid; place-items: center; height: 44px; color: var(--ig-leise); position: relative; }
.hm-fd2-reiter span.on { color: var(--ig-ink); }
.hm-fd2-reiter span.on::after { content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 1px; background: var(--ig-ink); }
.hm-fd2-raster { display: flex; flex-direction: column; }
.hm-fd2-reihe { display: grid; grid-template-columns: repeat(3, auto); justify-content: space-between; }
.hm-fd2-reihe.neu { animation: hmFd2Ein 240ms ease-out both; }
@keyframes hmFd2Ein { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .hm-fd2-reihe.neu { animation: none; } }
.hm-fd2-kachel { appearance: none; border: 0; padding: 0; margin: 0; display: block; position: relative; overflow: hidden; background: #F0EEE9; cursor: pointer; }
.hm-fd2-kachel svg { display: block; }
.hm-fd2-pin { position: absolute; top: 6px; right: 6px; width: 16px; height: 16px; color: #FFFFFF; filter: drop-shadow(0 1px 2px rgba(0, 0, 0, .55)); display: grid; place-items: center; pointer-events: none; }
.hm-fd2-pin.hell { color: #141414; filter: none; }
.hm-fd2-kachel:focus-visible { outline: 2px solid var(--ig-ink); outline-offset: -2px; box-shadow: inset 0 0 0 4px #FFFFFF; }
.hm-fd2-hl:focus-visible, .hm-fd2-modus button:focus-visible, .hm-fd2-wochen button:focus-visible, .hm-fd2-blaettern button:focus-visible, .hm-fd2-mehr:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; position: relative; z-index: 1; }
.hm-fd2-heim { height: 24px; display: grid; place-items: center; }
.hm-fd2-heim span { width: 120px; height: 5px; border-radius: 3px; background: var(--ig-ink); opacity: .9; }

/* Beitrag: Post im Gerät, Hinweise daneben oder darunter */
.hm-fd2-beitrag { display: grid; grid-template-columns: minmax(0, 390px) minmax(0, 1fr); gap: 28px; align-items: start; }
.hm-fd2-post { padding-bottom: 6px; }
.hm-fd2-postkopf { display: flex; align-items: center; gap: 10px; padding: 8px 12px; }
.hm-fd2-postkopf .avatar { width: 32px; height: 32px; border-radius: 50%; overflow: hidden; background: #F0EEE9; flex: none; box-shadow: 0 0 0 1px var(--ig-linie); }
.hm-fd2-postkopf .avatar img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 14%; display: block; }
.hm-fd2-postkopf .k { font-size: 14px; line-height: 18px; font-weight: 600; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
.hm-fd2-postkopf .ico { color: var(--ig-ink); display: grid; place-items: center; width: 24px; height: 24px; }
.hm-fd2-medium { position: relative; background: #F0EEE9; }
.hm-fd2-medium svg { display: block; max-width: 100%; height: auto; }
.hm-fd2-punkte { display: flex; justify-content: center; gap: 4px; padding: 10px 0 0; }
.hm-fd2-punkte i { width: 6px; height: 6px; border-radius: 50%; background: var(--ig-linie); display: block; }
.hm-fd2-punkte i.on { background: #3897F0; }
.hm-fd2-aktionen { display: flex; align-items: center; gap: 14px; padding: 10px 12px 6px; color: var(--ig-ink); }
.hm-fd2-aktionen .r { margin-left: auto; }
.hm-fd2-aktionen svg { display: block; }
.hm-fd2-captiontext { padding: 0 12px; font-size: 14px; line-height: 18px; color: var(--ig-ink); }
.hm-fd2-captiontext .k { font-weight: 600; margin-right: 5px; }
.hm-fd2-captiontext p { margin: 0 0 8px; white-space: pre-line; overflow-wrap: anywhere; }
.hm-fd2-captiontext p:last-child { margin-bottom: 0; }
.hm-fd2-captiontext .luecke { color: var(--ig-leise); }
.hm-fd2-mehr { appearance: none; border: 0; background: none; padding: 0; margin: 2px 0 0; font: inherit; font-size: 14px; line-height: 18px; color: var(--ig-leise); cursor: pointer; }
.hm-fd2-datum { padding: 8px 12px 10px; font-size: 11px; line-height: 14px; color: var(--ig-leise); text-transform: uppercase; letter-spacing: .02em; }
.hm-fd2-blaettern { display: flex; align-items: center; gap: 12px; margin-top: 12px; font-size: 14px; line-height: 20px; color: var(--ink); font-variant-numeric: tabular-nums; }
.hm-fd2-blaettern button { width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--hairline-dark); background: var(--surface-raised); color: var(--ink); display: grid; place-items: center; cursor: pointer; padding: 0; }
.hm-fd2-blaettern button:disabled { opacity: .45; cursor: default; }
.hm-fd2-text { min-width: 0; }
.hm-fd2-satz, .hm-fd2-lese { font-size: 16px; line-height: 1.5; margin: 12px 0 0; color: var(--ink); max-width: 60ch; }
.hm-fd2-text > .hm-fd2-lese:first-child, .hm-fd2-text > .hm-fd2-satz:first-child { margin-top: 0; }
.hm-fd2-notiz { max-width: 60ch; }
.hm-fd2-notiz p { padding-left: 12px; border-left: 2px solid var(--hairline-dark); }
.hm-fd2-team { margin-top: 22px; padding-top: 16px; border-top: 1px solid var(--hairline-dark); font-size: 14px; line-height: 20px; color: var(--ink); }
.hm-fd2-team h4 { font-size: 14px; line-height: 20px; font-weight: 600; margin: 16px 0 6px; }
.hm-fd2-team h4:first-child { margin-top: 0; }
.hm-fd2-team ul, .hm-fd2-pruef ul { list-style: none; margin: 0; padding: 0; display: grid; }
.hm-fd2-team li { display: grid; grid-template-columns: minmax(0, 150px) minmax(0, 1fr); gap: 10px; padding: 6px 0; border-top: 1px solid var(--hairline-dark); }
.hm-fd2-team li:first-child { border-top: 0; }
.hm-fd2-team code, .hm-fd2-pruef code { font-size: 12px; line-height: 18px; overflow-wrap: anywhere; }
.hm-fd2-pruef { margin-top: 36px; display: grid; gap: 28px; font-size: 14px; line-height: 20px; color: var(--ink); }
.hm-fd2-pruef h4 { font-size: 16px; line-height: 22px; font-weight: 600; margin: 0 0 4px; }
.hm-fd2-pruef .zeile { display: grid; grid-template-columns: 18px minmax(0, 260px) minmax(0, 1fr); gap: 10px; align-items: start; padding: 8px 0; border-top: 1px solid var(--hairline-dark); }
.hm-fd2-pruef .luecke { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 90px) minmax(0, 240px); gap: 10px; padding: 8px 0; border-top: 1px solid var(--hairline-dark); }
.hm-fd2-pruef .zeichen { padding-top: 2px; color: var(--ink); }
@media (max-width: 760px) { .hm-fd2-beitrag { grid-template-columns: minmax(0, 1fr); gap: 18px; } }
@media (max-width: 560px) {
  .hm-overlay:has(.hm-fd2-beitrag) { padding: 0; }
  .hm-sheet:has(.hm-fd2-beitrag) { width: 100%; min-height: 100%; border-radius: 0; }
  .hm-sheet:has(.hm-fd2-beitrag) .hm-sheet-body { padding-left: 0; padding-right: 0; }
  .hm-fd2-beitrag .hm-fd2-text { padding: 0 16px; }
  .hm-fd2-team li, .hm-fd2-pruef .zeile, .hm-fd2-pruef .luecke { grid-template-columns: minmax(0, 1fr); gap: 2px; }
  .hm-fd2-pruef .zeichen { display: none; }
}
@media (max-width: 460px) {
  .hm-fd2-modus { grid-template-columns: repeat(3, minmax(0, 1fr)); width: 100%; }
  .hm-fd2-modus button { padding: 8px 6px; font-size: 13px; line-height: 18px; text-align: center; }
  .hm-fd2-wochen button { padding: 8px 8px; }
  .hm-fd2-wochen .d { font-size: 11px; }
}
`;
  document.head.appendChild(s);
}

/* ---------- Takt und feste Sätze ---------- */
const HM_FEED2_TAKT = {
  plaetze: [
    { platz: 1, rolle: "Signatur", gesicht: true },
    { platz: 2, rolle: "Nutzen mit Gesicht", gesicht: true },
    { platz: 3, rolle: "Sache ohne Gesicht", gesicht: false },
  ],
  gesichtFormate: ["talking", "qa", "spaziergang", "behind"],
  karussellFormate: ["carousel", "walkthrough"],
  signaturNr: [2, 4, 7, 10],
  gesichtNr: [5, 8, 11],
  sacheNr: [3, 6, 9],
  gegenton: [6, 12],
  flaeche: [6],
  objektNr: 12,
  angepinnt: [3, 2, 1],
  tage: [1, 3, 5],
};
const HM_FD2_LUECKE = {
  hook: "[Erster Satz nach der Hook-Formel der Serie, schreibt das Team]",
  einloesung: "[Einlösung in zwei bis vier Sätzen, schreibt das Team]",
  weitergeben: "[Satz zum Weitergeben an eine benannte Person]",
};
const HM_FD2_AUFTRAG = {
  hook: "Ersten Satz nach der Hook-Formel der Serie schreiben, höchstens 90 Zeichen.",
  einloesung: "Einlösung in zwei bis vier kurzen Sätzen nach stimme.verbindlich schreiben.",
  beleg: "Beleg wörtlich aus plattform.beweise übernehmen.",
  weitergeben: "Satz zum Weitergeben an eine benannte Person oder Rolle schreiben, kein Satz doppelt im Takt.",
};
const HM_FD2_MAKLER_LUECKE = "Diesen Teil schreiben wir mit Ihnen vor dem Live-Tag.";
/* Achsensatz: HELL ist der vom Chef vorgegebene Wortlaut. In einer Welt mit dunklem Grund (Kontrast) kehrt sich der Grundton
   um, der Gegenentwurf steht dort auf hellem Grund; der Satz sagt dann die Wahrheit statt des festen Wortlauts. pole bleibt
   ["papier", "dunkel"], weil die Achse dieselbe ist, nur von der anderen Seite. Mit dem Chef abzustimmen. */
const HM_FD2_ACHSE_HELL = "Dieselben zwölf Beiträge auf dunklem Grund: nur der Grundton wechselt, damit Sie allein die Wirkung der Form vergleichen.";
const HM_FD2_ACHSE_DUNKEL = "Dieselben zwölf Beiträge auf hellem Grund: nur der Grundton wechselt, damit Sie allein die Wirkung der Form vergleichen.";
const HM_FD2_FORMAT = { reel: "Reel", karussell: "Karussell", post: "Einzelbild" };
/* Zahl mit Einheit, wie sie im Beleg steht (Ziffern oder Zahlwort). */
const HM_FD2_ZAHL = "(?<![A-Za-zÄÖÜäöüß])(?:\\d+(?:[.,]\\d+)?|[Ee]ine?|[Zz]wei|[Dd]rei|[Vv]ier|[Ff]ünf|[Ss]echs|[Ss]ieben|[Aa]cht|[Nn]eun|[Zz]ehn|[Ee]lf|[Zz]wölf)\\s?(?:Wochen|Woche|Monaten|Monate|Monat|Jahren|Jahre|Jahr|Prozent|%)(?![A-Za-zÄÖÜäöüß])";
/* Kaufpreis: Mio., Millionen, Euro, Eurozeichen oder Tausendergruppen (600.000). Ein Beleg mit Preis bleibt ganz aus dem Feed. */
const HM_FD2_PREIS = /\bMio\b\.?|\bMillion(?:en)?\b|\bEuro\b|€|\bEUR\b|\b\d{1,3}(?:\.\d{3})+\b/;
/* Titelbild der Highlights: Blickpunkt je Welt im 1080 x 1350-Beitrag. p = Gesicht im Porträt der Hook-Kachel
   (Porträt steht unten im Rahmen, Gesicht im oberen Drittel), ps = gespiegelte Kachel, t = erste Textzeile ohne Porträt. */
const HM_FD2_FOKUS = {
  ruhig: { p: [718, 330], ps: [386, 330], t: [300, 900] },
  editorial: { p: [762, 760], t: [300, 200] },
  graetzl: { p: [789, 640], t: [300, 200] },
  klar: { p: [777, 650], t: [320, 220] },
  warm: { p: [733, 830], t: [300, 210] },
  kontrast: { p: [789, 395], t: [300, 640] },
};
/* Einstellungsgröße je Gesichtsplatz (12_social 3.4: nah Kopf 40 Prozent, halbnah 20 Prozent, weit Person höchstens ein Viertel).
   Nachbarn in Zeile (i, i minus 1) und Spalte (i, i plus 3) sind nie gleich, kein Schnitt öfter als vier Mal.
   nah und halbnah zeichnet dieses Modul selbst (hmFd2Zeichnen), weit ist die Hook-Kachel der Markenwelt (WeltPost). */
const HM_FD2_SCHNITT = { 1: "nah", 2: "halbnah", 4: "weit", 5: "nah", 7: "halbnah", 8: "weit", 10: "nah", 11: "halbnah" };
/* Lage des Porträts auf der Fläche 1080 x 1350. Das Porträt steht auf der Standlinie (H minus Rand), darunter die Namenszeile.
   face: Blickpunkt für das Titelbild der Highlights (Gesicht bei rund 27 Prozent der Bildhöhe, gemessen am Porträt-Zuschnitt). */
function hmFd2PortraitLage(schnitt, spiegel) {
  const W = 1080, L = 1231;
  if (schnitt === "nah") { const h = 1796, w = Math.round(h * 0.75); const x = Math.round((W - w) / 2 + (spiegel ? -70 : 70)); return { x, y: 189, w, h, face: [Math.round(x + w * 0.51), Math.round(189 + h * 0.27)] }; }
  const h = 900, w = 675; const x = Math.round((W - w) / 2 + (spiegel ? -130 : 130)); return { x, y: L - h, w, h, face: [Math.round(x + w * 0.51), Math.round(L - h + h * 0.27)] };
}
/* Feste Wörter der Oberfläche, geprüft im Selbsttest (keine Ausrufezeichen, keine Gedankenstriche, keine Textzeichen als Icons) */
const HM_FD2_UI = {
  uhr: "9:41", kontoFolgt: "Kontoname folgt", beitraege: "Beiträge", follower: "Follower", gefolgt: "Gefolgt", folgt: "folgt", folgen: "Folgen", nachricht: "Nachricht",
  raster: "Beiträge", reels: "Reels", mehr: "mehr", weniger: "weniger", gefaellt: "Gefällt mir", kommentieren: "Kommentieren", teilen: "Teilen", speichern: "Speichern", optionen: "Optionen",
  bioLuecke: "Diese Zeile schreiben wir mit Ihnen vor dem Live-Tag.", profilbildLuecke: "Porträt folgt", hlFolgt: "folgt",
  woche1: "Woche 1: die ersten drei Beiträge gehen am Live-Tag gemeinsam online.", wocheN: "drei neue Beiträge kommen dazu.",
  reel: "Das Reel drehen wir am Drehtag.", karussell: "Weitere Seiten schreiben wir nach Ihrer Rückmeldung.", zahlPruefen: "Diese Zahl prüfen wir vor dem Live-Tag mit Ihren Unterlagen.",
  ersatzOffen: "Was an diesem Tag stattdessen erscheint, legen wir mit Ihnen vor dem Live-Tag fest.", herkunft: "Herkunft", befunde: "Prüfbefunde", luecke: "Lücke", auftraege: "Arbeitsaufträge",
  pruefliste: "Prüfliste", luecken: "Lücken", keineLuecken: "Keine Lücken.", empfehlung: "Unsere Empfehlung", gegenentwurf: "Gegenentwurf", nebeneinander: "Nebeneinander",
  titel: "Ihr Feed in den ersten vier Wochen", absatz: "Zwölf Beiträge in der Reihenfolge, in der sie erscheinen. Die erste Woche geht am Live-Tag vollständig online.",
  staffel: "Staffel 1", objektLuecke: "Hier kommt Ihr erstes Objekt.",
};
/* Icons als SVG-Pfade, 24er Raster, 1,5 px Strich (Herz, Kommentar, Teilen, Speichern, Raster, Reels, Pin, Punkte, Plus, Menü, Zurück) */
const HM_FD2_ICO = {
  herz: "M12 20.3 4.6 13a4.7 4.7 0 0 1 6.6-6.7l.8.8.8-.8a4.7 4.7 0 0 1 6.6 6.7Z",
  kommentar: "M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.3A8 8 0 1 1 20 12Z",
  teilen: "M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5Z",
  speichern: "M6 3.5h12v17l-6-4.5-6 4.5Z",
  raster: "M3.5 3.5h17v17h-17ZM3.5 9.2h17M3.5 14.8h17M9.2 3.5v17M14.8 3.5v17",
  reels: "M3.5 3.5h17v17h-17ZM3.5 8.5h17M8 3.5l3 5M14 3.5l3 5M10.5 12v6l4.5-3Z",
  pin: "M9 3h6M10 3v5l-3.5 4h11L14 8V3M12 12v9",
  punkte: "M5 12h.01M12 12h.01M19 12h.01",
  plus: "M3.5 3.5h17v17h-17ZM12 8v8M8 12h8",
  menue: "M3.5 6.5h17M3.5 12h17M3.5 17.5h17",
  zurueck: "M15 5l-7 7 7 7",
  chevron: "M8 10l4 4 4-4",
};

/* ---------- kleine Helfer ---------- */
const hmFd2S = (x) => (x == null ? "" : String(x)).trim();
const hmFd2Zwei = (n) => String(n).padStart(2, "0");
function hmFd2Sicher(fn, ersatz) { try { const v = fn(); return v == null ? ersatz : v; } catch (e) { return ersatz; } }
/* Lückenmarken der Plattform ("[...]" oder hmPfLuecke) gelten als fehlend */
function hmFd2IstLuecke(s) {
  const t = hmFd2S(s);
  if (!t) return true;
  if (typeof window !== "undefined" && window.hmPfIstLuecke && hmFd2Sicher(() => window.hmPfIstLuecke(t), false)) return true;
  return /^\[/.test(t);
}
const hmFd2Wert = (s) => (hmFd2IstLuecke(s) ? "" : hmFd2S(s));
function hmFd2Iso(d) { return `${d.getFullYear()}-${hmFd2Zwei(d.getMonth() + 1)}-${hmFd2Zwei(d.getDate())}`; }
function hmFd2Tag(iso, n) { const d = new Date(iso + "T12:00:00"); d.setDate(d.getDate() + n); return hmFd2Iso(d); }
function hmFd2Woerter(t) { return hmFd2S(t).split(/\s+/).filter((w) => /[0-9A-Za-zÄÖÜäöüß]/.test(w)).length; }
function hmFd2Treffer(t) { return hmFd2S(t).match(new RegExp(HM_FD2_ZAHL, "g")) || []; }
/* wörtlich enthalten; nur die Großschreibung am Satzanfang darf abweichen */
const hmFd2Enthaelt = (text, teil) => hmFd2S(text).toLowerCase().includes(hmFd2S(teil).toLowerCase());
/* Paar-Syntax {Sie|du} erst beim Rendern auflösen */
function hmFd2Anrede(text, anrede) {
  const du = /^du$/i.test(hmFd2S(anrede));
  return String(text == null ? "" : text).replace(/\{([^{}|]*)\|([^{}|]*)\}/g, (_, a, b) => (du ? b : a));
}
function hmFd2Sprache(t) {
  const s = String(t || ""); const f = [];
  if (s.includes("!")) f.push("Ausrufezeichen");
  if (/[\u2013\u2014]/.test(s)) f.push("Gedankenstrich");
  const m = s.match(/link in bio|folgen sie|schreiben sie mir/i);
  if (m) f.push(`Formelsatz "${m[0]}"`);
  return f;
}
const hmFd2Preis = (t) => HM_FD2_PREIS.test(hmFd2S(t));
/* Satzvergleich ohne Groß- und Kleinschreibung und Satzzeichen */
const hmFd2Norm = (s) => hmFd2S(s).toLowerCase().replace(/[^0-9a-zäöüß]+/g, " ").trim();
const hmFd2Saetze = (s) => hmFd2S(s).split(/(?<=[.?;])\s+/).filter(Boolean);
/* Bio-Zeile als Satzteil: beginnt klein oder endet auf ein kleingeschriebenes Wort (Relativsatz, Verb am Ende) */
function hmFd2Satzteil(s) {
  const t = hmFd2S(s).replace(/[.,;:]+$/, "");
  if (!t) return false;
  const w = t.split(/\s+/);
  return /^[a-zäöüß]/.test(t) || /^[a-zäöüß]/.test(w[w.length - 1]);
}
/* Ist das Porträt in dieser Welt tatsächlich gezeichnet? Die Hook-Kachel zeigt es in allen sechs Welten,
   die Serien-Kachel nur im Feuilleton, das Zitat nur in der Weite (Stand wb-markenwelten.jsx). */
function hmFd2PortraitSichtbar(daten, b, weltId) {
  if (!daten || !daten.portrait || !(b && b.portrait)) return false;
  /* Eigene Formen dieses Moduls: das Porträt zeichnet nur die Porträtkachel, Text, Zahl und Objekt nie */
  if (daten.form === "portrait") return true;
  if (daten.form && daten.form !== "welt") return false;
  if (daten.art === "hook") return true;
  if (daten.art === "serie") return weltId === "editorial";
  if (daten.art === "zitat") return weltId === "ruhig";
  return false;
}
function hmFd2Feiertag(iso) { return !!iso && typeof HM_FEIERTAGE !== "undefined" && !!HM_FEIERTAGE && HM_FEIERTAGE.has(iso); }
/* Nächster Tag, der weder Feiertag noch Sonntag ist */
function hmFd2Werktag(iso) {
  let x = iso;
  for (let i = 0; i < 7 && x && (hmFd2Feiertag(x) || new Date(x + "T12:00:00").getDay() === 0); i++) x = hmFd2Tag(x, 1);
  return x;
}
function hmFd2Lum(hex) {
  let x = String(hex || "#000000").replace("#", "");
  if (x.length === 3) x = x.split("").map((z) => z + z).join("");
  const k = [0.2126, 0.7152, 0.0722];
  return [0, 2, 4].reduce((s, i, j) => { const c = (parseInt(x.substr(i, 2), 16) || 0) / 255; return s + k[j] * (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)); }, 0);
}
function hmFd2DatumKurz(iso) { return iso ? new Date(iso + "T12:00:00").toLocaleDateString("de-AT", { weekday: "short", day: "numeric", month: "numeric" }) : "Datum folgt"; }
function hmFd2DatumLang(iso) { return iso ? new Date(iso + "T12:00:00").toLocaleDateString("de-AT", { weekday: "long", day: "numeric", month: "long" }) : "Datum folgt"; }
function hmFd2Wochentag(iso) { return iso ? new Date(iso + "T12:00:00").toLocaleDateString("de-AT", { weekday: "long" }) : ""; }
function hmFd2FolgeText(x) {
  if (!x || !x.serie) return "";
  if (x.serie.folge === 0) return "Staffelplakat";
  return x.serie.folge ? "Folge " + hmFd2Zwei(x.serie.folge) : "";
}
function hmFd2Titel(x) {
  if (x.luecke && x.luecke.art === "objekt") return "Wechselplatz für Ihr erstes Objekt";
  const n = x.serie && x.serie.name;
  if (!n) return "Beitrag " + x.nr;
  if (x.serie.folge === 0) return n + ", Staffelplakat";
  return x.serie.folge ? n + " " + hmFd2Zwei(x.serie.folge) : n;
}
/* Highlight-Name in ein bis zwei Wörtern. Endet der Serienname auf Präposition und Hauptwort, trägt dieser Schluss
   meist die Idee ("Sievering in Zahlen" wird "In Zahlen"). Jede Kürzung geht dem Team zur Freigabe. */
function hmFd2Kurzname(n) {
  const w = hmFd2S(n).split(/\s+/).filter(Boolean).map((x) => x.replace(/[.,:;?]+$/, ""));
  if (w.length <= 2) return { name: w.join(" "), gekuerzt: false };
  const praep = /^(in|im|vor|nach|am|an|auf|zum|zur|mit|von|für|über|unter|ohne|seit|bei)$/i;
  const artikel = /^(der|die|das|den|dem|des|ein|eine|einer|eines|und)$/i;
  const gross = (x) => /^[A-ZÄÖÜ0-9]/.test(x);
  const L = w.length - 1;
  if (gross(w[L]) && praep.test(w[L - 1])) return { name: w[L - 1].charAt(0).toUpperCase() + w[L - 1].slice(1) + " " + w[L], gekuerzt: true };
  const kern = w.filter((x) => gross(x) && !praep.test(x) && !artikel.test(x));
  return { name: kern.length ? kern.slice(0, 2).join(" ") : w.slice(-2).join(" "), gekuerzt: true };
}

/* ---------- Termine ---------- */
function hmFd2Live(mid, m, opt) {
  if (opt && opt.live !== undefined) return { iso: opt.live ? String(opt.live).slice(0, 10) : null, feld: "opt.live" };
  const t = hmFd2Sicher(() => (((hmStore.get("auftrag") || {})[mid] || {}).termine || {}).live, null);
  if (t) return { iso: String(t).slice(0, 10), feld: "auftrag.termine.live" };
  const s = hmFd2Sicher(() => (window.hmStandTermine && m && m.id ? window.hmStandTermine(m).live : null), null);
  if (s) {
    /* Die Schätzung darf nicht auf einen Feiertag fallen: dann schlagen wir den nächsten Werktag vor */
    const roh = String(s).slice(0, 10); const iso = hmFd2Werktag(roh);
    return { iso, feld: "hmStandTermine(m).live", geschaetzt: true, verschoben: iso !== roh ? roh : null };
  }
  return { iso: null, feld: null };
}
/* Woche 1 komplett am Live-Tag, ab Woche 2 Di, Do, Sa; Feiertag oder Sonntag schiebt auf den nächsten Tag */
function hmFd2Datum(live, nr) {
  if (!live) return null;
  const w = Math.ceil(nr / 3);
  if (w === 1) return live;
  const d = new Date(live + "T12:00:00");
  const montag = hmFd2Tag(live, -((d.getDay() + 6) % 7));
  return hmFd2Werktag(hmFd2Tag(montag, 7 * (w - 1) + HM_FEED2_TAKT.tage[(nr - 1) % 3]));
}

/* ---------- Belege: nur Zahl mit Einheit, nie mit Kaufpreis ---------- */
function hmFd2Belege(p) {
  return ((p && p.beweise) || []).map((x, i) => {
    const text = hmFd2Wert(x && x.beleg);
    const treffer = hmFd2Treffer(text);
    if (!treffer.length || hmFd2Preis(text)) return null;
    const quelle = hmFd2S(x.quelle);
    return { ref: "b" + (i + 1), i, text, zahl: treffer[0], treffer, behauptung: hmFd2Wert(x.behauptung), quelle, status: /prüfen|selbstauskunft/i.test(quelle) ? "selbstauskunft" : "geprueft" };
  }).filter(Boolean);
}
/* Belege, die wegen eines Kaufpreises draußen bleiben (für Prüfliste und Lücken) */
function hmFd2PreisBelege(p) {
  return ((p && p.beweise) || []).map((x, i) => ({ ref: "b" + (i + 1), i, text: hmFd2Wert(x && x.beleg) })).filter((b) => b.text && hmFd2Preis(b.text));
}

/* ---------- Profil ---------- */
function hmFd2Konto(m2) {
  const f = m2 && m2.vorab && m2.vorab.fakten;
  let k = null;
  if (Array.isArray(f)) { const e = f.find((x) => x && x.feld === "kanaele"); k = e ? e.wert : null; }
  else if (f && f.kanaele) k = f.kanaele.wert || f.kanaele;
  const liste = Array.isArray(k) ? k : (k && typeof k === "object") ? Object.keys(k).map((x) => ({ kanal: x, ...(k[x] && typeof k[x] === "object" ? k[x] : { status: k[x] }) })) : [];
  const ig = liste.find((x) => x && /instagram/i.test(hmFd2S(x.kanal)));
  const name = ig ? hmFd2S(ig.konto || ig.kontoname || ig.handle || ig.name) : "";
  return name ? name.replace(/^@/, "") : null;
}
function hmFd2Bio(p, anrede) {
  /* nur die Instagram-Bio, nicht "Bio LinkedIn" */
  const beisp = ((p && p.stimme && p.stimme.beispiele) || []).map((x, i) => ({ x, i })).filter((e) => e.x && /\bbio\b/i.test(hmFd2S(e.x.wo)) && !/linkedin|facebook|tiktok|website|xing/i.test(hmFd2S(e.x.wo)));
  let zeilen = [], herkunft = [], grund = [];
  if (beisp.length) {
    beisp.forEach((e) => hmFd2Wert(e.x.so).split(/\n+/).forEach((z) => { if (hmFd2S(z) && zeilen.length < 3) { zeilen.push(hmFd2S(z)); herkunft.push(`plattform.stimme.beispiele[${e.i}].so`); } }));
  } else {
    const pos = (p && p.positionierung) || {};
    const was = hmFd2Wert(pos.was), wen = hmFd2Wert(pos.fuerWen), claim = hmFd2Wert(p && p.botschaften && p.botschaften.claim);
    /* positionierung.was ist oft ein Relativsatz ("..., der den Zeitpunkt vor den Abschluss stellt"). Großschreiben macht daraus
       keinen Satz: dann bleibt die Zeile eine Lücke mit Auftrag ans Team. */
    const teil = was && hmFd2Satzteil(was);
    zeilen = [was && !teil ? was : "", wen ? (/^für\s/i.test(wen) ? wen : "Für " + wen) : "", claim];
    grund = [teil ? "satzteil" : "", "", ""];
    herkunft = ["plattform.positionierung.was", "plattform.positionierung.fuerWen", "plattform.botschaften.claim"];
  }
  while (zeilen.length < 3) { zeilen.push(""); herkunft.push("fehlt"); }
  zeilen = zeilen.slice(0, 3).map((z, i) => { const t = hmFd2Anrede(z, anrede); if (t && t.length > 60) grund[i] = "lang"; return t && t.length <= 60 ? t : null; });
  /* zusammen höchstens 150 Zeichen: sonst die längste Zeile als Lücke */
  const summe = () => zeilen.filter(Boolean).join("\n").length;
  while (summe() > 150) { let l = -1; zeilen.forEach((z, i) => { if (z && (l < 0 || z.length > zeilen[l].length)) l = i; }); zeilen[l] = null; grund[l] = "summe"; }
  return { zeilen, herkunft: herkunft.slice(0, 3), grund: [0, 1, 2].map((i) => grund[i] || (zeilen[i] ? "" : "fehlt")) };
}
/* Drei Serien mit den meisten Beiträgen. Titelbild ist der Beitrag, dessen Porträt tatsächlich gezeichnet ist, sonst ein eigenes Bild, sonst der erste. */
function hmFd2Highlights(posts, weltId, b) {
  const z = {};
  posts.slice().sort((a, c) => a.nr - c.nr).forEach((x) => { const n = x.serie && x.serie.name; if (!n || (x.luecke && (x.luecke.art === "text" || x.luecke.art === "objekt"))) return; (z[n] = z[n] || []).push(x.nr); });
  const hol = (nr) => posts.find((y) => y.nr === nr);
  const liste = Object.keys(z).sort((a, c) => z[c].length - z[a].length || z[a][0] - z[c][0]).slice(0, 3).map((n) => {
    const aus = z[n];
    const mitGesicht = aus.find((nr) => hmFd2PortraitSichtbar((hol(nr) || {}).daten, b, weltId));
    const mitBild = aus.find((nr) => { const d = (hol(nr) || {}).daten; return d && d.bild && d.bild.img; });
    const k = hmFd2Kurzname(n);
    return { name: k.name, gekuerzt: k.gekuerzt, serie: n, ausNr: aus, coverNr: mitGesicht || mitBild || aus[0] };
  });
  while (liste.length < 3) liste.push({ name: null, serie: null, ausNr: [], coverNr: null });
  return liste;
}

/* ---------- Beitrag anlegen ---------- */
function hmFd2Neu(nr) {
  const platz = ((nr - 1) % 3) + 1;
  return {
    id: "f" + nr, nr, woche: Math.ceil(nr / 3), platz, datum: null, angepinnt: nr <= 3,
    serie: { name: "", folge: null }, saeule: "", saeuleId: "", format: platz === 3 ? "post" : "reel", art: "hook",
    text: "", unter: "", gesicht: platz !== 3, gegenton: HM_FEED2_TAKT.gegenton.includes(nr), textgefuehrt: HM_FEED2_TAKT.flaeche.includes(nr),
    ton: "grund", beleg: null, captionTeile: { hook: "", einloesung: "", beleg: "", weitergeben: "" }, captionLuecken: [], captionEntwurf: [], captionPreis: [], caption: "",
    seiten: [], luecke: null, ersatz: null, bildUrl: null, herkunft: [], daten: null, befunde: [],
  };
}
function hmFd2FormatAus(f) {
  if (HM_FEED2_TAKT.gesichtFormate.includes(f)) return "reel";
  if (HM_FEED2_TAKT.karussellFormate.includes(f)) return "karussell";
  return "post";
}
/* Stoff (aus start30 oder Serienbeispiel) in den Beitrag übernehmen, wörtlich */
function hmFd2Fuellen(x, st, o) {
  const s = st.s || null; const serie = s && s.serie ? s.serie : null;
  x.serie = { name: hmFd2Wert(serie && serie.name) || hmFd2Wert(s && s.name), folge: o.plakat ? 0 : null };
  x.saeule = hmFd2Wert(s && s.name); x.saeuleId = s ? hmFd2S(s.id) : "";
  x.text = o.plakat ? x.serie.name : st.titel;
  x.herkunft.push({ teil: "Text im Bild", feld: o.plakat ? st.feldSerie + ".name" : st.feldTitel });
  if (o.format) x.format = o.format; else if (st.format) x.format = hmFd2FormatAus(st.format);
  if (o.art) x.art = o.art;
  const bsp = st.bsp || {};
  /* Kaufpreise nie in die Caption: ein Teil mit Preis wird zur Lücke */
  const preis = [];
  const ohnePreis = (t, teil) => { if (t && hmFd2Preis(t)) { if (!preis.includes(teil)) preis.push(teil); return ""; } return t; };
  const hookRoh = ohnePreis(hmFd2Wert(bsp.hook), "hook"); const titel = ohnePreis(st.titel, "hook");
  let hook = "", hookFeld = "";
  if (o.plakat) { hook = x.serie.name ? x.serie.name + "." : ""; hookFeld = st.feldSerie + ".name"; }
  else if (hookRoh && hookRoh.length <= 90) { hook = hookRoh; hookFeld = st.feldBsp + ".hook"; }
  else if (titel && titel.length <= 90) { hook = titel; hookFeld = st.feldTitel; }
  else { hook = hookRoh || titel; hookFeld = hookRoh ? st.feldBsp + ".hook" : st.feldTitel; }
  if (hook && !o.plakat) { const i = preis.indexOf("hook"); if (i >= 0) preis.splice(i, 1); }
  const einl = ohnePreis(o.plakat ? hmFd2Wert(serie && serie.idee) : hmFd2Wert(bsp.skizze), "einloesung");
  const weiter = ohnePreis(hmFd2Wert(serie && serie.weitergeben), "weitergeben");
  x.captionTeile = { hook: hook || HM_FD2_LUECKE.hook, einloesung: einl || HM_FD2_LUECKE.einloesung, beleg: "", weitergeben: weiter || HM_FD2_LUECKE.weitergeben };
  x.captionLuecken = [!hook && "hook", !einl && "einloesung", !weiter && "weitergeben"].filter(Boolean);
  /* Skizze und Serienidee sind Produktionsnotizen, keine fertige Stimme: im Makler-Blick als Entwurf gekennzeichnet */
  x.captionEntwurf = einl ? ["einloesung"] : [];
  x.captionPreis = preis;
  x.herkunft.push({ teil: "Erster Satz", feld: hook ? hookFeld : "Lücke" });
  x.herkunft.push({ teil: "Einlösung", feld: einl ? (o.plakat ? st.feldSerie + ".idee" : st.feldBsp + ".skizze") : "Lücke" });
  x.herkunft.push({ teil: "Weitergeben", feld: weiter ? st.feldSerie + ".weitergeben" : "Lücke" });
  return x;
}
function hmFd2TextLuecke(x, rolle, serieName) {
  x.serie = { name: serieName || "", folge: null };
  x.text = "Diese Folge schreiben wir mit Ihnen.";
  x.luecke = { art: "text", satz: HM_FD2_MAKLER_LUECKE, rolle, auftrag: `${rolle}: Titel, Text im Bild und Caption aus dem Themenvorrat schreiben, nie erfinden.`, ersatz: null };
  x.captionTeile = { hook: HM_FD2_LUECKE.hook, einloesung: HM_FD2_LUECKE.einloesung, beleg: "", weitergeben: HM_FD2_LUECKE.weitergeben };
  x.captionLuecken = ["hook", "einloesung", "weitergeben"];
  x.herkunft.push({ teil: "Text im Bild", feld: "Lücke: " + rolle });
  return x;
}

/* ---------- Regelpfad aus der Plattform ---------- */
function hmFd2Regel(mid, p, ctx) {
  const saeulen = ((p && p.saeulen) || []).filter(Boolean);
  const idx = {};
  saeulen.forEach((s, si) => ((s.serie && s.serie.beispiele) || []).forEach((bsp, bi) => { const t = hmFd2Wert(bsp && bsp.titel); if (t && !idx[t]) idx[t] = { si, bi, bsp, s }; }));
  const s30 = [];
  ((p && p.start30) || []).forEach((w, wi) => ((w && w.beitraege) || []).forEach((x, j) => { if (x && hmFd2Wert(x.titel)) s30.push({ ...x, titel: hmFd2Wert(x.titel), wi, j }); }));
  /* Signatur: Säule, die in start30 am häufigsten vorkommt, bei Gleichstand saeulen[0] */
  const zahl = {}; s30.forEach((x) => { zahl[x.saeule] = (zahl[x.saeule] || 0) + 1; });
  let sig = saeulen[0] || null;
  saeulen.forEach((s) => { if (sig && (zahl[s.id] || 0) > (zahl[sig.id] || 0)) sig = s; });
  const sigI = saeulen.indexOf(sig);
  const sigSerie = sig && sig.serie && hmFd2Wert(sig.serie.name) ? sig.serie : null;
  const sigBsp = ((sigSerie && sigSerie.beispiele) || []).filter((b) => b && hmFd2Wert(b.titel));
  const genutzt = new Set(sigBsp.map((b) => hmFd2Wert(b.titel)));
  const istGesicht = (f) => HM_FEED2_TAKT.gesichtFormate.includes(f);
  const ausStart = (x) => {
    const ix = idx[x.titel]; const s = ix ? ix.s : saeulen.find((y) => y.id === x.saeule) || null; const si = saeulen.indexOf(s);
    return { titel: x.titel, bsp: ix ? ix.bsp : null, s, format: x.format, feldTitel: `plattform.start30[${x.wi}].beitraege[${x.j}].titel`, feldBsp: ix ? `plattform.saeulen[${ix.si}].serie.beispiele[${ix.bi}]` : `plattform.start30[${x.wi}].beitraege[${x.j}]`, feldSerie: `plattform.saeulen[${si}].serie` };
  };
  const ausBsp = (s, si, bsp, bi, format) => ({ titel: hmFd2Wert(bsp.titel), bsp, s, format, feldTitel: `plattform.saeulen[${si}].serie.beispiele[${bi}].titel`, feldBsp: `plattform.saeulen[${si}].serie.beispiele[${bi}]`, feldSerie: `plattform.saeulen[${si}].serie` });
  const naechster = (gesicht) => {
    const x = s30.find((y) => !genutzt.has(y.titel) && (!sig || y.saeule !== sig.id) && istGesicht(y.format) === gesicht);
    if (!x) return null;
    genutzt.add(x.titel);
    return ausStart(x);
  };
  /* Ersatz für den Objektplatz: nächster unbenutzter Sache-Beitrag aus start30, sonst aus den Serienbeispielen */
  const ersatzStoff = () => {
    const a = naechster(false); if (a) return a;
    for (let si = 0; si < saeulen.length; si++) {
      const s = saeulen[si]; if (s === sig || istGesicht((s.formate || [])[0])) continue;
      const bl = (s.serie && s.serie.beispiele) || [];
      for (let bi = 0; bi < bl.length; bi++) { const t = hmFd2Wert(bl[bi] && bl[bi].titel); if (t && !genutzt.has(t)) { genutzt.add(t); return ausBsp(s, si, bl[bi], bi, (s.formate || [])[0]); } }
    }
    return null;
  };

  const posts = [];
  for (let nr = 1; nr <= 12; nr++) posts.push(hmFd2Neu(nr));
  const P = (nr) => posts[nr - 1];
  /* Folge 1: Staffelplakat der Signatur */
  if (sigSerie) hmFd2Fuellen(P(1), { titel: hmFd2Wert(sigSerie.name), s: sig, feldSerie: `plattform.saeulen[${sigI}].serie` }, { plakat: true, art: "serie", format: "post" });
  else hmFd2TextLuecke(P(1), "Staffelplakat der Signatur-Serie", "");
  /* Signatur-Folgen 01 bis 04 auf Folge 2, 4, 7, 10 */
  HM_FEED2_TAKT.signaturNr.forEach((nr, k) => {
    const bsp = sigBsp[k];
    if (bsp) { const bi = ((sigSerie && sigSerie.beispiele) || []).indexOf(bsp); hmFd2Fuellen(P(nr), ausBsp(sig, sigI, bsp, bi, null), { art: "hook", format: "reel" }); }
    else hmFd2TextLuecke(P(nr), `Signatur-Folge ${hmFd2Zwei(k + 1)} (${sigSerie ? hmFd2Wert(sigSerie.name) : "Signatur-Serie"})`, sigSerie ? hmFd2Wert(sigSerie.name) : "");
    P(nr).format = "reel";
  });
  /* Nutzen mit Gesicht und Sache ohne Gesicht in Veröffentlichungsfolge */
  [3, 5, 6, 8, 9, 11].forEach((nr) => {
    const gesicht = HM_FEED2_TAKT.gesichtNr.includes(nr);
    const st = naechster(gesicht);
    if (st) hmFd2Fuellen(P(nr), st, { art: "hook" });
    else hmFd2TextLuecke(P(nr), gesicht ? "Nutzen mit Gesicht" : "Sache ohne Gesicht", "");
    if (gesicht) P(nr).format = "reel";
    else if (P(nr).format === "reel") P(nr).format = "post";
  });
  /* Folge 12: Objekt-Wechselplatz */
  const x12 = P(HM_FEED2_TAKT.objektNr);
  const eigen = ctx.einw4 === "ja" ? (ctx.bilder || []).find((b) => b && b.gruppe === "eigen" && !b.ki && !b.klein && hmFd2S(b.url) && !/assets\/(img|photos)\//.test(b.url) && !(ctx.fremd || []).includes(b.url)) : null;
  const est = ersatzStoff();
  let ersatz = null;
  if (est) { ersatz = hmFd2Fuellen(hmFd2Neu(12), est, { art: "hook" }); if (ersatz.format === "reel") ersatz.format = "post"; }
  x12.serie = { name: "Objekt", folge: null };
  x12.art = "objekt"; x12.format = "post";
  if (eigen) {
    x12.bildUrl = eigen.url; x12.text = ""; x12.unter = "";
    x12.luecke = { art: "text", satz: "Titel und Lage dieses Objekts schreiben wir mit Ihnen vor dem Live-Tag.", rolle: "Objekttitel", auftrag: "Titel, Lage und Energiewerte (HWB, fGEE) des Objekts eintragen, Bildrechte vermerken.", ersatz: null };
    x12.captionTeile = { hook: "[Titel und Lage des Objekts, schreibt das Team]", einloesung: HM_FD2_LUECKE.einloesung, beleg: "", weitergeben: HM_FD2_LUECKE.weitergeben };
    x12.captionLuecken = ["hook", "einloesung", "weitergeben"];
    x12.herkunft.push({ teil: "Bild", feld: `hmBildBibliothek(${mid}) ${eigen.ref || ""}`.trim() });
  } else {
    x12.text = "Hier kommt Ihr erstes Objekt."; x12.unter = "";
    x12.luecke = {
      art: "objekt", satz: "Hier kommt Ihr erstes Objekt.",
      grund: ctx.einw4 !== "ja" ? `Einwilligung 4 (Objektfotos zeigen) steht auf "${ctx.einw4}".` : "Kein eigenes Objektbild mit geklärten Rechten in der Bibliothek.",
      auftrag: ersatz ? `Ersatz "${ersatz.text}" fertig produzieren; Objekt erscheint, sobald Einwilligung 4 und ein eigenes Bild vorliegen.` : "Für diesen Samstag fehlt ein Ersatzbeitrag ohne Gesicht: bitte einen Sache-Beitrag in den Serien anlegen.",
      ersatz: { titel: ersatz ? ersatz.text : null },
    };
    x12.ersatz = ersatz;
    if (ersatz) { x12.captionTeile = { ...ersatz.captionTeile }; x12.captionLuecken = ersatz.captionLuecken.slice(); x12.captionEntwurf = ersatz.captionEntwurf.slice(); x12.captionPreis = ersatz.captionPreis.slice(); x12.herkunft = ersatz.herkunft.map((h) => ({ teil: "Ersatz, " + h.teil, feld: h.feld })); }
    else { x12.captionTeile = { hook: HM_FD2_LUECKE.hook, einloesung: HM_FD2_LUECKE.einloesung, beleg: "", weitergeben: HM_FD2_LUECKE.weitergeben }; x12.captionLuecken = ["hook", "einloesung", "weitergeben"]; }
    x12.herkunft.push({ teil: "Text im Bild", feld: "Lückenkachel Objekt (13_feed 3.4)" });
  }
  hmFd2BelegeVerteilen(posts, ctx.belege);
  return { posts, signatur: sig ? { id: sig.id, name: hmFd2Wert(sig.name), serie: sigSerie ? hmFd2Wert(sigSerie.name) : null } : null };
}

/* Belege verteilen: je Woche höchstens einer sichtbar, jeder höchstens einmal.
   Zuerst ein Beitrag, dessen Text im Bild die Zahl eines Belegs schon wörtlich trägt; sonst ein Beitrag der Beweis-Säule,
   dessen Titel wörtlich im Beleg steht (derselbe Fall). Dessen Text im Bild übernimmt dann die Zahl mit Einheit per Regex.
   Ein Beleg wird nie an einen fremden Fall gehängt. */
function hmFd2BelegeVerteilen(posts, belege) {
  const benutzt = new Set();
  const frei = () => (belege || []).filter((b) => !benutzt.has(b.ref));
  const passt = (x) => frei().find((b) => b.treffer.some((t) => hmFd2Enthaelt(x.text, t)));
  const setze = (x, b, feld) => {
    benutzt.add(b.ref);
    x.beleg = { ref: b.ref, text: b.text, status: b.status, sichtbar: true, zahl: b.zahl, behauptung: b.behauptung };
    x.captionTeile.beleg = b.text;
    x.herkunft.push({ teil: "Beleg", feld: `plattform.beweise[${b.i}].beleg` });
    if (feld) x.herkunft.push({ teil: "Text im Bild, Zahl", feld });
  };
  for (let w = 1; w <= 4; w++) {
    const kand = posts.filter((x) => x.woche === w && !x.luecke && x.art !== "objekt" && x.art !== "serie");
    let fertig = false;
    for (const x of kand) { const b = passt(x); if (b) { setze(x, b, null); fertig = true; break; } }
    if (fertig) continue;
    /* Titel und Zahl müssen im selben Satz des Belegs stehen, sonst gehört die Zahl zu einem anderen Fall (Sammelbeleg) */
    let treffer = null;
    for (const x of kand.filter((y) => y.saeuleId === "beweise" && hmFd2S(y.text))) {
      for (const b of frei()) {
        const satz = hmFd2S(b.text).split(/(?<=[.;])\s+/).find((s) => hmFd2Enthaelt(s, x.text) && hmFd2Treffer(s).length);
        if (satz) { treffer = { x, b, zahl: hmFd2Treffer(satz)[0] }; break; }
      }
      if (treffer) break;
    }
    if (treffer) { const { x, b, zahl } = treffer; x.unter = x.text; x.text = zahl.charAt(0).toUpperCase() + zahl.slice(1) + "."; setze(x, b, `plattform.beweise[${b.i}].beleg (Regex)`); x.beleg.zahl = zahl; }
  }
  /* Übrige Beiträge, deren Text schon eine Belegzahl trägt: in der Pin-Reihe sichtbar (jeder Beleg nur einmal),
     ab Woche 2 nur dann sichtbar, wenn die Woche noch keinen hat. Sonst hängt der Beleg unsichtbar an der Caption,
     damit die Zahl eine Quelle hat, und die Prüfung meldet die zweite Zahl als Hinweis. */
  posts.forEach((x) => {
    if (x.beleg || x.luecke) return;
    const b = passt(x); if (!b) return;
    const voll = x.woche > 1 && posts.some((y) => y.woche === x.woche && y.beleg && y.beleg.sichtbar);
    setze(x, b, null);
    if (voll) x.beleg.sichtbar = false;
  });
}

/* ---------- Daten für WeltPost, ohne Vorgaben aus hmWeltPostDaten ---------- */
/* Das Staffelplakat (Folge 0) zeichnen wir als Hook-Kachel mit Porträt und dem Seriennamen als Text im Bild:
   die Serien-Kachel der Welten zeigt kein Gesicht (außer Feuilleton), nummeriert mit 01 und wiederholt den Namen. */
function hmFd2Daten(x, b, ton) {
  let art = ["hook", "zahl", "zitat", "objekt", "serie"].includes(x.art) ? x.art : "hook";
  const plakat = !!(x.serie && x.serie.folge === 0);
  const serie = x.serie && x.serie.name && !plakat ? { name: x.serie.name, nr: Math.max(1, x.serie.folge || 1) } : null;
  if (plakat || (art === "serie" && !serie)) art = "hook";
  const bild = art === "objekt" ? { t: x.text || "", loc: "", img: x.bildUrl || null, luecke: !x.bildUrl } : null;
  const f = hmFd2Form(x, b, art);
  return { art, text: x.text || "", unter: x.unter || "", bild, serie, nr: x.nr, portrait: !!(x.gesicht && b && b.portrait), spiegel: x.nr % 2 === 0, ton, luecke: !!x.luecke, form: f.form, schnitt: f.schnitt, plakat, zahl: f.zahl || null };
}
/* Kachelform aus Platz und Inhalt: portrait (nah, halbnah, eigener Zeichner), welt (weit, Hook-Kachel der Welt), zahl (große Ziffer
   aus dem sichtbaren Beleg), objekt (eigenes Bild oder ruhige Fläche mit einem Satz), text (Papier oder Nacht nach Ton).
   Ohne Porträt werden die Gesichtsplätze Textkacheln; ihr Bild entsteht am Porträt-Termin (Lücke steht am Beitrag). */
function hmFd2Form(x, b, art) {
  if (art === "objekt") return { form: "objekt" };
  if (x.gesicht) {
    const schnitt = HM_FD2_SCHNITT[x.nr] || "weit";
    if (!(b && b.portrait)) return { form: "text", schnitt };
    return { form: schnitt === "weit" ? "welt" : "portrait", schnitt };
  }
  const tr = hmFd2Treffer(x.text);
  if (x.beleg && x.beleg.sichtbar && tr.length && /\d/.test(tr[0])) {
    const m = tr[0].match(/^(\d+(?:[.,]\d+)?)\s?(.+)$/);
    if (m) return { form: "zahl", zahl: { ziffer: m[1], einheit: m[2], rest: hmFd2S(x.text).replace(tr[0], "").replace(/[\s:,.]+$/, "").replace(/^[\s:,.]+/, "") } };
  }
  return { form: "text" };
}
/* Doppelte Sätze in der Caption zusammenführen (Hook, Skizze und Beleg sagen oft dasselbe).
   Steht der Beleg schon wörtlich weiter oben, entfällt der eigene Belegteil; x.beleg bleibt. */
function hmFd2Entdoppeln(x) {
  const t = x.captionTeile || {}; const l = x.captionLuecken || [];
  const gesehen = [];
  ["hook", "einloesung", "beleg", "weitergeben"].forEach((k) => {
    if (l.includes(k) || !hmFd2S(t[k])) return;
    if (k === "beleg") {
      const n = hmFd2Norm(t.beleg);
      if (gesehen.some((g) => g.includes(n))) { t.beleg = ""; x.herkunft.push({ teil: "Beleg", feld: "steht wörtlich schon weiter oben in der Caption" }); }
      else gesehen.push(n);
      return;
    }
    /* Zitate, die nur wiederholen, was schon oben steht, fallen weg ("in eigenen Worten: „...“") */
    const ohneZitat = hmFd2S(t[k]).replace(/\s*[„"]([^“”"]+)[“”"]/g, (m0, innen) => { const n = hmFd2Norm(innen); return n && gesehen.some((g) => g.includes(n)) ? "" : m0; });
    const rest = hmFd2Saetze(ohneZitat).filter((s) => { const n = hmFd2Norm(s); return n && !gesehen.some((g) => g.includes(n)); });
    const neu = rest.join(" ");
    if (neu !== hmFd2S(t[k])) {
      x.herkunft.push({ teil: k === "hook" ? "Erster Satz" : k === "einloesung" ? "Einlösung" : "Weitergeben", feld: "doppelte Sätze zusammengeführt" });
      if (!neu && k !== "hook") { t[k] = HM_FD2_LUECKE[k]; x.captionLuecken = l.concat([k]); x.captionEntwurf = (x.captionEntwurf || []).filter((e) => e !== k); return; }
      if (neu) t[k] = neu;
    }
    gesehen.push(hmFd2Norm(t[k]));
  });
  return x;
}
function hmFd2Seiten(x) {
  if (x.format !== "karussell") return [];
  const s = [{ nr: 1, rolle: "Titel", art: x.art, text: x.text, unter: x.unter }];
  if (x.beleg && x.beleg.zahl && !hmFd2Enthaelt(x.text, x.beleg.zahl)) s.push({ nr: 2, rolle: "Beleg", art: "hook", text: x.beleg.zahl + ".", unter: x.beleg.behauptung || "" });
  return s;
}

/* ---------- Hauptfunktion ---------- */
function hmFeed12(mid, variante, opt) {
  const v = variante === "gegenentwurf" ? "gegenentwurf" : "empfehlung";
  const o = opt || {};
  const m = o.makler ? { id: mid, ...o.makler } : (hmFd2Sicher(() => (hmStore.get("makler") || []).find((x) => x.id === mid), null) || { id: mid, name: "" });
  const b = hmFd2Sicher(() => hmBrand(mid), {}) || {};
  const p = o.plattform !== undefined ? o.plattform : hmFd2Sicher(() => (window.hmMbPlattform ? window.hmMbPlattform(mid) : null), null);
  const m2 = o.marke2 !== undefined ? (o.marke2 || {}) : hmFd2Sicher(() => (hmStore.get("marke2") || {})[mid], {}) || {};
  const welt = hmFd2Sicher(() => (window.hmMbWelt ? window.hmMbWelt(mid, p) : null), null) || ((typeof window !== "undefined" && window.HM_MARKENWELTEN) || [])[0] || null;
  const bb = { ...b, plattform: p };
  if (o.portrait !== undefined) bb.portrait = o.portrait || null;
  const anrede = o.anrede || hmFd2Sicher(() => (window.hmAnrede ? window.hmAnrede(mid, "instagram") : "Sie"), "Sie") || "Sie";
  const einw4 = o.einwilligung4 !== undefined ? o.einwilligung4 : hmFd2Sicher(() => (window.hmEinwilligung ? window.hmEinwilligung(mid, 4) : "offen"), "offen");
  const bilder = o.bilder !== undefined ? (o.bilder || []) : hmFd2Sicher(() => (window.hmBildBibliothek ? window.hmBildBibliothek(mid) : []), []);
  const fremd = hmFd2Sicher(() => (window.hmWeltObjekte ? window.hmWeltObjekte().map((x) => x.img) : []), []);
  const live = hmFd2Live(mid, m, o);
  const belege = hmFd2Belege(p);
  const preisBelege = hmFd2PreisBelege(p);
  const luecken = [];
  const hinweise = [];

  /* Quelle: gespeicherte Kacheln unverändert, sonst Regelpfad */
  const kach = m2.feed && Array.isArray(m2.feed.kacheln) && m2.feed.kacheln.length === 12 ? m2.feed.kacheln : null;
  let posts, quelle, signatur = null;
  if (kach) {
    quelle = "kacheln";
    posts = kach.map((k, i) => {
      const nr = Number(k && k.nr) || i + 1; const d = hmFd2Neu(nr);
      return { ...d, ...(k || {}), nr, id: "f" + nr, captionTeile: { ...d.captionTeile, ...((k && k.captionTeile) || {}) }, captionLuecken: (k && k.captionLuecken) || [], herkunft: ((k && k.herkunft) || []).concat([{ teil: "Kachel", feld: `marke2.feed.kacheln[${i}]` }]), befunde: [] };
    }).sort((a, b2) => a.nr - b2.nr);
  } else {
    quelle = p ? "plattform" : "leer";
    const r = hmFd2Regel(mid, p, { einw4, bilder, fremd, belege });
    posts = r.posts; signatur = r.signatur;
  }

  /* Grundton: in einer Welt mit dunklem Grund kehrt sich die Achse um */
  const F = (welt && welt.farben) || { grund: "#EEEBE5", text: "#25231F" };
  const grundDunkel = hmFd2Lum(F.grund) < hmFd2Lum(F.text);
  const tonNormal = v === "empfehlung" ? "grund" : (grundDunkel ? "hell" : "dunkel");
  const tonGegen = v === "empfehlung" ? (grundDunkel ? "hell" : "dunkel") : (grundDunkel ? "dunkel" : "hell");

  /* Folgen je Serie zählen, Daten, Captions, Ton, WeltPost-Daten */
  const zaehler = {};
  posts.forEach((x) => {
    if (x.serie && x.serie.name && x.serie.folge !== 0 && x.serie.folge == null) { zaehler[x.serie.name] = (zaehler[x.serie.name] || 0) + 1; x.serie = { ...x.serie, folge: zaehler[x.serie.name] }; }
    if (!x.datum) { x.datum = hmFd2Datum(live.iso, x.nr); x.herkunft.push({ teil: "Datum", feld: live.iso ? live.feld + (x.woche > 1 ? ", Di/Do/Sa" : "") : "Lücke" }); }
    if (!kach) hmFd2Entdoppeln(x);
    const t = x.captionTeile || {};
    x.caption = [t.hook, t.einloesung, t.beleg, t.weitergeben].some((s) => hmFd2S(s)) ? hmFd2Anrede([t.hook, t.einloesung, t.beleg, t.weitergeben].filter((s) => hmFd2S(s)).join("\n\n"), anrede) : hmFd2Anrede(x.caption, anrede);
    /* Ersatz kann aus hmStore stammen: erst kopieren, dann ergänzen */
    if (x.ersatz) {
      x.ersatz = { ...x.ersatz, captionTeile: { ...(x.ersatz.captionTeile || {}) }, captionLuecken: (x.ersatz.captionLuecken || []).slice(), herkunft: (x.ersatz.herkunft || []).slice() };
      if (!kach) hmFd2Entdoppeln(x.ersatz);
      const e = x.ersatz.captionTeile; x.ersatz.caption = hmFd2Anrede([e.hook, e.einloesung, e.beleg, e.weitergeben].filter((s) => hmFd2S(s)).join("\n\n"), anrede);
    }
    x.ton = x.gegenton ? tonGegen : tonNormal;
    x.daten = kach && x.daten ? { ...x.daten, ton: x.ton } : hmFd2Daten(x, bb, x.ton);
    if (!x.seiten || !x.seiten.length) x.seiten = hmFd2Seiten(x);
    /* Bildlücken: Gesicht ohne Porträt, Sache ohne eigenes Bild (die Fläche auf Folge 6 braucht keins) */
    if (!x.luecke && x.gesicht && !bb.portrait) x.luecke = { art: "bild", satz: "Ihr Bild für diesen Beitrag entsteht am Porträt-Termin.", auftrag: "Motiv aus dem Porträt-Termin nach Einstellung der Vorlage setzen (Kontaktbogen).", ersatz: null };
    else if (!x.luecke && !x.gesicht && !x.textgefuehrt && x.art !== "objekt") x.luecke = { art: "bild", satz: "Das Bild zu diesem Beitrag entsteht am Porträt-Termin.", auftrag: "Motiv ohne Gesicht nach der Bildsprache der Welt wählen (Ort, Detail, Raum), nie Archiv oder KI.", ersatz: null };
  });

  /* Profil */
  const bio = hmFd2Bio(p, anrede);
  const bezirk = hmFd2S(m.region).replace(/^\d{4}\s*/, "");
  const konto = hmFd2Konto(m2);
  const profil = {
    name: hmFd2S(m.name) || hmFd2S(b.makler && b.makler.name),
    konto,
    zeile: bezirk ? "Immobilien, " + bezirk : "Immobilien",
    bio: bio.zeilen,
    highlights: hmFd2Highlights(posts, welt && welt.id, bb),
    angepinnt: HM_FEED2_TAKT.angepinnt.slice(),
    profilbild: { url: bb.portrait || null, luecke: bb.portrait ? null : "Porträt aus dem Porträt-Termin" },
    herkunft: [{ teil: "Name", feld: "makler.name" }, { teil: "Kontoname", feld: konto ? "marke2.vorab.fakten.kanaele" : "Lücke" }, { teil: "Zeile", feld: bezirk ? "makler.region" : "Lücke" }].concat(bio.herkunft.map((f, i) => ({ teil: "Bio " + (i + 1), feld: bio.zeilen[i] ? f : "Lücke" }))),
  };

  /* Lücken sammeln, gleichartige zusammengefasst */
  const nrs = (fn) => posts.filter(fn).map((x) => x.nr).sort((a, c) => a - c);
  if (!bb.portrait) luecken.push({ was: "Porträt für Profilbild und die Gesichtskacheln " + nrs((x) => x.gesicht).join(", "), wer: "Makler", feld: "portraits" });
  if (!konto) luecken.push({ was: "Kontoname folgt", wer: "Makler", feld: "marke2.vorab.fakten.kanaele" });
  if (!bezirk) luecken.push({ was: "Bezirk für die Profilzeile", wer: "Team", feld: "makler.region" });
  bio.zeilen.forEach((z, i) => {
    if (z) return;
    if (bio.grund[i] === "satzteil") luecken.push({ was: "Bio-Zeile 1: positionierung.was ist ein Satzteil (Relativsatz) und muss als eigene Zeile formuliert werden, höchstens 60 Zeichen", wer: "Team", feld: "plattform.stimme.beispiele (wo: Bio) oder plattform.positionierung.was" });
    else luecken.push({ was: `Bio-Zeile ${i + 1} (höchstens 60 Zeichen, zusammen 150)`, wer: "Team", feld: "plattform.stimme.beispiele (wo: Bio)" });
  });
  profil.highlights.forEach((h) => { if (h.gekuerzt) luecken.push({ was: `Highlight-Name "${h.name}" für die Serie "${h.serie}" freigeben`, wer: "Team", feld: "plattform.saeulen[].serie.name" }); });
  if (!live.iso) luecken.push({ was: "Live-Tag folgt", wer: "Team", feld: "auftrag.termine.live" });
  else if (live.geschaetzt) luecken.push({ was: `Live-Tag ist geschätzt (Vorschlag ${hmFd2DatumLang(live.iso)}${live.verschoben ? ", weil " + hmFd2DatumLang(live.verschoben) + " ein Feiertag ist" : ""}), Termin eintragen`, wer: "Team", feld: "auftrag.termine.live" });
  if (live.verschoben) hinweise.push(`Der geschätzte Live-Tag ${hmFd2DatumLang(live.verschoben)} ist ein Feiertag oder Sonntag. Vorgeschlagen ist ${hmFd2DatumLang(live.iso)}.`);
  else if (live.iso && hmFd2Feiertag(live.iso)) hinweise.push(`Der Live-Tag ${hmFd2DatumLang(live.iso)} ist ein Feiertag: die erste Woche ginge an diesem Tag vollständig online. Termin mit dem Makler prüfen.`);
  preisBelege.forEach((b) => luecken.push({ was: `Beleg ${b.ref} nennt einen Kaufpreis und bleibt aus dem Feed. Ohne Preis neu fassen, wenn er gezeigt werden soll`, wer: "Team", feld: `plattform.beweise[${b.i}].beleg` }));
  const capPreis = nrs((x) => (x.captionPreis || []).length);
  if (capPreis.length) luecken.push({ was: "Caption ohne Kaufpreis neu schreiben für Folge " + capPreis.join(", "), wer: "Team", feld: "plattform.saeulen[].serie.beispiele[]" });
  const entwurf = nrs((x) => (x.captionEntwurf || []).length);
  if (entwurf.length) luecken.push({ was: "Einlösung aus der Skizze in der Stimme ausformulieren für Folge " + entwurf.join(", "), wer: "Team", feld: "plattform.saeulen[].serie.beispiele[].skizze" });
  const sacheBild = nrs((x) => x.luecke && x.luecke.art === "bild" && !x.gesicht);
  if (sacheBild.length) luecken.push({ was: "Motive ohne Gesicht für Folge " + sacheBild.join(", "), wer: "Team", feld: "bild.kontaktbogen" });
  posts.forEach((x) => { if (x.luecke && (x.luecke.art === "text" || x.luecke.art === "objekt")) luecken.push({ was: `Folge ${x.nr}: ${x.luecke.auftrag}`, wer: x.luecke.art === "objekt" && einw4 !== "ja" ? "Makler" : "Team", feld: x.luecke.art === "objekt" ? "auftrag.einwilligungen.4, webbilder" : "plattform.saeulen[].serie.beispiele" }); });
  ["einloesung", "weitergeben", "hook"].forEach((k) => { const l = nrs((x) => (x.captionLuecken || []).includes(k) && !(x.luecke && x.luecke.art === "text")); if (l.length) luecken.push({ was: `Caption, ${k === "einloesung" ? "Einlösung" : k === "weitergeben" ? "Satz zum Weitergeben" : "erster Satz"} für Folge ${l.join(", ")}`, wer: "Team", feld: k === "weitergeben" ? "plattform.saeulen[].serie.weitergeben" : "plattform.saeulen[].serie.beispiele[].skizze" }); });
  const pruefBel = nrs((x) => x.beleg && x.beleg.status === "selbstauskunft");
  if (pruefBel.length) luecken.push({ was: "Unterlagen für die Belege in Folge " + pruefBel.join(", "), wer: "Makler", feld: "plattform.beweise[].quelle" });

  /* Achse: Grundton in derselben Welt */
  const achseIdee = m2.idee && m2.idee.gezeigt && m2.idee.gezeigt.achse;
  if (achseIdee && achseIdee !== "tonwert") hinweise.push(`Achse ${achseIdee} kann der Renderer noch nicht, gezeigt wird der Grundton.`);
  const achse = { name: "tonwert", pole: ["papier", "dunkel"], satz: grundDunkel ? HM_FD2_ACHSE_DUNKEL : HM_FD2_ACHSE_HELL };

  /* Wochen: Pin-Reihe, darunter der Strom, neueste Zeile oben */
  const wochen = [1, 2, 3, 4].map((w) => {
    const zeilen = [HM_FEED2_TAKT.angepinnt.slice()];
    for (let k = w; k >= 2; k--) zeilen.push([3 * k, 3 * k - 1, 3 * k - 2]);
    const erster = posts.find((x) => x.nr === (w === 1 ? 1 : 3 * w - 2));
    return { woche: w, datum: erster ? erster.datum : null, zeilen };
  });

  const feed = {
    mid, variante: v, welt, b: bb, anrede, quelle, signatur, live, achse, hinweise,
    posts: posts.slice().sort((a, c) => c.nr - a.nr),
    profil, wochen, pruefung: [], luecken,
  };
  feed.pruefung = hmFd2Pruefen(feed, { fremd, belege, preisBelege, einw4, p, bio });
  return feed;
}

/* ---------- Prüfung ---------- */
function hmFd2Pruefen(f, ctx) {
  const out = [];
  const P = (name, ok, detail, stufe) => out.push({ name, ok: !!ok, detail: detail || "", stufe: stufe || (ok ? "ok" : "fehler") });
  const posts = f.posts; const nach = posts.slice().sort((a, b) => a.nr - b.nr);
  const woche = (w) => nach.filter((x) => x.woche === w);
  posts.forEach((x) => { x.befunde = []; });
  const B = (x, name, ok, detail) => x.befunde.push({ name, ok: !!ok, detail: detail || "" });

  P("Zwölf Beiträge, neuester zuerst", posts.length === 12 && posts[0].nr === 12 && posts[11].nr === 1, posts.map((x) => x.nr).join(", "));
  const jeWoche = [1, 2, 3, 4].map((w) => woche(w).map((x) => x.platz).join(""));
  P("Vier Wochen mit je drei Plätzen", jeWoche.every((s) => s === "123"), jeWoche.map((s, i) => `Woche ${i + 1}: ${s.length}`).join(", "));
  P("Angepinnt 3, 2, 1", f.profil.angepinnt.join() === "3,2,1", "Anzeige links nach rechts: " + f.profil.angepinnt.join(", "));
  const ges = nach.filter((x) => x.gesicht); const gw = [1, 2, 3, 4].map((w) => woche(w).filter((x) => x.gesicht).length);
  P("Gesicht auf Platz 1 und 2", ges.length === 8 && gw.every((n) => n <= 2) && ges.every((x) => x.platz <= 2), `geplant ${ges.length} von 12, je Zeile ${gw.join(", ")}`);
  /* Was wirklich zu sehen ist: das Porträt muss in der Kachel gezeichnet sein, nicht nur geplant */
  const weltId = f.welt && f.welt.id;
  const sieht = (x) => hmFd2PortraitSichtbar(x.daten, f.b, weltId);
  nach.forEach((x) => { if (x.gesicht && f.b && f.b.portrait) B(x, "Gesicht sichtbar gezeichnet", sieht(x), sieht(x) ? "Porträt in der Kachel" : `Kachelform "${x.daten && x.daten.art}" zeigt in dieser Welt kein Porträt`); });
  if (!(f.b && f.b.portrait)) P("Gesicht sichtbar gezeichnet", true, "Porträt fehlt: die acht Gesichtsplätze füllen sich am Porträt-Termin", "meldung");
  else { const ohneG = ges.filter((x) => !sieht(x)).map((x) => x.nr); P("Gesicht sichtbar gezeichnet", !ohneG.length, ohneG.length ? "Kein Porträt sichtbar in Folge " + ohneG.join(", ") : "alle acht Gesichtsplätze zeigen das Porträt"); }
  const gt = nach.filter((x) => x.gegenton).map((x) => x.nr);
  P("Gegenton nur Folge 6 und 12", gt.join() === "6,12", gt.length ? "Gegenton auf " + gt.join(", ") : "kein Gegenton");
  const pins = nach.filter((x) => x.nr <= 3);
  P("Pin-Kante", pins.every((x) => !x.gegenton && !x.textgefuehrt), pins.filter((x) => x.gegenton || x.textgefuehrt).map((x) => "Folge " + x.nr).join(", ") || "keine Pin-Kachel Gegenton oder textgeführt");
  const tf = nach.filter((x) => x.textgefuehrt);
  P("Textgeführt nur auf dem Sachplatz mit Gegenton", tf.every((x) => x.platz === 3 && x.gegenton) && tf.length <= 2, tf.map((x) => "Folge " + x.nr).join(", ") || "keine");

  /* Belege */
  const sichtbar = (x) => x.beleg && x.beleg.sichtbar;
  const ohne = [1, 2, 3, 4].filter((w) => !woche(w).some(sichtbar)).map((w) => (w === 1 ? "Pin-Reihe" : "Woche " + w));
  P("Beleg sichtbar je Zeile", true, ohne.length ? "Ohne sichtbaren Beleg: " + ohne.join(", ") : "jede Zeile trägt einen Beleg", ohne.length ? "meldung" : "ok");
  const doppelt = [2, 3, 4].filter((w) => woche(w).filter(sichtbar).length > 1);
  P("Höchstens ein sichtbarer Beleg je Woche", !doppelt.length, doppelt.length ? "Mehr als einer in Woche " + doppelt.join(", ") : "erfüllt");
  const pinRefs = pins.filter((x) => x.beleg).map((x) => x.beleg.ref);
  P("Beleg in der Pin-Reihe höchstens einmal", new Set(pinRefs).size === pinRefs.length, pinRefs.length ? pinRefs.join(", ") : "kein Beleg in der Pin-Reihe");
  const alleRefs = nach.filter((x) => x.beleg).map((x) => x.beleg.ref);
  P("Jeder Beleg höchstens einmal im Takt", new Set(alleRefs).size === alleRefs.length, alleRefs.join(", ") || "keine Belege");
  const falsch = [];
  nach.forEach((x) => {
    const tr = hmFd2Treffer(x.text);
    if (sichtbar(x)) {
      const ok = tr.length > 0 && tr.every((t) => hmFd2Enthaelt(x.beleg.text, t));
      B(x, "Beleg-Zahl wörtlich", ok, tr.join(", ") || "keine Zahl im Bild");
      if (!ok) falsch.push(x.nr);
    } else if (x.beleg) {
      const ok = tr.every((t) => hmFd2Enthaelt(x.beleg.text, t));
      B(x, "Beleg-Zahl wörtlich", ok, (tr.join(", ") || "keine Zahl im Bild") + ", Beleg nur in der Caption");
      if (!ok) falsch.push(x.nr);
    } else if (tr.some((t) => /\d/.test(t))) { falsch.push(x.nr); B(x, "Zahl ohne Beleg", false, tr.join(", ")); }
  });
  P("Beleg-Zahl im Bild wörtlich aus dem Beleg", !falsch.length, falsch.length ? "Folge " + falsch.join(", ") : "erfüllt");
  const zweit = nach.filter((x) => x.beleg && !x.beleg.sichtbar && hmFd2Treffer(x.text).length).map((x) => x.nr);
  P("Zweite Zahl in einer Woche", true, zweit.length ? `Folge ${zweit.join(", ")}: Zahl im Bild, Beleg nur in der Caption. Team prüft einen Tausch` : "keine", zweit.length ? "meldung" : "ok");
  /* Kaufpreise nie: weder im Beleg noch in Text im Bild oder Caption */
  const mitPreis = nach.filter((x) => hmFd2Preis([x.text, x.unter, x.caption, x.beleg && x.beleg.text].filter(Boolean).join(" "))).map((x) => x.nr);
  nach.forEach((x) => { if (mitPreis.includes(x.nr)) B(x, "Kein Kaufpreis", false, "Preis in Text im Bild, Caption oder Beleg"); });
  const aus = (ctx.preisBelege || []).map((b) => b.ref);
  P("Kein Kaufpreis im Beleg", !mitPreis.length, (mitPreis.length ? "Kaufpreis in Folge " + mitPreis.join(", ") : "kein Preis im Feed") + (aus.length ? "; ausgeschlossen: " + aus.join(", ") : ""));
  const sa = nach.filter((x) => x.beleg && x.beleg.status === "selbstauskunft").map((x) => x.nr);
  P("Belege mit Prüfvermerk", true, sa.length ? "Selbstauskunft in Folge " + sa.join(", ") + ", Unterlage vor dem Live-Tag" : "keine offenen Vermerke", sa.length ? "meldung" : "ok");

  /* Worte */
  const lang = [];
  nach.forEach((x) => { const n = hmFd2Woerter(x.text); B(x, "Text im Bild höchstens acht Wörter", n <= 8, n + " Wörter"); if (n > 8) lang.push(`Folge ${x.nr}: ${n} Wörter`); });
  P("Text im Bild höchstens acht Wörter", !lang.length, lang.join(", ") || "erfüllt");
  const hl = [];
  nach.forEach((x) => { const h = hmFd2S(x.captionTeile && x.captionTeile.hook); if (h && !(x.captionLuecken || []).includes("hook")) { B(x, "Erster Satz höchstens 90 Zeichen", h.length <= 90, h.length + " Zeichen"); if (h.length > 90) hl.push(`Folge ${x.nr}: ${h.length}`); } });
  P("Erster Satz höchstens 90 Zeichen", !hl.length, hl.join(", ") || "erfüllt");
  const spr = [];
  nach.forEach((x) => { const f2 = hmFd2Sprache([x.text, x.unter, x.caption].join("\n")); B(x, "Sprachprüfung", !f2.length, f2.join(", ") || "sauber"); if (f2.length) spr.push(`Folge ${x.nr}: ${f2.join(", ")}`); });
  const fp = hmFd2Sprache([f.profil.zeile].concat(f.profil.bio.filter(Boolean)).join("\n"));
  if (fp.length) spr.push("Profil: " + fp.join(", "));
  P("Sprachprüfung", !spr.length, spr.join("; ") || "keine Ausrufezeichen, keine Gedankenstriche, keine Formelsätze");

  /* Bilder */
  const bilder = [];
  nach.forEach((x) => { if (x.daten && x.daten.bild && x.daten.bild.img) bilder.push(x.daten.bild.img); });
  const fremdeBilder = bilder.filter((u) => (ctx.fremd || []).includes(u) || /assets\/img\//.test(u));
  P("Kein fremdes Bild", !fremdeBilder.length, fremdeBilder.length ? fremdeBilder.join(", ") : "nur eigene Bilder oder Lücken");
  const x12 = nach.find((x) => x.nr === 12);
  P("Folge 12 Wechselplatz", true, x12 && x12.luecke && x12.luecke.art === "objekt" ? `Lückenkachel, ${x12.luecke.grund} Ersatz: ${x12.luecke.ersatz && x12.luecke.ersatz.titel ? x12.luecke.ersatz.titel : "fehlt"}` : "eigenes Objekt mit Bild", x12 && x12.luecke && x12.luecke.art === "objekt" && !(x12.luecke.ersatz && x12.luecke.ersatz.titel) ? "meldung" : "ok");

  /* Profil */
  P("Profilbild", true, f.profil.profilbild.url ? "Porträt 1:1" : "Lücke bis zum Porträt-Termin", f.profil.profilbild.url ? "ok" : "meldung");
  P("Kontoname", true, f.profil.konto ? f.profil.konto : "Kontoname folgt, Quelle marke2.vorab.fakten.kanaele", f.profil.konto ? "ok" : "meldung");
  const bioT = f.profil.bio.filter(Boolean);
  const bioOk = f.profil.bio.length === 3 && bioT.every((z) => z.length <= 60) && bioT.join("\n").length <= 150;
  P("Bio drei Zeilen, höchstens 150 Zeichen", bioOk, `${bioT.join("\n").length} Zeichen, ${3 - bioT.length} Zeilen als Lücke`);
  const teil = ((ctx.bio && ctx.bio.grund) || []).indexOf("satzteil");
  P("Bio in ganzen Zeilen", true, teil >= 0 ? `Zeile ${teil + 1} wäre ein Satzteil (positionierung.was), steht als Lücke` : "keine Satzteile", teil >= 0 ? "meldung" : "ok");
  const liveFei = hmFd2Feiertag(f.live.iso);
  P("Live-Tag", true, f.live.iso ? `${hmFd2DatumLang(f.live.iso)}${f.live.geschaetzt ? ", geschätzt" : ""}${f.live.verschoben ? ", verschoben vom Feiertag " + hmFd2DatumLang(f.live.verschoben) : ""}${liveFei ? ", fällt auf einen Feiertag" : ""}` : "Live-Tag folgt", f.live.iso && !f.live.geschaetzt && !liveFei ? "ok" : "meldung");
  const capL = nach.filter((x) => (x.captionLuecken || []).length).length;
  P("Captions vollständig", true, capL ? `${capL} von 12 mit Lücken, schreibt das Team` : "alle Teile vorhanden", capL ? "meldung" : "ok");
  /* Fünf-Sekunden-Blick auf Woche 4 mit verdeckter Bio: für wen, wofür, wo, zwei Gesichter je Zeile */
  const pos = (ctx.p && ctx.p.positionierung) || {};
  const fuerWen = hmFd2Wert(pos.fuerWen);
  const wo = /,\s*\S/.test(f.profil.zeile);
  const gesichtSicht = [1, 2, 3, 4].map((w) => woche(w).filter(sieht).length);
  const fuenf = !!fuerWen && wo && gesichtSicht.every((n) => n === 2);
  P("Fünf-Sekunden-Blick", true, `für wen: ${fuerWen ? "ja" : "fehlt"}; wo: ${wo ? "ja" : "fehlt"}; sichtbare Gesichter je Zeile: ${gesichtSicht.join(", ")}`, fuenf ? "ok" : "meldung");
  return out;
}

/* ---------- Hooks ---------- */
function hmFd2Sig(v) { return JSON.stringify(v == null ? null : v, (k, x) => (typeof x === "string" && x.length > 160 ? x.length + ":" + x.slice(0, 40) + x.slice(-40) : x)); }
function useHmFeed12(mid, variante, aus) {
  const pl = useHm("plattformen"), m2 = useHm("marke2"), br = useHm("branding"), po = useHm("portraits"), au = useHm("auftrag");
  const [bilderStand, setBilderStand] = React.useState(0);
  /* Eigene Bilder liegen in IndexedDB: einmal laden, dann neu rechnen */
  React.useEffect(() => {
    let weg = false;
    if (!aus && window.hmWebBlobsLaden) Promise.resolve(window.hmWebBlobsLaden(mid)).then(() => { if (!weg) setBilderStand((x) => x + 1); }).catch(() => {});
    return () => { weg = true; };
  }, [mid, aus]);
  const welt = hmFd2Sicher(() => ((hmStore.get("markenbuch") || {})[mid] || {}).welt, "");
  const sig = hmFd2Sig([pl && pl[mid], m2 && m2[mid], br && br[mid], po && po[mid], au && au[mid], welt, bilderStand]);
  return React.useMemo(() => (aus ? null : hmFeed12(mid, variante)), [mid, variante, sig, aus]);
}
function useHmFd2Breite(ref, start) {
  const [w, setW] = React.useState(start);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const x0 = Math.floor(el.getBoundingClientRect().width); if (x0 > 0) setW(x0);
    if (typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver((e) => { const x = Math.floor(e[0].contentRect.width); if (x > 0) setW(x); });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return w;
}

/* ---------- Oberfläche ---------- */
function HmFd2Ico({ n, g = 24, sw = 1.5 }) {
  return <svg width={g} height={g} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={HM_FD2_ICO[n]} /></svg>;
}
function HmFd2Punkt() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="8" cy="8" r="4.5" /></svg>;
}
/* Statusleiste: Uhrzeit, Empfang, WLAN und Akku als feine Striche */
function HmFd2Status({ insel }) {
  return <div className="hm-fd2-status" aria-hidden="true">
    <span>{HM_FD2_UI.uhr}</span>
    {insel && <span className="insel" />}
    <span className="rechts">
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M1.5 10.5v-2M5.5 10.5v-4M9.5 10.5v-6M13.5 10.5v-8" /></svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M1.5 4.2a9.5 9.5 0 0 1 13 0M4 6.8a6 6 0 0 1 8 0M6.6 9.4a2.4 2.4 0 0 1 2.8 0" /></svg>
      <svg width="26" height="12" viewBox="0 0 26 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="1.5" width="21" height="9" rx="2.5" /><path d="M24 4.5v3" /><rect x="3" y="3.5" width="14" height="5" rx="1" fill="currentColor" stroke="none" /></svg>
    </span>
  </div>;
}
/* Gerät: mit Rahmen (Ecken 44 px, Rand 10 px) oder als nackter Bildschirm bei schmalen Containern */
function HmFd2Geraet({ rahmen, breite, children }) {
  const S = rahmen ? breite - 20 : breite;
  const screen = <div className="hm-fd2-screen" style={{ width: S }}><HmFd2Status insel={rahmen} />{children}{rahmen && <div className="hm-fd2-heim"><span /></div>}</div>;
  return rahmen ? <div className="hm-fd2-phone" style={{ width: breite }}>{screen}</div> : screen;
}
function HmFd2Nav({ links, mitte, rechts, leise }) {
  return <div className="hm-fd2-nav" aria-hidden="true">
    <span className="ico">{links ? <HmFd2Ico n={links} /> : null}</span>
    <div className={"mitte" + (leise ? " leise" : "")}>{mitte}</div>
    <span className="ico">{rechts ? <HmFd2Ico n={rechts} /> : null}</span>
  </div>;
}

/* ---------- Eigener Kachel-Zeichner (Porträt nah und halbnah, Zahl, Text, Objekt) ---------- */
function hmFd2Zeichnen(c, p) {
  const { W, H, r } = c; const L = H - r; const bw = W - 2 * r;
  const objektOhne = p.form === "objekt" && !(p.bild && p.bild.img);
  const t = c.ton(objektOhne ? "flaeche" : (p.ton || "grund"));
  const el = [hmWGrund(W, H, t.bg)];
  const kennung = p.plakat ? HM_FD2_UI.staffel : p.serie && p.serie.name ? `${p.serie.name} ${hmFd2Zwei(p.serie.nr)}` : "";
  const fuss = () => {
    el.push(hmWName(c, { x: r, y: H - 46, size: 30, fill: t.fg, maxW: W * 0.5 }));
    if (kennung) el.push(hmWText(c, c.S(kennung, { size: 26, w: W * 0.4, zeilen: 1 }), { x: W - r, unten: H - 46, fill: t.leise, anchor: "end", tab: true }));
  };
  if (p.form === "portrait") {
    const lage = hmFd2PortraitLage(p.schnitt, p.spiegel);
    const nah = p.schnitt === "nah";
    /* Text oben auf dem Grund, das Porträt steht auf der Standlinie; nah: Kopf rund 40 Prozent, halbnah rund 20 Prozent der Höhe */
    const s = nah
      ? c.S(p.text, { d: 1, size: p.plakat ? 132 : 96, min: 56, w: bw, zeilen: 2, lh: 1.04, hoehe: 200 })
      : c.S(p.text, { d: 1, size: 84, min: 48, w: bw, zeilen: 3, lh: 1.06, hoehe: lage.y - r - 30 });
    el.push(hmWPortrait(c, { ...lage, d: hmWPfadRechteck(0, 0, W, L), zoom: 1 }));
    el.push(hmWText(c, s, { x: r, y: r, fill: t.fg }));
    fuss();
  } else if (p.form === "zahl") {
    const z = p.zahl || { ziffer: p.text, einheit: "", rest: "" };
    const label = z.rest || p.unter || "";
    if (label) el.push(hmWText(c, c.S(label, { size: 40, min: 30, w: bw, zeilen: 2, lh: 1.15 }), { x: r, y: r, fill: t.leise }));
    el.push(hmWText(c, c.S(z.ziffer, { d: 1, size: 460, min: 200, w: bw, zeilen: 1, lh: 1, ls: -0.04 }), { x: r - 12, unten: 780, fill: t.akz, tab: true }));
    if (z.einheit) el.push(hmWText(c, c.S(z.einheit, { d: 1, size: 96, min: 56, w: bw, zeilen: 1 }), { x: r, unten: 900, fill: t.fg }));
    if (p.unter && p.unter !== label) el.push(hmWText(c, c.S(p.unter, { size: 36, min: 28, w: bw, zeilen: 2, lh: 1.2 }), { x: r, unten: L - 30, fill: t.fg }));
    fuss();
  } else if (p.form === "objekt") {
    if (!objektOhne) el.push(hmWBild(c, { x: 0, y: 0, w: W, h: L, src: p.bild.img }));
    else el.push(hmWText(c, c.S(p.text || HM_FD2_UI.objektLuecke, { d: 1, size: 76, min: 44, w: bw, zeilen: 3, lh: 1.08 }), { x: r, y: r, fill: t.fg }));
    fuss();
  } else {
    /* Text in Papier oder Nacht: die textgeführte Satzart, Text oben links, viel Fläche */
    el.push(hmWText(c, c.S(p.text, { d: 1, size: 104, min: 56, w: bw, zeilen: 5, lh: 1.06, hoehe: L - r - 90 }), { x: r, y: r, fill: t.fg }));
    if (p.unter && p.unter !== p.text) el.push(hmWText(c, c.S(p.unter, { size: 34, min: 28, w: bw, zeilen: 2, lh: 1.2 }), { x: r, unten: L - 30, fill: t.leise }));
    fuss();
  }
  return el;
}
function HmFd2Eigen({ daten, welt, b, breite, eng }) {
  useHmSchrift();
  const w = hmWeltHol(welt); const bb = b || {};
  useHmWeltSchriften(bb, w);
  const uid = useHmWeltUid();
  const c = hmWeltCtx(w, bb, 1080, 1350, uid);
  return <svg className="hm-welt-svg" width={breite} height={Math.round(breite * (eng ? 4 / 3 : 1.25))} viewBox={eng ? "33.75 0 1012.5 1350" : "0 0 1080 1350"} role="img" aria-label={`${w.name}, ${daten.text || HM_FD2_UI.objektLuecke}`} xmlns="http://www.w3.org/2000/svg">{hmFd2Zeichnen(c, daten)}</svg>;
}
/* Bild einer Kachel: eigene Form oder die Kachel der Markenwelt */
function HmFd2Bild({ daten, welt, b, breite, eng }) {
  const eigen = daten && daten.form && daten.form !== "welt" && typeof hmWeltCtx === "function";
  if (eigen) return <HmFd2Eigen daten={daten} welt={welt} b={b} breite={breite} eng={eng} />;
  return <WeltPost welt={welt} b={b} daten={daten} breite={breite} format={eng ? "3:4" : undefined} />;
}
/* Blickpunkt je Kachel auf der Fläche 1080 x 1350, für das Titelbild der Highlights */
function hmFd2Fokus(daten, b, weltId) {
  const fk = HM_FD2_FOKUS[weltId] || HM_FD2_FOKUS.ruhig;
  if (!daten) return fk.t;
  if (daten.form === "portrait") return hmFd2PortraitLage(daten.schnitt, daten.spiegel).face;
  if (daten.form === "zahl") return [420, 620];
  if (daten.form === "text" || daten.form === "objekt") return [340, 260];
  const port = hmFd2PortraitSichtbar(daten, b, weltId);
  return port ? (fk.ps && daten.spiegel ? fk.ps : fk.p) : fk.t;
}

/* Ist der Grund der Kachel hell? Dann steht der Pin in Tinte statt in Weiß */
function hmFd2KachelHell(daten, welt, b) {
  try {
    const F = hmWeltFarben(welt, b || {});
    if (daten && daten.form === "objekt" && daten.bild && daten.bild.img) return false;
    const ton = daten && daten.form === "objekt" ? "flaeche" : (daten && daten.ton) || "grund";
    const bg = ton === "dunkel" ? F.dunkel : ton === "hell" ? F.hell : ton === "flaeche" ? F.flaeche : F.grund;
    return hmFd2Lum(bg) > 0.4;
  } catch (e) { return false; }
}
function FeedKachel({ post, welt, b, breite, onClick }) {
  const label = [post.serie && post.serie.name ? post.serie.name : "Beitrag " + post.nr, hmFd2FolgeText(post), post.text || (post.luecke ? post.luecke.satz : "")].filter(Boolean).join(", ");
  const hell = post.angepinnt && hmFd2KachelHell(post.daten, welt, b);
  return <button type="button" className="hm-fd2-kachel" aria-label={label} onClick={onClick} style={{ width: breite, height: Math.round(breite * 4 / 3) }}>
    <HmFd2Bild daten={post.daten} welt={welt} b={b} breite={breite} eng />
    {post.angepinnt && <span className={"hm-fd2-pin" + (hell ? " hell" : "")}><HmFd2Ico n="pin" g={14} sw={2} /></span>}
  </button>;
}

/* Titelbild im 64-px-Kreis: vergrößerter Ausschnitt der Kachel, ausgerichtet auf das Gesicht oder die erste Textzeile */
function HmFd2Titelbild({ post, welt, b }) {
  const B = 182; const k = B / 1080;
  const id = (welt && welt.id) || "ruhig";
  const [cx, cy] = hmFd2Fokus(post.daten, b, id);
  const left = Math.min(0, Math.max(64 - B, Math.round(32 - cx * k)));
  const top = Math.min(0, Math.max(64 - Math.round(B * 1.25), Math.round(32 - cy * k)));
  return <span className="hm-fd2-hl-bild" style={{ left, top }}><HmFd2Bild daten={post.daten} welt={welt} b={b} breite={B} /></span>;
}

function hmFd2WochenSatz(w, datum) {
  if (w === 1) return datum ? `Woche 1: die ersten drei Beiträge gehen am ${hmFd2DatumLang(datum)} gemeinsam online.` : HM_FD2_UI.woche1;
  return `Woche ${w}: ${HM_FD2_UI.wocheN}`;
}
function FeedWochen({ feed, woche, setWoche }) {
  const akt = feed.wochen[Math.min(4, Math.max(1, woche)) - 1];
  return <>
    <div className="hm-fd2-wochen" role="group" aria-label="Woche wählen">
      {feed.wochen.map((w) => <button key={w.woche} type="button" aria-pressed={woche === w.woche} className={woche === w.woche ? "on" : ""} onClick={() => setWoche(w.woche)}>
        <span className="t">Woche {w.woche}</span><span className="d">{hmFd2DatumKurz(w.datum)}</span>
        {hmFd2Feiertag(w.datum) && <span className="d">Feiertag</span>}
      </button>)}
    </div>
    <p className="hm-fd2-wochensatz" aria-live="polite">{hmFd2WochenSatz(akt.woche, akt.datum)}</p>
  </>;
}
/* Nachbar in der angezeigten Reihenfolge des Wochenstands (links oben zuerst) */
function hmFd2Nachbar(feed, woche, nr, delta) {
  const reihe = feed.wochen[Math.min(4, Math.max(1, woche)) - 1].zeilen.flat();
  const i = reihe.indexOf(nr); if (i < 0) return null;
  const j = i + delta; return j >= 0 && j < reihe.length ? reihe[j] : null;
}

function FeedProfil({ m, variante = "empfehlung", woche = 4, onWoche, breite = 390, onBeitrag, teamSicht, feed, rahmen }) {
  hmFeed2Stil();
  const eigen = useHmFeed12(m.id, variante, !!feed);
  const f = feed || eigen;
  const ref = React.useRef(null);
  const W0 = useHmFd2Breite(ref, breite);
  const W = Math.max(240, Math.min(breite, W0));
  const mitRahmen = rahmen !== undefined ? !!rahmen : W0 >= 420;
  const S = mitRahmen ? W - 20 : W;
  /* Nur neu hinzukommende Zeilen blenden ein (sie werden frisch eingehängt), nie beim Zurückgehen */
  const wAkt = Math.min(4, Math.max(1, woche || 4));
  const letzte = React.useRef(wAkt); const neuVon = React.useRef(99);
  if (letzte.current !== wAkt) { neuVon.current = wAkt > letzte.current ? letzte.current + 1 : 99; letzte.current = wAkt; }
  const g = 2;
  const kachel = Math.floor(((S - 2 * g) / 3) * 10) / 10;
  const stand = f.wochen[wAkt - 1];
  const nachNr = (nr) => f.posts.find((x) => x.nr === nr);
  const pr = f.profil;
  const sichtbar = stand.zeilen.flat().filter((nr) => nachNr(nr)).length;
  /* Ohne onBeitrag öffnet das Profil den Beitrag selbst, damit jede Kachel als Schaltfläche auch wirkt */
  const [offenNr, setOffenNr] = React.useState(null);
  const oeffne = (x) => { if (onBeitrag) onBeitrag(x); else setOffenNr(x.nr); };
  const offenPost = !onBeitrag && offenNr != null ? nachNr(offenNr) : null;
  const blaettern = (d) => { const n = hmFd2Nachbar(f, wAkt, offenNr, d); if (n != null) setOffenNr(n); };
  const akzent = (f.b && f.b.akzent) || "#33503F";
  return <div className="hm-fd2-geraet" ref={ref} style={{ maxWidth: breite }} data-variante={f.variante} data-team={teamSicht ? "ja" : undefined}>
    {onWoche && <FeedWochen feed={f} woche={wAkt} setWoche={onWoche} />}
    <HmFd2Geraet rahmen={mitRahmen} breite={W}>
      <HmFd2Nav links="zurueck" rechts="punkte" mitte={pr.konto || HM_FD2_UI.kontoFolgt} leise={!pr.konto} />
      <div className="hm-fd2-kopf">
        <div className="hm-fd2-oben">
          <div className={"hm-fd2-bild" + (pr.profilbild.url && sichtbar ? " ring" : "")} style={{ "--fd2-akzent": akzent }}>
            <div className={"innen" + (pr.profilbild.url ? "" : " luecke")}>{pr.profilbild.url ? <img src={pr.profilbild.url} alt={"Porträt " + pr.name} /> : <span>{HM_FD2_UI.profilbildLuecke}</span>}</div>
          </div>
          <div className="hm-fd2-zahlen">
            <div><div className="n">{sichtbar}</div><div className="l">{HM_FD2_UI.beitraege}</div></div>
            <div><div className="n leise">{HM_FD2_UI.folgt}</div><div className="l">{HM_FD2_UI.follower}</div></div>
            <div><div className="n leise">{HM_FD2_UI.folgt}</div><div className="l">{HM_FD2_UI.gefolgt}</div></div>
          </div>
        </div>
        <div className="hm-fd2-wer">
          <div className="hm-fd2-name">{pr.name}</div>
          <div className="hm-fd2-zeile">{pr.zeile}</div>
          <div className="hm-fd2-bio">{pr.bio.map((z, i) => (z ? <div key={i}>{z}</div> : (i === 0 || pr.bio[i - 1]) ? <div key={i} className="hm-fd2-leise">{HM_FD2_UI.bioLuecke}</div> : null))}</div>
        </div>
        <div className="hm-fd2-tasten" aria-hidden="true"><span className="voll">{HM_FD2_UI.folgen}</span><span>{HM_FD2_UI.nachricht}</span></div>
      </div>
      <div className="hm-fd2-hls">{pr.highlights.map((h, i) => {
        const x = h.coverNr ? nachNr(h.coverNr) : null;
        return <button key={i} type="button" className="hm-fd2-hl" disabled={!x} onClick={() => x && oeffne(x)} aria-label={h.name ? "Highlight " + h.name : "Highlight folgt"}>
          <span className="hm-fd2-hl-kreis">{x ? <HmFd2Titelbild post={x} welt={f.welt} b={f.b} /> : null}</span>
          <span className={"hm-fd2-hl-name" + (h.name ? "" : " hm-fd2-leise")}>{h.name || HM_FD2_UI.hlFolgt}</span>
        </button>;
      })}</div>
      <div className="hm-fd2-reiter" aria-hidden="true"><span className="on"><HmFd2Ico n="raster" /></span><span><HmFd2Ico n="reels" /></span></div>
      <div className="hm-fd2-raster" style={{ gap: g }}>
        {stand.zeilen.map((z, zi) => {
          const wk = zi === 0 ? 0 : Math.ceil(z[0] / 3);
          const neu = zi > 0 && wk >= neuVon.current && wk <= wAkt;
          return <div key={zi === 0 ? "pin" : "w" + wk} className={"hm-fd2-reihe" + (neu ? " neu" : "")} style={{ gap: g }}>
            {z.map((nr) => { const x = nachNr(nr); return x ? <FeedKachel key={nr} post={x} welt={f.welt} b={f.b} breite={kachel} onClick={() => oeffne(x)} /> : null; })}
          </div>;
        })}
      </div>
    </HmFd2Geraet>
    {offenPost && <FeedBeitrag m={m} post={offenPost} variante={f.variante} feed={f} teamSicht={teamSicht} zu={() => setOffenNr(null)} onBlaettern={blaettern} />}
  </div>;
}

/* Caption im Makler-Blick: [{ art: "stimme" | "entwurf" | "luecke", text }]; aufeinanderfolgende Lücken ergeben einen ruhigen Satz */
function hmFd2CaptionTeile(x, anrede) {
  const t = x.captionTeile || {}; const l = x.captionLuecken || []; const ent = x.captionEntwurf || [];
  const out = []; let vorher = false;
  ["hook", "einloesung", "beleg", "weitergeben"].forEach((k) => {
    const roh = hmFd2S(t[k]); if (!roh) return;
    if (l.includes(k)) { if (!vorher) out.push({ art: "luecke", text: HM_FD2_MAKLER_LUECKE }); vorher = true; return; }
    vorher = false;
    const txt = hmFd2Anrede(roh, anrede);
    if (ent.includes(k)) { out.push({ art: "entwurf", text: "Entwurf, den wir mit Ihnen ausformulieren: " + txt.replace(/\s*\[[^\]]*\]/g, " (ergänzen wir mit Ihnen)") }); return; }
    out.push({ art: "stimme", text: txt });
  });
  return out;
}
/* Arbeitsaufträge für das Team, außerhalb des Geräts */
function hmFd2Auftraege(x) {
  const out = []; const l = x.captionLuecken || []; const ent = x.captionEntwurf || [];
  const name = { hook: "Erster Satz", einloesung: "Einlösung", beleg: "Beleg", weitergeben: "Weitergeben" };
  ["hook", "einloesung", "beleg", "weitergeben"].forEach((k) => { if (l.includes(k) && HM_FD2_AUFTRAG[k]) out.push({ teil: name[k], text: HM_FD2_AUFTRAG[k] }); });
  ent.forEach((k) => { if (!l.includes(k)) out.push({ teil: name[k] || k, text: "Skizze in zwei bis vier Sätzen in der Stimme des Maklers ausformulieren." }); });
  (x.captionPreis || []).forEach((k) => out.push({ teil: name[k] || k, text: "Kaufpreis entfernt, Teil ohne Preis neu schreiben." }));
  if (x.luecke) out.push({ teil: HM_FD2_UI.luecke, text: [x.luecke.auftrag || x.luecke.satz, x.luecke.grund].filter(Boolean).join(" ") });
  return out;
}
function HmFd2Caption({ x, anrede, konto, mehr, setMehr }) {
  const teile = hmFd2CaptionTeile(x, anrede);
  const gezeigt = mehr ? teile : teile.slice(0, 1);
  return <div className="hm-fd2-captiontext">
    {gezeigt.map((t, i) => <p key={i} className={t.art === "luecke" ? "luecke" : undefined}>{i === 0 && <span className={"k" + (konto ? "" : " hm-fd2-leise")}>{konto || HM_FD2_UI.kontoFolgt}</span>}{t.text}</p>)}
    {teile.length > 1 && <button type="button" className="hm-fd2-mehr" onClick={() => setMehr(!mehr)} aria-expanded={mehr}>{mehr ? HM_FD2_UI.weniger : HM_FD2_UI.mehr}</button>}
  </div>;
}

function FeedBeitrag({ m, post, variante = "empfehlung", zu, teamSicht, feed, onBlaettern }) {
  hmFeed2Stil();
  const eigen = useHmFeed12(m.id, variante, !!feed);
  const f = feed || eigen;
  const x = post ? (f.posts.find((y) => y.nr === post.nr) || post) : null;
  /* Seite 1 ist die Kachel selbst, weitere Seiten stehen als Text in Papier */
  const seiten = x ? (x.seiten || []).map((s, i) => (i === 0 ? x.daten : { ...x.daten, art: "hook", text: s.text || "", unter: s.unter || "", form: "text", portrait: false, zahl: null, plakat: false })) : [];
  const [seite, setSeite] = React.useState(0);
  const [mehr, setMehr] = React.useState(false);
  const ref = React.useRef(null);
  const W = useHmFd2Breite(ref, 860);
  React.useEffect(() => { setSeite(0); setMehr(false); }, [x ? x.nr : 0, f.variante]);
  React.useEffect(() => {
    if (!x) return undefined;
    const k = (e) => {
      if (e.key === "ArrowRight") { if (seite < seiten.length - 1) setSeite(seite + 1); else if (onBlaettern) onBlaettern(1); }
      else if (e.key === "ArrowLeft") { if (seite > 0) setSeite(seite - 1); else if (onBlaettern) onBlaettern(-1); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [x ? x.nr : 0, seiten.length, seite, onBlaettern]);
  if (!x) return null;
  const zwei = W >= 760;
  const mb = zwei ? 390 : Math.max(240, Math.min(390, W));
  const mitRahmen = zwei || W >= 420;
  const S = mitRahmen ? mb - 20 : mb;
  const daten = seiten.length ? seiten[Math.min(seite, seiten.length - 1)] : x.daten;
  const unter = [hmFd2DatumLang(x.datum), HM_FD2_FORMAT[x.format] || "Beitrag", x.angepinnt ? "angepinnt" : ""].filter(Boolean).join(", ");
  const objektLuecke = x.luecke && x.luecke.art === "objekt";
  const tag = hmFd2Wochentag(x.datum);
  const pr = f.profil;
  const auftraege = teamSicht ? hmFd2Auftraege(x) : [];
  return <Sheet offen={true} zu={zu} titel={hmFd2Titel(x)} unter={unter} breit>
    <div className="hm-fd2-beitrag" ref={ref}>
      <div className="hm-fd2-medien">
        <HmFd2Geraet rahmen={mitRahmen} breite={mb}>
          <HmFd2Nav links="zurueck" mitte={HM_FD2_UI.raster} />
          <div className="hm-fd2-post">
            <div className="hm-fd2-postkopf">
              <span className="avatar">{pr.profilbild.url ? <img src={pr.profilbild.url} alt="" /> : null}</span>
              <span className={"k" + (pr.konto ? "" : " hm-fd2-leise")}>{pr.konto || HM_FD2_UI.kontoFolgt}</span>
              <span className="ico" aria-hidden="true"><HmFd2Ico n="punkte" g={20} /></span>
            </div>
            <div className="hm-fd2-medium"><HmFd2Bild daten={daten} welt={f.welt} b={f.b} breite={S} /></div>
            {seiten.length > 1 && <div className="hm-fd2-punkte" aria-hidden="true">{seiten.map((_, i) => <i key={i} className={i === seite ? "on" : ""} />)}</div>}
            <div className="hm-fd2-aktionen">
              <span role="img" aria-label={HM_FD2_UI.gefaellt}><HmFd2Ico n="herz" /></span>
              <span role="img" aria-label={HM_FD2_UI.kommentieren}><HmFd2Ico n="kommentar" /></span>
              <span role="img" aria-label={HM_FD2_UI.teilen}><HmFd2Ico n="teilen" /></span>
              <span className="r" role="img" aria-label={HM_FD2_UI.speichern}><HmFd2Ico n="speichern" /></span>
            </div>
            <HmFd2Caption x={x} anrede={f.anrede} konto={pr.konto} mehr={mehr} setMehr={setMehr} />
            <div className="hm-fd2-datum">{hmFd2DatumLang(x.datum)}</div>
          </div>
        </HmFd2Geraet>
      </div>
      <div className="hm-fd2-text">
        {seiten.length > 1 && <div className="hm-fd2-blaettern" style={{ marginTop: 0, marginBottom: 12 }}>
          <button type="button" onClick={() => setSeite((s) => Math.max(0, s - 1))} disabled={seite === 0} aria-label="Vorherige Seite"><Ico n="zurueck" /></button>
          <span aria-live="polite">Seite {seite + 1} von {seiten.length}</span>
          <button type="button" onClick={() => setSeite((s) => Math.min(seiten.length - 1, s + 1))} disabled={seite >= seiten.length - 1} aria-label="Nächste Seite"><Ico n="weiter" /></button>
        </div>}
        {objektLuecke && (x.luecke.ersatz && x.luecke.ersatz.titel
          ? <p className="hm-fd2-lese">{`Bis dahin erscheint an diesem ${tag || "Tag"}: ${x.luecke.ersatz.titel}.`}</p>
          : <p className="hm-fd2-lese">{HM_FD2_UI.ersatzOffen}</p>)}
        {x.format === "karussell" && <p className="hm-fd2-satz">{HM_FD2_UI.karussell}</p>}
        {x.format === "reel" && <p className="hm-fd2-satz">{HM_FD2_UI.reel}</p>}
        {((x.luecke && !objektLuecke) || (x.beleg && x.beleg.status === "selbstauskunft")) && <div className="hm-fd2-notiz">
          {x.luecke && !objektLuecke && <p className="hm-fd2-lese">{x.luecke.satz}</p>}
          {x.beleg && x.beleg.status === "selbstauskunft" && <p className="hm-fd2-lese">{HM_FD2_UI.zahlPruefen}</p>}
        </div>}
        {teamSicht && <div className="hm-fd2-team">
          {auftraege.length > 0 && <><h4>{HM_FD2_UI.auftraege}</h4><ul>{auftraege.map((a, i) => <li key={i}><span>{a.teil}</span><span>{a.text}</span></li>)}</ul></>}
          <h4>{HM_FD2_UI.herkunft}</h4>
          <ul>{(x.herkunft || []).map((h, i) => <li key={i}><span>{h.teil}</span><code>{h.feld}</code></li>)}</ul>
          <h4>{HM_FD2_UI.befunde}</h4>
          <ul>{(x.befunde || []).map((b, i) => <li key={i}><span>{b.name}</span><span>{b.ok ? "erfüllt" : "offen"}{b.detail ? ", " + b.detail : ""}</span></li>)}</ul>
        </div>}
      </div>
    </div>
  </Sheet>;
}

function FeedVergleich({ m, teamSicht }) {
  hmFeed2Stil();
  const fe = useHmFeed12(m.id, "empfehlung");
  const fg = useHmFeed12(m.id, "gegenentwurf");
  const [modus, setModus] = React.useState("empfehlung");
  const [woche, setWoche] = React.useState(4);
  const [offen, setOffen] = React.useState(null);
  const ref = React.useRef(null);
  const W = useHmFd2Breite(ref, 820);
  const neben = modus === "nebeneinander";
  const zweiSpalten = neben && W >= 720;
  const rahmen = W >= 420;
  const breiteEin = zweiSpalten ? Math.min(400, Math.floor((W - 28) / 2)) : Math.min(400, W);
  const offVar = offen ? (neben ? offen.variante : modus) : "empfehlung";
  const offFeed = offVar === "gegenentwurf" ? fg : fe;
  const offPost = offen ? offFeed.posts.find((x) => x.nr === offen.nr) : null;
  const varianten = neben ? ["empfehlung", "gegenentwurf"] : [modus];
  const blaettern = (d) => { if (!offen) return; const n = hmFd2Nachbar(offFeed, woche, offen.nr, d); if (n != null) setOffen({ nr: n, variante: offen.variante }); };
  return <div className="hm-fd2-vergleich" ref={ref}>
    <div className="hm-fd2-modus" role="group" aria-label="Entwurf wählen">
      {[["empfehlung", HM_FD2_UI.empfehlung], ["gegenentwurf", HM_FD2_UI.gegenentwurf], ["nebeneinander", HM_FD2_UI.nebeneinander]].map(([id, t]) => <button key={id} type="button" aria-pressed={modus === id} className={modus === id ? "on" : ""} onClick={() => setModus(id)}>{t}</button>)}
    </div>
    {modus !== "empfehlung" && <p className="hm-fd2-achse">{fg.achse.satz}</p>}
    {teamSicht && fe.hinweise.map((h) => <p key={h} className="hm-fd2-hinweis">{h}</p>)}
    <FeedWochen feed={fe} woche={woche} setWoche={setWoche} />
    <div className={"hm-fd2-profile" + (zweiSpalten ? " neben" : "")}>
      {varianten.map((v) => <figure key={v} className="hm-fd2-rahmen" style={{ maxWidth: breiteEin }}>
        {neben && <figcaption>{v === "empfehlung" ? HM_FD2_UI.empfehlung : HM_FD2_UI.gegenentwurf}</figcaption>}
        <FeedProfil m={m} variante={v} woche={woche} breite={breiteEin} rahmen={rahmen} feed={v === "gegenentwurf" ? fg : fe} teamSicht={teamSicht} onBeitrag={(x) => setOffen({ nr: x.nr, variante: v })} />
      </figure>)}
    </div>
    {offPost && <FeedBeitrag m={m} post={offPost} variante={offVar} feed={offFeed} teamSicht={teamSicht} zu={() => setOffen(null)} onBlaettern={blaettern} />}
  </div>;
}

function FeedAbschnitt({ m, teamSicht }) {
  hmFeed2Stil();
  const f = useHmFeed12(m.id, "empfehlung", !teamSicht);
  return <section className="hm-fd2-abschnitt" data-material="vorschau|feed-woche-4|1080">
    <h3 className="hm-h hm-h2" style={{ margin: 0 }}>{HM_FD2_UI.titel}</h3>
    <p className="hm-fd2-absatz">{HM_FD2_UI.absatz}</p>
    <FeedVergleich m={m} teamSicht={teamSicht} />
    {teamSicht && f && <div className="hm-fd2-pruef">
      <div>
        <h4>{HM_FD2_UI.pruefliste}</h4>
        <ul>{f.pruefung.map((r) => <li key={r.name} className="zeile">
          <span className="zeichen">{r.stufe === "meldung" ? <HmFd2Punkt /> : <Ico n={r.ok ? "haken" : "x"} />}</span>
          <span>{r.name}{r.stufe === "meldung" ? ", Meldung" : r.ok ? "" : ", offen"}</span>
          <span>{r.detail}</span>
        </li>)}</ul>
      </div>
      <div>
        <h4>{HM_FD2_UI.luecken}</h4>
        {f.luecken.length ? <ul>{f.luecken.map((l, i) => <li key={i} className="luecke"><span>{l.was}</span><span>{l.wer}</span><code>{l.feld}</code></li>)}</ul> : <p style={{ margin: 0 }}>{HM_FD2_UI.keineLuecken}</p>}
      </div>
    </div>}
  </section>;
}

/* ---------- Selbsttest ohne DOM-Seiteneffekte ---------- */
const HM_FD2_TESTPLATTFORM = {
  positionierung: { was: "Zinshäuser und Altbau in Döbling", fuerWen: "Erben und Anleger" },
  botschaften: { claim: "Rat vor Auftrag." },
  stimme: { beispiele: [] },
  saeulen: [
    { id: "meinung", name: "Meinung", anteil: 30, formate: ["talking", "qa"], serie: { name: "Geraten", idee: "Jede Folge ein Fall, in dem der Rat vor dem Auftrag kam.", beispiele: [
      { titel: "Zwei Jahre gewartet", hook: "Warum ich einer Erbengemeinschaft zum Warten geraten habe.", skizze: "Ausgangslage, Rat, Ergebnis in drei Sätzen." },
      { titel: "Eine Woche Bedenkzeit", hook: "Was Erben in der ersten Woche nicht entscheiden müssen." },
      { titel: "Der zu frühe Verkauf", hook: "Wann ein Verkauf zu früh kommt." },
    ] } },
    { id: "wissen", name: "Wissen", anteil: 25, formate: ["carousel", "qa"], serie: { name: "Vor der Unterschrift", beispiele: [
      { titel: "Der Vermittlungsauftrag", hook: "Was im Vermittlungsauftrag steht, bevor Sie unterschreiben." },
      { titel: "Der Grundbuchauszug", hook: "So lesen Sie einen Grundbuchauszug." },
      { titel: "Der Mietvertrag", hook: "Der Mietvertrag, vor der Unterschrift." },
    ] } },
    { id: "beweise", name: "Beweise", anteil: 25, formate: ["carousel", "walkthrough"], serie: { name: "Verbüchert", beispiele: [
      { titel: "Zinshaus: 11 Wochen", hook: "Zinshaus, 11 Wochen. So lief es.", skizze: "Zeitachse in sechs Kacheln." },
      { titel: "Anlegerwohnung: 8 Prozent", hook: "8 Prozent über der Erstschätzung. Wie das zustande kam." },
    ] } },
    { id: "persoenlich", name: "Persönlich", anteil: 20, formate: ["spaziergang"], serie: { name: "Alteingesessen", beispiele: [{ titel: "Ein Morgen in Sievering" }] } },
  ],
  start30: [
    { woche: 1, beitraege: [{ titel: "Zwei Jahre gewartet", saeule: "meinung", format: "talking" }, { titel: "Zinshaus: 11 Wochen", saeule: "beweise", format: "carousel" }, { titel: "Der Vermittlungsauftrag", saeule: "wissen", format: "carousel" }] },
    { woche: 2, beitraege: [{ titel: "Eine Woche Bedenkzeit", saeule: "meinung", format: "talking" }, { titel: "Ein Morgen in Sievering", saeule: "persoenlich", format: "spaziergang" }, { titel: "Anlegerwohnung: 8 Prozent", saeule: "beweise", format: "carousel" }] },
    { woche: 3, beitraege: [{ titel: "Der Grundbuchauszug", saeule: "wissen", format: "qa" }, { titel: "Der zu frühe Verkauf", saeule: "meinung", format: "qa" }, { titel: "Der Mietvertrag", saeule: "wissen", format: "carousel" }] },
    { woche: 4, beitraege: [{ titel: "Wer ich bin, in 90 Sekunden", saeule: "persoenlich", format: "talking" }, { titel: "Stand Sievering im November", saeule: "persoenlich", format: "carousel" }] },
  ],
  beweise: [
    { behauptung: "Zinshaus: verkauft in 11 Wochen", beleg: "Zinshaus in Sievering, verkauft in 11 Wochen.", quelle: "Fragebogen (vor Veröffentlichung mit Unterlagen prüfen)" },
    { behauptung: "8 Prozent über der Erstschätzung", beleg: "Anlegerwohnung in Währing, 8 Prozent über der Erstschätzung.", quelle: "Unterlage" },
    { behauptung: "Kaufpreis", beleg: "Verkauft um 1,2 Mio. Euro.", quelle: "Fragebogen" },
  ],
};
function hmSelbsttestFeed2() {
  const out = [];
  const T = (name, fn) => { try { const r = fn(); out.push({ name: "Feed2: " + name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name: "Feed2: " + name, ok: false, detail: String(e && e.message || e) }); } };
  const basis = { plattform: HM_FD2_TESTPLATTFORM, einwilligung4: "nein", bilder: [], live: "2026-11-24", makler: { name: "Test Makler", region: "1190 Döbling" }, marke2: {}, anrede: "Sie" };
  const mid = "__fd2test";
  const fe = hmFeed12(mid, "empfehlung", basis);
  const fg = hmFeed12(mid, "gegenentwurf", basis);
  const nr = (f, n) => f.posts.find((x) => x.nr === n);
  T("Zwölf Posts, neuester zuerst", () => ({ ok: fe.posts.length === 12 && fe.posts[0].nr === 12 && fe.posts[11].nr === 1, detail: fe.posts.map((x) => x.nr).join(",") }));
  T("Vier Wochen je drei", () => { const n = [1, 2, 3, 4].map((w) => fe.posts.filter((x) => x.woche === w).length); return { ok: fe.wochen.length === 4 && n.every((k) => k === 3), detail: n.join("+") }; });
  T("Angepinnt 3, 2, 1", () => ({ ok: fe.profil.angepinnt.join() === "3,2,1" && fe.wochen[0].zeilen.length === 1 && fe.wochen[3].zeilen[1].join() === "12,11,10", detail: fe.profil.angepinnt.join(",") }));
  T("Gesicht 8 von 12, höchstens 2 je Woche", () => { const g = fe.posts.filter((x) => x.gesicht); const w = [1, 2, 3, 4].map((k) => g.filter((x) => x.woche === k).length); return { ok: g.length === 8 && w.every((k) => k <= 2), detail: `${g.length}, je Woche ${w.join(",")}` }; });
  T("Gegenton nur Folge 6 und 12", () => { const g = fe.posts.filter((x) => x.gegenton).map((x) => x.nr).sort((a, b) => a - b); return { ok: g.join() === "6,12" && nr(fe, 6).ton !== nr(fe, 5).ton, detail: g.join(",") }; });
  T("Keine Pin-Kachel Gegenton oder textgeführt", () => ({ ok: fe.posts.filter((x) => x.nr <= 3).every((x) => !x.gegenton && !x.textgefuehrt) }));
  T("Signatur aus der häufigsten Säule", () => ({ ok: nr(fe, 1).art === "serie" && nr(fe, 1).text === "Geraten" && nr(fe, 2).text === "Zwei Jahre gewartet" && nr(fe, 10).luecke && nr(fe, 10).luecke.art === "text", detail: [1, 2, 4, 7, 10].map((n) => nr(fe, n).text).join(" / ") }));
  T("Gegenentwurf: nur der Ton wechselt", () => {
    const f = [];
    fe.posts.forEach((a, i) => { const b = fg.posts[i]; if (a.nr !== b.nr || a.text !== b.text || a.unter !== b.unter || a.caption !== b.caption || a.serie.name !== b.serie.name || a.serie.folge !== b.serie.folge || a.format !== b.format || (a.beleg && a.beleg.ref) !== (b.beleg && b.beleg.ref)) f.push("Inhalt " + a.nr); if (a.ton === b.ton) f.push("Ton " + a.nr); });
    return { ok: !f.length && fg.achse.name === "tonwert", detail: f.join(", ") || fe.posts.map((x, i) => x.ton + ">" + fg.posts[i].ton).slice(0, 3).join(" ") };
  });
  T("Achse mit genau dem Satz", () => ({ ok: fg.achse.satz === HM_FD2_ACHSE_HELL && fg.achse.pole.join() === "papier,dunkel" }));
  T("Kein Bild aus hmWeltObjekte() oder assets/img/", () => {
    const fremd = hmFd2Sicher(() => window.hmWeltObjekte().map((x) => x.img), []);
    const f3 = hmFeed12(mid, "empfehlung", { ...basis, einwilligung4: "ja", bilder: [{ gruppe: "eigen", url: "/assets/img/penthouse.jpg" }, { gruppe: "archiv", url: "/assets/photos/a.jpg" }, { gruppe: "bildwelt", ki: true, url: "blob:ki" }].concat(fremd.slice(0, 1).map((u) => ({ gruppe: "eigen", url: u }))) });
    const urls = [fe, fg, f3].flatMap((f) => f.posts.map((x) => x.daten && x.daten.bild && x.daten.bild.img).filter(Boolean));
    return { ok: !urls.some((u) => fremd.includes(u) || /assets\/img\//.test(u)) && nr(f3, 12).luecke && nr(f3, 12).luecke.art === "objekt", detail: urls.join(", ") || "keine Bild-URL" };
  });
  T("Folge 12 ohne Einwilligung 4 ist Lücke", () => { const x = nr(fe, 12); return { ok: x.art === "objekt" && x.luecke && x.luecke.art === "objekt" && x.text === "Hier kommt Ihr erstes Objekt." && x.unter === "" && !!x.luecke.ersatz.titel, detail: "Ersatz: " + (x.luecke.ersatz && x.luecke.ersatz.titel) }; });
  T("Folge 12 mit Einwilligung ohne eigenes Bild ist Lücke", () => { const f = hmFeed12(mid, "empfehlung", { ...basis, einwilligung4: "ja", bilder: [] }); const x = nr(f, 12); return { ok: x.luecke && x.luecke.art === "objekt" && !(x.daten.bild && x.daten.bild.img) }; });
  T("Folge 12 mit Einwilligung und eigenem Bild zeigt das Objekt", () => { const f = hmFeed12(mid, "empfehlung", { ...basis, einwilligung4: "ja", bilder: [{ gruppe: "eigen", url: "blob:eigen-1", ref: "wi:1" }] }); const x = nr(f, 12); return { ok: x.daten.bild && x.daten.bild.img === "blob:eigen-1" && !(x.luecke && x.luecke.art === "objekt") }; });
  T("Keine Texte mit Ausrufezeichen oder Gedankenstrich", () => { const t = [fe, fg].flatMap((f) => f.posts.flatMap((x) => [x.text, x.unter, x.caption]).concat(f.profil.bio.filter(Boolean), [f.profil.zeile, f.achse.satz])).join("\n"); return { ok: !t.includes("!") && !/[\u2013\u2014]/.test(t) }; });
  T("Bio höchstens 150 Zeichen und drei Zeilen", () => { const z = fe.profil.bio; const s = z.filter(Boolean).join("\n"); return { ok: z.length === 3 && s.length <= 150 && z.filter(Boolean).every((x) => x.length <= 60), detail: s.length + " Zeichen" }; });
  T("Kontoname ohne Quelle ist null", () => ({ ok: fe.profil.konto === null && hmFeed12(mid, "empfehlung", { ...basis, marke2: { vorab: { fakten: [{ feld: "kanaele", wert: [{ kanal: "instagram", status: "aktiv", konto: "@test.konto" }] }] } } }).profil.konto === "test.konto" }));
  T("Beleg-Zahl im Text im Bild steht wörtlich im Beleg", () => { const mit = fe.posts.filter((x) => x.beleg && x.beleg.sichtbar); return { ok: mit.length >= 2 && mit.every((x) => { const tr = hmFd2Treffer(x.text); return tr.length && tr.every((t) => hmFd2Enthaelt(x.beleg.text, t)); }) && !fe.posts.some((x) => x.beleg && /Mio|Euro/.test(x.beleg.text)), detail: mit.map((x) => x.nr + ":" + x.text).join(" / ") }; });
  T("Höchstens ein sichtbarer Beleg je Woche", () => ({ ok: [2, 3, 4].every((w) => fe.posts.filter((x) => x.woche === w && x.beleg && x.beleg.sichtbar).length <= 1) }));
  T("Anrede Sie löst {Sie|du} zu Sie auf", () => ({ ok: hmFd2Anrede("Schicken {Sie|du} das weiter.", "Sie") === "Schicken Sie das weiter." && hmFd2Anrede("{Sie|du}", "Du") === "du" }));
  T("Wochentage mit Feiertag", () => { const d = [1, 4, 5, 6, 7].map((n) => nr(fe, n).datum); const fei = typeof HM_FEIERTAGE !== "undefined" && HM_FEIERTAGE.has("2026-12-08"); return { ok: d[0] === "2026-11-24" && d[1] === "2026-12-01" && d[2] === "2026-12-03" && d[3] === "2026-12-05" && d[4] === (fei ? "2026-12-09" : "2026-12-08"), detail: d.join(", ") }; });
  T("Captions ohne Hashtags und Formelsätze", () => ({ ok: fe.posts.every((x) => !/#\w/.test(x.caption) && !hmFd2Sprache(x.caption).length) }));
  T("Ohne Plattform nur Lücken, kein Fülltext", () => { const f = hmFeed12(mid, "empfehlung", { ...basis, plattform: null }); return { ok: f.posts.length === 12 && f.posts.filter((x) => x.nr !== 12).every((x) => x.luecke && x.luecke.art === "text"), detail: f.posts[0].text }; });
  T("Kaufpreis mit Einheit im selben Beleg bleibt draußen", () => {
    const pl = { ...HM_FD2_TESTPLATTFORM, beweise: [
      { behauptung: "Zinshaus in 11 Wochen", beleg: "Zinshaus Sieveringer Straße, 4,2 Mio. Euro, 11 Wochen.", quelle: "Unterlage" },
      { behauptung: "Zwei Jahre gewartet", beleg: "Nach zwei Jahren Warten 600.000 mehr erzielt.", quelle: "Unterlage" },
      HM_FD2_TESTPLATTFORM.beweise[1],
    ] };
    const f = hmFeed12(mid, "empfehlung", { ...basis, plattform: pl });
    const preis = f.posts.filter((x) => hmFd2Preis([x.caption, x.text, x.unter, x.beleg && x.beleg.text].filter(Boolean).join(" "))).map((x) => x.nr);
    const zeile = f.pruefung.find((r) => r.name === "Kein Kaufpreis im Beleg");
    return { ok: !preis.length && zeile && zeile.ok && f.luecken.filter((l) => /Kaufpreis/.test(l.was)).length >= 2, detail: preis.length ? "Preis in Folge " + preis.join(", ") : (zeile && zeile.detail) };
  });
  T("Staffelplakat zeigt das Gesicht, ohne Nummer und ohne Doppelung", () => {
    const f = hmFeed12(mid, "empfehlung", { ...basis, portrait: "portrait-test.png" });
    const x = nr(f, 1); const d = x.daten;
    const welten = ((typeof HM_MARKENWELTEN !== "undefined" && HM_MARKENWELTEN) || []).map((w) => w.id);
    const ids = welten.length ? welten : ["ruhig", "editorial", "graetzl", "klar", "warm", "kontrast"];
    const alle = ids.every((id) => hmFd2PortraitSichtbar(d, f.b, id));
    const ges = f.posts.filter((y) => y.gesicht).every((y) => hmFd2PortraitSichtbar(y.daten, f.b, f.welt && f.welt.id));
    const zeile = f.pruefung.find((r) => r.name === "Gesicht sichtbar gezeichnet");
    const serieRuhig = hmFd2PortraitSichtbar({ art: "serie", portrait: true }, { portrait: "p.png" }, "ruhig");
    return { ok: x.art === "serie" && d.art === "hook" && d.portrait && !d.serie && d.text === "Geraten" && alle && ges && zeile && zeile.ok && !serieRuhig && nr(f, 2).serie.folge === 1, detail: `${d.art}, serie ${d.serie ? d.serie.nr : "keine"}, Gesichter sichtbar: ${ges}` };
  });
  T("Bio: Relativsatz wird Lücke statt Satzfragment", () => {
    const pl = { ...HM_FD2_TESTPLATTFORM, positionierung: { was: "den richtigen Zeitpunkt vor den schnellen Abschluss stellt", fuerWen: "Erben und Anleger" } };
    const f = hmFeed12(mid, "empfehlung", { ...basis, plattform: pl });
    return { ok: f.profil.bio[0] === null && f.profil.bio[1] === "Für Erben und Anleger" && f.luecken.some((l) => /Satzteil/.test(l.was)), detail: JSON.stringify(f.profil.bio) };
  });
  T("Kachelpfad verändert den Speicher nicht", () => {
    const kacheln = Array.from({ length: 12 }, (_, i) => ({ nr: i + 1, text: "Kachel " + (i + 1), serie: { name: "Testserie" }, captionTeile: { hook: "Satz " + (i + 1) + "." }, ersatz: i === 11 ? { text: "Ersatz", captionTeile: { hook: "Ersatz." } } : null }));
    const m2 = { feed: { kacheln } }; const vor = JSON.stringify(m2);
    const f = hmFeed12(mid, "empfehlung", { ...basis, marke2: m2 });
    return { ok: JSON.stringify(m2) === vor && f.posts.length === 12 && nr(f, 12).ersatz.caption === "Ersatz.", detail: vor === JSON.stringify(m2) ? "unverändert" : "verändert" };
  });
  T("Caption ohne doppelte Sätze, Skizze als Entwurf", () => {
    const x = hmFd2Entdoppeln({ captionTeile: { hook: "Zinshaus, 11 Wochen.", einloesung: "Zinshaus, 11 Wochen. Zeitachse in sechs Kacheln.", beleg: "Zeitachse in sechs Kacheln.", weitergeben: "" }, captionLuecken: ["weitergeben"], captionEntwurf: ["einloesung"], herkunft: [] });
    const t = x.captionTeile;
    const z = hmFd2Entdoppeln({ captionTeile: { hook: "Zinshaus, 11 Wochen. So lief es.", einloesung: "Zeitachse, in eigenen Worten: „Zinshaus, 11 Wochen.“ Ausgangslage, Ergebnis.", beleg: "Zinshaus, 11 Wochen.", weitergeben: "" }, captionLuecken: ["weitergeben"], captionEntwurf: ["einloesung"], herkunft: [] }).captionTeile;
    return { ok: t.einloesung === "Zeitachse in sechs Kacheln." && t.beleg === "" && z.einloesung === "Zeitachse, in eigenen Worten: Ausgangslage, Ergebnis." && z.beleg === "" && nr(fe, 3).captionEntwurf.includes("einloesung"), detail: JSON.stringify(t) + " / " + z.einloesung };
  });
  T("Werktag nach Feiertag und Sonntag", () => {
    const fei = hmFd2Feiertag("2026-10-26");
    return { ok: hmFd2Werktag("2026-10-25") === (fei ? "2026-10-27" : "2026-10-26") && hmFd2Werktag("2026-10-27") === "2026-10-27" && (!fei || hmFd2Werktag("2026-10-26") === "2026-10-27"), detail: hmFd2Werktag("2026-10-25") };
  });
  T("Highlight-Name behält die Serienidee", () => { const a = hmFd2Kurzname("Sievering in Zahlen"); const b2 = hmFd2Kurzname("Geraten"); return { ok: a.name === "In Zahlen" && a.gekuerzt && b2.name === "Geraten" && !b2.gekuerzt, detail: a.name }; });
  T("Porträt-Schnitte wechseln, kein Schnitt öfter als vier Mal, Nachbarn verschieden", () => {
    const f = hmFeed12(mid, "empfehlung", { ...basis, portrait: "portrait-test.png" });
    const g = f.posts.filter((x) => x.gesicht); const zahl = {}; g.forEach((x) => { zahl[x.daten.schnitt] = (zahl[x.daten.schnitt] || 0) + 1; });
    const s = (n) => { const x = nr(f, n); return x && x.gesicht ? x.daten.schnitt : null; };
    /* Zeile (i, i minus 1) und Spalte (i, i plus 3) in der Anzeige [3,2,1], [6,5,4], [9,8,7], [12,11,10] */
    const paare = [[1, 2], [4, 5], [7, 8], [10, 11], [1, 4], [4, 7], [7, 10], [2, 5], [5, 8], [8, 11]];
    const gleich = paare.filter(([a, b2]) => s(a) && s(a) === s(b2));
    const formen = new Set(g.map((x) => x.daten.form));
    const lage = hmFd2PortraitLage("nah", false), lage2 = hmFd2PortraitLage("halbnah", true);
    return { ok: g.length === 8 && g.every((x) => x.daten.schnitt) && Object.values(zahl).every((n) => n <= 4) && Object.keys(zahl).length === 3 && !gleich.length && formen.has("portrait") && formen.has("welt") && lage.h > lage2.h && lage2.y + lage2.h === 1231, detail: JSON.stringify(zahl) + (gleich.length ? " gleich: " + gleich.map((p) => p.join("/")).join(", ") : "") };
  });
  T("Kachelformen: Ziffer, Nacht, Objektfläche, ohne Porträt Text", () => {
    const f = hmFeed12(mid, "empfehlung", { ...basis, portrait: "portrait-test.png" });
    const d3 = nr(f, 3).daten, d6 = nr(f, 6).daten, d9 = nr(f, 9).daten, d12 = nr(f, 12).daten;
    const ohne = fe.posts.filter((x) => x.gesicht).every((x) => x.daten.form === "text" && x.daten.schnitt);
    return { ok: d3.form === "zahl" && d3.zahl.ziffer === "11" && d3.zahl.einheit === "Wochen" && d3.zahl.rest === "Zinshaus" && d6.form === "text" && d6.ton !== d3.ton && d9.form === "zahl" && d9.zahl.ziffer === "8" && d12.form === "objekt" && ohne && !hmFd2PortraitSichtbar({ ...d3, portrait: true }, f.b, "ruhig") && hmFd2PortraitSichtbar(nr(f, 1).daten, f.b, "kontrast"), detail: [3, 6, 9, 12].map((n) => n + ":" + nr(f, n).daten.form).join(" ") };
  });
  T("Oberfläche ohne Ausrufezeichen, Gedankenstrich und Textzeichen als Icons", () => {
    const texte = Object.values(HM_FD2_UI).concat([HM_FD2_MAKLER_LUECKE, HM_FD2_ACHSE_HELL, HM_FD2_ACHSE_DUNKEL, hmFd2WochenSatz(1, "2026-11-24"), hmFd2WochenSatz(2, null)], Object.values(HM_FD2_AUFTRAG), Object.values(HM_FD2_LUECKE), Object.values(HM_FD2_FORMAT));
    const zeichen = /[!\u2013\u2014\u2022\u00B7\u25A0-\u25FF\u2190-\u21FF\u2600-\u27BF\u2B00-\u2BFF\u2300-\u23FF]|[\u{1F300}-\u{1FAFF}]/u;
    const schlecht = texte.filter((t) => zeichen.test(t));
    const ico = Object.values(HM_FD2_ICO).every((d) => /^[MmLlHhVvZzAaCcSsQqTt0-9 .,\-]+$/.test(d));
    const pruef = fe.pruefung.concat(fg.pruefung).flatMap((r) => [r.name, r.detail]).concat(fe.luecken.map((l) => l.was)).filter((t) => zeichen.test(t));
    return { ok: !schlecht.length && ico && !pruef.length && hmFd2WochenSatz(2, null) === "Woche 2: drei neue Beiträge kommen dazu.", detail: schlecht.concat(pruef).join(" | ") || "sauber" };
  });
  return out;
}

Object.assign(window, { hmFeed12, FeedProfil, FeedBeitrag, FeedVergleich, FeedAbschnitt, hmSelbsttestFeed2, HM_FEED2_TAKT });
