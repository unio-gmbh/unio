# Fragen und ihre Wirkung, Ist-Stand

Stand 29.09.2026. Bestandsaufnahme aller Fragen des Werkbank-Fragebogens und jeder Stelle, die ihre Antworten auswertet.

Quellen im Code (alle Pfade relativ zu `ui_kits/werkbank/`, API unter `api/`):

- Fragebogen: `wb-data.jsx` Zeilen 132 bis 197 (`HM_KAPITEL`), Rendering und Weiter-Logik `wb-flow.jsx` Zeilen 28 bis 139
- Strategie-Generator: `wb-data.jsx` `hmArchetypScores` (203), `hmWeg` (229), `hmZweiWege` (305)
- Workshop-Leitfaden: `wb-strategie.jsx` `hmLeitfaden` (5 bis 26)
- Markenplattform (Regeln): `wb-plattform.jsx` `hmPfQuellen` (283), `hmPfKontext` (326), Bausteine 387 bis 893, Zusammenbau 900 bis 925, Qualität 1000 ff.
- Markenwelten-Vorschlag: `wb-markenwelten.jsx` `hmWeltVorschlag` (1203), Tabellen `HM_WELT_BILDPAARE` (131), `HM_WELT_ASSETS` (141)
- Website-Felder: `wb-marke.jsx` `hmWebFelder` (108)
- Bildwelt-Prompt, Caption: `wb-os-data.jsx` `hmBildweltPrompt` (95), `hmCaption` (210)
- Produktion und Content: `wb-produktion.jsx` (61 bis 71, 163 bis 173, 392), `wb-content.jsx` (78, 215, 416, 440) lesen nur Felder des Wegs (`w.*`), nie Antworten direkt
- Markenbuch: `wb-markenbuch.jsx` liest nur die Plattform, keine Antworten direkt
- Claude-Dossier: `api/wb-marke.js` `LABEL` (96 bis 108) und `dossier()` (110 bis 145)

## Methode und Skala

Belegt ist, was im Code steht (Datei und Funktion in der Tabelle). Die Wirkungsstufe ist eigene Ableitung aus diesen Stellen.

| Stufe | Bedeutung |
|---|---|
| stark | verändert zentrale Liefergegenstände (Figur, Positionierung, Story, Serien, Markenwelt, öffentliche Texte) in mehreren Modulen |
| mittel | verändert einzelne Felder spürbar, oder wirkt über die Figur-Rangliste |
| schwach | nur ein Nebensatz, ein Fallback, der Workshop-Leitfaden oder ein Bonus für wenige Optionen |
| keine | verändert keinen Liefergegenstand; höchstens Reveal-Text nach dem Kapitel oder Rohtext im Claude-Dossier |

Wichtig für die Einordnung: `dossier()` in `api/wb-marke.js` schreibt jede Antwort mit Label ins Dossier, Felder ohne Label (alle `_frei`) als rohe ID. Wenn die Claude-Kette aktiv ist, kann das Modell jede Antwort nutzen, garantiert ist das nicht. Die Tabelle bewertet deshalb die Regel-Wirkung; "Dossier" steht dabei, wenn die Antwort zusätzlich nur dort ankommt. Ob `ANTHROPIC_API_KEY` in Vercel gesetzt ist, ist aus dem Repo nicht erkennbar (Lücke).

Ableitbarkeit, Quellen im System:

- Bestand: Objekt- und Kontakt-Import (`wb-werkzeuge.jsx` `HM_IMPORT_FELDER`, Objekte mit Titel, Adresse, PLZ, Ort, Preis, Fläche, Zimmer, Art; Kontakte mit Bemerkung)
- Region: `makler.region`, Lead-Radar (`wb-betrieb.jsx`, Felder Ort, Inserate, Follower, Website)
- Workshop: Mitschrift und Zitate (`meetings`, im Dossier als Transkript)
- Material: Uploads (`HM_MATERIAL_ARTEN`: Altes Logo, Fotos von dir, Objektfotos, Inspiration, Screenshot von Profilen), Einrichtung (Konten), Insights-Import

## Umfang

- 50 Frage-Screens: 44 Pflicht in fünf Kapiteln (`HM_FRAGEN_GESAMT`), 6 optional in Kapitel 6
- 8 Freitext-Zusätze (`<id>_frei`) an immotypen, gruende, ausloeser, sichtbar, phasen, bezirke, tabus, ziel
- 6 Bildpaare (bp1 bis bp6) innerhalb der Frage `bildpaare`
- Zusammen 64 Antwortfelder, alle unten einzeln aufgeführt

