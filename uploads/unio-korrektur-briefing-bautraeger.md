# UNIO — Korrektur-Briefing Bauträger-Seite (v3, final)
## Für Claude Design · Design führt, Funnel-Logik folgt · Referenzbilder liegen bei (Rampage, DBS02-X, EcoSoft, RIVVA, Granger, Discover, TimeSpot)

---

## 0. Diagnose & Auftrag

Die aktuelle Seite nutzt EINEN Sektions-Archetyp (Headline links + drei gleiche Karten) sechsmal, erzählt System und Cases doppelt und baut die Lernkurve statisch. Auftrag: neue Dramaturgie mit variierten Sektions-Architekturen, animiertem Storytelling und klarer Funnel-Führung. **Priorität: Das Design muss außergewöhnlich sein — besondere Gimmicks und animierte Erzählmomente zuerst, Conversion-Logik als zweite Schicht darunter.**

## 1. Globale Rhythmus-Regeln (bindend)

1. **Maximal EIN Karten-Bento auf der Seite** (Sektion 06). Jede andere Sektion hat eine eigene Architektur.
2. Headline-Positionen und Maßstäbe variieren — nie zweimal hintereinander gleich; auf typo-dominante Sektionen folgen bild- oder modul-dominante.
3. **Kapitel-Marker** (RIVVA): Mono `01 — Problem` … `10 — Projekt prüfen` am Sektionsrand mit feiner vertikaler Hairline.
4. **Vertikale Grid-Hairlines** in den hellen Sektionen; Elemente docken sichtbar an ihnen an.
5. **Jede Kennzahl genau EIN Auftritt** auf der Seite.
6. Farb-Dramaturgie: Hell → Hell → Hell → Ink → Ink → Hell (Bento) → Hell (100 %) → Hell → Hell → Strecke/Ink → Funnel.
7. Micro-Animations-Grammatik: 2D · 1–1.5 px Strich · drei Farben (Basis/Ton/Orange = Bedeutung) · Easing `cubic-bezier(.32,.72,0,1)` · 700–1200 ms, Stagger 60–120 ms · einmalig per IntersectionObserver · Count-up für Zahlen · `prefers-reduced-motion` → Endzustand. Bausteine der Detailseite wiederverwenden (Count-up, Ghost-Ziffer, feine runde Balken, Lineal-Skala).

## 2. CTA- und Funnel-System (zweite Schicht, dezent)

