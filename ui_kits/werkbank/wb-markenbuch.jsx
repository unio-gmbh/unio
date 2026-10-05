/* Werkbank. Markenbuch: das Ergebnis des Branding-Prozesses als Dokument, gelesen wie das Markenbuch eines Studios.
   Liest `plattform` (docs/werkbank/MARKE_SCHEMA.md) und die gewählte Markenwelt. Team sieht zusätzlich das Panel "Für das Team"
   mit Qualitätsgate, Freigabe (Gate 2), Reveal und Rückmeldung. Der Makler wird im Buch immer gesiezt.
   CSS kommt aus dieser Datei (hmMbStil), nicht aus index.html. */

function hmMbStil() {
  if (typeof document === "undefined" || document.getElementById("stil-markenbuch")) return;
  const s = document.createElement("style"); s.id = "stil-markenbuch";
  s.textContent = `
.hm-mb { display: grid; gap: 0; color: var(--ink-2); }
.hm-mb .hm-link { font-size: 14px; }
.hm-mb .hm-klein-btn, .hm-mb .hm-klein-btn.hell { background: none; padding: 0; border-radius: 0; font-size: 13px; color: var(--ink); text-decoration: underline; text-decoration-color: var(--steel); text-underline-offset: 3px; align-self: flex-start; justify-self: start; }
.hm-mb .hm-klein-btn:hover { text-decoration-color: var(--ink); }
.hm-mb .l { font-size: 13px; color: var(--text-muted); }
.hm-mb-zahl { font-variant-numeric: tabular-nums; }

/* Team-Panel: eine Zeile, eingeklappt */
.hm-mb-team { border-top: 1px solid var(--hairline-dark); border-bottom: 1px solid var(--hairline-dark); margin: 0 0 40px; }
.hm-mb-team-zeile { display: flex; justify-content: space-between; align-items: baseline; gap: 18px; padding: 14px 0; font-size: 14px; color: var(--ink-2); }
.hm-mb-team-zeile .s { min-width: 0; }
.hm-mb-team-zeile .s b { font-weight: 400; color: var(--ink); }
.hm-mb-team-inhalt { display: grid; gap: 28px; padding: 6px 0 28px; }
.hm-mb-krit { display: grid; max-width: 640px; }
.hm-mb-krit > div { display: grid; grid-template-columns: minmax(0, 1fr) 56px; gap: 4px 18px; padding: 10px 0; border-top: 1px solid var(--hairline-dark); font-size: 14px; color: var(--ink); }
.hm-mb-krit > div > .n { text-align: right; font-variant-numeric: tabular-nums; color: var(--ink); }
.hm-mb-krit > div > .n.tief { color: var(--signal-deep); }
.hm-mb-krit > div > .u { grid-column: 1 / -1; font-size: 13px; color: var(--text-muted); line-height: 1.45; }
.hm-mb-krit > div:last-child { border-bottom: 1px solid var(--hairline-dark); }
.hm-mb-team-kopf { display: flex; flex-wrap: wrap; gap: 12px 22px; align-items: center; }
.hm-mb-team-kopf .t { font-size: 17px; color: var(--ink); }
.hm-mb-team-block { display: grid; gap: 12px; }
.hm-mb-team-block h4 { margin: 0; font-size: 15px; font-weight: 400; color: var(--ink); }

/* Layout: Navigation links, Seiten rechts */
.hm-mb-layout { display: grid; grid-template-columns: 168px minmax(0, 1fr); gap: 56px; align-items: start; margin-top: 0; }
.hm-mb-nav { position: sticky; top: 84px; display: flex; flex-direction: column; gap: 0; padding-top: 6px; }
.hm-mb-nav button { border: 0; background: none; border-radius: 0; text-align: left; padding: 6px 0 6px 12px; font: inherit; font-size: 13.5px; color: var(--text-muted); cursor: pointer; display: grid; grid-template-columns: 24px minmax(0, 1fr); gap: 8px; border-left: 1px solid transparent; }
.hm-mb-nav button .n { font-variant-numeric: tabular-nums; font-size: 12px; color: var(--text-muted); padding-top: 1px; }
.hm-mb-nav button:hover { color: var(--ink); background: none; }
.hm-mb-nav button.on { color: var(--ink); background: none; border-left-color: var(--ink); }
.hm-mb-nav button.on .n { color: var(--ink); }
.hm-mb-nav button:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
.hm-mb-seiten { display: block; max-width: 880px; min-width: 0; }

/* Titelblatt */
.hm-mb-deckblatt { padding: 8px 0 96px; display: grid; gap: 0; }
.hm-mb-deckblatt .name { margin-top: 44px; font-size: 16px; color: var(--ink); }
.hm-mb-claim-titel { margin: 18px 0 0; font-size: clamp(38px, 4.4vw, 64px); line-height: 1.04; letter-spacing: -.025em; font-weight: 400; color: var(--ink); max-width: 18ch; text-wrap: balance; }
.hm-mb-deckblatt .stand { margin-top: 40px; font-size: 14px; color: var(--text-muted); display: flex; gap: 6px 14px; flex-wrap: wrap; }
.hm-mb-deckblatt .stand b { font-weight: 400; color: var(--ink); }
.hm-mb-aktion { margin-top: 16px; display: flex; gap: 6px 22px; flex-wrap: wrap; align-items: baseline; }

/* Kapitel wie Doppelseiten */
.hm-mb-kap { padding: 80px 0 96px; border-top: 1px solid var(--hairline-dark); scroll-margin-top: 84px; }
.hm-mb-kopf { display: grid; grid-template-columns: 72px minmax(0, 1fr); gap: 0 16px; align-items: baseline; }
.hm-mb-kopf .n { font-size: 15px; color: var(--text-muted); font-variant-numeric: tabular-nums; padding-top: 12px; }
.hm-mb-kopf h3 { margin: 0; font-size: clamp(30px, 2.8vw, 38px); font-weight: 400; letter-spacing: -.02em; line-height: 1.08; color: var(--ink); text-wrap: balance; }
.hm-mb-kopf p { grid-column: 2; margin: 14px 0 0; font-size: 16px; line-height: 1.5; color: var(--text-muted); max-width: 60ch; }
.hm-mb-inhalt { margin: 48px 0 0 88px; display: grid; gap: 40px; min-width: 0; }
.hm-mb-luecke { color: var(--signal-deep); font-size: .94em; }
.hm-mb-luecke em { font-style: normal; font-size: 12px; margin-left: 8px; color: var(--signal-deep); white-space: nowrap; }
.hm-mb-preis-frei { color: var(--text-muted); }

/* Definitionsliste: Begriff links gedämpft, Wert rechts */
.hm-mb-dl { display: grid; }
.hm-mb-dl > div { display: grid; grid-template-columns: 180px minmax(0, 1fr); gap: 4px 24px; padding: 16px 0; border-top: 1px solid var(--hairline-dark); }
.hm-mb-dl > div:last-child { border-bottom: 1px solid var(--hairline-dark); }
.hm-mb-dl > div > .k { font-size: 14px; color: var(--text-muted); padding-top: 2px; }
.hm-mb-dl > div > .v { font-size: 16px; line-height: 1.5; color: var(--ink); min-width: 0; }
.hm-mb-dl > div > .v .u { font-size: 14px; color: var(--text-muted); margin-top: 6px; line-height: 1.45; }
.hm-mb-dl > div > .v b { font-weight: 500; }
.hm-mb-dl.gross > div > .v { font-size: 17px; line-height: 1.5; }
.hm-mb-dl.gross > div > .k { font-size: 17px; color: var(--ink); letter-spacing: -.01em; }
.hm-mb-dl > div > .v em { font-style: normal; color: var(--ink-3); display: block; margin-top: 4px; font-size: 15px; }

/* Große Sätze in der Markenschrift */
.hm-mb-gross { margin: 0; font-size: clamp(26px, 2.8vw, 36px); line-height: 1.22; letter-spacing: -.015em; color: var(--ink); max-width: 30ch; text-wrap: balance; }
.hm-mb-zitat { margin: 0; font-size: clamp(28px, 3vw, 40px); line-height: 1.18; letter-spacing: -.02em; color: var(--ink); max-width: 26ch; text-wrap: balance; }
.hm-mb-claim { font-size: clamp(36px, 4vw, 56px); letter-spacing: -.025em; line-height: 1.06; color: var(--ink); max-width: 20ch; text-wrap: balance; }
.hm-mb-nachsatz { margin: 0; font-size: 16px; line-height: 1.55; color: var(--ink-2); max-width: 62ch; }
.hm-mb-leise { font-size: 14px; color: var(--text-muted); line-height: 1.5; max-width: 65ch; }

/* Nummerierte Zeilen */
.hm-mb-zeilen { display: grid; }
.hm-mb-zeilen > div { display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 4px 20px; padding: 14px 0; border-top: 1px solid var(--hairline-dark); font-size: 16px; line-height: 1.5; color: var(--ink); }
.hm-mb-zeilen > div:last-child { border-bottom: 1px solid var(--hairline-dark); }
.hm-mb-zeilen > div > .n { font-variant-numeric: tabular-nums; font-size: 14px; color: var(--text-muted); padding-top: 2px; }
.hm-mb-zeilen.klein > div { font-size: 15px; padding: 11px 0; }
.hm-mb-zeilen.bogen > div { grid-template-columns: 40px 140px minmax(0, 1fr); }
.hm-mb-zeilen.bogen > div > .t { font-size: 16px; color: var(--ink); }
.hm-mb-zeilen.bogen > div > .u { font-size: 16px; line-height: 1.5; color: var(--ink-2); }

/* Worte in zwei Spalten */
.hm-mb-zwei { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 48px; align-items: start; }
.hm-mb-zwei > div > .l { padding-bottom: 10px; }
.hm-mb-wort { font-size: 16px; color: var(--ink); padding: 9px 0; border-top: 1px solid var(--hairline-dark); }
.hm-mb-wort:last-child { border-bottom: 1px solid var(--hairline-dark); }
.hm-mb-wort.nie { color: var(--text-muted); text-decoration: line-through; text-decoration-color: var(--steel); }

/* Regler: Haarlinie mit Marke */
.hm-mb-regler { display: grid; gap: 18px; max-width: 560px; }
.hm-mb-regler > div { display: grid; grid-template-columns: 110px minmax(0, 1fr) 110px; gap: 16px; align-items: center; font-size: 13px; color: var(--text-muted); }
.hm-mb-regler > div > span:last-child { text-align: right; }
.hm-mb-regler .spur { height: 1px; background: var(--hairline-dark); position: relative; }
.hm-mb-regler .spur i { position: absolute; top: -4px; width: 9px; height: 9px; border-radius: 50%; transform: translateX(-50%); background: var(--ink); }

/* Beispiele: eingerückt, 2 px Linie links */
.hm-mb-beispiele-liste { display: grid; gap: 28px; }
.hm-mb-beispiel { padding: 2px 0 2px 22px; border-left: 2px solid var(--ink); border-radius: 0; background: none; display: grid; gap: 8px; max-width: 65ch; }
.hm-mb-beispiel .so { font-size: 17px; line-height: 1.5; color: var(--ink); }
.hm-mb-beispiel .nicht { font-size: 14px; line-height: 1.5; color: var(--text-muted); }

/* Absätze mit Kopieren */
.hm-mb-absatz { display: grid; gap: 10px; max-width: 65ch; }
.hm-mb-absatz p { margin: 0; font-size: 17px; line-height: 1.6; color: var(--ink-2); }

/* Erscheinung */
.hm-mb-flaeche { box-shadow: inset 0 0 0 1px var(--hairline-dark); border-radius: 0; overflow: hidden; }
.hm-mb-anwendungen { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 48px 40px; align-items: start; }
.hm-mb-anwendungen figure { margin: 0; display: grid; gap: 12px; min-width: 0; }
.hm-mb-anwendungen figure.breit { grid-column: 1 / -1; }
.hm-mb-anwendungen figure > div { display: grid; gap: 12px; min-width: 0; }
.hm-mb-anwendungen figure > div > * { display: block; }
.hm-mb-anwendungen figcaption { font-size: 13px; color: var(--text-muted); padding-top: 10px; border-top: 1px solid var(--hairline-dark); }
.hm-mb-anwendungen svg, .hm-mb-anwendungen .hm-welt-feed { max-width: 100%; height: auto; box-shadow: 0 0 0 1px var(--hairline-dark); }
.hm-mb .hm-welt-wahl-karte { background: transparent; box-shadow: none; border-radius: 0; padding: 18px 0 20px; border-top: 1px solid var(--hairline-dark); }
.hm-mb .hm-welt-wahl-karte.on { box-shadow: inset 0 2px 0 var(--ink); border-top-color: transparent; }
.hm-mb .hm-welt-wahl-karte:focus-visible { outline: 2px solid var(--ink); outline-offset: 4px; }
.hm-mb .hm-welt-wahl-karte .empf { font-weight: 400; color: var(--text-muted); }

/* Säulen */
.hm-mb-saeulen { display: grid; }
.hm-mb-saeule { padding: 40px 0 44px; border-top: 1px solid var(--hairline-dark); display: grid; gap: 28px; }
.hm-mb-saeule:last-child { border-bottom: 1px solid var(--hairline-dark); }
.hm-mb-saeule-kopf { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 24px; align-items: start; }
.hm-mb-saeule-kopf .t { font-size: 24px; letter-spacing: -.015em; color: var(--ink); line-height: 1.15; }
.hm-mb-saeule-kopf .u { font-size: 16px; line-height: 1.5; color: var(--ink-2); margin-top: 8px; max-width: 58ch; }
.hm-mb-saeule-kopf .frage { font-size: 14px; color: var(--text-muted); margin-top: 8px; max-width: 58ch; line-height: 1.5; }
.hm-mb-anteil { display: flex; align-items: baseline; gap: 4px; }
.hm-mb-anteil b { font-size: 44px; font-weight: 400; letter-spacing: -.03em; color: var(--ink); font-variant-numeric: tabular-nums; line-height: 1; }
.hm-mb-anteil span { font-size: 15px; color: var(--text-muted); }
.hm-mb-serie { display: grid; gap: 22px; margin: 0; padding: 0; border-radius: 0; background: none; box-shadow: none; }
.hm-mb-serie-name { font-size: 26px; letter-spacing: -.02em; color: var(--ink); line-height: 1.15; }
.hm-mb-serie p, .hm-mb-konzept p { margin: 0; font-size: 16px; line-height: 1.55; color: var(--ink-2); max-width: 65ch; }
.hm-mb-beispiele { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.hm-mb-beispiele > div { display: grid; gap: 6px; min-width: 0; }
.hm-mb-beispiele svg { max-width: 100%; height: auto; box-shadow: 0 0 0 1px var(--hairline-dark); }
.hm-mb-beispiele .t { font-size: 15px; color: var(--ink); margin-top: 6px; }
.hm-mb-beispiele .u { font-size: 13px; color: var(--text-muted); line-height: 1.45; }

/* Konzepte */
.hm-mb-konzepte { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0; }
.hm-mb-konzept { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 12px 40px; padding: 36px 0 40px; border-top: 1px solid var(--hairline-dark); }
.hm-mb-konzept:last-child { border-bottom: 1px solid var(--hairline-dark); }
.hm-mb-konzept .kanal { font-size: 13px; color: var(--text-muted); margin-top: 10px; }
.hm-mb-konzept .body { display: grid; gap: 16px; min-width: 0; }
.hm-mb-konzept .warum { font-size: 14px; color: var(--text-muted); line-height: 1.5; max-width: 65ch; }

/* Erste 30 Tage */
.hm-mb-wochen { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0; }
.hm-mb-woche { display: grid; grid-template-columns: 120px minmax(0, 1fr); gap: 24px; padding: 20px 0; border-top: 1px solid var(--hairline-dark); }
.hm-mb-woche:last-child { border-bottom: 1px solid var(--hairline-dark); }
.hm-mb-woche .l { font-size: 15px; color: var(--ink); }
.hm-mb-post { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 16px; padding: 6px 0; border-top: 0; font-size: 15px; }
.hm-mb-post .t { font-size: 15px; color: var(--ink); }
.hm-mb-post .u { color: var(--text-muted); font-size: 13px; margin-top: 0; text-align: right; white-space: nowrap; }

/* Schlussblatt */
.hm-mb-schluss { margin-top: 120px; padding: 28px 0 40px; border-top: 1px solid var(--hairline-dark); display: flex; justify-content: space-between; gap: 16px 32px; flex-wrap: wrap; align-items: center; font-size: 13px; color: var(--text-muted); }
.hm-mb-schluss .r { display: flex; gap: 16px; flex-wrap: wrap; font-variant-numeric: tabular-nums; }
.hm-mb-schluss .r code { font-family: "Outfit", system-ui, sans-serif; font-size: 12px; color: var(--text-muted); }

/* Feed bleibt wie er ist, nur die Überschrift im Buchmaß */
.hm-mb .hm-fd2-abschnitt > h3 { font-size: 22px; letter-spacing: -.015em; }

@media (max-width: 1100px) {
  .hm-mb-layout { grid-template-columns: minmax(0, 1fr); gap: 24px; }
  .hm-mb-nav { position: static; flex-direction: row; gap: 0; overflow-x: auto; padding: 8px 0; border-bottom: 1px solid var(--hairline-dark); scrollbar-width: none; }
  .hm-mb-nav::-webkit-scrollbar { display: none; }
  .hm-mb-nav button { flex: none; white-space: nowrap; border-left: 0; padding: 6px 16px 6px 0; grid-template-columns: auto auto; gap: 6px; }
  .hm-mb-nav button.on { text-decoration: underline; text-underline-offset: 6px; text-decoration-color: var(--ink); }
  .hm-mb-kap { padding-top: 72px; scroll-margin-top: 120px; }
  .hm-mb-inhalt { margin-left: 0; }
  .hm-mb-kopf { grid-template-columns: 48px minmax(0, 1fr); }
  .hm-mb-kopf p { grid-column: 1 / -1; }
  .hm-mb-konzept { grid-template-columns: minmax(0, 1fr); }
  .hm-mb-beispiele { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 700px) {
  .hm-mb-deckblatt { padding-bottom: 64px; }
  .hm-mb-kap { padding-top: 56px; }
  .hm-mb-inhalt { margin-top: 32px; gap: 32px; }
  .hm-mb-kopf { grid-template-columns: 36px minmax(0, 1fr); }
  .hm-mb-kopf .n { font-size: 13px; padding-top: 8px; }
  .hm-mb-dl > div { grid-template-columns: minmax(0, 1fr); gap: 4px; padding: 12px 0; }
  .hm-mb-dl.gross > div > .k { font-size: 16px; }
  .hm-mb-zeilen.bogen > div { grid-template-columns: 32px minmax(0, 1fr); }
  .hm-mb-zeilen.bogen > div > .u { grid-column: 2; }
  .hm-mb-zwei { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .hm-mb-regler > div { grid-template-columns: 76px minmax(0, 1fr) 76px; gap: 10px; font-size: 12px; }
  .hm-mb-anwendungen { grid-template-columns: minmax(0, 1fr); }
  .hm-mb-saeule-kopf { grid-template-columns: minmax(0, 1fr); }
  .hm-mb-anteil { order: -1; }
  .hm-mb-beispiele { grid-template-columns: minmax(0, 1fr); }
  .hm-mb-woche { grid-template-columns: minmax(0, 1fr); gap: 8px; }
  .hm-mb-post { grid-template-columns: minmax(0, 1fr); gap: 2px; }
  .hm-mb-post .u { text-align: left; white-space: normal; }
  .hm-mb-krit > div { grid-template-columns: minmax(0, 1fr) 40px; }
  .hm-mb-team-zeile { flex-direction: column; align-items: flex-start; gap: 8px; }
  .hm-mb-schluss { margin-top: 72px; }
}
@media print {
  .hm-mb-nav, .hm-mb-team, .hm-mb-aktion, .hm-mb .hm-klein-btn, .hm-mb .hm-welt-wahl { display: none !important; }
  .hm-mb-layout { display: block; }
  .hm-mb-seiten { max-width: none; }
  .hm-mb-kap { break-before: page; page-break-before: always; padding-top: 24px; border-top: 0; }
  .hm-mb-deckblatt { min-height: 80vh; }
  .hm-mb-inhalt { margin-left: 0; }
  .hm-mb, .hm-mb * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .hm-mb-beispiel, .hm-mb-dl > div, .hm-mb-zeilen > div, .hm-mb-anwendungen figure, .hm-mb-saeule { break-inside: avoid; page-break-inside: avoid; }
}
`;
  document.head.appendChild(s);
}

