# Brandmark-Analyse für die Logo-Werkstatt

Stand 30.09.2026. Recherche-Agent. Grundlage: Website, Hilfeseiten und Tools von Brandmark, die öffentlich ausgelieferte App (UI-Texte und Datenmodell aus dem Bundle gelesen, nichts abgeschickt), das öffentliche Demo-Markenpaket "OMNI", dazu Rezensionen. Looka und Tailor Brands nur zum Vergleich. Abgeglichen mit `ui_kits/werkbank/wb-logo.jsx`, `branding-v2/research/R4-tools.md` und `branding-v2/schritte/10_system.md`.

## 1. Eingaben

Brandmark fragt in der App (v3) genau drei Schritte ab [9]:

1. **Brand name** plus **Slogan (optional)**. Hinweis: kurze, merkbare Namen.
2. **Brand keywords**, freie Schlagwörter als Tags. Ohne eigene Idee gibt es Beispiel-Chips (robot, rocket, planet, flower, organic, heart, leaf, tree, animal, abstract).
3. **Color style**, genau eine Wahl: Simple, Vibrant, Organic, High Contrast, Dark, Soft pastel, alternativ eine Einzelfarbe (Rot, Orange, Gelb, Grün usw.). Jeder Stil ist im Code eine feste 9er-Palette.

Keine Branche, kein Zielpublikum, keine Haltung. Die Neuauflage (chat.brandmark.io) bietet drei Einstiege: "Generate" (Hunderte Logos automatisch), "Templates" (handgemachte Vorlagen) und "Icon Designer" (Symbol per Prompt, generative KI) [11]. Jede Karte trägt dort eine Herkunftsmarke: "Gen AI", "Text" (menschliche Schriften und Icons) oder "Template".

Zum Vergleich: Looka fragt Name, Branche, Inspirations-Logos zum Anklicken, bis zu drei Farben (jede mit Bedeutungstext), Slogan und Symboltypen [15][16]. Tailor Brands fragt Name, Branche, Logo-Typ (Icon, Name, Initialen) und lässt drei Schriftstile aus 15 wählen ("this or that") [17][18].

## 2. Wie Entwürfe entstehen

Der Gründer legt die Technik offen [4]:

- **Symbole** aus rund einer Million Noun-Project-Icons. Ein Convolutional Net berechnet je Icon einen Lesbarkeitswert (bleibt es verpixelt erkennbar) und ein Embedding. Über die Nähe im Embedding wird **Einzigartigkeit** gemessen: Icons, die vielen anderen ähneln, fallen zurück.
- **Schriften zu Symbolen** über dieselben Embeddings. Faustregel im Text: dünnes Icon mit fetter Schrift wirkt unausgewogen, gleiche Strichstärken wirken geschlossen.
- **Farbe** aus einem GAN, sortiert nach Helligkeit und Buntheit und über Wortvektoren den Schlagwörtern zugeordnet: "fiery" ergibt gesättigte, "solemn" oder "government" entsättigte Töne.
- **Schriftpaare** im Font Generator als Vektorrotation: drei Rollen (Titel, Akzent, Text), ein Regler 0 bis 180 Grad für Nähe oder Kontrast zur Ausgangsschrift [7].

Das Logo selbst ist ein kleines Datenobjekt. Aus dem Bundle [9]: `title`, `slogan` mit je Schrift, Schnitt, Größe, Fette, Laufweite, Zeilenabstand, Ausrichtung, Position; `icon` mit Größe, Abstand, Farbe, `nthChar` (Buchstabe des Namens als Icon); `iconContainer` und `container` (Form um Icon oder ganzes Logo, gefüllt oder Kontur); `backgroundColor`, `palette`, `layout`, `autoScale`. Das gleicht unserem `spec` in `wb-logo.jsx` stark.

## 3. Verfeinern

- **Ergebnisse** als endloser Strom, umschaltbar zwischen **Raster** und **Karussell** (ein Logo groß), Filter "Logo styles", Speichern in eine Seitenleiste "Saved logos" [9].
- **Editor** mit fünf Reitern: Name, Slogan, Icon, Background, Layout. Regler für Größe, Laufweite, Fette, Zeilenabstand, Lage; Icon tauschen per Suche mit Gruppen "Letter, Simple, Modern, Illustration", jeweils **"Recent"** und **"Suggested"**; Schriften gefiltert nach "Modern, Classic, Playful, Handwriting"; Farbe mit Farbcode oder Verlauf, Farben in die Palette legen [9].
- **"Ideas"** (in der Neuauflage "Variants"): Geschwister des aktiven Entwurfs, getrennt nach Farbschema, Schrift, Icon und Layout [10][11].
- **Duplicate** und **Share** (Logo-Daten im URL-Hash `#logo_data=`), damit Dritte mitreden [9][13].
- **Logo Rank** als eigenes Tool: Einzigartigkeit (Abstand zu einer Million Icons), Lesbarkeit (kräftige Silhouette, klein und fern), Farbe und Kontrast. Die Seite nennt das ausdrücklich Faustregeln [5].
- Der Editor verhindert nicht, dass Änderungen die Lesbarkeit zerstören [13].

