# Fragen und ihre Wirkung, Prozess v2

Stand 29.09.2026, eingearbeitet sind die Schrittfassungen bis 30.09.2026. Gegenstück zu `bestand/FRAGEN_WIRKUNG_IST.md`. Gehört zu `BRANDING_PROZESS_V2.md`.

**Wofür diese Datei da ist.** Sie listet jede Frage, Wahl und Bestätigung, die der Makler im Prozess v2 sieht, mit dem Feld, auf das sie wirkt, und einem Beispiel, wie sich der Output ändert, wenn die Antwort anders ausfällt (Tauschprobe). Darunter steht, was aus jeder Frage des heutigen Fragebogens wird.

**Lesart.** Wortlaut in Sie-Form, weil alle Schrittdokumente so arbeiten; die Anrede gegenüber dem Makler entscheidet der Owner (`BRANDING_PROZESS_V2.md` Kapitel 9). Platzhalter in geschweiften Klammern füllt die Werkbank aus seinen eigenen Angaben. Beispiele beziehen sich auf den Demo-Makler Markus Leitner aus dem Seed. Quelle jeder Zeile ist Kapitel 4 des genannten Schrittdokuments; Abweichungen dieser Synthese sind markiert.

**Regeln, die jede Frage erfüllt.**
1. Sie hat ein Zielfeld mit Abnehmer, und eine andere Antwort ändert dieses Feld nachweisbar.
2. Sie fragt nichts, was im Vorab-Dossier liegt oder anderswo schon gefragt wurde. Fakten werden nur bestätigt, Haltungen nie vorbelegt.
3. Sie fragt nach einem konkreten vergangenen Fall statt nach Meinung oder Zukunft, wo das möglich ist.
4. Eine Wahl hat höchstens zwei kuratierte Optionen, eine davon markiert und begründet.
5. Höchstens eine Nachfrage je Frage. Nie "Gefällt es Ihnen?", nie Schrift, Farbe oder Layout zur Wahl.

---

## Zählung

| Schritt | Ort | Fragen | davon bedingt oder optional |
|---|---|---|---|
| 1 Auftakt | Gespräch | 5 | 0 |
| 2 Fragebogen | eigener Link | 23 | 1 |
| 3 Vorlieben | eigener Link | 8 | 1 |
| 4 Workshop | Gespräch | 24 | 5 |
| 5 Einsicht | keine eigene Frage | 0 | 0 |
| 6 Richtungstermin | Gespräch | 3 | 1 |
| 7 und 8 Wort-Link | eigener Link | 5 | 2 |
| 9, 10, 14 | keine Frage | 0 | 0 |
| 11 Bild | Nachricht | 3 | 3 |
| 12 Social | Nachricht | 1 | 1 |
| 13 Feed | Nachricht | 1 | 1 |
| 15 Reveal und Rückmeldung | Termin, Link | 13 | 2 |
| 16 Freigabe | Link | 4 | 1 |
| **Onboarding bis zum Live-Tag** | | **90** | **18** |
| 17 Betrieb | je Block | 6 | 4 |

Im heutigen Fragebogen sind es 50 Frage-Screens (44 Pflicht, 6 optional) mit 64 Antwortfeldern, dazu der Workshop-Leitfaden. Der neue Fragebogen hat 23 Fragen in 27 Screens. Die übrigen 67 Fragen des Onboardings fallen im Gespräch, sind kurze Wahlen mit Empfehlung oder entstehen nur bei Bedarf. Im eigenen Link verbringt der Makler rund 20 Minuten mit Fragebogen und Bildwahl, rund 10 im Wort-Link, rund 15 in der Rückmeldung und rund 8 in der Freigabe (Setzungen).

---

## 1. Jede Frage im neuen Prozess

### Schritt 1, Auftakt-Gespräch

| Nr. | Frage (Wortlaut, Sie) | Antworttyp | Wirkt auf | Beispiel: so ändert sich der Output |
|---|---|---|---|---|
| 1.1 | "Entscheidet jemand mit über Ihren Auftritt, etwa Partner, Teilhaberin oder Büroleitung? Kann diese Person bei Workshop, Richtungstermin und Reveal dabei sein?" | Rolle, entscheidet oder berät, Teilnahme je Termin; kein Name | `auftrag.entscheider.mit[]` | Mit einer Mitentscheiderin erscheinen Einladungen zum Weiterleiten, sie spricht im Workshop als Sprecherin `dritte`, die Rückmeldung in 15 ist gemeinsam. Sagt sie den Reveal ab, wird er verschoben. |
| 1.2 | "Hier ist Ihr ganzer Plan. Fest machen wir heute Workshop, Richtungstermin und Reveal. Passt das, oder verschieben wir einen Tag? An welchen Wochentagen haben Sie Vormittage frei?" | bestätigen oder verschieben, Wochentage | `auftrag.termine`, `termine.wochentage` | Donnerstag statt Dienstag verschiebt alle vierzehn Momente und den Rhythmustag bis zur Signatur-Serie. |
| 1.3 | Acht Einwilligungen, je mit Zweck und Folge bei Nein | je Ja, Nein oder Später mit Frist vor der ersten Nutzung | `auftrag.einwilligungen[8]` | Nein zu Zweck 7 (KI-Verarbeitung) lässt die ganze Kette im Regelpfad laufen, Rückfragen kommen aus festen Vorlagen. Nein zu Zweck 4 ersetzt eigene Objekte im Feed durch Lückenkacheln. |
| 1.4 | "Haben Sie Ihr Logo als Datei vom Gestalter? Und dürfen Sie Ihre Fotos für Werbung nutzen, etwa laut Rechnung oder Freigabe des Fotografen?" | Status je Datei, Art des Nachweises | `vorab.logoAlt.datei`, `vorab.material[].rechte` | Ohne geklärte Rechte an den Porträts sinkt die Porträt-Prognose, ein Porträt-Termin wird vorgemerkt; ohne Logodatei urteilt Schritt 3 an einem Screenshot. |
| 1.5 | "Bei Ihren letzten Aufträgen: Welche anderen Makler waren noch im Gespräch? Bis zu zwei." | bis zwei, gespeichert nur als Kennung | `vorab.wettbewerb` | Ein genannter Mitbewerber kommt auf die Wettbewerbskarte und verschiebt die Konvention, gegen die sich die Positionierung stellt. |

### Schritt 2, Fragebogen im eigenen Link