Verteilung nach Wirkung (eigene Ableitung): stark 21, mittel 22, schwach 9, keine 12.

## Tabelle

Abkürzungen: Weg = `hmWeg`, Score = `hmArchetypScores`, Kontext = `hmPfKontext`, Leitfaden = `hmLeitfaden`, Welt = `hmWeltVorschlag`, Reveal = `KapitelReveal`.

### Kapitel 1, Dein Weg (Pflicht)

| ID | Frage kurz | Typ | Gelesen von | Veränderte Output-Felder | Wirkung | Ableitbar |
|---|---|---|---|---|---|---|
| seit | Seit wann Makler | auswahl, 4 | Weg (Story Herkunft), Kontext `c.seit` in `hmPfStory`, `hmPfBotschaften`, `hmWebFelder` | story.herkunft und lang (nur ohne aufgewachsen), boilerplate, Website-Feld Kennzahlen ("10+ Jahre am Markt") | mittel | teilweise: GISA-Eintrag, LinkedIn (Material) |
| herkunft | Wie dazu gekommen | auswahl, 6 | Weg (Story, nur ohne aufgewachsen), Kontext `herkunftWeg` über `hmPfWegPhrase` | Nebensatz in story.herkunft, boilerplate | schwach | Workshop. Option "Anders" hat kein Freitextfeld, die Antwort bleibt leer |
| immotypen | Welche Objekte wirklich | gruppen, max 5 | Score (+5 je Achse), Weg (Story Beweis), Kontext `obj`, `objGruppe` | Figur-Rangliste, einsicht.konvention, positionierung.fuerWen, stimme.beispiele (Erstantwort), visuell.motive, botschaften, CTA | stark | ja: Bestand (Objekt-Feld Art), Makler bestätigt |
| immotypen_frei | Etwas, das fehlt | text | nur Dossier (ohne Label) | keine | keine | Bestand |
| abschluesse | Letzte drei Abschlüsse | text lang | Weg (Story Beweis), Kontext `abschl`, `strassen`, `werListe` (Erbengemeinschaft), `hmPfKonzepte` (Notar), Qualität Spezifität | positionierung.weil (Fallback), beweise, Beweise-Serie, stimme.beispiele Caption, botschaften, visuell.motive (Straßen) | stark | teilweise: Bestand (verkaufte Objekte mit Ort, Preis, Fläche); "was den Ausschlag gab" nur Workshop |
| gruende | Warum Kunden dich gewählt haben | mehrfach, max 3 | Reveal-Überschrift, Weg (Default-Wendepunkt), `hmPfWerte` über `HM_PF_GRUNDWERT`, `hmPfSerieWissen` über `HM_PF_GRUND` | werte (füllt Wert 3), Wissen-Serie Beispiel 3, Weg story.Wendepunkt (Fallback) | mittel | teilweise: Kundenstimmen (Material), Workshop |
| gruende_frei | In deinen Worten | text | nur Dossier (ohne Label) | keine | keine | Workshop |
| hindernis | Was fast abgehalten hätte | mehrfach, max 2 | Weg (Story Reibung), `hmPfEinsicht`, `hmPfSerieWissen`, `hmPfStory`, Leitfaden (Provision) | einsicht.spannung, story.spannung, Wissen-Serie (Frage, Idee, Beispiel 1), Leitfaden | stark | Workshop |
| ausloeser | Anlässe vor dem Verkauf | mehrfach, max 3 | Reveal, Weg (Hooks Begleiter), Kontext `cepKeys`, `cep0`, `cepWer` | einsicht.zielgruppe und spannung, positionierung.fuerWen, Markt-Serie Anlass, CTA (Erbe), stimme.sagen | stark | teilweise: Bestand (Kontakt-Bemerkung, zum Beispiel "Verkauf Wohnung 2027"), Workshop |
| ausloeser_frei | Anderer Auslöser | text | nur Dossier (ohne Label); kein Eintrag in `HM_PF_CEP` | keine | keine | Workshop |
| sichtbar | Zuletzt vor Publikum oder Kamera | auswahl, 4 | Score (minus 3 bei Figuren mit Talking Head zuerst), Leitfaden (Probedreh) | Figur-Rangliste (gering), Leitfaden | schwach | teilweise: Material (vorhandene Videos, Profil-Screenshots) |
| sichtbar_frei | Wie hat es sich angefühlt | text | nur Dossier (ohne Label) | keine | keine | Workshop |

### Kapitel 2, Deine Menschen (Pflicht)

