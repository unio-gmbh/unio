# Makler-Präsenz: Plan

Stand: 20.11.2026 · Version 1 · Status: Entwurf zur Abstimmung, nichts davon ist live

Ziel: Makler und ihre Maklerseiten stärker zeigen und überall die Verbindung zwischen Person und Objekt herstellen. Maßstab ist High-End-UI. Leitfrage bei jeder Entscheidung: Wie würde Apple das lösen?

Begleitdokument für die Umsetzung in der Plattform: [UEBERGABE_MARCIN.md](UEBERGABE_MARCIN.md).

## 1. Kurzfassung

1. Heute sieht ein Interessent auf www.unio.at den Makler genau einmal: als kleines Feld "Kontaktdaten" auf der Objektseite. Auf dem Handy liegt dieses Feld rund 7.000 Pixel unter dem Seitenanfang, hinter Beschreibung, Ausstattung, Grundriss, Energieausweis und Karte.
2. Suche, Startseiten-Vorschau und Projektseiten zeigen gar keinen Makler. Die Objektseite verlinkt nicht auf die Maklerseite, obwohl es drei Maklerseiten live gibt.
3. Die Maklerseiten selbst sind stark, aber Sackgassen: Man kommt von dort zum Objekt, aber vom Objekt nie zurück zur Person.
4. Zielbild: eine Person, die den Interessenten vom ersten Blick auf die Karte bis zum Notartermin begleitet. Ein Kreis, ein Name, eine Aufgabe, an jedem Berührungspunkt dieselbe Komponente.
5. Der Weg dorthin sind sieben Schritte (Abschnitt 9). Schritt 1 ist im Repo als Vorschau gebaut. Jeder weitere Schritt hat ein eigenes Ergebnis und eine eigene Freigabe.

## 2. Ausgangslage

### 2.1 Was live ist (www.unio.at, geprüft am 20.11.2026)

www.unio.at ist inzwischen die Plattform selbst (Next.js). Marketingseiten, Suche, Objektseiten und Maklerseiten laufen auf einer Domain. app.unio.at liefert dieselbe Anwendung.

| Ort | Makler sichtbar? | Befund |
|---|---|---|
| Startseite, Vorschau "Finde dein nächstes Zuhause" | Nein | Drei echte Objekte, Karte ohne Person |
| Suche `/listing` | Nein | Karten ohne Person. Die Such-Schnittstelle liefert je Objekt bereits ein Feld `agents`, es ist aber bei allen Objekten leer |
| Objektseite `/property/{slug}` Desktop | Ja, klein | Feld "Kontaktdaten" in der rechten Spalte, unter dem 3D-Tour-Feld: Kreis (Foto oder Initialen), Name, E-Mail, Telefon. Kein Link zur Maklerseite, keine Rolle, kein Satz |
| Objektseite mobil | Ja, ganz unten | Reihenfolge: Bilder, Titel, Preis, Text, Ausstattung, Grundriss, Energie, Umgebung, Karte, dann erst die Person. Der feste Knopf unten heißt "Kontakt & Anfrage" ohne Gesicht |
| Projektseite `/project/{slug}` | Nein | Nicht im Detail geprüft, kein Makler-Element gefunden |
| Maklerseiten `/marcus-weiss`, `/lara-jonas`, `/alexander-maurer` | Ja, stark | Eigene Marke (Schrift, Farbe), Porträt, Text, echte Objekte mit Filter, Merkliste und Blättern, Kontakt. "Exposé ansehen" führt auf die Objektseite |
| Rückweg Objekt zu Makler | Nein | Auf der Objektseite gibt es keinen Link zur Maklerseite |

Bilder dazu: [Suche](bilder/live-suche.jpg), [Objektseite Desktop](bilder/live-objektseite-desktop.jpg), [Objektseite mobil](bilder/live-objektseite-mobil.jpg), [Maklerseite](bilder/live-maklerseite.jpg).

Drei Details, die die Wirkung schwächen:

- Marcus Anthofer-Weiss hat auf seiner Maklerseite ein Porträt, auf seinen Objektseiten aber nur die Initialen "MA". Lara Jonas hat an beiden Orten ihr Foto. Die zwei Bildquellen sind nicht verbunden.
- Wenzel Wächter betreut Objekte, hat aber keine Maklerseite.
- Das Wort über der Person ist "Kontaktdaten". Das beschreibt ein Datenfeld, keinen Menschen.