| Nr. | Frage (Wortlaut, Sie) | Antworttyp | Wirkt auf | Beispiel: so ändert sich der Output |
|---|---|---|---|---|
| 2.1 | "Stimmt das noch?" je Zeile für Bezirke, Grätzl, Objektarten und seit wann | vorbelegt bestätigen, Rang bis 3 | `einsicht.zielgruppe`, Ort-Territorium (6), `positionierung.fuerWen`, Serienorte | Ein anderes Kern-Grätzl ändert Zielgruppe, Ort-Territorium und die Orte in den Seriennamen. |
| 2.2 | "Denken Sie an Ihre letzten zehn Aufträge: Für wen haben Sie gearbeitet?" | sieben Stufen Eigentümer bis Käufer, ohne Startwert | Pfad des Bogens, `einsicht.zielgruppe`, `positionierung.fuerWen`, `nichtFuer` | Stufe 1 statt 3 setzt Käufer in `nichtFuer` statt als Nebengruppe; ab der Käuferseite entfallen Eigentümer-Fragen im Bogen. |
| 2.3 | "Ihre letzten drei Abschlüsse: Was gab jeweils den Ausschlag?" | drei Fall-Karten: Fakten aus dem Bestand bestätigt, Ausschlag frei, Dauer und Abweichung als Zahl; eine Nachfrage | `beweise`, `positionierung.weil`, `einsicht.stuetzen`, Wahl der Leiter-Fälle in 4 | Ein anderer Fall liefert einen anderen Beleg und damit ein anderes "weil" im Vertrag. Der Preis aus dem Bestand zählt nie als Beleg. |
| 2.4 | "Beim {Fall 1}: Wen hätte {Kunde} ohne Sie beauftragt?" | eine aus sechs (Großbüro, Einzelmakler, Plattform, Privatverkauf, Bauträger-Vertrieb, weiß nicht) | `einsicht.konvention`, `positionierung.andersAls` | Großbüro statt Privatverkauf verschiebt die Konvention, gegen die der Positionierungssatz formuliert wird. |
| 2.5 | "Was konnten Sie in diesem Fall, was {Alternative} nicht gekonnt hätte?" | Text, eine Nachfrage | `positionierung.andersAls`, `weil`, `einsicht.weisseStelle` | Eine andere Fähigkeit ergibt eine andere weiße Stelle und einen anderen Methoden-Anker in 6. |
| 2.6 | "Wann haben Sie zuletzt jemandem abgeraten, obwohl es Sie Provision gekostet hat? Was ist daraus geworden?" | Text, "noch nie", "lieber im Workshop erzählen" | `einsicht.weisseStelle`, `workshop.geschichte.abgeraten`, Haltungs-Territorium, Gewicht der Säule Meinung | Mit Geschichte entsteht ein Beleg gegen den eigenen Vorteil und ein mögliches Haltungs-Territorium; mit "noch nie" gibt es beides nicht. |
| 2.7 | "Was hätte {Kunde} fast davon abgehalten, Sie zu beauftragen?" | bis zwei plus eigene Worte | `einsicht.spannung`, `saeulen[].frage` | Provision statt Preiszweifel ergibt eine andere Spannung und eine andere Leitfrage der Säule. |
| 2.8 | "Beim {Fall} schrieben Sie: '{Ausschlag}'. Was hatte die Verkäuferseite davon ganz konkret?" | kurzer Text | `werte`, `versprechen`, `markenvertrag.attribute`, Anfang der Leiter in 4 | Der Nutzen bestimmt, in welche Richtung der Wert gesucht wird: Sicherheit führt zu anderen Werten als Tempo. |
| 2.9 | "Und warum war genau das wichtig?" | kurzer Text | wie 2.8 | Der Wert am Ende der Leiter wird Grundlage des Versprechens auf der Website. |
| 2.10 | "Mit welchem Anlass kamen Ihre letzten Kunden zu Ihnen?" | bis drei, Vorschläge aus den Fällen, eigene Worte zählen | `einsicht.zielgruppe`, Staffelthemen, Satz zum Weitergeben | Erbe statt Familienzuwachs ergibt eine andere Zielgruppe und andere Staffelthemen der Signatur-Serie. |
| 2.11 | "Beim {Fall 1}: Wer hat verkauft, in welcher Lebenslage? Ein Satz." Nur wenn kein Fall-Text einen Kunden nennt | ein Satz, bedingt | `einsicht.zielgruppe`, Lebensphase | "Erben, die weit weg wohnen" statt "Paar, dessen Kinder ausgezogen sind" ändert das Zielgruppenbild. |
| 2.12 | "Woher kamen Ihre letzten Aufträge?" | bis drei, Vorschläge aus den Fällen | `einsicht.zielgruppe`, `kanalplan.rolle`, Kooperations-Konzept | Notariat statt Portal verschiebt Gewicht zu LinkedIn und ändert das Kooperations-Konzept. |
| 2.13 | "Bei welchen Menschen sind Sie einer von ihnen?" | ein Satz | Anker Zugehörigkeit (6), eigenes Wort in Serien und Community-Konzept (12) | "Alteingesessene in Döbling" statt "Eltern im Grätzl" entscheidet, ob Zugehörigkeit ein Territorium tragen kann. |
| 2.14 | "Wo sind Sie heute, wo wollen Sie sein?" | je Kanal aktiv, aufbauen, nutze ich nicht; vorbelegt aus Konten | `kanalplan`, Profilkopf der Rohskizze, Pfad für 2.15 | Ohne Instagram keine Instagram-Planung und keine Instagram-Frage. |
| 2.15 | "Wie sprechen Sie Menschen dort an?" | je sichtbarem Kanal plus Website und E-Mail: Sie oder Du | `anrede` über die eine Funktion `hmAnrede` | Du statt Sie auf Instagram ändert jeden öffentlichen Text dieses Kanals, LinkedIn bleibt unberührt. |
| 2.16 | "Mit welchen drei Wörtern beschreiben Sie Ihre Arbeit?" | drei kurze Felder | `persoenlichkeit`, Abgleich mit `fremdbild` | Andere Wörter ergeben eine andere Persönlichkeit; der Abstand zum Fremdbild wird als Klärung sichtbar. |
| 2.17 | Vier Stimmproben: eine Situation als Überschrift, zwei Sätze zur Wahl | vier Paare, je eine Wahl, eigener Satz möglich | `stimme.regler`, darüber `brief.tonprofil` (9) und Schriftwahl (10) | Pol B statt A setzt einen Regler von 25 auf 75 und verschiebt damit Satzlänge und Schriftcharakter. |
| 2.18 | "Beim {Fall 1}: Haben Sie diesen Verkauf öffentlich gemacht?" | nein, nur auf Nachfrage, ja | `stimme.ermessen`, `markenvertrag.stimmeRichtung` | "Nein" ergibt die Regel "Erfolge leise", "ja" die Regel "Erfolge mit Zahl" in Captions und Bio. |
| 2.19 | "Was darf sichtbar sein, was nie?" | elf Themen je zeigen oder nie, eigener Text | `stimme.verbindlich`, `falschWaere`, `bild.vermeiden`, `sprachpruefung`, Territorien | "Familie nie" streicht Motive, Beiträge der Persönlich-Serie und jedes Herkunfts-Territorium mit Familienbezug. |
| 2.20 | "Welche Formate machen Sie gern, welche gehen, welche nie?" | sechs Karten, je gern, geht, nie | `formatmix`, `serien`, `fotobrief` | "Talking Head nie" entfernt das Format aus Serien und Fotobrief. |
| 2.21 | "Wie viel Zeit können Sie im Monat fest einplanen, Dreh und Freigabe eingerechnet?" | eine aus vier | `formatmix`, Rhythmus, Tragfähigkeit der Serienidee (6) | Weniger Zeit ergibt weniger Beiträge je Woche und mehr Einzelbilder statt Reels. |
| 2.22 | "Welcher feste Termin in Ihrer Woche ist schon da, an den 30 Minuten anschließen könnten?" | Text | Sendetag der Signatur-Serie, Rhythmus | Ein anderer Anker ergibt einen anderen Sendetag und eine andere Uhrzeit des Live-Termins. |
| 2.23 | "Was soll sich durch Ihre Marke in zwölf Monaten geändert haben?" und "Woran würden Sie das zählen?" | eine Auswahl plus ein Satz | `markenvertrag.erfolgsmass`, `kanalplan.rolle`, `wirkung` (17) | Ein anderes Ziel ergibt ein anderes Erfolgsmaß, an dem der Betrieb nach zwölf Wochen gemessen wird. |

