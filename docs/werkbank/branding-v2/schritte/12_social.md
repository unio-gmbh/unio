# Schritt 12. Social-Feed-System (`social`)

Stand 30.09.2026, Fassung 3, ergänzt nach der Kettenprüfung (siehe Ende der Datei). Entwurf für Branding v2, Teilschritt 12 von 17. Grundlage: `00_ZERLEGUNG.md` (Vertrag des Schritts), `research/R1` bis `R8`, `bestand/KETTE_IST.md`, `bestand/FRAGEN_WIRKUNG_IST.md`, die Nachbarschritte `01_auftakt.md`, `02_fragebogen.md`, `04_workshop.md`, `07_positionierung.md`, `09_idee.md`, `10_system.md`, `11_bild.md`, `13_feed.md` und der Code in `ui_kits/werkbank/` (`wb-plattform.jsx`, `wb-markenwelten.jsx`, `wb-os-data.jsx`, `wb-data.jsx`, `wb-store.jsx`, `wb-reel.jsx`, `api/wb-marke.js`). Skizzen der Beispielkacheln und der Probe-Folge: `schritte/muster/12_serien.html`.

**Lesart.** *Beleg* heißt: steht in einer Quelle mit URL oder in einer genannten Datei. *Ableitung* heißt: eigene Folgerung. *Setzung* heißt: bewusst gesetzter Startwert ohne direkten Beleg, der nach zwölf Wochen Betrieb durch eigene Zahlen ersetzt wird (Schritt 17, `lernen`). *Lücke* heißt: wir wissen es nicht. *Annahme* heißt im Beispiel: das v2-Feld gibt es für Markus noch nicht, der Wert ist aus Seed oder Musterbeispiel abgeleitet.

**Was sich gegenüber Fassung 2 geändert hat.** Freigabe nur bei `beweise[].oeffentlich` gleich "ja". Takt im Dauerbetrieb für alle Zustände gerechnet, mit Wechselplätzen statt leerer Plätze. Sachspalte abgesichert durch eine stoffunabhängige Dokument-Vorlage. Bildaufbau je Serie in Pixeln mit Einstellungsgröße, Blickachse und Platz; Nachbarregel für Einstellungsgrößen. Gegenton nur auf dem Sachplatz, Periode 6, auf sichtbarem Grund. Namensalternative neu, Konnotation von "Zeitwert" geprüft. Tragfähigkeit über zwölf Monate gerechnet, Obergrenze für Wissensfolgen, Rückfallregel. Anrede nur als Platzhalter `{Sie-Form|du-Form}`. Erzeuger für `saeulen[].zweck`, `frage`, `serien[].reservefolge` und `staffeln[].thema`. Wochenrechnung für das Team statt pauschaler 2,5 Stunden.

---

## 0. Kurzfassung

1. **Die Sendung.** Aus der Idee des Maklers wird genau eine Signatur-Serie mit Eigennamen, festem Sendetag, eigenem Bildaufbau und genau einem wechselnden Merkmal. Sie läuft in Staffeln zu einem Quartal, jede mit einem Thema aus seinen Anlässen, einem Staffelplakat und einem Themenvorrat, der vor dem Reveal mindestens zwölf Folgen mit Stoffquelle hält. Moment im Reveal: Das ist meine Sendung.
2. **Säulen sind Zwecke, Serien sind Formate.** Vier bis fünf Säulen mit Anteilen aus Positionierung, Stoff, Nachschub, Zeit und gemessenem Kamera-Komfort; jede Säule mit genau einer laufenden Serie, dazu höchstens eine Anlass-Serie für eigene Objekte, die die Plätze ihrer Säule übernimmt und nie leere Plätze hinterlässt.
3. **Folge vor Position.** Die Grammatik rechnet nur mit Abständen in der Veröffentlichungsfolge (i plus minus 1, i plus minus 3) und mit jedem Fenster aus drei Beiträgen. Gesicht Periode 3, Gegenton Periode 6 nur auf dem Sachplatz, nie zwei gleiche Einstellungsgrößen nebeneinander. So übersteht sie jedes Verschieben um einen und zwei Plätze per Bau.
4. **Wochentakt.** Dienstag Sendung, Donnerstag Nutzen mit Gesicht, Samstag Sache. Nach jeder vollen Woche steht die Sendung als eigene Spalte, die Sachspalte daneben wechselt hell und dunkel wie eine Messlatte.
5. **Vorlagen mit Sperrstufen.** Jedes Feld hat ein Token und eine Stufe. Drei Satzarten (vollflächig, Bild auf der Linie, Fläche), drei Einstellungsgrößen, feste Blickachse je Serie: Man erkennt die Serie ohne Kennung. Die Variante wählt die Grammatik, nicht ein Mensch.
6. **Prüfungen, die rechnen.** Zwei Codes je Kachel, Sprachprüfung, Objekt-Regel mit Energiekennzahlen, Anrede nur aus der einen Funktion, Mindestgrößen in Pixeln, Verschiebungstest, Anteile gegen den Monatsrhythmus in jedem Zustand. Alles im Selbsttest.
7. **Der Makler tut eine Sache:** Er wählt am Tag nach dem Reveal zwischen zwei Namen seiner Sendung, einer davon empfohlen. Reicht sein Stoff nicht, erledigt er vorher einmal eine Aufgabe von zehn Minuten: drei Fälle nachsprechen.

---

## 1. Ziel und Erfolgskriterium

**Ziel (Vertrag).** Säulen als benannte Serien mit eigenem Bildaufbau, Rhythmus und Vorlagen mit Sperrstufen, dazu eine Folgegrammatik für das 3:4-Raster, so dass jeder Beitrag die Marke trägt und das Team ihn jede Woche herstellen kann.

**Erfolgskriterium.** Der Schritt ist gelungen, wenn alle folgenden Aussagen zutreffen.

| Nr. | Kriterium | Messung | Art |
|---|---|---|---|
| E1 | Die Signatur-Serie trägt zwölf Monate | Themenvorrat mindestens 12 Folgentitel mit Stoffquelle, bevor Schritt 13 beginnt; je Staffel höchstens 50 Prozent reine Wissensfolgen; Jahresrechnung aus Fallbestand, `verkauft12m` mal Freigabequote und Frageprotokoll gegen 52 Folgen (3.5); unabhängig vom Objektfluss, wenn `objektflussMonat` unter 2 liegt; Makler-Minuten innerhalb von `antworten.zeit` | Regel, Setzung für die Schwellen |
| E2 | Jede Serie ist ein eigenes Format | Eigenname nach Namensregel, genau eine Variable mit `warum`, fester Platz der Kennung je Vorlage, eigener Bildaufbau (Einstellungsgröße, Blickachse, Platz) | Regel |
| E3 | Die Anteile sind hergeleitet und werden eingehalten | Jede Säule trägt `herleitung[]`; Probe: andere Positionierung, anderer Komfort, andere Zeit oder anderer Nachschub ändert die Anteile; der Monatsrhythmus trifft jeden Anteil auf höchstens einen Beitrag genau, in jedem Zustand (Objekte ja oder nein, Fall frei oder nicht) | Regel |
| E4 | Die Grammatik hält | Alle Fenster aus drei und alle Nachbarn i plus minus 1 und i plus minus 3 bestehen für Gesicht, Gegenton, Textführung, Format, Einstellungsgröße und Serie, für die Folge und jede Verschiebung um einen und zwei Plätze; Beleg je Woche Pflicht, je Fenster als Meldung | Regel |
| E5 | Kein Vorlagen-Look, keine Eintönigkeit | Jedes sichtbare Element hat ein Token; je Serie genau eine offene Variable; mindestens 60 Prozent der 3:4-Fläche echtes Bild außer bei textgeführten Kacheln (Setzung); drei Beispielkacheln einer Serie sind als Serie erkennbar und nicht gleich, drei Gesicht-Serien ohne Kennung unterscheidbar (Blick des CD an `muster/12_serien.html` und später am echten Kontaktbogen) | Regel und CD |
| E6 | Jede Caption liest die Anrede aus der einen Funktion | Alle Textfelder tragen Platzhalter der Form `{Sie-Form|du-Form}`, die nur `hmAnrede(mid, kanal)` auflöst; null ausgeschriebene Anreden, null gemischte Formen | Regel |
| E7 | Kein Fülltext, kein fremdes Objekt, kein ungeprüfter Beleg | Regelpfad setzt Lücken statt Mustersätze; Objekt-Vorlagen nehmen nur Objekte aus dem Bestand; `belegRef` nur auf `beweise[].oeffentlich` gleich "ja" | Regel |
| E8 | Das Team kann es jede Woche herstellen | Teamzeit je Woche gerechnet (3.15, rund 4 Stunden 25 Minuten inklusive anteiligem Drehtag und Pflege der Marktquelle, Setzungen) und in Schritt 17 gemessen | Setzung, Messung in Schritt 17 |

**Was dieser Schritt nicht tut.** Er baut nicht die zwölf Kacheln des Starts (`feed`, `start30` in Schritt 13) und plant keinen Monat im Betrieb (`monatsplan` in Schritt 17). Er liefert das System, aus dem beide entstehen, und prüft es an einer Probe-Folge und an der Monatsbelegung im Dauerbetrieb.

---

## 2. Geprüfte Alternativen und warum verworfen

| Nr. | Alternative | Was sie verspricht | Warum verworfen | Quelle | Was wir übernehmen |
|---|---|---|---|---|---|
| A1 | **Weiter wie heute:** Säulen-Anteile aus der Figur, festes Neuner-Muster je Markenwelt (`HM_WELT_STIL.feed`), Hooks aus dem Weg | Kein Umbau, sofort lauffähig | Jeder Kenner bekommt dieselbe Mischung und dieselben Hooks (FRAGEN_WIRKUNG_IST Befund 4, KETTE_IST 2.2). Das Muster füllt vier von neun Plätzen mit Demo-Objekten aus fremden Bezirken, einen mit einem Fülltext, und zeigt ein Gesicht in neun Kacheln (KETTE_IST 4). Muster über Positionen brechen, weil jeder neue Beitrag alle anderen um einen Platz schiebt (R6 Prinzip 2) | `bestand/KETTE_IST.md` 2.7 und 4; `research/R6-social-system.md` Kapitel 2 | Die Renderer-Technik: gemessene Umbrüche, Kontrastrechnung, Tabellenziffern (KETTE_IST 8) |
| A2 | **Offene Vorlagenbibliothek** nach Canva-Art: Farben und Schriften gesperrt, der Rest frei | Schnell, wenig Teamzeit | Wer nur Farben und Schriften erzwingt, bekommt den bekannten Vorlagen-Look; wer alles sperrt, einen eintönigen Feed (R4 1.3, Ableitung). Canva AI erzeugt markengerechte Designs nur für feste Formate und liest wiederverwendbare Komponenten nicht | https://www.canva.com/help/brand-template-locks/, https://www.canva.com/help/create-on-brand-designs/, R4 Kapitel 4 Punkte 5 und 7 | Vier Sperrstufen je Vorlagenfeld (R4 Ü1) und die Figma-Regeln für Vorlagen: eine Textebene je Eingabe, gesperrte Seitenverhältnisse, Varianten statt offener Flächen (https://www.figma.com/blog/8-tips-for-designers-building-branded-templates-in-figma-buzz/) |
| A3 | **Mosaik oder feste Positionsraster** ("Spalte eins ist immer das Gesicht") | Ein Profil wie ein Plakat | Mit dem 3:4-Raster seit Jänner 2025 wird jede Kachel mittig beschnitten, Mosaike zerbrechen. Positionsregeln brechen mit jedem neuen Beitrag. Seit Juni 2026 lässt sich das Raster umordnen, aber nur von Hand und für jeden Beitrag neu | https://www.kapwing.com/resources/instagrams-new-grid-layout-size-and-dimensions-2025/, https://www.socialmediatoday.com/news/instagram-releases-profile-grid-rearranging/822304/ | Nur Folgeregeln sind robust; Umordnen als Reparatur, nie als Plan |
| A4 | **Redaktioneller Look nach Cereal oder Kinfolk**: menschenleer, viel Negativraum | Sofort hochwertig | Cereal hat die Regel "keine Menschen im Bild". Für eine Personenmarke ist das Gesicht der stärkste Code: Urteile über Vertrauenswürdigkeit stehen nach 100 Millisekunden. Der Kinfolk-Look wurde so oft kopiert, dass Feeds kaum noch unterscheidbar waren | https://magculture.com/interview-with-rosa-and-rich-cereal/, https://doi.org/10.1111/j.1467-9280.2006.01750.x, https://www.itsnicethat.com/articles/opinion-kinfolk | Bilder wirken als Satz, nicht einzeln (Stapleton); Qualität vor Takt |
| A5 | **Medienhaus-Modell** nach SERHANT: eigenes Filmstudio, lange Formate | Reichweite, Person im Bild | Zehn-Minuten-Filme sind dort Objekten über 10 Mio. Dollar vorbehalten, die Zahlen sind Selbstauskünfte einer Award-Einreichung. Bei zwei bis vier Stunden Makler-Zeit im Monat nicht herstellbar | https://shortyawards.com/14th/serhant, R5 Kapitel 5 | Person im Arbeitskontext; Drehtag gebündelt (Glennda Baker, über 30 Videos an einem Tag: https://www.nar.realtor/magazine/real-estate-news/technology/how-this-agent-is-making-six-figures-on-tiktok) |
| A6 | **Personenmarke als Lifestyle** nach Dubai-Muster | Hohe Reichweite | Die reichweitenstärksten Makler-Accounts dort zeigen vor allem Mode, Familie, Fitness. Für Wiener Eigentümer, die jemandem ihr Haus anvertrauen, sendet Statuskonsum das Gegenteil von Integrität | https://www.bayut.com/mybayut/uae-real-estate-instagram-accounts-follow/, R5 1.3 | Nur die Mischung aus Marktwissen und erkennbarer Person |
| A7 | **Zentral gesteuerte Totalsperre** nach Engel & Völkers | Maximale Konsistenz | Die Person wird der Dachmarke untergeordnet ("immer dieselben Farben"). Albert Hill (The Modern House) rät zu Begeisterung statt perfekter Richtlinientreue | https://www.martechoutlook.com/cxoinsights/lara-maier-nid-3935.html, https://www.aufi.com/insights/modern-house-albert-hill-design | Eine Quelle für alle Abnehmer (Schritt 16); eigenständige Makler-Signatur in einem Rahmen (Compass: https://www.lesliewilkins.com/portfolio/compass) |
| A8 | **Claude erzeugt jede Woche frei**, die Marke steckt nur im Prompt | Kein Vorlagenbau, beliebige Vielfalt | KI hebt das Einzelergebnis und macht die Ergebnisse vieler Nutzer einander ähnlicher; bei 20 UNIO-Maklern droht eine Kohorte, die wie eine Marke klingt. Top-Studios bauen Generatoren mit wenigen benannten Reglern und handgemachtem Kern | https://www.science.org/doi/10.1126/sciadv.adn5290, https://the-brandidentity.com/project/dia-studio-builds-a-generative-tool-that-makes-nuits-sonores-pulse-2, https://www.patrik-huebner.com/applying-generative-design-to-brand-design/ | Claude schlägt Namen, Folgen, Säulentexte und Hooks vor; Regeln rechnen; das Team entscheidet |
| A9 | **Viele Serien**, eine je Idee, dazu Einzelposts | Abwechslung | Wiederholung derselben Formate erzeugt Flüssigkeit und damit Gefallen, zu viel Variation kostet beides; Stabilität ist ein Vorläufer von Authentizität bei Personenmarken. R7 empfiehlt zwei bis drei, R5 drei bis vier benannte Serien | https://dornsife.usc.edu/norbert-schwarz/wp-content/uploads/sites/231/2023/11/04_pspr_reber_et_al_beauty.pdf, https://doi.org/10.1002/mar.20771, R5 Prinzip 2, R7 Kapitel 4 | Eine laufende Serie je Säule, höchstens eine Anlass-Serie; Abwechslung über zweite Vorlagen derselben Serie |