## 4. Markenpaket

Preise laut Website heute 35, 95 und 195 USD einmalig; ältere Rezensionen nennen 25, 65, 175 [2][14]. Das Demo-Paket "OMNI" zeigt den Inhalt des Designer-Pakets [10]:

- **Logodateien** mit Filtern Basic, Gradient, Texture, Special Effect, Animation. Basic-Varianten: Farbe, Transparent, Invers, Schwarz/Weiß, Weiß transparent, Schwarz transparent, Akzent 1 bis 3. Jede Datei als PNG, JPG, SVG, EPS, PDF und **"Download in custom size"** mit Breite, Höhe, Rand, Hintergrund, "Trim edges".
- **Animationen**: Sketchy, Outline, Outline 2, Fill-in, Wave wipe, Lava Lamp, Bounce, Fade Smooth, Glitched, Hover, Pulse; je als Schleife oder einmalig.
- **Profil-Icons**: nur Symbol oder volles Logo, in Farbe, Akzent 1 bis 3, Invers, Weiß, Schwarz, jeweils auch transparent.
- **Brand Guidelines** als teilbare Seite: Schutzraum "R = 1/3 der kleineren Logokante", für das Icon "r = 1/3 des Einheitsquadrats"; Symbolregel (volles Logo wo möglich, Symbol allein für Profil und App); Vorschau auf Vollfarbe, Druck, Foto und drei Varianten; Palette in Rollen (Background, Foreground, Accent 1 bis 3) mit HEX, RGB, CMYK; Typografie mit Schrift, Schnitt, Stil; Felder "Mission" und "Buyer persona" als Lorem ipsum.
- **Mockups** fotorealistisch, gefiltert nach iPhone, Android, People and Apparel, Beauty and Cosmetics, Boxes and Packaging. Im Editor zeigt die Vorschau Papiertüte, Kosmetik, Karton, Handy, Wandschild, T-Shirt [9].
- **Visitenkarten, Briefbogen (Word), Social** (Instagram-Vorlagen "Sales and Coupons", "Announcement", "Inspirational Quotes", "Holidays"), **Präsentation, Rechnung**, Gesamtdownload 1,2 GB.
- **Logo Crunch** als Tool: 256 bis 16 px für Favicon, Android, iOS, mit Simplify, Fill Holes, Thicken, Boost thin lines, Crop factor [8].

Looka nennt 300 und mehr Vorlagen inklusive Website-Builder und Druckshop [15]; Tailor Brands zeigt Mockups auf Karte, Etikett, Notizbuch, Flasche, Tasse [17].

## 5. Was gut ist, wo es generisch wird

**Gut.** Brandmark misst Qualität, statt nur zu kombinieren: Lesbarkeit, Abstand zum Bestand, Strichgewicht passend zur Schrift. Ein Entwurf wird sofort in eine Matrix aus Varianten übersetzt (hell, dunkel, einfarbig, Profil, Favicon), und der Schutzraum ist eine Formel statt eines Gefühls. Rezensenten loben Weißraum, Balance und Typografie [12][13].

**Generisch.** Symbole kommen aus einem Katalog; bei häufigen Branchen entstehen vertraute Muster [13][14]. Farbe entsteht aus Stimmungswörtern, nicht aus einer Person. Verläufe, Texturen, Glitch und Lava Lamp sind Effekt statt Identität. Social-Vorlagen mit Rabatten und Zitaten, Mockups auf Kosmetik und Papiertüten, Mission als Platzhalter. Tailor Brands ignoriert laut Test teils die angegebenen Vorlieben [18]. Brandmark selbst bestreitet nicht, dass Designer nötig bleiben [4].

## 6. Einordnung für die Werkbank

