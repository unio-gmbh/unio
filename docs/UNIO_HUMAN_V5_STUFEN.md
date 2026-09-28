# UNIO HUMAN v5. Umsetzung in Stufen

Stand: 28.09.2026. Das Protokoll folgt der Werkzeug-Roadmap (`UNIO_HUMAN_ROADMAP.md`). Nach jeder Stufe gibt es:
- einen Crawl über alle Ansichten (Konsolenfehler, Gedankenstriche, leere Ansichten),
- gezielte Klicktests der neuen Abläufe,
- einen Abgleich mit dem Diagramm,
- eine Liste mit Verbesserungen.

Vault-Regeln, die ab v5 gelten (aus "Feedback, Dos & Don'ts" und "Design-Masterrichtlinien"):
- **Keine Eyebrows**, auch keine kleinen Zeilen über Headlines.
- **Keine Textzeichen als Icons.** Icons sind 1,5-px-Stroke-SVGs.
- **Keine Deko-Punkte.** Ein Punkt steht nur für einen Status.
- **Qualitätskontrolle vor jeder Abgabe.**
- **Liegen-Alarm** für Feedback, das offen bleibt.
- **Dritte Korrekturrunde** wird vorab als kostenpflichtig angekündigt.
- **Monatsreport ist Pflicht.**
- **Community-Nachrichten** werden binnen 60 Minuten beantwortet.

---

## Stufe 1. Foto-Engine

**Diagramm:** Foto Termin und Foto Upload, Shop Setup Foto, Website Setup mit Foto-Termin.

**Umgesetzt**
- **Einbettung:** `/maklerzuschnitt` läuft eingebettet (`?embed=1`, Stapel mit `&auto=1`). Der Nachrichtenvertrag lautet `zs:bereit`, `zs:bilder`, `zs:stand`, `zs:ergebnis`, `zs:fertig`. Im Frame heißen die Knöpfe "Übernehmen" und "Alle übernehmen".
- **Schultern und Arme:** Die Nasenspitze bleibt fix, nur die Größe wird verringert, bis die freigestellte Person mit 2,5 % Rand im Rahmen liegt. Es gibt zwei Grenzen:
  - höchstens auf 60 % der Guideline-Größe,
  - keine Fotokante darf in den Rahmen rutschen, an der die Person schon angeschnitten ist.
- **Qualitätswert:** 0 bis 100, zusammengesetzt aus Erkennung, Nase im Korridor, Auflösung, Schärfe (Laplace-Varianz im Gesicht), Belichtung und der Zahl der Personen. Dazu kommen Hinweise in Klartext: "Unscharf", "Zu dunkel", "Arme angeschnitten", "Auflösung zu gering". Unscharfe Fotos sind auf 55 gedeckelt, falsch belichtete auf 62.
- **HUMAN:** Porträts liegen in IndexedDB (im Betrieb im Objektspeicher, gleiche Schlüssel). Einzelne Fotos öffnen den Zuschnitt zum Nachjustieren. Mehrere Fotos laufen unsichtbar im Stapel, die beste Aufnahme wird aktiv. Fotos vom Termin lädt das Team hoch, die Maklerin wählt auf Heute.
- **Überall das eine Porträt:** Avatar, Handy-Vorschau, Website (auch als Porträt-Maske in Look 1 und 6), Studio, Downloads.
- **Stroke-Icons** ersetzen die Textzeichen im Zuschnitt.

**Tests**

| Test | Ergebnis |
|---|---|
| Vier Studiofotos und ein Querformat | Nase bei allen auf 50 % und 73 %, verkleinert auf 63 bis 76 %, Schultern und Arme ganz im Bild (Kontaktbogen geprüft) |
| Scharf, unscharf (Gauß 7 px), dunkel (35 %) | 99, 55 "Unscharf", 62 "Zu dunkel" |
| Upload der Maklerin | Porträt übernommen und nach dem Neuladen wieder da |
| Stapel vom Team | vier Einträge, Auswahl erscheint auf Heute |

