# Endkunden-Research August 2026 (Anhang zur Prozesslogik)

> Drei Deep-Research-Reports als Quellenbasis für
> `ENDKUNDEN_PORTAL_PROZESSLOGIK.md`. Stand 17.08.2026.

---

## Report 1: US-Plattformen (Zillow, Redfin, Compass, Opendoor, Realtor.com, RealScout)

### Zillow (Referenz-Standard, ca. 200 Mio. monatliche Nutzer)

**App-Struktur:** Mobile Tab-Bar mit Suche (Karte als Default-Screen), Saved
(Saved Homes + Saved Searches als Sub-Tabs), Updates (Aktivitäts-Feed:
Preisänderungen, neue Treffer), Messages (Inbox) und Account. Die Karte ist
das Herzstück, nicht eine Liste.

**Suche und Filter:** Listing-Typ (Kauf/Miete/verkauft), Preis bzw. monatliche
Rate, Betten/Bäder, Home Type, dann unter „More": Wohnfläche, Grundstück,
Baujahr, HOA-Gebühren, Aussicht, Pool/Klima, Days on Market, Open House und
Freitext-Keyword-Filter (z. B. „fireplace"). Auf der Karte: Boundary-Drawing
mit dem Finger.

**Saved Searches + Alerts:** Pro gespeicherter Suche wählbare Frequenz,
entscheidend ist „Instant": Push/E-Mail in dem Moment, in dem ein passendes
Objekt live geht, in kompetitiven Märkten das wichtigste Retention-Feature
überhaupt. Saved Homes (Herz) triggern eigene Alerts bei Preis- oder
Statusänderung. Je mehr geherzt/geteilt wird, desto besser „Homes for you".

**Co-Shopping:** Seit Ende 2025 natives Messaging: Partner in die App
einladen, pro Listing ein eigener Chat-Thread (über 60 % der Käufer suchen zu
zweit). Dazu „Shared Collections": gemeinsamer, live synchronisierter
Workspace zum Speichern, Organisieren, Vergleichen. Beim Herzen kann man
taggen, WAS einem gefällt, und das dem Partner pushen.

**BuyAbility (strategisch wichtigstes Feature):** Einkommen, Kreditscore,
Eigenkapital, Wunschrate ergeben in Echtzeit (gekoppelt an aktuelle Zinsen)
eine persönliche Kaufkraft. Diese wird in den Feed injiziert: Jedes Listing
zeigt „within BuyAbility" bzw. die personalisierte Monatsrate. Suche nach
Kaufkraft statt Preisfilter. Aktualisiert sich bei Zinsbewegung.

**Buyer Hub (Juni 2026):** Personalisierter Hub mit vier Milestones: Budget,
Haus finden, Angebot machen, Closing. Bündelt Ziele, Finanzen, Aufgaben,
Dokumente, Agent und Lender. Fortschritt aktualisiert sich automatisch.

**Touring:** „Request a Tour" mit bis zu 3 Wunsch-Slots, in-person oder Video.
Kein echtes Instant-Booking (Schwäche gegenüber Redfin).

**Showcase/3D:** Premium-Listings mit raumweise gruppierten Fotos, 3D-Tour und
interaktivem Grundriss (klickbare Punkte öffnen die 3D-Ansicht). 60-75 % mehr
Views.

**Kritik:** 1,5-1,8 Sterne auf Review-Plattformen. Kontaktformular „designed
to fool" (Anfragen gehen an zahlende Premier Agents, Klage anhängig),
Referral-Fees bis 40 %, Ad-Disclosure-Mängel, Datenaktualität hinter MLS,
Zestimate weckt falsche Preiserwartungen.

### Redfin (UX-Vorbild Touring + Datenqualität)

- Datenaktualität als Feature: MLS-Refresh alle ~5 Minuten, aktiv kommuniziert.
- „Book It Now": echte, sofort bestätigte Tour-Slots wie eine
  Restaurantreservierung, bestes Touring-UX der Branche.
- „Direct Access": Selbstbesichtigung leerstehender Objekte, ID-Verifikation
  einmalig, Tür per App (Smart Locks), doppelt so viele Touren.
- Offer Insights / Compete Score: Echtzeit-Daten zu Bieterwettbewerb pro
  Nachbarschaft, reduziert Unsicherheit im Angebotsprozess.

### Compass (Vorbild Makler-Kunde-Kollaboration)

- **Collections:** Gemeinsame visuelle Boards von Käufer und Agent, beide
  fügen hinzu und kommentieren, Statusupdates sichtbar.
- **Compass One (2025):** Transaktions-Timeline Schritt für Schritt, alle
  Dokumente zentral, ein Kommunikationskanal für Agent, Lender, Inspektor.
- **Private Exclusives:** Off-MLS nur für Compass-Kunden; die Suche zeigt,
  WIE VIELE private Treffer es gäbe (FOMO als Lead-Mechanik).

### Opendoor / Realtor.com / RealScout

- Opendoor: radikal einfacher Self-Tour-Flow (Slot wählen, ID-Verifikation via
  Stripe Identity, Tür per App, allein besichtigen).
- Realtor.com: Commute-Time-Filter, Map-Layer (Lärm, Flut), FlyAround
  (3D-Überflug), ChatGPT-App für die Pre-Search-Phase.
- RealScout: Agent-gebrandete, werbefreie Suchumgebung („safe haven"),
  Raum-für-Raum-Vergleich, Buyer Graph (anonymisierte Nachfragedaten), Alerts
  mit 17x höherer CTR als Branchenschnitt.

### End-to-End-Flow (State of the Art, synthetisiert)

1. Pre-Search: Budget-/BuyAbility-Onboarding statt Preisfilter.
2. Explore: Karte + personalisierter Feed, Herzen trainiert Empfehlungen.
3. Suchprofil: Saved Search mit Instant-Alerts, Partner, Shared Collection.
4. Shortlist: Kommentare pro Objekt, Side-by-Side, 3D als Vorfilter.
5. Besichtigung: Instant-Slots oder Self-Tour.
6. Angebot: Marktdaten, Verified Pre-Approval als Badge.
7. Transaktion: Milestone-Hub mit Auto-Fortschritt, Tasks, Dokumenten.

### 10 Learnings (US)

1. Kaufkraft statt Preisfilter als Badge an jedem Objekt im Feed.
2. Instant-Alerts als heiliges Feature, Frequenz pro Suchprofil.
3. Co-Shopping von Tag 1 (Partner, Collection, Kommentare pro Objekt).
4. Collections mit dem Makler teilen (Compass-Modell).
5. Echte Tour-Slots statt Anfrageformular (Redfin-Modell).
6. Interaktiver Grundriss als Navigations-Layer der Detailseite.
7. Milestone-Hub für die Zeit nach dem „Gefällt mir".
8. Transparenz als Differenzierer: immer klar, wer antwortet; werbefrei.
9. Markt-Kontext am Objekt (Nachfrage, Preisentwicklung) gegen Angebots-Angst.
10. Lebensrealitäts-Filter (Pendelzeit, Freitext) statt 40 Checkboxen.

**Anti-Patterns:** verschleierte Lead-Weiterleitung, Ad-Überladung,
Schätzwerte ohne Konfidenz, Anfrage-Flows ohne verbindliche Antwortzeit,
Detailseiten mit Info hinter jedem Tap.

---

## Report 2: Europa (ImmoScout24, willhaben, Rightmove/Zoopla, Hemnet, Finn.no, Challenger)

### ImmoScout24 (DE + AT)

Suchprofile mit Alerts, Merklisten, Premium-Abo „SuchenPlus" (Frühzugang zu
Anzeigen, erweiterte Filter, „Premium-Interessent"-Sichtbarkeit), Nachfrage-
Check (Mitbewerber-Einschätzung), SCHUFA-Bonitätsprodukte. Kritik: Der einzig
belegbare Vorteil ist der zeitlich begrenzte Frühzugang; Trustpilot-Beschwerden
über Preis-Leistung und Kündigungshürden. Lehre: **Pay-to-not-lose-Mechanik
erzeugt Umsatz und Ressentiment** - Käufer zahlen, um ein Problem zu mildern,
das die Plattform selbst erzeugt.

### willhaben.at

Marktführer (87,1 % Nutzungsrate unter Immobiliensuchenden in AT), aber
generische Kleinanzeigenplattform: Filtersuche, Suchagenten, Merkliste, keine
Preisverlaufs-Transparenz, keine Verkaufspreise, keine Finanzierung, Prozess
endet bei der Kontaktanfrage. Genau diese Lücke ist der Raum für UNIO.

### Rightmove / Zoopla (UK)

Instant-Alerts inkl. „reduced" und „back on the market"; Rightmove „Price
History" zeigt die komplette Preis-Timeline eines Inserats (Käufer lesen
Verkäufermotivation ab); Zoopla verknüpft Land-Registry-Verkaufspreise mit
AVM. Ein Ökosystem an Browser-Extensions (Property Log, Property Tracker)
beweist ungedeckte Nachfrage nach Objekt-Tracking.

### Skandinavien: Finn.no + Hemnet

Finn.no (NO): ~80 Mio. Monatsvisits bei 5,5 Mio. Einwohnern; Draw-a-Shape,
granulare Filter (Energieklasse), historische Preisdaten, Maklerprofile mit
Track Record. Hemnet (SE): 40+ Mio. Visits/Monat, viertgrößte kommerzielle
Website Schwedens. Warum: offene Bieterverfahren sind Norm, Hemnet macht
daraus Live-Content (Objekt folgen, Push bei Bietstart, Gebotsupdates,
finaler Verkaufspreis als Notification; „Slutpriser" = 1,5 Mio. finale
Preise). Auch Nicht-Käufer nutzen die App habituell. **Kernerkenntnis:
Transaktions-Ereignisse als Content-Stream machen aus einem Suchwerkzeug ein
tägliches Medium.**

### Challenger

Homeday (DE): Kundenplattform myHomeday, digitales Besichtigungs-Feedback +
unverbindliche Angebote direkt abgeben, Pipeline-Transparenz. McMakler
ähnlich. RealScout, Flyhomes/HomeLight (Cash-Offer, US-spezifisch). Klipster
(2025): „If TikTok & Zillow had a love child", AI-generierte Kurzvideos aus
Listings. UNIOs Explore-Feed ist international validiert, in Europa fast
unbesetzt.

### DACH-Übersetzung (rechtlich/kulturell)

- Bieterverfahren in AT selten; Normalfall Festpreis + verdeckte Verhandlung.
  Kein Hemnet-Live-Ticker kopierbar, aber der Ereignis-Stream schon.
- Käufer zahlt bis zu 3 % Provision (Doppelmaklertum Standard), wird aber von
  niemandem vertreten: die zentrale kulturelle Wunde, UNIOs Argument.
- Abschluss standardisiert: Kaufanbot (bindend!) → Kaufvertrag (Anwalt/Notar)
  → Treuhand → Grundbuch; Nebenkosten ~10 % (3,5 % GrESt, 1,1 % Eintragung,
  1,25-2,5 % Vertrag, Provision). Gut digital abbildbar als Status-Tracker.
- Keine offenen Sold-Prices wie UK, aber Kaufvertrags-/Grundbuchdaten
  (IMMOunited) erlauben Slutpriser-artige Produkte.

### 10 Learnings (Europa)

1. Objekt-Follow statt nur Suchagent (Push bei Preis/Status/wieder verfügbar).
2. Ereignisse als Feed-Content (Preissenkung, Besichtigungen, verkauft).
3. Finale Preise als Killer-Feature (Grätzl-Preisarchiv).
4. Preisverlauf pro Inserat sichtbar.
5. Nachfrage-Transparenz käuferseitig (aggregiert, ehrlich).
6. Post-Besichtigungs-Flow digitalisieren (Feedback + Sofort-Anbot).
7. Kaufprozess-Tracker bis Grundbuch: in Europa unbesetzt.
8. Finanzierungs-Ready-Signal kostenlos statt Bonitäts-Paywall.
9. Keine Pay-to-not-lose-Monetarisierung (ImmoScout-Ressentiment).
10. Werbefreie gebrandete Käuferumgebung + Natural-Language-Suche; AI-Videos
    aus Exposé-Fotos skalieren den Feed ohne Content-Kosten.

---

## Report 3: UI- und Gamification-Patterns (Apple, Instagram/TikTok, Duolingo, Hinge, Airbnb)

### 18 UI-Regeln

1. Max. 5 Tabs, ideal 4; Tab-Bar bleibt sichtbar, außer ein Sheet liegt darüber.
2. Tab-Items lösen nie Aktionen aus; jeder Tab behält seinen Navigations-State.
3. Push nur für echte Hierarchie (Liste → Detail); Sheet für Selbstabgeschlossenes
   (Filter, Kontakt, Teilen, Login).
4. Bottom-Sheets mit Detents (halb/voll); mehrstufige Flows komplett modal
   kapseln, damit „Zurück" eindeutig bleibt.
5. Back-Button trägt Titel der Elternseite; Edge-Swipe von links immer frei.
6. Kein Hamburger-Menü; Sekundäres in Profil-Tab oder Kontextmenüs.
7. Deference: Bei Fotos verschwindet das Chrome (Vollbild ohne UI).
8. Typo: Large Title (34pt) kollabiert in 17pt-Navbar; 3-4 Größenstufen,
   Gewicht statt Farbe.
9. Depth sparsam: eine Schattenebene, Blur für Bars/Sheets, keine
   Card-in-Card-Stapel.
10. Motion: 100 ms Micro, 200 ms Standard, 300-400 ms Sheets/Hero. Nie länger.
11. Springs für Gestengetriebenes; CSS: `cubic-bezier(0.32, 0.72, 0, 1)`.
12. Haptik nur an Bedeutungsmomenten (Like light, Erfolg success), nie beim
    Scrollen.
13. Pull-to-refresh nur bei echt neuen Inhalten.
14. Skeleton States statt Spinner; Skeleton-Layout = geladenes Layout.
15. Optimistic UI für Like/Merken.
16. Doppeltipp-Like (300 ms Spring-Herz) PLUS persistenter Like-Button.
17. „Neu seit letztem Besuch" als dezente Marker, keine Zähler-Inflation.
18. Ehrlicher Endpunkt: „Du bist auf dem Stand" (Instagram Caught-up).

### Gamification: passt / passt nicht

| Mechanik | Urteil |
|---|---|
| For-You-Feed (Verweildauer, Galerie-Tiefe, Wiederbesuch = stärkstes Signal) | passt, Kernmechanik |
| Hinge „Most Compatible": 1 kuratiertes Top-Objekt pro Woche | passt hervorragend (8x mehr Dates durch diese eine Karte) |
| Airbnb Wishlists: kollaborativ, benennbar, teilbar | passt perfekt (größter ungenutzter Hebel der Kategorie) |
| Objekt-Badges aus echten Daten („Meistgemerkt", „Preis gesenkt") | passt (Airbnb Guest Favorites: Objekt-Badges schlagen Anbieter-Badges) |
| Fortschritt in der Sache (Kaufbereitschafts-Checkliste mit Ring) | passt (Quest-Ersatz) |
| Streaks | passt nicht (Anxiety statt Vertrauen); Alternative: sanfter „Wieder da"-Moment |
| Punkte, Leaderboards, Leagues | passt nicht (Verkaufsdruck-Geruch) |
| Story-Ring | bedingt: nur für echte, datierte Updates (Baufortschritt, Slots) |
| Zillow-Surfing / Träumen | passt: Feed darf lustvoll sein, Merkliste als Brücke zum Lead |
| Variable Rewards | nur legitim: Überraschung liegt im Inventar, nie in getropften Pushes |

### Onboarding-Empfehlung

1. Sofort Feed zeigen (2-3 s Wow), dann Quiz-Sheet.
2. 4-6 Fragen, eine pro Screen, visuell (Karte antippen, Slider, Bildpaar),
   Fortschrittsbalken, überspringbar.
3. Sofortige Belohnung: „12 Objekte passen zu dir".
4. Account erst beim ersten Save („Merkliste sichern").
5. Progressive Profilierung: Finanzierung/Haushalt später, als
   Ein-Frage-Sheets mit Nutzenversprechen.
6. Feature-Freischaltung statt Feature-Tour (Match der Woche erst bei genug
   Signalen, Discover-Weekly-Logik).

### Anti-Patterns

Fake Urgency (erfundene Countdowns, „3 andere schauen gerade" ohne Daten),
Streak-Guilt, Konfetti/XP/Maskottchen, Endless Scroll ohne Ende-Marker,
Zwangs-Registrierung vor dem ersten Inhalt, Notification-Spam, Confirmshaming.
Faustregel: Legitim ist, was das Nutzerziel beschleunigt und transparent auf
echten Daten basiert; manipulativ ist, was App-Zeit maximiert oder Knappheit
erfindet.

---

*Quellen: siehe Original-Reports (Zillow/Compass/Redfin-Pressemitteilungen,
Apple HIG/Frank Rausch, NN/g, Hemnet Group, HousingWire, Trustpilot,
betterhomes.at u. a.). Vollständige Linklisten in den Research-Transkripten
der Session vom 17.08.2026.*