Die Werkstatt in `wb-logo.jsx` hat schon das Looka-Grundgerüst: 18 Entwürfe aus Name, Pool-Schriften und Markenwelt-Zeichen, "Mehr davon", drei zum Merken, vier Einsatzflächen, SVG mit echten Pfaden. `10_system.md` lehnt einen Generator als Quelle von Formen ab (A2) und verlangt "Kein Wert ohne warum" und "Anwendung zuerst". Brandmarks Stärke liegt nicht im Katalog, sondern in **Messen, Variieren und Ausleiten**. Genau das lässt sich übernehmen, ohne die Regeln zu brechen.

### Kopieren, priorisiert

1. **Ideen je Dimension** statt nur "Mehr davon": Geschwister, die genau eine Achse ändern (Schrift, Anordnung, Zeichen, Laufweite, Akzent an oder aus).
2. **Prüfstand nach Logo Rank**, lokal gerechnet: Lesbarkeit klein, Kontrast, Abstand zur Kohorte. Als Faustregel ausgewiesen.
3. **Variantenmatrix** aus einem `spec`: Farbe, Invers, Schwarz, Weiß, ohne Akzent, transparent, Profil-Zeichen. Freigabe gilt für die Matrix, nicht für ein Bild.
4. **Favicon und Profil nach Logo Crunch**: 512 bis 16 px, unter 48 px automatisch verstärkt.
5. **Export in Wunschgröße**: Breite, Höhe, Rand, Grund, Beschnitt; SVG mit Pfaden (opentype.js), PNG über Canvas.
6. **Strichgewicht folgt der Schrift**: Linien der Zeichen (Ratlinie, Fenster) aus der Stammstärke der gewählten Schrift ableiten (Breite des Glyphs "l" oder "I" über opentype.js), statt fester Faktoren wie `g * 0.05`.
7. **Schutzraum als Formel** im Markenblatt, aber nach unserer Setzung (eine Versalhöhe, `10_system.md`), und Mindestgröße gemessen.
8. **Ruhige Animation** (Zeichnen, Aufdecken, Akzent zuletzt), Schleife oder einmalig.
9. **Raster und Einzelansicht** umschaltbar; Einzelansicht zeigt einen Entwurf groß im Einsatz, Pfeiltasten blättern.
10. **Herkunft je Entwurf** sichtbar, wie Brandmarks Marken "Gen AI, Text, Template": "aus Welt Weite", "aus Idee: Ratlinie", "aus Bestandslogo". Deckt "Kein Wert ohne warum".
11. **Verlauf und Vorschläge** im Feinschliff ("Zuletzt", "Vorgeschlagen"), begrenzt auf den Pool.
12. **Teilen per Hash**: nur der `spec` (Art, Schrift, Laufweite, Zeichen), nie Name oder Kontaktdaten, für die Freigabeansicht.

### Bewusst nicht

- **Icon-Katalog, Clipart, Keyword-zu-Symbol** und der Icon Designer per Prompt. Zeichen bleiben aus Idee und Welt, Bildmarke bleibt Handarbeit (R4, Punkt 1).
- **Freie Farbwahl, Farbcode-Feld, Verläufe**, Farbstile nach Stimmung. Farbe kommt aus dem Branding mit Rollen und Bereichen (`10_system.md`).
- **Container** um Initialen und Kreise um Monogramme: laut `10_system.md` Branchenstandard, zählt nie als Erkennung.
- **Effekte** Gradient, Texture, Glitch, Lava Lamp, Bounce, Pulse.
- **Hunderte Entwürfe als Endlosstrom.** Höchstens 12 bis 18 je Runde, drei für den Makler.
- **Generische Vorlagen**: Rabatt- und Zitat-Posts, Rechnung, Kosmetik-Mockups, Mission als Lorem ipsum.
- **Fotorealistische Mockups aus Stock.** Einsatz nur in eigenen Flächen oder auf freigegebenen Fotos aus `hmBildBibliothek`; fehlt das Porträt, eine sichtbare Lücke.

## 7. Fünf Funktionen mit Bedienidee

**F1 Ideen-Leiste.** Unter dem großen Entwurf eine Zeile mit Schaltflächen "Schrift", "Anordnung", "Zeichen", "Laufweite", "Akzent". Ein Klick zeigt sechs Geschwister, die nur diese Achse ändern, direkt in der Einsatzleiste. Übernehmen per Klick, Rückgängig über "Zuletzt". Technik: `hmLkKonzepte(mid, { basis, achse })`, Zufall weiter über `hmLkZufall`.

