# Makler-Präsenz: Übergabe an die Plattform

Für: Marcin · Von: Daniel (Ad Boutique) · Laufendes Dokument

| | |
|---|---|
| Stand dieses Dokuments | 20.11.2026, Version 9 (zusätzlich: Vorlagen-Seite mit allen Bausteinen in Varianten, Vorschlag zur Seitenstruktur) |
| Verglichener Live-Stand | www.unio.at am 20.11.2026, Deployment `dpl_CjXtyb5bsAm9Vs9dmkvNDpfTyuJ7` |
| Repo-Stand | Branch `claude/vibrant-edison-th7jx0`, aufbauend auf `bf80781` |
| Plan dazu | [PLAN.md](PLAN.md) |

**Wichtig: Nichts aus diesem Dokument ist zur Umsetzung freigegeben, solange in der Spalte Status nicht "freigegeben" steht.** Die Vorschauen im Repo sind Entwürfe. Auf den öffentlichen Seiten des Repos ist die Makler-Zeile per Schalter abgeschaltet (Abschnitt 7).

## 1. So wird dieses Dokument gepflegt

- Jede Änderung hat eine feste Nummer (`MP-01`, `MP-02`, ...). Nummern werden nie neu vergeben.
- Status je Paket: `Entwurf` (wird noch abgestimmt), `freigegeben` (kann umgesetzt werden), `in Umsetzung`, `auf Test`, `live`, `verworfen`.
- Bei jeder Runde: Datum und Version oben anpassen, Live-Stand neu prüfen, Abschnitt 2 (Vergleich) und Abschnitt 9 (Protokoll) aktualisieren.
- Die Vorschau im Repo ist die Referenz für Aussehen und Verhalten. Die Plattform muss den Code nicht übernehmen, nur das Ergebnis.
- Rückfragen bitte in Abschnitt 8 eintragen.

## 2. Vergleich: Live, Repo, Ziel

| Thema | Live heute | Repo-Vorschau | Ziel | Paket |
|---|---|---|---|---|
| Makler-Daten in der Suche | Feld `agents` vorhanden, immer leer | Demo-Register mit 4 echten Partnern | `agents` gefüllt | MP-01 |
| Porträt des Maklers | Zwei getrennte Quellen (Firmenprofil und Maklerseite), dadurch teils nur Initialen | ein Bild je Person | eine Quelle für alle Flächen | MP-01 |
| Objektkarte Startseite | ohne Person | ein Kreis rechts oben im Bild | Kreis im Bild | MP-02 |
| Objektkarte Suche `/listing` | ohne Person | ein Kreis rechts oben im Bild | Kreis im Bild | MP-02 |
| Link Objektseite zur Maklerseite | fehlt | auf Karten gebaut, auf der Objektseite noch offen (Wenzel Wächter hat keine Maklerseite) | vorhanden | MP-03 |
| Person auf der Objektseite | Feld "Kontaktdaten" in der Spalte, mobil ganz unten | eine randlose Zeile unter dem Titel | eine Zeile unter dem Titel, "Kontaktdaten" entfällt | MP-04 |
| Objektseite mobil, feste Leiste | "Kontakt & Anfrage" ohne Gesicht | unverändert | Leiste mit Gesicht | MP-06 |
| Wording | "Kontaktdaten", "Details anfordern" | Berater-Wording | Berater-Wording | MP-07 |
| CIRCLE-Gesichter Startseite | fehlt | gebaut | Bereich nach der Objekt-Vorschau | MP-14 |
| CIRCLE-Gesichter CIRCLE-Seite `/makler` | fehlt | gebaut | Bereich mit freiem Platz | MP-14 |
| Kurzprofil am Kreis | fehlt | fehlt | geplant | MP-08 |
| Chat am Objekt | fehlt (Formular) | vorhanden | geplant | MP-09 |
| Termin bei der Person | fehlt | Besichtigung mit 3 Vorschlägen vorhanden, noch nicht an die Person gebunden | geplant | MP-10 |
| Persönliche Einschätzung | fehlt | fehlt | geplant | MP-11 |
| Maklerseite: Rückweg, Fakten, Verkauftes | fehlt | fehlt | geplant | MP-12 |
| Mein Makler im Konto | fehlt | Logik im Endkunden-Portal beschrieben | geplant | MP-13 |

## 3. Was ich über die Live-Plattform beobachtet habe

Nur von außen gesehen, ohne Zugang zum Code. Bitte korrigieren, wo es nicht stimmt.

Seiten:

- `/` Startseite, `/makler`, `/bautraeger`, `/story`, `/kontakt`, `/wissen`
- `/listing` Suche mit Karte
- `/property/{slug}` Objektseite, `/project/{slug}` Projektseite
- `/{slug}` Maklerseite: `/marcus-weiss`, `/lara-jonas`, `/alexander-maurer`

Schnittstellen und Bildquellen:

- `GET /api/listing/search?listingType=SALE&bbox=...&page=0&size=50&projects=1` liefert `properties.content[]` und `projects[]`. Jedes Objekt hat `agents: []`, bei allen 28 geprüften Objekten leer.
- Makler-Foto auf der Objektseite: `https://unio-prod.fra1.digitaloceanspaces.com/company/agents/{id}/{datei}.jpg` (bei Lara Jonas vorhanden, bei Marcus Anthofer-Weiss und Wenzel Wächter nicht, dort Initialen).
- Porträt auf der Maklerseite: `/api/agent-brand/public/media/{id}?w=1200`
- Objektbild auf der Maklerseite: `/api/agent-brand/public/{slug}/properties/{id}/image`

Zuordnung, die ich gesehen habe:

| Makler | Maklerseite | Foto auf Objektseite |
|---|---|---|
| Marcus Anthofer-Weiss | `/marcus-weiss` | nein, Initialen "MA" |
| Lara Jonas | `/lara-jonas` | ja |
| Alexander Maurer | `/alexander-maurer` | nicht geprüft |
| Wenzel Wächter | keine | nein, Initialen "WW" |
| Nikita Neznamov, Laurenz Horn | keine gefunden | nicht geprüft |

## 4. Datenvertrag (Vorschlag)

