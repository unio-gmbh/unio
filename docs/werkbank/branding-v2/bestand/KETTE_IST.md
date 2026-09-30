# Branding v2. Bestandsaufnahme der Markenkette (Stand 29.09.2026)

Wofür dieses Dokument da ist: Es beschreibt die heutige Markenkette der Werkbank vom Fragebogen bis zum Social-Beitrag so, wie sie im Code läuft, und bewertet jeden Schritt aus Sicht eines strengen Creative Directors. Es ist die Ausgangslage für Branding v2, kein Plan.

Gelesen: `docs/werkbank/MARKENQUALITAET.md` (vor allem Kapitel 5), `docs/werkbank/MARKE_SCHEMA.md`, `docs/werkbank/research/BENCHMARK_MARKE.md`, Code in `ui_kits/werkbank/`: `wb-strategie.jsx`, `wb-plattform.jsx`, `wb-markenwelten.jsx`, `wb-markenbuch.jsx`, `wb-marke.jsx`, `wb-produktion.jsx`, `wb-content.jsx`, dazu zum Nachverfolgen der Übergaben `wb-data.jsx` (hmWeg), `wb-ui.jsx` (hmBrand), `wb-os-data.jsx` (Caption, Skript-Check), `wb-reel.jsx`, `wb-setup.jsx`, `wb-flow.jsx`, `wb-bildwelt.jsx`, `wb-material.jsx`.

**Lesart.** "Belegt" heißt: im Code oder in der Doku nachgelesen, mit Datei und Zeile. "Ableitung" heißt: Urteil oder Nachrechnung des Verfassers aus dem Code, nicht im Browser geprüft. Der Maßstab "High-End-Studio" ist in diesem Dokument eine eigene Ableitung (Kapitel 1.2), keine belegte Aussage über ein bestimmtes Studio. Ein belegter Studio-Vergleich fehlt im Repo, siehe Kapitel 9.

---

## 0. Kurzurteil

Die Werkbank ist bei den Worten weit, bei der Gestalt schwach und bei den Übergaben brüchig.

- **Stark (belegt):** Die Markenplattform ist als Datenvertrag sauber gedacht (Einsicht, Positionierung, Story in drei Längen, Serien mit Hook-Formel und Beispielen, Konzepte, Startplan). Lücken bleiben als Lücken sichtbar. Die Regeln gegen Floskeln, die Anrede je Kanal und die Pratfall-Reihenfolge sind konsequent. Die sechs Markenwelten haben je eine gestalterische Idee und ein benanntes Zeichen, die Renderer rechnen Kontrast und Umbruch sauber.
- **Schwach (Ableitung):** Die visuelle Identität ist eine Katalogwahl aus 5 Schriftpaaren, 7 Akzentfarben, 3 Logo-Typen und 6 Welten. Das wiedererkennbare Zeichen gehört der Welt, nicht dem Makler. Zwischen Positionierung und Gestalt gibt es keine Brücke: Die Welt wird aus Archetyp und Bildpaaren errechnet, nicht aus dem Territorium.
- **Brüchig (belegt):** Die Plattform erreicht die Produktion kaum. Ideen, Captions und Skript-Vorschläge kommen aus den festen Archetyp-Hooks des Strategie-Wegs und aus allgemeinen Vorlagen, nicht aus den Serien des Markenbuchs. Der Social-Feed-Vorschlag im Markenbuch zeigt UNIO-Demo-Objekte aus fremden Bezirken, einen Fülltext, der bei jedem Makler gleich ist, und nur ein Gesicht in neun Kacheln.

---

## 1. Kette auf einen Blick

### 1.1 Stationen

| Nr. | Schritt | Hinein | Heraus | Code | Niveau gegen ein High-End-Studio (Ableitung) |
|---|---|---|---|---|---|
| 1 | Fragebogen und Material | Antworten (Keys siehe MARKE_SCHEMA), Uploads | `fragebogen[mid].antworten`, `branding[mid].material` | `wb-data.jsx`, `wb-marke.jsx` (Material) | Gute Tiefe beim Inhalt, Material wird kaum verwertet |
| 2 | Zwei Wege | Antworten | Weg A und B aus 6 Archetyp-Schablonen | `wb-data.jsx` hmWeg, hmZweiWege; `wb-flow.jsx` Strategie | Schablone, keine Strategie |
| 3 | Workshop | Antworten, Aufnahme | Leitfaden, Mitschrift mit Zitaten und Aufgaben | `wb-strategie.jsx` | Solide Vorbereitung, Zitatsuche grob |
| 4 | Markenplattform | Dossier: Antworten, Weg, Mitschrift, Materialnamen, Branding, Weltliste | Objekt `plattform` | `wb-plattform.jsx` hmPlattform, `api/wb-marke.js` | Text nahe Agenturniveau beim Musterfall, Regelpfad stark schablonenhaft |
| 5 | Qualitätsprüfung | Plattform, andere Plattformen im Store | Note 0 bis 100, fünf Kriterien | `wb-plattform.jsx` hmMarkenQualitaet | Misst Textregeln, nicht Qualität |
| 6 | Branding-Studio | Weg, Material, Porträt | Logo-Typ, Schriftpaar, Akzent, Leitidee, Freigabe | `wb-marke.jsx` Studio | Konfigurator, keine Identität |
| 7 | Markenwelten | Branding (Akzent, Schrift, Logo), Antworten | eine von 6 Welten, Renderer für Post, Story, Feed, Karte, Signatur, Exposé | `wb-markenwelten.jsx` | Handwerklich sauber, konzeptuell austauschbar |
| 8 | Markenbuch und Gate 2 | Plattform, Welt, Branding | Markenbuch, Feed-Vorschau, Materialpaket, Freigabe | `wb-markenbuch.jsx`, `wb-material.jsx` | Gute Gliederung, Freigabe ohne Versionsbindung |
| 9 | Monatsideen | Weg (nicht Plattform), Bestand, Kalender | 10 oder 20 Ideen im Content-Schema | `wb-produktion.jsx` hmIdeen | Allgemeine Vorlagen, Plattform bleibt außen vor |
| 10 | Beitrag: Skript, Schnitt, Caption, Freigabe | Idee, Weg-Hooks, Clips | Reel als MP4, Carousel als Fotoliste, Caption | `wb-content.jsx`, `wb-os-data.jsx`, `wb-reel.jsx` | Produktionslogik gut, Marke kommt im Beitrag kaum an |

