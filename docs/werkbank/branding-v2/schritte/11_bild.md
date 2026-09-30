# Schritt 11. Bildsprache und Shooting-Brief (`bild`)

Stand 30.09.2026, dritte Fassung. Entwurf zur Freigabe durch den Owner. Teil der Zerlegung in `../00_ZERLEGUNG.md`, Kapitel 3, Schritt 11.

Lesart wie in der Zerlegung: **Belegt** heißt, es steht in einer Quelle mit URL oder in einer genannten Datei. **Ableitung** heißt, eigene Folgerung. **Setzung** heißt, bewusst gesetzter Startwert, der an den ersten Maklern gemessen und ersetzt wird. **Lücke** heißt, wir wissen es nicht. **Annahme** heißt, ein Wert, der im Beispiel die Mechanik zeigt und im Betrieb aus einem Feld kommt.

**Was sich gegenüber der zweiten Fassung geändert hat.** Der Ausschnitt rechnet nicht mehr eine Linie aus `system.zeichen.platz`, sondern trennt drei Maße mit eigener Herkunft: die sichtbare Kante (das gezeichnete Zeichen liegt auf einer echten Kante im Bild), den unsichtbaren Horizont auf den Augen und eine feste Achse, die sich nicht mit der Datenregel des Zeichens bewegt. Das Markus-Beispiel folgt jetzt Schritt 9 (Zeichen "Das Zeitmaß", Gegenentwurf auf der Achse `tonwert`); beide Entwürfe haben denselben Ausschnitt. `workshop.ort` ist Eingang und liefert Licht, Orte und Material. Von vier Fragen bleibt eine Bestätigung. Der Porträt-Termin steht nur noch in `auftrag.termine.portraet`. Die Regel wurde am echten Seed-Porträt nachgerechnet und an zwölf Kacheln auf Eintönigkeit geprobt. Das Schema ist API-fähig.

---

## 0. Kurzfassung