| ID | Frage kurz | Typ | Gelesen von | Veränderte Output-Felder | Wirkung | Ableitbar |
|---|---|---|---|---|---|---|
| milieus | Zwei Wohnwelten | karten, max 2 | Score (+6 je Achse), Weg `milieus`, Reveal, `hmPfEinsicht`, `hmPfVisuell` (nur Fallback), `hmBildweltPrompt` | Figur-Rangliste, einsicht.zielgruppe (ein Satz), Weg story.Menschen, Bildwelt-Prompt "living worlds" | mittel | teilweise: Vorschlag aus Region, Objektarten und Preisniveau im Bestand |
| phasen | Lebensphase | mehrfach, max 3 | `hmPfEinsicht` und `hmPfStory`, beide nur für "Erste Wohnung" bei Käufer-Maklern | ein Einschub in einsicht.zielgruppe und story.kurz | schwach | teilweise: Bestand (Objektarten), Workshop |
| phasen_frei | Typischer Kunde in einem Satz | text | nur Dossier (ohne Label) | keine | keine | Workshop |
| bezirke | Deine Gegenden | gruppen, max 8 | Weg (`bez` erste 3, `bezText`), Kontext `orte` (erste 3), `hmPfKern` Fallback, `hmWebFelder`, `hmCaption`, `hmBildweltPrompt`, `wb-produktion.jsx` | positionierung, bio, hooks, fast alle Plattformtexte (`ortText`), Website-Region, Hashtags, Bildwelt-Prompt | stark | ja: Region und Bestand (Objekt-PLZ) |
| bezirke_frei | Grätzl in eigenen Worten | text | Weg `bezText` und `hmPfKern`, nur wenn keine Bezirke gewählt | Fallback-Ortsname | schwach | Region |
| graetzl | Grätzl mit den meisten Straßennamen | text | `hmPfKern` (Kern-Ort), `hmPfStrassen`, Welt (+5 Grätzl-Welt), Weg `graetzl`, Produktion, Leitfaden | Kern-Ort an 23 Stellen der Plattform (Serien-Namen, Signatur, visuell.idee, Konzepte), Welt-Vorschlag, Distinctive Assets | stark | teilweise: Bestand (Adress-Cluster), Makler bestätigt |
| graetzl_anteil | Anteil der letzten zehn Abschlüsse dort | auswahl, 4 | `hmPfEinsicht` (weiße Stelle, 3. Fallback), `hmPfWeil` (5. Fallback), `hmPfBeweise`, Leitfaden | einsicht.weisseStelle, positionierung.weil, beweise | mittel | ja: Bestand, rechnerisch aus verkauften Objekten je Ort |
| seite | Eigentümer oder Käufer | slider | Weg `fokus` (Eigentümer, Käufer, beide), Kontext `eigentuemer`, `kaeufer`, Leitfaden | satz, bio, positionierung.fuerWen, stimme.beispiele (Erstantwort, Absage, Website), botschaften, Markt-Serie Frage | stark | teilweise: Bestand (Verkaufsaufträge zu Suchkunden) |
| gefuehl | Wie soll sich der Kunde fühlen | mehrfach, max 2 | Weg (Story Versprechen), `hmPfStimme` (`sagen`), `hmPfBeweise` | Weg story.Versprechen, ein Wort in stimme.sagen, Behauptung "Kunden fühlen sich ..." | schwach | Workshop, Kundenstimmen |
| unity | Bei welchen Menschen bist du einer von ihnen | text | Weg (Story Menschen), Kontext `unity` | einsicht.zielgruppe und weisseStelle, Persönlich-Serie, story.lang, Konzepte (Ort, Warum) | stark | Workshop |

### Kapitel 3, Deine Art (Pflicht)

