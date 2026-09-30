# Schritt 13. Feed-Vorschlag (`feed`)

Stand 30.09.2026, Fassung 3. Entwurf für Branding v2, Teilschritt 13 von 17. Grundlage: `00_ZERLEGUNG.md` (Vertrag dieses Schritts und der Nachbarn), `12_social.md` Fassung 3 vom 30.09. (Serien, Grammatik, Belegung, Probe-Folge in 3.16), `07_positionierung.md` (Belege `b1` bis `b6`, Attribute `a1` bis `a5`), `09_idee.md` 3.11, `10_system.md` 10.6, `11_bild.md`, `15_reveal.md`, `16_freigabe.md`, `bestand/KETTE_IST.md` Kapitel 4, `research/R1` bis `R8` (vor allem R6), `docs/werkbank/MARKENQUALITAET.md` Kapitel 5, Code in `ui_kits/werkbank/wb-markenwelten.jsx`, `wb-markenbuch.jsx`, `wb-os-data.jsx`, `wb-werkzeuge.jsx`, `wb-store.jsx`, `api/wb-marke.js`.

**Lesart.** *Belegt* heißt: steht in einer Quelle mit URL oder in einer genannten Datei mit Stelle. *Ableitung* heißt: eigene Folgerung. *Setzung* heißt: bewusst gewählter Startwert, der an den ersten fünf Maklern gemessen und ersetzt wird. *Lücke* heißt: wir wissen es nicht. Das Beispiel für Markus Leitner liest die v2-Entwürfe der Vorgänger als Ausgänge, vor allem die Probe-Folge und die Serien aus `12_social.md` 3.16. Wo dort selbst eine Annahme steht, bleibt sie hier Annahme; wo dieser Schritt davon abweicht, steht die Abweichung mit Grund in 5.5 als Korrektur an Schritt 12.

**Was sich gegenüber Fassung 2 geändert hat.** Eigene Serien und eine eigene Folge sind gestrichen, der Feed übernimmt Serien, Belegung und Probe-Folge aus Schritt 12. Die Grammatik wird nicht mehr neu definiert, sondern nur aus `grammatik` gelesen und mit der Prüffunktion aus Schritt 12 gerechnet. Neu sind: eine verbindliche Pin-Logik (3.3), die Ersatzregel `hmFeedNeuRechnen` für Plätze ohne Material (3.4), die Sichtbarkeit und Ortsbindung der Belege (3.5), eine Spaltenregel gegen Streifen (3.6), die Gestaltung der Pin-Reihe je Kachel (3.13) und ein bereinigter Datenvertrag mit getrenntem `format` und `art` (8.2).

---

## 0. Kurzfassung

Schritt 13 ist der Moment, in dem die ganze Kette sichtbar wird: Aus Serien, Vorlagen, Tokens, Kontaktbogen und Belegen entstehen zwölf fertige Beiträge in Veröffentlichungsfolge, im echten Profilkopf, Woche für Woche. Der Schritt kostet den Makler keine Minute. Er erlebt das Ergebnis im Reveal (Schritt 15).

Die Lösung in sieben Sätzen:

1. **Die erste Reihe ist die Visitenkarte.** Folge 1 bis 3 erscheinen am Live-Tag gemeinsam, in der Folge 1, 2, 3, und werden so angepinnt, dass die Reihe genauso aussieht wie ohne Pins. Sie zeigt Gesicht, Haltung mit Beleg, Ort und Zielgruppe und bleibt oben, während darunter der Strom wächst.
2. **Die Folge kommt aus Schritt 12.** Serien, Wochentakt, Wechselplätze und Probe-Folge werden übernommen. Der Planer ordnet nicht neu, er belegt die Plätze mit Stoff, Bild und Worten.
3. **Die Grammatik wird gelesen, nicht erfunden.** Gesicht, Gegenton, Textführung, Einstellung, Format, Serie und Fenster kommen aus `grammatik` und werden mit `hmSocialFolgePruefen` für die Verschiebungen 0, 1 und 2 gerechnet. Dieser Schritt ergänzt nur, was erst am fertigen Feed prüfbar ist: Pin-Kante, Spalten, Sichtbarkeit und Ortsbindung der Belege.
4. **Ein Beleg zählt nur, wenn man ihn im Raster sieht,** im Titel oder im Bild der Kachel, und nur, wenn Ort und Serie zum Beleg passen. Jede Zeile des Ruhebilds trägt einen solchen Beleg.
5. **Kein Platz bleibt leer, keine Lückenkachel geht online.** Wo Material fehlt, sieht der Makler im Reveal ehrlich die Lückenkachel, und für die Öffentlichkeit steht der Ersatz schon fest, gerechnet von `hmFeedNeuRechnen` nach der Belegung aus Schritt 12. Schritt 16 und 17 rufen dieselbe Funktion.
6. **Claude schreibt nur Worte, Regeln entscheiden Ordnung und Form.** Planer, Renderer, Ersatzregel und Prüfer laufen ohne Claude; ohne Claude entstehen dieselben Felder mit Lücken statt Mustersätzen.
7. **Der Gegenentwurf zeigt dieselben zwölf Inhalte in anderer Form,** mit denselben Worten, Bildern und Ausschnitten, nur mit Tokens und Vorlagen des Gegenentwurfs. So vergleicht der Makler Form mit Form.

---

## 1. Ziel und Erfolgskriterium

### 1.1 Ziel

Den Start sichtbar machen: zwölf Beiträge als vier Wochen in Veröffentlichungsfolge, jeder mit fertigem Bild, Reel-Titelbild oder Karussell-Folgeseiten und Caption in seiner Stimme, im echten Profilkopf mit Bio, Highlights und angepinnten Beiträgen, geprüft nach Grammatik und Belegpflicht. Dieselben Inhalte zusätzlich in der Form des Gegenentwurfs. Dazu, wenn LinkedIn im Kanalplan aktiv ist, drei Beiträge für LinkedIn aus denselben Inhalten.

