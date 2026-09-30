# STATUS

## Aktuelle Etappe: Branding-Qualität v2 (fertig, wartet auf Abnahme)

- [x] 1. Gedächtnis-Dateien: `FAHRPLAN.md`, `STATUS.md`, `ui_kits/werkbank/CLAUDE.md`
- [x] 2. Bestandsaufnahme: `branding-v2/bestand/` (50 Fragen, Wirkung je Frage, Kette heute)
- [x] 3. Recherche: acht Berichte unter `branding-v2/research/`
- [x] 4. Zerlegung in 17 Teilschritte mit Datenverträgen: `branding-v2/00_ZERLEGUNG.md`, `branding-v2/schritte/`
- [x] 5. Kontrolle je Schritt (keiner über 8,5, Mittel 6,6 bis 8,3) und Kettenprüfung (13 Befunde, korrigiert)
- [x] 6. Synthese: `BRANDING_PROZESS_V2.md`, `FRAGEN_WIRKUNG.md`, `UMBAU_ETAPPEN.md`
- [x] 7. Beweis: `branding-v2/beweis/` und Leinwand https://claude.ai/artifact/EuWPdxn2nYaDBnV59aDThQ (Bilder sind Platzhalter)

## Erledigt

- 30.09.2026 Etappe Branding-Qualität v2: Prozess in 17 Schritten, Fragebogen von 44 Pflicht-Screens auf 23 Fragen, Beweis für Markus mit zwölf Kacheln

- 29.09.2026 Website-Baukasten, Bildwelt nur fürs Team mit Warteschlange, Makler-Zuschnitt höchstens 5 MB (Commit e1ef43d)
- 29.09.2026 Neutrale Pfade im Repo, Bildwelt-Brücke zu Higgsfield (Commit 0039a5f)
- 28. und 29.09.2026 v5 Stufen 1 bis 9, Branding auf Agenturniveau (bis Commit 167251b)

## Offen beim Owner

- Entscheidungen C1 bis C9 in `branding-v2/BRANDING_PROZESS_V2.md` freigeben (Etappe 0 der Umbauliste).
- Beweis für Markus ansehen: trägt „Rat vor Auftrag“ mit der Ratlinie? Feedback zu Idee, Farbe, Schrift, Serien.
- Für echte Bilder: Porträt-Termin am Tisch, Haustor und Stiegenhaus. Belege zu 11 Wochen, 2 Jahren, 8 Prozent.
- Teamaufwand 62 bis 81 Stunden je Makler laut Prozess: passt das zum Preis?

- Upstash Redis in Vercel verbinden, `WB_WORKER_TOKEN` setzen, danach Routine für `/bildwelt warteschlange` anlegen lassen.
- `ANTHROPIC_API_KEY` und `@anthropic-ai/sdk` für `api/wb-marke.js`, sonst läuft die Marke über die Regeln.
- Repo `unio-gmbh/unio` auf privat stellen (Konto unio-gmbh), Passwort `UnioUX` ändern.

## Später

- siehe `FAHRPLAN.md`

## Lehren

- Agenten-Läufe knapp halten: eine Kontrollrunde reicht, Dokumente mit Längengrenze anfordern. Der erste Lauf hat das Wochenlimit geleert, die Schrittdokumente wurden 60 bis 110 KB lang.
- Parallel geschriebene Fassungen widersprechen sich. Übergaben über feste Datenverträge sichern, Korrekturen als Ersetzungsliste statt als neue Fassung.
- Ohne echte Fotos bleibt jeder Feed-Beweis eine Satzprobe. Shooting-Brief vor dem Feed einplanen.

- Die Showcase-Vorlagen bauen sich über Scroll-Animationen auf. Vorschauen immer im statischen Modus (reduced motion) rendern.
- Vorlagentext enthält erfundene Kennzahlen und Gedankenstriche. Nie ungeprüft an Makler ausliefern.
- Browser schickt Basic Auth nur unter dem geschützten Pfad mit. Schnittstellen deshalb unter `/ux/api/...`.