| ID | Frage kurz | Typ | Gelesen von | Veränderte Output-Felder | Wirkung | Ableitbar |
|---|---|---|---|---|---|---|
| s1 | Aufrichtig oder aufregend | slider | Score (Distanz), `hmPfRegler` | Figur-Rangliste, stimme.regler (ernst, begeistert) | mittel | nein; prüfbar über Fremdbild und Videos (Material) |
| s2 | Kompetent oder nahbar | slider | Score, Weg passt/fordert, `hmPfPersoenlichkeit` (nur ohne worte), `hmPfRegler` | Figur-Rangliste, passt und fordert, persoenlichkeit (Fallback), stimme.regler | mittel | wie s1 |
| s3 | Ruhig oder energisch | slider | Score, Welt (+3), `hmPfRegler`, `hmPfStimme` | Figur-Rangliste, Welt-Vorschlag, stimme.regeln (Satzlänge), stimme.regler | mittel | wie s1 |
| s4 | Klassisch oder modern | slider | Score, Weg passt/fordert, Welt (+4) | Figur-Rangliste, Welt-Vorschlag | mittel | wie s1 |
| s5 | Zurückhaltend oder meinungsstark | slider | Score, `hmPfPersoenlichkeit` (Fallback), Leitfaden (mit Tabu Politik) | Figur-Rangliste | mittel | wie s1 |
| archetyp | Welche Figur bist du | karten, 1 | Score (+18), Weg passt/fordert, Reveal, Welt und Kontext als Fallback-ID | entscheidet meist Figur A und damit hooks, satz, Säulen-Anteile, Formate, Kanäle, Palette, Schrift- und Akzent-Empfehlung, `HM_PF_FIGUR`, Welt-Vorschlag | stark | ja, rechnerisch aus den Reglern; die Karte ist eine Selbstzuordnung |
| bildpaare | Sechs Bildpaare | paare, mindestens 4 | Weg `palette` (warm oder kühl), Welt (gewichtet), `hmBildweltPrompt` (ab 3 mal a), `hmPfVisuell` (Regeltexte) | Welt-Vorschlag und damit Website-Look, Raster, Welt-Zeichen; visuell.bildsprache.regeln; Licht im Bildwelt-Prompt; Weg-Palette (nur ältere Ansichten `BrandProfil`, `wb-more.jsx`) | stark | teilweise: Material "Inspiration" |
| bp1 | Altbau-Stiege oder Glasfassade | Paar | Welt (zählt in allen 6 Welten), `hmPfVisuell` Regel, Palette | wie bildpaare | mittel | wie bildpaare |
| bp2 | Handschlag am Küchentisch oder Zahlen am Bildschirm | Paar | Welt (editorial, graetzl, klar, warm, kontrast), Regel, Palette | wie bildpaare | mittel | wie bildpaare |
| bp3 | Markt am Samstag oder Lobby mit Portier | Paar | Welt (editorial, graetzl, klar, warm, kontrast), Regel, Palette | wie bildpaare | mittel | wie bildpaare |
| bp4 | Handschrift oder klare Typografie | Paar | Welt (ruhig, editorial, klar, warm, kontrast), Regel, Palette | wie bildpaare | mittel | wie bildpaare |
| bp5 | Goldenes Abendlicht oder kühles Tageslicht | Paar | Welt (ruhig, klar, warm), Regel, Palette | wie bildpaare | mittel | wie bildpaare |
| bp6 | Menschen im Bild oder Räume ohne Menschen | Paar | Welt (ruhig, editorial, graetzl, klar, warm), Regel, Palette | wie bildpaare | mittel | wie bildpaare |
| werte | Was treibt dich an, zwei Werte | mehrfach, max 2 | Score (+4 je Achse), Weg `werte`, `hmPfWerte` (`HM_PF_WERTE`), `hmPfSerieWissen` | werte 1 und 2 mit verhalten und nie (Markenbuch Kapitel Werte), Wissen-Serie "Was ich nicht mache" | stark | Workshop |
| worte | Drei Wörter heute | text | Kontext `worte`, `hmPfPersoenlichkeit`, `hmPfStimme`, Claims Gastgeber ("ehrlich"), Leitfaden | persoenlichkeit (nur Wörter aus `HM_PF_WORT`, 25 Einträge, bekommen eigene heisst-Texte), stimme.regeln und sagen | stark | besser aus Fremdbild und Kundenstimmen (Material) |
| ideal | Drei Wörter in einem Jahr | text | Weg (Story Versprechen), Kontext `ideal`, Konzepte (Notar), Leitfaden | rolle.name (Freitext wird roh zum Rollennamen), stimme.regeln, Weg story | stark | Workshop |
| erfolge | Über eigene Erfolge sprechen | skala 1 bis 5 | Weg `tonExtra`, `hmPfStimme`, `hmPfSerieBeweise` (`leise`), Leitfaden | ton, stimme.regeln, Idee der Beweise-Serie | mittel | Workshop |
| fokus | Reichweite oder Bestand sichern | slider | nur Weg `promotion` | je ein Satz in passt und fordert | schwach | Workshop, überschneidet sich mit ziel |
| privat | Was darf öffentlich sein | mehrfach, max 8 | Weg `privat` (Text in `StrategieReveal`), `hmPfSeriePersoenlich` | Persönlich-Serie: nur 3 von 8 Optionen erzeugen Beispiele (Fehler und Learnings, Team und Büro, Sport und Hobby) | schwach | Workshop |
| tabus | Was nie | mehrfach, max 3 | Weg fordert, `hmPfStimme`, `hmPfSerieMeinung` (Politik), `hmPfSeriePersoenlich` (Familie), `hmPfVisuell`, Leitfaden | stimme.regeln, Meinung-Serie, Persönlich-Serie Idee, visuell.bildsprache.vermeiden | mittel | Workshop |
| tabus_frei | Weitere Grenzen | text | nur Dossier (ohne Label) | keine; eigene Grenzen werden von den Regeln nicht beachtet | keine | Workshop |
| anrede | Du oder Sie | auswahl, 4 | Weg `anrede`, `anredeRegel`, `bio`; `hmPfAnrede` je Kanal; Produktion, Reel, Content, Caption, Leitfaden | alle öffentlichen Texte, Qualitätsprüfung Konsistenz | stark | teilweise: bestehende Posts (Material) |

