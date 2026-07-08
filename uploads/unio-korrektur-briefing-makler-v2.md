# UNIO — Makler-Seite: Addendum v2 (Software-Momente + CIRCLE-Grafik)
## Für Claude Design · Baut auf dem umgesetzten v1-Briefing auf — v1-Regeln gelten weiter.
## Referenzen liegen bei: Datenblock-Porträt (schwebende Glas-Chips), Porträt-Datenkarten.

---

## 0. Ausgangslage

v1 ist gut umgesetzt: Gesichter des CIRCLE, Chips-Moment, Beteiligung als Typo-Moment, Bewegung mit Porträtreihe, Formular, Kapitel-Marker. Dieses Addendum ergänzt zwei große Momente und macht die Seite insgesamt scrollgetriebener. Kernbotschaft der Ergänzungen: **Die Software ist das Kernstück — und sie enabled echte Menschen.**

## 1. NEU · Kapitel 04b: „Objektanlage, live." — die gepinnte Verwandlungs-Sequenz

Der wichtigste neue Moment der Seite. Platzierung: **eigenes Kapitel direkt nach dem System-Bento (04), vor der Entlastung (05).** Die orange KI-Objektanlage-Kachel im Bento verliert ihre Prozent-Zahl und bekommt stattdessen die Zeile „Dokumente rein — Vermarktung raus." mit einem Ecken-Pfeil, der auf die Sequenz verweist. **Die Zahl 42 % lebt ab jetzt NUR in dieser Sequenz** (jede Zahl genau einmal).

**Dramaturgie (gepinnte Sektion, ~300vh Scroll-Strecke, drei Phasen, scrollgetrieben gescrubbt):**

**Phase 1 — Der Papierstapel (0–35 %):** Von den Bildrändern fliegen scrollgetrieben Dokument-Karten herein, leicht rotiert (Stapel-Ästhetik, Referenz Datenblock-Porträt): `BAB` · `GRUNDRISSE` · `ENERGIEAUSWEIS` · `GRUNDBUCHSAUSZUG` · `FOTOS` · `NUTZWERTGUTACHTEN`. Jede Karte: helle Fläche, Mono-Label, Stroke-Dokument-Icon (1.5px), dünner Ink-Rahmen. Headline links, stehend: „Du ziehst Dokumente rein." Sie sammeln sich unordentlich in der Mitte — bewusst leicht chaotisch, das ist der Ist-Zustand des Berufs.

**Phase 2 — Der Kern (35–60 %):** Die Karten ziehen sich in ein zentrales Quadrat mit dem Signal-Raster zusammen (der UNIO-Kern), verkleinern sich, verschwinden darin. Das Raster pulst kurz orange (Processing), eine dünne Fortschritts-Hairline füllt sich. Headline wechselt: „Die KI liest, strukturiert, erstellt." Kein Spinner, kein Tech-Kitsch — nur Raster, Puls, Linie.

**Phase 3 — Die fertige Immobilie (60–100 %):** Aus dem Kern fächern auf der anderen Seite die fertigen Assets heraus, sauber ausgerichtet (Ordnung als Kontrast zu Phase 1): `EXPOSÉ` (Dokument-Karte mit Miniatur-Layout) · `ONLINE-INSERAT` (Browser-Mini-Frame) · `BROSCHÜRE` · `FALTSCHILD / BAUTAFEL` · `SUCHPROFIL-MATCH` (Chip mit Häkchen: „Passender Käufer gefunden"). Jedes Asset bekommt beim Andocken ein selbstzeichnendes Häkchen. Schluss-Stat groß in Mono: **„42 % weniger Tipparbeit pro Objekt."** Darunter der Mensch-Anker: „Du prüfst und gibst frei — den Rest macht das System." mit einem kleinen Freigabe-Button-Motiv (Pill mit Häkchen).

**Technik:** Position sticky, Phasen über Scroll-Progress gescrubbt (kein Autoplay), Karten-Transforms mit `cubic-bezier(.32,.72,0,1)`, Stagger 60–120 ms innerhalb der Phasen. **reduced-motion:** statisches Vorher/Nachher-Diptychon (links Stapel, rechts Assets, Kern mittig). **Mobile:** Sequenz bleibt gepinnt, Karten kleiner, maximal 4 Dokumente + 3 Assets sichtbar, Rest als „+2"-Chip.

## 2. NEU · Upgrade Kapitel 08: „Der Kreis schließt sich." — die CIRCLE-Grafik

Die Bewegung-Sektion (orange) bekommt das Markenmotiv als Choreografie: **Ein großer SVG-Kreis zeichnet sich scrollgetrieben** (stroke-dashoffset, Hairline in Cream auf Orange, 1.5px). Während er sich zeichnet, **docken die Rund-Porträts nacheinander auf der Kreisbahn an** (die bestehende Porträtreihe wandert AUF den Kreis), zwischen ihnen erscheinen dünne Verbindungslinien — der Dealflow, der im CIRCLE geteilt wird. **Der letzte Punkt auf der Bahn bleibt leer, trägt „+ Du" und pulst orange-invertiert.** Headline und Copy bleiben aus v1 („Eine Bewegung. Kein Maklerpool."), die Grafik ersetzt die statische Reihe. Im Zentrum des Kreises: nur der Claim in Mono oder nichts — keine Füll-Illustration.

**Kreis-Motiv dezent wiederholen,** damit es Markensprache wird statt Einzelgag: Scroll-Progress der gepinnten Sequenzen als kleiner Kreisbogen (statt Balken), Häkchen in Kreisen, das orange O in CIRCLE-Wortmarken. Nicht mehr als diese drei Stellen — sonst Ornament.

## 3. Mehr scrollgetriebene Momente (Übersicht, was scrubbt vs. was einmalig einblendet)

**Scrollgetrieben gescrubbt (Position folgt dem Finger):** Objektanlage-Sequenz (04b) · CIRCLE-Kreiszeichnung (08) · Chips-Sortierung am Admin-Porträt (05, aus v1 — von einmaliger Animation auf Scrub umstellen: die Chips wandern MIT dem Scroll in die Spalte).
**Einmalig beim Eintritt (IntersectionObserver, dann Ruhe):** Drei-Fragen-Staffelung (02) · Porträt-Datenkarten-Reveal (03) · Bento-Kacheln-Stagger (04) · Rechner-Count-up (06) · Beteiligung-Typo-Reveal (07) · Formular (09).
Diese Zweiteilung ist verbindlich — nicht alles darf scrubben, sonst fühlt sich die Seite zäh an. Faustregel: **Verwandlungen scrubben, Auftritte spielen einmal.**

## 4. Abnahme

42 % existiert genau einmal (in der Sequenz) · Bento-Kachel verweist auf Sequenz · Sequenz hat klare Drei-Phasen-Lesbarkeit auch beim schnellen Scrollen · Kreis zeichnet sich vollständig erst kurz VOR dem „+ Du"-Puls · reduced-motion-Fallbacks für beide neuen Momente · Mensch-Anker in beiden Momenten vorhanden („Du prüfst und gibst frei" / „+ Du") · Mobile geprüft · v1-Regeln (Menschlichkeits-Leitplanken, ehrliche Platzhalter, Du-Register) unverändert eingehalten.