Ein kleines Objekt je Makler, das in Suche, Objektseite und Projektseite gleich aussieht.

```json
{
  "id": 56,
  "slug": "lara-jonas",
  "displayName": "Lara Jonas",
  "firstName": "Lara",
  "role": "Immobilienberaterin",
  "avatarUrl": "https://.../avatar-160.jpg",
  "profileUrl": "/lara-jonas",
  "isPrimary": true,
  "focus": "Altbau und Familienwohnungen",
  "areas": ["Hietzing", "Penzing"],
  "languages": ["Deutsch", "Englisch"],
  "activeListings": 9,
  "responseTimeMinutes": null,
  "phone": "+43 677 63945424",
  "email": "lara.jonas.ext@unio.at"
}
```

Regeln:

- `profileUrl` ist `null`, wenn die Person keine Maklerseite hat. Die Oberfläche zeigt dann keinen Link und keinen Pfeil.
- `avatarUrl` ist `null`, wenn es kein Foto gibt. Die Oberfläche zeigt dann Initialen.
- `responseTimeMinutes` ist `null`, solange nicht gemessen wird. Die Oberfläche zeigt dann einen neutralen Satz.
- In der Suche reichen: `slug`, `displayName`, `avatarUrl`, `profileUrl`, `isPrimary`.
- Genau ein Eintrag je Objekt hat `isPrimary: true`. Die Karte zeigt nur diesen.
- Avatar bitte quadratisch in festen Größen ausliefern (zum Beispiel 80, 160, 320), nicht das Original verkleinern.

## 5. Änderungspakete

### MP-01 Makler-Daten bereitstellen

Status: Entwurf · Aufwand: klein bis mittel · Voraussetzung für alles Weitere

- `agents` in der Such-Antwort füllen (Felder siehe Abschnitt 4).
- Eine Bildquelle je Person für Objektseite, Karte und Maklerseite.
- Ein hauptverantwortlicher Makler je Objekt.

Abnahme:
1. Jedes aktive Objekt in `/api/listing/search` hat mindestens einen Eintrag in `agents`, genau einer ist `isPrimary`.
2. Marcus Anthofer-Weiss erscheint auf seinen Objektseiten mit demselben Foto wie auf `/marcus-weiss`.
3. `profileUrl` ist nur gesetzt, wenn die Seite erreichbar ist.

### MP-02 Makler-Kreis auf der Objektkarte

Status: Entwurf · Aufwand: klein · Referenz gebaut (Version 2)

Wo live: Karten auf der Startseite (Abschnitt "Finde dein nächstes Zuhause") und in `/listing`. Später auch Merkliste und Objekte auf Projektseiten.

Referenz im Repo:
- Komponenten `MaklerKreis` und `MaklerMarke` in `ui_kits/homepage/site-shared.jsx`
- Einbau in `PropCard` (dieselbe Datei) und in `SucheHighlights` in `ui_kits/homepage/homepage.jsx`
- Feed und Liste: `maklerKreis()` und die CSS-Klasse `.mkr` in `ui_kits/explore/index.html`
- Bilder: [Karte in Ruhe und beim Überfahren](bilder/v2-objektkarte-ruhe-und-hover.jpg), [Startseite](bilder/v2-startseite-vorschau.jpg), [Feed](bilder/v2-explore-feed.jpg), [Liste und Objektseite mobil](bilder/v2-liste-und-objektseite-mobil.jpg)

Aufbau:
- Ein Kreis, 40 Pixel, rechts oben im Objektbild, 12 Pixel Abstand zur Bildkante. Heller Rand 2 Pixel, weicher Schatten.
- Kein Text in Ruhe. Am Desktop gleitet beim Überfahren oder bei Tastaturfokus der Name als dunkle Glasfläche links aus dem Kreis heraus, das Foto wächst auf 112 Prozent. Dauer 450 Millisekunden, Kurve `cubic-bezier(0.32, 0.72, 0, 1)`.
- Eigener Link zur Maklerseite, liegt als eigenes Element über der Karte. Kein Link im Link.
- Liste mit kleinem Vorschaubild: Kreis 28 Pixel an der rechten unteren Ecke des Bilds.
- Vertikaler Feed: Kreis 52 Pixel als oberster Punkt der Aktionsleiste, Vorname als Beschriftung.

Zustände:
- Kein Foto: Initialen hell auf dunklem Kreis.
- Keine Maklerseite: Kreis ohne Link, Name beim Überfahren bleibt.
- Kein Makler am Objekt: kein Kreis.

Zu klären: Der Kreis teilt sich die Ecke mit dem Merken-Herz (auf Maklerseiten heute rechts oben). Vorschlag: Herz links oben oder in die Textzeile.

Abnahme:
1. Am Handy öffnet ein Tipp auf den Kreis die Maklerseite, ein Tipp auf den Rest der Karte das Objekt.
2. Mit Tastatur sind beide Links getrennt erreichbar. Beschriftung des Makler-Links: "{Name}, betreut dieses Objekt. Profil ansehen".
3. Die Trefferfläche des Kreises ist mindestens 44 mal 44 Pixel groß.
4. Alle drei Zustände sehen sauber aus.

### MP-20 Objektkarte: Status und Projekt (Version 5)

Status: Entwurf · Referenz gebaut: `/immobilien2` (`PropCard` in `ui_kits/homepage/site-shared.jsx`)

Rückmeldung Daniel: Die Marke "Aktiv" mit Punkt wirkt wie aus einem Baukasten, die Nachfrage-Zahl soll vorerst weg, und ein Projekt muss sofort als Projekt erkennbar sein.

- Kein Status-Abzeichen, kein Punkt, keine Nachfrage-Zahl.
- Einzelobjekt: Datenzeile beginnt mit dem Status als schlichtem Wort ("Verfügbar", "Reserviert"), dann Fläche und Zimmer, rechts der Preis.
- Projekt: dunkle Marke "Projekt" links oben im Bild, Datenzeile nennt die Einheiten ("9 Einheiten", wenn bekannt auch "4 verfügbar"), der Preis beginnt mit "ab".
- Titel einzeilig, keine Symbole in der Datenzeile.
- Die endgültige Form der Karte (mit Rahmen, ohne Rahmen oder als Zeile) wählt Daniel auf der Auswahlseite.