Nicht mehr im Fragebogen (Entscheidung C1): die KI-Frage auf der Eröffnung und die Fremdbild-Einwilligung am Ende. Beide sind Einwilligungen und fallen in 1.3. Den Fremdbild-Link teilt der Makler am Ende nur noch, wenn Zweck 3 auf Ja steht.

### Schritt 3, Bildwahl im selben Link

| Nr. | Frage (was er sieht und tut) | Antworttyp | Wirkt auf | Beispiel: so ändert sich der Output |
|---|---|---|---|---|
| 3.1 | Zwei Fotos, die sich nur im Licht unterscheiden | Tippen auf eines oder "beides gleich", ohne Begründung | `vorlieben.profil.licht`, darüber `bild.regeln.licht` (11) und Begründung Licht (9) | Gerichtetes Licht mit Schatten statt weichem Tageslicht im Fotobrief. |
| 3.2 | Zwei Ortsbilder, mit und ohne anonyme Menschen | wie 3.1 | `profil.mensch`, darüber `bild.motive` (11) | Ortsbilder im Feed zeigen Passanten von hinten statt leerer Orte. |
| 3.3 | Zwei Fotos, die sich nur in der Farbtemperatur unterscheiden | wie 3.1 | `profil.farbtemperatur`, darüber `bild.regeln.farbbehandlung` (11); nie der Farbgrund in 10 | Wärmere Tonkurve in allen Bildern, das Farbsystem bleibt. |
| 3.4 | Zwei Porträts, die sich nur im Ausschnitt unterscheiden | wie 3.1 | `profil.ausschnitt`, darüber Rohskizzen (6), Achse (9), `kopfanteilMax` (11) | "Beides gleich" macht den Ausschnitt zur offenen Dimension, die nach der Achsenregel in 9 die Achse des Gegenentwurfs werden kann. |
| 3.5 | Derselbe Satz in zwei Schriftcharakteren | wie 3.1 | `profil.typografie`, darüber `typoRichtung` (6), Begründung Schriftrichtung (9) | Innerhalb der Klasse, die die Stimme vorgibt, eine andere Schriftrichtung. |
| 3.6 | Sein altes Logo in echter Größe: "Tippen Sie an, woran Sie hängen." | Markierung von Elementen | `vorlieben.bestandBehalten[]` | Eine angetippte Farbe muss in `system.farbe` wiederzufinden sein oder wird im Workshop ausdrücklich mit ihm entschieden. |
| 3.7 | Entscheidung zwischen zwei Optionen für das alte Logo, eine empfohlen (etwa schärfen oder neu) | eine aus zwei | `vorlieben.bestandUrteil`, darüber `system.wortmarke.typ` (10) | "Schärfen" statt "neu" hält Wortmarke und Logofarben in der Familie des Bestands. |
| 3.8 | Optional: bis zu drei Auftritte, die er nicht sein will | Link, Satz oder Screenshot; höchstens 14 Tage gespeichert, nur mit Zweck 8 | `nichtIch[]`, nach Bestätigung in 4.19 `falschWaere`, `brief.verbote`, `bild.vermeiden` | Ein bestätigtes Merkmal wie "Schlüsselübergabe vor der Haustür" wird ein Verbot im Gestaltungsbrief. |

Gestrichen gegenüber `03_vorlieben.md` (Entscheidung C2): die Paare Dichte, Material und Ordnung. Kein Abnehmer liest sie; 11 übernimmt aus den Vorlieben nur Licht, Farbtemperatur und Mensch im Bild.

### Schritt 4, Workshop

