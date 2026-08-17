# UNIO Endkunden-Erlebnis: Ausführungsplan & Prozesslogik

> Version 1.0 · 17.08.2026 · Basis: Deep Research US-Portale (Zillow, Redfin,
> Compass, Opendoor, Realtor.com, RealScout), Europa (ImmoScout24, willhaben,
> Rightmove/Zoopla, Hemnet, Finn.no, Homeday) und UI/Gamification-Patterns
> (Apple HIG, Instagram/TikTok, Duolingo, Hinge, Airbnb).
> Gilt für: Explore, Objektseite, Endkunden-Portal (Rolle „Endkunde").
> Abschnitt 10 enthält den Challenge-Durchgang und was er am Plan geändert hat.

---

## 1. Leitidee

**Ein Zustand, viele Fenster.** Der Endkunde hat pro Objekt genau eine
Beziehung (entdeckt → gemerkt → besichtigt → Anbot → Abwicklung → Eigentum)
und genau ein Profil (Suchprofile + Kaufkraft + Verhaltenssignale). Alles,
was er sieht (Feed, Highlights, Badges, Chats, Dokumente, Pushes), sind nur
Fenster auf diese zwei Datenobjekte. Kein Prozess läuft doppelt, kein Button
läuft ins Leere: Jeder Klick ändert einen Zustand, öffnet ein Sheet oder
navigiert, und der neue Zustand ist sofort überall sichtbar.

Drei Research-Kernbefunde tragen den Plan:

1. **Alle europäischen Portale enden bei der Kontaktanfrage.** ImmoScout und
   willhaben decken nur Suche → Alert → Anfrage ab. Hemnet (Schweden, pro Kopf
   meistgenutzte Immobilien-App der Welt) beweist: Transaktions-Ereignisse als
   Content-Stream (Preisänderung, Statuswechsel, finale Preise) erzeugen
   Social-Media-Engagement. Der Wiener Kaufprozess (Anbot → Kaufvertrag →
   Treuhand → Grundbuch) ist standardisiert und damit als „Sendungsverfolgung"
   abbildbar. Das baut in Europa niemand: UNIOs Lücke.
2. **Zillows größter Hebel ist Kaufkraft statt Preisfilter** (BuyAbility:
   persönliches Budget als Badge an jedem Objekt), Zillows größte Wunde ist
   verschleierte Lead-Weiterleitung (1,5 Sterne). UNIO gewinnt mit dem
   Gegenteil: werbefrei, immer klar, wer antwortet (RealScout-Prinzip).
3. **Für ein High-Trust-Produkt passt Airbnb/Hinge-Gamification (Kuration,
   Kollaboration, echte Badges), nicht Duolingo** (Streaks, Punkte, Konfetti).
   Die Überraschung liegt im Inventar, nie in getropften Benachrichtigungen.

---

## 2. Designprinzipien (verbindlich, aus Apple HIG + Research)

| # | Regel | Konkret |
|---|---|---|
| P1 | Max. 5 Tabs, Tab wechselt nur Bereich, nie Aktion | Tab-State bleibt beim Wechsel erhalten |
| P2 | Sheet statt Seite, wenn Kontext erhalten bleibt | Filter, Termin, Anbot, Teilen, Quiz: immer Bottom-Sheet mit Detents (halb/voll), schließbar per Swipe, X und Tap-outside |
| P3 | Push (Drill-down) nur für echte Hierarchie | Liste → Objektdetail. Back-Button trägt Titel der Elternseite |
| P4 | Fotos first, Chrome verschwindet | Vollbild-Galerie ohne UI, Overlays erst bei Tap |
| P5 | Typo: 3-4 Stufen, Gewicht statt Farbe | Large Title kollabiert beim Scrollen in kompakte Bar (existiert bereits im Portal-Header) |
| P6 | Motion-Raster: 100 / 200 / 300-400 ms | 100 Like-Herz und Toggles, 200 Standard, 300-400 Sheets und Hero. Easing `cubic-bezier(0.32, 0.72, 0, 1)` für Sheets. Nie länger |
| P7 | Optimistic UI | Merken, Like, Termin-Wahl sofort bestätigen, sync im Hintergrund |
| P8 | Skeleton statt Spinner | Layout des Skeletons = Layout des geladenen Zustands |
| P9 | Ein Badge pro Karte | Badge-Priorität: Anbot-Status > Preis gesenkt > Leistbar/Rendite > Neu für dich > Meistgemerkt |
| P10 | Ehrliches Ende | Nach kuratierten neuen Objekten „Du bist auf dem Stand"-Moment, danach optional „Ähnliches entdecken" |
| P11 | Keine Fake-Urgency | Countdown nur bei echten Fristen (Anbot-Bindungsfrist!), Nachfrage-Zahlen nur aus echten Daten |
| P12 | Account erst beim ersten Wert-Moment | Registrierung beim ersten Merken („Merkliste sichern"), nie davor |

---

## 3. Informationsarchitektur: von 6 Tabs zu 5 Flächen

**Heute:** Start / Suchen / Angebote / Chats / Dokumente / Profil (6). Problem:
Angebote und Dokumente sind für 90 % der Nutzer leere Tabs, Chats und
Ereignisse (Preisänderung, neuer Treffer) sind getrennt, Suchprofile sind vom
Ort ihrer Wirkung (Explore) entkoppelt.

**Neu (mobil Bottom-Tabs, Desktop Pill-Nav):**

| Tab | Inhalt | Ersetzt |
|---|---|---|
| 1. **Start** | Für-dich-Hub: Match der Woche, Kaufreise-Karte (sobald aktiv), Highlights, Grätzl-Preise | Start |
| 2. **Entdecken** | Explore: Grid / Feed / Liste+Karte, personalisiert durchs Käuferprofil | Explore-Link + Suchen |
| 3. **Merkliste** | Collections: benennbar, kollaborativ (Partner + Makler), Vergleich | (neu, war Teil der Explore) |
| 4. **Aktivität** | EIN Stream: Ereignisse + Chats, Filter „Alle / Nachrichten" | Chats + verstreute Updates |
| 5. **Profil** | Suchprofile, Kaufkraft, Dokumente-Archiv, Benachrichtigungen, Eigentum | Profil + Dokumente + Suchen |

- **Suchprofile wandern zu Profil und in die Explore** (Chip-Leiste über der
  Liste, Sheet zum Bearbeiten). Sie sind Einstellung, kein Ziel-Ort.
- **Angebote/Kaufreise ist kein Tab mehr, sondern eine Karte,** die ab dem
  ersten aktiven Anbot gepinnt ganz oben im Start-Tab liegt und von jedem
  Objekt aus erreichbar ist. Leere Tabs verschwinden, aktive Prozesse drängen
  sich von selbst auf.
- **Dokumente haben keinen eigenen Tab:** Sie hängen am Objekt (Objektseite +
  Kaufreise) und als Archiv im Profil. Ein Dokument ohne Objektkontext gibt
  es nicht.

---

## 4. Datenobjekt A: das Käuferprofil (eine Personalisierungs-Pipeline)

**Heute laufen 4 Personalisierungen parallel:** Explore-Score (Likes/Seen),
Suchprofile (Portal), Highlights (hardcoded), Rendite-Filter (Liste). Künftig
speist EIN Käuferprofil alle Flächen:

```
Käuferprofil
├── Suchprofile [1..n]     (Lage, Budget, Zimmer, m², Rendite-Min, Typ: Eigennutzung|Anlage)
├── Kaufkraft              (Selbstangabe ODER Concierge-geprüft; Betrag + Monatsrate)
├── Signale                (Likes, Merkungen, Verweildauer, Galerie-Tiefe, Wiederbesuche)
└── Haushalt               (Partner eingeladen? gemeinsame Collection?)
```

**Wirkung (automatisch, ohne weiteren Prozess):**

| Fläche | Liest aus dem Käuferprofil |
|---|---|
| Explore-Feed-Reihenfolge | Signale × Suchprofil-Match (Wiederbesuch desselben Objekts = stärkstes Signal) |
| Feed-/Listen-Badge | Typ Anlage → „Rendite 3,4 %", Typ Eigennutzung → „≈ € 2.480/Monat" bzw. „Leistbar für dich" bei geprüfter Kaufkraft |
| Start-Highlights | Top-3-Treffer je aktivem Suchprofil, mit Profilnamen als Label (existiert) |
| Match der Woche | 1 kuratiertes Objekt aus dem stärksten Suchprofil, wöchentlich |
| Push/Alerts | Neuer Treffer je Suchprofil (Frequenz pro Profil: Sofort / Täglich / Aus) |
| Listen-Filter | Chip-Leiste = aktive Suchprofile + Schnellfilter |

**Kaufkraft-Logik (BuyAbility-Übersetzung für Wien):** Selbstangabe im Profil
(Sheet, 3 Felder: Eigenkapital, Haushaltsnetto, Wunschrate) ergibt sofort ein
lokales Budget mit Kaufnebenkosten-Aufschlag (~10 % in AT: GrESt, Eintragung,
Vertragserrichtung, Provision). „Prüfen lassen" startet den
Finanzierungs-Concierge (Abschnitt 7) und macht aus dem grauen ein
verifiziertes Badge. Kein Zwang, keine Paywall: das Anti-ImmoScout-Prinzip.

---

## 5. Datenobjekt B: die Objekt-Beziehung (eine State-Machine)

Jedes Objekt hat pro Nutzer genau einen Zustand. Alle CTAs, Badges, Dokumente
und Chats leiten sich daraus ab. Damit können Prozesse nicht parallel laufen:
Es gibt nur diesen einen Faden.

```
entdeckt ──merken──▶ gemerkt ──Termin──▶ besichtigt ──Anbot──▶ anbot_aktiv
                                                                │
                                              ┌─────────────────┼──────────────┐
                                              ▼                 ▼              ▼
                                        gegenangebot      angenommen      abgelehnt
                                          │  │  │              │           (Archiv)
                        annehmen/neu bieten/ablehnen           ▼
                                              │           abwicklung: vertrag → treuhand → grundbuch → übergabe
                                              └──▶ zurück zu anbot_aktiv         │
                                                                                 ▼
                                                                             eigentum
```

**Zustandsabhängige CTA-Leiste der Objektseite (immer max. 2 Buttons + 1 Rundbutton):**

| Zustand | Primär-CTA | Sekundär-CTA |
|---|---|---|
| entdeckt / gemerkt | Besichtigung buchen | Anbot legen |
| Termin gebucht | Termin: Fr 10:30 (→ Detail-Sheet) | Anbot legen |
| besichtigt | Anbot legen | Feedback geben |
| anbot_aktiv | Anbot ansehen (Status-Pill) | Chat mit Makler |
| gegenangebot | Auf Gegenangebot reagieren | Chat mit Makler |
| angenommen / abwicklung | Kaufreise öffnen | Chat |
| eigentum | Mein Objekt öffnen | - |

**Was der Zustand automatisch mitzieht (keine Parallel-Pflege):**

- **Dokumente:** entdeckt = BAB, Energieausweis, Grundriss. anbot_aktiv = +
  Kaufanbot (entsperrt sich selbst, heute schon als „Nach Angebot" angelegt).
  abwicklung = + Kaufvertragsentwurf, Treuhandbestätigung. eigentum = +
  Übergabeprotokoll, Betriebskosten.
- **Chat-Thread:** Es gibt genau EINEN Thread pro Objekt (Makler + optional
  Partner). Merklisten-Kommentare, Besichtigungs-Feedback und
  Anbot-Nachrichten laufen alle in diesem Thread, nicht in drei Systemen.
- **Aktivitäts-Stream:** Jeder Zustandswechsel erzeugt genau eine
  Ereignis-Karte mit genau einer Aktion.

---

## 6. Subseiten-Prozesslogik: jeder Klick, lückenlos

### 6.1 Erststart (Onboarding, einmalig)

1. Explore lädt sofort, 2-3 s Wow (kein Gate).
2. Sheet: Quiz, 5 Screens, je 1 Frage, visuell, überspringbar, Fortschritt oben:
   (1) Bezirke auf Mini-Karte antippen · (2) Budget-Slider · (3) Zimmer/m² ·
   (4) „Wohnen oder anlegen?" · (5) Bildpaar „Altbau oder Neubau?"
3. Belohnung sofort: „14 Objekte passen zu dir", Feed sortiert sich sichtbar um,
   Suchprofil 1 ist angelegt (benannt nach Bezirk, z. B. „Wien West").
4. Registrierung erst beim ersten Merken (P12): „Merkliste sichern" als Sheet.
5. Kaufkraft, Haushalt, Zeithorizont: nie im Onboarding, sondern kontextuell
   als Ein-Frage-Sheets (progressive Profilierung, je mit Nutzenversprechen).

### 6.2 Start (Für dich)

| Element | Klick → |
|---|---|
| Kaufreise-Karte (nur wenn aktiv, gepinnt) | Push → Kaufreise (6.7) |
| Match der Woche (1 große Karte, wöchentlich, mit Begründung „Passt zu: Dachgeschoss Wien West") | Push → Objektseite |
| „Neu für dich"-Highlights (3, je Suchprofil-Label + 1 Badge) | Push → Objektseite des geklickten Objekts (heute: immer Demo-Objekt, fixen!) |
| Explore-Hero | Tab-Wechsel → Entdecken |
| Statuszeile (2 Suchprofile · 1 Anbot · 3 Nachrichten) | Suchprofile → Profil-Tab, Anbot → Push zur Kaufreise-Seite, Nachrichten → Aktivität-Tab |
| Grätzl-Preise-Karte („1170 Hernals: 12 Verkäufe, ⌀ € 6.900/m²") | Sheet: Preisarchiv des Bezirks (Honeypot, Hemnet-Slutpriser-Prinzip) |
| Projekt-Story-Ringe (nur wenn echte Updates: Baufortschritt gefolgter Projekte) | Story-Viewer (Vollbild, tap = weiter) |

### 6.3 Entdecken (Explore)

- **Grid:** Kachel-Tap → Feed an dieser Position (existiert). Neu: dezente
  Badge-Punkte auf ungesehenen Kacheln statt Zähler.
- **Feed:** Doppeltipp-Like + Herz-Button (beides, da Doppeltipp allein nicht
  entdeckbar), Merken → Collection-Picker-Sheet (Default „Meine Merkliste"),
  Share (existiert), „Objekt ansehen" → Objektseite mit `?von=explore`.
  Neu als Feed-Karten zwischen Objekten: **Ereignis-Karten** („Preis gesenkt:
  minus 4 %", „Neu: 3 Treffer für Anlage bis 500k") und alle ~10 Karten der
  **Caught-up-Moment** (P10).
- **Feed-Badge** (max. 1, P9): Rendite (Anlage-Profil) oder Rate/Leistbar
  (Eigennutzer) oder „Preis gesenkt".
- **Liste + Karte:** Chip-Leiste = Suchprofile + Schnellfilter (Rendite ≥ 3 %,
  bis 1,5 Mio existieren). Chip „+ Filter" → Filter-Sheet. Zeilen-Tap →
  Objektseite. Karten-Pin-Tap → Mini-Card unten → Objektseite.
- **Profil-Avatar oben rechts** (neu): Einstieg ins Portal. Die Explore ist
  Teil des Portals, kein Satellit.

### 6.4 Objektseite

| Element | Klick → |
|---|---|
| Galerie | Vollbild ohne Chrome (P4), raumweise gruppiert; Grundriss-Sektion mit tappbaren Raum-Punkten → springt zu Raumfotos (Zillow-Showcase-Prinzip, +60 % Views) |
| Merken-Herz + Like-Zahl | Optimistic Toggle + Collection-Picker bei Long-press |
| „Besichtigung buchen" | **Slot-Picker-Sheet** (6.8): 3 echte Slots + „Anderer Termin" → Objekt-Chat |
| „Anbot legen" | Anbot-Drawer (existiert): Betrag + Presets, NEU: Bindungsfrist-Hinweis („Ihr Anbot ist 10 Tage bindend") + Kaufkraft-Badge + Markt-Kontext („3 weitere Interessenten aktiv", nur echt) → Senden = Zustand anbot_aktiv, Ereignis-Karte, Kaufanbot-Dokument entsperrt |
| Status-Pill (bei aktivem Prozess, ersetzt CTA je Tabelle 5) | Kaufreise bzw. Anbot-Sheet |
| Dokumente „Ansehen" | Dokument-Viewer-Sheet (Demo: gerendertes PDF-Preview-Bild), „Teilen" und „In mein Archiv" |
| Rendite-/Rate-Zeile in den Kennzahlen | Sheet: Rechenweg transparent (Jahresnettomiete ÷ Kaufpreis, UNIO-Vermietdaten; bzw. Rate aus Kaufkraft), Anti-Zestimate: immer mit Konfidenz/Herkunft |
| Makler-Karte | Objekt-Chat (ein Thread, 6.6) |
| „Ähnliche Objekte" | Objektseite des geklickten Objekts |
| Preisverlauf (neu, Rightmove-Learning) | Mini-Sparkline in den Kennzahlen; Tap → Sheet mit Preis-Timeline des Inserats |

### 6.5 Merkliste (Collections)

| Element | Klick → |
|---|---|
| Collection-Karten („Meine Merkliste", „Anlage 2027", + Neu) | Push → Collection-Detail |
| „+ Partner einladen" | Share-Sheet (Demo: Partner „J." erscheint mit Avatar) |
| „Mit Makler teilen" | Bestätigungs-Sheet → Makler kann kommentieren und Off-Market-Objekte einspielen (Compass-Collections-Prinzip; Private-Exclusive-Karten tragen „Nur bei UNIO"-Badge) |
| Objekt-Karte in Collection | Objektseite |
| Kommentar-Icon an Karte | Objekt-Chat-Thread (derselbe wie überall, 6.6) |
| „Vergleichen" (2 Objekte selektieren) | Vergleichs-Sheet: side-by-side Kennzahlen + Fotos (RealScout-Prinzip) |
| Herz-Reaktionen des Partners | sichtbar als Mini-Avatar an der Karte + Ereignis im Aktivitäts-Stream |

### 6.6 Aktivität (ein Stream statt zwei Systeme)

Segment-Control: **Alle / Nachrichten.** Jede Ereignis-Karte hat genau eine
Aktion:

| Ereignis | Karte zeigt | Aktion |
|---|---|---|
| Neuer Suchprofil-Treffer | Mini-Foto + Profilname | → Objektseite |
| Preisänderung gemerktes Objekt | alt → neu, Prozent | → Objektseite |
| Gegenangebot erhalten | Betrag + Frist-Countdown (echt!) | → Reaktions-Sheet (6.7) |
| Besichtigung morgen | Zeit + Adresse | → Termin-Sheet (Route, verschieben, absagen) |
| Nach Besichtigung | „Wie war Top 12?" | → Feedback-Sheet (Homeday-Prinzip: 3 Taps + optionales Sofort-Anbot) |
| Baufortschritt gefolgtes Projekt | Story-Ring | → Story-Viewer |
| Grätzl verkauft (Slutpreis) | „Nebenan verkauft: € 890k" | → Preisarchiv-Sheet |
| Makler-Nachricht | Chat-Preview | → Objekt-Chat |

**Chats:** pro Objekt EIN Thread (Makler + Partner). Im Thread: Aktions-Chips
über dem Eingabefeld, kontextabhängig vom Objekt-Zustand („Termin ändern",
„Anbot ansehen", „Unterlagen anfordern"). UNIO-Concierge ist ein eigener
Thread für objektübergreifende Prozesse (Finanzierung, Anwalt). Antwortzeit-
Versprechen sichtbar im Thread-Header („antwortet ⌀ < 2 h"): Anti-Zillow.

### 6.7 Kaufreise (die Sendungsverfolgung, Europas Lücke)

Erreichbar über Start-Karte, Objektseiten-Pill, Ereignis-Karten. Eine Seite
pro Objekt mit aktivem Prozess:

- **Phase Anbot:** Dein Anbot, Status, Frist. Bei Gegenangebot: Reaktions-Sheet
  mit exakt 3 Wegen: **Annehmen** (→ Zustand angenommen, Vertragsphase startet,
  Concierge-Task „Anwalt wählen" erscheint) / **Neues Anbot** (Drawer, vorbefüllt
  mit Mittelwert) / **Ablehnen** (→ Archiv, freundlicher Abschluss + „Ähnliche
  Objekte"). Kein vierter Weg, kein totes Ende.
- **Phase Abwicklung:** Stepper Kaufvertrag → Treuhand → Grundbuch → Übergabe
  (der standardisierte AT-Prozess). Jede Phase hat Status, zuständige Person
  (Foto + Name: Makler, Anwalt, Treuhänder) und max. 1 offene Aufgabe für den
  Käufer („Vertragsentwurf freigeben", „Termin Übergabe wählen" → Slot-Picker).
- **Concierge-Tasks docken an Phasen an** (Abschnitt 7): Finanzierung fixieren
  (nach Annahme), Anwalt wählen (Vertragsphase), Möbel/Einrichtung (nach
  Übergabe, dezent, nie davor).
- **Nebenkosten-Transparenz:** einmalige Karte „Was kommt dazu": GrESt 3,5 %,
  Eintragung 1,1 %, Vertragserrichtung, Provision, live gerechnet auf den
  Kaufpreis. Vertrauen durch Vorwegnahme.
- **Nach Grundbuch:** Objekt wandert zu „Eigentum" (Profil): Dokumente,
  Marktwert-Verlauf (jährliches „Dein Objekt heute"-Update als Ereignis),
  „Vermietung mit UNIO" (→ Concierge-Thread), Hausverwaltung-Kontakt.

### 6.8 Geteilte Bausteine (einmal bauen, überall verwenden)

| Baustein | Verwendet in |
|---|---|
| **Slot-Picker-Sheet** (3 Slots + „anderer Termin") | Besichtigung, Zweitbesichtigung, Finanzierungsgespräch, Vertragstermin, Übergabe |
| **Anbot-Drawer** (Betrag, Presets, Frist, Kontext) | Erstanbot (Objektseite), neues Anbot (Reaktions-Sheet), Sofort-Anbot (Feedback-Sheet) |
| **Collection-Picker** | Merken im Feed, in der Liste, auf der Objektseite |
| **Dokument-Viewer-Sheet** | Objektseite, Kaufreise, Profil-Archiv, Chat-Anhänge |
| **Objekt-Chat-Thread** | Aktivität, Objektseite, Merkliste-Kommentare, Kaufreise |
| **Preisarchiv-Sheet** (Grätzl) | Start-Karte, Ereignis-Karten, Objektseite-Marktdaten |

### 6.9 Profil

| Element | Klick → |
|---|---|
| Suchprofile (Liste, existiert) | Bearbeiten → Sheet (gleiche 5 Quiz-Screens als Editor); Neu → Quiz-Sheet; Toggle aktiv/pausiert (existiert); „Treffer ansehen" → Entdecken-Liste mit aktivem Profil-Chip |
| Kaufkraft-Karte | Sheet: 3 Felder Selbstangabe → lokales Budget; „Prüfen lassen" → Concierge-Thread + Status „In Prüfung" → verifiziertes Badge |
| Haushalt | Partner einladen / entfernen |
| Benachrichtigungen | pro Suchprofil: Sofort / Täglich / Aus; pro Ereignistyp: an/aus. Default: Sofort nur Suchprofil-Treffer + Anbot-Ereignisse, Rest täglicher Digest (Anti-Spam) |
| Dokumente-Archiv | Liste nach Objekt gruppiert → Dokument-Viewer |
| Eigentum | Objektkarte → Eigentums-Ansicht (6.7 Ende) |
| Abmelden | Bestätigungs-Sheet → Rolle wechselt zurück (Demo) |

---

## 7. Concierge-Prozesse: ein Prozess pro Thema, viele Andockpunkte

**Problem heute:** „Finanzierung anfragen", „Anwalt für Verträge",
„Möbel-Empfehlungen" sind 3 tote Buttons pro Angebot: Sie würden 3 parallele
Prozesse pro Objekt erzeugen (bei 3 Angeboten = 9 Prozesse).

**Lösung:** Pro Thema existiert genau EIN Concierge-Prozess pro Nutzer (nicht
pro Objekt), sichtbar als ein Thread im Aktivitäts-Stream und als Status im
Profil:

| Concierge | Startpunkte (alle führen zum SELBEN Prozess) | Zustände |
|---|---|---|
| **Finanzierung** | Kaufkraft-Karte, Anbot-Drawer („mit Finanzierungs-Badge anbieten"), Kaufreise-Task, Chat-Chip | nicht gestartet → Selbstangabe → in Prüfung → verifiziert (Badge überall) → fixiert (nach Kaufabschluss-Start) |
| **Recht/Vertrag** | Kaufreise-Vertragsphase (Task „Anwalt wählen": UNIO-Partner oder eigener), Chat-Chip | offen → gewählt → Entwurf liegt vor → freigegeben |
| **Einrichtung** | NUR nach Übergabe (Eigentums-Ansicht + ein dezentes Ereignis) | optional, nie davor: Möbel-Pitch vor dem Kauf wirkt gierig |

Startet ein Nutzer die Finanzierung vom zweiten Objekt aus, öffnet sich der
bestehende Prozess mit Kontext-Chip des Objekts, kein zweiter Prozess.

---

## 8. Gamification-Layer (legitim, weil echt)

| Mechanik | Umsetzung | Warum es nicht billig ist |
|---|---|---|
| For-You-Feed | Signale: Verweildauer, Galerie-Tiefe, Likes, Merken, **Wiederbesuch** (stärkstes Signal) | Überraschung liegt im Inventar |
| Match der Woche | 1 kuratierte Karte, wöchentlich, mit Begründung | Hinge-Prinzip: Knappheit durch Kuration, nicht durch Limit |
| Collections | kollaborativ, teilbar, Makler-Beteiligung | Airbnb-Prinzip, echter Nutzen (60 % suchen zu zweit) |
| Objekt-Badges | „Meistgemerkt diese Woche", „Preis gesenkt", „Nur noch 2 Einheiten" | nur aus echten Daten, ein Badge pro Karte |
| Kaufbereitschafts-Ring | Profil-Fortschritt: Suchprofil ✓ Kaufkraft ✓ Partner ✓ erste Besichtigung ✓ | Fortschritt in der Sache, nicht im App-Konsum |
| Story-Ringe | nur für echte, datierte Projekt-Updates (Baufortschritt) | Ring = „hier gibt es Ungesehenes", Inhalt echt |
| Caught-up-Moment | nach kuratierten Karten im Feed | Guilt-free Stopping Point = Trust-Signal |
| Grätzl-Preisarchiv | echte Verkaufspreise (IMMOunited-Daten) als Recherche-Honeypot | zieht auch Nicht-Käufer, Hemnet-Beweis |
| Träum-Modus | Toggle in der Explore: Budget-Filter aus, „nur schauen" | Zillow-Surfing bewusst erlauben, Merkliste als weiche Brücke zum Lead |
| **Bewusst NICHT** | Streaks, Punkte, Leaderboards, Konfetti, Fake-Countdowns, Confirmshaming, Frühzugang gegen Geld | High-Trust-Produkt, ImmoScout-Ressentiment-Learning |

---

## 9. Push-Matrix (Ereignis → Kanal → Steuerung)

| Ereignis | Default | steuerbar |
|---|---|---|
| Neuer Suchprofil-Treffer | Sofort-Push | pro Profil: Sofort/Täglich/Aus |
| Preisänderung gemerktes Objekt | Sofort-Push | pro Ereignistyp |
| Gegenangebot / Anbot-Status | Sofort-Push + E-Mail | nicht abschaltbar (transaktional) |
| Besichtigungs-Reminder | Push T-1 Tag + T-2 h | an/aus |
| Partner-Aktivität in Collection | täglicher Digest | an/aus |
| Baufortschritt gefolgtes Projekt | Digest | an/aus |
| Grätzl-Verkauf | wöchentlicher Digest | an/aus |
| Kaufreise-Phasenwechsel | Sofort-Push + E-Mail | nicht abschaltbar |

Regel: Sofort-Pushes nur für Ereignisse, auf die man handeln kann. Alles
Informative wandert in Digests. Nie ein Push ohne echtes Ereignis.

---

## 10. Challenge-Durchgang (und was er geändert hat)

Der fertige Plan wurde gegen 10 harte Fragen geprüft:

1. **„Angebote hat keinen Tab mehr, findet man sie noch?"** Risiko real.
   Lösung im Plan verankert: Kaufreise-Karte ist ab dem ersten Anbot GEPINNT
   an Position 1 des Start-Tabs, zusätzlich Status-Pill auf jeder Objektseite
   und nicht abschaltbare Pushes. Ein aktives Anbot ist damit von 4 Orten aus
   erreichbar, ein leerer Tab von null.
2. **„Ist der Frist-Countdown beim Gegenangebot nicht Fake-Urgency?"** Nein,
   aber nur solange er die echte rechtliche Bindungsfrist des Anbots zeigt.
   Konsequenz: Countdown-Komponente erlaubt NUR Fristen aus dem Anbot-Objekt,
   nie Marketing-Fristen. In P11 festgeschrieben.
3. **„Kaufkraft-Abfrage = Datensensibilität + Absprung?"** Deshalb: nie im
   Onboarding, immer optional, Selbstangabe bleibt lokal (Demo: localStorage),
   Nutzenversprechen am Sheet („Damit zeigen wir dir nur Leistbares"), und
   das Produkt funktioniert vollständig ohne (Badge fehlt dann einfach).
4. **„Feed-Badges + Ereignis-Karten + Story-Ringe = Clutter?"** Ja, wenn alles
   gleichzeitig. Konsequenz: P9 (ein Badge pro Karte, feste Priorität),
   Ereignis-Karten max. 1 pro 5 Objekt-Karten, Story-Ringe nur bei echten
   Updates, sonst unsichtbar (ein leerer Ring ist tot).
5. **„Hemnet-Live-Bieten funktioniert in Wien nicht."** Korrekt, Bieterverfahren
   sind in AT selten und das Anbot ist bindend. Der Plan kopiert deshalb NICHT
   den Gebots-Ticker, sondern nur den Ereignis-Stream (Preisänderung, Status,
   finale Grätzl-Preise) und die Anbot-Reaktion als geschlossenen 3-Wege-Flow.
6. **„Makler in Collections: Kontrollverlust-Gefühl beim Kunden?"** Teilen ist
   opt-in pro Collection, der Makler sieht nur geteilte Listen, und seine
   Beiträge sind als solche markiert („Vorschlag von Lukas"). Vertrauen durch
   Asymmetrie: Der Kunde sieht alles, der Makler nur Freigegebenes.
7. **„Partner-Kollaboration ohne Backend?"** Demo-Simulation: vordefinierter
   Partner reagiert zeitversetzt (Kommentar erscheint nach Rückkehr in den
   Tab). Reicht, um den Flow zu verkaufen; echte Sync ist Plattform-Aufgabe.
8. **„Explore (vanilla JS) und Portal (React) teilen State wie?"** Über
   definierte localStorage-Keys als Contract: `unio_ek_profil`,
   `unio_ek_beziehungen` (Map objektId → Zustand), `unio_ek_collections`,
   `unio_ek_events`. Beide Flächen lesen/schreiben dieselben Keys; die
   bestehenden Keys (likes/seen) wandern hinein. Das ist Etappe-1-Arbeit und
   Voraussetzung für alles andere (sonst bleibt z. B. ein Anbot aus der
   Objektseite im Portal unsichtbar, heutiger Zustand).
9. **„Träum-Modus kannibalisiert Ernsthaftigkeit?"** Nein: Er ist explizit
   (Toggle), verändert nur den Budget-Filter und die Merkliste bleibt die
   Brücke zurück. Zillow-Daten zeigen: Traum-Nutzer SIND die Pipeline.
10. **„Zu viel auf einmal gebaut?"** Deshalb Etappen:
    - **Etappe 1 (Fundament):** geteilter State (Keys oben), Objekt-Beziehung
      als State-Machine, zustandsabhängige CTA-Leiste, Anbot aus Objektseite
      erscheint im Portal, Highlights führen zum richtigen Objekt.
    - **Etappe 2 (Herzstück):** neue 5-Tab-IA, Aktivitäts-Stream mit
      Ereignis-Karten, Gegenangebots-Reaktions-Sheet, Slot-Picker überall,
      Onboarding-Quiz, Kaufkraft-Selbstangabe + Badges.
    - **Etappe 3 (Differenzierung):** Kaufreise-Tracker bis Grundbuch,
      Collections kollaborativ + Makler-Sharing, Match der Woche, Story-Ringe,
      Grätzl-Preisarchiv, Träum-Modus, Caught-up-Moment, Vergleichs-Sheet.

**Erfolgskriterium je Etappe:** Kein Button ohne Wirkung. Nach Etappe 1 gilt:
Jeder heute tote Button (Inventar liegt vor: Bearbeiten, Profil anlegen,
Finanzierung, Anwalt, Möbel, Dokumente ansehen, Besichtigung, Aktualisieren,
Abmelden, Chat-mit-X-Deep-Link) hat entweder einen echten Flow oder existiert
nicht mehr.

---

*Arbeitsstand. Preise, Fristen und Rechtsaussagen (Bindungsfrist, Nebenkosten)
sind Demo-Inhalte und vor Produktivgang juristisch zu prüfen.*