1. **Der Ausschnitt ist ein Code aus drei Maßen.** Die gezeichnete Linie des Zeichens liegt sichtbar auf einer echten Kante im Bild (Tischkante, Fensterbank, Sockel). Der Horizont liegt unsichtbar auf den Augen, weil die Kamera auf Augenhöhe steht, und damit ist diese Lage in jeder Einstellungsgröße physikalisch richtig. Die Nasenachse steht an einer festen Stelle, auch wenn die Datenregel des Zeichens seinen Strich verschiebt. So wird der Feed am Ausschnitt erkennbar, und die Idee steckt im Bild statt in einem Requisit (Ableitung aus R2 Prinzip 8 und aus Pentagram, Public Theater, Konstante plus eine Variable, https://www.pentagram.com/work/the-public-theater-2020-2021-season).
2. **Was konstant bleibt und was wechselt, ist benannt.** Konstant: Kante, Horizont, Achse, Lichtseite. Kontrolliert wechselnd: Einstellungsgröße und Blickziel (Kamera, Gegenüber, Unterlage). Zwei gleiche Kombinationen stehen nie im Abstand eins oder drei.
3. **Mindestens vier Parameter folgen aus seinen eigenen Eingängen:** Ausschnitt aus seinem Zeichen, Licht aus seinem Fenster (`workshop.ort`), Einstellungsmix aus seinem Porträtstil (`idee.codes`) und Farbbehandlung aus seiner Palette (`system.farbe`). Die Kohortenprüfung nutzt dieselbe Funktion, Rundung und Schwelle wie der Strukturabdruck in Schritt 14.
4. **Kontaktbogen in zwei Durchgängen, ohne den Makler.** Durchgang 1 sortiert technisch vor, Durchgang 2 ist Art Direction. Vorbild ist die Magnum-Praxis, Markierungen in mehreren Durchgängen zu setzen (https://www.magnumphotos.com/theory-and-practice/magnum-photographers-contact-sheets-the-images-behind-the-image/).
5. **Ein Original, derselbe Ausschnitt in beiden Entwürfen**, solange die Achse des Gegenentwurfs nicht `ausschnitt` ist. Bei Markus unterscheiden sich die Entwürfe nur in der Tonkurve (Achse `tonwert`).
6. **Porträt-Termin nach einer harten Regel.** Nötig, wenn weniger als acht verwendbare Gesichtsbilder vorliegen, höchstens drei je Situation (Setzung). Der Termin steht in `auftrag.termine.portraet`; dieser Schritt setzt nur seinen Status.
7. **Ein Brief, zwei Sichten.** Der Fotograf bekommt Maße, Sonnenstand je Ort und Uhrzeit, Regenvariante und einen Sucherrahmen. Der Makler bekommt eine Seite: wann, wo, was er anzieht, wie das Licht an seinem Fenster ist, was bei Regen passiert, welche drei Fragen kommen und was er nicht tun muss.
8. **KI nur als Stimmung fürs Team**, gekennzeichnet und technisch gesperrt für Kontaktbogen, Porträt und Feed.

---

## 1. Ziel und Erfolgskriterium

**Ziel.** Festlegen, wie Bilder dieser Marke ausgewählt, beschnitten und gereiht werden, das vorhandene Material als Kontaktbogen kuratieren und einen Fotobrief schreiben, mit dem Fotograf oder Team am Drehtag ohne Rückfrage arbeiten. Der Makler entscheidet am Kontaktbogen nichts. Er bekommt nur dann einen Porträt-Termin vor dem Reveal, wenn sein Material den Feed nicht trägt, und er weiß vor jedem Termin genau, was ihn erwartet.

**Erfolgskriterium.** Der Schritt ist gelungen, wenn alle sieben Punkte zutreffen.

| Nr. | Kriterium | Messung | Status |
|---|---|---|---|
| E1 | Der Crop ist ein Code | Blindtest: drei Teammitglieder ordnen zwölf Gesichtskacheln mit verpixeltem Gesicht dem richtigen Makler zu, gemischt mit Kacheln von zwei anderen UNIO-Maklern. Mindestens zwei von drei treffen | Setzung, erst ab drei Maklern in der Kohorte möglich |
| E2 | Der Feed ist gedeckt | Vor dem Reveal mindestens acht verwendbare Gesichtsbilder aus mindestens drei Situationen, jede Datei mit geklärten Rechten aller Abgebildeten, null KI-Bilder in Auswahl und Porträt | Setzung, gekoppelt an `feed.pruefung.gesicht` in Schritt 13 |
| E3 | Ein fremder Fotograf braucht keine Rückfrage | Rückfragen vor und am Termin: null. Mindestens 80 Prozent der Lieferung bestehen Durchgang 1, jedes Pflichtmotiv ist gefüllt | Setzung, gemessen an jedem Termin |
| E4 | Der Drehtag deckt die Reels | Die Clip-Liste deckt jedes Reel in `start30` mit Titelbild, gesprochenen Sätzen und B-Roll | Prüfung in Schritt 16 (`hmDrehtagClips`) |
| E5 | Der Makler hat Klarheit | Null Entscheidungen am Kontaktbogen, höchstens eine Bestätigung, keine Suchaufgabe. Seine Seite beantwortet wann, wo, was anziehen, wie lange, welches Licht, was bei Regen und welche Fragen | Ableitung aus der Rubrik "Erlebnis" |
| E6 | Der Feed wird nicht eintönig | Zwölferprobe (P16): keine gleiche Kombination aus Einstellung und Blickziel im Abstand eins oder drei, mindestens drei Einstellungen und drei Blickziele über zwölf | Setzung, geprüft am Datensatz und am Render |
| E7 | Nichts ist erfunden | Jede Regel hat `warum`, `quelle` und `herkunft`, jede Lücke steht als Lücke im Brief, kein Mustersatz aus dem Regelpfad | Selbsttest |

---

## 2. Geprüfte Alternativen und warum sie verworfen sind

| Nr. | Alternative | Was dafür spricht | Warum verworfen | Quelle |
|---|---|---|---|---|
| A1 | **Moodboard aus Stock-, Pinterest- oder Makler-Referenzen** als Kern der Bildsprache und als Vorlage für den Fotografen | Schnell, jeder Fotograf kennt es | Ganze Beispielbilder erzeugen Fixierung, auch wenn ihre Mängel benannt sind (Jansson und Smith). Boards werden anders gelesen als gemeint (Munk u. a.). Mucho beginnt ausdrücklich nicht mit Referenzwänden. Fremde Bilder dürfen nicht ins öffentliche Repo, Feeds anderer Makler sind als Vorbild gesperrt | https://www.sciencedirect.com/science/article/abs/pii/0142694X9190003F, https://www.designsociety.org/download-publication/43213/visual_boards_mood_board_style_board_or_concept_board, https://eyemagazine.com/feature/article/reputations-mucho, R2 Kapitel 4 und 5 Punkt 6 |
| A2 | **Generierte Porträts oder Grätzl-Bilder im Feed**, bis das echte Shooting da ist | Der Feed wäre ohne Termin voll | Verstößt gegen die UNIO-Regel "keine KI-Bilder von erkennbaren Personen" (`ui_kits/werkbank/CLAUDE.md`). Die Debatte um Pentagram und performance.gov zeigt das Reputationsrisiko, wenn KI sichtbar Handwerk ersetzt. Täuschend echte KI-Bilder realer Orte sind nach Art. 50 AI Act zu kennzeichnen (`BILDWELT_BRUECKE.md`) | https://gdusa.com/pentagram-federal-website-generates-ai-controversy/, R4 Kapitel 4 Punkt 8, R5 Kapitel 5 |
| A3 | **Der Makler wählt Bilder und Ausschnitte selbst** | Eigentumsgefühl, weniger Teamzeit | Mitgestalten steigert den empfundenen Wert nur, wenn die Aufgabe abgeschlossen wird und man sich kompetent fühlt (Norton, Mochon, Ariely; Fuchs, Prandelli, Schreier). R2 3.8: "Der Makler muss dafür nichts entscheiden." R1 4.9 lässt das Kuratieren beim Team | https://myscp.onlinelibrary.wiley.com/doi/abs/10.1016/j.jcps.2011.08.002, https://doi.org/10.1509/jmkg.74.1.65, R2 3.8, R1 4.9 |
| A4 | **Nur der Standard-Zuschnitt** aus `/maklerzuschnitt` für alle Formate und alle Makler | Gebaut, getestet, live | Konsistent, aber nicht unterscheidbar: jeder UNIO-Makler hätte denselben Ausschnitt. KI-gestützte Arbeit macht viele Ergebnisse einander ähnlicher (Doshi und Hauser). Nur 15 Prozent der Markenelemente sind wirklich unverwechselbar (JKR und Ipsos). Der Standard bleibt Werkzeug für die Landmarken und gilt als Zuschnitt nur für Profil und Signatur | https://www.science.org/doi/10.1126/sciadv.adn5290, https://www.marketingweek.com/15-brand-assets-truly-distinctive-finds-research/, `tools/maklerzuschnitt/src/index.html` |
| A5 | **Die gezeichnete Linie liegt sichtbar auf der Augenlinie** (Zeichen als Überlagerung im Bild) | Maximale Sichtbarkeit des Codes | Die Linie liefe durch das Gesicht, das stärkste Asset der Personenmarke (R7 2.4). Schritt 9 und 10 legen das Zeichen an die Unterkante der sicheren Fläche, und Schritt 10 sperrt "nie als Muster oder Hintergrund". Darum: sichtbare Linie auf einer Kante, Horizont auf den Augen unsichtbar | `09_idee.md` 3.11, `10_system.md` 10.4, R7 2.4 |
| A6 | **Immer ein professionelles Voll-Shooting vor dem Reveal** | Studio-Standard: The Modern House beauftragt für jedes Haus redaktionelle Fotografie | Kostet Makler-Zeit und Budget, auch wenn sein Material trägt. Die Zerlegung entscheidet: Reveal mit echtem Material, Porträt-Termin nur bei Bedarf, Drehtag nach der Freigabe (00_ZERLEGUNG Kapitel 6) | https://www.holeandcorner.com/long-reads/in-the-modern-style, 00_ZERLEGUNG Kapitel 6 |
| A7 | **Fotobrief als Prosa von Claude** ("ruhige, hochwertige Bilder im Tageslicht") | Liest sich gut, entsteht in Sekunden | Aus Adjektiven baut ein fremder Fotograf kein Bild, das in den Feed passt. Begründungen ohne Rückbezug sind Dekoration (Bierut). Leitfäden verlangen, bei jeder Referenz zu benennen, was genau gemeint ist. Frontify trennt verbindliche Werte von Ermessen | https://designobserver.com/on-design-bullshit/, https://milanote.com/guide/photoshoot-brief, https://www.frontify.com/en/guide/brand-guidelines-for-ai |
| A8 | **Claude bewertet die Fotos** (Bildanalyse) | Schneller Durchgang 2 | Porträts gingen an eine API ohne Einwilligung für diesen Zweck. Heute schickt die Werkbank bewusst nur Namen und Arten von Dateien an Claude (KETTE_IST 2.1). Aufgeschoben, nicht verworfen | R1 4.9, `bestand/KETTE_IST.md` 2.1 |

---

## 3. Die gewählte Lösung

### 3.1 Drei Grundsätze

**G11.1 Kante, Horizont, Achse.** Der Ausschnitt folgt dem Zeichen über drei Maße, jedes mit eigener Herkunft:

| Maß | Was im Bild dort liegt | Sichtbar | Herkunft |
|---|---|---|---|
| `kanteY` je Format | eine echte waagrechte Kante: Tischkante, Fensterbank, Sockel, Stufe | ja: das gezeichnete Zeichen liegt genau darauf | `system.zeichen.platz[format]`, die Höhe der Linie des Zeichens. Hat das Zeichen keine Linie, setzt das Team die Kante mit Grund |
| `horizontY` | die Augen der Person; bei Bildern ohne Person der Horizont oder die Fluchtlinie | nie | `herkunft: "team"` mit Grund, weil das Zeichen an der Unterkante liegt und über die Augenhöhe nichts sagt |
| `punktX` | die Nasenachse; ohne Person der Schwerpunkt des Motivs | nie | `herkunft: "team"` mit Grund. **Fest.** Verschiebt die Datenregel des Zeichens (Schritt 10, `datenregel`) den Strich je Beleg, bleibt `punktX` stehen. Die Spanne wandert, der Mensch nicht |

**Warum der Horizont auf den Augen liegt (Handwerk).** Steht die Kamera waagrecht auf der Augenhöhe der Person, liegt der Horizont im Bild auf ihren Augen, egal wie weit sie entfernt ist, denn der Horizont liegt immer auf der Höhe der Kamera. Dasselbe gilt für jede andere Person mit derselben Augenhöhe. Die Regel ist darum in der weiten Einstellung so natürlich wie im nahen Porträt, und ein Fotograf kann sie ohne Rechnung einhalten: Kamera auf seine Augenhöhe, Horizont auf die Hilfslinie. Sitzt er, steht die Kamera auf seiner Sitz-Augenhöhe. Dieser Satz steht im Fotobrief.

**Warum die sichtbare Linie auf einer Kante liegt.** So wird das Zeichen im Bild zu einer Bemaßung von etwas Echtem: Das Zeitmaß von Markus liegt auf der Tischkante wie ein Maßstab auf dem Plan. Schritt 9 verlangt das im Porträtstil ausdrücklich ("Der Ausschnitt legt eine Waagrechte des Bildes, etwa Tischkante, Fensterbank oder Gesims, auf die Höhe des Zeitmaßes", `09_idee.md` 3.11). Die Kante bestimmt zugleich die Einstellung: Wer am Tisch sitzt, ist nah, wer am Fenster sitzt, halbnah, wer auf einer Stufe im Freien sitzt, weit. Der Fotograf wählt also mit dem Ort die Einstellung, nicht mit dem Zoom (Ableitung).

**G11.2 Ein Original, ein Ausschnitt, zwei Entwürfe.** Jede Aufnahme wird so weit fotografiert, dass Post, Reel-Titelbild und Story aus demselben Original ohne Hochrechnen entstehen (`meta.faktor` höchstens 1,05, Hinweis "Auflösung zu gering" wie in `/maklerzuschnitt`). Ist die Achse des Gegenentwurfs (`idee.gezeigt.achse`) nicht `ausschnitt`, ist der Ausschnitt in beiden Entwürfen identisch, und nur der Parameter der Achse wechselt, bei `tonwert` die Tonkurve. Nur bei der Achse `ausschnitt` (Pole nah oder halbnah, Katalog in `09_idee.md` 3.6) rechnet die Werkbank zwei Ausschnitte. So bleibt der Vergleich im Reveal eine Sache (Hsee 1996, https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf).

**G11.3 Maße vor Adjektiven, eigene Eingänge vor Vorgaben.** Jede Regel hat Wert, Toleranz oder ein "nicht", dazu `warum`, `quelle` und `herkunft`. Mindestens vier Regeln tragen Werte aus Eingängen dieses Maklers (3.3). Wo ein Eingang fehlt, setzt der Regelpfad eine Lücke, keinen allgemeinen Wert. Nur Handwerkskonstanten (Brennweite, keine Filter) gelten für alle und zählen nicht zur Unterscheidung.

### 3.2 Ablauf

| Nr. | Teil | Wer | Makler-Zeit | Ergebnis |
|---|---|---|---|---|
| 11.1 | Bildregeln ableiten, sobald `system` für Empfehlung und Gegenentwurf abgezeichnet ist | Regeln, Team setzt `horizontY` und `punktX` mit Grund | keine | `bild.regeln`, `bild.motive`, `bild.vermeiden` |
| 11.2 | Kontaktbogen anlegen aus `vorab.material` und dem Porträt-Speicher | Regeln | keine | `bild.kontaktbogen[]` |
| 11.3 | Durchgang 1: technische Vorsortierung, Team bestätigt Kandidaten und Situationen | Regeln, Team | keine | `durchgang1`, `situation` |
| 11.4 | Rechte nachhalten: nur Dateien, die nach Schritt 1 (F4) und `workshop.aufgaben` noch offen sind, als Erinnerung an die bestehende Aufgabe | Team | keine neue Frage | `rechte` |
| 11.5 | Durchgang 2: Auswahl, Rolle, Zuschnitt je Format | Team (Art Director) | keine | `durchgang2`, `rolle`, `crop` |
| 11.6 | Zählung, Asset Nummer eins, Porträt-Termin-Status, Lücken je Platz, Zwölferprobe | Regeln, Team bestätigt Asset Nummer eins | keine | `bild.portraet`, `bild.portraetTermin`, `bild.luecken` |
| 11.7 | Fotobrief: Maße und Sonnenstand aus dem Regelpfad, Sätze von Claude oder Lückentext, Prüfung durch den Art Director | Regeln, Claude, Team | keine | `fotobrief` |
| 11.8 | Nur wenn `portraetTermin.noetig`: Bestätigung des vorgemerkten Termins (F3), Seite für den Termin, Termin, danach Durchgang 1 und 2 | Makler, Team | ein Klick, 75 Minuten Termin (Setzung) | neue Einträge, `bild.portraet` endgültig, `portraetTermin.messung` |
| 11.9 | Optional: Bildwelt-Auftrag für Stimmungsproben ohne Menschen | Team, Claude-Sitzung | keine | `bild.bildweltAuftrag` |

11.1 bis 11.7 laufen nach Schritt 10 ohne Makler. 11.8 liegt vor dem Reveal und blockiert Schritt 13 nicht: Schritt 13 rendert, bis die Bilder da sind, mit den Bildern aus dem Bestand. Den Termin hat Schritt 1 nach seiner Prognose vorgemerkt (`01_auftakt.md` 3.3); Schritt 11 setzt den Status auf "bestätigt" oder "entfällt".

### 3.3 Bildregeln (`bild.regeln`)

Jede Regel hat die Form `{wert, mass, toleranz, nicht, warum, quelle, herkunft}`. `herkunft` ist `eingang` (Wert aus einem Feld dieses Maklers), `team` (gesetzt mit Grund) oder `handwerk` (für alle gleich). Claude ändert keine Maße.

| Regel | Was sie festlegt | Aus eigenen Eingängen | Handwerkskonstante | Fehlt der Eingang |
|---|---|---|---|---|
| `licht` | Lichtseite, Tageszeit, Lichtart, was nie | Seite aus `workshop.ort.licht.richtung` (sein Fenster), Tageszeit aus `workshop.ort.licht.tageszeit` und `brief.einschraenkungen` (etwa Vormittag), Licht und Farbtemperatur aus `vorlieben.profil` | kein Blitz direkt, kein Gegenlicht mit Lichtschleier | Lücke "Lichtseite: bei der Begehung bestimmen"; der Brief ist nicht freigebbar (P9) |
| `abstand` | Einstellungen mit Kopfanteil und Anteil an der Auswahl, zugeordnete Kante | führende Einstellung und Haltung (sitzt, steht, geht) aus `idee.codes` Porträtstil; Anteil der nahen Einstellungen aus `workshop.probedreh.komfort.beobachtetKamera` (ab 5 von 7 mehr nah, darunter mehr halbnah und Gespräch, Setzung) | Kamera auf Augenhöhe, 50 bis 85 mm Kleinbild für Gesichter | Lücke; kein Standardmix |
| `haltung` | was er tut, was nie | `brief.verbote`, `workshop.falschWaere` über `brief`, `idee.codes` | er posiert nicht, Hände sichtbar | nur die Handwerkskonstante |
| `ausschnitt` | Kante, Horizont, Achse, Blickziele, Toleranz, je Format, je Entwurf | `kanteY` aus `system.zeichen.platz`; Entwürfe aus `idee.gezeigt.achse` | Toleranz Horizont 1,5 Prozent der Höhe, Achse 2 Prozent der Breite (Setzung) | Team setzt mit Grund, `herkunft: "team"` |
| `reihung` | Beziehungen zwischen Bildern | Blickziele aus `idee.codes` (Porträtstil frontal: Kamera ist Pflicht-Blickziel) | nie dieselbe Einstellung in Folge; nie dieselbe Kombination aus Einstellung und Blickziel im Abstand eins oder drei | nur die Handwerkskonstante |
| `farbbehandlung` | Weißabgleich, Tonkurve, Sättigung, Retusche | je Entwurf aus `system.farbe`: Lichter nie heller als `grund` bei hellem Grund, Tiefen auf den Ton von `text`; bei dunklem Grund Tiefen auf `grund`, damit das Bild in die Fläche übergeht; der Akzent erscheint nie im Bild (er gehört dem Zeichen, `09_idee.md` E2) | keine Filter, keine Vignette, kein Weichzeichner; Retusche nur für Vorübergehendes | Lücke bis `system.farbe` abgezeichnet ist |

Warum `reihung` schmal bleibt: Positionen im Raster, Gesichts- und Tonwertperiode setzt Schritt 12 in `grammatik`. Hier stehen nur fotografische Beziehungen, die Schritt 12 liest.

Warum der Blick nie die Seite nach der Rasterspalte wechselt: Die Spalte eines Beitrags verschiebt sich mit jedem neuen Beitrag um eins (Schritt 12, `nachbarn` i plus minus 1 und plus minus 3). Eine Regel "in der rechten Spalte nach links schauen" wäre nach dem nächsten Beitrag falsch. Darum wechselt nicht die Seite, sondern das Blickziel, und ein Blick zur Seite geht immer in den größeren freien Raum (Ableitung aus R6 Prinzip 2).

### 3.4 Die Rechnung des Ausschnitts

Für jedes Format f und jeden Entwurf e:

1. **Fenster** aus `system.raster`: beim Post 1080 x 1350 das mittige 3:4-Fenster 1012,5 x 1350 ab x 33,75; beim Reel-Titelbild und der Story die Kachelmitte 1080 x 1440 ab y 240 und darin die Zone x 65 bis 1015, y 269 bis 1248 (R6 Regel R6 und R7, https://www.kapwing.com/resources/instagrams-new-grid-layout-size-and-dimensions-2025/, https://www.facebook.com/business/ads-guide/update/video/instagram-reels; für organische Reels Annahme).
2. **Kante** `kanteY[f]` = Höhe der Linie des Zeichens aus `system.zeichen.platz[f]`, als Anteil des Fensters. Beim Reel liegt das Zeichen an der Unterkante der sicheren Zone, im Raster also höher als beim Post. Konstant über das ganze Raster ist darum der Horizont, nicht die Kante (Befund an Schritt 10 in 5.5).
3. **Horizont und Achse** aus `bild.regeln.ausschnitt`, in allen Formaten als derselbe Anteil der 3:4-Fläche, die im Raster sichtbar ist.
4. **Landmarken.** `/maklerzuschnitt` erkennt heute die Augen links und rechts, die Nasenspitze und das Kinn (face-api, Punkte 36 bis 47, 30 und 8 in `index.html`). Der Scheitel ist eine Konstante der Guideline (`G.crown` 0,0268), keine Erkennung. **Rückfallweg, bis die Erweiterung live ist:** Das Team setzt im `CropFenster` mit zwei Klicks Augenlinie und Kinn, die Werkbank schätzt den Scheitel als `augen minus (kinn minus augen)`. Die Formel steckt in der Guideline selbst: Augen 0,2142 minus Scheitel 0,0268 ergibt 0,1874, genau so viel wie Kinn 0,4016 minus Augen. Am Seed-Porträt trifft die Schätzung den gemessenen Scheitel auf einen Pixel (3.12 d).
5. **Machbarkeit.** Aus Landmarken, Kopfanteil der Einstellung und Fenster rechnet die Werkbank den nötigen Bildraum. Nicht machbar, wenn der Faktor über 1,05 liegt oder eine Bildkante ins Fenster fiele. Bilder ohne echte Kante auf `kanteY` sind für Gesichtskacheln nicht machbar, sie können nur Profil, Signatur oder Reserve sein.
6. **Toleranz** Horizont plus minus 1,5 Prozent, Achse plus minus 2 Prozent, Kante plus minus 1 Prozent (Setzung). Außerhalb nur mit Grund im Eintrag.
7. **Ohne Gesicht.** Das Team legt die Kante mit einem Zug auf `kanteY` und den Horizont auf `horizontY`. Der Selbsttest prüft, dass beide Werte gesetzt sind.

**Profil und Signatur.** Beide sind Kreise; dort schneidet keine Kante. Der Zuschnitt folgt der Kreisregel aus `system.raster` (Kopf füllt 60 bis 70 Prozent des Durchmessers, Gesicht mittig, `10_system.md` Tabelle Formate), gerechnet in diesem Schritt. **Einzige Quelle ist `bild.portraet.zuschnitt.profil`.** Schritt 13 liest ihn, statt eine eigene Kopfhöhe zu setzen (Korrekturauftrag in 5.5). Die Faktorprüfung beim Profil läuft gegen 330 px, das Dreifache der größten Prüfgröße 110 px aus Schritt 10 (Setzung), nicht gegen den Upload von 1080 px, weil Instagram das Profil als Kreis klein anzeigt.

### 3.5 Der Kontaktbogen (`bild.kontaktbogen[]`)

**Aufbau.** Alle Dateien eines Maklers in Streifen nach Situation. Eine Situation ist derselbe Ort mit demselben Oberteil im selben Licht. Die Werkbank schlägt Situationen aus dem Aufnahmezeitpunkt vor (neue Situation nach mehr als 15 Minuten Pause, Setzung), das Team bestätigt. Ortsdaten aus den Dateien werden nicht gelesen.

**Durchgang 1, Kandidaten.** Automatisch aus `meta` von `/maklerzuschnitt` oder der Handeingabe: Gesicht erkannt, Anzahl Gesichter, Schärfe, Helligkeit, Auflösung, Machbarkeit je Format, `ki`, Rechte. Die Maschine markiert nur "technisch geeignet" oder "nicht geeignet" mit Grund. Das Team bestätigt und darf aus festen Gründen aussortieren: Branchenmotiv, Pose, Haltung gegen die Regel, Adresse oder Kundenobjekt erkennbar, Doppelung, Licht gegen die Regel.

**Durchgang 2, Auswahl.** Der Art Director setzt Auswahl oder Reserve, Rolle, Einstellung und Blickziel, und justiert den gerechneten Zuschnitt. Rollen: `portraet` (Asset Nummer eins), `gesicht`, `ort`, `detail`, `objekt` (eigenes Objekt aus dem Bestand-Import), `profil`, `website`.

**Rechte je Datei.** `rechte` führt den Urheber mit Nutzung und je abgebildeter Person einen Eintrag `{wer: makler, team, passant oder dritte, status: einwilligung, nicht erkennbar oder offen, nachweis}`. Sperre: Eine Datei mit einem einzigen Eintrag `offen` kann Kandidat sein, nie Auswahl. Die Rückenfigur aus dem Team braucht eine Einwilligung wie jeder andere Abgebildete; Passanten sind nur zulässig, wenn sie nicht erkennbar sind. Den Urheber hat Schritt 1 schon erfragt (F4, `vorab.material[].rechte`, Frist Workshop-Tag); Schritt 11 übernimmt die Antwort und fragt nicht neu. Dieses Dokument ist keine Rechtsberatung.

**Verwendbares Gesichtsbild.** Zählt, wenn alles zutrifft: Auswahl in Durchgang 2, genau ein Gesicht, Qualitätswert mindestens 70 ("Gut" in `hmScoreText`, Setzung), Rechte aller Abgebildeten geklärt, `ki` falsch, Ausschnitt für Post und Reel-Titelbild machbar (bei der Achse `ausschnitt` für beide Entwürfe), keine Regel aus `bild.vermeiden` verletzt. Je Situation zählen höchstens drei (Setzung gegen die Passbildwand, R6 Regel R3). Die Zählung liefert immer zwei Zahlen: `sicher` (alles geprüft) und `moeglich` (Rechte offen oder noch nicht gesichtet). Dieselbe Funktion `hmBildGesichterZaehlen` rechnet die Prognose in Schritt 1 und die Lage für Schritt 13; die Zahlen unterscheiden sich nur, weil zu verschiedenen Zeitpunkten verschiedenes Material erfasst ist (3.12 e).

### 3.6 Asset Nummer eins (`bild.portraet`)

Das Porträt ist das Asset mit dem höchsten Potenzial für Wiedererkennung: Gesichter werden in 100 Millisekunden auf Vertrauenswürdigkeit gelesen (Willis und Todorov, https://doi.org/10.1111/j.1467-9280.2006.01750.x), und ein Gesicht gehört nur einer Person (Ableitung R7 2.4).

**Blickrichtung: in die Kamera.** Für Asset Nummer eins und das Profilbild ist der Blick in die Kamera Pflicht. Grund: Diese zwei Bilder sieht jemand, der den Namen empfohlen bekommen hat, zuerst (`13_feed.md` Kapitel 1). Das schnelle Urteil nach Willis und Todorov fällt am Gesicht; ein Bild, auf dem er wegschaut, lässt dieses erste Urteil über jemanden fällen, der sich nicht zuwendet (Ableitung; dass direkter Blick das Urteil bei Maklern verbessert, ist nicht belegt). Es folgt zugleich dem Porträtstil aus Schritt 9 ("frontal") und der Grammatik Weite ("Porträt frontal, ruhiger Blick in die Kamera", `wb-markenwelten.jsx` Zeile 23). Der Blick zum Gegenüber oder auf die Unterlage bleibt Feedbildern vorbehalten.

Festgelegt werden `datei` oder Lücke mit Grund, `zuschnitt` je Format (Profil als einzige Quelle für den Kreis, Post, Reel und Story, Website-Kopf, Karte, Signatur, Exposé A4; `null` für Formate ohne Porträtfeld) und `festePosition` innerhalb der Anwendung (etwa Website-Kopf rechts, Exposé letzte Seite). Plätze im Raster bestimmen die Schritte 12 und 13. Das Team bestimmt Asset Nummer eins; die Werkbank schlägt es nur unter Einträgen mit Rolle `portraet` vor.

### 3.7 Porträt-Termin (`bild.portraetTermin`)

`noetig` ist wahr, wenn `sicher` plus die Zahl der Bilder, die nach Klärung sicher verwendbar werden, unter acht liegt; praktisch: wenn `moeglich` unter acht liegt, oder wenn `sicher` unter acht liegt und die offenen Rechte nicht bis zum Termin geklärt sein können (Setzung aus der Zerlegung). `grund` nennt die Zählung in einem Satz ohne Urteil über das Aussehen des Maklers.

**Eine Stelle für den Termin.** Datum, Uhrzeit und Ort stehen nur in `auftrag.termine.portraet` (Schritt 1). `bild.portraetTermin` führt `terminRef: "auftrag.termine.portraet"` und setzt dort den Status auf "bestätigt" oder "entfällt". Die Uhrzeit innerhalb des Tages schlägt dieser Schritt aus dem Licht vor (3.9), gespeichert wird sie in `auftrag.termine.portraet.uhrzeit`.

Der Termin ist so geplant, dass er allein acht verwendbare Gesichtsbilder liefern kann: drei Situationen mit je drei Bildern, darunter Asset Nummer eins. Dauer 75 Minuten vor Ort (Setzung). Er liefert Standbilder und höchstens drei B-Roll-Clips; die Reels entstehen am Drehtag nach der Freigabe (`rollout.drehtag`, Schritt 16).

**Messung.** Schritt 4 misst im Probedreh, wie er vor der Kamera wirkt (`workshop.probedreh.komfort.beobachtetGespraech` für Take A), und fragt, ob der Wert am ersten Termin vor der Kamera hält (`04_workshop.md` 3.4). Dieses Feld liegt hier: `bild.portraetTermin.messung = {takeA: aus workshop.probedreh, amTermin: 1 bis 7 vom Team nach derselben Skala, differenz}`. Weichen die Werte bei mehreren Maklern um mehr als zwei Stufen ab, prüft Schritt 4 die Lage des Probedrehs (Setzung).

### 3.8 Lücken je Feed-Platz (`bild.luecken[]`)

`start30` entsteht erst in Schritt 13. Darum rechnet `hmBildLuecken` hier vorläufig gegen den Startwert aus Schritt 12 (zwölf Plätze, mindestens acht mit Gesicht, 5 Reels, 4 Karussells, 3 Einzelbilder, Setzung) und in Schritt 13 endgültig gegen `feed.kacheln`. Eine Rechnung, keine zweite Quelle. Jede Lücke nennt `{platz, format, gesicht, motivklasse, grund, schliesstDurch}`; `schliesstDurch` ist Porträt-Termin, Drehtag, eigenes Objektfoto oder Klärung von Rechten.

### 3.9 Fotobrief und die Seite für den Makler

Eine Datenquelle, zwei Sichten.

**Sicht Fotograf** (eine druckbare Doppelseite, im Markenbuch unter der Rolle Fotograf): Zweck, Bildidee in einem Satz, Pflicht- und Kann-Motive mit Ort, Kante, Einstellung, Blickziel und Format; Licht mit Lichtseite und Tageszeit; **je Ort** Zugang, Ausrichtung, Sonnenstand zur geplanten Uhrzeit, Kamerarichtung für die Lichtseite und Regenvariante; Garderobe; verbotene Requisiten; Formate und Crops in Pixeln (bei gleicher Achse eine Tabelle für beide Entwürfe); Anzahl; Clips je Formattyp; Referenzen als Merkmal und "nicht"; Ablauf mit Minuten; der Satz zum Horizont aus 3.1. Dazu ein **Sucherrahmen** als SVG mit Fenster, Kante, Horizont und Achse, zum Einblenden am Laptop oder als Vorlage auf dem Telefon.

**Sonnenstand je Ort.** Der Regelpfad rechnet Azimut und Höhe der Sonne für Ort und Uhrzeit nach den NOAA-Formeln (https://gml.noaa.gov/grad/solcalc/) und daraus die Kamerarichtung: Soll das Licht von links im Bild kommen, blickt die Kamera 90 Grad im Uhrzeigersinn vom Sonnenazimut weg, bei Licht von rechts 90 Grad gegen den Uhrzeigersinn. Die Wand hinter der Person steht dann quer zur Sonne und bekommt Streiflicht. Bei bedecktem Himmel gilt die hellste Himmelsseite als Lichtquelle, auf der Gegenseite schattet eine schwarze Fläche ab, damit die Lichtseite auch ohne Sonne stimmt (Handwerk). Die Ausrichtung eines Ortes bestimmt das Team bei der Begehung oder an der Karte; fehlt sie, ist sie Lücke.

**Regenvariante je Ort.** Jeder Außenort hat eine Ersatzsituation innen aus `workshop.ort.orte` oder `workshop.ort.material`, mit anderem Platz, anderem Licht und anderem Oberteil, damit die Situation weiter zählt. Das Außenmotiv wandert in den Drehtag. So sinkt die Zählung bei Regen nicht unter acht.

**Referenzen ohne fremde Bilder.** Zuerst aus dem eigenen Kontaktbogen ("wie K7, nur die Kante tiefer"), sonst als reines Merkmal in Worten. Fremde Bilder liegen nie im Repo, Links nur in der geschützten Instanz (R2 offene Frage 6).

**Sicht Makler** (eine Seite, Telefon zuerst, in seiner Anrede): wann, wo mit Treffpunkt, was er anzieht und mitbringt, wie das Licht sein wird, was bei Regen passiert, wie lange, welche drei Fragen wir stellen, was er nicht tun muss, was danach passiert. Keine Maße, keine Fachwörter. Für den Porträt-Termin erzeugt sie dieser Schritt, für den Drehtag Schritt 16 aus demselben Fotobrief mit den Sätzen aus `feed.kacheln[].skript`.

**Sätze statt Anweisungen.** Vor der Kamera entstehen echte Ausdrücke, wenn jemand erzählt. Glennda Baker arbeitet im Interviewformat mit einer Person hinter der Kamera (https://www.nar.realtor/magazine/real-estate-news/technology/how-this-agent-is-making-six-figures-on-tiktok, Selbstauskunft). Darum bekommt er drei Gesprächsfragen zu Belegen und Geschichten aus `workshop.geschichte` (`abgeraten`, `belege`, `fehler`, `wendepunkt`), nie eine Frage, die zum Eigenlob einlädt. Fotografiert wird, während er antwortet.

**Garderobe.** Aus dem, was das Team im Workshop gesehen und im Probedreh gefilmt hat (`workshop.probedreh`, `workshop.ort`), in Worten: "wie im Workshop am [Datum]". Nur wenn der Workshop per Video lief und kein Bild ihn in Arbeitskleidung zeigt, kommt F4.

**Clips je Formattyp.** Der Fotobrief liefert den Clip-Bedarf je Formattyp mit Bildaufbau; Schritt 16 bindet ihn in `hmDrehtagClips` an jedes Reel, mit den Sätzen aus `feed.kacheln[].skript` (`16_freigabe.md`, Clip-Liste).

### 3.10 Bildwelt-Auftrag (`bild.bildweltAuftrag`)

`wb-bildwelt/1` (`wb-bildwelt.jsx`) liest künftig `bild.regeln` und trägt `zweck: "stimmung-team"`. Einziger Zweck: Der Art Director prüft vor dem Termin, ob Kante, Horizont, Licht und Tonkurve an menschenleeren Motiven tragen. Motive mit Menschen filtert `HM_BW_OHNE` schon heute. Neu ist die harte Sperre: Einträge mit `ki: true` können nicht in `bild.kontaktbogen`, `bild.portraet` oder `feed.kacheln`. Sie erscheinen weder im Markenbuch noch beim Makler noch im Fotobrief. Kein Porträt geht an ein Bildmodell, auch nicht als Vorlage. Standard ist kein Auftrag.

### 3.11 Wer macht was

| Rolle | Tut | Erzeugt |
|---|---|---|
| Makler | nichts am Kontaktbogen; bestätigt höchstens den vorgemerkten Termin; kommt zum Termin | Status von `auftrag.termine.portraet` |
| Team (Art Director) | setzt `horizontY` und `punktX` mit Grund, bestätigt Durchgang 1 und Situationen, macht Durchgang 2, justiert Crops, bestimmt Asset Nummer eins, macht die Ortsbegehung mit Ausrichtung, prüft den Fotobrief, führt den Termin, setzt `messung.amTermin` | `ausschnitt` (Team-Werte), `durchgang1`, `durchgang2`, `crop`, `orte[].ausrichtung`, Freigabe |
| Regeln | übernehmen `kanteY`, leiten Maße aus Eingängen ab, rechnen Crops, Machbarkeit, Sonnenstand, Zählung, Lücken, Zwölferprobe, Bildabdruck; bauen den Bildwelt-Auftrag | `bild.regeln`, Vorschläge für `crop`, `portraetTermin`, `luecken`, Maße im `fotobrief` |
| Claude | schreibt Sätze in festen Feldern mit Platzhaltern für alle Zahlen, formuliert die drei Gesprächsfragen aus Belegen, schreibt `warum`. Sieht keine Bilder, setzt keine Maße | Textfelder im `fotobrief` |

### 3.12 Beispiel: Markus Leitner, Döbling, Zinshaus, Kenner, Sie

**Basis der Rechnung.** `basis.idee`: Beispiel in `09_idee.md` 3.11, Stand 29.09.2026, nicht abgenommen (Zeichen "Das Zeitmaß", Grammatik Weite, Gegenentwurf V9 auf der Achse `tonwert`). `basis.system`: Zeichenlage nach Schritt 9 "an der Unterkante der sicheren Fläche, bündig am linken Rand", Rand der Grammatik Weite 0,11 der Breite (`wb-markenwelten.jsx`, `raster.rand` der Welt `ruhig`), Reel-Zone aus `10_system.md` Tabelle Formate. Das Beispiel in `10_system.md` 3.6 rechnet noch mit einer Annahme vor Schritt 9 (Zeichen "Der Zeitpunkt", Feuilleton, Achse Satz). Dieser Schritt folgt Schritt 9, wie Schritt 12 auch, und meldet die Abweichung in 5.5. Für den Ausschnitt ist sie folgenlos: Weder die Achse `tonwert` noch die Achse Satz mit identischer Porträtregel (`10_system.md` 10.9) ändert den Crop. Alle Zahlen unten tragen `basis: {idee: "09 Beispiel 29.09.", system: "Weite 0,11"}` und werden neu gerechnet, sobald Schritt 10 abzeichnet.

**a) Bildregeln**

| Regel | Wert für Markus | Herkunft | Quelle |
|---|---|---|---|
| Licht | Vormittag, seitliches Tageslicht von der Fensterseite seines Büros. Welche Seite das im Bild ist: Lücke, weil `workshop.ort` im Seed fehlt; die zweite Person trägt es nach dem Workshop ein. Nie Abendstimmung, nie Blitz direkt | eingang | `brief.einschraenkungen` E3 ("Vormittagslicht"), `workshop.ort.licht` (Lücke), Seed `cue` "Dienstag nach dem Grundbuch-Termin, 11 Uhr" |
| Abstand | Führend: er sitzt. Nah am Tisch (Kopf rund 40 Prozent der Fensterhöhe), halbnah am Fenster (rund 20 Prozent), weit auf einer Stufe im Freien (Person höchstens ein Viertel der Höhe). Anteil nah eher gering, weil der Kamera-Komfort im Seed 3 von 7 ist | eingang, Kopfanteile Setzung | `idee.codes` Porträtstil "Er sitzt, frontal", `09_idee.md` E4; Seed `kamera` 3 (im Betrieb `workshop.probedreh`) |
| Haltung | Er erklärt, hört zu oder liest eine Unterlage, Hände auf dem Tisch oder mit Unterlage. Nie verschränkte Arme, nie Hände in den Taschen, nie Lächeln auf Kommando, nie stehend im Porträt | eingang | `09_idee.md` E4, Workshop-Mitschrift 11.09. "Dass sie sich nie gedrängt gefühlt haben" (Seed `meetings` mt1) |
| Ausschnitt | Kante auf dem Zeitmaß, Horizont 0,38, Achse 0,62 (Rechnung unten). Blickziele Kamera (Pflicht bei Asset Nummer eins und Profil), Gegenüber (Blick in den größeren Raum links), Unterlage | kanteY eingang, Rest team | `system.zeichen.platz` nach Schritt 9, Begründung unten |
| Reihung | Nie dieselbe Einstellung in Folge, nie dieselbe Kombination aus Einstellung und Blickziel im Abstand eins oder drei; Lichtseite in allen Bildern gleich | handwerk plus eingang | 3.3, Zwölferprobe unten |
| Farbbehandlung | Empfehlung (Papier): Lichter nie heller als `system.farbe.grund`, Tiefen auf `system.farbe.text`, Weißabgleich so, dass eine weiße Wand auf dem Papierton liegt. Gegenentwurf (dunkel): dieselbe Aufnahme, Tiefen auf den dunklen `grund`, Lichter gedämpft. Amber erscheint nie im Bild, auch nicht als Mappe | eingang | `system.farbe` beider Entwürfe, `idee.gezeigt.achse` tonwert, Seed n2 "Der Amber-Ton darf etwas zurückhaltender sein." |

**Warum Horizont 0,38 und Achse 0,62 (Team, mit Grund).** Die Kante liegt unten (0,912 im Post). Mit dem Horizont bei 0,38 bleibt zwischen Augen und Kante gut die Hälfte der Höhe für Hände und Unterlage, und über dem Kopf genug Grund, wie ihn die Weite verlangt ("viel Wand und Boden rundherum"). Die Achse steht rechts der Mitte, weil das Zeitmaß links beginnt und nach rechts wächst: Eine Spanne von 11 Wochen endet vor ihm (knapp die Hälfte der nutzbaren Breite laut Schritt 9, also bei rund x 523), eine von zwei Jahren läuft unter ihm hindurch (gut sechs Siebtel, rund x 851). Wer den Feed durchsieht, liest an seiner Position, ob ein Fall schnell oder geduldig war. Das ist die Schärfung aus Gate 1, "Warten klingt nie wie Zögern", ins Bild übersetzt (Ableitung aus `09_idee.md` 3.11).

**b) Motive**

| Art | Motiv | Ort | Kante, Einstellung, Blickziel | Rolle |
|---|---|---|---|---|
| Pflicht | Asset Nummer eins: sitzt am Fenster, frontal, Unterlage auf der Fensterbank | Büro, 1190 (Adresse liegt im Auftrag, nicht im Dokument) | Fensterbank, halbnah, Kamera | portraet |
| Pflicht | Am Besprechungstisch, das Dokument vor ihm | Büro | Tischkante, nah, Kamera und Unterlage | gesicht, Karussell-Titel (Serie mit Variable `dokument`, `12_social.md`) |
| Pflicht | Im Gespräch, Rückenfigur aus dem Team links angeschnitten, nie ein echter Kunde | Büro | Tischkante, halbnah, Gegenüber | gesicht |
| Pflicht | Hände mit geschwärztem Dokument, kein Name lesbar | Büro | Tischkante, Detail | detail |
| Pflicht | Sitzt auf einer Stufe vor einem Eingang in Sievering | öffentlicher Raum, nur vor einem Haus, das in keinem Objekt seines Bestand-Imports steht, auch nicht unter den verkauften; Ort: Lücke bis zur Begehung | Stufe oder Sockel, weit, Kamera oder Gegenüber | gesicht, ort |
| Pflicht | Eingang oder Sockel im Streiflicht, ohne Person, ohne Hausnummer | wie oben | Sockel, weit | ort |
| Kann | Stiegenhaus eines eigenen aktiven Objekts | nur nach F1; im Seed gibt es keine aktiven Objekte, also entfällt das Motiv | Stufe, halbnah | gesicht |

**Geprüft und verworfen: das Gehen in der Sieveringer Straße.** Die zweite Fassung plante dort ein Pflichtmotiv. Laut Seed liegt das verkaufte Zinshaus eines Kunden in der Sieveringer Straße ("Zinshaus Sieveringer Straße, 1902", `wb-store.jsx` Zeile 72), und ob 1902 Baujahr oder Hausnummer ist, ist offen (MARKENQUALITAET 5.7). Diskretion war ein Wahlgrund seiner Kunden (Seed `gruende`). Nach der neuen Regel in c) ist die Straße als Ort gesperrt, bis ein Abschnitt ohne Bezug zum verkauften Haus bestimmt ist. Nicht im Motivplan: Grinzing und das Elternhaus (Grenze "Familie zeigen", Territorium Herkunft nicht gewählt), der Ruderverein (Familie und Verein: Lücke).

**c) Vermeiden**

Handschlag, Schlüssel und Schlüsselübergabe, Daumen hoch, verschränkte Arme, Hände in den Taschen, Verkauft-Schilder und Just-Sold-Banner. Uhren, Sanduhren und Kalender als Zeichen für Zeit, weil die Idee im Ausschnitt steckt und ein Symbol sie zur Ersetzungsmetapher machte (R2 1.5 und Kapitel 4; `10_system.md` 10.4 `nie[]`). **Erkennbare Außenansichten eigener Kundenobjekte**, verkauft oder in Vermarktung, ohne schriftliche Einwilligung der Eigentümer: Die Werkbank gleicht jeden Ort im Fotobrief mit den Adressen im Bestand-Import und in `vorab.letzteAbschluesse` ab, der Art Director bestätigt. Hausnummern, Türschilder, Klingelbretter, lesbare Namen in Unterlagen. Familie im Bild, auch im Hintergrund. Plakate und Parteisymbole (Grenze Politik). Statussymbole, Weitwinkel-Innenräume mit HDR, Wien als Postkarte, stehende Porträts.

**d) Kontaktbogen aus dem Seed, mit gerechnetem Befund**

| Datei | Quelle | Situation | Befund |
|---|---|---|---|
| K1 bis K15 | "Portraits Drehtag 11.09. (15 Stück)", Büro 1190 (`wb-more.jsx` assets a1) | S1, **Annahme**: eine Situation. Belegt sind nur Datum und Ort; ob Oberteil und Licht wechseln, zeigt erst die Sichtung | ungesichtet, Rechte offen. Höchstens drei zählen, wenn S1 eine Situation ist |
| K16 | Studioporträt 18.09.2026, freigestellt mit Alphakanal, 1115 x 1487 px, Qualitätswert 94 (`wb-foto.jsx` `HM_PORTRAIT_SEED`) | S2 Studio | gerechnet, siehe unten: für Post und Reel nicht machbar, für das Profil machbar |
| V1 | "Rohmaterial Drehtag 11.09." (assets a2) | S1 | Auflösung Lücke |
| Objektfotos | keine (`branding.markus.material` leer) | | Lücke |

**Gerechnet an K16 (Befund, 30.09.2026).** Die Werte stammen aus dem Bild selbst in der Werkbank-Umgebung; das Bild wird nicht kopiert und keine Ableitung davon ins Repo gelegt. Scheitel: erste deckende Zeile im Alphakanal bei y 144 (gemessen). Augenlinie y 355, Nasenspitze x 562 und y 400, Kinn y 565: abgelesen am Pixelraster, Genauigkeit rund plus minus 10 px, bis `/maklerzuschnitt` die Landmarken zurückgibt. Kopfhöhe 421 px, also 28 Prozent der Bildhöhe; Nasenachse bei 0,50 der Breite; Augen bei 0,239 der Höhe.

1. **Die Guideline-Annahme der zweiten Fassung war falsch.** Dort stand, K16 liege im Standard-Zuschnitt (Augen 0,214, Nase 0,40, Kopf 37,5 Prozent). Gemessen liegt es anders: Augen 0,239, Nase 0,50, Kopf 28 Prozent. Die Rechnung darf also nie die Guideline-Konstanten für ein Seed-Bild einsetzen, nur gemessene Landmarken.
2. **Rückfallformel bestätigt.** Scheitel geschätzt als 355 minus (565 minus 355) = 145, gemessen 144.
3. **Post, halbnah, Empfehlung und Gegenentwurf.** Kopf soll 270 px sein (20 Prozent von 1350), Maßstab also 270 durch 421 = 0,641. Der Horizont bei y 513 verlangt 513 durch 0,641 = 800 px Bild über den Augen; K16 hat 355. Es fehlen 445 px oben, dazu Breite (1080 durch 0,641 = 1685 px gebraucht, 1115 vorhanden). Nicht machbar.
4. **Post in jeder Einstellung.** Ohne Hochrechnen (Maßstab höchstens 1,05) und ohne Bildkante im Fenster müsste der Maßstab mindestens 513 durch 355 = 1,45 sein. Das schließt sich aus: Mit dem Horizont bei 0,38 ist K16 für keinen Post machbar. Die Augen liegen im Original zu nah am oberen Rand.
5. **Reel-Titelbild.** Horizont 547 px unter der Kachelmitte-Oberkante, also Maßstab mindestens 547 durch 355 = 1,54. Nicht machbar.
6. **Kante.** Das Bild ist freigestellt, es gibt keine Kante für das Zeitmaß. Dazu steht er, und die Hände sind in den Taschen: zwei Verstöße gegen `haltung`. Auch mit anderem Original bliebe dieses Motiv für Gesichtskacheln raus.
7. **Profil.** Kopf 65 Prozent des Durchmessers verlangt ein Quadrat von 421 durch 0,65 = 648 px, zentriert auf die Kopfmitte y 354,5 und die Nasenachse x 562: von x 238 bis 886 und y 31 bis 679, ganz im Bild. Faktor gegen 330 px: 0,51, bestanden. Blick in die Kamera: ja. **Machbar.** K16 wird Rolle `profil`, bis Asset Nummer eins aus dem Termin da ist; dann wechselt das Profil auf dessen Original, damit Profil und Asset Nummer eins dieselbe Aufnahme sind.

Befund im Seed: Die Werkbank führt 15 Porträts vom 11.09. als freigegebenes Asset, im Porträt-Speicher liegt nur K16, und `vorab.material` in Schritt 1 kennt nur K16. Beim Umbau zusammenführen (Hinweis an Schritt 1 in 5.5).

**e) Zählung und Porträt-Termin**