**Gefundene Fehler, behoben**
- Die Einbettungsregel hat das mobile Layout des Werkzeugs überschrieben.
- Der Weg "Eigene Fotos" war nicht vorausgewählt.
- Die Auswahl auf Heute zeigte auch ungeeignete Fotos.

**Verbesserungen für später**
- Ein Avatar-Zuschnitt aus den Landmarken, damit das Gesicht im Kreis mittig sitzt, statt über `object-position`.
- Das Original liegt doppelt vor (Original und PNG). Im Betrieb soll das Original nach 30 Tagen weg.
- Hintergrundfarbe je Look: Für Looks ohne Maske könnte ein Verlauf aus dem Akzent hinter das Freistellbild.

---

## Stufe 2. Akquise und Onboarding

**Diagramm:**
- Agent Research, Kennenlernen, Follow ups, Deep Dive, Signing
- On-Boarding: Vertrag, Import, Termine, Visitenkarten

**Umgesetzt** (`human-werkzeuge.jsx`)
- **Termin-Planer:**
  - Freie Slots an Werktagen, höchstens zwei pro Tag mit mindestens vier Stunden Abstand.
  - Drehtage blockieren den Tag. Für den Foto-Termin werden sie dagegen bevorzugt, damit kein Extratermin nötig ist.
  - Beim Buchen wird eine Kalenderdatei (ICS) geladen.
  - Eingesetzt bei Kennenlernen, Strategie-Termin, Foto-Termin und Übernahme aus dem CRM.
- **Nachfass-Takt:** Nachrichten an Tag 0, 2, 7 und 14 aus Vorlagen. Fällige Kontakte stehen auf Team-Heute mit "Text kopieren" und "Gesendet". "Gesendet" schiebt den Kontakt in die nächste Runde.
- **Potenzial-Rechner im Deep Dive:**
  - Provision je Abschluss und Abschlüsse pro Jahr ergeben, wie viele Abschlüsse das Abo tragen.
  - Daneben steht, wie viel mehr Abschlüsse als heute das bedeutet.
  - Aus dem Bestand (Website, Instagram, Porträt, Bewertungen, LinkedIn) entstehen die Lücken fürs Gespräch.
- **Vertrag:** Text aus Abo und Makler, Unterschrift mit Namen, Zeitstempel und SHA-256-Prüfsumme. "Als PDF sichern" öffnet die Druckansicht.
- **Import-Mapper:**
  - Liest CSV (Trenner automatisch) und Excel (SheetJS).
  - Erkennt, ob es Kontakte oder Objekte sind, und ordnet die Spalten über Synonyme zu. Die Zuordnung lässt sich ändern.
  - Normalisiert Telefonnummern auf +43, prüft E-Mails und führt Dubletten zusammen.
  - Nennt Probleme je Zeile und fragt, was übernommen werden soll.
  - Für onOffice, Propstack und JUSTIMMO gibt es wahlweise "Export hochladen" oder einen Termin.
- **Visitenkarten-Druckdaten:**
  - Vorabprüfung: Telefon, E-Mail, Kontrast des Logos auf der Rückseite, Format, Mindestschrift.
  - Druck-PDF mit 85 × 55 mm, 3 mm Beschnitt und Schnittmarken.
  - Bestellen geht erst, wenn alles grün ist.

**Tests**

| Test | Ergebnis |
|---|---|
| Nachfassen | Jonas (Tag 0) und Mira (Tag 7) fällig. Nach "Gesendet" ist Jonas in Runde 1 und nicht mehr fällig |
| Import der Beispieldatei | 8 Zeilen, 6 übernommen, 1 Dublette zusammengeführt, 1 ungültige E-Mail gemeldet, Telefonnummern normalisiert |
| Vertrag | Unterschrift mit Prüfsumme gespeichert |
| Druck-PDF | zwei Seiten, 16 Schnittmarken, Anschnitt in Kartenfarbe |
| Crawl | 36 Ansichten ohne Fehler |