### MP-21 Auswahl für Animationen und Darstellung (Version 5)

Status: wartet auf Auswahl durch Daniel

Bestandsaufnahme aller Animationen und Vorschläge je Element liegen als Auswahlseite vor (Hero, Erscheinen der Abschnitte, Objektkarte, Makler auf der Objektseite, Navigation, festgehaltene Abschnitte, Dauerbewegung). Nach der Auswahl werden die gewählten Wege in Variante 2 gebaut und hier als Pakete beschrieben. Wichtigste Befunde: Überschriften blenden doppelt und bei jedem Scrollen neu ein, die Navigation ändert beim Scrollen ihre Maße, festgehaltene Abschnitte sind bis zu 8,2 Bildschirmhöhen lang, zehn Animationen laufen im System-Bereich endlos.

### MP-22 Hero Startseite und Hero CIRCLE (Version 6)

Status: Entwurf · Referenz gebaut: `/2` und `/makler2` (`ui_kits/homepage/hero-neu.jsx`). Der bisherige Hero bleibt zum Vergleich unter `/2?hero=alt` und `/makler2?hero=alt`.

Vorbilder, am 20.11.2026 selbst im Browser angesehen: rivian.com (Bild als eingerückte Karte mit runden Ecken), apple.com/macbook-air (eine ruhige große Zeile, Inhalte in Karten), aman.com (ein Bild, kaum Text), landonorris.com (der Mensch als Hero, Porträt wird beim Scrollen zur Karte), linear.app (Zeilen steigen aus einer Maske).

Startseite:
- Der Film füllt fast den ganzen Bildschirm (10 Pixel Rand, runde Ecken). Beim Laden öffnet sich der Rahmen einmal von der Mitte, die zwei Zeilen der Überschrift steigen nacheinander aus einer Maske auf, Absatz und Knöpfe blenden ein. Keine Unschärfe.
- Beim Scrollen schrumpft der Rahmen auf eine Karte im Raster (Rand 6vw, Platz für die Navigation oben). Darunter erscheint eine ruhige Zeile "Raum. Technologie. Mensch.". Danach läuft die Seite normal weiter.
- Die Seite wird dabei nicht festgehalten: Der Abschnitt ist 1,7 Bildschirme hoch, der Inhalt klebt, der Scroll bleibt beim Nutzer.
- Text sitzt auf dem Raster: Überschrift über sieben Spalten, Absatz und Knöpfe ab Spalte acht.
- Technik: nur `clip-path`, `transform`, `opacity`. Standbild sofort, Film lädt nach. Bei reduzierter Bewegung: stehendes Bild, ein Bildschirm hoch.

CIRCLE-Seite:
- Links über sieben Spalten Überschrift, Absatz, Knöpfe und drei Aussagen als Zeile mit Haarlinien (kein Glas mehr).
- Rechts über fünf Spalten eine Karte im Format 4:5, in der die Makler nacheinander als Film erscheinen (alle fünf Sekunden, weiche Überblendung), mit Name, Region und Zähler im Bild.

### MP-26 Vorlagen-Seite und Seitenstruktur (Version 9)

Status: Entwurf, Auswahl durch Daniel offen · Referenz: `/vorlagen2` (`ui_kits/homepage/page-vorlagen.jsx`)

Alle zehn Vorschläge aus MP-25 sind als echte Bausteine gebaut, je in zwei bis drei Varianten, mit Kennungen wie 1A oder 3B. Reiter: Startseite, CIRCLE, Bauträger, Story, Struktur.

| Kennung | Baustein | Varianten |
|---|---|---|
| 1 | Objekte in Reihen | A drei Reihen mit Pfeilen · B eine Reihe mit Themen als Reiter · C ein großes und vier kleine Objekte |
| 2 | Zahlenzeile | A drei Spalten mit Linien · B Zeilen auf dem Raster · C ein Satz |
| 3 | Aussage-Abschnitt | A mittig mit Bild darunter · B Satz links, Bild rechts · C Satz im Bild |
| 4 | Objekt im Fokus | A helle, B dunkle, C Akzentfläche |
| 5 | System mit Reitern | A Reiter über dem Bild · B Liste links, Bild rechts |
| 6 | Navigation | A Form bleibt, Grund blendet ein · B volle Breite mit Linie · Alt wie heute |
| 7 | Verwaltung (CIRCLE) | A Tafeln zum Schieben · B Überschrift bleibt stehen, Schritte laufen |
| 8 | Zuerst bei UNIO | A dunkle Reihe · B Liste mit Vormerken |
| 9 und 10 | Schalter Bewegung, Fuß der Seite | A heller Fuß, Schalter als Text · B dunkler Fuß, Schalter als Schieber |
| BH, SH | Hero Bauträger, Hero Story | je A und B in der Form der neuen Startseite |

Hero-Auswahl der Startseite: B, C und G sind entfernt, es bleiben A, D, E, F und der bisherige Hero.

Seitenstruktur (Reiter Struktur): Gemessen bei 1440 Pixel Breite ist die Startseite rund 8.600, die CIRCLE-Seite rund 24.200, Bauträger 12.600 und Story 13.400 Pixel hoch. Vorschlag: Verkaufen als eigene Seite, Plattform als eigene Seite (System, LENS, Smart Exposé und NOVA stehen heute auf drei Seiten), Provisionsrechner und Internationalisierung als Unterseiten von Makler, Menschen als eigene Seite. Navigation: Immobilien, Verkaufen, Makler, Bauträger, Story.

### MP-25 Stand Version 8: Schnitt neu, Hero A bis G, Internationalisierung, Vorschläge

Status: Entwurf, Auswahl durch Daniel offen