| Datei | sicher | moeglich | Grund |
|---|---|---|---|
| K1 bis K15 | 0 | 3 | Annahme eine Situation, ungesichtet, Rechte offen |
| K16 | 0 | 0 | Ausschnitt für Post und Reel nicht machbar (d, Punkte 3 bis 6) |
| Summe | 0 | 3 | gebraucht 8 |

Abgleich mit den Nachbarn: Schritt 1 rechnet `moeglich` 1, weil `vorab.material` dort nur K16 kennt und Durchgang 2 und Ausschnitt noch nicht geprüft sind (`01_auftakt.md` 3.3, "Die Prognose ist deshalb eine Obergrenze"). Schritt 13 schreibt "kein verwendbares Material erfasst", also `sicher` 0. Alle drei Werte kommen aus derselben Funktion zu verschiedenen Zeitpunkten und widersprechen sich nicht. Sind K1 bis K15 mehrere Situationen, steigt `moeglich` auf höchstens sechs oder neun; der Termin bleibt nötig, solange weniger als acht sicher werden.

```
bild.portraetTermin = {
  noetig: true,
  grund: "Aus dem Bestand kommen höchstens drei verwendbare Gesichtsbilder, alle mit offenen Rechten. Für den Feed brauchen wir acht.",
  zaehlung: { sicher: 0, moeglich: 3, situationen: 1, gebraucht: 8, annahmen: ["K1 bis K15 sind eine Situation"] },
  terminRef: "auftrag.termine.portraet", setztStatus: "bestätigt",
  basis: { idee: "09 Beispiel 29.09.", system: "Weite 0,11" },
  messung: { takeA: null, amTermin: null, differenz: null }
}
```

