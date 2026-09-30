# Schritt 10. Designsystem (`system`)

Stand 30.09.2026, Fassung 2. Entwurf für Branding v2, Teilschritt 10 von 17, zur Freigabe durch den Owner.

**Was sich gegenüber Fassung 1 geändert hat.** Achsen aus dem geschlossenen Katalog von Schritt 9 (10.9). Markus-Beispiel baut jetzt auf dem Beispiel in `09_idee.md` 3.11 auf: Idee "Neben jedem Preis steht seine Zeit.", Zeichen "Das Zeitmaß", Achse `tonwert`. Damit entfällt der Befund "Drei Zeichen für eine Marke" aus `14_markenbuch.md`. Handschrift trennt Pflege von Erkennung (E1, S2). Farbe als Rollensatz je Tonwert, Proportion getrennt für Feed und Druck (10.5). Namensraum und Pin-Zuordnung für den Spielraum (10.7). Motion-Tokens für Reels (10.7). Rechte- und Einwilligungsprüfung für Porträt und Objektfotos (10.0, S1). Kennzahl-Regel für Millionenpreise entschieden (10.2). Formähnlichkeit gegen die Kohorte als S21. Kontrastfehler korrigiert: #191714 auf #E1901F ergibt 6,99:1, nicht 6,56:1. Muster der Anwendungsleiste unter `schritte/muster/10_anwendungsleiste.html`.

Grundlagen: `00_ZERLEGUNG.md` (Kapitel 3.10 und 5), `bestand/KETTE_IST.md`, `bestand/FRAGEN_WIRKUNG_IST.md`, `research/R1-studios.md` bis `research/R8-kundenerlebnis.md`, `docs/werkbank/research/BENCHMARK_MARKE.md`, `docs/werkbank/MARKE_SCHEMA.md`, `docs/werkbank/MARKENQUALITAET.md` (Kapitel 5, Musterbeispiel Markus Leitner). Code gelesen: `wb-markenwelten.jsx`, `wb-ui.jsx` (`hmBrand`, `BrandLogo`), `wb-marke.jsx` (Studio, Brand-Kit), `wb-os-data.jsx` (`HM_WEB_SCHRIFTEN`, `HM_WEB_AKZENTE`, `HM_LOGO_TYPEN`), `wb-store.jsx` (Seed Markus), `api/wb-marke.js`.

**Lesart** wie in der Zerlegung. *Belegt*: steht in einer Quelle mit URL oder in einer genannten Datei. *Ableitung*: eigene Folgerung. *Setzung*: bewusst festgelegter Startwert, der an den ersten Maklern gemessen und ersetzt wird. *Lücke*: wir wissen es nicht. Alle Farbwerte und Kontraste im Beispiel sind mit der WCAG-Formel nachgerechnet (dieselbe Formel wie `hmWeltKontrast`), die OKLCH-Werte sind Arbeitswerte des Verfassers.

---

## Kurzfassung

1. **Handsatz mit Regelprüfung.** Ein Designer setzt den Kern von Hand: Wortmarke, Zeichen, Schriftwahl, Farbrollen. Regeln rechnen alles Messbare: Tokens, Kontraste, Größenleiter, sichere Zonen, Stresstest, Kohorte. Claude schreibt und prüft die Begründungen, zeichnet aber nie. Das ist das Muster, mit dem Studios generieren, ohne generisch zu werden: handgemachter Kern, Maschine nur entlang benannter Achsen (R4 1.6).
2. **Eine Quelle.** Alles landet als Tokens im W3C-Format 2025.10 in drei Ebenen (Grundwert, Bedeutung, Bauteil), jedes Token mit einem Satz "warum" und einer Quelle. Brand-Kit, Website, Karte, Signatur, Welt-Renderer und Reel lesen nur diese Tokens. Die feste Palette im Brand-Kit und die zweite Visitenkarte verschwinden (KETTE_IST 3).
3. **Handschrift ist prüfbar.** Pflege (Kerning, optische Größe, Wortabstand) ist Pflicht und zählt nicht. Eine Wortmarke gilt erst als gesetzt, wenn sie mindestens einen Erkennungseingriff trägt: bei 40 px sichtbar, in einem Satz aus `idee.zeichen` oder `brief.kernsatz` herleitbar und in der Kohorte formfremd. Name plus Unterstreichung, Punkt oder Kreis fällt durch.
4. **Farbe begleitet, rechnerisch erzwungen.** Farbe ist ein Rollensatz je Tonwert (hell und dunkel), jede Rolle mit Kontrastmatrix. Wo ein Ton die Schwelle nicht schafft, darf er keine Information tragen. Die Proportion steht getrennt für Feed und Druck. Jedes Grundlayout muss in Graustufen erkennbar bleiben.
5. **Gegenentwurf in Anwendungstiefe.** Dieselbe Pipeline für den Gegenentwurf, ein automatischer Vergleich stellt sicher, dass er sich nur in den Feldern der Achse aus dem geschlossenen Katalog von Schritt 9 unterscheidet.
6. **Der Makler investiert keine Minute.** Keine Frage, keine Wahl. Wünsche wie "der Amber-Ton darf zurückhaltender sein" kommen über die Rückmeldung in Schritt 15 und werden im vorab definierten Spielraum umgesetzt.

---

## 1. Ziel und Erfolgskriterium

**Ziel.** Die visuelle Idee aus Schritt 9 wird ein System, das ein Senior-Designer als handgesetzt erkennt und das jeder Abnehmer ohne Rückfrage anwendet: eine gesetzte oder geschärfte Wortmarke mit Monogramm, das Zeichen des Maklers als Vektor mit Regeln je Format, eine Typografie mit höchstens einer Display- und einer Textfamilie, Farbe mit Rollen und Proportion, Raster und sichere Zonen für alle Formate vom Profilbild bis zum Verkaufsschild. Alles als Tokens mit Begründung und Sperrstufen, für Empfehlung und Gegenentwurf. Der Konfigurator aus 3 Logo-Typen, 5 Schriftpaaren und 7 Akzenten (`wb-os-data.jsx` Zeile 57 bis 91) entfällt für den Makler.

**Erfolgskriterien.**

| Nr. | Kriterium | Messung | Schwelle | Art |
|---|---|---|---|---|
| E1 | Handschrift der Wortmarke | `system.wortmarke.herleitung.eingriffe[]` mit `klasse` pflege oder erkennung | Pflege vollständig (Kerning, optische Größe, Wortabstand, je mit Messwert); mindestens ein Erkennungseingriff, der drei Bedingungen erfüllt: (a) sichtbar bei 40 px Kegel, gemessen als Pixelabweichung gegen denselben Namen im Standardsatz der Familie, (b) Herleitung in einem Satz mit Quelle `idee.zeichen` oder `brief.kernsatz`, (c) formfremd in der Kohorte (S21 und keine gleiche `kategorie` im selben oder angrenzenden Bezirk); CD bestätigt die Wirkung am Render. Nie als Erkennung zählbar: Unterstreichung, Punkt, Kreis, fetter Nachname, Farbwechsel im Namen | Setzung |
| E2 | Schärfen mit Maß | bei `typ` geschärft: Befund je tragendem Merkmal des Bestandslogos | mindestens zwei von drei tragenden Merkmalen bleiben erkennbar | Setzung, gestützt auf Walsh, Winterich, Mittal 2010 (R8) |
| E3 | Trägt vom Profilbild bis zum Schild | Render jeder Variante in der Größenleiter 16 px, 40 px, 110 px, Karte 85 mm, Exposé A4, Schild | jede Stufe lesbar, keine Variante unter ihrer Mindestgröße im Einsatz | Setzung |
| E4 | Farbe begleitet | Kontrastmatrix aller Rollen; Graustufen-Render jedes Grundlayouts | Text 4,5:1, großer Text 3:1, bedeutungstragende Grafik 3:1 (WCAG 2.2, R6 1.6, BENCHMARK_MARKE 5); in Graustufen mindestens zwei Codes erkennbar | Beleg für die Schwellen, Setzung für den Graustufen-Test |
| E5 | Stresstest bestanden | `system.stresstest[]` | kein Ergebnis "fehler"; "grenzwertig" nur mit Begründung | Setzung |
| E6 | Eine Quelle | Selbsttest sucht in Renderern, Brand-Kit, Website und Reel nach Farb- und Schriftwerten außerhalb der Tokens | null Treffer nach dem Umbau | Ableitung aus KETTE_IST 3 |
| E7 | Gegenentwurf gleichwertig | automatischer Vergleich der beiden Systeme | Unterschiede nur in Feldern der benannten Achse; beide mit Tokens und Stresstest | Ableitung aus Hsee 1996 |
| E8 | Kohorte | Vergleich mit allen UNIO-Maklern | kein zweiter Makler im selben Kernbezirk mit gleicher Grammatik, gleicher Displayfamilie oder Akzent im Abstand unter der Schwelle (Kapitel 6, S16) | Setzung |
| E9 | Makler-Zeit | Minuten des Maklers in diesem Schritt | 0 | Vertrag |
| E10 | Team-Zeit | gemessene Stunden je Makler | Empfehlung 6,5 bis 9,5 Stunden (mit Bestandsbefund), Gegenentwurf je Achse nach 10.9: `tonwert` 1 bis 1,5 h, `dichte`, `ausschnitt`, `zeichengewicht` 1,5 bis 2 h, `schriftstimme` 4 bis 6 h. Summe 7,5 bis 11,5 h, bei `schriftstimme` 10,5 bis 15,5 h; dazu 20 Minuten CD. Nach fünf Maklern ersetzen | Setzung |

---

## 2. Geprüfte Alternativen und warum verworfen

