# Umbau der Werkbank in Etappen

Stand 29.09.2026, eingearbeitet sind die Schrittfassungen bis 30.09.2026. Gehört zu `BRANDING_PROZESS_V2.md` (Prozess) und `FRAGEN_WIRKUNG.md` (Fragen). Entwurf zur Freigabe durch den Owner.

**Wofür diese Datei da ist.** Sie ordnet den Umbau der Werkbank in Etappen: was je Etappe sichtbar wird, welche Dateien und Datenfelder sie berührt, was sie kostet, was schiefgehen kann und was der Owner vorher tun muss. Dateilisten und Aufwände stammen aus Kapitel 8 der Schrittdokumente; alle Tage sind Schätzungen dieser Dokumente (Setzungen), keine Messungen.

**Sortierung nach Wirkung.** Zuerst kommt, was ohne neue Datenstruktur am meisten sichtbar verbessert oder eine teure Fehlinvestition verhindert (Etappen 0 bis 3). Danach folgt die Kette in der Reihenfolge, in der jede Etappe die nächste erst möglich macht; eine spätere Etappe früher zu bauen, hieße, sie auf Daten zu stellen, die es noch nicht gibt (Ableitung).

**Regeln für jede Etappe.**
- Architektur nach `ui_kits/werkbank/CLAUDE.md`: Babel ohne Build, globaler Scope, Präfix `hm`, kein `import()`, Export über `Object.assign(window, ...)`, Symbole nur über `<Ico n="..."/>`.
- Neue Objekte je Makler liegen unter `marke2[mid]` in `hmStore`; v1 (`plattform`, `branding`, `strategien`) bleibt für bestehende Makler lesbar, bis der Owner die Umstellung freigibt.
- Jede neue Datei bekommt einen Selbsttest, eingehängt in `wb-betrieb.jsx`. Jede Claude-Phase in `api/wb-marke.js` hat einen Regelpfad mit derselben Struktur, der Lücken statt Mustersätze setzt.
- Keine Zugangsdaten, keine Kontaktdaten Dritter, keine fremden Bilder im Repo. Das Repo ist öffentlich.
- Nach jeder Etappe ist die Werkbank lauffähig.

---

## Übersicht

| Etappe | Was sichtbar wird | Schritte | Aufwand | Risiko | Wirkung |
|---|---|---|---|---|---|
| 0 Entscheiden und angleichen | eine widerspruchsfreie Vorlage für den Bau | alle | 1,5 Tage, kein Code | niedrig | Voraussetzung |
| 1 Beweis für Markus | eine gerenderte Seite: Vertrag, Idee, Zeichen, Feed in zwei Fassungen | 7 bis 13 als Muster | 4 bis 6 Tage | mittel | hoch: prüft vor 180 Bautagen, ob die Kette High-End liefert |
| 2 Sofortreparatur im Bestand | Feed ohne fremde Objekte und Fülltext, keine Regelverstöße, Gate 2 wie dokumentiert | v1 | 3 Tage | niedrig | hoch je Tag |
| 3 Eine Quelle | freigegebene Marke ändert sich nie still; ein Claim, eine Palette, eine Anrede überall | 16 Kern, Anrede aus 8 | 7 Tage | mittel | hoch je Tag |
| 4 Verstehen im Link | "Ihr Stand", Fragebogen v2, Bildwahl mit echten Fotos | 1, 2, 3 | 28 Tage | hoch | hoch |
| 5 Workshop und Einsicht | Workshop-Konsole, Zitate mit Sprecher, Einsicht-Werkplatz | 4, 5 | 18,5 Tage | mittel | hoch |
| 6 Richtung, Vertrag, Stimme | Gate 1, Richtungstermin, Wort-Link; die Archetyp-Wege verschwinden | 6, 7, 8 | 21,5 Tage | mittel | sehr hoch |
| 7 Gestalt | eigene Wortmarke und Zeichen, Tokens, Kontaktbogen, Fotobrief; der Konfigurator verschwindet | 9, 10, 11 | 30,5 Tage | hoch | sehr hoch |
| 8 Social und Feed | Signatur-Serie, zwölf Kacheln im Profilkopf, Gegenentwurf | 12, 13 | 20,25 Tage | mittel | sehr hoch |
| 9 Zeigen und übergeben | Markenbuch als Montage, Gate 2, Reveal mit Strom-Test, Übergabe | 14, 15, Rest von 16 | 37,75 Tage | mittel | hoch |
| 10 Betrieb | Monatsplan aus Serien, Block-Freigabe, Wirkung gegen das Erfolgsmaß | 17 | 18,5 Tage | mittel | hoch |
| **Summe** | | | **rund 190 Personentage** | | |

Parallel zu den Etappen läuft die **Beschaffung**, die Code nicht ersetzen kann: Paarsatz-Shooting mit Pretest (Etappe 4), Pool-Bilder für die Fremdkategorie-Übung (5), Schriftbank mit Lizenzen für Web, Social und Druck (7), Pool fremder Beiträge für den Strom-Test und Druckerei (9), Server-Datenhaltung (ab 4), `ANTHROPIC_API_KEY` in Vercel (ab 4). Kosten sind überall Lücke.

---

## Etappe 0. Entscheiden und angleichen