`auftrag.termine.portraet` steht bei Markus auf Do 29.10.2026, vorgemerkt (`01_auftakt.md` Beispiel). Donnerstagvormittag ist im Seed frei (`verfuegbar`). Vorschlag für die Uhrzeit: 9:00 bis 10:15.

**f) Lücken, vorläufig gegen den Startwert**

| Platz | Format | Gesicht | Motivklasse | Schließt durch |
|---|---|---|---|---|
| 1 bis 3 | gemischt | ja | gesicht | Bestand S1, vorbehaltlich Sichtung und Rechte |
| 4 bis 8 | gemischt, darunter Reel-Titelbilder | ja | gesicht | Porträt-Termin |
| 9 | Einzelbild | nein | objekt | eigenes Objekt aus dem Bestand-Import mit Einwilligung "Objektfotos zeigen"; bis dahin Lückenkachel in Schritt 13 |
| 10 | Karussell-Titel | nein | ort | Porträt-Termin, Eingang in Sievering |
| 11, 12 | Karussell oder Einzelbild | nein | typografisch | kein Foto nötig |

**g) Formate und Crops**

Basis wie oben. Da die Achse `tonwert` ist, gilt eine Spalte für beide Entwürfe; der Gegenentwurf unterscheidet sich nur in der Tonkurve.