| Nr. | Frage (Wortlaut, Sie) | Antworttyp | Wirkt auf | Beispiel: so ändert sich der Output |
|---|---|---|---|---|
| 4.1 | "Erzählen Sie mir den Moment bei {Fall}, in dem {Ausschlag} eine Rolle gespielt hat." | Erzählung | `leiter[i].merkmal`, `geschichte.belege`, `zitate` | Ein anderer Moment ergibt ein anderes beobachtbares Merkmal und andere Belege. |
| 4.2 | "Was hatte die Verkäuferseite konkret davon?" (Leiter 2 immer, Leiter 1 nur bei Lücke) | kurz | `leiter[i].nutzen`, darüber `versprechen` (7) | Der Nutzen wird zum Versprechen. |
| 4.3 | "Sie schrieben: '{letzte Stufe}'. Warum war genau das wichtig?" bis dreimal | kurz, negative Stufe erlaubt | `leiter[i].wert`, darüber `werte` und `markenvertrag.attribute` | Ein anderes Ende der Leiter ergibt andere Werte und andere Attribute im Vertrag. |
| 4.4 | "Sie nannten als Anlass {Anlass}. Was war bei den Eigentümern damals im Leben los, und wer hat es angestoßen?" | Erzählung | `switch.anlass`, darüber `einsicht.zielgruppe` | Eine andere Lebensphase ergibt ein anderes Zielgruppenbild. |
| 4.5 | "Wann haben sie zum ersten Mal daran gedacht, und was haben sie dann getan?" | Erzählung, als Erstes kürzbar | `switch.ersterGedanke`, darüber `einsicht.spannung` und Kanalrolle | Zeigt, wo die Marke gefunden werden muss: beim Notar, in der Suche oder über Empfehlung. |
| 4.6 | "Sie schrieben: {Alternative}. Wann war diese Möglichkeit im Gespräch, und wer brachte sie ein?" | Erzählung | `switch.alternative`, darüber `positionierung.andersAls` | Nur eine real erwogene Alternative trägt "anders als"; eine nur denkbare fällt heraus. |
| 4.7 | "Sie schrieben: {Hindernis}. Wann genau kam das auf, und wer hat es gesagt?" | Erzählung | `switch.angst`, darüber `einsicht.spannung` | Aus einem Stichwort wird eine berichtete Spannung mit Sprecher, die die Einsicht tragen darf. |
| 4.8 | "Sie schrieben: '{alternativeKonnte}'. In welchem Gespräch hat sich das entschieden?" | Erzählung, Zurücklesen | `switch.ausschlag`, darüber `positionierung.weil` | Ein anderer Ausschlag ergibt ein anderes "weil". |
| 4.9 | "Wie sind Sie zu {Kernobjektart} gekommen?" | Erzählung, fällt nie aus Zeitmangel weg | `geschichte.herkunft`, darüber `story.herkunft` (8), Herkunfts-Territorium (6) | Eine andere Herkunft ergibt eine andere lange Story und ein anderes mögliches Territorium. |
| 4.10 | "Gab es einen Moment, an dem Sie fast aufgehört oder alles anders gemacht hätten?" | Erzählung, geschützt | `geschichte.wendepunkt`, darüber `story` | Mit Wendepunkt hat die Story eine Spannung, ohne steht dort eine sichtbare Lücke. |
| 4.11 | "Rechnen Sie mir {Zahl aus dem Abraten} vor." Nur wenn es eine Zahl gibt | Rechnung, bedingt | `geschichte.abgeraten`, `belege[].rechnung`, darüber `beweise` (7) | Mit Rechnung ist die Zahl prüfbar, ohne bleibt sie öffentlich gesperrt. |
| 4.12 | "Sie schrieben: {unity}. Wo haben Sie das zuletzt gemerkt?" | Erzählung | nur `zitate` mit Thema Zugehörigkeit, `antworten.unity` bleibt unverändert | Der erlebte Moment liefert eine Szene, die 6 und 12 als sein eigenes Wort zitieren können. |
| 4.13 | "Seit wann gezählt, und welche Unterlage zeigt das? Dürfen wir die Zahl nach Prüfung öffentlich nennen?" Je Zahl, die öffentlich werden könnte | Unterlage; ja, nein, offen; bedingt | `belege[].unterlage`, `belege[].oeffentlich`, `aufgaben` | "Nein" hält die Zahl intern; im Feed steht dann die Kachel ohne Zahl. |
| 4.14 | "Ein Fehler, aus dem Sie etwas geändert haben." Nicht, wenn Fehler in 2.19 auf "nie" steht | Erzählung, bedingt | `geschichte.fehler`, darüber `story` und `einsicht.unbequem` | Ohne Fehlergeschichte fehlt Stoff für den unbequemen Teil der Einsicht. |
| 4.15 | "Wo wollen Sie auf dieser Karte stehen, und warum, in einem Satz?" | Punkt auf der Wettbewerbskarte plus Satz | `karte.wunschlage`, darüber `einsicht.weisseStelle`, `markenvertrag.lageAufDerKarte` | Eine andere Wunschlage verschiebt die weiße Stelle. |
| 4.16 | "Welches dieser zwei ist näher an Ihrer Arbeit? Ein Wort dazu." Zwei Bildreihen aus fremden Kategorien | Wahl plus ein Wort | `fremdkategorie[i]`, darüber `idee.varianten` (9) | Der andere Pol ergibt eine andere Fremdkategorie-Variante in der visuellen Idee. |
| 4.17 | "Würden Sie diesen Satz sagen?" Zwei Reizsätze | ja oder nie | `falschWaere` (Satz), darüber `stimme.vermeiden` (8) | Ein "nie" wird eine Regel der Stimme. |
| 4.18 | "Geht das oder nie?" Zwei Bildmerkmale | geht oder nie | `falschWaere` (Bild), darüber `brief.verbote` (9), `bild.vermeiden` (11) | Ein "nie" wird ein Verbot im Gestaltungsbrief. |
| 4.19 | "Wir lesen darin: {Merkmal}. Stimmt unsere Deutung?" Je Beispiel aus 3.8 | ja oder nein, bedingt | `falschWaere` | Ja macht ein Verbot, Nein verwirft die Deutung des Teams. |
| 4.20 | "Wir verstehen Ihre Grenze so: {Regel}. Stimmt das?" Wenn in 2.19 eigener Text steht | ja oder nein, bedingt | `falschWaere`, darüber `sprachpruefung` (12) | Der Freitext wird eine prüfbare Regel, statt wie heute zu verpuffen. |
| 4.21 | "Was würden Sie nie tun, auch wenn es einen Auftrag bringt?" | Satz | `falschWaere` (Verhalten), darüber `werte[].nie` (7) | Ein anderes "nie" ergibt einen anderen Wert mit Grenze. |
| 4.22 | Klärungsfrage mit zwei Optionen und Empfehlung, höchstens drei, etwa Grenze gegen Bildvorliebe oder Anrede | eine aus zwei | `klaerungen[i].entscheidung` | Ohne Klärung landet ein Widerspruch still in den Schritten 6 bis 11. |
| 4.23 | "Wie wohl war Ihnen, von eins bis sieben?" Nach dem Probedreh | sieben Stufen | `probedreh.komfort`, mit den Beobachtungen `probedreh.formate`, darüber `formatmix` (12) | Niedriger Komfort und unruhige Takes ergeben weniger Talking Head und mehr Stimme über Bild. |
| 4.24 | "Würden Sie diesen Satz öffentlich tragen, oder bleibt er intern?" Drei Sätze | öffentlich oder intern | `zitate[i].oeffentlich` | Nur öffentliche Sätze dürfen wörtlich in Stimme, Feed und Reveal stehen. |

Schritt 5 stellt keine eigene Frage. Fehlt 4.7, holt er sie einmal nach, telefonisch oder als Sprachnachricht, mit demselben Wortlaut.

### Schritt 6, Richtungstermin

| Nr. | Frage (Wortlaut, Sie) | Antworttyp | Wirkt auf | Beispiel: so ändert sich der Output |
|---|---|---|---|---|
| 6.1 | "Welche fühlt sich nach Ihnen an, und woran merken Sie das?" | eine aus zwei, dazu ein Satz, wörtlich notiert und vorgelesen | `richtung.gewaehltId`, `empfehlungAngenommen`, `zitatMakler` | Die Wahl bestimmt, welches Territorium die Schritte 7 bis 13 tragen; sein Satz steht am Anfang des Markenvertrags. |
| 6.2 | "Woran genau, an einem Satz oder an einem Bild?" Nur bei vager Antwort | Satz, bedingt | `richtung.zitatMakler` | Ohne konkrete Stelle ist der Satz kein Maßstab für den Vertrag. |
| 6.3 | "Gibt es darin etwas, das Sie nie sagen oder zeigen würden? Zeigen Sie einfach darauf." | Zeigen auf eine Stelle der Skizze | `richtung.tabus[]`, darüber `falschWaere` (7), `brief.verbote` (9), `system.zeichen.nie` (10) | Eine Markierung am Ausschnitt ändert die Crop-Regel in 11. |

