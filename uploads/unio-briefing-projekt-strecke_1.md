# UNIO — Briefing „Referenz-Strecke" (v3, final)
## Bauträger-Seite · Referenz: QClay „Kove"-Video (liegt bei) · Prototyp: `unio-referenz-sequenz.html` (verbindliche Verhaltensreferenz)

---

## 1. Platzierung

Die Strecke lebt auf der **Bauträger-Seite**, ersetzt dort die Case-Galerie und mündet direkt in den Funnel — ihr Endpunkt IST der Funnel-Einstieg. Sektionsreihenfolge: Hero → Marktrealität → System → Lernkurve → Commercial Model → Conversion-Simulator → **Referenz-Strecke** → **Funnel „Projekt prüfen lassen"**. Die Startseite behält den kompakten Formora-Proof-Block. Maximal eine Pin-Sequenz pro Seite.

## 2. Choreografie (gepinnter Horizontal-Scroll, 6 Panels — exakt wie im Prototyp)

Man scrollt normal vertikal an die Sektion heran; sie pinnt, und der weitere Scroll fährt die Strecke horizontal ab:

**P0 — Intro-Headline (100 vw):** Off-White. Mono-Marginale „Referenzen · Wien 2024–2026", darunter zweizeilige Display-Headline („Nicht inseriert. / Inszeniert." — Zeile 1 gefüllt, Zeile 2 Outline), Scroll-Hinweis unten rechts. Die beiden Zeilen tragen eigene Parallax-Faktoren (1.14 / 0.92) und gleiten beim Anfahren gegeneinander.

**P1 — Bilder Projekt 1 (~118 vw):** Die Bildwand kommt **von rechts herein**. Zwei versetzte Bildreihen aus echten Ecoluxe-/Interieur-Fotos, jede Kachel mit **dünnem Ink-Rahmen + Cream-Passepartout**. Die Reihen fahren mit eigenen Faktoren (0.93 / 1.09) — die obere hinkt minimal nach, die untere eilt voraus: das Magazin-Gefühl der Vorlage.

**P2 — Headline + Details Projekt 1 (100 vw):** Großer Projektname „Ecoluxe /25" (Faktor 1.2 — die Typo gleitet schneller als die Strecke), dahinter ein riesiges Outline-Echo des Namens (1.05), darunter Mono-Datenzeile (0.94): 282 Anfragen · +31 % über Zielpreis · Wien, plus zwei Zeilen Beschreibung. Rechts ragt ein gerahmtes Bild in den Panelrand (1.12). **Alle Textebenen bewegen sich mit unterschiedlichen Geschwindigkeiten relativ zur Strecke — das ist die Typo-Animation der Vorlage** (Versatz proportional zum Abstand der Panelmitte von der Viewportmitte, Faktor − 1).

**P3 — Bilder Projekt 2 (~118 vw):** Gleicher Aufbau wie P1 mit Albrecht-Material.

**P4 — Headline + Details Projekt 2 (100 vw, zentrierte Schluss-Komposition):** „Albrecht /26" mittig gesetzt (Name, Datenzeile, Beschreibung zentriert, Outline-Echo dahinter zentriert, kein Side-Bild) — sie ist der Schlussakkord der Fahrt. **Die Fahrt endet hier; die Headline ruht mittig im Screen (Halt-Phase), DANN schiebt das Marquee-Panel von unten über sie.**

