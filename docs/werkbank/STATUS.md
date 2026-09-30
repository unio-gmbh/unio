# STATUS

## Aktuelle Etappe: Erlebnis und Ergebnis (fertig, wartet auf Abnahme)

- [x] 1. Ihr Stand für den Makler: vierzehn Momente mit Werktagen und Feiertagen, eine Dauer-Quelle, acht Einwilligungen mit Frist, Datum und Fassung
- [x] 2. Fragebogen v2: 23 Fragen, nur Fakten vorbelegt, frühere Worte als Zitat, eine Nachfrage, Fremdbild-Link und Antwortseite
- [x] 3. Bildwahl: Probepaar, vier Fotopaare, Schriftprobe, altes Logo, Tippen wählt, Pfeiltasten, Seite je Makler zufällig
- [x] 4. Feed-Vorschlag im Profilkopf mit Wochenregler, Beitragsdetail und Gegenentwurf (Markenbuch, Kapitel Feed)
- [x] 5. Reveal in zehn Akten mit Presenter-Fenster, Rückmeldung am Folgetag
- [x] 6. Makler-Pfad aufgeräumt: er urteilt, das Team wählt Schrift, Farbe und Logo
- [x] 7. Logo-Werkstatt v2 nach Brandmark (Stichworte, Prüfstand, Fassungen, Favicons, Paket), Selbsttest 192 von 192
- Details: `erlebnis/ERLEBNIS_UND_ERGEBNIS.md`

## Erledigt

- 01.10.2026 Etappe Erlebnis und Ergebnis (Ihr Stand, Fragebogen v2, Bildwahl, Feed, Reveal, Logo-Werkstatt v2)
- 30.09.2026 Etappe Marke erzeugen v2, Teil 1 (Logo-Werkstatt, eine Quelle, Sofortreparaturen, weiches Scrollen)
- 30.09.2026 Etappe Branding-Qualität v2: Prozess in 17 Schritten, Fragebogen von 44 Pflicht-Screens auf 23 Fragen, Beweis für Markus mit zwölf Kacheln

- 29.09.2026 Website-Baukasten, Bildwelt nur fürs Team mit Warteschlange, Makler-Zuschnitt höchstens 5 MB (Commit e1ef43d)
- 29.09.2026 Neutrale Pfade im Repo, Bildwelt-Brücke zu Higgsfield (Commit 0039a5f)
- 28. und 29.09.2026 v5 Stufen 1 bis 9, Branding auf Agenturniveau (bis Commit 167251b)

## Offen beim Owner

- Ansehen: `?ansicht=stand&makler=markus`, `?ansicht=fragebogen&makler=elif`, Markenbuch von Markus (Kapitel Feed, Reveal starten, Presenter öffnen).
- Entscheiden: Soll die ganze Werkbank den Makler siezen? Die Links siezen schon.
- Paarsatz fotografieren lassen (Licht, Ortsbild, Stimmung, Ausschnitt), bis dahin zählen die Wahlen nicht.
- C1 bis C9 freigegeben am 30.09.2026 (mit dem OK zur Etappe).
- Logo-Werkstatt ansehen: Studio, Logo, „Logo-Werkstatt öffnen“ (Teamsicht).
- Markenbeispiele liefern, die visuell gefallen und die nicht (siehe Chat vom 30.09.2026).
- Beweis für Markus ansehen: trägt „Rat vor Auftrag“ mit der Ratlinie? Feedback zu Idee, Farbe, Schrift, Serien.
- Für echte Bilder: Porträt-Termin am Tisch, Haustor und Stiegenhaus. Belege zu 11 Wochen, 2 Jahren, 8 Prozent.
- Teamaufwand 62 bis 81 Stunden je Makler laut Prozess: passt das zum Preis?

- Upstash Redis in Vercel verbinden, `WB_WORKER_TOKEN` setzen, danach Routine für `/bildwelt warteschlange` anlegen lassen.
- `ANTHROPIC_API_KEY` und `@anthropic-ai/sdk` für `api/wb-marke.js`, sonst läuft die Marke über die Regeln.
- Repo `unio-gmbh/unio` auf privat stellen (Konto unio-gmbh), Passwort `UnioUX` ändern.

## Später

- siehe `FAHRPLAN.md`

## Lehren

- Prüfer-Agenten gegen die Schrittdokumente lesen lassen: sie finden Abweichungen (Dauern, Fristen, vorbelegte Haltungen), die im Browser nicht auffallen.
- Einwilligungen nie als Standardwert im Code, nur als Eintrag mit Datum. Sonst gilt still ein Ja.
- Vorlagen sind für 940-px-WebP gebaut. Fotos vor dem Einsetzen auf diese Größe bringen, sonst ruckelt die Scroll-Animation.
- CDN-Adressen prüfen: Lenis lag auf einer toten cdnjs-Adresse, alle Vorlagen scrollten dadurch ruckelig.
- Canvas misst Text mit Ersatzschrift, solange die Webschrift lädt. Nur mit geladener Schrift messen und merken.
- Ein Fehler in einem Bereich darf nie die ganze App leeren: Fehlergrenze um den Hauptbereich.
- Agenten-Läufe knapp halten: eine Kontrollrunde reicht, Dokumente mit Längengrenze anfordern. Der erste Lauf hat das Wochenlimit geleert, die Schrittdokumente wurden 60 bis 110 KB lang.
- Parallel geschriebene Fassungen widersprechen sich. Übergaben über feste Datenverträge sichern, Korrekturen als Ersetzungsliste statt als neue Fassung.
- Ohne echte Fotos bleibt jeder Feed-Beweis eine Satzprobe. Shooting-Brief vor dem Feed einplanen.

- Die Showcase-Vorlagen bauen sich über Scroll-Animationen auf. Vorschauen immer im statischen Modus (reduced motion) rendern.
- Vorlagentext enthält erfundene Kennzahlen und Gedankenstriche. Nie ungeprüft an Makler ausliefern.
- Browser schickt Basic Auth nur unter dem geschützten Pfad mit. Schnittstellen deshalb unter `/ux/api/...`.
