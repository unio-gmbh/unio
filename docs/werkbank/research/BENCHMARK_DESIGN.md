# UNIO HUMAN: Design-Benchmark

Stand: 28.09.2026. Recherche für die Weiterentwicklung von `ui_kits/werkbank` nach v3 und v4 (siehe `docs/werkbank/V2.md`, Abschnitte 8 und 9). Ziel: Apple-artig nativ, ruhig, wenig Text, klare Headlines, kein Dashboard-Look, nicht wie Lucida OS.

Verbindlich bleiben die Design-Masterrichtlinien und "Feedback, Dos & Don'ts" (Mastergedächtnis): keine Eyebrows, keine Textzeichen als Icons, nur 1,5-px-Stroke-SVGs, keine Deko-Punkte, keine Gedankenstriche, UNIO-Farben (`--base #F2EFE9`, `--card #FBFAF6`, `--ink #141210`, `--orange #E96F2B`) und Power Grotesk, Mono nur für Daten, Du-Form, Sentence case, keine Ausrufezeichen. Wo ein Benchmark dem widerspricht, gewinnt die Hausregel.

**Bildschirme, auf die sich die Regeln beziehen**

| Rolle | Bereiche |
|---|---|
| Makler | Heute, Marke (Fragebogen, Konzept, Design, Website), Inhalte (Liste, Beitrag in der Ansicht Abstimmung), Wirkung, Shop |
| Team | Heute, Akquise, Makler (Arbeitsbereich mit Überblick, Inhalte, Wirkung, Marke, Einrichtung, Gespräche), Produktion (Liste, Beitrag in der Ansicht Werkstatt), Einstellungen |
| Global | Seitenleiste, Sheet, Nachrichten, Assistent, Handy-Ansicht |

**Befund am Prototyp (Stand heute, nur gelesen):** In den JSX-Dateien kommen 18 verschiedene Schriftgrößen vor (10,5 bis 40 px), am häufigsten 13, 14 und 17 px. Es gibt keine Tastaturbedienung (kein `keydown`, kein `metaKey`). In der Team-Produktion steht noch das alte Wording "Auto-Freigabe … Runde 1 von 2". Metazeilen trennen mit Mittelpunkt.

---

## 1. Was die besten Produkte gemeinsam haben

1. **Die Navigation tritt zurück, der Inhalt tritt vor.** Linear hat im März 2026 die Seitenleiste abgedunkelt, Icons verkleinert und reduziert und Trennlinien im Kontrast gesenkt ("structure should be felt not seen"). Apple lässt mit Liquid Glass die Bedienelemente über dem Inhalt schweben und schrumpft die Tab-Leiste beim Scrollen.
2. **Eine Liste, die sich leert.** Things (Heute, Diese Woche), Linear (Inbox, Triage), Superhuman (Inbox Zero): Ein Eintrag verlässt die Ansicht, sobald über ihn entschieden ist. Leer ist der Erfolgszustand.
3. **Tempo ist das Produkt.** Superhuman setzt 100 ms als Obergrenze und zielt intern auf 50 ms. Aktionen sind sofort sichtbar erledigt, Rückgängig ist das Sicherheitsnetz, nicht der Bestätigungsdialog.
4. **Ein Befehlsmenü überall mit derselben Taste.** Superhuman, Linear und Notion Calendar nutzen Cmd+K, Arc Cmd+T. Das Menü zeigt neben jedem Befehl das Kürzel und lehrt es dadurch.
5. **Feedback hängt am Ort.** Frame.io verankert Kommentare an Zeitpunkt und Bildstelle, Figma an der Stelle im Entwurf, erledigte Threads werden aufgelöst und verschwinden.
6. **Onboarding im Produkt statt Tour.** Stripe führt eine eingebettete Checkliste bis alles erledigt ist, Linear lässt die erste Aufgabe wirklich erledigen, Vercel verzichtet ganz auf Willkommens-Modal und füllt Felder selbst aus. Apple: sinnvolle Voreinstellungen, Einrichtung aufschieben, was nicht nötig ist.

---

## 2. Regeln (24, prüfbar)

Format je Regel: **Regel.** Prüfung. *Quelle.* Bildschirm.

### Typografie und Text

