# UNIO — Korrektur-Briefing Makler-Seite (v1, final)
## Für Claude Design · Design führt, Funnel-Logik folgt · Referenzbilder liegen bei (Porträt-Datenkarten, Mosaik-Porträt, Porträt mit Glas-Chips + bestehende Referenzen)

---

## 0. Diagnose & Auftrag

Die Makler-Seite ist inhaltlich die stärkste Unterseite (Drei-Fragen-Sektion, Rechner, Schritte-Karte). Drei strukturelle Schwächen: **(1) Keine Menschen** — auf einer Community-Seite gibt es kein Porträt, keinen Namen, kein Gesicht; das Testimonial ist leer, der Admin-Moment zeigt eine Küche. **(2) Hero** mit statischer Riffelglas-Naht und frei schwebenden CTAs wie auf der Bauträger-Seite vor dem Umbau. **(3) Redundanz** — „80 % weniger Admin" erscheint zweimal wörtlich, die Vier-Zeilen-Benefit-Liste wiederholt Bento- und Fragen-Inhalte.

Auftrag: Menschlichkeit als Gestaltungsprinzip in die Seite bauen (Menschen, die mit Menschen, software-enabled, für Menschen arbeiten), Hero neu inszenieren, Redundanzen auflösen. Die Rhythmus-Regeln des Bauträger-Briefings v3 gelten auch hier (Kapitel-Marker, Grid-Hairlines, max. EIN Bento, jede Kennzahl genau einmal, Micro-Animations-Grammatik, Easing `cubic-bezier(.32,.72,0,1)`).

## 1. Menschlichkeits-Leitplanken (bindend für die ganze Seite)