Warum der Schritt so viel trägt (belegt): Verkäufer wählen ihren Makler in den USA zu zwei Dritteln über Empfehlung oder frühere Zusammenarbeit, 80 Prozent sprechen nur mit einem einzigen Makler (https://nowbam.com/how-home-buyers-and-sellers-find-their-agents-in-2025/, Auswertung von NAR 2025; die Übertragung auf Wien ist Ableitung, R5 Abschnitt 1.6). Das Profil muss also vor allem den Moment bestehen, in dem jemand den Namen empfohlen bekommen hat und nachsieht. Gesichter werden in 100 Millisekunden auf Vertrauenswürdigkeit gelesen (https://doi.org/10.1111/j.1467-9280.2006.01750.x). Heute zeigt der Vorschlag im Markenbuch neun Kacheln nach einem festen Muster der Welt, vier davon UNIO-Demo-Objekte aus fremden Bezirken, einen Fülltext, der bei jedem Makler gleich ist, ein einziges Gesicht und Folio-Nummern, die rückwärts ab 24 zählen (KETTE_IST Kapitel 4; `wb-markenwelten.jsx` Zeile 1045 bis 1070).

### 1.2 Erfolgskriterium

**Hart (jeder Feed, automatisch oder per Abzeichnung geprüft):**

| Nr. | Kriterium | Prüfung |
|---|---|---|
| E1 | Zwölf Beiträge, Folge gleich `start30` und gleich den Plätzen aus `belegung`; `folgeNr` 1 bis 12; Kennung je Serie vorwärts ab 01, das Staffelplakat ohne Folgenummer | P1 |
| E2 | Jeder Beitrag stammt aus einer Serie in `serien[]` und einer Vorlage in `vorlagen[]`; kein Text aus `HM_WELT_HOOKS`, keine Vorgabe aus `hmWeltPostDaten`, kein Satz eines anderen Maklers der Kohorte | P2, P9 |
| E3 | Alle Regeln aus `grammatik` halten für die Folge und die Verschiebungen 0, 1 und 2, gerechnet mit `hmSocialFolgePruefen` aus Schritt 12; daraus folgen mindestens 8 von 12 Gesichtern und höchstens 2 je Zeile | P3, P5 |
| E4 | Jede Zeile des Ruhebilds (Pin-Reihe und je Woche eine Zeile) zeigt im Raster einen freigegebenen Beleg, im Titel oder im Bild; Ort und Serie passen zum Beleg; jedes Fenster aus drei in Verschiebung 1 und 2 ist geprüft und ohne Beleg gemeldet | P4 |
| E5 | Pin-Kante und Spaltenregel halten (3.3, 3.6) | P5 |
| E6 | Text im Raster mindestens `grammatik.minTextKachelPx`, im offenen Beitrag mindestens `minTextBeitragPx`, Fließtext mindestens `minFliesstextPx`; Tragendes in den sicheren Zonen; Kontrast 4,5 zu 1, Großtext 3 zu 1, auf Fotos gemessen | P6, P7 |
| E7 | `fremdobjekte` gleich 0, `fuelltexte` gleich 0, kein generiertes Bild als Person, Objekt oder Ort | P8, P9 |
| E8 | Jede Caption endet mit einem Satz zum Weitergeben an eine benannte Person oder Rolle; kein Satz zweimal in einem Takt, keiner zweimal in der Pin-Reihe; Anrede nur über `hmAnrede(mid, kanal)` | P10 |
| E9 | Jeder Beitrag über ein Objekt in Vermarktung trägt die Energiekennzahlen nach `objektRegel` in Bild und Caption, Preis und Fläche in der Caption | P11 |
| E10 | Keine Lückenkachel in der öffentlichen Fassung; jede Lückenkachel der Vorschau hat einen fertigen, geprüften Ersatz aus `hmFeedNeuRechnen` | P12 |
| E11 | Der Gegenentwurf hat dieselben Inhalte, dieselbe Folge, dieselben Bilddateien und Ausschnitte; nur Tokens und Vorlagen unterscheiden sich, der Ausschnitt nur bei der Achse `ausschnitt` | P13 |

**Weich (Zielwerte, alle Setzung, an den ersten fünf Maklern messen):**

- Fünf-Sekunden-Test im Team: Eine Person, die den Makler nicht kennt, sieht Profilkopf und Pin-Reihe fünf Sekunden lang und nennt danach mindestens zwei von drei Dingen richtig: Ort, für wen, Haltung. Bei vier von fünf Maklern. Die Pin-Reihe muss das allein leisten, ohne die Bio (Prüfung: Test einmal mit verdeckter Bio).
- Im Reveal lassen sich mindestens 80 Prozent der Pins zum Feed einem Kriterium des Markenvertrags zuordnen (misst Schritt 15).
- Redaktionsaufwand der Captions mit Claude höchstens 60 Minuten je Feed, gemessen in `feed.messung`.
- In `praesentation.fremdtest` (Schritt 15) erkennt sich der Makler zwischen fremden Beiträgen, bei allen fünf.

---

## 2. Geprüfte Alternativen und warum verworfen

| Nr. | Alternative | Was dafür spricht | Warum verworfen | Quellen |
|---|---|---|---|---|
| A1 | **Festes Muster je Markenwelt** mit neun Plätzen, gefüllt mit Beispielen und Vorgaben (heutiger Stand, `HM_WELT_STIL[*].feed`) | fertig gebaut, sauber gesetzt, schnell | Das Muster folgt der Welt, nicht dem Startplan; freie Plätze werden mit Vorgaben gefüllt, die bei jedem Makler gleich sind, und mit Demo-Objekten aus fremden Bezirken. Ein Gesicht in neun Kacheln widerspricht der eigenen Regel von rund 70 Prozent Gesicht. | KETTE_IST Kapitel 3 und 4; R6 Abschnitt 4 Punkt 1 und 5 |
| A2 | **Mosaik- oder Puzzle-Raster** | starker erster Eindruck | Seit Jänner 2025 schneidet Instagram jede Kachel mittig auf 3:4; Mosaike zerbrechen, jeder neue Beitrag verschiebt alle anderen. Selbstzweck ohne Aussage. | https://www.kapwing.com/resources/instagrams-new-grid-layout-size-and-dimensions-2025/; R6 Abschnitt 5 |
| A3 | **Regeln über Positionen und Umordnen von Hand**, etwa "Spalte 1 immer Gesicht", nach jedem Beitrag neu sortiert | sieht im Moment der Präsentation geordnet aus; seit 8. Juni 2026 kann man das Raster umordnen | Jeder neue Beitrag schiebt alle um einen Platz, eine Positionsregel bricht beim ersten Post. Umordnen hilft nur einmal: Nach dem Umordnen entspricht die Anzeige per Definition nicht mehr der Veröffentlichungsfolge, und der nächste Beitrag verschiebt wieder alles (Ableitung). Angepinnte Beiträge bleiben beim Umordnen oben und lassen sich nicht bewegen (Engadget); das nutzt dieser Schritt für die Pin-Reihe. Robust sind nur Regeln über die Folge. | Umordnen ab 8. Juni 2026: https://www.socialmediatoday.com/news/instagram-releases-profile-grid-rearranging/822304/; Pins fest oben: https://www.engadget.com/2190179/instagram-how-to-reorder-grid/; R6 Abschnitt 2 Prinzip 2 |
| A4 | **Redaktionsplan als Liste oder Kalender** ohne gerenderte Kacheln | wenig Aufwand | Der Makler urteilt über Titel statt über sein Profil. Studios zeigen Optionen in Anwendung; redaktionelle Feeds wirken als Satz von Bildern, das lässt sich an einer Liste nicht prüfen. | https://blog.mozilla.org/opendesign/roads-not-taken/; https://magculture.com/interview-with-rosa-and-rich-cereal/; R2 Abschnitt 1.7 |
| A5 | **Fehlendes Material generieren** über die Bildwelt-Brücke | voller Feed ohne Termin | Täuscht Person, Objekt oder Ort vor und bricht die UNIO-Regel gegen KI-Bilder erkennbarer Personen. Das Reputationsrisiko ist dokumentiert (Pentagram, performance.gov). Instagram stuft recycelte und fremde Inhalte herab. | https://gdusa.com/pentagram-federal-website-generates-ai-controversy/; https://www.holeandcorner.com/long-reads/in-the-modern-style; https://about.instagram.com/blog/announcements/instagram-ranking-explained; R2 Abschnitt 4 |
| A6 | **Der Makler ordnet seinen Feed selbst** per Ziehen wie in einem Visual Planner | hohes Eigentumsgefühl | Mitgestalten erzeugt Zufriedenheit, nicht Qualität; das Eigentumsgefühl schwindet, wenn sich der Kunde nicht kompetent fühlt. Die Folge ist Handwerk mit Regeln, die er nicht kennt. | https://later.com/visual-planner/; https://myscp.onlinelibrary.wiley.com/doi/abs/10.1016/j.jcps.2011.08.002; https://doi.org/10.1509/jmkg.74.1.65; R7 Prinzip 8 |
| A7 | **Nur ein Feed, ohne Gegenentwurf** | halber Aufwand | Schwer bewertbare Unterschiede der Form werden erst im direkten Nebeneinander sichtbar, und der Vergleich trägt nur bei gleichem Inhalt. | https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf; R2 Abschnitt 3.11; R8 Prinzip 4 |
| A8 | **Vorlagen in Canva oder Figma Buzz** per Tabelle füllen | gute Sperrstufen | Braucht Konten bei fremden Werkzeugen; die Prüfungen der Grammatik laufen dort nicht. Übernommen wird das Prinzip "eine Zeile je Beitrag füllt die Vorlage". | https://help.figma.com/hc/en-us/articles/31271824185623-Bulk-create-assets-in-Figma-Buzz; https://www.canva.com/help/create-on-brand-designs/; R4 Ü6 |
| A9 | **Plätze ohne Material leer lassen** und die Folge nachrutschen lassen (heutige Formulierung in 16.11) | ehrlich, kein Ersatzaufwand | Ein leerer Platz verschiebt alle folgenden Beiträge um eins; bei Gesichtsperiode 3 stehen dann drei Gesichter in einem Fenster (Rechnung in 3.13). Schritt 12 verlangt ausdrücklich: der Platz ist nie leer. | `12_social.md` 3.7 "Ausfall"; Ableitung |

---

## 3. Die gewählte Lösung

### 3.1 Prinzip

**Übernehmen, belegen, rendern, prüfen, redigieren, abzeichnen.** Der Feed ist eine Tabelle mit zwölf Zeilen. Die Plätze kommen aus Schritt 12, der Stoff aus Belegen, Themenvorrat und Bestand, die Bilder aus dem Kontaktbogen, die Worte aus Claude oder der Redaktion, die Form aus Tokens und Vorlagen. Nichts im Feed wird frei erfunden, weder ein Satz noch ein Objekt noch ein Bild.

Vier Entscheidungen (Ableitung):

1. **Eine Grammatik, eine Implementierung.** Schritt 12 besitzt die Regeln und die Prüffunktion. Schritt 13 ruft sie mit dem fertigen Feed auf und ergänzt nur Prüfungen, die Pixel, Pins oder Sichtbarkeit brauchen. So kann die Grammatik nicht in zwei Fassungen auseinanderlaufen.
2. **Die Pin-Reihe ist fest, der Strom wächst darunter.** Die Pin-Logik steht an genau einer Stelle, in 3.3. Schritt 12 und 16 lesen sie.
3. **Jeder Platz hat einen öffentlichen Zustand.** Für jeden Platz, dessen Stoff an einer offenen Bedingung hängt (Objekt, Freigabe, Quelle), rechnet `hmFeedNeuRechnen` den Ersatz vor der Abnahme. Er wird mit eingefroren. Was am Live-Tag oder in Woche 4 fehlt, wird nicht improvisiert.
4. **Worte von Claude, Ordnung und Form von Regeln.** Stimme braucht Ermessen, Ordnung muss nachprüfbar sein. Das entspricht Studios, die generieren, ohne generisch zu werden: Kern von Hand, Streuung entlang benannter Achsen (https://the-brandidentity.com/project/dia-studio-builds-a-generative-tool-that-makes-nuits-sonores-pulse-2; https://www.patrik-huebner.com/applying-generative-design-to-brand-design/).

### 3.2 Ablauf

| Stufe | Wer | Was passiert | Dauer |
|---|---|---|---|
| 13.1 Stoff sammeln | Regeln (`hmFeedStoff`) | Liest die eingefrorenen Stände der Vorgänger; prüft, ob `serieSignatur.tragfaehigkeit.folgenVorrat` mindestens 12 ist (sonst beginnt der Schritt nicht, Vorgabe aus Schritt 12); listet fehlenden Stoff in `feed.luecken` | Sekunden |
| 13.2 Plan | Regeln (`hmFeedPlan`) | Übernimmt die zwölf Plätze aus `belegung` und die Probe-Folge, setzt den Zustand je Wechselplatz, belegt jeden Platz mit Folge, Beleg, Tag und Datum; baut `start30` | Sekunden |
| 13.3 Ersatz vorrechnen | Regeln (`hmFeedNeuRechnen`) | Für jeden Platz mit offener Bedingung den öffentlichen Ersatz, geprüft wie ein normaler Beitrag (3.4) | Sekunden |
| 13.4 Bild je Platz | Regeln, Art Director | Vorschlag aus `bild.kontaktbogen` nach Rolle und Einstellung der Vorlage; der Art Director bestätigt oder tauscht innerhalb der Rolle, setzt Augenlinie und Waagrechte am echten Bild; fehlt ein Motiv, bleibt der Platz Bildlücke mit Motivbeschreibung | 30 bis 45 Minuten (Setzung) |
| 13.5 Worte | Claude (Regelpfad ohne Claude) | Titel im Bild, Karussellseiten, Captions, Reel-Skripte, Bio, Highlight-Namen, LinkedIn-Fassungen nach Schema, je mit `belegRef` und Herkunft | ein Aufruf, bis zwei Minuten |
| 13.6 Rendern | Regeln | Alle Kacheln in beiden Varianten, Reel-Titelbild, Karussellseiten, Story je Highlight, Profilkopf, vier Wochenstände, Lückenkacheln der Vorschau | Sekunden |
| 13.7 Prüfen | Regeln (`hmFeedPruefen`) | P1 bis P16 (Kapitel 6) für beide Varianten, beide Pin-Anzeigen und alle Ersatzstände | Sekunden |
| 13.8 Redaktion | Texter oder Stratege | Satzweise redigieren mit Grund in `feed.redaktion`; lautes Lesen der zwölf ersten Sätze; Lücken mit Termin | 45 bis 60 Minuten mit Claude, 90 bis 120 ohne (Setzung) |
| 13.9 Objekt-Freigabe | Makler, nur wenn nötig | eine Rückfrage je gewähltem Objekt, Kapitel 4 | unter einer Minute |
| 13.10 Abnahme | Creative Director | Leitfragen, Fünf-Sekunden-Test mit verdeckter Bio, Satz-von-Bildern-Blick, Handprüfung P15b | 20 Minuten (Setzung) |
| 13.11 Übergabe | Regeln | Version an Schritt 14; Änderungen danach nur als neue Version | sofort |

### 3.3 Pin-Logik (verbindlich, einzige Stelle)

Diese Regel gilt für Schritt 12, 13, 15 und 16. Andere Schritte verweisen hierher und definieren sie nicht neu.

1. **Woche 1 besteht aus Folge 1, 2 und 3 und erscheint vollständig am Live-Tag.** Alle drei werden im Live-Termin veröffentlicht, in der Reihenfolge 1, 2, 3. Grund: Ein einzelner neuer Beitrag über dem alten Raster ist ein halbes Raster (Schritt 16, "nie still und nie mit halbem Raster"). Die Wochentage aus dem Wochentakt (Dienstag, Donnerstag, Samstag) gelten ab Woche 2. Die Klassen der drei Plätze bleiben die des Wochentakts: Platz 1 Signatur, Platz 2 Gesicht, Platz 3 Sache.
2. **Angezeigte Reihenfolge gleich natürliche Reihenfolge.** Nach der Veröffentlichung steht Folge 3 links, 2 in der Mitte, 1 rechts. Die drei werden so angepinnt, dass die angezeigte Reihe genau diese bleibt. `feed.profilkopf.angepinnt` hält die angezeigte Reihenfolge von links nach rechts: `[3, 2, 1]`. Grund: Verschwindet ein Pin, oder zeigt Instagram angepinnte Beiträge zusätzlich an ihrer zeitlichen Stelle, ändert sich an der Reihe nichts.
3. **Welche Tipp-Reihenfolge beim Anpinnen diese Anzeige erzeugt, ist nicht belegt** (R6 R12, Lücke). Das Team prüft die Anzeige im Live-Termin am Gerät gegen `angepinnt`; Schritt 16 schreibt das Ergebnis in `rollout.liveTag.ersteBeitraege[].reihenfolge`. Erlaubt Instagram weniger als drei Pins, bleibt die Reihe trotzdem vollständig, weil sie der natürlichen Reihenfolge entspricht; angepinnt wird dann von links.
4. **Die Pin-Reihe gehört zur Folge und wird geprüft.** In der Anzeige "ohne Doppelung" beginnt der Strom mit Folge 4; in der Anzeige "mit Doppelung" stehen 1 bis 3 zusätzlich an ihrer zeitlichen Stelle. Weil `hmSocialFolgePruefen` alle Fenster von 1 bis 12 prüft, sind beide Anzeigen abgedeckt.
5. **Pin-Kante.** Unter jeder angepinnten Kachel steht im Lauf der Zeit jeder Beitrag des Stroms: links immer der neueste, in der Mitte der zweitneueste, rechts der drittneueste (Ableitung aus der Rasterlogik). Darum gilt statt einer Einzelprüfung eine Klassenregel: Pin-Kacheln sind nie Gegenton und nie textgeführt. Gleiche Serie über der Pin-Kante ist erlaubt, weil eine Folge unter ihrer angepinnten Ankündigung als Fortsetzung liest.
6. **Was in die Pin-Reihe darf.** Nur Belege mit `oeffentlich` "ja", Unterlage geprüft und, bei Personenbezug (etwa Erbengemeinschaft), dokumentierter Rechtsfreigabe (`beweise[].rechtsfreigabe`, Korrektur an Schritt 7). Grund: Die Reihe bleibt dauerhaft oben; ein Fehler dort ist der erste Eindruck. Fehlt die Freigabe zum Stichtag von Gate 2, greift der vorgerechnete Plan B (3.4).
7. **Pin-Tausch später.** Wird ein stärkerer Beleg erst nach dem Live-Tag frei, darf das Team einen Pin tauschen, wenn `hmFeedPruefen` danach grün ist (so auch 16 Zeile 320); das ist eine neue Version.

### 3.4 Ersatzregel: `hmFeedNeuRechnen`

**Zweck.** Kein Platz bleibt leer, keine Lückenkachel wird veröffentlicht, und der Takt der Grammatik bleibt. Die Funktion setzt um, was Schritt 12 unter "Ausfall" und "Monatsbelegung" beschreibt, und macht es für den Startfeed rechenbar.

**Aufruf.** `hmFeedNeuRechnen(mid, feed, ereignis)` mit `ereignis = {folgeNr, grund}`, `grund` aus `objektFehlt`, `objektDa`, `belegGesperrt`, `quelleFehlt`, `ausfall`, `feiertag`. Gerufen von: Schritt 13 beim Plan für jeden Platz mit offener Bedingung (Ergebnis in `feed.kacheln[].ersatz`); Schritt 16 in `hmLiveTagBereit` und in der Folge nach dem Live-Tag (16.11); Schritt 17 bei jedem Ausfall.

**Verfahren (deterministisch, erste gültige Lösung gewinnt):**

1. Kandidaten in dieser Reihenfolge: (a) die Wechsel des Platzes aus `belegung.plaetze[p].wechsel[]` für den neuen Zustand; (b) `serien[s].reservefolge` der Serie des Platzes; (c) die Reservefolge der Klasse: für den Sachplatz die stoffunabhängige Sachvorlage aus Schritt 12, für Gesichtplätze die Gesicht-Serie der Pflichtsäule. Eine ruhende Anlass-Serie (`serien[].anlass.aktiv` falsch) ist nie Kandidat.
2. Jeder Kandidat erbt Platz, Klasse und nach Möglichkeit das Format des Platzes. Geprüft wird die ganze Folge einschließlich der zwei Anschlussplätze aus dem nächsten Takt (`belegung`, Sendeplan der Signatur): `hmSocialFolgePruefen` für die Verschiebungen 0, 1 und 2, dazu aus diesem Schritt P3, P4, P5 (Pin-Kante und Spalte), P8, P10, P11 und die Toleranz des Formatmix.
3. Besteht kein Kandidat, prüft die Funktion zur Diagnose das Nachrutschen (Platz leer). Das ist nie die Lösung, sondern zeigt, welche Regel bricht; das Ergebnis ist `gesperrt` mit dem kleinsten Eingriff ("Fall B freigeben oder Unterlage für b1"). Ein gesperrter Platz macht die betroffene Woche nicht freigebbar (Schritt 16, Bereitschaft).
4. Ergebnis `{status: "ersatz" | "gesperrt", kachel, regeln[], vorschlag}`. Vor Gate 2 wird der Ersatz fertig produziert und mit eingefroren; er ist dann keine Änderung, sondern ein vorab freigegebener Zustand. Nach der Freigabe erzeugt nur ein unvorhergesehenes Ereignis eine neue Version mit Eintrag in `feed.redaktion`.

**Lückenkachel und Ersatz.** Die Lückenkachel ist eine Ansicht, kein Beitrag. Sie erscheint in Vorschau, Reveal und Markenbuch an einem Wechselplatz, dessen bevorzugte Serie ruht (etwa die Objekt-Serie ohne Objekt), in der gesperrten Form der Vorlage dieser Serie, mit Folio-Zeile, Zeichen und dem Satz an den Makler: "Hier kommt {Ihr|dein} erstes Objekt." Öffnet er sie, steht darunter in Lesegröße: "Bis dahin erscheint an diesem Tag: [Titel des Ersatzes]." Öffentlich erscheint immer der Ersatz. Kein Grau-Platzhalter, kein Symbol, keine Schraffur.

**Plan B für offene Belege.** Für jeden Beleg der Pin-Reihe, dessen Freigabe am Stichtag (sieben Werktage vor dem Reveal, Vorgabe aus Schritt 12) noch offen ist, rechnet die Funktion den Plan B mit `grund: "belegGesperrt"` und legt ihn als zweite Fassung neben die erste. Der CD sieht beide; öffentlich wird die Fassung, deren Belege frei sind.

### 3.5 Belege: sichtbar, gebunden, nicht wiederholt

**Sichtbar im Raster.** Ein Beleg zählt für eine Zeile nur, wenn sein tragender Wert im Raster zu sehen ist: im `textImBild` der Kachel (Dauer, Kennzahl, Ort des Falls) oder im Bild selbst (eigenes Objekt). Seite 2 eines Karussells, die Beleg-Seite und die Caption zählen nicht für die Zeile, wohl aber für die Wochenpflicht aus Schritt 12 (`belegJeWoche`, dort "erzählt oder gezeigt"). Arbeitsweise zählt nie als Beleg (Schritt 12, 3.7). Feld: `feed.kacheln[].belegSichtbar {ref, wo: "titel" | "bild"}`.

**Was hart ist, was Meldung.** Hart sind die Zeilen des Ruhebilds, also die Pin-Reihe und jede volle Woche, weil man sie am Wochenende und im Reveal genau so sieht. Jedes andere Fenster aus drei, das in Verschiebung 1 oder 2 entsteht, wird geprüft und ohne Beleg gemeldet, nicht gesperrt. Grund: Jedes Fenster abzudecken hieße vier Beleg-Beiträge je Takt am selben Wochentag und damit vier freigegebene Fälle im Monat; das gibt kein Einzelmakler her (Rechnung in `12_social.md` 3.7, `grammatik.fenster.belegMeldung`). Fenster, die über Nr. 12 hinausreichen (11 bis 13, 12 bis 14), prüft der Prüfer mit den bekannten Anschlussbeiträgen aus Schritt 12 (Platz 1 und 2 des nächsten Takts, Folge 05 der Signatur), nie mit einem unbekannten Beitrag.

**Gebunden an Ort und Serie (`hmBelegPasst`).** Für jede Kachel mit `belegRef`:
- *Ort:* Nennt der Titel, der Serienname oder die Caption einen Ort aus `vorab.fakten` (Bezirk, Grätzl, Straße), muss der Ort des Belegs derselbe sein oder darin liegen (Sievering liegt in Döbling). Den Ort des Belegs liest `hmBelegOrt` aus dem Belegtext gegen die Ortsliste; fehlt ein Ort, darf die Kachel keinen Ort behaupten. Vorschlag an Schritt 7: Feld `beweise[].ort`.
- *Art:* Die Art des Belegs passt zur Variable der Serie. `dauer` verlangt einen Beleg mit Dauer, `zahl` die eine Kennzahl eines Falls, `ort` einen Fall an diesem Ort. Ein Sammelbeleg wie "14 Abschlüsse 2025" ist nie Stoff einer Folge, höchstens Beleg-Zeile einer Beleg-Seite.
- *Serie:* Ein Beleg wird höchstens in einer Serie je Takt erzählt und höchstens einmal je Takt gezeigt, nie auf i plus minus 1 oder i plus minus 3 zu seiner Erzählung (Regel aus Schritt 12, 3.4). In der Pin-Reihe steht jeder Beleg höchstens einmal, in Kachel und Caption zusammengezählt.

**Zahlen mit Prüfstatus.** Nur Belege mit `oeffentlich` "ja" erscheinen. Eine Zahl, deren Unterlage noch fehlt, trägt `pruefvermerk`; Gate 2 (`zahlenGeprueft`) sperrt, solange ein Vermerk offen ist. Im geöffneten Beitrag der Vorschau steht dann ein ruhiger Satz: "Diese Zahl prüfen wir vor dem Live-Tag mit {Ihren|deinen} Unterlagen." Kein Warnsymbol.

### 3.6 Spaltenregel gegen Streifen

**Befund.** Laufen Format, Gesicht und Serie alle in Periode 3, trägt jede Spalte nur ein Format und eine Serie, und das Raster zerfällt in drei starre Streifen, der Vorlagen-Look, den Schritt 12 verbietet (Leitfrage 5 dort).

**Regel (P5b).** Übereinander liegen immer i, i plus 3 und i plus 6 (Schritt 12, 3.7). Für jede solche Spalte aus drei gilt: Von den drei Merkmalen Format, Serie und Einstellungsgröße ist höchstens eines über alle drei Kacheln gleich. **Ausnahme Sendeplatz:** Auf dem Platz der Signatur (Wochentakt Platz 1) sind Serie, Format und Einstellung bewusst gleich, weil die Sendung nach jeder vollen Woche als eine Spalte stehen soll (Ruhebild aus Schritt 12, 3.7). Dort muss die Variable sichtbar wechseln: jede Kachel eine andere Dauer, also eine andere Länge der Spanne im Zeitmaß. So wird die eine gleiche Spalte zur Messreihe statt zum Streifen.

Die Regel gehört inhaltlich in `grammatik.nachbarn.plus3` von Schritt 12 und wird dort als Korrektur vorgeschlagen (5.5). Bis dahin prüft sie dieser Schritt, mit denselben Feldern (`bildaufbau.einstellung`, `format`, `serie`).

### 3.7 Die Kacheln je Format

Alle Formate kommen aus `vorlagen[]` und den Bildaufbauten in Pixeln aus Schritt 12 (3.16, "Bildaufbau je Serie"), gerechnet auf `system.raster` aus Schritt 10.

| `format` | Produktion | Was im Raster steht | Regeln |
|---|---|---|---|
| `reel` | Titelbild 1080 x 1920, die Kachel zeigt y 240 bis 1680 | Titelbild mit Gesicht, Variable und Kennung | alles Tragende in der Schnittmenge x 65 bis 1015, y 269 bis 1248; Zeitmaß-Linie vorläufig y 1232 (Schritt 12); gestaltet, nie ein zufälliges Standbild |
| `karussell` | Seiten 1080 x 1350, sechs bis zehn | Seite 1, allein tragfähig | Rollen aus `karussellRollen`; letzte Seite Weitergeben |
| `post` | 1080 x 1350, Tragendes im 3:4-Fenster x 33,75 bis 1046,25 | das Bild oder die Fläche | Rand 119 px, Zeitmaß-Zeile y 1231 (Schritt 10, 10.6) |

`art` ist davon getrennt: `serie` (Folge oder Staffelplakat einer laufenden Serie), `objekt` (Folge der Anlass-Serie mit eigenem Objekt, dann `objektRef` und `energie` Pflicht) oder `luecke` (Ansicht eines Wechselplatzes, nie öffentlich, immer mit `ersatz`). Der Formatmix zählt nur `format`; eine Lückenkachel zählt mit dem Format ihres Ersatzes.

**Text im Bild.** Eine Aussage, höchstens acht Wörter, Satzschreibung, keine Ausrufezeichen, keine Gedankenstriche, auf ruhiger Bildfläche oder dem Grund der Satzart *Bild auf der Linie*, nie auf einem Verlaufsschleier. Kennung nur in der Folio-Zeile an ihrem Serienplatz, nie über der Headline.

**Reel-Titelbilder und Drehtag.** Reels entstehen am Drehtag nach der Freigabe (Schritt 16, `rollout.drehtag`). Für den Reveal baut der Renderer das Titelbild aus einem Bild des Porträt-Termins mit Bildaufbau und Crop der Vorlage. Das ist ein anderes Foto als das spätere Standbild aus dem Clip. Deshalb steht im geöffneten Reel im Reveal ausdrücklich "Das Reel drehen wir am Drehtag." (wie `15_reveal.md` 5c), und das Titelbild trägt `titelbild.status` "vorschau". Am Drehtag ersetzt ein Standbild aus dem Clip das Vorschaubild; P3, P6 und P7 laufen für das neue Bild erneut, der Art Director bestätigt. Das Skript (`skript[] {satz, sek}`) geht als Clipliste an den Drehtag.

**Rechtshinweis.** Vorlagen von Folgen der Klasse W mit Rechtsbezug (Erbe, Grundbuch, Mietvertrag) tragen das feste Feld `rechtshinweis` mit dem Satz "Allgemein erklärt, keine Rechtsberatung." auf der letzten Seite bzw. der Endkarte, und die Caption nennt die Quelle mit Fundstelle. Eine Aussage ohne Quelle erscheint nicht.

### 3.8 Die Captions

**Aufbau (Setzung, Regeln prüfen jeden Punkt):**

1. Erster Satz: der Hook nach `serien[].hookFormel`, höchstens 90 Zeichen (wo Instagram kürzt, ist nicht belegt, Lücke).
2. Einlösung in zwei bis vier kurzen Sätzen nach `stimme.verbindlich` und `stimme.ermessen`.
3. Beleg wörtlich aus `beweise[].beleg`, mit `belegRef`; keine Rundung, keine neue Einheit.
4. Letzter Satz zum Weitergeben an eine benannte Person oder Rolle. Ausgangspunkt ist `serien[].weitergeben`; der Empfänger wird je Folge aus Anlass und `positionierung.fuerWen` bestimmt, damit kein Satz zweimal in einem Takt steht. Weiterleitungen gelten als starkes Signal für Nicht-Follower (R6 Abschnitt 1.2, sekundär).
5. Keine Hashtag-Formel wie heute (`hmCaption`, `wb-os-data.jsx` Zeile 210); höchstens der Serienname und ein Ort (Wirkung nicht belegt, Setzung).

**Stimme und Anrede.** Claude bekommt `stimme.verbindlich`, `ermessen`, `sagen`, `vermeiden`, `beispiele` und die Anrede aus `hmAnrede(mid, kanal)`; gespeichert wird mit der Paar-Syntax aus Schritt 12 (`{Sie|du}`, `{Schicken Sie|Schick}`), aufgelöst erst beim Rendern.

**Keine Formelsätze.** "Link in Bio", "Folgen Sie mir für mehr", "Schreiben Sie mir" und Ähnliches sind in `sprachpruefung` gesperrt. Jede Caption enthält einen Ort, einen Beleg oder ein eigenes Wort aus dem Dossier.

### 3.9 Der Profilkopf

| Feld | Quelle | Regel |
|---|---|---|
| `profilbild` | `bild.portraet`, Zuschnitt 1:1 | Gesicht mittig, Kopfhöhe wie im Staffelplakat (nah); kein Logo als Profilbild (R7 Abschnitt 2.4) |
| `name` | echter Kontoname aus `vorab.fakten.kanaele`, sonst Lücke | kein Zusatz ohne Beleg (Wirkung auf die Suche nicht belegt); Forderung aus `15_reveal.md` |
| `bio` | `stimme.beispiele` mit `wo` "Bio", sonst aus `botschaften.einSatz` und `botschaften.claim` | höchstens 150 Zeichen (verbreitete Grenze, Primärquelle fehlt, Lücke); Ort, für wen, eine Haltung; Claim höchstens einmal; keine Emojis, keine Aufzählungszeichen als Icons. Schritt 16 übernimmt die Bio von hier und schreibt keine eigene |
| `highlights[3]` | die drei Serien mit den meisten Beiträgen im Start | Name in einem bis zwei Wörtern (Setzung), Titelbild als Bildausschnitt aus einer Kachel, nie Symbol oder Textzeichen; je Highlight mindestens eine Story aus den zwölf Beiträgen |
| `angepinnt[3]` | Folge 1 bis 3 | angezeigte Reihenfolge links nach rechts, `[3, 2, 1]` (3.3) |

### 3.10 Die vier Wochen

`feed.wochen[w]` enthält für Woche 1 bis 4 den Profilkopf, die Pin-Reihe und den Strom bis zum letzten Beitrag dieser Woche: neuester Beitrag links oben im Strom (R6 R1). Weil jede Woche drei Beiträge hat, schließt jede Woche eine Zeile, und der Wochenregler zeigt nie ein angebrochenes Raster. Der Prüfer rechnet beide Pin-Anzeigen (3.3 Punkt 4).

Unter den neuen Beiträgen liegen am Live-Tag die bisherigen des Maklers, sofern er nicht archiviert. `feed.wochen` hält beide Fassungen bereit (`darunter: "bestand"` aus `vorab.auftrittHeute`, `darunter: "leer"`). Die Entscheidung liegt in Schritt 16 unter `rollout.liveTag.altbestand`; dieser Schritt liest diesen Namen.

### 3.11 Der Gegenentwurf

`feed.gegenentwurf` ist keine zweite Planung. Er übernimmt `start30`, alle Plätze, Worte, Bilddateien, Ausschnitte, Belege und Ersatzstände unverändert und tauscht die Tokens aus `system.gegenentwurf.tokens` und die Vorlagen der Variante Gegenentwurf. Den Ausschnitt tauscht er nur, wenn `idee.gezeigt.achse` "ausschnitt" ist (Korrektur aus `15_reveal.md`). Der Gegenton bleibt auf denselben Plätzen und kehrt sich relativ zum Grundton um: Bei Grundton dunkel sind die Gegenton-Plätze hell.

Der Prüfer läuft für beide Varianten. Bricht der Gegenentwurf eine Formregel, darf nur die Form nachgeben (Satzfläche, Tonwert einer Fläche), nie Inhalt oder Folge; hält auch das nicht, geht der Befund an den CD, weil der Gegenentwurf dann in Schritt 10 nicht in Anwendungstiefe trägt (Hsee, https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf; Schritt 15, Leitfrage 3).

### 3.12 LinkedIn und wer was erzeugt

**LinkedIn.** Nur wenn `kanalplan` LinkedIn aktiv führt. `feed.linkedin[3]` sind drei der zwölf Beiträge in Form und Anrede des Kanals: Karussell als Dokument, Reel als natives Video mit Text, Einzelbild mit längerem Text. Auswahl: der Signatur-Beitrag der Woche 1, der nächste sichtbare Beleg einer anderen Serie, der erste Beitrag der Pflichtsäule; nur Serien aus `kanalplan.linkedin.serien`. Anrede aus `hmAnrede(mid, "linkedin")`. Kein Beitrag auf LinkedIn ohne Beleg oder Arbeitsdokument; die Grammatik gilt dort nicht (Schritt 12, 3.11).

| Feld | Regeln | Claude-Pfad | Regelpfad ohne Claude | Team |
|---|---|---|---|---|
| `start30`, Plätze, Zustände, Ersatz | ganz | nie | ganz | prüft |
| `bild` je Platz | Vorschlag aus `bild.kontaktbogen` | nie | Vorschlag | Art Director bestätigt |
| `textImBild` | Länge, Größe, Kontrast | nach `hookFormel` und Themenvorrat | Titel aus `themenvorrat[].titel` oder `beispiele[].titel`, wörtlich bei höchstens acht Wörtern; sonst Lücke | redigiert |
| `seiten[]` | Rollen, Seitenzahl, Größen | Text je Rolle | Seite 1 wie `textImBild`, Beleg-Seite aus `beweise`, übrige Seiten Lücke mit Rolle | schreibt oder redigiert |
| `caption` | Aufbau, Länge, Sprachprüfung, Anrede | ganz | Hook plus Beleg wörtlich plus `serien[].weitergeben`; sonst Lücke | redigiert |
| `skript` | Sprechdauer über `hmSprechzeit` | Sätze nach `serien[].ablauf` | Ablauf der Serie als Stichpunkte, Sätze als Lücke | schärft am Drehtag |
| `profilkopf.bio`, `highlights[].name` | Länge | Vorschlag | aus `stimme.beispiele` (Bio) und Seriennamen | redigiert |
| `feed.linkedin` | Auswahl, Anrede | Text | Caption in LinkedIn-Anrede, Rest Lücke | redigiert |
| `feed.gegenentwurf`, `feed.pruefung` | ganz | nie | ganz | CD zeichnet ab |

**Regelpfad ohne Mustersätze.** Keine Textbibliothek; übernommen wird nur, was wörtlich in einem Vorgänger steht, sonst Lücke mit Arbeitsauftrag. Die Vorgaben in `hmWeltPostDaten` ("3", "Fehler, die ich bei fast jedem Verkauf sehe.", Zitat gleich Claim, Demo-Objekte, Folio ab 24) werden für den Makler-Feed abgeschaltet (Modus `streng`).

### 3.13 Beispiel am Fall Markus Leitner (Döbling, Zinshaus, Figur Kenner, Sie-Form)

**Stoff.** Serien, Wochentakt, Bildaufbau in Pixeln, Belegung und Probe-Folge aus `12_social.md` 3.16: Signatur *Zeitwert* (Empfehlung, Alternative *Die Zeit daneben*, Wahl in Schritt 15), *Vor der Unterschrift* mit Detail-Vorlage, *Stand Sievering*, *Verbüchert*, *Alteingesessen*, Anlass-Serie *Stichtag* (ruhend). Belege b1 bis b6 aus `07_positionierung.md` (alle Selbstauskunft, `oeffentlich` offen, Plan der Freigabe für b1, b2, b3, b5 laut Schritt 12). Attribute a1 Genau, a2 Ruhig, a3 Realistisch, a4 Diskret, a5 Zeitpunkt statt Tempo. Codes aus `09_idee.md` 3.11: Zeitmaß, Porträtstil, Serienformat. Termine aus `16_freigabe.md`: Live-Tag Di 24.11.2026, 11.30 Uhr.

**Lücken für Markus:** Porträt-Termin (alle Bilder), Kontoname, Freigaben und Unterlagen b1, b2, b3, b5, Rechtsfreigabe b1 (Erbengemeinschaft), drei Fälle aus F12-2, Marktquelle für Stand Sievering, Ort von Alteingesessen 01, eigene Objekte und Energiewerte (Bestand-Import).

**`start30` und Belegung (Plan A, alle Freigaben im Plan erteilt):**

| Nr. | Datum | Serie, Folge | `format`, `art` | Einstellung, Satzart | Gesicht | Ton | `textImBild` (Wörter) | Beleg sichtbar im Raster | `codes[]` |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Di 24.11., Live-Tag, angepinnt | Zeitwert, Staffelplakat | post, serie | nah, vollflächig | ja | Grund | Zeitwert. Staffel 1: Erbe. (4) | nein | Porträtstil, Zeitmaß |
| 2 | Di 24.11., Live-Tag, angepinnt | Zeitwert 01, Pilot | reel, serie | halbnah, vollflächig | ja | Grund | Zwei Jahre. (2) | b1, Dauer im Titel | Porträtstil, Zeitmaß, Serienformat |
| 3 | Di 24.11., Live-Tag, angepinnt | Stand Sievering 01 | karussell, serie | detail, Bild auf der Linie | nein | Grund | Was bringt ein Zinshaus in Sievering? (6) | nein, Ortsfolge ohne Zahl bis zur Marktquelle | Zeitmaß, Porträtstil (Waagrechte) |
| 4 | Di 01.12. | Zeitwert 02, Eine Woche | reel, serie | halbnah, vollflächig | ja | Grund | Eine Woche. (2) | nein, Klasse W | Porträtstil, Zeitmaß |
| 5 | Do 03.12. | Vor der Unterschrift 01 | karussell, serie | nah links, Bild auf der Linie | ja | Grund | Der Vermittlungsauftrag, vor der Unterschrift. (5) | nein | Porträtstil, Zeitmaß |
| 6 | Sa 05.12. | Verbüchert 01 | post, serie | Fläche, textgeführt | nein | Gegenton | Plus 8 Prozent. Anlegerwohnung, Währing. (5) | b3, Kennzahl und Bezirk | Zeitmaß, Serienformat |
| 7 | Mi 09.12. (Feiertag am Di) | Zeitwert 03, Elf Wochen | reel, serie | halbnah, vollflächig | ja | Grund | Elf Wochen. (2) | b2, Dauer im Titel | Porträtstil, Zeitmaß, Serienformat |
| 8 | Do 10.12. | Alteingesessen 01 | reel, serie | weit rechts, vollflächig | ja | Grund | [Ort]. Älter als jeder Verkauf hier. (Lücke) | nein | Porträtstil, Zeitmaß |
| 9 | Sa 12.12. | Vor der Unterschrift, Detail 01 | post, serie | detail, Bild auf der Linie | nein | Grund | Der Grundbuchauszug. (2) | nein | Zeitmaß, Porträtstil (Waagrechte) |
| 10 | Di 15.12. | Zeitwert 04, [Fall A] | reel, serie | halbnah, vollflächig | ja | Grund | [Dauer aus Fall A]. (Lücke) | Fall A nach F12-2 und Freigabe | Porträtstil, Zeitmaß, Serienformat |
| 11 | Do 17.12. | Vor der Unterschrift 02 | karussell, serie | nah links, Bild auf der Linie | ja | Grund | Der Mietvertrag, vor der Unterschrift. (5) | nein; b5 nur auf der Beleg-Seite | Porträtstil, Zeitmaß |
| 12 | Sa 19.12. | Wechselplatz: Stichtag 01 (ruhend), öffentlich Stand Sievering 02 | post; Vorschau `luecke`, öffentlich `serie` | detail, Bild auf der Linie | nein | Gegenton | Vorschau: Hier kommt Ihr erstes Objekt. Öffentlich: [Frage] in Sievering? (Lücke) | nein | Zeitmaß, Porträtstil (Waagrechte) |

Zählung: `format` reel 2, 4, 7, 8, 10; karussell 3, 5, 11; post 1, 6, 9, 12, also 5, 3, 4 innerhalb der Toleranz aus Schritt 12. Gesicht 8 von 12, in jedem Fenster genau zwei. Gegenton 6 und 12 (Sachplatz, Abstand 6). Textgeführt nur 6. Pflichtsäule 3 von 12. Erste persönliche Folge in Woche 3. Das ist die Probe-Folge aus Schritt 12 mit einer Änderung: Woche 1 erscheint am Live-Tag statt Di, Do, Sa (3.3).

**Das Ruhebild nach Woche 4 (Anzeige ohne Doppelung):**

| Zeile | links | Mitte | rechts | Gesichter | Beleg sichtbar |
|---|---|---|---|---|---|
| Pins | 3 Stand Sievering 01 | 2 Zeitwert 01 "Zwei Jahre." | 1 Staffelplakat | 2 | b1 |
| Woche 4 | 12 Stand Sievering 02, Gegenton | 11 Vor der Unterschrift 02 | 10 Zeitwert 04 | 2 | Fall A (Lücke bis F12-2) |
| Woche 3 | 9 Detail Grundbuchauszug | 8 Alteingesessen 01 | 7 Zeitwert 03 "Elf Wochen." | 2 | b2 |
| Woche 2 | 6 Verbüchert 01, Gegenton | 5 Vor der Unterschrift 01 | 4 Zeitwert 02 "Eine Woche." | 2 | b3 |

**Spalten (P5b).** Rechts steht die Sendung: Staffelplakat, dann drei Zeitwert-Reels halbnah übereinander, mit den Spannen [Fall A], elf Wochen, eine Woche; der Pilot mit der langen Spanne von zwei Jahren steht angepinnt daneben. Das ist der Sendeplatz, gleich in Serie, Format und Einstellung, verschieden in der Variable: eine Messreihe. In der Mitte wechseln Karussell nah, Reel weit, Karussell nah (nur die Serie wiederholt sich im Abstand 6, Format und Einstellung wechseln). Links sind 12, 9, 6 alle `post`, aber aus drei Serien und in den Einstellungen detail, detail, Fläche, im Ton dunkel, hell, dunkel wie eine Messlatte. In keiner Spalte außer dem Sendeplatz sind zwei der drei Merkmale gleich. Grün.

**Pin-Kante.** Keine Pin-Kachel ist Gegenton oder textgeführt; Stand Sievering 01 hat oben Papiergrund, darunter das Bild. Grün für jeden künftigen Nachbarn.

**Gestaltung der Pin-Reihe (je Kachel).** Werte in Pixeln aus den Bildaufbauten von Schritt 12 (3.16) und dem Raster von Schritt 10 (10.6); am echten Bild setzt der Art Director Augenlinie und Waagrechte nach, P7 misst danach.

*Kachel 1, Staffelplakat, rechts.* Motiv: er sitzt am Besprechungstisch im Büro 1190 (Arbeitsannahme aus Schritt 16), frontal, Blick in die Kamera, Vormittagslicht von der Seite (Einschränkung E3). Ausschnitt im 3:4-Fenster: nah, Kopf rund 540 px hoch, Augenlinie y 500, Nasenachse x 540, Unterarme auf der Tischkante bei y 1231, die zugleich die Zeitmaß-Linie ist (Porträtstil). Titel: Serienname "Zeitwert" in der Kernsatz-Stufe 104 px, links x 119, Grundlinie y 1080; darunter "Staffel 1: Erbe." in 92 px, Grundlinie y 1196, auf der ruhigen Tischfläche. Der Sendetag "Jeden Dienstag" steht in 47 px unter der Linie (y 1290) und ist nur im geöffneten Beitrag zu lesen. Zeitmaß: Spanne der Staffel über 13 Wochen, ab x 119. Keine Folio-Zeile, das Plakat ist die Kennung. Tonwert: Foto vollflächig, Text in Textfarbe auf heller Tischfläche; fällt der Kontrast unter 4,5 zu 1, wechselt die Staffelzeile unter die Linie. `codes`: Porträtstil, Zeitmaß. Abweichung von Schritt 12: die Staffelzeile in 92 px ist neu, damit die Zielgruppe in der Pin-Reihe lesbar ist (Korrektur 5.5).

*Kachel 2, Zeitwert 01, Mitte.* Motiv: derselbe Tisch, halbnah, er sitzt frontal, Blick in die Kamera. Ausschnitt im Reel-Titelbild: Kopf 288 px, Augenlinie y 680, Kopf oben rund y 536, Nasenachse x 540, Tischkante y 1232 auf der Zeitmaß-Linie; alles in der Schnittmenge. Titel: die Dauer "Zwei Jahre." in der Kennzahl-Stufe ab 110 px, links x 119, Grundlinie y 1196, liegt auf der Tischfläche; kein weiterer Text. Zeitmaß: Spanne ab x 119, logarithmisch skaliert, zwei Jahre sind die längste Spanne des Starts. Folio: "Zeitwert 01" 32 px rechtsbündig bei x 961, Grundlinie y 1196. Tonwert: Grundton, Porträtkacheln tragen nie Gegenton. `codes`: Porträtstil, Zeitmaß, Serienformat (die Endkarte zeigt die Spanne der Folge).

*Kachel 3, Stand Sievering 01, links.* Motiv: ein Eingang in Sievering, Tor oder Stiege im Vormittagslicht, nie die ganze Fassade, nie eine Hausnummer, und nie das Haus eines eigenen Falls (a4 Diskret; die Sieveringer Straße ist Ort von b2). Satzart *Bild auf der Linie*: Papiergrund y 0 bis 420, Bild y 420 bis 1231 (60 Prozent der Fläche), Türachse bei x 700, Schwelle auf der Zeitmaß-Linie y 1231. Titel: "Was bringt ein Zinshaus in Sievering?" 104 px, x 119, zwei Zeilen, Grundlinien y 190 und 304. Zeitmaß: Punkt "Stand November" rechts auf der Linie. Folio: "Stand Sievering 01, Seite 1 von 6" 32 px unter der Linie rechts, rechtsbündig x 961. Tonwert: Grundton Papier. `codes`: Zeitmaß, Porträtstil (die Waagrechte auf der Linie). Steht die Marktquelle, bekommt der Titel die erste Zahl mit Stand, und die Kachel wird Beleg; bis dahin ist sie eine Ortsfolge.

**Warum diese Pin-Reihe.** Wer empfohlen wurde und nachsieht, liest in fünf Sekunden: für wen (Staffel 1: Erbe), wofür (zwei Jahre gewartet, als Spanne), wo (Sievering), und sieht zweimal sein Gesicht. Die Bio bestätigt, sie trägt nicht allein. Belege in der Reihe: nur b1; kein Beleg doppelt.

**Plan B, wenn b1 am Stichtag nicht frei ist** (von `hmFeedNeuRechnen` vorgerechnet): Folge 2 wird "Elf Wochen." mit b2, Folge 7 wird Zeitwert 03 mit Fall B aus F12-2; Folge 10 bleibt Fall A, und "Zwei Jahre" wandert in Staffel 1 nach hinten, sobald Unterlage und Rechtsfreigabe vorliegen. Fehlt auch Fall B, hätte Woche 3 keinen sichtbaren Beleg (7 Wissensfolge, 8 und 9 ohne Beleg); der Wechselplatz 9 darf Verbüchert nur mit einem noch nicht erzählten Fall nehmen, b3 ist verbraucht. Ergebnis `gesperrt` mit Vorschlag "Unterlage für b1 oder Fall B freigeben". Das ist gewollt: Woche 3 geht nicht ohne Beleg online.

**Ersatz am Wechselplatz 12.** Stichtag ruht, weil `objektflussMonat` und Rechte fehlen. `hmFeedNeuRechnen` nimmt nach `belegung.plaetze[12].wechsel` Stand Sievering als Einzelbild; ohne Marktquelle als Ortsfolge (Reservefolge "Ein Tor in der Sieveringer Straße" aus Schritt 12, mit der Diskretionsregel oben). Format post wie der Platz, Sachklasse, Gegenton nach Platz: alle Regeln grün. Diagnose des Nachrutschens: Bliebe der Samstag leer, rückte Zeitwert 05 (Gesicht) auf Platz 12, und das Fenster 10 bis 12 hätte drei Gesichter. Darum nie leer. In der Vorschau steht auf Platz 12 die Lückenkachel in der Form der Stichtag-Vorlage mit "Hier kommt Ihr erstes Objekt." und darunter "Bis dahin erscheint an diesem Samstag: Stand Sievering 02."

**Profilkopf (Entwurf):**
- `profilbild`: Lücke, kommt aus dem Porträt-Termin, Zuschnitt 1:1, Kopfhöhe wie im Plakat.
- `name`: Kontoname Lücke; Anzeigename Markus Leitner.
- `bio` (141 Zeichen mit Umbrüchen, Sie-Form ohne direkte Anrede):

```text
Zinshäuser und Altbau in Döbling, Währing und Hietzing.
Für Erben und Anleger. Auch dann, wenn Warten mehr bringt.
Zeit ist Teil des Preises.
```

  Herkunft: Zeile 1 aus `immotypen` und `bezirke`, Zeile 2 aus `positionierung.fuerWen` und `positionierung.satz`, Zeile 3 der Claim (Annahme `botschaften.claim`).
- `highlights`: "Zeitwert" (Stories aus 1, 2, 4, 7), "Sievering" (aus 3, 12), "Unterschrift" (aus 5, 9, 11). Titelbilder: Ausschnitt von Tischkante und Zeitmaß aus Nr. 2, Eingangsdetail aus Nr. 3, Dokumentdetail aus Nr. 9. Lücke bis zum Porträt-Termin.
- `angepinnt`: `[3, 2, 1]`.

**Drei Captions der Pin-Reihe (Entwurf, gespeichert mit Paar-Syntax, hier aufgelöst zu Sie):**

Nr. 1, Staffelplakat, `belegRef` keiner:

```text
Ab heute jeden Dienstag: Zeitwert.

Jede Folge nimmt eine echte Entscheidung über den Zeitpunkt und rechnet vor, was die Dauer wert war. Schnelle Fälle stehen neben geduldigen.

Die erste Staffel handelt vom Erben. Ohne Namen, ohne Adressen.

Schicken Sie das an jemanden, der gerade ein Haus geerbt hat.
```

Nr. 2, Zeitwert 01 "Zwei Jahre.", `belegRef` b1, Sperre bis Unterlage und Rechtsfreigabe:

```text
Zwei Jahre. Was das Warten einer Erbengemeinschaft gebracht hat.

Zeitwert heißt bei mir: was die Zeit wert war, in beide Richtungen.

Einer Erbengemeinschaft habe ich geraten, zwei Jahre zu warten, statt unter Druck zu verkaufen. Sie kamen mit 600.000 mehr zurück. [Ausgangswert und Zeitraum kommen mit der Unterlage.]

Warten ist kein Prinzip. Es ist eine Rechnung.

Schicken Sie das an den Miterben, der es eilig hat.
```

Nr. 3, Stand Sievering 01, `belegRef` keiner bis zur Marktquelle:

```text
Was bringt ein Zinshaus in Sievering? Stand November.

[Einschätzung in zwei Sätzen, ohne Zahl, kommt aus dem Workshop.] Eine Zahl steht hier erst, wenn ihre Quelle steht.

Schicken Sie das an den, der in Ihrer Familie das Haus in Sievering verwaltet.
```

Drei verschiedene Weitergeben-Sätze, ein Beleg. Der zweite Satz von Nr. 2 ist das Gegenmittel zur Lesart "Zeitwert gleich Wertverlust" aus Schritt 12. Der Satz über die 600.000 ist wörtlich aus Seed `abgeraten` und in `herkunft` mit `woertlich: true` markiert. Keine Caption nennt Notar, Adresse oder erkennbare Erben (a4).

**Rechtsquelle für Nr. 4 "Eine Woche".** Die Folge erklärt allgemein, was Erben in der ersten Woche noch nicht entscheiden müssen. Tragende Aussage und Quelle: Niemand darf eine Erbschaft eigenmächtig in Besitz nehmen, erworben wird sie durch Einantwortung (§ 797 ABGB, https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001622&Paragraf=797). Endkarte und letzte Zeile der Caption tragen den festen Rechtshinweis "Allgemein erklärt, keine Rechtsberatung." und die Fundstelle. Jede weitere Rechtsaussage im Skript braucht eine eigene Fundstelle, sonst entfällt sie. UNIO prüft die Folge vor Gate 2 rechtlich (Lücke).

**LinkedIn (Sie, drei Beiträge):**

| Nr. | Aus | Form | Erster Satz |
|---|---|---|---|
| L1 | Nr. 2 | natives Video mit Text | Einer Erbengemeinschaft habe ich geraten, zwei Jahre zu warten. |
| L2 | Nr. 6 | Einzelbild mit Text | Plus 8 Prozent über der Erstschätzung, bei einer Anlegerwohnung in Währing. |
| L3 | Nr. 5 | Dokument aus den sieben Karussellseiten | Was vor der Unterschrift auf dem Tisch liegt, die Provision eingeschlossen. |

**Gegenentwurf.** Achse `tonwert` aus Schritt 9: Grundton dunkel, dieselben Bilder und Ausschnitte; Platz 6 und 12 werden hell. Das Zeitmaß steht auf Dunkel im Akzent (Schritt 10, 10.9). Der Prüfer rechnet den Kontrast jeder Kachel neu.

**Prüfer-Ergebnis für Markus heute:**

| Prüfung | Ergebnis | Grund |
|---|---|---|
| P1 Folge und Kennung | grün | Folge gleich Belegung aus 12, Kennungen ab 01, Plakat ohne Nummer |
| P3 und P5 Grammatik aus 12 | grün | `hmSocialFolgePruefen` ohne Pflichtverstoß für 0, 1, 2 |
| P3 Bilder | rot | alle acht Gesichtsbilder fehlen, Porträt-Termin |
| P4 Ruhebild-Zeilen | heute rot, im Plan grün bis auf Woche 4 | kein Beleg ist freigegeben; im Plan b1, b3, b2; Woche 4 hängt an Fall A |
| P4 Fenster in Verschiebung 1 und 2 | Meldung | 3 bis 5, 8 bis 10 (bis Fall A), 11 bis 13 und 12 bis 14 mit Anschluss Zeitwert 05 (W) und Vor der Unterschrift 03 ohne sichtbaren Beleg |
| P4 Ort und Serie | grün | b3 Währing unter Verbüchert mit Bezirk Währing; b2 Sievering nur in Zeitwert; b1 ohne Ort, Kachel behauptet keinen; b5 nur als Beleg-Zeile |
| P5b Spalten, Pin-Kante | grün | siehe oben |
| P8, P9 | grün | kein fremdes Objekt, kein Fülltext |
| P10 | grün | drei verschiedene Weitergeben-Sätze in der Pin-Reihe |
| P12 | grün für die Vorschau | eine Lückenkachel am Wechselplatz 12 mit fertigem Ersatz |
| P14 | offen | alle Belege Selbstauskunft, Vermerke an Gate 2; b1 zusätzlich Rechtsfreigabe |

Das ist das gewollte Verhalten: Plan und Ersatzstände stehen und sind geprüft, der Feed geht aber erst an Gate 2, wenn Porträt-Termin, Freigaben und F12-2 geliefert haben.

### 3.14 Was der Makler sieht und tut

**In diesem Schritt: nichts,** außer im seltenen Fall der Objekt-Freigabe (Kapitel 4). Er sieht in der Werkbank nur, dass sein Feed gebaut wird und wann der Reveal ist.

**Gebaut wird hier das Erlebnis für den Reveal (Schritt 15):**

- **Die Ansicht.** Eine Telefonspalte in realer Größe auf ruhigem Grund, ohne gezeichnetes Gerät, ohne Glanz, ohne Schatten. Darin sein Profil: Profilbild, Name, Bio, drei Highlights, das Raster. Keine Nachbildung einer Plattform-Marke, nur die Ordnung eines Profils.
- **Der Wochenregler.** Vier Stufen "Woche 1" bis "Woche 4" mit Datum, als Segmentsteuerung. Beim Wechsel erscheint nur die neue Zeile. Woche 1 zeigt die Pin-Reihe allein, so wie am Live-Tag.
- **Ein Beitrag geöffnet.** Tippen öffnet den Beitrag in 4:5 mit Caption. Karussells blättern Seite für Seite; Reels zeigen Titelbild, Skript und Dauer und den Satz "Das Reel drehen wir am Drehtag." Offene Zahlen tragen den ruhigen Satz aus 3.5.
- **Empfehlung und Gegenentwurf.** Ein Umschalter, die Empfehlung vorgewählt und benannt. Woche und geöffneter Beitrag bleiben stehen, nur die Form wechselt.
- **Die Lückenkachel.** Steht an ihrem Platz in der Form der Vorlage, mit dem Satz an ihn; geöffnet zeigt sie, was bis dahin öffentlich erscheint. Ehrlich und ohne Aufgabe für ihn.
- **Team-Modus.** Nur für das Team: 3:4-Fenster, sichere Zonen, Prüfer-Befunde je Kachel, Herkunft je Satz, Ersatzstände, Plan B.

Oberfläche nach UNIO-Regeln: keine Eyebrows, Symbole nur als SVG über `<Ico n="..."/>`, keine Verläufe, kein Glow, keine Emojis, keine Ausrufezeichen.

---

## 4. Fragen an den Makler

### 4.1 Regelfall: keine Frage

Der Schritt ist intern. Alles, was er braucht, liegt in den eingefrorenen Ständen der Vorgänger. Die Wahl des Seriennamens (F12-1) und die Fälle aus F12-2 gehören zu Schritt 12 und werden hier nicht erneut gestellt.

### 4.2 Genau eine bedingte Rückfrage: Freigabe eines Objekts

| Frage | Wirkt auf | Warum sie den Output verändert |
|---|---|---|
| "Darf [Haus, Straße ohne Hausnummer, Bezirk] im Start {Ihres|deines} Profils zu sehen sein?" mit "Nicht zeigen" (markiert als Empfehlung, mit Grund) oder "Zeigen" | `feed.kacheln[i].art`, `bild`, `objektRef`, `caption`, `ersatz`, `feed.objektFreigaben` | Bei "Zeigen" wird der Wechselplatz eine Objekt-Kachel mit Foto, Energiekennzahlen, Preis und Fläche; bei "Nicht zeigen" bleibt der Ersatz öffentlich und die Vorschau zeigt die Lückenkachel. Probe: Antwort tauschen, dann wechselt der Platz zwischen Objekt und Ersatz, und `lueckenkacheln` ändert sich um eins. |

**Wann sie gestellt wird.** Nur wenn die Belegung einem Wechselplatz ein eigenes Objekt zuweist, die Einwilligung "Objektfotos zeigen" aus Schritt 1 besteht und für dieses Objekt entweder ein Hinweis auf Diskretion vorliegt (in `vorab.material` oder in der Kontakt-Bemerkung) oder es noch nie öffentlich inseriert wurde. Ist das Objekt öffentlich inseriert und ohne Hinweis, wird nicht gefragt; dann gilt die Einwilligung aus Schritt 1.

**Welche Empfehlung markiert ist.** In beiden Fällen, in denen gefragt wird, ist "Nicht zeigen" markiert: bei Diskretionshinweis mit dem Grund "Sie haben bei diesem Haus Diskretion vermerkt.", bei nie inseriertem Objekt mit "Das Haus ist noch nicht öffentlich inseriert." "Zeigen" wird nie empfohlen, weil eine Empfehlung nur dort steht, wo kein Hinweis und eine öffentliche Inserierung vorliegen, und dann wird nicht gefragt. Ohne Antwort gilt "Nicht zeigen". Gestellt als Nachricht in der Werkbank vom Team, mit dem vorgeschlagenen Bild daneben, in einer Sitzung erledigt. Bei Markus entfällt die Frage, weil kein Objekt im Bestand liegt.

Warum diese Frage und keine andere: Diskretion ist für viele Makler Auftragsbedingung (bei Markus Wert und Attribut a4, "Diskretion war entscheidend" beim Altbau in Hietzing). Das weiß kein System, und ein Fehler wäre öffentlich.

### 4.3 Abgeleitet statt gefragt

| Feld | Abgeleitet aus | Warum nicht fragen |
|---|---|---|
| Wie oft vor die Kamera | `formatmix` (Schritt 12) | in Schritt 2 und 4 erhoben und gemessen |
| Ob Objektfotos gezeigt werden dürfen | `auftrag.einwilligungen` | allgemein in Schritt 1 geklärt; nur der Einzelfall kommt in 4.2 |
| Reihenfolge, Mischung, Wochentage | `belegung`, `wochentakt`, `serien[].rhythmus` | Handwerk mit Regeln (A6); Tage in Schritt 2 und 12 festgelegt |
| Welches Foto auf welchem Platz | `bild.kontaktbogen`, Bildaufbau der Vorlage | beim Kontaktbogen entscheidet er nichts (Schritt 11) |
| Bio, Highlight-Namen, Pins | `stimme.beispiele`, `botschaften`, Serien, Pin-Logik 3.3 | Worte aus Vertrag und Stimme; eine Wahl würde Entscheidungen wieder öffnen |
| Ob ein Beleg öffentlich werden darf | `beweise[].oeffentlich` | in Schritt 4 und 7 geklärt |
| Was bei fehlendem Material erscheint | `hmFeedNeuRechnen` nach `belegung` | Regel aus Schritt 12, keine Geschmacksfrage |
| Ob alte Beiträge archiviert werden | Empfehlung aus der Kalibrierung in Schritt 7 | entscheidet er in Schritt 16 (`rollout.liveTag.altbestand`) |

**Ausdrücklich nicht:** "Gefällt Ihnen der Feed?", eine Wahl zwischen Layouts, Schriften oder Farben, eine Reihenfolge zum Ziehen, eine Frage nach Hashtags, eine Frage nach Daten, die im Bestand liegen.

---

## 5. Eingang und Ausgang

### 5.1 Eingang nach dem Vertrag

| Von | Feld | Wofür in diesem Schritt |
|---|---|---|
| 12 | `serien` (mit `themenvorrat`, `reservefolge`, `anlass`, `weitergeben`, `bildaufbau`) | Stoff je Platz, Ersatzkandidaten, ruhende Anlass-Serie |
| 12 | `serieSignatur` | Plakat, Pilot, Sendeplatz, Stichtag `folgenVorrat` |
| 12 | `vorlagen` | Renderer je Format, Sperrstufen, Feldkoordinaten |
| 12 | `grammatik` | gelesen, nicht neu definiert: `gesichtPeriode`, `tonwertPeriode`, `textfuehrung`, `einstellung`, `serieNachbar`, `nachbarn`, `fenster`, `belegJeWoche`, `wochentakt`, `minTextKachelPx`, `minTextBeitragPx`, `minFliesstextPx`, `sichereZonenPost`, `sichereZonenReel`, `reserve`, `umordnen`, `angepinnt` |
| 12 | `formatmix` | Zählung nach `format`, Toleranz |
| 12 | `kanalplan` | Kanal je Beitrag, LinkedIn |
| 12 | `konzepte` | Launch für 30 Tage |
| 12 | `codesPruefung` | P7 |
| 12 | `sprachpruefung` | P9, P10 |
| 12 | `objektRegel` | P11 |
| 8 | `botschaften` | Bio, Claim höchstens einmal |
| 8 | `stimme.beispiele` | Caption je Kanal, Bio |
| 8 | `anrede` | `hmAnrede(mid, kanal)` für alle Texte |
| 11 | `bild.kontaktbogen`, `bild.portraet`, `bild.luecken` | Bild je Platz, Profilbild, bekannte Lücken |
| 10 | `system.tokens`, `system.gegenentwurf` | Renderer beider Varianten, Kontrast |
| 9 | `idee.gezeigt` | Achse und IDs von Empfehlung und Gegenentwurf |
| 7 | `beweise` | `belegRef`, Sichtbarkeit, Ort, `pruefvermerk` |
| 1 | `vorab.material`, eigene Objekte aus dem Bestand-Import | Rechte, Objekt-Kacheln, Zustand der Wechselplätze |

### 5.2 Ergänzungen im Eingang, begründet

Alle Ergänzungen stammen aus Schritten, die schon Vorgänger sind; die Listen bleiben symmetrisch. Felder aus Schritt 2 werden nicht direkt gelesen, sondern über ihre Verarbeitung in 8, 11 und 12.

| Von | Feld | Warum nötig |
|---|---|---|
| 12 | `belegung` | Plätze, Wechsel je Zustand; Grundlage von Plan und `hmFeedNeuRechnen` |
| 12 | `karussellRollen`, `saeulen` | Seitenrollen; `start30.beitraege[].saeule` |
| 12 | Funktion `hmSocialFolgePruefen` | eine Implementierung der Grammatik |
| 11 | `bild.regeln`, `bild.vermeiden`, `fotobrief` | Licht und Beschnitt (P7), gesperrte Motive, Titelbilder am Drehtag |
| 10 | `system.raster`, `system.zeichen` | sichere Zonen, Zeitmaß-Linie |
| 9 | `idee.codes` | P7 zählt die Codes je Kachel |
| 8 | `stimme.verbindlich`, `ermessen`, `sagen`, `vermeiden` | Captions mit Grammatik der Stimme |
| 7 | `markenvertrag.attribute` (`imText`, `imBild`), `positionierung.fuerWen` | P15a und P15b; Empfänger des Weitergeben-Satzes |
| 1 | `auftrag.einwilligungen`, `auftrag.termine`, `vorab.auftrittHeute`, `vorab.fakten` | Objektfotos; Live-Tag und Datum; Altbestand; Ortsliste für `hmBelegOrt` |
| Extern | eingefrorene Feeds der anderen UNIO-Makler | P9, P16 |

### 5.3 Ausgang nach dem Vertrag und Abnehmer

| Feld | Inhalt | Abnehmer |
|---|---|---|
| `start30[4]` | `{woche, beitraege[] {folgeNr, titel, serie, saeule, format, tag, datum}}` | 14, 16 (`rollout.folge`), 17 über `quelle` |
| `feed.kacheln[12]` | `{folgeNr, serie, folgeInSerie, format, art, bild oder Lücke, textImBild, ausschnitt3zu4, seiten[], caption, kanal, belegRef, gesicht, codes[]}` | 14, 15, 16 (`rollout.liveTag.ersteBeitraege`) |
| `feed.profilkopf` | `{profilbild, name, bio, highlights[3], angepinnt[3]}` | 15, 16 |
| `feed.wochen[4]` | Profil nach Woche 1 bis 4 | 15 |
| `feed.pruefung` | `{gesicht, belegJeZeile, nachbarnOk, textgroesseOk, kontrastOk, fremdobjekte, fuelltexte, lueckenkacheln}` | 14 (`gate2`, `qualitaet`) |
| `feed.gegenentwurf` | dieselben zwölf Inhalte in Tokens und Vorlagen des Gegenentwurfs | 15 |
| `feed.linkedin[]` | drei Beiträge in der Anrede des Kanals | 14, 16 |

### 5.4 Ergänzungen im Ausgang, begründet

| Feld | Inhalt | Warum | Abnehmer |
|---|---|---|---|
| `feed.kacheln[].art` | `serie`, `objekt`, `luecke` | trennt Art von Format, damit Formatmix eindeutig zählt | 14, 15, 16 |
| `feed.kacheln[].ersatz` | Ersatzkachel aus `hmFeedNeuRechnen` mit Status | kein leerer Platz, keine Lückenkachel online | 16, 17 über `quelle` |
| `feed.kacheln[].fassungen[]` | Plan A und Plan B bei offenem Beleg | Stichtag-Entscheidung ohne Improvisation | 14, 16 |
| `feed.kacheln[].belegSichtbar` | `{ref, wo}` | P4 im Raster | 14 |
| `feed.kacheln[].tag`, `datum`, `angepinnt`, `klasse`, `fuehrung`, `ton`, `einstellung`, `kennung` | Planmerkmale | Wochenregler, Pin-Logik, Weiterplanung in 17 | 15, 16, 17 |
| `feed.kacheln[].titelbild`, `skript[] {satz, sek}` | Vorschaubild und Clipliste | Drehtag | 16 |
| `feed.kacheln[].objektRef`, `energie` | Objekt und Energiekennzahlen | P8, P11 | 14, 16 |
| `feed.kacheln[].pruefvermerk`, `herkunft[] {pfad, art, ref, woertlich}`, `luecken[]` | offene Unterlage, Herkunft je Satz, Lücken je Kachel | Gate 2, Kennzeichnung eigener Worte, Redaktion | 14, 15 |
| `feed.plan.begruendung[]` | ein Satz je Platz mit Regelverweis | Markenbuch, Reveal | 14, 15 |
| `feed.pruefung` erweitert um `regeln[]`, `fenster[]`, `spalten`, `pinKante`, `vertrag[]`, `cd`, `datum` | nachvollziehbare Befunde | Gate 2 | 14 |
| `feed.objektFreigaben[]`, `redaktion[]`, `luecken[]`, `version`, `status`, `messung` | Nachweise, Versionen, Messung | ohne stille Änderung; `lernen` in 17 | 14, 16, 17 |

### 5.5 Korrekturbedarf an Nachbarverträgen

1. **Schritt 12.** (a) Probe-Folge und `serien[signatur].rhythmus`: Woche 1 erscheint vollständig am Live-Tag und wird angepinnt, nicht Di, Do, Sa (Pin-Logik 3.3, Grund "kein halbes Raster"). (b) `grammatik.angepinnt`: "liegen außerhalb der Folge und werden nicht geprüft" ersetzen durch Verweis auf 13 3.3; die Pin-Reihe ist Folge 1 bis 3 und wird geprüft. (c) `grammatik.nachbarn.plus3` um die Spaltenregel aus 3.6 ergänzen. (d) Bildaufbau Staffelplakat: Staffelthema in 92 px über der Linie, damit die Zielgruppe in der Pin-Reihe lesbar ist. (e) Ortsfolgen von Stand Sievering und Eingänge allgemein: nie am Haus eines eigenen Falls (a4). (f) `serien[].weitergeben` ist Ausgangssatz, der Empfänger wechselt je Folge, damit kein Satz zweimal im Takt steht.
2. **Schritt 16.** (a) Zeile 330: "in der Reihenfolge aus `feed.profilkopf.angepinnt` anpinnen" ersetzen durch "so anpinnen, dass die angezeigte Reihenfolge `feed.profilkopf.angepinnt` entspricht; Kontrolle am Gerät". (b) 16.11 und P21: "erscheint an diesem Samstag nichts" und "lassen den Platz leer" ersetzen durch "erscheint der Ersatz aus `feed.kacheln[].ersatz`; nur bei Status `gesperrt` ist die Woche nicht freigebbar". (c) 16.10: "Pilot in der Fassung ohne b1" heißt Plan B aus 3.13 (Pilot "Elf Wochen." mit b2). (d) 16.8 und 16.10: Bio aus `feed.profilkopf.bio` lesen statt eigener Fassung.
3. **Schritt 15.** Verweise auf alte Nummern ersetzen: Signatur 5c ist Nr. 2 (`feed.kacheln[1]`), Karussell 5c ist Nr. 3 oder Nr. 5, Fremdtest-Strom nimmt Nr. 2 und Nr. 7, die Lückenkachel ist Nr. 12 (`feed.kacheln[11]`). Der Satz "Das Reel drehen wir am Drehtag." bleibt und gilt für jedes geöffnete Reel.
4. **Schritt 7.** `beweise[].ort` und `beweise[].art` (fall, sammel, zitat) als Felder, damit `hmBelegPasst` nicht aus Text lesen muss; `beweise[].rechtsfreigabe` für Belege mit Personenbezug, Voraussetzung für die Pin-Reihe (so auch 07 Punkt 4 der offenen Punkte).
5. **Schritt 10.** 10.9 nennt für den Gegenentwurf "neun dunkle und drei helle Kacheln"; nach `grammatik.tonwertPeriode` aus Schritt 12 sind es zwei helle (Platz 6 und 12).
6. **Schritt 1.** `HM_IMPORT_FELDER.objekte` (`wb-werkzeuge.jsx` Zeile 125) um Status, `hwb`, `endenergie` oder `fgee`, `klasse`, `ausweisDatum` und `objektRef` zu den Fotos erweitern; sonst trägt keine Objekt-Kachel die Pflichtangaben.
7. **Schritt 11.** `bild.kontaktbogen[].crop` je Variante, falls die Achse einmal `ausschnitt` ist; die Augenlinie y 787 gilt nicht (so schon Schritt 12).

---

## 6. Qualitätsprüfung im Schritt

### 6.1 Regeln (automatisch, `hmFeedPruefen`)

Der Prüfer läuft für beide Varianten, beide Pin-Anzeigen, Plan A und B und jeden Ersatzstand.

| Nr. | Test | Bedingung für grün | Wirkung bei rot |
|---|---|---|---|
| P1 | Folge und Kennung | Folge gleich `start30` und `belegung`; `folgeNr` 1 bis 12 lückenlos; Kennung je Serie vorwärts ab 01; Plakat ohne Nummer; Karussell mit Seitenzahl | Übergabe gesperrt |
| P2 | Serie und Vorlage | jede Kachel mit `serie` aus `serien[]` und Vorlage passenden Formats | gesperrt |
| P3 | Gesicht im Bild | `gesicht` laut Kontaktbogen stimmt mit dem Plan; Gesicht im 3:4-Fenster und bei Reels in der Schnittmenge; die Zählung selbst liefert P5 | gesperrt |
| P4 | Beleg | (a) jede Ruhebild-Zeile mit `belegSichtbar`; (b) jedes Fenster in Verschiebung 1 und 2 geprüft, ohne Beleg gemeldet; (c) `hmBelegPasst` für Ort, Art, Serie; (d) jede Zahl in Bild und Caption steht wörtlich in einem Beleg mit `oeffentlich` "ja", ohne pauschal erlaubte Zahlen; (e) in der Pin-Reihe kein Beleg doppelt | (a), (c), (d), (e) gesperrt mit Tauschvorschlag; (b) Meldung |
| P5 | Grammatik | `hmSocialFolgePruefen(folge, grammatik)` ohne Pflichtverstoß für die Verschiebungen 0, 1, 2 und mit Anschluss; dazu P5a Pin-Kante (3.3 Punkt 5) und P5b Spaltenregel (3.6) | gesperrt |
| P6 | Textgröße | `textImBild` höchstens acht Wörter und mindestens `minTextKachelPx` im 3:4-Fenster; offener Beitrag mindestens `minTextBeitragPx`, Fließtext mindestens `minFliesstextPx` (abgeleitet aus https://developer.apple.com/design/human-interface-guidelines/typography); Tragendes in den sicheren Zonen | gesperrt |
| P7 | Kontrast und Satz von Bildern | WCAG 1.4.3 auch für Text in Bildern (https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), gemessen über `hmWeltKontrast`; mindestens zwei Codes aus `idee.codes` je Kachel; Kopfhöhen je Einstellung innerhalb von 4 Prozent der Bildhöhe (Setzung) | gesperrt, Kopfhöhe nur Hinweis |
| P8 | Fremde Objekte | `art` "objekt" nur mit `objektRef` dieses Maklers; keine Datei aus `hmWebObjekte`, `assets/img` oder Bildwelt | gesperrt |
| P9 | Fülltexte und Kohorte | kein Satz aus `HM_WELT_HOOKS`, Vorgaben, Musterbeispiel (außer beim Musterbeispiel-Makler) oder Feed eines anderen Maklers; Jaccard auf Wort-Trigrammen unter 15 Prozent (MARKENQUALITAET 4.6) | gesperrt |
| P10 | Stimme und Schluss | Anrede nur über die Paar-Syntax und `hmAnrede`; keine Wörter aus `sprachpruefung`; keine Gedankenstriche, Ausrufezeichen, Emojis; letzter Satz nennt Person oder Rolle und ein Verb des Weitergebens; kein Weitergeben-Satz zweimal im Takt | gesperrt |
| P11 | Objektregel | Energiekennzahlen in Bild und Caption, Preis und Fläche in der Caption (https://www.energieausweis360.at/energieausweis-neuerungen-2026, https://www.chg.at/novelle-des-energieausweis-vorlage-gesetzes/; keine Rechtsberatung) | gesperrt |
| P12 | Lücken und Ersatz | öffentliche Fassung ohne `art` "luecke"; höchstens eine Lückenkachel in der Vorschau, nur am Wechselplatz, mit `ersatz.status` "ersatz"; jede Lücke mit Termin | Übergabe an Gate 2 gesperrt, Vorschau erlaubt |
| P13 | Gegenentwurf | Worte, Folge, Bilddateien, Ausschnitte (außer Achse `ausschnitt`), `belegRef`, Ersatzstände identisch (Prüfsumme über die Inhaltsfelder) | gesperrt |
| P14 | Belegstatus | jeder Beleg mit Selbstauskunft hat `pruefvermerk`; Belege der Pin-Reihe mit Unterlage und bei Personenbezug mit `rechtsfreigabe` | Vermerke an Gate 2; Pin-Reihe gesperrt |
| P15a | Vertrag im Text, automatisch | je Attribut eine Wortlisten- und Musterprobe aus `imText`: a1 jede Zahl mit Ort oder Zeitraum und Quelle in derselben Caption; a2 keine Frist-Wörter ("jetzt", "nur noch", "sofort") als Druck; a3 kein Superlativ; a4 keine Hausnummer, kein Name, kein "Erbe" mit Personenmerkmal; a5 jede Warte-Geschichte mit Rechnung und im selben Takt ein schneller Fall | rot bei einem Treffer, Hinweis an CD |
| P15b | Vertrag im Bild, Handprüfung des CD | je Attribut `imBild` am gerenderten Raster: a1 echte Orte, keine Postkarte; a2 ein Motiv je Kachel; a4 Details statt Hausnummer, Erben nie im Bild; a5 Spannen verschieden lang, nie Uhr oder Sanduhr; Protokoll in `feed.pruefung.vertrag[]` | keine Abzeichnung ohne Protokoll |
| P16 | Visuelle Kohorte | kein zweiter UNIO-Makler im selben Bezirk mit derselben Vorlagen-Grammatik und demselben Akzent. Messbar: gleiche Grammatik heißt gleiche `gesichtPeriode`, `tonwertPeriode.periode`, `textfuehrung.periode` und gleiche Klassen im `wochentakt` und Zeichen-Platz innerhalb von 40 px; gleicher Akzent heißt Abstand der `akzent`-Tokens in OKLab unter 0,05 bei gleichem `grundton` (Setzung) | Hinweis an CD |

Die Kohortenprüfungen nehmen ernst, dass KI den Einzelfall hebt und viele Ergebnisse einander ähnlicher macht (https://www.science.org/doi/10.1126/sciadv.adn5290).

### 6.2 Menschliche Prüfung

- **Art Director:** Bildwahl, Crop, Augenlinie und Waagrechte am echten Bild; das Raster verkleinert und in Graustufen: ein Licht, eine Beschnittregel, keine Kachel fällt heraus (Cereal: Bilder wirken als Kombination, https://magculture.com/interview-with-rosa-and-rich-cereal/).
- **Texter oder Stratege:** die zwölf ersten Sätze laut lesen; jeden Weitergeben-Satz einzeln: Würde jemand das wirklich weiterschicken, und an wen?
- **Creative Director:** Leitfragen als Checkliste; Fünf-Sekunden-Test mit verdeckter Bio; P15b; Entscheidung über P16; Abzeichnung in `feed.pruefung.cd`.

---

## 7. Typische Fehler und wie sie verhindert werden

| Fehler | Beispiel | Verhindert durch |
|---|---|---|
| Zweite Grammatik neben Schritt 12 | eigene Regeln H4 bis H8 mit anderen Perioden | nur `grammatik` lesen, `hmSocialFolgePruefen` rufen |
| Eigene Serien statt der Plattform | Serien, die Schritt 12 nicht kennt | P2, Plan übernimmt `belegung` |
| Beleg am falschen Ort | Währinger Fall unter einem Sievering-Titel | P4c `hmBelegPasst` |
| Beleg nur auf Seite 2 oder in der Caption | Zeile gilt als belegt, obwohl man nichts sieht | `belegSichtbar`, P4a |
| Derselbe Beleg zweimal oben | ein Fall in zwei Pin-Kacheln | P4e, Regel "einmal je Takt gezeigt" |
| Streifenraster | drei Spalten mit je einem Format und einer Serie | P5b Spaltenregel |
| Leerer Platz oder Lückenkachel online | nichts am Samstag, oder "Hier kommt Ihr erstes Objekt" öffentlich | `hmFeedNeuRechnen`, P12 |
| Pins in falscher Reihenfolge | Folge 1 links statt rechts | 3.3, Kontrolle am Gerät |
| Gegenton oder Textkachel in der Pin-Reihe | dunkle Pin-Kachel über dunkler Stromkachel | P5a Pin-Kante |
| Heikler Beleg dauerhaft oben | Erbengemeinschaft ohne Rechtsfreigabe angepinnt | 3.3 Punkt 6, Plan B, P14 |
| Demo-Objekt im Makler-Feed | "Penthouse am Ring" bei einem Döblinger Makler | P8, Modus `streng` |
| Fülltext | "3 Fehler, die ich bei fast jedem Verkauf sehe." | P9 |
| Folio rückwärts | "24", "23" in einem neuen Profil | P1 |
| Titel in der Bedienfläche | Reel-Titel unten, verdeckt | P6, Team-Modus |
| Vorschaubild als Reel ausgegeben | Porträtfoto wirkt wie das fertige Reel | "Das Reel drehen wir am Drehtag.", `titelbild.status` |
| Rechtsaussage ohne Quelle | Erbrecht als Anleitung | `rechtshinweis`, Fundstelle Pflicht |
| Du auf LinkedIn trotz Regel | Caption duzt | Paar-Syntax, `hmAnrede`, P10 |
| Gegenentwurf mit anderem Inhalt | andere Titel oder Ausschnitte | P13 |
| Stille Änderung nach Gate 2 | "Neu erzeugen" überschreibt Captions | `feed.version`, Ersatz vorab eingefroren |

---

## 8. Umsetzung in der Werkbank

### 8.1 Dateien

| Datei | Änderung |
|---|---|
| `ui_kits/werkbank/wb-feed.jsx` (neu) | `hmFeedStoff(mid)`, `hmFeedPlan(mid)` (übernimmt `belegung`), `hmFeedNeuRechnen(mid, feed, ereignis)`, `hmBelegOrt(beleg)`, `hmBelegPasst(kachel, beleg, serie)`, `hmFeedRaster(feed, {verschiebung, pinModus})`, `hmFeedPruefen(feed, mid)` (ruft `hmSocialFolgePruefen`), `hmFeedWochen`, `hmFeedGegenentwurf`, `hmFeedWorteRegel`, `hmFeedSpeichern(mid, feed, grund)`, `hmFeedObjektFrage(mid, objektRef)`; Komponenten `FeedHandy`, `FeedWochenregler`, `FeedBeitrag`, `FeedTeam`; `hmSelbsttestFeed()`; Export über `Object.assign(window, ...)` |
| `ui_kits/werkbank/wb-social.jsx` (aus Schritt 12) | keine zweite Grammatik; `hmSocialFolgePruefen` bekommt optional die Spaltenregel, sobald 12 sie übernimmt |
| `ui_kits/werkbank/wb-markenwelten.jsx` | `WeltPost` mit `format` "reel" und `seiten`; Art `luecke` als Ansicht; `hmWeltPostDaten` Modus `streng`; `WeltProfilKopf` mit Bio in Zeilen, Highlights mit Bildtitel, Pins; Renderer lesen `system.tokens` bzw. `system.gegenentwurf` |
| `ui_kits/werkbank/wb-markenbuch.jsx` | Kapitel Feed liest `marke2[mid].feed` (Version), nicht mehr die ersten neun Serienbeispiele (Zeile 118) |
| `api/wb-marke.js` | Phase `feed` mit `SCHRITT.feed` und `SCHEMA.feed` |
| `ui_kits/werkbank/index.html` | Script-Tag für `wb-feed.jsx` nach `wb-social.jsx`, vor `wb-markenbuch.jsx` |
| `ui_kits/werkbank/wb-werkzeuge.jsx` | `HM_IMPORT_FELDER.objekte` erweitert (5.5 Punkt 6) |
| `docs/werkbank/MARKE_SCHEMA.md` | Abschnitt v2 mit dem Objekt aus 8.2 |

Optional, eigene Etappe: Gesichtserkennung für P3 und P7 mit der Erkennung aus dem Foto-Zuschnitt-Tool (`tools/maklerzuschnitt/src/index.html`). Architektur nach `ui_kits/werkbank/CLAUDE.md`: Babel ohne Build, globaler Scope, Präfix `hm`, `React.useState`, kein `import()`, Symbole nur über `<Ico n="..."/>`.

### 8.2 Datenvertrag im Store

```js
marke2[mid].start30 = [{ woche: 1, beitraege: [{ folgeNr, titel, serie, saeule, format, tag, datum }] }];  // genau 4

marke2[mid].feed = {
  status: "entwurf" | "pruefung" | "abgezeichnet", version: 1,
  kacheln: [{                                                     // genau 12
    folgeNr, woche, tag, datum, angepinnt: false, platz, klasse: "gesicht" | "sache",
    art: "serie" | "objekt" | "luecke",
    format: "reel" | "karussell" | "post",
    serie, folgeInSerie /* null beim Staffelplakat */, kennung, saeule, vorlage,
    einstellung: "halbnah" | "nah" | "weit" | "detail" | "flaeche", fuehrung: "bild" | "text",
    ton: "grund" | "gegenton", gesicht: true,
    bild: { datei, quelle: "kontaktbogen" | "portraet" | "objekt", crop: { empfehlung, gegenentwurf } },
    titelbild: { datei, status: "vorschau" | "drehtag" },          // nur reel
    textImBild, ausschnitt3zu4: { x, y, w, h }, titelPos: { x, grundlinie, stufe },
    seiten: [{ rolle, text, bild }],                                // nur karussell
    caption, kanal: "instagram",
    belegRef: ["b1"], belegSichtbar: { ref: "b1", wo: "titel" | "bild" } | null,
    pruefvermerk: [{ beleg, unterlage, rechtsfreigabe }],
    skript: [{ satz, sek }],                                        // nur reel
    objektRef, energie: { hwb, endenergie, fgee, klasse },          // nur art "objekt"
    codes: ["zeitmass", "portraetstil"],
    herkunft: [{ pfad, art, ref, woertlich: true }],
    luecken: [{ feld, was, termin }],
    ersatz: { status: "ersatz" | "gesperrt", kachel: { /* dieselbe Struktur */ }, grund, regeln: [], vorschlag } | null,
    fassungen: [{ plan: "A" | "B", bedingung, kachel }]            // nur bei offenem Beleg
  }],
  profilkopf: { profilbild, name, bio, highlights: [{ name, titelbild, storys: [1] }], angepinnt: [3, 2, 1] },
  wochen: [{ woche, datum, sichtbar: [3, 2, 1], darunter: { bestand: [], leer: true } }],   // genau 4
  gegenentwurf: { tokensRef, vorlagenRef, kacheln: [{ folgeNr, ton, render }], pruefsummeInhalt },
  linkedin: [{ aus: 2, form: "video" | "dokument" | "bild", text, belegRef }],
  plan: { begruendung: [{ folgeNr, satz, regel }], zustaende: { objekt: false, faelleFrei: [] } },
  pruefung: {
    gesicht: { anzahl, jeFenster: [], ok }, belegJeZeile: { ruhebild: [], fenster: [] },
    nachbarnOk, spalten, pinKante, textgroesseOk, kontrastOk,
    fremdobjekte: 0, fuelltexte: 0, lueckenkacheln,
    regeln: [{ test, ok, detail, vorschlag }], vertrag: [{ attribut, art: "text" | "bild", trifft, kacheln }], cd, datum
  },
  objektFreigaben: [{ objektRef, antwort: "zeigen" | "nicht zeigen", empfohlen: "nicht zeigen", grund, am }],
  redaktion: [{ pfad, alt, neu, grund, von, version }],
  luecken: [{ pfad, was, termin }],
  messung: { redaktionMin, planLaeufe, roteJeLauf },
  versionen: [/* frühere Stände, neueste zuerst, höchstens 12 */]
};
```

### 8.3 Schema für Structured Outputs der Claude-Kette

In `api/wb-marke.js` mit den Helfern `O`, `A`, `S`, `I` (Zeile 64 bis 67) und `B` wie in Schritt 12; `N` für Zahlen. Claude liefert nur Worte zu Plätzen, die der Planer vorgibt; nie Reihenfolge, Bild, Ton, Ersatz, Prüfung oder Status. `sek` im Skript ist Claudes Schätzung und wird von `hmSprechzeit` überschrieben.

```js
const E = (werte) => ({ type: "string", enum: werte });
SCHEMA.feed = O({
  kacheln: A(O({
    folgeNr: I,
    textImBild: S,
    seiten: A(O({ rolle: E(["versprechen", "einloesung", "schritte", "beleg", "weitergeben"]), text: S })),
    caption: S,
    skript: A(O({ satz: S, sek: N })),
    belegRef: A(S),
    herkunft: A(O({ pfad: S, art: E(["zitat", "antwort", "beleg", "serie", "stimme", "ableitung"]), ref: S, woertlich: B })),
    luecken: A(O({ feld: S, was: S }))
  })),
  profilkopf: O({ bio: S, highlights: A(O({ name: S })) }),
  linkedin: A(O({ aus: I, text: S, belegRef: A(S) }))
});
```

Prompt `SCHRITT.feed` (Entwurf, gleiches System und Dossier wie die übrigen Schritte, mit Cache):

```text
Schritt Feed: Worte für zwölf Beiträge, deren Plätze feststehen, dazu die Worte für jeden Ersatz und jede zweite Fassung.
Für jeden Platz bekommst du Serie, Folge, Format, Klasse, Hook-Formel, Ablauf, Themenvorrat und Weitergeben-Satz der Serie, die freigegebenen Belege mit ID und Ort und die Anrede als Paar-Syntax. Ändere keinen Platz, keine Serie, kein Format.
textImBild: eine Aussage, höchstens acht Wörter, Satzschreibung, nach der Hook-Formel. Keine Rubrik, keine Zahl ohne Beleg, kein Ort, der nicht der Ort des Belegs ist.
seiten (nur Karussell): Seite 1 wie textImBild. Seite 2 löst sofort ein. Eine Seite, ein Gedanke. Die Beleg-Seite nennt den Beleg wörtlich. Die letzte Seite endet mit dem Satz zum Weitergeben.
caption: erster Satz höchstens 90 Zeichen. Dann zwei bis vier kurze Sätze nach den Regeln der Stimme. Jede Zahl wörtlich aus einem Beleg in belegRef. Letzter Satz: an wen man den Beitrag schickt, abgeleitet aus dem Weitergeben-Satz der Serie; in zwölf Beiträgen kein Satz zweimal. Rechtsaussagen nur mit der mitgegebenen Fundstelle.
skript (nur Reel): drei bis fünf Sätze nach dem Ablauf der Serie, so gesprochen, wie der Makler spricht, je mit geschätzten Sekunden.
Anrede nur als Paar in geschweiften Klammern, etwa {Sie|du}. Erfinde nichts. Keine Namen Dritter, keine Hausnummern. Wo Stoff fehlt, schreibe in eckigen Klammern, was fehlt, und trage es in luecken ein.
herkunft: für jeden Satz mit eigenen Worten des Maklers pfad, art, ref und ob er wörtlich übernommen ist.
```

### 8.4 Regelpfad ohne Claude

Gleiche Struktur. `textImBild` aus `themenvorrat[].titel` oder `beispiele[].titel` bei höchstens acht Wörtern, sonst Lücke. Caption aus Hook, Beleg wörtlich und `serien[].weitergeben`; wiederholt sich der Satz im Takt, Lücke "Empfänger je Folge". Karussellseiten: Seite 1 und die Beleg-Seite gefüllt, übrige Lücke mit Rolle. Skript: Ablauf als Stichpunkte. Bio aus `stimme.beispiele`. Plan, Ersatz, Prüfung laufen ohnehin ohne Claude. Keine Textbibliothek.

### 8.5 Selbsttest `hmSelbsttestFeed()`

1. Plan für Markus gleich der Belegung aus 3.13, alle Pflichtregeln aus `hmSocialFolgePruefen` grün für 0, 1, 2.
2. Pin-Logik: `angepinnt` `[3, 2, 1]`; eine Pin-Kachel mit Gegenton oder Textführung wird rot.
3. Spaltenregel: drei `post` einer Serie in Einstellung detail auf i, i plus 3, i plus 6 außerhalb des Sendeplatzes werden rot; der Sendeplatz mit drei gleichen Dauern wird rot, mit verschiedenen grün.
4. Beleg: b3 unter einem Titel mit "Sievering" wird von `hmBelegPasst` rot; ein Beleg nur auf der Beleg-Seite zählt nicht für die Ruhebild-Zeile; derselbe Beleg in zwei Pin-Kacheln wird rot.
5. Fenster 11 bis 13 wird mit dem Anschluss aus Schritt 12 geprüft, nie mit einem leeren Platz.
6. `hmFeedNeuRechnen`: Stichtag ruhend ergibt Stand Sievering am Platz 12; der leere Platz wird als drei Gesichter im Fenster 10 bis 12 diagnostiziert; b1 und Fall B gesperrt ergibt `gesperrt` mit Vorschlag.
7. Keine Kachel mit `art` "luecke" in der öffentlichen Fassung.
8. Demo-Objekt aus `hmWebObjekte` erkannt; Objekt ohne HWB und Klasse rot.
9. `HM_WELT_HOOKS`-Satz und "Fehler, die ich bei fast jedem Verkauf sehe." als Fülltext erkannt.
10. Caption mit "Schreib es mir.", Ausrufezeichen oder ausgeschriebener Anrede ohne Klammern rot; zweimal derselbe Weitergeben-Satz im Takt rot.
11. Zahl, die in keinem Beleg steht, ohne Whitelist erkannt.
12. Titel mit neun Wörtern, unter 92 px oder Reel-Titel bei y 1300 rot.
13. Gegenentwurf mit geändertem Titel oder Ausschnitt bei Achse `tonwert` scheitert an der Prüfsumme.
14. Sara ohne Stoff liefert Lücken, keine Mustersätze, keine Gate-2-Fähigkeit.
15. Kein Renderer im Makler-Feed liest `HM_WELT_STIL[*].feed`; alle neuen Formate ohne NaN und undefined.

### 8.6 Aufwand

**Bau (Schätzung, Setzung):** Plan aus `belegung` mit Zuständen und Begründungen 1 Tag; `hmFeedNeuRechnen` mit Diagnose und Plan B 1 Tag; Prüfer ohne eigene Grammatik, mit Sichtbarkeit, Ortsbindung, Spalten, Pin-Kante, Pixelkontrast 1,5 Tage; Renderer für Reel-Titelbild, Karussellseiten, Lückenkachel als Ansicht, Profilkopf 2,5 Tage; Telefonansicht mit Wochenregler, geöffnetem Beitrag und Umschalter 2 Tage; Team-Oberfläche 1 Tag; Claude-Phase und Regelpfad 1 Tag; Gegenentwurf 0,5 Tage; Selbsttest 0,5 Tage. Zusammen rund 11 Arbeitstage, dazu 0,5 Tage für den Import. Gespart gegenüber Fassung 2: die doppelte Grammatik.

**Betrieb je Makler (Setzung, mit `feed.messung` ersetzen):**

| Rolle | Zeit mit Claude | Zeit ohne Claude |
|---|---|---|
| Art Director, Bildwahl und Crop | 30 bis 45 Minuten | 30 bis 45 Minuten |
| Texter oder Stratege, Redaktion einschließlich Ersatz und Plan B | 50 bis 70 Minuten | 100 bis 130 Minuten |
| Creative Director, Abnahme und P15b | 25 Minuten | 25 Minuten |
| Makler | 0 Minuten, bei Objekt-Freigabe unter einer Minute | wie mit Claude |

Kosten der Claude-Phase: ein Aufruf mit Cache auf System und Dossier; die Zahl liefert `kette.schritte` nach den ersten Läufen (Lücke). Keine Konten des Maklers oder des Teams bei fremden Werkzeugen.

---

## 9. Offene Punkte und Lücken

1. **Plattform-Details (Lücke):** zulässige Zahl der Pins, welche Tipp-Reihenfolge welche Anzeige erzeugt, ob angepinnte Beiträge zusätzlich an ihrer zeitlichen Stelle erscheinen, Zeichengrenze der Bio, sichtbare Caption-Länge, Archiv-Funktion, sichere Zonen organischer Reels. Der Prüfer rechnet beide Pin-Anzeigen; das Team prüft am Live-Tag am Gerät.
2. **Drei Beiträge am Live-Tag.** Ob drei Beiträge am selben Tag die Reichweite einzelner Beiträge mindern, ist nicht belegt. Setzung, nach den ersten Live-Tagen prüfen (Schritt 17, `wirkung`).
3. **Gesichtsanteil, Formatmix, Spaltenregel** bleiben Setzungen bis zu eigenen Zahlen nach zwölf Wochen.
4. **Rechtsgrundlagen** für Erbengemeinschaften als Beleg (Sperre vor der Pin-Reihe, 3.3 Punkt 6), Objektfotos und Energiekennzahlen in Social-Beiträgen; jede Rechtsaussage einer Folge mit Fundstelle. Keine Rechtsberatung in diesem Dokument.
5. **Anrede gegenüber dem Makler** in Lückenkachel und Reveal (Owner, 00_ZERLEGUNG 7.1).
6. **Markenarchitektur UNIO und Makler** (R5 offen): ob ein UNIO-Rahmen in Profilkopf oder Folio-Zeile erscheint.
7. **Für Markus** fehlen das Bildmaterial, die Freigaben, F12-2 und die Marktquelle; das Beispiel zeigt Plätze, Regeln, Gestaltung der Pin-Reihe und Ersatzstände, nicht einen fertigen Feed.

---

## 10. Quellen

Plattform und Lesbarkeit
- Kapwing, Instagram-Raster 3:4: https://www.kapwing.com/resources/instagrams-new-grid-layout-size-and-dimensions-2025/
- Social Media Today, Raster umordnen ab 8. Juni 2026: https://www.socialmediatoday.com/news/instagram-releases-profile-grid-rearranging/822304/
- Engadget, angepinnte Beiträge bleiben beim Umordnen oben: https://www.engadget.com/2190179/instagram-how-to-reorder-grid/
- Instagram, Ranking Explained: https://about.instagram.com/blog/announcements/instagram-ranking-explained
- Meta, sichere Zonen für Reels: https://www.facebook.com/business/ads-guide/update/video/instagram-reels
- Apple HIG, Typografie: https://developer.apple.com/design/human-interface-guidelines/typography
- W3C WCAG 2.2, 1.4.3: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- Later Visual Planner: https://later.com/visual-planner/
- Figma Buzz, Bulk Create: https://help.figma.com/hc/en-us/articles/31271824185623-Bulk-create-assets-in-Figma-Buzz
- Canva, On-Brand-Designs: https://www.canva.com/help/create-on-brand-designs/
- Energieausweis 2026: https://www.energieausweis360.at/energieausweis-neuerungen-2026 und https://www.chg.at/novelle-des-energieausweis-vorlage-gesetzes/
- § 797 ABGB, Einantwortung (RIS): https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001622&Paragraf=797

Studios, Feeds, Makler
- magCulture, Cereal: https://magculture.com/interview-with-rosa-and-rich-cereal/
- Hole & Corner, The Modern House: https://www.holeandcorner.com/long-reads/in-the-modern-style
- Mozilla Open Design: https://blog.mozilla.org/opendesign/roads-not-taken/
- DIA für Nuits Sonores: https://the-brandidentity.com/project/dia-studio-builds-a-generative-tool-that-makes-nuits-sonores-pulse-2
- Patrik Hübner: https://www.patrik-huebner.com/applying-generative-design-to-brand-design/
- GDUSA, Pentagram und performance.gov: https://gdusa.com/pentagram-federal-website-generates-ai-controversy/
- BAM, Auswertung NAR 2025: https://nowbam.com/how-home-buyers-and-sellers-find-their-agents-in-2025/

Studien
- Willis und Todorov 2006: https://doi.org/10.1111/j.1467-9280.2006.01750.x
- Hsee 1996: https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf
- Norton, Mochon, Ariely 2012: https://myscp.onlinelibrary.wiley.com/doi/abs/10.1016/j.jcps.2011.08.002
- Fuchs, Prandelli, Schreier 2010: https://doi.org/10.1509/jmkg.74.1.65
- Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290

Intern: `00_ZERLEGUNG.md`, `bestand/KETTE_IST.md`, `research/R1-studios.md` bis `R8-kundenerlebnis.md`, `schritte/07_positionierung.md`, `09_idee.md`, `10_system.md`, `11_bild.md`, `12_social.md` (Fassung 3), `15_reveal.md`, `16_freigabe.md`, `docs/werkbank/MARKENQUALITAET.md`, `docs/werkbank/MARKE_SCHEMA.md`, `ui_kits/werkbank/wb-markenwelten.jsx`, `wb-markenbuch.jsx`, `wb-os-data.jsx`, `wb-werkzeuge.jsx`, `wb-store.jsx`, `api/wb-marke.js`.