| Format | Kante (sichtbares Zeitmaß) | Horizont (Augen) | Achse (Nase) | Einstellung am Beispiel |
|---|---|---|---|---|
| Post 1080 x 1350 | y 1231, Zeitmaß ab x 119 | y 513 | x 662 | halbnah: Kopf rund 270 px |
| Reel-Titelbild und Story 1080 x 1920 | y 1248 (Unterkante der Zone), Zeitmaß ab x 65 plus Rand | y 787 | x 670 | eine Stufe näher, weil die Kante höher liegt; Titel über dem Zeitmaß innerhalb x 65 bis 1015 |
| Profil und Signatur, Kreis | keine | keine | mittig | Kopf 60 bis 70 Prozent des Durchmessers |
| Website-Kopf, Karte, Exposé A4 | aus `system.zeichen.platz` des Formats | 0,38 | 0,62 | nach derselben Rechnung, sobald Schritt 10 die Plätze setzt |

Rechnung Post: Kante 1350 minus 0,11 x 1080 = 1231,2 (Anteil 0,912); Horizont 0,38 x 1350 = 513; Achse 33,75 plus 0,62 x 1012,5 = 661,5. Reel: Horizont 240 plus 0,38 x 1440 = 787,2 (derselbe Wert, den `12_social.md` im Bildaufbau der Serie nutzt); Achse 0,62 x 1080 = 669,6; Kante im Raster (1248 minus 240) durch 1440 = 0,70.

**h) Zwölferprobe auf Eintönigkeit (Datensatz, noch kein Render)**

Folge, Formate und Gesichtsplätze aus dem Beispiel in `13_feed.md` 3.7 (Reels 1, 5, 8, 11; Karussells 2, 4, 6, 9, 12; Einzelbilder 3, 7, 10; Gesicht auf 1, 3, 5, 6, 8, 9, 11, 12). Kontrollierte Variablen: Einstellung und Blickziel. Konstant: Kante, Horizont, Achse, Lichtseite.

| Nr. | Format | Kante | Einstellung | Blickziel |
|---|---|---|---|---|
| 1 | Reel | Tischkante | nah | Kamera |
| 2 | Karussell | textgeführt | | |
| 3 | Einzelbild | Fensterbank | halbnah | Kamera |
| 4 | Karussell | textgeführt | | |
| 5 | Reel | Stufe | weit | Gegenüber |
| 6 | Karussell | Tischkante | halbnah | Unterlage |
| 7 | Einzelbild | Sockel, ohne Person | weit | |
| 8 | Reel | Fensterbank | halbnah | Kamera |
| 9 | Karussell | Tischkante | nah | Gegenüber |
| 10 | Einzelbild | textgeführt | | |
| 11 | Reel | Tischkante | nah | Kamera |
| 12 | Karussell | Fensterbank | halbnah | Unterlage |

Ergebnis: Keine gleiche Kombination im Abstand eins oder drei (geprüft: 5 zu 8, 6 zu 9, 8 zu 11, 9 zu 12, 3 zu 6 verschieden). Keine gleiche Einstellung in direkter Folge. Drei Einstellungen (nah 3, halbnah 4, weit 1 mit Person) und drei Blickziele (Kamera 4, Gegenüber 2, Unterlage 2). Die erste Fassung der Probe hatte 8 und 9 beide halbnah und 11 und 12 beide nah; die Regel hat das gefunden, darum stehen 9 und 12 anders. **Restrisiko:** Die Nasenachse steht in allen acht Gesichtskacheln bei 0,62. Ob das im Raster als Ordnung oder als Passbildwand wirkt, zeigt erst der Render mit echten Bildern; P16 wiederholt die Probe am Render nach dem Termin, und der Art Director darf die Achse in weiten Einstellungen innerhalb der Toleranz nutzen, nie darüber hinaus.

**i) Die Seite für Markus (Sicht Makler, Sie-Form)**

> **Ihr Porträt-Termin**
>
> **Wann.** Donnerstag, 29. Oktober, 9:00 bis 10:15 Uhr.
>
> **Wo.** In Ihrem Büro in Döbling. Danach gehen wir wenige Minuten zu einem Eingang in Sievering, den wir vorher ausgesucht haben.
>
> **Licht.** Wir beginnen am Fenster, weil dort am Vormittag das Licht von der Seite kommt. Draußen steht die Sonne um diese Zeit im Südosten, flach und weich.
>
> **Wenn es regnet.** Dann bleiben wir im Büro und fotografieren an einem zweiten Platz. Den Weg nach draußen holen wir am Drehtag nach. Für Sie ändert sich nichts.
>
> **Was Sie anziehen.** Was Sie im Workshop am 11. September getragen haben, und ein zweites Oberteil zum Wechseln. Matte Stoffe, ohne feine Streifen oder kleine Karos, ohne sichtbare Logos. Die Brille wie im Alltag.
>
> **Wie lange.** 75 Minuten. Danach haben Sie nichts mehr zu tun.
>
> **Was Sie sagen.** Nichts Auswendiges. Wir stellen Ihnen drei Fragen und fotografieren, während Sie antworten.
> 1. Wie war das mit der Erbengemeinschaft, der Sie zum Warten geraten haben?
> 2. Wie lief der Verkauf des Zinshauses in Sievering in elf Wochen?
> 3. Wie kam die Anlegerwohnung in Währing auf 8 Prozent über der ersten Schätzung?
>
> **Was Sie nicht tun müssen.** Posieren, auf Kommando lächeln, stehen. Sie sitzen fast die ganze Zeit. Wir sagen Ihnen, wohin Sie schauen.
>
> **Was danach passiert.** Am Ende zeigen wir Ihnen drei unbearbeitete Aufnahmen auf dem Display, damit Sie wissen, woran Sie sind. Ausgewählt, zugeschnitten und in Ihrem Feed sehen Sie die Bilder im Reveal am [Datum aus `auftrag.termine.reveal`].

Herkunft: Frage 1 aus `workshop.geschichte.abgeraten` (Seed `abgeraten`), Frage 2 und 3 aus `workshop.geschichte.belege` (Seed `belege`: "Zinshaus Sievering, 4,2 Mio., 11 Wochen. Anlegerwohnung Währing, 8 Prozent über Erstschätzung."). Die Belege tragen den Prüfstatus Selbstauskunft; im Gespräch ist das unkritisch, in Clips gilt die Sperre aus Schritt 16 für nicht geprüfte Zahlen. Sonnenstand: 29.10.2026, Wien 48,25 Grad Nord, 16,33 Grad Ost, um 9:50 Uhr MEZ Azimut rund 151 Grad, Höhe rund 24 Grad (gerechnet nach den NOAA-Formeln, Genauigkeit rund ein Grad). Der Blick auf drei Aufnahmen ist keine Auswahl; er nimmt Nervosität, ohne eine Entscheidung zu verlangen (Ableitung).

**j) Ablauf für den Fotografen (Auszug)**

| Minute | Situation | Motiv | Liefern |
|---|---|---|---|
| 0 bis 10 | Ankommen | Kamera auf seine Sitz-Augenhöhe messen, Sucherrahmen einblenden, Lichtseite am Fenster prüfen, Gespräch ohne Kamera | |
| 10 bis 35 | S3 Fenster | Asset Nummer eins, Fensterbank auf der Kante, halbnah, Blick Kamera; Frage 1 | 1 Asset Nummer eins, 3 Gesicht, 1 Detail |
| 35 bis 40 | Umziehen | zweites Oberteil | |
| 40 bis 55 | S4 Tisch | Tischkante auf der Kante, nah, Kamera und Unterlage; Rückenfigur links, Gegenüber; Frage 2 | 3 Gesicht, 1 Detail |
| 55 bis 72 | S5 Eingang in Sievering, 9:50 bis 10:07 | Stufe oder Sockel auf der Kante, weit, sitzend; Kamerarichtung 90 Grad zum Sonnenazimut, Seite nach `licht`; Eingang ohne Person; Frage 3 | 3 Gesicht, 2 Ort, bis 3 B-Roll-Clips à 10 Sekunden |
| Regen | S5 innen | zweiter Platz im Büro aus `workshop.ort.orte` (Lücke), anderes Licht | 3 Gesicht |
| 72 bis 75 | Abschluss | drei Aufnahmen zeigen, Dank, `messung.amTermin` notieren | |

Anzahl final: 14 Bilder, davon 10 mit Gesicht aus drei Situationen. Jede Aufnahme so weit, dass Post und Reel-Titelbild aus demselben Original entstehen.

**k) Bildwelt-Auftrag (optional, nur Team)**

```
{ "schema": "wb-bildwelt/1", "zweck": "stimmung-team", "makler": { "id": "markus" },
  "modell": "gpt_image_2_5", "varianten": 1, "bilder": 4, "credits_schaetzung": 1,
  "motive": [
    { "id": "m1", "titel": "Leerer Besprechungstisch, Tischkante bei 91 Prozent der Höhe, seitliches Vormittagslicht", "format": "4:5" },
    { "id": "m2", "titel": "Fensterbank mit Blick in einen Hof, Kante unten, Horizont bei 38 Prozent", "format": "4:5" },
    { "id": "m3", "titel": "Stufe vor einem Eingang ohne Hausnummer, Streiflicht", "format": "4:5" },
    { "id": "m4", "titel": "Tischkante mit geschlossener Mappe, Kante bei 70 Prozent der Kachelmitte", "format": "9:16" } ] }
```

Credits aus dem bestehenden Satz von 0,25 je Bild (`HM_BW_MODELLE`). Kein Bild davon verlässt das Team.

---

## 4. Fragen an den Makler

Nur Fragen, deren Antwort ein Feld dieses Schritts nachweisbar ändert, und keine, die ein anderer Schritt schon stellt.

| Nr. | Frage (Sie-Form) | Bedingung | Wirkt auf | Warum |
|---|---|---|---|---|
| F1 | "Wir würden Sie gern im Stiegenhaus von [Objekt aus Ihrem Bestand] fotografieren, ohne Hausnummer und ohne Wohnungstüren. Ist das mit den Eigentümern abgedeckt?" Ja oder Nein | Nur wenn `workshop.ort.orte` oder ein eigenes **aktives** Objekt im Bestand-Import einen Innenort vorschlägt, zu dem Objektfotos mit Einwilligung der Eigentümer schon vorliegen. Nie ein verkauftes Objekt | Ja: das Motiv wird Pflicht, `fotobrief.orte[].zugang` "geklaert". Nein: Motiv entfällt | Die Abdeckung durch die Eigentümer kennt nur er. Er bestätigt einen Vorschlag, statt ein Haus zu suchen |
| F3 | "Ihr Porträt-Termin ist am [Datum], [Uhrzeit], wie im Plan vorgemerkt. Bleibt es dabei?" Ja, oder ein anderer Tag, dann zwei Vorschläge mit markierter Empfehlung | Nur wenn `portraetTermin.noetig` | Status von `auftrag.termine.portraet`, `fotobrief.lichtUndTageszeit`, Sonnenstand und `ablauf` | Datum und Uhrzeit bestimmen Licht und Kamerarichtung. Den Plan hat er in Schritt 1 schon gesehen; hier bestätigt er einen Fakt, er plant nicht neu |
| F4 | "Was tragen Sie zu einem Termin mit einem Eigentümer? Ein Foto genügt." | Nur wenn der Workshop per Video lief (`workshop.ort.form` video) und kein Bild im Kontaktbogen ihn in Arbeitskleidung zeigt | `fotobrief.garderobe` | Sonst hat das Team ihn im Workshop gesehen und im Probedreh gefilmt |

