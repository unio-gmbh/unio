# Schritt 7. Positionierung und Markenvertrag (`positionierung`)

Stand 30.09.2026, zweite Fassung nach Rückweisung durch den Kontrolleur (Kernidee-Attribut, Bildseite auf der Makler-Seite, Rolle mit Status und v2-Quelle, Attribute als Verweise, Herkunft von `oeffentlich`, Beispiel bereinigt). Entwurf für Branding v2, STATUS Punkt 4 und 5. Grundlage: `00_ZERLEGUNG.md` (Vertrag dieses Schritts und der Nachbarn), `bestand/KETTE_IST.md`, `bestand/FRAGEN_WIRKUNG_IST.md`, `research/R1` bis `R8`, `docs/werkbank/MARKE_SCHEMA.md`, `docs/werkbank/MARKENQUALITAET.md`, Code in `ui_kits/werkbank/wb-plattform.jsx` und `api/wb-marke.js`.

**Lesart.** *Belegt* heißt: steht in einer Quelle mit URL oder in einer genannten Datei mit Stelle. *Ableitung* heißt: eigene Folgerung. *Setzung* heißt: bewusst gewählter Startwert, der an den ersten fünf Maklern gemessen und ersetzt wird. *Lücke* heißt: wir wissen es nicht. Aussagen über Markus Leitner stammen ausschließlich aus dem Seed `markus` in `wb-store.jsx` (Zeile 72), der Workshop-Zeile im Selbsttest (`wb-plattform.jsx` Zeile 1223), dem Musterbeispiel in `MARKENQUALITAET.md` Kapitel 5 und dem Beispiel in `06_territorien.md` 3.10. Was die v2-Schritte 1 bis 6 für ihn liefern würden, gibt es noch nicht; es steht als Lücke da.

---

## 0. Kurzfassung

Schritt 7 macht aus der gewählten Richtung **einen Satz, der eine Wahl trifft**, und aus diesem Satz **einen Maßstab, den der Makler selbst unterschreibt**. Er ist das Scharnier der Kette: Alles davor sammelt und entscheidet die Richtung, alles danach wird an diesem Vertrag gemessen.

Die gewählte Lösung in fünf Sätzen:

1. Claude verdichtet das gewählte Territorium mit Schärfung, Einsicht, Belegen und eigenen Worten in einen Entwurf nach festem Schema; ohne Claude baut der Regelpfad dieselbe Struktur und setzt dort Lücken, wo heute Mustersätze aus `HM_PF_FIGUR` stehen.
2. Regeln prüfen den Entwurf auf zehn harte Kriterien, darunter Ausschluss, Namensfreiheit des Gegenübers, Beleg mit Prüfstatus, Fremdbild, Prüfbarkeit jedes Attributs, genau ein Attribut aus der Kernidee des Territoriums und eine Rolle mit Belegstand.
3. Der Stratege redigiert satzweise, zwei Teammitglieder kalibrieren die fünf Attribute am heutigen Auftritt des Maklers, der Creative Director zeichnet in zehn Minuten ab.
4. Der Makler bekommt einen Wort-Link: eine Seite mit höchstens neun Abschnitten und rund 490 Wörtern, jede übernommene Formulierung als seine gekennzeichnet, je Attribut eine Zeile im Bild und daneben die Rohskizze, die er selbst gewählt hat, eine einzige Frage am Ende: "Ist das wahr, und wollen Sie daran gemessen werden?"
5. Mit seinem Klick wird der Vertrag als Version eingefroren; die Schritte 8, 9, 11, 12, 13, 14 und 15 lesen nur diese Version, jede spätere Änderung ist eine neue Version mit neuer Bestätigung.

---

## 1. Ziel und Erfolgskriterium

### 1.1 Ziel

Die gewählte Richtung (`richtung`, `territorien` des gewählten Wegs, `gate1.schaerfung`) in einen Positionierungssatz verdichten, der jemanden ausschließt. Daraus Versprechen, Rolle, drei Werte, drei bis vier Persönlichkeitswörter und die Belege bauen. Alles als Markenvertrag auf einer Seite vom Makler bestätigen lassen (Freigabe 1). Ab der Bestätigung ist der Vertrag der Maßstab für jede Rückmeldung, im Team wie beim Makler.