### 1.2 Maßstab (Ableitung)

Was ein internationales Top-Studio bei einer Personenmarke liefert, als Prüfliste für dieses Dokument. Diese Liste ist eine eigene Ableitung aus den Liefergegenständen in `MARKENQUALITAET.md` Kapitel 1, ergänzt um die visuelle Seite, die dort nur als eine Zeile vorkommt.

1. Eine Idee, aus der Wort und Bild gemeinsam entstehen. Claim, Zeichen, Typografie und Bildsprache erzählen dieselbe Sache.
2. Ein eigenes, nicht austauschbares visuelles Asset je Kunde, kein Katalogteil.
3. Typografie mit Handschrift: gesetzte Wortmarke, Details wie Ziffern, Abstände, Gewichte bewusst gewählt.
4. Art Direction für Foto und Video mit Beispielen aus dem echten Material des Kunden.
5. Anwendungen, die das echte Geschäft zeigen: eigene Objekte, eigene Orte, eigenes Gesicht.
6. Ein Feed-Vorschlag, der den Start wirklich abbildet: Reihenfolge, Rhythmus, Mischung aus Gesicht, Beleg und Haltung.
7. Eine Quelle der Wahrheit, versioniert, vom Creative Director abgezeichnet, von allen Folgeschritten gelesen.

---

## 2. Schritt für Schritt

### 2.1 Fragebogen und Material

**Hinein:** Rund 45 Keys (MARKE_SCHEMA, Abschnitt Quellen), dazu Uploads in sechs Arten (`HM_MATERIAL_ARTEN`, `wb-os-data.jsx`).
**Heraus:** Antworten im Store, Material als verkleinerte Vorschau.

**Befund (belegt):**
- Die Materialseite verspricht: "Fließt in Farben, Bildwelt und Logo-Entscheidung ein" (`wb-marke.jsx` Zeile 36 und 64). Tatsächlich gehen an Claude nur Name und Art der Dateien (`wb-plattform.jsx` hmPfAnfrage, Zeile 1128), keine Bilder. Die Welt-Renderer nutzen das Material nicht.
- Die Logofarbe wird nie erkannt: `LogoFarbe` sucht Material der Art `"Logo"` (`wb-setup.jsx` Zeile 129), die Upload-Arten heißen aber `"Altes Logo"`. Das ist ein Fehler, keine Designfrage.
- Die Antwort "Behalten und schärfen" (Key `behalten`) steuert nur den Kopftext eines Fragebogen-Kapitels ("Wir schärfen, was da ist", `wb-flow.jsx` Zeile 125). Das Studio bietet danach nur drei neu gesetzte Namensformen an. Markus Leitner hat ein bestehendes Logo und will es schärfen (Seed `wb-store.jsx` Zeile 72), das Werkzeug kann das nicht.
- `vorbilder` fließt nur in die Trigramm-Zählung der Spezifität, `follower` gar nicht in die Marke.

**Schwächen:** Material ohne Wirkung, Logo-Erkennung defekt, Fragen ohne Einfluss auf den Output. Eine vollständige Liste, welche Frage welchen Output verändert, fehlt (Lücke).

### 2.2 Zwei Wege

**Hinein:** Antworten. **Heraus:** zwei Wege aus sechs Archetyp-Schablonen, Weg B auf einer anderen Achse (`wb-data.jsx` hmZweiWege, Zeile 305).

**Befund (belegt):**
- Die Hooks eines Wegs sind je Archetyp fest (`wb-data.jsx` ab Zeile 246). Jeder Kenner bekommt "Der häufigste Preisfehler in Wien." und "Warum das erste Angebot selten das beste ist."
- Die Leitidee ist je Archetyp fest (`wb-data.jsx` Zeile 36 bis 66), bei allen Kennern "Der Markt wird lesbar." Diese Leitidee wird über `hmBrand` zum Claim auf Visitenkarte, Signatur und Zitat-Kachel (siehe 2.6 und 3).
- Die Ansicht heißt "30 Hooks" und zeigt fünf (`wb-flow.jsx` Zeile 203).
- Die drei Positionierungs-Territorien, die ein Studio an dieser Stelle zeigt, gibt es nur im Claude-Pfad (Schritt 2 der Kette), nicht im Regelpfad und nicht in der Oberfläche.