- **Ein primäres Ziel:** „Projekt prüfen lassen" (niedrigschwellig, Antwort in 48 h, mit Daten). Nav-CTA wird darauf umgestellt — „Demo buchen" entfällt als konkurrierendes Ziel (oder wandert als Textlink in den Footer).
- **Drei CTA-Momente vor dem Finale, nicht mehr:** (a) Hero-Buttons, (b) leiser Inline-Textlink nach dem Beweis (Sektion 03), (c) kontextueller CTA am Simulator-Ergebnis („Mit echten Zahlen rechnen →" führt in den Funnel). Alles andere bleibt CTA-frei — die Seite verkauft über Erlebnis.
- **Sticky Micro-CTA:** ab 50 % Scrolltiefe kleine Glas-Pill unten rechts „Projekt prüfen →" (44 px, dezent, verschwindet in Ink-Sektionen mit hellem Rand, auf Mobile aus).
- **Simulator als Soft-Conversion:** unter dem Ergebnis ein Ghost-Button „Ergebnis mit Bezirks-Benchmarks als PDF" → E-Mail-Feld inline (ein Feld, keine Modal-Orgie). Warm-Audience-Aufbau.
- **Tracking-Events benennen** (für spätere Meta/LinkedIn-Kampagnen): `chapter_view_01…10`, `simulator_interact`, `simulator_pdf`, `strecke_complete`, `funnel_submit`. Nur Naming, kein Tool-Setup.
- Funnel-Formular: maximal 3 Felder (Name, E-Mail, Projekt-Link/PDF optional) + Reassurance-Zeile „Vertraulich · Antwort in 48 h · mit Daten".

## 3. Neue Dramaturgie (10 Kapitel)

**Bogen:** Schmerz → Beweis → Mechanik → Lernkurve → Nutzen → Ökonomie → Selbst rechnen → Einwände → Referenzen erleben → Handeln.

---

### 01 · HERO — Neuaufbau (Split statt Vollbild)

Der aktuelle Hero wirkt deplatziert, weil das statische Riffelglas wie eine Bildnaht aussieht, die Headline auf unruhigem Bildgrund liegt und die Buttons frei schweben. Neuaufbau als **Split-Hero:**
- **Links (~45 %), Off-White, ruhig:** Headline als Treppen-Satz in drei Zeilen — „Wissen, was funktioniert — / bevor / gebaut wird." (Zeile 2 Outline, Zeile 3 mit orangem Punkt), darunter eine Zeile Subline, darunter die zwei CTAs als klare Reihe (Ink-Pill + Ghost). Grid-Hairlines beginnen hier.
- **Rechts (~55 %), volle Höhe, Projektfoto:** Beim Laden läuft der **Klarheits-Reveal einmal als Choreografie**: Riffelglas löst sich in ~1,6 s von links nach rechts auf; sobald klar, docken 2–3 Mono-Datenpunkte mit Hairlines an konkrete Bildstellen an („Preisband kalibriert" · „Nachfrage-Score 72" · „Top 4 reserviert"). Der Effekt wird vom statischen Zustand zum erzählten Moment: Software macht das Projekt lesbar.
- **Unterkante:** drei Stat-Karten überlappen die Bildkante (DBS02-X): `282 Anfragen · Ecoluxe` / `+31 % über Zielpreis` / `100 % erfolgsbasiert`.
- **P0-Flag:** Im aktuellen Hero-Render ist ein „SOLD — Sotheby's"-Schild sichtbar — Fremdmarke auf der eigenen Seite. Bild ersetzen oder retuschieren, bevorzugt echtes Projektfoto statt Render.

### 02 · DAS PROBLEM — Treppen-Statement (Rampage)

Drei riesige, versetzt gestaffelte Typo-Zeilen: „Blackbox." (links) / „Bauchgefühl." (eingerückt) / „Kein Rückkanal." (rechts auslaufend), je mit zweizeiliger Marginale (gekürzte Kartentexte) und kleinen Mono-Annotationen dazwischen. Zeilen scrollen gestaffelt ein. **Gimmick:** Hinter „Blackbox." ein kleines Bildfragment hinter Riffelglas, das sich NICHT klärt — bewusster Kontrast zum Hero. Darunter Logo-Zeile „Erfahrung aus Marketing & Vertrieb für Rhomberg · Winegg · Soravia".

### 03 · DER BEWEIS — ein Case, gestaffelte Zahlen (RIVVA)

Formora-Vollbild-Slide Ecoluxe („Verkauft, bevor der Markt es glaubte.") bleibt. Darunter **vier Stat-Karten treppenförmig entlang der Grid-Hairlines** auf unterschiedlichen Höhen: `61 · Anfragen/2 Wo. · Das Albrecht` / `27 · Anfragen/2 Wo. · Beheim` / `40 · Anfragen nach Übernahme · Penthouse € 4 Mio` / `25 · hochqual. Anfragen/Wo. · ObenZwei` — mit Count-up. Danach leiser Inline-CTA (Textlink mit Pfeil): „Ihr Projekt so prüfen lassen →". Separate Case-Galerie entfällt (Kapitel 09/10 liefern die volle Referenz-Erfahrung).

### 04 · DAS SYSTEM — Pipeline-Linie mit vier Erklär-Animationen (Ink)

Fusioniert „Drei Module" + System-Erklärung. Eine durchgehende SVG-Linie (scrollgetrieben) durch vier Stationen, jede mit Micro-Animation, die den Teilschritt OHNE Lesen erklärt:
1. **Markttest (NOVA):** Chips Preisband · Grundrisse · Zielgruppen · Milieus pulsieren nacheinander auf und erhalten Häkchen.
2. **Nachfrage (LEAD ENGINE):** Mini-Funnel — vier feine Balken füllen sich gestaffelt (Leads → Qualifiziert → Besichtigung → Kauf), letzter Punkt orange.
3. **Vertrieb (CIRCLE):** Matching — zwei Punktreihen (Einheiten/Käuferprofile), Linien verbinden sich, ein Match rastet orange ein.
4. **Steuerung (LENS):** Browser-Frame-Miniatur, Kurve zeichnet sich selbst, Zähler tickt.
Modulnamen nur hier, als Mono-Marginalien.

### 05 · DIE LERNKURVE — das wachsende Dashboard (Ink, gepinnt ~250 vh)

**EIN LENS-Panel wird über drei Scroll-Stationen voller:** Tag 30 „Erste Signale — Zielgruppen validiert, Preisband kalibriert" → Tag 90 „Muster werden Plan — Cost/Lead sinkt" → Tag 180 „Steuerbarer Abverkauf — Einheiten-Takt steht". Rechts wandert eine Tag-Skala (30/90/180) mit orangem Marker (Lineal-Sprache). Ersetzt die drei statischen Karten vollständig.

### 06 · WAS SIE DAVON HABEN — das Bento (bleibt, wird Nutzen- statt Modul-Bento)

Der einzige Karten-Moment der Seite, gemischte Kachelgrößen (DBS02-X), Inhalte sind die **abgeleiteten Bauträger-Vorteile** — hier steckt das geschärfte Gesamtkonzept:
- **Dunkle Hero-Kachel (groß): „Schneller zur Vorverwertungsquote."** Vorgemerkte Nachfrage (1 240 Käuferprofile im Matching) zahlt direkt auf die von Banken geforderte Vorverkaufsquote ein → frühere Finanzierungsfreigabe, früherer Baustart. Das CFO-Argument der Seite.
- **Orange Kachel: „T+8"** — Ø Tage bis Abverkauf · Pilotprojekte (einziger T+8-Auftritt).
- **„Standzeit kostet Zinsen."** Jeder Monat weniger Vermarktungsdauer senkt die Zwischenfinanzierung — Tempo als Euro-Größe, nicht als Marketing-Wort. (Mini-Sparkline abwärts, orange Endpunkt.)
- **„Der Mix wird getestet, bevor er gebaut wird."** Grundrisse, Preisband und Zielgruppen am echten Markt validiert — weniger Umplanung, weniger Margen-Risiko. (Chips-Motiv aus Station 1.)
- **„Absagen fließen zurück ins Projekt."** Besichtigungs- und Absage-Gründe als strukturierter Rückkanal für Ausstattungs- und Preisentscheidungen. (Der positive Zwilling von Problem 03.)
- **„Ein Ansprechpartner statt drei Schnittstellen."** Agentur, Makler und Portal-Koordination fallen in ein System — weniger Reibung, keine Reporting-Meetings (Sie sehen live).
- **„Bank- & Beiratsfähig."** LENS-Auswertungen als Export für Finanzierungspartner und Gremien. (Kleines Dokument-Motiv.)
- Kachel mit Milieu-Chips: „Zielgruppen nach Milieus — Nachfrage mit Substanz statt Reichweite." (Eigennutzer · 1020–1220 Wien · € 0,6–1,8 Mio · Familien & Paare — bestehende Chips).
Alle neuen Formulierungen sind qualitativ — keine neuen Zahlen erfinden; Zins-/Quoten-Aussagen bleiben mechanismisch, nicht beziffert.

### 07 · DAS MODELL — der große Zahlen-Moment (EcoSoft/TimeSpot)

**„100 %" riesig über die volle Breite** (Ghost-Stil, %-Zeichen orange), darunter „erfolgsbasiert. Null Risiko-Theater." Key-Value-Zeilen direkt auf der Fläche (Vergütung / Reporting / Markttest / Exit-Logik) — ohne Karte. Foto-CTA-Karte entfällt.

### 08 · SIMULATOR — bleibt, Feinschliff + Soft-Conversion

Ergebnis-Karte mit Ghost-Ziffer-Typo („**2** Monate"), Balken in der feinen runden Chart-Sprache, Benchmark-Platzhalter bleibt. NEU: Ghost-Button „Ergebnis mit Bezirks-Benchmarks als PDF" + Inline-E-Mail-Feld (Soft-Conversion). **Funnel-Erweiterung (optional, wenn schnell machbar):** dritte Ergebnis-Zeile „eingesparte Standzeit ≈ eingesparte Zwischenfinanzierung" als qualitativer Hinweis mit Info-Tooltip — keine erfundenen Zinssätze.

### 09 · EINWÄNDE — Akkordeon (Granger)

Kompakte Sektion vor der Strecke: 4–5 Akkordeon-Zeilen im Granger-Stil (Zeile + „+", Hairlines, keine Karten): „Was kostet es, wenn nicht verkauft wird?" (→ nichts, erfolgsbasiert) · „Wie schnell sind wir live?" · „Was passiert mit unseren Bestandsmaklern?" · „Wem gehören die Daten?" · „Wie steigen wir aus?" (→ klare Meilensteine). Antworten je 2–3 Zeilen, aus bestehender Copy ableiten, `[PLATZHALTER]` wo Fakten fehlen. Einwandbehandlung als ruhiges Design-Element statt FAQ-Karten-Grid.

### 10 · REFERENZ-STRECKE + FUNNEL

Wie separat gebrieft (`unio-briefing-projekt-strecke.md` v3 + Prototyp): horizontale Strecke → Marquee → CTA „Projekt prüfen lassen." → Funnel-Sektion (3 Felder + Reassurance).

## 4. Entfällt ersatzlos

Sektion „Drei Module. Ein Ergebnis: Abverkauf." (→ 04) · alte Case-Galerie (→ 03/10) · Modul-Bento-Inhalte, die Stationen doppeln (M-G-P-Kacheln, LENS-Funnel-Karte → in 04 aufgehoben; die Bento-Fläche selbst lebt als Nutzen-Bento in 06 weiter) · Foto-CTA-Karte in der Modell-Sektion · „Demo buchen" als Nav-Primär-CTA.

## 5. Abnahme

Kein Archetyp wiederholt sich direkt · genau ein Bento · jede Kennzahl einmal · Kapitel-Marker 01–10 · Hero-Reveal läuft als Lade-Choreografie und endet mit angedockten Datenpunkten · alle vier Stations-Animationen erklären ohne Text · Lernkurve als EIN wachsendes Panel · Bento transportiert die Nutzen-Argumente (Vorverwertung/Bank prominent als dunkle Hero-Kachel) · CTA-System wie definiert (ein Primärziel, drei Momente, Sticky-Pill) · Sotheby's-Schild entfernt · Mobile + reduced-motion geprüft.