### Kapitel 4, Deine Marke heute (Pflicht)

| ID | Frage kurz | Typ | Gelesen von | Veränderte Output-Felder | Wirkung | Ableitbar |
|---|---|---|---|---|---|---|
| bestand | Was existiert schon | mehrfach, max 9 | nur Reveal (Aufzählung), Dossier | keine | keine | ja: Einrichtung (Konten), Material (Altes Logo, Fotos), Lead-Radar (Website) |
| follower | Follower stärkster Kanal | auswahl, 4 | nur Dossier | keine | keine | ja: Lead-Radar, Insights-Import, Profil |
| behalten | Erscheinungsbild behalten | auswahl, 3 | nur Reveal-Überschrift, Dossier | keine; Branding, Schrift und Akzent ignorieren die Antwort | keine | teilweise: Material (Altes Logo), dann Workshop-Entscheidung |
| assets | Wiedererkennbares Zeichen | mehrfach, max 2 | Weg (Story Signatur, `assets`), Reveal, Welt (`HM_WELT_ASSETS`, +9 oder +6), `hmPfVisuell` (`zeichen`) | Welt-Vorschlag, visuell.zeichen, Distinctive Assets, Brand-Profil | stark | Workshop |
| vorbilder | Account, der gefällt | text | Kontext `vorbild` (wird nirgends gelesen), Qualität (nur Trigramme für Spezifität), Dossier | keine | keine | teilweise: Material (Inspiration, Screenshots) |

### Kapitel 5, Dein Rhythmus (Pflicht)

| ID | Frage kurz | Typ | Gelesen von | Veränderte Output-Felder | Wirkung | Ableitbar |
|---|---|---|---|---|---|---|
| kamera | Wohl vor der Kamera | skala 1 bis 5 | Score (minus 6 bei Talking-Figuren), Weg passt/fordert, Leitfaden | Figur-Rangliste, passt und fordert, Leitfaden; Formate werden nicht gefiltert | mittel | teilweise: Probedreh im Workshop |
| zeit | Zeit pro Monat | auswahl, 4 | Weg `frequenz`, `hmPfSaeulen` und `hmPfStart30` (`proWoche` 3 oder 4), Leitfaden (Kanalzahl) | Frequenz, Rhythmus der Serien, Anzahl Beiträge im Startplan | mittel | Workshop |
| formate | Vorstellbare Formate | karten, max 6 | Weg (Filter auf Figur-Formate), Kontext `formateErlaubt`, Leitfaden | Formate im Weg, Formate je Säule, Startplan | stark | teilweise aus kamera |
| kanaele | Kanäle nach Wichtigkeit | sortieren | Weg (Schnitt mit Figur-Kanälen, Top 3), Kontext, Leitfaden | Kanäle, Rhythmus-Texte, Anrede je Kanal, Caption-Beispiel | stark | teilweise: bestand und follower |
| ziel | Ziel in zwölf Monaten | auswahl, 5 | Score (+5 nur für "Investoren erreichen" und "Bekannt im Bezirk werden"), Weg `ziel`, Leitfaden | Figur-Rangliste für 2 von 5 Optionen, Text in `StrategieReveal` | schwach | Workshop |
| ziel_frei | Woran merkst du, dass es geklappt hat | text | nur Dossier (ohne Label); der Leitfaden fragt dieselbe Messgröße erneut | keine | keine | Workshop |
| verfuegbar | Wann passen Drehtage | mehrfach, max 4 | Kontext `tage`, `hmPfStimme` (Termin im Beispiel), `hmPfSaeulen` (Tag im Rhythmus), `hmPfKonzepte` | Wochentag in Rhythmus-Texten und im Erstantwort-Beispiel; die Drehtag-Planung liest die Antwort nicht | schwach | teilweise: Terminbuchung |
| cue | Fester Termin für 30 Minuten Content | text | Weg `cue` (90-Tage-Text), `hmPfCue` (Tag, Zeit, Anker per Regex), Figur Kenner (Signatur bei "Grundbuch") | Persönlich-Serie (Name, Idee, Hook-Formel), Rhythmus, visuell.motive, Konzepte, Signatur-Serie | mittel | Workshop |
| fremdbild | Drei Menschen für Fremdbild-Fragen | text lang | Leitfaden (nur wenn leer), Dossier | keine; es gibt keinen Versand der drei Fragen | keine | nicht nötig, siehe Befund 10 |

