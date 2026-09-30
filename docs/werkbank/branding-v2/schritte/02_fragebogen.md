# Schritt 2. Fragebogen mit Wirkung

Stand 30.09.2026, vierte Fassung. Branding v2, Teilschritt 2 von 17 (`fragebogen`). Entwurf zur Prüfung durch den Kontrolleur und zur Freigabe durch den Owner. Geändert gegenüber der dritten Fassung: Abschlüsse unter genau einem Feld und mit den Feldnamen aus 01 D8 (D5); Einwilligungen nach 01 D3 mit der Fremdbild-Frage im Abschluss und der KI-Frage auf der Eröffnung (D15, D20); `unity` als eigene kurze Frage zurück im Bogen, ein Erzeuger (D13); Anrede der Stimmproben über `hmAnrede` statt eigener Regel (3.5); `seite` ohne Schritt 3, mit Abnehmer für die Stufen (D21); `kundeSatz` und `erfolge` am Fall statt als Verallgemeinerung (D18, D19); Fall-Karte und Abschluss bei 375 px gestaltet, Wirkungsliste in Alltagssprache (3.2, 3.4, 3.8); Zeitmodell mit einer Rechenregel (3.10); feste Rangfolge der Nachfragen (3.4); Fremdbild-Anzeige nach Rolle erst ab drei (3.7); Bitten mit Termin und Verantwortung (5.4).

Grundlagen: `00_ZERLEGUNG.md` (Vertrag Schritt 2 und Nachbarn), die Schrittdokumente 01, 03 bis 08 und 12 (Eingangslisten geprüft am 30.09.2026), `bestand/FRAGEN_WIRKUNG_IST.md`, `bestand/KETTE_IST.md`, `research/R3-interview.md`, `R5-makler.md`, `R7-evidenz.md`, `R8-kundenerlebnis.md`, `R4-tools.md`, `R1-studios.md`. Code: `ui_kits/werkbank/wb-data.jsx` (`HM_KAPITEL`, `HM_HINDERNISSE`, `HM_AUSLOESER`, `HM_TABUS`, `HM_PRIVAT`, `HM_ZEIT`, `HM_ZIELE`, `HM_FORMATE`, `HM_KANAELE`, v1-Frage `unity` Zeile 153), `wb-flow.jsx` (`Fragebogen`, `Frage`, `KapitelReveal`), `wb-store.jsx` (Seed Markus, `HM_SEED_FLAG`), `wb-plattform.jsx` (`hmPfSaetze`, `hmPfTeile`, `hmPfCue`; `hmPfAnrede` wird nach 08 Z. 253 zur Weiterleitung), `index.html` (Schrift Power Grotesk, Farbrollen `--ink`, `--paper`, `--paper-2`, `--hairline-dark`, `--text-muted`), `wb-betrieb.jsx` (`hmZeroOneExport`, `hmSelbsttestBetrieb`), `wb-werkzeuge.jsx` (`HM_IMPORT_FELDER`), `api/wb-marke.js` (`SCHEMA`, `LABEL`, `dossier`, `KLISCHEES`), `middleware.js`. Aus den Nachbarn: `hmAnrede`, `hmAnredeRegel` (08, 3.4 und 8.1; Definition in `wb-vertrag.jsx` und `wb-stimme.jsx`), `hmAbschluesse`, `HM_EINWILLIGUNGEN`, `hmDauerMessen` (01, 3.6 und 8.1).

**Lesart** wie in der Zerlegung. *Belegt*: steht in einer Quelle mit URL oder in einer genannten Datei. *Ableitung*: eigene Folgerung. *Setzung*: bewusst festgelegter Startwert, wird an den ersten fünf Maklern gemessen und ersetzt. *Lücke*: wir wissen es nicht. Beispielwerte zu Markus Leitner stammen aus dem Seed in `wb-store.jsx` (Demo-Makler, keine reale Person) und aus dem Vorab-Dossier in 01, 8.2. Wo das Beispiel eine Antwort braucht, die der Seed nicht hat, steht *Annahme für das Beispiel*, immer ohne Zahl.

---

## 1. Ziel und Erfolgskriterium

### Ziel

Der Fragebogen holt in einer Sitzung genau das, was kein System über den Makler weiß und was einen Liefergegenstand verändert: seine letzten Fälle mit dem, was den Ausschlag gab, und je Fall eine prüfbare Zahl; die Alternative seiner Kunden; sein Handeln gegen den eigenen Vorteil; seine Zugehörigkeit; seine Grenzen; seine Stimme an echten Sätzen; seinen Rhythmus. Was im Vorab-Dossier aus Schritt 1 liegt, wird nur bestätigt. Keine Frage deutet ihn, keine legt ihm eine Figur oder eine Positionierung nahe. Das Ergebnis ist Rohstoff in seinen eigenen Worten, sauber genug für Regeln und Claude und konkret genug, dass der Workshop (Schritt 4) vertiefen kann, statt neu zu fragen.

