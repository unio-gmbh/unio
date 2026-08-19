# Lage-Scores: woher die Daten kommen und wie sie automatisiert entstehen

Stand: 18. August 2026. Bezug: Lage-Sektion in der Objekt-Akte (`MkLage`,
`dash-mk-detail.jsx`) und in der Endkunden-Objektseite (`ui_kits/objektseite/index.html`).

Kurzantwort auf die Frage "können wir diese Daten automatisiert liefern": **Ja, für Wien
vollständig und ohne Lizenzkosten.** Alle drei Scores lassen sich aus offenen Daten
berechnen. Es braucht keinen Datenkauf und keine Handeingabe je Objekt. Nötig ist ein
nächtlicher Job, der je Objektadresse rechnet und das Ergebnis am Objekt speichert.

---

## 1. Die drei Scores und ihre Quellen

### Öffi-Anbindung (Leitkennzahl für Wien)

| Baustein | Quelle | Lizenz |
|---|---|---|
| Haltestellen, Linien, Fahrplan, Takte | Wiener Linien GTFS über data.gv.at | CC BY |
| Störungen und Echtzeit-Abfahrten (optional) | Wiener Linien Echtzeitdaten, Datendrehscheibe Wien | CC BY, Fair Use |
| Regionalverkehr (S-Bahn, Bus ins Umland) | VOR / ÖBB GTFS über mobilitätsdaten.gv.at | CC BY |
| Gehzeit zur Haltestelle | Routing auf dem OSM-Straßennetz | ODbL |

Berechnung: für jede Haltestelle im Gehradius von 15 Minuten die Zahl der Abfahrten in
der Hauptverkehrszeit ermitteln, nach Verkehrsmittel gewichten (U-Bahn stärker als Bus)
und mit der Gehzeit abwerten. Das entspricht der etablierten Transit-Score-Logik, nur mit
Wiener Daten statt eines US-Anbieters.

**Wichtig für die Echtzeitdaten:** Die Abfrage unterliegt einem Fair-Use-Prinzip, das
Abfrageintervall soll 15 Sekunden nicht unterschreiten und es sollen nur die tatsächlich
benötigten Haltepunkte abgefragt werden. Für den Score brauchen wir nur die Plandaten,
Echtzeit ist optional für die Anzeige "nächste Abfahrt".

### Alltag zu Fuß

| Baustein | Quelle | Lizenz |
|---|---|---|
| Supermärkte, Bäcker, Apotheken, Ärzte, Banken, Post | OpenStreetMap über Overpass | ODbL |
| Schulen, Kindergärten, Bildungseinrichtungen | Stadt Wien OGD (data.wien.gv.at) | CC BY |
| Ärzte und Gesundheitseinrichtungen | Stadt Wien OGD | CC BY |
| Gehzeiten | Isochronen auf dem OSM-Netz | ODbL |

Berechnung: je Kategorie die nächstgelegene Einrichtung suchen, Gehzeit bestimmen,
Kategorien nach Alltagsrelevanz gewichten (Nahversorgung schwerer als Bank), Ergebnis auf
0 bis 100 normieren. **Immer Gehminuten ausgeben, nie Meter** (Regel aus dem Research).

### Ruhe

| Baustein | Quelle | Lizenz |
|---|---|---|
| Strategische Lärmkarte Wien (Straße, Schiene, Flug) | Stadt Wien OGD | CC BY |
| Straßenkategorie und Verkehrsaufkommen | OSM-Klassifikation, Wien-Verkehrsdaten | ODbL / CC BY |
| Grünflächen und Parks in der Umgebung | Stadt Wien OGD | CC BY |

Berechnung: Lärmpegel an der Gebäudeadresse aus der Lärmkarte auslesen, um Straßentyp und
Grünanteil korrigieren, invertiert auf 0 bis 100 normieren. Das ist der einzige Score, der
ohne offene Lärmkarte geschätzt werden müsste, und Wien hat sie.

---

## 2. Isochronen und Routing

Für Gehzeiten gibt es drei Wege, in dieser Reihenfolge empfohlen:

1. **Selbst gehostetes Valhalla oder OpenTripPlanner** mit OSM-Extrakt Österreich plus
   den GTFS-Feeds. Keine Anfragelimits, volle Kontrolle, laufende Kosten nur Server.
   Für einen nächtlichen Batch über einige tausend Objekte klar die günstigste Variante.
2. **OpenRouteService als gehosteter Dienst.** Schnell startklar. Grenzen laut Anbieter:
   maximal 5 Standorte und 10 Intervalle je Anfrage, für Fußprofile bis 20 Stunden
   Zeitbereich. Der kostenlose Tarif ist für erste Entwicklung gedacht, produktiv braucht
   es einen bezahlten Plan oder Self-Hosting.