**Was sichtbar wird.** Für den Makler nichts. Für das Team eine Vorlage ohne die Widersprüche aus `BRANDING_PROZESS_V2.md` Kapitel 8, damit der Bau nicht auf zwei Achsen, zwei Idee-Sätzen oder zwei Grammatiken beginnt.

**Was der Owner tun muss.**
1. Die Entscheidungen C1 bis C9 aus `BRANDING_PROZESS_V2.md` Kapitel 7 freigeben, vor allem C4 (Achse nach der Regel aus 9 plus Sichtbarkeitsregel) und C8 (keine weiteren ganzen Fassungen der Schrittdokumente).
2. Du oder Sie gegenüber dem Makler festlegen (Arbeitsstand Sie).
3. Festlegen, ob Daniel Creative Director ist und wer Workshop und Reveal leitet.

**Betroffene Dateien** (Ersetzungen, keine Neufassung):

| Datei | Änderung |
|---|---|
| `schritte/09_idee.md` | Idee-Satz und `idee.zeichen.herleitung` neu aus "Rat vor Auftrag." und `stimme.figur` (Rat, Dauer, Ergebnis); prüfen, ob die Maßlinie als Spanne vom Rat zum Ergebnis trägt (Ableitung, offen); Sichtbarkeitsregel der Achse |
| `schritte/10_system.md` | 10.9 Rollensätze und `proportion.feed` 10 zu 2; Achse nach C4; Grammatik Weite statt Feuilleton; Kernsatz ohne den gesperrten Satz |
| `schritte/11_bild.md` | Kurzfassung Punkt 5 und Beispiel nach C4 |
| `schritte/12_social.md` | `codesPruefung` liest `idee.codesJeKlasse`; P17 aus 8 in `sprachpruefung`; Seriennamen Zeitwert und Die Zeit daneben gegen die neue Idee prüfen |
| `schritte/13_feed.md` | `feed.gegenentwurf` nach C4; Kachel 3 wird Gesicht oder belegte Zahl, nie Pin ohne Person und Zahl; Codes je Klasse |
| `schritte/14_markenbuch.md` | Stand-Tabelle mit den Werten aus 12 Fassung 3; Aufgabe Kundenfreigabe neben der Unterlage |
| `schritte/15_reveal.md` | Kurzfassung Punkt 7, Akte 6 und 7 und Bühnensatz ohne den gesperrten Claim und ohne `tonwert` als feste Achse |
| `schritte/16_freigabe.md` | Beispiel der Variantenwahl, Übergabe-Tafeln, Website-Headline, Attribute nur über `hmAttributAufloesen` |
| `schritte/17_betrieb.md` | Gegenton Periode 6, Wochenzeit rund 4 Stunden 25, Serie "Warum jetzt" durch "Stichtag", Namenswunsch scheitert an der Namensregel |
| `schritte/02_fragebogen.md` | KI-Frage und Fremdbild-Einwilligung streichen (C1) |
| `schritte/03_vorlieben.md` | Paare Dichte, Material, Ordnung streichen (C2) |
| `schritte/07_positionierung.md` | Attribut a5 am Verhalten benennen, mit P7 aus 8 prüfen |
| `00_ZERLEGUNG.md` | acht Einwilligungen; Abnahmen nach C3; Verweis auf die drei Synthese-Dateien |
| `schritte/muster/01_ihr-stand.html` | Ansicht Einwilligungen mit acht Zwecken |

**Datenfelder.** Keine neuen. Festgelegt wird die Konstante `HM_IDEE_ACHSEN` mit der Sichtbarkeitsregel, bevor 10 und 11 sie lesen.

**Aufwand.** 1,5 Tage. **Risiko.** Niedrig; das Risiko liegt im Weglassen: Ohne diese Etappe baut Etappe 7 zwei Gegenentwürfe.

---

## Etappe 1. Beweis für Markus

**Was sichtbar wird.** Eine gerenderte Seite (STATUS Punkt 7): Markenvertrag, Claim, visuelle Idee, Zeichen und Wortmarke in Anwendung, dazu der Feed mit zwölf Kacheln im Profilkopf in Empfehlung und Gegenentwurf, Karte und Website-Kopf. Von Hand gesetzt nach den Regeln der Schritte 7 bis 13, auf den Daten des Demo-Seeds, jede fehlende Angabe als sichtbare Lücke.

**Warum so früh.** Die Schrittdokumente schätzen den Bau auf rund 180 Tage, dazu kommen 62 bis 81 Teamstunden je Makler. Ob sie High-End liefert, zeigt erst ein fertiges Beispiel. Fällt die Seite in der Rubrik unter 8 bei High-End, wird die Kette vor dem Bau geändert, nicht danach (Ableitung).

**Betroffene Dateien.** Neu `docs/werkbank/branding-v2/beweis/markus.html` mit Render als Bild; Grundlage sind die Muster `schritte/muster/07_markenvertrag.html`, `09_idee.html`, `10_anwendungsleiste.html`. Kein Code der Werkbank.

**Datenfelder.** Keine im Store. Die Seite nutzt die Werte aus den Schrittdokumenten nach Etappe 0.

**Aufwand.** 4 bis 6 Tage Art Direction und Satz (Ableitung, nicht in den Schrittdokumenten geschätzt).

