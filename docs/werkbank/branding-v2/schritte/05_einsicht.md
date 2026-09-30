# Schritt 5. Einsicht (`einsicht`)

Stand 30.09.2026, Fassung 2 nach Prüfrunde 1. Teilschritt 5 der Zerlegung in `../00_ZERLEGUNG.md`. Gegenüber Fassung 1: Spannung von Kandidat K1 weg von der Regelpfad-Schablone, P3 mit Enthaltensein und Wortfolgen-Sperre gegen alle Schablonen, Nachholfrage als Nachholen von Workshop-Frage F7, Zeitbezug aus `workshop.zitate[].frage`, Satz im Richtungstermin als Szene, positives Zielbild (3.12), Zeilenverweise geprüft, Beispielkette in 6, 14 und 15 angeglichen, etwa halbe Länge.

**Lesart.** *Belegt*: steht in einer Quelle mit URL oder in einer genannten Datei mit Stelle. *Ableitung*: eigene Folgerung. *Setzung*: bewusst gesetzter Startwert, gemessen an den ersten fünf Maklern. *Lücke*: Stoff fehlt. *Angenommen*: nur im Zielbild 3.12, zur Anschauung, darf nie in einen Ausgang. Der Maßstab "Top-Studio" ist Ableitung aus R1, R2 und R8.

**Der Schritt in einem Satz.** Beweis zuerst, Prosa zuletzt: Aus den Eingängen entsteht eine Belegtafel mit wörtlichen, zeitlich eingeordneten Einträgen, daraus drei Kandidaten aus drei Lesarten, jeder durch neun Proben, und das Team wählt einen mit Gründen für alle drei. Der Makler investiert keine Minute; nur wenn im Workshop Frage F7 ausgelassen wurde, wird sie in etwa zwei Minuten nachgeholt.

---

## 1. Ziel und Erfolgskriterium

### 1.1 Ziel

Die eine wahre, leicht unbequeme Spannung der Kunden, die Konvention im Kerngebiet und die weiße Stelle finden, die nur dieser Makler belegen kann. Intern drei Kandidaten, das Team wählt, der Makler sieht keinen.

### 1.2 Was hier eine Einsicht ist

Fünf Teile, die einander brauchen. Fehlt einer, ist es eine Beobachtung.

| Teil | Frage | Beleg für die Form |
|---|---|---|
| Zielgruppe | Wer steht vor welcher Entscheidung, wo, mit welchem Objekt, in welcher Lebensphase? Bild, nie Demografie | Holman, Publikum als Menschen: https://www.richardholman.com/blog/2019/6/17/simplicity-inspiration-amp-truth-how-to-write-better-creative-briefs |
| Spannung | Welche Kraft hält sie vor der Entscheidung zurück? Nur aus Stützen, die eine Kraft vor der Entscheidung beschreiben | Four Forces nach Moesta und Spiek: https://jobstobedone.org/the-four-forces/ |
| Konvention | Wie antworten die Makler im Kerngebiet heute darauf? Nur aus der Karte und der Alternative des letzten Kunden | Dunford: https://www.aprildunford.com/post/a-product-positioning-exercise |
| Weiße Stelle | Was beantwortet die Spannung, besetzt niemand auf der Karte und kann nur er belegen? | Wolff Olins, Brücke zwischen dem, was Menschen wollen und nicht bekommen, und dem, was jemand hat und nicht nutzt: https://wolffolins.com/news/inside-wolff-olins-sammy-page-on-strategy |
| Unbequem | Was kostet ihn diese Wahrheit? | Holman, Wahrheit als leicht unbequeme Einsicht, Beispiel Avis als Nummer zwei (Quelle oben) |

Ableitung: Die fünf Teile sind die Zerlegung der Wolff-Olins-Brücke in prüfbare Felder, drei für den Markt, zwei für den Makler. Dazu kommt je Kandidat die **Szene**: der Moment der Spannung als Bild (wer, wo, wann, was). Aus ihr zieht Schritt 6 Rohskizze, Serienidee und Zeichenidee, und aus ihr entsteht der Satz, den der Makler im Richtungstermin sieht. So folgen Wort und Bild aus derselben Einsicht.

### 1.3 Erfolgskriterium

Schwellen sind Setzungen.

| Nr. | Kriterium | Messung |
|---|---|---|
| E1 | Spannung gehört statt vermutet: eine Stütze mit Zeitbezug vor auf Stufe gehört oder berichtet plus eine zweite mit Zeitbezug vor aus einem anderen Schritt | P1 |
| E2 | Weiße Stelle hält gegen jeden Auftritt der Karte, die Musterliste und jeden UNIO-Makler im selben Gebiet, mit Beleg aus Zahl, Ort oder Situation | P2, P3, P5 |
| E3 | Konvention nennt mindestens drei Kennungen der Karte, jedes Merkmal steht in einer `konventionNotiz` oder in der Alternative | P4 |
| E4 | Unbequemer Teil besteht den Bio-Test | P6 |
| E5 | Kein Kernsatz übernimmt Wortlaut aus Musterbeispiel oder Regelpfad-Schablone | P3 |
| E6 | Satz für den Richtungstermin ist eine Szene beim Kunden, höchstens 25 Wörter, mit mindestens drei wörtlichen Wörtern aus einem erzählten, berichteten oder gehörten Eintrag | P8 |
| E7 | Szene des gewählten Kandidaten hat für wer und wo eine Stütze | P9 |
| E8 | Gate 1 zeichnet ohne Rückgabe ab, Ziel: höchstens eine Rückgabe bei fünf Maklern | `gate1.einsichtOk` |
| E9 | Der Makler erkennt seine Kunden im Satz: `richtung.einsichtErkannt.urteil` "ja" bei mindestens vier von fünf Maklern, "nein" bei keinem. Jedes "nein" schickt die Einsicht vor Schritt 7 zurück an Ablauf Nummer 8, mit seinem Satz als neuem Eintrag der Tafel | Schritt 6 |
| E10 | Teamzeit höchstens 90 Minuten je Makler | `einsicht.stand.dauerMin` |

---

## 2. Geprüfte Alternativen und warum sie verworfen sind

| Nr. | Alternative | Warum verworfen | Quelle | Was bleibt |
|---|---|---|---|---|
| A1 | **Der Makler wählt oder bestätigt die Einsicht** | Einsicht ist Handwerk, nicht Geschmack. Ohne Idealpunkt und Fachwissen droht Auswahlüberlastung; er würde den unbequemen Teil abwählen, Selbstbild und Komplimente sind die schwächsten Daten | R1 Kapitel 4.1 (3 intern, 0 gezeigt); Chernev u. a. 2015: https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf; Mom Test: https://mtlynch.io/book-reports/the-mom-test/ | Er begegnet der Einsicht als Szene im Richtungstermin (6) |
| A2 | **Claude schreibt allein eine Einsicht**, wie heute Schritt 1 in `api/wb-marke.js` | Heute überspringt "Neu erzeugen" Gate 1 (KETTE_IST 2.4). Ein Kandidat ohne Gegenkandidaten ist nicht prüfbar. KI macht Ergebnisse einander ähnlicher, für eine Kohorte der Hauptschaden; das Musterbeispiel im System-Prompt zieht Ergebnisse zu sich | KETTE_IST 2.4 und 3; Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290; Koto, Durchbruch aus Zuhören und Umdeuten: https://the-brandidentity.com/interview/kotos-carolyn-rush-good-brands-only-happen-with-a-good-idea | Claude entwirft drei Kandidaten, wählt nicht, schreibt keinen Beleg (8.3) |
| A3 | **Regelschablone je Objektgruppe**, heute `hmPfEinsicht` (`wb-plattform.jsx` Zeile 387 bis 411) | Konvention als fester Satz je Objektgruppe, Spannung aus festen Sätzen (`HM_PF_CEP`, `HM_PF_HINDERNIS`): zwei Makler derselben Gruppe bekommen dieselbe Einsicht | `wb-plattform.jsx` Zeile 123 bis 141 und 392 bis 404; MARKENQUALITAET Kapitel 0 | Regelpfad baut Tafel und Proben, keine Prosa (8.4); die Schablonen werden Referenz für P3 |
| A4 | **Kundenbefragung, Stakeholder-Audit** | Für eine Person unverhältnismäßig, braucht Kontaktdaten Dritter, Rechtsgrundlage offen | R1 Kapitel 5; Zerlegung Kapitel 7 Punkt 2; Vazire 2010: https://pubmed.ncbi.nlm.nih.gov/20085401/ | `fremdbild`, `vorab.kundenstimmen` als Eingänge |
| A5 | **Einsicht live im Workshop erarbeiten** (GV Brand Sprint) | Für mehrere Entscheider gebaut. Mit dem Makler allein entsteht sein Selbstbild; wer Gründe verlangt, lenkt auf leicht sagbare Kriterien | GV: https://library.gv.com/the-three-hour-brand-sprint-3ccabf4b768a; Wilson und Schooler 1991: https://doi.org/10.1037//0022-3514.60.2.181 | Karte und Switch-Zeitlinie entstehen im Workshop, gedeutet wird danach |
| A6 | **Weiße Stelle als leeres Kartenfeld** | Leere ist kein Beweis. Unterscheidung braucht Eindeutigkeit und Belege, nicht nur Abstand | Romaniuk: https://marketingscience.info/news-and-insights/brands-need-distinctive-assets; Moulard u. a. 2015: https://doi.org/10.1002/mar.20771 | Karte bleibt Eingang für Konvention und P2 |
| A7 | **Social Listening aus Bewertungen** | Für einen Wiener Makler wenig Stimmen (Lücke), Rechtsgrundlage offen; Bewertungen entstehen nach dem Abschluss und beschreiben den Makler, nicht die Kraft davor (Ableitung) | R1 Kapitel 2.1; R3 Kapitel 6 Punkt 3 | Freigegebene Kundenstimmen zählen, wenn sie eine Kraft vor der Entscheidung beschreiben |

---

## 3. Die gewählte Lösung

### 3.1 Aufbau

