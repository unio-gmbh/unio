# Schritt 8. Verbale Identität (`stimme`)

Stand 30.09.2026, vierte Fassung nach zweiter Rückweisung durch den Kontrolleur. Entwurf für Branding v2, STATUS Punkt 4. Grundlage: `00_ZERLEGUNG.md` (Vertrag Schritt 8), `bestand/KETTE_IST.md`, `bestand/FRAGEN_WIRKUNG_IST.md`, `research/R1` bis `R8`, `docs/werkbank/MARKENQUALITAET.md`, `docs/werkbank/MARKE_SCHEMA.md`, die Nachbarentwürfe `schritte/02_fragebogen.md`, `04_workshop.md`, `05_einsicht.md`, `06_territorien.md`, `07_positionierung.md`, `09_idee.md`, `12_social.md`, `13_feed.md` sowie der Code in `ui_kits/werkbank/` (`wb-plattform.jsx`, `wb-produktion.jsx`, `wb-os-data.jsx`, `wb-reel.jsx`, `wb-data.jsx`, `wb-markenbuch.jsx`, `wb-store.jsx`) und `api/wb-marke.js`.

**Lesart.** *Belegt* heißt: steht in einer Quelle mit URL oder in einer genannten Datei mit Zeile. *Ableitung* heißt: eigene Folgerung. *Setzung* heißt: bewusst gewählter Startwert, der an den ersten fünf Maklern gemessen und ersetzt wird. *Lücke* heißt: wir wissen es nicht.

**Was sich gegenüber der dritten Fassung ändert.**

1. **Stimmproben: eine Fassung, nicht mehr nachgezogen.** Es gilt allein `02_fragebogen.md` 3.5 (Zeile 218 bis 246), Datenfeld Zeile 574, Entscheidung D8 Zeile 598: binär 25 oder 75, P1 `ernst`, P2 `persoenlich`, P3 `begeistert`, P4 `sachlich`. Dieses Dokument wiederholt die Tabelle nicht mehr, sondern verweist. Dem Owner ist die Fassung als Entscheidung vorgelegt (9, Punkt 2); bis dahin ändert keiner der beiden Schritte die Proben. Die "offene Grenze" der gespiegelten Regler entfällt.
2. **Anrede ohne Rückwärtskante.** `hmAnredeRegel` ist eine reine Funktion über `antworten.anredeJeKanal`. `hmAnrede` ruft sie, solange Schritt 8 `anrede` noch nicht geschrieben hat. Schritt 7 liest also Daten aus Schritt 2 über dieselbe Funktion, nicht das Feld `anrede` aus Schritt 8 (3.6, 5.3).
3. **Keine öffentliche Behauptung ohne Beweis.** "auch wenn mich das die Provision kostet" steht in keinem öffentlichen Feld mehr. Belegbar ist nur, dass es beim Rat zum Warten vorerst keinen Auftrag gab; das wird als `b7` bei Schritt 7 angefordert (5.5). Die Provisionsantwort ist umformuliert und als rechtlich zu prüfen markiert. `b3` ist bis zur Klärung der Bezugsgröße intern.
4. **Neue Story kurz** mit Ort, Beleg oder eigenem Wort in jedem Satz, ohne Branchenformel und ohne Umschreibung des Musterbeispiels (3.14).
5. **Neue Handwerksregeln:** Schreibweise der Zahlen (V12), österreichisches Standarddeutsch mit Grußformeln und Wiener Fachwortschatz (V13), Rhythmus und Satzzeichen als Ermessen, Frequenzregel für wiederkehrende Wendungen (3.8).
6. **Markierung wirkt nur auf Stimmfelder** (Gewichtung in der Stimmgabel, Ton der Hook-Formel), nicht mehr auf Reihenfolge und Inhalt des Feeds. Ein nicht markierter Kernsatz geht an den CD (3.12).
7. **Claim-Werkstatt:** Satzmuster "X, nicht Y" und "X statt Y" gesperrt, Gleichstand entscheidet Eigentum. Neuer Gegenentwurf "Rat, auch zum Warten." (3.14).
8. **Fremdtexter-Probe mit Schema und Prompt** und semantischer Nähe-Hinweis im Claude-Pfad (8.3). Kurzbio in zwei Sätzen je höchstens 20 Wörter. Wort-Link mit einem Ausweg je Aufgabe. Alle Zeilenangaben gegen den Stand vom 30.09. geprüft.

---

## 0. Kurzfassung

1. **Die Stimme entsteht aus seinen eigenen Sätzen, nicht aus Adjektiven.** Drei Schichten: verbindliche Regeln, die eine Maschine prüft, Ermessen mit Beispielen "so und nicht so", und die **Stimmgabel** (`stimme.stimmgabel`), eine geordnete Liste seiner Sätze. Zuerst kommt, was er gesagt hat, dann, was er geschrieben hat, zuletzt die Story-Sätze, die er im Wort-Link als "genau so klinge ich" markiert. Claude stimmt jeden späteren Text an dieser Liste.
2. **Eine Idee für Wort und Bild.** Das gewählte Territorium zeichnet eine Spanne zwischen Rat und Ergebnis. Die Sprache bekommt dieselbe Figur als verbindliche Regel: In jedem Text über einen Fall stehen Rat, Dauer und Ergebnis in dieser Reihenfolge. Schritt 9 nimmt das in `idee.begruendung` auf.
3. **Eine Anrede-Funktion.** `hmAnrede` ist genau einmal definiert, in `wb-vertrag.jsx`, wie Schritt 7 es festgelegt hat. Schritt 8 liefert die reine Regel (`hmAnredeRegel`), schreibt das Feld `anrede` und den Prüfer. Jeder Abnehmer ruft dieselbe Funktion; vor Schritt 8 rechnet sie aus den Antworten von Schritt 2.
4. **Genau ein Claim, anredefrei, ohne Zahl.** Stoff ist das von Gate 1 abgezeichnete Territorium. Für Markus empfohlen: "Rat vor Auftrag." Gegenentwurf: "Rat, auch zum Warten." Beide tragen dieselbe Idee und unterscheiden sich in einer Achse: die Reihenfolge seines Handelns gegen den unbequemen Inhalt seines Rats.
5. **Story in drei Längen, jede Lücke sichtbar.** Die kurze Fassung hat vier Sätze, jeder trägt einen Ton (Ort, Nein, Tempo, Umgang mit Zahl) und einen Ort, einen Beleg oder ein eigenes Wort. Biografie kommt erst in der langen Fassung, und der Satz über den Großvater bleibt intern, bis die Grenze "Familie zeigen" geklärt ist.
6. **Zitate nur per Verweis mit festem Namensraum.** Claude liefert nie Zitattext, nur Referenzen der Arten `zitat`, `geschichte`, `stimmprobe` oder `richtung`. Den Text kopiert eine Regel.
7. **Etwa vier Minuten für den Makler.** Im Wort-Link nach dem bestätigten Markenvertrag wählt er zwischen zwei Claims und markiert in seiner kurzen Story zwei oder drei Sätze, die genau so klingen wie er. Am Ende sieht er seine LinkedIn-Kopfzeile. Moment: Er liest sich selbst, nur klarer.

---

## 1. Ziel und Erfolgskriterium

### 1.1 Ziel

Eine Stimme, die ein fremder Texter und Claude ohne Rückfrage anwenden: verbindliche Regeln getrennt von Ermessen, eine Anrede-Funktion je Kanal, genau ein Claim, die Story in drei Längen, ein Pressebaustein und Beispiele "so und nicht so" für echte Situationen des Maklers. Wort und Bild tragen dieselbe Idee. Die Stimme ist ab der Freigabe in Schritt 16 Teil der eingefrorenen Quelle, aus der Captions, Reels, Website und Monatsideen gelesen werden.

### 1.2 Maßstab Top-Studio (belegt, mit Ableitung)