### Schritte 7 und 8, Wort-Link

| Nr. | Frage (Wortlaut, Sie) | Antworttyp | Wirkt auf | Beispiel: so ändert sich der Output |
|---|---|---|---|---|
| 7.1 | "Ist das wahr, und wollen Sie daran gemessen werden?" | "Ja, daran messen wir" oder ein Satz dazu | `markenvertrag.bestaetigtAm`, `version`; bei einem Satz das betroffene Feld | "Käufer sind mir auch wichtig" statt Ja ändert `fuerWen`, `nichtFuer` und `erfolgsmass` und damit Säulen und Serien in 12. |
| 7.2 | "Die Angaben mit den Ziffern {Liste} nach Prüfung öffentlich nennen?" Nur wenn im Workshop offen, gebündelt | öffentlich nach Prüfung oder nur intern, bedingt | `beweise[i].oeffentlich` | "Öffentlich nach Prüfung" erlaubt die Beleg-Kachel mit "11 Wochen", sobald der Kaufvertrag geprüft ist; "nur intern" setzt die Fassung ohne Zahl. |
| 8.1 | "Welchen Satz würden Sie am Ende eines Erstgesprächs sagen?" | eine aus zwei, eine empfohlen, oder "Keiner passt" mit einem Satz | `botschaften.claim`, `botschaften.bio` | Der Claim steht auf Bio, LinkedIn-Kopf, Karte, Signatur und Endkarte und ist Eingang für den Idee-Satz in 9. Bei Markus: "Rat vor Auftrag." oder "Rat, auch zum Warten." |
| 8.2 | "Tippen Sie die an, die genau so klingen wie Sie. Zwei oder drei." | Markierung in der kurzen Story | `stimme.anker`, `stimme.stimmgabel` | Andere Markierung ergibt eine andere Gewichtung der Tonreferenz und anderen Satzbau der Hook-Formeln bei gleichem Inhalt. |
| 8.3 | "Einen Satz würde ich anders sagen." | optional, höchstens ein Satz | `stimme.eigeneWorte`, `story.kurz` | Sein Satz ersetzt den Entwurf, wenn er die verbindlichen Regeln besteht, sonst setzt das Team seinen Wortlaut regelkonform. |

### Schritte 11, 12 und 13, kurze Nachrichten nur bei Bedarf

| Nr. | Frage (Wortlaut, Sie) | Antworttyp | Wirkt auf | Beispiel: so ändert sich der Output |
|---|---|---|---|---|
| 11.1 | "Wir würden Sie gern im Stiegenhaus von {Objekt} fotografieren, ohne Hausnummer und ohne Wohnungstüren. Ist das mit den Eigentümern abgedeckt?" Nur bei einem aktiven Objekt mit Einwilligung der Eigentümer | ja oder nein, bedingt | `fotobrief.orte[].zugang` | Ja macht das Motiv zur Pflicht im Fotobrief, Nein streicht es. |
| 11.2 | "Ihr Porträt-Termin ist am {Datum}, wie im Plan vorgemerkt. Bleibt es dabei?" Nur wenn ein Termin nötig ist | ja oder einer von zwei Tagen, bedingt | `auftrag.termine.portraet`, `fotobrief.lichtUndTageszeit` | Ein anderer Tag ändert Sonnenstand, Kamerarichtung und Ablauf. |
| 11.3 | "Was tragen Sie zu einem Termin mit einem Eigentümer? Ein Foto genügt." Nur nach einem Video-Workshop | Foto, bedingt | `fotobrief.garderobe` | Die Garderobe im Brief folgt seinem echten Arbeitsauftritt. |
| 12.1 | Drei eigene Fälle nachsprechen, Wortlaut aus der Variable der Signatur, bei Markus: "Nennen Sie drei Entscheidungen über den Zeitpunkt aus den letzten zwölf Monaten, bei denen Sie zu- oder abgeraten haben." Nur wenn weniger als vier Fälle mit Zahl vorliegen | zwei Sätze je Fall, gern gesprochen, rund zehn Minuten, bedingt | `serieSignatur.themenvorrat`, `tragfaehigkeit`, `workshop.geschichte.belege` | Mit vier eigenen Fällen startet die Signatur wöchentlich; ohne greift die Rückfallstufe mit weniger Folgen. |
| 13.1 | "Darf {Haus, Straße ohne Hausnummer, Bezirk} im Start Ihres Profils zu sehen sein?" Nur bei Diskretionshinweis oder nie inseriertem Objekt | "Nicht zeigen" (empfohlen) oder "Zeigen", bedingt | `feed.kacheln[i].art`, `feed.objektFreigaben` | "Zeigen" macht den Wechselplatz zur Objekt-Kachel mit Energiekennzahlen, Preis und Fläche; "Nicht zeigen" lässt den vorgerechneten Ersatz stehen. |

### Schritt 15, Reveal und Rückmeldung

