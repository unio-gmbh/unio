# Schritt 9. Visuelle Idee und Gestaltungsbrief (`idee`)

Stand 30.09.2026, Fassung 2 nach der Kontrolle. Entwurf zur Freigabe durch den Owner. Teil von Branding v2, Vertrag in `../00_ZERLEGUNG.md` Kapitel 3, Schritt 9. Muster: `muster/09_idee.html` mit Render `muster/09_idee.png`, erzeugt von `muster/09_idee_gen.py`.

**Lesart** wie in der Zerlegung. *Belegt* heißt: steht in einer Quelle mit URL oder in einer genannten Datei. *Ableitung* heißt: eigene Folgerung. *Setzung* heißt: bewusst gesetzter Startwert, der an den ersten Maklern gemessen wird. *Lücke* heißt: wir wissen es nicht. Der Maßstab "Top-Studio" ist eine Ableitung aus R1, R2 und R8, keine Aussage darüber, wie ein bestimmtes Studio intern arbeitet.

Gelesen: `research/R1-studios.md` bis `R8-kundenerlebnis.md`, `bestand/KETTE_IST.md`, `bestand/FRAGEN_WIRKUNG_IST.md`, die Nachbarschritte `03_vorlieben.md`, `05_einsicht.md`, `06_territorien.md`, `07_positionierung.md`, `10_system.md`, `11_bild.md`, `12_social.md`, `13_feed.md`, `14_markenbuch.md`, `15_reveal.md`, `docs/werkbank/MARKE_SCHEMA.md`, `docs/werkbank/MARKENQUALITAET.md` (Kapitel 5), Code `ui_kits/werkbank/wb-markenwelten.jsx` (HM_MARKENWELTEN, hmWeltVorschlag, WeltWahl, Renderer), `wb-plattform.jsx` (hmPfVisuell, Selbsttest), `wb-store.jsx` (Seed Markus, Nachrichten n1 und n2), `api/wb-marke.js` (Kette, Schemas), `ui_kits/werkbank/CLAUDE.md`.

**Was sich gegenüber Fassung 1 geändert hat.** Schritt 9 ist ausdrücklich die einzige Quelle für Zeichen, Grammatik und Achse, mit Versionssperre gegen die Nachbarn (3.11, 5.2, Q14). Die Achsen stehen als eine Konstante `HM_IDEE_ACHSEN` mit den erlaubten Differenzfeldern für die Schritte 10, 11 und 12 (3.6). "Ja, dunkel passt." zählt nicht mehr als eigener Satz zur Form, weil er auf eine Vorauswahl des Teams antwortet; die Achse für Markus folgt deshalb der Regelstufe 3 und heißt jetzt `ausschnitt` (3.11). Das Zeitmaß erscheint nur noch bei belegter Dauer oder relevantem Stand, der Punkt-Zustand als Füllstoff ist abgeschafft (3.7). Das Zeichen hat Mindestmaße im Profilraster, und der Wandtest hat eine vierte Ansicht (3.5, 3.12). `brief.kernsatz` ist ein Verweis auf `markenvertrag.leitidee` (3.3). Breite wird nach Wirkung gezählt, Claude entwirft höchstens acht Varianten (3.4). Ein gerechnetes Muster liegt vor.

---

## 0. Kurzfassung

1. Dieser Schritt ist Art Direction, keine Auswahl. Aus einem bestätigten Vertrag entsteht genau eine visuelle Idee, aus der Zeichen, Schrift, Farbe und Bild folgen. Schritt 9 ist die einzige Quelle für Zeichen, Grammatik und Achse; die Schritte 10 und 11 lesen sie mit Version.
2. **Der Brief** passt auf eine Seite und erzeugt keinen neuen Ein-Satz-Wert. Kernsatz, Einsicht, Belege, Ton, Verbote und Erfolgsmaß sind Verweise. Neu geschrieben werden nur Aufgabe, Publikum als Person, Pflichten und drei bis fünf harte Einschränkungen.
3. **Die Idee** ist ein Satz, der auf den Claim antwortet: Der Claim sagt, was gilt, die Idee sagt, was man deshalb sieht. Das Zeichen folgt aus dem Kernsatz und muss in einem Satz erklärbar sein.
4. **Breite nach Wirkung:** mindestens vier wählbare Varianten aus vier verschiedenen Wegen. Vergleichsvarianten zählen nicht. Claude entwirft höchstens acht. Jede wählbare Variante besteht den Wandtest in vier Ansichten und den Austauschtest gegen Kohorte und Branchenkonvention, oder sie fällt.
5. **Enge wird gezeigt:** eine Empfehlung und ein Gegenentwurf, der ihr Zwilling auf genau einer Achse aus `HM_IDEE_ACHSEN` ist. Welche Achse, folgt einer Regel aus seinen offenen Widersprüchen und unsicheren Vorlieben. Antworten auf vorbelegte Optionen zählen dabei nicht.
6. **Der Makler** investiert keine Minute und bekommt keine Frage. Die Arbeit wird im Reveal (Schritt 15) und im Markenbuch (Schritt 14) sichtbar.
7. **Markus Leitner:** Aus der Leitidee "Der richtige Zeitpunkt ist eine Leistung, keine Verzögerung." und dem Claim "Zeit ist Teil des Preises." wird die Idee "Neben jedem Preis steht seine Zeit." Das Zeichen heißt *Das Zeitmaß*: eine Maßlinie wie auf einem Bauplan, die Zeit bemaßt statt Raum. Grammatik Weite, Achse `ausschnitt` (halbnah gegen nah).

---

## 1. Ziel und Erfolgskriterium

**Ziel (Vertrag).** Aus Vertrag, Claim und Richtung einen Gestaltungsbrief auf einer Seite und eine visuelle Idee in einem Satz ableiten, aus der Zeichen, Schrift, Farbe und Bild folgen. Das Zeichen gehört dem Makler, die sechs Markenwelten liefern nur intern die Grammatik. Intern sechs bis zwölf Varianten, gezeigt werden Empfehlung und Gegenentwurf.

**Warum der Schritt der wichtigste Hebel der Gestalt ist (belegt).** Heute wird die Welt aus Figur, Bildpaaren und zwei Reglern errechnet, Positionierung und Claim gehen nicht ein (`hmWeltVorschlag`, `wb-markenwelten.jsx` Zeile 1203 bis 1239). Für Markus ergibt das die Welt Kontrast mit dem Zeichen "Die Kante", obwohl sein Claim vom Zeitpunkt handelt (KETTE_IST 2.7). Das Zeichen gehört der Welt, nicht ihm: vier der sechs Welten passen zum Kenner, zwei Kenner in derselben Welt unterscheiden sich nur durch Name und Akzent (KETTE_IST 2.7, Ableitung). Dieser Schritt baut die fehlende Brücke zwischen Wort und Bild.

**Erfolgskriterium.** Der Schritt ist fertig, wenn alle Punkte zutreffen. Die Nummern verweisen auf die Prüfungen in Kapitel 6.

| Nr. | Kriterium | Geprüft durch |
|---|---|---|
| E1 | Der Kernsatz ist identisch mit `markenvertrag.leitidee` und enthält genau einen Gedanken. | Regeln Q1, Q3 |
| E2 | Der Brief passt auf eine Seite, und jedes Verweisfeld ist identisch mit seiner Quelle. | Regeln Q2, Q3 |
| E3 | Drei bis fünf Einschränkungen, jede prüfbar, mindestens eine für das Ergebnis und eine für den Weg dorthin. | Regel Q4 |
| E4 | Das Zeichen lässt sich in einem Satz aus dem Kernsatz herleiten, und die Herleitung teilt einen Wortstamm mit dem Kernsatz. | Regel Q6, CD |
| E5 | Kein anderer Makler der Kohorte könnte das Zeichen mit derselben Herleitung tragen, und die Form ist keine Branchenkonvention; wo die Kohorte zu klein ist, steht "nicht geprüft". | Regel Q7, CD |
| E6 | Mindestens vier wählbare Varianten aus vier Wegen, jede mit Wandtest in vier Ansichten und einem Urteil mit Grund; insgesamt sechs bis zwölf Einträge. | Regeln Q5, Q8, Team |
| E7 | Der Gegenentwurf unterscheidet sich nur in den Feldern einer Achse aus `HM_IDEE_ACHSEN`, besteht selbst alle Tore und würde mit voller Überzeugung umgesetzt. | Regel Q11, CD |
| E8 | Zwei bis drei Codes, darunter Porträtstil oder Zeichen, nie die Farbe allein, und in jeder Kachelklasse mindestens zwei sichtbar. | Regel Q9 |
| E9 | Das Zeichen ist im Profilraster lesbar: Mindeststrich, Endstrich und Etikett nach 3.12. | Regel Q15, Wandtest `imRaster` |
| E10 | Jede Formentscheidung hat eine Begründung, deren Quelle auf ein vorhandenes Feld zeigt. | Regel Q10 |
| E11 | Der Creative Director hat Idee und Gezeigtes abgenommen, die Version ist gesetzt, und Schritt 10 und 11 lesen dieselbe Version. | Q14 |