### Kapitel 6, Deine Geschichte (optional)

| ID | Frage kurz | Typ | Gelesen von | Veränderte Output-Felder | Wirkung | Ableitbar |
|---|---|---|---|---|---|---|
| aufgewachsen | Wo aufgewachsen, erster Kontakt mit Immobilien | text lang | Weg (Story Herkunft), `hmPfHerkunft`, Leitfaden, Dossier-Lückenliste | story.herkunft, kurz, mittel, lang; Persönlich-Serie ("Aufgewachsen in"); visuell.motive | stark | Workshop |
| wendepunkt | Kurz vor dem Aufhören | text lang | Weg (Story), Kontext, Leitfaden | story.wendepunkt, mittel, lang | mittel | Workshop |
| abgeraten | Abgeraten gegen die eigene Provision | text lang | Weg (Story Reibung), Kontext `abgeraten`, `warten` | einsicht.weisseStelle, positionierung.weil, Meinung-Serie, Launch-Säule, botschaften.einSatz, story.haltung, beweise | stark | Workshop |
| belege | Drei Ergebnisse aus 24 Monaten | text lang | Weg (Story Beweis, Flag `belege`), Kontext `belege`, `pratfallOk`, `strassen` | positionierung.weil, beweise, Beweise-Serie, Caption-Beispiel, story.lang; schaltet Fehlergeschichten frei | stark | teilweise: Bestand (Vermarktungsdauer, Preis) |
| fehler | Beruflicher Fehler | text lang | Weg (Flag), Kontext `fehler`, Wissen- und Persönlich-Serie, Qualität (Pratfall) | Folge 4 der Wissen-Serie, Persönlich-Beispiel (nur mit privat "Fehler und Learnings") | mittel | Workshop |
| kundensatz | Wie dich der letzte Kunde beschrieben hat | text | Weg (Story Versprechen), Kontext, `hmWebFelder` (Referenzen) | einsicht.weisseStelle, positionierung.weil, beweise, Beweise-Serie, Website-Referenzen | stark | ja: Google-Bewertungen, Nachrichten (Material) |

## Befunde

Belegt heißt: im Code nachvollziehbar, Fundstelle genannt. Die Bewertung der Folgen ist eigene Ableitung.

### 1. Die stärksten Antworten sind optional, zwölf Pflichtfelder wirken nicht

Belegt: Kapitel 6 ist `optional: true` (`wb-data.jsx` 189). abgeraten, belege, kundensatz und aufgewachsen speisen weiße Stelle, Positionierung.weil, Beweise und Story (`wb-plattform.jsx` 400 bis 417, 667 bis 717). Gleichzeitig verlangen die Pflichtkapitel bestand, follower, behalten, vorbilder und fremdbild, die keinen Liefergegenstand verändern.

Ableitung: Ein Makler, der nur den Pflichtteil ausfüllt, bekommt eine Plattform voller "Kommt aus dem Workshop"-Lücken, obwohl er 44 Screens beantwortet hat.

### 2. Es wird gefragt, was im System schon liegt

Belegt: Der Bestand-Import kennt Art, Ort, PLZ, Adresse, Preis und Fläche je Objekt (`wb-werkzeuge.jsx` 127), der Lead-Radar kennt Ort, Inserate, Follower und Website (`wb-betrieb.jsx` 4 bis 20), Material kennt Altes Logo und Profil-Screenshots. Trotzdem werden immotypen, bezirke, graetzl_anteil, bestand, follower und vorbilder von Hand abgefragt.

