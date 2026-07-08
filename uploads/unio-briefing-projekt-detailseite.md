# UNIO — Briefing „Projekt-Detailseite" (final)
## Für Claude Design · Prototyp `unio-projekt-detailseite.html` liegt bei und ist die verbindliche Verhaltens- und Stilreferenz

---

## 1. Auftrag

Übernimm die beiliegende Projekt-Detailseite als Design-Vorlage für alle Objekt-/Projektansichten (öffnet sich bei Objektauswahl auf Startseite oder Immobiliensuche). Der Prototyp definiert Layout, Hierarchie, Module, Animationen und responsives Verhalten — er ist kein Moodboard, sondern die Spezifikation. Inhalte kommen aus dem UNIO-System (Datenstruktur wie app.unio.at/property/2); der Prototyp zeigt echte Objektdaten mit Platzhalter-Fotos und Demo-Marktdaten.

## 2. Die drei Register der Seite (Grundprinzip)

Die Seite trennt drei Erlebnisse sauber, statt sie zu stapeln:
1. **Ruhige Editorial-Fläche** für das Objekt (warmes Off-White, maximal zwei Flächen-Ebenen).
2. **Ein helles Datenmodul** für den PropTech-Beweis (Marktdaten, Orange als Akzent).
3. **Ein immersives Glas-Overlay** für die Bilder (das einzige Glas-Gimmick der Seite).

## 3. Bindende Design-Regeln

**Ebenen:** Maximal zwei Flächen-Ebenen — Basisfläche + Karten. Keine Box-in-Box-Verschachtelung. Listen (Highlights, Ausstattung) liegen DIREKT auf der Fläche als Hairline-Zeilen. Sektionen trennen sich durch 52 px Luft plus eine Hairline — nie durch Rahmen.

**Token:**
- Farben: Basis `#F2EFE9` · Karte `#FBFAF6` · Ink `#141210` · Text-2 `#6E6862` · Text-3 `#A19A91` · Orange `#E96F2B` · Hairline `rgba(20,18,16,.1)` · Grain-Overlay 3 %.
- Radien: 22 (Hero/Bilder) · 20 (große Karten) · 16 (Kacheln) · 14 (kleine Tiles) · 99 (Pills/Kreise).
- Typo: 4 Stufen — H1 `clamp(30–48px)/600/-.03em`, Sektionstitel `16px/600`, Body `14–15px/1.6–1.7`, Mono-Caption `10.5px/.13em/uppercase`. Titel medium statt fett; Mono NUR für Metazeilen, Tags und Datenlabels.
- Motion: eine Easing-Kurve für alles — `cubic-bezier(.32,.72,0,1)`.

**Buttons:** Ein solider Ink-Pill als Primär pro View · Kreis-Icon-Buttons 44 px · Ecken-Pfeil-Kreise 36/26 px als Tertiär in Kartenecken · Text-Buttons mit nachgestelltem Icon als Sekundär. Alle Icons als Stroke-SVGs 1.5 px — niemals Text-Glyphen oder Emoji.

**Verbote:** Keine Eyebrows/Kicker über Headlines · keine Punkte/Dots vor Aufzählungen · keine symmetrischen Stat-Kachel-Grids ohne Hierarchie · kein Mono als Grundrauschen · keine Glas-Flächen auf der Editorial-Ebene (Glas nur im Overlay + Foto-Zähler + Top-Leiste).

## 4. Modul-Anatomien (wie im Prototyp)