**Risiko.** Mittel. Porträts: Es dürfen nur Bilder mit geklärten Rechten erscheinen und keine KI-Bilder erkennbarer Personen; fehlt ein echtes Porträt, bleibt die Fläche eine gekennzeichnete Lücke. Die Seite ist ein Muster mit einem Demo-Makler und darf nicht als echter Kunde erscheinen.

**Was der Owner tun muss.** Die Seite nach der Rubrik beurteilen und entscheiden: bauen wie geplant, Kette ändern oder stoppen.

---

## Etappe 2. Sofortreparatur im Bestand

**Was sichtbar wird.** Der Feed-Vorschlag im Markenbuch zeigt keine Demo-Objekte aus fremden Bezirken und keinen Fülltext mehr; Plätze ohne eigenes Objekt werden Lückenkacheln; das Folio zählt vorwärts ab 1. Das alte Logo wird erkannt. Oberfläche und Texte halten die UNIO-Regeln. Gate 2 sperrt so, wie es dokumentiert ist. Beiträge werden nie mehr automatisch nach Frist freigegeben.

**Betroffene Dateien.**

| Datei | Änderung | Beleg |
|---|---|---|
| `wb-markenwelten.jsx` | Demo-Objekte aus dem Feed-Muster (Zeile 293 ff.), Fülltext in `hmWeltPostDaten` (Zeile 1045 bis 1058), Folio rückwärts ab 24 (Zeile 1059); Objektplatz ohne eigenes Objekt als Lückenkachel | KETTE_IST 4 |
| `wb-markenbuch.jsx` | Feed-Vorschau reicht Serienbeispiele mit `art` weiter (Zeile 118); Gate-Schwelle 80 und kein Kriterium unter 60 statt 75 (Zeile 63); Story-Längen 70 bis 100 und 160 bis 220 statt "50" und "150" | KETTE_IST 3 |
| `wb-plattform.jsx` | Selbsttest "Rangfolge der Qualität" an die neue Schwelle (Zeile 1277); zweite Bildpaar-Tabelle `aff` in `hmPfVisuell` (Zeile 812) entfernen | FRAGEN_WIRKUNG_IST Befund 9 |
| `wb-setup.jsx` | Logo-Erkennung sucht "Altes Logo" statt "Logo" (Zeile 129) | KETTE_IST 2.1 |
| `wb-data.jsx` | Bedingung `fels` (Zeile 210), jede Antwort a als warm (Zeile 290), unbelegte "rund 80 Prozent" (Zeile 170) | Befunde 9 und 11 |
| `wb-strategie.jsx` | `(a.seite \|\| 50)` (Zeile 24), Format "live" (Zeile 12), "80 Prozent" im Leitfaden (Zeile 18) | Befunde 9 und 11 |
| `wb-flow.jsx` | `linear-gradient` in den Figur-Karten (Zeile 114), Pfeil-Textzeichen als Knöpfe (Zeile 110), "Fünf Kapitel. Achtzehn Minuten." (Zeile 41), Eyebrow im Kapitel-Reveal | Befund 11, KETTE_IST 6 |
| `wb-marke.jsx` | Eyebrow im Studio-Mock; eine Visitenkarte statt zwei (`Visitenkarte` weicht `WeltKarte`) | KETTE_IST 3 und 6 |
| `wb-content.jsx` | keine automatische Freigabe nach Frist (Zeile 142 und 323) | `17_betrieb.md` 0 Punkt 3 |
| `wb-os-data.jsx` | Wirkungsprognose `hmViralScore` (Zeile 205), die Persönlich und Markt gegen die Pflichtsäule belohnt, abschalten | `17_betrieb.md` 0 Punkt 7 |

**Datenfelder.** Keine neuen.

**Aufwand.** Rund 3 Tage (Ableitung aus der Zahl der Stellen; die Schrittdokumente führen diese Liste als Umbauliste ohne Schätzung, `00_ZERLEGUNG.md` 4.1).

**Risiko.** Niedrig. Die schärfere Gate-Schwelle kann bestehende Markenbücher unter "Vor der Freigabe schärfen" fallen lassen; das ist gewollt. Seeds von Markus und Elif neu prüfen.

**Was der Owner tun muss.** Nichts vorab. Bestätigen, dass freigegebene v1-Marken durch die schärfere Schwelle nicht zurückgezogen werden.

---

## Etappe 3. Eine Quelle

**Was sichtbar wird.** Eine Freigabe friert eine Version mit Prüfsumme ein. Karte, Signatur, Brand-Kit, Website, Caption und Reel zeigen denselben Claim, dieselbe Palette und dieselbe Anrede. "Neu erzeugen", eine Weltwahl oder eine geänderte Antwort nach der Freigabe werden zu "Änderung beantragen". Das schließt die meisten Brüche aus KETTE_IST Kapitel 3 auf einmal, auch für v1-Makler.

**Betroffene Dateien.**

