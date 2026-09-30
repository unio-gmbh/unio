# Erlebnis und Ergebnis

Stand 01.10.2026. Etappe nach „Marke erzeugen v2, Teil 1“. Gebaut mit einem Chef, vier Bau-Agenten und einem strengen Prüfer je Modul, danach eine Nachbesserung. Berichte: `BRANDMARK_ANALYSE.md`, `CHEF_BRIEFS.md`.

## Was der Makler jetzt erlebt

| Moment | Wo | Datei |
|---|---|---|
| Ihr Stand: Ablauf mit vierzehn Momenten, ehrliche Summe (Markus: etwa 11 Std. 25 Min.), acht Einwilligungen mit Frist, „So haben wir gelesen“ | `?ansicht=stand&makler=ID`, Heute | `wb-stand.jsx` |
| Fragebogen v2: 23 Fragen, nur Fakten vorbelegt, frühere Worte als Zitat mit „Übernehmen“, eine Nachfrage bei knappen Antworten, Fremdbild-Link am Ende | `?ansicht=fragebogen&makler=ID`, Marke | `wb-fragen2.jsx` |
| Bildwahl: Probepaar, vier Fotopaare, Schriftprobe, altes Logo; Tippen wählt, Pfeiltasten, Seite je Makler zufällig | im Fragebogen | `wb-fragen2.jsx` |
| Fremdbild: drei Wörter ohne Namen, eigene Zustimmung | `?ansicht=fremdbild&makler=ID` | `wb-fragen2.jsx` |
| Feed-Vorschlag im echten Profilkopf: zwölf Beiträge, Wochenregler, Beitragsdetail, Gegenentwurf, nebeneinander | Markenbuch, Kapitel Feed | `wb-feed2.jsx` |
| Reveal im Vollbild in zehn Akten, Presenter-Fenster synchron, Rückmeldung am Folgetag | Markenbuch (Team), `?ansicht=reveal&presenter=1`, `?ansicht=rueckmeldung` | `wb-reveal.jsx` |
| Logo-Werkstatt v2 nach Brandmark: Stichworte, Prüfstand, Fassungen, Favicon-Reihe, Paket mit 19 Dateien | Studio, Logo (Team) | `wb-logo.jsx` |
| Makler wählt nicht mehr Schrift, Farbe oder Logo, er urteilt | Marke, Design | `wb-marke.jsx`, `wb-web.jsx` |

## Regeln, die im Code stehen

- Einwilligungen gelten nur mit Datum und Fassung (`auftrag[mid].einwilligungen[n] = { wert, datum, fassung, wer }`). Offen oder später zählt nach der Frist als Nein. Ohne Ja zu Zweck 7 ruft die Werkbank Claude nicht auf.
- Termine nach `01_auftakt.md` 3.5 mit `hmWerktagePlus` und Feiertagen, Reveal am Wochentag des Maklers, Live-Tag Plan A (13 Werktage) mit Ausweichtag Plan B (18).
- Dauer hat eine Quelle: `HM_STAND_DAUER`. Fragebogen, Heute und Ihr Stand lesen dieselbe Zahl (21 Minuten im Link).
- Haltungen werden nie vorbelegt. Kein erfundenes Zitat in einer Frage.
- Bilder der Bildwahl sind Übergangsbilder (`vorlieben.paarStatus = "uebergang"`), bis der Paarsatz fotografiert ist.
- Kaufpreise erscheinen nirgends im Feed.

## Selbsttest

Stand 10, Fragebogen 11, Feed 29, Reveal 25, Logo 19, Freigabe 4, übrige Gruppen 94. Alle grün am 01.10.2026.

## Bewusst offen

- „Einfügen“ eines Screenshots bei „Nicht ich“: heute Link, Text oder Satz, keine Bildablage.
- Fremdbild-Antworten liegen wie alles andere im Browser-Speicher, bis die Server-Datenhaltung kommt.
- Die übrige Werkbank duzt den Makler noch. Die Link-Ansichten siezen. Entscheidung zur Anrede steht aus.
- Akt 4 im Reveal zeigt die zwei Wege aus der alten Strategie (Archetyp-Schablonen), bis Schritt 6 Territorien liefert.
- Datenschema `auftrag.entscheider.mit` (art, entscheidet, rolle) noch nicht dokumentiert.