- **Wolff Olins, Lloyds Banking Group.** Die Fallstudie führt "Verbal Identity" als eigene Leistung neben Strategie und visueller Identität und beschreibt einen erneuerten Tonfall, der aus derselben Positionierung folgt wie die Gestaltung (https://wolffolins.com/work/lloyds). In einem eigenen Text beschreibt das Studio verbale Identität als System aus Stimme, Botschaften, Namen und Texten und setzt auf Werkzeuge statt starrer Regeln, erprobt an echten Anwendungen (https://wolffolins.com/news/how-verbal-identity-helps-everyone-speak-brand).
- **Koto, Mews.** Die Stimme hängt an einer Figur in einem Satz, "your concierge's concierge", und an Paaren der Form "selbstsicher, aber nicht arrogant", gezeigt an echten Headlines der Marke (https://www.creativeboom.com/news/koto-just-proved-that-design-for-enterprise-platforms-doesnt-have-to-be-beige/).

*Ableitung für diesen Schritt:* Erstens folgen Wort und Bild aus einer Idee, nicht aus zwei Briefings. Zweitens stehen Nuancen als Paare mit Beispiel (bei uns `persoenlichkeit[].heisst` und `heisstNicht` aus Schritt 7 und `stimme.ermessen`). Drittens geht es um Werkzeuge vor Regeln: Wir halten die verbindlichen Regeln knapp und nur dort, wo Claude und ein Prüfer ohne Urteil arbeiten müssen. Alles andere ist Ermessen mit Beispiel. Viertens wird jede Regel an echter Anwendung gezeigt, nie als Liste allein.

### 1.3 Erfolgskriterium

| Nr. | Kriterium | Messung | Schwelle | Status |
|---|---|---|---|---|
| E1 | Ein fremder Texter kann eine Absage schreiben, die nach ihm klingt (Leitfrage 1) | **Fremdtexter-Probe** in drei Fassungen derselben Situation ("Eigentümer will zu einem Preis anbieten, den die Vergleichswerte nicht tragen"), je von Claude in frischem Kontext (Schema und Prompt `SCHRITT.fremdtexter` in 8.3): (a) mit voller `stimme`, `anrede`, `botschaften`; (b) nur mit `stimme.verbindlich` und `anrede`; (c) mit der Konvention aus `einsicht.konvention` als Stimme. Zwei Teammitglieder bekommen die drei Texte ohne Kennung und seine `stimme.eigeneWorte` und ordnen zu: Welcher klingt nach ihm? | beide wählen (a); (b) und (c) werden unterschieden | Ableitung aus dem Blindtest-Vorschlag R4 Abschnitt 5.4, Setzung. Ausführbar schon bei einem einzigen Makler in der Kohorte |
| E2 | Genau ein Claim, der auf keinen anderen Makler passt | `botschaften.claim` ist ein String, höchstens fünf Wörter, kein Treffer der Kohorten- und Schablonenprüfung, kein Renderer liest `claimAlternativen` | Selbsttest grün | Ableitung aus der Rubrik (Deckel bei zweitem Claim) |
| E3 | Jedes Beispiel folgt der Anrede seines Kanals | `hmAnredePruefen(text, kontext, mid)` über alle `beispiele`, `botschaften`, `story.mittel`, `story.lang`, `presse` | 0 Fehler | Ableitung |
| E4 | Keine Zahl ohne Beleg | jede Zahl in öffentlichen Feldern entspricht einem Eintrag in `beweise` aus Schritt 7, ohne pauschal erlaubte Zahlen | 0 Fehler | Ableitung aus KETTE_IST 2.5 |
| E5 | Er erkennt sich | Anteil der markierten Sätze, deren Kern aus seinen Worten stammt (Vier-Wort-Treffer oder eigenes Schlüsselwort wie "unter Druck", "Sievering") | mindestens die Hälfte der markierten Sätze | Setzung, misst Selbstkongruenz (Malär u. a. 2011, https://journals.sagepub.com/doi/10.1509/jmkg.75.4.35) |
| E6 | Aufgabe abgeschlossen, in einer Sitzung | `wortlink.stimme.abgeschlossenAm`, `dauerSek` | beide Aufgaben erledigt, Median unter fünf Minuten | Setzung (IKEA-Effekt nur bei Abschluss, Norton u. a.: https://myscp.onlinelibrary.wiley.com/doi/abs/10.1016/j.jcps.2011.08.002) |
| E7 | Lautlesen ohne Stolpern | Claim, Story kurz, beide Bios und die Caption des ersten Kanals laut gelesen, ein zweites Teammitglied hört zu | kein Satz neu zu schreiben | MARKENQUALITAET Kapitel 2 (Lautlese-Test) |
| E8 | Keine erfundene Geschichte | jedes Story-Element ist Verweis oder Lücke; kein öffentliches Feld trägt eine Lückenmarke | Selbsttest grün | Ableitung aus R7 Abschnitt 5 ("keine erfundene Origin Story") |
| E9 | Wort und Bild tragen eine Idee | `stimme.figur` ist gesetzt, stammt aus Zeichenidee und Typo-Richtung des gewählten Territoriums, und alle Beispiele mit Fall folgen ihr | Selbsttest grün, Schritt 9 zitiert `stimme.figur` in `idee.begruendung` | Ableitung aus der Leitidee der Zerlegung |

---

## 2. Geprüfte Alternativen und warum verworfen

| Nr. | Alternative | Was dafür spricht | Warum verworfen | Quelle |
|---|---|---|---|---|
| A1 | **Stimme als kurzes Adjektivprofil** (wenige Hundert Zeichen, wie Canva Brand Voice mit 500 Zeichen) | schnell, für jedes Werkzeug lesbar | Adjektive geben keine Regel und kein Beispiel. Genau diese Form erzeugt austauschbare KI-Sprache: Sprachmodelle liefern einander ähnlichere Antworten als Menschen, und KI macht viele Ergebnisse einander ähnlicher | Canva: https://www.canva.com/help/brand-voice/; R4 Abschnitt 1.4 und 4.4; Wenger und Kenett 2026: https://academic.oup.com/pnasnexus/article/5/3/pgag042/8529001; Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290 |
| A2 | **Persönlichkeitsregler als Kern der Stimme** (heute `s1` bis `s5` mit Griff bei 50; GV Brand Sprint mit vier Reglern) | vertraut, grafisch | Regler fragen nach Selbstbild, nicht nach Text. 101-Punkt-Regler ziehen zum Startwert und erhöhen Abbrüche. Im Bestand sind `begeistert` und `ernst` fast Spiegelbilder derselben Rechnung (`wb-plattform.jsx` Zeile 449). Regler bleiben nur als abgeleiteter Ausgang aus den Stimmproben für Schritt 9 und 10 | Liu und Conrad 2019: https://journals.sagepub.com/doi/abs/10.1177/0894439318755336; Funke, Reips, Thomas 2011: https://dl.acm.org/doi/abs/10.1177/0894439310376896; GV Sprint: https://www.reforge.com/blog/brief-how-to-define-your-brand-with-gv-s-3-hour-sprint; R3 Abschnitt 1.6 |
| A3 | **Stimme nur als Paare "X, aber nicht Y"** (Mailchimp; Koto bei Mews) | gutes Sprachbild, trennt Stimme und Ton | Liefert keine prüfbaren Regeln. Claude und ein Prüfer brauchen die harte Trennung "verbindlich" gegen "Ermessen" plus Beispiele je Anlass. Übernommen wird das Paar als Form des Ermessens und der Persönlichkeit aus Schritt 7 | Mailchimp: https://styleguide.mailchimp.com/voice-and-tone/; Koto, Mews: https://www.creativeboom.com/news/koto-just-proved-that-design-for-enterprise-platforms-doesnt-have-to-be-beige/; Frontify: https://www.frontify.com/en/guide/brand-guidelines-for-ai; R4 Ü4 |
| A4 | **Nur Werkzeuge, keine Regeln** (Wolff Olins, "tools not rules") | lebendige Sprache, Teams schreiben selbst | Funktioniert, wenn Menschen in Workshops geschult werden. Hier schreibt jede Woche Claude, und ein Prüfer muss ohne Urteil sperren können (Anrede, Zahl ohne Beleg, Grenzen). Übernommen wird der Geist: wenige harte Regeln, alles andere als Ermessen mit Beispiel | Wolff Olins: https://wolffolins.com/news/how-verbal-identity-helps-everyone-speak-brand; R4 Ü4 |
| A5 | **Claim aus vielen Vorschlägen wählen lassen** oder **eine einzige Lösung ohne Wahl** (Rand) | viele Optionen fühlen sich großzügig an; eine Lösung wirkt souverän | Viele gleichrangige Optionen überfordern, wenn keine klar beste markiert ist. Eine einzige Lösung verschenkt psychologisches Eigentum. Gewählt: zwei kuratierte Claims, einer empfohlen | Chernev u. a. 2015: https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf; Rand und NeXT: https://www.logodesignlove.com/next-logo-paul-rand; Fuchs, Prandelli, Schreier 2010: https://doi.org/10.1509/jmkg.74.1.65; R7 Abschnitt 5 |
| A6 | **Der Makler schreibt oder redigiert seine Texte frei** (Editor im Wort-Link) | maximale Beteiligung | Offene Editoren führen zu Vorlagen-Look und liegengebliebenen Aufgaben. Der Eigentumseffekt entsteht nur bei Abschluss und Kompetenzgefühl. Gewählt: eine Wahl, eine Wiedererkennung, optional ein eigener Satz | R4 Abschnitt 4 Punkt 5; Norton u. a. (URL oben); Fuchs u. a. (URL oben); R1 Abschnitt 4.8 |
| A7 | **Story per Formular** und Lücken durch plausible Sätze füllen | vollständige Texte ab dem ersten Lauf | Späte offene Fragen liefern kürzere, gleichförmigere Antworten; Geschichte gehört in den Workshop. Aufgefüllte Lücken sind erfundene Origin Stories | Galesic und Bosnjak 2009: https://academic.oup.com/poq/article-abstract/73/2/349/1939196; R7 Abschnitt 4 und 5; MARKENQUALITAET 4.7 |
| A8 | **Tonreferenz aus dem Musterbeispiel oder aus Marken anderer Makler** (Few-Shot) | hebt das Niveau sofort | Lange Beispiele erzeugen Gleichklang; das Musterbeispiel steht schon heute als Schablone im Regelcode (`wb-plattform.jsx` Zeile 213 und 215). Gewählt: seine eigenen Sätze als einzige Tonreferenz, in fester Rangfolge | MARKENQUALITAET 4.6; Doshi und Hauser 2024 (URL oben); KETTE_IST 2.4 |
| A9 | **Anrede als ein Merkmal je Makler** (heute `w.anrede`) | einfach | Führt belegt zu Du auf LinkedIn trotz Regel "Du auf Instagram, Sie sonst" (`wb-os-data.jsx` Zeile 212, `wb-reel.jsx` Zeile 14) | KETTE_IST 2.10; R5 Abschnitt 6 Punkt 6 |
| A10 | **Claim unabhängig von der visuellen Idee** (heute: Claim aus `HM_PF_FIGUR.claims`, Zeichen aus der Weltwahl) | Texter und Gestalter arbeiten getrennt | Führt belegt dazu, dass zum Zeitpunkt-Claim eine Hell-Dunkel-Kante gerechnet wird (KETTE_IST 2.7). Gewählt: Claim und Satzfigur aus derselben Kernidee und Zeichenidee wie das Bild | KETTE_IST 2.7; `06_territorien.md` Zeile 377; Wolff Olins, Lloyds (URL oben) |

---

## 3. Die gewählte Lösung

### 3.1 Prinzip

**Messen, wo Stimme entsteht: im Text.** Die Stimme eines Maklers ist nicht, wie er sich beschreibt, sondern wie er Sätze baut, wann er Zahlen nennt, wie er Nein sagt. Darum entsteht sie aus Stoffen in dieser **Rangfolge**:

1. seine gesprochenen Sätze, wörtlich: `workshop.zitate` mit Sprecher makler, dazu `richtung.zitatMakler` aus dem Richtungstermin;
2. seine geschriebenen Sätze: Pfade in `workshop.geschichte`, die auf seine Antworten verweisen, und `antworten.stimmproben[].eigenerSatz`;
3. seine Wahl in den Stimmproben (`antworten.stimmproben[].wert`);
4. die Story-Sätze des Teams, die er im Wort-Link markiert hat.

Die Rangfolge gilt auch für die Tonreferenz, die Claude in den Schritten 12, 13 und 17 bekommt (`stimme.stimmgabel`, 3.11). Ein markierter Satz des Teams steht nie vor einem Satz, den er selbst gesagt oder geschrieben hat.

| Schicht | Feld | Wer liest sie | Wie geprüft |
|---|---|---|---|
| Verbindlich | `stimme.verbindlich[]`, `stimme.figur`, `anrede`, `stimme.vermeiden[]`, `botschaften.claim` | Regeln, Claude, Texter | automatisch oder als Hinweis mit Team-Entscheid, jede Regel mit Test |
| Ermessen | `stimme.ermessen[]`, `stimme.beispiele[]`, `stimme.sagen[]` | Claude, Texter | Team und Creative Director, an Beispielen |
| Stimmgabel | `stimme.stimmgabel[]` (aus `eigeneWorte` und `anker`) | Claude als einzige Tonreferenz, Texter als Klangprobe | Rangfolge fest, Regeln schützen die Sätze |

Vier Entscheidungen unterscheiden das von heute und von Standard-Vorlagen (Ableitung):

1. **Keine Regel ohne Herkunft, kein Wert zweimal.** Jede verbindliche Regel nennt in `aus`, woher sie kommt: ein Attribut des Markenvertrags, ein Wert (`werte[i].nie`), eine Grenze, eine Anrede-Wahl, eine Stimmprobe, die Zeichenidee. Was Schritt 7 festgelegt hat, wird verwiesen, nicht neu formuliert.
2. **Eine Idee für Wort und Bild.** Claim und Satzfigur kommen aus Kernidee, Zeichenidee, Typo-Richtung und Serienidee des gewählten Territoriums (3.9). Schritt 9 leitet das Zeichen aus demselben Territorium ab und verweist auf die Figur.
3. **Der Makler entscheidet eine Sache und erkennt eine Sache wieder.** Die Claim-Wahl ist die einzige Entscheidung zwischen zwei kuratierten Optionen. Das Markieren ist eine Wiedererkennung an seinem eigenen Text (R3 Abschnitt 1.5).
4. **Schutz vor Erfindung ist Struktur, nicht Vorsatz.** Zitate kommen nur per Referenz, Zahlen nur aus `beweise`, Story-Elemente nur als Referenz oder Lücke.

### 3.2 Ablauf

| Stufe | Wer | Was passiert | Dauer |
|---|---|---|---|
| 8.0 Sperre | Regeln | Der Schritt öffnet, wenn `richtung.gewaehltId` gesetzt und `gate1` abgezeichnet ist. Der Wort-Link öffnet erst, wenn `markenvertrag.bestaetigtAm` gesetzt ist und jede Klärung, die ein öffentliches Feld dieses Schritts betrifft, entschieden ist (für Markus `k1`, 3.12) | 0 |
| 8.1 Stoff sammeln | Regeln | Stimm-Dossier: Korpus seiner Sätze nach der Rangfolge aus 3.1; Liste der Zahlen aus `beweise`; Grenzen; Anrede je Kanal; das gewählte Territorium mit Kernidee, Risiko, Zeichenidee, Typo-Richtung, Serienidee und `gate1.schaerfung` | Sekunden |
| 8.2 Anrede, Regler, Figur | Regeln | `anrede` aus `antworten.anredeJeKanal` (3.6), `stimme.regler` aus Stimmproben und Korpus (3.7), Vorschlag für `stimme.figur` aus dem Territorium (3.9) | Sekunden |
| 8.3 Entwurf | Claude, ohne Schlüssel der Regelpfad | alle übrigen Felder nach Schema (8.3), dazu acht bis zwölf Claim-Kandidaten mit Kritik | ein Aufruf, bis zwei Minuten |
| 8.4 Claim-Werkstatt | Senior-Texter | Kandidaten nach den Streichkriterien (3.10), Empfehlung und Gegenentwurf, Begründung in zwei Sätzen aus seinen Worten | 30 Minuten (Setzung) |
| 8.5 Redaktion | Senior-Texter | Beispiele, Story, Pressebaustein satzweise redigieren, jede Änderung mit Grund; Lautlese-Test mit einem zweiten Teammitglied | 45 Minuten mit Claude, 90 ohne (Setzung) |
| 8.6 Abnahme | Creative Director | Claim-Paar, Story kurz, Satzfigur und Fremdtexter-Probe (E1) abzeichnen | 15 Minuten (Setzung) |
| 8.7 Wort-Link | Makler | Claim wählen, zwei oder drei Sätze markieren, optional einen Satz in eigenen Worten | etwa vier Minuten (Setzung, gemessen) |
| 8.8 Einarbeiten | Senior-Texter, Regeln, CD | Claim setzen, Anker und Tongewichte setzen, Stimmgabel neu ordnen; Regeln schützen die markierten Sätze in allen Längen. Ist der Kernsatz nicht markiert, entsteht ein Eintrag an den CD (3.12) | 20 Minuten (Setzung), CD 10 Minuten falls nötig |
| 8.9 Übergabe | Regeln | Ausgang an 9, 10, 12, 13, 14; in Schritt 16 Teil von `quelle` | sofort |

**Takt mit Schritt 7.** Das Team bereitet Schritt 8 parallel zur Redaktion des Markenvertrags vor und merkt sich die Vertragsversion in `stimme.basisVersion`. Bestätigt der Makler genau diese Version ohne Anmerkung, öffnen sich die zwei Aufgaben im selben Besuch. Schreibt er eine Anmerkung der Art "Wortwahl oder Ton" (Schritt 7, Abschnitt 3.6), arbeitet das Team sie ein und öffnet die Aufgaben am selben oder nächsten Werktag. Ist die Stimme zum Versand des Vertrags noch nicht fertig, geht der Vertrag allein hinaus und die Aufgaben folgen mit eigener Nachricht (Setzung: höchstens ein Werktag Verzug).

### 3.3 Was Claude, Regeln und Team erzeugen

| Feld | Claude-Pfad | Regelpfad ohne Claude | Team | Makler |
|---|---|---|---|---|
| `anrede` | nie | immer (3.6), dieselbe reine Funktion, die Schritt 7 schon nutzt | prüft Kontext Erstkontakt | hat in Schritt 2 gewählt |
| `stimme.regler` | liefert je Dimension eine Korpus-Messung mit Begründung | rechnet Stimmproben und Messung (3.7) | entscheidet bei Abweichung über 40 | hat in Schritt 2 gewählt |
| `stimme.figur` | nie frei; bestätigt oder begründet eine Abweichung | leitet aus Zeichenidee, Typo-Richtung und Serienidee ab (3.9) | Senior-Texter formuliert, CD zeichnet ab | |
| `stimme.verbindlich[]` | formuliert Makler-eigene Regeln aus Grenzen, Werten, Attributen, Stimmproben, je mit `aus` | Grundregeln V1 bis V11 (3.8) als Daten, Makler-Teile aus Grenzen, Beweisen und Stimmproben | übersetzt `grenzenFrei` in Prüfwörter | |
| `stimme.ermessen[]` | vier bis sechs Nuancen, je mit `so`, `nicht`, `aus` | je Stimmprobe eine Nuance aus der Tabelle in 3.7, übrige als "Kommt aus der Redaktion" | schreibt oder redigiert | |
| `stimme.sagen[]` | Wörter aus Orten, Objekten, Belegen, eigenen Worten | Orte, Straßen, Objekte, Nomen aus eigenen Worten | streicht | |
| `stimme.vermeiden[]` | Konventionswörter aus `markenvertrag.falschWaere` | globale Klischee-Liste plus `falschWaere` | ergänzt | |
| `stimme.beispiele[]` | Pflichtsituationen (3.12) mit `kontext`, `belegRefs`, `probeRef` | `nicht` aus der Floskel-Liste, `so` als "Kommt aus der Redaktion: ..." (Beispiel dann intern) | redigiert, Lautlesen | |
| `stimme.eigeneWorte[]` | nur Referenz und `verwendung` | kopiert den Text wörtlich über die Referenz | setzt `verwendung` | |
| `stimme.anker[]` | nie | kopiert die markierten Sätze | | markiert |
| `stimme.stimmgabel[]` | nie | ordnet `eigeneWorte` und `anker` nach 3.1 | | |
| `botschaften.claim` | Kandidaten mit Kritik | Empfehlung gleich `claimIdee` des gewählten Territoriums, Gegenentwurf Lücke | Werkstatt, Paar | wählt |
| `botschaften.bio` | je aktivem Kanal eine Fassung | Rahmen aus `immotypen`, `bezirke`, Claim | redigiert | |
| `botschaften` übrige | `einSatz`, `dreiSaetze`, `boilerplate`, Einladungssatz | Rahmensatz aus `positionierung` mit Lücke | redigiert | |
| `story` | Elemente als Referenz oder Lücke, `kurzSaetze[]` mit `ton`, `mittel`, `lang` | setzt Elemente aus `workshop.geschichte`, `kurzSaetze` nur aus wörtlichen Sätzen, Rest Lücke | redigiert | markiert in `kurz` |
| `presse` | `kurzbio`, drei Themen mit `belegRefs`, `beispielzitatRef` | `kurzbio` aus Name, Objekten, Orten und `positionierung.was`; Themen je aus einem Beweis; Zitat nur mit `oeffentlich` ja | prüft | |

**Regelpfad ohne Mustersätze.** Die Satzbausteine in `HM_PF_FIGUR` (Haltung, Claims), die Beispielsätze in `hmPfStimme` (Zeile 469 bis 479), die Sätze in `hmPfStory` und `hmPfBotschaften` (Zeile 677 und 690 bis 694) und die Satzvorlagen der Stimmproben aus Schritt 2 (`hmStimmproben`) werden in v2 nie ausgegeben. Beispiele: "Zeit ist Teil des Preises." und "Erst verstehen. Dann verkaufen." stehen heute bei jedem Kenner (`wb-plattform.jsx` Zeile 215). Der Regelpfad übernimmt nur, was wörtlich auf eine Quelle zurückgeht, und setzt sonst eine Lücke mit Arbeitsauftrag:

- "Kommt aus dem Workshop: <was>" heißt: Der Stoff des Maklers fehlt.
- "Kommt aus der Redaktion: <was>" heißt: Der Stoff liegt vor, der Text fehlt.
- "Kommt aus der Klärung <id>: <was>" heißt: Der Stoff liegt vor, darf aber erst nach einer Entscheidung des Maklers öffentlich werden.

Ein Feld mit Lückenmarke ist intern. Solange ein Feld, das der Makler im Wort-Link sieht, eine Lücke trägt, öffnet sich die Aufgabe nicht.

### 3.4 Was der Makler sieht und tut

**Ort.** Derselbe Wort-Link wie der Markenvertrag: Makler-Ansicht der Werkbank (`wb-app.jsx`, Rolle "makler"), Bereich Marke, Ansicht "Vertrag" (Schritt 7, Abschnitt 3.4). Nach der Bestätigung erscheint unter dem Vertrag ein zweiter Teil. Kein Konto bei einem fremden Werkzeug, gebaut für das Telefon mit einer Hand.

**Anrede gegenüber dem Makler.** Offen beim Owner (00_ZERLEGUNG Kapitel 7, Punkt 1). Wie in Schritt 7 folgt der Wort-Link bis zur Entscheidung der Anrede, die der Makler für seine Website gewählt hat. Die Texte unten sind für Markus in Sie geschrieben.

**Gestaltung.** Eine Spalte, Werkbank-Schrift, nicht seine künftige Markenschrift: Beide Claims stehen in exakt derselben Form, damit er Worte vergleicht und nicht Form (Hsee 1996, Evaluability: https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf). Keine Eyebrows, keine Kartenrahmen, kein Schatten, keine Verläufe. Die Empfehlung ist ein Satz unter dem Claim, keine Plakette darüber. Symbole nur als SVG mit 1,5 Pixel Strich.

**Einstieg** (erscheint direkt nach dem Klick "Ja, daran messen wir"):

```text
Jetzt die Worte.
Zwei kurze Aufgaben, zusammen etwa vier Minuten. Danach schreiben wir
jeden Text für Sie in genau diesem Klang.
[ Beginnen ]      Später
```

**Später.** "Später" schließt den Teil ohne Nachfrage. Eine Erinnerung geht nach zwei Werktagen über denselben Weg, auf dem der Wort-Link kam, mit einem Satz und dem Link. Nach vier Werktagen ruft der Senior-Texter an. Frist: fünf Werktage vor dem geplanten Beginn von Schritt 9, weil Schritt 9 erst mit `botschaften.claim` öffnet (`09_idee.md` Zeile 73). Die Erinnerungen stehen in `wortlink.stimme.erinnerungen[]` (Setzung für alle drei Werte).

**Aufgabe 1: der Claim.** Beide Claims groß, darunter je drei Anwendungen in echten Sätzen des Maklers:

1. als Kopfzeile unter seinem Namen (LinkedIn-Profil, sein erster Kanal),
2. als letzte Zeile unter seiner kurzen Story,
3. unter einem belegten Fall aus `beweise`, gesetzt als Spanne nach der Satzfigur.

Keine Anwendung auf weißer Fläche allein, weil Worte wie Zeichen nur im Kontext beurteilt werden (Mozilla Open Design: https://blog.mozilla.org/opendesign/roads-not-taken/). Die Frage ist eine Situation, keine Geschmacksfrage: "Lesen Sie beide einmal laut. Welchen Satz würden Sie am Ende eines Erstgesprächs sagen?" Unter jedem Claim ein Knopf "Diesen Satz nehme ich". Darunter genau ein Ausweg, der Link "Keiner passt". Er öffnet ein Feld mit einem ehrlichen Satz vorab: "Dann schreiben wir Ihnen binnen 2 Werktagen einen neuen Satz. Sie bestätigen ihn hier mit einem Tipp. Was fehlt Ihnen? Ein Satz genügt." Damit ist die Aufgabe für heute abgeschlossen, und er weiß, dass ein zweiter, kurzer Schritt folgt. Das Team legt den neuen Satz im selben Wort-Link vor, mit einem einzigen Knopf "So nehme ich ihn". Schritt 9 bleibt bis dahin gesperrt (Setzung).

**Aufgabe 2: die Stimmgabel.** Die kurze Story, jeder Satz auf einer eigenen Zeile, antippbar.

```text
Klingt das nach Ihnen?
Ihre Haltung in vier Sätzen. Tippen Sie die an, die genau so klingen
wie Sie. Zwei oder drei.
[vier Sätze, einzeln antippbar]                      2 von höchstens 3
  unter einem angetippten Satz erscheint: So würde ich es sagen
[ Fertig ]  (aktiv ab zwei)
Keiner passt
```

Warum zwei oder drei (Ableitung): Einer allein ist keine Stimmgabel, weil ein einzelner Satz nur einen Ton trägt. Vier von vier wäre keine Wiedererkennung mehr. Auf dem Bildschirm stehen neben "Fertig" nur ein Ausweg und die vier Sätze. "Keiner passt" öffnet ein Feld mit dem Satz vorab: "Dann schreiben wir die vier Sätze neu. Sie sehen sie vor Ihrem Termin am [Reveal-Datum], ohne weitere Aufgabe." Auch damit ist die Aufgabe abgeschlossen. "So würde ich es sagen" erscheint erst unter einem Satz, den er angetippt hat, und öffnet ein Feld für genau diesen einen Satz; er landet in `stimme.eigeneWorte` mit der Art `wortlink` und geht an das Team.

**Abschluss** (der Moment):

```text
So klingen Sie ab jetzt.
[Seine LinkedIn-Kopfzeile mit dem gewählten Claim]
[Die markierten Sätze]
An diesen Sätzen und an dem, was Sie im Workshop gesagt haben, messen
wir jeden Text, den wir für Sie schreiben.
Als Nächstes entstehen Ihre Idee und Ihr Feed. Wir zeigen sie Ihnen
am [Datum des Reveals aus auftrag.termine].
```

Der Abschluss zeigt die Bio des ersten Kanals: festgelegt in der Workshop-Klärung zu den Kanälen (K3 "Mehr Kanäle, als die Zeit trägt", `04_workshop.md` Zeile 309), sonst der erste Kanal in `antworten.anredeJeKanal` (F14 zeigt nur die sichtbaren Kanäle aus F13 `kanaele`, in deren Reihenfolge, `02_fragebogen.md` Zeile 285), sonst die Zeile "Website und E-Mail". Für Markus ist K3 offen; die Zeile "LinkedIn zuerst" ist laut Schritt 4 ein unbestätigter Team-Satz. Die LinkedIn-Kopfzeile steht im Abschluss, weil LinkedIn in seinen Kanälen an erster Stelle steht (Seed `kanaele`), nicht wegen der Workshop-Zusammenfassung.

**Was er nie sieht:** die internen Claim-Kandidaten, Regler, Prüfwörter, Lücken, fremde Beispiele, eine Frage nach Geschmack, eine Wahl von Schrift oder Farbe.

### 3.5 Was das Team tut

| Rolle | Aufgabe | Zeit je Makler (Setzung) |
|---|---|---|
| Senior-Texter | Claim-Werkstatt, Satzfigur, Redaktion, Lautlesen, Einarbeiten, Antwort auf "Keiner passt" | 100 Minuten mit Claude, 145 ohne |
| Zweites Teammitglied | hört beim Lautlesen zu; zweite Stimme in der Fremdtexter-Probe | 15 Minuten |
| Creative Director | Abnahme Claim-Paar, Story kurz, Satzfigur, Fremdtexter-Probe | 15 Minuten |
| Stratege aus Schritt 7 | beantwortet eine Anmerkung "Wortwahl oder Ton", wenn vorhanden | 10 Minuten, falls nötig |

Das Pentagram-Prinzip "wer macht, spricht mit dem Kunden" (R1 Abschnitt 2.5, https://www.pentagram.com/about) gilt auch hier: Der Senior-Texter, der die Stimme schreibt, beantwortet den Satz aus "Keiner passt" und führt den Anruf nach "Später".

### 3.6 Die Anrede-Funktion

**Ort, verbindlich mit Schritt 7 entschieden.** `hmAnrede`, `hmAnredeInfo` und `hmAn` sind genau einmal definiert, in `ui_kits/werkbank/wb-vertrag.jsx`, wie `07_positionierung.md` Abschnitt 8.1 es festlegt ("einmal definiert, Schritt 8 füllt die Regel"). Schritt 8 besitzt die Daten `anrede` und liefert in `wb-stimme.jsx` die Funktion, die sie baut (`hmAnredeRegel`), und den Prüfer (`hmAnredePruefen`). Alle Aufrufe geschehen zur Laufzeit, darum ist die Ladefolge der Skripte ohne Build unerheblich. Der Selbsttest zählt die Definitionen (8.4, Test 2).

**Keine Rückwärtskante zu Schritt 7.** Schritt 7 läuft vor Schritt 8 und ruft `hmAnrede(mid, "website")` für das Versprechen (`07_positionierung.md` Zeile 105 und 199). Zu diesem Zeitpunkt gibt es `marke2[mid].anrede` noch nicht. Gelöst durch die Reihenfolge der Lesequellen in `hmAnrede`:

1. nach der Freigabe in Schritt 16: `quelle.anrede`;
2. sonst, wenn Schritt 8 geschrieben hat: `marke2[mid].anrede`;
3. sonst: `hmAnredeRegel(antworten)`, frisch gerechnet aus `antworten.anredeJeKanal` von Schritt 2, ohne etwas zu speichern.

`hmAnredeRegel` ist rein: gleiche Antworten, gleiches Ergebnis. Schritt 7 liest damit Daten aus Schritt 2 (Kante 2 nach 7, im Vertrag vorhanden; `07_positionierung.md` Zeile 408 führt den Eingang), nicht das Feld `anrede` aus Schritt 8. Schritt 8 schreibt die Regel beim Lauf fest und prüft, dass sie mit der Form übereinstimmt, in der das bestätigte Versprechen steht (P1). Weicht sie ab, weil `anredeJeKanal` nach der Bestätigung des Vertrags geändert wurde, sperrt P1 und das Team klärt das mit dem Makler, bevor der Wort-Link weitergeht. Datenbesitz und Regel bleiben bei 8, es gibt keine zweite Logik.

**Daten** (`marke2[mid].anrede`, nach Schritt 16 in `quelle`):

```js
anrede = {
  kanaele: {                         // aus antworten.anredeJeKanal, je sichtbarem Kanal
    linkedin:  { form: "Sie", vorname: false },
    instagram: { form: "Sie", vorname: false }
  },
  kontexte: {
    website:     { form: "Sie", vorname: false, grund: "gewählt" },   // F14, Zeile "Website und E-Mail"
    erstkontakt: { regel: "wie Eingangskanal, sonst website" },
    presse:      { form: "Dritte" }
  },
  schreibweise: "Sie, Ihnen, Ihr groß; du, dich, dein klein",
  gruss: {                           // V13, Setzung, bei Markus aus Sie überall und Milieu im Seed
    sie: { erstkontakt: "Sehr geehrte Frau {Titel} {Name},", folge: "Guten Tag, Frau {Name},", schluss: "Mit freundlichen Grüßen" },
    du:  { erstkontakt: "Hallo {Vorname},", folge: "Hallo {Vorname},", schluss: "Liebe Grüße" }
  },
  fehlend: [],
  quelle: "antworten.anredeJeKanal", version: 1
}
```

**Funktionen:**

```js
// wb-vertrag.jsx (Schritt 7), einmal definiert
hmAnrede(mid, kontext, opt)      // "Sie" | "Du" | "Dritte"
hmAnredeInfo(mid, kontext, opt)  // { form, vorname, grund, luecke }
hmAn(mid, kontext, sie, du)      // wählt den passenden Text
// wb-stimme.jsx (Schritt 8)
hmAnredeRegel(antworten)         // baut marke2[mid].anrede
hmAnredePruefen(text, kontext, mid)  // { ok, treffer[], hinweise[] }
```

- `kontext` ist ein Kanal (`instagram`, `linkedin`, `facebook`, `tiktok`, `youtube`) oder ein fester Kontext (`website`, `erstkontakt`, `presse`, `newsletter`, `intern`). `story` gilt wie `instagram`, `newsletter` wie `website`, `intern` ist neutral.
- `erstkontakt` folgt dem Kanal, über den die Anfrage kam (`opt.eingang`); ohne Angabe gilt `website`.
- Liest vor der Freigabe den Entwurf, danach nur die eingefrorene Quelle aus Schritt 16.
- **Keine Neutral-Form.** Die heutige Form "neutral" (`wb-plattform.jsx` Zeile 313) entfällt. Formen sind Sie, Du und für Presse die dritte Person.
- **Website.** F14 in Schritt 2 fragt immer die Zeile "Website und E-Mail" mit ab (`02_fragebogen.md` Zeile 285 und 464, Datenfeld Zeile 577). Fehlt der Wert trotzdem, gilt: alle Kanäle gleich, dann diese Form; gemischt, dann Sie; Eintrag in `anrede.fehlend`.
- **Fehlender Kanal.** Nutzt ein Abnehmer einen Kanal ohne Wahl, liefert die Funktion die Website-Form, schreibt den Kanal in `anrede.fehlend`, der Selbsttest wird gelb. Es wird nicht still geduzt.

**Prüfer.** `hmAnredePruefen` zählt eindeutige Formen: Ihnen, Ihr und seine Beugungen, "Sie" mitten im Satz; du, dich, dir, dein und seine Beugungen. Im Kontext `presse` ist jede Form der direkten Anrede ein Treffer. "Sie" am Satzanfang ist mehrdeutig (dritte Person). Das ist kein Fehler, sondern ein **Hinweis** (P12): Der Texter prüft, ob der Satz stolpert, und nennt im Zweifel das Subjekt ("Die Erben kamen ...").

**Abnehmer, die heute eine eigene Logik haben und künftig `hmAnrede` rufen:** `hmPfAnrede` (`wb-plattform.jsx` Zeile 309), `hmAnredeVon` (`wb-produktion.jsx` Zeile 62), `hmCaption` (`wb-os-data.jsx` Zeile 212), Reel-Texte (`wb-reel.jsx` Zeile 14), `bio` und `anrede` in `hmWeg` (`wb-data.jsx` Zeile 244 und 296), dazu Hook-Formeln und Kanalplan (Schritt 12), Captions (Schritt 13 und 17), Markenbuch (Schritt 14), Website (Schritt 16). Das Versprechen in Schritt 7 ruft dieselbe Funktion, liest dabei aber Stufe 3 (Antworten aus Schritt 2), weil Schritt 8 noch nicht gelaufen ist.

**Grußformeln** hängen an der Anrede-Form und stehen darum hier, als Teil von V13 (3.8): `anrede.gruss = {sie: {erstkontakt, folge, schluss}, du: {...}}`, von `hmAnredeInfo` mitgeliefert.

### 3.7 Stimmproben und Regler

**Eine Fassung, Quelle Schritt 2.** Es gilt allein `02_fragebogen.md` Abschnitt 3.5 (Zeile 218 bis 246) mit dem Datenfeld in Zeile 574 und der Entscheidung D8 in Zeile 598. Dieses Dokument wiederholt die Paare nicht, sondern liest sie: vier Paare, je eines für einen Regler, P1 `ernst` (leicht gegen ernst), P2 `persoenlich` (förmlich gegen persönlich), P3 `begeistert` (zurückhaltend gegen begeistert), P4 `sachlich` (Gefühl gegen Beleg). Die Wahl ist binär: Pol A 25, Pol B 75, keine Wahl `null`, nie 50. `links` hält nur fest, auf welcher Seite des Bildschirms Pol A stand; der Wert folgt immer dem Pol. Respektvoll gegen pointiert ist keine Probe, sondern die verbindliche Regel V7.

**Warum nicht wieder nachziehen.** Die dritte Fassung dieses Dokuments und die Fassung von Schritt 2 haben sich jeweils an die Vorfassung des anderen angepasst und sind aneinander vorbeigelaufen. Darum gilt ab jetzt: Schritt 2 besitzt die Proben (Wortlaut, Pole, Werte), Schritt 8 besitzt nur deren Wirkung (Tabelle unten). Die Fassung liegt dem Owner als Entscheidung vor (9, Punkt 2). Ändert sich künftig etwas an den Proben, ändert es Schritt 2 mit einem Eintrag in 00_ZERLEGUNG, und diese Tabelle liest die neue Fassung über `HM_V2_STIMMPROBEN` (Konstante aus Schritt 2), nicht über eine eigene Kopie.

**Warum diese Fassung die bessere ist (Ableitung).** `begeistert` und `sachlich` sind getrennt gemessen. Damit entfällt die Spiegelung, die der Bestand heute rechnet (`hmPfRegler`, `wb-plattform.jsx` Zeile 449: `begeistert` gleich 100 minus `ernst`), und die "offene Grenze" der dritten Fassung. Binär statt vier Stufen passt zu einer Probe, die Wiedererkennung misst, nicht Stärke (NN/g, https://www.nngroup.com/articles/tone-of-voice-dimensions/).

**Wirkung je Probe** (`HM_STIMMPROBE_WIRKUNG`). Der Wert eines Reglers kann nach der Messung im Korpus zwischen 25 und 75 liegen. Darum wirkt er in drei Bereichen: bis 40, 41 bis 59 (keine eigene Nuance, es gelten die übrigen Regeln), ab 60 (Setzung).

| Probe, Regler | bis 40 | ab 60 | Wirkung auf `beispiele` und `verbindlich` |
|---|---|---|---|
| P1 `ernst` | Ermessen: eine trockene Untertreibung je Text erlaubt, auch im Abraten ("Das Haus läuft Ihnen nicht davon.") | verbindlich M10: keine Ironie, kein Wortspiel in Abraten und Absage (Prüfung Team) | Beispiel "Abraten" folgt dem Wert |
| P2 `persoenlich` | Ermessen: Sachform, zuerst die Unterlagen, dann die Person ("Für eine Einschätzung brauche ich den Grundbuchsauszug.") | Ermessen: Ich-Satz zuerst, direkter Einstieg ("Ich komme gern vorbei und sehe mir das Haus an.") | Beispiel "Erste Antwort" folgt dem Wert |
| P3 `begeistert` | Ermessen: kein Wertungswort in Texten über einen Abschluss, nur Ort, Dauer, Ergebnis | Ermessen: ein Wertungswort je Abschluss-Text erlaubt, nie aus der Klischee-Liste | Beispiel "Caption" zu einem Abschluss folgt dem Wert |
| P4 `sachlich` | Ermessen: der Fall als Szene, eine Quelle je Text genügt | verbindlich M11 als Hinweis: jede Aussage über den Markt nennt Ort, Zeitraum oder Quelle im selben Satz | Beispiele "Absage" und "Caption" folgen dem Wert; Schritt 12 liest den Eintrag für eine Meinungs-Serie |

**Eigener Satz.** Wer "Keiner von beiden. So würde ich es sagen:" wählt, liefert `antworten.stimmproben[i].eigenerSatz`. Der Wert der Probe bleibt `null` (so Schritt 2). Der Satz geht in den Korpus, wird Eintrag in `stimme.eigeneWorte` mit der Art `stimmprobe` und ist die Tonreferenz für das Pflichtbeispiel derselben Situation: Das `so` dieses Beispiels muss ihm näher sein als den Polen der Vorlage (Prüfung Team, P10).

**Satzvorlagen sind Schablonen.** Die acht Sätze der Stimmproben bekommt jeder Makler mit seinem Grätzl gefüllt. Sie stehen darum in `HM_STIMME_SCHABLONEN` und dürfen in keinem Ausgang erscheinen (P7), außer als sein eigener Satz.

**Regler.** Der Vertrag verlangt vier Werte von 0 bis 100. Sie dienen nur Schritt 9 (`brief.tonprofil`) und Schritt 10 (die Schrift folgt der Stimme).

| Regler | 25 heißt | 75 heißt | Wahl aus | Messung im Korpus (ab acht ganzen gesprochenen Sätzen) |
|---|---|---|---|---|
| `ernst` | leicht, trockene Untertreibung erlaubt | ernst, ohne Pointe | P1 | nur im Claude-Pfad mit Begründung |
| `persoenlich` | förmlich, Sache im Vordergrund | persönlich, Ich und Erlebtes | P2 | Anteil der Sätze in Ich- oder Wir-Form |
| `begeistert` | zurückhaltend | begeistert | P3 | Anteil der Sätze mit Wörtern aus `HM_STIMME_VERSTAERKER`, doppelt gewichtet, höchstens 100 |
| `sachlich` | erzählend, Gefühl | belegend, mit Quelle | P4 | Anteil der Sätze mit Zahl, Ort, Datum oder Quelle; Freitexte aus dem Fragebogen zählen mit |

Dieselben Messfunktionen nutzt Schritt 2 für den Bau der Paare (Q14 dort). So misst die Probe genau die Dimension, die der Regler meint.

**Rechnung** (Setzung, nach den ersten fünf Maklern prüfen):

- Wahl: Wert der Probe, 25 oder 75. Keine Wahl ergibt `null`, nie 50 (R3 Abschnitt 4 Punkt 4).
- Wert: Mittel aus Wahl und Messung, sonst der vorhandene Teil, sonst `null` als Lücke. Jeder Regler hat eine eigene Probe; keiner wird aus einem anderen gerechnet.
- Weichen Wahl und Messung um mehr als 40 ab, entsteht ein Eintrag in `stimme.ermessen` ("Selbstbild und Sprache weichen ab: ...") und das Team entscheidet. Gilt dann die Sprache, folgt das der Actual-Self-Regel (Malär u. a. 2011, URL oben).

### 3.8 Verbindlich und Ermessen

**Grundregeln für jeden Makler** (Daten in `HM_STIMME_GRUNDREGELN`; Makler-eigene Regeln kommen dazu). `pruefung` ist "auto" (sperrt ohne Urteil), "hinweis" (meldet Kandidaten, Team entscheidet) oder "team".

| Nr. | Regel | aus | Prüfung |
|---|---|---|---|
| V1 | Jeder öffentliche Text folgt `hmAnrede` seines Kontexts. | `anrede` | auto, `hmAnredePruefen` |
| V2 | Der Claim erscheint nur wortgleich, höchstens einmal je Fläche, nie verlängert, nie als Hook, nie mit Anrede. | `botschaften.claim` | auto |
| V3 | Keine Zahl ohne Eintrag in `beweise`. Zahlen mit Prüfstatus "Selbstauskunft" stehen nur in Entwürfen; veröffentlicht wird erst nach "Unterlage geprüft". Beträge immer mit Währung. Jede Kennzahl höchstens einmal je Text. | `beweise` (Schritt 7) | auto, ohne pauschal erlaubte Zahlen (heute `wb-plattform.jsx` Zeile 1045) |
| V4 | Kein Wort aus `stimme.vermeiden`. Die globale Klischee-Liste ist genau eine Konstante (`HM_STIMME_KLISCHEES`), die Plattform, Claude-Prompt, Schritt 12 und 17 lesen. | MARKE_SCHEMA, MARKENQUALITAET 4.4, R5 Abschnitt 4 Punkt 5 | auto |
| V5 | Kein Thema, das in `antworten.grenzen` auf "nie" steht oder in `grenzenFrei` genannt ist. Den Freitext übersetzt das Team in Prüfwörter; Claude bekommt ihn wörtlich. Entscheidungen aus `workshop.klaerungen` gelten über den wirksamen Wert (`hmWirksam`, `04_workshop.md` Abschnitt 5.4). | `grenzen`, `grenzenFrei`, `klaerungen` | auto über Prüfwörter, Team |
| V6 | Ein Fehler oder eine Schwäche steht in keinem Text vor dem ersten Beleg und nur, wenn die Grenze "Fehler und Learnings" auf "zeigen" steht (Pratfall). | Aronson, Willerman, Floyd 1966, https://link.springer.com/article/10.3758/BF03342263; MARKENQUALITAET 4.4 | auto (Reihenfolge der Sätze) |
| V7 | Respekt ist nicht verhandelbar: nie ein Mitbewerber mit Namen, nie abwertend über Personen, `positionierung.andersAls` nie wörtlich in öffentlichen Texten. Pointiert heißt: zugespitzt über eine Konvention, nie über Menschen. | `positionierung.andersAls`; ersetzt die frühere Probe "respektvoll oder pointiert" (`02_fragebogen.md` D8) | auto (Namens- und Wortgleichheit), Team |
| V8 | Keine Selbstzuschreibung per Adjektiv ("ich bin genau, erfahren, ehrlich"). Die drei Wörter aus `antworten.worte` zeigen sich im Satzbau. `rolle` ist Richtung, nie Tatsache. | `worte`, `persoenlichkeit`, `rolle`; Malär u. a. 2011 | auto (Muster "ich bin" plus Wort), Team |
| V9 | Höchstens 20 Wörter je Satz, keine Ausrufezeichen, Emojis oder Gedankenstriche. | MARKENQUALITAET 4.7, UNIO-Regeln | auto |
| V10 | Keine zwei Adjektive hintereinander. | MARKENQUALITAET 4.7 | hinweis: Wortliste `HM_STIMME_ADJEKTIVE` (Wertungsadjektive der Branche) plus Endungsmuster -ig, -lich, -isch, -bar, -voll, -haft vor einem großgeschriebenen Wort. Ohne Wortartenerkennung meldet das Kandidaten, das Team entscheidet |
| V11 | Kundenstimmen nur wörtlich, mit Datum und Freigabe. Eine Wiedergabe des Maklers ("Kunden sagen ...") erscheint nie als Kundenzitat. | `beweise` mit Quelle Kundenstimme | auto |
| V12 | Zahlen folgen `stimme.zahlen`: eine Schreibweise je Größe, nie gemischt, in allen Texten und im Bildtext gleich. Spannen mit "bis", nie mit Strich. Im Fließtext beginnt kein Satz mit einer Ziffer; im Bildtext und auf Karussellseiten darf die Ziffer vorn stehen. | Typo-Richtung des gewählten Territoriums; MARKENQUALITAET 4.7 | auto über Muster (Zahlwort vor Zeiteinheit, Betragsform gegen `stimme.zahlen`), Rest Hinweis (P12) |
| V13 | Österreichisches Standarddeutsch: Wortschatz und Rechtsbegriffe aus Österreich, Grußformeln aus `anrede.gruss`, akademische Titel aus der Anfrage übernommen. Bundesdeutsche Formen aus `HM_STIMME_AT` sind Treffer. | Markt Wien, Zielgruppe aus `einsicht.zielgruppe`; eigene Ableitung | auto über Gegenliste, Grußformel auto, Titel Team |

**`stimme.zahlen`** (verbindlich je Makler, von der Regel aus `typoRichtung` abgeleitet, vom Senior-Texter bestätigt). Grundform, wenn die Typo-Richtung Ziffern trägt ("Ziffern tragen", "feste Ziffernbreite"):

| Größe | Form | so | nicht |
|---|---|---|---|
| Dauer | Ziffer, Einheit ausgeschrieben, auch unter 13 | 2 Jahre, 11 Wochen | zwei Jahre, elf Wochen, 2 J. |
| Betrag | volle Ziffer mit Tausenderpunkt, danach "Euro"; Wert aus der Unterlage, nicht gerundet (Attribut Genau) | 600.000 Euro, 4.200.000 Euro | 0,6 Millionen Euro, 4,2 Mio., 600k, € 600.000 |
| Anteil | Ziffer und "Prozent" | 8 Prozent | acht Prozent, 8 % |
| Anzahl mit Belegcharakter | Ziffer | 14 Abschlüsse, 6 bis 8 der letzten 10 | vierzehn Abschlüsse, 6-8 |
| Fläche | Ziffer und m² | 140 m² | 140 Quadratmeter, 140 qm |
| Zeit und Datum | 11 Uhr, 11. September 2026, Monatsnamen österreichisch | Jänner | Januar, 11:00 h |
| Zählwort ohne Beleg | Wort bis zwölf | zwei Dinge, drei Fragen | 2 Dinge |

Ohne ziffernbetonte Typo-Richtung gilt die Duden-Grundregel (Zahlen bis zwölf als Wort), aber dieselbe Betragsform. Warum die volle Ziffer beim Betrag (Ableitung): Die Belege im Seed sind gerundet ("4,2 Mio."). Veröffentlicht wird ein Betrag erst mit Unterlage (V3); dann steht der genaue Wert aus dem Kaufvertrag da, und die volle Ziffer zeigt diese Genauigkeit. Bis dahin ist die gerundete Zahl im Entwurf als Selbstauskunft markiert.

**`HM_STIMME_AT`** (Setzung für Makler in Wien, vom Team gepflegt): Kaufanbot statt Kaufangebot, Grundbuchsauszug statt Grundbuchauszug, Liegenschaft, Wohnungseigentum und Wohnungseigentümer, Parifizierung, Nutzwertgutachten, Zinshaus statt Mehrfamilienhaus, Stiege und Stiegenhaus statt Treppe und Treppenhaus, Top statt Wohnungsnummer, Hausverwaltung, Notariat, Jänner, heuer, Erdgeschoß; nie Courtage, nie Maklercourtage. Das sind Begriffe des österreichischen Rechts und Sprachgebrauchs (eigene Ableitung, keine externe Quelle in der Recherche). Grußformeln (Setzung, `anrede.gruss`): im Sie-Kontext schriftlich im Erstkontakt "Sehr geehrte Frau {Titel} {Name}," und "Mit freundlichen Grüßen", ab dem zweiten Kontakt "Guten Tag, Frau {Name}," und "Beste Grüße"; nie "Hallo", "Liebe Frau" oder "LG" im Erstkontakt, auch nicht in Absage und Abraten. "Grüß Gott" nur gesprochen (Reel, Telefon, Video). Im Du-Kontext "Hallo {Vorname}," und "Liebe Grüße"; "Servus" nur, wenn es im Korpus seiner gesprochenen Sätze vorkommt.

**Satzfigur** (`stimme.figur`, verbindlich je Makler, aus dem Territorium abgeleitet, 3.9).

**Ermessen** ist, was Urteil braucht. Jeder Eintrag hat `nuance`, `so`, `nicht` und `aus`. Ein Ermessen ohne Beispiel gibt es nicht. Pflichtquellen: je Stimmprobe mit Wert bis 40 oder ab 60 ein Eintrag oder eine verbindliche Regel (Tabelle in 3.7), `antworten.erfolge`, `persoenlichkeit[].heisstNicht`, das Risiko des Territoriums, dazu für jeden Makler zwei Handwerkseinträge:

- **Rhythmus.** Auf einen Erklärsatz folgt ein kurzer Satz. Nie drei Sätze gleicher Länge hintereinander. So: "Einer Erbengemeinschaft habe ich geraten zu warten, statt unter Druck zu verkaufen. Einen Auftrag gab es dafür zunächst nicht." Nicht: "Die Erben wollten verkaufen. Ich habe abgeraten. Sie haben gewartet. Es hat sich gelohnt."
- **Satzzeichen.** Höchstens ein Doppelpunkt je Text, keiner im Claim und in der Bio. Semikolon nie. Fragezeichen nur im Hook und in der Frage einer Redaktion. So: "Bevor ich etwas zum Preis sage, möchte ich zwei Dinge verstehen: wer mitentscheidet und ob etwas drängt." Nicht: "Mein Rat: warten. Das Ergebnis: 600.000 Euro. Die Lehre: Geduld."

**Wiederkehrende Wendungen** (`stimme.wendungen[]`, Teil von `sagen`, mit Frequenzregel). Neben dem Claim darf keine zweite Formel entstehen, die jeder Text wiederholt; wer sechs Texte liest, soll einen Claim hören, nicht drei. Jede Wendung hat `{text, herkunft, hoechstens, nie[]}`. Grundregel: höchstens einmal je Fläche (ein Beitrag, eine Seite, eine Nachricht), nie in der Bio, nie im selben Absatz wie der Claim. P2 zählt die Wendungen über alle öffentlichen Felder und meldet, wenn eine Wendung in mehr als der Hälfte der Beispiele steht.

### 3.9 Eine Idee für Wort und Bild: die Satzfigur

**Eingang.** Aus dem gewählten Territorium liest dieser Schritt nicht nur `claimIdee`, sondern `kernidee`, `risiko`, `zeichenIdee`, `zeichenSkizze`, `typoRichtung`, `serienIdee` und aus Gate 1 `schaerfung` (Abweichung AE2 in 5.2).

**Regel.** Aus Zeichenidee und Typo-Richtung wird eine sprachliche Figur gebildet, die dieselbe Ordnung hat wie das Bild. Sie ist verbindlich, wenn sie prüfbar ist, sonst Ermessen mit Beispielen. Datenform:

```js
stimme.figur = {
  name: "",                 // zwei bis vier Wörter
  regel: "",                // ein Satz, prüfbar
  reihenfolge: [""],        // Glieder der Figur
  gilt: "",                 // für welche Texte
  pruefung: "auto" | "hinweis" | "team",
  aus: { territoriumId: "", zeichenIdee: "", typoRichtung: "", serienIdee: "", schaerfung: "" },
  so: [""], nicht: [""],
  fuerSchritt9: ""          // der Satz, den Schritt 9 in idee.begruendung übernimmt
}
```

**Verweis an Schritt 9.** Schritt 9 liest `stimme.figur` (8 ist dort schon Vorgänger) und schreibt in `idee.begruendung` einen Eintrag `{entscheidung: "Zeichen", weil: stimme.figur.fuerSchritt9, quelle: "8: stimme.figur"}`. Damit folgt das Zeichen sichtbar aus derselben Idee wie die Sprache. Heißt die Satzfigur anders als das Zeichen, sperrt Schritt 9 nicht, meldet aber einen Widerspruch an den CD.

### 3.10 Die Claim-Werkstatt

**Stoff.** `claimIdee`, `kernidee`, `risiko` und `schaerfung` des gewählten Territoriums (Gate 1 abgezeichnet), `versprechen`, seine eigenen Worte, `markenvertrag.leitidee` (nur als Prüfung, dass der Claim sie nicht wiederholt).

**Streichkriterien in dieser Reihenfolge** (hart, jedes streicht):

1. Wort aus der Klischee-Liste oder aus `stimme.vermeiden`.
2. Anrede im Claim. Der Claim steht auf allen Kanälen gleich.
3. Mehr als fünf Wörter, eine Zahl oder eine Frage.
4. Schablone und Kohorte: wortgleich mit einem Satz aus `HM_STIMME_SCHABLONEN` oder dem Claim eines anderen UNIO-Maklers; ein Satzmuster aus `HM_STIMME_MUSTER`: "Erst X. Dann Y." wie "Erst verstehen. Dann verkaufen." (`wb-plattform.jsx` Zeile 215), "X, nicht Y." und "X statt Y." wie "Beraten statt verkaufen" (die häufigste Kontrastform der Branche und der Sprachmodelle; eigene Ableitung, gestützt auf den Befund gleichförmiger KI-Ausgaben bei Doshi und Hauser 2024, URL in A1); Trigramm-Überlappung ab 15 Prozent mit Claims, Seriennamen und Hooks der Kohorte (MARKENQUALITAET 4.6).
5. Austauschtest: Der Satz wäre auch für die Konvention im Kerngebiet (`einsicht.konvention`, `workshop.karte`) glaubwürdig sagbar.
6. Kein Beleg in `beweise`, der ihn einlöst.
7. Der Satz trägt allein das Risiko des Territoriums, ohne dass die Schärfung aus Gate 1 ihn auffängt.
8. Lautlesen stolpert, oder der Satz ist unter seinem Namen mehrdeutig.
9. Wiederholt `markenvertrag.leitidee` oder einen späteren Seriennamen.

**Rangfolge der Übrigen** (je 0 bis 2, Setzung): Idee (trägt die Kernidee und passt zur Satzfigur), Eigentum, Klang, Dauer (trägt zwölf Monate). Eigentum 2 heißt: ein tragendes Wort steht wörtlich in seinen Antworten oder Zitaten, oder er hat genau diesen Satz im Richtungstermin in der Rohskizze seiner gewählten Richtung gesehen, ohne ihn in `richtung.tabus` oder `zitatMakler` zu verwerfen. Eigentum 1 heißt: von einem eigenen Wort abgeleitet. Eigentum 0: keines von beidem.

**Gleichstand entscheidet Eigentum**, dann Idee. Grund: Die Stimme entsteht aus seinen Sätzen (3.1), und die Idee ist durch Streichkriterium 7 und die Pflicht, dass beide Sätze des Paars dieselbe Idee tragen, schon abgesichert. Die dritte Fassung ließ bei Gleichstand die Idee entscheiden; das bevorzugte einen Satz des Teams vor einem Satz aus seinen Wörtern und ist zurückgenommen.

**Gezeigtes Paar.** Empfehlung ist der ranghöchste Kandidat. Gegenentwurf ist der beste Kandidat, der dieselbe Idee trägt und sich in genau einer benannten Achse unterscheidet. Beide müssen den Markenvertrag treffen; einen Gegenentwurf, den das Team nicht mit voller Überzeugung umsetzen würde, gibt es nicht. Die Begründung der Empfehlung hat zwei Sätze und zitiert seine Worte oder einen Beleg.

### 3.11 Referenzen, eigene Worte und Stimmgabel

**Namensraum** (verbindlich; jede Referenz ist ein Objekt mit `art`):

| `art` | Form | zeigt auf | Prüfung P8 |
|---|---|---|---|
| `zitat` | `{art: "zitat", id: "z1"}` | einen Eintrag in `workshop.zitate` mit Sprecher makler | Text ist nach Normalisierung von Leerzeichen und Satzzeichen wortgleich mit `zitate[id].text`; öffentlich nur mit `oeffentlich` ja und ohne `personenbezug` |
| `geschichte` | `{art: "geschichte", pfad: "herkunft"}`, erlaubt sind `herkunft`, `wendepunkt`, `abgeraten`, `fehler`, `belege[i]` | ein Feld in `workshop.geschichte`, das Schritt 4 als `{ref[]}` belegt hat | Feld ist `{ref}`, nicht `{luecke}`; Text ist eine zusammenhängende Teilfolge des aufgelösten Texts. Die Auflösung der inneren Verweise übernimmt Schritt 4 (`04_workshop.md` P4); Schritt 8 verweist nie direkt in `antworten` |
| `stimmprobe` | `{art: "stimmprobe", index: 2}` | `antworten.stimmproben[index].eigenerSatz` | Text wortgleich; öffentlich erst nach Bestätigung im Wort-Link oder in Schritt 7 |
| `richtung` | `{art: "richtung"}` | `richtung.zitatMakler` aus Schritt 6 | Text wortgleich; nur mit `zitatBestaetigt` |
| `wortlink` | `{art: "wortlink"}` | `wortlink.stimme.satzNeu` | Text wortgleich; öffentlich erst nach Redaktion durch das Team |

`story.herkunft`, `story.wendepunkt` und `story.haltung` sind Referenzobjekte (oder eine Lücke) und erlauben nur `geschichte` und `zitat`; die Namen folgen dem Vertrag ohne Zusatz. `eigeneWorte` erlaubt alle fünf Arten. Pfade wie `antworten.aufgewachsen` oder `antworten.abgeraten` sind als Referenz ungültig: Das erste Feld gibt es in v2 nicht, das zweite liest Schritt 8 laut Vertrag nicht direkt, sondern über `workshop.geschichte.abgeraten`.

**`stimme.eigeneWorte[]`**: `{text, ref, gesprochen: true oder false, verwendung: "oeffentlich" | "intern" | "nachUnterlage", bedingung}`. `bedingung` nennt, woran eine interne Verwendung hängt (etwa `k1` oder `b1`).

**`stimme.stimmgabel[]`**: die Tonreferenz für Claude, geordnet nach 3.1: gesprochene eigene Worte, geschriebene eigene Worte, markierte Story-Sätze. Jeder Eintrag trägt `verwendung`. Interne Sätze dienen nur dem Klang: Ein öffentlicher Text darf aus einem internen Satz höchstens drei aufeinanderfolgende Wörter übernehmen (P8b). So hilft auch ein Satz, der nie veröffentlicht wird.

### 3.12 Die Story in drei Längen

| Teil | Quelle | kurz | mittel | lang |
|---|---|---|---|---|
| `herkunft` | `workshop.geschichte.herkunft` | nein | nein | ja, nur freigegebene Teile |
| `spannung` | `einsicht.spannung` (Abweichung AE1) | als Haltung | als Haltung | ja |
| `wendepunkt` | `workshop.geschichte.wendepunkt` | nein | nur wenn vorhanden | ja, sonst Lückenmarke |
| `haltung` | `workshop.geschichte.abgeraten`, `werte`, `positionierung.was` | ja | ja | ja |
| Belege | `beweise` mit `weilBelege` zuerst, nach der Satzfigur | nein | zwei bis drei | alle tragenden |
| Fehler | `workshop.geschichte.fehler` | nein | nein | nur nach den Belegen (V6) |
| `versprechen` | aus Schritt 7, wörtlich | nein | als Einladung in `botschaften.ueberMich` | ja |

**Längen und Form** (eine Konstante `HM_STORY_LAENGEN` für Erzeugung, Prüfung und Markenbuch; heute falsch "50" und "150" in `wb-markenbuch.jsx` Zeile 100 und 101):

- `kurz`: bis 35 Wörter, **vier bis fünf Sätze**, Ich-Form, ohne Claim, ohne Zahl, ohne Lücke. Jeder Satz trägt genau einen Ton aus `haltung`, `nein`, `zahl`, `tempo`, `ort` und hat das Feld `ton`. Ein Satz ohne Ton (reine Biografie, "Ich bin in ... aufgewachsen") ist in `kurz` nicht zulässig, weil er Claude in Schritt 12, 13 und 17 keine Tonreferenz liefert. Weil `kurz` die Stimmgabel ist, gelten drei weitere Pflichten: Jeder Satz trägt einen Ort, einen Beleg (`belegRef`) oder ein eigenes Wort (Referenz nach 3.11); kein Satz besteht den Austauschtest des Claims nicht (Kriterium 5 in 3.10, also keine Branchenformel wie "ohne Druck verkaufen"); kein Satz umschreibt einen Satz des Musterbeispiels oder der Kohorte (P7 und Nähe-Hinweis in 8.3). Mindestens ein Satz hat den Ton `ort` und nennt sein stärkstes Ortssignal. Genau ein Satz trägt die Kernidee des gewählten Territoriums und hat `kern: true`. Gespeichert als `kurzSaetze[] {text, ton, quelle, belegRef, kern}`.
- `mittel`: 70 bis 100 Wörter, Ich-Form, Website "Über mich" über `botschaften.ueberMich`. Ohne Lückenmarke: Fehlt ein Teil, fällt der Satz weg. Enthält alle Sätze der kurzen Fassung wörtlich, damit jede Markierung geschützt ist.
- `lang`: 160 bis 220 Wörter, Ich-Form, Kontext `website`: Präsentation, Reveal, Markenbuch. **Nicht** für Presseanfragen; dafür gibt es `presse.kurzbio` und `botschaften.boilerplate` in dritter Person. P1 gilt für `lang` mit dem Kontext `website`. Lückenmarken erlaubt, sie werden nicht mitgezählt und sperren in Schritt 14 die Veröffentlichung (`gate2.offeneLueckenMitTermin`).
- Markierte Sätze stehen nach dem Wort-Link unverändert in `kurz`, `mittel` und, wo sie vorkommen, in `lang`. Eine Änderung daran ist eine neue Version (Schritt 16).

**Wirkung der Markierung, nur auf Stimmfelder.** Die Markierung sagt, welcher Satz nach ihm klingt. Sie sagt nichts darüber, welche Inhalte der Feed zuerst zeigt, welche Beiträge angepinnt werden oder womit eine Serie beginnt; das entscheiden Positionierung, Belege und Programm in Schritt 12 und 13. Die dritte Fassung hatte aus der Wiedererkennung eine Programmentscheidung gemacht, von der der Makler nichts wusste; das ist zurückgenommen. Die Markierung wirkt auf zwei Felder dieses Schritts, die Schritt 12, 13 und 17 lesen:

1. **Gewicht in der Stimmgabel** (`stimme.stimmgabel[].gewicht`): Markierte Sätze bekommen Gewicht 2, unmarkierte Sätze der kurzen Fassung Gewicht 1 und stehen hinter allen markierten. Claude erhält die Stimmgabel mit Gewicht; die Anweisung lautet, im Zweifel den Klang der Sätze mit Gewicht 2 zu treffen.
2. **Ton der Hook-Formel** (`stimme.tonGewicht {ort, nein, tempo, zahl, haltung}`, je 1 oder 2): Schritt 12 formuliert jede `hookFormel` weiter aus Serie und Idee, wählt aber den **Satzbau** des Hooks nach dem höchsten Tongewicht.

| markierter Ton | Satzbau der Hook-Formel (Schritt 12), Beispiel für dieselbe Folge "Erbengemeinschaft wartet 2 Jahre" |
|---|---|
| `ort` | Ort zuerst: "Döbling, ein Zinshaus, 2 Jahre Geduld." |
| `nein` | sein Rat als Ich-Satz zuerst: "Ich habe zum Warten geraten. Nach 2 Jahren ..." |
| `tempo` | Dauer zuerst, im Kontrast: "2 Jahre hier, 11 Wochen dort." |
| `zahl` | Ziffer vorn, Satz klein darunter (Typo-Richtung): "2 Jahre. Was das Warten gebracht hat." |
| `haltung` | Haltungssatz zuerst, Fall danach |

Inhalt, Reihenfolge der Folgen, `start30`, Pins und `textImBild` bleiben davon unberührt. Die Wirkung ist im Selbsttest nachweisbar (8.4, Test 19): gleiche Serie, andere Markierung, anderer Satzbau der Hook-Formel, gleicher Inhalt.

**Der Kernsatz ist nicht markiert.** Trägt der nicht markierte Satz `kern: true`, erkennt er die Kernidee des gewählten Territoriums nicht in seinen Worten wieder. Das wird nicht still überarbeitet. Es entsteht ein Eintrag `stimme.pruefung.cdEintraege[] {art: "kern-nicht-markiert", satz, claimWahl, territoriumId, datum}` an den Creative Director. Er prüft binnen zwei Werktagen (Setzung) gegen: Trägt die Claim-Wahl die Idee noch? Passt das Territorium, oder hat der Richtungstermin etwas anderes gezeigt (`richtung.zitatMakler`)? Ergebnis ist eine von drei Entscheidungen, jede mit Grund: (a) nur der Satz war schlecht formuliert, neu aus seinen Worten, (b) die Claim-Wahl wird im Reveal-Vorbereitungsgespräch angesprochen, (c) Rückfrage an Schritt 6 mit neuer `gate1`-Version. Solange der Eintrag offen ist, bleibt Schritt 9 gesperrt, weil die Idee von Wort und Bild davon abhängt.

### 3.13 Der Pressebaustein

Im deutschsprachigen Premiumsegment läuft Personenmarke stark über Presse (DAHLER mit über 3.000 Medienplatzierungen: https://beilquadrat.de/cases-beil2/dahler/; R5 Abschnitt 1.4 und 4 Punkt 9).

- `presse.kurzbio`: ein oder zwei Sätze in dritter Person, je höchstens 20 Wörter (V9), zusammen höchstens 30, für Zitatzuschreibung und Bildunterschrift. Der erste Satz nennt Objekt und stärkstes Ortssignal, der zweite `positionierung.was` in Kurzform, belegt durch einen Eintrag in `beweise`, damit die Kurzbio nicht auf jeden Makler im Gebiet passt. Unterschied zu `botschaften.boilerplate` (50 bis 70 Wörter, dritte Person, für Partner und Pressetext): andere Länge, anderer Einsatz, kein doppelter Wert.
- `presse.themen[3]`: `{thema, frage, belegRefs[]}`. Jedes Thema ist eine Frage, die eine Redaktion stellen würde, und stützt sich **nur auf Einträge in `beweise`**. Fehlt ein dritter tragender Beweis, bleibt das dritte Thema eine Lücke mit Termin. Cue, Hindernis oder Workshop-Zusammenfassung sind kein Beleg.
- `presse.beispielzitat`: `{ref, text, freigabe}`. Nur ein Satz der Art `zitat` mit `oeffentlich` ja. Den Text kopiert die Regel. Fehlt ein solcher Satz, bleibt das Feld eine Lücke.

### 3.14 Beispiel am Fall Markus Leitner (Döbling, Zinshaus, Figur Kenner, Sie-Form)

**Stoff, der vorliegt (belegt).**

- Seed `markus` in `wb-store.jsx` Zeile 72, in v2-Feldern gelesen wie in `06_territorien.md` Zeile 336 bis 358: F4 `abgeraten` ("Einer Erbengemeinschaft geraten, zwei Jahre zu warten, statt unter Druck zu verkaufen. Sie kamen mit 600.000 mehr zurück."), gegeben auf die Frage "... abgeraten hast, obwohl es dich Provision gekostet hat" (`wb-data.jsx` Zeile 192); `abschluesse` ("Zinshaus Sieveringer Straße, 1902, 4,2 Mio., Erbengemeinschaft kam über den Notar. Anlegerwohnung Währing, 62 m², 420.000, Bestandskunde. Altbau Hietzing, 140 m², 1,3 Mio., Diskretion war entscheidend."); `belege`; `graetzl` ("Sievering, zwischen Sieveringer Straße und Agnesgasse"); `graetzl_anteil` ("6 bis 8"); `cue` ("Dienstag nach dem Grundbuch-Termin, 11 Uhr"); `aufgewachsen` (in v2 `workshop.geschichte.herkunft`); `herkunft` ("Aus Finanz oder Recht"); `worte` ("genau, ruhig, verlässlich"); `tabus` (Politik, Familie zeigen); `hindernis` Provision; `milieus` kons, perf; `erfolge` 2 auf der alten Fünferskala; Anrede "Sie, überall"; `kanaele` mit LinkedIn an erster Stelle.
- Workshop 11.09.2026 (`wb-os-data.jsx` Zeile 278, in v2 als `workshop.zitate` `z1` in `04_workshop.md` Abschnitt 8.2): "Dass sie sich nie gedrängt gefühlt haben." Die Zusammenfassung ("LinkedIn zuerst, Instagram zweiter Kanal. Säule Wie ich arbeite mit Provisionstransparenz. Keine Familie im Bild.") ist laut `04_workshop.md` Zeile 307 und 309 ein unbestätigter Team-Satz.
- Schritt 5: `einsicht.spannung` ("Sie wollen beraten werden, ohne gedrängt zu werden, und die Provision steht im Raum, bevor das erste Gespräch beginnt", `05_einsicht.md` Zeile 310). Schritt 7: Versprechen, Persönlichkeit, Werte, Beweise `b1` bis `b6`, Attribute, `stimmeRichtung`, `falschWaere` (`07_positionierung.md` Zeile 199 bis 240).
- **Schritt 6 (Ausgang, `06_territorien.md` Zeile 360 bis 430):** Empfehlung Gate 1 `t-nein-als-rat`, Gegenentwurf `t-graetzl`.
  - `kernidee` (intern): Markus rät auch zum Warten, wenn ihn das die Provision kostet, und zeigt, was das Warten gebracht hat.
  - `claimIdee`: "Rat vor Auftrag." In der Rohskizze steht der Satz im Profilkopf und auf Kachel 1 (Zeile 402 und 403).
  - `zeichenIdee`: jede Kachel trägt eine gezeichnete Spanne zwischen Rat und Ergebnis, deren Länge die Dauer des Falls zeigt.
  - `typoRichtung`: "Ziffern tragen: Dauer und Betrag groß, Sätze klein und leise darunter."
  - `serienIdee`: "Wann, nicht ob", je Folge die Frage, sein Rat, die Spanne bis zum Ergebnis.
  - `risiko`: Warten kann nach Zögern klingen; die Rechnung hinter den 600.000 fehlt noch.
  - `gate1.schaerfung`: neben der langen Spanne eine kurze, "11 Wochen, Sievering 4,2 Mio.", Grund "Risiko Zögern: neben jeder Warte-Geschichte ein schneller Fall" (Zeile 420).

**Annahme für dieses Beispiel.** `richtung.gewaehltId` steht erst nach dem Richtungstermin fest (`06_territorien.md` Zeile 443). Das Beispiel nimmt an, dass Markus der Empfehlung folgt. Wählt er `t-graetzl`, läuft dieselbe Werkstatt mit der Claim-Idee "Zwischen Sieveringer Straße und Agnesgasse." und der Zeichenidee der Randbeschriftung. Dieser Claim fiele heute durch P17, weil in der Sieveringer Straße das verkaufte Zinshaus eines Kunden liegt (`11_bild.md` Zeile 220 und 659); er bleibt gesperrt, bis dort ein Abschnitt ohne Bezug zum verkauften Haus bestimmt ist.

**Lücken (v2-Felder, die es für Markus noch nicht gibt):** `antworten.stimmproben`, `antworten.anredeJeKanal` (angenommen aus "Sie, überall"), `richtung.zitatMakler`, `workshop.geschichte.wendepunkt` und `fehler`, `workshop.zitate` mit `oeffentlich` ja, `workshop.karte`, die Entscheidungen zu `k1` und K3, die Bezugsgrößen zu `b1` und `b3`, der Eintrag `b7`. Wörter wie "Frist", "Familientisch", "Zeitdruck" und "noch nicht" stehen in keiner seiner Antworten und in keinem Zitat, sondern im Musterbeispiel und im Regelcode (`wb-plattform.jsx` Zeile 223 und 400). Sie werden hier nicht verwendet.

**Korrektur an den Fakten und Formulierungen der dritten Fassung.**

| Stelle | dritte Fassung | jetzt | Grund |
|---|---|---|---|
| Provision in öffentlichen Texten | "auch wenn mich das die Provision kostet" in `kurz`, `mittel`, `lang`, `kurzbio`, `boilerplate`, Empfehlungssatz | "Einen Auftrag gab es dafür zunächst nicht." nur in `mittel`, `lang` und sinngemäß in `boilerplate`, gestützt auf `b7` | Der einzige Beleg ist eine Antwort auf eine Suggestivfrage ("obwohl es dich Provision gekostet hat"). Der Seed sagt "Sie kamen ... zurück": Die Provision wurde womöglich später verdient. Belegbar ist nur, dass es beim Rat vorerst keinen Auftrag gab. Das wird als `b7` mit Prüfstatus bei Schritt 7 angefordert (5.5) |
| Ergebnis des Abratens | "Zwei Jahre später lag ihr Ergebnis um 600.000 Euro höher." | "Nach 2 Jahren lag ihr Ergebnis um 600.000 Euro höher." | V12 (Dauer als Ziffer, kein Satzanfang mit Ziffer). Die Bezugsgröße (höher als was) bleibt Teil der fehlenden Unterlage zu `b1`; öffentlich erst, wenn sie feststeht, dann mit Bezug im Satz |
| Schnelle Schätzung `b3` | "Bei einer Anlegerwohnung in Währing lag der Verkauf 8 Prozent über der ersten Schätzung." direkt nach "Einen Preis nenne ich erst, wenn ich ihn belegen kann." | intern; Lücke "Kommt aus der Unterlage zu b3: wessen erste Schätzung" | Offen ist, wessen Schätzung gemeint ist (seine, die eines Mitbewerbers, die des Eigentümers). Direkt hinter dem Satz über belegte Preise las sich der Satz so, als hätte er selbst 8 Prozent daneben gelegen. `07_positionierung.md` Zeile 232 führt die Unterlage als offen |
| Beträge | "4,2 Millionen Euro" neben "600.000 Euro" | "4.200.000 Euro" und "600.000 Euro" | V12, eine Form je Größe |
| Schneller Fall | "Stimmt der Zeitpunkt, geht es schnell." | "Ein Zinshaus in Sievering war in wenigen Wochen verkauft." | Der alte Satz umschrieb das Musterbeispiel ("Wenn es passt, geht es auch schnell", `MARKENQUALITAET.md` Zeile 277) und trug das Leitwort des verworfenen Territoriums "Der Zeitpunkt". Der Fall steht im Seed (`abschluesse`); die Straße des verkauften Hauses nennt kein öffentlicher Text (Diskretion, P17), nur das Grätzl |
| Haltungssatz | "Unter Druck verkauft bei mir niemand." | entfällt | Scheitert am Austauschtest des Claims ("ohne Druck verkaufen" ist eine verbreitete Formel, Werkstatt unten) |
| Beruf vor der Branche | "aus Finanz und Recht" | in `lang` Lücke "Kommt aus dem Workshop: aus welchem Beruf er kam" | F14 im Seed sagt "Aus Finanz oder Recht", eine Kategorie, kein Lebenslauf |

**Klärung `k1` vor dem Wort-Link.** Schritt 4 führt den Widerspruch "Familie ist tabu, die Herkunftsgeschichte handelt vom Großvater" als K1 mit den Möglichkeiten "Im Text ja, im Bild nie" und "Weder im Text noch im Bild", Entscheidung offen (`04_workshop.md` Zeile 307, im Beispiel-JSON als `k1` in Zeile 643). Dieser Schritt ergänzt den Eintrag um einen Termin:

```js
workshop.klaerungen[0] = {
  id: "k1", widerspruch: "Familie ist tabu, die Herkunftsgeschichte handelt vom Großvater",
  optionen: ["Im Text ja, im Bild nie", "Weder im Text noch im Bild"], empfehlung: 0,
  entscheidung: null, entschiedenVon: "makler", wirktAuf: "antworten.grenzen",
  bis: "[Datum des Richtungstermins aus auftrag.termine]",      // neu, Abweichung AE5
  anlass: "8: stimme.eigeneWorte (geschichte herkunft), story.lang"
}
```

Gefragt wird am Ende des Richtungstermins, als eine Frage mit zwei Möglichkeiten und Empfehlung, wie Schritt 4 es für Klärungen vorsieht. Bis zur Entscheidung ist der Satz über den Großvater intern, steht in keiner Fassung der Story und nie in `kurzSaetze`. Nach "Im Text ja" darf er in `lang` stehen, nach "Weder noch" bleibt er Tonreferenz, nie Text.

**`anrede`**

| Kontext | Form | Grußformel | Grund |
|---|---|---|---|
| LinkedIn | Sie | | Annahme aus "Sie, überall"; erster Kanal im Seed |
| Instagram | Sie | | wie oben |
| Website und E-Mail | Sie | Erstkontakt "Sehr geehrte Frau {Titel} {Name}," und "Mit freundlichen Grüßen"; danach "Guten Tag, Frau {Name}," und "Beste Grüße" | in v2 aus F14; hier aus "Sie, überall"; Titel, weil das Milieu im Seed konservativ ist und akademische Titel in Wien in der Anrede üblich sind (eigene Ableitung) |
| Erstkontakt | wie Eingangskanal, also Sie | wie Website | |
| Presse | dritte Person | | |

Schritt 7 hat das Versprechen in Sie geschrieben, gerechnet über Stufe 3 von `hmAnrede` aus denselben Antworten. P1 bestätigt, dass `anrede.kontexte.website` und das Versprechen übereinstimmen.

**`stimme.regler`**

| Regler | heute v1 (`hmPfRegler` aus s1 20, s2 30, s3 35) | v2 Wahl | v2 Messung | v2 Wert |
|---|---|---|---|---|
| ernst | 73 | Lücke | im Regelpfad keine | `null` |
| persoenlich | 30 | Lücke | ein gesprochener Satz (`z1`), unter acht | `null` |
| begeistert | 28 | Lücke | unter acht | `null` |
| sachlich | 68 | Lücke | Freitexte: 11 von 12 Fragmenten mit Zahl, Ort oder Zeit; zu wenige gesprochene Sätze | `null` |

Ehrlicher Stand: v2 liefert für Markus heute keine Regler. v1 zeigt die Spiegelung (`ernst` 73 plus `begeistert` 28 ergibt 101), die v2 mit getrennten Proben beendet. **Veranschaulichung, als Annahme markiert:** Wählt er bei P1 Pol B (ernst, 75), bei P2 Pol A (förmlich, 25), bei P3 Pol A (zurückhaltend, 25) und bei P4 Pol B (Beleg, 75), ergibt sich ohne Messung `ernst` 75, `persoenlich` 25, `begeistert` 25, `sachlich` 75. Daraus folgen die verbindlichen Regeln M10 (aus P1) und M11 (aus P4) und die Ermessenseinträge E11 (aus P2) und E1 (verstärkt durch P3).

**`stimme.figur`**

```js
stimme.figur = {
  name: "Rat, Dauer, Ergebnis",
  regel: "In jedem Text über einen Fall stehen Rat, Dauer und Ergebnis in dieser Reihenfolge. Fehlt ein Glied, bleibt die Reihenfolge der übrigen. Das Ergebnis steht nie vorn.",
  reihenfolge: ["rat", "dauer", "ergebnis"],
  gilt: "Captions, Reel-Skripte, Karussell-Seiten, Story mittel und lang, dreiSaetze, sobald ein Text einen Eintrag aus beweise nennt",
  pruefung: "hinweis",   // auto prüfbar: Zahl mit belegRef steht nach einer Zeitangabe; ob der Rat vorne steht, entscheidet das Team
  aus: { territoriumId: "t-nein-als-rat", zeichenIdee: "Spanne zwischen Rat und Ergebnis, Länge gleich Dauer",
         typoRichtung: "Ziffern tragen: Dauer und Betrag groß, Sätze klein darunter", serienIdee: "Frage, Rat, Spanne bis zum Ergebnis",
         schaerfung: "neben jeder Warte-Geschichte ein schneller Fall" },
  so: ["Einer Erbengemeinschaft habe ich geraten zu warten. Nach 2 Jahren lag ihr Ergebnis um 600.000 Euro höher.",
       "Sievering. 11 Wochen. 4.200.000 Euro."],
  nicht: ["600.000 Euro mehr. Weil wir gewartet haben.", "Rekordpreis in Sievering, in nur 11 Wochen."],
  fuerSchritt9: "Die Sprache erzählt jeden Fall als Rat, Dauer, Ergebnis; das Zeichen zeigt dieselbe Ordnung als Spanne, deren Länge die Dauer ist."
}
```

Warum das keine Dekoration ist (Ableitung): Die Figur beantwortet das Risiko des Territoriums. Wer das Ergebnis zuerst nennt, klingt nach Verkäufer; wer die Dauer nennt, zeigt, dass Warten gerechnet war. Die Schärfung aus Gate 1 wird zur Satzregel: Wo eine lange Spanne steht, steht auch eine kurze (M3). Der zweite `so`-Satz ist Bildtext und darf darum mit dem Ort beginnen und Ziffern vorn tragen (V12).

**`stimme.zahlen`** für Markus: die Grundform aus 3.8 ohne Abweichung, weil seine Typo-Richtung "Ziffern tragen" lautet. Bestätigt vom Senior-Texter; die Zahlen im Seed ("4,2 Mio.", "zwei Jahre") werden beim Übernehmen umgeschrieben, nicht wörtlich zitiert.

**`stimme.verbindlich` (Markus-eigene Regeln zusätzlich zu V1 bis V13)**

| id | Regel | aus | Prüfung |
|---|---|---|---|
| M1 | Sie auf allen Kanälen, Website und im Erstkontakt; Presse in dritter Person. Grußformeln nach `anrede.gruss`. | `anrede` | auto |
| M2 | Zahlen nur aus `beweise`: Ergebnis 600.000 Euro höher nach 2 Jahren (`b1`), Zinshaus in Sievering 4.200.000 Euro in 11 Wochen (`b2`), 6 bis 8 der letzten 10 Abschlüsse in Sievering (`b4`), 14 Abschlüsse 2025 (`b5`). `b3` bleibt intern, bis die Bezugsgröße geklärt ist. Alle Selbstauskunft: öffentlich erst nach Unterlage. Der Betrag aus `b2` betrifft das Haus eines Kunden und erscheint erst mit Unterlage und Kundenfreigabe (Aufgabe in Schritt 14, 5.5 Punkt 11). | `beweise` | auto |
| M3 | Neben jeder Warte-Geschichte steht ein schneller Fall. | `gate1.schaerfung`, `markenvertrag.attribute` Ruhig | hinweis |
| M4 | Politik nie. Mietrecht und Widmung nur als Folge für Eigentümer, nie als Parteifrage (bis K2 entschieden ist). | `grenzen` Politik; `04_workshop.md` K2 | auto über Prüfwörter, Team |
| M5 | Familie nie im Bild. Im Text keine heutigen Familienmitglieder. Der Satz über den Großvater ist intern bis `k1`. | `grenzen` Familie zeigen; `k1` | auto über Prüfwörter "Großvater", "Vater", "Familie" in Bezug auf ihn |
| M6 | "Nie gedrängt" ist seine Wiedergabe, nie ein Kundenzitat. | `beweise` `b6`, V11 | auto |
| M7 | "Der Zinshaus-Mann, dem Notare vertrauen" erscheint nicht öffentlich. | `rolle` (Schritt 7), V8 | auto |
| M8 | Nie ein Rat zum Verkauf, der nur die Provision holt; nie ein Preis, der nur den Auftrag holt. | `werte[].nie` (Aufrichtigkeit, Realismus) | team |
| M9 | Erbrecht und Steuern nur allgemein erklärt, mit Quelle, im Zweifel Verweis auf Notariat oder Steuerberatung. | Musterbeispiel 5.5, Haftung | team |
| M10 | Keine Ironie und kein Wortspiel in Abraten und Absage. | P1 `ernst` ab 60 (hier Annahme) | team |
| M11 | Jede Aussage über den Markt nennt Ort, Zeitraum oder Quelle im selben Satz. | P4 `sachlich` ab 60 (hier Annahme) | hinweis |
| M12 | Keine Aussage über Kosten oder Provision, die für jeden Makler gesetzlich gilt, als eigene Leistung. Jede Aussage über Provision geht vor der Veröffentlichung an die Rechtsprüfung. | eigene Ableitung, siehe Provisions-Beispiel | team |

**`stimme.ermessen`**

| Nuance | so | nicht | aus |
|---|---|---|---|
| E1 Erfolge leise | "Die Erben haben entschieden zu warten. Nach 2 Jahren lag ihr Ergebnis um 600.000 Euro höher." | "Ich habe für meine Kunden 600.000 Euro mehr herausgeholt." | `erfolge` 2; `stimmeRichtung` "Erfolge als Beleg, nie als Lob"; P3 bis 40 (Annahme) |
| E2 Erklärung vor Pointe | "Mehrere Erben, ein Haus. Bevor wir über den Preis reden, klären wir, wer entscheidet." | "Erben aufgepasst. Dieser Fehler kostet Sie ein Vermögen." | Attribut Ruhig |
| E3 LinkedIn erzählt den Fall ganz, Instagram zeigt ihn als Spanne | LinkedIn: vier bis sechs Sätze nach der Figur. Instagram, erste Karussellseite "2 Jahre.", letzte Seite "600.000 Euro höher." | ein Text für beide Kanäle | Kanäle; `typoRichtung`; R5 Abschnitt 4 |
| E4 Warten nie als Prinzip | "Warten hat sich hier gelohnt. Beim Zinshaus in Sievering war es anders, es war nach 11 Wochen verkauft." | "Geduld zahlt sich immer aus." | M3; `persoenlichkeit` ruhig heißt nicht zögerlich |
| E5 Verständnis vor Einwand | "Die höchste Schätzung ist verlockend, das verstehe ich. Ich nenne Ihnen trotzdem die Zahl, die ich belegen kann." | "Wer Ihnen mehr verspricht, lügt." (über Menschen, V7) | Attribut Ruhig, Wert Realismus; P4 ab 60 (Annahme) |
| E6 Fachwort nur mit Übersetzung im selben Satz | "Im Grundbuch, dem öffentlichen Register der Liegenschaften, steht, wem ein Haus gehört." | "Laut B-Blatt ist die Sache klar." | Attribut Genau heißt nicht belehrend |
| E7 Anrede-Spiegel im Direktkontakt | Bietet ein Kunde in einer Nachricht das Du an: "Gern, dann per du." | von sich aus duzen | `anrede`; nur Eins-zu-eins-Kommunikation, nie Vorlagen und Renderer |
| E8 Rhythmus | "Einer Erbengemeinschaft habe ich geraten zu warten, statt unter Druck zu verkaufen. Einen Auftrag gab es dafür zunächst nicht." | "Die Erben wollten verkaufen. Ich habe abgeraten. Sie haben gewartet. Es hat sich gelohnt." | 3.8 Handwerk |
| E9 Satzzeichen | ein Doppelpunkt je Text, etwa im Abraten "Für mich heißt das: heute kein Auftrag." | "Mein Rat: warten. Das Ergebnis: 600.000 Euro. Die Lehre: Geduld." | 3.8 Handwerk |
| E10 Perfekt für eigenes Handeln | "Einer Erbengemeinschaft habe ich geraten zu warten." | "Einer Erbengemeinschaft riet ich zu warten." (in Ich-Texten; in dritter Person für Presse ist das Präteritum richtig) | V13, gesprochenes Wiener Standarddeutsch; eigene Ableitung |
| E11 Unterlagen vor Person | "Für eine erste Einschätzung brauche ich den Grundbuchsauszug und die Mietzinsliste." | "Ich freue mich riesig, Sie kennenzulernen." | P2 bis 40 (Annahme) |

**`stimme.sagen`**: warten, geraten, Rat, unter Druck, gedrängt, Provision, Erbengemeinschaft, Erben, Miterben, Zinshaus, Altbau, Anlegerwohnung, Haus, Liegenschaft, Wohnungseigentum, Mietzinsliste, Grundbuch, Grundbuchsauszug, Notariat, Sievering, Agnesgasse, Döbling, Währing, Hietzing, Wochen, Jahre. Die Wendung "zwischen Sieveringer Straße und Agnesgasse" ist seine Grätzl-Antwort, zugleich aber die Claim-Idee des Gegenentwurfs aus Gate 1. Sie steht darum, solange `t-nein-als-rat` gewählt ist, in keinem öffentlichen Text als feste Formel. Die Sieveringer Straße ist in öffentlichen Texten gesperrt, weil dort das verkaufte Zinshaus eines Kunden liegt (P17); die Agnesgasse ist frei, solange dort kein einzelnes Objekt von ihm liegt.

**`stimme.wendungen`**

| Wendung | Herkunft | höchstens | nie |
|---|---|---|---|
| "statt unter Druck zu verkaufen" | F4, sein Wortlaut | einmal je Fläche | Bio, Claim-Nähe, Kurzbio |
| "bevor Sie unterschreiben" | Versprechen aus Schritt 7, wörtlich | nur dort, wo das Versprechen steht (Website, `story.lang`, Reveal) | Captions, Bio, `einSatz`, `ueberMich` |

Gestrichen, weil sie neben dem Claim zu zweiten und dritten Claims wurden: "bevor jemand unterschreibt" (in `einSatz`, `ueberMich` und Caption der dritten Fassung) und "Mein Rat hängt am Haus, nicht an meiner Provision." (Umschreibung des Claims mit "Rat" und "Provision" im selben Satz und Satzmuster "X, nicht Y").

**`stimme.vermeiden`** (zusätzlich zur globalen Klischee-Liste und `HM_STIMME_AT`): Off-Market, Bestpreis, Top-Lage, kostenlose Bewertung, schnell verkauft als Versprechen, jetzt oder nie, Rekordpreis, Schnäppchen, Hammerpreis, garantiert, Rendite-Superlative, "diskret" als Adjektiv ohne Handlung, "Objekt" im Fließtext (stattdessen Haus, Zinshaus, Wohnung, nach Hill: https://www.holeandcorner.com/long-reads/in-the-modern-style), "noch nicht" (Musterbeispiel und Regelcode, nicht seine Worte), "Beraten statt verkaufen" und jede Form "X statt Y" oder "X, nicht Y" im Claim und in Hooks, Courtage. Quellen: `markenvertrag.falschWaere`, `HM_PF_FIGUR.kenner.vermeiden` (`wb-plattform.jsx` Zeile 218), R5 Abschnitt 2.

**`stimme.beispiele`** (Pflicht laut Vertrag: Caption je Kanal, erste Antwort, Absage oder Abraten, erster Website-Satz, Bio; dazu die Frage nach der Provision, weil sie seine Spannung ist). Platzhalter in geschweiften Klammern sind Variablen der Vorlage, keine Lückenmarken.

| wo | Kontext | so | nicht | Belege, Probe |
|---|---|---|---|---|
| Caption LinkedIn | linkedin, Sie | Einer Erbengemeinschaft habe ich geraten zu warten, statt unter Druck zu verkaufen. Nach 2 Jahren lag ihr Ergebnis um 600.000 Euro höher. Warten ist trotzdem keine Regel. Ein Zinshaus in Sievering war nach 11 Wochen verkauft. Leiten Sie das an jemanden weiter, der gerade mit Geschwistern über ein Haus entscheidet. | Wieder ein Top-Zinshaus in Döbling verkauft. Diskret, schnell, zum Bestpreis. Sie wollen auch verkaufen? Jetzt kostenlose Bewertung anfragen. | `b1`, `b2`; Figur; M3; E8 |
| Caption Instagram (Karussell) | instagram, Sie | Warten oder verkaufen? Auf meinen Rat hat eine Erbengemeinschaft gewartet. Nach 2 Jahren lag ihr Ergebnis um 600.000 Euro höher. Ein Zinshaus in Sievering war dagegen nach 11 Wochen verkauft. Schicken Sie das jemandem, der gerade vor dieser Entscheidung steht. | Traumhafte Altbauwohnung in Toplage. Einzigartig. Link in Bio. #Traumimmobilie #JustSold | `b1`, `b2`; Figur; E3 |
| Erste Antwort auf eine Anfrage | erstkontakt über das Formular der Website, Sie | Sehr geehrte Frau {Titel} {Name}, danke für Ihre Nachricht zum Haus in der {Straße}. Für eine erste Einschätzung brauche ich den Grundbuchsauszug und die Mietzinsliste. Vorher möchte ich zwei Dinge verstehen: wer mitentscheidet und ob etwas drängt. Wann passt Ihnen ein kurzes Telefonat? Mit freundlichen Grüßen, Markus Leitner | Hallo, vielen Dank für Ihr Interesse. Gerne erstellen wir Ihnen eine kostenlose Marktwertanalyse. Ihr kompetentes Immobilienteam | keine Zahl; P2 (Annahme 25: Unterlagen vor Person, E11); V13 |
| Abraten | E-Mail nach dem ersten Gespräch, Sie | Guten Tag, Frau {Name}, ich würde das Haus derzeit nicht verkaufen. Nach allem, was Sie mir erzählt haben, drängt nichts, und die Vergleichswerte aus der {Straße} sprechen für Geduld. Für mich heißt das: heute kein Auftrag. Ich melde mich im {Monat} mit neuen Zahlen, wenn Sie das möchten. Beste Grüße, Markus Leitner | Jetzt ist der perfekte Zeitpunkt zu verkaufen. Der Markt dreht bald, wir sollten keine Zeit verlieren. | Haltung aus `b1`, Wert Aufrichtigkeit; P1 (Annahme 75: M10) |
| Absage eines Auftrags zu diesem Preis | E-Mail, Sie | Guten Tag, Frau {Name}, den Preis, den Sie sich vorstellen, würde ich nicht ins Inserat schreiben. Die Vergleichswerte aus der {Straße} lagen im {Zeitraum} darunter, ich schicke sie Ihnen heute. Wenn Sie danach neu entscheiden, rechne ich gern noch einmal. Beste Grüße, Markus Leitner | Leider können wir Ihr Objekt aktuell nicht in unser exklusives Portfolio aufnehmen. Wir wünschen Ihnen alles Gute. | Wert Realismus; E5; P4 (Annahme 75: M11) |
| Frage nach der Provision | erstkontakt, Sie, `rechtPruefen` | Meine Provision lege ich im ersten Gespräch schriftlich vor, mit allem, was sie enthält. Rate ich Ihnen zu warten, bleibt es bei diesem Gespräch. | Über Konditionen sprechen wir gerne persönlich. Unser Service ist jeden Cent wert. | `hindernis` Provision; Kernidee Schritt 6; M12 |
| Website, erster Satz | website, Sie | Ob Sie Ihr Zinshaus in Sievering jetzt verkaufen oder später, rechnen wir gemeinsam aus. | Willkommen bei Ihrem Immobilienexperten für Wien. Wir finden für jede Immobilie den perfekten Käufer. | Versprechen |
| Bio Instagram | instagram | Zinshäuser und Altbau, meist in Sievering. Für Erben und Anleger. Rat vor Auftrag. | Immobilienprofi aus Leidenschaft. Ihr Partner für Wien. Termin buchen. | `botschaften.bio.instagram`, 82 Zeichen; `b4` ohne Zahl |
| Kopfzeile LinkedIn | linkedin | Makler für Zinshäuser und Altbau in Döbling, meist in Sievering. Rat vor Auftrag. | Real Estate Expert, Investment, Off-Market Deals, Ihr Partner für Zinshäuser | `botschaften.bio.linkedin`, 81 Zeichen |

**Zur Provisions-Antwort (eigene Ableitung, rechtlich zu prüfen).** Die dritte Fassung schrieb "Rate ich Ihnen zu warten, kostet Sie das nichts." Bei einer erfolgsabhängigen Maklerprovision ist das eine Selbstverständlichkeit: Ohne Geschäft gibt es keine Provision. Mit einer Selbstverständlichkeit als eigenem Vorteil zu werben, kann als irreführende Geschäftspraktik gelten. Der Satz ist darum ersetzt. Auch die neue Fassung ("bleibt es bei diesem Gespräch") sagt nur etwas über seine Praxis, trägt aber `rechtPruefen: true` und ist vor jeder Veröffentlichung von der Rechtsberatung zu prüfen (Lücke: wer bei UNIO prüft, 9). Zusätzlich muss er den Satz im Wort-Link von Schritt 7 bestätigen, wo der Vertrag die Kernidee zeigt; bestätigt er nicht, fällt der zweite Satz weg.

Warum diese Beispiele nach ihm klingen und nicht nach der Schablone (Ableitung): Sie nehmen seine Wörter ("geraten", "unter Druck", Sievering), folgen der Figur Rat, Dauer, Ergebnis, stellen neben das Warten den schnellen Fall, sagen im Abraten offen, was es ihn kostet ("heute kein Auftrag"), sprechen Wiener Standarddeutsch mit Titel und Grußformel, und enden mit einem Satz zum Weitergeben statt mit "Jetzt anfragen" (R6 Abschnitt 3 Punkt 7). Kein Satz stammt aus `hmPfStimme`, aus den Satzvorlagen der Stimmproben oder aus dem Musterbeispiel. Die Bios nennen keine Zahl, damit sie nicht mit den Belegen altern, und tragen mit Sievering das Ortssignal, das Mitbewerber mit denselben drei Bezirken nicht haben. Höchstens ein Doppelpunkt je Text; die Captions haben keinen.

**`stimme.eigeneWorte`**

| Text, wörtlich | ref | gesprochen | verwendung, bedingung |
|---|---|---|---|
| Dass sie sich nie gedrängt gefühlt haben. | `{art: "zitat", id: "z1"}` | ja | intern; seine Wiedergabe, kein Kundenzitat (M6); `oeffentlich` offen |
| Einer Erbengemeinschaft geraten, zwei Jahre zu warten, statt unter Druck zu verkaufen. | `{art: "geschichte", pfad: "abgeraten"}` | nein | nachUnterlage, `b1` |
| mein Großvater hat Zinshäuser verwaltet | `{art: "geschichte", pfad: "herkunft"}` | nein | intern, bis `k1` |
| Lücke: sein Satz aus dem Richtungstermin | `{art: "richtung"}` | ja | Kommt aus dem Termin (Schritt 6) |
| Lücke: eigene Sätze aus den Stimmproben | `{art: "stimmprobe", index: 0 bis 3}` | nein | Kommt aus dem Fragebogen v2 |

"Der Zinshaus-Mann, dem Notare vertrauen" steht nicht in `eigeneWorte`, weil er aus `antworten.ideal` (v1) stammt und keine zulässige Referenzart hat. Er bleibt in `rolle` von Schritt 7, intern (M7). Die Grätzl-Antwort und `abschluesse` sind Fakten, keine Sätze mit Klang; sie gehen über `sagen` und `beweise` ein, nicht über die Stimmgabel.

**`stimme.stimmgabel` vor dem Wort-Link** (Rangfolge aus 3.1): 1. `z1` (gesprochen, intern, nur Klang), 2. `geschichte.abgeraten` (geschrieben, nachUnterlage), 3. `geschichte.herkunft` (geschrieben, intern). Nach dem Wort-Link folgen die vier Sätze der kurzen Fassung, markierte mit Gewicht 2 vor unmarkierten mit Gewicht 1.

**Claim-Werkstatt für Markus**

| Kandidat | Ergebnis | Idee, Eigentum, Klang, Dauer | Grund |
|---|---|---|---|
| Rat vor Auftrag. | **Empfehlung** | 2, 2, 2, 2 (8) | Die abgezeichnete Claim-Idee. Trägt die Kernidee als Reihenfolge: erst der Rat, der Auftrag danach oder gar nicht. Passt genau zur Figur und zur Spanne, deren linkes Ende der Rat ist. "Rat" ist sein Verb "geraten" als Nomen, der Beleg ist `b1`. Eigentum 2, weil er den Satz in der Rohskizze seiner gewählten Richtung gesehen hat (`06_territorien.md` Zeile 402 und 403); unter der Annahme, dass er ihn dort nicht verworfen hat. Der Austauschtest gegen `workshop.karte` steht aus (Lücke); "Beratung vor Abschluss" liegt als Branchenformel nahe |
| Rat, auch zum Warten. | **Gegenentwurf** | 2, 2, 1, 2 (7) | Dieselbe Idee, aber als unbequemer Inhalt des Rats statt als Reihenfolge (Achse unten). "warten" steht wörtlich in F4, "Rat" aus "geraten". Das "auch" ist die Schärfung aus Gate 1 im Satz selbst: nicht nur Warten, darum besteht er Kriterium 7. Kein Makler der Konvention rät öffentlich zum Warten, darum ist der Austauschtest hier wahrscheinlich leichter als bei der Empfehlung (Ableitung, Karte fehlt). Klang 1: das Komma bremst laut gelesen |
| Geraten, nicht gedrängt. | gestrichen, Kriterium 4 | 1, 2, 2, 2 | Zwei eigene Wörter ("geraten" aus F4, "gedrängt" aus `z1`), aber im Satzmuster "X, nicht Y", der häufigsten Kontrastform der Branche und der Sprachmodelle ("Beraten statt verkaufen"). Die beiden Wörter bleiben in `sagen` |
| Zeit ist Teil des Preises. | gestrichen, Kriterium 4 | | Satzbaustein des Regelpfads für jeden Kenner mit Warte-Geschichte (`wb-plattform.jsx` Zeile 215), in Schritt 6 ausdrücklich gesperrt (`06_territorien.md` Zeile 642 und 815) |
| Erst der Rat. Dann der Auftrag. | gestrichen, Kriterium 4 | | Satzmuster der Schablone "Erst verstehen. Dann verkaufen." (Zeile 215) |
| Erst wann. Dann wie viel. | gestrichen, Kriterium 4 | | dasselbe Satzmuster; außerdem aus dem nicht gewählten Territorium "Der Zeitpunkt" |
| Rat zuerst. Auftrag vielleicht. | gestrichen, Kriterium 7 | 2, 2, 1, 1 | trägt allein das Risiko "klingt nach Zögern"; "vielleicht" liest sich unter seinem Namen als Unsicherheit, nicht als Verzicht |
| Warten dürfen. | gestrichen, Kriterium 7 | | Warten allein, ohne schnellen Fall |
| Ich rate zuerst. | gestrichen, Kriterium 8 | | "raten" heißt auch vermuten; unter dem Namen eines Maklers, der Preise erst mit Beleg nennt, das Gegenteil der Aussage |
| Unter Druck verkauft man nicht. | gestrichen, Kriterium 5 | | "ohne Druck verkaufen" ist eine verbreitete Formel der Branche. Aus demselben Grund steht der Satz auch nicht mehr in der Story |
| Nicht unter Druck. | gestrichen, Kriterium 8 | | unter seinem Namen mehrdeutig: Wer steht nicht unter Druck? |
| Jedes Haus hat eine Akte. | gestrichen, Richtung | | Claim-Idee des verworfenen Territoriums `t-akte` |
| Warten kann sich rechnen. | gestrichen, Kriterium 7 | | Warten allein, ohne schnellen Fall; "rechnen" als Wortspiel |

Achse des Paars: **Reihenfolge seines Handelns gegen den Inhalt seines Rats.** Die Empfehlung sagt, was zuerst kommt, der Gegenentwurf, was der Rat sein kann. Beide treffen den Markenvertrag (Attribute Aufrichtig und Ruhig). Das Team würde "Rat, auch zum Warten." mit voller Überzeugung umsetzen: Er nennt das, was in seinem Gebiet niemand öffentlich sagt, und das Zeichen der Spanne trägt ihn ebenso, dann mit der langen Spanne als erstem Bild. Kein Gleichstand, darum greift die Tie-Break-Regel hier nicht; gälte noch die alte Wertung von Eigentum (1 für die Empfehlung), stünde es 7 zu 7 und der Gegenentwurf würde Empfehlung.

Begründung unter der Empfehlung im Wort-Link, geprüft durch lautes Lesen: "Wir empfehlen den ersten Satz. Sie haben einer Erbengemeinschaft zum Warten geraten, auch ohne Auftrag. „Rat vor Auftrag" sagt genau das."

**`botschaften`**

- `claim`: nach seiner Wahl, Empfehlung "Rat vor Auftrag."
- `claimAlternativen`: der nicht gewählte Satz des Paars und die gestrichenen Kandidaten mit Grund, nur für das Kapitel "Wie wir zu dieser Marke gekommen sind" in Schritt 14.
- `bio`: `{instagram: "Zinshäuser und Altbau, meist in Sievering. Für Erben und Anleger. Rat vor Auftrag.", linkedin: "Makler für Zinshäuser und Altbau in Döbling, meist in Sievering. Rat vor Auftrag.", zeichenMax: HM_BIO_MAX}`; `HM_BIO_MAX` ist 150 wie die Setzung in `13_feed.md` Zeile 171.
- `einSatz` (der Satz, den ein Notar weitersagt, Kontext website): Wenn Sie in Sievering ein Zinshaus erben, fragen Sie zuerst Markus Leitner. (12 Wörter)
- `dreiSaetze` (dritte Person): Markus Leitner verkauft Zinshäuser und Altbauwohnungen in Döbling, meist in Sievering. Einer Erbengemeinschaft riet er zu warten, nach 2 Jahren lag ihr Ergebnis um 600.000 Euro höher. Ein Zinshaus in Sievering verkaufte er dagegen in 11 Wochen.
- `ueberMich`: `story.mittel` plus Einladung: "Wenn in Ihrer Familie gerade über ein Haus entschieden wird, rufen Sie mich an."
- `boilerplate` (dritte Person, 58 Wörter): Markus Leitner ist Makler für Zinshäuser, Anleger- und Altbauwohnungen in Döbling, Währing und Hietzing, zuletzt vor allem in Sievering. Er berät Erbengemeinschaften und Anleger vor der Entscheidung. Wenn Warten mehr bringt, sagt er das, auch wenn es dann vorerst keinen Auftrag gibt. Ein Zinshaus in Sievering verkaufte er in 11 Wochen. Im Jahr 2025 begleitete er 14 Abschlüsse.
- `boilerplateZusatz`: Kommt aus der Redaktion: UNIO-Zeile nach Entscheidung zur Markenarchitektur (intern, damit `boilerplate` ohne Lückenmarke bleibt).

**`story`**

- `herkunft`: `{art: "geschichte", pfad: "herkunft"}`, öffentlich nur der Teil "Döbling"; der Rest wartet auf `k1`.
- `spannung`: `einsicht.spannung` (Schritt 5).
- `wendepunkt`: Kommt aus dem Workshop: der Moment, in dem er fast aufgehört oder alles anders gemacht hätte (Frage F10 in `04_workshop.md` Zeile 356).
- `haltung`: `{art: "geschichte", pfad: "abgeraten"}`; `werte` Aufrichtigkeit.
- `versprechen`: Sie wissen, was Warten kostet und was Verkaufen bringt, bevor Sie unterschreiben. (Schritt 7, wörtlich)

`kurz` (33 Wörter, vier Sätze, wie im Wort-Link):

| Nr. | Satz | Wörter | `ton` | Ort, Beleg oder eigenes Wort |
|---|---|---|---|---|
| 1 | Ich arbeite meist in Sievering. | 5 | ort | Ort aus `graetzl`; Beleg `b4` (6 bis 8 der letzten 10 Abschlüsse) |
| 2 | Einer Erbengemeinschaft habe ich geraten zu warten, statt unter Druck zu verkaufen. | 12 | nein, `kern: true` | eigene Worte aus F4, fast wörtlich (Referenz `geschichte.abgeraten`); Beleg `b1` |
| 3 | Ein Zinshaus in Sievering war in wenigen Wochen verkauft. | 9 | tempo | Fall aus `abschluesse`, Ort nur als Grätzl (P17); Beleg `b2` |
| 4 | Einen Preis nenne ich erst mit Beleg. | 7 | zahl | Beleg `b3` in seiner Behauptung "Schätzt realistisch"; `persoenlichkeit` genau ("Jede Zahl mit Ort, Zeitraum und Quelle") |

Laut gelesen: kurz, lang, mittel, kurz. Kein Satz ist Biografie, keiner eine Branchenformel, keiner eine Umschreibung des Musterbeispiels. Satz 2 ist der Satz aus dem Musterbeispiel, der nachweislich aus seiner Antwort stammt (Ausnahme in P7). Satz 3 steht neben Satz 2, damit das Warten nicht nach Zögern klingt (M3). Die Stimmgabel gibt Claude damit vier übertragbare Töne: wo er arbeitet, wie er Nein sagt, wie er Tempo zeigt, wie er mit Zahlen umgeht.

`mittel` (76 Wörter, enthält alle vier Sätze der kurzen Fassung wörtlich):

> Ich verkaufe Zinshäuser und Altbauwohnungen in Döbling, Währing und Hietzing. Ich arbeite meist in Sievering. Im Jahr 2025 waren es 14 Abschlüsse. Einer Erbengemeinschaft habe ich geraten zu warten, statt unter Druck zu verkaufen. Einen Auftrag gab es dafür zunächst nicht. Nach 2 Jahren lag ihr Ergebnis um 600.000 Euro höher. Ein Zinshaus in Sievering war in wenigen Wochen verkauft. Nach 11 Wochen stand der Kaufvertrag über 4.200.000 Euro. Einen Preis nenne ich erst mit Beleg.

Die Fälle folgen der Figur (Rat, Dauer, Ergebnis), neben dem langen Fall steht der schnelle (M3). Der Wendepunkt fehlt und fällt in dieser öffentlichen Fassung weg. `b3` fehlt, bis die Bezugsgröße geklärt ist. Zahlen aus `b1`, `b2`, `b5`, der Auftrag-Satz aus `b7`: öffentlich erst nach Unterlage. Der Betrag aus `b2` braucht zusätzlich die Kundenfreigabe (M2); fehlt sie, endet der Satz nach "Kaufvertrag" ("Nach 11 Wochen stand der Kaufvertrag."), die Länge bleibt über 70 Wörtern. Kein Doppelpunkt.

`lang` (Kontext website, 163 Wörter ohne Lückenmarken):

> Ich bin in Döbling aufgewachsen. [Kommt aus der Klärung k1: ein Satz zur Herkunft, nur bei der Entscheidung "Im Text ja"] [Kommt aus dem Workshop: aus welchem Beruf ich in die Branche kam] Ich verkaufe Zinshäuser und Altbauwohnungen in Döbling, Währing und Hietzing. Ich arbeite meist in Sievering. Im Jahr 2025 waren es 14 Abschlüsse.
>
> Wer ein Haus verkauft, will sich nicht gedrängt fühlen. Bei Erben steht oft mehr als ein Name im Grundbuch. Und häufig ist meine Provision die erste Frage, noch vor dem Haus.
>
> [Kommt aus dem Workshop: Wendepunkt]
>
> Wenn ich zum Warten rate, lege ich die Berechnung dazu. Einer Erbengemeinschaft habe ich geraten zu warten, statt unter Druck zu verkaufen. Einen Auftrag gab es dafür zunächst nicht. Nach 2 Jahren lag ihr Ergebnis um 600.000 Euro höher.
>
> Warten ist trotzdem keine Regel. Ein Zinshaus in Sievering war in wenigen Wochen verkauft. Auch dort waren es Erben, sie kamen über ihren Notar. Nach 11 Wochen stand der Kaufvertrag über 4.200.000 Euro. Beim Altbau in Hietzing gab Diskretion den Ausschlag. Einen Preis nenne ich erst mit Beleg.
>
> [Kommt aus dem Workshop: ein beruflicher Fehler mit Lerneffekt; Platz hier, nach den Belegen]
>
> [Kommt aus der Unterlage zu b3: wessen erste Schätzung; dann ein Satz zur Anlegerwohnung in Währing, nicht direkt nach dem Satz über belegte Preise]
>
> Wenn Sie vor dieser Entscheidung stehen: Sie wissen, was Warten kostet und was Verkaufen bringt, bevor Sie unterschreiben.

Prüfung (Ableitung): Die Fehlergeschichte hat ihren Platz erst nach den Belegen (V6); die Grenze "Fehler und Learnings" steht auf "zeigen", der Text fehlt. Der Absatz zur Spannung ist eine Umformung von `einsicht.spannung` in seine Ich-Form und vermeidet bewusst den Wortlaut der Regelcode-Vorlage "steht die Provision im Raum" (`wb-plattform.jsx` Zeile 135, P7). "Wenn ich zum Warten rate, lege ich die Berechnung dazu." ist `werte[Aufrichtigkeit].verhalten` aus Schritt 7 in Ich-Form. Der Satz zu Hietzing stützt sich auf `abschluesse` im Seed, Selbstauskunft ohne Zahl; er trägt keine Leistungsbehauptung und braucht darum keinen Eintrag in `beweise`, steht aber wie alles in `lang` erst nach Gate 2 öffentlich. Der Schluss ist das Versprechen und damit die einzige Stelle der Wendung "bevor Sie unterschreiben" auf dieser Fläche; er hat den einzigen Doppelpunkt.

**`presse`**

- `kurzbio` (zwei Sätze, 14 und 10 Wörter): Markus Leitner ist Makler für Zinshäuser und Altbau in Döbling, vor allem in Sievering. Er rät Erben auch zum Warten, wenn das mehr bringt.
- Der zweite Satz ist die Behauptung von `b1` ("Rät vom Verkauf ab, wenn Warten mehr bringt"), öffentlich nach Unterlage.
- `themen`:

| Thema | Frage einer Redaktion | Belege |
|---|---|---|
| Geerbtes Zinshaus: verkaufen oder warten | Wann lohnt es sich für Erben, mit dem Verkauf zu warten, und wann nicht? | `b1`, `b2` |
| Die erste Schätzung | Wie verlässlich ist die erste Preisschätzung eines Maklers? | `b3`, erst nach Klärung der Bezugsgröße; bis dahin intern |
| Lücke | Kommt aus Schritt 7: ein dritter tragender Beweis, etwa die Rechnung hinter `b1` oder die Liste zu `b4` aus dem Bestand-Import. Termin: vor Gate 2 (Schritt 14) | keiner |

- `beispielzitat`: Lücke. Kommt aus dem Workshop: ein Satz von Markus zum Thema Erbe, wörtlich, als öffentlich bestätigt (F22 in `04_workshop.md` Zeile 370). `z1` beschreibt Kunden und taugt nicht als Presse-Zitat.

**Der Wort-Link für Markus, Teil 2 (Textstand)**

```text
Jetzt die Worte.
Zwei kurze Aufgaben, zusammen etwa vier Minuten.

Welcher Satz steht unter Ihrem Namen?
Beide sagen dasselbe: Ihr Rat kommt vor Ihrem Auftrag.
Lesen Sie beide einmal laut. Welchen würden Sie am Ende eines
Erstgesprächs sagen?

Rat vor Auftrag.
  Markus Leitner
  Makler für Zinshäuser und Altbau in Döbling, meist in Sievering.
  Rat vor Auftrag.

  ... Einen Preis nenne ich erst mit Beleg. Rat vor Auftrag.

  Sievering. 11 Wochen.  [kurze Spanne]
  Rat vor Auftrag.

  Wir empfehlen den ersten Satz. Sie haben einer Erbengemeinschaft
  zum Warten geraten, auch ohne Auftrag. „Rat vor Auftrag" sagt
  genau das.
  [ Diesen Satz nehme ich ]

Rat, auch zum Warten.
  [dieselben drei Anwendungen]
  [ Diesen Satz nehme ich ]

Keiner passt

Klingt das nach Ihnen?
Ihre Haltung in vier Sätzen. Tippen Sie die an, die genau so klingen
wie Sie. Zwei oder drei.
  Ich arbeite meist in Sievering.
  Einer Erbengemeinschaft habe ich geraten zu warten, statt unter
  Druck zu verkaufen.
  Ein Zinshaus in Sievering war in wenigen Wochen verkauft.
  Einen Preis nenne ich erst mit Beleg.
[ Fertig ]
Keiner passt

So klingen Sie ab jetzt.
  Markus Leitner
  Makler für Zinshäuser und Altbau in Döbling, meist in Sievering.
  Rat vor Auftrag.
[die markierten Sätze]
An diesen Sätzen und an dem, was Sie im Workshop gesagt haben, messen
wir jeden Text, den wir für Sie schreiben.
Als Nächstes entstehen Ihre Idee und Ihr Feed. Wir zeigen sie Ihnen am
[Datum des Reveals].
```

In der Anwendung "unter einem Fall" steht der schnelle Fall `b2` ohne Betrag, weil der Wort-Link vor der Unterlage gezeigt wird und der Makler dort seine eigenen Zahlen sieht, nicht die Öffentlichkeit. Die Spanne ist eine schlichte Linie aus der Werkbank, nicht das spätere Zeichen. Der Satz "Beide sagen dasselbe: Ihr Rat kommt vor Ihrem Auftrag." ist die einzige Zeile mit Doppelpunkt auf dem Bildschirm.

**Probe "Antwort tauschen" (Rubrik, Kriterium Wirkung)**

| Antwort | Ausgang |
|---|---|
| Claim: Empfehlung | `botschaften.claim` "Rat vor Auftrag."; `botschaften.bio` beider Kanäle, Karte, Signatur und Story-Endkarte in Schritt 10 und 13 tragen ihn; Schritt 9 antwortet mit dem Idee-Satz auf eine Reihenfolge, das linke Ende der Spanne ist der Rat |
| Claim: Gegenentwurf | `botschaften.claim` "Rat, auch zum Warten."; dieselben Flächen ändern sich; Schritt 9 antwortet auf den Inhalt des Rats, die lange Spanne wird das erste Bild des Zeichens, die kurze steht als Schärfung daneben |
| Markiert 1 und 2 (ort, nein) | `stimme.anker` Ort und Nein; `stimmgabel`: Sätze 1 und 2 Gewicht 2, 3 und 4 Gewicht 1; `tonGewicht` ort 2, nein 2; Schritt 12 baut Hooks mit Ort zuerst oder Ich-Rat zuerst. Inhalt, Folgen, Pins unverändert |
| Markiert 3 und 4 (tempo, zahl) | `stimme.anker` Tempo und Zahl; `stimmgabel` mit 3 und 4 vorn; `tonGewicht` tempo 2, zahl 2; Schritt 12 baut Hooks mit Dauer im Kontrast oder Ziffer vorn. Satz 2 (Kern) ist nicht markiert: Eintrag an den CD nach 3.12, Schritt 9 wartet auf dessen Entscheidung |
| Stimmprobe P1 Pol A statt B (Annahme) | M10 entfällt; `ernst` 25 statt 75; Ermessen erlaubt eine trockene Untertreibung, das Beispiel "Abraten" bekommt "Das Haus läuft Ihnen nicht davon." vor "Für mich heißt das: heute kein Auftrag." |
| Stimmprobe P4 Pol A statt B (Annahme) | M11 entfällt; `sachlich` 25 statt 75; die Absage darf "Die Vergleichswerte lagen zuletzt darunter" ohne Ort und Zeitraum sagen, Ermessen "der Fall als Szene" |

---

## 4. Fragen an den Makler

### 4.1 Was gefragt wird

| Frage | Wirkt auf | Warum sie den Output verändert |
|---|---|---|
| "Welchen Satz würden Sie am Ende eines Erstgesprächs sagen?" Wahl zwischen Empfehlung und Gegenentwurf, oder "Keiner passt" mit einem Satz | `botschaften.claim`, `botschaften.claimHerleitung.wahl`, `botschaften.bio`; bei "Keiner" `wortlink.stimme.claimNotiz` und ein neuer Satz zur Bestätigung | Der Claim steht auf Bio, LinkedIn-Kopf, Karte, Signatur, Story-Endkarte und ist Eingang für den Idee-Satz in Schritt 9. Probe in 3.14 |
| "Tippen Sie die an, die genau so klingen wie Sie. Zwei oder drei." | `stimme.anker[]`, `stimme.stimmgabel`, geschützte Sätze in `story`; `stimme.stimmgabel[].gewicht` und `stimme.tonGewicht` (3.12); bei nicht markiertem Kernsatz `stimme.pruefung.cdEintraege` | Andere Markierung, andere Gewichtung der Tonreferenz und anderer Satzbau der Hook-Formeln bei gleichem Inhalt; unmarkierter Kernsatz löst eine Gegenprüfung von Claim und Territorium aus (Probe in 3.14) |
| Optional: "Einen Satz würde ich anders sagen" (höchstens ein Satz) | `stimme.eigeneWorte[]` mit Art `wortlink`; der betroffene Satz in `story.kurzSaetze` | Sein Satz ersetzt den Entwurf, wenn er V1 bis V11 besteht, sonst schreibt das Team ihn mit seinem Wortlaut regelkonform |

Eine Entscheidung (Claim, zwei kuratierte Optionen, eine empfohlen) und eine Wiedererkennung am eigenen Text, beides in einer Sitzung abschließbar. Keine Frage nach Schrift, Farbe, Layout oder Gefallen. Die Klärung `k1` ist keine Frage dieses Schritts: Sie gehört Schritt 4 und wird im Richtungstermin entschieden.

### 4.2 Was bewusst nicht gefragt wird, sondern abgeleitet

| Nicht gefragt | Stattdessen aus | Warum |
|---|---|---|
| "Wie soll Ihre Marke klingen?" | Stimmproben (Schritt 2), Mitschrift (Schritt 4), `stimmeRichtung` (Schritt 7) | Adjektive über sich selbst messen Selbstbild, nicht Stimme (A1, A2) |
| "Du oder Sie?", auch für die Website | `antworten.anredeJeKanal` einschließlich der Zeile "Website und E-Mail" (F14) | schon gefragt |
| "Welche Wörter mögen Sie nicht?" | `markenvertrag.falschWaere`, `grenzen`, `grenzenFrei`, Anmerkungen "Wortwahl oder Ton" | liegt nach Schritt 4 und 7 vor |
| "Erzählen Sie Ihre Geschichte." | `workshop.geschichte`, `workshop.zitate` | im Gespräch reicher als im Formular (A7) |
| "Welcher von diesen zehn Claims?" | Claim-Werkstatt, zwei gezeigt | Auswahlüberlastung (A5) |
| "Wie leicht sprechen Sie über Erfolge?" | `antworten.erfolge` | vorhanden, wirkt auf Ermessen E1 |
| "Dürfen wir diesen Satz zitieren?" | `workshop.zitate[].oeffentlich` | im Workshop geklärt; ohne Klärung bleibt der Satz intern |
| "Zu welchen Themen würden Sie Interviews geben?" | Einträge in `beweise` | ein Thema ohne Beleg ist kein Pressethema |
| "Was soll in Ihrer Bio stehen?" | Claim, Objekte, Orte, `positionierung.fuerWen` | eine Bio ist Ableitung |
| Regler zur Tonalität | Stimmproben und Korpus | 101-Punkt-Regler ziehen zum Startwert (A2) |
| "Wie sollen Fälle erzählt werden?" | Zeichenidee und Typo-Richtung des gewählten Territoriums | die Satzfigur folgt aus der Idee, die er im Richtungstermin gewählt hat |

---

## 5. Eingang und Ausgang

### 5.1 Eingang nach dem Vertrag

| Von | Feld | Wofür in diesem Schritt |
|---|---|---|
| 7 | `positionierung` | `einSatz`, `dreiSaetze`, `boilerplate`, `presse.kurzbio`; `andersAls` für V7; Austauschtest des Claims |
| 7 | `versprechen` | `story.versprechen` wörtlich, Einladung in `ueberMich`, erster Website-Satz |
| 7 | `persoenlichkeit` | Ermessen (`heisstNicht` als Grenze der Übertreibung), V8, Ton `zahl` in `kurz` |
| 7 | `beweise` | V3, `belegRefs`, Belege der Story, `presse.themen` (einzige Quelle), Claim-Kriterium 6 |
| 7 | `markenvertrag` | `stimmeRichtung`; `attribute[].imText` als Herkunft verbindlicher Regeln; `falschWaere` für `vermeiden`; `leitidee` für Claim-Kriterium 9; `version` für `stimme.basisVersion`; `bestaetigtAm` als Sperre |
| 6 | `territorien` des gewählten Wegs (`claimIdee`) | Stoff der Claim-Werkstatt |
| 2 | `antworten.stimmproben` | Regler, Ermessen, Beispiele, verbindliche Regeln aus P1 und P4, `eigeneWorte` aus `eigenerSatz` (3.7); Fassung und Datenfeld wie `02_fragebogen.md` Zeile 574 |
| 2 | `antworten.anredeJeKanal` | `anrede`; die Schlüssel bestimmen, für welche Kanäle Caption und Bio Pflicht sind |
| 2 | `antworten.erfolge` | Ermessen E1 |
| 2 | `antworten.grenzen`, `grenzenFrei` | V5, Makler-eigene Regeln |
| 2 | `antworten.worte` | V8; Korpus-Prüfung, dass die drei Wörter im Satzbau erkennbar sind |
| 4 | `workshop.zitate` | `eigeneWorte`, Korpus, `presse.beispielzitat` |
| 4 | `workshop.geschichte` | `story`, `eigeneWorte`, V6 |

### 5.2 Abweichungen im Eingang, begründet

| Nr. | Von | Feld | Warum | Folge für die Listen |
|---|---|---|---|---|
| AE1 | 5 | `einsicht.spannung` | `story.spannung` verlangt die abgezeichnete Spannung; ohne sie müsste der Schritt sie erfinden (so auch `05_einsicht.md` Abschnitt 5, Punkt 2) | Schritt 5 ergänzt 8 als Nachfolger, Schritt 8 ergänzt 5 als Vorgänger. Rückfall: `workshop.switch.angst` aus Schritt 4 |
| AE2 | 6 | zusätzlich zu `claimIdee`: `kernidee`, `risiko`, `zeichenIdee`, `zeichenSkizze`, `typoRichtung`, `serienIdee` des gewählten Territoriums, `gate1.schaerfung`, `richtung.gewaehltId`, `richtung.zitatMakler` | Eine Idee für Wort und Bild (3.9); Claim-Kriterium 7 braucht Risiko und Schärfung; `zitatMakler` ist ein gesprochener Satz (Rangfolge 3.1) | keine, 6 ist Vorgänger |
| AE3 | 7 | `werte`, `rolle` | `werte[].nie` wird zu verbindlichen Regeln (M8), `rolle` nie als Tatsache (V8, M7); Vorschlag aus `07_positionierung.md` 5.5 | keine, 7 ist Vorgänger |
| AE4 | 4 | `workshop.klaerungen` (über `hmWirksam`) | eine offene Klärung sperrt öffentliche Felder (M5, 8.0) | keine, 4 ist Vorgänger |
| AE5 | 4 | Feld `bis` in `workshop.klaerungen[]` | ohne Termin wartet eine Klärung still bis Schritt 14 | Anforderung an Schritt 4, ein Feld mehr, kein neuer Abnehmer |
| AE6 | Extern | Claims, Seriennamen, Hooks und `story.kurz` der anderen UNIO-Makler (Kohorte) | Claim-Kriterium 4 und P7 | extern wie in Schritt 6 und 14 |

Die frühere Abweichung "Website-Zeile in `anredeJeKanal`" entfällt, weil F14 die Zeile "Website und E-Mail" immer abfragt. Die frühere Abweichung "Paar Gefühl gegen Beleg" entfällt zugunsten der gemeinsamen Fassung mit Schritt 2 (3.7).

### 5.3 Ausgang nach dem Vertrag und Abnehmer

| Feld | Inhalt | Erzeugt von | Abnehmer |
|---|---|---|---|
| `stimme.regler` | `{ernst, persoenlich, begeistert, sachlich}` 0 bis 100 oder `null` | Regeln | 9 (`brief.tonprofil`), 10 (Schrift), 14 |
| `stimme.verbindlich[]` | `{id, regel, aus, pruefung: "auto" oder "hinweis" oder "team", test}` | Regeln, Claude, Team | 12 (`sprachpruefung`), 13, 14, 17 über `quelle` |
| `stimme.ermessen[]` | `{nuance, so, nicht, aus}` | Claude, Regeln, Team | 12, 13, 14, 17 über `quelle` |
| `stimme.sagen[]`, `stimme.vermeiden[]` | Wörter der Marke und Wörter, die sie nie sagt | Claude, Regeln, Team | 12 (`sprachpruefung` liest `vermeiden` statt einer zweiten Liste), 13, 14, 17 |
| `stimme.beispiele[]` | `{wo, kontext, so, nicht, belegRefs, probeRef, intern}`; Pflicht: Caption je Kanal, erste Antwort, Absage oder Abraten, erster Website-Satz, Bio je Kanal | Claude, Team | 13, 14, 17 |
| `stimme.eigeneWorte[]` | `{text, ref, gesprochen, verwendung, bedingung}`, Text per Regel kopiert | Regeln aus Claude-Referenz | 14 (Kennzeichnung "aus Ihrem Workshop"), 15 über 14 |
| `anrede` | Regel je Kanal und Kontext, mit `gruss` | Regeln | über `hmAnrede`: 12, 13, 14, 16, über `quelle` 17. Schritt 7 ist kein Abnehmer des Felds: Er ruft dieselbe Funktion, die vor Schritt 8 aus `antworten.anredeJeKanal` rechnet (3.6), liest also über die Kante 2 nach 7. Damit sind die Listen symmetrisch: 8 liefert an 9, 10, 12, 13, 14, 16 wie im Vertrag |
| `botschaften` | `{claim, claimAlternativen, einSatz, dreiSaetze, ueberMich, boilerplate}` | Claude, Team, Makler | 9, 10, 12, 16 (`claim`); 13; 14 (alles); `claimAlternativen` nur 14 |
| `story` | `{herkunft, spannung, wendepunkt, haltung, versprechen, kurz, mittel, lang}` | Claude oder Regeln, Team | 14; Website über `quelle` (16) |
| `presse` | `{kurzbio, themen[3], beispielzitat}` | Claude, Regeln, Team | 14 (Kapitel Pressebaustein) |

### 5.4 Abweichungen im Ausgang, begründet

| Feld | Inhalt | Warum | Abnehmer |
|---|---|---|---|
| `stimme.figur` | Satzfigur aus dem Territorium (3.9) | eine Idee für Wort und Bild; Schritt 9 begründet das Zeichen damit | 9 (`idee.begruendung`), 12, 13, 14 |
| `stimme.anker[]` | `{satz, index, ton, kern, markiertAm}` | Zielfeld der zweiten Aufgabe | 14; über `stimmgabel` und `tonGewicht` an 12, 13, 17 |
| `stimme.tonGewicht` | `{ort, nein, tempo, zahl, haltung}` je 1 oder 2 | Wirkung der Markierung auf den Satzbau der Hook-Formel (3.12) | 12 (`serien[].hookFormel`), 17 über `quelle` |
| `stimme.zahlen` | Schreibweise je Größe (3.8, V12) | Zahlen sind Teil der Handschrift, Typo-Richtung "Ziffern tragen" | 10 (`system.typo.ziffern`), 12, 13, 14, 17 |
| `stimme.wendungen[]` | `{text, herkunft, hoechstens, nie[]}` | Frequenzregel neben dem Claim (3.8) | 12, 13, 17 |
| `stimme.stimmgabel[]` | geordnete Tonreferenz `{text, ref, rang, gewicht, verwendung}` | Rangfolge aus 3.1 als Datenfeld, damit Claude sie in dieser Ordnung bekommt | 12, 13, 17 |
| `stimme.reglerHerkunft` | je Regler `{wahl, messung, n, abweichung}` | jede Zahl begründet | 9, 10, 14 |
| `stimme.basisVersion` | Version des Markenvertrags | kein stiller Bruch | 14, 16 |
| `stimme.pruefung` | `{regeln[], hinweise[], naehe[], lautlesen, fremdtexter {situation, a, b, c, zuordnung, ok}, cdEintraege[], cd, datum}` | Gate 2 verlangt `lautleseOk`; E1 als Nachweis | 12, 14 |
| `botschaften.bio` | `{<kanal>: text, zeichenMax}` je aktivem Kanal | Schritt 13 liest laut Vertrag "botschaften (Bio)"; ohne eigenes Feld müsste es in `beispiele` suchen | 13 (`feed.profilkopf.bio`), 16 (`rollout.liveTag.bio`, `kopfzeilen`) |
| `botschaften.claimHerleitung` | `{territoriumId, belegRef, empfehlung, gegenentwurf, achse, wahl, kandidaten[]}` | Arbeit zeigen (Buell und Norton 2011: https://doi.org/10.1287/mnsc.1110.1376) | 9, 14 |
| `botschaften.boilerplateZusatz` | interne Lücke zur UNIO-Zeile | `boilerplate` bleibt ohne Lückenmarke | 14 |
| `story.kurzSaetze[]` | `{text, ton, quelle, belegRef, kern}` | Markieren, Schützen, Kernsatz erkennen | 14, Wort-Link; 12, 13 über `stimmgabel` |
| `anrede.fehlend[]` | Kanäle ohne Wahl | Lücke sichtbar statt still duzen | 12, 17 |
| `wortlink.stimme` | `{claimGezeigt[2], claimWahl, claimNotiz, storyMarken[], satzNeu, kaumEiner, erinnerungen[], geoeffnetAm, dauerSek, abgeschlossenAm}` | Nachweis der Wahl, echte Dauer | 14, 17 (`lernen`) |

Abweichung vom Vertragstext bei `stimme.regler`: `null` statt einer Zahl, wenn kein Stoff vorliegt. Ein gesetzter Mittelwert wäre eine erfundene Zahl.

### 5.5 Korrekturbedarf an Nachbarverträgen und Beispielen

1. **Schritt 5 und 8:** AE1, Listen symmetrisch ergänzen.
2. **Schritt 4:** AE5 (`bis` in `klaerungen`). Im Beispiel JSON (`04_workshop.md` Abschnitt 8.2) verweist `geschichte.herkunft` auf `antworten.aufgewachsen`; in v2 muss dieser Verweis auf ein Zitat aus Frage F9 zeigen, weil es das Feld im Fragebogen v2 nicht gibt.
3. **Schritt 7:** (a) Das Beispiel verwendet noch Positionierung und Leitidee des Territoriums "Der Zeitpunkt". Nach `06_territorien.md` Zeile 580 gilt für Markus bei Wahl der Empfehlung `t-nein-als-rat`. Das Versprechen passt zu beiden. (b) `hmAnrede` bleibt in `wb-vertrag.jsx` und liest in der Reihenfolge aus 3.6: `quelle`, `marke2.anrede`, sonst `hmAnredeRegel(antworten)`. (c) Neuer Eintrag in `beweise`: `{id: "b7", behauptung: "Rät zum Warten, auch wenn es dann vorerst keinen Auftrag gibt", beleg: "Sie kamen mit 600.000 mehr zurück", quelle: "antworten.abgeraten", pruefstatus: "Selbstauskunft", unterlageFehlt: "Datum des Rats und Datum des späteren Auftrags, falls es einen gab", oeffentlich: "offen"}`. Bis `b7` dort steht, sind die Sätze, die ihn tragen, in diesem Schritt `nachUnterlage`. (d) In `b1` die Behauptung nicht um "auch wenn es Provision kostet" erweitern: Das ist nicht belegt (3.14).
4. **Schritt 9:** liest `stimme.figur` (8 ist Vorgänger, kein neues Feld im Vertrag nötig) und nimmt `fuerSchritt9` in `idee.begruendung` auf. Das Beispiel Markus in `09_idee.md` (Zeile 19, 251 und 309) baut noch auf "Zeit ist Teil des Preises." und dem "Zeitmaß" auf und muss auf die Spanne aus `t-nein-als-rat` und den gewählten Claim umgestellt werden.
5. **Schritte 10 bis 16:** Ihre Beispiele für Markus nennen "Zeit ist Teil des Preises." als Claim (`11_bild.md` Zeile 171, `12_social.md` Zeile 309, `13_feed.md` Zeile 274, `14_markenbuch.md` Zeile 454 und 477, `15_reveal.md` Zeile 288, `16_freigabe.md` Zeile 397; `10_system.md` Zeile 410 baut den Kernsatz noch auf dem Zeitpunkt). Sie lesen `botschaften.claim` und übernehmen nach diesem Dokument die Wahl im Wort-Link; bis dahin gilt "Rat vor Auftrag." als Arbeitsstand, nie der gesperrte Satz.
6. **Schritt 12:** (a) `sprachpruefung` liest `HM_STIMME_KLISCHEES`, `HM_STIMME_AT`, `HM_STIMME_MUSTER` und `stimme.vermeiden`; Seriennamen werden gegen `botschaften.claim` geprüft; kein Serien-Abbinder in Claim-Form. (b) Der Eingang "8: stimme" (`12_social.md` Zeile 543 nennt heute `regler`, `verbindlich`, `ermessen`, `sagen`, `vermeiden`, `beispiele`, `eigeneWorte`) wird um `stimmgabel`, `tonGewicht`, `figur`, `zahlen` und `wendungen` ergänzt; ohne diese Felder ist die Wirkung der Markierung nicht nachweisbar. Kein neuer Vorgänger, 8 ist schon Vorgänger. (c) Der Satzbau jeder `hookFormel` folgt `tonGewicht` (Tabelle 3.12); Inhalt, Reihenfolge und `start30` entscheidet Schritt 12 und 13 ohne Bezug auf die Markierung. (d) Der Arbeitsname der Signatur-Serie aus Schritt 6, "Wann, nicht ob", fällt unter das Muster "X, nicht Y" und wird in Schritt 12 als Serienname neu gesucht.
7. **Schritt 13:** `feed.profilkopf.bio` liest `botschaften.bio[kanal]` statt `stimme.beispiele` mit `wo` "Bio"; `HM_BIO_MAX` ist dieselbe Konstante.
8. **Schritt 14:** Kapitel Stimme zeigt `verbindlich`, `figur`, `zahlen` und `ermessen` getrennt; Längen aus `HM_STORY_LAENGEN`.
9. **Schritt 2:** besitzt die Stimmproben allein (3.7); `HM_V2_STIMMPROBEN` ist die Konstante, die `HM_STIMMPROBE_WIRKUNG` liest. In der Vorlage zu P2 steht "Grundbuchauszug", nach V13 "Grundbuchsauszug"; Hinweis an Schritt 2, die Vorlagen gegen `HM_STIMME_AT` zu prüfen. `hmAnredeRegel` wird dort nicht aufgerufen: Die Antworten bleiben Daten von Schritt 2, die Regel rechnet sie bei Bedarf.
10. **Schritt 10:** `system.typo.ziffern` liest `stimme.zahlen` (8 ist Vorgänger von 10), damit Schrift und Schreibweise der Zahlen aus derselben Entscheidung kommen.
11. **Schritte 12 und 14 (Diskretion):** (a) Schritt 12 übernimmt P17 unverändert in `sprachpruefung`, damit Captions, Hooks, Seriennamen und Bildtexte dieselbe Straßenregel haben wie 8 und 11. (b) Schritt 14 führt zur Unterlage für `b2` (`14_markenbuch.md` Zeile 507 und 651) eine Aufgabe "Kundenfreigabe für den Betrag"; erst wenn beide erledigt sind, steht der Betrag in einem öffentlichen Feld. Bis dahin endet der Betragssatz in `mittel` und `lang` nach "Kaufvertrag".

---

## 6. Qualitätsprüfung im Schritt

### 6.1 Regeln (automatisch, `hmStimmePruefen(mid)`)

| Nr. | Test | Grün, wenn | Wirkung bei rot |
|---|---|---|---|
| P1 | Anrede | alle öffentlichen Felder (`beispiele[].so` ohne `intern`, `botschaften`, `story.mittel`, `story.lang` im Kontext website, `presse` im Kontext Dritte) bestehen `hmAnredePruefen`; `anrede.fehlend` leer; `anrede.kontexte.website` gleich der Form des bestätigten Versprechens aus Schritt 7; Grußformeln nach `anrede.gruss` | Wort-Link gesperrt |
| P2 | Ein Claim | `claim` gesetzt, höchstens fünf Wörter, ohne Anrede, Zahl, Fragezeichen, Klischee; in keinem öffentlichen Feld eine abgewandelte Form. **Hinweis** auf Umschreibungen: ein Satz, der ein Schlüsselwort des Claims mit einem zweiten Schlüsselwort derselben Idee verbindet (für Markus ein Wort aus `Rat, Rats, rate, rät, riet, geraten` und eines aus `Auftrag, Aufträge, Provision` im selben Satz; die Liste leitet `hmStimmeClaimFeld` aus Claim und Kernidee ab). **Hinweis** auf Wendungen: eine Wendung aus `stimme.wendungen` öfter als erlaubt je Fläche, in der Bio, im Absatz des Claims oder in mehr als der Hälfte der Beispiele | Wort-Link gesperrt (vor der Wahl für beide gezeigten Sätze); Hinweise an den Texter |
| P3 | Zahlen | jede Zahl in öffentlichen Feldern entspricht einem Eintrag in `beweise`; Beträge mit Währung und in der Form aus `stimme.zahlen` (V12); keine pauschal erlaubten Zahlen; jede Kennzahl einmal je Text; ein Eintrag mit offener Bezugsgröße (für Markus `b3`) steht in keinem öffentlichen Feld | gesperrt; Selbstauskunft als Hinweis |
| P4 | Längen und Stimmgabel | `kurz` bis 35 Wörter in vier bis fünf Sätzen, jeder mit `ton` und mit Ort, `belegRef` oder Referenz auf ein eigenes Wort, mindestens einer mit `ton` "ort", genau einer mit `kern`; `mittel` 70 bis 100 und enthält alle `kurzSaetze`; `lang` 160 bis 220 ohne Lückenmarken; `bio` bis `HM_BIO_MAX`; `presse.kurzbio` ein oder zwei Sätze, zusammen höchstens 30 Wörter; kein Satz über 20 Wörter in irgendeinem öffentlichen Feld | gesperrt |
| P5 | Pratfall | ein Satz aus `workshop.geschichte.fehler` steht erst nach dem ersten Satz mit `belegRef`; nur bei Grenze "zeigen" | gesperrt |
| P6 | Lücken | kein öffentliches Feld (`kurz`, `mittel`, `beispiele` ohne `intern`, `botschaften` ohne `boilerplateZusatz`, `bio`, `presse.kurzbio`) enthält eine Lückenmarke; Variablen in geschweiften Klammern sind erlaubt; jede Lücke in internen Feldern hat einen Termin | Wort-Link gesperrt |
| P7 | Kohorte und Schablone | Claim nicht wortgleich mit einem anderen UNIO-Makler und nicht in einem Satzmuster aus `HM_STIMME_MUSTER` ("Erst X. Dann Y.", "X, nicht Y.", "X statt Y."; für Hooks und Seriennamen gilt dieselbe Liste als Hinweis); Trigramm-Überlappung von Claim, `kurz` und `beispiele[].so` gegen die Kohorte unter 15 Prozent (MARKENQUALITAET 4.6); kein Satz aus `HM_STIMME_SCHABLONEN`. Die Liste umfasst alle Satzbausteine des v1-Regelpfads, die Satzvorlagen der Stimmproben und die Sätze des Musterbeispiels aus MARKENQUALITAET Kapitel 5. **Einzige Ausnahme:** ein Satz des Musterbeispiels, der nachweislich aus den Antworten oder Zitaten dieses Maklers stammt (Vier-Wort-Treffer mit einer zulässigen Referenz nach 3.11). Satzbausteine, die jeder Makler einer Figur bekommt, haben keine Ausnahme | über 15 Prozent oder Schablonentreffer sperrt, ab 5 Prozent Hinweis |
| P8 | Referenzen | jede Referenz hat eine zulässige `art` nach 3.11 und besteht die Prüfung ihrer Art; `story.*Ref` nur `geschichte` oder `zitat`; `beispielzitat` nur `zitat` mit `oeffentlich` ja | gesperrt |
| P8b | Interne Sätze | kein öffentlicher Text übernimmt mehr als drei aufeinanderfolgende Wörter aus einem Eintrag der Stimmgabel mit `verwendung` intern | gesperrt |
| P9 | Stil | V4, V7, V8, V9 und V11 über alle öffentlichen Felder | gesperrt |
| P10 | Herkunft und Wirkung | jede verbindliche Regel hat `aus`; jedes Ermessen hat `so` und `nicht`; je Stimmprobe mit Wert bis 40 oder ab 60 ein Ermessenseintrag oder eine verbindliche Regel; mindestens eine Caption und eine Bio je Kanal aus `anredeJeKanal`; bei `eigenerSatz` nennt das Pflichtbeispiel derselben Situation `probeRef` | gesperrt |
| P11 | Stimmgabel | nach dem Wort-Link stehen die Anker wortgleich in `kurz` und `mittel` und, wo vorhanden, in `lang`; `stimmgabel` ist nach 3.1 geordnet | Freigabe an Schritt 9 gesperrt |
| P12 | Lautlese-Näherung, Zahlen und Rhythmus | Hinweis bei mehr als drei Nomen hintereinander, Genitivketten, Satzanfang "Sie" in dritter Person in Sie-Kanälen, V10-Kandidaten, Figur-Kandidaten (Zahl mit `belegRef` vor der Zeitangabe). **Zahlentest (V12):** rot bei Zahlwort vor einer Zeiteinheit ("zwei Jahre", "elf Wochen"), bei einer Betragsform, die nicht `stimme.zahlen` entspricht ("Mio.", "€", "Millionen Euro" neben voller Ziffer), bei "%" statt "Prozent", bei einem Satz im Fließtext, der mit einer Ziffer beginnt, und bei einer Spanne mit Strich. Hinweis bei mehr als einem Doppelpunkt je Text und bei drei Sätzen gleicher Länge (Abweichung höchstens zwei Wörter) hintereinander | Zahlentest sperrt, Rest Hinweis an den Texter |
| P13 | Klärungen | keine offene Klärung mit `anlass` in diesem Schritt, deren Satz in einem öffentlichen Feld steht; jede offene hat `bis` vor dem Wort-Link | Wort-Link gesperrt |
| P14 | Sprachvarietät (V13) | kein Treffer aus der Gegenliste von `HM_STIMME_AT` in öffentlichen Feldern und Beispielen; Grußformel im Erstkontakt und in Absage oder Abraten entspricht `anrede.gruss` | gesperrt |
| P15 | Recht | jedes Beispiel oder Feld mit einer Aussage über Provision, Kosten oder Gebühren trägt `rechtPruefen` und ist bis zur Prüfung `intern` | Veröffentlichung gesperrt, Wort-Link nicht |
| P16 | Kernsatz | nach dem Wort-Link: ist der Satz mit `kern` nicht markiert, existiert ein Eintrag in `stimme.pruefung.cdEintraege` mit Entscheidung | Freigabe an Schritt 9 gesperrt |
| P17 | Straßen und Diskretion | übernimmt `auftakt.keineHausnummer` aus `01_auftakt.md` Zeile 622 für alle öffentlichen Felder und Beispiele: keine Hausnummer; eine Straße nur, wenn laut `abschluesse` oder `beweise` mindestens 2 Objekte dieses Maklers dort liegen; nie eine Straße im selben Satz wie Fall, Betrag oder Dauer eines einzelnen Objekts. Der Ort eines einzelnen Falls steht als Grätzl oder Bezirk (für Markus "in Sievering"). Ein Betrag zu einem einzelnen Kundenobjekt steht nur mit Unterlage und Kundenfreigabe (M2) | gesperrt |

### 6.2 Menschliche Prüfung

- **Lautlese-Test** (E7): Claim, `kurz`, beide Bios und die Caption des ersten Kanals laut, ein zweites Teammitglied hört zu. Jeder Stolperer wird notiert und neu geschrieben.
- **Fremdtexter-Probe** (E1): drei Fassungen (voll, nur verbindlich, Konvention), erzeugt mit `SCHRITT.fremdtexter` in drei frischen Aufrufen (8.3), blind zugeordnet von zwei Personen, Ergebnis in `stimme.pruefung.fremdtexter`. Wählt eine nicht die volle Fassung, sind die Regeln zu dünn: zurück an die Redaktion, zuerst beim Ermessen. Ist die Fassung "nur verbindlich" nicht von der Konvention zu unterscheiden, fehlt eine Makler-eigene Regel.
- **Abnahme durch den Creative Director**: Claim-Paar (trägt die Idee, eine Achse Unterschied, Gegenentwurf mit voller Überzeugung umsetzbar), Satzfigur (folgt aus der Zeichenidee), `kurz` und das Ergebnis der Fremdtexter-Probe.

### 6.3 Leitfragen und wo sie beantwortet werden

| Leitfrage | Prüfung |
|---|---|
| Kann ein fremder Texter mit diesen Regeln eine Absage schreiben, die nach ihm klingt? | E1 in drei Fassungen; Pflichtbeispiele Absage und Abraten |
| Gibt es genau einen Claim, und passt er auf keinen anderen Makler? | P2, P7, Claim-Kriterien 4 und 5, Selbsttest "kein Renderer liest `claimAlternativen`" |
| Folgt jedes Beispiel der Anrede seines Kanals? | P1 mit `kontext` je Beispiel |
| Stehen Fehlergeschichten erst nach den Belegen? | V6, P5 |
| Stolpert beim lauten Lesen ein Satz in Claim, Story kurz oder den Hooks? | Lautlese-Test; dieselbe Routine prüft in Schritt 12 die Hooks, Ergebnis in `stimme.pruefung` |
| Ist jede fehlende Geschichte als Lücke markiert statt erfunden? | P6, P8, Story-Teile nur als Referenz oder Lücke, Faktenkorrektur in 3.14 |

---

## 7. Typische Fehler und wie sie verhindert werden

| Fehler | Beispiel | Verhindert durch |
|---|---|---|
| Zwei Claims in der Kette | Schritt 6 empfiehlt "Rat vor Auftrag.", ein späterer Schritt schreibt "Zeit ist Teil des Preises." | ein Feld `botschaften.claim`, Claim-Werkstatt nur aus dem gewählten Territorium; Selbsttest: kein Renderer liest `claimAlternativen`, `leitidee` oder die Weg-Leitidee; Korrekturliste 5.5 |
| Schablone als Claim | "Zeit ist Teil des Preises." für jeden Kenner | P7 ohne Makler-Ausnahme für Satzbausteine, Claim-Kriterium 4 mit Satzmuster |
| Gegenentwurf als Strohmann | ein absichtlich schwacher zweiter Claim | Abnahme durch den CD: mit voller Überzeugung umsetzbar |
| Wort und Bild aus zwei Ideen | zum Zeitpunkt-Claim eine Hell-Dunkel-Kante (KETTE_IST 2.7) | `stimme.figur` aus Zeichenidee und Typo-Richtung, Verweis in Schritt 9 |
| Ergebnis zuerst | "600.000 Euro mehr. Weil wir gewartet haben." | Figur Rat, Dauer, Ergebnis; P12 |
| Drei Anrede-Logiken | Du auf LinkedIn trotz Regel | eine Definition von `hmAnrede` in `wb-vertrag.jsx`; Selbsttest zählt |
| Stimmproben ohne Wirkung | Regler bewegen sich, Beispiele nicht | Tabelle 3.7, P10 |
| Satzvorlage im Output | "Reden wir über die Zahlen." aus den Stimmproben als Caption-Schluss | Satzvorlagen in `HM_STIMME_SCHABLONEN` |
| Umschreibung statt Kopie | "Stimmt der Zeitpunkt, geht es schnell." für "Wenn es passt, geht es auch schnell" aus dem Musterbeispiel | P7 erkennt nur Wortlaut und Muster; dazu der Nähe-Hinweis im Claude-Pfad (8.3) und die Pflichten für `kurz` (3.12) |
| Drei Claims statt einem | "bevor jemand unterschreibt" und "Mein Rat hängt am Haus, nicht an meiner Provision." in vielen Texten neben dem Claim | `stimme.wendungen` mit Frequenzregel, Umschreibungs-Hinweis in P2 |
| Kontrastformel als Claim | "Geraten, nicht gedrängt.", "Beraten statt verkaufen" | `HM_STIMME_MUSTER`, Claim-Kriterium 4, P7 |
| Zahlen gemischt | "Zwei Jahre" neben "11 Wochen", "600.000 Euro" neben "4,2 Millionen Euro" | V12, `stimme.zahlen`, Zahlentest in P12 |
| Bundesdeutsch in Wien | "Kaufangebot", "Grundbuchauszug", "Januar", "Hallo Frau Huber" im Erstkontakt | V13, `HM_STIMME_AT`, `anrede.gruss`, P14 |
| Behauptung aus einer Suggestivfrage | "auch wenn mich das die Provision kostet" öffentlich | nur Behauptungen mit Eintrag in `beweise` (hier `b7`), Faktenkorrektur 3.14 |
| Beleg ohne Bezugsgröße | "8 Prozent über der ersten Schätzung" direkt nach dem Satz über belegte Preise | P3 sperrt Einträge mit offener Bezugsgröße |
| Werbung mit Selbstverständlichkeit | "Rate ich Ihnen zu warten, kostet Sie das nichts." | M12, `rechtPruefen`, P15 |
| Zwei Schritte ziehen einander nach | Stimmproben in 02 und 08 gegenläufig angepasst | Schritt 2 besitzt die Proben, Schritt 8 nur die Wirkung; Änderung nur über 00_ZERLEGUNG (3.7) |
| Rückwärtskante | Schritt 7 ruft eine Regel, die erst Schritt 8 baut | `hmAnrede` rechnet vor Schritt 8 aus den Antworten von Schritt 2 (3.6), Selbsttest 20 |
| Biografie als Stimmgabel | "Ich bin in Döbling aufgewachsen." in `kurz` | Feld `ton` je Satz, P4 |
| Team-Satz vor seinem Satz | markierter Story-Satz überstimmt ein Zitat | Rangfolge in `stimme.stimmgabel`, P11 |
| Adjektiv-Stimme | "Ton: ruhig, kompetent, nahbar." | Ermessen nur mit Beispiel (P10) |
| Aspiration als Tatsache | "Der Zinshaus-Mann, dem Notare vertrauen" in der Bio | V8, M7 |
| Erfundene oder verschobene Fakten | "aus Finanz und Recht", "jede Woche im Grundbuch", Betrag ohne Währung | Faktenkorrektur 3.14, V3, Redaktion prüft jeden Satz gegen seine Quelle |
| Erfundenes oder geglättetes Zitat | "Beispielzitat", das niemand gesagt hat | Referenzen nach 3.11, Regel kopiert, P8 |
| Referenz ins Leere | `antworten.aufgewachsen` | Namensraum 3.11, P8 |
| Grenze übergangen | Großvater-Satz in allen Längen, bevor "Familie zeigen" geklärt ist | M5, `k1` mit `bis`, P13 |
| Wiedergabe als Kundenstimme | "Kunden sagen: nie gedrängt" | V11, M6 |
| Pressethema ohne Beleg | Thema aus dem Posting-Termin | Themen nur aus `beweise` |
| Lücke in öffentlichem Beispiel | "[Kommt aus dem Workshop: Provisionssatz]" im Beispiel | Beispiel ohne Lücke geschrieben oder `intern`; P6 |
| Markierung ohne Wirkung | Makler markiert, nichts ändert sich | `stimmgabel[].gewicht`, `tonGewicht`, Selbsttest 19 |
| Markierung als Programmentscheidung | Wiedererkennung der Stimme entscheidet, welche Folge zuerst läuft | Markierung wirkt nur auf Stimmfelder (3.12) |
| Aufgabe bleibt liegen | "Später" und kein Termin | Erinnerung nach zwei, Anruf nach vier Werktagen, Frist vor Schritt 9 |
| Stille Änderung nach Freigabe | "Neu erzeugen" überschreibt die Story | Einfrieren in Schritt 16; `stimme.basisVersion` |

---

## 8. Umsetzung in der Werkbank

### 8.1 Dateien

| Datei | Änderung |
|---|---|
| `ui_kits/werkbank/wb-stimme.jsx` (neu) | Konstanten `HM_STIMME_GRUNDREGELN`, `HM_STIMME_KLISCHEES` (ersetzt `HM_PF_FLOSKELN` und die Liste im Prompt), `HM_STIMME_SCHABLONEN` (Regelpfad-Bausteine, Stimmproben-Vorlagen, Musterbeispiel), `HM_STIMME_MUSTER` (Satzmuster "Erst X. Dann Y.", "X, nicht Y.", "X statt Y."), `HM_STIMME_AT` (österreichische Formen mit bundesdeutscher Gegenliste), `HM_STIMME_ZAHLEN_GRUND` (Grundform aus 3.8), `HM_STIMME_VERSTAERKER`, `HM_STIMME_ADJEKTIVE`, `HM_STORY_LAENGEN`, `HM_BIO_MAX` (150), `HM_STIMMPROBE_WIRKUNG` (Tabelle 3.7, liest die Proben aus `HM_V2_STIMMPROBEN` von Schritt 2), `HM_TON_SATZBAU` (Tabelle 3.12), `HM_REF_ARTEN`; Funktionen `hmAnredeRegel(antworten)` (rein, ohne Speichern), `hmAnredePruefen`, `hmStimmeZahlen(mid)`, `hmStimmeClaimFeld(mid)` (Schlüsselwörter für den Umschreibungs-Hinweis), `hmStimmeHookBau(mid)` (Satzbau aus `tonGewicht` für Schritt 12), `hmStimmeFremdtexter(mid)` (drei frische Aufrufe, 8.3), `hmStimmeKorpus(mid)`, `hmStimmeRegler(mid)`, `hmStimmeFigur(mid)`, `hmStimmeRegelpfad(mid)`, `hmStimmeRefText(mid, ref)`, `hmStimmeStimmgabel(mid)`, `hmStimmePruefen(mid)`, `hmStimmeEinarbeiten(mid, wahl)`, `hmClaim(mid)`; Komponenten `StimmeRedaktion` (Team, satzweise mit Grund), `ClaimWerkstatt` (Team), `StimmeClaimWahl` und `StimmeStoryMarken` (Makler, eingehängt in die Vertragsseite aus Schritt 7), `hmSelbsttestStimme()`; Export über `Object.assign(window, ...)`. Definiert **nicht** `hmAnrede` |
| `ui_kits/werkbank/wb-vertrag.jsx` (Schritt 7) | enthält die einzige Definition von `hmAnrede`, `hmAnredeInfo`, `hmAn`; liest `marke2[mid].anrede` vor der Freigabe, danach `quelle` |
| `ui_kits/werkbank/index.html` | Script-Tag für `wb-stimme.jsx` direkt nach `wb-store.jsx`; `wb-vertrag.jsx` bleibt, wo Schritt 7 es setzt (Aufrufe erst zur Laufzeit) |
| `api/wb-marke.js` | neue Phase `stimme` mit `SCHRITT.stimme` und `SCHEMA.stimme` (8.3); Eingang: Stimm-Dossier mit Stimmgabel in Rangfolge, eingefrorener Vertrag, gewähltes Territorium mit Kernidee, Risiko, Zeichenidee, Typo-Richtung, Serienidee und Schärfung, Referenzliste mit Arten, Kohorten-Claims und Schablonen als Verbotsliste |
| `ui_kits/werkbank/wb-plattform.jsx` | `hmPfStimme`, `hmPfStory`, `hmPfBotschaften` rufen in v2 `hmStimmeRegelpfad`; `hmPfAnrede` wird Weiterleitung auf `hmAnrede`; `HM_PF_FIGUR.claims` und `haltung` nur noch als Schablonenliste gelesen |
| `ui_kits/werkbank/wb-produktion.jsx` | `hmAnredeVon` wird Weiterleitung auf `hmAnrede`; `hmCaptionCheck` liest `stimme.vermeiden`, `stimme.verbindlich`, `stimme.figur` |
| `ui_kits/werkbank/wb-os-data.jsx` | `hmCaption` nutzt `hmAn(mid, kanal, ...)` statt `w.anrede`; der feste Schlusssatz entfällt zugunsten des Weitergeben-Satzes aus der Serie (Schritt 12) |
| `ui_kits/werkbank/wb-reel.jsx` | Untertitel und Endkarte über `hmAnrede` und `hmClaim` |
| `ui_kits/werkbank/wb-ui.jsx` | `hmBrand().claim` liest `hmClaim(mid)` |
| `ui_kits/werkbank/wb-markenbuch.jsx` | Kapitel Stimme mit Verbindlich, Figur und Ermessen getrennt, Stimmgabel und eigene Worte gekennzeichnet; Story mit Längen aus `HM_STORY_LAENGEN`; Kapitel Pressebaustein |
| `docs/werkbank/MARKE_SCHEMA.md` | Abschnitt v2 mit dem Objekt aus 8.2 |
| `docs/werkbank/MARKENQUALITAET.md` | Prompt Schritt 5 durch `SCHRITT.stimme` ersetzen; Hinweis, dass das Musterbeispiel nie Few-Shot ist und seine Sätze in `HM_STIMME_SCHABLONEN` stehen |

Architektur nach `ui_kits/werkbank/CLAUDE.md`: Babel ohne Build, globaler Scope, Präfix `hm`, `React.useState` statt neu deklarierter Hooks, kein `import()`, Symbole nur über `<Ico n="..."/>`.

### 8.2 Datenvertrag im Store

Speicherort `hmStore` unter `marke2[mid]` (Vorschlag aus 00_ZERLEGUNG Kapitel 3).

```js
marke2[mid].anrede = { kanaele: {}, kontexte: {}, schreibweise: "", fehlend: [], quelle: "", version: 1 };

marke2[mid].stimme = {
  basisVersion: 1,
  regler: { ernst: null, persoenlich: null, begeistert: null, sachlich: null },
  reglerHerkunft: { ernst: { wahl: null, messung: null, n: 0, abweichung: null } /* je Regler */ },
  figur: { name: "", regel: "", reihenfolge: [], gilt: "", pruefung: "hinweis", aus: {}, so: [], nicht: [], fuerSchritt9: "" },
  verbindlich: [{ id: "V1", regel: "", aus: "", pruefung: "auto" | "hinweis" | "team", test: "" }],
  ermessen: [{ nuance: "", so: "", nicht: "", aus: "" }],
  sagen: [""], vermeiden: [""],
  wendungen: [{ text: "", herkunft: "", hoechstens: "einmal je Flaeche", nie: ["bio", "claimAbsatz"] }],
  zahlen: { dauer: "ziffer", betrag: "voll", anteil: "prozentWort", anzahl: "ziffer", flaeche: "m2", zaehlwort: "wortBisZwoelf", satzanfangZiffer: false, aus: "typoRichtung" },
  beispiele: [{ wo: "", kontext: "linkedin", so: "", nicht: "", belegRefs: [""], probeRef: null, intern: false, rechtPruefen: false }],
  eigeneWorte: [{ text: "", ref: { art: "zitat" | "geschichte" | "stimmprobe" | "richtung" | "wortlink", id: "", pfad: "", index: null },
                  gesprochen: false, verwendung: "oeffentlich" | "intern" | "nachUnterlage", bedingung: "" }],
  anker: [{ satz: "", index: 0, ton: "", kern: false, markiertAm: "" }],
  tonGewicht: { ort: 1, nein: 1, tempo: 1, zahl: 1, haltung: 1 },
  stimmgabel: [{ text: "", ref: {}, rang: 1, gewicht: 1, verwendung: "" }],
  pruefung: { regeln: [{ test: "P1", ok: true, detail: "" }], hinweise: [],
              naehe: [{ feld: "", satz: "", aehnlichWie: "musterbeispiel" | "kohorte" | "schablone", vorlage: "", grund: "", entscheid: "" }],
              lautlesen: { wer: "", datum: "", gestolpert: [] },
              fremdtexter: { situation: "", a: "", b: "", c: "", zuordnung: [{ wer: "", wahl: "a" | "b" | "c", sicher: true }], ok: null, datum: "" },
              cdEintraege: [{ art: "kern-nicht-markiert", satz: "", claimWahl: "", territoriumId: "", entscheidung: "", grund: "", datum: "" }],
              cd: "", datum: "" },
  luecken: [{ pfad: "", was: "", termin: "" }]
};

marke2[mid].botschaften = {
  claim: "", claimAlternativen: [""],
  claimHerleitung: { territoriumId: "", belegRef: "", empfehlung: "", gegenentwurf: "", achse: "",
                     wahl: "empfehlung" | "gegenentwurf" | "keiner", kandidaten: [{ text: "", ergebnis: "", grund: "", werte: {} }] },
  bio: { linkedin: "", instagram: "", zeichenMax: 150 },
  einSatz: "", dreiSaetze: "", ueberMich: "", boilerplate: "", boilerplateZusatz: ""
};

marke2[mid].story = { herkunft: {}, spannung: "", wendepunkt: {}, haltung: {}, versprechen: "",   // herkunft, wendepunkt, haltung: REF oder { luecke }
                      kurzSaetze: [{ text: "", ton: "haltung" | "nein" | "zahl" | "tempo" | "ort", quelle: "", belegRef: "", kern: false }], kurz: "", mittel: "", lang: "" };

marke2[mid].presse = { kurzbio: "", themen: [{ thema: "", frage: "", belegRefs: [""] }], beispielzitat: { ref: {}, text: "", freigabe: "" } };

marke2[mid].wortlink.stimme = { claimGezeigt: ["", ""], claimWahl: "", claimNotiz: "", storyMarken: [], satzNeu: "", kaumEiner: false,
                                erinnerungen: [{ art: "nachricht" | "anruf", faellig: "", erledigt: "" }], geoeffnetAm: "", dauerSek: 0, abgeschlossenAm: "" };
```

Versionen wie in Schritt 7: höchstens zwölf frühere Stände, jede Änderung mit Grund.

### 8.3 Schema für Structured Outputs der Claude-Kette

In `api/wb-marke.js` mit den vorhandenen Helfern `O`, `A`, `S`, `I` und `E` aus Schritt 7. Claude liefert nie `anrede`, die endgültigen `regler`, `figur` (nur eine Stellungnahme), `claim`, `anker`, `stimmgabel`, Zitattexte, `pruefung` oder Versionen.

```js
const REF = O({ art: E(["zitat", "geschichte", "stimmprobe", "richtung"]), id: S, pfad: S, index: I });
SCHEMA.stimme = O({
  reglerMessung: O({
    ernst: O({ wert: I, begruendung: S }), persoenlich: O({ wert: I, begruendung: S }),
    begeistert: O({ wert: I, begruendung: S }), sachlich: O({ wert: I, begruendung: S })
  }),
  figurStellung: O({ einverstanden: { type: "boolean" }, begruendung: S }),
  verbindlich: A(O({ id: S, regel: S, aus: S, pruefung: E(["auto", "hinweis", "team"]) })),
  ermessen: A(O({ nuance: S, so: S, nicht: S, aus: S })),
  sagen: A(S), vermeiden: A(S),
  beispiele: A(O({ wo: S, kontext: E(["instagram", "linkedin", "facebook", "tiktok", "youtube", "website", "erstkontakt", "presse"]),
                   so: S, nicht: S, belegRefs: A(S), probeRef: I, rechtPruefen: { type: "boolean" } })),
  eigeneWorte: A(O({ ref: REF, verwendung: E(["oeffentlich", "intern", "nachUnterlage"]), bedingung: S })),
  claimKandidaten: A(O({ text: S, herleitung: S, belegRef: S, idee: I, eigentum: I, klang: I, dauer: I, gestrichenNach: S })),
  botschaften: O({ einSatz: S, dreiSaetze: S, einladung: S, boilerplate: S, bio: A(O({ kanal: S, text: S })) }),
  story: O({ herkunft: REF, spannung: S, wendepunkt: REF, haltung: REF,
             kurzSaetze: A(O({ text: S, ton: E(["haltung", "nein", "zahl", "tempo", "ort"]), belegRef: S, ref: REF, kern: { type: "boolean" } })), mittel: S, lang: S }),
  presse: O({ kurzbio: S, themen: A(O({ thema: S, frage: S, belegRefs: A(S) })), beispielzitatRef: REF }),
  naehe: A(O({ feld: S, satz: S, aehnlichWie: E(["musterbeispiel", "kohorte", "schablone"]), vorlage: S, grund: S })),
  luecken: A(O({ pfad: S, was: S }))
});
```

Prompt `SCHRITT.stimme` (Effort high, gleiches System und Dossier wie die übrigen Schritte, mit Cache; das Dossier enthält die Anrede je Kontext als Tabelle, die Stimmgabel in Rangfolge, die Referenzliste mit Arten und das gewählte Territorium vollständig):

```text
Schritt Stimme: verbale Identität.
Quelle sind ausschließlich das Dossier, der bestätigte Markenvertrag und das gewählte Territorium. Erfinde nichts.
Tonreferenz ist die Stimmgabel im Dossier, in ihrer Reihenfolge: zuerst was der Makler gesagt hat, dann was er geschrieben hat, zuletzt markierte Sätze. Aus Sätzen mit verwendung intern übernimmst du höchstens drei Wörter am Stück.
Zitate gibst du nie als Text aus, nur als Referenz mit art zitat, geschichte, stimmprobe oder richtung aus der Liste im Dossier.
Anrede: Jeder Text folgt der Anrede seines Kontexts laut Tabelle. Presse in dritter Person.
Zahlen nur aus den Beweisen im Dossier, mit belegRefs, in der Schreibweise aus stimme.zahlen im Dossier (Dauer als Ziffer, eine Betragsform, kein Satz beginnt im Fließtext mit einer Ziffer). Beweise mit offener Bezugsgröße nur intern. Keine Zahl im Claim, in story.kurzSaetze und in der Bio. Behauptungen nur, wenn sie als behauptung in beweise stehen; Aussagen über Provision oder Kosten markierst du mit rechtPruefen.
Sprache: österreichisches Standarddeutsch, Wortschatz nach der Liste im Dossier, Grußformeln aus der Anrede-Tabelle, Perfekt für eigenes Handeln in Ich-Texten. Höchstens ein Doppelpunkt je Text. Auf einen Erklärsatz folgt ein kurzer Satz.
Wendungen aus der Liste im Dossier höchstens so oft wie dort erlaubt; kein zweiter Satz, der den Claim mit anderen Worten wiederholt.
Satzfigur: Jeder Text über einen Fall folgt der Figur im Dossier. Nimm Stellung, ob sie aus der Zeichenidee folgt.
Verbindlich: Regeln, die ein Prüfer ohne Urteil anwenden kann, je mit aus. Ermessen: je Stimmprobe mit Wert bis 40 oder ab 60 ein Eintrag nach der Tabelle im Dossier, dazu Nuancen, je mit so, nicht und aus.
Beispiele: eine Caption und eine Bio je Kanal aus der Anrede-Tabelle, erste Antwort auf eine Anfrage, Absage oder Abraten, erster Satz der Website, die Frage nach der Provision. Folge dem Wert der passenden Stimmprobe und nenne probeRef. "nicht" zeigt die typische Branchenfloskel. Keine Lückenmarke in einem Beispiel.
Claim-Kandidaten: acht bis zwölf, höchstens fünf Wörter, ohne Anrede, ohne Zahl, ohne Frage, aus Claim-Idee und Kernidee des Territoriums und eigenen Worten. Kein Satz und kein Satzmuster aus der Schablonenliste, auch nicht "X, nicht Y" oder "X statt Y". Bewerte Idee, Eigentum, Klang und Dauer von 0 bis 2 und nenne das erste Streichkriterium, das greift.
Story: Teile als Referenz oder "Kommt aus dem Workshop: <was>". kurzSaetze: vier bis fünf Sätze, zusammen höchstens 35 Wörter, Ich-Form, ohne Claim, jeder mit genau einem ton, kein Satz reine Biografie. Jeder Satz trägt einen Ort, einen belegRef oder eine Referenz auf ein eigenes Wort; mindestens einer hat ton ort mit dem stärksten Ortssignal; genau einer trägt die Kernidee und hat kern true. Kein Satz, der auch in der Konvention des Gebiets stehen könnte. mittel 70 bis 100 Wörter, enthält alle kurzSaetze wörtlich, ohne Lückenmarke. lang 160 bis 220 Wörter, Fehler nur nach den Belegen.
Presse: kurzbio in dritter Person, ein oder zwei Sätze, je höchstens 20 Wörter, zusammen höchstens 30; erster Satz Objekt und stärkstes Ortssignal, zweiter die Positionierung mit belegRef. Drei Themen als Fragen einer Redaktion, jedes nur aus Einträgen in beweise, sonst Lücke. beispielzitatRef nur auf ein Zitat mit oeffentlich ja.
Nähe: Prüfe jeden öffentlichen Satz gegen die Liste "Musterbeispiel, Kohorte, Schablonen" im Dossier. Sagt ein Satz dasselbe wie ein Satz dieser Liste mit anderen Worten, trage ihn in naehe ein, mit dem Satz der Liste und einem Grund. Ändere ihn nicht selbst.
Jeder Satz höchstens 20 Wörter. Keine Ausrufezeichen, keine Emojis, keine Gedankenstriche.
```

Der Nähe-Hinweis ergänzt P7: P7 findet Wortlaut, Muster und Trigramme ohne Urteil, Claude findet Umschreibungen mit Begründung (etwa "Stimmt der Zeitpunkt, geht es schnell." gegen "Wenn es passt, geht es auch schnell"). Einträge gehen nach `stimme.pruefung.naehe`; der Senior-Texter entscheidet je Eintrag (`entscheid`: umschreiben oder begründet behalten). Ohne Claude entfällt der Hinweis, P7 bleibt.

**Fremdtexter-Probe** (`hmStimmeFremdtexter`, E1). Drei Aufrufe, jeder in frischem Kontext ohne Cache des Stimm-Dossiers und ohne den Verlauf der Phase `stimme`, damit keine Fassung von der anderen weiß. Gleiche Situation, gleiche Länge, gleiche Anrede, verschiedene Stimme:

```js
SCHEMA.fremdtexter = O({ text: S, woerter: I });
const FREMD_SITUATION = "Eine Eigentümerin möchte ihr Haus zu einem Preis anbieten, den die Vergleichswerte nicht tragen. Schreiben Sie die Absage per E-Mail, 60 bis 90 Wörter.";
// (a) voll:        stimme (verbindlich, ermessen, figur, zahlen, wendungen, sagen, vermeiden, stimmgabel), anrede, botschaften.claim
// (b) verbindlich: stimme.verbindlich, stimme.zahlen, anrede
// (c) Konvention:  einsicht.konvention als Stimmbeschreibung, anrede; sonst nichts vom Makler
```

```text
Schritt Fremdtexter-Probe, Fassung {a|b|c}.
Du bist ein Texter, der diesen Makler nicht kennt. Du hast nur das Material unten.
Schreibe genau einen Text für die Situation. Folge der Anrede und der Grußformel aus dem Material.
Keine Zahl, die nicht im Material steht. Keine Ausrufezeichen, keine Emojis, keine Gedankenstriche.
Gib nur den Text zurück.
```

Die Regel setzt Kennungen zufällig (X, Y, Z), speichert die Zuordnung in `stimme.pruefung.fremdtexter` und zeigt zwei Teammitgliedern die drei Texte mit `stimme.eigeneWorte` als Klangprobe. `ok` ist wahr, wenn beide (a) wählen und (b) von (c) unterscheiden. Kosten: drei kurze Aufrufe ohne Cache.

**Regelpfad** (`hmStimmeRegelpfad`) liefert dieselbe Struktur: `anrede`, `regler` und `figur` wie immer; `verbindlich` aus Grundregeln (mit `stimme.zahlen` aus der Typo-Richtung und `HM_STIMME_AT`), Grenzen, Werten, Beweisen und den Proben P1 und P4; `ermessen` je Stimmprobe aus `HM_STIMMPROBE_WIRKUNG` mit `so` als "Kommt aus der Redaktion: ..."; `sagen` aus Orten, Straßen, Objekten und Nomen der eigenen Worte; `vermeiden` aus Klischee-Liste und `falschWaere`; `beispiele[].nicht` aus einer Floskel-Liste, `so` als Lücke mit `intern` true; Claim-Empfehlung gleich `claimIdee`, Gegenentwurf Lücke; Story-Teile als Referenzen auf `workshop.geschichte`, `kurzSaetze` nur aus wörtlichen Sätzen des Maklers, sonst Lücke; `presse.kurzbio` als zwei Rahmensätze aus Name, Objekten und stärkstem Ort, dann `positionierung.was` mit dem ranghöchsten Beweis; Themen je aus einem der drei ranghöchsten Beweise. Ohne Claude kostet der Schritt rund 45 Minuten mehr Teamzeit (Setzung), bringt aber keinen fremden Satz.

**Nach dem Wort-Link** (`hmStimmeEinarbeiten`): setzt `claim`, `claimHerleitung.wahl` und `bio`, schreibt `anker` mit `ton` und `kern`, setzt `tonGewicht` (markierte Töne 2, übrige 1), ordnet `stimmgabel` neu mit Gewicht 2 vor 1, legt bei unmarkiertem Kernsatz den Eintrag in `stimme.pruefung.cdEintraege` an (3.12), sperrt die Anker gegen Änderung (P11) und legt eine neue Version an. Unmarkierte Sätze bleiben unverändert in der Story; sie verlieren nur Gewicht.

### 8.4 Selbsttest `hmSelbsttestStimme()`

1. Schema vollständig für Markus, Elif und Sara; Sara ohne Antworten liefert nur Lücken, der Wort-Link bleibt gesperrt.
2. `hmAnrede` ist genau einmal definiert, und zwar in `wb-vertrag.jsx`: Der Test liest die Script-Quellen aus `index.html` per `fetch` (gleicher Ursprung, ohne Build) und zählt `function hmAnrede(` und `hmAnrede =` über alle Dateien; `hmPfAnrede` und `hmAnredeVon` sind Weiterleitungen; kein `w.anrede ===` in Caption, Reel und Produktion.
3. Elif mit "Du auf Instagram, Sie sonst": Caption LinkedIn in Sie, Instagram in Du, Website in Sie, Erstkontakt über Instagram in Du.
4. Ein Kanal ohne Wahl landet in `anrede.fehlend` und liefert die Website-Form.
5. `hmAnredePruefen` erkennt "dein" im Sie-Kontext, "Ihnen" im Kontext presse, und meldet "Sie kamen" am Satzanfang nur als Hinweis.
6. Claim mit "Ihr" oder mit einer Zahl fällt durch P2.
7. Kein Renderer (`WeltPost`, `WeltKarte`, `WeltSignatur`, `WeltStory`, `hmBrand`, Reel) liest `claimAlternativen`, `leitidee` oder die Weg-Leitidee.
8. Eine erfundene Zahl und ein Betrag ohne Währung in einer Caption fallen ohne Whitelist auf.
9. Referenz `antworten.aufgewachsen` fällt durch P8; `eigeneWorte` mit geändertem Wortlaut fällt durch; `beispielzitat` ohne `oeffentlich` ja fällt durch; ein öffentlicher Text mit vier Wörtern am Stück aus `z1` fällt durch P8b.
10. Fehlersatz vor dem ersten Belegsatz fällt durch P5.
11. `kurz` mit 36 Wörtern, drei Sätzen oder einem Satz ohne `ton` fällt durch P4; `mittel` ohne einen der `kurzSaetze` fällt durch.
12. Ein zweiter Kenner mit Warte-Geschichte bekommt im Regelpfad weder "Zeit ist Teil des Preises." noch "Erst verstehen. Dann verkaufen." noch einen Kandidaten im Muster "Erst X. Dann Y."; auch Markus bekommt "Zeit ist Teil des Preises." nicht (keine Makler-Ausnahme für Satzbausteine). Der Satz "Einer Erbengemeinschaft habe ich geraten zu warten, statt unter Druck zu verkaufen." (Kern von Musterbeispiel und Story kurz) ist bei Markus erlaubt (Vier-Wort-Treffer mit `geschichte.abgeraten`), bei jedem anderen gesperrt. "Ein Zinshaus war schnell verkauft, wenn der Zeitpunkt stimmte." erzeugt bei jedem Makler einen Nähe-Hinweis im Claude-Pfad.
13. Stimmproben nach `02_fragebogen.md` 3.5: Werte 25 und 75 ergeben die Regler direkt (P1 `ernst`, P2 `persoenlich`, P3 `begeistert`, P4 `sachlich`), unabhängig von `links`; ohne Probe `null`, nie 50; `begeistert` und `sachlich` ändern sich unabhängig voneinander (P3 tauschen ändert `sachlich` nicht); ein `eigenerSatz` erscheint in `eigeneWorte` mit Art `stimmprobe` und im Korpus; P1 mit 75 erzeugt M10, P4 mit 75 erzeugt M11, beide mit 25 nicht; die Satzvorlagen erscheinen in keinem Ausgang; `HM_STIMMPROBE_WIRKUNG` hat genau die Proben, die `HM_V2_STIMMPROBEN` liefert.
14. Nach dem Einarbeiten stehen die Anker wortgleich in `kurz` und `mittel`; `stimmgabel` hat gesprochene Sätze vor markierten; eine Änderung eines Ankers erzeugt eine neue Version.
15. Die Längen im Markenbuch kommen aus `HM_STORY_LAENGEN`, die Bio-Grenze aus `HM_BIO_MAX` in Schritt 8 und 13.
16. Offene `k1` mit Satz über den Großvater in `lang` sperrt den Wort-Link (P13); nach "Im Text ja" ist er erlaubt.
17. `stimme.figur` ist für Markus gesetzt, `aus.territoriumId` gleich `richtung.gewaehltId`; eine Caption "600.000 Euro mehr. 2 Jahre gewartet." erzeugt einen Figur-Hinweis.
18. Nach der Freigabe in Schritt 16 liefert `hmAnrede` dieselbe Form, auch wenn danach `antworten.anredeJeKanal` geändert wird.
19. Markierung: Markus mit Markierung 1 und 2 gegen 3 und 4 ergibt verschiedene `tonGewicht` und verschiedenen Satzbau aus `hmStimmeHookBau`, aber dieselben Felder `start30`, Pins und `textImBild` in den Testdaten von 12 und 13. Kernsatz unmarkiert erzeugt einen `cdEintrag` und sperrt die Freigabe an 9 (P16).
20. Rückwärtskante: Ohne `marke2[mid].anrede` liefert `hmAnrede(mid, "website")` dieselbe Form wie später `hmAnredeRegel` und das geschriebene Feld; `hmAnredeRegel` schreibt nichts in den Store.
21. Zahlen und Sprache: "zwei Jahre", "4,2 Mio.", "8 %", "6-8" und ein Satz, der mit "2 Jahre" beginnt, fallen im Fließtext durch P12; "2 Jahre." auf einer Karussellseite nicht. "Kaufangebot" und "Hallo Frau Huber" im Erstkontakt fallen durch P14. "Geraten, nicht gedrängt." fällt als Claim durch Kriterium 4. Ein Satz mit "Rat" und "Provision" erzeugt den Umschreibungs-Hinweis aus P2.
22. Fremdtexter-Probe: drei Aufrufe ohne gemeinsamen Kontext, Fassung (c) enthält kein Wort aus `stimme.eigeneWorte`; die Zuordnung wird ohne Kennung gezeigt.
23. Diskretion: "Ein Zinshaus in der Sieveringer Straße war nach 11 Wochen verkauft." fällt durch P17, "Ein Zinshaus in Sievering war nach 11 Wochen verkauft." besteht; eine Straße mit 2 Objekten im Seed besteht ohne Fall im selben Satz; der Betrag aus `b2` ohne Kundenfreigabe fällt durch.

### 8.5 Aufwand

**Bau (Schätzung, Setzung):** Anrede-Regel mit Lesereihenfolge, Grußformeln, Prüfer und Umstellung der fünf Abnehmer 1 Tag; Zahlen, Sprachvarietät und Wendungen mit Tests 0,5 Tage; Fremdtexter-Probe und Nähe-Hinweis 0,5 Tage; Korpus, Stimmproben-Wirkung, Regler und Regelpfad 1 Tag; Satzfigur, Referenzen mit Namensraum und P8 0,5 Tage; Claude-Phase mit Schema und Prompt 0,5 Tage; Team-Redaktion und Claim-Werkstatt 0,5 Tage; zwei Aufgaben im Wort-Link auf Awwwards-Niveau, mobil und am Rechner, mit Erinnerungen 1 Tag; Markenbuch-Kapitel Stimme, Story und Presse 0,5 Tage; Selbsttest 0,5 Tage. Zusammen rund 6,5 Arbeitstage.

**Betrieb je Makler (Setzung, mit `wortlink.stimme` und Teamzeiten ersetzen):**

| Rolle | mit Claude | ohne Claude |
|---|---|---|
| Senior-Texter (Werkstatt, Figur, Redaktion, Einarbeiten) | 100 Minuten | 145 Minuten |
| Zweites Teammitglied (Lautlesen, Fremdtexter-Probe) | 15 Minuten | 15 Minuten |
| Creative Director | 15 Minuten | 15 Minuten |
| Makler | etwa 4 Minuten | etwa 4 Minuten |

Kosten der Claude-Phase: ein Aufruf mit Cache auf System und Dossier, dazu drei Aufrufe im Frischkontext für die Fremdtexter-Probe; die genaue Zahl liefert `kette.schritte` nach den ersten Läufen (Lücke). Keine Konten des Maklers bei fremden Werkzeugen.

---

## 9. Offene Punkte und Lücken

1. **Anrede gegenüber dem Makler** im Wort-Link (Owner, 00_ZERLEGUNG 7.1); bis dahin wie in Schritt 7 nach seiner Website-Anrede.
2. **Owner-Entscheidung Stimmproben.** Vorgelegt: `02_fragebogen.md` 3.5 und D8 als einzige Fassung (binär, vier Regler, respektvoll oder pointiert als Regel V7), Schritt 2 besitzt die Proben, Schritt 8 die Wirkung. Bis zur Entscheidung ändert keiner der beiden Schritte die Proben. Die Setzungen der Rechnung (acht Sätze, Abweichung 40, doppelte Gewichtung der Verstärker, Bereiche bis 40 und ab 60) werden an den ersten fünf Maklern geprüft.
3. **Vier bis fünf Sätze in `kurz` und zwei bis drei Markierungen** sind Setzungen. `wortlink.stimme` zeigt, ob Makler öfter "Keiner passt" wählen und wie oft der Kernsatz unmarkiert bleibt.
4. **Kohortenschwelle** 15 Prozent ist aus MARKENQUALITAET übernommen und für Claims nicht geprüft; deshalb zusätzlich Wortgleichheit und Satzmuster. Tragfähige Kohortengröße offen (R4).
5. **Markenarchitektur UNIO und Makler** (R5 offen): ob Boilerplate und Kurzbio eine UNIO-Zeile tragen, entscheidet der Owner (`boilerplateZusatz`).
6. **Klärung `k1`** mit Markus im Richtungstermin; bis dahin ist der Satz über den Großvater intern.
7. **Austauschtest für "Rat vor Auftrag."** gegen die Konvention im Kerngebiet steht aus, weil `workshop.karte` und `vorab.wettbewerb` fehlen. Fällt der Satz dort durch, wird der Gegenentwurf Empfehlung und die Werkstatt sucht einen neuen Gegenentwurf.
8. **Bezugsgröße der 600.000 Euro** (höher als was) ist Teil der fehlenden Unterlage zu `b1`; die Währung ist Ableitung und wird mit der Unterlage bestätigt. Dasselbe gilt für `b3`.
9. **Schritt 5** formuliert `einsicht.spannung` nah an der Regelcode-Vorlage "steht die Provision im Raum" (`wb-plattform.jsx` Zeile 135). Hinweis an Schritt 5, P3 dort gegen die Schablonenliste zu prüfen.
10. **Plattformgrenzen** der Bio (150 Zeichen) und der LinkedIn-Kopfzeile sind Setzungen ohne Primärquelle in der Recherche (so auch `13_feed.md` Kapitel 9 Punkt 1).
11. **Für Markus fehlen** Stimmproben, Anrede je Kanal, Satz aus dem Richtungstermin, Wendepunkt, Fehlertext, ein öffentlich bestätigtes Zitat, die Karte und ein dritter Pressebeleg. Das Beispiel zeigt Struktur und Niveau, nicht eine fertige Stimme.
12. **Rechtsprüfung der Provisionsaussagen** (M12, P15): Wer bei UNIO Aussagen über Provision und Kosten vor der Veröffentlichung prüft, ist offen (Lücke). Ebenso ungeprüft: ob Titel in der Anrede und die Grußformeln aus V13 bei den ersten fünf Maklern passen (Setzung).
13. **`b7` in Schritt 7** und die Bezugsgröße zu `b3` (wessen erste Schätzung) fehlen; bis dahin sind die Sätze, die sie tragen, intern.

---

## 10. Quellen

Intern: `docs/werkbank/branding-v2/00_ZERLEGUNG.md`; `bestand/KETTE_IST.md` (2.2, 2.4, 2.5, 2.7, 2.8, 2.10, 3); `bestand/FRAGEN_WIRKUNG_IST.md` (Befunde 1, 4, 7); `research/R1-studios.md`, `R3-interview.md`, `R4-tools.md`, `R5-makler.md`, `R6-social-system.md`, `R7-evidenz.md`, `R8-kundenerlebnis.md`; `schritte/02_fragebogen.md` (Zeile 218 bis 246, 285, 464, 574, 577, 598); `schritte/04_workshop.md` (Zeile 307, 309, 355, 356, 370, 454, 643); `schritte/05_einsicht.md` (Zeile 310); `schritte/06_territorien.md` (Zeile 336 bis 443, 580, 642, 815); `schritte/07_positionierung.md` (Zeile 105, 199, 213, 228 bis 235, 408, 517); `schritte/09_idee.md` (Zeile 19, 73, 251, 309, 343); `schritte/12_social.md` (Zeile 309, 543); `schritte/13_feed.md` (Zeile 171); `docs/werkbank/MARKENQUALITAET.md` (Kapitel 2, 4.4, 4.6, 4.7, 5, Zeile 277); `docs/werkbank/MARKE_SCHEMA.md`; Code `ui_kits/werkbank/wb-plattform.jsx` (Zeilen 135, 207 bis 218, 223, 309 bis 316, 400, 446 bis 480, 667 bis 698, 1045), `wb-produktion.jsx` (62 bis 69), `wb-os-data.jsx` (210 bis 214, 278), `wb-reel.jsx` (14), `wb-data.jsx` (36, 170, 192, 244, 292 bis 299), `wb-markenbuch.jsx` (89 bis 109), `wb-store.jsx` (72), `api/wb-marke.js` (55, 85).

Studios und Praxis
- Wolff Olins, Lloyds Banking Group: https://wolffolins.com/work/lloyds
- Wolff Olins, How Verbal Identity helps everyone speak brand: https://wolffolins.com/news/how-verbal-identity-helps-everyone-speak-brand
- Koto, Mews (Creative Boom): https://www.creativeboom.com/news/koto-just-proved-that-design-for-enterprise-platforms-doesnt-have-to-be-beige/
- Pentagram, About: https://www.pentagram.com/about
- Mozilla Open Design, Roads not taken: https://blog.mozilla.org/opendesign/roads-not-taken/
- Paul Rand, NeXT: https://www.logodesignlove.com/next-logo-paul-rand
- Albert Hill, The Modern House (Sprache): https://www.holeandcorner.com/long-reads/in-the-modern-style
- Beilquadrat, DAHLER: https://beilquadrat.de/cases-beil2/dahler/

Werkzeuge
- Frontify, Brand Guidelines for AI: https://www.frontify.com/en/guide/brand-guidelines-for-ai
- Canva, Brand Voice: https://www.canva.com/help/brand-voice/
- Mailchimp, Voice and Tone: https://styleguide.mailchimp.com/voice-and-tone/
- NN/g, Tone of Voice und Markenwahrnehmung: https://www.nngroup.com/articles/tone-voice-users/
- NN/g, Vier Dimensionen der Tonalität: https://www.nngroup.com/articles/tone-of-voice-dimensions/
- GV Brand Sprint (Zusammenfassung Reforge): https://www.reforge.com/blog/brief-how-to-define-your-brand-with-gv-s-3-hour-sprint

Studien
- Aronson, Willerman, Floyd 1966, Pratfall: https://link.springer.com/article/10.3758/BF03342263
- Malär u. a. 2011, Actual Self: https://journals.sagepub.com/doi/10.1509/jmkg.75.4.35
- Chernev, Böckenholt, Goodman 2015: https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf
- Hsee 1996, Evaluability: https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf
- Norton, Mochon, Ariely 2012, IKEA-Effekt: https://myscp.onlinelibrary.wiley.com/doi/abs/10.1016/j.jcps.2011.08.002
- Fuchs, Prandelli, Schreier 2010: https://doi.org/10.1509/jmkg.74.1.65
- Buell und Norton 2011, Labor Illusion: https://doi.org/10.1287/mnsc.1110.1376
- Galesic und Bosnjak 2009: https://academic.oup.com/poq/article-abstract/73/2/349/1939196
- Liu und Conrad 2019, Startwerte bei Reglern: https://journals.sagepub.com/doi/abs/10.1177/0894439318755336
- Funke, Reips, Thomas 2011, Regler und Abbruch: https://dl.acm.org/doi/abs/10.1177/0894439310376896
- Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290
- Wenger und Kenett 2026: https://academic.oup.com/pnasnexus/article/5/3/pgag042/8529001

---

## Aenderungen aus der Kettenpruefung

Stand 30.09.2026. Anlass: Befund zu Schritt 8, Diskretion in Text und Bild gegensätzlich behandelt. 8 nannte in öffentlichen Feldern die Straße des verkauften Zinshauses eines Kunden, teils mit Betrag und Dauer; 11 sperrt dieselbe Straße als Ort (`11_bild.md` Zeile 220 und 659), 13 meidet sie wegen a4 Diskret, 1 erlaubt Straßen nur bei mindestens 2 Objekten dort (`01_auftakt.md` Zeile 622).

1. **Straße durch Grätzl ersetzt.** "in der Sieveringer Straße" heißt jetzt "in Sievering" in `story.kurz` (Satz 3, jetzt 9 Wörter, `kurz` 33 Wörter), `story.mittel` (76 Wörter), `story.lang` (163 Wörter), beiden Captions, `dreiSaetze`, `boilerplate` (58 Wörter), E4, M2, der Tabelle der Korrekturen (Schneller Fall) und dem Wort-Link-Bildschirm. Alle Längen bleiben in den Grenzen von P4 und 3.13.
2. **`stimme.sagen`:** "Sieveringer Straße" gestrichen; der Satz "die Straßennamen einzeln sind frei" ersetzt durch die Sperre der Sieveringer Straße und die Bedingung für die Agnesgasse.
3. **Betrag nur mit Kundenfreigabe.** M2 und die Anmerkung zu `mittel`: Der Betrag aus `b2` erscheint erst mit Unterlage und Kundenfreigabe; bis dahin endet der Satz nach "Kaufvertrag". Die Aufgabe liegt bei Schritt 14 (5.5 Punkt 11b).
4. **Neue Prüfung P17 "Straßen und Diskretion"** in 6.1: übernimmt `auftakt.keineHausnummer` aus Schritt 1 für alle öffentlichen Felder; Selbsttest 23 in 8.4.
5. **Nachbarn (5.5 Punkt 11):** Schritt 12 übernimmt P17 in `sprachpruefung`; Schritt 14 ergänzt die Aufgabe Kundenfreigabe neben der Unterlage für `b2`. Diese Änderungen stehen in 12 und 14 noch aus.
6. **Hinweis zum Gegenentwurf `t-graetzl`** (Annahme in 3.14): Die Claim-Idee "Zwischen Sieveringer Straße und Agnesgasse." fiele heute durch P17. Das ist eine Folge aus Schritt 6, die 8 nicht ändert, sondern markiert.

Nicht geändert: Seed-Zitate (Abschnitt Eingang Markus, `gate1.schaerfung`), die Zahlentabelle in 3.8 und `stimme.figur.so`, weil sie interne Regel- und Quelltexte sind und keinen Straßennamen in einem öffentlichen Feld erzeugen. Die übrigen Befunde der Kettenprüfung (doppelte Fragen, Erlebnislücken) betreffen die Schritte 1 bis 4, 7, 11 bis 15 und nicht dieses Dokument.