### 2.2 Was im Repo ist und live fehlt

| Im Repo | Wo | Live |
|---|---|---|
| Objektkarte mit Makler-Kreis | `ui_kits/homepage/site-shared.jsx` (PropCard) | fehlt |
| Chat mit dem Makler direkt am Objekt, mit Antwortzeit im Kopf | `ui_kits/objektseite/index.html` | fehlt (live: Formular "Alle Details anfordern") |
| Besichtigung buchen mit drei Terminvorschlägen | `ui_kits/objektseite/index.html` | fehlt |
| Angebot legen | `ui_kits/objektseite/index.html` | fehlt für nicht angemeldete Besucher |
| Explore-Feed (vertikal, lernt aus Merkliste) | `ui_kits/explore/index.html` | fehlt |
| Sechs Gestaltungs-Varianten für Maklerseiten | `showcase/showcase1..6.html` | Variante 1 und eine Serifen-Variante sind live im Einsatz |
| Makler-Werkbank UNIO HUMAN (Marke, Website, Inhalte) | `ui_kits/werkbank/` | Vorschau |

Bis heute hatte der Makler-Kreis im Repo zwei Fehler: Er zeigte erfundene Namen auf Fotos der Gründer, und der Klick führte auf die Makler-Anwerbeseite `/makler` statt zur Person. Beides ist in dieser Runde behoben (Abschnitt 9, Schritt 1).

### 2.3 Was live ist und im Repo fehlte

- Echte Maklerseiten mit echten Objekten unter `/{vorname-nachname}`. Das Repo kannte nur die Vorlagen mit Demo-Daten.
- Kreis mit Foto bei den Kontaktdaten der Objektseite. Im Repo stand dort ein Platzhalter "[Makler-Name]".
- Adressen mit sprechendem Namen (`/property/traum-penthouse-in-hernals`) statt Nummern.

Nachgezogen wurden die echten Makler (Name, Foto, Adresse der Maklerseite) und die Person auf der Objektseite. Offen bleibt, die Repo-Startseite auf die drei echten Live-Objekte umzustellen (siehe Übergabedokument, Abschnitt Rückfluss).

## 3. Vorbilder: was sie tun und was wir übernehmen

