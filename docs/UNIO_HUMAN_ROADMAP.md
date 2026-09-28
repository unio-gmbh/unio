# UNIO HUMAN. Werkzeug-Roadmap

Stand: 28.09.2026. Frage dahinter: Welcher Schritt im Diagramm "unio human - personal brands" lässt sich mit einem Werkzeug wie dem Makler-Zuschnitt lösen? Also klein, im Browser, ohne Tokens, einbettbar und mit messbarem Ergebnis.

Ergänzt `UNIO_HUMAN_PLAN.md` (Prozess, Rollen), `UNIO_HUMAN_V2.md` (Prototyp) und `UNIO_HUMAN_V5_STUFEN.md` (Umsetzungsprotokoll).

---

## 1. Das Muster: ein UNIO-Werkzeug

Der Makler-Zuschnitt (`/maklerzuschnitt`) ist die Vorlage für alle weiteren Werkzeuge.

| Regel | Beim Zuschnitt | Warum |
|---|---|---|
| Eine Aufgabe, eine Seite, eine URL | Porträt nach Guideline | Das Team kann es ohne HUMAN nutzen, HUMAN bettet es ein |
| Läuft im Browser | face-api und Freistellen im Browser | Keine Tokens, keine laufenden Kosten, Fotos verlassen den Rechner nicht |
| Deterministisch | Gleiches Foto, gleiches Ergebnis | Prüfbar, erklärbar, kein Zufall |
| Nachrichtenvertrag | `zs:bereit`, `zs:bilder`, `zs:ergebnis`, `zs:fertig` | Jedes Werkzeug spricht gleich, HUMAN braucht einen Adapter |
| Ergebnis mit Qualitätswert und Hinweisen | Score 0 bis 100, "Unscharf", "Zu dunkel", "Arme angeschnitten" | HUMAN entscheidet selbst (beste Aufnahme) oder fragt gezielt nach |
| Stapelbetrieb | `auto=1` | Zehn Fotos vom Termin ohne einen Klick |
| Mensch korrigiert, statt neu zu machen | Ziehen, Größe, Punkte setzen | Automatik für den Normalfall, Handgriff für den Rest |

**Vertrag für alle Werkzeuge.** Präfix je Werkzeug (`zs`, `im`, `pr` …):

- **Eingang:** `<präfix>:daten` (Dateien oder JSON), `<präfix>:holen`.
- **Ausgang:** `<präfix>:bereit`, `<präfix>:stand` (Fortschritt), `<präfix>:ergebnis` (Datei oder JSON plus `meta`), `<präfix>:fertig`.
- **Meta:** immer `score` (0 bis 100), `hinweise` (Liste in Klartext) und die Messwerte, aus denen der Score kommt.

Nachrichten werden nur von derselben Herkunft angenommen. Im Betrieb bleibt der Vertrag gleich, er läuft dann über HTTP (Server-Funktion statt iframe).

**Wann ein Server nötig ist.**
1. Ein API-Schlüssel ist im Spiel: Meta, Higgsfield, Vercel, Yousign.
2. Etwas wird veröffentlicht oder verschickt.
3. Die Rechenlast ist zu groß für ein Handy, zum Beispiel das finale Video-Rendering.

**Wann Tokens nötig sind.** Nur für Sprache, die Regeln nicht leisten, etwa Formulierungen in der Strategie oder den Kommentar zum Report. Es gibt immer einen Regel-Fallback, damit nichts stillsteht.

---

## 2. Werkzeuge je Diagrammschritt

Grad: **A** automatisch, **K** Werkzeug bereitet vor, Mensch entscheidet, **M** menschlich mit Werkzeug-Hilfe. Stand: **live** (öffentlich), **Prototyp** (in `/ux/human`), **geplant**.

### 2.1 Agent Akquise

