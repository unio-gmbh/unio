# Schritt 17. Pflege im Betrieb (`betrieb`)

Stand 30.09.2026. Entwurf für Branding v2, Teilschritt 17 von 17. Entwurf zur Prüfung durch den Kontrolleur und zur Freigabe durch den Owner. Teil der Zerlegung in `../00_ZERLEGUNG.md`, Kapitel 3, Schritt 17.

Grundlagen: `../00_ZERLEGUNG.md` (Vertrag), `../research/R1-studios.md` bis `R8-kundenerlebnis.md`, `../bestand/KETTE_IST.md` (vor allem 2.9, 2.10 und Kapitel 3), `../bestand/FRAGEN_WIRKUNG_IST.md`, die Nachbarschritte `01_auftakt.md`, `02_fragebogen.md`, `07_positionierung.md`, `10_system.md`, `11_bild.md`, `12_social.md`, `13_feed.md`, `14_markenbuch.md`, `16_freigabe.md`, der Code in `ui_kits/werkbank/` (`wb-produktion.jsx`, `wb-os-data.jsx`, `wb-content.jsx`, `wb-more.jsx`, `wb-store.jsx`, `wb-betrieb.jsx`, `wb-werkzeuge.jsx`, `wb-shop2.jsx`, `wb-einrichtung.jsx`) und `api/wb-marke.js`.

**Lesart** wie in der Zerlegung: **Belegt** heißt, es steht in einer Quelle mit URL oder in einer genannten Datei mit Zeile. **Ableitung** heißt, eigene Folgerung. **Setzung** heißt, bewusst gesetzter Startwert, der an den ersten Maklern gemessen und ersetzt wird. **Lücke** heißt, wir wissen es nicht. **Arbeitsannahme** heißt, ein Wert aus einem Nachbarschritt, der dort als Beispiel steht und hier nur die Mechanik zeigt.

---

## 0. Kurzfassung