**Gefundene Fehler, behoben**
- Der Kopieren-Baustein zeigte den ganzen Text und sprengte die Zeile. Neu ist der kompakte `KopierKnopf`.
- Alle Terminvorschläge lagen am selben Tag.
- Das Logo saß auf Karten und im Druck mittig, weil sich das SVG in der Flex-Spalte streckte.
- `HM_HEUTE` stand im alten Code auf dem 23.09., der Rest nutzt den 28.09.
- Die Teamnamen stimmten nicht mit dem Vault überein. Richtig sind Florian Hörmann, Ahmet Erken und Nikita Neznamov.
- Veraltete JSX-Dateien kamen aus dem Browser-Cache. Die Vorschau bekommt jetzt einen Stempel, und ein neuer Seed (v8) räumt alte Demo-Daten und Porträt-Blobs.

**Verbesserungen für später**
- **Lead-Radar:** CSV aus Portalen einlesen und bewerten. Offen ist, woher die Rohdaten rechtlich sauber kommen.
- **Vertrag:** Für eine qualifizierte Signatur braucht es Yousign. Die Prüfsumme belegt nur die Unverändertheit.
- **Import:** Objekte gehen noch nicht in NOVA. Die Brücke braucht die Schnittstelle zu Zero-One.

---

## Stufe 3. Strategie

**Diagramm:** Start, Strategy Workshop mit Fragebogen, Results Upload, Strategy Generated, Presentation und Planning.

**Umgesetzt** (`human-strategie.jsx`)
- **Leitfaden:** Aus den Antworten entstehen Fragen für Daniel in drei Gruppen: Klären, Vertiefen, Bestätigen. Jede Frage nennt ihren Grund. Beispiele:
  - Kanäle gegen Zeitbudget: 2 bis 4 Stunden tragen zwei Kanäle.
  - Kamera-Komfort gegen gewählte Formate.
  - Meinungsstark, aber Politik tabu.
  - Sie gegen Instagram.
  - Fremdbild fehlt.
  - Lücken in "Deine Geschichte".
  - Der Grätzl-Anteil wird zum festen Format.
  - Das Ziel bekommt eine Messgröße.
  
  Der Leitfaden ist druckbar und liegt unter Gespräche.
- **Mitschrift:**
  - Aufnahme ablegen. Das Audio wird auf 16 kHz gebracht und von Whisper im Browser transkribiert (transformers.js, Modell small "Genau" oder base "Schnell").
  - Das Glossar korrigiert typische Hörfehler (Leads, Immobilien, Makler, UNIO) und gleicht Namen aus Team und Makler ab.
  - Aufgaben und Zitate werden nach Mustern markiert. Das Ergebnis wird als Gespräch gespeichert.
  - Whisper läuft in einem Worker, damit die Oberfläche bedienbar bleibt.
- **Plan bis live:**
  - Elf Etappen rückwärts vom Tag 30 (Vertrag Tag 0 bis Live Tag 30). Der Stand kommt aus den echten Daten: Einrichtung, Fragebogen, Strategie, Branding, Porträt, Drehtage, Website, Beiträge.
  - Überfälliges ist markiert.
  - Im Team-Überblick steht der Plan vollständig, auf Heute des Maklers als Etappenleiste mit dem nächsten Schritt.

**Tests**

| Test | Ergebnis |
|---|---|
| Leitfaden Markus | 12 Punkte aus 46 Antworten, alle mit nachvollziehbarem Grund |
| Mitschrift, 64 s Testaufnahme (UNIO-Teamvideo) | base 12 s, small 39 s im Hauptthread; im Worker 183 s im Hintergrund-Tab, Oberfläche dabei bedienbar. small erkennt UNIO, Leads und Immobilien richtig |
| Plan Sara | Tag 0 bis 30 mit Daten, Vertrag erledigt |

