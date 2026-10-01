# Logo-Werkstatt und eine Quelle

Stand 30.09.2026. Code: `ui_kits/werkbank/wb-logo.jsx`, `ui_kits/werkbank/wb-freigabe.jsx`.

## Logo-Werkstatt

Vorbild ist das Prinzip von Looka und Brandmark: Vorlieben über Beispiele, viele Entwürfe, die dazulernen, jeder Entwurf sofort im Einsatz. Bewusst anders (Prozess v2, C5): keine Symbole aus einem Katalog, keine freie Farbwahl. Zeichen kommen aus der Markenidee und der Markenwelt, Schriften aus einem kuratierten Pool, Farben aus dem Branding. Das Team kuratiert, der Makler urteilt am Markenvertrag.

- **Arten:** Wortmarke, Versalien gesperrt, gestapelt, Monogramm (nebeneinander mit Haarlinie oder gestapelt), Zeichen und Name, Maßstab (feste Teilung mit Skala), Name mit Punkt.
- **Zeichen:** Ratlinie, wenn die Idee vom Rat handelt; sonst das Zeichen der Markenwelt (Fenster 3:4, Folio, Grätzl-Linie, Schriftfeld, Bogen, Kante).
- **Schriftpool:** Newsreader, Fraunces, Playfair Display, DM Serif Display, Instrument Sans, Space Grotesk, Manrope, Hanken Grotesk. Die Schriften des Brandings werden bevorzugt.
- **Bedienung (Team):** Studio, Logo, „Logo-Werkstatt öffnen“. Richtung wählen (Antiqua, Grotesk, mit Zeichen, Initialen), „Neue Runde“, „Mehr davon“ je Entwurf, bis zu drei merken, „Als Logo übernehmen“, „SVG laden“ (Schrift in Pfaden).
- **Im Einsatz:** Profilbild (Monogramm oder Zeichen aus demselben Entwurf), Visitenkarte, Website-Kopf, Post.
- **Makler:** sieht die gemerkten Entwürfe im Studio und beantwortet drei Fragen aus dem Markenvertrag mit Ja oder Nein. Das Team entscheidet.
- **Übernahme:** `branding[mid].logo = "konzept"` und `logoKonzept = spec`. `BrandLogo`, die Renderer der Markenwelten, der Website-Kopf und das Materialpaket zeigen denselben Entwurf.

Ein Entwurf ist eine Spezifikation `{ id, art, font, gewicht, versal, laufweite, zeichen, lage, akzent }`. `hmLkLayout` macht daraus Bauteile, `hmLkSvgText` gibt sie als SVG mit Text aus (Vorschau, Website), `hmLkSvgPfade` mit Pfaden (Export).

## Logo-Werkstatt v2 (01.10.2026, nach Brandmark)

Analyse: `erlebnis/BRANDMARK_ANALYSE.md`. Übernommen: Stichworte als Chips, die neue Runden lenken; Prüfstand mit Faustregeln (lesbar klein, Strichstärke, Zellen der Dickte); Fassungen hell, dunkel, einfarbig; Favicon-Reihe 16 bis 180 px; Paket mit 19 Dateien und einer Anwendungsseite ohne externe Adressen; Herkunftszeile unter jedem Entwurf. Nicht übernommen: Symbolkatalog, freie Farbwahl, generative Symbole.

- Neue Bauteile: `LogoStichworte`, `LogoFeineditor`, `LogoPruefstand`, `LogoFassungen`, `LogoAnwendungen`, `hmLkPaket`.
- Ablage zusätzlich: `logos[mid].stichworte = { aus, eigen }`, `logos[mid].zuletzt` (höchstens acht Entwürfe).
- Grenzen 85 und 70 Prozent im Prüfstand sind Setzungen des Teams.

## Schriftpool auf Grundlage aller Google Fonts (01.10.2026)

- `wb-fonts-katalog.jsx`: 1230 Familien aus `fonts.google.com/metadata/fonts` (latein als Hauptschrift, ohne Noto) mit Kategorie, Gewichten, Strichstärke, Breite, Rang und variabler Achse. Erzeugt per Skript aus der Metadaten-Datei, nicht von Hand.
- `wb-fonts.jsx`: `hmLkPool(mid, { richtung })` ist der Pool der Werkstatt: kuratierte acht, vom Team ergänzte (`logos[mid].schriften`), oder die Schriften der gewählten Markenrichtung plus die Schriften der Marke. `hmFontsEignung` rechnet 0 bis 100 mit Sätzen (Gewichte, Schreibschrift, Display, Festbreite, Verbreitung, Strichstärke, Abstand zum Markt der Nische). `hmFontsLaden` lädt über die Google-Fonts-CSS, der Export nimmt weiter Fontsource-Dateien (`hmFontDatei`).
- Werkstatt, Reiter „Schriften“: Pool als Chips mit Herkunft, Suche über den Katalog mit Kategorie, Treffer in der eigenen Schrift mit dem Namen des Maklers, Begründung und Punkten, „In den Pool“. Stammstärke unbekannter Schriften startet aus der Katalog-Strichstärke (`hmLkStammSofort`).
- Markenrichtungen (`wb-richtungen.jsx`): acht Haltungen aus der Recherche mit Gegenbild zum Markt, Schriften, Logoarten, Zeichen, Akzentfamilie, Markenwelt, Bildsprache, Verboten. `hmRichtungEmpfehlung(mid)` begründet mit Zahlen aus Fragebogen und Markt, `hmRichtungParameter` übersetzt in Generator-Parameter. In der Werkstatt als Chips über den Entwürfen, gespeichert in `logos[mid].richtung`.