1. **Eine Uhr statt eines Kalenders.** Der Betrieb läuft in Blöcken zu vier Sendewochen mit genau zwölf Rasterbeiträgen, also genau einem Takt der Grammatik aus Schritt 12 (Gesicht Periode 3, Gegenton Periode 4, gemeinsam zwölf). Drei Blöcke sind eine Staffel und zugleich der Messzeitraum von zwölf Wochen. Dieselbe Uhr trägt Plan, Drehtag, Freigabe, Wirkung und Quartal. Heute laufen Monatsideen, Posting und Report nach dem Kalendermonat und ohne Bezug zur Grammatik (`wb-produktion.jsx` `hmIdeen` Zeile 154, `hmReportAus` Zeile 698).
2. **Der Monatsplan kommt nur aus der Quelle.** `hmMonatsplan` setzt die Folge dort fort, wo sie steht (letzte Folgenummer, Platz im Takt, Folge je Serie), und füllt jeden Platz nur aus `quelle.inhalt.social.serien`: Rhythmus, Hook-Formel, Themenvorrat, Variable, Belege mit Prüfstatus. `HM_IDEEN_VORLAGEN` und `HM_ANLAESSE_Q4` entfallen für v2-Makler (heute der Bruch aus KETTE_IST 2.9). Ein Anlass wie die Heizsaison darf nur noch die Variable einer vorhandenen Serie füllen, nie eine eigene Idee sein.
3. **Fehlender Stoff wird vier Wochen vorher sichtbar, nie überspielt.** Jeder Platz trägt `materialBedarf` mit Frist. Der Planer nennt, welches Fenster des Rasters an diesem Stoff hängt. Fällt ein einzelner Beitrag aus, springt die freigegebene Reserve derselben Klasse ein; fehlt die Freigabe der ganzen Folge, ruht die ganze Sendewoche, statt die Grammatik zu brechen (3.3, 3.7). Es gibt keine automatische Freigabe nach Frist mehr (heute `wb-content.jsx` Zeile 142 und 323) und keine Lückenkachel im öffentlichen Profil. Neue Fälle und Belege aus dem Betrieb landen im Arbeitsstand `betrieb.stoff`, nie still in der eingefrorenen Quelle.
4. **Ein Drehtag im Monat mit fertiger Fragenliste.** Donnerstag der zweiten Woche jedes Blocks, für alle Reels und Standbilder des nächsten Blocks. Danach vier Werktage Produktion und fünf Werktage Freigabefenster, die vor dem nächsten Block aufgehen (3.2). Die Fragenliste entsteht aus dem Ablauf der Serien und dem Themenvorrat. Nach dem Vorbild von Glennda Baker, die laut NAR über 30 Videos an einem Drehtag im Monat produziert (https://www.nar.realtor/magazine/real-estate-news/technology/how-this-agent-is-making-six-figures-on-tiktok). Ein Licht- und Farbrezept mit Referenzbild des letzten Drehtags hält das Handwerk über zwölf Drehtage gleich und wird je Bild gemessen (3.4, V15).
5. **Er gibt die Folge frei, nicht jede Kleinigkeit.** Einmal je Block sieht der Makler die zwölf Beiträge und die Reserven je Klasse als sein Profil mit Wochenregler und gibt sie mit einem Klick frei. Beiträge aus gesperrten Vorlagen brauchen nur ihn; frei gestaltete brauchen vorher die Abnahme von Art Director oder Creative Director und danach ihn (R4 Ü11, https://www.canva.com/help/brand-control/). Kaufentscheidungen wie ein zusätzliches Video liegen nie in seiner Freigabe.
6. **Keine Veröffentlichung ohne Prüfung.** `hmVeroeffentlichungPruefen` prüft vor jedem Beitrag die sechs Punkte des Vertrags (Sprache, Anrede, Codes, Grammatik, Energiekennzahl, Gesicht) und dazu Prüfsumme der Quelle, Beleg-Status, Kohorte, Bildregeln und Kontingent. Ein roter Punkt sperrt.
7. **Wirkung gegen das eigene Maß, nicht gegen Reichweite.** Jede Serie wird an ihrer eigenen Aufgabe gemessen (Signatur: Weiterleitungen je Reichweite; Wie ich arbeite: Saves je Reichweite und Anfragen mit Bezug), die Marke als Ganzes nach zwölf Wochen am `markenvertrag.erfolgsmass`. Die heutige Wirkungs-Prognose, die Persönlich und Markt belohnt (`hmViralScore`, `wb-os-data.jsx` Zeile 205), entfällt. Pflichtsäule und Kompetenz vor Persönlichem sind Nebenbedingungen, keine Gewichte: Keine Zahl kann sie abwählen.
8. **Eigene Zahlen ersetzen Richtwerte, aber mit Vorsicht.** Nach zwölf Sendewochen ersetzt die Regel Formatmix und Gesichtsanteil nur, wenn je Format mindestens sechs Beiträge vorliegen, beide Hälften des Zeitraums in dieselbe Richtung zeigen und der Abstand groß genug ist (Setzungen). Höchstens ein Platz je zwölf wechselt je Staffel. Die Änderung ist eine kleine Version, die der Makler mit einem Klick bestätigt.
9. **Nichts ändert sich still.** Staffelthema, Quartalston und Motivthema wechseln je Staffel innerhalb dessen, was `system.festUndVariabel` erlaubt; die Regel beweist mit Hashes, dass Zeichen, Wortmarke, Schrift, Crop und Porträtstil gleich blieben. Das Staffelplakat wechselt nur in drei Feldern einer gesperrten Vorlage (3.10). Alles andere läuft als `aenderungsantrag` nach der Versionsregel aus Schritt 16. Eine Änderung aus dem Rückblick nach zwölf Wochen gilt ab dem ersten Block, dessen Plan nach der Bestätigung entsteht, bei Markus ab Block 6.
10. **Lernen läuft zurück, ohne zu blockieren.** An Schritt 2: welche Frage nachweislich ein Feld der Quelle und im Betrieb einen Beitrag speist, gemessen an der Herkunft der Felder. An Schritt 12: welche Setzungen sich an den ersten fünf Maklern bewähren. Beides sind Vorschläge an den Owner, nie automatische Änderungen.

---

## 1. Ziel und Erfolgskriterium

### 1.1 Ziel

Die Marke im Alltag verteidigen und lebendig halten: Monatsplanung nur aus den Serien der eingefrorenen Quelle, jeder Beitrag durch Vorlagen und Renderer der Marke, Prüfungen vor jeder Veröffentlichung, eigene Zahlen nach zwölf Wochen statt Richtwerten, Änderungen nur als neue Version. Für den Makler heißt das: einmal im Monat ein Drehtag mit fertiger Fragenliste, dazwischen eine Freigabe der ganzen Folge, nach 30 Tagen und nach zwölf Wochen ein kurzer Rückblick mit seinen echten Zahlen. Er muss nur noch auftauchen.

Warum das die bestmögliche und nicht die bequemste Lösung ist: Die bequeme Lösung gibt es schon. Ein Ideen-Generator füllt allgemeine Muster mit dem Bezirk ("Mein Dienstag in 5 Stationen.", `wb-produktion.jsx` Zeile 105), die Caption ist eine Formel mit "Wie sehen Sie das? Schreiben Sie mir." und Hashtags (`hmCaption`, `wb-os-data.jsx` Zeile 210), die Prognose belohnt Persönlich und Markt (Zeile 205), und ohne Antwort geht ein Beitrag nach Frist automatisch online (`wb-content.jsx` Zeile 142). Damit endet die teuerste Arbeit der Kette, Plattform, Serien und Idee, im Markenbuch (KETTE_IST 2.9: "Hier reißt die Kette."). Studios betonen, dass ein System für den Kunden leicht zu pflegen sein muss und Einhaltung der Weg des geringsten Widerstands (Luke Powell, Pentagram, und Luke Scott, How&How, https://the-brandidentity.com/interview/presented-by-brandpad-how-to-systemise-a-brand-featuring-pentagram-how-how-and-studio-blackburn). Genau das ist dieser Schritt: der Ort, an dem sich zeigt, ob die Marke hält.

### 1.2 Erfolgskriterium

| Nr. | Kriterium | Messung | Schwelle |
|---|---|---|---|
| E1 | Jede Monatsidee aus einer Serie der Quelle | Anteil der Plätze in `monatsplan` mit `serie` aus `quelle.inhalt.social.serien` und Hook nach deren `hookFormel`; Suche nach Texten aus `HM_IDEEN_VORLAGEN`, `HM_ANLAESSE_Q4`, `HM_PF_FIGUR` | 100 Prozent, 0 Treffer; Sonderfolgen höchstens eine je Block, mit CD-Abnahme |
| E2 | Jeder Beitrag sieht aus wie das Markenbuch | alle öffentlichen Dateien aus den Renderern mit `quelle.inhalt.system.tokens`; `codes` mindestens zwei je Kachel; Blick des Art Directors je Block | 100 Prozent, Protokoll je Block |
| E3 | Keine Veröffentlichung ohne Prüfung | `beitrag[].pruefung` vollständig grün vor `veroeffentlicht`; Ereignisprotokoll | 0 Beiträge ohne grünen Stand |
| E4 | Nichts ohne Freigabe | kein Beitrag online ohne `freigabe.makler` oder, bei freier Gestaltung, zusätzlich `freigabe.team`; keine Frist-Freigabe | 0 |
| E5 | Takt hält | Anteil der geplanten Sendeplätze, die mit freigegebenem Inhalt derselben Klasse erschienen sind; Grammatik der tatsächlich veröffentlichten Folge für Verschiebung 0, 1 und 2 | mindestens 95 Prozent (Setzung), Grammatik ohne Verstoß |
| E6 | Drehtag deckt den nächsten Block | jedes Reel und jedes Standbild des nächsten Blocks mit Titelbild, Sätzen und B-Roll aus dem Drehtag; je Klasse eine gültige, freigegebene Reserve (Drehtag oder Kontaktbogen) | 100 Prozent |
| E7 | Ehrliche Makler-Zeit | gemessene Minuten je Block (Drehtag, Freigabe, Stoff) gegen die angekündigte Dauer und gegen `antworten.zeit` über `serieSignatur.tragfaehigkeit.maklerMinutenMonat` | Drehtag höchstens 120 Minuten einschließlich Stoff-Fragen und eines Ortswechsels (Setzung, 3.4); Monat im Budget; Überschreitung wird vor dem Drehtag angezeigt und durch einen Eingriff behoben |
| E8 | Eigene Zahlen nach zwölf Sendewochen | `wirkung.bewertung` liegt vor; `formatmix` und Gesichtsregel sind bestätigt oder per kleiner Version ersetzt | am ersten Rückblick nach Staffel 1 erfüllt |
| E9 | Nichts still | jede Abweichung von der Quelle hat einen `aenderungsantrag` mit Version oder ist Füllung, Unterlage oder Stammdatum mit Ereignis | 0 stille Änderungen im Selbsttest |
| E10 | Kohorte bleibt unterscheidbar | Textähnlichkeit neuer Hooks, Titel und Captions gegen alle anderen UNIO-Makler (Jaccard auf Wort-Trigrammen, MARKENQUALITAET Kapitel 2); visuell kein zweiter Makler im selben Bezirk mit gleicher Grammatik und gleichem Akzent | unter 5 Prozent; 0 visuelle Kollisionen |
| E11 | Belegt öffentlich | keine Zahl in einem veröffentlichten Beitrag ohne Beleg mit Prüfstatus "Unterlage geprüft" | 0 |
| E12 | Lernen fließt zurück | nach fünf Maklern mit Quelle liegt je Frage aus `HM_FRAGEN_V2` ein Wirkungsbefund vor, nach fünf Maklern mit zwölf Wochen ein Vorschlag zu den Setzungen aus Schritt 12 | erfüllt, nicht blockierend |

### 1.3 Was wir ab dem ersten Makler messen

Je Block: Makler-Minuten für Drehtag, Freigabe und Stoff; Teamstunden je Beitrag; Zahl der Plätze mit Reservefolge; Tage von Freigabe-Ansicht bis Freigabe; Anteil der Plätze, deren Stoff zur Frist fehlte, und welcher Stoff (Unterlage, Marktquelle, Objekt, Fall). Je Staffel: Zahl der Änderungsanträge nach Art. Diese Zahlen ersetzen die Setzungen in 3.3, 3.4 und 8.5. Ein Zufriedenheitssatz wird nicht abgefragt, weil er keinen Liefergegenstand verändert (wie Schritt 16, 1.3).

---

## 2. Geprüfte Alternativen und warum verworfen

| Nr. | Alternative | Was dafür spricht | Warum verworfen | Was wir übernehmen |
|---|---|---|---|---|
| A1 | **Weiter wie heute:** `hmIdeen` aus `HM_IDEEN_VORLAGEN` und `HM_ANLAESSE_Q4`, Caption-Formel, `hmViralScore`, Freigabe je Beitrag mit Automatik nach Frist | läuft, deterministisch, ohne Tokens | Die Monatsideen lesen die Plattform nicht, Serien und Startplan kommen in der Produktion nicht vor, die Hooks sind feste Weg-Hooks, die Prognose arbeitet gegen die Pflichtsäule (KETTE_IST 2.9, 2.10, Kapitel 3). R4 schließt eine allgemeine Vorlagen-Bibliothek ausdrücklich aus: Jede Vorlage leitet sich aus der Marke des Maklers ab (R4 Kapitel 4, Punkt 7). | die deterministische Arbeitsweise, `hmProdAehnlich` gegen Dubletten, `hmInsightsLesen` für den Export aus der Meta Business Suite, `hmMetricoolCsv` für das Einplanen |
| A2 | **Der Makler bedient die Vorlagen selbst** (Canva-Modell: gesperrte Vorlagen, offener Inhalt, KI respektiert die Sperren) | Canva kennt Sperrstufen und lässt seine KI sie respektieren (https://www.canva.com/help/brand-template-locks/); Tempo, keine Teamzeit | Ein offener Editor führt zum Vorlagen-Look (R4 Kapitel 4, Punkt 5); Mitgestalten im Designwerkzeug erzeugt Aufwand ohne Kompetenzgefühl (R7 Kapitel 5), und der Eigentumseffekt schwindet, wenn sich der Kunde nicht kompetent fühlt (https://doi.org/10.1509/jmkg.74.1.65). Ob Makler gesperrte Vorlagen akzeptieren, ist unbelegt (R4 offene Frage 2). Das Erlebnis des Vertrags ist "Er muss nur noch auftauchen", nicht "Er gestaltet jede Woche". | Sperrstufen als Daten je Feld (R4 Ü1), Befüllen aus einer Tabelle mit aktiven Sperren (R4 Ü6, Figma Bulk Create: https://help.figma.com/hc/en-us/articles/31271824185623-Bulk-create-assets-in-Figma-Buzz) |
| A3 | **Externe Plattform für den Betrieb** (Frontify, Corebook, Later) | Markenportal mit Vorlagen, Freigaben und Nutzungsanalyse (https://www.frontify.com/en/brand-portal); Rasterplanung mit Vorschau (https://later.com/visual-planner/) | R8 Kapitel 5: kein Abo und kein weiterer Login für den Makler, die Werkbank kann es selbst. Eine zweite Datenablage widerspricht der einen Quelle aus Schritt 16. Die Rubrik verlangt, dass keine Konten des Maklers bei fremden Werkzeugen nötig sind. | die Vorschau des geplanten Rasters (Later), Nutzungsanalyse als eigene Zählung, die Sicht je Rolle aus Schritt 14 |
| A4 | **Freigabe je Beitrag mit Automatik nach Frist** (heute; PLAN "Auto-Freigabe nach 5 Tagen"; `HM_REGELN` Eintrag "Freigabe-Latenz: Auto-Freigabe erklären", `wb-more.jsx` Zeile 33) | nichts bleibt hängen, der Takt hält | Eine Freigabe ist ein Akt mit Name und Datum (R8 Prinzip 7); Schritt 16 hat die Automatik für Freigabe 2 aus diesem Grund verworfen (16 A9). Ein Beitrag mit einer Zahl, einem Fall oder einem Objekt, den niemand freigegeben hat, trägt der Makler nicht. Zwölf Einzelfreigaben je Monat widersprechen dem Erlebnis "die Folge statt jeder Kleinigkeit". | den Nachfass-Takt als Erinnerung; die Reservefolge sichert den Takt statt der Frist |
| A5 | **Auf Reichweite optimieren:** Viral-Score, Trend-Formate, mehr Frequenz ("Rhythmus auf 3 bis 5 heben, das verdoppelt das Wachstum", `hmReportAus`, `wb-produktion.jsx` Zeile 720) | Instagram belohnt schnelle Reaktionen und Weiterleitungen (https://about.instagram.com/blog/announcements/instagram-ranking-explained) | Die Nachfrage kommt über Empfehlung, der Feed bestätigt sie; Followerzahl ist kein Ziel (R5 Kapitel 1.6 und 5, USA-Daten https://nowbam.com/how-home-buyers-and-sellers-find-their-agents-in-2025/). Qualität vor Takt (Cereal, R6 Prinzip 8). Die Verdopplungsaussage im Code hat keine Quelle. Stabilität ist ein Vorläufer von Authentizität bei Personenmarken (https://doi.org/10.1002/mar.20771), Trend-Wechsel zerstören sie. | Weiterleitungen als Signal, aber gemessen je Serie gegen ihre eigene Aufgabe und das Erfolgsmaß des Vertrags |
| A6 | **Jährlicher Auffrischung des Looks** oder saisonale Kampagnen mit neuem Erscheinungsbild | wirkt lebendig, Anlass für neue Inhalte | Assets müssen langfristig aufgebaut und geschützt werden, jede Änderung hat Folgen (https://marketingscience.info/learn-with-us/commercial-research/distinctive-asset); nur 15 Prozent der Markenelemente sind wirklich unverwechselbar (https://www.marketingweek.com/15-brand-assets-truly-distinctive-finds-research/). R7 Kapitel 5: kein Wechsel der Assets je Kampagne oder Saison. | Konstante plus eine Variable je Staffel, wie Pentagram für das Public Theater (https://www.pentagram.com/work/the-public-theater-2020-2021-season); R2 3.13 |
| A7 | **Spontan und laufend drehen**, der Makler filmt selbst am Telefon, wann es passt | echt, schnell, Mosseri soll laut Sekundärquelle echte, menschliche Inhalte bevorzugen (R6 1.2, Memo selbst nicht gelesen) | Serien brauchen festen Bildaufbau und feste Titelposition (R6 Regel R7); ein Einzelmakler mit 2 bis 4 Stunden im Monat dreht nicht zuverlässig wöchentlich (Schritt 12, `maklerMinutenMonat`). Gebündelte Drehtage sind belegt praktikabel (Baker, NAR, oben). | Stories dürfen roher sein als Rasterbeiträge; Hill rät zu "ragged edges" statt perfekter Richtlinientreue (https://www.aufi.com/insights/modern-house-albert-hill-design) |
| A8 | **A/B-Tests je Beitrag** und Optimierung nach Einzelwerten | wirkt wissenschaftlich | Drei Rasterbeiträge je Woche ergeben in zwölf Wochen 36 Beiträge, je Serie sechs bis zwölf. Einzelwerte streuen stark; Makler-Daten fehlen in allen Quellen (R6 1.2, Lücke). Wer auf Einzelbeiträge reagiert, jagt dem Zufall nach. | Auswertung je Serie und Format mit Mindestmenge, Median und Halbierungsprobe (3.9) |

---

## 3. Die gewählte Lösung

### 3.1 Grundgedanke: eine Uhr

Die Grammatik aus Schritt 12 rechnet mit der Folge der Beiträge, nicht mit Kalendertagen (12, 3.7: "Folge vor Position"). Daraus folgt die wichtigste Entscheidung dieses Schritts: **Der Betrieb plant in Takten, nicht in Kalendermonaten.**

| Einheit | Länge | Was sie trägt | Warum |
|---|---|---|---|
| Sendewoche | drei Rasterbeiträge an den drei Plätzen des Wochentakts (12, 3.7) | Sendetag der Signatur, Gesichtsplatz, Sachplatz | Setzung aus Schritt 12 |
| Block ("Monat" in der Oberfläche) | vier Sendewochen, zwölf Beiträge | ein `monatsplan`, ein Drehtag, eine Freigabe der Folge | Gesichtsperiode 3 und Gegentonperiode 4 wiederholen sich nach zwölf; ein Block ist genau ein Takt. Ein Kalendermonat hat 12 bis 15 Beiträge und würde den Takt an jeder Monatsgrenze anders schneiden (Ableitung). |
| Staffel | drei Blöcke, zwölf Sendewochen, 36 Beiträge | `quartal` (Staffelthema, Quartalston, Motivthema), Staffelplakat, Auswertung von `wirkung` | Schritt 12 setzt eine Staffel auf ein Quartal. Zwölf Sendewochen plus die üblichen Pausen ergeben rund ein Quartal, und der Messzeitraum "nach zwölf Wochen" aus dem Vertrag fällt genau auf das Staffelende (Ableitung). |
| Pause | ganze Sendewochen ohne Beiträge | Weihnachten, Urlaub, Tage ohne den Anlass der Signatur, eine Woche ohne Freigabe (3.7) | Weil die Grammatik an der Folge hängt, bricht eine Pause das Raster nicht: Nach der Pause geht es am nächsten Platz der Folge weiter (Ableitung aus R6 Prinzip 2). Pausen verlängern Block und Staffel, sie verkürzen sie nicht. Eine halbe Sendewoche gibt es nicht. |

Daraus entstehen drei Kreisläufe mit je einem Moment für den Makler:

| Kreislauf | Takt | Moment | Makler tut | Dauer für ihn (Setzung) |
|---|---|---|---|---|
| Block | alle vier Sendewochen, Donnerstag der W2 | Drehtag | auftauchen, im Gespräch seine Folgen erzählen, zwei Stoff-Fragen beantworten | 60 bis 120 Minuten einschließlich Stoff-Fragen und eines Ortswechsels, vorher genau angekündigt |
| Block | Freigabe-Ansicht öffnet fünf WT nach dem Drehtag und bleibt fünf WT offen | Freigabe der Folge | seinen nächsten Block samt Reserven als Profil ansehen, freigeben oder einzelne Stellen anmerken | 8 bis 12 Minuten |
| Staffel | nach 30 Tagen (einmal) und nach jeder Staffel, dann am Drehtag in W2 des ersten Blocks der neuen Staffel | Rückblick | seine echten Zahlen am Maß seines Vertrags sehen, höchstens eine Änderung bestätigen, die ab dem ersten danach geplanten Block gilt | 20 bis 30 Minuten vor dem Drehtag, angekündigt |

Dazwischen läuft alles ohne ihn, und nichts erscheint, was er nicht freigegeben hat.

### 3.2 Der Lauf eines Blocks

Bezeichnung: Block n läuft in den Sendewochen W1 bis W4. Werktage (WT) nach `hmIstWerktag` (`wb-shop2.jsx` Zeile 26). Abstände sind Setzungen.

| Wann | Was | Wer | Ergebnis |
|---|---|---|---|
| Block n, W1, Montag (beginnt der Block an einem Dienstag, der Vortag) | `hmMonatsplan` rechnet Block n+1: zwölf Plätze, Hooks, Stoff, Kontingent, Reserven | Regeln, Claude (Hooks, wo Stoff vorliegt) | `monatsplan` mit Status je Platz, Liste `materialBedarf` mit Fristen |
| W1 | Team prüft den Plan, holt fehlenden Stoff: Unterlagen, Marktquelle, Objekt-Freigaben; entscheidet einen Kontingent-Befund (3.3) | Team, Art Director 30 min | Plan "bereit zum Drehtag" oder Blocker mit kleinstem Eingriff |
| W1 | Stoff-Fragen und Unterlagen an den Makler, als Nachricht, höchstens zwei Fragen und drei Unterlagen; Frist Dienstag der W2 | Team | Antworten gehen in den Arbeitsstand `betrieb.stoff` mit Prüfstatus "Selbstauskunft", Unterlagen setzen dort oder in `quelle.gesperrt` den Prüfstatus; die Quelle bleibt unverändert (3.11) |
| W2, Montag | Drehtag-Seite an den Makler: wann, wo, was er anzieht, worüber wir sprechen, wie lange | Regeln aus `fotobrief.maklerSeite`, Team | `drehtage[]` mit `maklerSeite` drei WT vorher auf dem Telefon |
| W2, Donnerstag | Drehtag für Block n+1 | Team, Makler | Clips, Titelbilder, Standbilder je Platz; Durchgang 1 und 2 nach Schritt 11; Rezept-Messung je Aufbau (V15) |
| W2, Freitag, bis W3, Mittwoch | Produktion, vier WT: Vorlagen füllen, Renderer, Captions, Prüfung | Regeln, Claude (Captions), Team | `beitrag[]` im Zustand "geprüft", Reserven je Klasse geprüft |
| W3, Donnerstag | Freigabe-Ansicht für Block n+1 öffnet | Regeln | Makler sieht das Profil nach Woche 1 bis 4 des nächsten Blocks und die Reserven |
| W3, Donnerstag, bis W4, Mittwoch | Freigabefenster, fünf WT | Makler | `freigabe.makler` je Beitrag und je Reserve mit Verweis auf dieselbe Sitzung |
| W4, Donnerstag, bis zum ersten Beitrag von n+1 | Puffer, mindestens zwei WT | Team | Einplanen, Korrekturen aus Anmerkungen |
| laufend | Veröffentlichen zur Uhrzeit aus `serien.rhythmus`, vorher `hmVeroeffentlichungPruefen` | Regeln, Team über Metricool oder den Partnerzugang der Meta Business Suite | `beitrag.veroeffentlicht {am, permalink}` |
| wöchentlich, Montag | Insights-Export einlesen (`hmInsightsLesen`), Kontakte aus dem laufenden Import zählen | Team 10 min, Regeln | `wirkung.beitraege[]` fortgeschrieben |

**Die Uhr in Werktagen.** Drehtag D, Produktion D plus 1 bis D plus 4 WT, Freigabe-Ansicht öffnet an D plus 5 WT, Freigabefenster fünf WT bis D plus 9 WT, Puffer mindestens zwei WT bis zum ersten Beitrag von n+1 (alle Abstände Setzungen, Produktion aus Schritt 16, 3.2). Mit Drehtag am Donnerstag der W2 endet das Fenster am Mittwoch der W4, und bis zu einem ersten Beitrag am Montag nach W4 bleiben Donnerstag und Freitag als Puffer; beginnt der Block am Dienstag, sind es drei WT. Fallen Feiertage in diese Spanne, zieht `hmUhr` den Drehtag um die fehlenden WT vor, nie wird das Freigabefenster kürzer als fünf WT (Selbsttest 1). So rechnet `hmUhr` feste Abstände, keine Wochentage, und kann nicht widersprüchlich werden.

**Warum der Drehtag in W2 liegt.** Vier WT Produktion, fünf WT Freigabe und zwei WT Puffer sind elf WT; von einem Donnerstag der W3 aus reicht das nicht vor den nächsten Block. W2 ist darum der späteste Drehtag, an dem der Makler eine volle Woche zur Freigabe hat. Der Themenvorrat steht dann fest, weil der Plan in W1 entsteht und Stoff bis Dienstag der W2 kommt (Ableitung). Weil jeder Drehtag am selben Wochentag des Blocks liegt, wird er für den Makler zur Gewohnheit wie sein fester Termin (Schritt 2, `cue`).

**Anschluss an Schritt 16.** Block 1 ist `start30` aus Schritt 13, veröffentlicht nach `rollout.folge`. Der erste Plan dieses Schritts ist Block 2. Sein Drehtag liegt in W2 von Block 1, also noch während der vier Wochen aus Schritt 16. Der Rückblick nach 30 Tagen bleibt, wie Schritt 16 ihn terminiert (`rollout.folge.rueckblick`); die Ansicht dafür baut `hmWirkung` aus diesem Schritt, damit es nur eine Berichtslogik gibt (Korrekturbedarf 5.5).

### 3.3 Der Monatsplan

`hmMonatsplan(mid, block)` rechnet ohne Claude, deterministisch, und liest nur `hmMarkeLesen(mid, "oeffentlich")` (Schritt 16, 3.3.3). Er ist die Fortsetzung des Planers aus Schritt 13 (`hmFeedPlan`) für jeden weiteren Block, mit derselben Suche und denselben harten Regeln, erweitert um Betrieb.

**Eingabe.**

| Stoff | Woher |
|---|---|
| Stand der Folge: letzte `folgeNr`, Platz im Takt (`((folgeNr − 1) mod 12) + 1`), letzte Folgenummer je Serie, zuletzt erzählte Belege je Staffel | `beitrag[]` (veröffentlicht), beim ersten Plan `quelle.inhalt.feed.start30` und `feed.kacheln` |
| Serien mit Rhythmus, Format, Hook-Formel, Variable, Bildaufbau, Themenvorrat, Reservefolge, Anlass | `quelle.inhalt.social.serien`, `serieSignatur` |
| Grammatik, Formatmix, Säulen mit Anteilen, Codes, Kanalplan | `quelle.inhalt.social` |
| Belege mit Prüfstatus und Sperren | `quelle.inhalt.plattform.beweise`, `quelle.gesperrt` und Einträge "Unterlage geprüft" in `freigabe.historie` |
| Stoff aus dem Betrieb: neue Fälle, Antworten auf Stoff-Fragen, Marktquellen, je mit Prüfstatus | Arbeitsstand `betrieb.stoff` (3.11), nie die Quelle |
| neue Objekte mit Status, Energiekennzahlen, Bildrechten | laufender Bestand-Import (`bestand[mid].objekte`, Felder aus Schritt 1 D2) |
| Einwilligungen | `auftrag.einwilligungen` (Objektfotos zeigen, Porträts) |
| Kontingent des Abos je Kalendermonat | Stammdaten des Maklers (`wb-store.jsx` Zeile 66 bis 68, `HM_ABOS` in `wb-more.jsx` Zeile 11) |
| Feiertage und Pausen | `HM_FEIERTAGE` (`wb-shop2.jsx` Zeile 24), `betrieb.pausen` |

**Harte Regeln** (eine Belegung, die eine davon bricht, wird verworfen):

| Nr. | Regel | Herkunft |
|---|---|---|
| M1 | Jeder Platz gehört zu einer Serie aus der Quelle. Eine Sonderfolge (freie Gestaltung) höchstens einmal je Block, nur mit Säule, Grund und Abnahme durch CD oder Art Director. | Vertrag ("keine allgemeinen Vorlagen"), R4 Kapitel 4 Punkt 7 |
| M2 | Der Hook folgt der `hookFormel` der Serie. Jeder Platzhalter ist aufgelöst aus einem Feld mit Pfad oder bleibt als Lücke mit Arbeitsauftrag stehen. Aufgelöst höchstens zehn Wörter, im Bild höchstens acht. | Schritt 12, 3.4 |
| M3 | Grammatik wie Schritt 12 und 13 (H4 bis H8): acht Gesichter je zwölf, in jedem Fenster aus drei eines bis zwei, Gegenton nur auf den Phasenplätzen, Textführung nur auf dem Sachplatz und nie i plus minus 1 oder 3, keine zwei gleichen Formate hintereinander außer Reels verschiedener Serien, in jedem Fenster ein Beleg. Geprüft wird die Fortsetzung über die Blockgrenze: die letzten fünf veröffentlichten Beiträge gehören zur Prüfung dazu. | Schritt 12, 3.7; Schritt 13, 3.3 |
| M4 | Signatur-Serie an jedem Sendetag aus ihrem Rhythmus; Pflichtsäule "Wie ich arbeite" mindestens 15 Prozent je Block; jede Säule innerhalb eines Beitrags ihres Anteils je Block. | Schritt 12, 3.3 und 3.5 |
| M5 | Ein Beleg oder Stoff-Eintrag wird je Staffel nur in einer Serie erzählt. Eine Zahl erscheint öffentlich nur mit Prüfstatus "Unterlage geprüft" (aus der Quelle oder aus `betrieb.stoff`) oder als Marktwert mit Quelle, Stand und URL; ein Pfad aus `quelle.gesperrt` oder ein Stoff-Eintrag mit Status "gesperrt" sperrt den Platz. Werte aus Grundbuch-Terminen des Maklers sind bis zur Klärung aus 9.9 gesperrt, auch anonymisiert. | Schritt 12, 3.4; Schritt 16, P12; Attribut "Genau" im Vertrag (07, 3.x) |
| M6 | Kein Thema zweimal in einem Fenster von sechs Beiträgen (Setzung), gemessen über `hmProdAehnlich` und die Variable. | Ableitung: Wiederholung im Takt soll aus der Form kommen, nicht aus dem Inhalt |
| M7 | Objekt-Platz nur mit eigenem Objekt aus dem laufenden Import, mit Energiekennzahlen nach `objektRegel`, geklärten Bildrechten, Einwilligung "Objektfotos zeigen" und, bei Hinweis auf Diskretion, der Objekt-Freigabe aus 4. | Schritt 12, 3.13; Schritt 13, H11 und 4.2 |
| M8 | Kontingent je Kalendermonat nach Veröffentlichungsdatum: Reels zählen als Videos, Karussells, textgeführte Einzelbilder und Stories aus Vorlagen als Grafiken, Einzelbilder mit Foto als Fotos. Eine Überschreitung ist kein stiller Zusatz, sondern ein Befund, den die Regel mit einem Eingriff innerhalb des Abos löst (siehe unten). | `HM_ABOS`; Ableitung |
| M9 | Jede Klasse (Gesicht, Sache) hat für den Block eine gültige Reserve, die mit der Folge freigegeben wird. Ohne Reserve geht der Block nicht in die Freigabe-Ansicht, sondern als Blocker an das Team. Anforderungen an die Reserve siehe unten. | Schritt 12, 3.7 "Ausfall", geschärft von "je Serie" auf "je Klasse" (5.5) |
| M10 | Keine Lückenkachel öffentlich. Eine ruhende Anlass-Serie belegt keinen Platz; ihr Platz geht an eine Serie derselben Klasse. | Schritt 13, 3.4 |
| M11 | Pausen und Feiertage verschieben Tage, nie die Folge. Fällt ein Sendetag auf einen Tag ohne den Anlass der Signatur (Feiertag, Pause), rückt die Folge auf den nächsten Werktag und nennt den Grund. | Schritt 16, 3.10 |

**Weiche Ziele.** Serien an ihrem Rhythmustag; Folgen derselben Serie mindestens zwei Plätze auseinander; der stärkste freigegebene Beleg im ersten Fenster des Blocks; Plätze, deren Stoff noch fehlt, nach hinten, damit er Zeit hat; Staffelplakat am ersten Sendetag einer Staffel.

**Suche und Begründung.** Wie Schritt 13: Rücksetzsuche über die zwölf Plätze, Abbruch früh an M3. Findet sie keine gültige Belegung, nennt sie die Regel, die am häufigsten brach, und den kleinsten Eingriff ("Alteingesessen rückt von Platz 8 auf Platz 11"). Sie ändert nie eine Serie, eine Setzung oder einen Wert der Quelle. Jeder Platz trägt einen Satz, warum er dort steht (`monatsplan[].grund`).

**Befund aus Schritt 12, den der Planer schließt.** Der Wochentakt aus Schritt 12 hat im Dauerbetrieb je Block einen Gesichtsplatz ohne feste Serie: In der Probe-Folge trug Platz 2 den Piloten der Signatur, danach fehlt dort eine Serie (12, 3.15). Der Nachbar auf Platz 3 ist ein Karussell, also muss Platz 2 ein Reel einer anderen Serie als der Signatur oder ein Einzelbild mit Gesicht sein. Der Planer füllt ihn nach dem größten Abstand zum Säulen-Anteil unter den Serien mit erlaubtem Format; bei Gleichstand geht er an die Säule, die Kompetenz zeigt. Das ist eine Regel für den Betrieb, keine neue Serie. Der Hinweis an Schritt 12 steht in 5.5.

**Hook-Auflösung.** Die Hook-Formel hat Platzhalter in eckigen Klammern und Anrede-Platzhalter in geschweiften (12, 3.4). `hmHookAufloesen(serie, stoff)` setzt ein, was ein Feld liefert (Dauer aus `belegRef`, Ort aus dem Themenvorrat, Dokument aus der Variable, Anrede nur über `hmAnrede(mid, kanal)`), und markiert jeden Rest als Lücke mit Quelle, aus der er kommen wird ("Dauer: vom Drehtag"). Claude darf formulieren, aber nur innerhalb der festen Wörter der Formel und nur mit Werten, deren Pfad es angibt (Schema 8.3). Der heutige Skript-Check, der eine Zahl oder Frage im ersten Satz verlangt und Hooks aus dem Markenbuch durchfallen lässt (`hmSkriptCheck`, `wb-os-data.jsx` Zeile 188 bis 190, KETTE_IST 2.10), wird durch die Prüfung "folgt der Formel" ersetzt.

**Anlässe.** Ein datierter Anlass (Heizsaison, Zinsentscheid, Jahresende) ist Stoff, keine Idee. Er darf die Variable einer vorhandenen Serie füllen, wenn deren Variable das zulässt: Bei einer Serie mit Variable `dokument` kann der Winter den Energieausweis als Dokument nahelegen. Er darf nie einen Platz außerhalb einer Serie füllen, und er erscheint nie bei allen Maklern gleich, weil jede Serie ihre eigene Variable hat. `HM_ANLAESSE_Q4` bleibt als Stoffliste für das Team, nicht als Ideenquelle.

**`materialBedarf`.** Jeder Platz nennt, was noch fehlt, wer es liefert und bis wann: `{was, von: "makler" | "team" | "import" | "drehtag", frist, traegtFenster[]}`. `traegtFenster` sagt, welche Fenster des Rasters an diesem Stoff hängen, damit das Team weiß, was zuerst zählt. Frist ist der Dienstag in W2, zwei WT vor dem Drehtag (Setzung), bei Unterlagen der letzte Tag des Freigabefensters.

**Die Reserve.** Je Klasse eine Reserve, die jeden Platz ihrer Klasse ersetzen kann. Anforderungen, weil die Ausfallkachel sonst die generischste Kachel des Feeds wird:

| Nr. | Anforderung | Warum |
|---|---|---|
| R-1 | gehört zu einer Serie der Quelle und folgt deren Vorlage und Hook-Formel | M1, keine allgemeine Vorlage |
| R-2 | trägt mindestens eines: einen Ort aus `fotobrief.orte` oder `bild.motive`, ein wörtliches eigenes Wort des Maklers mit Herkunft, einen Beleg mit Prüfstatus "Unterlage geprüft" | Spezifität wie jede andere Kachel (Rubrik) |
| R-3 | zeitlos: kein Datum, kein Anlass, keine Zahl mit Stand; `gueltigBis` Ende der Staffel (Setzung), danach wird sie neu gebaut | sie kann Wochen später laufen |
| R-4 | Format, das an möglichst vielen Plätzen der Klasse die Nachbarregel hält: bevorzugt Einzelbild (V4 prüft am konkreten Platz) | ein Karussell als Reserve bricht neben jedem Karussell |
| R-5 | Reserve Gesicht bevorzugt als Einzelbild aus dem Kontaktbogen oder einem Standbild eines Drehtags, also ohne Drehminute; ein Reel nur, wenn es ins Zeitbudget passt | Makler-Zeit (B18) |
| R-6 | besteht V1 bis V15 wie jeder Beitrag, V11 mit derselben Schwelle | die Ausfallkachel ist öffentlich wie jede andere |
| R-7 | wird in der Freigabe der Folge mit freigegeben (3.7) | nichts erscheint ohne seine Freigabe |

Eine unbenutzte Reserve bleibt über Blöcke gültig, bis `gueltigBis`. Eine verbrauchte Reserve ersetzt das Team im nächsten Plan: als Standbild aus dem Kontaktbogen sofort, sonst am nächsten Drehtag; freigegeben wird sie mit der nächsten Folge. Bis dahin gilt für diese Klasse Stufe 2 der Ausfallreihenfolge.

**Ausfall eines einzelnen Beitrags.** Reihenfolge, wenn am Sendetag Inhalt fehlt oder eine Prüfung rot ist: (1) die freigegebene Reserve derselben Klasse, (2) Tausch mit einer freigegebenen Folge derselben Klasse aus dem nächsten Block, wenn der Prüfer danach grün ist, (3) Nachreichen innerhalb von sieben Tagen und Reparatur der Position über "Reorder grid", das Instagram seit 8. Juni 2026 allen anbietet (https://www.socialmediatoday.com/news/instagram-releases-profile-grid-rearranging/822304/); Schritt 12 erlaubt das Umordnen ausdrücklich nur zur Reparatur (12, 3.7). Greift keine Stufe, ruht ab der nächsten Sendewoche der Betrieb als ganze Pause (3.1), bis der Platz nachgereicht ist. Nie wird ein nicht freigegebener oder nicht geprüfter Beitrag veröffentlicht, um den Takt zu retten. Eine ausgelassene Sache würde drei Gesichter in ein Fenster bringen; deshalb gibt es kein stilles Auslassen.

**Keine Freigabe der Folge.** Reserven ersetzen einzelne Ausfälle, nicht eine fehlende Freigabe: Eine Sendewoche braucht zwei Gesichter und eine Sache, eine Reserve je Klasse deckt sie nie. Darum gilt: Eine Sendewoche beginnt nur, wenn alle drei Plätze freigegeben sind. Fehlt die Freigabe am Puffer-Ende, wird die erste Sendewoche des Blocks eine ganze Pause nach 3.1, und so jede weitere Woche, bis die Freigabe kommt; danach setzt die Folge am nächsten Platz fort, Block und Staffel verlängern sich, `hmUhr` rechnet neu. Die Reserven bleiben für Einzelausfälle. So bricht die Grammatik nie, und nichts erscheint ohne seine Freigabe. Jede so entstandene Pause steht in `betrieb.messung` und ist ein Gesprächsanlass für das Team, keine Mahnung an den Makler.

**Kontingent (M8).** Der Planer zählt je Kalendermonat, beim Planen, also vier Wochen vor dem Block. Liegt der Plan darüber, löst die Regel den Befund innerhalb des Abos, in dieser Reihenfolge: (1) Formatwechsel innerhalb derselben Serie auf ein Einzelbild mit Gesicht, wenn die Serie eine Vorlage `post` hat und die Grammatik danach grün ist; die Säule behält ihren Anteil; (2) sonst die Folge mit dem geringsten Säulenverlust in den nächsten Monat verschieben. Das Team bestätigt den Eingriff in W1 (`monatsplan.kontingent.entscheidung {weg, von, am}`). Der Makler wählt nicht: Er sieht in der Freigabe-Ansicht einen Satz, etwa "Im Februar erscheinen fünf Videos, so viele wie Ihr Abo enthält. Alteingesessen kommt diesmal als Bild." Ein zusätzliches Video gegen Bezahlung ist ein Kauf und gehört nie in die Freigabe der Folge. Es gibt ihn nur, wenn der Owner es für diesen Makler entscheidet (etwa auf Kosten von UNIO oder als eigene Bestellung über den Katalog, außerhalb dieses Schritts); dann steht die Entscheidung mit Name und Datum in `monatsplan.kontingent.entscheidung`, und V14 prüft genau diesen Eintrag. Einen Preis für ein zusätzliches Talking-Head-Video kennt `HM_KATALOG` heute nicht (Lücke, 9.2). Dass der Formatmix aus Schritt 12 fünf Reels je vier Wochen setzt, ein Kalendermonat mit fünf Sendetagen aber sechs Videos brauchen kann, ist ein struktureller Befund (5.5).

**Neue Objekte.** Der laufende Import prüft je neuem Objekt: Status in Vermarktung, Energiekennzahlen vollständig, Bildrechte, Einwilligung. Sind alle da, wird eine ruhende Anlass-Serie (etwa "Warum jetzt" bei Markus) für den nächsten Block aktiv, und der Planer setzt das Objekt auf einen Sachplatz. Fehlt nur die Freigabe des Einzelfalls, geht Frage F17-3 (Kapitel 4) an den Makler, bei "Zeigen" und einer Serie, die den Grund der Eigentümer erzählt, am Folgetag F17-3b. Neue Objekte ändern die Quelle nie; sie füllen Plätze (Schritt 1, 5; Schritt 16, 3.6).

### 3.4 Drehtage

`hmDrehtagPlan(mid, block)` erzeugt aus dem Plan des nächsten Blocks den Drehtag. Er ersetzt die heutigen Drehplan-Einträge mit festen Weg-Hooks (Seed in `wb-more.jsx` Zeile 55 bis 60: "Warum das erste Angebot selten das beste ist.") und schreibt in die vorhandene Sammlung `drehtage`.

**Inhalt je Clip.** Platz im Block, Serie und Folge, Ort aus `fotobrief.orte`, Titelbild nach Vorlage (Titel in der sicheren Zone x 65 bis 1015, y 269 bis 1248), Bildaufbau der Serie, gesprochene Sätze nach `serien[].ablauf`, Dauer, B-Roll. Dazu Standbilder für Karussell-Titel mit Gesicht und eine Reserve je Klasse.

**Fragenliste.** Jede Frage kommt aus einem Schritt im Ablauf der Serie, dem Titel im Themenvorrat oder dem Beleg des Platzes. Sie ist eine Arbeitsanweisung für das Gespräch vor der Kamera, kein Formular: "Erzählen Sie den Fall der Erbengemeinschaft in drei Sätzen. Dann die Rechnung mit Stand." Allgemeine Fragen ohne Serie gibt es nicht. Das folgt dem Glennda-Baker-Prinzip, das R5 empfiehlt: Das Team fragt, der Makler antwortet im Gespräch, gedreht wird gebündelt (R5 Kapitel 4, Punkt 8).

**Stoff-Fragen im Termin.** Am Ende des Drehtags stellt das Team höchstens zwei Fragen, deren Antwort den Themenvorrat des übernächsten Blocks füllt (F17-2 in Kapitel 4). Sie werden aufgezeichnet, wenn die Einwilligung dafür besteht, und als Eintrag in `betrieb.stoff` mit Prüfstatus "Selbstauskunft" übernommen (3.11). Das spart dem Makler eine Nachricht und eine zweite Sitzung. Was der nächste Block selbst noch braucht, ist dafür zu spät; das erbittet das Team in W1 als Nachricht (3.2).

**Dauer.** 15 Minuten je Reel-Folge, 5 Minuten je Standbild-Motiv, 10 Minuten Ankommen und Licht, 10 Minuten je Ortswechsel, höchstens 10 Minuten Stoff-Fragen (Setzungen; Reel-Folge aus Schritt 12, `maklerMinutenMonat`, der Rest hier neu, ersetzt durch Messung). **Zusage an den Makler: höchstens 120 Minuten je Drehtag, alles eingerechnet.** Der erste Entwurf nannte 110 Minuten ohne Ortswechsel; jede Marke mit einer Orts-Serie (bei Markus Alteingesessen) braucht aber je Drehtag einen Ortswechsel, darum ist die Setzung begründet auf 120 angehoben. Die Makler-Seite nennt die Summe vorher, aufgeteilt nach Ort. Übersteigt der Plan 120 Minuten oder das Monatsbudget aus `antworten.zeit` (über `serieSignatur.tragfaehigkeit`), feuert B18 beim Planen, und die Regel schlägt Eingriffe in dieser Reihenfolge vor: (1) Reserve Gesicht aus dem Kontaktbogen statt vom Drehtag (R-5), (2) der freie Gesichtsplatz als Standbild statt als Reel, wenn die Serie eine Vorlage `post` hat, (3) zwei Folgen am selben Ort als ein Gang, (4) eine Folge in den nächsten Block. Nie wird die Ankündigung an den Plan angepasst, immer der Plan an die Ankündigung.

**Ort.** Der Drehtag liegt, wo die Serien spielen: Büro, Grätzl, Objekt. Liegen mehrere Makler in derselben Region innerhalb von zehn Tagen, schlägt die vorhandene Regel "Sammel-Drehtag" (`HM_REGELN`, `wb-more.jsx` Zeile 28) einen gemeinsamen Tag vor; das spart Teamzeit, nicht Makler-Zeit.

**Handwerk über zwölf Drehtage: das Rezept.** Zwölf Drehtage im Jahr, bei wechselndem Licht und manchmal wechselndem Team, sind die größte Gefahr für einen Feed, der wie ein Satz von Bildern mit einem Licht wirken soll (R6 R11). Eine Prüfung nach Augenmaß am Ende reicht dafür nicht. Darum hat jeder Makler ein Rezept `betrieb.rezept`, abgeleitet aus der Quelle und am ersten Drehtag vom Art Director abgenommen. Es ist eine Drehtag-Vorgabe, keine neue Markenregel: Jeder Wert muss innerhalb von `bild.regeln` liegen, `hmRezeptPruefen` vergleicht das.

| Teil | Inhalt | Herkunft |
|---|---|---|
| Licht-Setup je Ort | Lichtquelle und Richtung (bei Markus Tageslicht von rechts, aus der Blickrichtung), Abstand der Person zum Fenster in Metern, Kamerastandpunkt und Höhe, Aufhellung (bei Markus nur Reflektor), was nie (Deckenlicht, Blitz direkt); ein Grundriss-Foto des Aufbaus je Ort | `bild.regeln.licht`, `abstand`, `fotobrief.orte`; Maße gemessen am ersten Drehtag |
| Tageszeitfenster je Jahreszeit | "Vormittag" aus `bild.regeln.licht.mass.tageszeit`, übersetzt in Uhrzeiten je Jahreszeit, etwa Winter 10 bis 12 Uhr, Frühling und Herbst 9 bis 11.30 Uhr, Sommer 8.30 bis 10.30 Uhr (Setzungen, am Ort geprüft); Außenmotive nur im Fenster, bei bedecktem Himmel bevorzugt | `bild.regeln.licht`, `fotobrief.lichtUndTageszeit` |
| Kamera | Brennweite aus `bild.regeln.abstand` (50 bis 85 mm Kleinbild), Weißabgleich fest in Kelvin je Ort statt Automatik, Belichtung manuell, dasselbe Bildprofil an jedem Drehtag | `bild.regeln.abstand`, `farbbehandlung.weissabgleich` |
| Grading als Token | `rezept.grading {lut, sha256, weissabgleichK, saettigung, tiefenAuf}`; die LUT setzt `bild.regeln.farbbehandlung` um (bei Markus Sättigung minus 0,1, Tiefen auf `system.farbe.text`) und wird wie ein Token versioniert; jede Datei eines Drehtags läuft durch genau diese LUT | `bild.regeln.farbbehandlung`, `system.farbe` |
| Referenzbild | das zuletzt veröffentlichte, vom Art Director bestätigte Bild je Ort und Aufbau, mit Messwerten; steht auf jeder Clip-Liste neben dem Aufbau | `beitrag[]`, Drehtag davor |
| Graukarte | zu Beginn jedes Aufbaus ein Bild mit Graukarte im Licht der Person | Messgrundlage für V15 |

Reicht das Tageslicht im Winter im Fenster nicht, verschiebt sich zuerst das Fenster innerhalb von "Vormittag", dann der Ort (Fensterplatz statt Raummitte). Erst wenn beides nicht reicht, wäre eine Dauerlicht-Ergänzung aus der Blickrichtung nötig; das ändert `bild.regeln.licht` ("Aufhellung nur mit Reflektor") und ist darum ein Änderungsantrag (3.11), den der CD abzeichnet, nie eine Entscheidung am Set. Gemessen wird jedes Bild mit V15 (3.6). Das Rezept ändert sich nur mit Ereignis und neuer `rezept.version`; ein neues Referenzbild setzt nur der Art Director.

### 3.5 Beiträge herstellen

Jeder Beitrag entsteht aus genau einem Platz des freigegebenen Plans und genau einer Vorlage der Serie:

1. **Vorlage laden** aus `quelle.inhalt.social.vorlagen`. Nur die offenen Felder werden befüllt (Stufe `stil`, `rahmen`, `variante`); `fest` ist nicht erreichbar, wie bei Figma Buzz, wo gesperrte Objekte beim Befüllen nicht erreichbar sind (https://help.figma.com/hc/en-us/articles/31271824185623-Bulk-create-assets-in-Figma-Buzz). Die Variante wählt die Grammatik, nicht ein Mensch (12, 3.8).
2. **Bild** nur aus `bild.kontaktbogen` oder dem Drehtag, Durchgang 2, gegradet mit `rezept.grading`, geprüft gegen `bild.regeln` (Licht, Abstand, Ausschnitt, Linie) und gemessen gegen Rezept und Referenzbild (V15). Nie Stock, nie Bildwelt, nie ein Eintrag mit `ki` wahr (11, `bild.bildweltAuftrag`).
3. **Rendern** mit den Welt-Renderern und den Tokens der Quelle, die schon Umbruch, Kontrast und Tabellenziffern rechnen (KETTE_IST Kapitel 8). Reel-Titelbild, Untertitel und Endkarte aus denselben Tokens; heute folgt der Reel-Renderer Akzent und Schrift aus dem Branding (KETTE_IST 2.10).
4. **Caption** nach dem Aufbau aus Schritt 13 (13, 3.5): Hook, zwei bis vier Sätze Einlösung, Beleg wörtlich mit `belegRef`, ein Satz zum Weitergeben an eine bestimmte Person. Anrede nur über `hmAnrede(mid, kanal)`, je Kanal eine Fassung. Die Caption-Formel `hmCaption` bleibt nur für v1.
5. **Prüfen** nach 3.6. Erst ein vollständig grüner Stand geht in die Freigabe-Ansicht.

**Kanäle.** Ein Beitrag hat eine Fassung je Kanal aus `kanalplan[].serien`. LinkedIn und Facebook haben kein Raster; dort gelten Anrede, Sprachprüfung, Objekt-Regel und Codes, nicht die Grammatik (12, 3.11).

**Stories.** Stories aus der Vorlage `story` zählen nicht zu den Anteilen und nicht zur Grammatik (12, 3.3). Sie dürfen roher sein, solange Anrede, Sprachprüfung und Einwilligungen gelten.

### 3.6 Prüfungen vor jeder Veröffentlichung

`hmVeroeffentlichungPruefen(mid, beitrag)` läuft zweimal: beim Übergang in die Freigabe-Ansicht und unmittelbar vor dem Veröffentlichen, weil sich zwischen beiden Zeitpunkten Belege, Quelle oder Raster ändern können.

| Nr. | Prüfung (Vertragsfeld) | Bedingung | Folge bei rot |
|---|---|---|---|
| V1 | `sprache` | Klischee-Liste und Form aus `quelle.inhalt.social.sprachpruefung` (Klischees aus MARKE_SCHEMA, Just Sold, Just Listed, "Objekt" im Fließtext, keine Gedankenstriche, Ausrufezeichen, Emojis, kein Satz über 20 Wörter), dazu `stimme.vermeiden` und `markenvertrag.falschWaere` | Sperre, Text zurück an die Redaktion |
| V2 | `anrede` | jede Fassung nur mit der Form aus `hmAnrede(mid, kanal)`, keine gemischten Formen (`hmPfDuFormen`, `hmPfSieFormen`) | Sperre |
| V3 | `codes` | mindestens zwei Codes aus `idee.codes` durch Bau sichtbar, Gesicht zählt nur, wenn erkannt; Farbe zählt nie | Sperre, Vorlage oder Bild ändern, nie die Prüfung |
| V4 | `grammatik` | tatsächlich veröffentlichte Folge plus dieser Beitrag, alle Fenster, Nachbarn i plus minus 1 und 3, Verschiebung 0, 1, 2 (Funktion `hmSocialFolgePruefen` aus Schritt 12) | Sperre, Reserve oder Tausch nach 3.3 |
| V5 | `energiekennzahl` | bei Objekt: HWB, Endenergiebedarf, Klasse A bis G oder bei alter Form HWB und fGEE, in der Energiezeile (Stufe `fest`) und in der ersten Caption-Zeile nach dem Hook; Preis und Fläche in der Caption (`objektRegel`) | Sperre mit "Energieausweis anfordern" |
| V6 | `gesicht` | Gesichtsklasse des Platzes erfüllt: Gesicht erkannt und in der sicheren Zone, Kopfhöhe nach `bild.regeln` | Sperre |
| V7 | Quelle gültig | `hmQuellePruefen` (Prüfsumme und Blob-Hashes, Schritt 16, 3.3.2) | alle öffentlichen Ausgaben gesperrt |
| V8 | Belege | jede Zahl im Bild, auf einer Seite oder in der Caption mit `belegRef` auf `quelle.inhalt.plattform.beweise` oder `betrieb.stoff`; Prüfstatus "Unterlage geprüft" oder, bei Marktwerten, Quelle mit Stand und URL; nicht in `quelle.gesperrt`, kein Stoff mit Status "gesperrt" (darunter Grundbuch-Werte bis zur Klärung aus 9.9), `oeffentlich` ja | Sperre des Beitrags, nicht des Blocks |
| V9 | Lesbarkeit | Text in der Kachel mindestens 92 px auf 1080, im offenen Beitrag 30 px, Fließtext 47 px, Kontrast 4,5:1 oder 3:1 für großen Text (R6 Regel R8, https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html); keine Kürzung | Sperre |
| V10 | Plattform | kein Wasserzeichen, kein Rahmen, Ton an, keine Textwand im Reel; Instagram drosselt solche Reels (https://about.instagram.com/blog/announcements/instagram-ranking-explained) | Sperre |
| V11 | Kohorte Text | Hook, Titel und Caption gegen die Quellen und die Captions der letzten drei Monate aller anderen UNIO-Makler, Jaccard auf Wort-Trigrammen, Schwelle 5 Prozent (MARKENQUALITAET Kapitel 2), über `hmKohorteText` aus Schritt 14 | Hinweis an die Redaktion ab 5 Prozent, Sperre ab 15 Prozent (Setzung) |
| V12 | Einwilligung und Daten Dritter | Objektfotos, Porträts, Gäste nur mit Einwilligung; keine Namen, Adressen mit Hausnummer, Einlagezahlen oder erkennbaren Erben (Attribut "Diskret") | Sperre |
| V13 | Freigabe | `freigabe.makler` vorhanden; bei freier Gestaltung zusätzlich `freigabe.team` | Sperre |
| V14 | Kontingent | Monat nach Veröffentlichungsdatum innerhalb des Abos, oder `monatsplan.kontingent.entscheidung` mit Weg "zusatz", `von` gleich Owner und Datum | Sperre |
| V15 | Rezept | je Bild gegen `betrieb.rezept` und das Referenzbild desselben Orts und Aufbaus: Graukarte des Aufbaus höchstens Delta E 2000 von 3 zum Referenzwert; Lichtrichtung stimmt (Blickseite der Gesichtsfläche heller, Verhältnis der mittleren Helligkeit beider Gesichtshälften im Band des Referenzbilds plus minus 15 Prozent); Median der Helligkeit und fünftes Perzentil (Tiefen) je plus minus 8 Prozent zum Referenzbild; mittlere Sättigung plus minus 10 Prozent; LUT-Hash gleich `rezept.grading.sha256` (alle Schwellen Setzungen, gemessen im Browser über Canvas-Pixel) | Hinweis an den Art Director; Sperre, wenn zwei Werte außerhalb liegen oder der LUT-Hash abweicht |

Die sechs Vertragsfelder V1 bis V6 stehen in `beitrag.pruefung`; V7 bis V15 in `beitrag.pruefung.weitere`. Jede Prüfung trägt `{ok, detail, stand}`. Ein Beitrag, der am Veröffentlichungstag rot wird, geht nicht online; die Regel nimmt die Reserve nach 3.3 und schreibt ein Ereignis.

### 3.7 Freigabe

**Wer freigibt.** Beiträge aus gesperrten Vorlagen gibt der Makler frei; seine Freigabe genügt, weil Form und Grammatik geprüft sind und nur Inhalt und Aussage bei ihm liegen. Frei gestaltete Beiträge (Sonderfolge, Kooperation, eine Vorlage außerhalb der Quelle) nimmt vorher der Art Director ab, bei einer Abweichung von den Codes der Creative Director; danach gibt sie der Makler in derselben Folge frei. Das folgt R4 Ü11 und Canva Brand Controls, die eine Freigabe vor dem Veröffentlichen verlangen können (https://www.canva.com/help/brand-control/). Der Vertrag nennt für freie Gestaltung nur das Team. Hier geben Team und Makler frei, weil auch ein frei gestalteter Beitrag seinen Namen und seine Aussage trägt und Schritt 16 jede Veröffentlichung an seine Freigabe bindet (Abweichung, 5.5).

**Die Freigabe der Folge.** Einmal je Block, in einer Sitzung, am Telefon zuerst. Aufbau (Überschrift zuerst, keine Zeile darüber, keine Eyebrows):

1. Überschrift "Ihr nächster Monat" und darunter eine Zeile mit Zeitraum und Dauer ("12. Jänner bis 6. Februar. Etwa zehn Minuten.").
2. Sein Profil nach Woche 1 bis 4 des Blocks, Wochenregler wie im Reveal (13, 3.11), darunter die letzten veröffentlichten Beiträge, so wie das Raster wirklich aussehen wird. Tippen öffnet Beitrag und Caption je Kanal.
3. "Was darin von Ihnen kommt": je Beitrag, welcher Satz, Fall oder Ort aus seinem Drehtag oder seinen Antworten stammt, gekennzeichnet wie im Wort-Link ("aus Ihrem Drehtag am 3. Dezember").
4. "Falls etwas ausfällt": die zwei Reserven, je Klasse eine, als Kacheln in derselben Größe wie das Profil, mit einem Satz, wofür sie da sind, und bis wann sie gelten. Sie werden mit der Folge freigegeben.
5. "Was noch fehlt": jeder Platz mit offenem `materialBedarf` in einem Satz, mit dem, was an seine Stelle tritt, wenn es nicht kommt ("Kommt der zweite Fall nicht bis 17. Dezember, läuft am 6. Februar die Reserve.").
6. Kontingent, nur wenn ein Eingriff nötig war, als ein Satz ohne Wahl (3.3).
7. Die Handlung: [Folge freigeben] und darunter "Eine Stelle anmerken". Anmerken setzt einen Pin auf einen Beitrag mit Art Beobachtung, Frage oder Änderung, wie in der Rückmeldung aus Schritt 15. Eine Frage wird beantwortet, eine Änderung am Text wird umgesetzt, beides ohne neue Sitzung. Eine Änderung an Form, Serie oder Code ist keine Anmerkung, sondern ein Änderungsantrag (3.11) und wird so benannt.
8. Nächster Drehtag mit Datum und zwei Terminen zur Wahl, einer empfohlen (F17-4). Das ist die einzige Wahl dieser Sitzung.

**Keine Frist-Freigabe.** Der Nachfass-Takt erinnert am ersten, dritten und fünften WT des Fensters (Setzung), am vierten ruft das Team an. Kommt bis zum Ende des Puffers keine Freigabe, ruht die erste Sendewoche des Blocks als ganze Pause nach 3.3 ("Keine Freigabe der Folge"), die Reserven bleiben für Einzelausfälle. Die Seite zeigt diese Regel in einem Satz: "Ohne Ihre Freigabe erscheint nichts Neues. Die Woche ruht dann, und Ihre Sendung setzt danach mit der nächsten Folge fort."

**Kleinigkeiten.** Tippfehler und falsche Straßennamen sind Tatsachenkorrekturen des Teams; sie brauchen keine neue Freigabe, werden aber im Beitrag als Korrektur protokolliert. Das übernimmt das heutige "Passt, mit Kleinigkeit" (`wb-content.jsx` Zeile 324) ohne die Zählung von Änderungswünschen je Beitrag.

### 3.8 Veröffentlichen und Messen verbinden

Veröffentlicht wird über den Partnerzugang, den der Makler in der Einrichtung für `HM_UNIO_SOCIAL_MAIL` in der Meta Business Suite anlegt (`wb-einrichtung.jsx` Zeile 138 bis 140), und über den vorhandenen Export nach Metricool (`hmMetricoolCsv`, `wb-produktion.jsx` Zeile 584), also mit Konten von UNIO und ohne Passwort des Maklers (CLAUDE.md, Sicherheit). Nach dem Veröffentlichen trägt das Team den Permalink in `beitrag.veroeffentlicht.permalink` ein, oder der Insights-Import ordnet ihn zu. Damit entfällt die heutige Zuordnung über Datum und Titelähnlichkeit (`hmProdPasst`, Zeile 688), die bei zwei Beiträgen am selben Tag falsch zuordnen kann.

### 3.9 Wirkung

**Quellen.**

| Größe | Quelle | Stand |
|---|---|---|
| Reichweite, Aufrufe, Saves, Weiterleitungen ("Geteilte Inhalte"), Kommentare, Follows je Beitrag | Export der Meta Business Suite über `hmInsightsLesen` (Spalten `HM_INSIGHTS_SPALTEN`, `wb-produktion.jsx` Zeile 620 bis 635) | wöchentlich, je Beitrag der Stand nach sieben Tagen als Messwert (Setzung; wann ein Beitrag seine Werte sammelt, ist nicht belegt, Lücke) |
| Anfragen | neue Kontakte aus dem laufenden Bestand-Import mit Anlage-Datum, Anlass, Bezirk, Weg (etwa Notariat) und optional Bezug auf einen Beitrag | wöchentlich; gespeichert werden nur Zählungen, nie Namen oder Kontaktdaten |
| Erfolgsmaß | `quelle.inhalt.plattform.markenvertrag.erfolgsmass {merkmal, messung, ausgangswert}` (Schritt 7, 5.x) | eingefroren |

Die heutige Messung in Schritt 7 nennt für Markus "Lead-Radar und Anlass in der Kontakt-Bemerkung". Das Lead-Radar ist die Akquise von Maklern durch UNIO (`wb-betrieb.jsx` Zeile 1), nicht die Anfragen des Maklers. Richtig ist der Kontakte-Import (Korrekturbedarf 5.5).

**Zuordnung von Anfragen.** Eine Anfrage gehört zu einer Serie nur, wenn der Kontakt einen Beitrag nennt; dieses Feld pflegt der Makler oder seine Assistenz im eigenen System als Bemerkung, der Import liest es. Ohne Bezug zählt die Anfrage zur Marke insgesamt. Mehr Zuordnung wäre Scheingenauigkeit (Ableitung). Wie oft Anfragende einen Beitrag nennen, ist unbekannt (Lücke).

**Die Aufgabe je Säule.** Jede Serie wird an ihrer eigenen Aufgabe gemessen, nicht an der Reichweite aller:

| Säule | Aufgabe | Kennzahl | Warum |
|---|---|---|---|
| Signatur (bei Markus `meinung`) | wird weitergegeben | Weiterleitungen je 1.000 Erreichte | Weiterleitungen zählen laut Sekundärquellen am stärksten für Nicht-Follower (R6 1.2); jede Signatur-Folge endet mit einem Satz zum Weitergeben |
| `wissen` (Pflicht) | wird aufgehoben und führt zu Gesprächen | Saves je 1.000 Erreichte, Anfragen mit Bezug | Karussells erzielen die meisten Saves (https://www.socialinsider.io/social-media-benchmarks/instagram-engagement-report) |
| `beweise` | bestätigt die Empfehlung | Profilwirkung ist im Export nicht enthalten (Lücke); gemessen werden Saves und Anfragen mit Bezug | die Marke wirkt als Bestätigung einer Empfehlung (R7 2.9, USA) |
| `markt` | wird aufgehoben und weitergegeben | Saves und Weiterleitungen je 1.000 Erreichte | Nutzen ins Karussell (R6 Prinzip 5) |
| `persoenlich` | macht ihn nahbar | Kommentare je 1.000 Erreichte | Reels holen die meisten Kommentare (Socialinsider, oben) |

Weil jede Serie an ihrer eigenen Aufgabe gemessen wird, kann "Wie ich arbeite" nie deshalb schlecht aussehen, weil eine persönliche Folge mehr Reichweite hatte. Das beantwortet Leitfrage 3 durch Bau.

**Was die Wirkungs-Prognose ersetzt.** `hmViralScore` (Hook 22 Punkte, Säule Persönlich oder Markt 16 statt 12, `wb-os-data.jsx` Zeile 199 bis 208) entfällt für v2. Vor zwölf Wochen gibt es keine Prognose, weil es keine eigenen Daten gibt und die Quellen keine Makler-Werte enthalten (R6 1.2). Stattdessen zeigt jeder Beitrag vor der Freigabe seine Prüfungen (3.6) und seine Rolle im Plan ("Signatur, Sendetag, trägt das Fenster 13 bis 15 mit dem Fall"). Nach zwölf Wochen zeigt er je Serie das eigene Band (Median und Spanne der Kennzahl seiner Aufgabe) als Erwartung, nie als Punktzahl.

**Nach 30 Tagen** (`wirkung.stand30`). Termin aus Schritt 16 (`rollout.folge.rueckblick`). Gezeigt werden: was erschienen ist gegen `start30`, je Beitrag die Werte ohne Bewertung, die Anfragen des Zeitraums als Zahl, der Stand der Unterlagen. Keine Aussage "gut" oder "schlecht", weil zwölf Beiträge nichts entscheiden (Schritt 16, 3.10).

**Nach zwölf Sendewochen** (`wirkung.bewertung`). Stichtag ist der letzte Beitrag der Staffel plus sieben Tage. Der Rückblick liegt am ersten Drehtag nach dem Stichtag, also am Donnerstag der W2 im ersten Block der neuen Staffel, damit der Makler keinen eigenen Termin braucht. **Zeitlicher Anschluss, ehrlich gerechnet:** Der Plan für den zweiten Block der neuen Staffel entsteht in W1 des ersten Blocks, also vor dem Stichtag oder wenige Tage danach, und der Drehtag am Tag des Rückblicks dreht bereits nach diesem freigegebenen Plan. Eine Änderung aus dem Rückblick gilt darum frühestens für den dritten Block der neuen Staffel, den ersten, dessen Plan nach der Bestätigung entsteht (bei Markus Block 6 ab 04.05.2027, 3.16). Die Alternative, den Plan des zweiten Blocks nach dem Rückblick neu zu rechnen, würde einen schon gedrehten Block verwerfen oder den Drehtag nach hinten schieben und die Uhr aus 3.2 brechen; ein Block Verzug ist der kleinere Preis (Ableitung).

1. **Erfolgsmaß.** Zählung des Merkmals im Zeitraum, verglichen mit `ausgangswert`. Fehlt der Ausgangswert, lautet das Urteil "erster Messwert", und die Zahl wird Ausgangswert der nächsten Staffel. Kann der Import den Ausgangswert aus den zwölf Monaten vor dem Live-Tag rechnen, tut er das mit `n`, Zeitraum und Quelle (Schritt 1, D5). Urteile: "auf Kurs", "noch nicht entscheidbar", "nicht auf Kurs", je mit einem Satz Grund.
2. **Je Serie und Format** der Median der Aufgabe-Kennzahl, Spanne, Zahl der Beiträge, Anfragen mit Bezug, Reichweite im Median.
3. **Formatmix.** Die Regel `hmFormatmixNeu` ersetzt den Richtwert nur, wenn (a) jedes Format mindestens sechs Beiträge im Zeitraum hat, (b) die Kennzahl je Format in beiden Hälften des Zeitraums dieselbe Rangfolge zeigt, (c) der Abstand der Mediane mindestens 25 Prozent beträgt (alle drei Setzungen). Dann wechselt höchstens ein Platz je zwölf, und nur innerhalb der Nebenbedingungen: `formate` "nie" bleibt null, Kontingent, Signatur an jedem Sendetag, Pflichtsäule mindestens 15 Prozent, Kompetenz vor Persönlichem, Grammatik gültig. Sonst bleibt der Richtwert mit dem Vermerk "bestätigt, Daten reichen nicht für eine Änderung".
4. **Gesichtsanteil.** Verglichen werden Beiträge mit und ohne Gesicht innerhalb desselben Formats, damit das Format nicht die Wirkung des Gesichts vortäuscht. Die Regel aus Schritt 13 (höchstens zwei Gesichter je Zeile) setzt eine Obergrenze von acht je zwölf, weil jedes Fenster aus drei höchstens zwei Gesichter tragen darf (Ableitung aus 12, 3.7). Eigene Zahlen können darum nur bestätigen oder auf sechs je zwölf senken (Periode 2); mehr als acht ginge nur, wenn Schritt 12 die Zeilenregel ändert. Das ist dann ein Befund für `lernen`, keine Einzelentscheidung.
5. **Keine Fremdvergleiche für ihn.** Die Mediane von Socialinsider (etwa 35 Saves je Reel, 37 je Karussell, https://www.socialinsider.io/social-media-benchmarks/instagram-engagement-report) werden ihm nicht als Maßstab gezeigt: Sie mischen Konten jeder Größe und keine Makler. Sein Maßstab ist sein Vertrag und seine eigene letzte Staffel.

Jede Änderung aus 3. und 4. wird ein Änderungsantrag mit kleiner Version (3.11), den er im Rückblick mit einem Klick bestätigt (F17-5). Die Ansicht nennt den Block, ab dem sie gilt, mit Datum.

**Im Report entfällt**, was keine Quelle hat: "das verdoppelt das Wachstum" (Zeile 720), "Ziel 70 %" beim Gesicht (Zeile 738), weil die Setzung jetzt acht von zwölf je Takt ist und von der Grammatik gehalten wird, und die Empfehlung aus `HM_REGELN` "Fotos mit Gesicht: plus 38 % Likes (Bakhshi et al.)" (`wb-more.jsx` Zeile 34), weil diese Studie nicht Teil der Recherche ist und nicht geprüft wurde.

### 3.10 Quartal

Jede Staffel beginnt mit `quartal`:

```js
quartal = {
  staffel: 2, beginn: "ISO", quelleVersion: "1.1",
  variable: {
    staffelthema: { wert, quelle },          // aus antworten.ausloeser oder dem Themenvorrat, 12, 3.5
    quartalston:  { tokenRef, quelle },      // einer von höchstens zwei vorbereiteten Tönen, 10, festUndVariabel
    motivthema:   { wert, quelle }           // Motivwahl im Rahmen von bild.motive.kann
  },
  codesUnveraendert: { ok: true, geprueft: [{ pfad, sha256Vorher, sha256Nachher }] }
};
```

**Was wechseln darf, und nur das.** Staffelthema, Quartalston aus den vorbereiteten Tönen der einen Palette (Stufe `variante`, keine zweite Palette) und Motivthema, dazu das Staffelplakat mit dem neuen Thema. Das ist die Ebene "variabel je Quartal" aus Schritt 10 (10, "Fest und variabel") und R2 3.13, nach dem Muster Pentagram und Public Theater: dieselbe Schrift über Jahrzehnte, je Saison ändert sich nur die Behandlung (https://www.pentagram.com/work/the-public-theater-2020-2021-season).

**Was bewiesen wird.** `hmQuartalPruefen` rechnet SHA-256 über die festen Teile der Quelle (Wortmarke, Zeichen, Schriftfamilien und Stufen, Crop-Regel, Grund- und Textfarbe, Platz von Folio und Zeichen, Porträtstil aus `bild.regeln`, Bildaufbau und Kennung der Signatur) vor und nach dem Wechsel. Ungleich heißt: Das ist kein Quartalswechsel, sondern ein Änderungsantrag mit großer Version. So wird Leitfrage 4 durch eine Regel entschieden, nicht durch Gefühl.

**Kein Versionssprung.** Ein Quartalswechsel wählt nur innerhalb dessen, was die Quelle schon erlaubt. Er ist deshalb keine neue Version, sondern ein Eintrag in `betrieb.quartal[]` und ein Ereignis in `freigabe.historie` mit Art "quartal". Der Makler sieht das Staffelthema im Rückblick und das neue Plakat in der Freigabe der Folge; eine eigene Wahl gibt es nicht, weil Staffelthemen aus seinen eigenen Anlässen kommen.

Der Vertrag nennt `quartal.variable` als "Serienakzent oder Motivthema". Hier sind es drei benannte Teile: Staffelthema (der Serienakzent), Quartalston und Motivthema. Das folgt Schritt 10 (`festUndVariabel`) und Schritt 12 (Staffeln mit Staffelthema); die Abweichung steht in 5.5.

**Das Staffelplakat.** Es ist das einzige Gestaltungsstück, das je Staffel neu entsteht, und darum am stärksten gefährdet, zur Neugestaltung zu werden. Es wird nicht neu gestaltet, sondern aus der Vorlage aus Schritt 12 gesetzt (`serieSignatur.staffel.plakatVorlage`, bei Markus Vorlage `v2`, Format `post` 1080 x 1350).

| Feld | Sperrstufe | wechselt je Staffel | Regel |
|---|---|---|---|
| Wortmarke, Zeichen (bei Markus das Zeitmaß), Raster, Ränder | `fest` | nein | Hash in `codesUnveraendert` |
| Serienname und Platz der Kennung | `fest` | nein | Name nur über große Version (3.11) |
| Sendetag in Worten | `fest` | nein | kommt aus `serien[].rhythmus`, ändert sich nur mit einer Version |
| Porträt | `rahmen` | ja: neues Bild vom Drehtag, Durchgang 2 | Crop, Augenlinie und Blick aus `bild.regeln.ausschnitt` gesperrt; V6 und V15 wie jede Kachel |
| Staffelthema | `stil` | ja | ein bis drei Wörter, höchstens 24 Zeichen (Setzung), in der Stufe aus `system.typo`, keine Kürzung, keine kleinere Stufe |
| Staffelnummer | `stil` | ja | "Staffel 2" als gesetzte Ziffer, Tabellenziffern wie das Folio |
| Quartalston | `variante` | ja | nur einer der vorbereiteten Töne aus `festUndVariabel`, nie ein neuer Wert |

**Stresstest je Staffel** (`hmPlakatStresstest`, vor der Freigabe-Ansicht): Render mit dem kürzesten und dem längsten Staffelthema aus dem Themenvorrat der Staffelthemen (bei Markus "Erbe" mit vier Zeichen gegen einen Test-String mit 24 Zeichen), dazu mit fehlendem Porträt. Bestanden heißt: Thema ohne Kürzung in höchstens zwei Zeilen, Mindestgröße 92 px auf 1080 (V9), Kontrast mit dem Quartalston mindestens 4,5:1 oder 3:1 bei großem Text, kein Feld überlappt die sichere Zone; ohne Porträt ist das Plakat nicht veröffentlichbar (keine Lückenkachel), und der Planer verschiebt den Staffelstart um eine Woche statt ein Plakat ohne Gesicht zu setzen. Ein Thema, das nicht besteht, geht zurück an das Team, nie wird die Vorlage angepasst.

**Abnahme** durch den Art Director (6.2): das neue Plakat neben den beiden letzten Plakaten. Eine Regel markiert vorher jedes Feld, das sich unterscheidet; erlaubt sind nur Porträt, Staffelthema, Staffelnummer und Quartalston.

### 3.11 Änderungsantrag

`aenderungsantrag[]` ist der einzige Weg, auf dem sich nach der Freigabe etwas an der Marke ändert. Er folgt der Versionsregel aus Schritt 16 (3.3.5) und schärft sie für den Betrieb:

| Art | Beispiel | Version | Wer | Makler |
|---|---|---|---|---|
| Füllung | neuer Clip, neues Objektfoto für einen definierten Platz | keine | Art Director prüft gegen `bild.regeln` | nichts |
| Stoff aus dem Betrieb | neuer Fall aus F17-2, Antwort auf eine Stoff-Frage, Marktwert mit Quelle | keine; Eintrag in `betrieb.stoff` mit Prüfstatus, die Quelle bleibt unverändert, Ereignis "stoff" | Team trägt ein | hat ihn erzählt |
| Unterlage | Kaufvertrag zu einem Beleg liegt vor | keine; zu einem Beleg der Quelle: Eintrag "Unterlage geprüft" in `freigabe.historie`, Sperre aus `quelle.gesperrt` fällt; zu einem Stoff-Eintrag: dessen Prüfstatus wird "Unterlage geprüft" | Team | nichts |
| Beleg-Nachtrag | ein geprüfter Stoff-Eintrag soll Beleg der Plattform werden, etwa für Website, Markenbuch oder Pressebaustein | klein; Stoff wird in `plattform.beweise` übernommen, `hmQuelleEinfrieren` | Team schlägt vor, CD zeichnet ab | bestätigt mit einem Klick |
| Stammdatum | neue Telefonnummer | keine; Checklistenpunkte Karte und Signatur öffnen sich wieder, Ereignis | Team | bestätigt die Nummer |
| Quartalswechsel | Staffelthema Anlage | keine; `quartal` mit Nachweis | Regeln, Team | nichts |
| Setzung durch Messwert ersetzt | Formatmix oder Gesichtsregel nach zwölf Wochen | klein (`1.1` auf `1.2`) | Regel schlägt vor, CD zeichnet ab | bestätigt mit einem Klick (F17-5) |
| Wert im Spielraum, Tatsachenkorrektur | Akzent feiner, falsche Zahl im Beleg | klein | Team, CD | bestätigt mit einem Klick |
| neue Serie oder neue Vorlage, Säulen-Anteile | eine zweite Persönlich-Serie | klein, wenn kein Code berührt ist | Art Director baut, CD zeichnet ab, Stresstest und Codes grün | bestätigt mit einem Klick |
| Code | Zeichen, Wortmarke, Schrift, Claim, Palette, Crop-Regel, Name oder Format der Signatur-Serie | groß (`2.0`) | volle Kette ab dem betroffenen Schritt, Gate 2, Freigabe 2 | Freigabe 2 wie in Schritt 16 |

**Die Kategorie "Setzung durch Messwert ersetzt"** fehlt in Schritt 16, der klein nur als Spielraum oder Tatsachenkorrektur beschreibt (Korrekturbedarf 5.5). Sie gehört zu klein, weil kein Code berührt ist. Dasselbe gilt für "Beleg-Nachtrag".

**Der Arbeitsstand `betrieb.stoff`.** Der Betrieb braucht jeden Monat neuen Stoff, den die eingefrorene Quelle nicht enthält: neue Fälle, Antworten auf Stoff-Fragen, Marktwerte. Schrieben wir ihn in `workshop.geschichte.belege` oder `plattform.beweise`, änderte sich die Quelle nach dem Einfrieren still, gegen B13 und Schritt 16. Darum liegt er außerhalb der Quelle:

```js
betrieb.stoff = [{
  id, art: "fall" | "antwort" | "marktwert",
  text,                                  // wörtlich, wie er ihn gesagt oder geschrieben hat
  herkunft: { quelle: "drehtag" | "nachricht", datum, drehtag: null, aufzeichnung: false },
  zahl: null, einheit: null, stand: null, url: null,   // Marktwert: Quelle mit Stand und URL Pflicht
  pruefstatus: "selbstauskunft" | "unterlage_geprueft" | "gesperrt",
  sperrgrund: null,                      // etwa "Grundbuch-Werte bis Klärung 9.9"
  oeffentlich: false, fuerSerie: null, verwendetIn: [],  // Beitrags-Ids, für M5
  uebernommenIn: null                    // Version, falls als Beleg-Nachtrag in die Quelle übernommen
}];
```

Planer (`hmMonatsplan`) und V8 lesen Belege aus `quelle.inhalt.plattform.beweise` und aus `betrieb.stoff`, mit denselben Regeln: Zahl öffentlich nur mit "Unterlage geprüft" oder als Marktwert mit Quelle, Stand und URL. Die Prüfsumme der Quelle bleibt gleich, solange nur Stoff dazukommt (Selbsttest 22). Soll ein Stoff dauerhaft zur Marke gehören, läuft er als Beleg-Nachtrag.

**Ablauf.** Antrag `{feld, grund, neueVersion}` mit Herkunft (Makler, Team, Regel, Lernen), Diff gegen die Quelle, Klassifikation nach der Tabelle durch `hmAenderungEinordnen`, bei klein Abzeichnung durch den CD und Bestätigung durch den Makler, danach `hmQuelleEinfrieren` aus Schritt 16 für die neue Version. Die alte Version wird `abgeloest` und bleibt lesbar. Danach öffnen sich die Punkte in `rollout.checkliste`, deren `quelleVersion` älter ist, und `uebergabe.paket` wird neu erzeugt, wenn seine Version älter ist; Dienstleister erkennen die alte Datei am Namen (Schritt 16, 3.3.5). Pläne, die schon gerechnet oder freigegeben sind, bleiben bei ihrer Version; eine kleine Version gilt ab dem ersten Block, dessen Plan nach dem Einfrieren entsteht. So ändert sich nie ein gedrehter oder freigegebener Beitrag nachträglich.

**Wünsche des Maklers.** Äußert er einen Wunsch, der einen Code berührt ("Ich möchte die Sendung doch Nach dem Grundbuch nennen."), antwortet das Team am Kriterium des Vertrags und nennt vorher, dass das eine große Version mit Freigabe 2 ist, mit Aufwand und Preis. Die Werkbank zeigt nie "kleine Änderung", wo eine große gemeint ist.

### 3.12 Kohorte

Doshi und Hauser zeigen, dass KI einzelne Ergebnisse hebt und viele einander ähnlicher macht (https://www.science.org/doi/10.1126/sciadv.adn5290). Im Betrieb entsteht jede Woche neuer Text, also muss die Prüfung mitlaufen, nicht nur einmal bei Gate 2.

| Takt | Was | Wie | Folge |
|---|---|---|---|
| je Beitrag | Text | V11 in 3.6, `hmKohorteText` aus Schritt 14 | Hinweis oder Sperre |
| je Block | Serienbezug | neue Folgentitel und Variablen gegen die Serien der anderen Makler im selben Bezirk | Hinweis an den Art Director |
| je Staffel | Bild | `hmKohorteBild` (Strukturabdruck der letzten zwölf Kacheln, Schritt 14) gegen alle Makler im selben Bezirk; gleiche Grammatik und gleicher Akzent im selben Bezirk ist eine Kollision | CD entscheidet; eine Änderung ist ein Antrag |
| je Staffel | Konvergenz | Median der paarweisen Textähnlichkeit aller UNIO-Makler | steigt er zwei Staffeln in Folge, prüft der CD zuerst die Beispiele im Claude-Prompt, dann die Regeln (MARKENQUALITAET Kapitel 3, Hinweis zur Ähnlichkeit über 15 Prozent) |
| je Staffel | Drift des Einzelnen | Anteil der Beiträge mit zwei Codes, Anteil der Plätze mit Reserve, Anteil Sonderfolgen | über Setzung (Codes unter 100 Prozent, Reserve über 10 Prozent, Sonderfolgen über 1 je Block) heißt Gespräch im Team |

`kohorte` im Datenvertrag: `{stand, text[] {beitrag, mit, wert}, bild[] {bezirk, mit, befund}, konvergenz {staffel, median}, drift {codes, reserve, sonder}}`. Die Kohortengröße, ab der die Prüfung trägt, ist offen (R4 offene Frage 1). Der Makler sieht die Kohorte nie; sie ist ein Werkzeug des Teams.

### 3.13 Lernen

`lernen` ist ein Rückfluss, kein Nachfolger: Er erzeugt Vorschläge an den Owner und ändert nie selbst den Fragenkatalog aus Schritt 2 oder die Setzungen aus Schritt 12.

**An Schritt 2: Fragen ohne Wirkung.** Schritt 2 behauptet je Frage Zielfelder (`fragen[].treibt`). Der Betrieb kann prüfen, ob das stimmt, weil die Felder der Quelle ihre Herkunft tragen (Schritt 7 `beweise.quelle`, Schritt 8 `eigeneWorte` mit Zitatverweis, Schritt 12 `saeulen.herleitung`, Schritt 13 `feed.kacheln.herkunft`). `hmLernenFragen` rechnet je Frage-Key über alle Makler mit Quelle:

- `zitiertInQuelle`: Anteil der Makler, bei denen mindestens ein Feld der Quelle auf die Antwort verweist.
- `wirktImBetrieb`: Anteil der veröffentlichten Beiträge, deren Felder über die Quelle auf die Antwort zurückgehen (Beispiel: `cue` treibt `serien.rhythmus.tag` und damit jeden Sendetag).
- `treibtStimmt`: ob die behaupteten Zielfelder unter den tatsächlich zitierten sind.
- `dauerMedian`, `abbruch`, `nachfrageAnteil` aus `fragebogen.messung`.

Vorschlag nach fünf Maklern mit Quelle (Setzung wie die Auswertung in Schritt 2): "streichen", wenn `zitiertInQuelle` null ist; "prüfen", wenn unter 20 Prozent oder `treibtStimmt` falsch; "kürzen", wenn der Median der Dauer über dem Doppelten der Schätzung liegt; sonst "behalten". Dazu die freien Rückmeldungen "War eine Frage überflüssig?" (`fragebogen.messung.rueckmeldung`). Das macht Leitfrage 1 aus Schritt 2 ("Welches Feld ändert sich?") nachprüfbar, statt sie einmal beim Entwurf zu beantworten.

**An Schritt 12: Setzungen.** Je Makler ersetzt der Rückblick nach zwölf Wochen die Richtwerte über einen Änderungsantrag (3.9, 3.11). Für die Kohorte sammelt `hmLernenSetzungen` nach fünf Maklern mit zwölf Wochen: gemessene Makler-Minuten je Reel-Folge und je Freigabe (Setzungen 15 und 2 Minuten aus `maklerMinutenMonat`), tatsächlicher Formatmix nach der ersten Anpassung, Anteil bestätigter Gesichtsregeln, Anteil Plätze mit Reserve je Klasse, Kontingent-Überschreitungen. Daraus entsteht ein Vorschlag für neue Startwerte in Schritt 12 mit Zahl der Makler und Spanne. Wie viele Makler eine Setzung tragen, bleibt offen (Lücke).

`lernen` im Datenvertrag: `{fragen[] {key, n, zitiertInQuelle, wirktImBetrieb, treibtStimmt, dauerMedian, abbruch, vorschlag, grund}, setzungen[] {feld, wert, n, spanne, vorschlag}, stand, entschiedenVon: null}`.

### 3.14 Was der Makler sieht und tut

**Sein Monat** (Setzung, gemessen ab dem ersten Makler):

| Was | Wo | Dauer | Ergebnis für ihn |
|---|---|---|---|
| Drehtag-Seite lesen | Telefon, drei WT vorher | 3 Minuten | weiß, wann, wo, was er anzieht und welche Sätze kommen |
| Drehtag | Büro und ein Ort im Grätzl | 60 bis 120 Minuten, darin die zwei Stoff-Fragen (höchstens 10 Minuten) und ein Ortswechsel | alle Folgen des nächsten Monats sind gedreht |
| höchstens zwei Fragen und drei Unterlagen | Nachricht in W1, wenn nötig | wenige Minuten | seine Fälle und Zahlen dürfen erscheinen |
| Freigabe der Folge | Telefon, fünf WT Zeit | 8 bis 12 Minuten | der nächste Monat samt Reserven ist fertig |
| Rückblick | nach 30 Tagen eigener Termin (Schritt 16), danach vor dem Drehtag nach jeder Staffel | 20 bis 30 Minuten, angekündigt; an diesem Tag also bis 150 Minuten | er sieht seine Zahlen an seinem Maß |

**Was er nie tut:** Schrift, Farbe, Layout oder Format wählen; Ideen aus einer Liste aussuchen; jeden Beitrag einzeln freigeben; eine Frage nach Zufriedenheit beantworten; Zahlen von anderen Maklern ansehen.

**Seine Ansichten**, gesetzt in der UNIO-Oberfläche, seine Marke erscheint darin nur in Anwendung (wie die Freigabe-Ansicht in Schritt 16, 3.5):

- **Nächster Termin.** Oben immer der nächste Drehtag oder die offene Freigabe, mit Dauer. Darunter sein Profil, wie es heute aussieht, und die Sendung mit der nächsten Folge.
- **Freigabe der Folge** nach 3.7.
- **Rückblick.** Überschrift "Zwölf Wochen" und darunter Zeitraum und Dauer. Dann in dieser Reihenfolge: sein Profil heute; das Maß aus seinem Vertrag mit der Zahl und dem Urteil in einem Satz; je Serie ein Satz mit der Kennzahl ihrer Aufgabe; "Was wir ändern" mit höchstens einer Änderung, Grund in zwei Sätzen, [Einverstanden] und "Lieber nicht"; "Was bleibt" (Sendung, Sendetag, Zeichen, Porträtstil); die nächste Staffel mit Thema und Drehtag. Keine Diagramme als Dekor, Kennzahlen als gesetzte Ziffern (Attribut "Genau" bei Markus). Keine Eyebrows, keine Symbole aus Textzeichen, keine Verläufe.

**Gesetzt in echter Anwendung, am Fall Markus.** Beide Ansichten sind keine Formulare mit Vorschau, sondern sein Profil in seiner Marke, in die UNIO-Oberfläche gesetzt. Satzspiegel am Telefon (390 pt breit, 16 pt Rand, eine Spalte), Zahlen in Tabellenziffern, die UNIO-Schrift für die Führung, seine Tokens nur in seinen Kacheln:

Freigabe der Folge, von oben nach unten (rechts die Satzanweisung, nicht Teil der Ansicht):

```text
Ihr nächster Monat                                  Überschrift, UNIO-Stufe groß
12. Jänner bis 6. Februar. Etwa zehn Minuten.       eine Zeile, UNIO-Text

[ Profilkopf Markus Leitner: Profilbild aus bild.portraet, Name, Bio aus
  botschaften, drei Highlights ]
[ Raster 3 x 4 in 3:4, echte Renderer, seine Tokens: Zeitwert 05 bis
  Vor der Unterschrift 04, darunter grau abgesetzt die letzten sechs
  veröffentlichten Kacheln ]
Woche 1   Woche 2   Woche 3   Woche 4                Wochenregler, ein Wisch

Was darin von Ihnen kommt
Zeitwert 07 (26. Jänner): Ihr Fall aus dem Drehtag am 3. Dezember,
  "[Ihr Satz wörtlich vom Drehtag]"            Lücke bis zum Drehtag, nie ein Mustersatz
Alteingesessen 02 (14. Jänner): der Ort in Grinzing, den Sie gezeigt haben.

Falls etwas ausfällt
[ Kachel Reserve Gesicht ]  [ Kachel Reserve Sache ]  gleich groß wie das Raster
Diese zwei laufen nur, wenn ein Beitrag ausfällt. Sie gelten bis 6. März.

Was noch fehlt
Verbüchert 03 braucht die Unterlage zum zweiten Fall bis 17. Dezember.
Sonst läuft am 6. Februar die Reserve Sache.

Im Februar erscheinen fünf Videos, so viele wie Ihr Abo enthält.
Alteingesessen kommt diesmal als Bild.

[ Folge freigeben ]                                   eine Schaltfläche, voll breit
Eine Stelle anmerken                                  Textverweis darunter

Nächster Drehtag
Donnerstag, 21. Jänner, 10 Uhr. Empfohlen: Ihr fester Drehtag, Licht im Winterfenster.
Dienstag, 19. Jänner, 10 Uhr.
```

Der Rückblick folgt demselben Satzspiegel: Überschrift "Zwölf Wochen", eine Zeile Zeitraum und Dauer, darunter sein Profil heute mit Wochenregler über die zwölf Sendewochen, dann das Maß als eine große gesetzte Zahl mit dem Urteil in einem Satz daneben, je Serie eine Zeile (Serienname, Zahl der Folgen, Kennzahl ihrer Aufgabe als Ziffer), "Was wir ändern" mit höchstens einer Änderung und dem Block, ab dem sie gilt, "Was bleibt" mit dem Staffelplakat der neuen Staffel als Kachel. Die Gestaltung dieser Ansichten gehört zur UNIO-Oberfläche und wird mit ihr einmal gebaut; seine Marke erscheint nur in den Kacheln, so wie in Schritt 16, 3.5. Ein Mock in Anwendungstiefe entsteht mit dem Bau von `FolgeFreigabe` (8.1) und ist Teil der Abnahme durch den Art Director.

Moment: Er muss nur noch auftauchen. Die Arbeit des Teams wird sichtbar, ohne dass er sie tun muss: In der Freigabe sieht er, welche seiner Sätze wo stehen, im Rückblick, was aus seinen Fällen geworden ist (Labor Illusion, https://doi.org/10.1287/mnsc.1110.1376).

### 3.15 Wer was erzeugt

| Ausgang | Regeln | Claude | Regelpfad ohne Claude | Team |
|---|---|---|---|---|
| `monatsplan` | Planer ganz: Belegung, Grammatik, Kontingent, Reserven, `materialBedarf`, Begründung je Platz | Hook-Auflösung innerhalb der Formel mit Pfad | Platzhalter nur aus Feldern, sonst Lücke | prüft, holt Stoff, darf Plätze tauschen, Prüfer muss danach grün sein |
| `beitrag` | Vorlage, Renderer, Prüfungen | Caption je Kanal, Karussell-Seiten je Rolle, Skript nach Ablauf | Hook plus Beleg wörtlich plus Weitergeben-Satz der Serie; Seiten außer Titel und Beleg als Lücke mit Rolle | redigiert, schneidet, Art Director prüft das Bild |
| `drehtage` | Clip-Liste, Dauer mit B18, Makler-Seite, Rezept und Referenzbild je Aufbau, V15 | Fragen im Ton der Stimme | Fragen als Schritte aus `serien[].ablauf` mit dem Titel des Themenvorrats | plant, führt, dreht, sortiert |
| `wirkung` | ganz: Import, Kennzahlen, Mediane, Halbierungsprobe, Urteil | höchstens zwei Sätze je Serie aus den Zahlen, ohne neue Deutung | feste Sätze aus Serie, Kennzahl und Wert | liest, bereitet den Rückblick vor |
| `quartal` | Prüfung der festen Teile, Plakat aus der gesperrten Vorlage, Stresstest, Feld-Diff zu den letzten Plakaten | nichts; das Staffelthema steht wörtlich | Staffelthema wörtlich | wählt Staffelthema aus den Anlässen, wählt das Porträt, Art Director nimmt das Plakat ab |
| `aenderungsantrag` | Diff, Einordnung, Versionsnummer, Wiederöffnen | Zusammenfassung in Satzschreibung aus dem Diff | Diff-Liste in festen Sätzen (Schritt 16, 3.12) | stellt Anträge, CD zeichnet ab |
| `kohorte` | ganz | nichts | ganz | CD entscheidet Kollisionen |
| `lernen` | ganz | nichts | ganz | Owner entscheidet |

**Regelpfad ohne Mustersätze.** Der Regelpfad nutzt keine Textbibliothek. Er übernimmt nur, was wörtlich in der Quelle, im Themenvorrat oder in einer Antwort vom Drehtag steht, und setzt sonst eine Lücke mit Arbeitsauftrag. Ohne `ANTHROPIC_API_KEY` in Vercel (00_ZERLEGUNG 7.10) kostet ein Block rund 60 bis 90 Minuten mehr Redaktion (Setzung) und bleibt vollständig betreibbar.

### 3.16 Beispiel am Fall Markus Leitner (Döbling, Zinshaus, Figur Kenner, Sie-Form)

**Herkunft der Werte.** Die v2-Kette ist für Markus nicht gelaufen. Serien, Hook-Formeln, Themenvorrat, Grammatik und Probe-Folge stammen aus `12_social.md` 3.15; Quelle 1.1, Live-Tag Dienstag, 24.11.2026, gesperrte Belege b1 und b2 und der Rückblick am 07.01.2027 aus `16_freigabe.md` 3.13; Belege b1 bis b6 und Erfolgsmaß aus `07_positionierung.md`; Abo "Personal Brand Premium" mit 5 Videos, 15 Fotos, 7 Grafiken je Monat aus dem Seed (`wb-store.jsx` Zeile 67). Alle diese Werte sind Arbeitsannahmen der Nachbarschritte. Hinweis: `13_feed.md` 3.12 und `16_freigabe.md` 3.13 arbeiten noch mit älteren Seriennamen ("Noch nicht verkaufen", "Sievering in Zahlen"), die vor Schritt 12 gesetzt wurden. Dieser Schritt folgt Schritt 12, weil `serien` dort entstehen (Korrekturbedarf 5.5).

**Keine Zahlen über seine Wirkung.** Für Markus gibt es keinen Insights-Export und keinen Kontakte-Import. Jede Zahl zu Reichweite, Saves oder Anfragen ist darum unten eine Lücke. Das Beispiel zeigt die Mechanik, nicht Ergebnisse.

**Seine Uhr.**

| Einheit | Zeitraum | Hinweis |
|---|---|---|
| Block 1 (`start30`) | W1 bis W4, 24.11. bis 19.12.2026 | Schritt 16; Folge 2 der Signatur am Mittwoch, 09.12., weil der 08.12. ein Feiertag ist |
| Pause | 20.12.2026 bis 11.01.2027 | Setzung: Zwischen 24.12. und 06.01. finden keine Makler-Termine statt (Schritt 16, 3.10), und ohne Grundbuch-Termin gibt es keinen Anlass für die Sendung am Dienstag |
| Block 2 | W5 bis W8, 12.01. bis 06.02.2027 | erster Plan dieses Schritts |
| Block 3 | W9 bis W12, 09.02. bis 06.03.2027 | Ende von Staffel 1 |
| Block 4 | W13 bis W16, 09.03. bis 03.04.2027 | Beginn von Staffel 2, Staffelthema Anlage (12, 3.15, Konzept "Zeitwert als Sendung") |
| Block 5 | W17 bis W20, 06.04. bis 01.05.2027 | |
| Block 6 | ab W21, Dienstag, 04.05.2027 | erster Block, der eine Änderung aus dem Rückblick nach zwölf Wochen tragen kann |

| Termin | Datum | Was, nach der Uhr aus 3.2 |
|---|---|---|
| Plan für Block 2 | Montag, 23.11.2026 | der Tag vor W1 von Block 1, weil Block 1 am Dienstag, 24.11., dem Live-Tag, beginnt |
| Frist für Stoff zu Block 2 | Dienstag, 01.12.2026 | zwei WT vor dem Drehtag |
| Drehtag für Block 2 | Donnerstag, 03.12.2026, 10 Uhr | W2 von Block 1; Winterfenster aus dem Rezept |
| Produktion Block 2 | 04., 07., 09. und 10.12. | vier WT; der 08.12. ist Feiertag |
| Freigabe der Folge Block 2 | Ansicht ab Freitag, 11.12., Fenster bis Donnerstag, 17.12. | fünf WT; erster Beitrag am 12.01., Puffer über die Pause |
| Rückblick 30 Tage | Donnerstag, 07.01.2027 | Termin aus Schritt 16, Ansicht aus `hmWirkung` |
| Drehtag für Block 3 | Donnerstag, 21.01.2027 | W6; Freigabe 28.01. bis 03.02.; erster Beitrag 09.02., Puffer 04., 05. und 08.02. |
| Drehtag für Block 4 und Staffel 2 | Donnerstag, 18.02.2027 | W10; Freigabe 25.02. bis 03.03.; erster Beitrag 09.03. |
| Plan für Block 5 | Montag, 08.03.2027 | W13, fünf Tage vor dem Stichtag |
| Stichtag zwölf Sendewochen | Samstag, 13.03.2027 | letzter Beitrag der Staffel am 06.03. plus sieben Tage; Insights-Export am Montag, 15.03. |
| Rückblick zwölf Wochen, danach Drehtag für Block 5 | Donnerstag, 18.03.2027 | W14; Block 5 dreht nach dem Plan vom 08.03.; Freigabe 25.03. bis 01.04. (29.03. Ostermontag), Puffer 02. und 05.04.; Block 5 ab 06.04. |
| Plan für Block 6 | Montag, 05.04.2027 | erster Plan nach der Bestätigung im Rückblick; eine Änderung wirkt ab 04.05.2027 |

**Arbeitsannahme zu den Vorlagen.** Das Beispiel nimmt an, dass Quelle 1.1 für Alteingesessen, Stand Sievering und Vor der Unterschrift je eine Vorlage `post` enthält, wie 5.5 es von Schritt 12 verlangt; Schritt 12 nennt für diese Serien heute nur das Hauptformat Reel oder Karussell (12, 3.15). Fehlten sie, wäre ihr Nachtrag eine kleine Version (neue Vorlage, 3.11), und die Plätze 14 und 24 sowie beide Reserven könnten erst ab dem ersten Block danach so belegt werden.

**Stand der Folge am Ende von Block 1** (Arbeitsannahme nach der Probe-Folge aus 12, 3.15): letzte Folgenummer 12; Zeitwert bis Folge 04 und Staffelplakat; Vor der Unterschrift bis 02; Stand Sievering bis 02; Verbüchert 01 mit b3; Alteingesessen 01; Warum jetzt ruhend. Erzählte Belege in Staffel 1: b1 (Zeitwert 04, Pilot), b2 (Zeitwert 03), b3 (Verbüchert 01). Wie Platz 12 in Woche 4 öffentlich gefüllt wurde, lassen die Schritte 12, 13 und 16 offen (Lückenkachel ist nie öffentlich); dieser Schritt würde die Reserve der Klasse Sache nehmen (Korrekturbedarf 5.5).

**Monatsplan Block 2** (`hmMonatsplan("markus", 2)`, Hooks mit Anrede über `hmAnrede("markus", kanal)` gleich Sie; Kanäle nach `kanalplan`: Zeitwert, Vor der Unterschrift, Stand Sievering, Verbüchert auch auf LinkedIn):

| Nr. | Datum | Platz, Klasse | Serie, Folge | Format | Hook (aufgelöst oder mit Lücke) | Beleg | `materialBedarf` | Status |
|---|---|---|---|---|---|---|---|---|
| 13 | Di 12.01. | 1, Gesicht | Zeitwert 05, "Wenn Miterben verschieden schnell sind" (Themenvorrat 05) | Reel | "[Dauer]. Was die Zeit Miterben erspart." | keiner, Wissensfolge | Dauer und seine drei Sätze vom Drehtag | gedreht am 03.12. |
| 14 | Do 14.01. | 2, Gesicht | Alteingesessen 02 | Einzelbild (Standbild), Eingriff nach B18 | "[Ort in Grinzing]. Älter als jeder Verkauf hier." | keiner | Standbild am Ort in Grinzing im selben Gang wie Platz 20; erzählt, nie das Elternhaus, keine Familie (12, Beispiel 2) | gedreht |
| 15 | Sa 16.01. | 3, Sache | Stand Sievering 03 | Karussell, 6 Seiten | "Bis zum Anbot in Sievering. Drei Zahlen, Stand [Monat der Quelle]." | Marktwert mit Quelle | eine Marktquelle mit Stand und URL, vom Team gewählt (welche, Lücke); Werte aus seinen Grundbuch-Terminen gesperrt bis zur Klärung aus 9.9; Frist 01.12. | wartet; trägt die Fenster 13 bis 15 und 14 bis 16 allein |
| 16 | Di 19.01. | 4, Gesicht | Zeitwert 06, "Was eine Eintragung über den Zeitpunkt sagt" (Themenvorrat 07) | Reel | "[Dauer]. Was die Eintragung Verkäufern erspart." | keiner, Wissensfolge, anonymisiert | Dauer vom Drehtag; keine Einlagezahl, kein Name | gedreht |
| 17 | Do 21.01. | 5, Gesicht | Vor der Unterschrift 03, "Der Energieausweis" | Karussell, 7 Seiten | "Der Energieausweis: was Sie vor der Unterschrift wissen sollten." | Arbeitsweise | Standbild für Seite 1 vom Drehtag; allgemein, kein Objekt, darum keine Energiezeile | gedreht |
| 18 | Sa 23.01. | 6, Sache, Gegenton, textgeführt | Verbüchert 02 | Einzelbild | "[Kennzahl] in [Bezirk]. Was davor entschieden wurde." | eigener Fall | ein abgeschlossener Fall mit Unterlage; b1, b2, b3 sind in Staffel 1 schon erzählt (M5); Fall aus F17-2 als Nachricht, Eintrag in `betrieb.stoff`, Unterlage bis 17.12. | wartet |
| 19 | Di 26.01. | 7, Gesicht | Zeitwert 07, Fall A aus F12-2 (Schritt 12) | Reel | "[Dauer]. Was [das Warten oder der schnelle Verkauf] [wem] gebracht hat." | eigener Fall, Selbstauskunft; eine Zahl nur mit Unterlage | Fall vom Drehtag; gedreht in zwei Fassungen, mit und ohne Zahl (wie Schritt 16, 3.13) | gedreht, Fassung ohne Zahl freigebbar |
| 20 | Do 28.01. | 8, Gesicht | Alteingesessen 03 | Reel | "[Ort]. Älter als jeder Verkauf hier." | keiner | Ort vom Team am Drehtag mit ihm festgelegt, in Grinzing (12, Beispiel 3) | gedreht |
| 21 | Sa 30.01. | 9, Sache | Stand Sievering 04 | Karussell | "[Frage aus seinen Erstgesprächen] in Sievering. Drei Zahlen, Stand [Monat der Quelle]." | Marktwert mit Quelle | zweite Frage mit derselben Quelle wie Platz 15; Frist 01.12. | wartet |
| 22 | Di 02.02. | 10, Gesicht | Zeitwert 08, Fall B aus F12-2 | Reel | "[Dauer]. Was [das Warten oder der schnelle Verkauf] [wem] erspart hat." | eigener Fall, Selbstauskunft | wie Platz 19 | gedreht, Fassung ohne Zahl freigebbar |
| 23 | Do 04.02. | 11, Gesicht | Vor der Unterschrift 04, "Der Mietvertrag" | Karussell | "Der Mietvertrag: was Sie vor der Unterschrift wissen sollten." | Arbeitsweise | Standbild; "allgemein, keine Rechtsberatung" (12, Beispiel 3) | gedreht |
| 24 | Sa 06.02. | 12, Sache | Warum jetzt ruht (kein Objekt im Import); M10 gibt den Platz an Stand Sievering 05 | Einzelbild (Vorlage `post`) | "[dritte Frage] in Sievering. Drei Zahlen, Stand [Monat der Quelle]." | Marktwert mit Quelle | dieselbe Quelle wie 15 und 21; Bild: ein Eingang in Sievering aus dem Kontaktbogen, ohne Makler | wartet |
| R-G | gilt bis 06.03. | Reserve Gesicht | Vor der Unterschrift, "Der Grundbuchauszug" (12, Beispiel 2) | Einzelbild aus dem Kontaktbogen | "Der Grundbuchauszug: was Sie vor der Unterschrift wissen sollten." | Arbeitsweise, sein Dienstag im Grundbuch (Selbstauskunft, ohne Zahl) | Porträt am Besprechungstisch aus dem Kontaktbogen (Motiv "Im Gespräch am Tisch", Schritt 11), Durchgang 2, Arbeitsannahme: erfüllt den Bildaufbau der Serie, sonst Standbild am nächsten Drehtag; keine Drehminute | planbar |
| R-S | gilt bis 06.03. | Reserve Sache | Stand Sievering, Reserve | Einzelbild (Vorlage `post`) | "[vierte Frage] in Sievering. Drei Zahlen, Stand [Monat der Quelle]." | Marktwert mit Quelle | dieselbe Quelle; Ort: Eingang in Sievering; `gueltigBis` Ende von Staffel 1, drei Monate nach dem Stand (R-3) | wartet auf die Quelle; ohne sie Blocker (M9) |

**Warum diese Belegung** (Auszug aus `monatsplan[].grund`):
- **Platz 14.** Der Gesichtsplatz ohne feste Serie (3.3, Befund) muss neben dem Karussell auf Platz 15 ein Reel einer anderen Serie als der Signatur oder ein Einzelbild mit Gesicht sein. Alteingesessen ist die einzige Serie mit Gesicht dafür. Als Reel hätte sie den Drehtag über die Zusage gehoben (B18, unten) und im Februar das Kontingent gesprengt; als Standbild im Gang mit Platz 20 kostet sie fünf Minuten. Persönlich steht damit zweimal im Block; bei einem Anteil von 10 Prozent sind das 1,2 Beiträge, zwei liegen innerhalb eines Beitrags (12, 3.3). Das Format des Blocks ist damit genau der Startwert 5, 4, 3 aus Schritt 12.
- **Zeitwert-Plätze 13, 16, 19, 22.** Zuerst die zwei Fälle, die Schritt 12 bei Markus mit F12-2 nachgefragt hat (eigene Fälle 2 von 4), auf 19 und 22: Eigene Fälle tragen Fenster, und eine Sendung aus Wissensfolgen passt auf jeden Makler (12, 3.5, `eigeneFaelle`). Für die zwei übrigen Plätze wählt die Suche aus dem Themenvorrat nach dem Staffelthema Erbe: "Wenn Miterben verschieden schnell sind" (Anlass Erbe) und "Was eine Eintragung über den Zeitpunkt sagt" (sein fester Termin). "Wenn ein Mietvertrag ausläuft" geht in Block 3. Fehlen die Fälle, bleiben 19 und 22 Lücken mit Arbeitsauftrag, und F17-2 geht als Nachricht an ihn.
- **Vor der Unterschrift 03 und 04.** Der Winter legt als Dokument den Energieausweis nahe; das ist der einzige Weg, auf dem ein Anlass in den Plan kommt, als Variable einer Serie (3.3, Anlässe). Der Mietvertrag folgt auf Platz 23. M6 prüft beide Mietvertrag-Themen: Eine Zeitwert-Folge "Wenn ein Mietvertrag ausläuft" auf 19 oder 22 läge im selben Fenster von sechs wie Platz 23 und ist darum gesperrt.
- **Platz 18.** Gegenton-Phase 2 (Plätze 14, 18, 22 der Folge) und der einzige textgeführte Platz im Block, Abstand sechs zum nächsten textgeführten Platz. Platz 14 und 22 bleiben ohne Gegenton, das ist erlaubt (12, 3.15).
- **Platz 24.** Warum jetzt ruht. Verbüchert trägt immer die Gegenton-Fläche und darf nur auf Phasenplätze; ein Karussell neben dem Karussell auf 23 bricht die Nachbarregel. Bleibt Stand Sievering als Einzelbild, abseits ihres Zwei-Wochen-Rhythmus (weiches Ziel, begründet).
- **Belege je Fenster.** Arbeitsweise auf 17 und 23, eigene Fälle auf 18, 19 und 22, Marktwerte mit Quelle auf 15, 21 und 24. Nur Platz 15 trägt zwei Fenster allein (13 bis 15 und 14 bis 16); deshalb steht seine Quelle an erster Stelle der Liste für das Team.
- **Reserven.** Beide erfüllen R-1 bis R-7: Serie der Quelle, ein eigenes Wort oder Ort (sein Dienstag im Grundbuch, ein Eingang in Sievering), kein Anlass, Einzelbild. Die Reserve Gesicht kostet keine Drehminute.
- **Kontingent Jänner** nach Veröffentlichungsdatum: Reels 13, 16, 19, 20 sind vier von fünf; Platz 22 liegt im Februar. Grafiken: Karussells 15, 17, 21 und das textgeführte Einzelbild 18 sind vier von sieben. Fotos: Platz 14, eines von 15.
- **Kontingent Februar** (Probe von M8 über die Blockgrenze): Reels 22 (02.02.) aus Block 2 und aus Block 3 die Zeitwert-Folgen am 09., 16. und 23.02. sowie Alteingesessen 05 am 25.02.: fünf, genau das Abo. Der freie Gesichtsplatz von Block 3 am 11.02. ist wie Platz 14 ein Standbild. Ohne den Eingriff aus B18 wären es sechs, und M8 hätte denselben Formatwechsel verlangt. Block 3 ist dafür nach denselben Regeln wie Block 2 belegt (Arbeitsannahme bis zu seinem Plan am 11.01.).

**Was der Planer dem Team am Montag, 23.11.2026, meldet** (der Tag vor W1 von Block 1; nach 3.2 entsteht der Plan für den nächsten Block am Montag der W1 oder, wenn der Block am Dienstag beginnt, am Vortag):

```text
Block 2, 12. Jänner bis 6. Februar
Acht von zwölf Plätzen sind mit dem Drehtag am 3. Dezember planbar.
Vier Sachplätze warten auf Stoff: 15, 21 und 24 auf eine Marktquelle,
18 auf einen eigenen Fall mit Unterlage.
Platz 15 trägt zwei Fenster allein. Ohne Quelle fehlt dort der Beleg
der Zeile.
Die Reserve Sache hängt an derselben Quelle. Ohne Reserve geht der Block
nicht in die Freigabe.
Makler-Zeit: Der Drehtag bräuchte 145 Minuten, zugesagt sind 120.
Eingriff: Reserve Gesicht aus dem Kontaktbogen, Platz 14 als Bild im
Gang mit Platz 20. Danach 120 Minuten.
Kleinster Eingriff für den Stoff: eine Marktquelle mit Stand und URL bis
1. Dezember. Sie trägt Stand Sievering 03, 04 und 05 und die Reserve Sache.
Werte aus seinen Grundbuch-Terminen sind gesperrt, bis der Rechtsrahmen
geklärt ist.
Nachricht an Markus: ein abgeschlossener Fall mit Unterlage für Platz 18.
b3 ist in Staffel 1 schon erzählt und erst ab Staffel 2 wieder frei.
```

Das ist ein echter Befund über Markus: Seine Sachplätze hängen an Stoff, den nur er liefern kann, an Unterlagen und an einer Marktquelle. Werte aus seinem festen Grundbuch-Termin wären sein eigenster Stoff, bleiben aber gesperrt, bis der Rechtsrahmen aus 9.9 geklärt ist; der Planer schlägt sie darum nicht als Eingriff vor. Schritt 12 hat Stand Sievering mit dem Beispiel "Lücke: Marktquelle; ohne genannte Quelle keine Folge" angelegt (12, 3.15). Der Betrieb macht daraus eine monatliche Aufgabe mit Frist statt einer Lücke im Markenbuch, und er meldet sie vier Wochen vor dem Block, nicht am Sendetag.

**Drehtag Donnerstag, 03.12.2026, Makler-Seite** (Auszug, Sie, Regeln aus `fotobrief.maklerSeite` und dem Plan):

```text
Ihr Drehtag am 3. Dezember
10 Uhr in Ihrem Büro, danach Grinzing. Zwei Stunden:
80 Minuten im Büro, 30 Minuten in Grinzing mit dem Weg,
zum Schluss 10 Minuten für zwei Fragen.

Sie drehen fünf Folgen und drei Bilder für die Wochen vom 12. Jänner
bis 6. Februar. Sie müssen nichts auswendig lernen.
Wir fragen, Sie antworten mit eigenen Worten.

Zeitwert 05. Wenn Miterben verschieden schnell sind.
Wir fragen: Woran merken Sie, dass Miterben verschieden schnell sind?
Dann: Was kostet es, wenn einer wartet? Zum Schluss: Wann wäre Warten
richtig?

Vor der Unterschrift 03. Sie sitzen am Besprechungstisch, das Dokument
liegt rechts vor Ihnen. Ein Bild, dazu ein Satz zur Seite 2.

Zum Schluss zwei Fragen für Februar, gern kurz:
1. Welche Entscheidung über einen Zeitpunkt hatten Sie seit Oktober?
2. Welche Frage stellen Eigentümer in Sievering gerade am häufigsten?
```

**Minuten nach Setzung (3.4), mit B18.** Der erste Plan hätte sechs Reels (13, 14, 16, 19, 20, 22) und eine Reserve Gesicht als Reel gebraucht: sieben mal 15 sind 105 Minuten, zwei Standbilder 10, Ankommen und Licht 10, Ortswechsel 10, Stoff-Fragen 10, zusammen 145 Minuten. B18 feuert, weil das über der Zusage von 120 Minuten liegt, und die Regel wendet die ersten zwei Eingriffe aus 3.4 an: Reserve Gesicht aus dem Kontaktbogen (minus 15) und Platz 14 als Standbild im Gang mit Platz 20 (minus 10). Ergebnis: Büro 80 Minuten (Ankommen und Licht 10, vier Zeitwert-Reels 60, Standbilder 17 und 23 je 5), Weg 10, Grinzing 20 (Reel 20 mit 15, Standbild 14 mit 5), Stoff-Fragen 10, zusammen 120 Minuten. Mit Drehtag-Seite (3) und Freigabe (10) sind es rund 133 Minuten im Monat. Schritt 12 rechnet 114 Minuten: 75 Minuten Kamera, 24 für zwölf Einzelfreigaben, 15 für Themen (12, 3.15). Der Betrieb ersetzt Einzelfreigaben und Themen durch eine Freigabe von 10 Minuten und die Stoff-Fragen, rechnet aber Standbilder, Licht und Weg ehrlich mit; das ergibt 19 Minuten mehr, innerhalb von 2 bis 4 Stunden (Seed `zeit`). Korrektur an Schritt 12 in 5.5. Der Plan zeigt den Eingriff dem Team in der Meldung vom 23.11. und dem Makler als Dauer auf der Seite. Die Stoff-Fragen im Termin betreffen den übernächsten Block; was Block 2 selbst noch braucht, hat das Team in W1 als Nachricht erbeten (3.2).

**Licht an diesem Drehtag** (Rezept, erste Fassung, vom Art Director am 03.12. abgenommen): Büro, Tageslicht von rechts aus der Blickrichtung, Reflektor links, Deckenlicht aus; Winterfenster 10 bis 12 Uhr, darum 10 Uhr statt 9 Uhr; Weißabgleich fest, am Tag gemessen; Graukarte je Aufbau; Grinzing im selben Fenster, bei bedecktem Himmel bevorzugt. Weil dies der erste Drehtag im Betrieb ist, gibt es noch kein Referenzbild; V15 misst gegen die Bilder aus `bild.kontaktbogen`, Durchgang 2, und das erste bestätigte Bild wird Referenz für den 21.01.

**Ein Beitrag mit Prüfung** (Nr. 17 nach der Suche, Auszug):

```json
{
  "id": "markus-b2-17", "folgeNr": 17, "block": 2, "platz": 5, "klasse": "gesicht",
  "serie": "vor-der-unterschrift", "folgeInSerie": 3, "vorlage": "vdu-karussell",
  "felder": { "portraet": "k:dreh-2026-12-03-07", "dokument": "Energieausweis",
    "titel": "Der Energieausweis vor der Unterschrift", "kennung": "Vor der Unterschrift 03, Seite 1 von 7" },
  "hook": "Der Energieausweis: was Sie vor der Unterschrift wissen sollten.",
  "caption": { "instagram": "…", "linkedin": "…" },
  "belegRefs": [], "quelleVersion": "1.1",
  "pruefung": {
    "sprache": { "ok": true }, "anrede": { "ok": true, "detail": "Sie auf allen Kanälen" },
    "codes": { "ok": true, "detail": "Zeitmaß als Punkt, Porträtstil" },
    "grammatik": { "ok": true, "detail": "Fenster 15 bis 17 und 16 bis 18 mit je zwei Gesichtern" },
    "energiekennzahl": { "ok": true, "detail": "kein Objekt in Vermarktung, Regel greift nicht" },
    "gesicht": { "ok": true, "detail": "erkannt, Kopfhöhe nach bild.regeln" },
    "weitere": { "quelle": true, "belege": true, "lesbarkeit": true, "kohorteText": 0.02, "einwilligung": true, "kontingent": true, "rezept": { "ok": true, "detail": "Graukarte Delta E 1,4, Helligkeit Blickseite im Band" } }
  },
  "freigabe": { "art": "makler", "sitzung": "markus-b2-fg", "am": null },
  "veroeffentlicht": null
}
```

Die Captions sind im Auszug ausgelassen; sie entstehen nach 3.5 aus dem Drehtag. Bei einem echten Objekt stünde unter `energiekennzahl` HWB, Endenergiebedarf und Klasse aus dem Import.

**Rückblick nach 30 Tagen, Donnerstag, 07.01.2027** (Inhalt nach Schritt 16, Ansicht aus `hmWirkung`): was von `start30` erschienen ist, je Beitrag Reichweite, Saves, Weiterleitungen und Kommentare (Lücke bis zum Export), Anfragen seit dem Live-Tag nach dem Merkmal seines Erfolgsmaßes (Lücke bis zum Kontakte-Import), Stand der Unterlagen b1 und b2 (Frist aus Schritt 16: 27.11.2026). Keine Bewertung. Neu aus diesem Schritt: der Stand von Block 2 (am 17.12. freigegeben oder nicht) und die offenen Stoffe mit Frist.

**Kontingent im März 2027** (Probe der Regel M8): Dienstage am 02., 09., 16., 23. und 30. März. Am 09.03. beginnt Staffel 2 mit dem Staffelplakat (Einzelbild), der Zeitwert der Woche läuft am Donnerstag, 11.03. (Staffelstart wie in 12, 3.15). Zeitwert-Reels im März: 02., 11., 16., 23., 30., also fünf, genau das Abo. Alteingesessen am Donnerstag, 25.03., wäre das sechste Video. Der Planer meldet das beim Plan für Block 4 am Montag, 08.02.2027 (der Tag vor W1 von Block 3), und löst es nach Stufe 1 der Regel aus 3.3: Alteingesessen erscheint im März als Einzelbild mit Gesicht, die Säule Persönlich behält ihren Beitrag. Das Team bestätigt den Eingriff in W1 (`kontingent.entscheidung {weg: "format", von: "team", am: "2027-02-08"}`). Markus wählt nichts; die Freigabe von Block 4 (25.02. bis 03.03.) zeigt einen Satz: "Im März erscheinen fünf Videos, so viele wie Ihr Abo enthält. Alteingesessen kommt diesmal als Bild." Ein sechstes Video gegen Bezahlung steht nie in seiner Freigabe; es gäbe es nur nach einer Entscheidung des Owners (3.3, 9.2). Die Ursache liegt nicht bei Markus, sondern darin, dass das Abo je Kalendermonat zählt und der Takt je vier Wochen (9.1).

**Rückblick nach zwölf Wochen, Donnerstag, 18.03.2027** (Vorlage mit Lücken, Sie):

```text
Zwölf Wochen
24. November bis 6. März. Etwa 20 Minuten, danach der Drehtag.

Ihr Maß
Anfragen mit dem Anlass Erbe oder Anlage aus Döbling, Währing und
Hietzing: [Zahl aus dem Kontakte-Import], davon über Notariat oder
Steuerberatung: [Zahl].
Einen Vergleich mit der Zeit davor gibt es noch nicht. Diese Zahl ist
Ihr Ausgangswert für die nächsten zwölf Wochen.

Ihre Sendung
Zeitwert, 12 Folgen: im Mittel [Zahl] Weiterleitungen je 1.000 Erreichte.
Vor der Unterschrift, [n] Folgen: im Mittel [Zahl] Mal gespeichert
je 1.000 Erreichte.

Was wir ändern
[Höchstens eine Änderung mit Grund in zwei Sätzen, nur wenn die Regel
aus 3.9 sie trägt, dazu: Sie gilt ab 4. Mai. Die Wochen davor sind schon
geplant, und heute drehen wir sie. Sonst: Wir ändern nichts. Die Daten
reichen noch nicht für eine Änderung.]

Was bleibt
Ihre Sendung jeden Dienstag, Ihr Zeitmaß, Ihr Porträt.

Staffel 2 heißt Anlage.
```

Das Urteil zum Erfolgsmaß steht als "erster Messwert", weil sein `ausgangswert` eine Lücke ist (07: "Ausgangswert: Lücke"). Kann der Import die zwölf Monate vor dem 24.11.2026 zählen, steht dort stattdessen der Vergleich.

**Quartal Staffel 2** (Arbeitsannahme, Töne aus Schritt 10 noch offen):

```json
{
  "staffel": 2, "beginn": "2027-03-09", "quelleVersion": "1.1",
  "variable": {
    "staffelthema": { "wert": "Anlage", "quelle": "12: konzepte, Zeitwert als Sendung; 2: antworten.ausloeser Investment" },
    "quartalston": { "tokenRef": "Lücke: zweiter vorbereiteter Ton aus 10, festUndVariabel", "quelle": "10" },
    "motivthema": { "wert": "Lücke: aus bild.motive.kann", "quelle": "11" }
  },
  "codesUnveraendert": { "ok": true, "geprueft": ["system.wortmarke", "system.zeichen", "system.typo", "bild.regeln.ausschnitt", "bild.regeln.haltung", "social.serien.zeitwert.bildaufbau", "social.serien.zeitwert.folioRegel"] }
}
```

**Drei Änderungsanträge als Probe** (keine Behauptung, dass sie so eintreten):
1. Die Unterlage zu b2 kommt am 20.11.2026. Keine Version: Eintrag "Unterlage geprüft", der LinkedIn-Beitrag L1 wird frei (Schritt 16, 3.13).
2. Die Regel aus 3.9 ergibt nach zwölf Wochen mit allen drei Bedingungen, dass Karussells seine Aufgabe besser tragen als Einzelbilder. Kleine Version 1.2: Formatmix 5, 5, 2 statt 5, 4, 3; CD zeichnet ab, Markus bestätigt im Rückblick am 18.03. mit einem Klick. Sie gilt ab Block 6 (04.05.2027), dessen Plan am 05.04. als erster nach dem Einfrieren entsteht; Block 5 ist seit 08.03. geplant und wird am 18.03. gedreht.
3. Markus möchte die Sendung "Nach dem Grundbuch" nennen. Das ist der Name der Signatur-Serie, also ein Code: große Version 2.0, neue Kennung, neues Plakat, neue Vorlagen, Gate 2 und Freigabe 2. Das Team antwortet am Kriterium "Aus Sievering" und "Genau" seines Vertrags und nennt Aufwand und Preis vor jeder Arbeit.

---

## 4. Fragen an den Makler

Im Betrieb gibt es keine Fragen zu Gestaltung, Formaten, Säulen, Kanälen, Themenwünschen oder Zufriedenheit. Es gibt eine monatliche Handlung, eine monatliche Terminwahl, eine bedingte monatliche Stoff-Frage und drei Fragen, die nur bei einem Anlass entstehen.

| Nr. | Frage oder Handlung (Wortlaut, Sie) | Wann | Wirkt auf | Warum sie den Output verändert, Probe |
|---|---|---|---|---|
| F17-1 | "Ihr nächster Monat ist fertig." [Folge freigeben] oder "Eine Stelle anmerken" | je Block, Freigabe-Ansicht, fünf WT offen | `beitrag[].freigabe` für die zwölf Beiträge und die zwei Reserven, `beitrag[].veroeffentlicht` (ob überhaupt), bei Anmerkung `caption` oder `felder` des Beitrags | Ohne sie erscheint nichts Neues. Probe: freigeben, und zwölf Beiträge gehen zu ihren Zeiten online, die Reserven stehen für Ausfälle bereit; nicht freigeben, und die erste Sendewoche ruht als ganze Pause, die Folge setzt danach fort (3.3). |
| F17-2 | Höchstens zwei Stoff-Fragen aus den Serien, etwa "Welche Entscheidung über einen Zeitpunkt hatten Sie seit dem letzten Drehtag? Zwei Sätze genügen." oder "Welche Frage stellen Eigentümer in Sievering gerade am häufigsten?" Fragen nach Werten aus seinen Grundbuch-Terminen sind gesperrt, bis der Rechtsrahmen aus 9.9 geklärt ist. | nur wenn der Themenvorrat einer Serie weniger als eine Folge Vorlauf hat oder ein Sachplatz ohne Stoff ist; für den übernächsten Block am Ende des Drehtags, gesprochen; für den nächsten Block als Nachricht in W1 | `betrieb.stoff[]` (Arbeitsstand außerhalb der Quelle, Prüfstatus "Selbstauskunft"), daraus `monatsplan[].hook` und `belegRef`; in die Quelle nur über einen Beleg-Nachtrag (3.11) | Die Serie trägt nur mit eigenen Fällen und eigener Quelle (12, 3.5, `eigeneFaelle`, `nachschub`). Probe: Antwort mit zwei Fällen füllt Zeitwert 07 und 08 und den Sachplatz; keine Antwort lässt die Plätze auf Lücke und, am Sendetag, auf Reserve. Das System kennt diese Fälle nicht, darum wird gefragt. Die Prüfsumme der Quelle ändert sich durch die Antwort nicht. |
| F17-3 | "Darf [Haus, Straße ohne Hausnummer, Bezirk] in Ihrem nächsten Monat zu sehen sein?" [Zeigen] oder "Nicht zeigen" | nur bei einem neuen Objekt mit Hinweis auf Diskretion oder ohne öffentliche Inserierung (Regel aus 13, 4.2), als eigene kurze Nachricht außerhalb der Freigabe; ohne Antwort gilt "Nicht zeigen" | `monatsplan[].serie` (Warum jetzt aktiv oder ruhend), `beitrag.felder.objektfoto` | Diskretion ist bei Markus ein Wert im Vertrag, und ein Fehler wäre öffentlich. Probe: "Zeigen" macht einen Sachplatz zur Objekt-Folge mit Energiezeile; "Nicht zeigen" lässt ihn bei der Serie aus dem Plan. |
| F17-3b | "Dürfen wir den Grund der Eigentümer nennen, so wie Sie ihn uns sagen?" [Ja, ich sage ihn beim Drehtag] oder "Ohne Grund" | nur nach "Zeigen" in F17-3 und nur, wenn die Serie den Grund erzählt (bei Markus Warum jetzt); am Folgetag als eigene Nachricht, damit jede Sitzung eine Entscheidung hat; ohne Antwort gilt "Ohne Grund" | `beitrag.felder.grund` und der Grund-Satz in `caption`; bei "Ja" eine Stoff-Frage auf der nächsten Drehtag-Seite | Die Hook-Formel von Warum jetzt verlangt den Grund. Probe: "Ja" bringt den Satz in seinen Worten ins Bild und in die Caption; "Ohne Grund" setzt die Folge ohne Grund-Satz, und die Suche prüft, ob die Serie so trägt, sonst geht der Platz an eine andere Serie der Klasse Sache. |
| F17-4 | "Nächster Drehtag: Donnerstag, 21. Jänner, 10 Uhr (empfohlen: Ihr fester Drehtag, Licht im Winterfenster) oder Dienstag, 19. Jänner, 10 Uhr." | in der Freigabe-Ansicht; beide Termine liegen im Tageszeitfenster des Rezepts und halten die Uhr aus 3.2 | `drehtage[].datum` und damit Produktionsfenster, Öffnen der Freigabe-Ansicht und Ende des Freigabefensters | Sein Kalender ist keinem System bekannt. Eine Wahl zwischen zwei, eine markiert. Probe: der zweite Termin zieht Produktion, Ansicht und Fensterende um zwei WT vor, der Puffer vor dem Block wächst entsprechend. |
| F17-5 | "Ab [Block, Datum]: [eine Änderung]. Grund: [zwei Sätze]." [Einverstanden] oder "Lieber nicht" | nur im Rückblick nach einer Staffel und nur, wenn die Regel aus 3.9 eine Änderung trägt, oder bei einem anderen Antrag mit kleiner Version (etwa Beleg-Nachtrag), dann als eigene Nachricht | `aenderungsantrag[].status`, neue `quelle.version` oder keine | Schritt 16 verlangt für eine kleine Version die Bestätigung des Maklers. Probe: "Einverstanden" friert 1.2 ein, und der erste danach gerechnete Plan (bei Markus Block 6, Plan am 05.04.2027) rechnet mit dem neuen Formatmix; "Lieber nicht" lässt 1.1 aktiv und vermerkt den Befund für die nächste Staffel. |

Höchstens eine Wahl je Sitzung zwischen höchstens zwei Optionen, eine davon markiert und begründet: In der Freigabe-Ansicht ist das F17-4, F17-1 ist die Handlung der Sitzung, keine Wahl zwischen Optionen. Im Rückblick ist es F17-5. F17-3 und F17-3b sind je eine eigene kurze Nachricht. Das Kontingent ist keine Frage an den Makler: Den Eingriff entscheidet die Regel mit Bestätigung des Teams, einen Kauf nur der Owner (3.3). Jede Aufgabe ist in einer Sitzung abschließbar, die Dauer steht vorab da.

**Was abgeleitet wird statt gefragt.**

| Was man fragen könnte | Warum nicht | Woher es kommt |
|---|---|---|
| Worüber möchten Sie diesen Monat sprechen? | Themen stehen in Serien, Themenvorrat und seinen Fällen; eine offene Themenfrage führt zu allgemeinen Ideen | `serien[].themenvorrat`, F17-2 nur bei Lücke |
| An welchen Tagen, zu welcher Uhrzeit? | liegt im Rhythmus der Serien | `serien[].rhythmus` aus `antworten.cue` |
| Welche Formate diesen Monat? | Formatmix und Grammatik rechnen das; Komfort ist gemessen | `formatmix`, `grammatik` |
| Wie viele Reichweiten, Saves, Follower? | liegen im Export | `hmInsightsLesen` |
| Wie viele Anfragen hatten Sie? | liegen im Kontakte-Import | laufender Bestand-Import, nur als Zählung |
| Haben Sie neue Objekte? | liegen im Import | `bestand[mid].objekte` |
| Hat der Energieausweis diese Werte? | liegen im Import | `hwb`, `fgee`, `klasse`, Endenergiebedarf (Korrekturbedarf an 1) |
| Dürfen wir Objektfotos zeigen? | allgemein in Schritt 1 geklärt, nur der Einzelfall in F17-3 | `auftrag.einwilligungen` |
| Du oder Sie? | eine Funktion | `hmAnrede` |
| Gefällt Ihnen der Beitrag? Wie zufrieden sind Sie? | verändert keinen Liefergegenstand; die Rückmeldung läuft über Anmerkungen am Beitrag | nie |
| Welche Hashtags? | Wirkung nicht belegt; Serienname und ein Ort genügen | Schritt 13, 3.5 |
| Welches Staffelthema? | kommt aus seinen Anlässen, eine Wahl würde eine fertige Entscheidung öffnen | `antworten.ausloeser`, Themenvorrat |
| Möchten Sie ein zusätzliches Video dazukaufen? | ein Kauf gehört nicht in eine Freigabe; die Regel löst den Befund innerhalb des Abos | `monatsplan.kontingent`, Entscheidung durch Team oder Owner |
| Wann haben Sie Zeit für den Rückblick? | liegt am Drehtag, den er schon gewählt hat | `betrieb.uhr` |

---

## 5. Eingang und Ausgang

### 5.1 Eingang nach dem Vertrag

| Vertrag | Feld | Wofür in Schritt 17 | Vorhanden im Ausgang des Vorgängers |
|---|---|---|---|
| 16 | `quelle`, darin `plattform.stimme`, `plattform.anrede`, `system`, `bild`, `social.serien`, `social.vorlagen`, `social.grammatik`, `social.kanalplan`, `feed.start30`, `plattform.markenvertrag.erfolgsmass` | einzige Quelle für Plan, Beitrag, Prüfung, Wirkung; über `hmMarkeLesen(mid, "oeffentlich")` | ja, 16, 5.3 (`quelle.inhalt` mit Plattform, System, Bild, Social, Feed; 16, 3.3.1) |
| 16 | `rollout` (`folge` mit Tagen und `rueckblick`, `liveTag`, `drehtag`, `checkliste`) | Anschluss an Block 1, Termin des Rückblicks nach 30 Tagen, Wiederöffnen der Checkliste bei neuer Version | ja, 16, 5.3 |
| 2 | `fragebogen.messung` | `lernen` an Schritt 2 | ja, 02, 5.x (`{fragenVersion, start, ende, sitzungen, jeFrage, abbruch, rueckmeldung}`) |
| 1 | laufender Bestand-Import (neue Objekte) | Anlass-Serie, Objekt-Plätze, Energiekennzahlen | ja; 01, 5 hält ausdrücklich fest: "Schritt 17 liest den laufenden Import, nicht `vorab`" |

### 5.2 Ergänzungen im Eingang, begründet

| Neu | Von | Warum | Folge für die Zerlegung |
|---|---|---|---|
| `freigabe.historie`, `uebergabe.paket` | 16 | vom Vorgänger ausdrücklich angefordert (16, 5.5 Punkt 6): Historie setzt der Änderungsantrag fort; der Stand des Pakets erkennt veraltete Dateien bei Dienstleistern | keine, 16 ist Vorgänger |
| `quelle.gesperrt`, `quelle.blobs` | 16 (Teil von `quelle`) | Sperre ungeprüfter Belege (V8), Prüfsumme der Bilder (V7) | keine |
| laufender Import der **Kontakte** (nur Anlage-Datum, Anlass, Bezirk, Weg, Bezug) | 1 | die Anfragen des Erfolgsmaßes; der Vertrag nennt nur Objekte. Gespeichert werden nur Zählungen, nie Personendaten | keine, 1 ist Vorgänger; Hinweis an 1 in 5.5 |
| `auftrag.einwilligungen` | 1 | Objektfotos, Porträts, Aufzeichnung des Drehtags | keine, 1 ist Vorgänger |
| Insights-Export der Meta Business Suite | extern | Reichweite, Saves, Weiterleitungen je Beitrag | wie in Schritt 1 als extern geführt |
| Quellen und veröffentlichte Captions der anderen UNIO-Makler | extern (Store) | `kohorte`, V11 | wie in Schritten 6, 12, 13, 14 als extern geführt |
| Kontingent des Abos, `HM_FEIERTAGE` | extern (Stammdaten, Kalender) | M8, M11 | keine Kettenfelder |

Nicht als Eingang genommen: die `messung`-Felder der Schritte 5, 6, 7, 8, 13, 14 und 15, die dort "17 (`lernen`)" als Abnehmer nennen. Der Vertrag begrenzt `lernen` auf den Rückfluss an Schritt 2 und 12, und die Liste der Vorgänger ist 1, 2, 16. Diese Messungen gehören in einen Messbericht der Werkbank in den Einstellungen, nicht in die Markenkette (Korrekturbedarf 5.5).

### 5.3 Ausgang nach dem Vertrag und Abnehmer

| Feld | Inhalt | Erzeugt von | Abnehmer |
|---|---|---|---|
| `monatsplan[]` | `{serie, folge, hook, format, tag, kanal, materialBedarf}` je Platz; Hook aus der `hookFormel` | Regeln, Claude für die Formulierung innerhalb der Formel | Drehtag (`hmDrehtagPlan`), Produktion, Freigabe-Ansicht, Team |
| `beitrag[]` | `{serie, vorlage, felder, caption, pruefung {sprache, anrede, codes, grammatik, energiekennzahl, gesicht}, freigabe}`; Freigabe durch den Makler bei gesperrter Vorlage, bei freier Gestaltung durch das Team und danach den Makler (Abweichung, 5.5) | Regeln, Claude (Caption), Team, Makler | Veröffentlichung (Metricool, Meta), `wirkung`, `kohorte`, Freigabe-Ansicht |
| `drehtage[]` | monatlich gebündelt, Fragenliste aus den Serien | Regeln, Claude (Fragen), Team | Makler (Seite), Team (Termin), Produktion; Sammlung `drehtage` im Store |
| `wirkung` | je Serie und Format Reichweite, Saves, Weiterleitungen, Anfragen; nach zwölf Wochen bewertet gegen das Erfolgsmaß | Regeln | Rückblick (Makler), Rückblick nach 30 Tagen in Schritt 16, `aenderungsantrag`, `lernen` |
| `quartal` | `{variable, codesUnveraendert}`; Variable ist Staffelthema (der Serienakzent), Quartalston und Motivthema, dazu `plakat` (Abweichung, 5.5) | Regeln, Team | Plan (Staffelplakat), Renderer (Quartalston), `freigabe.historie` |
| `aenderungsantrag[]` | `{feld, grund, neueVersion}`, nie still | Regeln, Team, Makler | `hmQuelleEinfrieren` (Schritt 16) für die neue Version, `freigabe.historie`, `rollout.checkliste`, `uebergabe.paket` |
| `kohorte` | regelmäßiger Vergleich aller UNIO-Makler in Text und Bild | Regeln | Team, CD; V11 |
| `lernen` | Rückfluss an Schritt 2 (Fragen ohne Wirkung) und Schritt 12 (Formatmix und Gesichtsanteil) | Regeln | Owner; Schritt 2 (`HM_FRAGEN_V2`, `fragenVersion`) und Schritt 12 (Startwerte) nach Entscheidung, nicht blockierend |

Die Nachfolgerliste bleibt leer, wie im Vertrag. `lernen` ist ein Rückfluss mit menschlicher Entscheidung dazwischen und kein Datenfluss in einen Eingang; so bleibt die Kette ohne Kreis.

### 5.4 Ergänzungen im Ausgang, begründet

| Feld | Inhalt | Warum | Abnehmer |
|---|---|---|---|
| `betrieb.uhr` | `{liveTag, bloecke[] {nr, von, bis, wochen[]}, staffeln[] {nr, bloecke}, pausen[] {von, bis, grund}}` | eine Uhr für alle Kreisläufe (3.1) | Plan, Drehtag, Rückblick |
| `monatsplan[].block`, `folgeNr`, `platz`, `klasse`, `belegRef`, `grund`, `status`, `reserve` | Platz im Takt, Begründung, Status "planbar", "wartet", "gedreht", "geprüft", "freigegeben", "veröffentlicht", "Reserve" | Grammatik über die Blockgrenze, Begründung je Platz (wie 13), Ausfallregel | Team, Freigabe-Ansicht |
| `monatsplan[].materialBedarf` als `{was, von, frist, traegtFenster[]}` | der Vertrag nennt das Feld, hier die Struktur | Fristen und Vorrang | Team, Makler (nur seine Aufgaben) |
| `monatsplan.kontingent` | Zählung je Monat, Überschreitung, Eingriff, `entscheidung {weg format, verschieben oder zusatz, von team oder owner, am}` | M8, V14 | Team, Owner; der Makler sieht einen Satz |
| `monatsplan[].reserve`, `betrieb.reserven[]` | je Klasse eine Reserve `{klasse, beitragId, gueltigBis, freigegeben, verbrauchtAm}` | M9, Ausfall, R-1 bis R-7 | Veröffentlichung, Freigabe-Ansicht |
| `betrieb.stoff[]` | Arbeitsstand außerhalb der Quelle: neue Fälle, Antworten, Marktwerte mit Prüfstatus (3.11) | die Quelle bleibt eingefroren, der Betrieb braucht trotzdem neuen Stoff | Planer, V8, M5, Beleg-Nachtrag |
| `betrieb.rezept` | Licht-Setup je Ort, Tageszeitfenster je Jahreszeit, Kamera, `grading` als Token mit Hash, Referenzbilder, Version | Handwerk über zwölf Drehtage (3.4) | `drehtage[]`, V15, Art Director |
| `quartal[].plakat` | `{vorlage, felder {portraet, staffelthema, staffelnummer, quartalston}, stresstest[], diffZuVorher[], abnahme {ad, am}}` | Staffelplakat aus gesperrter Vorlage (3.10) | Plan, Art Director |
| `beitrag[].pruefung.weitere` | V7 bis V14 | Quelle, Belege, Lesbarkeit, Plattform, Kohorte, Einwilligung, Freigabe, Kontingent | Veröffentlichung |
| `beitrag[].freigabe` als `{art makler oder team, sitzung, von, am, anmerkungen[]}` | eine Sitzung je Block, Pins wie Schritt 15 | "die Folge statt jeder Kleinigkeit" | Veröffentlichung, Protokoll |
| `beitrag[].veroeffentlicht` | `{am, kanal, permalink}` | sichere Zuordnung der Insights | `wirkung` |
| `beitrag[].herkunft[]` | `{pfad, art, ref, woertlich}` je Satz | Kennzeichnung "aus Ihrem Drehtag", `lernen` | Freigabe-Ansicht, `lernen` |
| `drehtage[].clips[]`, `fragen[]`, `maklerSeite`, `dauerMin`, `gemessenMin`, `referenz[]`, `eingriffe[]` | Clip-Liste, Fragenliste, Seite, Dauer geplant und gemessen, Referenzbild je Aufbau, Eingriffe aus B18 | Erlebnis, ehrliche Dauer, Handwerk | Makler, Team, `lernen` |
| `wirkung.beitraege[]`, `wirkung.stand30`, `wirkung.bewertung` | Messwerte je Beitrag, Stand nach 30 Tagen, Bewertung je Staffel mit Halbierungsprobe | Rückblicke, Entscheidungsregel | Makler, Schritt 16 (Rückblick), `aenderungsantrag` |
| `aenderungsantrag[].art`, `herkunft`, `diff`, `status`, `cd`, `makler` | Einordnung nach 3.11 | Versionsregel sichtbar | `freigabe.historie` |
| `betrieb.messung` | Minuten und Stunden je Block, Anteil Reserve, fehlender Stoff nach Art | ersetzt die Setzungen | `lernen` |

### 5.5 Korrekturbedarf an Nachbarverträgen

1. **Schritt 1:** Der laufende Import liest auch Kontakte mit den Spalten Anlage-Datum, Anlass, Bezirk, Weg (etwa Notariat) und Bezug (genannter Beitrag), gespeichert als Zählung ohne Personendaten. Die Objekt-Felder aus D2 brauchen zusätzlich den Endenergiebedarf (wie Schritt 12, 5.2 Hinweis 2). `HM_FEIERTAGE` reicht heute bis 06.01.2027 (`wb-shop2.jsx` Zeile 24) und muss für 2027 ergänzt werden.
2. **Schritt 7:** `markenvertrag.erfolgsmass.messung` bei Markus nennt das Lead-Radar. Das Lead-Radar ist die Akquise von Maklern durch UNIO (`wb-betrieb.jsx` Zeile 1). Messung sind die Kontakte aus dem laufenden Import.
3. **Schritt 12:** (a) Der Wochentakt lässt im Dauerbetrieb je Block einen Gesichtsplatz ohne feste Serie; dieser Schritt füllt ihn nach Säulen-Abstand (3.3), Schritt 12 sollte ihn benennen oder eine zweite Serie mit Reel oder Einzelbild mit Gesicht vorsehen. (b) Der Formatmix muss das Kontingent des Abos kennen: Personal Brand hat drei Videos je Monat, der Startwert fünf Reels je vier Wochen passt dort nie; Premium kollidiert in Monaten mit fünf Sendetagen. (c) Schritt 12 definiert `reservefolge` je Serie (12, `serien[]` im Datenvertrag, Zeile 574, und Beispiel Zeile 693). Der Betrieb braucht eine Reserve je Klasse (Gesicht, Sache), weil ein Ausfall einen Platz der Grammatik trifft, nicht eine Serie, und eine Reserve je Serie bei fünf bis sechs Serien Drehzeit ohne Nutzen kostet. Korrektur: `serien[].reservefolge` wird zu `reserven[] {klasse, serie, vorlage, gueltigBis}` mit den Anforderungen R-1 bis R-7 (3.3); bei Markus braucht die Klasse Sache dafür eine Marktquelle. (d) Alteingesessen, Stand Sievering und Vor der Unterschrift brauchen je eine Vorlage `post`: für den freien Gesichtsplatz, für den Kontingent-Eingriff, für Einzelbild-Reserven und für Sachplätze, deren Nachbarn Karussells sind. (e) `maklerMinutenMonat` soll Standbilder, Ankommen und Licht, Ortswechsel und Stoff-Fragen enthalten und Einzelfreigaben durch eine Freigabe der Folge ersetzen; bei Markus 133 statt 114 Minuten (3.16). (f) Alteingesessen steht im Dauerbetrieb zweimal je Block (Rhythmus "einmal im Monat" plus freier Gesichtsplatz); Schritt 12 sollte das als Regel oder als zweite Serie benennen.
4. **Schritte 13 und 16:** Die Beispiele verwenden noch Seriennamen, die vor Schritt 12 gesetzt wurden ("Noch nicht verkaufen", "Sievering in Zahlen", "Der Dienstag"); für die Kontrolle der ganzen Kette auf die Serien aus Schritt 12 umstellen. Eine Lückenkachel in den Wochen 2 bis 4 von `start30` braucht eine öffentliche Füllung; dieser Schritt schlägt die Reserve derselben Klasse vor.
5. **Schritt 16:** Die Versionsregel (3.3.5) um die Kategorie "Setzung durch Messwert ersetzt" als kleine Version ergänzen. Der Rückblick nach 30 Tagen nutzt die Ansicht aus `hmWirkung`, damit es eine Berichtslogik gibt.
6. **Schritte 5, 6, 7, 8, 13, 14, 15:** Die `messung`-Felder nennen "17 (`lernen`)" als Abnehmer. Der Vertrag von Schritt 17 nimmt sie nicht auf; Abnehmer ist ein Messbericht der Werkbank in den Einstellungen. Soll `lernen` sie doch lesen, muss die Zerlegung Schritt 17 diese Vorgänger geben und die Listen symmetrisch ändern.
7. **Schritt 2:** `fragen[].treibt` muss dieselben Pfadnamen verwenden, die die Felder der Quelle als Herkunft tragen, sonst ist `treibtStimmt` nicht rechenbar.
8. **Zerlegung, Vertrag von Schritt 17:** (a) `beitrag.freigabe` bei freier Gestaltung "durch das Team und danach den Makler" statt "durch das Team" (3.7). (b) `quartal` als `{variable {staffelthema, quartalston, motivthema}, plakat, codesUnveraendert}` statt "Serienakzent oder Motivthema"; das Staffelthema ist der Serienakzent, Quartalston und Motivthema folgen aus `system.festUndVariabel` (3.10). (c) Ausgang ergänzen um `betrieb.stoff` (Arbeitsstand außerhalb der Quelle) und `betrieb.rezept`.
9. **Schritt 11:** `fotobrief.lichtUndTageszeit` nennt "Vormittag"; für zwölf Drehtage im Jahr braucht es Uhrzeiten je Jahreszeit und einen Weißabgleich in Kelvin je Ort. Der Betrieb legt sie im Rezept fest (3.4); Schritt 11 kann sie für den ersten Drehtag schon setzen.
10. **Schritt 16:** Die Versionsregel (3.3.5) um "Beleg-Nachtrag" als kleine Version ergänzen und festhalten, dass Stoff aus dem Betrieb außerhalb der Quelle liegt.

---

## 6. Qualitätsprüfung im Schritt

### 6.1 Regeln (automatisch, `hmSelbsttestPflege`, `hmVeroeffentlichungPruefen`)

| Nr. | Prüfung | Bedingung | Folge bei Fehler |
|---|---|---|---|
| B1 | Nur aus der Quelle | jeder Platz mit Serie aus `quelle.inhalt.social.serien`; kein Text aus `HM_IDEEN_VORLAGEN`, `HM_ANLAESSE_Q4`, `HM_PF_FIGUR`, `HM_WELT_HOOKS`, `MARKENQUALITAET` Kapitel 5 | Plan verworfen |
| B2 | Hook nach Formel | feste Wörter der `hookFormel` vorhanden, jeder Platzhalter mit Pfad oder Lücke, höchstens zehn Wörter, im Bild höchstens acht | Platz auf "wartet" |
| B3 | Grammatik über die Blockgrenze | M3 mit den letzten fünf veröffentlichten Beiträgen, Verschiebung 0, 1, 2 | Suche neu |
| B4 | Säulen und Signatur | M4 je Block | Suche neu |
| B5 | Beleg einmal je Staffel, Zahl nur geprüft | M5 | Platz gesperrt |
| B6 | Thema im Fenster | M6 | Suche neu |
| B7 | Reserve je Klasse | M9 und R-1 bis R-7: Serie der Quelle, Ort, eigenes Wort oder geprüfter Beleg, kein Anlass, `gueltigBis`, V1 bis V15 grün, in der Freigabe enthalten | Block nicht freigebbar |
| B8 | Kontingent | M8; Eingriff innerhalb des Abos mit `entscheidung` des Teams, oder Zusatz nur mit Entscheidung des Owners; keine Wahl in der Freigabe-Ansicht | Befund, Block nicht freigebbar |
| B9 | Prüfung vor Veröffentlichung | V1 bis V15 grün unmittelbar vor dem Veröffentlichen | nicht veröffentlicht, Reserve |
| B10 | Keine Frist-Freigabe | kein Beitrag mit `freigabe.auto` im v2-Modus | Selbsttest rot |
| B11 | Freie Gestaltung | Sonderfolge nur mit `freigabe.team` und höchstens eine je Block | gesperrt |
| B12 | Quartal | `codesUnveraendert.ok` mit Hashes; sonst Antrag groß | Wechsel verweigert |
| B13 | Nichts still | jede Abweichung der Abnehmerausgaben von der Quelle hat Antrag, Füllung, Unterlage oder Stammdatum mit Ereignis | Selbsttest rot |
| B14 | Entscheidungsregel Wirkung | Mindestmenge, Halbierungsprobe, Abstand, ein Platz je Staffel, Nebenbedingungen | keine Änderung |
| B15 | Keine Personendaten in `wirkung` | nur Zählungen aus dem Kontakte-Import, Muster wie in `hmSelbsttestShop` | Speichern verweigert |
| B16 | Kohorte | Text unter 5 Prozent oder Hinweis, Bild ohne Kollision im Bezirk | Hinweis oder Sperre |
| B17 | UNIO-Sprache in allen Ansichten für den Makler | keine Gedankenstriche, Ausrufezeichen, Emojis, Eyebrows, Symbole aus Textzeichen | Text zurück |
| B18 | Makler-Zeit | geplanter Drehtag höchstens 120 Minuten einschließlich Stoff-Fragen und Ortswechsel, Monat innerhalb von `maklerMinutenMonat`; Makler-Seite nennt genau die geplante Summe | Befund beim Planen, Eingriffe nach 3.4, bis beides hält |
| B19 | Rezept | `betrieb.rezept` liegt vor, jeder Wert innerhalb von `bild.regeln` (`hmRezeptPruefen`); jede Clip-Liste trägt Referenzbild und Tageszeitfenster; V15 je Bild | Drehtag-Seite gesperrt, bis das Rezept steht |
| B20 | Staffelplakat | nur die Felder Porträt, Staffelthema, Staffelnummer, Quartalston unterscheiden sich vom letzten Plakat; Stresstest mit kürzestem und längstem Thema und ohne Porträt bestanden; Abnahme des Art Directors | Plakat nicht veröffentlichbar |
| B21 | Quelle unberührt vom Stoff | nach jedem Eintrag in `betrieb.stoff` ist die Prüfsumme der Quelle gleich | Selbsttest rot |
| B22 | Uhr | Produktion vier WT, Freigabefenster mindestens fünf WT, Puffer mindestens zwei WT vor dem ersten Beitrag, auch über Feiertage und Pausen | Drehtag wird vorgezogen |
| B23 | Keine halbe Sendewoche | eine Sendewoche beginnt nur mit drei freigegebenen Plätzen | Woche wird Pause |

### 6.2 Menschliche Prüfung

- **Art Director je Block, 25 Minuten:** zuerst das Protokoll von V15 (Graukarte, Lichtrichtung, Tonwerte, Sättigung je Bild gegen Rezept und Referenzbild, rote Werte zuerst), dann die zwölf Beiträge und die Reserven als Profil nebeneinander vor der Freigabe-Ansicht, dazu die letzten zwölf veröffentlichten. Fragen: Wirkt der Feed als Satz von Bildern mit einem Licht und einer Beschnittregel (R6 R11)? Sieht eine Kachel aus wie eine Vorlage? Ist eine Reserve die schwächste Kachel? Erkennt man die Sendung ohne Kennung? Sieht jeder Beitrag aus wie das Markenbuch? Er bestätigt ein neues Referenzbild je Ort.
- **Art Director je Staffel, 15 Minuten:** das neue Staffelplakat neben den beiden letzten, mit markierten Feldunterschieden und Stresstest (3.10); Abnahme mit Name und Datum in `quartal.plakat.abnahme`.
- **Creative Director je Staffel, 30 Minuten:** Kohorte in Text und Bild, Drift des Einzelnen, Abzeichnen jeder kleinen Version, Urteil bei einer Kollision.
- **Team vor dem Rückblick, 60 Minuten:** Zahlen gegen die Rohdaten prüfen, Urteil in einem Satz formulieren, Lautlese-Test der Sätze an den Makler (MARKENQUALITAET Kapitel 2).
- **Owner je fünf Makler:** Vorschläge aus `lernen` entscheiden.

---

## 7. Typische Fehler und wie sie verhindert werden

| Nr. | Fehler | Beispiel aus Bestand oder Praxis | Verhinderung |
|---|---|---|---|
| T1 | Monatsideen aus allgemeinen Mustern | "Mein Dienstag in 5 Stationen." für jeden Makler (`wb-produktion.jsx` Zeile 105) | M1, B1; `HM_IDEEN_VORLAGEN` nur v1 |
| T2 | Anlass als eigene Idee | "Martini: das beste Gansl in [Bezirk]" (Zeile 128), bei allen Maklern gleich | Anlass nur als Variable einer Serie (3.3) |
| T3 | Caption-Formel mit allgemeinem Aufruf | "Wie sehen Sie das? Schreiben Sie mir." (`hmCaption`) | Aufbau aus Schritt 13, Weitergeben-Satz, V1 |
| T4 | Prognose gegen die Pflichtsäule | Persönlich und Markt 16 Punkte, Wie ich arbeite 12 (`hmViralScore`) | Aufgabe je Säule, Nebenbedingungen statt Gewichte (3.9) |
| T5 | Automatische Freigabe | "Ohne Rückmeldung automatisch freigegeben" (`wb-content.jsx` Zeile 142) | keine Frist-Freigabe, Reserve (3.7, B10) |
| T6 | Zwölf Einzelfreigaben je Monat | Freigabe je Beitrag heute | Freigabe der Folge in einer Sitzung |
| T7 | Lücke überspielt | Lückenkachel oder ungeprüfte Zahl geht online, um den Takt zu halten | M5, M10, V8, Ausfallreihenfolge |
| T8 | Takt bricht an der Monatsgrenze | Plan je Kalendermonat mit 13 oder 15 Beiträgen | Blöcke zu zwölf (3.1) |
| T9 | Stille Auslassung | ein Sachplatz fällt aus, drei Gesichter stehen in einer Zeile | kein Auslassen; Reserve, Tausch, Nachreichen mit Reparatur |
| T10 | Look driftet | neues Licht, neue Schrift auf einer Kachel, weil es "frischer" wirkt | Renderer nur aus Tokens, V3, Blick des Art Directors, Quartal nur innerhalb von `festUndVariabel` |
| T11 | Quartalswechsel als Hintertür | ein neues Zeichen "nur für die Staffel" | Hashes der festen Teile (B12) |
| T12 | Reagieren auf Einzelwerte | ein starkes Reel, und der Plan wird umgebaut | Mindestmenge, Median, Halbierungsprobe, ein Platz je Staffel |
| T13 | Unbelegte Ratschläge im Report | "das verdoppelt das Wachstum" (Zeile 720) | nur Aussagen mit Quelle; Satz entfällt |
| T14 | Fremdvergleich entmutigt | Benchmark mit Konten jeder Größe | nur eigenes Maß und eigene letzte Staffel |
| T15 | Kontingent überrascht | sechs Videos im März, Rechnung danach | M8 vier Wochen vorher, Satz in der Freigabe |
| T16 | Kohorte konvergiert | Claude liefert bei allen Maklern ähnliche Hooks | V11 je Beitrag, Konvergenz je Staffel (3.12) |
| T17 | Personendaten im Wirkungsbericht | Namen von Anfragenden | nur Zählungen, B15 |
| T18 | Daten Dritter aus dem Grundbuch | Einlagezahl oder Eigentümer im Bild | V12, Attribut "Diskret", Fragenliste verlangt "ohne Adresse" |
| T19 | Drehtag ohne Plan | Hooks aus dem Weg statt aus Serien (Seed `wb-more.jsx` Zeile 55 bis 60) | `hmDrehtagPlan` nur aus dem Block |
| T20 | Zu viel Makler-Zeit | Drehtag mit acht Folgen und 150 Minuten, angekündigt als "etwa zwei Stunden" | B18 beim Planen, Eingriffe nach 3.4 (Reserve aus dem Kontaktbogen, Standbild statt Reel, ein Gang je Ort), Ankündigung aus dem Plan |
| T23 | Licht driftet über die Drehtage | Winter-Drehtag um 9 Uhr in Grinzing, Bilder kühler und flacher als im Herbst | Rezept mit Tageszeitfenster je Jahreszeit, Graukarte, LUT als Token, Referenzbild auf der Clip-Liste, V15 |
| T24 | Staffelplakat wird neu gestaltet | "für die neue Staffel ein frischer Look" | gesperrte Vorlage, Feld-Diff, Stresstest, Abnahme (B20) |
| T25 | Quelle ändert sich still durch neuen Stoff | neuer Fall landet in `plattform.beweise` | `betrieb.stoff` außerhalb der Quelle, Beleg-Nachtrag als kleine Version, B21 |
| T26 | Die Ausfallkachel ist die generischste | Reserve "Tipps für Eigentümer" ohne Ort und ohne Wort | R-1 bis R-7, V11, B7 |
| T27 | Kauf in der Freigabe | "Sechstes Video dazubuchen?" neben der Freigabe, mit Preis | Kontingent ist Sache von Regel, Team und Owner (3.3, B8) |
| T21 | Änderung als "Kleinigkeit" getarnt | Serienname geändert über eine Anmerkung | Anmerkung vs Antrag getrennt (3.7, 3.11) |
| T22 | Alte Dateien bei Dienstleistern | Druckerei nutzt Tokens der Version 1.1 nach 1.2 | Version im Dateinamen, Paket neu, Checkliste öffnet sich |

---

## 8. Umsetzung in der Werkbank

### 8.1 Dateien

| Datei | Änderung |
|---|---|
| `ui_kits/werkbank/wb-pflege.jsx` (neu; nicht `wb-betrieb.jsx`, das Lead-Radar und Selbsttest enthält) | Datenschicht und Regeln: `hmUhr`, `hmMonatsplan`, `hmHookAufloesen`, `hmPlanPruefen`, `hmKontingent`, `hmReserve`, `hmStoff`, `hmDrehtagPlan`, `hmDrehzeit`, `hmRezeptPruefen`, `hmRezeptMessen` (Canvas-Pixel, Graukarte, Delta E 2000, Tonwerte), `hmBeitragBauen`, `hmVeroeffentlichungPruefen`, `hmFolgeFreigeben`, `hmWirkungImport`, `hmWirkung`, `hmFormatmixNeu`, `hmGesichtNeu`, `hmQuartalPruefen`, `hmPlakatStresstest`, `hmAenderungEinordnen`, `hmAenderungsantrag`, `hmKohortePflege`, `hmLernenFragen`, `hmLernenSetzungen`, `hmSelbsttestPflege`. Oberfläche: `MonatsplanTeam` (zwölf Plätze, Reserven, Status, Stoff, Seitenpanel für Details), `RezeptTeam` (Aufbau je Ort, Referenzbilder, V15-Protokoll), `FolgeFreigabe` (Makler), `DrehtagSeite` (Makler), `Rueckblick` (Makler), `WirkungTeam`. Präfix `hm`, Export über `Object.assign(window, ...)`, kein `import()`, `React.useState` ohne Neudeklaration |
| `ui_kits/werkbank/index.html` | Script-Tag für `wb-pflege.jsx` nach `wb-social.jsx` (Schritt 12) und `wb-freigabe.jsx` (Schritt 16), vor `wb-content.jsx` |
| `wb-produktion.jsx` | `IdeenGenerator` ruft für Makler mit Quelle `hmMonatsplan`; `hmIdeen`, `HM_IDEEN_VORLAGEN` und `HM_ANLAESSE_Q4` nur für v1; in `hmReportAus` entfallen die Sätze ohne Quelle (Zeile 720, 738) |
| `wb-os-data.jsx` | `hmCaption` und `hmViralScore` nur v1; `hmSkriptCheck` bekommt einen v2-Zweig "folgt der Hook-Formel" statt Zahl oder Frage im ersten Satz |
| `wb-content.jsx` | Beitrag mit `serie`, `vorlage`, `platz`, `pruefung`; im v2-Modus keine Frist-Freigabe (Zeile 142, 144, 323) und keine Zählung von Änderungswünschen je Beitrag; Freigabe der Folge als eigene Ansicht; Zustand "Reserve"; `veroeffentlicht.permalink` |
| `wb-more.jsx` | `drehtage` erhalten `plan` aus `hmDrehtagPlan`; `HM_REGELN` Eintrag "Freigabe-Latenz" ohne "Auto-Freigabe erklären", Eintrag "Gesichts-Quote" ohne unbelegte Prozentangabe |
| `wb-reel.jsx`, `wb-markenwelten.jsx` | Renderer lesen Tokens und Vorlagen aus der Quelle (Umbau aus Schritten 12, 13, 16); hier nur Aufruf |
| `wb-werkzeuge.jsx` | `HM_IMPORT_FELDER.kontakte` um Anlage-Datum, Anlass, Weg, Bezug; Speicherung der Zählung ohne Personendaten für `wirkung` |
| `wb-shop2.jsx` | `HM_FEIERTAGE` für 2027 ergänzen |
| `wb-betrieb.jsx` | Selbsttest-Gruppe `["Pflege", window.hmSelbsttestPflege]` |
| `api/wb-marke.js` | Phase `betrieb` mit Schema 8.3; kleine Aufrufe je Block und je Beitrag, Prompt-Cache für Stimme und Serien |
| `docs/werkbank/MARKE_SCHEMA.md` | Abschnitt `betrieb` |

### 8.2 Datenvertrag im Store

```js
// hmStore, versioniert wie die übrigen v2-Objekte; liest nur die Quelle über hmMarkeLesen(mid, "oeffentlich")
marke2[mid].betrieb = {
  uhr: { liveTag: "ISO", bloecke: [{ nr, von, bis, wochen: [{ nr, von, bis }] }], staffeln: [{ nr, bloecke: [] }], pausen: [{ von, bis, grund }] },
  monatsplan: [{                                  // ein Eintrag je Platz, gruppiert nach block
    block, folgeNr, platz, klasse: "gesicht" | "sache", tag: "ISO", uhrzeit,
    serie, folge, format: "post" | "karussell" | "reelTitel" | "story", kanal: ["instagram", "linkedin"],
    hook: { text, platzhalter: [{ name, wert, pfad, luecke }] }, belegRef: null,
    materialBedarf: [{ was, von: "makler" | "team" | "import" | "drehtag", frist, traegtFenster: [] }],
    grund, status: "planbar" | "wartet" | "gedreht" | "geprueft" | "freigegeben" | "veroeffentlicht" | "reserve",
    reserve: false, quelleVersion
  }],
  kontingent: [{ monat, videos: { plan, abo }, grafiken: { plan, abo }, fotos: { plan, abo },
    eingriff: { art: "format" | "verschieben" | null, plaetze: [], satzMakler },
    entscheidung: { weg: "format" | "verschieben" | "zusatz", von: "team" | "owner", am } }],   // "zusatz" nur mit von "owner"
  reserven: [{ klasse: "gesicht" | "sache", beitragId, serie, gueltigBis: "ISO", freigegeben: false, verbrauchtAm: null, ersetztDurch: null }],
  stoff: [{ id, art: "fall" | "antwort" | "marktwert", text, herkunft: { quelle, datum, drehtag, aufzeichnung },
    zahl, einheit, stand, url, pruefstatus: "selbstauskunft" | "unterlage_geprueft" | "gesperrt", sperrgrund,
    oeffentlich, fuerSerie, verwendetIn: [], uebernommenIn: null }],               // nie Teil der Quelle
  rezept: { version, abgenommen: { ad, am }, orte: [{ ort, lichtquelle, richtung, abstandFensterM, kamera: { hoehe, brennweiteKB }, aufhellung, nie: [], aufbauFoto }],
    fenster: { winter: ["10:00", "12:00"], uebergang: ["09:00", "11:30"], sommer: ["08:30", "10:30"] },
    kamera: { weissabgleichK: { /* je ort */ }, belichtung: "manuell", profil },
    grading: { lut, sha256, weissabgleichK, saettigung, tiefenAuf },
    referenzen: [{ ort, aufbau, datei, graukarteLab, helligkeitMedian, tiefenP5, saettigung, gesichtVerhaeltnis, bestaetigt: { ad, am } }],
    schwellen: { deltaE: 3, helligkeit: 0.08, saettigung: 0.10, gesichtVerhaeltnis: 0.15 } },
  beitraege: [{
    id, block, folgeNr, platz, serie, folgeInSerie, vorlage, felder: {}, hook, caption: { instagram, linkedin },
    seiten: [], skript: [], belegRefs: [], herkunft: [{ pfad, art, ref, woertlich }], quelleVersion,
    pruefung: { sprache: {}, anrede: {}, codes: {}, grammatik: {}, energiekennzahl: {}, gesicht: {},
      weitere: { quelle: {}, belege: {}, lesbarkeit: {}, plattform: {}, kohorteText: {}, einwilligung: {}, freigabe: {}, kontingent: {}, rezept: {} }, stand },
    freigabe: { art: "makler" | "team", sitzung, von, am, team: null, anmerkungen: [{ art, text, antwort }] },
    veroeffentlicht: null                          // { am, kanal, permalink }
  }],
  drehtage: [{ block, datum, ort, dauerMin, gemessenMin: null, eingriffe: [{ regel: "B18", was, minuten }], referenz: [], rezeptVersion,
    clips: [{ platz, serie, folge, ort, titelbild, saetze: [], broll, datei: null, v15: null }],
    standbilder: [], fragen: [{ serie, text, zweck }], stoffFragen: [{ text, zielfeld, antwort: null }], maklerSeite: {} }],
  wirkung: {
    beitraege: [{ id, permalink, stand, reichweite, aufrufe, saves, weiterleitungen, kommentare, follows, anfragenBezug }],
    anfragen: [{ woche, merkmalErfuellt, ueberWeg: {}, gesamt }],          // nur Zählungen
    stand30: { stichtag, termin, zeilen: [], anfragen, unterlagen: [] },
    bewertung: [{ staffel, stichtag, erfolgsmass: { merkmal, wert, ausgangswert, urteil, grund },
      jeSerie: [{ serie, format, n, kennzahl, median, spanne, reichweiteMedian, anfragenBezug }],
      formatmix: { vorher, vorschlag, bedingungen: { mindestmenge, haelften, abstand }, ergebnis },
      gesicht: { vorher, vorschlag, ergebnis } }]
  },
  quartal: [{ staffel, beginn, quelleVersion, variable: { staffelthema: {}, quartalston: {}, motivthema: {} },
    plakat: { vorlage, felder: { portraet, staffelthema, staffelnummer, quartalston }, stresstest: [], diffZuVorher: [], abnahme: { ad, am } },
    codesUnveraendert: { ok, geprueft: [] } }],
  aenderungsantraege: [{ id, feld, grund, neueVersion, art, herkunft: "makler" | "team" | "regel" | "lernen", diff: [], status: "offen" | "abgezeichnet" | "bestaetigt" | "abgelehnt" | "eingefroren", cd: null, makler: null }],
  kohorte: { stand, text: [], bild: [], konvergenz: [], drift: {} },
  lernen: { fragen: [], setzungen: [], stand, entschiedenVon: null },
  messung: [{ block, maklerMin: { drehtag, freigabe, stoff }, teamStd, reserveAnteil, pausenOhneFreigabe, stoffFehlt: [{ art, anzahl }] }]
};
```

Personendaten: keine. Anfragen sind Zählungen; Namen, Mailadressen und Telefonnummern werden beim Import verworfen (Prüfung B15).

### 8.3 Schema für Structured Outputs der Claude-Kette (Phase `betrieb`)

Die Kette nutzt `output_config.format` mit `json_schema` wie die übrigen Phasen (`api/wb-marke.js` Zeile 202). Claude bekommt nur Stimme, Anrede je Kanal, Serie mit Formel und Ablauf, den Stoff des Platzes mit Pfaden und die Belege mit Status, nie Rohantworten oder Kontaktdaten.

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": ["hooks", "captions", "fragen"],
  "properties": {
    "hooks": { "type": "array", "items": { "type": "object", "additionalProperties": false,
      "required": ["platz", "text", "platzhalter"],
      "properties": {
        "platz": { "type": "integer" },
        "text": { "type": "string", "description": "Nur die festen Wörter der hookFormel plus Werte aus platzhalter; höchstens zehn Wörter; Anrede nur als {Sie|du}" },
        "platzhalter": { "type": "array", "items": { "type": "object", "additionalProperties": false,
          "required": ["name", "wert", "pfad"],
          "properties": { "name": { "type": "string" }, "wert": { "type": "string" }, "pfad": { "type": "string", "description": "Pfad in Quelle, Themenvorrat oder Drehtag; leer heißt Lücke" } } } } } } },
    "captions": { "type": "array", "items": { "type": "object", "additionalProperties": false,
      "required": ["beitrag", "kanal", "text", "belegRefs", "weitergeben"],
      "properties": {
        "beitrag": { "type": "string" }, "kanal": { "type": "string" },
        "text": { "type": "string", "description": "Hook, zwei bis vier kurze Sätze, Beleg wörtlich, Satz zum Weitergeben; keine Zahl ohne belegRef" },
        "belegRefs": { "type": "array", "items": { "type": "string" } },
        "weitergeben": { "type": "string", "description": "an eine bestimmte Person oder Rolle aus Anlass oder Zielgruppe" } } } },
    "fragen": { "type": "array", "items": { "type": "object", "additionalProperties": false,
      "required": ["clip", "text", "schritt"],
      "properties": { "clip": { "type": "string" }, "text": { "type": "string", "description": "Arbeitsanweisung im Ton der Stimme, ein Satz" }, "schritt": { "type": "string", "description": "Schritt aus serien.ablauf" } } } },
    "rueckblickSaetze": { "type": "array", "items": { "type": "object", "additionalProperties": false,
      "required": ["serie", "satz", "zahlRef"],
      "properties": { "serie": { "type": "string" }, "satz": { "type": "string", "description": "höchstens zwei Sätze, nur aus den gelieferten Zahlen, keine neue Deutung" }, "zahlRef": { "type": "string" } } } }
  }
}
```

Nach der Antwort laufen B2, V1, V2, V8 und V11 über jeden Text. Ein Hook, dessen feste Wörter fehlen, eine Zahl ohne Beleg oder eine gebrochene Anrede gehen zurück; zwei Fehlversuche führen zum Regelpfad für diesen Platz. Aufwand der Kette: je Block ein Aufruf für Hooks und Fragen, je Beitrag einer für Captions (Kosten Lücke, zu messen wie in Schritt 6).

### 8.4 Regelpfad ohne Claude

Dieselbe Struktur. Plan, Grammatik, Kontingent, Reserve, Prüfungen, Wirkung, Quartal, Kohorte und Lernen sind ohnehin Regeln. Hooks: nur Platzhalter, die ein Feld füllt; sonst Lücke mit Quelle. Captions: Hook, Beleg wörtlich aus `beweise[].beleg`, Weitergeben-Satz aus der Serie (12, Tabelle der Serien, Zeile "Weitergeben"); Einlösung als Lücke "Kommt aus der Redaktion". Fragen: die Schritte aus `serien[].ablauf` mit dem Titel des Themenvorrats. Rückblick: feste Sätze aus Serie, Kennzahl und Wert ("Zeitwert, 12 Folgen: im Mittel [Zahl] Weiterleitungen je 1.000 Erreichte."). Kein Satz, der nach Marke klingen soll.

### 8.5 Selbsttest `hmSelbsttestPflege()`

1. Uhr für Markus: Live-Tag 24.11.2026 und Pause 20.12.2026 bis 11.01.2027 ergeben Block 2 vom 12.01. bis 06.02.2027, Drehtag 03.12.2026, Freigabe-Ansicht 11.12. (über den Feiertag 08.12.), Fensterende 17.12., Stichtag 13.03.2027, Rückblick 18.03.2027 und Block 6 als ersten Block einer Änderung aus dem Rückblick. Ein zusätzlicher Feiertag in der Produktion zieht den Drehtag vor, das Freigabefenster bleibt fünf WT.
2. Planer: Block 2 für den Testmakler hat zwölf Plätze, acht Gesichter, jedes Fenster eines bis zwei, Gegenton nur auf 14, 18, 22.
3. Grammatik über die Blockgrenze: Folge 10 bis 15 wird mitgeprüft; eine absichtlich falsche Belegung an der Grenze wird erkannt.
4. B1: Ein eingeschleuster Titel aus `HM_IDEEN_VORLAGEN` wird gefunden.
5. B2: Ein Hook ohne die festen Wörter der Formel fällt durch; ein Platzhalter ohne Pfad wird Lücke.
6. M5: Ein Beleg, der in derselben Staffel schon in einer anderen Serie steht, sperrt den Platz; ein Pfad aus `quelle.gesperrt` sperrt.
7. M6: Eine Zeitwert-Folge "Wenn ein Mietvertrag ausläuft" auf Platz 19 oder 22 neben Vor der Unterschrift 04 "Der Mietvertrag" auf Platz 23 wird erkannt.
8. M8: Februar 2027 ergibt sechs Videos, wenn der freie Gesichtsplatz von Block 3 ein Reel ist, März 2027 sechs mit Alteingesessen als Reel; die Regel setzt beide Male den Formatwechsel auf Einzelbild, das Team bestätigt, und die Freigabe-Ansicht enthält einen Satz, keine Wahl und keinen Preis. Ein Weg "zusatz" ohne `von: "owner"` wird verweigert.
9. M9: Ein Block ohne Reserve Sache geht nicht in die Freigabe-Ansicht.
10. Ausfall: Fällt ein einzelner Beitrag aus, läuft die Reserve derselben Klasse; ist sie verbraucht, der Tausch; greift nichts, wird die nächste Sendewoche Pause. Fehlt die Freigabe der Folge, wird die erste Sendewoche Pause und die Reserven bleiben unberührt; nie erscheint ein unfreigegebener Beitrag, nie eine halbe Woche.
11. V1 bis V15: je ein Negativfall (Klischee, gemischte Anrede, ein Code, Objekt ohne HWB, Kopf außerhalb der sicheren Zone, Prüfsumme falsch, Zahl ohne Unterlage, Zahl aus einem gesperrten Grundbuch-Stoff, Schrift unter 92 px, Wasserzeichen-Flag, Kohorte über 15 Prozent, fehlende Einwilligung, fehlende Freigabe, Kontingent, ein Testbild mit um 900 K verschobenem Weißabgleich und eines mit Licht von der falschen Seite).
12. B10: Im v2-Modus gibt es keinen Pfad zu `freigabe.auto`.
13. Wirkung: `hmWirkung` mit `HM_INSIGHTS_BEISPIEL` (Testdaten aus `wb-produktion.jsx`, nicht Markus) rechnet Mediane je Format; mit weniger als sechs Beiträgen je Format bleibt der Formatmix "bestätigt".
14. Halbierungsprobe: Widersprechen sich die Hälften, gibt es keinen Vorschlag.
15. Nebenbedingungen: Ein Vorschlag, der die Pflichtsäule unter 15 Prozent brächte, wird verworfen.
16. Gesicht: Ein Vorschlag über acht je zwölf wird als Befund für `lernen` gemeldet, nie als Änderung.
17. Quartal: Ein geänderter Hash an der Wortmarke macht aus dem Wechsel einen Antrag groß.
18. Anträge: Formatmix-Änderung wird klein, Seriennamen der Signatur groß, Unterlage und Füllung ohne Version.
19. B15: Ein Kontakt mit Name und Telefonnummer wird beim Import auf eine Zählung reduziert.
20. Lernen: Ein Frage-Key, den keine Herkunft zitiert, bekommt den Vorschlag "streichen", sobald fünf Testmakler mit Quelle vorliegen.
21. B18: Ein Plan mit 145 Minuten Drehzeit feuert B18; nach den Eingriffen aus 3.4 liegt er bei höchstens 120, und die Makler-Seite nennt genau die geplante Summe.
22. Stoff: Ein neuer Fall aus F17-2 landet in `betrieb.stoff`; die Prüfsumme der Quelle bleibt gleich; V8 lässt seine Zahl erst mit "unterlage_geprueft" durch; ein Beleg-Nachtrag erzeugt eine kleine Version.
23. Reserve: Eine Reserve ohne Ort, eigenes Wort und geprüften Beleg oder mit Datumsbezug fällt durch R-2 oder R-3; eine Reserve mit abgelaufenem `gueltigBis` zählt nicht für M9.
24. Rezept: Ein Rezeptwert außerhalb von `bild.regeln` (etwa Aufhellung mit Dauerlicht) wird von `hmRezeptPruefen` als Änderungsantrag erkannt, nicht übernommen; eine Clip-Liste ohne Referenzbild sperrt die Drehtag-Seite.
25. Staffelplakat: Ein geändertes Feld außerhalb von Porträt, Staffelthema, Staffelnummer und Quartalston wird im Diff erkannt; ein Thema mit 25 Zeichen fällt im Stresstest durch; ohne Porträt verschiebt der Planer den Staffelstart.
26. Änderung nach dem Rückblick: Eine am Rückblick bestätigte kleine Version gilt nicht für den Block, dessen Plan vorher entstand.

Der Testmakler hat die Kennung `selbsttest_pf2` und wird danach entfernt, wie `selbsttest_pf` in `wb-plattform.jsx`.

### 8.6 Aufwand

| Baustein | Personentage (Setzung) |
|---|---|
| Uhr, Pausen, Feiertage | 0,5 |
| Monatsplan mit Suche, Grammatik über die Blockgrenze, M1 bis M11, Begründung, Stoff und Fristen | 2,5 |
| Hook-Auflösung und Bindung von `hmSkriptCheck` an die Formel | 0,5 |
| Kontingent mit Wegen | 0,5 |
| Drehtag-Plan, Fragenliste, Makler-Seite | 1 |
| Beitrag bauen aus Vorlage und Renderer (auf den Umbauten aus 12, 13, 16) | 1 |
| Prüfungen V1 bis V14 | 1,5 |
| Freigabe der Folge mit Anmerkungen, Reserve, Umbau `wb-content.jsx` ohne Frist-Freigabe | 1,5 |
| Wirkung: Import mit Permalink, Kontakte als Zählung, Kennzahlen, Rückblicke, Entscheidungsregel | 2 |
| Quartal mit Hash-Prüfung | 0,5 |
| Änderungsantrag mit Einordnung, Anschluss an `hmQuelleEinfrieren` | 1 |
| Kohorte im Betrieb (Funktionen aus Schritt 14) | 0,5 |
| Lernen an 2 und 12 | 1 |
| Phase `betrieb` in `api/wb-marke.js` mit Regelpfad | 0,5 |
| Rezept: Aufbau je Ort, LUT als Token, Referenzbilder, Messung V15 im Browser | 1,5 |
| Staffelplakat: Feld-Diff und Stresstest | 0,5 |
| Stoff als Arbeitsstand, Beleg-Nachtrag | 0,5 |
| Selbsttest | 1 |
| Doku | 0,5 |
| **Summe** | **18,5** |

**Arbeitszeit des Teams je Makler und Block** (Setzung, zu messen mit `betrieb.messung`): Plan prüfen und Stoff holen 45 Minuten, Drehtag planen 30 Minuten, Drehtag 2 Stunden plus Wege, Sortieren 45 Minuten, Produktion der zwölf Rasterbeiträge 10 Stunden (Setzung aus Schritt 12: 2,5 Stunden je Woche bei drei Rasterbeiträgen), Rezept vorbereiten und Graukarten auswerten 20 Minuten, Blick des Art Directors mit V15-Protokoll 25 Minuten, Freigabe betreuen 15 Minuten, Einplanen 20 Minuten, Insights und Kontakte einlesen 40 Minuten. Zusammen rund 16 Stunden je Block. Je Staffel zusätzlich: Rückblick vorbereiten 1 Stunde und Termin 30 Minuten, Staffelplakat aus der Vorlage mit Stresstest 45 Minuten und Abnahme 15 Minuten, CD 30 Minuten. Am ersten Drehtag einmalig: Rezept aufbauen und abnehmen 2 Stunden. Keine Konten des Maklers bei fremden Werkzeugen nötig: Veröffentlichung und Insights laufen über den Partnerzugang für UNIO und über Metricool mit dem Konto von UNIO.

**Zeit des Maklers je Block** (Setzung): Drehtag-Seite 3 Minuten, Drehtag 60 bis 120 Minuten einschließlich der Stoff-Fragen und eines Ortswechsels, Unterlagen wenige Minuten, Freigabe 8 bis 12 Minuten; bei Markus rund 133 Minuten im Monat. Je Staffel ein Rückblick von 20 bis 30 Minuten vor dem Drehtag. Jede Dauer steht vorher in seiner Ansicht und kommt aus dem Plan, nicht aus einer Pauschale.

---

## 9. Offene Punkte und Lücken

1. **Kontingent je Monat oder je vier Wochen.** Das Abo zählt je Kalendermonat, der Takt je vier Wochen. Die Regel löst Überschreitungen heute durch einen Formatwechsel innerhalb der Serie (Beispiele Februar und März 2027), das kostet aber Reels. Grundsätzlich entscheidet der Owner: Kontingent je Block statt je Monat oder ein anderer Formatmix für Premium; für Personal Brand mit drei Videos muss Schritt 12 ohnehin anders rechnen.
2. **Zusätzliches Video.** Ein Preis steht nicht im Katalog (`HM_KATALOG`). Ob es je Makler einen Zusatz gibt, entscheidet nur der Owner; der Makler bekommt ihn nie als Wahl in der Freigabe.
3. **Wann ein Beitrag seine Werte sammelt**, ist nicht belegt. Sieben Tage als Messstand sind eine Setzung.
4. **Anfragen mit Bezug auf einen Beitrag:** wie oft Anfragende einen Beitrag nennen und ob die Makler das im eigenen System festhalten, ist unbekannt. Ohne diese Angabe misst `wirkung` Anfragen nur für die Marke insgesamt.
5. **Makler-Daten fehlen** in allen Quellen (R6 1.2). Mindestmenge sechs, Abstand 25 Prozent und ein Platz je Staffel sind Setzungen, die sich an den ersten fünf Maklern bewähren müssen.
6. **Pausen:** ob die Weihnachtspause für alle Makler gilt oder je Makler aus seinem festen Termin folgt, entscheidet der Owner. Das Beispiel nimmt sie für Markus an, weil sein Sendetag an einem Termin hängt, der dann nicht stattfindet.
7. **Plattform:** Reorder grid ist seit Juni 2026 allgemein verfügbar (Beleg oben); ob ein umgeordneter Beitrag Folgen für die Verteilung hat, ist nicht belegt. Die Werkbank nutzt es nur zur Reparatur. Die Zahl der angepinnten Beiträge bleibt offen (R6 R12).
8. **Kohortengröße** für Text- und Bildprüfung ist offen (R4 offene Frage 1).
9. **Rechtsrahmen:** anonymisierte Werte aus dem Grundbuch in öffentlichen Beiträgen, Aufzeichnung der Stoff-Fragen am Drehtag, Kontakte-Import als Zählung. Vor dem Einsatz zu klären, keine Rechtsberatung in diesem Dokument. Bis dahin sind Grundbuch-Werte als Stoff gesperrt (M5, V8), der Planer schlägt sie nicht als Eingriff vor, und das Beispiel nutzt eine Marktquelle.
14. **Rezept-Schwellen:** Delta E 3 an der Graukarte, plus minus 8 Prozent Helligkeit, plus minus 10 Prozent Sättigung und plus minus 15 Prozent Gesichtsverhältnis sind Setzungen; sie werden an den ersten zwölf Drehtagen gegen das Urteil des Art Directors kalibriert. Die Uhrzeiten der Tageszeitfenster prüft das Team am Ort.
10. **Du oder Sie gegenüber dem Makler** in den Ansichten dieses Schritts (00_ZERLEGUNG 7.1). Das Beispiel nutzt Sie, weil Markus überall Sie wählt.
11. **Claude-Kette im Betrieb:** Ohne `ANTHROPIC_API_KEY` läuft der Regelpfad mit mehr Redaktionszeit (00_ZERLEGUNG 7.10). Kosten je Block sind eine Lücke.
12. **Server-Datenhaltung:** Freigabe der Folge und Rückblick am Telefon des Maklers brauchen die Datenhaltung auf dem Server (FAHRPLAN, wie Schritt 16, 9.4).
13. **Markenarchitektur UNIO und Makler** (R5 offen): ob Beiträge im Betrieb einen UNIO-Absender tragen.

---

## Quellen

Intern: `../00_ZERLEGUNG.md`, `../bestand/KETTE_IST.md`, `../bestand/FRAGEN_WIRKUNG_IST.md`, `../research/R1-studios.md`, `R2-art-direction.md`, `R4-tools.md`, `R5-makler.md`, `R6-social-system.md`, `R7-evidenz.md`, `R8-kundenerlebnis.md`, `01_auftakt.md`, `02_fragebogen.md`, `07_positionierung.md`, `10_system.md`, `11_bild.md`, `12_social.md`, `13_feed.md`, `14_markenbuch.md`, `16_freigabe.md`, `docs/werkbank/MARKENQUALITAET.md`, `docs/werkbank/MARKE_SCHEMA.md`, `ui_kits/werkbank/CLAUDE.md`; Code in `ui_kits/werkbank/`: `wb-produktion.jsx` (Zeile 82 bis 239, 584, 620 bis 745), `wb-os-data.jsx` (Zeile 6, 182 bis 213), `wb-content.jsx` (Zeile 5, 142 bis 146, 323 bis 328), `wb-more.jsx` (Zeile 11 bis 35, 47 bis 60), `wb-store.jsx` (Zeile 35 bis 68), `wb-betrieb.jsx` (Zeile 1, 53, 89 bis 111), `wb-werkzeuge.jsx` (Zeile 125 bis 128), `wb-shop2.jsx` (Zeile 24 bis 26), `wb-einrichtung.jsx` (Zeile 120 bis 142); `api/wb-marke.js`.

Studios und Praxis
- Pentagram, Public Theater: https://www.pentagram.com/work/the-public-theater-2020-2021-season
- The Brand Identity x Brandpad, Pentagram, How&How, Studio Blackburn: https://the-brandidentity.com/interview/presented-by-brandpad-how-to-systemise-a-brand-featuring-pentagram-how-how-and-studio-blackburn
- Albert Hill, The Modern House, bei Aufi: https://www.aufi.com/insights/modern-house-albert-hill-design
- NAR Magazine, Glennda Baker: https://www.nar.realtor/magazine/real-estate-news/technology/how-this-agent-is-making-six-figures-on-tiktok
- BAM, Auswertung NAR 2025: https://nowbam.com/how-home-buyers-and-sellers-find-their-agents-in-2025/
- Ehrenberg-Bass, Distinctive Asset Measurement: https://marketingscience.info/learn-with-us/commercial-research/distinctive-asset
- Marketing Week, JKR und Ipsos: https://www.marketingweek.com/15-brand-assets-truly-distinctive-finds-research/

Werkzeuge und Plattformen
- Canva Template Locks: https://www.canva.com/help/brand-template-locks/
- Canva Brand Controls: https://www.canva.com/help/brand-control/
- Figma Help, Bulk Create in Buzz: https://help.figma.com/hc/en-us/articles/31271824185623-Bulk-create-assets-in-Figma-Buzz
- Frontify Brand Portal: https://www.frontify.com/en/brand-portal
- Later Visual Planner: https://later.com/visual-planner/
- Instagram, Ranking Explained: https://about.instagram.com/blog/announcements/instagram-ranking-explained
- Social Media Today, Reorder grid: https://www.socialmediatoday.com/news/instagram-releases-profile-grid-rearranging/822304/
- Socialinsider Engagement Report: https://www.socialinsider.io/social-media-benchmarks/instagram-engagement-report
- W3C, WCAG 2.2, 1.4.3: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

Studien
- Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290
- Moulard, Garrity, Rice 2015: https://doi.org/10.1002/mar.20771
- Fuchs, Prandelli, Schreier 2010: https://doi.org/10.1509/jmkg.74.1.65
- Buell und Norton 2011: https://doi.org/10.1287/mnsc.1110.1376
