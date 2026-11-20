# UNIO Repo: Arbeitsregeln

## Gestaltungs-Prozess (gilt für jedes neue oder überarbeitete Element)

Vorgabe von Daniel, 20.11.2026: Bevor ein Element gestaltet wird, immer zuerst ansehen, wie es die Besten lösen.

1. Vorbilder prüfen: ausgezeichnete Seiten (Awwwards, Sites of the Day und die Element-Sammlungen dort) und die international besten Plattformen der jeweiligen Aufgabe (zum Beispiel Airbnb, Apple, Compass, Linear). Zwei bis drei konkrete Beispiele je Element, mit Quelle.
2. Leitfrage: Wie würde Apple das lösen? Weniger Ebenen, ein Element pro Aufgabe, nichts springt.
3. Raster: Alles sitzt auf demselben Raster (Rand 6vw, 12 Spalten, Abstand 24 Pixel). Kopfzeilen von Abschnitten nutzen das Spaltenmass der Komponente `Chapter`. Kontrolle mit `?raster=1` oder Taste G.
4. Text gehört in oder an das Element, nie lose darunter gestapelt. Namen brechen nicht um und werden nicht abgeschnitten.
5. Erst Vorschau, dann Abstimmung: Neues entsteht als Variante 2 (Adresse mit 2 am Ende, zum Beispiel `/2`, `/makler2`). Variante 1 bleibt unverändert, bis Daniel freigibt.
6. Jede Änderung wird in `docs/makler-praesenz/UEBERGABE_MARCIN.md` nachgezogen, damit Marcin sie in die Plattform übernehmen kann.

## Schreibregeln

- Keine Geviertstriche oder Halbgeviertstriche, auch nicht in Kommentaren.
- Keine erfundenen Namen, Zahlen oder Stimmen. Echte Partner aus `MAKLER_DB` in `ui_kits/homepage/site-shared.jsx`.

## Bauen

`node build/build.mjs` erzeugt `dist/` (Variante 1, Variante 2 und Variante 3). Variante 3 (Adresse mit 3 am Ende) entsteht automatisch aus Variante 2 und unterscheidet sich nur in den Filmen: 2 zeigt die ruhigen, 3 die schnelleren im Stil der Makler-Filme. Die Vorschau-Seite `unio-verse.vercel.app` zeigt den Stand von `main`.