| Schritt | Heute | Werkzeug | Was es löst | Technik | Grad | Stand |
|---|---|---|---|---|---|---|
| Agent Research und Lead Contact | Recherche von Hand, Liste bei Nikita | **Lead-Radar** | Liste einlesen (CSV aus Portalen oder von Hand), Dubletten zusammenführen, Punkte nach Aktivität, Region und Präsenz, erste Nachricht aus Vorlage | CSV im Browser, Regeln | K | geplant |
| Kennenlerntermin, UNIO Vorstellung | Termin per Nachricht, Deck von Hand | **Termin-Planer** und **Vorstellung** | Freie Slots mit Puffer, Einladung als Kalenderdatei; Vorstellungsseite mit Name, Region und Marktzahlen des Maklers | ICS im Browser; Seite aus Vorlage | A | Prototyp (Termin) |
| Follow ups | Erinnerung im Kopf | **Nachfass-Takt** | Tag 2, 7 und 14 nach Kontakt, Vorlage je Stufe, fällig auf Heute | Regeln | A | Prototyp |
| Deep Dive | Gespräch | **Potenzial-Rechner** | Abo gegen Provision: wie viele zusätzliche Abschlüsse die Marke tragen; Lücken im heutigen Auftritt | Rechner | K | Prototyp |
| Signing | PDF per Mail | **Vertrag** | Vorlage (Team Court) aus den Lead-Daten, Unterschrift mit Namen, Zeitstempel und Prüfsumme, PDF | WebCrypto SHA-256, Druckansicht; später Yousign | A | Prototyp |

### 2.2 On-Boarding

| Schritt | Werkzeug | Was es löst | Technik | Grad | Stand |
|---|---|---|---|---|---|
| Vertrag | Vertrag (siehe oben) | | | A | Prototyp |
| UNIO Platform On-Boarding | Tour | Vier Bilder, danach erledigt | Tool | A | Prototyp |
| Import Kunden und Objekte | **Import-Mapper** | Excel oder CSV einlesen, Spalten automatisch zuordnen, E-Mail und Telefon prüfen, Dubletten, Vorschau, Übernahme | SheetJS und Regeln im Browser | A | Prototyp |
| Accounts Setup | **Konten-Assistent** | Je Plattform: vorhanden, neu, nicht nötig; Benutzernamen, Bio mit Längenprüfung, UNIO-Zugriff | Regeln; im Betrieb Meta-Partneranfrage per API | K | Prototyp |
| Foto Termin und Foto Upload | **Makler-Zuschnitt** | Gesicht erkennen, Nase auf 40 bis 60 % und 73 %, Schultern und Arme ganz im Bild (nur Größe wird angepasst), freistellen, PNG in Originalauflösung, Qualitätswert, beste Aufnahme | face-api, ISNet im Browser | A | **live**, in HUMAN eingebettet |
| Personal Brand Strategy Termin | Termin-Planer | Slot bei Daniel, Fragebogen vorher | ICS | A | Prototyp |
| BO Software (Shop, Girafee, Orakel) | Tutorials | Kurzvideos, gesehen markieren | Tool | A | Prototyp, Texte fehlen |
| Visitenkarten Bestellung und Delivery | **Druckdaten** | Vorder- und Rückseite aus der Marke, 85 × 55 mm mit 3 mm Beschnitt und Schnittmarken, Prüfung (Kontrast, Mindestgröße, Sicherheitsabstand), PDF | SVG, Druckansicht; später LaTeX-Dienst | A | Prototyp |
| Shop Setup Foto und Logo | Zuschnitt und Marke | Kommt automatisch | | A | Prototyp |
| Tutorial Videos | Tutorials | | | A | Prototyp |

### 2.3 Strategie

| Schritt | Werkzeug | Was es löst | Technik | Grad | Stand |
|---|---|---|---|---|---|
| Start (Meetings vereinbart) | Termin-Planer | | ICS | A | Prototyp |
| Strategy Workshop mit Fragebogen | **Fragebogen** und **Leitfaden** | 50 Fragen mit Evidenz; daraus Gesprächsleitfaden für Daniel: Widersprüche (Selbstbild gegen Verhalten), Lücken, offene Freitexte | Regeln | A | Prototyp |
| Results Upload | **Mitschrift** | Aufnahme oder Datei, Transkript mit Zeitstempeln, Zitate und Aufgaben markiert | Whisper im Browser (transformers.js); im Betrieb serverseitig für lange Aufnahmen | A | Prototyp |
| Strategy Generated | **Strategie-Generator** | Zwei Wege mit Brand Story, Säulen, Formaten, Hooks | Regeln; Claude optional für Formulierung | K | Prototyp |
| Presentation und Planning | **Präsentation** und **Rückwärtsplan** | Reveal im Tool statt Deck; 30-Tage-Plan rückwärts vom Go-live, mit Kalenderdatei | Regeln, ICS | A | Prototyp |

