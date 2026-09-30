# Schritt 16. Freigabe, Übergabe und Rollout (`freigabe`)

Stand 30.09.2026. Entwurf zur Freigabe durch den Owner. Teil der Zerlegung in `../00_ZERLEGUNG.md`, Kapitel 3, Schritt 16. Überarbeitet nach Vorliegen der Entwürfe 12, 13, 14 und 15: Rundenregel, Zahlenregel beim Einfrieren, Fremdtest-Sperre und das Beispiel Markus folgen jetzt deren Verträgen (Abgleich in 5.5). Dritte Fassung nach der Kontrolle: Seed vollständig zitiert und Beispiel auf die Wahl des Gegenentwurfs Dunkel umgestellt, Startplan an `auftrag.termine` aus Schritt 1 gebunden (nur bestätigen, wenn er hält), Freigabe ohne Datum vor der Planbestätigung, Makler-Seite mit dem Stand des Reveals, Vorlagen im Paket, Anrede UNIO an Makler aus einer Quelle, Übergangsweg für Freigabe 2 ohne Server, Folge-Freigabe aus dem Höhepunkt gelöst, Übergabe gestrafft auf fünf Tafeln plus Details.

Lesart wie in der Zerlegung: **Belegt** heißt, es steht in einer Quelle mit URL oder in einer genannten Datei. **Ableitung** heißt, eigene Folgerung. **Setzung** heißt, bewusst gesetzter Startwert, der an den ersten Maklern gemessen und ersetzt wird. **Lücke** heißt, wir wissen es nicht. **Arbeitsannahme** heißt, ein Wert aus einem Nachbarschritt, der dort noch nicht entschieden ist und hier nur die Mechanik zeigt.

---

## 0. Kurzfassung

1. **Drei Akte statt eines Knopfs.** Der Schritt hat drei Akte mit je einem eigenen Moment: Einfrieren (Freigabe 2), Übergeben (die Übergabe-Ansicht im Termin, im Vertrag "Deine Marke steht", 3.7) und Umschalten (Umfeld-Tag, dann Live-Tag). Heute ist Freigabe ein Status ohne Version, und ein Klick auf "Neu erzeugen" oder eine Weltwahl ändert die freigegebene Marke still (KETTE_IST 2.8, `wb-markenbuch.jsx` Zeile 18, 48, 64 und 115).
2. **Eine Quelle, eine Prüfsumme.** Die Freigabe schreibt eine unveränderliche Version `quelle` mit Inhalt, Blob-Hashes und einer SHA-256-Prüfsumme über den kanonischen JSON-Text. Jeder öffentliche Abnehmer (Brand-Kit, Renderer, Website, Karte, Monatsideen, Caption, Reel) liest nur über `hmMarkeLesen(mid, "oeffentlich")`, und diese Funktion liefert nie einen Entwurf. Jeder Schreibpfad, der heute still wirkt, prüft `hmQuelleSperre` und bietet statt Bearbeiten "Änderung beantragen" an.
3. **Freigabe ist ein Akt von zwei Menschen.** Der Creative Director zeichnet den Endstand ab, der Makler gibt ihn frei. Erst der zweite Klick friert ein. Keine automatische Freigabe nach Frist, auch nicht nach Erinnerung (R8 Prinzip 7). Bis zur Server-Datenhaltung kommt der Klick des Maklers als Freigabe-Code zurück, der an die Prüfsumme des gezeigten Stands gebunden ist (3.5).
4. **Zwei Runden, ehrlich gezählt.** Eine Runde verbraucht nur eine Rückmeldung, in der mindestens eine Änderung außerhalb des Spielraums umgesetzt wird (Regel aus Schritt 15 und `10_system.md` 10.7). Fragen, Änderungen im Spielraum und Tatsachenkorrekturen zählen nie. Vor jeder Runde steht, wie viele noch enthalten sind, und eine dritte lässt sich erst öffnen, wenn ihr Preis in den Einstellungen steht.
5. **Der Drehtag kommt nach der Freigabe.** Er liefert Titelbild, gesprochene Sätze und B-Roll für jedes Reel der ersten vier Wochen, gebunden an die Kacheln aus Schritt 13. So wird nichts gedreht, was sich danach noch ändert.
6. **Die Übergabe ist der Höhepunkt, kein Download.** Die Ansicht ist das erste Artefakt, das ganz in seiner eigenen Marke gesetzt ist. Fünf Tafeln: sein Profil am Live-Tag, vier Wochen, Website, Alltag mit den gedruckten Karten, dann sein Zeichen, das nach seiner eigenen Regel das Datum des Live-Tags markiert. Was gilt, Umfeld, Plan und Paket liegen danach unter "Details". Die Freigabe der Folge ist keine Handlung im Termin, sie geschieht danach im Link.
7. **Nach innen zuerst.** Am Umfeld-Tag, mindestens zwei Werktage vor dem Live-Tag (Setzung), sehen Büro, Assistenz, Mitentscheider und die wichtigsten Empfehler (Notariat, Steuerberatung, Hausverwaltung, wenn sie Fälle bringen) die Marke vorab. Der Makler teilt die Vorschau selbst. Das System speichert nur Rollen, nie Namen oder Kontaktdaten Dritter.
8. **Kein halbes Raster.** Im Live-Termin von 30 Minuten (Setzung) schaltet der Makler am eigenen Telefon um, mit dem Team daneben: Website live, Profilkopf neu, Altbestand archiviert, drei Beiträge der ersten Woche in fester Reihenfolge veröffentlicht und angepinnt. So steht die erste Zeile vollständig und bleibt stehen, während die Folge darunter wächst. Das Team braucht dafür kein Passwort.
9. **Ein Datum für alles.** `hmRolloutPlan` rechnet Drehtag, Übergabe, Umfeld-Tag, Live-Tag, Posting-Tage und Rückblick aus einer Regel mit Werktagen und `HM_FEIERTAGE`. Schritt 1 plant `auftrag.termine` schon mit dieser Funktion. Hält der geplante Live-Tag nach der Freigabe, bestätigt der Makler ihn nur. Zwei Pläne gibt es nur, wenn er nicht hält, dazu den Ausweg "Keiner passt", der einen Anruf des Teams auslöst. Bei Markus Leitner hält der geplante Dienstag, 24.11.2026, Beginn des Live-Termins 11 Uhr.

---

## 1. Ziel und Erfolgskriterium

### 1.1 Ziel

Die Marke wird als eine versionierte, eingefrorene Quelle festgehalten, die alle Abnehmer lesen, freigegeben von Makler und Creative Director. Die Übergabe wird als eigener Höhepunkt inszeniert. Der Wechsel geschieht erst nach innen, dann an einem festen Tag öffentlich, nie still und nie mit halbem Raster. Danach übernimmt Schritt 17 mit einer Quelle, einem Plan und einer Checkliste, in der nichts offen ist, was am Live-Tag sichtbar wäre.

