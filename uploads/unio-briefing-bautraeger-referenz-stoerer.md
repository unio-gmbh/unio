# UNIO — Bauträger-Seite: Referenz-Störer (Bild-Accordion mit Hover)
## Für Claude Design · Prototyp `unio-bautraeger-referenz-stoerer.html` liegt bei und gilt als maßgeblich. Referenz-Video (Tandem „Built Together") war Vorlage. Alle Marken-/Design-Regeln gelten.

---

## 0. Was & Wo

Ein horizontaler **Bild-Accordion-Störer** mit Hover-Interaktion, platziert auf der **Bauträger-Seite direkt NACH den Keyfacts** (den drei Stat-Karten 282 / +31% / 100% aus Kapitel 01). Der Störer sitzt als eigenständiger Block VOR dem nächsten Kapitel und ist bewusst mit viel Weißraum umgeben. Er zeigt echte UNIO-Referenzprojekte und dient als visueller Ruhepunkt + Beweis-Teaser, bevor die Argumentation weiterläuft.

## 1. Vorbild-Analyse (aus dem Referenz-Video, korrigiert)

Die Vorlage (Tandem) baut den Block in drei horizontalen Ebenen: (1) oben eine große Aussage in ruhiger Anmutung, (2) mittig eine **vollbreite, automatisch laufende Bild-Marquee** mit Mono-Labels darüber (Location links/rechts, Marken-Signatur mittig), (3) darunter ein riesiges Wort über die volle Breite. **Die Interaktion (Kern):** Die Bildleiste **läuft dauerhaft horizontal (Marquee) mit engem Abstand zwischen den Bildern.** Sobald der Nutzer über die Leiste fährt, **stoppt die Marquee und der Abstand (das Padding/Gap) zwischen den Bildern vergrößert sich** — die Bilder rücken auseinander und geben Ruhe zum Ansehen. Zusätzlich erscheint auf der einzelnen gehoverten Kachel ein dunkler Tooltip mit dem Projektnamen. Viel Weißraum ober- und unterhalb der Leiste.

## 2. UNIO-Umsetzung (Ebenen)

**Obere Aussage (statt Serife → Display-Grotesk, zentriert, gedämpftes Ink):** „Nicht inseriert — *inszeniert.* Jedes Projekt bekommt bei UNIO dieselbe Klarheit, bevor der erste Interessent es sieht." (ein Wort kursiv als Betonung, wie im Vorbild). Max. ~900px Breite, mittig.