- **Echte Menschen vor Illustration:** Partner-, Gründer- und Team-Porträts, warme Alltagssituationen (Besichtigung, Übergabe, Gespräch, Kaffee in Wien) — keine Anzug-Stock-Ästhetik, keine KI-generierten Fake-Makler. Solange echte Partnerfotos fehlen: `[PLATZHALTER: Porträt Partner]` und ehrlich gestalten („Die ersten Plätze im CIRCLE werden gerade vergeben") — Ehrlichkeit ist Markenregel, ein leerer Stuhl ist glaubwürdiger als ein gekauftes Gesicht.
- **Daten liegen AUF Menschen, nicht neben ihnen** (Porträt-Datenkarten-Referenz): dünne Linien-Overlays, kleine Zahl + Sparkline direkt auf dem Foto — Mensch und Zahl als ein Bild.
- Jede Ink-/Systemsektion enthält mindestens ein menschliches Element (Porträt, Name, Handschrift-Moment, O-Ton), jede Mensch-Sektion ein Systemelement (Datenpunkt, Chip) — die Verschränkung IST die Botschaft.
- Du-Anrede konsequent (bestehend, beibehalten).

## 2. CTA- & Funnel-System (zweite Schicht)

- **Primärziel: „Als CIRCLE Partner bewerben."** Nav-CTA auf dieser Seite kontextualisieren: „Bewerben" statt „Demo buchen" (Entscheidung global abstimmen — pro Audience-Seite der passende Nav-CTA).
- **Drei CTA-Momente vor dem Finale:** (a) Hero (Rechner-Anchor + „In drei Schritten dabei"-Anchor), (b) CTA an der Rechner-Ergebnis-Karte (existiert), (c) Sticky Micro-Pill „Bewerben →" ab 50 % Scrolltiefe (mobil aus).
- Bewerbungs-Formular: 3 Felder (Name, E-Mail, Track-Record & Motivation — „zwei Zeilen genügen" als Placeholder-Text im Feld) + Reassurance „Persönliches Gespräch statt Auswahlverfahren · Antwort in 48 h".
- Tracking-Naming: `chapter_view_01…09`, `rechner_interact`, `rechner_result_cta`, `bewerbung_submit`.

## 3. Neue Dramaturgie (9 Kapitel)

**Bogen:** Identität → Schmerz (Fragen) → Die Menschen (CIRCLE) → Das System → Entlastung → Rechnen → Ownership → Bewegung → Bewerben.

---

### 01 · HERO — Neuaufbau: Mensch trifft Raster

Headline bleibt (sie ist stark): **„Nicht die Agentur. Nicht das Portal. Du."** Neue Inszenierung:
- **Vollbild-Porträt** einer Makler:in (warm, Wien, Alltag — `[PLATZHALTER]` bis echt), Blick in Richtung Headline.
- **Statt Riffelglas: der Signal-Raster-Dissolve** (Mosaik-Porträt-Referenz — und zugleich das markeneigene Raster-Motiv): Der rechte Bildrand löst sich in das Dreiecks-/Pixel-Raster auf, einzelne Zellen driften leicht; das Gesicht bleibt IMMER scharf. Lesart: Der Mensch wird Teil des Systems, ohne darin zu verschwinden. Damit unterscheiden sich die beiden Heros klar: Bauträger = Klarheits-Reveal (Riffelglas löst sich), Makler = Mensch-Raster-Verschränkung.
- 2–3 Mono-Datenpunkte docken mit Hairlines am Porträtrand an: „100 % Provision" · „Deine Marke" · „Beteiligung möglich".
- CTAs verankert unter der Subline (nicht schwebend): Ink-Pill „Was bleibt für dich? → Rechner" (Anchor zu 06) + Ghost „In drei Schritten dabei" (Anchor zu 09).

### 02 · DIE DREI FRAGEN — bleibt (stärkste Sektion), Feinschliff

Zweifarbige Frage-Typo (Ink-Frage + graue Fortsetzung) und Nummerierung bleiben exakt. Feinschliff: Zeilen scrollen gestaffelt ein; die CIRCLE-Antwort wird ein eigener Beat — nach der dritten Frage kurze Halte-Pause, dann die Antwort mit orangem Punkt und etwas größerem Grad. Kein weiterer Umbau.

### 03 · NEU: GESICHTER DES CIRCLE — die Menschlichkeits-Sektion

Der Kern des Auftrags. **Porträt-Datenkarten** (Referenz: Health-Cards): 3–4 hochformatige Partner-Porträts, auf jedem ein dünner Linien-Rahmen mit einer persönlichen Zahl + Mini-Sparkline + einer Zeile — z. B. `[PLATZHALTER: „12 Abschlüsse /25"]` · `[„im CIRCLE seit 2024"]` · `[„Fokus 1020–1220 Wien"]`. Karten leicht versetzt (nicht gleichhoch), eine Karte trägt statt Porträt den ehrlichen Slot: „Die ersten Plätze werden gerade vergeben — deiner?" mit Bewerben-Textlink. Darunter eine Zeile O-Ton-Platzhalter `[PLATZHALTER: echter CIRCLE-Partner — Name, Foto, Zitat]` im Formora-Zitat-Stil. Mono-Marginale: „Kuratiert · Wien zuerst". **Keine erfundenen Namen, keine Stock-Gesichter als »Partner«.**

### 04 · DAS SYSTEM — Bento bleibt (das EINE Bento der Seite)

„Ein System für deinen gesamten Verkauf." mit den bestehenden Kacheln (KI-Suche & Lead-Inbox, Provisionssicherung, Suggested Actions, Portal-Export, Besichtigung & Kalender, Automatisches Matching, KI-Objektanlage 56 %). Schärfungen: (a) Die KI-Suche-Kachel wird lebendig — der Beispiel-Prompt tippt sich selbst („Penthouse mit Terrasse, 1190…"), Treffer-Chips ploppen nacheinander; (b) Suggested Actions haken sich nacheinander ab (Häkchen-Animation); (c) **eine Kachel wird menschlich:** „Dein Ansprechpartner im CIRCLE" mit kleinem Porträt `[PLATZHALTER]` — Software-Bento mit einem Gesicht darin. Portal-Export (IS/W) und Kalender bleiben.

### 05 · 80 % WENIGER ADMIN — der Porträt-Moment mit Glas-Chips

Ersetzt das Küchenfoto. **Referenz „Porträt mit schwebenden UI-Chips":** dunkles, warmes Porträt einer Makler:in im Gespräch mit Kund:innen `[PLATZHALTER]`; um den Kopf schweben Glas-Chips (Exposé · CRM · Termine · Abrechnung · Closing). **Animation:** Beim Scrollen sortieren sich die Chips nacheinander aus dem Gesichtsfeld in eine saubere Spalte am Bildrand und erhalten Häkchen — die Plattform räumt sichtbar weg, der Mensch bleibt beim Menschen. Headline „80 % weniger Admin. 100 % mehr Makeln." erscheint NUR hier (Doppelung in der alten Liste entfällt). Mono-Caption „Sortiert · Automatisch" bleibt.

### 06 · DER RECHNER — bleibt, Feinschliff

„Was bleibt für dich?" mit Slider und oranger Ergebnis-Karte bleibt strukturell. Feinschliff: Ergebnis-Zahl mit Ghost-Ziffer-Typo und Count-up bei Slider-Release; Vergleichsbalken in der feinen runden Chart-Sprache; Fußnote (Software-Beitrag, 85 %/100 %-Staffel) bleibt als Mono. CTA an der Karte bleibt Moment (b).

### 07 · ECHTE BETEILIGUNG — eigener Typo-Moment (statt Listenzeile)

Ownership ist DER Differenzierer und verdient mehr als eine Zeile. Heller Typo-Moment im Stil des „100 %"-Kapitels der Bauträger-Seite: große Headline **„Du baust auf, was dir gehört."**, daneben drei Key-Value-Hairline-Zeilen ohne Karte: „Unternehmensbeteiligung — für Top-Performer" · „Gewinnbeteiligung — für die Community" · „Details — im persönlichen Gespräch". Bewusst ohne Zahlen (rechtlich heikel, Regel aus dem Arbeitsauftrag). Die alte Vier-Zeilen-Benefit-Sektion („Selbstständig im Handeln…") **entfällt ersatzlos** — ihre Inhalte stecken in 02/04/05/07.

### 08 · DIE BEWEGUNG — Ink-Sektion, menschlich aufgeladen

„Eine Bewegung. Kein Maklerpool." bleibt als Ink-Kapitel, bekommt aber Menschen: Hinter/neben der Typo eine ruhige Reihe kleiner Rund-Porträts `[PLATZHALTER]` mit einem „+ Du"-Kreis am Ende (der Community-Gedanke als Bild). Chips (Ownership · Transparenz · Kuratiert · Wien zuerst) bleiben.

### 09 · IN DREI SCHRITTEN DABEI + BEWERBUNG

Die Schritte-Karte (01 Bewerbung / 02 Gespräch / 03 Onboarding) bleibt — sie ist gut. Ergänzung Menschlichkeit: neben Schritt 02 ein Mini-Porträt `[PLATZHALTER: wer das Gespräch führt — Name, Rolle]` („Du sprichst mit einem Menschen, nicht mit einem Funnel"). Oranger CTA „Als CIRCLE Partner bewerben →" bleibt Finale; darunter das 3-Felder-Formular oder Link dorthin.

## 4. Entfällt ersatzlos

Sektion „Selbstständig im Handeln. Getragen vom Netzwerk." (Vier-Zeilen-Liste + „Zum Rechner zurück"-Button — Rückwärts-Navigation streichen) · zweite „80 % weniger Admin"-Nennung · Küchenfoto als Admin-Illustration · „Demo buchen" als Nav-Primär-CTA auf dieser Seite.

## 5. Abnahme

Menschen auf der Seite: mindestens vier Porträt-Momente (Hero, Gesichter des CIRCLE, Admin-Moment, Schritte) — alle als ehrliche Platzhalter bis echtes Material da ist, keine Fake-Partner · Hero-Raster-Dissolve läuft ruhig, Gesicht bleibt durchgehend scharf · Chips-Sortier-Animation erklärt Entlastung ohne Text · „80 %" und jede andere Kennzahl genau einmal · genau ein Bento · Drei-Fragen-Sektion unangetastet stark · Kapitel-Marker 01–09 · CTA-System wie definiert · Mobile + reduced-motion geprüft.
