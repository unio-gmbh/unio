# Makler-Präsenz: Übergabe an die Plattform

Für: Marcin · Von: Daniel (Ad Boutique) · Laufendes Dokument

| | |
|---|---|
| Stand dieses Dokuments | 20.11.2026, Version 1 |
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
| Objektkarte Startseite | ohne Person | Makler-Zeile am Kartenfuß | Makler-Zeile | MP-02 |
| Objektkarte Suche `/listing` | ohne Person | Makler-Zeile am Kartenfuß | Makler-Zeile | MP-02 |
| Link Objektseite zur Maklerseite | fehlt | auf Karten gebaut, auf der Objektseite noch offen (Wenzel Wächter hat keine Maklerseite) | vorhanden | MP-03 |
| Person auf der Objektseite, oben | fehlt | Makler-Signatur unter dem Titel | Signatur | MP-04 |
| Person auf der Objektseite, Spalte | Feld "Kontaktdaten", unter der 3D-Tour | Makler-Modul direkt unter dem Preis | Modul | MP-05 |
| Objektseite mobil | Person ganz unten, Leiste "Kontakt & Anfrage" | Signatur im ersten Bildschirm | Signatur plus Leiste mit Gesicht | MP-04, MP-06 |
| Wording | "Kontaktdaten", "Details anfordern" | Berater-Wording | Berater-Wording | MP-07 |
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

### MP-02 Makler-Zeile auf der Objektkarte

Status: Entwurf · Aufwand: klein · Referenz gebaut

Wo live: Karten auf der Startseite (Abschnitt "Finde dein nächstes Zuhause") und in `/listing`. Später auch Merkliste und Objekte auf Projektseiten.

Referenz im Repo:
- Komponente `MaklerKreis` und `MaklerZeile` in `ui_kits/homepage/site-shared.jsx`
- Einbau in `PropCard` (dieselbe Datei) und in `SucheHighlights` in `ui_kits/homepage/homepage.jsx`
- Dunkle Variante auf Foto und kleine Variante in Listen: `maklerZeile()` und die CSS-Klasse `.mkz` in `ui_kits/explore/index.html`
- Bilder: [Karte](bilder/repo-objektkarte.jpg), [Startseite](bilder/repo-startseite-vorschau.jpg), [Explore und Liste](bilder/repo-explore-liste-objekt-mobil.jpg)

Aufbau:
- Sitzt am Fuß der Karte, unter dem Text, getrennt durch eine Haarlinie. Nicht im Bild.
- Links Kreis 34 Pixel, daneben Name (14,5 Pixel, mittelfett), darunter klein in Versalien "Beratung und Besichtigung", rechts ein Pfeil.
- Mindesthöhe 44 Pixel.
- Eigener Link zur Maklerseite, getrennt vom Link zum Objekt. Keine verschachtelten Links: Die Karte ist ein Behälter mit zwei Links nebeneinander.
- Bewegung beim Überfahren und bei Tastaturfokus: Foto wächst auf 112 Prozent, Pfeil rückt 3 Pixel nach rechts und wird Akzentfarbe. Dauer 450 Millisekunden, Kurve `cubic-bezier(0.32, 0.72, 0, 1)`.

Zustände:
- Kein Foto: Initialen (zwei Buchstaben) hell auf dunklem Kreis.
- Keine Maklerseite: Zeile ohne Link und ohne Pfeil.
- Kein Makler am Objekt: Zeile entfällt ganz, die Karte endet wie heute.
- Langer Name: einzeilig, wird mit Auslassungspunkten gekürzt.

Abnahme:
1. Die Zeile ist auf dem Handy ohne Überfahren sichtbar.
2. Klick auf die Zeile öffnet die Maklerseite, Klick auf den Rest der Karte das Objekt.
3. Mit Tastatur sind beide Links getrennt erreichbar. Der Makler-Link hat die Beschriftung "{Name}, Profil ansehen".
4. Alle vier Zustände sehen sauber aus.
5. Die Karte springt beim Laden des Fotos nicht in der Höhe.

### MP-03 Link von der Objektseite zur Maklerseite

Status: Entwurf · Aufwand: sehr klein

Im heutigen Feld "Kontaktdaten" (später im Makler-Modul) Name und Kreis mit `profileUrl` verlinken und eine Zeile "Profil und weitere Objekte" ergänzen. Nur wenn `profileUrl` gesetzt ist.

Abnahme: Von der Objektseite eines Objekts von Lara Jonas kommt man mit einem Klick auf `/lara-jonas`.

### MP-04 Makler-Signatur unter dem Titel

Status: Entwurf · Aufwand: klein · Referenz gebaut

Wo live: `/property/{slug}`, direkt unter Titel und Ortszeile, vor dem Preisblock.

Referenz: `.mksig` in `ui_kits/objektseite/index.html`. Bild: [Signatur](bilder/repo-objektseite-signatur.jpg).