**Bei Markus:** F1 entfällt (keine aktiven Objekte im Seed, `workshop.ort` fehlt), F4 entfällt (Workshop vor Ort, 15 Bilder aus dem Büro). Es bleibt F3, eine Bestätigung mit einem Klick.

**Gestrichen gegenüber der zweiten Fassung:** die frühere F2 zu Urheber und Nutzungsrecht, weil Schritt 1 sie als F4 stellt (`01_auftakt.md` Tabelle der Fragen, Zielfeld `vorab.material[].rechte`, Frist Workshop-Tag). Dieser Schritt übernimmt die Antwort und hält nur den Rest nach: Dateien, die dort offen blieben, stehen als offene Aufgabe in `workshop.aufgaben` mit Art `foto`; das Team erinnert an diese Aufgabe, statt neu zu fragen. Einwilligungen von Rückenfigur und Passanten holt das Team am Termin ein, nicht der Makler.

**Abgeleitet statt gefragt**

| Nicht gefragt | Stattdessen aus |
|---|---|
| Welche Ihrer Bilder gefallen Ihnen? | Kontaktbogen durch das Team; Geschmack aus `vorlieben.bildpaare` und `vorlieben.profil` |
| Wie soll Ihre Bildsprache wirken? | `idee`, `brief`, `vorlieben.profil` |
| Welcher Ausschnitt, welches Hauptbild? | `system.zeichen`, Team |
| Wo ist bei Ihnen gutes Licht? | `workshop.ort.licht` |
| Welche Orte sind Ihnen wichtig? | `workshop.ort.orte`, `workshop.geschichte`, `vorab.fakten`, `positionierung.fuerWen` |
| Wer hat die Fotos gemacht? | Schritt 1, F4 |
| Wie wohl fühlen Sie sich vor der Kamera? | `workshop.probedreh` |
| Was darf nie ins Bild? | `antworten.grenzen`, `grenzenFrei` |
| Welche Sätze wollen Sie sagen? | `workshop.geschichte`, später `feed.kacheln[].skript` |
| Wollen Sie KI-Bilder von sich? | nie; Bildwelt nur als Stimmung fürs Team |

---

## 5. Eingang und Ausgang

### 5.1 Eingang

| Vorgänger | Feld | Wofür | Status |
|---|---|---|---|
| 9 | `idee` (`satz`, `zeichen`, `codes`, `gezeigt.achse`, `begruendung`, `version`) | Bildidee, Porträtstil, Achse des Gegenentwurfs, `basis.idee` | laut Vertrag |
| 9 | `brief` (`tonprofil`, `verbote`, `einschraenkungen`, `publikumAlsPerson`) | Haltung, Vermeiden, Tageszeit, Zweck | laut Vertrag |
| 10 | `system.raster` | Formate, sichere Zonen, Rand, Kreisregel Profil | laut Vertrag |
| 10 | `system.zeichen` (`platz`, `datenregel`) | `kanteY` je Format; `datenregel` nur, um zu prüfen, dass `punktX` fest bleibt | laut Vertrag |
| 10 | `system.farbe` | Farbbehandlung je Entwurf | laut Vertrag |
| 10 | `system.gegenentwurf` | Farbe und, bei Achse `ausschnitt`, Zeichenlage des Gegenentwurfs | **Ergänzung** |
| 1 | `vorab.material` (mit `rechte`, `prognose`) | Kontaktbogen, Urheber aus Schritt 1 F4 | laut Vertrag |
| 1 | `vorab.fakten` (graetzl, bezirke) | Orte im Grätzl | **Ergänzung** |
| 1 | eigene Objekte aus dem Bestand-Import, `vorab.letzteAbschluesse` | Vorschlag für F1 (nur aktive), Abgleich gegen erkennbare Kundenobjekte (auch verkaufte) | **Ergänzung**, wie in Schritt 13 |
| 1 | `auftrag.einwilligungen` (nur "Objektfotos zeigen") | Objekt-Rolle im Kontaktbogen | **Ergänzung** |
| 1 | `auftrag.termine.portraet`, `auftrag.termine.reveal` | Termin, dessen Status dieser Schritt setzt | **Ergänzung** |
| 2 | `antworten.grenzen`, `antworten.grenzenFrei` | Vermeiden | laut Vertrag |
| 2 | `antworten.formate` | Clip-Bedarf je Formattyp | laut Vertrag |
| 4 | `workshop.probedreh` | Einstellungsmix, Garderobe, `messung.takeA` | laut Vertrag |
| 4 | `workshop.ort` (`licht {richtung, tageszeit, notiz}`, `orte[]`, `material[]`, `form`) | Lichtseite und Tageszeit, Orte für Motive und Fotobrief, Innen- und Regenvarianten, Bedingung für F4 | **Ergänzung**, von Schritt 4 für 11 erzeugt (`04_workshop.md` 5.2 und 9 Punkt 4) |
| 4 | `workshop.geschichte` | Orte, Gesprächsfragen aus Belegen und Geschichten | laut Vertrag |
| 4 | `workshop.zitate` | Haltung, Makler-Seite | laut Vertrag |
| 4 | `workshop.aufgaben` | offene Rechte nachhalten | **Ergänzung** |
| 3 | `vorlieben.bildpaare`, `vorlieben.profil` | Licht, Farbtemperatur, Mensch im Bild | laut Vertrag plus `profil` |
| 7 | `positionierung.fuerWen` | Menschen und Orte im Motivplan | laut Vertrag |

**Gestrichen:** der Eingang "Porträts für die Team-Bildwelt" aus `auftrag.einwilligungen`. Schritt 1 führt diesen Zweck nicht mehr (`01_auftakt.md` 5.3 D3), und kein Porträt geht an ein Bildmodell.

Symmetrie: Alle Ergänzungen kommen aus Schritten, die schon Vorgänger sind (1, 4, 10). Vorgänger 1, 2, 3, 4, 7, 9, 10; Nachfolger 12, 13, 14, 16.

### 5.2 Ausgang

| Feld | Inhalt | Abnehmer |
|---|---|---|
| `bild.regeln` | `{licht, abstand, haltung, ausschnitt, reihung, farbbehandlung}`, je `{wert, mass, toleranz, nicht, warum, quelle, herkunft}`; `ausschnitt` mit `kanteY` je Format, `horizontY`, `punktX`, `sichtbar`, `punktFest`, `blickziele`, `je` Entwurf | 12 (`serien.bildaufbau`, `grammatik`), 13 (P7), 14 (Strukturabdruck), 16 über `quelle`, 17 |
| `bild.motive` | `{pflicht[], kann[]}`, je `{id, motiv, ort, kante, einstellung, blickziel, format[], rolle, warum}` | 14, `fotobrief` |
| `bild.vermeiden[]` | `{was, grund, quelle}`, immer Handschlag, Schlüssel, Daumen hoch, erkennbare Kundenobjekte ohne Einwilligung | 12 (`variable` ohne Hausnummer), 14, 17 |
| `bild.kontaktbogen[]` | `{id, datei, durchgang1, durchgang2, crop je format je entwurf, rolle}` plus `situation`, `einstellung`, `blickziel`, `meta`, `rechte`, `ki` | 13, 14 |
| `bild.portraet` | `{datei oder luecke, zuschnitt je format mit profil als einziger Quelle für den Kreis, festePosition}` | 12, 13 (Profilbild), 14, 16 (`rollout.liveTag.profilbild`) |
| `bild.portraetTermin` | `{noetig, grund, zaehlung {sicher, moeglich, situationen, gebraucht, annahmen}, terminRef, setztStatus, basis, messung}` | 1 (`auftrag.termine.portraet.status`), 14 (`gate2.offeneLueckenMitTermin`), 4 (Messung) |
| `fotobrief` | `{zweck, idee, pflichtMotive, kannMotive, lichtUndTageszeit, orte[] {name, zugang, ausrichtung, sonne, kamerarichtung, regenvariante}, garderobe, verboteneRequisiten, formateUndCrops {empfehlung, gegenentwurf}, anzahl, clips, referenzen[] {merkmal, nicht, quelle}, ablauf, horizontSatz}` plus `sucherrahmen`, `gespraechsfragen`, `maklerSeite` | 14 (Rolle Fotograf), 16 (`hmDrehtagClips`, `uebergabe.paket`) |
| `bild.bildweltAuftrag` | `wb-bildwelt/1` mit `zweck: "stimmung-team"` oder `null` | Bildwelt-Brücke, nur Team |
| `bild.luecken[]` | `{platz, format, gesicht, motivklasse, grund, schliesstDurch}` | 13 (neu gerechnet), 14, 16 |

### 5.3 Datenvertrag

Speicherort: `hmStore` unter `marke2[mid].bild` und `marke2[mid].fotobrief`. Originale in IndexedDB `unio_hm_blobs` mit Schlüssel `k:<id>`; die bestehenden Schlüssel `p:<id>` und `o:<id>` bleiben.

```js
marke2[mid].bild = {
  version: 1, erstelltAm: "ISO", basis: { idee: "<idee.version>", system: "<system.version>" },
  regeln: {
    licht:     { seite: "links" | "rechts" | null, tageszeit: ["vormittag"], art: "tageslicht seitlich", nicht: [],
                 herkunft: "eingang", quelle: ["workshop.ort.licht", "brief.einschraenkungen[E3]"], warum, luecke: null | "Lichtseite bei der Begehung bestimmen" },
    abstand:   { fuehrend: "sitzt", einstellungen: [{ name: "nah", kopfAnteil: 0.40, kante: "tisch", anteil: 0.3 }],
                 brennweiteKB: [50, 85], kamera: "augenhoehe", herkunft: "eingang", quelle: ["idee.codes[portraetstil]", "workshop.probedreh"], warum },
    haltung:   { pflicht: [], nie: [], herkunft: "eingang", quelle, warum },
    ausschnitt: {
      kanteY:    { post: 0.912, reel: 0.700, herkunft: "system.zeichen.platz", sichtbar: true },
      horizontY: { wert: 0.38, herkunft: "team", grund: "", sichtbar: false },
      punktX:    { wert: 0.62, herkunft: "team", grund: "", fest: true, folgtDatenregel: false },
      blickziele: ["kamera", "gegenueber", "unterlage"], blickPflichtKamera: ["portraet", "profil"], blickSeite: "groesserer Raum",
      toleranz: { horizont: 0.015, achse: 0.02, kante: 0.01 },
      je: { gleich: true /* false nur bei idee.gezeigt.achse == "ausschnitt" */, empfehlung: { post: {}, reel: {} }, gegenentwurf: null },
      profil: { regel: "system.raster.profil", kopfAnteil: [0.60, 0.70], faktorGegenPx: 330 },
      warum, quelle
    },
    reihung:   { einstellungFolge: "nie gleich", kombinationAbstand: [1, 3], lichtSeite: "konstant", herkunft: "handwerk", warum },
    farbbehandlung: { je: { empfehlung: { lichterMax: "system.farbe.grund", tiefenAuf: "system.farbe.text" }, gegenentwurf: { tiefenAuf: "system.farbe.grund" } },
                      saettigung: 0, akzentImBild: false, retusche: "nur Vorübergehendes", herkunft: "eingang", warum, quelle }
  },
  motive: { pflicht: [{ id, motiv, ort, kante, einstellung, blickziel, format: [], rolle, warum }], kann: [] },
  vermeiden: [{ was, grund, quelle }],
  kontaktbogen: [{
    id: "k1", datei: "k:<blobId>", quelle: "vorab.material" | "portraits" | "termin", aufgenommen: "ISO",
    situation: "S1", situationAnnahme: false, gesicht: true, ki: false, einstellung: "nah", blickziel: "kamera",
    meta: { score, gesichter, faktor, schaerfe, helligkeit, landmarken: { augenL, augenR, nase, kinn }, scheitel: { y, geschaetzt: true }, quelleLandmarken: "maklerzuschnitt" | "hand", hinweise: [] },
    rechte: { urheber, nutzung: ["social", "web", "druck"], ausSchritt1: true, status: "geklaert" | "offen", nachweis,
              abgebildete: [{ wer: "makler" | "team" | "passant" | "dritte", status: "einwilligung" | "nicht erkennbar" | "offen", nachweis }] },
    durchgang1: { technisch: true, urteil: "kandidat" | "raus", grund, von, am },
    durchgang2: { urteil: "auswahl" | "reserve" | null, von, am },
    rolle: "portraet" | "gesicht" | "ort" | "detail" | "objekt" | "profil" | "website",
    crop: { empfehlung: { post: { x, y, w, h, machbar, grund, abweichung } }, gegenentwurf: null }
  }],
  portraet: { datei: "k16" | null, luecke: null | { grund }, zuschnitt: { profil, post, reel, story, websiteKopf, karte, signatur, exposeA4 }, festePosition: {} },
  portraetTermin: { noetig, grund, zaehlung: { sicher, moeglich, situationen, gebraucht: 8, annahmen: [] },
                    terminRef: "auftrag.termine.portraet", setztStatus: "bestätigt" | "entfällt", basis: {},
                    messung: { takeA: null, amTermin: null, differenz: null } },
  bildweltAuftrag: null | { schema: "wb-bildwelt/1", zweck: "stimmung-team" },
  luecken: [{ platz, format, gesicht, motivklasse, grund, schliesstDurch }]
};
marke2[mid].fotobrief = {
  version: 1, zweck, idee, pflichtMotive: ["m1"], kannMotive: [], lichtUndTageszeit, horizontSatz,
  orte: [{ name, zugang: "geklaert" | "luecke", ausrichtungGrad: null, sonne: { azimut, hoehe, uhrzeit }, kamerarichtungGrad, regenvariante: { ort, situation }, abgleichBestand: "frei" | "gesperrt" | "offen" }],
  garderobe: { soll: [], nie: [], mitbringen: [], quelle: "workshop.probedreh" | "F4" }, verboteneRequisiten: [],
  formateUndCrops: { empfehlung: {}, gegenentwurf: null }, anzahl: { gesamt, gesicht, detail, ort },
  clips: [{ formattyp: "talking" | "qa" | "broll", bildaufbau, dauerSek, anzahl }],
  referenzen: [{ merkmal, nicht, quelle: "kontaktbogen:k7" | "beschreibung" }],
  ablauf: [{ vonMin, bisMin, situation, motiv, frage, liefern }],
  gespraechsfragen: [{ frage, quelle: "workshop.geschichte.belege" }],
  sucherrahmen: "<svg>", freigabe: { von, am }
};
```