| Datei | Änderung |
|---|---|
| `wb-freigabe.jsx` (neu) | `hmMarkeLesen(mid, "oeffentlich")`, `hmQuelle`, `hmQuelleVersion`, `hmQuelleSperre`, `hmQuelleEinfrieren`, `hmQuellePruefen`; kanonischer JSON-Text mit SHA-256-Prüfsumme; v1-Adapter, der Plattform, Welt, Claim, Palette und Anrede eines v1-Maklers als Version einfriert |
| `wb-vertrag.jsx` (neu, zunächst nur Anrede) | `hmAnrede`, `hmAnredeRegel` nach `08_stimme.md` 3.4, einzige Definition |
| `wb-marke.jsx`, `wb-markenwelten.jsx`, `wb-markenbuch.jsx` (Zeile 18, 48, 64, 115), `wb-web.jsx`, `wb-produktion.jsx`, `wb-content.jsx`, `wb-reel.jsx`, `wb-os-data.jsx` (`hmCaption`), `wb-material.jsx` | lesen nur noch über `hmMarkeLesen`; jeder Schreibpfad prüft `hmQuelleSperre`; Anrede nur über `hmAnrede` |
| `wb-store.jsx` | Ablage `marke2[mid].quelle`, `freigabe.historie` |
| `wb-betrieb.jsx`, `index.html` | Selbsttest `hmSelbsttestFreigabe` (Teil Quelle), Script-Tags |
| `docs/werkbank/MARKE_SCHEMA.md` | Objekt `quelle` |

**Datenfelder.** `quelle {version, eingefrorenAm, freigegebenVon, inhalt, pruefsumme}`, `freigabe.historie[] {version, datum, wer, was, zusammenfassung}`, `anrede` je Kanal.

**Aufwand.** Rund 7 Tage: Datenschicht und Prüfsumme 2, Umstellung der Abnehmer und Sperren 2,5, Anrede-Regel mit Umstellung der Abnehmer 1, Selbsttest 1, Doku 0,5 (aus `16_freigabe.md` 8.5 und `08_stimme.md` 8.5).

**Risiko.** Mittel. Ein vergessener Leser bleibt ein stiller Pfad; der Selbsttest muss jede Stelle finden, die `plattform`, `branding` oder `w.anrede` direkt liest. Bis zur Server-Datenhaltung bindet ein Freigabe-Code den Klick des Maklers an die Prüfsumme (`16_freigabe.md` 3.5).

**Was der Owner tun muss.** Bestätigen, dass bestehende Freigaben als Version 1.0 eingefroren werden. Festlegen, ab wann Server-Datenhaltung (Supabase EU laut FAHRPLAN) kommt.

---

## Etappe 4. Verstehen im Link

**Was sichtbar wird.** Der Makler bekommt nach dem Auftakt-Gespräch den Link "Ihr Stand" mit Plan, ehrlicher Dauer und acht Einwilligungen an einer Stelle, danach den Fragebogen v2 mit Fall-Karten und Wirkungsliste und die Bildwahl mit echten Fotos und seinem alten Logo. Das Team bekommt das Dossier mit Wettbewerbskarte, Material, Porträt-Prognose und Kundenstimmen.

**Betroffene Dateien.**

| Datei | Änderung |
|---|---|
| `wb-auftakt.jsx` (neu) | Register `HM_DAUER_REGISTER` mit `hmDauerSetzen`, `hmDauerMessen`, `hmAuftragDauer`, `hmDauerText`; `hmVorab`, `hmKennzahlen`, `hmAbschluesse`, `hmPortraetPrognose`, `hmLogoAlt`, `hmAuftragTermine`; `HM_EINWILLIGUNGEN` mit acht Zwecken; `AuftaktLink`, `AuftaktTeam`; Selbsttest |
| `wb-fragen.jsx` (neu) | `HM_FRAGEN_V2`, `HM_FELDER_V2` mit Abnehmer, Listen, Pfadlogik, Stimmproben |
| `wb-vorlieben.jsx` (neu) | Paarsatz-Metadaten ohne Bilder im Repo, Profil, Logo-Urteil, Widersprüche, Kohorte |
| `wb-flow.jsx` | `Fragebogen` neu ohne KI-Frage und ohne Fremdbild-Einwilligung (C1); Aufrufe von `hmArchetypScores` und `hmZweiWege` entfallen im Bogen |
| `wb-app.jsx` | Ansichten `ansicht=fragebogen` und Auftakt-Link ohne Navigation |
| `wb-werkzeuge.jsx` | `HM_IMPORT_FELDER.objekte` um `status`, `eingang`, `abschluss`, `hwb`, `fgee`, `klasse`; Adresse speichern |
| `wb-setup.jsx`, `wb-einrichtung.jsx`, `wb-os-data.jsx` | Logofarben, Konten mit Benutzernamen, Baustein `auftakt` in `HM_EINRICHTUNG` |
| `wb-store.jsx`, `wb-betrieb.jsx` | Seeds im v2-Format, Selbsttests, Export `marke2` |
| `api/wb-marke.js` | Phasen `vorab`, `nachfrage`, `faelle`; der Server lehnt jeden Aufruf ohne Ja zu Zweck 1 und 7 ab |
| `api/wb-fremdbild.js` (neu), Fremdbild-Seite (neu, außerhalb von `/ux`) | anonyme Antworten mit eigener Zustimmung der Antwortenden |
| `docs/werkbank/MARKE_SCHEMA.md` | `auftrag`, `vorab`, `antworten` v2, `fremdbild`, `vorlieben` |