**Schwächen:** Die Wahl zwischen A und B ist eine Wahl zwischen zwei Schablonen. Die festen Hooks und Leitideen wandern später unverändert bis in den Beitrag.

### 2.3 Workshop: Leitfaden und Mitschrift

**Hinein:** Antworten, Audio. **Heraus:** Leitfaden in drei Gruppen, Mitschrift mit Zitaten und Aufgaben (`wb-strategie.jsx`).

**Befund (belegt):** Der Leitfaden fragt gezielt nach Lücken (Fremdbild, Geschichte, Anrede, Kanäle). Die Mitschrift läuft lokal. Zitate werden über Stichwörter gesucht ("kunden", "immer", "nie", "ehrlich", Zeile 89), ohne Sprecher. Die Plattform liest Zitate des Maklers nur, wenn das Transkript Sprecher mit Namen trägt (`wb-plattform.jsx` hmPfZitate, Zeile 301). Die Whisper-Mitschrift liefert Zeitcodes statt Sprecher (`wb-strategie.jsx` Zeile 116).

**Schwächen:** Die eigenen Worte des Maklers, laut Qualitätsstandard der wichtigste Rohstoff, kommen aus dem Workshop nur zufällig in die Plattform. Kein Workshop-Teil zur visuellen Richtung (Bildbeispiele, Moodboard, Reaktion auf Welten).

### 2.4 Markenplattform

**Hinein:** Dossier. **Heraus:** `plattform` nach MARKE_SCHEMA.

**Befund Regelpfad (belegt):**
- Die Bausteine sind je Archetyp vorformuliert (`HM_PF_FIGUR`, `wb-plattform.jsx` Zeile 207 bis 280). Für Kenner mit Warte-Geschichte steht wörtlich die Haltung aus dem Musterbeispiel im Code: "Ein Haus verkauft man einmal. Die Entscheidung davor verdient mehr Zeit als das Inserat." (Zeile 213) und der Claim "Zeit ist Teil des Preises." (Zeile 215).
- Folge (Ableitung): Der zweite Kenner mit einer Warte-Geschichte bekommt denselben Claim und dieselbe Haltung wie Markus Leitner. Die Unterscheidbarkeitsprüfung merkt das erst, wenn beide im selben Store liegen (Zeile 989).
- Das Musterbeispiel in Kapitel 5 und die Regelausgabe für Markus liegen nah beieinander, weil die Regeln an ihm entwickelt wurden. Das belegt Niveau für einen Fall, nicht für die Breite (Ableitung).
- Die Bildwelt der Plattform (`hmPfVisuell`, Zeile 808) übernimmt die Welt aus `hmWeltVorschlag` und ergänzt Orte und Grenzen als Text. Sie kann Farbe, Schrift, Raster und Zeichen nicht verändern.

**Befund Claude-Pfad (belegt):** Die Kette in `api/wb-marke.js` kennt drei Phasen (`gate1`, `plattform`, `voll`). `hmPlattformEinsichtClaude` für Gate 1 wird von keiner Oberfläche aufgerufen (Suche im Code, nur Export in Zeile 1292). "Neu erzeugen" im Markenbuch ruft `hmPlattformClaude(m.id)` ohne Freigabe auf, also Phase `voll` (`wb-markenbuch.jsx` Zeile 48). Gate 1 aus MARKENQUALITAET Kapitel 2 findet damit heute nicht statt. Die Claude-Kette wurde für dieses Dokument nicht ausgeführt (Lücke).

**Schwächen:** Schablonen mit Musterbeispiel-Sätzen im Regelpfad, kein Gate 1 in der Oberfläche, Bildwelt nur als Text, keine Territorien ohne Claude.

### 2.5 Qualitätsprüfung

**Hinein:** Plattform. **Heraus:** Note und fünf Kriterien (`hmMarkenQualitaet`, Zeile 996).

**Befund (belegt):**
- Spezifität zählt Ort, Ziffer oder ein Wort-Trigramm aus den Freitexten (Zeile 1022). Eine Vorlage, die den Bezirksnamen einsetzt, besteht.
- Glaubwürdigkeit prüft Zahlen gegen das Dossier, erlaubt aber pauschal 1 bis 6, 10, 24, 30, 48, 60, 90 und 2026 (Zeile 1045). "3 Zahlen" und "60 Sekunden" fallen nie auf.
- Unterscheidbarkeit vergleicht nur Text und nur mit den anderen Maklern im Store (Zeile 1036). Ohne andere Plattform steht der Wert fest auf 70.
- Es gibt kein Kriterium für Gestalt: kein Konzeptbezug zwischen Claim und Zeichen, keine visuelle Unterscheidbarkeit, kein Gesichtsanteil, keine Qualität der Anwendungen.
- Stand der Demo laut Doku: Markus 95, Elif 96 (MARKENQUALITAET Kapitel 3). Ableitung: Eine Regelausgabe mit 95 von 100 zeigt, dass die Skala oben gesättigt ist und Musterbeispiel und Schablone nicht trennt.

**Schwächen:** Das Instrument misst Regelkonformität und wird als Qualitätsnote gelesen.

### 2.6 Branding-Studio

**Hinein:** gewählter Weg, Material, Porträt. **Heraus:** `branding[mid]` mit Logo-Typ, Schrift, Akzent, Leitidee, Status (`wb-marke.jsx` Studio, Zeile 69).

