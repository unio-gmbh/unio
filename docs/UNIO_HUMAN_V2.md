# UNIO HUMAN v2 und v3. Einrichtung, Marke, Content-Produktion

Stand: 28.09.2026. Ergänzt `docs/UNIO_HUMAN_PLAN.md` (v1.2) um den Stand des Prototyps unter `/ux/human` nach dem vollständigen Diagramm "unio human - personal brands" (Blöcke Agent Akquise, On-Boarding, Kick-off, Setups, Zyklus, Shop, Sonderwünsche) und dem Funktionsumfang von Lucida OS. Alles Demo-Material stammt aus dem UNIO-Repo.

---

## 1. Aufbau

**Makler (sieben Bereiche):** Heute · Einrichtung (verschwindet, wenn alles erledigt ist) · Marke · Inhalte · Freigaben · Wirkung · Shop. Nachrichten und Assistent liegen global (oben rechts, unten rechts).

**Team (sieben Bereiche):** Heute · Akquise · Makler · Produktion · Freigaben · Empfehlungen · Einstellungen. Jeder Makler hat einen Arbeitsbereich mit Überblick, Inhalte, Freigaben, Wirkung, Marke, Einrichtung, Meetings, Kontakte, Ressourcen (entspricht einem Projekt in Lucida).

Prinzipien: genau eine nächste Sache auf Heute; Unterabläufe öffnen als Sheet über dem aktuellen Kontext statt als neue Seite; jede Ansicht hat eine URL; Formulare speichern sofort; Zustände sind sichtbar (Punkt und Wort), nie nur Farbe.

## 2. Datenfluss

Fragebogen und Material ergeben das Konzept (zwei Wege). Der gewählte Weg ergibt das Branding (Logo, Schrift, Akzent, Leitidee, Bildwelt). Das freigegebene Branding speist automatisch: Website, Visitenkarten, Shop (Foto und Logo), Mockups, Captions (Anrede, Ton, Hashtags aus Bezirken), Hooks im Skript, Endkarte im Schnitt, Brand-Kit. Eine Quelle dafür im Code: `hmBrand(maklerId)` in `ui_kits/human/human-ui.jsx`.

## 3. Einrichtung (Diagramm, Block On-Boarding)

| Baustein | Ablauf im Prototyp | Ergebnis |
|---|---|---|
| Vertrag | Eckdaten, Einverständnis, Unterschrift mit Namen | Erledigt |
| UNIO kennenlernen | Vier Bilder Tour | Erledigt |
| Kunden und Objekte übernehmen | Quelle wählen; Excel/CSV hochladen oder Termin für onOffice, Propstack, JUSTIMMO, willhaben | Erledigt oder beim Team |
| Social-Media-Konten | Je Plattform: habe ich, lege ich an, nicht nötig. Danach je Plattform Checkliste (Anlegen oder Vorbereiten) mit Vorschlägen für Benutzernamen, Bio und LinkedIn-Titelzeile aus der Marke. Letzter Schritt: UNIO-Adresse hinterlegen (Meta Business Suite, TikTok Business Center), LinkedIn als Freigabe-Workflow. Alternativ gemeinsame Session buchen (Diagramm: Account setup content session) | Beim Team, bis der Zugriff bestätigt ist |
| Portrait-Fotos | Termin buchen oder eigene Fotos hochladen, Zuschnitt über `/maklerzuschnitt` | Beim Team |
| Strategie-Termin | Status Fragebogen, Termin mit Daniel buchen | Beim Team |
| Backoffice | Shop, Girafee, Orakel je "Verstanden" | Erledigt |
| Visitenkarten | Gesperrt bis Branding freigegeben; Vorder- und Rückseite aus der Marke, Telefon und Mail prüfen, Stückzahl, Bestellung legt Auftrag an, Lieferverlauf | Bestellt, zugestellt |
| Shop einrichten | Logo und Portrait übernehmen | Erledigt |
| Tutorials | Videos abspielen, gesehen markieren | Erledigt |