| Nr. | Alternative | Was dafür spricht | Warum verworfen | Was davon bleibt |
|---|---|---|---|---|
| A1 | **Konfigurator beibehalten** (heute: Logo-Typ, Schriftpaar, Akzent wählt der Makler oder das Team) | schnell, im Code vorhanden, Website-Schriften passen 1:1 | Katalog statt Identität: Eine Wortmarke ist der Name in einer von fünf Google-Schriften mit fettem Nachnamen (KETTE_IST 2.6). Zwei Kenner in derselben Welt unterscheiden sich nur durch Name und einen von sieben Akzenten (KETTE_IST 2.7). Wahl von Gestaltungsparametern durch den Kunden erzeugt Aufwand ohne Kompetenzgefühl (R7, Fuchs, Prandelli, Schreier 2010: https://doi.org/10.1509/jmkg.74.1.65) und bei unklarer Präferenz Auswahlüberlastung (Chernev, Böckenholt, Goodman 2015: https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf). Rubrik-Deckel 4 für "Katalog". | die gerechnete Renderer-Technik (Umbruch, Kontrast, Tabellenziffern), siehe KETTE_IST 8 |
| A2 | **KI-Generator für Logo und Palette** nach Art von Looka, Brandmark, Designs.ai oder Canva Brand Kit Builder, Team wählt aus | Tempo, viele Varianten, vollständiges Kit in Minuten | Generatoren kombinieren aus Bibliotheken, Logos ähneln Marken derselben Branche (Kreafolk: https://kreafolk.com/blogs/articles/looka-ai-logo-maker). Der Brandmark-Gründer schreibt selbst, dass solche Netze Designer nicht ersetzen (https://brandmark.io/intro/). KI hebt den Einzelfall und macht viele Ergebnisse einander ähnlicher (Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290; Wenger und Kenett 2026: https://academic.oup.com/pnasnexus/article/5/3/pgag042/8529001), bei zwanzig UNIO-Maklern also eine Kohorte, die wie eine Marke aussieht. Reputationsrisiko, wenn KI sichtbar Handwerk ersetzt (Pentagram und performance.gov: https://gdusa.com/pentagram-federal-website-generates-ai-controversy/). | Claude für Begründung und Herleitungsprüfung, nie für Formen |
| A3 | **Welt als Token-Mode**: die sechs Markenwelten in DTCG überführen, je Makler nur Name und Akzent tauschen (R4 Ü2) | wenig Handarbeit, sauberer Token-Export, alle Renderer vorhanden | Das Zeichen gehört dann weiter der Welt, nicht dem Makler (KETTE_IST 2.7). Farbe ist der schwächste Wiedererkennungs-Code: 4 Prozent der Farbelemente sind wirklich unverwechselbar (JKR und Ipsos: https://www.marketingweek.com/15-brand-assets-truly-distinctive-finds-research/), im Asset-Benchmark 2026 erreicht Farbe 12 Prozent Fame gegen 40 Prozent bei Formen (https://www.tandfonline.com/doi/abs/10.1080/02650487.2026.2637295). Unterscheidung nur über den Akzent verletzt G9 der Zerlegung. | die Welt als interne Grammatik (Zeichner, Rand, Spalten), die drei Token-Ebenen, Figma-artige Modes für Empfehlung und Gegenentwurf |
| A4 | **Eine Lösung ohne Gegenentwurf** (Paul Rand für NeXT) | maximale Klarheit, ein Begründungsbuch statt Auswahl (https://www.logodesignlove.com/next-logo-paul-rand) | Der Vertrag verlangt einen Gegenentwurf in Anwendungstiefe (Schritte 9, 13, 15). Ein Vergleich in derselben Anwendung macht Form beurteilbar (Hsee 1996: https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf). R1 Kapitel 5: Das Rand-Prinzip gilt für die Ausarbeitung nach der Wahl, nicht für die Wahl selbst. | das Begründungsbuch: jede Formentscheidung mit Herleitung (`herleitung.eingriffe`), später das Handsatz-Blatt im Markenbuch |
| A5 | **Eigene Schrift oder generatives System je Makler** (Koto für Bolt, DIA für Nuits Sonores, Patrik Hübner) | höchste Eigenständigkeit, Studios bauen so bei Skalierung | R1 Kapitel 5: eigene Schrift und parametrische Generatoren sind für Makler unverhältnismäßig. Kosten und Wartung stehen in keinem Verhältnis zu einem Einzelunternehmer (Ableitung). | das DIA-Prinzip "wenige Regler mit Grenzen je Format, je funktionaler das Format, desto strenger" (https://the-brandidentity.com/project/dia-studio-builds-a-generative-tool-that-makes-nuits-sonores-pulse-2) als `system.spielraum` und als Datenregel des Zeichens |
| A6 | **Gestaltung außerhalb der Werkbank** in Figma oder Canva, die Werkbank bekommt nur PNGs und Farbcodes | gewohnte Werkzeuge, volle Freiheit für den Designer | Keine eine Quelle: Genau so entstehen feste Paletten neben den Welt-Farben und zwei Visitenkarten (KETTE_IST 3). Canva AI liest wiederverwendbare Komponenten nicht (https://www.canva.com/help/create-on-brand-designs/). Konten des Maklers bei fremden Werkzeugen widersprechen der Rubrik. | Designer dürfen im eigenen Werkzeug zeichnen und SVG hochladen; die Werkbank prüft und übernimmt es in den Datenvertrag |
| A7 | **Der Makler wählt zwischen zwei fertigen Paletten oder Schriften** in einem kleinen Auswahlschritt | fühlt sich nach Mitsprache an, der Seed kennt so eine Nachricht ("Zwei Farbwelten stehen zur Wahl", `wb-store.jsx` Zeile 102) | Das ist eine Gestaltungsaufgabe und nach der Rubrik nie erlaubt. Die eine Wahl des Maklers fällt in Schritt 15 zwischen Empfehlung und Gegenentwurf als ganze Systeme in Anwendung, nicht Parameter für Parameter. | Mitsprache über die Rückmeldung je Kriterium des Markenvertrags und den Spielraum |

**Warum Handsatz mit Regelprüfung gewinnt (Ableitung).** A1 und A3 scheitern an der Unterscheidbarkeit, A2 an der Kohorte, A6 an der einen Quelle, A7 am Erlebnis. A4 und A5 liefern je ein Prinzip, das wir übernehmen: das Begründungsbuch und die Regler mit Grenzen. Übrig bleibt die Arbeitsteilung, die R1 4.9 für Studios beschreibt: Die Maschine übernimmt die Breite und das Messbare, der Mensch die Enge und die Form.

---

## 3. Die gewählte Lösung: Handsatz mit Regelprüfung

### 3.1 Grundgedanke

Drei Regeln tragen den Schritt.

1. **Kein Wert ohne warum.** Jede Entscheidung, vom Kerning-Paar bis zum Akzentton, hat einen Satz Begründung und eine Quelle: eine Zeile aus `brief`, ein Feld aus `idee`, ein Wert aus `stimme.regler`, ein Merkmal aus `vorab.logoAlt` oder `vorlieben.bestandBehalten`. Das beantwortet Bierut: Begründungen sind erlaubt, sie müssen aber auf etwas Echtes zeigen (https://designobserver.com/on-design-bullshit/, R2 1.9). Tokens tragen den Satz im Feld `$description`, wie Frontify es für maschinenlesbare Richtlinien empfiehlt (https://www.frontify.com/en/guide/brand-guidelines-for-ai).
2. **Anwendung zuerst, auch im Team.** Die Werkstatt zeigt jede Änderung sofort in einer Anwendungsleiste: Profilkopf, Kachel, Reel-Titel, Karte, Schild, jeweils in echter relativer Größe und mit dem echten Porträt, sofern die Rechte geklärt sind (10.0). Fehlt das Porträt oder seine Freigabe, zeigt die Leiste an seiner Stelle eine Lückenfläche in der Rolle `flaeche` mit dem Satz "Porträt fehlt, Termin über Schritt 11", nie ein Ersatzbild, kein Stock, kein generiertes Gesicht und auch nicht das Monogramm im Profilkreis. Das Logo allein auf Weiß gibt es nur als Detailansicht. Grund: Urteile am Logo allein führen in die Irre (Mozilla: https://blog.mozilla.org/opendesign/roads-not-taken/).
3. **Die Welt ist Grammatik, das Zeichen gehört dem Makler.** Die intern gewählte Welt aus `idee.grammatik` liefert Rand, Spalten und Zeichner. Farbe, Schrift, Wortmarke und Zeichen kommen aus `idee` und werden für diesen Makler gesetzt.

### 3.2 Ablauf

Durchlaufzeit zwischen Schritt 9 und 11: zwei Arbeitstage (Setzung). Die Dauern je Teilschritt sind Setzungen und werden gemessen.

| Nr. | Teilschritt | Wer | Ergebnis | Dauer |
|---|---|---|---|---|
| 10.0 | Eingang prüfen | Regel | Liste fehlender Felder und vier Sperren, siehe unten | Sekunden |
| 10.1 | Bestandsbefund | Designer | nur bei schärfen oder behalten: altes Logo als Vektor nachgezeichnet, Befund je Merkmal | 1 h |
| 10.2 | Schrift | Claude oder Regel schlagen je Rolle höchstens zwei Familien aus der Schriftbank vor, Designer entscheidet, Regel prüft Lizenz und Prüfsatz | `system.typo` | 1 h |
| 10.3 | Wortmarke | Designer in der Werkstatt, Regel für Varianten, Schutzraum, Größenleiter | `system.wortmarke` | 2 bis 3 h |
| 10.4 | Zeichen | Designer, Regel für Plätze je Format | `system.zeichen` | 1 bis 2 h |
| 10.5 | Farbe | Designer setzt Rollen, Regel rechnet Kontrastmatrix, Graustufen-Test, Druckwerte | `system.farbe` | 0,5 h |
| 10.6 | Raster und Formate | Regel aus Grammatik und Plattformmaßen, Designer korrigiert | `system.raster` | 0,5 h |
| 10.7 | Tokens, Motion, Sperrstufen, fest und variabel, Spielraum | Regel erzeugt, Designer setzt Motion und ergänzt `warum`, wo die Regel eine Lücke setzt | `system.tokens`, `sperrstufen`, `festUndVariabel`, `spielraum` | 0,5 bis 1 h |
| 10.8 | Stresstest und Kohorte | Regel | `system.stresstest[]`, `system.pruefung` | Minuten |
| 10.9 | Gegenentwurf | Designer, dieselbe Pipeline, Regel vergleicht | `system.gegenentwurf` | je Achse 1 bis 6 h, Tabelle 10.9 |
| 10.10 | Systemprobe | Creative Director | Abzeichnung in `system.pruefung.cd` | 20 Min. |

**Die vier Sperren in 10.0.** Jede steht als Befund mit Aufgabe an das Team in `system.pruefung.eingang`, keine fällt still auf einen Ersatzwert.

| Sperre | Bedingung | Folge |
|---|---|---|
| Idee nicht abgenommen | `idee.gezeigt.abgenommen` leer (kein `cd`, kein `datum`) | ganzer Schritt blockiert. Schritt 9 macht die Abnahme zur Bedingung für Schritt 10 |
| Achse nicht im Katalog | `idee.gezeigt.achse.name` nicht aus `tonwert`, `ausschnitt`, `dichte`, `schriftstimme`, `zeichengewicht`, oder `idee.varianten` enthält `empfehlungId` oder `gegenentwurfId` nicht | ganzer Schritt blockiert, Rückgabe an Schritt 9 |
| Bestandslogo fehlt | `bestandUrteil` schärfen oder behalten, aber `vorab.logoAlt.datei` fehlt oder `vorab.material` Eintrag "Altes Logo" hat `rechte` offen | Wortmarke blockiert, nie still auf "neu"; Schrift, Zeichen, Raster laufen weiter |
| Bildrechte offen | Porträt: `vorab.material` Eintrag "Fotos von dir" mit `rechte` nicht geklärt. Objektfotos: `auftrag.einwilligungen` Zweck "Objektfotos zeigen" nicht `ja` oder `vorab.material` Eintrag "Objektfotos" mit `rechte` nicht geklärt | kein Blocker für den Schritt. Anwendungsleiste und Grundlayouts zeigen an dieser Stelle eine Lückenfläche statt der Datei. `offen` zählt wie `nein`. Eine eigene Einwilligung für Porträts gibt es nicht mehr, Schritt 1 hat sie gestrichen (`01_auftakt.md` 5.3 D3); für das Porträt zählen deshalb nur die Rechte |

### 3.3 Die Teilschritte im Detail

#### 10.1 Bestandsbefund (nur bei schärfen oder behalten)

Das alte Logo aus `vorab.logoAlt` wird als Vektor nachgezeichnet (Reinzeichnung) und in einer Tabelle beurteilt.

| Feld | Inhalt |
|---|---|
| `merkmal` | tragendes Element, etwa Farbe, Initialen, Form, Schriftcharakter, Anordnung |
| `traegt` | ja oder nein: macht das Merkmal das Logo heute wiedererkennbar |
| `entscheidung` | bleibt, korrigiert oder entfällt |
| `warum` | ein Satz, mit Quelle: `vorlieben.bestandBehalten`, `idee`, `brief.einschraenkungen` oder ein technischer Befund |

Regeln:
- Was in `vorlieben.bestandBehalten` steht, darf in Schritt 10 nur bleiben oder korrigiert werden, in der Empfehlung immer. Das hält das Versprechen aus Schritt 3: nichts Vorhandenes verschwindet ohne sein Wort. **Der Kanal, wenn das Team ein solches Element lieber streichen würde:** Es gibt keine Zwischenfrage. Liegt das Element in einem Feld der Achse des Gegenentwurfs (etwa die Bestandsschrift bei Achse `schriftstimme`, der Bestandston des Grunds bei Achse `tonwert`), zeigt der Gegenentwurf die Fassung ohne das Element, und entschieden wird in Schritt 15 mit `rueckmeldung.wahl`. Liegt es außerhalb der Achse, bleibt es in beiden Fassungen, und der Zweifel des Teams steht als `herleitung.bestand[].hinweis` im Markenbuch. Eine zweite Achse nur für das Streichen gibt es nicht, weil der Makler sonst zwei Dinge auf einmal vergleicht (Hsee 1996).
- Mindestens zwei von drei tragenden Merkmalen bleiben erkennbar (Setzung). Grund: Stark gebundene Kunden bewerten eine Logo-Neugestaltung umso negativer, je stärker sie sich ändert (Walsh, Winterich, Mittal 2010: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1998809). JKR erweitert bestehende Codes, statt sie zu ersetzen (R1 2.4), StudioSmall hat The Modern House vor allem geschärft (R5 1.1).
- Korrigiert wird, was technisch oder konzeptuell nicht trägt: zu dünne Striche für 40 px, fehlender Schutzraum, Farbe unter der Kontrastschwelle, Kerning-Löcher, fehlende kompakte Form für den Profilkreis (BENCHMARK_MARKE 2.3 Fehler 1).
- Bei `behalten` ändert sich nichts an der Form. Geliefert werden nur Reinzeichnung, Varianten, Schutzraum, Mindestgrößen und Tokens.

#### 10.2 Schrift

**Schriftbank statt Katalog.** Das Team pflegt eine interne Liste geprüfter Familien. Der Makler sieht sie nie. Jede Familie hat Merkmale, nach denen die Regel filtert:

| Feld | Inhalt |
|---|---|
| `familie`, `schnitte[]`, `achsen` | etwa Gewicht, optische Größe |
| `profil` | Einschätzung nach den sechs Dimensionen von Henderson, Giese und Cote 2004 (elaborate, harmony, natural, flourish, weight, compressed; https://journals.sagepub.com/doi/10.1509/jmkg.68.4.60.42736), vom Team gesetzt |
| `prüfsatz` | ß, Umlaute, „ “, Tabellenziffern, Versalziffern, €, Name und Preis wie "€ 1.290.000" im Probesatz (BENCHMARK_MARKE 5.4) |
| `lizenz` | `{art, url, deckt {web, social, druck, logoPfade}, geprueftVon, geprueftAm}`; jede Angabe ja, nein oder offen |
| `dateien` | Web-Datei und Datei zum Umwandeln in Pfade (TTF oder OTF je Schnitt) |
| `kohorte` | welche Makler die Familie schon als Display nutzen, mit Kernbezirk |

**Vorschlag.** Claude oder, ohne Schlüssel, die Regel schlagen je Rolle höchstens zwei Familien vor. Grundlage (Ableitung aus R2 3.10 und Henderson u. a.):

| Eingang | Folge für die Schrift |
|---|---|
| `stimme.regler.ernst` hoch | harmony hoch, flourish niedrig, kein Schmuck |
| `stimme.regler.sachlich` hoch | natural niedrig, Tabellenziffern Pflicht, klare Zahlformen |
| `stimme.regler.persoenlich` hoch | natural hoch, sichtbare Strichführung erlaubt |
| `stimme.regler.begeistert` hoch | mehr Kontrast im Gewicht, elaborate erlaubt |
| `idee.satz`, `brief.einschraenkungen` | harte Filter, etwa "höchstens zwei Schnitte" oder "Zahlen sind die Headline" |
| `richtung.tabus` | Ausschluss von Merkmalen, die markiert wurden |
| Kohorte | Ausschluss einer Displayfamilie, die ein Makler im selben Kernbezirk schon trägt |

Die Übertragung der Henderson-Dimensionen auf Wiener Publikum ist nicht belegt (R2, offene Frage 5). Der Vorschlag ist deshalb nur ein Filter, die Entscheidung trifft der Designer, und sie braucht ein `warum`, das auf `idee` oder `brief` zeigt, nicht nur auf die Regler. Die Stimme bleibt Hauptträger der Persona, die Schrift folgt ihr (Brumberger 2003: https://www.ingentaconnect.com/content/stc/tc/2003/00000050/00000002/art00007).

**Stufen.** Festgelegt werden vier Stufen je Format: Kernsatz, Kennzahl, Fließtext, Folio. Die Grenzwerte für Social stammen aus R6, Kapitel 3, Regel R8: Text, der im Raster gelesen werden soll, mindestens 92 px auf 1080; Text im offenen Beitrag mindestens 30 px, Fließtext ab 47 px. Für Druck gilt Schrift ab 8 pt (Moo, BENCHMARK_MARKE 4.1).

**Ziffern.** Tabellenziffern in Fakten, Tabellen, Preisen und im Folio; proportionale Versalziffern im Kernsatz; keine Mediävalziffern in Preisen (BENCHMARK_MARKE 5.4 Fehler 3). Tausenderpunkt, Einheit in der Textschrift auf gleicher Grundlinie.

**Kennzahl-Regel, entschieden (Setzung).** Die Stufe Kennzahl scheitert sonst an ihrem Hauptfall: Beim Zinshaus-Makler ist "€ 12.450.000" der Normalfall.
1. Preise ab 1 Mio. stehen in der Kennzahl-Stufe als Millionen mit höchstens zwei Nachkommastellen, Nullen am Ende entfallen: "12,45", "4,2". Gerundet wird nie, eine dritte Nachkommastelle erzwingt die volle Schreibweise in der Faktenzeile statt der Kennzahl.
2. Die Einheit "Mio. €" steht dahinter in der Textschrift mit 0,42facher Größe auf gleicher Grundlinie. Unter 1 Mio. voll mit Tausenderpunkt und "€" als Einheit.
3. Der exakte Wert "€ 12.450.000" steht immer zusätzlich in Caption und Faktenzeile, in Tabellenziffern im Fließtextgrad. Die Kennzahl ist Blickfang, die Faktenzeile ist die Angabe.
4. "Preis auf Anfrage": Die Kennzahl-Stufe entfällt, an ihre Stelle tritt die Fläche in m² oder, in Serien mit Zeitbezug, die Dauer aus dem Beleg. Nie ein Wort in der Kennzahl-Stufe.
5. Passt die Kennzahl nicht in die Satzbreite, verkleinert die Regel bis zur Mindestgröße der Stufe (80 Prozent des Startwerts) und meldet "grenzwertig" mit Messwert, darunter "fehler". Nie Kürzung.

`warum`: Die Zahl ist die Headline und muss im Raster lesbar bleiben, die Einheit ist untergeordnet, und die exakte Angabe gehört dorthin, wo gelesen statt geschaut wird (BENCHMARK_MARKE 5.4, R6 Regel R8).

**Lizenz.** Eine Familie mit "offen" bei `logoPfade` darf nicht in die Wortmarke. Google gibt an, dass die Schriften im Katalog unter Open-Source-Lizenzen stehen (https://developers.google.com/fonts/faq). Ob die jeweilige Lizenz Logo-Pfade, Social und Druck deckt, prüft das Team am Lizenztext je Familie und legt den Text ins Kit (BENCHMARK_MARKE 2.3 Fehler 3). Für Power Grotesk ist die Lizenz im Repo nicht dokumentiert (Lücke); sie kommt erst nach der Prüfung in die Schriftbank.

#### 10.3 Wortmarke

**Handsatz in der Werkstatt.** Der Designer setzt den Namen in der gewählten Displayfamilie und greift ein. Jeder Eingriff wird als Datensatz gespeichert:

```js
eingriffe: [
  { klasse: "pflege" | "erkennung",
    art: "abstand" | "gewicht" | "form" | "zeichen" | "ziffer" | "dickte" | "optischeGroesse",
    kategorie: "",            // nur bei erkennung, aus einer festen Liste, für den Kohortenvergleich
    wo: "Paar L-e", wert: "-18/1000 em",
    sichtbar40: { abweichungPx: 0, render: "" },   // nur bei erkennung, von der Regel gemessen
    warum: "", quelle: { schritt: 9, feld: "idee.zeichen" } }
]
```

**Zwei Klassen, weil Handwerk nicht Handschrift ist.**

| Klasse | Was | Zählt für E1 | Beispiele |
|---|---|---|---|
| Pflege | macht den Satz richtig; jeder gute Setzer tut es | nein, ist Pflicht | optisches Kerning statt Standard-Kerning, Wortabstand so eng, dass Vor- und Nachname ein Wortbild werden, optische Größe (Schnitt für kleine und große Grade), Strichstärke für 16 px |
| Erkennung | macht den Satz zu diesem Namen; man sieht ihn bei 40 px und kann ihn in einem Satz aus der Idee erklären | ja, mindestens einer | Beispiele stehen bewusst nicht hier, weil jede Liste zur Schablone würde; das Markus-Beispiel in 3.6 zeigt einen |

Ein Erkennungseingriff besteht drei Proben (E1): **sichtbar** (die Regel rendert den Namen bei 40 px Kegel mit und ohne den Eingriff und misst die Pixelabweichung; unter 3 Prozent der Fläche des Wortbilds gilt er als unsichtbar, Setzung), **herleitbar** (ein Satz, Quelle `idee.zeichen` oder `brief.kernsatz`, geprüft von S18 und vom CD) und **formfremd** (keine Wortmarke eines Maklers im selben oder angrenzenden Bezirk trägt dieselbe `kategorie`, und S21 findet keine Formnähe). Nie als Erkennung zählbar, weil Branchenstandard: Nachname fett (heute in `BrandLogo`, `wb-ui.jsx` Zeile 58), Unterstreichung, auch mit Endstrich, Punkt nach dem Namen, Kreis um die Initialen (heute `HM_LOGO_TYPEN`), Farbwechsel zwischen Vor- und Nachname, Initiale mit verlängertem Strich.

**Varianten.** Pflicht sind drei Formen, weil eine liegende Wortmarke im Profilkreis und im Favicon nicht trägt (BENCHMARK_MARKE 2.3 Fehler 1):

| Variante | Einsatz | Mindestgröße (Setzung) |
|---|---|---|
| liegend | Website-Kopf, Signatur, Exposé, Schild, Karte | 120 px Breite digital, 25 mm im Druck |
| gestapelt | Karte Rückseite, Reel-Endkarte, hohe Formate | 64 px Breite, 14 mm |
| Monogramm | Favicon, Google-Profil, Folio, sehr kleine Flächen | 16 px, 5 mm |

Jede Variante gibt es in Text auf Grund, Grund auf Text und einfarbig. **Schutzraum**: eine Versalhöhe rundum als Grundwert (Setzung nach BENCHMARK_MARKE 2.1: https://squareballoon.co.uk/blog/how-to-correctly-space-a-logo-what-x-means-in-branding-and-brand-guidelines/).

**Profilbild ist das Porträt.** Das Profilbild auf Instagram und LinkedIn zeigt immer das Gesicht, nie die Wortmarke. Das Gesicht ist bei der Personenmarke der stärkste Code (R7, Willis und Todorov 2006: https://doi.org/10.1111/j.1467-9280.2006.01750.x). Das Monogramm trägt nur dort, wo kein Gesicht stehen kann.

**Technik.** Die Werkstatt wandelt den gesetzten Namen in Pfade um. Die SVG enthält danach kein `<text>`, keinen Verlauf, keinen Filter, nur Pfade mit `currentColor`. Designer, die lieber im eigenen Werkzeug zeichnen, laden eine SVG hoch; die Werkbank prüft dieselben Bedingungen und übernimmt sie mit den Eingriffen als Datensatz.

#### 10.4 Zeichen

Name, Form und Herleitung stehen in `idee.zeichen` (Schritt 9). Schritt 10 zeichnet es und legt fest:

| Feld | Inhalt |
|---|---|
| `svg` | Vektor, Pfade, `currentColor` |
| `platz` | je Format Position, Größe in Bezug auf Rand und Versalhöhe, Bezug zu Wortmarke und Folio |
| `datenregel` | falls das Zeichen einen Wert zeigt (wie heute die Grätzl-Linie aus Name und Bezirk): Eingang, Skala, Grenzen; höchstens eine Variable |
| `nie[]` | verbotene Anwendungen, dazu jede Notiz aus `richtung.tabus` |

Das Zeichen hat einen festen Platz je Format, damit es als Code wirkt (R6 Prinzip 3, R7). Es ist nie Dekor: Hat eine Fläche keinen Anlass für das Zeichen, bleibt nur die Wortmarke.

#### 10.5 Farbe

**Rollensatz je Tonwert.** Fünf Rollen, `grund`, `text`, `flaeche`, `linie`, `akzent`, und die gibt es genau zweimal: einmal für den Tonwert `hell`, einmal für `dunkel`. Dazu ein Feld `grundton` (hell oder dunkel), das sagt, welcher Satz der Grundton ist; der andere ist der Gegenton, den Schritt 12 über `grammatik.tonwertPeriode` einsetzt (höchstens drei von zwölf Kacheln). Grund: Der Gegenton ist kein Farbwert ohne Rolle, sondern ein vollständiger Satz, in dem Text, Linie und Akzent neu gerechnet sind. Ein Akzent, der auf Dunkel 7:1 erreicht, erreicht auf Papier oft nicht 3:1 und braucht dort einen eigenen Wert. Beide Werte leiten sich aus einem Grundwert ab (Leonardo-Prinzip), es bleibt eine Palette. Mehr Rollen gibt es nicht. Reduktion ist selbst ein Studio-Muster: Pentagram hat die Palette von Slack von elf auf vier Farben plus Aubergine reduziert (https://www.pentagram.com/work/slack).

| Tonwert | grund | text | flaeche | linie | akzent |
|---|---|---|---|---|---|
| hell | Papier | dunkel, mindestens 4,5:1 auf grund und flaeche | eine Stufe dunkler als grund | nur Trennung, ohne Information | aus dem Grundwert, Helligkeit so gesenkt, dass er auf grund mindestens 3:1 als Grafik erreicht |
| dunkel | dunkler Grund | hell, mindestens 4,5:1 | eine Stufe heller als grund | nur Trennung | der Grundwert selbst, sofern 4,5:1; sonst aufgehellt |

Der Achse `tonwert` aus Schritt 9 entspricht dann genau ein Feld: `grundton`. Beide Rollensätze sind in Empfehlung und Gegenentwurf gleich, der Makler vergleicht im Reveal wirklich nur hell gegen dunkel.

**Herkunft des Akzents.** In dieser Reihenfolge: eine Farbe aus `vorlieben.bestandBehalten` oder `vorab.logoAlt.farben`; sonst aus `idee` und `brief`; nie aus einer Figur. Die heutige Zuordnung Figur zu Akzent (`HM_AKZENT_EMPF`) entfällt.

**Farbraum.** Grundwerte in OKLCH mit Hex als Rückfall, weil OKLCH wahrnehmungsgleiche Stufen erlaubt und der Standard moderne Farbräume trägt (R4 1.4). Aus dem Akzent werden Stufen nach Zielkontrast abgeleitet (Leonardo-Prinzip, BENCHMARK_MARKE 5.1: https://github.com/adobe/leonardo).

**Kontrastmatrix.** Für jede Kombination aus Vorder- und Hintergrundrolle rechnet die Regel das Verhältnis und schreibt den erlaubten Einsatz dazu: Fließtext (4,5:1), großer Text (3:1), bedeutungstragende Grafik (3:1), nur Begleitung (darunter). Logos sind in WCAG ausgenommen (BENCHMARK_MARKE 5), die Werkbank verlangt für die Wortmarke auf erlaubten Gründen trotzdem 3:1 (Setzung).

**Farbe allein trägt nie.** Zwei Prüfungen: Jede Information, die in einem Ton unter 3:1 steht, muss zusätzlich über Form oder Position lesbar sein. Und jedes Grundlayout wird in Graustufen gerendert; die Codes aus `idee.codes` bleiben erkennbar (Setzung).

**Proportion getrennt für Feed und Druck.** Ein Wert für beides wäre falsch, weil der Feed einen Tonwert-Rhythmus hat und der Druck nicht.
- `proportion.feed`: `{kachelnGrundton, kachelnGegenton, jeKachel {grund, flaeche, text, akzent}}`. Der Anteil der Gegenton-Kacheln kommt aus der Grammatik von Schritt 12 (höchstens drei von zwölf, `tonwertPeriode` 4), Schritt 10 übernimmt ihn als Startwert und Schritt 12 bestätigt ihn. Die Anteile je Kachel beziehen sich auf die typografische Fläche ohne Foto.
- `proportion.druck`: `{karte, expose, schild}` je `{grund, flaeche, text, akzent}`. Im Druck gibt es keinen Rhythmus, jedes Format hat einen festen Tonwert.
Summe je Satz 100 Prozent. Die Regel misst die Anteile am Render der Grundlayouts nach und meldet Abweichungen über 2 Prozentpunkte.

**Druck.** CMYK-Werte werden einmal nach Proof festgelegt und im Kit hinterlegt (BENCHMARK_MARKE 4.2). Bis zum Proof steht `cmyk: Lücke`.

#### 10.6 Raster und Formate

Rand und Spalten kommen aus der Grammatik der Welt (`HM_MARKENWELTEN.raster`) und werden je Format umgerechnet. Die Plattformmaße sind belegt, wo eine Quelle steht.

| Format | Maß | Regel | Quelle |
|---|---|---|---|
| Profilbild | Upload 1080 x 1080, Anzeige als Kreis | nur Porträt; Kopf füllt 60 bis 70 Prozent des Durchmessers; Prüfgrößen 40 px und 110 px | Setzung |
| Post | 1080 x 1350 | alles Tragende im mittigen 3:4-Fenster 1012,5 x 1350, je 33,75 px Beschnitt links und rechts; Rand vom Postrand so, dass im Fenster mindestens 38 px bleiben | R6 Kapitel 3 Regel R6, Kapwing: https://www.kapwing.com/resources/instagrams-new-grid-layout-size-and-dimensions-2025/ |
| Reel und Story | 1080 x 1920 | Kachel zeigt die Mitte 1080 x 1440; Titel und Gesicht in x 65 bis 1015, y 269 bis 1248; kein Folio im unteren Bereich | R6 Kapitel 3 Regel R7, Meta: https://www.facebook.com/business/ads-guide/update/video/instagram-reels (für Anzeigen dokumentiert; organisch Annahme) |
| Karte | 85 x 55 mm | Beschnitt nach Druckerei-Profil, Inhalte 3 mm vom Endformat, Schrift ab 8 pt, Linien ab 0,5 pt, Logo als Vektor | BENCHMARK_MARKE 4.1, Moo: https://www.moo.com/us/business-cards/design-guidelines |
| Signatur | 600 x 150 px Anzeige, Render 1200 x 300 | Wortmarke als PNG in doppelter Auflösung, weil SVG in E-Mail-Programmen nicht verlässlich angezeigt wird (vor dem Bau prüfen: https://www.caniemail.com/features/image-svg/) | Renderer `WeltSignatur`, `hmWeltSignaturHtml` |
| Exposé | A4, 210 x 297 mm | Titelseite mit Energiekennzahlen in fester Zeile | Renderer `WeltExpose`, `objektRegel` Schritt 12 |
| Schild | Lücke: Maße der von UNIO genutzten Schilder | Startwert Querformat 3:2, Rand 6 Prozent der Breite, Wortmarke liegend, Prüfung an einer Druckprobe | Setzung, Lücke |
| Website-Kopf | responsiv | Tokens als `brand.css`, 12 Spalten, Rand mindestens 16 px am Telefon | Setzung |
| Favicon | SVG, ICO, 180, 192, 512 | Monogramm | BENCHMARK_MARKE 2.3 |
| LinkedIn-Kopf | Lücke: Maß vor dem Bau an der Plattformhilfe prüfen | liegende Wortmarke rechts, Porträt links frei | Lücke |

#### 10.7 Tokens, Sperrstufen, fest und variabel, Spielraum

**Tokens.** Export im Format der W3C Design Tokens Community Group, stabile Fassung 2025.10 (https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/), drei Ebenen:

| Ebene | Präfix | Beispiel | Wer liest |
|---|---|---|---|
| Grundwert | `basis` | `basis.farbe.akzent`, `basis.schrift.display`, `basis.mass.versalhoehe`, `basis.zeit.kurz` | nur andere Tokens |
| Bedeutung | `rolle` | `rolle.farbe.hell.akzent`, `rolle.farbe.dunkel.text`, `rolle.farbe.grundton`, `rolle.typo.kernsatz`, `rolle.proportion.druck.karte.akzent` | Renderer, Website, Brand-Kit |
| Bauteil | `bauteil` | `bauteil.folio.farbe`, `bauteil.zeichen.strich`, `bauteil.post.rand`, `bauteil.reel.titel.einblendung` | Vorlagen aus Schritt 12, Renderer, Reel |

Jedes Token trägt `$description` mit dem Satz "warum". Quelle, Sperrstufe und Spielraum stehen unter `$extensions` im Namensraum `at.unio.werkbank`. Empfehlung und Gegenentwurf sind zwei Dateien mit denselben Namen der Bedeutungs- und Bauteil-Ebene. Nach der Freigabe in Schritt 16 geht nur die gewählte in `quelle`. Zusätzlich entsteht `brand.css` mit denselben Werten als CSS-Variablen für Website und Werkstatt (BENCHMARK_MARKE 2.3). Die genauen Feldnamen der Wertobjekte (etwa für Farbe und Maß) werden vor dem Bau gegen den Spezifikationstext geprüft (Lücke, R4 hat nur die Ankündigung gelesen).

**Motion als Bauteil-Tokens.** Reels sind im Startwert des Formatmix von Schritt 12 die größte Gruppe (5 von 12), also braucht Bewegung dieselbe eine Quelle wie Farbe und Schrift. DTCG kennt dafür die Typen `duration`, `cubicBezier` und `transition` (Feldnamen vor dem Bau am Spezifikationstext prüfen, siehe Lücke 4). Pflicht sind vier Bauteile:

| Bauteil-Token | Inhalt | Sperrstufe | Spielraum |
|---|---|---|---|
| `bauteil.reel.titel.einblendung` | Art (etwa zeilenweise aufdecken), Dauer, Kurve, Versatz je Zeile | fest in Art und Kurve | Dauer plus minus 20 Prozent |
| `bauteil.reel.titel.stand` | Mindeststandzeit des Titels, bevor der erste Schnitt kommt | fest | keiner |
| `bauteil.reel.endkarte.zeichen` | wie das Zeichen in der Endkarte erscheint (Art, Dauer oder Geschwindigkeit, Kurve) | fest | Geschwindigkeit plus minus 15 Prozent |
| `bauteil.reel.endkarte.folio` | ob und wie das Folio erscheint; Regel: Folio und Wortmarke bewegen sich nie, sie stehen ab dem ersten Bild der Endkarte | fest | keiner |

Untertitel folgen `rolle.typo.fliesstext` ohne eigene Animation. Verboten, gemessen im Stresstest am Reel-Titel: Federn und Überschwingen (Kurven mit Kontrollpunkten über 1 oder unter 0), Skalieren von Text, Weichzeichnen, Glow. Das `warum` jeder Kurve zeigt auf `stimme.regler` oder `brief.einschraenkungen`.

**Sperrstufen** nach Canva und R4 Ü1 (https://www.canva.com/help/brand-template-locks/): `fest` (nichts änderbar), `stil` (Formatierung fest, Inhalt offen), `rahmen` (Bild tauschbar, Seitenverhältnis und Ausschnittregel fest), `variante` (Wahl aus zwei bis drei vorbereiteten Fassungen).

| Bauteil | Stufe | offen |
|---|---|---|
| Wortmarke, alle Varianten | fest | nur die Variante je Format, nach Tabelle 10.3 |
| Zeichen | fest | der Datenwert, falls `datenregel` existiert |
| Folio-Zeile | stil | Serienname, Folge, Seitenzahl |
| Kernsatz | stil | Text bis acht Wörter in der Kachel |
| Kennzahl mit Einheit | stil | Zahl, Einheit, Quelle |
| Porträt | rahmen | Datei aus `bild.kontaktbogen`, Kopfposition im Spielraum |
| Objektfoto | rahmen | Datei aus dem Bestand des Maklers, nie Demo-Objekt |
| Energiezeile | fest | Werte aus dem Objekt; fehlen sie, blockiert der Beitrag |
| Kontaktblock | fest | Werte aus der Einrichtung |
| Tonwert der Fläche | variante | Grundton oder Gegenton nach der Grammatik aus Schritt 12; der Rollensatz folgt automatisch |
| Grundlayout einer Serie | variante | zwei bis drei Fassungen, festgelegt in Schritt 12 |
| Reel-Titel, Reel-Endkarte | fest | Text im Titel (Stufe `stil`), Dauer im Spielraum |

**Fest und variabel** (R2 3.13, Public Theater: https://www.pentagram.com/work/the-public-theater-2020-2021-season):
- Fest, nie ohne neue Version: Wortmarke, Zeichen, Schriftfamilien und Stufen, Crop-Regel (aus Zeichen und Raster, Anwendung in Schritt 11), Grund- und Textfarbe, Platz von Folio und Zeichen.
- Variabel je Quartal: ein Quartalston für Flächen aus höchstens zwei vorbereiteten Tönen der einen Palette (als Token mit Stufe `variante`, keine zweite Palette), das Motivthema (Schritt 17 `quartal`), der Datenwert des Zeichens.

**Spielraum.** Die Werte, die nach der Rückmeldung fein abgestimmt werden dürfen, stehen schon jetzt mit Bereich im System.

*Namensraum.* `spielraum[].pfad` ist immer ein Token-Pfad der DTCG-Datei und beginnt mit `basis.`, `rolle.` oder `bauteil.`. Andere Namensräume gibt es im Spielraum nicht. Wo ein Wert aus einem Grundwert abgeleitet ist (wie der Akzent je Tonwert), steht der Spielraum am Grundwert, und die Regel leitet die Rollen neu ab.

```js
spielraum: [
  { pfad: "basis.farbe.akzent", groesse: "chroma", von: 0.07, bis: 0.15, start: 0.13, einheit: "OKLCH C",
    uebersetzung: { "zurückhaltender": -0.04, "kräftiger": +0.02 },
    ableitung: ["rolle.farbe.hell.akzent", "rolle.farbe.dunkel.akzent"], pruefung: ["kontrast", "graustufen", "stresstest"] },
  { pfad: "basis.farbe.akzent", groesse: "hue", von: 62, bis: 74, start: 68, einheit: "Grad",
    uebersetzung: { "wärmer": -4, "kühler": +4 } },
  { pfad: "rolle.typo.kernsatz", groesse: "size", von: -0.08, bis: 0.08, start: 0, einheit: "relativ",
    uebersetzung: { "größer": +0.04, "kleiner": -0.04 } },
  { pfad: "rolle.typo.display", groesse: "laufweite", von: -0.005, bis: 0.005, start: 0, einheit: "em" },
  { pfad: "rolle.proportion.druck.karte.akzent", von: 1, bis: 3, start: 2, einheit: "Prozent" },
  { pfad: "bauteil.portraet.kopfposition", von: -0.03, bis: 0.03, start: 0, einheit: "relativ zur Höhe" },
  { pfad: "bauteil.reel.titel.einblendung", groesse: "duration", von: 0.8, bis: 1.2, start: 1, einheit: "Faktor",
    uebersetzung: { "ruhiger": +0.15, "schneller": -0.15 } }
]
```

Regel für jede Zeile: `von <= start <= bis`, und `start + uebersetzung` liegt für jede Übersetzung im Bereich (S19). Beim Akzent liegt die Obergrenze 0,15 am Rand des sRGB-Raums für diesen Farbton (nachgerechnet: bei Helligkeit 0,72 und Farbton 68 wird ab Chroma 0,16 der Blaukanal auf null geklemmt). Deshalb startet der Akzent bei 0,13, damit beide Richtungen umsetzbar sind. Misst das Team am alten Logo einen Bestandston am Rand, entfällt "kräftiger" mit Vermerk, statt still außerhalb des Bereichs zu landen.

*Zuordnung von Pin-Feldern zu Token-Pfaden.* Schritt 15 pinnt auf Felder in `system.*` (Attribut `data-feld`, `15_reveal.md` Kapitel Pins). Schritt 10 liefert dazu eine feste Tabelle `system.pinZuordnung`, damit ein Pin ohne Deutung auf einen Token-Pfad und damit auf eine Spielraum-Zeile oder eine Änderung außerhalb führt:

| Pin-Feld (`data-feld`) | Token-Pfad | im Spielraum |
|---|---|---|
| `system.farbe.akzent` | `basis.farbe.akzent` (leitet `rolle.farbe.hell.akzent` und `rolle.farbe.dunkel.akzent` ab) | ja, Chroma und Farbton |
| `system.farbe.grund`, `system.farbe.text`, `system.farbe.flaeche`, `system.farbe.linie` | `rolle.farbe.<grundton>.<rolle>` | nein, Änderung an Schritt 10 |
| `system.farbe.proportion.druck.<format>` | `rolle.proportion.druck.<format>.<rolle>` | nur `karte.akzent` |
| `system.farbe.proportion.feed` | `rolle.proportion.feed.*` | nein, folgt der Grammatik in Schritt 12 |
| `system.typo.stufen.<format>.<stufe>` | `rolle.typo.<stufe>` und `bauteil.<format>.<stufe>` | nur Größe des Kernsatzes |
| `system.typo.laufweite.display` | `rolle.typo.display.laufweite` | ja |
| `system.raster.<format>` (etwa `system.raster.karte`) | `bauteil.<format>.*` | nein, Änderung an Schritt 10 mit CD |
| `system.raster.formate[].bildfeld` | `bauteil.portraet.kopfposition` | ja |
| `system.zeichen.*`, `system.wortmarke.*` | `bauteil.zeichen.*`, Asset | nein, neue Version |
| `system.tokens.<Token-Pfad>` (Reel, Motion) | derselbe Pfad | nur Dauer und Geschwindigkeit |

Die Renderer tragen `data-feld` mit den Namen der linken Spalte. Ein Pin auf ein Feld, das nicht in der Tabelle steht, ist ein Fehler im Renderer, kein Wunsch ohne Ziel.

Nicht im Spielraum und damit nur als neue Version über Schritt 9 oder 10: Familie, Zeichen, Eingriffe der Wortmarke, Rollen, Achse des Gegenentwurfs. Ablauf nach der Rückmeldung: Ein Pin der Art Änderung aus Schritt 15 zeigt auf ein Feld; liegt der gewünschte Wert im Bereich, setzt das Team ihn, die Regeln prüfen neu, und Schritt 16 führt die Änderung in `freigabe.historie`. Liegt er außerhalb, geht er als Änderung an Schritt 10 mit Entscheidung des CD und zählt als Runde.

#### 10.8 Stresstest

Schritt 10 prüft das System an seinen Grundlayouts: Post, Karussell-Titel und Folgeseite, Reel-Titel, Story, Profilkopf, Karte vorn und hinten, Signatur, Exposé-Titel, Schild, Website-Kopf. Schritt 12 nutzt dieselbe Prüfung später für jede Serienvorlage (`vorlagen[].stresstest`). Figma empfiehlt für Vorlagen einen Test aus Nutzersicht auf Überlappung (https://www.figma.com/blog/8-tips-for-designers-building-branded-templates-in-figma-buzz/), R4 Ü5 macht daraus Extremtexte und fehlendes Bild.

| Fall | Testwert (synthetisch, nie im Makler-Output) |
|---|---|
| Name lang und kurz | 30 Zeichen mit Bindestrich und Umlaut, wie im heutigen Selbsttest "Maximilian Grünberg-Hohenwarth"; 7 Zeichen |
| Kernsatz lang und kurz | acht Wörter mit langen Komposita; ein Wort |
| Kennzahl | "€ 12.450.000", "Preis auf Anfrage", "4,2 Mio." |
| Energiezeile | neue Form mit HWB, Endenergiebedarf und Klasse; alte Form mit HWB und fGEE (objektRegel, Schritt 12) |
| Folio | längster Serienname plus Folge und Seitenzahl |
| Bild fehlt | kein Objektfoto; kein Porträt |

Regeln bei fehlendem Bild: kein Ersatzfoto, kein Stock, kein generiertes Bild. Ein Post ohne Bild wird typografisch geführt (zählt in der Grammatik als textgeführt). Ein Grundlayout mit Porträtpflicht zeigt im Team-Modus eine Lückenfläche, im Makler-Output erscheint es nicht (Schritt 11 entscheidet über den Porträt-Termin). Dasselbe gilt für die Anwendungsleiste: Fehlt das Porträt oder sind seine Rechte offen, zeigt der Profilkopf einen Kreis in `flaeche` mit dem Satz "Porträt fehlt, Termin über Schritt 11" in der Folio-Stufe, die Kacheln mit Gesicht zeigen dieselbe Lückenfläche im Bildfeld. Fehlt die Einwilligung "Objektfotos zeigen", gilt das für Objektfotos ebenso. Der Stresstest führt beide Fälle als eigene Zeilen, damit man sieht, dass die Leiste ohne Bild nicht zerfällt.

Zusätzlich für Reels: Titel mit längstem Kernsatz bei Mindeststandzeit lesbar (Standzeit mindestens 0,3 Sekunden je Wort plus 1 Sekunde, Setzung), Endkarte mit längster und kürzester Dauer im Zeichen, Kurven ohne Überschwingen.

Ergebnis je Fall: `ok`, `grenzwertig` (Schrift auf Mindestgröße verkleinert, Messwert steht dabei) oder `fehler` (unter Mindestgröße, gekürzt, Überlappung, außerhalb der sicheren Zone). Der heutige Satzbaustein `hmWeltSatz` kürzt bei Überlauf mit Auslassung (`wb-markenwelten.jsx` Zeile 253 bis 258); im Stresstest ist jede Kürzung ein Fehler, im Betrieb blockiert sie den Beitrag.

#### 10.9 Gegenentwurf

Derselbe Ablauf 10.2 bis 10.8, nur für die Felder der Achse. Die Achse wird als Objekt gelesen: `idee.gezeigt.achse = {name, empfehlung, gegenentwurf, warum}`. Die Skizze des Gegenentwurfs steht in `idee.varianten[gegenentwurfId]`, die der Empfehlung in `idee.varianten[empfehlungId]`; beide sind Pflicht im Eingang. Der Achsen-Katalog ist der geschlossene Katalog aus `09_idee.md` 3.6, Schritt 10 erweitert ihn nicht:

| Achse (`achse.name`) | Pole nach Schritt 9 | darf sich in `system` unterscheiden | Team-Zeit (Setzung) |
|---|---|---|---|
| `tonwert` | Papier oder dunkler Grund | `farbe.grundton`, `farbe.proportion` (feed und druck), Aliase der Bauteil-Tokens, die auf den Grundton zeigen | 1 bis 1,5 h: Rollensätze gibt es schon, neu sind Proportion, Stresstest, Graustufen, Druck |
| `ausschnitt` | nah oder halbnah | `raster.formate[].bildfeld` (Bildfläche, Kopfposition), `bauteil.portraet.*` | 1,5 bis 2 h |
| `dichte` | weit oder dicht | `raster.formate[].rand`, `raster.formate[].spalten`, `typo.stufen` (Grade folgen der Textmenge), `bauteil.<format>.textmenge` | 1,5 bis 2 h |
| `schriftstimme` | Antiqua oder Grotesk im Kernsatz-Grad | `typo.display`, `typo.stufen`, `typo.laufweite`, `typo.lizenz`, `typo.warum`; `wortmarke` nur, wenn sie in der Displayfamilie gesetzt ist, dann neu mit Pflege, Erkennungseingriff und drei Varianten | 4 bis 6 h: zweite Wortmarke, Stufen, Stresstest |
| `zeichengewicht` | Zeichen als Signatur oder als Bildträger | `zeichen.platz` (Größe je Format), `bauteil.zeichen.groesse` | 1,5 bis 2 h |

Das Zeichen selbst (`zeichen.svg`, `zeichen.nie`), der Kernsatz, die Grammatik-Welt und die Codes sind nie die Achse (Schritt 9: "Zeichen, Kernsatz, Grammatik-Welt und Codes sind nie die Achse"). Ein bloßer Farbtausch des Akzents ist ebenfalls keine Achse, weil Farbe der schwächste Code ist (A3).

Der Vergleich läuft automatisch und listet jede Abweichung außerhalb der erlaubten Felder als Fehler (S15). Einzige Ausnahme: ein Element aus `bestandBehalten`, das in einem Feld der Achse liegt, darf im Gegenentwurf entfallen (10.1). Name, Porträt, Claim und Inhalte sind in beiden gleich, damit der Makler in Schritt 15 Form vergleicht und nicht Inhalt (Hsee 1996).

### 3.4 Was der Makler sieht und tut

In diesem Schritt nichts. Kein Termin, kein Link, keine Wahl von Schrift oder Farbe. In seiner Übersicht steht nur, dass die Gestaltung läuft und wann der Reveal ist.

Später sichtbar, und deshalb hier vorbereitet:
- **Im Reveal (Schritt 15)** sieht er das System zuerst in Anwendung: Feed, Website, Karte, Schild. Zeichen, Farbe und Schrift kommen zuletzt (R8 Muster "Anwendung vor Zeichen").
- **Im Markenbuch (Schritt 14)** bekommt er ein Handsatz-Blatt: seine Wortmarke groß, der Erkennungseingriff hervorgehoben und die Pflege-Eingriffe klein daneben, je ein Satz warum. Bei geschärftem Logo: vorher, nachher, was blieb und warum. Das macht die Arbeit sichtbar (Buell und Norton 2011: https://doi.org/10.1287/mnsc.1110.1376) und folgt dem Begründungsbuch von Rand.
- **In der Rückmeldung (Schritt 15)** kann er Wünsche als Pin setzen. Liegen sie im Spielraum, werden sie umgesetzt, ohne dass er eine Palette sieht.

### 3.5 Wer was erzeugt

| Ausgangsfeld | erzeugt von | geprüft von |
|---|---|---|
| `system.wortmarke` | Designer (Handsatz, Eingriffe, Befund), Regel (Varianten, Schutzraum, Größenleiter, Pfade) | Regel (E1, Pfade, Mindestgrößen), CD (Wirkung) |
| `system.zeichen` | Designer (Zeichnung), Regel (Plätze je Format aus Raster) | Regel (Platz in sicherer Zone), CD |
| `system.typo` | Claude oder Regel (höchstens zwei Kandidaten je Rolle), Designer (Entscheidung, Stufen, Ziffernregel) | Regel (Prüfsatz, Lizenz, Mindestgrößen, Kohorte) |
| `system.farbe` | Designer (Rollen, Akzent), Regel (Stufen, Kontrastmatrix, Graustufen) | Regel |
| `system.raster` | Regel (aus Grammatik und Plattformmaßen), Designer (Korrektur mit warum) | Regel (sichere Zonen) |
| `system.tokens` | Regel (Export) | Regel (Struktur, Aliase, `$description` vorhanden) |
| `system.sperrstufen`, `festUndVariabel`, `spielraum` | Regel (Vorgabe nach Tabellen oben), Designer (Anpassung mit warum) | CD |
| `system.stresstest[]` | Regel | CD sieht Fehler und Grenzfälle |
| `system.gegenentwurf` | wie oben | Regel (Achsen-Vergleich) |
| alle `warum` | Claude (Structured Output) oder Regel mit echten Werten; ohne Stoff setzt die Regel eine Lücke, nie einen Mustersatz | Regel (Quelle existiert im Dossier), CD |

Claude zeichnet in diesem Schritt nichts und erzeugt keine Bilder. Das folgt R4 Prinzip 2 und der UNIO-Regel gegen KI-Bilder erkennbarer Personen.

### 3.6 Beispiel: Markus Leitner

**Stoff und Herkunft.** Das Beispiel baut auf dem Beispiel in `09_idee.md` 3.11 auf und übernimmt dessen Werte, ohne sie neu zu erfinden. Jede Zeile trägt ihre Herkunft: *Schritt 9* (Beispiel 3.11), *Seed* (`wb-store.jsx` Zeile 72 und 103), *Annahme* (Feld fehlt, im Betrieb aus dem genannten Feld) oder *Lücke*. Die Figur Kenner ist nur internes Sprachbild.

**Was aus Schritt 9 kommt.**

| Feld | Wert | Herkunft |
|---|---|---|
| `idee.satz` | Neben jedem Preis steht seine Zeit. | Schritt 9 |
| `idee.zeichen` | **Das Zeitmaß**: eine waagrechte Maßlinie wie auf einem Bauplan, in der einzigen Akzentfarbe; als Spanne mit zwei Endstrichen und der Dauer darüber, als Punkt mit einem Strich und dem Stand darüber; Länge logarithmisch von einer Woche bis fünf Jahre über die nutzbare Breite des 3:4-Fensters, Mindestlänge 12 Prozent; Etiketten in Tabellenziffern; immer an der Unterkante der sicheren Fläche, bündig links | Schritt 9 |
| `brief.kernsatz` | Bei Markus Leitner ist der Zeitpunkt Teil des Preises. | Schritt 9 |
| `brief.einschraenkungen` | E1 keine Zahl ohne ihre Zeit; E2 ein Zeichen, eine Stelle, eine Akzentfarbe, nur das Zeitmaß trägt den Akzent; E3 Vormittagslicht, nie Archiv; E4 er sitzt, im Reel ein Schnitt je Gedanke, keine Musik unter der Rechnung | Schritt 9 |
| `idee.grammatik` | Welt `ruhig` (Weite): viel Grund, breiter Rand, ein Motiv je Bild; das Welt-Zeichen nicht übernommen | Schritt 9 |
| `idee.codes` | Zeitmaß, Porträtstil (sitzend, frontal, Waagrechte im Bild auf Höhe des Zeitmaßes), Serienformat (jede Folge endet mit ihrer Zeit) | Schritt 9 |
| `idee.gezeigt` | `empfehlungId` V1, `gegenentwurfId` V9, `achse {name: "tonwert", empfehlung: "Papiergrund", gegenentwurf: "dunkler Grund", warum: Regelstufe 2}` | Schritt 9 |
| `idee.gezeigt.abgenommen` | im Beispiel offen | Schritt 9 |
| `idee.begruendung` (Auszug) | "Eine Akzentfarbe, nur im Zeitmaß, aus dem Bestandslogo geschärft und zurückhaltender"; "Schrift mit Tabellenziffern und eindeutigen Ziffern in kleinen Graden"; "Ruhige Display-Schrift ohne Kontrastspitzen" | Schritt 9 |

**Was belegt ist** (Seed): Döbling, Währing, Hietzing, Kern Sievering; Zinshaus, Anlegerwohnung, Altbau; Anrede Sie auf allen Kanälen; Worte "genau, ruhig, verlässlich"; fester Termin "Dienstag nach dem Grundbuch-Termin, 11 Uhr"; Bestand mit Logo, Antwort "Behalten und schärfen"; wiedererkennbar sollen "Eine Farbe" und "Ein Satz" sein. Dazu seine Nachricht vollständig: **"Ja, dunkel passt. Der Amber-Ton darf etwas zurückhaltender sein."** (Nachricht n2, Antwort auf einen Farbvorschlag des Teams aus v1, `wb-store.jsx` Zeile 102 und 103).

**Wie seine Nachricht wirkt.** Sie hat zwei Sätze, und beide wirken, aber verschieden:
- *"Ja, dunkel passt."* ist keine Farbwahl, sondern das Signal, mit dem Schritt 9 die Achse `tonwert` gewählt hat (Regelstufe 2: offener Widerspruch zu seinen Bildpaaren mit kühlem Tageslicht). In Schritt 10 folgt daraus, dass der dunkle Rollensatz in voller Tiefe gebaut wird: als Grundton des Gegenentwurfs in allen Formaten und als Gegenton in der Empfehlung auf drei von zwölf Kacheln. Im Reveal sieht er den dunklen Entwurf vollständig mit seinem Material und entscheidet ihn selbst (`rueckmeldung.wahl`). Er ist gehört, ohne dass jemand für ihn entschieden hat.
- *"Der Amber-Ton darf etwas zurückhaltender sein."* steht in Schritt 9 schon als Begründung. Schritt 10 setzt ihn deshalb gleich im Startwert um, über die Übersetzung aus dem Spielraum (Chroma minus 0,04), statt ihn bis zur Rückmeldung liegen zu lassen.

**Was fehlt** (Lücken): Datei des alten Logos und damit Farbton, Schrift und Anordnung; ob Amber im alten Logo steht oder nur aus dem v1-Vorschlag kommt; Rechte am Studio-Porträt (in `01_auftakt.md` Beispiel `rechte: offen`); Objektfotos und die Einwilligung "Objektfotos zeigen" (offen); `vorab.fakten.seit`; Name der Schriftfamilien (Schriftbank noch nicht gepflegt); Schildmaß.

**10.0 Eingang.** Drei Sperren greifen, und das Beispiel zeigt sie, statt sie zu übergehen:
1. *Idee nicht abgenommen*: `idee.gezeigt.abgenommen` ist im Beispiel von Schritt 9 offen. Im Betrieb beginnt Schritt 10 erst nach der Abnahme durch den CD; alles Folgende zeigt, was danach entsteht.
2. *Bestandslogo fehlt*: `bestandUrteil` schärfen, aber keine Datei. Die Wortmarke bleibt im Status Entwurf, Schrift, Zeichen und Raster laufen weiter.
3. *Bildrechte offen*: Porträt mit `rechte` offen, Objektfotos ohne Einwilligung. Anwendungsleiste und Grundlayouts zeigen Lückenflächen statt Dateien.
Die Achse `tonwert` steht im Katalog, V1 und V9 stehen in `idee.varianten`: diese Sperre greift nicht.

**10.1 Befund (Vorlage, auszufüllen am echten Logo).**

| Merkmal | trägt | Entscheidung | warum |
|---|---|---|---|
| Farbe (Annahme Amber) | ja, laut `bestandBehalten` und "Eine Farbe" | korrigiert: zurückhaltender, und nur noch im Zeitmaß | `idee.begruendung` und Seed n2; E2 aus Schritt 9. Die Farbe bleibt als Eigenschaft des Zeitmaßes, sie ist nach G9 nie selbst Zeichen |
| Schrift des alten Logos | Lücke | Lücke | am Logo zu beurteilen |
| Anordnung, Form | Lücke | Lücke | am Logo zu beurteilen |

Die Farbe steht in `bestandBehalten` und darf deshalb nur bleiben oder korrigiert werden. Da die Achse `tonwert` den Akzent nicht betrifft, erscheint sie in Empfehlung und Gegenentwurf gleich.

**10.2 Schrift.** Filter aus Stimme und Begründung: harmony hoch, flourish niedrig, Tabellenziffern Pflicht, eindeutige Ziffern in kleinen Graden (die Etiketten im Zeitmaß stehen in 30 bis 34 px), keine Kontrastspitzen. Display: eine ruhige Antiqua mit optischer Größe und starken Tabellenziffern. Text: eine Grotesk mit Tabellenziffern und eindeutiger 1 und 7. Namen setzt der Designer nach Prüfsatz und Lizenz (Lücke). Das Muster nutzt als Platzhalter für den Render Newsreader und Instrument Sans aus dem Google-Katalog; das ist keine Entscheidung. `warum` der Displayfamilie: "Eine ruhige Antiqua mit starken Tabellenziffern trägt eine Idee, in der jede Zahl ihre Zeit bekommt, und klingt nach 'genau, ruhig, verlässlich'." Quelle `idee.begruendung`, `antworten.worte` über `brief.tonprofil`.

Stufen für den Post 1080 x 1350 (Setzung, Spielraum siehe 10.7):

| Stufe | Größe | Zeilenabstand | Laufweite | Ziffern | Grenze |
|---|---|---|---|---|---|
| Kernsatz | 104 px | 1,04 | -0,012 em | proportionale Versalziffern | mindestens 92 px, höchstens acht Wörter |
| Kennzahl | 220 px | 0,95 | -0,02 em | Tabellenziffern; Millionenregel aus 10.2, Einheit "Mio. €" in der Textschrift mit 0,42facher Größe auf gleicher Grundlinie | eine Kennzahl je Fläche, Mindestgröße 176 px |
| Fließtext | 48 px | 1,32 | 0 | Tabellenziffern in Zahlen | mindestens 47 px |
| Folio und Etikett im Zeitmaß | 32 px | 1,2 | +0,01 em | Tabellenziffern | mindestens 30 px |

"€ 12.450.000" wird in der Kennzahl zu "12,45 Mio. €". Geschätzte Breite bei 220 px aus mittleren Dickten: etwa 838 px bei 842 px Satzbreite, also knapp; am Render zu messen, sonst verkleinert die Regel bis 176 px und meldet "grenzwertig". Der exakte Wert steht in der Faktenzeile.

Karte: Name 11 pt, Kernsatz 9 pt, Fließtext, Folio und Etikett 8 pt (Mindestwert Moo).

**10.3 Wortmarke (Richtung für die Schärfung, am echten Logo zu prüfen).**
- *Erkennungseingriff, Kategorie `dickte`*: "Markus Leitner" steht in einem Gewicht, jede Letter auf derselben festen Dickte, wie Tabellenziffern in einer Preisspalte, jede Letter optisch in ihrer Zelle zentriert, der Wortabstand genau eine Zelle. Schmale Letter wie i, t, r stehen dadurch mit sichtbarer Luft, breite wie M und n dicht. `warum` in einem Satz: "Der Name steht auf derselben festen Dickte wie die Ziffern im Zeitmaß und liest sich wie ein Eintrag in einer Preisspalte, bemaßt statt geschrieben." Quelle `idee.zeichen.form` (Etiketten in Tabellenziffern) und `idee.satz`. Sichtbar bei 40 px: ja, die Abstände um i und t sind im Render der Anwendungsleiste deutlich (Messwert der Pixelabweichung setzt die Regel am Render). Formfremd: in der Kohorte des Seeds (Sara, Elif) trägt keine Wortmarke die Kategorie `dickte`; S21 läuft nach dem Bau.
- *Pflege*: optische Mitte je Zelle (runde Formen brauchen weniger Luft als gerade), zwei Fassungen mit eigener Strichstärke für kleine Grade (Karte, Signatur) und große (Schild, Website-Kopf), Wortabstand als ganze Zelle.
- *Gestapelt*: "Markus" über "Leitner" auf demselben Zellraster, linksbündig. Weil beide Zeilen dieselbe Dickte haben, stehen die Letter in Spalten übereinander, M über L, a über e, r über i. Die gestapelte Form zeigt die Tabelle, ohne eine Linie zu zeichnen.
- *Monogramm*: die erste Spalte der gestapelten Form, M über L, ohne Kreis und ohne Punkt. `warum`: "Das Monogramm ist die erste Zeile seiner Tabelle, keine neue Form." Mindestgröße 24 px Höhe (Setzung); das Favicon in 16 px wird am Render geprüft (Lücke).
- *Bei geschärft*: Die Dickte ist nur zulässig, wenn zwei von drei tragenden Merkmalen des Bestandslogos erkennbar bleiben (E2). Bricht sie das, entfällt sie, und die Erkennung muss aus einem Merkmal des Bestands kommen, das die drei Proben besteht. Entscheidung am echten Logo.
- *Profilbild*: sein Porträt, frontal und sitzend, nie die Wortmarke. Solange die Rechte offen sind, eine Lückenfläche.

Was ausdrücklich nicht gewählt wurde: Name mit Unterstreichung oder Maßlinie darunter (Branchenstandard und eine Doppelung des Zeitmaßes, das nach E2 nur an einer Stelle steht), L mit verlängertem Fuß (Initiale mit verlängertem Strich, Standard).

**10.4 Zeichen, Platz je Format.** Die Form kommt aus Schritt 9, Schritt 10 legt Maße und Plätze fest.

| Format | Platz | Maß (Setzung) |
|---|---|---|
| Post 1080 x 1350 | Unterkante der sicheren Fläche, bündig am linken Rand: Linie auf y 1231 px, Nullstelle x 119 px; Etikett linksbündig über der Linie, Folio rechtsbündig in derselben Zeile | Strich 8 px, Endstriche 8 x 48 px; nutzbare Länge 842 px; 11 Wochen ergeben 420 px, 2 Jahre 720 px, 1 Woche 101 px (Mindestlänge) |
| Reel und Story 1080 x 1920 | Endkarte: in der Reel-Zone unten, y 1180 px, x 119 px; im Titel nie | Strich 8 px |
| Karte vorn | unterer Rand, bündig mit der Wortmarke, als Punkt mit Etikett aus `vorab.fakten.seit` (Lücke) | Strich 0,5 mm, Endstrich 3 mm |
| Exposé A4 | Titelseite, unter der Kennzahl: Dauer auf dem Markt oder Stand | Strich 0,8 mm |
| Schild | unten links, als Punkt mit Stand | Maß Lücke |
| Signatur, Website-Kopf | kein Zeichen, nur Wortmarke; ohne Zahl kein Anlass für das Zeitmaß | |

`nie[]`: nicht als Uhr, Sanduhr oder Kalenderblatt (Verbote aus Schritt 9); nie ohne Etikett; nie auf `flaeche` des hellen Tonwerts, weil der Akzent dort genau 3,01:1 erreicht (siehe 10.5); nie als Muster, Unterstreichung oder Hintergrund; nie ein Etikett ohne Beleg oder Stand.

**10.5 Farbe (Arbeitswerte, Farbton bis zur Messung am alten Logo eine Annahme).** Alle Kontraste nachgerechnet mit der WCAG-Formel.

| Rolle | hell (Grundton der Empfehlung) | Kontrast | dunkel (Grundton des Gegenentwurfs) | Kontrast |
|---|---|---|---|---|
| grund | OKLCH 0,960 0,010 85, #F5F1EA | | OKLCH 0,185 0,005 70, #141210 | |
| flaeche | 0,925 0,013 85, #EAE6DD | | 0,245 0,006 70, #22201D | |
| text | 0,205 0,006 70, #191714 | 15,89 auf grund, 14,36 auf flaeche | 0,949 0,009 85, #F1EEE7 | 16,13 auf grund, 14,02 auf flaeche |
| linie | 0,74 0,012 80, #AFAAA3 | 2,05, nur Trennung | 0,40 0,008 75, #4A4743 | 2,02, nur Trennung |
| akzent | 0,62 0,110 68, #B17834 | 3,33 auf grund (Grafik), 3,01 auf flaeche (nicht zugelassen) | 0,72 0,110 68, #D29754 | 7,38 auf grund, 6,42 auf flaeche (Grafik und Text) |

Herleitung des Akzents: Grundwert `basis.farbe.akzent` ist der angenommene Bestandston OKLCH 0,72 0,15 68 (#E1901F) mit Chroma minus 0,04 nach der Übersetzung "zurückhaltender", also 0,72 0,11 68. Auf dem dunklen Grund trägt er so. Für den hellen Grund senkt die Regel die Helligkeit, bis er als Grafik 3:1 erreicht: bei 0,62. So bleibt es ein Ton in zwei Helligkeiten, keine zweite Palette. Das Etikett über dem Zeitmaß steht in beiden Tonwerten in der Textfarbe; die Information liegt damit doppelt vor, in Zahl und Länge, und die Marke bleibt in Graustufen erkennbar, weil das Zeitmaß über seine Form wirkt.

Korrektur zu Fassung 1: Dort stand für Text #191714 auf einer Amber-Fläche #E1901F 6,56:1. Richtig ist 6,99:1; 6,56:1 gilt für #CB914E. Eine Amber-Fläche mit Text gibt es in dieser Fassung nicht mehr, weil nach E2 nur das Zeitmaß den Akzent trägt.

Proportion (Setzung):

| Satz | Empfehlung (Papier) | Gegenentwurf (dunkel) |
|---|---|---|
| Feed, Kacheln | 9 im Grundton hell, 3 im Gegenton dunkel (`tonwertPeriode` 4, Schritt 12) | 9 dunkel, 3 hell |
| Feed, je Kachel ohne Foto | grund 84, flaeche 0, text 15,5, akzent 0,5 Prozent (gerechnet: Strich 8 x 720 px plus zwei Endstriche 8 x 48 px ergeben 6.528 px² von 1.458.000 px², also 0,45 Prozent) | gleich, im dunklen Satz |
| Karte | vorn und hinten hell: grund 88, text 10, akzent 2 | vorn dunkel: grund 86, text 12, akzent 2; hinten hell |
| Exposé | hell: grund 80, flaeche 8, text 11, akzent 1 | Titel dunkel, Innenseiten hell, weil Fließtext und Energiekennzahlen auf Papier besser lesbar sind (Setzung) |
| Schild | hell: grund 78, text 20, akzent 2 | dunkel: grund 78, text 20, akzent 2 |

Der Akzent hat im Feed einen halben Prozentpunkt der Fläche. Das ist die Übersetzung von "Farbe begleitet" in eine Zahl.

**Rückmeldung im Spielraum.** Schreibt Markus in Schritt 15 noch einmal "zurückhaltender", setzt die Übersetzung Chroma 0,11 auf 0,07. Die Regel leitet neu ab: dunkel #C29D75 (7,45:1 auf grund), hell mit Helligkeit 0,615 #A17D56 (3,34:1 auf grund). Beide Werte liegen im Bereich 0,07 bis 0,15, die Kontrastschwellen halten, Stresstest und Graustufen laufen neu, Schritt 16 schreibt Version 1.1 in die Historie. Ein weiteres "zurückhaltender" läge unter 0,07 und ginge als Änderung an Schritt 10 mit Entscheidung des CD. "Kräftiger" führt auf 0,13 (dunkel #DA943F, hell #B97515).

**10.6 Raster Post.** Grammatik Weite (`HM_MARKENWELTEN.ruhig.raster`: Rand 0,11, vier Spalten): Rand 119 px vom Postrand, im 3:4-Fenster bleiben 85 px, Satzbreite 842 px, vier Spalten. Zeitmaß-Zeile auf y 1231 px. Bildfeld für das Porträt: Waagrechte des Bildes auf Höhe der Zeitmaß-Linie (Code Porträtstil aus Schritt 9, Crop in Schritt 11).

**10.7 Motion (Werte für Markus).**
- Reel-Titel: zeilenweise aufdecken von unten, 480 ms je Zeile, Versatz 120 ms, Kurve cubic-bezier(0.25, 0, 0, 1), kein Überschwingen. Standzeit mindestens 0,3 Sekunden je Wort plus 1 Sekunde. `warum`: E4 "ein Schnitt je Gedanke" und "ruhig" aus seinen Worten; nichts federt.
- Endkarte: Das Zeitmaß zeichnet sich von der Nullstelle nach rechts mit fester Geschwindigkeit von 900 px je Sekunde, linear; der Endstrich setzt hart, das Etikett erscheint 200 ms später ohne Einblendung. Eine Spanne von 11 Wochen braucht so 0,47 Sekunden, zwei Jahre 0,80 Sekunden. `warum`: "Neben jedem Preis steht seine Zeit." Die längere Geduld braucht sichtbar länger, die Zeit wird in Zeit gezeigt. Linear ist hier begründet, weil es eine Messbewegung ist.
- Folio und Wortmarke stehen ab dem ersten Bild der Endkarte.

**10.7 Tokens (Auszug, Empfehlung).**

```json
{
  "basis": {
    "farbe": {
      "bestand": { "$type": "color", "$value": { "colorSpace": "oklch", "components": [0.72, 0.15, 68], "hex": "#E1901F" },
        "$description": "Annahme: der Ton, den Herr Leitner an seinem bisherigen Auftritt behalten will; am alten Logo zu messen.",
        "$extensions": { "at.unio.werkbank": { "quelle": "3: vorlieben.bestandBehalten", "status": "annahme", "sperrstufe": "fest" } } },
      "akzent": { "$type": "color", "$value": { "colorSpace": "oklch", "components": [0.72, 0.11, 68], "hex": "#D29754" },
        "$description": "Der Bestandston, zurückhaltender gesetzt, wie er es selbst gewünscht hat; Eigenschaft des Zeitmaßes, nie ein eigener Code.",
        "$extensions": { "at.unio.werkbank": { "quelle": "9: idee.begruendung", "spielraum": { "chroma": [0.07, 0.15], "hue": [62, 74] } } } }
    }
  },
  "rolle": {
    "farbe": {
      "$extensions": { "at.unio.werkbank": { "grundton": "hell" } },
      "hell": {
        "grund": { "$type": "color", "$value": { "colorSpace": "oklch", "components": [0.96, 0.01, 85], "hex": "#F5F1EA" },
          "$description": "Papier: Das Zeitmaß ist eine Bemaßung und liest sich auf Papier wie ein Plan oder ein Gutachten." },
        "akzent": { "$type": "color", "$value": { "colorSpace": "oklch", "components": [0.62, 0.11, 68], "hex": "#B17834" },
          "$description": "Der Akzent auf Papier, Helligkeit gesenkt, bis das Zeitmaß als Grafik 3,33 zu 1 erreicht.",
          "$extensions": { "at.unio.werkbank": { "ableitung": { "von": "basis.farbe.akzent", "ziel": "3:1 auf rolle.farbe.hell.grund" } } } }
      },
      "dunkel": {
        "akzent": { "$type": "color", "$value": "{basis.farbe.akzent}",
          "$description": "Auf dunklem Grund trägt der Grundwert selbst, 7,38 zu 1." }
      }
    }
  },
  "bauteil": {
    "zeichen": {
      "farbe": { "$type": "color", "$value": "{rolle.farbe.hell.akzent}",
        "$description": "Nur das Zeitmaß trägt den Akzent (Einschränkung E2 aus Schritt 9)." },
      "strich": { "$type": "dimension", "$value": { "value": 8, "unit": "px" },
        "$description": "Acht Pixel auf 1080, damit die Linie auch in der Rasteransicht als Linie sichtbar bleibt." }
    },
    "reel": {
      "endkarte": {
        "zeichen": { "$type": "transition", "$value": { "duration": { "value": 0, "unit": "ms" }, "delay": { "value": 0, "unit": "ms" }, "timingFunction": [0, 0, 1, 1] },
          "$description": "Das Zeitmaß zeichnet sich mit fester Geschwindigkeit, damit eine längere Dauer sichtbar länger braucht.",
          "$extensions": { "at.unio.werkbank": { "geschwindigkeit": { "wert": 900, "einheit": "px/s" }, "sperrstufe": "fest", "spielraum": [0.85, 1.15] } } }
      }
    }
  }
}
```

Die Dauer steht auf 0, weil sie sich aus Länge und Geschwindigkeit ergibt; der Renderer rechnet sie je Kachel. Die Schreibweise der Wertobjekte ist ein Entwurf und wird vor dem Bau gegen den Spezifikationstext geprüft. Im Gegenentwurf steht `grundton` auf `dunkel`, und die Bauteil-Aliase zeigen auf `rolle.farbe.dunkel.*`; sonst ist die Datei gleich.

**10.8 Stresstest (erwartete Befunde; die Anwendungsleiste ist gerendert, siehe Muster).**
- Hook "Ich habe vom Verkauf abgeraten. Hier ist die Rechnung." hat neun Wörter und verletzt die Acht-Wörter-Grenze. Befund an Schritt 12, keine Kürzung im Renderer (Schritt 14 schlägt "Vom Verkauf abgeraten. Hier ist die Rechnung." vor).
- Kennzahl "12,45 Mio. €" bei 220 px: geschätzt 838 von 842 px, voraussichtlich "grenzwertig"; Messwert am Render.
- Zeitmaß kürzeste Dauer (1 Woche, 101 px): Das Etikett "1 Woche" ist breiter als die Linie und steht linksbündig über ihr hinaus. Ergebnis ok, weil das Etikett an der Nullstelle hängt.
- Zeitmaß längste Dauer (5 Jahre, 842 px) mit längstem Serienname im Folio: Etikett links, Folio rechts in derselben Zeile; bei mehr als 520 px Folio-Breite "fehler", Befund an Schritt 12 (Serienname kürzen, nie im Renderer).
- Porträt mit offenen Rechten: Profilkopf und Gesichtskacheln als Lückenfläche. Ergebnis ok, weil die Leiste ohne Bild ihre Ordnung hält.
- Kein Objektfoto und keine Einwilligung: Grundlayout Objekt typografisch mit Fakten und Energiezeile; ohne Energiekennzahlen blockiert es (Befund 8 in `14_markenbuch.md`).
- Reel-Titel mit acht Wörtern: Standzeit 3,4 Sekunden.

**Muster.** `schritte/muster/10_anwendungsleiste.html` (mit Render `10_anwendungsleiste.png`) zeigt die Anwendungsleiste der Empfehlung mit den Werten oben: Profilkopf mit Lückenfläche statt Porträt, drei Kacheln (Beleg Zinshaus Sievering mit Zeitmaß "11 Wochen", Kernsatz-Kachel im Gegenton dunkel mit Zeitmaß als Punkt, Gesichtskachel mit Lückenfläche), Karte vorn und hinten, Schild. Schriftnamen im Muster sind Platzhalter, Zahlen sind als Selbstauskunft markiert, weil die Unterlagen fehlen. Was der Render schon zeigt: Im Platzhalter-Satz berührt das M das a, weil ein breites M in einer festen Dickte übersteht. Das ist ein Pflege-Befund für 10.3 (das M braucht eine schmalere Fassung in seiner Zelle) und genau die Art Fehler, die man an der Beschreibung nicht sieht.

**10.9 Gegenentwurf, Achse `tonwert`.** Grundton dunkel: Feed mit neun dunklen und drei hellen Kacheln, Karte vorn dunkel, Exposé-Titel dunkel, Schild dunkel. Rollensätze, Akzent, Wortmarke, Zeichen, Schrift, Stufen, Raster und Motion sind identisch; der Vergleich S15 findet Unterschiede nur in `farbe.grundton` und `farbe.proportion`. Auf dunklem Grund steht das Zeitmaß in #D29754 und erreicht 7,38:1, es wirkt dort kräftiger als auf Papier; genau das ist der Unterschied, den er im Reveal sieht. Er ist gleichwertig ausgearbeitet: eigener Stresstest, eigener Graustufen-Render, alle Grundlayouts. Team-Zeit 1 bis 1,5 h.

**Team-Zeit für Markus (Setzung).** Empfehlung mit Bestandsbefund 6,5 bis 9,5 h, Gegenentwurf 1 bis 1,5 h, zusammen 7,5 bis 11 h, dazu 20 Minuten CD.

---

## 4. Fragen an den Makler

**Keine.** Jede denkbare Frage ist entweder schon beantwortet, wird abgeleitet oder ist eine Gestaltungsaufgabe, die er nach der Rubrik nie bekommt.

| Möglicher Inhalt einer Frage | wirkt auf | woher stattdessen |
|---|---|---|
| Welche Schrift gefällt Ihnen | `system.typo` | `stimme.regler` (8), `idee` und `brief` (9), `vorlieben.profil` Dimension Typografie über Schritt 9 |
| Welche Farbe wollen Sie | `system.farbe.akzent` | `vorlieben.bestandBehalten` (3), `vorab.logoAlt.farben` (1), `idee` (9) |
| Soll das alte Logo bleiben | `system.wortmarke.typ` | `vorlieben.bestandUrteil` (3), entschieden am echten Logo |
| Dürfen wir das alte Logo verändern | Blocker in 10.0 | `vorab.material` Eintrag "Altes Logo" mit `rechte` (1); offene Rechte klärt das Team als Aufgabe, keine neue Frage |
| Welche Formate brauchen Sie | `system.raster` | Vertrag (alle Formate Pflicht), `kanaele` über den Kanalplan in 12 |
| Welche Druckerei, welches Schild | `raster` Karte und Schild | UNIO-Standard und Einrichtung (Lücke beim Schildmaß, Frage an UNIO, nicht an den Makler) |
| Was darf nie vorkommen | `zeichen.nie`, Schriftfilter | `richtung.tabus` (6) |
| Feinwünsche nach dem Reveal | Werte im `spielraum` | `rueckmeldung.pins` der Art Änderung (15), über `system.pinZuordnung` |
| Hell oder dunkel | `farbe.grundton` | Achse `tonwert` aus Schritt 9; beide Fassungen in Anwendung, er wählt in 15 mit `rueckmeldung.wahl` |
| Darf ein Element Ihres alten Logos entfallen | `wortmarke.herleitung.bestand` | keine Zwischenfrage: es bleibt oder wird korrigiert; liegt es in einem Feld der Achse, zeigt der Gegenentwurf die Fassung ohne, und `rueckmeldung.wahl` in 15 entscheidet (10.1) |
| Dürfen wir Ihr Porträt und Ihre Objekte zeigen | Lückenfläche oder Datei in den Grundlayouts | `vorab.material[].rechte`, `auftrag.einwilligungen` Zweck "Objektfotos zeigen" (1), gefragt in Schritt 1 zum dort festgelegten Zeitpunkt |

---

## 5. Eingang und Ausgang

### 5.1 Eingang

Genau nach Vertrag:

| Von | Feld | Wofür in Schritt 10 |
|---|---|---|
| 9 | `idee` (satz, zeichen, grammatik, neuInEinemPunkt) | Herleitung jeder Formentscheidung, Zeichen, Grammatik für Rand und Spalten |
| 9 | `idee.codes` | Graustufen-Test und Platz der Codes je Format |
| 9 | `idee.begruendung` | Quelle für `warum`, Abgleich, dass das System der Begründung nicht widerspricht |
| 9 | `idee.gezeigt` (`empfehlungId`, `gegenentwurfId`, `achse {name, empfehlung, gegenentwurf, warum}`, `abgenommen {cd, datum}`) | Achse als Objekt, Sperren in 10.0: ohne `abgenommen` oder mit einer Achse außerhalb des Katalogs blockiert der Schritt |
| 9 | `brief.einschraenkungen` | harte Filter für Schrift, Farbe, Raster |
| 3 | `vorlieben.bestandUrteil` | `wortmarke.typ`, Blocker bei fehlendem Bestandslogo |
| 3 | `vorlieben.bestandBehalten` | Pflichtmerkmale im Befund, Herkunft des Akzents |
| 1 | `vorab.logoAlt` | Datei, Farben, Schriftvermutung, Elemente für den Befund |
| 8 | `stimme.regler` | Schriftfilter |
| 8 | `botschaften.claim` | Probesatz, Stresstest, Wortmarken-Anwendungsleiste; nie neu formuliert |
| 6 | `richtung.tabus` | `zeichen.nie`, Schriftfilter |

**Ergänzungen mit Begründung** (Vorschlag für die Zerlegung):

| Von | Feld | Warum | Symmetrie |
|---|---|---|---|
| 9 | `idee.varianten`, mindestens die Einträge zu `empfehlungId` und `gegenentwurfId` | Skizze von Empfehlung und Gegenentwurf; ohne sie baut Schritt 10 den Gegenentwurf aus der Achse allein und verliert, was Schritt 9 im Wandtest gesehen hat | Schritt 9 nennt als Abnehmer von `idee.varianten` nur 14; Vorschlag: 10 ergänzen |
| 1 | `vorab.material` | Porträt und eigene Objektfotos für die Anwendungsleiste und den Stresstest; `rechte` am alten Logo, am Porträt und an Objektfotos für die Sperren in 10.0 | Schritt 1 nennt 10 schon als Nachfolger |
| 1 | `auftrag.einwilligungen` (Zweck "Objektfotos zeigen") | ohne `ja` zeigen Anwendungsleiste und Grundlayouts Lückenflächen statt Objektfotos | Schritt 1 nennt 10 bei diesem Zweck schon als Abnehmer (`01_auftakt.md`, Tabelle der Einwilligungen) |
| Extern | Stammdaten des Maklers (Name, Kernbezirk) | der Name ist das Material der Wortmarke; Kernbezirk für die Kohortenprüfung | wie heute `makler` im Store |
| Extern | `system` aller anderen UNIO-Makler (Kohorte) | E8, Rubrik Spezifität | wie Schritt 6 und 14 |

### 5.2 Ausgang

```js
system: {
  version: "1.0", stand: "ISO", status: "entwurf" | "geprueft",
  variante: "empfehlung", idee: "Id aus idee.gezeigt.empfehlungId",
  wortmarke: {
    typ: "neu" | "geschaerft" | "behalten",
    svg: { liegend: "", gestapelt: "", monogramm: "" },          // nur Pfade, currentColor
    varianten: [{ id: "liegend" | "gestapelt" | "monogramm", einsatz: [""], fassung: "klein" | "gross", mindestgroesse: { px: 0, mm: 0 } }],
    schutzraum: { einheit: "versalhoehe", wert: 1 },
    mindestgroesse: { px: 0, mm: 0 },
    herleitung: { satz: "", eingriffe: [{ klasse: "pflege" | "erkennung", art: "", kategorie: "", wo: "", wert: "", sichtbar40: {}, warum: "", quelle: {} }],
                  bestand: [{ merkmal: "", traegt: true, ausBestandBehalten: true, entscheidung: "bleibt" | "korrigiert" | "entfaellt", nurImGegenentwurf: false, warum: "", hinweis: "" }] }
  },
  zeichen: { name: "", svg: "", platz: { post: {}, reel: {}, story: {}, karte: {}, signatur: {}, expose: {}, schild: {}, website: {} }, datenregel: null, nie: [""] },
  typo: {
    display: { familie: "", schnitte: [0], achsen: {} }, text: { familie: "", schnitte: [0] },
    lizenz: [{ familie: "", art: "", url: "", deckt: { web: "ja", social: "ja", druck: "ja", logoPfade: "ja" }, geprueftVon: "", geprueftAm: "" }],
    stufen: { post: { kernsatz: {}, kennzahl: {}, fliesstext: {}, folio: {} }, karte: {}, expose: {}, schild: {}, reel: {} },
    ziffern: { tabellen: "tnum lnum", kernsatz: "pnum lnum", tausender: ".", einheit: "" },
    laufweite: { display: 0, text: 0, folio: 0 },
    warum: [{ entscheidung: "", warum: "", quelle: {} }]
  },
  farbe: {
    grundton: "hell" | "dunkel",
    tonwerte: { hell:   { grund: {}, text: {}, flaeche: {}, linie: {}, akzent: {} },   // je { oklch: [], hex: "", cmyk: "Lücke", token: "rolle.farbe.hell.grund" }
                dunkel: { grund: {}, text: {}, flaeche: {}, linie: {}, akzent: {} } },
    grund: {}, text: {}, flaeche: {}, linie: {}, akzent: {},           // Vertragsfelder: Verweis auf tonwerte[grundton], kein eigener Wert
    basisAkzent: { oklch: [], hex: "", herkunft: "", status: "gemessen" | "annahme" },
    proportion: { feed: { kachelnGrundton: 9, kachelnGegenton: 3, jeKachel: { grund: 0, flaeche: 0, text: 0, akzent: 0 } },
                  druck: { karte: {}, expose: {}, schild: {} } },
    kontrast: [{ vorne: "", hinten: "", wert: 0, einsatz: "fliesstext" | "grosserText" | "grafik" | "begleitung" }],
    warum: [{ entscheidung: "", warum: "", quelle: {} }]
  },
  raster: { formate: [{ id: "", breite: 0, hoehe: 0, einheit: "px" | "mm", rand: 0, spalten: 0, bundsteg: 0, fenster: null, bildfeld: {}, tonwert: "", sichereZonen: [] }] },
  tokens: { dtcg: {}, css: "", stand: "ISO" },
  sperrstufen: [{ bauteil: "", stufe: "fest" | "stil" | "rahmen" | "variante", offen: [""] }],
  festUndVariabel: { fest: [""], variabel: [{ was: "", bereich: "", rhythmus: "quartal" }] },
  spielraum: [{ pfad: "basis.|rolle.|bauteil.", groesse: "", von: 0, bis: 0, start: 0, einheit: "", uebersetzung: {}, ableitung: [""], pruefung: [""] }],
  pinZuordnung: [{ feld: "system.farbe.akzent", token: "basis.farbe.akzent", spielraum: true }],
  stresstest: [{ grundlayout: "", format: "", fall: "", ergebnis: "ok" | "grenzwertig" | "fehler", messwert: "", render: "" }],
  pruefung: { eingang: [{ sperre: "", befund: "", aufgabe: "" }], bildrechte: [{ datei: "", art: "portraet" | "objekt", status: "frei" | "luecke", grund: "" }],
              kontrast: {}, graustufen: {}, kohorte: {}, formaehnlichkeit: [{ element: "", gegen: "", ueberdeckung: 0 }], herleitung: [], lizenz: {}, achse: {}, cd: { name: "", datum: "" } },
  gegenentwurf: { /* dieselbe Struktur ohne gegenentwurf, variante: "gegenentwurf", idee: "gegenentwurfId", achse: { name: "", felder: [""] } */ }
}
```

**Abnehmer je Feld** (Rubrik: jedes Ausgangsfeld hat einen Abnehmer):

| Feld | Abnehmer |
|---|---|
| `system.wortmarke` | 14 (Kapitel Zeichen und System, Handsatz-Blatt), 15 (Reveal), 16 (Paket "Wortmarke als SVG", siehe Abweichung 3), Renderer in 13 über Tokens und Asset |
| `system.zeichen` | 11 (Crop folgt dem Zeichen), 12 (Platz der Serienkennung), 14 |
| `system.typo` | 12 und 13 über `system.tokens`, 14, 16 (Website über `quelle`) |
| `system.farbe` | 11 (Farbbehandlung), 12 (Tonwert-Periode der Grammatik), 13 (`kontrastOk`) |
| `system.raster` | 11 (Crops je Format), 12 (Vorlagen, sichere Zonen Reel) |
| `system.tokens` | 12, 13, 16 (`quelle`), 17 über `quelle` |
| `system.sperrstufen` | 12 (Felder der Vorlagen), 17 (wer freigibt) |
| `system.festUndVariabel` | 12, 17 (`quartal`) |
| `system.spielraum` | 15 (was als Änderung umsetzbar ist), 16 |
| `system.pinZuordnung` | 15 (Pin-Feld zu Token-Pfad), Renderer in 13 (`data-feld`) |
| `system.stresstest` | 14 (Gate 2), 12 nutzt dieselbe Prüfung |
| `system.pruefung` | 14 (`qualitaet.aehnlichkeitKohorte`, Gate 2) |
| `system.gegenentwurf` | 13 (`feed.gegenentwurf`), 15 |

### 5.3 Abweichungen vom Vertrag, begründet

1. **Neues Feld `system.pruefung`.** Kontrast, Graustufen, Kohorte, Herleitungsbefunde, Lizenzstatus, Achsen-Vergleich und die Abzeichnung des CD brauchen einen Ort, den Schritt 14 für Gate 2 liest. Ohne das Feld stünden die Ergebnisse verstreut in `farbe.kontrast` und im Stresstest. Abnehmer: 14, das `system` vollständig liest.
2. **Meta-Felder `version`, `stand`, `status`, `variante`, `idee`.** Nötig, damit Schritt 16 eine Version einfrieren und Schritt 15 Änderungen im Spielraum als Version führen kann. Kein neuer Inhalt.
3. **Hinweis an Schritt 16.** Sein Eingang nennt aus Schritt 10 nur `system.tokens` und `system.spielraum`, das Übergabepaket enthält aber die Wortmarke als SVG. Vorschlag: Eingang von 16 um `system.wortmarke` und `system.zeichen` ergänzen, oder festhalten, dass 16 sie über `markenbuch` aus 14 liest. Schritt 10 liefert beides in jedem Fall.
4. **`typo.lizenz` als Liste je Familie** statt eines Werts, weil Display und Text verschiedene Lizenzen haben können. Inhalt wie im Vertrag (Web, Social, Druck), ergänzt um Logo-Pfade (BENCHMARK_MARKE 2.3 Fehler 3).
5. **Farbe als Rollensatz je Tonwert.** Der Vertrag nennt `{grund, text, flaeche, linie, akzent, proportion}` einmal. Schritt 10 führt die fünf Rollen zweimal unter `farbe.tonwerte.hell` und `farbe.tonwerte.dunkel`, dazu `farbe.grundton` und `farbe.basisAkzent`. Die Vertragsfelder bleiben als Verweis auf den Satz des Grundtons, damit Abnehmer, die nur `system.farbe.grund` lesen, weiter funktionieren. Grund: Der Gegenton aus der Grammatik von Schritt 12 und der Gegenentwurf auf der Achse `tonwert` brauchen einen vollständigen, geprüften Satz; ein einzelner "dunkel"-Wert ohne Rollen (wie #F1EEE7 in Fassung 1) lässt Text und Akzent auf dem Gegenton ungeprüft. Abnehmer: 12 (Gegenton), 13 (`kontrastOk`), 15 (Achse im Reveal).
6. **Proportion getrennt für Feed und Druck.** `farbe.proportion.feed` mit dem Anteil der Gegenton-Kacheln aus der Grammatik von Schritt 12 und `farbe.proportion.druck` je Format. Ein gemeinsamer Wert beschreibt keinen der beiden Fälle richtig (10.5).
7. **`wortmarke.typ` "behalten".** Der Vertrag kennt nur neu und geschärft. `vorlieben.bestandUrteil` aus Schritt 3 kennt aber drei Werte, und bei behalten ändert Schritt 10 die Form nicht, sondern liefert nur Reinzeichnung, Varianten, Schutzraum, Mindestgrößen und Tokens (10.1). E1 gilt dann nicht, S21 läuft trotzdem. Ohne den dritten Wert müsste Schritt 10 ein behaltenes Logo als geschärft ausweisen und damit einen Eingriff behaupten, den es nicht gibt.
8. **`system.pinZuordnung` und Namensraum im Spielraum.** Neu, damit ein Pin aus Schritt 15 auf `system.*` ohne Deutung einen Token-Pfad findet (10.7). Abnehmer: 15 und die Renderer über `data-feld`.
9. **Eingang ergänzt** um `idee.varianten`, `idee.gezeigt.abgenommen`, `auftrag.einwilligungen` und `vorab.material` (5.1). Motion steht nicht als eigenes Feld, sondern als Bauteil-Tokens in `system.tokens` und als Zeilen in `sperrstufen` und `spielraum`, also im Vertrag.
10. **Hinweis an Schritt 15.** Die Beispielwerte in `15_reveal.md` (Zeile 370: Chroma 0,15 auf 0,11, #CB914E) stammen aus Fassung 1. Nach dieser Fassung ist der Startwert schon 0,11, ein weiteres "zurückhaltender" führt auf 0,07 mit hell #A17D56 und dunkel #C29D75 (3.6, 10.5). Schritt 15 übernimmt die Werte beim nächsten Durchgang.

---

## 6. Qualitätsprüfung im Schritt

**Automatisch** (neuer Selbsttest `hmSelbsttestSystem`, läuft nach jeder Änderung und im Selbsttest der Einstellungen):

| Nr. | Prüfung | Fehler, wenn |
|---|---|---|
| S1 | Eingang vollständig | Pflichtfeld fehlt; `idee.gezeigt.abgenommen` leer; `achse.name` nicht im Katalog von Schritt 9; `idee.varianten` ohne `empfehlungId` oder `gegenentwurfId`; schärfen oder behalten ohne Logo-Datei oder mit offenen Rechten; eine Porträt- oder Objektdatei erscheint in Anwendungsleiste oder Grundlayout, obwohl `rechte` nicht geklärt oder die Einwilligung "Objektfotos zeigen" nicht `ja` ist (dann muss dort eine Lückenfläche stehen) |
| S2 | Handschrift | Pflege unvollständig (Kerning, optische Größe, Wortabstand ohne Messwert); kein Eingriff der Klasse erkennung; Erkennungseingriff mit Pixelabweichung bei 40 px unter 3 Prozent, ohne Satz mit Quelle `idee.zeichen` oder `brief.kernsatz`, mit einer Kategorie der Standardliste (Unterstreichung, Punkt, Kreis, fetter Nachname, Farbwechsel, verlängerte Initiale) oder mit derselben Kategorie wie ein Makler im selben oder angrenzenden Bezirk. Gilt nicht bei `typ` behalten |
| S3 | Pfade sauber | SVG enthält `<text>`, `linearGradient`, `radialGradient`, `filter` oder feste Farben statt `currentColor` |
| S4 | Varianten vollständig | liegend, gestapelt, Monogramm fehlen in einer der drei Farbstellungen |
| S5 | Größenleiter | eine Variante ist in einem Grundlayout unter ihrer Mindestgröße eingesetzt |
| S6 | Schrift | mehr als eine Display- oder Textfamilie; Prüfsatz nicht bestanden; Lizenz für Logo-Pfade nicht "ja" bei der Wortmarkenfamilie |
| S7 | Stufen | Kernsatz in der Kachel unter 92 px, Fließtext unter 47 px, Folio unter 30 px, Druck unter 8 pt |
| S8 | Kontrastmatrix | eine Rolle ist für einen Einsatz freigegeben, dessen Schwelle sie nicht erreicht |
| S9 | Farbe allein | Information steht in einem Ton unter 3:1 ohne Form oder Position als zweiten Träger |
| S10 | Graustufen | im Graustufen-Render sind weniger als zwei Codes aus `idee.codes` erkennbar (Team-Urteil, Regel erzeugt den Render) |
| S11 | Sichere Zonen | Text, Wortmarke oder Gesicht liegen außerhalb des 3:4-Fensters, der Reel-Zone oder des Druck-Sicherheitsabstands |
| S12 | Tokens | ein Token ohne `$description`; Alias zeigt ins Leere oder im Kreis; eine der drei Ebenen fehlt; ein Rollensatz (hell oder dunkel) unvollständig; Pflicht-Motion-Tokens fehlen; eine Kurve überschwingt (Kontrollpunkt über 1 oder unter 0) |
| S13 | Eine Quelle | Renderer, Brand-Kit, Website, Karte oder Reel enthalten Farb- oder Schriftwerte außerhalb der Tokens |
| S14 | Stresstest | ein Fall "fehler"; "grenzwertig" ohne Begründung |
| S15 | Achse | Gegenentwurf weicht außerhalb der Felder seiner Achse nach Tabelle 10.9 ab (einzige Ausnahme: ein Element aus `bestandBehalten` in einem Achsenfeld entfällt); Empfehlung lässt ein Element aus `bestandBehalten` entfallen; Gegenentwurf ohne eigenen Stresstest |
| S16 | Kohorte | anderer Makler im selben oder in einem angrenzenden Bezirk mit gleicher Grammatik und entweder gleicher Displayfamilie oder Akzent mit Farbtonabstand unter 20 Grad und Helligkeitsabstand unter 0,08 (Setzung). Die Nachbarschaft der 23 Bezirke steht als Tabelle `HM_BEZIRK_NACHBARN` in der Werkbank, gepflegt nach den Bezirksgrenzen der Stadt Wien (Lücke: Tabelle vor dem Bau anlegen und gegen die amtliche Karte prüfen) |
| S17 | UNIO-Regeln in Grundlayouts | kleine Textzeile über einer Headline (Eyebrow, gemessen: Text über der Headline mit weniger als halber Headline-Größe), Textzeichen als Icon, Verlauf, Glow, Gedankenstrich oder Ausrufezeichen in einem Text; ein Wort der Klischee-Liste aus `MARKE_SCHEMA.md` (Traumimmobilie, Ihr Partner für, mit Leidenschaft, kompetent und zuverlässig, Immobilienprofi, maßgeschneidert, rundum sorglos, auf Augenhöhe, Mehrwert, ganzheitlich, individuelle Lösungen, Ihr Zuhause ist unsere Mission, seriös, Experte an Ihrer Seite, einzigartig, exklusiv ohne Beleg) in Testwerten, Begründungen oder Grundlayouts; ein Emoji (Unicode-Eigenschaft Extended_Pictographic) |
| S18 | Quellen der Begründungen | ein `warum` verweist auf ein Feld, das im Dossier nicht existiert; eine `$description` behauptet eine Messung ("gemessen"), während `status` annahme ist |
| S19 | Spielraum | ein `pfad` beginnt nicht mit `basis.`, `rolle.` oder `bauteil.` oder existiert nicht in den Tokens; ein Startwert liegt außerhalb seines Bereichs; `start + uebersetzung` liegt für eine Übersetzung außerhalb des Bereichs; ein Bereich erlaubt einen Wert, der S8 bricht; ein Farbwert im Bereich liegt außerhalb von sRGB; ein Feld aus `pinZuordnung` fehlt in den Renderern als `data-feld` |
| S20 | Fremdinhalte | ein Grundlayout zeigt ein Demo-Objekt aus `hmWebObjekte` oder einen Fülltext |
| S21 | Formähnlichkeit | Zeichen, Monogramm und liegende Wortmarke werden gegen dieselben Elemente aller UNIO-Makler verglichen, auch über Kreuz (eigenes Monogramm gegen fremdes Zeichen). Verfahren: Pfad auf die Einheitsfläche normieren, mit `Path2D` auf 64 x 64 Pixel rastern, Überdeckung (Schnitt durch Vereinigung) in acht Lagen (vier Drehungen, gespiegelt) messen, größter Wert zählt. Ab 0,60 Fehler, 0,45 bis 0,60 Hinweis an den CD für Systemprobe 6 (Setzung, nach den ersten zehn Maklern zu eichen). Ergebnis in `pruefung.formaehnlichkeit` |

**Systemprobe durch den Creative Director** (20 Minuten, Abzeichnung in `system.pruefung.cd`):
1. Wortmarke in der Anwendungsleiste bei 16 px, 40 px, 110 px, auf Karte und Schild ansehen. Erkennt man Handschrift, oder ist es der Name in einer Standardschrift?
2. Handsatz-Blatt lesen: Trägt jeder Eingriff einen Satz, der auf `idee` oder `brief` zeigt?
3. Beim Schärfen: vorher und nachher nebeneinander. Bleibt erkennbar, was trug?
4. Graustufen-Render aller Grundlayouts: Trägt die Marke ohne Farbe?
5. Empfehlung und Gegenentwurf nebeneinander: Würden wir beide mit voller Überzeugung umsetzen?
6. Kohorte: die Anwendungsleiste neben den Systemen der Makler im selben und in angrenzenden Bezirken, dazu die Hinweise aus S21. Verwechselbar?

Ohne Abzeichnung geht `system` nicht an Schritt 11. Gate 2 in Schritt 14 bleibt die harte Schwelle für das Ganze.

---

## 7. Typische Fehler und wie sie verhindert werden

| Fehler | Woran man ihn erkennt | Verhinderung |
|---|---|---|
| Name in einer Standardschrift, Nachname fett | keine Eingriffe, Muster aus `BrandLogo` | S2, Handsatz-Blatt, Systemprobe 1 |
| Handwerk als Handschrift verbucht | nur Kerning, optische Größe und Wortabstand, dazu eine Unterstreichung | Klassen pflege und erkennung, Standardliste in S2, 40-px-Probe |
| Eigenes Zeichen neben dem aus Schritt 9 | ein zweiter Zeichenname oder eine eigene Idee im System, wie "Der Zeitpunkt" in Fassung 1 | `zeichen` übernimmt `idee.zeichen.name` und `form` unverändert, S1 prüft die Version von `idee`, Schritt 14 meldet Abweichungen als Bruch |
| Achse erfunden | "Satz" oder "Zeichenform" als Achse | nur Katalog aus Schritt 9, Sperre in 10.0, S1 |
| Akzentpunkt oder Kreis als "Zeichen" | Monogramm im Kreis mit Punkt wie heute | nicht als Eingriff zählbar, Zeichen kommt aus `idee.zeichen` |
| Farbe trägt die Marke allein | Unterschied zu anderen Maklern nur im Ton | S9, S10, S16, Rolle "begleitung" in der Matrix |
| Akzent als Text auf Hell ohne Kontrast | Amber-Headline auf Papier | S8, Kontrastmatrix mit Einsatzfreigabe |
| Zeichen als Dekor | Zeichen auf jeder Fläche, auch ohne Anlass | `zeichen.platz` je Format, `nie[]`, Systemprobe |
| Schärfen zu stark oder zu schwach | Makler erkennt sein Logo nicht, oder nichts wurde korrigiert | Befund je Merkmal, zwei von drei tragenden Merkmalen bleiben, Korrekturliste aus technischem Befund |
| Still auf "neu" gewechselt, weil das alte Logo fehlt | `typ` neu trotz `bestandUrteil` schärfen | S1 blockiert, Aufgabe an das Team |
| Proportionale Ziffern in Preisen, fehlendes ß | Preisspalten flattern, Umlaute fallen aus | Prüfsatz in der Schriftbank, S6 |
| Schriftlizenz übersehen | Wortmarke aus einer Schrift ohne Logo-Recht | `lizenz.deckt.logoPfade`, S6 |
| Zweite Palette im Brand-Kit | feste Werte wie #F7F5F1 in `wb-marke.jsx` Zeile 154 | S13, Brand-Kit liest Tokens |
| Zwei Visitenkarten | `Visitenkarte` im Studio neben `WeltKarte` | ein Renderer aus Tokens, `Visitenkarte` entfällt |
| Token ohne Grund | `$description` leer oder "weil es gut aussieht" | S12, S18 |
| Stresstest nur mit Wunschtext | alle Tests grün, erster echter Beitrag bricht | Fallmatrix 10.8, Kürzung zählt als Fehler |
| Gegenentwurf als Farbvariante | nur der Akzent ist anders | Achsentabelle 10.9, Farbe allein ist keine Achse, S15 |
| Gegenton ohne Rollen | ein einzelner dunkler Wert, auf dem Text und Akzent nie geprüft wurden | Rollensatz je Tonwert, S8 und S12 für beide Sätze |
| Bestandselement still gestrichen | Farbe oder Initialen aus `bestandBehalten` fehlen in der Empfehlung | S15, Kanal über den Gegenentwurf und `rueckmeldung.wahl` (10.1) |
| Bild ohne Rechte im Entwurf | Studio-Porträt mit `rechte` offen in der Anwendungsleiste | Sperre Bildrechte in 10.0, Lückenfläche, S1 |
| Beschreibung behauptet eine Messung | "am alten Logo gemessen", obwohl der Ton eine Annahme ist | `status` annahme in `basisAkzent`, S18 |
| Reel bewegt sich wie ein Werbespot | Federn, Zoom, Glow im Titel | Motion-Tokens mit Sperrstufe fest, S12 |
| Logo zuerst auf Weiß beurteilt | Team diskutiert das Logo ohne Kontext | Werkstatt öffnet in der Anwendungsleiste, Detailansicht nur auf Klick |
| Kohorte gleicht sich an | drei Kenner mit ähnlicher Serif und warmem Akzent | S16, Kohorte in der Schriftbank, Systemprobe 6 |
| Fremde Objekte in Grundlayouts | Demo-Objekte aus `hmWebObjekte` | S20, Stresstest nur mit synthetischen, markierten Testwerten im Team-Modus |
| Eyebrow in Vorlagen | kleine Rubrikzeile über dem Hook wie heute in `wb-marke.jsx` Zeile 98 | S17, Folio nur unten |

---

## 8. Umsetzung in der Werkbank

### 8.1 Dateien

| Datei | Änderung |
|---|---|
| `ui_kits/werkbank/wb-system.jsx` (neu) | Datenschicht und Regeln: `hmSystem(mid)` liest und schreibt `marke2[mid].system`, `hmSystemEingang`, `hmSystemSchriftVorschlag` (Regelpfad), `hmSystemKontrast`, `hmSystemGraustufen`, `hmSystemRaster`, `hmSystemTokens` (DTCG und `brand.css`), `hmSystemStresstest`, `hmSystemAchse`, `hmSystemKohorte`, `hmSystemSpielraumSetzen`, `hmSelbsttestSystem`. Oberfläche nur im Team-Modus: `SystemWerkstatt` mit sieben Bereichen (Wortmarke, Zeichen, Schrift, Farbe, Formate, Prüfung, Gegenentwurf), Anwendungsleiste immer sichtbar, Details als Seitenpanel, höchstens etwa sieben Bedienelemente je Bereich (UX-Standard `CLAUDE.md`). Präfix `hm`, Export über `Object.assign(window, ...)`, kein `import()` |
| `HM_SCHRIFTBANK` in `wb-system.jsx` | Familien mit Profil, Prüfsatz, Lizenz, Dateien; ersetzt `HM_SCHRIFTPAARE` und die Figur-Empfehlung |
| Pfad-Umwandlung | Bibliothek per Script-Tag, etwa opentype.js (https://github.com/opentypejs/opentype.js), die Glyphenpfade aus TTF oder OTF liest; Umfang und Lizenz vor dem Einbau prüfen (Lücke). Alternativ SVG-Upload aus dem Werkzeug des Designers mit Prüfung S3 |
| `wb-markenwelten.jsx` | `hmWeltCtx` bekommt eine zweite Quelle: `hmWeltCtxAusSystem(system)` liest Farben, Schrift, Rand und Stufen aus den Tokens; `hmWName` zeichnet die SVG der Wortmarke statt Text; `hmWeltFarben` und `b.akzent` bleiben nur für den Altbestand. `hmWeltPostDaten` ohne Demo-Objekte und Fülltext (siehe Schritte 12 und 13) |
| `wb-ui.jsx` | `hmBrand` liest `marke2[mid].system`, sobald vorhanden; `BrandLogo` rendert die SVG aus dem System |
| `wb-marke.jsx` | Studio für den Makler ohne Logo-, Schrift- und Akzentwahl; `Visitenkarte` und `hm-mock-sig` entfallen zugunsten von `WeltKarte` und `WeltSignatur`; Brand-Kit liest Tokens, exportiert `tokens.json`, `brand.css`, SVGs, Lizenztexte |
| `wb-os-data.jsx` | `HM_LOGO_TYPEN`, `HM_WEB_AKZENTE`, `HM_AKZENT_EMPF`, `HM_SCHRIFTPAARE` nur noch für Altbestand und Migration, nicht mehr in der Oberfläche |
| `wb-web.jsx`, `wb-reel.jsx` | Website-Look und Reel-Untertitel lesen `brand.css` und Tokens statt `b.schrift` und `b.akzent` |
| `api/wb-marke.js` | neue Phase `system` mit JSON-Schema (8.3) |
| `wb-betrieb.jsx` | `hmSelbsttestSystem` in den Selbsttest der Einstellungen |
| `HM_BEZIRK_NACHBARN` in `wb-system.jsx` | Nachbarschaft der 23 Bezirke für S2 und S16, gepflegt nach der amtlichen Bezirkskarte |
| `hmSystemFormNaehe` in `wb-system.jsx` | S21 mit `Path2D` und Canvas, ohne Bibliothek |
| `wb-reel.jsx` | liest `bauteil.reel.*` für Titel-Einblendung und Endkarte |
| `docs/werkbank/branding-v2/schritte/muster/10_anwendungsleiste.html` | Muster der Anwendungsleiste für das Markus-Beispiel, Vorlage für die Werkstatt |
| `docs/werkbank/MARKE_SCHEMA.md` | Abschnitt `system` v2 mit Feldern aus 5.2 |
| `index.html` | `wb-system.jsx` nach `wb-markenwelten.jsx` laden; Schriften der Schriftbank nur bei Bedarf nachladen (`useHmWeltSchriften` vorhanden) |

### 8.2 Daten

- `hmStore` unter `marke2[mid].system` nach 5.2, wie in der Zerlegung für alle v2-Objekte vorgeschlagen.
- SVG-Pfade als Zeichenkette im Objekt (wenige Kilobyte je Variante). Schriftdateien zum Umwandeln in IndexedDB `unio_hm_blobs` unter `schrift:<familie>:<schnitt>`. Keine Schriftdateien und keine Kundenbilder im öffentlichen Repo; Lizenztexte der verwendeten Familien dürfen hinein, wenn die Lizenz das erlaubt.
- `branding[mid]` bleibt lesbar als Altbestand v1. Migration nicht automatisch: Für Sara, Markus und Elif läuft Schritt 10 neu, das alte Branding wird im Befund als Bestand behandelt.

### 8.3 Claude-Phase `system` (Structured Outputs)

Eingang ins Dossier: `idee`, `brief`, `stimme.regler`, `botschaften.claim`, `richtung.tabus`, `vorlieben.bestandUrteil`, `bestandBehalten`, `vorab.logoAlt` (nur Merkmale, kein Bild), die Schriftbank mit Profilen, die Entscheidungen des Designers.

```js
SCHEMA.system = {
  schriftVorschlag: { display: [{ familie: "", warum: "", quelle: [{ schritt: 0, feld: "", auszug: "" }] }],   // höchstens 2
                      text:    [{ familie: "", warum: "", quelle: [] }] },                                   // höchstens 2
  begruendungen: [{ pfad: "", entscheidung: "", warum: "", quelle: { schritt: 0, feld: "", auszug: "" } }],  // je höchstens zwei Sätze
  herleitungsBefunde: [{ pfad: "", befund: "", schwere: "hinweis" | "fehler" }],
  luecken: [""]
}
```

Nach dem Aufruf prüft die Regel jede Quelle gegen das Dossier (S18) und jeden Text gegen die UNIO-Regeln (S17). Claude darf nur Familien aus der Schriftbank nennen.

**Regelpfad ohne Claude, gleiche Struktur.** `schriftVorschlag` aus der Tabelle in 10.2 mit Filtern für Lizenz, Prüfsatz und Kohorte. `begruendungen` nur dort, wo ein echter Wert vorliegt, etwa "Tabellenziffern, weil `stimme.regler.sachlich` 80 beträgt (Schritt 8)". Wo Urteil nötig ist (Eingriffe der Wortmarke, Zeichen, Akzent), setzt die Regel "Lücke: Begründung schreibt das Team", und S2 oder S12 bleiben rot, bis sie geschrieben ist. `herleitungsBefunde` bleibt leer mit dem Hinweis "Herleitung ungeprüft, CD prüft in der Systemprobe". Ohne `ANTHROPIC_API_KEY` (Zerlegung Kapitel 7, Punkt 10) läuft der Schritt damit vollständig, nur mit mehr Handarbeit.

### 8.4 Aufwand

| Posten | Aufwand (Setzung) |
|---|---|
| `wb-system.jsx` Datenschicht, Regeln, Tokens, Rollensätze, Selbsttest | 3,5 Tage |
| S21 Formähnlichkeit, Bezirksnachbarn, Pin-Zuordnung | 1 Tag |
| Motion-Tokens im Reel-Renderer | 0,5 Tage |
| `SystemWerkstatt` mit Anwendungsleiste, Handsatz, SVG-Upload | 3 Tage |
| Renderer auf Tokens umstellen, `hmWName` auf SVG | 2 Tage |
| Brand-Kit, Website, Reel, Signatur auf Tokens | 1,5 Tage |
| Claude-Phase `system` mit Schema und Prüfung | 1 Tag |
| Schriftbank erstpflegen (Profile, Prüfsatz, Lizenzen) | 1 Tag Team |
| Summe Bau | etwa 13 Tage |
| Arbeitszeit des Teams je Makler | Empfehlung 6,5 bis 9,5 h (ohne Bestandsbefund 5,5 bis 8,5 h), Gegenentwurf nach Achse: `tonwert` 1 bis 1,5 h, `dichte`, `ausschnitt`, `zeichengewicht` 1,5 bis 2 h, `schriftstimme` 4 bis 6 h; zusammen 7,5 bis 11,5 h, bei `schriftstimme` 10,5 bis 15,5 h; dazu 20 Minuten CD (Setzung wie E10, gemessen über `system.pruefung` und Zeitstempel) |

### 8.5 Offene Punkte und Lücken

1. Schildmaße und Druckerei-Profil der UNIO-Schilder (Frage an UNIO).
2. Maß des LinkedIn-Kopfs und sichere Zonen organischer Reels (R6, Lücke).
3. Lizenz von Power Grotesk und aller Kandidaten der Schriftbank; Budget für lizenzpflichtige Familien (Frage an den Owner).
4. Genaue Feldnamen der DTCG-Wertobjekte 2025.10 am Spezifikationstext prüfen.
5. Umfang und Lizenz der Bibliothek zum Umwandeln in Pfade.
6. Wirkung der Henderson-Dimensionen bei Wiener Publikum (R2, Lücke).
7. Markenarchitektur UNIO und Makler (Zerlegung Kapitel 7, Punkt 6): ob Karte, Signatur und Schild einen UNIO-Rahmen tragen. Betrifft `raster` und `sperrstufen`; bis zur Entscheidung trägt jedes Grundlayout einen reservierten Platz für den UNIO-Absender mit Stufe `fest`.
8. Tabelle der Bezirksnachbarn für S16 und S2 (Lücke, siehe S16).
9. Schwellen für S21 (0,45 und 0,60) und die 3-Prozent-Grenze der 40-px-Probe sind Setzungen und werden an den ersten zehn Maklern geeicht.
10. Ob organische Reels die Mindeststandzeit 0,3 Sekunden je Wort plus 1 Sekunde brauchen, ist nicht belegt (Setzung, zu messen in Schritt 17 über `wirkung`).
11. Du oder Sie in der Werkbank gegenüber dem Makler (Zerlegung Kapitel 7, Punkt 1). Texte für seine Öffentlichkeit folgen `anrede` (bei Markus Sie); das Handsatz-Blatt in Schritt 14 wartet auf diese Entscheidung.

---

## Quellen

Intern: `docs/werkbank/branding-v2/00_ZERLEGUNG.md`, `bestand/KETTE_IST.md`, `bestand/FRAGEN_WIRKUNG_IST.md`, `research/R1-studios.md`, `R2-art-direction.md`, `R4-tools.md`, `R5-makler.md`, `R6-social-system.md`, `R7-evidenz.md`, `R8-kundenerlebnis.md`, `docs/werkbank/research/BENCHMARK_MARKE.md`, `docs/werkbank/MARKE_SCHEMA.md`, `docs/werkbank/MARKENQUALITAET.md`, Code in `ui_kits/werkbank/`.

Studios und Praxis
- Paul Rand, NeXT: https://www.logodesignlove.com/next-logo-paul-rand
- Mozilla Open Design, Roads not taken: https://blog.mozilla.org/opendesign/roads-not-taken/
- Pentagram, Slack: https://www.pentagram.com/work/slack
- Pentagram, The Public Theater 2020/21: https://www.pentagram.com/work/the-public-theater-2020-2021-season
- JKR und Ipsos, Marketing Week: https://www.marketingweek.com/15-brand-assets-truly-distinctive-finds-research/
- DIA, Nuits Sonores: https://the-brandidentity.com/project/dia-studio-builds-a-generative-tool-that-makes-nuits-sonores-pulse-2
- Pentagram und performance.gov, GDUSA: https://gdusa.com/pentagram-federal-website-generates-ai-controversy/
- Bierut, On (Design) Bullshit: https://designobserver.com/on-design-bullshit/

Werkzeuge und Standards
- W3C Design Tokens 2025.10: https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/
- Frontify, Brand Guidelines for AI: https://www.frontify.com/en/guide/brand-guidelines-for-ai
- Canva, Template Locks: https://www.canva.com/help/brand-template-locks/
- Canva, On-Brand AI: https://www.canva.com/help/create-on-brand-designs/
- Figma, Buzz-Vorlagen: https://www.figma.com/blog/8-tips-for-designers-building-branded-templates-in-figma-buzz/
- Kreafolk, Looka: https://kreafolk.com/blogs/articles/looka-ai-logo-maker
- Brandmark: https://brandmark.io/intro/
- Adobe Leonardo: https://github.com/adobe/leonardo
- Schutzzone: https://squareballoon.co.uk/blog/how-to-correctly-space-a-logo-what-x-means-in-branding-and-brand-guidelines/
- Moo, Druckregeln: https://www.moo.com/us/business-cards/design-guidelines
- Google Fonts FAQ: https://developers.google.com/fonts/faq
- caniemail, SVG: https://www.caniemail.com/features/image-svg/
- opentype.js: https://github.com/opentypejs/opentype.js
- Instagram-Raster 3:4, Kapwing: https://www.kapwing.com/resources/instagrams-new-grid-layout-size-and-dimensions-2025/
- Meta, Reels-Flächen: https://www.facebook.com/business/ads-guide/update/video/instagram-reels

Studien
- Henderson, Giese, Cote 2004: https://journals.sagepub.com/doi/10.1509/jmkg.68.4.60.42736
- Brumberger 2003: https://www.ingentaconnect.com/content/stc/tc/2003/00000050/00000002/art00007
- Walsh, Winterich, Mittal 2010: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1998809
- Hsee 1996: https://pages.ucsd.edu/~cmckenzie/Hsee1996OBHDP.pdf
- Chernev, Böckenholt, Goodman 2015: https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf
- Fuchs, Prandelli, Schreier 2010: https://doi.org/10.1509/jmkg.74.1.65
- Doshi und Hauser 2024: https://www.science.org/doi/10.1126/sciadv.adn5290
- Wenger und Kenett 2026: https://academic.oup.com/pnasnexus/article/5/3/pgag042/8529001
- Distinctive Assets Benchmark 2026: https://www.tandfonline.com/doi/abs/10.1080/02650487.2026.2637295
- Willis und Todorov 2006: https://doi.org/10.1111/j.1467-9280.2006.01750.x
- Buell und Norton 2011: https://doi.org/10.1287/mnsc.1110.1376