**Befund (belegt):**
- Auswahl aus 3 Logo-Typen (Wortmarke, Monogramm im Kreis mit Akzentpunkt, Name mit Akzentpunkt, `wb-os-data.jsx` Zeile 87), 5 Schriftpaaren aus Google Fonts (Fraunces, Playfair Display, DM Serif Display, Space Grotesk, Power Grotesk mit Hanken Grotesk oder Manrope, Zeile 57) und 7 Akzenten (Zeile 64). Eine Wortmarke ist der Name in dieser Schrift, mit Nachname fett (`wb-ui.jsx` BrandLogo).
- Die Vorschau-Kachel "Wie ich arbeite" setzt eine kleine Mono-Zeile über den Hook (`wb-marke.jsx` Zeile 98). Das ist eine Eyebrow im Ergebnisdesign und verstößt gegen die UNIO-Regel.
- Die Vorschau-Posts zeigen die festen Weg-Hooks (`w.hooks[0]`, `w.hooks[1]`, Zeile 97 und 98), nicht die Serien der Plattform.
- Visitenkarte und Signatur im Studio sind eigene Komponenten (`Visitenkarte`, `hm-mock-sig`), nicht die Welt-Renderer. Das Brand-Kit exportiert eine feste Palette Grund #F7F5F1, Text #0B0A09, Fläche #F0EDE6, Linie #D1D3D5 (Zeile 154 und 187), unabhängig von der Welt.
- Das Studio kommt in der Kette vor dem Markenbuch (`wb-marke.jsx` Zeile 11). Der Makler gibt sein Branding frei, bevor er seine Welt sieht.
- Der Makler-Seed sagt "Der Amber-Ton darf etwas zurückhaltender sein" (`wb-store.jsx` Zeile 103). Feinabstimmung ist nicht möglich, es gibt nur die sieben festen Töne.

**Schwächen:** Konfigurator statt Identität, keine eigene Wortmarke, kein Umgang mit Bestandslogos, Eyebrow im Mock, zweites Designsystem neben den Welten, falsche Reihenfolge der Freigaben.

### 2.7 Markenwelten

**Hinein:** Branding (Akzent, Schrift, Logo, Porträt), Antworten (Bildpaare, Zeichen-Wunsch, Regler). **Heraus:** eine von sechs Welten und Renderer (`wb-markenwelten.jsx`).