Warum dieser Schritt so wichtig ist (belegt): Premium-Prozesse legen vor dem ersten Entwurf fest, was die Marke ausdrücken soll und was falsch wäre, und urteilen danach gegen diesen Maßstab statt gegen Geschmack (Sycheva, Smashing Magazine 2026: https://www.smashingmagazine.com/2026/07/how-turn-brand-strategy-into-visual-direction/; R8 Abschnitt 2.2 und 2.4). Pentagram hat für OpenView gemeinsam mit dem Kunden fünf Markenattribute festgelegt (https://www.pentagram.com/work/openview/story); dass die Gestaltung daran gemessen wurde, sagt die Quelle nicht ausdrücklich, das ist unsere Ableitung aus dem Vorgehen. Heute fehlt dieser Akt: Der Makler gibt Schrift und Farbe frei, bevor es eine Idee gibt, und das Markenbuch ohne Version (KETTE_IST 2.6 und 2.8).

### 1.2 Erfolgskriterium

Der Schritt ist gelungen, wenn alle harten Kriterien erfüllt sind und die weichen Zielwerte an den ersten fünf Maklern erreicht werden.

**Hart (jede Bestätigung, automatisch oder per Abzeichnung geprüft):**

| Nr. | Kriterium | Prüfung |
|---|---|---|
| E1 | Der Satz trifft eine Wahl: `positionierung.nichtFuer` nennt mindestens zwei Gruppen, `fuerWen` enthält Ort und Anlass oder Objekt | Regel R1 |
| E2 | `andersAls` ist eine Konvention der Karte, kein Name | Regel R2 |
| E3 | `weil` zeigt auf mindestens einen Eintrag in `beweise` mit Quelle; jeder öffentliche Beleg ohne geprüfte Unterlage ist sichtbar als "vor Veröffentlichung prüfen" markiert | Regel R3 |
| E4 | Keine Persönlichkeitseigenschaft widerspricht dem Fremdbild; fehlt das Fremdbild, steht das Wort als Selbstbild markiert | Regel R4 |
| E5 | Jedes der fünf Attribute hat `heisstNicht`, eine Prüfregel im Text und eine im Bild, und zwei Teammitglieder urteilen am heutigen Auftritt des Maklers übereinstimmend "trifft" oder "trifft nicht" | Regel R5, Kalibrierung |
| E5a | Genau ein Attribut trägt die Kernidee des gewählten Territoriums, jeder Wert erscheint genau einmal, kein Text ist doppelt gespeichert | Regel R6 |
| E5b | Der Makler hat die Bildseite gesehen: je Attribut `imBild` in Worten und die gewählte Rohskizze auf der Seite | Selbsttest der Seite |
| E6 | Der Makler hat bestätigt, Version und Datum sind gespeichert, der Vertrag ist eingefroren | Speicher |
| E7 | Kein Claim im Vertrag: `leitidee` ist intern, wird von keinem Renderer gelesen und ist kein Kriterium der Rückmeldung | Regel R6, Selbsttest |
| E8 | Die Rolle trägt `status` belegt oder richtung und enthält kein Urteil Dritter | Regel R10 |

**Weich (Zielwerte, alle Setzung, an den ersten fünf Maklern messen):**

- Der Makler bestätigt in Runde 1 ohne Anmerkung oder mit höchstens einem Satz: bei mindestens vier von fünf Maklern.
- Median der Lesedauer im Wort-Link höchstens acht Minuten, gemessen in `markenvertrag.messung`.
- Bei höchstens einem von fünf Maklern erscheint die gebündelte Öffentlich-Wahl, weil der Workshop sie sonst klärt.
- In der Rückmeldung zum Reveal (Schritt 15) lassen sich mindestens 80 Prozent der Anmerkungen einem Kriterium des Vertrags zuordnen. Das ist der eigentliche Wirkungsnachweis: Der Vertrag ersetzt Geschmacksurteile.
- Die Kalibrierung ergibt je Attribut mindestens 80 Prozent Übereinstimmung zwischen zwei Teammitgliedern über die zwölf Kacheln des heutigen Auftritts.

---

## 2. Geprüfte Alternativen und warum verworfen

| Nr. | Alternative | Was dafür spricht | Warum verworfen | Quellen |
|---|---|---|---|---|
| A1 | **Die volle Markenplattform zur Freigabe vorlegen**, also Einsicht, Positionierung, Werte, Persönlichkeit, Stimme, Story und Serien als Dokument, wie heute im Markenbuch | vollständig, ein einziger Freigabeakt | Viele Ebenen bremsen die Kreation; Wolff Olins reduziert bewusst auf eine zentrale Idee. Ein langes Dokument wird überflogen: späte Teile werden kürzer und gleichförmiger beurteilt, Befragte wählen die erste passable Antwort (Satisficing). Die Freigabe wird Durchwinken. Heute ist genau das der Zustand: Freigabe ohne Version, Text kann sich danach still ändern (KETTE_IST 2.8). | https://wolffolins.com/news/inside-wolff-olins-sammy-page-on-strategy; https://academic.oup.com/poq/article-abstract/73/2/349/1939196; https://onlinelibrary.wiley.com/doi/abs/10.1002/acp.2350050305 |
| A2 | **Der Makler schreibt mit**, etwa als Brand Sprint im Workshop mit "Notieren und Abstimmen" oder als editierbares Dokument | hohes Eigentumsgefühl, schnelle Einigung | Der IKEA-Effekt belegt, dass Laien eigene Werke ähnlich hoch bewerten wie die von Experten; Mitschreiben erzeugt Zufriedenheit, nicht Qualität. Das Eigentumsgefühl schwindet, wenn sich der Kunde nicht kompetent fühlt. Positionierung ist Handwerk des Teams; der Makler liefert Rohstoff (Fälle, Worte) und entscheidet, er formuliert nicht. Der Brand Sprint setzt zwei bis sechs Führungskräfte und einen Entscheider voraus, nicht eine Einzelperson. | https://myscp.onlinelibrary.wiley.com/doi/abs/10.1016/j.jcps.2011.08.002; https://doi.org/10.1509/jmkg.74.1.65; https://www.reforge.com/blog/brief-how-to-define-your-brand-with-gv-s-3-hour-sprint; R7 Prinzip 8 |
| A3 | **Keine Freigabe durch den Makler**, das Team setzt die Positionierung nach Gate 1 fest (Rand-Modell: eine Lösung mit Begründung) | schnell, fachlich sauber, keine Verwässerung | Ohne eigenen Akt hält der Makler den Maßstab nicht in der Hand; im Reveal urteilt er dann nach Geschmack, und Neues wird von Menschen, die am Alten hängen, umso schlechter bewertet, je stärker es sich ändert. Markus hat ein bestehendes Logo und will schärfen (Seed `behalten`). Rand gilt in der Werkbank nur für die Ausarbeitung nach der Wahl (R1 Abschnitt 5). | https://www.logodesignlove.com/next-logo-paul-rand; https://www.smashingmagazine.com/2026/07/how-turn-brand-strategy-into-visual-direction/; https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1998809 |
| A4 | **Zwei Positionierungssätze zur Wahl** im Wort-Link | Wahl erhöht Eigentum, bekanntes Muster aus Schritt 6 | Die Richtung ist in Schritt 6 schon gewählt. Eine zweite Wahl öffnet eine fertige Empfehlung wieder, ohne dass sich der Output verbessert (R7 Abschnitt 4, letzter Punkt zur Präsentation). Zwei Formulierungen derselben Richtung unterscheiden sich in schwer bewertbaren Nuancen, genau dort steigt die Überforderung bei unklarer Präferenz. Die Wahl zwischen zwei Claims gehört in Schritt 8. | https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf; https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf |
| A5 | **Der Vertrag als Adjektivliste oder Regler**, etwa fünf Wörter, Brand-Prisma oder Persönlichkeitsregler wie im Brand Sprint | kurz, vertraut, schnell bestätigt | Alle Markeneigenschaften klingen erwünscht, Menschen differenzieren bei erwünschten Eigenschaften kaum. Ein Adjektiv lässt sich nicht als "trifft" oder "trifft nicht" beurteilen. Die Massenwerkzeuge fassen Stimme in 500 Zeichen und landen bei austauschbarer Sprache. Tragfähig ist das Muster "X, aber nicht Y" und die Trennung in verbindlich und Ermessen. | https://academic.oup.com/poq/article-abstract/49/4/535/1871286; https://www.canva.com/help/brand-voice/; https://styleguide.mailchimp.com/voice-and-tone/; https://www.frontify.com/en/guide/brand-guidelines-for-ai |
| A6 | **Freigabe als PDF per E-Mail** mit Unterschrift | formell, rechtssicher wirkend | Eine Datei trennt Vertrag und System: Die Abnehmer lesen dann nicht die bestätigte Version, sondern eine Kopie. Keine Kennzeichnung eigener Worte, keine Messung, kein Einfrieren. Ein zusätzliches Werkzeug für den Makler. | R8 Abschnitt 2.7 und 5; KETTE_IST 3 (Freigabe und Quelle) |

---

## 3. Die gewählte Lösung

### 3.1 Prinzip

**Verdichten, belegen, prüfbar machen, bestätigen, einfrieren.** Der Vertrag ist kein zweites Markenbuch, sondern eine Messlatte. Jede Zeile darauf muss eine von drei Aufgaben erfüllen: eine Wahl treffen (Satz, Nicht für, Anders als), eine Behauptung stützen (Belege) oder eine spätere Arbeit prüfbar machen (Attribute mit Bildseite, Was falsch wäre, Erfolgsmaß). Was keine dieser Aufgaben erfüllt, steht nicht auf der Seite.

Vier Entscheidungen machen den Unterschied zu heute und zu Standardvorlagen (Ableitung):

1. **Attribute sind Prüfkriterien, keine Adjektive.** Jedes der fünf Attribute trägt, woran man es in einem Text und in einem Bild erkennt. Damit wird aus "ruhig" die Regel "kurze Sätze, keine Frist-Rhetorik; im Bild ein Motiv je Kachel". Genau diese fünf Kriterien und die Liste "Was falsch wäre" werden in Schritt 15 zu den sechs Kriterien von `rueckmeldung.jeKriterium` (15_reveal.md, Abweichung D1).
2. **Eine Idee, keine neue Ebene, kein doppelter Wert.** Die Attribute sind keine eigenen Texte, sondern Verweise: genau zwei zeigen auf einen Eintrag in `persoenlichkeit`, genau zwei auf einen Eintrag in `werte`, **genau eines trägt die Kernidee des gewählten Territoriums** (`territorien[].kernidee`) und verweist mit `wertRef` auf den dritten Wert. So erscheint jeder Wert genau einmal, und "heißt" und "heißt nicht" existieren nur an ihrer Quelle. Das Kernidee-Attribut ist der Grund, warum der Vertrag die eine Idee misst, aus der Wort und Bild gemeinsam folgen (Leitidee der Zerlegung; Wolff Olins reduziert auf eine zentrale Idee, R1 Abschnitt 2.2).
3. **Wort und Bild werden gemeinsam bestätigt.** Der Makler sieht je Attribut eine Zeile "Im Bild" in Worten und als Anker die Rohskizze, die er in Schritt 6 selbst gewählt hat, unverändert. Es entsteht keine neue Form vor dem Reveal (Grundsatz G4). Schritt 15 misst Bilder damit nur an Kriterien, deren Bildseite er gesehen und bestätigt hat.
4. **Die Leitidee ist kein Claim und kein Kriterium.** Die Leitidee ist ein Gedanke für das Team, höchstens 15 Wörter, nie öffentlich, nicht auf der Makler-Seite und darum nie Maßstab der Rückmeldung. Den Claim schreibt Schritt 8 aus `claimIdee`. Heute wird die Weg-Leitidee zum Claim auf Karte und Signatur, bei Markus stehen dadurch zwei Claims auf einer Seite (KETTE_IST 2.8 und 3). Das schließt Regel R6.

### 3.2 Ablauf

| Stufe | Wer | Was passiert | Dauer |
|---|---|---|---|
| 7.1 Entwurf | Claude (Regelpfad ohne Claude) | Aus dem Eingang entsteht der Entwurf aller Ausgangsfelder nach Schema, mit `herkunft` je Satz und `luecken` | Sekunden bis zwei Minuten |
| 7.2 Regelprüfung | Regeln im Browser | Zehn Prüfungen R1 bis R10 (Kapitel 6), Ergebnis in `markenvertrag.pruefung` | Sekunden |
| 7.3 Redaktion | Stratege im Team | Satzweise redigieren, jede Änderung mit Grund; Lücken schließen oder mit Termin versehen; Anrede prüfen; `rolle.status` setzen | 45 Minuten mit Claude, 90 ohne (Setzung) |
| 7.4 Kalibrierung | zwei Teammitglieder getrennt | Die zwölf Kacheln aus `vorab.auftrittHeute` je Attribut mit "trifft" oder "trifft nicht" bewerten, getrennt nach Text und Bild; Übereinstimmung unter 80 Prozent heißt: Prüfregel des Attributs schärfen | 15 Minuten je Person (Setzung) |
| 7.5 Abnahme | Creative Director | Die fünf Leitfragen als Checkliste, Positionierungssatz und Versprechen laut lesen, abzeichnen | 10 Minuten (Setzung) |
| 7.6 Wort-Link | Makler | Eine Seite lesen, eine Frage beantworten: bestätigen oder einen Satz dazuschreiben | etwa sechs Minuten (Setzung, gemessen) |
| 7.7 Anmerkung | Stratege | Anmerkung einordnen und beantworten, Regeln in 3.6 | am selben oder nächsten Werktag (Setzung) |
| 7.8 Einfrieren | Regeln | Version, Datum, Prüfsumme; Abnehmer lesen ab jetzt nur diese Version; Aufgaben aus Schritt 8 im selben Link werden frei | sofort |

Takt: Der Wort-Link geht spätestens zwei Werktage nach dem Richtungstermin hinaus (Setzung), per Nachricht in der Werkbank mit zwei Sätzen vom Strategen, nicht automatisch. Eine Erinnerung nach drei Tagen über den bestehenden Nachfass-Takt. **Keine automatische Bestätigung nach Frist**, anders als bei Beiträgen (`wb-content.jsx` Zeile 142): Ein Maßstab, den niemand bestätigt hat, ist keiner.

### 3.3 Was Claude, Regeln und Team erzeugen

| Feld | Claude-Pfad | Regelpfad ohne Claude | Team |
|---|---|---|---|
| `positionierung.satz` | verdichtet `territorien[].positionierungssatz` mit `gate1.schaerfung` auf einen Satz, höchstens 35 Wörter, intern | übernimmt den ersten Satz von `positionierungssatz` des gewählten Territoriums wörtlich; fehlt er, Lücke | redigiert |
| `positionierung.fuerWen`, `nichtFuer` | aus `einsicht.zielgruppe`, `antworten.alternative`, Objekten und Orten | `fuerWen` aus `einsicht.zielgruppe`; `nichtFuer` immer Lücke mit Arbeitsauftrag | setzt `nichtFuer` fest |
| `positionierung.was` | aus `territorien[].kernidee` und `workshop.switch.ausschlag` | Lücke | schreibt |
| `positionierung.andersAls` | aus `einsicht.konvention` und `workshop.karte` | erster Satz von `einsicht.konvention` | prüft Namensfreiheit |
| `positionierung.weil`, `weilBelege` | wählt die stärksten Belege, Rangfolge siehe 3.5, und setzt `gate1.schaerfung` um | nimmt den ranghöchsten Beleg nach derselben Rangfolge | bestätigt |
| `versprechen` | ein Satz, Anrede über `hmAnrede(mid, "website")` | Lücke | schreibt |
| `rolle` | `name` nur aus `workshop.zitate` mit Sprecher `makler` und `oeffentlich` ja, sonst als Team-Vorschlag mit `quelle.art` "team"; `satz` aus Belegen; Vorschlag für `status` | Lücke; der Archetyp wird nie als Rollenname ausgegeben | setzt `status` belegt oder richtung und `belegRefs` |
| `werte[3]` | aus `workshop.leiter[].wert`, `antworten.leiter`, `gruende`; `verhalten` und `nie` ohne Subjekt formuliert, damit die Sätze in jeder Anrede tragen | `name` aus `workshop.leiter[].wert`, `verhalten` und `nie` als Lücke | schreibt Verhalten und Grenze |
| `persoenlichkeit` | Wörter aus `antworten.worte` und `fremdbild`, `heisst` und `heisstNicht` ohne Subjekt | Wörter aus der Schnittmenge, Status aus R4, Texte als Lücke | schreibt |
| `beweise[]` | Behauptung und Beleg wörtlich aus den Quellen, `pruefstatus` immer "Selbstauskunft"; `oeffentlich` übernommen aus `workshop.geschichte.belege[].oeffentlich` oder `workshop.zitate[].oeffentlich`, nie gesetzt | dieselbe Liste regelbasiert aus den Quellen | setzt "Unterlage geprüft" nach Prüfung |
| `markenvertrag.attribute[5]` | Verweise `aus` (zwei Persönlichkeit, zwei Werte, eine Kernidee mit `wertRef`), dazu `imText`, `imBild`; eigene Texte nur, wo die Quelle keine hat (siehe 8.2) | Verweise nach derselben Regel, `imText` und `imBild` als Lücke | kalibriert |
| `markenvertrag.falschWaere[]` | ordnet und verdichtet | sammelt `workshop.falschWaere`, `richtung.tabus`, `antworten.grenzen` (nie) | ergänzt |
| `markenvertrag.lageAufDerKarte` | ein Satz | Koordinaten aus `workshop.karte`, Satz Lücke | prüft |
| `markenvertrag.erfolgsmass` | Formulierung aus `ziel` und `zielMerkmal` | übernimmt Merkmal, Ausgangswert Lücke | legt Messung fest, benennt Zielkonflikte mit `fuerWen` |
| `version`, `bestaetigtAm`, `pruefsumme`, `herkunft` (geprüft), `pruefung` | nie | immer | nie |

**Regelpfad ohne Mustersätze.** Heute stehen im Regelcode Sätze aus dem Musterbeispiel, etwa die Haltung "Ein Haus verkauft man einmal ..." und der Claim "Zeit ist Teil des Preises." für jeden Kenner mit Warte-Geschichte (`wb-plattform.jsx` Zeile 213 und 215, KETTE_IST 2.4). Für diesen Schritt fallen `HM_PF_FIGUR` (was, andersAls, rolle, versprechen), die allgemeinen Texte in `HM_PF_WORT`, `HM_PF_WERTE` und `HM_PF_GRUNDWERT` weg. Der Regelpfad übernimmt nur, was sich wörtlich auf eine Quelle zurückführen lässt, und setzt sonst eine Lücke mit Arbeitsauftrag ("Kommt aus der Redaktion: was er tut, in einem Satz, aus `workshop.switch.ausschlag`"). Solange ein Feld, das der Makler sieht, eine Lücke trägt, lässt sich der Wort-Link nicht senden. Das kostet ohne Claude rund 45 Minuten mehr Teamzeit (Setzung) und verhindert, dass zwei Makler denselben Satz bekommen.

**Öffentliche und interne Felder.** Öffentlich, also von Schritt 8 wörtlich in Website, Social oder Presse übernehmbar, sind nur `versprechen`, `rolle.name` und `rolle.satz`, diese beiden nur bei `rolle.status` "belegt". Für sie gilt R8 (höchstens 20 Wörter). Alle anderen Felder sind intern: Sie dürfen im Markenbuch (Schritt 14, Sicht für Makler und Team) und im Reveal zitiert werden, aber nie wörtlich öffentlich erscheinen. Das gilt ausdrücklich für `positionierung.satz` (bis 35 Wörter, R1): Er ist ein Arbeitssatz nach dem Muster "Für wen, was, anders als", kein Text für Leser; öffentliche Fassungen schreibt Schritt 8 (`botschaften.einSatz`). Schritt 6 führt den Positionierungssatz ebenso als intern (06_territorien.md 3.10).

### 3.4 Was der Makler sieht und tut: der Wort-Link

**Ort.** Die Makler-Ansicht der Werkbank (`wb-app.jsx`, Rolle "makler"), Bereich Marke, Ansicht "Vertrag", aufgerufen aus der Nachricht des Strategen. Kein Konto bei einem fremden Werkzeug. Gebaut für das Telefon mit einer Hand, auf dem Rechner mit derselben Spalte.

**Anrede gegenüber dem Makler.** Offen beim Owner (00_ZERLEGUNG Kapitel 7, Punkt 1). Bis zur Entscheidung folgt der Wort-Link der Anrede, die der Makler für seine eigene Website gewählt hat (Setzung). Bei Markus ist das Sie ("Sie, überall").

**Gestaltung und Satzspiegel.** Eine Spalte, großzügiger Weißraum, die Werkbank-Schrift, nicht seine künftige Markenschrift: Er soll Worte und Richtung beurteilen, nicht fertige Form, die Form sieht er erst in Anwendung (Grundsatz G4). Keine Eyebrows: Abschnittsnamen sind selbst die Überschrift in Satzschreibung, darüber steht nichts. Keine Kartenrahmen, keine Verläufe, kein Schatten, keine Farbcodes allein. Eigene Worte des Maklers tragen eine feine Unterstreichung und eine hochgestellte Ziffer; die Quelle steht am Rand, auf dem Telefon unter dem Absatz. Symbole nur als SVG mit 1,5 Pixel Strich, keine Textzeichen. Maße (Setzung, bei der Abnahme der Oberfläche am Gerät zu prüfen):

| Maß | Telefon (Breite 375 Punkt) | Rechner | A4-Druckfassung |
|---|---|---|---|
| Satzspiegel | 20 Punkt Rand links und rechts, Zeile bis 36 Zeichen | eine Spalte mit 60 bis 66 Zeichen, Randspalte für Quellen | eine Spalte 110 mm, Randspalte 40 mm für Quellen, Ränder 20 mm |
| Positionierungssatz | 28 auf 34 Punkt, Gewicht normal | 40 auf 46 Punkt | 20 auf 25 Punkt |
| Lesetext | 17 auf 26 Punkt | 18 auf 28 Punkt | 9,5 auf 14 Punkt |
| Quellen und Prüfstatus | 13 auf 18 Punkt, unter dem Absatz | 13 auf 18 Punkt, Randspalte auf Höhe der Zeile | 7,5 auf 10 Punkt, Randspalte |
| Abstand zwischen Abschnitten | 56 Punkt | 80 Punkt | 9 mm |
| Rohskizze | volle Satzbreite, Seitenverhältnis des Profilkopfs | 60 Prozent der Spalte | 70 mm breit, oben rechts neben "Woran man Sie erkennt" |
| Ziffern | Tabellenziffern in Belegen, Mediävalziffern im Lesetext, falls die Werkbank-Schrift sie führt | wie Telefon | wie Telefon |

Die ganze Druckfassung passt auf eine A4-Seite; passt sie nicht, ist die Seite zu lang (Prüfung im Selbsttest über die Wortzahl, höchstens 500 Wörter, Setzung).

**Kennzeichnung der eigenen Worte.** Eine Formulierung gilt als seine, wenn mindestens vier aufeinanderfolgende Wörter nach Normalisierung wörtlich in einer Quelle mit Sprecher "makler" stehen: `workshop.zitate`, `antworten.<key>`, `richtung.zitatMakler`. Das rechnet die Regel `hmVertragHerkunft`, nicht Claude. Die Quellenangabe ist ehrlich: "aus Ihrem Workshop am 11.09.2026" nur, wenn es aus dem Workshop stammt, sonst "aus Ihrem Fragebogen" oder "aus dem Richtungstermin". Das macht die Arbeit sichtbar (Labor Illusion, https://doi.org/10.1287/mnsc.1110.1376) und stärkt das Urheberbewusstsein (https://pubsonline.informs.org/doi/10.1287/mnsc.1090.1077; R7 Abschnitt 4, "aus deinem Workshop" kennzeichnen). Eine Formulierung des Teams bleibt unmarkiert, auch wenn sie seine Worte sinngemäß aufnimmt.

**Aufbau der Seite: höchstens neun Abschnitte, in dieser Reihenfolge.**

1. **Einstieg.** Titel "Ihr Markenvertrag", darunter, nicht darüber, sein eigener Satz aus dem Richtungstermin (`richtung.zitatMakler`), dann ehrliche Dauer, was danach passiert, und das Datum des Reveals aus `auftrag.termine`. Fehlt das Datum, steht "Den Termin für den Reveal vereinbaren wir mit Ihnen." Fehlt sein Satz, beginnt die Seite mit Abschnitt 2; nichts wird als Platzhalter gezeigt.
2. **Wofür Sie stehen.** Positionierungssatz groß, darunter "Anders als", "Belegt durch" (die Belege aus `weilBelege` mit Ziffer), "Nicht für".
3. **Ihr Versprechen und Ihre Rolle.** Das Versprechen, darunter Rollenname und Rollensatz. Bei `rolle.status` "richtung" steht dabei: "Das ist Ihre Richtung für die nächsten zwölf Monate. Öffentlich nennen wir sie erst, wenn Fälle sie belegen."
4. **Woran man Sie erkennt.** Die fünf Attribute, je in drei Zeilen: "heißt", "heißt nicht", "im Bild". Werte erscheinen hier und nirgends sonst: Ein Attribut, das auf einen Wert zeigt, nennt ihn in Klammern ("Diskret, Ihr Wert Diskretion"), und seine Zeile "heißt" ist das Verhalten dieses Werts. Neben der Liste steht die Rohskizze, die er im Richtungstermin gewählt hat, unverändert, mit der Zeile "Ihre Wahl aus dem Richtungstermin, bewusst roh. Die fertige Form sehen Sie im Reveal." Die Prüfregeln `imText` stehen nur in der Team-Sicht; `imBild` steht in Worten auf der Seite, weil Schritt 15 Bilder daran misst.
5. **Was falsch wäre.** Eine Liste: zuerst die drei Grenzen `werte[].nie`, dann `falschWaere` nach Satz, Bild und Verhalten, darin seine Tabu-Markierungen aus dem Richtungstermin. Beides zusammen bildet das sechste Kriterium der Rückmeldung.
6. **Ihre Belege.** Jeder Beleg mit Prüfstatus in Worten ("Ihre Angabe, vor Veröffentlichung brauchen wir den Kaufvertrag"). Darunter, nur falls nötig, die gebündelte Zusatzwahl (siehe unten).
7. **Wo Sie stehen.** Nur wenn `workshop.karte` vorliegt: ein kleines SVG mit zwei Achsen, Mitbewerber als anonyme Punkte, er selbst als gefüllter Punkt, dazu ein Satz. Ohne Karte entfällt der Abschnitt ganz.
8. **Woran wir Erfolg messen.** Merkmal und Messung in einem Satz, bei einem Zielkonflikt mit `fuerWen` die Entscheidung des Teams in einem zweiten Satz, damit er sie mit einem Satz korrigieren kann.
9. **Die eine Frage.**

Nicht auf der Seite, obwohl im Vertrag: `persoenlichkeit` als eigener Abschnitt (zwei Einträge stehen als Attribute da, die übrigen gehen an Schritt 8), `stimmeRichtung` (die Stimme erlebt er unmittelbar danach im selben Link mit den Aufgaben aus Schritt 8, dort ist sie prüfbar), `leitidee` (intern, darum auch kein Kriterium in Schritt 15).

**Die eine Frage.** "Ist das wahr, und wollen Sie daran gemessen werden?" Zwei Möglichkeiten, eine empfohlen durch die Form:

- Hauptaktion: "Ja, daran messen wir." Ein Klick.
- Daneben als Link: "Einen Satz dazuschreiben." Öffnet ein Feld mit dem Hinweis "Was stimmt nicht? Ein Satz genügt. Tippen Sie vorher auf den Abschnitt, den Sie meinen." Der Abschnitt wird als `feld` gespeichert.

Die Frage ist bewusst keine Geschmacksfrage (Monteiro nach R8 Abschnitt 2.3, Sekundärquelle: https://thepiratetester.wordpress.com/2021/04/12/2021-04-12-my-breakdown-of-mike-monteiro-13-ways-designers-screw-up-client-presentations-and-how-it-applies-to-testers/). Sie prüft Wahrheit und Bereitschaft, gemessen zu werden. Formulierungswünsche gehören in Schritt 8.

**Gebündelte Zusatzwahl, höchstens eine.** Ob ein Beleg öffentlich genannt werden darf, klärt der Workshop: Zitate über F22 (`workshop.zitate[].oeffentlich`), Zahlen über F13 mit der Ergänzung aus 5.5 (`workshop.geschichte.belege[].oeffentlich`). Bleibt bei mindestens einem Beleg aus `weilBelege` "offen", steht unter "Ihre Belege" genau eine Wahl für alle offenen Belege zusammen: "Die Angaben mit den Ziffern 1 und 2 nach Prüfung öffentlich nennen?" mit "Öffentlich nach Prüfung" oder "Nur intern". Ohne Antwort gilt "Nur intern". Die Wahl erscheint nie für Belege aus Zitaten, weil F22 sie schon gestellt hat, und nie für Belege außerhalb von `weilBelege`, weil diese für den Maßstab nicht tragen; deren Klärung bleibt eine Aufgabe in `workshop.aufgaben`. Er entscheidet also im Regelfall eine Sache und im ungünstigsten Fall zwei.

**Der Moment nach dem Klick.** Die Seite bleibt stehen, oben erscheint "Bestätigt am 2. Oktober 2026, Version 1." (Datum hier Beispiel) und ein Satz: "Ab jetzt ist diese Seite Ihr Maßstab. Im Reveal fragen wir nicht, ob es gefällt, sondern ob es diesen Vertrag trifft." Darunter die Druckfassung auf einer A4-Seite mit Rohskizze: Er hält den Maßstab wörtlich in der Hand. Danach öffnen sich im selben Link die zwei Aufgaben aus Schritt 8, jetzt oder später (Peak-End-Regel für den Abschluss: https://journals.sagepub.com/doi/10.1111/j.1467-9280.1993.tb00589.x).

### 3.5 Was das Team tut

**Rangfolge der Belege für `weil` (Setzung).** Zuerst "Unterlage geprüft", dann Fälle mit Zahl, Ort und Zeitraum aus `antworten.faelle` oder `workshop.geschichte.belege`, dann gerechnete Kennzahlen aus `vorab.kennzahlen`, dann Selbstauskunft ohne Zahl. Kundenstimmen nur wörtlich mit Datum und Freigabe aus `vorab.kundenstimmen`. Eine Haltung gegen den eigenen Vorteil (Abraten) hat Vorrang in Rang zwei, weil Integrität bei der Eindrucksbildung schwerer wiegt als Sympathie (Brambilla u. a. 2021: https://www.sciencedirect.com/science/article/abs/pii/S0065260121000113; Mayer, Davis, Schoorman 1995: https://www.jstor.org/stable/258792).

**Prüfstatus.** "Unterlage geprüft" setzt nur das Team, nie Claude. Kennzahlen aus dem Bestand-Import gelten als Selbstauskunft, bis das Team drei zufällig gezogene Objekte gegen Kaufvertrag oder Grundbuch abgeglichen hat (Setzung). Jeder Beleg mit "Selbstauskunft" trägt in `unterlage`, welche Unterlage fehlt; die Aufgabe dazu liegt schon in `workshop.aufgaben` und wird nicht neu gestellt.

**Kalibrierung am heutigen Auftritt.** Zwei Teammitglieder bewerten unabhängig die zwölf Kacheln aus `vorab.auftrittHeute` je Attribut. Das Ergebnis dient nur dem Team: Es zeigt, ob die Prüfregeln scharf genug sind, und liefert eine ehrliche Ausgangslage. Dem Makler wird sein heutiger Feed nicht bewertet vorgelegt, weil Menschen, die am Bestehenden hängen, Veränderung umso schlechter aufnehmen, je härter sie konfrontiert werden (Walsh, Winterich, Mittal 2010, https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1998809; Ableitung).

**Abnahme durch den Creative Director.** Die fünf Leitfragen des Schritts als Checkliste, dazu der Lautlese-Test für Satz und Versprechen. Ergebnis in `markenvertrag.pruefung.cd` mit Datum.

### 3.6 Umgang mit der Anmerkung des Maklers

| Art der Anmerkung | Beispiel | Folge | Neue Bestätigung |
|---|---|---|---|
| Tatsache falsch | "Es waren 13 Abschlüsse, nicht 14." | Team korrigiert Beleg und Quelle, neue Version | ja, ein Klick, nur die geänderte Stelle ist hervorgehoben |
| Wortwahl oder Ton | "Das Wort ruhig klingt nach Schlafmütze." | Vertrag bleibt; die Anmerkung geht als Hinweis an Schritt 8; der Stratege antwortet in einem Satz, wie das Wort gemeint ist (`heisstNicht`) | nein |
| Inhalt | "Käufer sind mir auch wichtig." | 15 Minuten Telefonat mit dem Strategen; ändert es `fuerWen`, `nichtFuer` oder `was`, neue Version | ja |
| Richtung | "Eigentlich will ich lieber über Herkunft kommunizieren." | zurück an den Creative Director (Gate 1 aus Schritt 6), kein stilles Umschreiben | ja, nach Gate 1 |

Höchstens zwei Textrunden. Statt einer dritten gibt es ein Gespräch (Setzung). Jede Anmerkung wird mit Version, Feld, Einordnung und Antwort in `markenvertrag.anmerkungen` gespeichert und erscheint in Schritt 14 im Kapitel "Wie wir zu dieser Marke gekommen sind".

### 3.7 Einfrieren und Lesen

Die Bestätigung schreibt `version`, `bestaetigtAm`, `pruefsumme` (Prüfsumme über den kanonischen JSON-Text) und setzt `status` auf "bestaetigt". Alle Abnehmer lesen über `hmVertragEingefroren(mid)`; die Funktion liefert nur bestätigte Versionen, nie den Entwurf. Eine Änderung nach der Bestätigung ist ein Änderungsantrag mit Grund, erzeugt eine neue Version und braucht eine neue Bestätigung. Das schließt die heutigen Brüche "Freigabe ohne Version" und "Neu erzeugen überschreibt still" (KETTE_IST 2.8, 00_ZERLEGUNG 4.1). In Schritt 16 wird die bestätigte Version Teil von `quelle`.

### 3.8 Beispiel am Fall Markus Leitner (Döbling, Zinshaus, Figur Kenner, Sie-Form)

**Stoff, der heute vorliegt (belegt, Seed v1 und Schritt 6).** Aus dem Seed `markus` in `wb-store.jsx` Zeile 72: `abgeraten` ("Einer Erbengemeinschaft geraten, zwei Jahre zu warten, statt unter Druck zu verkaufen. Sie kamen mit 600.000 mehr zurück."), `belege` ("Zinshaus Sievering, 4,2 Mio., 11 Wochen. Anlegerwohnung Währing, 8 Prozent über Erstschätzung. 14 Abschlüsse 2025."), `abschluesse` (Sieveringer Straße über den Notar, Währing, Hietzing mit Diskretion), `gruende` (realistische Preis-Einschätzung, Diskretion, kennt den Bezirk), `worte` ("genau, ruhig, verlässlich"), `graetzl` ("Sievering, zwischen Sieveringer Straße und Agnesgasse"), `graetzl_anteil` ("6 bis 8"), `tabus` (Politik, Familie zeigen), `anrede` ("Sie, überall"), `erfolge` 2, `seite` 25, `ziel` ("Investoren erreichen"), Workshop 11.09.2026 mit dem Satz "Dass sie sich nie gedrängt gefühlt haben." Aus `06_territorien.md` 3.10: Empfehlung `t-nein-als-rat` mit Kernidee "Markus rät auch zum Warten, wenn ihn das die Provision kostet, und zeigt, was das Warten gebracht hat.", Claim-Idee "Rat vor Auftrag.", Risiko "Warten kann nach Zögern klingen", Zeichenidee "gezeichnete Spanne zwischen Rat und Ergebnis", Schärfung "neben jeder Warte-Geschichte ein schneller Fall", `auftragAn7` "B wird Beweisebene ... Herkunft F13 geht in die Story, ohne Familienbild".

**Seed-Altfelder, die v2 nicht mehr liefert.** `ideal` ("der Zinshaus-Mann, dem Notare vertrauen") entfällt laut `02_fragebogen.md` Zeile 526 ("doppelt zu ziel"). `werte` ("Sicherheit", "Verlässlichkeit") stammt aus der v1-Werteliste, die v2 durch die Leiter ersetzt (`02_fragebogen.md` Zeile 524). Beide werden im Beispiel nicht als Quelle verwendet; wie sie trotzdem geprüft werden, steht bei `rolle` und `werte`.

**Annahme für das Beispiel.** Markus folgt im Richtungstermin der Empfehlung `t-nein-als-rat`; so verlangt es `06_territorien.md` Zeile 517 für dieses Beispiel. Was nur der Termin liefert (`richtung.zitatMakler`, `tabus`, Datum), ist Lücke.

**Lücken für Markus (v2-Felder, die es noch nicht gibt):** `richtung.zitatMakler`, `workshop.karte` und `vorab.wettbewerb`, `workshop.leiter`, `workshop.switch`, `workshop.falschWaere`, `workshop.geschichte.belege[].oeffentlich`, `fremdbild.antworten`, `vorab.auftrittHeute`, `vorab.kennzahlen` aus dem Bestand-Import, `antworten.zielMerkmal`, `vorab.kundenstimmen`, `auftrag.termine`. Einträge, die daraus kämen, sind als Ableitung markiert.

**Ausgang für Markus (Entwurf nach Redaktion, Datenvertrag):**

`positionierung` (intern)
- `satz`: Für Erbengemeinschaften und Anleger mit Zinshaus oder Altbau in Döbling, Währing und Hietzing ist Markus Leitner der Makler, der auch zum Warten rät, wenn ihn das die Provision kostet. (29 Wörter; erster Satz von `territorien[t-nein-als-rat].positionierungssatz`, wörtlich, darum stimmen Claude-Pfad und Regelpfad hier überein)
- `fuerWen`: Erbengemeinschaften und Anleger, die in Döbling, Währing oder Hietzing ein Zinshaus oder eine Altbauwohnung halten und vor der Frage stehen, ob jetzt verkauft wird. (Quelle: `immotypen`, `bezirke`, `ausloeser` Erbe und Investment, `abschluesse`)
- `nichtFuer`: Eigentümer, die nur den schnellsten Käufer suchen. Käufer auf Wohnungssuche. Neubau. (Ableitung aus `seite` 25, `immotypen`, `abgeraten`; vom Team festgesetzt)
- `was`: rät zum Zeitpunkt statt zum schnellen Abschluss und rechnet vor, was Warten kostet und was Verkaufen bringt. (Ableitung aus `abgeraten` und Kernidee; `workshop.switch.ausschlag` als Stütze ist Lücke)
- `andersAls`: die übliche Zinshaus-Vermarktung, die vom schnellen Abschluss lebt und darum fast immer zum Verkauf rät. (Konvention nach Schritt 6, "Ableitung aus F5, gegen die Karte zu prüfen"; die Stütze durch mindestens drei Einträge der Karte ist Lücke)
- `weil`: Einer Erbengemeinschaft riet er, zwei Jahre zu warten, statt unter Druck zu verkaufen. Wenn es passt, geht es schnell: Zinshaus Sievering, 11 Wochen.
- `weilBelege`: `b1`, `b2` (das Paar setzt die Schärfung aus Gate 1 um: neben der Warte-Geschichte ein schneller Fall)

`versprechen` (öffentlich, Website, Sie über `hmAnrede`): Sie wissen, was Warten kostet und was Verkaufen bringt, bevor Sie unterschreiben. (14 Wörter)

Warum diese Fassung statt der aus dem Musterbeispiel ("Sie wissen, was Ihr Haus wert ist und wann sich der Verkauf lohnt"): Den Wert eines Hauses verspricht jeder Makler; das Abwägen von Warten und Verkaufen verspricht nur, wer das Abraten belegen kann (Ableitung, Kriterium Spezifität).

`rolle`
- `name`: Der Zinshaus-Makler, der auch zum Warten rät.
- `satz`: Rechnet mit Erben und Anlegern durch, was ein Verkauf jetzt bringt und was Warten bringt, und sagt beides.
- `quelle`: `{ art: "team" }`. Kein v2-Zitat trägt einen Rollennamen. Der v1-Satz aus `ideal` ("der Zinshaus-Mann, dem Notare vertrauen") wird nicht übernommen: Das Feld entfällt in v2, und der Satz ist ein Urteil Dritter, das ein einziger Fall über den Notar nicht trägt (R10). Sagt Markus im Workshop einen eigenen Rollensatz und gibt ihn in F22 öffentlich frei, ersetzt dieser den Team-Vorschlag mit `quelle.art` "zitat".
- `status`: "belegt", `belegRefs`: `b1`, `b2`. Der Name beschreibt, was er heute tut, und keine Zahl steht darin. Schritt 8 darf ihn wörtlich verwenden; die Zahlen aus `b1` und `b2` bleiben bis "Unterlage geprüft" gesperrt (08_stimme.md V3).
- Der Archetyp Kenner bleibt internes Sprachbild.

`werte[3]` (vorläufig: `workshop.leiter` fehlt, Werte aus `gruende` und `abgeraten` abgeleitet; `verhalten` und `nie` ohne Subjekt, damit sie in Sie-Form und dritter Person tragen)

| Nr. | Name | Verhalten | Nie | Zeigt Attribut |
|---|---|---|---|---|
| 0 | Realismus | Der erste Preis ist der, den der Markt zahlt. | Nie ein Preis, der nur den Auftrag holt. | a3 |
| 1 | Aufrichtigkeit | Zum Warten raten, wenn Warten mehr bringt, und die Rechnung dazulegen. | Nie ein Rat zum Verkauf, nur weil die Provision fällig wäre. | a5 über `wertRef` |
| 2 | Diskretion | Namen, Adressen und Preise nur mit Freigabe. | Nie eine Erbengemeinschaft oder ein Haus erkennbar ohne Einverständnis. | a4 |

Warum nicht seine v1-Werte "Sicherheit" und "Verlässlichkeit": Sie stammen aus einer Liste zum Ankreuzen, die erwünscht klingende Selbsteinschätzung misst (`02_fragebogen.md` Zeile 524, R3 Abschnitt 1.5). Verloren gehen sie nicht. "Verlässlich" steht schon in `persoenlichkeit` aus seinen drei Wörtern; als Wert stünde es doppelt. "Sicherheit" wird im Workshop an der Diskretions-Leiter geprüft (F1 am Fall Hietzing, `04_workshop.md`): Endet seine Leiter bei Sicherheit, heißt der Wert 2 "Sicherheit", und "Namen, Adressen und Preise nur mit Freigabe" wird sein Verhalten. Dann ist es ein Wert aus einem Fall, nicht aus einer Liste.

`persoenlichkeit`

| Nr. | Wort | Heißt | Heißt nicht | Fremdbild |
|---|---|---|---|---|
| 0 | genau | Jede Zahl mit Ort, Zeitraum und Quelle. | belehrend | offen, Selbstbild |
| 1 | ruhig | Kein Druck, keine Frist, die es nicht gibt. | gleichgültig | offen, Selbstbild mit Stütze (seine Wiedergabe im Workshop, `b6`) |
| 2 | verlässlich | Was zugesagt ist, passiert am genannten Tag. | starr | offen, Selbstbild |

Die Heißt-Sätze sind Ableitung des Teams aus seinen Wörtern. `verlässlich` wird kein Attribut und geht an Schritt 8.

`beweise[]`

| id | Behauptung | Beleg | Quelle | Prüfstatus | Unterlage fehlt | Öffentlich, Herkunft |
|---|---|---|---|---|---|---|
| b1 | Rät vom Verkauf ab, wenn Warten mehr bringt | Einer Erbengemeinschaft geraten, zwei Jahre zu warten; 600.000 mehr | `antworten.abgeraten` | Selbstauskunft | Ausgangsbewertung, Verkaufspreis, Zeitraum (Lücke laut Musterbeispiel 5.7) | offen; in v2 aus `geschichte.belege[].oeffentlich` (F13), fehlt bei Markus, darum gebündelte Wahl im Wort-Link |
| b2 | Verkauft schnell, wenn es passt | Zinshaus Sievering, 4,2 Mio., 11 Wochen | `antworten.belege` | Selbstauskunft | Kaufvertrag oder Vermarktungsprotokoll mit Datum | offen, wie b1 |
| b3 | Schätzt realistisch | Anlegerwohnung Währing, 8 Prozent über Erstschätzung | `antworten.belege` | Selbstauskunft | Erstschätzung und Kaufpreis | offen; nicht in `weilBelege`, darum keine Wahl im Wort-Link, Klärung als Aufgabe |
| b4 | Arbeitet dicht in Sievering | 6 bis 8 der letzten zehn Abschlüsse dort | `antworten.graetzl_anteil`, in v2 gerechnet aus `vorab.kennzahlen.graetzlAnteil` | Selbstauskunft | genaue Zahl aus dem Bestand, Stichprobe | offen, wie b3 |
| b5 | Aktiv im Markt | 14 Abschlüsse 2025 | `antworten.belege` | Selbstauskunft | Liste aus dem Bestand | offen, wie b3 |
| b6 | Kunden fühlen sich nach seiner Wiedergabe nicht gedrängt | "Dass sie sich nie gedrängt gefühlt haben." | Workshop 11.09.2026, Sprecher Makler, seine Wiedergabe | Selbstauskunft | ein Kundensatz wörtlich mit Datum und Freigabe (`vorab.kundenstimmen` oder Fremdbild) | nur intern; ein Zitat, darum gilt F22 und keine Zusatzwahl; als Kundensatz nie öffentlich, bis ein Kundensatz vorliegt |

`markenvertrag`
- `leitidee` (intern, nie öffentlich, kein Kriterium): Der richtige Zeitpunkt ist eine Leistung, keine Verzögerung. (keine Wortgleichheit mit der Claim-Idee "Rat vor Auftrag.", R6)
- `attribute[5]`: Verweise statt Kopien. "Heißt" und "heißt nicht" in Klammern sind aufgelöst über `hmAttributAufloesen`, nicht gespeichert.

| id | Name | aus | Heißt (aufgelöst) | Heißt nicht | Im Text erkennbar (`imText`, Team) | Im Bild erkennbar (`imBild`, auch auf der Seite) |
|---|---|---|---|---|---|---|
| a1 | Genau | `persoenlichkeit[0]` | (Jede Zahl mit Ort, Zeitraum und Quelle.) | (belehrend) | jede Zahl mit Ort, Zeitraum und Quelle; keine gerundeten Schaugrößen. Ortsregel: Orte als Straßen statt als Bezirksmittel, in allen drei Bezirken | Kennzahlen als gesetzte Ziffern, nie als Diagramm-Dekor; echte Orte seiner Fälle, kein Wien-Postkartenmotiv |
| a2 | Ruhig | `persoenlichkeit[1]` | (Kein Druck, keine Frist, die es nicht gibt.) | (gleichgültig) | kurze Sätze, keine Frist-Rhetorik, kein "jetzt" als Druckmittel | ein Motiv je Kachel, viel Raum, ruhiges Licht, keine schnellen Schnitte |
| a3 | Realistisch | `werte[0]` | (Der erste Preis ist der, den der Markt zahlt.) | schwarzmalend | jeder Preis mit seiner Herleitung; kein Superlativ | Preise und Flächen als Ziffern mit Einheit, keine Wertungswörter im Bild |
| a4 | Diskret | `werte[2]` | (Namen, Adressen und Preise nur mit Freigabe.) | verschlossen | keine Adresse, keine Namen, keine Erben-Details ohne Freigabe | Häuser im Ausschnitt, Details statt Hausnummer, Erben nie im Bild |
| a5 | Zeitpunkt statt Tempo | `territorium.kernidee` `t-nein-als-rat`, `wertRef` `werte[1]` | (Zum Warten raten, wenn Warten mehr bringt, und die Rechnung dazulegen.) | zögerlich (Risiko des Territoriums) | neben jeder Warte-Geschichte die Rechnung und ein schneller Fall (Schärfung aus Gate 1) | die gezeichnete Spanne zwischen Rat und Ergebnis, lang bei zwei Jahren, kurz bei elf Wochen (Zeichenidee); Dauer und Betrag tragen als Ziffern; nie Uhr, Sanduhr oder Countdown |

a5 ist das Kernidee-Attribut. Es misst genau das, wofür die Richtung gewählt wurde; ohne es könnte eine Gestaltung alle anderen vier Attribute treffen und die Idee trotzdem verfehlen. Das frühere Attribut "Aus Sievering" entfällt: Es stammte aus `graetzl` statt aus der Kernidee und widersprach einem Positionierungssatz über drei Bezirke, denn Hietzing liegt nicht im Sieveringer Grätzl. Der Ortsbezug lebt als Ortsregel in a1 weiter.

- `stimmeRichtung` (intern, an Schritt 8): Sie, überall. Die Zahl vor dem Adjektiv, die Rechnung vor der Meinung, Erfolge als Beleg, nie als Lob. (Quellen: `anrede`, `worte`, `erfolge` 2; die Regler setzt Schritt 8 aus den Stimmproben)
- `falschWaere[]` (auf der Seite zusammen mit `werte[].nie`)

| Art | Was falsch wäre | Quelle |
|---|---|---|
| satz | "Jetzt verkaufen, bevor die Preise fallen." Druck mit einer Frist, die es nicht gibt. | Ableitung aus `abgeraten` und Attribut a2 |
| satz | Rendite-Superlative und "Off-Market-Perle". | `einsicht.konvention` (Ableitung, Karte fehlt) |
| bild | Sanduhr, Uhr, Countdown als Bild für Zeit. Die Idee verführt zum Klischee. | Ableitung aus a5 |
| bild | Handschlag, Schlüsselübergabe, Familie im Bild. | `tabus` Familie zeigen, Branchenmotive (R5 Abschnitt 5), `gate1.auftragAn7` "ohne Familienbild" |
| verhalten | Mietrecht als Parteifrage kommentieren. | `tabus` Politik, Musterbeispiel 5.5 |
| verhalten | Warten empfehlen ohne Rechnung. | Schärfung aus Gate 1 |
| alle | Einträge aus `workshop.falschWaere` und `richtung.tabus` | Lücke |

- `lageAufDerKarte`: entfällt auf der Seite, weil `workshop.karte` fehlt. Intern als Ableitung: Die Konvention im Kerngebiet sitzt vermutlich distanziert und klassisch; Markus klassisch in der Form, näher am Gespräch. Koordinaten Lücke.
- `erfolgsmass`: Merkmal: Anfragen von Eigentümern mit dem Anlass Erbe oder Anlage aus Döbling, Währing und Hietzing je Quartal. Messung: Lead-Radar und Anlass in der Kontakt-Bemerkung. Ausgangswert: Lücke. (Quelle `ziel` "Investoren erreichen"; `zielMerkmal` fehlt, Formulierung ist Ableitung.)
- **Zielkonflikt, benannt und entschieden.** "Investoren erreichen" kann Käufer meinen, die Zinshäuser suchen. `fuerWen` spricht aber Anleger an, die halten und vor einem Verkauf stehen, und `seite` 25 liegt auf der Eigentümerseite. Das Team entscheidet für die Verkäuferseite: Die Marke spricht haltende Anleger an; kaufende Investoren sind Kundschaft für seine Objekte, aber kein Ziel der Marke und kein Messpunkt. Die Entscheidung steht im Wort-Link als eigener Satz unter dem Erfolgsmaß, damit Markus sie mit "Einen Satz dazuschreiben" kippen kann; kippt er sie, ist das eine Anmerkung der Art "Inhalt" (3.6) und ändert `fuerWen`, `nichtFuer` und `erfolgsmass`. In v2 klärt `zielMerkmal` aus Schritt 2 das vorher.
- Kanäle wie Notariate oder Steuerberatung stehen nicht im Erfolgsmaß: Das wäre eine Ableitung aus einem einzigen Fall über den Notar und keine Angabe von ihm.
- `version` 1, `bestaetigtAm` offen, `status` "beim Makler".

**Was nicht darin steht, und warum.** Die Claim-Idee "Rat vor Auftrag." steht nicht im Vertrag, sie ist `claimIdee` des Territoriums und wird in Schritt 8 zum Claim. Die Herkunft (Großvater, Grinzing) steht nicht im Vertrag, sie ist nach `gate1.auftragAn7` Stoff der Story in Schritt 8. Die Beweisebene aus dem verworfenen Territorium B ("der Dienstag nach dem Grundbuch liefert die Zahlen für die Spanne") ist ein Arbeitsauftrag des CD an die Belege, keine Leistungszusage; sie steht darum nicht in `persoenlichkeit` und nicht auf der Seite, sondern als Aufgabe, die Zahlen für die Spanne aus Unterlagen zu belegen. Der Notar-Name und der Ruderverein stehen nirgends, sie sind Namen Dritter.

**Der Wort-Link für Markus (Textstand, rund 490 Wörter; Ziffern markieren seine Worte).** Die Seite, wie sie aus dem heutigen Stoff entsteht, mit den Regeln für fehlende Werte aus 3.4 statt Platzhaltern: Sein Satz aus dem Richtungstermin und die Karte fehlen, darum beginnt die Seite mit "Wofür Sie stehen" und "Wo Sie stehen" entfällt. Senden ließe sie sich trotzdem erst nach Gate 1 (06_territorien.md R19).

```text
Ihr Markenvertrag

Eine Seite, etwa sechs Minuten. Daran messen wir ab jetzt jeden Entwurf,
auch im Reveal. Den Termin für den Reveal vereinbaren wir mit Ihnen.

Wofür Sie stehen
Für Erbengemeinschaften und Anleger mit Zinshaus oder Altbau in
Döbling, Währing und Hietzing ist Markus Leitner der Makler, der auch
zum Warten rät, wenn ihn das die Provision kostet.
Anders als die übliche Zinshaus-Vermarktung, die vom schnellen Abschluss
lebt und darum fast immer zum Verkauf rät.
Belegt: Einer Erbengemeinschaft haben Sie geraten, zwei Jahre zu warten,
statt unter Druck zu verkaufen (1). Wenn es passt, geht es schnell:
Zinshaus Sievering, 4,2 Mio., 11 Wochen (2).
Nicht für: Eigentümer, die nur den schnellsten Käufer suchen. Käufer auf
Wohnungssuche. Neubau.

Ihr Versprechen und Ihre Rolle
Sie wissen, was Warten kostet und was Verkaufen bringt, bevor Sie
unterschreiben.
Der Zinshaus-Makler, der auch zum Warten rät. Sie rechnen mit Erben und
Anlegern durch, was ein Verkauf jetzt bringt und was Warten bringt, und
sagen beides.

Woran man Sie erkennt                      Abbildung: Ihre Wahl aus dem
                                           Richtungstermin, bewusst roh.
                                           Die fertige Form sehen Sie
                                           im Reveal.
Genau. Jede Zahl mit Ort, Zeitraum und Quelle. Heißt nicht: belehrend.
Im Bild: Zahlen als gesetzte Ziffern, echte Orte statt Postkarte.
Ruhig. Kein Druck, keine Frist, die es nicht gibt. Sie sagen, Ihre
Kunden hätten sich nie gedrängt gefühlt (3). Heißt nicht: gleichgültig.
Im Bild: ein Motiv je Kachel, viel Raum, ruhiges Licht.
Realistisch, Ihr Wert Realismus. Der erste Preis ist der, den der Markt
zahlt. Heißt nicht: schwarzmalend. Im Bild: Preise als Ziffern mit
Einheit, kein Wertungswort.
Diskret, Ihr Wert Diskretion. Namen, Adressen und Preise nur mit
Freigabe. Heißt nicht: verschlossen. Im Bild: Häuser im Ausschnitt,
nie eine Hausnummer, Erben nie im Bild.
Zeitpunkt statt Tempo, Ihr Wert Aufrichtigkeit. Zum Warten raten, wenn
Warten mehr bringt, und die Rechnung dazulegen. Heißt nicht: zögerlich.
Im Bild: eine Spanne zwischen Rat und Ergebnis, lang bei zwei Jahren,
kurz bei elf Wochen.

Was falsch wäre
Ein Preis, der nur den Auftrag holt. Ein Rat zum Verkauf, nur weil die
Provision fällig wäre. Eine Erbengemeinschaft oder ein Haus erkennbar
ohne Einverständnis. Druck mit Fristen, die es nicht gibt.
Rendite-Superlative. Uhren und Sanduhren als Bild für Zeit. Handschlag,
Schlüssel, Familie im Bild. Politik. Warten ohne Rechnung.

Ihre Belege
600.000 mehr nach zwei Jahren (1). Ihre Angabe. Vor Veröffentlichung
brauchen wir Ausgangswert und Verkaufspreis.
4,2 Mio. in 11 Wochen (2). Ihre Angabe, der Kaufvertrag folgt.
8 Prozent über Erstschätzung. Ihre Angabe.
14 Abschlüsse 2025. Ihre Angabe.
Die Angaben 1 und 2 nach Prüfung öffentlich nennen?
( ) Öffentlich nach Prüfung   (•) Nur intern

Woran wir Erfolg messen
Anfragen von Eigentümern mit dem Anlass Erbe oder Anlage aus Ihren drei
Bezirken, je Quartal. Den Ausgangswert erheben wir zum Start.
Mit Investoren meinen wir Anleger, die ein Haus halten, nicht Käufer.

Ist das wahr, und wollen Sie daran gemessen werden?
[ Ja, daran messen wir ]   Einen Satz dazuschreiben

(1) Ihr Fragebogen  (2) Ihr Fragebogen  (3) Ihr Workshop am 11.09.2026
```

Anmerkung zur Kennzeichnung: Jede Ziffer steht nur, weil dort mindestens vier Wörter nach Normalisierung wörtlich aus seiner Quelle stammen: (1) "zwei Jahre zu warten, statt unter Druck zu verkaufen", (2) "Zinshaus Sievering, 4,2 Mio., 11 Wochen", (3) "sich nie gedrängt gefühlt". Satz (3) ist als seine Wiedergabe formuliert ("Sie sagen, Ihre Kunden hätten ..."), nie als Aussage über Kunden (Kapitel 7, "Kundensatz verdichtet als Zitat"). Rollenname, Ortsregel und alle Heißt-Sätze sind Formulierungen des Teams und bleiben unmarkiert. Auf der Seite und in der Druckfassung ist die Markierung eine Unterstreichung mit hochgestellter Ziffer, keine Klammer; die Auswahl unter den Belegen ist ein gestaltetes Umschaltfeld, keine Textzeichen. Die Abbildung ist die Rohskizze aus Schritt 6 (`territorien[t-nein-als-rat].rohskizze`: Profilkopf und drei Kacheln), unverändert; sie existiert erst nach dem Richtungstermin. Mit seinem Satz aus dem Termin stünde dieser als zweite Zeile unter dem Titel und trüge eine vierte Ziffer.

---

## 4. Fragen an den Makler

### 4.1 Was gefragt wird

| Frage | Wirkt auf | Warum sie den Output verändert |
|---|---|---|
| "Ist das wahr, und wollen Sie daran gemessen werden?" mit "Ja, daran messen wir" oder einem Satz dazu | `markenvertrag.bestaetigtAm`, `version`, `status`; bei einem Satz `markenvertrag.anmerkungen` und über 3.6 das betroffene Feld (`positionierung.*`, `attribute[i]`, `beweise[i]`, `werte[i]`, `erfolgsmass`) | Ohne Ja gibt es keinen eingefrorenen Maßstab, und die Schritte 8 bis 15 starten nicht. Ein Satz dazu ändert nachweisbar ein Feld oder wird begründet an Schritt 8 weitergegeben. Probe: "Käufer sind mir auch wichtig" statt Ja ändert `fuerWen`, `nichtFuer` und `erfolgsmass` und damit Säulen und Serien in Schritt 12. |
| Nur wenn nach dem Workshop noch offen, höchstens einmal und gebündelt: "Die Angaben mit den Ziffern ... nach Prüfung öffentlich nennen?" mit "Öffentlich nach Prüfung" oder "Nur intern" | `beweise[i].oeffentlich` für alle offenen Zahlenbelege in `weilBelege` | Entscheidet, ob die tragenden Zahlen nach Prüfung in öffentlichen Texten und im Feed stehen dürfen (Schritt 13 `belegRef`, Schritt 8 `botschaften`) oder nur intern tragen. Probe: "Öffentlich nach Prüfung" lässt Schritt 13 eine Beleg-Kachel mit "11 Wochen" bauen, sobald der Kaufvertrag geprüft ist; "Nur intern" ersetzt sie durch eine Kachel ohne Zahl. Ohne Antwort gilt "Nur intern", nie eine Vorbelegung mit Ja. Der Regelfall ist die Klärung im Workshop (F13 mit Ergänzung aus 5.5); für Zitate stellt F22 die Frage, darum erscheint sie hier nie für Zitate. |

### 4.2 Was bewusst nicht gefragt wird, sondern abgeleitet

| Feld | Abgeleitet aus | Warum nicht fragen |
|---|---|---|
| `positionierung.fuerWen` | `einsicht.zielgruppe`, bestätigte `bezirke`, `immotypen`, `ausloeser` | liegt vor, in Schritt 1 und 2 bestätigt |
| `positionierung.nichtFuer` | `antworten.seite`, `immotypen`, Kernidee des Territoriums | eine Wahl, die das Team vorschlägt und der Makler mit dem Ganzen bestätigt; eine eigene Frage würde zum Offenhalten verleiten |
| `positionierung.was`, `andersAls` | `territorien`, `workshop.switch`, `einsicht.konvention`, `workshop.karte` | Handwerk des Teams (Alternative A2) |
| `weil`, `beweise` | `antworten.faelle`, `workshop.geschichte`, `vorab.kennzahlen`, `vorab.kundenstimmen` | Unterlagen sind schon Aufgabe aus dem Workshop |
| `rolle` | `workshop.zitate` (Sprecher makler, öffentlich ja) oder Team-Vorschlag aus Belegen | ein Rollenname zum Ausfüllen erzeugt Wunschbilder; seine eigenen Worte kommen aus dem Workshop, bestätigt wird mit dem Ganzen |
| `werte` | `workshop.leiter`, `antworten.leiter`, `gruende` | Laddering liefert Werte aus Fällen; eine Werteliste zum Ankreuzen misst Erwünschtheit (R3 Abschnitt 1.5) |
| `persoenlichkeit` | `antworten.worte`, `fremdbild` | Fremdbild ist für Sichtbares genauer als das Selbstbild (Vazire 2010: https://pubmed.ncbi.nlm.nih.gov/20085401/) |
| `attribute` mit `imBild` | Persönlichkeit, Werte, Kernidee des Territoriums, Zeichenidee | keine neue Ebene, also keine neue Frage; die Bildseite bestätigt er mit dem Ganzen, am Anker seiner eigenen Skizzenwahl |
| `falschWaere` | `workshop.falschWaere`, `richtung.tabus`, `antworten.grenzen`, `werte[].nie` | im Workshop und Richtungstermin erhoben |
| `lageAufDerKarte` | `workshop.karte` | im Workshop gesetzt |
| `erfolgsmass` | `antworten.ziel`, `zielMerkmal` | in Schritt 2 gefragt; ein Zielkonflikt mit `fuerWen` wird vom Team entschieden und als Satz gezeigt, nicht als zweite Frage |
| Anrede des Versprechens | `antworten.anredeJeKanal` über `hmAnrede` | in Schritt 2 gefragt |

**Ausdrücklich nicht:** "Gefällt Ihnen der Satz?", eine Wahl zwischen Formulierungen, eine Werteliste, eine Adjektivliste, Regler, der Claim, die Story, eine Frage zu Schrift, Farbe oder zur Skizze, eine Öffentlich-Frage je Beleg.

---

## 5. Eingang und Ausgang

### 5.1 Eingang nach dem Vertrag

| Von | Feld | Wofür in diesem Schritt |
|---|---|---|
| 6 | `richtung` (gewaehltId, empfehlungAngenommen, tabus, zitatMakler, datum) | welches Territorium; Einstiegssatz im Wort-Link; Tabus in `falschWaere` |
| 6 | `territorien` des gewählten Wegs (kernidee, positionierungssatz, claimIdee, beleg, risiko, zeichenIdee, rohskizze) | Ausgangssatz, Leitidee, Kernidee-Attribut mit Risiko als `heisstNicht` und Zeichenidee als `imBild`; Rohskizze als Bildanker im Wort-Link; `claimIdee` nur zur Prüfung R6, dass die Leitidee kein Claim wird |
| 6 | `gate1.schaerfung` | wird Pflicht in Satz, `weilBelege` und Kernidee-Attribut (R6) |
| 5 | `einsicht` (zielgruppe, spannung, konvention, weisseStelle, unbequem, stuetzen) | `fuerWen`, `andersAls`, Belegstützen |
| 2 | `antworten.gruende`, `leiter` | Werte |
| 2 | `antworten.worte` | Persönlichkeit |
| 2 | `antworten.erfolge` | `stimmeRichtung` |
| 2 | `antworten.alternative` | `andersAls`, `nichtFuer` |
| 2 | `antworten.ziel` mit `zielMerkmal` | `erfolgsmass` |
| 2 | `fremdbild` | Prüfung R4 |
| 4 | `workshop.leiter` | Werte |
| 4 | `workshop.geschichte.belege` | Belege, mit `oeffentlich` nach Ergänzung 5.5 |
| 4 | `workshop.zitate` | eigene Worte, Kennzeichnung, Belege, Rollenname (nur Sprecher makler, öffentlich ja) |
| 4 | `workshop.falschWaere` | `falschWaere` |
| 4 | `workshop.karte` | `lageAufDerKarte`, Namens-Test R2 |
| 1 | `vorab.kennzahlen` | gerechnete Belege |

### 5.2 Ergänzungen im Eingang, begründet

Alle Ergänzungen stammen aus Schritten, die schon Vorgänger sind; die Listen der Vorgänger und Nachfolger bleiben symmetrisch.

| Von | Feld | Warum nötig |
|---|---|---|
| 2 | `antworten.faelle`, `alternativeKonnte` | Schritt 2 erklärt, dass beide `positionierung.weil` treiben; ohne sie im Eingang hätte diese Wirkung keinen Leser (Widerspruch in der Zerlegung) |
| 2 | `antworten.anredeJeKanal` | das Versprechen steht "in der Anrede der Website"; der Schritt ruft dieselbe Funktion `hmAnrede`, die Schritt 8 als `anrede` festschreibt, damit keine zweite Anrede-Logik entsteht |
| 2 | `antworten.grenzen`, `grenzenFrei` | Grenzen gehören auf die Seite "Was falsch wäre", sonst misst der Vertrag einen Grenzbruch nicht als "trifft nicht" |
| 2 | `antworten.seite` | `nichtFuer`: ein Eigentümer-Makler schließt Käufer aus |
| 4 | `workshop.switch` | `ausschlag` und `alternative` des letzten Verkäufers sind die beste Quelle für `was` und `weil` (Dunford: https://www.aprildunford.com/post/a-product-positioning-exercise; Four Forces: https://jobstobedone.org/the-four-forces/) |
| 4 | `workshop.geschichte.abgeraten` | der stärkste Integritätsbeleg; `geschichte.belege` allein erfasst ihn nicht |
| 4 | `workshop.klaerungen` | ein Widerspruch, der im Workshop entschieden wurde, darf im Vertrag nicht wieder aufgehen |
| 1 | `vorab.kundenstimmen` | nur so kann ein Kundensatz mit Freigabe Beleg werden |
| 1 | `vorab.auftrittHeute` | Kalibrierung der Attribute an zwölf echten Kacheln |
| 1 | `auftrag.termine` | Datum des Reveals im Wort-Link |
| Extern | bestätigte Verträge der anderen UNIO-Makler (Kohorte) | Ähnlichkeitsprüfung R7, wie in Schritt 6 |

### 5.3 Ausgang nach dem Vertrag und Abnehmer

| Feld | Inhalt | Abnehmer |
|---|---|---|
| `positionierung` | `{satz, fuerWen, was, andersAls, weil}`, intern | 8, 9, 11 (`fuerWen`), 12, 14 |
| `versprechen` | ein Satz, Anrede der Website, öffentlich | 8, 14 |
| `rolle` | `{name, satz}` in eigenen Worten oder als gekennzeichneter Team-Vorschlag | 8, 14 (siehe 5.5) |
| `werte[3]` | `{name, verhalten, nie}` | 8, 12, 14 (siehe 5.5), 15 über `falschWaere` |
| `persoenlichkeit[3 bis 4]` | `{wort, heisst, heisstNicht}` | 8, 14 |
| `beweise[]` | `{behauptung, beleg, quelle, pruefstatus}` | 8, 9, 12, 13, 14 |
| `markenvertrag` | `{leitidee, attribute[5], stimmeRichtung, falschWaere[], lageAufDerKarte, erfolgsmass, version, bestaetigtAm}` | 8, 9, 12, 14, 15, über `quelle` 16 und 17 |

### 5.4 Ergänzungen im Ausgang, begründet

| Feld | Inhalt | Warum | Abnehmer |
|---|---|---|---|
| `positionierung.nichtFuer[]` | Gruppen, die der Satz ausschließt | macht die Wahl prüfbar (Leitfrage 1) und verhindert Serien für die Falschen | 9 (`brief.publikumAlsPerson`, `verbote`), 12 (Säulen), 14 |
| `positionierung.weilBelege[]` | IDs aus `beweise` | `weil` bleibt lesbarer Satz, die Verknüpfung wird prüfbar | 13, 14 |
| `rolle.status` | "belegt" oder "richtung" | Schritt 8 muss maschinell wissen, ob der Rollenname wörtlich öffentlich stehen darf; ein Prosa-Hinweis reicht nicht (Malär u. a. 2011, Actual Self: https://journals.sagepub.com/doi/10.1509/jmkg.75.4.35) | 8 (`botschaften.ueberMich`, `presse.kurzbio`, Bio in `stimme.beispiele`), 14 |
| `rolle.quelle`, `rolle.belegRefs[]` | `{art: zitat oder team, ref}`; IDs aus `beweise` | Nachweis, woher der Name kommt, nachdem `ideal` in v2 entfällt; "belegt" braucht mindestens einen Beleg | 8, 14 |
| `beweise[].id` | stabile Kennung | Schritt 13 verlangt `belegRef` je Kachel; ohne ID gibt es keinen Bezug | 13, 14 |
| `beweise[].unterlage` | welche Unterlage fehlt | Gate 2 verlangt `zahlenGeprueft` | 14 |
| `beweise[].oeffentlich` | ja, nein, offen; übernommen aus `workshop.geschichte.belege[].oeffentlich` oder `workshop.zitate[].oeffentlich`, sonst aus der gebündelten Wahl | Freigabe öffentlicher Zahlen, Voreinstellung nein | 8, 13 |
| `persoenlichkeit[].fremdbild` | bestätigt, offen, widerspricht | Leitfrage 4 wird Datenfeld | 8 |
| `markenvertrag.attribute[]` als `{id, name, aus {feld, index oder territoriumId}, wertRef, heisst, heisstNicht, imText, imBild}` | der Vertrag verlangt nur "je mit heisstNicht"; `heisst` und `heisstNicht` nur, wo die Quelle keine hat (8.2), sonst aufgelöst über `hmAttributAufloesen` | ohne Prüfregeln kann das Team Gestaltung nicht mit "trifft" oder "trifft nicht" beurteilen (Leitfrage 5); Verweise statt Kopien verhindern, dass derselbe Wert zweimal entsteht und auseinanderläuft | 9 (`pflichten`, `verbote`), 12, 14 (`qualitaet`), 15 (`rueckmeldung.jeKriterium`) |
| `markenvertrag.falschWaere[]` als `{art, text, quelle}` | Satz, Bild oder Verhalten | Schritt 9 braucht die Bildverbote getrennt, Schritt 8 die Satzverbote; `hmVertragFalschListe` fügt `werte[].nie` als Art "verhalten" hinzu, so wie die Seite sie zeigt | 8, 9, 12, 15 |
| `markenvertrag.lageAufDerKarte` als `{x, y, satz}` | Koordinaten aus der Karte, ein Satz | Schritt 14 zeigt die Karte im Kapitel Positionierung | 14 |
| `markenvertrag.erfolgsmass` als `{merkmal, messung, ausgangswert, zielkonflikt}` | messbar statt Satz; `zielkonflikt` als `{was, entscheidung}` oder leer | Schritt 17 bewertet `wirkung` nach zwölf Wochen dagegen; ein unbenannter Konflikt zwischen Ziel und Zielgruppe würde dort falsch messen | 17 über `quelle` |
| `markenvertrag.herkunft[]` | `{pfad, art, ref, woertlich}` | Kennzeichnung eigener Worte im Wort-Link, im Reveal und im Markenbuch | 7, 14, 15 |
| `markenvertrag.anmerkungen[]` | `{version, feld, text, einordnung, antwort, am}` | Nachvollziehbarkeit, Kapitel "Wie wir zu dieser Marke gekommen sind" | 14 |
| `markenvertrag.pruefung` | `{regeln[] {test, ok, detail}, kalibrierung, cd, datum}` | Gate 2 prüft, ob Gate-Bedingungen dieses Schritts eingehalten wurden | 14 |
| `markenvertrag.status`, `pruefsumme` | entwurf, pruefung, beim Makler, bestaetigt; Prüfsumme | Einfrieren, Lesen nur bestätigter Versionen | alle Abnehmer über `hmVertragEingefroren` |
| `markenvertrag.messung` | `{geoeffnetAm, dauerSek, bestaetigtAm, runden}` | ersetzt die Setzung "etwa sechs Minuten" durch echte Werte | 17 (`lernen`) |

### 5.5 Korrekturbedarf an Nachbarverträgen

Die Zerlegung nennt `rolle` und `werte` als Ausgang, aber kein Nachfolger führt sie im Eingang. Nach der Rubrik ("jedes Ausgangsfeld hat einen Abnehmer") ist das ein Konsistenzfehler. Dazu kommen drei Anpassungen aus dieser Fassung. Vorschlag:

| Nachbar | Änderung | Grund | Stand |
|---|---|---|---|
| 4 | `workshop.geschichte.belege[]` erhält `oeffentlich: ja, nein oder offen`; erfragt in F13 als Zusatz "Dürfen wir die Zahl nach Prüfung öffentlich nennen?", nur bei Zahlen, die öffentlich werden könnten; `personenbezug` sperrt ja wie bei Zitaten (P10) | Heute führt Schritt 4 `oeffentlich` nur an `zitate` (F22, genau drei Sätze). Ohne das Feld hätte `beweise[].oeffentlich` keinen Vorgänger, und die Zusatzwahl im Wort-Link erschiene bei jedem Zahlenbeleg | offen, an Schritt 4 |
| 8 | Eingang `7: rolle, werte`: `rolle` speist `botschaften.ueberMich` und `presse.kurzbio`, `werte[].nie` speist `stimme.verbindlich` und das Beispiel "Absage oder Abraten". Maschinelle Regel statt Prosa: Bei `rolle.status` "richtung" steht `rolle.name` nicht wörtlich (Vier-Wort-Treffer) in `ueberMich`, `kurzbio` oder einer Bio; bei "belegt" darf er stehen, Zahlen daraus nur nach V3 | Schritt 8 hat die Regel heute als V8 und M7 für einen festen Satz; mit dem Feld wird sie für jeden Makler prüfbar | von Schritt 8 als AE3 aufgenommen, M7 auf `status` umzustellen |
| 12 | Eingang `7: werte`: die Pflichtsäule "Wie ich arbeite" zeigt die Werte als Verhalten | Abnehmer für `werte` | offen |
| 14 | Eingang `7: versprechen, rolle, werte, persoenlichkeit`: das Kapitel Positionierung zeigt sie, `positionierung.satz` als interner Arbeitssatz | Abnehmer, Klarheit öffentlich gegen intern | offen |
| 15 | Die sechs Kriterien der Rückmeldung sind `markenvertrag.attribute[5]` und als sechstes "Was falsch wäre", nie die Leitidee | übernimmt 15_reveal.md D1; die frühere Fassung dieses Dokuments nannte hier die Leitidee, das ist zurückgenommen | erledigt in Schritt 15 |
| 15 | Das sechste Kriterium liest `hmVertragFalschListe(v)`, also `falschWaere` samt `werte[].nie`, weil der Makler beides auf der Seite als eine Liste bestätigt hat | kleine Ergänzung zu D1, keine neue Logik | offen, an Schritt 15 |

---

## 6. Qualitätsprüfung im Schritt

### 6.1 Regeln (automatisch, `hmVertragPruefen`)

Das Schema der Claude-Kette erzwingt Mengen wie "genau drei" nicht zuverlässig; darum zählen die Regeln selbst.

| Nr. | Test | Bedingung für grün | Wirkung bei rot |
|---|---|---|---|
| R1 | Ausschluss | `nichtFuer` hat mindestens zwei Einträge; `fuerWen` enthält einen Ort aus `bezirke` oder `graetzl` und einen Anlass oder ein Objekt; `satz` ist ein Satz mit höchstens 35 Wörtern | Senden gesperrt |
| R2 | Namensfreiheit | `andersAls` enthält keine `kennung` aus `workshop.karte.mitbewerber`, keinen Namen aus der Kohorte, kein Muster wie "GmbH" oder "Immobilien" mit Eigenname; mindestens ein Inhaltswort gemeinsam mit `einsicht.konvention` oder einer `konventionNotiz` | Senden gesperrt |
| R3 | Beleg | `weilBelege` zeigt auf mindestens einen Beleg mit `quelle`; jeder Beleg mit `oeffentlich` ja und `pruefstatus` Selbstauskunft hat `unterlage`; `oeffentlich` ist nur dann nicht "offen", wenn es aus `workshop.geschichte.belege`, `workshop.zitate` oder der gebündelten Wahl stammt; jede Zahl in Positionierung, Versprechen und Vertrag steht wörtlich in der Quelle, **ohne** die pauschal erlaubten Zahlen aus `hmMarkenQualitaet` (`wb-plattform.jsx` Zeile 1045, KETTE_IST 2.5) | Senden gesperrt |
| R4 | Fremdbild | kein Persönlichkeitswort steht mit einem Wort aus `fremdbild.antworten[].worte` in einer Gegensatzliste (etwa ruhig gegen laut oder hektisch, nahbar gegen distanziert); bei weniger als zwei Fremdbild-Antworten Status "offen" | Widerspruch sperrt, offen wird angezeigt |
| R5 | Anzahl und Prüfbarkeit | genau 3 `werte`, 3 bis 4 `persoenlichkeit`, genau 5 `attribute`; jedes Attribut hat `aus`, `imText`, `imBild` und nach Auflösung `heisst` und `heisstNicht`; `imText` und `imBild` enthalten eine beobachtbare Regel, nicht nur Adjektive (Heuristik: mindestens ein Nomen aus Text, Zahl, Ziffer, Quelle, Bild, Licht, Ausschnitt, Motiv oder ein Verbot) | Senden gesperrt |
| R6 | Eine Idee, keine Doppelung, kein Claim | genau zwei Attribute mit `aus.feld` "persoenlichkeit", genau zwei mit "werte", **genau eines mit "territorium.kernidee"** und `aus.territoriumId` gleich `richtung.gewaehltId`; dessen `heisst` oder `imText` teilt mindestens ein Inhaltswort mit der `kernidee` oder mit `gate1.schaerfung[].neu` oder `grund` dieses Territoriums; jeder Wert wird genau einmal referenziert (über `aus` oder `wertRef`); ein Attribut mit `aus` "persoenlichkeit" speichert weder `heisst` noch `heisstNicht`, eines mit `aus` "werte" oder `wertRef` speichert kein `heisst`; Attribute paarweise verschieden; `leitidee` höchstens 15 Wörter und nicht gleich oder ähnlich `claimIdee` (Trigramm-Überlappung unter 50 Prozent, Setzung) | Senden gesperrt |
| R7 | Kohorte | Jaccard auf Wort-Trigrammen von `satz`, `was`, `andersAls`, Attributen gegen alle bestätigten Verträge unter 15 Prozent (Schwelle aus MARKENQUALITAET 4.6); kein zweiter Makler im selben Bezirk mit denselben fünf Attributnamen | über 15 Prozent sperrt, ab 5 Prozent Hinweis |
| R8 | Stil, Anrede, öffentliche Länge | keine Wörter der Klischee-Liste, keine Gedankenstriche, keine Ausrufezeichen, keine Emojis in allen Feldern; Versprechen in der Anrede aus `hmAnrede(mid, "website")`; die öffentlichen Felder aus 3.3 (`versprechen`, `rolle.name`, `rolle.satz`) je höchstens 20 Wörter; interne Felder folgen R1 | Senden gesperrt |
| R9 | Lücken und Herkunft | keine Lücke in Feldern, die der Makler sieht; Abschnitte ohne Stoff (Karte, sein Einstiegssatz, Reveal-Datum) werden weggelassen oder durch den festen Satz aus 3.4 ersetzt, nie als Platzhalter gerendert; jede Lücke in internen Feldern hat einen Termin; mindestens drei Stellen mit wörtlicher Herkunft (Setzung), sonst ist die Seite nicht in seinen Worten; Seite höchstens neun Abschnitte und 500 Wörter | Senden gesperrt |
| R10 | Rolle | `rolle.status` gesetzt; bei "belegt" mindestens ein Eintrag in `belegRefs`; `quelle.art` "zitat" nur mit Verweis auf ein Zitat mit Sprecher `makler` und `oeffentlich` ja; `rolle.name` enthält kein Urteil Dritter über ihn (Muster: Dritte als Subjekt von vertrauen, empfehlen, schätzen, wählen), außer es ist wörtlich durch `vorab.kundenstimmen` mit Freigabe gedeckt; der Archetyp-Name der Figur steht nicht in `rolle.name` | Senden gesperrt |

Die Kohorten- und Fremdbild-Tests nehmen die Erkenntnis ernst, dass KI den Einzelfall hebt und viele Ergebnisse einander ähnlicher macht (Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290).

### 6.2 Menschliche Prüfung

- **Kalibrierung** (3.5): Übereinstimmung je Attribut mindestens 80 Prozent (Setzung), sonst Prüfregel schärfen.
- **Abnahme durch den Creative Director** mit den fünf Leitfragen des Schritts: Schließt der Satz jemanden aus? Ist `andersAls` eine Konvention der Karte? Hat `weil` einen Beleg mit Quelle, und ist markiert, was eine Unterlage braucht? Widerspricht eine Eigenschaft dem Fremdbild? Kann das Team jede spätere Gestaltung mit "trifft den Vertrag" oder "trifft ihn nicht" beurteilen? Dazu der Lautlese-Test für Satz und Versprechen (MARKENQUALITAET Kapitel 2).
- **Unbequem genug.** Ein Positionierungssatz, der jedem Makler schmeichelt, besteht nicht. Holman nennt als Maßstab eines guten Briefs eine Wahrheit, die leicht unbequem ist (https://www.richardholman.com/blog/2019/6/17/simplicity-inspiration-amp-truth-how-to-write-better-creative-briefs). Bei Markus leistet das `nichtFuer` und `heisstNicht zögerlich`.

---

## 7. Typische Fehler und wie sie verhindert werden

| Fehler | Beispiel | Verhindert durch |
|---|---|---|
| Satz ohne Wahl | "Für Eigentümer in Wien, die gut beraten werden wollen." | R1, Pflichtfeld `nichtFuer` |
| Gegenüber mit Namen oder als Angriff | "Anders als [Großbüro X]." oder "Anders als unseriöse Makler." | R2, `heisstNicht moralisierend` beim Attribut Aufrichtig |
| Mustersatz aus dem Regelpfad | zweiter Kenner mit Warte-Geschichte bekommt "Zeit ist Teil des Preises." | `HM_PF_FIGUR` und Textbibliotheken entfallen für diesen Schritt, R7 Kohorte, Selbsttest "Regelpfad ohne Mustersätze" |
| Aspiration als Tatsache | "Der Zinshaus-Mann, dem Notare vertrauen" als Behauptung in der Bio | `rolle.status` richtung sperrt in Schritt 8 die wörtliche Übernahme; R10 sperrt Urteile Dritter im Namen |
| Rolle aus einem entfallenen Feld | Rollenname aus `ideal` (v1), das v2 nicht mehr liefert | `rolle.quelle` nur Zitat mit Freigabe oder Team, R10 |
| Idee nicht messbar | Fünf Attribute ohne die Kernidee, etwa ein Ortsattribut an ihrer Stelle | R6: genau ein Attribut mit `aus` "territorium.kernidee" des gewählten Territoriums |
| Derselbe Wert zweimal | "Genau" in Persönlichkeit und Attribut mit verschiedenen Heißt-Sätzen; Aufrichtig und Aufrichtigkeit auf einer Seite | Attribute als Verweise, `hmAttributAufloesen`, R6; Werte nur im Attribut-Abschnitt |
| Bildkriterium ohne Bildseite | Schritt 15 misst Kacheln an Attributen, deren Bildregel der Makler nie gesehen hat | `imBild` in Worten und Rohskizze auf der Seite, E5b |
| Platzhalter auf der Makler-Seite | "[Karte: kommt aus dem Workshop]" | R9: weglassen oder fester Satz, nie Platzhalter |
| Zahl ohne Unterlage öffentlich | "600.000 mehr" im Feed vor der Prüfung | `pruefstatus`, `unterlage`, `oeffentlich` mit Voreinstellung nein; Schritt 13 und 14 lesen den Status |
| Neue Adjektivebene | fünf frische Wörter, die nirgends herkommen | Pflichtfeld `aus`, R6 |
| Unprüfbare Attribute | "modern, klar, vertrauensvoll" | `imText`, `imBild`, R5, Kalibrierung |
| Leitidee wird Claim | Leitidee landet auf Karte und Signatur | R6, Selbsttest: kein Renderer liest `leitidee` |
| Freigabe als Durchwinken | Makler klickt ohne zu lesen | eine Seite, eine Frage mit Gewicht, `messung.dauerSek`; unter 60 Sekunden ruft der Stratege kurz an (Setzung) |
| Stilwünsche ändern den Maßstab | "Ruhig klingt langweilig." wird zur neuen Positionierung | Einordnung in 3.6, Wortwahl geht an Schritt 8 |
| Stille Änderung nach Bestätigung | "Neu erzeugen" im Markenbuch überschreibt die Positionierung | Einfrieren, `hmVertragEingefroren`, neue Version nur mit Bestätigung |
| Selbstbild als Fremdbild | "Kunden sagen, er sei genau" ohne Kundenstimme | `persoenlichkeit[].fremdbild`, R4 |
| Kundensatz erfunden oder verdichtet als Zitat | "Kunden haben sich nie gedrängt gefühlt" | als seine Wiedergabe formuliert ("Sie sagen, Ihre Kunden hätten ..."); Beleg b6 bleibt intern, bis ein Kundensatz mit Freigabe vorliegt; Prompt verbietet Aussagen über Dritte als Tatsache |
| Ableitung als Zusage | Ein Content-Hinweis wie der feste Grundbuch-Tag wird zum Versprechen in `persoenlichkeit` | Heißt-Sätze nur aus seinen Worten oder als Ableitung markiert; Arbeitsaufträge aus `gate1.auftragAn7` bleiben Aufgaben |
| Eyebrow in der Seite | kleine Versalzeile "AUS IHREM WORKSHOP" über dem Satz | Kennzeichnung als Unterstreichung mit Randnotiz, Satzschreibung, Abnahme der Oberfläche |
| Namen Dritter im Vertrag | Notariat oder Verein mit Namen | R2 erweitert um Eigennamen außerhalb der Ortsliste; Hinweis an den Strategen |
| Zweite Anrede-Logik | Versprechen mit eigener Du-Sie-Regel | nur `hmAnrede`, R8 |

---

## 8. Umsetzung in der Werkbank

### 8.1 Dateien

| Datei | Änderung |
|---|---|
| `ui_kits/werkbank/wb-vertrag.jsx` (neu) | Regelpfad `hmVertragEntwurf(mid)`, Prüfung `hmVertragPruefen(v, mid)`, `hmVertragHerkunft(v, quellen)` (Vier-Wort-Treffer), `hmAttributAufloesen(v, i)` und `hmVertragFalschListe(v)` (8.2), Speichern und Versionen `hmVertragSpeichern(mid, v, grund)`, `hmVertragSenden(mid)`, `hmVertragBestaetigen(mid, { anmerkung, feld })`, Leser `hmVertragEingefroren(mid)`, Anrede `hmAnrede(mid, kanal)` (einmal definiert, Schritt 8 füllt die Regel), Komponenten `VertragRedaktion` (Team, Seitenpanel, satzweise mit Grund), `VertragKalibrierung` (Team), `VertragSeite` (Makler, Wort-Link mit Rohskizze und Druckfassung), `VertragKarte` (SVG), `hmSelbsttestVertrag()`; Export über `Object.assign(window, ...)` |
| `api/wb-marke.js` | neue Phase `vertrag` mit `SCHRITT.vertrag` und `SCHEMA.vertrag`; Eingang: Dossier, gewähltes Territorium, `gate1.schaerfung`, Einsicht, Zitate mit IDs; `saeubern` und Klischee-Prüfung wie bisher; Phase `voll` wird für v2 nicht mehr aufgerufen |
| `ui_kits/werkbank/wb-plattform.jsx` | `hmPfPositionierung`, `hmPfWerte`, `hmPfPersoenlichkeit`, Rolle und Versprechen lesen in v2 aus `hmVertragEingefroren`; die Mustersätze in `HM_PF_FIGUR` (was, andersAls, rolle, versprechen) und die Textbibliotheken werden für v2 nicht mehr genutzt |
| `ui_kits/werkbank/wb-markenbuch.jsx` | Kapitel Positionierung liest den eingefrorenen Vertrag; "Neu erzeugen" darf Vertragsfelder nicht überschreiben |
| `ui_kits/werkbank/wb-app.jsx` | Makler-Ansicht Marke, Ansicht "Vertrag"; Aufruf über `?rolle=makler&makler=<id>&ansicht=vertrag` aus der Nachricht |
| `ui_kits/werkbank/index.html` | Script-Tag für `wb-vertrag.jsx` nach `wb-plattform.jsx`, vor `wb-markenbuch.jsx` |
| `ui_kits/werkbank/wb-store.jsx` | für den Beweis (STATUS Punkt 7) optional ein v2-Seed für Markus mit den Lücken aus 3.8 |
| `docs/werkbank/MARKE_SCHEMA.md` | Abschnitt v2 mit dem Objekt aus 8.2 |
| `docs/werkbank/MARKENQUALITAET.md` | Freigabe 1 und Prompt `vertrag` ergänzen |

Architektur nach `ui_kits/werkbank/CLAUDE.md`: Babel ohne Build, globaler Scope, Präfix `hm`, `React.useState` statt neu deklarierter Hooks, kein `import()`, Symbole nur über `<Ico n="..."/>`.

### 8.2 Datenvertrag im Store

Speicherort `hmStore` unter `marke2[mid].vertrag` (Vorschlag aus 00_ZERLEGUNG Kapitel 3). Die Wurzel des Schemas in 8.3 entspricht `aktuell`; `herkunft` liegt in beiden unter `markenvertrag`, `luecken` in beiden auf der Ebene von `aktuell`.

```js
marke2[mid].vertrag = {
  status: "entwurf" | "pruefung" | "beim Makler" | "bestaetigt",
  aktuell: {
    positionierung: { satz, fuerWen, nichtFuer: [""], was, andersAls, weil, weilBelege: ["b1"] },   // intern
    versprechen: "",                                                                                   // öffentlich
    rolle: { name, satz, status: "belegt" | "richtung", quelle: { art: "zitat" | "team", ref }, belegRefs: ["b1"] },
    werte: [{ name, verhalten, nie }],                                                                 // genau 3, R5
    persoenlichkeit: [{ wort, heisst, heisstNicht, fremdbild: "bestaetigt" | "offen" | "widerspricht" }],  // 3 bis 4, R5
    beweise: [{ id, behauptung, beleg, quelle, pruefstatus: "Selbstauskunft" | "Unterlage geprüft", unterlage,
                oeffentlich: "ja" | "nein" | "offen", oeffentlichAus: "geschichte" | "zitat" | "wortlink" | null }],
    markenvertrag: {
      leitidee: "",                                              // intern, nie öffentlich, kein Kriterium
      attribute: [{                                              // genau 5, R5 und R6
        id: "a1", name,
        aus: { feld: "persoenlichkeit" | "werte" | "territorium.kernidee", index: 0, territoriumId: "" },
        wertRef: null,                                           // Index in werte, nur beim Kernidee-Attribut
        heisst: null,                                            // nur beim Kernidee-Attribut ohne wertRef
        heisstNicht: null,                                       // nur bei aus "werte" oder "territorium.kernidee"
        imText, imBild
      }],
      stimmeRichtung: "",                                        // intern, an Schritt 8
      falschWaere: [{ art: "satz" | "bild" | "verhalten", text, quelle }],
      lageAufDerKarte: { x, y, satz },                           // null ohne workshop.karte
      erfolgsmass: { merkmal, messung, ausgangswert, zielkonflikt: { was, entscheidung } | null },
      herkunft: [{ pfad, art: "zitat" | "antwort" | "vorab" | "einsicht" | "territorium" | "ableitung", ref, woertlich: true }],
      anmerkungen: [{ version, feld, text, einordnung, antwort, am }],
      pruefung: { regeln: [{ test, ok, detail }], kalibrierung: { uebereinstimmung, am }, cd, datum },
      messung: { geoeffnetAm, dauerSek, bestaetigtAm, runden },
      version: 1, bestaetigtAm: "", pruefsumme: ""
    },
    luecken: [{ pfad, was, termin }]
  },
  versionen: [/* frühere Stände, neueste zuerst, höchstens 12 wie hmPlattformSpeichern */],
  eingefroren: { version, pruefsumme, am }
}
```

**Auflösung statt Kopie.** `hmAttributAufloesen(v, i)` liefert für jedes Attribut `{name, heisst, heisstNicht, imText, imBild, wertName}`: bei `aus` "persoenlichkeit" `heisst` und `heisstNicht` aus `persoenlichkeit[index]`; bei `aus` "werte" `heisst` aus `werte[index].verhalten` und das eigene `heisstNicht`; beim Kernidee-Attribut `heisst` aus `werte[wertRef].verhalten`, sonst das eigene `heisst`, und das eigene `heisstNicht`. Seite, Druckfassung, Schritt 9, 12, 14 und 15 lesen nur über diese Funktion. `hmVertragFalschListe(v)` liefert `werte[].nie` als Art "verhalten" und danach `falschWaere`, in der Reihenfolge der Seite.

### 8.3 Schema für Structured Outputs der Claude-Kette

In `api/wb-marke.js` mit den vorhandenen Helfern `O`, `A`, `S`, `I`. Claude liefert nie `version`, `bestaetigtAm`, `pruefsumme`, `pruefung`, `messung`, `anmerkungen`, `oeffentlich`; `pruefstatus` ist im Schema auf "Selbstauskunft" beschränkt, `rolle.status` ist ein Vorschlag, den der Stratege setzt. Mengen prüft R5, nicht das Schema.

```js
const E = (werte) => ({ type: "string", enum: werte });
const N = (t) => ({ anyOf: [t, { type: "null" }] });
SCHEMA.vertrag = O({
  positionierung: O({ satz: S, fuerWen: S, nichtFuer: A(S), was: S, andersAls: S, weil: S, weilBelege: A(S) }),
  versprechen: S,
  rolle: O({ name: S, satz: S, status: E(["belegt", "richtung"]), quelle: O({ art: E(["zitat", "team"]), ref: S }), belegRefs: A(S) }),
  werte: A(O({ name: S, verhalten: S, nie: S })),
  persoenlichkeit: A(O({ wort: S, heisst: S, heisstNicht: S })),
  beweise: A(O({ id: S, behauptung: S, beleg: S, quelle: S, pruefstatus: E(["Selbstauskunft"]), unterlage: S })),
  markenvertrag: O({
    leitidee: S,
    attribute: A(O({
      id: S, name: S,
      aus: O({ feld: E(["persoenlichkeit", "werte", "territorium.kernidee"]), index: N(I), territoriumId: N(S) }),
      wertRef: N(I), heisst: N(S), heisstNicht: N(S), imText: S, imBild: S
    })),
    stimmeRichtung: S,
    falschWaere: A(O({ art: E(["satz", "bild", "verhalten"]), text: S, quelle: S })),
    lageAufDerKarte: N(O({ satz: S })),
    erfolgsmass: O({ merkmal: S, messung: S, zielkonflikt: N(O({ was: S, entscheidung: S })) }),
    herkunft: A(O({ pfad: S, art: E(["zitat", "antwort", "vorab", "einsicht", "territorium", "ableitung"]), ref: S }))
  }),
  luecken: A(O({ pfad: S, was: S }))
});
```

Prompt `SCHRITT.vertrag` (Entwurf, Effort high, gleiches System und Dossier wie die übrigen Schritte, mit Cache):

```text
Schritt Vertrag: Positionierung und Markenvertrag.
Baue auf dem gewählten Territorium, seiner Schärfung und der freigegebenen Einsicht. Erfinde nichts. Formuliere keine Aussage über Kunden oder Dritte als Tatsache; gib Sätze, die der Makler über andere wiedergibt, als seine Wiedergabe aus.
Positionierung: satz ist ein interner Arbeitssatz, ein einziger Satz mit höchstens 35 Wörtern nach dem Muster "Für [wen] ist [Name] [der Makler / die Maklerin], [der / die ...]." fuerWen nennt Ort und Anlass oder Objekt. nichtFuer nennt mindestens zwei Gruppen, die der Satz ausschließt. andersAls beschreibt eine Konvention aus Einsicht und Karte, nie einen Namen, nie einen Vorwurf. weil ist ein Satz aus Belegen und setzt die Schärfung um, weilBelege nennt deren IDs.
Versprechen: ein Satz in der Anrede der Website laut Dossier, höchstens 20 Wörter.
Rolle: name nur aus einem Zitat des Maklers, das öffentlich freigegeben ist; sonst ein Vorschlag mit quelle.art "team". Kein Urteil Dritter im Namen, kein Archetyp-Name. status "belegt", wenn der Name beschreibt, was er heute tut, mit belegRefs; sonst "richtung". Höchstens 20 Wörter je Feld.
Werte: genau drei, aus Wert-Leiter und Gründen, je verhalten und ein Satz "nie", beide ohne Subjekt.
Persönlichkeit: drei bis vier Wörter aus "Drei Wörter heute" und Fremdbild, je heisst und heisstNicht ohne Subjekt.
Belege: jede Behauptung mit wörtlichem Beleg und Quelle, pruefstatus immer "Selbstauskunft", unterlage nennt, was vor Veröffentlichung fehlt. Kundenstimmen nur wörtlich und nur mit Freigabe im Dossier.
Markenvertrag: leitidee ist ein Gedanke für das Team mit höchstens 15 Wörtern, kein Claim und nicht die Claim-Idee. Genau fünf Attribute als Verweise: zwei mit aus.feld "persoenlichkeit" und index, zwei mit aus.feld "werte" und index, genau eines mit aus.feld "territorium.kernidee" und der ID des gewählten Territoriums; dieses trägt in wertRef den dritten Wert. Schreibe heisst und heisstNicht nicht ab: bei Persönlichkeit beide null, bei Werten heisst null, beim Kernidee-Attribut heisst null, wenn wertRef gesetzt ist. heisstNicht nennt die naheliegende Übertreibung, beim Kernidee-Attribut das Risiko des Territoriums. imText und imBild sind beobachtbare Regeln, an denen ein Texter und ein Gestalter "trifft" oder "trifft nicht" entscheiden können; imBild beim Kernidee-Attribut folgt der Zeichenidee. falschWaere trennt Satz, Bild und Verhalten. erfolgsmass folgt dem Ziel und seinem Merkmal im Dossier; widerspricht das Ziel der Zielgruppe, benenne es in zielkonflikt und schlage eine Entscheidung vor. lageAufDerKarte ist null ohne Karte.
Herkunft: für jeden Satz, der eigene Worte übernimmt, pfad, art und ref. Lücken: jedes Feld ohne Stoff als "Kommt aus der Redaktion: <was fehlt>".
```

### 8.4 Selbsttest `hmSelbsttestVertrag()`

Schema vollständig für Markus, Elif und Sara; R1 bis R10 grün für Markus nach Redaktion; Sara ohne Antworten liefert nur Lücken und lässt sich nicht senden; ein Name aus `workshop.karte` in `andersAls` wird erkannt; eine erfundene Zahl wird ohne Whitelist erkannt; Leitidee gleich `claimIdee` wird erkannt; Herkunft markiert nur Vier-Wort-Treffer; ein zweiter Kenner mit Warte-Geschichte bekommt im Regelpfad nicht "Zeit ist Teil des Preises."; nach der Bestätigung liefert `hmVertragEingefroren` dieselbe Prüfsumme, auch wenn danach eine Antwort geändert wird; Versprechen folgt `hmAnrede`; kein Renderer (`WeltPost`, `WeltKarte`, `WeltSignatur`, `hmBrand`) liest `markenvertrag.leitidee` oder `positionierung.satz`. Neu in dieser Fassung: vier Attribute oder zwei Kernidee-Attribute werden rot (R5, R6); ein Attribut aus `graetzl` statt aus der Kernidee wird rot (R6); ein Attribut mit `aus` "persoenlichkeit" und eigenem `heisst` wird rot (R6); zwei Werte, vier Werte oder ein nicht referenzierter Wert werden rot (R5, R6); "Der Zinshaus-Mann, dem Notare vertrauen" als `rolle.name` wird rot (R10); `rolle.status` "richtung" und derselbe Name in einem Test-`ueberMich` wird von der Prüfung in Schritt 8 erkannt; ein Beleg mit `oeffentlich` ja ohne `oeffentlichAus` wird rot (R3); die gerenderte Seite für Markus enthält keine eckige Klammer, keinen Abschnitt "Wo Sie stehen" und höchstens neun Abschnitte (R9); `hmAttributAufloesen` liefert für a1 wörtlich `persoenlichkeit[0].heisst`; `hmVertragFalschListe` beginnt mit den drei `werte[].nie`.

### 8.5 Aufwand

**Bau (Schätzung, Setzung):** Regelpfad, Prüfungen, Auflösung und Herkunft 1,5 Tage; Claude-Phase mit Schema und Prompt 0,5 Tage; Team-Redaktion und Kalibrierung 1 Tag; Wort-Link mit Rohskizze und Druckfassung nach dem Satzspiegel aus 3.4, mobil und am Rechner, 1,5 Tage, abgenommen erst an einem gerenderten Mockup mit Markus-Daten ohne eckige Klammer, am Telefon und als A4-PDF; Einfrieren, Versionen, Leser und Anbindung Markenbuch 0,5 Tage; Selbsttest 0,5 Tage. Zusammen rund 5,5 Arbeitstage.

**Betrieb je Makler (Setzung, mit `messung` ersetzen):**

| Rolle | Zeit mit Claude | Zeit ohne Claude |
|---|---|---|
| Stratege, Redaktion | 45 Minuten | 90 Minuten |
| Zwei Teammitglieder, Kalibrierung | je 15 Minuten | je 15 Minuten |
| Creative Director, Abnahme | 10 Minuten | 10 Minuten |
| Stratege, Anmerkung | 15 bis 30 Minuten, falls nötig | 15 bis 30 Minuten |
| Makler | etwa 6 Minuten | etwa 6 Minuten |

Kosten der Claude-Phase: ein Aufruf mit Cache auf System und Dossier; die genaue Zahl liefert `kette.schritte` nach den ersten Läufen (Lücke). Keine Konten des Maklers bei fremden Werkzeugen.

---

## 9. Offene Punkte

1. Anrede gegenüber dem Makler im Wort-Link (Owner, 00_ZERLEGUNG 7.1); bis dahin Setzung nach seiner Website-Anrede.
2. Ob Kennzahlen aus dem Bestand-Import nach einer Stichprobe von drei Objekten als "Unterlage geprüft" gelten dürfen (Owner, Setzung in 3.5).
3. Schwelle der Kohortenprüfung für Verträge (15 Prozent aus MARKENQUALITAET übernommen, für kurze Texte nicht geprüft); tragfähige Kohortengröße offen (R4).
4. Rechtsgrundlage für die Druckfassung und für Belege mit Bezug auf Erbengemeinschaften (anonymisiert, keine Rechtsberatung in diesem Dokument); zu klären vor dem ersten öffentlichen Beleg dieser Art, gemeinsam mit der Einwilligungslogik aus Schritt 1.
5. Die Setzungen sechs Minuten, 500 Wörter, 80 Prozent Kalibrierung, zwei Runden, 60 Sekunden Mindestlesedauer und die Maße des Satzspiegels werden an den ersten fünf Maklern gemessen und ersetzt.
6. Für Markus fehlen alle v2-Eingänge aus Schritt 1 bis 6 (Liste in 3.8); das Beispiel zeigt Struktur und Niveau, nicht einen fertigen Vertrag. Die Richtungswahl ist eine Annahme.
7. Korrekturbedarf an Schritt 4 (`geschichte.belege[].oeffentlich`), Schritt 8 (M7 auf `rolle.status`) und Schritt 15 (sechstes Kriterium über `hmVertragFalschListe`) ist dort noch einzutragen (5.5).
8. Das gerenderte Mockup des Wort-Links (Telefon und A4) entsteht mit dem Bau; ein Mockup vorab wäre mit Markus-Daten nur mit erfundenen Werten für Richtungssatz, Skizze und Termin vollständig.