### 2.4 Kick-off und Setups

| Schritt | Werkzeug | Was es löst | Technik | Grad | Stand |
|---|---|---|---|---|---|
| Branding Setup (neu oder Rebranding) | **Marken-Baukasten** | Wortmarke, Monogramm, Name mit Punkt als SVG; Kontrastprüfung nach WCAG; Farben aus vorhandenem Logo; Brand-Kit als ZIP | SVG, Canvas, JSZip | A | Prototyp |
| Bildwelt | **Higgsfield-Anbindung** | Markenbilder aus Prompt und Referenzen | Server, Credits | K | vorbereitet |
| Website Setup mit Foto-Termin | **Website-Füller** und **Impressum-Prüfer** | Original-Template füllen, Pflichtangaben prüfen (ECG § 5, GISA), Paket als ZIP; im Betrieb Deploy per Vercel API | DOM im Browser, JSZip | A | Prototyp |
| Tool-Onboarding (Lucida OS) | Tour in HUMAN | | | A | Prototyp |
| Media Accounts Setup | Konten-Assistent | Instagram, Facebook als Spiegel, UNIO-Zugriff | | K | Prototyp |
| Content Sessions Scheduling | **Drehtag-Planer** | Makler nach Bezirk bündeln, Slots, Reihenfolge, Shotlist je Slot, Einladungen | Regeln, ICS | A | Prototyp |

### 2.5 Monatszyklus

| Schritt | Werkzeug | Was es löst | Technik | Grad | Stand |
|---|---|---|---|---|---|
| Content Ideas | **Ideen-Generator** | Säule × Format × Anlass (Saison, Markt, Objekte) × Hook-Muster; Säulenquoten; keine Wiederholung | Regeln; Claude optional | A | Prototyp |
| Content Planning | **Skript-Prüfung** | Sprechzeit, Hook in drei Sekunden, Zahl oder Frage, Handlungsaufruf, Anrede | Regeln | A | Prototyp |
| Content Production | **Teleprompter** | Skript am Handy im Sprechtempo, gespiegelt, Pause mit Leertaste; Shotlist abhaken | Browser | A | Prototyp |
| Cut / Edit | **Rohschnitt** | Sätze aus dem Skript auf das Material legen, Untertitel, Endkarte; im Betrieb Stille entfernen, 9:16 mit Gesichtsverfolgung | Prototyp im Player; Betrieb FFmpeg serverseitig, face-api wie beim Zuschnitt | K | Prototyp |
| Delivery | **Abgabe-Check** | Untertitel gegen Skript, Namen und Zahlen, Länge, Format, Endkarte, Kanäle. Erst bei grün geht der Beitrag an den Makler | Regeln | A | Prototyp |
| Feedback / Freigabe | **Abstimmung** | Passt so oder Etwas ändern, Schnellwahl, Frist, automatische Freigabe, jede Entscheidung protokolliert; dritte Runde kostenpflichtig angekündigt | Tool | A | Prototyp |
| Posting Scheduled | **Posting-Planer** | Termin aus Regeln, Text-Prüfung (erste Zeile unter 100 Zeichen, 3 bis 5 Hashtags, ein Handlungsaufruf, keine Emojis), Export als CSV für Metricool; im Betrieb Meta Graph API | Regeln, CSV | A | Prototyp |
| Quarterly Reviews | **Report** | Insights-Export einlesen, Kennzahlen (Sends, Saves), Säulen, drei Folgerungen aus Regeln, Druckansicht | CSV, Regeln | A | Prototyp |

### 2.6 Shop und Sonderwünsche