const HM_MB_KAPITEL = [["einsicht", "Einsicht"], ["position", "Positionierung"], ["werte", "Werte"], ["stimme", "Stimme"], ["story", "Story"], ["botschaften", "Botschaften"], ["visuell", "Erscheinung"], ["saeulen", "Säulen"], ["feed", "Feed"], ["konzepte", "Konzepte"], ["start", "Erste 30 Tage"]];

function hmMbStand(mid) {
  const alle = hmStore.get("markenbuch") || {};
  return alle[mid] || { status: "entwurf" };
}
function hmMbSetzen(mid, patch) { hmStore.patch("markenbuch", (a) => ({ ...(a || {}), [mid]: { ...((a || {})[mid] || { status: "entwurf" }), ...patch } })); }

/* Plattform holen: gespeichert (falls die Plattform-Datei speichert) oder frisch erzeugt */
/* Gate 2: mindestens 80 von 100, kein Kriterium unter 60, keine Floskel (Prozess v2, Etappe 2) */
function hmMbBereit(q) { return !!q && q.gesamt >= 80 && !(q.klischees || []).length && !(q.kriterien || []).some((k) => k.wert < 60); }
function hmMbPlattform(mid) {
  const gespeichert = (hmStore.get("plattformen") || {})[mid];
  const aus = gespeichert && (gespeichert.aktuell || (gespeichert.versionen && gespeichert.versionen[gespeichert.versionen.length - 1]) || (gespeichert.positionierung ? gespeichert : null));
  if (aus) return aus;
  return window.hmPlattform ? hmPlattform(mid) : null;
}
function hmMbWelt(mid, p) {
  const W = window.HM_MARKENWELTEN || [];
  const st = hmMbStand(mid);
  const id = st.welt || (p && p.visuell && p.visuell.welt);
  return W.find((w) => w.id === id) || W[0] || null;
}

