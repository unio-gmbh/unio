# UNIO — Briefing „Projekt-Strecke" (Horizontaler Scroll)
## Ergänzung zum Arbeitsauftrag · Referenz: QClay „Kove"-Sequenz (Video liegt bei)

---

## 1. Was die Referenz macht — und was wir übernehmen

Die Kove-Sequenz ist eine horizontale Showcase-Strecke aus vier Bausteinen: (1) Foto-Mosaik-Wand aus mehreren Bildreihen, die beim Scrollen unterschiedlich schnell laufen, (2) Hero-Slide mit übergroßer Display-Typo, die in eigener Geschwindigkeit über ein vollflächiges Bild gleitet, (3) invertierte Wortmarken-Wand als Zwischenkapitel (versetzte, gegenläufige Zeilen), (4) ruhige Logo-Endcard.

**Der eigentliche Effekt ist nicht der horizontale Scroll — es ist das Geschwindigkeits-Layering.** Bild, Typografie und Labels bewegen sich mit unterschiedlichen Faktoren, dadurch entsteht editoriale Tiefe wie beim Blättern durch ein Magazin. Genau das übernehmen wir. Was wir NICHT übernehmen: Fashion-Serifen-Typo (wir bleiben bei Grotesk + Mono) und Auto-Marquee (bei uns ist alles scroll-gekoppelt, nichts läuft von selbst).

## 2. Platzierung — die Entscheidung