## 4. Marke

Kette in sechs Schritten: Fragebogen (50 Fragen, v1.2) · Material (Upload nach Art, Bilder werden verkleinert gespeichert) · Konzept (zwei Wege) · Design (Branding-Studio) · Website · Brand-Kit.

**Branding-Studio:** drei Logo-Typen (Wortmarke, Monogramm, Name mit Zeichen) als SVG aus Name und Schrift; fünf Schriftpaare und sieben Akzentfarben 1:1 aus dem Design-Panel der Makler-Homepages (damit nichts übersetzt werden muss), je zwei davon empfohlen nach Figur; Leitidee editierbar; Live-Mockups (Website-Hero, Visitenkarte, zwei Posts, Mail-Signatur). "Branding freigeben" setzt den Status, danach sind Website, Visitenkarten und Shop entsperrt.

**Higgsfield-Anbindung (vorbereitet):** Aus Konzept, Fragebogen (Bildpaare warm oder kühl, Wohnwelten, Bezirke) und Branding entsteht ein Bild-Prompt (`hmBildweltPrompt`). Im Prototyp zeigt "Bildwelt erzeugen" Bilder aus dem UNIO-Archiv. Für die echte Anbindung:
1. Serverseitige Funktion `api/human-higgsfield.js` mit API-Schlüssel als Env-Var, nie im Browser.
2. Eingaben: Prompt, Referenzbilder aus Material (Fotos von dir, Inspiration), Seitenverhältnis 4:5 und 9:16.
3. Ausgaben: vier Bildvarianten je Aufruf, in die Mediathek mit Tag "Generiert", Freigabe durch den Makler vor Nutzung.
4. Später: Logo-Varianten und Moodboards als eigener Auftrag, Reframe von Objektfotos auf 9:16, Hintergrund entfernen für Portraits.
5. Kosten je Aufruf im Auftrag sichtbar, Kontingent pro Abo.

**Website:** Look 1 bis 6 (die bestehenden Showcases), 24 Felder in vier Gruppen mit Herkunft je Feld, Pflichtfelder markiert, Live-Vorschau im Aufbau der Looks (Hero, Zitat und Bio, Objekte, Referenzen, UNIO-Block, Footer mit Impressum), Ablauf Entwurf, Prüfung durch Daniel, live.

| Gruppe | Felder | Quelle |
|---|---|---|
| Automatisch aus UNIO | Name, Telefon, E-Mail, Portrait, Region, Objekte, Instagram | Profil, Visitenkarte, Kontakte, Foto-Termin, Fragebogen, Bestand, Konten |
| Aus der Marke | Logo, Schrift, Akzent, Headline, Über mich, Zitat, Kennzahlen | Branding, Brand Story, Fragebogen |
| Von dir | Referenzen, Büroadresse, Domain, Termin-Link | Makler |
| Rechtliches | Firmenwortlaut, GISA-Zahl, Gewerbebehörde, UID, Kammer, Berufshaftpflicht | Makler, Prüfung vor Livegang |

Befund zu den bestehenden Templates (`showcase/showcase1-6.html`): statisches HTML mit fest eingebauter Demo-Persona, Bilder als base64, kein Datenanschluss, Rechtslinks leer, keine Terminbuchung. Für den Livebetrieb müssen die Templates parametrisiert werden (Texte, `props`, `refs`, `igData`, Farben, Schriften). Die Feldliste oben ist dafür die Schnittstelle.

## 5. Content-Produktion (Lucida-Umfang)