**Kopf (TimeSpot-Muster):** Links H1 zweizeilig mit orangem Schlusspunkt („Traum Penthouse / in Hernals."). Rechts unten bündig: orange getönte Status-Pill („Aktiv") + EINE Mono-Metazeile („Zum Verkauf · Wohnung · Top 29 · 1170 Wien"). Keine Zeile über dem Titel.

**Kennzahlen-Kacheln (TimeSpot-Muster):** 4 Kacheln — Label oben links, Mono-Tag oben rechts (m² / Gesamt / + 2 WC / Erstbezug), große enge Zahl unten. **Genau eine Kachel invertiert (Ink)** = die wichtigste Zahl (Wohnfläche). Desktop 4 Spalten, mobil 2×2.

**Galerie:** Hero-Bild groß mit eigener Fläche (16:9.4 Desktop, 4:3 mobil), darauf NUR der Glas-Zähler („1/33 · Galerie öffnen"). Darunter 4 Thumbnails. Titel/Preis liegen NIE auf dem Foto.

**Inhaltssektionen:** Über dieses Objekt (2 Absätze + „Vollständige Beschreibung"-Textbutton) → **Raumprofil (berechnet — siehe eigene Anatomie unten)** → Highlights (Hairline-Zeilen: Merkmal links, Wert rechts) → Ausstattung (Key-Value zweispaltig, mobil einspaltig) → Grundrisse (2 Karten mit Ecken-Pfeil) → Energieausweis (B-Badge 56 px im Rounded-Square-Outline + Bedarfsausweis + Mono-Zeile fGEE/HWB).

**Raumprofil-Modul (berechnet, automatisch für JEDE Immobilie):** Zwei Kennzahlen, die aus den Objektdaten gerechnet werden und den Grundriss-Charakter einordnen. Darstellung in der Lineal-Sprache des Radio-Dials: pro Kennzahl eine horizontale Tick-Skala mit oranger Indikatorlinie auf der berechneten Position, links/rechts Mono-Pol-Labels, daneben der Wert groß (Kachel-Typo der Kennzahlen), darunter EIN kurzer Interpretationssatz (automatisch aus dem Band gewählt). Keine Ampelfarben, kein Score-Gimmick — eine ruhige Skala pro Wert.

*Kennzahl 1 — Fläche je Zimmer:* `Wohnfläche ÷ Zimmeranzahl`, gerundet auf ganze m². Skala 15–50 m² (Werte darüber/darunter am Rand geklemmt), Pole „Effizient" ←→ „Großzügig". Interpretationsbänder (Arbeitsstand Wien, per Bestandsdaten kalibrieren): < 25 m² „Effiziente Grundrisse — viel Raumprogramm auf kompakter Fläche" · 25–35 m² „Ausgewogenes Verhältnis von Fläche und Zimmern" · > 35 m² „Sehr großzügige Raumzuschnitte". Beispiel Hernals: 140,95 ÷ 3 = **47 m²/Zimmer** → sehr großzügig.

*Kennzahl 2 — Außenflächen-Anteil:* `Außenfläche ÷ Wohnfläche × 100`, gerundet auf ganze %. Skala 0–50 % (geklemmt), Pole „Innenorientiert" ←→ „Außenorientiert". Bänder: < 10 % „Geringer Freiflächenanteil" · 10–25 % „Solider Freiflächenanteil" · > 25 % „Außergewöhnlich viel Freifläche — hebt die Wohnqualität, erklärt aber einen höheren Preis je m² Wohnfläche". Beispiel Hernals: 51,28 ÷ 140,95 = **36 %** → außenorientiert. Ergänzend als Mono-Zeile unter der Skala den Preis-Kontext automatisch mitrechnen: „Preis je m² Wohnfläche € 12.409 · inkl. gewichteter Freiflächen (Faktor 0,3) € 11.191" — der Gewichtungsfaktor 0,3 ist Arbeitsstand und zentral konfigurierbar.

*Rechenregeln:* Datenquellen sind die Systemfelder Wohnfläche, Zimmeranzahl, Summe aller Außenflächen (Terrasse + Balkon + Garten + Loggia), Kaufpreis. Fehlt die Zimmeranzahl → Kennzahl 1 ausblenden. Außenfläche = 0 → Skala 2 zeigt Indikator am linken Pol mit Satz „Keine eigenen Freiflächen" (nicht ausblenden — die Information ist relevant). Fehlt die Wohnfläche → gesamtes Modul ausblenden. Niemals mit Teil- oder Schätzwerten rechnen; bei unvollständigen Daten lieber weglassen als raten.

**Rechte Spalte (Desktop sticky, top 80 px):** Preis-Karte (Mono-Label, große Preiszahl, Verfügbarkeits-/Maklerhinweis, Ink-Pill „Besichtigung anfragen", Text-Button „Exposé erhalten") → Marktdaten-Modul → Makler-Karte (Foto 50 px, Name, Mono-Rollen-Zeile) → Hinweis „Kontaktdaten geschützt — nach Login sichtbar".

**Marktdaten-Modul (hell, Orange-Akzent — NICHT dunkel):**
- Kopf: Mono „Marktdaten" + Live-Pill (oranger Rahmen, pulsierender Punkt) + Ecken-Pfeil.
- Große Zahl mit **Ghost-Ziffer** (führende 0 in 14 % Deckkraft: „018") + orange Delta-Pill „+6", darunter Mono-Label.
- 14 feine, runde Balken (max. 10 px, grau, aktiver Balken orange), darunter **Lineal-Scrubber**: Tick-Skala + 2.5 px orange Indikatorlinie, Ziehen highlightet den Tag und zeigt „Di · 4 Anfragen".
- 3 Hairline-Zeilen (Besichtigungen geplant · Ø Antwortzeit · Exposé-Abrufe).
- 2 getönte Kacheln ohne Rahmen mit Ecken-Pfeil („72 %" — nur das %-Zeichen orange · „46 auf Merklisten").
- Datenfelder = echte System-Metriken (Anfragen, Besichtigungen, Exposé-Abrufe, Merklisten) — das Modul ist zugleich Produkt-Spec.

**Galerie-Overlay (das Gimmick):** Klick auf Hero/Thumbnail → Vollbild: aktives Foto als Bühne + dunkler Frosted-Layer (blur 26 px, Tint 42 %) + mittig der **rotierte Foto-Stack** (Tipp = oberstes Bild federt nach hinten, Bühne wechselt synchron) + Glas-Thumbstrip unten + Titel/Zähler/Kreis-Close oben, ESC schließt. Deck-Format: **mobil 3:4 (max. 380 px), Tablet 4:3, Desktop 16:10 (max. 680 px)**.

## 5. Animationen (alle mit der einen Easing-Kurve)

Hero: Fade + Zoom 1.05→1 beim Laden · Thumbnails gestaffelt (70 ms) · alle Sektionen/Karten: Scroll-Reveal 18 px Lift, 700 ms, via IntersectionObserver · Marktdaten beim Eintritt: Balken wachsen gestaffelt von unten (45 ms/Balken), Zahl zählt 0→18 (900 ms, Ease-Out), Delta-Pill ploppt danach; Stagger-Delays danach zurücksetzen, damit der Scrubber sofort reagiert · Overlay: Bühne zoomt 1.06→1, Deck fliegt von unten ein, Bar/Strip folgen gestaffelt · `prefers-reduced-motion`: alles aus, Inhalte stehen sofort.

## 6. Responsive

≥1000 px: Zweispalter (Inhalt max. 660 px + Rail 340 px sticky). <1000 px: einspaltig, Preis-Buttons wandern in die fixe dunkle Glas-CTA-Bar unten (Preis links, heller Pill rechts, Safe-Area-Insets). <720 px: Hero 4:3, Kennzahlen 2×2, Key-Value einspaltig, Grundrisse gestapelt. Sticky-Elemente mit `100svh`-Logik gegen URL-Bar-Sprünge.

## 7. Inhalte & Platzhalter

Objektdaten aus dem UNIO-System übernehmen (Struktur wie app.unio.at/property/2). Marktdaten-Werte sind DEMO — an echte Systemfelder anbinden oder als Demo kennzeichnen. **Raumprofil-Werte werden IMMER live gerechnet, nie hinterlegt** — die Bänder und der Gewichtungsfaktor sind zentrale Konfiguration (Arbeitsstand, mit Bestandsdaten kalibrieren). `[Makler-Name]` + Foto sind Platzhalter. Fotos im Prototyp sind Bestandsmaterial — durch echte Objektfotos ersetzen. Keine Zahlen erfinden; fehlende Werte als `[PLATZHALTER]` melden. Rechtstexte (Doppelmakler-Hinweis etc.) aus der Live-Seite übernehmen, als aufklappbaren Bereich unter der Beschreibung.

## 8. Abnahme

Zwei Ebenen eingehalten, keine Box-in-Box · genau eine invertierte Kennzahl-Kachel · genau ein dunkles Element pro Viewport-Zone · Raumprofil rechnet korrekt (Testfall Hernals: 47 m²/Zimmer · 36 % Außenanteil) und behandelt alle Fehlend-Fälle gemäß Rechenregeln · Scrubber reagiert verzögerungsfrei nach der Eintritts-Animation · Overlay-Deck wechselt die Bühne synchron · alle drei Breakpoints geprüft (375 / 768 / 1280) · reduced-motion getestet · Icons ausschließlich Stroke-SVG.