| Nr. | Frage (Wortlaut, Sie) | Antworttyp | Wirkt auf | Beispiel: so ändert sich der Output |
|---|---|---|---|---|
| 15.1 | "Sind alle hier einverstanden, dass wir den Termin für Ihre Nachlese aufzeichnen?" Nur bei Ja zu Zweck 5 | ja oder nein aller Anwesenden, bedingt | `praesentation.aufzeichnung` | Ein Nein lässt die Aufzeichnung im Übergabe-Paket leer. |
| 15.2 | "Sagen Sie Stopp, sobald Sie sich sehen." Dann "Woran?", dann auf dem Profil "Erkennen Sie sich darin?" | Stopp, ein Satz, ja, teilweise oder nein | `praesentation.fremdtest` | Stopp bei Platz 3 mit Hinweis auf sein Zeichen ergibt "ja"; kein Stopp ergibt "nein" und sperrt in 16 das Einfrieren. |
| 15.3 | "Welche Fragen haben Sie?" | Fragen | `rueckmeldung.pins[]` der Art Frage | Fragen werden beantwortet und zählen nie als Änderungsrunde; häufige Fragen zu einer Ansicht zeigen, dass sie unklar ist. |
| 15.4 bis 15.8 | Fünf Fragen, je Attribut aus dem Vertrag: "Trifft die Marke das?" mit Stelle bei teilweise oder nicht | je trifft, teilweise, nicht | `rueckmeldung.jeKriterium[].urteil`, `stelle` | "Trifft nicht" am Karussell erzeugt eine Änderung an `feed.kacheln[1].textImBild` mit Zielschritt 13. Das Kernidee-Attribut wird immer abgefragt. |
| 15.9 | "Welche Fassung trifft es besser?" Bei Attributen, die die Achse berührt | Empfehlung, beide, Gegenentwurf; bedingt | `jeKriterium[].variante` | Weicht die Wahl in 15.11 vom eigenen Urteil ab, sieht das Team "Wahl gegen Urteil" und fragt nach. |
| 15.10 | "Was falsch wäre: Taucht etwas davon auf?" | nein oder ja mit Stelle | `jeKriterium` für `falschWaere` | "Ja, hier" ist ein Vertragsbruch und erzeugt eine Änderung mit Vorrang. |
| 15.11 | "Welche Fassung nehmen wir?" | eine aus zwei | `rueckmeldung.wahl` | Entscheidet, ob Empfehlung oder Gegenentwurf in 16 zur Quelle wird. |
| 15.12 | "Wie soll Ihre Sendung heißen?" Zwei Namen, einer empfohlen, oder "Keiner passt" | eine aus zwei | `rueckmeldung.serienname`, darüber `serieSignatur.gewaehlt` | Tauscht Kennung, Staffelplakat und Vorlagen der Serie, sonst nichts. Ein eigener Wunsch muss die Namensregel aus 12 bestehen. |
| 15.13 | "Noch etwas? Tippen Sie auf die Stelle." Mit Einordnung Beobachtung, Frage oder Änderung | Pin | `pins[]`, `aenderungen[]` | Nur Pins der Art Änderung werden Änderungen mit Zielschritt und Feld; die Einordnung trifft nur er. |

### Schritt 16, Freigabe

| Nr. | Frage (Wortlaut, Sie) | Antworttyp | Wirkt auf | Beispiel: so ändert sich der Output |
|---|---|---|---|---|
| 16.1 | "Ist das Ihre Marke, so wie sie ab Ihrem Live-Tag überall erscheint?" | Freigeben oder Noch etwas ändern | `quelle`, `freigabe.historie` | "Freigeben" friert die Version ein und rechnet den Plan; "Noch etwas ändern" öffnet die nächste Rückmeldung. |
| 16.2 | "Es bleibt bei Ihrem Plan: {Drehtag, Übergabe, Umfeld-Tag, Live-Tag}." Nur wenn er nicht hält: Plan A (empfohlen) oder Plan B | Stimmt so oder Passt nicht mehr | `rollout.plan`, alle Daten in `rollout` | "Passt nicht mehr" löst einen Anruf des Teams aus und sperrt Drehtag-Einladung und Druckfristen bis zur Eintragung. |
| 16.3 | "Vorab sehen Ihre Marke: {Rollen}. Stimmt das?" | Stimmt so oder Ändern | `rollout.umfeld.wer` | Streicht er "Notariate", entsteht keine Empfehler-Notiz, die Übergabe zeigt nur das Büro. |
| 16.4 | "Ihre bisherigen Beiträge: am Live-Tag archivieren (empfohlen) oder unter der neuen Zeile lassen." Nur mit bestehendem Profil | eine aus zwei, bedingt | `rollout.liveTag.altbestand` | "Lassen" zeigt die alten Kacheln unter der ersten Zeile, der Live-Termin wird um einen Schritt kürzer. |

### Schritt 17, im Betrieb je Block

| Nr. | Frage (Wortlaut, Sie) | Antworttyp | Wirkt auf | Beispiel: so ändert sich der Output |
|---|---|---|---|---|
| 17.1 | "Ihr nächster Monat ist fertig." | Folge freigeben oder eine Stelle anmerken | `beitrag[].freigabe`, `veroeffentlicht` | Ohne Freigabe ruht die erste Sendewoche als ganze Pause, die Folge setzt danach fort; nichts wird automatisch freigegeben. |
| 17.2 | Höchstens zwei Stoff-Fragen aus den Serien, etwa "Welche Frage stellen Eigentümer in Sievering gerade am häufigsten?" Nur wenn einer Serie Vorlauf fehlt | zwei Sätze, gesprochen am Drehtag; bedingt | `betrieb.stoff[]`, darüber `monatsplan[].hook` | Zwei Fälle füllen zwei Folgen der Signatur und den Sachplatz; ohne Antwort greift die freigegebene Reserve. |
| 17.3 | "Darf {Haus, Straße ohne Hausnummer, Bezirk} in Ihrem nächsten Monat zu sehen sein?" Nur bei einem neuen, heiklen Objekt | Zeigen oder Nicht zeigen, bedingt | `monatsplan[].serie`, `beitrag.felder.objektfoto` | "Zeigen" macht einen Sachplatz zur Objekt-Folge mit Energiezeile. |
| 17.4 | "Dürfen wir den Grund der Eigentümer nennen, so wie Sie ihn uns sagen?" Nur nach "Zeigen" und nur, wenn die Serie den Grund erzählt | Ja oder Ohne Grund, bedingt | `beitrag.felder.grund`, `caption` | "Ohne Grund" setzt die Folge ohne Grund-Satz oder gibt den Platz an eine andere Serie derselben Klasse. |
| 17.5 | "Nächster Drehtag: {Termin A} (empfohlen) oder {Termin B}." | eine aus zwei | `drehtage[].datum` | Der zweite Termin zieht Produktion und Freigabefenster um zwei Werktage vor. |
| 17.6 | "Ab {Block}: {eine Änderung}. Grund: {zwei Sätze}." Nur im Rückblick nach einer Staffel | Einverstanden oder Lieber nicht, bedingt | `aenderungsantrag[].status`, neue `quelle.version` | "Einverstanden" friert eine kleine Version ein, der nächste Plan rechnet mit dem neuen Formatmix. |

---

## 2. Abgeleitet statt gefragt