| Lucida OS | UNIO HUMAN | Anmerkung |
|---|---|---|
| Dashboard | Heute, Überblick im Arbeitsbereich | Eine nächste Sache statt vier Zähler |
| Content Board (9 Spalten) | Inhalte, Board | Team: Idee, Planung, Dreh, Schnitt, Zur Freigabe, Änderung, Freigegeben, Online, Pausiert; Makler: fünf Gruppen, Ideen mit "Machen wir" oder "Nein" |
| Phase 1 Planung und Briefing | Idee und Skript | Format, Säule, Verantwortlich, Schnitt, Skript mit Vorlagen, Sprechzeit (0,3 s je Wort), Prüfung (Hook, Zahl oder Frage, Handlungsaufruf, Anrede, Länge), Drehtag, Veröffentlichung, Akteure, Wirkungs-Prognose, Kommentare |
| Phase 2 Schnitt und Review | Dreh und Schnitt | Material aus der Mediathek, "Passendes vorschlagen", Automatischer Schnitt mit Player, Timeline editierbar, Hinweise für den Feinschnitt |
| Phase 3 Veröffentlichung | Text und Termin | Caption aus Skript und Marke, Datum, Uhrzeit, Schnellwahl, Kanäle |
| Phase 4 Freigabe und Posting | Freigabe | Checkliste, Handy-Vorschau Instagram und Facebook mit echtem Schnitt, Mail-Vorschau, Freigeben oder Änderung (zwei Runden), Notizen |
| Kalender | Inhalte, Kalender | Beiträge und Drehtage, Doppelklick legt Idee an |
| Freigaben | Freigaben | Liste oder Spalten |
| Insights und Analytics | Wirkung | Überblick (Monatsreport, Quartals-Review) und Beiträge nach Reichweite |
| Marketing-Brief (13 Schritte) | Marke, Fragebogen (50 Fragen) | Mit Evidenz, siehe Research-Anhang |
| Meetings | Meetings | Meet starten, Zusammenfassung, Aufgaben, Transkript |
| Kontakte | Kontakte | UNIO-Team und Makler-Seite mit Freigabe-Schalter |
| Ressourcen | Ressourcen, Brand-Kit | Skript-Vorlagen global und je Makler, Brand-Assets |
| KI-Button | Assistent | Kurzantworten aus den Daten |

**Auto-Schnitt (Prototyp):** `hmAutoSchnitt` teilt das Skript in gesprochene Sätze. Jeder Satz bekommt einen Talking-Head-Clip (Dauer aus Wortzahl), der erste ist der Hook. Nach jedem zweiten Satz ein Bildwechsel aus Objekt- oder Stadtmaterial, am Ende die Endkarte mit Logo und Leitidee. Untertitel aus dem Skript. Der Player spielt die Segmente im Browser ab, die Timeline lässt Umsortieren und Entfernen zu.

**Auto-Schnitt (Betrieb), Vorschlag:**
1. Upload vom Handy oder Drehtag direkt in die Mediathek (Objektspeicher, Originalqualität).
2. Beim Upload serverseitig: Transkription mit Wortzeitstempeln (Whisper), Gesichtserkennung je Sekunde, Szenenwechsel, Hochformat oder Querformat, Tags (Gesicht, Objekt, Außen, Innen, Stadt).
3. Zuordnung: Skriptsätze werden per Textabgleich auf die Transkript-Stellen gelegt, damit der gesprochene Satz exakt der Stelle im Rohmaterial entspricht (statt fester Dauer wie im Prototyp). Versprecher und Pausen werden über die Zeitstempel entfernt.
4. Rendern serverseitig mit FFmpeg: 9:16-Zuschnitt mit Gesichtszentrierung, Untertitel in der Markenschrift, Endkarte aus dem Brand-Kit, Lautheit normalisiert.
5. Ergebnis als Schnitt v1 in Phase 2, Feinschnitt durch Ahmet oder direkt zur Freigabe bei Standardformaten.
6. Aufwand je Reel sinkt vom vollen Schnitt auf Kontrolle und Feinschliff; wie viel genau, zeigt erst der Betrieb.

## 6. Akquise (Diagramm, Block Agent Akquise)

Board mit fünf Stufen (Recherche und Erstkontakt, Kennenlernen, Nachfassen, Deep Dive, Onboarding), Karten ziehbar, Detail mit nächstem Schritt und Notiz. "Vertrag unterschrieben, Onboarding starten" legt den Makler an, erzeugt Schritte, Einrichtung und Kontakt und verschickt (simuliert) den Zugang.

