# Website-Baukasten

Stand 29.09.2026. Code: `ui_kits/werkbank/wb-web.jsx`. Benchmark: `research/BENCHMARK_WEBSITE_BAUKASTEN.md`.

## Mechanismus

1. **Ein Markendatensatz** (`hmWebTheme`): Akzent, Schriftpaar, Logo und Grundton kommen nur aus kuratierten Listen (`HM_WEB_AKZENTE`, `HM_WEB_SCHRIFTEN`, `HM_LOGO_TYPEN`, `HM_WEB_GRUNDTOENE`). Farbe, Schrift und Logo schreiben ins Branding und gelten damit überall. Grundton und Look gehören zur Website.
2. **Vorlagen als srcdoc** (`hmWebHtml`): das eingebettete `IMG`-Objekt der Showcases wird durch die Bilder des Maklers ersetzt (die Vorlage schrumpft von 2,5 MB auf rund 80 KB). Ein vorgeschaltetes Skript meldet `prefers-reduced-motion`, dadurch rendern die Vorlagen ohne Scroll-Animation in ihrem fertigen Zustand. Das war die Ursache für falsch dargestellte Vorschauen.
3. **Theme ohne Neuladen** (`hmWebThemeAnwenden`): CSS-Variablen `--loden`, `--fd`, `--fb`, Markenwelt auf `--bg`, `--paper`, `--card`, `--ink`, `--line`, dunkle Welten schalten `html.dark`. Ein Akzent, der auf dem Grund keinen Kontrast von 3 zu 1 schafft, wird für Text abgedunkelt oder aufgehellt.
4. **Inhalte** (`hmWebInhalt`): Name, Headline und Unterzeile gezielt über die Klassen der Vorlagen, Kennzahlen nur aus eigenen Angaben, erfundene Werte der Vorlagen (Tage bis Abschluss, Weiterempfehlung, Scores, Objektzahl, „Seit über 15 Jahren“) fallen weg, Gedankenstriche im Vorlagentext werden ersetzt. Referenzen und Social nur mit echten Angaben.
5. **Prüfung** (`hmWebPruefen`): große Namen werden auf die Breite eingepasst, danach Meldung bei Platzhaltern, leeren Bildern oder Überbreite. Ohne Porträt steht ein Monogramm auf Markenfläche.
6. **Doppelpuffer** (`WebRahmen`): ein neuer Aufbau wird unsichtbar geladen und erst eingeblendet, wenn er fertig ist.

## Oberfläche

- Stil-Leiste mit Look, Akzent, Schrift, Logo, Grundton. Überfahren zeigt die Wahl in der Vorschau, Klick übernimmt, Escape oder Wegklicken setzt zurück.
- Vorschau mit Desktop 1280, Tablet 834, Mobil 390 in echter Breite, skaliert. Die Wahl bleibt pro Browser gespeichert.
- „Alle Looks“: sechs Looks live mit der Marke, auch als Mobilreihe. Kacheln bauen erst, wenn sie sichtbar sind.
- Bilder: acht Felder (Porträt, Titelbild für Look 2 bis 4, sechs Stimmungsbilder). Datei auf ein Feld ziehen, mehrere Dateien auf die Ablage (füllen die freien Stimmungsfelder), aus der Bibliothek wählen (Hochgeladen, Material, Porträts, Bildwelt, UNIO-Archiv), Felder untereinander tauschen, Fokuspunkt setzen. Uploads liegen in IndexedDB (`wi:<id>`), über 3000 px lange Kante wird verkleinert, Transparenz bleibt.
- Texte mit Zeichengrenzen (`HM_WEB_LIMITS`) und „Vorschlag zurück“.
- Paket: dieselbe Seite als ZIP mit Bildern und eingebettetem Skript, läuft ohne Werkbank.

## Daten

- `unio_hm_website[mid]`: `look`, `grundton`, `felder`, `bilder: { slot: { ref, fx, fy } }`, `status`
- `unio_hm_webbilder[mid]`: `[{ id, name, w, h, alpha, quelle }]`
