# Schritt 4. Workshop

Stand 30.09.2026, dritte Fassung. Entwurf für Branding v2, Teilschritt 4 der Zerlegung (`../00_ZERLEGUNG.md`). Zur Prüfung durch den Kontrolleur und zur Freigabe durch den Owner.

**Lesart.** *Belegt*: steht in einer Quelle mit URL oder in einer genannten Datei. *Ableitung*: eigene Folgerung. *Setzung*: bewusst festgelegter Startwert, gemessen und ersetzt an den ersten fünf Maklern. *Lücke*: wir wissen es nicht. Beispiele am Fall Markus Leitner stammen nur aus dem Seed (`ui_kits/werkbank/wb-store.jsx`, `HM_SEED_ANTWORTEN.markus`), dem Seed-Meeting `mt1` vom 11.09.2026 (`wb-os-data.jsx`), den Beispielen in `01_auftakt.md` 8.2 und `02_fragebogen.md` 3.5 (dort als Annahme markiert) und dem Musterbeispiel in `docs/werkbank/MARKENQUALITAET.md` Kapitel 5. Der Seed folgt noch dem Fragebogen v1; wo ein v2-Feld fehlt, steht das dabei.

**Geändert gegenüber der zweiten Fassung.** (1) Die Wert-Leiter folgt dem Vertrag von Schritt 2: `antworten.leiter[2]` sind zwei Stufen an einem Fall. Leiter 1 setzt über der schriftlichen Warum-Stufe an, Leiter 2 entsteht an einem zweiten Fall neu, nach benannter Auswahlregel; der Status `workshop` ist behandelt (3.6.1). (2) Alle Änderungen an der Zerlegung sind als offene Vorschläge gekennzeichnet, nicht als eingetragen (5.4). (3) Feldnamen der Vorgänger korrigiert: `vorab.fakten` mit `feld: abschluesse` (01 D8), `vorab.luecken` mit `zielschritt: 4` (01 8.2). (4) Die Zugehörigkeitsfrage aus 02 D13 ist aufgenommen (F12) und schreibt nach `antworten.unity` zurück; die Gegenprobe ohne Abnehmer ist gestrichen. (5) Referenz-JSON und Claude-Schema bestehen die eigenen Prüfungen. (6) Die zweite Hälfte ist verdichtet: je zwei Reize in Teil 8, Teil 7 mit zwei binären Reihen, 110 statt 115 Minuten. (7) Ein einseitiger Gesprächsleitfaden ist als eigenes Artefakt definiert (3.5); Begründungen stehen im Anhang A. (8) Harte Sperren für Aufnahme ohne Rechtsgrundlage und Claude ohne KI-Einwilligung, Kapazitätsrechnung und Video-Variante (8.6).

---

## 0. Kurzfassung

Der Workshop ist das einzige lange Gespräch der Kette. Er wird geführt wie eine Studio-Discovery und ausgewertet wie ein Datenvertrag.

1. **Aus seinen Worten vorbereitet.** Die Werkbank baut den Leitfaden aus seinen schriftlichen Antworten, den Lücken und den Widersprüchen. Liegt eine Antwort vor, zeigt eine Recall-Karte seinen Satz, und das Team fragt nur nach Moment, Person oder Zahl dahinter.
2. **An seinen echten Fällen.** Leiter 1 geht über seiner letzten schriftlichen Stufe weiter, Leiter 2 an einem zweiten Fall. Der Switch läuft an Fall 1, auf den sich seine Antworten zu Alternative und Hindernis beziehen.
3. **Zuhören statt Mitschreiben.** Die Aufnahme bleibt lokal, die zweite Person tippt nur typisierte Marken. Die Marken tragen den Regelpfad ohne Claude.
4. **Ehrlich geplant.** 110 Minuten mit 14 Minuten Puffer. Herkunft, Wendepunkt und die Rechnung hinter dem Abraten fallen nie weg.
5. **Ein gestaltetes Ende.** Das Team liest drei seiner Sätze vor; er entscheidet je Satz öffentlich oder nur intern.
6. **Harte Auswertung.** Namen werden vor Claude pseudonymisiert; jedes Feld ist Zitatverweis oder Lücke; fünfzehn Prüfungen sichern Wortlaut, Sprecher, Zahlen und Datenschutz.

---

## 1. Ziel und Erfolgskriterium

**Ziel (Vertrag).** Im Gespräch holen, was kein Formular liefert: Geschichten in eigenen Worten mit Sprecher, die Wert-Leiter hinter zwei Fällen, die Entscheidungsgeschichte des letzten Verkäufers, die eigene Lage auf der Wettbewerbskarte und die Liste, was für diese Marke falsch wäre.

**Warum er die Kette trägt (Ableitung).** Die Schritte 5 bis 8 dürfen laut Vertrag nur belegen, was im Dossier steht. Heute erreichen seine Worte die Plattform nur zufällig, weil Zitate keinen Sprecher tragen (belegt: KETTE_IST 2.3, `wb-strategie.jsx` `hmAuswerten`, `wb-plattform.jsx` `hmPfZitate`). Die Lücken im Musterbeispiel Markus sind genau die Stoffe, die nur ein Gespräch liefert: Wendepunkt, die Rechnung hinter den 600.000 (MARKENQUALITAET 5.4, 5.5).

**Erfolgskriterium.** Alle Punkte gelten; Zahlen sind Setzungen.

| Nr. | Kriterium | Prüfung |
|---|---|---|
| E1 | Jedes Feld in `geschichte`, `leiter`, `switch` ist Zitatverweis oder Lücke mit Grund, nie beides. Jeder Satz, auf den ein Verweis zeigt, hat einen bestätigten Sprecher. | P4 |
| E2 | Mindestens eine der zwei Leitern endet bei einem Wert, den er im Workshop selbst ausspricht (Setzung); die andere endet dort oder ist mit Abbruchgrund markiert. | P5 |
| E3 | `switch` hängt an `antworten.faelle[0]`; `switch.ausschlag` sagt in einem Satz mit Zitatverweis, was er konnte und die Alternative nicht. | P4, P15 |
| E4 | Mindestens zwölf Zitate mit Sprecher `makler`, Zeit und Thema (Setzung); genau drei im Schlussritual entschieden. | P1 bis P3, P12 |
| E5 | `falschWaere` hat je mindestens einen Eintrag Satz, Bild, Verhalten, keiner schon auf der globalen Klischee- oder Bildverbotsliste. | P8 |
| E6 | Jeder Widerspruch aus `vorlieben.widersprueche`, aus `vorab.luecken` mit `zielschritt: 4` und aus dem Katalog hat eine Entscheidung oder ein `bis`. | P7 |
| E7 | Jede Zahl, die öffentlich werden könnte, hat Unterlagen-Status und bei angefordert eine Aufgabe mit Datum vor dem Richtungstermin. | P6 |
| E8 | Herkunft, Wendepunkt und die Rechnung hinter einer Abraten-Zahl sind nie wegen Zeitmangels Lücke; der Termin endet in 110 Minuten. | P14, `meetings[].messung` |
| E9 | Zu `antworten.unity` (erzeugt allein von 2 F13) liegt nach dem Termin ein vertiefendes Zitat mit `thema: "zugehoerigkeit"` und Sprecher `makler` vor oder ein Grund im Prüfprotokoll; `antworten.unity` bleibt unverändert. | P16 |
| E10 | Kein Personen- oder Mitbewerbername im Claude-Dossier; Aufnahme nur mit Rechtsgrundlage und Einwilligung aller Anwesenden; Claude nur mit KI-Einwilligung. | P10 |
| E11 | Nachgelagerte Probe: Schritt 5 findet für `einsicht.stuetzen` mindestens drei wörtliche Belege aus dem Workshop (Setzung). | Schritt 5 |

---

## 2. Geprüfte Alternativen und warum verworfen