## Markt und Bewegung (01.10.2026)

- **Markt** (`wb-brands.jsx`, Daten `wb-brands-daten.jsx` aus `branding-v2/research/MAKLER_BRANDS.md`): 65 Referenzmarken in vier Nischen, nur als Attribute (Logoart, Schriftklasse, Versalien, Laufweite, Zeichenmotiv, Grundton, Klischees, Stärke). Die Werkstatt zeigt je Nische die Landkarte (x Antiqua bis Grotesk, y Wortmarke bis Zeichen), die Muster, die Klischees und die fünf nächsten Referenzen zum Entwurf mit Gründen. Der Prüfstand bekommt die Zeile „Abstand zum Markt“ (ab 70 Prozent Übereinstimmung grenzwertig). Nische aus den Objektarten (`hmBrandNische`), Team setzt sie in `logos[mid].nische`.
- **Bewegung** (`wb-logo-bewegt.jsx`, Brandmark F4): drei Bewegungen in 1,6 Sekunden (Zeichnen über pathLength, Aufdecken über clipPath, Akzent zuletzt), Schleife, Vorschau auf Papier und im Reel-Outro, Export als animiertes SVG (CSS im SVG, reduced-motion zeigt das Endbild) und WebM über MediaRecorder.
- Datenerzeugung: `scratchpad/brands_daten.py` liest `_research/makler-brands/*.json`, entfernt Dubletten (Wien zuerst) und schreibt Datendatei und Katalog. Screenshots bleiben lokal.

## Logo-Erlebnis für den Makler (01.10.2026)

Code: `ui_kits/werkbank/wb-logo-erlebnis.jsx`, Komponente `LogoErlebnis({ m, teamSicht, allein })`. Sichtbar unter Marke, Design (Makler-Sicht) und als eigener Link `?ansicht=logo&makler=ID`.

- Bühne: das Logo groß auf Papier, ein Satz zur Herkunft (`hmLkHerkunftText`), der Claim in der Schrift der Marke.
- Woraus es entsteht: Name, Schrift der Stimme (mit Grund aus den Stimmwörtern), Zeichen aus dem Wort mit Quelle.
- Im Einsatz: Visitenkarte vorn und hinten, Profilbild, Browser-Reiter mit Favicon, Website-Kopf, Signatur, alles mit echten Angaben.
- Hell und dunkel: Papier, Nacht, einfarbig, ohne Fachbegriffe.
- Ihr Urteil: die bis zu drei vom Team gemerkten Entwürfe (`logos[mid].merk`) mit den drei Fragen aus dem Markenvertrag, Antworten in `logos[mid].bewertung[spec.id]` (gleiches Schema wie die Werkstatt), dazu eine Notizzeile. Ohne Entwürfe steht ein Satz, kein leerer Block.
- Der Makler wählt nicht, er urteilt. Das Team entscheidet in der Werkstatt (Studio, Design, Knopf „Logo-Werkstatt öffnen“, jetzt als Hauptknopf unter dem großen Logo).

Gesetzte Logos (Migration `unio_hm_mig_logo_v3`, Specs in `HM_SEED_LOGOS` in `wb-store.jsx`): Markus Leitner Zeichen und Name mit Ratstrich in Newsreader (Hauptlogo), dazu Feste Dickte mit Ratlinie und Versalien gesperrt zum Urteilen. Elif Demir Zeichen und Name mit Grätzl-Linie in Fraunces (Hauptlogo), dazu gestapelt und Dickte. Sara Novak nur drei Entwürfe zum Urteilen, kein Hauptlogo, weil ihr Weg noch nicht gewählt ist. Bei Elif wurde die eingefrorene Version auf 1.1 gehoben.

## Eine Quelle (Grundstufe)

- Die Freigabe (Markenbuch durch Daniel, Branding im Studio) friert die Marke als Version mit SHA-256-Prüfsumme ein: Claim, Akzent, Schrift, Logo, Markenwelt, Anrede je Kanal, Versprechen, Positionierung.
- Öffentliche Ausgaben lesen über `hmMarkeB(mid, "oeffentlich")` nur diese Version: Website-Paket, Materialpaket. Das Team arbeitet am Entwurf weiter und sieht in Markenbuch und Website „Entwurf weicht ab: …“.
- Die Anrede hat genau eine Definition: `hmAnrede(mid, kanal)` und `hmAnredeRegel(mid)`.
- Ablage: `unio_hm_marke2[mid] = { quelle: { version, eingefrorenAm, freigegebenVon, inhalt, pruefsumme }, historie: [] }`.
- Bestehende Freigaben wurden einmal als Version 1.0 übernommen.

Noch nicht in dieser Stufe: Sperre mit „Änderung beantragen“ an allen Schreibpfaden, Freigabe-Code des Maklers, Server-Datenhaltung (siehe `branding-v2/UMBAU_ETAPPEN.md`, Etappe 3).