**Geschnittener Film, zweite Fassung** (`assets/team/editorial/circle-schnitt.mp4`, 6,9 Sekunden, Schleife): zwölf Menschen statt sechs, je rund eine halbe Sekunde. Vor dem Schnitt wird in jedem Einzelfilm das Gesicht erkannt und auf dieselbe Größe und Lage gebracht (Gesichtsbreite 28 Prozent der Bildbreite, Gesichtsmitte auf 31 Prozent der Höhe), damit die Köpfe deckungsgleich liegen. Geschnitten wird an den Bildern, in denen ein Vorbeigehender das Gesicht verdeckt. Reihenfolge und Zeiten stehen in `CIRCLE_SCHNITT` in `hero-neu.jsx`.

**Hero Startseite, sieben Vorschläge** (`/2?hero=a` bis `g`):
- A: Film wird zur Karte. Knöpfe nebeneinander, keine Zeile mehr unter der Karte.
- D: Schrift zuerst, darunter drei Bilder.
- E: D und A zusammen. Große Schrift, darunter ein Film über zwölf Spalten, der beim Scrollen auf volle Breite wächst.
- F: wie A, mit einer Suchleiste im Film (Wo, Was, Budget, Suchen). Vorbild Compass und Airbnb.
- G: zweite Zeile der Überschrift in einem dunklen Balken, der sich von links öffnet. Vorbild thefold.news.
- B und C wie in MP-24.

**Internationalisierung** (`/makler2#international`, Komponente `InternationalMk` in `hero-neu.jsx`): dunkler Abschnitt nach den CIRCLE-Gesichtern. Links "Wien ist der Anfang." mit Absatz und der Zeile "Heute aktiv: Wien und Umgebung". Rechts ein Formular: zehn Städte zum Antippen (Mehrfachauswahl, nur Vorschläge), ein freies Feld für andere Städte oder Länder, E-Mail, Haken "Ich bin Makler und möchte dort selbst starten", Knopf "Stadt anfragen". Gesendet wird an den bestehenden Lead-Eingang mit dem Typ `international` und den Feldern `orte`, `email`, `makler`. Nach dem Senden steht eine Bestätigung an der Stelle des Formulars. Für die Plattform: Anfragen je Ort zählen, damit sichtbar wird, wo Nachfrage entsteht.

**Weitere Vorschläge für Darstellung und Bedienung**, jeweils mit Vorbild (am 20.11.2026 selbst angesehen):

| Nr. | Bereich | Heute | Vorschlag | Vorbild |
|---|---|---|---|---|
| 1 | Startseite, Objekte | drei Beispielkarten | mehrere Reihen zum seitlichen Schieben mit je einem Thema ("Neu", "Dachgeschoss", "Projekte"), Pfeile rechts oben | airbnb.com |
| 2 | Startseite, Versprechen | drei große Zahlen, die unscharf einzählen | eine ruhige Zahlenzeile mit Haarlinien, sofort lesbar | thefold.news |
| 3 | Aussage-Abschnitte | Text färbt sich Wort für Wort ein, dreimal je Seite, dabei wird die Seite festgehalten | je Seite ein großer, mittig gesetzter Satz mit einem einzigen Bild, ohne Festhalten | takumi.uno |
| 4 | Hervorgehobenes Objekt | gibt es nicht | ein Objekt allein auf einer farbigen Fläche über die volle Breite, mit Makler | lesintranquilles.com |
| 5 | System-Bereich | zehn kleine Animationen laufen gleichzeitig | ein großes Bild der Plattform, darüber drei bis vier Reiter, die den Ausschnitt wechseln | linear.app |
| 6 | Navigation | Leiste schrumpft zur Pille | Form bleibt, nur der Grund blendet ein | apple.com, rivian.com |
| 7 | CIRCLE, Verwaltung | 8,2 Bildschirme festgehalten | drei Tafeln zum seitlichen Schieben | airbnb.com |
| 8 | Vorab-Objekte | gibt es nicht | eigene Reihe "Zuerst bei UNIO" für Objekte vor der Veröffentlichung | compass.com (Exclusives) |
| 9 | Bewegung allgemein | keine Wahl für Besucher | kleiner Schalter "Bewegung an oder aus" im Fuß der Seite | thefold.news |
| 10 | Fuß der Seite | bewegte unscharfe Glut | ruhige Fläche | alle genannten |

### MP-24 Hero-Vorschläge Startseite und geschnittener Film (Version 7)

Status: Entwurf, Auswahl durch Daniel offen · Referenz: `/2?hero=a`, `b`, `c`, `d` (`ui_kits/homepage/hero-neu.jsx`, Umschalter unten links)

- **A, Film wird zur Karte:** wie MP-22.
- **B, Mensch und Raum:** links Überschrift, Absatz und Knöpfe über sieben Spalten, rechts über fünf Spalten ein hoher Film, in dem der Makler selbst durch ein Objekt führt (Rundgang Wenzel Wächter, Jardin Hermes).
- **C, Mensch in der Mitte:** drei gleich breite Felder. Links "Real Estate" rechtsbündig, in der Mitte der geschnittene Makler-Film im Format 4:5, rechts "Finally Simple." mit dem Knopf.
- **D, Schrift zuerst:** sehr große Überschrift über die ganze Breite, darunter Knöpfe und Absatz, darunter drei Bilder auf dem Raster (sechs, drei und drei Spalten): Stadt, Mensch, Objekt.

Geschnittener Film (`assets/team/editorial/circle-schnitt.mp4`, 10,4 Sekunden, Schleife): Aus den sechs Einzelfilmen so geschnitten, dass die Person genau in dem Moment wechselt, in dem vorne jemand vorbeigeht und das Gesicht verdeckt. Reihenfolge und Startzeiten in Sekunden: Marcus Anthofer-Weiss 0, Lara Jonas 1,48, Wenzel Wächter 3,15, Nikita Neznamov 5,10, Philipp Trattner 7,02, Alexander Maurer 8,94. Name und Zähler im Bild folgen diesen Zeiten (`CIRCLE_SCHNITT`). Der Film ist der Hero der CIRCLE-Seite (`/makler2`). Kommt ein Makler dazu, muss der Film neu geschnitten werden. Für die Plattform wäre ein fester Ablauf sinnvoll: je Makler ein Einzelfilm mit markierten Wechselmomenten, der Schnitt entsteht daraus automatisch.

### MP-23 Makler auf der Objektseite: Zeile und Karte (Version 6)

