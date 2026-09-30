# Schritt 3. Visuelle Vorlieben und Bestand (`vorlieben`)

Stand 30.09.2026, Fassung 4. Entwurf für Branding v2, Teilschritt 3 der Zerlegung in `../00_ZERLEGUNG.md`. Entwurf zur Freigabe durch den Owner.

**Lesart.** *Belegt* heißt: steht in einer Quelle mit URL oder in einer genannten Datei mit Zeile. *Ableitung* heißt: eigene Folgerung aus Bestand und Recherche. *Übertragung* heißt: ein Befund aus einem anderen Feld, den wir auf diesen Fall anwenden, ohne dass er hier geprüft ist. *Setzung* heißt: bewusst gesetzter Startwert, der an den ersten Maklern gemessen und ersetzt wird. *Lücke* heißt: wir wissen es nicht. *Annahme* heißt: nur für das Beispiel Markus Leitner angenommen, weil der Seed den Wert nicht enthält; nie in echte Makler-Daten übernehmen.

## Kurzfassung

Der Schritt ist ein Sehtest, kein Moodboard. Der Makler sieht nach einem ungezählten Probepaar acht Mal zwei Fotos oder Schriftproben, die sich in genau einer Sache unterscheiden, und tippt ohne Begründung auf das, das eher zu seiner Arbeit passt. Die Paare stammen aus einem eigenen, kontrollierten UNIO-Shooting, weil nur so eine einzige Variable je Paar möglich ist und die Rechte bei UNIO liegen. Danach sieht er sein echtes altes Logo in echter Größe und echter Anwendung, markiert, woran er hängt, und entscheidet zwischen genau zwei Optionen, von denen eine begründet empfohlen ist. Regeln machen daraus ein Profil mit Wert und Sicherheit je Dimension, übersetzen jede Dimension in genau benannte Felder der Schritte 6, 9 und 11, prüfen das Profil gegen die Kohorte und erzeugen höchstens zwei Klärungen für den Workshop, die über denselben Mechanismus wie alle Klärungen aus Schritt 4 wirken. Claude hat in diesem Schritt bewusst keine Aufgabe. Dauer für den Makler: etwa vier Minuten (Setzung, gemessen).

**Was sich gegenüber Fassung 3 geändert hat.** Farbtemperatur wirkt nur noch auf die Bildbehandlung, nie auf den Grund des Systems; W2 ist deshalb nur noch ein Hinweis (3.9, 3.10). Neue Regel, wann ein Gegenentwurf aus 9 und 10 eine Grenze überschreiten darf (3.8). Ungezähltes Probepaar vor P1 gegen den Einstiegseffekt, Positionsmessung im Pretest, zweite Reihenfolge nach der Pilotphase (3.2, 3.8). Zustimmung von 11 zu den Folgefeldern ist Bedingung vor der Beauftragung des Shootings; ohne sie wird der Satz vorher verkleinert (3.3, Kapitel 4). Randfall "An nichts davon" bei "trägt" (3.6). `paarStatus` hat Abnehmer in 9 und 11 (5.3). Pretest mit mindestens 30 Wahlen je Paar und Binomialschwelle, Kohortenschwelle erst ab 20 Maklern (1, 3.3). Kohortenprüfung über überlappende Kerngebiete (3.9). Nicht ich mit Einfügen und Beschreiben, eigene Minute in `auftrag.dauer`, Einwilligungszweck als Hinweis an 1 (3.7, 5.3). Höchstens eine gebündelte Nachtrags-Mitteilung (3.3). Bildschirme 11 und 12 für Markus mit Maßen (3.12). Querverweise korrigiert (4, 5.3). Mucho-Aussage als Ableitung gekennzeichnet (2).

---

## 1. Ziel und Erfolgskriterium

**Ziel.** Geschmack zeigen statt beschreiben lassen. Der Schritt liefert dem Art Director zwei Dinge, die kein Fragebogen liefert: die Richtung, in der der Makler die Bilder seiner Arbeit sieht (Licht, Dichte, Menschen in Ortsbildern, Material, Ausschnitt, Farbtemperatur, Ordnung, Schriftcharakter), und die Grenze, wie viel sich an seinem heutigen Auftritt ändern darf. Der Makler gibt Richtung und Grenzen, er gestaltet nicht.

**Der Moment für den Makler.** Seine Bauchwahl zählt, und nichts Vorhandenes verschwindet ohne sein Wort. Beides wird später sichtbar: Im Reveal zeigt `idee.begruendung` Entscheidungen mit der Quelle `vorlieben.profil.<dimension>`, und jedes Element, an dem er hängt, ist im System wiederzufinden oder im Workshop ausdrücklich mit ihm entschieden worden.

**Erfolgskriterien.** Alle Schwellen sind Setzungen und werden an den ersten Maklern gemessen, die Ersatzschwelle aus E2 erst ab 20.

| Nr. | Kriterium | Messung |
|---|---|---|
| E1 | Jedes der acht Paare variiert genau eine Dimension. | Dimensionsprobe im Pretest: drei Teammitglieder benennen unabhängig den Unterschied, alle nennen dieselbe eine Dimension. |
| E2 | Kein Paar misst Qualität statt Geschmack. | Pretest mit mindestens 30 Wahlen je Paar: Die häufigere Seite hat höchstens 21 von 30 Wahlen (70 Prozent). Eigene Binomialrechnung: Ein wirklich ausgewogenes Paar (p = 0,5) reißt diese Schwelle nur mit rund 1,6 Prozent Wahrscheinlichkeit, ein Paar mit wahrer Quote 85 Prozent besteht nur mit rund 2,8 Prozent. Ein Paar mit wahrer Quote 75 Prozent besteht noch mit rund 33 Prozent; das fängt erst die Kohorte. In der Kohorte gilt die Ersatzschwelle erst ab 20 Maklern mit demselben Satz und derselben Reihenfolge (Setzung): ersetzt wird ein Paar, bei dem mindestens 17 von 20 dieselbe Seite wählen (bei p = 0,5 rund 0,3 Prozent Fehlalarm). Vorher wird nur beobachtet. |
| E3 | Der Makler schließt das Kapitel in einer Sitzung ab. | Mindestens 90 Prozent Abschluss, Median höchstens vier Minuten, aus `bildpaare[].dauerMs` und der Link-Messung aus Schritt 2. |
| E4 | Die Bauchwahl wirkt nachweisbar bis in das zugesagte Folgefeld. | Tauschprobe: eine Wahl tauschen. Das Profil ändert sich in genau dieser Dimension, **und** das in Tabelle 3.9 genannte Folgefeld ändert seinen Wert im Regelpfad des Abnehmers oder trägt einen Eintrag in `idee.begruendung`, dessen Quelle im Markenvertrag liegt. Ein Folgefeld, das sich nicht ändert, ist ein roter Test. |
| E5 | Nichts verschwindet still. | Jedes Element in `bestandBehalten` ist in `system.wortmarke.herleitung` oder `system.farbe` wiederzufinden oder steht in `workshop.klaerungen` mit seiner Entscheidung. |
| E6 | Kein fremder Makler-Auftritt als Vorbild, kein fremdes Bild im Repo. | `vorlieben` enthält kein Bildfeld, keine URL, keinen Handle; der Paarsatz enthält kein Branchenmotiv; Rohmaterial zu `nichtIch` ist nach der Deutung gelöscht. |
| E7 | Das Profil trägt keine Unterscheidung, die es nicht leisten kann. | Jede Kohortenwarnung (3.9) hat in Schritt 6 einen Eintrag in `territorien.kritik` (Unterscheidbarkeit) oder in Schritt 9 einen Eintrag in `idee.begruendung` zur Grammatik. |

---

## 2. Geprüfte Alternativen und warum sie verworfen wurden

| Alternative | Was dafür spricht | Warum verworfen | Quelle |
|---|---|---|---|
| A. Heutiger Stand: sechs Farbflächen mit Wortlabel ("Altbau-Stiege", "Glasfassade"), ausgewertet als Zählung warm gegen kühl | schnell, schon gebaut | Es ist eine Wortwahl, keine Bildwahl. Fünf von sechs Paaren haben nichts mit Temperatur zu tun und werden trotzdem als warm gezählt; bp2 zeigt mit dem Handschlag ein Motiv, das die Werkbank selbst verbietet; zwei widersprüchliche Bildpaar-Tabellen. | R3 1.7 Ist-Stand; `bestand/FRAGEN_WIRKUNG_IST.md` Befund 3 und 9; `wb-data.jsx` Zeile 104 und 290 |
| B. Moodboard: der Makler sammelt Bilder oder nennt Accounts, die ihm gefallen (heute Frage `vorbilder`) | reich an Information, vertraut aus Agenturen | Ganze Bilder fixieren: Wer ein Beispiel sieht, übernimmt seine Merkmale, auch wenn die Mängel benannt sind. Boards werden oft anders gelesen als gemeint. Accounts anderer Makler wandern als positive Referenz in die Gestaltung; der Seed von Markus zeigt genau das (`vorbilder`: ein Wiener Makler-Account "weil sachlich", `wb-store.jsx` Zeile 72). Mucho beschreibt als ersten Schritt das Studium des Problems (belegt); dass eine Referenzwand deshalb nicht am Anfang steht, ist unsere Ableitung daraus. | Jansson und Smith 1991: https://www.sciencedirect.com/science/article/abs/pii/0142694X9190003F; Munk u. a. 2020: https://www.designsociety.org/download-publication/43213/visual_boards_mood_board_style_board_or_concept_board; Mucho: https://eyemagazine.com/feature/article/reputations-mucho; R2 Kapitel 4 |
| C. Stilwahl über Adjektiv-Kacheln (modern, minimal, klassisch) wie bei Logo-Generatoren | eine Minute, leicht auszuwerten | Adjektive messen Selbstbild, nicht Sehen. Logo-Generatoren, die so fragen, erzeugen Branchenähnlichkeit. Die Recherche schließt Adjektiv-Abfragen zur Bildsprache ausdrücklich aus. | Looka nach Kreafolk: https://kreafolk.com/blogs/articles/looka-ai-logo-maker; R4 Kapitel 4 Punkt 3; R7 Kapitel "Was bewusst nicht" |
| D. Fotopaare aus Bildagenturen | lizenzierbar in einem Tag, keine Produktion | Zwei Stockfotos unterscheiden sich immer in mehreren Dingen zugleich: Motiv, Licht, Farbe, Ausschnitt. Dann weiß niemand, worauf die Wahl reagiert hat. Dazu Stock-Look und viele Branchenmotive. | R3 1.7 Ableitung ("nur, wenn jedes Paar nur eine Dimension variiert"); UNIO-Regel gegen Stock-Look |
| E. KI-generierte Paare mit einer geänderten Variable | die eine Variable ist technisch leicht zu isolieren | Der Makler würde über KI-Artefakte urteilen statt über Fotografie. Generierte Bilder erkennbarer Personen sind bei UNIO ausgeschlossen, das Paar Ausschnitt braucht aber ein Gesicht. Die Recherche lässt offen, ob erzeugte Bilder die Wahl verfälschen, und die Marke soll gerade nicht nach KI aussehen. | R2 Kapitel 4; R3 Kapitel 6 Punkt 4; `ui_kits/werkbank/CLAUDE.md` Sicherheit |
| F. Visual Brand Driver im Fragebogen (Bilder wählen und begründen) | Feely Studio arbeitet so; die Begründung trennt Markenwahrnehmung von persönlichem Geschmack | Wer begründen soll, warum er etwas mag, wählt anders und ist später weniger zufrieden. Die projektive Übung mit Begründung braucht einen Menschen, der deutet, und gehört deshalb in den Workshop (`workshop.fremdkategorie`). Den berechtigten Kern, Marke statt Privatgeschmack zu messen, übernehmen wir über die Aufgabenstellung (3.1). | Wilson und Schooler 1991: https://doi.org/10.1037//0022-3514.60.2.181; Wilson u. a. 1993: https://doi.org/10.1177/0146167293193010; Sycheva 2026: https://www.smashingmagazine.com/2026/07/how-turn-brand-strategy-into-visual-direction/; R8 Kapitel 2 |
| G. Adaptiver Paarvergleich mit 20 und mehr Paaren (Rangmodell) | genaueres Profil | Länge kostet messbar Teilnahme und Antwortqualität, und bei vielen Bildern kippt der Vorteil der Bildwahl in Überforderung. Acht feste Paare reichen für acht Parameter. | Galesic und Bosnjak 2009: https://academic.oup.com/poq/article-abstract/73/2/349/1939196; Townsend und Kahn 2014: https://doi.org/10.1086/673521 |
| H. Sechs Markenwelten zur Wahl statt Paaren | zeigt fertige Gestaltung | Das ist eine Gestaltungsaufgabe und ein Katalog. Sechs gleichrangige Optionen liegen über der Grenze, bei der Überforderung verlässlich auftritt, wenn Präferenzen unklar sind. | Chernev u. a. 2015: https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf; R8 Kapitel 5; Zerlegung G2 |
| I. Bestand: Auswahlfrage "Behalten und schärfen, neu, keines" ohne das Logo zu zeigen (heute `behalten`) | eine Frage | Ohne Wirkung: die Antwort steuert nur eine Überschrift, Schrift und Akzent ignorieren sie. Ohne das echte Logo vor Augen ist die Antwort ein Gefühl, keine Entscheidung. | `bestand/KETTE_IST.md` 2.1; `wb-flow.jsx` Zeile 125 |
| J. Bestand: das Team entscheidet allein über das alte Logo, wie Rand für NeXT eine Lösung ohne Optionen vorlegte | Expertenführung, keine Geschmacksfrage | Menschen, die an einer Marke hängen, bewerten eine Neugestaltung umso schlechter, je stärker sie sich verändert. Wer den Wechsel nicht mitträgt, kippt ihn, wie Gap 2010 nach einer Woche. Landor entscheidet evolutionär oder revolutionär ausdrücklich vorab. | Walsh, Winterich, Mittal 2010: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1998809; Gap: https://www.npr.org/2010/10/08/130419187/the-gap-gets-backlash-for-logo-makeover; Landor: https://www.creativegaga.com/design/graphic-design/packaging/landor-mumbai-shares-secrets |
| K. Bestand: der Makler wählt zwischen drei Skizzen seines geschärften Logos | fühlt sich konkret an | Gestaltung vor Einsicht und Vertrag, dazu Urteil am Logo allein. Beides widerspricht den Grundsätzen G1 und G4 der Zerlegung. | Mozilla Open Design: https://blog.mozilla.org/opendesign/roads-not-taken/; Zerlegung G1, G4 |
| L. Schriftprobe als Klassenwahl Antiqua gegen Grotesk (Fassung 2) | leicht zu erklären, groß im Unterschied | Misst das Gröbste. Top-Studios unterscheiden Schrift nach Charakter (Strichkontrast, Breite, Wärme der Formen), und die Klasse folgt ohnehin der Stimme, weil ein starker Text seine Persona auch gegen die Schrift behält. Eine Klassenwahl wird zudem leichter als Logo-Wahl gelesen. | Brumberger 2003: https://www.ingentaconnect.com/content/stc/tc/2003/00000050/00000002/art00007; Ableitung |

**Was aus den Alternativen übernommen wird.** Aus B die Idee, dass Ablehnung mehr sagt als Vorliebe (`nichtIch`, aber nur als gedeutetes Merkmal). Aus F die Trennung von Marke und Privatgeschmack, aber über die Aufgabenstellung statt über eine Begründung, und die projektive Übung verlegt in den Workshop. Aus J die Expertenführung, aber als markierte Empfehlung zwischen zwei Optionen statt als Alleinentscheidung.

---

## 3. Die gewählte Lösung

### 3.1 Grundidee

Drei Bausteine in einem Kapitel des Links aus Schritt 2, in dieser Reihenfolge:

1. **Ein Probepaar und acht Paare** (etwa zwei Minuten). Je Paar genau eine Dimension, Tippen ohne Warum, "Beides gleich" als dritte Möglichkeit. Das Probepaar P0 zählt nicht (3.8).
2. **Das eigene alte Logo** (etwa eine Minute). In echter Größe und echter Anwendung, dann antippen, woran er hängt, dann eine Entscheidung zwischen zwei Optionen mit markierter Empfehlung.
3. **Nicht ich** (optional, etwa eine Minute). Bis zu drei Auftritte, die er nicht sein will, als Link oder Screenshot.

**Warum diese Reihenfolge (Ableitung).** Die Paare kommen vor dem Logo, damit sein Geschmack nicht vom eigenen Bestand verankert wird. Das Logo kommt vor "Nicht ich", damit die einzige echte Entscheidung des Kapitels in voller Aufmerksamkeit fällt. "Nicht ich" steht am Ende, weil es optional ist und das Überspringen dort nichts unterbricht.

