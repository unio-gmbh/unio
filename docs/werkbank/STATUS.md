# STATUS

## Aktuelle Etappe: Markt und Bewegung (fertig, lokal committet, wartet auf Sichtprüfung vor dem Push)

- [x] 1. Recherche mit vier Agenten: 65 Maklermarken weltweit und in Wien (Personen und Häuser, Wohnen, Luxus, Projektvertrieb, Gewerbe), je Marke Screenshot (nur lokal unter `_research/`, nicht im Repo) und Attribute nach Schema
- [x] 2. Katalog `branding-v2/research/MAKLER_BRANDS.md` (Tabellen je Nische mit Beleg und Quelle, Muster aus allen vier Läufen) und Datendatei `wb-brands-daten.jsx` (nur Attribute und Sätze, keine fremden Logos)
- [x] 3. Werkstatt, Reiter „Markt“: Landkarte der Nische (Antiqua bis Grotesk, Wortmarke bis Zeichen), Muster, Klischees, die nächsten Referenzen zum Entwurf mit Gründen; Prüfzeile „Abstand zum Markt“ im Prüfstand; Nische aus den Objektarten, Team kann sie setzen
- [x] 4. Werkstatt, Reiter „Bewegung“ (Brandmark F4): Zeichnen, Aufdecken, Akzent zuletzt, Schleife, Reel-Outro, Export als animiertes SVG und WebM
- [x] 5. Selbsttest 220 in 16 Gruppen grün, Konsole leer
- Details: `erlebnis/ERLEBNIS_UND_ERGEBNIS.md`, Abschnitt „Markt und Bewegung“, und `LOGO_UND_QUELLE.md`

## Vorherige Etappe: Marke sichtbar (lokal committet, Sichtprüfung offen)

## Vorherige Etappe: Erlebnis und Ergebnis (live seit 01.10.2026, Commit 9d56ba1)

## Erledigt

- 01.10.2026 Etappe Markt und Bewegung (Recherche 65 Marken, Reiter Markt und Bewegung in der Werkstatt), lokal committet
- 01.10.2026 Etappe Marke sichtbar (Logos, Logo-Erlebnis, Markenbuch-Neusatz, Instagram-Feed im Telefon), lokal committet
- 01.10.2026 Etappe Erlebnis und Ergebnis (Ihr Stand, Fragebogen v2, Bildwahl, Feed, Reveal, Logo-Werkstatt v2)
- 30.09.2026 Etappe Marke erzeugen v2, Teil 1 (Logo-Werkstatt, eine Quelle, Sofortreparaturen, weiches Scrollen)
- 30.09.2026 Etappe Branding-Qualität v2: Prozess in 17 Schritten, Fragebogen von 44 Pflicht-Screens auf 23 Fragen, Beweis für Markus mit zwölf Kacheln

- 29.09.2026 Website-Baukasten, Bildwelt nur fürs Team mit Warteschlange, Makler-Zuschnitt höchstens 5 MB (Commit e1ef43d)
- 29.09.2026 Neutrale Pfade im Repo, Bildwelt-Brücke zu Higgsfield (Commit 0039a5f)
- 28. und 29.09.2026 v5 Stufen 1 bis 9, Branding auf Agenturniveau (bis Commit 167251b)

## Offen beim Owner

- Katalog `MAKLER_BRANDS.md` überfliegen: fehlen Marken, die du als Vorbild oder Gegenbild siehst? Dann als Sätze liefern, nicht als Dateien.
- Sichtprüfung vor dem Push: Markenbuch (Team und Makler), Marke, Design als Makler (Logo-Erlebnis), Feed im Markenbuch. Danach „push“ sagen.
- Markus: Hauptlogo ist jetzt Ratstrich in Newsreader statt Maßstab-Wortmarke. Passt das?
- Feed-Regel: acht Porträts in zwölf Kacheln (E3) oder weniger? Heute acht in drei Schnitten.
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
- Repo `unio-gmbh/unio` auf privat stellen (Konto unio-gmbh), das UX-Passwort ändern.

## Später

- siehe `FAHRPLAN.md`

## Lehren

- Headless Chrome braucht einen Desktop-User-Agent, sonst blocken Cloudflare-Seiten. Screenshots fremder Marken nur lokal (`_research/`, gitignored), ins Repo nur Attribute.
- Agenten, die parallel in einen Ordner schreiben, brauchen eigene Chrome-Profile, sonst verschwinden Screenshots.
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