Aufbau: abgerundete Fläche in Pillenform. Kreis 40, Name, darunter klein "Berät zu diesem Objekt · antwortet meist in unter 2 Stunden", rechts Knopf "Frage stellen". Unter 520 Pixel Breite füllt sie die Zeile, der zweite Teil der kleinen Zeile entfällt.

Verhalten: "Frage stellen" öffnet den Kontaktweg am Objekt. Solange es keinen Chat gibt (MP-09): zum Formular springen und das Feld fokussieren.

Abnahme:
1. Auf einem Handy mit 390 Pixel Breite ist die Signatur ohne Scrollen sichtbar oder nach höchstens einem Bildschirm.
2. Ohne gemessene Antwortzeit steht nur "Berät zu diesem Objekt".

### MP-05 Makler-Modul ersetzt "Kontaktdaten"

Status: Entwurf · Aufwand: mittel · Referenz gebaut (Grundform)

Wo live: rechte Spalte der Objektseite. Neue Reihenfolge: Preis, Makler-Modul, 3D-Tour, Formular.

Referenz: `.mkmod` in `ui_kits/objektseite/index.html`. Bild: [Modul](bilder/repo-objektseite-modul.jpg).

Aufbau von oben nach unten:
1. Kreis 56, Name (17 Pixel, fett), darunter klein Rolle und "UNIO Partner"
2. Ein Satz zur Zuständigkeit (Text siehe MP-07)
3. Zwei Faktenzeilen mit Haarlinie: "Antwortet meist / in unter 2 Stunden", "Besichtigung / vor Ort oder per Video"
4. Hauptknopf "Frage an {Vorname} stellen"
5. Zwei leise Knöpfe nebeneinander: "Anrufen", "E-Mail"
6. Wenn `profileUrl` gesetzt: Zeile "Profil und weitere Objekte"

Abnahme:
1. Die Überschrift "Kontaktdaten" kommt nicht mehr vor.
2. Das Modul steht über der 3D-Tour.
3. Faktenzeile zur Antwortzeit entfällt, wenn nicht gemessen.

### MP-06 Begleitende Leiste mobil

Status: Entwurf · Aufwand: klein · Referenz noch nicht gebaut

Die feste Leiste unten zeigt links Kreis 32 und Vorname, rechts den Hauptknopf "{Vorname} fragen". Ersetzt "Kontakt & Anfrage".

### MP-07 Wording

Status: Entwurf · Aufwand: sehr klein · Texte in [PLAN.md](PLAN.md), Abschnitt 7

Vor der Umsetzung offen: Du oder Sie, Rollenbezeichnung, juristische Prüfung.

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
- Auf den öffentlichen Seiten des Repos (Startseite, `/immobilien`) ist die Makler-Zeile abgeschaltet. Sie erscheint nur, wenn `?makler=1` an der Adresse hängt. Der Schalter heißt `MAKLER_SICHTBAR` in `ui_kits/homepage/site-shared.jsx`.
- Explore-Feed und Objektseite liegen wie bisher im passwortgeschützten Bereich `/ux`.
- Empfehlung für die Plattform: jedes Paket hinter einem eigenen Schalter ausliefern und erst auf einer Testumgebung zeigen.

So siehst du die Vorschau (nach lokalem Start oder auf einer Vorschau-Adresse des Branches):

| Fläche | Adresse |
|---|---|
| Startseite mit Makler-Zeile | `/?makler=1`, dann zu "Finde dein nächstes Zuhause" |
| Explore-Feed und Liste | `/ux/explore` |
| Objektseite mit Signatur und Modul | `/ux/objekt` |
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
| Kreis mit Foto auf der Objektseite | Ja, als Signatur und Modul (statt Platzhalter "[Makler-Name]") |
| Objektseite des Penthouse Hernals wird von Wenzel Wächter betreut | Ja, im Prototyp stand vorher ein erfundener Name |
| Startseite zeigt drei echte Objekte mit Slug-Adressen | Offen: Das Repo zeigt drei Beispielobjekte mit alten Nummern-Adressen auf app.unio.at |
| Text der Vorschau "Entdecke weitere Immobilien in unserer Suche", Knopf "Alle Immobilien" | Offen |
| Maklerseiten mit echten Objektdaten, Filter, Blättern | Offen: Das Repo hat nur die Vorlagen mit Demo-Daten |
| Umgebungs-Kennzahlen auf der Objektseite | Im Repo als "Lage und Infrastruktur" vorhanden, andere Darstellung |

## 10. Protokoll

| Datum | Version | Was |
|---|---|---|
| 20.11.2026 | 1 | Erste Fassung. Live-Stand geprüft. Im Repo gebaut: Makler-Register, Makler-Kreis, Makler-Zeile auf Objektkarte, Startseite, Explore-Feed und Liste. Makler-Signatur und Makler-Modul auf der Objektseite. Erfundene Maklernamen entfernt, Klickziel korrigiert (vorher Anwerbeseite `/makler`). Schalter `?makler=1` für öffentliche Seiten. Pakete MP-01 bis MP-07 beschrieben. |