Status: Entwurf, von Daniel ausgewählt (Wege A und B zusammen) · Referenz: `/projekt2` und `/ux/objekt2`

- Zeile unter dem Titel wie MP-04.
- Zusätzlich in der rechten Spalte direkt unter dem Preis eine Karte (`.mkk`): Kreis 56 mit dem natürlichen Foto, Name, "Immobilienberater · UNIO Partner", ein Satz in Ich-Form ("Ich kenne dieses Penthouse, das Haus und die Lage. Fragen zu Preis, Finanzierung und Ablauf beantworte ich persönlich, auch vor einer Besichtigung."), Knopf "Frag {Vorname}", darunter Textlinks Anrufen und E-Mail.
- Der Satz kommt je Objekt vom Makler (Feld in der Objektanlage). Ohne Satz entfällt der Absatz.

### MP-03 Link von der Objektseite zur Maklerseite

Status: Entwurf · Aufwand: sehr klein

Im heutigen Feld "Kontaktdaten" (später in der Makler-Zeile, MP-04) Name und Kreis mit `profileUrl` verlinken und eine Zeile "Profil und weitere Objekte" ergänzen. Nur wenn `profileUrl` gesetzt ist.

Abnahme: Von der Objektseite eines Objekts von Lara Jonas kommt man mit einem Klick auf `/lara-jonas`.

### MP-04 Makler-Zeile unter dem Titel (ersetzt "Kontaktdaten")

Status: Entwurf · Aufwand: klein · Referenz gebaut (Version 2)

Wo live: `/property/{slug}`, direkt unter Titel und Ortszeile, vor Preis und Kennzahlen. Das Feld "Kontaktdaten" in der rechten Spalte entfällt.

Referenz: `.mksig` in `ui_kits/objektseite/index.html`. Bild: [Zeile](bilder/v2-objektseite-zeile.jpg).

Aufbau: eine randlose Zeile ohne Hintergrund. Kreis 36, dann "{Name} berät zu diesem Objekt" (Name fett, Rest gedämpft), dann Textlink "Frage stellen" mit feiner Unterstreichung. Unter 520 Pixel Breite steht nur der Name, der Link rückt an den rechten Rand.

Verhalten: "Frage stellen" öffnet den Kontaktweg am Objekt. Solange es keinen Chat gibt (MP-09): zum Formular springen und das erste Feld fokussieren. Name und Kreis verlinken auf die Maklerseite, wenn es eine gibt (MP-03).

Abnahme:
1. Auf einem Handy mit 390 Pixel Breite ist die Zeile spätestens nach einem Bildschirm sichtbar.
2. Es gibt auf der Objektseite genau eine Stelle mit dem Makler (plus später die Leiste aus MP-06).
3. Die Überschrift "Kontaktdaten" kommt nicht mehr vor. Telefon und E-Mail sind über "Frage stellen" erreichbar.

### MP-05 Makler-Modul

Status: verworfen in Version 2 (zu viele Ebenen). Die Nummer bleibt reserviert.

### MP-06 Begleitende Leiste mobil

Status: Entwurf · Aufwand: klein · Referenz noch nicht gebaut

Die feste Leiste unten zeigt links Kreis 32 und Vorname, rechts den Hauptknopf "{Vorname} fragen". Ersetzt "Kontakt & Anfrage".

### MP-07 Wording

Status: Entwurf · Aufwand: sehr klein · Texte in [PLAN.md](PLAN.md), Abschnitt 7

Vor der Umsetzung offen: Du oder Sie, Rollenbezeichnung, juristische Prüfung.

### MP-14 CIRCLE-Gesichter

Status: Entwurf · Aufwand: klein bis mittel · Referenz gebaut (Fassung 3)

Wo live: Startseite direkt nach der Objekt-Vorschau, und `/makler` nach dem Abschnitt zur eigenen Marke.

Referenz: Komponenten `CircleGesichter` und `CirclePortraet` in `ui_kits/homepage/site-shared.jsx`, Einbau in `homepage.jsx` (`fuer="suchende"`) und `page-makler.jsx` (`fuer="makler"`). Ansehen: `/2` und `/makler2`. Bilder: [Startseite](bilder/v3-circle-startseite.jpg), [CIRCLE-Seite](bilder/v3-circle-seite.jpg), [mobil](bilder/v3-circle-mobil.jpg).

Aufbau:
- Kopfzeile: links die Überschrift, rechts ein Absatz und ein Knopf.
- Darunter ein Streifen aus Porträt-Karten im Format 4:5, vier nebeneinander am Desktop (Abstand 16 Pixel), am Handy 72 Prozent der Bildschirmbreite je Karte, seitlich schiebbar mit Einrasten.
- In der Karte: Standbild vollflächig, darüber ein Film gleicher Größe (unsichtbar, bis er läuft), unten ein dunkler Verlauf. Name einzeilig unten links (18 bis 22 Pixel), darunter die Region in kleinen Versalien. Rechts unten ein kleiner Pfeil, wenn es eine Maklerseite gibt.
- Kein Text außerhalb der Karte.

Verhalten:
- Desktop: Beim Überfahren oder Tastaturfokus blendet der Film ein und läuft in Schleife, das Bild wächst auf 103 Prozent. Beim Verlassen pausiert er.
- Handy: Der Film läuft, sobald mindestens 70 Prozent der Karte sichtbar sind.
- Bei eingestellter reduzierter Bewegung: nur Standbild.
- Film erst laden, wenn er gebraucht wird (`preload="none"`). Stumm, ohne Bedienelemente.

Dateien je Person: Standbild 928 mal 1152 Pixel (JPG, rund 70 KB) und Film 720 Pixel breit, 5 Sekunden, ohne Ton (MP4, rund 0,5 bis 0,7 MB). Vorlagen in `assets/team/editorial/`, Originale im Drive-Ordner von Daniel.

Texte:
- Startseite: "Hinter jedem Objekt steht ein Mensch." · "Die Makler im CIRCLE kennen ihre Objekte und ihr Grätzl. Sie beraten persönlich, von der ersten Frage bis zum Notar." · Knopf "CIRCLE entdecken"
- CIRCLE-Seite: "Der CIRCLE wächst." · "Im CIRCLE steht deine Person vorn: mit eigener Seite, eigenem Auftritt und sichtbar bei jedem deiner Objekte." · Knopf "Platz im CIRCLE anfragen"

