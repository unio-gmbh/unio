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

---

## Stufe 5. Monatszyklus

**Diagramm:** Content Ideas, Planning, Production, Cut/Edit, Delivery, Feedback/Freigabe, Posting Scheduled, Quarterly Reviews und zurück zu Ideas.

**Umgesetzt** (`human-produktion.jsx`, gebaut von einem parallel arbeitenden Agenten, verdrahtet und getestet im Hauptstrang)
- **Ideen-Generator:** Säulenquoten aus der Strategie (Pflichtsäule "Wie ich arbeite" mindestens 15 %), Formate des Wegs, Hook-Muster, österreichische Anlässe Oktober bis Dezember und Objekte aus dem Bestand. Keine Wiederholung gegen vorhandene Titel. In Inhalte und Produktion unter "Ideen für Oktober".
- **Teleprompter:** Vollbild im Sprechtempo (0,3 s je Wort), spiegelbar, mit Pause, Tempo, Satzsprung und 3-Sekunden-Countdown. Der Bildschirm bleibt wach, es gibt eine Tastensteuerung.
- **Abgabe-Check vor dem Verschicken** (Vault-Regel Qualitätskontrolle):
  - Prüft Untertitel gegen das Skript, den Namen, bekannte Tippfehler, einheitliche Zahlen, die Länge, die Endkarte, die Caption, Kanäle und Termin.
  - "An {Vorname} schicken" ist erst bei Grün aktiv.
- **Caption-Prüfung:** erste Zeile unter 100 Zeichen, Suchbegriff in den ersten 125 Zeichen, 3 bis 5 Hashtags, ein Handlungsaufruf, keine Emojis, keine Ausrufezeichen, einheitliche Anrede, höchstens 2.200 Zeichen.
- **Terminvorschläge im Inspektor:** Start-Hypothese Di und Do 18 bis 21 Uhr. Sobald eigene Zahlen da sind, gewinnen die besten Tage.
- **CSV für Metricool** als Brücke ohne API. Die Spalten laut Metricool-Hilfe sind vor dem ersten echten Import mit der Vorlage abzugleichen.
- **Insights-Import:** Meta-Business-Suite-Export (deutsch und englisch) wird zum Monatsreport mit drei Folgerungen aus Regeln.
- **Quartals-Review** (`human-strategie.jsx`), bisher fest verdrahtet, jetzt aus den Daten:
  - Reichweite und Teilen über drei Monate, stärkstes Format, stärkste Säule, Säulen ohne Beitrag, Gesichtsanteil.
  - Dazu ein Vorschlag für neue Säulenquoten (plus 5 für die stärkste, minus 5 für die schwächste). "Übernehmen" schreibt die Strategie als neue Version mit Unterschied.
  - Der Ideen-Generator nutzt ab dann die neuen Quoten. Damit ist der Kreis im Diagramm geschlossen.
- **Abstimmung** nach Vault-Regeln:
  - Die dritte Runde ist vorab als kostenpflichtig angekündigt (150 € je Stunde) und erzeugt ein Ticket "Aufwand schätzen".
  - Jede Freigabe wird mit Name und Zeit protokolliert.
  - Automatische Freigabe nach Ablauf der Frist, ebenfalls protokolliert.
- **Werkstatt:** Drehort (Objekt, Grätzl, Büro, Studio, beim Kunden) und Stil (Vlog natürlich, erklärend, Kundenstimme, Rundgang) im Inspektor.

## Stufe 6. Shop, Sonderwünsche, Fristen

**Umgesetzt** (`human-shop2.jsx`, paralleler Agent)
- **Grafik-Generator:** Carousel, Objekt-Post und Story per Canvas in der Markenschrift. Export als PNG oder ZIP. In der Werkstatt bei allen Formaten außer Reel.
- **Format-Lotse:** Ein Sonderwunsch wird zum nächsten Standardformat mit Ähnlichkeit und Preisunterschied gelenkt. Im Shop direkt unter dem Eingabefeld. Stundensatz 150 € wie die dritte Runde.
- **Anfrage-Sortierer:** Aus einer Nachricht wird ein Ticket mit Art, Owner und Frist in Werktagen, mit österreichischen Feiertagen.
- **Drehtage bündeln:** Offene Drehwünsche werden nach Region gebündelt, die Abo-Grenze beachtet, Slots, Shotlist und Kalenderdatei erzeugt, die Ersparnis ausgewiesen. Auf Team-Heute unter Sparpotenzial.
- **Fristen:**
  - Freigaben länger als drei Tage, Tickets, Einrichtung beim Team, Kontingent am 20., Community-Nachrichten älter als 60 Minuten.
  - Auf Team-Heute als "Überfällig". Ungenutztes Kontingent steht unter Sparpotenzial.
- **Community:** Kommentare und Nachrichten auf Heute des Maklers, rot ab 60 Minuten. Der Makler antwortet selbst.

**Tests:** 14 Selbsttests Produktion und 21 Selbsttests Shop im Browser grün. Klicktests für Werkstatt (Abgabe-Check, Teleprompter mit Escape, Caption), Ideen (20 übernommen), Format-Lotse, dritte Runde und Quartals-Review. Crawl mit 36 Ansichten ohne Fehler.