**Warum ein Sehtest trägt.** Belegt: Ein Urteil über visuelle Anziehung fällt in rund 50 Millisekunden und hält auch bei längerem Hinsehen (Lindgaard u. a. 2006: https://www.tandfonline.com/doi/abs/10.1080/01449290500330448). Deshalb zählt die schnelle Wahl. Ableitung: Sie ist aber nur deutbar, wenn sich die zwei Bilder in genau einer Sache unterscheiden, und nur fair, wenn beide Seiten gleich gut sind. Übertragung: In Persönlichkeitstests verzerrt erzwungene Wahl am wenigsten, wenn beide Optionen gleich erwünscht sind (Cao und Drasgow 2019: https://www.ncbi.nlm.nih.gov/pubmed/31070382). Die Studie betrifft das Verfälschen von Selbstauskünften, nicht Bildpräferenz; wir übernehmen daraus nur die Forderung nach gleich erwünschten Polen und prüfen sie mit E2 selbst.

**Aufgabentext: "passt eher zu Ihrer Arbeit" statt "eher Ihres".** Sycheva trennt ausdrücklich Markenwahrnehmung von persönlichem Geschmack (R8 Kapitel 2, https://www.smashingmagazine.com/2026/07/how-turn-brand-strategy-into-visual-direction/). Bei einer Personenmarke sind Person und Unternehmen zwar eins, aber der Makler hat auch einen Privatgeschmack, der nichts mit seinen Kunden zu tun hat, etwa die Einrichtung seiner Wohnung. "Eher Ihres" lädt diesen Privatgeschmack ein, "passt eher zu Ihrer Arbeit" lenkt die Bauchwahl auf die Marke, ohne ein Warum zu verlangen. Ableitung, deshalb im Pretest geprüft, aber ohne die Probanden auf zwei kleine Gruppen zu teilen: Alle mindestens 30 Personen bekommen "passt eher zu Ihrer Arbeit" und nach dem ganzen Test eine einzige Frage, "Woran haben Sie beim Wählen gedacht: an sich selbst oder an Ihre Arbeit?". Sagt mehr als die Hälfte "an mich selbst", wird der Aufgabentext überarbeitet und der Pretest wiederholt (Setzung). Ein Vergleich zweier Formulierungen mit je 15 Personen hätte zu wenig Trennschärfe, um einen Unterschied in der Streuung zu erkennen (Ableitung aus derselben Binomialrechnung wie E2).

### 3.2 Der Paarsatz v1

Jede Dimension entspricht einem Parameter, den ein Abnehmer festlegen muss; welches Feld genau, steht in Tabelle 3.9. Pol a und b sind intern; der Makler sieht nie ein Wort dazu.

| Paar | Dimension | Pol a | Pol b | Szene | So entsteht genau eine Variable |
|---|---|---|---|---|---|
| P0 | keine (Probe, zählt nicht) | Bild | dasselbe Bild waagrecht gespiegelt | Flur mit Tür, ohne Richtungsmerkmal wie Schrift | eine Aufnahme, einmal gespiegelt; kein Unterschied in einer der acht Dimensionen, deshalb ohne Aussage |
| P1 | Licht | weich, diffus | gerichtet, mit harten Schatten | Zimmer mit Fenster, Tisch, Stuhl | Stativ, gleiche Einstellung, bedeckter Himmel gegen direkte Sonne; Weißabgleich und mittlere Helligkeit angeglichen, damit die Sonne nicht zusätzlich wärmer wirkt |
| P2 | Dichte | ein Motiv, viel freie Fläche | viele Dinge, gefüllte Fläche | Wand mit Sideboard | Stativ, Dinge werden entfernt, sonst nichts |
| P3 | Menschen in Ortsbildern | ein Mensch geht durchs Bild, im Rücken oder in Bewegung, nie erkennbar, kein Porträt | derselbe Ort leer | Innenhof oder Stiegenhaus | Stativ, gleiche Belichtung, einmal mit, einmal ohne Person. Die Dimension betrifft Orts- und Detailbilder, nie sein eigenes Porträt, dessen Anteil Schritt 13 regelt |
| P4 | Material | gealtert, mit Spuren: geöltes Holz, abgetretener Stein, Messing | neu, glatt: Lack, Glas, gebürsteter Stahl | Detail einer Fensterbank im selben Fenster | gleicher Bildaufbau, gleiches Licht, nur die Oberfläche wird getauscht |
| P5 | Ausschnitt | nah und angeschnitten: Kopf und Schulter, der Rand schneidet | mit Abstand: Halbfigur mit Raum | Porträt eines Modells vor einer Wand | zwei Zuschnitte derselben hochauflösenden Aufnahme, je Format definiert |
| P6 | Farbtemperatur | warm | kühl | Stiegenhaus mit Fenster | dieselbe Aufnahme mit zwei Weißabgleichen, Helligkeit gleich |
| P7 | Ordnung | streng: Achsen, parallel, symmetrisch, Kamera axial | frei: dieselben Dinge wie benutzt liegen gelassen, Kamera leicht schräg | Tisch von oben mit Buch, Brille, Tasse, Notizbuch | Kamera fest, nur Anordnung und Kippung um höchstens 8 Grad wechseln (Setzung) |
| P8 | Schriftcharakter | geringer Strichkontrast: Grund- und Haarstriche fast gleich stark | hoher Strichkontrast: kräftige Grundstriche, feine Haarstriche | gesetzte Probe: "Hof links, Stiege 2, Tür 14." | beide Proben in derselben Schriftklasse (Antiqua, weil der Kontrast dort natürlich variiert), am saubersten zwei Schnitte einer Familie mit Kontrastachse; gleiche x-Höhe, gleiche Breite, gleicher Grauwert, gleiche Farbe auf gleichem Grund. Nur der Kontrast wechselt |

**Warum P8 bleibt, obwohl die Schrift zuerst der Stimme folgt (Ableitung).** Die Klasse der Schrift (Antiqua oder Grotesk) folgt der Stimme; das bleibt so, und deshalb misst P8 die Klasse nicht mehr. Innerhalb der Klasse aber entscheidet der Strichkontrast über das Register: ruhig und robust gegen fein und formal. Diese Nuance kann die Stimme nicht liefern, und Schritt 6 (`typoRichtung`) und Schritt 9 (Schriftrichtung) brauchen sie. P8 kostet rund 15 Sekunden. Fällt P8 im Pretest bei E1 durch, weil die Probanden den Unterschied als Klasse oder als Größe lesen, entfällt das Paar und die Dimension steht auf offen.

**Regeln für den ganzen Satz.**
- Keine Branchenmotive: kein Handschlag, kein Schlüssel, kein Verkaufsschild, kein Makler am Schreibtisch, kein Hausmodell, kein Daumen hoch, kein Sektglas, keine Renderings, keine Wahrzeichen, keine Objekte zum Verkauf.
- Szenen gemischt aus Altbau, Neubau und Straße, damit sich weder ein Zinshaus-Makler noch eine Neubau-Maklerin fremd fühlt. Nur P4 trägt Alt gegen Neu als Dimension.
- Kein Filter, kein Weichzeichner, keine Vignette, keine Verläufe. Farbe und Helligkeit werden paarweise gemessen angeglichen.
- Jedes Foto wird aus demselben Original in 1:1 (Telefon) und 4:5 (Rechner) geliefert; das Motiv ist so komponiert, dass beide Zuschnitte tragen. P5 ist je Format eigens definiert (Kopfanteil an der Bildhöhe, Setzung: Pol a 0,55, Pol b 0,28).
- Die Schriften in P8 stammen nicht aus der Schriftbank, aus der Schritt 10 später setzt. So entsteht nie der Eindruck, er habe seine Schrift gewählt.
- Der Satz in P8 ist neutral, wienerisch und enthält Ziffern. Er ist bewusst nicht sein Name, damit das Paar nicht als Logo-Wahl gelesen wird.
- Der Satz ist für alle Makler gleich und versioniert (`satz: "v1"`). Nur so sind Profile in der Kohorte vergleichbar (Zerlegung G16).

**Reihenfolge der Paare (Setzung).** Immer zuerst P0 als Probe. Reihenfolge A: P1 Licht, P3 Menschen, P6 Farbtemperatur, P2 Dichte, P4 Material, P5 Ausschnitt, P7 Ordnung, P8 Schriftcharakter. Anschauliche Paare zuerst, die Schriftprobe als der Gestaltung nächste Probe zuletzt. Die Seite von Pol a wird je Makler zufällig gesetzt und gespeichert, damit eine Neigung zur linken oder oberen Seite das Profil nicht verzerrt (Ableitung, keine eigene Quelle).

**Reihenfolge als Störgröße.** Bei einer festen Reihenfolge für alle lässt sich ein Positionseffekt (Ermüdung, Eingewöhnung, Tempo) in der Kohorte nicht von der Dimension trennen: Wenn P7 auffällig oft "mittel" wird, weiß niemand, ob es an der Ordnung oder am siebten Platz liegt (Ableitung). Deshalb dreistufig:
1. Im Pretest wird die Reihenfolge der sieben Fotopaare je Person nach einem lateinischen Quadrat rotiert, P0 bleibt vorn, P8 hinten. So misst der Pretest Dimension und Position getrennt, darunter den Einstiegseffekt auf Platz 1 (3.8).
2. In der Pilotphase (bis 20 Makler) läuft nur Reihenfolge A, damit die ersten Profile untereinander vergleichbar sind.
3. Danach wechseln sich Reihenfolge A und B je Makler ab. B: P5 Ausschnitt, P7 Ordnung, P4 Material, P1 Licht, P2 Dichte, P3 Menschen, P6 Farbtemperatur, P8 Schriftcharakter; jede Fotodimension steht in B an einem anderen Platz als in A. `bildpaare[].position` speichert den Platz, die Kohortenauswertung (E2) rechnet getrennt nach Reihenfolge.

### 3.3 Herstellung, Rechte und Pilotregel (einmalig, Team)

1. **Shooting.** Ein Tag in Wien mit Fotografin oder Fotograf, einem Modell für P3 und P5 und zwei Orten (Wohnung, Hof). Stativ für alle Paare außer P5. Werkvertrag mit ausschließlichen, zeitlich unbegrenzten Nutzungsrechten für den internen Präferenztest, Einwilligung des Modells für genau diesen Zweck. Die Rechtsgrundlage ist vor dem Einsatz zu klären (Zerlegung Kapitel 7, Punkt 3); dieses Dokument ist keine Rechtsberatung.
2. **Schriftprobe P8.** Das Team wählt zwei Schnitte außerhalb der Schriftbank von Schritt 10, prüft die Lizenz für die Anzeige im Link und setzt die Probe als SVG mit Pfaden, damit keine Schriftdatei ausgeliefert wird.
3. **Auswahl und Angleich.** Je Paar aus mehreren Aufnahmen die zwei, die sich am saubersten nur in der Dimension unterscheiden; Helligkeit und Weißabgleich paarweise messen und angleichen. Ein halber bis ganzer Tag (Setzung).
4. **Pretest.** Dimensionsprobe mit drei Teammitgliedern (E1). Wahl mit mindestens 30 Personen außerhalb des Teams, am eigenen Telefon im echten Link, Reihenfolge rotiert (3.2): E2, Prüffrage zum Aufgabentext (3.1), Lesefaktor k für P8 und Positionsfaktor für Platz 1 (3.8). Die Probanden sind keine Makler im Prozess; wie viele Makler oder Assistenzen aus dem UNIO-Umfeld dafür zu gewinnen sind, ist eine Lücke. Dass Nicht-Makler anders wählen als Makler, ist möglich; deshalb gilt die Kohortenschwelle aus E2 zusätzlich. Fällt ein Paar durch, wird es neu fotografiert, nicht beschriftet.
5. **Ablage.** Die Bilddateien liegen nicht im öffentlichen Repo, sondern im geschützten Speicher, den auch der Link aus Schritt 2 nutzt. Im Repo stehen nur die Metadaten `HM_PAARSATZ` mit `paarId`, `dimension`, Pol-Klartext, neutralem Alternativtext ("Zimmer mit Fenster, Bild A"), Lizenznummer, Prüfsumme und relativem Pfad.

**Pilotregel (Setzung, Entscheidung beim Owner).**
- Angebot: Das Team holt bis 16.10.2026 zwei Angebote Wiener Fotografinnen oder Fotografen für den Shooting-Tag samt Modell ein. Bis dahin bleiben die Kosten eine Lücke; die Werkbank führt sie als offenen Punkt mit Datum.
- **Zustimmung vor der Beauftragung (Bedingung).** Bis zum selben Datum, 16.10.2026, stimmt der Entwerfer von Schritt 11 den Folgefeldern zu, die heute nur als Hinweis bestehen. Beauftragt wird nur, was einen zugestimmten Abnehmer hat. Ohne Zustimmung wird der Satz **vor** der Produktion verkleinert, nicht nachträglich:

| Folgefeld in 11 | Paar | ohne Zustimmung bis 16.10.2026 |
|---|---|---|
| `bild.regeln.abstand.mass.freiflaecheMin` | P2 Dichte | P2 wird nicht fotografiert: Übrig bliebe nur der interne Weltrang in 9 und Stufe 3 der Achsenregel, keine Wirkung, die der Makler je sieht |
| `bild.regeln.haltung.kamera` | P7 Ordnung | P7 wird nicht fotografiert, gleiche Begründung |
| Pflicht-Detailmotiv in `bild.motive` und Ortsregel für `fotobrief.orte` | P4 Material | P4 wird nicht fotografiert, gleiche Begründung |
| `bild.motive` Rolle `ort` mit oder ohne Person | P3 Menschen | P3 wird nicht fotografiert: 11 liest das Profil zwar (11_bild.md Zeile 353), hat aber kein Zielfeld |
| `bild.regeln.abstand.mass.kopfanteilMax` | P5 Ausschnitt | P5 bleibt, weil 9 das Profil in der Pflicht-Begründung "Ausschnitt" (09_idee.md Zeile 176) und 6 es für die Rohskizzen liest (06_territorien.md Zeile 462); die Grenze der Einstellungsgrößen entfällt dann, E4 prüft die Begründung in 9 |

P1 Licht, P6 Farbtemperatur und P8 Schriftcharakter haben schon heute Abnehmer, die das Feld führen (11_bild.md Zeile 88 und 93, 09_idee.md Zeile 176, 06_territorien.md Zeile 462). Der kleinste Satz hat damit vier Paare (P1, P5, P6, P8); er bekommt eine eigene Version (`satz: "v1-4"`) und ein eigenes Schema. Eine Zustimmung nach dem 16.10.2026 wirkt erst für den nächsten Satz, nie durch ein Nachfotografieren einzelner Paare, weil Licht und Angleich eines Tages nicht nachzustellen sind (Ableitung).
- Stichtag: Der Paarsatz ist bis 13.11.2026 fotografiert, angeglichen und im Pretest bestanden.
- Makler, deren Link vor dem Stichtag rausgeht: Das Kapitel zeigt nur Logo und Nicht ich, `paarStatus` ist "ohne Paarsatz". Sobald der Satz steht, bekommt jeder dieser Makler, dessen Richtungstermin (Schritt 6) mindestens fünf Werktage entfernt ist, einen Nachtrag im selben Link (Probepaar und Paare, etwa zwei Minuten). Wer später dran ist, bleibt ohne Paarsatz; Schritt 9 schreibt dann in `idee.begruendung` "ohne Paarsatz, aus dem Vertrag" statt still mit einem unscharfen Profil zu arbeiten (Hinweis an 9 und 11 in 5.3).
- **Höchstens ein Nachtrag je Makler.** Stehen Paarsatz und Logo beide aus, werden sie gebündelt: eine einzige Mitteilung, sobald beides bereit ist, spätestens sieben Werktage vor dem Workshop mit dem, was bis dahin bereit ist (Setzung). Was danach fertig wird, kommt nicht mehr als Mitteilung, sondern im Workshop: das Logo-Urteil am Tisch mit denselben zwei Optionen, der Paarsatz entfällt für diesen Makler. So zerfällt der Moment nie in drei Teile.
- Nach dem Stichtag gibt die Werkbank den Link nur mit geprüftem Paarsatz frei. Verschiebt sich der Stichtag, entscheidet der Owner ausdrücklich, ob Links ohne Paarsatz weiterlaufen.
- Es gibt nie einen Ersatz aus Stock oder KI. Der Regelpfad setzt Lücken statt Muster.

### 3.4 Ablauf für den Makler

Die Anrede der Oberfläche folgt der Einstellung des Links aus Schritt 2 (offener Punkt 7.1 der Zerlegung); die Beispiele hier sind in Sie, wie für Markus Leitner. Die gestalterische Vorgabe steht in 3.5.

**Bildschirm 1, Einstieg.**
Überschrift: "Drei kurze Teile."
Text: "Acht Bildpaare, Ihr Logo und optional ein Beispiel, wie Sie nicht aussehen wollen. Zusammen etwa vier Minuten."
Zweiter Absatz: "Bei den Bildpaaren tippen Sie jeweils auf das Bild, das eher zu Ihrer Arbeit passt. Ohne Nachdenken, es gibt kein Richtig. Das erste Paar ist eine Probe und zählt nicht."
Aktion: "Anfangen".
Die Minuten kommen aus `auftrag.dauer` (Schritt 1). Ohne Logodatei lautet die Überschrift "Zwei kurze Teile." und der Text nennt nur Bildpaare und Beispiel; ohne Paarsatz "Zwei kurze Teile." mit Logo und Beispiel. Ohne Logo und ohne Paarsatz entfällt das Kapitel bis auf Nicht ich.

**Bildschirm 2 bis 9, je ein Paar, davor das Probepaar.**
Zwei Bilder, auf dem Telefon übereinander, auf dem Rechner nebeneinander. Die ganze Bildfläche ist Tippfläche. Zwischen den Bildern, mit dem Daumen erreichbar, steht "Beides gleich". Kein Wort am Bild, kein Weiter-Knopf: Tippen wählt und blendet das nächste Paar ein. Oben links "Zurück" als Symbol, oben rechts "Probe", danach "1 von 8" bis "8 von 8". "Zurück" zeigt das letzte Paar mit seiner Wahl; eine neue Wahl ersetzt sie und zählt als Wechsel. Die Zeit zählt ab dem Moment, in dem beide Bilder dekodiert und sichtbar sind.

**Bildschirm 10, Abschluss der Paare.**
Überschrift: "Das ist Ihre Auswahl."
Darunter seine acht gewählten Bilder als Kontaktbogen, bei "Beides gleich" beide Bilder halb.
Text: "Diese Bilder kommen nicht in Ihren Auftritt. Sie zeigen uns, wie Licht, Ausschnitt und Material Ihrer eigenen Bilder werden sollen."
Aktion: "Weiter zu Ihrem Logo".

**Bildschirm 11, Ihr Logo heute.** Nur wenn `vorab.logoAlt.datei` vorliegt und die Bestandsprüfung fertig ist.
Überschrift: "Ihr Logo heute."
Das echte Logo in den Größen, in denen es arbeitet: als Profilbild in 110 px, auf der Visitenkarte in 20 mm Breite, dazu der echte Screenshot aus `vorab.auftrittHeute`. Nie allein groß auf Weiß (Zerlegung G4).
Text: "Woran hängen Sie? Tippen Sie an, was bleiben soll."
Darunter die Elemente mit dem echten Ausschnitt aus seinem Logo, vom Team markiert (3.6): etwa "Die Farbe", "Die Initialen", "Die Form", "Der Schriftzug", dazu "An nichts davon". Mehrfachwahl, kein Warum.

**Bildschirm 12, die eine Entscheidung.**
Überschrift: "Wie geht es mit Ihrem Logo weiter?"
Zwei Optionen, nie drei (Auswahl in 3.6). Jede nennt die Folge in seinen Elementen, nicht in Fachwörtern. Die empfohlene ist mit einem kräftigeren Rahmen markiert, und unter ihrem Text steht "Das empfehlen wir, weil" mit zwei Sätzen aus der Bestandsprüfung. Die Markierung steht unter dem Text, nie als Zeile über dem Titel. Die Wahl wird mit "Festhalten" bestätigt, weil sie die einzige echte Entscheidung des Kapitels ist.
Nach der Wahl eine Zeile, was jetzt passiert: "Festgehalten. Im Workshop sprechen wir über einen Punkt, der noch nicht zusammenpasst." (bei zwei Punkten "über zwei Punkte"), oder ohne Klärung "Festgehalten. Sie sehen das Ergebnis im Reveal in Anwendung."

**Bildschirm 13, Nicht ich (optional).**
Überschrift: "Wie wollen Sie nicht aussehen?"
Text: "Bis zu drei Auftritte, aus jeder Branche. Ein Link genügt, ein Satz auch. Bitte keine Screenshots, auf denen Privatpersonen zu erkennen sind. Wir halten nur fest, was daran nicht zu Ihnen passt, nicht wer es ist. Wir speichern Ihre Beispiele höchstens 14 Tage, lesen nur ein Merkmal heraus und löschen sie dann."
Je Eintrag ein Feld mit drei Wegen, alle mit einer Hand: "Link einfügen" setzt den Inhalt der Zwischenablage ein (auf Telefonen, die den Zugriff verweigern, öffnet das Feld mit dem Einfügen-Menü des Systems), "Beschreiben" öffnet ein Textfeld mit Diktier-Taste für einen Satz wie "die Bauträger-Seiten mit Abendhimmel", "Screenshot" öffnet die Fotoauswahl. Beschreiben ist gleichwertig: Das Team deutet einen Satz genauso wie einen Link.
Aktionen: "Hinzufügen", "Überspringen". Kein Warum.
Warum drei Wege: Einen Link aus einer anderen App zu holen, heißt App wechseln, suchen, kopieren, zurückkehren; das bricht die Einhand-Minute (Ableitung). Wer etwas im Kopf hat, beschreibt es schneller, als er es findet. Die Dauer ist als eigene Zeile in `auftrag.dauer` geführt (Setzung eine Minute, Hinweis an 1 in 5.3) und wird je Weg in der Link-Messung aus Schritt 2 gemessen (`fragebogen.messung`, Einträge mit dem Schlüssel `vorlieben.nichtIch.<weg>`, Hinweis an 2 in 5.3); nach 20 Maklern entscheidet die Messung, ob ein Weg entfällt.

**Bildschirm 14, Ende des Kapitels.**
Überschrift: "Fertig."
Text, aus Bausteinen der Regeln zusammengesetzt: "Ihre Bildwahl geht als Richtung an das Team. Ihr Logo: [Folge in einem Satz aus Tabelle 3.6]." Bei Nicht ich zusätzlich: "Ihre Beispiele lesen wir im Workshop gemeinsam, als ein Merkmal, nicht als Name." Zum Schluss: "Als Nächstes: der Workshop am [Datum aus `auftrag.termine`]."

### 3.5 Gestalterische Vorgabe der Makler-Bildschirme

Dieses Kapitel ist der erste visuelle Kontakt des Maklers mit der Werkbank. Es folgt den Tokens des UNIO-Design-Systems (`tokens/colors.css`, `typography.css`, `spacing.css`, `materials.css`) und nicht der Standard-Karte der Werkbank. Grundsatz: Die Fotos sind die Oberfläche, alles andere tritt zurück.

| Bereich | Vorgabe |
|---|---|
| Grund und Farbe | Grund `--paper` (#F7F5F1), Text `--ink`, Hilfstext `--text-muted`, Flächen für Ladezustand `--paper-2`. Keine Karte, kein Schatten (`--shadow-*` nicht verwenden), kein Blur, keine Körnung (`--grain` nicht verwenden), keine Verläufe, keine Signalfarbe im Kapitel, damit keine Farbe die Bildwahl beeinflusst. |
| Schrift | `--font-display` (Power Grotesk). Überschriften `--size-h2` mit Gewicht 400, Laufweite `--track-display`, Zeilenabstand 1,05. Fließtext `--size-body` (18 px), Zeilenabstand 1,45, höchstens 34 Zeichen je Zeile am Telefon und 56 am Rechner. Fortschritt und "Beides gleich" `--size-small` (15 px) mit Tabellenziffern. Keine Versalzeilen, keine Mono-Labels (`.hm-mono` ist hier nicht erlaubt). |
| Paare am Telefon | Bilder im Format 1:1, übereinander. Kantenlänge s = kleinerer Wert aus Breite minus 32 px und (sichtbare Höhe minus 104 px) geteilt durch 2; bei 375 x 812 mit Sicherheitszonen ergibt das rund 313 px, zentriert. Kopfzeile 44 px mit Zurück-Symbol links und "3 von 8" rechts, zwischen den Bildern ein 44 px hoher Streifen mit "Beides gleich" mittig. Kein Scrollen. Warum 1:1 übereinander: zwei Bilder 4:5 nebeneinander hätten je rund 165 x 206 px, übereinander je rund 313 x 313 px, also etwa die dreifache Fläche; Licht und Material lassen sich nur auf Fläche beurteilen (Ableitung). |
| Paare am Rechner | Bilder im Format 4:5 nebeneinander, je höchstens 440 px breit, Abstand `--gutter` (24 px), zentriert im Raum; "Beides gleich" mittig darunter, Fortschritt oben rechts. Tasten: Pfeil links und rechts wählen, Pfeil nach unten "Beides gleich", Rücktaste zurück. Fokusrahmen 2 px `--ink` mit 3 px Abstand. |
| Bildkanten | rechtwinklig, ohne Rahmen. Fotos werden wie Abzüge gezeigt, nicht wie Karten. |
| Übergang | Nach dem Tippen bleibt das gewählte Bild 180 ms voll stehen, das andere geht auf Deckkraft 0; dann blendet das nächste Paar in `--dur-fast` (450 ms) mit `--ease-unio` ein. Kein Skalieren, kein Schieben, kein Leuchten. Bei `prefers-reduced-motion` wechselt das Paar ohne Blende. |
| Beides gleich | Beide Bilder gehen 180 ms auf Deckkraft 0,6, dann folgt das nächste Paar wie oben. |
| Zurück | Das vorige Paar erscheint mit seiner Wahl: das gewählte Bild mit einem Rahmen 2 px `--ink` innen, das andere auf Deckkraft 0,4. Bei "Beides gleich" sind beide auf 1,0 und der Text ist unterstrichen. |
| Druckzustand | Beim Berühren geht das Bild auf Deckkraft 0,92. Keine Welle, kein Zoom. |
| Laden | Der ganze Satz (16 Bilder, je Format etwa 120 KB als AVIF mit WebP-Rückfall, Setzung) wird geladen, während er Bildschirm 1 liest; jedes Paar wird vor dem Einblenden dekodiert. Ist ein Paar noch nicht bereit, stehen zwei ruhige Flächen in `--paper-2`, ohne Schimmer und ohne Skelett-Animation; nach 1,5 s erscheint darunter eine Zeile "Bilder laden" in `--text-muted`. Die Zeit läuft erst ab Sichtbarkeit beider Bilder. |
| Kontaktbogen (Bildschirm 10) | vier mal zwei Felder 1:1, 4 px Abstand, wie ein Bogen; bei "Beides gleich" ein Feld aus zwei senkrechten Hälften. Das Probepaar erscheint nicht. |
| Logo (Bildschirm 11) | Profilbild-Kreis 110 px aus dem echten Screenshot, Visitenkarte mit 20 mm Logobreite (als 76 px bei 96 dpi gerechnet, Setzung), Screenshot in voller Breite. Element-Kacheln 96 x 96 px auf `--paper-2`, Bezeichnung darunter in 15 px; gewählt mit Rahmen 2 px `--ink` und einem SVG-Häkchen mit 1,5 px Strich. |
| Entscheidung (Bildschirm 12) | zwei Blöcke über die volle Breite, Rand 1 px `--hairline-dark`, Radius `--r-m`; die Empfehlung mit 2 px `--ink`. Darunter genau ein Knopf "Festhalten" als `.hm-btn`, erst aktiv nach der Wahl. |
| Barrierefreiheit | Alternativtexte nennen nur die Szene, nie den Pol. Mit Bildschirmleser gibt es "Bildpaare überspringen": `paarStatus` "übersprungen", alle Dimensionen offen. Tippflächen mindestens 44 px. |

### 3.6 Bestand: Prüfung, zwei Optionen, Folgen

**Was das Urteil bedeutet.** `bestandUrteil` ist eine Änderungserlaubnis, kein Gestaltungsauftrag. Die Richtung der Marke steht erst in Schritt 6 fest; deshalb legt der Makler hier nicht fest, wie das Logo aussehen wird, sondern wie viel sich ändern darf und was bleiben muss. Braucht die gewählte Richtung später mehr Änderung, als erlaubt ist, wird das im Richtungstermin offen gefragt und nie still umgesetzt (Ableitung aus Walsh u. a. 2010 und Zerlegung G15). Dass Schärfen auf Top-Niveau eine vollwertige Leistung ist, zeigen Pentagram für Mastercard (Erbe als Grundlage, reduziert auf zwei Kreise: https://www.pentagram.com/work/mastercard) und StudioSmall für The Modern House (eine funktionierende Identität vor allem geschärft, R5: https://the-brandidentity.com/project/studiosmall-prepare-modern-house-modern-world-elegant-identity-system).

**Drei Ausgangslagen.**
- Logodatei liegt vor: Bestandsprüfung, dann Bildschirme 11 und 12.
- Es gibt ein Logo, aber die Datei fehlt (etwa: der Bestand nennt ein Logo, `vorab.logoAlt.datei` ist leer): Das Team fordert die Datei als Aufgabe an (`vorab.luecken`). Der Link läuft ohne Bildschirme 11 und 12; sie werden im selben Link nachgereicht, sobald Datei und Prüfung da sind, mit höchstens einer gebündelten Mitteilung nach der Nachtragsregel in 3.3. Bis dahin ist `bestandUrteil.quelle` "ausstehend" und `wert` leer. Schritt 10 steht dann auf "blockiert: Bestandslogo fehlt" (10_system.md 3.6, 10.0), fällt also nie still auf "neu".
- Es gibt kein Logo: Bildschirme 11 und 12 entfallen, `wert` "neu", `quelle` "kein Logo".

**Bestandsprüfung durch das Team (vor der Freigabe der Bildschirme 11 und 12, etwa 15 Minuten, Setzung).** Grundlage ist `vorab.logoAlt` aus Schritt 1.

| Prüfpunkt | Frage | Grundlage | Feld |
|---|---|---|---|
| Bekanntheit | Wo und wie lange ist das Logo schon sichtbar: Schild, Website, Profil, Karte? | `vorab.auftrittHeute`, `vorab.material`, `vorab.fakten.seit`; eine echte Messung der Wiedererkennung gibt es nicht (Lücke) | `pruefung.bekanntheit {jahre oder null, orte[]}` |
| Eigenständigkeit | Ist es mit einem Auftritt der Wettbewerbskarte oder einem Franchise-Muster verwechselbar? | `vorab.wettbewerb`; Distinctive Assets werden nach Bekanntheit und Eindeutigkeit beurteilt (Romaniuk: https://marketingscience.info/news-and-insights/brands-need-distinctive-assets) | `pruefung.eigenstaendig` |
| Tragfähigkeit | Lesbar als Profilbild in 110 px und auf der Karte in 20 mm? Einfarbig druckbar? Liegt ein Vektor vor? | Datei aus `vorab.logoAlt`, Test-Render im Team-Panel | `pruefung.tragfaehig {px110, mm20, einfarbig, vektor}` |
| Schriftzug | Hat ein Schriftzug geringen oder hohen Strichkontrast? | Sichtprüfung am Logo, Vergleich mit den zwei Proben aus P8 | `pruefung.schriftzugKontrast` (für W3) |

Urteil des Teams: "trägt", "trägt teilweise" oder "trägt nicht". Dazu markiert das Team die Elemente als Rechtecke in der Datei, damit der Makler sie auf Bildschirm 11 als echte Ausschnitte sieht, und misst den Farbwert jeder Logofarbe (für W2).

**Welche zwei Optionen der Makler sieht.**

| Urteil des Teams | Markierung auf Bildschirm 11 | Gezeigt | Empfohlen |
|---|---|---|---|
| trägt | mindestens ein Element | behalten, schärfen | behalten |
| trägt | "An nichts davon" (`bestandBehalten` leer) | schärfen, neu | schärfen, wenn `pruefung.bekanntheit` mindestens drei Jahre oder mindestens zwei Orte nennt; sonst neu (Setzung) |
| trägt teilweise | beliebig | schärfen, neu | schärfen |
| trägt nicht | beliebig | schärfen, neu | neu |

Die Optionen werden erst nach Bildschirm 11 bestimmt, weil seine Markierung sie ändert. Wer an nichts hängt, bekommt "behalten" nicht angeboten: Ein Logo unverändert zu behalten, an dem er selbst nichts festhalten will, wäre keine Entscheidung, sondern Trägheit. "Neu" steht ihm dann offen. Die Empfehlung "schärfen" bei hoher Bekanntheit folgt daraus, dass ein bekanntes Zeichen Kapital ist, auch wenn der Besitzer es nicht mehr sieht (Romaniuk, Distinctive Assets nach Bekanntheit und Eindeutigkeit, Übertragung); er entscheidet trotzdem selbst.

"Behalten" wird nur angeboten, wenn das Logo technisch trägt, weil ein Logo, das als Profilbild unlesbar ist, nicht unverändert in ein System gehen kann. Sein Wort bleibt trotzdem vollständig: Mit "schärfen" und den markierten Elementen bleibt alles, woran er hängt, erkennbar. Wählt er gegen die Empfehlung, gilt seine Wahl; die Abweichung geht als Hinweis W6 in den Workshop, ohne Überredung.

**Folgen für Wortmarke, Farbe, Zeichen und Schrift.** Das beantwortet Leitfrage 3.

| Urteil | Wortmarke (`system.wortmarke`, Schritt 10) | Farbe (`system.farbe`, Schritt 10) | Zeichen und Codes (`idee`, Schritt 9) | Schrift (`system.typo`) |
|---|---|---|---|---|
| behalten | Typ "geschärft" mit Änderungsgrad null: Reinzeichnung als SVG, Schutzraum, Mindestgröße, Varianten; keine Formänderung | Logofarben aus `vorab.logoAlt.farben` exakt übernommen in eine feste Rolle; fällt der Kontrast durch, trägt die Farbe nur Flächen, wie Schritt 10 es für einen zu hellen Akzent rechnet, und wird nie still verändert | Das Zeichen entsteht neben dem Logo, nicht darin; Codes vorrangig Porträtstil und Serienformat | Die Logoschrift bleibt im Logo, die Systemschrift muss daneben bestehen |
| schärfen | Typ "geschärft": markierte Elemente bleiben erkennbar; korrigiert werden Proportion, Laufweite, Ziffern, Strichstärken, Lesbarkeit in kleiner Größe | Markierte Farbe bleibt in ihrer Farbfamilie, Ton und Helligkeit dürfen sich für Kontrast und Druck verschieben (Spielraum in `system.spielraum`, Setzung: sichtbar dieselbe Farbe) | Das Zeichen darf aus markierten Elementen wachsen, etwa Initialen als Monogramm, wenn der Kernsatz das trägt | frei, die Wortmarke wird an die Stimme angenähert |
| neu | Typ "neu": die Wortmarke folgt aus `idee` | Nicht markierte Farben sind frei; eine markierte Farbe muss eine Rolle im System bekommen oder wird im Workshop mit ihm entschieden | frei aus dem Kernsatz; markierte Initialen oder Formen werden als Erbe geprüft | frei |
| kein Logo | Typ "neu" | frei | frei | frei |
| ausstehend | Schritt 10 blockiert Wortmarke und Akzent, arbeitet an Schrift, Zeichen und Raster weiter | Entwurf | Entwurf | frei |

`behalten` bleibt so im Vertrag von Schritt 10, der nur "neu" oder "geschärft" kennt, als Fall "geschärft" mit Änderungsgrad null.

### 3.7 Nicht ich

Der Makler nennt bis zu drei Auftritte, die er nicht sein will, aus jeder Branche, als Link, als Satz oder als Screenshot. Er begründet nichts. Bildschirm 13 bittet um keine Screenshots mit erkennbaren Privatpersonen.

**Deutung.** Eine benannte Person im Team (Rolle "Deutung", Setzung: Art Director) sieht sich jeden Eintrag an und hält genau ein Merkmal fest, formuliert als Verbot und einer Ebene zugeordnet (Bild, Typografie, Farbe, Ton, Verhalten); wenn es passt, auch einer der acht Dimensionen und dem Pol, den das Merkmal verkörpert. Beispiel: "Renderings in goldenem Abendlicht" wird Ebene Bild, Dimension Farbtemperatur, Pol a.

**Zugriff und Löschung.** Das Rohmaterial liegt im geschützten Speicher unter `marke2[mid].vorliebenRoh.nichtIch[]`. Lesen darf es nur die Person mit der Rolle Deutung; das Team-Panel zeigt es niemandem sonst, auch nicht im Makler-Überblick. Nach der Deutung wird es gelöscht, spätestens 14 Tage nach Eingang und spätestens nach dem Workshop (Setzung). Enthält ein Screenshot trotz Hinweis erkennbare Privatpersonen, deutet die Person nur, was ohne diese Personen sichtbar ist, und löscht sofort. Gespeichert bleiben nur Merkmal, Ebene, Dimension, Pol, wer gedeutet hat und wann gelöscht wurde, nie ein Name, ein Handle, eine URL oder ein Bild.

**Einwilligung und Rechtsgrundlage.** Fremde Screenshots und Links werden kurz bei UNIO gespeichert und gedeutet; sie können Daten Dritter enthalten, etwa den Namen eines anderen Maklers. Der Makler erfährt das vor dem Hochladen in einem Satz auf Bildschirm 13 ("Wir speichern Ihre Beispiele höchstens 14 Tage, lesen nur ein Merkmal heraus und löschen sie dann."). Ob seine Einwilligung dafür ausreicht oder für die Daten Dritter eine andere Grundlage nötig ist, ist vor dem Einsatz zu klären (Lücke, keine Rechtsberatung, wie Zerlegung Kapitel 7 Punkt 3). Hinweis an Schritt 1: Zweck "Beispiele fremder Auftritte kurz speichern und deuten" in `auftrag.einwilligungen` aufnehmen (5.3). Ohne "ja" zu diesem Zweck bleibt nur der Weg "Beschreiben", der nichts Fremdes speichert.

**Wirkung.** Im Workshop liest das Team die Merkmale vor ("Wir lesen darin: der Preis in Signalrot über dem Foto. Stimmt das?"). Schritt 4 nutzt `vorlieben.nichtIch` bereits als Reizbilder der Nie-Liste (04_workshop.md Zeile 197 und 389); bestätigte Merkmale werden zu `workshop.falschWaere` und fließen von dort in Markenvertrag, Gestaltungsbrief und `bild.vermeiden`. So wird Ablehnung wirksam, ohne dass ein fremder Auftritt als Vorlage in die Gestaltung gelangt.

**Claude sieht das Rohmaterial nicht.** Screenshots fremder Profile zeigen oft Dritte, und auch ein Modell übernimmt Merkmale gezeigter Beispiele (Fixierung, Jansson und Smith; Angleichung durch KI, Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290).

### 3.8 Regeln: Profil, Sicherheit, Gewichte, Rangordnung

**Profil je Dimension** (`profil.dimensionen.<dim>`).
- `wert`: "a", "b" oder "offen" (bei "Beides gleich", fehlender Wahl oder fehlendem Paarsatz).
- `sicherheit`: "hoch", "mittel" oder "offen", Regel unten.
- `strittig`: wahr, solange ein Widerspruch der Stufe "makler" oder "team" diese Dimension betrifft; `widerspruchId` nennt ihn.
- `gewicht` = Paargewicht mal Sicherheitsfaktor; bei `strittig` gilt über `hmWirksam` das Gewicht 0, bis die Klärung entschieden ist (3.10).

**Sicherheit relativ zu seinem eigenen Tempo (Setzung).** Lindgaard belegt, dass schnelle Urteile stabil sind, nicht dass langsame unsicher sind. Deshalb heißt "mittel" nur: Richtung statt Grenze, eine vorsichtige Lesart. Gemessen wird gegen den Makler selbst, nicht gegen eine feste Zahl, weil manche Menschen grundsätzlich langsamer tippen.
- m = Median von `dauerMs` über die sieben Fotopaare P1 bis P7, einschließlich "Beides gleich". Das Probepaar P0 zählt weder in m noch im Profil.
- Fotopaar: "hoch", wenn gewählt, `dauerMs` höchstens 1,5 mal m mal f(Platz) und kein Wechsel; "mittel", wenn länger oder mindestens ein Wechsel; "offen" bei "Beides gleich".
- **Einstiegseffekt.** Das erste Paar wird systematisch langsamer getippt, weil sich der Makler erst orientiert (Ableitung). Ohne Gegenmittel würde genau die Dimension auf Platz 1, in Reihenfolge A Licht mit Paargewicht 1,0, überzufällig "mittel", also Richtung statt Grenze. Zwei Gegenmittel: Erstens nimmt das Probepaar P0 die Orientierung auf. Zweitens misst der Pretest mit rotierter Reihenfolge (3.2) den Positionsfaktor f(Platz) = Median der Dauer auf diesem Platz geteilt durch den Median über alle Plätze, gerechnet über alle Dimensionen. Setzung bis zum Pretest: f = 1 für alle Plätze. Liegt f(1) im Pretest über 1,15, gilt der gemessene Wert für Platz 1; auf den anderen Plätzen gilt f nur, wenn es um mehr als 15 Prozent von 1 abweicht (Setzung). Die Dauer von P0 wird in der Link-Messung (`fragebogen.messung`, Schlüssel `vorlieben.p0`) gespeichert, damit die Wirkung der Probe auch an echten Maklern sichtbar wird.
- Schriftprobe P8: gleiche Regel mit der Schwelle 1,5 mal m mal k, weil Lesen länger dauert als Sehen. k ist der Median-Quotient P8 zu Fotopaaren aus dem Pretest; bis dahin k = 2 (Setzung).
- Haben weniger als fünf Fotopaare eine Wahl a oder b, ist m nicht belastbar; dann ist jede Wahl "mittel".
- Geprüft wird die Regel an den ersten zehn Maklern gegen die Workshop-Klärungen: Wie oft wurde eine "hoch"-Wahl im Workshop widerrufen?

**Paargewichte und Sicherheitsfaktoren (Setzung).** "Jedes Paar einzeln gewichtet" heißt: Nicht jede Dimension trägt gleich viel zur Marke einer Person bei.

| Dimension | Paargewicht | Begründung |
|---|---|---|
| Licht, Ausschnitt, Menschen in Ortsbildern | 1,0 | bestimmen die Bildwirkung am stärksten und damit den Porträtstil, den stärksten Code einer Personenmarke (Gesicht in 100 ms, Zerlegung G9) |
| Farbtemperatur, Dichte, Ordnung | 0,8 | bestimmen Grundton, Rand und Raster, begleiten aber nur |
| Material | 0,7 | hängt stark an den echten Orten des Maklers, die Schritt 11 sichtet |
| Schriftcharakter | 0,5 | die Schrift folgt zuerst der Stimme (Brumberger 2003) |

Sicherheitsfaktor: hoch 1,0, mittel 0,6, offen 0.

**Rangordnung für die Abnehmer (Ableitung aus Zerlegung G5 und R2 Kapitel 3.4).** Markenvertrag vor `richtung.tabus` vor `workshop.klaerungen` vor Stimme (nur für die Schrift) vor `vorlieben.profil` vor der internen Grammatik einer Welt. Ein Pol mit Sicherheit hoch ist eine **Grenze**: Die Gestaltung darf nicht zum Gegenpol gehen, außer mit einem Eintrag in `idee.begruendung`, dessen Quelle im Markenvertrag liegt; für den Gegenentwurf gilt die Regel G-Achse unten. Eine Grenze gilt nur für das Folgefeld aus Tabelle 3.9, nie darüber hinaus. Ein Pol mit Sicherheit mittel ist eine **Richtung**. "Offen" lässt dem Art Director freie Hand. Sind vier oder mehr Dimensionen offen, setzt die Regel `profil.unscharf`; Schritt 9 stützt sich dann ausdrücklich auf den Vertrag.

**Grenze und Gegenentwurf (Regel G-Achse).** Schritt 9 zeigt neben der Empfehlung einen Gegenentwurf, der sich auf genau einer Achse unterscheidet (09_idee.md 3.6), und Schritt 10 baut ihn in Anwendungstiefe (`system.gegenentwurf`). Für eine Grenze gilt:
1. Die **Empfehlung** hält jede Grenze. Eine Ausnahme braucht wie bisher einen Eintrag in `idee.begruendung` mit Quelle im Markenvertrag.
2. Der **Gegenentwurf** darf eine Grenze nur überschreiten, wenn alle vier Bedingungen erfüllt sind: (a) `idee.gezeigt.achse` ist genau die Achse, der die Dimension in der Achsenregel zugeordnet ist (Licht und Farbtemperatur zu `tonwert`, Ausschnitt und Mensch zu `ausschnitt`, Dichte und Ordnung zu `dichte`, Typografie zu `schriftstimme`, 09_idee.md Zeile 161); (b) die Achse wurde nach Stufe 2 der Achsenregel gewählt, also wegen eines offenen Widerspruchs aus seinem eigenen Mund, einem Eintrag in `vorlieben.widersprueche` oder einem Zitat in `workshop.zitate`, nie nach Stufe 3 oder 4; (c) `idee.begruendung` trägt unter "Achse des Gegenentwurfs" die Quelle dieses Widerspruchs und den Vermerk "überschreitet Grenze `vorlieben.profil.<dim>`"; (d) er überschreitet nur diese eine Grenze, alle anderen hält er.
3. Nie überschritten werden Grenzen, die der Makler mit seinem Wort gesetzt hat: `bestandBehalten`, entschiedene `workshop.klaerungen`, bestätigte Merkmale aus `nichtIch` in `workshop.falschWaere`, `richtung.tabus`. Das deckt sich mit Stufe 1 der Achsenregel in Schritt 9.
4. Wählt der Makler in der Rückmeldung (Schritt 15) den Gegenentwurf, ist das sein Wort zu genau dieser Dimension; es gilt ab der eingefrorenen Quelle (Schritt 16). `vorlieben.profil` bleibt als Messung unverändert und wird nicht zurückgeschrieben.

Warum so (Ableitung): Eine Grenze aus einer Bauchwahl in drei Sekunden ist stark, aber nicht stärker als sein eigener Satz, der ihr widerspricht. Der Gegenentwurf zeigt genau diesen Widerspruch in Anwendung, statt ihn abzufragen, und der Makler entscheidet ihn mit Form vor Augen. Ohne eigenen Widerspruch gibt es keinen Grund, seine klare Wahl im Reveal wieder zu öffnen.

**Abgleich mit 09_idee.md Zeile 303 (Markus).** Dort steht "Gegenentwurf auf dunklem Grund" mit der Quelle `vorlieben.profil.licht` und `workshop.zitate`, begründet mit einem offenen Widerspruch zwischen Bildpaaren und eigenem Satz, also Stufe 2. Die Licht-Grenze von Markus (Pol a, weich, hoch) wirkt nach 3.9 nur auf `bild.regeln.licht`, nicht auf den Grund. Ein dunkler Grund mit weiterhin weichem Tageslicht in den Fotos überschreitet sie also nicht und ist ohne Vermerk zulässig. Würde der Gegenentwurf auch die Fotos auf gerichtetes Licht mit harten Schatten stellen, wäre das eine Überschreitung; sie ist erlaubt, weil (a) Achse `tonwert` und (b) Stufe 2 erfüllt sind, braucht aber den Vermerk nach (c). Hinweis an 9 in 5.3.

**Ein Leseweg.** Die Abnehmer 6, 9 und 11 lesen das Profil nie direkt aus dem Store, sondern nur über `hmWirksam(mid, "vorlieben.profil.dimensionen.<dim>")` aus Schritt 4 oder über `hmVorliebenFolge(mid, dim)`, das selbst `hmWirksam` aufruft und den Folgewert aus Tabelle 3.9 liefert. So kommen Klärungen, Strittigkeit und Gewicht immer mit, und es gibt keine zweite Logik (3.10).

### 3.9 Wirkung je Dimension: welches Feld sich ändert

Jede Zeile nennt das Feld, das ein Abnehmer laut **seinem eigenen Dokument** liest, und, wo das nicht reicht, einen Hinweis an diesen Abnehmer als Abweichung (5.3). Zurückgenommen gegenüber Fassung 2: jede Wirkung auf Schritt 12 (`grammatik.textfuehrung`), weil Schritt 12 das Profil nicht liest, und jede direkte Wirkung auf `system.farbe` oder `system.raster`, weil Schritt 10 das Profil nicht liest; dort wirkt das Profil nur über Schritt 9. Zurückgenommen gegenüber Fassung 3: jede Wirkung der Farbtemperatur auf den Grund des Systems. Der Weißabgleich eines Stiegenhausfotos sagt nichts über den Papierton einer Marke, und kühle Fotografie auf warmem Grund ist ein bewusstes, klassisches Paar (Ableitung). P6 wirkt deshalb nur auf die Bildbehandlung in 11.

| Dimension | Folgewert je Pol (a / b), erzeugt von `hmVorliebenFolge` | Liest laut eigenem Dokument | Zusätzlich per Hinweis (Abweichung) | Prüffeld der Tauschprobe (E4) |
|---|---|---|---|---|
| Licht (P1) | weiches, diffuses Tageslicht, Fenster oder bedeckter Himmel / gerichtetes Licht, Schatten als Gestaltungsmittel | 11 `bild.regeln.licht` (11_bild.md Zeile 88); 9 Achse `tonwert` in der Achsenregel Stufe 3 (09_idee.md Zeile 161), Pflicht-Begründung "Licht" (Zeile 176), Weltrang (Zeile 440) | keiner | `bild.regeln.licht.wert` |
| Farbtemperatur (P6) | warmes Licht zugelassen, Weißabgleich warm / Tageslicht, kein Abendlicht, Weißabgleich neutral bis kühl | 11 `bild.regeln.licht` und `bild.regeln.farbbehandlung` (Zeile 88, 93); 9 Achse `tonwert` nur als Auswahlstufe 3 der Achsenregel, Weltrang | keiner. Keine Wirkung auf `system.farbe`, keine Pflicht-Quelle in der Begründung "Farbrolle"; die Farbrolle folgt aus Idee, Vertrag und Bestand | `bild.regeln.farbbehandlung.wert` |
| Menschen in Ortsbildern (P3) | Orts- und Detailbilder mit einem anonymen Menschen in Bewegung, nie erkennbar / Orte leer, fremde Menschen nie Motiv | 11 liest das Profil für diese Dimension (Eingangstabelle, 11_bild.md Zeile 353), nennt aber kein Zielfeld; 9 Achse `ausschnitt` (Zeile 161) | an 11: Zielfeld `bild.motive` (Rolle `ort` mit oder ohne kleine Person) und `fotobrief.pflichtMotive`. Gilt nie für sein Porträt. Sind in `antworten.grenzen` Team, Familie und erkennbare Kunden auf "nie", heißt Pol a ausschließlich anonyme Passanten; das liest 11 auch selbst aus den Grenzen | Anteil der `bild.motive` mit Rolle `ort` und Person |
| Ausschnitt (P5) | engste Einstellung darf anschneiden (Kopf und Schulter) / engste Einstellung halbnah, immer Raum um die Figur | 11 liest das Profil (Zeile 353); 6 für die Rohskizzen (06_territorien.md Zeile 462); 9 Achse `ausschnitt`, Pflicht-Begründung "Ausschnitt" | an 11: Zielfeld `bild.regeln.abstand.mass.kopfanteilMax` als Grenze der Einstellungsgrößen. Der Ausschnitt selbst folgt weiter dem Zeichen (`bild.regeln.ausschnitt`); das Profil setzt nur die Grenze | `bild.regeln.abstand.mass.kopfanteilMax` |
| Dichte (P2) | mindestens ein Drittel der Bildfläche ruhig, ein Motiv / Fläche darf gefüllt sein | 9 Achse `dichte` (Zeile 161), Weltrang, Begründung der Grammatik-Welt (09_idee.md Zeile 296 nennt `vorlieben.profil.dichte`); Schritt 10 setzt `system.raster.rand` aus der Grammatik (10_system.md 10.6) | an 11: Zielfeld `bild.regeln.abstand.mass.freiflaecheMin`. An 9: die Begründung der Grammatik-Welt nennt Dichte und Ordnung als Quelle, wenn eine von beiden hoch ist | `bild.regeln.abstand.mass.freiflaecheMin`; Rang der Welten in `hmWeltVorschlag` |
| Ordnung (P7) | Kamera axial und parallel, Dinge geordnet / Kamera leicht schräg, Dinge wie benutzt | 9 Achse `dichte`, Weltrang; Schritt 10 übernimmt Spalten und Strenge aus der Grammatik | an 11: Zielfeld `bild.regeln.haltung.kamera` (neuer Teilwert neben dem, was die Person tut) | `bild.regeln.haltung.kamera` |
| Material (P4) | Detailmotive mit gealterten Oberflächen, Orte mit Substanz / glatte, neue Oberflächen | 9 Weltrang (09_idee.md Zeile 440) | an 11: Zielfeld `bild.motive` (mindestens ein Pflicht-Detailmotiv in diesem Material) und Auswahlregel für `fotobrief.orte`. Stimmt 11 nicht bis 16.10.2026 zu, wirkt Material nur als Weltrang; das ist für die Zeit des Maklers zu wenig, dann wird P4 gar nicht produziert (3.3) | Pflicht-Detailmotiv in `bild.motive` |
| Schriftcharakter (P8) | geringer Strichkontrast / hoher Strichkontrast, innerhalb der Klasse, die die Stimme wählt | 6 `typoRichtung` (06_territorien.md Zeile 462); 9 Achse `schriftstimme` (Zeile 161), Pflicht-Begründung "Schriftrichtung" (Zeile 176); 10 über 9 (10_system.md Zeile 432) | an 9: `schriftstimme` bleibt die Klassenachse; das Profil wirkt innerhalb der gewählten Klasse auf den Kontrast des Displayschnitts und steht als Quelle in der Begründung "Schriftrichtung" | Filter `typoRichtung` im Regelpfad von 6 |

**Ergebnis der Prüfung "ein Paar ohne lesenden Abnehmer fällt weg".** Heute führen nur Licht, Farbtemperatur, Ausschnitt (über die Pflicht-Begründung in 9 und die Rohskizzen in 6) und Schriftcharakter ein Feld, das der Abnehmer schon hat. Mensch, Dichte, Ordnung und Material wirken heute nur im internen Weltrang und in Stufe 3 der Achsenregel, also in keinem Feld, das der Makler je sieht. Das ist eine schwache Wirkung und wird so benannt (Kapitel 4). Deshalb ist die Zustimmung von 11 zu den Zielfeldern Bedingung vor der Beauftragung des Shootings (3.3); ohne sie werden diese Paare gar nicht produziert. Bis zur Zustimmung prüft der Selbsttest diese Folgefelder gelb als "Folgefeld ausstehend", nie grün.

**Interne Welt-Grammatik.** Das Profil ersetzt `HM_WELT_BILDPAARE` und die zweite Tabelle `aff` in `hmPfVisuell`. Die neue Tabelle `HM_WELT_PROFIL` ordnet jeder der sechs Welten Pole zu, abgeleitet aus deren eigenen Bildregeln in `wb-markenwelten.jsx` (Ableitung, intern, nie für den Makler):

| Welt (intern) | Licht | Dichte | Mensch | Material | Ausschnitt | Temperatur | Ordnung |
|---|---|---|---|---|---|---|---|
| Weite | a | a | b | | b | | a |
| Feuilleton | | | a | a | a | | b |
| Grätzl | | b | a | | b | | b |
| Maßstab | a | a | b | b | b | b | a |
| Abendlicht | a | | a | a | | a | b |
| Kontrast | b | a | b | | a | | a |

Leere Felder heißen: die Welt legt diese Dimension nicht fest. `hmWeltVorschlag` rechnet je Welt die Summe der wirksamen Gewichte übereinstimmender Pole minus 0,6 mal die Summe der Gewichte gegenläufiger Pole (Setzung) und liefert Schritt 9 nur eine Rangfolge als Hinweis neben Kernsatz und Zeichenidee.

**Kohortenprüfung des Profils (Regel, sofort nach dem Profil).** Acht Wahlen ergeben höchstens 256 Kombinationen, bei ähnlichen Maklern im selben Gebiet ist eine Übereinstimmung wahrscheinlich (Ableitung). Die Regel vergleicht das Profil mit allen UNIO-Maklern mit demselben Satz, deren Kerngebiet sich mit seinem überschneidet: Die Bezirke mit Rang 1 bis 3 in `vorab.fakten.bezirke` haben mindestens einen gemeinsamen Bezirk. So fallen Nachbarn mit überlappendem Gebiet, etwa ein Makler mit Währing auf Rang 1 und Döbling auf Rang 2, nicht durch das Raster. Ist der gemeinsame Bezirk bei beiden auf Rang 1, heißt der Treffer "Kern", sonst "Rand"; beide lösen dieselbe Warnung aus, `treffer[].ueberlappung` nennt die gemeinsamen Bezirke. Warnung, wenn ein anderer Makler in mindestens fünf Dimensionen denselben Pol mit Sicherheit hoch hat und in keiner Dimension den Gegenpol mit Sicherheit hoch (Setzung). Ergebnis in `profil.kohorte {geprueftAm, vergleiche, warnung, treffer[] {mid, gleicheHoch}}`, nur intern. Folge: Schritt 6 nimmt die Warnung in `territorien.kritik` (Unterscheidbarkeit samt Kohorte) auf, und Schritt 9 darf für diesen Makler nicht dieselbe Grammatik-Welt wählen wie der Treffer, ohne in `idee.begruendung` zu sagen, was die beiden trotzdem unterscheidet. Das Profil trägt nie allein eine Unterscheidung; die tragen Kernsatz, Zeichen und Porträtstil.

### 3.10 Widersprüche und Klärungen

**Ein Mechanismus.** Jeder Widerspruch bekommt eine `id`. Geht er an den Workshop, legt Schritt 4 eine Klärung an, deren `ref` diese `id` enthält und deren `wirktAuf` gleich dem `wirktAuf` des Widerspruchs ist, etwa `vorlieben.profil.dimensionen.farbtemperatur`. Die zwei Optionen des Widerspruchs tragen je ein `setzt`, also den wirksamen Wert der Dimension nach der Entscheidung. `hmWirksam(mid, pfad)` aus Schritt 4 liefert dann für diesen Pfad:
- ohne Klärung oder mit offener Klärung: den Profilwert mit `strittig` wahr und Gewicht 0;
- nach der Entscheidung: `setzt` der gewählten Option, gefunden über `klaerungen[].ref`, mit `strittig` falsch, neu gerechnetem Gewicht und der Quelle "Workshop, Klärung Kx".

Schritt 3 schreibt keine eigene Leselogik für Klärungen, und 6, 9 und 11 lesen `workshop.klaerungen` nicht direkt. Bleibt ein Widerspruch nach dem Workshop ohne Klärung, bleibt die Dimension strittig mit Gewicht 0 und wirkt damit wie "offen".

**Wer entscheidet** (Regel aus 04_workshop.md Zeile 219). Betrifft der Widerspruch eine Grenze, die er mit seinem Wort gesetzt hat, also Nicht ich, entscheidet der Makler (`stufe: "makler"`). Beim Bestand gibt es seit Fassung 4 keinen Makler-Widerspruch mehr: Eine behaltene Farbe neben kühlen Bildern ist kein Konflikt (W2, Hinweis), und der Schriftzug gegen die Systemschrift ist Gestaltung (W3, Team). Betrifft er Gestaltung, entscheidet das Team im Workshop-Nachgang und schreibt die Entscheidung in `klaerungen` mit `entschiedenVon: "team"` (`stufe: "team"`); der Makler sieht sie mit Freigabe 1 im Markenvertrag. `stufe: "hinweis"` erzeugt keine Klärung.

**Regeln.**

| Regel | Bedingung | Stufe | wirktAuf | Zwei Möglichkeiten, Empfehlung zuerst |
|---|---|---|---|---|
| W1 | entfällt. In Fassung 2 schlug die Regel an, wenn er Menschen in Ortsbildern wählte und Familie oder Kunden auf "nie" standen. Pol a zeigt aber anonyme Passanten, das berührt keine dieser Grenzen. Die Grenze selbst liest Schritt 11 aus `antworten.grenzen`, und der Folgewert in 3.9 beschränkt Pol a auf anonyme Menschen. | | | |
| W2 Farbtemperatur neben Bestandsfarbe | Farbtemperatur mit Sicherheit hoch; eine Farbe steht in `bestandBehalten`; ihr gemessener Farbton liegt im Gegenpol (warm: 0 bis 60 oder 300 bis 360 Grad bei Sättigung über 25 Prozent; kühl: 170 bis 260 Grad; Setzung) | hinweis | | an Schritt 9: Die Farbe bleibt, die Bilder behalten ihre Behandlung. Die Begründung "Farbrolle" darf den Abstand zwischen warmer Bestandsfarbe und kühlen Bildern als bewusstes Paar benennen. Kein Widerspruch, keine Klärung: Seit Fassung 4 wirkt P6 nur auf die Bildbehandlung, beides kann nebeneinander bestehen, und nichts verschwindet |
| W3 Schriftcharakter gegen Schriftzug | Schriftcharakter hoch oder mittel; `pruefung.schriftzugKontrast` liegt im Gegenpol; der Schriftzug steht in `bestandBehalten` oder das Urteil ist "behalten" | team | `vorlieben.profil.dimensionen.typografie` | a) "Der Schriftzug bleibt im Logo erkennbar; die Systemschrift folgt Stimme und Profil und muss daneben bestehen." `setzt {wert: gewählt, sicherheit: wie gemessen}`. b) "Die Systemschrift nimmt den Kontrast des Schriftzugs auf." `setzt {wert: offen}`. Keine Frage an den Makler: Schriftwahl ist Gestaltung. Dass der Schriftzug erkennbar bleiben muss, hat er mit der Markierung schon gesagt. |
| W4 Ausschnitt gegen Material | Ausschnitt ist a, und `vorab.material` meldet weniger als acht geeignete Gesichtsbilder (Setzung wie `bild.portraetTermin`) | hinweis | | an Schritt 4: im Probedreh auch einen nahen Ausschnitt filmen; die Entscheidung über einen Porträt-Termin trifft Schritt 11 |
| W5 Vorliebe gegen Nicht ich | ein gedeutetes Merkmal in `nichtIch` trägt dieselbe Dimension und denselben Pol wie seine Wahl, Sicherheit hoch oder mittel | makler | `vorlieben.profil.dimensionen.<dim>` | Bei Sicherheit hoch: a) "Ihre Wahl bleibt. Ausgeschlossen wird nur [Merkmal], etwa der Filter oder die Inszenierung." `setzt {wert: gewählt, sicherheit: hoch}`; b) "Diese Richtung bleibt offen, das Team entscheidet am Kernsatz." `setzt {wert: offen}`. Bei Sicherheit mittel stehen dieselben zwei Möglichkeiten in umgekehrter Reihenfolge, b ist dann die Empfehlung. Begründung der Empfehlung aus der gemessenen Sicherheit, in einem Satz. |
| W6 Wahl gegen Empfehlung | `bestandUrteil.abweichend` ist wahr | hinweis | | an Schritt 4, Teil Karte: Widerspruch Bestand gegen Wunschlage prüfen (04_workshop.md Zeile 377); keine Frage, keine Überredung |
| W7 | entfällt. "Profil unscharf" steht schon als `profil.unscharf` im Profil, das Schritt 9 liest; ein eigener Widerspruch wäre doppelt. | | | |

**Rangfolge und Obergrenze (Setzung).** Schritt 4 legt höchstens drei Klärungen dem Makler vor (04_workshop.md Zeile 107 und 219), und aus dem Fragebogen kommen eigene, etwa K1 zu Familie und Herkunft bei Markus. Deshalb gibt Schritt 3 höchstens **zwei** Widersprüche der Stufe "makler" weiter. Seit W2 ein Hinweis ist, kann nur noch W5 diese Stufe tragen. Reihenfolge:
1. Mehrere W5 nach wirksamem Gewicht der Dimension (Paargewicht mal Sicherheitsfaktor), bei Gleichstand nach der Reihenfolge A der Paare.
2. Was über der Obergrenze liegt, wechselt auf Stufe "team" mit vorausgewählter Empfehlung und `ueberObergrenze: true`; der Makler sieht die Entscheidung mit Freigabe 1 im Markenvertrag und kann dort widersprechen.

Jeder Widerspruch trägt `rang`; reicht in Schritt 4 auch die Obergrenze von drei nicht, entscheidet Schritt 4 nach seiner eigenen Reihenfolge und behandelt den Rest genauso. Im Workshop wird nur geklärt, was sich widerspricht. Die Bauchwahl selbst wird nie nachträglich begründet (Wilson und Schooler 1991).

### 3.11 Wer macht was

| Wer | Was | Wann | Zeit |
|---|---|---|---|
| Makler | acht Paare, Elemente antippen, eine Entscheidung, optional Nicht ich | im Link aus Schritt 2, nach dem Pflichtteil, auch in einer späteren Sitzung | etwa vier Minuten (Setzung) |
| Team, einmalig | Angebote und Zustimmung von 11 einholen (16.10.2026), Paarsatz im zugestimmten Umfang produzieren, angleichen, Pretest mit mindestens 30 Personen | bis 13.11.2026 (3.3) | ein Shooting-Tag, ein Tag Auswahl, ein Tag Pretest samt Auswertung (Setzung) |
| Team, je Makler | Bestandsprüfung und Elemente markieren, Farbwerte messen | vor der Freigabe der Bildschirme 11 und 12 | 15 Minuten (Setzung) |
| Team (Rolle Deutung), je Makler | Nicht ich deuten, Rohmaterial löschen | bis zum Workshop | 5 Minuten je Eintrag (Setzung) |
| Team, je Makler | Widersprüche und Kohortenwarnung sichten | vor dem Workshop | 5 Minuten (Setzung) |
| Regeln | Seitenzufall, Zeitmessung, Profil, Sicherheit, Gewichte, Folgewerte, Kohortenprüfung, Optionen und Empfehlungstext aus den Prüfpunkten, Widersprüche mit Rang, Prüfungen | sofort | keine |
| Claude | nichts | | |

**Warum Claude hier nichts tut (Ableitung).** Geschmack messen ist Zählen und Vergleichen, das leisten Regeln exakt und nachvollziehbar. Eine KI-Deutung der Wahl würde genau die verbale Begründung nachliefern, die der Schritt vermeidet, und Mustersätze riskieren. Die Empfehlung auf Bildschirm 12 bauen Regeln aus den Prüfpunkten mit echten Werten (Jahre, Pixel, Farbwert); das Team redigiert sie. Die Bilderkennung des alten Logos (Farben, Schriftvermutung, Elemente) liegt in Schritt 1.

### 3.12 Beispiel Markus Leitner (Döbling, Zinshaus, Figur Kenner, Sie-Form)

**Was der Seed hergibt (belegt, `wb-store.jsx` Zeile 67 und 72).** Region 1190 Döbling, Bezirke Döbling, Währing, Hietzing, Grätzl "Sievering, zwischen Sieveringer Straße und Agnesgasse", Objekte Zinshaus, Anlegerwohnung, Eigentumswohnung Altbau, Denkmalschutz und Sanierung. Figur Kenner (nur internes Sprachbild), Anrede "Sie, überall". Bestand v1: `bestand: ["Logo", "Website", "LinkedIn", "Instagram"]`, `behalten: "Behalten und schärfen"`, `assets: ["Eine Farbe", "Ein Satz"]`. Eine Logodatei liegt im Seed nicht vor.

**Grenzen, wörtlich aus dem Seed.** v1 hatte zwei getrennte Fragen. `tabus: ["Politik", "Familie zeigen"]` zur Frage "Und was würdest du nie zeigen oder sagen?" (Optionen `HM_TABUS`, `wb-data.jsx` Zeile 99 und 169). `privat: ["Wohnort und Grätzl", "Meinung zum Markt", "Fehler und Learnings"]` zur Frage "Was darf öffentlich sichtbar sein?" mit acht Optionen (`HM_PRIVAT`, `wb-data.jsx` Zeile 103 und 168). **Ableitung für v2:** Schritt 2 legt beide Fragen zu `antworten.grenzen` mit "zeigen" oder "nie" je Thema zusammen (02_fragebogen.md Zeile 378). Liest man die Positivliste streng, stünden bei Markus fünf Themen auf "nie": Sport und Hobby, Familie, Politik und Gesellschaft, Team und Büro, Humor; Politik und Familie sind zusätzlich über `tabus` ausdrücklich ausgeschlossen. Ob "nicht gewählt" in v2 wirklich "nie" heißt, bestätigt er im Fragebogen; für diesen Schritt ist das ohne Folge, weil keine Regel mehr an diesen Grenzen hängt (W1 entfällt) und der Folgewert von P3 nur bei Pol a auf die Grenzen schaut.

**Paare.** Annahme: Die Zustimmung von 11 liegt vor, der volle Satz mit acht Paaren läuft, Reihenfolge A, f = 1. Die v1-Wortpaare decken nur vier der acht Dimensionen ab, und das unscharf. Deshalb ist jede Zeile gekennzeichnet. Das Probepaar P0 braucht 11 s (Annahme) und zählt nicht; ohne P0 wäre das Orientieren in P1 gelandet. Median m der Fotopaare: Dauer 3, 2, 4, 5, 3, 9, 7 Sekunden, sortiert 2, 3, 3, 4, 5, 7, 9, also m = 4 s; Schwelle für hoch 6 s, für P8 mit k = 2 12 s.

| Paar | Wahl im Beispiel | Herkunft im Beispiel | Zeit, Wechsel (Annahme) | Profil |
|---|---|---|---|---|
| P1 Licht | a, weich | Annahme | 3 s, keiner | a, hoch, Gewicht 1,0 |
| P3 Menschen | b, ohne | Übertragung aus bp6 b "Räume ohne Menschen" | 2 s, keiner | b, hoch, 1,0 |
| P6 Farbtemperatur | b, kühl | Übertragung aus bp5 b "Kühles Tageslicht"; bp5 vermischte Licht und Temperatur, genau der Fehler, den v2 behebt | 4 s, keiner | b, hoch, 0,8 |
| P2 Dichte | a, viel Raum | Annahme | 5 s, keiner | a, hoch, 0,8 |
| P4 Material | a, gealtert | Übertragung aus bp1 a "Altbau-Stiege" | 3 s, keiner | a, hoch, 0,7 |
| P5 Ausschnitt | Beides gleich | Annahme | 9 s | offen, 0 |
| P7 Ordnung | a, streng | Annahme | 7 s, keiner | a, mittel (über 6 s), 0,48 |
| P8 Schriftcharakter | a, geringer Kontrast | Annahme; bp4 b "Klare Typografie" stand gegen Handschrift und sagt über Kontrast nichts | 8 s, einmal gewechselt | a, mittel (Wechsel), 0,3 |

Eine Dimension ist offen, `profil.unscharf` ist falsch.

**Was die Abnehmer daraus bekommen** (Folgewerte nach 3.9, Ableitung).

| Folgefeld | Wert für Markus | Verhältnis zu den Nachbar-Dokumenten |
|---|---|---|
| 11 `bild.regeln.licht` | weiches Tageslicht, Fenster oder bedeckter Himmel, kein Abendlicht; Grenze | deckt sich mit dem Beispiel in 11_bild.md Zeile 177 (Tageslicht, bedeckter Himmel, Vormittag, nie Abendstimmung) |
| 11 `bild.regeln.farbbehandlung` | neutral bis kühl; Grenze | deckt sich mit 11 |
| `system.farbe.grund` (Schritt 10) | keine Folge aus dem Profil; der Grund folgt aus Idee und Vertrag | der Arbeitswert für `grund` in 10_system.md 10.5 (OKLCH 0,960 0,010 85) ist von P6 unberührt; ein wärmerer Papierton neben kühlen Fotos wäre ebenso zulässig |
| 11 `bild.motive` (Hinweis) | Orte ohne fremde Menschen; sein Porträt ist davon unberührt | |
| 11 `bild.regeln.abstand.mass.freiflaecheMin` (Hinweis); 9 Grammatik | mindestens ein Drittel ruhige Fläche; Dichte spricht in `HM_WELT_PROFIL` für Weite und Maßstab | 09_idee.md Zeile 296 wählt Weite mit Quelle `vorlieben.profil.dichte`. 10_system.md 3.6 rechnet dagegen mit der Grammatik Feuilleton; das ist ein offener Punkt zwischen 9 und 10, nicht aus diesem Schritt (8, offene Punkte) |
| 11 `bild.motive` und `fotobrief.orte` (Hinweis) | ein Pflicht-Detailmotiv mit gealtertem Material, etwa Stufe, Geländer oder Holz in einem Stiegenhaus in Sievering | |
| 11 `bild.regeln.abstand.mass.kopfanteilMax` | offen; der Ausschnitt folgt allein dem Zeichen | |
| 11 `bild.regeln.haltung.kamera` (Hinweis) | axial bevorzugt, Richtung, keine Grenze | |
| 6 `typoRichtung`, 9 "Schriftrichtung" | geringer bis mäßiger Kontrast, Richtung, keine Grenze | verträgt sich mit der Serif-Empfehlung in 10_system.md 10.2, solange deren Displayschnitt keinen hohen Kontrast hat; sonst gilt die Stimme (Rangordnung) mit Begründung |

Eine eigene Verbindung liegt zwischen gealterter Altbau-Substanz und nüchternem, kühlem Licht. Ob daraus eine Idee wird, entscheidet Schritt 9 am Kernsatz, nicht dieses Profil.

**Kohortenprüfung.** Kerngebiet von Markus: Döbling, Währing, Hietzing (`wb-store.jsx` Zeile 72). Elif Demir: Favoriten, Meidling, Liesing (Zeile 73), keine Überschneidung. Sara Novak hat im Seed nur die Region 1070 Neubau und keine Bezirksliste (Zeile 66), keine Überschneidung. Keine Warnung. Ein künftiger Makler mit Währing auf Rang 1 würde als Treffer "Rand" geprüft.

**Bestand.** Ausgangslage "Logo vorhanden, Datei fehlt": Der Bestand v1 nennt ein Logo, `vorab.logoAlt` ist eine Lücke. Welche Farbe, welche Form und welche Schrift das alte Logo hat, ist unbekannt, und diese Fassung legt keine an. Das deckt sich mit Schritt 10, der dieselbe Frage offen führt ("ob Amber im alten Logo steht oder nur aus dem v1-Vorschlag kommt, ist offen", 10_system.md 3.6). Zusätzlicher Grund zur Vorsicht (Ableitung): Die UNIO-Signalfarbe ist selbst ein Amber (`tokens/colors.css`, `--signal: #FFAA09`), und der Seed-Satz "Der Amber-Ton darf etwas zurückhaltender sein" antwortet auf einen Farbvorschlag des Teams (`wb-store.jsx` Zeile 102 und 103), nicht auf sein Logo. Für Markus gibt es darum bis zur Datei **keine Bestandsfarbe**.

Folgen im Beispiel:
- Der Link läuft mit Paaren und Nicht ich. Bildschirm 1 sagt "Zwei kurze Teile." Das Team fordert die Logodatei an; Bildschirme 11 und 12 kommen im selben Link nach, sobald Datei und Prüfung da sind, als einziger Nachtrag (3.3). Ist die Datei sieben Werktage vor dem Workshop nicht da, fällt die Entscheidung am Tisch im Workshop.
- `bestandUrteil {wert: null, quelle: "ausstehend"}`, `bestandBehalten: []`. Schritt 10 steht auf "blockiert: Bestandslogo fehlt", wie in 10_system.md 10.0 beschrieben.
- Die v1-Hinweise "Behalten und schärfen" und "Eine Farbe" nutzt das Team nur zur Vorbereitung der Prüfung, nie als Entscheidung.

**Bildschirme 11 und 12 für Markus, sobald die Datei da ist.** Maße für das Telefon 375 x 812 mit Sicherheitszonen, Seitenrand 16 px, Inhaltsbreite 343 px (Setzung nach 3.5). Was in eckigen Klammern steht, ist heute eine Lücke und kommt aus Datei, Prüfung und Markierung; nichts davon wird vorab gefüllt.

Bildschirm 11, von oben nach unten:
| Zone | Höhe | Inhalt |
|---|---|---|
| Kopfzeile | 44 px | Zurück-Symbol links, sonst leer |
| Überschrift | 2 Zeilen, `--size-h2` | "Ihr Logo heute." |
| Anwendung, Reihe 1 | 110 px | der Profilbild-Kreis mit 110 px Durchmesser aus dem echten Instagram-Screenshot in `vorab.auftrittHeute`, links bündig; die Visitenkarte ist mit 321 px zu breit für einen Platz daneben und steht deshalb in Reihe 2 |
| Anwendung, Reihe 2 | 208 px | Visitenkarte 85 x 55 mm als 321 x 208 px, darauf [Logo] in 20 mm Breite gleich 76 px an der Stelle, an der es heute auf seiner Karte steht, oder, ohne Kartenfoto, links oben mit 5 mm Rand; kein Schatten, Rand 1 px `--hairline-dark` |
| Anwendung, Reihe 3 | 343 px breit, Höhe nach Screenshot, höchstens 400 px | der echte Screenshot seines Profils oder seiner Website mit [Logo] in der Größe, in der es dort steht |
| Frage | 1 bis 2 Zeilen, 18 px | "Woran hängen Sie? Tippen Sie an, was bleiben soll." |
| Elemente | Kacheln 96 x 96 px, drei je Reihe, 27 px Abstand | [Ausschnitt Farbe], [Ausschnitt Initialen], [Ausschnitt Form oder Schriftzug], je nachdem, was die Prüfung markiert hat; darunter 15 px die Bezeichnung; als letzte Kachel "An nichts davon" auf `--paper-2` ohne Bild |
| Aktion | 44 px | "Weiter", erst aktiv nach mindestens einer Markierung oder "An nichts davon" |

Gescrollt wird nur hier, einmal, von der Anwendung zu den Elementen; die Frage steht direkt über den Kacheln, damit Blick und Daumen nicht springen.

Bildschirm 12 bei Urteil "trägt teilweise" (gezeigt: schärfen, neu; empfohlen: schärfen):
| Zone | Höhe | Inhalt |
|---|---|---|
| Überschrift | 2 Zeilen | "Wie geht es mit Ihrem Logo weiter?" |
| Block 1, Empfehlung | etwa 190 px, Rand 2 px `--ink`, Innenabstand 20 px | links 64 x 64 px der Ausschnitt [markiertes Element]; rechts Titel "Weiterentwickeln" 18 px, darunter der Text unten; unter dem Text, abgesetzt durch 12 px, die Begründung |
| Abstand | 16 px | |
| Block 2 | etwa 150 px, Rand 1 px `--hairline-dark` | Titel "Neu beginnen", Text unten, ohne Begründung |
| Aktion | 44 px, `.hm-btn` | "Festhalten", erst aktiv nach der Wahl |

Texte (Vorlage mit Lücken, die Regeln füllen sie aus Prüfung und Markierung):
- **Weiterentwickeln.** "[Markierte Elemente] bleiben erkennbar. Wir korrigieren, was im Profilbild nicht mehr trägt." Darunter: "Das empfehlen wir, weil Ihr Logo seit [Jahre aus `pruefung.bekanntheit`] auf [Orte] steht. Im Profilbild in 110 Pixeln [Befund aus `pruefung.tragfaehig`], das beheben wir."
- **Neu beginnen.** "Wir entwickeln ein neues Zeichen aus Ihrer Positionierung. [Markierte Elemente] prüfen wir als Erbe, nichts davon fällt ohne Ihr Wort weg."

**Widersprüche.**
- W2 ist für Markus **nicht auslösbar**, solange keine Bestandsfarbe gemessen ist; ausdrücklich so vermerkt. Rechnung für später: Ist die Farbe warm (Schritte 9 und 10 nehmen bisher Amber an, 09_idee.md Zeile 297, 10_system.md Zeile 328) und markiert er sie, entsteht nur der Hinweis W2 an Schritt 9: warme Farbe als begleitende Fläche, kühle Bilder, beides bleibt. Das entspricht der Rolle, die Schritt 10 dem Amber schon gibt. Keine Klärung, keine Frage an ihn.
- W3 nicht auslösbar, `pruefung.schriftzugKontrast` fehlt.
- W4 schlägt nicht an, der Ausschnitt ist offen.
- W5 schlägt nicht an. Annahme: Er nennt unter Nicht ich einen Bauträger-Auftritt. Das Team deutet "Renderings in goldenem Abendlicht", Ebene Bild, Dimension Farbtemperatur, Pol a. Seine Wahl ist Pol b, beides zeigt in dieselbe Richtung. Das Merkmal geht als Reizbild in die Nie-Liste von Schritt 4.
- Ergebnis: Schritt 3 schickt für Markus keine Klärung an den Workshop. Die drei Plätze in Schritt 4 bleiben für K1 (Familie und Herkunft) und Weiteres frei.

**Bildschirm 14 für Markus.** "Fertig. Ihre Bildwahl geht als Richtung an das Team. Ihr Logo fehlt uns noch als Datei; sobald es da ist, zeigen wir es Ihnen hier mit einer einzigen Nachricht, das dauert eine Minute. Ihr Beispiel lesen wir im Workshop gemeinsam, als ein Merkmal, nicht als Name. Als Nächstes: der Workshop am [Datum aus `auftrag.termine`]."

---

## 4. Fragen an den Makler

Nur Fragen, deren Antwort den Output verändert. Probe je Frage: Antwort tauschen und das Folgefeld vergleichen (E4).

| Nr. | Was er sieht und tut | Zielfeld | Warum, und was eine andere Antwort ändert |
|---|---|---|---|
| F1 | Paar Licht | `profil.dimensionen.licht` | ändert `bild.regeln.licht` in 11 zwischen weichem Tageslicht und gerichtetem Licht mit Schatten, dazu Achse und Begründung "Licht" in 9 |
| F2 | Paar Menschen in Ortsbildern | `profil.dimensionen.mensch` | mit Zustimmung von 11: ändert `bild.motive`, ob Ortsbilder anonyme Menschen zeigen oder leer sind. **Heute schwach:** nur Stufe 3 der Achsenregel in 9. Ohne Zustimmung bis 16.10.2026 wird das Paar nicht produziert (3.3) |
| F3 | Paar Farbtemperatur | `profil.dimensionen.farbtemperatur` | ändert `bild.regeln.farbbehandlung` und `licht` in 11; nie den Grund in 10. Kann den Hinweis W2 auslösen |
| F4 | Paar Dichte | `profil.dimensionen.dichte` | mit Zustimmung von 11: ändert `freiflaecheMin` in `bild.regeln.abstand`. **Heute schwach:** nur interner Weltrang und Stufe 3 der Achsenregel in 9, kein Feld, das der Makler je sieht. Ohne Zustimmung nicht produziert |
| F5 | Paar Material | `profil.dimensionen.material` | mit Zustimmung von 11: ändert das Pflicht-Detailmotiv in `bild.motive` und die Ortsauswahl im Fotobrief. **Heute schwach:** nur Weltrang in 9. Ohne Zustimmung nicht produziert |
| F6 | Paar Ausschnitt | `profil.dimensionen.ausschnitt` | ändert heute die Pflicht-Begründung "Ausschnitt" in 9, die Rohskizzen in 6 und die Achse in 9; mit Zustimmung von 11 zusätzlich die Grenze `kopfanteilMax`. Kann W4 auslösen |
| F7 | Paar Ordnung | `profil.dimensionen.ordnung` | mit Zustimmung von 11: ändert `bild.regeln.haltung.kamera`. **Heute schwach:** nur Weltrang und Stufe 3 der Achsenregel in 9. Ohne Zustimmung nicht produziert |
| F8 | Schriftprobe | `profil.dimensionen.typografie` | ändert den Filter `typoRichtung` in 6 und die Begründung "Schriftrichtung" in 9, innerhalb der Klasse, die die Stimme wählt; kann W3 auslösen |
| F9 | Elemente des alten Logos antippen | `bestandBehalten[]` | ein angetipptes Element muss im System wiederzufinden sein oder wird im Workshop mit ihm entschieden; ein nicht angetipptes ist frei |
| F10 | Eine Entscheidung zwischen zwei Optionen | `bestandUrteil.wert` | ändert `system.wortmarke.typ` und ob Logofarben exakt, in der Familie oder gar nicht übernommen werden (Tabelle 3.6) |
| F11 | Optional: bis zu drei Auftritte, die er nicht sein will, als Link, Satz oder Screenshot | `nichtIch[]` | nach Deutung und Bestätigung im Workshop wird jedes Merkmal ein Eintrag in `workshop.falschWaere` und damit ein Verbot im Gestaltungsbrief und in `bild.vermeiden`; kann W5 auslösen |

Höchstens eine Entscheidung zwischen zwei Optionen (F10), mit markierter und begründeter Empfehlung. F1 bis F8 sind Wahrnehmungsproben, keine Entscheidungen über die Marke. Das Probepaar P0 ist keine Frage: Es hat kein Zielfeld und dient nur dazu, dass F1 nicht die Orientierung misst. Es kostet rund drei bis zehn Sekunden (Annahme, gemessen in `fragebogen.messung` unter dem Schlüssel `vorlieben.p0`). **Ehrliche Bilanz heute:** Stark wirken F1, F3, F6, F8 bis F11. F2, F4, F5 und F7 wirken erst mit der Zustimmung von 11; kommt sie nicht, fragen wir sie nicht (3.3). F9 ist eine Markierung ohne Optionskatalog. Die Klärungen aus 3.10 fragt Schritt 4, nicht dieser Schritt.

**Aus vorhandenen Daten abgeleitet statt gefragt.**

| Wert | Quelle |
|---|---|
| ob es ein altes Logo gibt, seine Datei, Farben, Schriftvermutung, Elemente | `vorab.logoAlt` (Schritt 1) |
| wo das Logo heute arbeitet | `vorab.auftrittHeute`, `vorab.material` (Schritt 1) |
| ob das Logo trägt, welchen Strichkontrast der Schriftzug hat, welche zwei Optionen er sieht | Bestandsprüfung des Teams |
| welche Menschen in Ortsbildern überhaupt möglich sind | `antworten.grenzen` (Schritt 2) |
| wie viele geeignete Porträts es gibt | `vorab.material` (Schritt 1) |
| wie sicher eine Wahl ist | Zeit ab Sichtbarkeit relativ zu seinem Median und Wechsel, gemessen statt gefragt |
| wie lange das Kapitel dauert, wann der Workshop ist | `auftrag.dauer`, `auftrag.termine` (Schritt 1) |

**Entfällt aus v1.** `bildpaare` in der alten Form, `behalten` als blinde Auswahlfrage, `bestand` (liegt in `vorab`), `vorbilder` (positive Referenz, ersetzt durch `nichtIch`). `assets` ("Was könnte dein wiedererkennbares Zeichen werden?") entfällt ebenfalls, wie Schritt 2 es schon führt (02_fragebogen.md Zeile 532): Das Zeichen folgt in Schritt 9 aus dem Kernsatz, und die häufige Antwort "Eine Farbe" widerspricht G9, nach dem Farbe nie allein ein Code ist.

---

## 5. Eingang und Ausgang

### 5.1 Eingang

| Von | Feld | Wofür hier | Vertrag |
|---|---|---|---|
| 1 | `vorab.logoAlt` | Datei für Bildschirm 11, Farben für W2, Schriftvermutung als Vorbereitung für `schriftzugKontrast`, Elemente für F9; Ausgangslage "Datei fehlt" | laut Vertrag |
| 1 | `vorab.auftrittHeute` | das Logo in echter Anwendung zeigen; Bekanntheit in der Bestandsprüfung | laut Vertrag |
| 1 | `vorab.material` | Bekanntheit und Tragfähigkeit; Porträt-Bestand für W4 | laut Vertrag |
| 2 | `antworten.grenzen` | Folgewert von P3 Pol a (nur anonyme Menschen) | laut Vertrag |
| 2 | `antworten.seite` | entfällt | Abweichung 2 |
| 2 | `antworten.grenzenFrei` | nur vom Team gelesen, bevor Widersprüche in den Workshop gehen | Abweichung 2 |
| 1 | `auftrag.dauer`, `auftrag.termine` | ehrliche Minuten auf Bildschirm 1, Workshop-Datum auf Bildschirm 14 | Abweichung 3 |
| 1 | `vorab.fakten.bezirke` | Bezirke mit Rang 1 bis 3 für die Kohortenprüfung | Abweichung 3 |
| 1 | `auftrag.einwilligungen` | Zweck "Beispiele fremder Auftritte kurz speichern und deuten"; ohne "ja" nur der Weg "Beschreiben" auf Bildschirm 13 | Abweichung 3, Hinweis 13 |
| Extern | `vorlieben.profil` der anderen UNIO-Makler im Store | Kohortenprüfung, wie Schritt 6 und 14 die Kohorte lesen | Abweichung 11 |

### 5.2 Ausgang

| Feld | Inhalt | Abnehmer |
|---|---|---|
| `vorlieben.paarStatus` | "vollständig", "ohne Paarsatz" oder "übersprungen" | 9: bei "ohne Paarsatz" oder "übersprungen" schreibt 9 in `idee.begruendung` bei Licht und Ausschnitt die Quelle "ohne Paarsatz, aus dem Vertrag" statt eines Profilpfads; 11: setzt `bild.regeln.licht` und `farbbehandlung` dann aus Idee und Brief und vermerkt den Grund (Hinweise 8 und 9 in 5.3; bis zur Zustimmung gelb im Selbsttest, Punkt 17) |
| `vorlieben.bildpaare[8]` | `{paarId, dimension, wahl a, b oder egal, seiteA, position, reihenfolge, dauerMs, wechsel, satz, datum}`; leer bei `paarStatus` ungleich "vollständig"; das Probepaar P0 ist nicht enthalten | 11 (11_bild.md Zeile 353) |
| `vorlieben.profil` | `{satz, stand, unscharf, medianMs, kohorte, dimensionen}`, `kohorte.treffer[]` mit `ueberlappung` und `lage` Kern oder Rand; je Dimension `{wert, pol, sicherheit, gewicht, strittig, widerspruchId}`; gelesen nur über `hmWirksam` und `hmVorliebenFolge` | 6 (06_territorien.md Zeile 462), 9 (09_idee.md Zeile 161, 296, 348, 440), 11 (11_bild.md Zeile 88, 93, 353) |
| `vorlieben.nichtIch[]` | bis zu drei `{nr, merkmal als Verbot, ebene, dimension, pol, deutungVon, datum, rohGeloeschtAm}`; kein Name, kein Handle, keine URL, kein Bild | 4 (04_workshop.md Zeile 90, 197, 389) |
| `vorlieben.bestandUrteil` | `{wert, gezeigt[2], empfehlung, empfehlungGrund, abweichend, pruefung, quelle makler, kein Logo oder ausstehend, datum}` | 4, 6, 9, 10 |
| `vorlieben.bestandBehalten[]` | `{element, art farbe, initialen, form oder schriftzug, wert, ausschnitt, quelle}` | 6 (06_territorien.md Zeile 479), 9, 10 |
| `vorlieben.widersprueche[]` | `{id, regel, dimension, stufe, rang, ueberObergrenze, wirktAuf, vorliebe, gegen {feld, wert}, optionen[2] {text, setzt}, empfehlung, empfehlungGrund, frageWorkshop, an}` | 4 (04_workshop.md Zeile 85, 376), 9 (09_idee.md Zeile 160, 359) |

Vorgänger 1, 2; Nachfolger 4, 6, 9, 10, 11. Die Nachfolgerliste entspricht dem Vertrag, die Listen sind symmetrisch. Jedes Ausgangsfeld hat einen Abnehmer; bei `paarStatus` liest ihn der Abnehmer erst nach Annahme der Hinweise 8 und 9 (5.3), bei allen anderen Feldern steht das Lesen schon im eigenen Dokument des Abnehmers. Bis zur Annahme führt der Selbsttest `paarStatus` gelb, nicht grün.

### 5.3 Abweichungen vom Vertrag und Hinweise an Nachbarn, begründet

1. **Erledigt: `nichtIch` hat einen Abnehmer.** Schritt 4 liest `vorlieben.nichtIch` bereits für die Reizbilder der Nie-Liste (04_workshop.md Zeile 197 und 389). Keine Änderung nötig.
2. **`antworten.seite` entfällt als Eingang, `antworten.grenzenFrei` kommt dazu.** Der Paarsatz ist absichtlich für alle Makler gleich, damit Profile in der Kohorte vergleichbar sind; eine Eigentümer- oder Käufer-Variante hätte keinen Nutzen und keinen Abnehmer. Den Freitext zu Grenzen können Regeln nicht verlässlich lesen, deshalb liest ihn das Team.
3. **`auftrag.dauer`, `auftrag.termine`, `vorab.fakten.bezirke`, `auftrag.einwilligungen` zusätzlich**, alle aus Schritt 1, der 3 schon als Nachfolger nennt.
4. **Die Schriftprobe ist eine gesetzte Probe, kein Foto.** Ein Foto von Schrift bringt Material, Licht und Perspektive als weitere Variablen ins Paar.
5. **Auf dem Telefon übereinander in 1:1, auf dem Rechner nebeneinander in 4:5**, wegen der Bildfläche (3.5).
6. **Felder erweitert, Namen und Bedeutung unverändert.** `bildpaare` trägt Seite, Platz, Reihenfolge, Zeit, Wechsel und Satzversion; `bestandUrteil` ist ein Objekt mit dem Wert aus dem Vertrag und der Begründung, die der Makler gesehen hat; neu `paarStatus` und `profil.kohorte`. Ein Probepaar P0 vor den acht Paaren, das nicht gespeichert wird außer seiner Dauer in der Link-Messung. Kommt die Zustimmung von 11 nicht, hat der Satz weniger als acht Paare (3.3); das ist eine bewusste Abweichung von `bildpaare[8]`, weil ein Paar ohne sichtbare Wirkung die Zeit des Maklers kostet.
7. **Klärungen über den einen Mechanismus aus Schritt 4** (ersetzt den Vorschlag aus Fassung 2, dass 6 und 9 `workshop.klaerungen` direkt lesen). `widersprueche[].id` erscheint in `workshop.klaerungen[].ref`, `wirktAuf` ist `vorlieben.profil.dimensionen.<dim>`. Schritte 6, 9 und 11 lesen das Profil nur über `hmWirksam(mid, pfad)` (04_workshop.md Zeile 405 und 427) oder `hmVorliebenFolge`, das darauf aufbaut. **Hinweis an Schritt 4:** `hmWirksam` wendet für Pfade unter `vorlieben.profil` das `setzt` der gewählten Option an, gefunden über `ref`; das ist eine Belegung des vorhandenen Mechanismus, kein neues Feld in `klaerungen`.
8. **Hinweis an Schritt 11, mit Frist 16.10.2026:** Zielfelder für Menschen (`bild.motive`, Rolle `ort` mit oder ohne Person), Ausschnitt (`bild.regeln.abstand.mass.kopfanteilMax`), Dichte (`bild.regeln.abstand.mass.freiflaecheMin`), Ordnung (`bild.regeln.haltung.kamera`), Material (Pflicht-Detailmotiv in `bild.motive`, Ortsregel für `fotobrief.orte`) aufnehmen und das Profil über `hmVorliebenFolge` lesen. Die Zustimmung ist Bedingung vor der Beauftragung des Shootings; ohne sie werden P2, P3, P4 und P7 nicht produziert (3.3). Dazu `vorlieben.paarStatus` lesen: Bei "ohne Paarsatz" oder "übersprungen" setzt 11 `bild.regeln.licht` und `farbbehandlung` aus Idee und Brief und vermerkt "ohne Paarsatz". P6 wirkt nur auf `farbbehandlung` und `licht`.
9. **Hinweis an Schritt 9:** in den Pflicht-Begründungen `vorlieben.profil.<dim>` als Quelle nennen, wenn die Sicherheit hoch ist: Dichte und Ordnung in der Grammatik-Welt, Schriftcharakter in "Schriftrichtung". Farbtemperatur ist **keine** Pflicht-Quelle für "Farbrolle" und setzt keine Grenze für den Grund. Bei `paarStatus` "ohne Paarsatz" oder "übersprungen" in "Licht" und "Ausschnitt" die Quelle "ohne Paarsatz, aus dem Vertrag". Regel G-Achse aus 3.8 in die Achsenregel übernehmen: Der Gegenentwurf überschreitet eine Grenze nur nach Stufe 2, auf der zugeordneten Achse, mit Vermerk; für Markus (09_idee.md Zeile 303) heißt das: dunkler Grund ist zulässig, gerichtetes Licht in den Fotos des Gegenentwurfs nur mit Vermerk. Die Achse `schriftstimme` bleibt die Klassenachse, P8 misst den Kontrast innerhalb der Klasse. Kohortenwarnung aus `profil.kohorte` bei der Grammatik beachten. Die Amber-Annahme für Markus (09_idee.md Zeile 297) stützt sich auf `assets` "Eine Farbe", die keine Farbe nennt; Schritt 3 führt die Bestandsfarbe als Lücke.
10. **Hinweis an Schritt 10:** `behalten` ist der Fall "geschärft" mit Änderungsgrad null, kein neuer Typ. `system.gegenentwurf` übernimmt die Grenzen genau so, wie 9 sie nach Regel G-Achse (3.8) freigibt; der Grund in `system.farbe` hat keine Grenze aus dem Profil. Die Amber-Annahme für Markus (Zeile 328) bleibt Annahme; in Schritt 3 gibt es für ihn bis zur Datei keine Bestandsfarbe, also auch keine zweite.
11. **Kohorte als externer Eingang**, wie in Schritt 6 und 14. Ergebnis nur intern in `profil.kohorte`; **Hinweis an Schritt 6:** Kohortenwarnung in `territorien.kritik` aufnehmen.
12. **Hinweis an Schritt 2:** Der Abschluss des Bogens (02_fragebogen.md Zeile 62, "weiter zu den Bildpaaren (Schritt 3) oder später") nennt alle drei Teile: "Als Nächstes etwa vier Minuten: Bildpaare, Ihr Logo und optional ein Beispiel, im selben Link." Die Link-Messung `fragebogen.messung` nimmt die Dauer des Probepaars (`vorlieben.p0`) und je Weg bei Nicht ich (`vorlieben.nichtIch.<weg>`) auf.
13. **Hinweis an Schritt 1:** In `auftrag.einwilligungen` den Zweck "Beispiele fremder Auftritte kurz speichern und deuten" aufnehmen, mit Löschfrist 14 Tage (3.7); die Rechtsgrundlage für Daten Dritter ist vor dem Einsatz zu klären. In der Setzungstabelle für `auftrag.dauer` (01_auftakt.md Zeile 275) Nicht ich als eigene Zeile führen: "Bildpaare und altes Logo, 3 Minuten" und "Nicht ich, optional, 1 Minute", Summe unverändert vier Minuten.
14. **Rückmeldung zu Querverweisen der Nachbarn.** 01_auftakt.md Zeile 275 und 724 verweisen für die Dauer auf `03_vorlieben.md` 3.8; richtig ist 3.11 ("Wer macht was"). 04_workshop.md Zeile 488 verweist für die Bitte um Bestätigung der Deutung auf `03_vorlieben.md` 5.4; richtig ist 5.3 (Punkt 1) mit 3.7.

### 5.4 Schema (JSON Schema, Auszug für `MARKE_SCHEMA.md` und die Prüfung)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "wb-vorlieben/1",
  "type": "object",
  "additionalProperties": false,
  "required": ["paarStatus", "bildpaare", "profil", "bestandUrteil", "bestandBehalten", "widersprueche", "nichtIch"],
  "$defs": {
    "dim": { "enum": ["licht", "dichte", "mensch", "material", "ausschnitt", "farbtemperatur", "ordnung", "typografie"] },
    "pfad": { "type": "string", "pattern": "^[a-zA-Z]+(\\.[a-zA-Z0-9<>\\[\\]]+)*$" },
    "dimWert": {
      "type": "object", "additionalProperties": false,
      "required": ["wert", "sicherheit", "gewicht", "strittig"],
      "properties": {
        "wert": { "enum": ["a", "b", "offen"] },
        "pol": { "type": "string" },
        "sicherheit": { "enum": ["hoch", "mittel", "offen"] },
        "gewicht": { "type": "number", "minimum": 0, "maximum": 1 },
        "strittig": { "type": "boolean" },
        "widerspruchId": { "type": ["string", "null"] }
      }
    }
  },
  "properties": {
    "paarStatus": { "enum": ["vollstaendig", "ohne Paarsatz", "uebersprungen"] },
    "bildpaare": {
      "type": "array",
      "items": {
        "type": "object", "additionalProperties": false,
        "required": ["paarId", "dimension", "wahl", "seiteA", "position", "reihenfolge", "dauerMs", "wechsel", "satz"],
        "properties": {
          "paarId": { "enum": ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"] },
          "dimension": { "$ref": "#/$defs/dim" },
          "wahl": { "enum": ["a", "b", "egal"] },
          "seiteA": { "enum": ["links", "rechts", "oben", "unten"] },
          "position": { "type": "integer", "minimum": 1, "maximum": 8 },
          "reihenfolge": { "enum": ["A", "B"] },
          "dauerMs": { "type": "integer", "minimum": 0 },
          "wechsel": { "type": "integer", "minimum": 0 },
          "satz": { "type": "string" },
          "datum": { "type": "string", "format": "date-time" }
        }
      }
    },
    "profil": {
      "type": "object", "additionalProperties": false,
      "required": ["satz", "unscharf", "dimensionen"],
      "properties": {
        "satz": { "type": ["string", "null"] },
        "stand": { "type": "string", "format": "date-time" },
        "unscharf": { "type": "boolean" },
        "medianMs": { "type": ["integer", "null"], "minimum": 0 },
        "kohorte": {
          "type": "object", "additionalProperties": false,
          "properties": {
            "geprueftAm": { "type": "string", "format": "date-time" },
            "vergleiche": { "type": "integer", "minimum": 0 },
            "warnung": { "type": "boolean" },
            "treffer": { "type": "array", "items": { "type": "object", "required": ["mid", "gleicheHoch", "ueberlappung", "lage"],
              "properties": { "mid": { "type": "string" }, "gleicheHoch": { "type": "integer", "minimum": 0, "maximum": 8 },
                "ueberlappung": { "type": "array", "minItems": 1, "items": { "type": "string" } },
                "lage": { "enum": ["kern", "rand"] } } } }
          }
        },
        "dimensionen": {
          "type": "object",
          "propertyNames": { "$ref": "#/$defs/dim" },
          "required": ["licht", "dichte", "mensch", "material", "ausschnitt", "farbtemperatur", "ordnung", "typografie"],
          "additionalProperties": { "$ref": "#/$defs/dimWert" }
        }
      }
    },
    "nichtIch": {
      "type": "array", "maxItems": 3,
      "items": {
        "type": "object", "additionalProperties": false,
        "required": ["merkmal", "ebene", "dimension", "pol", "deutungVon", "datum"],
        "properties": {
          "nr": { "type": "integer", "minimum": 1, "maximum": 3 },
          "merkmal": { "type": "string", "maxLength": 160, "not": { "pattern": "(https?:|www\\.|@)" } },
          "ebene": { "enum": ["bild", "typo", "farbe", "ton", "verhalten"] },
          "dimension": { "oneOf": [{ "$ref": "#/$defs/dim" }, { "type": "null" }] },
          "pol": { "enum": ["a", "b", null] },
          "deutungVon": { "type": "string" },
          "datum": { "type": "string", "format": "date-time" },
          "rohGeloeschtAm": { "type": ["string", "null"], "format": "date-time" }
        }
      }
    },
    "bestandUrteil": {
      "type": "object", "additionalProperties": false,
      "required": ["wert", "quelle"],
      "properties": {
        "wert": { "enum": ["behalten", "schaerfen", "neu", null] },
        "gezeigt": { "type": "array", "minItems": 2, "maxItems": 2, "uniqueItems": true, "items": { "enum": ["behalten", "schaerfen", "neu"] } },
        "empfehlung": { "enum": ["behalten", "schaerfen", "neu"] },
        "empfehlungGrund": { "type": "string", "maxLength": 280 },
        "abweichend": { "type": "boolean" },
        "pruefung": {
          "type": "object", "additionalProperties": false,
          "required": ["urteil", "von", "datum"],
          "properties": {
            "bekanntheit": { "type": "object", "properties": { "jahre": { "type": ["integer", "null"], "minimum": 0 }, "orte": { "type": "array", "items": { "enum": ["schild", "website", "profil", "karte", "anderes"] } } } },
            "eigenstaendig": { "enum": ["eigenstaendig", "verwechselbar", "unklar"] },
            "tragfaehig": { "type": "object", "additionalProperties": false,
              "properties": { "px110": { "type": "boolean" }, "mm20": { "type": "boolean" }, "einfarbig": { "type": "boolean" }, "vektor": { "type": "boolean" } } },
            "schriftzugKontrast": { "enum": ["gering", "hoch", "kein Schriftzug", "unklar"] },
            "urteil": { "enum": ["traegt", "traegt teilweise", "traegt nicht"] },
            "von": { "type": "string" },
            "datum": { "type": "string", "format": "date-time" }
          }
        },
        "quelle": { "enum": ["makler", "kein Logo", "ausstehend"] },
        "datum": { "type": "string", "format": "date-time" }
      },
      "allOf": [
        { "if": { "properties": { "quelle": { "const": "makler" } } },
          "then": { "required": ["gezeigt", "empfehlung", "pruefung"], "properties": { "wert": { "enum": ["behalten", "schaerfen", "neu"] } } } },
        { "if": { "properties": { "quelle": { "const": "ausstehend" } } },
          "then": { "properties": { "wert": { "const": null } } } },
        { "if": { "properties": { "quelle": { "const": "kein Logo" } } },
          "then": { "properties": { "wert": { "const": "neu" } } } }
      ]
    },
    "bestandBehalten": {
      "type": "array",
      "items": {
        "type": "object", "additionalProperties": false,
        "required": ["element", "art", "ausschnitt"],
        "properties": {
          "element": { "type": "string" },
          "art": { "enum": ["farbe", "initialen", "form", "schriftzug"] },
          "wert": { "type": "string" },
          "ausschnitt": { "type": "object", "required": ["x", "y", "b", "h"],
            "properties": { "x": { "type": "number" }, "y": { "type": "number" }, "b": { "type": "number" }, "h": { "type": "number" } } },
          "quelle": { "type": "string" }
        }
      }
    },
    "widersprueche": {
      "type": "array",
      "items": {
        "type": "object", "additionalProperties": false,
        "required": ["id", "regel", "stufe", "rang", "an"],
        "properties": {
          "id": { "type": "string", "pattern": "^v-w[2-6]-[0-9]+$" },
          "regel": { "enum": ["W2", "W3", "W4", "W5", "W6"] },
          "dimension": { "oneOf": [{ "$ref": "#/$defs/dim" }, { "type": "null" }] },
          "stufe": { "enum": ["makler", "team", "hinweis"] },
          "rang": { "type": "integer", "minimum": 1 },
          "ueberObergrenze": { "type": "boolean" },
          "wirktAuf": { "$ref": "#/$defs/pfad" },
          "vorliebe": { "type": "string" },
          "gegen": { "type": "object", "additionalProperties": false, "required": ["feld", "wert"],
            "properties": { "feld": { "$ref": "#/$defs/pfad" }, "wert": { "type": ["string", "number", "boolean"] } } },
          "optionen": { "type": "array", "minItems": 2, "maxItems": 2,
            "items": { "type": "object", "additionalProperties": false, "required": ["text", "setzt"],
              "properties": { "text": { "type": "string", "maxLength": 200 },
                "setzt": { "type": "object", "additionalProperties": false,
                  "properties": { "wert": { "enum": ["a", "b", "offen", "gewaehlt"] }, "sicherheit": { "enum": ["hoch", "mittel", "offen", "gemessen"] } } } } } },
          "empfehlung": { "enum": [0, 1] },
          "empfehlungGrund": { "type": "string", "maxLength": 200 },
          "frageWorkshop": { "type": "string" },
          "an": { "type": "array", "items": { "enum": [4, 9] }, "minItems": 1 }
        },
        "allOf": [
          { "if": { "properties": { "stufe": { "const": "makler" } } },
            "then": { "required": ["wirktAuf", "optionen", "empfehlung", "empfehlungGrund", "frageWorkshop"] } },
          { "if": { "properties": { "stufe": { "const": "team" } } },
            "then": { "required": ["wirktAuf", "optionen", "empfehlung"], "not": { "required": ["frageWorkshop"] } } },
          { "if": { "properties": { "stufe": { "const": "hinweis" } } },
            "then": { "not": { "anyOf": [{ "required": ["optionen"] }, { "required": ["frageWorkshop"] }] } } },
          { "if": { "properties": { "regel": { "enum": ["W2", "W4", "W6"] } } },
            "then": { "properties": { "stufe": { "const": "hinweis" } } } }
        ]
      }
    }
  },
  "allOf": [
    { "if": { "properties": { "paarStatus": { "const": "vollstaendig" } } },
      "then": { "properties": { "bildpaare": { "minItems": 8, "maxItems": 8,
        "allOf": [
          { "contains": { "properties": { "paarId": { "const": "P1" } } }, "minContains": 1, "maxContains": 1 },
          { "contains": { "properties": { "paarId": { "const": "P2" } } }, "minContains": 1, "maxContains": 1 },
          { "contains": { "properties": { "paarId": { "const": "P3" } } }, "minContains": 1, "maxContains": 1 },
          { "contains": { "properties": { "paarId": { "const": "P4" } } }, "minContains": 1, "maxContains": 1 },
          { "contains": { "properties": { "paarId": { "const": "P5" } } }, "minContains": 1, "maxContains": 1 },
          { "contains": { "properties": { "paarId": { "const": "P6" } } }, "minContains": 1, "maxContains": 1 },
          { "contains": { "properties": { "paarId": { "const": "P7" } } }, "minContains": 1, "maxContains": 1 },
          { "contains": { "properties": { "paarId": { "const": "P8" } } }, "minContains": 1, "maxContains": 1 }
        ] } } },
      "else": { "properties": { "bildpaare": { "maxItems": 0 } } } }
  ]
}
```

Hinweise zum Schema: Die acht `contains`-Klauseln mit `minContains` und `maxContains` erzwingen, dass jede `paarId` genau einmal vorkommt; ohne vollständigen Paarsatz ist `bildpaare` leer, als eigener Zustand in `paarStatus`. Wird der Satz nach der Pilotregel in 3.3 vor der Produktion verkleinert, bekommt er eine eigene Version (etwa `v1-4`) und ein eigenes Schema mit der passenden Zahl von `contains`-Klauseln. P0 steht nie in `bildpaare`. Die Obergrenze von zwei Widersprüchen der Stufe "makler" und die Kopplung `rang` sind Regeln in `hmVorliebenPruefen`, weil JSON Schema das Zählen über ein Feldkriterium nicht direkt ausdrückt.

Das Schema ist kein Claude-Schema, weil Claude hier nichts erzeugt. Es dient der Prüfung im Selbsttest und als Teil des Dossiers, das die Claude-Kette ab Schritt 5 liest. Der Regelpfad ist in diesem Schritt der einzige Pfad; fehlt ein Paarsatz oder ein Logo, setzt er "offen", "ohne Paarsatz", "kein Logo" oder "ausstehend" statt eines Musters.

---

## 6. Qualitätsprüfung im Schritt

**Automatisch im Selbsttest (neue Gruppe `hmVorliebenTests`).**
1. Paarsatz: das Probepaar P0 und genau die Paare, deren Abnehmer zugestimmt hat (voller Satz acht), jede Dimension höchstens einmal, jedes mit Lizenznummer, Prüfsumme, beiden Formaten und bestandenem Pretest; kein Dateipfad ins öffentliche Repo; kein Motiv-Tag aus der Liste der Branchenmotive; Alternativtexte ohne Pol-Wörter.
2. Tauschprobe mit Folgefeld (E4): Für jede Dimension mit Wert a oder b wird die Wahl getauscht. Geprüft wird (a) das Profil ändert sich genau in dieser Dimension, (b) `hmVorliebenFolge` liefert einen anderen Folgewert, (c) das Prüffeld aus Tabelle 3.9 im Regelpfad des Abnehmers ändert seinen Wert. Solange der Regelpfad eines Abnehmers noch nicht gebaut ist oder der Hinweis nicht angenommen wurde, ist (c) gelb mit "Folgefeld ausstehend", nie grün.
3. "Beides gleich" ergibt Wert offen, Sicherheit offen, Gewicht null.
4. Sicherheit: bei Median 4 s und f = 1 wird 6 s zu hoch und 6,1 s zu mittel; ein Wechsel ergibt immer mittel; P8 nutzt den Faktor k; weniger als fünf gewählte Fotopaare ergeben durchgehend mittel.
5. Seitenzufall: Über 100 simulierte Makler liegt Pol a je Paar zwischen 40 und 60 Prozent links oder oben.
6. Optionen: Für jedes Urteil des Teams werden genau zwei Optionen gezeigt, genau eine ist empfohlen. "Behalten" erscheint nur bei "trägt" **und** mindestens einem markierten Element. Randfall: Urteil "trägt" und "An nichts davon" (`bestandBehalten` leer) zeigt "schärfen" und "neu"; mit `bekanntheit.jahre` 5 ist "schärfen" empfohlen, mit `jahre` 1 und einem Ort "neu". Ein negativer Testfall prüft, dass "behalten" in diesem Randfall nie erscheint.
7. Ausgangslagen: ohne Logo `quelle` "kein Logo" und `wert` "neu"; mit Logo ohne Datei `quelle` "ausstehend", `wert` leer, Bildschirme 11 und 12 nicht erreichbar; ohne Paarsatz `paarStatus` "ohne Paarsatz", `bildpaare` leer, alle Dimensionen offen.
8. Jedes Element in `bestandBehalten` existiert in `vorab.logoAlt.elemente` und hat einen Ausschnitt.
9. `nichtIch`: höchstens drei, kein Treffer auf `http`, `www`, `@` oder eine Bilddatenkette; `rohGeloeschtAm` gesetzt, sobald der Workshop stattgefunden hat; Rohmaterial nur für die Rolle Deutung lesbar.
10. Widerspruchsregeln W2 bis W6 mit je einem positiven und einem negativen Testfall; darunter der Fall aus Fassung 2 (Menschen gewählt, Familie auf nie), der **keinen** Widerspruch mehr erzeugen darf, und W2, das nur noch Stufe "hinweis" ergeben darf.
11. Obergrenze und Rangfolge: Bei drei W5 gehen genau zwei mit Stufe "makler" weiter (die mit dem höchsten wirksamen Gewicht), das dritte mit Stufe "team" und `ueberObergrenze`; ein zusätzliches W2 ändert daran nichts.
12. Ein Leseweg: Offene Klärung mit `ref` auf einen Widerspruch ergibt über `hmWirksam` `strittig` wahr und Gewicht 0; nach Entscheidung das `setzt` der Option. Eine Suche im Code von 6, 9 und 11 nach direktem Zugriff auf `vorlieben.profil` ohne `hmWirksam` oder `hmVorliebenFolge` hat null Treffer.
13. Kohorte: zwei simulierte Makler im selben ersten Bezirk mit fünf gleichen Polen mit hoher Sicherheit ergeben eine Warnung mit `lage` "kern"; mit einem Gegenpol hoch keine. Ein Makler mit Döbling auf Rang 1 und einer mit Währing auf Rang 1 und Döbling auf Rang 3 ergeben bei gleichen Polen eine Warnung mit `lage` "rand" und `ueberlappung` ["1190 Döbling"]; ohne gemeinsamen Bezirk wird gar nicht verglichen.
14. Schema: gültige und ungültige Beispiele für jede Verzweigung (`paarStatus`, `quelle`, `stufe`).
15. Sprachprüfung aller Makler-Texte des Kapitels mit dem bestehenden Muster für Gedankenstriche, Ausrufezeichen und die Klischee-Liste; Rechtschreibprobe für die festen Texte.
16. Nachlauf-Prüfungen, definiert hier, ausgeführt in Schritt 9 und 10: jede Regel gegen einen Pol mit Sicherheit hoch hat einen Eintrag in `idee.begruendung`; jedes behaltene Element ist in `system` oder `workshop.klaerungen` wiederzufinden (E4, E5).
17. `paarStatus`: Bei "ohne Paarsatz" trägt `idee.begruendung` für Licht und Ausschnitt die Quelle "ohne Paarsatz, aus dem Vertrag", und `bild.regeln.licht` vermerkt den Grund. Solange 9 und 11 die Hinweise nicht angenommen haben, gelb.
18. Einstiegseffekt: Ein simulierter Makler mit P0 = 12 s, P1 = 5 s und sonst Median 4 s bekommt für P1 "hoch", weil P0 weder in m noch im Profil zählt. Mit einem aus dem Pretest gemessenen f(1) = 1,3 wird P1 mit 7,5 s noch "hoch" (Schwelle 1,5 mal 4 mal 1,3 = 7,8 s), mit 8 s "mittel". `bildpaare` enthält nie P0.
19. Positionseffekt im Pretest: Die Auswertung rechnet f(Platz) aus rotierten Reihenfolgen und prüft, dass jede Dimension auf mindestens drei verschiedenen Plätzen vorkam. Live: Ab Makler 21 wechseln sich Reihenfolge A und B ab, und keine Fotodimension steht in A und B auf demselben Platz.
20. Regel G-Achse: (a) Empfehlung überschreitet eine Grenze ohne Vertragsquelle: rot. (b) Gegenentwurf auf Achse `tonwert`, gewählt nach Stufe 2, überschreitet Licht hoch mit Vermerk: grün. (c) Derselbe Fall ohne Vermerk: rot. (d) Gegenentwurf nach Stufe 3 überschreitet eine Grenze: rot. (e) Gegenentwurf überschreitet zwei Grenzen: rot. (f) Gegenentwurf lässt ein Element aus `bestandBehalten` weg: rot. (g) Fall Markus: dunkler Grund, weiches Licht in den Fotos: grün ohne Vermerk.
21. P6 und Grund: Tauschprobe an P6 ändert `bild.regeln.farbbehandlung`, aber nie einen Wert in `system.farbe`; eine Suche nach einer Chroma-Grenze aus dem Profil im Code von 9 und 10 hat null Treffer.
22. Nachträge: Stehen Logo und Paarsatz aus, erzeugt die Werkbank höchstens eine Mitteilung je Makler; wird nur eines bis sieben Werktage vor dem Workshop fertig, geht nur dieses, und für den Rest entsteht keine weitere Mitteilung.
23. Nicht ich ohne Einwilligung: Ist der Zweck "Beispiele fremder Auftritte kurz speichern und deuten" nicht auf "ja", bietet Bildschirm 13 nur "Beschreiben", und `vorliebenRoh` bleibt leer.

**Durch das Team.**
- Vor der Freigabe der Bildschirme 11 und 12: Bestandsprüfung fertig, Elemente markiert, Farbwerte gemessen, Empfehlungstext auf echte Werte geprüft. Ohne das gibt die Werkbank diese Bildschirme nicht frei.
- Vor dem Workshop: Nicht ich gedeutet und Rohmaterial gelöscht; Widersprüche und Kohortenwarnung gelesen.
- Nach zehn Maklern: Kohortenblick auf die Wahlen je Paar, nur beobachtend; Prüfung der Sicherheitsregel gegen die Klärungen (3.8) und der Dauer von P0 und Nicht ich je Weg.
- Nach 20 Maklern mit Reihenfolge A: Ersatzschwelle aus E2 (17 von 20); ein Paar ohne Streuung wird ersetzt und der Satz bekommt eine neue Version. Danach Wechsel auf A und B.

**Antworten auf die Leitfragen.**
1. *Variiert jedes Paar genau eine Dimension, die einem Parameter der visuellen Idee entspricht?* Ja, durch die Herstellungsregeln in 3.2 und die Dimensionsprobe; welcher Parameter und welches Feld, steht in Tabelle 3.9 mit dem Abnehmer, der es liest.
2. *Lizenziert und frei von Branchenmotiven?* Eigene Produktion mit Werkvertrag und Modellfreigabe, Motivliste, Tag-Prüfung im Selbsttest; Dateien nicht im Repo; Pilotregel mit Stichtag.
3. *Folge von behalten, schärfen oder neu für Wortmarke und Farbe?* Tabelle in 3.6, samt der Lagen "kein Logo" und "ausstehend".
4. *Welche Vorliebe widerspricht Grenzen oder Bestand?* Regeln W2 bis W6 in 3.10: Vorliebe gegen Bestand als W3 (Team) und W2 (Hinweis), Vorliebe gegen Nicht ich als W5 (Makler), mit höchstens zwei Klärungen für den Makler und dem Mechanismus `hmWirksam`.
5. *Kein Maklerfeed als positive Referenz?* Der Paarsatz enthält keine Makler-Inhalte, `vorbilder` entfällt, `nichtIch` speichert nur Verbote ohne Bild oder Namen, das Schema hat kein Feld für positive Referenzen, und Claude sieht kein Rohmaterial.

---

## 7. Typische Fehler und wie sie verhindert werden

| Fehler | Folge | Verhinderung |
|---|---|---|
| Ein Paar variiert zwei Dinge, etwa Sonne, die zugleich härter und wärmer ist | die Wahl ist nicht deutbar | Weißabgleich und Helligkeit paarweise angleichen, Dimensionsprobe (E1) |
| Ein Pol ist schlicht das bessere Foto | das Paar misst Qualität, nicht Geschmack | Pretest 30 bis 70 Prozent, Kohortenblick (E2) |
| Stock- oder KI-Look | der Makler urteilt über Machart statt über Sehen | eigenes Shooting, kein Filter, kein Ersatz aus Stock oder KI |
| Branchenmotive im Satz | Klischees wandern in die Bildsprache | Motivliste, Tag-Prüfung |
| Der Makler wählt nach Privatgeschmack | das Profil beschreibt seine Wohnung, nicht seine Marke | Aufgabentext "passt eher zu Ihrer Arbeit", Formulierungsvergleich im Pretest |
| Eine Dimension wirkt nirgends | eine Minute des Maklers ohne Folge | Tabelle 3.9 mit Folgefeld je Dimension, Tauschprobe bis ins Folgefeld, P4 entfällt ohne Abnehmer |
| Eine Klärung kommt bei einem Abnehmer nicht an | strittige Dimension wirkt weiter oder für immer nicht | ein Leseweg über `hmWirksam`, Code-Suche im Selbsttest |
| Langsame, bedachte Tipper bekommen nur "mittel" | ihr Profil wird zu Unrecht weich | Schwelle relativ zu ihrem eigenen Median, eigener Faktor für die Schriftprobe |
| Einen Link aus einer anderen App holen bricht die Einhand-Minute | Nicht ich wird übersprungen oder dauert viel länger als angesagt | Einfügen aus der Zwischenablage, Beschreiben mit Diktat, eigene Minute in `auftrag.dauer`, Messung je Weg |
| Der Makler hält die Paarbilder für seinen künftigen Feed | falsche Erwartung im Reveal | Satz auf Bildschirm 10 |
| Die Schriftprobe wird als Logo- oder Schriftwahl gelesen | eine Gestaltungsaufgabe durch die Hintertür | Charakter statt Klasse, neutraler Satz statt Name, Schriften außerhalb der Schriftbank, niedrigstes Gewicht |
| Neigung zu einer Seite | Profil verzerrt | Seite je Makler zufällig, gespeichert, im Selbsttest geprüft |
| Die Bauchwahl wird im Workshop nachträglich begründet | schlechtere, später bereute Urteile (Wilson u. a. 1993) | im Workshop nur Widersprüche klären, nie die Wahl selbst |
| Zu viele Klärungen | der Workshop kippt in ein Formular, andere Klärungen fallen weg | höchstens zwei aus Schritt 3, Rangfolge, Rest als Team-Entscheidung mit Freigabe 1 |
| Eine Gestaltungsfrage landet beim Makler | er gestaltet indirekt | W3 als Stufe "team", Regel aus 04_workshop.md Zeile 219 |
| Das alte Logo wird groß auf Weiß beurteilt | Urteil ohne Anwendung | echte Größen und echter Screenshot auf Bildschirm 11 |
| Das Logo wird ohne Datei aus dem Gedächtnis entschieden | eine Entscheidung ohne Gegenstand | Lage "ausstehend", Nachreichen im selben Link, Blocker in Schritt 10 |
| Eine Bestandsfarbe wird im Beispiel oder im Seed erfunden | zwei Farben für einen Makler, Kette bricht | Farbe nur aus gemessener Datei, sonst Lücke |
| Das eigene Logo verankert den Geschmack | Profil spiegelt nur den Bestand | Paare vor dem Logo |
| Drei gleichrangige Optionen beim Logo | Neigung zur Mitte, keine Führung (Simonson und Tversky 1992: https://doi.org/10.2307/3172740) | genau zwei Optionen, eine begründet empfohlen |
| Ein behaltenes Element verschwindet still in Schritt 10 | Vertrauensbruch, Gap-Effekt | Nachlauf-Prüfung E5, Klärung nur mit seinem Wort |
| Das Profil wird zur Gestaltungsvorgabe | der Makler gestaltet indirekt, der Vertrag verliert | Rangordnung: Vertrag vor Profil; hoch heißt Grenze, nicht Pflicht |
| Zwei Makler im selben Bezirk haben dasselbe Profil | ähnliche Bildsprache nebeneinander | Kohortenprüfung, Grammatik-Sperre in 9 ohne Begründung |
| Acht Wahlen werden zum Typ erklärt ("Sie sind der kühle Typ") | Pseudo-Diagnose, Archetyp durch die Hintertür | keine Auswertung für den Makler außer seiner Auswahl als Bogen |
| Fremde Auftritte oder Privatpersonen werden gespeichert | Datenschutz, Namen in Markentexten | Hinweis auf Bildschirm 13, Zugriff nur Rolle Deutung, nur Merkmal als Verbot, Löschfrist, Prüfung auf URL und Handle |
| Ladezustand als Skelett oder Schimmer | Standard-Look, Unruhe vor der ersten Wahl | Vorladen während Bildschirm 1, ruhige Flächen, Zeit erst ab Sichtbarkeit |
| Das erste Paar misst die Orientierung statt der Dimension | die wichtigste Dimension wird überzufällig "mittel", Grenze wird Richtung | ungezähltes Probepaar P0, Positionsfaktor aus dem Pretest, Selbsttest 18 |
| Feste Reihenfolge verwechselt Platz mit Dimension | Kohortenauswertung schreibt Ermüdung einem Paar zu | Rotation im Pretest, Reihenfolge B nach der Pilotphase, `position` gespeichert |
| Eine Bildwahl wird zur Palette | der Weißabgleich eines Fotos bestimmt den Papierton der Marke | P6 wirkt nur auf die Bildbehandlung, W2 nur Hinweis, Selbsttest 21 |
| Der Gegenentwurf öffnet eine klare Wahl ohne Grund oder wird zum Strohmann | Scheinwahl oder übergangene Grenze | Regel G-Achse: nur nach eigenem Widerspruch, nur eine Grenze, mit Vermerk, nie gegen sein Wort; Selbsttest 20 |
| Paare werden fotografiert, bevor ein Abnehmer sie liest | Makler-Zeit ohne sichtbare Folge, Geld für Bilder ohne Wirkung | Zustimmung von 11 als Bedingung vor der Beauftragung, sonst kleinerer Satz |
| Nachträge zerlegen den Moment | drei Mitteilungen für ein Kapitel | höchstens eine gebündelte Mitteilung, Rest im Workshop |
| Wer an nichts hängt, bekommt nur behalten oder schärfen | sein Wort zählt nicht | Randfall in Tabelle 3.6, Selbsttest 6 |
| Die ersten Makler laufen still mit unscharfem Profil | Schritt 9 arbeitet ohne Grundlage, niemand merkt es | Pilotregel mit Stichtag, `paarStatus`, Begründungseintrag "ohne Paarsatz" |

---

## 8. Umsetzung in der Werkbank

Architektur nach `ui_kits/werkbank/CLAUDE.md`: Babel ohne Build, Präfix `hm`, Komponenten groß, Export über `Object.assign(window, ...)`, kein `import()`. Speicherort nach Zerlegung Kapitel 3: `hmStore` unter `marke2[mid].vorlieben`.

| Datei | Änderung |
|---|---|
| `wb-vorlieben.jsx` (neu) | `HM_PAARSATZ` (Metadaten, keine Bilder, mit P0 und den Reihenfolgen A und B), `HM_POSITIONSFAKTOR` (Setzung f = 1 bis zum Pretest), `hmVorliebenGegenentwurfOk(idee, profil)` für die Regel G-Achse, `hmVorliebenNachtrag(mid)` für die eine gebündelte Mitteilung, `HM_VORLIEBEN_PARAMETER` (Dimension, Pole, Paargewicht, Folgewerte und Prüffeld je Abnehmer nach 3.9), `HM_WELT_PROFIL`, `hmVorliebenProfil(bildpaare)` mit relativer Sicherheit, `hmVorliebenFolge(mid, dim)` über `hmWirksam`, `hmVorliebenKohorte(mid)`, `hmBestandOptionen(pruefung)`, `hmBestandEmpfehlung(pruefung, elemente)`, `hmVorliebenWidersprueche(vorlieben, antworten, vorab)` mit Rang und Obergrenze, `hmVorliebenPruefen(v)` gegen das Schema, Komponenten `VorliebenPaare`, `VorliebenBestand`, `VorliebenNichtIch`, `VorliebenEnde` nach 3.5, Selbsttest `hmVorliebenTests`; Script-Tag in `index.html` nach `wb-workshop.jsx`, weil `hmWirksam` dort liegt |
| `wb-data.jsx` | `HM_BILDPAARE` entfernen; Fragen `bildpaare`, `behalten`, `bestand`, `vorbilder`, `assets` aus `HM_KAPITEL` nehmen; die Zählung warm gegen kühl in `hmWeg` (Zeile 290) entfernen |
| `wb-flow.jsx` | Typ `paare` (Zeile 111) durch `VorliebenPaare` ersetzen; Kopftext zu `behalten` im Kapitel-Reveal (Zeile 125) entfernen; das Kapitel nach dem Abschluss des Pflichtteils einhängen, mit Nachreichen von Logo und Paaren im selben Link |
| `wb-markenwelten.jsx` | `HM_WELT_BILDPAARE` (Zeile 132) entfernen; `hmWeltVorschlag` (Zeile 1203) rechnet mit wirksamen Gewichten aus `hmVorliebenFolge` und `HM_WELT_PROFIL` als Hinweis für Schritt 9; Tests in Zeile 1360 bis 1364 auf Profile umstellen |
| `wb-plattform.jsx` | Tabelle `aff` und Bildpaar-Regeltexte in `hmPfVisuell` (Zeile 809 bis 856) entfernen |
| `wb-os-data.jsx` | Bildwelt-Prompt (Zeile 103) liest `hmVorliebenFolge` für Licht und Farbtemperatur statt einer Zählung |
| `wb-setup.jsx` | Suche nach Material der Art `"Logo"` (Zeile 129) auf `"Altes Logo"` korrigieren, sonst kommt `vorab.logoAlt` nie an (Fehler aus KETTE_IST, gehört zu Schritt 1); `LogoFarbe` mit "Übernehmen" in den Akzent-Katalog entfällt, die Farbe läuft über `bestandBehalten` |
| `wb-marke.jsx` | Team-Seitenpanel "Bestand": Test-Render in 110 px und 20 mm, vier Prüfpunkte, Urteil, Elemente als Rechtecke markieren, Farbwerte messen, Empfehlungstext redigieren, Bildschirme 11 und 12 freigeben; Panel "Nicht ich" nur für die Rolle Deutung: Merkmal, Ebene, Dimension, Pol, Rohmaterial löschen; Hinweis bei Kohortenwarnung |
| `wb-store.jsx` | Seed Markus: `vorlieben` bleibt leer, `vorab.logoAlt` bleibt Lücke; keine erfundenen Werte im Seed |
| `docs/werkbank/MARKE_SCHEMA.md` | Objekt `vorlieben` nach 5.4 aufnehmen |
| geschützter Speicher | Paarbilder in zwei Formaten und Rohmaterial zu Nicht ich; ausgeliefert über denselben Zugang wie der Link aus Schritt 2, nie über das Repo |

**Datenfelder.** `marke2[mid].vorlieben.{paarStatus, bildpaare, profil, nichtIch, bestandUrteil, bestandBehalten, widersprueche}` nach 5.2; dazu nur intern und flüchtig `marke2[mid].vorliebenRoh.nichtIch[]` bis zur Löschung, lesbar nur für die Rolle Deutung.

**Aufwand (Setzung).**
- Code: etwa vier Tage (Paar-Oberfläche nach 3.5 mit Vorladen und Übergängen anderthalb Tage, Bestand mit Team-Panel und Nachreichen einen Tag, Regeln samt Folgewerten, Kohorte, Widersprüchen und Umbau der alten Tabellen einen Tag, Selbsttest einen halben Tag).
- Code zusätzlich zu Fassung 3: ein halber Tag (Probepaar, Reihenfolgen, Positionsfaktor, Regel G-Achse als Prüfung, Nachtragsregel, drei Wege bei Nicht ich, Selbsttests 17 bis 23).
- Paarsatz einmalig: Angebote und Zustimmung von 11 einholen, ein Shooting-Tag, ein Tag Auswahl und Angleich, ein Tag Pretest mit mindestens 30 Personen samt Auswertung. Kosten: Lücke bis zu den Angeboten (16.10.2026).
- Team je Makler: etwa 30 Minuten (Bestand 15, Nicht ich bis 15, Widersprüche und Kohorte 5).
- Makler: etwa vier Minuten.

**Offene Punkte und Lücken.**
1. Rechte am Paarsatz und Einwilligung des Modells vor dem Einsatz klären (Zerlegung 7.3).
2. Kosten des Paarsatzes: Lücke bis zu den Angeboten; Stichtag 13.11.2026 braucht die Zustimmung des Owners.
3. Transport vom Link des Maklers in den Store des Teams legt Schritt 2 fest; dieser Schritt nutzt ihn nur.
4. Die Anrede der Oberfläche gegenüber dem Makler ist offen (Zerlegung 7.1).
5. Die Sicherheitsregel (Faktor 1,5, k = 2, f = 1, Schwelle 1,15 für f), die Kohortenschwelle (fünf Dimensionen), die Mindestzahl von 20 Maklern für die Ersatzschwelle und die Nachtragsfrist von sieben Werktagen sind ungeprüfte Setzungen.
6. Es gibt keine Studie zu visuellen Vorlieben von Maklern oder zur Wirkung von Paarsätzen in Wien (Lücke, wie R2, R5, R7).
7. Die Hinweise an 1, 2, 4, 6, 9, 10 und 11 (5.3, Punkte 7 bis 14) brauchen die Zustimmung der Entwerfer dieser Schritte. Die Zustimmung von 11 ist bis 16.10.2026 Bedingung vor der Beauftragung; ohne sie werden P2, P3, P4 und P7 nicht produziert (3.3).
8. Beobachtet, nicht aus diesem Schritt: Das Markus-Beispiel in Schritt 9 wählt die Grammatik Weite (09_idee.md Zeile 296), das in Schritt 10 rechnet mit Feuilleton (10_system.md 3.6). Das sollten 9 und 10 vereinheitlichen, bevor die Kette für Markus durchgerechnet wird.
9. Rechtsgrundlage für das kurze Speichern fremder Auftritte bei Nicht ich (3.7), vor dem Einsatz zu klären.

---

## Quellen

Intern: `../00_ZERLEGUNG.md`, `../bestand/KETTE_IST.md`, `../bestand/FRAGEN_WIRKUNG_IST.md`, `../research/R1-studios.md` bis `R8-kundenerlebnis.md`, die Nachbarschritte `01_auftakt.md`, `02_fragebogen.md`, `04_workshop.md`, `06_territorien.md`, `09_idee.md`, `10_system.md`, `11_bild.md`, `ui_kits/werkbank/CLAUDE.md`, `wb-data.jsx`, `wb-flow.jsx`, `wb-markenwelten.jsx`, `wb-plattform.jsx`, `wb-os-data.jsx`, `wb-setup.jsx`, `wb-store.jsx`, `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/materials.css`.

Studien
- Townsend und Kahn 2014, Visual Preference Heuristic: https://doi.org/10.1086/673521
- Wilson und Schooler 1991: https://doi.org/10.1037//0022-3514.60.2.181
- Wilson, Lisle, Schooler, Hodges 1993: https://doi.org/10.1177/0146167293193010
- Lindgaard u. a. 2006, 50 Millisekunden: https://www.tandfonline.com/doi/abs/10.1080/01449290500330448
- Cao und Drasgow 2019, Forced Choice in Persönlichkeitstests (hier nur als Übertragung): https://www.ncbi.nlm.nih.gov/pubmed/31070382
- Jansson und Smith 1991, Design-Fixierung: https://www.sciencedirect.com/science/article/abs/pii/0142694X9190003F
- Munk, Sørensen, Laursen 2020, Visual Boards: https://www.designsociety.org/download-publication/43213/visual_boards_mood_board_style_board_or_concept_board
- Galesic und Bosnjak 2009: https://academic.oup.com/poq/article-abstract/73/2/349/1939196
- Chernev, Böckenholt, Goodman 2015: https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf
- Simonson und Tversky 1992: https://doi.org/10.2307/3172740
- Walsh, Winterich, Mittal 2010: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1998809
- Brumberger 2003: https://www.ingentaconnect.com/content/stc/tc/2003/00000050/00000002/art00007
- Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290

Studios, Praxis, Werkzeuge
- Mucho, Eye Magazine: https://eyemagazine.com/feature/article/reputations-mucho
- Landor, Creative Gaga: https://www.creativegaga.com/design/graphic-design/packaging/landor-mumbai-shares-secrets
- Pentagram, Mastercard: https://www.pentagram.com/work/mastercard
- StudioSmall, The Modern House: https://the-brandidentity.com/project/studiosmall-prepare-modern-house-modern-world-elegant-identity-system
- Sycheva, Smashing Magazine 2026: https://www.smashingmagazine.com/2026/07/how-turn-brand-strategy-into-visual-direction/
- Mozilla Open Design: https://blog.mozilla.org/opendesign/roads-not-taken/
- Gap 2010, NPR: https://www.npr.org/2010/10/08/130419187/the-gap-gets-backlash-for-logo-makeover
- Romaniuk, Distinctive Assets: https://marketingscience.info/news-and-insights/brands-need-distinctive-assets
- Looka nach Kreafolk: https://kreafolk.com/blogs/articles/looka-ai-logo-maker