**R1. Höchstens sechs Schriftgrößen in der ganzen App: 28, 20, 17, 15, 13 und 12 px (Mono).**
Prüfung: `grep -o "fontSize: *[0-9.]*"` über `ui_kits/werkbank` liefert nur diese Werte (heute 18 Werte). 28 Seitentitel, 20 Abschnitt und Sheet-Titel, 17 Zeilentitel und Fließtext, 15 Sekundärtext, 13 Meta, 12 Mono für Zahlen und Zeiten. Eine einzige Ausnahme pro Seite für die eine große Kennzahl auf Wirkung (40 px, Mono oder Power Grotesk tabular).
*Apple HIG Typography: macOS-Textstile Large Title 26, Title 1 22, Title 2 17, Title 3 15, Body 13; iOS Body 17, Subheadline 15, Footnote 13. Die Skala oben ist die Web-Übertragung dazwischen.* Alle Bildschirme.

**R2. Hierarchie über Größe und Gewicht, höchstens zwei Gewichte (Regular und Medium).**
Prüfung: kein Bold unter 17 px, keine Versal-Labels, keine farbigen Überschriften.
*HIG Typography, Abschnitt "Conveying hierarchy"; v3-Regel 5; Masterrichtlinien 2.1.* Alle Bildschirme.

**R3. Seitentitel sind ein Wort oder eine kurze Phrase unter 15 Zeichen, nie der App-Name, nie eine Erklärung darunter.**
Prüfung: "Heute", "Marke", "Produktion" stehen allein; kein Untertitel-Absatz unter dem Seitentitel. Kontext (Datum, Anzahl) höchstens als eine 15-px-Zeile.
*HIG Toolbars: "keep the title under 15 characters", "Don't title windows with your app name".* Alle Seitenköpfe.

**R4. Zeilentitel bis rund 40 Zeichen, Metazeile eine Zeile; Dateinamen mit Auslassung in der Mitte.**
Prüfung: bei 1280 px und bei 390 px bricht kein Zeilentitel mehr als zweimal um; `text-overflow` auf der Metazeile.
*HIG Lists and tables: "Keep item text succinct", Auslassung in der Mitte bewahrt Anfang und Ende.* Inhalte, Produktion, Akquise, Makler-Liste, Material in Marke > Design.

**R5. Kein "wir", keine Possessivpronomen in Beschriftungen, Verben auf Knöpfen.**
Prüfung: "Inhalte" statt "Deine Inhalte", "Hochladen" statt "Los geht's", im Fehlertext eine Person oder das Ding als Subjekt ("Lisa schneidet gerade", "Der Upload ist abgebrochen"), nie "Wir haben ein Problem".
*HIG Writing: "Use possessive pronouns sparingly", "Avoid using we altogether", "it's almost always best to use a verb".* Alle Bildschirme, vor allem Nachrichten und Fehler.

**R6. Metazeilen ohne Mittelpunkt als Trenner.**
Prüfung: `grep "·"` in den Metazeilen der Listen ist leer; stattdessen Komma oder zweite Zeile ("Julia Berger, geht Do., 3. Okt. online").
*Masterrichtlinien 3.2 (keine Mittelpunkte als Worttrenner, u. a. UNIO Story-Strecken); Hausregel geht vor.* Produktion, Inhalte, Akquise.

### Seitenleiste, Listen, Inspektor

**R7. Seitenleiste: fünf Einträge je Rolle, eine Ebene, weiche Auswahl, leiser als der Inhalt.**
Prüfung: genau fünf Hauptpunkte; Auswahl als Fläche `--ink` mit rund 6 % Deckkraft und Radius 8, kein schwarzer Pillen-Hintergrund; Text der Seitenleiste in `--ink` mit reduzierter Deckkraft, Auswahl in voller Deckkraft; keine Zähler außer an Heute. Nichts Kritisches ganz unten in der Leiste (Assistent und Nachrichten bleiben oben rechts und unten rechts im Inhalt).
*HIG Sidebars: "no more than two levels of hierarchy", "Avoid putting critical information or actions at the bottom of a sidebar"; Linear, A calmer interface (2026): Seitenleiste abgedunkelt, damit der Inhalt vortritt.* Seitenleiste beider Rollen.

**R8. Listenzeile: mindestens 44 px hoch einzeilig, 60 px zweizeilig; Trennlinie eingerückt auf Textkante; eine Aktion am Zeilenende.**
Prüfung: Messung im Browser; Trennlinie beginnt bündig mit dem Zeilentitel, nicht am Rand; rechts entweder ein Wert, ein Status oder ein Pfeil, nie mehrere.
*HIG Accessibility: Trefferfläche 44 x 44 pt; HIG Lists and tables (Info-Knopf nur für Information, Pfeil nur für Navigation); iOS Inset-Grouped-Listen; v3 "gruppierte Listen mit eingerückten Trennlinien".* Inhalte, Produktion, Akquise, Makler, Einstellungen, Shop-Bestellungen.