1. **Belegtafel.** Jeder Eingang wird in wörtliche Einträge zerlegt. Sie ist die einzige Quelle, aus der Belegtext eingesetzt wird; Urheber der Texte bleiben Schritt 1, 2 und 4.
2. **Drei Lesarten.** Drei Deutungen derselben Tafel, nicht drei Formulierungen.
3. **Neun Proben.** Regeln zählen, das Team urteilt.
4. **Eine Wahl mit Gründen.** Das Team wählt, schreibt für alle drei den Grund; der Creative Director zeichnet in Gate 1 (Schritt 6) ab.

### 3.2 Die Belegtafel

Eintrag: `{id, schritt, feld, ursprungId, frage, text, sprecher, art, zeitbezug, oeffentlich, hatZahl, hatOrt, hatSituation, pruefsumme}`.

| Präfix | Quelle | Sprecher | Art |
|---|---|---|---|
| F | 2: `antworten.*` | makler | `angegeben` bei Auswahl aus einer Liste, `erzaehlt` bei Freitext oder Sprache |
| Z | 4: `workshop.zitate[]` | wie in Schritt 4 erfasst | `gehoert` (Dritte), `berichtet` (Makler gibt einen Moment oder Kundenworte wieder), sonst `erzaehlt` |
| S | 4: `workshop.switch` | makler | `berichtet`; `ursprungId` ist die Kennung des verwiesenen Zitats |
| L, G, X | 4: `leiter`, `geschichte`, `falschWaere` | makler oder team | erzählt oder Grenze |
| W | 1: `vorab.wettbewerb`, 4: `workshop.karte` | team | beobachtet, nur Kennung, nie Name |
| N | 1: `vorab.kennzahlen` | system | gemessen |
| K, B | 1: `vorab.kundenstimmen` (nur mit Freigabe), 2: `fremdbild.antworten` (nur Rolle) | dritte | gehört |
| A | 1: `vorab.auftrittHeute` (Bio, zwölf Kacheln) | makler, öffentlich | beobachtet. Texte, die aus einer Werkbank-Vorlage stammen (etwa ein v1-Claim), führt die Tafel mit Sprecher `system` und Vermerk `v1-Vorlage`; sie zählen nie als sein Auftritt |

**Zeitbezug.** `vor` (Kraft oder Moment vor der Entscheidung des Kunden), `nach` (Urteil nach dem Abschluss, meist über den Makler), `allgemein`. Regeln schlagen vor, das Team bestätigt in Ablauf Nummer 3, jede Änderung mit Notiz.

| Quelle | Vorschlag |
|---|---|
| F `hindernis`, `ausloeser`, `faelle`, `abgeraten`, `alternative`, `alternativeKonnte` | vor |
| F `kundeSatz` | nach, wenn er Kundenworte über den Makler enthält, sonst allgemein |
| S alle Felder | vor |
| Z | aus `workshop.zitate[].frage` (04 Zeile 498): Fragen der Switch-Zeitlinie F4 bis F8 (04 Zeile 403 bis 407) ergeben vor, alle anderen allgemein. Fehlt `frage`, allgemein. `nach` setzt nur das Team, mit Notiz |
| K | nach; vor nur, wenn der Text eine Kraft vor der Entscheidung beschreibt |
| B, L, G, X, W, N, A | allgemein |

**Hörstufen.** Für die Spannung zählt nur Zeitbezug vor.

| Stufe | Bedingung |
|---|---|
| `gehoert` | Dritte sprechen selbst (K, B, Z mit Sprecher dritte) |
| `berichtet` | Der Makler gibt im Workshop einen konkreten Moment oder Kundenworte wieder (S, Z mit Sprecher makler) |
| `angegeben` | nur Fragebogen. Zugleich Obergrenze für jede Stütze mit Zeitbezug nach oder allgemein |
| `vermutung` | keine Stütze mit Zeitbezug vor |

**Ableitung statt Beleg.** Stützt sich die Spannung auf einen Eintrag mit Zeitbezug nach oder allgemein (etwa ein Lob, gelesen als Angst), trägt die Stütze `ableitung: true` und einen Satz, was daraus gelesen wurde; die Fassung nennt es ("Ableitung aus Z1"). Die Hörstufe steigt dadurch nie über angegeben.

**Weitere Regeln.** Freitexte werden in Sätze zerlegt, Zahl, Ort und Situation markiert. Einträge ohne Sprecher zählen für keine Hörprobe. Einträge gleichen Ursprungs zählen als einer. Einträge Dritter ohne Freigabe stützen, erscheinen aber nie wörtlich in einem Text, den Makler oder Öffentlichkeit sehen.

**Gegen stille Veraltung.** Jeder Eintrag trägt `pruefsumme` (SHA-256 über den normalisierten Ursprungstext, 16 Zeichen, `crypto.subtle.digest` wie in 16 Abschnitt 3.3.2). `hmEsTafelPruefen(mid)` rechnet nach, **beim Öffnen des Werkplatzes und vor der Übergabe an Gate 1**, nicht bei jedem Schreibvorgang. Weicht eine Summe ab: Tafel neu, betroffene Einträge zeigen alt und neu, `pruefung.gueltig` falsch, Wählen gesperrt, bis die Proben neu gerechnet sind. Lag `gate1.einsichtOk` schon vor, steigt `stand.version` und Gate 1 öffnet neu. Nach Freigabe 2 gilt die eingefrorene Quelle aus Schritt 16.

### 3.3 Die fünf Teile, Satz und Szene

| Teil | Gebaut aus | Regel | Verboten |
|---|---|---|---|
| `zielgruppe` | F `ausloeser`, `seite`, `kundeSatz`, `empfehler`, `bezirke`, `immotypen`; S `anlass`; N `preisband` | Anlass, Ort, Objekt, Lebensphase, dazu wie sie kommen. Fehlendes Stück als Lücke | Alter, Einkommen, Milieu-Etiketten |
| `spannung` | Einträge mit Zeitbezug vor: S `angst`, `ersterGedanke`; F `hindernis`, `faelle`; Z; K; B | Genau eine Kraft, als Widerspruch: sie wollen A und müssen B | Liste von Sorgen, Eigenschaft des Maklers, umgedeutetes Lob ohne Marke |
| `konvention` | W (mindestens fünf), F und S `alternative`, `alternativeKonnte` | Was die Auftritte der Karte auf die Spannung antworten oder verschweigen, mit Kennungen | Merkmale ohne Notiz, Namen, Klischee-Liste als Befund |
| `weisseStelle` | Spannung, Konvention, F `abgeraten`, `faelle`, `alternativeKonnte`; G `belege`; N; W `selbst`, `wunschlage` | Beantwortet die Spannung, besetzt keine Kennung, hat einen Beleg mit Zahl, Ort oder Situation. Als Handeln formuliert | Eigenschaft der Musterliste ohne Handlungsbeleg; leeres Kartenfeld |
| `unbequem` | Spannung gegen A, G `fehler`, X, Beleglage | Nennt einen Preis: aufgeben, zugeben oder ändern | Lob, Potenzial-Sätze, Vorwurf ohne Stütze |

Je Kandidat zusätzlich:
- `szene` `{wer, wo, wann, was}`, jedes Stück mit Stütze oder Lücke. Wer und wo sind Pflicht (P9).
- `satz`: der Moment beim Kunden, gebaut aus der Szene, höchstens zwei Sätze, zusammen höchstens 25 Wörter, mit mindestens drei aufeinanderfolgenden Wörtern aus einem Eintrag der Art erzählt, berichtet oder gehört. Kein Befund über den Makler ("Sie erzählen ...") und kein Analysesatz ("Wir vermuten ..."). Unter Stufe berichtet behauptet der Satz kein Gefühl der Kunden, er zeigt nur belegte Szenenstücke; die Vermutung steht in `satz.vermutung` und wird gesprochen (3.9). Ohne Anrede-Regel ist der Satz gesperrt.

Ableitung aus R1 Kapitel 2.1 (Zeigen statt Erzählen): Eine Szene lässt den Makler seine Kunden selbst erkennen; ein Befund lässt ihn nur zustimmen oder widersprechen.

### 3.4 Die Lesarten

Zulässig ist eine Lesart, wenn die Tafel mindestens zwei Einträge aus zwei Schritten für sie hat.

| Lesart | Frage an die Tafel | Hauptquellen |
|---|---|---|
| `angst` | Was fürchten sie an einem Makler oder an der Entscheidung? | S `angst`, F `hindernis`, Z, B, K |
| `anlass` | Was drängt sie, und warum jetzt? | S `anlass`, F `ausloeser`, `faelle` |
| `alternative` | Was hätten sie sonst getan, und was fehlte dort? | F und S `alternative`, `alternativeKonnte`, W |
| `wert` | Was steht jenseits des Preises auf dem Spiel? | L, F `faelle` |
| `ort` | Was heißt es, genau hier zu verkaufen oder zu kaufen? | F `graetzl`, `bezirke`, N `graetzlAnteil`, G `herkunft` |

Ableitung: Die Lesarten folgen den Kräften der Switch-Zeitlinie und der Positionierung von der Alternative her, so wählt das Team zwischen Deutungen.

### 3.5 Eigentümer- oder Käuferseite

Schritt 2 führt `seite` in sieben Stufen und eigene Käuferlisten (02 Zeile 273 bis 275). Schritt 5 übernimmt die Einteilung.

| Baustein | Eigentümer (Stufe 1 bis 3) | Käufer (Stufe 5 bis 7) |
|---|---|---|
| Entscheidung | verkaufen und den Auftrag geben | kaufen und zusagen |
| Lesart `angst` | Verkauf, Ratgeber, der am Verkauf verdient | zu viel zahlen, Finanzierung, falsche Wahl |
| Lesart `alternative` | anderer Makler, privat, Bauträger | Portal allein, anderer Makler, Bauträger direkt |
| `abgeraten` heißt | vom Verkauf abgeraten | vom Kauf abgeraten |

Stufe 4: Die Seite von Fall 1 entscheidet, sonst Eigentümer. Beidseitig: jeder Kandidat nennt seine Seite, P7 tauscht auf dieser Seite.

### 3.6 Ablauf