**Befund (belegt):**
- Sechs Welten mit Idee, Zeichen, Farbrollen, Proportion, Bildsprache, Raster und Website-Look (Zeile 12 bis 109). Kontraste und Umbrüche werden gerechnet, nicht geschätzt (Zeile 170, 245). Keine Glyphen als Icons, keine Verläufe.
- Das Zeichen ist je Welt fest ("Das Fenster 3:4", "Die Folio-Zeile", "Die Grätzl-Linie", "Das Schriftfeld", "Der Bogen", "Die Kante"). Nur die Grätzl-Linie wird je Makler aus Name und Bezirk errechnet (Zeile 425).
- Der Vorschlag rechnet Punkte aus Archetyp, Bildpaaren, Zeichen-Wunsch und zwei Reglern (`hmWeltVorschlag`, Zeile 1203). Positionierung, Claim und Territorium gehen nicht ein.
- Nachrechnung für Markus Leitner (Ableitung aus Zeile 1203 bis 1226 und Seed Zeile 72, nicht im Browser geprüft): Kontrast 62, Maßstab 55, Weite 53, Feuilleton 48 Punkte. Vorschlag: Kontrast, Zeichen "Die Kante" im Goldenen Schnitt. Sein Claim "Zeit ist Teil des Preises." hat mit einer Hell-Dunkel-Kante nichts zu tun. Ein Studio hätte die Idee Zeit oder Zeitpunkt ins Zeichen übersetzt (Ableitung).
- Vier der sechs Welten passen zum Kenner (`passtZu`). Zwei Kenner in derselben Welt unterscheiden sich sichtbar nur durch Name und einen von sieben Akzenten (Ableitung).
- Die Objekt-Kacheln nehmen die neun UNIO-Demo-Objekte aus `hmWebObjekte` (`wb-marke.jsx` Zeile 196), in fester Reihenfolge je Welt (`HM_WELT_STIL`, Zeile 114). Bilder aus der Bildwelt-Brücke und eigene Objekte fließen nicht ein.
- Objekt-Posts zeigen Fläche, Zimmer, Preis, aber keine Energiekennzahlen. Nur das Exposé hat eine Zeile "Energieausweis: HWB und Klasse folgen" (Zeile 310). BENCHMARK_MARKE (0.1 und 3.3) nennt HWB und Klasse seit 01.07.2026 als Pflicht auch in Social-Posts, Quelle dort: https://www.energieausweis360.at/energieausweis-neuerungen-2026 und https://www.ovi.at/recht/energieausweis/informationspflicht-in-medien
- Post-Format 1080 × 1350 (MARKE_SCHEMA), das Benchmark empfiehlt 1080 × 1440 als Primärformat (BENCHMARK_MARKE 4.4, Quelle https://buffer.com/resources/instagram-image-size/). Der Feed schneidet 4:5 auf 3:4 zu (Zeile 1082).

**Schwächen:** Katalog statt Konzept, Zeichen gehört der Welt, Vorschlag ohne Bezug zur Positionierung, fremde Objekte, fehlende Pflichtangaben.

### 2.8 Markenbuch und Gate 2

**Hinein:** Plattform, Welt, Branding. **Heraus:** zehn Kapitel, Anwendungen, Materialpaket, Freigabe (`wb-markenbuch.jsx`).

**Befund (belegt):**
- Die Gliederung entspricht einem Agentur-Markenbuch. Lücken stehen sichtbar als "Kommt aus dem Workshop".
- Die Freigabe schreibt nur einen Status (`hmMbSetzen`, Zeile 64). Sie speichert keine Plattform-Version. Ist nichts gespeichert, erzeugt `hmMbPlattform` die Plattform bei jedem Aufruf neu aus den Antworten (Zeile 18). Ändert sich danach eine Antwort, ändert sich das freigegebene Markenbuch still mit.
- Gate 2 laut Doku: mindestens 80, kein Kriterium unter 60, keine Klischees, Lautlese-Test (MARKENQUALITAET Kapitel 2). Im Code: "Bereit zur Freigabe" ab 75, der Knopf sperrt nur bei Klischees (Zeile 63 und 64). Lautlese-Test und Zahlenprüfung stehen nirgends in der Oberfläche.
- Kein Text lässt sich im Markenbuch bearbeiten. Der Creative Director kann nur neu erzeugen, nicht einen Satz korrigieren.
- Die Längenangaben stimmen nicht mit dem Datenvertrag: "50 Wörter" über `story.mittel` (Vertrag 70 bis 100) und "Über mich, 150 Wörter" über `story.lang` (Vertrag 160 bis 220, Zeile 100 und 101). "Über mich" ist im Vertrag `botschaften.ueberMich`, die Website nimmt `story.mittel` als Bio (`wb-marke.jsx` Zeile 131).
- Die Welt-Wahl im Markenbuch überschreibt Schrift im Branding und Look der Website ohne Statuswechsel (Zeile 115). Ein freigegebenes Branding ändert sich damit, ohne dass jemand neu freigibt.
- Karte, Signatur und Zitat-Kachel zeigen `b.claim`, also die Weg-Leitidee oder den Studio-Text, nicht `plattform.botschaften.claim`. Die Story zeigt den Plattform-Claim (Zeile 119). Auf derselben Seite stehen damit bei Markus zwei Claims: "Zeit ist Teil des Preises." und "Der Markt wird lesbar." (Ableitung aus `wb-ui.jsx` Zeile 29 und `wb-data.jsx` Zeile 36).
- Das Materialpaket exportiert die Markenbuch-Vorschauen als PNG (`wb-material.jsx` Zeile 70), also auch Demo-Objekte und Fülltexte.

**Schwächen:** Freigabe ohne Version, weiches Gate, keine Redaktion, widersprüchliche Claims, stille Überschreibung, Export von Platzhaltern.

### 2.9 Monatsideen (Produktion)

**Hinein:** Weg aus `hmBrand` (nicht die Plattform), Bestand, Anlässe Q4. **Heraus:** Ideen mit Titel, Hook, Säule, Format (`wb-produktion.jsx` hmIdeen, Zeile 154).

**Befund (belegt):**
- Die Ideen kommen aus `HM_IDEEN_VORLAGEN` (Zeile 82), je Säule fünf Muster mit zwei Varianten, gefüllt mit Bezirk und Jahr. Beispiele: "Mein Dienstag in 5 Stationen.", "Mythos: Im Winter verkauft sich nichts", "3 Zahlen, die [Bezirk] gerade verändern."
- Serienname, Hook-Formel, Rhythmus, Beispielbeiträge und Startplan aus dem Markenbuch werden nicht gelesen. Die Serie "Noch nicht verkaufen" aus Kapitel 5 kommt in der Produktion nicht vor.
- Anlässe (Heizsaison, EZB, Martini) sind sinnvoll und datiert, gelten aber für alle Makler gleich.

**Schwächen:** Hier reißt die Kette. Die teuerste Arbeit (Plattform, Serien, Konzepte) hat keinen Weg in den Monatsplan.

### 2.10 Beitrag: Skript, Schnitt, Caption, Freigabe, Reel, Carousel

**Hinein:** Idee, Weg, Clips. **Heraus:** Reel als MP4, Carousel als Fotoauswahl, Caption, Freigabe (`wb-content.jsx`, `wb-os-data.jsx`, `wb-reel.jsx`).

**Befund (belegt):**
- Skript-Vorschläge: "Hooks aus deiner Strategie" sind die festen Weg-Hooks (`wb-content.jsx` Zeile 78).
- Der Skript-Check verlangt Zahl oder Frage im ersten Satz und eine Frage oder Handlung am Ende (`wb-os-data.jsx` Zeile 188 und 190). Hooks aus dem Markenbuch wie "Ich habe vom Verkauf abgeraten. Hier ist die Rechnung." fallen damit durch.
- Die Caption ist eine Formel: Hook, dann "Was würdest du anders machen? Schreib es mir." oder "Wie sehen Sie das? Schreiben Sie mir.", dann Bezirks-Hashtags plus #Immobilien #Wien (`hmCaption`, Zeile 210). Die Stimme aus dem Markenbuch (Beispiele "so und nicht so", Handlungsaufrufe wie "Schicken Sie das an Ihre Miterben.") wird nicht genutzt.
- Die Wirkungs-Prognose gibt Persönlich und Markt mehr Punkte als Wie ich arbeite (`hmViralScore`, Zeile 205). Das widerspricht der Pflichtsäule und der Reihenfolge Kompetenz vor Persönlichem.
- Der Reel-Renderer liest Serienname und Claim aus der Plattform (`wb-reel.jsx` Zeile 12 bis 20), aber keine Welt: Untertitel und Endkarte folgen Akzent und Schrift aus dem Branding.
- Carousels und Bildbeiträge haben keinen Renderer. Phase 2 wählt Fotos, die Vorschau zeigt sie roh (`wb-content.jsx` Vorschau). Die Welt-Renderer werden nur im Markenbuch verwendet (Suche: `WeltPost` nur in `wb-markenbuch.jsx` und `wb-markenwelten.jsx`).
- Drei Anrede-Logiken laufen nebeneinander: `hmPfAnrede` in der Plattform, `hmAnredeVon` in der Produktion, `w.anrede` direkt in Caption und Reel. Bei der Regel "Du auf Instagram, Sie auf LinkedIn" setzt `hmWeg` `anrede` auf "Du" (`wb-data.jsx` Zeile 244), Caption und Reel duzen dann auch auf LinkedIn (Ableitung aus `wb-os-data.jsx` Zeile 212 und `wb-reel.jsx` Zeile 14).

**Schwächen:** Der Beitrag, den das Publikum sieht, trägt weder die Stimme noch die Gestalt der Marke. Das Erscheinungsbild der Welt endet im Markenbuch.

---

## 3. Wo die Kette bricht: Widersprüche und Übergaben

| Thema | Stelle A | Stelle B | Folge |
|---|---|---|---|
| Claim | `plattform.botschaften.claim` (Markenbuch, Website-Headline) | `b.claim` = Studio-Text oder Weg-Leitidee (Karte, Signatur, Zitat-Kachel, Studio) | Zwei Claims je Makler, bei allen Kennern "Der Markt wird lesbar." auf der Karte |
| Hooks | Serienbeispiele in der Plattform | feste Weg-Hooks in Studio, Skript-Vorschlag, Welt-Fallback (`wb-markenwelten.jsx` Zeile 1048) | Produktion klingt wie jeder andere Kenner |
| Ideen | Serien und `start30` | `HM_IDEEN_VORLAGEN` | Markenbuch und Monatsplan sind zwei Programme |
| Palette | Welt-Farben (bei Kontrast Grund #131211) | Brand-Kit fest #F7F5F1 und #0B0A09 | Dienstleister bekommen falsche Farben |
| Visitenkarte | `Visitenkarte` im Studio | `WeltKarte` im Markenbuch | Zwei Karten für denselben Makler |
| Schrift | Studio-Empfehlung je Archetyp | Welt-Schrift überschreibt nach der Freigabe | Freigegebenes Branding ändert sich still |
| Freigabe | Markenbuch-Status "freigegeben" | Plattform nicht gespeichert, wird neu erzeugt | Freigabe gilt für einen Text, der sich ändern kann |
| Website | Kommentar "Aus dem freigegebenen Markenbuch" (`wb-marke.jsx` Zeile 116) | Bedingung prüft nur, ob ein Eintrag existiert (Zeile 117) | Ungeprüfte Texte gehen auf die Website |
| Gate 2 | Doku: 80, kein Kriterium unter 60 | Code: 75, nur Klischees sperren | Gate ist weicher als beschrieben |
| Gate 1 | Doku: Pflicht vor Schritt 4 | keine Oberfläche, Regelpfad ohne Territorien | Einsicht und Positionierung werden nie abgezeichnet |
| Story-Längen | Vertrag 70 bis 100 und 160 bis 220 Wörter | Markenbuch zeigt "50" und "150" | Team schreibt auf falsche Länge |
| Anrede | Plattform je Kanal | Caption und Reel nur `w.anrede` | Du auf LinkedIn trotz Regel |
| Gesicht | Plattform und Strategie: Gesicht zuerst, Quartals-Ziel 70 Prozent Gesicht (`wb-strategie.jsx` Zeile 190) | Feed-Muster jeder Welt: ein Porträt in neun Kacheln (`HM_WELT_STIL`) | Der Vorschlag widerspricht der eigenen Regel |
| Wirkung | Pflichtsäule Wie ich arbeite, Kompetenz vor Persönlichem | Prognose belohnt Persönlich und Markt | Team optimiert gegen die Strategie |
| Objekte | Positionierung Döbling, Währing, Hietzing, Zinshaus | Demo-Objekte Innere Stadt, Wieden, Donaustadt | Anwendungen zeigen ein fremdes Geschäft |

---

## 4. Der Feed-Vorschlag im Detail

So entsteht die Profil-Vorschau im Markenbuch (belegt): `wb-markenbuch.jsx` Zeile 118 reicht die ersten neun Serienbeispiele der Plattform in Säulenreihenfolge weiter, ohne `art`. `hmWeltFeedPosts` (`wb-markenwelten.jsx` Zeile 1062) legt das feste Muster der Welt zugrunde und setzt diese Texte nur in die Plätze vom Typ `hook` und `serie`. Alle anderen Plätze füllt `hmWeltPostDaten` (Zeile 1045) mit Vorgaben.

Nachrechnung für Markus Leitner in der Welt Kontrast (Ableitung, nicht im Browser geprüft; Annahme: Weg A ist Kenner mit Markt 35 Prozent als größter Säule, `wb-data.jsx` Zeile 32):

| Platz | Art im Muster | Inhalt |
|---|---|---|
| 1 | hook, Porträt | erstes Beispiel der Serie "Sievering in Zahlen" |
| 2 | objekt | Demo-Objekt "Penthouse am Ring", Innere Stadt, € 3.450.000 |
| 3 | zahl | "3" und "Fehler, die ich bei fast jedem Verkauf sehe." (Vorgabe, Zeile 1057 und 1058, bei jedem Makler gleich) |
| 4 | zitat | `b.claim`, also "Der Markt wird lesbar." |
| 5 | objekt | Demo-Objekt "Das Albrecht, Dachgeschoss", Wieden |
| 6 | hook | zweites Beispiel derselben Serie |
| 7 | objekt | Demo-Objekt "EcoLuxe, Erstbezug", Donaustadt |
| 8 | serie | drittes Beispiel derselben Serie, Folge "01" |
| 9 | objekt | Demo-Objekt "Das Albrecht, Wohnen", Wieden |

Urteil (Ableitung):
- Drei von neun Kacheln tragen Inhalt aus der Plattform, alle aus einer Serie. Die Signatur-Serie "Noch nicht verkaufen", der Beleg "zwei Jahre warten, 600.000 mehr" und die Pflichtsäule Wie ich arbeite fehlen.
- Vier Kacheln zeigen Objekte, die nicht seine sind, aus Bezirken, in denen er nicht arbeitet, ohne Energiekennzahlen.
- Eine Kachel ist ein Fülltext, der auf jeden Makler passt. Das ist genau der Satz, den der Qualitätsstandard verbietet ("Würde ein Satz auch auf einen anderen Makler passen, ist er falsch").
- Ein Gesicht in neun Kacheln, obwohl Markus vor allem Talking Head und Frage und Antwort macht (Seed `formate`). Es gibt keine Video-Cover, keine Carousel-Folgeseiten, keine Captions.
- Die Reihenfolge folgt dem Muster der Welt, nicht dem Startplan `start30`. Die Vorschau zeigt also nicht, wie das Profil nach vier Wochen aussieht.
- Die Folio-Nummern laufen rückwärts ab 24 (Zeile 1059), ein Profil mit 24 Beiträgen, das es nicht gibt.

Handwerklich ist der einzelne Post sauber gesetzt: Raster, Umbruch, Kontrast, Tabellenziffern. Als Vorschlag für einen Feed trägt er nicht.

---

## 5. Erlebnis des Maklers

Belegt aus `wb-marke.jsx` Zeile 11 bis 24 und den jeweiligen Komponenten:

1. Fragebogen, dann zwei Wege mit sofortigem Ergebnis ("Das dauert keine Sekunde", `wb-flow.jsx` Zeile 160).
2. Design: Logo-Typ, Schrift, Akzent wählen und freigeben, bevor das Markenbuch existiert.
3. Markenbuch: liest es als Entwurf, kann die Welt wählen, solange nicht freigegeben. Bearbeiten oder kommentieren kann er nicht.
4. Website.
5. Später je Beitrag: "Passt das so?" mit Freigabe oder Änderungswunsch, automatische Freigabe nach Frist.

Ableitung:
- Der Makler trifft Gestaltungsentscheidungen (Schrift, Farbe, Logo-Form), die ein Studio nie an den Kunden delegiert, und sieht die eigentliche Idee (Welt, Zeichen, Feed) erst danach.
- Er sieht sich im Markenbuch mit fremden Objekten und einem fremden Fülltext. Das kostet Vertrauen im wichtigsten Moment der Kette.
- Er gibt Beiträge frei, die nicht wie sein Markenbuch aussehen.
- Welche Fragen im Fragebogen den Output wirklich verändern, ist nicht dokumentiert (Lücke). Mindestens `behalten`, `vorbilder`, `follower` und die Material-Uploads verändern die Marke heute nicht (belegt in 2.1).

---

## 6. Schwächen je Schritt, kompakt

| Schritt | Schwächen |
|---|---|
| Fragebogen und Material | Material fließt nicht in Gestalt; Logo-Erkennung defekt (`"Logo"` statt `"Altes Logo"`); "Behalten und schärfen" ohne Wirkung; Fragen ohne Einfluss |
| Zwei Wege | Archetyp-Schablonen; feste Hooks und Leitideen je Figur; "30 Hooks" zeigt fünf; keine Territorien ohne Claude |
| Workshop | Zitate ohne Sprecher, darum selten in der Plattform; kein Teil zur visuellen Richtung |
| Plattform | Musterbeispiel-Sätze fest im Regelcode; Gate 1 ohne Oberfläche; "Neu erzeugen" überspringt Gate 1; Bildwelt nur als Text |
| Qualitätsprüfung | misst Regeln, nicht Qualität; Zahlen-Whitelist; Unterscheidbarkeit nur Text und nur im Store; kein visuelles Kriterium; Skala gesättigt |
| Branding-Studio | Konfigurator aus 5 Schriften, 7 Farben, 3 Logo-Formen; keine eigene Wortmarke; Eyebrow im Mock; feste Palette im Kit; Freigabe vor der Welt |
| Markenwelten | Zeichen gehört der Welt; Vorschlag ohne Bezug zur Positionierung; Demo-Objekte; keine Energiekennzahlen im Post; Bildwelt-Ergebnisse fließen nicht ein |
| Markenbuch | Freigabe ohne Version; Gate weicher als Doku; keine Redaktion; zwei Claims; stille Überschreibung von Schrift und Look; falsche Längenangaben; Export von Platzhaltern |
| Monatsideen | liest die Plattform nicht; allgemeine Vorlagen für alle Makler |
| Beitrag | Weg-Hooks statt Serien; Caption-Formel; Skript-Check gegen Plattform-Hooks; Prognose gegen Pflichtsäule; kein Welt-Renderer für Carousel und Grafik; drei Anrede-Logiken |
| Feed | drei von neun Kacheln aus der Plattform; fremde Objekte; Fülltext; ein Gesicht; nicht aus `start30`; erfundene Folio-Nummern |

---

## 7. Die fünf größten Hebel

1. **Eine freigegebene, versionierte Markenquelle für alle Abnehmer.** Die Freigabe im Markenbuch speichert eine Plattform-Version samt Welt, Claim, Palette und Anrede-Regel. Studio, Brand-Kit, Welt-Renderer, Website, Monatsideen, Caption und Reel lesen nur diese Version. Eine Anrede-Funktion, ein Claim, eine Palette. Das beseitigt die meisten Widersprüche aus Kapitel 3 auf einmal.
2. **Art Direction aus dem Territorium statt Katalogwahl.** Gate 1 bekommt eine Oberfläche mit drei Territorien, jedes mit Wort und Bild: Claim, Zeichenidee, Typografie, Bildbeispiel aus dem echten Material. Das Zeichen gehört dem Makler, die Welt liefert nur die Grammatik. Wortmarke und Bestandslogo werden gestaltet, nicht gewählt. Der Makler reagiert auf eine kuratierte Richtung, statt Schrift und Farbe selbst zu wählen.
3. **Ein Feed-Vorschlag, der den Start wirklich zeigt.** Die Vorschau wird aus `start30` in echter Reihenfolge gebaut, mit Beiträgen aus allen Serien, Video-Covern mit Gesicht (Richtung Quartals-Ziel 70 Prozent), eigenen Objekten mit Energiekennzahlen, Carousel-Folgeseiten und Caption je Beitrag in der Stimme der Plattform. Keine Vorgabetexte, keine Demo-Objekte; fehlt Material, bleibt die Kachel sichtbar als Lücke.
4. **Produktion an die Plattform koppeln.** Monatsideen entstehen aus Serien, Hook-Formeln, Rhythmus und Konzepten. Skript-Check und Caption folgen den Regeln und Beispielen der Stimme. Carousels, Bildbeiträge und Reel-Endkarten laufen durch die Welt-Renderer (Ebenen-Vertrag wie in BENCHMARK_MARKE 4.3). Die Wirkungs-Prognose kennt Pflichtsäule und Pratfall-Reihenfolge.
5. **Werkzeuge für den Creative Director und ein Gate, das hält.** Sätze im Markenbuch lassen sich redigieren, jede Änderung wird eine Version. Gate 2 sperrt nach den dokumentierten Schwellen und führt Lautlese-Test und Zahlenprüfung als Checkliste. Die Qualitätsprüfung bekommt Kriterien für Konzeptbezug, visuelle Unterscheidbarkeit, Gesichtsanteil und Gleichklang mit den Archetyp-Schablonen und dem Musterbeispiel, damit 95 von 100 wieder etwas bedeutet.

---

## 8. Was gut ist und bleiben soll

- Datenvertrag `plattform` mit Story in drei Längen, Serien, Konzepten und Startplan.
- Sichtbare Lücken statt erfundener Inhalte.
- Floskel-Liste, Anrede je Kanal, Pratfall-Regel, Kompetenz vor Persönlichem.
- Die Renderer-Technik: SVG, gemessene Umbrüche, Kontrastrechnung, Tabellenziffern, feste Formate.
- Die Idee der Zeichen je Welt als Grammatik.
- Musterbeispiel Markus Leitner als Zielbild für die Textebene.

---

## 9. Lücken dieser Bestandsaufnahme

- Nichts davon wurde im Browser gerendert. Feed und Weltvorschlag für Markus sind aus dem Code nachgerechnet.
- Die Claude-Kette (`api/wb-marke.js`) wurde nicht ausgeführt, nur die Phasenlogik gelesen. Wie nah die Claude-Plattform am Musterbeispiel liegt, ist offen.
- Ein belegter Vergleich mit internationalen Top-Studios fehlt im Repo. `BENCHMARK_MARKE.md` vergleicht Werkzeuge (Looka, Brandmark, Canva, Frontify), nicht Studios. Der Maßstab in 1.2 ist darum eine eigene Ableitung.
- Keine Aussage über echte Makler außerhalb der Demo-Seeds. Wie viele Kenner mit Warte-Geschichte es im Bestand gibt, ist nicht bekannt.
- Eine vollständige Zuordnung Frage zu Output (welche der rund 45 Antworten welchen Text oder welche Gestalt verändert) fehlt.
- `wb-bildwelt.jsx` nur überflogen: Die Brücke erzeugt Aufträge aus Bildsprache und Welt, ihre Ergebnisse fließen nicht in die Welt-Renderer.