Daten: Partner mit Editorial-Material und Freigabe für die öffentliche Darstellung. Reihenfolge nicht nach Leistung. Braucht je Makler die Felder Standbild, Film und "öffentlich zeigen".

Abnahme:
1. Kein Name bricht um oder wird abgeschnitten (längster heutiger Name: Marcus Anthofer-Weiss).
2. Ein neuer Partner mit Material erscheint ohne Code-Änderung, ab fünf Karten lässt sich der Streifen am Desktop seitlich schieben.
3. Partner ohne Maklerseite erscheinen ohne Link und ohne Pfeil.
4. Die Seite lädt keine Filme, solange niemand eine Karte berührt oder sieht.

### MP-15 Suchseite `/listing` beruhigen

Status: Entwurf · Aufwand: mittel · Referenz für die Karte: `/immobilien2`

Befund am Live-Stand (Bildschirmfoto von Daniel, 20.11.2026): Die Seite wirkt unruhig, weil gleichartige Dinge verschieden aussehen und Karten verschieden hoch sind.

| Stelle | Heute | Vorschlag |
|---|---|---|
| Kartenhöhe | Jede Karte ist so hoch wie ihr Text: mal mit Beschreibung, mal ohne, mal ein-, mal zweizeilig. Die Reihen springen | Feste Zeilen: Preis, Titel (eine Zeile), Ort, eine Datenzeile. Beschreibung raus aus der Karte |
| Preis | "€ 1.900.000 - € 1.950.000" und an anderer Stelle "€ 499.000,00" mit Cent | Ohne Cent. Bei Projekten "ab € 349.800" statt Spanne |
| Zusatzangaben | "2 EINHEITEN", "16/27 VERFÜGBAR", "7 EINHEITEN" stehen mal unter, mal neben dem Preis | Immer an derselben Stelle: eine Datenzeile unten, zum Beispiel "27 Einheiten · 16 verfügbar" |
| Marken im Bild | Zwei Marken nebeneinander: "Projekt" (dunkel) und "Zum Verkauf" (hell). "Zum Verkauf" ist durch den Filter Kaufen ohnehin klar | Nur noch eine Marke und nur, wenn sie etwas sagt ("Projekt", "Neu", "Reserviert") |
| Titel | Abgeschnitten mit drei Punkten, teils in Versalien | Eine Zeile, Schreibweise normalisieren, Länge schon bei der Anlage begrenzen |
| Karten-Pins | Drei Sorten: schwarze Preis-Pille, orange Preis-Pille, orange Sammel-Pille. Sie überlappen sich | Eine Form. Ruhe: hell mit dunklem Text. Aktiv oder überfahren: dunkel. Sammel-Pins als Kreis mit Zahl |
| Karte | Kräftig bunte Standardkarte | Entsättigter Kartenstil in den Farben der Seite, damit die Pins führen |
| Filter | Zahlenfelder mit kleinen Pfeiltasten, viele einzelne Kästen untereinander | Felder ohne Pfeiltasten, Preis und Fläche als je eine Zeile "von bis", Filter am Desktop als schmale Leiste über der Liste statt eigener Spalte. Das gibt der Karte und den Objekten mehr Raum |
| Kopf der Liste | "48 Objekte gefunden" und Sortierung in einem eigenen Kasten | Eine ruhige Zeile ohne Rahmen |
| Person | fehlt | Makler-Kreis rechts oben im Bild (MP-02) |

Vorbilder: Airbnb (Karte mit einer Pin-Form, feste Kartenzeilen, nur ein Abzeichen), Compass und Zillow (Filter als Leiste über der Liste).

Abnahme:
1. Alle Karten einer Reihe sind gleich hoch, unabhängig vom Inhalt.
2. Es gibt genau eine Pin-Form mit zwei Zuständen.
3. Kein Preis zeigt Cent-Stellen.

### MP-16 Übersicht aller Partner

Status: Entwurf · Aufwand: klein · Referenz gebaut: `/partner2` (`ui_kits/homepage/page-partner.jsx`)

Eine Seite mit allen Partnern als Raster großer Porträts (4:5, vier Spalten, mobil zwei), Name im Bild, Klick zur Maklerseite. Die letzte Reihe wird immer gefüllt: Der freie Rest ist eine orange Fläche "Dein Platz im CIRCLE." mit Link zur Bewerbung. Erreichbar über "Alle Partner ansehen" im CIRCLE-Bereich. Vorschlag für die Adresse in der Plattform: `/partner` oder `/circle`.

Offen: Alexander Maurer hat kein Porträt aus der Editorial-Serie, sein Bild fällt optisch heraus.

### MP-17 Raster und Seitenrand

Status: Entwurf · Aufwand: klein

Befund: Die Abschnitte der Marketingseiten nutzen gemischt 5, 6, 7 und 8 Prozent Seitenrand. Dadurch springen linke Kanten von Abschnitt zu Abschnitt. In Variante 2 sind alle auf 6 Prozent gezogen (im Build, Funktion `einRand` in `build/build.mjs`). Kopfzeilen neuer Abschnitte nutzen dasselbe Spaltenmaß wie die Komponente `Chapter`.

Prüfwerkzeug: `?raster=1` an jeder Seite oder Taste G blendet ein Raster mit 12 Spalten ein.

Für die Plattform: einen Rand und ein Spaltenmaß als feste Größen festlegen und in allen Abschnitten verwenden.

### MP-18 Story-Grafik

Status: Entwurf · Aufwand: sehr klein · Referenz: `/story2`

In der Grafik "wie UNIO sich zusammensetzt" steht die Beschriftung des untersten Knotens ("Technologie & Automation") jetzt unter dem Knoten. Darüber liefen die Linien durch den Text.

### MP-19 Makler im Bewegtbild

Status: Entwurf · Referenz: `/ux/explore2` (erster Film "Jardin Hermes")