## 7. Offene Punkte

1. **UNIO-Adresse für Social-Media-Zugriff:** im Prototyp `social@unio.at` als Platzhalter (Konstante `HM_UNIO_SOCIAL_MAIL`). Richtige Adresse und Meta-Business-Konto bestätigen.
2. **Girafee und Orakel:** Kurzbeschreibungen fehlen, Platzhaltertexte im Backoffice-Baustein.
3. **Portraits:** Im Repo gibt es nur Studio-Portraits von Männern. Demo-Maklerinnen bekommen ein Monogramm.
4. **Impressum:** Pflichtangaben für Makler (ECG § 5, MedienG § 25, GISA, Gewerbebehörde, Berufshaftpflicht) rechtlich bestätigen; Co-Branding klären (wer ist Vertragspartner).
5. **Templates parametrisieren:** Showcase-Looks an die Feldliste anschließen, Terminbuchung und Formular ergänzen.
6. **Higgsfield:** API-Zugang, Kosten je Bild, Freigabeprozess für generierte Bilder.
7. **Posting:** Meta Graph API direkt oder Planable/Metricool als Brücke.


---

## 8. Design-Überarbeitung v3 (28.09.2026)

Ziel: nativer, weniger nach Lucida, keine doppelten Daten.

**Was sich geändert hat**

| Vorher (v2) | Jetzt (v3) | Warum |
|---|---|---|
| Makler: sieben Menüpunkte inklusive Einrichtung und Freigaben | Fünf: Heute, Marke, Inhalte, Wirkung, Shop | Freigaben und Einrichtung leben dort, wo man ohnehin hinschaut: auf Heute |
| Team: sieben Menüpunkte | Fünf: Heute, Akquise, Makler, Produktion, Einstellungen | Empfehlungen stehen auf Heute als Sparpotenzial, Freigaben als Filter in Produktion, Vorlagen in Einstellungen |
| Kanban mit neun Spalten | Gruppierte Liste mit Filter (Wartet, Änderung, In Arbeit, Geplant, Ideen, Online) | Liest sich wie Mail oder Erinnerungen, funktioniert auch am Handy, keine Lucida-Optik |
| Beitrag mit Stepper links und Vorschau nur im letzten Schritt | Ein Dokument: vier aufklappbare Abschnitte mit Zusammenfassung, Fortschrittsleiste oben, Handy-Vorschau immer rechts | Kontext bleibt sichtbar, die Checkliste entfällt, weil die Abschnitte selbst den Stand zeigen |
| Freigabe dreifach (Heute, Menü, Inhalte-Spalte) | Einmal: Karten auf Heute mit Freigeben und Ansehen; in Inhalte als Filter | Eine Stelle zum Handeln |
| Marke in sechs Schritten, Brand-Kit getrennt | Vier Schritte: Fragebogen, Konzept, Design, Website. Material und Downloads im Design | Brand-Kit wiederholte Logo, Farben und Schriften; das Konzept zeigte Farbwelt und Schrift ein zweites Mal |
| Wirkung mit zwei Tabs, beste Beiträge doppelt | Eine Seite: Kennzahlen, Verlauf, Beiträge nach Reichweite, Folgerungen, Quartal | Keine Wiederholung |
| Makler-Arbeitsbereich mit neun Tabs | Sechs: Überblick (inklusive Personen), Inhalte, Wirkung, Marke, Einrichtung, Gespräche | Kontakte sind drei Zeilen und gehören in den Überblick |
| Versal-Labels in Mono, schwarze Auswahlpillen, viele Karten mit Rahmen | Satzschreibung, ruhige Seitenleiste mit weicher Auswahl, gruppierte Listen mit eingerückten Trennlinien, Mono nur für Zahlen | Näher an macOS und iOS, weniger Dashboard |
| Demo-Schalter in der Kopfleiste | Ein Menü "Demo" | Die Oberfläche zeigt nur, was ein echter Nutzer sieht |