| Nr. | Was | Wer | Dauer (Setzung) |
|---|---|---|---|
| 1 | Start, wenn Schritt 4 abgeschlossen ist und `vorab.wettbewerb` mindestens fünf Einträge hat; sonst Meldung an Schritt 1, keine Frage an den Makler | Regeln | Sekunden |
| 2 | Tafel bauen, Zeitbezug vorschlagen | Regeln | Sekunden |
| 3 | Sprecher, Freigaben, Zeitbezug bestätigen | Team, Strategin oder Stratege | 15 Minuten |
| 4 | Vorprüfung P1. Fällt sie und gelten N1 bis N4 (4.2), wird F7 noch am selben Tag nachgeholt | Regeln, Team | 5 Minuten |
| 5 | Drei Kandidaten entwerfen, zufällige Reihenfolge, ohne Rang | Claude, sonst Regelpfad | Minuten |
| 6 | P1, P3, P4, P5, P7, P8, P9 rechnen | Regeln | Sekunden |
| 7 | P2 gegen jede Kennung der Karte, Bio-Test P6 | Team | 20 Minuten |
| 8 | Schärfen; jede Änderung rechnet die Regelproben neu | Team | 30 Minuten |
| 9 | Wählen: ein Kandidat, Gründe für alle drei. Wählbar nur mit P1, P3, P5, P6, P8, P9 bestanden und ohne Ja in P2; mit offenem P2 oder P4 vorläufig. Besteht keiner P1, höchstens ein `arbeitsstand` | Team | 10 Minuten |
| 10 | Gate 1 in Schritt 6: CD sieht Einsicht, Proben, Hörstufe, gefallene Kandidaten; Rückgabe an Nummer 8 mit Notiz | CD | etwa 5 Minuten |