**P5 — Marquee-Finale (Overlay, Ink):** Das schwarze Panel ist NICHT Teil der horizontalen Fahrt — es **schiebt nach der Halt-Phase von unten über die ruhende Headline** (oben 28 px Radius — mobil 20 px —, der sich beim Andocken glättet; weicher Schatten; Kanten mit Ink-Gradient). Fünf Endlos-Marquee-Zeilen mit allen sieben Projektnamen (Ecoluxe · Origins · Albrecht · ObenZwei · Das Beheim · Das Wimmer · Jardin Hermes), gefüllt/Outline gemischt, orange Dreieck-Separatoren, eine Mono-Claim-Zeile „Echte Deals durch echte Daten ▲". Bewegung: Hybrid (ruhiger Eigen-Drift + Scroll-Velocity, Rückwärtsscrollen kehrt um). Dann: **Die Zeilen verdichten sich zur Mitte und blenden aus; in exakt derselben Typo-Größe bleibt zentriert der CTA stehen: „Projekt prüfen lassen."** Ein helles Panel schiebt von unten hinter dem Text hoch, der Text invertiert automatisch (mix-blend-mode: difference) — und wird zur Headline der Funnel-Sektion, die anschließend von unten einscrollt (Lede in Sie-Anrede, drei Schritt-Karten im Rahmen-Stil, „Projekt einreichen", Mono-Note „100 % erfolgsbasiert").

Timing im Pin (Gesamt ~780 vh, mobil ~820 vh): **0–56 % Horizontalfahrt (P0–P4) · 56–66 % Halt (letzte Headline ruht mittig) · 66–78 % Panel-Aufstieg von unten · 78–100 % Finale** (Verdichtung ab 28 %, CTA ab 42 %, Licht-Panel 68–96 % des Finales). Dünne Progress-Hairline mit Orange-Füllung am unteren Rand über die gesamte Strecke.

## 3. Bewegungsregeln

- Horizontalfahrt und alle Parallax-Ebenen: **rein scroll-gekoppelt** (scrub), Nutzer behält volle Kontrolle in beide Richtungen.
- Nur Marquee-Zeilen in P5 driften eigenständig (dokumentierte Ausnahme; NUR Typografie, niemals Zahlen im Laufband).
- Nur `transform`/`opacity`; `will-change` auf Track, Reihen und Typo-Ebenen; Bilder lazy.
- `prefers-reduced-motion`: Parallax und Drift aus, Strecke als ruhige Fahrt bzw. vertikale Abfolge.
- **Mobile (<900 px, verbindlich — Verhalten wie im Prototyp):** Pin bleibt (vertikaler Scroll treibt die Fahrt nativ, kein Sonder-Fallback nötig). Sticky-Höhe mit `100svh` gegen URL-Bar-Sprünge. Bild-Panels auf ~170 vw verbreitern, Kacheln deutlich größer skalieren (obere Reihe ~38/56/32 vw, untere ~30/48 vw), damit die Fotos den Screen tragen. Side-Bilder in den Headline-Panels ausblenden, Echo-Stroke auf 1 px, Datenzeile enger, Beschreibung volle Breite. Panel-Radius 20 px, Progress-Rail schmaler. Pin-Länge auf ~820 vh strecken, damit die Fahrt bei Touch-Flicks nicht hektisch wird. Typo-Größen laufen über clamp() automatisch mit.
- Keine Eyebrows: Zuordnung über Mono-Marginalien und Jahres-Tags am Namen.

## 4. Inhalte & System

Nur echte Zahlen aus dem Arbeitsauftrag (282 / +31 % / 61 in 2 Wochen); fehlende Werte als `[PLATZHALTER]`. Rahmen-Kacheln (1.5 px Ink + Passepartout) werden Systembaustein, ebenso die orangen Dreiecke (Signal-Raster-Zitat). Typo im Prototyp ist Helvetica-Platzhalter — finale Grotesk einsetzen. „Jardin Hermes" vor Launch markenrechtlich prüfen. Erweiterbar: weitere Projekt-Paare (Bilder + Headline) als Panel-Duo zwischen P4 und P5 einschieben — Deckel bei 3 Projekten, damit die Strecke endet, bevor sie ermüdet.

## 5. Abnahmekriterien

60 fps in beide Richtungen · Typo-Parallax sichtbar, aber nie mehr als ~20 vw Gesamtversatz pro Ebene · Bild-Reihen ohne Lücken an den Panelrändern · CTA größengleich zur Marquee-Typo · Text-Inversion sauber · Strecke content-agnostisch (Bildtausch ohne Layout-Bruch).
