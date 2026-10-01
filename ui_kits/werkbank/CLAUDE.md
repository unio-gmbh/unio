# Werkbank

## Was das ist

Werkzeug, mit dem das UNIO-Team Immobilienmakler zu Personenmarken macht: Einrichtung, Marke, Inhalte, Wirkung, Shop. React ohne Build (Babel im Browser), Daten in `hmStore` (localStorage `unio_hm_*`) und IndexedDB `unio_hm_blobs`. Live unter `/ux/werkbank`, gebaut nach `dist/ux/werkbank` wie `build/build.mjs` Schritt 3f.

## Der Mensch, mit dem du arbeitest

Daniel, Owner und Creative Director. Deutsch, einfach erklären, keine Fachwörter ohne Erklärung.

## Arbeitsregeln

- Erst `docs/werkbank/STATUS.md` und `docs/werkbank/FAHRPLAN.md` lesen.
- Eine Etappe. Plan für alle Punkte vorlegen, ein OK abwarten, dann selbstständig durcharbeiten, Tests nach jedem Punkt. Stopp nur bei Zugängen, echten Entscheidungen oder roten Tests.
- Nach jeder Änderung Selbsttest (Einstellungen, Selbsttest) grün halten.
- Jede Sitzung endet mit `Fertig:` · `Du musst tun:` · `Als Nächstes:`
- STATUS.md pflegen: Erledigt mit Datum, Offen beim Owner, Lehren.

## UX-Standard

Wichtiges oben, Hauptaktion mit einem Klick, Seltenes hinter "Details". Löschen nur im Menü mit Sicherheitsabfrage, Schließen löscht nie. Speichern sichtbar. Detailansichten als Seitenpanel. Höchstens etwa sieben Bedienelemente je Bereich. Keine Eyebrows, keine Textzeichen als Icons (nur SVG mit 1,5 px Strich), keine Emojis, keine Ausrufezeichen, keine Gedankenstriche.

## Sicherheit

Keine Zugangsdaten in Dateien (das Repo ist öffentlich). Schlüssel nur in Vercel. Keine KI-Bilder von erkennbaren Personen.

## Architektur-Muster

- Skripte teilen einen globalen Scope: Funktionen und Konstanten mit Präfix `hm`, Komponenten groß, Export über `Object.assign(window, ...)`.
- Kein `import()` im Babel-Code, stattdessen Script-Tag oder `new Function("u","return import(u)")`.
- Datenverträge: `docs/werkbank/MARKE_SCHEMA.md`, `BILDWELT_BRUECKE.md`, `WEBSITE_BAUKASTEN.md`, `erlebnis/ERLEBNIS_UND_ERGEBNIS.md`.
- Push erst nach Daniels Sichtprüfung, Commit lokal ist ok.
- Neue Module bringen ihr CSS selbst mit (`<style id="stil-...">` am Dateianfang), nicht in `index.html`.
- Makler-Links ohne Menü: `?ansicht=stand|fragebogen|rueckmeldung|reveal|fremdbild&makler=ID`. Den Makler dort immer siezen, Herr oder Frau nie raten.
- Jede Minutenangabe für den Makler kommt aus `HM_STAND_DAUER` (`wb-stand.jsx`), Einwilligungen nur über `hmEinwilligung` (gilt nur mit Datum).

## Fahrplan (kurz)

Zuletzt: Markensystem (Google-Fonts-Katalog, Schriftpool, acht Markenrichtungen), davor Markt und Bewegung, Marke sichtbar, Erlebnis und Ergebnis. Danach: Umbau Markenprozess v2, Rest. Details in `docs/werkbank/FAHRPLAN.md`.