Das eigentliche Qualitätsurteil bleibt beim Menschen: Ein Senior-Designer soll kein Katalogteil erkennen, und der Satz "Warum sieht das so aus?" soll für jedes sichtbare Element mit einer Zeile aus dem Brief beantwortbar sein (Ableitung aus R2 Prinzip 10 und Bierut, https://designobserver.com/on-design-bullshit/).

---

## 2. Geprüfte Alternativen und warum sie verworfen sind

| Nr. | Alternative | Was sie wäre | Warum verworfen | Quelle |
|---|---|---|---|---|
| A1 | **Katalogwahl durch den Makler** (heutiger Stand) | Der Makler sieht sechs Welten mit Vorschlag und wählt, dazu Schrift, Akzent und Logo-Typ im Studio | Das Zeichen gehört der Welt, nicht ihm; der Vorschlag kennt keine Positionierung; sechs gleichrangige Optionen liegen über der Kapazität von etwa vier Einheiten und erfüllen drei der vier Moderatoren für Überforderung (unklare Präferenz, komplexe Optionen, schwierige Aufgabe); die Arbeit des Art Directors wird auf den Kunden verschoben | KETTE_IST 2.6 und 2.7; Chernev u. a. 2015: https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf; Cowan 2001: https://doi.org/10.1017/s0140525x01003922; R2 Kapitel 4 |
| A2 | **Generator aus einer Bibliothek** | Zeichen, Schrift und Palette werden aus Icon- und Schriftbeständen kombiniert, Unverwechselbarkeit als Abstand zu häufigen Formen gemessen | "Anders als der Bestand" ist nicht "wahr für diese Person"; Generatoren fragen nach Name, Branche und Stil, nie nach Einsicht oder Beleg, und Marken einer Branche ähneln sich; sichtbar maschinell erzeugte Gestaltung trägt ein Reputationsrisiko | Brandmark: https://brandmark.io/intro/; Looka-Rezension: https://kreafolk.com/blogs/articles/looka-ai-logo-maker; Pentagram und performance.gov: https://gdusa.com/pentagram-federal-website-generates-ai-controversy/; R4 1.1 |
| A3 | **Moodboard und Stilwahl** | Das Team legt Referenzbilder vor, der Makler wählt eine Stimmung, daraus wird gestaltet | Beispiele fixieren, selbst wenn ihre Mängel benannt sind; Stimmungsboards werden anders gelesen als gemeint; Konzeptboards mit angewandter Idee sind die zentrale Form in Studios; Referenzen gehören erst nach der Idee und nur als zerlegte Merkmale in den Fotobrief (Schritt 11) | Jansson und Smith 1991: https://www.sciencedirect.com/science/article/abs/pii/0142694X9190003F; Munk, Sørensen, Laursen 2020: https://www.designsociety.org/download-publication/43213/visual_boards_mood_board_style_board_or_concept_board; Mucho: https://eyemagazine.com/feature/article/reputations-mucho |
| A4 | **Zwei verschiedene Zeichen als Empfehlung und Gegenentwurf** | Die zweitbeste Idee wird als Gegenentwurf gezeigt, der Makler wählt sein Zeichen | Die Richtung ist in Schritt 6 gewählt, hier beginnt die Ausarbeitung, für die das Rand-Prinzip gilt: eine Lösung, lückenlos begründet; wenn zwei Zeichen gleich gut aus einem Kernsatz folgen, ist der Kernsatz nicht scharf genug; das Publikum urteilt über Zeichen falsch, sobald es sie als Logo vergleicht; Schritte 10 bis 13 müssten zwei Systeme in voller Tiefe bauen | Rand, NeXT: https://www.logodesignlove.com/next-logo-paul-rand; Mozilla: https://blog.mozilla.org/opendesign/roads-not-taken/; Holman, ein Kernsatz: https://www.richardholman.com/blog/2019/6/17/simplicity-inspiration-amp-truth-how-to-write-better-creative-briefs; R1 Kapitel 5 |
| A5 | **Eine Lösung ganz ohne Gegenentwurf** | Wie Rand: das Team legt eine Idee vor, keine Wahl | Mitentscheiden erzeugt psychologisches Eigentum und stärkere Nachfrage, aber nur, wenn das Ergebnis die eigenen Präferenzen spiegelt; eine kleine, echte Wahl zwischen zwei kuratierten Fassungen erhält das und klärt zugleich eine Vorliebe, die in seinen Angaben offen ist. Übernommen wird von Rand die Herleitung und die eine Idee, nicht der Verzicht auf jede Wahl | Fuchs, Prandelli, Schreier 2010: https://doi.org/10.1509/jmkg.74.1.65; R7 2.8; R1 Kapitel 5 |
| A6 | **Claude erzeugt die Idee allein** | Die Kette liefert Brief, Varianten und Wahl in einem Aufruf | Belegt: KI-Unterstützung hebt das einzelne Ergebnis und macht die Ergebnisse verschiedener Nutzer einander ähnlicher. Ableitung: bei zwanzig Maklern droht eine Marke in zwanzig Farben. Studios mit Generatoren setzen einen handgemachten Kern und lassen die Maschine nur entlang benannter Achsen variieren; menschliche Kontrollpunkte bleiben Pflicht | Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290; Anderson u. a. 2024: https://dl.acm.org/doi/10.1145/3635636.3656204; DIA für Nuits Sonores: https://the-brandidentity.com/project/dia-studio-builds-a-generative-tool-that-makes-nuits-sonores-pulse-2; Frontify: https://www.frontify.com/en/guide/brand-guidelines-for-ai |
| A7 | **Viele Varianten als Qualitätsmaß** (Fassung 1: sechs bis zwölf, gezählt über alle Einträge) | Breite wird über die Anzahl gesichert | Vergleichs- und Bestandsvarianten ohne Herleitung füllten die Quote, ohne je gewinnen zu können, und kosteten Renderzeit und Claude-Ausgabe. Breite entsteht durch verschiedene Wege, nicht durch Masse | Kontrolle zu Fassung 1 (S1); Ableitung aus Acar u. a. 2019: https://openaccess.city.ac.uk/id/eprint/20459/ |

**Was aus den verworfenen Wegen übernommen wird (Ableitung).** Aus A1 die sechs Welten als Grammatik-Rohstoff. Aus A2 die Idee, Unverwechselbarkeit zu messen, aber gegen Kohorte und Branchenkonvention und mit Herleitung statt gegen einen Icon-Bestand. Aus A3 die zerlegte Referenz, aber erst in Schritt 11. Aus A5 die lückenlose Herleitung als Kapitel im Markenbuch. Aus A6 Claude als Breitenmaschine für Varianten und Begründungsentwürfe, nicht als Entscheider. Aus A7 die Vergleichsvariante als Beleg im Markenbuch, ohne Wandtest und ohne Zählung.

---

## 3. Die gewählte Lösung

### 3.1 Die Lösung in fünf Sätzen

Der Brief übernimmt, was der Makler schon bestätigt hat, darunter die Leitidee als Kernsatz, und fügt nur hinzu, was ein Gestalter zusätzlich braucht: ein Publikum als Person, Pflichten und wenige harte Einschränkungen (Acar, Tarakci, van Knippenberg 2019: https://openaccess.city.ac.uk/id/eprint/20459/). Claude und Team übersetzen den Kernsatz auf mindestens vier verschiedenen Wegen in Zeichen-Ideen. Jede wählbare wird sofort in Anwendung gerendert, auf seinem echten Porträt, einem echten Ort und im Profilraster, und muss Wandtest und Austauschtest bestehen. Der Creative Director wählt eine Idee, die Regel bestimmt die Achse des Gegenentwurfs, und jede Formentscheidung bekommt eine Begründung mit Quelle. Brief und Idee werden als Version abgenommen und sind ab dann die einzige Vorgabe für Designsystem, Bildsprache und Feed.

### 3.2 Ablauf

| Stufe | Was passiert | Wer | Dauer (Setzung) | Ergebnis |
|---|---|---|---|---|
| 0. Sperre | Der Schritt öffnet erst, wenn `markenvertrag.bestaetigtAm` und `botschaften.claim` gesetzt sind (Freigabe 1 und Claim-Wahl im Wort-Link) | Regeln | 0 | Schritt offen oder gesperrt mit Grund |
| 1. Brief-Vorbau | Alle Verweisfelder werden aus den Quellen gefüllt: Kernsatz, Einsicht, drei Belege, Tonprofil, Verbote, Erfolgsmaß | Regeln | 0 | Brief zu etwa drei Vierteln gefüllt |
| 2. Brief-Kern | Claude schlägt Aufgabe, Publikum als Person, die Klischeeliste des Kernsatzes und vier bis sechs Einschränkungen vor. Der Art Director wählt, schärft, streicht auf drei bis fünf | Claude, Art Director | 20 Minuten | Brief vollständig, Prüfungen Q1 bis Q4 grün |
| 3. Breite | Claude entwirft höchstens acht Varianten entlang der Übersetzungswege (3.4), je mit Herleitungssatz, Form als Parameter und Risiko. Der Regelpfad legt die Vergleichsvarianten dazu. Q8 filtert sofort gegen die Verbote. Fehlen danach wählbare Wege, ergänzt das Team Handskizzen | Claude, Regeln, Art Director | 30 Minuten, dazu bis 30 Minuten Handskizzen, wenn weniger als vier Wege wählbar sind | Variantenbrett |
| 4. Wandtest | Die Werkbank rendert jede wählbare Variante grob in Anwendung: Porträt, eigenes Orts- oder Objektfoto, Profilraster mit drei Kacheln. Das Team beantwortet vier Ja-Nein-Fragen. Parallel laufen Austauschtest und Konventionsprobe | Regeln (Render, Kohorte), Team | 40 Minuten | Tore bestanden oder Variante fällt mit Grund |
| 5. Kritik und Wahl | Die verbleibenden Varianten werden 0 bis 5 bewertet. Der Art Director schlägt die Empfehlung vor, die Regel bestimmt die Achse, die Werkbank baut den Zwilling. Claude entwirft die Begründungskette mit Quellen, das Team bestätigt Zeile für Zeile | Art Director, Regeln, Claude | 30 Minuten | Empfehlung, Gegenentwurf, Achse, Begründungen |
| 6. Abnahme | Der Creative Director prüft Idee, Zwilling und Begründungen gegen den Vertrag und zeichnet ab. Ab hier ist die Version fest; jede spätere Änderung ist eine neue Version mit Grund | CD | 20 Minuten | `idee.gezeigt.abgenommen`, `idee.version` |

Arbeitszeit des Teams je Makler etwa 2 Stunden 20 Minuten, mit Handskizzen bis 2 Stunden 50 Minuten (Setzung, an den ersten fünf Maklern zu messen). Gegenüber Fassung 1 entfallen Kernsatz-Fassungen (Verweis statt Neuschrift) und Renders für Vergleichsvarianten. Koto beschreibt denselben Rhythmus aus breiter Teamarbeit und einem Kreativdirektor, der zuletzt spricht (https://pangrampangram.com/blogs/journal/koto).

### 3.3 Der Brief auf einer Seite

Form nach Holman (Wahrheit, ein Kernsatz, Publikum als Mensch, https://www.richardholman.com/blog/2019/6/17/simplicity-inspiration-amp-truth-how-to-write-better-creative-briefs) und nach der BetterBriefs-Studie, laut der 80 Prozent der Auftraggeber ihre Briefs für gut halten, aber nur 10 Prozent der Kreativen (https://ipa.co.uk/news/betterbriefs).

| Feld | Art | Regel | Wer liest es wofür |
|---|---|---|---|
| `aufgabe` | neu | Was soll sich beim Publikum ändern, in einem Satz, beobachtbar. Kein Adjektiv ohne Situation | 13 Fünf-Sekunden-Prüfung (Leitfrage 1), 15 Fremdtest |
| `publikumAlsPerson` | neu aus Verweis | Eine Person aus `einsicht.zielgruppe`, beschrieben mit Anlass, Ort, Objekt, Lebensphase. Keine Details, die nicht im Dossier stehen; fehlende Stücke als Lücke | 11 `fotobrief.zweck` (für wen das Bild ist), 13 Fünf-Sekunden-Prüfung, 14 Kapitel Idee |
| `einsicht` | Verweis | Wörtlich `einsicht.spannung` | 14, Begründungen |
| `kernsatz` | Verweis | `{ref: "markenvertrag.leitidee", text}`. Kein eigener Satz. Hält die Leitidee Q1 nicht (ein Gedanke, höchstens zwölf Wörter), geht ein Änderungsantrag an Schritt 7, und die Schärfung wird eine neue Vertragsversion. Der öffentliche Satz bleibt `botschaften.claim` | Herleitung (Q6), Austauschtest (Q7) |
| `belege[3]` | Verweis | Drei Einträge aus `beweise`, je mit Prüfstatus; Auswahl: die drei, die Kernsatz oder Claim am direktesten tragen | Etiketten des Zeichens, 10 Stresstest, 13 `belegRef` |
| `tonprofil` | Verweis | `stimme.regler` und `markenvertrag.stimmeRichtung` | 10 Schriftrichtung |
| `pflichten[]` | Verweis plus neu | Anrede aus `anrede`, Belegpflicht, Schärfung aus `gate1.schaerfung`, nur eigenes Material | 10 `system.sperrstufen`, 11 `bild.regeln`, 12 Sperrstufen der `vorlagen`, 14 fester Kern |
| `verbote[]` | Verweis plus neu | Vereinigung aus `markenvertrag.falschWaere`, `workshop.falschWaere`, `richtung.tabus`, Branchenmotive, Klischee-Liste; neu nur die wörtlichen Klischees dieses Kernsatzes, die nicht schon im Vertrag stehen | Q8, 10 `system.zeichen.nie`, 11 `bild.vermeiden` |
| `einschraenkungen[3 bis 5]` | neu | Je `{id, regel, art output oder prozess, pruefung, weil}`; mindestens eine je Art; jede muss eine Entscheidung erzwingen, die sonst offen wäre | 10, 11, 12 als Sperren; 14 Vorrang |
| `erfolgsmass` | Verweis | `markenvertrag.erfolgsmass` | 14, über `quelle` 17 |

Die Verweisfelder speichern Pfad und Text. Der Text dient nur der Anzeige; die Prüfung Q3 vergleicht ihn mit der Quelle. Weicht er ab, gilt die Quelle. So kann der Brief nie einen zweiten Kernsatz, eine zweite Einsicht oder ein zweites Erfolgsmaß erzeugen. Die Kette der Ein-Satz-Werte bleibt damit eindeutig: `markenvertrag.leitidee` ist der interne Gedanke, `botschaften.claim` der öffentliche Satz, `idee.satz` die sichtbare Folge des Claims. Kein vierter Satz entsteht.

**Warum wenige, harte Einschränkungen (belegt und abgeleitet).** Acar u. a. beschreiben einen umgekehrten U-Verlauf: Ohne Begrenzung des Suchraums greifen Menschen zur naheliegendsten Lösung, zu viele Vorgaben ersticken. Genau das ist das Kernproblem generativer Systeme, die ohne Vorgaben beim Durchschnitt landen (R2 1.3). Beim Public Theater und bei Mastercard ist die Einschränkung selbst das Wiedererkennbare (https://www.pentagram.com/work/the-public-theater-2020-2021-season, https://www.pentagram.com/work/mastercard). Die Zahl drei bis fünf ist eine Setzung aus R2 Prinzip 3.

### 3.4 Vom Kernsatz zum Zeichen: die Übersetzungswege und die Breite

Jede Variante nennt ihren Weg. **Wählbar** ist eine Variante, wenn ihr Weg wählbar ist und sie Q8 (Verbote) besteht. Breite heißt: mindestens vier wählbare Varianten aus vier verschiedenen Wegen (Setzung). Vergleichsvarianten und der Zwilling zählen nicht zur Breite, stehen aber im Datensatz, damit das Markenbuch zeigen kann, was verworfen wurde. Der Vertrag verlangt sechs bis zwölf Einträge insgesamt; das bleibt die Obergrenze für Aufwand und die Untergrenze für Dokumentation.

| Weg | Was er tut | Wählbar | Grundlage |
|---|---|---|---|
| `notation` | Macht eine Größe aus dem Kernsatz zur Form: eine Maßeinheit, eine Skala, eine Zeile, die Daten trägt | ja | Mastercard und Public Theater: die Form ist die Einschränkung (R2 1.2) |
| `nebeneinander` | Zwei Bilder oder Zustände stehen nebeneinander und erzeugen die Aussage | ja | Phillips und McQuarrie 2004, einfachste Stufe visueller Rhetorik: https://journals.sagepub.com/doi/10.1177/1470593104044089 |
| `verschmelzung` | Zwei Dinge in einer Form | ja | ebenda, mittlere Stufe |
| `ersetzung` | Ein sichtbares Bild verweist auf ein abwesendes | ja | ebenda, höchste Stufe; im Feed nur mit Vorsicht (R2 Prinzip 6) |
| `portraetregie` | Das Verhalten der Person im Bild trägt die Idee: Haltung, Abstand, Tempo, Geste | ja | Gesicht als stärkstes Asset: Willis und Todorov 2006, https://doi.org/10.1111/j.1467-9280.2006.01750.x |
| `ort` | Ein realer Ort seines Gebiets wird Zeichen | ja | Grätzl-Linie im Bestand; Two Times Elliott, The Wardian: https://xx.studio/work/ballymore-wardian/ |
| `bestand` | Ein vorhandenes Element wird verstärkt statt ersetzt | ja, wenn die Herleitung ein Wort des Kernsatzes trägt; sonst Vergleich | JKR: bestehende Codes erweitern, https://www.jkrglobal.com/ |
| `setzweise` | Eine typografische Stimme wird zum Zeichen | ja | Public Theater, eine Schrift über Jahrzehnte (R2 1.2) |
| `weltzeichen` | Das Zeichen der intern stärksten Welt | nie, nur Vergleich ohne Wandtest | Bestand `HM_MARKENWELTEN`; Q7 |

**Warum vier Wege (Ableitung, keine Messung).** Doshi und Hauser zeigen, dass KI-gestützte Geschichten einander ähnlicher werden als ohne KI; gemessen ist die Ähnlichkeit zwischen Nutzern, nicht der Nutzen vieler Varianten je Kunde. Dass eine Pflicht zu verschiedenen Wegen die Kohorte auseinanderhält, ist unsere Ableitung, keine Aussage der Studie. Die Zahl vier ist eine Setzung, an den ersten fünf Maklern zu prüfen: Wenn die gewählte Idee regelmäßig aus dem ersten Weg kommt, genügen drei.

**Klischee zuerst benennen (Ableitung).** Vor jeder Variante listet Claude die wörtlichen Übersetzungen des Kernsatzes, die jeder zuerst hätte: Zeit wird Uhr, Sicherheit wird Schloss, Zuhause wird Dach. Was davon nicht schon in `markenvertrag.falschWaere` steht, geht als neuer Eintrag in `brief.verbote`. Das ist die Gegenmaßnahme zum Pfad des geringsten Widerstands, den Acar u. a. beschreiben.

### 3.5 Die drei Tore: Wandtest, Austauschtest, Vertrag

**Reihenfolge.** Q8 (Verbote) läuft zuerst, am Satz und an der Formbeschreibung, noch vor jedem Render. Eine Variante, die ein Verbot trifft, fällt dort, bekommt keine Bewertung und keinen Wandtest und steht im Datensatz mit `urteil: "verworfen"`, `verworfenBei: "Q8"`. Vergleichsvarianten werden nicht gerendert. Nur wählbare Varianten kommen in den Wandtest.

**Wandtest in vier Ansichten.** Die Werkbank rendert jede wählbare Variante in Anwendung, nie das Zeichen allein auf Weiß (Mozilla-Lehre, https://blog.mozilla.org/opendesign/roads-not-taken/):
1. **Porträt:** ein echtes Porträt aus `vorab.material`, mit Kernsatz oder Claim und dem Zeichen an seiner Stelle.
2. **Ort:** ein eigenes Orts- oder Objektfoto mit einer belegten Zahl und dem Zeichen.
3. **Profilraster:** drei Kacheln nebeneinander in echter Größe der Profilansicht (129 pt Kachelbreite bei 390 pt Telefonbreite, Fenster 3:4): Porträt, Zahl-Kachel, Endkarte.
4. Dieselben Renders in der Grammatik der Variante, nicht in einer neutralen Vorlage.

Das Team beantwortet mit Ja oder Nein: *rational* (sagen Satz und Bild dasselbe, je Bild), *emotional* (fühlt es sich nach den Attributen des Vertrags an, je Bild), *alsAnzeige* (taugt das Paar in drei Sekunden als grobe Anzeige), *imRaster* (ist der Code bei Kachelbreite 129 pt noch als derselbe erkennbar). Ein Nein und die Variante fällt (R2 3.2). Die ersten drei Fragen gehen auf eine Anekdote über John Hegarty zurück, die nur in Praktikerquellen belegt ist (https://creativebriefworkshops.com/1935-2/); sie wird als Werkzeug genutzt, nicht als Beleg zitiert. Die vierte Frage ist eine Ableitung: Ein Code muss dort wirken, wo das Profil als Ganzes gesehen wird, und `alsAnzeige` prüft nur das offene Bild.

Fehlt ein verwendbares Porträt, bleibt der Wandtest für Porträt und Profilraster offen, die Idee trägt den Status "vorläufig", und Schritt 11 setzt `bild.portraetTermin.noetig` mit Grund "Wandtest offen". Es wird nie ein generiertes Gesicht eingesetzt (UNIO-Regel, `ui_kits/werkbank/CLAUDE.md`); die Werkstatt zeigt eine schraffierte Lückenfläche mit der Kopfzone als Crop-Maß, wie im Muster.

**Austauschtest gegen die Kohorte.** Die Werkbank legt die Herleitung der Variante neben die Kernsätze der anderen Makler der Kohorte. Passt derselbe Herleitungssatz auf einen anderen Kernsatz, ohne dass ein Wort geändert werden muss, gehört das Zeichen nicht ihm. Als Regel (Q7): Teil a, die Herleitung trägt einen Wortstamm aus seinem Kernsatz oder seinen Belegen, der in keinem anderen Kernsatz der Kohorte vorkommt; Teil b, kein Makler im selben Gebiet trägt dasselbe Zeichen; Teil c, kein Makler im selben Gebiet trägt dieselbe Grammatik mit derselben vorläufigen Akzentfamilie (Definition in Kapitel 6, Q7). Das Urteil trifft der CD; die Regel meldet. Grundlage: R4 Ü8 und die Ableitung aus Doshi und Hauser 2024. Ab welcher Kohortengröße Teil a trägt, ist offen (R4, Lücke); bis dahin gilt die Setzung in Q7, und unter ihr lautet der Status "nicht geprüft", nie grün.

**Protokoll ohne fremde Geschichten.** Das Protokoll des Austauschtests speichert im Datensatz dieses Maklers nur die Kennung des anderen Maklers, das gemeinsame Wortfeld und die Fundstelle als Feldpfad, nie den Wortlaut aus dem Dossier des anderen (`{maklerId, wortfeld, feld, cdUrteil}`).

**Konventionsprobe gegen die Branche.** Eine Form kann in der Kohorte einzigartig und trotzdem Branchenkonvention sein. Die Werkbank prüft die Formbeschreibung gegen eine feste Liste von Bildkonventionen des Immobilienmarketings (Grundriss, Bemaßung von Flächen, Schlüssel, Dach, Haus-Silhouette, Skyline, Stephansdom, Handschlag; Setzung aus R5 Abschnitt 5 und `bild.vermeiden`) und gegen `vorab.wettbewerb[].konventionNotiz` des Kerngebiets. Ein Treffer sperrt nicht, er verlangt vom CD einen Satz, worin sich die Variante von der Konvention unterscheidet (`konvention {treffer, unterscheidung, cd}`). Solange `vorab.wettbewerb` fehlt, steht die Probe gegen das Kerngebiet auf "nicht geprüft".

**Vertrag.** Die Variante verstößt gegen nichts in `brief.verbote` (schon in Q8 geprüft) und trifft die fünf Attribute aus `markenvertrag.attribute` nicht in ihrem `heisstNicht`.

### 3.6 Kritik, Empfehlung, Achse und Gegenentwurf

**Bewertung.** Jede wählbare Variante, die die Tore besteht, wird 0 bis 5 bewertet:

| Kriterium | Frage | Tor |
|---|---|---|
| Herleitung | Lässt sich das Zeichen in einem Satz aus dem Kernsatz erklären? | unter 3 fällt |
| Eigentum | Gehört es nur ihm (Austauschtest und Konventionsprobe)? | unter 3 fällt |
| Vertrag | Trifft es die Attribute und keine Verbote? | unter 3 fällt |
| Anwendung | Trägt es in Kachel, Profilraster, Reel-Titel, Karte, Signatur, Exposé und Schild, und kann es an einer Stelle das Bild tragen, statt nur daneben zu stehen? | Rangfolge |
| Herstellbarkeit | Kann das Team es jede Woche mit seinem Material und Zeitbudget herstellen? | Rangfolge |

Die Kriterien folgen R2 3.12 und Munk u. a. (Senior-Feedback dreht sich oft um Herstellbarkeit). Claude darf Werte vorschlagen, das Team setzt sie. Die Frage nach dem Bildtragen in "Anwendung" prüft, ob die Neuheit der Idee sichtbar wird oder als kleinstes Element am Rand verschwindet (Kontrolle zu Fassung 1, S3).

**Der Achsen-Katalog als eine Konstante.** Der Gegenentwurf ist der Zwilling der Empfehlung. Welche Felder sich unterscheiden dürfen, steht an genau einer Stelle: `HM_IDEE_ACHSEN` in `wb-idee.jsx`. Die Schritte 10 (Systemvergleich S15, 10.9), 11 (Crop und Fotobrief), 12 (Vorlagen), 13 (`feed.gegenentwurf`) und 15 (Q5 Gleicher Inhalt) lesen diese Konstante und führen keine eigene Tabelle.

```js
// wb-idee.jsx. Einzige Quelle für die Achsen des Gegenentwurfs.
// felder: Pfade, die sich je Schritt zwischen Empfehlung und Gegenentwurf unterscheiden dürfen.
// dimension: Dimensionen aus vorlieben.profil, die Stufe 3 der Achsenregel speisen.
const HM_IDEE_ACHSEN = {
  tonwert: {
    pole: ["papier", "dunkel"], dimension: ["licht", "farbtemperatur"],
    felder: {
      10: ["system.farbe.grund", "system.farbe.text", "system.farbe.flaeche", "system.farbe.linie", "system.farbe.proportion"],
      11: ["bild.regeln.farbbehandlung.tonwert"],
      12: [],                                   // grammatik.tonwertPeriode ist relativ zum Grundton und gilt für beide
    },
  },
  ausschnitt: {
    pole: ["halbnah", "nah"], dimension: ["ausschnitt"],
    felder: {
      10: ["system.raster.fenster.crop"],       // Kopfanteil und Anker je Format; system.zeichen.platz bleibt gleich
      11: ["bild.regeln.ausschnitt", "bild.portraet.zuschnitt", "bild.kontaktbogen[].crop", "fotobrief.formateUndCrops"],
      12: ["vorlagen[].bildfeld.crop", "vorlagen[].bildfeld.textlage"],
    },
  },
  dichte: {
    pole: ["weit", "dicht"], dimension: ["dichte", "ordnung"],
    felder: {
      10: ["system.raster.rand", "system.raster.spalten", "system.typo.stufen.kernsatz"],
      11: ["bild.regeln.abstand.freiflaecheMin"],
      12: ["vorlagen[].felder[].maxWoerter", "serien[].bildaufbau.textanteil"],
    },
  },
  schriftstimme: {
    pole: ["antiqua", "grotesk"], dimension: ["typografie"],
    felder: {
      10: ["system.typo.display", "system.typo.stufen.display", "system.wortmarke"],   // wortmarke nur bei typ "neu", bei "geschärft" nie
      11: [],
      12: [],
    },
  },
  zeichengewicht: {
    pole: ["signatur", "bildtraeger"], dimension: [],   // keine Bildpaar-Dimension; nur über Stufe 2 oder begründete Abweichung
    felder: {
      10: ["system.zeichen.groesse"],           // Stelle bleibt, nur die Größe je Format
      11: ["bild.regeln.ausschnitt.freiraumZeichen"],
      12: ["serien[].bildaufbau.zeichenAnteil", "vorlagen[].felder.zeichen.groesse"],
    },
  },
};
const HM_IDEE_NIE_ACHSE = ["zeichen", "zeichenform", "kernsatz", "claim", "grammatik", "codes", "akzent"];
```

Ohne Achse sind die Bildpaar-Dimensionen `material` (wirkt auf `bild.motive` in Schritt 11 und den Weltrang) und `menschenInOrtsbildern` (betrifft nie das Porträt, Schritt 3 P3, und wirkt auf `bild.motive`). Das ist gewollt: Beide ändern Motive, nicht die Form, die der Makler im Reveal vergleicht.

**Korrektur an die Nachbarn (Meldung, Umsetzung in 8.1).** Die Nachbarn führen bisher eigene, abweichende Kataloge:
- `10_system.md` 10.9 führt "Zeichenform" als Achse. Die ist hier ausdrücklich nie Achse, weil ein anderes Zeichen den Vergleich von Form zu Identität verschiebt (A4). 10.9 kennt außerdem weder `dichte` noch `zeichengewicht` und lässt bei `ausschnitt` `zeichen.platz` abweichen, was E2 verbietet. "Satz" entspricht `schriftstimme`.
- `11_bild.md` nutzt "Abstand (Weite gegen Nähe)". Das entspricht `ausschnitt`; der Name "Abstand" entfällt als Achse und bleibt nur als Bildregel.
- `13_feed.md` nennt als Beispiel "Bildführung gegen Satzführung". Das ist keine eigene Achse; am nächsten liegt `dichte`. 13 liest die Achse aus `idee.gezeigt.achse` und die Felder aus `HM_IDEE_ACHSEN`.

Warum die Grammatik nie Achse ist: Ein Weltwechsel ändert viele Parameter auf einmal, und der Makler vergleicht dann nicht mehr eine Sache (Hsee 1996, https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf). Warum die Farbe nie Achse ist: Farbe ist der schwächste Code (3.7).

**Regel für die Achse (deterministisch; der Art Director kann mit Begründung abweichen, die Abweichung steht in `idee.gezeigt.achse.abweichung`).**
1. **Streichen.** Streiche jede Achse, die eine Einschränkung, ein Tabu aus `richtung.tabus`, eine Entscheidung in `workshop.klaerungen`, die gewählte Grammatik-Welt oder die Idee selbst schon festlegt. Eine Wahl, die eine entschiedene Frage wieder öffnet, ist verboten (R7 Kapitel 4, letzter Punkt).
2. **Offener Widerspruch.** Nimm die Achse, auf der ein offener Widerspruch liegt: ein Eintrag in `vorlieben.widersprueche`, dessen Dimension einer Achse zugeordnet ist, oder ein eigener Satz des Maklers aus `workshop.zitate`, der `vorlieben.profil` widerspricht. **Antworten auf vorbelegte Optionen zählen nicht.** Ein Satz, der eine Vorauswahl oder einen Vorschlag des Teams bestätigt ("ich habe die dunkle vorausgewählt", "Ja, dunkel passt."), ist Zustimmung zu einer gelenkten Frage, keine eigene Präferenz. Belegt ist, dass Befragte falsche Vorbelegungen bestätigen können und Voreinstellungen Entscheidungen verschieben (R3 Abschnitt zu Dependent Interviewing, Quellen 20, 37 und 38 dort, etwa Liu und Conrad 2019: https://journals.sagepub.com/doi/abs/10.1177/0894439318755336); die Übertragung auf eine Chat-Vorauswahl ist Ableitung. Dazu die Rubrik: Haltungen nie vorbelegen. Solche Sätze werden als `signal: "schwach"` mit Quelle protokolliert und dürfen nur als Nebengrund in einer Begründung stehen, nie als Grund für die Achse.
3. **Unsicherste Vorliebe.** Sonst die Achse, deren zugeordnete Dimensionen in `vorlieben.profil` die geringste Sicherheit haben; die Sicherheit einer Achse ist das Minimum ihrer Dimensionen. Achsen ohne Dimension (`zeichengewicht`) nehmen an Stufe 3 nicht teil. Das Profil wird über `hmWirksam(mid, pfad)` gelesen, damit Klärungen aus Schritt 4 gelten (`03_vorlieben.md` Hinweis 7).
4. **Gleichstand:** die Achse, die mehr Kacheln sichtbar verändert, in der Reihenfolge tonwert, ausschnitt, dichte, schriftstimme (Setzung).

Warum eine Regel: Nebeneinander gezeigt werden schwer bewertbare Merkmale entscheidbar (Hsee 1996). Die Wahl im Reveal soll genau das Merkmal entscheiden, bei dem seine eigenen Angaben uneinig oder offen sind. Dann ist die Frage im Reveal berechtigt, weil ihre Antwort den Output ändert (R2 3.11).

**Tor für den Gegenentwurf.** Er besteht selbst alle Tore einschließlich Wandtest in vier Ansichten, hat in keinem Kriterium unter 3, und der CD bestätigt die Frage aus Schritt 6: Würden wir ihn mit voller Überzeugung umsetzen? Ein Strohmann ist ein Fehler (Kapitel 7, F8).

### 3.7 Die Codes und wo das Zeichen erscheint

Zwei bis drei Wiedererkennungs-Codes je Makler, vorrangig Porträtstil, Serienformat und Zeichen. Belegt: Nur 15 Prozent von über 5.000 Markenelementen sind wirklich unverwechselbar, Farben schneiden mit 4 Prozent am schlechtesten ab (JKR und Ipsos, https://www.marketingweek.com/15-brand-assets-truly-distinctive-finds-research/); formbasierte Assets erreichen im Mittel deutlich höhere Bekanntheit und Eindeutigkeit als Farbe (https://www.tandfonline.com/doi/abs/10.1080/02650487.2026.2637295, bei der Kontrolle nicht abrufbar, darum nicht verifiziert). Für Makler gibt es keine eigene Studie (Lücke, R7 2.4).

Regeln:
- Farbe ist nie allein ein Code, sie darf nur als Eigenschaft eines Codes auftreten. Mindestens ein Code ist Porträtstil oder Zeichen. Jeder Code hat eine Herleitung aus Kernsatz oder Einschränkung.
- **Das Zeichen erscheint nur, wo es etwas sagt.** Es wird nie als Füllstoff auf Kacheln gesetzt, die seinen Inhalt nicht haben. Bei einem Zeichen, das Daten trägt, heißt das: nur mit belegtem Wert. Eine Datumszeile auf jeder Kachel wäre die verworfene Stand-Zeile durch die Hintertür (Kapitel 7, F15).
- **Mindestens zwei Codes je Kachelklasse,** nachgewiesen in einer Tabelle `idee.codesJeKlasse`, die Schritt 12 in `codesPruefung` übernimmt. Eine Kachelklasse, die nur einen Code tragen kann, ist im Raster nicht zulässig; ihr Inhalt wandert auf Folgeseiten oder wird eine Lückenkachel. Diese Vorgabe erzwingt eine Entscheidung in Schritt 12 und 13 und ist gewollt.
- Das Serienformat ist hier ein Formprinzip über alle Serien; welche Serie die Signatur wird, entscheidet Schritt 12 (`serieSignatur`).

### 3.8 Die Begründungskette

Jede Formentscheidung hat mindestens einen Eintrag `{entscheidung, weil, quelle, signal}`. Pflicht sind Einträge für: Zeichen, Position des Zeichens, Maße des Zeichens, Grammatik-Welt, Farbrolle, Behandlung der Wortmarkenfarbe, Schriftrichtung, Licht, Ausschnitt, Achse des Gegenentwurfs, jede Einschränkung. Die Quelle ist ein Pfad, der im Store auflöst (`brief.kernsatz`, `vorlieben.profil.licht`, `workshop.zitate[z7]`), nie ein freier Text. `signal` ist "stark" oder "schwach"; schwach sind Antworten auf vorbelegte Optionen und Annahmen. Eine Pflichtentscheidung, deren einzige Quelle schwach ist, sperrt Q10. Das ist die Antwort auf Bierut: Begründungen werden oft nachträglich gebaut, das ist erlaubt, solange sie auf etwas Echtes zeigen (https://designobserver.com/on-design-bullshit/). Sätze wie "steht für Vertrauen und Dynamik" ohne Pfad lehnt die Prüfung ab (R2 Kapitel 4). Schritt 10 übernimmt die Einträge als `warum` an die Tokens (R4 Ü3).

### 3.9 Wer macht was

| Rolle | Tut | Tut nicht |
|---|---|---|
| Makler | nichts in diesem Schritt | keine Frage, keine Wahl, kein Zwischenstand |
| Art Director (Team) | schärft Aufgabe und Publikum, streicht Einschränkungen, ergänzt Handskizzen, führt Wandtest und Bewertung, schlägt die Empfehlung vor, bestätigt jede Begründung | wählt keine Welt aus Geschmack, übernimmt kein Welt-Zeichen, formuliert den Kernsatz nicht um |
| Creative Director | Kohorten- und Konventionsurteil, Abnahme von Idee, Zwilling und Begründungen | redigiert den Vertrag nicht; Einwände gegen Leitidee oder Vertrag gehen als Änderungsantrag an Schritt 7 |
| Claude | Aufgabe und Publikum als Vorschlag, Klischeeliste, Einschränkungs-Vorschläge, höchstens acht Variantenskizzen über mindestens vier Wege, Bewertungsvorschläge, Begründungsentwürfe mit Pfaden | entscheidet nicht, sieht keine Bilder, erfindet keine Zahl und keinen Ort |
| Regeln | Sperre, Brief-Vorbau, Vergleichsvarianten, Q8 vor dem Render, Renders für den Wandtest, Austauschtest, Konventionsprobe, Achsenregel, Zwilling, alle Prüfungen, Version, Versionsabgleich mit 10 und 11 | setzen keine Mustersätze; fehlt Stoff, steht eine Lücke |

### 3.10 Was der Makler später davon sieht

- **Reveal (Schritt 15):** Nach seinen Worten, der Einsicht und dem Vertrag kommt ein Bild mit zwei Zeilen: sein Claim, darunter die Idee. Er sieht, dass seine Idee eine Folge aus seinem Vertrag ist. Danach die Anwendung, dann der Gegenentwurf im selben Kontext, zuletzt das Zeichen. Die Begründungen (`idee.begruendung`) liefern die Sätze, mit denen jede Entscheidung an einem Kriterium des Vertrags festgemacht wird. Der Satz zur Achse nennt eine starke Quelle, nie eine Antwort auf eine Vorauswahl.
- **Markenbuch (Schritt 14), Kapitel "Wie wir zu dieser Marke gekommen sind":** die verworfenen Varianten mit je einem Satz Grund; gerenderte als kleine Renders, bei Q8 gefallene nur als Satz. Sichtbar gemachte Arbeit erhöht den wahrgenommenen Wert (Buell und Norton 2011, https://doi.org/10.1287/mnsc.1110.1376).
- **Rückmeldung (Schritt 15):** Seine Wahl zwischen Empfehlung und Gegenentwurf entscheidet genau die eine Achse. Sie ist die einzige Wahl über Form, die er in der ganzen Kette trifft.

Alle Renders, die er je sieht, bestehen nur aus seinem Material, seinen Worten und seinen Belegen. Keine Demo-Objekte aus `hmWebObjekte`, kein Fülltext.

---

### 3.11 Beispiel: Markus Leitner, Döbling, Zinshaus, Figur Kenner, Sie-Form

**Stoff und Herkunft.** Die v2-Schritte 1 bis 8 sind für Markus noch nicht gelaufen. Das Beispiel nutzt die Beispiele der Vorgänger, wo sie vorliegen: Einsicht aus `05_einsicht.md` 3.10 (Stand heute, Arbeitsstand), Vertrag, Leitidee und Belege `b1` bis `b6` aus `07_positionierung.md` 3.x, Profil und Bestand aus `03_vorlieben.md` (Beispiel Markus), sonst den Seed `markus` (`wb-store.jsx` Zeile 72, 102 und 103) und das Musterbeispiel (`MARKENQUALITAET.md` Kapitel 5). Jede Zeile trägt ihre Herkunft: *Vorgänger* (Datei und Abschnitt), *Seed*, *Muster*, *Annahme* oder *Lücke*. Wie die Schritte 7 und 8 folgt das Beispiel dem Territorium "Der Zeitpunkt" aus MARKENQUALITAET 5.2; `06_territorien.md` führt für Markus die Richtung noch als offen. Wählt der Richtungstermin anders, wird dieser Schritt mit neuer Version neu gerechnet. Die Anrede gegenüber dem Makler folgt der offenen Owner-Entscheidung Du oder Sie (Zerlegung Kapitel 7, Punkt 1); das Beispiel nutzt Sie, wie seine eigenen Texte.

**Schritt 9 ist die einzige Quelle für Zeichen, Grammatik und Achse.** Für Markus gilt `idee` Version 1: Zeichen "Das Zeitmaß", Grammatik Weite, Achse `ausschnitt`. Die Arbeitsannahmen in `10_system.md` 3.6 (Zeichen "Der Zeitpunkt", Grammatik Feuilleton, Achse Satz) und in `11_bild.md` (Zeichen "Die Frist", Linie bei 38 Prozent, Achse Abstand) sind damit überholt und werden nach 8.1 auf Version 1 umgestellt. Regel für die ganze Kette: `system` und `bild` tragen `basis.idee.version`, die Version von `idee`, die sie gelesen haben; solange eine abweichende Version gelesen wird, sperrt Q14 die Übergabe an die Schritte 12 und 13, und Schritt 14 zeigt kein Zeichen (`14_markenbuch.md` Befund 1, Sperre S14).

**Warum die Achse nicht mehr `tonwert` heißt (Abweichung von der Vorgabe der Kontrolle, begründet).** Die Kontrolle verlangte in M1 die Umstellung der Nachbarn auf "Zeitmaß, Weite, tonwert" und in M3 die Neubewertung von "Ja, dunkel passt.". Beides zusammen ergibt eine andere Achse: Fällt der Satz als Antwort auf die Vorauswahl in n1 weg, gibt es für Markus keinen offenen Widerspruch mehr, und Regelstufe 3 wählt die Achse mit der unsichersten Vorliebe. Das ist `ausschnitt` (Sicherheit 0, siehe unten), nicht `tonwert` (0,8). Die Achse beizubehalten und das Signal nur als schwach zu markieren, hieße, eine gelenkte Antwort doch zur Grundlage zu machen. Idee Version 1 heißt deshalb Zeitmaß, Weite, ausschnitt; die Korrekturen an 10, 11, 12, 13 und 15 stehen in 8.1.

#### Der Brief (Version 1)

| Feld | Inhalt | Herkunft |
|---|---|---|
| aufgabe | Wer den Namen Markus Leitner von einem Notar oder von Miterben hört und sein Profil öffnet, sieht in fünf Sekunden: Hier wird der Zeitpunkt beraten, nicht nur der Verkauf. | neu; Anlass aus Seed `abschluesse` (Erbengemeinschaft kam über den Notar); Fünf-Sekunden-Prüfung aus R5 Prinzip 7 |
| publikumAlsPerson | Jemand aus einer Erbengemeinschaft mit einem Zinshaus in Döbling, Währing oder Hietzing, der über den Notar zu ihm kommt. Lebensphase: Lücke. | Verweis auf `einsicht.zielgruppe`, Vorgänger 05 3.10; Lebensphase kommt aus `workshop.switch` |
| einsicht | Sie wollen beraten werden, ohne gedrängt zu werden, und die Provision steht im Raum, bevor das erste Gespräch beginnt. | Verweis `einsicht.spannung`, Vorgänger 05 3.10, Hörstufe angegeben, Arbeitsstand |
| kernsatz | Der richtige Zeitpunkt ist eine Leistung, keine Verzögerung. | Verweis `markenvertrag.leitidee`, Vorgänger 07 3.x; acht Wörter, ein Gedanke mit Abgrenzung, Q1 grün |
| belege | 1. Zinshaus Sievering, 4,2 Mio., 11 Wochen (b2, Selbstauskunft). 2. Erbengemeinschaft: zwei Jahre gewartet, 600.000 mehr (b1, Selbstauskunft, Unterlage fehlt, öffentliche Nutzung gesperrt). 3. Anlegerwohnung Währing, 8 Prozent über Erstschätzung (b3, Selbstauskunft; Dauer fehlt). | Verweise auf `beweise`, Vorgänger 07. b2 und b1 tragen den Kernsatz über schnelle und geduldige Fälle, b3 trägt die Preis-Hälfte des Claims |
| tonprofil | Wert aus `stimme.regler` und `markenvertrag.stimmeRichtung`: "Ruhig und genau: die Zahl vor dem Adjektiv, die Rechnung vor der Meinung". | `stimmeRichtung` aus Vorgänger 07; Regler: Annahme bis Schritt 8 |
| pflichten | Sie auf allen Kanälen. Jede Zahl mit Quelle und Zeitraum. Neben jeder Warte-Geschichte ein schneller Beleg. Nur eigene Objekte, Orte und Gesichter. | Verweise `anrede` (Seed "Sie, überall"), `gate1.schaerfung` (Muster 5.2), Belegpflicht aus `stimme.verbindlich` |
| verbote | Sanduhr, Uhr, Countdown als Bild für Zeit. Handschlag, Schlüsselübergabe, Familie im Bild. Druck mit einer Frist, die es nicht gibt. Warten empfehlen ohne Rechnung. Politik. Neu aus diesem Kernsatz: Kalenderblätter, Zeitraffer, Zeiger und Zifferblatt in jeder Form. | Verweise `markenvertrag.falschWaere` (Vorgänger 07), `richtung.tabus` (Seed `tabus`); neu: Klischeeliste, soweit nicht im Vertrag |
| einschraenkungen | vier Einträge, siehe unten | neu |
| erfolgsmass | Anfragen mit dem Anlass Erbe oder Anlage aus Döbling, Währing und Hietzing je Quartal, davon über Notare oder Steuerberatung; Ausgangswert Lücke. | Verweis `markenvertrag.erfolgsmass`, Vorgänger 07 |

**Einschränkungen.**

| Id | Regel | Art | Prüfung | Weil |
|---|---|---|---|---|
| E1 | Keine Zahl ohne ihre Zeit. Jede Kachel mit Preis, Fläche, Ertrag oder Marktzahl trägt das Zeitmaß. Kacheln ohne solche Zahl tragen es nicht. | output | Renderer: Kachel mit Zahl und ohne Zeitmaß ist ein Fehler; Kachel mit Zeitmaß ohne Zahl ebenso | `brief.kernsatz`, Attribut Genau |
| E2 | Eine Stelle, zwei Träger der Akzentfarbe. Wo das Zeitmaß erscheint, steht es in jedem Format an derselben Stelle. Die Akzentfarbe tragen nur das Zeitmaß und die Wortmarke; keine Fläche, kein Fließtext. | output | Renderer: Position je Format aus `system.zeichen`; Akzent nur in Zeitmaß und Wortmarke | G9, R7 Prinzip 5; `vorlieben.bestandBehalten` (Behandlung der Wortmarkenfarbe, siehe Begründungskette) |
| E3 | Das Zeitmaß setzt nur der Renderer, aus den Daten eines Belegs: Beginn und Ende für eine Spanne, ein Datum oder den Stand einer Marktzahl für den Punkt. Nie von Hand, nie geschätzt, nie gerundet über die Unterlage hinaus. | prozess | Etikettfeld mit Sperrstufe fest; Quelle `beweise[i].zeitraum`; fehlt er, rendert die Kachel als Lücke "Dauer fehlt" und ist nicht veröffentlichbar | `stimme.verbindlich` keine Zahl ohne Beleg; erzwingt, dass das Team für jeden Fall die Daten beschafft |
| E4 | Er sitzt. Porträts im Feed zeigen ihn sitzend, frontal, auf Augenhöhe, im weichen Tageslicht von der Seite. Archivbilder, die das erfüllen, zählen; neue Aufnahmen entstehen am Vormittag. | output | Kontaktbogen-Markierung "sitzend" und "Licht seitlich" in beiden Durchgängen (Schritt 11) | Wer Zeit verkauft, hetzt nicht im Bild; Attribut Ruhig; `vorlieben.profil.licht` weich, Sicherheit hoch (Vorgänger 03) |

Gegenüber Fassung 1 ist die frühere Einschränkung "gedreht wird bei Vormittagslicht, nie aus dem Archiv" aufgelöst: Sie widersprach dem Wandtest auf `vorab.material`, der Kontaktbogen-Kuratierung in Schritt 11 und dessen Setzung, dass ein Porträt-Termin erst unter acht verwendbaren Gesichtsbildern nötig ist, und hätte bei jedem Makler einen Drehtag erzwungen. Jetzt entscheidet das Licht im Bild, nicht das Alter der Datei.

#### Die Varianten

Die Werte sind eine Ableitung des Verfassers am Papier und am Muster, nicht an seinem echten Porträt; im Betrieb setzt das Team sie am Render. Bewertung in der Reihenfolge Herleitung, Eigentum, Vertrag, Anwendung, Herstellbarkeit. Wandtest in der Reihenfolge rational, emotional, als Anzeige, im Raster; Porträt und Raster sind für Markus offen, weil kein verwendbares Porträt vorliegt (Vorgänger 03 und 11).

| Id | Weg | Von | Skizze | Herleitung in einem Satz | Bewertung | Wandtest | Urteil |
|---|---|---|---|---|---|---|---|
| V1 | notation | Claude | **Das Zeitmaß**: eine waagrechte Maßlinie wie auf einem Bauplan, unten links in der sicheren Fläche; Länge nach der Dauer | Architekten bemaßen Raum, Markus Leitner bemaßt Zeit, weil bei ihm der richtige Zeitpunkt eine Leistung ist. | 5 5 5 5 5 | Ort: ja ja ja; Raster am Muster: ja; Porträt offen | **Empfehlung** |
| V2 | nebeneinander | Claude | **Das Zeitpaar:** jedes Haus zweimal, zu zwei Zeitpunkten, als Doppelbild | Zwei Zeitpunkte nebeneinander zeigen, dass der richtige Zeitpunkt den Preis macht. | 4 4 4 2 1 | ja ja ja nein | verworfen: für zwei Zeitpunkte je Haus fehlt Material, bei 2 bis 4 Stunden im Monat nicht herstellbar; im Raster zwei halbe Bilder, der Code zerfällt. Der Gedanke geht als Kann-Motiv an Schritt 11 |
| V3 | weltzeichen | Regeln | **Die Kante** der Welt Kontrast, heutiger Vorschlag aus `hmWeltVorschlag` | keine: die Kante zeigt Entscheidung, nicht Zeit | nicht bewertet | nicht gerendert | Vergleich, nie wählbar; jeder Makler der Welt Kontrast trägt sie (KETTE_IST 2.7) |
| V4 | setzweise | Claude | **Die Stand-Zeile:** jede Kachel datiert wie ein Tagebuch, Ort, Wochentag, Datum | Wer den richtigen Zeitpunkt berät, datiert jede Aussage. | 3 2 5 3 5 | ja nein ja ja | verworfen: Zeitungskonvention, Austauschtest nicht bestanden; ein Datum ohne Zahl sagt nichts über den Preis. Kehrt ausdrücklich nicht als Punkt-Zustand zurück (F15) |
| V5 | ort | Claude | **Die Pause:** das obere Drittel jeder Kachel bleibt leere Wand in Sievering | Raum lassen heißt Zeit lassen. | 2 1 4 4 5 | ja nein ja ja | verworfen: passt auf jeden Makler mit ruhiger Grammatik, kein Wort des Kernsatzes |
| V6 | ersetzung | Claude | **Dienstag, 11 Uhr:** eine Zeigerstellung als Zeichen, aus dem festen Termin | Sein fester Termin steht für Zeit, die er sich nimmt. | nicht bewertet | nicht gerendert | fällt bei Q8 vor dem Wandtest: Zeiger und Uhr stehen in den Verboten. Claude hat sie trotz Prompt vorgeschlagen, weil "Zeigerstellung" das Wort Uhr vermeidet; Q8 prüft deshalb Form und Motiv, nicht nur Wörter. Der Termin bleibt Rhythmus für Schritt 12 (`antworten.cue`) |
| V7 | bestand | Regeln | **Das Monogramm** aus dem Bestandslogo, geschärft | keine Herleitung aus dem Kernsatz, nur aus dem Bestand | nicht bewertet | nicht gerendert | Vergleich; das Bestandslogo wird in Schritt 10 als Wortmarke geschärft, sobald `vorab.logoAlt` vorliegt |
| V8 | ersetzung | Claude | **Das Baujahr:** das Baujahr jedes Hauses als große Zahl | Das Alter eines Hauses erzählt, dass Zeit Wert ist. | 2 3 3 3 3 | nein ja ja ja | verworfen: verschiebt die Idee zur Herkunft, die in Schritt 6 Story-Ebene wurde (Muster 5.2); ob "1902" Baujahr ist, ist ungeklärt (Lücke, Muster 5.7) |
| V9 | portraetregie | Claude | **Die geschlossene Mappe:** jedes Porträt zeigt ihn vor der Unterschrift, die Hände ruhen auf einer geschlossenen Unterlage, nie beim Unterschreiben | Weil der richtige Zeitpunkt eine Leistung ist, zeigt er sich im Moment davor. | 4 2 4 2 4 | ja ja nein nein | verworfen als Zeichen: in drei Sekunden und im Raster nicht lesbar, auf Karte und Schild ohne Bild nicht vorhanden, und eine Mappe tragen viele. Übernommen als Kann-Regel für die Haltung in Schritt 11 (`bild.regeln.haltung`) |
| V10 | verschmelzung | Claude | **Die Bemaßung am Haus:** die Maßlinie wird direkt auf eine Kante des Fotos gelegt, Gesims, Handlauf oder Tischkante | Das Haus trägt seine eigene Zeit: seine Kante wird zur Maßlinie des richtigen Zeitpunkts. | 4 4 4 3 2 | ja ja ja ja | verworfen als eigenes Zeichen: jedes Bild müsste von Hand ausgerichtet werden, und ohne Foto (Karte, Schild, Signatur) gibt es keine Kante. Übernommen als Crop-Regel: Eine Waagrechte des Fotos liegt auf der Höhe des Zeitmaßes, gezeichnet wird auf das Foto nicht (Code C3) |
| V11 | notation | Regeln | V1 mit Ausschnitt nah | wie V1 | 5 5 5 4 5 | Ort: ja ja ja; Raster am Muster: ja, mit Befund; Porträt offen | **Gegenentwurf**, Zwilling auf der Achse `ausschnitt` |

Elf Einträge. Wählbar nach Q8: V1, V2, V4, V5, V8, V9, V10, also sieben Varianten aus sieben Wegen (notation, nebeneinander, setzweise, ort, ersetzung, portraetregie, verschmelzung); die Breite ist mit Abstand erfüllt. Claude hat acht Varianten geliefert (V1, V2, V4, V5, V6, V8, V9, V10), eine fiel bei Q8. Gerendert wurden sieben plus der Zwilling, nicht elf. Zwei Varianten bestehen alle Tore (V1, V10), V1 gewinnt in Anwendung und Herstellbarkeit, und die Stärke von V10 lebt als Code weiter.

**Austauschtest in der Kohorte des Seeds.** Die Regel meldet eine Nähe im Wortfeld Warten zu Makler `elif` (Favoriten), Fundstelle `workshop.geschichte.herkunft`. Urteil des CD: kein Konflikt, anderes Gebiet, und die Fundstelle handelt nicht vom Zeitpunkt eines Verkaufs. Protokoll: `{maklerId: "elif", wortfeld: "warten", feld: "workshop.geschichte.herkunft", cdUrteil: "kein Konflikt"}`, ohne Wortlaut. Teil a (Wortstamm) steht auf "nicht geprüft", weil die Seed-Kohorte mit zwei weiteren Maklern unter der Mindestgröße liegt; Teil b ist grün (kein Makler in Döbling, Vorgänger 03); Teil c steht auf "nicht geprüft", weil keine vorläufige Akzentfamilie vorliegt (`vorab.logoAlt` fehlt) und geht an Schritt 10 (E8).

**Konventionsprobe.** Treffer "Bemaßung": Maßlinien kennt das Immobilienmarketing aus Grundrissen. Unterscheidung des CD: Das Zeitmaß bemaßt nie Fläche, trägt nie Meter und erscheint nie auf einem Grundriss; es misst ausschließlich Dauer. Diese Abgrenzung geht als Eintrag in `system.zeichen.nie` an Schritt 10. Die Probe gegen das Kerngebiet steht auf "nicht geprüft", bis `vorab.wettbewerb` vorliegt. Risiko, offen benannt: Zeigt sich dort, dass Mitbewerber mit Bemaßungsgrafik arbeiten, fällt Eigentum unter 3 und die Idee wird mit neuer Version neu entschieden.

#### Die Idee

| Feld | Inhalt |
|---|---|
| satz | **Neben jedem Preis steht seine Zeit.** |
| Herleitung für den Reveal | Sie haben bestätigt: Zeit ist Teil des Preises. Darum steht bei Ihnen neben jedem Preis seine Zeit. (Claim aus `botschaften.claim`, Muster 5.3) |
| zeichen.name | Das Zeitmaß |
| zeichen.form | Eine waagrechte Maßlinie wie auf einem Bauplan. Zwei Zustände: als **Spanne** mit zwei senkrechten Endstrichen und der Dauer darüber ("11 Wochen", "2 Jahre"), wenn ein Beleg Beginn und Ende hat; als **Punkt** mit einem Endstrich und dem Datum darüber, wenn ein Beleg einen Zeitpunkt oder eine Marktzahl einen Stand hat. Die Länge der Spanne folgt der Dauer auf einer festen logarithmischen Skala (3.12). Etiketten in Tabellenziffern. Lage immer an der Unterkante der sicheren Fläche, bündig am linken Rand. Auf der Endkarte einer Folge trägt das Zeitmaß das Bild: dieselbe Stelle, das Etikett groß. |
| zeichen.herleitung | Architekten bemaßen Raum, Markus Leitner bemaßt Zeit, weil bei ihm der richtige Zeitpunkt eine Leistung ist. |
| zeichen.gehoert | markus |
| grammatik | Welt `ruhig` (Weite). Übernommen: Proportion mit viel Grund, breiter Rand, seitliches Tageslicht, Kamera in Kopfhöhe, ein Motiv je Bild, Porträt frontal mit ruhigem Blick. Nicht übernommen: das Zeichen "Das Fenster 3:4". |
| neuInEinemPunkt | Neu ist, dass Zeit bemaßt wird wie Raum, und dass diese Linie durch sein ganzes Profil läuft: als Zeitmaß, wo eine Zahl steht, als Kante im Foto, wo keine steht, und als Bildträger am Ende jeder Folge. |

Warum zwei Zustände: Sein Claim handelt vom *Zeitpunkt*, seine Belege von *Dauern*. Der Punkt ist der Zeitpunkt, die Spanne die Dauer. Ein Zeichen, das beides kann, macht aus jeder Zahl eine Aussage über Zeit, ohne ein Wort mehr (Ableitung). Beide Zustände brauchen Daten. Für Markus liegt heute kein datierter Beleg für einen Punkt vor; das Muster zeigt dafür den Lückenzustand. Ein Stand-Datum auf Kacheln ohne Zahl gibt es nicht.

Warum die logarithmische Länge: Die Linie wird zur Variable eines festen Zeichens. Das Haus in Sievering mit 11 Wochen bekommt eine Linie über knapp die Hälfte der nutzbaren Breite (0,499), die Erbengemeinschaft mit zwei Jahren eine über knapp sechs Siebtel (0,855; sechs Siebtel wären 0,857). Wer den Feed durchsieht, sieht schnelle und geduldige Entscheidungen nebeneinander, und genau das ist die Schärfung aus Schritt 6: Warten klingt nie wie Zögern, weil die kurze Linie daneben steht. Das Prinzip "Konstante plus eine Variable" folgt dem Public Theater (https://www.pentagram.com/work/the-public-theater-2020-2021-season).

Warum Weite und nicht Maßstab als Grammatik: Maßstab trägt sichtbares Raster und Haarlinien. Das Zeitmaß wäre dort eine Linie unter vielen. Weite gibt der einen Linie Raum, und ein Raster soll nur sichtbar sein, wo es selbst die Idee ist (Vignelli, R2 1.8). Die Dichte-Vorliebe spricht ebenfalls für Weite (`vorlieben.profil.dichte` viel Raum, Sicherheit hoch, Vorgänger 03).

#### Die Codes

| Code | Art | Regel | Herleitung |
|---|---|---|---|
| C1 | zeichen | Das Zeitmaß, nur mit belegter Dauer oder belegtem Zeitpunkt, immer an derselben Stelle | `brief.kernsatz`, E1, E2, E3 |
| C2 | portraet | Er sitzt, frontal, auf Augenhöhe, im weichen Tageslicht von der Seite. Die Einstellungsgröße gehört nicht zum Code; sie ist die Achse | E4 |
| C3 | serienformat | Die Linie durch das Profil: In jeder Kachel liegt eine Waagrechte auf der Höhe des Zeitmaßes, das Zeitmaß selbst oder eine Kante im Foto (Tischkante, Fensterbank, Gesims, Handlauf, im nahen Ausschnitt die Schulterlinie). Jede Folge endet mit ihrer Zeit: Die letzte Seite oder das letzte Bild zeigt das Zeitmaß als Bildträger mit der Dauer des Falls | V10; Vorgabe an Schritt 11 (der Crop folgt dem Zeichen und wird selbst wiedererkennbar) und an Schritt 12 (`serien.bildaufbau`, Beleg-Seite in `karussellRollen`) |

Die Akzentfarbe ist kein Code, sie ist Eigenschaft von Zeitmaß und Wortmarke. In der Profilansicht lesen sich die Waagrechten einer Reihe als eine Linie (Muster, Profilraster). Das ist eine Ableitung am Muster und am echten Porträt zu bestätigen.

**Codes je Kachelklasse (`idee.codesJeKlasse`, Abnehmer 12 `codesPruefung`).**

| Klasse | Beispiel | Sichtbare Codes | Zulässig |
|---|---|---|---|
| a. Gesicht, keine Zahl | Porträt, Talking-Head-Titel, Claim auf Porträt | C2, C3 (Tischkante oder Schulterlinie auf der Höhe) | ja |
| b. Gesicht mit Zahl | Reel-Titel zu einem Fall | C1, C2, C3 | ja |
| c. Keine Person, mit Zahl | Objekt Sievering mit 11 Wochen, Endkarte | C1, C3 (Kante im Foto oder Bildträger) | ja |
| d. Keine Person, keine Zahl | reines Ortsbild, reine Textkachel | nur C3 | **nein** im Raster; als Folgeseite im Karussell oder mit Gesicht; fehlt beides, Lückenkachel |

Für Schritt 12 und 13 heißt das: Sachplätze im Raster sind bei Markus Zahl-Kacheln mit Zeitmaß. Das passt zur Idee und zum Attribut Genau, erzwingt aber, dass für jeden Sachplatz ein Beleg mit Daten vorliegt (E3). Die Anlegerwohnung Währing (b3) ist heute eine Lückenkachel, weil die Dauer fehlt.

#### Gezeigt

| Feld | Inhalt |
|---|---|
| empfehlungId | V1 |
| gegenentwurfId | V11 |
| achse | `ausschnitt`: halbnah in der Empfehlung (Kopf etwa 20 Prozent der Fensterhöhe, Hände und Unterlage im Bild), nah im Gegenentwurf (Kopf etwa 40 Prozent, Kopf und Schulter, der Rand schneidet an) |
| warum diese Achse | Regelstufe 1 streicht `dichte` (die Grammatik Weite legt sie fest) und `zeichengewicht` (C3 legt fest: Signatur in der Kachel, Bildträger auf der Endkarte). Regelstufe 2 findet keinen offenen Widerspruch: `vorlieben.widersprueche` ist für Markus leer, W2 ist ohne gemessene Bestandsfarbe nicht auslösbar (Vorgänger 03), und "Ja, dunkel passt." antwortet auf die Vorauswahl des Teams in n1 ("ich habe die dunkle vorausgewählt", Seed `wb-store.jsx` Zeile 102 und 103), zählt also nicht. Regelstufe 3: Ausschnitt ist die einzige offene Dimension ("Beides gleich" nach 9 Sekunden, Sicherheit 0), vor Typografie (0,3) und tonwert (Minimum aus Licht 1,0 und Farbtemperatur 0,8). |
| warum die Empfehlung | Halbnah zeigt Hände und Unterlage, also Arbeit statt Pose (Attribut Aufrichtig: "zeigt Arbeit", Vorgänger 07); die Tischkante als Waagrechte auf der Höhe des Zeitmaßes ist im halbnahen Bild natürlich vorhanden (C3). Offen und im Betrieb zu prüfen: ob nahe, angeschnittene Porträts im Kerngebiet Konvention sind (`vorab.wettbewerb`, Lücke). |
| warum der Gegenentwurf trägt | Nah macht das Gesicht zum größten Element jeder Personenkachel, das stärkste Asset (Willis und Todorov 2006) wird größer, und die Schulterlinie hält die Höhe des Zeitmaßes. Befund am Muster: Im nahen Ausschnitt stößt Text oben an die Kopfzone; der Gegenentwurf braucht eine eigene Textlage im Bildfeld (`vorlagen[].bildfeld.textlage`, erlaubtes Feld der Achse in Schritt 12). |
| herstellbar | Beide Fassungen nutzen dieselben Originalbilder: Porträts werden halbnah mit genug Auflösung aufgenommen, nah ist ein Zuschnitt (Vorgabe an `fotobrief.formateUndCrops`, Setzung: mindestens 24 Megapixel). So bleibt Schritt 15 Q5 (identische Originale) erfüllbar. |
| schwaches Signal | "Ja, dunkel passt." steht als `signal: "schwach"` im Protokoll. Dunkel bleibt als Gegenton-Kachel im Feed sichtbar (`grammatik.tonwertPeriode`, Schritt 12), ohne als seine Wahl ausgegeben zu werden. |
| abgenommen | im Beispiel offen |

#### Die Begründungskette (Auszug)

| Entscheidung | Weil | Quelle | Signal |
|---|---|---|---|
| Zeichen ist eine Maßlinie für Zeit | Der Kernsatz macht den richtigen Zeitpunkt zur Leistung; eine Bemaßung macht eine Größe sichtbar | `brief.kernsatz` | stark |
| Zwei Zustände, Punkt und Spanne, nur mit Daten | Claim über den Zeitpunkt, Belege über Dauern; keine Zahl ohne Beleg | `botschaften.claim`, `brief.belege`, `brief.einschraenkungen[E3]` | stark |
| Länge der Spanne folgt der Dauer | Schnelle und geduldige Fälle stehen sichtbar nebeneinander, Warten klingt nie wie Zögern | `gate1.schaerfung` | stark |
| Maße im Raster: Strich 6 px, Endstrich 56 px, Etikett 92 px | Der Code muss in der Profilansicht lesbar sein; 92 px ist die Mindestgröße für Text im Raster | `grammatik.minTextKachelPx` (Schritt 12), 3.12 | stark |
| Grammatik Weite | Die eine Linie braucht Fläche; seine Dichte-Vorliebe ist viel Raum | `vorlieben.profil.dichte`, `brief.einschraenkungen[E2]` | stark |
| Akzentfarbe nur in Zeitmaß und Wortmarke | Er hängt an seiner Farbe; beim Schärfen darf sie nicht aus der Wortmarke verschwinden, und nichts Vorhandenes verschwindet ohne sein Wort | `vorlieben.bestandBehalten` (für Markus leer, Datei fehlt, Vorgänger 03: Annahme, dass "Eine Farbe" markiert wird) | schwach, Annahme |
| Behandlung der Wortmarkenfarbe | Steht eine Farbe in `bestandBehalten`, trägt die Wortmarke sie weiter, und das Zeitmaß teilt sie. Widerspricht sie der Farbtemperatur (W2, Schritt 3), entscheidet der Workshop über `workshop.klaerungen`, nicht dieser Schritt. Steht keine Farbe darin, wählt Schritt 10 den Akzent frei | `vorlieben.bestandBehalten`, `vorlieben.widersprueche` | Regel |
| Der Ton darf zurückhaltender sein | Nebengrund für den Spielraum in Schritt 10, nicht für die Wahl der Farbe | Seed n2 zweiter Satz, antwortet auf einen Farbvorschlag des Teams aus v1 | schwach |
| Schrift mit Tabellenziffern und eindeutigen Ziffern ab 92 px im Raster | Die Ziffern im Zeitmaß tragen die Idee | `idee.zeichen.form` | stark |
| Ruhige Display-Schrift mit geringem Strichkontrast | Ton ruhig und genau; Schriftcharakter geringer Kontrast (mittel) | `brief.tonprofil`, `vorlieben.profil.typografie` | stark und mittel |
| Weiches Tageslicht von der Seite | Ruhe im Bild; Licht weich mit hoher Sicherheit | `brief.einschraenkungen[E4]`, `vorlieben.profil.licht` | stark |
| Porträt sitzend | Wer Zeit verkauft, hetzt nicht im Bild | `brief.einschraenkungen[E4]` | stark |
| Waagrechte im Bild auf Höhe des Zeitmaßes | Der Crop wird selbst Teil des Zeichens; Stärke von V10 ohne Handarbeit je Bild | `idee.codes[C3]`, `idee.varianten[V10]` | stark |
| Keine Kachel ohne Person und ohne Zahl im Raster | Sonst trägt die Kachel nur einen Code | `idee.codesJeKlasse`, 12 `codesPruefung` | Regel |
| Gegenentwurf nah | Ausschnitt ist seine einzige offene Vorliebe | `vorlieben.profil.ausschnitt` (Sicherheit 0) | stark |

Die Farbwerte, die Schriftfamilie und die Wortmarke entstehen erst in Schritt 10. Der Farbton des Bestandslogos ist unbekannt (`vorab.logoAlt.farben`, Lücke); das Muster zeigt das Zeitmaß deshalb in der Textfarbe.

#### So klingt es später

Reveal, Folie nach dem Vertrag: "Zeit ist Teil des Preises." Darunter, eine Zeile kleiner: "Neben jedem Preis steht seine Zeit." Danach sein Feed im Handy, die Zahl-Kachel mit dem Zinshaus Sievering und einer Linie über knapp die halbe Breite, "11 Wochen". Zur Achse: "Dieselbe Marke, ein Unterschied: näher an Ihnen. Bei den Bildpaaren war Ihnen der Ausschnitt gleich. An Ihrem eigenen Bild entscheidet es sich leichter."

Markenbuch, erstes Kapitel: "Zehn Ideen haben wir geprüft, sieben davon in Anwendung. Die Kante aus Hell und Dunkel fiel, weil sie Entscheidung zeigt und nicht Zeit. Das Zeitpaar fiel, weil es für jedes Haus zwei Zeitpunkte braucht, die es nicht gibt. Die Uhr fiel, bevor sie gezeichnet war. Geblieben ist eine Linie, die Zeit bemaßt wie ein Plan den Raum, und aus der Bemaßung am Haus die Kante, die in jedem Bild auf ihrer Höhe liegt."

---

### 3.12 Maße des Zeichens im echten Raster

Ein Code wirkt dort, wo das Profil als Ganzes gesehen wird. Deshalb sind die Maße gegen die Profilansicht gerechnet, nicht gegen das offene Bild (Muster `muster/09_idee.html`, alle Werte vom Skript gerechnet).

| Größe | Wert (Setzung, am Muster geprüft) | Rechnung |
|---|---|---|
| Fenster | 3:4-Fenster im Post 1080 x 1350: 1012,5 x 1350 px, seitlich je 33,75 px abgeschnitten | Schritt 10 `system.raster`, Schritt 12 |
| Nutzfläche | Rand 72 px je Seite im Fenster, nutzbare Breite 868,5 px (Arbeitswert, Schritt 10 setzt den Rand) | 1012,5 minus 2 x 72 |
| Maßstab im Raster | Kachelbreite 129 pt bei 390 pt Telefonbreite, Faktor 0,127 | 129 / 1012,5 |
| Strich | mindestens 6 px auf 1080, im Raster etwa 0,76 pt, bei dreifacher Bildschirmdichte gut zwei Pixel | 6 x 0,127 |
| Endstrich | 56 px hoch, im Raster etwa 7 pt | 56 x 0,127 |
| Etikett | mindestens 92 px, gleich `grammatik.minTextKachelPx`, im Raster etwa 11,7 pt; auf der Endkarte 200 px | 92 x 0,127 |
| Lage | Linie bei 1230 px, 91 Prozent der Höhe, bündig am linken Rand der Nutzfläche; in anderen Formaten dieselbe relative Stelle in der sicheren Zone (Schritt 10) | |
| Länge | Länge = 0,12 + 0,88 x ln(Dauer in Wochen) / ln(260), Dauer in Wochen gleich Kalendertage durch 7, begrenzt auf 1 bis 260 Wochen, darüber 1,0 | 11 Wochen 0,499 (434 px), 1 Jahr 0,745, 2 Jahre 0,855 (743 px), 5 Jahre 1,0 |

Die frühere Angabe "Etiketten in kleinen Graden" ist gestrichen: Sie widersprach der Mindestgröße für Text im Raster aus Schritt 12. Die Folge ist gewollt: Das Etikett ist groß genug, um im offenen Bild als zweite Headline zu wirken, und das Zeichen ist damit nicht mehr das kleinste Element der Kachel.

---

## 4. Fragen an den Makler

**Keine.** Jede Eingabe, die dieser Schritt braucht, liegt nach den Schritten 1 bis 8 vor. Eine Frage an dieser Stelle würde entweder einen vorhandenen Wert erneut erheben oder ihn zur Gestaltung auffordern, und beides schließt die Rubrik aus.

**Was abgeleitet wird statt gefragt:**

| Was man fragen könnte | Warum nicht | Woher es kommt |
|---|---|---|
| Welche Farbe mögen Sie? | Farbe ist Gestaltung, und Farbe allein trägt am wenigsten | `vorlieben.bestandBehalten`, `vorab.logoAlt`; ein Konflikt mit dem Profil läuft über `vorlieben.widersprueche` in den Workshop; Feinabstimmung über `system.spielraum` nach der Rückmeldung |
| Hell oder dunkel, nah oder halbnah? | Eine offene Vorliebe wird nicht abgefragt, sondern in Anwendung gezeigt; eine Vorauswahl mit "Passt das?" wäre eine vorbelegte Haltung | Achsenregel, Gegenentwurf im Reveal |
| Was könnte Ihr Zeichen sein? | Die heutige Frage `assets` hat die Welt verschoben, nicht das Zeichen personalisiert (FRAGEN_WIRKUNG_IST, Zeile 117); die Antwort lebt in `vorlieben.bestandBehalten` und in der Fremdkategorie-Übung | `vorlieben`, `workshop.fremdkategorie` |
| Wie soll Ihre Marke wirken? | Adjektivabfragen erzeugen austauschbare Stile; Gründe für Geschmack verschlechtern die Wahl | `markenvertrag.attribute`; Wilson und Schooler 1991: https://doi.org/10.1037//0022-3514.60.2.181 |
| Gefällt Ihnen die Idee? | Nie; die Rückmeldung läuft am Folgetag entlang des Vertrags | Schritt 15, `rueckmeldung.jeKriterium` |
| Welche Bilder dürfen wir nutzen? | Liegt schon vor | `vorab.material.rechte`, `auftrag.einwilligungen` |
| Wann genau begann und endete der Verkauf? | Kein Gestaltungsthema, sondern eine Unterlage | `workshop.aufgaben` (Unterlage zum Beleg), dann `beweise[i].zeitraum` |

Fehlt Material, entsteht keine Frage in diesem Schritt, sondern ein bekannter Weg: fehlende Logo-Originaldatei und fehlende Daten zu Belegen als `workshop.aufgaben`, fehlendes Porträt als `bild.portraetTermin` in Schritt 11.

---

## 5. Eingang und Ausgang

### 5.1 Eingang

| Feld | Von | Wofür in diesem Schritt |
|---|---|---|
| `markenvertrag` (leitidee, attribute, stimmeRichtung, falschWaere, erfolgsmass, version, bestaetigtAm) | 7 | Sperre, Kernsatz als Verweis, Verbote, Vertragstor, Erfolgsmaß |
| `positionierung` | 7 | Aufgabe |
| `beweise` (mit `zeitraum`, wo vorhanden) | 7 | `brief.belege`, Etiketten und Länge des Zeichens in Renders |
| `botschaften.claim` | 8 | Idee-Satz antwortet auf den Claim, Sperre |
| `stimme.regler` | 8 | Tonprofil, Schriftrichtung |
| `territorien` des gewählten Wegs (zeichenIdee, typoRichtung) | 6 | Ausgangspunkt einer Variante, Schriftrichtung |
| `richtung.tabus` | 6 | Verbote, Achsenregel Stufe 1 |
| `gate1` (schaerfung, verworfenWeil) | 6 | Pflichten, Begründung |
| `vorlieben.profil`, `bestandUrteil`, `bestandBehalten` | 3 | Grammatik, Achsenregel Stufe 3 (über `hmWirksam`), Bestandsvariante, Farbrolle, Wortmarkenfarbe |
| `workshop.falschWaere`, `workshop.fremdkategorie` | 4 | Verbote, Rohstoff für Varianten |
| `vorab.logoAlt` (darin `farben`), `vorab.material` | 1 | Bestandsvariante, vorläufige Akzentfamilie für Q7 Teil c, echte Bilder für den Wandtest |
| `HM_MARKENWELTEN` | intern | Grammatik-Rohstoff, Welt-Zeichen nur als Vergleichsvariante |

**Abweichungen im Eingang, begründet:**

| Neu | Von | Warum | Folge für die Zerlegung |
|---|---|---|---|
| `einsicht.zielgruppe`, `einsicht.spannung` | 5 | `brief.einsicht` und `brief.publikumAlsPerson` müssen Verweise sein, sonst entsteht eine zweite Einsicht | Schritt 5 bekommt 9 als Nachfolger, Schritt 9 bekommt 5 als Vorgänger (in `05_einsicht.md` 5.2 schon so geführt) |
| `workshop.klaerungen`, `workshop.zitate` | 4 | Achsenregel Stufe 1 und 2; Zitate als Quelle in `idee.begruendung`. Nur eigene Sätze des Maklers zählen in Stufe 2, keine Antworten auf vorbelegte Optionen | keine, 4 ist schon Vorgänger |
| `vorlieben.widersprueche` | 3 | Achsenregel Stufe 2; Behandlung der Wortmarkenfarbe | keine, 3 ist schon Vorgänger |
| `vorab.wettbewerb` (konventionNotiz) | 1 | Konventionsprobe gegen das Kerngebiet (3.5) | keine, 1 ist schon Vorgänger |
| `anrede` | 8 | Pflicht im Brief als Verweis auf die eine Funktion, keine zweite Anrede-Logik | keine, 8 ist schon Vorgänger |
| Kohorte: `markenvertrag.leitidee`, `idee.zeichen.name`, `idee.grammatik.welt`, Gebiet und vorläufige Akzentfamilie der anderen UNIO-Makler | extern (Store oder Kohortenindex, 8.8) | Austauschtest, Leitfrage 2 | wie bei Schritten 6 und 14 als extern geführt |

Nicht als Eingang genommen: `antworten` aus Schritt 2. Was der Makler dort gesagt hat und hier zählt, ist über Schritte 3, 4, 7 und 8 schon verdichtet. Die Nachricht n2 aus dem v1-Seed ist kein Workshop-Zitat, sondern eine Chat-Antwort auf eine Vorauswahl; im Betrieb kommt ein solcher Satz, wenn überhaupt, über `workshop.zitate` mit dem Vermerk `antwortAufVorauswahl: true`.

### 5.2 Ausgang

**Schritt 9 ist die einzige Quelle für Zeichen, Grammatik und Achse.** Kein Nachfolger legt ein eigenes Zeichen, eine eigene Grammatik oder eine eigene Achse an, auch nicht als Arbeitsannahme. Fehlt `idee`, arbeiten die Nachfolger mit einer Lücke "kommt aus Schritt 9", nicht mit einer eigenen Idee. `system` und `bild` tragen `basis.idee {version}`; Q14 vergleicht.

| Feld | Struktur | Abnehmer |
|---|---|---|
| `brief` | `{version, aufgabe, publikumAlsPerson, einsicht {ref, text}, kernsatz {ref: "markenvertrag.leitidee", text}, belege[3] {ref, text, pruefstatus}, tonprofil {ref[], text}, pflichten[] {text, ref}, verbote[] {text, ref}, einschraenkungen[3 bis 5] {id, regel, art, pruefung, weil}, erfolgsmass {ref, text}}` | 10 (`einschraenkungen`, `verbote`, `pflichten`), 11 (`publikumAlsPerson`, `einschraenkungen`, `verbote`), 12 (`pflichten`, `einschraenkungen`), 13 (`aufgabe`, `publikumAlsPerson`), 14 (ganz) |
| `idee` | `{version, status, satz, zeichen {name, form, herleitung, gehoert, zustaende[], masse {strichPx, endstrichPx, etikettPx, etikettTraegerPx, linieY, rand}, skala {formel, minWochen, maxWochen, min}}, grammatik {welt, uebernommen[], nichtUebernommen[], warum}, neuInEinemPunkt}` | 10, 11, 12 (`zeichen.masse`), 14 |
| `idee.codes[2 bis 3]` | `{id, art zeichen, portraet, serienformat oder setzweise, regel, herleitung}` | 10, 11 (C2, C3), 12 |
| `idee.codesJeKlasse[]` | `{klasse, beispiel, codes[], zulaessig, ersatz}` | 12 (`codesPruefung`), 13 (`feed.pruefung`) |
| `idee.varianten[6 bis 12]` | `{id, weg, von, waehlbar, skizze {satz, form, grammatik, parameter, datei}, bewertung {herleitung, eigentum, vertrag, anwendung, herstellbarkeit, von} oder null, wandtest {bilder[], rational, emotional, alsAnzeige, imRaster} oder null, austausch {teilA, teilB, teilC, protokoll[] {maklerId, wortfeld, feld, cdUrteil}}, konvention {treffer, unterscheidung, cd, kerngebiet}, urteil, verworfenBei, verworfenWeil}` | 14 |
| `idee.gezeigt` | `{empfehlungId, gegenentwurfId, achse {name, empfehlung, gegenentwurf, regelstufe, warum, abweichung}, signale[] {text, quelle, signal}, abgenommen {cd, datum}}` | 10, 11, 12, 13, 15; 14 prüft `abgenommen` |
| `idee.begruendung[]` | `{entscheidung, weil, quelle, signal}`, quelle ist ein auflösbarer Pfad | 10, 14, 15 |

**Abweichungen im Ausgang, begründet:**
- `brief.kernsatz` als Verweis statt als eigener Satz: Sonst entsteht neben Leitidee, Positionierungssatz, Claim und `einSatz` ein fünfter Ein-Satz-Wert ohne abgegrenzte Funktion (Kontrolle M10). Der Vertrag verlangt "kernsatz mit genau einem Gedanken"; das prüft Q1 jetzt an der Leitidee.
- `idee.varianten[].id`, `weg`, `von`, `waehlbar`, `urteil`, `verworfenBei`, `verworfenWeil`: Ohne Id kann `idee.gezeigt` nicht verweisen, ohne `verworfenWeil` kann das Markenbuch nicht zeigen, welche Varianten verworfen wurden und warum (Erlebnis im Vertrag), ohne `weg` und `waehlbar` ist die Breitenprüfung nicht automatisierbar. `bewertung` und `wandtest` sind `null` bei Varianten, die bei Q8 fallen oder Vergleich sind.
- `wandtest.imRaster`: vierte Ansicht, weil der Code im Profilraster erkennbar sein muss und `alsAnzeige` nur das offene Bild prüft (Kontrolle M6).
- `idee.zeichen.masse` und `skala`: Schritt 10 übernimmt sie in `system.zeichen`, Schritt 12 prüft sie gegen `minTextKachelPx`, ohne sie neu zu setzen.
- `idee.codesJeKlasse`: Nachweis der zwei Codes je Kachel für Schritt 12, einschließlich der Kacheln ohne Zeitmaß (Kontrolle M7).
- `idee.gezeigt.signale` und `begruendung[].signal`: damit eine Antwort auf eine Vorauswahl nie als eigene Präferenz im Reveal erscheint (Kontrolle M3).
- `idee.gezeigt.abgenommen`, `idee.version`, `brief.version`: Schritt 10 darf erst auf einer abgenommenen Idee bauen, und zwischen Schritt 9 und der Freigabe in Schritt 16 darf sich nichts still ändern (Zerlegung 4.1).
- `grammatik` als Objekt statt nur Welt-Id: damit Schritt 10 weiß, was aus der Welt übernommen ist und dass das Welt-Zeichen ausdrücklich nicht dazugehört.
- Neue Nachfolgerkante 9 nach 12 für `idee.zeichen.masse` und `codesJeKlasse`: 12 führt 9 schon als Vorgänger (`idee.codes`), die Kante besteht also.

**Nachfolger-Symmetrie.** Die Nachfolger 10 bis 15 lesen alle ein Feld dieses Ausgangs (Spalte Abnehmer), und alle führen 9 als Vorgänger. Nötige Korrekturen in `00_ZERLEGUNG.md`: Schritt 5 Nachfolger um 9 ergänzen, Schritt 9 Vorgänger um 5 ergänzen.

**Rückwärtsverträglichkeit mit MARKE_SCHEMA v1.** Bis die Schritte 10 und 11 gebaut sind, schreibt die Werkbank `plattform.visuell` aus `idee`: `welt` aus `idee.grammatik.welt`, `idee` aus `idee.satz`, `zeichen` aus `idee.zeichen.name`, `bildsprache.regeln` aus den Einschränkungen und den übernommenen Bildregeln der Welt. `hmPfVisuell` liest dann `idee`, statt die Welt selbst zu errechnen.

---

## 6. Qualitätsprüfung im Schritt

| Nr. | Prüfung | Art | Schwelle | Sperrt |
|---|---|---|---|---|
| Q1 | Kernsatz ein Gedanke | Regel, dann Art Director | `brief.kernsatz.ref` ist `markenvertrag.leitidee`; höchstens zwölf Wörter, keine Aufzählung, kein zweites Prädikat nach "und", "sowie", "oder"; fällt die Leitidee, entsteht ein Änderungsantrag an Schritt 7 statt einer Schärfung hier | Abnahme |
| Q2 | Brief auf einer Seite | Regel | gerendert höchstens eine A4-Seite in der Markenbuch-Typografie (Setzung) | Abnahme |
| Q3 | Verweise identisch | Regel | jedes Feld mit `ref` hat denselben Text wie die Quelle, auch `kernsatz` | Abnahme |
| Q4 | Einschränkungen | Regel | drei bis fünf, je mit `art`, `pruefung`, `weil`; mindestens eine output und eine prozess | Stufe 3 |
| Q5 | Breite | Regel | sechs bis zwölf Einträge; mindestens vier wählbare Varianten aus vier verschiedenen Wegen nach Q8; jede wählbare mit Wandtest und Urteil; höchstens acht von Claude | Stufe 5 |
| Q6 | Herleitung | Regel, dann CD | ein Satz; teilt einen Wortstamm mit dem Kernsatz nach der Stammregel unten | Abnahme |
| Q7 | Eigentum | Regel, dann CD | Teil a: Herleitung trägt einen Stamm aus Kernsatz oder Belegen, der in keinem anderen Kernsatz der Kohorte vorkommt, geprüft erst ab mindestens fünf anderen Kernsätzen (Setzung); Teil b: kein Makler im selben Gebiet mit gleichem `zeichen.name` oder gleicher Formbeschreibung nach Normalisierung; Teil c: kein Makler im selben Gebiet mit gleicher Grammatik und gleicher vorläufiger Akzentfamilie; `zeichen.name` ist kein Name aus `HM_MARKENWELTEN`. Vorläufige Akzentfamilie: Farbton aus `vorab.logoAlt.farben`, soweit in `vorlieben.bestandBehalten` als Farbe markiert, gerundet auf Sektoren von 30 Grad (Setzung). Ist die Kohorte leer, unter der Mindestgröße oder fehlt die Akzentfamilie, lautet der Status des Teils "nicht geprüft", nie grün; Teil c geht dann an Schritt 10 (E8) | Abnahme, wenn ein Teil rot ist; "nicht geprüft" sperrt nicht, steht aber in Gate 2 |
| Q8 | Verbote und Tabus | Regel, vor jedem Render | Satz, Formbeschreibung und Motive enthalten keinen Eintrag aus `brief.verbote` und keine Branchenmotive; geprüft über eine Synonymliste je Verbot (etwa Uhr: Zeiger, Zifferblatt, Uhrzeit als Bild) | Stufe 4 |
| Q9 | Codes | Regel | zwei bis drei; keine `art` Farbe; mindestens einer Porträt oder Zeichen; `codesJeKlasse` vorhanden, jede zulässige Klasse mit mindestens zwei Codes, jede Klasse mit einem Code als unzulässig markiert | Abnahme |
| Q10 | Begründung | Regel | Pflichtentscheidungen aus 3.8 vollständig; jede Quelle löst im Store auf; keine Klischee-Wörter; keine Pflichtentscheidung nur mit schwachem Signal | Abnahme |
| Q11 | Achse | Regel | Achse ist ein Schlüssel von `HM_IDEE_ACHSEN`, nicht in `HM_IDEE_NIE_ACHSE`; Zwilling unterscheidet sich nur in Parametern dieser Achse; Zeichen, Kernsatz und Codes gleich; nicht durch Stufe 1 gestrichen; Grund aus Stufe 2 nur mit starkem Signal | Abnahme |
| Q12 | Stil | Regel und Team | Regel: keine Zeichen U+2013 und U+2014, keine Ausrufezeichen, keine Emojis in Brief, Idee und Render-Texten; keine Verläufe in Renders. Team-Checkbox am Render, mit Name und Datum: keine Zeile über einer Headline, keine Textzeichen als Icons | Abnahme |
| Q13 | Echtes Material | Regel | Renders nutzen nur Dateien aus `vorab.material`; für Varianten, die der Makler später sieht, nur solche mit geklärten Rechten; keine Objekte aus `hmWebObjekte`; Etiketten nur aus `beweise` mit Daten, sonst Lückenzustand | Stufe 4 |
| Q14 | Abnahme und Version | CD und Regel | `idee.gezeigt.abgenommen` gesetzt, Version erhöht; danach laufend: `system.basis.idee.version` und `bild.basis.idee.version` gleich `idee.version`. Solange eine abweichende Version gelesen wird, ist die Übergabe an 12 und 13 gesperrt und die Werkstatt zeigt "System liest Version n, Idee ist Version m" | Übergabe an 10, 12, 13 |
| Q15 | Lesbarkeit im Raster | Regel und Wandtest | `zeichen.masse.strichPx` mindestens 6, `endstrichPx` mindestens 56, `etikettPx` mindestens `grammatik.minTextKachelPx` (92); `wandtest.imRaster` ja | Abnahme |

**Stammregel für Q6 und Q7 (Setzung, Deutsch).** Beide Sätze werden kleingeschrieben, Umlaute auf ae, oe, ue und ß auf ss gebracht, Satzzeichen entfernt. Stoppwörter fallen weg (Artikel, Pronomen, Hilfsverben, Präpositionen, Konjunktionen, "kein", "nicht", Zahlwörter; Liste `HM_STOPP_DE` mit etwa 120 Einträgen). Von jedem Wort werden die Endungen -ungen, -ung, -heit, -keit, -lich, -isch, -ig, -en, -er, -es, -em, -e, -n, -s einmal abgeschnitten, das längste passende zuerst. Zwei Wörter teilen einen Stamm, wenn ein Stamm von mindestens vier Buchstaben am Anfang oder am Ende des anderen Worts steht (so trifft "zeit" auf "zeitpunkt" und "wartezeit"). Beispiel Markus: Herleitung und Kernsatz teilen "zeitpunkt" und "leistung". Grenzfälle entscheidet der Art Director, die Regel meldet nur.

Automatisierbar sind alle Regelteile als Selbsttest (Kapitel 8.5). Die menschlichen Urteile (Q1 Bestätigung, Q6 und Q7 CD-Teil, Q12 Team-Checkbox, Q14 Abnahme, Q15 Wandtest) stehen als Checkliste in der Oberfläche und werden mit Name und Datum gespeichert.

---

## 7. Typische Fehler und wie sie verhindert werden

| Nr. | Fehler | Folge | Verhinderung |
|---|---|---|---|
| F1 | Die Idee ist ein Stil ("ruhig und modern") statt ein Satz | Nichts folgt daraus, jede Welt passt | `idee.satz` muss einen Stamm aus Claim oder Kernsatz enthalten und eine sichtbare Folge nennen (Q6 sinngemäß); Art Director lehnt Adjektivsätze ab |
| F2 | Wörtliche Übersetzung in ein Stock-Symbol: Zeit wird Uhr | Klischee, sofort austauschbar | Klischeeliste des Kernsatzes zuerst, als Verbote (3.4); Q8 mit Synonymliste vor dem Render |
| F3 | Das Welt-Zeichen kommt durch die Hintertür zurück | Katalog statt Identität, zwei Kenner sehen gleich aus | Q7: kein `HM_MARKENWELTEN.zeichen.name`; Weg `weltzeichen` nie wählbar |
| F4 | Die Kohorte wächst zusammen | Zwanzig Makler, eine Marke | Pflicht zu vier wählbaren Wegen (Q5), Austauschtest (Q7) |
| F5 | Fixierung durch Beispiele | Varianten ähneln einer Referenz oder einem Makler-Feed | Keine Referenzen in diesem Schritt; Varianten nur aus eigenem Material; Makler-Feeds als Vorbild gesperrt (Jansson und Smith 1991, R2 3.5) |
| F6 | Zu viele Einschränkungen | Nichts ist mehr entscheidbar, der Brief wird Regelwerk | Obergrenze fünf (Q4); Acar u. a. 2019 |
| F7 | Nachträgliche Begründung ohne Bezug | Dekoration statt Herleitung | Quelle muss auflösen (Q10); Bierut 2005 |
| F8 | Gegenentwurf als Strohmann | Scheinwahl, der Makler merkt es | Gegenentwurf muss alle Tore bestehen, kein Kriterium unter 3, CD bestätigt volle Überzeugung (3.6) |
| F9 | Zeichen zuerst allein auf Weiß beurteilt | Falsches Urteil am Logo | Renders nur in Anwendung; Renderer für das Zeichen allein erst in Schritt 10 und im Reveal zuletzt (Mozilla) |
| F10 | Farbe wird zum Code | Schwächstes Asset trägt die Marke | Q9 |
| F11 | Erfundene Zahl im Render, etwa eine Dauer ohne Beleg | Deckel 2 in "Belegt statt erfunden" | E3-Muster: Etiketten nur vom Renderer aus Belegdaten; fehlt der Zeitraum, Lückenzustand "Dauer fehlt" statt einer Zahl (Q13) |
| F12 | Stille Änderung nach der Übergabe | Schritt 10 baut auf einem anderen Stand als Schritt 13 | Version, Abnahme und `basis.idee.version` (Q14) |
| F13 | Die Achse öffnet eine entschiedene Frage wieder | Der Makler diskutiert, was schon geklärt war | Achsenregel Stufe 1, Q11 |
| F14 | Ohne Porträt wird trotzdem entschieden | Der Porträtstil ist nie am echten Gesicht geprüft | Status "vorläufig", Porträt-Termin über Schritt 11; nie ein generiertes Gesicht |
| F15 | Das Zeichen wird Füllstoff, etwa ein Stand-Datum auf jeder Kachel | Die verworfene Stand-Zeile kehrt zurück, das Zeichen verliert Bedeutung | E1-Muster: Zeichen nur mit belegtem Inhalt; `codesJeKlasse` sichert die zwei Codes über Gesicht und Linie statt über Füllstoff |
| F16 | Eine Antwort auf eine Vorauswahl wird als eigene Präferenz ausgegeben | Der Makler bekommt einen gelenkten Satz als seinen vorgelegt | Stufe 2 schließt solche Antworten aus; `signal: "schwach"`; Q10 und Q11 |
| F17 | Das Zeichen ist im Profil nicht lesbar | Der Code wirkt nur im offenen Bild | Maße nach 3.12, Q15, Wandtest `imRaster` |
| F18 | Ein Nachfolger legt eine eigene Arbeitsannahme für Zeichen oder Achse an | Drei Zeichen für eine Marke (`14_markenbuch.md` Befund 1) | 5.2: einzige Quelle; Lücke statt Annahme; Q14 |
| F19 | Einschränkung erzwingt versteckte Kosten, etwa einen Drehtag für jeden Makler | Aufwand ohne Wirkung | Einschränkungen prüfen das Ergebnis im Bild (Licht, Haltung), nicht das Alter der Datei; Kostenfolgen gehen ausdrücklich an Schritt 11 |

---

## 8. Umsetzung in der Werkbank

### 8.1 Dateien

| Datei | Änderung |
|---|---|
| `ui_kits/werkbank/wb-idee.jsx` (neu) | Konstanten `HM_IDEE_ACHSEN`, `HM_IDEE_NIE_ACHSE`, `HM_IDEE_WEGE` (mit `waehlbar`), `HM_STOPP_DE`, `HM_KONVENTIONEN_IMMO`, `HM_VERBOT_SYNONYME`; Daten und Logik: `hmBriefVorbau(mid)`, `hmBriefPruefen(brief, m2)`, `hmStamm(wort)`, `hmStammTreffer(a, b)`, `hmIdeeVergleichsVarianten(mid)`, `hmIdeeVerbotePruefen(variante, brief)`, `hmIdeeAustauschtest(variante, kohorte)`, `hmIdeeKonvention(variante, wettbewerb)`, `hmIdeeAkzentfamilie(m2)`, `hmIdeeAchse(m2, empfehlung)`, `hmIdeeZwilling(variante, achse)`, `hmIdeeLaenge(wochen)`, `hmIdeePruefen(idee, brief, m2)`, `hmIdeeVersion(mid)`, `hmIdeeBasisPruefen(mid)`, `hmIdeeZuVisuell(idee)`; Renderer `hmIdeeSkizze` für Zeichen-Grundformen und `hmIdeeRaster` für die Profilansicht; Komponenten `IdeeWerkstatt`, `IdeeBrief`, `IdeeVariantenBrett`, `IdeeWandtest`, `IdeeEntscheidung`; `hmSelbsttestIdee`. Präfix `hm`, Export über `Object.assign(window, ...)`, kein `import()` |
| `ui_kits/werkbank/index.html` | Script-Tag für `wb-idee.jsx` nach `wb-plattform.jsx`, vor `wb-markenbuch.jsx` |
| `ui_kits/werkbank/wb-markenwelten.jsx` | `WeltPost` bekommt einen optionalen Parameter `zeichen` (Skizze aus `idee`), der das Welt-Zeichen ersetzt; `hmWeltVorschlag` wird intern und liefert eine Rangfolge der Grammatik für das Team aus `vorlieben.profil` und den Einschränkungen; `WeltWahl` verschwindet aus dem Makler-Pfad und bleibt nur in der Team-Werkstatt |
| `ui_kits/werkbank/wb-plattform.jsx` | `hmPfVisuell` liest `marke2[mid].idee` über `hmIdeeZuVisuell`, rechnet die Welt nicht mehr selbst; die zweite Bildpaar-Tabelle `aff` entfällt (FRAGEN_WIRKUNG_IST Befund 9) |
| `ui_kits/werkbank/wb-betrieb.jsx` | `["Idee", window.hmSelbsttestIdee]` in die Gruppenliste des Selbsttests |
| `ui_kits/werkbank/wb-store.jsx` | Seed-Schritt "Idee und Gestaltungsbrief" (Owner Daniel) in `hmSchritteFuer`; optional ein Seed `marke2.markus` mit dem Beispiel aus 3.11, nur aus Vorgänger-, Seed- und Musterdaten, Lücken als Lücken |
| `api/wb-marke.js` | Zwei Phasen `brief` und `idee` mit eigenen Prompts und Schemas (8.3); Dossier erweitert um die v2-Felder des Eingangs und eine Kohorten-Zusammenfassung nur aus Kennung, Gebiet und Wortfeldern, ohne Kontaktdaten und ohne Wortlaut fremder Dossiers |
| `docs/werkbank/MARKE_SCHEMA.md` | Objekte `brief` und `idee` ergänzen, `visuell` als abgeleitet kennzeichnen |
| `docs/werkbank/branding-v2/00_ZERLEGUNG.md` | Symmetrie: Schritt 5 Nachfolger plus 9, Schritt 9 Vorgänger plus 5; Eingang Schritt 9 um die Abweichungen aus 5.1; Ausgang um `codesJeKlasse`, `zeichen.masse`, `wandtest.imRaster` |
| `docs/werkbank/branding-v2/schritte/muster/09_idee.html`, `09_idee.png`, `09_idee_gen.py` (neu, liegen vor) | Muster: Zeitmaß als Spanne, Punkt (Lückenzustand) und Bildträger auf 1080 x 1350, Profilraster mit zwölf Kacheln, Empfehlung und Gegenentwurf nebeneinander, Porträts als schraffierte Lückenflächen mit Kopfzone, gerechnete Skala. Das Skript rechnet alle Maße, damit Muster und 3.12 übereinstimmen |

**Korrekturen an den Nachbardokumenten (vom jeweiligen Verfasser umzusetzen, hier verbindlich gemeldet).** Diese Datei ändert die Nachbarn nicht selbst, weil an ihnen parallel gearbeitet wird.

| Dokument | Stelle | Änderung |
|---|---|---|
| `10_system.md` | 3.6 Beispiel Markus | `idee` Version 1 übernehmen: Zeichen "Das Zeitmaß" statt "Der Zeitpunkt", Grammatik Weite statt Feuilleton (Rand, Spalten und Folio-Zeile in 10.6 neu rechnen), Achse `ausschnitt` statt Satz, Codes C1 bis C3 statt Serie "Noch nicht verkaufen"; `system.zeichen` übernimmt `idee.zeichen.masse` und die Skala; `system.zeichen.nie` um "bemaßt nie Fläche, nie auf Grundrissen"; Akzent nur in Zeitmaß und Wortmarke |
| `10_system.md` | 10.9 Tabelle | ersetzen durch den Verweis auf `HM_IDEE_ACHSEN`; "Zeichenform" als Achse streichen; bei `ausschnitt` darf `zeichen.platz` nicht abweichen |
| `10_system.md` | Datenvertrag | `system.basis.idee {version}` |
| `11_bild.md` | Arbeitsannahme Zeile 171 und Regeln Zeile 178 bis 180, Motive Zeile 292 und 293 | "Die Frist" durch "Das Zeitmaß" ersetzen; die Waagrechte liegt bei 1230 von 1350 px (91 Prozent) statt bei 38 Prozent; Achse `ausschnitt` statt "Abstand", halbnah Empfehlung, nah Gegenentwurf; Porträts halbnah mit mindestens 24 Megapixel, damit nah ein Zuschnitt derselben Datei ist; C3 als Crop-Regel, V9 als Kann-Regel für die Haltung; Licht nach E4 statt "nie aus dem Archiv" |
| `11_bild.md` | Datenvertrag | `bild.basis.idee {version}` |
| `12_social.md` | `codesPruefung`, `vorlagen` | `idee.codesJeKlasse` übernehmen; Klasse d im Raster unzulässig; Sachplätze bei Markus als Zahl-Kacheln; Vorlagenfelder `bildfeld.crop` und `bildfeld.textlage` für die Achse; Hinweis in Zeile 303 und 598 auf Version 1 aktualisieren |
| `13_feed.md` | Zeile 333 | Beispielachse "Bildführung gegen Satzführung" durch `ausschnitt` ersetzen; Achsenfelder aus `HM_IDEE_ACHSEN`; Prüfer zählt Gesichter im nahen Ausschnitt neu |
| `15_reveal.md` | 0 Punkt 7, Akt 6 (Zeile 298), 3.7 Bühne, Zeile 246 | "weil er selbst im September geschrieben hat: Ja, dunkel passt." streichen; Satz zur Achse nach 3.11 "So klingt es später"; die Bühnenregel für Tonwert gilt nur, wenn die Achse `tonwert` ist; Zeile 246 ist mit dieser Fassung erledigt (Einsicht aus Schritt 5 übernommen) |
| `03_vorlieben.md` | Zeile 288 | P3 (Menschen in Ortsbildern) ist keiner Achse mehr zugeordnet; wirkt nur auf `bild.motive` |

### 8.2 Datenfelder

Speicherort `hmStore` unter `marke2[mid]`, wie in der Zerlegung vorgeschlagen. Bilder der Varianten und Wandtests liegen in IndexedDB `unio_hm_blobs`, im Datenvertrag steht nur die Blob-Id. Nichts davon geht ins öffentliche Repo.

```js
marke2[mid].brief = {
  version: 1, erstellt: "ISO", von: "regeln" | "claude" | "team",
  aufgabe: "",
  publikumAlsPerson: "",
  einsicht: { ref: "einsicht.spannung", text: "" },
  kernsatz: { ref: "markenvertrag.leitidee", text: "" },
  belege: [{ ref: "beweise[b2]", text: "", pruefstatus: "Selbstauskunft" | "Unterlage geprüft" }],   // genau 3
  tonprofil: { ref: ["stimme.regler", "markenvertrag.stimmeRichtung"], text: "" },
  pflichten: [{ text: "", ref: "" }],
  verbote: [{ text: "", ref: "" }],            // ref leer heißt: neu aus der Klischeeliste dieses Kernsatzes
  einschraenkungen: [{ id: "E1", regel: "", art: "output" | "prozess", pruefung: "", weil: "" }],   // 3 bis 5
  erfolgsmass: { ref: "markenvertrag.erfolgsmass", text: "" },
};

marke2[mid].idee = {
  version: 1, status: "entwurf" | "vorlaeufig" | "abgenommen",
  satz: "",
  zeichen: {
    name: "", form: "", herleitung: "", gehoert: "mid", zustaende: ["spanne", "punkt"],
    masse: { strichPx: 6, endstrichPx: 56, etikettPx: 92, etikettTraegerPx: 200, linieY: 1230, rand: 72 },
    skala: { formel: "0.12 + 0.88 * ln(w) / ln(260)", minWochen: 1, maxWochen: 260, min: 0.12 },
  },
  grammatik: { welt: "ruhig", uebernommen: [""], nichtUebernommen: ["zeichen"], warum: "" },
  neuInEinemPunkt: "",
  codes: [{ id: "C1", art: "zeichen" | "portraet" | "serienformat" | "setzweise", regel: "", herleitung: "" }],   // 2 bis 3
  codesJeKlasse: [{ klasse: "a", beispiel: "", codes: ["C2", "C3"], zulaessig: true, ersatz: "" }],
  varianten: [{
    id: "V1", weg: "notation", von: "claude" | "regeln" | "team", waehlbar: true,
    skizze: { satz: "", form: "", grammatik: "ruhig", parameter: { typ: "linie", lage: "unten-links", zustaende: ["punkt", "spanne"] }, datei: null },
    bewertung: { herleitung: 0, eigentum: 0, vertrag: 0, anwendung: 0, herstellbarkeit: 0, von: "claude" | "team" },   // null bei Q8 oder Vergleich
    wandtest: { bilder: ["blob-portraet", "blob-ort", "blob-raster"], rational: null, emotional: null, alsAnzeige: null, imRaster: null },   // null bei Q8 oder Vergleich
    austausch: { teilA: "gruen" | "rot" | "nicht geprueft", teilB: "", teilC: "", protokoll: [{ maklerId: "", wortfeld: "", feld: "", cdUrteil: "" }] },
    konvention: { treffer: [""], unterscheidung: "", cd: "", kerngebiet: "nicht geprueft" },
    urteil: "empfehlung" | "gegenentwurf" | "verworfen" | "vergleich" | "offen", verworfenBei: "Q8" | "wandtest" | "tor" | "rang" | "", verworfenWeil: "",
  }],
  gezeigt: {
    empfehlungId: "V1", gegenentwurfId: "V11",
    achse: { name: "ausschnitt", empfehlung: "halbnah", gegenentwurf: "nah", regelstufe: 3, warum: "", abweichung: "" },
    signale: [{ text: "Ja, dunkel passt.", quelle: "seed:n2", signal: "schwach", grund: "Antwort auf Vorauswahl n1" }],
    abgenommen: { cd: "", datum: "" },
  },
  begruendung: [{ entscheidung: "", weil: "", quelle: "brief.kernsatz", signal: "stark" | "schwach" | "regel" }],
};

// in Schritt 10 und 11 (gemeldet in 8.1):
marke2[mid].system.basis = { idee: { version: 1 } };
marke2[mid].bild.basis   = { idee: { version: 1 } };
```

**Skizzen-Grundformen für `hmIdeeSkizze`.** Ein allgemeiner Renderer kann nicht jede Idee zeichnen. Er deckt deshalb die Grundformen ab, die die Wege brauchen: `linie` (mit Zuständen, Etikett und Länge), `punkt`, `rahmen` (Seitenverhältnis, Form), `feld` (Fläche mit Inhalt), `zeile` (typografische Zeile), `paar` (zwei Bildfenster), `ausschnitt` (Crop-Regel mit Kopfzone und Waagrechte). Was darüber hinausgeht, legt der Art Director als eigene Skizze an (`skizze.datei`, SVG oder PNG aus der Hand des Teams, in IndexedDB); dafür sind bis 30 Minuten eingeplant (3.2). Handarbeit ist erlaubt, weil ihr Ergebnis in den Datenvertrag zurückfließt. `hmIdeeRaster` setzt drei Kacheln in 129 pt Breite aus denselben Skizzen, wie im Muster.

### 8.3 Claude-Kette

Zwei neue Phasen in `api/wb-marke.js`, beide mit Structured Outputs (`output_config.format` json_schema wie im Bestand), `effort: "high"`, Dossier und System-Prompt gecacht wie heute. Gegenüber Fassung 1 schreibt die Phase `brief` keine Kernsatz-Fassungen mehr und die Phase `idee` höchstens acht Varianten; das spart Ausgabe, ohne die Breite zu verlieren, weil die Breite über Wege gezählt wird.

**Phase `brief`, Prompt (Entwurf).**
> Schritt 9a: Gestaltungsbrief. Die Felder kernsatz, einsicht, belege, tonprofil, erfolgsmass und die übernommenen Verbote stehen schon fest und werden nicht umformuliert. Schreibe nur: aufgabe (was sich beim Publikum ändern soll, ein Satz, beobachtbar), publikumAlsPerson (eine Person aus einsicht.zielgruppe, nur mit Angaben aus dem Dossier; fehlende Stücke als "Lücke"), klischees (die wörtlichen Bildübersetzungen des Kernsatzes, die jeder zuerst hätte, auch als Umschreibung, etwa Zeiger statt Uhr), vier bis sechs Einschränkungen mit art output oder prozess, pruefung und weil. Jede Einschränkung muss eine Entscheidung erzwingen, die sonst offen wäre, und das Ergebnis im Bild prüfen, nicht das Alter einer Datei.

Schema: `O({ aufgabe: S, publikumAlsPerson: S, klischees: A(S), einschraenkungen: A(O({ regel: S, art: { type: "string", enum: ["output", "prozess"] }, pruefung: S, weil: S })) })`.

**Phase `idee`, Prompt (Entwurf).**
> Schritt 9b: visuelle Varianten. Grundlage ist der abgenommene Brief. Entwirf höchstens acht Zeichen-Ideen über mindestens vier verschiedene Wege aus dieser Liste: notation, nebeneinander, verschmelzung, ersetzung, portraetregie, ort, bestand, setzweise. Mindestens eine über portraetregie. Übernimm kein Zeichen einer Markenwelt. Nutze nichts aus den Verboten, auch nicht umschrieben. Ein Zeichen, das Daten trägt, erscheint nur mit einem Wert aus den Belegen, nie als Füllung. Jede Variante: ein Name, die Form so beschrieben, dass ein Gestalter sie ohne Rückfrage zeichnen kann, der Herleitungssatz aus dem Kernsatz in einem Satz mit einem Wort des Kernsatzes, Grundform und Parameter für die Skizze, die passende Welt als Grammatik, wo das Zeichen das Bild tragen kann, das größte Risiko und ein Bewertungsvorschlag 0 bis 5. Zahlen und Orte nur aus dem Dossier; ein Etikett ohne Beleg heißt "Beleg fehlt". Danach für die beste Variante: Idee-Satz, der auf den Claim antwortet, zwei bis drei Codes (nie die Farbe allein) mit der Tabelle, welche Codes in welcher Kachelklasse sichtbar sind, neu in einem Punkt, und Begründungen mit Quelle als Pfad aus dem Dossier. Antworten des Maklers auf eine Vorauswahl des Teams sind kein Grund.

Schema: `O({ varianten: A(O({ name: S, weg: { type: "string", enum: WEGE }, form: S, herleitung: S, grundform: { type: "string", enum: ["linie", "punkt", "rahmen", "feld", "zeile", "paar", "ausschnitt"] }, parameter: S, grammatik: { type: "string", enum: WELT_IDS }, bildtraeger: S, risiko: S, bewertung: O({ herleitung: I, eigentum: I, vertrag: I, anwendung: I, herstellbarkeit: I }) }), { maxItems: 8 }), vorschlag: O({ satz: S, codes: A(O({ art: { type: "string", enum: ["zeichen", "portraet", "serienformat", "setzweise"] }, regel: S, herleitung: S })), codesJeKlasse: A(O({ klasse: S, codes: A(S), zulaessig: B })), neuInEinemPunkt: S, begruendung: A(O({ entscheidung: S, weil: S, quelle: S })) }) })`. `parameter` bleibt ein JSON-String, weil die Parameter je Grundform verschieden sind; die Werkbank prüft ihn beim Einlesen. Die Obergrenze acht prüft die Werkbank zusätzlich beim Einlesen, falls das Schema `maxItems` nicht durchsetzt.

Claude sieht keine Bilder, der Wandtest bleibt beim Team. Q8, Wandtest-Render, Austauschtest, Konventionsprobe, Achse, Zwilling und alle Prüfungen laufen im Browser.

### 8.4 Regelpfad ohne Claude

Ohne `ANTHROPIC_API_KEY` (STATUS: offen beim Owner) liefert der Regelpfad dieselbe Struktur:
- **Brief:** alle Verweisfelder gefüllt, auch `kernsatz` aus `markenvertrag.leitidee`; `aufgabe`, `publikumAlsPerson` und `einschraenkungen` als Lücke "Kommt vom Art Director: ...". Keine Mustersätze.
- **Varianten:** zwei Vergleichsvarianten deterministisch: das Zeichen der intern stärksten Welt (Weg `weltzeichen`, nie wählbar) und ein Element aus `vorlieben.bestandBehalten` (Weg `bestand`, wählbar nur mit Herleitung). Dazu die `zeichenIdee` des gewählten Territoriums als Ausgangspunkt einer wählbaren Variante, deren Weg das Team setzt. Die übrigen Plätze sind Lücken "Variante vom Team". Unter vier wählbaren Wegen bleibt der Status "vorläufig".
- **Achse, Zwilling, Prüfungen, Render, Austauschtest, Konventionsprobe:** vollständig regelbasiert, mit und ohne Claude gleich.

### 8.5 Selbsttest `hmSelbsttestIdee`

| Test | Erwartung |
|---|---|
| Kernsatz als Verweis | `brief.kernsatz.text` gleich `markenvertrag.leitidee`; ein eigener Satz im Feld wird gemeldet |
| Kernsatz ein Gedanke | "Der richtige Zeitpunkt ist eine Leistung, keine Verzögerung." besteht; ein Satz mit zwei Behauptungen und "und" fällt und erzeugt einen Änderungsantrag an Schritt 7 |
| Einschränkungen | vier mit beiden Arten bestehen; sechs oder nur output fallen |
| Breite | sieben wählbare aus sieben Wegen bestehen; sechs Einträge, davon zwei Vergleich und einer bei Q8 gefallen, also drei wählbare, fallen; neun Varianten von Claude werden auf acht gekürzt und gemeldet |
| Stammregel | "Zeitmaß" trifft "Zeitpunkt" über "zeit"; "Pause" trifft keinen Stamm von "Der richtige Zeitpunkt ist eine Leistung, keine Verzögerung." |
| Welt-Zeichen | `zeichen.name` "Die Kante" als Idee-Zeichen fällt |
| Verbote vor dem Render | eine Variante "Zeigerstellung" fällt bei Q8, wenn "Uhr" in den Verboten steht, und hat `bewertung` und `wandtest` null |
| Zwilling | V11 unterscheidet sich von V1 nur in Feldern von `HM_IDEE_ACHSEN.ausschnitt`; ein Zwilling, der auch `system.zeichen.platz` ändert, fällt |
| Achse gegen Klärung | steht `ausschnitt` in `workshop.klaerungen`, wählt die Regel eine andere Achse |
| Vorauswahl | ein Zitat mit `antwortAufVorauswahl: true` löst Stufe 2 nicht aus; die Regel fällt auf Stufe 3 |
| Stufe 3 Markus | Profil aus `03_vorlieben.md` (Ausschnitt offen, Typografie 0,3, Licht 1,0, Farbtemperatur 0,8) ergibt `ausschnitt` |
| Codes je Klasse | eine Klasse "keine Person, keine Zahl" als zulässig fällt; ein Code der Art Farbe fällt |
| Lesbarkeit | `etikettPx` 64 fällt gegen `minTextKachelPx` 92; `strichPx` 4 fällt |
| Skala | `hmIdeeLaenge(11)` gleich 0,499 und `hmIdeeLaenge(730/7)` gleich 0,855 auf drei Stellen; 300 Wochen ergeben 1,0 |
| Begründung | jede Pflichtentscheidung vorhanden, jede Quelle löst auf; eine Quelle "Vertrauen" ohne Pfad fällt; eine Pflichtentscheidung nur mit schwachem Signal fällt |
| Kohorte | zweiter Makler im selben Gebiet mit gleichem Zeichen-Namen wird gemeldet; Kohorte mit zwei Kernsätzen ergibt Teil a "nicht geprüft", nie grün; fehlende Akzentfamilie ergibt Teil c "nicht geprüft" |
| Protokoll | das Protokoll enthält nur `maklerId`, `wortfeld`, `feld`, `cdUrteil`; ein Wortlaut aus einem fremden Dossier wird abgewiesen |
| Version | `system.basis.idee.version` 0 bei `idee.version` 1 sperrt die Übergabe an 12 und 13 |
| Regelpfad ohne Stoff | setzt Lücken; kein Satz aus `MARKENQUALITAET.md` Kapitel 5 erscheint, der nicht im Eingang steht |
| Stil | keine Zeichen U+2013 und U+2014, kein Ausrufezeichen in Brief und Idee |
| Echtes Material | Wandtest-Render mit einem Objekt aus `hmWebObjekte` fällt; Etikett ohne Zeitraum rendert den Lückenzustand "Dauer fehlt" |

### 8.6 Oberfläche (nur Team)

`IdeeWerkstatt` im Bereich Marke, sichtbar für Team und CD, nie für den Makler. Drei Bereiche mit je höchstens sieben Bedienelementen (UX-Standard `CLAUDE.md`):
1. **Brief**, eine Seite. Verweisfelder mit dem Hinweis "aus dem Vertrag" und Link zur Quelle, nicht bearbeitbar, auch der Kernsatz; neue Felder bearbeitbar; Prüfungen Q1 bis Q4 als Zustand am Feld.
2. **Varianten**, ein Brett. Wählbare Karten zeigen die Renders in Anwendung (Porträt, Ort, Profilraster), die vier Wandtest-Schalter, die fünf Werte, Herleitung, Austausch- und Konventionsstatus und Urteil. Bei Q8 gefallene und Vergleichsvarianten stehen als Zeile mit Grund darunter. Kein Zeichen allein auf Weiß.
3. **Entscheidung.** Empfehlung wählen, Achse mit Regelstufe und Begründung, schwache Signale sichtbar markiert, Zwilling daneben im selben Kontext und im Profilraster, Begründungen mit Quellen, Team-Checkbox Q12, Knopf "Abnehmen" nur für den CD, aktiv erst bei grünen oder "nicht geprüft" markierten Prüfungen, nie bei roten. Danach der Versionsabgleich mit 10 und 11 als Zustand.

Im Makler-Pfad erscheint der Schritt nur als Zeile in seiner Reise ("Das Team arbeitet an Ihrer Idee", mit Datum des Reveals), ohne Zwischenstand.

### 8.7 Aufwand

| Teil | Aufwand (Schätzung) |
|---|---|
| `wb-idee.jsx` Daten, Regelpfad, Prüfungen, Stammregel, Achsen-Konstante | 2 Tage |
| Werkstatt mit Skizzen-Renderer, Profilraster-Render und Wandtest | 2 Tage |
| API-Phasen, Schemas, Dossier-Erweiterung | 1 Tag |
| Selbsttest | 0,5 Tage |
| Anbindung: `hmPfVisuell`, Abschaltung `WeltWahl` im Makler-Pfad, `WeltPost` mit Idee-Zeichen, `basis.idee` in 10 und 11, Export und Import (8.8), Doku | 1,5 Tage |
| **Summe Entwicklung** | **etwa 7 Tage** |
| Team je Makler | etwa 2 Stunden 20 Minuten Art Director und CD, mit Handskizzen bis 2 Stunden 50 Minuten (Setzung, messen) |
| Claude je Makler | zwei Aufrufe (Phase `brief`, Phase `idee`), Ausgabe begrenzt auf höchstens acht Varianten |

Abhängigkeiten: Die Objekte `markenvertrag`, `botschaften.claim`, `vorlieben` und `workshop.klaerungen` müssen aus den Schritten 3, 4, 7 und 8 existieren. Bis dahin arbeitet die Werkstatt mit einem Seed `marke2.markus`, dessen Felder die Herkunft tragen.

### 8.8 Speicherweg für mehrere Geräte

Heute liegen `hmStore` im localStorage und die Renders in IndexedDB `unio_hm_blobs`, beide lokal in einem Browser (`ui_kits/werkbank/CLAUDE.md`). Eine CD-Abnahme auf einem anderen Gerät sähe die Wandtest-Renders nicht, und die Kohorte für Q7 gäbe es nur, wenn alle Makler im selben Browser liegen. Deshalb zwei Stufen:

1. **Bis zur Server-Datenhaltung** (FAHRPLAN, Supabase EU, wie in `16_freigabe.md` 9.4): `hmIdeeExport(mid)` schreibt ein Paket `wb-idee-paket/1` mit `brief`, `idee` und den Blobs der Renders als Datei samt SHA-256-Prüfsumme; `hmIdeeImport(datei)` liest es auf dem Gerät des CD ein, prüft die Summe und legt die Blobs in dessen IndexedDB. Für die Kohorte pflegt das Team einen Kohortenindex `wb-kohorte/1` mit nur Makler-Kennung, Gebiet, Leitidee als Stammliste (nicht als Satz), `zeichen.name`, `grammatik.welt`, vorläufiger Akzentfamilie und Wortfeldern; er wird mit jeder Abnahme exportiert und auf allen Teamgeräten importiert. Weil der Index auf allen Geräten gleich ist, prüfen Schritt 9, Schritt 14 (`hmKohorteText`, `hmKohorteBild`) und Schritt 17 dieselbe Kohorte. Die Pakete liegen nie im öffentlichen Repo.
2. **Mit Server-Datenhaltung:** `marke2` und der Kohortenindex liegen im gemeinsamen Speicher, die Blobs im Objektspeicher; Export und Import bleiben als Sicherung. Die Entscheidung über Anbieter und Rechtsgrundlage liegt beim Owner (Lücke, wie `14_markenbuch.md` offener Punkt 5).

---

## 9. Offene Punkte und Lücken

1. **Wandtest-Quelle.** Die Methode ist nur in Praktikerquellen belegt (R2 1.1). Vor Verwendung in Kundenmaterial nicht als Hegarty-Zitat ausgeben.
2. **Kohortengröße.** Ab wie vielen Maklern der Austauschtest Teil a trägt, ist offen (R4); die Setzung fünf ist an den ersten Maklern zu prüfen. Bis dahin entscheidet der CD bei jeder Meldung, und der Status bleibt "nicht geprüft".
3. **Bilddaten und Datenschutz.** Wenn das Team die Aufnahmezeit oder die Lichtrichtung aus Bilddaten liest: Bilddaten enthalten oft den Aufnahmeort. Die Werkbank soll nur die Zeit lesen und den Ort vor dem Speichern entfernen. Rechtliche Prüfung offen, keine Rechtsberatung in diesem Dokument.
4. **Setzungen** zur Prüfung an den ersten fünf Maklern: zwölf Wörter für den Kernsatz, vier wählbare Wege, acht Claude-Varianten, 2 Stunden 20 Minuten Teamzeit, Reihenfolge der Achsen bei Gleichstand, Stammregel und Stoppwortliste, Mindestmaße des Zeichens, Rand 72 px, logarithmische Skala, 24 Megapixel für den Zuschnitt.
5. **Markus im Betrieb.** Farbwert und Form des Bestandslogos (`vorab.logoAlt`), Lage der Mitbewerber (`vorab.wettbewerb`) und damit die Konventionsprobe "Bemaßung", Beginn- und Enddaten zu b1, b2 und b3, eine Unterlage zu den 600.000, Bedeutung von "1902", ein verwendbares Porträt mit geklärten Rechten, die Lebensphase im Publikum. Das Beispiel ist erst gültig, wenn diese Felder aus den Schritten 1, 3, 4 und 7 kommen.
6. **Richtung für Markus.** `06_territorien.md` führt die Richtung noch als offen; dieses Beispiel folgt wie 7 und 8 dem Territorium "Der Zeitpunkt". Wählt der Richtungstermin anders, entsteht eine neue Version.
7. **Du oder Sie gegenüber dem Makler** in Reveal und Markenbuch (Zerlegung Kapitel 7, Punkt 1).
8. **Markenarchitektur UNIO und Makler** (R5 offen): ob das Zeichen des Maklers neben einer UNIO-Signatur steht, betrifft die Anwendungsbewertung, nicht die Idee. Hinweis aus Schritt 3: Die UNIO-Signalfarbe ist selbst ein Amber; ein Amber-Akzent beim Makler wäre in der Kohorte und neben UNIO schwach unterscheidbar.
9. **Drei statt zwei Optionen** im Reveal bleibt nach der Zerlegung (Kapitel 6) an den ersten fünf Maklern zu testen. Dieser Schritt würde dafür eine zweite Achse nach derselben Regel bestimmen.
10. **Umsetzung der Korrekturen** an 10, 11, 12, 13, 15 und 3 (8.1) durch die jeweiligen Verfasser; bis dahin sperrt Q14 die Übergabe.

---

## 10. Quellen

Intern: `docs/werkbank/branding-v2/00_ZERLEGUNG.md`, `bestand/KETTE_IST.md` (2.6, 2.7, 3), `bestand/FRAGEN_WIRKUNG_IST.md` (Zeilen 93 bis 117, Befunde 3 und 9), `research/R1-studios.md`, `R2-art-direction.md`, `R3-interview.md`, `R4-tools.md`, `R5-makler.md`, `R6-social-system.md`, `R7-evidenz.md`, `R8-kundenerlebnis.md`, Schritte `03_vorlieben.md`, `05_einsicht.md`, `06_territorien.md`, `07_positionierung.md`, `10_system.md`, `11_bild.md`, `12_social.md`, `13_feed.md`, `14_markenbuch.md`, `15_reveal.md`, `16_freigabe.md`, `docs/werkbank/MARKE_SCHEMA.md`, `docs/werkbank/MARKENQUALITAET.md` Kapitel 5, `ui_kits/werkbank/wb-markenwelten.jsx`, `wb-plattform.jsx`, `wb-store.jsx` (Zeile 72, 102, 103), `api/wb-marke.js`, `ui_kits/werkbank/CLAUDE.md`, Muster `schritte/muster/09_idee.html`.

Studios und Praxis
- Paul Rand, NeXT: https://www.logodesignlove.com/next-logo-paul-rand
- Mozilla Open Design: https://blog.mozilla.org/opendesign/roads-not-taken/
- Pentagram, Mastercard: https://www.pentagram.com/work/mastercard
- Pentagram, The Public Theater: https://www.pentagram.com/work/the-public-theater-2020-2021-season
- Two Times Elliott, The Wardian: https://xx.studio/work/ballymore-wardian/
- JKR: https://www.jkrglobal.com/ und JKR mit Ipsos: https://www.marketingweek.com/15-brand-assets-truly-distinctive-finds-research/
- Koto, Arthur Foliard: https://pangrampangram.com/blogs/journal/koto
- Mucho: https://eyemagazine.com/feature/article/reputations-mucho
- DIA, Nuits Sonores: https://the-brandidentity.com/project/dia-studio-builds-a-generative-tool-that-makes-nuits-sonores-pulse-2
- Pentagram und performance.gov: https://gdusa.com/pentagram-federal-website-generates-ai-controversy/
- Bierut, On (Design) Bullshit: https://designobserver.com/on-design-bullshit/
- Holman, Briefs: https://www.richardholman.com/blog/2019/6/17/simplicity-inspiration-amp-truth-how-to-write-better-creative-briefs
- IPA BetterBriefs: https://ipa.co.uk/news/betterbriefs
- Wandtest, Praktikerquelle: https://creativebriefworkshops.com/1935-2/

Werkzeuge
- Brandmark: https://brandmark.io/intro/
- Looka-Rezension: https://kreafolk.com/blogs/articles/looka-ai-logo-maker
- Frontify, Brand Guidelines for AI: https://www.frontify.com/en/guide/brand-guidelines-for-ai

Studien
- Acar, Tarakci, van Knippenberg 2019: https://openaccess.city.ac.uk/id/eprint/20459/
- Jansson und Smith 1991: https://www.sciencedirect.com/science/article/abs/pii/0142694X9190003F
- Munk, Sørensen, Laursen 2020: https://www.designsociety.org/download-publication/43213/visual_boards_mood_board_style_board_or_concept_board
- Phillips und McQuarrie 2004: https://journals.sagepub.com/doi/10.1177/1470593104044089
- Hsee 1996: https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf
- Chernev, Böckenholt, Goodman 2015: https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf
- Cowan 2001: https://doi.org/10.1017/s0140525x01003922
- Fuchs, Prandelli, Schreier 2010: https://doi.org/10.1509/jmkg.74.1.65
- Buell und Norton 2011: https://doi.org/10.1287/mnsc.1110.1376
- Wilson und Schooler 1991: https://doi.org/10.1037//0022-3514.60.2.181
- Willis und Todorov 2006: https://doi.org/10.1111/j.1467-9280.2006.01750.x
- Distinctive Assets Benchmark 2026 (nicht verifiziert, Zugriff verweigert): https://www.tandfonline.com/doi/abs/10.1080/02650487.2026.2637295
- Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290
- Anderson, Shah, Kreminski 2024: https://dl.acm.org/doi/10.1145/3635636.3656204