**Datenfelder.** `auftrag.entscheider`, `termine`, `dauer`, `einwilligungen[8]`; `vorab.fakten`, `kennzahlen`, `material`, `logoAlt`, `auftrittHeute`, `wettbewerb`, `kundenstimmen`, `luecken`, `nachtraege`; `antworten.<key>` mit Quelle und Dauer; `fremdbild`; `fragebogen.messung`; `vorlieben.bildpaare`, `profil`, `nichtIch`, `bestandUrteil`, `bestandBehalten`, `widersprueche`.

**Aufwand.** Rund 28 Tage: Schritt 1 rund 12,5, Schritt 2 rund 12 (etwas weniger ohne Einwilligungsweiche), Schritt 3 rund 4 (drei Paare weniger). Einmalig dazu der Paarsatz: Angebote, ein Shooting-Tag, ein Tag Auswahl, ein Tag Pretest mit mindestens 30 Personen.

**Risiko.** Hoch. Ohne geklärte Rechtsgrundlagen darf kein echter Makler den Link bekommen. Ohne Server-Datenhaltung liegen Antworten im Browser und kommen per Export (Stufe A in `02_fragebogen.md` 8.3). Der Paarsatz braucht Rechte und Einwilligung des Modells; bis er steht, läuft Schritt 3 nur mit dem Logo-Urteil. Der v1-Fragebogen muss für bestehende Makler weiterlaufen.

**Was der Owner tun muss.**
1. Rechtsgrundlagen für die acht Zwecke klären lassen, vor allem KI-Verarbeitung, Lesen öffentlicher Profile, Fremdbild-Seite und das kurze Speichern fremder Beispiele.
2. Budget für den Paarsatz freigeben.
3. Festlegen, wer das Auftakt-Gespräch führt und wer die zweite Bewertung der Wettbewerbskarte macht.
4. Entscheiden, ob der Server Websites selbst lesen darf; bis dahin fügt das Team Text mit Adresse und Abrufdatum ein.
5. `ANTHROPIC_API_KEY` in Vercel setzen oder bewusst im Regelpfad starten.

---

## Etappe 5. Workshop und Einsicht

**Was sichtbar wird.** Für den Makler ein Workshop, der mit seinen eigenen Sätzen vorbereitet ist: Recall-Karten statt neuer Fragen, ein Probedreh, am Ende drei seiner Sätze zur Entscheidung öffentlich oder intern. Für das Team eine Konsole mit Leitfaden auf einer Seite, Zeitplan, typisierten Marken und lokaler Aufnahme, danach eine Auswertung mit Pseudonymen, Sprechern und Zitatverweisen sowie ein Werkplatz für drei Einsicht-Kandidaten.

**Betroffene Dateien.**

| Datei | Änderung |
|---|---|
| `wb-workshop.jsx` (neu) | `hmWorkshopLeitfaden`, `hmWorkshopFaelle`, `hmWorkshopZeitplan`, `hmWorkshopWidersprueche`, `WorkshopKonsole`, `WorkshopAuswertung`, `hmWorkshopPseudonym`, `hmWortschatz`, Regelpfad, Selbsttest |
| `wb-strategie.jsx` | `hmAuswerten` und `hmLeitfaden` ersetzt; `hmTranskribieren`, `hmAudio16k`, `hmGlossar` bleiben |
| `wb-einsicht.jsx` (neu) | `EinsichtWerkplatz`, Belegtafel, Lesarten, Kandidaten, Nachholen der Workshop-Frage |
| `wb-team.jsx` | Bereich "Gespräche": vorbereiten, führen, auswerten |
| `wb-plattform.jsx` | `hmPfZitate` liest nur Zitate mit bestätigtem Sprecher; `hmPfEinsicht` ohne feste Konventionssätze (Zeile 392 bis 404) |
| `api/wb-marke.js` | Phasen `workshop` (nur pseudonymisiert, gesperrt ohne Zweck 7) und `einsicht` |
| `wb-betrieb.jsx`, `index.html`, `MARKE_SCHEMA.md`, `MARKENQUALITAET.md` | Selbsttests, Script-Tags, Objekte `workshop` und `einsicht` |

**Datenfelder.** `workshop.zitate[] {sprecher, text, zeit, thema, oeffentlich}`, `geschichte` mit `belege[] {unterlage, oeffentlich}`, `leiter[2]`, `switch`, `karte`, `fremdkategorie`, `falschWaere`, `probedreh`, `klaerungen`, `aufgaben`, `ort`; `einsicht.zielgruppe`, `spannung`, `konvention`, `weisseStelle`, `unbequem`, `stuetzen`, `kandidaten`.

**Aufwand.** 18,5 Tage (Schritt 4 rund 15,5, Schritt 5 rund 3).

**Risiko.** Mittel. Die Aufnahme braucht die Zustimmung aller Anwesenden; Namen müssen vor jedem Claude-Aufruf ersetzt sein. Der Workshop ist mit 5,9 bis 7,8 Personenstunden je Makler der größte Termin des Teams.

**Was der Owner tun muss.** Festlegen, wer den Workshop führt und ob vor Ort oder per Video der Regelfall ist. Lizenz der Pool-Bilder für die Fremdkategorie-Übung. Die geplante Zahl neuer Makler je Monat nennen, damit die Kapazität gerechnet werden kann.