Im Feed erscheinen Filme, in denen der Makler selbst durch das Objekt führt (Material von Daniel: Rundgang mit Wenzel Wächter). Derselbe Film gehört später auf die Objektseite direkt zur Makler-Zeile.

### MP-08 bis MP-13

Status: Entwurf, noch ohne Referenz. Beschreibung in [PLAN.md](PLAN.md), Abschnitt 6 (M3, M7 bis M11) und Abschnitt 9 (Schritte 3 bis 7). Werden hier ausgearbeitet, sobald die vorherigen Schritte abgestimmt sind.

## 6. Befunde auf der Live-Seite (nebenbei aufgefallen)

Nicht Teil der Makler-Präsenz, aber beim Prüfen gesehen:

1. Objektseite: "Verfügbar ab undefined.undefined.2026-05-11" (Preisblock und Ausstattung). Gesehen auf `/property/traum-penthouse-in-hernals`.
2. Preise mit Cent-Stellen: "€ 1.200.000,00". Ruhiger wäre "€ 1.200.000".
3. Titel in Versalien werden unverändert übernommen ("AUS ZWEI WOHNUNGEN WIRD EIN ZUHAUSE ..."). Auf der Serifen-Maklerseite wirkt das besonders laut.
4. Telefonnummern uneinheitlich: "+43 664 4160559" und "+4367763945424".
5. Die Karte lädt mit Region US (`gl=US` in den Kartenlinks). Vermutlich Standardwert.
6. Maklerseite Marcus: Titel "Villengrundstück ... mit Zwei Häusern4" (Tippfehler im Objekttitel), Claim "Verläßlich auf den Weg" (Rechtschreibung), Name im Kopf überlagert das Porträt bei 1440 Pixel Breite stark.
7. Verkaufte Objekte auf Maklerseiten haben keinen Link. Als Leistungsnachweis wären sie mit einer einfachen Ansicht wertvoller.
8. Objektseite: Fußzeile "© 2026 Unio" in gemischter Schreibweise, sonst "UNIO".

## 7. Wo man die Entwürfe ansieht: Variante 2

Die Entwürfe liegen als Variante 2 auf der Vorschau-Seite des Repos, `unio-verse.vercel.app`. Jede Seite gibt es zweimal: die bisherige Fassung unter der gewohnten Adresse, die neue unter derselben Adresse mit einer 2 am Ende. Innerhalb von Variante 2 führen alle Links wieder auf Variante 2, man kann also komplett durchklicken.

| Fläche | Variante 1 (unverändert) | Variante 2 (neu) |
|---|---|---|
| Startseite mit Makler-Kreis und CIRCLE-Gesichtern | `/` | `/2` |
| CIRCLE-Seite mit Gesichtern | `/makler` | `/makler2` |
| Objektsuche mit Makler-Kreis auf den Karten | `/immobilien` (leitet in die App) | `/immobilien2` |
| Objektseite mit Makler-Zeile | `/projekt` | `/projekt2` |
| Explore-Feed (Passwort wie bisher) | `/ux/explore` | `/ux/explore2` |
| Objektseite mit Chat (Passwort wie bisher) | `/ux/objekt` | `/ux/objekt2` |
| Übersicht aller Partner | gibt es nicht | `/partner2` |
| Vorlagen zur Auswahl | gibt es nicht | `/vorlagen2` |
| Übrige Seiten | `/bautraeger`, `/story`, `/kontakt` | `/bautraeger2`, `/story2`, `/kontakt2` (inhaltlich gleich) |

Technik: Der Build (`build/build.mjs`) erzeugt die 2er-Seiten aus denselben Quellen, mit eigenem Skript-Satz unter `/assets/js2/` und dem Schalter `window.UNIO_V2`. Eigene Quelldateien für Variante 2 gibt es nur dort, wo ganze Seiten abweichen: `ui_kits/homepage/projekt2.html`, `ui_kits/explore2/`, `ui_kits/objektseite2/`. Die 2er-Seiten sind von Suchmaschinen ausgeschlossen und stehen nicht in der Sitemap.

Diese Vorschau-Seite ist nicht www.unio.at. Auf der Plattform ändert sich dadurch nichts. Empfehlung für die Plattform: jedes Paket hinter einem eigenen Schalter ausliefern und erst auf einer Testumgebung zeigen.

## 8. Offene Fragen an Marcin

1. Warum ist `agents` in der Suche leer: nicht befüllt oder für nicht angemeldete Besucher ausgeblendet?
2. Gibt es schon eine Verbindung zwischen dem Makler-Datensatz der Objektseite (`company/agents/{id}`) und der Maklerseite (`agent-brand`)?
3. Kann ein Objekt mehrere Makler haben, und gibt es einen hauptverantwortlichen?
4. Gibt es eine Testumgebung mit eigener Adresse, auf der Pakete vor dem Livegang gezeigt werden können?
5. Werden Anfragen heute schon mit Zeitstempel für die erste Antwort gespeichert (Grundlage für die Antwortzeit)?
6. Die Marketingseiten laufen jetzt in der Plattform. Ist dieses Repo weiter die Quelle für deren Gestaltung, und wie sollen Änderungen dort übergeben werden?

## 9. Rückfluss: Live in das Repo

| Live vorhanden | Im Repo nachgezogen? |
|---|---|
| Echte Makler mit Maklerseite | Ja: Register `MAKLER_DB` mit Marcus Anthofer-Weiss, Lara Jonas, Alexander Maurer, Wenzel Wächter. Fotos als einheitliche Ausschnitte in `assets/team/makler/` |
| Kreis mit Foto auf der Objektseite | Ja, als eine Zeile unter dem Titel (statt Platzhalter "[Makler-Name]") |
| Objektseite des Penthouse Hernals wird von Wenzel Wächter betreut | Ja, im Prototyp stand vorher ein erfundener Name |
| Startseite zeigt drei echte Objekte mit Slug-Adressen | Offen: Das Repo zeigt drei Beispielobjekte mit alten Nummern-Adressen auf app.unio.at |
| Text der Vorschau "Entdecke weitere Immobilien in unserer Suche", Knopf "Alle Immobilien" | Offen |
| Maklerseiten mit echten Objektdaten, Filter, Blättern | Offen: Das Repo hat nur die Vorlagen mit Demo-Daten |
| Umgebungs-Kennzahlen auf der Objektseite | Im Repo als "Lage und Infrastruktur" vorhanden, andere Darstellung |