**Label-Zeile über den Bildern (Mono, .1em):** links Projektname + Bezirk des ersten Bildes, mittig `UNIO · REFERENZEN` (die Marken-Signatur-Position — im Vorbild „Tandem © Since 1997"), rechts Projektname + Bezirk des letzten Bildes. **Wichtig:** hier steht NICHT „ad.boutique" oder ein anderer Firmenname (Bestandsregel: kein spezifischer Firmenname auf der UNIO-Site).

**Bild-Marquee (die Kern-Interaktion):** vollbreite, am Viewport-Rand angeschnittene (`overflow:hidden`) Leiste mit ~6 gleich breiten Kacheln (~360px Desktop / ~220px Mobile, Höhe ~300px / ~180px, radius 14, 0.5px Hairline). Bilder = **echte UNIO-Projektfotos** (Ecoluxe, Origins, Albrecht, Das Beheim, ObenZwei, Das Wimmer — markenrechtlich geprüfte Namen aus dem Bestand). Der Kachelsatz wird **dupliziert**, damit die Endlos-Schleife nahtlos wirkt.
- **Laufzustand:** Die Leiste scrollt automatisch und endlos horizontal (`@keyframes` translateX 0 → -50% über den duplizierten Satz, ~30–36s linear, Endlosschleife). **Enges Gap zwischen den Bildern (~6px)** im Laufzustand.
- **Hover-Mechanik (Kern):** Sobald der Cursor über der Leiste ist, wird die Animation angehalten (`animation-play-state:paused`) UND das **Gap vergrößert sich sichtbar (~6px → ~26px)**, getweent über `transition:gap .5s cubic-bezier(.32,.72,0,1)`. Die Bilder rücken ruhig auseinander, die Leiste steht. Beim Verlassen läuft sie sanft weiter.
- **Tooltip:** dunkle Ink-Pill mit Cream-Mono-Text, erscheint auf der EINZELNEN gehoverten Kachel (unten links, Opacity + kleiner Slide-up). Inhalt = Projektname + Bezirk (z. B. „Ecoluxe · Wien 1190"). **Zahlen im Tooltip vermeiden**, wenn dieselbe Case-Zahl bereits als KPI-Statement auf der Seite steht (Ein-mal-Regel) — Projektname + Bezirk genügt und hält die Leiste zahlenfrei.
- Optional: leichtes `scale(1.02)` auf der gehoverten Kachel; Verlauf-Overlay wird heller.

**Riesiges Wort darunter (Display-Grotesk 600, zentriert, bis ~190px):** „Geprüft gebaut." mit orangem Schlusspunkt (`#E96F2B`). Alternativen zum Testen: „Vor dem Bau geprüft." / „Erst geprüft." Empfehlung „Geprüft gebaut." — knapp, trägt die These.

**Untere Stützzeile (Display-Grotesk medium, zentriert, ~640px):** „Fahren Sie über ein Projekt — jedes stand vor dem Spatenstich auf dem Prüfstand." (Sie-Register für Bauträger; lädt zur Hover-Interaktion ein).

## 3. Whitespace (Vorbild explizit übernehmen)

Der Block lebt vom Weißraum wie im Vorbild: **~200px vertikales Polster** über der oberen Aussage und unter der Stützzeile, ~120px zwischen oberer Aussage und Label-Zeile, ~26px zwischen Marquee-Leiste und Riesenwort (Leiste und Wort gehören optisch zusammen, wie im Vorbild). Container max ~1400px, damit die Bilder großzügig laufen. Auf Mobile Polster auf ~120px reduzieren. Dieser Weißraum-Rhythmus entspricht dem globalen Whitespace-System und ist hier verbindlich.

## 4. Bewegung & Zustände

- Marquee läuft automatisch; Hover pausiert + öffnet das Gap (siehe 2). Reveal der Sektion beim Eintritt: Leiste + Riesenwort faden/staffeln einmal ein (IO).
- **reduced-motion:** Marquee läuft NICHT automatisch (keine Dauerbewegung) — Leiste steht mit dem breiten Gap als Ruhezustand, Bilder horizontal per Swipe/Scroll erreichbar, Tooltip per Fade. **Touch/Mobile:** kein Hover → Marquee läuft langsam ODER steht; per Swipe scrollbar; Tooltip/Label als kleine Mono-Zeile unter jeder Kachel dauerhaft sichtbar.
- Icons/Pfeile falls nötig: 1.5px Stroke-SVG, keine Glyphen.

## 5. Abnahme

Platzierung nach den Keyfacts (Stat-Karten) vor dem nächsten Kapitel · echte Projektfotos + echte Projektnamen im duplizierten, nahtlosen Loop · Marquee läuft automatisch mit engem Gap · Hover pausiert die Marquee UND vergrößert das Gap (~6→~26px, Marken-Easing .5s), Tooltip erscheint auf der Kachel · Label-Zeile mit `UNIO · REFERENZEN` mittig, KEIN Firmenname · oberes Statement + Riesenwort „Geprüft gebaut." mit orangem Punkt + Sie-Stützzeile · Weißraum-Polster ~200px oben/unten wie im Vorbild · Zahlen im Tooltip kontextgebunden, keine erfundenen KPIs · reduced-motion + Touch-Fallback (Swipe-Reihe) · Prototyp als visuelle Referenz herangezogen.