**Gefundene Fehler, behoben**
- **Anrede:** `hmWeg` erkannte "Sie" nie, weil die Antwort "Sie, überall" lautet. Captions für Markus duzten dadurch.
- **Deklaration:** `promotion` wurde vor der Deklaration benutzt, die Texte zu Reichweite oder Bestand waren falsch gewählt.
- **Team-Heute:** Fristen, "Braucht uns" und "Wartet auf Makler" zeigten denselben Beitrag doppelt. Jetzt hat jede Information einen Ort.
- **Stundensatz:** Der Format-Lotse rechnete mit angenommenen 95 € statt 150 €.

**Offen**
- Die EZB-Termine im Ideen-Generator (29.10. und 17.12.2026) sind nicht gegen den Sitzungskalender geprüft.
- Die Metricool-Vorlage und die Spaltennamen des Meta-Exports mit echten Dateien gegenprüfen.

## Stufe 7. Design

- **Icons:** 33 Textzeichen-Icons (Pfeile, Haken, Winkel, Kreuze, Radio-Punkte) sind 1,5-px-Stroke-SVGs oder CSS-Formen. `Btn` nimmt Icon-Namen.
- **Assistent:** Das Sparkle-Symbol am Assistenten ist eine Sprechblase ("Fragen"), weil laut Plan kein KI-Symbol vorkommt.
- **Eyebrows:** 18 Eyebrows entfernt. Datum und Kontext stehen als ruhige Zeile unter der Headline. "Als Nächstes" ist aus den dunklen Karten raus, die Handlung ist die Headline.
- **Texte:** gekürzt, Kopf- und Hinweistexte im Schnitt halb so lang.
- **Wording:** Freigabe-Karten auf Heute sagen "Passt so" wie die Abstimmung.

## Stufe 8. Reel-Schnitt, Betrieb, Material

**Reel-Renderer** (`human-reel.jsx`)
- Aus dem Schnitt entsteht eine echte MP4-Datei, 1080 × 1920, 30 fps, H.264 und AAC. Der Schnitt kommt aus dem Skript: Hook zuerst, dann Aussagen und Bildwechsel, am Ende die Endkarte.
- Technik: WebCodecs (VideoEncoder, AudioEncoder) mit mp4-muxer, Bild für Bild über gezieltes Spulen. Das ist deterministisch und läuft auch im Hintergrund-Tab.
- Die Strategie steckt im Video:
  - Der Hook steht als großer Titel im oberen Drittel, denn der erste Frame entscheidet.
  - Der Serienname der Säule kommt aus der Markenplattform.
  - Untertitel in der Markenschrift, das gesprochene Wort in der Akzentfarbe.
  - Die Endkarte trägt Name, Claim und einen Handlungsaufruf in der Anrede der Marke.
  - Originalton nur bei Talking-Head-Stellen, mit kurzen Blenden.
- Das MP4 liegt in IndexedDB, erscheint in der Handy-Vorschau der Abstimmung und lässt sich laden.
- Der Abgabe-Check verlangt ein aktuelles Rendering. Eine Signatur aus Clip, Start, Dauer und Text erkennt Änderungen am Schnitt.
- **Test:** 7 Segmente ergeben ein 15,4-s-MP4 in 7 Sekunden. `afinfo` bestätigt AAC mit 48 kHz. Die Standbilder zeigen Untertitel mit Hervorhebung in Terrakotta und die Endkarte in Fraunces.

**Betrieb** (`human-betrieb.jsx`)
- **Lead-Radar:** Eine CSV-Liste wird eingelesen und bewertet nach Aktivität (Inserate), Region und Präsenzlücke (wenig Follower bei viel Geschäft ist der größte Hebel). Dubletten werden zusammengeführt, vorhandene Kontakte erkannt. Die Übernahme startet den Nachfass-Takt. Test: 7 Zeilen ergeben 6 Kontakte, 1 Dublette und 5 übernommen, alle mit fälliger erster Nachricht.
- **Zero-One-Brücke:** Export und Import im Format `unio-human/1`, für alle Makler oder einen einzelnen. Gleiche IDs werden ersetzt.
- **Selbsttest** unter Einstellungen: alle Prüfungen der Werkzeuge an einem Ort (Betrieb, Produktion, Shop, Plattform, Markenwelten). Gefundener Fehler: Die Impressum-Prüfung erkannte "e.U." nicht, weil die Wortgrenze nach dem Punkt nicht greift. Stand: 45 von 45 bestanden.

**Material** (`human-material.jsx`)
- Eigener Exporter nach dem Prinzip von html-to-image: Klon mit berechneten Stilen, Bilder als data-URL, Schriften als eingebettete Webfonts (Google Fonts, latin-Schnitte, und Power Grotesk), dann SVG foreignObject auf Canvas.
- Das Materialpaket bündelt alle Vorlagen des Markenbuchs mit `data-material` als PNG in Druck- oder Social-Auflösung. Dazu kommen Logos als Vektor, das Porträt und die Plattform als JSON.
- Test: Visitenkarte in 1004 px (85 mm bei 300 dpi) und Website-Kopf in 1080 px, die Schriften sind korrekt eingebettet.

**Weitere Korrekturen**
- Die Logo-Breite wird in der echten Schrift gemessen, der Punkt sitzt direkt am Namen.
- Die Wahl der Markenwelt setzt Schrift und Website-Look.
- Das Markenbuch speist die Website mit Claim, Story, Versprechen und Look.
- Rückgängig statt Nachfrage bei Ideen.
- Letzte Textzeichen-Icons im Schnitt-Player ersetzt.