3. Reine Luftlinie mit Umwegfaktor. Nur als Notfallwert, weil in Wien Bahnkörper und
   Hauptstraßen die tatsächliche Gehzeit deutlich verlängern.

---

## 3. Vorgeschlagene Pipeline

```
Objektadresse
  → Geokodierung (Adressregister BEV, CC BY; Fallback Nominatim)
  → Isochronen 5 / 10 / 15 Min zu Fuß (Valhalla, selbst gehostet)
  → Overpass- und OGD-Abfragen innerhalb der Isochrone
  → GTFS-Auswertung: Abfahrten je Haltestelle in der HVZ
  → Lärmkarte am Punkt auslesen
  → drei Scores 0..100 + POI-Liste mit Gehminuten + Öffi-Satz
  → am Objekt speichern, mit Zeitstempel und Quellenangabe
```

Laufzeit je Objekt geschätzt unter zwei Sekunden, damit ist ein nächtlicher Lauf über den
gesamten Bestand unkritisch. Neuberechnung sinnvoll bei neuer Adresse, sonst monatlich,
weil sich Fahrplan und Nahversorgung selten ändern.

## 4. Pflichten, die wir mitliefern müssen

- **Namensnennung.** CC BY verlangt die Quellenangabe, ODbL zusätzlich die Weitergabe
  abgeleiteter Datenbanken unter gleichen Bedingungen. Praktisch: eine Zeile
  "Datenquellen: Stadt Wien, Wiener Linien, OpenStreetMap" unter der Lage-Sektion, dazu
  die ausführliche Auflistung im Impressum.
- **Erklärbarkeit.** Der Aufklapper "Wie wird das berechnet?" ist bereits eingebaut und
  nennt die Quellen. Ein Score ohne Erklärung wirkt wie eine Behauptung und ist bei
  einem Verkaufsargument angreifbar.
- **Kein Schätzwert als Zahl.** Fehlt eine Quelle, zeigen wir die Kategorie ohne Score,
  nicht einen geratenen Wert.

## 5. Was heute in der Demo steht

**Alle Demo-Objekte haben echte, berechnete Werte.** `build/lage.mjs` geokodiert die
Adresse (Nominatim, mit Cache in `_geocache.json`) und rechnet daraus die drei Scores.
Ergebnisse liegen als `assets/data/lage/<objekt-id>.json` im Repo, die Seiten lesen die
Datei zur jeweiligen Objekt-Kennung.

Aufrufe:

```
node build/lage.mjs              # alle Objekte
node build/lage.mjs --fehlende   # nur die ohne Datei
node build/lage.mjs ecoluxe      # ein einzelnes
```

**Kein Fallback.** Fehlt die Datei zu einem Objekt, wird die Lage-Sektion nicht
angezeigt. Vorher stand dort ein Beispielwert, wodurch eine Korneuburger Adresse Wiener
Verbindungen behauptete. Ein falscher Score ist schlimmer als kein Score.

**Overpass fair benutzen.** Je Objekt laufen genau drei gebündelte Abfragen (Verkehr,
Alltag, Ruhe) statt zwölf einzelner. Der Dienst drosselt sonst und ein Lauf dauert
Minuten statt Sekunden. Bei 429 oder 504 wird über drei Spiegel wiederholt.

Beispielwerte aus dem Lauf vom 18.08.2026, sie zeigen, dass der Score differenziert:

| Objekt | Lage | Öffi | Alltag | Ruhe |
|---|---|---|---|---|
| ObenZwei | 1020 Leopoldstadt | 100 | 88 | 64 |
| Penthouse | 1010 Innere Stadt | 90 | 85 | 88 |
| Das Albrecht | 1180 Währing | 82 | 86 | 67 |
| Penthouse Beheim | 1170 Hernals | 77 | 84 | 88 |
| Villa Ecoluxe | 1190 Grinzing | 45 | 86 | 88 |
| Albrechts Townhouses | 2100 Korneuburg | 46 | 86 | 88 |

Grinzing und Korneuburg fallen beim Öffi-Score deutlich ab, Leopoldstadt verliert bei der
Ruhe. Genau diese Spreizung macht die Kennzahl im Verkaufsgespräch brauchbar.

## Quellen

- Wiener Linien GTFS auf data.gv.at: https://www.data.gv.at/2017/08/25/daten-der-wiener-linien-nun-auch-im-format-gtfs-verfuegbar/
- Wiener Linien Echtzeitdaten via Datendrehscheibe Wien: https://www.data.gv.at/katalog/en/dataset/wiener-linien-echtzeitdaten-via-datendrehscheibe-wien
- OpenRouteService Isochronen, Restriktionen: https://openrouteservice.org/restrictions/
- OpenRouteService Preisstufen: https://apispine.com/openrouteserviceorg/pricing