Geprüft wurden Immobilien-Plattformen (Compass, Zillow, Redfin, Homes.com, Sotheby's, The Agency, SERHANT., Engel & Völkers, Knight Frank, ImmoScout24, willhaben) und andere Branchen, die Person und Produkt verbinden (Airbnb, Apple, Zocdoc und Doctolib, Intercom, GitHub, Linear, App Store, 1stDibs, Uber, Private Banking).

Hinweis zur Belastbarkeit: Die Beschreibungen der Oberflächen stammen überwiegend aus gesichertem Wissen, nicht aus frischen Bildschirmfotos. Zahlen sind mit Quelle belegt (Abschnitt 12). Vor Feinentscheidungen auf Pixel-Ebene sollten wir die zwei bis drei wichtigsten Vorbilder gemeinsam live ansehen.

| Nr. | Muster | Vorbild | Was genau | Übertrag auf UNIO |
|---|---|---|---|---|
| 1 | Ein Objekt, eine Person, eine Anfrage | Homes.com, Compass | Auf der Objektseite steht nur der betreuende Makler, jede Anfrage geht an ihn | Grundregel für alles Weitere. Zillow wird für das Gegenteil seit 2025 verklagt |
| 2 | Makler-Zeile auf der Karte | Airbnb, Linear | Kleiner Kreis plus Name, das Foto des Objekts bleibt der Held | Schritt 1, gebaut |
| 3 | Kurzprofil beim Antippen | GitHub, Slack, LinkedIn | Antippen des Kreises öffnet eine kleine Karte: Porträt, Schwerpunkt, Zahl der Objekte, zwei Aktionen | Schritt 3 |
| 4 | "Lernen Sie ... kennen"-Karte | Airbnb ("Meet your host") | Abgesetzte Karte: großes Porträt, drei Fakten, Antwortzeit, eine Hauptaktion | Schritt 2, Grundform gebaut |
| 5 | Antwortzeit als Versprechen | Airbnb, Intercom | "Antwortet meist innerhalb von ..." aus echten Messwerten, sonst neutraler Satz | Schritt 2, braucht Messung |
| 6 | Termin statt Formular | Zocdoc, Doctolib, Redfin, Apple | Drei nächste Termine als antippbare Felder direkt bei der Person | Schritt 4 |
| 7 | Person begleitet beim Scrollen | Airbnb, Uber | Mobil unten fest: Kreis, Name, ein Knopf | Schritt 2 |
| 8 | Makler als Autor | App Store "Heute", Spotify | Kurze persönliche Einschätzung zum Objekt, mit Foto und Namen | Schritt 5. Stärkste Abgrenzung, kein Portal in Österreich macht das |
| 9 | Profil als Leistungsnachweis | Zillow, Compass | Kennzahlen oben, verkaufte Objekte, Karte | Schritt 6 |
| 10 | Persönlichkeit in festen Feldern | Airbnb-Profil, Knight Frank | Grätzl, Sprachen, Schwerpunkt, "seit" statt freiem Text | Schritt 3 und 6 |
| 11 | "Mein Makler" nach dem Erstkontakt | Compass, Private Banking | Die Person bleibt im Konto sichtbar | Schritt 7 |
| 12 | Verdienter Status | Airbnb Superhost, 1stDibs | Ein Abzeichen mit öffentlichen Regeln, nicht käuflich | Bewusst zurückgestellt (Abschnitt 8) |

Negativbeispiel sind die großen Portale im deutschsprachigen Raum: Dort steht die Firma mit Logo und Formular im Vordergrund, die Person ist austauschbar. Genau hier liegt die Lücke.

Belegte Zahlen, die den Aufwand rechtfertigen:

- 47 Prozent der Käufer und 59 Prozent der Verkäufer beauftragen den ersten Makler, den sie kontaktieren (Zillow, 2025). Wer zuerst als Person sichtbar ist, gewinnt.
- Rund drei Viertel der Käufer und vier Fünftel der Verkäufer sprechen überhaupt nur mit einem Makler (NAR 2025, über Sekundärquellen).
- Aus Host-Fotos abgeleitete Vertrauenswürdigkeit beeinflusst die Wahl stärker als Bewertungen (Ert, Fleischer, Magen 2016, Airbnb-Daten).
- Fotos echter Menschen werden angesehen, Symbolfotos werden übersprungen (NN/g).
- Die Hälfte der Käufer bevorzugt Text statt Anruf (Zillow 2025). Das spricht für den Chat am Objekt.

Nicht gefunden: ein Test, der isoliert zeigt, dass ein Maklerfoto auf der Objektkarte die Anfragen erhöht. Das müssen wir selbst messen (Abschnitt 10).

## 4. Leitprinzipien: wie Apple es machen würde

1. Das Objekt bleibt der Held. Die Person ist die zweite Ebene, nie ein Aufkleber auf dem Foto. Darum sitzt die Makler-Zeile unter dem Bild und nicht im Bild.
2. Eine Komponente, überall dieselbe. Der Makler-Kreis hat drei feste Größen: 34 Pixel auf Karten, 56 im Modul, 96 im Profilkopf. Nichts dazwischen.
3. Eine Hauptaktion pro Stelle. Karte: Profil ansehen. Signatur: Frage stellen. Modul: Frage stellen, Anruf und E-Mail als leise Zweitwege.
4. Tiefe in Stufen. Karte, dann Kurzprofil, dann Profil. Jede Stufe zeigt mehr, keine zeigt alles.
5. Alles funktioniert mit dem Finger. Nichts Wichtiges hängt an einer Mausbewegung. (Die alte Fassung zeigte den Namen nur beim Überfahren mit der Maus, am Handy also nie.)
6. Nie ein leerer Zustand. Kein Foto: Initialen auf dunklem Grund. Keine Maklerseite: Zeile ohne Pfeil und ohne Link. Keine gemessene Antwortzeit: neutraler Satz statt Zahl.
7. Ruhe. Keine Sterne, keine Abzeichen, keine Zähler auf der Karte. Bewegung nur als Bestätigung (Kreis wächst leicht, Pfeil rückt drei Pixel).
8. Ehrlich. Keine erfundenen Namen, Zahlen oder Stimmen. Was nicht gemessen ist, wird nicht behauptet.

Aus den UNIO-Gestaltungsregeln bleiben gültig: keine Zeile über Überschriften, keine Symbol-Bibliotheken, keine Emojis, Haarlinien statt Rahmen, weiche Schatten, eine Akzentfarbe.

## 5. Zielbild: die Reise mit einer Person

1. **Entdecken** (Startseite, Suche, Explore). Jede Objektkarte endet mit einer Zeile: Kreis, Name, "Beratung und Besichtigung". Antippen führt zur Maklerseite.
2. **Einordnen** (Kurzprofil). Antippen des Kreises zeigt, wer das ist: Schwerpunkt, Grätzl, Zahl der aktuellen Objekte, zwei Wege weiter.
3. **Ansehen** (Objektseite). Unter dem Titel steht, wer berät. Unter dem Preis steht das Makler-Modul. Mobil begleitet die Person als feste Leiste. Im Text steht eine persönliche Einschätzung.
4. **Fragen** (Chat, Termin). Eine Frage oder ein Terminvorschlag, direkt bei der Person, mit ehrlicher Antwortzeit.
5. **Vertrauen** (Maklerseite). Wer ist das, was hat die Person verkauft, was betreut sie gerade. Von jedem Objekt dort führt ein sichtbarer Weg zurück.
6. **Bleiben** (Konto). Nach der ersten Anfrage ist die Person "mein Makler": in der Navigation, in der Merkliste, im Kaufablauf.

## 6. Bausteine im Detail

Für jeden Baustein: was er tut, wo er hingehört, welche Daten er braucht. Die technische Fassung für Marcin mit Abnahmekriterien steht im Übergabedokument unter derselben Nummer.

### M1 Makler-Kreis

Runder Ausschnitt des Porträts in drei Größen. Ohne Foto Initialen. Eine Quelle für das Bild, damit Maklerseite und Objektseite dasselbe Gesicht zeigen. Einheitlicher Bildausschnitt: Kopf und Schulteransatz, Augen im oberen Drittel, ruhiger heller Hintergrund. Dafür gibt es bereits das Werkzeug Makler-Zuschnitt (`/maklerzuschnitt`).

### M2 Makler-Zeile auf der Objektkarte

Unter dem Kartentext, durch eine Haarlinie getrennt: Kreis 34, Name, darunter klein "Beratung und Besichtigung", rechts ein Pfeil. Eigener Link zur Maklerseite, getrennt vom Link zum Objekt. Mindesthöhe 44 Pixel für den Finger. Gilt für Startseite, Suche, Explore-Feed, Listenansicht, Merkliste und die Objekte auf Projektseiten.

Stand: im Repo gebaut. Bilder: [Karte](bilder/repo-objektkarte.jpg), [Startseite](bilder/repo-startseite-vorschau.jpg), [Explore, Liste, Objekt mobil](bilder/repo-explore-liste-objekt-mobil.jpg).

### M3 Kurzprofil

Kleine Karte beim Antippen oder Überfahren des Kreises: Porträt 56, Name, Schwerpunkt ("Altbau und Dachgeschoss"), Grätzl ("Hietzing, Penzing"), "12 aktuelle Objekte", zwei Aktionen: Profil ansehen, Frage stellen. Am Handy als Blatt von unten. Noch nicht gebaut.

### M4 Makler-Signatur auf der Objektseite

Direkt unter dem Titel, vor den Kennzahlen: Kreis 40, Name, "Berät zu diesem Objekt", Antwortzeit, Knopf "Frage stellen". Damit steht die Person auf jedem Gerät im ersten Bildschirm. Stand: gebaut. Bild: [Signatur](bilder/repo-objektseite-signatur.jpg).

### M5 Makler-Modul auf der Objektseite

In der rechten Spalte direkt unter dem Preis, vor den Marktdaten. Kreis 56, Name, Rolle, ein Satz zur Zuständigkeit, zwei Fakten (Antwortzeit, Art der Besichtigung), Hauptknopf "Frage an Wenzel stellen", darunter Anrufen und E-Mail, darunter "Profil und weitere Objekte", wenn es eine Maklerseite gibt. Ersetzt das Feld "Kontaktdaten". Stand: Grundform gebaut. Bild: [Modul](bilder/repo-objektseite-modul.jpg).

### M6 Begleitende Leiste mobil

Die feste Leiste unten zeigt links den Kreis und den Vornamen, rechts den Hauptknopf. Heute steht dort live nur "Kontakt & Anfrage". Noch nicht gebaut.

### M7 Termin bei der Person

Im Makler-Modul drei nächste Termine als antippbare Felder ("Do 17:30", "Sa 10:00", "Video heute 18:00"). Der Baustein Besichtigung gibt es im Repo bereits, er wird an die Person gebunden. Braucht einen gepflegten Kalender je Makler.

### M8 Persönliche Einschätzung

Im Beschreibungsteil der Objektseite ein abgesetzter Block: zwei bis drei Sätze des Maklers zu diesem Objekt, mit Kreis und Namen. Kein Werbetext, sondern eine Einordnung: für wen passt es, was sollte man wissen, was übersieht man auf den Fotos. Pflichtfeld bei der Objektanlage, mit Zeichengrenze. Später optional 30 Sekunden Video.

### M9 Maklerseite, zweite Ausbaustufe

Die Seiten bleiben eigene Marken. Ergänzt werden: ein fester Faktenblock (Schwerpunkt, Grätzl, Sprachen, seit wann), verkaufte Objekte als Leistungsnachweis mit eigener Ansicht, Terminbuchung, und auf Objektseiten, die von einer Maklerseite aus geöffnet werden, ein sichtbarer Rückweg ("Zurück zu Lara Jonas").

### M10 Mein Makler

Nach der ersten Anfrage: Kreis in der Navigation des Kontos, gemeinsame Merkliste, Status der Anfrage, dieselbe Person im Kaufablauf. Im Endkunden-Portal des Repos ist die Logik bereits beschrieben (`docs/ENDKUNDEN_PORTAL_PROZESSLOGIK.md`).

### M11 Makler auf Projektseiten und in der Übersicht

Projektseiten zeigen das Vertriebsteam des Projekts als zwei bis drei Kreise mit Namen. Optional eine Übersichtsseite aller Partner. Zurückgestellt, siehe Abschnitt 8.

## 7. Wording: Experten und Berater

Grundsatz: Wir beschreiben, was die Person für den Interessenten tut, nicht ihre Berufsbezeichnung.

| Stelle | Heute live | Neu |
|---|---|---|
| Überschrift bei der Person | Kontaktdaten | entfällt, der Name ist die Überschrift |
| Rolle | keine | Immobilienberater · UNIO Partner |
| Karte | keine | Beratung und Besichtigung |
| Signatur | keine | Berät zu diesem Objekt · antwortet meist in unter 2 Stunden |
| Modul, Satz | keiner | Kennt dieses Penthouse, das Haus und die Lage aus erster Hand. Fragen zu Preis, Finanzierung und Kaufablauf beantwortet er persönlich, auch vor einer Besichtigung. |
| Hauptknopf | Details anfordern | Frage an Wenzel stellen |
| Mobil unten | Kontakt & Anfrage | Wenzel fragen |
| Chat, Kopf | (kein Chat) | Immobilienberater · antwortet meist in unter 2 Stunden |
| Rückweg | keiner | Profil und weitere Objekte |
| Einschätzung | keine | Wenzels Einschätzung |

Regeln:

- Vorname im Knopf, voller Name in der Überschrift. Das wirkt nah, ohne salopp zu sein.
- "Makler" bleibt als Fachwort in rechtlichen Texten. In der Oberfläche steht "Immobilienberater" oder der Name.
- Keine Superlative, keine Sterne, keine Ausrufezeichen. Kompetenz zeigt sich in konkreten Sätzen: was die Person weiß und wobei sie hilft.
- Antwortzeit nur aus Messung. Ohne Messwert: "Antwortet persönlich".
- Rechtlicher Vorbehalt: Der Makler ist beim Kauf in der Regel Doppelmakler, bei Miete vertritt er seit 1.7.2023 meist den Vermieter. Formulierungen wie "Ihr Berater" können eine alleinige Vertretung des Suchenden nahelegen. Darum steht dort "Berät zu diesem Objekt" und nicht "Ihr persönlicher Berater". Bitte vor dem Livegang juristisch prüfen lassen.

Offene Sprachfrage: Die Startseite spricht per Du, die Live-Objektseite und die Maklerseiten per Sie, der Repo-Prototyp der Objektseite per Du. Die neuen Texte sind deshalb weitgehend ohne Anrede geschrieben. Die Entscheidung Du oder Sie für Endkunden sollte einmal getroffen und überall durchgezogen werden (Abschnitt 11).

## 8. Kritische Prüfung

Was ich bewusst anders gemacht habe als gewünscht oder bisher gebaut:

- **Kreis unter dem Bild statt im Bild.** Der Wunsch war der Kreis direkt bei der Immobilie. Im Bild konkurriert er mit dem Merken-Herz und den Objekt-Marken und verdeckt das wichtigste Verkaufsargument, das Foto. Unter dem Bild ist er immer sichtbar, hat Platz für den Namen und ist mit dem Finger gut zu treffen. Falls ihr den Kreis doch im Bild wollt, ist das eine Änderung an einer Stelle.
- **Name immer sichtbar statt erst beim Überfahren.** Am Handy gibt es kein Überfahren.

Risiken und Gegenpositionen:

1. **Fotos verteilen Anfragen nicht nach Leistung.** Studien zeigen Benachteiligung nach Herkunft und einen Vorteil für attraktive Gesichter. Gegenmittel: einheitliche Porträts (ein Stil, ein Ausschnitt), nie nach Person sortieren, Verteilung der Anfragen je Makler beobachten. Das ist kein Grund, auf Gesichter zu verzichten, aber ein Grund, es sauber zu machen.
2. **Leere oder schwache Profile schaden mehr als gar keine.** Ein Modul mit Initialen und ohne Satz wirkt lieblos. Darum Pflichtfelder vor der Freischaltung einer Person: Foto, Schwerpunkt, zwei Sätze. Bis dahin erscheint die Person in der einfachen Form.
3. **Wem gehört die Anfrage?** Objektanfragen gehen immer an den betreuenden Makler. Eine Maklerseite zeigt nur eigene Objekte. Sobald ein Makler auf seiner Seite fremde UNIO-Objekte zeigen darf, braucht es eine klare Regel zur Provision. Das ist eine Geschäftsentscheidung, keine Gestaltungsfrage.
4. **Öffentliche Antwortzeit erzeugt Druck.** Urlaub, Teilzeit und Wochenenden müssen eingerechnet werden (Bürozeiten, Vertretung). Antwortzeiten und spätere Bewertungen sind Leistungsdaten einer Person, dafür braucht es eine vertragliche Grundlage mit den Maklern.
5. **Stars gegen Gemeinschaft.** Zahlen im Profil machen starke Makler stärker und neue unsichtbar. Darum zuerst feste Felder zur Person, Kennzahlen erst ab einer Schwelle und nie als Rangliste.
6. **Abzeichen sind zurückgestellt.** Ein Status wie bei Airbnb wirkt nur mit öffentlichen, strengen Regeln. Bei 25 bis 100 Maklern wäre er eher ein Etikett als ein Signal. Wieder prüfen, wenn es genug Messdaten gibt.
7. **Übersicht aller Makler ist zurückgestellt.** Sie lädt zum Vergleichen nach Gesicht ein und bringt dem Interessenten wenig. Sinnvoller ist der Einstieg über das Objekt.
8. **Maklerwechsel.** Wenn ein Objekt die Person wechselt, müssen Karte, Objektseite, Chat und Maklerseite gleichzeitig umziehen. Sonst zeigen wir tote Profile.
9. **Marke des Maklers gegen Marke UNIO.** Auf UNIO-Flächen (Suche, Objektseite) erscheint die Person in UNIO-Gestaltung. Die eigene Schrift und Farbe des Maklers gilt nur auf seiner Seite. So bleibt die Plattform ruhig und die Maklerseite persönlich.
10. **Wirkung ist nicht bewiesen.** Dass ein Gesicht auf der Karte mehr Anfragen bringt, ist plausibel, aber nicht belegt. Deshalb Schritt für Schritt mit Messung.

## 9. Schritt für Schritt zum High-End-Produkt

Jeder Schritt hat ein sichtbares Ergebnis, eine Prüfung und eine eigene Freigabe. Nichts geht ohne ausdrückliche Entscheidung live. Reihenfolge nach Wirkung pro Aufwand.

**Arbeitsweise in jedem Schritt:** (a) Entwurf als klickbare Vorschau im Repo, (b) Abstimmung am echten Gerät, Handy zuerst, (c) Eintrag im Übergabedokument mit Abnahmekriterien, (d) Umsetzung durch Marcin in der Plattform hinter einem Schalter, (e) Prüfung auf einer Testumgebung, (f) Freigabe durch Daniel, (g) Messung zwei bis vier Wochen, (h) erst dann der nächste Schritt.

### Schritt 0: Fundament (Daten und Regeln)

Ohne das wird jeder weitere Schritt Flickwerk.

- Ein Datensatz je Makler, der überall gilt: Name, Adresse der Maklerseite, ein Porträt für alle Flächen, Rolle, Schwerpunkt, Grätzl, Sprachen, Kontaktwege.
- Die Such-Schnittstelle füllt das vorhandene Feld `agents` (heute leer).
- Regel: ein hauptverantwortlicher Makler je Objekt.
- Porträt-Standard festlegen und alle aktiven Makler einmal einheitlich zuschneiden.
- Entscheidungen aus Abschnitt 11 treffen.

Ergebnis: Daten stehen bereit, sichtbar ändert sich noch nichts. Aufwand: klein bis mittel, vor allem bei Marcin.

### Schritt 1: Die Person auf jeder Karte

- Makler-Zeile (M2) auf Startseite, Suche, Explore und Merkliste.
- Link von der Objektseite zur Maklerseite (ein Satz, eine Zeile).

Stand: im Repo als Vorschau gebaut und geprüft. Ergebnis: Vom ersten Blick an gehört zu jedem Objekt ein Mensch, und zwischen Objekt und Maklerseite gibt es beide Richtungen. Aufwand in der Plattform: klein.

### Schritt 2: Die Objektseite stellt die Person vor

- Makler-Signatur unter dem Titel (M4), Makler-Modul unter dem Preis (M5), begleitende Leiste mobil (M6).
- Neues Wording (Abschnitt 7), "Kontaktdaten" entfällt.
- Antwortzeit zunächst als neutraler Satz, Messung im Hintergrund starten.

Stand: Signatur und Modul im Repo gebaut, Leiste offen. Ergebnis: Die Person steht mobil im ersten Bildschirm statt 7.000 Pixel tiefer. Aufwand: mittel.

### Schritt 3: Kurzprofil und feste Felder zur Person

- Kurzprofil (M3) an jedem Kreis.
- Pflichtfelder im Makler-Profil: Schwerpunkt, Grätzl, Sprachen, seit wann, zwei Sätze.
- Einfaches Pflegeformular für Makler (in der Werkbank bereits angelegt).

Ergebnis: Jeder Kreis hat Tiefe, kein Profil ist leer. Aufwand: mittel.

### Schritt 4: Fragen und Termine direkt bei der Person

- Chat am Objekt statt Formular (im Repo vorhanden), mit gemessener Antwortzeit.
- Drei Terminvorschläge im Makler-Modul (M7), Videobesichtigung als Möglichkeit.
- Vertretungsregel, wenn die Person nicht erreichbar ist.

Ergebnis: Aus "Details anfordern" wird ein Gespräch mit einem Menschen. Aufwand: groß (Kalender, Benachrichtigungen, Messung).

### Schritt 5: Der Makler als Autor

- Persönliche Einschätzung auf jeder Objektseite (M8).
- Feld in der Objektanlage, mit Schreibhilfe und Zeichengrenze.
- Später: kurzes Video.

Ergebnis: Das, was kein Portal hat. Die Person wird vom Kontakt zum Kenner des Objekts. Aufwand: klein in der Technik, mittel in der Pflege.

### Schritt 6: Maklerseiten, zweite Ausbaustufe

- Faktenblock, verkaufte Objekte als Leistungsnachweis, Terminbuchung, Rückweg vom Objekt (M9).
- Maklerseiten für alle aktiven Makler, auch für die ohne eigene Marke (einfache UNIO-Fassung).
- Qualitätsprüfung der bestehenden drei Seiten (siehe Befunde im Übergabedokument).

Ergebnis: Die Maklerseite wird vom Schaufenster zum Vertrauensbeweis. Aufwand: mittel bis groß.

### Schritt 7: Mein Makler

- Die Person bleibt nach dem Erstkontakt im Konto sichtbar (M10): Navigation, Merkliste, Status, Kaufablauf.
- Makler auf Projektseiten (M11).

Ergebnis: Beziehung statt Einzelkontakt. Aufwand: groß, hängt am Endkunden-Portal.

### Danach: Feinschliff, der High-End ausmacht

- Übergänge: Der Kreis wächst beim Öffnen des Profils an seine neue Stelle, statt dass eine neue Seite aufspringt.
- Ladezustände und Fehlerzustände für jede Makler-Fläche gestalten.
- Bedienung mit Tastatur und Vorlesefunktion prüfen, Kontraste messen.
- Ladezeit: Porträts in drei festen Größen ausliefern, nicht das Original verkleinern.
- Einheitliches Porträt-Shooting für alle Partner.

## 10. Messung

Vor Schritt 1 eine Nulllinie erfassen, dann je Schritt vergleichen.

| Kennzahl | Warum |
|---|---|
| Anfragen je 100 Objektseiten-Aufrufe, getrennt nach Handy und Desktop | Hauptwirkung |
| Anteil der Objektseiten-Besuche, bei denen die Person gesehen wird | Zeigt den Effekt von Signatur und Leiste |
| Klicks von der Karte zur Maklerseite und von dort zurück zu Objekten | Nutzt jemand die Verbindung? |
| Zeit bis zur ersten Antwort des Maklers | Grundlage für das Antwortzeit-Versprechen |
| Anteil Chat gegenüber Formular und Anruf | Passt der Kanal? |
| Anfragen je Makler im Verhältnis zu seinen Objekten | Frühwarnung für Schieflage durch Fotos |

Schritt 1 und 2 nach Möglichkeit als Vergleich ausspielen (die Hälfte der Besucher mit, die Hälfte ohne), weil genau diese Wirkung nirgends sauber belegt ist.

## 11. Offene Entscheidungen

1. Du oder Sie gegenüber Endkunden, einheitlich auf Startseite, Suche, Objektseite und im Chat.
2. Rollenbezeichnung: "Immobilienberater" (Vorschlag), "Makler" oder "UNIO Partner". Dazu die juristische Prüfung der Formulierungen.
3. Dürfen Telefonnummer und E-Mail weiter offen auf der Objektseite stehen (wie heute live) oder erst nach der ersten Anfrage?
4. Bekommt jeder aktive Makler eine Maklerseite, auch ohne Paket Personal Brand?
5. Darf eine Maklerseite fremde UNIO-Objekte zeigen, und wie wird dann die Provision geteilt?
6. Wer pflegt die persönliche Einschätzung und wer gibt sie frei?
7. Kreis unter dem Bild (Vorschlag) oder im Bild.
8. Einheitliches Porträt-Shooting: ja oder nein, und bis wann.

## 12. Quellen

- Zillow, Online research now shapes how most agent relationships begin (2025): https://zillow.mediaroom.com/2025-12-30-Zillow-report-Online-research-now-shapes-how-most-agent-relationships-begin
- Zillow, Buyers Housing Trends Report 2025: https://www.zillow.com/research/buyers-housing-trends-report-2025-35688
- NAR, Profile of Home Buyers and Sellers 2025 (Zusammenfassung): https://www.nar.realtor/blogs/economists-outlook/top-10-takeaways-from-nars-2025-profile-of-home-buyers-and-sellers
- Ert, Fleischer, Magen, Trust and reputation in the sharing economy (2016): https://papers.ssrn.com/abstract=2624181
- NN/g, Photos as Web Content: https://www.nngroup.com/articles/photos-as-web-content/
- Edelman, Luca, Svirsky, Racial Discrimination in the Sharing Economy: https://www.hbs.edu/faculty/Pages/item.aspx?num=50497
- Airbnb, Update on profile photos: https://news.airbnb.com/update-on-profile-photos/
- Airbnb, Antwortrate und Antwortzeit: https://www.airbnb.com/help/article/430
- Intercom, Share your expected response time: https://www.intercom.com/help/en/articles/732436-share-your-expected-response-time
- Oldroyd u. a., The Short Life of Online Sales Leads (HBR 2011): https://scholarsarchive.byu.edu/facpub/9711
- Klage gegen Zillow wegen Umleitung von Anfragen: https://www.cohenmilstein.com/new-lawsuit-accuses-zillow-of-deceiving-home-buyers/
- WKO, Aufklärungspflichten Immobilienmakler: https://www.wko.at/oe/immowebinar/aufklaerungspflichten-haftungsfallen-immobilienmakler.pdf
- WKO, Erstauftraggeberprinzip: https://www.wko.at/oe/information-consulting/immobilien-vermoegenstreuhaender/wko-immo-erstauftraggeberprinzip-1206-2.pdf
- Eigene Prüfung der Live-Seiten www.unio.at am 20.11.2026 (Suche, Objektseiten, drei Maklerseiten, Desktop und Handy).
