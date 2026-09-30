# Schritt 14. Markenbuch und Gate 2 (`markenbuch`)

Stand 30.09.2026, vierte Fassung. Entwurf für Branding v2, STATUS Punkt 4 und 5. Grundlage: `00_ZERLEGUNG.md` (Vertrag dieses Schritts und der Nachbarn), `bestand/KETTE_IST.md`, `bestand/FRAGEN_WIRKUNG_IST.md`, `research/R1` bis `R8`, die Schrittdokumente `01` bis `13` und `15` bis `17`, `docs/werkbank/MARKE_SCHEMA.md`, `docs/werkbank/MARKENQUALITAET.md`, Code in `ui_kits/werkbank/wb-markenbuch.jsx`, `wb-material.jsx`, `wb-plattform.jsx` (`hmMarkenQualitaet`, `hmPlattformSpeichern`), `wb-markenwelten.jsx`, `wb-werkzeuge.jsx`, `wb-store.jsx` und `api/wb-marke.js`.

**Lesart.** *Belegt* heißt: steht in einer Quelle mit URL oder in einer genannten Datei mit Stelle. *Ableitung* heißt: eigene Folgerung. *Setzung* heißt: bewusst gewählter Startwert, der an den ersten fünf Maklern gemessen und ersetzt wird. *Lücke* heißt: wir wissen es nicht. *Beispielwert* heißt: ein Datum oder eine Zahl, die nur das Beispiel am Fall Markus anschaulich macht und im Betrieb aus den Daten gerechnet wird. Aussagen über Markus Leitner stammen aus dem Seed `markus` (`wb-store.jsx` Zeile 72 und 101 bis 104) und den Beispielen der Schrittdokumente 1 und 4 bis 13. Wo ein Schrittdokument vom Musterbeispiel in `MARKENQUALITAET.md` Kapitel 5 abweicht, gilt das Schrittdokument: Claim "Rat vor Auftrag." (08, Empfehlung, Wahl steht aus), Bio je Kanal in `botschaften.bio` (08), Signatur-Serie "Zeitwert" und die übrigen Serien aus `12_social.md` 3.15. Das Musterbeispiel ist für Markus nur noch Schablonenkorpus.

**Was diese Fassung ändert.** Die Reveal-Folge folgt jetzt den zehn Akten aus `15_reveal.md` 3.4 (in früheren Fassungen von 15 Abschnitt 3.3); eine Änderung nach Gate 2 ist wie in Schritt 15 geregelt (Termin auf der gezeichneten Version, Änderung als Hinweis, Rückzug nur durch den CD); die Frist liegt drei Werktage vor dem Reveal; Belegungsplan, Anrede-Aufruf und Beispiel lesen die Verträge der Schritte 8, 12 und 13; die Abnahme von Redaktionsversionen ist geregelt; das Markenbuch ist als gestaltetes Objekt spezifiziert (3.4.1 bis 3.4.5); jeder Ausgang hat einen benannten Weg zu seinem Abnehmer (5.3).

---

## 0. Kurzfassung

Schritt 14 schreibt fast nichts Neues. Er **montiert** die abgenommenen Ergebnisse der Schritte 5 bis 13 zu einem Markenbuch, **prüft** sie als Ganzes, wie es kein einzelner Schritt kann, und lässt den Creative Director erst abzeichnen, wenn harte Schwellen halten. Der Makler hat in dieser Zeit keinen Kontakt; er sieht, dass seine Marke in der Endkontrolle ist und wann der Reveal stattfindet.

Die gewählte Lösung in sechs Sätzen:

1. Das Markenbuch ist eine Montage mit Verweisen, kein Dokument mit Kopien: Jeder Satz, jede Farbe und jede Kachel auf jeder Seite kommt über einen **Belegungsplan** aus genau einem Feld eines Vorgängers, und eine Regel prüft das auf jeder Seite.
2. Es hat drei Schichten: **den Weg** (Kapitel 1 mit den verworfenen Einsichten, Richtungen und Ideen, aus deren Gründen gebaut, Varianten nur als Render auf seinem Foto), **den festen Kern und den offenen Teil** (aus den Sperrstufen abgeleitet, jeder offene Punkt mit echten Beispielen) und **Sichten je Rolle** mit einer Seite für Eilige, die in fünf Minuten geprüft wird. Gesetzt ist es als eigenes Objekt im Raster seiner Marke: digital und A4, fünf Seitentypen, Umschlag mit der Wortmarke in Anwendung, Anwendung vor Regel auf jeder Doppelseite.
3. **Satzweise Redaktion schreibt in die Quelle zurück**, als neue Version des Vorgängerobjekts, mit Grund; die Version gilt als abgenommen, wenn die Prüffunktion des Ursprungsschritts besteht, und die Montage führt ihre Bindung nach, ohne sich selbst zu sperren. Was der Makler bestätigt hat oder was wörtlich von ihm stammt, ist in der Redaktion gesperrt.
4. Die **Qualitätsprüfung** hat zwölf Kriterien in Text und Gestalt, siebzehn harte Sperren und einen Kohortenvergleich in Text und Bild gegen alle anderen UNIO-Makler und gegen die eigenen Schablonen der Werkbank; sie ist an Ankerfällen geeicht, damit 95 von 100 wieder etwas bedeutet.
5. **Gate 2** hat fünf Teile (Schwellen, Lautlese-Test, Zahlenprüfung, Lückenliste mit Termin, Checkliste der Leitfragen), keinen Knopf zum Übersteuern und bindet sich an Version und Prüfsumme der Montage. Ändert sich danach eine Quelle, zeigt der Reveal weiter die gezeichnete Version und das Team sieht die Änderung als Hinweis; sperren kann danach nur der CD, indem er Gate 2 mit Grund zurückzieht.
6. Am Ende stehen ein **Materialpaket ohne Platzhalter** und der **Entwurf der Reveal-Folge** in den zehn Akten von Schritt 15; ohne abgezeichnetes Gate 2 spätestens drei Werktage vor dem Termin gibt es keinen Reveal, der Termin wird dann verschoben und nicht mit einem Zwischenstand gehalten.

---

## 1. Ziel und Erfolgskriterium

### 1.1 Ziel

