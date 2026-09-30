# Schritt 15. Präsentation und Reveal (`reveal`)

Stand 30.09.2026, Fassung 3. Entwurf zur Freigabe durch den Owner. Teil von Branding v2, Vertrag in `../00_ZERLEGUNG.md` Kapitel 3, Schritt 15.

**Lesart** wie in der Zerlegung. *Belegt* heißt: steht in einer Quelle mit URL oder in einer genannten Datei. *Ableitung* heißt: eigene Folgerung. *Setzung* heißt: bewusst gesetzter Startwert, der an den ersten fünf Maklern gemessen und ersetzt wird. *Lücke* heißt: wir wissen es nicht. Der Maßstab "Top-Studio" ist eine Ableitung aus R1, R2 und R8, keine Aussage darüber, wie ein bestimmtes Studio intern arbeitet.

Gelesen: `research/R1-studios.md` bis `R8-kundenerlebnis.md`, `bestand/KETTE_IST.md`, `bestand/FRAGEN_WIRKUNG_IST.md`, die Schrittentwürfe `01` bis `14` und `16` in diesem Ordner (für diese Fassung ausdrücklich 12 Abschnitte 3 und 4, 13 Abschnitte 1, 3.8 und 5, 14 Abschnitte 3.10 bis 3.13 und 5.5 bis 5.6, 16 Abschnitte 3.4, 4 und Tabelle K), `docs/werkbank/MARKENQUALITAET.md` Kapitel 5, Code `ui_kits/werkbank/wb-flow.jsx` (`KapitelReveal`, `StrategieReveal`), `wb-markenbuch.jsx`, `wb-markenwelten.jsx` (`WeltFeed`, `WeltProfilKopf`, `WeltExpose`, `hmWeltObjekte`), `wb-ui.jsx` (`Handy`), `wb-content.jsx`, `wb-produktion.jsx` (Teleprompter als Vollbild-Portal), `wb-store.jsx` (Seed Markus, Synchronisation zweier Fenster), `wb-app.jsx`, `tokens/fonts.css`, `ui_kits/werkbank/CLAUDE.md`.

**Was sich gegenüber Fassung 2 geändert hat.** Ein einziges Objekt `praesentation`, in dem Schritt 14 `entwurf` besitzt und Schritt 15 alles andere schreibt; die Struktur von `entwurf` folgt 14. Dauer: 60 Minuten Termin, darin die 45 Minuten der Folge aus 14. Der Fremdtest-Strom folgt der Regel aus 14 (andere Kategorien, nie Makler) und misst jetzt etwas: Start ohne Ankündigung des Platzes, "Stopp" beim ersten Wiedererkennen, andere Plätze im zweiten Lauf, "erkannt" nur mit einem Code aus `idee.codes`. Q1 prüft `gate2.status` und regelt "veraltet". Serienname nach Schritt 12 ("Zeitwert" gegen "Die Zeit daneben"). Runden nach Schritt 16: Kopf liest `freigabe.runden.genutzt`, Tatsachen zählen nie, Runde 2 öffnet über "Noch etwas ändern". Urteil je Fassung bei den Attributen, die die Achse berührt. Faires Ende: nach Akt 6 zeigt keine Ansicht nur eine Fassung. Begründungen als gesprochene Sätze statt Formel, Bühnensatz für die Akte 0 bis 4, Akt 1 nur aus Sätzen mit Verb und Haltung.

---

## 0. Kurzfassung

1. Der Reveal ist der Höhepunkt der Kette und zugleich der gefährlichste Moment: Neues wird von Menschen, die am Alten hängen, zuerst schlechter bewertet, umso stärker, je mehr es sich ändert (Walsh, Winterich, Mittal 2010: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1998809). Deshalb trennt dieser Schritt **Zeigen** und **Urteilen**: heute zeigen, morgen urteilen, am Vertrag.
2. **Die Bühne.** Vollbild ohne Bedienelemente, 60 Minuten, zehn Akte: Rahmen, seine Worte, Einsicht, Vertrag, der Weg und die Idee, Empfehlung in Anwendung, Gegenentwurf im selben Kontext, Schrift, Farbe und zuletzt das Zeichen, Fragen, Abschluss. Die Akte bauen auf den zwölf Ansichten auf, die Schritt 14 als `praesentation.entwurf` liefert (45 Minuten); Schritt 15 ergänzt Rahmen und Fragen und stellt eine Ansicht um.
3. **Der Höhepunkt ist der Strom.** Bevor er sein Profil sieht, hält er ein Telefon, auf dem ein Home-Feed abläuft, und sagt "Stopp", sobald er sich sieht. Gemessen wird, ob er bei seinem ersten Beitrag anhält und woran er sich erkennt. Erst dann öffnet ein Tipp auf seinen Namen sein Profil.
4. **Fair verglichen, auch am Ende.** Der Gegenentwurf läuft durch dieselben Ansichten mit denselben Inhalten, denselben Originalbildern und demselben Strom. Ab Akt 7 zeigt jede Ansicht beide Fassungen oder einen neutralen Grund, damit das Ende keine Fassung bevorzugt.
5. **Die Rückmeldung** öffnet 24 Stunden nach dem Termin (Setzung), rund 15 Minuten, in einer Sitzung: sechs Punkte aus seinem Vertrag, bei den Attributen, die die Achse berührt, zusätzlich "eher Papier, beide, eher dunkel"; danach die Wahl der Fassung mit seinem eigenen Urteil vor Augen; der Name der Sendung; freie Pins mit Einordnung.
6. **Fragen zählen nie als Runde,** Änderungen im Spielraum und Tatsachenkorrekturen auch nicht. Nur der Makler ordnet seine Pins ein. Jede Änderung trägt Zielschritt und Feld für Schritt 16.
7. **Markus Leitner:** Do 05.11.2026, 10 bis 11 Uhr. Claim "Zeit ist Teil des Preises.", Idee "Neben jedem Preis steht seine Zeit.", Zeichen "Das Zeitmaß", Empfehlung auf Papier, Gegenentwurf auf dunklem Grund (Achse `tonwert` aus Schritt 9), Signatur-Serie "Zeitwert" gegen "Die Zeit daneben" (Schritt 12). Rückmeldung ab Fr 06.11.2026, 11 Uhr. Die drei Sätze für Akt 1 sind heute eine Lücke: Kein Satz im Seed besteht die Regel.

---

## 1. Ziel und Erfolgskriterium

**Ziel (Vertrag).** Die Marke live in fester Dramaturgie zeigen: seine Worte, die Einsicht, der Vertrag, die Idee, dann die Anwendung im Handy-Rahmen und im Alltag, der Gegenentwurf im selben Kontext, zuletzt Zeichen, Farbe und Schrift. Die Rückmeldung kommt am Folgetag entlang des Vertrags.