**Regeln für weitere Screens**
1. Eine Information hat einen Ort. Zusammenfassungen verlinken, statt zu wiederholen.
2. Listen vor Karten, Karten nur, wo ein Bild die Entscheidung trägt (Freigabe).
3. Eine Primäraktion je Ansicht (schwarze Pille), alles andere als Text-Link oder kleiner Knopf.
4. Unterabläufe als Fenster über dem Kontext, nicht als neue Seite.
5. Mono nur für Daten (Zahlen, Zeiten), Beschriftungen in Satzschreibung.


## 9. Beitrag und Website-Vorschau v4 (28.09.2026)

**Beitrag in zwei Ansichten statt vier Phasen**
- *Abstimmung (Makler):* links die große Handy-Vorschau, rechts in dieser Reihenfolge: Stand, Titel, "Geht online" in Klartext (Wochentag, Datum, Uhrzeit, Kanäle), "Worum es geht" (Einstieg aus dem Skript, Format, Säule), der Text so wie er erscheint (bei Abstimmung selbst anpassbar), die Entscheidung "Passt so" oder "Etwas ändern" (mit Schnellwahl: anderer Einstieg, kürzer, anderes Bild, Text anpassen, anderer Termin), Verlauf von Idee bis Online, ein Gespräch mit dem Team. Keine Felder, keine Phasen, keine Prognose.
- *Werkstatt (Team):* Tabs nach Arbeitsstück (Skript, Schnitt oder Bilder, Text, Gespräch). Rechts ein Inspektor (Format, Säule, Betreut von, Schneidet, Drehtag, Geht online, Kanäle, Prognose, Änderungswünsche), darüber die Vorschau, darunter der Verlauf. Oben genau ein Knopf, der zum Stand passt: Zum Dreh, Gedreht, An {Vorname} schicken, Wieder an {Vorname} schicken, Liegt bei {Vorname}.
- Kommentare und Freigabe-Notizen sind zu einem Gespräch zusammengelegt.
- Wording: "Freigeben" wird "Passt so", "Änderung wünschen" wird "Etwas ändern", "Auto-Freigabe am" wird "Wenn du nichts sagst, geht der Beitrag am … so online", "Korrekturrunde 1 von 2" wird "Noch 1 Änderungswunsch frei".

**Website-Vorschau aus dem Original-HTML**
Die Vorschau lädt `showcase/showcaseN.html` unverändert in einen Frame und tauscht danach nur Inhalte (`hmFuelleTemplate` in `human-marke.jsx`):
- Bilder: jeder Schlüssel des `IMG`-Objekts im Template bekommt ein UNIO-Bild (Porträt, Objekte, Referenzen, Lifestyle), auch die Porträt-Maske `--pmask`.
- Texte: Name (Vor- und Nachname in allen Textknoten und Alt-Texten), Headline, Zitat, Bio, Region, Kennzahlen, Telefon, E-Mail, Instagram, Titel.
- Objekte: Titel, Lage, Preis, Fläche, Zimmer und Bild der neun Karten.
- Referenzen: nur mit echter Kundenstimme sichtbar, sonst wird der Abschnitt ausgeblendet.
- Logo: Wortmarke, Name mit Punkt oder Monogramm im Kopf und Fuß.
- Farbe und Schrift: CSS-Variablen `--loden`, `--loden-2`, `--clay`, `--head-tint`, `--fd`, `--fb`; das Design-Panel des Templates ist ausgeblendet.
- Impressum: Firma, GISA-Zahl und Behörde werden in die Fußzeile geschrieben, sobald eingetragen.
"In voller Größe öffnen" zeigt dasselbe Template gefüllt in einem neuen Tab. Für den Livebetrieb ist das derselbe Weg: Template bleibt Datei, ein Füll-Skript setzt die Daten aus dem Brand-Profil ein.