| Was man fragen könnte | Woher es stattdessen kommt |
|---|---|
| Bezirke, Grätzl, Objektarten, seit wann | Bestand-Import und öffentliche Quellen, nur bestätigt (2.1) |
| Anteil der Abschlüsse im Grätzl, Abschlüsse im Jahr, Objektfluss, Preisband | `vorab.kennzahlen`, gerechnet |
| Follower, was schon existiert, altes Logo | `vorab.auftrittHeute`, `vorab.material`, `vorab.logoAlt` |
| Warum Kunden Sie gewählt haben | Ausschläge der Fälle (2.3) und Wert-Leiter (2.8, 2.9, 4.1 bis 4.3) |
| Ihre Werte | Leitern und Workshop, nie als Liste zum Ankreuzen |
| Wie Ihre Marke klingen soll | Stimmproben (2.17), Mitschrift, `stimmeRichtung` |
| Kamera-Komfort | gemessen im Probedreh (4.23) |
| Wer Ihre Zielgruppe ist, wer Ihre Konkurrenz | Fälle, Anlässe, Seite, Karte; Arbeit des Teams in 5 |
| Welche Schrift, welche Farbe, welches Zeichen | Art Direction in 9 und 10; Feinwünsche über `system.spielraum` nach dem Reveal |
| Welches Foto von Ihnen, welcher Ausschnitt | Kontaktbogen des Teams in 11 |
| Worüber Sie posten wollen, welche Säulen, welche Tage | Serien, Themenvorrat, `cue`, Regeln in 12 |
| Du oder Sie, in jedem späteren Schritt | `hmAnrede` aus 2.15 |
| Darf dieser Beleg, dieses Zitat öffentlich werden | 4.13, 4.24 und 7.2, nie erneut |
| Gefällt es Ihnen | nie; die Rückmeldung läuft entlang des Vertrags (15.4 bis 15.10) |

---

## 3. Was aus dem heutigen Fragebogen wird

Grundlage: `bestand/FRAGEN_WIRKUNG_IST.md` (50 Frage-Screens, 8 Freitext-Zusätze, 6 Bildpaare, zusammen 64 Antwortfelder) und `02_fragebogen.md` 4.2. "Wirkung heute" ist die Stufe aus der Bestandsaufnahme.

**Bilanz der 50 Frage-Screens.**

| Verbleib | Anzahl | Fragen |
|---|---|---|
| umgebaut im Fragebogen behalten | 17 | abschluesse, belege, hindernis, ausloeser, seite, unity, worte, erfolge, privat, tabus, anrede, zeit, formate, kanaele, ziel, cue, abgeraten |
| durch eine bessere Methode ersetzt | 12 | s1 bis s5, sichtbar, kamera, vorbilder, fremdbild, bildpaare, behalten, kundensatz |
| aus dem Dossier bestätigt oder gerechnet | 7 | seit, immotypen, bezirke, graetzl, graetzl_anteil, bestand, follower |
| in Workshop oder Auftakt verlegt | 5 | herkunft, aufgewachsen, wendepunkt, fehler, verfuegbar |
| ersatzlos gestrichen oder nur noch abgeleitet | 9 | milieus, phasen, gefuehl, ideal, fokus, archetyp, assets, gruende, werte |

Neu im Fragebogen, ohne Vorgänger: `alternative` (2.4), `alternativeKonnte` (2.5), `leiter` (2.8, 2.9), `empfehler` (2.12) und `kundeSatz` am Fall (2.11, Nachfolger des nie gelesenen `phasen_frei`).

### 3.1 Gestrichen oder nur noch abgeleitet

| v1-Key | Frage heute | Wirkung heute | Grund |
|---|---|---|---|
| milieus | Zwei Wohnwelten | mittel, über die Figur-Rangliste und einen Satz in der Zielgruppe | Selbstzuordnung zu Schablonen; die Zielgruppe entsteht jetzt aus Fällen, Anlässen und Ort (2.3, 2.10, 2.1) |
| phasen | Lebensphase | schwach, nur ein Einschub bei "Erste Wohnung" | wirkte fast nie; die Lebensphase kommt aus dem Fall (2.11, 4.4) |
| gefuehl | Wie soll sich der Kunde fühlen | schwach | Wunschbild ohne Beleg; der Nutzen kommt aus der Wert-Leiter (2.8) |
| ideal | Drei Wörter in einem Jahr | stark, der Freitext wurde roh zum Rollennamen | doppelt zu `ziel` (Befund 5); Zukunftsfragen liefern Wunschbilder; die Rolle entsteht aus Zitaten und Belegen in 7 |
| fokus | Reichweite oder Bestand sichern | schwach | doppelt zu `ziel`; Namenskollision mit `w.fokus` (Befund 9) |
| archetyp | Welche Figur sind Sie | stark, +18 Punkte, überstimmte fast alles | die Selbstzuordnung entschied Hooks, Säulen, Palette und Schrift (Befund 4); die Richtung kommt jetzt aus Territorien mit Gate 1 |
| assets | Wiedererkennbares Zeichen | stark, verschob nur die Welt | das Zeichen ist Arbeit des Teams in 9; die häufige Antwort "eine Farbe" widerspricht dem Grundsatz, dass Farbe nie allein ein Code ist |
| gruende | Warum Kunden Sie gewählt haben | mittel | Selbsteinschätzung aus einer Liste misst Erwünschtheit; abgeleitet aus den Ausschlägen in 2.3; "Empfehlung von Bekannten" wandert nach 2.12 |
| werte | Was treibt Sie an, zwei Werte | stark | eine Werteliste misst Erwünschtheit; Werte kommen aus Wert-Leitern und Workshop (2.8, 2.9, 4.3, 4.21) |

### 3.2 Aus dem Dossier statt gefragt

| v1-Key | Frage heute | Wirkung heute | Neu |
|---|---|---|---|
| seit | Seit wann Makler | mittel | aus Website oder LinkedIn, bestätigt in 2.1 |
| immotypen | Welche Objekte wirklich | stark | aus dem Feld Art im Bestand, bestätigt in 2.1 |
| bezirke | Ihre Gegenden | stark, aber nur die ersten drei in Klickreihenfolge genutzt | Rang aus den Postleitzahlen im Bestand, bestätigt in 2.1 |
| graetzl | Grätzl mit den meisten Straßennamen | stark | aus den Straßen aller Objekte, bestätigt in 2.1 |
| graetzl_anteil | Anteil der letzten zehn Abschlüsse dort | mittel | gerechnet aus verkauften Objekten (`vorab.kennzahlen.graetzlAnteil`), nie mehr geschätzt |
| bestand | Was existiert schon | keine | aus Konten, Material und Lead-Radar |
| follower | Follower im stärksten Kanal | keine | aus Insights oder Screenshot, nur intern |

### 3.3 Durch eine bessere Methode ersetzt

