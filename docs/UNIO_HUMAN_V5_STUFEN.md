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
