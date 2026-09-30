# Schritt 1. Auftakt und Vorab-Dossier (`auftakt`)

Stand 30.09.2026, dritte Fassung, korrigiert nach der Kettenprüfung (Einwilligungen, siehe Ende der Datei). Entwurf für Branding v2, Teilschritt 1 von 17. Grundlage: `00_ZERLEGUNG.md` (Vertrag Schritt 1), `bestand/KETTE_IST.md`, `bestand/FRAGEN_WIRKUNG_IST.md`, `research/R1` bis `R8`, `research/BENCHMARK_ONBOARDING.md`, die Nachbarschritte `02` bis `16` in ihrer Fassung vom 29. und 30.09.2026 und der Code in `ui_kits/werkbank/`. Gerendertes Muster der Makler-Ansichten: `muster/01_ihr-stand.html` mit Bild `muster/01_ihr-stand.png`.

**Lesart wie in der Zerlegung.** *Belegt* heißt: steht in einer Quelle mit URL oder in einer genannten Datei. *Ableitung* heißt: eigene Folgerung. *Setzung* heißt: bewusst gewählter Startwert, der an den ersten Maklern gemessen und ersetzt wird. *Lücke* heißt: wir wissen es nicht. Nichts in diesem Dokument ist Rechtsberatung.

**In einem Satz.** Das Team liest zuerst, was schon im System und im öffentlichen Auftritt des Maklers liegt, legt jeden Wert mit Quelle und Sicherheit ab und schickt ihm danach einen Link, der mit seinem Grätzl beginnt, den ganzen Weg bis zum Rückblick mit Datum und ehrlicher Dauer zeigt und alle Einwilligungen an einer Stelle erfragt, im Auftakt-Gespräch, jede mit ehrlicher Folge und mit Frist vor ihrer ersten Nutzung.

**Was sich gegenüber der zweiten Fassung ändert.**

| Punkt | Änderung | Abschnitt |
|---|---|---|
| Dauer in der Oberfläche | Jede Minutenangabe in `AuftaktLink` kommt aus `hmAuftragDauer`. Unter dem Knopf in Ihr Stand steht "21 Minuten: Fragebogen 15, Fremdbild-Link 2, Bildwahl 4", dieselbe Zahl wie in Ablauf. Neuer Selbsttest `auftakt.dauerAnzeige` | 3.4, 3.6, 6 |
| Einwilligungen | sechs Zwecke: "Gespräch am Drehtag aufnehmen" kommt als eigener Zweck dazu (Abnehmer 16 und 17), "Porträts" bleibt gestrichen, auch in 17. Schritt 17 ist Abnehmer von `auftrag.einwilligungen` | 4, 5.2, 5.3 D3, 5.4 |
| Einwilligung 1 | "Später" hat eine echte Frist: Werktag 1, 18 Uhr. Ein späteres Ja wirkt nur als Nachtrag in `vorab.nachtraege`, als Vorschlag in Schritt 2, nie still in `vorab.fakten` | 3.2, 4, 5.3 D9 und D13 |
| Mitentscheider | Der Makler leitet Einladungen und Aufnahmehinweis selbst weiter. `auftrag.entscheider.mit[]` enthält nur Rolle, Entscheidungsart und Teilnahme, keine Kontaktdaten, keinen Namen. Bei Fotos wird nur der Stand der Rechte mit Art des Nachweises gespeichert, kein Name eines Fotografen | 3.2, 4, 5.2, 6 |
| Muster | Einwilligungen im Gespräch und nach der Entscheidung, Block "Was mit Ihren Daten passiert", Summe in Grotesk, Rechner neu komponiert, Beispielzahlen statt Platzhaltern, Live-Tag in der Einleitung als geplant | 3.4 |
| Pool und Regelpfad | Löschregel für `wettbewerbPool`; eingefügter Website-Text mit Adresse und Abrufdatum als prüfbarer Beleg | 3.3, 8.2 |
| Quellen | Koto und Sycheva als Zusammenfassung gekennzeichnet | 1, 3.3 |

**Was sich gegenüber der ersten Fassung geändert hatte.**

| Punkt | Änderung | Abschnitt |
|---|---|---|
| Dauer | Eine Quelle: Jeder Schritt meldet seine Setzung in ein Register, `hmAuftragDauer` liest nur dieses. Werte an 03, 04, 06, 07, 08, 11, 15, 16 angeglichen, Summe neu: 683 Minuten für Markus statt 280 | 3.6 |
| Termine | Ein Planer: Alles nach dem Reveal kommt aus `hmRolloutPlan` (Schritt 16). Live-Tag Di 24.11. mit Ausweichtag Di 01.12.; vierzehn Momente einzeln aufgezählt | 3.5 |
| Letzte Abschlüsse | Eine Struktur mit Schritt 2: `vorab.fakten` feld `abschluesse` | 3.3, 5.3 D8 |
| Kanäle | Vokabular von Schritt 2: aktiv, aufbauen, nein | 3.3 |
| Symmetrie | Schritte 8 und 14 in der Nachfolgerliste, Abnehmerspalte vollständig, `vorab.stand` intern | 5.2, 5.4 |
| F1 | fragt nach Workshop, Richtungstermin und Reveal | 4 |
| Porträt-Prognose | Zählregel aus Schritt 11, 3.5 | 3.3 |
| Teamzeit | 215 bis 260 Minuten, mit zweiter unabhängiger Kartenbewertung | 3.7 |
| Datenschutz | Aufzeichnung nur mit Zustimmung aller Anwesenden, Fremdbild-Zustimmung bei den Antwortenden, Schwärzregel für `auftrittHeute`, Einwilligungen gestaffelt mit "Später entscheiden" (seit der dritten Fassung "Später" mit echter Frist) | 3.3, 3.4, 4 |
| Ansicht 3 | gerendertes Muster für Telefon und Rechner, Schriftgrade, Raster, vier Zustände, neue Kopfzeilen mit Begründung | 3.4 |

---

## 1. Ziel und Erfolgskriterium

**Ziel.** Bevor der Makler eine einzige Frage beantwortet, liegt im System, was sich aus Bestand, Konten und Material ablesen lässt, jede Angabe mit Quelle und Sicherheit. Er weiß, was ihn erwartet, wer entscheidet und wofür er eingewilligt hat. Der Moment für ihn: Die kennen mich schon und verschwenden meine Zeit nicht.