**Gewählt: ein Studio-System mit einer Sendung.** Handgemachter Kern (Zeichen, Bildaufbau, Signatur) wie bei DIA und Pentagram, Serien mit Konstante plus genau einer Variable wie beim Public Theater (https://www.pentagram.com/work/the-public-theater-2020-2021-season), Sperrstufen wie bei Canva und Figma, eine Grammatik über die Folge statt über Positionen, Claude nur für Vorschläge an benannten Stellen.

---

## 3. Die gewählte Lösung

### 3.1 Begriffe

| Begriff | Bedeutung | Beispiel Markus |
|---|---|---|
| Säule | Zweck eines Teils des Feeds mit Anteil in Prozent. Fünf feste Ids aus `HM_SAEULEN` (`wb-data.jsx` Zeile 69): `markt`, `wissen` (Pflicht, Anzeigename "Wie ich arbeite"; `wissen` und "Wie ich arbeite" sind dieselbe Säule), `meinung`, `persoenlich`, `beweise` | `meinung` 30 Prozent |
| Serie | Format mit Eigennamen, das eine Säule bedient: Ablauf, Hook-Formel, Rhythmus, Bildaufbau, Kennung, genau eine Variable; darf mehrere Vorlagen haben (Hauptformat plus zweite Vorlage) | "Vor der Unterschrift" mit Karussell und Einzelbild "Detail" |
| Signatur-Serie | die eine Serie, die die Marke trägt; läuft in Staffeln | "Zeitwert" |
| Folge | ein Beitrag einer Serie, Folgenummer vorwärts ab 01 | "Zeitwert 03" |
| Folgenklasse | woraus eine Folge ihren Stoff hat: `F` eigener Fall aus `beweise` mit Freigabe, `P` Praxisfrage aus dem Frageprotokoll, `G` Gastfolge, `E` eigene Geschichte aus `workshop.zitate` oder `workshop.geschichte`, `W` reine Wissensfolge | "Elf Wochen" ist F |
| Kennung | Serienname plus Folgenummer, beim Karussell plus Seitenzahl, je Serie an festem Platz, nie über einer Headline | Folio-Zeile |
| Variable | das eine Merkmal, das je Folge wechselt | die Dauer der Entscheidung |
| Vorlage | Bauplan einer Serie je Format und Entwurf (Empfehlung, Gegenentwurf), jedes Feld mit Sperrstufe | "Zeitwert, Reel-Titelbild" |
| Takt | zwölf Plätze, vier Wochen; die Länge folgt aus dem Monatsrhythmus der Serien | siehe 3.7 |
| Wechselplatz | Platz im Takt, dessen Serie nach Zustand wechselt (Fall frei, Objekt da); nie leer | Samstag Woche 3 |
| Anlass-Serie | Serie, die nur mit Anlass läuft (eigenes Objekt) und dann Plätze der eigenen Säule übernimmt | "Stichtag" |

### 3.2 Ablauf in zwölf Arbeitsschritten

Der Schritt läuft nach Schritt 11 und vor Schritt 13, ohne Termin mit dem Makler. Eine Vorprüfung läuft schon am Ende des Workshops (12.0).

| Nr. | Arbeit | Wer | Liest | Ergebnis | Teamzeit (Setzung) |
|---|---|---|---|---|---|
| 12.0 | Vorprüfung am Ende des Workshops: Zahl eigener Fälle mit Entscheidung, Zahl und Zeitraum; unter 4 entsteht eine Aufgabe (Kapitel 4, F12-2) | Regel | `antworten.faelle`, `abgeraten`, `workshop.geschichte.belege` | Eintrag in `workshop.aufgaben` | 0 |
| 12.1 | Stoffinventar: Belege mit Freigabe, Anlässe, Termine, Grenzen, Formate, Bilder, Objekte, Nachschub; Marktquelle anlegen (3.4) | Regel; Marktredaktion trägt die Quelle ein | alle Eingänge | internes `stoff` mit Stoffwert und Nachschub je Säule; `marktquelle` | 20 min Marktredaktion |
| 12.2 | Säulen und Anteile | Regel | Positionierung, Stoff, Nachschub, Zeit, Komfort | `saeulen[]` mit `anteil`, `herleitung[]` | 0 |
| 12.3 | Säulentexte `zweck` und `frage` | Claude (Schema `social`), ohne Claude das Team | `positionierung.fuerWen`, `antworten.hindernis`, `ausloeser`, `HM_SAEULEN` | `saeulen[].zweck`, `frage` | 10 min Prüfung |
| 12.4 | Drei Kandidaten für die Signatur, je mit zwei Namen, Variable, Stoffquelle, Risiko, Staffelthemen | Claude, ohne Claude das Team aus `territorien.serienIdee` | Idee, Claim, Positionierung, `serienIdee`, Belege, `cue`, `ausloeser` | `serieSignatur.kandidaten[3]` | 0 |
| 12.5 | Tragfähigkeit rechnen, Kandidat wählen, Reihenfolge der Namen, Lesart-Test der Namen | Regeln rechnen, Team wählt | Kandidaten, `zeit`, `vorab.kennzahlen`, `probedreh`, Frageprotokoll | `serieSignatur`, `staffeln[4]` | 40 min |
| 12.6 | Übrige Serien, je Säule zwei Kandidaten in Rangfolge, je eine Reservefolge; Nachschubprüfung je Kandidat (3.4), der erste bestehende läuft | Claude schlägt vor, Regeln prüfen den Nachschub, Art Director schärft | Säulen, Stoff, Namensregel, `marktquelle`, Frageprotokoll | `serien[]` inklusive `reservefolge` und `nachschub`, `serienErsatz[]` | 50 min |
| 12.7 | Formatmix | Regel | `formate`, `zeit`, `probedreh` | `formatmix` | 0 |
| 12.8 | Grammatik, Monatsbelegung je Zustand, Probe-Folge mit Verschiebungstest | Regel | `system.tokens`, `bild.regeln`, Serien, Formatmix | `grammatik`, `belegung`, Probe-Folge | 10 min Sichtung |
| 12.9 | Vorlagen mit Bildaufbau in Pixeln, Sperrstufen, Stresstest, Codes | Regeln erzeugen, Art Director setzt den Bildaufbau am Kontaktbogen | `system.*`, `bild.regeln`, `bild.portraet`, `bild.kontaktbogen`, `idee.codes` | `vorlagen[]`, `karussellRollen`, `codesPruefung` | 60 min |
| 12.10 | Kanalplan und drei Konzepte | Regeln (Kanalplan), Claude und Team (Konzepte) | `kanaele`, `anrede`, `empfehler`, `ziel`, Serien | `kanalplan`, `konzepte[3]` | 30 min |
| 12.11 | Sprachprüfung, Objekt-Regel, Kohorte, Blick des CD | Regeln, CD | alle Texte und Vorlagen, Kohorte im Store | `sprachpruefung`, `objektRegel`, Protokoll | 20 min CD |

Summe Teamzeit je Makler einmalig: rund 4 Stunden mit Claude, ohne Claude rund 50 Minuten mehr (Setzungen, zu messen).

### 3.3 Säulen und ihre Anteile

Die Anteile folgen aus fünf Dingen und aus keiner Figur. Jeder Rechenschritt steht in `saeulen[].herleitung[]` und ist im Markenbuch lesbar (Schritt 14, Kapitel Serien). Der Rechenweg ist eine Setzung.

1. **Positionierung.** Die Säule der Signatur-Serie bekommt 30, `wissen` 20; ist `wissen` selbst die Signatur-Säule, 35. Welche Säule das ist, folgt aus `positionierung.weil` und der `serienIdee` aus Schritt 6: Haltung gegen den eigenen Vorteil ergibt `meinung`, Ortskenntnis `markt`, Arbeitsweise `wissen`, abgeschlossene Fälle `beweise`.
2. **Flussdeckel.** Eine Säule, deren laufende Serie je Folge einen neuen eigenen Fall braucht (in der Regel `beweise`), bekommt höchstens so viele Plätze, wie der Fallnachschub hergibt: Anteil höchstens Fälle je Monat mal 100 durch 12, abgerundet auf Fünfer, mindestens 5. Fälle je Monat sind freigegebene Fälle im Bestand plus `vorab.kennzahlen.verkauft12m` mal Freigabequote 0,4 (Setzung), geteilt durch 12. Warum: Ein Anteil, den kein Stoff füllt, erzeugt Füllbeiträge (T4).
3. **Stoff.** Der Rest geht auf die übrigen Säulen, jede mindestens 10, der Überhang nach Stoffwert 0 bis 2.
   - `markt`: 2, wenn `vorab.kennzahlen` Werte hat und ein Kern-Grätzl bestätigt ist; 1, wenn nur das Grätzl; 0 sonst.
   - `beweise`: 2 ab drei `beweise[]` mit `oeffentlich` gleich "ja"; 1 bei ein oder zwei; 0 bei keinem. "nein" und "offen" zählen nie (Vertrag Schritt 7, Voreinstellung nein).
   - `persoenlich`: 2, wenn `antworten.grenzen` mindestens zwei persönliche Themen (Herkunft, Wohnort und Grätzl, Hobby, Team) auf "zeigen" stellt; 1 bei einem; 0 bei keinem. "Fehler und Learnings" zählt erst nach drei öffentlichen Belegen (Pratfall-Regel, MARKENQUALITAET 4).
   - `meinung`, wenn nicht Signatur: 2, wenn ein Beleg eine Haltung trägt (etwa `antworten.abgeraten`); 1 sonst.
4. **Deckel für Persönliches.** `persoenlich` höchstens 15 bis zu eigenen Zahlen (Setzung), der Überhang geht an `wissen`, weil Kompetenz vor Persönlichem kommt (MARKENQUALITAET 4).
5. **Kamera-Komfort.** `k` ist der kleinste der drei Werte in `workshop.probedreh.komfort` (Schritt 4, Abschnitt 5). Bei `k` bis 3 verlieren Säulen, deren Serie nur als Talking Head trägt, je 5 an Säulen mit Karussell-Serie. Bei `k` ab 6 und Video "gern" bekommt `persoenlich` 5 aus `markt`, im Rahmen des Deckels. Fehlt `k`, verschiebt nichts, `herleitung` vermerkt die Lücke.
6. **Zeit.** Bei `antworten.zeit` "Bis 2 Stunden" vier Säulen: die mit dem kleinsten Stoffwert fällt weg, nie `wissen`, nie die Signatur-Säule. Sonst fünf.
7. **Normieren.** Auf 100, in Fünferschritten, `wissen` mindestens 15, jede Säule 10 bis 40 außer der Flussdeckel-Säule (5 bis 40). Reste beim Runden gehen nach der Reihenfolge `wissen`, `markt`, `beweise`, `meinung`, `persoenlich`.

**Was der Anteil zählt.** Rasterbeiträge je Takt, jede Folge einmal; Zweitverwertung auf einem zweiten Kanal und Stories zählen nicht. **Einhaltung:** Die Monatsbelegung (3.7) trifft jeden Anteil auf höchstens einen Beitrag je Takt genau, in jedem Zustand. Nur im Startmonat darf die Signatur-Säule bis zu zwei darüber liegen (Staffelplakat und Pilot).

**`zweck` und `frage` je Säule, Erzeuger.** Claude schreibt beide Felder im Schema `social` (8.3) für die Säulen-Ids, die die Regel geliefert hat: `zweck` als ein Satz, was diese Säule bei diesem Makler leistet, `frage` als die Frage des Kunden an dieser Stelle, aus `positionierung.fuerWen` und `antworten.hindernis` oder `ausloeser`, nie für eine Gruppe aus `positionierung.nichtFuer`. Der Regelpfad schreibt beide Felder als Lücke mit Arbeitsauftrag und hängt die Rohwerte an, etwa "Frage der Säule in Worten des Kunden formulieren. Stoff: fuerWen 'Erben und Anleger mit Zinshaus in Döbling', hindernis 'Provision'". Die allgemeine Beschreibung der Säule aus `HM_SAEULEN` steht nur intern als `zweckArt` und wird nie ausgegeben, weil sie für jeden Makler gleich wäre.

### 3.4 Serien

**Pflichtfelder** (Vertrag, ergänzt um `id`, `themenvorrat`, `reservefolge`, `anlass`): `{id, name, idee, saeule, format, ablauf[], hookFormel, rhythmus {tag, kanal[], takt}, variable {art, was, warum}, bildaufbau, folioRegel, beispiele[3], themenvorrat[], reservefolge, anlass}`. `format` ist eines von `post`, `karussell`, `reelTitel`, `story` und nennt das Hauptformat; weitere Vorlagen stehen in `vorlagen[]`.

**Regeln für den Namen.**
- Eigenname, höchstens drei Wörter (Setzung), laut gelesen ohne Stolpern (Lautlese-Test aus Schritt 8).
- Nicht in der Gattungsliste (Setzung): Markt-Update, Tipp der Woche, Mythos, Fakten, News, Wissen, Einblicke, Behind the Scenes, Objekt der Woche, Frag den Makler, Q und A, Just Sold, Just Listed, Warum jetzt. Vorbild für die Schärfe: The Modern House führt benannte Serien wie "Open House" und "The Designer's Toolbox" (https://www.themodernhouse.com/journal/), SERHANT eine Serie "LISTED by SERHANT" (https://serhant.com/blog/how-top-agents-are-using-video-to-sell-more-homes).
- Enthält mindestens eines: einen Ort aus dem Dossier, ein eigenes Wort des Maklers (`stimme.eigeneWorte`, `antworten.unity`), ein Fachwort aus seiner Herkunft oder ein Wort aus `idee.satz`.
- Ist nicht der Claim und enthält ihn nicht (`botschaften.claim`, genau einer).
- Verstößt gegen kein Verbot aus `brief.verbote` und `markenvertrag.falschWaere`.
- Enthält keine tragende Wortgruppe einer Schablone des heutigen Regelpfads (`HM_PF_FIGUR[*].signatur`, `hmPfSerieMarkt` bis `hmPfSerieBeweise`, etwa "Grundbuch-[Tag]", "Nach dem Grundbuch", "[Grätzl] in Zahlen", "Fallakte"). Maßgeblich ist die tragende Wortgruppe, nicht die Schreibung: "Grundbuch" in Verbindung mit einem Termin oder einer Zeitfolge fällt immer durch.
- Die Namensregel gilt für jeden Namen, gleich woher er kommt: Kandidaten von Claude, Vorschläge des Teams, ein Wunsch des Maklers in der Rückmeldung (Schritt 15) oder im Betrieb (Schritt 17). Ein Wunsch, der an ihr scheitert, wird mit dem Grund aus der Regel beantwortet und nie als neue Version übernommen; das Team schlägt stattdessen einen regelkonformen Namen mit derselben Absicht vor.
- Lesart-Test (Setzung, 5 Minuten): zwei Teammitglieder ohne Kontext schreiben auf, was sie unter dem Namen verstehen. Eine Lesart, die dem Markenvertrag widerspricht, wird als Risiko mit Gegenmittel eingetragen oder kippt die Reihenfolge der Namen.

**Regeln für die Variable.** Genau eine. `art` ist ein Enum: `motiv`, `zahl`, `ort`, `dokument`, `dauer`, `gast`, `objektmerkmal`; es dient nur der Prüfung. Der Inhalt `was` ist spezifisch und trägt ein `warum` mit Bezug auf `idee.satz` oder `idee.zeichen`. Eine Variable ohne Bezug zur Idee ist ein Katalogteil (Rubrik High-End, Deckel 4). Vorbild ist Pentagram für das Public Theater: dieselbe Schrift über Jahrzehnte, je Saison ändert sich nur die Behandlung (Beleg oben).

**Regeln für die Hook-Formel.** Inhalte in eckigen Klammern, Wahlmöglichkeiten darin mit senkrechtem Strich: `[das Warten | der schnelle Verkauf]`. Aufgelöst höchstens zehn Wörter, im Bild höchstens acht (Schritt 8, Schritt 13 `textImBild`). Keine Pflicht zu Zahl oder Frage im ersten Satz; `hmSkriptCheck` (`wb-os-data.jsx` Zeile 188 bis 190) wird in Schritt 17 an die Hook-Formel gebunden.

**Anrede, eine Syntax für alles.** Jede Stelle, an der die Anrede den Wortlaut ändert, steht als Paar in geschweiften Klammern, Sie-Form links, du-Form rechts: `{Sie|du}`, `{Ihnen|dir}`, `{Ihr|dein}`, `{Schicken Sie|Schick}`, `{sollten|solltest}`. Aufgelöst wird ausschließlich durch `hmAnrede(mid, kanal)` aus Schritt 8. Diese Syntax gilt in Regeln, Hook-Formeln, Weitergeben-Sätzen, Vorlagenfeldern, Beispielen, Datenvertrag und Selbsttest. Eine ausgeschriebene Anrede in einem Textfeld ist ein Fehler (Q7).

**Regeln für Beispiele und Belege.** Genau drei Beispiele je Serie, `{titel, hook, skizze, klasse, belegRef, luecke}`.
- `belegRef` zeigt auf `beweise[].id` und nur auf Einträge mit `oeffentlich` gleich "ja". "nein" und "offen" sperren die Folge; sie bleibt im Vorrat mit Lücke "Freigabe und Unterlage", bis Schritt 7 eine neue Version der Belegliste schreibt.
- Ein Beleg wird in derselben Serie höchstens einmal je Jahr *erzählt* (als Stoff der Folge) und in höchstens zwei Serien, dort in verschiedenen Staffeln. *Gezeigt* (eine Beleg-Zeile auf der Beleg-Seite oder in der Caption) wird er höchstens einmal je Takt, nie auf i plus minus 1 oder i plus minus 3 zu einer Folge, die ihn erzählt (Setzung, gegen Wiederholung).
- Fehlt Stoff, steht eine Lücke mit Arbeitsauftrag, nie ein Mustersatz.

**Regeln für Fälle aus Erstgesprächen und Fragen.** Siehe 3.14. Kurz: Praxisfragen nur als Frage ohne Umstände; ein Fall mit Umständen nur mit schriftlicher Einwilligung der Person.

**Regeln für den Bildaufbau.** Je Vorlage in Pixeln des Formats: Satzart, Einstellungsgröße nach `bild.regeln.abstand` (halbnah Kopf 20 Prozent, nah Kopf 40 Prozent der Fensterhöhe, weit Person höchstens ein Viertel), Blickachse, Platz (Achse der Nase oder der Person in x), Waagrechte des Bildes auf der Zeitmaß-Linie (Porträtstil aus Schritt 9), Lage von Titel, Variable, Zeichen und Kennung. Der Porträtstil bleibt in allen Serien gleich (Licht, Augenhöhe, er sitzt, Waagrechte auf dem Zeitmaß); die Serien unterscheiden sich in Einstellungsgröße, Blickachse und Platz. **Unterscheidbarkeit:** Zwei Gesicht-Serien eines Maklers dürfen nicht in allen drei Merkmalen übereinstimmen und nicht in der Einstellungsgröße (Q5). Die Anteile der Einstellungsgrößen über einen Takt folgen der Mischung aus `bild.regeln.abstand`. `bildaufbau` trägt je Vorlage `gesicht` (ja, nein) und `fuehrung` (bild, text), weil der Planer in Schritt 13 beides liest.

**Satzarten** (Setzung, aus Schritt 10 abgeleitet):
- *vollflächig*: Bild bis zum Rand, Text und Zeitmaß im Bild; für Porträts in Reel-Titelbild und Plakat.
- *Bild auf der Linie*: Grund oben mit dem Titel, Bild darunter, dessen Unterkante auf der Zeitmaß-Linie steht wie auf einer Leiste; Bild mindestens 60 Prozent der 3:4-Fläche; für Karussell-Titel und Sachkacheln. Auf diesem Grund wird der Gegenton sichtbar.
- *Fläche*: nur Grund, Schrift und Zeitmaß; die einzige textgeführte Satzart.

**Regeln für Zeitmaß und Kennung (`folioRegel`).** Die Zeitmaß-Linie liegt in jedem Format an derselben Stelle (Einschränkung E2 aus Schritt 9), das variiert nie. Je Serie fest und zwischen den Serien verschieden sind: die Form (Spanne mit Dauer oder Punkt mit Stand), die Seite des Etiketts und der Platz der Kennung: über der Linie links, über der Linie rechts, unter der Linie links, unter der Linie rechts. Zwei Serien desselben Maklers teilen nie Form und Kennungsplatz zugleich (Q10). So trägt nicht jede Kachel dieselbe Ecke. Kennung: Serienname, Folgenummer zweistellig ab 01, beim Karussell "Seite n von m", Folio-Stufe mindestens 30 px (Schritt 10: 32 px), nie über der Headline, nie als Rubrikzeile. Im Reel nur über der Linie, weil unter ihr in der Schnittmenge kein Platz bleibt.

**Reservefolge (Pflichtfeld).** Jede Serie hält eine zeitlose Folge `{titel, klasse, stoffquelle, belegRef, fertigAm}` fertig produziert bereit, ohne Datum, ohne Anlass, ohne ungeklärten Beleg. Erzeuger: Claude schlägt sie im Schema vor (8.3); der Regelpfad setzt eine Lücke "Reservefolge festlegen und am nächsten Drehtag produzieren"; der Art Director legt sie in der Serienwerkstatt fest und markiert sie nach dem Drehtag als fertig. Ohne fertige Reservefolge gibt Q6 kein Grün.

**Wie viele Serien.** Eine laufende Serie je Säule, also vier oder fünf, dazu höchstens eine Anlass-Serie. Die Anlass-Serie läuft nur, wenn `vorab.kennzahlen.objektflussMonat` mindestens 1 ist und `vorab.material[].rechte` für die Objektfotos geklärt ist. Sie gehört einer Säule an und übernimmt, wenn sie läuft, Plätze der laufenden Serie derselben Säule. Ruht sie, bleiben diese Plätze bei der laufenden Serie. Damit gibt es keinen leeren Platz und keine Verschiebung der Anteile.

**Stoffunabhängige Sachvorlage (Pflicht).** Mindestens eine Serie hat eine Vorlage ohne Gesicht, die weder von Objekten noch von externen Quellen noch von freigegebenen Fällen abhängt, in der Regel ein Detail aus der Arbeit (Dokument, Ort, Werkzeug). Sie ist die Reservefolge der Sachklasse und füllt jeden Samstag, an dem sonst nichts steht.

**Nachschubquelle je laufender Serie (Pflicht, `serien[].nachschub`).** Jede laufende Serie nennt, woher ihre Folgen nach dem Themenvorrat kommen: `{quelle, erzeuger, rhythmus, status}`. `quelle` ist eine der Folgenklassen F, P, G, E, W, ein eigenes Objekt oder `markt` (externe Zahlen). `erzeuger` ist das Feld und die Rolle, die den Stoff regelmäßig herstellt: `beweise` über Schritt 7, Frageprotokoll über den Drehtag (3.14), `vorab.kennzahlen` über den Import aus Schritt 1, `marktquelle` über die Marktredaktion (unten). Eine Serie, deren Quelle keinen Erzeuger mit Rhythmus hat, besteht die Nachschubprüfung nicht (`nachschub.status` "fehlt"), auch wenn ihr Themenvorrat für den Start reicht. Die Reservefolge überbrückt einen Ausfall, nie einen fehlenden Erzeuger.

**Kandidaten je Säule.** Für jede Säule außer der Signatur-Säule schlägt 12.6 zwei Serien in Rangfolge vor. Die Regeln prüfen Namensregel und Nachschub; der erste Kandidat, der besteht, läuft, der andere bleibt in `serienErsatz[]`. Beide teilen Säule, Plätze, Wochentag und möglichst die Vorlage, damit Belegung, Grammatik und Formatmix unverändert bleiben, wenn der Ersatz übernimmt. Besteht keiner, meldet die Prüfung an den CD, und die Plätze gehen als neue Version an die Serie der Pflichtsäule; 12.2 rechnet die Anteile dann mit Stoffwert 0 für diese Säule neu. Eine Serie ohne Erzeuger läuft nie im Dauerbetrieb.

**Marktquelle (`marktquelle`, Erzeuger dieses Schritts).** Kein Schritt von 1 bis 11 liefert Marktzahlen. Der Import aus Schritt 1 kennt nur Kennzahlen des Maklers (`objektflussMonat`, `verkauft12m`), keine Marktdaten. Darum legt dieser Schritt den Erzeuger selbst fest, statt einen neuen Importpunkt in Schritt 1 zu verlangen:
- *Feld:* `marktquelle {bezug, quellen[] {name, url, stand, kennzahl, ebene, methodik}, verantwortlich, rhythmus, geprueftAm, naechstePruefung, status}`. `ebene` ist Grätzl, Bezirk oder Wien; `status` ist "steht", "veraltet" oder "fehlt".
- *Verantwortlich:* die Marktredaktion im UNIO-Team, als Rolle eingetragen, nie mit Namen oder Kontaktdaten im Datenvertrag. Sie legt in 12.1 für das Kern-Grätzl aus dem Dossier mindestens eine Quelle an und prüft sie je Takt.
- *Zulässige Quellen:* veröffentlichte Statistik oder Auswertung mit URL, Stand und nachvollziehbarer Methodik, auf Ebene Bezirk oder feiner; Wien-weite Werte nur als Vergleich neben einem Bezirkswert. Eigene Abschlüsse des Maklers sind kein Marktwert, sie gehören nach `beweise`. Welche Quellen für welches Grätzl taugen, ist je Makler zu prüfen; dieses Dokument nennt bewusst keine, solange keine geprüft ist (Lücke, 9.13).
- *Rhythmus:* je Takt vor dem Drehtag; neue Stände werden eingetragen, `geprueftAm` gesetzt. Eine Zahl, deren Stand älter als zwölf Monate ist (Setzung), wird gesperrt, `status` "veraltet".
- *Im Beitrag:* jede Zahl mit Quellenname und Stand im Bild (Folio-Stufe, mindestens 30 px) und mit URL in der Caption; das Zeitmaß zeigt den Stand als Punkt.
- *Folge für die Tragfähigkeit:* Eine Serie mit `nachschub.quelle` gleich `markt` besteht nur, wenn `marktquelle.status` "steht". Ist bis 12.6 keine Quelle eingetragen, fällt sie durch, und der zweite Kandidat der Säule übernimmt. Eine Markt-Serie als Ortsfolge ohne Zahl im Dauerbetrieb gibt es nicht; sie wäre ein Bild eines Tors und passte auf jeden Makler.

### 3.5 Die Signatur-Serie

**Was sie ist.** Die eine Serie, an der man den Makler erkennt, bevor man seinen Namen liest. Sie ist das Serienformat unter den Codes aus Schritt 9 (`idee.codes`) und darum mehr als eine Serie unter vielen.

**Wie sie entsteht.** Claude schlägt drei Kandidaten vor, je mit zwei Namen, Variable, Stoffquelle, Risiko und Staffelthemen. Einer der drei kommt aus der `serienIdee` des gewählten Territoriums, weil der Makler diese Idee im Richtungstermin als Rohskizze gesehen hat (Schritt 6). Die Regeln prüfen die Tragfähigkeit, das Team wählt einen Kandidaten und legt Empfehlung und Alternative der Namen fest. Beide halten den Vertrag und unterscheiden sich in genau einer benannten Achse (etwa Fachwort gegen Wort aus `idee.satz`). Beide durchlaufen Namensregel, Kohorte und Lesart-Test.

**Staffeln.** Eine Staffel ist ein Quartal mit 13 Folgen. Kennung, Bildaufbau und Zeichen bleiben, Staffelthema und Plakat wechseln: die Quartals-Variable aus `system.festUndVariabel` und `quartal` in Schritt 17 (Public Theater, R2 3.13).

**Staffelthema, Verfahren (`staffeln[4] {nr, thema, quelle, festAm}`).**
1. Kandidaten in dieser Reihenfolge: die Anlässe aus `antworten.ausloeser` nach Rang, dann `antworten.hindernis`, dann der Anlass mit den meisten Titeln im Themenvorrat.
2. Claude formuliert je Staffel ein Thema in höchstens vier Wörtern und nennt die Quelle; der Regelpfad setzt die Kandidaten als Liste und je Staffel eine Lücke "Thema wählen".
3. Staffel 1 und 2 stehen vor dem Reveal fest. Staffel 3 und 4 dürfen offen bleiben, wenn weniger als drei Kandidaten vorliegen; dann setzt die Zwölf-Wochen-Auswertung in Schritt 17 das Thema aus dem häufigsten Anlass im Frageprotokoll, spätestens zwei Wochen vor Staffelstart, als neue Version.
4. Kein Thema darf gegen `brief.verbote` oder die Sprachprüfung verstoßen.

**Staffelplakat.** Ein Einzelbild der Signatur-Serie: Porträt, Serienname, Sendetag in Worten, Zeitmaß als Spanne der Staffel. Zum Staffelstart im Raster, Kandidat für einen angepinnten Beitrag (Schritt 13). Es darf direkt neben der Folge 01 stehen (einzige Ausnahme der Serienregel in 3.7), weil Ankündigung und erste Folge ein Paar sind.

**Tragfähigkeit (`serieSignatur.tragfaehigkeit`).** Alle Schwellen sind Setzungen und werden in Schritt 17 gegen echte Zahlen geprüft.

| Prüfung | Schwelle | Warum |
|---|---|---|
| `folgenVorrat` | mindestens 12 Folgentitel mit Stoffquelle, **bevor Schritt 13 beginnt**; damit zeigt der Sendeplan im Reveal keine Lücke | eine Staffel steht, bevor die Sendung beginnt |
| `wissensAnteil` | Klasse W höchstens 50 Prozent je Staffel (höchstens 6 von 13) | eine Sendung aus reinen Wissensfolgen passt auf jeden Makler |
| `eigeneFaelle` | mindestens 2 Folgen der Klasse F je Staffel, in Staffel 1 mindestens 4 | die Sendung beweist, was sie sagt |
| `jahresrechnung` | F plus P plus G plus E über vier Staffeln mindestens 26 bei wöchentlichem Rhythmus (13 bei zweiwöchentlichem) | Gegenstück zur Obergrenze für W, auf das Jahr gerechnet |
| `nachschub` | Fälle je Jahr = freigegebener Bestand plus `verkauft12m` mal 0,4; Praxisfragen je Staffel aus dem Frageprotokoll | die vorhandenen Fälle reichen für 52 Folgen nie |
| `objektUnabhaengig` | Pflicht, wenn `objektflussMonat` unter 2 liegt oder eine Lücke ist | sonst fällt die Sendung in Monaten ohne Objekt aus |
| `maklerMinutenMonat` | innerhalb von `antworten.zeit`, gerechnet mit 15 Minuten Drehzeit je Reel-Folge, 5 Minuten je Porträtmotiv am Drehtag, 5 Minuten Frageprotokoll, 2 Minuten Freigabe je Beitrag, 15 Minuten Themen bestätigen | Herstellbarkeit ist ein Gestaltungskriterium (R2 Prinzip 11) |
| `drehbar` | alle Folgen eines Monats an einem gebündelten Drehtag | Glennda Baker, Beleg oben |
| `komfortPasst` | Talking Head nur bei `k` ab 4; darunter Gespräch mit dem Team hinter der Kamera oder Karussell mit Porträt-Titel | Probedreh misst, was er kann |

**Rückfallregel.** Besteht der gewählte Kandidat nicht, gilt in dieser Reihenfolge:
1. Der Kandidat läuft zweiwöchentlich (7 Folgen je Staffel). Die Signatur-Säule wird dann mit 20 statt 30 gerechnet (Setzung), der freie Dienstag geht an die Gesicht-Serie der Pflichtsäule. Das ist eine neue Version, nie still.
2. Besteht auch das nicht, prüfen die Regeln die beiden anderen Kandidaten in derselben Form.
3. Scheitern alle drei, wird die Serie der Pflichtsäule zur Signatur, wenn ihre Variable aus `idee.satz` folgt und der CD das bestätigt, weil sie vom Stoff der Arbeit lebt, nicht von Fällen.
4. Scheitert auch das, geht der Schritt nicht weiter: Meldung an CD und eine Aufgabe an den Makler (F12-2). Eine Sendung aus Schablonen oder reinen Wissensfolgen gibt es nicht.

### 3.6 Formatmix

**Startwert je zwölf Rasterbeiträge:** 5 Reels, 4 Karussells, 3 Einzelbilder (Setzung). Grundlage ist die Rollenverteilung bei Socialinsider, Stand Q2 2026: Karussell 0,50 Prozent Interaktionsrate, Reel 0,48, Einzelbild 0,33; die Vorfassung nannte die Werte von 2025 (0,55, 0,52, 0,37), die Reihenfolge ist gleich geblieben. Reels bringen die meisten Kommentare und Weiterleitungen, Karussells die meisten Saves (https://www.socialinsider.io/social-media-benchmarks/instagram, https://www.socialinsider.io/social-media-benchmarks/instagram-engagement-report). Einzelbilder nur dort, wo ein Bild allein trägt: Porträt, eigenes Objekt, Dokument-Detail, eine Zahl mit Beleg (R6 Regel R2).

**Anpassung (Setzung, Regel `hmSocialFormatmix`).**

| Bedingung | Reels | Karussells | Einzelbilder |
|---|---|---|---|
| alle Videoformate in `antworten.formate` auf "nie" | 0 | 7 | 5, davon mindestens 4 mit Gesicht |
| `k` bis 2 oder Video höchstens "geht" | 3 | 6 | 3 |
| `k` 3 bis 4 | 4 | 5 | 3 |
| `k` ab 5 und Video "gern" (Startwert) | 5 | 4 | 3 |
| `k` ab 6, Video "gern", `zeit` ab 4 bis 8 Stunden | 6 | 4 | 2 |
| `zeit` "Bis 2 Stunden" (zusätzlich) | höchstens 4 | plus 1 | unverändert |
| `k` fehlt | Video "gern": Startwert; sonst wie `k` 3 bis 4 | | |

**Toleranz.** Die Monatsbelegung darf je Format um einen Beitrag vom Formatmix abweichen, wenn sonst eine Regel der Grammatik bricht (Setzung). Die Abweichung steht in `formatmix.herleitung`.

**Warum Komfort mitrechnet, obwohl der Vertrag nur `formate` und `zeit` nennt:** Der Vertrag nimmt `workshop.probedreh` als Eingang, und ein Selbsturteil misst das Selbstbild (Schritt 4, Abschnitt 5). Wer Video "gern" ankreuzt und im Probedreh bei 2 liegt, bekäme sonst fünf Reels, die er nicht dreht.

**Takt je Woche.** Drei Rasterbeiträge je Woche (Setzung, Qualität vor Takt nach Cereal und Koto, R6 Prinzip 8). Mehr Zeit bringt Stories und eigene LinkedIn-Beiträge, nicht mehr Rasterbeiträge. So gilt zwölf Kacheln gleich vier Wochen (R6 Regel R1).

### 3.7 Folgegrammatik für das 3:4-Raster

**Geometrie (Beleg).** Das Profil zeigt seit Jänner 2025 Kacheln in 3:4, jeder Beitrag wird mittig beschnitten; zulässig sind Beiträge von 1,91:1 bis 4:5 und Reels in 9:16 (https://www.kapwing.com/resources/instagrams-new-grid-layout-size-and-dimensions-2025/). Meta empfiehlt für Reels oben mindestens 14, unten 35 und seitlich je 6 Prozent frei von Text und Logos (https://www.facebook.com/business/ads-guide/update/video/instagram-reels); das gilt dokumentiert für Anzeigen, für organische Reels ist es eine Annahme (R6 1.1). Angepinnte Beiträge bleiben oben und sind im Fenster zum Umordnen ausgegraut (https://www.engadget.com/2190179/instagram-how-to-reorder-grid/).

**Der Kern (Ableitung).** Ein neuer Beitrag schiebt alle anderen um einen Platz. Übereinander liegen immer i und i plus 3; eine Zeile ist immer ein Fenster aus drei aufeinanderfolgenden Beiträgen, nur welches, hängt von der Verschiebung ab. Wer jede Regel für i plus minus 1, i plus minus 3 und jedes Fenster aus drei prüft, hat alle drei möglichen Verschiebungen geprüft.

**Die Regeln.**

| Merkmal | Regel | Im Raster | Warum |
|---|---|---|---|
| Gesicht (`gesichtPeriode` 3) | Gesicht, Gesicht, Sache; in jedem Fenster genau zwei Gesichter | acht von zwölf, in jeder Zeile zwei; die Sache bildet eine Spalte | Schritt 13: mindestens 8 von 12, höchstens 2 je Zeile (Setzung der Zerlegung); Periode 3 erfüllt beide in jedem Fenster. Gesicht in 100 Millisekunden (Willis und Todorov, oben) |
| Gegenton (`tonwertPeriode` 6, nur Sachplatz) | Grund vom Grundton abweichend (im Papier-Entwurf dunkel, im dunklen Gegenentwurf hell), nur auf jedem zweiten Sachplatz, nur in Satzart *Bild auf der Linie* oder *Fläche*; nie i plus minus 1, nie i plus minus 3 | zwei von zwölf; die Sachspalte wechselt hell und dunkel, im Ruhebild jede zweite Zeile mit einer dunklen Kachel | Auf Porträtkacheln ist der Grund unter dem Bild nicht sichtbar, also wirkt der Gegenton nur dort, wo Grund zu sehen ist. Der Wechsel in einer Spalte liest sich wie die Felder einer Messlatte und gehört so zur Idee des Zeitmaßes (Ableitung). Relativ zum Grundton, damit Empfehlung und Gegenentwurf dieselbe Regel lesen. Weicht von Schritt 10 ab, Hinweis in 5.2 |
| Textführung (`textfuehrung`) | textgeführt ist nur die Satzart *Fläche*; höchstens eine je sechs Plätze, nur auf dem Sachplatz; nie i plus minus 1, nie i plus minus 3 | höchstens zwei von zwölf | R6 Regeln R5 und R9; Instagram drosselt Reels, die überwiegend Text sind (https://about.instagram.com/blog/announcements/instagram-ranking-explained) |
| Einstellungsgröße (i plus minus 1) | nie zwei gleiche Einstellungsgrößen hintereinander; Klassen `halbnah`, `nah`, `weit`, `detail` (Sache aus der Nähe), `flaeche` (kein Bild) | kein Block gleicher Bildgrößen | `bild.regeln.reihung` aus Schritt 11: "Nie zwei gleiche Einstellungsgrößen in Folge"; hier als Nachbarregel geführt, damit sie jede Verschiebung übersteht |
| Format (i plus minus 1) | nie zwei gleiche Formate hintereinander, außer zwei Reels verschiedener Serien | kein Block gleicher Formate | R6 Regel R5 |
| Serie (i plus minus 1) | dieselbe Serie nie nebeneinander, außer Staffelplakat neben Folge 01; auf i plus minus 3 erlaubt | Serien als Spalten, nicht als Blöcke | Ableitung: gleicher Stoff nebeneinander wirkt wie eine Wiederholung |
| Beleg | Pflicht: in jeder Woche mindestens ein Beitrag mit freigegebenem Beleg (`belegRef` mit `oeffentlich` "ja") oder eigenem Objekt. Meldung: jedes Fenster aus drei ohne Beleg | jede Zeile des Ruhebilds trägt einen Beleg | Schritt 13 `belegJeZeile`. Warum Fenster nur als Meldung: Jedes Fenster abzudecken hieße vier Beleg-Beiträge je Takt, alle am selben Wochentag (12 durch 3), und damit vier freigegebene Fälle im Monat; das gibt kein Einzelmakler her (Rechnung 3.16). Arbeitsweise zählt nicht als Beleg, weil sie Selbstauskunft ohne Prüfstatus ist |

Die Taktlänge zwölf folgt aus dem Monatsrhythmus der Serien (zweiwöchentlich, monatlich); Gesichtsperiode 3 und Gegentonperiode 6 passen hinein.

**Wochentakt (Setzung).**

| Platz | Tag | Klasse | Inhalt |
|---|---|---|---|
| 1 | Tag aus `antworten.cue`, sonst vom Team gesetzt | Gesicht | die Signatur-Serie |
| 2 | mindestens ein Tag Abstand | Gesicht | Pflichtsäule und Persönliches; in der Startwoche der Pilot, wenn das Staffelplakat auf Platz 1 steht |
| 3 | mindestens ein Tag Abstand | Sache | Ort, Dokument, Objekt, Zahl; die einzigen Plätze für Gegenton und Textführung |

Nach jeder vollen Woche steht die Signatur als eine Spalte, die Sachspalte daneben. Unter der Woche wandern die Spalten, am Wochenende stehen sie wieder. Die Tage ersetzt Schritt 17 nach zwölf Wochen durch eigene Zahlen.

**Monatsbelegung im Dauerbetrieb (`belegung`).** Die Regel verteilt die Serien so auf die zwölf Plätze, dass jede Säule ihren Anteil auf höchstens einen Beitrag genau trifft, und legt Wechselplätze fest, deren Serie nach Zustand wechselt:
1. Zustände: Objekt da (`objektflussMonat` ab 1 und Rechte geklärt) oder nicht; freigegebener Fall frei (in diesem Takt noch nicht erzählt) oder nicht.
2. Jeder Wechselplatz hat eine Rangfolge von Serien derselben Klasse, die letzte ist immer die stoffunabhängige Sachvorlage (3.4) oder eine Gesicht-Serie der Pflichtsäule.
3. Die Anlass-Serie übernimmt nur Plätze ihrer eigenen Säule.
4. Die Regel rechnet alle vier Zustände und meldet jeden, in dem eine Säule um mehr als einen Beitrag abweicht oder ein Platz leer bliebe. Ohne vier grüne Zustände gibt es kein Grün in Q1.

**Ausfall.** Fällt ein geplanter Beitrag aus, rückt die Reservefolge derselben Serie nach, sonst die der Klasse. Der Takt bleibt, der Platz ist nie leer; das hält Schritt 16 ("nie mit halbem Raster") im Betrieb.

**Umordnen.** Seit 8. Juni 2026 lässt sich das Raster von Hand umordnen (Beleg oben). Die Werkbank nutzt das nur zur Reparatur nach einem Fehler.

**Angepinnt.** Angepinnte Beiträge liegen außerhalb der Folge und werden nicht geprüft. Wie viele angepinnt werden dürfen, ist nicht bestätigt (R6, Lücke).

**Lesbarkeit.** Rechnung aus R6 Kapitel 3: 390 pt Telefonbreite, drei Kacheln, rund 129 pt je Kachel, 1080 px entsprechen rund 0,12 pt je px. Apple nennt 11 pt als Mindestgröße (https://developer.apple.com/design/human-interface-guidelines/typography). Daraus: Text, der in der Kachel gelesen werden soll, mindestens 92 px auf 1080, besser ab 110 px; im offenen Beitrag mindestens 30 px, Fließtext ab 47 px. Kontrast 4,5:1, großer Text 3:1, auch in Bildern (https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Die Stufen setzt Schritt 10.

**Sichere Zonen.** Post 1080 x 1350, alles Tragende im 3:4-Fenster x 33,75 bis 1046,25. Reel-Titelbild und Story 1080 x 1920: die Kachel zeigt y 240 bis 1680; Titel, Gesicht, Zeichen und Kennung in der Schnittmenge x 65 bis 1015, y 269 bis 1248 (R6 Regel R7, Schritt 10 Tabelle Raster).

### 3.8 Vorlagen und Sperrstufen

**Stufen** aus Schritt 10 (`system.sperrstufen`, nach Canva: https://www.canva.com/help/brand-template-locks/): `fest` (nichts änderbar), `stil` (Formatierung fest, Inhalt offen), `rahmen` (Bild tauschbar, Seitenverhältnis und Ausschnittregel fest), `variante` (Wahl aus zwei oder drei vorbereiteten Fassungen).

**Felder einer Vorlage** `{name, sperrstufe, token, maxWoerter, minPx, quelle, offen}`. `token` zeigt auf `system.tokens` (Bauteil-Ebene). Ein Feld ohne Token gibt es nicht; das verbietet jedes Schmuckelement, das nicht aus der Idee kommt.

**So gesperrt, dass kein Vorlagen-Look entsteht, so offen, dass der Feed nicht eintönig wird.**
1. Fest sind Zeichen, Kennung und ihr Platz, Platz der Variable, Schriftstufen, Ränder, Satzart, Einstellungsgröße und Blickachse, Endkarte. Offen ist genau die Variable und das Bild im Rahmen.
2. Die Stufe `variante` wählt nicht der Mensch, sondern die Grammatik: Der Gegenton einer Sachkachel folgt aus ihrem Platz im Takt.
3. Das echte Bild trägt: außer in der Satzart *Fläche* mindestens 60 Prozent der 3:4-Fläche Bild (Setzung). Bilder nur aus `bild.kontaktbogen` (Schritt 11), nie aus Stock oder Bildwelt.
4. Abwechslung zwischen den Serien entsteht aus Satzart, Einstellungsgröße, Blickachse, Form des Zeitmaßes und Kennungsplatz, alle je Serie fest. Innerhalb einer Serie wechselt nur die Variable.
5. Keine Verläufe, keine Schleier hinter Text, keine Rahmen um Reels, keine Wasserzeichen (Instagram stuft Reels mit Rändern und Wasserzeichen herab, Beleg oben).
6. Wer die Vorlage bedient, sieht nur die offenen Felder, wie bei Figma Buzz (https://help.figma.com/hc/en-us/articles/31271824185623-Bulk-create-assets-in-Figma-Buzz).

**Formate:** `post` (1080 x 1350), `karussell` (1080 x 1350, 6 bis 10 Seiten), `reelTitel` (1080 x 1920, dazu Untertitel-Band und Endkarte), `story` (1080 x 1920). Jede Vorlage gibt es je `variante` (`empfehlung`, `gegenentwurf`), weil Schritt 13 dieselben Inhalte im Gegenentwurf zeigt; der Gegenentwurf liest `system.gegenentwurf` (Abweichung im Eingang, 5.1).

**Stresstest (`vorlagen[].stresstest`).** Wie Schritt 10 (Abschnitt 10.8), je Serienvorlage: längster und kürzester Inhalt je offenem Feld, längster Serienname mit Folge und Seitenzahl, beide Anredeformen, Umlaute, fehlendes Porträt, fehlendes Objektfoto, Beleg auf "offen". Ergebnis je Fall `ok`, `grenzwertig` mit Messwert oder `fehler`. Jede Kürzung ist ein Fehler. Fehlt ein Porträt, zeigt die Vorlage im Team-Modus eine Lückenfläche; im Makler-Output erscheint sie nicht.

### 3.9 Karussell-Rollen

| Rolle | Seite | Regel | Grenzen |
|---|---|---|---|
| Versprechen | 1 | ist die Kachel und muss allein bestehen; sagt, was der Leser am Ende weiß | im Bild höchstens acht Wörter, mindestens 92 px |
| Einlösung | 2 | löst sofort ein, ohne Vorrede | eine Aussage, höchstens 25 Wörter (Setzung), mindestens 47 px |
| Schritte | 3 bis n minus 2 | eine Seite, ein Gedanke | höchstens 25 Wörter je Seite (Setzung) |
| Beleg | n minus 1 | Beleg-Zeile mit `belegRef` (nur `oeffentlich` "ja") oder Zahl mit Quelle und Stand; zeigt das Zeitmaß mit seinem Datenwert (Code Serienformat aus Schritt 9) | Quelle sichtbar, mindestens 30 px; ohne freigegebenen Beleg eine Zahl mit öffentlicher Quelle, sonst entfällt die Seite |
| Weitergeben | n | ein Satz an eine bestimmte Person aus dem Anlass, Form `{Schicken Sie|Schick} das an [Person aus dem Anlass].`; nie "Jetzt anfragen" | Empfänger aus `positionierung.fuerWen`, `antworten.ausloeser` oder `einsicht.spannung` über `positionierung`; je Serie eine eigene Formel |

Standard sechs bis zehn Seiten (R6 Regel R10). Instagram erlaubt bis zu 20 (https://petapixel.com/2024/08/09/instagram-users-can-now-share-20-photos-videos-in-a-post-carousel-photodump/); Socialinsider meldet mehr Reichweite ab zehn Seiten, ohne Stichprobe (https://www.socialinsider.io/blog/instagram-carousel/). Weiterleitungen zählen nach Mosseri am stärksten für Nicht-Follower (sekundär, R6 1.2), deshalb endet jedes Karussell mit einem Satz zum Weitergeben (MARKENQUALITAET 4.7).

### 3.10 Codes-Prüfung

`idee.codes` aus Schritt 9 sind zwei bis drei Codes der Arten Zeichen, Porträtstil, Serienformat oder Setzweise. Die Prüfung zählt je Vorlage und Seite, welche Codes durch Bau sichtbar sind, und je Kachel in Schritt 13, ob ein Gesicht erkannt wurde. Jede Kachel braucht mindestens zwei. Bei Sachkacheln zählt die Waagrechte des Bildes auf der Zeitmaß-Linie als Teil des Porträtstils, weil Schritt 11 sie als Regel ohne Gesicht festlegt. Die Farbe zählt nie. Fällt eine Vorlage durch, wird die Vorlage geändert, nie die Prüfung. Grundlage: nur 15 Prozent von 5.046 Markenelementen sind wirklich unverwechselbar, Farben am seltensten (https://www.marketingweek.com/15-brand-assets-truly-distinctive-finds-research/); formbasierte Assets erreichen im Mittel 40 Prozent Bekanntheit, Farbe 12 (https://www.tandfonline.com/doi/abs/10.1080/02650487.2026.2637295).

### 3.11 Kanalplan und Anrede

Je aktivem Kanal aus `antworten.kanaele` (aktiv oder aufbauen) ein Eintrag `{rolle, anrede, formate[], frequenz, serien[]}`.

- `rolle` folgt aus `antworten.empfehler` und `antworten.ziel`. Kommen Aufträge über Notariate, Anwälte, Steuerberatung oder Hausverwaltung, ist LinkedIn der Kanal der Empfehler (Schritt 2, F14). Instagram ist der Ort, an dem eine Empfehlung in fünf Sekunden bestätigt wird (R5 Prinzip 7, Ableitung). Edelman und LinkedIn fanden bei B2B-Entscheidern, dass 66 Prozent ein eigenes Format oder einen eigenen Stil als Merkmal der besten Inhalte nennen (https://curzonpr.com/theprinsider/the-impact-of-thought-leadership-edelman-and-linkedin-b2b-2024-report/); B2B, nur mittel übertragbar.
- `anrede` ist eine Momentaufnahme von `hmAnrede(mid, kanal)`, keine zweite Logik; der Selbsttest vergleicht sie bei jedem Lauf mit dem Rückgabewert.
- `frequenz` rechnet aus der Monatsbelegung, nicht aus einer Tabelle. Ein dritter Kanal mit eigener Produktion erst ab `zeit` 4 bis 8 Stunden (Setzung).
- LinkedIn und Facebook haben kein Profilraster, dort gilt die Grammatik nicht, wohl aber Anrede, Sprachprüfung, Objekt-Regel und Codes.

### 3.12 Konzepte

Drei Konzepte `{name, idee, warum, umsetzung[], kanal}`:
1. **Launch für 30 Tage.** Folgt `rollout.folge` aus Schritt 16: Woche 1 Vorstellung, Wochen 2 bis 4 Signatur im Rhythmus, Rückblick nach 30 Tagen. Hier: Staffelplakat und Pilot als erste Beiträge, Kompetenz vor Persönlichem.
2. **Signature-Format.** Die Sendung als Konzept: Staffeln mit Thema, Themenvorrat, Drehtag, Frageprotokoll, Auswertung nach zwölf Wochen.
3. **Community oder Kooperation.** Aus `antworten.empfehler` und `antworten.unity`: eine Kooperation mit Menschen, denen die Kunden ohnehin vertrauen. Jeder Partner nur mit schriftlichem Einverständnis, keine Kontaktdaten Dritter im Datenvertrag.

### 3.13 Sprachprüfung und Objekt-Regel

**Sprachprüfung (`sprachpruefung`).**
- Harte Fehler: die Klischee-Liste aus `MARKE_SCHEMA.md` (Traumimmobilie, Ihr Partner für, mit Leidenschaft, kompetent und zuverlässig, Immobilienprofi, maßgeschneidert, rundum sorglos, auf Augenhöhe, Mehrwert, ganzheitlich, individuelle Lösungen, Ihr Zuhause ist unsere Mission, seriös, Experte an Ihrer Seite, einzigartig, exklusiv ohne Beleg), dazu Just Sold und Just Listed (R5 Kapitel 4 Punkt 5 und Kapitel 5).
- "Objekt" im Fließtext öffentlicher Texte, auch in Zusammensetzungen: Fehler mit Ersatz Haus, Wohnung, Zinshaus, Zuhause (R5 1.1; Albert Hill: https://www.holeandcorner.com/long-reads/in-the-modern-style). Ausnahme: gesetzliche Pflichtangaben.
- Hinweise: die weichen Floskeln aus MARKENQUALITAET (Traumwohnung, einmalige Gelegenheit, revolutionär, Game-Changer, aus einer Hand, Luxus, Premium, hochwertig, Wohlfühl, perfekt, garantiert) und "Jetzt anfragen".
- Marken-eigen: `stimme.vermeiden`, `markenvertrag.falschWaere`, `brief.verbote` und die Gegenmittel aus dem Lesart-Test der Seriennamen.
- Anrede: jede ausgeschriebene Anrede außerhalb der Platzhalter ist ein Fehler.
- Form: keine Geviertstriche und Halbgeviertstriche, keine Ausrufezeichen, keine Emojis, kein Satz über 20 Wörter, keine zwei Adjektive hintereinander.
- Gilt für Serienname, Folgentitel, Hook-Formel, Beispiele, Konzepte, Text im Bild und jede Caption in Schritt 13 und 17. Nicht für die Negativbeispiele in `stimme.beispiele[].nicht`.

**Objekt-Regel (`objektRegel`).** Gilt für jeden Beitrag, der ein Objekt in Vermarktung zeigt, auch für Reels.
- Energiekennzahlen Pflicht: HWB, Endenergiebedarf und Klasse A bis G; bei Ausweisen nach alter Form HWB und fGEE. Quellen: https://www.energieausweis360.at/energieausweis-neuerungen-2026, https://www.chg.at/novelle-des-energieausweis-vorlage-gesetzes/, https://www.ovi.at/recht/energieausweis/informationspflicht-in-medien. Die genaue Rechtslage prüft UNIO vor dem Livegang; keine Rechtsberatung.
- Zwei Orte: die Energiezeile im Bild als Feld mit Stufe `fest` und die erste Zeile der Caption nach dem Hook.
- Preis und Fläche in die Caption, nicht auf das Bild (R5 Prinzip 1).
- Werte aus dem Bestand-Import (`hwb`, `fgee`, `klasse`, Schritt 1 D2). Fehlt ein Wert, blockiert der Beitrag mit "Energieausweis anfordern". Der Endenergiebedarf fehlt im Import (Hinweis an Schritt 1).
- Nur eigene Objekte des Maklers mit geklärten Bildrechten; nie Demo-Objekte aus `hmWebObjekte`.

### 3.14 Datenschutz bei Fällen, Grundbuch und Erstgesprächen

- **Eigene Fälle (F).** Nur mit `oeffentlich` "ja" aus Schritt 7, dort mit Unterlage (Regel R3 in Schritt 7). Im Bild nie Adresse, Hausnummer, Türschild, Einlagezahl oder Namen; Zeitangaben höchstens auf das Quartal genau, außer die Eigentümer haben der genauen Angabe zugestimmt.
- **Grundbuch.** Keine Folge über Eintragungen Dritter, auch nicht anonymisiert. Folgen erklären Dokumente und Abläufe allgemein. Eigene Fälle erscheinen erst nach der Eintragung und ohne Eintragungsdatum.
- **Praxisfragen (P).** Am Drehtag fragt das Team: Welche Frage zum Zeitpunkt haben Sie diesen Monat gehört? Festgehalten wird nur die Frage in allgemeiner Form mit Monat, ohne Person, Familienverhältnisse, Ort unterhalb des Bezirks oder Zahlen zu deren Haus. So entsteht keine personenbezogene Angabe (Ableitung; die Rechtslage prüft UNIO, 9.7).
- **Fälle aus Erstgesprächen mit Umständen.** Nur mit schriftlicher Einwilligung der Person, im Datenvertrag als `einwilligung {ja, datum}` ohne Namen und Kontaktdaten; ohne Einwilligung wird daraus höchstens eine Praxisfrage.
- **Gäste (G).** Nur mit schriftlichem Einverständnis; Name erscheint nur, wenn der Gast das will.

### 3.15 Wer was tut, Erlebnis und Wochenrechnung

| Rolle | Tut | Tut nicht |
|---|---|---|
| Makler | in diesem Schritt nichts; bei zu dünnem Stoff einmal die Aufgabe F12-2 (10 Minuten); im Reveal sieht er seine Sendung, am Folgetag wählt er einen von zwei Namen | wählt keine Säulen, Formate, Farben oder Vorlagen; sieht keine Grammatik |
| Art Director | wählt die Signatur, legt die Reihenfolge der Namen fest, führt den Lesart-Test, setzt den Bildaufbau jeder Vorlage am echten Kontaktbogen, legt je Serie die Reservefolge fest und markiert sie nach dem Drehtag als fertig, schärft Folgentitel, sichtet den Stresstest | erfindet keine Fälle, setzt keine Mustersätze |
| Marktredaktion (Team) | legt `marktquelle` in 12.1 an, prüft sie je Takt vor dem Drehtag, sperrt veraltete Zahlen | erfindet keine Zahl, nimmt keine Quelle ohne URL, Stand und Methodik, nutzt keine Abschlüsse des Maklers als Marktwert |
| Creative Director | Blick auf drei Beispielkacheln je Serie und die Probe-Folge als Profil, Kohortenurteil, Abnahme | redigiert nicht Vertrag oder Idee |
| Claude | Säulentexte `zweck` und `frage`, drei Signatur-Kandidaten mit Namen und Staffelthemen, Serienentwürfe mit Reservefolge, Hook-Formeln, Beispielfolgen, Themenvorrat, Konzepttexte, jeweils mit Pfad zur Quelle | rechnet keine Anteile, setzt keine Takte, erfindet keine Zahl, keinen Ort, keinen Fall |
| Regeln | Vorprüfung, Stoffinventar, Anteile, Tragfähigkeit, Formatmix, Grammatik, Monatsbelegung je Zustand, Probe-Folge, Vorlagenfelder aus `system`, Stresstest, Codes, Kanalplan, Sprachprüfung, Objekt-Regel, Kohortenvergleich | setzen bei fehlendem Stoff eine Lücke mit Arbeitsauftrag |

**Erlebnis des Maklers.** Kein eigener Termin. Im Reveal (Schritt 15) folgt nach dem Feed im Handy eine Seite nur für die Sendung: das Staffelplakat zweimal nebeneinander, gleich gestaltet, nur der Name verschieden, einer als Empfehlung markiert mit zwei Sätzen aus seinen eigenen Antworten. Darunter der Sendeplan der ersten Staffel mit zwölf oder dreizehn Folgentiteln und Datum, ohne Lücke, weil Schritt 13 erst ab zwölf Titeln beginnt. Die Kacheln im Reveal-Feed tragen in der Kennung den empfohlenen Namen; das ankert die Wahl bewusst, denn die Empfehlung ist begründet, und die Seite der Sendung zeigt beide Namen im selben Plakat, damit die Alternative nicht als Nachtrag wirkt. Am Folgetag wählt er in der Rückmeldung einen Namen, unter einer Minute (Setzung). Der gewählte Name steht danach in jeder Kennung. Moment: Das ist meine Sendung.

Warum zwei Namen: höchstens zwei kuratierte Optionen mit Empfehlung (Zerlegung G2; Auswahlüberlastung: https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf). Warum nebeneinander: er vergleicht nur den Namen (Evaluability, https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf). Warum er überhaupt wählt: Mitwählen steigert den Wert, wenn die Aufgabe abgeschlossen wird (https://myscp.onlinelibrary.wiley.com/doi/abs/10.1016/j.jcps.2011.08.002).

**Wochenrechnung Team (E8, alle Minutenwerte Setzungen, gemessen in Schritt 17).** Grundlage ist die Monatsbelegung mit 5 Reels, 3 Karussells, 4 Einzelbildern (3.16).

| Arbeit je Takt | Menge | Minuten je Stück | Summe |
|---|---|---|---|
| Reel-Schnitt mit Untertitel und Titelbild aus Vorlage | 5 | 45 | 225 |
| Karussell-Satz in der Vorlage (Text aus dem Vorrat, 6 bis 7 Seiten) | 3 | 40 | 120 |
| Einzelbild in der Vorlage | 4 | 15 | 60 |
| Caption mit Anrede-Platzhaltern | 12 | 10 | 120 |
| Freigabe einholen und einpflegen | 12 | 5 | 60 |
| Renderer, Export, automatische Prüfungen sichten | 12 | 5 | 60 |
| Einplanen und veröffentlichen | 12 | 5 | 60 |
| LinkedIn-Fassung | 8 | 10 | 80 |
| Drehtag: Vorbereitung 60, vor Ort 180 | 1 | 240 | 240 |
| Marktquelle prüfen, neue Stände eintragen | 1 | 30 | 30 |
| Summe je Takt | | | 1.055 |

Je Woche rund 264 Minuten, also rund 4 Stunden 25 Minuten. Die frühere Setzung von 2,5 Stunden war nicht gerechnet und ist gestrichen.

**Makler-Minuten je Takt (Beispiel Markus, 3.16).** 5 Reel-Folgen mal 15 = 75; drei Porträtmotive am Drehtag (zweimal am Tisch für Vor der Unterschrift, einmal am Ort für Alteingesessen) mal 5 = 15; Frageprotokoll 5; 12 Freigaben mal 2 = 24; Themen bestätigen 15. Summe 134 Minuten, davon rund 95 am Drehtag.

---

### 3.16 Beispiel: Markus Leitner, Döbling, Zinshaus, Figur Kenner, Sie-Form

**Herkunft der Werte.** Die v2-Schritte 1 bis 11 sind für Markus nicht gelaufen. Das Beispiel nutzt den Seed `markus` (`wb-store.jsx` Zeile 72 und 103, `wb-os-data.jsx` Zeile 278, `wb-more.jsx` Zeile 84), das Musterbeispiel (MARKENQUALITAET Kapitel 5) und die Beispiele der Nachbarschritte: Positionierung, Belege `b1` bis `b6` und Vertrag aus `07_positionierung.md`, Idee "Das Zeitmaß" mit Codes und Verboten aus `09_idee.md` 3.11, Stufen, Rand und Farbrollen aus `10_system.md` 3.6 und 10.6, Einstellungsgrößen aus `11_bild.md`. Die Augenlinie y 787 in `11_bild.md` gehört zur Arbeitsannahme "Die Frist" und gilt hier nicht; die Pixelwerte unten sind aus dem Zeitmaß gerechnet (Hinweis an Schritt 11).

#### Stoffinventar (12.1)

| Stoff | Wert | Herkunft |
|---|---|---|
| Claim | Zeit ist Teil des Preises. | Annahme `botschaften.claim`, Muster 5.3 |
| Idee | Neben jedem Preis steht seine Zeit. Zeichen "Das Zeitmaß": Maßlinie als Spanne mit Dauer oder als Punkt mit Stand, Länge logarithmisch von einer Woche bis fünf Jahre, immer an der Unterkante der sicheren Fläche, links bündig | `09_idee.md` 3.11, `10_system.md` Zeile 409 |
| Codes | Zeitmaß; Porträtstil (er sitzt, frontal, Augenhöhe, Vormittagslicht von der Seite, eine Waagrechte auf Höhe des Zeitmaßes); Serienformat (jede Folge endet mit ihrer Zeit) | `09_idee.md` 3.11 |
| Raster | Post: Rand 119 px, Satzbreite 842 px, Zeitmaß-Zeile y 1231; Reel: Schnittmenge y 269 bis 1248 | `10_system.md` 10.6 |
| Verbote | Politik, Familie im Bild, Warten, das wie Zögern klingt, Handschlag und Schlüssel, Uhren, Sanduhren, Kalenderblätter | `09_idee.md`, `brief.verbote` |
| Belege | b1 zwei Jahre gewartet, 600.000 mehr; b2 Zinshaus Sievering, 4,2 Mio., 11 Wochen; b3 Anlegerwohnung Währing, 8 Prozent über Erstschätzung; b4 6 bis 8 der letzten zehn Abschlüsse in Sievering; b5 14 Abschlüsse 2025; b6 "nie gedrängt" nur intern. Alle Selbstauskunft, `oeffentlich` offen | `07_positionierung.md` |
| Freigegebene Belege heute | **keiner** | Regel: nur "ja" zählt |
| Plan für die Freigabe | b1, b2, b3, b5 mit Unterlage bis 7 Werktage vor dem Reveal (Aufgaben aus dem Workshop); b4 bleibt offen, weil "6 bis 8" keine prüfbare Zahl ist | Annahme, `workshop.aufgaben` |
| Anlässe, Hindernis | Erbe, Investment; Provision | Seed `ausloeser`, `hindernis` |
| Fester Termin | Dienstag nach dem Grundbuch-Termin, 11 Uhr | Seed `cue` |
| Grenzen | Politik nie, Familie nie im Bild; zeigen: Wohnort und Grätzl, Meinung zum Markt, Fehler und Learnings | Seed `tabus`, `privat` |
| Zugehörigkeit, Herkunft | Alteingesessene in Döbling, Väter im Ruderverein; aufgewachsen in Döbling, Großvater verwaltete Zinshäuser | Seed `unity`, `aufgewachsen` |
| Formate, Zeit, Kanäle | Talking Head, Karussell, Frage und Antwort je "gern" (Annahme); 2 bis 4 Stunden; LinkedIn zuerst, Instagram zweiter Kanal, Facebook offen | Seed, `02_fragebogen.md` |
| Empfehler | Notariat (Zinshaus Sieveringer Straße), Bestandskunde (Anlegerwohnung Währing) | Annahme aus Seed `abschluesse` |
| Kamera-Komfort | Lücke: kein Probedreh in v2 | `workshop.probedreh` |
| Marktquelle | Erzeuger festgelegt (3.4), Bezug Sievering und Döbling; Quelle mit URL und Stand noch nicht eingetragen: Lücke, Arbeitsauftrag an die Marktredaktion bis 12.6 | `marktquelle.status` "fehlt" |
| Objektfluss, verkauft12m | Lücke: kein Bestand-Import; als interner Arbeitswert für die Nachschubrechnung b5 (14 Abschlüsse 2025, Selbstauskunft, nie öffentlich) | `vorab.kennzahlen` null |
| Porträts | 15 Porträts vom 11.09., Rechte offen; Schritt 11 setzt einen Porträt-Termin vor dem Reveal | Seed `a1`, `11_bild.md` |

#### Säulen (12.2 und 12.3)

Rechnung: `meinung` ist Signatur-Säule (b1 trägt eine Haltung gegen den eigenen Vorteil), 30; `wissen` 20. Flussdeckel `beweise`: Fälle je Jahr heute 0 freigegeben plus 14 mal 0,4 gleich 5,6, im Plan 3 plus 5,6 gleich 8,6; je Monat 0,5 bis 0,7; mal 100 durch 12 ergibt 4 bis 6, abgerundet 5 (Mindestwert). Rest 45 auf `markt` (Stoffwert 1) und `persoenlich` (Stoffwert 1): je 10, Überhang 25 hälftig, also je 22,5. Deckel `persoenlich` 15, Überhang 7,5 an `wissen` (27,5). Komfort fehlt, keine Verschiebung. Zeit 2 bis 4 Stunden, fünf Säulen. Runden: `wissen` 30, `markt` 20.

| Säule | Anteil | Ziel je Takt | `zweck` (Claude-Feld, Entwurf) | `frage` (Claude-Feld, Entwurf) |
|---|---|---|---|---|
| `meinung` | 30 | 3,6 | Zeigt an echten Entscheidungen, wann Warten und wann Verkaufen richtig war. | Muss ich jetzt verkaufen? |
| `wissen` (Wie ich arbeite) | 30 | 3,6 | Legt offen, was vor der Unterschrift auf dem Tisch liegt, die Provision eingeschlossen. | Was kostet der Makler, und was bekomme ich dafür? |
| `markt` | 20 | 2,4 | Zeigt, was Eigentümer in Sievering gerade fragen. | Was ist ein Zinshaus in Sievering heute wert, und wann? |
| `persoenlich` | 15 | 1,8 | Zeigt, wo er herkommt, ohne Familie im Bild. | Wer ist er, und passt er zu uns? |
| `beweise` | 5 | 0,6 | Erzählt abgeschlossene Fälle erst nach der Eintragung. | Hat das bei anderen funktioniert? |

Regelpfad ohne Claude: beide Textspalten als Lücke mit Arbeitsauftrag und angehängten Rohwerten.

**Probe auf Wirkung.** `k` gleich 2: `meinung` verliert 5 an `wissen` und `markt`. Kennzahlen aus dem Import: `markt` Stoffwert 2, `markt` steigt. `verkauft12m` gleich 30: Flussdeckel 10, `beweise` 10. Zum Vergleich der heutige Kenner-Mix aus der Figur: 35, 25, 15, 15, 10 für jeden Kenner (`wb-data.jsx`, HM_ARCHETYPEN).

#### Die Signatur (12.4 und 12.5)

| Kandidat | Idee | Variable | Stoffquelle | Tragfähigkeit | Urteil |
|---|---|---|---|---|---|
| K1 **Zeitwert** | Jede Folge nimmt eine echte Entscheidung über einen Zeitpunkt und rechnet vor, was die Dauer wert war. | `dauer`: die Dauer der Entscheidung, als Spanne des Zeitmaßes | b1, b2, F12-2, Anlässe Erbe und Investment, Frageprotokoll | Staffel 1 trägt nach F12-2, Staffel 2 bis 4 bedingt (unten) | **gewählt**, Rückfallstufe 1 vorbereitet |
| K2 Der Grundbuch-Termin als Sendung | Jeden Dienstag eine Eintragung und was sie sagt | die Eintragung | `cue` | nicht an einem Drehtag bündelbar; Eintragungen betreffen private Eigentümer | verworfen: nicht drehbar, Datenschutz (3.14); außerdem die Schablone `HM_PF_FIGUR.kenner.signatur` (`wb-plattform.jsx` Zeile 216) |
| K3 Rechnung Sievering | Jeden Monat drei Zahlen zu Sievering | die Frage des Monats | Marktdaten | Marktquelle ist eine Lücke; monatlich trägt keine Sendung | verworfen als Signatur, wird die Markt-Serie |

**Die zwei Namen.**

| | Name | Achse | Warum | Risiko und Gegenmittel |
|---|---|---|---|---|
| Empfehlung | **Zeitwert** | Fachwort | Sagt den Claim, ohne ihn zu wiederholen; ein Begriff aus Bewertung und Versicherung, passt zu seiner Herkunft. Bleibt wahr, wenn sich der Dienstag verschiebt | *Konnotation:* In Versicherung und Bilanz ist der Zeitwert der Wert nach Abnutzung, also weniger als der Neuwert. Für Verkäufer kann das nach Wertverlust klingen. Gegenmittel: (1) der Pilot sagt im ersten Satz, was das Wort bei ihm heißt: was die Zeit wert war, in beide Richtungen; (2) Folgentitel sind immer schlichte Dauern ("Zwei Jahre.") und die Serie zeigt schnelle neben geduldigen Fällen; (3) Sprachprüfung: "Zeitwert" neben Haus, Wohnung, Zinshaus oder Immobilie in einem Satz ist ein Fehler, damit nie "der Zeitwert Ihres Hauses" entsteht; (4) nennt im Lesart-Test eine Person Wertminderung, steht das Risiko in der Begründung im Reveal, und der CD entscheidet, ob die Reihenfolge kippt. Zweites Risiko: klingt kühl |
| Alternative | **Die Zeit daneben** | Wort aus `idee.satz` | Nimmt "Neben jedem Preis steht seine Zeit." wörtlich; gleiche Idee, gleiche Variable, gleiches Format, nur Alltagssprache statt Fachwort. Kein Wertverlust in der Lesart | Klingt leiser und weniger merkbar als ein Wort; drei Wörter. Kohorte: Meldung im Wortfeld Zeit wegen Elif Demir (Schritt 9, Austauschtest), dort schon vom CD als kein Konflikt beurteilt; erneut zu prüfen |

"Nach dem Grundbuch" ist gestrichen, weil es die Wortgruppe der verworfenen Schablone trägt.

Satz im Reveal unter der Empfehlung (Entwurf, Platzhalter aufgelöst durch `hmAnrede` zu Sie): "Wir empfehlen Zeitwert. {Sie haben|Du hast} unterschrieben, dass Zeit Teil des Preises ist, und genau das rechnet jede Folge vor."

**Serie Zeitwert** (`serien[0]`)

| Feld | Inhalt |
|---|---|
| saeule | `meinung` |
| format | `reelTitel`, 45 Sekunden; zweite Vorlage: Staffelplakat als `post` |
| idee | Jede Folge nimmt eine echte Entscheidung über einen Zeitpunkt und rechnet vor, was die Dauer wert war. Schnelle und geduldige Fälle wechseln sich ab, damit Warten nie wie Zögern klingt (Muster 5.2). |
| ablauf | 1. Stoff wählen, Klasse bestimmen, Freigabe prüfen (`oeffentlich` "ja"). 2. Die Dauer in ein bis drei Wörtern benennen. 3. Die Rechnung in drei Sätzen, jede Zahl mit Stand. 4. Ein Satz, wann das Gegenteil richtig gewesen wäre. 5. Endkarte mit dem Zeitmaß der Folge. Sitzend, ein Schnitt je Gedanke, keine Musik unter der Rechnung. |
| hookFormel | `[Dauer]. Was [das Warten | der schnelle Verkauf | die Zeit] [wem] [gebracht | erspart] hat.` Ohne Anrede, dritte Person. |
| rhythmus | `{tag: "Dienstag", kanal: ["linkedin", "instagram"], takt: "woechentlich"}`, 11 Uhr nach dem Termin; in Woche 1 Staffelplakat am Dienstag, Pilot am Donnerstag |
| variable | `{art: "dauer", was: "die Dauer der Entscheidung, als Spanne des Zeitmaßes", warum: "Das Zeitmaß macht Zeit sichtbar wie ein Plan den Raum (idee.zeichen.herleitung); hier ist es Hauptdarsteller."}` |
| bildaufbau | siehe Tabelle Bildaufbau |
| folioRegel | "Zeitwert 01" über der Linie rechts, rechtsbündig; Staffel im Caption-Fuß |
| Weitergeben | `{Schicken Sie|Schick} das an den Miterben, der es eilig hat.` (aus `einsicht.spannung` über `positionierung`: Miterben verschieden schnell) |
| reservefolge | "Wann Warten nichts bringt", Klasse W, Stoffquelle `positionierung.weil` (Schärfung aus Gate 1), am Drehtag 1 produziert |

**Staffeln.** 1 Erbe (`ausloeser` Rang 1), 2 Investment (`ausloeser` Rang 2), 3 Provision und Zeit (`hindernis`), 4 Lücke: setzt die Zwölf-Wochen-Auswertung aus dem Frageprotokoll.

**Sendeplan Staffel 1** (13 Folgen, wöchentlich; F12-2 liefert drei Fälle, Kapitel 4)

| Folge | Titel | Klasse | Stoffquelle |
|---|---|---|---|
| 01 Pilot | Zwei Jahre | F | b1 (Freigabe im Plan) |
| 02 | Eine Woche | W | Anlass Erbe: was Erben in der ersten Woche noch nicht entscheiden müssen, allgemein, keine Rechtsberatung |
| 03 | Elf Wochen | F | b2 (Freigabe im Plan) |
| 04 | [Fall A] | F | F12-2, danach Freigabe |
| 05 | Wenn Miterben verschieden schnell sind | W | `einsicht.spannung` über `positionierung` |
| 06 | Warum ich über Zeit spreche, bevor ich über Preise spreche | E | `workshop.geschichte.herkunft`: Großvater verwaltete Zinshäuser (Seed `aufgewachsen`) |
| 07 | [Fall B] | F | F12-2 |
| 08 | Wenn ein Mietvertrag ausläuft | W | Zinshaus, allgemein |
| 09 | [Fall C] | F | F12-2 |
| 10 | Was ein Schätzwert nach einem Jahr noch sagt | W | Arbeitsweise, allgemein |
| 11 | Wann Warten nichts bringt | W | `positionierung.weil` (zugleich Reservefolge) |
| 12 | Eine Woche nach der Verlassenschaft | W | Anlass Erbe, allgemein |
| 13 | [Praxisfrage aus Drehtag 2] | P | Frageprotokoll |

Klasse W: 6 von 13, genau an der Grenze. Mit Stoffquelle heute: 01, 02, 03, 05, 06, 08, 10, 11, 12, also 9; nach F12-2 12. Die frühere Folge "Was eine Eintragung über den Zeitpunkt sagt" ist gestrichen (3.14).

**Tragfähigkeit über zwölf Monate (Rechnung).**

| Größe | Wert | Herkunft |
|---|---|---|
| Folgen im Jahr | 52 (4 Staffeln zu 13) | Rhythmus wöchentlich |
| W höchstens | 24 (6 je Staffel) | Schwelle `wissensAnteil` |
| F plus P plus G plus E mindestens | 28 | 52 minus 24 |
| F im Jahr | Staffel 1: 5 (b1, b2, Fälle A bis C); Staffel 2 bis 4: Nachschub 14 mal 0,4 gleich 5,6, abgerundet 5, verteilt 2, 1, 2 | b5 als interner Arbeitswert, Freigabequote Setzung |
| E im Jahr | 2 (Herkunft; Wendepunkt ist Lücke) | `workshop.geschichte` |
| G im Jahr | 0 geplant, bis ein Partner schriftlich zusagt (Konzept Gegengelesen), dann 1 je Staffel | Lücke |
| P nötig | 28 minus 10 (F) minus 2 (E) minus 0 (G) gleich 16, davon Staffel 1: 1, Staffel 2 bis 4 je 5 | Rechnung |
| P verfügbar | Lücke; Frageprotokoll ab Drehtag 1; 5 je Staffel heißt knapp 2 je Drehtag | Messung ab Live-Tag |

Ergebnis: Staffel 1 trägt wöchentlich (nach F12-2 und Freigabe). Staffel 2 bis 4 tragen wöchentlich nur, wenn das Frageprotokoll mindestens 5 Praxisfragen je Staffel liefert oder ein Gast zusagt. Die Zwölf-Wochen-Auswertung zählt; liegt der Wert darunter, greift Rückfallstufe 1 ab Staffel 2 (zweiwöchentlich, 7 Folgen: 2 F, 1 E oder G, höchstens 3 W, mindestens 1 P), als neue Version mit neu gerechneten Säulen.

#### Die übrigen Serien (12.6)

Namensregel für diesen Makler, abgeleitet aus `idee.satz`: Jeder Serienname trägt ein Wort der Zeit oder ein Fachwort aus seiner Herkunft, das einen Zeitpunkt bezeichnet.

| Feld | Vor der Unterschrift | Stand Sievering | Verbüchert | Stichtag (Anlass) | Alteingesessen |
|---|---|---|---|---|---|
| saeule | `wissen` | `markt` | `beweise` | `markt` (übernimmt Plätze von Stand Sievering) | `persoenlich` |
| Name aus | seinem Versprechen "bevor Sie unterschreiben" | Kern-Grätzl; "Stand" ist der Punkt des Zeitmaßes | österreichischer Rechtsbegriff für die Eintragung ins Grundbuch | Fachwort aus Bewertung (Bewertungsstichtag), Herkunft Finanz und Recht | seinem Wort in `unity` |
| format | `karussell`, 7 Seiten; zweite Vorlage `post` "Detail" | `karussell`, 6 Seiten; zweite Vorlage `post` | `post`, Satzart Fläche | `post`; bei zweitem Objekt im Takt `karussell` | `reelTitel`, 30 bis 45 Sekunden; zweite Vorlage `post` |
| idee | Ein Dokument, das vor jeder Unterschrift auf dem Tisch liegt, offen erklärt, die Provision eingeschlossen. Die Detail-Vorlage zeigt ein Stück des Dokuments ohne Daten und ist die stoffunabhängige Sachvorlage | Eine Frage, die Eigentümer in Sievering gerade stellen, an einem Eingang des Grätzls, beantwortet mit einer Zahl aus `marktquelle` samt Quelle und Stand und seiner Einschätzung dazu; ohne Zahl keine Folge | Ein abgeschlossener Fall, erzählt erst nach der Eintragung, als Ablauf statt als Erfolgsmeldung; er spricht ungern über Erfolge (Seed `erfolge` 2) | Jedes eigene Haus in Vermarktung mit dem einen Satz, warum die Eigentümer jetzt verkaufen, nur mit ihrer Freigabe | Ein Ort in Döbling, Währing oder Hietzing, der länger da ist als jeder Verkauf |
| variable | `dokument`: das eine Dokument (Vermittlungsauftrag, Grundbuchauszug, Mietvertrag, Energieausweis) | `ort`: ein Eingang in Sievering, Tür, Tor oder Stiege, nie die ganze Fassade (anders als die Konvention in Fassade und Rendite, `positionierung.andersAls`) | `zahl`: die eine Kennzahl des Falls | `objektmerkmal`: ein Detail des Hauses, nie Hausnummer, Türschild, Klingel | `ort`: der Ort, an dem er sitzt |
| hookFormel | `[Dokument]: was {Sie|du} vor der Unterschrift wissen {sollten|solltest}.` | `[Frage] in Sievering. Stand [Monat].` | `[Kennzahl] in [Bezirk]. Was davor entschieden wurde.` | `[Haus, Bezirk]. Warum die Eigentümer jetzt verkaufen.` | `[Ort]. Älter als jeder Verkauf hier.` |
| rhythmus | Donnerstag zweimal je Takt (Karussell), Samstag ein- bis zweimal (Detail); LinkedIn und Instagram | Samstag zweimal je Takt; LinkedIn und Instagram | Samstag, höchstens einmal je Takt, nur mit freigegebenem Fall; Instagram und LinkedIn | ruhend, bis `objektflussMonat` und Rechte vorliegen; dann auf den Plätzen von Stand Sievering | Donnerstag zweimal je Takt (einmal Reel, einmal Einzelbild); Instagram |
| folioRegel, Zeitmaß | Punkt "Stand [Monat]" rechts; Kennung unter der Linie links | Punkt "Stand [Monat]" rechts; Kennung unter der Linie rechts | Spanne der Vermarktungsdauer; Kennung unter der Linie links; nie ein Eintragungsdatum, nur das Quartal | Punkt "Vermarktung seit [Monat]"; Kennung über der Linie rechts | Punkt "seit [Jahr]" rechts; Kennung über der Linie links |
| Beispiel 1 | Der Vermittlungsauftrag: Provision, Leistungen, Dauer. Lücke: Provisionssatz und Leistungen (Muster 5.7) | Was ein Zinshaus in Sievering heute bringt. Lücke: Zahl aus `marktquelle`, Quelle noch nicht eingetragen | "Plus 8 Prozent." Anlegerwohnung Währing, über der Erstschätzung (b3, Freigabe im Plan) | Lücke: erstes eigenes Haus aus dem Bestand-Import | Der Ruderverein. Lücke: Name; andere nur mit Einverständnis im Bild |
| Beispiel 2 | Der Grundbuchauszug: A-, B- und C-Blatt, was vor dem Verkauf zählt, allgemein erklärt | Wie lange Häuser in Sievering bis zum ersten Anbot brauchen. Lücke: Quelle | Lücke: Fall A aus F12-2 nach Freigabe | Lücke | Grinzing, wo er aufgewachsen ist; erzählt, nie das Elternhaus gezeigt |
| Beispiel 3 | Der Mietvertrag: befristet oder unbefristet, was das für den Zeitpunkt heißt; allgemein | Döbling gegen Währing, derselbe Haustyp. Lücke: Quelle | Altbau Hietzing: gesperrt, Diskretion war entscheidend | Lücke | Lücke: am Drehtag mit ihm festgelegt |
| Weitergeben | `{Schicken Sie|Schick} das an alle, die mit {Ihnen|dir} im Grundbuch stehen.` | `{Schicken Sie|Schick} das an den, der in {Ihrer|deiner} Familie das Haus in Sievering verwaltet.` | `{Schicken Sie|Schick} das an jemanden, der in [Bezirk des Falls] ein Haus hält und noch keinen ersten Preis hat.` | `{Schicken Sie|Schick} das an jemanden, der in [Grätzl des Hauses] ein [Art] sucht.` | `{Schicken Sie|Schick} das an jemanden, der [Ort] seit Jahrzehnten kennt.` |
| reservefolge | Detail "Der Energieausweis, Seite 1" (W, stoffunabhängig) | Ortsfolge "Ein Tor in der Sieveringer Straße" (W, ohne Zahl; nur für einen einzelnen Ausfall, nie im Dauerbetrieb) | keine eigene; der Platz geht an Stand Sievering oder die Detail-Vorlage | entfällt, Anlass-Serie | "Am Wasser" (E, nur wenn er den Verein zeigen will; sonst Lücke) |
| nachschub | W und P aus Arbeitsweise und Frageprotokoll; Erzeuger Drehtag | `markt`; Erzeuger `marktquelle`, heute "fehlt": **Nachschubprüfung nicht bestanden** | F; Erzeuger `beweise` (Schritt 7) und `verkauft12m`, Flussdeckel | eigenes Objekt; Erzeuger Import Schritt 1 | E aus `workshop.geschichte`; Erzeuger Drehtag |

Wo Stoff fehlt, steht der Arbeitsauftrag. Kein Satz in dieser Tabelle behauptet etwas, das nicht im Dossier steht.

**Stand Sievering und der zweite Kandidat der Säule `markt`.** Stand Sievering ist der erste Kandidat, weil nur eine Zahl mit Stand die Sachspalte über ein Ortsbild hinaushebt. Heute besteht er die Nachschubprüfung nicht, weil `marktquelle` keine Quelle trägt. Die Tabellen dieses Beispiels (Belegung, Probe-Folge, Kanalplan) zeigen Stand Sievering im Zustand nach der Eintragung, so wie die Belege im Zustand nach der Freigabe gezeigt werden. Ist bis 12.6 keine Quelle eingetragen, läuft auf denselben Plätzen der zweite Kandidat:

| Feld | Sprechstunde Sievering (zweiter Kandidat, `serienErsatz[0]`) |
|---|---|
| Name aus | Kern-Grätzl und einem Wort der Zeit; hält die Namensregel dieses Maklers. Lesart-Test offen (Risiko: klingt nach Arztpraxis) |
| idee | Eine Frage, die ein Eigentümer in Sievering diesen Monat gestellt hat, in allgemeiner Form nach 3.14, und seine Antwort in drei Sätzen, ausdrücklich als seine Einschätzung, ohne Marktzahl |
| variable, Vorlage, Plätze | wie Stand Sievering: `ort`, Bild auf der Linie, Eingang, Kennung unter der Linie rechts, Punkt "Stand [Monat]"; Samstag zweimal je Takt; Belegung, Grammatik und Formatmix bleiben unverändert |
| nachschub | P aus dem Frageprotokoll; Erzeuger Drehtag. Zwei Fragen je Takt nur für diese Serie, keine Frage in zwei Serien; zusammen mit Zeitwert (5 je Staffel) braucht das Protokoll rund vier Fragen je Drehtag. Erstes Protokoll am ersten Drehtag, bis dahin Lücke; gemessen ab Live-Tag (9.11) |
| Urteil | besteht die Nachschubprüfung (Erzeuger mit Rhythmus vorhanden), Menge bedingt. Liefert das Protokoll nach zwölf Wochen weniger als zwei Fragen je Takt nur für diese Serie, gehen die Plätze nach 3.4 an die Pflichtsäule |

Geht die Quelle später ein, kehrt Stand Sievering als neue Version auf dieselben Plätze zurück; Kennung und Folgenummern beginnen dann bei 01.

#### Bildaufbau je Serie in Pixeln (12.9, Empfehlung)

Werte in Pixeln des Formats. Post: 3:4-Fenster x 33,75 bis 1046,25, Rand und Zeitmaß-Zeile aus Schritt 10 (x 119, y 1231). Reel: Kachel y 240 bis 1680, Schnittmenge x 65 bis 1015, y 269 bis 1248; die Zeitmaß-Linie im Reel setzt dieser Schritt vorläufig auf y 1232 (Unterkante der Schnittmenge minus 16 px für die Endstriche), bis `system.zeichen.platz.reel` sie festlegt (Hinweis an Schritt 10). Kopfhöhen nach `bild.regeln.abstand`: halbnah 20 Prozent, nah 40 Prozent der Fensterhöhe (Post 270 und 540 px, Reel-Kachel 288 und 576 px), weit Person höchstens ein Viertel.

| Vorlage | Satzart | Einstellung | Blickachse | Platz | Waagrechte auf der Linie | Titel, Variable | Zeitmaß, Kennung |
|---|---|---|---|---|---|---|---|
| Zeitwert, Reel-Titelbild | vollflächig | halbnah, Kopf 288 px, Augenlinie y 680, Kopf oben rund y 536 | in die Kamera | Nasenachse x 540, Mitte | Tischkante y 1232 | die Dauer als Variable in der Kennzahl-Stufe ab 110 px, links x 119, Grundlinie y 1196, liegt auf der Tischfläche; kein weiterer Text | Spanne ab x 119; Kennung 32 px rechtsbündig x 961, Grundlinie y 1196 |
| Zeitwert, Staffelplakat | vollflächig | nah, Kopf 540 px, Augenlinie y 500 | in die Kamera | Nasenachse x 540 | Tischkante y 1231, Unterarme darauf | Serienname in der Kernsatz-Stufe (104 px), x 119, Grundlinie y 1180; Sendetag in Worten 47 px unter der Linie, y 1290 | Spanne der Staffel (13 Wochen); keine Folio-Zeile |
| Vor der Unterschrift, Karussell Seite 1 | Bild auf der Linie: Grund y 0 bis 400, Bild y 400 bis 1231 (61 Prozent) | nah, Kopf 540 px, Augenlinie y 690 | gesenkt auf das Dokument, nach rechts unten | Nasenachse x 388 (35 Prozent der Fensterbreite), links | Tischkante y 1231, Dokument rechts vor ihm, Mitte x 770, Unterkante auf der Tischkante | Titel höchstens acht Wörter, 104 px, zwei Zeilen, x 119, Grundlinien y 230 und 344 | Punkt "Stand" rechts; Kennung unter der Linie links, x 119, y 1290 |
| Vor der Unterschrift, Detail (Einzelbild) | Bild auf der Linie, Grund y 0 bis 420 | detail: ein Stück des Dokuments ohne Daten, Kopf des Formulars, Linierung, leeres Stempelfeld | keine | Dokumentkante senkrecht bei x 700 | Tischkante y 1231 | Name des Dokuments, 104 px, x 119, Grundlinie y 300 | Punkt "Stand" rechts; Kennung unter der Linie links |
| Stand Sievering, Karussell Seite 1 und Einzelbild | Bild auf der Linie, Grund y 0 bis 420 | detail: Eingang, Tür, Tor oder Stiege im Vormittagslicht | keine | Türachse bei x 700 | Schwelle oder Stufe y 1231 | Frage höchstens acht Wörter, 104 px, x 119, Grundlinien y 190 und 304 | Punkt "Stand [Monat]" rechts; Kennung unter der Linie rechts, rechtsbündig x 961 |
| Verbüchert | Fläche | flaeche | keine | Satz links auf x 119 | keine; das Zeitmaß ist die einzige Waagrechte | Kennzahl in der Kennzahl-Stufe, x 119, Grundlinie y 1080; Bezirk und Art 47 px, Grundlinie y 1170 | Spanne der Vermarktungsdauer; Kennung unter der Linie links |
| Stichtag | Bild auf der Linie, Grund y 0 bis 420 | detail: ein Detail des Hauses | keine | frei im Rahmen | Gesims, Fensterbank oder Sockel y 1231 | "[Haus, Bezirk]" 104 px, x 119, Grundlinie y 300 | Punkt "Vermarktung seit"; Kennung über der Linie rechts; Energiezeile 30 px fest unter der Linie, y 1285 |
| Alteingesessen, Reel-Titelbild | vollflächig | weit, Person höchstens 360 px hoch, sitzt auf Stufe, Mauer oder Bank | in den Ort, zur Bildmitte | Personenachse x 760, rechts | Stufe oder Mauerkrone y 1232 | der Ort in der Kernsatz-Stufe, x 119, Grundlinie y 1100 | Punkt "seit [Jahr]" rechts; Kennung über der Linie links, x 119, y 1196 |
| Alteingesessen, Einzelbild | vollflächig | weit, Person höchstens 338 px | in den Ort | Personenachse x 760 | y 1231 | Ort, 104 px, x 119, Grundlinie y 1120 | wie Reel |

Drei Gesicht-Serien ohne Kennung unterschieden: Zeitwert halbnah, mittig, Blick in die Kamera, eine große Dauer auf dem Tisch; Vor der Unterschrift nah, links, Blick auf ein Dokument, Titel oben auf Papier; Alteingesessen weit, rechts, im Ort. Über einen Takt: vier halbnah, zwei nah plus Plakat im Startmonat, zwei weit, also die Mischung halb, ein Viertel, ein Viertel aus `bild.regeln.abstand`. Skizzen: `muster/12_serien.html`. Echtes Material: Lücke bis zum Porträt-Termin aus Schritt 11; der Art Director setzt die Werte dann am Kontaktbogen und korrigiert die Augenlinien am echten Bild.

#### Formatmix (12.7)

Formate gern (Annahme), `k` fehlt, Zeit 2 bis 4 Stunden: Startwert 5 Reels, 4 Karussells, 3 Einzelbilder. Die Monatsbelegung erreicht 5, 3, 4: ein Karussell weniger, ein Einzelbild mehr, weil nach jedem Karussell der Pflichtsäule am Donnerstag ein Einzelbild stehen muss (Formatregel) und Stand Sievering sonst neben einem Karussell stünde. Innerhalb der Toleranz, vermerkt in `formatmix.herleitung`.

#### Monatsbelegung im Dauerbetrieb (12.8)

Takt 2 und folgende, Plätze 1 bis 12 je Takt:

| Platz | Tag | Serie, Vorlage | Format | Einstellung | Gegenton |
|---|---|---|---|---|---|
| 1 | Di | Zeitwert | reelTitel | halbnah | |
| 2 | Do | Vor der Unterschrift | karussell | nah | |
| 3 | Sa | Stand Sievering, Einzelbild; **Wechselplatz**: Stichtag, wenn ein Objekt da ist | post | detail | |
| 4 | Di | Zeitwert | reelTitel | halbnah | |
| 5 | Do | Alteingesessen | reelTitel | weit | |
| 6 | Sa | Vor der Unterschrift, Detail | post | detail | ja |
| 7 | Di | Zeitwert | reelTitel | halbnah | |
| 8 | Do | Vor der Unterschrift | karussell | nah | |
| 9 | Sa | **Wechselplatz**: Verbüchert, wenn ein freigegebener Fall frei ist; sonst Stand Sievering, Einzelbild | post | flaeche oder detail | |
| 10 | Di | Zeitwert | reelTitel | halbnah | |
| 11 | Do | Alteingesessen, Einzelbild | post | weit | |
| 12 | Sa | Stand Sievering, Karussell; **Wechselplatz**: Stichtag als Karussell beim zweiten Objekt im Takt | karussell | detail | ja |

Anteile gegen den Rhythmus, je Zustand (Ziel 3,6, 3,6, 2,4, 1,8, 0,6):

| Zustand | meinung | wissen | markt | persoenlich | beweise | Plätze | größte Abweichung |
|---|---|---|---|---|---|---|---|
| kein Objekt, Fall frei | 4 | 3 | 2 | 2 | 1 | 12 | 0,6 |
| kein Objekt, kein Fall frei | 4 | 3 | 3 | 2 | 0 | 12 | 0,6 |
| Objekt da, Fall frei | 4 | 3 | 2 (davon 1 Stichtag) | 2 | 1 | 12 | 0,6 |
| Objekt da, kein Fall frei | 4 | 3 | 3 (davon 1 Stichtag) | 2 | 0 | 12 | 0,6 |

In keinem Zustand bleibt ein Platz leer, keine Säule weicht um mehr als einen Beitrag ab. Die Sachspalte hängt an keinem fehlenden Stoff: Platz 6 ist immer die Detail-Vorlage; auf Platz 3, 9 und 12 läuft ohne eingetragene Marktquelle der zweite Kandidat Sprechstunde Sievering mit derselben Vorlage, die Ortsfolge ohne Zahl deckt nur einen einzelnen Ausfall. Formate 5, 3, 4. Nachbarn: keine gleichen Einstellungsgrößen, keine gleichen Formate außer Platz 4 und 5 (zwei Reels verschiedener Serien), keine gleiche Serie nebeneinander; Platz 12 zu Platz 1 des nächsten Takts wechselt Format und Einstellung.

**Beleg je Woche im Dauerbetrieb.** Vier Beleg-Beiträge je Takt, einer je Woche: Zeitwert erzählt einen Fall (F), Verbüchert auf Platz 9, oder eine Beleg-Seite der Karussells auf Platz 2, 8 oder 12 zeigt einen freigegebenen Beleg. Mit vier freigegebenen Belegen (Plan b1, b2, b3, b5) und der Regel "gezeigt höchstens einmal je Takt" geht das auf; mit weniger meldet die Prüfung die Woche als Lücke.

#### Probe-Folge im Startmonat (12.8)

Gegenton auf Platz 6 und 12, Wochentakt Dienstag Zeitwert, Donnerstag Gesicht, Samstag Sache. Belege nach dem Plan (b1, b2, b3, b5 freigegeben).

| Nr. | Woche, Tag | Serie, Folge | Format | Einstellung, Platz | Gesicht | Gegenton | textgeführt | Beleg |
|---|---|---|---|---|---|---|---|---|
| 1 | 1 Di (Live-Tag) | Zeitwert, Staffelplakat | post | nah, Mitte | ja | | | |
| 2 | 1 Do | Zeitwert 01, Zwei Jahre (Pilot) | reelTitel | halbnah, Mitte | ja | | | b1 erzählt |
| 3 | 1 Sa | Stand Sievering 01 | karussell | detail | | | | (Zahl aus `marktquelle` mit Stand; ohne Eintrag Sprechstunde Sievering 01) |
| 4 | 2 Di | Zeitwert 02, Eine Woche | reelTitel | halbnah, Mitte | ja | | | |
| 5 | 2 Do | Vor der Unterschrift 01, Der Vermittlungsauftrag | karussell | nah, links | ja | | | |
| 6 | 2 Sa | Verbüchert 01, Plus 8 Prozent | post | flaeche | | ja | ja | b3 erzählt |
| 7 | 3 Di | Zeitwert 03, Elf Wochen | reelTitel | halbnah, Mitte | ja | | | b2 erzählt |
| 8 | 3 Do | Alteingesessen 01 | reelTitel | weit, rechts | ja | | | |
| 9 | 3 Sa | Vor der Unterschrift, Detail 01, Der Grundbuchauszug | post | detail | | | | |
| 10 | 4 Di | Zeitwert 04, [Fall A] | reelTitel | halbnah, Mitte | ja | | | Fall A (Lücke bis Freigabe) |
| 11 | 4 Do | Vor der Unterschrift 02, Der Mietvertrag | karussell | nah, links | ja | | | b5 gezeigt (Beleg-Seite) |
| 12 | 4 Sa | Stand Sievering 02; bei eigenem Objekt Stichtag 01 | post | detail | | ja | | (bei Stichtag: eigenes Objekt) |

Profil nach Woche 4 (neuester Beitrag oben links):

| | links | Mitte | rechts |
|---|---|---|---|
| Zeile 1 | 12 Stand Sievering 02, dunkel | 11 Vor der Unterschrift 02 | 10 Zeitwert 04 |
| Zeile 2 | 9 Detail Grundbuchauszug | 8 Alteingesessen 01 | 7 Zeitwert 03 |
| Zeile 3 | 6 Verbüchert 01, dunkel | 5 Vor der Unterschrift 01 | 4 Zeitwert 02 |
| Zeile 4 | 3 Stand Sievering 01 | 2 Zeitwert 01 (Pilot) | 1 Staffelplakat |

Die rechte Spalte ist die Sendung, halbnah übereinander, die Spannen im Zeitmaß verschieden lang (zwei Jahre, eine Woche, elf Wochen, Fall A). Die mittlere zeigt ihn nah und weit, die linke die Sachen, hell und dunkel im Wechsel wie eine Messlatte.

**Prüfung der Probe-Folge.**

| Regel | Ergebnis |
|---|---|
| Gesicht | 8 von 12; jedes Fenster hat genau zwei |
| Gegenton | Platz 6 und 12, beide auf dem Sachplatz mit sichtbarem Grund (Fläche, Grund oben); Abstand 6; im Ruhebild Zeile 1 und 3 |
| Textgeführt | nur Platz 6 |
| Einstellungsgröße | nah, halbnah, detail, halbnah, nah, flaeche, halbnah, weit, detail, halbnah, nah, detail; nie zwei gleiche nebeneinander, auch nicht 12 zu 13 (halbnah) |
| Format | post, reel, karussell, reel, karussell, post, reel, reel, post, reel, karussell, post: nur 7 und 8 zwei Reels verschiedener Serien; 5 Reels, 3 Karussells, 4 Einzelbilder |
| Serie nebeneinander | nur 1 und 2 (Plakat neben Folge 01, erlaubt) |
| Beleg je Woche (Pflicht) | Woche 1 b1, Woche 2 b3, Woche 3 b2, Woche 4 b5: bestanden im Plan. **Heute (alle Belege offen): kein Beleg in keiner Woche, Prüfung rot, Lücke an Schritt 13 und Aufgabe Freigabe mit Frist 7 Werktage vor dem Reveal** |
| Beleg je Fenster (Meldung) | Fenster 3 bis 5 ohne Beleg; Fenster 8 bis 10 ohne Beleg, bis Fall A freigegeben ist. Beide sichtbar gemeldet |
| Verschiebung um 1 und 2 | besteht für alle Pflichtregeln |
| Pflichtsäule | 3 von 12 (5, 9, 11), 25 Prozent |
| Kompetenz vor Persönlichem | erste persönliche Folge in Woche 3 |
| Anteile im Startmonat | meinung 5 (+1,4, im Startmonat bis +2 erlaubt), wissen 3, markt 2, persoenlich 1, beweise 1 |
| Belegwiederholung | b1, b2, b3 je einmal erzählt, b5 einmal gezeigt; kein Beleg zweimal in einer Serie |

#### Vorlage Zeitwert, Reel-Titelbild (12.9)

| Feld | Sperrstufe | Token | Offen | Grenzen |
|---|---|---|---|---|
| Porträt | rahmen | `bauteil.portraet` | Datei aus `bild.kontaktbogen`, Rolle `gesicht`, halbnah sitzend | Augenlinie y 680, Nasenachse x 540, Tischkante y 1232, Kopf nie über y 269 |
| Zeitmaß | fest | `bauteil.zeichen` | nur der Datenwert (Dauer) | Platz aus `system.zeichen.platz.reel`; ohne Beleg Punkt mit Stand |
| Dauer (Variable) | stil | `rolle.typo.kennzahl` | ein bis drei Wörter | ab 110 px, Tabellenziffern, keine Kürzung |
| Kennung | stil | `bauteil.folio` | automatisch | 32 px, über der Linie rechts |
| Grund | fest | `rolle.farbe.grund` | nichts | Gegenton nie auf Porträtkacheln |
| Untertitel im Video | stil | `rolle.typo.fliesstext` | automatisch | im Band über dem Zeitmaß, innerhalb der Schnittmenge |
| Endkarte | fest | `bauteil.endkarte` | nichts | Wortmarke gestapelt, Claim, Zeitmaß der Folge (Code Serienformat) |

Stresstest: "Zweieinhalb Jahre" und "1 Tag", "Die Zeit daneben 12" als längste Kennung, fehlendes Porträt, Beleg "offen" (Folge gesperrt). Codes: Zeitmaß und Porträtstil. Bis zum Porträt-Termin entsteht das Titelbild aus einem Standbild im 9:16-Ausschnitt desselben Originals (Schritt 11).

#### Vorlage Vor der Unterschrift, Karussell (12.9)

| Seite, Rolle | Felder und Stufen | Codes |
|---|---|---|
| 1 Versprechen | Grund oben (fest, Papier), Porträt nah links (rahmen), Dokument rechts (rahmen, die Variable, fester Platz), Titel (stil, höchstens acht Wörter, 104 px), Zeitmaß als Punkt (fest), Kennung unter der Linie links (stil, automatisch) | Porträtstil, Zeitmaß |
| 2 Einlösung | ein Satz (stil, bis 25 Wörter, 48 px), Fläche (fest) | Zeitmaß, Kennung |
| 3 bis 5 Schritte | Detail des Dokuments ohne Daten (rahmen), ein Satz (stil) | Zeitmaß, Porträtstil (Waagrechte) |
| 6 Beleg | Beleg-Zeile mit `belegRef` (nur "ja") oder Zahl mit Quelle und Stand (stil), Zeitmaß mit Dauer oder Stand (fest) | Zeitmaß, Serienformat |
| 7 Weitergeben | Satz (stil, `{Schicken Sie|Schick} das an alle, die mit {Ihnen|dir} im Grundbuch stehen.`), Zeitmaß (fest) | Zeitmaß, Serienformat |

#### Kanalplan (12.10)

| Kanal | rolle | anrede | formate | frequenz | serien |
|---|---|---|---|---|---|
| LinkedIn | Fachautorität für Empfehler aus Notariat und Steuerberatung und für Anleger | `hmAnrede("markus", "linkedin")`, heute Sie | natives Video, mehrseitiges Dokument | rund zwei je Woche (8 je Takt) | Zeitwert, Vor der Unterschrift, Stand Sievering, Verbüchert |
| Instagram | Profil, das eine Empfehlung in fünf Sekunden bestätigt | `hmAnrede("markus", "instagram")`, heute Sie | Reel, Karussell, Einzelbild, Story | drei Rasterbeiträge je Woche | alle, Stichtag wenn aktiv |
| Facebook | Lücke: Zustand offen; höchstens Spiegel ohne eigene Produktion | | | | |

Die Formulierung "dem Notare vertrauen" erscheint in keinem öffentlichen Text, bis weitere Fälle belegt sind (`07_positionierung.md`, Rolle).

#### Konzepte (12.10)

| Konzept | Idee | Warum | Umsetzung | Kanal |
|---|---|---|---|---|
| Staffel 1: die ersten 30 Tage | Der erste Monat ist der Anfang der ersten Staffel: Plakat, Pilot, dann Woche für Woche eine Folge, dazwischen Arbeitsweise und Belege | Kompetenz vor Persönlichem; feste Folge statt Einzelposts (R5 Prinzip 2); erst nach innen, dann öffentlich (Zerlegung G15) | 1. Umfeld sieht Plakat und Pilot vor dem Live-Tag (`rollout.umfeld`). 2. Live-Tag: Profilbild aus `bild.portraet`, Bio aus `botschaften`, Plakat. 3. Wochen 1 bis 4 nach der Probe-Folge. 4. Tag 30: Rückblick mit Weiterleitungen und Saves je Reichweite und Anfragen mit Anlass Erbe | Instagram, LinkedIn |
| Zeitwert als Sendung | Staffel je Quartal: Erbe, Investment, Provision und Zeit, Staffel 4 aus dem Frageprotokoll | Konstante plus eine Variable (Pentagram); Stabilität macht Personenmarken authentisch (https://doi.org/10.1002/mar.20771) | Themenvorrat vor Staffelstart, vier bis fünf Folgen je Drehtag, Frageprotokoll je Drehtag, Plakat je Staffel, Auswertung nach zwölf Wochen mit Prüfung der Rückfallstufe | LinkedIn, Instagram |
| Gegengelesen | Einmal je Staffel eine Zeitwert-Folge der Klasse G, in der ein Notariat oder eine Steuerberatung seine Rechnung gegenliest | Der Zinshaus-Abschluss in der Sieveringer Straße kam über den Notar (Seed `abschluesse`); Empfehlung ist der häufigste Weg zum Makler (USA, https://nowbam.com/how-home-buyers-and-sellers-find-their-agents-in-2025/) | 1. Partner anfragen (Lücke). 2. Klären, ob und wie der Partner auftreten darf (Sache des Partners). 3. Eine Frage, seine Rechnung, der Gast liest gegen. 4. Nur mit schriftlichem Einverständnis | LinkedIn, Instagram |

#### Was im Beispiel offen bleibt

Kamera-Komfort, Objektfluss, `verkauft12m` und Energiewerte (Bestand-Import), Freigaben und Unterlagen für b1, b2, b3, b5, drei Fälle aus F12-2, Quelle in `marktquelle` für Stand Sievering (Erzeuger steht, 3.4; ohne Eintrag läuft Sprechstunde Sievering), Praxisfragen je Drehtag, Partner für Gegengelesen, Provisionssatz und Leistungen, Rechte an den 15 Porträts und der Porträt-Termin, Name des Rudervereins, Zustand Facebook, Staffelthema 4.

---

## 4. Fragen an den Makler

Dieser Schritt hat keinen Termin und stellt keine Frage zu Gestaltung, Formaten oder Säulen. Es gibt eine Wahl und eine bedingte Aufgabe.

| Nr. | Frage | Wann und wo | Wirkt auf | Warum sie den Output verändert |
|---|---|---|---|---|
| F12-1 | "Wie soll {Ihre|deine} Sendung heißen: [Empfehlung] oder [Alternative]? Wir empfehlen [Empfehlung], weil [zwei Sätze aus seinen Antworten]." Bei Markus: Zeitwert oder Die Zeit daneben | In der Rückmeldung am Tag nach dem Reveal (Schritt 15, `rueckmeldung.serienname`), eine Wahl zwischen zwei, eine markiert | `serieSignatur.gewaehlt`, damit `serien[signatur].name`, jede Kennung, das Plakat, die Vorlagen der Serie, Kanalplan, Markenbuch | Der Name ist das Element der Sendung, das er selbst ausspricht. Probe: Wahl tauschen, und Kennung, Plakat und Sendeplan ändern sich, sonst nichts. Wählt er keinen, gilt die Empfehlung; lehnt er beide ab, setzt er einen Pin der Art Änderung, und das Team schlägt in Runde 2 einen dritten vor |
| F12-2 | Allgemeine Form, gebildet aus `variable.art` der Signatur: `dauer` "Nennen {Sie|du} drei Entscheidungen über den Zeitpunkt aus den letzten zwölf Monaten, bei denen {Sie|du} zu- oder abgeraten {haben|hast}."; `ort` "drei Fälle in [Grätzl]"; `dokument` "drei Fälle, in denen ein Dokument den Ausschlag gab"; `zahl` "drei Fälle mit einer Zahl, die {Sie|du} belegen {können|kannst}"; übrige Arten analog aus `variable.was`. Dazu: "Zwei Sätze je Fall genügen, gern gesprochen. Dauer rund zehn Minuten. Danach ergänzen wir {Ihren|deinen} Sendeplan und fragen je Fall, ob er öffentlich werden darf." | **Stufe 1 im Workshop:** Liegen am Ende des Workshops weniger als vier eigene Fälle mit Entscheidung, Zahl und Zeitraum vor (Vorprüfung 12.0), steht die allgemeine Fassung ("drei Entscheidungen mit Zahl und Zeitraum") als `workshop.aufgaben`-Eintrag mit Frist bis zum Richtungstermin. **Stufe 2, nur wenn Stufe 1 nicht reicht:** nach der Wahl der Signatur einmal die spezielle Fassung als Nachricht des Teams, nie als Formular, spätestens 15 Werktage vor dem Reveal. Bei Markus: Stufe 1 (zwei Fälle mit Zahl liegen vor, b1 und b2) | `serieSignatur.themenvorrat`, `tragfaehigkeit`, `serien[signatur].beispiele`; die Antwort geht als Nachtrag in `workshop.geschichte.belege` und von dort als Selbstauskunft in `beweise` (Schritt 7, neue Version der Belegliste mit `oeffentlich` offen, Freigabe getrennt) | Ohne mindestens vier eigene Fälle ist Staffel 1 eine Reihe von Wissensfolgen, die auf jeden Makler passt, und die Schwelle von zwölf Titeln wird nicht erreicht. Die Antwort entscheidet, ob Zeitwert wöchentlich startet oder Rückfallstufe 1 greift |

**Was abgeleitet wird statt gefragt.**

| Was man fragen könnte | Warum nicht | Woher es kommt |
|---|---|---|
| Wie oft können Sie vor die Kamera? | Selbstauskunft misst das Selbstbild | `workshop.probedreh.komfort`, `antworten.formate` |
| An welchen Tagen posten wir? | liegt als fester Termin vor | `antworten.cue`, Wochentakt |
| Welche Kanäle? | schon gefragt | `antworten.kanaele`, `empfehler`, `ziel` |
| Worüber wollen Sie sprechen? | steht in Fällen und Anlässen | `beweise`, `ausloeser`, `hindernis`, `positionierung` |
| Welches Thema je Staffel? | Verfahren aus Anlässen und Frageprotokoll | 3.5 |
| Welche Säulen, welche Anteile? | rechnet die Regel | 3.3 |
| Wie viele Objekte im Monat? | gehört in den Import | `vorab.kennzahlen.objektflussMonat`, sonst Lücke an Schritt 1 |
| Dürfen wir Ihre Objekte zeigen? | im Inventar | `vorab.material[].rechte` |
| Darf dieser Fall öffentlich werden? | wird in Schritt 4 und 7 geklärt | `zitate[].oeffentlich`, `beweise[].oeffentlich` |
| Was ist privat? | schon gefragt | `antworten.grenzen` |
| Du oder Sie? | eine Funktion aus Schritt 8 | `anrede` |
| Welche Fragen hören Sie im Erstgespräch? | nicht als Formular, sondern fünf Minuten am Drehtag, weil es den laufenden Nachschub erzeugt | Frageprotokoll (3.14) |
| Wie sollen die anderen Serien heißen? | eine Wahl je Schritt reicht, die Sendung ist die wichtigste | Team, Namensregel |
| Gefällt Ihnen der Feed? | nie; die Rückmeldung läuft entlang des Vertrags | Schritt 15 `rueckmeldung.jeKriterium` |

---

## 5. Eingang und Ausgang

### 5.1 Eingang

| Feld | Von | Wofür |
|---|---|---|
| `positionierung` (`satz`, `fuerWen`, `was`, `andersAls`, `weil`, dazu `nichtFuer`, `weilBelege`) | 7 | Signatur-Säule, `frage`, Weitergeben-Empfänger, Variable anders als die Konvention |
| `beweise[]` (`id`, `behauptung`, `beleg`, `quelle`, `pruefstatus`, `unterlage`, `oeffentlich` ja, nein, offen) | 7 | Stoffwert und Flussdeckel `beweise`, `belegRef`, Themenvorrat; nur "ja" ist veröffentlichbar |
| `markenvertrag` (`leitidee`, `attribute`, `falschWaere`, `erfolgsmass`) | 7 | Sprachprüfung, Blick des CD, Konzepte |
| `stimme` (`regler`, `verbindlich`, `ermessen`, `sagen`, `vermeiden`, `beispiele`, `eigeneWorte`) | 8 | Namen, Hooks, Sprachprüfung |
| `anrede` | 8 | Kanalplan, alle Platzhalter |
| `botschaften.claim` | 8 | Endkarte, Namensregel |
| `idee.codes` | 9 | Codes-Prüfung, Signatur als Serienformat |
| `system.tokens`, `system.raster`, `system.zeichen`, `system.sperrstufen`, `system.festUndVariabel` | 10 | Vorlagenfelder, Gegenton, sichere Zonen, Platz von Zeichen und Kennung, Stufen, Staffeln |
| `bild.regeln` (`abstand`, `reihung`, `ausschnitt`), `bild.portraet` | 11 | Einstellungsgrößen, Nachbarregel, Bildaufbau, Plakat |
| `antworten.zeit`, `formate`, `kanaele`, `cue`, `ausloeser`, `ziel`, `empfehler`, `grenzen` | 2 | Säulen, Formatmix, Kanalplan, Sendetag, Staffelthemen, Konzepte |
| `workshop.probedreh` | 4 | Komfort, Format der Signatur |
| `vorab.kennzahlen` (`objektflussMonat`, `verkauft12m`), `vorab.material` | 1 | Anlass-Serie, Flussdeckel, Tragfähigkeit, Bildrechte |

**Abweichungen im Eingang, begründet.**

| Neu | Von | Warum | Folge für die Zerlegung |
|---|---|---|---|
| `territorien` des gewählten Wegs (`serienIdee`) | 6 | Der Makler hat die Serienidee im Richtungstermin gesehen; ohne sie bricht die Kette dort, wo er zuerst "Das bin ich" gesagt hat | 6 bekommt 12 als Nachfolger, 12 bekommt 6 als Vorgänger |
| `idee.satz`, `idee.zeichen`, `brief.verbote` | 9 | Namensregel und Variable brauchen die Idee; die Verbote gelten auch für Namen und Hooks | keine, 9 ist Vorgänger |
| `system.gegenentwurf` | 10 | Vorlagen je `variante`, weil Schritt 13 dieselben Inhalte im Gegenentwurf zeigt (Hinweis aus `13_feed.md` 7.3) | keine, 10 ist Vorgänger |
| `bild.kontaktbogen` | 11 | Bildaufbau am echten Material, Einstellungsgrößen je Datei | keine, 11 ist Vorgänger |
| `antworten.hindernis`, `antworten.unity`, `antworten.faelle`, `antworten.abgeraten` | 2 | `frage` der Pflichtsäule, Persönlich-Serie, Vorprüfung 12.0 | keine, 2 ist Vorgänger |
| `workshop.geschichte`, `workshop.zitate`, `workshop.aufgaben` | 4 | Folgenklasse E, Vorprüfung, Stand der Freigabe-Aufgaben | keine, 4 ist Vorgänger |
| Kohorte: Seriennamen, Hook-Formeln, Weitergeben-Sätze, Bildaufbau-Merkmale, Gebiet und Akzent der anderen UNIO-Makler | extern (Store) | Kohortenprüfung (Zerlegung G16) | wie in Schritt 6, 9 und 14 extern geführt |

Nicht als Eingang genommen: `einsicht` aus Schritt 5; was davon zählt, steht in `positionierung`.

### 5.2 Ausgang

| Feld | Struktur | Abnehmer |
|---|---|---|
| `saeulen[4 bis 5]` | `{id, name, zweck, zweckArt (intern), frage, anteil, herleitung[] {schritt, wert, quelle}}` | 13 (`start30`), 14 |
| `serien[]` | `{id, name, idee, saeule, format, ablauf[], hookFormel, rhythmus {tag, kanal[], takt}, variable {art (Enum), was, warum}, bildaufbau[] {vorlage, satzart, einstellung, blick, platzX, waagrechteY, gesicht, fuehrung}, folioRegel {zeitmassForm, kennungPlatz}, beispiele[3] {titel, hook, skizze, klasse, belegRef, luecke}, themenvorrat[] {titel, klasse, stoffquelle, belegRef}, reservefolge {titel, klasse, stoffquelle, belegRef, fertigAm}, nachschub {quelle, erzeuger, rhythmus, status}, weitergeben, anlass {art, aktiv, grund, saeule}}` | 13, 14 |
| `serienErsatz[]` | wie `serien[]`, dazu `rang` und `fuerSerie`; läuft erst, wenn die Serie davor die Nachschubprüfung nicht besteht | intern; 13 und 14 lesen nur die laufende Serie aus `serien[]` |
| `marktquelle` | `{bezug, quellen[] {name, url, stand, kennzahl, ebene, methodik}, verantwortlich (Rolle), rhythmus, geprueftAm, naechstePruefung, status}` | 13 (Zahlen der Markt-Serie in `feed` und `start30`), 17 (Pflege je Takt im `monatsplan`) |
| `serieSignatur` | `{serieId, namen[2] {name, achse, warum, risiko, gegenmittel}, empfehlung, gewaehlt, kandidaten[3] {name, idee, variable, stoffquelle, risiko, urteil}, tragfaehigkeit {folgenVorrat, wissensAnteil, eigeneFaelle, jahresrechnung, nachschub, objektUnabhaengig, maklerMinutenMonat, drehbar, komfortPasst, rueckfallStufe, ok}, staffeln[4] {nr, thema, quelle, festAm}, plakatVorlage}`; `gewaehlt` bleibt leer bis Schritt 15 | 13, 14 (Kapitel Serien, Reveal-Seite über `praesentation.entwurf`) |
| `vorlagen[]` | `{id, serie, variante empfehlung oder gegenentwurf, format post, karussell, reelTitel oder story, satzart, seiten[] {rolle, felder[]}, felder[] {name, sperrstufe, token, maxWoerter, minPx, quelle, offen, x, y}, codes[], stresstest[] {fall, ergebnis, messwert}}` | 13 (Renderer), 14 |
| `karussellRollen` | `[{rolle, seite, regel, maxWoerter, minPx}]` für Versprechen, Einlösung, Schritte, Beleg, Weitergeben | 13, 14 |
| `grammatik` | `{takt 12, gesichtPeriode 3, tonwertPeriode {periode 6, phase, nurSachplatz, satzarten[]}, textfuehrung {periode 6, nurSachplatz, satzart flaeche}, einstellung {klassen[], nachbarPlus1 verschieden}, serieNachbar {plus1 verboten, ausnahme plakat}, nachbarn {plus1[], plus3[]}, fenster {laenge 3, gesicht 2, gegenton 1, belegMeldung}, belegJeWoche 1, wochentakt[3] {tag, klasse}, minTextKachelPx 92, minTextBeitragPx 30, minFliesstextPx 47, sichereZonenPost, sichereZonenReel {oben, unten, seite, kachel, schnittmenge, quelle, hinweis}, reserve, umordnen, angepinnt}` | 13 (`feed.pruefung`), 14 |
| `belegung` | `{plaetze[12] {tag, klasse, serie, vorlage, wechsel[] {bedingung, serie}}, zustaende[4] {name, jeSaeule, leer, maxAbweichung, ok}}` | 13, 14; Schritt 17 plant daraus |
| `formatmix` | `{reel, karussell, post, toleranz, herleitung[]}` | 13, 14; Schritt 11 rechnet `bild.luecken` vorläufig mit dem Startwert |
| `codesPruefung` | `{regel, codes[], jeVorlage[] {vorlage, seite, codes[], ok}}` | 13, 14 |
| `kanalplan` | `{<kanal>: {rolle, anrede, formate[], frequenz, serien[]}}` | 13, 14 |
| `konzepte[3]` | `{name, idee, warum, umsetzung[], kanal}` | 13 (`start30`), 14 |
| `sprachpruefung` | `{hart[], objektWort {regel, ersatz[]}, weich[], marke[], vertrag[], anrede, form[], geltung[], ausnahmen[]}` | 13, 14 (`qualitaet.klischees`) |
| `objektRegel` | `{gilt[], energie {neu [HWB, Endenergiebedarf, Klasse], alt [HWB, fGEE]}, orte [bild, caption], preisFlaeche caption, quelle, sperre, nurEigene, quellen[]}` | 13, 14 |

**Abweichungen im Ausgang, begründet.**
- `saeulen[].herleitung`, `zweckArt`: ohne Herleitung ist Leitfrage 3 nicht prüfbar; `zweckArt` bleibt intern und trennt die allgemeine Säulenbeschreibung vom makerspezifischen `zweck`.
- `serien[].id`, `themenvorrat`, `reservefolge`, `anlass`, `weitergeben`: Verweise, Tragfähigkeit, Ausfall-Takt, ruhende Anlass-Serie, Karussell-Schluss.
- `serien[].bildaufbau` je Vorlage mit `gesicht` und `fuehrung`: verlangt Schritt 13 (Hinweis 7.4 in `13_feed.md`).
- `serieSignatur.staffeln`, `rueckfallStufe`, `namen[].risiko`: Staffelthema mit Verfahren, Tragfähigkeit im Jahr, Konnotation.
- `vorlagen[].variante`, `satzart`, Feldkoordinaten: Gegenentwurf und Bildaufbau in Pixeln.
- `belegung`: macht die Einhaltung der Anteile in jedem Zustand prüfbar und gibt Schritt 17 die Plätze.
- `serien[].nachschub`, `serienErsatz[]`, `marktquelle`: Die Sachspalte des Wochentakts hing an Marktzahlen, die kein Schritt erzeugt. Dieser Schritt legt den Erzeuger selbst fest (Feld, Rolle, Quelle mit URL und Stand, Rhythmus), statt Schritt 1 einen neuen Import aufzuerlegen, weil Marktdaten keine Kennzahl des Maklers sind und je Takt gepflegt werden müssen. Ohne Erzeuger besteht keine Serie die Nachschubprüfung.

**Hinweise an Nachbarschritte (keine Änderung dieses Vertrags).**
1. **Schritt 13.** Das Beispiel in `13_feed.md` 3.x arbeitet mit Annahmen vor diesem Schritt: Serien "Noch nicht verkaufen", "Sievering in Zahlen", "Der Dienstag", "Ihre Frage", "Ein Haus", Formatmix 4, 5, 3 und getrennte Säulen "Wie ich arbeite" und "Wissen". Gilt jetzt: Serien und Probe-Folge aus 3.16, Formatmix 5, 3, 4 in der Belegung (Startwert 5, 4, 3), `wissen` gleich "Wie ich arbeite" als eine Säule. "Der Dienstag" leitet sich aus dem Grundbuch-Termin ab und ist die verworfene Schablone `HM_PF_FIGUR.kenner.signatur`. Belege nur mit `oeffentlich` "ja". Schritt 13 beginnt erst, wenn `serieSignatur.tragfaehigkeit.folgenVorrat` mindestens 12 ist. H3 ("formatmix wird genau erreicht") sollte die Toleranz aus 3.6 lesen.
2. **Schritt 11.** Die Augenlinie y 787 im Markus-Beispiel (`11_bild.md` Zeile 171 und 248) stammt aus der Arbeitsannahme "Die Frist" (Linie bei 38 Prozent), nicht aus "Das Zeitmaß" an der Unterkante. Die Reihung "nie zwei gleiche Einstellungsgrößen in Folge" führt dieser Schritt als Nachbarregel. Der Fotobrief braucht je Serie die Motive dieses Schritts: halbnah frontal am Tisch (Zeitwert), nah am Tisch mit Dokument, Blick gesenkt (Vor der Unterschrift, zwei Motive je Monat), weit am Ort (Alteingesessen), Details von Dokumenten und Eingängen; dazu fünf Minuten Frageprotokoll im Drehtag-Ablauf.
3. **Schritt 10.** `10_system.md` Zeile 372 setzt "eine dunkle Kachel je Zeile nach Grammatik". Dieser Schritt setzt den Gegenton auf jeden zweiten Sachplatz (zwei von zwölf, im Ruhebild jede zweite Zeile), weil er auf Porträtkacheln unsichtbar ist und eine dunkle Kachel je Zeile die Sachspalte ganz dunkel machte. Vorschlag für die Tabelle: "Gegenton auf jedem zweiten Sachplatz nach Grammatik, nur auf sichtbarem Grund." Außerdem fehlt `system.zeichen.platz.reel` (hier vorläufig y 1232) und eine Regel für die vier Kennungsplätze.
4. **Schritt 4.** `workshop.aufgaben[].art` braucht den Wert `fall` für die Stufe 1 von F12-2; die Vorprüfung 12.0 liest am Ende des Workshops.
5. **Schritt 14** sollte zusätzlich `grammatik`, `belegung`, `formatmix`, `kanalplan`, `sprachpruefung`, `objektRegel`, `codesPruefung` lesen, damit sie vollständig in die Quelle von Schritt 16 kommen.
6. **Schritt 1** (D2) ergänzt `hwb`, `fgee`, `klasse`; für die Objekt-Regel fehlt der Endenergiebedarf (`endenergie`).
7. **Schritt 15** schreibt `rueckmeldung.serienname`; Schritt 16 überträgt ihn in `serieSignatur.gewaehlt`.
8. **Schritt 17** misst die Minutenwerte der Wochenrechnung, zählt Praxisfragen je Staffel und entscheidet nach zwölf Wochen über Rückfallstufe 1 und Staffelthema 4.
9. **Werte aus Fassung 3, einmal zu übernehmen (Kettenprüfung).** Verbindlich sind: Gegenton mit Periode 6 nur auf dem Sachplatz, also 2 von 12 Kacheln, 10 im Grundton (`grammatik.tonwertPeriode`); Signatur Zeitwert, Alternative Die Zeit daneben; übrige Serien Vor der Unterschrift, Stand Sievering (ohne Marktquelle Sprechstunde Sievering), Verbüchert, Stichtag (Anlass-Serie, ersetzt "Warum jetzt"), Alteingesessen. "Nach dem Grundbuch", "Warum jetzt", "Noch nicht verkaufen", "Sievering in Zahlen", "Der Dienstag", "Ihre Frage" und "Ein Haus" sind gestrichen und dürfen in keinem Nachbarschritt mehr als Name, Option oder Beispiel stehen. Im Einzelnen:
   - **Schritt 10:** `proportion.feed` 10 zu 2 statt 9 zu 3, `tonwertPeriode` 6 statt 4, Gegenton nur auf dem Sachplatz mit sichtbarem Grund.
   - **Schritt 14:** Stand-Tabelle in 5.x mit den Seriennamen oben und Gegenton 2 von 12; "Nach dem Grundbuch" und "Warum jetzt" streichen.
   - **Schritt 15:** Namenswahl `rueckmeldung.serienname` zwischen Zeitwert und Die Zeit daneben, Zeitwert markiert; der Auswahlknopf "Nach dem Grundbuch" entfällt. Ein dritter Name kommt nur über einen Pin der Art Änderung und durchläuft die Namensregel (3.4).
   - **Schritt 16:** Beispiel mit zwei dunklen Kacheln auf Sachplätzen, nicht drei hellen.
   - **Schritt 17:** Das Beispiel eines Namenswunschs wird so gefasst, dass "Nach dem Grundbuch" an der Namensregel scheitert (Schablonen-Wortgruppe, Selbsttest 10) und mit Begründung abgelehnt wird, nicht als große Version durchgeht. Die Marktquelle ist keine Lücke mehr ohne Erzeuger: 17 pflegt `marktquelle` je Takt (Wochenrechnung 3.15).
   - **Schritt 13:** liest Zahlen der Markt-Serie nur aus `marktquelle`; steht dort nichts, plant 13 Sprechstunde Sievering auf denselben Plätzen statt einer Lückenkachel.

---

## 6. Qualitätsprüfung im Schritt

| Nr. | Prüfung | Wer | Grenze | Selbsttest |
|---|---|---|---|---|
| Q1 | Säulen: vier oder fünf, Summe 100, `wissen` mindestens 15, jede 10 bis 40 außer Flussdeckel-Säule, jede mit `herleitung`, `zweck`, `frage` (oder Lücke) und genau einer laufenden Serie; Belegung trifft jeden Anteil auf einen Beitrag genau in allen vier Zuständen, kein Platz leer | Regel | alle erfüllt | ja |
| Q2 | Anteil-Probe: Positionierung, Komfort, Zeit oder Nachschub tauschen, Anteile ändern sich | Regel | mindestens eine Änderung je Tausch | ja |
| Q3 | Name: Eigenname, höchstens drei Wörter, nicht Gattungsliste, nicht Claim, keine Schablonen-Wortgruppe, Verbote und Sprachprüfung sauber, Lesart-Test eingetragen | Regel, Team | null Funde | ja, außer Lesart-Test |
| Q4 | Kohorte: Seriennamen, Signatur-Variable, Hook-Formeln und Weitergeben-Sätze gegen alle UNIO-Makler (Trigramm-Schwelle aus MARKENQUALITAET); Bildaufbau: kein anderer Makler im selben Bezirk mit gleicher Einstellungsgröße, Blickachse und Platz der Signatur und gleicher Akzentfamilie | Regel meldet, CD entscheidet | unter der Schwelle | ja für die Meldung |
| Q5 | Variable genau eine mit `warum` und Bezug zur Idee; Gesicht-Serien unterscheiden sich in der Einstellungsgröße und in mindestens einem weiteren Merkmal | Regel, CD für den Bezug | genau eine; Unterschied vorhanden | teilweise |
| Q6 | Tragfähigkeit nach 3.5 inklusive Jahresrechnung und fertiger Reservefolge je Serie; Nachschubprüfung je laufender Serie nach 3.4 (Erzeuger mit Rhythmus, bei `markt` `marktquelle.status` "steht", keine Zahl älter als zwölf Monate) | Regel | alle Schwellen; keine laufende Serie mit `nachschub.status` "fehlt" | ja |
| Q7 | Hooks aufgelöst höchstens zehn Wörter, Text im Bild höchstens acht; Anrede nur als `{Sie-Form|du-Form}`; jede Vorlage in beiden Formen gerendert ohne gemischte Formen (`hmPfDuFormen`, `hmPfSieFormen`) | Regel | null Fehler | ja |
| Q8 | Beispiele: drei je Serie; jeder `belegRef` existiert und hat `oeffentlich` gleich "ja"; kein Beleg zweimal in einer Serie je Jahr erzählt, nicht öfter als einmal je Takt gezeigt; jede Lücke mit Arbeitsauftrag | Regel | null Fehler | ja |
| Q9 | Grammatik an Probe-Folge und Belegung: Fenster, Nachbarn i plus minus 1 und 3 für Gesicht, Gegenton (nur Sachplatz, sichtbarer Grund), Textführung, Format, Einstellungsgröße, Serie; Beleg je Woche; Fenster ohne Beleg als Meldung | Regel | null Verstöße für Verschiebung 0, 1, 2 | ja |
| Q10 | Vorlagen: jedes Feld mit Token und Stufe, genau eine offene Variable je Serie, Bildanteil mindestens 60 Prozent außer Fläche, keine zwei Serien mit gleicher Zeitmaß-Form und gleichem Kennungsplatz | Regel | null Fehler | ja |
| Q11 | Stresstest jeder Vorlage | Regel | kein `fehler` | ja |
| Q12 | Lesbarkeit und Kontrast: 92, 30 und 47 px; 4,5:1 und 3:1 über `hmWeltKontrast` | Regel | null Unterschreitungen | ja |
| Q13 | Sichere Zonen: nichts Tragendes außerhalb des 3:4-Fensters und der Reel-Schnittmenge | Regel | null | ja |
| Q14 | Codes: jede Vorlage und Seite mindestens zwei, keine Farbe | Regel | alle | ja |
| Q15 | Objekt-Regel: Energiezeile fest, Pflichtzeile in der Caption, Sperre ohne Werte, nur eigene Objekte | Regel | alle | ja |
| Q16 | Kanalplan: Anrede gleich `hmAnrede`, nur aktive Kanäle, dritter Kanal nur ab 4 bis 8 Stunden | Regel | alle | ja |
| Q17 | Blick des CD an drei Beispielkacheln je Serie und der Probe-Folge als Profil (erst Skizze `muster/12_serien.html`, dann echtes Material): Erkennt man die Serie ohne Kennung? Sieht eine Kachel wie eine Vorlage aus? Trifft jede Serie den Vertrag? Würde ich diese Sendung weiterschicken? | CD | alle ja, sonst zurück an 12.6 oder 12.9 | nein, Protokoll im Datenvertrag |

Freigabe innerhalb des Schritts: Q1 bis Q16 grün und Q17 abgezeichnet. Erst dann liest Schritt 13.

---

## 7. Typische Fehler und wie sie verhindert werden

| Nr. | Fehler | Woran man ihn erkennt | Gegenmittel |
|---|---|---|---|
| T1 | Gattungsname ("Markt-Update", "Warum jetzt") | austauschbar | Gattungsliste, Namensregel, Q3 |
| T2 | Serie ohne Variable oder mit vielen | eintönig oder beliebig | genau eine Variable mit `warum`, Q5 |
| T3 | Signatur hängt am Objektfluss | leere Wochen | `objektUnabhaengig`, Q6 |
| T4 | Anteil ohne Stoff | Füllbeiträge, gleiche Fälle dreimal | Flussdeckel, Belegregel, Q1, Q8 |
| T5 | Anteile aus der Figur | jeder Kenner gleich | Rechenweg 3.3, Q2 |
| T6 | Positionsregeln ("Spalte 1 Gesicht") | Muster bricht beim nächsten Beitrag | nur Folge- und Fensterregeln, Q9 |
| T7 | Text-Reels und Textwände | Reel aus Schrift, Karussell als Folienvortrag | höchstens acht Wörter im Bild, Fläche nur auf dem Sachplatz, Karussell-Rollen |
| T8 | Eyebrow über dem Hook (heute im Studio-Mock, `wb-marke.jsx` Zeile 98) | kleine Rubrikzeile über der Headline | Kennung nur an den vier Plätzen an der Linie, Stresstest findet Text über dem Titel |
| T9 | Vorlagen-Look | Schmuck, gleiche Ecke in jeder Kachel | Feld ohne Token gibt es nicht; Zeitmaß-Form und Kennungsplatz je Serie verschieden, Q10 |
| T10 | Totalsperre | zwölf gleiche Kacheln | Satzarten, Einstellungsgrößen, Gegenton über die Grammatik, echte Bilder |
| T11 | Zwei Anrede-Logiken (`hmPfAnrede`, `hmAnredeVon`, `w.anrede`, KETTE_IST 2.10) oder ausgeschriebene Anrede | "Schicken Sie" bei einem Du-Makler | nur Platzhalter, nur `hmAnrede`, Q7, Q16 |
| T12 | Allgemeiner Aufruf am Schluss | niemand schickt es weiter | Weitergeben-Satz an eine bestimmte Person, je Serie eigene Formel |
| T13 | Fremde Demo-Objekte, Objekte ohne Energiekennzahlen | Innere Stadt bei einem Döblinger Makler | Objekt-Regel, nur eigener Bestand |
| T14 | Mustersätze im Regelpfad | zweiter Kenner bekommt Markus' Sätze | Lücken statt Sätze, Kohortenprüfung |
| T15 | Pratfall zu früh | Fehlergeschichte in Woche 1 | Fehler-Folgen erst nach drei öffentlichen Belegen |
| T16 | Privates über die Grenze | Familie im Hintergrund, Hausnummern | `grenzen`, `bild.vermeiden`, Diskretion |
| T17 | Daten Dritter aus Grundbuch oder Gesprächen | Namen, Einlagezahlen, Umstände privater Eigentümer | 3.14: keine Folgen über Eintragungen Dritter, Praxisfragen ohne Umstände, Einwilligung |
| T18 | KI-Bilder als Porträt, Objekt oder Ort | glatte, generische Bilder | nur `bild.kontaktbogen`; Einträge mit `ki` wahr gesperrt |
| T19 | Folio rückwärts oder erfunden (`wb-markenwelten.jsx` Zeile 1059) | 24 Beiträge, die es nicht gibt | Folgenummer vorwärts ab 01 je Serie |
| T20 | Serie zu teuer für das Zeitbudget | Folgen fallen aus | `maklerMinutenMonat`, Drehtag, fertige Reservefolge |
| T21 | Serienname konkurriert mit dem Claim | zwei Claims | Name nie gleich Claim |
| T22 | Rechtsaussagen als Beratung | Erbrecht als Anleitung | "allgemein, keine Rechtsberatung" in Ablauf und Skizze |
| T23 | Unfreigegebener Beleg im Feed | "600.000 mehr" vor der Prüfung | nur `oeffentlich` "ja", Stresstest mit "offen" |
| T24 | Name mit schädlicher Nebenbedeutung | "Zeitwert" als Wertverlust gelesen | Lesart-Test, Gegenmittel in der Sprachprüfung |
| T25 | Serie ohne Erzeuger ihres Stoffs | Markt-Serie als Ortsfolge ohne Zahl, Monat für Monat | Nachschubprüfung und `marktquelle` (3.4), zweiter Kandidat je Säule, Q6 |
| T26 | Gestrichener Name taucht wieder auf | "Nach dem Grundbuch" als Option in der Rückmeldung oder als Wunsch im Betrieb | Namensregel gilt für jeden Namen, Sperrliste, Selbsttest 10, Hinweis 9 in 5.2 |

---

## 8. Umsetzung in der Werkbank

### 8.1 Dateien

| Datei | Änderung | Aufwand (Setzung) |
|---|---|---|
| `ui_kits/werkbank/wb-social.jsx` (neu) | `hmSocialVorpruefung`, `hmSocialStoff`, `hmSocialSaeulen` (mit Flussdeckel und Deckel), `hmSocialSignaturPruefen` (Jahresrechnung, Rückfallstufe), `hmSocialNachschub` (Erzeuger je Serie, Wechsel auf `serienErsatz`), `hmSocialMarktquelle` (Status, Alter der Stände, Sperre), `hmSocialStaffeln`, `hmSocialFormatmix`, `hmSocialGrammatik`, `hmSocialBelegung` (vier Zustände), `hmSocialFolgePruefen` (Fenster, Nachbarn, Einstellungsgröße, Serie, Verschiebung 0 bis 2), `hmSocialVorlagen`, `hmSocialCodes`, `hmSocialKanalplan`, `hmSocialSprache`, `hmSocialAnredePlatzhalter`, `hmSocialObjektRegel`, `hmSocialRegelpfad(mid)`, `hmSocialSpeichern`, `hmSelbsttestSocial`. Präfix `hm`, Export über `Object.assign(window, ...)`, kein `import()`, `React.useState` ohne Neudeklaration (CLAUDE.md, MARKE_SCHEMA) | 2,5 Tage |
| `ui_kits/werkbank/wb-serien.jsx` (neu) | Team-Ansicht "Serienwerkstatt": Kandidaten mit Tragfähigkeit und Jahresrechnung, Wahl, Namensreihenfolge mit Lesart-Test, Bildaufbau je Vorlage am Kontaktbogen mit Sucherrahmen, Reservefolgen mit Status fertig, Themenvorrat nach Klassen, Staffelthemen, Belegung mit Zustandsschalter, Probe-Folge als Profil mit Verschiebungsregler, Stresstest, Blick des CD. Höchstens sieben Bedienelemente je Bereich, Seitenpanel für Details | 2 Tage |
| `ui_kits/werkbank/wb-markenwelten.jsx` | Renderer für `reelTitel`, Karussell-Seiten nach Rollen, Staffelplakat, Story, drei Satzarten, Kennung an vier Plätzen, vorwärts; `HM_WELT_STIL.feed` wird durch `grammatik` und `belegung` ersetzt; `hmWeltPostDaten` verliert die Vorgaben "3", Zitat gleich Claim und Demo-Objekte | 2,5 Tage |
| `api/wb-marke.js` | Phase `social` mit `SCHRITT.social` und `SCHEMA.social`; `SCHRITT.serien` entfällt für v2 | 0,5 Tag |
| `ui_kits/werkbank/wb-plattform.jsx` | `hmPfSaeulen` und die festen Serienbausteine (`hmPfSerieMarkt` bis `hmPfSerieBeweise`, `HM_PF_FIGUR[*].signatur`) werden für v2 durch `hmSocialRegelpfad` ersetzt; ihre Wortgruppen bleiben als Sperrliste für Q3 | 0,5 Tag |
| `ui_kits/werkbank/index.html` | `wb-social.jsx` nach `wb-markenwelten.jsx` und `wb-plattform.jsx`, vor `wb-markenbuch.jsx`; `wb-serien.jsx` danach | wenige Minuten |
| Einstellungen, Selbsttest | `hmSelbsttestSocial` in die Liste | wenige Minuten |
| `docs/werkbank/MARKE_SCHEMA.md` | Objekt `social` für v2 | 0,25 Tag |
| `docs/werkbank/branding-v2/schritte/muster/12_serien.html` | Skizze: Probe-Folge als Profil, drei Beispielkacheln je Serie, Geometrie in Pixeln, Porträtflächen als Lücke bis zum Kontaktbogen | erledigt |

Summe rund 8,75 Arbeitstage (Setzung). Schritt 13 und 17 nutzen diese Funktionen; ihre eigenen Umbauten gehören in deren Pläne.

### 8.2 Datenfeld

Speicherort: `hmStore` unter `marke2[mid].social`, versioniert. Nach der Freigabe liest jeder Abnehmer nur die eingefrorene Fassung aus `quelle` (Schritt 16).

```json
{
  "version": 3,
  "quelle": "claude",
  "saeulen": [
    { "id": "meinung", "name": "Meinung", "zweckArt": "Haltung", "zweck": "Zeigt an echten Entscheidungen, wann Warten und wann Verkaufen richtig war.",
      "frage": "Muss ich jetzt verkaufen?", "anteil": 30,
      "herleitung": [ { "schritt": "positionierung", "wert": 30, "quelle": "7: positionierung.weil, beweise b1" }, { "schritt": "komfort", "wert": 0, "quelle": "Lücke: workshop.probedreh" } ] },
    { "id": "beweise", "name": "Beweise", "zweckArt": "Fälle", "zweck": "Erzählt abgeschlossene Fälle erst nach der Eintragung.",
      "frage": "Hat das bei anderen funktioniert?", "anteil": 5,
      "herleitung": [ { "schritt": "flussdeckel", "wert": 5, "quelle": "1: verkauft12m Lücke, Arbeitswert 7: b5 intern, Freigabequote 0,4 Setzung" } ] }
  ],
  "serien": [
    { "id": "s1", "name": "Zeitwert", "saeule": "meinung", "format": "reelTitel",
      "rhythmus": { "tag": "Dienstag", "kanal": ["linkedin", "instagram"], "takt": "woechentlich" },
      "variable": { "art": "dauer", "was": "die Dauer der Entscheidung als Spanne des Zeitmaßes", "warum": "9: idee.zeichen.herleitung" },
      "hookFormel": "[Dauer]. Was [das Warten | der schnelle Verkauf | die Zeit] [wem] [gebracht | erspart] hat.",
      "weitergeben": "{Schicken Sie|Schick} das an den Miterben, der es eilig hat.",
      "folioRegel": { "zeitmassForm": "spanne", "kennungPlatz": "ueberRechts" },
      "bildaufbau": [ { "vorlage": "v1", "satzart": "vollflaechig", "einstellung": "halbnah", "blick": "kamera", "platzX": 540, "waagrechteY": 1232, "gesicht": true, "fuehrung": "bild" } ],
      "beispiele": [ { "titel": "Elf Wochen", "hook": "Elf Wochen. Was der schnelle Verkauf diesem Zinshaus gebracht hat.", "skizze": "", "klasse": "F", "belegRef": "b2", "luecke": "Freigabe und Unterlage" } ],
      "themenvorrat": [ { "titel": "Zwei Jahre", "klasse": "F", "stoffquelle": "7: beweise b1", "belegRef": "b1" } ],
      "reservefolge": { "titel": "Wann Warten nichts bringt", "klasse": "W", "stoffquelle": "7: positionierung.weil", "belegRef": null, "fertigAm": null },
      "nachschub": { "quelle": "F", "erzeuger": "7: beweise, 1: verkauft12m", "rhythmus": "je Staffel", "status": "bedingt" },
      "anlass": null }
  ],
  "serienErsatz": [
    { "id": "s2e", "rang": 2, "fuerSerie": "s2", "name": "Sprechstunde Sievering", "saeule": "markt",
      "nachschub": { "quelle": "P", "erzeuger": "Frageprotokoll am Drehtag", "rhythmus": "je Takt", "status": "steht" } }
  ],
  "marktquelle": { "bezug": "Sievering, Döbling", "quellen": [], "verantwortlich": "Marktredaktion", "rhythmus": "je Takt vor dem Drehtag",
    "geprueftAm": null, "naechstePruefung": null, "status": "fehlt" },
  "serieSignatur": {
    "serieId": "s1",
    "namen": [
      { "name": "Zeitwert", "achse": "fachwort", "warum": "", "risiko": "Lesart Wert nach Abnutzung", "gegenmittel": ["Pilot definiert", "Titel als Dauer", "Sprachprüfung Zeitwert neben Haus"] },
      { "name": "Die Zeit daneben", "achse": "wortAusIdeeSatz", "warum": "", "risiko": "leiser, drei Wörter", "gegenmittel": [] } ],
    "empfehlung": "Zeitwert", "gewaehlt": null,
    "tragfaehigkeit": { "folgenVorrat": 9, "wissensAnteil": 6, "eigeneFaelle": 2, "jahresrechnung": { "noetig": 28, "F": 10, "E": 2, "G": 0, "P": "Lücke" }, "nachschub": "verkauft12m Lücke", "objektUnabhaengig": true, "maklerMinutenMonat": 134, "drehbar": true, "komfortPasst": null, "rueckfallStufe": 0, "ok": false },
    "staffeln": [ { "nr": 1, "thema": "Erbe", "quelle": "2: ausloeser Rang 1", "festAm": null }, { "nr": 4, "thema": null, "quelle": "Lücke: Frageprotokoll, Schritt 17", "festAm": null } ],
    "plakatVorlage": "v2"
  },
  "grammatik": { "takt": 12, "gesichtPeriode": 3, "tonwertPeriode": { "periode": 6, "phase": 0, "nurSachplatz": true, "satzarten": ["bildAufDerLinie", "flaeche"] },
    "textfuehrung": { "periode": 6, "nurSachplatz": true, "satzart": "flaeche" },
    "einstellung": { "klassen": ["halbnah", "nah", "weit", "detail", "flaeche"], "nachbarPlus1": "verschieden" },
    "serieNachbar": { "plus1": "verboten", "ausnahme": "plakatNebenFolge01" },
    "fenster": { "laenge": 3, "gesicht": 2, "gegenton": 1, "belegMeldung": true }, "belegJeWoche": 1,
    "minTextKachelPx": 92, "minTextBeitragPx": 30, "minFliesstextPx": 47 },
  "formatmix": { "reel": 5, "karussell": 4, "post": 3, "toleranz": 1, "herleitung": ["Startwert", "k fehlt, Video gern", "Belegung 5, 3, 4 wegen Formatregel"] }
}
```

Die übrigen Felder folgen der Tabelle in 5.2. Leere Werte sind gekürzt.

### 8.3 Schema für die Claude-Kette

Phase `social`, Structured Outputs mit `output_config.format` wie die bestehenden Schritte (`api/wb-marke.js` Zeile 202). Claude liefert, was Sprache und Idee braucht; alles Rechenbare rechnen die Regeln davor und danach. Die Regeln übergeben im Prompt die Säulen-Ids mit Anteilen, die Folgenklassen und die Stoffliste mit Freigabestatus.

```js
const VAR_ARTEN = ["motiv", "zahl", "ort", "dokument", "dauer", "gast", "objektmerkmal"];
const KLASSEN = ["F", "P", "G", "E", "W"];
const FORMATE = ["post", "karussell", "reelTitel", "story"];
const FOLGE = O({ titel: S, klasse: { type: "string", enum: KLASSEN }, stoffquelle: S, belegRef: S });

SCHEMA.social = O({
  saeulen: A(O({ id: { type: "string", enum: SAEULEN_IDS }, zweck: S, frage: S })),
  signaturKandidaten: A(O({ name: S, nameAlternative: S, achse: S, idee: S,
    variable: O({ art: { type: "string", enum: VAR_ARTEN }, was: S, warum: S }),
    stoffquelle: A(S), risiko: S, ausSerienIdee: B,
    staffeln: A(O({ nr: I, thema: S, quelle: S })) })),
  serien: A(O({ saeule: { type: "string", enum: SAEULEN_IDS }, name: S, idee: S,
    format: { type: "string", enum: FORMATE }, ablauf: A(S), hookFormel: S, weitergeben: S,
    variable: O({ art: { type: "string", enum: VAR_ARTEN }, was: S, warum: S }),
    beispiele: A(O({ titel: S, hook: S, skizze: S, klasse: { type: "string", enum: KLASSEN }, belegRef: S, luecke: S })),
    themenvorrat: A(FOLGE),
    reservefolge: FOLGE,
    rang: I })),
  konzepte: A(O({ name: S, idee: S, warum: S, umsetzung: A(S), kanal: S })),
});
```

`B` ist ein boolescher Typ, analog zu `S` und `I`; alle Felder sind nach dem Muster von `O` Pflicht, auch `reservefolge`. Den Bildaufbau schreibt Claude nicht, weil er Bilder nicht sieht; ihn setzt der Art Director. Prompt `SCHRITT.social` (Kern): Nutze nur Fälle, Orte, Termine und Wörter aus dem Dossier. `belegRef` nur auf Belege mit `oeffentlich` "ja", sonst Lücke "Freigabe und Unterlage". Ein Kandidat kommt aus `serienIdee`. Keine Gattungsnamen, nicht der Claim, keine Wortgruppe aus der Sperrliste, nichts aus den Verboten. Anrede nur als `{Sie-Form|du-Form}`. Höchstens sechs Folgen der Klasse W je 13. Fehlt Stoff, schreibe eine Lücke mit Arbeitsauftrag. Übernimm keine Formulierung aus dem Musterbeispiel. Schlussprüfung und Sicherung gegen Gedankenstriche und Ausrufezeichen laufen danach wie heute.

### 8.4 Regelpfad ohne Claude

Dieselbe Struktur. Säulen-Anteile, Formatmix, Grammatik, Belegung, Vorlagen, Kanalplan und Prüfungen sind ohnehin Regeln. Für `saeulen[].zweck` und `frage`, Namen, Hooks, Weitergeben-Sätze, Staffelthemen, Beispiele und Reservefolgen setzt der Regelpfad Lücken mit Arbeitsauftrag und hängt die Rohwerte an. Dem Team legt er intern `namensbausteine[]` vor (Orte, eigene Wörter, Fachwörter, Wörter aus `idee.satz`) und die Staffel-Kandidaten aus 3.5. Beispiele baut er nur aus `beweise` mit `oeffentlich` "ja" wörtlich. Die heutigen festen Namen entfallen und werden Sperrliste. Ohne Claude rund 50 Minuten mehr Teamzeit (Setzung).

### 8.5 Selbsttest `hmSelbsttestSocial`

1. Anteile für den Seed Markus: 30, 30, 20, 15, 5, Summe 100, Herleitung je Säule, `zweck` und `frage` vorhanden oder Lücke.
2. Tausch `k` von leer auf 2: `meinung` sinkt, `wissen` oder `markt` steigt.
3. Tausch `zeit` auf "Bis 2 Stunden": vier Säulen, `wissen` bleibt.
4. Tausch `verkauft12m` auf 30: Flussdeckel 10.
5. Stoffwert: Belege mit `oeffentlich` "offen" oder "nein" zählen null; drei mit "ja" ergeben 2.
6. Belegung: alle vier Zustände ohne leeren Platz und ohne Abweichung über einen Beitrag.
7. Grammatik an der Probe-Folge: null Pflichtverstöße für Verschiebung 0, 1, 2; Meldung für Fenster 3 bis 5 und 8 bis 10.
8. Gegenproben: zwei gleiche Einstellungsgrößen nebeneinander, Gegenton auf einer Porträtkachel, zwei textgeführte im Abstand 3, drei Gesichter in einem Fenster, dieselbe Serie nebeneinander werden erkannt.
9. Formatmix: alle sieben Bedingungen liefern die gesetzten Werte, Toleranz eins.
10. Namensregel: "Markt-Update", "Warum jetzt", der Claim und "Nach dem Grundbuch" fallen durch.
11. Anrede: jede Vorlage mit Du und Sie gerendert, keine gemischten Formen; ein Textfeld mit "Schicken Sie" ohne Klammern wird als Fehler gemeldet.
12. Sprachprüfung: Klischees, Just Sold, Just Listed, "Objekt" im Fließtext und "Zeitwert Ihres Hauses" werden gefunden; Negativbeispiele ignoriert.
13. Objekt-Regel: ohne HWB blockiert; alte und neue Form erkannt.
14. Codes: jede Vorlage mit mindestens zwei.
15. Stresstest: Extremwerte ohne `fehler`, Kürzung ist Fehler, Beleg "offen" sperrt.
16. Sichere Zonen und Feldkoordinaten innerhalb von 3:4-Fenster und Reel-Schnittmenge.
17. Regelpfad ohne Stoff: nur Lücken, kein Satz aus MARKENQUALITAET Kapitel 5, keiner aus `HM_PF_FIGUR`.
18. Kennung vorwärts ab 01; keine zwei Serien mit gleicher Zeitmaß-Form und gleichem Kennungsplatz.
19. Tragfähigkeit: W über 6 je Staffel oder fehlende Reservefolge ergibt `ok` falsch.
20. Nachschub: eine Serie mit `nachschub.quelle` `markt` bei `marktquelle.status` "fehlt" oder "veraltet" besteht nicht; der Kandidat mit `rang` 2 übernimmt Plätze und Vorlage, Belegung und Formatmix bleiben gleich. Eine Zahl ohne URL oder mit Stand älter als zwölf Monate wird gesperrt.
21. Namensregel für Wünsche: ein Makler-Wunsch "Nach dem Grundbuch" in `rueckmeldung` wird abgelehnt und erzeugt keine neue Version.

---

## 9. Offene Punkte und Lücken

1. **Makler-Daten fehlen.** Keine Quelle trennt Interaktion oder Anfragen für Makler oder Personenmarken im lokalen Markt heraus (R6 1.2). Formatmix, Gesichtsanteil, Tage, Takt, Freigabequote, Minutenwerte sind Setzungen bis Schritt 17.
2. **Sichere Zonen organischer Reels** sind nur für Anzeigen dokumentiert (R6).
3. **Anzahl angepinnter Beiträge** ist nicht bestätigt (R6).
4. **3:4-Upload** in 1080 x 1440 statt 1080 x 1350: offen (R6, Zerlegung Kapitel 6).
5. **Akzeptanz gesperrter Vorlagen** bei Maklern ist unbelegt (R4 offene Frage 2).
6. **Wiedererkennungstest** ohne Namen (R2, R6): offen; bis dahin der Fremdtest in Schritt 15.
7. **Rechtsrahmen** für Energiekennzahlen in Social-Beiträgen, Kooperationsbeiträge mit Notariaten, anonymisierte Fälle und Praxisfragen aus Erstgesprächen: vor dem Livegang von UNIO zu prüfen, keine Rechtsberatung in diesem Dokument.
8. **Du oder Sie gegenüber dem Makler** in Reveal und Rückmeldung (Zerlegung Kapitel 7, Punkt 1). Alle Texte hier tragen Platzhalter.
9. **Kohortengröße**, ab der Namens- und Bildaufbau-Prüfung tragen, ist offen (R4).
10. **Markenarchitektur UNIO und Makler** (Zerlegung Kapitel 7, Punkt 6): Schritt 10 reserviert einen Platz mit Stufe `fest`; die Codes-Prüfung zählt ihn nicht.
11. **Praxisfragen je Drehtag** sind unbekannt; davon hängt ab, ob die Sendung ab Staffel 2 wöchentlich bleibt.
12. **Echtes Material** für die Beispielkacheln: bis zum Porträt-Termin nur Skizzen.
13. **Konkrete Marktquellen** mit Bezug auf Bezirk oder Grätzl sind nicht geprüft. Ob es für Sievering oder Döbling eine veröffentlichte Quelle mit Methodik und regelmäßigem Stand gibt, klärt die Marktredaktion in 12.1; bis dahin nennt dieses Dokument keine.

---

## Quellen

Intern: `docs/werkbank/branding-v2/00_ZERLEGUNG.md`, `bestand/KETTE_IST.md`, `bestand/FRAGEN_WIRKUNG_IST.md`, `research/R1-studios.md`, `R2-art-direction.md`, `R4-tools.md`, `R5-makler.md`, `R6-social-system.md`, `R7-evidenz.md`, `schritte/01_auftakt.md`, `02_fragebogen.md`, `04_workshop.md`, `07_positionierung.md`, `09_idee.md`, `10_system.md`, `11_bild.md`, `13_feed.md`, `docs/werkbank/MARKE_SCHEMA.md`, `docs/werkbank/MARKENQUALITAET.md`, `ui_kits/werkbank/CLAUDE.md`, Code in `ui_kits/werkbank/` und `api/wb-marke.js`.

Plattform
- Kapwing, Raster 3:4: https://www.kapwing.com/resources/instagrams-new-grid-layout-size-and-dimensions-2025/
- Social Media Today, Raster umordnen: https://www.socialmediatoday.com/news/instagram-releases-profile-grid-rearranging/822304/
- Engadget, angepinnte Beiträge beim Umordnen ausgegraut: https://www.engadget.com/2190179/instagram-how-to-reorder-grid/
- Meta Ads Guide, Reels-Flächen: https://www.facebook.com/business/ads-guide/update/video/instagram-reels
- Instagram, Ranking Explained: https://about.instagram.com/blog/announcements/instagram-ranking-explained
- PetaPixel, 20 Seiten je Karussell: https://petapixel.com/2024/08/09/instagram-users-can-now-share-20-photos-videos-in-a-post-carousel-photodump/
- Socialinsider Benchmarks, Stand Q2 2026: https://www.socialinsider.io/social-media-benchmarks/instagram
- Socialinsider Engagement Report: https://www.socialinsider.io/social-media-benchmarks/instagram-engagement-report
- Socialinsider Karussell: https://www.socialinsider.io/blog/instagram-carousel/
- Apple HIG Typography: https://developer.apple.com/design/human-interface-guidelines/typography
- W3C WCAG 2.2, 1.4.3: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

Studios, Verlage, Makler
- Pentagram, The Public Theater: https://www.pentagram.com/work/the-public-theater-2020-2021-season
- DIA für Nuits Sonores: https://the-brandidentity.com/project/dia-studio-builds-a-generative-tool-that-makes-nuits-sonores-pulse-2
- Patrik Hübner: https://www.patrik-huebner.com/applying-generative-design-to-brand-design/
- magCulture, Cereal: https://magculture.com/interview-with-rosa-and-rich-cereal/
- It's Nice That, Kinfolk: https://www.itsnicethat.com/articles/opinion-kinfolk
- The Modern House Journal: https://www.themodernhouse.com/journal/
- Hole & Corner, Albert Hill: https://www.holeandcorner.com/long-reads/in-the-modern-style
- Aufi, Albert Hill: https://www.aufi.com/insights/modern-house-albert-hill-design
- SERHANT, Shorty Awards: https://shortyawards.com/14th/serhant
- SERHANT, Video: https://serhant.com/blog/how-top-agents-are-using-video-to-sell-more-homes
- NAR Magazine, Glennda Baker: https://www.nar.realtor/magazine/real-estate-news/technology/how-this-agent-is-making-six-figures-on-tiktok
- Leslie Wilkins, Compass: https://www.lesliewilkins.com/portfolio/compass
- MarTech Outlook, Engel & Völkers: https://www.martechoutlook.com/cxoinsights/lara-maier-nid-3935.html
- Bayut, VAE: https://www.bayut.com/mybayut/uae-real-estate-instagram-accounts-follow/
- BAM, Auswertung NAR 2025: https://nowbam.com/how-home-buyers-and-sellers-find-their-agents-in-2025/
- Curzon PR, Edelman und LinkedIn 2024: https://curzonpr.com/theprinsider/the-impact-of-thought-leadership-edelman-and-linkedin-b2b-2024-report/

Werkzeuge
- Canva, Template Locks: https://www.canva.com/help/brand-template-locks/
- Canva, On-Brand AI: https://www.canva.com/help/create-on-brand-designs/
- Figma, Buzz-Vorlagen: https://www.figma.com/blog/8-tips-for-designers-building-branded-templates-in-figma-buzz/
- Figma, Bulk Create: https://help.figma.com/hc/en-us/articles/31271824185623-Bulk-create-assets-in-Figma-Buzz

Studien
- Willis und Todorov 2006: https://doi.org/10.1111/j.1467-9280.2006.01750.x
- JKR und Ipsos, Marketing Week: https://www.marketingweek.com/15-brand-assets-truly-distinctive-finds-research/
- Distinctive Assets Benchmark 2026: https://www.tandfonline.com/doi/abs/10.1080/02650487.2026.2637295
- Reber, Schwarz, Winkielman 2004: https://dornsife.usc.edu/norbert-schwarz/wp-content/uploads/sites/231/2023/11/04_pspr_reber_et_al_beauty.pdf
- Moulard, Garrity, Rice 2015: https://doi.org/10.1002/mar.20771
- Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290
- Chernev, Böckenholt, Goodman 2015: https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf
- Hsee 1996: https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf
- Norton, Mochon, Ariely 2012: https://myscp.onlinelibrary.wiley.com/doi/abs/10.1016/j.jcps.2011.08.002

Energieausweis
- https://www.energieausweis360.at/energieausweis-neuerungen-2026
- https://www.chg.at/novelle-des-energieausweis-vorlage-gesetzes/
- https://www.ovi.at/recht/energieausweis/informationspflicht-in-medien

---

## Änderungen aus der Kettenprüfung

Stand 30.09.2026. Zwei Befunde zu diesem Schritt, geändert wurde nur, was für sie nötig ist. Die Werte von Fassung 3 (Gegenton, Namen, Serien) bleiben unverändert.

**Befund 1: Die Nachbarn übernehmen Fassung 3 nicht.** In diesem Schritt selbst war Fassung 3 stimmig. Geändert:
- 3.4, Namensregel: "Nach dem Grundbuch" steht ausdrücklich in der Sperrliste, mit der Regel, dass die tragende Wortgruppe zählt. Neu: Die Namensregel gilt für jeden Namen, auch für Wünsche des Maklers in Schritt 15 und 17; ein Wunsch, der scheitert, wird begründet abgelehnt und nie als neue Version übernommen.
- 5.2, Hinweis 9 an die Nachbarn: die verbindlichen Werte aus Fassung 3 gebündelt, mit der Übernahme je Schritt (10 `proportion.feed` 10 zu 2, 14 Stand-Tabelle, 15 Namenswahl Zeitwert oder Die Zeit daneben, 16 Beispiel mit zwei dunklen Sachkacheln, 17 Namenswunsch scheitert an der Namensregel) und der Liste gestrichener Namen.
- 7: T26 (gestrichener Name taucht wieder auf). 8.5: Selbsttest 21.

**Befund 2: Die Marktquelle hat keinen Erzeuger.** Geändert:
- 3.4: neue Pflicht "Nachschubquelle je laufender Serie" (`serien[].nachschub`); zwei Kandidaten je Säule in Rangfolge, der erste bestehende läuft; neuer Erzeuger `marktquelle` mit Feld, Rolle (Marktredaktion), zulässigen Quellen mit URL, Stand und Methodik, Rhythmus je Takt und Sperre nach zwölf Monaten. Ohne eingetragene Quelle fällt eine Markt-Serie durch, der zweite Kandidat übernimmt. Eine Ortsfolge ohne Zahl ist nur noch Reservefolge für einen einzelnen Ausfall.
- Der Erzeuger liegt in diesem Schritt, nicht im Import von Schritt 1, weil Marktdaten keine Kennzahl des Maklers sind und je Takt gepflegt werden. Schritt 1 ändert sich dadurch nicht.
- 3.2: 12.1 legt `marktquelle` an (20 Minuten), 12.6 prüft den Nachschub je Kandidat; einmalige Teamzeit rund 4 Stunden statt 3 Stunden 40.
- 3.15: Rolle Marktredaktion; Wochenrechnung plus 30 Minuten je Takt, rund 4 Stunden 25 Minuten je Woche statt 4 Stunden 15 (auch in E8).
- 3.16: Stoffinventar mit Zeile Marktquelle (Status "fehlt"); Stand Sievering ohne Zahl-Rückfall, Zeile `nachschub` in der Serientabelle; Stand Sievering besteht heute nicht, zweiter Kandidat Sprechstunde Sievering auf denselben Plätzen mit derselben Vorlage (Frageprotokoll als Erzeuger, Menge bedingt). Belegung, Probe-Folge und offene Punkte angepasst; Anteile, Formatmix und Grammatik bleiben gleich.
- 5.2: Ausgang `serien[].nachschub`, `serienErsatz[]`, `marktquelle` mit Begründung; Hinweise an 13 und 17. 6: Q6 erweitert. 7: T25. 8.1 bis 8.3: Funktionen, Datenfeld, Schema (`rang`). 8.5: Selbsttest 20. 9: Lücke 13 (konkrete Marktquellen ungeprüft, darum hier keine genannt).

Nicht in diesem Schritt behoben, weil sie andere Schritte betreffen: die doppelten Fragen in 1, 2, 3 und 4, die verteilten Einwilligungen, der Mindeststand für Gate 2 in 14 und der Ersatz für einen ausgefallenen Porträt-Termin.