**R9. Listen vor Karten; Karten nur, wo ein Bild die Entscheidung trägt.**
Prüfung: Karten nur für Freigaben auf Heute und Produkte im Shop; alles andere ist Zeile. Keine Karte in einer Karte.
*HIG Lists and tables: "Prefer displaying text in a list or table", für viele Bilder eine Sammlung; v3-Regel 2; Masterrichtlinien 2.2 (keine Box-in-Box).* Heute, Shop, Wirkung.

**R10. Die Auswahl bleibt sichtbar markiert, solange rechts ihr Detail offen ist.**
Prüfung: In Produktion und Makler bleibt die gewählte Zeile hinterlegt, wenn Werkstatt oder Arbeitsbereich offen ist; Pfeil hoch und runter wechselt die Auswahl ohne Neuladen.
*HIG Split views: "persistently highlight the current selection in each pane that leads to the detail view".* Produktion, Makler, Akquise.

**R11. Inspektor rechts: 300 px breit (plus/minus 20), nur Beschriftung und Wert, folgt der Auswahl, keine eigene Primäraktion.**
Prüfung: Werkstatt-Inspektor (Format, Säule, Betreut von, Schneidet, Drehtag, Geht online, Kanäle, Prognose) als Zeilen mit Beschriftung links in 13 px und Wert rechts in 15 px; Werte direkt bearbeitbar; der eine Stand-Knopf steht oben in der Kopfleiste, nicht im Inspektor.
*HIG Panels: "An inspector displays the details of the currently selected item, automatically updating its contents"; HIG Toolbars: eine Primäraktion am Ende der Kopfleiste.* Produktion > Werkstatt, Makler > Überblick.

### Sheets, Aktionen, Bestätigungen

**R12. Nie ein Sheet auf einem Sheet. Links "Abbrechen", rechts "Fertig" oder das konkrete Verb, nie alle drei Knöpfe Abbrechen, Zurück und Fertig zugleich.**
Prüfung: Öffnet ein Sheet ein weiteres, schließt sich das erste vorher. Esc schließt; bei ungespeicherten Änderungen fragt eine kleine Auswahl "Verwerfen" oder "Weiter bearbeiten". Desktop: Breite 560 bis 640 px, Hintergrund gedimmt. Handy: Greifer oben, Wischen nach unten schließt.
*HIG Sheets: "Display only one sheet at a time", "Avoid showing all three buttons", Greifer und Wischen zum Schließen; HIG Alerts (Esc und Cmd+Punkt brechen ab).* Alle Sheets (Etwas ändern, Idee, Vorlage, Buchen, Einrichtung).

**R13. Eine Primäraktion je Ansicht, sie reagiert auf Return; nie destruktiv.**
Prüfung: genau eine schwarze Pille pro Ansicht; im Sheet löst Return die Primäraktion aus (im Textfeld Cmd+Return); "Löschen" oder "Zurückziehen" sind nie die schwarze Pille.
*HIG Buttons: "Assign the primary role to the button people are most likely to choose", "Don't assign the primary role to a button that performs a destructive action"; v3-Regel 3.* Alle Ansichten.

**R14. Kein Bestätigungsdialog für häufige, umkehrbare Aktionen; stattdessen sofort ausführen und 6 Sekunden "Rückgängig" anbieten.**
Prüfung: "Passt so", "Später", "Erledigt", "Archivieren" öffnen keinen Dialog. Dialog nur für selten und endgültig: Beitrag nach Veröffentlichung zurückziehen, Makler entfernen, Bestellung verbindlich abschicken. Dialogknöpfe nennen die Folge ("Zurückziehen", "Abbrechen"), nie "OK", "Ja" oder "Nein"; "Abbrechen" ist nie vorausgewählt. Die 6 Sekunden sind eine Festlegung für HUMAN, kein Apple-Wert.
*HIG Alerts: "Avoid displaying alerts for common, undoable actions", Knopftitel als Verb, kein "OK"; NN/g Confirmation Dialogs: Überwarnung trainiert Wegklicken, Rückgängig als Netz; Superhuman: Aktion sofort sichtbar, Undo als Sicherheit.* Heute, Inhalte, Produktion, Akquise, Shop.

### Tempo, Bewegung, Fortschritt

**R15. Jede Eingabe zeigt in unter 100 ms eine sichtbare Reaktion; Änderungen erscheinen sofort, gespeichert wird im Hintergrund.**
Prüfung: INP unter 200 ms (Masterrichtlinien 1.7), Klick auf "Passt so" verschiebt die Karte sofort, ohne auf den Speicher zu warten; Formulare speichern ohne Knopf (v3-Prinzip).
*Superhuman, 100ms rule: "100ms is the threshold where interactions feel instantaneous", intern 50 ms.* Alle Bildschirme.