---

## Etappe 6. Richtung, Vertrag, Stimme

**Was sichtbar wird.** Die zwei Wege aus Archetyp-Schablonen verschwinden aus dem Makler-Fluss. Neu sind die Gate-1-Ansicht für Daniel (erst Einsicht, dann drei Territorien mit Checkliste), der Richtungstermin mit zwei Rohskizzen aus seinem Material, der Wort-Link mit Markenvertrag und danach Claim-Wahl und Story-Markierung.

**Betroffene Dateien.**

| Datei | Änderung |
|---|---|
| `wb-territorien.jsx` (neu) | Dossier, Schablonenliste, Kohorte in Text und Bild, Regeln mit Deckel, Rohskizzen-Renderer in Graustufen, Gate-1-Ansicht, Richtungstermin, Sperre, Selbsttest |
| `wb-vertrag.jsx` (ergänzt) | `hmVertragEntwurf`, `hmVertragPruefen`, `hmAttributAufloesen`, `hmVertragFalschListe`, Versionen, Wort-Link |
| `wb-stimme.jsx` (neu) | Grundregeln, Klischee- und Schablonenliste, Stimmgabel, Claim-Werkstatt, Story in drei Längen, Prüfer, Selbsttest |
| `wb-marke.jsx`, `wb-store.jsx` | Schrittkette "Richtung" nach dem Workshop statt "Konzept"; `hmSchritteFuer` |
| `wb-flow.jsx` | `Strategie`, `WegKarte`, `StrategieReveal` werden im Makler-Fluss nicht mehr aufgerufen |
| `wb-plattform.jsx` | `HM_PF_FIGUR` nur noch als Schablonenliste, nie als Text; Positionierung, Werte, Rolle lesen den eingefrorenen Vertrag |
| `wb-markenbuch.jsx`, `wb-app.jsx`, `wb-foto.jsx` | Kapitel Positionierung aus dem Vertrag; Ansicht `vertrag`; entsättigtes Porträt für die Skizzen |
| `api/wb-marke.js` | Phasen `territorien`, `vertrag`, `stimme` mit Schemas und Serverprüfung; Phase `voll` für v2 nicht mehr |

**Datenfelder.** `territorien[3]`, `territorien.kritik`, `tafelPlus`, `gate1`, `richtung`; `positionierung`, `versprechen`, `rolle`, `werte`, `persoenlichkeit`, `beweise` mit `pruefstatus` und `oeffentlich`, `markenvertrag` mit Version; `stimme`, `anrede`, `botschaften` mit genau einem Claim, `story`, `presse`.

**Aufwand.** 21,5 Tage (Schritt 6 rund 9,5, Schritt 7 rund 5,5, Schritt 8 rund 6,5).

**Risiko.** Mittel. Ohne `ANTHROPIC_API_KEY` formuliert das Team Territorien und Vertrag selbst, 1 bis 1,5 Stunden mehr je Makler. Der Regelpfad darf keinen Satzbaustein aus `HM_PF_FIGUR` ausgeben, sonst entstehen wieder Schablonen wie "Zeit ist Teil des Preises.".

**Was der Owner tun muss.** Die Schablonenliste der gesperrten Sätze bestätigen. Daniel als Verantwortlichen für Gate 1 festlegen (D1).

---

## Etappe 7. Gestalt

**Was sichtbar wird.** Der Makler wählt nie mehr Logo-Typ, Schrift oder Akzentfarbe; der Konfigurator verschwindet aus seinem Pfad. Das Team bekommt eine Werkstatt für Brief, Idee und Varianten mit Wandtest, einen Handsatz der Wortmarke mit SVG-Upload, Tokens mit Begründung und Sperrstufen, eine Anwendungsleiste für Profilbild bis Verkaufsschild, den Kontaktbogen in zwei Durchgängen und den Fotobrief mit einer Seite für den Makler.

**Betroffene Dateien.**

| Datei | Änderung |
|---|---|
| `wb-idee.jsx` (neu) | `HM_IDEE_ACHSEN` mit Sichtbarkeitsregel (Etappe 0), Wege, Stammregel, Codes je Klasse, Varianten, Wandtest, Selbsttest |
| `wb-system.jsx` (neu) | Datenschicht, Rollensätze, Kontrastmatrix, Größenleiter, Tokens im W3C-Format, Stresstest, `SystemWerkstatt`, Selbsttest |
| `wb-bild.jsx` (neu) | Bildregeln mit Herkunft, Ausschnitt-Rechnung, Zählung verwendbarer Gesichtsbilder, Kontaktbogen, Fotobrief |
| `wb-markenwelten.jsx` | Renderer lesen Tokens; `WeltWahl` nicht mehr im Makler-Pfad; Welten nur noch interne Grammatik |
| `wb-ui.jsx` | `hmBrand` mit `HM_SCHRIFTPAARE` und `HM_AKZENT_EMPF` gilt nicht mehr für v2 |
| `wb-marke.jsx`, `wb-web.jsx`, `wb-reel.jsx` | Brand-Kit, Website, Signatur und Reel aus Tokens; Motion-Tokens |
| `wb-plattform.jsx`, `wb-bildwelt.jsx` | `hmPfVisuell` liest `idee`; Bildwelt technisch gesperrt für Porträt, Objekt und Feed |
| `tools/maklerzuschnitt` | Vorgabe des Ausschnitts und Landmarken aus `bild.regeln` |
| `api/wb-marke.js` | Phasen `brief`, `idee`, `system`, `bild`; Claude schreibt Begründungen, zeichnet nie |