Ableitung: Diese Fragen ließen sich als Vorschlag zum Bestätigen stellen. graetzl_anteil ist aus verkauften Objekten sogar rechenbar statt schätzbar.

### 3. Die visuelle Marke wird kaum befragt und kaum personalisiert

Belegt: Schrift und Akzent kommen allein aus der Figur (`wb-ui.jsx` `hmBrand`: `HM_SCHRIFTPAARE[aid]`, `HM_AKZENT_EMPF[aid]`). behalten und bestand (Logo, Farben) ändern nichts. Die Bildpaare zeigen Farbflächen mit einem Wort statt Bildern (`wb-flow.jsx` 111, `HM_BILDPAARE` in `wb-data.jsx` 104). bp2 a "Handschlag am Küchentisch" ist ein Motiv, das `hmPfVisuell` selbst verbietet ("Symbolbilder: Handschlag", `wb-plattform.jsx` 863).

Ableitung: Für Branding auf Studio-Niveau fehlen die Eingaben, die ein Studio zuerst einholt: echte Bildreferenzen, das bestehende Logo und seine Eigenschaften, Material und Orte des Maklers. Die Welt-Wahl hängt an sechs Wortpaaren und der Figur.

### 4. Die Selbstzuordnung dominiert, der Säulen-Mix ist starr

Belegt: Die gewählte Figur-Karte bringt +18 Punkte (`wb-data.jsx` 208), die Karten zeigen Name und Selbstbild-Satz der Figur. Die Säulen-Anteile kommen nur aus `w.saeulen` der Figur (`wb-plattform.jsx` 630); zeit, tabus, erfolge, privat und ziel verschieben sie nicht.

Ableitung: Die fünf Regler sind weitgehend Dekoration, sobald jemand eine Karte wählt. Der Content-Mix ist pro Figur identisch, das senkt die Unterscheidbarkeit zwischen Maklern derselben Figur. Die Hooks im Weg sind fünf feste Sätze je Figur mit eingesetztem Ort (`wb-data.jsx` 246 bis 253), das trägt bis in `wb-content.jsx` (Hooks aus der Strategie).

### 5. Überschneidungen und Doppelungen

Belegt, jeweils zwei oder drei Fragen für dieselbe Größe:

- Auftrittskomfort: sichtbar, kamera, erfolge
- Richtung: ziel, fokus, ideal
- Fremdbild: worte, kundensatz, fremdbild
- Belege: abschluesse, belege
- Herkunft: herkunft, aufgewachsen
- Grenzen: privat und tabus lassen widersprüchliche Wahl zu (Politik und Gesellschaft sichtbar, zugleich Politik tabu)
- Der Leitfaden fragt Messgröße des Ziels und alle sechs Geschichte-Fragen erneut (`wb-strategie.jsx` 21 bis 23), auch wenn ziel_frei beantwortet ist

### 6. Freitext-Zusätze verpuffen

Belegt: Von acht `_frei`-Feldern wird nur bezirke_frei in den Regeln gelesen (`wb-data.jsx` 232, `wb-plattform.jsx` 52). Die übrigen sieben landen ohne Label als rohe ID im Dossier (`api/wb-marke.js` 117).

Ableitung: phasen_frei ("typischer Kunde in einem Satz") wäre das beste Zielgruppenbild und wird nicht genutzt. tabus_frei enthält echte Grenzen, die die Regel-Plattform übergehen kann.

### 7. Auswahl wird abgefragt und dann verworfen

Belegt:

- bezirke: bis zu acht wählbar, genutzt werden die ersten drei in Klickreihenfolge (`wb-data.jsx` 231, `wb-plattform.jsx` 331)
- privat: acht Optionen, drei erzeugen Beispiele
- ziel: fünf Optionen, zwei verändern die Figur
- kanaele: Sortieren erzwingt eine Rangfolge aller fünf Kanäle ohne "nutze ich nicht". Der Leitfaden-Punkt Kanäle (`kan.length > maxKan`) greift damit fast immer, sobald der Makler etwas verschiebt

### 8. Die Erklärung an den Makler stimmt nicht mit der Rechnung überein

Belegt: Der Reveal nach Kapitel 3 sagt "aus deinen Reglern und deiner Bildwahl" (`wb-flow.jsx` 124), die Strategie-Seite "Aus fünf Reglern, Bildwahl, Wohnwelten, Ziel und Kamera-Komfort" (`wb-flow.jsx` 173). Die Bildpaare fließen nicht in `hmArchetypScores`, immotypen und werte fließen ein und werden nicht genannt.

### 9. Fehler in der Auswertung