**Gefundene Fehler, behoben**
- Babel schreibt `import()` in `require()` um. Der dynamische Import läuft jetzt über `new Function`, Bibliotheken kommen per Script-Tag. Den Hinweis habe ich an die parallel arbeitenden Agenten weitergegeben.
- Die Paketwurzel von transformers.js lädt einen Node-Build. Richtig ist `dist/transformers.min.js`.
- Die Dateiablage nahm nur Bilder an. Der Dateityp ist jetzt einstellbar.
- Fremde Schriftzeichen aus Halluzinationen werden entfernt.

**Verbesserungen für später**
- Lange Workshops (60 Minuten) brauchen im Browser rund 30 bis 90 Minuten. Im Betrieb läuft das serverseitig (Whisper large, `api/human-mitschrift.js`) oder im Browser mit WebGPU.
- Sprecher trennen (Daniel oder Makler) geht nur serverseitig.
- Aus Mitschrift und Leitfaden die Strategie v1 vorschlagen: Zitate in die Brand Story, Antworten auf Klärungsfragen in die Regeln. Das braucht Tokens und bekommt einen Regel-Fallback.

---

## Stufe 4. Setups

**Diagramm:** Branding Setup (neu oder Rebranding: Logo, Farben, Schrift, Leitidee), Website Setup, Media Accounts Setup.

**Umgesetzt** (`human-setup.jsx`)
- **Logos als Vektorpfade:**
  - opentype.js wandelt die Schrift in Pfade, mit Kerning und Laufweite wie im Live-Logo. Die Schriften kommen von Fontsource (WOFF), Power Grotesk als WOFF aus dem Repo (aus WOFF2 konvertiert).
  - Das SVG druckt damit ohne installierte Schrift. PNG in 2000 px.
- **Brand-Kit als ZIP:** drei Logo-Typen je dunkel und hell als SVG und PNG, das Porträt, Farben mit Kontrastwerten, Schriften und Leitidee. 18 Dateien.
- **Kontrast nach WCAG** im Studio: Akzent auf hellem Grund und Weiß auf Akzent, mit Einsatzempfehlung.
- **Rebranding:** Aus einem hochgeladenen Logo wird die dominante Farbe bestimmt, grau und weiß zählen nicht. Dazu kommt die nächste Akzentfarbe zum Übernehmen.
- **Website als Paket (ZIP):**
  - Enthält das Original-Template, das Füll-Skript (inklusive der nötigen Babel-Helfer), die Daten und das Porträt.
  - Öffnet sich ohne HUMAN, Objektbilder kommen von unio.at.
- **Impressum-Prüfung** nach ECG § 5, MedienG § 25 und GewO: Firmenwortlaut mit Rechtsform, Anschrift, Kontakt, GISA-Zahl, Behörde, UID-Format, Kammer, Berufshaftpflicht.
- **Konten:** Die Instagram-Bio wird auf 150 Zeichen geprüft.

**Tests**

| Test | Ergebnis |
|---|---|
| Logos Markus und Elif | Wortmarke, Punkt und Monogramm korrekt in Playfair und Fraunces, Pfade statt Text |
| Brand-Kit | 18 Dateien, Kontrast Nachtblau 10,5 zu 1 |
| Website-Paket Look 3 | über HTTP geöffnet: Titel "Markus Leitner, Immobilien in Döbling", keine Demo-Person mehr, 21 Bilder, keines kaputt |
| Impressum Markus | fünf offene Pflichtangaben erkannt |

**Gefundene Fehler, behoben**
- Namenskonflikt `hmFont`, weil die UI-Datei ihn schon nutzt.
- Beim Einbetten in den Template-String gingen Backslashes im regulären Ausdruck verloren. Die Hilfsfunktion wird jetzt per `toString` übernommen.
- Babel-Helfer wie `_slicedToArray` fehlten im exportierten Skript und werden jetzt mitgenommen.

**Verbesserungen für später**
- Deploy per Vercel-Schnittstelle statt ZIP (`api/human-website.js`), mit eigener Domain.
- Bildmarke bleibt Handarbeit, der Auftrag dafür sollte im Shop liegen.
