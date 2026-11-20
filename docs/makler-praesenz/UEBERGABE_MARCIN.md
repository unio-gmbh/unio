# Makler-Präsenz: Übergabe an die Plattform

Für: Marcin · Von: Daniel (Ad Boutique) · Laufendes Dokument

| | |
|---|---|
| Stand dieses Dokuments | 20.11.2026, Version 2 (reduzierte Fassung: ein Makler-Element pro Fläche) |
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

Status: Entwurf · Aufwand: klein · Referenz gebaut

Wo live: Startseite direkt nach der Objekt-Vorschau, und `/makler` nach dem Abschnitt zur eigenen Marke.

Referenz: Komponente `CircleGesichter` in `ui_kits/homepage/site-shared.jsx`, Einbau in `homepage.jsx` (`fuer="suchende"`) und `page-makler.jsx` (`fuer="makler"`). Bilder: [Startseite](bilder/v2-circle-startseite.jpg), [CIRCLE-Seite](bilder/v2-circle-seite.jpg), [mobil](bilder/v2-circle-mobil.jpg).

Aufbau: links Überschrift, ein Absatz, ein Knopf. Rechts eine Reihe von Kreisen (96 Pixel, mobil 84), darunter Name und Region. Jeder Kreis verlinkt auf die Maklerseite. Mobil seitlich schiebbar mit Einrasten. Auf der CIRCLE-Seite endet die Reihe mit einem gestrichelten leeren Kreis "Dein Platz", der zur Bewerbung führt.

Texte:
- Startseite: "Hinter jedem Objekt steht ein Mensch." · "Die Makler im CIRCLE kennen ihre Objekte und ihr Grätzl. Sie beraten persönlich, von der ersten Frage bis zum Notar." · Knopf "CIRCLE entdecken"
- CIRCLE-Seite: "Der CIRCLE wächst." · "Im CIRCLE steht deine Person vorn: mit eigener Seite, eigenem Auftritt und sichtbar bei jedem deiner Objekte." · Knopf "Platz im CIRCLE anfragen"

Daten: alle Partner mit Foto und Freigabe für die öffentliche Darstellung, Reihenfolge nicht nach Leistung (Vorschlag: nach Eintritt oder zufällig je Aufruf). Braucht ein Feld "öffentlich zeigen" je Makler.

Abnahme:
1. Ein neuer Partner mit Foto erscheint ohne Code-Änderung.
2. Partner ohne Maklerseite erscheinen ohne Link.
3. Ab etwa neun Partnern bricht die Reihe am Desktop sauber in eine zweite Zeile um.

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

## 7. Schutz vor versehentlichem Livegang

- Alle Änderungen liegen nur auf dem Branch `claude/vibrant-edison-th7jx0`. Kein Merge nach `main`, kein Pull Request.
- Auf den öffentlichen Seiten des Repos (Startseite, `/makler`, `/immobilien`) sind Makler-Kreis und CIRCLE-Gesichter abgeschaltet. Sie erscheinen nur, wenn `?makler=1` an der Adresse hängt. Der Schalter heißt `MAKLER_SICHTBAR` in `ui_kits/homepage/site-shared.jsx`.
- Explore-Feed und Objektseite liegen wie bisher im passwortgeschützten Bereich `/ux`.
- Empfehlung für die Plattform: jedes Paket hinter einem eigenen Schalter ausliefern und erst auf einer Testumgebung zeigen.

So siehst du die Vorschau (nach lokalem Start oder auf einer Vorschau-Adresse des Branches):

| Fläche | Adresse |
|---|---|
| Startseite mit Makler-Kreis und CIRCLE-Gesichtern | `/?makler=1`, dann zu "Finde dein nächstes Zuhause" |
| CIRCLE-Seite mit Gesichtern | `/makler?makler=1` |
| Explore-Feed und Liste | `/ux/explore` |
| Objektseite mit Makler-Zeile | `/ux/objekt` |
| Quelltext | `ui_kits/homepage/`, `ui_kits/explore/`, `ui_kits/objektseite/` |

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