### 5.4 Abweichungen vom Vertrag, begründet

1. **Zusätzliche Eingänge** `system.gegenentwurf`, `vorab.fakten`, eigene Objekte und `vorab.letzteAbschluesse`, `auftrag.einwilligungen`, `auftrag.termine`, `workshop.ort`, `workshop.aufgaben`: ohne sie keine Tonkurve des Gegenentwurfs, keine Orte, kein Schutz vor erkennbaren Kundenobjekten, kein Termin und kein Licht. Alle kommen aus bestehenden Vorgängern.
2. **`fotobrief.clips` je Formattyp statt je Serie.** Serien entstehen in Schritt 12, Reels in Schritt 13. Schritt 16 bindet den Bedarf inzwischen über `hmDrehtagClips` an jedes Reel und liest die Sätze aus `feed.kacheln[].skript` (`16_freigabe.md`, Clip-Liste und Punkt 5 der Hinweise). Der frühere Vorschlag an Schritt 16 ist damit erledigt.
3. **`bild.portraetTermin` ohne eigenes Datum.** Der Vertrag nennt `{noetig, grund}`; dazu kommen Zählung, `terminRef`, Status und Messung. Das Datum steht nur in `auftrag.termine.portraet`, wie Schritt 1 es verlangt.
4. **Mehr Felder im Kontaktbogen** (`situation`, `einstellung`, `blickziel`, `meta`, `rechte` mit `abgebildete`, `ki`): Leitfrage 6, Zählung, Zwölferprobe und KI-Sperre brauchen sie.
5. **`fotobrief.sucherrahmen`, `gespraechsfragen`, `maklerSeite`, `horizontSatz`**: Brücke vom Code zum Auslöser und das versprochene Erlebnis, als Ansicht aus denselben Daten.
6. **`bild.luecken` vorläufig**, endgültig in Schritt 13 mit derselben Funktion.
7. **`ausschnitt` gehört Schritt 11.** `system.festUndVariabel` nennt den Crop "nie wechselnd"; die Werte stehen nur in `bild.regeln.ausschnitt`. `kanteY` wird aus `system.zeichen.platz` übernommen, nicht dort doppelt geführt.

### 5.5 Hinweise an Nachbarschritte

| Schritt | Hinweis |
|---|---|
| 1 | `vorab.material` um die 15 Porträts vom 11.09. (Seed a1) ergänzen, damit die Prognose sie kennt. `auftrag.termine.portraet.uhrzeit` nimmt den Vorschlag aus dem Licht auf. Den Eingang "Porträts für die Team-Bildwelt" hat dieser Schritt gestrichen |
| 4 | `workshop.ort` ist jetzt Eingang; die Messung Take A gegen Termin liegt in `bild.portraetTermin.messung` |
| 10 | Befund: Das Beispiel in 3.6 rechnet mit "Der Zeitpunkt", Feuilleton und Achse Satz, Schritt 9 mit "Das Zeitmaß", Weite und Achse `tonwert`. Bitte auf `idee` aus Schritt 9 umstellen und `basis.idee` führen (wie von Schritt 14, 5.6 Punkt 2, gemeldet). Hinweis: Das Zeichen liegt im Post bei 0,912, im Reel bei 0,70 der Rasterfläche; soll die Kante im Raster auf einer Höhe liegen, müsste das Reel-Zeichen unter y 1248, also in die Bedienzone. Empfehlung: so lassen, konstant im Raster ist der Horizont |
| 12 | 3.12 Zeile "höchstens vier" wird "höchstens drei" (K16 fällt nach der Rechnung aus). Der Bildaufbau liest `kanteY`, `horizontY`, `punktX` statt "Linie und Punkt" |
| 13 | **Korrekturauftrag:** `13_feed.md` 3.6 (`profilbild`, "gleiche Kopfhöhe wie in den Reel-Titelbildern") und 3.12 (`profilbild`) streichen und durch "Zuschnitt aus `bild.portraet.zuschnitt.profil`" ersetzen. Eine Kopfhöhe, eine Quelle |
| 14 | Der Strukturabdruck liest für das Merkmal Ausschnitt `horizontY.wert` und `punktX.wert` (auf 5 Prozent gerundet). P12 dieses Schritts ruft dieselbe Funktion `hmKohorteBild` mit derselben Rundung und Schwelle. Befund 1 aus 5.6 Punkt 2 ist für Schritt 11 erledigt |

---

## 6. Qualitätsprüfung im Schritt

Alle Prüfungen laufen im Selbsttest der Werkbank, die mit "automatisch" markierten ohne Menschen.

| Nr. | Prüfung | Regel | Art | Folge bei Rot |
|---|---|---|---|---|
| P1 | Crop folgt dem Zeichen | Jeder Crop mit Gesicht liegt mit Horizont, Achse und Kante in der Toleranz, oder hat einen Grund | automatisch aus Landmarken oder Handeingabe | gesperrt für Durchgang 2 |
| P2 | Ein Original trägt beide Entwürfe | Für jede Auswahl mit Rolle `gesicht` sind Post und Reel-Titelbild machbar; bei Achse `ausschnitt` für beide Entwürfe, sonst ist `je.gleich` wahr und die Tonkurve des Gegenentwurfs gerendert | automatisch | Rolle nur Reserve |
| P3 | Acht oder Termin | Zählung nach 3.5; unter acht ist `noetig` wahr und `auftrag.termine.portraet` vor `auftrag.termine.reveal` bestätigt | automatisch | Gate 2 zeigt die offene Lücke |
| P4 | Rechte je Auswahl | keine Auswahl mit `rechte.status` offen oder einem `abgebildete[].status` offen | automatisch | Eintrag fällt auf Kandidat zurück |
| P5 | Keine KI im Echten | kein `ki: true` in Auswahl, Porträt, `feed.kacheln` | automatisch | Renderer verweigert |
| P6 | Branchenmotive und Kundenobjekte | `bild.vermeiden` enthält Handschlag, Schlüssel, Daumen hoch, erkennbare Kundenobjekte; jeder Ort im Fotobrief hat `abgleichBestand` "frei" | automatisch | Regelpfad ergänzt, Ort gesperrt |
| P7 | Maß statt Adjektiv | kein Satz im Fotobrief mit Wörtern wie schön, hochwertig, authentisch, stimmungsvoll, edel, exklusiv, modern ohne Zahl oder "nicht" im selben Satz | automatisch, Wortliste | Satz zurück |
| P8 | Jede Regel begründet | `warum`, `quelle`, `herkunft` in jeder Regel; `quelle` löst im Store auf | automatisch | Regel gilt als Ermessen |
| P9 | Fotobrief vollständig | jedes Pflichtmotiv mit Ort, Kante, Einstellung, Blickziel, Format, Crop; jeder Ort mit Zugang, Ausrichtung, Sonnenstand und Regenvariante oder als Lücke | automatisch | Brief nicht freigebbar |
| P10 | Lücken statt Muster | bei fehlendem Stoff Lückentext, kein Satz aus Vorlage oder Musterbeispiel | automatisch | rot |
| P11 | UNIO-Sprache | Makler-Seite und Fotobrief ohne Gedankenstriche, Ausrufezeichen, Emojis, Klischee-Liste; Anrede nach seiner Regel | automatisch | Text zurück |
| P12 | Kohorte Bild | `hmKohorteBild(mid, "bild")` bildet einen Bildabdruck aus sechs Merkmalen: `horizontY`, `kanteY` (Post), `punktX` (je auf 5 Prozent gerundet), Lichtseite mit Tageszeit, führende Einstellung mit Haltung, Farbbehandlung (Farbton von `system.farbe.grund` auf 15 Grad gerundet plus hell oder dunkel). Schwelle wie der Strukturabdruck in Schritt 14: überlappende Bezirke und mindestens vier von sechs gleich ist Sperre, sonst ab vier Hinweis. Rundung und Schwelle aus derselben Konstante `HM_KOHORTE` | automatisch über den Store | Sperre an Schritt 10 und 11 zurück |
| P13 | Zeitbudget des Termins | Summe der Minuten höchstens `dauerMin`; je Situation mindestens 10 Minuten | automatisch | Ablauf zurück |
| P14 | Fremder-Fotograf-Test | ein Teammitglied, das den Makler nicht kennt, beantwortet nach dem Brief allein: wo, wann, aus welcher Richtung das Licht, auf welcher Höhe die Kamera, welche Kante, was nie. Sechs richtig | Team, zwei Minuten | Brief schärfen |
| P15 | Blindtest (E1) | wie in Kapitel 1 | Team, ab drei Maklern | Ausschnitt schärfen |
| P16 | Zwölferprobe | am Datensatz: keine gleiche Kombination aus Einstellung und Blickziel im Abstand eins oder drei, keine gleiche Einstellung in Folge, mindestens drei Einstellungen und drei Blickziele über zwölf; nach dem Termin zusätzlich am Render durch den Art Director | automatisch, dann Team | Belegung der Kacheln tauschen oder Motiv nachholen |
| P17 | Achse fest | `punktX.folgtDatenregel` falsch; in keinem Crop liegt die Nasenachse außerhalb der Toleranz, weil ein Beleg die Spanne verschiebt | automatisch | rot |

---

## 7. Typische Fehler und wie sie verhindert werden

| Fehler | Folge | Verhinderung |
|---|---|---|
| Jedes Bild wird nach Gefühl beschnitten | kein gemeinsames Maß | Crop wird gerechnet, Abweichung nur mit Grund (P1) |
| Die Linie des Zeichens wird aus `system.zeichen.platz` auf die Augen gerechnet | Augenlinie am unteren Bildrand | drei Maße mit eigener Herkunft; `kanteY` ist nie die Augenlinie |
| Das Zeichen läuft durch das Gesicht | das stärkste Asset wird verdeckt | sichtbare Linie nur auf einer Kante, Horizont unsichtbar |
| Die Achse wandert mit dem Beleg | der Mensch springt von Kachel zu Kachel | `punktX.fest` (P17) |
| Alle zwölf Kacheln gleich | Passbildwand | kontrollierte Variablen, Zwölferprobe (P16), höchstens drei je Situation |
| Zwanzig Makler mit demselben Licht und derselben Farbe | Unterscheidung hängt an zwei Zahlen | vier Regeln aus eigenen Eingängen, Bildabdruck (P12) |
| Blick nach Rasterspalte | falsch nach dem nächsten Beitrag | Blickziel wechselt, nie die Seite |
| Profilbild mit eigener Kopfhöhe in Schritt 13 | zwei Quellen für ein Bild | `bild.portraet.zuschnitt.profil` als einzige Quelle |
| Guideline-Werte für ein Seed-Bild eingesetzt | falsche Machbarkeit (so in der zweiten Fassung bei K16) | Rechnung nur mit gemessenen Landmarken |
| Fotos mit ungeklärten Rechten oder erkennbarer Rückenfigur ohne Einwilligung | Rechtsrisiko nach dem Live-Tag | Sperre über `abgebildete` (P4) |
| Kundenobjekt erkennbar | Verstoß gegen Diskretion | Abgleich mit Bestand-Import und Abschlüssen (P6) |
| Die Idee Zeit wird mit Uhren erzählt | Ersetzungsmetapher | Zeitsymbole in `verboteneRequisiten` |
| Außentermin im Regen | zu wenig Situationen | Regenvariante je Ort |
| Licht von rechts dem Zufall überlassen | Lichtseite springt | Ausrichtung, Sonnenstand und Kamerarichtung je Ort |
| KI-Stimmungsbild rutscht in den Feed | Täuschung | `ki: true` überall gesperrt (P5) |
| Der Makler posiert | steife Bilder | Gesprächsfragen zu Belegen, Seite mit allem, was ihn erwartet |
| Hautretusche | er sieht im Termin anders aus | Retusche nur für Vorübergehendes |
| Nach der Freigabe kommen Bilder in anderem Licht | der Feed zerfällt im Betrieb | `bild.regeln` in der eingefrorenen `quelle`; Schritt 17 prüft neue Bilder mit Durchgang 1 |

---

## 8. Umsetzung in der Werkbank

Architektur nach `ui_kits/werkbank/CLAUDE.md`: Babel im Browser ohne Build, Präfix `hm`, Export über `Object.assign(window, ...)`, kein `import()`. Keine Zugangsdaten, keine Fotos von Maklern oder Kunden neu ins Repo.

### 8.1 Dateien