Belegt:

- `wb-data.jsx` 210: Der Autoritäts-Bonus prüft `m.includes("fels")`; "fels" ist eine Figur-ID, kein Milieu, die Bedingung ist nie wahr
- `wb-strategie.jsx` 24: `(a.seite || 50) <= 35` macht aus dem Reglerwert 0 (ganz Eigentümer) eine 50, der Leitfaden-Punkt fällt genau im deutlichsten Fall weg
- `wb-strategie.jsx` 12: prüft das Format "live", das es in `HM_FORMATE` nicht gibt
- Zwei widersprüchliche Bildpaar-Tabellen: `HM_WELT_BILDPAARE` in `wb-markenwelten.jsx` 131 und `aff` in `hmPfVisuell` (`wb-plattform.jsx` 812), zum Beispiel editorial bp4 "a" gegen "b". Die zweite greift nur als Fallback, bleibt aber gepflegt
- Namenskollision: Die Frage `fokus` (Reichweite oder Bestand) und das Weg-Feld `w.fokus` (Eigentümer oder Käufer, aus `seite`) heißen gleich; im Dossier stehen beide als "Fokus"
- `hmWeg` zählt jede Antwort "a" als warm (`wb-data.jsx` 290), obwohl bp2, bp3 und bp6 nichts mit Temperatur zu tun haben

### 10. Datenschutz bei fremdbild

Belegt: Die Frage sammelt Name, E-Mail oder Telefon von drei Dritten (`wb-data.jsx` 187). Es gibt keinen Prozess, der die Fragen verschickt (einzige Leser: Leitfaden-Prüfung auf leer und `dossier()`). Die Kontaktdaten gehen damit roh an die Claude-Kette (`api/wb-marke.js` 106, 116).

Ableitung: Daten Dritter werden ohne Zweck erhoben und weitergegeben. Das ist vor jedem Ausbau zu klären (Lücke: Rechtsgrundlage und Einwilligung).

### 11. Unbelegte Zahlen und Gestaltungsverstöße im Fragebogen

Belegt:

- Anrede-Hilfe und Leitfaden nennen "rund 80 Prozent" Du-Wunsch auf Instagram ohne Quelle (`wb-data.jsx` 170, `wb-strategie.jsx` 18). Quelle fehlt, Lücke
- "Fünf Kapitel. Achtzehn Minuten." für 44 Screens (`wb-flow.jsx` 41) ist nicht gemessen, Lücke
- Die im Fragebogen zitierten Studien (Cialdini, Gollwitzer, Connelly und Ones, Napoli, McAdams, Mayer und andere) sind hier nicht geprüft
- Figur-Karten nutzen `linear-gradient` (`wb-flow.jsx` 114), gegen die Regel "keine Verläufe"
- Die Sortierung nutzt die Textzeichen Pfeil hoch und Pfeil runter als Buttons (`wb-flow.jsx` 110), gegen die Regel "keine Textzeichen als Icons"

### 12. Führung ohne Anpassung

Belegt: Ein Screen pro Frage, feste Reihenfolge, kein Überspringen. Textfragen erlauben Weiter ohne Eingabe (`kannWeiter`, `wb-flow.jsx` 61). Ein reiner Käufer-Makler (seite über 60) bekommt dieselben Fragen wie ein Verkäufer-Makler, ein Makler ohne Kanäle dieselben Follower- und Kanal-Fragen.

Ableitung: Die Länge entsteht aus Fragen ohne Wirkung und Fragen nach vorhandenen Daten, nicht aus der Tiefe der wirksamen Fragen.

### 13. Für den Social-Feed fehlt die wichtigste Eingabe

Belegt: Kein Feld fragt, wie viele Objekte pro Monat in die Vermarktung gehen oder welches Bildmaterial vorliegt. Der Bestand-Import kennt Objekte, `wb-produktion.jsx` 184 liest sie für Produktion, der Fragebogen nicht.

Ableitung: Objekt-Walkthroughs und Beweise-Serien hängen an diesem Fluss. Ohne ihn plant der Startplan Formate, für die es möglicherweise kein Material gibt.

## Offene Lücken

- Ob die Claude-Kette produktiv läuft (API-Key in Vercel), ist aus dem Repo nicht erkennbar. Davon hängt ab, ob "nur Dossier"-Felder überhaupt eine Chance auf Wirkung haben
- Echte Ausfüllzeit und Abbruchpunkte sind nicht gemessen
- Wie oft Makler Kapitel 6 tatsächlich ausfüllen, ist nicht erfasst