Warum das die bestmögliche Lösung ist und nicht die bequemste: Die bequeme Lösung ist ein Freigabe-Knopf und ein ZIP. Beides gibt es heute (`hmMbSetzen`, `hmBrandKit`, `hmMaterialPaket`), und beides lässt die Kette an ihrer wichtigsten Stelle reißen. Die Freigabe gilt für einen Text, der sich ändern kann, das Kit exportiert eine feste Palette unabhängig von der Welt, und das Materialpaket packt Demo-Objekte mit ein (KETTE_IST 2.8 und Kapitel 3). Die Peak-End-Regel ist an kurzen, unangenehmen Erlebnissen im Labor gemessen: Die Erinnerung folgt dem Höhepunkt und dem Ende stärker als der Dauer (Kahneman u. a. 1993, https://journals.sagepub.com/doi/10.1111/j.1467-9280.1993.tb00589.x). Dass das Ende eines wochenlangen Branding-Projekts ebenso überproportional erinnert wird, ist eine Übertragung (Ableitung), kein Befund über Projekte. Sie genügt als Grund, das Ende nicht dem Zufall zu überlassen, und ein Download ist nach ihr der schwächste denkbare Schluss (R8 Kapitel 1, Punkt 7).

### 1.2 Erfolgskriterium

| Nr. | Kriterium | Messung | Schwelle |
|---|---|---|---|
| E1 | Eine Quelle für alle öffentlichen Abnehmer | Selbsttest P3 vergleicht Claim, Palette, Schriften, Anrede je Kanal und Wortmarke in Brand-Kit, Welt-Renderern, Website-Feldern, Karte, Signatur, Caption, Reel und Monatsidee mit `quelle.inhalt` | 0 Abweichungen |
| E2 | Nichts ändert sich still | Selbsttest P2 spielt jeden bekannten Schreibpfad nach der Freigabe durch (Tabelle 3.3.4) | Prüfsumme der Quelle und Ausgabe aller Abnehmer unverändert; einzige Ausnahme sind Stammdaten (Telefon, Adresse, Impressum), die keine Marke sind: Sie ändern Karte und Signatur, aber jede Änderung ist ein protokolliertes Ereignis und öffnet die Checklistenpunkte wieder (3.3.4, letzte Zeile) |
| E3 | Freigabe ist ein Akt | `quelle.freigegebenVon` enthält Makler und CD mit Zeitpunkt, beim Makler mit `weg` (Code, Team-Gerät oder Link) und der Prüfsumme des gezeigten Stands; `freigabe.historie` eine Zusammenfassung in Satzschreibung | vollständig; nie automatisch |
| E4 | Runden ehrlich | `freigabe.runden.genutzt` höchstens 2; vor Runde 2 und vor einer möglichen dritten steht der Hinweis mit Preis | Hinweis in 100 Prozent der Fälle vor dem Absenden |
| E5 | Live-Tag ohne halbes Raster | `rollout.liveTag.bereitschaft` am Vortag: Profilkopf vollständig, drei Beiträge der ersten Zeile bereit, jede Zahl darin mit Prüfstatus "Unterlage geprüft", jeder Pflichtpunkt der Checkliste erledigt | alle Blocker null, sonst verschiebt die Regel den Tag |
| E6 | Umfeld vor Öffentlichkeit | `rollout.umfeld.datum` mindestens zwei Werktage vor `rollout.liveTag.datum` (Setzung), Checklistenpunkt "Umfeld informiert" vom Makler erledigt | erfüllt |
| E7 | Drehtag deckt die ersten vier Wochen | jedes Reel in `feed.kacheln` hat in `rollout.drehtag.clips` Titelbild, Sätze und B-Roll (Leitfrage E4 aus Schritt 11) | 100 Prozent |
| E8 | Ende als Moment | Übergabe als Termin mit Ansicht; erste Ansicht ist Anwendung (Profil), nie Logo auf Weiß; Paket nur unter "Details" | erfüllt |
| E9 | Ehrliche Makler-Zeit | jede Aufgabe mit Dauer vorab angezeigt, jede in einer Sitzung abschließbar | Setzungen, nach fünf Maklern ersetzt |
| E10 | Belegt öffentlich | keine Zahl mit Prüfstatus "Selbstauskunft" in Website, erster Zeile, Bio oder Kopfzeilen | 0 |

### 1.3 Was wir ab dem ersten Makler messen

Vorschlag aus R8 Kapitel 6, Punkt 6, hier festgelegt: Werktage vom Reveal bis zur Freigabe 2, Zahl der Runden, Anteil der Pins, die Fragen statt Änderungen waren, ob der erste berechnete Live-Tag gehalten wurde, Öffnungen der Umfeld-Vorschau vor dem Live-Tag (nur als Zahl, ohne Personenbezug) und die Dauer von Übergabe und Live-Termin. Ein Zufriedenheitssatz des Maklers wird nicht abgefragt, weil er keinen Liefergegenstand verändert. Das Team notiert Beobachtungen im Termin als `uebergabe.beobachtungen`.

---

## 2. Geprüfte Alternativen und warum verworfen

| Nr. | Alternative | Was dafür spricht | Warum verworfen | Was wir übernehmen |
|---|---|---|---|---|
| A1 | **Freigabe als Status wie heute**, der Knopf setzt "freigegeben", die Plattform wird bei Bedarf neu erzeugt | ein Klick, kein Umbau | Die Freigabe speichert keine Version, `hmMbPlattform` erzeugt bei jedem Aufruf neu, "Neu erzeugen" und Weltwahl überschreiben still, die Website prüft nur, ob ein Eintrag existiert (KETTE_IST 2.8 und Kapitel 3, `wb-marke.jsx` Zeile 117). Genau diese Brüche soll der Schritt schließen (00_ZERLEGUNG 4.1). | nichts außer dem Ort im Markenbuch |
| A2 | **Übergabe als Paket**: ZIP mit Logos, Farben, Markenbuch-PDF, per Mail oder Download | Dienstleister brauchen Dateien; schnell | Das Ende zählt überproportional (Kahneman u. a. 1993, s. o.). R8 5 schließt einen Reveal per Mail aus, R8 2.6 zeigt, dass Studios Fähigkeit übergeben, nicht Dateien: Einhaltung soll der Weg des geringsten Widerstands sein (Luke Scott, How&How, und Luke Powell, Pentagram, im Brandpad-Gespräch: https://the-brandidentity.com/interview/presented-by-brandpad-how-to-systemise-a-brand-featuring-pentagram-how-how-and-studio-blackburn). Die heutigen ZIPs haben außerdem eine feste Palette und Demo-Objekte (KETTE_IST 2.8, `wb-setup.jsx` `hmBrandKit`). | das Paket als zweite Ebene unter "Details", jede Datei mit Version im Namen und aus der Quelle erzeugt |
| A3 | **Externes Markenportal** (Frontify) als Übergabe | lebendes Markenbuch, Vorlagen mit Sperren, Sicht je Rolle (https://www.frontify.com/en/brand-portal) | R8 5: kein Frontify-Abo für den Makler, weil es Einarbeitung oder Geld kostet und die Werkbank es selbst kann. Ein weiterer Login und eine zweite Datenablage widersprechen der einen Quelle. Die Rubrik verlangt, dass keine Konten des Maklers bei fremden Werkzeugen nötig sind. | Sicht je Rolle (aus Schritt 14), gesperrte Vorlagen (Schritt 12), Markenbuch als lebendes Dokument (R4 Ableitung) |
| A4 | **Stiller Wechsel über Nacht**: neues Profil, neue Website, keine Vorschau für niemanden | kein Koordinationsaufwand, "die Marke spricht für sich" | Gap stellte 2010 ein neues Logo ohne Einbettung online und nahm es nach rund einer Woche zurück (NPR: https://www.npr.org/2010/10/08/130419187/the-gap-gets-backlash-for-logo-makeover). Mitarbeitende untergraben Markenversprechen, die sie nicht verstehen oder nicht glauben (Mitchell, HBR 2002: https://hbr.org/2002/01/selling-the-brand-inside). Bei einem Makler sind das Büro, Assistenz und die Empfehler, die ihn Kunden nennen. | der feste Tag; das Umfeld sieht vorher |
| A5 | **Öffentlicher Vorlauf**: Teaser, Abstimmung bei Followern oder Kollegen über Logo oder Farbe | Beteiligung, Reichweite vor dem Start | Gap bat nach der Kritik öffentlich um Vorschläge (Forbes: https://www.forbes.com/sites/velocity/2010/10/07/new-gap-logo-hated-by-many-company-turns-to-crowdsourcing-tactics/); Mozillas offener Prozess zeigt, wie schnell öffentliche Kommentare eine Richtung kippen (R1 5, https://blog.mozilla.org/opendesign/roads-not-taken/). Neues wird zunächst schlechter bewertet, besonders von stark Gebundenen (Walsh, Winterich, Mittal 2010: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1998809). | Das Umfeld sieht, es stimmt nicht ab. |
| A6 | **Einsickern ohne Stichtag**: neue Beiträge kommen nach und nach, Profilkopf und Website wechseln irgendwann | Mastercard ließ alte Varianten vorerst im Umlauf (R1 2.6, https://www.pentagram.com/work/mastercard); kein harter Termin | Für eine Personenmarke im Profil heißt das wochenlang zwei Marken nebeneinander: neue Kachel unter altem Kopf, alte Signatur unter neuer Website. Das ist das "halbe Raster" aus der Leitfrage 3. Der Stichtag schafft außerdem den Moment. | Gedrucktes läuft aus: neue Schilder ab der nächsten Vermarktung, alte Karten werden nicht vernichtet (Ableitung aus Mastercard) |
| A7 | **Alle zwölf Beiträge am Live-Tag veröffentlichen**, damit das Raster sofort voll ist | voller Eindruck am ersten Tag | Schritt 13 plant eine Folge über vier Wochen mit Kompetenz vor Persönlichem; jeder neue Beitrag verschiebt alle anderen um einen Platz, belastbar sind nur Regeln über die Folge (R6 Kapitel 1 und Prinzip 2). Zwölf auf einmal zerlegen den Rhythmus der Signatur-Serie, bevor er beginnt. | eine vollständige Zeile am Live-Tag, danach der Rhythmus |
| A8 | **Raster vorab still befüllen** (Test "stilles Posten") | das ganze Raster stünde vor dem Wechsel | Instagram hat stilles Posten im Juni 2025 nur als Test angekündigt (TechCrunch: https://techcrunch.com/2025/06/12/instagram-will-finally-let-you-rearrange-your-grid); die allgemeine Verfügbarkeit ist offen (R6 offene Frage 4). Eine Kette darf nicht auf einer Funktion stehen, die es vielleicht nicht gibt. | als Option in 3.9, wenn die Funktion nachweislich verfügbar ist |
| A9 | **Automatische Freigabe nach Frist**, wie heute bei Beiträgen (PLAN.md: "Auto-Freigabe nach 5 Tagen") | kein Hängenbleiben | Freigabe ist ein Akt mit Namen, Version und Datum (R8 Prinzip 7, The Good Studio: nach der Richtungsfreigabe nur noch kleinere Änderungen, https://www.thegoodstudio.com.au/insights/identity-process). Eine Marke, die niemand freigegeben hat, trägt der Makler nicht. | Erinnerung über den Nachfass-Takt (Tag 0, 2, 7 und 14, `V5_STUFEN.md`), der Live-Tag rückt nach der Regel, nie eine stille Freigabe |
| A10 | **Unbegrenzte Runden bis zur Zufriedenheit** | wirkt kundenfreundlich | R8 5: keine unbegrenzten Runden, zwei inklusive, die dritte vorab angekündigt. Der Markenvertrag ist der Maßstab, nicht die Geduld (G5). | Fragen, Änderungen im Spielraum und Tatsachenkorrekturen zählen nie als Runde |

---

## 3. Die gewählte Lösung

### 3.1 Grundgedanke

Der Schritt trennt zwei Dinge, die heute vermischt sind: **die Marke** (was gilt) und **das Material** (womit und wann sie zum ersten Mal erscheint).

- Die Marke steht in `quelle`: Plattform, System, Bild, Social und Feed als Plan, eingefroren, mit Prüfsumme. Sie ändert sich nur als neue Version.
- Das Material steht in `rollout`: Clips vom Drehtag, fertige Dateien der ersten Beiträge, Termine, Checkliste. Es füllt Plätze, die die Quelle definiert hat (Lückenkacheln aus Schritt 13, Clip-Bedarf aus Schritt 11), ohne die Quelle zu ändern. Ob eine Füllung passt, prüfen die Bildregeln der Quelle und der Art Director.

Daraus folgen drei Akte. Jeder hat einen Anfang, ein Ende und einen Moment für den Makler.

| Akt | Moment | Makler tut | Dauer für ihn (Setzung) |
|---|---|---|---|
| Einfrieren | "Das ist jetzt meine Marke." | liest die Freigabe-Ansicht, gibt frei, bestätigt seinen Start (oder wählt zwischen zwei Plänen, wenn der geplante nicht hält), bestätigt Umfeld und Altbestand | 6 bis 10 Minuten |
| Übergeben | "Meine Marke steht." | erlebt die Ansicht im Termin, hält die Karten in der Hand; danach im Link: gibt die ersten vier Wochen frei | 40 Minuten, danach 10 Minuten |
| Umschalten | "Ab jetzt sieht man mich so." | teilt die Vorschau mit seinem Umfeld, schaltet im Live-Termin am eigenen Telefon um | 15 Minuten plus 30 Minuten |

Dazwischen liegt der Drehtag (Fotobrief aus Schritt 11, Dauer aus dem Brief). Danach folgen vier Wochen Folge und ein Rückblick, dann übernimmt Schritt 17.

### 3.2 Ablauf

Werktage (WT) nach `hmIstWerktag` in `wb-shop2.jsx`, Abstände als Setzung, gerechnet von `hmRolloutPlan`.

| Nr. | Teilschritt | Wann | Wer | Ergebnis |
|---|---|---|---|---|
| 16.1 | Änderungen der Runde einarbeiten | ab `rueckmeldung.offenAb`, 1 WT bei Änderungen im Spielraum, bis 3 WT sonst | Team in den Werkzeugen der Zielschritte, Regeln prüfen neu | neuer Stand `x.(n+1)`, jede Änderung mit Status und Antwort |
| 16.2 | Endstand abzeichnen | am Tag des neuen Stands | CD | `freigabe.historie` Eintrag "abgezeichnet", Gate-2-Schwellen erneut automatisch gerechnet |
| 16.0 | Makler-Seite für den Drehtag, Stand Reveal | mit dem Absenden der Rückmeldung in Schritt 15 | Regel | Seite mit Ort, Kleidung, Dauer und den Sätzen im Stand 1.0, gekennzeichnet "Stand Reveal"; durch den Plan mindestens 3 WT vor dem Drehtag (3.6) |
| 16.3 | Freigabe-Ansicht | am selben oder nächsten WT | Makler, allein, am Telefon oder Rechner | Freigabe oder Runde 2; Start bestätigen; Bestätigungen; bis zur Server-Datenhaltung als Freigabe-Code zurück (3.5) |
| 16.4 | Einfrieren | mit dem Klick des Maklers (Code vom Team eingetragen) | Regel | `quelle` mit Version, Prüfsumme, Blob-Hashes; alle Sperren aktiv |
| 16.5 | Druckdaten, Drehtag-Plan | Freigabe plus 1 WT | Team | Karte und Schild an die Druckerei; `rollout.drehtag` mit Clip-Liste; geänderte Sätze gehen als Nachtrag auf die Makler-Seite, markiert "neu" |
| 16.6 | Drehtag | Freigabe plus mindestens 2 WT | Team, Makler | Clips und Standbilder, Kontaktbogen-Einträge (Schritt 11, Durchgang 1 und 2) |
| 16.7 | Produktion der ersten vier Wochen | 4 WT nach dem Drehtag | Team, Regeln (Renderer aus der Quelle, Prüfer aus Schritt 13) | fertige Dateien je Kachel, Highlight-Stories, LinkedIn-Beiträge |
| 16.8 | Übergabe | nächster WT nach der Produktion | Team und Makler im Termin | Übergabe-Ansicht mit fünf Tafeln, Karten; danach bleibt die Ansicht bei ihm |
| 16.8a | Folge-Freigabe im Link | nach dem Termin, Woche 1 bis zum Vortag des Live-Tags 12 Uhr, Wochen 2 bis 4 bis 2 WT vor dem jeweiligen Beitrag | Makler allein, Team setzt Füllungskorrekturen um | `rollout.folge.freigegebenAm`, `rollout.folge.korrekturen[]` (3.7, Details D5) |
| 16.9 | Umfeld-Tag | nach der Übergabe, mindestens 2 WT vor dem Live-Tag | Makler teilt, Regel erzeugt | Vorschau, Seiten je Rolle, persönliche Notizen an Empfehler |
| 16.10 | Live-Tag | am berechneten Tag, zur Uhrzeit aus dem Rhythmus der Signatur-Serie | Makler am eigenen Telefon, Team daneben | Profil, Website, Signatur, LinkedIn, Google-Profil umgestellt; erste Zeile steht |
| 16.11 | Vier Wochen Folge | ab Live-Tag | Team über den bestehenden Posting-Ablauf ("Vier Wochen geplant" in `hmSchritteFuer`) | Wochen 2 bis 4 im Rhythmus |
| 16.12 | Rückblick | Stichtag Live-Tag plus 30 Tage, Termin am nächsten Makler-Werktag | Team und Makler, 30 Minuten | Zahlen der ersten 30 Tage, Übergabe an Schritt 17 |

**Mindestabstand vom Reveal zum Live-Tag.** Mit einer Rückmeldung, deren Änderungen im Spielraum liegen oder abgelehnt sind, sind es 13 WT, mit einer umgesetzten Änderung außerhalb des Spielraums 15 WT, mit zwei Rückmeldungen bis 19 WT (Setzungen, Rechnung in 3.13). Diese Rechnung gibt es genau einmal, in `hmRolloutPlan`. Schritt 1 ruft sie beim Planen von `auftrag.termine` auf (`01_auftakt.md` 3.5: Plan A mit 13 WT wird der Live-Tag, Plan B mit 15 WT der Ausweichtag `liveTag.reserve`). Der Drehtag bleibt bei Freigabe plus 2 WT, weil die Makler-Seite nicht erst mit der Freigabe entsteht, sondern mit dem Stand des Reveals (16.0); vom Absenden der Rückmeldung bis zum Drehtag liegen so immer mindestens 3 WT (Rückmeldung R, Umsetzung R plus 1, Freigabe frühestens R plus 1, Drehtag frühestens R plus 3).

### 3.3 Die Quelle

#### 3.3.1 Was hinein gehört und was nicht

`quelle.inhalt` enthält genau die Felder, die Abnehmer brauchen, in der gewählten Variante aus `rueckmeldung.wahl`:

| Teil | Felder | aus Schritt |
|---|---|---|
| `plattform` | `einsicht` (ohne `kandidaten`), `positionierung`, `versprechen`, `rolle`, `werte`, `persoenlichkeit`, `beweise`, `markenvertrag`, `stimme`, `anrede`, `botschaften`, `story`, `presse`, `brief`, `idee` (ohne `varianten`) | 5, 7, 8, 9 |
| `system` | die gewählte Variante vollständig: `wortmarke`, `zeichen`, `typo`, `farbe`, `raster`, `tokens`, `sperrstufen`, `festUndVariabel`, `spielraum`, `stresstest` | 10 |
| `bild` | `regeln`, `motive`, `vermeiden`, `portraet`, Auswahl aus `kontaktbogen` (nur Durchgang 2), `fotobrief` | 11 |
| `social` | `saeulen`, `serien` mit dem gewählten Seriennamen, `serieSignatur`, `vorlagen`, `karussellRollen`, `grammatik`, `formatmix`, `codesPruefung`, `kanalplan`, `konzepte`, `sprachpruefung`, `objektRegel` | 12 |
| `feed` | `start30`, `feed.kacheln` (mit `skript` je Reel), `feed.profilkopf`, `feed.wochen`, `feed.linkedin`, `feed.pruefung` der gewählten Variante | 13 |

**Seriennamen.** Vor dem Zusammenstellen überträgt die Regel `rueckmeldung.serienname` in `serieSignatur.gewaehlt` und setzt ihn in `serien[signatur].name`, jede Kennung, das Staffelplakat und alle Captions der Serie (so verlangt es `12_social.md` 5.2, Hinweis 3). Hat er keinen gewählt, gilt `serieSignatur.empfehlung`. Die Übertragung ist Teil des Stands, den der CD abzeichnet, und steht in der Historie.

Nicht hinein: Territorien, verworfene Einsichten, `idee.varianten`, der nicht gewählte Gegenentwurf, Rohantworten, Vorab-Dossier und Workshop-Mitschrift. Sie bleiben im Arbeitsstand `marke2[mid]` und im Kapitel "Wie wir zu dieser Marke gekommen sind" (Schritt 14). Grund: Die Quelle ist das, was gilt. Was verworfen ist, gilt nicht, und Rohdaten haben in einem Objekt, aus dem Dateien für Dienstleister entstehen, nichts zu suchen (Datenschutz, Ableitung).

Der Inhalt kommt aus dem Stand, den Schritt 14 im `markenbuch` gebunden hat, plus den umgesetzten Änderungen aus 16.1. Schritt 16 liest die Felder aus 5 bis 13 also nicht an Schritt 14 vorbei, sondern über dessen Versionsbindung (`markenbuch.version` und `markenbuch.basis[]`, `14_markenbuch.md` 5.4).

**Zahlen ohne Unterlage.** Schritt 14 legt fest: Schritt 16 friert keine Quelle ein, solange eine öffentliche Zahl nur vermerkt ist (`14_markenbuch.md` 3.10, `markenbuch.zahlen[]`). Das gilt hier ohne Ausnahme, und es blockiert trotzdem nicht die ganze Marke wegen eines fehlenden Kaufvertrags. Für jede Zahl, die bis zur Freigabe nur Selbstauskunft ist, gibt es genau zwei Wege:

1. Die Unterlage kommt vor der Freigabe. Dann wechselt der Prüfstatus auf "Unterlage geprüft", und die Zahl steht in der Quelle wie gezeigt.
2. Die Unterlage fehlt noch. Dann trägt jede Stelle, an der die Zahl wirkt, eine **Fassung ohne Zahl**, die dieselben Regeln besteht (Stimme, Grammatik, Codes, Belegpflicht je Zeile aus Schritt 13). Wo die Zahl selbst der Inhalt ist, etwa bei einer Folge, deren Variable die Kennzahl ist, ist die Fassung ohne Zahl eine Tauschfolge derselben Serie aus `serien[].themenvorrat` oder die `reservefolge` aus Schritt 12. Gibt es keine, ist die Stelle nicht freigebbar, und das Team löst sie vor der Freigabe-Ansicht: Unterlage beschaffen oder Folge in Schritt 13 neu belegen. Diese Fassung ist die öffentliche. Die Zahl steht in `quelle.gesperrt[]` mit Pfad, fehlender Unterlage, Frist und den Stellen, an denen sie wirkt. Der Makler sieht in der Freigabe-Ansicht beide Fassungen und gibt beide frei (3.5, Punkt 5).

Damit enthält keine eingefrorene öffentliche Stelle eine nur vermerkte Zahl, und die Bedingung aus Schritt 14 hält. Trifft die Unterlage später ein, prüft das Team sie, und die Regel schaltet an den genannten Stellen auf die Fassung mit Zahl um. Das ist keine neue Markenversion, weil beide Fassungen freigegeben und von der Prüfsumme gedeckt sind; es wird in `freigabe.historie` als Eintrag "Unterlage geprüft" mit Verweis auf die Unterlage geführt und dem Makler in einem Satz gezeigt, also nie still. Ein Beleg mit `oeffentlich` nein hat nie eine Fassung mit Zahl.

#### 3.3.2 Einfrieren und Prüfsumme

`hmQuelleEinfrieren(mid)` läuft nur mit beiden Signaturen und in dieser Reihenfolge:

1. Stand zusammenstellen (3.3.1), gewählte Variante einsetzen. Wählt der Makler den Gegenentwurf, werden `system.gegenentwurf` und `feed.gegenentwurf` zu `system` und `feed`; die Empfehlung wandert in die Historie.
2. Sperrprüfung: `hmGate2Pruefen` aus Schritt 14 auf dem geänderten Stand (Schwellen aus MARKENQUALITAET Kapitel 2: mindestens 80, kein Kriterium unter 60, keine Klischees; Kohortenvergleich; Lautlese-Test nur für geänderte Sätze), dazu Anrede-Prüfung, Stresstest der geänderten Bauteile, die Zahlenregel aus 3.3.1 und der Fremdtest aus Schritt 15: Steht `praesentation.fremdtest` für die gewählte Fassung auf "nicht erkannt", friert nichts ein, bis der CD mit dem Makler geklärt hat, ob Vertrag, Idee oder Umsetzung nicht tragen (`15_reveal.md` 3.6 und Frage T2). Fällt eine Prüfung, gibt es keine Quelle, und die Freigabe-Ansicht zeigt dem Team den Grund. Der Makler sieht die Ansicht erst, wenn alles grün ist.
3. Blobs hashen: jedes Bild, jede Wortmarke und jedes Titelbild, auf das die Quelle zeigt (IndexedDB `unio_hm_blobs`, Schlüssel `k:`, `p:`, `o:`), bekommt einen SHA-256-Wert in `quelle.blobs[]`. Ein später ersetztes Porträt fällt so auf.
4. Kanonisieren: JSON mit rekursiv sortierten Schlüsseln, ohne Leerraum, Zahlen unverändert.
5. Prüfsumme: SHA-256 über den kanonischen Text mit der Web Crypto API (`crypto.subtle.digest`, Standard-Browserfunktion, https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest; nicht Teil der Recherche, technische Angabe).
6. Speichern: Der Index liegt in `hmStore` unter `quellen`, der volle Inhalt zusätzlich in IndexedDB unter `q:<mid>:<version>`. Grund: localStorage ist knapp, und eine zweite Kopie erlaubt die Wiederherstellung, wenn die erste beschädigt ist (Ableitung; Kontingent des Browsers ist nicht gemessen, Lücke).
7. Sperren aktivieren, Ereignis schreiben (`hmEvent(mid, "marke", "Marke Version 1.1 freigegeben", ...)`), Plan rechnen (3.13).

`hmQuellePruefen(mid)` rechnet Prüfsumme und Blob-Hashes asynchron nach: beim Start der Werkbank, beim Öffnen von Übergabe und Umfeld-Vorschau, vor jeder Veröffentlichung in Schritt 17 und im Selbsttest. Stimmt etwas nicht, sind öffentliche Ausgaben gesperrt, das Team sieht "Quelle weicht ab" mit Pfad, und die Kopie aus IndexedDB stellt wieder her. Nie wird eine abweichende Quelle still weiterbenutzt.

#### 3.3.3 Wer die Quelle liest

Eine Lesefunktion für alle: `hmMarkeLesen(mid, zweck)`. Mit `zweck: "oeffentlich"` liefert sie nur die Quelle, sonst `null` und eine Lücke "noch nicht freigegeben". Mit `zweck: "entwurf"` liefert sie vor der Freigabe den Arbeitsstand (für Markenbuch, Reveal, Freigabe-Ansicht) und nach der Freigabe ebenfalls die Quelle. `hmAnrede` aus Schritt 8 ruft dieselbe Funktion (08_stimme 8.1: "liest vor der Freigabe den Entwurf, danach nur die eingefrorene Quelle").

**Anrede UNIO an den Makler, eine Quelle.** Die Anrede in `anrede` regelt, wie der Makler seine Kunden anspricht, je Kanal. Wie UNIO den Makler anspricht, ist etwas anderes und gehört nicht in seine Marke. Damit es trotzdem genau eine Logik gibt, bekommt `hmAnrede` einen benannten Kontext `makler` (Korrekturbedarf K10 an Schritt 8): `hmAnrede(mid, "makler")` liest nicht `anrede`, sondern das eine Feld `einstellungen.anredeMakler` in `hmStore` (global, mit optionalem Eintrag je Makler), das Schritt 1 schon als "globale Einstellung" vorsieht (`01_auftakt.md` 3.8, Absatz "Texte in seinem Link"). Der Wert ist bis zur Entscheidung des Owners eine Lücke (00_ZERLEGUNG 7.1). Solange er fehlt, liefert die Funktion die Setzung, die Schritte 5, 7, 8, 13 und 14 schon nutzen: die Form seiner Website aus `anrede.kontexte.website`, und schreibt "makler" in `anrede.fehlend`. Alle Makler-Ansichten aller Schritte rufen diesen Kontext; kein Schritt leitet die Anrede an den Makler selbst ab. Bei Markus ergibt das Sie. Der Vertragswortlaut "Deine Marke steht" ist damit der Arbeitsname der Ansicht aus der Zerlegung, die im Du geschrieben ist, keine Vorgabe für den gesetzten Text (K9).

| Abnehmer | liest heute | liest künftig | Code |
|---|---|---|---|
| Brand-Kit | `hmBrand` mit fester Palette #F7F5F1, #0B0A09, #F0EDE6, #D1D3D5 | `quelle.inhalt.system.tokens`, Datei `tokens.json` und `brand.css` | `wb-setup.jsx` `hmBrandKit`, `wb-marke.jsx` `BrandKit`, `StudioDownloads` |
| Welt-Renderer (Post, Story, Feed, Karte, Signatur, Exposé) | `bb = { ...hmBrand, plattform: p }` mit neu erzeugter Plattform | ein Markenobjekt aus der Quelle, `hmWeltMarke` bekommt Tokens statt Welt-Farben | `wb-markenwelten.jsx`, `wb-markenbuch.jsx` Zeile 116 bis 122 |
| Website | `hmMbPlattform` sobald irgendein Markenbuch-Eintrag existiert, Schrift und Akzent aus `branding` | nur `hmMarkeLesen(mid, "oeffentlich")`; ohne Quelle kein Livegang | `wb-marke.jsx` `hmWebFelder` Zeile 117, `wb-web.jsx` Zeile 47 und 344 |
| Karte | zwei Komponenten (`Visitenkarte`, `WeltKarte`) | ein Renderer aus Tokens (Schritt 10), Druckdaten aus der Quelle | `wb-marke.jsx` Zeile 95, `wb-markenwelten.jsx` |
| Monatsideen | `HM_IDEEN_VORLAGEN` | `quelle.inhalt.social.serien` (Umsetzung in Schritt 17, die Sperre hier) | `wb-produktion.jsx` `hmIdeen` |
| Caption | Formel mit `w.anrede` | Anrede über `hmAnrede`, Stimme aus der Quelle | `wb-os-data.jsx` `hmCaption` |
| Reel | `hmMbPlattform` plus Akzent und Schrift aus `branding` | Quelle, Tokens für Untertitel und Endkarte | `wb-reel.jsx` Zeile 12 |
| Materialpaket | `hmMbPlattform` und DOM-Vorschauen mit Demo-Objekten | `hmUebergabePaket(mid)` aus der Quelle, ohne Demo-Objekt | `wb-material.jsx` Zeile 71 bis 91 |
| Bildwelt-Auftrag | `hmMbPlattform` | `bild.regeln` aus der Quelle (Schritt 11) | `wb-bildwelt.jsx` Zeile 23 |

#### 3.3.4 Stille Pfade und wie jeder geschlossen wird

| Pfad heute | Wirkung heute | Nach der Freigabe |
|---|---|---|
| "Neu erzeugen" im Markenbuch (`wb-markenbuch.jsx` Zeile 48) | neue Plattform, Status zurück auf Prüfung | Knopf nur im Arbeitsstand; bei vorhandener Quelle heißt er "Neue Version beginnen" und legt einen Entwurf `2.0` an, die Quelle bleibt aktiv |
| Weltwahl (Zeile 115) | überschreibt Schrift in `branding` und Look in `website` | nach Freigabe nicht sichtbar, auch nicht für das Team; die Welt ist in v2 ohnehin nur interne Grammatik (Schritt 9) |
| Geänderte Antwort im Fragebogen | Plattform ändert sich beim nächsten Aufruf mit | keine Wirkung auf Abnehmer, weil niemand mehr aus Antworten ableitet; der Fragebogen zeigt "Ihre Marke ist freigegeben. Eine geänderte Antwort wirkt erst mit einer neuen Version." |
| Studio-Regler (`wb-marke.jsx` Zeile 76) | setzt `branding` auf "geaendert" | entfällt mit Schritt 10; bis dahin gesperrt, sobald eine Quelle existiert |
| Website-Einstellungen (`wb-web.jsx` Zeile 344) | patcht `branding` | Markenfelder nur lesend; Stammdaten und Recht bleiben bearbeitbar |
| `hmPlattformSpeichern` durch Claude oder Regeln | neue `aktuell`-Version, Markenbuch liest sie | schreibt nur in den Arbeitsstand; Abnehmer lesen die Quelle |
| Porträt neu zuschneiden | `hmPortraitUrl` ändert sich überall | die Quelle zeigt auf den Blob mit Hash; ein neues Porträt ist Füllung für einen Platz oder Teil einer neuen Version |
| Neues Material, Bildwelt-Ergebnis | fließt in Vorschauen | nur Arbeitsstand |
| Telefonnummer oder Adresse in der Einrichtung | ändert Karte und Signatur mit | Stammdaten sind keine Marke und bleiben live, aber jede Änderung öffnet die Checklistenpunkte Karte und Signatur wieder und schreibt ein Ereignis; nie still. Das ist die einzige, protokollierte Ausnahme von E2 |

Der Selbsttest P2 führt jeden dieser Pfade an einem Testmakler aus und vergleicht danach Prüfsumme und Abnehmerausgaben. Für den Stammdatenpfad prüft er stattdessen: Prüfsumme unverändert, Ereignis geschrieben, Checklistenpunkte Karte und Signatur wieder offen, alle übrigen Abnehmerausgaben unverändert.

#### 3.3.5 Versionen

- Arbeitsstände vor der Freigabe tragen die Nummer des Gate-2-Stands und der Runde: `1.0` ist der Stand im Reveal (`gate2.version`), `1.1` nach Runde 1, `1.2` nach Runde 2.
- Freigegeben wird genau ein Stand; er wird unveränderlich (`status: "freigegeben"`).
- Nach der Freigabe entsteht jede Änderung als Änderungsantrag (Schritt 17 `aenderungsantrag`). Kleine Version (`1.2` auf `1.3`): Wert im Spielraum oder Tatsachenkorrektur, CD zeichnet ab, der Makler bestätigt mit einem Klick. Große Version (`2.0`): ein Code ändert sich (Zeichen, Wortmarke, Schrift, Claim, Palette, Crop-Regel, Signatur-Serie), volle Freigabe 2. Die alte Version bekommt `status: "abgeloest"` und bleibt lesbar.
- Jede Datei des Pakets trägt Version und die ersten acht Zeichen der Prüfsumme im Namen und im Fuß, etwa `markus-leitner-1.1-tokens.json`. So erkennt eine Druckerei eine alte Datei ohne Rückfrage.

### 3.4 Runden und Änderungen

**Was eine Runde ist.** Die Regel stammt aus Schritt 15, Schritt 16 zählt nur: `freigabe.runden.genutzt` erhöht sich für jede Rückmeldung (`rueckmeldung.runde` 1 oder 2), in der mindestens eine Änderung mit `imSpielraum` falsch und Entscheidung "umsetzen" steht (`aenderungen[].zaehltAlsRunde`, `15_reveal.md` Q13). Fragen werden beantwortet und zählen nie (R8 Prinzip 6, Monteiro nach der Sekundärquelle in R8 2.3). Änderungen im Spielraum zählen nie, weil der Spielraum genau dafür vorab definiert ist (`10_system.md` 10.7). Eine abgelehnte Änderung zählt nicht. Tatsachenkorrekturen (falsche Zahl, falscher Straßenname, Tippfehler) zählen nie, weil sie Fehler des Teams sind; das Team setzt dafür `zaehltAlsRunde` falsch mit Grund "Tatsache" (Ergänzung an Schritt 15, 5.5). Wer seine Pins einordnet, bleibt der Makler; das Team ordnet nie um (Schritt 15). Zwei Runden sind inklusive (R8 5).

**Wer entscheidet.** Die Entscheidung über eine Änderung fällt in Schritt 15 bei der Auswertung: im Spielraum das Team, außerhalb der CD mit Grund am Vertrag (`aenderungen[].entscheidung`, `cd`, `grund`). Schritt 16 trifft sie nicht noch einmal, sondern setzt um, führt sie als Version und zeigt dem Makler das Ergebnis.

**Die dritte Runde.** Schon im Reveal, im Kopf der Rückmeldung und vor dem Absenden von Runde 2 steht: "Zwei Runden sind enthalten. Nach dieser ist eine weitere Runde möglich und kostet [Preis]." Der Preis kommt aus dem Katalog in den Einstellungen. Steht dort keiner (heute offen, PLAN.md offene Frage 13), ist die dritte Runde für das Team gesperrt mit dem Hinweis "Preis fehlt". Die Werkbank zeigt nie "Kosten nach Vereinbarung".

**Wohin eine Änderung geht.** Jeder Eintrag in `aenderungen[]` aus Schritt 15 hat Zielschritt, Feld und Entscheidung. Schritt 16 führt ihn bis zu einem Ende:

| Art | Beispiel | Wer setzt um | Regel | Zählt als Runde |
|---|---|---|---|---|
| Wert im `system.spielraum` | "Der Amber-Ton darf zurückhaltender sein." | Team über `hmSystemSpielraumSetzen` (Schritt 10) | Übersetzungstabelle aus Schritt 10, Kontrast, Graustufen, Stresstest neu | nein |
| Wert außerhalb des Spielraums, umgesetzt | "Lieber eine andere Schrift." | Designer in Schritt 10 nach Entscheidung des CD in Schritt 15 | Umsetzung nur, wenn der Vertrag weiter getroffen wird; Stresstest und Gate-2-Prüfung neu | ja |
| Wert außerhalb des Spielraums, abgelehnt | "Die Telefonnummer gehört auf die Vorderseite der Karte." | niemand | Antwort in einem Satz am Kriterium des Vertrags | nein |
| Satz in Caption, Bio oder Website | "Der Satz in der Bio klingt mir zu glatt." | Redaktion in Schritt 14 (`markenbuch.redaktion`) | Sprachprüfung, Anrede, Lautlese-Test; im Spielraum, wenn die Stimmregeln aus Schritt 8 halten (`15_reveal.md` Zuordnungstabelle) | nein im Spielraum, sonst ja |
| Seriennamen | Wahl zwischen den zwei Namen | Regel überträgt `rueckmeldung.serienname` (3.3.1) | keine Gestaltung nötig | nein |
| Tatsache | "Es waren 13 Abschlüsse." | Team korrigiert Beleg und Quelle | Prüfstatus neu | nein |
| Richtung | "Eigentlich möchte ich über Herkunft sprechen." | zurück an den CD, Gate 1 aus Schritt 6 | ist keine Runde, sondern eine neue Richtung; Termin und Preis außerhalb dieses Schritts (Lücke beim Owner) | nein, eigener Vorgang |

Jede Änderung endet mit Status `umgesetzt` oder `nicht umgesetzt` und einem Satz, der sich auf ein Kriterium des Markenvertrags bezieht, etwa: "Nicht umgesetzt, weil eine zweite Akzentfarbe das Attribut Ruhig bricht." Das folgt Greever (drei Fragen je Entscheidung, Sekundärquelle in R8 2.3) und G5 "Maßstab vor Entwurf". Ist der Makler mit einer Ablehnung nicht einverstanden, öffnet er in der Freigabe-Ansicht mit "Noch etwas ändern" die nächste Rückmeldung; wird die Änderung dann umgesetzt, zählt diese Runde.

### 3.5 Freigabe 2: was der Makler sieht und tut

**Ort.** Eine Ansicht im selben Link wie Rückmeldung und Wort-Link, am Telefon zuerst. Gesetzt in UNIO-Oberfläche, nicht in seiner Marke, weil sie ein Arbeitsschritt ist; seine Marke erscheint darin nur in Anwendung.

**Aufbau** (Reihenfolge fest, keine Eyebrows, Überschrift zuerst, darunter Text):

1. Überschrift "Ihre Marke zur Freigabe" und darunter eine Zeile: Version, Datum, Dauer ("Etwa acht Minuten.").
2. **Was sich seit dem Reveal geändert hat.** Nur die geänderten Stellen, je vorher und nachher in Anwendung (Kachel, Karte), mit der Antwort des Teams. Unverändertes wird nicht noch einmal gezeigt.
3. **Was wir nicht geändert haben, und warum.** Jede abgelehnte Änderung mit dem Satz am Kriterium des Vertrags, dazu die Stelle in Anwendung. Fehlt dieser Teil, fühlt sich eine Ablehnung wie Überhören an (Ableitung aus R8 Prinzip 6).
4. **Ihre Fragen und unsere Antworten.** Jede Frage aus den Pins mit Antwort.
5. **Was Sie freigeben.** Eine Liste in Satzschreibung: Claim, Wortmarke und Zeichen, Farben und Schrift, Porträtregel, Serie mit Namen, die zwölf Beiträge der ersten vier Wochen, Website, Karte, Signatur, Schild. Jede Zeile öffnet die Anwendung. Wo eine Zahl noch ohne Unterlage ist, zeigt die Zeile beide Fassungen nebeneinander, die mit Zahl und die ohne (3.3.1), mit einem Satz: "Bis die Unterlage da ist, erscheint die Fassung rechts."
6. **Was ab der Freigabe gilt.** Zwei Sätze: "Ab der Freigabe ändert sich nichts mehr von selbst. Jede Änderung wird eine neue Version, die Sie wieder freigeben."
7. **Runden.** "Sie haben [n] von 2 Runden genutzt." Nach der zweiten genutzten Runde zusätzlich der Preis der dritten.
8. **Die Frage:** "Ist das Ihre Marke, so wie sie ab Ihrem Live-Tag überall erscheint?" mit [Freigeben] und [Noch etwas ändern]. Kein Datum in der Frage, weil der Tag erst in Punkt 9 feststeht. Das Zweite öffnet die nächste Rückmeldung in Schritt 15 (nur die Kriterien, die "teilweise" oder "nicht" waren, und die geänderten Stellen, wie Schritt 15 für Runde 2 festlegt), solange eine Runde enthalten ist.
9. Erst nach "Freigeben": **Ihr Start.** `hmRolloutPlan` rechnet ab dem Tag der Freigabe neu und vergleicht mit `auftrag.termine` aus Schritt 1.
   - **Der geplante Tag hält** (alle Abstände aus 3.2, kein Termin an einem Feiertag, keine Runde hat verschoben): eine Zeile mit Drehtag, Übergabe, Umfeld-Tag und Live-Tag wie geplant, darunter [Stimmt so] und [Passt nicht mehr]. Keine Wahl.
   - **Er hält nicht** oder eine Runde hat den Plan verschoben: zwei Pläne, A als "Unsere Empfehlung" mit zwei Sätzen Grund (der früheste Tag, der hält), B der nächste mögliche Rhythmustag, bei gültiger Reserve aus `auftrag.termine.liveTag.reserve` genau dieser. Darunter [Keiner passt].
   - **[Passt nicht mehr] und [Keiner passt]** erzeugen keinen dritten Plan. Sie setzen `rollout.plan.status` auf "anruf", das Team ruft binnen eines Werktags an (Setzung) und trägt den im Gespräch gefundenen Tag ein, den die Regel prüft. Die Freigabe selbst bleibt gültig.
   Darunter zwei vorbelegte Zeilen zum Bestätigen: wer die Marke vorab sieht (Rollen) und was mit den bisherigen Beiträgen geschieht. Beides mit "Stimmt so" oder "Ändern".
10. Abschluss: "Danke. Wir sehen uns am [Drehtag]." Die Seite für den Drehtag hat er seit dem Absenden der Rückmeldung (3.6); geänderte Sätze stehen dort ab jetzt als "neu".

Die Planbestätigung kommt bewusst nach der Freigabe: Wer die Marke noch nicht angenommen hat, soll nicht über Termine nachdenken, und ein Termin darf kein Grund sein, eine Marke durchzuwinken (Ableitung). Darum nennt auch die Frage in Punkt 8 kein Datum.

**Übergangsweg ohne Server-Datenhaltung.** Die Werkbank speichert heute im Browser des Teams (`wb-store.jsx`); eine Ansicht auf dem Telefon des Maklers kann nicht in `hmStore` zurückschreiben. Bis Supabase (FAHRPLAN) gilt:

1. `hmFreigabeDatei(mid)` erzeugt die Freigabe-Ansicht als eigenständige HTML-Datei aus dem Arbeitsstand, nur mit den Feldern, die er ohnehin sieht. Das Team schickt sie ihm auf demselben Weg wie Fragebogen und Wort-Link.
2. Tippt er [Freigeben] und bestätigt Start, Umfeld und Altbestand, zeigt die Datei einen **Freigabe-Code** aus acht Zeichen: vier Zeichen aus der Prüfsumme des gezeigten Stands (kanonisch wie 3.3.2, über den Arbeitsstand), ein Zeichen für die Antworten (Start bestätigt, Plan A, Plan B oder Anruf; Umfeld und Altbestand "Stimmt so" oder "Ändern"), drei Zeichen Prüfziffer. Der Code ist kein Passwort und öffnet nichts; er belegt nur, welchen Stand er mit welchen Antworten freigegeben hat.
3. Er schickt den Code dem Team zurück, per Nachricht oder am Telefon vorgelesen. Das Team trägt ihn in `FreigabeAnsicht` (Team-Modus) ein. `hmFreigabeCodeLesen` prüft die Prüfziffer und vergleicht die vier Zeichen mit dem aktuellen Stand. Passt der Stand nicht (etwa weil das Team inzwischen etwas geändert hat), friert nichts ein, und er bekommt eine neue Datei. So kann nie ein anderer Stand eingefroren werden als der, den er gesehen hat.
4. Ausweg ohne Datei: Freigabe in einem kurzen Video- oder Telefongespräch, die Ansicht am Team-Gerät geteilt, der Makler sagt "Ich gebe frei", das Team klickt in seinem Beisein. `freigegebenVon.makler.weg` ist dann "teamgeraet" mit `protokoll` (wer vom Team, Uhrzeit, Kanal des Gesprächs), keine Aufnahme.
5. Mit der Server-Datenhaltung wird daraus ein Link, der direkt schreibt (`weg`: "link"); Code und Team-Gerät entfallen dann als Regelweg.

Folge für E3 und P4: `freigegebenVon.makler` enthält `{id, am, weg, standPruefsumme}` und bei `weg` "code" den Code, bei "teamgeraet" das Protokoll. `am` ist der Zeitpunkt der Eintragung, `gezeigtAm` der Erzeugungszeitpunkt der Datei. P4 verlangt, dass `standPruefsumme` mit dem eingefrorenen Stand übereinstimmt.

### 3.6 Drehtag

**Zweck.** Alle Reels der ersten vier Wochen und die Standbilder für Lückenkacheln an einem Tag. Der Porträt-Termin aus Schritt 11 liefert nur Standbilder und höchstens drei B-Roll-Clips (11_bild 3.7); der volle Drehtag gehört hierher, weil erst jetzt Serien, Captions und Titelbilder feststehen (00_ZERLEGUNG Kapitel 6, "Fotos vor dem Reveal").

**Clip-Liste.** `hmDrehtagClips(mid)` bindet `fotobrief.clips` (Bedarf je Formattyp mit Bildaufbau, Schritt 11) an jede Kachel mit `format` Reel aus `feed.kacheln` (Schritt 13). Je Clip: Kachel, Serie, Folge, Ort aus `fotobrief.orte`, Titelbild nach der Vorlage der Serie (Schritt 12, Titel in der sicheren Zone x 65 bis 1015, y 269 bis 1248 laut R6 R7), gesprochene Sätze aus `feed.kacheln[].skript` (Schritt 13), Dauer, B-Roll. Wirkt in einem Skript eine Zahl aus `quelle.gesperrt`, stehen zwei Fassungen auf der Liste. Die Liste ist vollständig, wenn jedes Reel alle drei Teile hat (E7). Standbilder: jede Lücke aus `bild.luecken`, die nach Schritt 13 noch offen ist.

**Makler-Seite.** Aus `fotobrief.maklerSeite` (Schritt 11) mit den Sätzen aus der Clip-Liste: wann, wo mit Treffpunkt, was er anzieht, wie lange, welche Sätze er sagen wird, was er nicht tun muss ("Sie müssen nichts auswendig lernen. Wir lesen Ihnen jeden Satz vor."). Versprochen sind drei Werktage Vorlauf (Setzung). Weil der Drehtag bei Freigabe plus 2 WT liegt, entsteht die Seite nicht mit der Freigabe, sondern mit dem Absenden der Rückmeldung, im Stand des Reveals (1.0) und oben gekennzeichnet "Stand Reveal. Ändert sich ein Satz, sehen Sie ihn hier als neu." Die Sätze stammen aus `feed.kacheln[].skript` in dem Stand, den Schritt 14 gebunden hat. Eine Runde ändert selten einen gesprochenen Satz; tut sie es, schiebt die Regel mit der Freigabe genau diesen Satz nach, markiert als "neu", und zeigt vorher und nachher. Wirkt eine gesperrte Zahl, stehen beide Fassungen darauf. So hält der Vorlauf, ohne dass vor der Freigabe gedreht wird. Nach dem Drehtag sortiert das Team in zwei Durchgängen (Schritt 11), jede Datei bekommt ihren Platz in `rollout.drehtag.clips[].datei`.

**Füllung ist keine Änderung.** Ein Clip füllt einen Platz, den die Quelle definiert. Der Art Director prüft ihn gegen `bild.regeln` (Linie, Licht, Ausschnitt), der Prüfer aus Schritt 13 prüft Grammatik und Textgrößen erneut. Die Quelle bleibt unverändert.

### 3.7 Übergabe: die Ansicht und der Termin

**Der Termin.** 40 Minuten (Setzung), wenn möglich im Büro des Maklers, sonst per Video. Geführt vom Team, das den Workshop geführt hat (R1 2.5, Pentagram: wer macht, spricht mit dem Kunden). Die Ansicht läuft im Vollbild ohne Bedienelemente, auf einem Bildschirm und auf einem Telefon des Teams, das ihm für Tafel 1 in die Hand gegeben wird. Auf dem Tisch liegt die erste Schachtel seiner gedruckten Karten, noch geschlossen. Im Termin gibt es keine Freigabe, keinen Klick und keine Verwaltung. Er schaut, hält, fragt.

**Die Ansicht ist in seiner Marke gesetzt.** Schrift, Farben, Raster und Wortmarke kommen aus `quelle.inhalt.system.tokens`. Sie ist das erste Artefakt, das ganz ihm gehört. UNIO erscheint nur im Fuß nach der Regel der Markenarchitektur (offen, R5). Keine Verläufe, kein Glow, keine Konfetti-Animation, keine Icons aus Textzeichen, keine Eyebrows.

**Folge der Tafeln** (fest; Anwendung vor Zeichen, R8 Prinzip 3). Der Termin läuft vom Profil über die Anwendung und die Karte direkt zum Zeichen. Alles, was Einweisung ist, liegt nach dem Schlussbild unter "Details".

| Nr. | Tafel | Inhalt | Quelle |
|---|---|---|---|
| 1 | Sein Profil am Live-Tag | Überschrift nach der Regel unten, darunter eine Zeile mit Datum und Uhrzeit des Live-Tags. Auf dem Telefon ist die Tafel selbst das Profil in Originalgröße, ohne Geräterahmen: Profilkopf, drei angepinnte Beiträge, darunter der Zustand nach der Entscheidung zum Altbestand | `feed.profilkopf`, `rollout.liveTag`, fertige Dateien, `stimme.eigeneWorte` |
| 2 | Vier Wochen | Wochenregler über Woche 1 bis 4, mit den echten Clips vom Drehtag; jede Kachel öffnet Beitrag und Caption | `feed.wochen`, `rollout.drehtag` |
| 3 | Website | die Seite, wie sie am Live-Tag online geht, am Telefon und am Rechner | Website aus der Quelle |
| 4 | Im Alltag | Signatur in einem echten Mail-Fenster, Schild vor einem seiner Objekte (nur mit Einwilligung "Objektfotos zeigen"), die Karte. An dieser Stelle öffnet er die Schachtel. | Renderer aus Tokens, Druck |
| 5 | Das Ende | sein Zeichen nach seiner eigenen Regel, mit dem Datum des Live-Tags, darunter der Claim. Sonst nichts. | `system.zeichen` mit Datenregel, `botschaften.claim` |

**Details, die zweite Ebene nach dem Schlussbild.** Ein ruhiger Verweis "Details" unter Tafel 5 öffnet eine gewöhnliche Seite in seiner Marke, die er nach dem Termin allein liest. Im Termin zeigt das Team sie nicht, es sagt nur, dass sie da ist.

| Nr. | Teil | Inhalt | Quelle |
|---|---|---|---|
| D1 | Was gilt | der eine Claim, die fünf Attribute des Markenvertrags mit "heißt nicht", Version und Freigabe, wie man eine Änderung beantragt | `markenvertrag`, `quelle`, `freigabe.historie` |
| D2 | Für Ihr Umfeld | wer die Vorschau bekommt, was jede Rolle sieht, die Notizen an Empfehler zum Kopieren | `rollout.umfeld` |
| D3 | Ihr Plan | Umfeld-Tag, Live-Termin mit Ablauf, die vier Wochen mit Tagen, Rückblick; je Termin, was er tut und wie lange | `rollout` |
| D4 | Dateien | das Paket (unten) | `uebergabe.paket` |
| D5 | Ihre ersten vier Wochen freigeben | die zwölf fertigen Beiträge in Folge, je mit Caption und Datum, Freigabe der Folge und Füllungskorrekturen (unten) | `rollout.folge`, fertige Dateien |

**Überschrift von Tafel 1 als Regel.** Die Übergabe hat keinen Satz, der bei allen gleich ist. Die Überschrift ist ein Satz aus `stimme.eigeneWorte` mit `verwendung` "oeffentlich", gesprochen oder geschrieben vom Makler, höchstens zehn Wörter, nicht der Claim (der gehört Tafel 5) und ohne Zahl mit Prüfstatus Selbstauskunft. Claude schlägt drei vor, je mit einem Satz, warum er für "ab jetzt sieht man mich so" trägt; das Team wählt. Regelpfad ohne Claude: der erste Eintrag aus `stimme.stimmgabel`, der diese Bedingungen erfüllt. Gibt es keinen, steht über der Datumszeile nur seine Wortmarke, nie ein Mustersatz. Die Datumszeile ("Ab Dienstag, 24. November, 11 Uhr.") ist Regeltext und folgt `hmAnrede(mid, "makler")` nicht, weil sie keine Anrede enthält. P22 vergleicht Überschrift und Tafel 5 mit den Übergabe-Ansichten aller Makler der Kohorte (Textähnlichkeit unter der Schwelle aus MARKENQUALITAET; gleiche Überschrift bei zwei Maklern ist ein Fehler). Der Name der Ansicht in der UNIO-Oberfläche, etwa in der Linkliste, lautet in der Anrede an den Makler "Ihre Marke steht" oder "Deine Marke steht"; er erscheint nie auf den Tafeln.

**Tafel 5 als Regel, nicht als Vorlage.** Hat das Zeichen eine Datenregel (Schritt 10, 10.4), setzt die Ansicht das Projekt als Datenwert ein: vom Auftakt-Gespräch (`auftrag.termine.auftakt`, K1) bis zum Live-Tag. Hat es keine, steht das Zeichen an seinem festen Platz, und das Datum tritt in der Stufe Kernsatz an die Stelle des Textes. So endet jede Übergabe mit dem Zeichen dieses einen Maklers und nie mit einer Schablone, die bei allen gleich aussieht (Rubrik Spezifität).

**Folge-Freigabe und Füllungskorrekturen (D5).** Die zwölf Beiträge sieht er im Termin in Tafel 2 als Erlebnis, freigegeben werden sie danach, allein und ohne Zeitdruck im Raum. Ein Termin mit Klick unmittelbar vor dem Schlussbild wäre genau das Durchwinken, das 3.5 ausschließt.
- **Wo:** in D5, je Beitrag [Passt] oder ein Pin mit einem Satz, am Ende [Folge freigeben]. Bis zur Server-Datenhaltung derselbe Weg wie bei Freigabe 2: Code aus der Datei oder Gespräch am Team-Gerät (3.5).
- **Bis wann:** Woche 1 bis zum Vortag des Live-Tags, 12 Uhr, damit `hmLiveTagBereit` am Nachmittag verbindlich prüfen kann. Wochen 2 bis 4 je bis 2 WT vor dem Beitrag. Fehlt die Freigabe für Woche 1, ist das ein Blocker und der Live-Tag rückt nach der Regel (3.9), nie wird still veröffentlicht. Für spätere Wochen ruht nur der betroffene Beitrag.
- **Was eine Füllungskorrektur ist:** anderer Take, anderer Ausschnitt innerhalb von `bild.regeln`, anderes Standbild, Tippfehler, ein falscher Ort in der Caption. Der Art Director setzt sie um, binnen eines Werktags (Setzung), der Prüfer aus Schritt 13 läuft neu, das Ergebnis steht in `rollout.folge.korrekturen[]` mit Beitrag, Satz des Maklers, Umsetzung und Datum. Eine Füllungskorrektur zählt nie als Runde und ändert die Quelle nicht.
- **Was keine ist:** ein anderer Satz in Caption oder Skript über einen Tippfehler hinaus, eine andere Serie, eine andere Farbe. Das ist ein Änderungsantrag nach 3.3.5 (kleine Version, CD zeichnet ab, er bestätigt), der Beitrag ruht bis dahin, die Folge rechnet der Prüfer aus Schritt 13 neu.

**Das Paket (D4).** `hmUebergabePaket(mid)` erzeugt aus der Quelle: `tokens.json` (DTCG 2025.10) und `brand.css`; Wortmarke liegend, gestapelt und Monogramm als SVG (Schrift in Pfaden) und PNG; Zeichen als SVG; **die Vorlagen aus Schritt 12** als `vorlagen.json` (je Vorlage Serie, Format, Seiten, Felder mit Sperrstufe, Token, Wortgrenze und Mindestgröße, genau wie `vorlagen[]`) und je Vorlage ein Vorlagenblatt als PDF: eine echte Kachel aus `feed.kacheln` dieser Serie, darüber die Felder benannt und nach Sperrstufe markiert (fest, stil, rahmen, variante), damit Assistenz, Grafiker oder Druckerei sehen, was offen ist und was nie; Signatur als HTML; Druckdaten Karte und Schild; das Markenbuch je Rolle aus Schritt 14 (Makler, Assistenz, Fotograf, Druckerei, Web, Seite für Eilige); den Fotobrief; die Aufzeichnung des Reveals als Link nur mit Einwilligung "Reveal aufzeichnen" (Schritt 1, D3). Hergestellt werden Beiträge weiter im Renderer der Werkbank aus denselben Vorlagen (Schritt 17); offene Vorlagendateien für fremde Werkzeuge gehören bewusst nicht ins Paket, weil sie eine zweite, unkontrollierte Quelle wären und ein Konto bei einem fremden Werkzeug verlangten. Kein Demo-Objekt, keine Datei ohne Version im Namen. Das Paket ist eine Ansicht der Quelle und kein zweiter Inhalt.

**Warum ein Termin und kein Link.** Der Höhepunkt am Ende braucht einen Menschen, der ihn führt, und einen Gegenstand, den man anfassen kann (Ableitung aus der Peak-End-Regel, 1.1, und R8 5). Die Karten sind ohnehin zu drucken; sie am Ende der Übergabe zu öffnen, kostet nichts zusätzlich.

**Wie die Ansicht bei ihm bleibt.** Bis zur Server-Datenhaltung erzeugt `hmMarkeStehtDatei(mid)` die Ansicht mit Tafeln und Details als eigenständige HTML-Datei aus der Quelle, nur mit öffentlichen Feldern und seinen eigenen Beiträgen. Das Team schickt sie ihm am Ende des Termins, nicht vorher, damit Tafel 1 im Termin das erste Mal ist. Auf seinem Telefon ist sie dann seine Ansicht; eine neue Version der Quelle erzeugt eine neue Datei mit Version im Namen. Mit der Server-Datenhaltung wird daraus ein Link ohne Ablauf, der immer die aktuelle Quelle zeigt.

### 3.8 Umfeld zuerst

**Wer.** `rollout.umfeld.wer` ist eine Liste von Rollen mit Anzahl, nie von Personen: Mitentscheider aus `auftrag.entscheider`, die nicht beim Reveal waren; Büro und Assistenz aus der Einrichtung; Empfehler-Gruppen aus `antworten.empfehler`, wenn die letzten Aufträge von dort kamen (Notariat, Steuerberatung, Anwaltskanzlei, Hausverwaltung). Höchstens fünf persönliche Notizen an Empfehler (Setzung), damit es persönlich bleibt.

**Was jede Rolle bekommt.**

| Rolle | Inhalt | Warum |
|---|---|---|
| Mitentscheider, Büro | Vorschau der Übergabe-Ansicht, Tafeln 1 bis 5 und D1, ohne D2 bis D5 | sie sollen die Marke verstehen und ihr glauben (Mitchell, HBR 2002) |
| Assistenz | zusätzlich die Seite für Eilige aus Schritt 14 und die Anleitung zur Signatur, aktiv erst ab Live-Tag 8 Uhr (Setzung) | die Assistenz schreibt die meisten Mails; eine neue Signatur vor dem Live-Tag wäre ein stiller Teilstart |
| Empfehler | eine persönliche Notiz, die der Makler selbst schickt, mit dem Live-Tag, einem Satz, was sich nicht ändert, und dem Link zur Website ab dem Live-Tag | wer ihm Fälle gibt, soll es von ihm zuerst hören (Ableitung) |

**Wie.** Der Makler teilt die Vorschau selbst, wie den Fremdbild-Link in Schritt 2. Die Werkbank sendet nichts in seinem Namen und speichert keine Kontaktdaten Dritter. Die Vorschau hat keine Kommentarfunktion: Das Umfeld sieht, es stimmt nicht ab (A5). Findet jemand einen sachlichen Fehler (falsche Telefonnummer), meldet der Makler ihn als Tatsachenkorrektur. Gezählt wird nur, wie oft die Vorschau geöffnet wurde.

**Technik bis zur Server-Datenhaltung.** Die Werkbank speichert heute im Browser (`wb-store.jsx`), ein teilbarer Link braucht die Datenhaltung auf dem Server (FAHRPLAN, Supabase EU). Bis dahin erzeugt `hmUmfeldVorschau(mid)` eine eigenständige HTML-Datei aus der Quelle, nur mit öffentlichen Feldern, die der Makler weiterleitet. Mit der Server-Datenhaltung wird daraus ein Link mit Ablauf am Live-Tag plus sieben Tage (Setzung).

### 3.9 Live-Tag

**Was "kein halbes Raster" hier heißt** (Ableitung aus R6 und R8 4, Punkt 12): Am Live-Tag ist der Profilkopf vollständig neu, und die erste Zeile besteht aus drei neuen Beiträgen. Keine Zeile ist gemischt aus alt und neu, und kein Kanal zeigt die neue Marke, während ein anderer noch die alte zeigt. Ein wöchentlich wachsendes Profil hat mitten in der Woche immer eine angefangene Zeile; das ist Wachstum, kein halber Start.

**Warum die erste Zeile angepinnt wird.** Angepinnte Beiträge bleiben oben und lassen sich beim Umordnen nicht bewegen (Engadget: https://www.engadget.com/2190179/instagram-how-to-reorder-grid/). Werden die drei Beiträge der ersten Woche angepinnt, bleibt die erste Zeile vollständig, während jeder neue Beitrag darunter einsortiert wird (so auch `13_feed.md` H1). Schritt 13 komponiert diese Zeile nach R6 R12 aus Gesicht, Signatur und Beleg. Wird der stärkste Beleg erst nach dem Live-Tag durch eine Unterlage freigeschaltet, darf das Team einen Pin tauschen, wenn der Prüfer aus Schritt 13 danach grün ist; das steht in der Historie. Bis zu drei Beiträge lassen sich oben im Profil anpinnen (Instagram-Hilfe, https://help.instagram.com/318456537074409/; eingeführt 2022, TechCrunch: https://techcrunch.com/2022/06/07/instagram-pin-posts-to-your-profile/). Damit ist die Lücke aus R6 R12 geschlossen: drei Pins füllen genau eine Zeile. In welcher Reihenfolge mehrere Pins erscheinen, sagt die Hilfe nicht, und die gelesenen Quellen belegen es nicht. Arbeitsannahme: Der zuletzt angepinnte Beitrag steht oben links. Darum legt die Regel die Pin-Reihenfolge im Live-Termin so fest, dass zuletzt der Beitrag angepinnt wird, der laut `feed.profilkopf.angepinnt` oben links stehen soll; das Team vergleicht sofort am Gerät mit Tafel 1 und korrigiert durch Lösen und neu Anpinnen. Die beobachtete Reihenfolge schreibt es in `rollout.liveTag.pinReihenfolge` ("zuletzt links" oder "zuerst links"); ab dem zweiten Makler rechnet die Regel mit dem gemessenen Wert.

**Altbestand.** Bestehende Beiträge prüft das Team vorab gegen `markenvertrag.falschWaere`, die Klischee-Liste aus Schritt 12 und die Einwilligungen (fremde Personen oder Häuser erkennbar). Empfehlung nach Regel: Verletzt mehr als ein Drittel der letzten zwölf Beiträge (Setzung) eine dieser Regeln, lautet sie "archivieren", sonst "unter der neuen Zeile lassen". Archiviert wird im Live-Termin in der App des Maklers, nichts wird gelöscht. Archivieren blendet einen Beitrag im Profil aus, Likes und Kommentare bleiben erhalten, auch mehrere auf einmal (Instagram-Hilfe: https://help.instagram.com/136706673552668 und https://help.instagram.com/2336657616493557), und ein archivierter Beitrag lässt sich wieder im Profil zeigen (https://help.instagram.com/1180951146111566). Die Entscheidung ist also umkehrbar. R1 2.6 stützt das Auslaufen statt Vernichten (Mastercard).

**Der Live-Termin.** 30 Minuten (Setzung). Er beginnt zur Uhrzeit aus `serien.rhythmus` der Signatur-Serie, damit der Start im Takt der späteren Folge liegt; `rollout.liveTag.uhrzeit` ist dieser Beginn. Die erste Zeile erscheint in Schritt 5 des Termins, rund 20 Minuten später (Setzung). Der Makler bedient sein Telefon selbst, das Team liest von einer Live-Karte vor. Kein Passwort wechselt den Besitzer (CLAUDE.md, Sicherheit). Reihenfolge:

1. Team: Website live schalten, Aufruf prüfen. Zuerst, damit der Link im Profil funktioniert.
2. Makler: Profilbild, Name, Bio, Link.
3. Makler: Altbestand archivieren, wenn so bestätigt. Vor dem ersten neuen Beitrag, damit nie eine gemischte Zeile sichtbar ist.
4. Makler: drei Stories nach Vorlage veröffentlichen und als Highlights mit Titelbildern sichern (`feed.profilkopf.highlights`).
5. Makler: die drei Beiträge der ersten Woche in der Folge aus `start30` veröffentlichen, Folge 1 zuerst, so dass Folge 3 oben links steht und die Zeile der Probe-Folge aus Schritt 12 entspricht; danach anpinnen in der Reihenfolge, die die Regel aus `feed.profilkopf.angepinnt` und `pinReihenfolge` rechnet (bei "zuletzt links": zuerst den Beitrag für rechts, zuletzt den für links). Team prüft am Gerät gegen Tafel 1.
6. Makler: LinkedIn-Kopfzeile, Info, Titelbild und erster Beitrag aus `feed.linkedin`, wenn LinkedIn im Kanalplan aktiv ist.
7. Makler: Google-Unternehmensprofil mit Foto, Logo und Beschreibung. Ob Änderungen dort eine Prüfung durch Google auslösen und wie lange sie dauert, ist nicht belegt (Lücke); darum früh im Termin, und der Punkt gilt als erledigt, wenn die Änderung eingereicht ist.
8. Team: Bildschirmfoto des Profils als Nachweis, Vergleich mit Tafel 1 der Übergabe, Checkliste schließen. Gespeichert wird nur der Ausschnitt aus Profilkopf und den ersten zwei Zeilen des Rasters, zugeschnitten vor dem Speichern (`hmNachweisZuschnitt`); keine Kommentare, Nachrichten, Benachrichtigungen, Follower-Listen oder Namen Dritter liegen im System. Dasselbe gilt für LinkedIn und das Google-Profil (nur Kopfbereich).

**Bereitschaft.** `hmLiveTagBereit(mid)` läuft täglich ab der Übergabe und am Vortag verbindlich. Blocker sind: ein Beitrag der ersten Zeile ohne fertige Datei, ohne geklärtes Recht, mit einer gesperrten Zahl ohne freigegebene Fassung ohne Zahl oder mit einer fehlenden Quelle (dann setzt die Regel zuerst die `reservefolge` der Serie aus Schritt 12 ein, wenn sie den Prüfer besteht); ein Objektbeitrag ohne Energiekennzahlen (`objektRegel`); eine Pflichtangabe im Impressum leer (`hmWebFelder`, Gruppe Recht); Signatur nicht vorbereitet; Quelle weicht ab. Blocker ist auch eine fehlende Folge-Freigabe für Woche 1 am Vortag um 12 Uhr (3.7, D5). Bei einem Blocker am Vortag verschiebt die Regel den Live-Tag auf den nächsten Tag im Rhythmus der Signatur-Serie, schreibt den Grund in `rollout.liveTag.verschoben` und informiert den Makler in einem Satz. Nie wird mit einer ungeprüften Zahl oder einer Lückenkachel gestartet.

**Option stilles Posten.** Ist stilles Posten nachweislich für alle verfügbar (A8), dürfen die Beiträge der ersten Woche am Vortag still ins Profil gehen. Der Live-Termin schaltet dann nur Kopf, Website und Pins um. Die Regel bleibt dieselbe.

### 3.10 Die ersten vier Wochen und der Rückblick

`rollout.folge` übernimmt `start30` mit echten Tagen:

- **Woche 1: Vorstellung.** Die drei Beiträge der Woche 1 aus `start30`, gemeinsam am Live-Tag. Weicht der Wochentakt aus Schritt 12 für Woche 1 davon ab (die Probe-Folge dort verteilt Woche 1 auf drei Tage), gilt für Woche 1 der Live-Tag, weil nur so die erste Zeile vollständig startet (Abgleich in 5.5).
- **Wochen 2 bis 4: Signatur-Serie im Rhythmus.** Folgen am Tag und zur Uhrzeit aus `serien.rhythmus`, die übrigen Beiträge nach `start30` im Wochentakt aus Schritt 12. Fällt ein Rhythmustag auf einen Tag, an dem der Anlass der Serie nicht stattfindet (etwa ein Feiertag), verschiebt die Regel auf den nächsten Werktag und nennt den Grund.
- **Ein gesperrter Beleg** blockiert nur den Beitrag, der ihn braucht. Das Team darf ihn innerhalb seiner Serie tauschen, wenn der Prüfer aus Schritt 13 danach wieder grün ist; sonst rückt die Folge um eine Woche.
- **Rückblick.** `stichtag` ist der Live-Tag plus 30 Tage: Bis dahin zählen die Zahlen. Der Termin liegt am nächsten Werktag, an dem Makler-Termine stattfinden (nicht vom 24.12. bis 6.1., Setzung für Makler-Termine). Inhalt, 30 Minuten: was erschienen ist gegen `start30`, die ersten Zahlen des Profils aus dem Insights-Import ohne Bewertung gegen Richtwerte (die kommt nach zwölf Wochen in Schritt 17), was der Makler selbst angepasst hat (R1 4.7), offene Unterlagen. Danach übernimmt Schritt 17.

### 3.11 Checkliste

`rollout.checkliste[]` entsteht aus dem Vertrag (Website, Signatur, Karte, Schild, Google-Profil, LinkedIn-Kopf) plus jedem aktiven Kanal aus `kanalplan` und dem Punkt "Umfeld informiert".

| Punkt | Wer | Fällig (relativ) | Pflicht am Live-Tag | Nachweis |
|---|---|---|---|---|
| Instagram-Profil (Kopf, Highlights, erste Zeile, Pins) | Makler im Live-Termin | Live-Tag | ja | Bildschirmfoto |
| Website | Team | Prüfung Vortag, live im Termin | ja | Aufruf, Impressum vollständig |
| Signatur | Assistenz oder Makler | Live-Tag 8 Uhr | ja | Testmail an das Team |
| LinkedIn-Kopf | Makler im Live-Termin | Live-Tag | ja, wenn aktiv | Bildschirmfoto |
| Google-Profil | Makler im Live-Termin | Live-Tag | ja (eingereicht) | Bildschirmfoto |
| Weitere Kanäle aus `kanalplan` | Makler im Live-Termin | Live-Tag | ja, wenn aktiv | Bildschirmfoto |
| Karte | Team, Druckerei | Druckdaten Freigabe plus 1 WT, Lieferung vor der Übergabe | nein, aber vor der Übergabe | Lieferschein |
| Schild | Team | Druckdaten bis Live-Tag | nein; neue Schilder ab der nächsten Vermarktung | Druckfreigabe |
| Umfeld informiert | Makler | Umfeld-Tag | ja | sein Haken |

Jeder Punkt trägt `quelleVersion`. Entsteht später eine neue Version, öffnen sich die betroffenen Punkte wieder (Schritt 17).

### 3.12 Wer was erzeugt

| Ausgang | Regeln | Claude | Team | Makler |
|---|---|---|---|---|
| `quelle` | Zusammenstellen, Sperrprüfung, Hashes, Prüfsumme, Sperren | nichts | CD zeichnet ab | gibt frei |
| `freigabe.historie` | Einträge, Diff je Feld, Rundenzähler | Zusammenfassung in Satzschreibung aus dem Diff | Antworten auf Fragen und Änderungen | Freigabe |
| `uebergabe` | Ansicht aus der Quelle, Paket mit Vorlagen, Tafel 5 nach Zeichenregel, Datei für sein Telefon | drei Vorschläge für die Überschrift von Tafel 1 aus `stimme.eigeneWorte`, je mit Grund | wählt die Überschrift, führt den Termin, notiert Beobachtungen | erlebt den Termin |
| `rollout.umfeld` | Rollen aus Daten, Datum, Vorschau | Entwurf der Empfehler-Notiz in seiner Stimme | prüft die Notiz | bestätigt Rollen, teilt selbst |
| `rollout.drehtag` | Clip-Liste, Zählung, Makler-Seite aus dem Fotobrief im Stand des Reveals, Nachtrag geänderter Sätze | gesprochene Fassung der Sätze aus Caption oder Skript | plant, dreht, sortiert | bestätigt den Start, dreht |
| `rollout.liveTag` | Bereitschaft, Reihenfolge, Uhrzeit, Verschiebung | nichts | Live-Karte, Website, Nachweis | schaltet um |
| `rollout.folge` | Tage, Feiertage, Tausch innerhalb der Serie, Fristen der Folge-Freigabe | nichts | Posting, Füllungskorrekturen | gibt die Folge im Link frei, pinnt Korrekturen |
| `rollout.checkliste` | Punkte, Fälligkeiten, Wiederöffnen | nichts | erledigt | erledigt seine Punkte |

Ohne Claude (Regelpfad): Die Zusammenfassung ist die Diff-Liste in festen Sätzen aus Feldname, altem und neuem Wert ("Akzentfarbe: Chroma von 0,11 auf 0,07."). Die Empfehler-Notiz besteht aus drei Feldern (Datum, `botschaften.einSatz`, Website) und einer sichtbaren Lücke "Ihr persönlicher Satz". Die gesprochenen Sätze sind die Caption der Kachel, gekürzt nur durch das Team. Nie setzt der Regelpfad einen Mustersatz, der nach Marke klingen soll.

### 3.13 Beispiel am Fall Markus Leitner (Döbling, Zinshaus, Figur Kenner, Sie-Form)

**Belegt aus dem Seed** (`wb-store.jsx` Zeile 67, 72, 102 und 103): Kern Sievering zwischen Sieveringer Straße und Agnesgasse, Bezirke Döbling, Währing, Hietzing; Anrede Sie auf allen Kanälen; `cue` "Dienstag nach dem Grundbuch-Termin, 11 Uhr"; Kanäle LinkedIn, Instagram, Facebook, YouTube, TikTok; die Erbengemeinschaft kam über den Notar. Dazu genau ein Wortwechsel zur Form: Daniel schrieb "Zwei Farbwelten stehen zur Wahl, ich habe die dunkle vorausgewählt. Passt das zu Ihrem Büro?" (Nachricht n1), Markus antwortete vollständig: "Ja, dunkel passt. Der Amber-Ton darf etwas zurückhaltender sein." (Nachricht n2, Zeile 103).

**Belegt aus den Nachbarentwürfen** (dort teils selbst Arbeitsannahme, hier nur übernommen): Termine aus dem Beispiel in Schritt 1 (`01_auftakt.md` 3.5 und 3.8, Auftakt-Gespräch dort am Mo 05.10.2026 angenommen): Reveal Do 05.11., 10 Uhr; Rückmeldung ab Fr 06.11., 11 Uhr; Freigabe Di 10.11., Drehtag Do 12.11., Übergabe Do 19.11., Umfeld-Tag Fr 20.11., Live-Tag Di 24.11. (dort 11.30 Uhr, hier 11 Uhr, K1), Reserve Di 01.12., Rückblick Do 07.01.2027 mit Stichtag 24.12., alle aus `hmRolloutPlan`. Belege b1 bis b6 mit Prüfstatus Selbstauskunft (7); Bio Instagram und Kopfzeile LinkedIn (8); Farbwerte und Spielraum aus `10_system.md` 10.5 und 10.9: dunkler Grund #141210, Text #F1EEE7, Akzent auf Dunkel #D29754 (7,38:1), auf Papier #B17834 (3,33:1 als Grafik), Chroma 0,11.

**Wie der Seed hier gelesen wird.** Beide Sätze aus n2 stammen aus v1, vom September, vor dem v2-Prozess, und beide sind in den Vorgängern schon verarbeitet: Den zweiten hat Schritt 10 in den Grundwert übersetzt (Chroma 0,15 auf 0,11, 10.5), den ersten hat Schritt 9 zur Achse des Gegenentwurfs gemacht (Papier gegen dunklen Grund), und Schritt 15 zitiert ihn im Reveal. Welche Fassung er in v2 wählt, steht in keinem Seed (Lücke). **Arbeitsannahme für dieses Beispiel:** Er wählt den Gegenentwurf Dunkel, weil sein einziger eigener Satz zur Form "Ja, dunkel passt." lautet. Eine Wahl der Empfehlung Papier wäre gegen diesen Satz nur zu begründen, wenn der Reveal ihn umstimmt; das zu unterstellen, hieße, ihm ein Urteil zu erfinden. Das Beispiel zeigt so zugleich den anspruchsvolleren Weg, bei dem die Variante getauscht wird (3.3.2, Schritt 1).

**Übernommen aus den Nachbarschritten** (dort Annahme oder Arbeitswert): Claim "Zeit ist Teil des Preises." (8). Idee "Neben jedem Preis steht seine Zeit.", Zeichen *Das Zeitmaß* als Punkt (Stand) oder Spanne (Dauer), Empfehlung auf Papier, Gegenentwurf auf dunklem Grund mit neun dunklen und drei hellen Kacheln, Achse Tonwert (9, 10.9, 15). Kriterien der Rückmeldung: die Attribute Genau, Ruhig, Aufrichtig, Diskret, Aus Sievering und als sechstes "Was falsch wäre" (7, 15). Signatur-Serie mit den Namen "Zeitwert" (Empfehlung) und "Nach dem Grundbuch", Rhythmus Dienstag 11 Uhr nach dem Termin (Seed `cue`), Wochentakt Dienstag Zeitwert, Donnerstag Gesicht, Samstag Sache, Probe-Folge mit fünf Reels (12, 3.15). Erste Zeile aus drei angepinnten Beiträgen (13).

**Widerspruch in den Vorgängern, hier aufgelöst.** Die Beispiele in Schritt 13 und 15 nennen die Signatur-Serie "Noch nicht verkaufen", weil Schritt 12 bei ihrer Entstehung nicht vorlag; Schritt 12 empfiehlt "Zeitwert". Der Name gehört Schritt 12. Schritt 15 rechnet den Amber-Pin noch von 0,15 auf 0,11 (#CB914E); Schritt 10 hat diesen Schritt schon im Grundwert vollzogen und legt für ein weiteres "zurückhaltender" 0,11 auf 0,07 fest. Die Werte gehören Schritt 10, also rechnet dieses Beispiel mit 10.5. Beides steht als Korrekturbedarf in 5.5 (K4, K6, K11).

**Lücken:** Wahl der Fassung in v2 (oben), `auftrag.entscheider`, Büro und Assistenz, `vorab.auftrittHeute` (letzte zwölf Kacheln), Pflichtangaben im Impressum (GISA-Zahl, Behörde, Firmenwortlaut, Haftpflicht), Preis der dritten Runde, Druckerei und Lieferzeit, Schildmaß, Instagram-Benutzername, Marktquelle für "Stand Sievering", Ort für "Alteingesessen 01", eigenes Objekt mit Energiekennzahlen für "Warum jetzt 01", Ausgangswert und Verkaufspreis hinter b1, Wert von `einstellungen.anredeMakler` (bis dahin Sie nach seiner Website).

**Rückmeldung (Schritt 15), Fr 06.11.2026** (Arbeitsannahme zur Mechanik). Genau, Aufrichtig, Diskret, Aus Sievering: trifft. Ruhig: teilweise, Stelle Karte. Was falsch wäre: nein. Fremdtest am Vortag für Dunkel "erkannt". Wahl: Gegenentwurf Dunkel. Serienname: Zeitwert, die Empfehlung. Pins:

| Pin | Art | Entscheidung in Schritt 15 | In Schritt 16 | Zählt |
|---|---|---|---|---|
| "Auf der Karte darf der Amber-Ton noch etwas zurückhaltender sein." Arbeitsannahme: Auf dunklem Grund tritt das Zeitmaß kräftiger hervor (10.9), und er wiederholt seinen Wunsch vom September; der Wortlaut ist an n2 angelehnt und nicht belegt | Änderung, im Spielraum | Team: umsetzen | 16.1 setzt um | nein |
| "Die Telefonnummer gehört auf die Vorderseite der Karte." | Änderung, außerhalb | CD: nicht umsetzen, Grund am Vertrag (Mechanik-Beispiel aus `15_reveal.md` 3.11) | Antwort in der Freigabe-Ansicht | nein |
| "Wer fotografiert später meine Objekte?" | Frage | Antwort aus dem Fotobrief (Mechanik-Beispiel) | Antwort in der Freigabe-Ansicht | nie |

`rueckmeldung.runde` ist 1, keine Änderung hat `zaehltAlsRunde` wahr, also bleibt `freigabe.runden.genutzt` bei 0.

**16.0 Makler-Seite, Fr 06.11., mit dem Absenden der Rückmeldung.** Drehtag Do 12.11., Vormittag, Büro 1190 (Arbeitsannahme bis Schritt 11), dunkles Sakko ohne Muster nach `fotobrief.garderobe` (Arbeitsannahme), Dauer 3,5 Stunden, die Sätze der fünf Reels im Stand 1.0, oben "Stand Reveal". Bis zum Drehtag liegen drei volle Werktage dazwischen.

**Unterlagen** (Arbeitsannahme zur Mechanik, gestützt auf die Aufgabe aus Schritt 14 mit Frist Mo 02.11.): Der Kaufvertrag zum Zinshaus in Sievering (b2, "4,2 Mio., 11 Wochen") und die Unterlage zur Anlegerwohnung in Währing (b3, "Plus 8 Prozent") liegen bis Mo 09.11. vor und werden geprüft. Für b1 ("600.000 mehr nach zwei Jahren") fehlen Ausgangswert und Verkaufspreis weiter. So zeigt das Beispiel beide Wege aus 3.3.1.

**16.1 Umsetzung, Mo 09.11.** Variante: `system.gegenentwurf` und `feed.gegenentwurf` werden zu `system` und `feed`, die Empfehlung Papier geht in die Historie. Amber: Das Team setzt nach der Übersetzungstabelle aus Schritt 10 das Chroma des Akzents von 0,11 auf 0,07 (OKLCH). Die Regel leitet beide Helligkeiten neu ab (10.5): auf dem dunklen Grund #D29754 auf #C29D75, 7,45:1 gegen #141210; in den drei hellen Kacheln des Gegentons #B17834 auf #A17D56, 3,34:1 gegen Papier als Grafik. Beide Werte liegen im Spielraum 0,07 bis 0,15, das Etikett über dem Zeitmaß bleibt in Textfarbe #F1EEE7, Graustufen und Stresstest grün. Ein weiteres "zurückhaltender" läge unter 0,07 und wäre eine Änderung außerhalb des Spielraums. Serienname: "Zeitwert" wird in Kennungen ("Zeitwert 01"), Staffelplakat und Captions übertragen. b2 und b3: Prüfstatus "Unterlage geprüft". b1 wirkt an drei Stellen und bekommt je eine Fassung ohne Zahl: Im Pilot "Zeitwert 01" (Folge 2, erste Zeile) spricht er über die Erbengemeinschaft ohne den Betrag, der Satz mit b2 bleibt; "Zeitwert 04, Zwei Jahre" (Folge 10), deren Inhalt die Zahl ist, bekommt als Tauschfolge "Zeitwert 05, Wenn Miterben verschieden schnell sind" aus dem Themenvorrat (Wissensfolge ohne eigene Zahl); der LinkedIn-Beitrag mit b1 tauscht mit einem der beiden anderen aus `feed.linkedin`. Antworten, Wortlaut Entwurf des Teams: zur Telefonnummer "Nicht umgesetzt. Auf der Vorderseite stehen nur Ihr Name und das Zeitmaß, wie auf jeder Fläche Ihrer Marke ein Motiv mit viel Raum (Ruhig). Die Nummer steht auf der Rückseite in der ersten Zeile." (Platz auf der Rückseite Arbeitsannahme bis Schritt 10); zur Frage "Ihr erstes Objekt fotografieren wir nach demselben Brief wie Ihre Porträts. Bis dahin erscheint kein Objektbeitrag." (Arbeitsannahme bis Schritt 11). Stand 1.1.

**16.2 CD, Mo 09.11.** `hmGate2Pruefen` auf Stand 1.1 in der Variante Dunkel: Schwellen bestanden, Lautlese-Test für die zwei neuen Sprechfassungen, Fremdtest der gewählten Fassung "erkannt", keine öffentliche Zahl nur vermerkt. Der CD prüft Karte vorn dunkel und Signatur in der neuen Farbe, den Wandtest des Akzents auf seinem Porträt und die Tauschfolge in der Rasterfolge und zeichnet ab.

**16.3 Freigabe-Ansicht, Di 10.11.** Textstand (Auszug, Anrede über `hmAnrede(mid, "makler")`, bei Markus Sie):

```text
Ihre Marke zur Freigabe
Version 1.1 vom 9. November 2026. Etwa acht Minuten.

Was sich seit dem Reveal geändert hat
Ihre Fassung ist die auf dunklem Grund, wie Sie gewählt haben.
Der Amber-Ton ist noch etwas zurückhaltender, wie Sie es sich
gewünscht haben.
[Karte und Kachel, vorher und nachher]
Die Farbe begleitet weiter nur. Ihre Marke bleibt auch in Schwarz und Weiß
erkennbar.

Was wir nicht geändert haben
Die Telefonnummer bleibt auf der Rückseite, in der ersten Zeile.
Auf der Vorderseite stehen nur Ihr Name und das Zeitmaß, wie auf jeder
Fläche Ihrer Marke: ein Motiv mit viel Raum. Das ist Ruhig aus Ihrem Vertrag.
[Vorder- und Rückseite]

Ihre Frage
Wer fotografiert später meine Objekte?
Ihr erstes Objekt fotografieren wir nach demselben Brief wie Ihre Porträts.
Bis dahin erscheint kein Objektbeitrag.

Was Sie freigeben
Ihr Satz: Zeit ist Teil des Preises.
Ihre Wortmarke und Ihr Zeitmaß.
Ihre Farben und Ihre Schrift, auf dunklem Grund.
Ihre Sendung: Zeitwert, jeden Dienstag.
Ihre ersten zwölf Beiträge, Ihre Website, Ihre Karte, Ihre Signatur,
Ihr Schild.

Eine Zahl in zwei Fassungen
600.000 mehr nach zwei Jahren. Dafür brauchen wir Ausgangswert und
Verkaufspreis bis 27. November.
[Zeitwert 01 mit der Zahl]            [Zeitwert 01 ohne die Zahl]
Bis die Unterlage da ist, erscheint die Fassung rechts. Statt Zwei Jahre
läuft dann in der vierten Woche eine andere Folge.

Ab der Freigabe ändert sich nichts mehr von selbst. Jede Änderung wird
eine neue Version, die Sie wieder freigeben.

Sie haben 0 von 2 Runden genutzt. Der ruhigere Farbton lag in dem
Rahmen, den wir vorab festgelegt haben.

Ist das Ihre Marke, so wie sie ab Ihrem Live-Tag überall erscheint?
[ Freigeben ]   Noch etwas ändern
```

Nach "Freigeben":

```text
Ihr Start
Es bleibt bei Ihrem Plan.
Drehtag: Donnerstag, 12. November, Vormittag.
Übergabe: Donnerstag, 19. November.
Ihr Umfeld sieht die Marke ab Freitag, 20. November.
Live-Tag: Dienstag, 24. November, 11 Uhr, nach Ihrem Grundbuch-Termin.
[ Stimmt so ]   Passt nicht mehr

Vorab sehen Ihre Marke: Ihr Büro. Notariate, über die Ihre Fälle kamen.
[ Stimmt so ]   Ändern

Ihre bisherigen Beiträge auf Instagram: am Live-Tag archivieren.
Wir empfehlen das. Sie lassen sich jederzeit wieder zeigen.
[ Stimmt so ]   Ändern
```

Die Planzeile ist eine Bestätigung, keine Wahl, weil der Plan hält. Rechnung (`hmRolloutPlan` ab Freigabe Di 10.11.): Drehtag nach 2 WT (Mi 11., Do 12.); Produktion 4 WT (Fr 13., Mo 16., Di 17., Mi 18.); Übergabe am nächsten WT, Do 19.11.; Umfeld-Tag Fr 20.11.; Live-Tag frühestens 2 WT nach dem Umfeld-Tag (Mo 23., Di 24.) und am Rhythmustag der Serie: Di 24.11., gleich `auftrag.termine.liveTag`. Woche 4 vom 15. bis 21.12., Rückblick mit Stichtag Do 24.12. und Termin Do 07.01.2027. Karte: Druckdaten Mi 11.11., Lieferung nach 5 WT (Setzung, Lücke Druckerei) am Mi 18.11., also vor der Übergabe.

Probe für Q2: Hätte Runde 1 eine Änderung außerhalb des Spielraums umgesetzt, läge die Freigabe frühestens am Do 12.11.; dann ergibt die Regel Drehtag Mo 16.11., Übergabe Mo 23.11., Umfeld-Tag Di 24.11. und Live-Tag frühestens Di 01.12. Der geplante 24.11. hält nicht, und die Ansicht zeigt zwei Pläne: A Di 01.12., gleich der Reserve aus Schritt 1, B Di 15.12., weil Di 08.12. ein Feiertag ist, dazu [Keiner passt].

Die Ansicht endet mit dem Freigabe-Code, im Beispiel `7QK2 H4TX` (erfunden, nur zur Form). Markus schickt ihn dem Team per Nachricht; das Team trägt ihn um 16.20 Uhr ein, die vier Zeichen stimmen mit der Prüfsumme von Stand 1.1 überein.

**16.4 Einfrieren, Di 10.11., 16.20 Uhr.** Auszug (Pfade in `wirkt` nach `folgeNr`):

```json
{
  "version": "1.1",
  "status": "freigegeben",
  "eingefrorenAm": "2026-11-10T16:20:00+01:00",
  "freigegebenVon": {
    "makler": { "id": "markus", "am": "2026-11-10T16:20:00+01:00", "gezeigtAm": "2026-11-10T09:05:00+01:00",
                "weg": "code", "code": "7QK2H4TX", "standPruefsumme": "sha256:7qk2<60 Hex-Zeichen>" },
    "cd": { "rolle": "creative-director", "am": "2026-11-09T17:05:00+01:00", "gate2Version": "1.0", "geprueft": ["variante.gegenentwurf", "system.farbe.akzent", "kontrast", "graustufen", "stresstest", "feed.tausch.10"] }
  },
  "variante": "gegenentwurf",
  "vorgaenger": "1.0",
  "inhalt": { "plattform": {}, "system": {}, "bild": {}, "social": {}, "feed": {} },
  "blobs": [{ "key": "k:portraet-sievering-01", "sha256": "<64 Hex-Zeichen>" }],
  "gesperrt": [
    { "pfad": "plattform.beweise.b1", "grund": "Unterlage fehlt: Ausgangswert und Verkaufspreis", "frist": "2026-11-27",
      "wirkt": ["feed.kacheln.2.skript", "feed.kacheln.10", "feed.linkedin.0"],
      "oeffentlich": ["feed.kacheln.2.skriptOhneZahl", "feed.tausch.10", "feed.linkedin.1"] }
  ],
  "pruefsumme": "sha256:<64 Hex-Zeichen>"
}
```

Die Inhalte sind im Auszug leer gelassen. Frist 27.11., Code, Uhrzeiten und die Wahl des Ersatzes auf LinkedIn sind Arbeitsannahmen. `standPruefsumme` ist die Prüfsumme des Arbeitsstands, den er gesehen hat; nach dem Einfrieren wird die Prüfsumme der Quelle über denselben Inhalt mit Status und Signaturen gerechnet.

**16.5 Nachtrag auf der Makler-Seite, Di 10.11.** Im Pilot entfällt der Satz mit dem Betrag, markiert als "neu"; zu lernen ist nichts, weil nur ein Satz wegfällt. Die Tauschfolge Zeitwert 05 ist neu; ihre Sätze liest das Team am Drehtag vor, wie die Seite verspricht.

**16.6 Drehtag, Do 12.11.** Clip-Liste aus den fünf Reels der Probe-Folge in Schritt 12 und den Skripten aus Schritt 13:

| Folge | Woche | Serie, Folge | Ort (Fotobrief) | Titelbild | Gesprochen (`skript`) | B-Roll |
|---|---|---|---|---|---|---|
| 2 | 1 | Zeitwert 01, Pilot | Büro 1190, Besprechungstisch (Arbeitsannahme) | sitzend, frontal, Augenlinie nach `bild.regeln`, Etikett der Dauer über dem Zeitmaß (Bildaufbau aus 12) | zwei Fassungen: mit b1 und b2, ohne b1 | Hände, anonymisierte Unterlage |
| 4 | 2 | Zeitwert 02, Eine Woche | wie Folge 2 | Etikett "Eine Woche" | Wissensfolge ohne eigene Zahl | keine |
| 7 | 3 | Zeitwert 03, Elf Wochen | wie Folge 2 | Etikett "Elf Wochen" | b2, geprüft | Eingang in Sievering ohne Hausnummer |
| 8 | 3 | Alteingesessen 01 | Lücke (Ort offen in Schritt 12) | sitzend am Ort | Lücke | der Ort |
| 10 | 4 | Zeitwert 04, Zwei Jahre | wie Folge 2 | Etikett "Zwei Jahre" | mit b1 | keine |
| 10, Tausch | 4 | Zeitwert 05, Wenn Miterben verschieden schnell sind | wie Folge 2 | Etikett nach Skript | Wissensfolge ohne eigene Zahl | keine |

Die Tauschfolge zu drehen kostet eine Viertelstunde und verhindert, dass eine fehlende Unterlage den Drehtag entwertet (Ableitung). Für "Alteingesessen 01" ist P10 erst grün, wenn der Ort feststeht; bis zur Übergabe ist das ein offener Punkt der Clip-Liste, kein Blocker des Live-Tags, weil die Folge in Woche 3 liegt.

**16.8 Übergabe, Do 19.11., 40 Minuten, im Büro 1190.** Alle Tafeln auf dunklem Grund. Tafel 1: Überschrift "Zwischen Sieveringer Straße und Agnesgasse." (seine Beschreibung seines Kerns aus dem Seed, im Reveal als seine Worte gezeigt, `15_reveal.md` 0 Punkt 7; dass sie in `stimme.eigeneWorte` mit `verwendung` "oeffentlich" steht, ist Arbeitsannahme), darunter "Ab Dienstag, 24. November, 11 Uhr." Das Team reicht ihm das Telefon: sein Profil in Originalgröße, Porträt aus `bild.portraet`, Bio "Zinshäuser und Altbau in Döbling, Währing und Hietzing. Zeit ist Teil des Preises.", drei Highlights nach der Regel aus Schritt 13, die erste Zeile angepinnt, darunter nichts, weil er "archivieren" bestätigt hat. Tafel 2 und 3 ohne Handlung. Tafel 4: Er öffnet die Schachtel, die Karte vorn dunkel, das Zeitmaß in #C29D75, das Etikett in Textfarbe. Tafel 5: Sein Zeitmaß läuft als Spanne vom Auftakt-Gespräch am Mo 05.10.2026 bis Dienstag, 24. November; darüber das Etikett "50 Tage" in der Kennzahl-Stufe, am Ende der Punkt für den Stand. Darunter "Zeit ist Teil des Preises." Mehr nicht. Das Datum des Auftakts ist die Annahme aus dem Beispiel in Schritt 1 und künftig `auftrag.termine.auftakt` (K1); die 50 Tage sind daraus gerechnet und damit ebenfalls Arbeitsannahme. Das ist die Regel seines Serienformats aus Schritt 9 ("Jede Folge endet mit ihrer Zeit"), angewandt auf sein eigenes Projekt. Das Team sagt danach nur, dass unter "Details" alles Übrige liegt, und schickt ihm die Datei der Ansicht aufs Telefon.

**16.8a Folge-Freigabe, Fr 20.11., im Link** (Arbeitsannahme zur Mechanik). Er geht D5 am Vormittag durch, elf Beiträge [Passt], ein Pin bei "Vor der Unterschrift 01": "Lieber die Aufnahme, in der ich zum Fenster schaue." Das ist eine Füllungskorrektur (anderer Take). Der Art Director tauscht den Take am selben Tag, der Prüfer aus Schritt 13 bleibt grün, Eintrag in `rollout.folge.korrekturen`. Er gibt die Folge frei, der Code kommt um 15 Uhr, vor der Frist Mo 23.11., 12 Uhr. Keine Runde.

**16.9 Umfeld-Tag, Fr 20.11.** Entwurf der Notiz an ein Notariat, den er selbst schickt (Claude, geprüft vom Team; Arbeitsannahme):

```text
Ab Dienstag, 24. November, trete ich mit einem neuen Auftritt auf.
An meiner Arbeit ändert sich nichts: Ich rechne mit Erben und Anlegern
vor, was Warten kostet und was Verkaufen bringt.
Sie sollen es von mir zuerst hören.
```

Keine Zahl, kein Name, keine Anrede des Empfängers im System. Die Anrede setzt er selbst.

**16.10 Live-Tag, Di 24.11., Beginn 11 Uhr, nach seinem Grundbuch-Termin.** Kopfzeilen aus einer Quelle: Website-Headline "Zeit ist Teil des Preises.", LinkedIn-Kopfzeile "Makler für Zinshäuser in Döbling, Währing und Hietzing. Zeit ist Teil des Preises.", Instagram-Bio wie oben. Drei Beiträge in der Folge aus `start30`, gegen 11.20 Uhr: Staffelplakat Zeitwert (Folge 1, steht danach rechts), Pilot Zeitwert 01 in der Fassung ohne b1 (Folge 2, Mitte), Stand Sievering 01 (Folge 3, oben links). Angepinnt nach der Arbeitsannahme "zuletzt links": zuerst das Staffelplakat, dann der Pilot, zuletzt Stand Sievering 01; das Team prüft am Gerät und trägt die beobachtete Reihenfolge ein. Das ist dieselbe Zeile wie Zeile 4 der Probe-Folge in Schritt 12, nur an einem Tag. Bereitschaft am Vortag, Mo 23.11.: Folge-Freigabe für Woche 1 liegt vor. Stand Sievering 01 braucht eine Marktquelle für jede Zahl (Schritt 12, Lücke). Fehlt sie, setzt die Regel die Reservefolge der Serie ein (in Schritt 12 noch Lücke); gibt es keine, rückt der Live-Tag auf Di 01.12., und der Makler liest den Grund in einem Satz. Blocker sind außerdem die Pflichtangaben im Impressum (heute Lücke). Nachweis: Bildschirmfoto, zugeschnitten auf Profilkopf und die ersten zwei Zeilen.

**16.11 Folge.** Woche 2: Zeitwert 02 am Di 01.12., 11 Uhr, Vor der Unterschrift 01 am Do 03.12., Verbüchert 01 mit b3 am Sa 05.12. Woche 3: Der Dienstag ist der 08.12., ein Feiertag (`HM_FEIERTAGE`). An einem Feiertag gibt es keinen Grundbuch-Termin, also keinen Anlass der Serie: Zeitwert 03 erscheint am Mi 09.12. mit dem Hinweis in der Folge-Ansicht, danach Alteingesessen 01 am Do 10.12. und Stand Sievering 02 am Sa 12.12. Woche 4: Zeitwert 04 oder die Tauschfolge am Di 15.12., je nach Stand von b1 am Vortag, Vor der Unterschrift 02 am Do 17.12. Warum jetzt 01 am Sa 19.12. braucht ein eigenes Objekt mit Rechten und Energiekennzahlen (`objektRegel`); fehlt es, erscheint an diesem Samstag nichts, und der Prüfer aus Schritt 13 rechnet die Folge neu. Eine Lückenkachel wird nie veröffentlicht.

**Historie am Ende** (`freigabe.historie`, Arbeitsannahme für Datum und Uhrzeit von Gate 2, Unterlagen und Folge-Freigabe):

| Version | Datum | Wer | Was | Zusammenfassung |
|---|---|---|---|---|
| 1.0 | 03.11.2026 | CD | Gate 2 | Endkontrolle bestanden, Stand für den Reveal |
| 1.0 | 05.11.2026 | Team | Reveal | Empfehlung Papier und Gegenentwurf Dunkel gezeigt; Fremdtest beider Fassungen erkannt |
| 1.0 | 06.11.2026 | Makler | Rückmeldung 1 | fünf Kriterien trifft, Ruhig teilweise; zwei Änderungen, eine Frage; Gegenentwurf Dunkel gewählt; Sendung Zeitwert |
| 1.0 | 09.11.2026 | Team | Unterlage geprüft | b2 Kaufvertrag Sievering, b3 Unterlage Währing |
| 1.1 | 09.11.2026 | Team, CD | Stand, abgezeichnet | Variante Dunkel eingesetzt, Empfehlung Papier abgelegt; Akzent zurückhaltender: Chroma 0,11 auf 0,07, auf Dunkel #D29754 auf #C29D75, im Gegenton #B17834 auf #A17D56; Telefonnummer nicht umgesetzt (Ruhig); Serienname übertragen; b1 mit Fassung ohne Zahl und Tauschfolge; Runden genutzt: 0 |
| 1.1 | 10.11.2026 | Makler | Freigabe 2 | eingefroren über Freigabe-Code, Start wie geplant bestätigt |
| 1.1 | 20.11.2026 | Makler, Team | Folge freigegeben | zwölf Beiträge der ersten vier Wochen, dazu die Tauschfolge; eine Füllungskorrektur (Take bei Vor der Unterschrift 01) |

---

## 4. Fragen an den Makler

### 4.1 Was gefragt wird

| Nr. | Frage (Wortlaut, Sie) | Wann | Wirkt auf | Warum sie den Output verändert |
|---|---|---|---|---|
| Q1 | "Ist das Ihre Marke, so wie sie ab Ihrem Live-Tag überall erscheint?" [Freigeben] oder [Noch etwas ändern] | Freigabe-Ansicht | `quelle` (entsteht oder nicht), `freigabe.historie`; bei "Noch etwas ändern" `rueckmeldung.runde` 2 in Schritt 15 und gegebenenfalls `freigabe.runden.genutzt` | Ohne diesen Akt gibt es keine Quelle, kein Paket, keinen Drehtag. Die Frage nennt kein Datum, weil der Tag erst mit Q2 feststeht; so stimmt er nie einem Datum zu, das danach wechselt. Probe: "Freigeben" friert 1.1 ein und rechnet den Plan; "Noch etwas ändern" lässt die Quelle leer, öffnet die nächste Rückmeldung in Schritt 15 und verschiebt den Plan nach der Regel um bis zu vier WT; ob sie eine Runde verbraucht, entscheidet erst, ob eine Änderung außerhalb des Spielraums umgesetzt wird. |
| Q2 | Hält der Plan aus `auftrag.termine`: "Es bleibt bei Ihrem Plan: [Drehtag, Übergabe, Umfeld-Tag, Live-Tag]." [Stimmt so] oder [Passt nicht mehr]. Hält er nicht: "Welcher Start passt Ihnen? Wir empfehlen Plan A, weil [zwei Sätze]." Plan A, Plan B oder [Keiner passt] | nach der Freigabe, gleiche Sitzung | `rollout.plan.status` (bestaetigt, gewaehlt, anruf), `rollout.drehtag.datum`, `rollout.liveTag.datum` und daraus `uebergabe.termin`, `rollout.umfeld.datum`, `rollout.folge` mit allen Tagen, `rollout.folge.rueckblick`, `rollout.checkliste[].faellig`, Druckfristen | Der Live-Tag liegt in `auftrag.termine` schon vor (Schritt 1, geplant mit derselben Funktion); gefragt wird deshalb nicht nach dem Tag, sondern nur, ob er noch gilt, denn sein Kalender kann sich seit dem Auftakt geändert haben, und das kennt kein System. Eine Wahl zwischen zwei Plänen gibt es nur, wenn die Regel den geplanten Tag verwirft. "Passt nicht mehr" und "Keiner passt" lösen einen Anruf des Teams aus, nie einen dritten Plan. Probe: "Stimmt so" schreibt die Daten aus `auftrag.termine` unverändert in `rollout`; "Passt nicht mehr" setzt den Status "anruf" und sperrt Drehtag-Einladung und Druckfristen bis zur Eintragung; bei einer verschobenen Runde (3.13) führt Plan B statt A alle Termine um zwei Wochen weiter. |
| Q3 | "Vorab sehen Ihre Marke: [Rollen]. Stimmt das?" [Stimmt so] oder [Ändern] | gleiche Sitzung | `rollout.umfeld.wer` und damit, welche Rollenseiten und wie viele Empfehler-Notizen entstehen | Vorbelegt aus `auftrag.entscheider`, Einrichtung und `antworten.empfehler`; bestätigt wird nur, weil sich das Umfeld seit dem Auftakt geändert haben kann. Probe: Streicht er "Notariate", entsteht keine Notiz und D2 in der Übergabe zeigt nur das Büro. |
| Q4 | Nur mit bestehendem Profil: "Ihre bisherigen Beiträge: am Live-Tag archivieren (empfohlen) oder unter der neuen Zeile lassen." [Stimmt so] oder [Ändern] | gleiche Sitzung | `rollout.liveTag.altbestand`, Tafel 1 der Übergabe, Schritt 3 des Live-Termins | Es sind seine Beiträge; archivieren braucht sein Wort, auch wenn es umkehrbar ist (3.9). Probe: "lassen" zeigt in Tafel 1 die alten Kacheln unter der ersten Zeile, und der Live-Termin entfällt um einen Schritt. |

Nach der Übergabe gibt es eine Handlung, keine Frage: [Folge freigeben] im Link (3.7, D5), mit Pins für Füllungskorrekturen. Sie wirkt auf `rollout.folge.freigegebenAm` und `rollout.folge.korrekturen[]` und erlaubt dem Team, die Beiträge zu veröffentlichen (R4 Ü11). Im Termin selbst gibt es keine Handlung, im Live-Termin nur Handgriffe am eigenen Telefon.

Die Sitzung der Freigabe-Ansicht enthält damit einen Akt (Q1), im Regelfall eine Bestätigung des vorhandenen Plans und nur im Ausnahmefall eine Wahl zwischen zwei kuratierten Optionen (Q2), dazu zwei Bestätigungen vorbelegter Werte (Q3, Q4), in einer Sitzung abschließbar, Dauer vorab angezeigt.

### 4.2 Was bewusst nicht gefragt wird, sondern abgeleitet

| Möglicher Inhalt | Wirkt auf | Woher stattdessen |
|---|---|---|
| Datum des Live-Tags | `rollout.liveTag.datum` | `auftrag.termine.liveTag` aus Schritt 1, von `hmRolloutPlan` geprüft; gefragt wird nur, ob er noch gilt (Q2) |
| Uhrzeit des Live-Tags | `rollout.liveTag.uhrzeit` | Beginn des Live-Termins zur Uhrzeit aus `serien.rhythmus` der Signatur-Serie (über `markenbuch`), bei Markus 11 Uhr aus dem Seed `cue` |
| Überschrift der Übergabe | `uebergabe.ueberschrift` | `stimme.eigeneWorte` nach der Regel in 3.7, Wahl durch das Team |
| Anrede in den Ansichten an ihn | alle Texte an den Makler | `hmAnrede(mid, "makler")` aus `einstellungen.anredeMakler` (3.3.3) |
| Bio, Kopfzeilen, Name im Profil | `rollout.liveTag.bio`, `kopfzeilen` | `stimme.beispiele` und `botschaften.claim` (Schritt 8), `feed.profilkopf` (Schritt 13) |
| Profilbild, Highlights, angepinnte Beiträge | `rollout.liveTag` | `feed.profilkopf` (13), `bild.portraet` über 13 |
| Reihenfolge der ersten Beiträge | `ersteBeitraege[].reihenfolge` | `start30` und die Rasterfolge |
| Welche Clips, wo, was er sagt, was er anzieht | `rollout.drehtag.clips`, Makler-Seite | `feed.kacheln` (13), `fotobrief` (11) |
| Welche Kanäle umgestellt werden | `rollout.checkliste` | `kanalplan` (12) |
| Anrede je Kanal in Notiz, Bio, Kopfzeile | alle Texte | `anrede` über `hmAnrede` (8) |
| Kartenauflage, Zahl der Schilder | Druckauftrag | UNIO-Standard (Setzung, Lücke), Schilder aus den aktiven Objekten im Bestand |
| Darf der Reveal ins Paket | `uebergabe.aufzeichnung` | `auftrag.einwilligungen` Zweck "Reveal aufzeichnen" (1) |
| Wie hat Ihnen der Prozess gefallen | nichts | verändert keinen Liefergegenstand; das Team notiert Beobachtungen |
| Namen und Adressen der Empfänger | nichts im System | Kontaktdaten Dritter werden nie gespeichert; er schickt selbst |
| "Gefällt Ihnen die Übergabe?" | nichts | gibt es nicht (R8 5) |

---

## 5. Eingang und Ausgang

### 5.1 Eingang nach dem Vertrag

| Vertrag | Feld | Wofür in Schritt 16 | Vorhanden im Ausgang des Vorgängers |
|---|---|---|---|
| 15 | `rueckmeldung` (`jeKriterium`, `wahl`, `serienname`, `runde`, `pins`) | Runde zählen, Variante wählen, Seriennamen setzen, Fragen beantworten | ja, 00_ZERLEGUNG Schritt 15 |
| 15 | `aenderungen[]` mit Zielschritt und Feld | 16.1 Umsetzung und Antwort | ja |
| 14 | `markenbuch` | Inhalt der Quelle über die Versionsbindung, Rollenseiten für Umfeld und Paket, Kapitel "Wie wir zu dieser Marke gekommen sind" | ja |
| 14 | `gate2` | Ausgangsversion 1.0, Schwellen für die Neuprüfung | ja |
| 13 | `feed` (`kacheln`, `profilkopf`, `wochen`, `linkedin`, `pruefung`), `start30` | Live-Tag, Folge, Clip-Bindung, Tafeln 1 und 2 | ja |
| 11 | `fotobrief` | Drehtag, Makler-Seite, Clip-Bedarf | ja, 11_bild 5.3 |
| 10 | `system.tokens`, `system.spielraum` | Paket, Ansicht in seiner Marke, Änderungen im Spielraum | ja, 10_system 5.2 |
| 8 | `anrede`, `botschaften.claim` | die Anrede seiner Kanäle in allen Texten in seinem Namen (Texte an ihn über den Kontext `makler`, 3.3.3), ein Claim in Bio, Kopfzeilen, Tafel 5 | ja, 08_stimme |
| 1 | `auftrag.termine`, `auftrag.einwilligungen` | geplanter Plan (Drehtag, Übergabe, Umfeld, Live-Tag, Reserve), der nach der Freigabe nur bestätigt wird, wenn er hält; Aufzeichnung, Objektfotos im Schild-Bild der Übergabe | ja, 01_auftakt 5.3 (alle Momente, `liveTag.reserve`) |

### 5.2 Ergänzungen im Eingang, begründet

1. **1: `auftrag.entscheider`.** Für `rollout.umfeld.wer` (Mitentscheider, die nicht beim Reveal waren) und für die Frage, wer neben dem Makler mitentscheidet. Schritt 1 nennt 16 bereits als Nachfolger, die Liste bleibt symmetrisch.
2. **2: `antworten.empfehler`.** Für die Empfehler-Gruppen im Umfeld. Das ist der einzige neue Vorgänger. Schritt 2 muss 16 in seine Nachfolgerliste aufnehmen, 16 nimmt 2 in die Vorgängerliste auf (5.5). Ohne dieses Feld müsste der Makler etwas beantworten, das er schon beantwortet hat.
3. **15: `praesentation` (`aufzeichnung`, `datum`, `teilnehmer`) und `praesentation.fremdtest`.** Für `uebergabe.aufzeichnung` und für die Sperre beim Einfrieren, wenn die gewählte Fassung "nicht erkannt" wurde. So verlangt es `15_reveal.md` 5.5; gleicher Vorgänger, die Symmetrie bleibt.
4. **10: `system.wortmarke`, `system.zeichen`.** Schritt 10 hat angeregt, sie in den Eingang zu nehmen oder festzuhalten, dass 16 sie über `markenbuch` liest (10_system 5.3 Punkt 3). Entscheidung: über `markenbuch` (14), weil 14 sie nach Gate 2 geprüft bindet. Keine Änderung der Liste.
5. **12: `serien`, `kanalplan`, `vorlagen`.** Schritt 11 hat angeregt, `12: serien` aufzunehmen oder die Reel-Kacheln um `skript` zu ergänzen (11_bild 5.4 Punkt 2). Entscheidung: `serien` und `kanalplan` über `markenbuch` (14); die gesprochenen Sätze aus `feed.kacheln[].skript`, das Schritt 13 inzwischen führt (`13_feed.md` 5.4).
6. **7: `markenvertrag`, `beweise`.** Für die Antworten auf Änderungen, `quelle.gesperrt` und Tafel 5, über `markenbuch` (14).
7. **14: `markenbuch.zahlen[]`, `markenbuch.version`, `markenbuch.basis[]`, `hmGate2Pruefen`.** Für die Zahlenregel aus 3.3.1 und die Neuprüfung des geänderten Stands (`14_markenbuch.md` 5.6 Punkt 7). Teil von `markenbuch`, keine neue Kante.
8. **12: `serieSignatur` und `serien[].themenvorrat`, `reservefolge`, `vorlagen`.** Für die Übertragung des Seriennamens, die Tauschfolgen und die Vorlagen im Paket, über `markenbuch` (14).
9. **8: `stimme.eigeneWorte`, `stimme.stimmgabel`.** Für die Überschrift von Tafel 1 (3.7), über `markenbuch` (14). Schritt 8 ist schon Vorgänger, keine neue Kante.
10. **Extern: `einstellungen.anredeMakler`.** Die eine Quelle für die Anrede UNIO an den Makler, gelesen über `hmAnrede(mid, "makler")` (3.3.3). Keine Markenangabe, darum nicht in der Quelle.

### 5.3 Ausgang nach dem Vertrag und Abnehmer

| Feld | Inhalt | Erzeugt von | Abnehmer |
|---|---|---|---|
| `quelle` | `{version, eingefrorenAm, freigegebenVon {makler, cd}, inhalt {plattform, system, bild, social, feed}, pruefsumme}` | Regeln, Freigabe von Makler und CD | 17 (einzige Quelle), alle öffentlichen Abnehmer über `hmMarkeLesen`, `hmAnrede` (8), Markenbuch nach der Freigabe |
| `freigabe.historie[]` | `{version, datum, wer, was, zusammenfassung}` | Regeln, Claude (Zusammenfassung), Team | 17 (`aenderungsantrag` setzt sie fort), Markenbuch-Kopf, Tafel 5 |
| `uebergabe` | `{ansicht, paket, aufzeichnung}`; Ansicht mit fünf Tafeln und Details (im Vertrag "Deine Marke steht", K9); Paket aus Tokens, Wortmarke als SVG, Vorlagen aus Schritt 12 (`vorlagen.json` und Vorlagenblätter), Markenbuch je Rolle, Fotobrief | Regeln, Claude (Vorschläge Überschrift), Team | Makler und Umfeld (Ansicht), Dienstleister (Paket), 17 (Stand des Pakets, 5.5) |
| `rollout.umfeld` | `{datum, wer}` | Regeln, Makler bestätigt | Umfeld-Vorschau, Checkliste, 17 |
| `rollout.drehtag` | `{datum, fotobrief, clips}` | Regeln, Team | Produktion, 17 (`drehtage` setzt fort) |
| `rollout.liveTag` | `{datum, profilbild, bio, kopfzeilen, ersteBeitraege}` | Regeln, Team | Live-Termin, 17 |
| `rollout.folge` | Woche 1 Vorstellung, Wochen 2 bis 4 Signatur-Serie, Rückblick mit Datum | Regeln | Posting, 17 (`monatsplan` schließt an) |
| `rollout.checkliste[]` | Website, Signatur, Karte, Schild, Google-Profil, LinkedIn-Kopf, je erledigt | Regeln, Team, Makler | 17 (Wiederöffnen bei neuer Version) |

### 5.4 Ergänzungen im Ausgang, begründet

| Feld | Warum |
|---|---|
| `quelle.status`, `quelle.variante`, `quelle.vorgaenger` | nötig, damit Versionen abgelöst statt überschrieben werden und klar ist, welche Variante gilt |
| `quelle.blobs[]` | ohne Hashes der Bilder könnte ein ersetztes Porträt die Marke still ändern |
| `quelle.gesperrt[]` | trennt freigegebene Marke von noch ungeprüften Zahlen (E10) |
| `freigabe.runden` `{inklusive, genutzt, preisDritte}` | Rundenzähler und Hinweis vor dem Absenden (E4) |
| `freigabe.umsetzung[]` `{aenderungId, version, status, antwort}` | jede Änderung aus 15 endet mit Status, Version und dem Satz an den Makler; Entscheidung, Kriterium und Rundenzählung bleiben in `aenderungen[]` aus 15 und werden nicht kopiert |
| `quelle.gesperrt[].oeffentlich` | die freigegebene Fassung ohne Zahl je Stelle, damit die Zahlenregel aus Schritt 14 hält |
| `uebergabe.termin`, `uebergabe.beobachtungen` | der Termin ist der Moment; Beobachtungen ersetzen eine Zufriedenheitsfrage |
| `rollout.umfeld.paket`, `rollout.umfeld.notizen` | Rollenseiten und Empfehler-Notiz ohne Kontaktdaten |
| `rollout.drehtag.maklerSeite {stand, nachtraege[]}`, `clips[].datei` | das versprochene Erlebnis mit drei Werktagen Vorlauf (Stand Reveal, Nachtrag geänderter Sätze) und die Füllung der Plätze; `rollout.drehtag.fotobrief` bleibt der Vertragsname und trägt `{version, ref}` |
| `quelle.freigegebenVon.makler {weg, code, protokoll, standPruefsumme, gezeigtAm}` | Übergangsweg ohne Server (3.5); belegt, welchen Stand er freigegeben hat |
| `uebergabe.ueberschrift {text, ref, vorschlaege[]}`, `uebergabe.datei` | Überschrift als Regel statt Schablone; Ansicht auf seinem Telefon bis zum Link |
| `rollout.plan.status` | Bestätigung, Wahl oder Anruf (Q2) |
| `rollout.liveTag.pinReihenfolge` | gemessene Pin-Reihenfolge, bis die Plattform sie dokumentiert |
| `rollout.liveTag.uhrzeit`, `highlights`, `angepinnt`, `altbestand`, `bereitschaft`, `verschoben` | Bedingungen für "kein halbes Raster" |
| `rollout.folge.freigegebenAm`, `korrekturen[]`, `rueckblick {stichtag, termin}` | Folge-Freigabe durch den Makler im Link mit Füllungskorrekturen; Zahlen nach genau 30 Tagen, Gespräch an einem Tag, an dem Menschen da sind |
| `rollout.checkliste[]` `{wer, faellig, pflichtAmLiveTag, nachweis, quelleVersion}` und Kanäle aus `kanalplan` | Vertragsliste plus aktive Kanäle; ohne Instagram-Profil fehlte der wichtigste Punkt |

### 5.5 Korrekturbedarf an Nachbarverträgen

Stand nach Abgleich mit den Entwürfen 12 bis 15. Erledigt heißt: Der Nachbar hat es schon so gelöst, 16 liest es so.

| Nr. | Schritt | Punkt | Stand |
|---|---|---|---|
| K1 | 1 | `auftrag.termine` mit `hmRolloutPlan`, Live-Tag nach Plan A (13 WT), Reserve nach Plan B (15 WT), vorgemerkter Drehtag: erledigt (`01_auftakt.md` 3.5). Offen: (a) `liveTag.uhrzeit` im Beispiel 11.30 auf 11.00 setzen, weil der Live-Termin zur Uhrzeit aus `serien.rhythmus` beginnt (3.9); (b) ein Feld `auftrag.termine.auftakt` mit dem Datum des Auftakt-Gesprächs, das sich beim Neurechnen nicht ändert (heute nur `gerechnetAm`), für Tafel 5. | teils erledigt |
| K2 | 2 und Zerlegung | `an` von Schritt 2 um 16 ergänzen, `von` von Schritt 16 um 2 (Feld `antworten.empfehler`). | offen |
| K3 | 12 | Die Probe-Folge verteilt Woche 1 auf Dienstag, Donnerstag und Samstag. Für den Start gilt: alle drei Beiträge der Woche 1 am Live-Tag, in derselben Folge und damit in derselben Zeile (13 H1, 3.9 hier). Der Wochentakt gilt ab Woche 2. Die Grammatikprüfung aus 12 bleibt gültig, weil sich die Folge nicht ändert, nur der Tag. | offen, Wortlaut in 12.7 anpassen |
| K4 | 13 | `feed.kacheln[].skript` gibt es. Woche 1 mit drei angepinnten Beiträgen am Live-Tag gibt es. Offen: Schritt 13 nennt die Entscheidung zum Altbestand `alteBeitraege`, 16 führt sie als `rollout.liveTag.altbestand`; 13 liest künftig diesen Namen. Das Beispiel in 13 nennt die Signatur "Noch nicht verkaufen", Schritt 12 empfiehlt "Zeitwert". | teils erledigt |
| K5 | 14 | `markenbuch.basis[]` und `markenbuch.version` binden den Stand je Schritt; 16 friert daraus ein (erledigt). Die Regel "friert nicht ein, solange eine öffentliche Zahl nur vermerkt ist" hält 16 wörtlich, mit der Präzisierung aus 3.3.1: Eine Stelle mit freigegebener Fassung ohne Zahl ist keine öffentliche vermerkte Zahl. 14 sollte den Satz in 3.10 um diese Präzisierung ergänzen. | teils erledigt |
| K6 | 15 | `aenderungen[]` mit `imSpielraum`, `entscheidung`, `zaehltAlsRunde` gibt es; 16 zählt daraus und kopiert nichts (erledigt). Offen: Der Kopf der Rückmeldung liest die Zahl der genutzten Runden aus `freigabe.runden.genutzt` statt aus `rueckmeldung.runde`, weil eine Rückmeldung ohne zählende Änderung keine Runde verbraucht; Tatsachenkorrekturen bekommen `zaehltAlsRunde` falsch mit Grund "Tatsache". Das Beispiel in 15 nennt die Signatur "Noch nicht verkaufen" statt "Zeitwert". | teils erledigt |
| K7 | 10 | Das Beispiel rechnet noch mit "Zeitlinie" und "Moment-Strich" statt mit dem Zeitmaß aus Schritt 9 (so auch 14 und 15). Die Farbwerte aus 10.5 und die Übersetzung im Spielraum bleiben gültig. | offen |
| K9 | Zerlegung | Vertrag von 16: `uebergabe.ansicht` "Deine Marke steht" ist Arbeitsname, der gesetzte Text folgt `hmAnrede(mid, "makler")` und die Überschrift von Tafel 1 der Regel aus 3.7. `uebergabe.paket` "Vorlagen" präzisieren als `vorlagen.json` und Vorlagenblätter aus Schritt 12, keine offenen Dateien für fremde Werkzeuge. | offen |
| K10 | 8 (und 1, 5, 7, 13, 14, 15) | `hmAnrede` um den Kontext `makler` ergänzen, der `einstellungen.anredeMakler` liest und bis zur Owner-Entscheidung die Website-Form liefert und `anrede.fehlend` beschreibt. Alle Makler-Ansichten rufen ihn statt eigener Setzungen. | offen |
| K11 | 15 | Das Beispiel rechnet den Amber-Pin von 0,15 auf 0,11 (#CB914E). Nach `10_system.md` 10.5 ist 0,11 schon der Grundwert, ein weiteres "zurückhaltender" führt auf 0,07 (#C29D75 auf Dunkel, #A17D56 auf Papier). | offen |
| K8 | 17 | Eingang um `uebergabe.paket` (Stand, um veraltete Dateien bei Dienstleistern zu erkennen) und `freigabe.historie` ergänzen; `aenderungsantrag` folgt der Versionsregel aus 3.3.5; Unterlagen zu gesperrten Zahlen werden weiter über `freigabe.historie` freigeschaltet. | offen, 17 ist noch nicht entworfen |

---

## 6. Qualitätsprüfung im Schritt

### 6.1 Regeln (automatisch, `hmSelbsttestFreigabe` und `hmLiveTagBereit`)

| Nr. | Prüfung | Bedingung | Folge bei Fehler |
|---|---|---|---|
| P1 | Einfrieren deterministisch | gleicher Stand ergibt gleiche Prüfsumme; Änderung eines Zeichens ändert sie | Selbsttest rot |
| P2 | Nichts still | alle Pfade aus 3.3.4 an einem Testmakler; Prüfsumme und Abnehmerausgaben danach gleich | Selbsttest rot, Umbau nicht fertig |
| P3 | Eine Quelle | Claim, Palette (Rollenfarben), Schriften, Anrede je Kanal, Wortmarke in Brand-Kit, Renderern, Website, Karte, Signatur, Caption, Reel identisch mit `quelle.inhalt` | Selbsttest rot |
| P4 | Zwei Signaturen | keine Quelle ohne `freigegebenVon.cd` und `freigegebenVon.makler`, CD vor Makler, beide nach dem letzten Stand; beim Makler `weg` gesetzt, bei "code" Prüfziffer gültig und `standPruefsumme` gleich dem eingefrorenen Stand, bei "teamgeraet" Protokoll vollständig | Einfrieren verweigert |
| P5 | Sperrprüfung | Gate-2-Schwellen, Kohorte, Klischees, Anrede für den freizugebenden Stand | keine Freigabe-Ansicht für den Makler |
| P6 | Runden | `freigabe.runden.genutzt` gleich Zahl der Rückmeldungen mit mindestens einer Änderung `zaehltAlsRunde` wahr; keine Änderung im Spielraum, keine abgelehnte und keine Tatsache gezählt; Runde 3 nur mit Preis im Katalog; Hinweis vor dem Absenden der zweiten Rückmeldung vorhanden | Knopf gesperrt, Zähler korrigiert |
| P7 | Änderungen abgeschlossen | jede Änderung aus `aenderungen[]` hat einen Eintrag in `freigabe.umsetzung` mit Status und Satz an den Makler; jede abgelehnte einen Satz am Kriterium | Freigabe-Ansicht gesperrt |
| P8 | Prüfsumme gültig | `hmQuellePruefen` beim Start und vor jeder öffentlichen Ausgabe, inklusive Blob-Hashes | öffentliche Ausgaben gesperrt, Wiederherstellung |
| P9 | Plan hält | Drehtag mindestens 2 WT nach Freigabe und mindestens 3 WT nach Auslieferung der Makler-Seite, Produktion 4 WT, Übergabe vor Umfeld-Tag, Umfeld-Tag mindestens 2 WT vor Live-Tag, alle Makler-Termine an Werktagen ohne `HM_FEIERTAGE`; hält `auftrag.termine`, zeigt Q2 nur die Bestätigung | Regel schlägt zwei Pläne und "Keiner passt" vor |
| P10 | Drehtag deckt Reels | jedes Reel in `feed.kacheln` hat Titelbild, Sätze, B-Roll in `clips` | Drehtag-Plan nicht freigebbar |
| P11 | Erste Zeile | genau drei Beiträge mit `tag` gleich Live-Tag, alle bereit, Reihenfolge ergibt die Rasterfolge aus `start30` | Blocker |
| P12 | Keine ungeprüfte Zahl öffentlich | beim Einfrieren: jede Zahl mit Prüfstatus Selbstauskunft an einer öffentlichen Stelle hat eine freigegebene Fassung ohne Zahl (`quelle.gesperrt[].oeffentlich`), sonst kein Einfrieren (Regel aus Schritt 14); danach: kein Pfad aus `quelle.gesperrt[].wirkt` in Website, erster Zeile, Bio, Kopfzeilen oder geplanten Beiträgen | Einfrieren verweigert, später Blocker für den Beitrag |
| P13 | Pflichtangaben | Energiekennzahlen in jedem Objektbeitrag (`objektRegel`), Impressum vollständig (`hmWebFelder` Gruppe Recht) | Blocker |
| P14 | Keine Daten Dritter | `rollout.umfeld` enthält keine Mailadresse, Telefonnummer oder Personennamen (Muster wie in `hmSelbsttestShop`) | Speichern verweigert |
| P15 | UNIO-Sprache und Anrede | alle Texte für Makler und Umfeld ohne Gedankenstriche, Ausrufezeichen, Emojis, Wörter der Klischee-Liste; Texte von UNIO an den Makler (Freigabe-Ansicht, Details, Makler-Seite, Folge-Freigabe) mit `hmAnredePruefen` gegen `hmAnrede(mid, "makler")`; Texte in seinem Namen (Empfehler-Notiz, Bio, Kopfzeilen) gegen `hmAnrede` des Kanals oder `website` | Text zurück |
| P16 | Paket aus der Quelle | jede Datei mit Version im Namen, kein Demo-Objekt (`hmWebObjekte` nie im Paket), Farben gleich Tokens; `vorlagen.json` gleich `quelle.inhalt.social.vorlagen`, je Vorlage ein Vorlagenblatt mit einer echten Kachel | Paket nicht erzeugt |
| P17 | Rückblick | `stichtag` gleich Live-Tag plus 30 Tage, Termin an einem Makler-Werktag | Warnung |
| P18 | Übergabe beginnt mit Anwendung | Tafel 1 ist das Profil, Tafel 5 das Zeichen; kein Logo auf Weiß vor Tafel 5; keine Handlung und keine Verwaltung in den Tafeln 1 bis 5 | Selbsttest rot |
| P19 | Fremdtest | `praesentation.fremdtest` der gewählten Fassung ist nicht "nicht erkannt", oder ein Klärungsgespräch des CD mit neuer Fassung ist in der Historie | Einfrieren verweigert |
| P20 | Seriennamen | `serieSignatur.gewaehlt` gleich `rueckmeldung.serienname` oder, ohne Wahl, gleich `empfehlung`; jede Kennung, das Staffelplakat und jede Caption der Serie tragen ihn | Einfrieren verweigert |
| P21 | Keine Lückenkachel öffentlich | kein Beitrag in `rollout.folge` mit Bild oder Text als Lücke; ruhende Serien und fehlende Objekte lassen den Platz leer, der Prüfer aus 13 rechnet neu | Beitrag nicht planbar |
| P22 | Überschrift der Übergabe | aus `stimme.eigeneWorte` mit `verwendung` "oeffentlich", höchstens zehn Wörter, nicht der Claim, keine ungeprüfte Zahl; Textähnlichkeit zu den Übergabe-Überschriften aller Makler der Kohorte unter der Schwelle aus MARKENQUALITAET | Überschrift gesperrt, nur Wortmarke |
| P23 | Folge-Freigabe | Woche 1 bis Vortag 12 Uhr freigegeben, jede spätere Woche 2 WT vor dem Beitrag; jede Korrektur in `korrekturen[]` mit Umsetzung; keine Korrektur ändert die Prüfsumme | Blocker für den Beitrag, bei Woche 1 für den Live-Tag |
| P24 | Nachweis ohne Dritte | gespeicherte Bildschirmfotos nur im Zuschnitt Profilkopf und erste zwei Zeilen | Speichern verweigert |

### 6.2 Menschliche Prüfung

- **CD beim Abzeichnen (16.2):** nur geänderte Stellen in Anwendung, Wandtest einer geänderten Farbe auf echtem Bild, bei geänderten Sätzen der Lautlese-Test (MARKENQUALITAET Kapitel 2). Etwa 20 Minuten (Setzung).
- **Art Director nach dem Drehtag:** jede Füllung gegen `bild.regeln`, die zwölf Kacheln als Satz mit einem Licht und einer Beschnittregel (R6 R11).
- **Team vor der Übergabe:** Ansicht einmal am Telefon und einmal am Bildschirm durchgehen, Karten geliefert, Umfeld-Notiz gelesen.
- **Team im Live-Termin:** Bildschirmfoto gegen Tafel 1; Abweichung heißt, der Punkt bleibt offen.

---

## 7. Typische Fehler und wie sie verhindert werden

| Fehler | Beispiel aus Bestand oder Praxis | Verhinderung |
|---|---|---|
| Freigabe gilt für einen Text, der sich ändert | `hmMbPlattform` erzeugt neu, wenn nichts gespeichert ist (KETTE_IST 2.8) | Quelle mit Prüfsumme, `hmMarkeLesen`, P1, P2 |
| Weltwahl oder Regler überschreiben nach der Freigabe | `wb-markenbuch.jsx` Zeile 115, `wb-web.jsx` Zeile 344 | `hmQuelleSperre` in jedem Schreibpfad, Weltwahl nach der Freigabe unsichtbar |
| Website geht mit ungeprüften Texten live | `wb-marke.jsx` Zeile 117 prüft nur die Existenz eines Eintrags | Livegang nur mit Quelle, P12, P13 |
| Dienstleister bekommt falsche Farben | Brand-Kit mit fester Palette (`wb-setup.jsx`) | Paket aus Tokens, P16 |
| Demo-Objekte im Paket | Exposé mit `hmWebObjekte()[0]` im Materialpaket | Paket nur aus Quelle und eigenen Objekten, P16 |
| Zwei Claims am selben Tag | Karte mit Weg-Leitidee, Website mit Plattform-Claim (KETTE_IST Kapitel 3) | ein `botschaften.claim` in der Quelle, P3 |
| Runden zerfasern | jede Frage wird als Änderung behandelt | Einordnung aus 15, Fragen zählen nie, P6, P7 |
| Makler gibt ohne Überblick frei | Freigabe als Knopf ohne Zusammenfassung | Freigabe-Ansicht mit Änderungen, Liste, Gesperrtem |
| Drehtag vor der Freigabe, danach ändert sich der Text | Clips passen nicht mehr zur Caption | Drehtag nach der Freigabe, P10 |
| Drehtag deckt nicht alle Reels | ein Reel ohne Titelbild in Woche 3 | Clip-Liste aus `feed.kacheln`, P10 |
| Halber Start | neues Profilbild, alte Website; eine neue Kachel über alten | Live-Termin in fester Reihenfolge, erste Zeile angepinnt, P11 |
| Neue Signatur vor dem Live-Tag | Assistenz richtet sie am Umfeld-Tag ein | Signatur aktiv ab Live-Tag 8 Uhr, in der Anleitung |
| Ungeprüfte Zahl am ersten Tag | LinkedIn-Beitrag mit 600.000 und 11 Wochen (Schritt 8) | `quelle.gesperrt`, P12, Tausch oder Verschiebung |
| Umfeld erfährt es aus dem Feed | Notariat sieht den neuen Auftritt zuerst öffentlich | Umfeld-Tag, P9, Checklistenpunkt |
| Kontaktdaten Dritter im System | heutiges Fremdbild mit Kontakten (00_ZERLEGUNG 4.1) | nur Rollen, Makler teilt selbst, P14 |
| Passwörter wechseln den Besitzer | Team stellt Profile um | Makler bedient sein Telefon selbst |
| Ende als Download | "Materialpaket laden" als letzter Knopf | Übergabe-Termin, Paket unter "Details", P18 |
| Tafel 5 wird zur Schablone | bei allen Maklern dieselbe Schlussanimation | Tafel 5 aus der Zeichenregel des Maklers |
| Übergabe beginnt bei allen mit demselben Satz | "Ihre Marke steht." über jedem Profil | Überschrift aus `stimme.eigeneWorte`, Kohortenvergleich P22 |
| Höhepunkt kippt in Verwaltung | Plan, Umfeld und Freigabeklick direkt vor dem Schlussbild | fünf Tafeln ohne Handlung, Verwaltung unter Details, Folge-Freigabe im Link (P18, P23) |
| Zustimmung zu einem Datum, das danach wechselt | Freigabefrage nennt den Live-Tag, bevor der Plan bestätigt ist | Q1 ohne Datum, Q2 danach |
| Frage nach einem vorhandenen Wert | Planwahl, obwohl `auftrag.termine` hält | Q2 nur als Bestätigung, Wahl nur bei verworfenem Plan |
| Eingefroren wird ein anderer Stand als gezeigt | Team ändert nach dem Versand der Datei noch einen Satz | Freigabe-Code mit Prüfsumme des gezeigten Stands, P4 |
| Anrede an den Makler aus seiner Kundenanrede abgeleitet | Du-Makler bekommt Sie-Ansichten, weil seine Website siezt | ein Kontext `makler` in `hmAnrede`, ein Feld `einstellungen.anredeMakler` |
| Makler-Seite kommt zu spät | Sätze erst mit der Freigabe, zwei Tage vor dem Dreh | Makler-Seite im Stand des Reveals, Nachtrag nur für Geändertes (3.6, P9) |
| Termine an Feiertagen | Rhythmustag 08.12. | `HM_FEIERTAGE`, Verschiebung mit Grund |
| Stille Freigabe durch Frist | Muster "Auto-Freigabe nach 5 Tagen" | nie für Freigabe 2, Nachfass-Takt statt Frist |
| Spielraum verbraucht Runden | der ruhigere Amber-Ton kostet Markus eine seiner zwei Runden | Zählung nur aus `zaehltAlsRunde` (15), P6 |
| Zwei Seriennamen im Umlauf | Kennung mit dem Namen aus dem Reveal, Staffelplakat mit dem gewählten | Übertragung vor dem Einfrieren, P20 |
| Ganze Marke hängt an einem Kaufvertrag | Freigabe wartet wochenlang auf eine Unterlage | Fassung ohne Zahl oder Tauschfolge, 3.3.1, P12 |
| Lückenkachel geht online | "Hier kommt Ihr erstes Objekt" am Samstag der Woche 4 | P21, der Platz bleibt leer |

---

## 8. Umsetzung in der Werkbank

### 8.1 Dateien

| Datei | Änderung |
|---|---|
| `ui_kits/werkbank/wb-freigabe.jsx` (neu) | Datenschicht und Regeln: `hmMarkeLesen`, `hmQuelle`, `hmQuelleVersion`, `hmQuelleSperre`, `hmQuelleEinfrieren`, `hmQuellePruefen`, `hmQuelleKanonisch`, `hmFreigabeDiff`, `hmFreigabeRunde`, `hmRolloutPlan`, `hmLiveTagBereit`, `hmDrehtagClips`, `hmCheckliste`, `hmUebergabePaket`, `hmUmfeldVorschau`, `hmFreigabeDatei`, `hmFreigabeCode`, `hmFreigabeCodeLesen`, `hmMarkeStehtDatei`, `hmNachweisZuschnitt`, `hmSelbsttestFreigabe`. Oberfläche: `FreigabeAnsicht` (Makler; Team-Modus mit Code-Eingabe und Protokoll), `MarkeSteht` (Übergabe, Vollbild, in seiner Marke, fünf Tafeln und Details), `FolgeFreigabe` (D5 mit Pins), `RolloutPlan` (Team, Termine und Checkliste, Details als Seitenpanel), `LiveKarte` (Team im Termin). Präfix `hm`, Export über `Object.assign(window, ...)`, kein `import()` |
| `ui_kits/werkbank/index.html` | Script-Tag für `wb-freigabe.jsx` nach `wb-markenbuch.jsx` |
| `wb-ui.jsx` | `hmBrand` liest bei vorhandener Quelle Claim, Schrift, Akzent, Wortmarke und Porträt aus `hmMarkeLesen(mid, "oeffentlich")` |
| `wb-markenbuch.jsx` | Freigabe-Knopf wird "Endstand abzeichnen" für den CD; "Neu erzeugen" nur im Arbeitsstand, sonst "Neue Version beginnen"; `WeltWahl` nach Freigabe ausgeblendet; Kopfzeile zeigt Version und Freigabedatum; Demo-Objekt im Exposé entfällt |
| `wb-marke.jsx` | `hmWebFelder` liest nur die Quelle; `Studio.set` und `BrandKit` prüfen `hmQuelleSperre`; Schritt "Markenbuch" in `schritte` endet mit Freigabe 2, neuer Schritt "Start" für den Plan |
| `wb-web.jsx` | `setBr` (Zeile 344) für Markenfelder gesperrt; Status "live" nur über die Checkliste; `hmWebWelt` liest die Quelle |
| `wb-setup.jsx` | `hmBrandKit` wird Teil von `hmUebergabePaket`, Farben aus Tokens, Dateinamen mit Version |
| `wb-material.jsx` | `hmMaterialPaket` ruft `hmUebergabePaket`; `markenplattform.json` wird `quelle-<version>.json` |
| `wb-reel.jsx`, `wb-os-data.jsx`, `wb-bildwelt.jsx` | `hmMbPlattform` durch `hmMarkeLesen` ersetzen; Anrede über `hmAnrede` |
| `wb-vertrag.jsx` | `hmAnrede` um den Kontext `makler` ergänzen (liest `einstellungen.anredeMakler`, sonst Website-Form mit Eintrag in `anrede.fehlend`), K10 |
| `wb-store.jsx` | `hmSchritteFuer`: Schritte "Marke freigeben", "Drehtag", "Übergabe", "Umfeld", "Live-Tag", "Rückblick" aus `hmRolloutPlan` statt fester Tage; Seed-Flag erhöhen |
| `wb-betrieb.jsx` | Selbsttest-Gruppe "Freigabe" mit `hmSelbsttestFreigabe` |
| `api/wb-marke.js` | Phase `freigabe` mit Schema 8.3; kleine Aufrufe, Aufwand niedrig |
| `docs/werkbank/MARKE_SCHEMA.md` | Abschnitte `quelle`, `freigabe`, `uebergabe`, `rollout` |

### 8.2 Datenvertrag im Store

```js
// hmStore "quellen": Index, voller Inhalt zusätzlich in IndexedDB unter q:<mid>:<version>
quellen[mid] = { aktuell: "1.1", versionen: ["1.0-entwurf", "1.1"] };

marke2[mid].quelle = {
  version: "1.1", status: "freigegeben",           // "freigegeben" | "abgeloest"
  eingefrorenAm: "ISO",
  freigegebenVon: { makler: { id, am, gezeigtAm, weg: "code" | "teamgeraet" | "link", code: null, protokoll: null, standPruefsumme: "sha256:" },
                   cd: { rolle, am, gate2Version, geprueft: [""] } },
  variante: "empfehlung",                           // oder "gegenentwurf"
  vorgaenger: "1.0",
  inhalt: { plattform: {}, system: {}, bild: {}, social: {}, feed: {} },
  blobs: [{ key: "", sha256: "" }],
  gesperrt: [{ pfad: "", grund: "", frist: null, wirkt: [""], oeffentlich: [""] }],   // oeffentlich: freigegebene Fassung ohne Zahl je Stelle
  pruefsumme: "sha256:"
};

marke2[mid].freigabe = {
  historie: [{ version, datum, wer: [{ rolle }], was: "gate2" | "reveal" | "rueckmeldung" | "stand" | "abgezeichnet" | "freigabe" | "unterlage" | "folge" | "korrektur" | "aenderungsantrag", zusammenfassung, runde: null }],
  runden: { inklusive: 2, genutzt: 0, preisDritte: null },
  umsetzung: [{ aenderungId: "", version: "1.1", status: "offen" | "umgesetzt" | "nicht umgesetzt", antwort: "" }]   // Entscheidung, Kriterium, zaehltAlsRunde bleiben in aenderungen[] aus 15
};

marke2[mid].uebergabe = {
  ansicht: { geoeffnetAm: null, tafeln: 5, details: ["was-gilt", "umfeld", "plan", "dateien", "folge"] },
  ueberschrift: { text: "", ref: { art: "eigeneWorte", index: 0 }, vorschlaege: [{ text, grund }] },
  datei: { version, erzeugtAm, geschicktAm },
  termin: { datum, ort, dauerMin: 40 },
  paket: { version, dateien: [{ pfad, sha256 }], vorlagen: { json: "", blaetter: [{ vorlageId, kachel, pfad }] } },
  aufzeichnung: { einwilligung: false, link: null },
  beobachtungen: [""]
};

marke2[mid].rollout = {
  plan: { status: "bestaetigt" | "gewaehlt" | "anruf", gewaehlt: null | "A" | "B", ausAuftrag: true, vorschlaege: [{ id, drehtag, uebergabe, umfeld, liveTag, grund }], anruf: { faellig, eingetragenAm } },
  umfeld: { datum, wer: [{ rolle: "buero" | "assistenz" | "mitentscheider" | "notariat" | "steuerberatung" | "kanzlei" | "hausverwaltung", anzahl }], paket: { seiten: [""], vorschau: null }, notizen: [{ rolle, text, luecke: null }], oeffnungen: 0 },
  drehtag: { datum, fotobrief: { version, ref: "bild.fotobrief" }, clips: [{ kachel, serie, folge, ort, titelbild, saetze: [""], dauerSek, broll, datei: null, status }], standbilder: [{ luecke, datei: null }], maklerSeite: { stand: "1.0", ausgeliefertAm, nachtraege: [{ kachel, alt, neu, am }] } },
  liveTag: { datum, uhrzeit, profilbild, bio: { instagram, linkedin, google }, kopfzeilen: { website, linkedin, google, name }, highlights: [{ name, cover, story }], ersteBeitraege: [{ kachel, datei, caption, reihenfolge, angepinnt: true }], altbestand: { empfehlung, entscheidung, anzahl }, pinReihenfolge: null | "zuletzt links" | "zuerst links", nachweise: [{ kanal, blob, zuschnitt: "kopf-zwei-zeilen" }], bereitschaft: { stand, blocker: [""] }, verschoben: [] },
  folge: { wochen: [{ woche, von, beitraege: [{ kachel, datum, uhrzeit, freigegeben: false }] }], freigegebenAm: null, freigabeWeg: null,
          korrekturen: [{ kachel, satzMakler, art: "take" | "ausschnitt" | "standbild" | "tippfehler", umgesetztVon, am }], rueckblick: { stichtag, termin } },
  checkliste: [{ id, was, kanal, wer, faellig, pflichtAmLiveTag, erledigt: false, am: null, nachweis: null, quelleVersion }]
};
```

### 8.3 Schema für Structured Outputs der Claude-Kette (Phase `freigabe`)

Die Kette nutzt heute `output_config.format` mit `json_schema` (`api/wb-marke.js` Zeile 202). Die Phase bekommt nur Diff, Stimme (mit `eigeneWorte` der Verwendung "oeffentlich"), Anrede und Rollen, nie Rohantworten oder Kontaktdaten.

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": ["zusammenfassung", "aenderungen", "umfeldNotiz", "sprechtexte", "ueberschriftVorschlaege"],
  "properties": {
    "zusammenfassung": { "type": "string", "description": "Höchstens drei Sätze in der Anrede an den Makler, nur aus dem Diff" },
    "aenderungen": { "type": "array", "items": { "type": "object", "additionalProperties": false, "required": ["ref", "satz"],
      "properties": { "ref": { "type": "string" }, "satz": { "type": "string", "description": "Was sich geändert hat, in einem Satz, ohne Fachwort" } } } },
    "umfeldNotiz": { "type": "object", "additionalProperties": false, "required": ["text", "belegRefs"],
      "properties": { "text": { "type": "string", "description": "Höchstens vier Sätze in seiner Stimme, keine Zahl, kein Name, kein Datum außer dem Live-Tag" },
        "belegRefs": { "type": "array", "items": { "type": "string" } } } },
    "ueberschriftVorschlaege": { "type": "array", "maxItems": 3, "items": { "type": "object", "additionalProperties": false, "required": ["eigeneWorteIndex", "grund"],
      "properties": { "eigeneWorteIndex": { "type": "integer", "description": "Index in stimme.eigeneWorte; Claude wählt nur aus, formuliert nie neu" }, "grund": { "type": "string", "description": "Ein Satz, warum er für ab jetzt sieht man mich so trägt" } } } },
    "sprechtexte": { "type": "array", "items": { "type": "object", "additionalProperties": false, "required": ["kachel", "saetze"],
      "properties": { "kachel": { "type": "string" }, "saetze": { "type": "array", "items": { "type": "string" } }, "fassungOhneGesperrteZahl": { "type": "array", "items": { "type": "string" } } } } }
  }
}
```

Nach der Antwort laufen P12 und P15 über jeden Text. Ein Satz, der eine gesperrte Zahl enthält oder die Anrede bricht, geht zurück; ohne Schlüssel läuft der Regelpfad aus 3.12.

### 8.4 Selbsttest `hmSelbsttestFreigabe()`

Tests in der Art von `hmSelbsttestPlattform`: "Freigabe: Einfrieren deterministisch" (P1), "Freigabe: nichts still" (P2, sieben Pfade), "Freigabe: eine Quelle für alle Abnehmer" (P3), "Freigabe: zwei Signaturen" (P4), "Freigabe: dritte Runde nur mit Preis" (P6), "Freigabe: Prüfsumme erkennt ersetztes Porträt" (P8), "Rollout: Plan für Markus" (P9: Freigabe 10.11.2026 ergibt Live-Tag 24.11.2026 gleich `auftrag.termine`, also nur Bestätigung; Freigabe 12.11.2026 ergibt A 01.12.2026 und B 15.12.2026; Zeitwert 03 am 09.12.2026 wegen des Feiertags), "Freigabe: Code eines anderen Stands wird abgewiesen" (P4), "Übergabe: Überschrift aus eigenen Worten, nie doppelt in der Kohorte" (P22), "Rollout: Woche 1 ohne Folge-Freigabe blockiert" (P23), "Rollout: Nachweis zugeschnitten" (P24), "Anrede: Kontext makler ohne Einstellung liefert Website-Form und meldet fehlend" (P15), "Freigabe: Spielraum zählt nicht" (P6: Amber-Änderung ergibt `runden.genutzt` 0), "Freigabe: Fassung ohne Zahl" (P12: b1 ohne Fassung verweigert das Einfrieren), "Freigabe: Fremdtest sperrt" (P19), "Freigabe: Serienname übertragen" (P20), "Rollout: keine Lückenkachel" (P21), "Rollout: Drehtag deckt Reels" (P10), "Rollout: erste Zeile vollständig" (P11), "Rollout: keine gesperrte Zahl öffentlich" (P12), "Rollout: keine Daten Dritter" (P14), "Übergabe: Anwendung vor Zeichen, keine Handlung in den Tafeln" (P18), "Paket: Vorlagen gleich Quelle" (P16), "Freigabe: Stammdaten als protokollierte Ausnahme" (P2). Der Testmakler hat die Kennung `selbsttest_fg` und wird danach entfernt, wie `selbsttest_pf` in `wb-plattform.jsx`.

### 8.5 Aufwand

| Baustein | Personentage (Setzung) |
|---|---|
| Datenschicht, Einfrieren, Prüfsumme, Blob-Hashes, Wiederherstellung | 2 |
| Umstellung der Abnehmer und Sperren in allen Schreibpfaden | 2,5 |
| Freigabe-Ansicht mit Diff, Fragen, Runden, Planbestätigung, Freigabe-Datei und Code | 2 |
| Übergabe-Ansicht in seiner Marke, fünf Tafeln und Details, Tafel 5 aus der Zeichenregel, Überschrift-Regel, Datei für sein Telefon, Folge-Freigabe mit Korrekturen | 2,5 |
| Rollout-Plan, Live-Karte, Checkliste, Bereitschaft | 1,5 |
| Drehtag-Bindung und Makler-Seite (auf Schritt 11 aufbauend) | 0,5 |
| Umfeld-Vorschau als HTML-Datei, später Link | 1 |
| Paket aus der Quelle mit Vorlagen und Vorlagenblättern (ersetzt Brand-Kit und Materialpaket) | 1,5 |
| Kontext `makler` in `hmAnrede` | 0,25 |
| Phase `freigabe` in `api/wb-marke.js` mit Regelpfad | 0,5 |
| Zahlenregel mit Fassungen ohne Zahl und Tauschfolgen, Übertragung des Seriennamens, Fremdtest-Sperre | 0,5 |
| Selbsttest | 1 |
| Doku | 0,5 |
| **Summe** | **16,25** |

**Arbeitszeit des Teams je Makler** (Setzung, zu messen): Runde einarbeiten 1 bis 4 Stunden, CD 20 Minuten, Drehtag planen 1 Stunde, Drehtag 3,5 Stunden plus Wege, Sortieren 1 Stunde, Produktion der zwölf Beiträge, Stories und LinkedIn-Beiträge 10 bis 12 Stunden, Übergabe vorbereiten 1 Stunde und Termin 40 Minuten, Füllungskorrekturen bis 1 Stunde, Code eintragen je 5 Minuten, Live-Termin 30 Minuten plus Nachweis, Rückblick 1 Stunde. Zusammen rund 20 bis 25 Stunden. Keine Konten des Maklers bei fremden Werkzeugen nötig.

**Zeit des Maklers** (Setzung): Freigabe-Ansicht 6 bis 10 Minuten, Drehtag laut Fotobrief (Annahme 3,5 Stunden), Übergabe 40 Minuten, Folge-Freigabe 10 Minuten, Umfeld-Tag 15 Minuten, Live-Termin 30 Minuten, Rückblick 30 Minuten. Jede Dauer steht vorab in seiner Ansicht.

---

## 9. Offene Punkte und Lücken

1. **Preis der dritten Runde** (PLAN.md offene Frage 13). Bis er steht, ist die dritte Runde gesperrt.
2. **Richtungswechsel nach dem Reveal:** Termin und Preis eines neuen Gate 1 sind nicht festgelegt. Entscheidung beim Owner.
3. **Plattformdetails:** Zahl der Pins (bis drei) und umkehrbares Archivieren sind mit der Instagram-Hilfe belegt (3.9). Offen bleiben die Reihenfolge mehrerer Pins (Arbeitsannahme "zuletzt links", am Gerät gemessen), stilles Posten (R6 offene Frage 4), Prüfzeiten beim Google-Unternehmensprofil, Maß des LinkedIn-Titelbilds (10_system 10.6).
4. **Server-Datenhaltung:** Bis Supabase (FAHRPLAN) laufen Freigabe 2 und Folge-Freigabe über Datei und Freigabe-Code oder am Team-Gerät mit Protokoll (3.5), Übergabe-Ansicht und Umfeld-Vorschau als HTML-Dateien (3.7, 3.8). Mit der Datenhaltung werden alle drei Links, die direkt schreiben.
5. **Markenarchitektur UNIO und Makler** (R5 offen): wie UNIO in Tafel-Fuß, Signatur und Karte erscheint.
6. **Du oder Sie gegenüber dem Makler** (00_ZERLEGUNG 7.1): Der Mechanismus steht (ein Kontext `makler` in `hmAnrede`, ein Feld `einstellungen.anredeMakler`, 3.3.3), der Wert ist offen und wird vom Owner gesetzt. Bis dahin gilt die Website-Form des Maklers, bei Markus Sie.
7. **Rechtsgrundlagen:** Die Aufzeichnung des Reveals geht nur mit Einwilligung ins Paket des Maklers; das Umfeld bekommt sie nie (3.8). Bildschirmfotos als Nachweis werden vor dem Speichern auf Profilkopf und die ersten zwei Zeilen des Rasters zugeschnitten, so dass keine Kommentare, Nachrichten oder Namen Dritter im System liegen (P24); ob diese Nachweise überhaupt gespeichert oder nur im Termin verglichen werden sollen, ist beim Owner zu klären. Schild-Bild vor einem Objekt nur mit Einwilligung "Objektfotos zeigen". Keine Rechtsberatung in diesem Dokument.
8. **Dauern und Abstände** sind Setzungen: 2 WT bis zum Drehtag, 3 WT Vorlauf der Makler-Seite, 4 WT Produktion, 2 WT Umfeld-Vorlauf, 40 und 30 Minuten Termine, Rückruf binnen eines WT, Füllungskorrektur binnen eines WT, Druck 5 WT. Die ersten fünf Makler liefern echte Werte.
9. **Druckerei, Kartenauflage, Schildmaß** sind nicht bekannt.
10. **Wirkung von drei Beiträgen an einem Tag** auf die Reichweite ist nicht belegt; der Live-Tag ist bewusst ein Moment und kein Reichweitenversuch.
11. **localStorage-Kontingent** für die Quelle ist nicht gemessen; darum der volle Inhalt in IndexedDB.

---

## Quellen

Intern: `../00_ZERLEGUNG.md`, `../bestand/KETTE_IST.md`, `../research/R1-studios.md`, `../research/R4-tools.md`, `../research/R6-social-system.md`, `../research/R8-kundenerlebnis.md`, `01_auftakt.md`, `07_positionierung.md`, `08_stimme.md`, `09_idee.md`, `10_system.md`, `11_bild.md`, `12_social.md`, `13_feed.md`, `14_markenbuch.md`, `15_reveal.md`, `docs/werkbank/MARKENQUALITAET.md`, `docs/werkbank/PLAN.md`, `docs/werkbank/V5_STUFEN.md`, `docs/werkbank/FAHRPLAN.md`, Code in `ui_kits/werkbank/` (`wb-markenbuch.jsx`, `wb-marke.jsx`, `wb-material.jsx`, `wb-setup.jsx`, `wb-store.jsx`, `wb-ui.jsx`, `wb-web.jsx`, `wb-plattform.jsx`, `wb-shop2.jsx`, `wb-reel.jsx`, `wb-bildwelt.jsx`), `api/wb-marke.js`.

Studios und Praxis
- The Brand Identity x Brandpad, Pentagram, How&How, Studio Blackburn: https://the-brandidentity.com/interview/presented-by-brandpad-how-to-systemise-a-brand-featuring-pentagram-how-how-and-studio-blackburn
- The Good Studio, Identitätsprozess: https://www.thegoodstudio.com.au/insights/identity-process
- Pentagram, Mastercard: https://www.pentagram.com/work/mastercard
- Mozilla Open Design, Roads not taken: https://blog.mozilla.org/opendesign/roads-not-taken/
- Gap 2010: https://www.npr.org/2010/10/08/130419187/the-gap-gets-backlash-for-logo-makeover und https://www.forbes.com/sites/velocity/2010/10/07/new-gap-logo-hated-by-many-company-turns-to-crowdsourcing-tactics/
- Colin Mitchell, Selling the Brand Inside, HBR 2002: https://hbr.org/2002/01/selling-the-brand-inside
- Mike Monteiro, 13 Ways (Sekundärquelle): https://thepiratetester.wordpress.com/2021/04/12/2021-04-12-my-breakdown-of-mike-monteiro-13-ways-designers-screw-up-client-presentations-and-how-it-applies-to-testers/
- Tom Greever, Articulating Design Decisions (Sekundärquelle): https://medium.com/@productandrew/articulating-design-decisions-tom-greever-2015-fdae61adade7

Werkzeuge und Plattformen
- Frontify Brand Portal: https://www.frontify.com/en/brand-portal
- W3C Design Tokens 2025.10: https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/
- Instagram, Raster umordnen und Pins: https://www.socialmediatoday.com/news/instagram-releases-profile-grid-rearranging/822304/ und https://www.engadget.com/2190179/instagram-how-to-reorder-grid/
- Instagram-Hilfe, bis zu drei Beiträge anpinnen: https://help.instagram.com/318456537074409/; Einführung 2022: https://techcrunch.com/2022/06/07/instagram-pin-posts-to-your-profile/
- Instagram-Hilfe, Beiträge archivieren, mehrere auf einmal, wieder zeigen: https://help.instagram.com/136706673552668, https://help.instagram.com/2336657616493557, https://help.instagram.com/1180951146111566
- Instagram, stilles Posten als Test: https://techcrunch.com/2025/06/12/instagram-will-finally-let-you-rearrange-your-grid
- Web Crypto API, `SubtleCrypto.digest` (technische Angabe, nicht Teil der Recherche): https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

Studien
- Kahneman u. a. 1993, Peak-End-Regel: https://journals.sagepub.com/doi/10.1111/j.1467-9280.1993.tb00589.x
- Walsh, Winterich, Mittal 2010: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1998809