/* ---------- Kaufpreise in Textbeispielen ----------
   Sätze mit Beträgen (4,2 Mio., 600.000, €, Euro) gehören nicht ins Buch des Maklers, bevor sie mit ihm geschrieben sind.
   hmMbOhnePreis(text) zerlegt den Text in Sätze und markiert die betroffenen. Team sieht sie mit Markierung, der Makler
   sieht statt des Satzes den Ersatztext. Datenlogik bleibt unberührt, nur die Anzeige filtert. */
const HM_MB_ABK = /\b(Mio|Mrd|ca|bzw|Nr|inkl|exkl|Str|Tsd|Dr|Mag|Ing|z|B|u|a|vgl|etc)\.["“”)]?\s*$/;
const HM_MB_PREIS = /(\d{1,3}(?:\.\d{3})+(?!\s*(?:m²|m2|qm))|\d+(?:,\d+)?\s*(?:Mio|Mrd)\b\.?|€|\bEuro\b)/;
const HM_MB_PREIS_ERSATZ = "Diese Zeile schreiben wir mit Ihnen vor dem Live-Tag.";
function hmMbSaetze(text) {
  const s = String(text || ""); const out = []; let start = 0;
  const re = /[.!?]["“”)]?\s+/g; let m;
  while ((m = re.exec(s))) {
    const ende = m.index + m[0].length; const satz = s.slice(start, ende);
    if (HM_MB_ABK.test(satz)) continue;
    out.push(satz); start = ende;
  }
  if (start < s.length) out.push(s.slice(start));
  return out;
}
function hmMbOhnePreis(text) {
  const teile = hmMbSaetze(text).map((satz) => ({ text: satz, preis: HM_MB_PREIS.test(satz) }));
  const hat = teile.some((x) => x.preis);
  const frei = hat ? teile.map((x) => (x.preis ? HM_MB_PREIS_ERSATZ + (/\s$/.test(x.text) ? " " : "") : x.text)).join("").replace(/\s+/g, " ").trim() : String(text || "");
  return { teile, hat, text: frei, anzahl: teile.filter((x) => x.preis).length };
}

/* Text im Buch: Lücken aus dem Workshop ruhig, Kaufpreise je Sicht */
function MbText({ t, luecke, teamSicht }) {
  if (!t) return <span className="hm-mb-luecke">{luecke || "Kommt aus dem Workshop"}</span>;
  const s = String(t);
  if (!teamSicht && /^Kommt aus dem Workshop/.test(s)) return <span className="hm-mb-luecke">Kommt aus dem Workshop.</span>;
  const o = hmMbOhnePreis(s);
  if (!o.hat) return <span>{s}</span>;
  if (!teamSicht) return <span>{o.teile.map((x, i) => x.preis ? <span key={i} className="hm-mb-preis-frei">{HM_MB_PREIS_ERSATZ} </span> : <span key={i}>{x.text}</span>)}</span>;
  return <span>{o.teile.map((x, i) => x.preis ? <span key={i} className="hm-mb-luecke">{x.text}<em>Kaufpreis, bitte ersetzen</em> </span> : <span key={i}>{x.text}</span>)}</span>;
}
/* Kopiertext je Sicht: der Makler kopiert nie einen Kaufpreis */
const hmMbKopie = (t, teamSicht) => (teamSicht ? String(t || "") : hmMbOhnePreis(t).text);

/* Breite einer Abbildung messen, damit die Welt-Renderer in der echten Spaltenbreite zeichnen */
function useMbBreite(ref, start) {
  const [w, setW] = React.useState(start);
  React.useEffect(() => {
    const el = ref.current; if (!el || typeof ResizeObserver === "undefined") return undefined;
    const f = () => { if (el.clientWidth) setW(Math.floor(el.clientWidth)); };
    const ro = new ResizeObserver(f); ro.observe(el); f();
    return () => ro.disconnect();
  }, []);
  return w;
}
function MbFigur({ text, breit, children }) {
  const ref = React.useRef(null); const w = useMbBreite(ref, 320);
  return <figure ref={ref} className={breit ? "breit" : ""}>{children(w)}<figcaption>{text}</figcaption></figure>;
}

function MbKapitel({ id, nr, titel, children, unter }) {
  return <section className="hm-mb-kap" id={"mb-" + id}>
    <div className="hm-mb-kopf"><span className="n">{nr}</span><h3>{titel}</h3>{unter && <p>{unter}</p>}</div>
    <div className="hm-mb-inhalt">{children}</div>
  </section>;
}
const MbDl = ({ zeilen, gross, teamSicht }) => <div className={"hm-mb-dl" + (gross ? " gross" : "")}>{zeilen.filter(Boolean).map(([k, v, u], i) => <div key={i}><span className="k">{k}</span><div className="v">{typeof v === "string" || !v ? <MbText t={v} teamSicht={teamSicht} /> : v}{u && <div className="u">{u}</div>}</div></div>)}</div>;
const MbZeilen = ({ liste, klein, teamSicht }) => <div className={"hm-mb-zeilen" + (klein ? " klein" : "")}>{liste.map((x, i) => <div key={i}><span className="n">{String(i + 1).padStart(2, "0")}</span><span><MbText t={x} teamSicht={teamSicht} /></span></div>)}</div>;
const MbAbsatz = ({ label, text, teamSicht }) => text ? <div className="hm-mb-absatz"><div className="l">{label}</div><p><MbText t={text} teamSicht={teamSicht} /></p><KopierKnopf text={hmMbKopie(text, teamSicht)} /></div> : null;
const hmMbDatumLang = (iso) => { const d = new Date(iso || (window.HM_HEUTE || Date.now())); return isNaN(d) ? "" : d.toLocaleDateString("de-AT", { day: "numeric", month: "long", year: "numeric" }); };

/* Team-Panel: eine Zeile Zusammenfassung, aufgeklappt Gate, Freigabe, Quelle, Neu erzeugen, Reveal, Rückmeldung */
function MbTeam({ m, q, st, freigegeben, neuErzeugen }) {
  const [offen, setOffen] = React.useState(false);
  const reveal = React.useMemo(() => { try { const d = window.hmRevealFolien ? hmRevealFolien(m.id) : null; return d && d.bereit ? (d.bereit.every((x) => x.ok) ? "bereit" : "Probe möglich") : null; } catch (e) { return null; } }, [m.id, offen, JSON.stringify(st)]);
  const stand = !q ? "Qualität noch nicht geprüft" : `Qualität ${q.gesamt} von 100, ${freigegeben ? "freigegeben" : hmMbBereit(q) ? "bereit zur Freigabe" : "vor der Freigabe schärfen"}`;
  const freigeben = () => { hmMbSetzen(m.id, { status: "freigegeben", am: HM_HEUTE, von: "Daniel Hayden" }); if (window.hmQuelleEinfrieren) hmQuelleEinfrieren(m.id, "Daniel Hayden", "Markenbuch freigegeben"); hmEvent(m.id, "marke", "Markenbuch freigegeben", "Daniel"); toast("Markenbuch freigegeben"); };
  return <section className="hm-mb-team" aria-label="Für das Team">
    <div className="hm-mb-team-zeile">
      <div className="s"><b>Für das Team.</b> {stand}.{reveal ? ` Reveal: ${reveal}.` : ""}</div>
      <button className="hm-link" aria-expanded={offen} onClick={() => setOffen(!offen)}>{offen ? "Schließen" : "Öffnen"}</button>
    </div>
    {offen && <div className="hm-mb-team-inhalt">
      {q && <div className="hm-mb-team-block">
        <div className="hm-mb-team-kopf">
          <div className="t"><span className="hm-mb-zahl">{q.gesamt}</span> von 100, {freigegeben ? "freigegeben" : hmMbBereit(q) ? "bereit zur Freigabe" : "vor der Freigabe schärfen"}</div>
          {!freigegeben ? <Btn disabled={!hmMbBereit(q)} onClick={freigeben}>Freigeben</Btn> : <button className="hm-link" onClick={() => hmMbSetzen(m.id, { status: "pruefung" })}>Wieder öffnen</button>}
          <button className="hm-link" onClick={neuErzeugen}>Neu erzeugen</button>
        </div>
        <div className="hm-mb-krit">{(q.kriterien || []).map((k) => <div key={k.name}><span>{k.name}</span><span className={"n" + (k.wert < 60 ? " tief" : "")}>{k.wert}</span>{k.hinweis && <span className="u">{k.hinweis}</span>}</div>)}</div>
        {(q.klischees || []).length > 0 && <div className="hm-hinweis">Floskeln entfernen: {q.klischees.join(", ")}.</div>}
        {q.aehnlichkeit != null && <div className="hm-mb-leise">Ähnlichkeit zu anderen Maklern {q.aehnlichkeit} Prozent.</div>}
        {window.QuelleStand && <QuelleStand m={m} />}
      </div>}
      {!q && <div className="hm-mb-team-kopf"><div className="t">Noch keine Qualitätsprüfung.</div><button className="hm-link" onClick={neuErzeugen}>Neu erzeugen</button></div>}
      {window.RevealKnopf && <div className="hm-mb-team-block">
        <h4>Reveal und Rückmeldung</h4>
        <Fehlergrenze><RevealKnopf m={m} teamSicht /></Fehlergrenze>
        {window.RueckmeldungStand && <Fehlergrenze><RueckmeldungStand m={m} /></Fehlergrenze>}
      </div>}
    </div>}
  </section>;
}

function Markenbuch({ m, teamSicht }) {
  hmMbStil();
  useHm("plattformen"); useHm("markenbuch"); useHm("strategien"); useHm("fragebogen"); useHm("branding"); useHm("portraits"); useHm("marke2");
  const [neu, setNeu] = React.useState(0);
  const p = React.useMemo(() => hmMbPlattform(m.id), [m.id, neu, JSON.stringify((hmStore.get("plattformen") || {})[m.id] || null)]);
  const st = hmMbStand(m.id);
  const b = hmBrand(m.id);
  const welt = hmMbWelt(m.id, p);
  const [kap, setKap] = React.useState("einsicht");
  const kapitel = React.useMemo(() => HM_MB_KAPITEL.filter(([id]) => id !== "feed" || !!window.FeedAbschnitt), [neu]);
  const nr = (id) => String(kapitel.findIndex(([k]) => k === id) + 1).padStart(2, "0");
  /* Aktives Kapitel folgt dem Scrollen */
  React.useEffect(() => {
    if (!p || typeof IntersectionObserver === "undefined") return undefined;
    const els = kapitel.map(([id]) => document.getElementById("mb-" + id)).filter(Boolean);
    const io = new IntersectionObserver((es) => { const s = es.filter((e) => e.isIntersecting).sort((a, c) => a.boundingClientRect.top - c.boundingClientRect.top)[0]; if (s) setKap(s.target.id.slice(3)); }, { rootMargin: "-20% 0px -60% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [m.id, !!p, kapitel.length]);
  if (!p) return <Leer titel="Das Markenbuch entsteht aus Fragebogen und Workshop." text={teamSicht ? "Sobald der Weg gewählt ist, steht es hier." : "Sobald Ihr Weg gewählt ist, steht es hier."} />;
  const q = p.qualitaet || (window.hmMarkenQualitaet ? hmMarkenQualitaet(p, m.id) : null);
  const bb = { ...b, plattform: p };
  const freigegeben = st.status === "freigegeben";
  const quelle = window.hmQuelle ? hmQuelle(m.id) : null;
  const springen = (id) => { setKap(id); const el = document.getElementById("mb-" + id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const neuErzeugen = async () => { const f = window.hmPlattformClaude || window.hmPlattform; const erg = await Promise.resolve(f(m.id)); if (window.hmPlattformSpeichern) hmPlattformSpeichern(m.id, erg); setNeu((x) => x + 1); hmMbSetzen(m.id, { status: "pruefung" }); toast(erg && erg.quelle === "claude" ? "Neu geschrieben" : "Neu erzeugt aus den Antworten"); };
  const drucken = () => { const el = document.querySelector(".hm-mb-seiten"); if (!el) return; const css = [...document.styleSheets].flatMap((s) => { try { return [...s.cssRules].map((r) => r.cssText); } catch (e) { return []; } }).join("\n"); hmDrucken(`Markenbuch ${b.makler.name}`, `<div class="hm-mb hm-mb-druck">${el.outerHTML}</div>`, css + "\n.hm-mb-nav,.hm-mb-aktion,.hm-mb-team,.hm-klein-btn,.hm-welt-wahl{display:none}.hm-mb-kap{break-before:page;page-break-before:always;border-top:0;padding-top:24px}.hm-mb-inhalt{margin-left:0}.hm-mb-seiten{max-width:none}body{background:#fff;margin:0;padding:32px}"); };
  const claim = (p.botschaften && p.botschaften.claim) || b.claim;
  const standZeile = freigegeben ? <><b>Version {quelle ? quelle.version : "1.0"}</b><span>freigegeben am {hmMbDatumLang(st.am || (quelle && quelle.eingefrorenAm) || HM_HEUTE)}</span></> : st.status === "pruefung" ? <><b>Markenbuch, in Prüfung</b><span>{hmMbDatumLang(HM_HEUTE)}</span></> : <><b>Markenbuch, Entwurf</b><span>{hmMbDatumLang(HM_HEUTE)}</span></>;
  const ts = teamSicht;
  return <div className="hm-mb">
    {ts && <MbTeam m={m} q={q} st={st} freigegeben={freigegeben} neuErzeugen={neuErzeugen} />}

    <div className="hm-mb-layout">
      <nav className="hm-mb-nav" aria-label="Kapitel">{kapitel.map(([id, t]) => <button key={id} className={kap === id ? "on" : ""} onClick={() => springen(id)}><span className="n">{nr(id)}</span><span>{t}</span></button>)}</nav>
      <div className="hm-mb-seiten">
        <section className="hm-mb-deckblatt" id="mb-titel">
          <BrandLogo b={b} h={56} />
          {b.logo === "monogramm" && <div className="name">{b.makler.name}</div>}
          <h2 className="hm-mb-claim-titel" style={{ fontFamily: hmFont(b.schrift.d) }}>{claim}</h2>
          <div className="stand">{standZeile}</div>
          <div className="hm-mb-aktion">
            <button className="hm-link" onClick={drucken}>Als PDF sichern</button>
            {welt && window.MaterialKnopf && <MaterialKnopf m={m} />}
          </div>
        </section>

        <MbKapitel id="einsicht" nr={nr("einsicht")} titel="Einsicht" unter="Wer entscheidet, was diese Menschen bewegt und wo die Branche eine Stelle frei lässt.">
          <MbDl gross teamSicht={ts} zeilen={[["Wer entscheidet", p.einsicht && p.einsicht.zielgruppe], ["Was sie bewegt", p.einsicht && p.einsicht.spannung], ["Wie die Branche spricht", p.einsicht && p.einsicht.konvention], ["Wo niemand steht", p.einsicht && p.einsicht.weisseStelle]]} />
        </MbKapitel>

        <MbKapitel id="position" nr={nr("position")} titel="Positionierung">
          {(() => { const satz = (p.positionierung && p.positionierung.satz) || ""; const i = satz.search(/\.\s/); const kopf = i > 0 ? satz.slice(0, i + 1) : satz; const rest = i > 0 ? satz.slice(i + 2) : ""; return <div style={{ display: "grid", gap: 18 }}><p className="hm-mb-gross" style={{ fontFamily: hmFont(b.schrift.d) }}><MbText t={kopf} teamSicht={ts} /></p>{rest && !(p.positionierung.andersAls || p.positionierung.weil) && <p className="hm-mb-nachsatz"><MbText t={rest} teamSicht={ts} /></p>}</div>; })()}
          <MbDl teamSicht={ts} zeilen={[
            ["Für wen", p.positionierung && p.positionierung.fuerWen], ["Was", p.positionierung && p.positionierung.was], ["Anders als", p.positionierung && p.positionierung.andersAls], ["Weil", p.positionierung && p.positionierung.weil],
            p.versprechen && ["Versprechen", <b><MbText t={p.versprechen} teamSicht={ts} /></b>],
            p.rolle && ["Rolle", <><b>{p.rolle.name}</b>{p.rolle.satz && <em><MbText t={p.rolle.satz} teamSicht={ts} /></em>}</>],
          ]} />
        </MbKapitel>

        <MbKapitel id="werte" nr={nr("werte")} titel="Werte und Persönlichkeit" unter="Jeder Wert steht für ein Verhalten, das man beobachten kann, und für eine Grenze.">
          {(p.werte || []).length > 0 && <MbDl gross teamSicht={ts} zeilen={p.werte.map((w) => [w.name, w.verhalten, w.nie ? `Nie: ${w.nie}` : null])} />}
          {(p.persoenlichkeit || []).length > 0 && <MbDl teamSicht={ts} zeilen={p.persoenlichkeit.map((x) => [x.wort, String(x.heisst || "").replace(/\.\s*$/, "") + (x.heisstNicht ? `. Nicht: ${x.heisstNicht}` : ".")])} />}
        </MbKapitel>

        <MbKapitel id="stimme" nr={nr("stimme")} titel="Stimme" unter={`Wie ${b.vor} klingt, welche Worte tragen und welche nie fallen.`}>
          {p.stimme && p.stimme.regler && <div className="hm-mb-regler">{[["ernst", "Ernst", "Locker"], ["persoenlich", "Förmlich", "Persönlich"], ["begeistert", "Zurückhaltend", "Begeistert"], ["sachlich", "Emotional", "Sachlich"]].map(([k, l, r]) => <div key={k}><span>{l}</span><div className="spur"><i style={{ left: `${p.stimme.regler[k] ?? 50}%` }}></i></div><span>{r}</span></div>)}</div>}
          {p.stimme && <div className="hm-mb-zwei"><div><div className="l">So klingt {b.vor}</div>{(p.stimme.sagen || []).map((x) => <div key={x} className="hm-mb-wort">{x}</div>)}</div><div><div className="l">Nie</div>{(p.stimme.vermeiden || []).map((x) => <div key={x} className="hm-mb-wort nie">{x}</div>)}</div></div>}
          {p.stimme && (p.stimme.regeln || []).length > 0 && <MbZeilen klein liste={p.stimme.regeln} teamSicht={ts} />}
          {p.stimme && (p.stimme.beispiele || []).length > 0 && <div className="hm-mb-beispiele-liste">{p.stimme.beispiele.map((x) => <div key={x.wo} className="hm-mb-beispiel"><div className="l">{x.wo}</div><div className="so"><MbText t={x.so} teamSicht={ts} /></div>{x.nicht && <div className="nicht">Nicht: <MbText t={x.nicht} teamSicht={ts} /></div>}</div>)}</div>}
        </MbKapitel>

        <MbKapitel id="story" nr={nr("story")} titel="Story">
          {p.story && <>
            <blockquote className="hm-mb-zitat" style={{ fontFamily: hmFont(b.schrift.d) }}><MbText t={p.story.kurz} teamSicht={ts} /></blockquote>
            <div className="hm-mb-zeilen bogen">{[["Herkunft", "herkunft"], ["Spannung", "spannung"], ["Wendepunkt", "wendepunkt"], ["Haltung", "haltung"], ["Versprechen", "versprechen"]].map(([t, k], i) => <div key={k}><span className="n">{String(i + 1).padStart(2, "0")}</span><span className="t">{t}</span><span className="u"><MbText t={p.story[k]} teamSicht={ts} /></span></div>)}</div>
            <MbAbsatz label="70 bis 100 Wörter" text={p.story.mittel} teamSicht={ts} />
            <MbAbsatz label="Über mich, 160 bis 220 Wörter" text={p.story.lang} teamSicht={ts} />
          </>}
        </MbKapitel>

        <MbKapitel id="botschaften" nr={nr("botschaften")} titel="Botschaften">
          {p.botschaften && <>
            <div style={{ display: "grid", gap: 16 }}>
              <div className="hm-mb-claim" style={{ fontFamily: hmFont(b.schrift.d) }}>{p.botschaften.claim}</div>
              {(p.botschaften.claimAlternativen || []).length > 0 && <div className="hm-mb-leise">Alternativen: {p.botschaften.claimAlternativen.join(" / ")}</div>}
            </div>
            {[["In einem Satz", "einSatz"], ["In drei Sätzen", "dreiSaetze"], ["Boilerplate", "boilerplate"]].map(([t, k]) => <MbAbsatz key={k} label={t} text={p.botschaften[k]} teamSicht={ts} />)}
          </>}
          {(p.beweise || []).length > 0 && <MbDl teamSicht={ts} zeilen={p.beweise.map((x) => [x.behauptung, x.beleg, ts && x.quelle ? `Quelle: ${x.quelle}` : null])} />}
        </MbKapitel>

        <MbKapitel id="visuell" nr={nr("visuell")} titel="Erscheinung" unter={welt ? `${welt.name}. ${welt.idee}` : p.visuell && p.visuell.idee}>
          {window.WeltWahl && (ts || !freigegeben) && <WeltWahl mid={m.id} wert={welt && welt.id} set={(id) => { const w = (window.HM_MARKENWELTEN || []).find((x) => x.id === id); hmMbSetzen(m.id, { welt: id }); if (w) { hmStore.patch("branding", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), schrift: w.schrift } })); hmStore.patch("website", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), look: w.websiteLook } })); } }} />}
          {welt && window.WeltTafel && <div className="hm-mb-flaeche"><WeltTafel welt={welt} b={bb} /></div>}
          {welt && window.WeltFeed && <div className="hm-mb-anwendungen">
            <MbFigur text="Profil auf Instagram, die ersten neun Beiträge">{(w) => <div data-material="vorschau|profil|1080"><WeltFeed welt={welt} b={bb} breite={w} posts={(p.saeulen || []).flatMap((s) => (s.serie && s.serie.beispiele || []).map((x) => ({ ...x, saeule: s.name, serie: s.serie.name }))).slice(0, 9).map((x, i) => ({ ...x, bild: i }))} /></div>}</MbFigur>
            {window.WeltStory && <MbFigur text="Story mit Claim">{(w) => <div data-material="stories|story-claim|1080|1920"><WeltStory welt={welt} b={bb} breite={w} text={p.botschaften ? p.botschaften.claim : b.claim} bild={b.portrait} /></div>}</MbFigur>}
            {window.WeltKarte && <MbFigur text="Visitenkarte, vorn und hinten">{(w) => <div><div data-material="print|visitenkarte-vorn|1004|650"><WeltKarte welt={welt} b={bb} seite="vorn" breite={w} /></div><div data-material="print|visitenkarte-hinten|1004|650"><WeltKarte welt={welt} b={bb} seite="hinten" breite={w} /></div></div>}</MbFigur>}
            {window.WeltExpose && <MbFigur text="Exposé, Titelseite">{(w) => <div data-material="print|expose-titel|2480|3508"><WeltExpose welt={welt} b={bb} breite={w} objekt={window.hmWebObjekte ? hmWebObjekte()[0] : null} /></div>}</MbFigur>}
            {window.WeltSignatur && <MbFigur text="E-Mail-Signatur" breit>{(w) => <div data-material="signatur|signatur|1200"><WeltSignatur welt={welt} b={bb} breite={w} /></div>}</MbFigur>}
          </div>}
          {p.visuell && p.visuell.bildsprache && <div className="hm-mb-zwei"><div><div className="l">Bildsprache</div>{(p.visuell.bildsprache.regeln || []).map((x) => <div key={x} className="hm-mb-wort">{x}</div>)}</div><div><div className="l">Nie im Bild</div>{(p.visuell.bildsprache.vermeiden || []).map((x) => <div key={x} className="hm-mb-wort nie">{x}</div>)}</div></div>}
        </MbKapitel>

        <MbKapitel id="saeulen" nr={nr("saeulen")} titel="Säulen und Serien" unter="Jede Säule hat einen Anteil am Feed und eine Serie, die man wiedererkennt.">
          <div className="hm-mb-saeulen">{(p.saeulen || []).map((s) => <div key={s.id || s.name} className="hm-mb-saeule">
            <div className="hm-mb-saeule-kopf"><div><div className="t">{s.name}</div><div className="u"><MbText t={s.zweck} teamSicht={ts} /></div>{s.frage && <div className="frage">Frage des Publikums: {s.frage}</div>}</div><div className="hm-mb-anteil"><b>{s.anteil}</b><span>Prozent</span></div></div>
            {s.serie && <div className="hm-mb-serie">
              <div className="hm-mb-serie-name" style={{ fontFamily: hmFont(b.schrift.d) }}>{s.serie.name}</div>
              <p><MbText t={s.serie.idee} teamSicht={ts} /></p>
              <MbDl teamSicht={ts} zeilen={[s.serie.hookFormel && ["Einstieg", s.serie.hookFormel], s.serie.rhythmus && ["Rhythmus", s.serie.rhythmus], (s.formate || []).length > 0 && ["Formate", s.formate.map((f) => (window.HM_TYPEN && HM_TYPEN[f]) || (window.HM_FORMATE && HM_FORMATE[f] && HM_FORMATE[f].name) || f).join(", ")]]} />
              {(s.serie.ablauf || []).length > 0 && <MbZeilen klein liste={s.serie.ablauf} teamSicht={ts} />}
              <div className="hm-mb-beispiele">{(s.serie.beispiele || []).map((x, xi) => <div key={x.titel}>{welt && window.WeltPost ? <div data-material={`posts|${hmDateiname(s.serie.name || s.name)}-${xi + 1}|1080|1350`}><WeltPost welt={welt} b={bb} art="serie" text={x.hook} unter={x.titel} serie={{ name: s.serie.name, nr: xi + 1 }} nr={xi + 1} breite={240} /></div> : null}<div className="t">{x.titel}</div>{x.skizze && <div className="u"><MbText t={x.skizze} teamSicht={ts} /></div>}</div>)}</div>
            </div>}
          </div>)}</div>
        </MbKapitel>

        {window.FeedAbschnitt && <MbKapitel id="feed" nr={nr("feed")} titel="Feed">
          <Fehlergrenze><FeedAbschnitt m={m} teamSicht={teamSicht} /></Fehlergrenze>
        </MbKapitel>}

        <MbKapitel id="konzepte" nr={nr("konzepte")} titel="Konzepte" unter="Drei Ideen, die über den Feed hinausgehen.">
          <div className="hm-mb-konzepte">{(p.konzepte || []).map((k) => <div key={k.name} className="hm-mb-konzept">
            <div><div className="hm-mb-serie-name" style={{ fontFamily: hmFont(b.schrift.d) }}>{k.name}</div>{k.kanal && <div className="kanal">{k.kanal}</div>}</div>
            <div className="body"><p><MbText t={k.idee} teamSicht={ts} /></p>{k.warum && <div className="warum">Warum: <MbText t={k.warum} teamSicht={ts} /></div>}{(k.umsetzung || []).length > 0 && <MbZeilen klein liste={k.umsetzung} teamSicht={ts} />}</div>
          </div>)}</div>
        </MbKapitel>

        <MbKapitel id="start" nr={nr("start")} titel="Die ersten 30 Tage" unter="Vier Wochen, jede Woche drei bis vier Beiträge aus den Säulen.">
          <div className="hm-mb-wochen">{(p.start30 || []).map((w) => <div key={w.woche} className="hm-mb-woche"><div className="l">Woche {w.woche}</div><div>{(w.beitraege || []).map((x) => <div key={x.titel} className="hm-mb-post"><div className="t">{x.titel}</div><div className="u">{((p.saeulen || []).find((s) => s.id === x.saeule) || { name: x.saeule }).name}{x.format ? `, ${(window.HM_TYPEN && HM_TYPEN[x.format]) || x.format}` : ""}</div></div>)}</div></div>)}</div>
        </MbKapitel>

        <footer className="hm-mb-schluss">
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}><BrandLogo b={b} h={22} /><span>UNIO, Personenmarken für Immobilienmakler</span></div>
          {quelle && <div className="r"><span>Version {quelle.version}</span><code>{String(quelle.pruefsumme || "").slice(0, 12)}</code></div>}
        </footer>
      </div>
    </div>
  </div>;
}

Object.assign(window, { hmMbBereit, Markenbuch, hmMbPlattform, hmMbWelt, hmMbStand, hmMbSetzen, HM_MB_KAPITEL, hmMbStil, hmMbOhnePreis });