| Nr. | Alternative | Dafür | Warum verworfen | Was wir übernehmen |
|---|---|---|---|---|
| A1 | **Alles im Fragebogen.** Geschichte, Laddering, Wettbewerb zum Selbstausfüllen. | Kein Termin. | Längere Bögen senken Beendigung und kürzen späte offene Antworten (Galesic und Bosnjak 2009, https://academic.oup.com/poq/article-abstract/73/2/349/1939196). Lange Leitern werden schlechter (Grunert und Grunert, https://pure.au.dk/ws/files/32299631/wp34.pdf). Im Bestand bleiben die stärksten Geschichte-Felder leer, weil sie optional am Ende stehen (FRAGEN_WIRKUNG_IST Befund 1). | Breite im Bogen, Tiefe im Gespräch (R3 Prinzip 9): Der Bogen behält Fälle, Alternative, Hindernis und zwei Leiterstufen. |
| A2 | **KI-Gesprächsinterview.** Ein Chat führt das Tiefeninterview. | Bessere offene Antworten als ein Formular (Xiao u. a., https://arxiv.org/abs/1905.10700). | Kein Probedreh, keine Karte mit Gegenrede, kein Zurücklesen, kein Moment; R3 lehnt einen Vollchat ab (Kapitel 5). Wer mit KI Ideen entwickelt, fühlt sich weniger verantwortlich dafür (Anderson u. a., https://dl.acm.org/doi/10.1145/3635636.3656204), das Gegenteil von "seine Worte werden Rohstoff". | Claude fragt im Bogen einmal nach (Schritt 2) und wertet hier aus, führt aber nicht. |
| A3 | **GV Brand Sprint.** Sechs Übungen, Notieren und Abstimmen, Regler, 2x2-Karte. | Erprobt, drei Stunden (R8 2.1, https://www.reforge.com/blog/brief-how-to-define-your-brand-with-gv-s-3-hour-sprint). | Für zwei bis sechs Führungspersonen gebaut; Abstimmen hat bei einer Person keinen Sinn. Regler über Adjektive messen Selbstbild und verankern am Startwert (Liu und Conrad, https://journals.sagepub.com/doi/abs/10.1177/0894439318755336). | Die Karte auf zwei Achsen und ein Entscheider (`auftrag.entscheider`). |
| A4 | **Discovery mit Hausaufgaben (Studio Republic).** Kunde übt Miro, reicht Wettbewerber ein. | Fünf klare Teile (R8 2.1, https://www.studiorepublic.com/blog/a-guide-to-our-brand-discovery-workshop/). | Werkzeug-Einschulung ist für einen Makler eine Hürde; die Wettbewerber sichtet das Team schon in `vorab.wettbewerb`; selbst gesuchte Bilder kosten Zeit und haben ungeklärte Rechte (Ableitung). | Die Gliederung Zweck, Wahrnehmung, Bestand, Wettbewerb, Zusammenfassung. |
| A5 | **ZMET-Vollverfahren.** Acht bis zehn eigene Bilder, zwei Stunden. | Zugang zu metaphorischem Denken (https://www.olsonzaltman.com/zmet). | Zu lang, braucht Vorarbeit; die Auswertung projektiver Daten ist laut R3 1.4 (nach France, https://arxiv.org/abs/2409.04995, Fundstelle im Volltext nicht geprüft) methodisch wenig geklärt. | Eine kurze projektive Übung mit kuratierten Bildern aus fremden Kategorien nach Sycheva (https://www.smashingmagazine.com/2026/07/how-turn-brand-strategy-into-visual-direction/). |
| A6 | **Workshop wie heute.** Checkliste, Aufnahme danach, Zitate per Stichwortsuche. | Läuft, Whisper lokal (`wb-strategie.jsx`). | Zitate ohne Sprecher erreichen die Plattform kaum (KETTE_IST 2.3); der Leitfaden fragt Geschichte und Ziel erneut (FRAGEN_WIRKUNG_IST Befund 5) und nennt eine unbelegte 80-Prozent-Zahl (Befund 11). | Whisper-Worker, Glossar, lokale Verarbeitung, Einbindung in "Gespräche" (`wb-team.jsx`). |
| A7 | **Die Gesprächsführung schreibt selbst mit.** | Kein Technikrisiko. | Monteiro: Wer präsentiert, schreibt nicht mit (Sekundärquelle, R8 2.3, https://thepiratetester.wordpress.com/2021/04/12/2021-04-12-my-breakdown-of-mike-monteiro-13-ways-designers-screw-up-client-presentations-and-how-it-applies-to-testers/). Notizen sind Paraphrase, der Vertrag verlangt "text wörtlich" (Ableitung). | Die zweite Person, die nur Marken setzt; Mitschrift nur als Notfall mit Zurücklesen (3.7). |

**Entscheidung.** Ein geführtes Gespräch mit lokaler Aufnahme, typisierten Marken und fester Auswertung. Aus A3 bis A5 und A7 wird je nur das Element mit Wirkung übernommen.

---

## 3. Die gewählte Lösung

### 3.1 Grundsätze des Gesprächs

| Nr. | Grundsatz | Quelle |
|---|---|---|
| W1 | Ein echter Fall vor jeder Meinung. | NN/g Critical Incident: https://www.nngroup.com/articles/critical-incident-technique/; Fitzpatrick: https://mtlynch.io/book-reports/the-mom-test/ |
| W2 | Vertiefen statt neu fragen. Neu gefragt wird nur ein leeres Feld oder ein vom v2-Vertrag verlegtes. | Typeform Recall (R4 Ü9): https://www.typeform.com/developers/create/recall-information/; Schritt 2 Q9 |
| W3 | Das Team bietet nie ein Wertwort an, es wiederholt nur seine Worte. | Weiches Laddering ist anfällig für Interviewer-Einfluss (Grunert und Grunert, oben); Reynolds und Gutman: https://is.muni.cz/el/1456/jaro2013/MPH_MVPS/39278324/LadderingTheoy_original.pdf |
| W4 | Ein Wort statt einer Begründung, wo Geschmack berührt ist. | Wilson und Schooler 1991: https://doi.org/10.1037//0022-3514.60.2.181 |
| W5 | Zurücklesen statt deuten: Eine Verdichtung gilt erst nach seinem "Stimmt so". | Ableitung aus W3 und "text wörtlich" |
| W6 | Kein Entwurf im Raum: kein Logo, kein Territorium, keine Einsicht. | Ableitung aus G3 und G4 der Zerlegung (Richtungen erst roh im Richtungstermin, nur in Anwendung urteilen); kein externer Beleg |
| W7 | Rahmen setzen: warum, was heute, wann Schluss, was danach. | Monteiro (Sekundärquelle, oben) |
| W8 | Wer später kuratiert, führt das Gespräch. | Pentagram: https://www.pentagram.com/about; R1 2.5 |

### 3.2 Form, Rollen, Dauer

- **Form (Setzung).** Die ersten fünf Workshops vor Ort in seinem Büro, weil der Probedreh im echten Licht stattfindet und die zweite Person Licht, Orte und Material ohne Makler-Minute in `workshop.ort` festhält. Danach entscheidet die Messung über die Video-Variante (8.6).
- **Rollen.** Gesprächsführung: die Person, die später kuratiert, in der Regel der Creative Director. Zweite Person: Marken, Konsole, Probedreh, `workshop.ort`; wenn möglich die Person des späteren Drehtags (Ableitung). Im Seed saßen am 11.09.2026 nur Daniel Hayden und Markus Leitner im Workshop (`mt1`).
- **Mitentscheidende Person** aus `auftrag.entscheider`: dabei mindestens bei Karte, Nie-Liste und Klärungen, Sprecher `dritte`, eigene Einwilligung zur Aufzeichnung zu Beginn (gespeichert in `meetings[].einwilligungen`); ohne sie läuft die Konsole während ihrer Anwesenheit im Modus Zurücklesen.
- **Dauer (Setzung).** 110 Minuten einschließlich 14 Minuten Puffer, vorher angekündigt über `auftrag.dauer`; gemessen je Teil und Frage in `meetings[].messung`.
- **Anrede.** Seine Wahl, bei Markus Sie; allgemeine Regel offen beim Owner (Zerlegung Kapitel 7, Punkt 1).

### 3.3 Vorbereitung

| Was | Wer | Wie | Zeit |
|---|---|---|---|
| Leitfaden auf einer Seite (3.5) | Regeln `hmWorkshopLeitfaden`, Team prüft | Je Frage aus 4.1: Art, Rang, Bedingung, Recall-Satz wörtlich, Zielfeld, Abbruchregel, Minuten. Keys mit `status: "beantwortet"` erzeugen keine Frage der Art neu, Keys mit `status: "workshop"` werden übernommen (02 Zeile 614). | Sekunden, Prüfung 10 Min. |
| Leiter-Fälle | Regeln `hmWorkshopFaelle` | Auswahlregel 3.6.1 | Sekunden |
| Letzter Verkäufer | Regeln | immer `antworten.faelle[0]`. Kontrolle gegen `vorab.fakten` mit `feld: abschluesse` (01 D8), ob es der jüngste Verkauf ist; bei Abweichung Hinweis, gefragt wird trotzdem an `faelle[0]` | Sekunden |
| Karte | Team | `vorab.wettbewerb` plus `selbst`, von zwei Personen unabhängig nach der Methode aus Schritt 1 gesetzt (sieben Stufen, ganzzahlig minus 3 bis plus 3). Wunschlagen anderer UNIO-Makler im Gebiet nur intern für P9. Screenshots nur live, nie gespeichert. | 15 Min. |
| Zwei Bildreihen | Team aus dem UNIO-Pool | Teil 7; Reihenfolge je Makler zufällig, gespeichert | 2 Min. |
| Reize für die Nie-Liste | Team, Claude darf vorschlagen | zwei Reizsätze aus `vorab.wettbewerb[].konventionNotiz`, nicht auf der Klischee-Liste; zwei Bildmerkmale aus dem Pool, nicht global verboten und nicht aus `vorlieben.nichtIch`; Deutungen von `vorlieben.nichtIch` und Regel-Fassung von `antworten.grenzenFrei` zum Vorlesen | 10 Min. |
| Klärungen | Regeln, Team kürzt | Katalog `HM_WS_WIDERSPRUECHE`, `vorlieben.widersprueche`, `vorab.luecken` mit `zielschritt: 4`. Höchstens drei an den Makler. | 10 Min. |
| Namensglossar | Regeln, Team bestätigt | Orte, Fachwörter, Ersetzungsliste (Mitbewerbernamen mit Kennung aus der Team-Ansicht, Namen aus `auftrag.entscheider`); nur im Team-Bereich | 5 Min. |
| Technik und Sperren | zweite Person | Pegeltest, Kamera; `HM_WS_RECHT.geklaert` (8.5 Test 13), Einwilligungen `workshopAufzeichnung` und KI-Verarbeitung (3.7) | 5 Min. |

### 3.4 Zeitplan und Rang

| Teil | Min. | Der Makler sieht und tut | Das Team tut | Zielfelder |
|---|---|---|---|---|
| 1 Auftakt | 5 | Ablaufseite, Rahmen, Einwilligung einer mitentscheidenden Person | Rahmen (W7), bittet, Kunden nicht beim Namen zu nennen, startet Aufnahme | Aufnahme-Status |
| 2 Zwei Leitern | 18 | Leiter 1: seine zwei schriftlichen Stufen, er geht weiter hinauf. Leiter 2: erzählt einen zweiten Fall | weiches Laddering | `leiter[2]`, `zitate`, `geschichte.belege` |
| 3 Switch an Fall 1 | 10 | erzählt entlang einer Zeitlinie, sieht seine schriftlichen Antworten | Stufenleiste, Zurücklesen des einen Satzes | `switch`, `zitate` |
| 4 Geschichte, Belege, Zugehörigkeit | 25 | erzählt Herkunft, Wendepunkt, die Rechnung hinter dem Abraten, wo er dazugehört, einen Fehler | fragt nach Rang, markiert Unterlagen live als Aufgabe | `geschichte`, `aufgaben`, `zitate` (darin `zugehoerigkeit`) |
| 5 Probedreh | 10 | spricht zweimal kurz in die Kamera, sieht beide Clips, sagt, wie wohl er sich fühlte | filmt, nennt eine Stärke, dann eine Beobachtung | `probedreh` |
| 6 Karte | 7 | setzt seine Wunschlage, sagt in einem Satz warum | erklärt die Achsen in einem Satz | `karte` |
| 7 Bilder aus fremden Kategorien | 3 | zweimal eines von zwei Bildern, je ein Wort | "Ein Wort dazu?" | `fremdkategorie[2]` |
| 8 Was falsch wäre | 6 | zwei Sätze, zwei Bildmerkmale, Bestätigung der Deutungen, ein Verhalten | liest vor, zeigt | `falschWaere` |
| 9 Klärungen | 6 | höchstens drei Fragen mit je zwei Möglichkeiten und Empfehlung | nennt die zwei Quellen in seinen Worten | `klaerungen` |
| 10 Drei Sätze, Abschluss | 6 | entscheidet je Satz öffentlich oder intern, sieht Aufgaben und nächstes Datum | liest vor, beendet die Aufnahme | `zitate[].oeffentlich`, `aufgaben` |
| Puffer | 14 | | nur bei Überziehung | |
| Summe | 110 | | | |

**Rang.**

| Rang | Fragen (4.1) | Bei Zeitnot |
|---|---|---|
| geschützt | F9 Herkunft, F10 Wendepunkt, F11 Rechnung | fallen nie weg; zuerst Kann-Fragen und Puffer, dann mit seiner Zustimmung bis zehn Minuten länger, sonst Nachtermin von 15 Minuten, Antworten mit `nachgeholt` |
| Pflicht | F1, F2 (bei Bedingung), F3 erste Stufe, F4, F6, F7, F8, F12, F14 bis F22 | erst nach allen Kann-Fragen und dem Puffer; dann schließt die Konsole in umgekehrter Reihenfolge mit Lücke "Zeit" |
| K1 | Gegenrede zu einer Mitbewerber-Lage (Teil 6) | fällt zuerst |
| K2 | F5 erster Gedanke | |
| K3 | F13 Unterlagen-Frage; fällt sie, legt die Regel je Zahl eine Aufgabe an | |
| K4 | F3 ab der zweiten Warum-Stufe | fällt zuletzt |

Die Konsole rechnet laufend Restzeit minus Minuten aller offenen geschützten und Pflichtfragen; unter null graut sie die nächste Kann-Frage aus. Der Makler merkt davon nichts. Begründungen zu Dauer, Lage des Probedrehs und Reihenfolge: Anhang A.

### 3.5 Artefakt: der Gesprächsleitfaden auf einer Seite

Die Gesprächsführung arbeitet nie mit diesem Dokument, sondern mit einer Seite, die `hmWorkshopLeitfaden` je Makler erzeugt und die Konsole neben der Aufnahme zeigt (A4 quer, auch druckbar). Aufbau: eine Zeile je Frage, fünf Spalten: **Teil und Minute**, **Recall-Satz** (wörtlich aus `antworten`, leer bei neuer Frage), **die eine Frage**, **Abbruchregel**, **Rang**. Nichts sonst: keine Begründungen, keine Feldnamen, keine Wirkung. Eine Frage, deren Bedingung nicht greift, erscheint nicht. Der Leitfaden ist nach P11 geprüft und hält die Gestaltungsregeln aus 3.9.

**Beispiel Markus (Auszug, Recall aus dem Seed).**

| Teil, Min. | Recall-Satz | Die eine Frage | Abbruch | Rang |
|---|---|---|---|---|
| 2, 0:05 | "Diskretion war entscheidend." (Altbau Hietzing); seine zwei Stufen: Lücke im Seed | "Erzählen Sie mir den Moment beim Altbau Hietzing, in dem Diskretion eine Rolle gespielt hat." | nach einer Nachfrage weiter | Pflicht |
| 2, 0:12 | keiner (Anlegerwohnung Währing, Ausschlag leer) | "Bei der Anlegerwohnung in Währing: Was hat den Ausschlag gegeben?" | ohne Moment: Leiter 2 als Lücke | Pflicht |
| 3, 0:23 | "Provision" (Zinshaus Sieveringer Straße) | "Sie schrieben: Provision. Wann genau kam das auf, und wer hat es gesagt?" | eine Nachfrage | Pflicht |
| 4, 0:33 | "Aus Finanz oder Recht." "Mein Großvater hat Zinshäuser verwaltet." | "Wie kam das eine zum anderen?" | nie abbrechen | geschützt |
| 4, 0:51 | "Einer Erbengemeinschaft geraten, zwei Jahre zu warten ... Sie kamen mit 600.000 mehr zurück." | "Rechnen Sie mir die 600.000 vor." | nie abbrechen | geschützt |
| 4, 0:57 | "Alteingesessene in Döbling, Väter im Ruderverein." | "Wo haben Sie zuletzt gemerkt, dass Sie dort dazugehören?" | eine Nachfrage | Pflicht |

### 3.6 Die Teile im Einzelnen

#### 3.6.1 Teil 2: zwei Wert-Leitern

**Was Schritt 2 liefert.** `antworten.leiter[2]` sind zwei Stufen an *einem* Fall: `leiter[0]` = {fall, frage F8, antwort} ist der Nutzen, `leiter[1]` = {fall, frage F9, antwort} das Warum; der Fall ist der Fall mit Ausschlag, bei mehreren der Kernfall (02 Zeile 359, 5.2). `antworten.gruende` sind die Ausschläge wörtlich (02 D14).

**Leiter 1: Fortsetzung.** Fall = `antworten.leiter[0].fall`. Grund (Merkmal am Anfang) = der Ausschlag dieses Falls. Die Recall-Karte zeigt Ausschlag, Nutzen und Warum wörtlich. F1 holt den Moment zum Ausschlag (Merkmal beobachtbar machen). F3 setzt über `antworten.leiter[1].antwort` an: "Sie schrieben: '{leiter[1].antwort}'. Warum war genau das wichtig?" Fehlt `leiter[1]` (F9 unbeantwortet), setzt F3 an `leiter[0].antwort` an. Fehlt beides, fragt F2 den Nutzen.

**Leiter 2: neu im Workshop.** `hmWorkshopFaelle` wählt den zweiten Fall nach fester Reihenfolge:
1. ein Fall aus `antworten.faelle`, der weder Leiter-1-Fall noch `faelle[0]` ist und dessen `struktur.ausschlagKern` sich vom Leiter-1-Fall unterscheidet;
2. sonst ein solcher Fall mit leerem Ausschlag; F1 fragt dann zuerst, was den Ausschlag gab;
3. sonst `faelle[0]` (der Switch-Fall; F1 fragt dann nach dem Merkmal, nicht nach der Entscheidung, die Teil 3 abdeckt);
4. weniger als zwei Fälle: Leiter 2 ist Lücke mit Grund "kein zweiter Fall".
Bei Gleichstand gilt der jüngere `monat`. Grund der Regel (Ableitung): zwei verschiedene Ausschläge öffnen die Spannweite der Werte; `faelle[0]` wird möglichst nicht doppelt belastet, weil Teil 3 dort schon zehn Minuten fragt. Leiter 2 durchläuft F1, F2, F3 vollständig.

**Status `workshop` (02 Zeile 390: kein Fall mit Ausschlag, F8 und F9 entfallen).** Leiter 1 entsteht dann ebenfalls neu: Fall ist der Fall mit `belegKandidat`, sonst `faelle[0]`; F1 fragt den Ausschlag, dann F2 und F3. Leiter 2 folgt der Regel oben. `leiter[i].herkunft` ist dann bei beiden `neu`.

**Abbruch (Setzung).** Höchstens drei Warum-Fragen je Leiter, ab der zweiten Kann (K4). Hängt es, eine negative Stufe: "Was wäre passiert, wenn das gefehlt hätte?" Ohne neue Stufe: `abbruch: "keine weitere Stufe"`. Endet Leiter 1 bei seinem schriftlichen Warum, verweist `wert` auf `antworten.leiter[1]` (P5 gelb).

**Beispiel Markus.**

| Leiter | Fall | Grund | Schriftliche Stufen | Im Workshop |
|---|---|---|---|---|
| 1, Fortsetzung | Altbau Hietzing, 140 m², 1,3 Mio. (`faelle[2]`; 02 3.5, dort Annahme) | "Diskretion war entscheidend." (02 D14) | Lücke: v2-Felder, nicht im Seed | F1, F2 (Nutzen fehlt), dann F3 |
| 2, neu | Anlegerwohnung Währing, 62 m², 420.000 (`faelle[1]`), Regel Stufe 2: Ausschlag leer (02 Zeile 376 "Offen für den Workshop") | wird gehört, nicht vorgegeben | keine | F1 fragt den Ausschlag, dann F2, F3 |

Wirkung: `leiter` speist `werte`, `versprechen`, `markenvertrag.attribute` (7) und das Territorium Methode (6). Eine Leiter, die bei "Diskretion" stehen bleibt, ergibt einen anderen Wert als eine, die bei einem Satz über Gesichtswahrung in der Familie ankommt; dieser Satz ist nur ein Muster der Spannweite, keine Aussage von Markus.

#### 3.6.2 Teil 3: der Switch an Fall 1

Switch-Zeitlinie nach Moesta und Spiek (https://jobstobedone.org/the-four-forces/) am Verkäufer aus `faelle[0]`, auf den sich `alternative`, `alternativeKonnte` und `hindernis` beziehen. Nur dort lässt sich die mündliche mit der schriftlichen Geschichte vergleichen.

| Stufe | Recall | Frage | Feld |
|---|---|---|---|
| Anlass | `faelle[0].struktur.anlass` | F4 | `switch.anlass`, darin `lebensphase` |
| Erster Gedanke | keiner | F5 (K2) | `switch.ersterGedanke` |
| Alternative | `antworten.alternative` | F6 | `switch.alternative` |
| Angst | `antworten.hindernis` | F7 | `switch.angst` |
| Ausschlag | `alternativeKonnte`, `faelle[0].ausschlag` | F8, dann Zurücklesen: "Sie konnten ..., was ... nicht konnte?" | `switch.ausschlag` |

**Lebensphase.** Schritt 5 erwartet sie aus `workshop.switch` (05 3.5). `switch.anlass.lebensphase` ist Zitatverweis auf einen Satz, in dem er die Lage der Menschen beschreibt, oder Lücke "im Gespräch nicht beschrieben". Das Team schreibt nie selbst eine Lebensphase.

**Mündlich gegen schriftlich.** Weicht der mündliche Ausschlag ab, gilt er für `switch.ausschlag`, `switch.abweichung` wird gesetzt und Schritt 7 erhält einen Hinweis; `antworten` bleibt unverändert.

**Markus.** Fall 1: Zinshaus Sieveringer Straße, 1902, 4,2 Mio. Anlass "Erbe"; Alternative "ein großes Maklerbüro" (02 3.5, Annahme); Angst "Provision" (Seed `hindernis`); Ausschlag: "Erbengemeinschaft kam über den Notar." wertet Schritt 2 als Weg, nicht als Ausschlag, `alternativeKonnte` fehlt. Erst `switch.alternative` und `ausschlag` zeigen, ob "Anders als Vermittler, die vom Abschluss leben" aus dem Musterbeispiel trägt (Dunford, https://www.aprildunford.com/post/a-product-positioning-exercise).

#### 3.6.3 Teil 4: Geschichte, Belege, Zugehörigkeit

Schritt 2 verlegt `herkunft`, `wendepunkt` und `fehler` in den Workshop (02 4.2). Sie werden deshalb immer gefragt. `unity` fragt Schritt 2 selbst (02 F13, D13, einziger Erzeuger); der Workshop vertieft die schriftliche Antwort nur.

| Feld | Rang | Frage | Markus |
|---|---|---|---|
| `geschichte.herkunft` | geschützt | F9 | v1-Sonderfall: Recall "Aus Finanz oder Recht" und "Döbling, Elternhaus in Grinzing, mein Großvater hat Zinshäuser verwaltet." F9 fragt den Übergang. `herkunft` verweist danach nur auf Workshop-Zitate, nie auf `antworten.aufgewachsen`, das es in v2 nicht gibt (so auch 08, Zeile 361). |
| `geschichte.wendepunkt` | geschützt | F10 | Lücke, im Musterbeispiel "[Kommt aus dem Workshop: Wendepunkt]" |
| `geschichte.abgeraten` und die Rechnung in `belege[].rechnung` | geschützt, wenn eine Zahl vorliegt | F11 | Geschichte liegt vor (Seed), Rechnung hinter 600.000 fehlt. Bei `abgeraten` Status `workshop` wird die ganze Geschichte gefragt, bei `nie` entfällt F11. |
| Zitat `thema: "zugehoerigkeit"` (Vertiefung von `antworten.unity`) | Pflicht | F12 | v1-Sonderfall: Recall "Alteingesessene in Döbling, Väter im Ruderverein."; F12 fragt den letzten Moment der Zugehörigkeit. Bei v2-Maklern liest F12 die Antwort aus 02 F13; fehlt sie dort, fragt F12 nach dem letzten Moment ohne Recall und schreibt trotzdem nur ein Zitat. |
| `geschichte.belege[]` | K3 | F13 je Zahl, mit Zusatz zur öffentlichen Nennung | "Zinshaus Sievering, 11 Wochen" und "8 Prozent über Erstschätzung" (in v2 an `faelle[0]` und `faelle[1]`); Unterlage offen, `oeffentlich` offen |
| `geschichte.fehler` | Pflicht | F14; entfällt, wenn `antworten.grenzen` Fehler als nie führt | Inhalt Lücke; Verwendung erst nach Belegen (08 V6) |

**Kein Rückschreiben nach `antworten` (02 D13).** Das Zitat aus F12 trägt `thema: "zugehoerigkeit"` und geht nur nach `workshop.zitate`. `antworten.unity` bleibt die schriftliche Antwort aus 02 F13; 6 (Anker `zugehoerigkeit`, 06 Zeile 111) und 12 (Konzept Community, 12 Zeile 266) lesen dieses Feld unverändert. Das Zitat steht ihnen wie jedes Zitat über `zitate` zur Verfügung. Dieser Schritt schreibt nichts in den Namensraum `antworten`.

**Öffentliche Nennung von Zahlen (Vertrag mit 7).** F13 endet je Zahl mit dem Zusatz "Dürfen wir die Zahl nach Prüfung öffentlich nennen?" und setzt `belege[].oeffentlich` auf ja, nein oder offen. Ja ist gesperrt, wenn der Beleg auf ein Zitat mit `personenbezug: true` verweist oder die Pseudonymliste im Feld `was` einen Eintrag ersetzt hat (P10). Fällt F13 aus Zeitgründen, bleibt `offen`, und 7 stellt seine gebündelte Zusatzwahl im Wort-Link nur für diese Belege (07 Zeile 168).

**Grätzl-Anteil und Abschlusszahl.** Schritt 1 legt `{feld: "vorab.kennzahlen.graetzlAnteil", zielschritt: 4, schliesstIn: "Workshop"}` an (01 8.2). Teil 4 fragt nicht danach; es wird Team-Klärung K5 der Art `fakt` mit einer Export-Aufgabe (3.6.8). Gleiches gilt für "14 Abschlüsse 2025" gegen `vorab.kennzahlen.verkauft12m`.

**Orte** werden aus den Geschichten gelesen, nicht gefragt (Markus: Sievering, Grinzing, Währing, Hietzing, alle aus dem Seed).

#### 3.6.4 Teil 5: Probedreh

Zwei Takes, je höchstens 60 Sekunden. **Take A:** Die Gesprächsführung neben der Kamera stellt eine schon beantwortete Frage (Interviewformat, R5, Glennda Baker, https://www.nar.realtor/magazine/real-estate-news/technology/how-this-agent-is-making-six-figures-on-tiktok, Selbstauskunft). **Take B:** Er spricht direkt in die Kamera einen eigenen Satz: das zuletzt markierte Zitat aus Teil 2 bis 4 mit Kurz-Transkription und höchstens 25 Wörtern, sonst der erste Satz von `abgeraten`, `alternativeKonnte` oder `faelle[0].ausschlag`, groß neben der Linse.

Danach sehen alle beide Clips; Stärke vor Beobachtung, nie ein Urteil (Critical Response, https://lizlerman.com/critical-response-process/). F21 auf sieben Stufen ohne Startwert. Die zweite Person bewertet beide Takes verankert (1 bricht ab, 4 flüssig, weicht der Linse aus, 7 frei, hält den Blick; Setzung).

**Formate (Setzung).** Gespräch geeignet ab Take A 4; direkt in die Kamera ab Take B 5 und selbst 4; beide unter 4: keine Solo-Videos im Start. Ein Format mit `nie` in `antworten.formate` wird nie freigeschaltet. Clips nur lokal in IndexedDB, gelöscht nach Schritt 11 (Setzung). Markus: Lücke; Take B wäre "Einer Erbengemeinschaft geraten, zwei Jahre zu warten, statt unter Druck zu verkaufen."

#### 3.6.5 Teil 6: die Karte

Zwei Achsen (nahbar bis distanziert, klassisch bis zeitgenössisch), Punkte M1 bis M8 und "Sie heute", Raster sieben mal sieben, der Punkt rastet auf ganze Stufen. Gefragt wird nur F15, die Wunschlage mit einem Satz Warum. Eine Gegenrede zu einer Lage (K1) wird als `einwand` gespeichert; Lagen ändert nur das Team. Namen stehen nur in der Team-Ansicht von `vorab.wettbewerb`. Markus: `vorab.wettbewerb` und `auftrittHeute` fehlen im Seed (Lücke).

#### 3.6.6 Teil 7: zwei Bilder aus fremden Kategorien

**Technik.** Visual Brand Driver nach Sycheva (oben), verkürzt auf zwei binäre Reihen: je zwei Pole, er wählt eines und sagt ein Wort (W4). Zwei statt drei Optionen, weil die Übung sonst die einzige Wahl mit mehr als zwei Optionen im Termin wäre, und nur Reihen mit einem prüfbaren Parameter in Schritt 9 bleiben (Tempo fällt, weil Takt und Schnitt aus Probedreh und Zeit folgen).

| Reihe | Kategorie | Pole, alles andere gleich | Parameter in Schritt 9 (Abbildung, Vorschlag an 09) |
|---|---|---|---|
| 1 Gewicht | Bauwerke | filigran (Seilsteg) oder massiv (Steinbogen); gleiche Tageszeit, Einstellungsgröße, Grauwert | Strichstärke von Zeichen und Wortmarke: filigran = Schnitte bis Regular 400 der gewählten Familie, massiv = ab Medium 500 |
| 2 Fertigung | Werkzeuge, alle aus Stahl | konstruiert (gefräster Messschieber) oder von Hand (geschmiedetes Messer); gleicher Hintergrund, gleiches Licht | Zeichen konstruiert = nur Geraden und Kreisbögen auf einem Raster; von Hand = mindestens eine frei gezeichnete Kurve |

**Wirkung und Tauschprobe.** In `idee.varianten` folgt höchstens eine Variante der Abbildung beider Reihen ("Fremdkategorie-Variante"); eine andere Wahl legt diese Variante in den anderen Bereich (prüfbar am SVG: Strichstärke, Kurventypen). Die Deutung ist nie allein Grund der Empfehlung. **Übergangsregel:** Bis fünf Makler gewählt haben, trägt die Übung in Schritt 9 genau diese eine Variante. Ab fünf zählt `hmFremdkategorieKohorte` die Wahlen je Reihe; wählen mehr als 60 Prozent denselben Pol (Setzung), gilt `kohortentypisch: true` und die Reihe darf in `idee.begruendung` nicht als Unterscheidungsgrund stehen; ab zehn wird sie im Pool ersetzt (`poolVersion`). Die Abbildung ist eine Bitte an Schritt 9, dort noch nicht eingetragen (5.4).

Markus: Lücke; der Pool ist nicht beschafft (Zerlegung Kapitel 7, Punkt 3).

#### 3.6.7 Teil 8: was falsch wäre

1. **Sätze (F17).** Zwei Reizsätze aus der Konvention der Karte, je "würde ich sagen" oder "nie", bei nie ein Wort.
2. **Bildmerkmale (F18).** Zwei Merkmale aus dem Pool, je "geht" oder "nie".
3. **Deutung seiner Nicht-ich-Auftritte (F18b).** Nur die Deutung wird bestätigt, die Auftritte hat er in Schritt 3 schon markiert (03 3.4). Ja ergibt einen Eintrag mit `quelle: vorlieben.nichtIch[n]`, Nein verwirft ohne Nachfrage.
4. **Eigene Grenze (F18c).** Nur bei gefülltem `antworten.grenzenFrei`: Das Team liest die Regel-Fassung vor; bei Ja wird sie ein Eintrag.
5. **Verhalten (F19).** "Was würden Sie nie tun, auch wenn es einen Auftrag bringt?"

**Markus, Reizsätze** (Muster aus der Konvention im Musterbeispiel, Ableitung; im Einsatz durch Sätze der echten Karte ersetzt): "Diskretion ist unser Versprechen." (trennt Verhalten von Schlagwort) und "Jetzt ist der richtige Zeitpunkt zu verkaufen." (berührt seine Warte-Geschichte). Antworten: Lücke. "Keine Familie im Bild." steht nur in der Zusammenfassung von `mt1` und zählt nicht als seine Aussage (T13).

**Wirkung.** Direkt: `markenvertrag.falschWaere` (7), `brief.verbote` (9), Prüfung der Territorien (6), Grenze für die Einsicht (5). Indirekt: Schritt 8 liest nur `markenvertrag.falschWaere` und leitet daraus `stimme.vermeiden` und `stimme.verbindlich` ab; Schritt 11 liest nur `brief.verbote` für `bild.vermeiden`.

#### 3.6.8 Teil 9: Klärungen und `hmWirksam`

**Erkennung.** `HM_WS_WIDERSPRUECHE` (Grenze gegen Geschichte, Meinung gegen Tabu, Wunschlage gegen Bestandsurteil, `worte` gegen `fremdbild.worte`, Kanäle gegen Zeit, Stimmprobe gegen Fremdbild), dazu alle `vorlieben.widersprueche` und alle `vorab.luecken` mit `zielschritt: 4`. Claude darf semantische Kandidaten ergänzen; sie sind nur Kandidaten (8.3).

**Arten und wer entscheidet.**

| `art` | Entscheidet | `wirktAuf` | Wirkung |
|---|---|---|---|
| `grenze` | Makler | Pfad unter `antworten.grenzen` | über `hmWirksam` |
| `anrede` | Makler | Pfad unter `antworten.anredeJeKanal` | über `hmWirksam` |
| `profil` | Team (aus `vorlieben.widersprueche`) | Pfad unter `vorlieben.profil.dimensionen` | über `hmWirksam` |
| `haltung` | Makler | `null` | direkt gelesen von 5 und 7 |
| `fakt` | Team | `null` | Pflicht: eine Aufgabe mit `ergebnisFeld` (`folge`) |

Höchstens drei Klärungen an den Makler, jede mit `optionen[2] {text, setzt}`, einer `empfehlung` und `empfehlungGrund` in einem Satz. Offene Klärungen tragen `bis` (Wunsch von 08 AE5), in der Regel das Datum des Richtungstermins; dort fragt die Gesprächsführung sie am Ende mit denselben zwei Optionen.

**`hmWirksam(mid, pfad)`** ist die einzige Funktion, die eine Klärung auf ein Feld anwendet, und gilt nur für die drei Pfadbereiche `antworten.grenzen`, `antworten.anredeJeKanal`, `vorlieben.profil`:

| Lage | Rückgabe |
|---|---|
| keine Klärung mit `wirktAuf` gleich `pfad` | gespeicherter Wert, `strittig: false` |
| Klärung offen | gespeicherter Wert, `strittig: true`; unter `vorlieben.profil` Gewicht 0 (03 3.10) |
| Klärung entschieden | `setzt` der gewählten Option, `quelle: "workshop.klaerungen[k]"` |

Im Store entsteht kein zweiter Wert. Schritte 3 und 8 lesen schon über `hmWirksam` (03 3.8, 3.10; 08 V5, AE4); 6, 9 und 11 sind gebeten (5.4). Betrifft eine Entscheidung ein Bildverbot, entsteht zusätzlich ein Eintrag in `falschWaere`.

**Beispiel Markus.**

| Nr. | Art | Widerspruch | Optionen, Empfehlung zuerst | Stand |
|---|---|---|---|---|
| K1 | grenze | Familie ist tabu (Seed `tabus`, v2 `grenzen`), die Herkunft handelt vom Großvater (v1-Recall) | a) Familie im Text ja, im Bild nie; b) weder noch | offen, `bis` Richtungstermin |
| K2 | grenze | Meinung zum Markt gewünscht, Politik tabu | a) Mietrecht nur als Folge für Eigentümer, nie als Parteifrage (Musterbeispiel 5.5); b) Mietrecht gar nicht | offen |
| K3 | haltung | Mehr Kanäle, als die Zeit trägt | a) ein Kanal zuerst, der zweite ab Monat drei; b) nur ein Kanal | schlägt nur an, wenn die v2-Antworten es zeigen (Lücke) |
| K4 | profil | Bildwahl "Räume ohne Menschen" (Seed `bp6` b), der Feed braucht sein Gesicht (13) | Team: Räume menschenleer, sein Gesicht in den Serien | Team-Entscheidung |
| K5 | fakt | Grätzl-Anteil: Schätzung 6 bis 8 von 10, genannte Fälle 1 von 3 | Team: Zahl nur aus dem Import; Aufgabe Export | Team-Entscheidung |

#### 3.6.9 Teil 10: drei Sätze und Abschluss

Die Konsole schlägt drei markierte und kurz transkribierte Sätze vor: je einer aus Leiter, Switch und Geschichte, ohne Pseudonym, höchstens 25 Wörter (Setzung). Er entscheidet je Satz mit F22. Danach die Aufgabenliste laut und auf einer Seite, je mit Datum vor dem Richtungstermin. Markus: Der einzige Makler-Satz der Seed-Mitschrift, "Dass sie sich nie gedrängt gefühlt haben.", gibt wieder, was Kunden sagen; er kann nur als sein Satz öffentlich werden, nie als Kundenstimme. Daraus folgt eine Freigabe-Aufgabe für eine echte Kundenstimme.

### 3.7 Mitschrift, Datenschutz, Notfall

- **Harte Sperren.** Die Konsole startet eine Aufnahme nur, wenn (a) `HM_WS_RECHT.geklaert` wahr ist (Rechtsgrundlage, Löschfristen, Pseudonymisierung dokumentiert, 9 Punkt 2), (b) `auftrag.einwilligungen` `workshopAufzeichnung` mit Ja enthält und (c) jede anwesende mitentscheidende Person eingewilligt hat. Sonst Modus Zurücklesen. Der Claude-Aufruf ist gesperrt, solange der Zweck KI-Verarbeitung nicht mit Ja vorliegt; es gilt derselbe Zweck wie in 02 D15 ("KI-Verarbeitung der Antworten"), dessen Text Schritt 1 um das Workshop-Transkript erweitern soll (Bitte, 5.4). Bis dahin ist der Aufruf auch mit Pseudonymliste gesperrt, und nur der Regelpfad läuft.
- **Aufnahme** in der Konsole (MediaRecorder, https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder). Ausweg bei Ausfall: anderes Gerät, späteres Hochladen, Versatz-Regler.
- **Marken.** Sechs Tasten mit Wort: Zitat, Wert, Beleg, Geschichte, Nie, Aufgabe; dazu "bestätigt" nach dem Zurücklesen. Jede Marke speichert Zeit, Teil, Frage-ID, in Teil 3 die Stufe, in Teil 2 die Leiter.
- **Kurz-Transkription** je Zitat-Marke im Hintergrund; Geschwindigkeit nicht gemessen (Lücke), daher Auswege schriftlicher Satz und Abspielen.
- **Voll-Transkription** nach dem Termin, etwa halbe Aufnahmelänge Rechenzeit (Hinweis in `wb-strategie.jsx`, nicht gemessen), unbeaufsichtigt.
- **Pseudonymisierung.** `hmWorkshopPseudonym` ersetzt vor jeder Speicherung im Claude-Dossier die Ersetzungsliste (Mitbewerber werden zur Kennung) und Namenskandidaten (Wort nach Anrede oder Titel, Vornamen aus Liste, großgeschriebene Wörter außerhalb von Wörterbuch und Glossar) durch Rollen wie "[Kunde 1]". Das Team bestätigt die Liste. Das Original bleibt lokal; ein Zitat mit Pseudonym trägt `personenbezug: true` und kann nicht öffentlich werden.
- **Notfall ohne Aufnahme.** Das Team liest jede starke Aussage zurück ("Darf ich das so aufschreiben: ...?"), die zweite Person tippt den bestätigten Satz; `quelle: zurueckgelesen`, `zeit` als Uhrzeit (01 Einwilligungen, Folge "sinngemäß statt wörtlich").

### 3.8 Auswertung nach dem Termin

| Schritt | Wer | Was |
|---|---|---|
| 1 Transkript | Regeln | Whisper mit Glossar (`hmGlossar`), Satzgrenzen mit Zeit; Filter für E-Mail, Telefon, Kontonummer |
| 2 Pseudonyme | Regeln, Team bestätigt | 3.7 |
| 3 Sprecher | Claude oder Regeln, Team bestätigt | jeder Satz, der belegt oder Zitat wird, braucht einen bestätigten Sprecher |
| 4 Zitate | Claude oder Regeln, Team schneidet | Zitat-Schere wählt nur Anfang und Ende; Hörfehler nur nach Abhören, markiert `korrigiert` |
| 5 Wortschatz | Regeln | `hmWortschatz`: eigene Wendungen von zwei bis fünf Wörtern, mindestens dreimal in zwei Teilen, ohne Füllwörter; Fachwörter aus dem Glossar, die er mindestens zweimal nutzt; Thema `wortschatz`, mit `vorkommen`. Abnehmer 8 (`stimme.sagen`, `eigeneWorte`) |
| 6 Felder | Claude oder Regeln | `geschichte`, `leiter`, `switch` mit Verweisen oder Lücke; F12-Zitat mit `thema: "zugehoerigkeit"` |
| 7 Ort | zweite Person | `workshop.ort` in fünf Minuten: Licht, Orte mit Bezug zu seinen Geschichten, Material; keine Fotos Dritter |
| 8 Prüfung | Regeln | P1 bis P16; Rot sperrt den Abschluss |
| 9 Durchsicht | Gesprächsführung | Felder gegen das Gespräch, Deutungen, Team-Klärungen; 30 bis 45 Minuten (Setzung) |

**Nachträge** (bedingte Nachholfrage aus 05 4.2, Frage F12-2 aus Schritt 12, Nachtermin) laufen durch denselben Vertrag mit `nachgeholt: {schritt, datum}` und lösen P1 bis P6 erneut aus. Die Antwort auf die Nachholfrage aus Schritt 5 belegt `switch.angst` nur, wenn es bis dahin Lücke ist und die Gesprächsführung es entscheidet.

### 3.9 Was der Makler sieht

Alle drei Ansichten in der Werkbank-Gestalt von UNIO (Grund `--paper`, Text `--ink-2`, Power Grotesk, `ui_kits/werkbank/index.html`). Ein Satz trägt jede Ansicht; Ziffern tabellarisch in derselben Schrift, keine Mono-Versalzeile `hm-mono` über einer Headline (wäre eine Eyebrow); hängende Anführungszeichen; Hierarchie nur über Größe und Grauwert; keine Farbflächen, Verläufe oder Textzeichen-Icons; Satzschreibung, keine Ausrufezeichen, keine Gedankenstriche (P11). Maße sind Setzungen für Tablet quer (1180 px) und Telefon (390 px).

- **Ablaufseite (Teil 1).** Oben: "Wir hören heute zu. Die Aufnahme bleibt auf diesem Rechner." 56 auf 60 px, sieben von zwölf Spalten. Darunter zehn Zeilen Uhrzeit und Satz, 20 auf 28 px, Uhrzeit in fester Spalte ("10.05  Zwei Ihrer Fälle", "10.23  Das Zinshaus in der Sieveringer Straße", "10.33  Wie Sie zu Zinshäusern kamen"). Laufender Teil volle Tinte, vergangene `--text-muted`, kommende `--ink-3`; kein Haken, kein Balken. Unten klein das Datum des Richtungstermins, nie ein Platzhalter.
- **Recall-Karte (Teile 2 bis 4).** Nur seine Worte, 40 auf 48 px, höchstens 60 Prozent Breite; darunter 15 auf 20 px `--text-muted` die Herkunft als Satz: "Ihr Fragebogen, zum Zinshaus Sieveringer Straße." Die Frage stellt der Mensch.
- **Nachlese (am Tag danach, zuerst am Telefon).** Oben ein freigegebener Satz, 32 auf 40 px, darunter "Im Workshop am 11. September."; dann die Aufgaben je mit Datum und Ablage (SVG-Symbol, 1,5 px Strich, `Ico`); zuletzt der Richtungstermin. Kein Satz mit Status offen, keine Einsicht. Markus: ohne freigegebenen Satz nur Aufgaben (Unterlagen zu 11 Wochen und 8 Prozent, Rechnung zu 600.000, Export, echte Kundenstimme) und Datum.

### 3.10 Wer erzeugt was

| Erzeugnis | Team | Claude | Regeln |
|---|---|---|---|
| Leitfaden auf einer Seite, Leiter-Fälle, Fall 1 | prüft | | erzeugt |
| Karte heute | setzt `selbst` zu zweit | | prüft Skala |
| Reizsätze | wählt | schlägt vor | prüft gegen Klischee-Liste |
| Klärungen | vervollständigt Kandidaten, kürzt auf drei | Kandidaten | Katalog, `vorab.luecken` |
| Gespräch, Laddering, Zurücklesen | führt | | |
| Marken, Zeitplan | tippt | | rechnet Restzeit |
| Pseudonyme | bestätigt | | schlägt vor |
| Sprecher, Zitate, Felder | bestätigt, schneidet | schlägt vor | Regelpfad gleicher Struktur |
| Wortschatz, Prüfungen, Kohorte | | | erzeugt |
| `workshop.ort`, Deutungen | schreibt | | |

---

## 4. Fragen an den Makler

### 4.1 Fragen mit Wirkung

Art: *neu* (Feld leer oder verlegt), *Vertiefung* (Recall, gefragt nur nach Moment, Person, Zahl), *Bestätigung* (Deutung des Teams, Ja oder Nein).

| Nr. | Frage (Sie-Form) | Art, Rang | Bedingung | Wirkt auf | Warum, Tauschprobe |
|---|---|---|---|---|---|
| F1 | "Erzählen Sie mir den Moment bei {Fall}, in dem {Ausschlag} eine Rolle gespielt hat." Bei leerem Ausschlag: "Bei {Fall}: Was hat den Ausschlag gegeben?" | Vertiefung oder neu, Pflicht | je Leiter | `leiter[i].grund`, `merkmal`, `geschichte.belege`, `zitate` | Aus einem Stichwort wird ein beobachtbares Merkmal; ein anderer Moment ergibt ein anderes Merkmal und andere Belege. |
| F2 | "Was hatte {die Verkäuferseite} konkret davon?" | neu, Pflicht | Leiter 2 immer; Leiter 1 nur, wenn `antworten.leiter[0]` leer | `leiter[i].nutzen` | Der Nutzen wird zum Versprechen (7); liegt er schriftlich vor, entfällt die Frage. |
| F3 | "Sie schrieben: '{letzte Stufe}'. Warum war genau das wichtig?", bis dreimal, negative Stufe erlaubt | Vertiefung (Leiter 1) oder neu, erste Stufe Pflicht, weitere K4 | Leiter 1 über `antworten.leiter[1]`, sonst `[0]`; Leiter 2 über F2 | `leiter[i].wert` | Ein anderes Ende der Leiter ergibt andere `werte` und `markenvertrag.attribute`. |
| F4 | "Sie nannten als Anlass {anlass}. Was war bei den Eigentümern damals im Leben los, und wer hat es angestoßen?" | Vertiefung, Pflicht | an Fall 1 | `switch.anlass`, `switch.anlass.lebensphase` | Eine andere Lebensphase ergibt eine andere `einsicht.zielgruppe` (5). |
| F5 | "Wann haben sie zum ersten Mal daran gedacht, und was haben sie dann getan?" | neu, K2 | an Fall 1 | `switch.ersterGedanke` | Zeigt, wo die Marke gefunden werden muss (Notar, Suche, Empfehlung); geht in `einsicht.spannung`. |
| F6 | "Sie schrieben: {alternative}. Wann war diese Möglichkeit im Gespräch, und wer brachte sie ein?" Leer: "Wen haben sie außer Ihnen noch gefragt?" | Vertiefung, Pflicht | an Fall 1 | `switch.alternative` | Real erwogen oder nur denkbar: im ersten Fall trägt sie `positionierung.andersAls`. |
| F7 | "Sie schrieben: {hindernis}. Wann genau kam das auf, und wer hat es gesagt?" Leer: "Was hätte sie fast abgehalten?" | Vertiefung, Pflicht | an Fall 1 | `switch.angst` | Aus einem Wort wird eine berichtete Spannung für `einsicht.spannung`. |
| F8 | "Sie schrieben: '{alternativeKonnte}'. In welchem Gespräch hat sich das entschieden?", dann Zurücklesen | Vertiefung, Pflicht | an Fall 1 | `switch.ausschlag` | Ein anderer Ausschlag ergibt ein anderes `positionierung.weil`. |
| F9 | "Wie sind Sie zu {Kernobjektart} gekommen?" | neu, geschützt (v1: Vertiefung) | immer | `geschichte.herkunft` | Verlegt aus 2; andere Herkunft, andere `story.herkunft` (8) und anderes Herkunfts-Territorium (6). |
| F10 | "Gab es einen Moment, an dem Sie fast aufgehört oder alles anders gemacht hätten?" | neu, geschützt | immer | `geschichte.wendepunkt` | Mit Wendepunkt hat die Story eine Spannung, ohne steht eine Lückenmarke (8). |
| F11 | "Rechnen Sie mir {Zahl aus abgeraten} vor." | Vertiefung, geschützt | Zahl in `abgeraten`; bei Status `workshop` ganze Geschichte | `geschichte.abgeraten`, `belege[].rechnung` | Mit Rechnung prüfbar in `beweise` (7), ohne bleibt die Zahl öffentlich gesperrt. |
| F12 | "Sie schrieben: {unity}. Wo haben Sie das zuletzt gemerkt?" | Vertiefung, Pflicht | `antworten.unity` aus 02 F13 (v1: Seed-Wert); fehlt es, ohne Recall | nur `zitate` mit `thema: "zugehoerigkeit"`, kein Rückschreiben | Die Frage selbst stellt 2 (F13, D13). Der erlebte Moment liefert eine Szene statt einer Kategorie, die 6 und 12 als eigenes Wort des Maklers zitieren können. |
| F13 | "Seit wann gezählt, und welche Unterlage zeigt das?" Zusatz: "Dürfen wir die Zahl nach Prüfung öffentlich nennen?" | Vertiefung, K3 | je Zahl, die öffentlich werden könnte | `belege[].unterlage`, `belege[].oeffentlich`, `aufgaben` | Entfällt sie, entsteht eine Aufgabe; der Prüfstatus in 7 bleibt Selbstauskunft, und `oeffentlich` bleibt offen, dann fragt 7 gebündelt nach. Ja ist bei `personenbezug` gesperrt (P10). |
| F14 | "Ein Fehler, aus dem Sie etwas geändert haben." | neu, Pflicht | außer Fehler steht in `grenzen` auf nie | `geschichte.fehler` | Stoff für 8 nach den Belegen; ohne ihn fehlt Material für `einsicht.unbequem` (5). |
| F15 | "Wo wollen Sie auf dieser Karte stehen, und warum, in einem Satz?" | neu, Pflicht | immer | `karte.wunschlage` | Verschiebt `einsicht.weisseStelle` und `markenvertrag.lageAufDerKarte`. |
| F16 | "Welches dieser zwei ist näher an Ihrer Arbeit? Ein Wort dazu." | neu, Pflicht | je Reihe (zwei) | `fremdkategorie[i]` | Anderer Pol, andere Fremdkategorie-Variante in `idee.varianten` (Abbildung 3.6.6). |
| F17 | "Würden Sie diesen Satz sagen?" | neu, Pflicht | zwei Reizsätze | `falschWaere` (Satz) | Ein Nie ergibt einen Eintrag in `markenvertrag.falschWaere` (7) und darüber eine Regel in `stimme.vermeiden` (8). |
| F18 | "Geht das oder nie?" | neu, Pflicht | zwei Pool-Merkmale | `falschWaere` (Bild) | Ergänzt `brief.verbote` (9) und darüber `bild.vermeiden` (11). |
| F18b | "Wir lesen darin: {Merkmal}. Stimmt unsere Deutung?" | Bestätigung, Pflicht | je `vorlieben.nichtIch` | `falschWaere` | Ja macht ein Verbot, Nein verwirft. |
| F18c | "Wir verstehen Ihre Grenze so: {Regel}. Stimmt das?" | Bestätigung, Pflicht | `grenzenFrei` gefüllt | `falschWaere` | Freitext wird prüfbare Regel (02, Fehler "Freitext-Grenzen verpuffen"). |
| F19 | "Was würden Sie nie tun, auch wenn es einen Auftrag bringt?" | neu, Pflicht | immer | `falschWaere` (Verhalten) | Geht in `werte[].nie` (7). |
| F20 | Klärungsfrage mit zwei Optionen und Empfehlung | neu, Pflicht | höchstens drei, Arten grenze, anrede, haltung | `klaerungen[i].entscheidung` | Sonst landet ein Widerspruch still in 6 bis 11. |
| F21 | "Wie wohl war Ihnen, von eins bis sieben?" | neu, Pflicht | nach dem Probedreh | `probedreh.komfort.selbst` | Mit den Beobachtungen: `probedreh.formate`, Formatmix (12). |
| F22 | "Würden Sie diesen Satz öffentlich tragen, oder bleibt er intern?" | neu, Pflicht | drei Sätze | `zitate[i].oeffentlich` | Nur öffentliche Sätze dürfen wörtlich in 8, 13, 15. |

**Last im Termin.** Verbindliche Entscheidungen: höchstens drei Klärungen und drei Sätze, je binär. Übrige Reaktionen: zwei Bildwahlen, zwei Sätze, zwei Merkmale, Bestätigungen, Karte, Komfort, zusammen höchstens zwölf gegenüber rund zwanzig in der zweiten Fassung.

### 4.2 Abgeleitet statt gefragt

| Größe | Quelle |
|---|---|
| Fall und erste zwei Stufen von Leiter 1 | `antworten.leiter[0]`, `[1]`, Ausschlag aus `antworten.faelle` |
| Fall von Leiter 2 | Auswahlregel 3.6.1 |
| letzter Verkäufer | `antworten.faelle[0]`; Kontrolle gegen `vorab.fakten` mit `feld: abschluesse` |
| Alternative, Hindernis, Ausschlag | `antworten`; nur vertieft |
| heutige Lage, Lage der Mitbewerber | Team aus `vorab.auftrittHeute`, `vorab.wettbewerb` |
| Grätzl-Anteil, Abschlüsse im Jahr | `vorab.kennzahlen`, sonst Klärung K5 mit Export-Aufgabe |
| Kamera-Komfort | gemessen im Probedreh |
| Licht, Orte, Material | `workshop.ort` |
| Wortschatz | `hmWortschatz` |
| Kanäle, Zeit, Anrede, Ziel, Fremdbild | Schritt 2; nur bei Widerspruch als Klärung |

### 4.3 Gestrichen gegenüber `hmLeitfaden` und der zweiten Fassung

Kanäle auswählen, Teleprompter-Frage, "zwei Kunden nennen", "drei Menschen für das Fremdbild", die 80-Prozent-Frage zum Du (FRAGEN_WIRKUNG_IST Befund 11), die Zukunftsfrage zu `ideal`, der Sammelpunkt Geschichte (ersetzt durch F9 bis F14), Ziel in zwölf Monaten, Grätzl-Format, "Eigentümer zuerst?" (samt Fehler `(a.seite || 50)`), die Hausaufgabe mit Bildern. Aus der zweiten Fassung: die Gegenprobe (kein Abnehmer liest sie), Reizsätze und Merkmale 3 und 4, die Bildreihe Tempo und die dritte Option je Reihe.

---

## 5. Eingang und Ausgang

### 5.1 Eingang

| Von | Feld | Wofür | Im Vertrag |
|---|---|---|---|
| 1 | `vorab.wettbewerb` | Karte, Reizsätze, Namensglossar, `unio` für P9 | ja |
| 1 | `vorab.auftrittHeute` | Lage "Sie heute" | ja |
| 1 | `vorab.luecken` | Einträge mit `zielschritt: 4` werden Klärungen | ja |
| 2 | alle `antworten` (darin `faelle`, `leiter`, `gruende`, `alternative`, `alternativeKonnte`, `hindernis`, `abgeraten`, `unity`, `grenzen`, `grenzenFrei`, `formate`) | Recall, Fälle, Bedingungen, Widersprüche | ja |
| 2 | `fremdbild` | Widerspruch Selbst- gegen Fremdbild | ja |
| 3 | `vorlieben.widersprueche`, `vorlieben.bestandUrteil` | Klärungen | ja |
| 1 | `auftrag.einwilligungen` (`workshopAufzeichnung`, KI-Verarbeitung) | Sperren 3.7 | Ergänzung |
| 1 | `auftrag.entscheider`, `auftrag.termine`, `auftrag.dauer` | Teilnahme, Glossar, `bis`-Daten, Ankündigung | Ergänzung |
| 1 | `vorab.fakten` mit `feld: abschluesse` (01 D8) | Kontrolle, dass `faelle[0]` der jüngste Verkauf ist | Ergänzung |
| 1 | `vorab.kennzahlen`, `vorab.kundenstimmen`, `vorab.material` | Abgleich, Freigabe- und Foto-Aufgaben | Ergänzung |
| 3 | `vorlieben.nichtIch` | F18b (von 3 erbeten, 03 5.4) | Ergänzung |
| Extern | Wunschlagen und Fremdkategorie-Wahlen der Kohorte | P9, Kohorten-Prüfung | Ergänzung |

Alle Ergänzungen existieren im Ausgang des genannten Vorgängers, der Schritt 4 dort schon als Abnehmer führt (01 Tabelle Ausgang, 03 5.2). In der Zerlegung sind sie noch nicht eingetragen (5.4).

### 5.2 Ausgang

Speicherort `hmStore` Schlüssel `marke2`, `[mid].workshop`. **REF** ist `{ref: [pfad]}` oder `{luecke: grund}`, genau eines; Pfade zeigen auf `workshop.zitate` (ID) oder `antworten.<key>`.

| Feld | Form | Abweichung vom Vertrag und Grund |
|---|---|---|
| `zitate[]` | `{id, sprecher, sprecherBestaetigt, text, zeit, thema, frage, oeffentlich: ja, nein oder offen, quelle: aufnahme oder zurueckgelesen, bestaetigt, korrigiert, personenbezug, vorkommen, nachgeholt, meetingId}` | Zusatzfelder für P1 bis P5, Nachträge (Wunsch 5) und Wortschatz |
| `geschichte` | `{herkunft, wendepunkt, abgeraten, fehler}` je REF; `belege[] {was, wann, zahl, unterlage: vorhanden, angefordert oder keine, oeffentlich: ja, nein oder offen, ref[], rechnung REF, nachgeholt}`; `orte[] {name, bezug, ref[]}` | `rechnung` macht P14 prüfbar; `orte`, weil 11 "geschichte (Orte)" liest; `oeffentlich`, weil 7 `beweise[].oeffentlich` daraus übernimmt (07 Zeile 114, 484) |
| `leiter[2]` | `{fall, herkunft: fortsetzung oder neu, auswahlRegel, grund, merkmal, nutzen, wert}` je REF außer `fall` (Pfad `antworten.faelle[j]`); `stufen[] {frage, ref}`, `abbruch` | `grund`, `stufen`, `abbruch` für P5 und P15 |
| `switch` | `{fall, anlass {ref oder luecke, lebensphase REF}, ersterGedanke, alternative, angst, ausschlag, abweichung}` | `fall` für P15, `lebensphase` für 5 |
| `karte` | `{achsen, skala "-3..3", mitbewerber[] {kennung, x, y, unio, einwand}, selbst {x, y, bewertungen[2]}, wunschlage {x, y, ref}, freieLage}` | ganzzahlig wie `vorab.wettbewerb` |
| `fremdkategorie[2]` | `{reihe, kategorie, gezeigt[2], bildId, pol, wort REF, deutung {satz, von: team}, parameter, kohortentypisch, poolVersion}` | zwei statt drei Bilder (3.6.6); Bilder nur als Pool-ID |
| `falschWaere[]` | `{art: satz, bild oder verhalten, inhalt, ref, quelle: reiz, pool, vorlieben.nichtIch[n], antworten.grenzenFrei, klaerung oder frei}` | `quelle` zeigt die Herkunft |
| `probedreh` | `{komfort {selbst, beobachtetGespraech, beobachtetKamera} je 1 bis 7, formate[] {format, eignung, grund}, notiz, clips[] lokal}` | drei Werte, weil ein Selbsturteil nur das Selbstbild misst (R3 1.9) |
| `klaerungen[]` | `{id, art, widerspruch, quellen[], optionen[2] {text, setzt}, empfehlung, empfehlungGrund, entscheidung, entschiedenVon, wirktAuf, ref[], folge, bis}` | für `hmWirksam` (Form wie `vorlieben.widersprueche`, 03 5.2) |
| `aufgaben[]` | `{id, art: unterlage, freigabe, foto oder export, was, bezug, wer, bis, status, ergebnisFeld}` | Art `export` für K5 |
| `ort` (neu) | `{licht {richtung, tageszeit, notiz}, orte[] {name, bezug, eignung}, material[] {was, wo}, beobachtetVon, form: vorOrt, fotos oder video}` | macht den Vor-Ort-Nutzen wirksam; Abnehmer 11 |

Betriebsdaten (Dauer je Teil und Frage, Rollen, Einwilligungen der Anwesenden, Transkript) liegen in `meetings`; `workshop` verweist per `meetingId`.

### 5.3 Abnehmer je Feld

| Feld | Abnehmer | Beleg |
|---|---|---|
| `zitate` | 5, 6, 7, 8, 9, 11, 15 | 05 Lesart Z; 06 Eingang; 07 Kennzeichnung eigener Worte; 08 Korpus, `eigeneWorte`, `presse.beispielzitat`; 09 `idee.begruendung`; 11 Eingang; 15 Akt 1 |
| `geschichte` | 5, 6, 7, 8, 11, 12 | 05 Lesart G; 06 Anker; 07 `beweise`; 08 `story` (08 Zeile 356, 371); 11 Orte; 12 Nachtrag F12-2 |
| `leiter` | 5, 6, 7 | 05 Lesart L; 06 Anker Methode; 07 `werte` |
| `switch` | 5, 7 | 05 Spannung, Lebensphase; 07 `positionierung.weil`; für 8 vorgeschlagen (5.4) |
| `karte` | 5, 7, 8 | 05 Konvention; 07 `lageAufDerKarte`; 08 Austauschtest (08 Zeile 339) |
| `fremdkategorie` | 9 | Rohstoff für Varianten (09 Zeile 349); Abbildung vorgeschlagen |
| `falschWaere` | direkt 5, 6, 7, 9; indirekt 8 über `markenvertrag.falschWaere`, 11 über `brief.verbote` | 07 Eingang; 09 Zeile 349 |
| `probedreh` | 11, 12 | 11 Eingang; 12 Eingang |
| `klaerungen` | über `hmWirksam` 3, 6, 8, 9, 11; direkt 5, 7 | 03 3.10; 08 V5; 07 Markenvertrag |
| `aufgaben` | 5, 7 | Unterlage sperrt öffentliche Nutzung; `beweise.pruefstatus` |
| `ort` | 11 | `bild.motive`, `fotobrief.lichtUndTageszeit` |
| `antworten.unity` | nicht von 4 erzeugt | 6 und 12 lesen es aus 02 F13 (06 Zeile 111, 720; 12 Zeile 120, 266); das F12-Zitat liegt in `zitate` |

### 5.4 Abweichungen und offene Änderungsvorschläge

**Nicht in `00_ZERLEGUNG.md` eingetragen (Stand 30.09.2026).** Die zweite Fassung behauptete das; es stimmte nicht. Alle folgenden Punkte sind offene Vorschläge an den Owner, einzutragen bei Freigabe dieses Schritts:

| Nr. | Vorschlag für die Zerlegung | Betrifft |
|---|---|---|
| Z1 | Regel: `antworten.grenzen`, `antworten.anredeJeKanal` und `vorlieben.profil` werden nur über `hmWirksam(mid, pfad)` gelesen. | 3, 6, 8, 9, 11 |
| Z2 | Ausgang 4 in der Form von 5.2: erweiterte `zitate`, `geschichte` (orte, rechnung), `leiter`, `switch` (fall, lebensphase unter anlass), `karte`, `fremdkategorie[2]`, `probedreh`, `klaerungen`, `aufgaben`; neues Feld `workshop.ort`; `belege[].oeffentlich`. Kein Rückschreiben nach `antworten`. | 4 |
| Z3 | Eingang 4 um die Ergänzungen aus 5.1. | 4 |
| Z4 | Eingang 5 um `workshop.klaerungen`, `workshop.aufgaben`. | 5 |
| Z5 | Eingang 6 um `workshop.klaerungen` über `hmWirksam`. | 6 |
| Z6 | Eingang 7 um `workshop.switch`, `klaerungen`, `aufgaben`. | 7 |
| Z7 | Eingang 8 um `workshop.karte` (liest 08 schon, Zeile 339) und `klaerungen` über `hmWirksam`; `switch` als Rückfall für `story.spannung` nur, wenn 8 zustimmt. | 8 |
| Z8 | Eingang 9 um `workshop.klaerungen` über `hmWirksam` und die Abbildung Fremdkategorie auf Parameter (3.6.6) samt Übergangsregel. | 9 |
| Z9 | Eingang 11 um `workshop.ort` und `klaerungen` über `hmWirksam`. | 11 |
| Z10 | Der Einwilligungszweck KI-Verarbeitung (02 D15) gilt für die ganze Kette einschließlich Workshop-Transkript. | 1, 2, 4 |

**Abweichungen.** (a) `fremdkategorie` mit zwei statt drei Bildern (3.6.6). (b) Zitatverweise dürfen auf `antworten.<key>` zeigen, damit nichts doppelt gefragt wird; Schritt 7 kennzeichnet die Quelle getrennt. (c) Q9 aus Schritt 2 zählt nur Fragen der Art neu; Vertiefungen tragen `art: vertiefung` und `recall: key`.

**Bitten an Nachbarn.** An 1: Zweck KI-Verarbeitung um das Workshop-Transkript erweitern (Z10); Einwilligung je anwesender Person führen; zwei Einzelbewertungen je Mitbewerber speichern, damit P9 die Schwelle je Eintrag koppeln kann. An 2: In der Bedingungstabelle und der Bitte an 1 steht noch `vorab.letzteAbschluesse`; gemeint ist `vorab.fakten` mit `feld: abschluesse` (01 D8). An 6, 9, 11: Lesestelle auf `hmWirksam` umstellen (je ein Viertel Tag, Setzung). An 9: Abbildung und Übergangsregel aus 3.6.6 übernehmen oder ablehnen; bei Ablehnung fällt Teil 7 und seine drei Minuten gehen an den Puffer.

---

## 6. Qualitätsprüfung im Schritt

`hmWorkshopPruefen(mid)`: rot sperrt den Abschluss, gelb braucht eine Notiz.

| Nr. | Prüfung | Regel | Stufe |
|---|---|---|---|
| P1 | Wortlaut | `zitate[].text` ist nach Normalisierung Teilfolge des pseudonymisierten Transkripts, oder `korrigiert`, oder `zurueckgelesen` mit `bestaetigt`; `wortschatz`-Wendungen kommen so oft vor wie `vorkommen`. | rot |
| P2 | Sprecher | jedes Zitat hat Sprecher; `oeffentlich: ja` nur bei `makler`; eine Kunden-Wiedergabe des Maklers ist nie `dritte`. | rot |
| P3 | Zeit und Thema | Zeit oder Uhrzeit, Thema aus der Liste. | gelb |
| P4 | Feldbelegung | jedes REF-Feld hat genau eines von `ref` (nicht leer) oder `luecke` (nicht leer); jeder Verweis zeigt auf ein Zitat mit `sprecherBestaetigt` oder einen existierenden v2-Key in `antworten`. | rot |
| P5 | Herkunft des Werts | `leiter[i].wert` verweist auf ein Zitat mit Sprecher `makler` oder auf `antworten.leiter[1]` (nur Leiter 1, gelb); das Wertwort steht in keinem Team-Satz davor; höchstens drei Warum-Stufen. | rot |
| P6 | Zahlen | jede Zahl in `belege` steht in einem Makler-Zitat oder einer Antwort, hat `unterlage`; bei angefordert eine Aufgabe mit `bis` vor dem Richtungstermin und `ergebnisFeld`. | rot |
| P7 | Klärungen | jeder erkannte Widerspruch und jede `vorab.luecken` mit `zielschritt: 4` hat eine Klärung; jede hat `optionen[2]` mit `text`, `empfehlung`, `empfehlungGrund`; Arten grenze, anrede, profil haben `wirktAuf` im Bereich von `hmWirksam` und `setzt` je Option; Art fakt hat `folge` auf eine Aufgabe; offene haben `bis`; höchstens drei mit `entschiedenVon: makler`. | rot |
| P8 | Nie-Liste | je mindestens ein Eintrag Satz, Bild, Verhalten; keiner auf globalen Listen; `nichtIch` nur bestätigt; kein Pool-Merkmal aus `nichtIch`. | gelb |
| P9 | Karte | ganzzahlig minus 3 bis plus 3; Wunschlage gesetzt; Abstand zu jedem Mitbewerber und jeder Kohorten-Wunschlage im Gebiet mindestens 2 Stufen auf einer Achse (Schritt 1 duldet 2 Stufen Abweichung, 01 E6), bei besprochener Abweichung 3; sonst `freieLage: false` mit Hinweis an 5 oder 6. | gelb |
| P10 | Datenschutz | kein Kontaktdatum, kein Eintrag der Ersetzungsliste, kein unbestätigter Namenskandidat im Claude-Dossier; Claude nur mit bestätigter Pseudonymliste **und** KI-Einwilligung; Aufnahme nur mit `HM_WS_RECHT.geklaert` und allen Einwilligungen; `personenbezug` sperrt öffentlich, bei Zitaten und bei `belege[].oeffentlich`; Audio und Clips lokal. | rot |
| P11 | UNIO-Regeln | Makler-Texte (Leitfaden, Ablaufseite, Recall-Karten, Take-B-Satz, Nachlese) ohne Gedankenstriche, Ausrufezeichen, Emojis, Klischee-Wörter, Versalzeile über Headline (`saeubern` plus Klischee-Prüfung). | rot |
| P12 | Schlussritual | genau drei Sätze, je entschieden. | gelb |
| P13 | Probedreh | `selbst` ohne Startwert; drei Werte 1 bis 7; kein Format mit `nie` freigeschaltet. | rot |
| P14 | Geschützte Fragen | `herkunft`, `wendepunkt` und bei Abraten-Zahl deren `belege[].rechnung` nie Lücke "Zeit"; sonst Nachtermin mit Datum. | rot |
| P15 | Bindung an Fälle | `switch.fall` = `antworten.faelle[0]`; Leiter 1 `fall` = `antworten.leiter[0].fall` (außer Status `workshop`); Leiter 2 `fall` ≠ Leiter-1-Fall und entspricht `auswahlRegel`; keine Frage der Art neu zu einem beantworteten Key. | rot |
| P16 | Zugehörigkeit | Es gibt ein Zitat `thema: "zugehoerigkeit"` mit bestätigtem Sprecher `makler`, oder das Prüfprotokoll nennt den Grund; `antworten.unity` ist gegenüber dem Stand vor dem Termin unverändert. | rot |

Dazu die Durchsicht der Gesprächsführung. Der Workshop ist kein Gate; das nächste folgt in Schritt 6.

---

## 7. Typische Fehler und wie sie verhindert werden

| Nr. | Fehler | Verhinderung |
|---|---|---|
| T1 | Das Team legt ein Wertwort nahe | W3, Leitfaden ohne Wertwörter, P5 |
| T2 | Meinung statt Fall | W1 |
| T3 | Zitate geglättet | Zitat-Schere, P1 |
| T4 | Kunden-Wiedergabe gilt als Kundenstimme | P2, Freigabe-Aufgabe |
| T5 | Gefragt wird, was schon vorliegt | Recall, 4.2, P15 |
| T6 | Leiter oder Switch an anderen Fällen als die schriftlichen Antworten | feste Fälle, Auswahlregel, P15 |
| T7 | Workshop wird Präsentation | W6 |
| T8 | Überlänge, Ermüdung | Rang, Puffer, Probedreh in der Mitte, kürzere zweite Hälfte, P14 |
| T9 | Probedreh beschämt | zwei kurze Takes, nie veröffentlicht, Stärke zuerst |
| T10 | Zahl ohne Unterlage im Feed | F13 oder Aufgabe, P6 |
| T11 | Namen erreichen Claude | Auftakt-Hinweis, Pseudonymisierung, P10 |
| T12 | Widerspruch erreicht die Gestaltung nicht | Katalog, P7, ein Leseweg `hmWirksam` |
| T13 | Unbestätigte Team-Zusammenfassung gilt als seine Aussage | nur Transkript-Sätze mit bestätigtem Sprecher belegen |
| T14 | Suggestivfrage gilt im Regelpfad als Makler-Satz | Marken-Fenster endet vor der letzten Team-Frage, P4, P5 |
| T15 | Hörfehler bei Orten | Glossar, Korrektur nur nach Abhören |
| T16 | Alle Makler wählen dieselben Pool-Bilder | Übergangsregel, Kohorten-Prüfung |
| T17 | Zu viele Entscheidungen | höchstens drei Klärungen und drei Sätze, binär mit Empfehlung (Chernev, Böckenholt, Goodman 2015: https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf) |

---

## 8. Umsetzung in der Werkbank

### 8.1 Dateien

| Datei | Änderung |
|---|---|
| `ui_kits/werkbank/wb-workshop.jsx` (neu) | `hmWorkshopLeitfaden` (einseitig, 3.5), `hmWorkshopFaelle` (3.6.1), `hmWorkshopZeitplan`, `hmWorkshopWidersprueche`, `WorkshopKonsole`, `WorkshopAuswertung`, `hmWorkshopPseudonym`, `hmWortschatz`, `hmWorkshopRegeln` (Regelpfad, Thema `zugehoerigkeit`, `belege[].oeffentlich` mit Sperre), `hmWorkshopPruefen` (P1 bis P16), `hmFremdkategorieKohorte`, `hmWirksam`, `WorkshopNachlese`, `hmSelbsttestWorkshop`, Konstante `HM_WS_RECHT`. Lädt vor `wb-vorlieben.jsx`, weil Schritt 3 `hmWirksam` nutzt. Präfix `hm`, Export über `Object.assign(window, ...)`, kein `import()`. |
| `ui_kits/werkbank/wb-strategie.jsx` | `hmTranskribieren`, `hmAudio16k`, `hmGlossar` bleiben; `hmAuswerten`, `hmLeitfaden` ersetzt; Versatz-Regler in `Mitschrift`. |
| `ui_kits/werkbank/wb-team.jsx` | "Gespräche": vorbereiten, führen, auswerten. |
| `ui_kits/werkbank/wb-plattform.jsx` | `hmPfZitate` liest `workshop.zitate` mit bestätigtem Sprecher `makler`. |
| `api/wb-marke.js` | Phase `workshop` mit `SCHRITT.workshop`, `SCHEMA.workshop`; `dossier()` nur pseudonymisiert; Aufruf gesperrt ohne Pseudonymliste oder KI-Einwilligung (serverseitig geprüft). |
| `ui_kits/werkbank/wb-betrieb.jsx` | `hmSelbsttestWorkshop` einhängen. |
| `ui_kits/werkbank/index.html` | Script-Tag `wb-workshop.jsx` nach `wb-strategie.jsx`, vor `wb-vorlieben.jsx`. |
| `docs/werkbank/MARKE_SCHEMA.md` | Abschnitt `workshop` nach 5.2. |

### 8.2 Datenfelder (Referenz, Markus vor dem Termin)

```json
{
  "marke2": { "<mid>": { "workshop": {
    "version": 3,
    "meetingId": "mt1",
    "abgeschlossenAm": null,
    "zitate": [
      { "id": "z1", "sprecher": "makler", "sprecherBestaetigt": true, "text": "Dass sie sich nie gedrängt gefühlt haben.",
        "zeit": null, "thema": "fremdbild-laut-makler", "frage": null, "oeffentlich": "offen", "quelle": "aufnahme",
        "bestaetigt": false, "korrigiert": false, "personenbezug": false, "vorkommen": null, "nachgeholt": null, "meetingId": "mt1" }
    ],
    "geschichte": {
      "herkunft": { "luecke": "im Workshop zu hören (F9, v1-Recall als Einstieg)" },
      "wendepunkt": { "luecke": "im Workshop zu hören (F10)" },
      "abgeraten": { "ref": ["antworten.abgeraten"] },
      "fehler": { "luecke": "im Workshop zu hören (F14)" },
      "belege": [
        { "was": "Mehrerlös nach zwei Jahren Warten", "wann": null, "zahl": "600.000", "unterlage": "keine", "oeffentlich": "offen",
          "ref": ["antworten.abgeraten"], "rechnung": { "luecke": "im Workshop zu hören (F11)" }, "nachgeholt": null },
        { "was": "Vermarktungsdauer Zinshaus Sieveringer Straße", "wann": null, "zahl": "11 Wochen", "unterlage": "angefordert", "oeffentlich": "offen",
          "ref": ["antworten.faelle[0]"], "rechnung": { "luecke": "Zählweise im Workshop zu klären (F13)" }, "nachgeholt": null }
      ],
      "orte": [ { "name": "Sievering", "bezug": "Zinshaus Sieveringer Straße", "ref": ["antworten.faelle[0]"] } ]
    },
    "leiter": [
      { "fall": "antworten.faelle[2]", "herkunft": "fortsetzung", "auswahlRegel": "antworten.leiter[0].fall",
        "grund": { "ref": ["antworten.faelle[2]"] },
        "merkmal": { "luecke": "Moment im Workshop zu hören (F1)" },
        "nutzen": { "luecke": "antworten.leiter[0] fehlt im Seed (v1)" },
        "wert": { "luecke": "im Workshop zu hören (F3)" }, "stufen": [], "abbruch": null },
      { "fall": "antworten.faelle[1]", "herkunft": "neu", "auswahlRegel": "stufe2-ausschlag-leer",
        "grund": { "luecke": "Ausschlag im Workshop zu hören (F1)" },
        "merkmal": { "luecke": "im Workshop zu hören (F1)" },
        "nutzen": { "luecke": "im Workshop zu hören (F2)" },
        "wert": { "luecke": "im Workshop zu hören (F3)" }, "stufen": [], "abbruch": null }
    ],
    "switch": { "fall": "antworten.faelle[0]",
      "anlass": { "ref": ["antworten.faelle[0]"], "lebensphase": { "luecke": "im Workshop zu hören (F4)" } },
      "ersterGedanke": { "luecke": "im Workshop zu hören (F5)" },
      "alternative": { "luecke": "antworten.alternative fehlt im Seed" },
      "angst": { "ref": ["antworten.hindernis"] },
      "ausschlag": { "luecke": "antworten.alternativeKonnte fehlt im Seed" },
      "abweichung": null },
    "karte": { "achsen": { "x": ["nahbar", "distanziert"], "y": ["klassisch", "zeitgenössisch"] }, "skala": "-3..3",
      "mitbewerber": [], "selbst": null, "wunschlage": null, "freieLage": null },
    "fremdkategorie": [],
    "falschWaere": [],
    "probedreh": { "komfort": { "selbst": null, "beobachtetGespraech": null, "beobachtetKamera": null }, "formate": [], "notiz": "", "clips": [] },
    "klaerungen": [
      { "id": "k1", "art": "grenze", "widerspruch": "Familie ist tabu, die Herkunft handelt vom Großvater",
        "quellen": ["antworten.grenzen", "v1:aufgewachsen"],
        "optionen": [
          { "text": "Familie im Text ja, im Bild nie", "setzt": { "familie im Bild": "nie", "familie im Text": "zeigen" } },
          { "text": "Weder im Text noch im Bild", "setzt": { "familie im Bild": "nie", "familie im Text": "nie" } } ],
        "empfehlung": 0, "empfehlungGrund": "Die Herkunft ist ein Beleg für seine Nähe zum Zinshaus, die Bildgrenze bleibt unberührt.",
        "entscheidung": null, "entschiedenVon": "makler", "wirktAuf": "antworten.grenzen", "ref": [], "folge": null, "bis": "2026-10-20" },
      { "id": "k5", "art": "fakt", "widerspruch": "Grätzl-Anteil: Schätzung 6 bis 8 von 10, genannte Fälle 1 von 3",
        "quellen": ["vorab.luecken[3]"],
        "optionen": [ { "text": "Zahl nur aus dem Import", "setzt": null }, { "text": "Schätzung übernehmen", "setzt": null } ],
        "empfehlung": 0, "empfehlungGrund": "Eine öffentliche Zahl braucht eine Zählung, keine Schätzung.",
        "entscheidung": 0, "entschiedenVon": "team", "wirktAuf": null, "ref": [], "folge": "a2", "bis": null }
    ],
    "aufgaben": [
      { "id": "a1", "art": "unterlage", "was": "Beleg für 11 Wochen Vermarktung Zinshaus Sieveringer Straße", "bezug": "geschichte.belege[1]",
        "wer": "makler", "bis": "2026-10-19", "status": "offen", "ergebnisFeld": "geschichte.belege[1].unterlage" },
      { "id": "a2", "art": "export", "was": "Verkaufte Objekte der letzten zwölf Monate aus der Maklersoftware", "bezug": "klaerungen.k5",
        "wer": "makler", "bis": "2026-10-19", "status": "offen", "ergebnisFeld": "vorab.kennzahlen.graetzlAnteil" }
    ],
    "ort": { "licht": null, "orte": [], "material": [], "beobachtetVon": "team", "form": null }
  } } }
}
```

Lesart: Das Beispiel zeigt den Zustand vor dem Termin; `luecke` sind echte Lücken. Die Fälle folgen `02_fragebogen.md` 3.5 (0 Zinshaus, 1 Anlegerwohnung, 2 Altbau Hietzing). Die v1-Werte `belege` und `hindernis` sind nach 02 3.5 und 06 Zeile 300 bis 315 als v2-Felder gelesen. `v1:aufgewachsen` in `quellen` markiert eine Recall-Quelle des Seed-Sonderfalls; sie ist nie REF (P4). `vorab.luecken[3]` ist der vierte Eintrag im Beispiel von 01 8.2. Die Daten 19. und 20.10.2026 stammen aus `auftrag.termine` im Beispiel von 01 8.2 (Richtungstermin 20.10.); der Seed selbst kennt keine Termine, und `mt1` ist der v1-Workshop vom 11.09., aus dem nur `z1` übernommen wird. `z1` hat einen bestätigten Sprecher, weil die Mitschrift in `mt1` ihn Markus zuordnet; die Zusammenfassung von `mt1` wird nicht übernommen (T13). Prüfstand dieses Beispiels: P4, P6 (a1 mit `bis` vor dem 20.10.), P7 (k1 offen mit `bis`, k5 Art fakt mit `folge`), P15 grün; P5, P12, P14 und P16 sind vor dem Termin nicht anwendbar.

### 8.3 Schema für die Claude-Kette

Phase `workshop` in `api/wb-marke.js`, Structured Outputs wie in `schritt()`. Notation der Datei (`O` macht alle Felder Pflicht, darum ist REF mit beiden Schlüsseln gebaut; die Werkbank entfernt den leeren Schlüssel, P4 prüft "genau eines nicht leer"):

```js
const REF = O({ ref: A(S), luecke: S });
const EN = (werte) => ({ type: "string", enum: werte });
SCHEMA.workshop = O({
  sprecher: A(O({ satzIndex: I, sprecher: EN(["makler", "team", "dritte", "unsicher"]) })),
  zitate: A(O({ satzVon: I, satzBis: I, thema: S })),
  geschichte: O({ herkunft: REF, wendepunkt: REF, abgeraten: REF, fehler: REF,
    belege: A(O({ was: S, wann: S, zahl: S, ref: A(S), rechnung: REF })),
    orte: A(O({ name: S, bezug: S, ref: A(S) })) }),
  unity: REF,
  leiter: A(O({ fall: S, grund: REF, merkmal: REF, nutzen: REF, wert: REF,
    stufen: A(O({ frage: S, ref: A(S) })), abbruch: S })),
  switch: O({ fall: S,
    anlass: O({ ref: A(S), luecke: S, lebensphase: REF }),
    ersterGedanke: REF, alternative: REF, angst: REF, ausschlag: REF }),
  klaerungKandidaten: A(O({ widerspruch: S, quellen: A(S) })),
  aufgaben: A(O({ art: EN(["unterlage", "freigabe", "foto", "export"]), was: S, bezug: S })),
  hinweise: A(S),
});
```

**Regeln zur Übernahme.** `leiter[i].fall`, `herkunft` und `auswahlRegel` gibt die Werkbank vor und überschreibt Claudes `fall`, falls er abweicht (Hinweis im Protokoll). `klaerungKandidaten` sind nur Kandidaten: Das Team vervollständigt `art`, `optionen[2] {text, setzt}`, `empfehlung`, `empfehlungGrund`, `wirktAuf`, `folge` und `bis`, erst dann entsteht ein Eintrag in `workshop.klaerungen` (P7). `unity` ist nur ein Vorschlag, welches Zitat F12 beantwortet; das Zitat erhält `thema: "zugehoerigkeit"` erst nach Sprecher-Bestätigung (P16), nach `antworten` wird nichts geschrieben. `belege[].oeffentlich` setzt nie Claude, nur die Antwort auf F13. Zitate kommen nur als Satzbereiche; den Wortlaut setzt die Werkbank aus dem Transkript zusammen. `personenbezug` setzt die Regel.

**Prompt `SCHRITT.workshop` (Kern).** Ordne jedem Satz einen Sprecher zu. Wähle Zitate als Satzbereiche. Belege jedes Feld nur mit Sätzen des Maklers oder Antworten im Dossier. Übernimm die vorgegebenen Fälle. Fehlt ein Beleg, schreibe den Grund in `luecke` und lass `ref` leer. Ein Wert gilt nur, wenn der Makler ihn ausspricht. Schreibe nie eine Lebensphase, die er nicht beschreibt.

Ohne `ANTHROPIC_API_KEY` (offen beim Owner) oder ohne KI-Einwilligung läuft `hmWorkshopRegeln` mit derselben Struktur.

### 8.4 Regelpfad ohne Claude

- **Sprecher:** Kandidat `makler` ist ein Satz im Marken-Fenster (höchstens 20 Sekunden zurück, 3 nach vorn, Setzung), nie vor dem Beginn der letzten Frage der Gesprächsführung (erkannt am Fragezeichen oder an Wortüberlappung mit der Leitfaden-Frage). Sonst `unsicher`. Belegende Sätze brauchen Bestätigung.
- **Zitate:** Sätze im Fenster jeder Zitat-, Wert-, Beleg-, Geschichte- und Nie-Marke, höchstens 30 Wörter.
- **Felder:** Teil, Frage-ID, Markentyp und Leiter oder Stufe ergeben das Zielfeld nach fester Tabelle; Fälle aus dem Leitfaden; Zitat zu F12 erhält `thema: "zugehoerigkeit"`.
- **Widersprüche:** `HM_WS_WIDERSPRUECHE` mit Art, Bedingung, Text, zwei Optionen mit `setzt`, Empfehlung, Grund, Entscheider.
- **Formate:** Regel aus 3.6.4.
- Alles ohne Marke bleibt Lücke; kein Mustersatz, kein Text aus dem Musterbeispiel.

### 8.5 Selbsttest

`hmSelbsttestWorkshop`, feste Testdaten, grün nach jeder Änderung:
1. Ein Zitat, das nicht im Transkript steht, fällt in P1 durch.
2. Ein Wert, den zuerst die Gesprächsführung sagt, fällt in P5 durch; ein Satz direkt nach einer Team-Frage wird ihr im Regelpfad nicht zugeschlagen.
3. Ein Transkript mit E-Mail-Adresse und Mitbewerbernamen erreicht das Dossier nur bereinigt, der Name als Kennung (P10).
4. Elif (v2, ohne v1-Geschichte): Herkunft, Wendepunkt und Fehler sind neue Fragen, F12 vertieft ihre Antwort aus 02 F13. Markus (v1): Herkunft und F12 als Vertiefung mit Recall.
5. Markus: Switch an `faelle[0]`; F7 zitiert "Provision"; eine Neufrage zu `hindernis` fällt in P15 durch.
6. Leiter: Mit `antworten.leiter[0]` und `[1]` gefüllt enthält der Leitfaden für Leiter 1 kein F2, und F3 zitiert `leiter[1].antwort`; Leiter 2 liegt an einem anderen Fall als Leiter 1 und nicht an `faelle[0]`, solange ein dritter Fall existiert (für Markus `faelle[1]`); mit `leiter` Status `workshop` sind beide Leitern `neu`, und Leiter 1 liegt am Fall mit `belegKandidat`.
7. Markus: Der Leitfaden erkennt K1 und K2, legt K4 (profil) und K5 (fakt mit Export-Aufgabe) als Team-Klärungen an; eine Klärung der Art grenze mit `wirktAuf` außerhalb der drei Bereiche fällt in P7 durch.
8. Bei simulierter Überziehung fällt zuerst K1, nie F9, F10, F11 (P14).
9. Eine Wunschlage mit Abstand 1 setzt `freieLage: false`; ein Wert 0,5 fällt durch (P9).
10. Der Regelpfad ohne Marken erzeugt nur Lücken.
11. Ein Format mit `nie` in `antworten.formate` fällt in P13 durch.
12. Kein Makler-Text enthält Gedankenstrich, Ausrufezeichen, Klischee-Wort oder Versalzeile über einer Headline (P11).
13. **Sperren:** Mit `HM_WS_RECHT.geklaert` falsch startet keine Aufnahme, nur Zurücklesen. Ohne KI-Einwilligung mit Ja wird der Claude-Aufruf abgewiesen, auch mit bestätigter Pseudonymliste (Client und `api/wb-marke.js`).
14. Ein F12-Zitat mit Sprecher `makler` landet mit `thema: "zugehoerigkeit"` in `zitate`; `antworten.unity` ist danach bytegleich zum Stand vor dem Termin (P16). Ein Beleg mit Verweis auf ein Zitat mit `personenbezug: true` lässt sich nicht auf `oeffentlich: ja` setzen (P10).
15. Das Referenz-JSON aus 8.2 besteht P4, P6, P7 und P15.

### 8.6 Aufwand, Kapazität, Video-Variante

**Bau (Setzung).** Leitfaden auf einer Seite, Fälle, Widerspruchskatalog 2 Tage; Konsole mit Aufnahme, Marken, Zeitplan 3; Karte, Bildreihen, Nie-Liste, Klärungen, drei Sätze 1,5; Probedreh 1; Auswertung mit Pseudonymen, Sprecher, Zitat-Schere, Feldern, Ort 2,5; Wortschatz, Kohorte, Zugehörigkeits-Zitat und `belege[].oeffentlich` 1; Regelpfad und P1 bis P16 1,5; Claude-Phase und Sperren 1; Ansichten 1; Selbsttest, Schema-Doku 1. **Summe 15,5 Tage.** Nicht enthalten: Beschaffung und Lizenz der vier Pool-Bilder und der Merkmale (Zerlegung Kapitel 7, Punkt 3), Umbau in 6, 9, 11 (je ein Viertel Tag).

**Betrieb je Makler (Setzung).**

| Posten | vor Ort | Video |
|---|---|---|
| Vorbereitung | 55 Min. | 55 Min. |
| Anfahrt, zwei Personen, je rund 60 Min. hin und zurück | 120 Min. | 0 |
| Termin, zwei Personen | 220 Min. | 220 Min. |
| `workshop.ort` | 5 Min. | 10 Min. (Fotos sichten) |
| Pseudonyme, Auswertung, Durchsicht | 70 Min. | 70 Min. |
| **Summe Personenzeit** | **rund 7,8 Stunden** | **rund 5,9 Stunden** |
| davon Gesprächsführung (CD) | rund 4,2 Stunden | rund 3,2 Stunden |
| Rechenzeit, unbeaufsichtigt | rund 1 Stunde | rund 1 Stunde |

**Kapazität.** Die geplante Zahl neuer Makler je Monat ist nicht festgelegt (Lücke beim Owner). Szenarien:

| Makler je Monat | Team vor Ort | Team Video | davon CD vor Ort | davon CD Video |
|---|---|---|---|---|
| 2 | 16 Std. | 12 Std. | 8 Std. | 6 Std. |
| 4 | 31 Std. | 24 Std. | 17 Std. | 13 Std. |
| 8 | 62 Std. | 47 Std. | 34 Std. | 26 Std. |

Engpass ist die Gesprächsführung (Ableitung): Ab etwa vier Maklern im Monat bindet der Workshop allein rund einen CD-Tag je Woche.

**Video-Variante als Kostenhebel.** Gleichwertig ist sie nur, wenn `workshop.ort` dieselben Felder füllt. Dafür schickt der Makler vor dem Termin vier Telefonfotos seines Arbeitsorts (Arbeitsplatz, Fensterlicht vormittags und nachmittags, Eingang mit Straße), abgelegt als `vorab.material` mit Rechten geklärt; das kostet ihn rund fünf Minuten (Setzung) und braucht keine neue Einwilligung, solange die Fotos keine Dritten zeigen. `ort.form: "fotos"`. Der Probedreh läuft an seiner Laptop-Kamera; `probedreh.notiz` vermerkt, dass Licht nicht beurteilt wurde. **Entscheidungsregel (Setzung):** Die ersten fünf Workshops vor Ort, bei zweien davon zusätzlich die vier Fotos. Kann Schritt 11 aus den Fotos dieselben Angaben für `fotobrief.lichtUndTageszeit` und `orte` ableiten wie aus der Beobachtung vor Ort, wird Video der Standard und vor Ort die Ausnahme für Makler mit Porträt-Termin im eigenen Büro. Ob der Makler ohne eigenes Konto am Videowerkzeug teilnehmen kann, ist zu prüfen (Lücke).

**Makler:** 110 Minuten im Termin plus die Aufgaben auf seiner Liste; bei Video zusätzlich rund fünf Minuten für die Fotos.

---

## 9. Offene Punkte und Lücken

1. **Setzungen** zu Dauer, Minuten, Rang, Schwellen (Probedreh, Karte 2 Stufen, Zitatfenster, Leiter-Abbruch, Wortschatz, Kohorte 60 Prozent und fünf Makler): Messung an den ersten fünf Maklern über `meetings[].messung`.
2. **Rechtsgrundlage** für Aufzeichnung, lokale Speicherung, Löschfristen von Audio und Clips, Pseudonymisierung als Maßnahme, anonymisierte Kundengeschichten. **Verantwortlich: Owner. Frist (Setzung): 09.10.2026, vor dem ersten geplanten Workshop mit einem echten Makler (13.10.2026 im Beispiel von 01 8.2).** Bis dahin ist `HM_WS_RECHT.geklaert` falsch, und die Konsole nimmt nicht auf. Dieses Dokument ist keine Rechtsberatung.
3. **Zerlegung:** Vorschläge Z1 bis Z10 (5.4) offen.
4. **Bitten** an 1, 2, 6, 9, 11 (5.4) offen; bei Ablehnung der Abbildung durch 9 fällt Teil 7.
5. **Bildpool** für zwei Reihen und die Merkmale: Beschaffung, Lizenz, Ablage außerhalb des öffentlichen Repos.
6. **Kurz-Transkription, Sprecher-Erkennung, Namenserkennung:** nicht gemessen; darum Marken, Fenster-Regel und Bestätigung durch das Team.
7. **Makler je Monat:** Lücke; bestimmt, ob Video früher Standard wird.
8. **Markus-Daten:** `vorab.wettbewerb`, `auftrittHeute`, `antworten.alternative`, `alternativeKonnte`, `leiter`, `stimmproben`, `fremdbild`, Einwilligungen fehlen im Seed; der Beweis in STATUS Punkt 7 braucht einen geführten Workshop.
9. **Anrede gegenüber dem Makler** allgemein offen.

---

## 10. Quellen

Intern: `../00_ZERLEGUNG.md`, `../bestand/KETTE_IST.md`, `../bestand/FRAGEN_WIRKUNG_IST.md`, `../research/R1-studios.md`, `R3-interview.md`, `R4-tools.md`, `R5-makler.md`, `R8-kundenerlebnis.md`; die Nachbarschritte `01` bis `03`, `05` bis `09`, `11`, `12`, `15`; `docs/werkbank/MARKENQUALITAET.md` Kapitel 5; `docs/werkbank/MARKE_SCHEMA.md`; Code `ui_kits/werkbank/wb-strategie.jsx`, `wb-team.jsx`, `wb-store.jsx`, `wb-os-data.jsx`, `wb-plattform.jsx`, `wb-data.jsx`, `index.html`, `api/wb-marke.js`, `ui_kits/werkbank/CLAUDE.md`.

Methoden und Praxis
- NN/g, Critical Incident: https://www.nngroup.com/articles/critical-incident-technique/
- Fitzpatrick, The Mom Test (Zusammenfassung): https://mtlynch.io/book-reports/the-mom-test/
- Reynolds und Gutman, Laddering: https://is.muni.cz/el/1456/jaro2013/MPH_MVPS/39278324/LadderingTheoy_original.pdf
- Grunert und Grunert, Means-End Chains: https://pure.au.dk/ws/files/32299631/wp34.pdf
- Moesta und Spiek, Four Forces: https://jobstobedone.org/the-four-forces/
- Dunford, Positionierung: https://www.aprildunford.com/post/a-product-positioning-exercise
- Sycheva, Smashing Magazine 2026: https://www.smashingmagazine.com/2026/07/how-turn-brand-strategy-into-visual-direction/
- Olson Zaltman, ZMET: https://www.olsonzaltman.com/zmet
- France, projektive Techniken (Aussage zur Auswertung nach R3 1.4): https://arxiv.org/abs/2409.04995
- GV Brand Sprint (Zusammenfassung): https://www.reforge.com/blog/brief-how-to-define-your-brand-with-gv-s-3-hour-sprint
- Studio Republic: https://www.studiorepublic.com/blog/a-guide-to-our-brand-discovery-workshop/
- Monteiro, 13 Ways (Sekundärquelle): https://thepiratetester.wordpress.com/2021/04/12/2021-04-12-my-breakdown-of-mike-monteiro-13-ways-designers-screw-up-client-presentations-and-how-it-applies-to-testers/
- Liz Lerman, Critical Response Process: https://lizlerman.com/critical-response-process/
- Pentagram, About: https://www.pentagram.com/about
- NAR Magazine zu Glennda Baker: https://www.nar.realtor/magazine/real-estate-news/technology/how-this-agent-is-making-six-figures-on-tiktok

Studien
- Galesic und Bosnjak 2009: https://academic.oup.com/poq/article-abstract/73/2/349/1939196
- Xiao u. a. 2020: https://arxiv.org/abs/1905.10700
- Nachfragetypen in Chatbot-Umfragen, CHI 2025 (Übertragung auf Laddering ist Ableitung): https://arxiv.org/abs/2503.08582
- Anderson, Shah, Kreminski 2024: https://dl.acm.org/doi/10.1145/3635636.3656204
- Liu und Conrad 2019: https://journals.sagepub.com/doi/abs/10.1177/0894439318755336
- Wilson und Schooler 1991: https://doi.org/10.1037//0022-3514.60.2.181
- Chernev, Böckenholt, Goodman 2015: https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf
- Kahneman u. a. 1993 (Peak-End): https://journals.sagepub.com/doi/10.1111/j.1467-9280.1993.tb00589.x
- Buell und Norton 2011 (Labor Illusion): https://doi.org/10.1287/mnsc.1110.1376

Werkzeuge
- Typeform Recall: https://www.typeform.com/developers/create/recall-information/
- MediaRecorder API, MDN: https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

---

## Anhang A. Begründungen

**A.1 Warum Teil 4 25 Minuten hat.** Er trägt die geschützten Stoffe für Story (8) und Herkunfts-Territorium (6). Je erzählte Geschichte mit einer Nachfrage rund fünf bis sechs Minuten: Herkunft 6, Wendepunkt 6, Rechnung 6, Zugehörigkeit 3, Fehler 3, Unterlagen 1 (Setzung). Die Zugehörigkeit übernimmt die drei Minuten der gestrichenen Gegenprobe.

**A.2 Warum 110 Minuten.** Gegenüber 115 Minuten der zweiten Fassung spart die zweite Hälfte fünf Minuten (Teil 7 minus 2, Teil 8 minus 2, Puffer minus 1); in Teil 4 ersetzt F12 die Gegenprobe bei gleicher Länge. Grund: Jede Minute ohne harten Abnehmer schwächt den Moment am Ende (Peak-End, Kahneman u. a. 1993, oben).

**A.3 Warum der Probedreh in der Mitte liegt.** Nach Teil 4 liegen die Geschichten für Take A und B vor; nach rund 60 Minuten Erzählen ist der Wechsel zum Stehen vor der Kamera zugleich eine Pause; am Ende wäre Ermüdung wahrscheinlich (T8). Gemessen wird: Beobachtungswert Take A gegen den Eindruck am ersten Drehtag (Schritt 11).

**A.4 Warum diese Reihenfolge.** Er beginnt mit Fällen, die er gern erzählt; Persönliches folgt, wenn Vertrauen da ist; Karte und Bilder wechseln vom Erzählen zum Zeigen; die Nie-Liste braucht die Konvention der Karte; das Schlussritual ist der gesetzte Höhepunkt (Peak-End, oben). Ableitung.

**A.5 Warum Leiter 2 nicht am Switch-Fall.** Teil 3 fragt `faelle[0]` zehn Minuten lang nach der Entscheidung. Eine Leiter am selben Fall würde Anlass und Ausschlag doppelt erzählen lassen und den Wert an dieselbe Geschichte binden (Ableitung). Deshalb erst ein dritter Fall, `faelle[0]` nur als Rückfall.

**A.6 Warum die Karten-Schwelle 2 Stufen.** Schritt 1 duldet zwischen zwei unabhängigen Bewertungen 2 Stufen Abweichung (01 E6); ein kleinerer Abstand zur Wunschlage läge im Messrauschen (Ableitung).

**A.7 Warum die Nachlese.** Das Ende eines langen Termins soll bleiben (Peak-End, oben), und sichtbare Arbeit erhöht den wahrgenommenen Wert (Buell und Norton 2011, oben).

## Änderungen aus der Kettenprüfung

Stand 30.09.2026. Nur die zwei Befunde zu diesem Schritt, sonst unverändert.

1. **`unity` hat wieder genau einen Erzeuger (02 F13, D13).** F12 ist keine eigene Frage mehr, sondern Vertiefung: "Sie schrieben: {unity}. Wo haben Sie das zuletzt gemerkt?" Das Ergebnis geht nur nach `workshop.zitate` mit `thema: "zugehoerigkeit"`. Das Rückschreiben nach `antworten.unity` ist überall gestrichen (Ziele E9, Ablauf Teil 4, Tabelle 3.6.3 samt Absatz, Auswertung, Rollen, Fragenliste F12, Ausgang 5.2, Abnehmer, Claude-Übernahme, Regelpfad, Selbsttest 4 und 14, Baupläne, P16). Die Berufung auf eine Bitte von 2 entfällt, weil 2 sie gestrichen hat. P16 prüft jetzt, dass `antworten.unity` unverändert bleibt. In der Zerlegung stand das Rückschreiben in diesem Dokument unter Z2 (nicht Z4, wie der Befund sagt); es ist dort gestrichen, Z4 bleibt unverändert.
2. **`belege[].oeffentlich` wird geliefert (Vertrag mit 7, 07 Zeile 168, 253, 484).** F13 hat den Zusatz "Dürfen wir die Zahl nach Prüfung öffentlich nennen?" und schreibt `belege[].oeffentlich` (ja, nein, offen). Ja ist gesperrt, wenn der Beleg auf ein Zitat mit `personenbezug: true` verweist oder die Pseudonymliste im Feld `was` ersetzt hat (P10 erweitert). Ausgang 5.2, Referenz-JSON (beide Belege `offen`), Z2 und Selbsttest 14 sind ergänzt. Damit bleibt die gebündelte Zusatzwahl in 7 die Ausnahme für Belege, bei denen F13 aus Zeitgründen ausfiel.

Nicht geändert: die Zeitplanung (F12 bleibt drei Minuten, der Zusatz in F13 passt in dessen Minute, Setzung) und der Historienvermerk (4) im Kopf, der den Stand der dritten Fassung beschreibt.