| v1-Key | Frage heute | Wirkung heute | Neu | Grund |
|---|---|---|---|---|
| s1 bis s5 | Fünf Regler: aufrichtig oder aufregend, kompetent oder nahbar, ruhig oder energisch, klassisch oder modern, zurückhaltend oder meinungsstark | mittel, meist von der Figur überstimmt | Stimmproben an echten Sätzen (2.17) | Regler ziehen zum Startwert und messen Selbstbild statt Text |
| sichtbar | Zuletzt vor Publikum oder Kamera | schwach | Formate in drei Zuständen (2.20) und Probedreh (4.23) | Verhalten vor der Kamera wird gemessen statt erinnert |
| kamera | Wohl vor der Kamera | mittel, Formate wurden nicht gefiltert | wie sichtbar | drei Fragen maßen dieselbe Größe (Befund 5) |
| vorbilder | Account, der gefällt | keine | "Nicht ich" (3.8) | positive Referenzen fixieren den Entwurf; ein Gegenbeispiel liefert ein Verbot ohne Kopiergefahr |
| fremdbild | Drei Menschen für Fremdbild-Fragen | keine, Kontaktdaten Dritter ohne Versand | Link, den der Makler selbst teilt, nur mit Zweck 3 | Daten Dritter ohne Zweck und Prozess (Befund 10) |
| bildpaare | Sechs Bildpaare | stark, aber Farbflächen mit einem Wort statt Fotos | Paarsatz aus eigenem Shooting, je eine Variable (3.1 bis 3.5) | die alten Paare variierten mehrere Dinge zugleich, bp2 zeigte den verbotenen Handschlag, jede Antwort a zählte als warm |
| behalten | Erscheinungsbild behalten | keine, Branding ignorierte die Antwort | Urteil am echten alten Logo mit zwei Optionen (3.6, 3.7) | blinde Auswahl ohne das Logo vor Augen |
| kundensatz | Wie Sie der letzte Kunde beschrieben hat | stark | echte Kundenstimmen aus `vorab.kundenstimmen` mit Freigabe und Fremdbild | echte Stimmen statt Erinnerung |

### 3.4 In Workshop oder Auftakt verlegt

| v1-Key | Frage heute | Wirkung heute | Neu | Grund |
|---|---|---|---|---|
| herkunft | Wie dazu gekommen | schwach, Option "Anders" ohne Textfeld | 4.9 | Tiefe entsteht im Gespräch |
| aufgewachsen | Wo aufgewachsen, erster Kontakt mit Immobilien | stark, aber optional | 4.9 | doppelt zu herkunft (Befund 5); im Workshop geschützt, fällt nie weg |
| wendepunkt | Kurz vor dem Aufhören | mittel, optional | 4.10 | Geschichte mit Spannung braucht Nachfragen |
| fehler | Beruflicher Fehler | mittel, optional | 4.14 | Stoff für den unbequemen Teil, steht immer nach den Belegen |
| verfuegbar | Wann passen Drehtage | schwach, die Drehtag-Planung las die Antwort nicht | Wochentage im Auftakt (1.2) | gehört in die Terminplanung |

### 3.5 Umgebaut im Fragebogen behalten

| v1-Key | Wirkung heute | Neu | Was sich ändert |
|---|---|---|---|
| abschluesse | stark | 2.3 `faelle` | Fakten kommen aus dem Bestand, gefragt wird nur der Ausschlag und je Fall eine prüfbare Zahl |
| belege | stark, aber optional | Zahlenfelder in 2.3, Rechnung und Unterlage in 4.11, 4.13 | doppelt zu abschluesse (Befund 5); Zahl und Ausschlag gehören an denselben Fall |
| hindernis | stark | 2.7 | an Fall 1 gebunden |
| ausloeser | stark, Freitext ohne Wirkung | 2.10 | eigene Worte zählen als Anlass |
| seite | stark, Regler mit Startwert 50, Fehler bei Wert 0 | 2.2 | sieben Stufen ohne Startwert, als Frage nach den letzten zehn Aufträgen |
| unity | stark | 2.13 | unverändert kurz, einziger Erzeuger; der Workshop vertieft nur (4.12) |
| worte | stark, nur 25 bekannte Wörter wirkten | 2.16 | als Selbstbild der Arbeit, Gegenstück zum Fremdbild |
| erfolge | mittel, Skala | 2.18 | Verhalten am Fall statt Selbsteinschätzung |
| privat, tabus | schwach und mittel, widersprüchliche Wahl möglich | 2.19 | eine Liste mit zwei Zuständen, eigener Text wird im Workshop als Regel bestätigt (4.20) |
| anrede | stark, pauschal | 2.15 | je Kanal, eine Funktion für alle Abnehmer |
| zeit | mittel | 2.21 | Dreh und Freigabe ausdrücklich eingerechnet |
| formate | stark | 2.20 | drei Zustände, ersetzt die Kamera-Frage |
| kanaele | stark, Zwangsrangfolge aller fünf Kanäle | 2.14 | vorbelegt aus Konten, mit "nutze ich nicht" |
| ziel | schwach, zwei von fünf Optionen wirkten | 2.23 | das Merkmal wird Erfolgsmaß des Vertrags |
| cue | mittel | 2.22 | wird Sendetag der Signatur-Serie |
| abgeraten | stark, aber optional am Ende | 2.6 | Pflicht im ersten Drittel des Bogens (Befund 1) |

### 3.6 Freitext-Zusätze und alte Bildpaare

| Feld | Wirkung heute | Neu |
|---|---|---|
| immotypen_frei, bezirke_frei | keine, bezirke_frei nur als Fallback | entfällt; Korrektur direkt in der Bestätigung (2.1) |
| gruende_frei | keine, nur roh im Dossier | entfällt; der Ausschlag steht am Fall (2.3) |
| ausloeser_frei | keine | eigene Worte zählen als Anlass (2.10) |
| sichtbar_frei | keine | entfällt; Probedreh (4.23) |
| phasen_frei | keine, obwohl bester Zielgruppensatz | `kundeSatz` am Fall (2.11) |
| tabus_frei | keine, eigene Grenzen wurden übergangen | `grenzenFrei` (2.19), im Workshop als Regel bestätigt (4.20) |
| ziel_frei | keine, der Leitfaden fragte erneut | `zielMerkmal` (2.23), wird Erfolgsmaß |
| bp1 bis bp6 | mittel, jede Antwort a zählte als warm | ersetzt durch den Paarsatz 3.1 bis 3.5 |

---

## 4. Bilanz für den Makler

| | heute | Prozess v2 |
|---|---|---|
| Fragebogen | 44 Pflicht-Screens, 6 optional; angezeigt "Achtzehn Minuten", nicht gemessen | 23 Fragen in 27 Screens, Ziel unter 15 Minuten (Setzung, gemessen in `fragebogen.messung`) |
| Bildwahl | sechs Paare aus Farbflächen im Fragebogen | vier Fotopaare und eine Schriftprobe, dazu das echte Logo, rund 3 Minuten |
| Fragen ohne Wirkung | 12 Antwortfelder ohne Wirkung, dazu 9 schwache | keine; jede Zeile oben hat ein Zielfeld mit Abnehmer |
| stärkste Fragen | optional am Ende (Kapitel 6) | im ersten Drittel (2.3, 2.5, 2.6) |
| Gestaltungsaufgaben | Logo-Typ, Schrift, Akzentfarbe, Welt | keine |
| Urteil über die Marke | Freigabe je Beitrag nach "Passt das so?" | Urteil je Vertragskriterium am Tag nach dem Reveal |