| Schritt | Werkzeug | Was es löst | Technik | Grad | Stand |
|---|---|---|---|---|---|
| Video, Photo, Graphic, Print Variation | **Grafik-Generator**, **Druckdaten**, **Objekt-Reel** | Carousel, Post und Story aus Marke und Objekt als PNG; Print als PDF; Objekt-Reel aus Fotos | Canvas im Browser; Higgsfield optional | A | Prototyp (Grafik) |
| Custom Format mit Freigabe-Loop | **Format-Lotse** | Beschreibung, dann das nächste Standardformat mit Preisunterschied; sonst Auftrag mit Briefing | Regeln | K | Prototyp |
| Standard Format, Automation | Grafik-Generator | Ohne Team | | A | Prototyp |
| Check Out | Shop | Kontingent zuerst, dann Preis | | A | Prototyp |
| Special Requests, BO Chat Request | **Anfrage-Sortierer** | Nachricht wird Ticket mit Art, Owner und Frist | Regeln; Claude optional | A | Prototyp |
| Agent Ticket @Board | Board in Produktion | | | A | Prototyp |
| Alignment mit Zero-One | **Zero-One-Brücke** | Gleiches JSON-Format, Export und Import, im Betrieb Webhook | Server | K | geplant |

### 2.7 Quer über alles

| Werkzeug | Was es löst | Grad | Stand |
|---|---|---|---|
| **Fristen-Wächter** | Freigaben, die liegen, Einrichtung beim Team, Community-Nachrichten älter als 60 Minuten; Erinnerung statt Nachfragen | A | Prototyp |
| **Kontingent-Wächter** | Verbrauch je Abo, am 20. Vorschlag zur Vorproduktion, Pause statt Verfall | A | Prototyp |

---

## 3. Reihenfolge

Nach Hebel: Handarbeit, die wegfällt, und Wartezeit, die kürzer wird.

| Phase | Ziel | Werkzeuge | Messpunkt |
|---|---|---|---|
| 0, erledigt | Porträt ohne Grafiker | Zuschnitt, live und eingebettet | Porträt fertig am Tag des Uploads |
| 1, Onboarding ohne Handarbeit | Tag 0 bis 10 | Vertrag, Import-Mapper, Termin-Planer, Druckdaten, Impressum-Prüfer | Kein Onboarding-Schritt braucht eine Nachricht |
| 2, Strategie an einem Tag | Tag 3 bis 10 | Leitfaden, Mitschrift, Rückwärtsplan | Strategie liegt am Tag nach dem Workshop vor |
| 3, Produktion ohne Suchen | Monatszyklus | Drehtag-Planer, Ideen-Generator, Teleprompter, Abgabe-Check, Posting-Planer | Vorbereitung eines Drehtags unter 30 Minuten |
| 4, Schnitt und Wirkung | Monatszyklus | Rohschnitt im Betrieb, Report, Grafik-Generator, Objekt-Reel | Schnitt je Reel nur noch Feinschliff |
| 5, Betrieb | alles live | Meta Graph API, Vercel Deploy, Higgsfield, Yousign, Objektspeicher, Zero-One-Brücke | Kein Werkzeug außerhalb von HUMAN nötig |

**Server-Funktionen für Phase 5**, gleiche Verträge wie im Browser:
- `api/human-posten.js` (Meta Graph API, LinkedIn als Freigabe-Workflow)
- `api/human-website.js` (Vercel Deploy)
- `api/human-higgsfield.js`
- `api/human-signatur.js` (Yousign)
- `api/human-dateien.js` (Objektspeicher statt IndexedDB)
- `api/human-render.js` (FFmpeg)
- `api/human-zeroone.js` (Webhook)

---

## 4. Was bewusst menschlich bleibt

- **Das Gespräch im Workshop und im Quartals-Review:** Vertrauen entsteht dort.
- **Der Drehtag:** Werkzeuge bereiten ihn vor und nach.
- **Die finale Freigabe durch den Makler:** Es ist sein Gesicht.
- **Antworten auf Kommentare und Nachrichten:** Maklerarbeit ist ein Vertrauensberuf. Das Werkzeug erinnert nur, es antwortet nicht.
- **Die Bildmarke, wenn gewünscht:** Grafik ist Handarbeit, die Wortmarke kommt automatisch.