Der Maßstab ist die Discovery eines Top-Studios, nicht ein Formular. Studios suchen eine Spannung und eine vorhandene, ungenutzte Stärke und lassen zeigen statt erzählen (Wolff Olins, R1 2.1: https://wolffolins.com/news/inside-wolff-olins-sammy-page-on-strategy). Übertragen heißt das (Ableitung): Der Bogen beginnt mit seinen eigenen Daten, fragt nach Fällen statt nach Selbstbild, zitiert ihn zurück und endet mit einer Seite, auf der er seine Fälle wiedererkennt und in seiner Sprache liest, was aus ihnen wird.

### Erfolgskriterium

| Nr. | Kriterium | Schwelle | Art | Gemessen durch |
|---|---|---|---|---|
| E1 | Dauer des Pflichtteils (Eröffnung bis letzte Frage, Rückfragen eingeschlossen, ohne Abschlussseite) | Median höchstens 15 Minuten über die ersten fünf Makler; Schätzung 14,2 Minuten ohne und 15,2 mit zwei Rückfragen (3.10) | Setzung | `fragebogen.messung` |
| E2 | Abbruch | kein Makler bricht endgültig ab; eine Unterbrechung mit Rückkehr zählt nicht | Setzung | `fragebogen.messung.abbruch` |
| E3 | Belegfähige Fälle | bei mindestens vier der ersten fünf Makler haben mindestens zwei von drei Fällen Ort, Ausschlag und eine belegtaugliche Zahl (Vermarktungsdauer oder Abweichung zur ersten Einschätzung beziehungsweise zum Angebotspreis), nach höchstens einer Nachfrage. Der Preis aus `vorab.fakten` zählt nicht als belegtaugliche Zahl | Setzung | Regel `hmBelegKandidat` auf `antworten.faelle` |
| E4 | Wirkung | jede sichtbare Frage hat `treibt[]`; jedes Zielfeld hat einen Abnehmer, dessen Schrittdokument das Quellfeld im Eingang führt (oder eine terminierte Bitte in 5.4 hat) | Pflicht | Selbsttest Q1, Q2 |
| E5 | Keine Doppelung | der Workshop-Leitfaden (`hmWorkshopLeitfaden` in `wb-workshop.jsx`) stellt keine Frage erneut, die im Bogen beantwortet ist | Pflicht | Selbsttest Q9 |
| E6 | Passung des Pfads | ein Käufer-Makler ohne Instagram sieht keine Frage, deren Zielfelder für ihn leer bleiben | Pflicht | Selbsttest Q7 |
| E7 | Erste Fragen tragen | `faelle`, `alternativeKonnte` und `abgeraten` stehen in jedem Pfad im ersten Drittel der Screens | Pflicht | Selbsttest Q6 |
| E8 | Keine Vorbelegung von Haltungen | jede Frage außer Bestätigungen startet leer | Pflicht | Selbsttest Q4 |
| E9 | Datenschutz vor Claude | kein Claude-Aufruf, solange in `auftrag.einwilligungen` der Eintrag `zweck: "kiAntworten"` nicht `status: "ja"` hat, und kein Aufruf mit einem ungeprüften Text | Pflicht | Selbsttest Q11, Q15 |
| E10 | Abschluss auf Augenhöhe | die Abschlussseite nennt jeden seiner beantworteten Fälle beim Ort und enthält kein Wort der Werkstattliste (Q17) | Pflicht | Selbsttest Q17 |

Wird E1 nach fünf Maklern verfehlt, greift die Streichliste in 3.9: Fragen wandern in den Workshop, der Bogen wird nicht verdichtet.

---

## 2. Geprüfte Alternativen und warum verworfen

| Nr. | Alternative | Was dafür spricht | Warum verworfen | Quellen |
|---|---|---|---|---|
| A1 | **v1 behalten und nur kürzen**: die zwölf Pflichtfelder ohne Wirkung streichen, Reihenfolge und Fragetypen lassen | geringster Umbau, alle Regeln lesen die Keys schon | Die Länge ist nur ein Symptom. Es blieben Selbsteinschätzungen per Liste (`gruende`), Regler mit Startgriff bei 50 (`s1` bis `s5`, `seite`), keine Anpassung an Käufer-Makler oder Kanäle, keine Nachfrage bei vagen Antworten, und die stärksten offenen Fragen stünden am Ende, wo Antworten belegt kürzer werden. Die Figur-Karte würde weiter alles überstimmen. | FRAGEN_WIRKUNG_IST Befunde 1, 4, 12; Galesic und Bosnjak: https://academic.oup.com/poq/article-abstract/73/2/349/1939196; Liu und Conrad: https://journals.sagepub.com/doi/abs/10.1177/0894439318755336 |
| A2 | **Vollchat statt Fragebogen**: Claude führt ein offenes Interview | Ein Chatbot mit Nachfragen lieferte in einer Feldstudie mit rund 600 Teilnehmern informativere und spezifischere Antworten (belegt) | Geschlossene Fragen liefern Werte, die Regeln direkt lesen können (Anrede je Kanal, Formate, Grenzen); ob sie für den Makler auch schneller sind, ist nicht belegt (Ableitung). Ohne `ANTHROPIC_API_KEY` (offen beim Owner) oder ohne KI-Einwilligung liefe gar nichts; der Regelpfad braucht dieselbe Struktur. Ein frei fragendes Modell kann suggerieren und wiederholt fragen. Den belegten Vorteil holen wir gezielt: eine Nachfrage an den Stellen, wo Vagheit am meisten kostet. | Xiao u. a.: https://arxiv.org/abs/1905.10700; R3 Kapitel 5 Punkt 5; Nachfragetypen CHI 2025: https://arxiv.org/abs/2503.08582 |
| A3 | **Alles in den Workshop**: kein Bogen, Discovery nur im Gespräch | Studios arbeiten mit Interviews (Pentagram OpenView), Tiefe entsteht im Gespräch | Der Workshop braucht die Fälle vorher, um an zwei von ihnen weich zu laddern und die Switch-Zeitlinie am letzten Verkäufer zu führen (04, Teil 2 und 3). Fakten und Grenzen kosten im Gespräch teure Zeit. Stilles Schreiben vor dem Termin bringt eine eigene Position, bevor Gesprächsdynamik einsetzt (Brand Sprint). Deshalb Breite im Bogen, Tiefe im Workshop. | Pentagram OpenView: https://www.pentagram.com/work/openview/story; Brand Sprint: https://www.reforge.com/blog/brief-how-to-define-your-brand-with-gv-s-3-hour-sprint; R3 Prinzip 9 |
| A4 | **Formularwerkzeug mit Logik** (Typeform, Tally) | Verzweigung und Recall sind dort Standard | Vorbelegung aus dem Vorab-Dossier, Tauschprobe und Wirkungsliste brauchen den Datenvertrag der Werkbank. Fälle und Kundensituationen lägen bei einem Drittanbieter, das Team bräuchte weitere Konten. Die Logik selbst ist wenig Code. | R4 1.7: https://www.typeform.com/developers/create/logic-jumps/, https://tally.so/help/conditional-form-logic; R8 Kapitel 5 |
| A5 | **Claude entwirft alle Antworten aus dem Dossier, der Makler bestätigt** | minimaler Aufwand für den Makler | Bestätigen erzeugt belegt die Gefahr, dass falsche Vorbelegungen durchgewunken werden, und Voreinstellungen verschieben Entscheidungen. Bei Haltungen würde die Marke zum Echo unserer Vermutung. Deshalb nur Fakten vorbelegen. | Jäckle und Eckman: https://academic.oup.com/jssam/article-abstract/8/4/706/5532310; Jin 2011: https://doi.org/10.2501/IJMR-53-1-075-094; R3 Prinzip 7 |
| A6 | **Stimme weiter über Adjektiv-Regler** (v1 `s1` bis `s5`) | schnell, vertraut | Regler erhöhten in einer Studie den Abbruch deutlich und ziehen zum Startwert; sie messen Selbstbild statt Text. Stimmproben messen Stimme dort, wo sie später entsteht. | Funke, Reips, Thomas: https://dl.acm.org/doi/abs/10.1177/0894439310376896 (Volltext am 29.09. nicht abrufbar, Kennzahl daher hier nicht genannt); Liu und Conrad (oben); NN/g: https://www.nngroup.com/articles/tone-of-voice-dimensions/ |
| A7 | **Sprache zuerst**: Geschichten als Pflicht-Sprachaufnahme | Sprachantworten sind länger und enthalten mehr Themen | Das Anbieten von Sprache senkte die Antwortquote, und die Sprachbedingung hatte deutlich mehr fehlende Antworten. Eine eigene Aufnahme über die Web Speech API schickt Audio standardmäßig an einen Erkennungsdienst im Netz. Deshalb Text zuerst, Diktat über die Tastatur des Telefons als stiller Hinweis (Abweichung D11). | Revilla und Couper 2026: https://ojs.ub.uni-konstanz.de/srm/article/download/8456/7886?inline=1; Landesvatter und Bauer 2026: https://academic.oup.com/jssam/advance-article/doi/10.1093/jssam/smag030/8812674; R3 1.10; MDN: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API (nicht Teil von R1 bis R8, am 29.09.2026 gelesen) |

**Gewählt** ist ein adaptiver Bogen mit Fakten-Bestätigung, fallbasierten Fragen mit Zahlenfeld je Fall, Recall, höchstens einer Nachfrage je Frage und einem Regelpfad ohne Claude, der dieselbe Struktur liefert. Er übernimmt aus A2 die Nachfrage, aus A3 die Arbeitsteilung mit dem Workshop, aus A4 Verzweigung und Recall und verwirft den Rest.

---

## 3. Die gewählte Lösung

### 3.1 Ablauf auf einen Blick

| Phase | Wer | Was | Dauer |
|---|---|---|---|
| 0 Vorbereitung | Team | Vorbelegung prüfen, Verkaufsbeiträge in den letzten zwölf Kacheln zählen (für den Hinweis in F18), Link freischalten | etwa 20 Minuten je Makler (Setzung) |
| 1 Eröffnung | Makler | eine Seite: Dauer aus `auftrag.dauer`, fünf Kapitel, Workshop-Datum, Frage nach der KI-Verarbeitung (Ja, Nein, Später) | etwa 40 Sekunden |
| 2 Fünf Kapitel | Makler, Regeln, Claude | bestätigen, erzählen, wählen; Recall seiner Worte; höchstens zwei Nachfragen im ganzen Bogen | etwa 13 Minuten plus Rückfragen (3.10) |
| 3 Abschluss | Makler | seine Fälle und was aus ihnen wird; Frage nach dem Fremdbild-Link (Ja, Nein, Später) und bei Ja Link teilen; weiter zu den Bildpaaren (Schritt 3) oder später | etwa 1 bis 2 Minuten, in `auftrag.dauer` als "Fremdbild-Link teilen" geführt |
| 4 Nachlauf | Dritte, Regeln | Fremdbild-Antworten kommen bis zwei Tage vor dem Workshop | ohne Aufwand für den Makler |
| 5 Durchsicht | Team | Lücken markieren, Leitfaden für Schritt 4 vorbereiten, Zitat-Kandidaten notieren | etwa 20 Minuten (Setzung) |

### 3.2 Was der Makler sieht und tut

**Grundsätze der Gestaltung** (gelten für jeden Screen, 375 px zuerst):
- Eine Schriftfamilie, die der Werkbank (Power Grotesk, `index.html` Zeile 15). Stufen: Headline 32/34 px, Satzweite eng (-0,03 em wie `.hm-h`); Karten-Titel 30/32 px; Block-Titel 22/26 px; Text und Eingabe 17/24 px; Angaben 15/20 px; Hinweise 13/18 px in `--text-muted`. Die Mono-Schrift der Werkbank (`.hm-mono`, Versalien mit Sperrung) kommt im Bogen nicht vor, weil sie als Zeile über einer Headline wie eine Eyebrow wirkt.
- Ziffern in Karten und Wirkungsliste als Tabellenziffern (`font-variant-numeric: tabular-nums`), damit "11 Wochen" und "8 Prozent" auf einer Achse stehen. *Lücke:* ob Power Grotesk Tabellenziffern führt, prüft der Bau; sonst stehen Zahlen rechtsbündig.
- Abstände im 8-px-Raster: Rand 16, innerhalb von Blöcken 8 und 16, zwischen Blöcken 24, zwischen Abschnitten 40.
- Farbe nur aus den Rollen der Werkbank (`--ink`, `--ink-2`, `--paper`, `--paper-2`, `--hairline-dark`). Keine Verläufe, kein Schatten außer der Haarlinie, keine Textzeichen als Icons, keine Illustration, kein Stockbild. Bilder nur aus seinem eigenen Material (unten).

**Eröffnung.** Headline: "Etwa {minuten} Minuten. Fünf kurze Kapitel." `{minuten}` ist der Eintrag "Fragebogen, Pflichtteil" aus `auftrag.dauer` (heute 15, Setzung im Register von 01, 3.6; später der gemessene Median). Darunter in 17/24:

> Was wir schon über Ihre Arbeit wissen, haben wir vorbereitet. Sie bestätigen es nur. Gefragt wird, was nur Sie wissen, vor allem Ihre letzten Fälle. Fragen wir einmal nach, kommt etwas Zeit dazu. Jede Antwort ist sofort gespeichert.

Darunter die fünf Kapitel mit Minuten (1, 6, 2, 3, 2) als ruhige Liste und "Workshop am {Datum}" aus `auftrag.termine`. Die feste Angabe "Achtzehn Minuten" (`wb-flow.jsx` Zeile 41) entfällt.

Am Fuß der Eröffnung, vor "Beginnen", die Frage zur KI-Verarbeitung (D15), mit denselben drei Knöpfen wie die Einwilligungen in 01, nichts vorgewählt:

> Dürfen einzelne Antworten ohne Namen von einem KI-Dienst gelesen werden, damit wir bei Bedarf gezielt nachfragen können?
> Ja. Nein. Später.
> Wenn nicht: Rückfragen kommen aus festen Vorlagen, und Ihre Antworten gehen an keinen KI-Dienst.

"Später" gilt bis zu einer Wahl als Nein und erscheint im Abschluss noch einmal. Die Wahl wird im Format von 01 als Eintrag in `auftrag.einwilligungen` geschrieben: `{zweck: "kiAntworten", status, frist: null, gefragtIn: "link", fassung, datum}` (Vokabular von 01: gespraech, link, einladung; der Fragebogen läuft im Link). "Beginnen" ist ohne Wahl möglich.

**Die fünf Kapitel.** Namen sind so kurz, dass sie in die Kapitelanzeige passen; auf der Seite erscheinen sie nur als Headline des Kapitelabschlusses, nie als Zeile über einer Frage.

| Kapitel | Inhalt | Fragen | Screens | Schätzung |
|---|---|---|---|---|
| 1 Ihre Daten | Fakten bestätigen, für wen er arbeitet | F1, F2 | 2 | 1 Minute |
| 2 Ihre Fälle | drei Abschlüsse mit Zahl, Alternative, Abraten, Hindernis | F3 bis F7 | 7 | 6 Minuten |
| 3 Ihre Kunden | zwei Leiterstufen am eigenen Fall, Anlässe, Kunde nur wenn nötig, Empfehler, Zugehörigkeit | F8 bis F13 | 5, mit F11 6 | 2 Minuten |
| 4 Ihre Stimme | Kanäle, Anrede je Kanal, drei Wörter, vier Stimmproben, Erfolge am Fall, Grenzen | F14 bis F19 | 9 | 3 Minuten |
| 5 Ihr Rhythmus | Formate, Zeit, fester Termin, Ziel | F20 bis F23 | 4 | 2 Minuten |

**Aufbau jedes Screens:**
- Die Frage ist die Headline. Keine Zeile darüber, weder Kapitelname noch Nummer (heute verletzt durch `hm-mono` "Kapitel N" über der Frage, `wb-flow.jsx` Zeile 82 und 130).
- Unter der Headline, wenn vorhanden, sein eigener Satz als Zitat in 17/24, eingeleitet mit "Sie schrieben:" (Recall).
- Keine Platzhalter mit Beispielinhalt, weil sie Inhalte vorgeben. Stattdessen eine Strukturhilfe in 13/18, etwa "Wer, welche Lage, was entschied".
- Bei Erzählfragen (F3, F5, F6) ein ruhiger Hinweis unter dem Feld: "Sie können auch diktieren, mit dem Mikrofon Ihrer Tastatur." Kein eigener Aufnahmeknopf (D11).
- Unter jedem Freitextfeld dauerhaft: "Bitte ohne Namen von Personen."
- "Überspringen" ist bei jeder Haltungsfrage möglich und wird als `status: "uebersprungen"` gespeichert, nie als Wert.

**Die Fall-Karte (F3), der wichtigste Screen.** Hier soll er in einer Sekunde sehen: Das sind meine Verkäufe, die kennen mich. Deshalb ist der Held der Karte der Ort, nicht ein Formularfeld. Aufbau bei 375 px, von oben:

1. Headline 32/34 px, höchstens drei Zeilen. Karte 1: "Ihre letzten drei Abschlüsse. Was gab jeweils den Ausschlag?" Karte 2 und 3: "Und bei diesem Verkauf?"
2. 24 px Abstand, dann die Karte: Fläche `--paper-2`, Radius 14 px (wie `.hm-et`), Innenrand 20 px, Breite 343 px.
   - *Bild, nur wenn vorhanden:* ein eigenes Objektfoto aus `vorab.material` (Art "Objektfotos", Rechte "geklärt", vom Team dem Fall zugeordnet), 4:3 über die ganze Innenbreite (303 x 227 px), Radius 10 px, ohne Text, ohne Filter. Es wird nur ihm in seinem eigenen Link gezeigt und verlässt die Werkbank nicht; das ist keine Nutzung im Sinn von Zweck 4 "Objektfotos zeigen" aus 01, der Anwendungen und Veröffentlichung betrifft (Ableitung; hält der Owner das anders, gilt zusätzlich Zweck 4 mit Ja). Fehlt ein solches Foto, gibt es keinen Platzhalter, kein Stockbild und kein generiertes Bild: Die Karte ist dann rein typografisch, und das ist die Regelform.
   - *Ort als Titel:* `ort` (Straße ohne Hausnummer) in 30/32 px `--ink`; fehlt sie, der Bezirksname aus `plz` ("Hietzing").
   - *Zeile darunter* in 17/24 `--ink-2`: Objektart und Bezirk, "Zinshaus, 1190 Döbling". Fehlt die Art, steht dort ein Auswahlfeld "Art wählen" mit `HM_IMMOTYPEN`.
   - 8 px, dann die Angaben in 15/20 `--text-muted`, Tabellenziffern: Preis und Fläche, soweit vorhanden, mit Herkunft ("4,2 Mio., laut Ihren Angaben" oder "laut Bestand"). Fehlende Angaben werden weggelassen, nicht als "fehlt" gezeigt.
   - 16 px, zwei Knöpfe "Stimmt" und "Korrigieren", je 44 px hoch, als Rahmenknöpfe (`.hm-btn.hm-ghost`). Rechts unten in der Karte "1 von 3" in 13/18 `--text-muted`.
3. 24 px, dann das Feld "Was gab den Ausschlag?" (Label 17/24 `--ink`), Textfeld mit drei Zeilen in 17/24, darunter in 13/18: "Wer, welche Lage, was entschied. Bitte ohne Namen von Personen." und der Diktat-Hinweis.
4. 24 px, dann die Zahlen: "Wie lange von Vermarktungsbeginn bis Unterschrift?" als Zahlenfeld mit "Wochen" und dem Knopf "weiß ich nicht mehr"; liegt `dauerWochen` aus dem Bestand vor, steht dort "Laut Bestand {n} Wochen." mit Stimmt und Korrigieren. Darunter "Kaufpreis im Vergleich zu Ihrer ersten Einschätzung" (Käufer-Pfad: "zum Angebotspreis") mit vier Knöpfen in zwei Zeilen zu je 44 px: darüber, wie eingeschätzt, darunter, weiß ich nicht. Bei darüber oder darunter erscheint "Um etwa wie viel Prozent?".
5. Unten die Kapitelleiste (unten).

Rechnung der sichtbaren Fläche: Headline 102 + 24 + Karte ohne Bild 184 + 24 + Label 24 + Feld 96 = 454 px. Karte und Ausschlagfeld stehen damit auf einem 375 x 667 px großen Telefon über der Falz, die Zahlen folgen mit einem Wisch. Mit Bild wächst die Karte um 243 px; das Feld rückt dann unter die Falz, und der Screen scrollt beim Antippen von "Stimmt" zum Feld (Ableitung: das Bild trägt die Wiedererkennung, der Wisch kostet eine Sekunde).

**Kapitelanzeige bei 375 px.** Sie sitzt unten, in einer Leiste mit "Weiter", 16 px Rand links und rechts. Links steht das laufende Kapitel ausgeschrieben in 15 px, daneben fünf Marken ohne Text: kurze waagrechte Striche, 12 px breit und 2 px hoch mit 6 px Abstand; das laufende Kapitel 24 px breit in voller Tinte, erledigte in voller Tinte, kommende in 30 Prozent Tinte. Rechts der Knopf "Weiter", mindestens 44 px hoch. Keine Prozentzahl, kein Balken, kein Haken als Textzeichen (R3 1.10: Fortschrittsanzeigen helfen im Schnitt nicht, Villar, Callegaro, Yang: https://openaccess.city.ac.uk/14427/). Screenreader lesen "Kapitel 2 von 5, Ihre Fälle".

```
375 px
|16|Ihre Fälle  ==  ====  ..  ..  ..       [   Weiter   ]|16|
     ~90 px     5 Marken, ~96 px            96 x 44 px
```

Rechnung: 16 + 90 + 12 + 96 + 12 + 96 + 16 = 338 px, Reserve 37 px. Der längste Kapitelname ("Ihr Rhythmus", 12 Zeichen) passt in 90 px. Auf breiten Bildschirmen stehen alle fünf Namen ausgeschrieben, die Marken entfallen.

**Kapitelabschluss.** Keine vorläufige Deutung. Der heutige `KapitelReveal` sagt nach Kapitel 3 eine Figur an und nach Kapitel 1 "Deine Kunden kommen wegen ... zu dir"; das nimmt Einsicht und Richtung vorweg (Schritte 5 und 6) und verankert. Stattdessen: der Kapitelname als Headline, darunter einer seiner Sätze aus dem Kapitel ("Notiert: ...") und Name und Dauer des nächsten Kapitels, dazu "Später weitermachen".

**Abschluss bei 375 px.** Die Seite ist der Moment, an dem er sieht, dass seine Antworten Folgen haben. Sie ist aufgebaut wie eine Seite aus seinem späteren Markenbuch, nicht wie eine Bestätigung. Von oben:

1. Headline 32/34 px: "Das wird aus Ihren Antworten." Darunter in 15/20 `--text-muted` die gemessene Sitzung: "{Minuten} Minuten, {Zahl} Fälle, {Zahl} Rückfragen." Die Werte kommen aus `fragebogen.messung`, nichts ist geschätzt.
2. 40 px, dann die Wirkungsliste (Vorlagen in 3.4): höchstens sieben Blöcke, getrennt durch eine Haarlinie (`--hairline-dark`, 1 px), je 20 px Innenabstand oben und unten. Jeder Block hat zwei Ebenen: oben **sein Stoff** als Block-Titel 22/26 px `--ink` (Ort mit Zahl, sein Satz, seine Kanäle), darunter mit 8 px Abstand **was wir daraus machen** in 17/24 `--ink-2`, höchstens zwei Sätze. Liegt zu einem Fall ein eigenes Objektfoto wie auf der Fall-Karte vor, steht es rechts im Block als 72 x 54 px (4:3), Radius 6 px; der Titel läuft dann auf 247 px. Die Hierarchie trägt die Aussage: Er liest zuerst sich, dann uns.
3. 40 px, dann "Das besprechen wir am {Workshop-Datum}." als Block-Titel 22/26 px, darunter höchstens drei Zeilen in 17/24, je eine offene Sache in seinen Worten (Vorlage "offen" in 3.4). Hier steht auch jede vage Antwort, die wegen des Nachfrage-Budgets keine Rückfrage bekam, damit sichtbar ist, dass nichts verloren geht.
4. 40 px, dann der Fremdbild-Teil als dunkle Karte (`.hm-card.hm-dark`, Innenrand 20 px), nur solange Zweck 3 "Fremdbild-Link" in `auftrag.einwilligungen` nicht "nein" ist (01 D3 weist die Frage Schritt 2 zu):
   > Dürfen wir einen Link erzeugen, mit dem Menschen, die Ihre Arbeit kennen, drei kurze Fragen beantworten? Sie teilen ihn selbst, wir erfahren keine Namen.
   > Ja. Nein. Später.
   > Wenn nicht: Wie Sie auf andere wirken, prüfen wir nur an dem, was Sie im Workshop erzählen.

   Nichts ist vorgewählt. Die Wahl setzt den Eintrag von Zweck 3 `fremdbild` (`status`, `datum`; `gefragtIn: "link"` und `frist` stehen schon so in 01, bei Markus Fr 09.10.). "Später" lässt `status: "offen"` und die Frist von 01 unverändert; bis dahin erscheint die Frage bei jedem Öffnen des Links wieder. Bei Ja erscheinen zwei Knöpfe "Link für Menschen, die Sie siezen" und "Link für Menschen, die Sie duzen", die das Teilen-Menü des Telefons öffnen (3.7). Ist die KI-Frage der Eröffnung auf "Später", steht sie in derselben Karte darunter noch einmal.
5. 40 px, dann "Als Nächstes: drei Minuten mit Bildern, im selben Link." in 17/24, der Hauptknopf "Weiter zu den Bildern" (`.hm-btn`, 44 px) und daneben "Später" als Rahmenknopf. Darunter optional in 13/18: "War eine Frage überflüssig oder unklar?" (fließt in `fragebogen.messung.rueckmeldung` und an Schritt 17 `lernen`).

Das gesetzte Beispiel mit Markus für Fall-Karte und Abschluss steht in 3.8.

### 3.3 Was das Team tut

1. **Vor dem Link.** Ansicht "Vorbelegung": je Fakt Wert, Quelle und Sicherheit aus `vorab.fakten` (bezirke, graetzl, immotypen, seit, kanaele, abschluesse). Hoch und mittel erscheinen als "Stimmt das noch?", niedrig, fehlend oder in `vorab.luecken` geführt als offene Frage ohne Vorbelegung. Das Team kann eine Vorbelegung abschalten, aber nicht umformulieren. Es prüft, dass die bis zu drei Einträge in `abschluesse` verkauft sind und keine Hausnummer und keinen Namen enthalten, ordnet vorhandene Objektfotos mit geklärten Rechten den Fällen zu und zählt in `vorab.auftrittHeute` die Beiträge über eigene Verkäufe unter den letzten zwölf Kacheln (`fragebogen.vorbereitung.verkaufsbeitraege`, nur für den Hinweis in F18). An Einwilligungen prüft es nur, was dieser Schritt braucht: ob Zweck 3 "Fremdbild-Link" schon "nein" ist (dann entfällt der Fremdbild-Teil). Die übrigen Zwecke aus 01 sind gestaffelt und für den Bogen ohne Belang.
2. **Während der Makler ausfüllt.** Nichts. Das Team sieht den Kapitelstand, nicht live die Antworten, damit kein Druck entsteht (Ableitung).
3. **Nach dem Abschluss.** Das Team liest, ändert nie, schreibt Beobachtungen in `antworten.<key>.notizTeam` (nur intern, nie im Dossier), markiert Zitat-Kandidaten, prüft Lücken für Schritt 4 und hakt die Checkliste Q10 ab. Fremdbild-Antworten, die in Stufe A per Mail eingehen, überträgt es einzeln in `fremdbild.antworten[]`.

### 3.4 Was Claude erzeugt und was Regeln erzeugen

Grundsatz: **Regeln entscheiden, Claude formuliert.** Ob nachgefragt wird, bestimmt eine Regel. Claude formuliert nur die eine Nachfrage und hilft beim Zerlegen der Fall-Texte. Claude deutet im Bogen nichts.

| Aufgabe | Regeln (immer) | Claude (nur mit `kiAntworten` "ja" und Schlüssel) | Rückfall |
|---|---|---|---|
| Pfad | `hmFragePfad(antworten, vorab, auftrag)` aus den Bedingungen in `HM_FRAGEN_V2` | nichts | gleich |
| Vorbelegung | `hmVorbelegung(vorab)` nach Sicherheit und `vorab.luecken` | nichts | gleich |
| Recall | wählt den Satz: Fall 1 für Alternative, Hindernis und Erfolge, den Leiter-Fall für F8 | nichts | gleich |
| Ob nachgefragt wird | `hmNachfrageNoetig(key, antwort)` (Auslöser unten) und `hmNachfrageRang` (Budget unten) | nichts | gleich |
| Datenschutz vor dem Aufruf | `hmAnonymPruefen(text)` vor jedem Aufruf und vor dem Speichern | nichts | gleich |
| Wortlaut der Nachfrage | Vorlage je Lücke | Schema `NACHFRAGE` | Vorlage |
| Fall-Texte zerlegen | `hmPfSaetze`, `hmPfTeile`, Ortsliste `HM_BEZIRKE`, Straßen aus `vorab.fakten` abschluesse, Kundenwörter `HM_V2_KUNDENWORTE` | Schema `FAELLE` | Regelzerlegung, Rest als Lücke |
| Belegfähiger Fall | `hmBelegKandidat(fall)` nach E3 | nichts | gleich |
| `kundeSatz` ableiten | wörtlicher Kundenteil aus dem Fall-Text (D19) | über `FAELLE.kunde` | Regel, sonst F11 |
| Stimmproben | Vorlagen aus `HM_V2_STIMMPROBEN` mit Grätzl, Objekt-Lexikon und Anrede aus `hmAnrede` (3.5) | nichts | gleich |
| Wirkungsliste | Vorlagen unten, nur für beantwortete Fragen mit vorhandenem Abnehmer | nichts | gleich |
| Messung | `hmMessung` je Screen | nichts | gleich |

**Auslöser der Nachfrage** (Regel, Reihenfolge der Prüfung): Ausschlag fehlt, weil nur ein Weg genannt ist (Wörter wie "kam über", "Empfehlung", "Bestandskunde", "Notar" ohne Begründung); Situation fehlt (unter acht Wörter oder nur Allgemeinplätze aus der Liste Vertrauen, Service, immer, grundsätzlich, Kunden schätzen); Zahl fehlt (bei `faelle` beide Zahlenfelder leer, bei `abgeraten` kein Ergebnis); Ort fehlt (nur wenn kein Ort vorbelegt ist); bei `zielMerkmal` keine zählbare Größe. "Weiß ich nicht mehr" beendet jede Nachfrage.

**Budget und feste Rangfolge** (`hmNachfrageRang`, D4). Höchstens eine Nachfrage je Frage, höchstens zwei im Bogen. Nachfragen dürfen nur diese vier Fragen auslösen, in dieser Rangfolge:

| Rang | Frage | Warum dieser Rang | Wann gestellt |
|---|---|---|---|
| 1 | F3 `faelle` | nur hier entsteht ein öffentlicher Beleg; der Workshop kann eine fehlende Zahl nicht ersetzen, wenn keine Unterlage kommt | direkt nach der dritten Karte, gezielt auf den Fall, der mit einer Antwort belegfähig wird; die Regel zieht einen fehlenden Ausschlag einer fehlenden Zahl vor, weil eine Dauer auch aus dem Bestand kommen kann |
| 2 | F6 `abgeraten` | trägt die weiße Stelle und das Territorium Haltung (05, 06); ohne Ergebnis ist die Geschichte kein Beleg | gesammelt am Ende von Kapitel 2, nach F7, mit Recall ("Sie schrieben: ...") |
| 3 | F5 `alternativeKonnte` | wichtig für `andersAls`, aber der Workshop vertieft genau das im Switch-Interview am letzten Verkäufer (04, Teil 3) | wie Rang 2, nur wenn danach noch Budget bleibt |
| 4 | F23 `zielMerkmal` | Erfolgsmaß; zur Not setzt das Team es im Markenvertrag mit ihm (07) | direkt nach F23, nur mit Restbudget |

F8 und F9 lösen keine Nachfrage aus: F9 ist selbst die Nachfrage der Leiter. F11 und F13 lösen keine aus, weil ihre Lücken ohnehin im Workshop landen. Der erste Platz ist für F3 reserviert; bleibt er ungenutzt, darf die Rangfolge beide Plätze vergeben. Jede vage Antwort ohne Nachfrage erscheint als offene Zeile im Abschluss (3.2, Punkt 3) und als Lücke im Leitfaden von Schritt 4.

**Datenschutz vor dem Aufruf** (Q11). Bevor ein Text an `NACHFRAGE` oder `FAELLE` geht, und bevor er gespeichert wird, prüft `hmAnonymPruefen` im Browser auf: Mailadressen; Telefonnummern (sieben oder mehr Ziffern mit Leerzeichen, Schrägstrich oder Plus); Anrede oder Titel plus großgeschriebenes Wort ("Herr", "Frau", "Familie", "Dr.", "Mag."); Straßennamen mit Hausnummer (Wortende -straße, -gasse, -weg, -platz, -allee, -ring, -zeile, -hof, gefolgt von einer Zahl); Datumsangaben mit Tag. Bei einem Treffer zeigt der Screen den Text mit Maske ("Frau [Name]", "Sieveringer Straße [Nr.]") und zwei Knöpfe "So speichern" und "Selbst ändern". Bis er bestätigt, geht nichts an Claude und nichts an den Server. An Claude geht immer nur die eine Antwort (bei `FAELLE` die drei Fall-Texte) mit `fehlt` und Anrede, nie das Dossier.

**Einwilligung.** `hmKiErlaubt(auftrag)` ist wahr, wenn `auftrag.einwilligungen` den Eintrag `zweck: "kiAntworten"` mit `status: "ja"` enthält (D15). Bei "nein", "offen" oder ohne Schlüssel laufen Nachfrage und Zerlegung ausschließlich über Vorlagen und Regeln; der Bogen ist damit vollständig bedienbar.

**Schema `NACHFRAGE`** (Structured Outputs, gleicher Aufbau wie `SCHEMA` in `api/wb-marke.js`):

```json
{
  "type": "object",
  "properties": {
    "fehlt": { "type": "string", "enum": ["ausschlag", "situation", "zahl", "ort", "ergebnis", "messbar"] },
    "bezug": { "type": "string" },
    "frage": { "type": "string" }
  },
  "required": ["fehlt", "bezug", "frage"],
  "additionalProperties": false
}
```

Prompt (kurz, Deutsch): "Du stellst genau eine Nachfrage zu einer Antwort eines Immobilienmaklers. Die Regel hat festgestellt, was fehlt: {fehlt}. Zitiere in bezug wörtlich einen Teil seiner Antwort. Formuliere in frage einen Satz, höchstens 20 Wörter, in der Anrede {Sie oder Du}. Frag nach einem konkreten vergangenen Moment. Schlag keine Antwort vor, nenne keine Zahl, keinen Ort und keinen Namen, der nicht in seiner Antwort steht. Keine Ausrufezeichen, keine Gedankenstriche."

**Prüfung vor der Anzeige** (Q12): `bezug` steht wörtlich in der Antwort; `frage` enthält keine Ziffer und keinen Ortsnamen, der nicht in der Antwort vorkommt; höchstens 20 Wörter; kein Treffer in `KLISCHEES` (`api/wb-marke.js` Zeile 168). Scheitert eine Prüfung oder dauert die Antwort länger als drei Sekunden (Setzung), erscheint die Vorlage.

**Vorlagen der Nachfrage** (Regelpfad, Sie-Form; Du-Form analog in `text.du`):

| fehlt | Vorlage |
|---|---|
| ausschlag | "Sie schrieben: '{bezug}'. Das erklärt, wie der Auftrag kam. Was hat entschieden, dass man Sie beauftragt hat?" |
| situation | "Sie schrieben: '{bezug}'. An welchen Moment in diesem Fall denken Sie dabei?" |
| zahl | "Wissen Sie noch ungefähr, wie lange es gedauert hat oder wie weit der Preis von Ihrer ersten Einschätzung lag?" |
| ort | "In welchem Bezirk oder Grätzl war das?" |
| ergebnis | "Sie schrieben: '{bezug}'. Was ist daraus geworden?" |
| messbar | "Woran würden Sie das in zwölf Monaten zählen?" |

**Schema `FAELLE`** (zerlegt nur den Freitext; die Zahlenfelder der Fall-Karte sind strukturiert und gehen nicht durch Claude):

```json
{
  "type": "object",
  "properties": {
    "faelle": { "type": "array", "items": {
      "type": "object",
      "properties": {
        "nr": { "type": "integer" },
        "zahlenImText": { "type": "array", "items": { "type": "string" } },
        "anlass": { "type": "string" },
        "empfehler": { "type": "string" },
        "kunde": { "type": "string" },
        "ausschlagKern": { "type": "string" },
        "seite": { "type": "string", "enum": ["verkaeufer", "kaeufer", "unklar"] },
        "luecken": { "type": "array", "items": { "type": "string", "enum": ["ausschlag", "situation", "anlass", "ort", "kunde"] } }
      },
      "required": ["nr", "zahlenImText", "anlass", "empfehler", "kunde", "ausschlagKern", "seite", "luecken"],
      "additionalProperties": false
    } }
  },
  "required": ["faelle"],
  "additionalProperties": false
}
```

Regel nach der Zerlegung: Jede Angabe in `zahlenImText`, `kunde` und `ausschlagKern` muss wörtlich im Text stehen, sonst wird sie verworfen. Leere Felder sind Lücken, nie Vermutungen. Der Originaltext bleibt die Hauptquelle.

**Regel `hmBelegKandidat`** (E3): Ein Fall ist belegfähig, wenn er einen Ort hat (vorbelegt und bestätigt oder genannt), einen Ausschlag ohne Lücke und mindestens eines von `dauerWochen` oder `abweichung.prozent`. `dauerWochen` zählt, wenn der Makler sie eingegeben oder eine aus dem Bestand gerechnete Dauer bestätigt hat; `abweichung` zählt nur als Eingabe des Maklers. `preis` aus `vorab.fakten` zählt nie, auch nicht in Verbindung mit einer Zahl im Text, die nur den Preis wiederholt.

**Wirkungsliste: alle Vorlagen.** Jede Zeile gehört zu einem Zielfeld mit Abnehmer und ist in seiner Alltagssprache geschrieben: kein Wort aus der Werkstatt (Beleg-Kandidat, Stoff, Maßstab, Positionierung, Einsicht, Territorium, Zielfeld, Abnehmer, Konvention; Liste in Q17). Die Regel füllt in dieser Rangfolge auf, bis sieben Blöcke stehen; danach höchstens drei offene Zeilen. Titel und Satz sind die zwei Ebenen des Blocks aus 3.2.

| Rang | Zielfeld (Abnehmer) | Bedingung | Titel (sein Stoff) | Satz (was wir daraus machen) |
|---|---|---|---|---|
| 1 | `beweise` (7 über `faelle`) | je belegfähigem Fall, höchstens zwei | "{Ort}, {Zahl}" mit Zahl als "in {n} Wochen verkauft" oder "{n} Prozent über Ihrer ersten Einschätzung" | "Diesen Verkauf können Sie später öffentlich zeigen. Bringen Sie dafür bitte eine Unterlage in den Workshop, die {den Zeitraum oder Ihre erste Einschätzung und den Kaufpreis} zeigt." |
| 2 | `werte`, `versprechen` (7 über `leiter`) | Leiter mit mindestens einer beantworteten Stufe | "{Ort}: '{Ausschlag}'" | "Im Workshop fragen wir weiter, warum das Ihren Kunden so wichtig war. Daraus entsteht das Versprechen Ihrer Marke." |
| 3 | `einsicht.weisseStelle` (5) | `abgeraten` beantwortet | "Sie schrieben: '{erster Satz, höchstens zwölf Wörter}'" | "Wir prüfen, ob in Ihrer Gegend jemand anderer so etwas erzählen kann. Wenn nicht, kann Ihre Marke darauf bauen." |
| 4 | `positionierung.andersAls` (7) | `alternativeKonnte` beantwortet | "Was {Alternative} nicht gekonnt hätte: '{erster Satz}'" | "Daran zeigen wir, worin Sie anders arbeiten. Ein anderes Büro nennen wir dabei nie." |
| 5 | `anrede` (8) | `anredeJeKanal` beantwortet, je Form eine Zeile | "{Sie oder Du}, auf {Kanäle}" | "So spricht jeder Text Ihrer Marke die Menschen dort an." |
| 6 | `stimme.verbindlich` (8) | mindestens ein Thema "nie" | "{Themen}: nie" | "Das kommt in keinem Text und keinem Bild vor." |
| 7 | `serieSignatur` (12) | `cue` beantwortet | "{cue}" | "Hier prüfen wir einen festen Platz für Ihre wiederkehrende Serie, damit sie in Ihre Woche passt, ohne sie umzubauen." |
| 8 | `markenvertrag.erfolgsmass` (7) | `zielMerkmal` zählbar | "In zwölf Monaten: {zielMerkmal}" | "Daran messen wir, ob Ihre Marke wirkt." |
| 9 | `kanalplan` (12) | mindestens ein Kanal "nutze ich nicht" | "{Kanäle}: nicht genutzt" | "Dort planen wir nichts." |
| offen | Lücke an Schritt 4 | je fehlendem Pflichtstoff und je vager Antwort ohne Nachfrage, höchstens drei | unter "Das besprechen wir am {Datum}." | "Was beim Verkauf in {Ort} den Ausschlag gab." / "Wie lange der Verkauf in {Ort} gedauert hat." / "Woran Sie '{Ziel}' in zwölf Monaten zählen." / "Was Sie konnten und {Alternative} nicht, noch etwas genauer." |

Titel mit seinen Sätzen werden nie gekürzt, nur nach dem ersten Satz beendet; ist der erste Satz länger als zwölf Wörter, steht der Block nur mit dem Satz "Ihre Geschichte vom Abraten" als Titel. So erscheint nie ein halber Satz von ihm.

### 3.5 Stimmproben nach dem Vertrag von Schritt 8

**Vertrag.** Schritt 8 (08_stimme 3.7) verlangt vier Paare, je eines für einen Regler: `ernst` (leicht gegen ernst), `persoenlich` (förmlich gegen persönlich), `begeistert` (zurückhaltend gegen begeistert), `sachlich` (Gefühl gegen Beleg). `begeistert` und `sachlich` werden getrennt gemessen, weil Intensität und Belegdichte unabhängig sind. Respektvoll gegen pointiert ist keine Probe, sondern Regel V7 in Schritt 8. Die Wahl ist binär: Pol A gleich 25, Pol B gleich 75, keine Wahl gleich `null`, nie 50. Schritt 2 liefert genau das (D8).

| Probe | Regler | Pol A (25) | Pol B (75) |
|---|---|---|---|
| P1 | `ernst` | leicht, trockene Untertreibung | ernst, ohne Pointe |
| P2 | `persoenlich` | förmlich, Sache im Vordergrund | persönlich, Ich und Erlebtes |
| P3 | `begeistert` | zurückhaltend | begeistert |
| P4 | `sachlich` | Gefühl, erzählend | Beleg, mit Quelle |

**Bauregeln für jedes Paar** (geprüft in Q14): gleicher Inhalt, gleiche Satzzahl, Wortzahl höchstens drei Wörter Unterschied, derselbe Ort und dieselbe Objektart. Es wechselt genau die eine Dimension, gemessen mit den Messfunktionen von Schritt 8 (08, 3.7): Anteil der Ich- oder Wir-Sätze gleich außer in P2; Zahl der Verstärker aus `HM_STIMME_VERSTAERKER` gleich außer in P3; Anteil der Sätze mit Zahl, Ort, Datum oder Quelle gleich außer in P4. Kein Ausrufezeichen, auch nicht im begeisterten Pol. Kein Wort aus `KLISCHEES`.

**Darstellung.** Je Probe ein Screen: Situation als Headline ("Ein Eigentümer möchte mehr, als die Vergleichswerte tragen."), darunter zwei gleich große Satzkarten (`--paper-2`, Radius 14 px, Innenrand 20 px, Satz in 17/24). Welcher Pol links beziehungsweise oben steht, lost die Regel je Makler und Probe aus und speichert es (`links`), damit keine Seitenpräferenz misst. Er tippt die Karte, die nach ihm klingt. Darunter: "Keiner von beiden. So würde ich es sagen:" mit einem Feld. Ein eigener Satz setzt `wahl` auf `null` und geht als Zitat-Kandidat an Schritt 4; der Wert wird nicht geschätzt.

**Anrede der Proben: eine Funktion.** Die Proben kommen nach F15. Der Bogen hat keine eigene Anrede-Regel. Er ruft `hmAnrede(mid, "website")` aus `wb-vertrag.jsx`; weil `marke2[mid].anrede` zu diesem Zeitpunkt noch nicht existiert, übergibt er den Entwurf, den `hmAnredeRegel(antworten)` aus `wb-stimme.jsx` als reine Funktion baut: `hmAnrede(mid, "website", { entwurf: hmAnredeRegel(antworten) })`. Der Bogen speichert diesen Entwurf nicht; Erzeuger von `anrede` bleibt Schritt 8. Welche Form im Kontext `website` gilt, wenn Zeilen fehlen oder sich widersprechen, entscheidet damit allein die Regel von 08 (3.4, Absatz Website). Da F15 die Zeile "Website und E-Mail" immer fragt, ist das im Normalfall genau diese Zeile. Die Unterstützung von `opt.entwurf` ist eine Bitte an 7 und 8 (5.4).

**Platzhalter.** `{graetzl}` aus dem bestätigten Kern-Grätzl (`name`), `{objekt}` aus dem ersten bestätigten Eintrag in `immotypen` über das Objekt-Lexikon `HM_V2_OBJEKT_LEXIKON` (Nominativ, Genitiv, Artikel und typische Unterlagen, etwa Zinshaus: "das Zinshaus", "Ihres Zinshauses", Unterlagen "Grundbuchauszug und Mietliste"; Eigentumswohnung: "die Wohnung", "Ihrer Wohnung", "Grundbuchauszug und Nutzwertgutachten").

**Vorlagen, Eigentümer-Pfad** (Sie-Form, gefüllt für Markus: `{graetzl}` Sievering, `{objekt}` Zinshaus):

| Probe | Situation | Pol A | Pol B | Wörter A/B |
|---|---|---|---|---|
| P1 ernst | Ein Eigentümer möchte mehr, als die Vergleichswerte tragen. | "Ihren Wunschpreis für das Zinshaus in Sievering würde ich mir auch wünschen. Die Vergleichswerte sind da strenger. Reden wir über die Zahlen." | "Ihren Wunschpreis für das Zinshaus in Sievering halte ich für zu hoch. Die Vergleichswerte tragen ihn nicht. Reden wir über die Zahlen." | 22/22 |
| P2 persönlich | Jemand fragt, was sein Haus wert ist. | "Eine belastbare Bewertung Ihres Zinshauses in Sievering erfordert eine Besichtigung vor Ort. Grundbuchauszug und Mietliste werden dafür geprüft. Danach erhalten Sie eine schriftliche Einschätzung." | "Für eine belastbare Bewertung Ihres Zinshauses in Sievering komme ich zu Ihnen. Grundbuchauszug und Mietliste sehe ich mir an. Danach schreibe ich Ihnen meine Einschätzung." | 24/25 |
| P3 begeistert | Ein Beitrag nach einem Abschluss. | "Das Zinshaus in Sievering ist verkauft. Der Kaufvertrag ist seit heute unterschrieben. Für die Verkäufer ist das ein guter Abschluss." | "Das schöne Zinshaus in Sievering ist verkauft. Der Kaufvertrag ist seit heute unterschrieben. Für die Verkäufer ist das ein wirklich großartiger Abschluss." | 20/22 |
| P4 sachlich | Warum Warten manchmal besser ist. | "Viele Eigentümer in Sievering verkaufen unter Druck, weil sich Warten falsch anfühlt. Ich verstehe dieses Gefühl. Manchmal ist Geduld trotzdem die bessere Entscheidung." | "Viele Eigentümer in Sievering verkaufen unter Druck, obwohl die Vergleichswerte dagegen sprechen. Ich lege die Vergleichswerte vor. Manchmal ist Geduld laut Rechnung die bessere Entscheidung." | 23/25 |

Probe gegen die Bauregeln: P1 hat in beiden Polen einen Ich-Satz, einen Wir-Satz, eine Quelle (Vergleichswerte), keinen Verstärker; der Unterschied ist die Untertreibung. P2 wechselt von null auf drei Ich-Sätze, Unterlagen und Ort bleiben gleich. P3 wechselt nur die Wertungswörter ("schöne", "wirklich großartiger" gegen "guter"); Ort und Datum stehen in beiden. P4 wechselt von einem auf drei Sätze mit Quelle; die Ich-Form bleibt.

**Vorlagen, Käufer-Pfad** (gleiche Bauregeln, `{objekt}` hier "die Wohnung" als Beispiel):

| Probe | Situation | Pol A | Pol B |
|---|---|---|---|
| P1 ernst | Ein Käufer will mehr bieten, als die Vergleichswerte tragen. | "Ihr Angebot für die Wohnung in {graetzl} würde ich als Verkäufer auch nehmen. Die Vergleichswerte sind da strenger. Reden wir über die Zahlen." | "Ihr Angebot für die Wohnung in {graetzl} halte ich für zu hoch. Die Vergleichswerte tragen es nicht. Reden wir über die Zahlen." |
| P2 persönlich | Jemand fragt, was eine Wohnung wert ist. | "Eine belastbare Einschätzung der Wohnung in {graetzl} erfordert eine Besichtigung vor Ort. Energieausweis und Nutzwertgutachten werden dafür geprüft. Danach erhalten Sie eine schriftliche Einschätzung." | "Für eine belastbare Einschätzung der Wohnung in {graetzl} komme ich zur Besichtigung mit. Energieausweis und Nutzwertgutachten sehe ich mir an. Danach schreibe ich Ihnen meine Einschätzung." |
| P3 begeistert | Ein Beitrag nach einem Kauf. | "Die Wohnung in {graetzl} ist gekauft. Der Kaufvertrag ist seit heute unterschrieben. Für die Käufer ist das ein guter Abschluss." | "Die schöne Wohnung in {graetzl} ist gekauft. Der Kaufvertrag ist seit heute unterschrieben. Für die Käufer ist das ein wirklich großartiger Abschluss." |
| P4 sachlich | Warum Warten manchmal besser ist. | "Viele Käufer in {graetzl} bieten unter Druck, weil sich Warten riskant anfühlt. Ich verstehe dieses Gefühl. Manchmal ist Geduld trotzdem die bessere Entscheidung." | "Viele Käufer in {graetzl} bieten unter Druck, obwohl die Vergleichswerte dagegen sprechen. Ich lege die Vergleichswerte vor. Manchmal ist Geduld laut Rechnung die bessere Entscheidung." |

**Messinstrument, nie Output.** Die Vorlagen sind für alle Makler einer Seite gleich, bis auf Grätzl, Objekt und Anrede. Das ist gewollt: Nur ein gleiches Instrument macht die Wahl vergleichbar. Der Ausgang ist ausschließlich 25, 75 oder `null`, nie ein Satz. Q13 stellt sicher, dass kein Probensatz in `stimme.beispiele`, `stimme.eigeneWorte` oder `botschaften` eines Maklers landet. Humor wird nur als leichter Pol ohne Albernheit angeboten, nie als Ziel (NN/g: verspielter Ton senkt in ernsten Branchen Vertrauen, https://www.nngroup.com/articles/tone-voice-users/).

### 3.6 Antwortlisten

Jede Liste ist selbst eine Vorgabe und prägt die Antworten; deshalb sind alle hier ausgeschrieben, kurz gehalten und mit eigenem Freitext, der als eigener Eintrag zählt. Neue Konstanten liegen in `wb-fragen.jsx` mit Präfix `HM_V2_`; die v1-Konstanten in `wb-data.jsx` bleiben unverändert zum Lesen alter Antworten. Keine Option ist vorgewählt.

**F2 `seite`** (sieben Stufen, alle beschriftet): nur Eigentümer, fast nur Eigentümer, meist Eigentümer, beide gleich, meist Käufer, fast nur Käufer, nur Käufer. Wirkung der Stufen in D21.

**F3 Zahlenfelder je Fall.** Wie in 3.2 beschrieben: Dauer in Wochen oder "weiß ich nicht mehr", bei gerechneter Dauer "Laut Bestand {n} Wochen." zum Bestätigen; Abweichung darüber, wie eingeschätzt, darunter, weiß ich nicht, bei darüber oder darunter Prozent. Eigentümer-Pfad: "im Vergleich zu Ihrer ersten Einschätzung"; Käufer-Pfad: "im Vergleich zum Angebotspreis".

**F4 `alternative`** (eine Auswahl):
- Eigentümer (`HM_V2_ALTERNATIVE.eigentuemer`): ein großes Maklerbüro; eine andere Maklerin oder ein anderer Makler aus der Gegend; selbst verkauft über eine Plattform; direkt an einen Käufer oder Bauträger; niemanden, abgewartet; weiß ich nicht.
- Käufer (`HM_V2_ALTERNATIVE.kaeufer`): allein über Portale gesucht; eine andere Maklerin oder ein anderer Makler; direkt beim Bauträger gekauft; über das eigene Netzwerk; weiter gemietet, abgewartet; weiß ich nicht.

"Niemanden, abgewartet" ist nach Dunford eine echte Alternative (Nichtstun), die in v1 fehlt (https://www.aprildunford.com/post/a-product-positioning-exercise).

**F7 `hindernis`** (bis zwei, plus "Etwas anderes:"):
- Eigentümer (`HM_V2_HINDERNIS.eigentuemer`, aus `HM_HINDERNISSE` mit drei Änderungen): Provision; Bindungsdauer des Auftrags (umbenannt aus "Bindungsdauer"); Zweifel an der Preiseinschätzung (umbenannt aus "Zweifel am Preis"); schlechte Erfahrung mit Maklern; wollten selbst verkaufen; ein anderer Makler war schon im Gespräch; Uneinigkeit unter Miteigentümern oder Erben (neu, weil Erbe ein häufiger Anlass ist und die Spannung dort liegt, Ableitung).
- Käufer (`HM_V2_HINDERNIS.kaeufer`, neu): Käuferprovision; Finanzierung noch nicht geklärt; Angst, zu viel zu zahlen; lieber selbst auf Portalen suchen; Zweifel, ob der Makler auch für den Verkäufer arbeitet; schlechte Erfahrung mit Maklern.

**F10 `ausloeser`** (bis drei, plus "Ein anderer Anlass:"; Vorschläge aus der Zerlegung von F3 stehen oben als "aus Ihren Fällen: ..." und sind nicht vorgewählt):
- Eigentümer (`HM_V2_AUSLOESER.eigentuemer`, aus `HM_AUSLOESER`): Erbe; Trennung oder Scheidung (umbenannt aus "Trennung"); Kinder ziehen aus; Verkleinern im Alter; Umzug aus beruflichen Gründen; Anlage neu ordnen (umbenannt aus "Investment"); Sanierung steht an (neu, trifft Zinshaus und Altbau). "Familie wächst" wandert in die Käufer-Liste.
- Käufer (`HM_V2_AUSLOESER.kaeufer`, neu): erste eigene Wohnung; Familie wächst; Anlage und Vorsorge; Zuzug nach Wien oder in den Bezirk; Verkleinern im Alter; Trennung oder Scheidung.

**F11 `kundeSatz`, Kundenwörter** (`HM_V2_KUNDENWORTE`, für die Regelzerlegung): Erbengemeinschaft, Erben, Ehepaar, Paar, Familie, Eltern, Witwe, Witwer, Pensionist, Pensionistin, Anleger, Anlegerin, Investor, Stiftung, Gesellschaft, Hausgemeinschaft, junge, ältere, geschieden, getrennt. Ein Treffer im Fall-Text liefert den wörtlichen Teilsatz als Kandidaten (D19).

**F12 `empfehler`** (bis drei, plus "Anders:"; `HM_V2_EMPFEHLER`, neu): Notariat; Anwaltskanzlei; Steuerberatung; Hausverwaltung; Bank; frühere Kunden; Bekannte und Familie; Portal oder Inserat; Website oder Google; Social Media. "Empfehlung von Bekannten" stand in v1 unter `gruende`; es ist ein Weg, kein Grund.

**F13 `unity`** (Text, ein Satz; Strukturhilfe "Viertel, Verein, Herkunft, Lebensphase"; kein Beispielinhalt, weil der v1-Platzhalter "Eltern in Ottakring, Läufer am Donaukanal" Antworten vorgab, `wb-data.jsx` Zeile 153).

**F14 `kanaele`** (je Kanal aktiv, will ich aufbauen, nutze ich nicht): Instagram, LinkedIn, Facebook, TikTok, YouTube. "Aktiv" und ruhende Konten als "aufbauen" sind aus `vorab.fakten` kanaele vorbelegt (Fakt, bestätigen); trägt der Eintrag `hinweis`, steht darunter "Letzter Beitrag im {Monat}" (01 D12). "Will ich aufbauen" ist ohne Quelle nie vorbelegt.

**F15 `anredeJeKanal`** (je Zeile Sie oder Du): eine Zeile je Kanal mit aktiv oder aufbauen, dazu immer "Website und E-Mail" (Anforderung A3 aus 08, 5.2). Steht in `vorab.auftrittHeute` eine Bio, erscheint unter der Zeile "In Ihrer heutigen Bio: {Form}" als Hinweis, nicht vorgewählt.

**F18 `erfolge`** (drei Verhaltensstufen am Fall 1, D18): "Nein"; "Nur, wenn mich jemand gefragt hat"; "Ja, ich habe ihn öffentlich gemacht". Käufer-Pfad: "diesen Kauf". Hinweis darunter, nur wenn das Team in Phase 0 gezählt hat: "In Ihren letzten zwölf Beiträgen: {n} über eigene Verkäufe." Der Hinweis wählt nichts vor.

**F19 `grenzen`** (`HM_V2_GRENZEN`, je Zeile zeigen oder nie, zusammengeführt aus `HM_PRIVAT` und `HM_TABUS` ohne Widerspruch): Familie; Wohnort und Grätzl; Sport und Hobby; Meinung zum Markt; Fehler und was ich daraus gelernt habe; Politik und Gesellschaft; Team und Büro; Humor; Luxus zeigen; erzielte Verkaufspreise nennen; Kunden erkennbar zeigen (auch bei "zeigen" nur mit schriftlicher Einwilligung der Kunden). Darunter `grenzenFrei`: "Was sonst nie vorkommen soll:". Gestrichen: "Konkurrenz kommentieren", weil Schritt 8 das mit V7 für alle verbietet und die Antwort "zeigen" nichts ändern könnte (sinnlose Frage).

"Erzielte Verkaufspreise nennen" betrifft Belege, nicht Angebotspreise in Objekt-Beiträgen; die Preispflicht in der Caption (Schritt 12, `objektRegel`) bleibt davon unberührt.

**F20 `formate`** (je Karte gern, geht, nie; Schlüssel wie `HM_FORMATE`, Texte in Sie und Du): Talking Head, "Sie sprechen 30 bis 60 Sekunden direkt in die Kamera"; Grätzl-Spaziergang, "Sie gehen durch Ihr Viertel und erzählen"; Objekt-Rundgang, "ein Rundgang durch ein Objekt mit Ihrem Kommentar"; Karussell, "sechs bis acht Seiten mit Zahlen, Ablauf oder Vergleich, ohne Kamera"; Frage und Antwort, "eine Kundenfrage, Ihre Antwort in 20 bis 40 Sekunden"; Hinter den Kulissen, "Besichtigung, Büro, Team in 15 bis 45 Sekunden". Kein Text nennt Instagram, Reel oder Story.

**F21 `zeit`** (`HM_ZEIT`, unverändert): bis 2 Stunden; 2 bis 4 Stunden; 4 bis 8 Stunden; mehr als 8 Stunden. Frage: "Wie viel Zeit können Sie im Monat fest einplanen, Dreh und Freigabe eingerechnet?"

**F23 `ziel`** (eine Auswahl, `HM_V2_ZIELE`, aus `HM_ZIELE`): mehr Aufträge von Eigentümern (umbenannt aus "Mehr Abgeber-Anfragen"; im Käufer-Pfad ausgeblendet); mehr Suchaufträge von Käufern (ersetzt "Käufer-Community aufbauen"; im Eigentümer-Pfad ausgeblendet); bekannt in {Bezirk 1} werden; Investoren erreichen; mehr Empfehlungen von Partnern wie Notariat oder Hausverwaltung (neu). Gestrichen: "Team aufbauen", weil kein Abnehmer daraus etwas anderes macht (Schritt 12 kennt keine Recruiting-Säule). Danach `zielMerkmal`: "Woran würden Sie das zählen?" ein Satz.

### 3.7 Fremdbild

Nur, wenn er im Abschluss bei Zweck 3 "Fremdbild-Link" Ja wählt (3.2, Punkt 4). Der Makler teilt den Link selbst; das System kennt keine Namen und keine Kontaktdaten Dritter. Die Seite liegt außerhalb von `/ux`, weil `middleware.js` alles unter `/ux` per Passwort schützt. Makler-Kennung und Anredeform stehen im Fragment der Adresse (nach `#`), das nicht an den Server geht.

**Einwilligungstext für Antwortende** (oben auf der Seite, Entwurf zur Prüfung durch den Owner, keine Rechtsberatung):

> Markus Leitner arbeitet mit dem Markenteam von UNIO an seinem Auftritt und bittet Sie um drei kurze Antworten. Wir fragen nicht nach Ihrem Namen oder Ihren Kontaktdaten. Das Markenteam von UNIO liest Ihre einzelnen Antworten, um ein Gespräch mit Markus Leitner vorzubereiten. Markus Leitner selbst sieht die Antworten erst, wenn mindestens drei Menschen geantwortet haben, gemischt und ohne Angabe, wer was geschrieben hat. Zur Auswertung können die Antworten ohne Namen von einem KI-Dienst verarbeitet werden. Ihre Sätze werden nie öffentlich verwendet.

Darunter ein nicht vorgewähltes Kästchen "Ich bin einverstanden"; ohne Haken lässt sich nichts senden. Hat der Makler der KI-Verarbeitung nicht zugestimmt (`kiAntworten` nicht "ja"), entfällt der fünfte Satz, und die Antworten gehen nicht in `dossier()`.

**Die Fragen** (Sie-Form / Du-Form):

| Feld | Sie | Du | Typ |
|---|---|---|---|
| `rolle` | "Woher kennen Sie Markus Leitner?" | "Woher kennst du Markus Leitner?" | eine Auswahl: Ich habe mit ihm verkauft; ich habe über ihn gekauft; wir arbeiten beruflich zusammen (etwa Notariat, Hausverwaltung, Bank); Kollegin oder Kollege aus der Branche; privat |
| `worte` | "Mit welchen drei Wörtern würden Sie Markus Leitner jemandem beschreiben, der ihn nicht kennt?" | "Mit welchen drei Wörtern würdest du Markus Leitner jemandem beschreiben, der ihn nicht kennt?" | drei kurze Felder |
| `satz` | "Wofür würden Sie Markus Leitner empfehlen?" | "Wofür würdest du Markus Leitner empfehlen?" | ein Satz |
| `moment` | "An welchen Moment mit ihm erinnern Sie sich?" | "An welchen Moment mit ihm erinnerst du dich?" | ein bis zwei Sätze, Hinweis "bitte ohne Namen anderer Personen" |

Die drei Fragen zum Sichtbaren folgen R3 (Kapitel 5, Punkt 9): wofür man ihn empfiehlt, Wörter für sein Auftreten, ein erinnerter Moment. `worte` ist das Fremdurteil zum Selbsturteil aus F16 ("Mit welchen drei Wörtern beschreiben Sie Ihre Arbeit?"), damit Selbst- und Fremdbild am selben Maß verglichen werden (Vazire 2010, SOKA, Selbst- gegen Fremdurteil: https://pubmed.ncbi.nlm.nih.gov/20085401/). Pronomen und Name kommen aus dem Makler-Profil. `api/wb-fremdbild.js` prüft jeden Text mit `hmAnonymPruefen` und verwirft Treffer mit einem Hinweis an die antwortende Person, bevor etwas gespeichert oder zugestellt wird.

**Wer was sieht** (Regel `hmFremdbildSicht`, Q18):

| Wer | Sieht | Ab wann |
|---|---|---|
| Team | jede Antwort einzeln mit `rolle` | sofort (Stufe A per Mail, Stufe B im Store) |
| Makler | `worte` als Häufigkeit; `satz` und `moment` wörtlich, in zufälliger Reihenfolge, ohne `rolle` | ab drei Antworten insgesamt |
| Makler | Aufschlüsselung nach `rolle` | nur für Rollen mit mindestens drei Antworten; kleinere Rollen gehen in "weitere" auf, und "weitere" erscheint erst ab drei |
| Schritte 4, 6, 7 | wie das Team, intern; in Texte an den Makler nur nach seiner Sicht | ab Eingang |

Damit wird ein einzelner Käufer oder Verkäufer über `rolle` zusammen mit `moment` nicht wiedererkennbar. Bleibt es unter drei Antworten, sieht der Makler nur "Noch zu wenige Antworten, um sie ohne Rückschluss zu zeigen."

### 3.8 Beispiel Markus Leitner (Döbling, Zinshaus, Figur Kenner, Sie-Form)

Die Figur Kenner kommt aus dem v1-Seed (`archetyp: ["kenner"]`). Im v2-Bogen gibt es keine Figur-Karte; sie steuert im Bogen nichts. Der Seed hat `anrede: "Sie, überall"`, daher Sie-Form in allen Beispielen. Die Fall-Karten lesen `vorab.fakten` feld `abschluesse` aus dem Dossier von 01 (8.2): Zinshaus, Sieveringer Straße, 1190, 4.200.000; Anlegerwohnung, Straße fehlt, 1180, 420.000, 62 m²; Art fehlt, Straße fehlt, 1130, 1.300.000, 140 m². Quelle ist die v1-Selbstauskunft, Sicherheit mittel; ein Bestand-Import liegt im Seed nicht vor. Die Zahlen zu Dauer und Abweichung stammen aus v1 `belege`, so wie er sie in die Karten schreiben würde.

**Eröffnung.** "Etwa 15 Minuten. Fünf kurze Kapitel." Workshop am Dienstag, 13. Oktober (01, 8.2). KI-Frage: *Annahme für das Beispiel:* Ja.

**F1 Bestätigen** (Vorschläge aus `vorab.fakten`, Werte aus dem Seed):

| Zeile | Vorbelegt | Quelle | Er tut |
|---|---|---|---|
| Gegenden, nach Bedeutung | 1190 Döbling, 1180 Währing, 1130 Hietzing | v1-Selbstauskunft laut 01; Anzahl je Bezirk nicht belegt, darum ohne Zahl | "Stimmt" oder Reihenfolge durch Antippen ändern |
| Kern-Grätzl | Sievering, zwischen Sieveringer Straße und Agnesgasse | v1 laut 01 | "Stimmt" |
| Objekte | Zinshaus, Anlegerwohnung, Eigentumswohnung Altbau, Denkmalschutz und Sanierung | Objekt-Art | "Stimmt" |
| Seit | 5 bis 10 Jahre | v1 laut 01 | "Stimmt" |

Jede Zeile wird einzeln bestätigt, es gibt keinen Knopf "Alles bestätigen" (Jäckle und Eckman). Liegen in `vorab.kundenstimmen` Bewertungen vor, erscheint je Stimme eine Zeile "Diese Bewertung ist über mich" mit Ja oder Nein; im Seed gibt es keine.

**F2 Seite.** "Denken Sie an Ihre letzten zehn Aufträge: Für wen haben Sie gearbeitet?" Keine Stufe vorgewählt. *Annahme für das Beispiel:* fast nur Eigentümer (v1 `seite` 25 von 100 zeigt in diese Richtung, die Abbildung ist Ableitung). Der Pfad nimmt die Eigentümer-Varianten.

**F3 Fälle, gesetzte Karte 1** (375 px, ohne Bild, weil im Seed keine Objektfotos liegen und die Rechte am Porträt offen sind):

```
|16|                                                 |16|
    Ihre letzten drei Abschlüsse.        32/34, ink
    Was gab jeweils den
    Ausschlag?
                                          24
    +-------------------------------------------+
    |  Sieveringer Straße                30/32  |  paper-2, Radius 14
    |  Zinshaus, 1190 Döbling            17/24  |  Innenrand 20
    |                                     8     |
    |  4,2 Mio., laut Ihren Angaben      15/20  |  muted, Tabellenziffern
    |                                    16     |
    |  [  Stimmt  ]  [ Korrigieren ]     44 hoch|
    |                             1 von 3 13/18 |
    +-------------------------------------------+
                                          24
    Was gab den Ausschlag?               17/24
    +-------------------------------------------+
    | Erbengemeinschaft kam über den Notar.     |  Feld, 3 Zeilen
    +-------------------------------------------+
    Wer, welche Lage, was entschied.     13/18, muted
    Bitte ohne Namen von Personen.
    Sie können auch diktieren, mit dem Mikrofon Ihrer Tastatur.
                                          24
    Wie lange von Vermarktungsbeginn bis Unterschrift?
    [ 11 ] Wochen           [ weiß ich nicht mehr ]
                                          16
    Kaufpreis im Vergleich zu Ihrer ersten Einschätzung
    [ darüber ]        [ wie eingeschätzt ]
    [ darunter ]       [ weiß ich nicht   ]
----------------------------------------------------------
    Ihre Fälle  ==  ====  ..  ..  ..      [   Weiter   ]
```

Karte 2 trägt als Titel "Währing" (Straße fehlt) und "Anlegerwohnung, 1180 Währing", Angaben "420.000, 62 m², laut Ihren Angaben". Karte 3 trägt "Hietzing", darunter das Auswahlfeld "Art wählen", weil die Art im Dossier fehlt (01: "Altbau" nicht eindeutig zuordenbar), Angaben "1,3 Mio., 140 m², laut Ihren Angaben".

| Fall | Ausschlag (seine Worte) | Dauer | Abweichung zur ersten Einschätzung | Stand nach der Regel |
|---|---|---|---|---|
| 1 Sieveringer Straße | "Erbengemeinschaft kam über den Notar." | 11 Wochen (aus v1 `belege`) | leer | Ort und Zahl da, Ausschlag fehlt: nur ein Weg |
| 2 Währing | "Bestandskunde." | leer | darüber, 8 Prozent (aus v1 `belege`) | Ort und Zahl da, Ausschlag fehlt: nur ein Weg |
| 3 Hietzing | "Diskretion war entscheidend." | leer | leer | Ort und Ausschlag da, keine belegtaugliche Zahl |

Kein Fall ist nach der ersten Runde belegfähig. Rang 1 des Budgets greift. Die Regel wählt den Fall, der mit einer Antwort belegfähig wird, und zieht einen fehlenden Ausschlag einer fehlenden Zahl vor. Zwischen Fall 1 und 2 entscheiden Kern-Objektart und Kern-Grätzl: Fall 1. Nachfrage: "Sie schrieben: 'Erbengemeinschaft kam über den Notar.' Das erklärt, wie der Auftrag kam. Was hat entschieden, dass man Sie beauftragt hat?" *Annahme für das Beispiel:* Er nennt einen Ausschlag; dann ist Fall 1 belegfähig. Fall 2 (Ausschlag) und Fall 3 (Dauer) gehen als offene Zeilen an Schritt 4.

Ehrliche Folge: Markus erreicht im Beispiel einen belegfähigen Fall, nicht zwei; E3 wäre bei ihm verfehlt. Genau hier trägt der Bestand-Import: Mit `eingang` und `abschluss` aus dem Import (01, D2) stünde bei Fall 3 eine gerechnete Dauer zum Bestätigen, und Fall 3 wäre ohne Nachfrage belegfähig (Ableitung).

Die Zerlegung erkennt in Fall 1 den Anlass Erbe, den Empfehler Notariat und den Kunden "Erbengemeinschaft", in Fall 2 den Empfehler frühere Kunden. Anlass und Empfehler erscheinen in F10 und F12 als Vorschlag, nicht vorgewählt. `kundeSatz` wird aus Fall 1 abgeleitet (D19): wert "Erbengemeinschaft kam über den Notar.", `quelle: "abgeleitet"`, `bezugFall: 1`. F11 erscheint deshalb nicht; die Lebenslage der Erben bleibt eine Lücke, die Schritt 5 mit seiner Nachholfrage oder Schritt 4 im Gespräch schließt.

**F4 Alternative.** "Beim Zinshaus Sieveringer Straße: Wen hätte die Erbengemeinschaft ohne Sie beauftragt?" *Annahme für das Beispiel:* ein großes Maklerbüro.

**F5 Was die Alternative nicht konnte.** "Was konnten Sie in diesem Fall, was ein großes Maklerbüro nicht gekonnt hätte?" Freitext. *Annahme für das Beispiel:* beantwortet, Wortlaut unbekannt; die Wirkungsliste zeigt deshalb unten keinen Block 4, um keinen Satz zu erfinden.

**F6 Abraten.** "Wann haben Sie zuletzt jemandem abgeraten, obwohl es Sie Provision gekostet hat? Was ist daraus geworden?" Seed-Antwort: "Einer Erbengemeinschaft geraten, zwei Jahre zu warten, statt unter Druck zu verkaufen. Sie kamen mit 600.000 mehr zurück." Situation, Zahl und Ergebnis sind da, keine Nachfrage.

**F7 Hindernis.** "Was hätte die Erbengemeinschaft fast davon abgehalten, Sie zu beauftragen?" Seed: Provision. Am Ende von Kapitel 2 prüft die Regel Rang 2 und 3: F6 braucht nichts, F5 ist beantwortet und nicht vage. Der zweite Platz bleibt frei.

**F8, F9 Leiter.** Kein Listen-Screen davor. Die Leiter startet am wörtlichen Ausschlag des Falls, der einen hat; bei mehreren am Kernfall. Für Markus ist das Fall 3: "Beim Verkauf in Hietzing schrieben Sie: 'Diskretion war entscheidend.' Was hatte die Verkäuferseite davon ganz konkret?" Danach: "Und warum war genau das wichtig?" Zwei Stufen, dann Schluss (R3 1.2: kurze Leitern im Bogen, volle im Workshop). Schritt 4 setzt an dieser Stelle an (04, Tabelle 4.2: "Merkmal am Anfang der Leiter" aus `antworten.gruende` und `antworten.leiter`). `antworten.gruende` entsteht ohne Frage aus den Ausschlägen: für Markus "Diskretion war entscheidend." (D14).

**F10, F12, F13.** Anlässe mit dem Vorschlag Erbe aus Fall 1 (Seed: Erbe, Investment, in v2 "Anlage neu ordnen"). Empfehler mit den Vorschlägen Notariat und frühere Kunden. Zugehörigkeit: "Bei welchen Menschen sind Sie einer von ihnen?" Seed: "Alteingesessene in Döbling, Väter im Ruderverein."

**F14 bis F19 Stimme.** Kanäle: LinkedIn und Instagram aktiv (vorbelegt aus `vorab.fakten` kanaele); *Annahme für das Beispiel:* Facebook, TikTok, YouTube "nutze ich nicht". Anrede: LinkedIn, Instagram, Website und E-Mail je "Sie"; `hmAnrede(mid, "website", { entwurf })` liefert "Sie" für die Proben. Drei Wörter über seine Arbeit: "genau, ruhig, verlässlich" (Seed). Vier Stimmproben wie in 3.5. *Annahme für das Beispiel:* keine Wahl bekannt, Werte `null`. Erfolge: "Beim Zinshaus Sieveringer Straße: Haben Sie diesen Verkauf öffentlich gemacht?" Der Seed hat nur v1 2 von 5; eine Antwort auf die neue Verhaltensfrage liegt nicht vor, die Umrechnung wäre Ableitung und wird nicht übernommen. Grenzen: Politik und Gesellschaft sowie Familie nie; Wohnort und Grätzl, Meinung zum Markt, Fehler zeigen (aus v1 `tabus` und `privat`, im Bogen neu gefragt).

**F20 bis F23 Rhythmus.** Formate (v1: talking, carousel, qa): *Annahme für das Beispiel:* diese drei gern, die übrigen offen. Zeit: 2 bis 4 Stunden. Fester Termin: "Dienstag nach dem Grundbuch-Termin, 11 Uhr" (`hmPfCue` erkennt Tag, Uhrzeit, Anker). Ziel: Investoren erreichen; `zielMerkmal` im Seed nicht vorhanden. Rang 4 des Budgets ist frei, die Regel fragt nach ("Woran würden Sie das in zwölf Monaten zählen?"). *Annahme für das Beispiel:* "weiß ich nicht mehr" beziehungsweise keine zählbare Größe; die Frage geht als offene Zeile in den Workshop.

**Abschluss für Markus, gesetzt bei 375 px** (von Regeln erzeugt, Rangfolge aus 3.4; Minuten und Rückfragen stammen im Betrieb aus der Messung, hier als Platzhalter):

```
|16|                                                 |16|
    Das wird aus Ihren                    32/34, ink
    Antworten.
    {Minuten} Minuten, drei Fälle,        15/20, muted
    zwei Rückfragen.
                                          40
    ----------------------------------------------- Haarlinie
    Sieveringer Straße,                   22/26, ink
    in 11 Wochen verkauft
                                           8
    Diesen Verkauf können Sie später      17/24, ink-2
    öffentlich zeigen. Bringen Sie dafür
    bitte eine Unterlage in den Workshop,
    die den Zeitraum zeigt.
    -----------------------------------------------
    Hietzing: "Diskretion war
    entscheidend."
    Im Workshop fragen wir weiter, warum
    das Ihren Kunden so wichtig war.
    Daraus entsteht das Versprechen
    Ihrer Marke.
    -----------------------------------------------
    Sie schrieben: "Einer
    Erbengemeinschaft geraten, zwei Jahre
    zu warten, statt unter Druck zu
    verkaufen."
    Wir prüfen, ob in Ihrer Gegend jemand
    anderer so etwas erzählen kann. Wenn
    nicht, kann Ihre Marke darauf bauen.
    -----------------------------------------------
    Sie, auf LinkedIn, Instagram, der
    Website und in E-Mails
    So spricht jeder Text Ihrer Marke die
    Menschen dort an.
    -----------------------------------------------
    Politik und Familie: nie
    Das kommt in keinem Text und keinem
    Bild vor.
    -----------------------------------------------
    Dienstag nach dem Grundbuch-Termin,
    11 Uhr
    Hier prüfen wir einen festen Platz für
    Ihre wiederkehrende Serie, damit sie in
    Ihre Woche passt, ohne sie umzubauen.
    -----------------------------------------------
    Facebook, TikTok und YouTube:
    nicht genutzt
    Dort planen wir nichts.
                                          40
    Das besprechen wir am 13. Oktober.    22/26
    Was beim Verkauf in Währing den       17/24
    Ausschlag gab.
    Wie lange der Verkauf in Hietzing
    gedauert hat.
    Woran Sie "Investoren erreichen" in
    zwölf Monaten zählen.
                                          40
    +-------------------------------------------+
    | Dürfen wir einen Link erzeugen, mit dem   |  dunkle Karte
    | Menschen, die Ihre Arbeit kennen, drei    |  Innenrand 20
    | kurze Fragen beantworten? Sie teilen ihn  |
    | selbst, wir erfahren keine Namen.         |
    | [ Ja ]   [ Nein ]   [ Später ]            |
    | Wenn nicht: Wie Sie auf andere wirken,    |
    | prüfen wir nur an dem, was Sie im         |
    | Workshop erzählen.                        |
    +-------------------------------------------+
                                          40
    Als Nächstes: drei Minuten mit Bildern,
    im selben Link.
    [ Weiter zu den Bildern ]   [ Später ]
```

Warum dieser Aufbau (Ableitung): Jeder Block beginnt mit einem Ort, einem Satz oder einer Zeit von ihm, gesetzt so groß wie später eine Kachel-Headline. Unsere Sätze stehen darunter, kleiner und in seiner Alltagssprache, und versprechen nie eine Gestaltung. Die offenen Punkte stehen sichtbar mit Datum, damit "nicht beantwortet" nicht nach Versäumnis aussieht, sondern nach Plan. Die Seite enthält keinen Namen einer anderen Person, kein fremdes Bild und keine Zahl, die er nicht selbst genannt hat.

### 3.9 Adaptive Führung und Streichliste

**Bedingungen** (deklarativ in `HM_FRAGEN_V2`, ausgewertet von `hmFragePfad`):

| Bedingung | Folge |
|---|---|
| `seite` Stufe 1 bis 3 | Eigentümer-Varianten von F3 (Abweichung zur ersten Einschätzung), F4, F6, F7, F10, F17, F18, F23 |
| `seite` Stufe 5 bis 7 | Käufer-Varianten: F3 Abweichung zum Angebotspreis; F4 "Ihr letzter Käufer: Wie hätte er ohne Sie gesucht?"; F6 "vom Kauf abgeraten"; F7, F10, F23 mit Käufer-Listen; F17 Käufer-Vorlagen; F18 "diesen Kauf" |
| `seite` Stufe 4 | die Seite von Fall 1 aus der Zerlegung entscheidet; ist sie unklar, Eigentümer-Variante |
| kein Fall-Text nennt einen Kunden (Regel und `FAELLE.kunde` leer) | F11 erscheint: "Beim {Fall 1}: Wer hat {verkauft oder gekauft}, in welcher Lebenslage? Ein Satz." Sonst wird `kundeSatz` abgeleitet (D19) |
| `alternative` "weiß ich nicht" | F5 entfällt; offene Zeile an `workshop.switch` |
| `abgeraten` "noch nie" | keine Nachfrage; `status: "nie"` |
| `abgeraten` "lieber im Workshop erzählen" | `status: "workshop"`; Schritt 4 übernimmt |
| kein Fall mit Ausschlag nach F3 | F8 und F9 entfallen; `leiter` mit `status: "workshop"` |
| F9 unbeantwortet oder "weiß ich nicht" | Leiter endet nach einer Stufe |
| `kanaele` | F15 zeigt nur Kanäle mit aktiv oder aufbauen, dazu "Website und E-Mail" |
| `vorab.fakten` Sicherheit niedrig, fehlt oder in `vorab.luecken` | die Bestätigungszeile wird zur offenen Frage ohne Vorbelegung |
| `vorab.fakten` abschluesse leer | F3 zeigt leere Karten mit Strukturhilfe "Objekt, Lage, wer, was den Ausschlag gab" |
| `dauerWochen` nicht gerechnet | Dauer als offene Zahl statt als Bestätigung |
| `vorab.kundenstimmen` leer | keine Zuordnungszeilen in F1 |
| `vorab.nachtraege` mit Wert zu einer offenen Fakt-Zeile | Vorschlag unter der Zeile, Sicherheit "niedrig", nicht vorgewählt |
| Zweck 3 "Fremdbild-Link" schon "nein" | kein Fremdbild-Teil im Abschluss |
| `kiAntworten` nicht "ja" | Nachfrage und Zerlegung nur über Vorlagen und Regeln |
| Nachfrage-Budget erschöpft | keine weitere Nachfrage, offene Zeile im Abschluss und Lücke an den Workshop |

**Pfad Käufer-Makler ohne Instagram, nur LinkedIn** (Probe für Leitfrage 6): F1, F2 (fast nur Käufer), F3 Käuferfälle mit Abweichung zum Angebotspreis, F4 Käufer-Variante, F5, F6 "vom Kauf abgeraten", F7 Käufer-Liste, F8, F9, F10 Käufer-Liste, F11 nur ohne Kunden im Fall-Text, F12, F13, F14 (LinkedIn aktiv, Rest nutze ich nicht), F15 nur LinkedIn und Website und E-Mail, F16, F17 Käufer-Vorlagen, F18 "diesen Kauf", F19, F20 ohne Plattformbegriffe, F21, F22, F23 mit Käufer-Zielen. Er sieht keine Eigentümer-Logik und keine Instagram-Frage.

**Streichliste** (wenn der Median nach fünf Maklern über 15 Minuten liegt, in dieser Reihenfolge; jede Frage wandert in den Workshop, nicht in den Papierkorb):
1. Nachfrage-Budget von 2 auf 1, nur noch Rang 1 (spart bis zu 30 Sekunden, kein Feld geht verloren).
2. F11 entfällt ganz; `kundeSatz` wird nur abgeleitet, sonst Lücke für die Nachholfrage von Schritt 5.
3. `unity` in den Workshop. Dann erzeugt 04 ein Zitat mit `thema: "zugehoerigkeit"`, und 06 und 12 lesen dieses Zitat statt `antworten.unity`; das Feld `antworten.unity` entfällt, nichts wird in den Namensraum `antworten` zurückgeschrieben. Dieser Wechsel braucht vorher die Zustimmung von 4, 6 und 12 und wird erst bei Bedarf beantragt.

### 3.10 Zeitbudget (Schätzung, Setzung)

**Eine Rechenregel für alle Freitexte** (Setzung, ersetzt durch `fragebogen.messung`): Dauer gleich Nachdenken plus erwartete Wörter mal 2 Sekunden (Tippen am Telefon, 30 Wörter je Minute, Setzung ohne Quelle). Nachdenken: 10 Sekunden bei einer kurzen Antwort, 15 Sekunden, wenn die Karte den Fall schon vor Augen stellt, 30 Sekunden, wenn er einen Fall erst suchen oder vergleichen muss. Erwartete Wörter aus dem Seed, wo vorhanden. Diese Regel erklärt die Unterschiede: Der Ausschlag je Fall ist eine kurze Antwort zu einem Fall, der auf der Karte steht (Seed: 1 bis 5 Wörter; erwartet 14 mit der Strukturhilfe "wer, welche Lage"), F5 und F6 verlangen einen Vergleich oder eine neue Geschichte (Seed `abgeraten`: 22 Wörter; erwartet 25 bis 28).

| Teil | Rechnung | Sekunden |
|---|---|---|
| Eröffnung | lesen 30, KI-Frage 10 | 40 |
| F1 Bestätigen, vier Zeilen | je 10 | 40 |
| F2 Seite | Auswahl | 10 |
| F3 Fälle, drei Karten | je Karte prüfen 5, Ausschlag 15 + 14 x 2 = 43, gerundet 45, Zahlen 15; zusammen 65 | 195 |
| F4 Alternative | Auswahl | 10 |
| F5 Was die Alternative nicht konnte | 30 + 25 x 2 | 80 |
| F6 Abraten | 30 + 28 x 2 = 86, gerundet | 85 |
| F7 Hindernis | Auswahl bis zwei | 15 |
| F8, F9 Leiter | je 10 + 10 x 2 | 60 |
| F10 Anlässe | Auswahl bis drei | 15 |
| F11 Kunde, nur wenn nötig | 10 + 12 x 2 = 34, gerundet 35; im Pfad von Markus 0 | 0 |
| F12 Empfehler | Auswahl bis drei | 15 |
| F13 Zugehörigkeit | 10 + 8 x 2 = 26, gerundet | 25 |
| F14 Kanäle | vorbelegt, bestätigen | 15 |
| F15 Anrede je Kanal | drei bis vier Zeilen | 15 |
| F16 Drei Wörter | 10 + 3 x 2 = 16, plus Feldwechsel | 20 |
| F17 Vier Stimmproben | je 15 | 60 |
| F18 Erfolge am Fall | Auswahl aus drei | 10 |
| F19 Grenzen, elf Zeilen plus Freitext | je 3 | 35 |
| F20 Formate, sechs Karten | je 4 | 25 |
| F21 Zeit | Auswahl | 5 |
| F22 Fester Termin | 10 + 8 x 2 = 26, gerundet | 25 |
| F23 Ziel und Merkmal | Auswahl 5, Merkmal 10 + 8 x 2 = 26 | 30 |
| vier Kapitelabschlüsse | je 5 | 20 |
| **Summe ohne Rückfragen, Pfad Markus** | | **850, etwa 14,2 Minuten** |
| mit F11 | | 885, etwa 14,8 Minuten |
| je Rückfrage | lesen 5, Antwort 5 + 10 x 2 = 25 | 30 |
| **Summe mit zwei Rückfragen, Pfad Markus** | | **910, etwa 15,2 Minuten** |
| ungünstigster Pfad (F11 und zwei Rückfragen) | | 945, etwa 15,8 Minuten |

Ehrliche Folge: Ohne Rückfragen liegt der Pflichtteil unter 15 Minuten, mit beiden Rückfragen knapp darüber. Deshalb sagt die Eröffnung "Etwa {minuten} Minuten" und dazu "Fragen wir einmal nach, kommt etwas Zeit dazu", statt eine glatte Zahl zu versprechen. Die Kapitelminuten (1, 6, 2, 3, 2) sind die gerundeten Summen ohne Rückfragen. Die Reserve ist gering; die Streichliste in 3.9 steht bereit, und ihr erster Punkt kostet kein Feld. Die Abschlussseite (etwa 1 bis 2 Minuten) läuft in `auftrag.dauer` unter "Fremdbild-Link teilen" (01, 3.6). Alle Werte ersetzt `fragebogen.messung` ab dem ersten Makler; nach fünf Maklern ersetzt der Median die Setzung im Register (`hmDauerMessen`, 01, 3.6).

---

## 4. Fragen an den Makler

Jede Frage hat ein Zielfeld; "Treibt" nennt nur Felder, deren Abnehmer das Quellfeld laut seinem Schrittdokument liest (Stand 30.09.2026) oder für die in 5.4 eine terminierte Bitte steht (markiert mit "Bitte"). Die Spalte "Tauschprobe" beschreibt, was sich ändert, wenn die Antwort anders ausfällt. Reihenfolge ist die sichtbare Reihenfolge im Eigentümer-Pfad. Nachbarn verweisen künftig auf den Key, nicht auf die Nummer (5.4), weil Nummern sich mit jeder Fassung verschieben.

| Nr. | Key | Wortlaut (Sie) | Typ | Treibt (Abnehmer) | Tauschprobe, Methode |
|---|---|---|---|---|---|
| F1 | `bezirke`, `graetzl`, `immotypen`, `seit` | "Stimmt das noch?" je Zeile | Bestätigen, Rang bis 3 | `einsicht.zielgruppe` (5); Kohorte und Ort-Territorium (6); `positionierung.fuerWen`, R1 (7, Bitte); Serien und Ortsbezug (12, Bitte); Workshop-Recall (4) | Anderes Grätzl, andere Orte in Zielgruppe, Territorium und Serien. Nur bestätigen, weil im Dossier |
| F2 | `seite` | "Denken Sie an Ihre letzten zehn Aufträge: Für wen haben Sie gearbeitet?" | 7 Stufen ohne Startwert | Pfad dieses Bogens; `einsicht.zielgruppe` und Eigentümer- oder Käuferfassung (5, 05 3.5); `positionierung.nichtFuer`, `fuerWen` (7, 07 Z. 363 und 410; feine Stufen als Bitte, D21) | Stufe 1 statt 3: Käufer stehen in `nichtFuer` statt als Nebengruppe in `fuerWen`. Stufe 3 statt 5: F3, F4, F6, F7, F10, F17, F18, F23, die Fassung in 5 und wen der Satz ausschließt (Liu und Conrad, kein Startwert) |
| F3 | `faelle` | "Ihre letzten drei Abschlüsse: Was gab jeweils den Ausschlag?" | 3 Karten: Fakten bestätigt, Ausschlag frei, Dauer und Abweichung als Zahl; Nachfrage Rang 1 | `beweise`, `positionierung.weil` (7, 07 Z. 159, 365, 407); `einsicht.stuetzen`, `zielgruppe` (5); Wahl der Leiter-Fälle (4); Anker `objekt` (6, Bitte) | Anderer Fall, anderer Beleg, anderes weil (Critical Incident: https://www.nngroup.com/articles/critical-incident-technique/) |
| F4 | `alternative` | "Beim {Fall 1}: Wen hätte {Kunde} ohne Sie beauftragt?" | eine Auswahl, 6 Optionen | `einsicht.konvention` (5); `positionierung.andersAls`, `nichtFuer` (7, 07 Z. 391) | Großbüro statt Privatverkauf verschiebt die Konvention, gegen die formuliert wird (Dunford) |
| F5 | `alternativeKonnte` | "Was konnten Sie in diesem Fall, was {Alternative} nicht gekonnt hätte?" | Text; Nachfrage Rang 3 | `positionierung.andersAls`, `weil` (7, 07 Z. 407); `einsicht.weisseStelle` (5); Anker `methode` (6, Bitte) | Andere Fähigkeit, andere weiße Stelle (Dunford: https://www.aprildunford.com/post/a-product-positioning-exercise) |
| F6 | `abgeraten` | "Wann haben Sie zuletzt jemandem abgeraten, obwohl es Sie Provision gekostet hat? Was ist daraus geworden?" | Text, "noch nie", "lieber im Workshop erzählen"; Nachfrage Rang 2 | `einsicht.weisseStelle` (5); `workshop.geschichte.abgeraten` (4), von dort `beweise` (7) und `story` (8); Anker `haltung` (6, Bitte); Gewicht der Säule Meinung (12, Bitte) | Mit Geschichte gibt es einen Wohlwollens-Beleg und ein Haltungs-Territorium, ohne keinen (R3 2) |
| F7 | `hindernis` | "Was hätte {Kunde} fast davon abgehalten, Sie zu beauftragen?" | bis 2 plus eigene Worte | `einsicht.spannung` (5); `saeulen[].frage` (12, 12 Z. 564) | Provision statt Preiszweifel ergibt eine andere Spannung und eine andere Säulen-Frage (Four Forces: https://jobstobedone.org/the-four-forces/) |
| F8 | `leiter[0]` | "Beim {Fall} schrieben Sie: '{Ausschlag}'. Was hatte {die Verkäuferseite} davon ganz konkret?" | kurzer Text | `werte`, `versprechen`, `markenvertrag.attribute` (7, 07 Z. 107, 366); Leiter-Anfang (4) | Der Nutzen bestimmt, in welche Richtung der Wert gesucht wird (Reynolds und Gutman: https://is.muni.cz/el/1456/jaro2013/MPH_MVPS/39278324/LadderingTheoy_original.pdf) |
| F9 | `leiter[1]` | "Und warum war genau das wichtig?" | kurzer Text | wie F8 | Der Wert am Ende der Leiter wird Grundlage für das Versprechen |
| F10 | `ausloeser` | "Mit welchem Anlass kamen Ihre letzten Kunden zu Ihnen?" | bis 3, Vorschläge aus F3, eigene Worte zählen | `einsicht.zielgruppe` (5); Staffelthema und Satz zum Weitergeben (12, 12 Z. 143, 244) | Erbe statt Familie wächst ergibt eine andere Zielgruppe und andere Staffeln |
| F11 | `kundeSatz` | "Beim {Fall 1}: Wer hat {verkauft}, in welcher Lebenslage? Ein Satz." Nur wenn kein Fall-Text einen Kunden nennt (D19) | Text | `einsicht.zielgruppe`, Stück Lebensphase (5, 05 Z. 135 und 279) | "Erben, die weit weg wohnen" statt "Paar, dessen Kinder ausgezogen sind" ändert die Lebensphase im Zielgruppenbild. Fallfrage statt "typischer Kunde" (Critical Incident, oben) |
| F12 | `empfehler` | "Woher kamen Ihre letzten Aufträge?" | bis 3, Vorschläge aus F3 | `einsicht.zielgruppe` (5); `kanalplan.rolle`, Kooperations-Konzept (12, 12 Z. 256, 266) | Notariat statt Portal verschiebt Gewicht zu LinkedIn und ändert das Kooperations-Konzept. Dass Empfehlung der häufigste Weg zum Makler ist, zeigen Zahlen aus den USA (NAR 2025 in der Auswertung von BAM, R5 1.6: https://nowbam.com/how-home-buyers-and-sellers-find-their-agents-in-2025/); die Übertragung auf Wien ist Ableitung, eine Wiener Erhebung fehlt (R5, Lücke 4) |
| F13 | `unity` | "Bei welchen Menschen sind Sie einer von ihnen?" | ein Satz | Anker `zugehoerigkeit` (6, 06 Z. 111 und 758, mit einem Zitat aus 4); eigenes Wort in Serien, Community-Konzept, Seriennamen (12, 12 Z. 120, 266, 391, 564) | "Alteingesessene in Döbling" statt "Eltern im Grätzl" ändert, ob Zugehörigkeit ein Territorium tragen kann, und das Community-Konzept |
| F14 | `kanaele` | "Wo sind Sie heute, wo wollen Sie sein?" | je Kanal aktiv, aufbauen, nutze ich nicht | `kanalplan` (12); Profilkopf im ersten Kanal (6, 06 5.2); Pfad für F15 | Ohne Instagram keine Instagram-Planung und keine Instagram-Frage |
| F15 | `anredeJeKanal` | "Wie sprechen Sie Menschen dort an?" | je sichtbarem Kanal plus "Website und E-Mail": Sie oder Du | `anrede` über `hmAnredeRegel` (8); Anrede der Rohskizzen (6); Versprechen (7) | Du statt Sie ändert jeden öffentlichen Text des Kanals, über die eine Funktion `hmAnrede` |
| F16 | `worte` | "Mit welchen drei Wörtern beschreiben Sie Ihre Arbeit?" | 3 kurze Felder | `persoenlichkeit` (7); V8 (8); Anschluss an das heutige Bild (6) | Andere Wörter, andere Persönlichkeit; der Abstand zum Fremdurteil in `fremdbild.worte` wird sichtbar (SOKA, Selbst- gegen Fremdurteil) |
| F17 | `stimmproben[4]` | Situation als Headline, zwei Sätze zur Wahl | 4 Paare binär, eigener Satz möglich | `stimme.regler` (8, 08 3.7) | Pol B statt A setzt den Regler von 25 auf 75 und damit `brief.tonprofil` (9) und die Schriftwahl (10) über Schritt 8 (NN/g: https://www.nngroup.com/articles/tone-of-voice-dimensions/) |
| F18 | `erfolge` | "Beim {Fall 1}: Haben Sie diesen Verkauf öffentlich gemacht?" | nein, nur auf Nachfrage, ja; Hinweis aus `vorab.auftrittHeute` | `stimme.ermessen` E1 (8, 08 Z. 306 und 509); `markenvertrag.stimmeRichtung` (7, 07 Z. 390) | Verbindliche Abbildung in D18: nein ergibt E1 "Erfolge leise", nur auf Nachfrage "Erfolge als Antwort", ja "Erfolge mit Zahl". Verhalten am Fall statt Selbsteinschätzung |
| F19 | `grenzen`, `grenzenFrei` | "Was darf sichtbar sein, was nie?" | 11 Themen zeigen oder nie, eigener Text | V5 (8); `falschWaere` (7); harter Auslöser 3 (6); Bildgrenzen (3); `bild.vermeiden` (11); Sprachprüfung (12) | "Familie nie" streicht Motive, Beiträge und Territorien |
| F20 | `formate` | "Welche Formate machen Sie gern, welche gehen, welche nie?" | 6 Karten gern, geht, nie | `formatmix`, `serien` (12); Serienidee (6); `fotobrief` (11) | "Talking Head nie" entfernt das Format aus Serien und Fotobrief |
| F21 | `zeit` | "Wie viel Zeit können Sie im Monat fest einplanen, Dreh und Freigabe eingerechnet?" | eine Auswahl, 4 | `formatmix`, Rhythmus (12); Umsetzbarkeit der Serienidee (6) | Weniger Zeit, weniger Beiträge und andere Formate |
| F22 | `cue` | "Welcher feste Termin in Ihrer Woche ist schon da, an den 30 Minuten anschließen könnten?" | Text | `serieSignatur`, Rhythmus (12) | Anderer Anker, anderer Serientag. Anschluss an einen bestehenden Termin statt eines neuen ist Ableitung, ohne Studienbeleg |
| F23 | `ziel`, `zielMerkmal` | "Was soll sich durch Ihre Marke in zwölf Monaten geändert haben?" und "Woran würden Sie das zählen?" | eine Auswahl plus ein Satz; Nachfrage Rang 4 | `markenvertrag.erfolgsmass` (7, 07 Z. 371); `kanalplan.rolle` (12); `wirkung` (17 über die Quelle) | Anderes Ziel, anderes Erfolgsmaß, an dem die Wirkung gemessen wird |
| Ende | Einwilligung Zweck 3, `fremdbild` | Ja, Nein, Später; bei Ja Link teilen, drei Fragen an Dritte (3.7) | optional | `persoenlichkeit` (7); Anschluss (6); Klärungen im Workshop (4) | Ein anderes Fremdbild ändert die Persönlichkeitsprüfung in Schritt 7; ohne Ja wird sie nur gegen den Workshop geprüft (01, Tabelle der Einwilligungen) |

Nicht gezählt, weil ohne Wirkung auf die Marke: das optionale Feld "War eine Frage überflüssig?". Es treibt nur `fragebogen.messung.rueckmeldung` und Schritt 17 `lernen`. Die KI-Frage der Eröffnung ist eine Einwilligung, keine Frage zur Marke; sie treibt `hmKiErlaubt`.

**Zählung.** 23 Fragen mit Zielfeld (F1 bis F23), davon eine bedingt (F11). Sichtbar sind 27 Screens im Pfad von Markus, 28 mit F11 (F3 drei Karten, F17 vier Proben), gegenüber 44 Pflicht-Screens in v1 (D12).

**Hinweistexte ohne unbelegte Zahlen und Namen.** Die v1-Hilfetexte mit Studiennamen (Cialdini, Gollwitzer, Connelly und Ones, Napoli, McAdams, Mayer, Aronson) und "rund 80 Prozent" Du-Wunsch auf Instagram (`wb-data.jsx` Zeile 170) entfallen; sie sind nicht geprüft (FRAGEN_WIRKUNG_IST Befund 11). Auch dieses Dokument nennt keinen dieser Namen als Beleg.

### 4.1 Abgeleitet statt gefragt

| Größe | Quelle | Umgang im Bogen |
|---|---|---|
| Gegenden mit Rang, Kern-Grätzl, Objektarten, seit wann | `vorab.fakten` | bestätigen (F1) |
| Objekt, Straße ohne Hausnummer, Postleitzahl, Monat, Preis, Fläche der letzten drei Abschlüsse | `vorab.fakten` feld `abschluesse` (01, D8) | in den Fall-Karten bestätigen (F3); `preis` nie als Beleg |
| Vermarktungsdauer | `dauerWochen` im selben Eintrag, gerechnet von `hmAbschluesse` aus `eingang` und `abschluss` des Imports (01, D2; Bitte an 1, D5) | bestätigen, sonst offene Zahl (F3) |
| Anteil der Abschlüsse im Grätzl | `vorab.kennzahlen.graetzlAnteil` | nicht gefragt |
| Abschlüsse im Jahr | `vorab.kennzahlen.verkauft12m` | nicht gefragt; Schritt 7 liest es für den Beleg "Abschlüsse im Jahr" (Bitte an 7) |
| Objektfluss je Monat, Preisband | `vorab.kennzahlen` | nicht gefragt, Schritt 12 liest es direkt |
| Kanäle heute | `vorab.fakten` kanaele, mit `hinweis` | "aktiv" oder "aufbauen" vorbelegt in F14 |
| Follower | `vorab.auftrittHeute` (nur intern) | nicht gefragt |
| Was schon existiert, altes Logo | `vorab.material`, `vorab.logoAlt` | nicht gefragt; Urteil in Schritt 3 |
| Kundenstimmen | `vorab.kundenstimmen` | nur Zuordnung bestätigen (F1), dann Teil von `fremdbild` |
| Anlass und Empfehler der Fälle | Zerlegung von F3 | als Vorschläge in F10 und F12 |
| Kunde der Fälle | Zerlegung von F3, wörtlich | `kundeSatz` abgeleitet, F11 nur ohne Treffer (D19) |
| Wahlgründe | Ausschläge aus F3 | `antworten.gruende` ohne eigene Frage (D14) |
| Anrede heute | `vorab.auftrittHeute` Bio | Hinweis in F15, nicht vorgewählt |
| Verkaufsbeiträge heute | Zählung des Teams in `vorab.auftrittHeute` | Hinweis in F18, nicht vorgewählt |

### 4.2 Was aus v1 wird

| v1-Key | v2 | Grund |
|---|---|---|
| seit, immotypen, bezirke, graetzl | F1 bestätigen | im Bestand (Befund 2) |
| immotypen_frei, bezirke_frei | entfällt | Korrektur direkt in F1 |
| graetzl_anteil | `vorab.kennzahlen.graetzlAnteil` | rechenbar |
| abschluesse | F3 `faelle` auf `vorab.fakten` abschluesse | Fakten aus dem Dossier, Ausschlag und Zahlen am selben Fall |
| belege | F3 Zahlenfelder, `vorab.kennzahlen.verkauft12m` und `workshop.geschichte.belege` | doppelt zu abschluesse (Befund 5); Zahl und Ausschlag gehören an denselben Fall |
| gruende, gruende_frei | abgeleitet aus den Ausschlägen, Leiter F8 und F9 | Selbsteinschätzung per Liste misst Erwünschtheit (A1); "Empfehlung von Bekannten" wandert nach F12 |
| hindernis | F7 | an Fall 1 gebunden |
| ausloeser, ausloeser_frei | F10 | eigene Worte zählen als Anlass (Befund 6) |
| herkunft, aufgewachsen, wendepunkt, fehler | Schritt 4 `workshop.geschichte` | Tiefe im Gespräch |
| abgeraten | F6 | im ersten Drittel statt optional am Ende (Befund 1) |
| kundensatz | `vorab.kundenstimmen` und `fremdbild` | echte Stimmen statt Erinnerung (R3 1.9) |
| phasen_frei | `kundeSatz`, aus dem Fall abgeleitet oder F11 am Fall | war der beste Zielgruppensatz und wirkte nicht (Befund 6); jetzt am Fall statt als Verallgemeinerung |
| milieus, phasen, gefuehl | entfällt | Zielgruppe entsteht aus Fällen, Anlässen, Ort |
| unity | F13 | ein Erzeuger, kurze Frage; 06 und 12 lesen das Feld |
| seite | F2 | sieben Stufen statt Regler mit Startwert 50 |
| s1 bis s5 | F17 Stimmproben | A6 |
| archetyp | entfällt | Selbstzuordnung überstimmte alles (Befund 4) |
| bildpaare, behalten | Schritt 3 | |
| werte | aus Leiter und Workshop | Liste von zehn Werten war erwünscht klingende Selbsteinschätzung |
| worte | F16, als Selbstbild der Arbeit | Gegenstück zum Fremdurteil |
| ideal | entfällt | doppelt zu ziel (Befund 5) |
| erfolge | F18, Verhalten am Fall 1 | Selbsteinschätzung auf einer Skala ersetzt (D18) |
| fokus | entfällt | doppelt zu ziel |
| privat, tabus, tabus_frei | F19 `grenzen`, `grenzenFrei` | eine Liste ohne Widerspruch |
| anrede | F15 `anredeJeKanal` | je Kanal statt Pauschalwahl |
| bestand, follower, vorbilder | entfällt | im Dossier oder ohne Wirkung; Vorbilder würden fixieren (Jansson und Smith: https://www.sciencedirect.com/science/article/abs/pii/0142694X9190003F) |
| assets | entfällt | das Zeichen ist Arbeit des Teams in Schritt 9 |
| sichtbar, sichtbar_frei, kamera | F20 `formate` und `workshop.probedreh` | Verhalten vor der Kamera wird im Probedreh gemessen |
| zeit, cue | F21, F22 | |
| formate | F20 | drei Zustände |
| kanaele | F14 | mit "nutze ich nicht", ohne Zwangsrangfolge (Befund 7) |
| ziel, ziel_frei | F23 | das Merkmal wird Erfolgsmaß |
| verfuegbar | entfällt | Terminplanung (R3 2) |
| fremdbild | Link (3.7) | keine Kontaktdaten Dritter (Befund 10) |

---

## 5. Eingang und Ausgang

### 5.1 Eingang

| Von | Feld | Nutzung |
|---|---|---|
| 1 | `vorab.fakten` | Vorbelegung "Stimmt das noch?" für bezirke, graetzl, immotypen, seit, kanaele (mit `hinweis`); feld `abschluesse` für die Fall-Karten in F3 (01 D8, Struktur `{objekt, ort, plz, preis, flaeche, datum}`, mit `dauerWochen` nach D5) |
| 1 | `vorab.kennzahlen` | nicht gefragt; `verkauft12m` entscheidet, ob drei Karten vorbelegt werden können |
| 1 | `vorab.luecken` | jede Lücke wird eine offene Frage ohne Vorbelegung (Q3); Zustand ohne Bestand |
| 1 | `vorab.nachtraege` | Werte aus einem späten Ja zu Zweck 1 (01 D13): unter einer noch nicht beantworteten Fakt-Zeile als Vorschlag mit Sicherheit "niedrig", nicht vorgewählt; bestätigte Zeilen bleiben |
| 1 | `vorab.kundenstimmen` | Zuordnung bestätigen in F1, danach Teil von `fremdbild` (D2) |
| 1 | `vorab.auftrittHeute` | Hinweis zur heutigen Anrede in F15; Zählung der Verkaufsbeiträge für den Hinweis in F18 |
| 1 | `vorab.material` | optional eigenes Objektfoto auf Fall-Karte und Abschluss, nur mit Rechten "geklärt" (3.2) |
| 1 | `auftrag.dauer` | `{minuten}` in der Eröffnung |
| 1 | `auftrag.einwilligungen` | Zweck 3 "Fremdbild-Link": gelesen und im Abschluss gefragt (01 D3); Eintrag `kiAntworten`: auf der Eröffnung gefragt und gelesen (D15) |
| 1 | `auftrag.termine` | Workshop-Datum in Eröffnung und Abschluss (D6) |

### 5.2 Ausgang

| Feld | Aufbau | Abnehmer (laut deren Eingang) |
|---|---|---|
| `fragen[]` | `{key, kapitel, typ, text {sie, du}, varianten, treibt[], bedingung, nachfrage {erlaubt, rang, ausloeser[]}, dauerSek, methode}`; statisch in `HM_FRAGEN_V2` mit `fragenVersion` | Selbsttest, Wirkungsliste, `dossier()`, 17 `lernen` |
| `antworten.<key>` | `{wert, quelle, status, dauerSek, nachfrage, notizTeam}`; quelle "makler", "vorab bestätigt", "vorab korrigiert" oder "abgeleitet"; status "beantwortet", "uebersprungen", "nie", "workshop"; nachfrage `{frage, antwort, fehlt, rang, von "claude" oder "regel"}` oder `null` | 4 bis 8, 12 |
| `antworten.faelle` | `wert[3] {nr, objekt, ort, plz, datum, preis, flaeche, dauerWochen {wert, quelle "bestand gerechnet" oder "makler"}, abweichung {richtung, prozent, bezug "ersteEinschaetzung" oder "angebotspreis"}, ausschlag wörtlich, belegKandidat, bild {material-Id} oder null, struktur {anlass, empfehler, kunde, ausschlagKern, seite, luecken[]}}`; `objekt` bis `flaeche` mit denselben Namen wie `vorab.fakten` abschluesse | 4, 5, 7; 6 (Bitte) |
| `antworten.alternative`, `alternativeKonnte` | Auswahl, Text | 5, 7; `alternativeKonnte` auch 6 (Bitte) |
| `antworten.abgeraten` | Text oder status "nie" oder "workshop" | 4, 5; 6 und 12 (Bitte) |
| `antworten.gruende` | Ausschläge der Fälle wörtlich, quelle "abgeleitet" (D14) | 4, 7 |
| `antworten.leiter[2]` | `{fall, frage, antwort}` je Stufe | 4, 7 |
| `antworten.hindernis`, `ausloeser` | bis 2 und bis 3, eigene Worte als eigener Eintrag | 5, 12 |
| `antworten.seite` | Stufe 1 bis 7 oder `null` | 5, 7 |
| `antworten.kundeSatz` | Text; quelle "makler" (F11) oder "abgeleitet" mit `bezugFall` (D19) | 5 |
| `antworten.unity` | ein Satz, quelle "makler" | 6, 12 |
| `antworten.empfehler` | Liste | 5, 12 |
| `antworten.stimmproben[4]` | `{probe, regler "ernst", "persoenlich", "begeistert" oder "sachlich", wahl "a", "b" oder null, wert 25, 75 oder null, links "a" oder "b", eigenerSatz, vorlageVersion}` | 8 |
| `antworten.worte` | drei Wörter, Selbstbild der Arbeit | 6, 7, 8 |
| `antworten.erfolge` | `{wert "nie", "nachfrage" oder "offen", fall 1, e1 nach D18}` | 7, 8 |
| `antworten.grenzen`, `grenzenFrei` | `{thema: "zeigen" oder "nie"}`, Text | 3, 6, 7, 8, 11, 12 |
| `antworten.anredeJeKanal` | `{kanal: "Sie" oder "Du"}` einschließlich `website` ("Website und E-Mail") | 6, 7, 8 (über `hmAnredeRegel`) |
| `antworten.formate` | `{format: "gern", "geht" oder "nie"}` | 6, 11, 12 |
| `antworten.kanaele` | `{kanal: "aktiv", "aufbauen" oder "nein"}` | 6, 12 |
| `antworten.zeit`, `cue`, `ziel`, `zielMerkmal` | Auswahl, Text, Auswahl, Satz | `zeit` 6, 12; `cue` 12; `ziel`, `zielMerkmal` 7, 12 |
| `antworten.bezirke`, `graetzl`, `immotypen`, `seit` | wie vorbelegt, quelle "vorab bestätigt" oder "vorab korrigiert", dazu `vorabVersion` (01, D9) | 4, 5, 6; 7 und 12 (Bitte) |
| `fremdbild` | `{link, antworten[] {rolle, worte, satz, moment, form "sie" oder "du", quelle "link" oder "vorab.kundenstimmen[i]", datum}}`; Sicht nach 3.7 | 4, 6, 7 |
| Einträge in `auftrag.einwilligungen` | Status für Zweck 3 (01 D3) und `kiAntworten` (D15), im Format von 01 mit `gefragtIn: "link"` | Erzeuger der Liste bleibt 1; lesen 2, 4, 6, 7 wie in 01 |
| `fragebogen.messung` | `{fragenVersion, start, ende, sitzungen, geraet, jeFrage {key: {dauerSek, woerter, nachfrage, vorabKorrigiert}}, abbruch {key, zeit} oder null, rueckmeldung}` | 17 `lernen`; nicht blockierender Rückfluss an 1 über `hmDauerMessen` (01, 3.6; D16) |
| `fragebogen.vorbereitung` | `{verkaufsbeitraege {n, von 12}, bildzuordnung[] {fall, material-Id}}`, Team-Eingabe in Phase 0 | nur intern in diesem Schritt (Hinweis F18, Bild der Fall-Karte) |

Entfallen und verlegt wie im Vertrag; die vollständige Abbildung aller v1-Keys steht in 4.2.

### 5.3 Abweichungen vom Vertrag, begründet

| Nr. | Abweichung | Begründung |
|---|---|---|
| D1 | `antworten.<key>` bekommt `status` und `notizTeam` | "Übersprungen bleibt übersprungen" (R3 Prinzip 5): noch nie, später im Workshop und übersprungen sind drei verschiedene Befunde; heute macht `(a.seite \|\| 50)` aus 0 eine 50 (Befund 9). `notizTeam` hält Team-Beobachtungen getrennt von seinen Worten. |
| D2 | `vorab.kundenstimmen` ist kein Vorschlag für `kundeSatz` | `kundeSatz` beschreibt den Kunden (Zielgruppe), eine Kundenstimme ist ein Satz über den Makler (Fremdbild). Eine Bewertung als Vorschlag würde die Zielgruppe aus einem Satz über ihn bilden. Deshalb Zuordnung in F1, dann als `fremdbild.antworten[]` mit Verweis auf die Quelle. Bitte an die Zerlegung: Formulierung der Eingangsliste anpassen. |
| D3 | `abgeraten` hat neben "noch nie" die Option "lieber im Workshop erzählen" | Wer eine heikle Geschichte nicht tippen will, soll nicht "noch nie" wählen müssen. |
| D4 | Nachfrage-Budget: höchstens eine je Frage, höchstens zwei je Bogen, feste Rangfolge F3, F6, F5, `zielMerkmal` (3.4) | Zwei halten den Pflichtteil nahe 15 Minuten (3.10). Die Rangfolge folgt dem Schaden, den eine vage Antwort anrichtet, und dem, was der Workshop auffangen kann. |
| D5 | **Abschlüsse genau unter `vorab.fakten` feld `abschluesse`**, mit der Struktur aus 01 D8 `{objekt, ort, plz, preis, flaeche, datum}` und denselben Namen in `antworten.faelle`; dazu `dauerWochen` im selben Eintrag | Ein Feld, eine Struktur, ein Erzeuger (Schritt 1). `dauerWochen` gibt es in 01 noch nicht; es wird von `hmAbschluesse` aus `eingang` und `abschluss` des Imports gerechnet (01, D2), wenn beide vorliegen, sonst `null` (Bitte an 1). `preis` ist das Import-Feld, dessen Art (Angebot oder Kauf) der Import nicht unterscheidet; deshalb wird er gezeigt, aber nie als Beleg gezählt (Q16). Das Feld `vorab.letzteAbschluesse` der dritten Fassung und die Namen `strasse`, `bezirk`, `monat`, `preisImport` entfallen. |
| D6 | Eingang zusätzlich `auftrag.termine`, `vorab.auftrittHeute`, `vorab.luecken`, `vorab.nachtraege` und optional `vorab.material` | Termin für die ehrliche Ankündigung, heutige Anrede und Verkaufsbeiträge als Hinweis, Lücken als offene Fragen, eigene Objektfotos für das Gefühl "meine Fälle". Alle sind Ausgänge von Schritt 1, der 2 als Nachfolger führt; 01 5.4 fragt `vorab.luecken` und `vorab.auftrittHeute` ausdrücklich an. |
| D7 | Bitten an die Nachbarn, ihre Eingangslisten zu ergänzen | Einzeln und terminiert in 5.4; ohne sie hätten einige Zielfelder keinen ausdrücklichen Leser. |
| D8 | Stimmproben nach 08, 3.7: vier Paare ernst, persönlich, begeistert, sachlich, binär 25 oder 75 | Keine Abweichung gegenüber Schritt 8. Gegenüber dem Vertragswortlaut "entlang der NN/g-Dimensionen" ist es die Präzisierung, die Schritt 8 als A4 führt: respektvoll gegen pointiert wird Regel V7, an ihre Stelle tritt Gefühl gegen Beleg, begeistert und sachlich sind getrennte Paare. |
| D9 | `fremdbild.antworten[]` bekommt `moment`, `form`, `quelle` und `datum` | `moment` ist die dritte Frage zum Sichtbaren nach R3; `form` hält fest, in welcher Anrede gefragt wurde; `quelle` trennt Link-Antworten von bestätigten Bewertungen. Nie Namen oder Kontaktdaten. |
| D10 | Wie die Werkbank den Makler anspricht (Du oder Sie) | Fragetexte liegen in beiden Formen vor (`text.sie`, `text.du`); die Wahl ist eine Einstellung der Oberfläche und kein Teil der Markenregel `anrede` aus Schritt 8. Entscheidung beim Owner (Zerlegung 7.1). |
| D11 | Vertragserlebnis "Sprechen statt Tippen bei Geschichten" wird zu "Diktat über die Tastatur als Hinweis" | A7: Das Anbieten von Sprache senkte die Antwortquote, und eigene Aufnahmen über die Web Speech API schicken Audio an einen Dienst im Netz. Das Diktat der Telefontastatur gibt ihm das Sprechen ohne eigenen Audioweg der Werkbank. |
| D12 | "Rund 21 Fragen" | Gezählt werden Fragen mit Zielfeld: 23 (F1 bis F23), eine davon bedingt. Sichtbar sind 27 oder 28 Screens, weil F3 drei Fall-Karten und F17 vier Proben hat. Gegenüber 44 Pflicht-Screens in v1 fallen 16 bis 17 weg. |
| D13 | `unity` als kurze Frage F13 im Bogen, ein Erzeuger | 06 (Anker `zugehoerigkeit`) und 12 (Serien, Community-Konzept, Seriennamen) lesen `antworten.unity`; 04 erzeugt dazu nichts. Die Vorfassung ließ 04 den Wert in `antworten` zurückschreiben; das verletzt "ein Feld, ein Erzeuger" und hing an einer Frage, die 04 nicht stellt. Mit einem Satz und 25 Sekunden ist die Frage billig; das Zitat, das 06 zusätzlich verlangt, kann im Workshop entstehen, ohne dass 04 ein Feld von 2 schreibt. Der Weg über ein Workshop-Zitat bleibt als dritter Punkt der Streichliste (3.9) vorbereitet. |
| D14 | `antworten.gruende` ohne eigene Frage | Die Listenfrage war die letzte Selbsteinschätzung per Liste (A1). Die Ausschläge der Fälle sind derselbe Stoff, fallbasiert und in seinen Worten; die Leiter F8 und F9 startet direkt daran. Schritt 4 und 7 lesen `gruende` weiter; Schritt 5 liest es bewusst nicht (05 Z. 299). |
| D15 | KI-Verarbeitung der Antworten wird auf der Eröffnung gefragt (Ja, Nein, Später, nichts vorgewählt, mit Satz "Wenn nicht: ...") und als Eintrag `zweck: "kiAntworten"` im Format von 01 in `auftrag.einwilligungen` gespeichert | Fall-Texte beschreiben Dritte (etwa eine Erbengemeinschaft). Die sechs Zwecke aus 01 (profile, workshopAufzeichnung, fremdbild, objektfotos, revealAufzeichnung, drehtagGespraech) decken das nicht. Gefragt wird dort, wo es anfällt, wie 01 die Staffelung begründet (01 3.2, "Warum nur zwei Einwilligungen im Gespräch"). Ohne Ja gilt in Schritt 2 nur der Regelpfad. Damit der Selbsttest von 01 den Zweck kennt, bittet 2 um den siebten Eintrag in `HM_EINWILLIGUNGEN` (5.4); bis dahin schreibt 2 den Eintrag in derselben Struktur. Ob der Zweck auch spätere Nutzung in `dossier()` abdeckt, entscheidet die Zerlegung. |
| D16 | `fragebogen.messung` fließt an 1 `auftrag.dauer` zurück | Nicht blockierender Rückfluss über `hmDauerMessen` (01, 3.6): Schritt 1 wartet nie auf Schritt 2 und führt 2 nicht als Vorgänger; die Vorgänger- und Nachfolgerlisten bleiben symmetrisch. |
| D17 | Seed je Teil statt globaler Anhebung | Schritt 1, 2 und 16 wollen den Seed ändern; ein gemeinsames `unio_hm_seed_v10` mit verschiedenem Inhalt würde kollidieren. Vorschlag: `hmSeedTeil(teil, version, fn)` mit Schlüssel `unio_hm_seed2_<teil>`; `HM_SEED_FLAG` v9 bleibt für v1. Bitte an die Zerlegung (8.3). |
| D18 | `erfolge` als Verhalten am Fall 1 in drei Stufen statt "Umgang mit eigenen Erfolgen in sieben Stufen"; **verbindliche Abbildung auf 08 E1** | Leitfrage 2: Verhalten an einem vergangenen Fall statt Selbsteinschätzung. Von sieben Stufen hätten nur drei Bereiche gewirkt. Abbildung: "nie" ergibt E1 "Erfolge leise" (Erfolg nur aus Sicht der Kunden, ohne Ich-Satz und ohne Wertung; so wie das Beispiel in 08 Z. 509); "nachfrage" ergibt E1 "Erfolge als Antwort" (Zahl im Ich-Satz nur in Antworten, Fragen-Beiträgen und im Beleg-Karussell, nie als Aufmacher); "offen" ergibt E1 "Erfolge mit Zahl" (eigener Abschluss-Beitrag erlaubt, Zahl mit Beleg, ohne Wertungswörter). Die Tabelle liegt als `HM_V2_ERFOLGE_E1` in `wb-fragen.jsx`; 8 liest sie, statt eine eigene Umrechnung zu bauen. Für Code, der eine Stufe 1 bis 7 erwartet, gilt übergangsweise nie 2, nachfrage 4, offen 6 (Setzung). |
| D19 | `kundeSatz` am Fall: abgeleitet, wenn ein Fall-Text einen Kunden nennt, sonst F11 als Fallfrage | Leitfrage 2 und Zeitbudget. Der Kundenteil wird wörtlich übernommen (`quelle: "abgeleitet"`, `bezugFall`), nie umformuliert. Fehlt die Lebenslage danach, bleibt sie eine Lücke; Schritt 5 hat dafür die Nachholfrage (05 4.2). |
| D20 | Fremdbild-Einwilligung im Abschluss des Bogens, nicht vorausgesetzt | 01 D3 weist die Frage Schritt 2 zu. Die Vorfassung zeigte den Fremdbild-Teil nur bei schon vorhandenem Ja; so wäre er nie erschienen. |
| D21 | `seite` in sieben Stufen: Abnehmer 5 (Fassung) und 7 (`nichtFuer`, `fuerWen`); Schritt 3 ist kein Abnehmer (03, Abweichung 2) | Im Bogen und in 5 wirken drei Bereiche (1 bis 3, 4, 5 bis 7). Die feine Stufe liest 7, nach Bitte in 5.4: Stufe 1 bis 2 schreibt die Gegenseite in `nichtFuer` ("Käufer auf Wohnungssuche"), Stufe 3 nennt sie als Nebengruppe in `fuerWen` ("Käufer der eigenen Objekte") und schließt sie nicht aus; spiegelbildlich 5 bis 7. Tauschprobe Stufe 1 gegen 3: ein anderer Ausschluss im Positionierungssatz. Zwischen Stufe 1 und 2 (und 6 und 7) wirkt heute nichts; diese Feinheit bleibt als Setzung des Vertrags mit Messplan: Nach zehn Maklern prüft Schritt 17 `lernen`, ob Stufe 2 und 6 gewählt werden und ob ein Abnehmer sie liest; wenn nicht, wird auf fünf Stufen verdichtet. |

### 5.4 Bitten an die Nachbarn

Termin für alle Bitten: Dienstag, 07.10.2026 (Setzung), damit Q1 vor Baubeginn grün werden kann. Verantwortlich ist jeweils, wer das Schrittdokument des Nachbarn führt; die Zerlegung trägt die Annahme ein, der Owner nimmt ab. Bis dahin zeigt Q1 die betroffenen Felder gelb mit Termin; nach dem Termin rot.

| Schritt | Bitte | Grund | Verantwortlich, Termin |
|---|---|---|---|
| 1 | `hmAbschluesse` ergänzt `dauerWochen` je Eintrag von `vorab.fakten` abschluesse, gerechnet aus `eingang` und `abschluss` (D5); `HM_EINWILLIGUNGEN` um Zweck 7 `kiAntworten` ("gefragt: Eröffnung des Fragebogens", Satz und "Wenn nicht"-Satz aus 3.2) ergänzen (D15). Erledigt, keine Bitte mehr: Rückfluss aus der Messung (`hmDauerMessen`, 01 3.6); Fremdbild-Einwilligung im Fragebogen (01 D3, hier D20); Eingang `vorab.luecken`, `vorab.auftrittHeute` und `vorab.nachtraege` (D6, 5.1); Hinweis ruhender Konten in F14 (in 01 5.4 noch als "F22" geführt, gemeint ist `kanaele`) | Beleg-Kette, Datenschutz | Verfasser 01, 07.10.2026 |
| 4 | `hmWorkshopLeitfaden` lässt Keys mit `status: "beantwortet"` aus (Q9) und übernimmt `status: "workshop"`; `unity` wird nicht erneut gefragt, ein Satz zur Zugehörigkeit darf als Zitat entstehen (für den Anker in 6) | keine Doppelung | Verfasser 04, 07.10.2026 |
| 6 | Eingang ergänzen um `antworten.faelle`, `alternativeKonnte`, `abgeraten` (die Anker-Tabelle liest sie schon, 06 Z. 104 bis 111, 718); Verweis "F17 `unity`" in der Stofftabelle von Markus (06 Z. 352) auf den Key ändern | Eingangsliste deckt die Nutzung nicht | Verfasser 06, 07.10.2026 |
| 7 | `beweise` `b2`, `b3` aus `antworten.faelle[].dauerWochen` und `abweichung` bauen, `b5` aus `vorab.kennzahlen.verkauft12m`, statt aus dem v1-Key `antworten.belege` (07 Z. 231 bis 234); `nichtFuer` und `fuerWen` nach den Stufen von `seite` wie in D21; Eingang um `bezirke`, `graetzl`, `immotypen` ergänzen (07 Z. 363, 468); `hmAnrede` in `wb-vertrag.jsx` nimmt `opt.entwurf` an und liest ihn, solange `marke2[mid].anrede` fehlt, ohne ihn zu speichern (3.5) | `belege` entfällt in v2, ohne Umstellung fehlen drei Belege; feine Stufen brauchen einen Leser; eine Anrede-Funktion | Verfasser 07, 07.10.2026 |
| 8 | `antworten.erfolge` über `HM_V2_ERFOLGE_E1` lesen (D18); Q13 als Prüfung übernehmen (kein Probensatz in `stimme.beispiele`); `hmAnredeRegel` als reine Funktion ohne Speichern aufrufbar halten; v1-Nummern in 08 Z. 409 (F4, F9 bis F16) und der Verweis "F23" zur Website-Zeile (08, 3.4) auf Keys umstellen (`abgeraten`, `anredeJeKanal.website`) | Abbildung verbindlich an einem Ort; Kohortenschutz; eine Anrede-Logik | Verfasser 08, 07.10.2026 |
| 12 | Eingang ergänzen um `antworten.abgeraten` (Gewicht der Säule Meinung, 12 Z. 104) und `bezirke`, `graetzl` (Ortsbezug der Serien, 12 Z. 120); Verweis "Schritt 2, F14" in 12 Z. 256 auf den Key `empfehler` ändern | wird schon gelesen, fehlt in der Liste | Verfasser 12, 07.10.2026 |
| Zerlegung | D2, D15, D17, D18, D19, D21 bestätigen; Regel "Nachbarn verweisen auf Keys, nie auf Fragenummern" aufnehmen; Eingangszeile von 2 um `vorab.luecken`, `vorab.nachtraege`, `vorab.auftrittHeute`, `vorab.material`, `auftrag.termine` ergänzen | ein Weg, keine wandernden Nummern | Owner, 07.10.2026 |

---

## 6. Qualitätsprüfung im Schritt

Alle Punkte außer Q10 laufen automatisch als `hmSelbsttestFragebogen()` im Selbsttest der Werkbank (`wb-betrieb.jsx`, `hmSelbsttestBetrieb`).

| Nr. | Prüfung | Automatisch | Schwelle |
|---|---|---|---|
| Q1 | Jede Frage in `HM_FRAGEN_V2` hat `treibt[]`; jedes Zielfeld steht in `HM_FELDER_V2` mit Abnehmer-Schritt und Status "im Eingang" oder "Bitte offen" mit Termin | ja | 100 Prozent; "Bitte offen" vor dem Termin gelb, danach rot |
| Q2 | Tauschprobe: für jede Frage mit Regelpfad zwei Antworten einsetzen, Zielfeld vergleichen. Heute prüfbar: `anredeJeKanal` gegen `hmAnredeRegel` und `hmAnrede(mid, kontext, { entwurf })` je Kanal und für `website`; `erfolge` gegen `HM_V2_ERFOLGE_E1`; `seite` gegen den Pfad und gegen die Stufenregel für `nichtFuer` (D21, sobald 7 sie führt); `cue` gegen `hmPfCue`; `formate` und `zeit` gegen den Formatmix; `kanaele` gegen den Pfad; `stimmproben` gegen die Regler-Rechnung von 08. Nie gegen `hmPfAnrede`, das nach 08 Z. 253 zur Weiterleitung wird | ja | jede prüfbare Frage ändert ihr Feld |
| Q3 | Keine Frage nach einem vorhandenen Wert: liegt ein Fakt mit Sicherheit hoch oder mittel vor und steht er nicht in `vorab.luecken`, ist die Frage vom Typ Bestätigen | ja | 0 Verstöße |
| Q4 | Keine Vorbelegung von Haltungen: alle Fragen außer Bestätigen starten mit `null`; Hinweise (F15, F18) wählen nichts vor | ja | 0 Verstöße |
| Q5 | Nachfrage höchstens einmal je Key, höchstens zweimal je Bogen, nur F3, F6, F5, `zielMerkmal`, in der Rangfolge aus 3.4 | ja, aus `fragebogen.messung` | 0 Verstöße |
| Q6 | `faelle`, `alternativeKonnte`, `abgeraten` im ersten Drittel der Screens jedes Pfads | ja, Pfad-Simulation | alle Pfade |
| Q7 | Pfad-Simulation mit vier Personas: Markus (Eigentümer, LinkedIn und Instagram), Käufer-Makler nur LinkedIn, beidseitig mit allen Kanälen und ohne Kunden im Fall-Text (F11 sichtbar), ohne Fremdbild- und ohne KI-Einwilligung. Keine sichtbare Frage, deren Zielfelder leer bleiben; geschätzte Dauer nach der Rechenregel aus 3.10 höchstens 15 Minuten ohne Rückfragen | ja | alle vier |
| Q8 | Texte der Oberfläche, der Vorlagen und der Stimmproben: keine Gedankenstriche, keine Ausrufezeichen, kein Treffer in `KLISCHEES`, keine Prozentangabe ohne Quelle, keine Studiennamen in Hilfetexten, kein `linear-gradient`, keine Pfeil- oder Hakenzeichen als Text, keine Zeile über einer Headline, keine Klasse `hm-mono` im Bogen | ja, Textscan | 0 Verstöße |
| Q9 | `hmWorkshopLeitfaden` in `wb-workshop.jsx` (Schritt 4) enthält keine Frage, deren Key im Bogen `status: "beantwortet"` hat | ja | 0 Verstöße |
| Q10 | Durchsicht des Teams: Vorbelegung, Bildzuordnung und Zählung vor dem Link, Lücken und Zitat-Kandidaten danach | nein, Checkliste in der Team-Ansicht | beide Haken, bevor Schritt 4 geplant wird |
| Q11 | Datenschutz: `hmAnonymPruefen` läuft vor jedem Aufruf von `NACHFRAGE` und `FAELLE` und vor jedem Speichern; Testtexte mit Mailadresse, Telefonnummer, "Frau Berger", "Sieveringer Straße 12" erzeugen Maske und keinen Aufruf | ja, mit Aufruf-Protokoll im Test | 0 Aufrufe mit Treffer, 0 gespeicherte Treffer |
| Q12 | Nachfrage-Prüfung: `bezug` wörtlich, keine neue Zahl, kein neuer Ort, höchstens 20 Wörter | ja, je Aufruf | sonst Vorlage |
| Q13 | Kohortenprüfung der Stimmproben: kein Satz einer Vorlage (nach Füllung und Normalisierung, ab vier gleichen Wörtern in Folge) steht in `stimme.beispiele`, `stimme.eigeneWorte` oder `botschaften` irgendeines Maklers im Store | ja, Scan über alle `marke2` | 0 Treffer |
| Q14 | Bau der Stimmproben: je Paar gleiche Satzzahl, höchstens drei Wörter Unterschied, gleicher Ort; nach den Messfunktionen von 08 unterscheidet sich jedes Paar nur in seinem Regler | ja, je Vorlage und Seite | alle acht Paare |
| Q15 | Kein Claude-Aufruf, solange `auftrag.einwilligungen` keinen Eintrag `zweck: "kiAntworten"` mit `status: "ja"` hat; Testfälle "nein", "offen" und fehlender Eintrag | ja, Persona ohne Einwilligung | 0 Aufrufe |
| Q16 | `hmBelegKandidat` zählt `preis` aus `vorab.fakten` abschluesse nie; Testfall mit nur Preis ergibt "nicht belegfähig" | ja | bestanden |
| Q17 | Sprache der Abschlussseite: kein Wort der Werkstattliste (Beleg-Kandidat, Kandidat für, Stoff, Maßstab, Positionierung, Einsicht, Territorium, Zielfeld, Abnehmer, Konvention, Archetyp, Figur); jeder belegfähige und jeder offene Fall erscheint mit Ort; kein Titel ist ein abgeschnittener Satz | ja, Textscan über die Vorlagen und die Ausgabe der vier Personas | 0 Verstöße |
| Q18 | Fremdbild-Sicht: Makler-Ansicht mit zwei Antworten zeigt nichts; mit drei Antworten ohne `rolle`; Rolle mit zwei Antworten erscheint nicht aufgeschlüsselt | ja, `hmFremdbildSicht` mit Testdaten | bestanden |
| Q19 | Eine Anrede-Logik: `wb-fragen.jsx` enthält keine eigene Entscheidung zwischen Sie und Du; die Stimmproben lesen `hmAnrede` | ja, Textscan nach `anredeJeKanal` außerhalb von `hmAnredeRegel`-Aufrufen | 0 Treffer |

---

## 7. Typische Fehler und wie sie verhindert werden

| Fehler | Folge | Verhinderung |
|---|---|---|
| Falsche Vorbelegung wird durchgewunken | falsche Orte in Serien und Zeichen | nur hohe und mittlere Sicherheit vorbelegen, Quelle neben jedem Wert, jede Zeile einzeln, kein "Alles bestätigen" (Jäckle und Eckman) |
| Floskel statt Fall ("Kunden schätzen meine Ehrlichkeit") | Plattform aus Allgemeinplätzen | Frage nach dem konkreten Fall mit Recall; Regel erkennt Allgemeinplätze; eine Nachfrage |
| Weg statt Ausschlag ("kam über den Notar") | Beleg ohne Kern | Regel unterscheidet Empfehler von Ausschlag, Nachfrage zielt genau darauf |
| Beleg nur aus dem Preis | "4,2 Mio." als Beleg für nichts | Zahlenfelder Dauer und Abweichung je Fall; `preis` zählt nie (E3, Q16) |
| Zwei Wege für dieselben Abschlüsse | Fälle doppelt und verschieden abgelegt | nur `vorab.fakten` abschluesse, gleiche Feldnamen in `antworten.faelle` (D5) |
| Verhörgefühl durch viele Nachfragen | Abbruch, kürzere Antworten | eine je Frage, zwei je Bogen, feste Rangfolge, "weiß ich nicht mehr" beendet sie |
| Suggestive Nachfrage von Claude | fremde Inhalte in seinen Worten | Schema, Prüfung Q12, Vorlage als Rückfall |
| Namen oder Adressen gehen an Claude | Daten Dritter bei einem Dienst ohne Einwilligung | Prüfung vor dem Aufruf mit Maske (Q11), eigene Einwilligung auf der Eröffnung (D15, Q15), nur die eine Antwort wird gesendet |
| Zweite Anrede-Logik im Bogen | Stimmproben in anderer Form als die Marke | Aufruf von `hmAnrede` mit Entwurf aus `hmAnredeRegel` (3.5, Q19) |
| Stimmprobe misst mehrere Dinge zugleich | Regler ohne Bedeutung | Bauregeln und Q14 mit den Messfunktionen von 08 |
| Probensätze werden zum Musterton aller Makler | gleiche Beispiele in der Kohorte | Proben sind Messinstrument, Ausgang nur 25 oder 75; Q13 |
| Seitenpräferenz bei zwei Karten | Wahl misst links statt Ton | Lage der Pole je Makler ausgelost und gespeichert |
| Satisficing in langen Listen | Bequemlichkeit statt Aussage | Obergrenzen bis 2 oder 3, Listen mit höchstens elf Einträgen, Proben statt Adjektive |
| Sozial erwünschte Gründe | jede Marke "verlässlich" | keine Gründe-Liste mehr; Gründe aus Fall-Ausschlägen, Leiter bis zum Wert |
| Verallgemeinerung statt Fall ("mein typischer Kunde", "ich gehe offen mit Erfolgen um") | Selbstbild statt Verhalten | `kundeSatz` und `erfolge` am Fall 1 (D18, D19) |
| Anker durch Startwerte | Mitte statt Meinung | keine Regler, keine Vorwahl, `null` bleibt `null` |
| Die stärksten Fragen am Ende | kurze, gleichförmige Antworten (Galesic und Bosnjak) | Fälle, Alternative und Abraten im ersten Drittel (Q6) |
| Vorläufige Deutung nach Kapiteln | Anker für Richtung und Figur | Kapitelabschluss nur mit seinem Satz |
| Werkstattsprache am Ende | Abschluss klingt nach Agentur, nicht nach ihm | Vorlagen in Alltagssprache, Titel mit seinem Stoff, Q17 |
| Doppelte Fragen im Workshop | verschwendete Zeit, Misstrauen | Q9 gegen `hmWorkshopLeitfaden` |
| Fremdbild sammelt Kontaktdaten | Datenschutzproblem (Befund 10) | Link, den der Makler selbst teilt; anonyme Antworten mit Einwilligung |
| Antwortende werden wiedererkennbar | Vertrauensbruch bei Kunden und Partnern | Makler-Sicht erst ab drei, Rolle erst ab drei je Rolle, zufällige Reihenfolge (3.7, Q18); Einwilligungstext sagt, dass das Team Einzelantworten liest |
| Fremdbild-Teil erscheint nie | kein Fremdbild, `persoenlichkeit` ohne Prüfung | Einwilligung im Abschluss selbst gefragt (D20) |
| Käufer-Makler bekommt Verkäuferfragen | sinnlose Fragen, falsche Zielgruppe | `seite` früh, Varianten je Stufe, Q7 |
| Freitext-Grenzen verpuffen (Befund 6) | Regeln übergehen eigene Grenzen | `grenzenFrei` geht wörtlich in V5 (8) und die Sprachprüfung (12, 17) |
| "Erzielte Preise nie nennen" kollidiert mit der Objektregel | Konflikt mit dem Preis in der Objekt-Caption | Thema heißt ausdrücklich "erzielte Verkaufspreise nennen" und betrifft Belege |
| Kapitelanzeige sprengt das Telefon | Umbruch, verdeckter Knopf | laufendes Kapitel ausgeschrieben, übrige als Marken, Rechnung in 3.2 |
| Platzhalterbild auf der Fall-Karte | fremdes oder generiertes Bild neben seinem Fall | nur eigene Objektfotos mit geklärten Rechten, sonst rein typografische Karte |
| Abbruch ohne Rückkehr | halber Bogen | Speichern nach jeder Antwort, Rückkehr an die Stelle, `abbruch` zeigt dem Team den Punkt |
| Makler sieht fremde Inhalte | Vertrauensverlust | nur seine Daten und Sätze; keine Demo-Objekte, keine Beispieltexte in Feldern |

---

## 8. Umsetzung in der Werkbank

Architektur nach `ui_kits/werkbank/CLAUDE.md`: Babel ohne Build, gemeinsamer globaler Scope, Präfix `hm`, Export über `Object.assign(window, ...)`, kein `import()`. Funktionen anderer Schritte (`hmAnrede`, `hmAnredeRegel`, `hmAbschluesse`, `hmDauerMessen`) werden zur Laufzeit über `window` gerufen, damit die Ladefolge keine Rolle spielt.

### 8.1 Dateien

| Datei | Änderung |
|---|---|
| `ui_kits/werkbank/wb-fragen.jsx` (neu) | `HM_FRAGEN_V2`, `HM_FELDER_V2` (Zielfelder mit Abnehmer, Status und Termin), Listen `HM_V2_ALTERNATIVE`, `HM_V2_HINDERNIS`, `HM_V2_AUSLOESER`, `HM_V2_KUNDENWORTE`, `HM_V2_EMPFEHLER`, `HM_V2_GRENZEN`, `HM_V2_ZIELE`, `HM_V2_FORMATE_TEXT`, `HM_V2_STIMMPROBEN`, `HM_V2_OBJEKT_LEXIKON`, `HM_V2_FREMDBILD`, `HM_V2_ERFOLGE_E1`, `HM_V2_WERKSTATTWORTE` (Q17), `HM_V2_WIRKUNG` (Vorlagen aus 3.4); Funktionen `hmFragePfad`, `hmVorbelegung`, `hmNachfrageNoetig`, `hmNachfrageRang`, `hmNachfrageVorlage`, `hmAnonymPruefen`, `hmKiErlaubt`, `hmEinwilligungSchreiben` (Eintrag im Format von 01), `hmFallZerlegen` (nutzt `hmPfSaetze`, `hmPfTeile`), `hmKundeSatzAbleiten`, `hmBelegKandidat`, `hmStimmproben` (ruft `hmAnrede` mit Entwurf), `hmWirkungsliste`, `hmFremdbildSicht`, `hmMessung`, `hmSelbsttestFragebogen`, Migration `hmFragebogenV1zuV2` |
| `ui_kits/werkbank/index.html` | Script-Tag für `wb-fragen.jsx` vor `wb-flow.jsx`; Stile `.hm-fall` (Fall-Karte), `.hm-wirkung` (Blöcke mit Haarlinie), `.hm-kapitelleiste` nach 3.2, nur mit vorhandenen Farbrollen |
| `ui_kits/werkbank/wb-flow.jsx` | `Fragebogen` neu: Eröffnung mit KI-Frage, Kapitelleiste unten (3.2), Renderer für bestaetigen, fallkarte, stufen7, probe2, zustand3, zustand2, kanalstatus, einwilligung3, maske; Kapitelabschluss ohne Deutung; Abschluss nach 3.2 mit Wirkungsliste, offenen Zeilen, Fremdbild-Karte und Übergang zu Schritt 3. Entfernt: Eyebrows in Zeile 82 und 130, `linear-gradient` in Zeile 114, Pfeil-Textzeichen in Zeile 110, "Achtzehn Minuten" in Zeile 41, Berechnung der zwei Wege nach dem Bogen |
| `ui_kits/werkbank/wb-app.jsx` | Ansicht `ansicht=fragebogen` ohne Navigation, wie `ansicht=link` |
| `ui_kits/werkbank/wb-data.jsx` | unverändert bis auf das Entfernen des Aufrufs von `hmArchetypScores` und `hmZweiWege` aus dem Bogen; v1-Listen bleiben zum Lesen |
| `ui_kits/werkbank/wb-store.jsx` | `hmSeedTeil(teil, version, fn)` (D17); Seed Markus und Elif im v2-Format unter `marke2[mid].antworten` und `marke2[mid].fragebogen` über `hmSeedTeil("fragebogen", 1, ...)`, mit `unity` aus dem v1-Seed; `HM_SEED_FLAG` bleibt v9 |
| `ui_kits/werkbank/wb-workshop.jsx` (aus Schritt 4) | `hmWorkshopLeitfaden` liest v2-Antworten und lässt beantwortete Keys aus (Q9); kein Rückschreiben in `antworten` |
| `ui_kits/werkbank/wb-betrieb.jsx` | `hmSelbsttestFragebogen` in `hmSelbsttestBetrieb`; `hmZeroOneExport` nimmt `marke2[mid].antworten`, `fremdbild` und `fragebogen` auf |
| `api/wb-marke.js` | Phasen `nachfrage` (niedriger Aufwand, kleine `max_tokens`) und `faelle` mit `NACHFRAGE` und `FAELLE`; Server prüft erneut mit derselben Musterliste und lehnt Aufrufe ab, wenn im Auftrag `kiAntworten` nicht "ja" ist; `LABEL` um v2-Keys erweitern; `dossier()` schreibt je Antwort Quelle und Status, lässt `notizTeam` weg, enthält keine Kontaktdaten Dritter und nimmt Antworten nur bei KI-Einwilligung auf; Modell über `WB_MODEL`, optional `WB_MODEL_NACHFRAGE` für kurze Antwortzeiten (Latenz messen) |
| `api/wb-fremdbild.js` (neu) | nimmt anonyme Antworten mit Einwilligungshaken entgegen, prüft mit derselben Musterliste, stellt sie per Mail an das Team zu (Versandweg wie `api/lead.js`, ohne Kopie an Personen außerhalb des Teams) |
| Fremdbild-Seite (neu, außerhalb von `/ux`) | statische Seite mit Einwilligungstext, `rolle` und drei Fragen in Sie- oder Du-Form nach dem Fragment der Adresse |
| `docs/werkbank/MARKE_SCHEMA.md` | Abschnitt v2 Fragebogen mit den Feldern aus 5.2 |

### 8.2 Datenfelder

Speicherort nach Zerlegung Kapitel 3: `hmStore` unter `marke2[mid]` mit `antworten`, `fremdbild`, `fragebogen.messung`, `fragebogen.vorbereitung`, `fragebogen.fragenVersion`. Einwilligungen schreibt der Bogen nur als Einträge in `auftrag.einwilligungen` im Format von 01. Das v1-Objekt `fragebogen[mid]` bleibt lesbar, bis Schritt 16 die eingefrorene Quelle liefert. Beispiel (Werte aus Seed und Dossier von 01; `dauerSek` wird beim Ausfüllen gemessen):

```json
{
  "faelle": {
    "wert": [
      { "nr": 1, "objekt": "Zinshaus", "ort": "Sieveringer Straße", "plz": "1190", "datum": null,
        "preis": 4200000, "flaeche": null,
        "dauerWochen": { "wert": 11, "quelle": "makler" },
        "abweichung": { "richtung": null, "prozent": null, "bezug": "ersteEinschaetzung" },
        "ausschlag": "Erbengemeinschaft kam über den Notar.",
        "belegKandidat": false,
        "bild": null,
        "struktur": { "anlass": "Erbe", "empfehler": "Notariat", "kunde": "Erbengemeinschaft", "ausschlagKern": "", "seite": "verkaeufer", "luecken": ["ausschlag"] } }
    ],
    "quelle": "makler",
    "status": "beantwortet",
    "dauerSek": null,
    "nachfrage": { "fehlt": "ausschlag", "rang": 1, "frage": "Das erklärt, wie der Auftrag kam. Was hat entschieden, dass man Sie beauftragt hat?", "antwort": null, "von": "regel" },
    "notizTeam": ""
  },
  "kundeSatz": { "wert": "Erbengemeinschaft kam über den Notar.", "quelle": "abgeleitet", "bezugFall": 1, "status": "beantwortet", "dauerSek": 0, "nachfrage": null, "notizTeam": "" },
  "unity": { "wert": "Alteingesessene in Döbling, Väter im Ruderverein.", "quelle": "makler", "status": "beantwortet", "dauerSek": null, "nachfrage": null, "notizTeam": "" },
  "erfolge": { "wert": null, "fall": 1, "e1": null, "quelle": "makler", "status": "uebersprungen", "dauerSek": null, "nachfrage": null, "notizTeam": "" },
  "stimmproben": {
    "wert": [
      { "probe": "P1", "regler": "ernst", "wahl": null, "wert": null, "links": "b", "eigenerSatz": "", "vorlageVersion": 1 }
    ],
    "quelle": "makler", "status": "beantwortet", "dauerSek": null, "nachfrage": null, "notizTeam": ""
  }
}
```

Einträge in `auftrag.einwilligungen` nach dem Bogen (Beispiel mit den Annahmen aus 3.8):

```json
[
  { "zweck": "kiAntworten", "status": "ja", "frist": null, "gefragtIn": "link", "fassung": 1, "datum": "2026-10-07" },
  { "zweck": "fremdbild", "status": "offen", "frist": "2026-10-09", "gefragtIn": "link", "fassung": null, "datum": null }
]
```

Das Datum der KI-Wahl ist ein Beispielwert; die Frist des Fremdbild-Eintrags stammt unverändert aus 01 (8.2), Schritt 2 setzt nur `status` und `datum`.

### 8.3 Stufen und Aufwand (Schätzung)

**Stufe A, heute baubar ohne Serverspeicher.** Der Makler füllt in `ansicht=fragebogen` aus; die Daten liegen im Browser. Beim Abschluss sendet "An UNIO übergeben" die Antworten im Zero-One-Format (`hmZeroOneExport`, Schema `unio-wb/1`) an einen Endpunkt, der sie dem Team zustellt; das Team importiert mit `hmZeroOneImport`. Das ist Team-Handarbeit, die in den Datenvertrag zurückfließt. Voraussetzung: Zugang des Maklers zur Ansicht ohne das Team-Passwort; das ist offen beim Owner.

**Stufe B, mit Server-Datenhaltung** (FAHRPLAN: Supabase EU, Rollen serverseitig). Link mit persönlichem Zugang, Speichern auf dem Server, Fremdbild-Antworten direkt in `fremdbild.antworten[]` mit Sicht nach 3.7. Der Datenvertrag bleibt gleich.

| Paket | Aufwand |
|---|---|
| Katalog, Feldliste mit Abnehmer-Status und Termin, Listen, Pfad, Vorbelegung, Migration | 2 Tage |
| Oberfläche: Eröffnung mit Einwilligung, neun Fragetypen, Fall-Karte nach 3.2, Kapitelleiste 375 px | 3 Tage |
| Abschlussseite nach 3.2 mit Wirkungsliste, offenen Zeilen, Fremdbild-Karte, Bild im Block | 1 Tag |
| Datenschutzprüfung mit Maske, Einwilligungsweiche, Einträge im Format von 01 | 0,5 Tage |
| Nachfrage mit Rangfolge und Fall-Zerlegung in `api/wb-marke.js` mit Prüfung und Rückfall | 1 Tag |
| Stimmproben mit Objekt-Lexikon, Auslosung der Pole, Anbindung an `hmAnrede`, Messung | 1,5 Tage |
| Fremdbild-Seite, `api/wb-fremdbild.js`, `hmFremdbildSicht` | 1 Tag |
| Selbsttest Q1 bis Q19, Pfad-Simulation mit vier Personas | 1,5 Tage |
| Texte: Fragen in Sie und Du, acht Probenpaare je Seite, Wirkungsvorlagen, Einwilligungstexte, gelesen vom Owner | 0,5 Tage Team |
| Test mit den ersten fünf Maklern, Auswertung, Streichliste anwenden | je Makler etwa 40 Minuten Team (Phasen 0 und 5), plus eine Auswertung nach Makler 5 |
| Summe Bau | etwa 12 Tage (Schätzung) |

### 8.4 Offene Punkte beim Owner

1. Du oder Sie in der Oberfläche gegenüber dem Makler (D10, Zerlegung 7.1).
2. Rechtsgrundlage und Texte für den Fremdbild-Link, die Zuordnung öffentlicher Bewertungen und den Zweck `kiAntworten` (Zerlegung 7.2). Keine Rechtsberatung in diesem Dokument.
3. Ob ein eigenes Objektfoto im privaten Link ohne Zweck 4 gezeigt werden darf (3.2); bis zur Entscheidung gilt die Lesart dieses Dokuments, der Rückfall ist die typografische Karte.
4. Vertrag zur Auftragsverarbeitung mit dem KI-Anbieter und Speicherort der Anfragen: Lücke, nicht Teil der Recherche.
5. Zugang des Maklers zum Bogen in Stufe A, solange `/ux` per Passwort geschützt ist.
6. `ANTHROPIC_API_KEY` in Vercel: ohne ihn laufen Nachfrage und Zerlegung über Vorlagen und Regeln, der Bogen funktioniert vollständig.
7. Abnahme der Bitten in 5.4 bis 07.10.2026.

---

## Quellen

Intern: `docs/werkbank/branding-v2/00_ZERLEGUNG.md`, Schrittdokumente 01, 03 bis 08, 12, `bestand/FRAGEN_WIRKUNG_IST.md`, `bestand/KETTE_IST.md`, `research/R1-studios.md`, `R3-interview.md`, `R4-tools.md`, `R5-makler.md`, `R7-evidenz.md`, `R8-kundenerlebnis.md`; Code wie im Kopf genannt.

- Wolff Olins, Sammy Page: https://wolffolins.com/news/inside-wolff-olins-sammy-page-on-strategy
- Pentagram, OpenView: https://www.pentagram.com/work/openview/story
- GV Brand Sprint, Zusammenfassung: https://www.reforge.com/blog/brief-how-to-define-your-brand-with-gv-s-3-hour-sprint
- NN/g, Critical Incident Technique: https://www.nngroup.com/articles/critical-incident-technique/
- NN/g, Tone of Voice: https://www.nngroup.com/articles/tone-of-voice-dimensions/ und https://www.nngroup.com/articles/tone-voice-users/
- Dunford, Positioning Exercise: https://www.aprildunford.com/post/a-product-positioning-exercise
- Moesta und Spiek, Four Forces: https://jobstobedone.org/the-four-forces/
- Reynolds und Gutman 1988, Laddering: https://is.muni.cz/el/1456/jaro2013/MPH_MVPS/39278324/LadderingTheoy_original.pdf
- Vazire 2010, SOKA: https://pubmed.ncbi.nlm.nih.gov/20085401/
- Galesic und Bosnjak 2009: https://academic.oup.com/poq/article-abstract/73/2/349/1939196
- Villar, Callegaro, Yang 2013, Fortschrittsanzeigen: https://openaccess.city.ac.uk/14427/
- Liu und Conrad 2019: https://journals.sagepub.com/doi/abs/10.1177/0894439318755336
- Funke, Reips, Thomas 2011: https://dl.acm.org/doi/abs/10.1177/0894439310376896
- Xiao u. a. 2020: https://arxiv.org/abs/1905.10700
- Nachfragetypen, CHI 2025: https://arxiv.org/abs/2503.08582
- Jäckle und Eckman 2019: https://academic.oup.com/jssam/article-abstract/8/4/706/5532310
- Jin 2011: https://doi.org/10.2501/IJMR-53-1-075-094
- Revilla und Couper 2026: https://ojs.ub.uni-konstanz.de/srm/article/download/8456/7886?inline=1
- Landesvatter und Bauer 2026: https://academic.oup.com/jssam/advance-article/doi/10.1093/jssam/smag030/8812674
- MDN, Using the Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
- Typeform Logic Jumps: https://www.typeform.com/developers/create/logic-jumps/
- Tally Conditional Logic: https://tally.so/help/conditional-form-logic
- BAM, Auswertung NAR 2025 (USA, Übertragung auf Wien ist Ableitung): https://nowbam.com/how-home-buyers-and-sellers-find-their-agents-in-2025/
- Jansson und Smith 1991, Fixierung: https://www.sciencedirect.com/science/article/abs/pii/0142694X9190003F