**R16. Drei Dauern für App-Bewegung: 120 ms (Rückmeldung), 200 ms (Zustandswechsel), 320 ms (Sheet, Inspektor, Seitenwechsel), Easing `cubic-bezier(.32,.72,0,1)`; häufige Interaktionen ohne Bewegung.**
Prüfung: keine anderen `transition`-Werte (heute .08, .1, .15, .3, .35 s); Listenzeilen, Tabs und Filter wechseln ohne Animation; `prefers-reduced-motion` setzt alles auf 0 mit Endzustand. Die 700 bis 1200 ms aus der UNIO-Direktive gelten für die Website, nicht für die App. Die drei Werte sind eine Ableitung für HUMAN.
*HIG Motion: "Aim for brevity and precision", "generally avoid adding motion to UI interactions that occur frequently", "Let people cancel motion"; Masterrichtlinien 2.5 (UNIO-Easing, reduced-motion Pflicht).* Alle Bildschirme.

**R17. Fortschritt immer bestimmt, wenn er messbar ist, und immer am selben Ort; kein "Lädt …".**
Prüfung: Einrichtung und Beitrag zeigen "3 von 5" bzw. eine Fortschrittsleiste oben; Export und Upload zeigen Prozent oder Restzeit; ein Knopf, dessen Aktion dauert, zeigt den Ladekreis im Knopf selbst; Ladekreise für Hintergrundarbeit ohne Beschriftung; beim Öffnen erscheint sofort das Gerüst der Seite mit Platzhaltern statt einer leeren Fläche.
*HIG Progress indicators: "When possible, use a determinate progress indicator", "Avoid vague terms like loading", "Display a progress indicator in a consistent location"; HIG Buttons (Aktivitätsanzeige im Knopf); HIG Loading: "Show something as soon as possible".* Marke > Einrichtung, Beitrag, Produktion > Werkstatt (Schnitt, Export), Upload in Marke > Design.

### Heute, Triage, Freigabe

**R18. Heute zeigt oben genau eine nächste Sache, darunter höchstens drei weitere, gruppiert nach Zeit ("Heute", "Diese Woche"); Erledigtes verlässt die Seite.**
Prüfung: auf 1280 x 800 ohne Scrollen sichtbar: Begrüßung als Seitentitel, die eine nächste Sache als einzige Karte mit Primäraktion, dann eine kurze Liste; kein Kennzahlenblock, keine Diagramme auf Heute; ist alles erledigt, steht dort der Leerzustand aus R21.
*Things (Heute, Am Abend als zweite Gruppe); Linear Inbox (Inbox Zero, Snooze); v1-Prinzip "genau eine nächste Sache".* Heute (Makler und Team).

**R19. Triage im Team mit drei Entscheidungen je Eintrag: Annehmen, Später, Ablehnen; "Später" fragt nach dem Zeitpunkt und bringt den Eintrag dann zurück.**
Prüfung: Akquise-Eingang und Produktion > Wartet: jede Zeile lässt sich mit einem Klick oder einer Taste entscheiden und verschwindet danach aus dem Filter; zurückgestellte Einträge sind ausgeblendet, bis ihr Zeitpunkt kommt.
*Linear Triage (Annehmen, Ablehnen, Duplikat, Snooze mit eigenen Tasten); Linear Inbox (Snooze bis Zeitpunkt oder neue Aktivität).* Team > Heute, Akquise, Produktion.

**R20. Abstimmung: Vorschau groß links, Entscheidung ohne Scrollen sichtbar, Anmerkungen an Zeitpunkt oder Bildstelle, erledigte Wünsche klappen zu.**
Prüfung: Handy-Vorschau nimmt mindestens die Hälfte der Breite ein; "Passt so" und "Etwas ändern" sind bei 1280 x 800 ohne Scrollen sichtbar und am Handy als feste Leiste unten; eine Anmerkung beim Video trägt die Sekunde ("bei 0:12"), bei Bildern den Punkt im Bild; umgesetzte Wünsche stehen zugeklappt im einen Gespräch. Für den Makler höchstens vier Stände: Wartet auf dich, In Arbeit, Geplant, Online.
*Frame.io V4: zeitcodierte und verankerte Kommentare, drei Freigabe-Stände (Needs Review, In Progress, Approved); Figma: Kommentare an der Stelle, Auflösen schließt den Thread, kleineres Eingabefeld für kürzeres Feedback.* Inhalte > Beitrag (Abstimmung), Heute (Freigabe-Karte), Produktion > Werkstatt (Gespräch).