Der Schritt ist die Discovery-Phase eines Studios, zugeschnitten auf eine Person. Koto beginnt Strategie mit den "4 C" Category, Competition, Customer, Company ([R1, Q3](https://the-brandidentity.com/interview/kotos-carolyn-rush-good-brands-only-happen-with-a-good-idea); nach der Interview-Zusammenfassung in R1, Wortlaut nicht geprüft). Übertragen (Ableitung): Company ist Bestand, Material und altes Logo, Competition ist die Wettbewerbskarte, Customer sind die Kundenstimmen, Category sind die Kennzahlen im Kerngebiet. Studio Republic fordert die Wettbewerber schon vor dem Scoping an, damit genug Zeit bleibt, die nötigen Informationen zusammenzutragen ([Studio Republic](https://www.studiorepublic.com/blog/a-guide-to-our-brand-discovery-workshop/), R8 2.1). JKR und Ipsos haben 5.046 Markenelemente von 523 Marken untersucht und empfehlen, vorhandene unterscheidende Elemente zu verstärken und konsequent zu nutzen, statt sie zu ersetzen ([Be Distinctive Everywhere](https://bedistinctive.jkrglobal.com/), R1 Q23). Diese drei Handgriffe, Markt vorab sichten, Vorhandenes zuerst finden, Fakten nicht erfragen, leistet Schritt 1, bevor der Makler etwas tut.

**Erfolgskriterien.** Alle Schwellen sind Setzungen und werden ab dem ersten Makler gemessen.

| Nr. | Kriterium | Messung | Schwelle |
|---|---|---|---|
| E1 | Kein Fakt wird offen gefragt, für den eine Quelle vorliegt | Anteil der sechs Fakten (bezirke, graetzl, immotypen, seit, kanaele, abschluesse) mit Wert in `vorab.fakten` | alle, für die eine Quelle existiert; der Rest steht in `vorab.luecken` |
| E2 | Die Vorbelegung stimmt | Korrekturquote im Fragebogen je Fakt (`antworten.<key>.quelle` ist "vorab korrigiert") | unter 30 Prozent; darüber werden die Regeln des Fakts geprüft |
| E3 | Der Rahmen steht vor dem Fragebogen | `auftrag.termine` vollständig nach 3.5, `auftrag.entscheider` gesetzt, alle acht Einwilligungen im Gespräch gefragt; Zweck 1 und 7 entschieden oder ihre Frist abgelaufen, jede weitere entschieden oder mit Frist vor ihrer ersten Nutzung | vollständig |
| E4 | Die Zeit des Maklers in Schritt 1 ist klein | Gespräch plus Uploads, bei gemeinsamem Import dazu dieser Termin | 30 plus 5 Minuten, mit Import 55 Minuten |
| E5 | Das Dossier kommt schnell | Werktage vom Gespräch bis "Ihr Stand" offen ist | höchstens 2 Werktage |
| E6 | Die Wettbewerbskarte ist belastbar | Einträge in `vorab.wettbewerb`, je zwei unabhängige Bewertungen | 5 bis 8 Einträge, Abweichung je Achse höchstens 2 Stufen oder besprochen |
| E7 | Ein Materialengpass fällt früh auf | Porträt-Prognose nach der Zählregel von Schritt 11 steht vor dem Workshop fest | immer |
| E8 | Keine Daten Dritter im Dossier | Selbsttest `auftakt.keineKontakte`, `auftakt.schwaerzung` | null Treffer |
| E9 | Die angekündigte Dauer hält | Abweichung der gemessenen Summe von der angezeigten Summe nach Abschluss | unter 15 Prozent; darüber werden die Setzungen im Register ersetzt |

---

## 2. Geprüfte Alternativen und warum sie verworfen sind

| Nr. | Alternative | Was sie verspricht | Warum verworfen | Was wir daraus behalten |
|---|---|---|---|---|
| A1 | **Alles im Fragebogen fragen** (Ist-Stand, 44 Pflicht-Screens) | Vollständigkeit ohne Vorarbeit des Teams | Sechs Fragen fragen, was im System liegt: immotypen, bezirke, graetzl_anteil, bestand, follower, vorbilder (FRAGEN_WIRKUNG_IST Befund 2). Länge kostet Teilnahme und macht späte Antworten kürzer und gleichförmiger ([Galesic und Bosnjak 2009](https://academic.oup.com/poq/article-abstract/73/2/349/1939196)). Eine Frage, deren Antwort keine Entscheidung ändert, ist ihre Kosten nicht wert ([Hubbard, Value of Information](https://hubbardresearch.com/computing-the-value-of-information/), R3 1.14). | nichts; die Fragen wandern in Vorbelegung oder entfallen |
| A2 | **Automatischer Marken-Import aus der Website** wie Canva Brand Kit Builder oder Designs.ai | Logo, Farben, Schriften, Stimme in einem Klick | Übernimmt die Oberfläche und damit die alte Beliebigkeit, überspringt die Strategie (R4 1.1 und 4 Punkt 2). Canva selbst schreibt, die Ergebnisse variieren und müssen von Hand geprüft werden ([Canva Brand Kit Builder](https://www.canva.com/help/brand-kit-builder/)). | die Website als Quelle für Fakten, nie als Markenbasis |
| A3 | **KI-Profil aus öffentlichen Posts**, das auch Werte, Haltung und Stimme vorbefüllt | Der Makler bestätigt nur noch | Vorbelegung liefert bei Fakten die genauesten Daten, birgt aber die Gefahr, falsche Vorgaben zu bestätigen ([Jäckle und Eckman 2019](https://academic.oup.com/jssam/article-abstract/8/4/706/5532310)). Voreinstellungen verschieben Entscheidungen ([Jin 2011](https://doi.org/10.2501/IJMR-53-1-075-094)). Bei Haltungen wird die Marke so ein Echo unserer Vermutung (R3 1.12, Grundsatz G7). KI macht die Ergebnisse vieler Nutzer einander ähnlicher ([Doshi und Hauser 2024](https://www.science.org/doi/10.1126/sciadv.adn5290)). | Claude liest freigegebenen Text nur für fünf Fakten, mit wörtlichem Beleg |
| A4 | **Studio-Discovery mit Hausaufgaben und Board-Werkzeug**, bis hin zum Stakeholder-Audit | Tiefe wie bei Wolff Olins für Uber (über 200 Stakeholder, [R1 Q2](https://wolffolins.com/work/uber)) oder Studio Republic mit Miro-Vorbereitung | Für eine Person nicht übertragbar (R1 5). Eine Werkzeug-Einschulung ist für den Makler eine Hürde, kein Erlebnis (R8 2.1). Hausaufgaben ohne Wirkung auf den Output widersprechen der Werkbank-Regel (R8 5). | die Vorab-Analyse der Wettbewerber durch das Team, ohne Arbeit für den Makler |
| A5 | **Pauschale Einwilligung im Vertrag und Ablauf ohne Termine** ("wir melden uns") | Weniger Klicks, flexible Planung | Der Makler weiß dann nicht, was mit seinen Daten passiert. Eine Einwilligung muss nach DSGVO für einen bestimmten Fall, informiert und unmissverständlich gegeben werden, und bei der Beurteilung der Freiwilligkeit zählt, ob sie an etwas gekoppelt ist (Art. 4 Nr. 11, Art. 7 Abs. 4, [DSGVO](https://eur-lex.europa.eu/eli/reg/2016/679/oj); Einordnung für UNIO offen, Zerlegung Kapitel 7 Punkt 2). Ohne Rahmen und Dauer steigt die Abbruchgefahr (Galesic und Bosnjak, oben); Monteiro verlangt, den Rahmen jeder Sitzung zu setzen ([R8 2.3](https://thepiratetester.wordpress.com/2021/04/12/2021-04-12-my-breakdown-of-mike-monteiro-13-ways-designers-screw-up-client-presentations-and-how-it-applies-to-testers/)). | der Vertrag bleibt, die Einwilligungen kommen einzeln je Zweck dazu, an einer Stelle und mit Frist vor der ersten Nutzung |
| A6 | **Der Makler legt die Wettbewerbskarte selbst im Fragebogen** | Kein Rechercheaufwand | Die Selbstverortung braucht Deutung durch einen Menschen (R3 1.4), und die Karte soll vom Team vorab gelegt werden, der Makler setzt sich erst im Workshop selbst (R8 4 Punkt 2). Allein am Handy gelegt, misst sie Selbstbild statt Markt. | eine einzige Frage im Gespräch nach den Mitbewerbern, die er bei Aufträgen trifft |
| A7 | **Einwilligungen verteilt über die Kette** (zweite und dritte Fassung: Auftakt, Eröffnung und Abschluss des Fragebogens, Einladungen zu Reveal und Drehtag) | Jede Frage in dem Moment, in dem ihr Nutzen vor Augen ist | Die Kettenprüfung zeigt vier Orte und zwei Zwecke, die Schritt 1 nicht kannte (KI-Verarbeitung aus 02 D15 und 04 Z10, Beispiele fremder Auftritte aus 03 3.7). Das ermüdet und ist fehleranfällig, und die KI-Frage kam erst im Fragebogen, nachdem T2 schon Texte an Claude geschickt hätte. Die erste Fassung, alle auf einmal unter den Augen des Teams, bleibt ebenfalls verworfen: nicht sichtbar frei (Art. 7 Abs. 4 DSGVO, oben). | ein Ort im Gespräch, aber am eigenen Telefon ohne Blick des Teams, je Zweck mit Wenn-nicht-Satz, "Später" mit Frist vor der ersten Nutzung, eine Erinnerung mit Kontext vor der Frist, jederzeit änderbar |

Ableitung aus allen sieben: Die beste Lösung ist nicht die schnellste Vorbelegung, sondern die ehrlichste. Fakten werden gelesen und belegt, Haltungen bleiben leer, der Markt wird vom Team gesichtet, und der Makler gibt in einem kurzen Gespräch genau das, was nur er weiß: wer mitentscheidet und wann er kann. Wofür er einwilligt, entscheidet er selbst im Link, an einer Stelle im Gespräch, mit Bedenkzeit bis kurz vor der ersten Nutzung.

---

## 3. Die gewählte Lösung: Auftakt in drei Takten

### 3.1 Überblick

| Takt | Wann | Wer | Dauer | Ergebnis |
|---|---|---|---|---|
| T1 Auftakt-Gespräch | Tag 0 | Makler, Team (Daniel oder Nikita) | 30 Minuten, danach 5 Minuten Uploads (Setzung) | `auftrag.entscheider`, `auftrag.termine`, alle acht Einwilligungen gefragt, je entschieden oder mit Frist, Material zugesagt |
| T2 Dossier | Tag 0 bis 2 Werktage | Regeln, Team, Claude nur nach Ja zu Zweck 1 und Zweck 7 | Team 185 bis 230 Minuten ohne das Gespräch (Setzung, 3.7) | `vorab` vollständig, von einer zweiten Person abgezeichnet |
| T3 Ihr Stand | ab Werktag 2 | Makler, allein | Teil des Fragebogens | Der Link öffnet mit seinen Daten und geht in Kapitel 1 des Fragebogens über |

Voraussetzung aus der Einrichtung (`HM_EINRICHTUNG` in `wb-os-data.jsx`): Vertrag unterschrieben, Bestand übernommen oder "Ich habe noch keinen Bestand" gewählt, Konten gewählt. Ist der Import noch offen, hängt das Team die bestehende Option "Gemeinsam übernehmen, 20 Minuten" (`EImport`, `wb-einrichtung.jsx` Zeile 99) direkt an das Gespräch; diese 20 Minuten stehen dann in `auftrag.dauer`.

### 3.2 Takt 1: das Auftakt-Gespräch

Video oder vor Ort, 30 Minuten. Das Team teilt den Bildschirm mit der Ansicht "Ablauf", die der Makler danach im Link wiederfindet. Das Gespräch ist kein Interview über die Marke. Hier wird nur geklärt, was kein System weiß und was den Ablauf verändert.

| Minute | Inhalt | Was der Makler tut | Was gespeichert wird |
|---|---|---|---|
| 0 bis 4 | Ablauf zeigen: vierzehn Momente mit Datum und Dauer (3.5) | zuhören | nichts |
| 4 bis 8 | Wer entscheidet mit | eine Antwort (F1) | `auftrag.entscheider` |
| 8 bis 13 | Termine: Das Team schlägt den ganzen Plan vor. Fest werden heute Workshop, Richtungstermin und Reveal, alles andere ist vorgemerkt | bestätigen oder einzelne Tage verschieben (F2) | `auftrag.termine` |
| 13 bis 23 | Alle acht Einwilligungen: Das Team beendet die Bildschirmfreigabe, schickt den Link und erklärt je Zweck einen Satz, in der Reihenfolge der ersten Nutzung. Der Makler entscheidet am eigenen Telefon, das Team sieht nur das Ergebnis | je Zweck Ja, Nein oder Später, jeweils mit Frist (F3) | `auftrag.einwilligungen`, alle acht Einträge |
| 23 bis 27 | Material und Rechte: altes Logo als Datei, Fotos, ob Nutzungsrechte vorliegen | Dateien zusagen oder hochladen (F4) | Aufgabe im Link, später `vorab.material` mit `rechte {status, nachweis}`, `vorab.logoAlt`; kein Name eines Fotografen |
| 27 bis 30 | Mitbewerber: wer bei seinen letzten Aufträgen noch im Gespräch war | bis zu zwei Namen (F5) | Kandidaten für `vorab.wettbewerb` |

Die Minuten sind neu verteilt, die Summe bleibt 30 (Setzung, gemessen nach 3.6).

**Wie Mitentscheider eingeladen werden.** Das System speichert von der Person keine Kontaktdaten und keinen Namen, nur die Rolle (etwa "Partnerin", "Büroleitung"), ob sie entscheidet oder berät und ob sie bei Workshop, Richtungstermin und Reveal dabei ist. Die Einladungen zu diesen drei Terminen erscheinen im Link des Maklers als Knopf "Einladung weiterleiten": Er schickt sie selbst über sein Telefon weiter, so wie er den Fremdbild-Link teilt (`02_fragebogen.md`, `fremdbild`). Jede Einladung enthält den Aufnahmehinweis ("Aufgenommen wird nur, wenn alle Anwesenden zu Beginn zustimmen"). Die Zustimmung der Person holt das Team zu Beginn des Termins mündlich ein und vermerkt nur ja oder nein in der Sitzung, nie die Person (Schritt 4, Technik-Check). So entsteht keine Kontaktdatei Dritter.

Ziele fallen im Gespräch fast immer. Das Team notiert sie in der internen Gesprächsnotiz. Sie werden nicht als Feld gespeichert und nicht vorbelegt, weil `ziel` und `zielMerkmal` im Fragebogen gefragt werden und Haltungen nie vorbelegt werden (G7).

**Warum alle Einwilligungen im Gespräch.** Die Kettenprüfung hat gezeigt, dass verteilte Fragen an vier Orten landen und dass Nachbarn eigene Zwecke nachschieben, die Schritt 1 nicht kennt (A7). Ein Ort heißt: ein geschlossener Katalog von acht Zwecken (4), eine Liste, die er von Anfang an ganz sieht, und kein Schritt der Kette, der später selbst eine Einwilligung fragt; die Nachbarn lesen nur. Die KI-Verarbeitung (Zweck 7) muss vor T2 stehen, weil T2 der erste Schritt ist, der Text an Claude schicken würde. "Später" bleibt bei jedem Zweck eine echte Wahl mit echter Frist vor der ersten Nutzung: Zweck 1 und Zweck 7 warten bis Werktag 1, 18 Uhr (bei Markus Di 06.10.). Bis dahin liest T2 Bestand und Konten und ruft Claude nicht auf; ohne Ja zu Zweck 1 bleibt es bei diesen Quellen, ohne Ja zu Zweck 7 trägt das Team die Werte im Regelpfad (8.2) von Hand ein. E5 hält in allen Fällen, weil die öffentlichen Quellen der kleinere Teil der Arbeit sind und der Regelpfad dieselbe Struktur liefert. Die späteren Zwecke (Workshop aufzeichnen, Fremdbild-Link, Beispiele fremder Auftritte, Objektfotos zeigen, Reveal aufzeichnen, Gespräch am Drehtag aufnehmen) haben ihre Frist kurz vor ihrer Nutzung. Damit ihm bei einer späten Nutzung der Kontext nicht fehlt, erinnert der Link einen Werktag vor jeder offenen Frist einmal, mit dem Satz des Zwecks und dem Folgesatz; Einladungen zu Workshop, Reveal und Drehtag nennen nur den Stand ("Aufnahme: Ja, seit 5. Oktober") und den Link "Ändern", sie fragen nicht neu. Das Team schaut bei der Entscheidung nicht auf seinen Bildschirm, damit sichtbar bleibt, dass sie frei ist (A7). Die Zustimmung weiterer Anwesender zu Aufnahmen und die der Antwortenden auf der Fremdbild-Seite sind keine Einwilligungen des Maklers und bleiben, wo sie sind (Schritte 2, 4, 15).

### 3.3 Takt 2: das Dossier

Regeln rechnen, das Team urteilt, Claude liest Text, aber nur nach Ja zu Zweck 1 und Zweck 7. Jede Angabe trägt `quelle` und `sicherheit`.

**Sicherheit, drei Stufen (Setzung).**

| Stufe | Bedingung | Anzeige im Fragebogen (Schritt 2) |
|---|---|---|
| hoch | aus Systemdaten gerechnet mit mindestens 8 Datensätzen, oder aus einem verbundenen Konto | vorbelegt: "Stimmt das noch?" |
| mittel | eine Quelle mit 3 bis 7 Datensätzen, ein Urteil des Teams auf Datenbasis, oder eine Selbstauskunft | vorbelegt: "Stimmt das noch?", Quelle sichtbar |
| niedrig | nur eine öffentliche Angabe ohne Datenbestätigung, weniger als 3 Datensätze, oder ein Claude-Vorschlag, den das Team nicht übernommen hat | nicht vorgewählt, als Vorschlag neben leeren Optionen |

Die dritte Stufe ist die Antwort auf Jäckle und Eckman: Was wir nur vermuten, wird nicht vorausgewählt, damit der Makler es nicht aus Bequemlichkeit bestätigt ([Krosnick 1991, Satisficing](https://onlinelibrary.wiley.com/doi/abs/10.1002/acp.2350050305)).

**Zeiträume (Setzung mit Grund).** Fakten, die sagen, wo und womit er arbeitet (bezirke, graetzl, immotypen), rechnen über 24 Monate: Ein Einzelmakler schließt im Jahr oft weniger als die 8 Datensätze ab, die "hoch" verlangt, und Ort und Segment ändern sich langsamer als ein Jahr. Kennzahlen, die den heutigen Fluss beschreiben, rechnen über 12 Monate, weil der Vertrag sie so benennt (`objekte12m`, `verkauft12m`) und Schritt 12 den aktuellen Objektfluss braucht, nicht den Durchschnitt zweier Jahre. Beide Zeiträume stehen an jedem Wert in `zeitraum`.

**Wie jedes Feld entsteht.**

| Feld | Quelle | Regel | Team | Claude | typische Sicherheit |
|---|---|---|---|---|---|
| `vorab.fakten` bezirke | Objekte im Bestand (PLZ, bei Umland Ort) | Wiener PLZ 1010 bis 1230 tragen den Bezirk in Ziffer 2 und 3 (1190 ist der 19.), Umland über den Ortsnamen in `HM_BEZIRKE`. Rang nach verkauften Objekten der letzten 24 Monate, bei Gleichstand nach allen Objekten; höchstens 3 Plätze, je mit Anzahl `n` | prüft Ausreißer (Einzelobjekt in fremdem Bezirk) | nein | hoch ab 8 Objekten mit PLZ |
| `vorab.fakten` graetzl | Adressen **aller** Objekte im Bestand, 24 Monate | Straßennamen ohne Hausnummer im Bezirk auf Rang 1; Straßen mit mindestens 2 Objekten werden Kandidaten | benennt das Grätzl und legt `strassen[]` fest, weil Grätzl keine amtliche Grenze haben; der Makler bestätigt Name und Straßen in Schritt 2 | nein | mittel |
| `vorab.fakten` immotypen | Feld Art im Bestand | Zuordnung der Art-Texte auf `HM_IMMOTYPEN` über eine Synonymtabelle; bis 5, nach Häufigkeit; immer die volle Bezeichnung aus `HM_IMMOTYPEN`, nie gekürzt; nicht zuordenbare Texte ("Wohnung", "Altbau") gehen als Lücke an das Team | ordnet Unklares zu | nein | hoch ab 8 Objekten mit Art |
| `vorab.fakten` seit | Website, LinkedIn-Info (nach Einwilligung 1), ältestes Objekt im Bestand | Wert `{jahr, art: "genau" oder "mindestens"}`; das älteste Objekt liefert nur "mindestens" | übernimmt oder verwirft den Claude-Vorschlag | liest ein Jahr mit wörtlichem Beleg | mittel oder niedrig |
| `vorab.fakten` kanaele | Einrichtung (`einrichtung_daten[mid].konten.wahl`), Insights-Import, Lead-Radar (Website) | Vokabular von Schritt 2: "habe" wird `aktiv`, "neu" wird `aufbauen`, "nein" wird `nein`. Ruht ein Konto (letzter Beitrag im Insights-Export älter als 90 Tage, Setzung), wird der Wert `aufbauen` mit `hinweis: {letzterBeitrag}`; Schritt 2 zeigt dann "aufbauen" vorbelegt und darunter "Letzter Beitrag im [Monat]". Kanäle ohne jede Quelle bleiben leer und werden in Schritt 2 ohne Vorbelegung gefragt | nein | nur Kanal-Nennung mit Beleg, nie den Status | hoch aus Konten, sonst mittel |
| `vorab.fakten` abschluesse | die drei jüngsten verkauften Objekte im Bestand | Struktur wie Schritt 2 D5: `[{objekt, ort, plz, preis, flaeche, datum}]`; `objekt` volle Bezeichnung aus `HM_IMMOTYPEN`, `ort` Straßenname ohne Hausnummer, `datum` als Monat. Nie Hausnummer, nie Verkäufer oder Käufer | prüft die Zuordnung der Art | nein | hoch aus dem Import |
| `vorab.kennzahlen` | Bestand | Formeln unten | nein | nein | mit `n` ausgewiesen |
| `vorab.material` | `branding[mid].material`, `portraits[mid].liste` | Anzahl je Art; Porträt-Prognose unten | Eignung und Rechte je Art: `rechte {status geklärt oder offen, nachweis}` mit `nachweis` aus einer festen Liste (eigene Aufnahme, Rechnung mit Nutzungsrechten, schriftliche Freigabe, Agentur- oder Studiovertrag, keiner); kein Name eines Fotografen, kein Freitext | nein | Team-Urteil |
| `vorab.logoAlt` | Material der Art "Altes Logo" | bis 3 dominante Farben mit Anteil aus den Pixeln; Vektor oder Pixel aus dem Dateityp | Schriftklasse, Elemente, was schon wiedererkennbar ist | nein | Team-Urteil |
| `vorab.auftrittHeute` | Material "Screenshot von Profilen", Bio (nach Einwilligung 1), Insights | Follower aus Insights, sonst aus Screenshot, sonst Lead-Radar mit Datum | schwärzt, schreibt eine Notiz zu den letzten zwölf Kacheln | nein | je Quelle |
| `vorab.wettbewerb` | öffentliche Auftritte im Kerngebiet, Namen aus F5, Lead-Radar als Kandidatenliste, Pool des Kerngebiets | prüft Anzahl 5 bis 8, Achsenwerte, Abweichung der zwei Bewertungen | sichtet und bewertet, zwei Personen | nein | Team-Urteil |
| `vorab.kundenstimmen` | eigene öffentliche Bewertungen (nach Einwilligung 1), Nachrichten, die der Makler selbst schickt | Text wird unverändert gespeichert, ohne Namen des Kunden | trägt ein, klärt Freigabe | nein | wörtlich oder gar nicht |
| `vorab.luecken` | alle Felder oben | jedes leere Vertragsfeld wird eine Lücke mit `zielschritt` und `schliesstIn` | ergänzt Lücken, die nur ein Mensch sieht | schlägt Lücken aus dem Website-Text vor | |

**Grätzl und Anteil ohne Zirkelschluss.** In der ersten Fassung entstanden die Straßen aus der Häufung verkaufter Objekte, und der Anteil verkaufter Objekte in diesen Straßen galt danach als Beleg. Das bestätigt sich selbst. Jetzt kommen die Straßen aus allen Objekten, das Team benennt, der Makler bestätigt in Schritt 2, und erst danach rechnet die Regel den Anteil nur aus verkauften Objekten. Schritt 7 kennzeichnet einen Beleg aus `graetzlAnteil` mit "Grätzl vom Makler bestätigt, Anteil aus [n] verkauften Objekten, [zeitraum]" (Korrekturbedarf 5.4).

**Kennzahlen, Formeln (Regel).** Zeitraum sind die 365 Tage vor dem Dossier-Datum. Jede Kennzahl trägt `wert`, `n`, `zeitraum` und `quelle`.

| Kennzahl | Formel | Mindestmenge (Setzung) | Unter der Mindestmenge |
|---|---|---|---|
| `objekte12m` | Objekte mit Vermarktungsbeginn oder Abschluss im Zeitraum | keine | Zahl, auch 0 |
| `verkauft12m` | Objekte mit Status verkauft und Abschlussdatum im Zeitraum | keine | Zahl, auch 0 |
| `graetzlAnteil` | verkaufte Objekte mit Straße in den bestätigten `graetzl.strassen` geteilt durch `verkauft12m`; bis zur Bestätigung in Schritt 2 als `vorlaeufig` markiert | 5 verkaufte Objekte | kein Prozentwert, nur die Zählung ("1 von 3") und eine Lücke |
| `preisband` | 25. bis 75. Perzentil der Kaufpreise verkaufter Objekte, gerundet auf 10.000, dazu Median | 5 verkaufte Objekte | kleinster und größter Wert mit `n` |
| `objektflussMonat` | Objekte mit Vermarktungsbeginn im Zeitraum geteilt durch 12, eine Nachkommastelle | 3 Objekte mit Datum | Lücke; Schritt 12 plant dann ohne festen Objektfluss |

**Wettbewerbskarte (Team, Setzung).** So wird sie gelegt:

1. *Auswahl, 5 bis 8 Auftritte im Kerngebiet (Bezirke auf Rang 1 und 2).* Pflicht sind die bis zu zwei Namen aus F5. Dazu mindestens ein Großbüro oder Franchise, mindestens ein Einzelmakler mit Personenmarke, mindestens ein Spezialist für das Hauptsegment des Maklers, und die Auftritte mit den meisten aktiven Inseraten im Kerngebiet auf den großen Portalen. Die Lead-Radar-Liste (`leads`, `wb-betrieb.jsx`) darf Kandidaten vorschlagen. Ein UNIO-Makler im selben Gebiet wird aufgenommen und mit `unio: true` markiert, damit Schritt 5 ihn nicht als Konvention zählt und Schritt 6 die Kohorte kennt.
2. *Sichten, höchstens 10 Minuten je Auftritt, Person A.* Letzte zwölf Kacheln auf Instagram, Startseite der Website, Profil auf dem Portal. Gespeichert wird nur `fundort` (die Profiladresse) in der geschützten Instanz, kein Bild.
3. *Bewerten, zwei Personen unabhängig.* Person B sieht dieselben Fundorte, etwa 4 Minuten je Auftritt, ohne die Werte von A. Sieben Stufen je Achse von minus 3 bis plus 3, erst still allein, dann Abgleich (Note and Vote aus dem GV Brand Sprint, [R8 2.1](https://www.reforge.com/blog/brief-how-to-define-your-brand-with-gv-s-3-hour-sprint)). Liegen zwei Werte mehr als 2 Stufen auseinander, wird besprochen und der Grund in die Notiz geschrieben.
4. *Notieren, höchstens 20 Wörter, nur Sichtbares.* Keine Wertung, keine Bilder, keine Screenshots der Mitbewerber im System.

Die zwei Achsen stammen aus dem Vertrag und folgen Sycheva (traditionell gegen progressiv, korporativ gegen menschlich, [Smashing Magazine 2026](https://www.smashingmagazine.com/2026/07/how-turn-brand-strategy-into-visual-direction/); nach der Zusammenfassung in R8, Wortlaut nicht geprüft). Damit zwei Personen gleich messen, hat jede Achse beobachtbare Anker (Ableitung):

| Achse | minus 3 | plus 3 |
|---|---|---|
| x nahbar bis distanziert | Gesicht in mindestens der Hälfte der letzten zwölf Kacheln, Ich-Form, Arbeit und Alltag sichtbar, Antworten auf Kommentare | Firmenlogo statt Gesicht, Wir-Form oder Firmenname, nur Objekte, keine Person |
| y klassisch bis zeitgenössisch | Antiqua in Versalien, Navy, Gold oder Bordeaux, Siegel oder Wappen, zentrierte Layouts, Weitwinkel mit Preisbanner | Satzschreibung, reduzierte Palette, redaktionelle Fotografie, Asymmetrie, benannte Serien |

**Pool je Kerngebiet und Kohorte.** Gesichtete Auftritte liegen einmal im internen Pool `wettbewerbPool[kerngebiet]` mit `{poolId, kennung, typ, unio, fundort, x, y, konventionNotiz, gesichtetAm, bewertetVon[2]}`. `vorab.wettbewerb` eines Maklers verweist per `poolId` darauf und kopiert die Werte zum Zeitpunkt des Dossiers. Aus einem anderen Makler-Dossier wandert **nichts** in den Pool: keine Lage "Sie heute", keine Wunschlage, keine Nie-Liste, keine Notiz aus dessen Workshop. Nutzen zwei UNIO-Makler denselben Pool, trägt jeder Eintrag `geteiltMit` (Anzahl der Makler, nie Namen), und Schritt 6 zeigt bei der Kohortenprüfung "gleiche Konvention wie ein anderer UNIO-Makler im Gebiet": Die weiße Stelle und die Territorien müssen sich dann ausdrücklich unterscheiden. Neu bewertet wird ein Pool-Eintrag, wenn seine Sichtung älter als 90 Tage ist (Setzung).

**Löschregel für den Pool (Setzung, Frist bestätigt der Owner).** Ein Eintrag wird nur gebraucht, solange ein aktiver UNIO-Makler im Kerngebiet ihn nutzt. Aktiv heißt: Vertrag läuft, Marke in Arbeit oder in Pflege (Schritt 17). Endet der letzte aktive Makler im Kerngebiet, löscht ein nächtlicher Lauf zuerst `fundort` nach 30 Tagen, dann den ganzen Eintrag samt `kennung` und Namen aus F5 nach 180 Tagen. `vorab.wettbewerb` in abgeschlossenen Dossiers behält nur `kennung`, Achsenwerte und Notiz, weil die Markenbegründung in Schritt 14 darauf verweist; ein Name steht dort nie. Selbsttest `auftakt.poolFrist`.

**Material und Porträt-Prognose (Regel und Team).** Das Team urteilt je Art, ob das Material eine Anwendung trägt, nur intern taugt oder nicht verwendbar ist, und ob die Rechte geklärt sind. Gespeichert wird nur der Stand und die Art des Nachweises; den Nachweis selbst (Rechnung, Freigabe) behält der Makler, und wer die Fotos gemacht hat, steht nirgends im System (Selbsttest `auftakt.rechteOhneName`). Die Prognose rechnet mit **derselben Zählregel wie Schritt 11** (`11_bild.md` 3.5), soweit sie vor dem Designsystem prüfbar ist. Ein Gesichtsbild zählt, wenn alles zutrifft:

- genau ein Gesicht (aus `meta` von `/maklerzuschnitt`, sonst vom Team bestätigt),
- Qualitätswert mindestens 70 ("Gut" in `hmScoreText`, `wb-foto.jsx` Zeile 60),
- `ki` falsch,
- höchstens drei je Situation; eine Situation ist derselbe Ort, dasselbe Oberteil, dasselbe Licht, vorgeschlagen aus dem Aufnahmezeitpunkt (neue Situation nach mehr als 15 Minuten Pause) und vom Team bestätigt.

Die Regel rechnet zwei Zahlen: `sicher` (Rechte geklärt) und `moeglich` (dazu Rechte offen). Durchgang 2 und die Machbarkeit des Ausschnitts prüft erst Schritt 11; beide können nur weiter abziehen. Die Prognose ist deshalb eine Obergrenze, und die Regel plant mit Puffer:

| Lage | Folge |
|---|---|
| `moeglich` ist 0 | Porträt-Termin vor dem Richtungstermin, weil die Rohskizzen in Schritt 6 aus echtem Foto bestehen |
| `sicher` ist 0, `moeglich` mindestens 1 | Aufgabe "Rechte klären" mit Frist Workshop-Tag, weil Schritt 6 nur Porträts mit geklärten Rechten nutzt |
| `moeglich` unter 12 | Porträt-Termin vor dem Reveal vorgemerkt (`auftrag.termine.portraet`, Status "vorgemerkt"). 12 ist die Acht aus Schritt 11 plus ein Puffer von vier für Ausfälle in Durchgang 2 und beim Ausschnitt (Setzung). Schritt 11 entscheidet endgültig und setzt den Status auf "bestätigt" oder "entfällt" |
| `moeglich` mindestens 12 | kein Termin vorgemerkt |

Probe (Selbsttest `auftakt.prognose`): 20 Bilder aus einem einzigen Termin ohne Pause ergeben eine Situation und zählen 3, nicht 20. Genau diesen Fall hätte die erste Fassung als ausreichend prognostiziert.

Material der Art "Inspiration" wird inventarisiert, aber nie als positive Referenz weitergegeben (Fixierung durch Beispiele, [Jansson und Smith 1991](https://www.sciencedirect.com/science/article/abs/pii/0142694X9190003F); Leitfrage 5 in Schritt 3).

**Altes Logo (Regel und Team).** Die Erkennung sucht die Upload-Art "Altes Logo". Heute sucht `LogoFarbe` in `wb-setup.jsx` nach "Logo" und findet nie etwas (KETTE_IST 2.1). Die Farben werden als Hex mit Anteil gespeichert, nicht auf den nächsten der sieben Katalog-Akzente abgebildet, wie `hmLogoFarbe` es heute tut, weil Schritt 10 ohne Katalog arbeitet. Das Team hält die Schriftklasse fest (etwa serifenlose Grotesk, klassizistische Antiqua), wenn möglich den Namen mit Sicherheit, dazu die Elemente (Initialen, Bildzeichen, Linie, Claim, Rahmen) und je Element, ob es heute schon wiedererkennbar wirkt. Das ist die Empfehlung von JKR übertragen: erst finden und verstärken, was trägt (R1 Q23). Ob behalten, geschärft oder neu gemacht wird, entscheidet der Makler in Schritt 3 am echten Logo.

**Auftritt heute (Team, Regel zum Schutz Dritter).** Der Screenshot zeigt nur die Profilansicht: Kopf mit Bio und das Raster der letzten zwölf Kacheln. Keine geöffneten Beiträge, kein Kommentarbereich, keine Nachrichten. Vor dem Speichern schwärzt das Team Gesichter und Namen Dritter mit dem Schwärzwerkzeug in `AuftaktTeam`; die Schwärzung wird flach in die Bilddatei geschrieben, nicht als Ebene, damit sie nicht rückgängig zu machen ist. Die Datei liegt nur in IndexedDB `unio_hm_blobs` der geschützten Instanz, nie im Claude-Dossier und nie in Seeds des öffentlichen Repos; der Seed führt `auftrittHeute` als `null`. Gelöscht wird sie nach dem Rückblick (Schritt 16), weil Schritt 16 am Live-Tag den Altbestand dagegen prüft (Setzung, Frist bestätigt der Owner). Die Bio ist sein eigener öffentlicher Text und wird wörtlich gespeichert.

**Kundenstimmen (Team).** Wörtlich oder gar nicht. Kein Name des Kunden, nur Quelle (etwa "Google-Bewertung auf dem eigenen Profil") und Datum. Kürzungen nur mit sichtbarer Auslassung "[...]". Solange die Rechtsgrundlage für das Übernehmen öffentlicher Bewertungen offen ist (R3 6 Punkt 3, Zerlegung 7 Punkt 2), bleibt das Feld leer und `vorab.luecken` bekommt den Eintrag "Kundenstimmen: Rechtsgrundlage offen". Schritt 2 nutzt eine Stimme nicht als Vorschlag für `kundeSatz`, sondern lässt den Makler nur die Zuordnung bestätigen, danach gilt sie als Teil von `fremdbild` (`02_fragebogen.md` D2).

**Was Claude tut.** Genau eine Aufgabe, und erst, wenn Zweck 1 und Zweck 7 (KI-Verarbeitung) auf `ja` stehen; vorher gibt es keinen Aufruf, auch keinen vorbereitenden (Selbsttest `auftakt.einwilligung`). Aus Texten, die der Makler mit Einwilligung 1 freigegeben hat (Website, LinkedIn-Info, Instagram-Bio, eigene Inserate), schlägt Claude Werte für fünf Fakten vor, typisiert je Feld (8.2), je mit einem wörtlichen Beleg und der Adresse der Seite. Eine Regel prüft danach, ob der Beleg nach Normalisierung wörtlich im Quelltext steht (`hmBelegNorm`, 8.2). Steht er nicht dort, fällt der Vorschlag weg. Claude bekommt keine Objekte, keine Adressen, keine Kontakte, keine Bilder, keine Namen von Mitbewerbern. Ohne Claude, also bei Nein oder offenem Zweck 7, trägt das Team dieselbe Struktur von Hand ein (Regelpfad, 8.2). Ein Ja zu Zweck 7 nach der Abzeichnung löst keinen nachträglichen Claude-Lauf über das Dossier aus; es wirkt ab dann für die Folgeschritte. Warum so eng: Der Nutzen von Claude liegt hier im Lesen langer Texte, nicht im Urteilen, und jeder Satz über Haltung wäre eine Vorbelegung, die G7 verbietet.

**Abzeichnung des Dossiers (Team, 5 Minuten).** Bevor Ansicht 3 aufgeht, liest eine zweite Person sie so, wie der Makler sie sieht, und beantwortet drei Fragen mit Ja oder Nein: Steht dort etwas als sicher, das wir nur vermuten? Steht dort ein Name eines Mitbewerbers oder eines Kunden? Würde der Makler einen Wert lesen und denken "das stimmt nicht"? Jedes Ja hält die Ansicht an. Ergebnis: der interne Zustand `vorab.stand {fertigAm, abgezeichnetVon}` (kein Ausgang, 5.3 D9).

### 3.4 Takt 3: was der Makler sieht

Der Link ist derselbe, den er im Gespräch geöffnet hat, und später derselbe für Fragebogen und Bildpaare (Schritte 2 und 3). Oben drei Reiter: **Ablauf**, **Einwilligungen**, **Ihr Stand**. Alle Texte in Satzschreibung, kurze Sätze, keine Eyebrows, keine Textzeichen als Icons, keine Verläufe, keine Prozentbalken (`ui_kits/werkbank/CLAUDE.md`). Gerendert in `muster/01_ihr-stand.html`:

![Muster der Ansichten Ablauf, Einwilligungen und Ihr Stand für Markus Leitner, Telefon und Rechner, dazu die Zustände voll, ohne Bestand und noch nicht fertig, die Einwilligungen im Gespräch und nach der Entscheidung mit dem Block Was mit Ihren Daten passiert](muster/01_ihr-stand.png)

**Die Kopfzeilen, geprüft und neu gefasst.** Die erste Fassung hatte "Ihr Weg zur Marke" und "Das wissen wir schon." Beide fallen durch eine einfache Probe (Ableitung): Passt der Satz unverändert auf jeden anderen Kunden jedes anderen Anbieters? "Ihr Weg zur Marke" ja, also ist er generisch. "Das wissen wir schon." stellt uns in den Mittelpunkt und sagt, dass wir über ihn Bescheid wissen, bevor er sieht, woher. Forschung zur Personalisierung zeigt, dass verdeckt gesammelte Daten Werbung weniger wirksam machen, weil Menschen sich verletzlich fühlen, und dass offene Sammlung diesen Effekt abschwächt ([Aguirre, Mahr, Grewal, de Ruyter, Wetzels 2015, Journal of Retailing 91(1)](https://doi.org/10.1016/j.jretai.2014.09.005); Inhalt nach Titel und bekannter Zusammenfassung, der Volltext war beim Abruf gesperrt). Übertragen: Die Quelle muss vor oder unter jedem Wert stehen, nie erst auf Nachfrage, und der Satz darf nicht "wir wissen" sagen, sondern "so haben wir gelesen".

| Ansicht | alt | neu | Grund |
|---|---|---|---|
| Ablauf | Ihr Weg zur Marke | **Dienstag, 24. November.** Darunter: "Geplant als Ihr Live-Tag in Sievering. Fest wird er mit Ihrer Rückmeldung nach dem Reveal. Bis zum Rückblick im Januar sind es acht Termine mit uns und fünf kurze Aufgaben im Link." | Das Datum gehört nur ihm und ist ein Ziel, an dem wir uns messen lassen. Weil der Live-Tag den Status "vorgemerkt" hat und an Rückmeldung, Rechten und Porträt-Termin hängt, sagt schon der zweite Satz "geplant" und nennt, wodurch er fest wird, statt die Einschränkung erst in der letzten Zeile der Liste zu führen. Das Grätzl im Satz macht ihn zu seinem. Die Zählung macht den Aufwand sichtbar, bevor er fragt |
| Ihr Stand | Das wissen wir schon. | **Sein Grätzl als Titel**, bei Markus "Sievering, zwischen Sieveringer Straße und Agnesgasse." Darunter klein die Quelle, dann: "So haben wir Ihre Angaben gelesen. Im Fragebogen bestätigen oder ändern Sie jede Zeile. Erst danach arbeiten wir damit." | Das Erste, was er sieht, ist sein Ort in seinen Worten, nicht eine Aussage über uns. Die Einleitung nennt den Vorgang (gelesen), gibt ihm das letzte Wort (bestätigen oder ändern) und sagt, dass nichts ohne ihn weiterläuft |

Fehlt das Grätzl, rückt die erste Zeile mit Wert nach oben (Bezirke). Fehlt alles, gilt der Zustand "ohne Bestand".

**Ansicht Ablauf.** Titel, Einleitung, dann die ehrliche Summe vor der Liste: "Ihre Zeit insgesamt: etwa 11 Std. 25 Min., davon etwa 3 Std. 30 Min. am Drehtag. Die Zeiten sind unsere Schätzung, wir messen und korrigieren sie." Die Summe steht im Satz und damit in Power Grotesk. Darunter die vierzehn Momente aus 3.5, je eine Zeile: Datum, was er tut, ein Satz dazu, rechts die Dauer. Jede Minutenangabe kommt aus `hmAuftragDauer`, einheitlich im Format "110 Min." oder "3 Std. 30 Min.". Eine Dauer mit Art "Annahme" im Register trägt in ihrer Zeile den Satz "Dauer geschätzt, genau nach dem Fotobrief" (beim Drehtag), damit die Annahme dort sichtbar ist, wo er die Zahl liest. Die Unterzeilen nennen, wo es geht, seinen Stoff: beim Workshop "Ihre Fälle aus Döbling, in Ihren Worten". Erledigte Momente in gedämpfter Textfarbe, der laufende mit einer Linie links, keine Farbe. Die Ansicht ist ab dem Gespräch offen und bleibt es bis zum Rückblick; jede Terminänderung erscheint dort mit Datum.

**Ansicht Einwilligungen.** Titel "Acht Fragen zu Ihren Daten. Jede hat eine Frist.", nach den Entscheidungen "[n] von acht beantwortet." mit echter Zählung. Darunter alle acht Zwecke in der Reihenfolge ihrer ersten Nutzung, alle im Gespräch gefragt; es kommt später keine neue Frage dazu. Jede Zeile zeigt: Name, ein Satz wofür, ein neutraler Satz "Wenn nicht: ...", die Frist ("Offen bis Dienstag, 6. Oktober, 18 Uhr") und drei gleichrangige Knöpfe gleicher Breite, Höhe und Kontur, keiner gefüllt: **Ja**, **Nein**, **Später**. Die Frist steht über den Knöpfen, damit "Später" nie ein offenes Ende verspricht. Nichts ist vorgewählt. Nach einer Entscheidung ersetzt die Zeile die Knöpfe durch "Ja, seit 5. Oktober" oder "Nein, seit 5. Oktober" und den Link "Ändern"; beim Nein bleibt der Folgesatz sichtbar, damit er sieht, was jetzt anders läuft. Jede Entscheidung wird mit Datum und Fassung des Texts gespeichert und wirkt ab sofort. Eine offene Einwilligung zählt an ihrer Frist als Nein; einen Werktag vorher erinnert der Link einmal, mit dem Satz des Zwecks und dem Folgesatz, ohne Druckformel. Andere Schritte fragen keine Einwilligung selbst, sie lesen `auftrag.einwilligungen` und verweisen bei `offen` auf diese Ansicht.

Unter der Liste steht der Block **"Was mit Ihren Daten passiert"** in fünf Sätzen, gerendert im Muster. Er steht in dieser Ansicht und nicht am Ende von Ablauf, weil er dort gelesen werden soll, wo entschieden wird:

> Wir lesen Ihren Bestand ohne Kontakte und nur die Quellen, zu denen Sie Ja gesagt haben.
> Alles liegt in der geschützten Werkbank von UNIO. Sie brauchen kein Konto bei einem fremden Werkzeug.
> An Claude, das Sprachmodell, mit dem wir arbeiten, geht nur etwas, wenn Sie der KI-Verarbeitung zustimmen: freigegebene Texte, gerundete Eckdaten Ihrer Abschlüsse, Ihre Antworten und die Mitschrift des Workshops. Nie Adressen, Kontakte oder Bilder.
> Sehen können es Sie und das Team, das Ihre Marke baut. Wer mitentscheidet, bekommt die Einladungen von Ihnen weitergeleitet, wir speichern keine Kontaktdaten dieser Person.
> Screenshots Ihres heutigen Auftritts löschen wir nach dem Rückblick im Januar. Wann wir Aufnahmen löschen, steht hier, sobald es festgelegt ist.

Der dritte Satz ist genauer als in der zweiten Fassung ("keine Objekte"), weil das Claude-Dossier die gerundeten Abschlüsse nach D8 enthält. Seit der Korrektur nach der Kettenprüfung nennt er die Bedingung Zweck 7 und alle Texte, die sie abdeckt (04 Z10). Die Mitschrift des Workshops geht nur bei Ja zu Zweck 2 und Zweck 7 als Text an die Kette.

**Ansicht Ihr Stand.** Öffnet erst nach der Abzeichnung. Der Makler bekommt eine Nachricht: "Ihr Stand ist fertig. Der Fragebogen beginnt mit Ihren Angaben." Die Ansicht zeigt höchstens fünf Fakten, jeder als Wert mit der Quelle darunter. Immotypen stehen mit der vollen Bezeichnung aus `HM_IMMOTYPEN`, genau so, wie sie in `vorab.fakten` liegen und im Fragebogen bestätigt werden; es gibt keine Kürzung. Die Straßen seines Grätzls stehen als Namen da, nicht als Karte und nicht als Diagramm: Eine Liste echter Straßennamen ist spezifischer als jede Grafik und braucht keine Geodaten. Danach "Was uns noch fehlt" mit den Lücken, die er selbst schließen kann, je mit einer Handlung. Dann ein Satz, der die Arbeit zeigt, nach dem Muster "Gelesen aus [Zahl] Objekten, [Zahl] Konten und Ihrer Website", gefüllt nur mit echten Zählungen; sichtbar gemachte Arbeit erhöht den wahrgenommenen Wert ([Buell und Norton 2011](https://doi.org/10.1287/mnsc.1110.1376)). Ein Knopf "Fragebogen beginnen", darunter die Dauer aller Aufgaben dieses Links aus `hmAuftragDauer`, getrennt benannt: "21 Minuten: Fragebogen 15, Fremdbild-Link 2, Bildwahl 4. Sie können jederzeit unterbrechen." Das ist dieselbe Zahl wie in der Zeile des Moments 2 in Ablauf; es gibt keinen festen Minutentext im Code (Selbsttest `auftakt.dauerAnzeige`). Bestätigt wird erst im Fragebogen, Fakt für Fakt. Kennzahlen, Wettbewerbskarte und Follower sieht er hier nicht: Die Karte gehört in den Workshop, die Follower sind nur intern, und ein Prozentwert ohne Kontext lädt zur Diskussion über die Zahl statt über die Marke ein (Ableitung).

**Satz und Raster (Setzung, gerendert im Muster).** Grundpalette UNIO, keine Akzentfarbe, weil der Makler noch keine Marke hat und keine Vorwegnahme sehen soll. Power Grotesk hat keine Tabellenziffern: Die GSUB-Tabelle der Schnitte Regular und Medium enthält kein `tnum`, und die Ziffer 1 ist rund halb so breit wie die 0 (geprüft mit fontTools an `assets/fonts/PowerGrotesk-Regular.woff2`). Deshalb stehen Daten und Minuten in Spalten in der Datenschrift JetBrains Mono, ohne Versalien und ohne Sperrung, und Zahlen im Fließtext bleiben in Power Grotesk, auch die Summe in Ablauf und die Zählungen in den Quellen.

**Warum die Rechner-Ansicht so steht.** Links, Spalte 1 bis 8, steht, was ihm gehört: sein Grätzl als Titel, seine Werte, seine offenen Aufgaben. Rechts, Spalte 9 bis 12, steht, was von uns kommt: die Quelle des Titels auf dessen letzter Zeile, jede Quelle auf der Grundlinie ihres Werts, und am Ende der Knopf. Der Knopf schließt diese Spalte ab, weil nach dem Prüfen der Herkunft der Fragebogen der nächste Schritt ist; auf dem Telefon steht er aus demselben Grund zuletzt. So ist die Fläche rechts vom Titel keine Leere, sondern der Anfang der Quellenspalte, und die Quellen sind mit 16 px lesbar, ohne mit den Werten zu konkurrieren.

| Element | Telefon, 390 breit, Rand 24, eine Spalte | Rechner, 1440 breit, Rand 80, 12 Spalten, Abstand 24 |
|---|---|---|
| Reiter | 15 px, Linie 1,5 px unter dem aktiven | 16 px |
| Titel | 40/41 px, Laufweite minus 0,03 em, Gewicht 400, ausgeglichener Umbruch | 88/86 px über Spalte 1 bis 8 |
| Quelle des Titels | 14/19,6 px unter dem Titel, Textfarbe gedämpft (60 Prozent) | 16 px in Spalte 9 bis 12, auf der letzten Titelzeile |
| Einleitung | 18/27 px, höchstens 34 em | 20/30 px über Spalte 1 bis 6, rund 60 Zeichen |
| Fakt, Wert | 22/27,5 px, Haarlinie darüber und darunter | 34 px über Spalte 1 bis 8 |
| Fakt, Quelle | 14 px unter dem Wert | 16 px in Spalte 9 bis 12, auf der Grundlinie des Werts |
| Zwischentitel | 26/28,6 px | 30 px |
| Ablauf, Datum und Dauer | JetBrains Mono 13 und 12,5 px, Datumsspalte 88 px, Dauer rechtsbündig; Summe im Satz in Power Grotesk 16 px | wie Telefon, Liste über Spalte 1 bis 7 |
| Einwilligung, Knöpfe | drei gleiche Spalten, Abstand 8, 48 px hoch, Kontur 1 px, keiner gefüllt | drei gleiche Knöpfe in Spalte 1 bis 6 |
| Knopf Fragebogen | 48 px hoch, Tinte auf Papier umgekehrt | wie Telefon, in Spalte 9 bis 12, oben bündig mit "Was uns noch fehlt" |

**Zustände von Ihr Stand.**

| Zustand | Wann | Was er sieht |
|---|---|---|
| voll | Import, Konten und Website gelesen | Grätzl als Titel, Quellen mit Zählungen ("aus [n] Objekten"), Arbeitssatz mit drei Zählungen, alle in Grotesk. Im Muster mit als Beispiel gekennzeichneten Zahlen, weil der Seed keinen Import hat |
| teilweise | einige Quellen fehlen (Markus heute) | wie voll, die Quelle nennt die tatsächliche Herkunft ("aus Ihren Angaben vom September"), fehlende Werte stehen unter "Was uns noch fehlt" |
| ohne Bestand | "Ich habe noch keinen Bestand" | Titel "Noch kein Bestand übernommen." Einleitung: "Wir schätzen nichts, um diese Seite zu füllen. Deshalb fragt der Fragebogen [n] Dinge mehr als sonst:" mit n gleich der Zahl der Einträge in `vorab.luecken` mit `zielschritt` 2, darunter genau diese Einträge. Angebot, den Bestand später in 20 Minuten gemeinsam zu übernehmen |
| noch nicht fertig und Fehler | vor der Abzeichnung, oder die Import-Prüfung meldet fehlende Felder | Titel mit dem Datum, an dem der Stand kommt. Bei einem Importfehler genau diese Lücke mit einer Handlung ("Gemeinsam übernehmen, 20 Minuten"), nie ein halber Stand |

### 3.5 Termine: ein Planer

Die erste Fassung hatte mit `hmTermineVorschlag` einen zweiten Planer neben `hmRolloutPlan` aus Schritt 16. Jetzt gibt es eine Aufteilung ohne Überschneidung:

- `hmAuftragTermine(mid)` in `wb-auftakt.jsx` rechnet nur die Momente bis zum Reveal und die Öffnung der Rückmeldung.
- Alles danach übernimmt `auftrag.termine` ausdrücklich aus `hmRolloutPlan` (`wb-freigabe.jsx`, Schritt 16). Schritt 1 ruft die Funktion zweimal auf: einmal mit einer Rückmeldung im Spielraum (Plan A, 13 Werktage vom Reveal zum Live-Tag), einmal mit einer umgesetzten Änderung außerhalb des Spielraums (Plan B, mindestens 15 Werktage, `16_freigabe.md` 3.2). Plan A wird der Live-Tag, Plan B der Ausweichtag. So gilt die Mindestregel aus `16_freigabe.md` 5.5 für den Tag, den wir fest zusagen, und der frühere Tag bleibt erreichbar, wenn die Rückmeldung klein ausfällt.
- Nach der Freigabe rechnet Schritt 16 mit derselben Funktion neu und schreibt das Ergebnis in `rollout`; `auftrag.termine` bleibt als Plan mit Datum der letzten Rechnung stehen.

Werktage mit `hmWerktagePlus` und `HM_FEIERTAGE` (`wb-shop2.jsx` Zeile 27). Die Wochentage des Maklers (`auftrag.termine.wochentage`) nennt er im Gespräch bei F2; bei Markus stammen sie aus dem v1-Seed (`verfuegbar`: Dienstag, Donnerstag, Vormittag). Bis die Signatur-Serie in Schritt 12 feststeht, dient der erste dieser Wochentage als Rhythmustag für den Live-Tag.

**Die vierzehn Momente, Beispiel Markus.** Gespräch am Montag, 05.10.2026 angenommen.

| Nr. | Moment | Datum | Regel | Quelle der Regel |
|---|---|---|---|---|
| 1 | Auftakt-Gespräch, danach Uploads | Mo 05.10. | Tag 0 | dieses Dokument |
| 2 | Fragebogen und Bildwahl im Link | ab Mi 07.10., bis Fr 09.10. | Ihr Stand plus 2 Werktage (E5), Bearbeitung 2 Werktage | Setzung |
| 3 | Workshop | Di 13.10. | erster Makler-Wochentag nach Fragebogen-Ende plus 1 Werktag Vorbereitung | `04_workshop.md` 3.3 |
| 4 | Richtungstermin | Di 20.10. | Workshop plus höchstens 5 Werktage | `06_territorien.md` 3.2, Takt |
| 5 | Markenvertrag und Stimme im Link | Do 22.10. | Richtungstermin plus höchstens 2 Werktage | `07_positionierung.md` 7.6 |
| 6 | Porträt-Termin, vorgemerkt | Do 29.10. | nach der Prognose aus 3.3, spätestens 4 Werktage vor dem Reveal; der 26.10. ist Nationalfeiertag | `11_bild.md` 3.7 |
| 7 | Reveal | Do 05.11. | Wort-Link plus 9 Werktage, am Makler-Wochentag | Setzung für die Schritte 9 bis 14; `14_markenbuch.md` legt die Frist für Gate 2 auf den 03.11. |
| 8 | Rückmeldung im Link | ab Fr 06.11., 11 Uhr | Reveal plus 24 Stunden | `15_reveal.md`, `rueckmeldung.offenAb` |
| 9 | Freigabe im Link | Di 10.11. | aus `hmRolloutPlan`, Plan A | `16_freigabe.md` 3.13 |
| 10 | Drehtag, vorgemerkt | Do 12.11., Vormittag | aus `hmRolloutPlan` | `16_freigabe.md` 3.13 |
| 11 | Übergabe | Do 19.11. | aus `hmRolloutPlan` | `16_freigabe.md` 3.13 |
| 12 | Vorschau für das Umfeld | Fr 20.11. | aus `hmRolloutPlan` | `16_freigabe.md` 3.13 |
| 13 | Live-Tag | Di 24.11., 11.30 Uhr; Ausweichtag Di 01.12. | Plan A 13 Werktage, Plan B 18 Werktage nach dem Reveal | `16_freigabe.md` 3.2 und 3.13 |
| 14 | Rückblick | Do 07.01.2027, Stichtag 24.12. | Live-Tag plus 30 Tage, Termin am nächsten Makler-Werktag, nicht vom 24.12. bis 6.1. | `16_freigabe.md` 3.10 |

Plan B im Detail, wie in `16_freigabe.md` 3.13: Drehtag Do 19.11., Übergabe Do 26.11., Umfeld Fr 27.11., Live-Tag Di 01.12. Diese Tage stehen im Team-Kalender als Reserve, dem Makler zeigt Ansicht Ablauf nur den Satz unter dem Live-Tag.

Zählung für den Kopf von Ansicht Ablauf (Regel): Termine mit uns sind die Momente 3, 4, 6, 7, 10, 11, 13, 14, also acht; Aufgaben im Link sind 2, 5, 8, 9, 12, also fünf. Das Gespräch selbst ist zum Zeitpunkt des Lesens vorbei.

### 3.6 Dauer: eine Quelle

Die Dauer hat genau eine Quelle je Aufgabe: den Schritt, dem die Aufgabe gehört. Jeder Schritt meldet seine Setzung beim Laden mit `hmDauerSetzen(schritt, [{aufgabe, minuten, art, quelle}])` in das Register `HM_DAUER_REGISTER`. Jeder Schritt misst seine Aufgaben und schreibt die Messung mit `hmDauerMessen(mid, aufgabe, minuten)`; Schritt 2 aus `fragebogen.messung`, Schritt 4 aus `meetings[].messung`, die Link-Aufgaben aus ihren Sitzungsdaten. `hmAuftragDauer(mid)` liest nur das Register und die Messungen: Sobald eine Aufgabe fünf Messungen hat, ersetzt der Median die Setzung und die Art wechselt auf "gemessen". Schritt 1 führt keine eigene Tabelle mehr. Der Selbsttest `auftakt.dauerQuelle` prüft, dass jede Aufgabe aus 3.5 genau einen Registereintrag hat. Auch die Oberfläche hat keine zweite Quelle: `AuftaktLink` setzt jede Minutenangabe über `hmDauerText(aufgaben[])`, das `hmAuftragDauer` liest und "21 Minuten: Fragebogen 15, Fremdbild-Link 2, Bildwahl 4" oder "3 Std. 30 Min." formatiert. Der Selbsttest `auftakt.dauerAnzeige` rendert die drei Ansichten mit dem Seed, sucht jede Zeichenfolge aus Zahl und "Min." oder "Std." und prüft, dass sie aus `hmDauerText` stammt. Der feste Text "Etwa 15 Minuten" der zweiten Fassung wäre daran gescheitert.

**Stand des Registers, abgelesen aus den Nachbarn am 30.09.2026** (nur Dokumentation, keine zweite Quelle):

| Aufgabe | Schritt | Minuten | Art | Quelle |
|---|---|---|---|---|
| Auftakt-Gespräch | 1 | 30 | Setzung | dieses Dokument, 3.2 |
| Logo und Fotos hochladen | 1 | 5 | Setzung | dieses Dokument |
| Bestand gemeinsam übernehmen, nur wenn gewählt | 1 | 20 | Angebot der Einrichtung | `EImport`, `wb-einrichtung.jsx` Zeile 99 |
| Fragebogen, Pflichtteil | 2 | 15 | Setzung | `02_fragebogen.md` 3.7, 14,6 Minuten mit Nachfragen |
| Fremdbild-Link teilen | 2 | 2 | Setzung | Lücke in Schritt 2, bis dahin dieser Wert |
| Bildpaare und altes Logo | 3 | 4 | Setzung | `03_vorlieben.md` 3.8, rund vier Minuten |
| Workshop mit Probedreh | 4 | 110 | Setzung | `04_workshop.md` 3.2 |
| Richtungstermin | 6 | 20 | Setzung | `06_territorien.md` 0, Punkt 6 |
| Markenvertrag | 7 | 5 | Setzung | `07_positionierung.md` 7.6 |
| Stimme | 8 | 4 | Setzung | `08_stimme.md` 8.7 |
| Porträt-Termin, nur bei Bedarf | 11 | 75 | Setzung | `11_bild.md` 3.7 |
| Reveal | 15 | 60 | Setzung | `15_reveal.md` |
| Rückmeldung | 15 | 15 | Setzung | `15_reveal.md` |
| Freigabe-Ansicht | 16 | 8 | Setzung | `16_freigabe.md` 8.5, 6 bis 10 Minuten |
| Drehtag | 16 | 210 | Annahme bis zum Fotobrief | `16_freigabe.md` 8.5 |
| Übergabe | 16 | 45 | Setzung | `16_freigabe.md` 8.5 |
| Umfeld-Tag | 16 | 15 | Setzung | `16_freigabe.md` 8.5 |
| Live-Termin | 16 | 30 | Setzung | `16_freigabe.md` 3.9 |
| Rückblick | 16 | 30 | Setzung | `16_freigabe.md` 3.10 |

**Summe für Markus.** Ohne Import-Termin, Porträt-Termin und Drehtag: 398 Minuten. Mit Drehtag: 608 Minuten. Mit vorgemerktem Porträt-Termin, wie bei Markus nach der Prognose: 683 Minuten. Angezeigt wird auf volle fünf Minuten aufgerundet: "etwa 11 Std. 25 Min., davon etwa 3 Std. 30 Min. am Drehtag." Die Makler-Zeile der ersten Fassung ("4 Stunden 40 Minuten") unterschätzte seine Zeit um mehr als die Hälfte.

### 3.7 Wer tut was

| Rolle | Tut | Zeit je Makler |
|---|---|---|
| Makler | Gespräch, acht Einwilligungen, Material hochladen, später Ihr Stand öffnen | 35 Minuten, mit gemeinsamem Import 55 Minuten (Setzung) |
| Team | siehe Posten unten | 215 bis 260 Minuten (Setzung, messen) |
| Regeln | Bezirke, Immotypen, Kanäle, Abschlüsse, Kennzahlen, Sicherheit, Porträt-Prognose, Logofarben, Termine bis zum Reveal, Dauer aus dem Register, Lücken, Prüfungen | Sekunden |
| Claude | Fakten aus freigegebenem Text mit wörtlichem Beleg, nur nach Ja zu Zweck 1 und Zweck 7 | ein Aufruf oder keiner |

**Teamzeit, Posten in Minuten.** Gespräch 30. Import prüfen 10. Grätzl benennen 10. Material, Rechte und Situationen 20. Altes Logo 10. Auftritt heute, Screenshot schwärzen und Notiz 10. Kundenstimmen 15. Wettbewerb Person A, Auswahl und Sichtung 60 bis 90. Wettbewerb Person B, zweite unabhängige Bewertung 20 bis 35. Abgleich der Karte 10. Claude-Vorschläge prüfen 10. Einwilligungen und Termine nachhalten 5. Abzeichnung durch die zweite Person 5. **Summe 215 bis 260 Minuten**, also rund 3,5 bis 4,5 Stunden. Liegen die Auftritte schon im Pool des Kerngebiets und sind jünger als 90 Tage, entfallen Sichtung und zweite Bewertung bis auf eine Prüfung von 20 Minuten: dann 150 bis 160 Minuten. Ohne Ja zu Zweck 7 ersetzt das Eintragen der Werte von Hand den Posten "Claude-Vorschläge prüfen"; wie viel länger das dauert, ist eine Lücke und wird gemessen.

### 3.8 Der Fall Markus Leitner

Ehrlicher Stand aus dem Seed (`wb-store.jsx` Zeile 67 und 72, `HM_PORTRAIT_SEED` in `wb-foto.jsx` Zeile 8). Im Seed liegt **kein Bestand-Import** für Markus. Was der v1-Fragebogen von ihm weiß, ist Selbstauskunft. Das Beispiel zeigt, was die Regeln heute mit dem Seed tun würden und wo sie Lücken setzen müssen. Es nennt keine Zahl über Markus, die nicht im Seed steht.

**vorab.fakten**

| Feld | Wert | Quelle | Sicherheit |
|---|---|---|---|
| bezirke | 1. Döbling, 2. Währing, 3. Hietzing | v1 `bezirke` in Klickreihenfolge, Region `1190 Döbling` | mittel (Selbstauskunft, Rang nicht gerechnet) |
| graetzl | Sievering, zwischen Sieveringer Straße und Agnesgasse | v1 `graetzl` | mittel; `strassen[]` bleibt Lücke, bis der Import Adressen liefert |
| immotypen | Zinshaus, Anlegerwohnung, Eigentumswohnung Altbau, Denkmalschutz und Sanierung | v1 `immotypen` | mittel |
| seit | Lücke als Jahr; v1 nennt "5 bis 10 Jahre" | v1 `seit` | mittel für die Spanne; das Jahr fragt Schritt 2 |
| kanaele | Website `aktiv`, LinkedIn `aktiv`, Instagram `aktiv` | v1 `bestand` | mittel; Konten der Einrichtung im Seed nicht belegt. Facebook, YouTube und TikTok stehen in v1 `kanaele` als Wunsch, das ist eine Haltung und wird nicht vorbelegt |
| abschluesse | Zinshaus, Sieveringer Straße, 1190, 4,2 Mio., Fläche und Monat fehlen. Anlegerwohnung, Straße fehlt, 1180, 420.000, 62 m². "Altbau", Straße fehlt, 1130, 1,3 Mio., 140 m² | v1 `abschluesse` | mittel; "Altbau" ist nicht eindeutig auf `HM_IMMOTYPEN` zuordenbar und geht als Lücke an das Team |

**vorab.kennzahlen.** Alle fünf sind eine Lücke, weil der Import leer ist. Die drei selbst genannten Fälle zeigen aber, warum gerechnet statt geschätzt wird: Einer davon liegt im genannten Grätzl, also 1 von 3. Im v1-Fragebogen schätzt er "6 bis 8" seiner letzten zehn Abschlüsse dort (`graetzl_anteil`). Drei Fälle sind unter der Mindestmenge, deshalb kein Prozentwert, sondern eine Klärung für den Workshop: "Grätzl-Anteil: Schätzung 6 bis 8 von 10, genannte letzte Fälle 1 von 3. Import der verkauften Objekte klärt es."

**vorab.material und Prognose.** Ein Porträt, "Studio, Foto-Termin" vom 18.09.2026, Zuschnitt-Wert 94, freigestellt, ein Gesicht (vom Team zu bestätigen, `meta` fehlt im Seed), `ki` falsch, eine Situation. Rechte offen, bis das Team sie bestätigt. Zählung: `sicher` 0, `moeglich` 1. Folge nach 3.3: Aufgabe "Rechte am Studio-Porträt klären" mit Frist Di 13.10., damit die Rohskizzen im Richtungstermin sein Gesicht zeigen dürfen; Porträt-Termin am Do 29.10. vorgemerkt. Objektfotos: keine im Seed, Lücke. Altes Logo: Laut v1 gibt es ein Logo, das er behalten und schärfen will (`bestand`, `behalten`), die Datei fehlt. Lücke mit Aufgabe "Logo als Datei vom Gestalter, am besten als Vektor".

**vorab.auftrittHeute.** Lücke: kein Screenshot, keine Bio. Follower "500 bis 2.000" nur als Selbstauskunft, nur intern.

**vorab.wettbewerb.** Lücke: Die Sichtung im Kerngebiet Döbling und Währing ist nicht gemacht, und dieses Dokument erfindet keine Mitbewerber. Die Karte hätte nach der Regel oben bis zu sechs Pflichtplätze: die bis zu zwei Namen aus F5, ein Großbüro oder Franchise, ein Einzelmakler mit Personenmarke, ein Zinshaus-Spezialist, der Auftritt mit den meisten Inseraten im Kerngebiet.

**vorab.kundenstimmen.** Lücke. Es gibt nur seine eigene Wiedergabe, Kunden hätten sich "nie gedrängt gefühlt" (MARKENQUALITAET 5.7). Das ist keine Kundenstimme und wird nicht als solche gespeichert.

**vorab.luecken, Auszug.**

| Feld | Grund | Zielschritt | schließt in |
|---|---|---|---|
| Kennzahlen, alle | Bestand-Import leer | 1 | Team, Import aus dem CRM |
| graetzl.strassen | keine Adressen | 2 | Import, dann Team, dann Bestätigung |
| seit, Jahr | nur Spanne | 2 | Fragebogen |
| abschluesse, Art "Altbau", Straßen, Monate | Selbstauskunft unvollständig | 2 | Import oder Fall-Karten in Schritt 2 |
| logoAlt | Datei fehlt | 1 | Makler, Upload im Link |
| Rechte Porträt | nicht bestätigt | 1 | Team bis Workshop |
| auftrittHeute | kein Screenshot | 1 | Team nach Einwilligung 1 |
| wettbewerb | Sichtung offen | 1 | Team vor dem Workshop |
| kundenstimmen | Rechtsgrundlage offen | 4 | Owner, dann Workshop-Aufgabe |
| Grätzl-Anteil | Widerspruch Schätzung und genannte Fälle | 4 | Workshop-Klärung |
| entscheider | im Seed nicht belegt | 1 | F1 |

**Texte in seinem Link.** Die Anrede des Maklers durch UNIO ist offen (Zerlegung 7 Punkt 1; die Werkbank duzt heute). Die Beispiele stehen in Sie, weil Markus selbst überall siezt (`anrede`: "Sie, überall"). Die Oberfläche liest die Anrede gegenüber dem Makler aus einer globalen Einstellung; das ist keine zweite Anrede-Logik für Markentexte, die bleibt allein `anrede` aus Schritt 8.

Ansicht Ablauf, Kopf und zwei Zeilen (vollständig im Muster):

> Dienstag, 24. November.
> Geplant als Ihr Live-Tag in Sievering. Fest wird er mit Ihrer Rückmeldung nach dem Reveal. Bis zum Rückblick im Januar sind es acht Termine mit uns und fünf kurze Aufgaben im Link.
> Ihre Zeit insgesamt: etwa 11 Std. 25 Min., davon etwa 3 Std. 30 Min. am Drehtag. Die Zeiten sind unsere Schätzung, wir messen und korrigieren sie.

> Di 13.10. Workshop. Ihre Fälle aus Döbling, in Ihren Worten. 110 Min.

> Do 12.11. Drehtag. Vorgemerkt. Dauer geschätzt, genau nach dem Fotobrief. 3 Std. 30 Min.

> Di 24.11. Live-Tag. Braucht Ihre Rückmeldung eine größere Änderung, wird es Di 01.12. 30 Min.

Ansicht Einwilligungen, vier der acht Zeilen:

> KI-Verarbeitung. Claude, das Sprachmodell, mit dem wir arbeiten, liest Texte ohne Namen Dritter: die Seiten, die Sie unten freigeben, Ihre Antworten im Fragebogen und die Mitschrift des Workshops. So schlagen wir Angaben mit Beleg vor, fragen gezielt nach und halten Ihre eigenen Worte genau fest. Wenn nicht: Kein Text geht an einen KI-Dienst. Das Team liest und wertet von Hand aus, Rückfragen kommen aus festen Vorlagen. Ihre Marke entsteht vollständig, aber die Rückfragen sind allgemeiner, und die Entwürfe greifen Ihre eigenen Formulierungen weniger genau auf.
> Offen bis Dienstag, 6. Oktober, 18 Uhr. Ja. Nein. Später.

> Ihr öffentlicher Auftritt. Wir lesen Ihre Website, Ihr Google-Profil, Ihre Instagram-Bio und Ihre eigenen Inserate, damit Sie im Fragebogen bestätigen statt eintragen. Wenn nicht: Wir lesen nur Ihren Bestand und Ihre Konten, den Rest tragen Sie im Fragebogen selbst ein.
> Offen bis Dienstag, 6. Oktober, 18 Uhr. Ja. Nein. Später.

> Aufnahme im Workshop. Wir nehmen das Gespräch auf und übertragen es auf dem Rechner des Teams in Text. Aufgenommen wird nur, wenn alle Anwesenden zu Beginn zustimmen. Wenn nicht: Wir schreiben mit und lesen Ihnen wichtige Sätze zur Bestätigung vor.
> Offen bis zum Workshop am 13. Oktober. Ja. Nein. Später.

> Gespräch am Drehtag aufnehmen. Am Ende jedes Drehtags stellen wir höchstens zwei Fragen für Ihre nächsten Beiträge und nehmen die Antworten auf, damit wir sie nicht mitschreiben müssen. Ihre Clips selbst sind Teil des Auftrags und brauchen diese Einwilligung nicht. Wenn nicht: Wir schreiben Ihre Antworten mit und schicken sie Ihnen zur Bestätigung.
> Offen bis zum ersten Drehtag am 12. November. Ja. Nein. Später.

Der Folgesatz der KI-Verarbeitung nennt die Qualitätsfolge, weil ein Nein laut 02 E9 und 04 Z10 die ganze Kette auf den Regelpfad schaltet. Dass Rückfragen aus Vorlagen allgemeiner sind, folgt aus 02 (3.2, Regelpfad der Nachfrage); dass Entwürfe seine Formulierungen weniger genau aufnehmen, ist Ableitung, weil die Folgeschritte ohne Claude nur mit Regeln und Handarbeit des Teams arbeiten. Wie groß der Unterschied ist und ob er Termine verschiebt, ist eine Lücke; der Satz verspricht deshalb keine Dauer.

Die Mitschrift läuft heute lokal im Browser (KETTE_IST 2.3, BENCHMARK_ONBOARDING Kapitel 6). Der Text geht danach nur bei Ja zu Zweck 7 an die Claude-Kette; auch das steht im Block "Was mit Ihren Daten passiert". Die Frist, nach der die Aufnahme gelöscht wird, ist eine Lücke für den Owner und steht bis dahin nicht im Text.

Ansicht Ihr Stand, Zustand teilweise, wie im Muster:

> Sievering, zwischen Sieveringer Straße und Agnesgasse.
> Ihr Grätzl, aus Ihren Angaben vom September
> So haben wir Ihre Angaben gelesen. Im Fragebogen bestätigen oder ändern Sie jede Zeile. Erst danach arbeiten wir damit.
> Döbling, Währing, Hietzing. Bezirke in Ihrer Reihenfolge, aus Ihren Angaben
> Zinshaus, Anlegerwohnung, Eigentumswohnung Altbau, Denkmalschutz und Sanierung. Objektarten, aus Ihren Angaben
> 5 bis 10 Jahre. Ihre Erfahrung, aus Ihren Angaben. Das Jahr fragen wir nach.
> Website, LinkedIn, Instagram. Ihre Kanäle heute, aus Ihren Angaben
> Was uns noch fehlt: Ihr Logo als Datei, am besten vom Gestalter. Ihre verkauften Objekte, damit wir rechnen statt schätzen.
> Gelesen aus Ihren Angaben vom September und einem Porträt vom Foto-Termin.
> Fragebogen beginnen

### 3.9 Datenvertrag als Beispiel (Auszug, Markus)

```json
{
  "vorab": {
    "fakten": [
      { "feld": "bezirke", "wert": [{ "name": "1190 Döbling", "rang": 1, "n": null }, { "name": "1180 Währing", "rang": 2, "n": null }, { "name": "1130 Hietzing", "rang": 3, "n": null }], "quelle": "fragebogen-v1", "zeitraum": null, "sicherheit": "mittel" },
      { "feld": "graetzl", "wert": { "name": "Sievering", "beschreibung": "zwischen Sieveringer Straße und Agnesgasse", "strassen": [] }, "quelle": "fragebogen-v1", "sicherheit": "mittel" },
      { "feld": "kanaele", "wert": [{ "kanal": "website", "status": "aktiv" }, { "kanal": "linkedin", "status": "aktiv" }, { "kanal": "instagram", "status": "aktiv" }], "quelle": "fragebogen-v1 bestand", "sicherheit": "mittel" },
      { "feld": "abschluesse", "wert": [
        { "objekt": "Zinshaus", "ort": "Sieveringer Straße", "plz": "1190", "preis": 4200000, "flaeche": null, "datum": null },
        { "objekt": "Anlegerwohnung", "ort": null, "plz": "1180", "preis": 420000, "flaeche": 62, "datum": null },
        { "objekt": null, "ort": null, "plz": "1130", "preis": 1300000, "flaeche": 140, "datum": null }
      ], "quelle": "fragebogen-v1 abschluesse", "sicherheit": "mittel" }
    ],
    "kennzahlen": {
      "objekte12m": null, "verkauft12m": null, "preisband": null, "objektflussMonat": null,
      "graetzlAnteil": { "wert": null, "zaehlung": "1 von 3", "n": 3, "zeitraum": "letzte genannte Fälle", "quelle": "fragebogen-v1 abschluesse", "vorlaeufig": true }
    },
    "material": [
      { "art": "Fotos von dir", "anzahl": 1, "eignung": { "verwendbar": 1, "urteil": "Studio-Porträt, trägt Rohskizze und Profilbild" }, "rechte": { "status": "offen", "nachweis": null },
        "prognose": { "sicher": 0, "moeglich": 1, "situationen": 1, "regel": "11_bild 3.5" } },
      { "art": "Altes Logo", "anzahl": 0, "eignung": null, "rechte": { "status": "offen", "nachweis": null } }
    ],
    "logoAlt": null,
    "auftrittHeute": null,
    "wettbewerb": [],
    "kundenstimmen": [],
    "nachtraege": [],
    "luecken": [
      { "feld": "vorab.kennzahlen", "grund": "Bestand-Import leer", "zielschritt": 1, "schliesstIn": "Team" },
      { "feld": "vorab.logoAlt", "grund": "Datei fehlt", "zielschritt": 1, "schliesstIn": "Makler" },
      { "feld": "vorab.fakten.seit", "grund": "nur Spanne", "zielschritt": 2, "schliesstIn": "Fragebogen" },
      { "feld": "vorab.kennzahlen.graetzlAnteil", "grund": "Schätzung 6 bis 8 von 10, genannte Fälle 1 von 3", "zielschritt": 4, "schliesstIn": "Workshop" }
    ]
  },
  "auftrag": {
    "entscheider": { "mit": [], "_form": "mit[] je { rolle, art: entscheidet oder beraet, workshop, richtungstermin, reveal }; keine Namen, keine Kontaktdaten" },
    "termine": {
      "wochentage": ["Di", "Do"],
      "workshop": { "datum": "2026-10-13", "status": "bestätigt", "quelle": "hmAuftragTermine" },
      "richtungstermin": { "datum": "2026-10-20", "status": "bestätigt", "quelle": "hmAuftragTermine" },
      "wortLink": { "datum": "2026-10-22", "status": "vorgeschlagen", "quelle": "hmAuftragTermine" },
      "portraet": { "datum": "2026-10-29", "status": "vorgemerkt", "quelle": "hmAuftragTermine" },
      "reveal": { "datum": "2026-11-05", "uhrzeit": "10:00", "status": "bestätigt", "quelle": "hmAuftragTermine" },
      "rueckmeldungAb": { "datum": "2026-11-06", "uhrzeit": "11:00", "quelle": "hmAuftragTermine" },
      "freigabe": { "datum": "2026-11-10", "status": "vorgemerkt", "quelle": "hmRolloutPlan A" },
      "drehtag": { "datum": "2026-11-12", "status": "vorgemerkt", "quelle": "hmRolloutPlan A" },
      "uebergabe": { "datum": "2026-11-19", "status": "vorgemerkt", "quelle": "hmRolloutPlan A" },
      "umfeld": { "datum": "2026-11-20", "status": "vorgemerkt", "quelle": "hmRolloutPlan A" },
      "liveTag": { "datum": "2026-11-24", "uhrzeit": "11:30", "status": "vorgemerkt", "quelle": "hmRolloutPlan A", "reserve": { "datum": "2026-12-01", "quelle": "hmRolloutPlan B" } },
      "rueckblick": { "datum": "2027-01-07", "stichtag": "2026-12-24", "quelle": "hmRolloutPlan A" },
      "gerechnetAm": "2026-10-05"
    },
    "einwilligungen": [
      { "zweck": "profile", "status": "offen", "frist": "2026-10-06T18:00", "gefragtIn": "gespraech", "fassung": null, "datum": null, "nachFrist": "nachtrag" },
      { "zweck": "workshopAufzeichnung", "status": "offen", "frist": "2026-10-13T09:00", "gefragtIn": "gespraech", "fassung": null, "datum": null },
      { "zweck": "fremdbild", "status": "offen", "frist": "2026-10-09", "gefragtIn": "gespraech", "fassung": null, "datum": null },
      { "zweck": "objektfotos", "status": "offen", "frist": "2026-10-27", "gefragtIn": "gespraech", "fassung": null, "datum": null },
      { "zweck": "revealAufzeichnung", "status": "offen", "frist": "2026-11-03", "gefragtIn": "gespraech", "fassung": null, "datum": null },
      { "zweck": "drehtagGespraech", "status": "offen", "frist": "2026-11-12T09:00", "gefragtIn": "gespraech", "fassung": null, "datum": null },
      { "zweck": "kiAntworten", "status": "offen", "frist": "2026-10-06T18:00", "gefragtIn": "gespraech", "fassung": null, "datum": null, "nachFrist": "abDann" },
      { "zweck": "beispieleFremd", "status": "offen", "frist": "2026-10-09", "gefragtIn": "gespraech", "fassung": null, "datum": null }
    ]
  }
}
```

`rechte.status` des Porträts steht auf "offen", bis das Team es mit einem `nachweis` aus der festen Liste bestätigt. `nachFrist: "nachtrag"` bei Zweck 1 heißt: Ein Ja nach der Frist schreibt nur in `vorab.nachtraege` (D13). `nachFrist: "abDann"` bei Zweck 7 heißt: Ein spätes Ja erlaubt Claude-Aufrufe ab dem Zeitpunkt der Entscheidung, nichts Abgeschlossenes wird still neu gerechnet. `gefragtIn` ist bei allen acht `gespraech`; die Werte `link` und `einladung` bleiben im Vokabular nur, damit Einträge älterer Fassungen lesbar bleiben. Das Feld `_form` ist nur Erklärung im Beispiel, nicht Teil des Schemas. Die Regel nimmt nichts als geklärt an. Die Einwilligungen sind im Beispiel offen, weil der Seed sie nicht kennt; im Betrieb steht nach dem Gespräch `ja` oder `nein` mit Datum und Fassung, oder `offen` mit Frist. Die Uhrzeit 10 Uhr für den Reveal ist aus `15_reveal.md` übernommen.

---

## 4. Fragen an den Makler

Alle Fragen fallen im Gespräch oder im Link. Jede hat ein Zielfeld, und eine andere Antwort ändert das Feld und den weiteren Ablauf (Probe: Antwort tauschen, Ausgang vergleichen).

| Nr. | Frage | Feld | Was eine andere Antwort ändert | Warum sie nötig ist |
|---|---|---|---|---|
| F1 | "Entscheidet jemand mit über Ihren Auftritt, etwa Partner, Teilhaberin oder Büroleitung? Kann diese Person bei Workshop, Richtungstermin und Reveal dabei sein?" | `auftrag.entscheider.mit[]` je `{rolle, art entscheidet oder beraet, workshop, richtungstermin, reveal}`; kein Name, keine Kontaktdaten, die Einladung leitet der Makler selbst weiter (3.2) | Teilnehmer und die Einladungen, die im Link zum Weiterleiten erscheinen, in Schritt 4, 6 und 15, Sprecher `dritte` im Workshop, gemeinsame Rückmeldung in 15, Umfeld in 16. Ohne Zusage zum Richtungstermin oder Reveal wird der Termin verschoben, nicht ohne die Person gehalten | Premium-Prozesse setzen eine Person mit Entscheidungsrecht voraus ([GV Brand Sprint, R8 2.1](https://www.reforge.com/blog/brief-how-to-define-your-brand-with-gv-s-3-hour-sprint)). Wer erst am Ende dazukommt, urteilt ohne den Maßstab, und stark gebundene Menschen bewerten eine veränderte Marke zunächst schlechter ([Walsh, Winterich, Mittal 2010, Journal of Product and Brand Management 19(2)](https://doi.org/10.1108/10610421011033421)). Kein System weiß es. |
| F2 | "Hier ist Ihr ganzer Plan. Fest machen wir heute Workshop, Richtungstermin und Reveal; Porträt-Termin, Drehtag, Übergabe und Live-Tag halten wir vor. Passt das, oder verschieben wir einen Tag? An welchen Wochentagen haben Sie Vormittage frei?" | `auftrag.termine`, `auftrag.termine.wochentage` | Datumswerte aller vierzehn Momente, weil der Plan neu gerechnet wird; Reihenfolge der Arbeit im Team; Erinnerungen | Ehrliche Dauer und fester Rahmen senken Abbruch (Galesic und Bosnjak). Der Vorschlag kommt fertig vom Team, der Makler plant nicht, er bestätigt oder verschiebt. |
| F3 | Einwilligungen, alle acht im Gespräch, je Ja, Nein oder Später mit Frist vor der ersten Nutzung (Tabelle unten) | `auftrag.einwilligungen[]` | Welche Quellen T2 lesen darf, ob Claude in der Kette mitliest oder alles im Regelpfad läuft, ob der Workshop aufgenommen wird, ob der Fremdbild-Link entsteht, ob fremde Beispiele gespeichert werden dürfen, ob eigene Objekte im Feed erscheinen, ob der Reveal aufgezeichnet wird, ob das Gespräch am Drehtag aufgenommen wird | Einwilligung vor jeder Nutzung (UNIO-Regel, Zerlegung). Nur er kann sie geben. |
| F4 | "Haben Sie Ihr Logo als Datei vom Gestalter? Und dürfen Sie Ihre Fotos für Werbung nutzen, etwa laut Rechnung oder Freigabe des Fotografen?" | `vorab.logoAlt.datei`, `vorab.material[].rechte {status, nachweis}` | Ob Schritt 3 am echten Logo urteilen kann; ob Fotos in Entwürfen erscheinen dürfen (`status`); die Porträt-Prognose (`sicher` gegen `moeglich`). Gespeichert wird nur `status` geklärt oder offen und `nachweis` aus der festen Liste in 3.3, kein Name eines Fotografen | Das Material ist heute ohne Wirkung (KETTE_IST 2.1). Die Rechte an Fotos kennt nur er. Die frühere Frage "Wer hat Ihre Fotos gemacht?" lud zu einem Namen ein, den kein Feld braucht. |
| F5 | "Bei Ihren letzten Aufträgen: Welche anderen Makler waren noch im Gespräch? Bis zu zwei." | `vorab.wettbewerb` (Auswahl) | Welche Auftritte auf der Karte liegen | Portal-Präsenz zeigt, wer sichtbar ist, nicht gegen wen er wirklich antritt. Frage nach konkreter Vergangenheit statt Meinung ([Critical Incident, NN/g](https://www.nngroup.com/articles/critical-incident-technique/)). Schritt 2 fragt mit `alternative` die Art der Alternative aus Sicht des Kunden, keine Namen; hier geht es um die Karte, dort um `positionierung.andersAls`. |

**Die acht Einwilligungen, alle im Gespräch gefragt.** Der Katalog ist geschlossen: Ein Schritt, der einen neuen Zweck braucht, bittet Schritt 1 um einen Eintrag hier; er fragt ihn nicht selbst. Die Nummern 1 bis 6 bleiben wie in den früheren Fassungen, damit Verweise der Nachbarn gültig bleiben. Die Rechtsgrundlage je Zweck ist eine offene Lücke für den Owner (8.5 Punkt 2); dieses Dokument ist keine Rechtsberatung.

| Nr. | Zweck | Gefragt | Frist | Wofür | Wenn nicht | Abnehmer |
|---|---|---|---|---|---|---|
| 1 | öffentliche Profile lesen | im Gespräch | Werktag 1, 18 Uhr (Markus Di 06.10.); bis dahin liest T2 Bestand und Konten, danach ohne Ja nur diese | Website, Google-Unternehmensprofil, Instagram-Bio, eigene Inserate für Fakten, Bio in `auftrittHeute`, Kundenstimmen | Fakten nur aus Bestand und Konten; er trägt im Fragebogen mehr selbst ein; keine Kundenstimmen aus Bewertungen | 1, 2 (über `vorab.nachtraege`, D13) |
| 2 | Workshop aufzeichnen | im Gespräch | Beginn des Workshops | Aufnahme mit Sprecher und Zeit, lokale Mitschrift. **Die Aufnahme startet nur, wenn alle Anwesenden zu Beginn zustimmen**, analog zu `15_reveal.md` Q9; Mitentscheider lesen den Aufnahmehinweis in der Einladung, die der Makler weiterleitet | Team schreibt mit und liest Sätze zur Bestätigung vor (`04_workshop.md`, Notfall ohne Einwilligung) | 4 |
| 3 | Fremdbild-Link | im Gespräch; der Fremdbild-Teil in Schritt 2 liest den Stand und fragt nicht selbst | Ende der Link-Bearbeitung (Markus Fr 09.10.) | Sein Ja erlaubt nur, den Link zu erzeugen, den er selbst teilt. **Die Antwortenden stimmen auf der Fremdbild-Seite selbst zu**, bevor sie antworten; ihre Antworten sind ihre Daten, nicht seine | kein `fremdbild`; `persoenlichkeit` wird nur gegen den Workshop geprüft, als Lücke markiert | 2 |
| 4 | Objektfotos zeigen | im Gespräch; ist er noch offen, erinnert nach dem Richtungstermin eine Nachricht im Link mit dem Zweck vor Augen | 7 Werktage vor dem Reveal (bei Markus Di 27.10.) | eigene Objekte mit geklärten Bildrechten in Anwendungen, Feed-Vorschlag, Markenbuch, Präsentation, Übergabe | Lückenkacheln statt eigener Objekte, keine Objekt-Serie im Start | 10, 13, 14, 15, 16 |
| 5 | Reveal aufzeichnen | im Gespräch; die Einladung zum Reveal nennt nur den Stand und "Ändern" | 2 Werktage vor dem Reveal (Markus Di 03.11.) | Nachlese für Partner und Büro (R8 4 Punkt 13); Aufnahme nur mit Zustimmung aller Anwesenden (`15_reveal.md` Q9) | keine Aufzeichnung in `uebergabe` | 15, 16 |
| 6 | Gespräch am Drehtag aufnehmen | im Gespräch; die Einladung zum ersten Drehtag nennt nur den Stand und "Ändern" | Beginn des ersten Drehtags (Markus Do 12.11.); gilt danach für die monatlichen Drehtage in Schritt 17, bis er sie ändert | Tonaufnahme der höchstens zwei Stoff-Fragen am Ende des Drehtags (`17_betrieb.md`, Stoff-Fragen im Termin, F17-2), übertragen in Text als Selbstauskunft. Die Clips selbst sind der beauftragte Liefergegenstand und brauchen diese Einwilligung nicht; Dritte im Bild regelt Schritt 17 mit V12 | Das Team schreibt die Antworten mit und schickt sie zur Bestätigung in den Link | 16, 17 |
| 7 | KI-Verarbeitung (`kiAntworten`) | im Gespräch, vor T2 | Werktag 1, 18 Uhr (Markus Di 06.10.), wie Zweck 1; bis dahin kein Claude-Aufruf, T2 arbeitet im Regelpfad (8.2) | Claude liest Texte ohne Namen Dritter in der ganzen Kette: freigegebene Quelltexte im Dossier (nur zusammen mit Zweck 1), Antworten im Fragebogen (02 D15), Workshop-Mitschrift (nur zusammen mit Zweck 2, 04 Z10) und `dossier()` der Folgeschritte | Die ganze Kette läuft im Regelpfad (02 E9, 04 Z10): Werte im Dossier trägt das Team von Hand ein, Rückfragen im Fragebogen kommen aus festen Vorlagen, Mitschrift und Antworten wertet das Team ohne Claude aus. Folge für die Qualität, im Satz an den Makler genannt: allgemeinere Rückfragen, Entwürfe, die seine eigenen Formulierungen weniger genau aufnehmen (Ableitung, Ausmaß Lücke). Ein spätes Ja wirkt ab dann, nichts wird still neu gerechnet | 1, 2, 4 und jeder Schritt mit Claude-Aufruf oder `dossier()` |
| 8 | Beispiele fremder Auftritte kurz speichern und deuten (`beispieleFremd`) | im Gespräch | Ende der Link-Bearbeitung (Markus Fr 09.10.), vor der Bildwahl in Schritt 3 | bis zu drei fremde Auftritte als Link oder Screenshot bei "Nicht ich", höchstens 14 Tage gespeichert, nur ein Merkmal wird herausgelesen, danach gelöscht (03 3.7). Ob seine Einwilligung für Daten Dritter in den Beispielen reicht, ist offen | nur der Weg "Beschreiben", der nichts Fremdes speichert | 3 |

**Ein späteres Ja zu Zweck 1.** Nach der Frist bleibt die Einwilligung änderbar. Ein Ja danach wirkt, aber nie still: Das Team liest die Quellen, die Regel prüft die Belege wie in T2, und jeder neue Wert landet in `vorab.nachtraege[] {feld, wert, quelle, beleg, datum}`, nicht in `vorab.fakten` (D9). Das Team sieht ihn im Team-Heute. Schritt 2 zeigt ihn unter einer noch nicht beantworteten Fakt-Zeile als Vorschlag mit Sicherheit "niedrig", nicht vorgewählt; eine schon bestätigte Zeile bleibt, wie sie ist. Nach dem Ende des Fragebogens füllt ein spätes Ja nur noch `vorab.auftrittHeute.bio` für die Schritte 3 bis 5. Damit hat "Später" eine Wirkung, die er überblicken kann: eine Nacht Bedenkzeit ohne Verzug, danach ein Nachtrag statt einer stillen Änderung. Bei Zweck 7 gilt dieselbe Haltung: Ein spätes Ja erlaubt Claude ab der Entscheidung, etwa für die Nachfragen im Fragebogen oder die Mitschrift des Workshops; das abgezeichnete Dossier und schon beantwortete Teile bleiben, wie sie sind.

**Warum die Clips am Drehtag keinen eigenen Zweck brauchen, das Gespräch aber schon.** Die Clips sind das, wofür er den Drehtag bucht: Sie werden gedreht, um nach seiner Freigabe je Beitrag veröffentlicht zu werden (Schritt 17, `beitrag[].freigabe`). Eine zweite Einwilligung dafür hätte keine Folge, die eine eigene Entscheidung trüge. Die Tonaufnahme der Stoff-Fragen dient dagegen einem anderen Zweck, Themenvorrat für spätere Blöcke, und geht als Text in die Kette; das entspricht der Aufnahme im Workshop und bekommt deshalb dieselbe Form mit eigener Frist und Wenn-nicht-Satz.

Die Einwilligung "Porträts für die Team-Bildwelt" aus dem Vertrag entfällt (5.3 D3): Porträts gehen nie an ein Bildmodell, das bleibt auch mit Einwilligung verboten (`CLAUDE.md`, keine KI-Bilder erkennbarer Personen). Ein Porträt neben Stimmungsbildern im internen Arbeitsmaterial ist Arbeit am beauftragten Zweck und hat keine Folge, die eine eigene Entscheidung trüge. Dasselbe gilt für Porträts des Maklers in seinem eigenen Feed (Schritt 17): Sie sind der Auftrag, gesperrt wird nur über `vorab.material[].rechte.status`. Eine Frage ohne Wirkung stellt dieser Schritt nicht.

**Abgeleitet statt gefragt: welche Fragen des alten Fragebogens der Import ersetzt.**

| Alter Key | Neue Quelle | Typische Sicherheit | Im Fragebogen v2 |
|---|---|---|---|
| `seit` | Website oder LinkedIn mit Beleg, ältestes Objekt als Untergrenze | mittel bis niedrig | bestätigen |
| `immotypen`, `immotypen_frei` | Feld Art im Bestand | hoch ab 8 Objekten | bestätigen |
| `bezirke`, `bezirke_frei` | PLZ im Bestand, Rang gerechnet | hoch ab 8 Objekten | Rang bestätigen, bis 3 |
| `graetzl` | Straßen aller Objekte, Name vom Team | mittel | bestätigen, mit Straßen |
| `graetzl_anteil` | gerechnet aus verkauften Objekten in den bestätigten Straßen | hoch ab 5 verkauften | entfällt als Frage |
| `bestand` | Konten, Material, Lead-Radar | hoch | entfällt |
| `follower` | Insights, Screenshot, Lead-Radar | je Quelle | entfällt, nur intern |
| `kanaele` | Einrichtung Konten, Insights | hoch | bestätigen, Vokabular aktiv, aufbauen, nein |
| `kundensatz` | nicht ersetzt; Kundenstimmen gehen als Zuordnung an `fremdbild` | | offen gefragt (`02_fragebogen.md` D2) |
| `vorbilder` | nicht ersetzt | | entfällt; `nichtIch` in Schritt 3 |
| `behalten` | nicht ersetzt, vorbereitet durch `logoAlt` | | verlegt nach Schritt 3, am echten Logo |
| `abschluesse`, Teil Objekt, Ort, Preis, Fläche | `vorab.fakten` feld `abschluesse` aus dem Bestand | hoch | Schritt 2 bestätigt in den Fall-Karten und fragt nur, was den Ausschlag gab |

**Bewusst nicht gefragt.** Ziele (Notiz, Frage in Schritt 2), Du oder Sie gegenüber Kunden (Schritt 2, `anredeJeKanal`), Eigentümer oder Käufer (Schritt 2, ohne Startwert), Kamera-Komfort (Schritt 2 `formate`, Schritt 4 Probedreh), Follower (gelesen), gewünschte neue Kanäle (Schritt 2 `kanaele`).

---

## 5. Eingang und Ausgang

### 5.1 Eingang

| Vertrag | Was gelesen wird | Ort im Code heute |
|---|---|---|
| Extern: Erstgespräch | Entscheider, Termine, Wochentage, Ziele als interne Notiz | neu (Gespräch, T1) |
| Extern: Bestand-Import nach `HM_IMPORT_FELDER` | Objekte: Titel, Adresse, PLZ, Ort, Preis, Fläche, Art, dazu neu Status und Daten (D2); Kontakte werden nicht gelesen (D1) | `wb-werkzeuge.jsx` `HM_IMPORT_FELDER` Zeile 125, `hmPruefen`, Ablage `bestand[mid].objekte` |
| Extern: Einrichtung, Lead-Radar, Insights | Konten-Wahl, Website und Follower aus dem Radar, Beitragsdaten aus dem Insights-Export | `einrichtung_daten[mid].konten` (`wb-einrichtung.jsx` Zeile 110 bis 126), `leads` (`wb-betrieb.jsx`), `hmInsightsLesen` (`wb-produktion.jsx`) |
| Extern: Material nach `HM_MATERIAL_ARTEN` | Altes Logo, Fotos von dir, Objektfotos, Screenshot von Profilen; Inspiration nur als Inventar | `branding[mid].material` (`wb-marke.jsx`), `portraits[mid]` (`wb-foto.jsx`); Arten in `wb-os-data.jsx` Zeile 92 |
| Extern, nur nach Einwilligung 1 | Website, Google-Unternehmensprofil, Instagram-Bio, eigene Inserate | neu; Regelpfad: das Team fügt den Text je Quelle mit Adresse und Abrufdatum in `AuftaktTeam` ein (8.2); optional liest der Server die Adresse selbst, wenn der Owner das freigibt (8.5 Punkt 5). Keine Konten des Maklers bei fremden Werkzeugen |
| Extern: Register der Dauer und `hmRolloutPlan` | Setzungen und Messungen der Schritte 1 bis 16; Plan nach dem Reveal | `HM_DAUER_REGISTER` (neu), `wb-freigabe.jsx` (Schritt 16) |

### 5.2 Ausgang

| Feld | Struktur | Erzeugt von | Abnehmer |
|---|---|---|---|
| `auftrag.entscheider` | `{mit[] {rolle, art entscheidet oder beraet, workshop, richtungstermin, reveal}}`; kein Name, keine E-Mail, keine Telefonnummer; Einladungen leitet der Makler weiter | Team aus F1 | 4, 6, 14, 15, 16 |
| `auftrag.termine` | `{wochentage[], workshop, richtungstermin, wortLink, portraet?, reveal, rueckmeldungAb, freigabe, drehtag, uebergabe, umfeld, liveTag {…, reserve}, rueckblick, gerechnetAm}` je `{datum, uhrzeit?, ort?, status vorgeschlagen, bestätigt, vorgemerkt oder entfällt, quelle hmAuftragTermine oder hmRolloutPlan A oder B}` | Regel und `hmRolloutPlan`, Makler bestätigt (F2) | 2, 3, 4, 6, 7, 8, 11, 13, 14, 15, 16 |
| `auftrag.dauer` | `[{aufgabe, schritt, minuten, art setzung, annahme oder gemessen, n, quelle}]` plus `summe {minuten, anzeige, davonDrehtag}`; nur aus dem Register | `hmAuftragDauer` | 2, 4, 15 |
| `auftrag.einwilligungen[]` | `{zweck, status ja, nein oder offen, frist, gefragtIn gespraech, fassung, datum, nachFrist?}` für acht Zwecke, geschlossener Katalog: profile, workshopAufzeichnung, fremdbild, objektfotos, revealAufzeichnung, drehtagGespraech, kiAntworten, beispieleFremd | Makler im Link während des Gesprächs (F3); nur Schritt 1 schreibt, Änderungen über "Ändern" in derselben Ansicht | 2, 3, 4, 10, 11, 13, 14, 15, 16, 17 |
| `vorab.fakten[]` | `{feld, wert, quelle, zeitraum, n, sicherheit, hinweis?}` für bezirke, graetzl, immotypen, seit, kanaele, abschluesse; `wert` typisiert je Feld (8.2) | Regeln, Team, Claude mit Beleg | 2, 3, 11 |
| `vorab.kennzahlen` | `{objekte12m, verkauft12m, graetzlAnteil, preisband, objektflussMonat}` je `{wert, n, zeitraum, quelle}`, `graetzlAnteil` mit `vorlaeufig` | Regeln | 2, 4, 5, 6, 7, 12, 13 |
| `vorab.material[]` | `{art, anzahl, eignung {verwendbar, urteil}, rechte {status geklärt oder offen, nachweis aus fester Liste}, prognose? {sicher, moeglich, situationen, regel}}`; kein Name eines Fotografen | Regel zählt, Team urteilt | 2, 3, 4, 6, 9, 10, 11, 12, 13, 14, 15 |
| `vorab.logoAlt` | `{datei, format vektor oder pixel, farben[] {hex, anteil}, schriftVermutung {klasse, name, sicherheit}, elemente[] {element, schonWiedererkennbar}}` | Regel für Farben und Format, Team für den Rest | 3, 9, 10 |
| `vorab.auftrittHeute` | `{bio wörtlich, kacheln Material-ID geschwärzt, geschwaerzt ja, kachelnNotiz, follower {kanal, zahl, datum, quelle}}`; follower nur intern | Team, Regel | 2, 3, 4, 5, 7, 13, 14, 16 |
| `vorab.wettbewerb[]` | `{poolId, kennung, typ, unio, geteiltMit, x, y, konventionNotiz, gesichtetAm}`; `fundort` nur im Pool der geschützten Instanz, nie im Claude-Dossier, nie im Seed | Team | 4, 5, 6, 7, 9, 14, 15 |
| `vorab.kundenstimmen[]` | `{text wörtlich, quelle, datum, freigabe}` | Team | 2, 4, 5, 7, 14 |
| `vorab.luecken[]` | `{feld, grund, zielschritt, schliesstIn}` | Regel, Team, Claude-Vorschlag | 2 (Zustand ohne Bestand und Q3), 4 |
| `vorab.nachtraege[]` | `{feld, wert, quelle, beleg, datum}`; nur Werte, die nach der Frist von Zweck 1 oder nach dem Start des Fragebogens gelesen wurden | Regel, Team | 2 (Vorschlag unter offener Fakt-Zeile) |

Nachbarn, die ein Feld dieser Liste heute nicht in ihrem Eingang führen, stehen in 5.4. Keine Spalte nennt einen Abnehmer, der das Feld nicht braucht; wo ich einen Nachbarn ergänzen musste, steht der Grund dort.

### 5.3 Abweichungen vom Vertrag, begründet

| Nr. | Abweichung | Begründung | Folge für Nachbarn |
|---|---|---|---|
| D1 | **Kontakte werden nicht gelesen**, obwohl der Eingang "Kontakte mit Bemerkung" nennt | Keines der Ausgangsfelder braucht sie. Bemerkungen wie "Erbschaft" oder "Verkauf Wohnung 2027" (`HM_IMPORT_BEISPIEL`) sind Daten Dritter, die für den Vertrieb erhoben wurden; sie für Markenarbeit zu lesen, wäre eine neue Nutzung ohne Nutzen für den Ausgang. Datensparsamkeit (Art. 5 [DSGVO](https://eur-lex.europa.eu/eli/reg/2016/679/oj), Einordnung offen). | keine |
| D2 | **Import-Felder für Objekte erweitert**: `status`, `eingang` (Vermarktungsbeginn), `abschluss` (Datum); `adresse` wird gespeichert; dazu `hwb`, `fgee`, `klasse` | `verkauft12m`, `graetzlAnteil` und `objektflussMonat` sind ohne Status und Datum nicht rechenbar; `HM_IMPORT_FELDER` kennt sie heute nicht, und `hmPruefen` verwirft die Adresse bei Objekten. Energiekennzahlen braucht Schritt 13 für die `objektRegel`. | Schritt 13 liest Energiekennzahlen aus dem Import |
| D3 | **Acht Zwecke statt der fünf im Vertrag**: "Porträts für die Team-Bildwelt" entfällt, "Reveal aufzeichnen", "Gespräch am Drehtag aufnehmen", "KI-Verarbeitung" (`kiAntworten`) und "Beispiele fremder Auftritte" (`beispieleFremd`) kommen dazu. Dazu `status offen` mit `frist`, `gefragtIn` und `fassung`, alle an einer Stelle im Gespräch gefragt | Ohne die Porträt-Einwilligung fällt nichts weg (4), eine Frage ohne Wirkung gibt es nicht; Porträts im eigenen Feed sind der Auftrag. Schritte 15 und 16 nutzen eine Aufzeichnung des Reveals, Schritt 17 nimmt die Stoff-Fragen am Drehtag auf; beides deckt der Vertrag nicht ab. Die Clips des Drehtags sind der Auftrag und kein Zweck (4). `kiAntworten` verlangen 02 D15 und 04 Z10 für die ganze Kette, `beispieleFremd` verlangt 03 (3.7, Hinweis 13). Ein Ort statt vier, weil verteilte Fragen ermüden, Zwecke an Schritt 1 vorbeiwachsen und die KI-Frage sonst nach dem ersten Claude-Aufruf käme (A7, Kettenprüfung). | 11, 13 und 17 streichen den Bezug auf die Porträt-Einwilligung; 17 liest `drehtagGespraech`; 2, 3, 4, 15 und 16 fragen keine Einwilligung selbst, sie lesen (5.4) |
| D4 | **`auftrag.termine` mit allen vierzehn Momenten**, nach dem Reveal übernommen aus `hmRolloutPlan`, mit Ausweichtag für den Live-Tag und vorgemerktem Porträt-Termin und Drehtag | Der Vertrag nennt vier Termine, das Erlebnis verlangt den ganzen Ablauf mit ehrlicher Dauer. Ein zweiter Planer würde abweichende Daten erzeugen, wie in der ersten Fassung (Live-Tag 17.11. gegen 24.11. in Schritt 16). | 16 liefert `hmRolloutPlan` mit der Schnittstelle aus 8.1 |
| D5 | **Kennzahlen mit `n`, `zeitraum`, `quelle`** statt bloßer Werte | Schritt 7 baut daraus `beweise` mit Quelle und Prüfstatus; eine Zahl ohne Menge und Zeitraum wäre ein unbelegter Beleg. | keine |
| D6 | **`auftrag.entscheider` mit Teilnahme an Workshop, Richtungstermin und Reveal** | Im Richtungstermin wird die Richtung gewählt (Schritt 6). Ein Mitentscheider, der dort fehlt, öffnet die Wahl beim Reveal wieder. Schritt 4 liest die Teilnahme am Workshop (`04_workshop.md` 5.1). | keine, 4, 6, 15 lesen das Feld schon |
| D7 | **`vorab.wettbewerb` mit `poolId`, `typ`, `unio`, `geteiltMit`**, `fundort` nur im Pool | Schritt 5 leitet die Konvention je Art von Auftritt ab und darf UNIO-Makler nicht als Branchenkonvention zählen; Schritt 6 sieht, wenn zwei UNIO-Makler dieselbe Konvention teilen; Schritt 15 holt die Beiträge für den Fremdtest zwei Werktage vorher live über `fundort`, ohne dass Bilder in `vorab` liegen. | 6 und 15 in 5.4 |
| D8 | **Letzte Abschlüsse als `vorab.fakten` feld `abschluesse`**, dieselbe Struktur wie `02_fragebogen.md` D5: `wert[bis 3] {objekt, ort, plz, preis, flaeche, datum}`. Festgelegt: `objekt` volle Bezeichnung aus `HM_IMMOTYPEN`; `ort` Straßenname ohne Hausnummer; `plz`; `preis` und `flaeche` wie im Import, weil der Makler sie in seinen Fall-Karten sieht; `datum` als Monat. **Ins Claude-Dossier** gehen `objekt`, Bezirk aus `plz`, Jahr, `preis` auf zwei geltende Stellen gerundet (4,2 Mio., 420.000), `flaeche` auf 5 m² gerundet, `ort` nur, wenn im Bestand mindestens 2 Objekte in dieser Straße liegen. Nie Hausnummer, nie Verkäufer oder Käufer | Das Feld `vorab.letzteAbschluesse` der ersten Fassung und D5 in Schritt 2 hätten dieselben Fälle zweimal verschieden abgelegt. Die Rundung für Claude folgt daraus, dass Straße, genauer Preis und Monat zusammen eine Transaktion wiedererkennbar machen können (Ableitung). Eigene Worte des Maklers in `antworten` folgen den Regeln von Schritt 2. | 2: D5 um diese Festlegung ergänzt |
| D9 | **`vorab.stand` ist interner Zustand, kein Ausgang**; nach der Abzeichnung ändert sich `vorab.fakten` nicht mehr still | `vorab.stand {fertigAm, abgezeichnetVon}` steuert nur, wann Ansicht 3 öffnet, kein Nachbar braucht es. Neue Werte nach der Abzeichnung, aus dem Import oder aus einem späten Ja zu Zweck 1, schreibt die Regel nicht in `vorab.fakten`, sondern in `vorab.nachtraege` (D13) und meldet sie im Team-Heute; bestätigte Antworten in Schritt 2 bleiben unberührt. | siehe D13 |
| D10 | **`vorab.luecken` mit `zielschritt` und `schliesstIn`** | Der Workshop braucht die Lücken als Leitfaden, der Zustand "ohne Bestand" zählt die Lücken mit Zielschritt 2. | keine |
| D11 | **`auftrag.dauer` aus einem Register** mit Art und Quelle je Aufgabe, dazu die Summe | Die Dauer hat so genau eine Quelle, den Schritt, dem die Aufgabe gehört (3.6). | jeder Schritt meldet seine Setzung mit `hmDauerSetzen` |
| D12 | **`kanaele` im Vokabular von Schritt 2** (aktiv, aufbauen, nein), ruhende Konten als `aufbauen` mit `hinweis` | "geplant", "keiner" und "ruhend" der ersten Fassung gab es in Schritt 2 nicht. | 2 zeigt den Hinweis unter dem vorbelegten Wert (5.4) |
| D13 | **`vorab.nachtraege[]` als zusätzlicher Ausgang** | Ohne eigenes Feld hätte ein spätes Ja zu Zweck 1 entweder keine Wirkung (Scheinwahl) oder würde `vorab.fakten` still ändern (Bruch von D9). Der Nachtrag ist sichtbar, belegt und wirkt nur als Vorschlag. | 2 zeigt Nachträge unter offenen Fakt-Zeilen als Vorschlag, nicht vorgewählt (5.4) |
| D14 | **`auftrag.entscheider` ohne Namen und Kontaktdaten**, `vorab.material[].rechte` ohne Namen eines Fotografen | Die zweite Fassung speicherte `name nur intern`. Kein Abnehmer braucht den Namen: Schritt 4 braucht den Sprecher `dritte` mit Rolle, Schritt 15 die Teilnahme. Wer einlädt, bräuchte Kontaktdaten; das entfällt, weil der Makler selbst weiterleitet. | 4 und 15 nennen Mitentscheider nur mit Rolle |
| D15 | **Kein Claude-Aufruf in T2 vor Ja zu Zweck 7**; das Claude-Dossier braucht Ja zu Zweck 1 und Zweck 7 | Die dritte Fassung schickte in T2 schon Texte an Claude, bevor die KI-Frage in Schritt 2 gestellt wurde (Kettenprüfung). Der Regelpfad (8.2) liefert dieselbe Struktur, deshalb kostet das Warten nur Teamzeit, keinen Termin. | 2 liest `kiAntworten` nur noch (5.4) |

### 5.4 Korrekturbedarf an Nachbarn und Zerlegung

**Nachfolgerliste von Schritt 1 neu:** 2, 3, 4, 5, 6, 7, **8**, 9, 10, 11, 12, 13, **14**, 15, 16, 17. Schritt 8 liest `auftrag.termine` für das Datum des Reveals (`08_stimme.md` 3.4). Schritt 14 führt Schritt 1 ausdrücklich als Vorgänger (`14_markenbuch.md` 5.2). Schritt 17 liest `auftrag.einwilligungen` (Objektfotos zeigen, Gespräch am Drehtag aufnehmen; `17_betrieb.md` Zeile 129 und 623). Den laufenden Bestand-Import, den der Vertrag von 17 als "1: laufender Bestand-Import" führt, liefert Schritt 1 nicht: Er ist eine externe Quelle, die 17 direkt liest. Die Zerlegung ergänzt 8 und 14 in `an` von Schritt 1, 1 in `von` von Schritt 8 und benennt den Eingang von 17 in "Extern: laufender Bestand-Import" um.

| Nachbar | Was zu ergänzen ist | Grund |
|---|---|---|
| 00_ZERLEGUNG | `an` von 1 um 8 und 14; Ausgang `auftrag.termine` mit allen Momenten; acht Einwilligungen nach D3, alle im Auftakt gefragt; Ausgang `vorab.nachtraege` (D13); Eingang von 17 "1: laufender Bestand-Import" wird "Extern: laufender Bestand-Import", dazu "1: auftrag.einwilligungen" | Symmetrie, D3, D4, D13 |
| 02 | D5 um die Festlegung aus D8 ergänzen (in `02_fragebogen.md` bereits eingetragen); `vorab.auftrittHeute` ist fester Eingang (Bio als Hinweis in F14, `02_fragebogen.md` Zeile 285 und 500), `vorab.kundenstimmen` ebenso (Zuordnung in F1, Zeile 333 und 497); F22 zeigt bei `hinweis` den letzten Beitrag; Schritt 2 fragt keine Einwilligung mehr selbst: Die KI-Frage auf der Eröffnung (D15) und die Fremdbild-Frage im Abschluss (D20) entfallen, 2 liest `kiAntworten` und `fremdbild` aus `auftrag.einwilligungen` und zeigt bei `offen` nur einen Satz mit dem Link auf die Ansicht Einwilligungen; die Bitte um den siebten Eintrag in `HM_EINWILLIGUNGEN` ist erledigt (Zweck 7); die Fremdbild-Seite holt die Zustimmung der Antwortenden weiter selbst ein; Eingang `vorab.luecken` für Q3 und den Zustand ohne Bestand; neuer Eingang `vorab.nachtraege` als Vorschlag unter offenen Fakt-Zeilen | D8, D12, D3, D13, D15, M9 |
| 03 | Zweck `beispieleFremd` ist als Zweck 8 aufgenommen (Hinweis 13 in 5.3 von 03 erledigt); Bildschirm 13 liest den Stand und bietet ohne `ja` nur "Beschreiben" | D3 |
| 04 | Technik-Check: Aufnahme startet nur mit Zustimmung aller Anwesenden, zusätzlich zur Einwilligung des Maklers; vermerkt wird nur ja oder nein je Anwesendem, Mitentscheider nur mit Rolle; das Transkript geht nur bei `ja` zu Zweck 7 an Claude (Z10 erledigt, Zweck 7 deckt die ganze Kette) | 4, Einwilligung 2 und 7, D14 |
| 05 | `vorab.auftrittHeute` und `vorab.kundenstimmen` als feste Eingänge führen (`05_einsicht.md` Zeile 89 und 91 nutzen beide) | Abnehmerspalte |
| 06 | Kohortenprüfung liest `vorab.wettbewerb[].geteiltMit`; Eingang `vorab.wettbewerb` ausdrücklich | Pool, D7 |
| 07 | Beleg aus `graetzlAnteil` kennzeichnen: "Grätzl vom Makler bestätigt, Anteil aus [n] verkauften Objekten" | Zirkelschluss aufgelöst (3.3) |
| 10 | Eingang `auftrag.einwilligungen` (Objektfotos in Anwendungen wie dem Schild) | Einwilligung 4 |
| 11 | Eingang "Porträts für die Team-Bildwelt" streichen; `bild.portraetTermin` setzt den Status von `auftrag.termine.portraet` | D3, D4 |
| 13 | Eingang `auftrag.einwilligungen` nur noch "Objektfotos zeigen" | D3 |
| 14 | Beispiel Termine: Live-Tag Di 24.11.2026 statt 17.11. (`14_markenbuch.md` Abschnitt Beispiel, Zeile Termine) | D4 |
| 15 | Fremdtest holt die Beiträge über `vorab.wettbewerb` und den Pool-`fundort` live, speichert sie nach seinen Regeln nur lokal; die Einladung zum Reveal fragt Zweck 5 nicht selbst, sie nennt den Stand mit "Ändern"; die Zustimmung aller Anwesenden zu Beginn (Q9) bleibt | D7, D3 |
| 16 | Einladung zum ersten Drehtag fragt Einwilligung 6 nicht selbst, sie nennt den Stand mit "Ändern"; Frist Drehtag-Beginn; ohne Ja läuft die Mitschrift nach 4 | D3 |
| 17 | Eingang `auftrag.einwilligungen` mit den Zwecken "Objektfotos zeigen" und "Gespräch am Drehtag aufnehmen" (`drehtagGespraech`); "Porträts" streichen (Zeile 129 und 623), weil Porträts des Maklers im eigenen Feed der Auftrag sind und über `vorab.material[].rechte.status` gesperrt werden; Gäste und Dritte bleiben bei V12; Eingang "laufender Bestand-Import" als extern führen | D3 |
| 16, Planer | `hmRolloutPlan({reveal, runde, rhythmustag})` als öffentliche Funktion mit Rückgabe `{freigabe, drehtag, uebergabe, umfeld, liveTag, rueckblick}`; 5.5 Punkt 1 so lesen: Live-Tag aus Plan A (13 Werktage) mit Ausweichtag aus Plan B (mindestens 15 Werktage); der Satz "Der Live-Tag aus Schritt 1, Di 17.11." in 3.13 entfällt | D4 |

---

## 6. Qualitätsprüfung im Schritt

**Automatisch, im Selbsttest (`hmSelbsttestAuftakt`).**

| Prüfung | Regel | Folge bei Fehler |
|---|---|---|
| `auftakt.quelle` | jede Zeile in `vorab.fakten` hat `quelle` und `sicherheit` aus hoch, mittel, niedrig | Dossier nicht abzeichenbar |
| `auftakt.sicherheit` | "hoch" nur bei mindestens 8 Datensätzen oder verbundenem Konto | Stufe wird herabgesetzt |
| `auftakt.mindestmenge` | kein Prozentwert bei weniger als 5 verkauften Objekten, kein Perzentil bei weniger als 5 Preisen | Wert wird null, Lücke entsteht |
| `auftakt.beleg` | jeder Claude-Vorschlag und jeder Team-Eintrag aus einer öffentlichen Quelle hat einen Beleg, der nach `hmBelegNorm` wörtlich in einem `quelltext` mit `url` und `abgerufenAm` steht, egal ob der Server ihn gelesen oder das Team ihn eingefügt hat; Testfall aus 8.2 besteht, die Paraphrase fällt durch, ein Beleg ohne `quelltext` fällt durch | Vorschlag verworfen |
| `auftakt.typ` | `wert` je Feld im Typ aus 8.2: bezirke Liste mit Rang, seit mit Jahr und Art, kanaele mit Status aus aktiv, aufbauen, nein | rot |
| `auftakt.keineKontakte` | keine E-Mail-Adresse, keine Telefonnummer (Muster aus `hmTelefon` und der Mail-Prüfung in `wb-werkzeuge.jsx`), kein Kundenname in `vorab` und im Claude-Dossier | Dossier gesperrt |
| `auftakt.entscheiderOhneKontakt` | jeder Eintrag in `auftrag.entscheider.mit[]` hat genau die Schlüssel `rolle`, `art`, `workshop`, `richtungstermin`, `reveal`; `art` aus entscheidet, beraet; `rolle` aus der festen Liste (Partnerin oder Partner, Teilhaberin oder Teilhaber, Büroleitung, Assistenz, andere); kein Wert trifft das Mail- oder Telefonmuster; Testfall: ein Eintrag mit `name` oder `email` fällt durch | Eintrag abgelehnt |
| `auftakt.rechteOhneName` | `vorab.material[].rechte` hat nur `status` aus geklärt, offen und `nachweis` aus der festen Liste; kein Freitextfeld; `status` geklärt ohne `nachweis` fällt durch | rot |
| `auftakt.keineHausnummer` | kein Feld in `vorab` enthält eine Hausnummer; Straßen im Claude-Dossier nur bei mindestens 2 Objekten dort; Preise dort auf zwei geltende Stellen | Straße entfernt, Preis gerundet |
| `auftakt.schwaerzung` | jede Kachel-Datei in `auftrittHeute` hat `geschwaerzt: ja`; kein Seed im Repo enthält `auftrittHeute`, `fundort` oder Namen von Mitbewerbern | rot, Datei nicht nutzbar |
| `auftakt.einwilligung` | genau die acht Zwecke aus 4, kein weiterer; jeder hat `status` und `gefragtIn: gespraech`; kein anderer Schritt schreibt einen neuen Eintrag; bei `offen` eine `frist` vor der ersten Nutzung, bei Zweck 1 und Zweck 7 genau Gespräch plus 1 Werktag, 18 Uhr; kein Claude-Aufruf in T2 ohne `ja` bei Zweck 1 und Zweck 7, Testfall Zweck 7 `nein`: null Aufrufe, Dossier im Regelpfad vollständig; nichts vorgewählt; drei Knöpfe mit gleicher Klasse; T2 liest keine öffentliche Quelle ohne `ja` bei Zweck 1; Nutzung nach Frist ohne `ja` gesperrt; Testfall spätes Ja: ein Ja zu Zweck 1 nach der Frist schreibt keinen Wert in `vorab.fakten`, nur in `vorab.nachtraege`, und ändert keine bestätigte Antwort in Schritt 2 | Link zeigt die Einwilligung erneut, Nutzung gesperrt |
| `auftakt.prognose` | Zählregel wie `11_bild.md` 3.5; Testfall: 20 Bilder aus einer Situation zählen 3; ein Bild mit zwei Gesichtern, `ki` wahr oder Wert 69 zählt nicht | rot |
| `auftakt.wettbewerb` | 5 bis 8 Einträge, x und y ganzzahlig von minus 3 bis plus 3, zwei Bewerter, keine Bildfelder, keine Übernahme von Workshop-Feldern anderer Makler in den Pool | Karte nicht fertig |
| `auftakt.logoArt` | die Logo-Erkennung findet Material der Art "Altes Logo" (Regressionstest für `wb-setup.jsx`) | rot |
| `auftakt.termine` | alle Momente gesetzt, auf Werktagen ohne `HM_FEIERTAGE`, in Kettenfolge; Momente 9 bis 14 tragen `quelle` `hmRolloutPlan`; Live-Tag mindestens 13 Werktage, Ausweichtag mindestens 15 Werktage nach dem Reveal; Mitentscheider mit `entscheidet: ja` bei Workshop, Richtungstermin und Reveal zugesagt | Warnung im Team-Heute |
| `auftakt.dauerQuelle` | jede Aufgabe aus 3.5 hat genau einen Eintrag in `HM_DAUER_REGISTER`; `auftrag.dauer` enthält keinen Wert, der nicht aus dem Register oder einer Messung stammt; die angezeigte Summe ist die aufgerundete Registersumme | rot |
| `auftakt.dauerAnzeige` | jede Minutenangabe in `AuftaktLink` stammt aus `hmAuftragDauer` über `hmDauerText`: Render der drei Ansichten mit dem Seed, jede Zeichenfolge aus Zahl und "Min." oder "Std." muss einem Aufruf von `hmDauerText` entsprechen; die Zahl unter dem Knopf in Ihr Stand ist gleich der Zeile des Moments 2 in Ablauf (Markus 21); eine Aufgabe mit Art "Annahme" trägt in ihrer Zeile den Annahme-Satz; im Quelltext von `wb-auftakt.jsx` steht kein Literal wie "15 Minuten" | rot |
| `auftakt.poolFrist` | kein Pool-Eintrag ohne aktiven UNIO-Makler im Kerngebiet hat nach 30 Tagen noch `fundort` oder nach 180 Tagen noch einen Eintrag; `vorab.wettbewerb` abgeschlossener Dossiers enthält keinen Namen | Löschlauf wird nachgeholt, Warnung im Team-Heute |
| `auftakt.kanaele` | nur die Werte aktiv, aufbauen, nein | rot |
| `auftakt.luecken` | jedes leere Ausgangsfeld steht in `vorab.luecken`; die Zahl im Zustand ohne Bestand ist die Zahl der Lücken mit Zielschritt 2 | rot |
| `auftakt.texte` | alle Makler-Texte des Schritts ohne Gedankenstrich, Ausrufezeichen, Emoji, ohne Wörter der Klischee-Liste, keine Klasse `hm-mono` über einer Headline und keine Mono-Schrift für Zahlen im Satz, Immotypen ungekürzt wie in `HM_IMMOTYPEN` | rot |

**Durch das Team.** Die Abzeichnung aus 3.3 mit drei Ja-oder-Nein-Fragen. Dazu vor dem Workshop ein Blick auf die Karte: Liegen alle Mitbewerber in einer Ecke, ist die Auswahl vermutlich einseitig, und es fehlt ein Typ.

**Durch den Makler.** Die Korrekturquote im Fragebogen (E2) ist die eigentliche Prüfung der Vorbelegung. Sie wird je Fakt ausgewertet. Die Abweichung der gemessenen von der angekündigten Dauer (E9) prüft das Versprechen aus Ansicht Ablauf.

---

## 7. Typische Fehler und wie sie verhindert werden

| Fehler | Folge | Verhinderung |
|---|---|---|
| Eine unsichere Vorbelegung wird bequem bestätigt | Die Marke baut auf einem falschen Ort oder Segment | Stufe "niedrig" wird nie vorausgewählt; Quelle steht sichtbar unter jedem Wert (Jäckle und Eckman) |
| Die Regel schätzt aus zu wenig Daten | Ein Prozentwert, der als Beleg in Schritt 7 wandert | Mindestmengen, `n` an jeder Kennzahl, sonst Lücke (D5) |
| Der Grätzl-Anteil bestätigt sich selbst | Ein Beleg, der nur die eigene Auswahl misst | Straßen aus allen Objekten, vom Makler bestätigt, Anteil aus verkauften Objekten, Kennzeichnung in Schritt 7 |
| Die angekündigte Dauer stimmt nicht | Vertrauensbruch am ersten Versprechen | Register mit einer Quelle je Aufgabe, Messung ersetzt Setzung, E9 |
| Zwei Reiter desselben Links nennen verschiedene Minuten (zweite Fassung: 15 gegen 21) | Er glaubt keiner Zeitangabe mehr | kein fester Minutentext im Code, jede Angabe über `hmDauerText`, Selbsttest `auftakt.dauerAnzeige` |
| "Später" ist eine Scheinwahl | Er merkt, dass seine Wahl nichts bewirkt | echte Frist je Zweck über den Knöpfen, spätes Ja als sichtbarer Nachtrag (D13), Testfall in `auftakt.einwilligung` |
| Einladungen an Mitentscheider erzeugen eine Kontaktdatei Dritter | Daten einer Person, die nie eingewilligt hat | der Makler leitet weiter, `auftrag.entscheider` ohne Namen und Kontakt, Selbsttest `auftakt.entscheiderOhneKontakt` |
| Namen von Fotografen oder Mitbewerbern bleiben ohne Zweck liegen | Daten ohne Nutzen, die niemand löscht | `rechte` nur mit Status und Nachweisart, Löschregel für den Pool, Selbsttests `auftakt.rechteOhneName` und `auftakt.poolFrist` |
| Zwei Planer rechnen verschiedene Tage | Der Makler plant mit einem Live-Tag, den Schritt 16 später verwirft | nach dem Reveal nur `hmRolloutPlan`, Selbsttest `auftakt.termine` |
| Ein Mitbewerber-Name landet in einem Markentext | Rechtliches und reputatives Risiko | Claude bekommt nur `kennung` und Notiz; Namen und `fundort` liegen nur im Pool der geschützten Instanz; die Sprachprüfung späterer Schritte gleicht Texte gegen die Namen ab |
| Zwei UNIO-Makler erben dieselbe Konvention unbemerkt | ähnliche weiße Stellen im selben Gebiet | `geteiltMit` im Pool, Kohortenprüfung in Schritt 6 |
| Followerzahl wird zum Ziel oder zur Vergleichsgröße | Reichweitenjagd statt Bestätigung der Empfehlung (R5 1.6) | Follower nur in `auftrittHeute`, nie in der Makler-Ansicht, nie in Markentexten |
| Daten Dritter geraten ins Dossier | Datenschutzverstoß, Weitergabe an die Claude-Kette | D1, `auftakt.keineKontakte`, Schwärzregel für Kacheln, kein Kundenname bei Kundenstimmen, Rundung bei Abschlüssen |
| Aufnahme ohne Zustimmung aller | Aufnahme einer Person, die nicht gefragt wurde | Einwilligung 2 plus Zustimmung aller Anwesenden zu Beginn |
| Einwilligungen unter Beobachtung | fraglich freiwillig, vertrauensschädlich | am eigenen Telefon, das Team sieht nicht mit, "Später" mit Frist, neutrale Folgesätze |
| Einwilligungen verteilt über die Kette, Zwecke an Schritt 1 vorbei | ermüdend, fehleranfällig, eine Nutzung ohne Einwilligung | ein Ort im Gespräch, geschlossener Katalog von acht Zwecken, Nachbarn lesen nur, Selbsttest `auftakt.einwilligung` |
| Claude liest, bevor die KI-Frage gestellt ist | Verarbeitung ohne Einwilligung | Zweck 7 im Gespräch vor T2, D15, Server lehnt Aufrufe ohne `ja` ab (8.1) |
| Das Dossier ändert sich nach der Bestätigung still | Der Makler hat etwas anderes bestätigt, als später gilt | D9 |
| Die Logofarbe wird auf einen Katalogton gezogen | Katalog statt Identität, der Bruch aus KETTE_IST 2.6 | Farben als Hex mit Anteil, keine Zuordnung zu `HM_WEB_AKZENTE` im v2-Pfad |
| Porträt-Engpass fällt zu spät auf | Reveal rutscht oder zeigt Lückenkacheln statt Gesicht | Prognose mit der Zählregel aus Schritt 11 und Puffer, Termin vorgemerkt |
| Mitentscheider sieht die Marke erst beim Reveal | Die Wahl wird wieder geöffnet, Geschmack statt Vertrag | F1 mit allen drei Terminen, Prüfung `auftakt.termine` |
| Wettbewerber-Screenshots im System oder im Repo | Bildrechte, öffentliches Repo | keine Bildfelder in `vorab.wettbewerb`; Seeds nur mit anonymen Kennungen |
| "Inspiration" wird zur Vorlage | Fixierung auf fremde Auftritte | nur Inventar, nie positive Referenz (Jansson und Smith) |
| Die Grätzl-Grenze wird von der Regel erfunden | ein Name, den der Makler nie benutzt | die Regel liefert nur Straßen, das Team benennt, der Makler bestätigt |
| Immotypen werden in der Ansicht gekürzt | Er bestätigt etwas anderes, als gespeichert ist | volle Bezeichnung aus `HM_IMMOTYPEN`, Selbsttest `auftakt.texte` |
| Makler ohne Bestand bekommt eine leere oder geschönte Seite | Vertrauensverlust im ersten Moment | Zustand ohne Bestand mit gezählter Lückenliste |
| Der Link zeigt einen Zwischenstand mit Fehlern | "Die kennen mich nicht" statt "Die kennen mich schon" | Ansicht 3 öffnet erst nach der Abzeichnung, Zustand noch nicht fertig |

---

## 8. Umsetzung in der Werkbank

### 8.1 Dateien

Architektur nach `ui_kits/werkbank/CLAUDE.md`: Babel ohne Build, Präfix `hm`, kein `import()`, Export über `Object.assign(window, ...)`.

| Datei | Änderung |
|---|---|
| `ui_kits/werkbank/wb-auftakt.jsx` (neu, Script-Tag direkt nach `wb-shop2.jsx` und vor allen v2-Schrittdateien in `index.html`) | Register `HM_DAUER_REGISTER`, `hmDauerSetzen`, `hmDauerMessen`, `hmAuftragDauer`; Regeln `hmVorab(mid)`, `hmVorabFakten`, `hmKennzahlen`, `hmBezirkAusPlz`, `hmImmotypAusArt` mit Synonymtabelle, `hmKanalStatus`, `hmAbschluesse`, `hmSicherheit`, `hmPortraetPrognose`, `hmLogoAlt`, `hmLuecken`, `hmAuftragTermine` (bis zum Reveal; danach Aufruf von `hmRolloutPlan` zur Laufzeit über `window`, damit die Ladereihenfolge keine Rolle spielt), `hmBelegNorm`, `hmClaudeVorab` (Rundung, keine Hausnummer); `hmDauerText` (einzige Formatierung von Minuten in der Oberfläche), `hmNachtrag` (spätes Ja und Importwerte nach der Abzeichnung, D13), `hmPoolLoeschlauf` (Löschregel, täglich beim Laden der Team-Ansicht); Konstanten `HM_EINWILLIGUNGEN` (acht Zwecke mit Satz, Folgesatz, Fassung, Frist-Regel, alle gefragt im Gespräch), `HM_ENTSCHEIDER_ROLLEN`, `HM_RECHTE_NACHWEIS`; Komponenten `AuftaktLink` (Ablauf, Einwilligungen mit Datenblock und Zustand nach der Entscheidung, Ihr Stand mit vier Zuständen, gesetzt nach 3.4; Einladungen der Mitentscheider als Knopf zum Weiterleiten über `navigator.share` mit Kopieren als Rückfall) und `AuftaktTeam` (Dossier mit Karte, Pool, Material, Prognose, Logo, Schwärzwerkzeug, Kundenstimmen, Eingabe der öffentlichen Quelltexte mit Adresse und Abrufdatum, Abzeichnung); `hmSelbsttestAuftakt` |
| `wb-freigabe.jsx` (Schritt 16) | `hmRolloutPlan({reveal, runde, rhythmustag})` als Schnittstelle nach 5.4; Schritt 1 baut sie nicht nach. Solange sie fehlt, setzt `hmAuftragTermine` die Momente 9 bis 14 als Lücke "Plan folgt" und der Selbsttest ist gelb |
| `wb-werkzeuge.jsx` | `HM_IMPORT_FELDER.objekte` um `status`, `eingang`, `abschluss`, `hwb`, `fgee`, `klasse` mit Synonymen; `hmPruefen` speichert `adresse` und die neuen Felder (D2) |
| `wb-setup.jsx` | `LogoFarbe` sucht "Altes Logo"; `hmLogoFarbe` liefert bis zu drei Farben mit Anteil; die Zuordnung zum Katalog-Akzent bleibt nur im alten Pfad |
| `wb-os-data.jsx` | `HM_EINRICHTUNG` bekommt den Baustein `auftakt` in der Gruppe Marke vor `strategie` |
| `wb-einrichtung.jsx` | `EKonten` speichert den Benutzernamen je Konto (für `kanaele` und `auftrittHeute`); `EStrategie` liest die Termine aus `auftrag.termine`; `EImport` meldet den Import-Termin mit 20 Minuten an das Register |
| `wb-store.jsx` | Ablage `marke2[mid].auftrag`, `marke2[mid].vorab`, `wettbewerbPool` (Zerlegung Kapitel 3); Seed für Markus mit dem ehrlichen Stand aus 3.8, ohne Mitbewerber, ohne `auftrittHeute`, ohne `fundort`; Seed-Flag erhöhen |
| `wb-betrieb.jsx` | `hmSelbsttestAuftakt` in die Gruppenliste von `Selbsttest`; `marke2` und `wettbewerbPool` in `HM_ZO_SAMMLUNGEN` |
| alle v2-Schrittdateien | je ein Aufruf `hmDauerSetzen` mit der eigenen Setzung; Messung über `hmDauerMessen` |
| `api/wb-marke.js` | neue Phase `vorab` mit dem Schema aus 8.2; der Server lehnt die Phase ab, wenn im Auftrag Zweck 1 oder `kiAntworten` nicht `ja` ist; `dossier()` bekommt einen Abschnitt "Vorab" mit Fakten, Kennzahlen samt `n`, Material-Inventar, Wettbewerb als Kennung und Notiz, Lücken, Abschlüsse nach `hmClaudeVorab`; keine Namen, keine Kontakte, keine Hausnummern |
| `docs/werkbank/MARKE_SCHEMA.md` | Objekte `auftrag` und `vorab` als Datenvertrag v2 |
| `docs/werkbank/branding-v2/schritte/muster/01_ihr-stand.html` | gerendertes Muster, Vorlage für `AuftaktLink` |

### 8.2 Schema für Claude, Phase `vorab`

Eingang: nur Text, den der Makler mit Einwilligung 1 freigegeben hat, je Quelle mit Adresse, und nur bei `ja` zu Zweck 7. Ausgang als Structured Output, typisiert je Feld. Die Listen der erlaubten Namen setzt der Server zur Laufzeit als `enum` aus `HM_BEZIRKE`, `HM_IMMOTYPEN` (flach) und den Kanal-IDs, damit Schema und Werkbank dieselbe Quelle haben.

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": ["bezirke", "graetzl", "immotypen", "seit", "kanaele", "luecken"],
  "properties": {
    "bezirke": { "anyOf": [{ "type": "null" }, {
      "type": "object", "additionalProperties": false, "required": ["werte", "beleg", "url"],
      "properties": {
        "werte": { "type": "array", "items": { "type": "object", "additionalProperties": false, "required": ["name", "reihenfolgeImText"],
          "properties": { "name": { "type": "string", "description": "enum aus HM_BEZIRKE" }, "reihenfolgeImText": { "type": "integer" } } } },
        "beleg": { "type": "string" }, "url": { "type": "string" } } }] },
    "graetzl": { "anyOf": [{ "type": "null" }, {
      "type": "object", "additionalProperties": false, "required": ["name", "beleg", "url"],
      "properties": { "name": { "type": "string" }, "beleg": { "type": "string" }, "url": { "type": "string" } } }] },
    "immotypen": { "anyOf": [{ "type": "null" }, {
      "type": "object", "additionalProperties": false, "required": ["werte", "beleg", "url"],
      "properties": { "werte": { "type": "array", "items": { "type": "string", "description": "enum aus HM_IMMOTYPEN, volle Bezeichnung" } },
        "beleg": { "type": "string" }, "url": { "type": "string" } } }] },
    "seit": { "anyOf": [{ "type": "null" }, {
      "type": "object", "additionalProperties": false, "required": ["jahr", "art", "beleg", "url"],
      "properties": { "jahr": { "type": "integer" }, "art": { "type": "string", "enum": ["genau", "mindestens"] },
        "beleg": { "type": "string" }, "url": { "type": "string" } } }] },
    "kanaele": { "type": "array", "items": {
      "type": "object", "additionalProperties": false, "required": ["kanal", "beleg", "url"],
      "properties": { "kanal": { "type": "string", "enum": ["website", "instagram", "facebook", "linkedin", "youtube", "tiktok"] },
        "beleg": { "type": "string" }, "url": { "type": "string" } } } },
    "luecken": { "type": "array", "items": {
      "type": "object", "additionalProperties": false, "required": ["feld", "grund"],
      "properties": { "feld": { "type": "string" }, "grund": { "type": "string" } } } }
  }
}
```

Claude liefert bei Bezirken nur die Reihenfolge im Text, nie einen Rang; den Rang rechnet die Regel aus dem Bestand. Bei Kanälen liefert Claude nur die Nennung mit Beleg, den Status setzt die Regel aus Konten und Insights. Die Anweisung verbietet Aussagen zu Haltung, Werten, Stimme und Persönlichkeit. Claude-Vorschläge landen mit Sicherheit "niedrig", bis das Team sie übernimmt; eine Übernahme hebt auf "mittel".

**Normalisierung für `auftakt.beleg` (`hmBelegNorm`).** Quelltext und Beleg durchlaufen dieselben Schritte, dann muss der Beleg als Teilzeichenkette im Quelltext stehen:

1. HTML-Entities dekodieren (`&nbsp;`, `&amp;`, `&quot;`, numerische Entities).
2. Unicode-Normalform NFC.
3. Weiches Trennzeichen (U+00AD) entfernen.
4. Silbentrennung am Zeilenende: Bindestrich, Zeilenumbruch, Kleinbuchstabe. Geprüft wird in zwei Fassungen, einmal mit entferntem Bindestrich ("be-" plus "rate" wird "berate"), einmal mit erhaltenem ("Zinshaus-" plus "Spezialist" bleibt), der Beleg besteht, wenn er in einer davon steht.
5. Typografische Anführungszeichen „ “ ” » « auf das gerade doppelte Zeichen, ‚ ‘ ’ › ‹ auf das gerade einfache.
6. Jeder Leerraum, auch geschütztes Leerzeichen, Tabulator und Zeilenumbruch, wird ein einzelnes Leerzeichen; Anfang und Ende gekürzt.
7. Groß- und Kleinschreibung bleibt, damit "wörtlich" wörtlich bleibt.

Testfall im Selbsttest: Quelltext `Seit&nbsp;2016 be-` Zeilenumbruch `rate ich „Eigentümer“ in Döbling.` Beleg `Seit 2016 berate ich "Eigentümer" in Döbling` besteht. Beleg `Seit 2016 berät er Eigentümer` fällt durch.

**Regelpfad ohne Claude und ohne Server-Abruf.** Dieselbe Struktur als Formular in `AuftaktTeam`, in zwei Teilen:

1. *Quelltext einfügen.* Je öffentliche Quelle ein Eingabeblock mit drei Pflichtfeldern: Adresse der Seite, Abrufdatum (vorbelegt mit heute, änderbar), Text der Seite, vom Team aus dem Browser kopiert. Gespeichert als `quelltexte[] {id, url, abgerufenAm, text, eingefuegtVon}` in `marke2[mid].vorab` der geschützten Instanz, nie im Seed. Der Block ist nur aktiv, wenn Zweck 1 `ja` ist. Gelöscht werden die Quelltexte, wenn Schritt 2 abgeschlossen ist, weil danach nur Werte und Belege gebraucht werden (Setzung).
2. *Wert mit Beleg eintragen.* Je Fakt ein typisiertes Feld nach dem Schema oben, dazu ein Feld "Beleg" und eine Auswahl, aus welchem Quelltext er stammt. Die Regel prüft beim Speichern mit `hmBelegNorm`, ob der Beleg wörtlich in genau diesem Quelltext steht; wenn nicht, wird das Feld rot und der Wert nicht übernommen.

Damit ist `auftakt.beleg` ohne Server-Abruf prüfbar: Claude-Vorschläge und Team-Einträge laufen gegen dieselben `quelltexte`, gleich woher der Text kam. Liest der Server die Seite selbst (8.5 Punkt 5), füllt er denselben Block mit `eingefuegtVon: "server"`. Fehlt ein Wert, entsteht eine Lücke. Der Regelpfad setzt nie einen Mustersatz, weil Schritt 1 keine Markensätze erzeugt.

### 8.3 Aufwand

| Baustein | Aufwand |
|---|---|
| Import-Erweiterung und Adress-Fix (D2) | klein, ein halber Tag |
| Regeln Vorab, Kennzahlen, Abschlüsse, Kanäle, Sicherheit, Prognose, Lücken, Selbsttest | mittel, 2,5 Tage |
| Register der Dauer und Anbindung aller Schritte | klein, ein Tag |
| Termine bis zum Reveal und Anbindung an `hmRolloutPlan` | klein, ein halber Tag |
| Makler-Link: Ablauf, Einwilligungen (acht Zwecke an einer Stelle, Erinnerung vor jeder Frist) mit Datenblock und Zustand nach der Entscheidung, Ihr Stand mit vier Zuständen nach dem Muster, Weiterleiten der Einladungen, `hmDauerText` | mittel, 3 Tage |
| Team-Ansicht mit Karte, Pool samt Löschlauf, Material, Prognose, Logo, Schwärzwerkzeug, Kundenstimmen, Quelltext-Eingabe, Nachträge, Abzeichnung | mittel, 3 Tage |
| Claude-Phase `vorab` mit typisiertem Schema, Normalisierung und Beleg-Prüfung, Dossier-Abschnitt | klein, 1 Tag |
| Logo-Erkennung und Farben | klein, ein halber Tag |
| Datenvertrag in `MARKE_SCHEMA.md` | klein, ein halber Tag |
| **Summe** | **rund 12,5 Tage** (Schätzung) |

### 8.4 Arbeitszeit im Betrieb

Team je Makler: 215 bis 260 Minuten, mit Pool im selben Kerngebiet 150 bis 160 Minuten (3.7). Der größte Posten ist die Wettbewerbskarte mit zwei unabhängigen Bewertungen. Makler in Schritt 1: 35 Minuten, mit gemeinsamem Import 55 Minuten. Keine Konten des Maklers bei fremden Werkzeugen nötig.

### 8.5 Offene Punkte für den Owner

1. Du oder Sie gegenüber dem Makler im Link (Zerlegung 7 Punkt 1).
2. Rechtsgrundlagen: Lesen öffentlicher Profile, Übernehmen von Bewertungen, Aufzeichnung von Workshop und Reveal, Löschfrist der Aufnahme und der Kachel-Screenshots, Fremdbild-Seite, KI-Verarbeitung über die ganze Kette (Zweck 7), Speichern fremder Beispiele mit möglichen Daten Dritter (Zweck 8), AVV für den Bestand-Import (BENCHMARK_ONBOARDING Kapitel 2). Der Owner entscheidet; bis dahin ist die Rechtsgrundlage eine offene Lücke, und Kundenstimmen bleiben leer.
3. Zustimmung der Nachbarn zu 5.4, vor allem der Schnittstelle `hmRolloutPlan` in Schritt 16 und der Bündelung aller Einwilligungen im Auftakt (Schritte 2, 3, 4, 15, 16 fragen nicht mehr selbst).
4. Wer das Auftakt-Gespräch führt (Daniel oder Nikita) und wer die zweite Bewertung der Karte macht.
5. Ob der Server Websites selbst lesen darf. Bis dahin gilt der Regelpfad mit eingefügtem Text (8.2), der ohne Server-Abruf vollständig ist.
7. Fristen der Löschregel für den Pool (30 und 180 Tage) und für die eingefügten Quelltexte.
6. Ob der Ausweichtag des Live-Tags dem Makler als Satz gezeigt wird (Vorschlag dieses Dokuments) oder nur intern reserviert bleibt.

---

## Quellen

Intern: `docs/werkbank/branding-v2/00_ZERLEGUNG.md`, `bestand/KETTE_IST.md`, `bestand/FRAGEN_WIRKUNG_IST.md`, `research/R1-studios.md`, `R2-art-direction.md`, `R3-interview.md`, `R4-tools.md`, `R5-makler.md`, `R7-evidenz.md`, `R8-kundenerlebnis.md`, `docs/werkbank/research/BENCHMARK_ONBOARDING.md`, `docs/werkbank/MARKENQUALITAET.md`; Nachbarschritte `02_fragebogen.md` (3.7, 5.1, 5.2, D2, D5), `03_vorlieben.md` (3.8), `04_workshop.md` (3.2, 5.1), `06_territorien.md` (0, 3.2), `07_positionierung.md` (7.6), `08_stimme.md` (3.4, 8.7), `11_bild.md` (3.5, 3.7), `14_markenbuch.md` (5.2), `15_reveal.md` (3.6, Q9), `16_freigabe.md` (3.2, 3.10, 3.13, 5.5, 8.5); Code: `wb-werkzeuge.jsx`, `wb-einrichtung.jsx`, `wb-os-data.jsx`, `wb-data.jsx`, `wb-store.jsx`, `wb-foto.jsx`, `wb-setup.jsx`, `wb-marke.jsx`, `wb-betrieb.jsx`, `wb-produktion.jsx`, `wb-shop2.jsx`, `api/wb-marke.js`; Schrift: `assets/fonts/PowerGrotesk-Regular.woff2`, `PowerGrotesk-Medium.woff2` (Features geprüft mit fontTools 4.60.2).

Studios und Praxis
- Koto, Carolyn Rush, 4 C: https://the-brandidentity.com/interview/kotos-carolyn-rush-good-brands-only-happen-with-a-good-idea (nach der Interview-Zusammenfassung in R1, Wortlaut nicht geprüft)
- Studio Republic, Discovery-Workshop, Wettbewerber vor dem Scoping: https://www.studiorepublic.com/blog/a-guide-to-our-brand-discovery-workshop/
- JKR und Ipsos, Be Distinctive Everywhere (Studie, 5.046 Elemente, 523 Marken): https://bedistinctive.jkrglobal.com/
- Wolff Olins, Uber: https://wolffolins.com/work/uber
- GV Brand Sprint, Zusammenfassung: https://www.reforge.com/blog/brief-how-to-define-your-brand-with-gv-s-3-hour-sprint
- Sycheva, Smashing Magazine 2026: https://www.smashingmagazine.com/2026/07/how-turn-brand-strategy-into-visual-direction/ (Achsen nach der Zusammenfassung in R8, Wortlaut nicht geprüft)
- Mike Monteiro, 13 Ways (Sekundär): https://thepiratetester.wordpress.com/2021/04/12/2021-04-12-my-breakdown-of-mike-monteiro-13-ways-designers-screw-up-client-presentations-and-how-it-applies-to-testers/

Werkzeuge
- Canva Brand Kit Builder: https://www.canva.com/help/brand-kit-builder/
- NN/g, Critical Incident Technique: https://www.nngroup.com/articles/critical-incident-technique/
- Hubbard, Value of Information: https://hubbardresearch.com/computing-the-value-of-information/

Studien und Recht
- Galesic und Bosnjak 2009: https://academic.oup.com/poq/article-abstract/73/2/349/1939196
- Jäckle und Eckman 2019: https://academic.oup.com/jssam/article-abstract/8/4/706/5532310
- Jin 2011: https://doi.org/10.2501/IJMR-53-1-075-094
- Krosnick 1991: https://onlinelibrary.wiley.com/doi/abs/10.1002/acp.2350050305
- Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290
- Jansson und Smith 1991: https://www.sciencedirect.com/science/article/abs/pii/0142694X9190003F
- Walsh, Winterich, Mittal 2010, Do logo redesigns help or hurt your brand? The role of brand commitment, Journal of Product and Brand Management 19(2), 76 bis 84: https://doi.org/10.1108/10610421011033421 (DOI aufgelöst am 30.09.2026; Arbeitspapier auch unter https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1998809)
- Aguirre, Mahr, Grewal, de Ruyter, Wetzels 2015, Unraveling the Personalization Paradox, Journal of Retailing 91(1), 34 bis 49: https://doi.org/10.1016/j.jretai.2014.09.005 (Metadaten über Crossref geprüft, Volltext beim Abruf gesperrt)
- Buell und Norton 2011: https://doi.org/10.1287/mnsc.1110.1376
- DSGVO, Verordnung (EU) 2016/679: https://eur-lex.europa.eu/eli/reg/2016/679/oj

---

## Änderungen aus der Kettenprüfung

Stand 30.09.2026. Anlass: Befund zu Schritt 1 aus der Kettenprüfung. Der Katalog der Einwilligungen war nicht geschlossen (02 verlangte `kiAntworten`, 03 einen Zweck für Nicht-ich-Beispiele), die KI-Frage kam erst auf der Eröffnung des Fragebogens, obwohl T2 schon Texte an Claude schickte, Einwilligungen lagen an vier Orten, und die Qualitätsfolge eines Neins zur KI stand nirgends.

| Nr. | Änderung | Abschnitt |
|---|---|---|
| K1 | Ein Ort: Alle acht Zwecke werden im Auftakt-Gespräch gefragt, am eigenen Telefon ohne Blick des Teams, je mit Frist vor der ersten Nutzung und einer Erinnerung mit Kontext einen Werktag vorher. Einladungen und Nachbarschritte nennen nur den Stand und "Ändern", sie fragen nicht neu. Minuten im Gespräch neu verteilt (Einwilligungen 13 bis 23), Summe 30 unverändert | In einem Satz, 3.1, 3.2, 3.4 |
| K2 | Geschlossener Katalog von acht Zwecken: neu Zweck 7 `kiAntworten` (KI-Verarbeitung über die ganze Kette, 02 D15, 04 Z10) und Zweck 8 `beispieleFremd` (03 3.7, Hinweis 13). Nummern 1 bis 6 unverändert. Neue Zwecke kommen nur über eine Bitte an Schritt 1 dazu | 4, 5.2, D3 |
| K3 | Claude-Dossier in T2 erst nach Ja zu Zweck 1 und Zweck 7; vorher und bei Nein Regelpfad (8.2). Frist für Zweck 7 wie Zweck 1: Werktag 1, 18 Uhr. Spätes Ja wirkt ab dann (`nachFrist: "abDann"`), nichts wird still neu gerechnet. Server lehnt die Phase `vorab` ohne beide Ja ab | 3.3, 3.7, 4, D15, 8.1, 8.2 |
| K4 | Ehrlicher Wenn-nicht-Satz für Zweck 7 mit Qualitätsfolge: allgemeinere Rückfragen, Entwürfe, die seine Formulierungen weniger genau aufnehmen. Rückfragen aus Vorlagen belegt über 02, Folge für Entwürfe als Ableitung gekennzeichnet, Ausmaß und Wirkung auf Termine als Lücke | 3.8, 4 |
| K5 | Block "Was mit Ihren Daten passiert", Satz 3, nennt die Bedingung Zweck 7 und alle abgedeckten Texte; Mitschrift des Workshops nur bei Ja zu Zweck 2 und 7 | 3.4, 3.8 |
| K6 | Beispiel-JSON mit acht Einträgen, alle `gefragtIn: "gespraech"` | 3.9 |
| K7 | A7 neu gefasst: verworfen ist jetzt die Verteilung über die Kette; die Bündelung unter Beobachtung aus der ersten Fassung bleibt verworfen | 2 |
| K8 | Selbsttest `auftakt.einwilligung` prüft genau acht Zwecke, `gefragtIn: gespraech`, keinen fremden Schreiber und null Claude-Aufrufe ohne Ja zu Zweck 7; zwei neue typische Fehler | 6, 7 |
| K9 | Korrekturbedarf an Nachbarn: 2 streicht KI-Frage (D15) und Fremdbild-Frage (D20) und liest nur; 3 liest `beispieleFremd`; 4 liest Zweck 7 für das Transkript; 15 und 16 fragen in ihren Einladungen nicht mehr; Zerlegung führt acht Zwecke | 5.4 |
| K10 | Rechtsgrundlage für Zweck 7 und 8 als offene Lücke beim Owner; der Owner entscheidet | 4, 8.5 Punkt 2 und 3 |

**Nicht geändert, offen.** Das gerenderte Muster `muster/01_ihr-stand.html` und `.png` zeigt noch die Ansicht Einwilligungen mit sechs Zwecken und dem Titel "Sechs Fragen zu Ihren Daten. Zwei davon heute."; es muss auf acht Zeilen und den neuen Titel nachgezogen werden. Die Tabelle "Was sich gegenüber der zweiten Fassung ändert" oben bleibt als Verlauf stehen und nennt dort noch sechs Zwecke.