Alles aus den Schritten 5 bis 13 in ein Markenbuch fügen, das drei Aufgaben erfüllt: den Weg zur Marke erzählen, einschließlich der verworfenen Richtungen (G14 der Zerlegung, Labor Illusion: https://doi.org/10.1287/mnsc.1110.1376); jedem, der mit der Marke arbeitet, genau das zeigen, was er braucht (Koto, Barkas und SDG gliedern Richtlinien nach Nutzern und trennen einen festen Kern von einem offenen Teil: https://the-brandidentity.com/interview/presented-by-brandpad-how-to-create-successful-brand-guidelines-with-koto-london-barkas-and-sdg); und als Prüfstand dienen, an dem der Creative Director nach dokumentierten Schwellen abzeichnet, bevor der Makler etwas sieht (MARKENQUALITAET Kapitel 2).

Warum der Schritt heute nicht hält (belegt, KETTE_IST 2.8 und 3): Die Freigabe schreibt nur einen Status und keine Version; ohne gespeicherte Plattform wird das Markenbuch bei jedem Aufruf neu erzeugt (`wb-markenbuch.jsx` Zeile 13 bis 19 und 64); "Bereit zur Freigabe" gilt ab 75 statt 80, und nur Klischees sperren (Zeile 63 und 64); kein Satz lässt sich redigieren; auf derselben Seite stehen bei Markus zwei Claims; die Welt-Wahl überschreibt Schrift und Website-Look ohne Statuswechsel (Zeile 115); das Materialpaket exportiert Demo-Objekte und Fülltexte als PNG (`wb-material.jsx` Zeile 71 bis 90) und dazu alle drei Katalog-Logotypen (`HM_LOGO_TYPEN`, Zeile 84).

### 1.2 Was hier ein Markenbuch ist

Ein Markenbuch ist in dieser Kette **eine Ansicht auf die Quelle, keine zweite Quelle**. Engel & Völkers nennt sein Markenportal die "single source of truth" für Social Media, Shops und Print (https://www.martechoutlook.com/cxoinsights/lara-maier-nid-3935.html); Frontify beschreibt maschinenlesbare Richtlinien, in denen jeder Wert seinen Grund trägt und verbindliche Regeln von Ermessen getrennt sind (https://www.frontify.com/en/guide/brand-guidelines-for-ai). Daraus folgt für die Werkbank (Ableitung): Das Markenbuch enthält nur vier Arten von Inhalt.

| Art | Beispiel | Woher |
|---|---|---|
| Verweis | Claim, Positionierungssatz, Farbe, Kachel | ein Pfad in einem abgenommenen Vorgängerobjekt, über den Belegungsplan |
| Gerechnet | "[k] von [n] Zahlen gegen Unterlagen geprüft" (Beispielwert etwa fünf von sieben), Anzahl verworfener Varianten | Regeln aus den Vorgängerdaten und aus Gate 2 |
| Verbindung | ein Satz, der zwei Verweise zu einem Weg verbindet ("Geblieben ist diese:") | Claude oder Regel, ohne eigene Behauptung, jede Aussage mit Quellenpfad |
| Rolle | "Diese Seite ist für Ihre Druckerei." | feste Einleitung je Rolle |

Was keine dieser Arten ist, steht nicht im Markenbuch. Damit ist ausgeschlossen, dass im Markenbuch ein Text entsteht, der in keinem Vorgänger steht und darum auch keiner Prüfung dieses Vorgängers unterliegt.

### 1.3 Erfolgskriterium

**Hart (bei jedem Makler, automatisch oder per Abzeichnung geprüft):**

| Nr. | Kriterium | Prüfung |
|---|---|---|
| E1 | Jeder sichtbare Text und jeder Farbwert jeder Seite hat genau einen Quellenpfad im Belegungsplan; kein Text ohne Pfad | Q2, Sperre S9 |
| E2 | Auf allen Seiten, Rollen und Anwendungen steht genau ein Claim (Zeichen für Zeichen gleich `botschaften.claim`), eine Palette (nur Werte aus `system.tokens`) und eine Anrede je Kontext (aus `hmAnrede(mid, kontext, opt)`, Schritt 8); der Claim trifft keine Schablone | Q3 bis Q5, Q16, Sperren S2 bis S4, S17 |
| E3 | Kapitel 1 nennt die gewählte und die zwei verworfenen Einsichten, die drei Territorien und mindestens sechs geprüfte Varianten der Idee, je mit dem Grund aus dem Quellfeld; jede Variante erscheint nur als Wandtest-Render auf seinem Foto; die Makler-Sicht besteht die Sprachregel (3.5) | Q6 |
| E4 | Jede öffentliche Zahl ist gegen eine Unterlage geprüft oder als Angabe des Maklers mit Unterlage und Termin vor dem Live-Tag vermerkt; jede Kundenstimme ist wörtlich, mit Datum und Freigabe | Q8, Q9, Sperren S5, S6 |
| E5 | Gate 2 ist nur abgezeichnet, wenn die Gesamtnote mindestens 80 beträgt, kein Kriterium unter 60 liegt, keine Klischees und keine harte Sperre offen sind, der Lautlese-Test durch ist und jede offene Lücke Termin und Verantwortlichen hat | Gate-Knopf gesperrt, Selbsttest |
| E6 | Die Abzeichnung trägt Version und Prüfsumme der Montage; der Reveal liest nur diese Version; ändert sich danach eine Quelle, entsteht ein Hinweis in `gate2.neuereQuellen[]`, nie eine stille Änderung im Termin | Q14 |
| E7 | Das Materialpaket enthält keinen Platzhalter, kein Demo-Objekt, kein Katalogteil und keine Datei ohne geklärte Rechte | Q10, Sperre S11 |
| E8 | Kein Satz, keine Kachel und kein Zeichen liegt über den Kohortenschwellen in Text und Bild | Q11, Q12 |
| E9 | Eine Person ohne Projektbezug beantwortet mit der Seite für Eilige fünf Prüffragen in höchstens fünf Minuten richtig | Fünf-Minuten-Test |

**Weich (Zielwerte, alle Setzung, an den ersten fünf Maklern messen):**

- Gate 2 ist bei mindestens vier von fünf Maklern drei Werktage vor dem Reveal abgezeichnet, ohne den Termin zu verschieben.
- Teamzeit für den Schritt je Makler höchstens 3,5 Stunden mit Claude, davon Creative Director höchstens 30 Minuten (MARKENQUALITAET Kapitel 2 nennt etwa 30 Minuten), gemessen in `markenbuch.messung`.
- In der Rückmeldung zum Reveal (Schritt 15) betrifft keine Anmerkung einen Fehler, den Gate 2 hätte finden müssen (falsche Zahl, zweiter Claim, fremdes Objekt, falsche Anrede). Das ist der eigentliche Wirkungsnachweis.
- Übereinstimmung der zwei Gestalter im Gestalt-Urteil G6 innerhalb von 20 Punkten bei mindestens vier von fünf Maklern.

---

## 2. Geprüfte Alternativen und warum verworfen

| Nr. | Alternative | Was dafür spricht | Warum verworfen | Was davon bleibt | Quellen |
|---|---|---|---|---|---|
| A1 | **Markenbuch als Dokument und Paket, wie heute:** gestaltete Seiten, "Als PDF sichern", Materialpaket als ZIP aus den Vorschauen | vertraut, druckbar, schnell gebaut | Eine Datei ist eine Kopie. Sie trennt das Buch von der Quelle, kann sich nach der Freigabe nicht mehr ändern, aber auch nicht mehr mitwachsen, und exportiert genau das, was auf dem Bildschirm steht, also heute Demo-Objekte, Fülltext und Katalog-Logos (KETTE_IST 2.8). Richtlinien wandeln sich vom Regelwerk zum Werkzeug, gegliedert nach Nutzern und gepflegt von denen, die sie benutzen. | Druckfassung je Rolle als abgeleitete Ansicht der abgezeichneten Version | https://the-brandidentity.com/interview/presented-by-brandpad-how-to-create-successful-brand-guidelines-with-koto-london-barkas-and-sdg; KETTE_IST 2.8 |
| A2 | **Externe Guidelines-Plattform** (Frontify, Brandpad, Corebook) als Markenbuch | Sicht je Rolle, Vorlagen mit Sperren, Asset-Bibliothek, Nutzungsauswertung, bei Corebook sogar eine Anbindung an Sprachmodelle | Jedes Werkzeug bringt dem Makler einen weiteren Login und dem Team eine zweite Datenablage; die Quelle läge dann doppelt. Die Plattformen sind Übergabewerkzeuge und liefern keine Prüfung gegen die Kohorte und keine Prüfung, ob ein Satz auf einen anderen Makler passt. Die Rubrik schließt Konten des Maklers bei fremden Werkzeugen aus. | Sicht je Rolle, Downloads am Ort der Regel, "warum" an jedem Wert, lebendes Dokument | https://www.frontify.com/en/brand-portal; https://brandpad.io/; https://www.corebook.io/studio; R8 Abschnitt 2.7 und 5; R4 1.5 |
| A3 | **Nur ein Begründungsbuch nach Paul Rand:** eine lineare Erzählung, die Schritt für Schritt zur Lösung führt, ohne Rollen | das stärkste bekannte Muster, Arbeit sichtbar zu machen; Rand legte für NeXT ein Buch von rund 100 Seiten vor | Eine Assistenz oder eine Druckerei liest keine Herleitung, sie braucht eine Regel in fünf Minuten; Leitfäden sollen auch Laien verstehen, und Einhaltung muss der bequemste Weg sein. Wer nur erzählt, zwingt jeden Nutzer durch die ganze Geschichte. | Kapitel 1 "Wie wir zu dieser Marke gekommen sind" in genau dieser Haltung, als erste Schicht | https://www.logodesignlove.com/next-logo-paul-rand; https://the-brandidentity.com/interview/presented-by-brandpad-how-to-systemise-a-brand-featuring-pentagram-how-how-and-studio-blackburn; R8 4 Nr. 10 |
| A4 | **Freigabe nach einer Gesamtnote oder nach Gefühl**, wie heute: "Bereit" ab 75, sperren nur Klischees; oder der CD entscheidet ohne Schwellen | schnell, flexibel, der CD trägt ohnehin die Verantwortung | Die heutige Skala ist oben gesättigt: Musterbeispiel und Regelausgabe erreichen 95, obwohl der Regelpfad Schablonensätze und das Markenbuch Demo-Objekte enthält (KETTE_IST 2.5). Eine Gesamtnote verdeckt einzelne harte Fehler. Gestalter bauen Begründungen oft nachträglich; eine Freigabe ohne Schwellen lädt genau dazu ein. | die Schwellen aus MARKENQUALITAET (80, keins unter 60, keine Klischees), erweitert um harte Sperren und Gestalt | KETTE_IST 2.5; https://designobserver.com/on-design-bullshit/; MARKENQUALITAET Kapitel 2 |
| A5 | **Claude als Endprüfer mit automatischer Korrektur**, wie heute in der Schlussprüfung (`api/wb-marke.js` Zeile 269: Korrekturen werden übernommen, wenn der alte Text am Pfad passt) | spart Teamzeit, findet Floskeln und Anredefehler zuverlässig | Menschliche Kontrollpunkte bleiben bei maschinenlesbaren Richtlinien Pflicht. Sprachmodelle heben das einzelne Ergebnis und machen die Ergebnisse vieler Nutzer einander ähnlicher; ein Modell, das alle Markenbücher glättet, verstärkt genau diese Nähe. Eine stille Korrektur ändert zudem Sätze, die der Makler bestätigt hat. Die Debatte um Pentagram und performance.gov zeigt das Reputationsrisiko, wenn KI sichtbar Handwerk ersetzt. | Claude als Vorprüfer: Korrekturen werden Vorschläge in der Redaktion, der Stratege nimmt an oder lehnt ab | https://www.frontify.com/en/guide/brand-guidelines-for-ai; https://www.science.org/doi/10.1126/sciadv.adn5290; https://academic.oup.com/pnasnexus/article/5/3/pgag042/8529001; https://gdusa.com/pentagram-federal-website-generates-ai-controversy/ |
| A6 | **Der Makler sieht und kommentiert den Entwurf vor dem Reveal**, etwa mit Pins auf den Seiten nach dem Muster von Markup.io | frühe Beteiligung, weniger Überraschung, Eigentumsgefühl | Der erste Blick auf die fertige Marke gehört in den geführten Reveal, damit Reaktionen eingeordnet werden können; ein Reveal per Link oder Video ist ausdrücklich nicht gewollt. Menschen, die am Bestehenden hängen, bewerten Neues zunächst schlechter, je stärker es sich ändert; ein unbegleiteter Erstkontakt verstärkt das. Die frühe Beteiligung gibt es schon, roh und an der Richtung (Schritt 6) und am Maßstab (Schritt 7). | Pins mit Einordnung als Beobachtung, Frage oder Änderung, aber erst in der Rückmeldung von Schritt 15 | R8 Abschnitt 5; https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1998809; https://www.markup.io/; https://developments.media/interviews/liza-enebeis |
| A7 | **Bildähnlichkeit der Kohorte über einen externen Bilddienst** (Embedding-API), der Feeds und Porträts vergleicht | misst "sieht aus wie" direkt, ohne Handarbeit | Porträts und Kundenobjekte würden an einen Dritten gehen, ohne dass eine Einwilligung diesen Zweck deckt (`auftrag.einwilligungen` kennt ihn nicht). Die Werkbank läuft ohne Build im Browser. Und ein Embedding misst Ähnlichkeit von Motiven, nicht von Grammatik: Zwei Makler mit gleicher Kadrierung und gleichem Zeichen, aber verschiedenen Häusern, wären "unähnlich". | ein Strukturabdruck aus den Systemdaten, ein Rastervergleich der eigenen Renders im Browser und ein Blindtest durch das Team | R4 offene Frage 4 (Blindtest); `auftrag.einwilligungen` in 01_auftakt; R4 1.2 |

---

## 3. Die gewählte Lösung

### 3.1 Prinzip

**Montieren, prüfen, redigieren, abzeichnen, nichts neu erfinden.** Die Vorgänger haben je ihre eigenen Prüfungen (etwa R1 bis R9 in Schritt 7, Wandtest und Austauschtest in Schritt 9, Kontrast und Stresstest in Schritt 10). Schritt 14 prüft, was nur das Ganze zeigt: ob überall dieselbe Quelle gilt, ob ein Satz inzwischen auf einen anderen Makler passt, ob eine Zahl irgendwo ohne Beleg auftaucht, ob eine Kachel neben einer Kachel eines anderen UNIO-Maklers austauschbar wirkt, und ob die Anwendungen das echte Geschäft zeigen.

Drei Entscheidungen machen den Unterschied zu heute und zu Standardwerkzeugen (Ableitung):

1. **Verweis statt Kopie.** Jede Stelle im Buch ist ein Slot mit genau einem Pfad. Damit sind zwei Claims auf einer Seite technisch unmöglich, nicht nur verboten, und eine Korrektur ändert alle Stellen zugleich.
2. **Redaktion schreibt zurück.** Wer einen Satz ändert, ändert ihn in seinem Ursprungsobjekt, als neue Version mit Grund, und dessen Prüfungen laufen neu. Besteht die Prüfung, ist die Version abgenommen; sonst bleibt die alte Version gültig (3.8). Das Markenbuch bleibt Ansicht.
3. **Gate 2 hält ohne Ausnahme.** Es gibt keinen Knopf "trotzdem freigeben". Hält der CD eine Note für falsch, ist das ein Kalibrierungsfall für die Rubrik (3.9.6), nicht eine Freigabe nach Gefühl.

### 3.2 Ablauf

| Stufe | Wer | Was passiert | Dauer (Setzung, gemessen in `messung`) |
|---|---|---|---|
| 14.1 Montage | Regeln | liest die jeweils zuletzt abgenommene Version der Objekte aus 5 bis 13, schreibt `basis` (Schritt, Objekt, Version, Prüfsumme), baut den Belegungsplan und die Kapitel. Fehlt eine Abnahme, steht der Schritt auf "wartet auf Schritt n" und nennt das Feld | Sekunden |
| 14.2 Prüfung | Regeln | Rubrik mit den automatisch messbaren Teilen, harte Sperren, Zahlenliste, Lückenliste, Kohorte in Text und Bild, Platzhaltersuche im Materialpaket | unter einer Minute |
| 14.3 Vorprüfung und Kapitel 1 | Claude (ohne Claude: Regeln) | Vorschläge für die Redaktion mit Pfad, Satz, alt, neu, Grund; Entwurf der Verbindungssätze von Kapitel 1 und der Punkte für die Seite für Eilige | etwa zwei Minuten |
| 14.4 Redaktion | Stratege | Vorschläge annehmen oder ablehnen, Sperren lösen (meist im Ursprungsschritt), Lücken mit Termin und Verantwortlichem versehen | 60 Minuten mit Claude, 90 ohne |
| 14.5 Zahlen und Stimmen | Stratege | jede öffentliche Zahl gegen die Unterlage legen oder als Angabe des Maklers mit Termin vermerken; Kundenstimmen wörtlich abgleichen | 20 Minuten |
| 14.6 Gestalt und Leser | zwei Gestalter getrennt; eine Person ohne Projektbezug | Gestalt-Urteil G6 je 15 Minuten; Blindtest und Fünf-Minuten-Test mit der Seite für Eilige, zusammen 10 Minuten | 40 Minuten Teamzeit |
| 14.7 Lautlese | Creative Director | Claim, Versprechen, Story kurz, Bio, die drei Hooks der ersten Woche, Text im Bild der ersten drei Kacheln, Beispielzitat der Presse laut lesen, Satz für Satz | 10 Minuten |
| 14.8 Abzeichnung | Creative Director | Checkliste der sechs Leitfragen, Befunde der Stufen 14.2 bis 14.7 sehen, abzeichnen oder zurückgeben | 10 bis 20 Minuten |
| 14.9 Reveal-Entwurf | Stratege | `praesentation.entwurf` in den zehn Akten aus `15_reveal.md` 3.4 prüfen: Inhaltsverweise vollständig, Fremdtest nur mit Grundlage (3.12) | 15 Minuten |
| 14.10 Status | Regeln | Statuskarte beim Makler auf "Endkontrolle" und nach der Abzeichnung auf "fertig geprüft" | sofort |

**Takt.** Die Montage startet, sobald Schritt 13 abgenommen ist. Gate 2 muss spätestens **drei Werktage vor dem Reveal** abgezeichnet sein, weil Schritt 15 an diesem Tag aus `praesentation.entwurf` und dem gezeichneten Stand den Ablauf baut (`15_reveal.md` 3.3, Zeile "3 WT vorher"); die Einladung fünf Werktage vorher enthält keine Vorschau und hängt darum nicht an Gate 2. Die drei Werktage selbst sind eine Setzung aus Schritt 15. Ist die Frist nicht zu halten, wird der Reveal verschoben. Der Makler bekommt dann einen neuen Termin mit einem ehrlichen Satz als Grund, nie einen Zwischenstand (Rubrik Erlebnis: nie ein Zwischenstand mit fremden Objekten oder Fülltext). Das folgt derselben Regel wie Schritt 1 für den Mitentscheider: lieber verschieben als ohne Grundlage halten.

**Daten nur gelesen, nie gesetzt.** Schritt 14 schreibt kein Datum in Text, Karte oder Code. Jedes Datum kommt aus `auftrag.termine` (bis zum Reveal gerechnet von `hmAuftragTermine` in Schritt 1, danach von `hmRolloutPlan` in Schritt 16). Die Frist rechnet `hmGate2Frist(mid)`: der dritte Werktag vor `auftrag.termine.reveal.datum`, gezählt ohne Wochenende und ohne `HM_FEIERTAGE` über die neue Schwester `hmWerktageMinus(iso, n)` zu `hmWerktagePlus` (`wb-shop2.jsx` Zeile 27; `hmWerktagePlus` zählt nur vorwärts). Schritt 1 nennt die Frist nicht selbst, sondern liest sie aus dieser Funktion (5.6).

**Abstand zum Porträt-Termin.** Gate 2 ist ohne die Bilder des Porträt-Termins nicht bestehbar, sobald `auftrag.termine.portraet` den Status "vorgemerkt" oder "bestätigt" hat (Befund 11 in 3.15, Mindeststand in 3.10.1). Zwischen Porträt-Termin und `gate2.frist` liegen deshalb mindestens **zwei Werktage** für Kontaktbogen und Auswahl in 11, Belegung in 13 und Redaktion in 14 (Setzung, gemessen in `messung`). Hält der Plan aus Schritt 1 diesen Abstand nicht, meldet `hmGate2Pruefen` das schon bei der Montage als Befund "Plan hält nicht" an das Team, nicht erst zur Frist. Den Puffer für die Schritte 9 bis 11 zwischen Wort-Link und Porträt-Termin rechnet Schritt 1 ein (5.6); 14 prüft nur das Ergebnis.

**Wenn der Porträt-Termin ausfällt.** Regen ist kein Ausfall, dafür hat der Fotobrief je Ort eine Regenvariante (`11_bild.md` 3.7). Fällt der Termin aus anderem Grund aus, zeigt der Reveal weder das Seed-Porträt in Post und Reel (11 hält es dafür nicht tragfähig) noch Lückenkacheln in der ersten Ansicht. Der Reveal wird verschoben: Schritt 1 rechnet mit `hmAuftragTermine` den Ersatztermin am nächsten freien Makler-Wochentag und daraus den Reveal so, dass die zwei Werktage bis `gate2.frist` und die drei Werktage bis zum Reveal halten; alles nach dem Reveal rechnet `hmRolloutPlan` neu. Die Statuskarte nennt den neuen Tag mit einem ehrlichen Satz als Grund, etwa "Wir holen den Fototermin nach, darum sehen wir uns eine Woche später." Das ist dieselbe Verschiebungsregel wie oben, nur früher ausgelöst.

### 3.3 Der Belegungsplan

Der Belegungsplan ordnet jeder sichtbaren Stelle genau einen Pfad und einen Kanal zu. Die Renderer bekommen kein `hmBrand(mid)` mehr, sondern die Montage und den Plan. Heute liest die Karte `b.claim`, also die Weg-Leitidee oder den Studio-Text, und das Buch liest `plattform.botschaften.claim` (KETTE_IST 3, Zeile Claim); genau dieser Bruch wird mit dem Plan unmöglich.

Anrede-Aufruf nach Schritt 8: `hmAnrede(mid, kontext, opt)` liefert "Sie", "Du" oder "Dritte" und ist einmal definiert, in `wb-vertrag.jsx` (`08_stimme.md` 3.6). Der Kontext `presse` hat die Form "Dritte"; dort ist jede direkte Anrede ein Treffer von `hmAnredePruefen`.

| Stelle | Pfad | Kontext für `hmAnrede` | Anwendung |
|---|---|---|---|
| Claim | `botschaften.claim` (8) | anredefrei (08: "Genau ein Claim, anredefrei") | Karte hinten, Signatur, Website-Kopf, Story- und Reel-Endkarte, Schild, Umschlag des Markenbuchs |
| Name als Zeichen | `system.wortmarke.svg` (10) | | überall; nie ein Katalog-Logo |
| Zeichen | `system.zeichen` (10), Platz je Format | | jede Kachel, Karte, Exposé, Website |
| Versprechen | `versprechen` (7) | website | Website-Kopf, Unterzeile |
| Über mich | `botschaften.ueberMich` (8): `story.mittel` plus Einladung, so entschieden in `08_stimme.md` 3.12 und 3.14 | website | Website, Abschnitt Über mich |
| Instagram-Bio | `botschaften.bio.instagram` (8) | instagram | Profilkopf, Seite für Eilige. `feed.profilkopf.bio` (13) und `rollout.liveTag.bio` (16) lesen dasselbe Feld; es gibt keinen zweiten Ursprung |
| LinkedIn-Kopfzeile | `botschaften.bio.linkedin` (8) | linkedin | LinkedIn-Kopf |
| Presse | `presse.kurzbio`, `presse.themen`, `presse.beispielzitat` (8), `botschaften.boilerplate` (8) | presse (Form "Dritte") | Pressebaustein |
| Kachel | `feed.kacheln[i]` (13), Serie über `feed.kacheln[i].serie` gleich `serien[].id` (12) | `feed.kacheln[i].kanal` | Feed, Wochenregler |
| Caption | `feed.kacheln[i].caption` (13) | `feed.kacheln[i].kanal` | Feed, Rolle Assistenz |
| Reel-Sätze | `feed.kacheln[i].skript` (13) | `feed.kacheln[i].kanal` | Untertitel-Band im Reel-Render, Clipliste in der Sicht Fotograf, Lautlese |
| Objekt | eigene Objekte aus dem Bestand-Import (1) mit Einwilligung "Objektfotos zeigen" | | Exposé, Objekt-Kacheln; sonst Lückenfläche |
| Energiezeile | Energieausweis-Felder des Objekts (1, siehe 5.6 Punkt 4) | | Exposé, Objekt-Kachel, Objekt-Caption |
| Farben | nur `system.tokens` (10), Bedeutungsebene | | jede Fläche, jeder Text |
| Schrift | nur `system.typo` (10) | | jede Fläche, auch Druckfassung |
| Porträt | `bild.portraet` (11) mit Zuschnitt je Format | | Profilbild, Signatur, Website-Kopf, Seite für Eilige |
| Kontakt | Stammdaten des Maklers aus `makler` | | Karte, Signatur; nie Kontaktdaten Dritter |

Die Prüfung Q2 bis Q5 läuft über den gerenderten Baum jeder Seite: Jeder Textknoten trägt ein Attribut `data-pfad`, jede Farbe muss in `system.tokens` stehen (Verfahren in 3.10.2), jeder Text wird mit `hmAnredePruefen(text, kontext, mid)` gegen den Kontext seines Slots geprüft. Ein Knoten ohne `data-pfad` ist Fülltext (Sperre S9). So fällt auch die Vorgabe "3 Fehler, die ich bei fast jedem Verkauf sehe." aus `hmWeltPostDaten` auf, die heute bei jedem Makler gleich im Feed steht (KETTE_IST 4, `wb-markenwelten.jsx` Zeile 1045 bis 1058).

### 3.4 Die Kapitel

Reihenfolge nach Vertrag. Jedes visuelle Kapitel beginnt mit einer echten Anwendung und zeigt das isolierte Element erst danach; ein Entwurf wird nie zuerst als Logo auf Weiß gezeigt (Rubrik High-End, Deckel 4; Mozilla-Lehre, dass Richtungen am Logo allein falsch beurteilt werden: https://blog.mozilla.org/opendesign/roads-not-taken/).

| Nr. | Kapitel | Quelle | Kern | Offen, mit Beispielen |
|---|---|---|---|---|
| 1 | Wie wir zu dieser Marke gekommen sind | 5 `einsicht.kandidaten`, `einsicht.satz`; 6 `territorien`, `gate1`, `richtung.zitatMakler`; 7 `markenvertrag.anmerkungen`, `bestaetigtAm`; 9 `idee.varianten`, `idee.gezeigt`; 14 `gate2` | | |
| 2 | Einsicht | 5 `einsicht` (zielgruppe, spannung, konvention, weisseStelle, satz) | die Spannung in einem Satz | |
| 3 | Positionierung | 7 `positionierung`, `versprechen`, `rolle`, `werte`, `persoenlichkeit`, `beweise`, `markenvertrag` (attribute, falschWaere, lageAufDerKarte) | Satz, Nicht für, Anders als, Attribute | wie Attribute in Text und Bild erkannt werden, je zwei Beispiele aus dem Feed |
| 4 | Stimme | 8 `stimme`, `anrede`, `botschaften`, `story` | Anrede je Kanal, `stimme.verbindlich`, Wortliste Nie | `stimme.ermessen` mit den Beispielen "so und nicht so" aus `stimme.beispiele` |
| 5 | Idee | 9 `brief` (kernsatz, einschraenkungen), `idee` (satz, neuInEinemPunkt, codes), `idee.begruendung` | der Satz, die Codes, die Einschränkungen | |
| 6 | Zeichen und System | 10 `system` (wortmarke, zeichen, typo, farbe, raster, sperrstufen, festUndVariabel); das Handsatz-Blatt aus 10 | Zeichen, Wortmarke, Schrift, Farbrollen, Raster | `system.festUndVariabel.variabel` und `system.spielraum` mit Bereich |
| 7 | Bildsprache | 11 `bild` (regeln, motive, vermeiden, portraet), `fotobrief` | Ausschnitt, Licht, Porträt als Asset Nummer eins | Motive innerhalb des Motivplans, je mit Kontaktbogen-Beispiel |
| 8 | Serien | 12 `saeulen`, `serien`, `serieSignatur`, `vorlagen`, `konzepte` | Serienname, Folio-Regel, gesperrte Felder | genau die eine Variable je Serie, mit den drei Beispielen der Serie |
| 9 | Feed | 13 `feed` (kacheln, profilkopf, wochen), `start30` | Grammatik, Gesichtsquote, Belegpflicht je Zeile | die zwölf Kacheln als gezeigte Belegung des Offenen |
| 10 | Anwendungen | 10 Renderer aus `system.tokens`; 1 eigene Objekte | Karte 85 x 55 mm vorn und hinten, Signatur, Website-Kopf, Exposé A4 mit Energiekennzahlen, Schild | |
| 11 | Pressebaustein | 8 `presse`, `botschaften.boilerplate`, 11 `bild.portraet` mit Urheberangabe | Kurzbio, drei Themen, Beispielzitat | |

Das Kapitel Positionierung zeigt, was Schritt 7 in seinem Abschnitt 5.5 vorschlägt: `versprechen`, `rolle`, `werte` und `persoenlichkeit` sind hier ihre Abnehmer. Die Karte der Mitbewerber erscheint mit anonymen Punkten aus `markenvertrag.lageAufDerKarte`, nie mit Namen.

**Anwendungen im Einzelnen.** Alle kommen aus je einem Renderer, der nur Tokens und den Belegungsplan liest; es gibt eine Visitenkarte, nicht zwei (heute `Visitenkarte` im Studio und `WeltKarte` im Markenbuch, KETTE_IST 3). Das Exposé zeigt ein eigenes Objekt aus dem Bestand-Import mit HWB, Endenergiebedarf und Klasse, bei älteren Ausweisen HWB und fGEE (https://www.energieausweis360.at/energieausweis-neuerungen-2026, https://www.chg.at/novelle-des-energieausweis-vorlage-gesetzes/, zur Pflicht in Medien https://www.ovi.at/recht/energieausweis/informationspflicht-in-medien). Fehlt ein eigenes Objekt oder fehlen seine Energiedaten, zeigt das Exposé eine typografische Lückenfläche "Hier steht Ihr erstes Objekt" mit den Pflichtfeldern als leere Zeilen, nie ein Demo-Objekt aus `hmWebObjekte`. Der heutige Energietext `hmWeltEnergie` kennt den Endenergiebedarf nicht (`wb-markenwelten.jsx` Zeile 310); das wird im Umbau ergänzt.

#### 3.4.1 Das Buch als Objekt: Format und Raster

Ein Studio misst ein Markenbuch nicht an seinem Inhaltsverzeichnis, sondern daran, ob das Buch selbst die Marke vorführt (Ableitung aus R1 und R8; Rand legte NeXT ein gesetztes Buch vor, keine Liste: https://www.logodesignlove.com/next-logo-paul-rand). Darum ist das Markenbuch ein Render wie jede andere Anwendung und liest nur Tokens und Belegungsplan.

| Merkmal | Festlegung | Quelle |
|---|---|---|
| Formate | **digital** als Hauptform (Werkbank, Telefon und Rechner, Sichten als Filter) und **A4 hochkant** als Druckfassung derselben Seiten, für Druckerei, Fotograf und den Tisch im Übergabetermin (16). Kein drittes Format | Sichten je Rolle 3.7; A4 aus `system.raster` |
| Seitenraster A4 | Rand, Spalten und Bundsteg aus `system.raster.formate` mit `id: "expose"` (A4, 210 x 297 mm), damit Buch und Exposé dasselbe Raster tragen. Doppelseiten im Druck, links und rechts gespiegelt | `10_system.md` Tabelle Formate, Zeile Exposé |
| Raster digital | ab 1024 px Breite dieselbe Spaltenzahl wie A4; am Telefon eine Spalte, Rand wie Website-Kopf (mindestens 16 px) | `10_system.md` Zeile Website-Kopf |
| Schrift | nur `system.typo.stufen`: Kernsatz für Kapiteltitel und Regelwerte, Kennzahl für gerechnete Zahlen, Fließtext für Begründungen, Folio für Seitenzahl und Kapitelname im Fuß | `system.typo` |
| Farbe | nur `system.tokens` der Empfehlung; in der Team-Sicht stehen Seiten des Gegenentwurfs auf dessen eigenem Grund, nie eingefärbt | S3 |
| Folio | Seitenzahl in der Folio-Stufe an dem Platz, den `system.zeichen.platz` für das Folio der Kacheln vorgibt: Das Buch zeigt die Regel, indem es sie befolgt | `10_system.md` Zeile Folio-Zeile |
| Keine Eyebrow | Kapitelnummer und Kapitelname stehen im Fuß im Folio, nie als kleine Zeile über dem Titel; der Titel ist die erste Zeile der Seite | UNIO-Regel, S12 |

Für Markus sind Rand, Spalten und Bundsteg des A4-Formats in Schritt 10 nicht beziffert (Lücke mit Termin vor Schritt 16, wie Druckwerte und Schildmaß); bis dahin setzt der Renderer die Werte der Grammatik Weite aus `HM_MARKENWELTEN.raster` und kennzeichnet sie in der Team-Sicht als Arbeitswerte.

#### 3.4.2 Seitentypen

Jede Seite gehört zu genau einem Typ. Der Renderer kennt nur diese sechs; eine Seite ohne Typ lässt sich nicht bauen.

| Typ | Aufbau | Einsatz |
|---|---|---|
| **Umschlag** | eine Anwendung, keine Wortmarke auf leerer Fläche: das Porträt als Asset Nummer eins im Crop des Website-Kopfs, die Wortmarke liegend an ihrem Platz, der Claim einmal, das Zeichen an seiner Stelle. Rückseite: Version, `gate2.datum`, "Stand zum Reveal" oder die Version der Quelle nach Schritt 16 | Titel jeder Sicht, auch der Seite für Eilige im Druck |
| **Anwendungsseite** | eine echte Anwendung vollflächig oder im Maßstab 1:1, dazu genau eine Bildunterschrift (was man sieht, woher es kommt); der Kapiteltitel steht als erste Zeile in der Kernsatz-Stufe auf derselben Seite | öffnet jedes visuelle Kapitel (3, 4, 5, 6, 7, 8, 9, 10) |
| **Regelseite** | eine Regel je Seite oder Halbseite: der Wert groß (Kernsatz- oder Kennzahl-Stufe), darunter ein Satz `warum` aus dem Quellfeld, Maße, bei Rollen der Download am Ort der Regel | Kern aus 3.6 |
| **Beispielpaar** | drei gleich große Felder nebeneinander: so, auch so, nicht so. "So" und "auch so" sind echte Belegungen (3.6). "Nicht so" ist entweder ein Satz aus `markenvertrag.falschWaere`, `stimme.beispiele[].nicht` oder `bild.vermeiden`, oder ein Render aus seinem eigenen Material, in dem genau eine Regel gebrochen ist, beschriftet mit der Regel. Nie ein fremdes, gekauftes oder generiertes Bild | Offen aus 3.6 |
| **Herleitungsseite** | links ein Absatz aus Kapitel 1, rechts die Renders, auf die er sich bezieht; Varianten nur im Wandtest-Render (3.4.4) | nur Kapitel 1 |
| **Seite für Eilige** | nach 3.7, eine Seite A4 | am Anfang jeder Rollensicht |

#### 3.4.3 Pacing je Kapitel

Regeln für die Folge (Setzung, am Blick zweier Gestalter geprüft, G6): Jedes visuelle Kapitel beginnt mit einer Anwendungsseite. Im Druck steht in visuellen Kapiteln links die Anwendung und rechts die Regel. Nie mehr als zwei Regelseiten nacheinander ohne Anwendung oder Beispielpaar. Ein Kapitel endet mit einem Beispielpaar, wenn es offene Punkte hat, sonst mit seiner stärksten Anwendung.

| Nr. | Kapitel | Seiten A4 (Setzung) | Folge |
|---|---|---|---|
| 1 | Wie wir zu dieser Marke gekommen sind | 4 | Herleitung Kunden, Herleitung Richtungen, Herleitung Zeichen, eine Seite "Was wir geprüft haben" |
| 2 | Einsicht | 1 | der Satz groß auf der Fläche, kein Bild; hier zählen Worte |
| 3 | Positionierung | 3 | Anwendung (Website-Kopf mit Versprechen), Regel (Satz, Nicht für, Anders als), Attribute mit je zwei Belegungen aus dem Feed |
| 4 | Stimme | 3 | Anwendung (geöffneter Beitrag mit Caption und Profilkopf mit Bio), Regel (Anrede je Kontext, `stimme.verbindlich`), Beispielpaare aus `stimme.beispiele` |
| 5 | Idee | 2 | Anwendung (Claim auf seinem Porträt), Regel (Idee-Satz, Codes, Einschränkungen) |
| 6 | Zeichen und System | 6 | Anwendung Kachel, Regel Zeichen, Handsatz-Blatt aus Schritt 10, Farbe, Schrift, Raster; Beispielpaar Zeichen |
| 7 | Bildsprache | 3 | Anwendung (Kontaktbogen-Reihe, Durchgang 2), Regel Ausschnitt und Licht, Beispielpaar Motive |
| 8 | Serien | 2 je Serie, Signatur zuerst | Staffelplakat oder Titelbild als Anwendung, Regeln der Serie, die eine Variable als Beispielpaar |
| 9 | Feed | 2 | Profil nach Woche 4 im Telefon im Maßstab, Grammatik mit dem Raster aus `feed.wochen` |
| 10 | Anwendungen | 5 | je eine Anwendungsseite: Karte vorn und hinten, Signatur, Website-Kopf, Exposé mit Energiezeile, Schild als Montage |
| 11 | Pressebaustein | 1 | Porträt mit Urheberangabe, Kurzbio, drei Themen, Beispielzitat |

Zusammen je nach Serienzahl rund 40 bis 45 Seiten A4 für die Makler-Sicht; die Rollensichten sind Auszüge. Das ist bewusst weniger als Rands rund 100 Seiten für NeXT, weil die Herleitung hier auf vier Seiten verdichtet ist und die Regeln in den Rollen wohnen.

#### 3.4.4 Varianten in Kapitel 1 nur im Wandtest-Render

Kapitel 1 zeigt `idee.varianten` ausschließlich als ihren Wandtest-Render aus Schritt 9: jede Variante auf demselben echten Foto des Maklers, im selben Ausschnitt und in derselben Größe, bis zu vier nebeneinander, darunter Name und `verworfenWeil`. Eine isolierte Zeichenskizze auf leerer Fläche gibt es im Buch nicht, auch nicht klein (Regel aus 3.4; Schritt 15 zeigt in Akt 4 dieselben Renders "in Anwendung"). Fehlt zu einer Variante der Render, steht sie nur als Name und Grund im Text. Dieselbe Regel gilt für die Rohskizzen der Territorien: Sie sind nach dem Vertrag von Schritt 6 schon Anwendungen (Claim, drei Kacheln, Profilkopf aus echtem Foto).

#### 3.4.5 Eine Doppelseite am Fall Markus

Kapitel 6, Doppelseite "Das Zeitmaß" im Druck (Werte aus `10_system.md` für den Post als Arbeitswerte, Porträt bis zum Porträt-Termin Lücke):

- **Links, Anwendungsseite.** Das Titelbild der Folge "Elf Wochen" aus der Serie Zeitwert (`serien[0].beispiele`, `12_social.md` 3.15) im Maßstab über die ganze Seite: Markus sitzend, frontal, Vormittagslicht von der Seite, die Tischkante auf der Höhe des Zeitmaßes; unten das Zeitmaß als kurze Spanne mit dem Etikett "11 Wochen", rechts in derselben Zeile das Folio "Zeitwert 03". Oben links als erste Zeile der Seite der Kapiteltitel "Zeichen und System" in der Kernsatz-Stufe. Einzige Bildunterschrift: "Zeitwert 03, Titelbild. Die Spanne zeigt die Dauer bis zum Verkauf." Darunter klein der Vermerk "Ihre Angabe, Unterlage folgt", weil b2 Selbstauskunft ist. Bis der Porträt-Termin geliefert hat, steht auf dieser Seite in der Team-Sicht eine Lückenfläche; in die Makler-Sicht kommt die Doppelseite erst mit dem Porträt.
- **Rechts, Regelseite mit Beispielpaar.** Oben "Das Zeitmaß" in der Kernsatz-Stufe, darunter ein Satz `warum` aus `idee.zeichen.herleitung` in der Version, auf die `system` baut (für Markus offen, Befund 1 in 3.15). Darunter die Regel in drei Zeilen: Punkt für einen Stand, Spanne für eine Dauer; Linie auf y 1231 px, Nullstelle x 119 px, Strich 8 px, Endstriche 8 x 48 px; Länge nach logarithmischer Skala, nur das Zeitmaß trägt die Akzentfarbe. Im unteren Drittel das Beispielpaar: *so* "Elf Wochen" mit kurzer Spanne; *auch so* "Eine Woche" aus derselben Serie, eine Wissensfolge ohne eigene Zahl mit der kürzesten Länge der Skala; *nicht so* derselbe Render wie "so", nur mit dem Zeitmaß am oberen Bildrand, beschriftet "Nicht so: Das Zeitmaß liegt in jedem Format an derselben Stelle" (`brief.einschraenkungen` E2). Im Fuß rechts die Seitenzahl in der Folio-Stufe auf der Linie des Zeitmaßes.

Die Seite hat drei Textgrößen, eine Akzentstelle und keinen Satz ohne Quelle. Sie zeigt zuerst, wie es aussieht, dann, warum, dann, wo die Grenze liegt.

### 3.5 Kapitel 1: Wie wir zu dieser Marke gekommen sind

Das Kapitel ist der Beweis der Arbeit (Labor Illusion, https://doi.org/10.1287/mnsc.1110.1376) und folgt Rands Haltung, die Lösung Schritt für Schritt herzuleiten (https://www.logodesignlove.com/next-logo-paul-rand). Es ist kurz: höchstens 450 Wörter plus kleine Renders (Setzung).

**Aufbau, immer in dieser Folge:**

1. Womit wir angefangen haben: seine Fälle, sein Satz aus dem Workshop, gezählt, nicht bewertet (Anzahl `antworten.faelle`, Anzahl Zitate mit Sprecher Makler, Anzahl gesichteter Bilder aus `bild.kontaktbogen`, Anzahl gelesener Auftritte im Kerngebiet aus `vorab.wettbewerb`, nie mit Namen).
2. Was wir über seine Kunden verstanden haben: `einsicht.satz`, danach die zwei verworfenen Kandidaten mit ihrem `grund`.
3. Welche Richtungen wir gebaut haben: die drei Territorien mit Rohskizze, die Empfehlung und der Gegenentwurf aus `gate1`, sein eigener Satz aus dem Richtungstermin (`richtung.zitatMakler`), die Tabus, die er markiert hat.
4. Woran wir jede Arbeit gemessen haben: der Markenvertrag mit Datum der Bestätigung und, wenn vorhanden, seine Anmerkung mit der Antwort.
5. Wie aus dem Satz ein Zeichen wurde: `idee.varianten` (sechs bis zwölf) nur als Wandtest-Render auf seinem Foto (3.4.4), je mit `verworfenWeil`, dann Empfehlung und Gegenentwurf mit ihrer Achse.
6. Was wir geprüft haben, bevor er es sieht: gerechnete Sätze aus `gate2` und `qualitaet`, etwa "[n] öffentliche Zahlen, [k] gegen Unterlagen geprüft, [n minus k] als Ihre Angabe vermerkt, Unterlagen folgen bis [Termin]." und "Verglichen mit den Marken der [m] anderen UNIO-Makler." Nie ein Name eines anderen Maklers.

**Sprachregel für die Makler-Sicht.** Kapitel 1 ist die Stelle, an der er die Arbeit des Teams erlebt, und darum in seiner Sprache geschrieben, nicht in unserer. Erlaubt sind nur Wörter aus drei Quellen: seinem bestätigten Vertrag (`markenvertrag`, `positionierung`, `versprechen`), seinen eigenen Sätzen (`workshop.zitate` mit Sprecher Makler, `richtung.zitatMakler`) und der Alltagssprache. Gesperrt ist Teamjargon, als Liste `HM_MB_JARGON` in der Regel geführt und in der Team-Sicht erlaubt: Lesart, Kandidat, Territorium, Beweisebene, Grammatik, Welt, Achse, Variante, Wandtest, Code, Rubrik, Kohorte, Gate, Schablone, Slot, Montage. Jeder Bezug muss sich ohne Vorwissen auflösen: kein "der Dienstag", ohne dass im selben Absatz steht, welcher Dienstag. Zahlen stehen so, wie sie gezählt sind; ein Satz darf keinem anderen Satz des Kapitels oder dem Quellfeld widersprechen (Prüfung Q6 vergleicht Zählwörter mit `idee.varianten` und `wandtest`). Der Regelpfad prüft die Liste; Claude bekommt sie im Prompt; der Stratege liest das Kapitel am Ende einmal als Makler.

**Regeln für das Kapitel.**
- Jeder Satz trägt `quellen[]`. Ein Grund für ein Verwerfen wird nicht neu formuliert, wenn das Quellfeld ihn schon in lesbarer Form hat; Schritt 5 verlangt, dass Fassungen und Gründe so formuliert sind, dass der Makler sie lesen darf, und dass sie vor Kapitel 1 durch die Klischeeprüfung dieses Schritts laufen (05_einsicht Abschnitt 3.9).
- Punktzahlen der Kritik (Schritt 6, `territorien.kritik`) und der Rubrik stehen nur in der Team-Sicht. Der Makler sieht Gründe, keine Noten, damit er im Reveal über Kriterien spricht und nicht über Zahlen (Ableitung aus Monteiro, Sekundärquelle: https://thepiratetester.wordpress.com/2021/04/12/2021-04-12-my-breakdown-of-mike-monteiro-13-ways-designers-screw-up-client-presentations-and-how-it-applies-to-testers/).
- Keine Aussage über Aufwand, die nicht gemessen ist. "Wir haben 40 Stunden gearbeitet" steht nur da, wenn die Summe aus den `stand.dauerMin`-Feldern der Schritte kommt; sonst steht nichts da.
- Keine Wertung von Mitbewerbern, auch nicht anonym ("die anderen machen es falsch"). Die Konvention wird beschrieben, nie angegriffen (Schritt 7, Attribut "heißt nicht moralisierend").

### 3.6 Fester Kern und offener Teil

Barkas arbeitet mit einer festen Basis und einem offenen Teil, SDG trennt feste Eigenschaften von solchen, die immer neue Ausgaben brauchen (https://the-brandidentity.com/interview/presented-by-brandpad-how-to-create-successful-brand-guidelines-with-koto-london-barkas-and-sdg); Pentagram hält das Public Theater an einer Schrift fest und variiert je Saison nur die Behandlung (https://www.pentagram.com/work/the-public-theater-2020-2021-season). In der Werkbank wird die Einteilung nicht neu entschieden, sondern **aus den Sperrstufen abgeleitet** (Canva-Muster, https://www.canva.com/help/brand-template-locks/; R4 Ü1):

| Herkunft | Kern | Offen |
|---|---|---|
| `system.sperrstufen` | Stufe `fest` und `stil` | Stufe `rahmen` und `variante`, mit dem erlaubten Bereich |
| `system.festUndVariabel` | `fest` | `variabel` mit Rhythmus, etwa je Quartal |
| `stimme` | `verbindlich` | `ermessen` |
| `serien` | Name, Folio-Regel, Bildaufbau | `variable` (genau ein Merkmal) |
| `bild` | `regeln.ausschnitt`, `portraet`, `vermeiden` | `motive.kann` |
| `markenvertrag` | `falschWaere` als Grenze | |

**Regel für Beispiele.** Jeder offene Punkt zeigt zwei echte Belegungen aus Feed, Serien oder Kontaktbogen ("so" und "auch so") und eine Grenze ("nicht so"). Die Grenze stammt aus `stimme.beispiele[].nicht`, `markenvertrag.falschWaere` oder `bild.vermeiden`, nie aus einem erfundenen Gegenbeispiel. Fehlt ein zweites echtes Beispiel, steht nur eines da, mit dem Hinweis, dass das zweite mit dem ersten Monatsplan kommt (Schritt 17). Koto zieht inspirierende Beispiele Verbotslisten vor (gleiche Quelle); Verbotslisten stehen darum nur dort, wo UNIO-Regeln es verlangen (R1 4.6).

### 3.7 Sichten je Rolle und die Seite für Eilige

Die Sichten sind Filter auf dieselbe Montage, kein eigener Inhalt (Tardy erwartet, dass Richtlinien Werkzeuge je Partner zeigen oder verbergen: https://the-brandidentity.com/insight/the-future-of-brand-guidelines-promises-big-changes-together-with-brandpad-we-decode-whats-to-come). Jede Sicht hat eine feste Einleitung aus einem Satz und Downloads dort, wo die Regel steht (R4 Ü12). Keine Sicht zeigt Team-Internes: Kritikpunkte, Rubrik-Noten, Kohortenbefunde, Namen anderer Makler.

| Sicht | Kapitel | Was sie zusätzlich braucht | Downloads am Ort der Regel |
|---|---|---|---|
| Makler | alle, eigene Worte gekennzeichnet (Unterstreichung mit Randnotiz aus `markenvertrag.herkunft`, wie in Schritt 7); Kapitel 1 nach der Sprachregel (3.5) | nichts | keine Datei (siehe unten) |
| Assistenz | Seite für Eilige, 4 Stimme (Anrede, Beispiele für erste Antwort, Absage, Bio), 8 Serien (Ablauf, offene Felder der Vorlagen), 9 Feed (`start30`), 10 Signatur | Kanalplan mit Anrede je Kanal, Energiezeile als Pflicht | Signatur als HTML, Vorlagen je Serie, Bio-Texte |
| Fotograf | 7 Bildsprache mit Fotobrief (die Doppelseite aus Schritt 11), Porträtregel, Vermeiden | Sucherrahmen, Crops je Format für Empfehlung und Gegenentwurf | Sucherrahmen als SVG, Fotobrief als PDF |
| Druckerei | 6 Wortmarke, Schutzraum, Mindestgröße, Farben mit Druckwerten, Schriftlizenz Druck; 10 Karte, Schild, Exposé | Maße, Beschnitt, Druckwerte je Farbe (fehlen sie, Lücke mit Termin) | Wortmarke als SVG und PDF, Karte und Exposé als Druck-PDF |
| Web | 6 Tokens, Schriftlizenz Web, Kontrastwerte; 10 Website-Kopf; Texte aus dem Belegungsplan | Porträt-Zuschnitt Website-Kopf, Energiezeile für Objektseiten | Tokens im W3C-Format 2025.10 und als CSS, Texte als Datei |

**Wann und wie der Makler sein Buch bekommt.** Vor dem Reveal sieht er nichts davon. Im Reveal sieht er Teile als Akte (3.12). Ab der Öffnung der Rückmeldung (Termin plus 24 Stunden, Schritt 15) ist die Makler-Sicht im selben Link als Ansicht lesbar, im Stand von `gate2.version` und so beschriftet ("Stand zum Reveal"), damit er beim Antworten nachschlagen kann; sie hat keinen Download. Mit der Übergabe in Schritt 16 wechselt die Ansicht auf die eingefrorene `quelle` und wird Teil von "Ihre Marke steht". Das folgt der Regel "Ansicht statt Datei" aus Schritt 16 (A2 dort). PDF-Dateien gibt es nur für Dienstleister, die Dateien brauchen, also für die Sichten Druckerei und Fotograf, und erst im Paket unter "Details" (`16_freigabe.md`, Paket). Die Druckfassung A4 der Makler-Sicht wird im Übergabetermin einmal gedruckt auf den Tisch gelegt, nicht versandt.

**Seite für Eilige.** Eine Seite, auf dem Telefon höchstens drei Bildschirmhöhen, gedruckt eine A4-Seite (Setzung). Inhalt in dieser Folge: Name als Zeichen mit Mindestgröße und Schutzraum; der Claim, genau einmal; Anrede je aktivem Kanal in je einer Zeile; zwei bis drei Farben mit Rolle und Werten; zwei Schriften mit Einsatz; das Porträt als Asset Nummer eins mit der Regel in einem Satz; drei Mal "immer", drei Mal "nie"; die Pflicht bei Objekten; wen man fragt (das UNIO-Team über die Nachricht in der Werkbank, keine private Nummer). Die Zahl von drei Dos und drei Don'ts folgt R8 4 Nr. 10; dass höchstens etwa vier Einheiten gleichzeitig im Kurzzeitgedächtnis bleiben (Cowan 2001: https://doi.org/10.1017/s0140525x01003922), stützt die Grenze pro Block (Ableitung). Die "immer" und "nie" wählt die Regel nach Rang, eigene Einträge vor Branchenstandard: (1) Pflichten, die jeden Beitrag betreffen (Belegpflicht, Energiezeile); (2) eigene Einträge aus `markenvertrag.falschWaere` und `stimme.verbindlich`; (3) eigene Einschränkungen aus `brief.einschraenkungen`, darunter die Verbote, die aus seinem Kernsatz folgen; (4) erst zuletzt allgemeine Branchenverbote aus `bild.vermeiden` wie Handschlag und Schlüssel, und nur, wenn weniger als drei eigene Einträge vorliegen, höchstens als letzter Eintrag. Ein Eintrag gilt als eigen, wenn er einen Ort, ein Wort aus seinen Zitaten oder eine Folge seiner Idee enthält; die Regel prüft das gegen die Liste allgemeiner Branchenmotive aus Schritt 3 und 11. Claude darf nur verkürzen, nicht erfinden.

**Fünf-Minuten-Test.** Eine Person aus dem Team ohne Projektbezug bekommt nur die Seite für Eilige und fünf Fragen, die die Regel aus der Montage erzeugt, etwa: Welche Anrede gilt auf LinkedIn? Darf die Akzentfarbe Text tragen? Was muss in jedem Objekt-Beitrag stehen? Wie lautet der Satz der Marke? Darf ein Bild ein Symbol aus der Liste "nie" zeigen? Bestanden heißt fünf von fünf in höchstens fünf Minuten (Setzung). Sonst wird die Seite überarbeitet, nicht die Frage. Nach der Übergabe (Schritt 16) wiederholt die echte Assistenz den Test; das Ergebnis geht über `lernen` in Schritt 17 zurück. Mark Jones (Studio Blackburn) sagt, Leitfäden sollten auch Laien verstehen, weil Ansprechpartner wechseln; Colin Mitchell beschreibt, dass Mitarbeitende Markenversprechen untergraben, wenn sie die Marke nicht verstehen (https://the-brandidentity.com/interview/presented-by-brandpad-how-to-systemise-a-brand-featuring-pentagram-how-how-and-studio-blackburn; https://hbr.org/2002/01/selling-the-brand-inside).

### 3.8 Satzweise Redaktion

**Einheit.** Ein Satz ist `pfad#index`, geschnitten mit der vorhandenen Funktion `hmPfSaetze`. Der Stratege tippt auf einen Satz, ein Seitenpanel öffnet sich mit altem Satz, Eingabe, Grund (Kategorie plus ein Satz) und der Vorschau aller Stellen, an denen dieser Pfad im Buch steht.

**Sperrstufen der Redaktion** (Ableitung aus den Verträgen der Vorgänger):

| Stufe | Was | Was die Redaktion darf | Warum |
|---|---|---|---|
| `frei` | Texte, die der Makler noch nicht gesehen hat: Serienbeispiele, Captions, `stimme.beispiele`, Kapitel 1, Einleitungen der Rollen | direkt ändern | Handwerk des Teams |
| `bestaetigt` | was der Makler bestätigt oder gewählt hat: `positionierung`, `versprechen`, `rolle`, `werte`, `persoenlichkeit`, `beweise`, `markenvertrag` (7), die Wahl des Claims und die drei markierten Story-Sätze (8) | nur Tippfehler ohne Sinnänderung (höchstens drei Zeichen, gleiche Wörter nach Normalisierung, Setzung); alles andere wird ein Änderungsantrag, der den Wort-Link aus Schritt 7 mit einem Klick zur Bestätigung erneut öffnet | Ein Maßstab, den der Makler unterschrieben hat, ändert sich nicht still (07 Abschnitt 3.7) |
| `woertlich` | Zitate aus `workshop.zitate`, Kundenstimmen, Stellen mit `markenvertrag.herkunft.woertlich` | nicht ändern; nur durch eine andere Quelle ersetzen oder entfernen | Eigene Worte bleiben seine; eine geglättete Kundenstimme ist eine erfundene |
| `gerechnet` | Zahlen aus dem Bestand, Tokens, Kontrastwerte, Prüfergebnisse | nicht in der Redaktion; Link in den Ursprungsschritt (etwa Schritt 10 für eine Farbe im Spielraum) | Gestalt und Messung werden nicht satzweise redigiert |

**Rückschreiben.** `hmMbRedigieren(mid, pfad, satz, neu, grund)` findet über ein Register `HM_MB_QUELLEN` den Ursprungsschritt, schreibt eine neue Version seines Objekts, ruft dessen Prüffunktion (etwa `hmVertragPruefen` aus Schritt 7) und speichert einen Eintrag in `markenbuch.redaktion`. Die Montage läuft danach für die betroffenen Stellen neu. Heute kann der CD nur neu erzeugen, nicht einen Satz korrigieren (KETTE_IST 2.8); "Neu erzeugen" entfällt im Markenbuch ganz.

**Abnahme einer Redaktionsversion.** Q1 verlangt, dass jede Quelle abgenommen ist. Damit eine Korrektur über Schritt 14 das eigene Gate nicht sperrt, gilt je Stufe:

| Stufe | Wann die neue Version abgenommen ist | Wer abnimmt |
|---|---|---|
| `frei` | sobald die Prüffunktion des Ursprungsschritts auf der neuen Version besteht (etwa `hmStimmePruefen` in Schritt 8, `hmFeedPruefen` in Schritt 13); besteht sie nicht, wird keine Version geschrieben und der Vorschlag bleibt offen | der Stratege, der die Redaktion auslöst; `abnahme {von, am, pruefung: "bestanden"}` steht im neuen Versionseintrag des Ursprungsobjekts |
| `bestaetigt` | erst nach der Bestätigung durch den Makler im Wort-Link von Schritt 7 oder 8; bis dahin bleibt die alte, bestätigte Version in `basis` gültig | der Makler |
| `woertlich`, `gerechnet` | keine Redaktion in Schritt 14 | |

Die Abnahme des Ursprungsschritts durch dessen Verantwortlichen braucht es für eine Redaktion der Stufe `frei` nicht, weil die Prüffunktion dieselben Regeln misst, unter denen der Schritt abgenommen wurde, und der Eintrag in `markenbuch.redaktion` den Eingriff sichtbar hält. Greift eine Redaktion in einen Wert ein, den der Ursprungsschritt als Entscheidung eines bestimmten Mitglieds führt (etwa die Wahl der Empfehlung in Schritt 9), ist sie keine Redaktion, sondern eine Rückgabe an diesen Schritt.

**Bindung ohne Selbstsperre.** `hmMbRedigieren` schreibt die neue Version und führt im selben Schritt den Eintrag in `markenbuch.basis` für dieses Objekt auf Version und Prüfsumme der neuen Version nach. S14 vergleicht danach gleiche Werte und schlägt nicht an. S14 meldet nur Änderungen, die nicht über S14 kamen, also Arbeit im Ursprungsschritt selbst; auch die sind erlaubt, lassen die Montage aber neu prüfen. Nach der Abzeichnung schreibt die Redaktion nicht mehr; Änderungen laufen dann über die Rückmeldung in Schritt 15 und die Neuprüfung in Schritt 16.

**Vorschläge.** Die Vorprüfung durch Claude (3.14) und die Regeln schreiben Einträge mit Status `vorschlag`. Nichts wird automatisch übernommen, anders als heute in der Schlussprüfung (Alternative A5). Der Stratege sieht je Vorschlag Pfad, alten und neuen Satz, Kategorie und Grund und nimmt an oder lehnt ab, beides mit Protokoll.

### 3.9 Qualität: Rubrik für Text und Gestalt

**3.9.1 Warum eine neue Rubrik.** Die heutige Prüfung misst Regelkonformität der Texte und wird als Qualitätsnote gelesen (KETTE_IST 2.5): Spezifität zählt einen eingesetzten Bezirksnamen, Glaubwürdigkeit erlaubt pauschal die Zahlen 1 bis 6, 10, 24, 30, 48, 60, 90 und 2026 (`wb-plattform.jsx` Zeile 1045), Unterscheidbarkeit steht ohne andere Plattform fest auf 70 (Zeile 1039), Gestalt kommt nicht vor. Die neue Rubrik übernimmt die Rechenwege, wo sie tragen, und schließt diese vier Lücken.

**3.9.2 Kriterien.** Jedes Kriterium 0 bis 100. Die Gewichte sind Setzung.

| Id | Kriterium | Wie gemessen | Gewicht |
|---|---|---|---|
| T1 | Spezifität | Anteil der öffentlichen Kerntexte mit mindestens einem Anker aus der Belegtafel von Schritt 5: ein Ort aus `graetzl` oder den Straßen (ein Bezirksname allein zählt nicht), eine Zahl mit Beleg-Id oder ein eigenes Wort (mindestens vier Wörter wörtlich aus einer Quelle mit Sprecher Makler). Jede öffentliche Lücke minus 10 | 10 |
| T2 | Unterscheidbarkeit Text | größte Jaccard-Ähnlichkeit auf Wort-Trigrammen der Markentexte gegen die Kohorte und gegen den Schablonenkorpus (3.9.4); ab 5 Prozent kostet jeder Punkt drei Punkte (wie heute). Dazu je Satz, der sechs oder mehr aufeinanderfolgende Wörter mit einem Kohorten- oder Schablonentext teilt, minus 15 | 10 |
| T3 | Belegt | jede Zahl in einem öffentlichen Text gehört zu genau einer Klasse: Beleg mit `beweise.id`, Objektangabe mit Objekt-Id aus dem Bestand, Stand-Datum, Folio oder Seitenzahl, oder Zählwort mit Grund der Redaktion ("drei Fragen" als Gliederung). **Keine Pauschalliste.** Jede Zahl ohne Klasse minus 20 und Sperre S5 | 10 |
| T4 | Konsistenz | Anrede je Slot über `hmAnrede`, ein Claim, keine Gedankenstriche, Ausrufezeichen, Emojis, weiche Floskeln (Liste aus MARKENQUALITAET Kapitel 3) | 8 |
| T5 | Sprache und Maß | Story-Längen nach Vertrag (kurz bis 35, mittel 70 bis 100, lang 160 bis 220 Wörter), öffentliche Sätze höchstens 20 Wörter, Text im Bild höchstens acht Wörter, offene Einträge aus dem Lautlese-Test | 6 |
| T6 | Umsetzbarkeit | Säulen, Pflichtsäule "Wie ich arbeite" mindestens 15 Prozent, jede Serie mit Name, Variable, Hook-Formel, Rhythmus, drei Beispielen, Vorlagen mit bestandenem Stresstest, Startplan vier Wochen | 6 |
| G1 | Herleitung | Anteil der sichtbaren Formentscheidungen (Eingriffe der Wortmarke, Schrift, Farbrollen, Zeichen, Ausschnitt, Grammatik) mit einem Eintrag in `idee.begruendung` oder einem `warum`, dessen Quelle sich in der Montage auflösen lässt. **Deckel 40**, wenn ein sichtbares Element aus einer Katalogliste ohne Bezug zur Idee stammt (`HM_LOGO_TYPEN`, die sieben Akzente, die fünf Schriftpaare des Studios) | 10 |
| G2 | Codes | Anteil der zwölf Kacheln mit mindestens zwei Codes aus `idee.codes`; Lage des Zeichens je Format innerhalb der Toleranz aus `system.zeichen.platz`; Gesicht mindestens 8 von 12 und höchstens 2 je Zeile (aus `feed.pruefung`); Graustufentest aus `system.pruefung` bestanden | 8 |
| G3 | Handwerk des Systems | Kontrast nach WCAG 1.4.3 für jeden Text, auch im Bild (https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html); Stresstest ohne "fehler"; Textgröße in der Kachel mindestens 92 px auf 1080; Schriftlizenz für Web, Social und Druck geprüft; nur Farben aus Tokens | 8 |
| G4 | Unterscheidbarkeit Bild | Strukturabdruck, Rastervergleich und Blindtest nach 3.9.4 | 8 |
| G5 | Anwendung und Echtheit | Anteil der Anwendungsflächen mit echtem Material des Maklers (Porträt, eigenes Objekt, eigener Ort); fremde Objekte, Fülltexte und KI-Bilder sind Sperren (S7 bis S9); Energiezeile, wo ein Objekt steht | 6 |
| G6 | Gestalt-Urteil | zwei Gestalter getrennt, vier Fragen mit je 0 bis 25 Punkten und Ankertexten (3.9.5); Mittelwert; liegen beide mehr als 20 Punkte auseinander, entscheidet der CD nach einem kurzen Gespräch, mit Notiz | 10 |

`qualitaet.gesamt` ist das gewichtete Mittel. Schwelle nach Vertrag und MARKENQUALITAET: mindestens 80, kein Kriterium unter 60, keine Klischees.

**3.9.3 Harte Sperren.** Eine Sperre schließt Gate 2 unabhängig von der Note. Sie deckt, was die Rubrik der Zerlegung mit Deckeln belegt; eine gute Note darf einen solchen Fehler nicht ausgleichen (Alternative A4).

| Id | Sperre | Erkannt durch |
|---|---|---|
| S1 | Klischee aus der Liste des Datenvertrags in einem öffentlichen Text | `HM_PF_KLISCHEES` wie heute, Negativbeispiele ausgenommen |
| S2 | zweiter Claim: ein Text an einem Claim-Slot, der nicht Zeichen für Zeichen `botschaften.claim` ist, oder ein früherer Claim aus `vorab.auftrittHeute` an einer Stelle, die wie ein Claim gesetzt ist | Belegungsplan, Textvergleich |
| S3 | zweite Palette: eine Farbe in einem Render, die nicht in `system.tokens` steht (Fotos ausgenommen) | Farbdetektor nach 3.10.2 |
| S4 | zweite Anrede-Logik: ein öffentlicher Text, der `hmAnredePruefen(text, kontext, mid)` für den Kontext seines Slots nicht besteht; im Kontext `presse` jede direkte Anrede | `hmAnredePruefen` aus Schritt 8 je Slot |
| S5 | Zahl ohne Klasse (T3) in einem öffentlichen Text | Zahlenliste |
| S6 | Kundenstimme nicht wörtlich gleich `vorab.kundenstimmen[].text`, ohne Datum oder ohne Freigabe; eine Wiedergabe des Maklers als Kundenstimme ausgegeben ("Kunden sagen ...") | Textvergleich, Quellprüfung |
| S7 | fremdes Objekt oder Demo-Objekt in einer Fläche, die der Makler oder die Öffentlichkeit sieht | Objekt-Ids gegen den Bestand des Maklers |
| S8 | Bild mit `ki: true` in einer solchen Fläche | Kontaktbogen-Flag aus Schritt 11 |
| S9 | Fülltext: Textknoten ohne `data-pfad` | gerenderter Baum |
| S10 | Objekt ohne Energiezeile (HWB, Endenergiebedarf und Klasse, bei älteren Ausweisen HWB und fGEE) | Objekt-Slots |
| S11 | Platzhalter, Demo-Objekt, Katalogteil oder Datei mit offenen Rechten im Materialpaket | Manifest, 3.11 |
| S12 | UNIO-Regel verletzt in einem Artefakt, das Makler oder Öffentlichkeit sehen: Eyebrow, Textzeichen als Icon, Verlauf, Glow, Gedankenstrich, Ausrufezeichen, Emoji | Detektoren im gerenderten Baum (3.10.2) |
| S13 | Nutzung ohne Einwilligung: Objektfotos ohne "Objektfotos zeigen", Porträt oder Kontaktbogen mit `rechte.status` offen | `auftrag.einwilligungen`, `bild.kontaktbogen[].rechte` |
| S14 | Quelle veraltet: eine Version in `basis` ist nicht mehr die aktuelle abgenommene | Vergleich der Prüfsummen |
| S15 | öffentliche Lücke in Positionierung, Claim, Story kurz oder einem öffentlichen Beleg (MARKENQUALITAET Kapitel 2) | Lückenliste |
| S16 | Kohorte: Textähnlichkeit über 15 Prozent zu einem anderen UNIO-Makler oder zum Schablonenkorpus, oder im selben Gebiet ein Strukturabdruck mit mindestens vier von sechs gleichen Merkmalen; ebenso "nicht prüfbar", weil die Kohorte auf diesem Gerät nicht vollständig geladen ist (3.9.4) | 3.9.4 |
| S17 | Schablonentreffer am Claim-Slot: `botschaften.claim` teilt nach Normalisierung vier oder mehr aufeinanderfolgende Wörter oder den ganzen Satz mit einem Eintrag des Schablonenkorpus. Aufheben lässt sich die Sperre nur durch eine Ausnahme mit Nachweis: ein Pfad zu der Antwort oder dem Zitat des Maklers, aus dem der Satz folgt (`antworten.<key>` oder `workshop.zitate[id]`, Sprecher Makler), dazu ein Eintrag in `markenbuch.redaktion` mit Kategorie `austauschbar`, Grund und dem Namen des CD. Ein bloßer Hinweis genügt nie. Die Ausnahme gilt nur für diesen Makler; ein zweiter Makler mit demselben Satz trifft S16 | 3.9.4, Korpus `HM_SCHABLONEN` |

**3.9.4 Kohorte in Text und Bild.** Doshi und Hauser zeigen, dass KI das einzelne Ergebnis hebt und die Ergebnisse vieler einander ähnlicher macht (https://www.science.org/doi/10.1126/sciadv.adn5290); ein kopierter Stil macht Feeds austauschbar, wie beim Kinfolk-Look auf Instagram (https://www.itsnicethat.com/articles/opinion-kinfolk). Darum prüft Schritt 14 gegen drei Vergleichsmengen:

**Voraussetzung: ein geteilter Speicher.** Heute liegen alle Makler im `hmStore` eines Browsers (localStorage, `wb-store.jsx` Zeile 3). Auf einem zweiten Teamgerät wären Kohortenprüfung und Blindtest wirkungslos und würden fälschlich bestehen. Darum ist ein geteilter Speicher der Kohorte **Voraussetzung vor dem ersten Einsatz von S16**, kein offener Punkt: ein Endpunkt `api/wb-kohorte.js` im Team-Zugang, der je Makler nur das hält, was die Prüfung braucht: die öffentlichen Texte der freigegebenen Quelle (sie sind ab dem Live-Tag ohnehin öffentlich), den Strukturabdruck und die Raster-Hashes der eigenen Renders. Keine Porträts, keine Rohantworten, keine Kontaktdaten, nie an Claude. Welcher Speicherdienst das ist, entscheidet der Owner (Lücke); der Vertrag der Prüfung hängt nicht daran. **Rückfall:** Lädt ein Gerät die Kohorte nicht vollständig (Stand älter als 24 Stunden oder Zahl der Makler kleiner als im Speicher gemeldet, Setzung), meldet die Prüfung "nicht prüfbar", und das zählt als offene Sperre S16, nie als bestanden. Zu unterscheiden davon ist eine **kleine Kohorte**: Gibt es wirklich weniger als zwei andere Makler, ist der Blindtest "nicht prüfbar" ohne Abzug, wie unten.

1. **Kohorte eingefroren:** `quelle` aller anderen UNIO-Makler aus Schritt 16 (Vertrag: freigegebene Quellen).
2. **Kohorte in Arbeit:** Markenbücher anderer Makler, die gerade in Schritt 14 sind; Befunde daraus sind Hinweise, keine Sperre, damit zwei parallele Makler im selben Gebiet einander sehen (Ableitung).
3. **Schablonenkorpus:** die eigenen Textbausteine der Werkbank, die auf jeden Makler passen: `HM_PF_FIGUR`, `HM_PF_WORT`, `HM_PF_WERTE`, `HM_PF_GRUNDWERT` (`wb-plattform.jsx`), die Weg-Hooks und Leitideen aus `wb-data.jsx`, `HM_WELT_HOOKS` (`wb-markenwelten.jsx` Zeile 130), `HM_IDEEN_VORLAGEN` (`wb-produktion.jsx`), das Musterbeispiel aus MARKENQUALITAET Kapitel 5. Für Markus selbst gilt das Musterbeispiel nur dann als seine Quelle, wenn der Satz auf eine seiner Antworten oder Zitate zurückgeht; sonst ist es ein Schablonentreffer wie bei jedem anderen.

*Text:* Jaccard auf Wort-Trigrammen wie heute, Schwelle für die Sperre S16 über 15 Prozent (MARKENQUALITAET 4.6), dazu der Satztest aus T2.

*Bild, drei Stufen:*
- **Strukturabdruck** aus Systemdaten, ohne Bilder: Formklasse des Zeichens (Linie, Fenster, Bogen, Kante, Feld, Monogramm), Grammatik-Welt, Farbton des Akzents (OKLCH-Farbton auf 15 Grad gerundet), Display-Familie, Ausschnitt (`bild.regeln.ausschnitt` Linie und Punkt auf 5 Prozent gerundet), Grundtonwert hell oder dunkel. Zwei Makler mit überlappenden Bezirken und mindestens vier von sechs gleichen Merkmalen: Sperre S16; sonst ab vier gleichen Merkmalen Hinweis (Schwelle Setzung). Das setzt die Regel der Zerlegung um, dass kein zweiter Makler im selben Gebiet gleiche Grammatik und gleichen Akzent trägt.
- **Rastervergleich** im Browser: die zwölf gerenderten Kacheln jedes Feeds werden mit dem vorhandenen Exporter `hmAlsPng(el, breite, familien, hoehe)` aus `wb-material.jsx` (Zeile 48: Element klonen, Stile inline, SVG-foreignObject auf Canvas, nach dem Prinzip von html-to-image) in 270 px Breite gerastert, keine neue Bibliothek, dann verkleinert auf 8 x 10 Graustufen, je Kachel ein Mittelwert-Hash, Ähnlichkeit als mittlere Hamming-Distanz der Raster (Ableitung, Schwelle nach den ersten Läufen setzen). Verglichen werden nur eigene Renders aus Tokens und Vorlagen, keine Porträts, damit keine Personendaten verglichen werden. Zusätzlich gegen die unveränderten Standard-Renders der sechs Markenwelten: Liegt ein Feed nahe an einer Welt ohne eigenes Zeichen, ist das Katalognähe (Hinweis an G1).
- **Blindtest** durch eine Person ohne Projektbezug: drei Raster ohne Namen (dieser Makler und zwei aus der Kohorte), drei Positionierungssätze, richtig zuordnen. Nur ab zwei anderen Maklern in der Kohorte sinnvoll; darunter "nicht prüfbar", ohne Abzug und ohne geschätzten Ersatzwert (heute steht der Wert ohne Vergleich fest auf 70). Die Idee des Blindtests stammt aus R4 (offene Frage 4) und R2 (offene Frage 4, Wiedererkennung ohne Namen wie bei Mastercard: https://www.pentagram.com/work/mastercard).

Kohortendaten verlassen den Team-Browser nicht und gehen nicht an Claude. Der Makler sieht nie einen Namen aus der Kohorte.

**3.9.5 Anker für das Gestalt-Urteil G6.** Vier Fragen, je 0 bis 25 Punkte:

| Frage | 25 Punkte heißt | 10 Punkte heißt |
|---|---|---|
| Ist eine Idee in jeder Anwendung sichtbar? | Wer Karte, Kachel und Website-Kopf nebeneinander sieht, benennt den Satz der Idee | Anwendungen wirken verwandt nur durch Farbe und Schrift |
| Ist es von Hand gesetzt? | Ziffern, Abstände, Ausschnitt tragen sichtbare Entscheidungen; die Wortmarke hat Eingriffe mit Grund | Name in einer Standardschrift, Standardabstände, zufälliger Ausschnitt |
| Wirkt der Feed als Satz von Bildern? | ein Licht, eine Beschnittregel, eine Textführung über zwölf Kacheln | einzelne gute Kacheln, die nebeneinander nicht zusammengehören |
| Würde ein Senior-Designer ein Katalogteil erkennen? | nein, kein Element wirkt wie aus einer Vorlage | ein Element stammt erkennbar aus einer Auswahlliste |

Maßstab ist die Fallstudie eines Top-Studios als Ableitung aus R1, R2 und R8 (Rubrik der Zerlegung), nicht eine belegte Arbeitsweise eines bestimmten Studios.

**3.9.6 Eichung an Ankerfällen.** Damit die Note wieder trennt, laufen vor dem ersten Einsatz und nach jeder Änderung der Rubrik drei Ankerfälle im Selbsttest (Setzung): das heutige Markenbuch von Markus aus v1 (muss mit Sperren S2, S7, S9, S10, S11 und G2 unter 60 scheitern, Befund aus KETTE_IST 4), Sara Novak ohne Antworten (muss an S15 scheitern) und eine vom Team handgeprüfte Montage (muss bestehen). Hält der CD im Betrieb eine Note für falsch, trägt er einen Kalibrierungsfall ein (`qualitaet.kalibrierung[]`: Kriterium, Note, erwartete Note, Grund). Das Gate bleibt zu. Drei gleichgerichtete Fälle führen zu einer neuen Rubrik-Version, die für alle Makler gilt (`qualitaet.rubrikVersion`).

### 3.10 Gate 2

**3.10.1 Die fünf Teile.**

| Teil | Feld | Bestanden, wenn |
|---|---|---|
| Schwellen | `gate2.schwellenOk` | `qualitaet.gesamt` mindestens 80, kein Kriterium unter 60, keine Klischees, `gate2.sperren` leer |
| Lautlese-Test | `gate2.lautleseOk` | jeder Satz der Lautleseliste hat in der letzten Runde das Urteil "trägt" vom CD. Die Liste: Claim, Versprechen, Story kurz, `botschaften.bio` je aktivem Kanal, die Hooks der drei Beiträge aus Woche 1 von `start30`, Text im Bild der ersten drei Kacheln, `feed.kacheln[].skript` des ersten Reels, `presse.beispielzitat` (MARKENQUALITAET Kapitel 2 verlangt Claim, Story kurz und drei Hooks; die übrigen Einträge sind Ergänzung, Setzung) |
| Zahlen | `gate2.zahlenGeprueft` | jede Zahl in einer Fläche, die der Makler oder die Öffentlichkeit sieht, ist "Unterlage geprüft", eine geprüfte Objektangabe aus dem Bestand oder als Angabe des Maklers vermerkt mit Unterlage und Termin vor `auftrag.termine.liveTag`; jede Kundenstimme ist wörtlich, datiert, freigegeben |
| Lücken | `gate2.offeneLueckenMitTermin` | keine öffentliche Lücke (S15); jede übrige Lücke hat `termin`, `wer` und `sperrtBis` (Reveal, Freigabe oder Live-Tag); der **Mindeststand für den Reveal** (unten) hält |
| Leitfragen | `gate2.checkliste` | der CD hat die sechs Leitfragen des Schritts mit Befund beantwortet |

**Mindeststand für den Reveal.** Der Höhepunkt des Reveals ist der Strom mit Profil (Akt 5 und 6). Er trägt nur, wenn die Flächen, die der Makler zuerst sieht, fertig sind. Darum gilt für `feed.kacheln` der Empfehlung und für `feed.gegenentwurf` gleichermaßen: keine Lückenkachel und keine Lückenfläche in der Pin-Reihe (Folge 1 bis 3), in der Rasterzeile darunter (Folge 4 bis 6, weil beide im Profil ohne Scrollen sichtbar sind, Setzung) und in den Kacheln, die der Entwurf für 5a und 5c öffnet. Eine Folge mit Kennzahl als Variable zählt dort als Lücke, solange ihre Zahl weder geprüft noch als Angabe des Maklers vermerkt ist und keine Quelle hat, etwa eine Ortsfolge ohne Marktquelle; sie wird gegen eine Tauschfolge aus `serien[].themenvorrat` oder die `reservefolge` getauscht. Lückenkacheln nach Schritt 13 (E10) bleiben ab Folge 7 erlaubt. Hält der Mindeststand nicht, ist Gate 2 nicht bestehbar, und es gilt die Verschiebungsregel aus 3.2. Das ist eigene Ableitung aus der Peak-End-Regel (3.13), keine Messung.

**Was als öffentliche vermerkte Zahl zählt (Präzisierung aus `16_freigabe.md` 3.3.1, K5).** Eine Stelle, die für eine nur vermerkte Zahl zusätzlich eine freigegebene **Fassung ohne Zahl** trägt (dieselben Regeln bestanden, bei einer Folge mit Kennzahl als Variable eine Tauschfolge aus `serien[].themenvorrat` oder die `reservefolge`), ist keine öffentliche vermerkte Zahl. Öffentlich vermerkt ist eine Zahl nur an einer Stelle ohne solche Fassung. `markenbuch.zahlen[]` führt dafür je Stelle `fassungOhneZahl: pfad | null`.

Die Vermerk-Regel bei Zahlen folgt MARKENQUALITAET Kapitel 2 ("Belege aus dem Fragebogen sind Selbstauskunft, sie tragen den Vermerk") und dem Wort-Link aus Schritt 7 ("Ihre Angabe, Kaufvertrag folgt."). Sie erlaubt, dass der Makler im Reveal seine eigene Zahl sieht; **veröffentlicht wird sie nie ungeprüft**: Schritt 16 friert keine Quelle ein, solange eine öffentliche Zahl nur vermerkt ist, im Sinn der Präzisierung oben. Der Vermerk steht im Kapitel Positionierung unter den Belegen, nicht auf der Kachel.

**3.10.2 Detektoren für UNIO-Regeln (S12).** Im gerenderten Baum jeder Seite, jeder Rolle und jeder Anwendung:
- Eyebrow: ein Textknoten direkt über einer Überschrift, höchstens 32 px darüber, mit weniger als 60 Prozent ihrer Schriftgröße und entweder Versalien, Laufweite über 0,05 em oder Monospace. Das fängt die Zeilen, die heute in `KapitelReveal` und `BrandProfil` stehen (R8 Nebenbefund) und die Mono-Zeile im Studio-Mock (KETTE_IST 2.6).
- Textzeichen als Icon: ein klickbares Element oder Listenzeichen, dessen Text nur aus Symbolzeichen besteht.
- Verlauf und Glow: `background-image` mit "gradient"; `box-shadow` oder `text-shadow` mit Unschärfe und farbigem Ton.
- Farbe (S3): Der Detektor liest aus `getComputedStyle` jedes Knotens `color`, `background-color`, `border-*-color`, `outline-color` und bei SVG-Elementen `fill` und `stroke` (auch aus Attributen und `currentColor` aufgelöst). Jeder Wert wird nach OKLCH gewandelt. Hat er Alpha unter 1, wird er zuerst mit dem Grund, auf dem er liegt (die nächste deckende Hintergrundfarbe der Vorfahren), gemischt und das Ergebnis geprüft, und zusätzlich wird geprüft, ob der deckende Anteil selbst ein Token ist: Ein Token mit gesetzter Deckkraft ist erlaubt, wenn `system.tokens` diese Deckkraft als Bauteilwert führt. Toleranz ΔE OK 0,02 gegen den nächsten Token (Setzung), damit Rundung und Farbprofile nicht anschlagen. Kantenglättung wird nicht im Baum, sondern nur im Raster sichtbar; der Detektor prüft darum deklarierte Werte, nie Pixel. Bilder (`img`, `background-image` mit URL, `image` in SVG) sind ausgenommen, ihre Farbbehandlung prüft Schritt 11. Ein Fund nennt Knoten, Eigenschaft, Wert und nächsten Token.
- Zeichen im Text: Gedankenstriche (U+2013, U+2014), Ausrufezeichen, Emojis, wie heute in `hmMarkenQualitaet` (Zeile 1063 bis 1065), aber über den gerenderten Text statt nur über die Plattform.

**3.10.3 Abzeichnung.** Der Knopf "Abzeichnen" ist erst aktiv, wenn alle fünf Teile bestanden sind. Er schreibt `cd`, `datum`, `version` und `pruefsumme` (SHA-256 über den kanonischen JSON-Text der Montage mit der vorhandenen Funktion `hmSha256`, `wb-werkzeuge.jsx` Zeile 101). Es gibt **keine Übersteuerung**: kein "trotzdem freigeben", kein zweiter Knopf für Eilige. Leitfrage 5 des Schritts ("Hält Gate 2 die dokumentierten Schwellen, oder wird nach Gefühl freigegeben?") wird so zur Eigenschaft des Codes. Der CD kann zurückgeben, mit einem Satz je Befund; das erzeugt Redaktionsaufgaben.

**3.10.4 Nach der Abzeichnung: gezeichnete Version und Hinweis.** Entschieden für die Regel, die Schritt 15 in seiner früheren Fassung als "Regel für alle Eingänge" führte und in 3.5 im letzten Satz weiter führt ("Gezeigt wird immer die gezeichnete Version"). Der Wortlaut, den 15 in 3.5 wörtlich übernehmen soll (5.6, Punkt 7c): **Der Reveal liest jedes Feld in der Version, die `gate2.version` abgezeichnet hat. Ändert sich nach Gate 2 ein Vorgänger, bleibt der Termin bei der gezeichneten Version, und die Änderung erscheint dem Team als Hinweis.** Das geht, weil jedes Vorgängerobjekt versioniert ist und `markenbuch.basis` die gezeichneten Versionen mit Prüfsumme hält; nichts ändert sich still, weil der Reveal nie die neuere Version liest.

- `hmMbNeuere(mid)` vergleicht bei jedem Öffnen `basis` mit den aktuellen Versionen und schreibt Abweichungen nach `gate2.neuereQuellen[] {schritt, objekt, gezeichnet, aktuell, am}`. Der Status bleibt "abgezeichnet".
- Schritt 15 prüft vor dem Start: `gate2.status === "abgezeichnet"` und `gate2.version` gleich der `markenbuch.version`, die der Ablauf liest. `status` schließt `schwellenOk` ein, weil ohne bestandene Schwellen nicht abgezeichnet werden kann; ein eigener Blick auf `schwellenOk` ist nicht nötig (Hinweis an 15 in 5.6).
- Sperren kann nach der Abzeichnung nur der CD: `hmGate2Zurueckziehen(mid, cd, grund)` setzt `status` auf "zurueckgezogen", etwa wenn die neuere Version einen Fehler behebt, der im Termin nicht gezeigt werden darf (eine falsche Zahl, ein Satz ohne Freigabe). Dann gilt die Frist neu, und der Termin wird verschoben, wenn sie nicht hält. Der Rückzug ist protokolliert und damit nie still.
- Die neueren Versionen gehen mit der Rückmeldung in Schritt 16: Dort ruft `hmGate2Pruefen` den geänderten Stand auf, Lautlese nur für geänderte Sätze (`16_freigabe.md` 3.3.2, Schritt 2 Sperrprüfung).

Während der Prüfung, also vor der Abzeichnung, ist eine geänderte Quelle dagegen ein Befund S14: Abgezeichnet wird nur, was im Moment der Abzeichnung gleich den aktuellen Versionen ist.

### 3.11 Materialpaket ohne Platzhalter

Das Paket entsteht aus der abgezeichneten Montage, nicht aus dem, was gerade im DOM steht. Ein Manifest listet jede Datei mit ihren Quellenpfaden und dem Status "vollständig". Aufgenommen wird nur, was vollständig ist; eine Lückenfläche (etwa "Hier steht Ihr erstes Objekt") darf im Reveal stehen, kommt aber nie ins Paket, sondern in `material.ausgeschlossen` mit Grund und Termin. Vor dem Packen läuft eine Suche nach Platzhaltern: "Kommt aus", "Lücke", eckige Klammern, "Hier kommt", "Vorname Nachname" (`hmWeltVoll`, Zeile 270), Ids von Demo-Objekten, Standardtexte aus `hmWeltPostDaten`. Ein Fund ist Sperre S11. Die drei Katalog-Logotypen werden nicht mehr exportiert; exportiert wird nur `system.wortmarke` mit ihren Varianten. Schriften im Druck kommen aus `system.typo` mit geprüfter Lizenz, nicht aus der festen Google-Fonts-Liste in `hmDrucken` (`wb-werkzeuge.jsx` Zeile 114). Das Paket selbst übergibt Schritt 16 (`uebergabe.paket`); Schritt 14 liefert Manifest und Prüfung.

### 3.12 Entwurf der Reveal-Folge (`praesentation.entwurf`)

Der Entwurf hat dieselbe Form wie der Ablauf in Schritt 15: **zehn Akte 0 bis 9, 60 Minuten**, jede Ansicht als `{id, akt, ansicht, variante, inhaltRef[]}` mit den Zusatzfeldern `titel`, `dauerMin`, `fuehrt`, `notiz`, `kriterium`, `nieFragen[]` und `bedingung` (`15_reveal.md` 3.4 und 8.2). Schritt 15 übernimmt jede Ansicht über `entwurfId` in `praesentation.ablauf`, teilt sie in Unteransichten, setzt Minuten, Begründungssatz und Sprechzettel und ändert nie `inhaltRef`. Die Dramaturgie folgt R8 2.3: Rückblick in seinen Worten, Problem, Kriterien, Idee, Anwendung im Kontext, Gegenentwurf im selben Kontext, zuletzt das Zeichen (Rand: https://www.logodesignlove.com/next-logo-paul-rand; Hsee zur Bewertbarkeit im Vergleich: https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf). Jede Ansicht trägt den festen Eintrag "nie fragen: Gefällt es Ihnen?".

| Akt | Ansicht (`ansicht`, `variante`) | `inhaltRef` | Minuten (Setzung aus 15) |
|---|---|---|---|
| 0 | Rahmen (`rahmen`, neutral) | `auftrag.termine`, `auftrag.dauer`, `auftrag.einwilligungen` | 2 |
| 1 | Seine Worte (`satz`, neutral), drei Sätze | nur `workshop.zitate` mit Sprecher Makler, `oeffentlich: ja`, ohne Personenbezug (Regel aus 15 3.4, Akt 1) | 3 |
| 2 | Einsicht (`einsicht`, neutral) | `markenbuch.kapitel[einsicht]` | 3 |
| 3 | Vertrag (`vertrag`, neutral) | `markenvertrag.attribute`, `positionierung.satz`, `markenvertrag.bestaetigtAm` über `markenbuch` | 3 |
| 4 | Weg und Idee: 4a Einsichten (`arbeit`), 4b Richtungen (`arbeit`), 4c verworfene Zeichen-Ideen (`arbeit`), 4d Belege gezählt (`belege`), 4e Claim auf seinem Porträt mit Idee-Satz (`idee`) | `markenbuch.weg` (Kapitel 1), `einsicht.kandidaten[].grund`, `gate1.verworfenWeil`, `idee.varianten[].wandtest` (nur Renders auf seinem Foto, 3.4.4), `markenbuch.zahlen`, `botschaften.claim`, `idee.satz` | 5 |
| 5 | Empfehlung in Anwendung (`empfehlung`): **5a Strom mit Fremdtest** (`strom`), 5b Profil mit Wochenregler (`profil`), 5c drei geöffnete Beiträge (`beitrag`), 5d Website-Kopf, Karte, Schild, Signatur, Exposé (`website`, `karte`, `schild`, `signatur`, `expose`) | `feed.kacheln[i]` für 5a und 5c, `feed.wochen`, `feed.profilkopf`, `markenbuch.kapitel[anwendungen]` | 15 |
| 6 | Gegenentwurf im selben Kontext (`gegenentwurf`): 6a Achse (`achse`), 6b Strom, 6c Profil, 6d Beiträge, 6e Alltag, 6f beide nebeneinander (`vergleich`, `beide`) | `idee.gezeigt.achse`, `feed.gegenentwurf`, `system.gegenentwurf` | 10 |
| 7 | Schrift, Farbe, Wortmarke, zuletzt das Zeichen (`typo`, `farbe`, `wortmarke`, `zeichen`, `beide`) | `system.typo`, `system.farbe`, Handsatz-Blatt aus `system.wortmarke`, `system.zeichen`, `idee.zeichen.herleitung`, dasselbe aus `system.gegenentwurf` | 4 |
| 8 | Fragen (`fragen`, neutral) | keine | 10 |
| 9 | Abschluss (`abschluss`, neutral) | `rueckmeldung.offenAb` aus Schritt 15, `auftrag.termine` | 2 |
| | Puffer | | 3 |
| | **Summe** | | **60** |

**Regeln, die der Entwurf erfüllt und `hmMbPraesentation` prüft.**
- Verworfene Varianten erscheinen nur in Akt 4 und nur als Wandtest-Render in Anwendung. Es gibt keine eigene Ansicht "Der Weg" mit Zeichenvarianten vor dem Feed, und vor Akt 7 keine Ansicht der Art `wortmarke`, `zeichen`, `farbe` oder `typo` (deckungsgleich mit Q2 in Schritt 15).
- Der Fremdtest steht als 5a **vor** dem Profil, weil er sonst nur noch Gesehenes wiedererkennt (15 3.2, Zeile Akt 5).
- **Bedingung des Fremdtests.** 5a trägt `bedingung: "stromGrundlage"`. Sie ist erfüllt, wenn der lizenzierte Pool `HM_STROM_POOL` vorliegt oder die Owner-Freigabe `einstellungen.stromScreenshots {owner, datum, grundlage}` gesetzt ist (15 3.6). Ist sie nicht erfüllt, **entfällt 5a** aus dem Entwurf, Akt 5 beginnt mit dem Profil, und `praesentation.fremdtest` bleibt mit dem Grund "keine Grundlage" leer; die Minuten gehen an 5b. Der Termin läuft nie mit Material ohne Grundlage. Die Beiträge im Strom stammen nur aus anderen Kategorien, nie von Maklern, auch nicht von UNIO-Maklern; die Kohortenfrage liegt in Gate 2.
- Jede Ansicht in Akt 4 bis 7 hat ein `kriterium` aus `markenvertrag.attribute` oder die Lücke "Kriterium vom Team"; Schritt 15 formuliert daraus den gesprochenen Satz.
- `inhaltRef` zeigt nur auf Pfade in der Version von `gate2.version`.
- **Sichtbare Wahl.** Unterscheiden sich Strom, Profil und Beiträge von Empfehlung und Gegenentwurf (6b bis 6d gegen 5a bis 5c) nur in einem Merkmal, das in der Kachelgröße kaum sichtbar ist, etwa nur im Porträtausschnitt halbnah gegen nah, meldet `hmMbPraesentation` den Befund "Wahl nicht sichtbar" an das Team und Schritt 9 (5.6). Er sperrt nicht, weil die Achse Schritt 9 gehört; der CD sieht ihn in 14.8. Eigene Ableitung: Eine Wahl, die der Makler nicht sieht, ist für ihn keine (Hsee, oben).

Die Dauer von 60 Minuten ist die Setzung aus `auftrag.dauer` (`01_auftakt.md`); Statuskarte (3.13), Entwurf und Schritt 15 nennen denselben Wert.

### 3.13 Was der Makler sieht

**Kein Kontakt, keine Minute Arbeit, keine Vorschau.** In seiner Werkbank, Ansicht Heute, steht eine ruhige Statuskarte. Kein Prozentbalken, kein Name eines Prüfers, kein Zwischenstand. Heute steht dort ", Daniel prüft" hinter dem Namen (`wb-markenbuch.jsx` Zeile 54); das entfällt.

Während der Prüfung:
> **Ihre Marke ist in der Endkontrolle.**
> Wir prüfen jede Zahl, jeden Satz und jede Anwendung, bevor Sie sie sehen. Den Reveal zeigen wir Ihnen am [Wochentag und Datum aus `auftrag.termine.reveal`, bei Markus Donnerstag, 5. November], um [Uhrzeit aus demselben Feld], 60 Minuten, mit [Teilnehmer aus `auftrag.entscheider`]. Vorbereiten müssen Sie nichts.

Nur wenn eine offene Aufgabe von ihm eine Frist hat, die Gate 2 oder den Live-Tag berührt (4.2), darunter ein Satz mit Frist und Folge, etwa (Datum Beispielwert):
> Eine Sache fehlt noch von Ihnen: der Kaufvertrag zum Zinshaus in Sievering, bis Montag, 9. November. Ohne ihn erscheint die Zahl nicht öffentlich.

Nach der Abzeichnung:
> **Ihre Marke ist fertig geprüft.** Wir sehen uns am Donnerstag.

Termin und Wochentag sind Beispielwerte aus `auftrag.termine` (`01_auftakt.md`, Beispiel). Die Anrede gegenüber dem Makler ist beim Owner offen (Zerlegung 7.1); bis dahin folgt die Karte wie der Wort-Link aus Schritt 7 der Anrede seiner Website (Setzung), bei Markus Sie. Die Karte hat keine Eyebrow, die Überschrift ist selbst die erste Zeile. Warum so wenig: Das Ende eines Erlebnisses und sein Höhepunkt prägen die Erinnerung (Peak-End-Regel: https://journals.sagepub.com/doi/10.1111/j.1467-9280.1993.tb00589.x); der Höhepunkt ist der Reveal, und jede Vorschau davor nimmt ihm genau das. Die Arbeit des Teams sieht er im Reveal und in Kapitel 1.

### 3.14 Wer was erzeugt

| Ausgang | Regeln | Claude | Team |
|---|---|---|---|
| `markenbuch.kapitel[]` | Montage, Belegungsplan, gerechnete Sätze | Verbindungssätze in Kapitel 1, je mit Quellenpfaden | Stratege redigiert |
| `markenbuch.kernUndOffen` | Einteilung aus Sperrstufen, Auswahl der Beispiele | | prüft, ob die Beispiele echt und gut sind |
| `markenbuch.rollen` | Filter, Einleitungen, Downloads, Fragen des Fünf-Minuten-Tests | Verkürzen der "immer" und "nie" für die Seite für Eilige | Fünf-Minuten-Test durch eine Person ohne Projektbezug |
| `markenbuch.redaktion[]` | Regelvorschläge (Länge, Anrede, Zahl ohne Klasse) | Vorschläge mit Kategorie und Grund | nimmt an oder lehnt ab, schreibt eigene |
| `qualitaet` | T1 bis T6, G1 bis G5 (Blindtest ausgenommen), Sperren, Kohorte | nichts; Claude vergibt keine Note | G6, Blindtest, Kalibrierungsfälle |
| `gate2` | Schwellen, Zahlenliste, Lückenliste, Hinweis auf neuere Quellen | nichts | Lautlese, Checkliste, Abzeichnung durch den CD |
| `praesentation.entwurf` | zehn Akte aus der Vorlage, `inhaltRef`, Bedingung des Fremdtests | Sprechnotizen und Kriterium je Ansicht | Stratege prüft |

### 3.15 Beispiel am Fall Markus Leitner (Döbling, Zinshaus, Figur Kenner, Sie-Form)

**a) Stand der Quellen.** Die v2-Kette ist für Markus nicht gelaufen. Die Montage liest die Beispiele der Schrittdokumente als Quellen. Alle Termine sind Beispielwerte aus `01_auftakt.md`.

| Schritt | Objekt | Stand im Beispiel | Herkunft |
|---|---|---|---|
| 5 | `einsicht` | K1 "Der Rat, dem man misstraut" vorläufig gewählt, `pruefung.bereit` nein, Karte fehlt | 05 3.8 |
| 6 | `territorien`, `gate1`, `richtung` | A "Nein als Rat" Empfehlung, C "Das eine Grätzl" Gegenentwurf, B "Die Akte zuerst" verworfen; Gate 1 nicht abzeichenbar, `richtung.zitatMakler` fehlt | 06 3.12, Gate-1-Eintrag |
| 7 | Vertrag | Entwurf mit Kernidee-Attribut "Zeitpunkt statt Tempo", nicht bestätigt | 07 3.8 |
| 8 | `stimme`, `botschaften`, `story`, `presse` | Claim-Empfehlung "Rat vor Auftrag.", Wahl durch den Makler steht aus; `botschaften.bio` je Kanal; `ueberMich` gleich `story.mittel` plus Einladung; "Zeit ist Teil des Preises." als Schablone gestrichen | 08 3.14 |
| 9 | `brief`, `idee` | Zeichen "Das Zeitmaß", Grammatik Weite, Gegenentwurf V9 auf der Achse Tonwert; Idee-Satz aus dem gestrichenen Claim hergeleitet; Abnahme offen | 09 3.11 |
| 10 | `system` | Beispiel rechnet noch mit einer Annahme vor Schritt 9 ("Der Zeitpunkt", Achse Satz); Farbwerte als Arbeitswerte, Amber #E1901F | 10 3.6; Befund in 11 Zeile 193 |
| 11 | `bild`, `fotobrief` | auf `idee` aus Schritt 9 gerechnet, Porträt-Termin nötig | 11 3.12 |
| 12 | `saeulen`, `serien` | Signatur "Zeitwert" (Alternative "Nach dem Grundbuch", Wahl in der Rückmeldung), dazu "Vor der Unterschrift", "Stand Sievering", "Verbüchert", "Warum jetzt" (ruhend), "Alteingesessen"; im Stoff der Claim als Annahme "Zeit ist Teil des Preises." | 12 3.15 |
| 13 | `feed`, `start30` | zwölf Kacheln, 8 von 12 mit Gesicht, Lückenkachel Nr. 7; belegt mit angenommenen Serien ("Noch nicht verkaufen", "Sievering in Zahlen", "Der Dienstag", "Ihre Frage", "Ein Haus"); Bio im Profilkopf als eigener Text mit dem gestrichenen Claim | 13 3.8 |
| 1 | Termine | gelesen aus `auftrag.termine`, Stand `01_auftakt.md`: Reveal Do 05.11.2026, Porträt-Termin Do 29.10.2026 (vorgemerkt), Live-Tag Di 24.11.2026 aus `hmRolloutPlan` Plan A; `gate2.frist` daraus Mo 02.11.2026. Ändert Schritt 1 den Plan (Puffer vor dem Porträt-Termin, 5.6), rechnen sich alle Daten dieses Beispiels neu | 01, Beispiel |

**14.1 Montage.** Ergebnis "wartet": 5, 6 und 7 sind nicht abgenommen, 8 wartet auf die Wahl des Claims, 9 bis 13 bauen nicht auf denselben Versionen. Die Prüfung läuft trotzdem auf dem Entwurf, damit das Team sieht, was Gate 2 finden würde. Abzeichnen ist nicht möglich.

**b) Was die Prüfung findet.** Jeder Befund ist aus den vorliegenden Dokumenten nachvollziehbar; keiner ist erfunden.

| Nr. | Befund | Regel | Folge |
|---|---|---|---|
| 1 | **Die Idee steht auf einem gestrichenen Claim.** Schritt 9 leitet "Neben jedem Preis steht seine Zeit." und die Herleitung des Zeitmaßes aus "Zeit ist Teil des Preises." ab (09 Kurzfassung Punkt 7 und V1). Schritt 8 hat diesen Satz als Schablone gestrichen und empfiehlt "Rat vor Auftrag." (08 3.14, Tabelle der Kandidaten). Das Beispiel in Schritt 10 baut noch auf "Der Zeitpunkt" | Q1: `idee.basis.botschaften` und `system.basis.idee` zeigen nicht auf die aktuellen Versionen; S14 | Schritt 9 leitet den Idee-Satz neu aus "Rat vor Auftrag." ab; das Zeitmaß kann bleiben, weil schon Territorium A es als Spanne zwischen Rat und Ergebnis anlegt (06, Zeichenidee A). Schritt 10 stellt auf `idee` um. Kein Zeichen im Buch, bis alle dieselbe Version lesen |
| 2 | **Der gestrichene Satz lebt an drei Stellen weiter.** "Zeit ist Teil des Preises." steht in 12 als Annahme für `botschaften.claim` (12 3.15, Tabelle Stoff), in 13 als dritte Zeile der Bio (13 3.8) und in 9 im Herleitungssatz für den Reveal. Der Satz steht wörtlich im Regelcode für jeden Kenner (`wb-plattform.jsx` Zeile 215) | S2 an jeder Stelle, die wie ein Claim gesetzt ist; S17, weil der Satz den Schablonenkorpus trifft | an allen drei Stellen durch den Verweis auf `botschaften.claim` ersetzen; eine Ausnahme nach S17 ist nicht möglich, weil Schritt 8 den Satz gestrichen hat |
| 3 | **Einsicht als Kopie.** `brief.einsicht` (9) enthält "Familientisch" und "Zeitdruck"; beide Wörter stehen in keiner Antwort und nicht in `einsicht.spannung` (5) | `brief.einsicht` ist nach Vertrag `{ref, text}`; `text` weicht von `ref` ab; T3, S9 | Text aus `ref` neu setzen, im Brief und überall, wo er erscheint |
| 4 | **Kacheln ohne Serie.** Die zwölf Kacheln in 13 sind mit angenommenen Serien belegt (13 3.8, Annahmen); keine davon steht in `serien[]` aus 12. Die Reel-Skripte folgen damit keinem `serien[].ablauf` aus 12 | Belegungsplan: `feed.kacheln[i].serie` löst nicht auf `serien[].id` auf; Q2 | Schritt 13 belegt neu: Signatur Zeitwert dienstags, Vor der Unterschrift, Stand Sievering, Verbüchert, Alteingesessen; Skripte nach dem Ablauf von Zeitwert (Fall wählen, Dauer benennen, Rechnung in drei Sätzen, Gegenfall, Endkarte) |
| 5 | **Eine interne Zahl auf der ersten Kachel.** Kachel 1 (angepinnt, Live-Tag) zeigt "b1 sichtbar"; b1 ist `oeffentlich: offen` | S5, `zahlenGeprueft`; Präzisierung K5 | Kachel 1 bekommt eine Fassung ohne Zahl, etwa die Folge "Eine Woche" aus dem Themenvorrat von Zeitwert; b1 bleibt intern, bis Markus entschieden hat |
| 6 | **Zahlen nur als Angabe.** 600.000 nach zwei Jahren (b1), 4,2 Mio. in 11 Wochen (b2), 8 Prozent über Erstschätzung (b3), 6 bis 8 der letzten zehn in Sievering (b4), 14 Abschlüsse 2025 (b5): alle Selbstauskunft. "1902" ist ungeklärt, Baujahr oder Hausnummer | T3, Zahlenliste | alle fünf als Angabe vermerkt, Unterlagen bis zum Werktag vor `auftrag.termine.freigabe` (Beispiel Mo 09.11.2026); "1902" in keinem öffentlichen Text, bis geklärt |
| 7 | **Wiedergabe als Kundenstimme.** "Dass sie sich nie gedrängt gefühlt haben." ist seine Wiedergabe, keine Kundenstimme (04 Beispiel; `vorab.kundenstimmen` leer) | S6 | im Kapitel Positionierung als "Ihre Wiedergabe im Workshop" erlaubt; in Bio, Website oder Kachel als "Kunden sagen" gesperrt |
| 8 | **Kein eigenes Objekt, keine Energiedaten.** Der Bestand-Import kennt keine Energieausweis-Felder (`HM_IMPORT_FELDER`, `wb-werkzeuge.jsx` Zeile 127); 13 setzt die Lückenkachel Nr. 7 | S7, S10; E10 in 13 erlaubt eine Lückenkachel | Exposé und Kachel 7 als Lückenfläche im Reveal, nicht im Paket. Keine Erinnerung aus Schritt 14: Die Aufgabe liegt in der Lückenkachel aus 13 und im Import-Feld aus Schritt 1 (5.6) |
| 9 | **Zwei Ursprünge der Bio.** 8 liefert `botschaften.bio.instagram` ("Für Erben und Anleger mit Zinshaus oder Altbau in Döbling, Währing und Hietzing. Rat vor Auftrag.", 97 Zeichen); 13 schreibt eine eigene Bio in drei Zeilen | Belegungsplan: genau ein Pfad je Stelle | Profilkopf liest `botschaften.bio.instagram`, wie 8 es in seinem Hinweis 7 an 13 verlangt; die eigene Bio in 13 entfällt |
| 10 | **Offene Druck- und Lizenzwerte.** CMYK-Werte, Schriftfamilien nach Prüfsatz und Lizenz, Schildmaß und das A4-Raster des Buchs sind offen | G3, Lückenliste | Lücken mit Termin vor Schritt 16, wer: Designer und UNIO-Team; die Druckerei-Sicht zeigt sie ehrlich als offen |
| 11 | **Porträts reichen nicht.** höchstens vier verwendbare Gesichtsbilder, gebraucht acht (11 3.12) | G2, Lückenliste | Porträt-Termin aus `auftrag.termine.portraet` (Beispiel Do 29.10.2026, zwei Werktage vor `gate2.frist`, der Abstand aus 3.2 hält knapp); ohne ihn keine acht Gesichter, Mindeststand und Gate 2 nicht bestehbar |
| 12 | **Kohorte klein und nicht geteilt.** Im Seed hat nur Elif Demir eine Plattform, Sara Novak hat keine Antworten; die Kohorte liegt nur im Browser | G4, S16 | Blindtest "nicht prüfbar" ohne Abzug (kleine Kohorte); solange `api/wb-kohorte.js` fehlt, ist die Kohortenprüfung auf jedem zweiten Gerät "nicht prüfbar" und sperrt |

Nicht mehr als Befund geführt: Ob die Website unter Über mich `botschaften.ueberMich` oder `story.mittel` zeigt, hat Schritt 8 entschieden (`ueberMich` gleich `story.mittel` plus Einladung). Für den Claim "Rat vor Auftrag." ist kein Treffer im Schablonenkorpus bekannt; offen bleibt der Austauschtest gegen die Karte, den Schritt 8 selbst als Lücke führt.

**c) Der Gegenbeweis: das v1-Markenbuch durch Gate 2.** Das heutige Markenbuch von Markus hat in der alten Prüfung 95 von 100 (MARKENQUALITAET Kapitel 3). Durch Gate 2 fällt es an sechs Sperren, unabhängig von jeder Note: zwei Claims (S2), vier Demo-Objekte aus Innere Stadt, Wieden und Donaustadt (S7), der Fülltext "3 Fehler, die ich bei fast jedem Verkauf sehe." (S9), Objekt-Kacheln ohne Energiekennzahlen (S10), ein Materialpaket mit Demo-Vorschauen und Katalog-Logos (S11), die Eyebrow im Studio-Mock (S12). Dazu G2 weit unter 60 mit einem Gesicht in neun Kacheln (KETTE_IST 4). Das ist der erste Ankerfall des Selbsttests.

**d) Kapitel 1 für Markus (Makler-Sicht, nach der Sprachregel, rund 240 Wörter).** Eckige Klammern sind gerechnete oder noch fehlende Stellen; im fertigen Buch steht dort der Wert, oder der Satz entfällt. Neben dem vierten Absatz steht im Buch die Reihe der Wandtest-Renders (3.4.4).

```text
Wie wir zu Ihrer Marke gekommen sind

Am Anfang standen Ihre drei letzten Abschlüsse und Ihr Rat an eine
Erbengemeinschaft, zwei Jahre zu warten, statt unter Druck zu verkaufen.
Dazu kam ein Satz von Ihnen aus unserem Gespräch: [Zitat, Sprecher Makler].

Über Ihre Kunden haben wir drei Vermutungen geprüft. Geblieben ist diese:
Ihre Kunden wollen sich nie gedrängt fühlen. Solange Ihre Provision im
Raum steht, fürchten sie genau das. Dass Erben vor allem Zeitdruck
spüren, haben wir verworfen. Es stand nur in einem einzigen Ihrer Fälle.
Dass Ihre Kunden leise verkaufen wollen, haben wir auch verworfen.
Diskretion kann man öffentlich nicht zeigen, ohne sie zu brechen.

Daraus haben wir drei Richtungen gebaut: Nein als Rat, Die Akte zuerst
und Das eine Grätzl. Zwei davon haben wir Ihnen am [Datum] gezeigt.
[Ihr Satz aus diesem Termin.] Die Akte zuerst fiel, weil viele Makler
mit Unterlagen werben. Ihre Kunden zweifeln nicht an Ihrem Wissen,
sondern daran, ob Sie zu ihrem Vorteil raten. Ihre Familie bleibt aus
dem Bild, so wie Sie es wollten.

Für das Zeichen haben wir acht Ideen auf Ihrem Foto ausprobiert. Die
Kante aus Hell und Dunkel fiel, weil sie Entscheidung zeigt und nicht
Zeit. Das Doppelbild fiel, weil es von jedem Haus zwei Aufnahmen braucht,
die es nicht gibt. Auch eine Uhr haben wir ausprobiert. Sie fiel, weil
bei Zeit jeder zuerst an eine Uhr denkt. Geblieben ist eine Linie, die
Zeit bemaßt wie ein Plan den Raum: vom Rat bis zum Ergebnis.

Bevor Sie diese Seiten sehen, haben wir [n] Zahlen geprüft, [k] davon
gegen Unterlagen. Jeden Satz haben wir laut gelesen. Verglichen haben wir
Ihre Marke mit den Marken der [m] anderen UNIO-Makler.
[Datum, Creative Director]
```

Quellen der Sätze: Absatz 1 aus `antworten.faelle` (Zählung), `antworten.abgeraten` (wörtlich "statt unter Druck zu verkaufen", 06 Stimmprobe A) und `workshop.zitate`; Absatz 2 aus `einsicht.satz` und `einsicht.kandidaten[K2, K3].grund` (05 3.8); Absatz 3 aus `territorien[].name`, `gate1.verworfenWeil` (06, in Alltagssprache übertragen: aus "Unterscheidbarkeit" wird "viele Makler werben mit Unterlagen", aus "Antwort auf die Spannung" der Satz über den Zweifel) und `richtung.tabus` (Seed "Familie zeigen"); Absatz 4 aus `idee.varianten[V3, V2, V6].verworfenWeil` und `wandtest` (09 3.11: V6, die Zeigerstellung seines Grundbuch-Termins, wurde ausprobiert und fiel als Anzeige und an den Verboten des Kernsatzes; damit ist der frühere Widerspruch "acht gezeichnet" gegen "fiel, bevor sie gezeichnet war" aufgelöst), dazu `territorien[A].zeichenIdee` für "vom Rat bis zum Ergebnis", gültig erst nach der neuen Herleitung in Schritt 9 (Befund 1); Absatz 5 gerechnet aus `markenbuch.zahlen` und `qualitaet.aehnlichkeitKohorte.kohorteGroesse`. Längster Satz 17 Wörter. Kein Wort der Jargonliste; "Richtung" und "Zeichen" sind Wörter aus seinem Richtungstermin und seinem Vertrag. Die Kritikpunkte der Territorien stehen nur in der Team-Sicht.

**e) Kern und Offen für Markus (Auszug).**

| Teil | Element | Wert oder Verweis | Stand |
|---|---|---|---|
| Kern | Claim | "Rat vor Auftrag." | Empfehlung aus 8, Wahl im Wort-Link steht aus |
| Kern | Anrede | Sie auf Instagram, LinkedIn und Website; Presse in dritter Person | Seed `anrede` "Sie, überall"; `hmAnrede` Kontext `presse` |
| Kern | Zeichen | Das Zeitmaß, an der Unterkante der sicheren Fläche, bündig links, als Punkt (Stand) oder Spanne (Dauer) | 9, V1; Herleitung neu nach Befund 1 |
| Kern | Belegpflicht | keine Zahl ohne ihre Zeit und ohne Quelle | 9 E1, 8 `stimme.verbindlich` |
| Kern | Akzent | eine Akzentfarbe, nur im Zeitmaß; auf Papier nie Textträger | 9 E2, 10 Kontrastmatrix |
| Kern | Porträt | sitzend, frontal, Vormittagslicht von der Seite | 9 E3, E4; 11 |
| Kern | Objekt | HWB, Endenergiebedarf und Klasse, bei älteren Ausweisen HWB und fGEE | 12 `objektRegel` |
| Offen | Dauer in Zeitwert | die eine Variable der Signatur: so "Elf Wochen", auch so "Eine Woche"; nicht so: "Warten empfehlen ohne Rechnung." (`markenvertrag.falschWaere`) | 12 `serien[0].variable` und Beispiele |
| Offen | Hook | innerhalb der Formel "[Dauer]. Was [das Warten, der schnelle Verkauf] [wem] [gebracht hat, erspart]."; so "Elf Wochen. Was der schnelle Verkauf diesem Zinshaus gebracht hat.", auch so "Eine Woche. Was sie Erben an Entscheidungen erspart."; nicht so "Jetzt verkaufen, bevor die Preise fallen." | 12 `hookFormel`, 7 `falschWaere` |
| Offen | Motiv in Stand Sievering | ein Eingang in Sievering, Tür, Tor oder Stiege, nie die ganze Fassade; nicht so: Uhr, Sanduhr, Countdown | 12 `serien[].variable`, 7 `falschWaere` Art Bild |
| Offen | Quartal | Lücke: `system.festUndVariabel.variabel` ist für Markus nicht festgelegt; Staffel 1 hat das Thema Erbe | 10; 12 `serieSignatur.staffel` |

**f) Seite für Eilige für Markus (Textstand, Werte aus 10 als Arbeitswerte markiert).**

```text
Markus Leitner. Die Marke auf einer Seite.
Version [n], geprüft am [gate2.datum]

Der Name
[Wortmarke liegend]. Nie kleiner als 120 px digital und 25 mm im Druck.
Rundum eine Versalhöhe frei.

Der Satz
Rat vor Auftrag.
Genau so, mit Punkt. Es gibt keinen zweiten.

So sprechen wir
Sie, auf Instagram, LinkedIn und der Website.
In Pressetexten über ihn, in der dritten Person.

Farben
Papier #F5F1EA für Flächen. Text #191714 für jede Schrift.
Amber #E1901F nur im Zeitmaß, nie als Schriftfarbe auf Papier.
(Arbeitswerte, Druckwerte folgen)

Schriften
[Display, Lücke] für Sätze und Zahlen. [Text, Lücke] für alles andere.

Das Porträt
[Asset Nummer eins]. Er sitzt, schaut ruhig, Licht von der Seite.

Immer
Jede Zahl mit ihrer Zeit und ihrer Quelle.
Bei jedem Objekt HWB, Endenergiebedarf und Klasse.
Das Zeitmaß immer an derselben Stelle, als einzige Stelle in Amber.

Nie
Druck mit Fristen, die es nicht gibt.
Warten empfehlen ohne Rechnung.
Uhren, Sanduhren oder Countdowns als Bild für Zeit.

Fragen
An das UNIO-Team, über die Nachricht in der Werkbank.
```

Mindestgröße der liegenden Wortmarke aus `10_system.md` (Tabelle der Varianten: 120 px digital, 25 mm im Druck). Auswahl nach der Rangregel aus 3.7: Bei "Immer" stehen die zwei Pflichten und eine eigene Einschränkung aus `brief.einschraenkungen` (E2); bei "Nie" drei eigene Einträge aus `markenvertrag.falschWaere` (Satz, Verhalten und das Bildverbot, das aus seiner Idee folgt). Handschlag und Schlüssel erscheinen nicht, weil drei eigene Einträge vorliegen. Die Zwischentitel sind Überschriften in Satzschreibung und Überschriftengröße, keine kleinen Versalzeilen über einer Headline. Die fünf Testfragen: Welche Anrede gilt auf LinkedIn (Sie)? Darf Amber als Schriftfarbe auf Papier stehen (nein)? Was steht bei jedem Objekt (HWB, Endenergiebedarf, Klasse)? Wie lautet der Satz der Marke (Rat vor Auftrag.)? Darf ein Beitrag über Warten eine Sanduhr zeigen (nein)?

**g) Gate 2 für Markus, Stand heute.**

```js
gate2 = {
  status: "gesperrt", frist: "2026-11-02" /* hmGate2Frist(mid), aus auftrag.termine.reveal */, cd: null, datum: null, version: null, pruefsumme: null,
  schwellenOk: false,           // Note nicht berechenbar: 5 bis 7 nicht abgenommen, 8 wartet auf die Wahl; Sperren offen
  lautleseOk: false,            // Bio und Hooks aus 8 und 12 liegen vor, der Claim ist nicht gewählt, Skripte fehlen (Befund 4)
  zahlenGeprueft: false,        // b1 bis b5 Selbstauskunft; b1 auf Kachel 1 ohne Fassung ohne Zahl (Befund 5)
  offeneLueckenMitTermin: false,
  neuereQuellen: [],
  sperren: [
    { id: "S14", detail: "idee baut auf dem gestrichenen Claim, system auf einer Annahme vor Schritt 9 (Befund 1)" },
    { id: "S2",  detail: "Zeit ist Teil des Preises. an claimartigen Stellen in 9, 12, 13 (Befund 2)" },
    { id: "S17", detail: "derselbe Satz trifft den Schablonenkorpus, keine Ausnahme möglich (Befund 2)" },
    { id: "S9",  detail: "brief.einsicht.text ohne Deckung durch einsicht.spannung (Befund 3)" },
    { id: "Q2",  detail: "feed.kacheln[].serie löst nicht auf serien[].id auf (Befund 4)" },
    { id: "S5",  detail: "b1 öffentlich auf Kachel 1 (Befund 5)" },
    { id: "S15", detail: "Claim und öffentliche Belege stehen nicht aus bestätigten Quellen" }
  ],
  luecken: [
    { pfad: "beweise[b1..b5].unterlage", was: "Kaufverträge, Bewertung, Liste 2025", wer: "Makler", termin: "2026-11-09" /* Werktag vor auftrag.termine.freigabe */, sperrtBis: "freigabe" },
    { pfad: "bild.portraet", was: "Porträt-Termin", wer: "Team und Makler", termin: "2026-10-29" /* auftrag.termine.portraet */, sperrtBis: "reveal" },
    { pfad: "system.farbe.*.cmyk", was: "Druckwerte", wer: "Designer", termin: "vor Schritt 16", sperrtBis: "freigabe" },
    { pfad: "system.typo.lizenz", was: "Familien nach Prüfsatz, Lizenz Web, Social, Druck", wer: "Designer", termin: "vor Schritt 16", sperrtBis: "freigabe" },
    { pfad: "system.raster.formate[expose]", was: "Rand, Spalten, Bundsteg A4 für Exposé und Buch", wer: "Designer", termin: "vor Schritt 16", sperrtBis: "freigabe" },
    { pfad: "raster.schild", was: "Schildmaß", wer: "UNIO-Team", termin: "vor Schritt 16", sperrtBis: "freigabe" },
    { pfad: "objekt[0]", was: "erstes eigenes Objekt mit Energieausweis", wer: "Makler", termin: "2026-11-24" /* auftrag.termine.liveTag */, sperrtBis: "live", aufgabeIn: "13 Lückenkachel" }
  ]
}
```

Die Frist rechnet `hmGate2Frist(mid)` aus `auftrag.termine.reveal`: Beim Stand von Schritt 1 (Reveal Do 05.11.2026) ist das der dritte Werktag davor, Mo 02.11.2026 (Mi 04.11., Di 03.11., Mo 02.11.). Die Angabe "03.11." in `01_auftakt.md`, Moment 7, folgt dieser Zählung nicht; 1 liest den Wert künftig aus der Funktion (5.6). An diesem Tag baut Schritt 15 den Ablauf. Hält die Frist nicht, wird der Reveal verschoben (3.2).

**h) Statuskarte für Markus.** Wie in 3.13, mit dem Satz zur Unterlage, weil b2 ("4,2 Mio., 11 Wochen") die Schärfung aus Gate 1 trägt und ohne Kaufvertrag nie öffentlich wird. Die Frist dieser Aufgabe liegt vor Freigabe 2 und damit vor dem Live-Tag, darum erscheint sie. Die Energieausweis-Aufgabe erscheint nicht in der Statuskarte; sie steht in der Lückenkachel.

---

## 4. Fragen an den Makler

### 4.1 Regelfall: keine neue Frage

Schritt 14 stellt keine Frage. Jede Eingabe liegt nach den Schritten 1 bis 13 vor. Eine Frage an dieser Stelle würde einen vorhandenen Wert erneut erheben, eine Gestaltungsaufgabe stellen oder dem Makler vor dem Reveal einen Zwischenstand zeigen; alle drei schließt die Rubrik aus.

### 4.2 Bedingte Erinnerungen an bestehende Aufgaben

Die Statuskarte zeigt eine Aufgabe nur, wenn drei Bedingungen zugleich gelten: Sie besteht schon (dieselbe Aufgabe in `workshop.aufgaben` oder im Store `schritte`, keine neue); ihre Frist liegt vor `gate2.frist` oder sie sperrt Freigabe 2 oder den Live-Tag (`markenbuch.luecken[].sperrtBis` "reveal", "freigabe" oder "live" und Termin vor diesem Ereignis); und ihr Ausgang ändert eine Fläche, die öffentlich wird. Sonst drängt die Karte ohne Anlass und bleibt still.

| Erinnerung (Sie-Form wie bei Markus) | Bedingung | Wirkt auf | Warum sie den Output verändert |
|---|---|---|---|
| "Der Kaufvertrag zum Zinshaus in Sievering, bis Montag, 9. November. Ohne ihn erscheint die Zahl nicht öffentlich." (Datum Beispielwert) | ein Beleg in einem öffentlichen Slot ist Selbstauskunft, die Unterlagen-Aufgabe aus Schritt 4 ist offen, der Termin liegt vor Freigabe 2 | `beweise[i].pruefstatus`, `gate2.zahlenGeprueft`, damit ob die Zahl in Bio, Website und Kachel steht oder die Fassung ohne Zahl gilt (3.10.1) | Mit Unterlage bleibt die Kachel wie gezeigt; ohne gilt öffentlich die Fassung ohne Zahl |
| "Die Freigabe von [Kundin, Rolle] für ihren Satz, bis [Datum]." | eine Kundenstimme ist für einen öffentlichen Slot vorgesehen, `vorab.kundenstimmen[i].freigabe` offen, Termin vor Freigabe 2 | `vorab.kundenstimmen[i].freigabe`, S6 | Ohne Freigabe steht dort kein Kundensatz, sondern ein Beleg aus seinen Fällen |

**Die Energieausweis-Daten sind keine Erinnerung dieses Schritts.** Sie gehören an zwei andere Stellen: als Feld im Bestand-Import von Schritt 1 (Hinweis in 5.6), damit sie mit dem Objekt kommen, und als Satz der Lückenkachel aus Schritt 13 ("Sobald ein Objekt mit Energieausweis in Ihrem Bestand ist."). Schritt 14 bleibt damit ohne neuen Kontakt; die Lücke steht mit Termin in `markenbuch.luecken`, und das Exposé zeigt die Lückenfläche.

### 4.3 Abgeleitet statt gefragt

| Was man fragen könnte | Warum nicht | Woher es kommt |
|---|---|---|
| Gefällt Ihnen das Markenbuch? | nie; die Rückmeldung läuft nach dem Reveal entlang des Vertrags | Schritt 15, `rueckmeldung.jeKriterium` |
| Wollen Sie den Entwurf vorab sehen? | der erste Blick gehört in den geführten Reveal (A6) | `praesentation.entwurf` |
| Welche Kapitel brauchen Sie, wer arbeitet mit Ihrer Marke? | die Rollen stehen fest; wer sie bekommt, entscheidet die Übergabe | Schritt 16 `uebergabe.paket` |
| Stimmen diese Zahlen noch? | bestätigt in Schritt 2 und 4, geprüft über Unterlagen | `beweise`, `workshop.aufgaben` |
| Welcher Satz soll auf die Visitenkarte? | genau einer, der Claim | Belegungsplan, `botschaften.claim` |
| Welche Farbe für die Druckerei? | Gestaltung, und schon entschieden | `system.farbe` |
| Ist diese Formulierung in Ordnung? | bestätigte Sätze sind gesperrt, freie redigiert das Team | Redaktion, Sperrstufen |
| Haben Sie die Daten des Energieausweises? | gehört in den Import und in die Lückenkachel, nicht in die Endkontrolle | Schritt 1 Import-Feld, Schritt 13 Lückenkachel |
| Möchten Sie das Markenbuch als Datei? | Ansicht statt Datei; die Makler-Sicht öffnet mit der Rückmeldung | 3.7, Schritt 16 |

---

## 5. Eingang und Ausgang

### 5.1 Eingang nach Vertrag

| Von | Feld | Wofür in diesem Schritt |
|---|---|---|
| 5 | `einsicht` | Kapitel 2, Satz für Kapitel 1, Belegtafel für T1 |
| 5 | `einsicht.kandidaten` | Kapitel 1, Absatz 2 |
| 6 | `territorien` | Kapitel 1 mit Rohskizzen, Kritik in der Team-Sicht |
| 6 | `gate1` (verworfene Wege) | Kapitel 1, Empfehlung und Gegenentwurf, `verworfenWeil` |
| 7 | `positionierung` | Kapitel 3, Lautlese (Versprechen über Zeile 7 unten), T1 |
| 7 | `markenvertrag` | Kapitel 3, Rückmeldungskriterien in `praesentation.entwurf`, `falschWaere` als Grenzen in Kern und Offen |
| 7 | `beweise` | Zahlenliste, Kapitel 3, Belege in Kapitel 1 |
| 8 | `stimme` | Kapitel 4, Kern und Offen, Seite für Eilige |
| 8 | `anrede` | Sperre S4 über `hmAnrede(mid, kontext, opt)` und `hmAnredePruefen`, Rollen, Statuskarte |
| 8 | `botschaften` | Belegungsplan (Claim, `bio` je Kanal, Über mich, Boilerplate), Lautlese; `claimAlternativen` nur für Kapitel 1 (08 nennt 14 als einzigen Abnehmer) |
| 8 | `story` | Kapitel 4, T5 |
| 8 | `presse` | Kapitel 11 |
| 9 | `brief` | Kapitel 5, Vorrang der Einschränkungen (Befund 10) |
| 9 | `idee` | Kapitel 5, G1, G2 |
| 9 | `idee.begruendung` | G1 |
| 9 | `idee.varianten` | Kapitel 1, Absatz 5 |
| 10 | `system` | Kapitel 6 und 10, Tokens für S3, Sperrstufen für Kern und Offen, Stresstest und Prüfung für G3 |
| 11 | `bild` | Kapitel 7, Porträt, Kontaktbogen-Rechte für S8 und S13, Lücken |
| 11 | `fotobrief` | Sicht Fotograf |
| 12 | `saeulen`, `serien`, `konzepte`, `vorlagen` | Kapitel 8, T6, Sicht Assistenz; `serien[].id` als Ziel von `feed.kacheln[].serie` im Belegungsplan |
| 13 | `feed` | Kapitel 9, G2, Lautlese (Text im Bild, `kacheln[].skript` des ersten Reels) |
| 13 | `start30` | Kapitel 9, Lautlese (Hooks Woche 1) |
| Extern | freigegebene Quellen aller anderen UNIO-Makler | Kohorte, T2 und G4 |

### 5.2 Ergänzte Eingänge, begründet

| Von | Feld | Warum nötig | Symmetrie |
|---|---|---|---|
| 7 | `versprechen`, `rolle`, `werte`, `persoenlichkeit`, `markenvertrag.herkunft`, `markenvertrag.anmerkungen`, `markenvertrag.pruefung` | Kapitel 3 zeigt sie; Schritt 7 nennt 14 in seinem Abschnitt 5.5 als Abnehmer; `herkunft` für die Kennzeichnung eigener Worte und die Sperrstufe `woertlich`, `anmerkungen` für Kapitel 1 | 7 ist Vorgänger |
| 5 | `einsicht.satz`, `einsicht.tafel`, `einsicht.pruefung` | Kapitel 1; die Belegtafel ist die Ankerliste für T1; die Prüfung geht in `qualitaet` (05 Abschnitt 5.4 nennt 14 als Abnehmer) | 5 ist Vorgänger |
| 6 | `richtung` (zitatMakler, tabus, datum), `territorien.kritik` | Kapitel 1, Absatz 3; Kritik nur in der Team-Sicht | 6 ist Vorgänger |
| 9 | `idee.codes`, `idee.gezeigt` | G2; Empfehlung und Gegenentwurf in Kapitel 1 und im Reveal-Entwurf | 9 ist Vorgänger |
| 10 | `system.pruefung`, `system.gegenentwurf` | G3, G4; Reveal-Entwurf Ansicht 10 (10 nennt 14 als Abnehmer) | 10 ist Vorgänger |
| 11 | `bild.portraetTermin`, `bild.luecken`, `bild.kontaktbogen[].rechte` | Lückenliste mit Termin, S8, S13 (11 nennt 14 als Abnehmer) | 11 ist Vorgänger |
| 12 | `serieSignatur`, `grammatik`, `kanalplan`, `sprachpruefung`, `objektRegel`, `serien[].themenvorrat`, `reservefolge` | Kanalplan für die Assistenz, Sprachprüfung und Objektregel für S1 und S10; Themenvorrat und Reservefolge als Fassung ohne Zahl (3.10.1) | 12 ist Vorgänger |
| 13 | `feed.profilkopf`, `feed.wochen`, `feed.pruefung`, `feed.gegenentwurf`, `feed.linkedin`, `feed.kacheln[].skript` | Profilkopf (Highlights, Pins; die Bio selbst kommt aus `botschaften.bio`), Reveal-Entwurf, G2, Reel-Sätze | 13 ist Vorgänger |
| **1** | `auftrag.termine`, `auftrag.entscheider`, `auftrag.einwilligungen`, `vorab.kundenstimmen`, `vorab.material`, eigene Objekte aus dem Bestand-Import | Das Erlebnis im Vertrag verlangt, dass der Makler sieht, **wann** der Reveal stattfindet: das steht nur in `auftrag.termine`. Leitfrage 3 verlangt Kundenstimmen "wörtlich mit Datum und Freigabe": die Quelle ist `vorab.kundenstimmen`. S13 braucht die Einwilligungen, die Anwendungen brauchen eigene Objekte | **neu:** 14 bekommt 1 als Vorgänger, 1 bekommt 14 als Nachfolger |
| **4** | `workshop.zitate` (oeffentlich, sprecher), `workshop.aufgaben` | Nur `oeffentlich: ja` darf wörtlich nach außen (04 Abschnitt 5, Zeile zu `zitate`); Kapitel 1 und Reveal-Ansicht 1 zeigen Zitate; die Erinnerungen in 4.2 sind Aufgaben aus dem Workshop | **neu:** 14 bekommt 4 als Vorgänger, 4 bekommt 14 als Nachfolger |
| Extern | Markenbücher anderer Makler in Schritt 14 (Kohorte in Arbeit); Schablonenkorpus der Werkbank | 3.9.4 | extern wie die Kohorte |

Bewusst nicht aufgenommen: `antworten` aus Schritt 2. Die Wörtlichkeit eigener Worte hat Schritt 7 geprüft (`markenvertrag.herkunft`), und die Redaktion sperrt diese Stellen; eine zweite Prüfung gegen die Antworten wäre eine zweite Quelle für dieselbe Frage.

### 5.3 Ausgang nach Vertrag und Abnehmer

Für jeden Ausgang ist der **Weg** zum Abnehmer festgelegt, damit Vorgänger- und Nachfolgerlisten symmetrisch bleiben. Schritt 17 hat nach dem Vertrag nur die Vorgänger 1, 2 und 16 und liest alles über `quelle` (`17_betrieb.md` 5.1); eine Kante 14 zu 17 gibt es nicht. Was 17 braucht, geht darum über `quelle.inhalt`, oder 17 braucht es nicht.

| Feld | Inhalt | Abnehmer | Weg |
|---|---|---|---|
| `markenbuch.kapitel[]` | die elf Kapitel aus 3.4, je mit Seitentyp, Blöcken und Quellenpfaden | 15 (Akte 2 bis 5 lesen Kapitel über `inhaltRef`; Makler-Sicht ab Öffnung der Rückmeldung), 16 (`uebergabe.paket`, Markenbuch je Rolle) | direkt, 15 und 16 haben 14 als Vorgänger |
| `markenbuch.kernUndOffen` | Kern und Offen mit Beispielen und Grenzen | 16 (Übergabe), 17 (`quartal`: was sich im Quartal ändern darf, `codesUnveraendert`) | an 16 direkt; an 17 **über `quelle`**: Hinweis an 16, `kernUndOffen` in `quelle.inhalt.markenbuch` aufzunehmen (5.6) |
| `markenbuch.belegung[]` | Belegungsplan | 16 (Website, Karte, Renderer), 17 (Renderer der Beiträge) | an 16 direkt; an 17 **über `quelle`**, im selben Teil `quelle.inhalt.markenbuch` (5.6). Ohne ihn läse ein Renderer in 17 Pfade ohne Plan, und der Bruch Karte gegen Buch aus KETTE_IST 3 käme zurück |
| `markenbuch.rollen` | fünf Sichten und die Seite für Eilige, mit Test | 16 (`uebergabe.paket`, `rollout.umfeld`) | direkt |
| `markenbuch.redaktion[]` | `{pfad, alt, neu, grund, von, version}` plus Satz, Stufe, Status, Abnahme | 16 (`freigabe.historie`, Zuordnung "Satz in Caption, Bio oder Website" zur Redaktion in 14) | direkt. **Nicht an 17:** Der Vertrag begrenzt `lernen` auf Schritt 2 und 12 (`17_betrieb.md` 5.1, letzter Absatz); die Häufigkeit von Korrekturen wertet das Team in Schritt 14 selbst aus (`hmMbAuswertung`, 8.1) |
| `qualitaet` | Rubrik T1 bis T6 und G1 bis G6, `klischees`, `aehnlichkeitKohorte` in Text und Bild | 15 (gerechnete Sätze in Akt 4 über `markenbuch.kapitel[weg]`), 16 (Neuprüfung des geänderten Stands mit `hmGate2Pruefen`, Vergleich mit dem Stand zum Reveal) | an 16 **als Teil von `gate2`**: `gate2.qualitaetRef` zeigt auf die Version von `qualitaet`, die abgezeichnet wurde. **Nicht in `quelle`, nicht an 17:** Schritt 17 misst die Kohorte selbst mit denselben Funktionen `hmKohorteText` und `hmKohorteBild` (Funktionen, keine Daten) |
| `gate2` | `{cd, datum, version, status, schwellenOk, lautleseOk, zahlenGeprueft, offeneLueckenMitTermin}` | 15 (Start nur bei `status` "abgezeichnet" und passender `version`), 16 (Ausgangsversion 1.0) | direkt |
| `praesentation.entwurf` | zehn Akte als `{id, akt, ansicht, variante, inhaltRef[], ...}` | 15 | direkt; 15 schreibt nie `entwurf` (15 3.2) |

### 5.4 Ergänzte Ausgangsfelder, begründet

| Feld | Inhalt | Warum | Abnehmer und Weg |
|---|---|---|---|
| `markenbuch.version`, `basis[]`, `pruefsumme`, `status` | Version, Quellversionen je Schritt, Prüfsumme, Zustand | Abzeichnung an eine Version binden; Reveal liest nur diese Version (3.10.4) | 15, 16 direkt |
| `markenbuch.zahlen[]` | `{zahl, stellen, klasse, belegId, pruefstatus, oeffentlich, unterlage, termin, fassungOhneZahl}` | Grundlage für `zahlenGeprueft`, Leitfrage 3, Präzisierung K5 | 16 direkt (friert nur ohne öffentliche vermerkte Zahl ein) |
| `markenbuch.luecken[]` | `{pfad, was, oeffentlich, termin, wer, sperrtBis, aufgabeIn}` | Grundlage für `offeneLueckenMitTermin` und die Bedingung der Statuskarte (4.2) | 16 direkt (`rollout.checkliste`) |
| `markenbuch.lautlese[]` | `{pfad, satz, text, urteil, notiz, von, am, runde}` | Grundlage für `lautleseOk`; Wiederholung nur geänderter Sätze | 16 direkt |
| `markenbuch.material` | `{manifest[], ausgeschlossen[], platzhalterFunde[]}` | Leitfrage 6 | 16 direkt (`uebergabe.paket`) |
| `markenbuch.statusMakler` | Text der Statuskarte, Aufgaben, Reveal-Termin | Erlebnis im Vertrag | Makler-Ansicht; 15 liest `zustand` "verschoben" (15 3.5) |
| `markenbuch.messung` | Zeiten je Stufe | ersetzt die Setzungen in 3.2 | **Schritt 14 selbst**: Die Auswertung über die ersten fünf Makler (`hmMbAuswertung`) ersetzt die Setzungen dieses Dokuments. Nicht an 17, das die `messung`-Felder der Schritte 5 bis 15 ausdrücklich nicht liest (`17_betrieb.md` 5.1) |
| `qualitaet.sperren[]`, `gestaltUrteil[]`, `kalibrierung[]`, `rubrikVersion`, `kohorteGroesse` | harte Sperren, zwei Urteile, Eichfälle | 3.9.3 bis 3.9.6 | 16 über `gate2.qualitaetRef`; `kalibrierung` und `rubrikVersion` liegen makler-übergreifend unter `hmStore.rubrik` und gelten für jeden folgenden Lauf von Schritt 14 |
| `gate2.pruefsumme`, `sperren`, `checkliste`, `frist`, `neuereQuellen[]`, `qualitaetRef`, `zurueckgezogen` | Bindung, offene Sperren, Leitfragen, Frist drei Werktage vor dem Reveal, Hinweise auf neuere Quellen, Rückzug durch den CD | 3.10 | 15, 16 direkt |

### 5.5 Datenobjekt

Speicherort nach Zerlegung Kapitel 3: `hmStore` unter `marke2[mid].markenbuch`, `marke2[mid].qualitaet`, `marke2[mid].gate2`, `marke2[mid].praesentation`.

```js
marke2[mid].markenbuch = {
  version: 1, status: "montage" | "pruefung" | "redaktion" | "gate" | "abgezeichnet" | "zurueckgezogen",
  basis: [{ schritt: 9, objekt: "idee", version: 2, pruefsumme: "" }],
  pruefsumme: "",
  belegung: [{ stelle: "karte.hinten.claim", pfad: "botschaften.claim", kanal: "druck", anwendung: "karte" }],
  kapitel: [{
    id: "weg" | "einsicht" | "positionierung" | "stimme" | "idee" | "system" | "bild" | "serien" | "feed" | "anwendungen" | "presse",
    titel: "", rollen: ["makler", "assistenz"],
    seiten: [{ typ: "umschlag" | "anwendung" | "regel" | "beispielpaar" | "herleitung" | "eilige", druckSeite: 0, seiteLinks: true,
               bloecke: [{ art: "text" | "render" | "tabelle" | "zitat" | "gerechnet", pfade: [""], komponente: "", props: {} }] }]
  }],
  weg: { saetze: [{ text: "", quellen: ["einsicht.kandidaten[1].grund"], art: "verweis" | "gerechnet" | "verbindung" }] },
  kernUndOffen: {
    kern:  [{ id: "", was: "", verweis: "", sperrstufe: "fest" | "stil", warum: "", beispiel: { pfad: "" } }],
    offen: [{ id: "", was: "", bereich: "", beispiele: [{ pfad: "" }], nicht: { pfad: "", text: "" }, sperrstufe: "rahmen" | "variante", entscheidet: "team" | "makler" }]
  },
  rollen: {
    makler: { kapitel: [], downloads: [], einleitung: "" },
    assistenz: {}, fotograf: {}, druckerei: {}, web: {},
    eilige: { bloecke: [], test: { fragen: [{ frage: "", soll: "", pfad: "" }], ergebnis: { richtig: 0, von: "", dauerSek: 0, am: "" } } }
  },
  redaktion: [{ id: "", pfad: "", satz: 0, alt: "", neu: "", grund: { kategorie: "anrede" | "beleg" | "laenge" | "klischee" | "austauschbar" | "stil" | "lautlese" | "tippfehler", text: "" },
                von: "", am: "", version: 0, stufe: "frei" | "bestaetigt" | "woertlich" | "gerechnet",
                status: "vorschlag" | "angenommen" | "abgelehnt" | "antrag", quelle: "claude" | "regel" | "team",
                abnahme: { von: "", am: "", pruefung: "bestanden" | "makler" }, ausnahmeS17: null | { nachweisPfad: "", cd: "" } }],
  lautlese: [{ pfad: "", satz: 0, text: "", urteil: "traegt" | "stolpert", notiz: "", von: "", am: "", runde: 1 }],
  zahlen: [{ zahl: "", stellen: [""], klasse: "beleg" | "objekt" | "stand" | "folio" | "zaehlwort",
             belegId: "", pruefstatus: "Selbstauskunft" | "Unterlage geprüft", oeffentlich: "ja" | "nein" | "offen", unterlage: "", termin: "",
             fassungOhneZahl: null | "serien[0].themenvorrat[2]" }],
  luecken: [{ pfad: "", was: "", oeffentlich: false, termin: "", wer: "", sperrtBis: "reveal" | "freigabe" | "live", aufgabeIn: "" }],
  material: { manifest: [{ datei: "", quellen: [""], vollstaendig: true }], ausgeschlossen: [{ datei: "", grund: "", termin: "" }], platzhalterFunde: [] },
  statusMakler: { zustand: "endkontrolle" | "geprueft" | "verschoben", text: "", aufgaben: [""], reveal: "ISO" },
  messung: { montageAm: "", gateAm: "", dauerMin: { redaktion: 0, zahlen: 0, gestalt: 0, lautlese: 0, cd: 0 } }
};

marke2[mid].qualitaet = {
  rubrikVersion: 1,
  text:    [{ id: "T1", name: "Spezifität", wert: 0, gewicht: 10, hinweis: "", befunde: [{ pfad: "", detail: "" }] }],
  gestalt: [{ id: "G1", name: "Herleitung", wert: 0, gewicht: 10, hinweis: "", befunde: [] }],
  gesamt: 0, klischees: [], sperren: [{ id: "S2", pfad: "", detail: "" }],
  aehnlichkeitKohorte: {
    kohorteGroesse: 0,
    text: { max: 0, mitIntern: "", saetze: [{ pfad: "", satz: "", treffer: "", quelle: "kohorte" | "schablone" }] },
    bild: { struktur: { max: 0, gleich: [""], mitIntern: "" }, raster: { max: 0, mitIntern: "" },
            katalog: { weltId: "", abstand: 0 }, blindtest: null | { richtig: 0, von: "", am: "" } }
  },
  gestaltUrteil: [{ rater: "", werte: { idee: 0, handsatz: 0, satzVonBildern: 0, keinKatalog: 0 }, am: "" }],
  kalibrierung: [{ kriterium: "", note: 0, erwartet: 0, grund: "", von: "", am: "" }]
};

marke2[mid].gate2 = {
  status: "offen" | "gesperrt" | "abgezeichnet" | "zurueckgezogen", frist: "ISO",   // frist: hmGate2Frist(mid), drei Werktage vor auftrag.termine.reveal, nie von Hand gesetzt
  cd: "", datum: "", version: 0, pruefsumme: "", qualitaetRef: { rubrikVersion: 1, gesamt: 0 },
  schwellenOk: false, lautleseOk: false, zahlenGeprueft: false, offeneLueckenMitTermin: false,
  sperren: [], checkliste: [{ leitfrage: 1, ok: false, befund: "" }],
  neuereQuellen: [{ schritt: 9, objekt: "idee", gezeichnet: 2, aktuell: 3, am: "" }],   // Hinweis, sperrt nicht
  zurueckgezogen: null | { cd: "", am: "", grund: "" }
};

// makler-übergreifend, nicht je Makler:
hmStore.rubrik = { version: 1, kalibrierung: [{ kriterium: "", note: 0, erwartet: 0, grund: "", von: "", am: "" }] };

marke2[mid].praesentation = {
  // Besitz Schritt 14; Schritt 15 liest und übernimmt über entwurfId, schreibt nie (15 3.2)
  entwurf: [{
    id: "a5a-strom", akt: 5, ansicht: "strom",   // Werte wie in 15 8.2: rahmen | satz | einsicht | vertrag | arbeit | belege | idee | strom | profil | beitrag | website | karte | schild | signatur | expose | achse | vergleich | typo | farbe | wortmarke | zeichen | fragen | abschluss
    variante: "empfehlung" | "gegenentwurf" | "beide" | "neutral",
    inhaltRef: ["feed.kacheln[2]", "feed.kacheln[6]"],
    titel: "", dauerMin: 2, fuehrt: "lead" | "cd", notiz: "", kriterium: "", nieFragen: ["Gefällt es Ihnen?"],
    bedingung: null | "stromGrundlage"
  }]
};
```

Das Feld `plattform.qualitaet` aus MARKE_SCHEMA v1 behält Namen und die vier Felder `gesamt`, `kriterien`, `klischees`, `aehnlichkeit` als Lesefassung, bis alle Abnehmer auf v2 umgestellt sind (Zerlegung 4.2).

### 5.6 Hinweise an Nachbarschritte

1. **Schritte 1 und 4:** 14 als Nachfolger ergänzen (5.2). In der Zerlegung: Schritt 14 "von" um 1 und 4 ergänzen, Schritt 1 "an" und Schritt 4 "an" um 14.
2. **Schritt 1:** `HM_IMPORT_FELDER.objekte` um Energieausweis-Felder ergänzen (HWB, Endenergiebedarf, Klasse, fGEE, Datum des Ausweises). Das ist die Stelle, an der die Daten mit dem Objekt kommen; Schritt 14 erinnert nicht daran (4.2).
3. **Schritt 9:** Idee-Satz und `idee.zeichen.herleitung` aus dem Claim ableiten, den Schritt 8 führt ("Rat vor Auftrag."), nicht aus dem gestrichenen "Zeit ist Teil des Preises."; `idee.basis.botschaften` mit Version führen (Befund 1). Den Herleitungssatz für den Reveal entsprechend neu schreiben (Befund 2).
4. **Schritt 10:** Beispiel 3.6 auf `idee` aus Schritt 9 umstellen und `basis.idee` führen (Befund 1, gleichlautend mit dem Hinweis aus Schritt 11). Rand, Spalten und Bundsteg für `raster.formate[expose]` beziffern; das Markenbuch druckt in diesem Raster (3.4.1).
5. **Schritt 12:** Im Stoff des Beispiels `botschaften.claim` aus Schritt 8 lesen statt der Annahme aus dem Musterbeispiel; den Satz im Reveal unter der Serienempfehlung ("Sie haben unterschrieben, dass Zeit Teil des Preises ist") neu fassen (Befund 2).
6. **Schritt 13:** Kacheln mit den Serien aus `serien[]` von Schritt 12 belegen, `feed.kacheln[].serie` als `serien[].id`, Skripte nach `serien[].ablauf` (Befund 4); `feed.profilkopf.bio` liest `botschaften.bio.instagram`, die eigene Bio entfällt (Befund 9, gleichlautend mit Hinweis 7 in Schritt 8); Kachel 1 bekommt eine Fassung ohne b1 (Befund 5).
7. **Schritt 15:** (a) `praesentation.entwurf` kommt jetzt in den zehn Akten mit `{id, akt, ansicht, variante, inhaltRef[]}` und den Feldern `titel`, `dauerMin`, `fuehrt`, `notiz`, `kriterium`, `nieFragen`, `bedingung`; das Feld `quellen` heißt `inhaltRef`, die Umrechnungstabelle "Von zwölf Ansichten zu zehn Akten" (15 3.2) entfällt. (b) Frist Gate 2 in 15 3.3 von zwei auf drei Werktage vorher setzen, vor die Zeile "Ablauf bauen". (c) In 15 3.5 die Zeilen zu "veraltet" ersetzen: Nach der Abzeichnung gibt es kein "veraltet" mehr; der Termin läuft auf der gezeichneten Version, `gate2.neuereQuellen` ist ein Hinweis für den Lead, und "zurueckgezogen" wirkt wie "gesperrt". Ein Zurückstellen der Quelle ist nicht nötig. (d) 15 prüft `gate2.status === "abgezeichnet"` und die Version; `schwellenOk` ist darin enthalten. (e) Akt 5a hat `bedingung: "stromGrundlage"`: Ohne lizenzierten Pool oder Owner-Freigabe entfällt 5a, statt dass der Strom oder der Termin nicht startbar ist; `praesentation.fremdtest` bleibt dann mit Grund leer. (f) Die Statuskarte nennt 60 Minuten wie `auftrag.dauer`.
8. **Schritt 16:** (a) `quelle.inhalt` um den Teil `markenbuch: {belegung, kernUndOffen}` ergänzen; Renderer und Quartalsprüfung in 17 lesen beides nur dort (5.3). Kapitel 1, Redaktion, Messung und Qualität gehören nicht in die Quelle. (b) Friert nicht ein, solange eine öffentliche Zahl nur vermerkt ist, im Sinn der Präzisierung aus 16 3.3.1, die 3.10.1 übernommen hat. (c) Wartet der Fremdtest mangels Grundlage nicht (7e), ist er keine Bedingung für das Einfrieren. (d) Die Makler-Sicht des Buchs wechselt mit der Übergabe auf `quelle`; PDF nur für die Sichten Druckerei und Fotograf im Paket (3.7). (e) Liest Wortmarke und Zeichen für das Paket über `markenbuch` (so entschieden in `16_freigabe.md`, Hinweise zum Eingang, Punkt 4).
9. **Schritt 17:** keine Kante von 14. Für `kohorte` dieselben Funktionen `hmKohorteText` und `hmKohorteBild` und derselbe geteilte Speicher `api/wb-kohorte.js`, damit Betrieb und Gate 2 dieselbe Schwelle messen; `kernUndOffen` und `belegung` über `quelle.inhalt.markenbuch`.
10. **Schritt 7:** Die Mustersätze in `HM_PF_FIGUR` und den Textbibliotheken für v2 nicht mehr ausgeben; sie bleiben nur im Schablonenkorpus dieser Prüfung, als Liste dessen, was nicht vorkommen darf (S17).
11. **Schritt 1, Termine (Kettenprüfung):** (a) Moment 7 nennt die Gate-2-Frist nicht mehr als Datum, sondern liest `hmGate2Frist(mid)`; der Text "legt die Frist für Gate 2 auf den 03.11." entfällt. (b) Der Porträt-Termin liegt mindestens zwei Werktage vor `gate2.frist`, also mindestens fünf Werktage vor dem Reveal, statt vier (3.2). (c) Zwischen Wort-Link und Porträt-Termin rechnet 1 einen Puffer für die Schritte 9 bis 11 samt Abnahme ein, etwa Wort-Link plus mindestens fünf Werktage (Setzung aus der Kettenprüfung, von 1 zu prüfen); hält beides nicht, rückt der Reveal. (d) Fällt der Porträt-Termin aus, rechnet `hmAuftragTermine` Ersatztermin und Reveal nach 3.2 neu. (e) Die Uhrzeit des Live-Tags steht nur in `auftrag.termine.liveTag.uhrzeit`; 14 nennt keine.
12. **Schritt 9:** Die Achse zwischen Empfehlung und Gegenentwurf soll im Feed sichtbar werden, nicht nur im Porträtausschnitt; sonst meldet 14 "Wahl nicht sichtbar" (3.12).
13. **Schritt 13:** Mindeststand aus 3.10.1: keine Lückenkachel in Folge 1 bis 6 von Empfehlung und Gegenentwurf; eine Folge mit Kennzahl ohne Zahl und Quelle dort gegen eine Tauschfolge tauschen. E10 bleibt ab Folge 7.

---

## 6. Qualitätsprüfung im Schritt

### 6.1 Automatisch (`hmGate2Pruefen`)

| Nr. | Prüfung | Grün, wenn | Bei rot |
|---|---|---|---|
| Q1 | Montage vollständig und gleichzeitig | jede Quelle 5 bis 13 abgenommen; jedes Objekt, das auf ein anderes baut, nennt dessen aktuelle Version in `basis` | Schritt wartet; Befund mit Schritt und Feld |
| Q2 | Belegungsplan eindeutig | jede Stelle genau ein Pfad; jeder Textknoten mit `data-pfad` | S9 |
| Q3 | ein Claim | jeder Claim-Slot gleich `botschaften.claim`; kein früherer Claim wie ein Claim gesetzt | S2 |
| Q4 | eine Palette | jede gerenderte Farbe in `system.tokens` | S3 |
| Q5 | eine Anrede | jeder öffentliche Text besteht `hmAnredePruefen(text, kontext, mid)` für den Kontext seines Slots | S4 |
| Q6 | Kapitel 1 vollständig und lesbar | drei Kandidaten, drei Territorien, sechs bis zwölf Varianten, je mit Grund aus dem Quellfeld; jede Variante nur als Wandtest-Render; höchstens 450 Wörter; kein Satz ohne Quelle; in der Makler-Sicht kein Wort aus `HM_MB_JARGON`, Zählwörter gleich den Quellfeldern | Abzeichnung gesperrt |
| Q7 | Längen und Maß | Story-Längen nach Vertrag, öffentliche Sätze bis 20 Wörter, Text im Bild bis acht Wörter | T5, Vorschläge |
| Q8 | Zahlen | jede Zahl hat eine Klasse; keine Pauschalliste | S5 |
| Q9 | Kundenstimmen | wörtlich, datiert, freigegeben; keine Wiedergabe als Kundenstimme | S6 |
| Q10 | Materialpaket | Manifest vollständig, keine Platzhalter, keine Demo-Objekte, keine Katalog-Logos, Rechte geklärt | S11 |
| Q11 | Kohorte Text | Jaccard bis 15 Prozent, kein Satz mit sechs gleichen Wörtern zu Kohorte oder Schablone | über 15 Prozent S16, darunter Abzug in T2 |
| Q12 | Kohorte Bild | Strukturabdruck unter der Schwelle im selben Gebiet; Rastervergleich und Katalognähe gemeldet | S16 bei vier von sechs gleichen Merkmalen im selben Gebiet, sonst Abzug in G4 |
| Q13 | UNIO-Regeln in der Oberfläche | Detektoren aus 3.10.2 ohne Fund in Makler-Sicht, Rollen, Anwendungen, Statuskarte | S12 |
| Q14 | Gleicher Stand | vor der Abzeichnung: Prüfsummen in `basis` gleich den aktuellen, Redaktionsversionen über S14 nachgeführt; nach der Abzeichnung: Abweichungen nur als `gate2.neuereQuellen` | vor der Abzeichnung S14; danach Hinweis, Rückzug nur durch den CD |
| Q15 | Echtheit und Einwilligung | keine fremden Objekte, keine KI-Bilder, jedes Objekt mit Energiezeile, jede Datei mit Einwilligung und Rechten | S7, S8, S10, S13 |
| Q16 | Claim ohne Schablone | `botschaften.claim` ohne Treffer im Schablonenkorpus, oder Ausnahme mit Nachweispfad und Redaktionseintrag | S17 |
| Q17 | Buch gesetzt | jede Seite hat einen Seitentyp aus 3.4.2; jedes visuelle Kapitel beginnt mit einer Anwendungsseite; nie mehr als zwei Regelseiten nacheinander; Umschlag ist eine Anwendung; Folio am Platz aus `system.zeichen.platz` | Abzeichnung gesperrt |
| Q18 | Reveal-Entwurf | zehn Akte 0 bis 9, Summe 60 Minuten, 5a vor 5b, Varianten nur in Akt 4 als Render, keine Ansicht `wortmarke`, `zeichen`, `farbe`, `typo` vor Akt 7, 5a nur mit erfüllter `bedingung` | Abzeichnung gesperrt; "Wahl nicht sichtbar" nur als Befund |
| Q19 | Mindeststand und Plan | Mindeststand aus 3.10.1 hält für Empfehlung und Gegenentwurf; `gate2.frist` gleich `hmGate2Frist(mid)`; Porträt-Termin mindestens zwei Werktage vor der Frist | Mindeststand: Abzeichnung gesperrt; Plan: Befund "Plan hält nicht" an das Team |

### 6.2 Durch Menschen

- **Lautlese-Test** durch den CD, Satz für Satz, im Vollbild, mit "trägt" oder "stolpert" (3.10.1).
- **Gestalt-Urteil G6** durch zwei Gestalter getrennt, mit den Ankern aus 3.9.5.
- **Blindtest und Fünf-Minuten-Test** durch eine Person ohne Projektbezug (3.9.4, 3.7).
- **Checkliste der Leitfragen** durch den CD: (1) Steht auf jeder Seite genau ein Claim, eine Palette und eine Anrede aus derselben Quelle? Befund aus Q3 bis Q5. (2) Passt ein Satz oder eine Kachel auch auf einen anderen UNIO-Makler? Befund aus Q11, Q12 und dem Blindtest. (3) Sind alle öffentlichen Zahlen geprüft und Kundenstimmen wörtlich mit Datum und Freigabe? Befund aus Q8, Q9. (4) Versteht eine Assistenz die Seite für Eilige in fünf Minuten? Ergebnis des Tests. (5) Hält Gate 2 die Schwellen? Beantwortet der Code, der CD bestätigt nur, dass kein Kalibrierungsfall offen ist. (6) Enthält das Materialpaket keinen Platzhalter? Befund aus Q10.
- **Eichung** an den Ankerfällen (3.9.6) nach jeder Änderung der Rubrik.

---

## 7. Typische Fehler und wie sie verhindert werden

| Fehler | Beispiel | Verhindert durch |
|---|---|---|
| Zwei Claims | "Der Markt wird lesbar." auf der Karte, "Zeit ist Teil des Preises." im Buch | Belegungsplan, Q3, S2; kein Renderer liest `b.claim` |
| Zweite Palette | Brand-Kit mit fester Palette #F7F5F1 und #0B0A09 neben den Welt-Farben (KETTE_IST 2.6) | nur `system.tokens`, Q4, S3 |
| Anrede je Stelle verschieden | Du in der LinkedIn-Caption, weil `w.anrede` gelesen wird (KETTE_IST 2.10) | `hmAnrede` je Slot, Q5, S4 |
| Freigabe nach Gefühl | "Bereit" ab 75, nur Klischees sperren | fünf Teile, harte Sperren, kein Übersteuern |
| Freigabe ohne Version | Antwort geändert, Buch ändert sich still | `basis`, `pruefsumme`, Reveal nur auf `gate2.version` |
| Redaktion ändert den Maßstab | CD formuliert das Versprechen um, das der Makler bestätigt hat | Sperrstufe `bestaetigt`, Änderungsantrag mit Wort-Link |
| Geglättete Kundenstimme | "Kunden sagen, sie fühlen sich nie gedrängt." | Sperrstufe `woertlich`, S6 |
| Pauschal erlaubte Zahlen | "60 Sekunden", "3 Fehler" fallen nie auf | Zahlenklassen ohne Pauschalliste, S5 |
| Demo-Objekt im Exposé | `hmWebObjekte()[0]` als Exposé-Objekt (`wb-markenbuch.jsx` Zeile 121) | eigene Objekte oder Lückenfläche, S7 |
| Energiezeile fehlt | Objekt-Kachel mit Preis und Fläche, ohne HWB | Objekt-Slots, S10; `hmWeltEnergie` um Endenergiebedarf ergänzen |
| Platzhalter im Paket | Lückenkachel oder "Vorname Nachname" als PNG | Manifest aus der Montage, Platzhaltersuche, S11 |
| Katalogteil exportiert | alle drei `HM_LOGO_TYPEN` als SVG im Paket | nur `system.wortmarke`, G1 Deckel |
| Logo zuerst | Kapitel Zeichen beginnt mit der Wortmarke auf Weiß | jedes visuelle Kapitel beginnt mit Anwendung |
| Kapitel 1 als Werbung | "Unser Team hat unzählige Stunden investiert." | nur gezählte Aufwände, jeder Satz mit Quelle, Q6 |
| Noten vor dem Makler | Kritikpunkte der Territorien im Makler-Buch | Team-Sicht getrennt |
| Kohortenvergleich ohne Kohorte | Unterscheidbarkeit fest 70, wenn niemand da ist | Schablonenkorpus, "nicht prüfbar" ohne Ersatzwert |
| Kohorte an Dritte | Porträts an einen Bilddienst zum Vergleich | Vergleich im Browser, nur eigene Renders (A7) |
| Eyebrow in der Oberfläche | Mono-Zeile über der Überschrift der Statuskarte | Detektor, S12 |
| Zwischenstand beim Makler | "Daniel prüft" und ein halbes Buch im Makler-Link | Statuskarte ohne Vorschau |
| Reveal trotz rotem Gate | Termin gehalten, Lückenkacheln und Mustersätze gezeigt | Frist drei Werktage, Reveal-Modus gesperrt, Termin verschieben |
| Stille Änderung nach Gate 2 | eine korrigierte Zahl erscheint im Termin, ohne dass der CD sie gesehen hat | Reveal liest nur `gate2.version`; neuere Quelle als Hinweis; Rückzug nur durch den CD |
| Redaktion sperrt ihr eigenes Gate | eine Korrektur über Schritt 14 lässt S14 anschlagen | Abnahme über die Prüffunktion des Ursprungsschritts, `basis` im selben Schritt nachgeführt (3.8) |
| Zweiter Ursprung eines Texts | Bio in 13 selbst geschrieben statt aus `botschaften.bio` | Belegungsplan mit genau einem Pfad je Stelle, Befund 9 |
| Schablone als Claim | "Zeit ist Teil des Preises." als Claim bei jedem Kenner | S17 ohne Ausnahme ohne Nachweis |
| Teamsprache beim Makler | "drei Lesarten geprüft", "Beweisebene" in Kapitel 1 | Sprachregel und `HM_MB_JARGON`, Q6 |
| Zeichenskizze auf Weiß | Varianten als isolierte Skizzen in Kapitel 1 | nur Wandtest-Render (3.4.4), Q6 |
| Branchenverbote auf der Seite für Eilige | "Handschlag, Schlüssel" statt seiner eigenen Grenzen | Rangregel eigener Einträge (3.7) |
| Kohortenprüfung auf dem falschen Gerät | Gerät ohne vollständige Kohorte meldet "bestanden" | geteilter Speicher als Voraussetzung, sonst "nicht prüfbar" und Sperre S16 |
| Claude glättet alle | automatische Übernahme der Schlusskorrekturen | Vorschläge mit Status, Mensch entscheidet (A5) |

---

## 8. Umsetzung in der Werkbank

### 8.1 Dateien

| Datei | Änderung |
|---|---|
| `ui_kits/werkbank/wb-markenbuch.jsx` | Umbau auf v2: `hmMbMontage(mid)`, `HM_MB_BELEGUNG`, `HM_MB_QUELLEN` (Register Pfadpräfix zu Schritt, Prüf- und Speicherfunktion), Kapitel-Komponenten mit `data-pfad`, `MbRolle`, `MbEilige`, `MbRedaktion` (Seitenpanel), `hmMbRedigieren`, `MbLautlese` (Vollbild), `MbStatusMakler`, `hmMbPraesentation` (zehn Akte, Bedingung des Fremdtests), `HM_MB_SEITENTYPEN` und `MbSeite` (Seitentypen, Raster aus `system.raster`, Pacing-Prüfung Q17), `HM_MB_JARGON`, `hmMbAuswertung` (Messung und Redaktionskategorien über die ersten Makler). Entfallen: `WeltWahl` im Buch, das Überschreiben von Schrift und Website-Look (Zeile 115), "Neu erzeugen", die Quellen `hmBrand(mid)` und `hmWebObjekte()`, die Längenangaben "50 Wörter" und "150 Wörter" |
| `ui_kits/werkbank/wb-gate2.jsx` (neu) | `hmQualitaet2(mb, mid)`, `HM_GATE2_SPERREN`, `hmMbZahlen`, `hmMbLuecken`, `hmKohorteText`, `hmKohorteBild` (Strukturabdruck, Mittelwert-Hash über Canvas), `HM_SCHABLONEN` (Korpus aus 3.9.4, zusammengesetzt aus den vorhandenen Konstanten), Detektoren `hmMbRegelnDom(el)` mit Farbdetektor nach 3.10.2, `hmGate2Pruefen(mid)`, `hmGate2Frist(mid)` mit `hmWerktageMinus(iso, n)`, Mindeststand nach 3.10.1, `hmGate2Abzeichnen(mid, cd)`, `hmMbNeuere(mid)`, `hmGate2Zurueckziehen(mid, cd, grund)`, `hmKohorteLaden()` (geteilter Speicher, Rückfall "nicht prüfbar"), Komponente `Gate2Leiste`, `hmSelbsttestMarkenbuch()`. Rastervergleich über `hmAlsPng` aus `wb-material.jsx`, keine neue Bibliothek |
| `ui_kits/werkbank/wb-material.jsx` | Paket aus der abgezeichneten Montage mit Manifest, `hmMatPlatzhalter`, nur vollständige Dateien, Wortmarke aus `system.wortmarke`, Tokens im W3C-Format, Rollen als PDF; Schleife über `HM_LOGO_TYPEN` entfällt |
| `ui_kits/werkbank/wb-markenwelten.jsx` | Renderer `WeltPost`, `WeltFeed`, `WeltKarte`, `WeltSignatur`, `WeltExpose`, `WeltStory`, `WeltProfilKopf` lesen Montage und Belegungsplan statt `hmBrand`; `data-pfad` an jedem Textknoten; `hmWeltPostDaten` liefert im Makler-Output keine Vorgaben mehr; `hmWeltEnergie` mit Endenergiebedarf und Klasse, altem Ausweis mit fGEE |
| `ui_kits/werkbank/wb-plattform.jsx` | `hmMarkenQualitaet` bleibt als Lesefassung; Pauschalliste der Zahlen (Zeile 1045) gilt nicht für v2; `hmPfSaetze`, `hmPfTrigramme`, `hmPfJaccard` werden von `wb-gate2.jsx` genutzt |
| `ui_kits/werkbank/wb-werkzeuge.jsx` | `hmDrucken` nimmt die Schriftliste als Parameter aus `system.typo`; `hmSha256` wird für die Prüfsumme genutzt |
| `ui_kits/werkbank/wb-app.jsx` | Makler, Ansicht Heute: `MbStatusMakler`; Team, Arbeitsbereich Marke: Markenbuch mit `Gate2Leiste`; Reveal-Modus nur bei abgezeichnetem Gate 2 |
| `api/wb-kohorte.js` (neu) | geteilter Speicher der Kohorte im Team-Zugang: je Makler öffentliche Texte der freigegebenen Quelle, Strukturabdruck, Raster-Hashes, Stand; keine Porträts, keine Rohantworten, nie an Claude. Speicherdienst entscheidet der Owner (Lücke). Voraussetzung vor dem ersten Einsatz von S16 |
| `api/wb-marke.js` | neue Phase `markenbuch` mit `SCHRITT.markenbuch` und `SCHEMA.markenbuch` (8.3); die Korrekturen der Schlussprüfung werden in v2 nicht mehr angewendet, sondern als Vorschläge zurückgegeben; keine Kohortendaten im Dossier |
| `ui_kits/werkbank/index.html` | Script-Tag für `wb-gate2.jsx` nach `wb-plattform.jsx` und den Dateien der Schritte 7 bis 13, vor `wb-markenbuch.jsx` |
| `docs/werkbank/MARKE_SCHEMA.md` | Abschnitt v2 mit den Objekten aus 5.5 |
| `docs/werkbank/MARKENQUALITAET.md` | Gate 2 v2: Rubrik, Sperren, fünf Teile, Eichung |

Architektur nach `ui_kits/werkbank/CLAUDE.md`: Babel ohne Build, globaler Scope, Präfix `hm`, Komponenten groß, Export über `Object.assign(window, ...)`, kein `import()`, Symbole nur als SVG mit 1,5 px Strich über `<Ico n="..."/>`, höchstens etwa sieben Bedienelemente je Bereich.

### 8.2 Oberfläche für das Team

Aufbau auf Awwwards-Niveau nach UNIO-Regeln: links die Kapitel, rechts die Seiten in der gewählten Sicht, oben eine schmale Gate-Leiste mit fünf Zuständen in Worten (etwa "Zahlen: zwei vermerkt, Termin 2. November"), ohne Ampelfarben als einziges Signal. Hauptaktion je Zustand eine: "Prüfen", dann "Vorschläge ansehen", dann "Laut lesen", dann "Abzeichnen". Die Sichten wechseln über ein Segment mit sechs Einträgen (Team, Makler, Assistenz, Fotograf, Druckerei, Web; Eilige als eigene Seite in jeder Sicht). Redaktion als Seitenpanel. Befunde stehen am Ort: Ein Satz mit Befund trägt eine feine Unterstreichung, die Randnotiz nennt Regel und Vorschlag. Keine Eyebrows, keine Textzeichen als Icons, keine Verläufe, kein Glow; die Oberfläche läuft durch dieselben Detektoren wie das Buch.

### 8.3 Schema für Structured Outputs der Claude-Kette

In `api/wb-marke.js` mit den vorhandenen Helfern `O`, `A`, `S`, `I`. Claude liefert nie Noten, nie Prüfstatus, nie `gate2`, nie Text für Slots mit Stufe `bestaetigt` oder `woertlich`.

```js
const E = (werte) => ({ type: "string", enum: werte });
SCHEMA.markenbuch = O({
  weg: A(O({ text: S, quellen: A(S) })),
  eilige: O({ immer: A(O({ text: S, quelle: S })), nie: A(O({ text: S, quelle: S })) }),
  vorschlaege: A(O({ pfad: S, satz: I, alt: S, neu: S, grund: S,
    kategorie: E(["anrede", "beleg", "laenge", "klischee", "austauschbar", "stil", "lautlese", "tippfehler"]) })),
  praesentation: A(O({ id: S, notiz: S, kriterium: S })),   // id aus praesentation.entwurf; Akte, inhaltRef und bedingung setzen die Regeln
  hinweise: A(S)
});
```

Prompt `SCHRITT.markenbuch` (Entwurf, Effort medium, gleiches System und Dossier wie die übrigen Schritte, mit Cache; das Dossier enthält die Montage mit Stufen je Pfad):

```text
Schritt Markenbuch: Vorprüfung vor Gate 2.
Du schreibst keine neuen Inhalte. Du verbindest, verkürzt und schlägst vor.
Weg: Verbinde die Einträge aus einsicht.kandidaten, territorien, gate1, richtung, idee.varianten und idee.gezeigt zu Kapitel 1 in fünf Absätzen, in der Anrede des Maklers. Schreibe in seiner Sprache: nur Wörter aus seinem Vertrag, seinen Zitaten oder der Alltagssprache. Verboten sind diese Wörter: {HM_MB_JARGON}. Übertrage Gründe für Verworfenes in Alltagssprache, ohne ihren Inhalt zu ändern. Jeder Bezug muss sich im selben Absatz auflösen. Zahlen nur so, wie sie in den Quellfeldern gezählt sind. Jeder Satz nennt in quellen die Pfade, aus denen er stammt. Keine Aussage über Aufwand, keine Noten, keine Namen von Mitbewerbern, keine Wertung anderer Makler. Höchstens 450 Wörter, Sätze bis 20 Wörter.
Eilige: Verkürze die Einträge, die die Regel für immer und nie ausgewählt hat (Rang: Pflichten, eigene Einträge aus markenvertrag.falschWaere und stimme.verbindlich, eigene Einschränkungen, zuletzt Branchenverbote). Ändere die Auswahl nicht, erfinde nichts; quelle nennt den Pfad.
Vorschläge: Prüfe nur Pfade mit Stufe frei. Melde Anrede gegen die Regel des Kanals, Zahlen ohne Beleg, Sätze über 20 Wörter, Text im Bild über acht Wörter, Klischees, Sätze, die auf jeden Makler passen würden, Sätze, die beim lauten Lesen stolpern. Je Vorschlag pfad, satz als Index, alt wörtlich, neu, grund und kategorie. Ändere nie eine Zahl, einen Namen oder ein Zitat.
Präsentation: Schreibe je Ansicht des Entwurfs (Akte 0 bis 9) eine Sprechnotiz in zwei Sätzen und nenne für die Akte 4 bis 7 das Attribut aus dem Markenvertrag, an dem die Entscheidung begründet wird. Die Frage "Gefällt es Ihnen?" kommt nicht vor.
Antworte ausschließlich mit JSON nach dem Schema.
```

### 8.4 Regelpfad ohne Claude

Dieselbe Struktur. Kapitel 1 entsteht aus festen Verbindern und den Quellfeldern ("Geblieben ist diese:", "[Name] fiel, weil [verworfenWeil]"). Das sind Abläufe, keine Markentexte; sie dürfen bei allen Maklern gleich sein und zählen nicht in die Kohortenprüfung (wie Abläufe und Begründungen in MARKENQUALITAET Kapitel 3). Fehlt ein Grund im Quellfeld, steht eine Lücke mit Arbeitsauftrag ("Kommt aus der Redaktion: warum K2 fiel, aus `einsicht.kandidaten[1].grund`"), nie ein Mustersatz. Die Seite für Eilige nimmt die ersten drei Einträge je Liste nach der Rangregel aus 3.7 ungekürzt. Kapitel 1 prüft der Regelpfad gegen `HM_MB_JARGON`; die festen Verbinder sind jargonfrei formuliert. Der Reveal-Entwurf entsteht vollständig aus der Vorlage der zehn Akte. Vorschläge liefern nur die Regeln (Länge, Anrede, Zahl ohne Klasse, Klischee, Schablonentreffer). Die Sprechnotizen bleiben leer, der Stratege schreibt sie. Zeitbedarf ohne Claude rund 30 Minuten mehr (Setzung).

### 8.5 Selbsttest `hmSelbsttestMarkenbuch()`

1. Ankerfall v1-Markus scheitert mit S2, S7, S9, S10, S11 und G2 unter 60.
2. Sara ohne Antworten scheitert an S15 und lässt sich nicht abzeichnen.
3. Ein zweiter Kenner mit Warte-Geschichte und dem Satz "Zeit ist Teil des Preises." wird als Schablonentreffer gemeldet.
4. Ein Textknoten ohne `data-pfad` im Renderer wird als Fülltext erkannt.
5. Eine Farbe außerhalb von `system.tokens` wird erkannt.
6. "60 Sekunden" in einer Caption ohne Klasse wird erkannt; "Stand 14.10.2026" nicht.
7. Du-Formen in einem LinkedIn-Slot bei der Regel "Du auf Instagram, Sie sonst" werden erkannt.
8. Redaktion eines freien Satzes schreibt eine neue Version im Ursprungsobjekt, ruft dessen Prüfung und ändert alle Stellen mit demselben Pfad.
9. Redaktion eines bestätigten Satzes jenseits eines Tippfehlers erzeugt einen Änderungsantrag und ändert nichts.
10. Ein wörtliches Zitat lässt sich nicht redigieren.
11. Nach der Abzeichnung ändert sich eine Quelle: `gate2.status` bleibt "abgezeichnet", `neuereQuellen` hat einen Eintrag, und `hmRevealEingang` liefert weiter die gezeichnete Version. Nach `hmGate2Zurueckziehen` sperrt der Reveal.
12. Der Knopf "Abzeichnen" ist bei jeder offenen Sperre inaktiv; es gibt keinen anderen Weg, `gate2.status` auf "abgezeichnet" zu setzen.
13. Das Materialpaket enthält bei einer Lückenfläche die Datei nicht und listet sie in `ausgeschlossen`; kein Katalog-Logo im Paket.
14. Der Eyebrow-Detektor findet die Mono-Zeile in `KapitelReveal` und die im Studio-Mock.
15. Die Seite für Eilige enthält den Claim genau einmal und passt gedruckt auf eine A4-Seite.
16. Kein Renderer und keine Komponente dieses Schritts liest `hmBrand(...).claim`, `hmWebObjekte` oder `markenvertrag.leitidee`.
17. Kohortendaten erscheinen nicht im Dossier für Claude.
18. Blindtest bei weniger als zwei anderen Maklern ergibt "nicht prüfbar" und keinen Ersatzwert.
19. **Abnahme einer Redaktionsversion:** Eine Redaktion der Stufe `frei`, deren Prüffunktion im Ursprungsschritt besteht, schreibt eine Version mit `abnahme.pruefung` "bestanden"; `basis` zeigt danach auf diese Version, und S14 schlägt nicht an. Fällt die Prüffunktion, entsteht keine Version und `basis` bleibt unverändert.
20. Der Claim "Zeit ist Teil des Preises." löst S17 aus; eine Ausnahme ohne `nachweisPfad` oder ohne Redaktionseintrag lässt sich nicht speichern.
21. Farbdetektor: Ein Token mit 60 Prozent Deckkraft auf Papier wird nicht gemeldet, wenn `system.tokens` die Deckkraft führt; ein SVG-`stroke` außerhalb der Tokens wird gemeldet; eine Abweichung unter der Toleranz wird nicht gemeldet.
22. Kohorte auf einem Gerät mit unvollständigem Stand ergibt S16 "nicht prüfbar", nie bestanden.
23. Der Reveal-Entwurf hat zehn Akte mit Summe 60 Minuten, 5a vor 5b, keine Variante außerhalb von Akt 4; ohne `stromGrundlage` fehlt 5a, und die Minuten gehen an 5b.
24. Der Belegungsplan hat für die Instagram-Bio genau den Pfad `botschaften.bio.instagram`; eine Kachel mit `serie`, die nicht in `serien[].id` steht, wird gemeldet.
25. Kapitel 1 der Makler-Sicht mit dem Wort "Lesart" fällt durch Q6; die Seite für Eilige mit "Handschlag" vor einem eigenen Eintrag fällt.
26. Die Statuskarte zeigt keine Aufgabe, deren Frist nach dem Live-Tag liegt oder die keine öffentliche Fläche ändert.
27. `hmGate2Frist` ergibt für einen Reveal am Do 05.11.2026 den Mo 02.11.2026 und überspringt einen Feiertag aus `HM_FEIERTAGE`; ein von Hand gesetztes `gate2.frist` wird gemeldet.
28. Eine Lückenkachel auf Folge 2 oder 5 der Empfehlung oder des Gegenentwurfs sperrt die Abzeichnung; eine auf Folge 7 nicht. Ein Porträt-Termin einen Werktag vor der Frist ergibt den Befund "Plan hält nicht".

### 8.6 Aufwand

**Bau (Schätzung, Setzung):**

| Teil | Tage |
|---|---|
| Montage, Belegungsplan, Register der Quellen | 1,5 |
| Kapitel, Rollen, Seite für Eilige, Statuskarte auf Awwwards-Niveau, mobil und am Rechner, Druckfassung | 3 |
| Redaktion mit Rückschreiben, Sperrstufen, Vorschlägen | 1,5 |
| Rubrik, Sperren, Zahlen- und Lückenliste, Detektoren (Farbdetektor mit Alpha und SVG) | 2,5 |
| Kohorte in Text und Bild, Schablonenkorpus, Blindtest | 1 |
| geteilter Speicher `api/wb-kohorte.js` mit Rückfall | 1 |
| Buch als gesetztes Objekt: Seitentypen, Raster A4 und digital, Umschlag, Pacing-Prüfung | 2 |
| Gate-Leiste, Lautlese-Modus, Abzeichnung, Hinweis und Rückzug | 1 |
| Materialpaket mit Manifest | 1 |
| Renderer auf Belegungsplan umstellen, Energiezeile | 1 |
| Claude-Phase mit Schema und Prompt | 0,5 |
| Reveal-Entwurf in zehn Akten mit Bedingung | 0,5 |
| Selbsttest und Ankerfälle | 1 |
| **Zusammen** | **17,5** |

**Betrieb je Makler (Setzung, mit `messung` ersetzen):**

| Rolle | mit Claude | ohne Claude |
|---|---|---|
| Stratege: Redaktion, Zahlen, Reveal-Entwurf | 95 Minuten | 125 Minuten |
| zwei Gestalter: Gestalt-Urteil | je 15 Minuten | je 15 Minuten |
| Person ohne Projektbezug: Blindtest, Fünf-Minuten-Test | 10 Minuten | 10 Minuten |
| Creative Director: Lautlese, Checkliste, Abzeichnung | 30 Minuten | 30 Minuten |
| Makler | 0 Minuten, dazu nur bestehende Aufgaben | 0 Minuten |

Kosten der Claude-Phase: ein Aufruf mit Cache auf System und Dossier; die genaue Zahl liefert `kette.schritte` nach den ersten Läufen (Lücke). Keine Konten des Maklers bei fremden Werkzeugen.

---

## 9. Offene Punkte und Lücken

1. **Du oder Sie gegenüber dem Makler** in Statuskarte, Kapitel 1 und Makler-Sicht (Owner, Zerlegung 7.1); bis dahin nach seiner Website-Anrede.
2. **Schwellen der Bild-Kohorte** (vier von sechs Merkmalen, Hamming-Distanz im Rastervergleich) und die Toleranz des Farbdetektors (ΔE OK 0,02) sind Setzungen ohne Messung; tragfähige Kohortengröße offen (R4 offene Frage 1).
3. **Gewichte der Rubrik** und die Aufteilung 50 zu 50 zwischen Text und Gestalt sind Setzung; die Ankerfälle prüfen nur, dass die Note trennt, nicht, dass die Gewichte richtig sind.
4. **Grundlage des Fremdtests:** Lizenz des Pools `HM_STROM_POOL` oder Owner-Freigabe für Bildschirmfotos (Schritt 15). Ohne sie entfällt Akt 5a; keine Rechtsberatung in diesem Dokument.
5. **Speicherdienst der Kohorte** für `api/wb-kohorte.js` (Owner). Der Bedarf ist entschieden und Voraussetzung für S16, der Dienst nicht; das betrifft auch das Rate-Limit in MARKENQUALITAET Kapitel 7.
6. **Markenarchitektur UNIO und Makler** (R5 offene Frage 5): Ob ein UNIO-Rahmen auf jeder Anwendung steht, ändert Belegungsplan, Umschlag und Kohortenabdruck.
7. **Druckwerte, Schildmaß, Schriftlizenzen, A4-Raster** fehlen bei Markus und vermutlich bei jedem ersten Makler; der Prozess bis zu Schritt 16 ist beschrieben, die Werte nicht.
8. **Für Markus** fehlen alle v2-Eingänge aus den Schritten 5 bis 13 in abgenommener Form; das Beispiel zeigt Struktur, Befunde und Niveau, kein fertiges Markenbuch. Die Befunde 1, 2, 4 und 9 hängen an Dokumenten, die parallel überarbeitet werden, und sind beim nächsten Stand erneut zu prüfen.
9. Die Setzungen dieses Dokuments (450 Wörter, Seitenzahl je Kapitel, fünf Minuten, 20 Punkte Abweichung, Teamzeiten, 24 Stunden Stand der Kohorte) werden an den ersten fünf Maklern gemessen und ersetzt. Die drei Werktage Frist und die Minuten je Akt sind Setzungen aus Schritt 15.
10. **Setzungen aus der Kettenprüfung:** zwei Werktage zwischen Porträt-Termin und Gate-2-Frist, Mindeststand über Folge 1 bis 6, Befund "Wahl nicht sichtbar". Ob der Puffer von fünf Werktagen für 9 bis 11 in Schritt 1 reicht, ist ungemessen.

---

## 10. Quellen

Intern: `docs/werkbank/branding-v2/00_ZERLEGUNG.md`, `bestand/KETTE_IST.md`, `bestand/FRAGEN_WIRKUNG_IST.md`, `research/R1-studios.md` bis `R8-kundenerlebnis.md`, `schritte/01_auftakt.md` bis `13_feed.md`, `15_reveal.md`, `16_freigabe.md`, `17_betrieb.md`, `docs/werkbank/MARKE_SCHEMA.md`, `docs/werkbank/MARKENQUALITAET.md`; Code `ui_kits/werkbank/wb-markenbuch.jsx`, `wb-material.jsx` (`hmAlsPng`), `wb-plattform.jsx`, `wb-markenwelten.jsx`, `wb-werkzeuge.jsx`, `wb-store.jsx`, `wb-app.jsx`, `api/wb-marke.js`.

Studios, Praxis, Werkzeuge
- Koto, Barkas, SDG zu Richtlinien: https://the-brandidentity.com/interview/presented-by-brandpad-how-to-create-successful-brand-guidelines-with-koto-london-barkas-and-sdg
- Pentagram, How&How, Studio Blackburn zu Systemen und Laienverständnis: https://the-brandidentity.com/interview/presented-by-brandpad-how-to-systemise-a-brand-featuring-pentagram-how-how-and-studio-blackburn
- Zukunft der Richtlinien, Sicht je Partner: https://the-brandidentity.com/insight/the-future-of-brand-guidelines-promises-big-changes-together-with-brandpad-we-decode-whats-to-come
- Paul Rand, NeXT: https://www.logodesignlove.com/next-logo-paul-rand
- Mozilla, Roads not taken: https://blog.mozilla.org/opendesign/roads-not-taken/
- Studio Dumbar, Liza Enebeis: https://developments.media/interviews/liza-enebeis
- Pentagram, The Public Theater: https://www.pentagram.com/work/the-public-theater-2020-2021-season
- Pentagram, Mastercard: https://www.pentagram.com/work/mastercard
- Engel & Völkers, Markenportal: https://www.martechoutlook.com/cxoinsights/lara-maier-nid-3935.html
- Frontify Brand Portal: https://www.frontify.com/en/brand-portal
- Frontify, Brand Guidelines for AI: https://www.frontify.com/en/guide/brand-guidelines-for-ai
- Brandpad: https://brandpad.io/
- Corebook Studio: https://www.corebook.io/studio
- Canva Template Locks: https://www.canva.com/help/brand-template-locks/
- Markup.io: https://www.markup.io/
- Bierut, On (Design) Bullshit: https://designobserver.com/on-design-bullshit/
- GDUSA, Pentagram und performance.gov: https://gdusa.com/pentagram-federal-website-generates-ai-controversy/
- It's Nice That, Kinfolk: https://www.itsnicethat.com/articles/opinion-kinfolk
- Monteiro, 13 Ways (Sekundärquelle): https://thepiratetester.wordpress.com/2021/04/12/2021-04-12-my-breakdown-of-mike-monteiro-13-ways-designers-screw-up-client-presentations-and-how-it-applies-to-testers/
- Colin Mitchell, Selling the Brand Inside: https://hbr.org/2002/01/selling-the-brand-inside
- WCAG 2.2, 1.4.3: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- EAVG-Novelle 2026: https://www.energieausweis360.at/energieausweis-neuerungen-2026 und https://www.chg.at/novelle-des-energieausweis-vorlage-gesetzes/
- ÖVI, Informationspflicht in Medien: https://www.ovi.at/recht/energieausweis/informationspflicht-in-medien

Studien
- Buell und Norton 2011, Labor Illusion: https://doi.org/10.1287/mnsc.1110.1376
- Kahneman u. a. 1993, Peak-End: https://journals.sagepub.com/doi/10.1111/j.1467-9280.1993.tb00589.x
- Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290
- Wenger und Kenett 2026: https://academic.oup.com/pnasnexus/article/5/3/pgag042/8529001
- Walsh, Winterich, Mittal 2010: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1998809
- Hsee 1996: https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf
- Cowan 2001: https://doi.org/10.1017/s0140525x01003922

---

## Änderungen aus der Kettenprüfung

Anlass: Termine in 14 widersprachen den Schritten 1 und 16 (Gate-2-Frist 02.11. gegen 03.11., Live-Tag 17.11. gegen 24.11.), und zwischen Wort-Link und Porträt-Termin fehlte Puffer. Dazu drei Erlebnislücken, die Gate 2 betreffen.

1. **Daten nur gelesen (3.2, 3.13, 3.15, 5.5).** Neuer Absatz "Daten nur gelesen, nie gesetzt": alle Daten aus `auftrag.termine` (`hmAuftragTermine`, danach `hmRolloutPlan`); Frist über die neue Funktion `hmGate2Frist(mid)` mit `hmWerktageMinus`. Im Beispiel Markus Live-Tag von Di 17.11. auf Di 24.11.2026 korrigiert (Stand 1 und 16), Lückentermine im Datenobjekt mit Herkunftskommentar, Statuskarte mit Platzhalter statt festem Tag und fester Uhrzeit. Die Zählung Mo 02.11. bleibt, weil sie der Regel "drei Werktage vor dem Reveal" folgt; 1 wird angewiesen, den Wert zu lesen statt "03.11." zu nennen. Die Uhrzeit des Live-Tags (11.30 in 1 gegen 11 Uhr in 16) nennt 14 nicht mehr; der Widerspruch liegt zwischen 1 und 16.
2. **Abstand und Ausfall Porträt-Termin (3.2).** Mindestens zwei Werktage zwischen Porträt-Termin und `gate2.frist` (Setzung), früher Befund "Plan hält nicht"; Regel für einen ausgefallenen Termin mit Folge für das Reveal-Datum. Den Puffer für 9 bis 11 nach dem Wort-Link rechnet Schritt 1 (Hinweis 11 in 5.6).
3. **Mindeststand für den Reveal (3.10.1, Q19).** Keine Lückenkachel in Folge 1 bis 6 und in den für 5a und 5c geöffneten Kacheln, für Empfehlung und Gegenentwurf; eine Kennzahl-Folge ohne Zahl und Quelle zählt dort als Lücke. Teil "Lücken" von Gate 2 schließt ihn ein, die fünf Teile und die Felder bleiben, darum ändert sich an der Prüfung in Schritt 15 nichts.
4. **Sichtbare Wahl (3.12).** Befund "Wahl nicht sichtbar", wenn Empfehlung und Gegenentwurf im Feed nur im Porträtausschnitt abweichen; sperrt nicht, Hinweis an 9.
5. **Folgestellen.** Hinweise 11 bis 13 in 5.6 (an 1, 9, 13), Q19 in 6.1, Selbsttest 27 und 28, `wb-gate2.jsx` in 8.1, offener Punkt 10.

Nicht geändert, weil nicht Sache von 14: doppelte Fragen in 1, 2, 3 und 4, der Ort der Einwilligungen, die Kriterien und die Serienwahl in 15, die Tragfähigkeit der Signatur-Serie in 12.