## 10. Protokoll

| Datum | Version | Was |
|---|---|---|
| 20.11.2026 | 1 | Erste Fassung. Live-Stand geprüft. Im Repo gebaut: Makler-Register, Makler-Kreis, Makler-Zeile auf Objektkarte, Startseite, Explore-Feed und Liste. Makler-Signatur und Makler-Modul auf der Objektseite. Erfundene Maklernamen entfernt, Klickziel korrigiert (vorher Anwerbeseite `/makler`). Schalter `?makler=1` für öffentliche Seiten. Pakete MP-01 bis MP-07 beschrieben. |
| 20.11.2026 | 2 | Reduzierte Fassung nach Rückmeldung Daniel: ein Makler-Element pro Fläche. Karte: nur Kreis im Bild (MP-02 neu gefasst). Objektseite: eine randlose Zeile, Modul gestrichen (MP-04 neu, MP-05 verworfen). Explore: Kreis in der Aktionsleiste und am Vorschaubild. Neu: CIRCLE-Gesichter auf Startseite und CIRCLE-Seite (MP-14). Bilder ersetzt (`bilder/v2-*`). |
| 20.11.2026 | 3 | CIRCLE-Gesichter neu als Porträt-Streifen mit Name im Bild und Film beim Überfahren (MP-14 neu gefasst), Editorial-Material aus dem Drive eingebunden, Makler-Kreise aus derselben Serie. Variante 2 unter eigenen Adressen (`/2`, `/makler2`, `/immobilien2`, `/projekt2`, `/ux/explore2`, `/ux/objekt2`), Variante 1 unverändert. Der Schalter `?makler=1` gilt nur noch lokal. |
| 20.11.2026 | 4 | Makler-Kreise neutraler (weniger Orange). Neu: Partner-Übersicht `/partner2` (MP-16), einheitlicher Seitenrand und Raster-Werkzeug in Variante 2 (MP-17), Story-Grafik korrigiert (MP-18), Makler-Film im Feed (MP-19), Vorschläge für die Suchseite (MP-15). Kopfzeilen der neuen Abschnitte auf das Spaltenmaß von `Chapter` gelegt. |
| 20.11.2026 | 5 | Objektkarte ohne "Aktiv" und ohne Nachfrage, Projekte klar markiert (MP-20). Übersicht `/partner2` zeigt alle elf Menschen, Porträt Alexander Maurer per Bild-KI in den Editorial-Stil übertragen (von Daniel freigegeben). Innenkanten in Variante 2 auf dem 12-Spalten-Raster (Helfer `spalten(n)`). Versionskennung an v2-Skripten und Makler-Bildern: Ohne sie zeigte der Browser nach Änderungen den alten Stand, weil `/assets` ein Jahr gehalten wird. Gedankenstriche in den Texten von Variante 2 ersetzt. Auswahlseite für Animationen erstellt (MP-21). |
| 20.11.2026 | 6 | Kreise wieder mit natürlichen Originalfotos. Philipp Trattner ergänzt (verlinkt auf trattner-soehne.at), Film für Alexander Maurer erzeugt. Neue Heroes für Startseite und CIRCLE-Seite (MP-22). Objektseite mit Zeile und Karte (MP-23). Raster: zweispaltige Aufteilungen und Kartenreihen in allen Abschnitten von Variante 2 liegen auf ganzen Spalten (Funktion `aufRaster` im Build). Noch neben dem Raster: Hero Bauträger, Hero Story, die festgehaltenen Abschnitte Verwaltung und Bewegung auf der CIRCLE-Seite, die Listen Vorteile und Bewerbung. |
| 20.11.2026 | 7 | Hero der CIRCLE-Seite mit geschnittenem Film: Die Person wechselt, wenn vorne jemand vorbeigeht. Vier Hero-Vorschläge für die Startseite mit Umschalter (MP-24). Founder tragen im CIRCLE-Bereich die Position von der Story-Seite ("Founder · Vertrieb" usw.). Raster: Hero-Karten von Bauträger und Story auf dem Seitenrand, Liste Vorteile exakt in Spalte 2, Einzug der festgehaltenen Tafeln auf Spalte 2. |
| 20.11.2026 | 8 | Film neu geschnitten: zwölf Menschen, schneller, Gesichter deckungsgleich. Hero A angepasst (Knöpfe nebeneinander, Zeile darunter entfernt), neue Vorschläge E, F, G. Abschnitt Internationalisierung auf der CIRCLE-Seite. Zehn weitere Vorschläge mit Vorbildern (MP-25). |
| 20.11.2026 | 9 | Vorlagen-Seite `/vorlagen2` mit zehn Bausteinen in je zwei bis drei Varianten, dazu Vorlagen für CIRCLE, Bauträger und Story und ein Vorschlag zur Seitenstruktur (MP-26). Hero-Vorschläge B, C und G aus der Auswahl genommen. |
| 20.11.2026 | 9a | Mit dem bisherigen Hero (`/2?hero=alt`) stehen die CIRCLE-Gesichter weiter unten: nach dem System-Bereich, direkt vor den Zielgruppen. |
| 20.11.2026 | 9b | CIRCLE und Bauträger in Variante 2: Der Hero bleibt stehen, der zweite Abschnitt schiebt sich mit runden Ecken und Schatten darüber (wie auf der Startseite mit dem bisherigen Hero). Auf der CIRCLE-Seite sind die senkrechten Linien im zweiten Abschnitt entfernt. Am Handy und bei reduzierter Bewegung bleibt der Hero nicht stehen. |
| 20.11.2026 | 9c | Hero-Karten von Bauträger und Story sind wieder so breit wie die Navigation (40 Pixel Rand). Die Umstellung auf den Rasterrand hatte sie schmaler als die Navigation gemacht. Beides wandert gemeinsam aufs Raster, sobald die neue Navigation (Vorlage 6A) gewählt ist. |