| Datei | Änderung |
|---|---|
| `ui_kits/werkbank/wb-bild.jsx` (neu) | `hmBildRegeln(mid)` mit `herkunft` je Wert und Lücken statt Standardwerten, `hmBildAusschnitt(regeln, format, entwurf, landmarken)`, `hmScheitelSchaetzen(augen, kinn)`, `hmKontaktbogenVorsortieren`, `hmBildSituationen`, `hmBildGesichterZaehlen` (liefert `{sicher, moeglich}`, auch von Schritt 1 und 13 gerufen), `hmPortraetTermin` (setzt Status in `auftrag.termine.portraet`), `hmBildLuecken`, `hmZwoelferprobe(kacheln)`, `hmSonnenstand(lat, lon, datum, uhrzeit)` nach NOAA, `hmFotobriefRegeln(mid)`, `hmSucherrahmenSvg(regeln, format)`; Komponenten `Kontaktbogen`, `CropFenster` (mit Handeingabe Augen und Kinn), `FotobriefSeite`, `MaklerTerminSeite` |
| `tools/maklerzuschnitt/src/index.html` | Einbettungsnachricht `zs:vorgabe {ratio, horizontY, punktX, kopfAnteil}` neben `G`; Rückgabe der erkannten Landmarken (Augen, Nase, Kinn) in `meta`. Live-Werkzeug im Aktiv-Repo; vor der Änderung mit dem Owner klären, welches Repo. Bis dahin gilt die Handeingabe aus 3.4 |
| `ui_kits/werkbank/wb-foto.jsx` | Porträts werden Kontaktbogen-Einträge; `hmPortraitSpeichern` wählt Asset Nummer eins nur unter Rolle `portraet` nach Bestätigung |
| `ui_kits/werkbank/wb-bildwelt.jsx` | `hmBwKontext` liest `bild.regeln`; `zweck: "stimmung-team"`; Ergebnisse tragen `ki: true` |
| `ui_kits/werkbank/wb-marke.jsx` | Material-Upload schreibt Kontaktbogen-Einträge und übernimmt `rechte` aus `vorab.material` |
| `ui_kits/werkbank/wb-markenwelten.jsx` | `WeltPost` liest Bild und Crop aus `bild.kontaktbogen` und `bild.portraet`, verweigert `ki: true` |
| `ui_kits/werkbank/wb-gate2.jsx` | `hmKohorteBild(mid, teil)` mit Teil `bild` für P12; Konstante `HM_KOHORTE` für Rundung und Schwelle, gemeinsam mit dem Strukturabdruck |
| `api/wb-marke.js` | Kettenschritt `bild` mit dem Schema aus 8.2 unter `SCHEMA.bild`; an Claude gehen Regeln, Motive, Rollen und Belege, keine Bilder |
| `docs/werkbank/MARKE_SCHEMA.md`, `docs/werkbank/BILDWELT_BRUECKE.md` | Abschnitt `bild` und `fotobrief` v2, Feld `zweck` |

### 8.2 Schema für Claude (Structured Outputs)

Claude schreibt nur Text. Zahlen setzt der Renderer über Platzhalter (`{datum}`, `{uhrzeit}`, `{dauer}`, `{treffpunkt}`, `{sonne}`), so kann Claude keine Zahl erfinden. Das Schema ist das reine Schema-Objekt, wie `api/wb-marke.js` es über `output_config.format` mit `type: "json_schema"` schickt; der Name steht als Schlüssel in `SCHEMA`, nicht im Schema. Arrays haben weder `minItems` über 1 noch `maxItems`, weil die API das nicht unterstützt (https://platform.claude.com/docs/en/build-with-claude/structured-outputs, Abschnitt zu den Grenzen von JSON Schema). Die drei Gesprächsfragen sind darum drei benannte Felder.

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": ["zweck", "bildIdee", "frage1", "frage2", "frage3", "maklerSeite", "referenzen", "begruendungen"],
  "properties": {
    "zweck": { "type": "string", "description": "Zwei Sätze: was die Bilder für wen leisten, aus brief.aufgabe" },
    "bildIdee": { "type": "string", "description": "Ein Satz, abgeleitet aus idee.satz" },
    "frage1": { "type": "object", "additionalProperties": false, "required": ["frage", "quelle"], "properties": { "frage": { "type": "string", "description": "Eine Frage zu einem Beleg oder einer Geschichte, nie zu Lob über ihn" }, "quelle": { "type": "string", "description": "Pfad, etwa workshop.geschichte.belege[1]" } } },
    "frage2": { "type": "object", "additionalProperties": false, "required": ["frage", "quelle"], "properties": { "frage": { "type": "string", "description": "Eine Frage zu einem Beleg oder einer Geschichte, nie zu Lob über ihn" }, "quelle": { "type": "string", "description": "Pfad, etwa workshop.geschichte.belege[1]" } } },
    "frage3": { "type": "object", "additionalProperties": false, "required": ["frage", "quelle"], "properties": { "frage": { "type": "string", "description": "Eine Frage zu einem Beleg oder einer Geschichte, nie zu Lob über ihn" }, "quelle": { "type": "string", "description": "Pfad, etwa workshop.geschichte.belege[1]" } } },
    "maklerSeite": { "type": "object", "additionalProperties": false, "required": ["licht", "regen", "anziehen", "nichtTun", "danach"],
      "properties": { "licht": { "type": "string" }, "regen": { "type": "string" }, "anziehen": { "type": "string" }, "nichtTun": { "type": "string" }, "danach": { "type": "string" } } },
    "referenzen": { "type": "array", "items": { "type": "object", "additionalProperties": false, "required": ["merkmal", "nicht", "quelle"],
      "properties": { "merkmal": { "type": "string" }, "nicht": { "type": "string" }, "quelle": { "type": "string" } } } },
    "begruendungen": { "type": "array", "items": { "type": "object", "additionalProperties": false, "required": ["regel", "warum", "quelle"],
      "properties": { "regel": { "type": "string", "enum": ["licht", "abstand", "haltung", "ausschnitt", "reihung", "farbbehandlung"] }, "warum": { "type": "string" }, "quelle": { "type": "string" } } } }
  }
}
```

Nach der Antwort prüft der Regelpfad: drei verschiedene Quellen, jede Quelle löst im Store auf, keine Frage nach Kundenurteilen über ihn. Scheitert eine Prüfung, steht die Frage als Lücke.

**Regelpfad ohne Claude** liefert dieselbe Struktur: `zweck` und `bildIdee` wörtlich aus `brief.aufgabe` und `idee.satz`, je Frage die feste Form "Erzählen Sie uns von [beleg.was]" aus den ersten drei Einträgen in `workshop.geschichte.belege` und `abgeraten`; fehlt der Stoff, steht "Lücke: Gesprächsfrage kommt aus dem Workshop". `maklerSeite.licht` und `regen` als Lückentext mit den Platzhaltern. Keine Mustersätze.

### 8.3 Selbsttest

Neue Tests in der Art von `hmSelbsttestWelten`: P1 bis P13, P16 und P17 als "Bild: ..." Einträge. Fälle: Seed Markus weist den Termin als nötig aus (`sicher` 0, `moeglich` 3), K16 ist für Post und Reel nicht machbar und für das Profil machbar (Werte aus 3.12 d als Erwartung), die Scheitel-Schätzung liegt für K16 innerhalb von 10 px am gemessenen Wert, die Zwölferprobe aus 3.12 h ist grün und wird rot, wenn Kachel 9 halbnah ist. Seed Elif mit "Professionelle Fotos" durchläuft den Fall ohne Termin, sobald ihre Fotos als Kontaktbogen angelegt sind.

### 8.4 Aufwand

| Arbeit | Aufwand (Setzung) |
|---|---|
| Regelpfad mit Herkunft, Datenvertrag, Crop-Rechnung, Scheitel-Schätzung, Zählung, Lücken | 2,5 Personentage |
| Kontaktbogen mit zwei Durchgängen, Crop-Fenster mit Handeingabe | 2 Personentage |
| Erweiterung `/maklerzuschnitt` um Vorgabe und Landmarken | 1 Personentag |
| Fotobrief-Seite mit Sonnenstand und Regenvariante, Makler-Seite, Sucherrahmen | 2 Personentage |
| Claude-Schritt, Schema, Platzhalter-Renderer, Prüfung nach der Antwort | 0,5 Personentage |
| Zwölferprobe, Bildabdruck in `wb-gate2.jsx`, Bildwelt-Sperren, Selbsttest | 1,5 Personentage |
| Summe | rund 9,5 Personentage |

Teamzeit je Makler (Setzung, messen): Horizont und Achse setzen mit Grund 15 Minuten, Durchgang 1 rund 10 Minuten je 40 Dateien, Durchgang 2 mit Crops 30 bis 45 Minuten, Fotobrief prüfen 20 Minuten. Mit Termin zusätzlich Begehung mit Ausrichtung und Bestandsabgleich bis 30 Minuten, Termin 75 Minuten plus Wege, Kontaktbogen der neuen Aufnahmen 30 Minuten. Ohne Termin rund 1,75 Stunden, mit Termin rund 4,25 Stunden. Keine Konten des Maklers bei fremden Werkzeugen nötig.

---

## 9. Offene Punkte und Lücken

1. **Idee und System** für Markus sind in Schritt 9 und 10 nicht abgenommen; die Zahlen in 3.12 tragen `basis` und werden neu gerechnet.
2. **`workshop.ort`** fehlt im Seed. Lichtseite, Orte und Regenvariante für Markus sind darum Lücken, und der Brief ist für ihn heute nicht freigebbar (P9). Das ist gewollt: kein Standardlicht.
3. **Rechte**: Nutzungsrechte an Aufnahmen durch Team und externe Fotografen, Einwilligung der Rückenfigur, Umgang mit Passanten, Speicherort und Löschfristen der Kontaktbögen. Vor dem Einsatz klären; dieses Dokument ist keine Rechtsberatung.
4. **Schwellen** acht Gesichter, drei je Situation, Qualitätswert 70, 75 Minuten, Toleranzen, Kopfanteile, Horizont 0,38, Achse 0,62, 330 px beim Profil und 80 Prozent Durchgang 1 sind Setzungen.
5. **Landmarken von K16** sind am Pixelraster abgelesen (plus minus 10 px), nur der Scheitel ist gemessen. Mit `/maklerzuschnitt` wiederholen.
6. **Zwölferprobe am Render** fehlt, bis Bilder aus dem Termin da sind. Das Restrisiko der festen Achse ist offen.
7. **Wiedererkennung des Crops** ist für Makler nicht belegt (R7 Lücke zu Fame und Uniqueness); E1 misst es ab drei Maklern.
8. **Sichere Zonen organischer Reels** sind nur für Anzeigen dokumentiert (R6 offene Frage 2).
9. **Anrede auf der Makler-Seite** folgt der offenen Entscheidung zu Du oder Sie (Zerlegung Kapitel 7 Punkt 1). Markus: Sie.
10. **Sieveringer Straße 1902**: ob Baujahr oder Hausnummer, offen (MARKENQUALITAET 5.7). Bis dahin ist die Straße als Ort gesperrt.
11. **Fotografie-Realität der Makler** (R2 offene Frage 1): Ob der Brief an Profis, das Team oder das Telefon des Maklers geht, ist unbekannt. Horizont-Regel und Sucherrahmen funktionieren in allen drei Fällen.

---

## 10. Quellen

Intern: `../00_ZERLEGUNG.md`, `../bestand/KETTE_IST.md`, `../research/R1-studios.md`, `../research/R2-art-direction.md`, `../research/R4-tools.md`, `../research/R5-makler.md`, `../research/R6-social-system.md`, `../research/R7-evidenz.md`, Nachbarschritte `01_auftakt.md`, `04_workshop.md`, `09_idee.md`, `10_system.md`, `12_social.md`, `13_feed.md`, `14_markenbuch.md`, `16_freigabe.md`, `docs/werkbank/MARKENQUALITAET.md` Kapitel 5, `docs/werkbank/BILDWELT_BRUECKE.md`, Code `ui_kits/werkbank/wb-foto.jsx`, `wb-bildwelt.jsx`, `wb-markenwelten.jsx`, `wb-store.jsx`, `wb-more.jsx`, `api/wb-marke.js`, `tools/maklerzuschnitt/src/index.html`.

Praxis und Studios
- Magnum Photos, Contact Sheets: https://www.magnumphotos.com/theory-and-practice/magnum-photographers-contact-sheets-the-images-behind-the-image/
- Pentagram, The Public Theater 2020 bis 2021: https://www.pentagram.com/work/the-public-theater-2020-2021-season
- Hole & Corner, The Modern House: https://www.holeandcorner.com/long-reads/in-the-modern-style
- NAR Magazine, Glennda Baker: https://www.nar.realtor/magazine/real-estate-news/technology/how-this-agent-is-making-six-figures-on-tiktok
- Eye Magazine, Mucho: https://eyemagazine.com/feature/article/reputations-mucho
- GDUSA, Pentagram und KI: https://gdusa.com/pentagram-federal-website-generates-ai-controversy/
- Bierut, On (Design) Bullshit: https://designobserver.com/on-design-bullshit/
- Milanote, Photoshoot Brief: https://milanote.com/guide/photoshoot-brief
- Frontify, Brand Guidelines for AI: https://www.frontify.com/en/guide/brand-guidelines-for-ai

Plattform und Technik
- Kapwing, Raster 3:4: https://www.kapwing.com/resources/instagrams-new-grid-layout-size-and-dimensions-2025/
- Meta, Reels-Flächen: https://www.facebook.com/business/ads-guide/update/video/instagram-reels
- Anthropic, Structured Outputs: https://platform.claude.com/docs/en/build-with-claude/structured-outputs
- NOAA, Solar Calculator: https://gml.noaa.gov/grad/solcalc/

Studien
- Jansson und Smith 1991: https://www.sciencedirect.com/science/article/abs/pii/0142694X9190003F
- Munk, Sørensen, Laursen 2020: https://www.designsociety.org/download-publication/43213/visual_boards_mood_board_style_board_or_concept_board
- Hsee 1996: https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf
- Willis und Todorov 2006: https://doi.org/10.1111/j.1467-9280.2006.01750.x
- Norton, Mochon, Ariely 2012: https://myscp.onlinelibrary.wiley.com/doi/abs/10.1016/j.jcps.2011.08.002
- Fuchs, Prandelli, Schreier 2010: https://doi.org/10.1509/jmkg.74.1.65
- Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290
- JKR und Ipsos: https://www.marketingweek.com/15-brand-assets-truly-distinctive-finds-research/