### Zustände, Leerzustände, Einrichtung, Formulare

**R21. Drei Arten Leerzustand, jeweils Titel, ein Satz, höchstens eine Aktion; keine Illustration.**
Prüfung: (a) erledigt: "Alles erledigt" plus nächster Termin, keine Aktion; (b) noch nichts da: sagt, wann oder wodurch etwas kommt, eine Aktion; (c) Filter ohne Treffer: "Keine Treffer für …" plus "Filter zurücksetzen". Höchstens ein 1,5-px-Stroke-Icon, sonst nur Text. Nichts Wichtiges nur im Leerzustand, weil er verschwindet.
*HIG Writing: "Provide clear next steps on any blank screens", "empty states are usually temporary"; SwiftUI ContentUnavailableView (Titel, Beschreibung, Aktionen; Sonderfall Suche ohne Treffer); Stripe: Leerzustand zeigt den Weg, nicht "noch keine Daten".* Inhalte, Produktion, Akquise, Wirkung (vor erstem Beitrag), Shop, Nachrichten, Gespräche.

**R22. Stand immer als Punkt und Wort, nie nur Farbe; Orange nur für "wartet auf dich" und den Fokus.**
Prüfung: jeder Status hat ein Wort; der Punkt hat Bedeutung (keine Deko-Punkte); `--orange #E96F2B` erscheint nur als Status-Punkt "Wartet auf dich", Fokusring und Auswahlmarke, nie als Fläche oder Text auf hellem Grund; rote Zählplaketten nur für wirklich Dringendes, sonst keine.
*HIG Accessibility (Information nicht nur über Farbe, Kontrast 4,5:1 bis 17 pt); HIG Tab bars: "Reserve badges for critical information"; v1-Prinzip "Punkt und Wort"; Masterrichtlinien 2.3.* Alle Listen, Heute, Seitenleiste, Tab-Leiste.

**R23. Einrichtung als eingebettete Liste auf Heute, nicht als Tour: höchstens sechs Schritte, jeder führt direkt an die Stelle, wo er erledigt wird, vorausgefüllt, was schon bekannt ist; verschwindet, wenn fertig.**
Prüfung: kein Willkommens-Modal, keine Coach-Marks; die Liste zeigt "3 von 5 erledigt" und "Als Nächstes: …"; Schritte ohne Pflicht (z. B. Instagram verbinden) sind aufschiebbar und blockieren nichts.
*Stripe: eingebettete Checkliste bleibt bis alles erledigt ist; Linear: Lernen durch Erledigen, 60 Sekunden, keine Tour (Supademo-Analyse); Vercel: kein Willkommens-Modal, Felder werden erkannt; HIG Onboarding: "Postpone nonessential setup flows", "Teach through interactivity".* Makler > Heute (Einrichtung), Team > Makler > Einrichtung.

**R24. Vorausgefüllte Felder nennen ihre Herkunft unter dem Feld, in 13 px, und bleiben bearbeitbar; Fehler stehen am Feld und sagen, was zu tun ist.**
Prüfung: unter jedem übernommenen Wert eine Zeile wie "Aus deinem Fragebogen", "Von deiner Website", "Vom Team gesetzt", nach eigener Änderung "Von dir geändert"; Beschriftung über dem Feld, nie nur Platzhalter; Speichern ohne Knopf mit leisem "Gespeichert" für 2 Sekunden am Feld; Fehlermeldung direkt am Feld als Anleitung ("Gib die GISA-Zahl mit 6 bis 9 Ziffern ein", Ziffernzahl prüfen).
*HIG Text fields (Beschriftung plus Hinweis, prüfen im passenden Moment); HIG Writing: Fehler "as close to the problem as possible", "instruct people how to enter the information correctly"; Vercel erkennt Einstellungen selbst; Masterrichtlinien 2.6 (kein Placeholder als Label).* Marke > Fragebogen, Marke > Website (Impressum, Kontaktdaten), Einstellungen, Team > Makler > Einrichtung.

### Handy

Die Handy-Regeln sind in R8, R12, R20 und R22 enthalten. Zusätzlich gilt für die Handy-Ansicht:

