# STATUS

## Aktuelle Etappe: Markensystem (fertig, gepusht)

- [x] 1. Google Fonts als Grundlage: Katalog mit 1230 lateinischen Familien (`wb-fonts-katalog.jsx`), Schriftpool je Makler (`wb-fonts.jsx`), Reiter „Schriften“ mit gerechneter Eignung (Gewichte, Lesbarkeit, Verbreitung, Abstand zum Markt der Nische), „In den Pool“
- [x] 2. Acht Markenrichtungen aus der Recherche (`wb-richtungen.jsx`): Verlag, Instanz, Rat, Grätzl, Signatur, System, Haus und Zahl, Stille. Je Richtung Haltung, Gegenbild zum Markt, Schriften, Logoarten, Zeichen, Akzente, Welt, Bild, Verbote
- [x] 3. Empfehlung mit Begründung aus Fragebogen und Markt (Markus: Rat mit 14 Punkten, Elif: Grätzl mit 12); Richtung steuert Pool, Arten und Zeichenfolge der Entwürfe, gespeichert in `logos[mid].richtung`
- [x] 4. Selbsttest 243 in 18 Gruppen grün
- [x] 5. Werkstatt liegt direkt im Schritt Design (Teamsicht), kein Sheet und kein Extra-Knopf mehr
- Details: `LOGO_UND_QUELLE.md`, Abschnitte „Schriftpool“ und „Markt und Bewegung“

## Vorherige Etappen: Markt und Bewegung, Marke sichtbar (gepusht mit dieser Etappe)

## Vorherige Etappe: Marke sichtbar (lokal committet, Sichtprüfung offen)

## Vorherige Etappe: Erlebnis und Ergebnis (live seit 01.10.2026, Commit 9d56ba1)

## Erledigt

- 01.10.2026 Etappe Markensystem (Google-Fonts-Katalog, Schriftpool, acht Markenrichtungen mit Empfehlung), gepusht zusammen mit Marke sichtbar und Markt und Bewegung
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
- Live unter www.unio.at/ux/human (alter Pfad leitet um). Die Logo-Werkstatt ist nur in der Teamsicht: Demo-Schalter auf Team, Makler, Markus Leitner, Reiter Marke, Schritt Design, Abschnitt Logo.
- Live testen: Marke, Design (die Werkstatt steht direkt dort), Reiter Entwürfe (Richtungen), Schriften, Markt, Bewegung.
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