**Warum so (belegt).** Starke Präsentationen bauen erst Begründung und vereinbarte Kriterien auf und zeigen dann die Lösung; Paul Rand entwickelte für NeXT auf rund 100 Seiten die Argumentation vor dem Zeichen (https://www.logodesignlove.com/next-logo-paul-rand). Mozilla zeigte, dass Menschen Richtungen am Logo allein beurteilen und dann falsch urteilen (https://blog.mozilla.org/opendesign/roads-not-taken/). Rückblickende Urteile hängen am Höhepunkt und am Ende (Kahneman u. a. 1993: https://journals.sagepub.com/doi/10.1111/j.1467-9280.1993.tb00589.x). Heute gibt es in der Werkbank keinen Reveal: Die Strategie ist eine Scroll-Seite, die der Makler allein liest (`StrategieReveal`, `wb-flow.jsx` Zeile 191), das Markenbuch zeigt Welten als Katalog mit Demo-Objekten (`wb-markenbuch.jsx` Zeile 115 und 121), die Freigabe ist ein Knopf ohne Maßstab (KETTE_IST 2.8).

**Erfolgskriterium.** Fertig, wenn alle harten Punkte zutreffen.

| Nr. | Kriterium | Geprüft durch |
|---|---|---|
| E1 | Der Termin beginnt mit drei seiner Sätze (ganze Sätze mit Verb und Haltung) und endet vor Fragen und Abschluss mit dem Zeichen; kein Zeichen und keine Wortmarke allein vor Akt 7 | Q2, Q3 |
| E2 | Jede Ansicht mit Begründungspflicht in den Akten 4 bis 7 trägt höchstens einen gesprochenen Satz; jeder ist einem Attribut aus `markenvertrag.attribute` zugeordnet, und jedes der fünf Attribute kommt mindestens einmal vor. Ohne Begründungspflicht sind die Ansichtsarten `arbeit`, `belege`, `strom`, `achse`, `vergleich` und `expose` (3.8) | Q4 |
| E3 | Empfehlung und Gegenentwurf haben identische Inhalte, Originalbilder und Ansichten; sie unterscheiden sich nur in den Feldern, die die Achse aus `idee.gezeigt.achse` erlaubt, bei jeder Achse außer `ausschnitt` auch mit identischem Crop | Q5, Q6 |
| E4 | Die Arbeit ist sichtbar: verworfene Einsichten, Richtungen und Varianten mit Grund, dazu der Prüfstatus der Belege, alles aus Daten gezählt | Q11 |
| E5 | Im Makler-Output keine Demo-Objekte, kein Fülltext, kein generiertes Bild einer Person, eines Objekts oder Orts, kein gebildeter Kontoname | Q7 |
| E6 | Der Fremdtest lief für beide Fassungen im gleichen Strom mit anderen Plätzen seiner Beiträge; Stopp-Platz, wörtliche Antwort und genannte Codes sind festgehalten, das Urteil folgt der Regel aus 3.6 | Q15 |
| E7 | Nach Akt 6 zeigt keine Ansicht nur eine Fassung | Q2 |
| E8 | Die Rückmeldung öffnet nicht vor `offenAb`, fragt die Kriterien der bestätigten Vertragsversion ab, bei achsenberührten Attributen je Fassung; jede Änderung trägt Zielschritt und Feld | Q12, Q14 |
| E9 | Keine Frage, keine Änderung im Spielraum und keine Tatsachenkorrektur wurde als Runde gezählt | Q13 |
| E10 | Der Reveal startet nur bei `gate2.status` "abgezeichnet"; sonst wird verschoben, mit Grund für das Team | Q1 |
| E11 | Aufzeichnung nur mit Einwilligung des Maklers und Zustimmung aller Anwesenden; fremde Bilder im Strom nur aus lizenziertem Bestand oder nach dokumentierter Owner-Freigabe | Q9 |

**Weiche Zielwerte** (Setzung, an den ersten fünf Maklern zu messen):
- Mindestens 80 Prozent der Anmerkungen lassen sich einem Kriterium des Vertrags zuordnen (Wirkungsnachweis von Schritt 7, `07_positionierung.md` 1.2).
- Höchstens eine zählende Runde bei vier von fünf Maklern.
- Der Fremdtest ergibt bei der gewählten Fassung "erkannt" bei allen fünf Maklern (wie `13_feed.md` Abschnitt 1). Weil "erkannt" jetzt einen Code verlangt, ist das ein strenges Ziel; wird es verfehlt, liegt der Befund bei den Codes aus Schritt 9, nicht beim Makler.
- Die Wahl weicht bei höchstens einem von fünf Maklern von seinem eigenen Urteil in Teil 1 ab (3.9); mehr heißt, dass ein Kriterium fehlt.
- Die Rückmeldung ist im Median zwei Werktage nach `offenAb` abgeschlossen, in einer Sitzung.

---

## 2. Geprüfte Alternativen und warum verworfen

| Nr. | Alternative | Was dafür spricht | Warum verworfen | Quellen |
|---|---|---|---|---|
| A1 | **Klassische Stilmappe:** Logo, Farben, Schrift, dann Anwendungen | Studio-Gewohnheit, schnell; `WeltTafel` und `WeltZeichen` existieren | Das Urteil fällt am Zeichen, bevor die Anwendung es trägt; genau diesen Fehler dokumentiert Mozilla. Die Rubrik deckelt "High-End" auf 4, wenn ein Entwurf zuerst als Logo auf Weiß gezeigt wird. Konzeptboards mit angewandter Idee werden anders gelesen als Stil- und Stimmungsboards | https://blog.mozilla.org/opendesign/roads-not-taken/; https://www.designsociety.org/download-publication/43213/visual_boards_mood_board_style_board_or_concept_board; R8 2.3 |
| A2 | **Reveal ohne Termin:** Link, PDF oder Video | flexibel; Loom-Muster mit Zeitstempel-Antworten | Reaktionen lassen sich nicht einordnen, Fragen bleiben offen und werden zu Änderungswünschen, die Dramaturgie hängt davon ab, wo er zu scrollen beginnt. R8 schließt den Reveal per Mail oder nur als Video aus. Übernommen: Aufzeichnung als Nachlese | R8 Kapitel 5; https://www.loom.com/use-case/design |
| A3 | **Entscheidung im Termin** oder "Wie gefällt es Ihnen?" | schnell, fühlt sich nach Abschluss an | Die erste Reaktion auf Neues ist ein schlechter Maßstab; wiederholter Kontakt und Abstand erhöhen die Zustimmung. Monteiro rät, nie nach Gefallen zu fragen; Sycheva ersetzt "Mögen wir das?" durch "Drückt es aus, was wir vereinbart haben?"; der Critical Response Process lässt Meinungen nur auf Nachfrage zu | https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1998809; https://en.wikipedia.org/wiki/Mere-exposure_effect (Sekundärquelle); https://thepiratetester.wordpress.com/2021/04/12/2021-04-12-my-breakdown-of-mike-monteiro-13-ways-designers-screw-up-client-presentations-and-how-it-applies-to-testers/ (Sekundärquelle); https://www.smashingmagazine.com/2026/07/how-turn-brand-strategy-into-visual-direction/; https://lizlerman.com/critical-response-process/ |
| A4 | **Eine Lösung ohne Gegenentwurf** (Rand-Modell) | klare Führung, keine Verwässerung | Mitentscheiden erzeugt psychologisches Eigentum, wenn das Ergebnis die eigenen Präferenzen spiegelt; die Achse aus Schritt 9 liegt auf einem offenen Widerspruch in seinen Angaben, den nur eine Wahl in Anwendung löst. Übernommen: Herleitung vor dem Zeichen | https://doi.org/10.1509/jmkg.74.1.65; `09_idee.md` 3.6; R1 Kapitel 5 |
| A5 | **Drei Richtungen oder alle Welten** | "drei Routen" als Branchenpraxis | Unklare Präferenz, wenig Gestaltungswissen und komplexe Optionen sind die Moderatoren für Überforderung; drei gleichrangige Optionen verführen zur Mitte; die Richtung ist in Schritt 6 gewählt | https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf; https://doi.org/10.2307/3172740; 00_ZERLEGUNG Kapitel 6 |
| A6 | **Freies Feedback** per Mail oder in Markup.io | vertraut; Pins direkt auf Bild ohne Gastkonto | Ohne Kriterien wird Geschmack verhandelt; Figma legt Ziele vorher fest und trennt Verständnisfragen von Feedback; ein fremdes Werkzeug bringt einen weiteren Zugang und eine zweite Datenablage. Übernommen: das Pin-Prinzip, gebaut in der Werkbank | https://www.markup.io/; https://www.figma.com/blog/design-critiques-at-figma/; R8 2.7 |
| A7 | **Umfeld oder Follower abstimmen lassen** | Außensicht | Gap stellte 2010 ein Logo ohne Einbettung online und kehrte nach rund einer Woche zurück; bei Mozilla kippte ein spöttischer Vergleich eine Richtung. Das Umfeld sieht die Marke in Schritt 16 zuerst, stimmt aber nicht ab | https://www.npr.org/2010/10/08/130419187/the-gap-gets-backlash-for-logo-makeover; https://blog.mozilla.org/opendesign/roads-not-taken/ |
| A8 | **Fremdtest mit Beiträgen von Mitbewerbern im Kerngebiet** (Fassung 2 dieses Dokuments) | misst Abstand zur Konvention direkt | Die Rechtsgrundlage für Bildschirmfotos fremder Maklerbeiträge ist offen, Schritt 14 schließt Beiträge anderer Makler aus (`14_markenbuch.md` 3.12), und der Abstand zur Konvention wird schon gemessen: an der Karte in Schritt 5 und an der Kohorte in Gate 2. Ein realistischer Home-Feed eines Eigentümers besteht zudem überwiegend aus anderen Kategorien (Ableitung); dort muss er auffallen | R2 Prinzip 4 (keine Referenzen aus der eigenen Kategorie); `14_markenbuch.md` 3.9.4; https://www.sciencedirect.com/science/article/abs/pii/0142694X9190003F |
| A9 | **Heutige Scroll-Seite ausbauen** (`StrategieReveal`) | vorhanden, günstig | keine Dramaturgie, kein Höhepunkt, Sprung im Index zu Bekanntem, Abschnitte erklären Bestandteile statt Entscheidungen; die Seite trägt Eyebrows | `wb-flow.jsx` Zeile 119 bis 239; R8 2.3 |

**Was übernommen wird (Ableitung).** Aus A1 die Detailansichten, aber zuletzt. Aus A2 Nachlese und Rückmeldung im Link. Aus A4 die Herleitung vor dem Zeichen. Aus A6 das Pin-Prinzip. Aus A9 die Datenanbindung, nicht die Form.

---

## 3. Die gewählte Lösung

### 3.1 Die Lösung in fünf Sätzen

Der Reveal ist eine Bühne in zehn Akten, die das Team live führt und die nur aus der Version liest, die Gate 2 abgezeichnet hat. Jede Ansicht in Anwendung zeigt ausschließlich sein Material, seine Worte und seine Belege, und jede Entscheidung wird in einem gesprochenen Satz an einem Kriterium seines Vertrags begründet (Greever, drei Fragen je Entscheidung, Sekundärquelle: https://medium.com/@productandrew/articulating-design-decisions-tom-greever-2015-fdae61adade7). Der Höhepunkt ist der Strom: Er erkennt sich zwischen fremden Beiträgen, bevor er sein Profil kennt, dann hält er sein Profil im Daumen und seine Karte in der Hand. Der Gegenentwurf bekommt dieselben Ansichten, ab Akt 7 stehen beide gleichberechtigt, das Zeichen kommt zuletzt. Am Folgetag urteilt er am Vertrag, je Fassung dort, wo die Achse wirkt, und wählt dann.

### 3.2 Ein Objekt, zwei Besitzer

`marke2[mid].praesentation` ist ein einziges Objekt. Schritt 14 besitzt das Feld `entwurf` in seiner Struktur `{id, titel, quellen[], dauerMin, fuehrt, notiz, kriterium, nieFragen[]}` (`14_markenbuch.md` 5.5); Schritt 15 schreibt alle anderen Felder und nie `entwurf`. Die Schreibfunktion `hmPraesentationSchreiben(mid, teil)` verweigert den Schlüssel `entwurf`, die Schreibfunktion in 14 schreibt nur ihn. 14 sagt: "Schritt 15 darf die Folge anpassen, nicht die Quellen." Genau das tut `praesentation.ablauf`: Jeder Ablaufeintrag verweist mit `entwurfId` auf eine Ansicht aus 14, übernimmt deren `quellen`, `kriterium` (als Vorschlag für die Begründung), `fuehrt` (für die Rolle), `notiz` (als Anfang des Sprechzettels) und `nieFragen` (in die Sperrliste), und fügt Akt, Unteransicht, Fassung, Minuten und Satz hinzu.

**Von zwölf Ansichten zu zehn Akten.**

| Akt | Aus `entwurf` (Nr. in 14 3.12) | Minuten in 14 | Minuten in 15 | Änderung und Grund |
|---|---|---|---|---|
| 0 Rahmen | neu | 0 | 2 | Rahmen setzen, Aufzeichnung (T1) |
| 1 Seine Worte | 1 | 3 | 3 | Quelle nur `workshop.zitate` (3.4) |
| 2 Einsicht | 2 | 3 | 3 | |
| 3 Vertrag | 3 | 4 | 3 | Liste statt Erklärung |
| 4 Weg und Idee | 4, 5 | 4 + 3 | 5 | Kandidaten, Territorien und Varianten auf einer Folge von Flächen |
| 5 Empfehlung in Anwendung | 7, 6, 8, 9 | 2 + 8 + 3 + 4 | 15 | **Fremdtest vor dem Feed:** Wer sein Profil schon gesehen hat, erkennt im Strom nur noch Gesehenes; die Reihenfolge in 14 würde den Test verfälschen |
| 6 Gegenentwurf | 10 | 5 | 10 | mindestens 60 Prozent von Akt 5 (Setzung), sonst läuft er im Vorbeigehen |
| 7 Schrift, Farbe, Zeichen | 11 | 4 | 4 | Reihenfolge Schrift, Farbe, Wortmarke, Zeichen |
| 8 Fragen | neu | 0 | 10 | Fragen beantworten statt sie zu Änderungen werden zu lassen |
| 9 Abschluss | 12 | 2 | 2 | |
| Puffer | | | 3 | |
| **Summe** | 12 Ansichten | **45** | **60** | Die 45 Minuten aus 14 bleiben der Präsentationsteil (Akte 1 bis 7 zusammen 43, Akt 9 2) |

60 Minuten sind die Setzung in `auftrag.dauer` (registriert über `hmDauerSetzen("reveal", ...)` nach `01_auftakt.md` 3.5; die Statuskarte in 14 3.13 sagt "rund eine Stunde"). Aus den zwölf Ansichten des Entwurfs werden 38 Unteransichten im Ablauf (Tabelle in 3.11); die Zahl der Entwurfsansichten bleibt zwölf.

### 3.3 Ablauf über die Tage

| Wann | Was | Wer | Dauer (Setzung) | Ergebnis |
|---|---|---|---|---|
| sobald Schritt 10 für beide Fassungen abgenommen ist, spätestens 5 WT vorher (bei Video 7 WT) | **Druckproben der Karte** in beiden Fassungen bestellen; Prüfsumme der Karte wird festgehalten | Team | 15 Minuten | `praesentation.druckproben` |
| 5 WT vorher | **Einladung** an Makler und Mitentscheider: Datum, Ort, Dauer aus `hmDauerText`, wer dabei ist, "An diesem Tag entscheiden Sie nichts", Datum und Dauer der Rückmeldung. Kein Bild, keine Vorschau, auch nicht im Linkvorschaubild | Regeln, Stratege (zwei eigene Sätze) | 5 Minuten | `praesentation.einladung` |
| 4 WT vorher, nur Video | Druckproben versandfertig im verschlossenen Umschlag "Bitte erst im Termin öffnen" | Team | 10 Minuten | Versanddatum |
| 3 WT vorher | **Ablauf bauen** aus `entwurf`, Sätze und Sprechzettel, Strom zusammenstellen (3.6) | Regeln, Claude, Stratege | 45 Minuten | `ablauf[]`, `strom`, Q2 bis Q9 grün |
| 2 WT vorher | **Frist Gate 2** (aus 14 3.2): `gate2.status` muss "abgezeichnet" sein, sonst Verschiebung (3.5) | Regeln | 0 | Termin bestätigt oder verschoben |
| Vortag | **Generalprobe** auf dem Gerät des Termins, offline, mit CD: jede Ansicht, jede Schrift geladen, Stoppuhr je Ansicht, Sperrliste, Sprechzettel laut | Lead, Assistenz, CD | 30 Minuten | `generalprobe`, Messung je Ansicht |
| Termin | **Reveal** in zehn Akten | Lead, Assistenz, Makler, Mitentscheider, CD falls nicht Lead | 60 Minuten | `praesentation`, `fremdtest`, Pins der Art Frage |
| am Termin, bis 17 Uhr | **Fragen aus dem Termin** schriftlich beantworten | Stratege | 15 bis 30 Minuten | `pins[].antwort` |
| Termin plus 24 Stunden | **Rückmeldung öffnet**, Erinnerung nach zwei Werktagen | Regeln | 0 | `rueckmeldung.offenAb` |
| nach Abschluss | **Auswertung:** Fragen beantworten, Änderungen zuordnen, Spielraum und Tatsachen prüfen, CD entscheidet außerhalb des Spielraums, Übergabe an 16 | Stratege, CD, Regeln, Claude (Vorschläge) | 45 bis 90 Minuten | `aenderungen[]` |

**Druckerei.** Lieferzeit und Kosten sind eine Lücke: `luecke {was: "Druckerei für Kartenproben, Lieferzeit, Preis", wer: Owner, termin: vor dem ersten Makler}`. Die Fristen oben rechnen mit drei Werktagen Lieferzeit und zwei Tagen Post innerhalb Österreichs (Annahme). Ändert Gate 2 die Karte nach der Bestellung, stimmt die Prüfsumme nicht mehr: Dann gibt es keine Druckprobe in der Hand, die Karte wird nur als Montage gezeigt, der Lead sagt es in einem Satz, und die richtige Probe kommt mit der Rückmeldung per Post. Eine veraltete Druckprobe in der Hand wäre eine stille Änderung (F9).

### 3.4 Die zehn Akte

Reihenfolge nach R8 2.3: Rückblick in seinen Worten, Problem, Kriterien, Idee, Anwendung im Kontext, zuletzt das Zeichen im Detail.

| Akt | Was er sieht | Was das Team sagt oder tut | Quelle |
|---|---|---|---|
| 0 Rahmen | "Heute zeigen wir. Morgen entscheiden Sie." Darunter Ende des Termins, Datum und Dauer der Rückmeldung | Lead: warum wir hier sind, wann Schluss ist, dass heute nichts entschieden wird; fragt die Zustimmung zur Aufzeichnung ab, wenn die Einwilligung vorliegt | `auftrag.termine`, `auftrag.dauer`, `auftrag.einwilligungen` |
| 1 Seine Worte | drei seiner Sätze, je einer auf einer Fläche, darunter klein, wann er ihn gesagt hat | Lead lässt stehen, liest nicht vor, sagt nach dem dritten einen Satz zur Verbindung | nur `workshop.zitate` mit `sprecher: makler`, `oeffentlich: ja`, ohne Personenbezug, Regel Q3 |
| 2 Einsicht | `einsicht.satz`, dann die weiße Stelle | Lead spricht den unbequemen Teil aus; er steht nicht auf der Fläche | `markenbuch`, Kapitel Einsicht |
| 3 Vertrag | Positionierungssatz, fünf Attribute mit "heißt" und "heißt nicht", "Bestätigt am ..., Version ..." | "Daran messen Sie morgen." | `markenvertrag` über `markenbuch` |
| 4 Weg und Idee | 4a drei Einsichten, eine blieb; 4b drei Richtungen, eine blieb, die zweite ist der Gegenentwurf von heute nicht, sie ist gefallen; 4c verworfene Zeichen-Ideen als kleine Renders auf seinem Porträt, je ein Satz; 4d Belege mit Prüfstatus, gezählt; 4e sein Claim groß über seinem Porträt, darunter die Idee | ein Satz je Fläche, warum etwas fiel; zur Idee ein Satz mit Kriterium | Kapitel "Wie wir zu dieser Marke gekommen sind", `einsicht.kandidaten`, `gate1.verworfenWeil`, `idee.varianten`, `beweise`, `idee.begruendung` |
| 5 Empfehlung in Anwendung | 5a Strom mit Fremdtest (3.6); 5b sein Profil mit Wochenregler 1 bis 4, danach das Telefon in seiner Hand; 5c drei geöffnete Beiträge mit Caption; 5d Website-Kopf, Karte als Druckprobe in der Hand, Schild als Montage, Signatur, Exposé-Titel | je Ansicht höchstens ein Satz mit Kriterium; beim Strom keiner | `feed`, `feed.wochen`, `feed.profilkopf`, `markenbuch` Kapitel Anwendungen |
| 6 Gegenentwurf | 6a ein Satz zur Achse; 6b derselbe Strom mit anderen Plätzen; 6c dasselbe Profil nach Woche 4; 6d dieselben drei Beiträge; 6e derselbe Alltag, zweite Druckprobe; 6f beide Profile nebeneinander auf der geteilten Bühne | je Ansicht ein Satz, warum auch diese Fassung den Vertrag trägt | `feed.gegenentwurf`, `system.gegenentwurf`, `idee.gezeigt` |
| 7 Schrift, Farbe, Zeichen | Schrift an drei Proben; Farbe mit Rollen und Anteil; die Wortmarke, bei geschärftem Logo vorher und nachher; zuletzt das Zeichen groß mit Herleitung. Bei Achse `tonwert` jede Fläche geteilt, Papier links, dunkel rechts, Seiten fest nach Reihenfolge in `idee.gezeigt`; bei anderen Achsen neutraler Grund, geteilt nur, wo sich die Fassungen unterscheiden | je Element ein Satz mit Kriterium | `system`, `system.gegenentwurf`, `idee.begruendung` |
| 8 Fragen | die geteilte Zeichen-Fläche bleibt stehen | "Welche Fragen haben Sie?" Das Team antwortet, die Assistenz notiert jede Frage als Pin der Art Frage mit Ansicht. Meinungen und Änderungen: "Schreiben Sie das morgen dazu, mit einer Nacht Abstand." | Pins aus dem Termin |
| 9 Abschluss | neutraler Bühnengrund: "Morgen entscheiden Sie." Darunter Datum, Uhrzeit und Dauer der Rückmeldung, was danach passiert | Lead übergibt beide Druckproben; Termin endet pünktlich | `auftrag.termine`, `rueckmeldung.offenAb` |

**Warum Anwendung vor Zeichen.** Wer das Zeichen zuerst sieht, beurteilt es als Logo (Mozilla). Wer es zuletzt sieht, hat es zwanzig Minuten in jeder Kachel, auf der Karte und am Schild gesehen; Wiederholung macht es flüssig lesbar, und flüssig Gelesenes wirkt schöner (Reber, Schwarz, Winkielman 2004: https://dornsife.usc.edu/norbert-schwarz/wp-content/uploads/sites/231/2023/11/04_pspr_reber_et_al_beauty.pdf). Das Zeichen ist dann Auflösung, nicht Behauptung.

**Warum das Ende beide zeigt.** Das Ende prägt die Erinnerung (Peak-End-Regel). Stünde am Ende nur die Wortmarke auf Papier, wirkte dieser Vorteil für eine der beiden Fassungen, und der Vergleich wäre am Schluss nicht mehr fair. Deshalb laufen ab Akt 7 beide Fassungen gleichrangig, und der letzte Bildschirm ist neutral (Ableitung). Die Empfehlung bekommt ihren Vorsprung offen, als markierte und begründete Empfehlung, nicht versteckt über die Dramaturgie.

**Warum der Gegenentwurf nach der Empfehlung kommt.** Eine sichtbar empfohlene Option senkt die Last einer Wahl bei unklarer Präferenz (Chernev u. a. 2015). Fair bleibt es durch dieselben Ansichten, einen eigenen Satz je Ansicht und gleiche Zugänglichkeit in der Rückmeldung. Einzeln urteilen Menschen nach leicht bewertbaren Merkmalen, nebeneinander kommen die schwer bewertbaren dazu (Hsee 1996: https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf); darum jede Fassung erst allein im echten Kontext, dann nebeneinander.

**Akt 1, die Regel für seine Sätze.** Eine einzige Quelle: `workshop.zitate`, Sprecher Makler, `oeffentlich: ja`, ohne Personenbezug, wörtlich nach Normalisierung (P1 aus Schritt 4). Das sind genau die Sätze, die er am Ende des Workshops öffentlich zu tragen bestätigt hat (`04_workshop.md`, Erlebnis); Akt 1 schließt damit an seine eigene Zusage an. Zusätzlich muss jeder Satz ein ganzer Satz sein: finites Verb, mindestens sechs Wörter, keine reine Ortsangabe, kein Nebensatz ohne Hauptsatz ("Dass ...", "Weil ..."), keine Zahl als Hauptinhalt (Zahlen gehören zu den Belegen in 4d). Grund: Der erste Moment soll eine Haltung tragen, keinen Ort und kein Fragment (Ableitung aus R8 2.3, Rückblick in seinen Worten). `richtung.zitatMakler` aus Schritt 6 ist keine zweite Quelle; Schritt 14 listet es in 3.12 noch und soll es streichen (5.5). Findet die Regel keine drei Sätze, ist der Ablauf nicht startbar; das Team holt die Sätze im Nachgang des Workshops, nie über einen Mustersatz.

### 3.5 Sperre, Frist und Verschiebung

Q1 läuft beim Bauen des Ablaufs, zur Frist zwei Werktage vorher, in der Generalprobe und beim Start. Grün heißt: `gate2.status` ist "abgezeichnet", `gate2.version` gleich `praesentation.gate2Version`, `idee.gezeigt.abgenommen` gesetzt, `feed.pruefung` ohne Fehler, alle Entscheider mit "entscheidet ja" haben zugesagt (Q10).

| Zustand von `gate2.status` | Folge |
|---|---|
| "abgezeichnet" | Termin gilt |
| "offen" oder "gesperrt" zur Frist | Termin verschoben. `praesentation.status` "verschoben", `praesentation.verschiebung[]` mit `{am, grund, quelle, neuerTermin}`; `grund` sind die offenen Sperren aus `gate2.sperren` mit Pfad. Das Team sieht den Grund in der Team-Ansicht Marke; der Makler sieht den ehrlichen Satz der Statuskarte aus 14 (`statusMakler.zustand` "verschoben") und einen neuen Termin, nie einen Zwischenstand |
| "veraltet" (eine Quelle hat sich nach der Abzeichnung geändert, `hmMbVeraltet`) vor der Frist | Prüfung läuft neu, Gate 2 wird neu gezeichnet; hält die Frist nicht, wie oben verschoben. `grund` nennt den geänderten Pfad aus dem Prüfsummenvergleich |
| "veraltet" nach der Frist oder am Termintag | keine Nachprüfung unter Zeitdruck. Entweder stellt das Team die geänderte Quelle auf die gezeichnete Version zurück (die Prüfsummen stimmen dann wieder; Annahme über 14 3.10.4, dort nicht ausdrücklich geregelt, Hinweis an 14 in 5.5), oder der Termin wird verschoben. Die Presenter-Ansicht zeigt dem Lead den Pfad und die beiden Wege |

Gezeigt wird immer die gezeichnete Version: `hmRevealEingang(mid)` liest jedes Feld über die Prüfsummen in `markenbuch.basis`, nicht den aktuellen Stand.

### 3.6 Der Strom und der Fremdtest

**Was es ist.** Ein Home-Feed im Telefon, das er selbst hält, ein Beitrag je 2,5 Sekunden (Setzung), neun Beiträge, darunter zwei von ihm. Lauf 1 (Empfehlung): seine Beiträge auf Platz 3 und 7. Lauf 2 (Gegenentwurf, Akt 6): dieselben sieben fremden Beiträge in derselben Reihenfolge, seine zwei auf Platz 4 und 8 (Setzung). So kann er im zweiten Lauf nicht auf einen gelernten Platz warten.

**Ablauf, identisch in beiden Läufen.**
1. Ohne Ankündigung, was kommt, reicht der Lead das Telefon mit einem Satz: "Sagen Sie Stopp, sobald Sie sich sehen." Kein Hinweis auf Platz, Anzahl oder Form.
2. Der Strom läuft. Sagt er Stopp oder tippt er, hält der Strom; festgehalten werden `stoppPlatz` und `stoppMs` seit Erscheinen seines ersten Beitrags. Sagt er nichts, hält der Strom am Ende auf seinem zweiten Beitrag, `stoppPlatz` bleibt leer.
3. "Woran?" Eine Frage, keine zweite. Die Assistenz hält die Antwort wörtlich fest und markiert, welche Codes aus `idee.codes` er nennt (Mehrfachwahl aus der Liste des Maklers, dazu "nur Gesicht" und "anderes").
4. Ein Tipp auf seinen Namen öffnet sein Profil nach Woche 4. Dann die Frage aus dem Vertrag: "Erkennen Sie sich darin?" Die Antwort wird wörtlich festgehalten.

**Einordnung (Regel, im Datenvertrag als `hmFremdtestUrteil`).**

| Urteil | Bedingung |
|---|---|
| "ja" | Stopp beim ersten eigenen Beitrag, und die Antwort auf "Woran?" nennt mindestens einen Code aus `idee.codes` außer dem bloßen Gesicht (etwa Zeitmaß, Serienkennung, Satz, oder der Porträtstil, wenn er Licht oder Ausschnitt beschreibt) |
| "teilweise" | Stopp erst beim zweiten eigenen Beitrag, oder Stopp beim ersten, aber nur "Gesicht" als Grund |
| "nein" | kein Stopp, oder auf "Erkennen Sie sich darin?" ein Nein |

Die Regel rechnet aus `stoppPlatz` und `codesGenannt`; der Lead bestätigt nach dem Termin und darf nur mit Satz abweichen. Warum ein Code verlangt wird: Sein Gesicht steht in der Kachel, sich daran zu erkennen ist trivial. Wiedererkennung einer Marke heißt, dass die Codes tragen, die Schritt 9 dafür gebaut hat (Romaniuk zu Distinctive Assets: https://marketingscience.info/news-and-insights/brands-need-distinctive-assets; `idee.codes`, Farbe nie allein). Warum der Stopp: Kunden sehen seinen Beitrag im Vorbeiwischen; ob er in 2,5 Sekunden ankommt, ist die eigentliche Frage (Willis und Todorov 2006, Eindruck in 100 Millisekunden: https://doi.org/10.1111/j.1467-9280.2006.01750.x). Der Test folgt R7 Kapitel 4 ("die gewählte Welt allein im simulierten Profil zwischen fremden Beiträgen").

**Was die Antwort bewirkt.** Erst mit dieser Einordnung darf "nein" das Einfrieren sperren: Ist die gewählte Fassung "nein", friert Schritt 16 nicht ein, bis der CD mit dem Makler geklärt hat, ob Vertrag, Idee oder Umsetzung nicht tragen, und eine neue Fassung den Test besteht (`16_freigabe.md` P19). "teilweise" erscheint in der Auswertung neben den Kriterien und als Befund an die Codes.

**Woher die fremden Beiträge kommen (eine Regel mit Schritt 14).** Nur Beiträge aus anderen Kategorien, nie von Maklern, auch nicht von UNIO-Maklern (wie `14_markenbuch.md` 3.12). Die Kohortenfrage stellt sich deshalb im Strom nicht; sie liegt in Gate 2.
- **Standard:** ein Pool `HM_STROM_POOL` von rund 30 lizenzierten Bildern aus Kategorien, die im Feed eines Eigentümers vorkommen (Stadt, Kultur, Essen, Sport, Reisen, Medien mit Textkachel), einmalig von UNIO lizenziert und geprüft wie die Fotopaare in Schritt 3. Je Makler wählt die Regel sieben nach `einsicht.zielgruppe` (Ort und Lebensphase), keine zwei aus derselben Kategorie nebeneinander. Kontonamen und Profilbilder sind als neutrale Flächen gesetzt, nie als erfundener Name. Die Lizenz ist eine Lücke (Owner, Budget), bis dahin ist der Strom nicht startbar.
- **Optional:** Bildschirmfotos öffentlicher Beiträge anderer Kategorien nur nach dokumentierter Owner-Freigabe `einstellungen.stromScreenshots {owner, datum, grundlage}`; ohne sie sperrt Q9. Namen und Gesichter Dritter unkenntlich, Dateien nur in IndexedDB auf dem Termin-Gerät, nie im Repo, nie an Claude, gelöscht mit Abschluss der Rückmeldung (`strom.loeschenAm`).

### 3.7 Die Bühne als Oberfläche

**Vollbild ohne Bedienelemente.** Portal an `document.body` im Vollbild wie der Teleprompter (`wb-produktion.jsx` Zeile 278). Weiter mit Leertaste oder Pfeil rechts, zurück mit Pfeil links, Mauszeiger verschwindet nach zwei Sekunden. Keine Knöpfe, keine Seitenzahl, keine Fortschrittsleiste.

**Presenter-Ansicht im zweiten Fenster.** Aktuelle und nächste Ansicht, Sprechzettel, Restzeit je Ansicht, Wochenregler, Umschaltung der Fassung für Nachfragen, drei Eingaben der Assistenz: "Frage notieren", "Stopp" (falls er es sagt statt zu tippen) und "Woran" mit den Codes. Zustand über `hmStore` unter `reveal_live`; die Storage-Events halten zwei Fenster schon heute synchron (`wb-store.jsx` Zeile 3 und 13). Das Telefon in seiner Hand öffnet `?ansicht=reveal-handy`, das nur während des Termins gilt.

**Offline und ohne Überraschung.** Vorladen aller Schriften (`useHmWeltSchriften`), Bilder und Renders, Status "bereit" in der Presenter-Ansicht, erst dann startbar. PDF-Fassung aus derselben Version über `hmDrucken` (`wb-werkzeuge.jsx` Zeile 112) als Rückfall.

**Bühnensatz für die Akte 0 bis 4 und 9.** Diese Akte zeigen Worte, noch keine Form des Maklers; sie laufen nicht in seiner Markenschrift (G4, wie der Wort-Link in `07_positionierung.md` 3.4) und nicht in der Werkbank-Oberfläche, sondern in einem eigenen, gesetzten Bühnensatz (Setzungen, zu prüfen in der Generalprobe):
- **Format und Satzspiegel:** 1920 x 1080, zwölf Spalten, linker Rand und Bundsteg eine Spalte (160 px), rechter Rand zwei Spalten, oben 120 px. Text steht linksbündig im Flattersatz auf einem Grundlinienraster von 8 px. Eine Aussage je Fläche. Vignelli: wenige, kräftige Formate, weite Ränder erzeugen Ruhe, das Raster trägt und wird nicht gezeigt (The Vignelli Canon: https://www.rit.edu/vignellicenter/sites/rit.edu.vignellicenter/files/documents/The%20Vignelli%20Canon.pdf; R2 Prinzipien 7 und 9).
- **Drei Größenstufen, eine Familie, ein Schnitt:** Stufe A 88 px auf 96 px Zeilenabstand, Laufweite minus 0,01 em, höchstens drei Zeilen und rund 30 Zeichen je Zeile (Sätze in Akt 1, Einsicht, Claim); Stufe B 40 px auf 52 px (Vertrag, weiße Stelle, Begründung unter einer Ansicht); Stufe C 22 px auf 32 px (Herkunft, Datum, Kriterium). Stufe A beginnt auf der Grundlinie bei 58 Prozent der Höhe, damit der Satz im Blickzentrum steht und Luft über sich hat. Stufe C steht immer unter dem, wozu sie gehört, nie darüber.
- **Schrift:** die UNIO-Hausschrift aus `tokens/fonts.css` (Power Grotesk) in einem Schnitt, keine Monospace-Zeilen, weil Mono in der Werkbank Oberfläche und Eyebrow bedeutet. Die Bühne ist die Stimme des Studios, das ihm seine Marke zeigt; seine Schrift erscheint erstmals in Akt 5. Ist `system.typo.display` einer Fassung selbst eine Grotesk mit ähnlichem Bild, prüft der CD in der Generalprobe, ob die Bühne sie vorwegnimmt (Lücke, keine Regel möglich ohne Messung).
- **Grund:** helles, unbuntes Grau (OKLCH L 0,94, C 0) mit Text L 0,20. Helle Polarität ist für längeres Lesen im Vorteil (Piepenbrock u. a. 2013: https://doi.org/10.1080/00140139.2013.790485); unbunt, damit weder das warme Papier der Empfehlung noch der dunkle Grund des Gegenentwurfs vorweggenommen wird. Die Restwirkung zugunsten heller Fassungen ist nicht null (Ableitung) und deshalb ab Akt 5 aufgehoben: Jede Fassung liegt auf ihrem eigenen Grund, die geteilte Bühne ist halb und halb, Akt 9 kehrt zum unbunten Grund zurück.
- **Akt 4e:** Claim und Idee im Bühnensatz über seinem Porträt im unbeschnittenen Original, nicht in der Form einer Fassung. Das ist die Idee, noch keine Anwendung.

**Ab Akt 5.** Jede Fassung auf ihrem Grund, Handy-Rahmen flach gezeichnet ohne Spiegelung, Karte und Schild als Montage auf eigenen Anwendungsfotos aus dem Kontaktbogen, in der Bildunterschrift als "Montage" gekennzeichnet. Keine Verläufe, kein Glow, kein Schatten als Effekt, keine gekauften Mockup-Vorlagen. Symbole nur als SVG. Harter Schnitt zwischen Akten, 300 Millisekunden Überblendung innerhalb eines Akts (Setzung).

**Kennzeichnung eigener Worte.** Unterstreichung, darunter in Stufe C "Ihr Workshop am ...", gerechnet nach `hmVertragHerkunft` (`07_positionierung.md` 3.4). Urheberbewusstsein ist ein eigener Wert (Franke, Schreier, Kaiser 2010: https://pubsonline.informs.org/doi/10.1287/mnsc.1090.1077).

### 3.8 Die Begründung je Ansicht

**Wo Pflicht.** In den Akten 4 bis 7 hat jede Ansicht der Arten `idee`, `profil`, `beitrag`, `website`, `karte`, `schild`, `signatur`, `typo`, `farbe`, `wortmarke` und `zeichen` genau einen Satz `begruendung {satz, kriterium, quelle}`. Ohne Pflicht, weil dort keine Formentscheidung gezeigt wird oder eine eigene Satzform gilt: `arbeit` (ein Satz, warum etwas fiel, Quelle `verworfenWeil`), `belege` (gezählte Zahlen), `strom` (kein Satz, er soll schauen), `achse` (ein Satz zur Achse, Quelle `idee.gezeigt.achse.warum`), `vergleich` (je Fassung zwei Sätze), `expose` (Lückenfläche). Dieselbe Liste steht in E2 und Q4.

**Wie der Satz klingt.** Ein gesprochener Satz, der eine Entscheidung erklärt, höchstens 20 Wörter, in der Anrede des Maklers. Keine Formel: Kein Satz beginnt mit "Aus Ihrem Vertrag", zwei aufeinanderfolgende Sätze beginnen nie mit demselben Wort, das Attribut darf im Satz vorkommen, muss aber nicht. Das Kriterium bleibt als Datum erhalten und steht als eine Zeile in Stufe C unter dem Satz, und zwar als Name, den `hmAttributAufloesen` aus der bestätigten Vertragsversion liefert; der Text hier nennt keinen Attributnamen fest. So hört er Argumente und sieht trotzdem, woran er morgen misst, ohne dass die Bühne wie eine Checkliste wirkt (Ableitung aus Monteiro, Erklären jedes sichtbaren Elements als Fehler, Sekundärquelle A3).

**Herkunft.** Das Kriterium kommt zuerst aus `entwurf[].kriterium` (Schritt 14, vom Strategen geprüft), sonst aus einer Zuordnung von `idee.begruendung[]` durch Claude, die der Stratege bestätigt. Ohne Claude ordnet die Nomen-Regel ein Attribut zu, wenn `weil` ein Nomen aus `imText` oder `imBild` des Attributs enthält; sonst steht "Kriterium vom Team" als Lücke, und der Ablauf ist nicht startbar. Die **Trefferquote der Nomen-Regel** (Anteil der Sätze, denen sie ohne Team ein Attribut zuordnet, das der Stratege stehen lässt) ist eine Setzung zum Messen: Ziel 60 Prozent an den ersten fünf Maklern; darunter wird die Regel durch ein Pflichtfeld `kriterium` in `idee.begruendung` ersetzt (Anforderung an Schritt 9 in 5.5, vorsorglich schon jetzt gestellt).

### 3.9 Die Rückmeldung

**Kopf.** "Ihre Rückmeldung. Etwa [Dauer aus `hmDauerText`]. Zwei Runden sind enthalten, genutzt: [Zahl]." Die Zahl liest `hmRundenGenutzt(mid)`, das `freigabe.runden.genutzt` aus Schritt 16 zurückgibt und 0, solange 16 noch nichts gezählt hat. Es ist nicht `rueckmeldung.runde`: Diese nummeriert die Rückmeldung (1 oder 2), und eine Rückmeldung ohne zählende Änderung verbraucht keine Runde (`16_freigabe.md` K6). Darunter die Nachlese: beide Fassungen im Telefon, umschaltbar, in der Reihenfolge des Termins, die Aufzeichnung, falls es eine gibt. Dann vier Teile mit "Teil 1 von 4".

**Teil 1, sechs Punkte aus Ihrem Vertrag.** Die fünf Attribute der bestätigten Version, gelesen nur über `hmAttributAufloesen(v, i)` (`07_positionierung.md` 8.2), und als sechster Punkt die Liste aus `hmVertragFalschListe(v)`, also `werte[].nie` als Verhalten und danach `falschWaere`, in der Reihenfolge der Vertragsseite. Namen, "heißt" und "heißt nicht" stehen in keinem Text dieses Schritts fest, auch nicht im Beispiel; Schritt 15 formuliert keinen Namen um. Das Kernidee-Attribut (`aus` "territorium.kernidee") ist immer unter den fünf, weil nur es misst, ob die Idee getroffen ist, auf der die Richtung gewählt wurde (`07_positionierung.md` 3.8); fehlt es, ist der Link nicht sendbar (Q12). Je Attribut: Name, "heißt", "heißt nicht", "Trifft die Marke das?" mit "Trifft", "Trifft teilweise", "Trifft nicht". Bei "teilweise" oder "nicht" öffnet die Anwendungsansicht: "Zeigen Sie uns die Stelle." Ein Tipp setzt einen Pin.

Für jedes Attribut, das die Achse berührt, folgt eine zweite Zeile: "Welche Fassung trifft es besser?" mit "Eher Papier", "Beide gleich", "Eher dunkel" (Beschriftung aus `idee.gezeigt.achse`). Welche Attribute das sind, steht in `idee.gezeigt.achse.beruehrt[]` (Anforderung an Schritt 9, 5.5); bis Schritt 9 es liefert, setzt der Stratege es beim Bauen des Ablaufs, Claude schlägt vor, gespeichert als `praesentation.achseBeruehrt[]` mit Quelle. Mindestens eines, höchstens drei (Setzung). Damit ist der Widerspruch der Fassung 2 aufgelöst: Inhalt, Stimme und Zeichen sind in beiden Fassungen gleich, darum wird das Attribut für die Marke beurteilt; wo die Achse wirkt, wird zusätzlich je Fassung beurteilt, und nur dort kann das Urteil die Wahl tragen.

"Was falsch wäre" hat zwei Zustände, "Nein" und "Ja, hier", gespeichert als `trifft` und `nicht`.

**Teil 2, die Wahl.** Über den zwei Telefonen steht sein eigenes Urteil aus Teil 1, etwa "Bei [Attribut A] haben Sie eher Papier gesehen, bei [Attribut B] beide gleich.", die Namen aus `hmAttributAufloesen`. Nichts ist vorausgewählt; Haltungen werden nie vorbelegt. Unter der Empfehlung "Unsere Empfehlung" mit zwei Sätzen am Vertrag, unter dem Gegenentwurf zwei Sätze, warum auch er trägt. Kein Feld für ein Warum: Wer Gründe für Geschmack aufschreiben soll, wählt anders und ist später weniger zufrieden (Wilson und Schooler 1991: https://doi.org/10.1037//0022-3514.60.2.181; Wilson u. a. 1993: https://doi.org/10.1177/0146167293193010). Weicht die Wahl von seinem Urteil ab, sperrt nichts; das Team sieht den Hinweis "Wahl gegen Urteil" und prüft in der Auswertung, ob ein Kriterium fehlt (Messwert, 1).

**Teil 3, der Name Ihrer Sendung.** Nach `12_social.md` F12-1: "Wie soll Ihre Sendung heißen?" mit den zwei Namen aus `serieSignatur.namen`, die Empfehlung markiert, darunter ihr Satz aus Schritt 12. Wählt er keinen, gilt die Empfehlung. Darunter klein: "Keiner passt." Das öffnet einen Pin der Art Änderung auf `serieSignatur.namen` mit einem Satz; die Empfehlung gilt vorläufig, und das Team schlägt in Rückmeldung 2 einen dritten Namen vor (wie F12-1). Diese Änderung hat `grund: "Wahl"` und zählt nicht als Runde, weil sie eine vom Team angebotene Wahl beantwortet, keine Form ändert (Setzung).

**Teil 4, noch etwas?** Freie Pins auf jeder Ansicht. Jeder Pin braucht eine Einordnung, die er selbst wählt: "Das fällt mir auf", "Das frage ich", "Das soll anders sein". Nichts vorausgewählt.

**Ende.** "Danke. Ihre Fragen beantworten wir bis ... Änderungen zeigen wir Ihnen bis ... in Ihrer Freigabe." Kein Logo einer Fassung unter der Zeile. Die dritte Runde ist mit Preis angekündigt, schon in der Einladung (`16_freigabe.md` 3.4); fehlt der Preis, steht "Zwei Runden sind enthalten." ohne weiteren Satz.

**Mitentscheider.** Eine Rückmeldung je Makler; steht in `auftrag.entscheider` jemand mit "entscheidet ja", zeigt der Kopf "Beantworten Sie das gemeinsam mit ...", `rueckmeldung.teilnehmer` hält fest, wer geantwortet hat.

**Pins.** `{id, ort, text, art}`; `ort` hält Ansicht, Fassung, Element, das Datenfeld aus dem Attribut `data-feld` des gerenderten Elements (etwa `feed.kacheln[3].caption`) und die Position. Ohne `data-feld` keine Zuordnung (Anforderung an 10 und 13).

| Art | Was das Team tut | Frist (Setzung) | Zählt als Runde |
|---|---|---|---|
| Beobachtung | liest, bestätigt bei Bedarf mit einem Satz | mit der Auswertung | nie |
| Frage | antwortet schriftlich neben dem Pin; führt die Antwort zu einer möglichen Änderung, fragt das Team, ob er sie will, und er setzt selbst einen Pin der Art Änderung | ein Werktag | nie |
| Änderung | ordnet Zielschritt und Feld zu und setzt `grund` (unten); entscheidet im Spielraum selbst, außerhalb entscheidet der CD mit Satz am Vertrag | zwei Werktage | nur `grund` "ausserhalb" mit Entscheidung "umsetzen" |

**`aenderungen[].grund`.** "Spielraum": der Wert liegt in `system.spielraum` oder in den Stimmregeln aus Schritt 8. "Tatsache": die Änderung korrigiert eine falsche Angabe (Zahl, Name, Straße, Telefonnummer, Tippfehler) und nennt in `beleg` die Quelle, die die richtige Angabe trägt (`beweise`, `vorab.fakten`, Unterlage); Fehler des Teams zählen nie (`16_freigabe.md` 3.4). "Wahl": dritter Serienname. "Ausserhalb": alles andere. `zaehltAlsRunde` ist wahr genau dann, wenn `grund` "ausserhalb" und `entscheidung` "umsetzen" ist. Das Team ordnet die Art eines Pins nie um; setzt es `grund`, ändert es nur die Zählung, und jede Einstufung als Tatsache oder Spielraum wirkt zugunsten des Maklers.

**Zuordnung zu Zielschritt und Feld.**

| `ort.feld` beginnt mit | Zielschritt | Beispiel | Im Spielraum möglich |
|---|---|---|---|
| `system.farbe`, `system.typo`, `bauteil.portraet` | 10 | Akzent zurückhaltender | ja, wenn `system.spielraum` den Pfad führt |
| `system.wortmarke`, `system.zeichen`, `system.raster` | 10 | anderer Platz des Zeichens auf der Karte | nein |
| `bild.kontaktbogen`, `feed.kacheln[].bild` | 11 | anderes Foto, anderer Ausschnitt | Ausschnitt innerhalb der Crop-Regel ja, die Regel nein |
| `serien`, `feed.kacheln[].serie` | 12 | Folge tauschen | nein |
| `serieSignatur.namen` | 12 | "Keiner passt." | Grund "Wahl" |
| `feed.kacheln[].caption`, `textImBild`, `feed.profilkopf.bio` | 13 | ein Satz klingt nicht nach ihm | ja, wenn die Stimmregeln aus 8 halten |
| `beweise`, Zahlen in Captions | 7 | "Es waren 13 Abschlüsse." | Grund "Tatsache" mit Beleg |
| `botschaften.claim`, `stimme` | 8 | anderer Claim | nein, neue Version |
| `markenvertrag`, `positionierung` | 7 | "[Name eines Attributs] ist nicht mehr, was ich will." | nein, neuer Vertrag, CD |
| `idee`, Achse | 9 | beide Fassungen falsch | nein, CD; zurück an Gate 1 nur bei Richtungswechsel |

Freitext ohne Feld ordnet Claude mit einem Vorschlag zu, der Stratege bestätigt.

**Rückmeldung 2.** Umgesetzte Änderungen zeigt Schritt 16 in der Freigabe-Ansicht, vorher und nachher. Wählt der Makler dort "Noch etwas ändern" (`16_freigabe.md` Q1), ruft Schritt 16 `hmRueckmeldungOeffnen(mid, { runde: 2, von: "freigabe" })` aus diesem Schritt auf. Die Funktion legt die Rückmeldung 1 unverändert in `rueckmeldung.vorher` ab und öffnet sofort (ohne neue 24 Stunden, er hat die Marke schon mit Abstand gesehen) eine Rückmeldung mit `runde: 2` im selben Link, mit: den Kriterien, die in Rückmeldung 1 "teilweise" oder "nicht" waren, den Kriterien, deren Stellen sich geändert haben, Teil 4 mit Pins, und Teil 3 nur dann, wenn in Rückmeldung 1 "Keiner passt." gesetzt wurde (dann mit dem dritten Namen neben der Empfehlung). Die Wahl der Fassung wird nicht neu gefragt. Vor dem Absenden steht der Hinweis aus Schritt 16 zur dritten Runde. Einen neuen Termin gibt es nur, wenn Vertrag oder Idee eine neue Version bekommen (Setzung).

**Zu schnelles Durchklicken.** Unter 90 Sekunden und überall "trifft" (Setzung): Der Stratege ruft kurz an und fragt, ob er alles gesehen hat (Muster aus `07_positionierung.md` Kapitel 7).

### 3.10 Was der Makler sieht und tut, was das Team tut

**Vor dem Termin.** Einladung und die Statuskarte aus Schritt 14. Keine Vorschau, kein Linkbild mit der Marke (Ableitung aus Mozilla).

**Im Termin.** Er sieht zu, liest seine Sätze, hält zweimal etwas in der Hand, sagt einmal je Lauf "Stopp", beantwortet zweimal "Woran?" und "Erkennen Sie sich darin?", stellt Fragen. Er entscheidet nichts. Airbnb wird von DesignStudio mit dem Satz des Gründers zitiert, er sehe in der Marke alles, was er immer sagen wollte (https://www.further.group/work/airbnb); diesen Moment soll der Strom erzeugen, und der Stopp macht ihn messbar.

**In der Hand.** Nach 5b ein Telefon des Teams mit seinem Profil, echtem Daumen-Scroll und Tipp in jeden Beitrag bis zur Caption; in 5d und 6e die Karte in beiden Fassungen, die er mitnimmt.

**Video-Termin.** Link auf seinem Telefon für die Dauer des Termins (Strom und Profil), Druckproben per Post nach 3.3. Vor Ort ist die Regel (R8 6.3, offen).

| Rolle | Im Termin | Außerhalb |
|---|---|---|
| Lead (wer den Workshop geführt hat, oder der CD) | führt, spricht, reicht Telefon und Karten, antwortet; schreibt nicht mit | Sprechzettel, Generalprobe, Antworten |
| Assistenz | Presenter-Ansicht, Stopp, Woran und Codes, Fragen als Pins | Strom zusammenstellen, Druckproben, Technik |
| CD | wenn nicht Lead: anwesend, stumm bis Akt 8 | Generalprobe abnehmen, Änderungen außerhalb des Spielraums entscheiden |
| Stratege | optional | Auswertung, Zuordnung, Antworten |

"Wer macht, spricht mit dem Kunden" folgt Pentagram, wo Partner zugleich Ansprechpartner sind (https://www.pentagram.com/about); "nicht selbst mitschreiben" folgt Monteiro (Sekundärquelle).

**Sätze, die nie fallen** (Sperrliste aus `entwurf[].nieFragen` plus): "Gefällt es Ihnen?", "Wie finden Sie das?", "Was sagen Sie?", "Mögen Sie ...", "Wir haben uns gedacht ...", "Das ist nur ein Vorschlag", "Das können wir jederzeit ändern", und im Strom jeder Hinweis auf Platz oder Form seiner Beiträge.

**Antworten für typische Momente.** "Nehmen wir das Dunkle." Antwort: "Halten wir fest. Entscheiden Sie morgen, mit einer Nacht Abstand." (Beobachtung, keine Wahl). "Kann man die Farbe noch ändern?" Antwort: "In einem Bereich, den wir vorbereitet haben. Setzen Sie morgen einen Pin, wo es Ihnen auffällt." (Frage mit Antwort). "Das will ich nie sehen." Antwort: "Bitte morgen bei 'Was falsch wäre' markieren." Kommentare zu fremden Beiträgen im Strom: nichts dazu, weiter.

### 3.11 Was Claude, Regeln und Team erzeugen

| Ausgang | Claude | Regeln (ohne Claude dieselbe Struktur) | Team |
|---|---|---|---|
| `praesentation.ablauf` | gesprochene Sätze je Ansicht, Zuordnung zum Attribut, Sprechzettel | Akte aus `entwurf` nach 3.2, Minuten, Inhaltsverweise, Kriterium aus `entwurf` oder Nomen-Regel oder Lücke | redigiert, Generalprobe |
| Sätze für Akt 1 | schlägt aus den Kandidaten drei vor, mit Grund | Kandidaten nach Q3, Rangfolge: mit Verweis in `markenvertrag.herkunft`, dann in `idee.begruendung`, dann Zeit | wählt drei, Reihenfolge |
| `praesentation.achseBeruehrt` | Vorschlag | aus `idee.gezeigt.achse.beruehrt`, wenn vorhanden | setzt oder bestätigt |
| `praesentation.strom` | nie | Auswahl aus `HM_STROM_POOL`, Plätze, Takt, Löschdatum | prüft |
| `praesentation.fremdtest` | nie | Stopp-Messung, `hmFremdtestUrteil`, Sperre für 16 | notiert wörtlich, markiert Codes, bestätigt |
| `rueckmeldung` | nie | aus Vertragsversion, `achseBeruehrt`, `serieSignatur`, `idee.gezeigt` | zwei Sätze je Fassung aus dem Ablauf |
| `pins[].antwort` | Entwurf aus dem Markenbuch | nie | antwortet |
| `aenderungen[]` | Vorschlag für Zielschritt, Feld, Wert bei Freitext | `data-feld`, Spielraum, `grund`-Vorschlag, `zaehltAlsRunde` | bestätigt, CD außerhalb |

Claude sieht keine Bilder, keine Namen Dritter, keinen Strom; Claude klassifiziert nie die Art eines Pins und entscheidet nie eine Änderung.

### 3.12 Beispiel: Markus Leitner, Döbling, Zinshaus, Figur Kenner, Sie-Form

**Stoff und Herkunft.** Die v2-Schritte sind für Markus noch nicht gelaufen. Das Beispiel nutzt die Entwürfe 1 und 4 bis 14 in diesem Ordner, den Seed `markus` (`wb-store.jsx` Zeile 72, 102, 103) und nennt je Zeile die Herkunft. Achse `tonwert` und Zeichen "Das Zeitmaß" nach `09_idee.md` 3.11, bestätigt in `10_system.md` (Fassung mit Achsen aus 10.9). Farbwerte als Arbeitswerte aus Schritt 10 (Papier #F5F1EA, Text #191714, Dunkel #141210, Akzent OKLCH 0,72 0,11 68, auf dunklem Grund #D29754, auf Papier #B17834; hergeleitet aus dem angenommenen Bestandston #E1901F, in dem der Seed-Satz "zurückhaltender" schon verarbeitet ist, `10_system.md` 10.5), Annahme bis zur Messung am alten Logo. Serien nach `12_social.md`: Signatur "Zeitwert", Alternative "Die Zeit daneben" ("Nach dem Grundbuch" ist dort gestrichen). Kriterien stehen im Beispiel als Verweis auf `markenvertrag.attribute[]` (a1 bis a5 nach `07_positionierung.md` 3.8, a5 ist das Kernidee-Attribut); ihre Namen löst `hmAttributAufloesen` zur Laufzeit auf und stehen deshalb hier nicht. Das Feed-Beispiel in `13_feed.md` führt die Signatur noch als "Noch nicht verkaufen"; die Kacheln unten folgen den Inhalten aus 13 und der Kennung aus 12 (Hinweis an 13 in 5.5).

**Termin.** Do 05.11.2026, 10 bis 11 Uhr (Datum aus `auftrag.termine`, `01_auftakt.md` 3.6; Uhrzeit Annahme aus Seed `verfuegbar` "Vormittag"). Ort: Lücke. Teilnehmer: Markus Leitner; Mitentscheider Lücke (F1 in Schritt 1); Lead Daniel als CD, damit sind zwei Personen des Teams im Termin; Assistenz ein zweites Teammitglied. Aufzeichnung nur mit Einwilligung, heute Lücke. Porträts aus dem Porträt-Termin am 29.10.2026 (Annahme nach `11_bild.md` 3.12). Keine eigenen Objekte im Bestand, Objekt-Kachel ist Lückenkachel (`13_feed.md`, Nr. 7). Gate-2-Frist Di 03.11.2026 (`14_markenbuch.md` 4). Druckproben bestellt spätestens Do 29.10.2026 (fünf Werktage, der 26.10. ist Feiertag). Rückmeldung ab Fr 06.11.2026, 11 Uhr.

**Einladung (Textstand, Minuten aus `hmDauerText`).**

```text
Ihr Reveal
Donnerstag, 5. November, 10 bis 11 Uhr, [Ort].
Dabei: Sie, Daniel, [Assistenz]. [Mitentscheider, falls vorhanden.]

Wir zeigen Ihnen Ihre Marke so, wie Ihre Kunden sie sehen werden:
auf dem Telefon, auf Ihrer Karte, an Ihrem Schild.
An diesem Tag entscheiden Sie nichts.
Ab Freitag, 11 Uhr, antworten Sie in etwa 15 Minuten,
entlang Ihres Markenvertrags.
Zwei Runden sind enthalten.
```

Der Satz zur dritten Runde fehlt, weil der Preis im Katalog fehlt (`16_freigabe.md` 3.4).

**Akt 1 heute: Lücke, mit Begründung.** Die Regel aus 3.4 prüft die vorhandenen Kandidaten und lehnt alle ab:

| Kandidat | Herkunft | Ergebnis |
|---|---|---|
| "Sievering, zwischen Sieveringer Straße und Agnesgasse" | Seed `graetzl`, Fragebogen | abgelehnt: kein Zitat aus dem Workshop, Ortsangabe ohne Verb |
| "Dass sie sich nie gedrängt gefühlt haben." | `workshop.zitate` z1 (`04_workshop.md` 8.2) | abgelehnt: Nebensatz ohne Hauptsatz, `oeffentlich: offen`, zudem seine Wiedergabe über Kunden (Beleg b6 bleibt intern, `07_positionierung.md`) |
| "Einer Erbengemeinschaft geraten, zwei Jahre zu warten, statt unter Druck zu verkaufen." | Seed `abgeraten`, Fragebogen | abgelehnt: kein Zitat aus dem Workshop, ohne Subjekt |

Der Ablauf ist damit nicht startbar, bis der v2-Workshop drei Sätze mit `oeffentlich: ja` liefert; `04_workshop.md` sieht genau dieses Vorlesen am Ende vor. Kein Satz wird ersatzweise formuliert.

**Der Ablauf, Ansicht für Ansicht.** Minuten sind Setzung und werden in der Generalprobe je Ansicht gestoppt (Q16).

| Akt | Ansicht | Min. | Auf der Fläche | Gesprochener Satz, darunter Kriterium | Herkunft |
|---|---|---|---|---|---|
| 0 | rahmen | 2 | "Heute zeigen wir. Morgen entscheiden Sie." Darunter "Bis 11 Uhr. Ab Freitag, 11 Uhr, etwa 15 Minuten." | keiner | `auftrag.termine`, `auftrag.dauer` |
| 1 | satz 1 bis 3 | 3 | Lücke (oben) | keiner | `workshop.zitate` |
| 2 | einsicht | 2 | "Eine Erbengemeinschaft kommt über den Notar und will von Ihnen wissen, ob sie verkaufen soll. Verdienen würden Sie nur am Ja." | keiner; Status Arbeitsstand, Vermutung: Lead sagt, dass die Lesart aus seinen Antworten stammt und noch nicht von Kunden gehört ist, dann den unbequemen Teil (bisher ein Fall, erzählt, ohne Unterlage) | `einsicht.satz`, `satz.vermutung`, `einsicht.unbequem` (`05_einsicht.md` 3.9 und 3.10) |
| 2 | weisse Stelle | 1 | "Er rät Erben vom schnellen Verkauf ab, wenn Warten mehr bringt, und kann das an einem eigenen Fall mit Zahl zeigen." (intern; die Zahl bleibt ohne Unterlage von der Fläche) | keiner | `einsicht.weisseStelle` |
| 3 | vertrag | 3 | Positionierungssatz; die fünf Attribute a1 bis a5 über `hmAttributAufloesen`, je mit "heißt nicht"; "Bestätigt am [Datum], Version 1" | "Daran messen Sie morgen." | `07_positionierung.md` 3.8 |
| 4 | arbeit, Einsichten | 0,75 | "Drei Einsichten haben wir geprüft. Eine blieb." | Satz aus `einsicht.kandidaten[].grund` | 14 Kapitel 1, Absatz 2 |
| 4 | arbeit, Richtungen | 1 | zwei gefallene Territorien als Rohskizze, je ein Satz | Satz aus `gate1.verworfenWeil` | 14 Kapitel 1, Absatz 3 |
| 4 | arbeit, Zeichen | 1,25 | "Acht Ideen für ein Zeichen." Drei kleine Renders auf seinem Porträt: Die Kante, Das Zeitpaar, Die Stand-Zeile | "Die Kante haben wir verworfen. Sie zeigt eine Entscheidung, keine Dauer." | `idee.varianten`, `09_idee.md` 3.11 |
| 4 | belege | 0,5 | "Vier Zahlen tragen Ihren Feed. Alle sind heute Ihre Angabe. Vor dem Live-Tag brauchen wir den Kaufvertrag zum Zinshaus in Sievering und die Unterlagen zur Erbengemeinschaft." | keiner | `beweise` b1, b2, b3, b5, Prüfstatus Selbstauskunft, gezählt |
| 4 | idee | 1,5 | Bühnensatz über seinem Porträt im Original: "Zeit ist Teil des Preises." Darunter in Stufe B: "Neben jedem Preis steht seine Zeit." | "Deshalb steht neben jeder Zahl, die Sie zeigen, ihre Dauer." a5 | `botschaften.claim`, `idee.satz`, `idee.begruendung` E1 |
| 5a | strom | 2,5 | Telefon in seiner Hand, Home-Feed, sieben Bilder aus dem Pool (Stadt, Essen, Kultur, Sport), seine Beiträge auf Platz 3 (13 Nr. 8, Reel-Titelbild "Manchmal ist schnell richtig: 11 Wochen.", Kennung "Zeitwert") und Platz 7 (13 Nr. 1, "Ich habe vom Verkauf abgeraten.") | keiner; "Sagen Sie Stopp, sobald Sie sich sehen." Dann "Woran?", dann "Erkennen Sie sich darin?" | `feed.kacheln`, `praesentation.strom`; `idee.codes` Zeitmaß, Porträtstil, Serienkennung |
| 5b | profil | 3 | Profilkopf mit Porträt, Name, Bio aus 13, drei Highlights, drei angepinnte Beiträge; Wochenregler 1 bis 4 | "In jeder Zeile steht ein Ort zwischen Sieveringer Straße und Agnesgasse, und kein Haus ist zu erkennen." a1 (Ortsregel) | `feed.wochen`, `feed.profilkopf` |
| 5b | profil in der Hand | 1,5 | dasselbe auf dem Telefon in seiner Hand | keiner | `?ansicht=reveal-handy` |
| 5c | beitrag, Signatur | 1 | 13 Nr. 1 mit Caption, Kennung "Zeitwert 01" | "Wir empfehlen Zeitwert. Sie haben unterschrieben, dass Zeit Teil des Preises ist, und genau das rechnet jede Folge vor." a1 | `12_social.md` Satz im Reveal; `feed.kacheln[0]` |
| 5c | beitrag, Beleg | 1 | 13 Nr. 8, kurze Spanne des Zeitmaßes neben der langen aus Nr. 1 | "Neben jeder Geschichte vom Warten steht ein schneller Fall, darum klingt Warten nie nach Zögern." a5 | `gate1.schaerfung`, b2 |
| 5c | beitrag, Karussell | 1 | 13 Nr. 2 "Ein Zinshaus in Sievering, in drei Zahlen.", Seite 1 und 2, Caption bis zum letzten Satz | "Keine Prognose steht darin, nur was sich belegen lässt, und bei jeder Zahl, woher sie kommt." a3 | `feed.kacheln[1]`; Marktzahlen Lücke |
| 5d | website | 1,5 | erster Bildschirm auf Telefon und Laptop mit Versprechen | "Ein Motiv und viel Raum: Wer Sie empfohlen bekommt, liest zuerst einen Satz, nicht zehn." a2 | Anwendungen im Markenbuch, `versprechen` |
| 5d | karte | 1,5 | Druckprobe in der Hand, auf der Bühne Montage auf dem Schreibtischfoto | "Die Ziffern haben alle dieselbe Breite, damit Telefonnummer und Preise auch in 8 Punkt eindeutig bleiben." a1 | `system.typo`, `10_system.md` 10.2 |
| 5d | schild | 1 | Montage auf einer Straße in Sievering ohne Hausnummern, gekennzeichnet "Montage" | "Kein Haus eines Kunden, keine Hausnummer, nur Ihr Name und das Zeitmaß." a4 | Kontaktbogen, Kann-Motiv Anwendungsort; Schildmaß Lücke |
| 5d | signatur | 0,5 | E-Mail-Signatur im Postfach eines Notariats, anonymisiert | "Zwei Zeilen, keine Werbung darunter; ein Notar liest Sie wie einen Kollegen." a4 | Anwendungen im Markenbuch |
| 5d | expose | 0,5 | "Ihr erstes Objekt", Felder für HWB, Endenergiebedarf, Klasse, ohne Werte | keiner | Lückenfläche, kein Demo-Objekt |
| 6a | achse | 0,5 | "Dieselbe Marke, ein Unterschied: dunkler Grund statt Papier." | Lead: "Bei Licht und Grund waren Ihre Angaben nicht eindeutig. Darum zeigen wir beides." | `idee.gezeigt.achse.warum`; zur Quelle unten |
| 6b | strom | 2,5 | derselbe Strom, seine Beiträge auf Platz 4 und 8, dunkler Grund, Zeitmaß in Amber | keiner; Stopp, Woran, Erkennen | `feed.gegenentwurf`, `strom` |
| 6c | profil | 2 | Profil nach Woche 4 auf dunklem Grund | "Der Ort bleibt in jeder Zeile, das Licht wird abendlicher und ernster." a2 | `feed.gegenentwurf` |
| 6d | beitraege | 1,5 | dieselben drei Beiträge, je 0,5 Minuten | je ein Satz zum selben Kriterium wie in 5c | `feed.gegenentwurf` |
| 6e | alltag | 2,5 | Website 0,5, Karte als zweite Druckprobe 1, Schild 0,5, Signatur 0,25, Exposé 0,25 | je ein Satz, etwa zur Karte: "Auf Dunkel tritt die Nummer in Amber vor, lesbar bleibt sie durch dieselben Ziffern." a1 | `system.gegenentwurf` |
| 6f | vergleich | 1 | links Papier, rechts dunkel, beide Profile nach Woche 4. Links: "Unsere Empfehlung. Das Zeitmaß ist eine Bemaßung und liest sich auf Papier wie ein Plan. Das Vormittagslicht bleibt Tageslicht." Rechts: "Warum auch das trägt. Auf dunklem Grund tritt das Zeitmaß in Amber hervor. Der Feed wird ernster." | wie auf der Fläche | `09_idee.md` 3.11; Kontrast `10_system.md` 10.5 |
| 7 | typo | 1 | geteilt: Kernsatz, Kennzahl "11 Wochen", Fließtext, je auf Papier und dunkel | "Die Ziffern tragen hier die Idee, also bekommen sie die meiste Sorgfalt." a1 | `system.typo`; Familie Lücke |
| 7 | farbe | 1 | geteilt: Papier, Text, Fläche, Amber mit Anteil 72, 14, 10, 4; dunkler Rollensatz rechts | "Amber erscheint nur dort, wo eine Dauer steht, nie als Fläche." a2 | `10_system.md` 10.5, Arbeitswerte |
| 7 | wortmarke | 1 | geteilt; vorher und nachher, wenn die Logo-Datei vorliegt, sonst "Ihr heutiges Logo liegt uns noch nicht als Datei vor." | "Geblieben ist, woran man Sie kennt; weggefallen ist jeder Zusatz neben dem Namen." a4 | `system.wortmarke`, `vorlieben.bestandBehalten`; Befund Lücke |
| 7 | zeichen | 1 | geteilt: das Zeitmaß groß als Punkt und als Spanne auf beiden Gründen. Darunter: "Architekten bemaßen Raum. Sie bemaßen Zeit." | Herleitung wie auf der Fläche. a5 | `idee.zeichen.herleitung` (`09_idee.md` 3.11, auf Sie umgestellt) |
| 8 | fragen | 10 | die geteilte Zeichen-Fläche bleibt | "Welche Fragen haben Sie?" | Pins aus dem Termin |
| 9 | abschluss | 2 | unbunter Bühnengrund: "Morgen entscheiden Sie." Darunter "Ab Freitag, 11 Uhr: Ihre Rückmeldung, etwa 15 Minuten. Danach zeigen wir Ihnen die Änderungen in Ihrer Freigabe." | keiner | `rueckmeldung.offenAb` |

Summe: 2 + 3 + 3 + 3 + 5 + 15 + 10 + 4 + 10 + 2 = 57 Minuten, dazu 3 Minuten Puffer. Akt 6 hat 67 Prozent der Minuten von Akt 5. Alle fünf Attribute kommen in den Ansichten mit Begründungspflicht vor: a1 fünfmal, a2 dreimal, a3 einmal, a4 dreimal, a5 dreimal; kein Satz beginnt mit "Aus Ihrem Vertrag", keine zwei Nachbarsätze beginnen gleich. Die Ansichten `arbeit`, `belege`, `strom`, `achse`, `vergleich` und `expose` sind nach 3.8 ohne Pflicht. Nach Akt 6 zeigt jede Ansicht beide Fassungen oder den unbunten Grund. Q4 und Q2 bestehen damit, sobald die Lücken gefüllt sind.

**Zur Quelle der Achse in 6a.** Schritt 9 wählte die Achse nach Regelstufe 2 mit dem Seed-Satz "Ja, dunkel passt." (Nachricht n2). Dieser Satz antwortete auf einen v1-Vorschlag einer anderen Welt ("Zwei Farbwelten stehen zur Wahl, ich habe die dunkle vorausgewählt", n1) und ist im Seed nicht datierbar. Er wird ihm deshalb nicht als Grund vorgelegt. Im Betrieb steht in 6a ein Zitat aus `workshop.zitate` oder ein Eintrag aus `vorlieben.widersprueche`, wenn es die Achse trägt; bei Markus heute Lücke. Bis dahin steht auf der Fläche nur der Unterschied, und der Lead spricht den Satz, der aus `vorlieben.profil` belegbar ist ("nicht eindeutig", keine Sicherheit hoch bei Licht nach Klärung).

**Achsenberührte Attribute (Setzung des Strategen, bis Schritt 9 `beruehrt` liefert).** a2 (Licht und Grund bestimmen die Ruhe des Feeds) und a1 (Lesbarkeit der Ziffern und des Zeitmaßes auf dem jeweiligen Grund).

**Was heute Lücke ist und den Termin sperrt.** Drei Sätze für Akt 1, Lizenz des Strom-Pools, Bio und Highlights aus 13 (dort Entwurf, Bilder Lücke), Schriftfamilie, Logo-Datei, Schildmaß, Druckerei, Achsenzitat für 6a (sperrt nicht, der Lead spricht den Ersatzsatz). Dass die Zahlen in den Kacheln nur Selbstauskunft sind, sperrt den Termin nicht, weil der Feed nicht veröffentlicht wird; es sperrt den Live-Tag in Schritt 16.

**Die Rückmeldung für Markus (Textstand).**

```text
Ihre Rückmeldung
Etwa 15 Minuten. Sechs Punkte aus Ihrem Vertrag, eine Wahl, ein Name.
Zwei Runden sind enthalten, genutzt: keine.

[Nachlese: beide Fassungen im Telefon, umschaltbar. Aufzeichnung, falls vorhanden.]

Teil 1 von 4

[a1: Name]
[a1: heißt]. Heißt nicht: [a1: heißt nicht].
Trifft die Marke das?
[ Trifft ]  [ Trifft teilweise ]  [ Trifft nicht ]
Welche Fassung trifft es besser?
[ Eher Papier ]  [ Beide gleich ]  [ Eher dunkel ]

[a2: Name]
[wie oben, mit der zweiten Zeile]

[a3, a4, a5: je Name, heißt, heißt nicht]
[nur die erste Zeile]

Was falsch wäre
[hmVertragFalschListe: zuerst werte[].nie, danach falschWaere]
Taucht etwas davon auf?
[ Nein ]  [ Ja, hier ]

Teil 2 von 4
Welche Fassung nehmen wir?
Ihr Urteil: Bei [a2: Name] [Ihre Antwort], bei [a1: Name] [Ihre Antwort].
[Telefon Papier]                     [Telefon dunkel]
Unsere Empfehlung.                   Warum auch das trägt.
Das Zeitmaß liest sich auf Papier    Auf dunklem Grund tritt das
wie ein Plan. Das Vormittagslicht    Zeitmaß in Amber hervor. Der Feed
bleibt Tageslicht.                   wird ernster.
[ Papier ]                           [ Dunkel ]

Teil 3 von 4
Wie soll Ihre Sendung heißen?
[ Zeitwert ]  Unsere Empfehlung. Sie haben unterschrieben, dass Zeit
              Teil des Preises ist, und genau das rechnet jede Folge vor.
[ Die Zeit daneben ]  Nimmt den Satz "Neben jedem Preis steht seine Zeit."
                       wörtlich, in Alltagssprache.
Keiner passt.

Teil 4 von 4
Noch etwas? Tippen Sie auf die Stelle.
[ Das fällt mir auf ]  [ Das frage ich ]  [ Das soll anders sein ]

Danke. Ihre Fragen beantworten wir bis Montag, 9. November.
Änderungen zeigen wir Ihnen bis Dienstag, 10. November, in Ihrer Freigabe.
```

Die Sätze zu den Namen stammen aus `12_social.md` ("Satz im Reveal unter der Empfehlung" und Tabelle "Die zwei Namen"). Die Daten 9. und 10. November folgen den Fristen aus 3.9 und dem Freigabetermin im Beispiel von `16_freigabe.md` (P9).

**Pins zur Mechanik.** Alle Texte sind Beispiele zur Mechanik, keine Aussage über Markus. Der Seed-Satz "Der Amber-Ton darf etwas zurückhaltender sein." (n2) ist kein Pin: Schritt 10 hat ihn bereits im Startwert verarbeitet (Chroma 0,11, `10_system.md` 10.5 und Hinweis 10 in dessen Änderungsliste); er wirkt nur einmal.

| Pin | Art (von ihm gewählt) | `ort.feld` | Folge |
|---|---|---|---|
| "Der Satz oben im Beitrag darf etwas größer sein." (Annahme, nicht aus dem Seed) | Änderung | `system.typo.kernsatz` | Zielschritt 10, über `system.pinZuordnung` auf `rolle.typo.kernsatz`, `grund` "Spielraum": Größe relativ +0,04 nach der Übersetzung "größer" (`10_system.md` 10.7, Spanne -0,08 bis +0,08); zählt nicht |
| "Es waren 15 Abschlüsse 2025, nicht 14." | Änderung | `beweise[b5]` | Zielschritt 7, `grund` "Tatsache", `beleg` Unterlage offen; zählt nicht |
| "Wer fotografiert später meine Objekte?" | Frage | `feed.kacheln[6].bild` (Lückenkachel) | Antwort aus dem Fotobrief; keine Runde |
| "Die Telefonnummer gehört auf die Vorderseite der Karte." | Änderung | `system.raster.karte` | Zielschritt 10, `grund` "ausserhalb", CD entscheidet am Vertrag; wird sie umgesetzt, `zaehltAlsRunde` wahr, `freigabe.runden.genutzt` wird 1 |

---

## 4. Fragen an den Makler

Jede Frage hat ein Zielfeld; eine andere Antwort ändert das Feld nachweisbar (Probe: Antwort tauschen, Ausgang vergleichen).

### 4.1 Was gefragt wird

**Im Termin**

| Nr. | Frage | Wirkt auf | Warum, und was eine andere Antwort ändert |
|---|---|---|---|
| T1 | "Sind alle hier einverstanden, dass wir den Termin für Ihre Nachlese aufzeichnen?" Nur bei Einwilligung "Reveal aufzeichnen" aus Schritt 1 | `praesentation.aufzeichnung.zustimmung[]`, `aktiv` | Die Einwilligung aus Schritt 1 deckt nur den Makler. Ein Nein heißt keine Aufzeichnung, `uebergabe.aufzeichnung` in 16 bleibt leer. Rechtsgrundlage offen |
| T2 | im Strom je Lauf: "Sagen Sie Stopp, sobald Sie sich sehen." (Aufforderung, keine Frage), dann "Woran?", dann auf dem Profil "Erkennen Sie sich darin?" | `praesentation.fremdtest[]`: `stoppPlatz`, `stoppMs`, `antwortWoran`, `codesGenannt[]`, `antwortWoertlich`, `erkannt` | Prüft Wiedererkennung der Codes im echten Kontext statt Gefallen (R7 Kapitel 4, Hsee 1996). Probe: Stopp bei Platz 3 mit "das Zeitmaß" ergibt "ja"; Stopp erst bei 7 ergibt "teilweise"; kein Stopp ergibt "nein" und sperrt in 16 das Einfrieren. Keine Erweiterung ("Was gefällt Ihnen daran?"), "Woran?" ist die einzige Nachfrage |
| T3 | "Welche Fragen haben Sie?" in Akt 8 | `rueckmeldung.pins[]` Art Frage, `quelle: termin`, `antwort` | Fragen werden beantwortet statt zu Änderungswünschen zu werden (Monteiro, Figma, Lerman); häufige Fragen zu einer Ansicht zeigen, dass sie unklar ist (`messung.fragenJeAnsicht`) |

**In der Rückmeldung**

| Nr. | Frage | Wirkt auf | Warum, und was eine andere Antwort ändert |
|---|---|---|---|
| R1 bis R5 | je Attribut "Trifft die Marke das?" mit Stelle bei "teilweise" oder "nicht" | `rueckmeldung.jeKriterium[].urteil`, `stelle` | Der Vertrag ist ab Schritt 7 der Maßstab (G5). "Nicht" mit Stelle erzeugt einen Pin und daraus eine Änderung mit Zielschritt; "trifft" erzeugt nichts. Probe: a2 "trifft nicht" am Karussell ergibt eine Änderung an `feed.kacheln[1].textImBild` |
| R1a | bei achsenberührten Attributen: "Welche Fassung trifft es besser?" | `rueckmeldung.jeKriterium[].variante` | Das Urteil je Fassung steht über der Wahl in Teil 2; weicht die Wahl ab, sieht das Team "Wahl gegen Urteil". Probe: "eher dunkel" bei a2 und a1 ändert die Zeile über den Telefonen und die Auswertung |
| R6 | "Was falsch wäre: Taucht etwas davon auf?" | `jeKriterium[5]` | Ein Grenzbruch ist ein Vertragsbruch; "Ja, hier" erzeugt eine Änderung mit Vorrang |
| R7 | "Welche Fassung nehmen wir?" | `rueckmeldung.wahl` | entscheidet, ob `system` und `feed` oder `system.gegenentwurf` und `feed.gegenentwurf` in 16 zur `quelle` werden |
| R8 | "Wie soll Ihre Sendung heißen?" mit "Keiner passt." | `rueckmeldung.serienname`, gegebenenfalls Pin auf `serieSignatur.namen` | 16 überträgt in `serieSignatur.gewaehlt`: jede Kennung, das Staffelplakat, alle Vorlagen der Serie (`12_social.md` F12-1) |
| R9 | "Noch etwas? Tippen Sie auf die Stelle." mit Pflicht zur Einordnung | `pins[]`, `aenderungen[]` | Nur Pins der Art Änderung werden zu Änderungen; seine Einordnung entscheidet, was zählen kann |

### 4.2 Was nicht gefragt, sondern abgeleitet wird

| Was man fragen könnte | Warum nicht | Woher es kommt |
|---|---|---|
| "Gefällt es Ihnen?", Sterne, Schulnote | Geschmacksurteil über Neues ist der schlechteste Maßstab; die Rubrik verbietet es | R1 bis R6 |
| "Warum wählen Sie diese Fassung?" | Gründe für Geschmack verschlechtern Wahl und Zufriedenheit (Wilson und Schooler) | Urteil aus R1a steht über der Wahl |
| "Welche Attribute berührt die Achse?" | Arbeit des Teams | `idee.gezeigt.achse.beruehrt` oder Strategen-Setzung |
| "Was ist Ihnen aufgefallen?" im Termin | kein Zielfeld | Beobachtungen notiert die Assistenz |
| "Was würden Sie ändern?", "Welche Farbe, welche Schrift?" | Gestaltungsaufgabe | R9 mit Stelle, Feinwunsch über `system.spielraum` |
| "Wer ist dabei?", "Wann passt es?", "Dürfen wir Ihre Objekte zeigen?" | liegt vor | `auftrag.entscheider`, `auftrag.termine`, `auftrag.einwilligungen` |
| Welche fremden Beiträge im Strom | Arbeit des Teams, und jedes Vorwissen verfälscht den Test | `einsicht.zielgruppe`, `HM_STROM_POOL` |
| "Ist das eine Frage oder eine Änderung?" durch das Team | nur er ordnet ein | R9 |
| Leitidee als Kriterium | nie von ihm bestätigt | D1 |

---

## 5. Eingang und Ausgang

### 5.1 Eingang nach dem Vertrag

**Regel:** Jedes Feld wird in der Version gelesen, die Gate 2 abgezeichnet hat (3.5).

| Von | Feld | Wofür |
|---|---|---|
| 14 | `markenbuch` | Einsicht, Vertrag, Kapitel 1 mit verworfenen Wegen, Anwendungen, `basis` mit Prüfsummen |
| 14 | `gate2` | Sperre: `status`, `version`, `sperren`, `frist` |
| 14 | `praesentation.entwurf` | Ansichten, Quellen, Kriterium, Sprechnotiz, `nieFragen` (Struktur nach 14 5.5, nur gelesen) |
| 13 | `feed`, `feed.wochen`, `feed.gegenentwurf`, `feed.profilkopf` | Strom, Profil, Beiträge, Wochenregler, Akt 6; `feed.pruefung` als Sperre |
| 7 | `markenvertrag` | Akt 3, Kriterien der Rückmeldung, `herkunft`, `version` |
| 4 | `workshop.zitate` | Akt 1: nur `sprecher: makler`, `oeffentlich: ja`, ohne Personenbezug |
| 9 | `idee.gezeigt`, `idee.begruendung` | Achse, Empfehlung, Sätze, Sperre `abgenommen` |
| 10 | `system`, `system.gegenentwurf` | Akt 5 bis 7, `system.spielraum` für die Auswertung |
| 1 | `auftrag.entscheider`, `auftrag.termine`, `auftrag.einwilligungen` | Teilnehmer, Daten, Aufzeichnung, Objektfotos |

### 5.2 Ergänzungen im Eingang, begründet

| Von | Feld | Warum | Folge |
|---|---|---|---|
| 12 | `serieSignatur` (`namen[2]`, `empfehlung`) | Vertrag verlangt `rueckmeldung.serienname`; 12 nennt 15 als Ort der Wahl (F12-1) | **Symmetrie:** 15 bekommt 12 als Vorgänger, 12 hat 15 als Nachfolger (12 schreibt "Schritt 15 schreibt `rueckmeldung.serienname`") |
| 9 | `idee.codes`, `idee.gezeigt.achse.beruehrt` (neu) | Einordnung des Fremdtests; achsenberührte Attribute | 9 ist Vorgänger; `beruehrt` ist Anforderung an 9 |
| 1 | `auftrag.dauer` über `hmAuftragDauer` | ehrliche Dauer in Einladung und Kopf | 1 ist Vorgänger |
| 7 | `beweise` (Prüfstatus) | Zählung in Akt 4d, Tatsachen mit Beleg | 7 ist Vorgänger |
| Extern | `HM_STROM_POOL` (lizenziert), optional Bildschirmfotos anderer Kategorien nach Owner-Freigabe | Fremdtest | nur lokal, Löschdatum |
| 16 | `freigabe.runden.genutzt`, nur zur Anzeige im Kopf der Rückmeldung | `16_freigabe.md` K6 | keine Eingangskante: nichts davon fließt in einen Ausgang von 15; die Zählung bleibt eine Funktion über `aenderungen[]` |

Nicht als Eingang: `8: botschaften.claim`, `5: einsicht`, `11: bild` (kommen über das Markenbuch, eine Quelle); `1: vorab.wettbewerb` (entfällt, seit der Strom keine Makler zeigt).

### 5.3 Ausgang nach dem Vertrag und Abnehmer

| Feld | Struktur | Abnehmer |
|---|---|---|
| `praesentation` (ohne `entwurf`) | `{version, gate2Version, status, datum {start, ende}, ort, form, teilnehmer[], einladung, ablauf[], achseBeruehrt[], druckproben, generalprobe, verschiebung[], aufzeichnung {erlaubt, zustimmung[], aktiv, blobId, loeschenAm}, messung}`; Aufzeichnung nur mit Einwilligung | 16 (`uebergabe.aufzeichnung`, `freigabe.historie`) |
| `praesentation.fremdtest[2]` | `{variante, eigenePlaetze[2], stoppPlatz, stoppMs, antwortWoran, codesGenannt[], antwortWoertlich, erkannt ja, teilweise oder nein, regelUrteil, bestaetigtVon, abweichungGrund}` | 16 (P19) |
| `rueckmeldung` | `{runde 1 oder 2, von reveal oder freigabe, vertragVersion, offenAb, geoeffnetAm, abgeschlossenAm, teilnehmer[], jeKriterium[6] {kriterium, aus, urteil, variante empfehlung, gegenentwurf, beide oder null, stelle, satz}, wahl, serienname, hinweise[], vorher}` | 16 |
| `rueckmeldung.pins[]` | `{id, ort {ansicht, variante, element, feld, x, y}, text, art, quelle termin oder rueckmeldung, antwort, beantwortetAm, version}` | 16, intern für Antworten |
| `aenderungen[]` | `{id, pinId, rueckmeldung 1 oder 2, zielSchritt 7 bis 13, feld, kriterium, grund spielraum, tatsache, wahl oder ausserhalb, beleg, von, bis, entscheidung, cd, begruendung, zaehltAlsRunde, status}`; nur aus Pins der Art Änderung | 16 |

### 5.4 Abweichungen im Ausgang, begründet

| Nr. | Abweichung | Warum | Abnehmer |
|---|---|---|---|
| D1 | Sechs Kriterien: fünf Attribute über `hmAttributAufloesen` plus `hmVertragFalschListe` (`falschWaere` samt `werte[].nie`), nicht die Leitidee | Die Leitidee hat er nie bestätigt (`07_positionierung.md` 3.1, 3.4); `falschWaere` schon | 16 |
| D2 | `fremdtest` als Liste mit zwei Einträgen und Messfeldern | fairer Vergleich; ohne Stopp und Code misst die Antwort nichts | 16 |
| D3 | `jeKriterium[].variante` | die Wahl muss aus dem Urteil folgen können | 16 (liest es für `freigabe.historie.zusammenfassung`) |
| D4 | `rueckmeldung.runde` nummeriert die Rückmeldung, nicht die verbrauchten Runden | K6 aus 16 | 16 |
| D5 | `aenderungen[].grund`, `beleg`, `begruendung` | Tatsachen und Wahl zählen nie, prüfbar | 16 |
| D6 | Versionsfelder `gate2Version`, `vertragVersion`, `pins[].version` | keine Rückmeldung auf einen geänderten Stand | 16 |
| D7 | `verschiebung[]`, `druckproben`, `generalprobe`, `messung` | Grund für das Team, Prüfsumme der Karte, Abnahme, Ersatz der Setzungen | 16 (`freigabe.historie`), 17 `lernen` nicht blockierend |
| D8 | `strom {quellen[], eigenePlaetze, takt, loeschenAm}` | wiederholbar, Löschung prüfbar | nur 15, gelöscht mit Abschluss |

### 5.5 Anforderungen an Nachbarschritte

| Schritt | Anforderung | Grund |
|---|---|---|
| 9 | `idee.gezeigt.achse.beruehrt[]` (Attribute, die die Achse berührt); falls die Nomen-Regel unter 60 Prozent trifft, Pflichtfeld `kriterium` je `idee.begruendung` | 3.8, 3.9 |
| 7 | a5 ohne das Satzmuster "X statt Y" benennen, am Verhalten formuliert und mit P7 aus Schritt 8 geprüft; 15 zeigt den Namen unverändert über `hmAttributAufloesen` auf Vertragsseite, Bühne und Rückmeldung | 3.9, Kettenprüfung |
| 10, 13 | jedes gerenderte Element trägt `data-feld` | Pins |
| 11 | Kann-Motiv "Anwendungsort" (Tischfläche im Büro, Straße ohne Hausnummern) | Montagen aus eigenem Material |
| 13 | Signatur im Markus-Beispiel auf "Zeitwert" umstellen (Folgen und Highlight "Noch nicht"); `feed.gegenentwurf.kacheln[].crop` gleich dem der Empfehlung, außer bei Achse `ausschnitt` (heute tauscht 3.8 den Ausschnitt immer); `feed.profilkopf.name` echter Kontoname oder Lücke | Q5, F12-1 |
| 14 | in 3.12 Ansicht 1 `richtung.zitatMakler` als Quelle streichen; Reihenfolge Fremdtest vor Feed übernehmen oder 15 die Umstellung lassen (erlaubt nach 3.12); in 3.10.4 regeln, dass zurückgestellte Quellen `gate2.status` wieder auf "abgezeichnet" führen | 3.4, 3.2, 3.5 |
| 16 | ruft zum Öffnen von Rückmeldung 2 `hmRueckmeldungOeffnen` auf; liest `jeKriterium[].variante` für die Zusammenfassung; K6 ist mit dieser Fassung erledigt | 3.9 |
| Zerlegung | Schritt 15 Vorgänger plus 12, Schritt 12 Nachfolger plus 15; Kriterien in 7 und 15 wie D1 | 5.2 |

**Symmetrie.** Vorgänger von 15: 1, 4, 7, 9, 10, 12, 13, 14. Nachfolger: 16. Änderungen aus der Rückmeldung laufen als Version über 16 zurück in die Zielschritte, keine verdeckte Kante.

---

## 6. Qualitätsprüfung im Schritt

### 6.1 Regeln (`hmRevealPruefen`, `hmRueckmeldungPruefen`)

| Nr. | Prüfung | Grün, wenn | Sperrt |
|---|---|---|---|
| Q1 | Freigabe-Sperre | `gate2.status` "abgezeichnet"; `gate2.version` gleich `gate2Version`; `idee.gezeigt.abgenommen`; `feed.pruefung` ohne Fehler; bei "offen", "gesperrt" oder "veraltet" Verschiebung mit `grund` nach 3.5 | Termin, Start |
| Q2 | Dramaturgie | Akte 0 bis 9 in Reihenfolge; Akt 1 erste inhaltliche Ansicht; letzte Ansicht vor Akt 8 ist `zeichen`; keine Ansicht `wortmarke`, `zeichen`, `farbe`, `typo` vor Akt 7; Akt 5 beginnt mit `strom`; Akt 6 hat mindestens dieselben Ansichtsarten wie Akt 5; **ab Akt 7 hat jede Ansicht `variante` "beide" oder "neutral"**, bei Achse `tonwert` "beide" | Start |
| Q3 | Eigene Worte | drei Sätze in Akt 1, nur aus `workshop.zitate`, Sprecher Makler, `oeffentlich: ja`, ohne Personenbezug, wörtlich nach Normalisierung; je Satz finites Verb, mindestens sechs Wörter, nicht mit "Dass", "Weil", "Wenn" beginnend ohne Hauptsatz, keine reine Ortsangabe, Zahl nicht Hauptinhalt | Start |
| Q4 | Begründung | jede Ansicht der Pflichtarten aus 3.8 in Akt 4 bis 7 mit genau einem Satz, höchstens 20 Wörtern, `kriterium` aus den fünf Attributen der bestätigten Version, `quelle` löst auf; die Arten `arbeit`, `belege`, `strom`, `achse`, `vergleich`, `expose` sind ausgenommen; jedes Attribut mindestens einmal; kein Satz beginnt mit "Aus Ihrem Vertrag"; keine zwei aufeinanderfolgenden Sätze mit gleichem ersten Wort | Start |
| Q5 | Gleicher Inhalt | `feed` und `feed.gegenentwurf` mit denselben Texten, Captions, Folge, Original-Blob-IDs (Prüfsumme wie 13 P13); Tokens unterscheiden sich nur in Feldern der Achse (`10_system.md` 10.9); Crops gleich, außer bei Achse `ausschnitt` | Start |
| Q6 | Gleicher Kontext | beide Läufe mit denselben fremden Beiträgen in derselben Reihenfolge; eigene Plätze 3 und 7, dann 4 und 8; Akt 6 mindestens 60 Prozent der Minuten von Akt 5 | Start |
| Q7 | Echtes Material | keine Datei aus `hmWebObjekte` oder `hmWeltObjekte`; kein gebildeter Kontoname; Objektflächen ohne eigenes Objekt sind Lückenflächen; kein generiertes Bild mit Person, Objekt oder Ort; Montagen gekennzeichnet | Start |
| Q8 | Sprache | Sperrliste (3.10) und `entwurf[].nieFragen` in keinem Sprechzettel und auf keiner Fläche; keine Gedankenstriche, Ausrufezeichen, Emojis; keine Zeile oberhalb einer Überschrift (Eyebrow-Detektor aus 14); keine Wörter der Klischee-Liste; Stufe C nie über Stufe A oder B | Start |
| Q9 | Einwilligung und Rechte | Aufzeichnung nur mit Einwilligung und Zustimmung aller; Objektfotos nur mit Einwilligung; Strom nur aus lizenziertem Pool oder mit `einstellungen.stromScreenshots` samt Owner, Datum, Grundlage; kein Makler im Strom; `strom.loeschenAm` gesetzt | Aufzeichnung, Start |
| Q10 | Entscheider | jeder mit "entscheidet ja" hat zugesagt | Termin |
| Q11 | Arbeit sichtbar | Akt 4 zeigt verworfene Einsichten, Richtungen und mindestens zwei Varianten mit Grund; Zahlen "geprüft" und "Ihre Angabe" aus `beweise.pruefstatus` gezählt | Start |
| Q12 | Rückmeldung | nicht vor `offenAb` (Rückmeldung 1); sechs Kriterien aus der bestätigten Version, gelesen über `hmAttributAufloesen` und `hmVertragFalschListe`, das Kernidee-Attribut darunter; kein Attributname fest im Text; zweite Zeile genau bei `achseBeruehrt` (eins bis drei); zwei Optionen für Wahl und Serienname plus "Keiner passt."; nichts vorausgewählt; jeder Pin mit Art; kein Freitext zur Begründung der Wahl; Kopf zeigt `hmRundenGenutzt` | Link |
| Q13 | Runden | `zaehltAlsRunde` wahr genau bei `grund` "ausserhalb" und `entscheidung` "umsetzen"; "Tatsache" nur mit `beleg`; Fragen haben eine Antwort, bevor die Auswertung schließt; keine Pin-Art vom Team geändert | Übergabe an 16 |
| Q14 | Zuordnung | jede Änderung mit `zielSchritt` 7 bis 13 und `feld`, das auflöst; Spielraum-Werte im Bereich aus `system.spielraum` | Übergabe an 16 |
| Q15 | Fremdtest | zwei Einträge mit Stopp-Feldern, wörtlichen Antworten, `codesGenannt`; `erkannt` gleich `regelUrteil` oder `abweichungGrund` gesetzt | Übergabe an 16 |
| Q16 | Zeit | Summe höchstens `auftrag.dauer`; in der Generalprobe weicht keine Ansicht um mehr als 30 Prozent von ihren Minuten ab (Setzung) | Start |

### 6.2 Menschliche Prüfung

- **Generalprobe mit dem CD** am Vortag, offline, auf dem Gerät des Termins: die sechs Leitfragen, jede Ansicht laut, Stoppuhr je Ansicht, Sperrliste, Bühnensatz gegen seine Schrift (3.7).
- **Lautlese-Test** der Sprechzettel und Sätze (MARKENQUALITAET Kapitel 2).
- **Fremdtest-Bestätigung** durch den Lead nach dem Termin.
- **Entscheidung jeder Änderung außerhalb des Spielraums** durch den CD mit einem Satz am Vertrag.

---

## 7. Typische Fehler und wie sie verhindert werden

| Nr. | Fehler | Folge | Verhinderung |
|---|---|---|---|
| F1 | "Und, wie gefällt es Ihnen?" | Geschmacksdiskussion | Sperrliste, Generalprobe, Antwortsätze (3.10), Q8 |
| F2 | Entscheidung am Tisch | Wahl ohne Abstand | Akt 0, Antwortsatz, Wahl nur im Link |
| F3 | Zeichen oder Wortmarke vorher allein, etwa als Linkvorschau | Urteil am Logo | Einladung ohne Bild, Q2 |
| F4 | Gegenentwurf als Strohmann oder im Vorbeigehen | Scheinwahl | Tor in 9, Q5, Q6, "Warum auch das trägt" |
| F5 | Fassungen unterscheiden sich im Inhalt oder im Crop | Inhalt statt Form verglichen | Q5 |
| F6 | Bühne oder Ende verzerren die Achse | eine Fassung gewinnt über die Dramaturgie | unbunter Bühnengrund, eigener Grund je Fassung, geteilte Flächen ab Akt 7, neutraler Schluss, Q2 |
| F7 | Fremdtest misst nichts: Er erkennt sein Gesicht, oder er kennt die Plätze | Scheinbefund, falsche Sperre in 16 | Stopp ohne Ankündigung, andere Plätze im zweiten Lauf, Code-Pflicht, Fremdtest vor dem Profil (3.2, 3.6) |
| F8 | Checklisten-Ton "Aus Ihrem Vertrag, ..." | Bühne wirkt wie ein Formular | gesprochene Sätze, Kriterium als Unterzeile, Q4 |
| F9 | Stille Änderung zwischen Gate 2, Termin und Rückmeldung, auch eine veraltete Druckprobe | Urteil über etwas anderes | Q1, Prüfsumme der Karte, Versionsfelder |
| F10 | Mitentscheider fehlt oder urteilt getrennt | Wahl wird wieder geöffnet | Q10, gemeinsame Rückmeldung |
| F11 | Technik bricht ab | Höhepunkt kippt | Vorladen, offline, PDF-Fassung, Generalprobe |
| F12 | Überlänge in Akt 5 | Ende gehetzt | Minuten je Ansicht, Restzeit, Q16 schon in der Generalprobe |
| F13 | Aufzeichnung ohne Zustimmung aller | Datenschutzverstoß | T1, Q9 |
| F14 | Beiträge anderer Makler oder ungeklärte Bildschirmfotos im Strom | Rechte- und Datenschutzrisiko | lizenzierter Pool, Owner-Freigabe, Q9, Löschung |
| F15 | Hausnummer oder Kundendetail auf einer Fläche | Bruch des Vertrags (bei Markus a4) | Q7, `bild.vermeiden` |
| F16 | Stock-Mockups oder KI-Montagen | Stock-Look | eigene Anwendungsfotos, Kennzeichnung |
| F17 | Fragen, Spielraum oder Tatsachen als Runde gezählt, oder Änderungen zu Fragen gemacht | unfaire Runden | nur er ordnet ein, `grund`, Q13 |
| F18 | Akt 1 mit Ortsangabe oder Fragment | erster Moment ohne Haltung | Q3 |
| F19 | Neues schlechter bewertet, weil er am Alten hängt | Rückzug auf das Alte | Vertrag vor Entwurf, "was blieb" bei der Wortmarke, 24 Stunden, Nachlese |
| F20 | Veralteter Achsengrund wird ihm vorgelegt | er misst an einem Satz, der auf etwas anderes antwortete | nur Zitate aus `workshop.zitate` oder `vorlieben.widersprueche` in 6a (3.12) |

---

## 8. Umsetzung in der Werkbank

### 8.1 Dateien

| Datei | Änderung |
|---|---|
| `ui_kits/werkbank/wb-reveal.jsx` (neu) | `hmRevealEingang(mid)` (liest über `markenbuch.basis`), `hmPraesentationSchreiben(mid, teil)` (verweigert `entwurf`), `hmRevealAblauf(mid)` (Abbildung aus 3.2), `hmRevealBegruendung(eintrag, vertrag)`, `hmRevealZitate(mid)` (Q3), `hmRevealDiff(m2)` (Q5), `hmRevealStrom(mid)` (Pool, Plätze, Löschung), `hmFremdtestUrteil(eintrag, codes)`, `hmRevealSperre(mid)` (Q1 mit Verschiebung), `hmRevealPruefen` (Q1 bis Q11, Q16), `hmRevealLive`; Komponenten `RevealBuehne`, `RevealBuehnensatz`, `RevealPresenter`, `RevealStrom`, `RevealProfil`, `RevealVergleich`, `RevealHandy`; `hmSelbsttestReveal` |
| `ui_kits/werkbank/wb-rueckmeldung.jsx` (neu) | `hmRueckmeldungFormular(mid)`, `hmRueckmeldungOffen(mid)`, `hmRueckmeldungOeffnen(mid, opts)` (für 16), `hmRundenGenutzt(mid)`, `hmPinSetzen`, `hmPinZuAenderung` (Tabelle 3.9, `grund`), `hmRueckmeldungPruefen` (Q12 bis Q15); Komponenten `RueckmeldungSeite`, `RueckmeldungAuswertung`; `hmSelbsttestRueckmeldung` |
| `ui_kits/werkbank/wb-strom-pool.jsx` (neu) | `HM_STROM_POOL` als Liste von Metadaten `{id, kategorie, lizenz, blobRef}`; die Bilder liegen nicht im Repo |
| `ui_kits/werkbank/wb-app.jsx` | Ansichten `?ansicht=reveal`, `reveal-presenter`, `reveal-handy`, `rueckmeldung` nach dem Muster `link` (Zeile 65) |
| `ui_kits/werkbank/wb-markenwelten.jsx`, `wb-ui.jsx` | strenger Modus ohne Demo-Objekte, echter Kontoname, `data-feld` an jedem Element, kein Zusatz "Vorschau" im Reveal |
| `ui_kits/werkbank/wb-flow.jsx` | `StrategieReveal` und `KapitelReveal` entfallen im Makler-Fluss |
| `ui_kits/werkbank/wb-store.jsx` | `hmSchritteFuer`: "Reveal" (Owner Daniel) und "Rückmeldung am Folgetag" (Makler) statt "Strategie ansehen und bestätigen" (Zeile 49) |
| `ui_kits/werkbank/wb-betrieb.jsx` | Selbsttest-Gruppen "Reveal", "Rückmeldung" |
| `ui_kits/werkbank/index.html` | Script-Tags nach `wb-markenbuch.jsx` |
| `api/wb-marke.js` | Phasen `reveal` und `aenderung` (8.3) |
| `docs/werkbank/MARKE_SCHEMA.md` | `praesentation` (gemeinsam mit 14), `rueckmeldung`, `aenderungen` |

Architektur nach `ui_kits/werkbank/CLAUDE.md`: Babel ohne Build, globaler Scope, Präfix `hm`, Export über `Object.assign(window, ...)`, kein `import()`, Symbole über `<Ico n="..."/>`. Keine Konten des Maklers bei fremden Werkzeugen.

### 8.2 Datenfelder

Speicherort `hmStore` unter `marke2[mid]`; Blobs in IndexedDB `unio_hm_blobs`, im Datenvertrag nur IDs. Nichts davon im öffentlichen Repo.

```js
marke2[mid].praesentation = {
  // Besitz Schritt 14, von 15 nur gelesen:
  entwurf: [{ id: "worte", titel: "", quellen: [""], dauerMin: 3, fuehrt: "stratege" | "cd", notiz: "", kriterium: "", nieFragen: [""] }],
  // ab hier Besitz Schritt 15:
  version: 1, gate2Version: 3,
  status: "geplant" | "generalprobe" | "bereit" | "laeuft" | "gehalten" | "verschoben",
  verschiebung: [{ am: "", grund: "", quelle: "gate2.sperren" | "hmMbVeraltet" | "entscheider", neuerTermin: "" }],
  datum: { start: "2026-11-05T10:00", ende: "2026-11-05T11:00" }, ort: "", form: "vor Ort" | "video",
  teilnehmer: [{ rolle: "makler" | "mitentscheider" | "lead" | "assistenz" | "cd", ref: "", entscheidet: true }],   // Namen Dritter nie an Claude
  einladung: { gesendetAm: "", text: "" },
  ablauf: [{
    id: "a5-strom", entwurfId: "fremdtest", akt: 5,
    ansicht: "strom",   // rahmen | satz | einsicht | vertrag | arbeit | belege | idee | strom | profil | beitrag | website | karte | schild | signatur | expose | achse | vergleich | typo | farbe | wortmarke | zeichen | fragen | abschluss
    variante: "empfehlung" | "gegenentwurf" | "beide" | "neutral",
    inhaltRef: ["feed.kacheln[7]", "feed.kacheln[0]"],
    begruendung: { satz: "", kriterium: "a1", quelle: "praesentation.entwurf[5].kriterium" } | null,
    minuten: 2.5, sprechzettel: [""]
  }],
  achseBeruehrt: [{ attribut: "a2", quelle: "stratege" | "idee.gezeigt.achse.beruehrt" }],
  druckproben: { bestelltAm: "", pruefsumme: "", versandAm: "", status: "bestellt" | "geliefert" | "veraltet" },
  aufzeichnung: { erlaubt: false, zustimmung: [{ rolle: "makler", ja: true }], aktiv: false, blobId: null, loeschenAm: null },
  strom: { quellen: [{ platz: 1, art: "pool" | "screenshot", poolId: "", blobId: "", kategorie: "stadt" }], eigenePlaetze: { empfehlung: [3, 7], gegenentwurf: [4, 8] }, takt: 2.5, loeschenAm: "" },   // nie Makler, nie im Repo, nie an Claude
  fremdtest: [{
    variante: "empfehlung", eigenePlaetze: [3, 7], stoppPlatz: 3, stoppMs: 1800,
    antwortWoran: "", codesGenannt: ["zeitmass"],   // Werte aus idee.codes, dazu "nurGesicht" | "anderes"
    antwortWoertlich: "", regelUrteil: "ja" | "teilweise" | "nein", erkannt: "ja" | "teilweise" | "nein",
    bestaetigtVon: "", abweichungGrund: ""
  }],   // genau 2
  generalprobe: { cd: "", datum: "", checkliste: [{ frage: "", ok: false }], minutenJeAnsicht: {} },
  messung: { minutenJeAnsicht: {}, fragenJeAnsicht: {} }
};

marke2[mid].rueckmeldung = {
  runde: 1, von: "reveal" | "freigabe", vertragVersion: 1,
  offenAb: "2026-11-06T11:00", geoeffnetAm: "", abgeschlossenAm: "", teilnehmer: ["makler"],
  jeKriterium: [{ kriterium: "a1", aus: "markenvertrag.attribute[0]", urteil: "trifft" | "teilweise" | "nicht",
                  variante: "empfehlung" | "gegenentwurf" | "beide" | null, stelle: "pin-id" | null, satz: "" }],   // genau 6, das letzte ist falschWaere
  wahl: "empfehlung" | "gegenentwurf",
  serienname: "",
  hinweise: ["wahlGegenUrteil"],
  pins: [{ id: "", ort: { ansicht: "a5-beitrag-2", variante: "empfehlung", element: "zeitmass", feld: "system.farbe.akzent", x: 0.12, y: 0.88 },
           text: "", art: "beobachtung" | "frage" | "aenderung", quelle: "termin" | "rueckmeldung", antwort: "", beantwortetAm: "", version: 3 }],
  messung: { dauerSek: 0, anteilFragen: 0, pinsJeArt: {} },
  vorher: null   // Rückmeldung 1, unverändert, sobald Rückmeldung 2 öffnet
};

marke2[mid].aenderungen = [{
  id: "", pinId: "", rueckmeldung: 1, zielSchritt: 10, feld: "system.farbe.akzent", kriterium: "a2",
  grund: "spielraum" | "tatsache" | "wahl" | "ausserhalb", beleg: "",
  von: 0.15, bis: 0.11,
  entscheidung: "umsetzen" | "ablehnen" | "an CD", cd: "", begruendung: "",
  zaehltAlsRunde: false,   // wahr genau bei grund "ausserhalb" und entscheidung "umsetzen"
  status: "offen" | "umgesetzt" | "abgelehnt"
}];
```

### 8.3 Claude-Kette

Zwei Phasen in `api/wb-marke.js`, Structured Outputs wie im Bestand (`output_config.format` als json_schema), System und Dossier gecacht; keine Namen Dritter, keine Bilder, kein Strom.

**Phase `reveal` (Prompt, Entwurf).**
> Schritt 15: Sätze für den Reveal. Grundlage sind die bestätigte Vertragsversion, die Kriterien aus dem Entwurf von Schritt 14, die Begründungen aus Schritt 9 und die Liste der Ansichten. Schreibe je Ansicht mit Begründungspflicht einen Satz, wie ihn ein Gestalter im Gespräch sagt, höchstens 20 Wörter, in der Anrede des Maklers. Erkläre eine Entscheidung, nicht das Sichtbare. Beginne nie mit "Aus Ihrem Vertrag" und nie zwei Sätze hintereinander mit demselben Wort. Ordne jedem Satz genau ein Attribut zu. Nutze nur Zahlen, Orte und Wörter aus dem Dossier. Schlage drei Sätze des Maklers für den Einstieg vor, nur aus den übergebenen Kandidaten, mit Grund. Schlage vor, welche Attribute die Achse berührt. Fehlt Stoff, schreibe "Kriterium vom Team". Keine Frage nach Gefallen, keine Gedankenstriche, keine Ausrufezeichen.

Schema: `O({ ansichten: A(O({ id: S, satz: S, kriterium: E(ATTRIBUTE_NAMEN), quelle: S })), zitate: A(O({ zitatId: S, grund: S })), achseBeruehrt: A(E(ATTRIBUTE_NAMEN)), luecken: A(O({ id: S, was: S })) })`; `ATTRIBUTE_NAMEN` je Makler aus der Vertragsversion.

**Phase `aenderung` (Prompt, Entwurf).**
> Schritt 15: Änderungswünsche zuordnen. Für jeden Pin der Art Änderung ohne Datenfeld schlage Zielschritt und Feld vor. Prüfe, ob der Wunsch im Spielraum liegt oder eine Tatsache korrigiert, und nenne dann die Quelle. Ordne ihn einem Attribut zu, wenn er eines berührt. Entscheide nichts, ändere nie die Art eines Pins.

Schema: `O({ vorschlaege: A(O({ pinId: S, zielSchritt: E(["7","8","9","10","11","12","13"]), feld: S, grund: E(["spielraum","tatsache","wahl","ausserhalb"]), beleg: S, wert: S, kriterium: S, warum: S })) })`.

### 8.4 Regelpfad ohne Claude

Ohne `ANTHROPIC_API_KEY` (STATUS offen beim Owner) dieselbe Struktur: Ablauf aus `entwurf` nach 3.2; Sätze: `idee.begruendung[].weil` wörtlich, wenn höchstens 20 Wörter und nicht mit "Aus Ihrem Vertrag" beginnend, Kriterium aus `entwurf[].kriterium` oder Nomen-Regel, sonst Lücke; kein Mustersatz. Zitate nach Q3 und Rangfolge 3.11. `achseBeruehrt` bleibt leer, bis der Stratege setzt (sperrt Q12). Rückmeldung, Pins, Spielraum, Tatsachen, Runden und Fremdtest sind mit und ohne Claude gleich. Mehrarbeit ohne Claude etwa 30 Minuten je Makler (Setzung).

### 8.5 Selbsttest

| Test | Erwartung |
|---|---|
| Sperre | `gate2.status` "veraltet" oder "gesperrt" zur Frist setzt `status` "verschoben" mit `grund`; Start gesperrt |
| Besitz | `hmPraesentationSchreiben(mid, { entwurf: [] })` wird verweigert; 14 kann `entwurf` schreiben, ohne `ablauf` zu verlieren |
| Dramaturgie | `zeichen` in Akt 5 fällt; Akt 5 ohne `strom` am Anfang fällt; eine Ansicht in Akt 8 mit `variante` "empfehlung" fällt |
| Eigene Worte | "Dass sie sich nie gedrängt gefühlt haben." fällt; "Sievering, zwischen Sieveringer Straße und Agnesgasse" fällt; ein Zitat mit `oeffentlich: offen` fällt |
| Begründung | ein Satz "Aus Ihrem Vertrag, [Attributname]: ..." fällt; zwei Sätze mit gleichem ersten Wort hintereinander fallen; eine `arbeit`-Ansicht ohne Kriterium besteht; fehlt ein Attribut (etwa a4) in allen Pflichtansichten, fällt der Ablauf; ein Rückmeldungstext mit festem Attributnamen statt Auflösung über `hmAttributAufloesen` fällt; fehlt das Kernidee-Attribut in Teil 1, fällt der Link |
| Gleicher Inhalt | andere Caption oder Blob-ID fällt; bei Achse `tonwert` fällt ein abweichender Crop, bei `ausschnitt` besteht er |
| Fremdtest | Stopp bei Platz 3 mit Code "zeitmass" ergibt "ja"; Stopp bei 3 mit "nurGesicht" ergibt "teilweise"; kein Stopp ergibt "nein" und setzt die Sperre für 16; zweiter Lauf auf Platz 3 und 7 fällt |
| Strom | ein Eintrag mit Art "screenshot" ohne `einstellungen.stromScreenshots` fällt; `loeschenAm` fehlt: Start gesperrt; nach Abschluss sind die Blobs entfernt |
| Rückmeldung | vor `offenAb` gesperrt; zweite Zeile nur bei `achseBeruehrt`; vorausgewählte Wahl fällt; Kopf zeigt 0 ohne Eintrag in `freigabe.runden` |
| Runden | Frage, Spielraum-Änderung, Tatsache mit Beleg und "Keiner passt." lassen `zaehltAlsRunde` falsch; Tatsache ohne Beleg fällt; umgesetzte Änderung "ausserhalb" zählt |
| Rückmeldung 2 | `hmRueckmeldungOeffnen(mid, { runde: 2, von: "freigabe" })` legt Rückmeldung 1 in `vorher`, zeigt nur Kriterien mit "teilweise" oder "nicht" und geänderte Stellen, keine Wahl, Teil 3 nur nach "Keiner passt." |
| Sprache | "Gefällt es Ihnen?", U+2013, U+2014 und Ausrufezeichen fallen |
| Regelpfad | ohne Claude entstehen Lücken statt Sätze; kein Satz aus MARKENQUALITAET Kapitel 5, der nicht im Eingang steht |

### 8.6 Aufwand

| Teil | Schätzung |
|---|---|
| `wb-reveal.jsx` Daten, Regeln, Prüfungen, Sperre mit Verschiebung | 1,5 Tage |
| Bühne mit Bühnensatz, zehn Akten, geteilten Flächen, Vollbild, Vorladen, PDF-Fassung | 3 Tage |
| Presenter-Ansicht, Strom mit Stopp-Messung, Profil mit Wochenregler, Vergleich | 1,5 Tage |
| Telefon-Ansicht `reveal-handy` | 0,5 Tage |
| `wb-rueckmeldung.jsx` mit Urteil je Fassung, Pins, Auswertung, Rückmeldung 2 | 2,5 Tage |
| Renderer: strenger Modus, Kontoname, `data-feld` | 1 Tag |
| API-Phasen, Selbsttest | 1 Tag |
| **Summe Entwicklung** | **etwa 11 Tage** |
| Team je Makler | Vorbereitung etwa 2 Stunden 10 Minuten (Druckproben 15, Einladung 5, Ablauf und Strom 45, Generalprobe 30 mal zwei Personen plus CD, Technik 20); Termin 60 Minuten mal zwei Personen, mal drei, wenn der CD nicht Lead ist; Antworten 15 bis 30; Auswertung 45 bis 90 Minuten (Setzung, messen) |
| Einmalig | Lizenz und Auswahl des Strom-Pools (Lücke, Owner), Druckerei klären (Lücke, Owner) |
| Sachkosten je Makler | Druckproben in zwei Fassungen, bei Video Porto: Lücke |

---

## 9. Offene Punkte und Lücken

1. **Rechte:** Lizenz des Strom-Pools; Rechtsgrundlage für optionale Bildschirmfotos anderer Kategorien und für die Aufzeichnung mit mehreren Anwesenden. Keine Rechtsberatung in diesem Dokument; ohne Klärung gilt nur der lizenzierte Pool.
2. **Du oder Sie** gegenüber dem Makler (Zerlegung 7.1). Das Beispiel nutzt Sie.
3. **Zwei Wahlen** in der Rückmeldung (Fassung und Serienname). Der Name steht als markierte Empfehlung, die schon gilt, wenn er nichts tut; Owner-Entscheidung, ob stattdessen der CD festlegt.
4. **Vor Ort oder Video** als Regel (R8 6.3).
5. **Setzungen zum Messen:** 60 Minuten, Minuten je Ansicht, 24 Stunden bis zur Rückmeldung (R8 2.4 ohne direkten Beleg), 15 Minuten Rückmeldung, Takt und Plätze im Strom, 60 Prozent für den Gegenentwurf, Bühnensatz (Größen, Grund), eins bis drei achsenberührte Attribute, Trefferquote der Nomen-Regel 60 Prozent, 90 Sekunden Durchklick-Schwelle, 30 Prozent Toleranz je Ansicht, Fristen.
6. **Wien-Daten** zur Prüfung von Maklern durch Eigentümer (R7 2.9, nur US-Daten).
7. **Markus:** drei Sätze für Akt 1, Achsenzitat für 6a, Bio und Highlights, Schriftfamilie, Logo-Datei, Schildmaß, Mitentscheider, Ort, Einwilligungen.
8. **Drei statt zwei Fassungen** bleibt nach der Zerlegung (Kapitel 6) zu testen.
9. **Nebenbefunde im Code, nichts geändert:** Demo-Objekte (`wb-markenbuch.jsx` Zeile 121, `wb-markenwelten.jsx` Zeile 285 bis 298, `wb-web.jsx` Zeile 201 und 438), gebildeter Kontoname (`wb-markenwelten.jsx` Zeile 1106, `wb-ui.jsx` Zeile 99), Eyebrows in `KapitelReveal` und `BrandProfil` (`wb-flow.jsx` Zeile 130 und 226).

---

## 10. Quellen

Intern: `00_ZERLEGUNG.md`; `bestand/KETTE_IST.md`, `bestand/FRAGEN_WIRKUNG_IST.md`; `research/R1` bis `R8`; `schritte/01` bis `14`, `16`; `docs/werkbank/MARKENQUALITAET.md` Kapitel 5; Code `ui_kits/werkbank/wb-flow.jsx`, `wb-markenbuch.jsx`, `wb-markenwelten.jsx`, `wb-ui.jsx`, `wb-content.jsx`, `wb-produktion.jsx`, `wb-store.jsx`, `wb-app.jsx`, `wb-web.jsx`, `tokens/fonts.css`, `ui_kits/werkbank/CLAUDE.md`.

Studios und Praxis
- Paul Rand, NeXT: https://www.logodesignlove.com/next-logo-paul-rand
- Mozilla Open Design, Roads not taken: https://blog.mozilla.org/opendesign/roads-not-taken/
- Pentagram, About: https://www.pentagram.com/about
- Further (vormals DesignStudio), Airbnb: https://www.further.group/work/airbnb
- The Vignelli Canon, 2010: https://www.rit.edu/vignellicenter/sites/rit.edu.vignellicenter/files/documents/The%20Vignelli%20Canon.pdf
- Anastasia Sycheva, Smashing Magazine 2026: https://www.smashingmagazine.com/2026/07/how-turn-brand-strategy-into-visual-direction/
- Mike Monteiro, Sekundärquelle: https://thepiratetester.wordpress.com/2021/04/12/2021-04-12-my-breakdown-of-mike-monteiro-13-ways-designers-screw-up-client-presentations-and-how-it-applies-to-testers/
- Tom Greever, Sekundärquelle: https://medium.com/@productandrew/articulating-design-decisions-tom-greever-2015-fdae61adade7
- Figma, Design Critiques: https://www.figma.com/blog/design-critiques-at-figma/
- Liz Lerman, Critical Response Process: https://lizlerman.com/critical-response-process/
- Gap 2010: https://www.npr.org/2010/10/08/130419187/the-gap-gets-backlash-for-logo-makeover
- Munk, Sørensen, Laursen 2020: https://www.designsociety.org/download-publication/43213/visual_boards_mood_board_style_board_or_concept_board

Werkzeuge
- Markup.io: https://www.markup.io/
- Loom für Designer: https://www.loom.com/use-case/design

Studien und Daten
- Walsh, Winterich, Mittal 2010: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1998809
- Mere-Exposure-Effekt, Überblick (Sekundärquelle): https://en.wikipedia.org/wiki/Mere-exposure_effect
- Kahneman u. a. 1993, Peak-End: https://journals.sagepub.com/doi/10.1111/j.1467-9280.1993.tb00589.x
- Hsee 1996: https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf
- Chernev, Böckenholt, Goodman 2015: https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf
- Simonson und Tversky 1992: https://doi.org/10.2307/3172740
- Fuchs, Prandelli, Schreier 2010: https://doi.org/10.1509/jmkg.74.1.65
- Franke, Schreier, Kaiser 2010: https://pubsonline.informs.org/doi/10.1287/mnsc.1090.1077
- Wilson und Schooler 1991: https://doi.org/10.1037//0022-3514.60.2.181
- Wilson, Lisle, Schooler, Hodges 1993: https://doi.org/10.1177/0146167293193010
- Reber, Schwarz, Winkielman 2004: https://dornsife.usc.edu/norbert-schwarz/wp-content/uploads/sites/231/2023/11/04_pspr_reber_et_al_beauty.pdf
- Willis und Todorov 2006: https://doi.org/10.1111/j.1467-9280.2006.01750.x
- Piepenbrock, Mayr, Mund, Buchner 2013, Polarität: https://doi.org/10.1080/00140139.2013.790485
- Romaniuk, Distinctive Assets: https://marketingscience.info/news-and-insights/brands-need-distinctive-assets
- Jansson und Smith 1991: https://www.sciencedirect.com/science/article/abs/pii/0142694X9190003F
- Galesic und Bosnjak 2009: https://academic.oup.com/poq/article-abstract/73/2/349/1939196

---

## Aenderungen aus der Kettenpruefung

Stand 30.09.2026. Nur was die Befunde verlangen; Verträge der Nachbarn unverändert.

1. **Kriterien nur noch über Schritt 7.** Teil 1 der Rückmeldung (3.9), D1, Q12 und der Selbsttest lesen die fünf Attribute über `hmAttributAufloesen` und das sechste Kriterium über `hmVertragFalschListe` (`falschWaere` samt `werte[].nie`), wie 7 in 8.2 und Zeile 489 verlangt. Kein Attributname steht mehr fest im Text: 3.8 (Kriterium in Stufe C), 3.9 (Urteilszeile über der Wahl), 3.10 (Beispiel-Pin), Rückmeldungstext, Fragen R1 und R1a, F15 und die Datenbeispiele in 8.2 nutzen Platzhalter oder die IDs a1 bis a5.
2. **"Aus Sievering" entfernt, Kernidee-Attribut abgefragt.** Das Beispiel ordnet die 15 Begründungssätze den Attributen a1 bis a5 aus `07_positionierung.md` 3.8 neu zu (a1 fünfmal, a2 dreimal, a3 einmal, a4 dreimal, a5 dreimal). Die beiden Sätze, die "Aus Sievering" trugen, gehen an a1 (Ortsregel) und a2; die Sätze zu Idee, Warten und Zeichen an a5. Teil 1 schreibt fest, dass das Kernidee-Attribut immer abgefragt wird und der Link ohne es nicht sendbar ist; der Selbsttest prüft das.
3. **Name von a5.** Der heutige Name folgt dem Muster "X statt Y", das Schritt 8 sperrt (P7). 15 benennt a5 nicht selbst um, sondern zeigt, was 7 liefert; die Umbenennung steht als Anforderung an 7 in 5.5.
4. **Serienname.** "Nach dem Grundbuch" ist in 12 gestrichen. Kurzfassung, Beispielkopf und Rückmeldung (Teil 3) nennen jetzt die Alternative "Die Zeit daneben" aus `12_social.md`; der Satz darunter ist aus der Spalte "Warum" dort abgeleitet.
5. **Amber-Satz wirkt nur einmal.** Der Pin "Der Amber-Ton darf etwas zurückhaltender sein." mit dem veralteten Wert 0,15 auf 0,11 (#CB914E) ist gestrichen, weil 10 den Seed-Satz schon im Startwert 0,11 verarbeitet hat (Hinweis 10 in `10_system.md`). An seine Stelle tritt ein als Annahme markierter Spielraum-Pin auf `rolle.typo.kernsatz`. Die Arbeitswerte im Beispielkopf nennen den Akzent jetzt nach 10.5.
6. **Nicht geändert.** Die Umsetzung des Seed-Satzes in 16 (höchstens einmal, Startwert 0,11 als verarbeitet) sowie die Erlebnislücken zu Feed-Mindeststand, Unterscheidbarkeit der Fassungen, Porträt-Termin und Einwilligungen betreffen 9, 11, 13, 14, 16 und 1 und sind dort zu lösen.