- **Tab-Leiste unten mit den fünf Bereichen der Rolle**, Beschriftung ein Wort, immer sichtbar außer in Sheets; kein Bereich wird ausgeblendet, auch wenn er leer ist (HIG Tab bars: "Don't disable or hide tab bar buttons", "Use single words whenever possible").
- **Wischaktionen nur für umkehrbare Aktionen**: nach rechts "Später", nach links "Erledigt" oder "Archivieren", höchstens eine destruktive Aktion pro Seite, ganzes Durchwischen führt die erste Aktion aus. "Passt so" nie per Wischen, weil die Freigabe die Vorschau braucht (Apple swipeActions mit allowsFullSwipe; Use Your Loaf).
- **"Etwas ändern" als halbhohes Sheet** mit der Schnellwahl (anderer Einstieg, kürzer, anderes Bild, Text anpassen, anderer Termin); erst das Freitextfeld öffnet es ganz (HIG Sheets: mittlere Höhe für schnelle Auswahl, volle Höhe zum Schreiben wie in Mail).
- **Liquid Glass nur als Kontext**: Glas höchstens für die schwebende Tab-Leiste über echtem Bild, nie hinter Text und nie über leeren Flächen (Apple Newsroom 2025, Masterrichtlinien 2.7; NN/g kritisiert die Lesbarkeit von Liquid Glass in iOS 26).

---

## 3. Befehlsleiste und Tastatur (5 Vorschläge)

Grundsatz: keine Browser- oder Systemkürzel überschreiben (Cmd+1 bis Cmd+9 wechseln im Browser die Tabs, Cmd+T öffnet einen Tab). Einzeltasten wirken nur, wenn kein Textfeld den Fokus hat. Am Handy gibt es statt Kürzeln lange Drücken für ein Kontextmenü mit denselben Befehlen.

1. **Befehlsleiste mit Cmd+K (Windows Strg+K), überall gleich.**
   Ein Feld, darunter Treffer in drei Gruppen: Aktionen, Makler, Beiträge. Leeres Feld zeigt die fünf Aktionen, die im aktuellen Kontext am wahrscheinlichsten sind (auf einem Beitrag: "Passt so", "Etwas ändern", "Termin ändern", "Link kopieren", "Gespräch öffnen"). Neben jedem Befehl steht sein Kürzel. Unscharfe Suche und Synonyme: "freigeben" findet "Passt so", "Logo" findet Marke > Design, "Rechnung" findet Shop > Bestellungen.
   *Superhuman: "How to build a remarkable command palette" (gleiche Taste überall, Kürzel-Hinweise, Fuzzy-Suche, Synonyme, Kontext-Ranking); Linear und Notion Calendar Cmd+K; Arc Command Bar.*

2. **Bereiche mit G und einem Buchstaben.**
   Makler: G H Heute, G M Marke, G I Inhalte, G W Wirkung, G S Shop. Team: G H Heute, G A Akquise, G K Makler (K wie Kunde, damit G M rollenübergreifend Marke bleibt), G P Produktion, G E Einstellungen. Die Buchstaben stehen im Tooltip der Seitenleiste.
   *Linear: G dann I für Inbox; HIG Keyboards: Standardkürzel nicht umwidmen.*

3. **Listen mit J und K oder Pfeiltasten, Enter öffnet, Esc schließt, Leertaste zeigt die Vorschau.**
   Gilt für Inhalte, Produktion, Akquise und Makler. Die Leertaste öffnet die Handy-Vorschau eines Beitrags als Schnellansicht über der Liste, ein zweites Drücken schließt sie.
   *Linear Inbox (J und K); macOS Quick Look (Leertaste); HIG Alerts und Sheets (Esc bricht ab).*

4. **Entscheiden mit einer Taste, Rückgängig mit Z.**
   Abstimmung (Makler): Cmd+Return "Passt so", E "Etwas ändern" (öffnet das Sheet, dort 1 bis 5 für die Schnellwahl). Triage (Team, Akquise und Produktion > Wartet): 1 Annehmen, 2 Ablehnen, H Später (mit Zeitauswahl: heute Abend, morgen, nächste Woche). Nach jeder Entscheidung 6 Sekunden Rückgängig mit Z oder Cmd+Z.
   *Linear Triage (Zifferntasten, H für Snooze); Superhuman (Aktion sofort, Undo als Netz).*

5. **C erfasst, ? erklärt.**
   C legt im aktuellen Kontext etwas Neues an: auf Inhalte eine Idee, auf Akquise einen Kontakt, im Makler-Arbeitsbereich eine Notiz im Gespräch. ? öffnet ein Sheet mit allen Kürzeln der aktuellen Ansicht, gruppiert wie die Befehlsleiste. Nach der dritten Maus-Aktion, die ein Kürzel hat, zeigt der Tooltip das Kürzel (kein Pop-up, kein Hinweisbanner).
   *Linear (C für neues Issue, ? für Kürzel); Superhuman ("showing keyboard shortcut hints right in the user interface"); Things Type Travel (Tippen startet Suche).*