**Datenfelder.** `brief`; `idee.satz`, `zeichen`, `codes`, `codesJeKlasse`, `varianten`, `gezeigt.achse`, `begruendung`; `system.wortmarke`, `zeichen`, `typo`, `farbe`, `raster`, `tokens`, `sperrstufen`, `festUndVariabel`, `spielraum`, `stresstest`, `gegenentwurf`; `bild.regeln`, `motive`, `vermeiden`, `kontaktbogen`, `portraet`, `portraetTermin`, `luecken`; `fotobrief`.

**Aufwand.** 30,5 Tage (Schritt 9 rund 7, Schritt 10 rund 13 plus 1 Tag Schriftbank, Schritt 11 rund 9,5).

**Risiko.** Hoch. Der Kern ist Handarbeit: 7,5 bis 11,5 Teamstunden je Makler allein im Designsystem, bei der Achse Schriftstimme bis 15,5. Schriftlizenzen für Web, Social und Druck sind Pflicht. Ohne Etappe 0 entstehen zwei Gegenentwürfe.

**Was der Owner tun muss.** Budget für die Schriftbank und ihre Lizenzen. Festlegen, wer Art Director ist. Die Markenarchitektur UNIO und Makler entscheiden, weil sie `system` und `kanalplan` betrifft. Vor Änderungen am Zuschnitt klären, in welchem Repo er gebaut wird (Aktiv- oder Passiv-Repo).

---

## Etappe 8. Social und Feed

**Was sichtbar wird.** Der Feed-Vorschlag, wie ihn der Makler im Reveal sieht: zwölf Kacheln in Veröffentlichungsfolge im echten Profilkopf, mit Wochenregler, geöffneten Beiträgen, Captions und Lückenkacheln, dieselben Inhalte im Gegenentwurf. Für das Team die Serienwerkstatt mit Tragfähigkeit, Jahresrechnung, Namensregel, Bildaufbau je Vorlage und Nachschubquelle.

**Betroffene Dateien.**

| Datei | Änderung |
|---|---|
| `wb-social.jsx` (neu) | Vorprüfung, Stoffinventar, Säulen, Signatur-Prüfung, Grammatik mit `hmSocialFolgePruefen`, Vorlagen mit Sperrstufen, Sprach- und Objektregel, Marktquelle, Selbsttest |
| `wb-serien.jsx` (neu) | Team-Ansicht Serienwerkstatt |
| `wb-feed.jsx` (neu) | `hmFeedPlan`, `hmFeedNeuRechnen`, Belegprüfung im Raster, Prüfer, Telefonansicht mit Wochenregler, Gegenentwurf, Selbsttest |
| `wb-markenwelten.jsx` | Renderer für Reel-Titelbild, Karussellseiten, Lückenkachel und Profilkopf |
| `wb-markenbuch.jsx` | Feed-Vorschau aus `feed` statt aus `hmWeltFeedPosts` |
| `api/wb-marke.js` | Phasen `social` und `feed`: Claude schreibt Worte, Regeln entscheiden Ordnung und Form |

**Datenfelder.** `saeulen`, `serien[]` mit `nachschub`, `serienErsatz`, `serieSignatur`, `vorlagen`, `grammatik {takt 12, gesichtPeriode 3, tonwertPeriode 6 nur Sachplatz}`, `formatmix`, `codesPruefung`, `kanalplan`, `konzepte`, `sprachpruefung` mit P17, `objektRegel`, `marktquelle`; `start30`, `feed.kacheln[12]`, `profilkopf`, `wochen`, `pruefung`, `gegenentwurf`, `linkedin`.

**Aufwand.** 20,25 Tage (Schritt 12 rund 8,75, Schritt 13 rund 11,5 inklusive Import).

**Risiko.** Mittel. Eine Markt-Serie braucht eine gepflegte Quelle mit URL und Stand; konkrete Marktquellen sind nicht geprüft (Lücke in 12). Sichere Zonen organischer Reels sind nur für Anzeigen dokumentiert (Lücke).

**Was der Owner tun muss.** Die Rolle Marktredaktion besetzen. Postformat 1080 x 1350 mit 3:4-Fenster bestätigen.

---

## Etappe 9. Zeigen und übergeben

**Was sichtbar wird.** Das Markenbuch als gesetztes Objekt mit dem Weg einschließlich verworfener Richtungen, Sicht je Rolle und einer Seite für Eilige. Gate 2 ohne Knopf zum Übersteuern. Der Reveal im Vollbild in zehn Akten mit Strom-Test und Presenter-Ansicht, die Rückmeldung am Vertrag am Folgetag, die Freigabe-Ansicht mit Diff, die Übergabe in seiner eigenen Marke, die Umfeld-Vorschau und der Live-Termin mit Checkliste.

**Betroffene Dateien.**