**Primär: Startseite, Sektion 3 („Proof").** Die Strecke ERSETZT dort den geplanten kompakten Proof-Block und wird der Signature-Moment der Website. Begründung: (a) Referenzen sind der Inhalt mit der natürlichsten „Kollektions-Logik" — jedes Projekt ist eine Kampagne mit eigener Bildwelt, wie eine Fashion-Collection; (b) an dieser Stelle haben alle drei Zielgruppen den Beweis früh im Scroll; (c) die Strecke transportiert nebenbei die Marken-These: Projekte werden nicht inseriert, sondern **inszeniert** — die Sektion beweist das, indem sie es selbst tut.

**Sekundär (gleiche Komponente, anderer Inhalt): Immobilien-Seite, Strang „Ich suche"** — kuratierte Objekte als horizontale Galerie statt Karten-Grid. Reduzierte Variante: nur Hero-Slides, keine Mosaik-Wände, keine Wortmarken-Wand.

**Bewusst NICHT:** Bauträger-Seite (bekommt die vertikalen Formora-Case-Slides — wer von der Home kommt, soll denselben Trick nicht zweimal sehen), Makler-Seite (dort trägt die WhatIf-Pin-Szene; zwei Pin-Sektionen auf einer Seite sind eine zu viel), Story-Seite (Timeline wäre möglich, aber die Seite braucht Ruhe, nicht Spektakel).

**Regel: Maximal eine horizontale Strecke pro Seite.** Sie ist ein Hauptdarsteller, kein Pattern.

## 3. Aufbau der Strecke (Startseite, ~450–500 vw Gesamtbreite)

**Panel 0 — Auftakt (100 vw):** Off-White. Links Mono-Marginale `PROJEKTE · 2024–2026`, daneben sehr große Grotesk-Headline, deren letztes Wort rechts aus dem Viewport ragt (lädt zum Scrollen ein, z. B. „Nicht inseriert. Inszeniert."). Dezenter Scroll-Hinweis unten rechts (Mono: `SCROLL →` mit dünner Linie). KEIN Eyebrow über der Headline.

**Kapitel je Projekt (3 Projekte: Ecoluxe · Funkhaus · Albrecht), je ~120 vw:**
- **Mosaik-Takt (~50 vw):** Wand aus 6–9 Projektfotos in 3 Reihen; Reihen laufen mit Faktoren 0.85× / 1.0× / 1.15× zur Scrollgeschwindigkeit — die Parallaxe der Referenz. Bilder in unterschiedlichen Formaten (Hoch/Quer gemischt), Hairline-Abstände, kein Rahmen.
- **Hero-Takt (~70 vw):** Vollflächiges Key-Visual des Projekts. Darüber der Projektname in Display-Größe (clamp bis ~14 vw), der mit Faktor ~1.2× über das Bild gleitet und die Bildkanten überlappen darf; Teil des Namens darf HINTER einer Bildebene liegen (Gebäudekante), wenn das Foto es hergibt. In den vier Ecken die Formora-Daten in Mono: `282 ANFRAGEN` · `+31 % ÜBER ZIELPREIS` · `1010 WIEN` · `8 WOCHEN` (Faktor 0.9× — Daten bewegen sich ruhiger als die Typo). Unten rechts ein Glas-Chip als CTA (`Case ansehen`). Zahlen: NUR die echten Werte aus dem Arbeitsauftrag, keine neuen erfinden.

**Zwischenkapitel — Projekt-Laufband (1×, zwischen Projekt 2 und 3, ~60 vw):** Vollflächig Ink (#0B0A09). Vier bis fünf dicke Typo-Zeilen mit den Projektnamen des Portfolios — `Ecoluxe · Origins · Albrecht · ObenZwei · Das Beheim · Das Wimmer · Jardin Hermes` — gefüllt und als Outline gemischt, Namensreihenfolge je Zeile rotiert, Zeilen gegenläufig. Als Separator kleine orange Dreiecke (Zitat des Signal-Rasters). Eine schmale Zeile trägt den Claim in Mono: `ECHTE DEALS DURCH ECHTE DATEN ▲`.

**Bewegungslogik — Hybrid-Marquee (bewusste Ausnahme vom Ticker-Verbot):** langsamer Eigen-Drift (~0.5 px/frame Basistempo) PLUS Scroll-Velocity-Kopplung — Scrollen beschleunigt die Zeilen in ihre jeweilige Richtung, Rückwärts-Scrollen kehrt sie um, danach klingt die Geschwindigkeit weich ab. Hover pausiert die jeweilige Zeile fast vollständig. Regeln der Ausnahme: (a) NUR Typografie — niemals Zahlen/Stats im Laufband (das ursprüngliche Ticker-Verbot bleibt für Daten bestehen), (b) Basistempo ruhig und gewichtig, kein nervöses Rasen, (c) Kanten mit Ink-Gradient ausblenden, (d) `prefers-reduced-motion`: Eigen-Drift aus, rein scroll-gekoppelt. Ein lauffähiger Prototyp liegt bei (`unio-wortmarken-wand.html`) — Verhalten exakt übernehmen. Dieses Panel ist der Farbschock-Moment der Referenz (Schwarz-Weiß-Inversion), gliedert die Strecke und macht nebenbei die Portfolio-Breite sichtbar. Das Laufband ist zusätzlich solo einsetzbar (Sektions-Trenner vor dem Footer, Social-Loops) — aber maximal einmal pro Seite.

**Endcard (~80 vw):** Off-White, ruhig. UNIO-Wortmarke mittig, darunter zwei CTAs (`Projekt prüfen lassen` / `Alle Referenzen`). Die Strecke entlässt den Besucher hier zurück in den vertikalen Fluss.

## 4. Motion-Spezifikation

- **Mechanik:** Sektion wird gepinnt (GSAP ScrollTrigger), vertikaler Scroll wird 1:1 in horizontale Translation übersetzt (`scrub: true` oder scrub ~0.5 für minimale Trägheit). Kein Scroll-Jacking mit eigener Physik — der Nutzer behält die volle Kontrolle, Scrollrichtung rückwärts funktioniert jederzeit.
- **Layer-Faktoren:** Fotos 1.0× · Display-Typo 1.15–1.25× · Mono-Daten/Labels 0.9× · Mosaik-Reihen 0.85/1.0/1.15×.
- **Velocity-Skew:** Bei schnellem Scrollen dürfen Mosaik-Bilder minimal scheren (max. 2–3°, `skewX` aus Scroll-Velocity, weich gedämpft) — das „Blätter-Gefühl" der Referenz. Subtil halten.
- **Fortschritt:** Dünne Hairline-Progressbar am unteren Rand der gepinnten Sektion + Mono-Zähler (`01 / 03`), damit die Streckenlänge jederzeit lesbar ist.
- **Easing/Performance:** Nur `transform`; `will-change: transform` auf den Spuren; Bilder lazy + `content-visibility`; keine backdrop-filter auf bewegten Elementen (der Glas-CTA-Chip liegt auf der ruhigsten Ebene).
- **Übergang in die Sektion:** Die Strecke kündigt sich an, indem das erste Mosaik-Bild schon im vertikalen Scroll rechts anschneidet — kein harter Moduswechsel.

## 5. Verhalten Mobile & Zugänglichkeit (bindend)

- **Mobile (< 900 px): KEIN Pin.** Die Strecke wird zu einer nativen horizontalen Swipe-Galerie (scroll-snap, ein Slide = ein Takt), Wortmarken-Wand wird ein statisches Ink-Panel im vertikalen Fluss. Pinned-Horizontal auf Mobile fühlt sich defekt an — nicht versuchen.
- **`prefers-reduced-motion`:** Strecke rendert als vertikale Abfolge der Hero-Slides ohne Parallaxe.
- **Tastatur/Screenreader:** Inhalte bleiben in DOM-Reihenfolge, CTAs fokussierbar; die Sektion ist überspringbar (Skip-Link vor dem Pin).
- **Länge deckeln:** Max. 3 Projekte + 1 Zwischenkapitel. Ab ~5 Takten kippt Faszination in Geduld­probe.

## 6. Verbindung zum restlichen System

Die Strecke nutzt ausschließlich vorhandene Systembausteine: Formora-Eck-Daten (Motion-Direktive 6.6), Glas-Chips, Mono-Marginalien, Grain, Farbwelt — und die orangen Dreieck-Separatoren des Laufbands zitieren das Signal-Raster. Optional als Variante B statt des Projekt-Laufbands: ein **Signal-Raster-Übergang** — das Raster (bestehende Komponente `unio-signal-raster`) verdichtet sich zwischen zwei Projekten kurz zum Fassaden-Motiv des nächsten Projekts. Nur umsetzen, wenn Performance es hergibt; sonst Laufband.

## 7. Abnahmekriterien

Scrub läuft in beide Richtungen butterweich (60 fps Desktop) · kein Layout-Shift beim Pin-Ein-/Austritt · Typo-Overlap wirkt gewollt, verdeckt aber nie die Eck-Daten · Mobile-Fallback fühlt sich nativ an · Strecke funktioniert mit ausgetauschten Projektbildern ohne Layout-Bruch (Content-agnostisch) · alle Zahlen stammen aus dem Arbeitsauftrag.