---

## 4. Microcopy: fünf Beispiele

Regeln dahinter: Du-Form, Verb auf dem Knopf, Klartext-Datum mit Wochentag, Personen statt "wir", keine Ausrufezeichen, kein "Ups", keine Mittelpunkte, Zahlen nur, wenn sie stimmen (Beispielwerte unten sind Platzhalter).

| Stelle | Vorher | Nachher | Warum |
|---|---|---|---|
| **Freigabe** (Team > Produktion, Zeile) | "Auto-Freigabe 03.10. · Runde 1 von 2" | Status: "Wartet auf Julia". Metazeile: "Geht Do., 3. Okt. von selbst online, 1 Änderungswunsch frei" | Übernimmt das v4-Wording auch auf der Team-Seite; ein Satz statt zwei Fachbegriffe; kein Mittelpunkt |
| **Leerzustand** (Makler > Inhalte) | "Noch keine Inhalte." plus langer Erklärsatz | Titel: "Noch nichts in Arbeit". Satz: "Die ersten Ideen kommen nach dem Strategiegespräch am Di., 14. Okt." Aktion: "Idee einreichen" | Sagt, wann etwas kommt, und bietet genau eine Aktion (HIG Writing, R21) |
| **Fehler** (Upload in Marke > Design) | "Fehler beim Hochladen" | "Die Verbindung ist abgebrochen. Der Upload läuft weiter, sobald du wieder online bist." Knopf: "Jetzt erneut versuchen" | Sagt was passiert ist und was als Nächstes passiert; kein "Fehler" als Titel (HIG Alerts: kein "Error" als Titel) |
| **Fortschritt** (Werkstatt, Export; Einrichtung auf Heute) | "Wird verarbeitet …" bzw. "Einrichtung 60 %" | "Schnitt wird exportiert, noch etwa 2 Minuten" bzw. "3 von 5 erledigt. Als Nächstes: Porträtfotos hochladen" | Bestimmt statt vage, nennt den nächsten Schritt (HIG Progress indicators, R17) |
| **Bestätigung** (nach "Passt so"; Beitrag zurückziehen) | Dialog "Bist du sicher? Ja / Nein" | Umkehrbar, kein Dialog: Hinweis unten "Passt. Geht Do., 3. Okt. um 18 Uhr online." mit "Rückgängig". Endgültig, mit Dialog: Titel "Beitrag von Instagram nehmen?", Satz "Aufrufe und Kommentare gehen verloren.", Knöpfe "Abbrechen" und "Von Instagram nehmen" | Dialog nur, wenn nichts mehr rückgängig geht; Knopf nennt die Folge (HIG Alerts, NN/g, R14) |

Weitere Statussprache für HUMAN, einheitlich als kurze Aussage: Wartet auf dich, Wartet auf Julia, In Arbeit, Geplant für Do., 3. Okt., Online seit Mo., Gespeichert, Nicht verbunden.

---

## 5. Bewusst nicht übernommen

- **Kanban, Gantt, Tabellenansichten mit vielen Spalten** (Height, Lucida): widerspricht "Listen vor Karten" und funktioniert am Handy nicht. Height wurde im September 2025 eingestellt und taugt nur noch als historische Referenz für KI-Triage.
- **Liquid Glass als Flächenmaterial**: nur Kontext; Glas nie hinter Text (Hausregel).
- **Onboarding-Touren, Coach-Marks, Konfetti, Fortschritts-Gamification**: HIG Onboarding, Vercel und Linear kommen ohne aus.
- **Rote Zählplaketten an jedem Menüpunkt**: HIG reserviert sie für Kritisches; HUMAN zählt nur auf Heute.
- **Notion-artige Blöcke und Schrägstrich-Menüs im Beitrag**: der Makler soll abstimmen, nicht layouten.

---

## 6. Quellen