| Datei | Änderung |
|---|---|
| `wb-gate2.jsx` (neu) | Qualitätsprüfung mit zwölf Kriterien und siebzehn Sperren, Zahlen- und Lückenliste, Kohorte in Text und Bild, Lautlese-Modus, Abzeichnung |
| `wb-markenbuch.jsx` | Montage über Belegungsplan, satzweise Redaktion mit Rückschreiben, Kapitel, Rollen, Druckfassung |
| `wb-reveal.jsx` (neu) | Ablauf, Bühne, Strom mit Stopp-Messung, Telefon-Ansicht, PDF-Fassung |
| `wb-rueckmeldung.jsx` (neu) | Urteil je Kriterium und Fassung, Pins mit Einordnung, Runden |
| `wb-freigabe.jsx` (ergänzt) | Freigabe-Ansicht, Übergabe mit fünf Tafeln, `hmRolloutPlan`, Umfeld-Vorschau, Live-Karte, Paket aus der Quelle |
| `wb-material.jsx` | Paket aus der Quelle ersetzt Brand-Kit und Materialpaket |
| `api/wb-kohorte.js` (neu), `api/wb-marke.js` | geteilter Kohortenspeicher; Phasen `markenbuch`, `reveal`, `freigabe` |

**Datenfelder.** `markenbuch.kapitel`, `kernUndOffen`, `rollen`, `redaktion`; `qualitaet`; `gate2`; `praesentation` mit `fremdtest`; `rueckmeldung` mit `jeKriterium`, `wahl`, `serienname`, `pins`; `aenderungen`; `uebergabe`; `rollout.umfeld`, `drehtag`, `liveTag`, `folge`, `checkliste`.

**Aufwand.** 37,75 Tage (Schritt 14 rund 17,5, Schritt 15 rund 11, Rest von Schritt 16 rund 9,25 nach Abzug von Etappe 3).

**Risiko.** Mittel. Der Strom-Test braucht einen lizenzierten Pool fremder Beiträge; die Kohortenprüfung einen geteilten Speicher; Druckproben brauchen eine Druckerei. Der Reveal bindet 5 bis 6,5 Teamstunden je Makler.

**Was der Owner tun muss.** Lizenz und Auswahl des Strom-Pools, Druckerei und Kartenauflage, Preis einer dritten Runde, Leitung der Reveals.

---

## Etappe 10. Betrieb

**Was sichtbar wird.** Der Monatsplan entsteht nur aus den Serien der Quelle, in Blöcken zu vier Sendewochen. Der Makler bekommt eine Drehtag-Seite mit Fragenliste und gibt die Folge einmal je Block frei. Vor jeder Veröffentlichung prüft die Werkbank sechs Punkte und die Prüfsumme. Rückblicke nach 30 Tagen und zwölf Wochen zeigen seine echten Zahlen gegen das Erfolgsmaß.

**Betroffene Dateien.**

| Datei | Änderung |
|---|---|
| `wb-pflege.jsx` (neu) | `hmUhr`, `hmMonatsplan`, Hook-Auflösung, Kontingent, Drehtag-Plan, Prüfungen, Freigabe der Folge mit Reserve, Wirkung, Quartal mit Hash-Prüfung, Änderungsantrag, Lernen, Selbsttest |
| `wb-produktion.jsx` | `hmIdeen` mit `HM_IDEEN_VORLAGEN` und `HM_ANLAESSE_Q4` entfällt für v2-Makler; Report nach Block statt Kalendermonat |
| `wb-content.jsx` | Freigabe je Block statt je Beitrag |
| `wb-os-data.jsx` | `hmSkriptCheck` an die Hook-Formel der Serie |
| `wb-reel.jsx` | Beiträge aus Vorlage und Renderer der Marke |
| `api/wb-marke.js` | Phase `betrieb` mit Regelpfad |

**Datenfelder.** `monatsplan[]`, `beitrag[]`, `drehtage[]`, `wirkung`, `quartal`, `aenderungsantrag[]`, `kohorte`, `lernen`, `betrieb.stoff`, `betrieb.uhr`.

**Aufwand.** 18,5 Tage.

**Risiko.** Mittel. Rund 16 Teamstunden je Block und Makler; der Insights-Import muss je Beitrag den Permalink tragen. Werte aus Grundbuch-Terminen bleiben gesperrt, bis der Rechtsrahmen geklärt ist.

**Was der Owner tun muss.** Kontingent und Preis im Abo festlegen. Den Rechtsrahmen für Werte aus Grundbuch-Terminen klären lassen.

---

## Offene Punkte über alle Etappen

1. **Kosten gegen Preis.** Rund 190 Bautage einmalig, 62 bis 81 Teamstunden je Makler bis zum Live-Tag, rund 16 Stunden je Block im Betrieb. Ein Preis ist hier nicht geprüft (Lücke).
2. **Messen statt setzen.** Alle Minuten, Stunden und Schwellen sind Setzungen. Die ersten fünf Makler liefern die echten Werte über `hmDauerMessen`, `fragebogen.messung` und `betrieb.messung`.
3. **Umstellung bestehender Makler.** Wann ein v1-Makler auf v2 wechselt und ob seine Marke dabei neu entsteht oder als Version 1.0 bleibt, entscheidet der Owner.
4. **Kohortengröße.** Ab wie vielen Maklern die Ähnlichkeitsprüfung trägt, ist offen.