Frist: zwei Arbeitstage nach dem Workshop, weil der Richtungstermin höchstens fünf Arbeitstage danach liegt (06 Zeile 96). Ohne Rang und in zufälliger Reihenfolge, weil bei drei Optionen die Mitte gewinnt (Simonson und Tversky 1992: https://doi.org/10.2307/3172740; Übertragung aufs Team ist Ableitung).

### 3.7 Nachholen und Richtungstermin

| Arbeitstag nach dem Workshop | Was geschieht |
|---|---|
| 1 | Tafel, Vorprüfung P1, gegebenenfalls Nachholen von F7. Kandidaten und Proben laufen parallel |
| 2 | Wahl oder Arbeitsstand; mit Arbeitsstand arbeitet Schritt 6 auf Status `vermutung` |
| 3 | Antwortfrist am Abend. Eine Antwort erfasst das Team mit den Werkzeugen von Schritt 4, Tafel und Proben rechnen neu |
| 4 | Gate 1 |
| 5 | Richtungstermin |

Ist bis Gate 1 keine gehörte Spannung da, entscheidet der CD mit dem Lead: (1) als Vermutung abzeichnen, Termin bleibt, die Lesart wird gesprochen (3.9); (2) auf einen Kandidaten wechseln, der P1 besteht; (3) Termin um höchstens fünf Arbeitstage verschieben, `auftrag.termine` wird aktualisiert. Die Entscheidung steht in `gate1.einsichtNotiz` (Schritt 6, Abschnitt 3.7).

### 3.8 Wer was tut

| Beteiligt | Tut | Tut nicht |
|---|---|---|
| Makler | nichts; nur bei ausgelassenem F7 eine Antwort | wählt, bestätigt, sieht keinen Kandidaten |
| Team | bestätigt Tafel, holt F7 nach, urteilt in P2 und P6, redigiert, wählt, begründet | erfindet keine Stütze, deutet kein Lob unmarkiert um |
| Lead | hält den Richtungstermin | entscheidet nicht über die Einsicht |
| Creative Director | zeichnet in Gate 1 ab oder gibt zurück | wählt nicht selbst |
| Claude | entwirft drei Kandidaten, zitiert nur Kennungen, markiert Ableitungen, setzt Lücken | wählt, rangiert, schreibt Belegtext |
| Regeln | Tafel, Zeitbezug-Vorschlag, Prüfsummen, Regelproben, Sperren | schreiben keine Prosa |

### 3.9 Was der Makler sieht und erlebt

In Schritt 5 nichts. Sichtbar wird die Arbeit an zwei Stellen.

1. **Richtungstermin (Schritt 6).** Die erste Ansicht zeigt nur `einsicht.satz`, groß, ohne Überschrift darüber, wörtliche Teile gekennzeichnet "aus Ihrem Workshop". Er sieht eine Szene mit seinen Kunden, keinen Befund über sich. Ist `satz.vermutung` gesetzt, sagt das Team einen Satz dazu: "Das haben wir so noch nicht von Ihren Kunden gehört, wir lesen es aus Ihren Antworten." Den unbequemen Teil spricht das Team aus; schriftlich steht er als Satz 2 der Begründung der Empfehlung (Satz 1: die weiße Stelle). Ableitung: Unbequemes wirkt gesprochen und im Zusammenhang als Rat, allein auf einem Bildschirm als Vorwurf.
2. **Markenbuch (Schritt 14).** Das Kapitel "Wie wir zu dieser Marke gekommen sind" zeigt alle drei Kandidaten mit Satz und Grund. Bevor der Makler es sieht, laufen Fassung, Satz und Grund der gefallenen Kandidaten durch die Klischeeprüfung von Schritt 14 (`qualitaet.klischees`); ein Treffer wird umformuliert, nicht gelöscht, damit der Grund lesbar bleibt (etwa "Diskretion" in K3, 3.10). Beleg für die Wirkung sichtbarer Arbeit: Buell und Norton 2011: https://doi.org/10.1287/mnsc.1110.1376

### 3.10 Beispiel am Fall Markus Leitner (Döbling, Zinshaus, Figur Kenner, Sie-Form)

**Grundlage.** Seed `markus` (`wb-store.jsx` Zeile 72, Fragebogen v1), Mitschrift `mt1` vom 11.09.2026 (`wb-os-data.jsx` Zeile 278), in Schritt 4 als Zitat `z1` geführt (04 Zeile 319 und 618). v1-Keys auf v2-Felder abgebildet (`abschluesse` zu `faelle`). Was v2 neu fragt, fehlt und steht als Lücke. Nichts ist erfunden. Anrede Sie nach der Setzung aus Schritt 7 (Anrede seiner Website, Seed "Sie, überall").

**Belegtafel, Auszug**

| Kennung | Schritt und Feld | Text wörtlich | Sprecher, Art | Zeitbezug |
|---|---|---|---|---|
| F1 | 2: `faelle` | "Zinshaus Sieveringer Straße, 1902, 4,2 Mio., Erbengemeinschaft kam über den Notar." | makler, erzählt | vor |
| F2 | 2: `faelle` | "Anlegerwohnung Währing, 62 m², 420.000, Bestandskunde." | makler, erzählt | vor |
| F3 | 2: `faelle` | "Altbau Hietzing, 140 m², 1,3 Mio., Diskretion war entscheidend." | makler, erzählt | vor |
| F4 | 2: `abgeraten` | "Einer Erbengemeinschaft geraten, zwei Jahre zu warten, statt unter Druck zu verkaufen. Sie kamen mit 600.000 mehr zurück." | makler, erzählt, Selbstauskunft | vor |
| F5 | 2: `hindernis` | "Provision" | makler, angegeben (Auswahl) | vor |
| F6 | 2: `ausloeser` | "Erbe", "Investment" | makler, angegeben | vor |
| F7 | 2: `bezirke`, `immotypen` | 1190, 1180, 1130; Zinshaus, Anlegerwohnung, Eigentumswohnung Altbau, Denkmalschutz und Sanierung | makler, bestätigt | allgemein |
| F8 | 2: `seite` | v1 25 von 100, in v2 etwa Stufe 2 (Abbildung ist Ableitung): Eigentümer | makler, angegeben | allgemein |
| Z1 | 4: `zitate` `z1` | "Dass sie sich nie gedrängt gefühlt haben." Ohne `frage`; laut Transkript Antwort auf "Was sagen Kunden nach dem Abschluss über Sie?" | makler, berichtet | Vorschlag allgemein, vom Team auf **nach** gesetzt (Notiz: Transkript `mt1`) |
| A1 | 1: `auftrittHeute` | "Der Markt wird lesbar." Im Seed `branding.claim`, laut KETTE_IST Zeile 73 die feste Leitidee aller Kenner aus `wb-data.jsx` Zeile 36 | **system, Vermerk v1-Vorlage** | allgemein |
| Lücken | 2: `alternative`, `alternativeKonnte`, `kundeSatz`, `empfehler`; 4: `switch`, `leiter`, `karte`, `falschWaere`, `geschichte`; 1: `wettbewerb`, `kennzahlen`, `kundenstimmen`, Bio und Kacheln aus `auftrittHeute`; 2: `fremdbild` | im Seed nicht vorhanden | | |

Befund vor jedem Kandidaten: keine Stütze mit Zeitbezug vor auf Stufe berichtet. Der einzige Workshop-Satz ist ein nachträgliches Urteil. A1 ist UNIO-Output, kein Auftritt des Maklers, und stützt nichts.

**Drei Kandidaten**

*K1, Lesart `angst`: "Der Rat, dem man misstraut"*
- Fassung: Erben in Döbling, Währing und Hietzing, die über den Notar kommen, brauchen einen Rat, ob sie verkaufen sollen. Ableitung aus Z1 und F5: Sie trauen diesem Rat wenig, solange der Ratgeber am Verkauf verdient. Markus kann ein Gegenbeispiel mit Zahl nennen (F4, Selbstauskunft).
- Spannung: "Erben, die über den Notar kommen, wollen wissen, ob sie überhaupt verkaufen sollen, und müssen das ausgerechnet den fragen, der nur am Verkauf verdient." Stützen F1 (wer), F5 (vor, angegeben), Z1 (nach, `ableitung: true`: "aus dem Lob 'nie gedrängt' gelesen, dass Druck vorher gefürchtet wird").
- Weiße Stelle: "Er rät Erben vom schnellen Verkauf ab, wenn Warten mehr bringt, und kann das an einem eigenen Fall mit Zahl zeigen." Stütze F4.
- Unbequem: "Seine Antwort auf dieses Misstrauen ist bisher ein einziger Fall, erzählt und ohne Unterlage. Trägt die Stelle, muss er jedes Mal sagen, wenn Warten besser ist, und es festhalten, auch wenn der Auftrag dann ausbleibt." Stütze F4 (Beleglage). Ob sein heutiger Auftritt dem widerspricht: Lücke, "Kommt aus Schritt 1: vorab.auftrittHeute (Bio, zwölf Kacheln)".
- Szene: wer, eine Erbengemeinschaft, die über den Notar kommt (F1); was, die Frage, ob verkauft werden soll (F4); wo und wann: Lücke, "Kommt aus Schritt 4: F7".
- Satz: "Eine Erbengemeinschaft kommt über den Notar und will von Ihnen wissen, ob sie verkaufen soll. Verdienen würden Sie nur am Ja." (21 Wörter, wörtlich "über den Notar" aus F1; `vermutung: true`, kein Gefühl behauptet).

*K2, Lesart `anlass`: "Druck am Erbe"*
- Spannung: "Die Erbengemeinschaft steht unter Druck zu verkaufen, und Warten könnte mehr bringen." Stützen F6, F4, beide angegeben oder erzählt aus Schritt 2.
- Weiße Stelle: "Bei ihm dürfen Erben warten, wenn der Verkauf unter Druck Geld kosten würde." Stütze F4.
- Unbequem: "Warten klingt nach Zögern." Ohne Stütze, als Vermutung markiert.
- Szene: wer, eine Erbengemeinschaft (F4); wo, wann, was: Lücke.

*K3, Lesart `wert`: "Verkaufen ohne Aufsehen"*
- Spannung: "Eigentümer im Altbau wollen verkaufen, ohne dass das Grätzl davon erfährt." Stütze F3.
- Weiße Stelle: Diskretion. Stütze F3.
- Unbequem: Was leise bleiben soll, lässt sich in einem öffentlichen Feed nicht zeigen.
- Szene: wo, Altbau in Hietzing (F3); wer, wann, was: Lücke.

**Proben, nachgerechnet** (P3 je Feld einzeln, Werte in Prozent, J Jaccard, C Enthaltensein, L längste gemeinsame Wortfolge; Rechnung mit `hmPfNorm` und Trigrammen wie `wb-plattform.jsx` Zeile 982 bis 988)

| Probe | K1 | K2 | K3 |
|---|---|---|---|
| P1 | **fällt**, angegeben: F5 ist ein Auswahlwort, Z1 nur Ableitung, keine Stütze auf Stufe berichtet | **fällt**, F4 und F6 beide aus Schritt 2 | **fällt**, nur F3 |
| P2 | offen, Karte fehlt. Musterliste: Treffer "gegen die eigene Provision geraten", hält nur als belegtes Handeln (F4, Zahl und Situation, Unterlage offen); Kohorte ohne zweiten Treffer | offen; Treffer "sagt auch Nein", hält nur über F4 | offen; Treffer "Diskretion", kein Handlungsbeleg: **fällt** |
| P3 | besteht: Spannung, weiße Stelle und Satz gegen alle Referenzen J 0, C 0, L höchstens 1 | Hinweis: Spannung gegen Musterbeispiel C 20, L 4; die Wortfolge "unter Druck zu verkaufen" steht in F4, also keine Sperre | besteht |
| P4 | Lücke, Karte fehlt | Lücke | Lücke |
| P5 | besteht mit Vorbehalt: F4 Selbstauskunft, Aufgabe Unterlage | wie K1 | schwach: F3 ohne Zahl zur Diskretion |
| P6 | besteht: "ein einziger Fall, ohne Unterlage" käme nie in seine Bio | unklar, "dürfen warten" ist bio-tauglich | fällt, Kompliment |
| P7 | drei Lesarten; K1 und K2 teilen F4; K1 im Namenstausch mit Elif falsch, also spezifisch | besteht knapp | fällt im Tausch: passt auf jeden Makler |
| P8 | besteht: Szene, 21 Wörter, wörtlich aus F1 (erzählt), kein Gefühl behauptet | kein Satz: kein erzähltes Fragment mit Szene | kein Satz |
| P9 | fällt: wo fehlt | fällt | fällt: wer fehlt |

Zur Einordnung der alten Fassung, nachgerechnet: Die Spannung "Sie wollen beraten werden, ohne gedrängt zu werden, und die Provision steht im Raum, bevor das erste Gespräch beginnt." hatte gegen die Spannung im Musterbeispiel (MARKENQUALITAET Zeile 229) J 5,5, gegen `HM_PF_HINDERNIS["Provision"].satz` (`wb-plattform.jsx` Zeile 135) J 13,0, gegen beide C 17,6 und eine gemeinsame Wortfolge von fünf Wörtern. Fassung 1 meldete "besteht" und verschwieg sogar den Hinweis. Mit der neuen P3 ist sie gesperrt (L 5).

**Folge: Alle fallen in P1, F7 wird nachgeholt.** N1 bis N4 gelten: `switch.angst` ist Lücke, weil F7 im Seed-Workshop nicht gestellt wurde, und F5 ist eine Stütze vor aus Schritt 2. Wortlaut nach 04 Zeile 406: "Sie schrieben: Provision. Wann genau kam das auf, und wer hat es gesagt?"

**Arbeitsstand: K1.** Grund: "Stufe angegeben: Die Spannung steht auf einem Auswahlwort und einem nachträglichen Lob, das wir als Angst lesen. K1 bleibt Arbeitsstand, weil die weiße Stelle ein Handeln gegen den schnellen Abschluss ist, das nur mit eigenem Beleg zu behaupten ist, und weil der unbequeme Teil eine Folge hat: Aus einem Fall muss eine Gewohnheit mit Unterlagen werden."

K2 fiel, weil sie dieselbe Hörstufe hat, im Bio-Test nicht vom Kompliment zu trennen ist und P3 die Nähe zum Musterbeispiel meldet; ihr Anlass Erbe geht in die Zielgruppe ein. K3 fiel, weil die weiße Stelle ein Kompliment ist, auf der Musterliste steht und einer öffentlichen Personenmarke widerspricht.

**Tauschprobe des Nachholens** (keine Antwort liegt vor):

| Antwort | Tafel | Ausgang |
|---|---|---|
| a. Ein Satz eines Erben über Provision oder Motiv | neues Z, `frage: "F7"`, berichtet, vor | K1 besteht P1, `vermutung` fällt; durchgespielt in 3.12 |
| b. Ein Satz über Uneinigkeit oder Zeitdruck in der Erbengemeinschaft | neues Z, berichtet, vor | K2 besteht P1, die Wahl kippt zu K2 |
| c. Kein Satz erinnerlich | kein neuer Eintrag | Stufe bleibt, CD entscheidet nach 3.7 |

**Ergebnis für Markus, Stand heute:** Status `arbeitsstand`, Vermutung, Hörstufe angegeben. `zielgruppe`: Erbengemeinschaften und Anleger mit Zinshaus oder Altbauwohnung in Döbling, Währing und Hietzing, Anlass Erbe oder Anlage (F6), sie kommen über den Notar oder als Bestandskunden (F1, F2), Lebensphase: "Kommt aus Schritt 4: workshop.switch". `spannung`, `weisseStelle`, `unbequem`, `szene`, `satz` wie K1. `konvention`: "Kommt aus Schritt 1: vorab.wettbewerb"; der Konventionssatz des Musterbeispiels ist eine Hypothese ohne Karte und darf nicht in den Ausgang. Offen: P1, P2, P4, P9 und die Unterlage zu F4 (sperrt jede öffentliche Nutzung der Zahl 600.000, Schritt 7 `beweise.pruefstatus`).

### 3.11 Zweites Kurzbeispiel: Elif Demir (Favoriten, Käuferseite)

Seed `elif` (`wb-store.jsx` Zeile 73): `seite` 65 von 100, in v2 etwa Stufe 5, also Käuferfassung (Ableitung). Anrede Sie nach Setzung aus Schritt 7.

| Kennung | Feld | Text wörtlich | Art | Zeitbezug |
|---|---|---|---|---|
| F1 | `faelle` | "Erstbezug Laxenburger Straße, 78 m², 389.000, junge Familie über Instagram." | erzählt | vor |
| F2 | `hindernis` | "Zweifel am Preis" (v1-Label; die v2-Käuferliste hat es nicht, am nächsten liegt "Angst, zu viel zu zahlen", 02 Zeile 275) | angegeben (Auswahl) | vor |
| F3 | `ausloeser` | "Familie wächst", "Umzug aus beruflichen Gründen" | angegeben | vor |
| F4 | `kundeSatz` | "Elif hat uns nie das Gefühl gegeben, zu wenig zu wissen." | berichtet | nach |
| G1 | `geschichte.wendepunkt` | "Ein Erstkäufer-Paar hat mir nach der Übergabe geschrieben, dass ich die Einzige war, die ihnen die Finanzierung erklärt hat." | erzählt | nach |
| G2 | `geschichte.fehler` | "... Seitdem zeige ich drei Vergleichspreise und sage Nein, wenn es nicht passt." | erzählt | allgemein |

- Spannung (Lesart `angst`): Kaufentscheidung der wachsenden Familie gegen die Unsicherheit beim Preis, Stützen F2 und F3, beide Auswahl aus Schritt 2. P1 fällt wie bei Markus; F4 und G1 sind nachträgliche Urteile.
- Satz: **Lücke**, "Kommt aus Schritt 4: F7". F2 ist ein Auswahllabel und zählt nicht als ihre Worte (P8); der einzige erzählte Fall F1 nennt keinen Moment vor der Zusage. Einen Satz wie "Vor der Zusage fragt sie, ob der Preis stimmt" zu bauen hieße, eine Szene zu erfinden.
- `abgeraten`: Lücke. G2 sieht ähnlich aus, beschreibt aber einen Preis auf der Verkäuferseite, und wem das Nein gilt, ist offen; das Team klärt das im Protokoll von Schritt 4, bevor G2 als Beleg zählt.
- Szene: wer, junge Familie im Erstbezug (F1); wo, Laxenburger Straße (F1, `hatOrt`). P9 bestünde, obwohl die Spannung offen ist. Deshalb werden Szene und Spannung getrennt geprüft.
- Nachholen: stellbar; Wortlaut nach 04: "Sie schrieben: Zweifel am Preis. Wann genau kam das auf, und wer hat es gesagt?"

### 3.12 Zielbild: Durchspiel mit Antwort a (angenommen)

Damit Team und Claude sehen, wie eine bestandene Einsicht aussieht. **Alles mit "angenommen" liegt nicht vor, ist nicht über Markus behauptet und darf nie in einen Ausgang.** Die übrigen Einträge sind die aus 3.10.

**Angenommene Antwort auf F7**, telefonisch, zurückgelesen: "Beim ersten Treffen in der Kanzlei des Notars, bevor wir über das Haus geredet haben. Der älteste Erbe hat gesagt: Sie verdienen ja nur, wenn wir verkaufen." Erfasst in `workshop.zitate` mit `frage: "F7"`, `nachgeholt: {schritt: 5, datum}`, Sprecher makler. Tafel: Za, berichtet, Zeitbezug vor (Regel über `frage`), `hatOrt`, `hatSituation`.

**Kandidat K1, gewählt**

| Teil | Inhalt | Stützen |
|---|---|---|
| Zielgruppe | Erbengemeinschaften mit einem Zinshaus in Döbling, Währing oder Hietzing, die über den Notar kommen und noch nicht entschieden haben, ob sie verkaufen. Lebensphase: Lücke bis `switch.anlass` | F1, F6, F7 |
| Spannung | "Erben, die über den Notar kommen, wollen wissen, ob sie überhaupt verkaufen sollen, und müssen das ausgerechnet den fragen, der nur am Verkauf verdient." | Za (berichtet, vor, Schritt 4), F5 (angegeben, vor, Schritt 2) |
| Konvention | aus den Notizen der Karte, in der Form "W1, W3 und W4 zeigen [Merkmal laut Notiz]; keine Kennung beantwortet, ob verkauft werden soll". Inhalt kommt aus Schritt 1 und ist hier nicht angenommen | W1 bis W5 |
| Weiße Stelle | "Er rät Erben vom schnellen Verkauf ab, wenn Warten mehr bringt, und kann das an einem eigenen Fall mit Zahl zeigen." | F4 |
| Unbequem | "Das Misstrauen gilt seinem Motiv, nicht seiner Kenntnis. Seine Antwort ist bisher ein Fall, erzählt, ohne Unterlage. Trägt die Stelle, muss er jedes Mal sagen, wenn Warten besser ist, und es festhalten, auch wenn der Auftrag dann an einen anderen geht." | Za, F4 |
| Szene | wer: der älteste Erbe einer Erbengemeinschaft, die über den Notar kam; wo: Kanzlei des Notars; wann: erstes Treffen, bevor über das Haus gesprochen wird; was: "Sie verdienen ja nur, wenn wir verkaufen." | Za, F1 |
| Satz | "Kanzlei des Notars, erstes Treffen. Der älteste Erbe sagt: Sie verdienen ja nur, wenn wir verkaufen." | Za, 16 Wörter, `vermutung: false` |

**Proben:** P1 besteht, Stufe berichtet (Za aus Schritt 4 plus F5 aus Schritt 2, verschiedener Ursprung). P2 besteht unter der Annahme, dass das Team bei allen fünf Kennungen "nein" urteilt; der Musterlisten-Treffer hält als belegtes Handeln (F4). P3 besteht (J 0, C 0, L höchstens 1 gegen alle Referenzen). P4 als Lücke mit Termin in Schritt 1. P5 besteht mit Aufgabe Unterlage. P6 besteht. P7 besteht (im Tausch mit Elif falsch). P8 besteht (Szene, wörtlich aus Za, keine Vermutungsmarke nötig). P9 besteht (alle vier Stücke belegt). Status `gewaehlt`, `bereit` nach Eingang der Karte.

**Warum das Studio-Niveau ist (Ableitung aus R1 Kapitel 2.1 und 4.9):** Der Makler sieht im Richtungstermin keinen Befund, sondern einen Moment, den er selbst erlebt hat, in den Worten seines Kunden. Dieselbe Szene gibt Schritt 6 ein Bild ohne Stock-Look (Kanzlei, erster Termin, ein Satz am Tisch) und dem Territorium "Haltung gegen den eigenen Vorteil" Beleg und Motiv aus einer Quelle. Der unbequeme Teil ist kein Vorwurf, sondern eine Arbeitsanweisung mit Preis. Und die weiße Stelle ist nur behauptbar, weil F4 existiert; ohne F4 fiele K1 in P5.

---

## 4. Fragen an den Makler

### 4.1 Regelfall: keine Frage

Nach Schritt 4 liegt jeder Eingang vor. Eine Frage würde doppelt fragen oder eine Deutung vom Makler verlangen (A1).

### 4.2 Nachholen der Workshop-Frage F7

Schritt 4 fragt in F7 schon nach Moment und Sprecher: "Sie schrieben: {hindernis}. Wann genau kam das auf, und wer hat es gesagt?", Pflicht, sonst "Was hätte sie fast abgehalten?" (04 Zeile 179 und 406). Schritt 5 stellt **keine eigene Frage**. Er holt F7 nach, wenn sie im Workshop ausgelassen wurde, und nur dann, wenn alle Bedingungen gelten:

| Nr. | Bedingung | Warum |
|---|---|---|
| N1 | Vorprüfung P1 fällt für jede zulässige Lesart | sonst ohne Wirkung |
| N2 | `workshop.switch.angst` ist eine Lücke, weil F7 nicht gestellt wurde | sonst fragt es einen vorhandenen Wert doppelt |
| N3 | Es gibt eine Stütze mit Zeitbezug vor aus Schritt 1 oder 2 | dann fehlt genau die berichtete Stütze aus Schritt 4, die die Antwort liefert; sonst fiele P1 trotz Antwort |
| N4 | F7 wurde nicht mit "weiß nicht" beantwortet | höchstens eine Nachfrage je Frage |

| Frage | Wirkt auf | Warum |
|---|---|---|
| F7 aus Schritt 4, wörtlich mit `{hindernis}` und in der Anrede nach Setzung aus Schritt 7 | `workshop.zitate[]` mit `frage: "F7"` und `nachgeholt: {schritt: 5, datum}` (04 Zeile 498), dort `switch.angst`; hier ein Eintrag Z mit Stufe berichtet und Zeitbezug vor, daraus `einsicht.spannung`, `pruefung.stufeHoer`, `satz.vermutung`, womöglich `kandidaten[].gewaehlt` | Tauschprobe in 3.10: drei Antworten, drei verschiedene Ausgänge. Konkreter vergangener Moment statt Meinung (Critical Incident, NN/g: https://www.nngroup.com/articles/critical-incident-technique/) |

Erfassung mit den Werkzeugen von Schritt 4, damit Schritt 4 Urheber aller Zitate bleibt: telefonisch mit Zurücklesen (`quelle: zurueckgelesen`) oder als Sprachnachricht im bestehenden Link (`quelle: aufnahme`, nur mit Einwilligung zur Aufzeichnung). Frist: Abend von Arbeitstag 3.

### 4.3 Abgeleitet statt gefragt

| Was man fragen könnte | Woraus es kommt |
|---|---|
| Wer ist Ihre Zielgruppe? | `ausloeser`, `bezirke`, `immotypen`, `seite`, `kundeSatz`, `empfehler`, `preisband` |
| Wer ist Ihre Konkurrenz? | `vorab.wettbewerb`, `workshop.karte`, `alternative` |
| Was macht Sie besonders? | `abgeraten`, `alternativeKonnte`, `faelle`, `geschichte.belege` |
| Was bewegt Ihre Kunden vorher? | `hindernis`, `switch.angst`, `zitate`, `kundenstimmen`, nur mit Zeitbezug vor |
| Käufer oder Verkäufer? | `antworten.seite` |
| Stimmt diese Einsicht? | Reaktion im Richtungstermin, `richtung.einsichtErkannt` |

---

## 5. Eingang und Ausgang

### 5.1 Eingang nach Vertrag

| Feld | Von | Genutzt für |
|---|---|---|
| `vorab.wettbewerb` | 1 | W, Konvention, P2, P4 |
| `vorab.kennzahlen` | 1 | N, Beleg der weißen Stelle, Objekt in der Zielgruppe, P5 |
| `antworten.faelle` | 2 | Szene, Beleg, Anlass, Seite von Fall 1 |
| `antworten.alternative`, `alternativeKonnte` | 2 | Konvention, weiße Stelle |
| `antworten.abgeraten` | 2 | weiße Stelle, nach Seite gedeutet |
| `antworten.hindernis` | 2 | Spannung, Bedingung N3, Platzhalter in F7 |
| `antworten.ausloeser`, `kundeSatz`, `empfehler` | 2 | Zielgruppe, Szene |
| `antworten.seite` | 2 | Fassung der Lesarten (3.5) |
| `workshop.zitate` | 4 | Z, Spannung, Satz, Zeitbezug über `frage` |
| `workshop.switch` | 4 | S, Spannung, Szene, N2 |
| `workshop.leiter`, `karte`, `falschWaere`, `geschichte` | 4 | L, W, X, G |

### 5.2 Ergänzte Eingänge (Abweichung, begründet)

| Feld | Von | Grund | Symmetrie |
|---|---|---|---|
| `antworten.bezirke`, `graetzl`, `immotypen` | 2 | Zielgruppe und Szene brauchen Ort und Objekt | 2 nennt 5 als Nachfolger |
| `antworten.anredeJeKanal` | 2 | Anrede-Setzung für Satz und F7, wie Schritt 7 | wie oben |
| `fremdbild` | 2 | Hörprobe, nur Rolle, nie Kontakt | wie oben |
| `vorab.kundenstimmen`, `vorab.auftrittHeute`, `auftrag.termine`, `auftrag.einwilligungen` | 1 | stärkste Hörstufe; Widerspruch zum heutigen Auftritt für `unbequem`; Frist und Einwilligung für F7 | 1 nennt 5 als Nachfolger |
| Extern: Einsicht-Felder der anderen UNIO-Makler | Store `marke2[*]` | Kohorte in P2 und P3 | extern wie in 6 und 14 |

Nicht aufgenommen: `antworten.unity`, `gruende` (Lesart für Territorien, Wert-Leiter vollständiger in `workshop.leiter`).

### 5.3 Ausgang nach Vertrag

**Nachfolger: 6, 7, 8, 9, 14.** 8 liest `einsicht.spannung` für `story.spannung` (08 Zeile 372 und 586, Abweichung AE1 in 08 Zeile 761), 9 liest `zielgruppe` und `spannung` als Verweise (09 Zeile 90, 91 und 357). In der Zerlegung nachgezogen. **Keine Kante zu 16:** Schritt 16 friert `einsicht` über das Markenbuch (14) ein; die Spalte "5" in 16 Zeile 117 nennt die Herkunft des Feldes, keinen Vorgänger. Keine Kante zu 17.

| Feld | Inhalt | Abnehmer |
|---|---|---|
| `einsicht.zielgruppe` | Bild aus Anlass, Ort, Objekt, Lebensphase | 6, 7 (`fuerWen`), 9 (`publikumAlsPerson`), 14 |
| `einsicht.spannung` | die eine Spannung | 6, 7, 8 (`story.spannung`), 9 (`brief.einsicht`), 14 |
| `einsicht.konvention` | mit Kennungen der Karte | 6, 7 (`andersAls`, nie als Name), 14 |
| `einsicht.weisseStelle` | belegtes Handeln | 6 (Empfehlung Satz 1), 7 (`weil`), 14 |
| `einsicht.unbequem` | der Preis | 6 (Empfehlung Satz 2), 7 (`falschWaere`, Werte "nie"), 14 |
| `einsicht.stuetzen[]` | `{aussage, beleg wörtlich, quelle}` | 6 (Gate 1), 7 (`beweise`), 14 |
| `einsicht.kandidaten[3]` | `{fassung, gewaehlt, grund}` | 6 (`verworfenWeil`), 14 (Kapitel 1) |

Die Felder der obersten Ebene sind die Projektion des gewählten Kandidaten, kein eigener Wert.

### 5.4 Ergänzte Ausgangsfelder (Abweichung, begründet)

| Feld | Grund | Abnehmer |
|---|---|---|
| `einsicht.satz`, `satz.vermutung` | Das Erlebnis verlangt "einen Satz in seinen Worten"; `vermutung` steuert, ob das Team die Lesart ausspricht | 6 (erste Ansicht), 14 |
| `einsicht.szene` | Wort und Bild aus einer Quelle | 6 (Rohskizze, Serienidee) |
| `einsicht.tafel[]` | einzige Belegquelle, nachprüfbar | 6, 14 (Ankerliste T1, 14 Zeile 609) |
| `stuetzen[]` erweitert | plus `id`, `teil`, `art`, `zeitbezug`, `ableitung`, `ableitungSatz` für P1 und Gate 1 | wie 5.3 |
| `kandidaten[]` erweitert | plus `id`, `lesart`, `seite`, `teile`, `satz`, `szene`, `stuetzen`, `stufeHoer`, `proben`, `status` für Leitfrage 5 und Kapitel 1 | 6, 14 |
| `einsicht.pruefung` | Befunde statt Eindrücke | 6 (`einsichtOk`), 14 (`qualitaet`) |
| `einsicht.stand` | Version, wer gewählt hat, Dauer (E10) | 6 (`territorien.stand.einsichtVersion`), 14 |

### 5.5 Datenobjekt

Speicherort `hmStore`, `marke2[mid].einsicht`. Das Feld `plattform.einsicht` aus MARKE_SCHEMA v1 behält Namen und Bedeutung seiner vier Felder (Zerlegung 4.2).

```js
einsicht: {
  // Projektion des gewählten Kandidaten, nur von hmEsWaehlen geschrieben
  zielgruppe: "", spannung: "", konvention: "", weisseStelle: "", unbequem: "",
  satz: "", szene: { wer: "", wo: "", wann: "", was: "" },
  stuetzen: [{ id: "F5", teil: "spannung", aussage: "", beleg: "", quelle: "2: antworten.hindernis",
               art: "angegeben", zeitbezug: "vor", ableitung: false, ableitungSatz: "" }],
  kandidaten: [{
    id: "K1", reihenfolge: 0, lesart: "angst", seite: "eigentuemer", fassung: "",
    teile: { zielgruppe: "", spannung: "", konvention: "", weisseStelle: "", unbequem: "" },
    satz: { text: "", woertlichAus: "F1", anredeRegel: "owner" | "setzung7" | "", vermutung: true },
    szene: { wer: { text: "", stuetzeId: "" }, wo: { text: "", stuetzeId: "" },
             wann: { text: "", stuetzeId: "" }, was: { text: "", stuetzeId: "" } },
    stuetzen: [], stufeHoer: "angegeben",
    proben: { P1: "", P2: "", P3: { J: 0, C: 0, L: 0, gegen: "" }, P4: "", P5: "", P6: "", P7: "", P8: "", P9: "" },
    status: "entwurf" | "waehlbar" | "arbeitsstand" | "gewaehlt" | "gefallen", gewaehlt: false, grund: ""
  }],
  tafel: [{ id: "Z1", schritt: 4, feld: "workshop.zitate", ursprungId: "z1", frage: "", text: "",
            sprecher: "makler", vermerk: "", art: "berichtet", zeitbezug: "nach", zeitbezugVon: "team",
            zeitbezugNotiz: "", oeffentlich: false, hatZahl: false, hatOrt: false, hatSituation: false,
            pruefsumme: "", veraendert: null }],
  pruefung: { bereit: false, gueltig: true, offen: [], stufeHoer: "angegeben",
              nachholen: { status: "nicht noetig" | "nicht stellbar" | "gesendet" | "beantwortet" | "ausgeblieben",
                           bedingungen: { N1: false, N2: false, N3: false, N4: false }, zitatId: "" } },
  stand: { quelle: "claude" | "regeln" | "team", version: 1, gewaehltVon: "", datum: "ISO", dauerMin: 0 }
}
```

Regeln: Die oberste Ebene setzt nur `hmEsWaehlen`; `hmEsSpeichern` weist direkte Schreibversuche ab. Beim Arbeitsstand bleibt sie leer, Schritt 6 liest den Kandidaten mit `status: "arbeitsstand"`. `beleg`, `quelle`, `art`, `zeitbezug` setzt immer der Code aus der Tafel. Lücken in der Form von `HM_PF_LUECKE` (`wb-plattform.jsx` Zeile 9), mit Schritt: "Kommt aus Schritt 4: ...".

### 5.6 Hinweise an Nachbarschritte

1. **Schritt 4:** keine Änderung nötig. Schritt 5 nutzt die vorhandenen Felder `workshop.zitate[].frage` und `nachgeholt` (04 Zeile 498).
2. **Schritte 6, 14, 15:** Beispiel Markus in dieser Fassung angeglichen (Satz, Status "Arbeitsstand, Vermutung", weiße Stelle, unbequemer Teil, Abschnittsverweise 3.6, 3.9, 3.10).
3. **Schritt 6:** `richtung.einsichtErkannt` trägt die Schwelle aus E9.
4. **Zerlegung:** Nachfolger von 5 sind 6, 7, 8, 9, 14; 8 und 9 führen 5 als Vorgänger.
5. **Schritt 1:** liefert `vorab.wettbewerb` mit mindestens fünf Kennungen vor dem Workshop, und `vorab.auftrittHeute` trennt eigene Texte des Maklers von Werkbank-Output.
6. **Schritt 8:** Der Hinweis in 08 Zeile 1048 (P3 gegen Schablonen) ist umgesetzt.

---

## 6. Qualitätsprüfung im Schritt

Neun Proben, Schwellen sind Setzungen.

| Probe | Regel | Wer | Folge |
|---|---|---|---|
| P1 Hörprobe | Nur Zeitbezug vor zählt. Bestehen: eine Stütze auf Stufe gehört oder berichtet und eine zweite aus einem anderen Schritt mit anderer `ursprungId`. Ableitungen tragen `ableitung: true` und sind in der Fassung benannt, sonst fällt P1 auch dann | Regeln, Team bestätigt Zeitbezug | nicht wählbar; alle fallen: Nachholen nach 4.2 oder Arbeitsstand |
| P2 Mitbewerber und Muster | (a) Musterliste (Setzung, ergänzt aus den ersten Karten): ehrliche Beratung, kein Verkaufsdruck, ohne Druck, Diskretion, Erfahrung, Marktkenntnis, persönliche Betreuung, transparente Provision, bester Preis, Vertrauen, **gegen die eigene Provision geraten**, **sagt auch Nein**. Ein Treffer hält nur als belegtes Handeln (P5 mit Situation und Zahl). Bei den zwei letzten zusätzlich P3 gegen die Kohorte: trägt ein UNIO-Makler im selben oder angrenzenden Bezirk eine weiße Stelle mit demselben Muster, Sperre. (b) Regeln suchen die Muster in den `konventionNotiz`. (c) Je Kennung urteilt das Team: könnte dieser Auftritt die weiße Stelle behaupten und belegen? ja, nein, unklar mit Notiz | Team, Regeln für (a), (b) | Ja oder Treffer ohne Handlungsbeleg: nicht wählbar |
| P3 Schablonen und Kohorte | Je Feld einzeln (Spannung, weiße Stelle, Satz), nach Entfernen fester Marken. Referenzen: Musterbeispiel MARKENQUALITAET 5.1 (Zeile 222 bis 231); alle Regelpfad-Schablonen, ausgewertet mit dem Kontext des Maklers: `HM_PF_CEP` und `HM_PF_CEP_STANDARD` (`wb-plattform.jsx` Zeile 123 bis 132), `HM_PF_HINDERNIS` (134 bis 141), `HM_PF_FIGUR` (ab 207), feste Leitideen (`wb-data.jsx` Zeile 36 bis 66); Kohorte im selben oder angrenzenden Bezirk. Maße: J (Jaccard, `hmPfJaccard`), C (Anteil der Kandidaten-Trigramme, die in der Referenz vorkommen), L (längste gemeinsame Wortfolge). **Sperre:** L ab 4, C ab 30, gegen die Kohorte J ab 15. **Hinweis:** C ab 15 oder J ab 5. Wortfolgen, die wörtlich in einem Tafel-Eintrag dieses Maklers mit Sprecher makler oder dritte stehen, zählen nicht, weil das Musterbeispiel seine Antworten zitiert | Regeln | Sperre: nicht wählbar |
| P4 Konvention | mindestens fünf W; mindestens drei Kennungen; jedes Merkmal in einer Notiz oder Alternative; kein Eigenname, keine Branchenwörter ohne Notiz | Regeln | sonst Lücke |
| P5 Beleg | eine Stütze aus `faelle`, `abgeraten`, `alternativeKonnte`, `geschichte.belege` oder `kennzahlen` mit Zahl, Ort oder Situation, nach Seite gedeutet; Selbstauskunft erzeugt eine Aufgabe Unterlage | Regeln | ohne Stütze nicht wählbar |
| P6 Bio-Test | Würde er es in seine Bio schreiben? Ja heißt Kompliment. Unbequem nennt einen Preis mit Stütze; weiße Stelle verlangt nichts aus `falschWaere` | Team | Kompliment: nicht wählbar |
| P7 Verschiedenheit und Tausch | drei Lesarten; je zwei Kandidaten teilen höchstens die Hälfte der Stützen; J der Spannungen unter 30. Namenstausch mit einem UNIO-Makler derselben Seite: bleibt die Fassung wahr, fällt der Kandidat. Vorab automatisch: Fassung und Satz enthalten einen Ort, ein Objekt oder eine Zahl | Regeln, Team im Zweifel | neuer Entwurf für den ähnlichsten; Tausch wahr: nicht wählbar |
| P8 Satz und Stil | Szene beim Kunden, höchstens zwei Sätze und 25 Wörter; mindestens drei aufeinanderfolgende Wörter aus einem Eintrag der Art erzählt, berichtet oder gehört (**Auswahlwerte wie "Provision" oder "Zweifel am Preis" zählen nicht**, Dritte nur mit Freigabe); verboten sind Befundformeln ("Sie erzählen", "Wir vermuten", "Unsere Lesart"); unter Stufe berichtet kein Gefühlswort über Kunden (fürchten, Angst, Sorge, misstrauen, zweifeln); Anrede nach Regel, ohne Regel gesperrt; keine Gedankenstriche, Ausrufezeichen, Emojis, keine Wörter der Klischee-Liste in allen Feldern aller Kandidaten | Regeln | nicht wählbar |
| P9 Szene | `wer` und `wo` mit `stuetzeId` in der Tafel und dem Merkmal des Eintrags; `wann`, `was` dürfen Lücke mit Termin an Schritt 6 sein | Regeln | ohne wer und wo nicht wählbar |

**Bereit für Gate 1**, wenn der gewählte Kandidat P1, P2, P3, P5, P6, P8, P9 besteht, P4 besteht oder als Lücke mit Termin in Schritt 1 steht, P7 für alle drei bestanden ist, `pruefung.gueltig` wahr ist und jeder Kandidat einen Grund hat. Ein Arbeitsstand ist nie bereit. Belegtreue: jeder `beleg` ist Zeichen für Zeichen Teil des Tafel-Eintrags derselben Kennung.

---

## 7. Typische Fehler und wie sie verhindert werden

| Fehler | Verhindert durch |
|---|---|
| Lob nach dem Abschluss wird zur Angst davor umgedeutet | Zeitbezug, P1, benannte Ableitung |
| Auswahlwort oder Selbstauskunft gilt als belegte Spannung oder als seine Worte | Hörstufen, Art `angegeben`, P8 |
| Spannung ist Schablone oder Musterbeispiel, nur umgestellt | P3 mit C und L gegen alle Schablonen |
| Werkbank-Output gilt als Auftritt des Maklers (A1) | Sprecher `system`, Vermerk v1-Vorlage |
| Satz im Termin ist ein Befund statt einer Szene | Bauregel 3.3, P8 |
| Zielgruppe als Demografie | vier Stücke, Lücke statt Füllung |
| Käufer-Makler bekommt Eigentümer-Einsicht | 3.5, P7 auf derselben Seite |
| Konvention als Branchenklischee | P4, Regelpfad ohne feste Konventionssätze |
| Weiße Stelle ist, was alle behaupten, oder leeres Kartenfeld | P2 mit erweiterter Musterliste, P5 |
| Szene bleibt leer, Schritt 6 erfindet Bilder | P9 |
| Drei Fassungen derselben Idee | Lesarten, P7 |
| Geglättete Zahl | Claude zitiert nur Kennungen, Belegtreue |
| Tafel veraltet still | Prüfsumme beim Öffnen und vor Gate 1, neue Version |
| Schritt 5 fragt, was Schritt 4 schon gefragt hat | nur Nachholen von F7 unter N1 bis N4 |
| Gefallener Kandidat mit Klischee im Markenbuch | Klischeeprüfung von 14 vor Kapitel 1 (3.9) |
| Einsicht wird nach Gate 1 still neu erzeugt | Sperre nach `einsichtOk`, jede Änderung neue Version |

---

## 8. Umsetzung in der Werkbank

### 8.1 Dateien

| Datei | Änderung |
|---|---|
| `ui_kits/werkbank/wb-einsicht.jsx` (neu) | Komponente `EinsichtWerkplatz` und Logik: `hmEsTafel`, `hmEsZeitbezug` (über `frage`), `hmEsHash` (async), `hmEsTafelPruefen`, `hmEsLesarten`, `hmEsSeite`, `hmEsHoerstufe`, `hmEsNachholen` (Bedingungen und F7-Wortlaut aus Schritt 4), `hmEsKandidatenRegeln`, `hmEsProben`, `hmEsWaehlen`, `hmEsSpeichern`, `hmSelbsttestEinsicht`. Konstanten `HM_ES_MUSTER` (P2), `HM_ES_SCHABLONEN` (P3, beim Laden aus den Konstanten in `wb-plattform.jsx` und `wb-data.jsx` gebaut), `HM_ES_GEFUEHL` (P8). Export über `Object.assign(window, ...)`, kein `import()`, Babel ohne Build; in `index.html` nach `wb-plattform.jsx` (Zeile 881) |
| `api/wb-marke.js` | Phase `einsicht` mit Schema (8.3) und Serverprüfung: Kennungen in der Tafel, drei Lesarten und ids, Belegtext, Art, Zeitbezug aus der Tafel; Phase `gate1` liest die gespeicherte Einsicht statt sie neu zu erzeugen |
| `ui_kits/werkbank/wb-plattform.jsx` | `hmPfEinsicht` liest `marke2[mid].einsicht`; feste Konventionssätze und weiße Stellen (Zeile 392 bis 404) entfallen, ohne gespeicherte Einsicht Lücken |
| `docs/werkbank/MARKE_SCHEMA.md`, `MARKENQUALITAET.md` | Objekt `einsicht` v2; Gate 1 verweist auf `einsicht.pruefung` |

### 8.2 Oberfläche für das Team

Nach `ui_kits/werkbank/CLAUDE.md`: Wichtiges oben, höchstens etwa sieben Bedienelemente je Bereich, Icons nur SVG mit 1,5 px, keine Eyebrows. Oben ein Satz zum Stand und die eine Hauptaktion je Zustand. Mitte drei Spalten in zufälliger Reihenfolge: Satz, fünf Teile, Szene, Hörstufe, Probenleiste mit SVG-Zuständen; Ableitungen unterstrichen mit Kennung; direkt redigierbar. Seitenpanels: Belege (Tafel mit Zeitbezug-Schalter), Karte (P2 je Kennung), Nachholen (N1 bis N4, Wortlaut, Frist). Wählen erst bei bestandenen Pflichtproben, mit Pflichtfeld Grund für alle drei.

### 8.3 Claude: Schema und Prompt

```js
const LESARTEN = ["angst", "anlass", "alternative", "wert", "ort"];
const STUECK = O({ text: S, belegId: S });            // belegId leer heißt Lücke
einsicht2: O({ kandidaten: A(O({
  id: { type: "string", enum: ["K1", "K2", "K3"] },
  lesart: { type: "string", enum: LESARTEN },
  seite: { type: "string", enum: ["eigentuemer", "kaeufer", "beide"] },
  fassung: S, zielgruppe: S, spannung: S, konvention: S, weisseStelle: S, unbequem: S, satz: S,
  szene: O({ wer: STUECK, wo: STUECK, wann: STUECK, was: STUECK }),
  stuetzen: A(O({ teil: S, aussage: S, belegId: S, ableitung: { type: "boolean" }, ableitungSatz: S }))
})) })
```

Abbildung durch den Server: `zielgruppe` bis `unbequem` nach `teile.*`; `satz` nach `satz.text` (`woertlichAus`, `anredeRegel`, `vermutung` setzen die Regeln); `szene.*.belegId` nach `stuetzeId`; `stuetzen[].belegId` nach `id`, Belegtext und Art aus der Tafel; `reihenfolge`, `stufeHoer`, `proben`, `status`, `gewaehlt`, `grund` nicht im Schema. Fehlt etwas, genau ein zweiter Aufruf mit Fehlerliste, danach Regelpfad.

Prompt (ersetzt Schritt 1 in MARKENQUALITAET 4.5):

```
Schritt Einsicht.
Quelle ist nur die Belegtafel. Jeder Eintrag hat Kennung, Sprecher, Art und Zeitbezug (vor, nach, allgemein). Du bekommst die Seite des Maklers und die Anrede.
Entwirf drei Kandidaten K1, K2, K3 aus drei verschiedenen Lesarten, nur aus Lesarten mit mindestens zwei Einträgen aus zwei Schritten.
Je Kandidat: Zielgruppe aus Anlass, Ort, Objekt, Lebensphase. Genau eine Spannung vor der Entscheidung, als Widerspruch. Für die Spannung zählen nur Einträge mit Zeitbezug vor; nutzt du andere, setze ableitung auf true, schreibe in ableitungSatz, was du liest, und in der Fassung "Ableitung aus" mit Kennung.
Konvention nur aus W-Einträgen mit Kennungen; unter fünf schreibe "Kommt aus Schritt 1: Wettbewerbskarte". Weiße Stelle als Handeln mit Beleg aus Zahl, Ort oder Situation. Unbequem: was er aufgeben, zugeben oder ändern muss.
Szene aus wer, wo, wann, was, jedes Stück mit belegId oder leer. Satz: der Moment beim Kunden aus der Szene, höchstens 25 Wörter, mit mindestens drei Wörtern wörtlich aus einem erzählten, berichteten oder gehörten Eintrag, nie aus einem Auswahlwert. Kein Satz über den Makler, keine Formel wie "wir vermuten". Liegt keine Stütze auf Stufe berichtet vor, nenne im Satz kein Gefühl der Kunden.
Nenne nur Kennungen, schreibe keinen Belegtext ab. Fehlt Stoff: "Kommt aus Schritt <Nummer>: <was fehlt>".
Wähle nicht, rangiere nicht.
```

Musterbeispiel und Regelpfad-Schablonen werden nicht mitgeschickt, weil P3 die Nähe zu ihnen misst. `effort` high, ein Aufruf, `max_tokens` 16000 wie heute in Schritt 1. Kosten je Aufruf: Lücke, zu messen über `kette.schritte`.

### 8.4 Regelpfad ohne Claude

Tafel, Zeitbezug, Hörstufen, Nachholbedingungen und Regelproben vollständig in Regeln. Je zulässiger Lesart ein Kandidat mit den Einträgen der Lesart als Stützen und Rohstoff (Zitate gekennzeichnet), Szene aus Einträgen mit Person oder Rolle und `hatOrt`. `fassung`, `satz`, `unbequem`, `konvention` als Lücke "Vom Team zu formulieren" oder "Kommt aus Schritt 1: Wettbewerbskarte". Kein Satz aus einer Vorlage. Fehlende Lesarten als Lücken-Kandidaten mit dem fehlenden Stoff.

### 8.5 Selbsttest

`hmSelbsttestEinsicht()` in Einstellungen, Selbsttest:

1. Tafel Markus: jeder Eintrag mit Sprecher, Art, Zeitbezug, Prüfsumme; A1 hat Sprecher `system` mit Vermerk v1-Vorlage und stützt nichts.
2. Zeitbezug: Zitat mit `frage` F4 bis F8 ergibt vor, `z1` ohne `frage` allgemein; F5 und Elifs F2 haben Art `angegeben`.
3. Lob-Falle: Kandidat nur auf Z1 und F5 hat Stufe angegeben, P1 fällt, Ableitung benannt; ohne Benennung meldet P1 "Ableitung nicht benannt".
4. P3: die alte K1-Spannung wird gesperrt (L 5 gegen `HM_PF_HINDERNIS["Provision"]`); K2 mit "unter Druck zu verkaufen" bekommt nur einen Hinweis, weil die Folge in F4 steht; der Regelpfad gibt keinen Satz der Referenzliste aus.
5. P8: "Provision" als wörtliches Fragment zählt nicht; ein Satz mit "Wir vermuten" oder "Sie erzählen" fällt; "fürchten" unter Stufe berichtet fällt; 26 Wörter fallen; ohne Anrede-Regel gesperrt, "du" bei Sie-Regel fällt.
6. Nachholen: Markus erfüllt N1 bis N4, Wortlaut gleich F7 aus 04 mit "Provision"; mit gefülltem `switch.angst` kein Nachholen; die Antwort landet mit `frage: "F7"` und `nachgeholt.schritt` 5; die drei Antworten aus 3.10 ergeben drei Ausgänge.
7. Musterliste: "ehrliche Beratung" ohne Situation fällt in P2; "gegen die eigene Provision geraten" löst den Kohortenabgleich aus.
8. Konvention ohne `vorab.wettbewerb` ist Lücke; Szene ohne `wo` ist nicht wählbar.
9. Wählen: gesperrt ohne Pflichtproben, verlangt drei Gründe; direkte Schreibversuche auf die oberste Ebene werden abgewiesen.
10. Veraltung: geänderter Text von `z1` wird beim Öffnen erkannt, `gueltig` falsch; nach `einsichtOk` steigt `stand.version`.
11. Stil in allen Feldern aller Kandidaten: kein U+2013, U+2014, Ausrufezeichen, kein Klischee-Wort; Dritte ohne Freigabe nie im Satz.
12. Sara Novak ohne Antworten: drei Lücken-Kandidaten, `bereit` falsch, keine Mustersätze.

### 8.6 Aufwand

| Posten | Aufwand (Setzung) |
|---|---|
| `wb-einsicht.jsx` mit Oberfläche, Logik, Selbsttest | etwa zwei Arbeitstage |
| `api/wb-marke.js`, Phase `einsicht` | etwa ein halber Arbeitstag |
| `wb-plattform.jsx` bereinigen, Doku | etwa ein halber Arbeitstag |
| Team je Makler | 60 bis 90 Minuten, gemessen in `stand.dauerMin`; mit Nachholen etwa 15 Minuten mehr |
| Creative Director | etwa 5 Minuten in Gate 1, bei Vermutung etwa 10 mit dem Lead |
| Makler | keine Minute; bei ausgelassenem F7 etwa zwei |

Ohne `ANTHROPIC_API_KEY` in Vercel läuft der Regelpfad, das Team schreibt die Fassungen selbst (Mehrzeit: Lücke). Keine Konten des Maklers bei fremden Werkzeugen.

---

## 9. Offene Punkte und Lücken

1. **Anrede gegenüber dem Makler:** beim Owner (Zerlegung Kapitel 7 Punkt 1); bis dahin Setzung aus Schritt 7.
2. **Karte und heutiger Auftritt für Markus** fehlen im Seed: P2 und P4 offen, `unbequem` teils Lücke.
3. **Hörstufe Markus:** angegeben, F7 nicht nachgeholt; K1 ist Arbeitsstand.
4. **Unterlage zu 600.000** fehlt, sperrt jede öffentliche Nutzung.
5. **Schwellen** in P3 (L 4, C 15 und 30, J 5 und 15), P7 (30), P8 (25 Wörter, drei Wörter), E9 (vier von fünf) und Fristen sind Setzungen.
6. **Musterliste und Gefühlswortliste** sind Setzungen des Teams, keine Erhebung.
7. **P3 misst Wortlaut, nicht Bedeutung.** Die thematische Nähe von K1 zu `HM_PF_FIGUR.kenner.andersAls` ("immer zum Verkauf raten") fängt P2 über die Musterliste, nicht P3.
8. **Rechtsgrundlagen** für Kundenstimmen und Fremdbild in der Tafel klären (Zerlegung Kapitel 7 Punkt 2).
9. **Kohortengröße**, ab der P3 trägt: offen (Zerlegung Kapitel 7 Punkt 9).

---

## 10. Quellen

Intern: `../00_ZERLEGUNG.md`; `../bestand/KETTE_IST.md` (2.4, 3, Zeile 73); `../research/R1-studios.md` (2.1, 4.1, 4.9, 5); `../research/R3-interview.md` (1.9, 6); Nachbarentwürfe `02_fragebogen.md` (Zeile 273 bis 275), `04_workshop.md` (Zeile 179, 319, 403 bis 407, 406, 498, 618), `06_territorien.md` (Zeile 96, Abschnitt 3.7), `08_stimme.md` (Zeile 372, 586, 761, 1048), `09_idee.md` (Zeile 90, 91, 357), `14_markenbuch.md` (Zeile 609), `16_freigabe.md` (Zeile 117, Abschnitt 3.3.2); `docs/werkbank/MARKENQUALITAET.md` (Kapitel 0, 4.5, 5.1, Zeile 222 bis 231); `docs/werkbank/MARKE_SCHEMA.md`; Code `ui_kits/werkbank/wb-plattform.jsx` (Zeile 9, 123 bis 141, 207, 387 bis 411, 982 bis 988), `wb-data.jsx` (Zeile 36 bis 66), `wb-store.jsx` (Zeile 72, 73), `wb-os-data.jsx` (Zeile 278), `index.html` (Zeile 881), `api/wb-marke.js`, `ui_kits/werkbank/CLAUDE.md`.

Extern:
- Wolff Olins, Sammy Page on Strategy: https://wolffolins.com/news/inside-wolff-olins-sammy-page-on-strategy
- Koto, Carolyn Rush: https://the-brandidentity.com/interview/kotos-carolyn-rush-good-brands-only-happen-with-a-good-idea
- Richard Holman: https://www.richardholman.com/blog/2019/6/17/simplicity-inspiration-amp-truth-how-to-write-better-creative-briefs
- GV Brand Sprint: https://library.gv.com/the-three-hour-brand-sprint-3ccabf4b768a
- April Dunford: https://www.aprildunford.com/post/a-product-positioning-exercise
- Moesta und Spiek, Four Forces: https://jobstobedone.org/the-four-forces/
- NN/g, Critical Incident Technique: https://www.nngroup.com/articles/critical-incident-technique/
- The Mom Test (Zusammenfassung): https://mtlynch.io/book-reports/the-mom-test/
- Vazire 2010: https://pubmed.ncbi.nlm.nih.gov/20085401/
- Chernev u. a. 2015: https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf
- Simonson und Tversky 1992: https://doi.org/10.2307/3172740
- Wilson und Schooler 1991: https://doi.org/10.1037//0022-3514.60.2.181
- Romaniuk: https://marketingscience.info/news-and-insights/brands-need-distinctive-assets
- Moulard, Garrity, Rice 2015: https://doi.org/10.1002/mar.20771
- Buell und Norton 2011: https://doi.org/10.1287/mnsc.1110.1376
- Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290
- MDN, SubtleCrypto.digest: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