**F2 Prüfstand.** Drei Zeilen neben jedem Entwurf, mit Messwert und Satz. *Lesbar klein*: Entwurf auf Canvas bei 16, 24 und 32 px rendern, Anteil der Deckung gegen die 256-px-Fassung vergleichen; unter einer Setzung "wird im Profilbild matschig". *Kontrast*: WCAG-Verhältnis von Tinte und Akzent auf Papier und Nacht, Ziel 3 zu 1 für die Wortmarke. *Abstand zur Kohorte*: `spec`-Vergleich und Silhouetten-Hash (32 x 32 Bit) gegen alle Logos in `hmStore.get("branding")`; zu nah heißt Hinweis mit Namen des Nachbarn für das Team. Kein Punktwert, keine Sterne, Überschrift "Faustregeln".

**F3 Dateimatrix.** Schaltfläche "Alle Fassungen" öffnet ein Sheet: Zeilen Wortmarke, Profil-Zeichen, Favicon; Spalten Farbe, Invers, Schwarz, Weiß, ohne Akzent. Jede Zelle einzeln ladbar als SVG (Pfade) oder PNG. Unten "Eigene Größe" mit Breite, Höhe, Rand, Grund (Papier, Nacht, transparent) und "Ränder beschneiden". Favicon-Reihe 512, 180, 64, 32, 16 px; ab 32 px abwärts automatisch "verstärkt" (Striche plus 20 Prozent, Laufweite plus, Akzentlinie zu Fläche), sichtbar als Vorher und Nachher.

**F4 Bewegte Marke.** Drei Animationen, alle unter 1,6 s und ohne Effekt: *Zeichnen* (Kontur der Pfade über `stroke-dasharray`, dann Füllung), *Aufdecken* (Maske von links), *Akzent zuletzt* (Wortmarke steht, Akzent setzt nach 400 ms). Umschalter Schleife oder einmalig, Vorschau im Reel-Outro 1080 x 1920. Export als animiertes SVG (CSS im SVG) und als WebM über `canvas.captureStream` und `MediaRecorder`. `prefers-reduced-motion` zeigt das Endbild.

**F5 Markenblatt auf Knopfdruck.** Aus dem übernommenen `spec` entsteht eine Seite: Logo mit eingezeichnetem Schutzraum (Versalhöhe, bemaßt), gemessene Mindestgröße aus F2, Profil-Regel ("volles Logo, wo Platz ist; Zeichen allein im Kreis"), Variantenmatrix aus F3, Farbrollen mit HEX, RGB und CMYK (CMYK als Näherung, Druckerei prüft), Schriften mit Schnitt und Lizenzstatus, Einsatz auf Karte 85 x 55 mm, Schild, Profilkopf, E-Mail-Signatur. Fehlende Werte (Schildmaß, Bestandslogo) als Lücke. Ergebnis wandert in `hmMbWelt` beziehungsweise Schritt 14.

## Quellen

1. Brandmark, Startseite: https://brandmark.io/
2. Brandmark, Preise: https://brandmark.io/pricing/
3. Brandmark, Tools: https://brandmark.io/tools/
4. Brandmark, Deep learning for logo design: https://brandmark.io/intro/
5. Brandmark, Logo Rank: https://brandmark.io/logo-rank/
6. Brandmark, AI Color Wheel: https://brandmark.io/color-wheel/
7. Brandmark, Font Generator: https://brandmark.io/font-generator/
8. Brandmark, Logo Crunch: https://brandmark.io/logo-crunch/
9. Brandmark App v3, Oberfläche und Bundle gesichtet am 30.09.2026: https://app.brandmark.io/v3/
10. Brandmark Demo-Markenpaket OMNI (Logodateien, Guidelines, Mockups, Profil-Icons, Instagram): https://app.brandmark.io/v3/brand/demo/
11. Brandmark Neuauflage (Generate, Templates, Icon Designer): https://chat.brandmark.io/
12. Silicon Valley Time, Brandmark-Test: https://siliconvalleytime.com/article/brandmark-io-the-best-ai-logo-maker/
13. ecomm.design, Brandmark Review: https://ecomm.design/brandmark-io-review/
14. Kreafolk, Brandmark AI Logo Maker: https://kreafolk.com/blogs/articles/brandmark-ai-logo-maker
15. Elegant Themes, Looka Review: https://www.elegantthemes.com/blog/business/looka-review
16. Shotkit, Looka Review: https://shotkit.com/looka-logo-design-review/
17. Tailor Brands, Anleitung: https://www.tailorbrands.com/blog/how-to-use-tailor-brands
18. Experte.com, Tailor Brands Test: https://www.experte.com/logo-design/tailor-brands
19. Intern: `ui_kits/werkbank/wb-logo.jsx`, `docs/werkbank/branding-v2/research/R4-tools.md`, `docs/werkbank/branding-v2/schritte/10_system.md`