Apple Human Interface Guidelines (Seitenstand laut Änderungsprotokoll bis Juni und September 2026):
- Sidebars: https://developer.apple.com/design/human-interface-guidelines/sidebars
- Sheets: https://developer.apple.com/design/human-interface-guidelines/sheets
- Lists and tables: https://developer.apple.com/design/human-interface-guidelines/lists-and-tables
- Split views: https://developer.apple.com/design/human-interface-guidelines/split-views
- Panels (Inspektor): https://developer.apple.com/design/human-interface-guidelines/panels
- Toolbars: https://developer.apple.com/design/human-interface-guidelines/toolbars
- Tab bars: https://developer.apple.com/design/human-interface-guidelines/tab-bars
- Buttons: https://developer.apple.com/design/human-interface-guidelines/buttons
- Alerts: https://developer.apple.com/design/human-interface-guidelines/alerts
- Progress indicators: https://developer.apple.com/design/human-interface-guidelines/progress-indicators
- Loading: https://developer.apple.com/design/human-interface-guidelines/loading
- Motion: https://developer.apple.com/design/human-interface-guidelines/motion
- Typography: https://developer.apple.com/design/human-interface-guidelines/typography
- Accessibility: https://developer.apple.com/design/human-interface-guidelines/accessibility
- Writing: https://developer.apple.com/design/human-interface-guidelines/writing
- Onboarding: https://developer.apple.com/design/human-interface-guidelines/onboarding
- Text fields: https://developer.apple.com/design/human-interface-guidelines/text-fields
- Keyboards: https://developer.apple.com/design/human-interface-guidelines/keyboards
- Liquid Glass, Apple Newsroom (Juni 2025): https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/
- NN/g, Liquid Glass Is Cracked, and Usability Suffers in iOS 26: https://www.nngroup.com/articles/liquid-glass/

Produkte:
- Linear, A calmer interface for a product in motion (12.03.2026): https://linear.app/now/behind-the-latest-design-refresh
- Linear, UI refresh: https://linear.app/changelog/2026-03-12-ui-refresh
- Linear Docs, Triage: https://linear.app/docs/triage
- Linear Docs, Inbox: https://linear.app/docs/inbox
- Linear Onboarding, Analyse (Sekundärquelle): https://supademo.com/user-flow-examples/linear
- Superhuman, 100ms rule: https://blog.superhuman.com/superhuman-is-built-for-speed/
- Superhuman, Command palette: https://blog.superhuman.com/how-to-build-a-remarkable-command-palette/
- Things, Features: https://culturedcode.com/things/features/
- Notion Calendar (vormals Cron), Einstieg: https://www.notion.com/help/guides/getting-started-with-notion-calendar
- Cron, Global keyboard shortcuts: https://cronhq.notion.site/Global-keyboard-shortcuts-e933a55e7fb648028b09cedf933d3e76
- Arc, Little Arc und Command Bar: https://resources.arc.net/hc/en-us/articles/19235387524503-Little-Arc-Quick-Lookups-Instant-Triaging
- Frame.io V4, Commenting on your media: https://help.frame.io/en/articles/9105251-commenting-on-your-media
- Frame.io, Review links und Freigabe-Stände: https://help.frame.io/en/articles/1161479-review-links-explained-for-clients-legacy
- Figma, Redesigned comments: https://www.figma.com/blog/stay-in-the-flow-with-redesigned-comments/
- Figma, View and manage comments: https://help.figma.com/hc/en-us/articles/360041547593-View-and-manage-comments
- Stripe Dashboard, Analyse (Sekundärquelle): https://www.925studios.co/blog/stripe-dashboard-design-breakdown
- Vercel Onboarding, Analyse (Sekundärquelle): https://getperspective.ai/blog/vercel-ai-native-customer-onboarding-developer-teams
- Height, Einstellung 2025 (Sekundärquelle): https://goldpenguin.org/tools/height/

Muster und Sprache:
- NN/g, Confirmation Dialogs: https://www.nngroup.com/articles/confirmation-dialog/
- SwiftUI ContentUnavailableView: https://www.avanderlee.com/swiftui/contentunavailableview-handling-empty-states/
- Swipe Actions (SwiftUI): https://useyourloaf.com/blog/swiftui-swipe-actions/
- German UPA, Grundlagen des UX-Writings: https://germanupa.de/wissen/methoden-werkzeuge/ux-writing/grundlagen
- German UPA, Leitfaden UX-Writing-Heuristiken (PDF): https://germanupa.de/sites/default/files/2024-01/leitfaden_ux-writing_heuristiken_v1.01_0.pdf
- Apple duzt im deutschen System seit macOS Sierra (Mac Life): https://www.maclife.de/ratgeber/macos-sierra-betriebssystem-duzt-10084608.html

Hinweis zu den Zahlen: Schriftgrößen der HIG, 44-pt-Trefferfläche, 15-Zeichen-Titel und 100 ms sind Quellwerte. Die HUMAN-Skala (28/20/17/15/13/12), 300 px Inspektor, 6 Sekunden Rückgängig und die drei Animationsdauern sind daraus abgeleitete Festlegungen und vor dem Umbau freizugeben.
