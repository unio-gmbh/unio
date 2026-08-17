# UNIO Makler-Dashboard: Ausführungsplan & Prozesslogik

> Version 1.0 · 17.08.2026 · Basis: Deep Research US-Agent-Plattformen
> (Compass, Follow Up Boss, kvCORE, Dotloop/SkySlope, Zillow, Sierra),
> DACH-Maklersoftware (onOffice, Propstack, FlowFact, JUSTIMMO, EDI-Real)
> und Desktop-UI-Patterns (Linear, Superhuman, Things 3, Attio).
> Anhang: docs/MAKLER_RESEARCH_2026-08.md · Schwester-Dokument:
> docs/ENDKUNDEN_PORTAL_PROZESSLOGIK.md
> Gewichtung: Desktop-first (Makler arbeitet am Schreibtisch), verdichtet
> sauber auf Tablet/Mobil. Abschnitt 11 enthält den Challenge-Durchgang.

---

## 1. Leitidee: zwei Sätze

**Der Tag ist die App.** Der Makler startet nicht auf einem KPI-Friedhof,
sondern in einer Today-View mit erreichbarem Null-Zustand: unbeantwortete
Kommunikation, fällige Aufgaben, priorisierte Chancen, in dieser Reihenfolge,
mit einem echten „Alles erledigt"-Moment (Follow-Up-Boss-Muster, das
bewährteste Makler-Ritual der Branche).

**Ein Zustand, zwei Perspektiven.** Die Objekt-Beziehung des Endkunden
(gemerkt → Termin → Anbot → Gegenangebot → Abwicklung → Eigentum) IST aus
Makler-Sicht der Deal. Beide Seiten lesen dieselbe State-Machine, der Makler
sieht sie als Pipeline, der Kunde als Kaufreise. Wenn der Makler in seiner
Angebots-Ansicht „Gegenangebot senden" klickt, erscheint beim Kunden das
Reaktions-Sheet, und umgekehrt. Kein Prozess existiert doppelt.

Drei Research-Kernbefunde tragen den Plan:

1. **Die Gewinner-UX ist immer das eine Objekt mit allem dran, nie das
   Modul.** Follow Up Boss: ein Kontakt = ein Thread über alle Kanäle.
   Dotloop: ein Deal = ein Loop (Dokumente + Beteiligte + Aufgaben).
   Verlierer wie kvCORE und FlowFact sind Feature-Friedhöfe, von denen
   Makler am Ende nur CRM + Inbox nutzen.
2. **Speed-to-Lead ist die umsatzrelevanteste Zahl des Maklers:** Antwort
   binnen 5 Minuten macht Qualifizierung ~21x wahrscheinlicher, 78 % der
   Käufer arbeiten mit dem Agent, der zuerst antwortet. Median der Branche:
   47 Minuten. Ein sichtbarer Timer am neuen Lead ist mehr wert als jedes
   Chart.
3. **DACH-spezifisch gewinnt, wer Doppeleingaben eliminiert und Compliance
   zu Workflow-Gates macht:** Objektdaten einmal erfassen (Exposé, Portale,
   Bericht, Anbot speisen sich daraus), Eigentümer-Report auf Knopfdruck,
   FAGG/Provisionsvereinbarung/Energieausweis/KYC als Checkpoints im Deal
   statt als PDF-Ordner.

---

## 2. Designprinzipien Desktop (verbindlich)

| # | Regel | Konkret |
|---|---|---|
| D1 | Sidebar: max. 8 Arbeits-Bereiche | 240-280px, einklappbar auf Icon-Rail; System-Punkte (Einstellungen, Integrationen, Rollen) unten als Zahnrad, nicht Top-Level |
| D2 | Master-Detail statt Seitenwechsel | Liste links (320-360px fix), Detail rechts; unter 720px gestapelt |
| D3 | Slide-Over (480-640px) für Lesen und kleine Edits | Lead-Detail, Objekt-Quickview, Aktivität. Fullpage nur für eigenen Arbeitskontext (Exposé komponieren, Wizard) |
| D4 | Jede View und jedes Objekt hat eine URL | auch Slide-Overs; Teilen und Zurück funktionieren immer |
| D5 | Tabellen: 44-48px Zeilen, tabellarische Ziffern | Hover-Aktionen statt Dauer-Buttons, Bulk-Leiste erst bei Selektion, Inline-Edit für Status/Termin/Preis |
| D6 | Command-K als zweite Navigation | Objekte (Kontakte, Immobilien, Deals), Aktionen (Termin anlegen, Status setzen), Views; lokal, < 50ms |
| D7 | G-Shortcuts + Einzeltasten | G-H Heute, G-K Kontakte, G-O Objekte, G-D Deals; C = neu, E = erledigt, H = Snooze, ? = Cheatsheet |
| D8 | Motion < 100ms, nur opacity/transform | optimistisches Drag-and-drop in Pipelines, nie Spinner für Statuswechsel |
| D9 | Views sind Linsen, keine Module | Pipeline = Kontakte/Deals als Kanban; Tabelle/Kanban/Timeline auf denselben Daten; gespeicherte Views pinnbar |
| D10 | Snooze überall | jede Zeile/Karte mit natürlicher Sprache („2d", „Montag") verschiebbar; nur so bleibt Heute ehrlich leerbar |
| D11 | AI still integriert | Empfehlungen erscheinen geflaggt im Workflow mit Begründung („3x LENS-Aufrufe diese Woche"), nie als Sparkle-Button oder Chatbot-Tab |
| D12 | Keine sichtbare Gamification | kein Konfetti, keine Punkte; Belohnung ist der Zero-State (kuratiertes Wiener Architektur-Foto) und die Tagesbilanz |

---

## 3. Informationsarchitektur: von 18 Sidebar-Punkten zu 8

**Heute:** 18 Einträge in 4 Gruppen, davon führen 7 ins Leere (Suggested
Actions, Abgeber-Leads, Portale, Medien, Integrationen, Rollen & Rechte,
Einstellungen sind nicht geroutet und fallen auf das Dashboard zurück).
Leads, Kontakte und Abgeber-Leads sind drei getrennte Listen für dasselbe
Datenobjekt.

**Neu (Sidebar, Desktop):**

| Bereich | Inhalt | Ersetzt |
|---|---|---|
| 1. **Heute** | Today-View mit Triage-Inbox, Termin-Zeitachse, Momentum-Deals, Zero-State | Dashboard + Suggested Actions |
| 2. **Kalender** | Wochen-/Tagesansicht, Besichtigungs-Slots verwalten (speist den Slot-Picker der Endkunden) | Kalender |
| 3. **Kontakte** | EIN Objekt für Käufer, Eigentümer, Empfehlungen; Typ und Phase als Filter-Views; pro Kontakt ein Thread | Leads + Kontakte + Abgeber-Leads |
| 4. **Objekte** | Objekt-Akten mit Vermarktungsreife-Checkliste, Portal-Sync-Status, Medien, Eigentümer-Report-Knopf; Anlage-Wizard; Projekt-Ansicht | Immobilien + Entwürfe & Anlage + Medien + Portale |
| 5. **Deals** | Zwei Pipelines als Views: Eigentümer-Akquise (Lead → Bewertung → Alleinvermittlung) und Käufer-Deals (Interessent → Besichtigung → Anbot → Abwicklung); Anbots-Verwaltung lebt hier | Angebote |
| 6. **CIRCLE** | Community, Lead-Pool (Pond mit Claim + Auto-Rückfall), Referral, Votings, Saisonrückblick | CIRCLE |
| 7. **Marketing** | Shop (inkl. Auftrags-Prozess, existiert), Meta-Kampagnen, Content | Shop + Meta Marketing |
| 8. **Ziele** | GCI-/Umsatzziel mit „on pace"-Anzeige, heruntergebrochen auf Wochenaktivitäten; Statistiken | Statistiken |
| ⚙ unten | Einstellungen, Integrationen, Rollen & Rechte, Portal-Konten | System-Gruppe |

Regeln: Kein Sidebar-Punkt ohne gerouteten, vollwertigen Screen. Portale und
Medien sind keine Ziele, sondern Eigenschaften der Objekt-Akte (Sync-Status,
Medien-Tab). Abgeber-Leads sind Kontakte vom Typ Eigentümer in der
Akquise-Pipeline.

---

## 4. Datenmodell: vier Objekte, viele Fenster

```
Kontakt ──── Thread (alle Kanäle: Mail, Anruf, WhatsApp, Portal-Anfrage, Portal-Chat)
   │  ╲
   │   Suchprofil(e)  ← matcht gegen →  Objekt ──── Akte (Daten, Medien, Dokumente,
   │                                       │         Portal-Sync, Checkliste, Bericht)
   ▼                                       ▼
 Deal (verbindet Kontakt + Objekt) ─── Phasen + Checkliste + Compliance-Gates
   │
   └── Aufgaben/Ereignisse (speisen Heute und Aktivitäts-Streams)
```

- **Kontakt**: Person mit Typ (Käufer, Eigentümer, beides), Phase,
  Kaufkraft-Status (aus dem Endkunden-Portal!), Suchprofilen und genau EINEM
  Kommunikations-Thread. Aktivitäts-Timeline chronologisch (HubSpot-Prinzip).
- **Objekt**: die Akte. Einmal erfasste Daten speisen Exposé, Portale,
  Anbote und den Eigentümer-Report (null Doppeleingabe). Trägt die
  Vermarktungsreife-Checkliste (Fotos, Energieausweis, Grundbuch, Preis)
  und den Portal-Sync-Status pro Kanal (willhaben, ImmoScout, unio.at) mit
  Fehlerzuständen.
- **Deal**: verbindet Kontakt und Objekt, hat einen Typ (Akquise oder
  Verkauf) und Phasen mit Checklisten. **Die Verkaufs-Phasen sind exakt die
  Zustände der Endkunden-State-Machine** (Tabelle in Abschnitt 5). Jeder
  Deal trägt sichtbar die nächste geplante Aktion; ohne Folgeaktivität wird
  die Karte visuell „faul" (Pipedrive-Rotting).
- **Aufgabe/Ereignis**: alles, was in Heute auftaucht, mit Snooze und
  Delegation (an den Concierge oder CIRCLE-Kollegen).

---

## 5. Ein Zustand, zwei Perspektiven (die Verkaufs-Pipeline)

Dieselbe State-Machine wie in der Endkunden-Prozesslogik, gespiegelt:

| Endkunde sieht | Zustand | Makler sieht (Deals-Spalte) | Makler-Aktionen |
|---|---|---|---|
| Objekt im Feed | entdeckt | (Interessenten-Zähler am Objekt) | - |
| Merkliste | gemerkt | Spalte „Interessiert" | Exposé senden (mit Namhaftmachung + FAGG-Doku), Besichtigung anbieten |
| Termin fixiert | termin | Spalte „Besichtigung" | Slot bestätigen, verschieben, Feedback anfordern |
| Feedback-Sheet | besichtigt | Spalte „Nachfassen" | Anruf, Sofort-Anbot vorschlagen |
| Anbot 10 Tage bindend | anbot_aktiv | Spalte „Anbot" mit Frist-Timer | Dem Verkäufer vorlegen, **Annehmen**, **Ablehnen**, **Gegenangebot senden** |
| Reaktions-Sheet (3 Wege) | gegenangebot | Spalte „Verhandlung" | Erinnern (vor Fristablauf), neues Gegenangebot |
| Kaufreise-Tracker | abwicklung | Spalte „Abwicklung" mit Phasen-Stepper | Checkliste je Phase (KYC/WiEReG-Gate!, Vertrag, Treuhand, Grundbuch), Übergabe-Slot anbieten |
| „Dein Eigentum" | eigentum | Spalte „Abgeschlossen" + Provisionsabrechnung | After-Sales-Sequenz startet (Bewertung, Empfehlung) |

Die heute toten Buttons der Angebote-Seite (Annehmen, Ablehnen, Erinnern)
werden damit zu echten Zustandswechseln, die SOFORT im Endkunden-Portal
ankommen (Ereignis-Karte, Push, Kaufreise). Das ist der Demo-Wow-Moment:
zwei Browserfenster, Makler klickt „Gegenangebot € 1.720.000", beim Kunden
erscheint das Reaktions-Sheet.

---

## 6. Heute: die Today-View im Detail

Aufbau in 5 Zonen (Desktop einspaltig zentriert, max. 760px Inhaltsbreite):

1. **Kopfzeile (ruhig)**: Datum, Begrüßung, drei stille Kennzahlen als Text:
   offene Antworten, Termine heute, Antwortzeit-Trend (privat). Keine Charts.
2. **Jetzt / Als Nächstes**: der nächste Termin als Karte mit
   Ein-Klick-Aktionen (Route, Anruf, Objekt-Akte), daneben die
   Tageszeitachse mit Jetzt-Marker.
3. **Triage-Inbox (Herzstück)**: EINE priorisierte Liste aus neuen Leads
   (mit **Speed-to-Lead-Timer**: „vor 2 Min eingegangen"), unbeantworteten
   Nachrichten, fälligen Follow-ups, Anbots-Fristen und Kunden-Ereignissen
   (Feedback eingegangen, Kaufkraft verifiziert). Jede Zeile: genau eine
   Primär-Aktion + E (erledigt) + H (Snooze) + Delegieren. Ziel ist Null.
4. **Momentum**: 2-3 Deals, denen genau ein Schritt fehlt („Ein Anruf fehlt
   zur Besichtigung", „Anbot-Frist läuft in 2 Tagen ab"), als sanfte Karten.
   Dazu max. 1 geflaggte UNIO-Signal-Empfehlung mit Begründung
   („Eigentümer-Chance: 3x LENS-Aufrufe der Bewertung diese Woche",
   Likely-to-Sell-Prinzip).
5. **Zero-State**: alles erledigt → Zonen 3-4 verschwinden, ein
   bildschirmfüllendes kuratiertes Wien-Foto erscheint mit Tagesbilanz
   („Alles erledigt. 6 Antworten, 2 Besichtigungen fixiert, Antwortzeit
   ⌀ 11 Min."). Das Superhuman-Prinzip: Emotion an den Workflow koppeln,
   ohne Punkte.

Das AI-Daily-Briefing (Zone 3-Kopf) fasst morgens in zwei Sätzen zusammen,
was heute zählt, mit One-Click-Aktionen. AI erscheint nur hier und als
Begründungs-Flag, nie als eigener Tab (D11).

---

## 7. Subseiten-Prozesslogik: jeder Klick

### 7.1 Kontakte

| Element | Klick → |
|---|---|
| Zeile | Slide-Over: Akte mit Thread (alle Kanäle chronologisch), Suchprofilen, Deals, Dokumenten |
| Inline: Phase/Zuständig | Dropdown in der Zelle, optimistisch |
| „Nachricht" im Slide-Over | Composer im Thread (Mail/SMS-Tab), Vorlagen-Picker |
| „Sequenz starten" | Action-Plan-Picker (Neukäufer-Nurture, Eigentümer-Farming, After-Sales); am Kontakt sichtbar: „Tag 4 von 21 · pausiert bei Antwort" |
| „Objekt vorschlagen" | Matching-Sheet: Suchprofil-Treffer aus dem Bestand, Senden = Exposé-Mail mit Namhaftmachungs-Doku + Ereignis beim Endkunden |
| Kaufkraft-Badge (verifiziert/Selbstangabe) | Read-only-Detail: Budget, Rate, Status; Quelle Endkunden-Portal |
| „Lead verloren" (heute tot) | Grund-Sheet (Preis, Timing, Mitbewerb, unerreichbar) → Archiv + optional Re-Nurture-Sequenz in 6 Monaten |
| Views-Leiste | „Neue Leads" (mit Timern), „Heiß, 7 Tage still", „Eigentümer", „Alle"; als Tabelle oder Kanban (D9) |

### 7.2 Objekte

| Element | Klick → |
|---|---|
| Karte/Zeile | Objekt-Akte (Fullpage): Kennzahlen, Medien, Dokumente, Interessenten, Aktivität |
| Vermarktungsreife-Checkliste | Fotos ✓ Energieausweis ✓ Grundbuch ✓ Preisstrategie ✓ Exposé ✓; erst bei 100 % wird „Veröffentlichen" aktiv (Compliance-Gate) |
| „Veröffentlichen" | Kanal-Sheet: unio.at + willhaben + ImmoScout mit Live-Sync-Status je Kanal (OK, ausstehend, Fehler mit Grund) |
| „Eigentümer-Report" | EIN Klick: aggregierter Bericht (Reichweite, Anfragen, Besichtigungen, Feedback-Zitate, nächste Schritte) als Vorschau → „An Eigentümer senden"; erledigt das größte manuelle Nervthema der Branche |
| Interessenten-Tab | Liste der Endkunden-Beziehungen zu diesem Objekt (gemerkt/Termin/Anbot) → Deal öffnen |
| „Shooting buchen" | Shop-Auftrag (existierender Prozess mit Terminwahl und Korrekturschleifen) direkt aus der Akte |
| „Exposé erhalten" (heute tot, Interessenten-Zeile) | markiert Zustellung + Namhaftmachung im Audit-Trail |
| Anlage-Wizard | bleibt; endet mit „Zur Checkliste" statt im Nichts |

### 7.3 Deals (Pipeline)

| Element | Klick → |
|---|---|
| Pipeline-Switcher | Views: „Käufer-Deals" / „Eigentümer-Akquise" (D9) |
| Karte | Slide-Over: Deal mit Kontakt, Objekt, Phase, Checkliste, Fristen, Thread-Auszug |
| Drag in andere Spalte | optimistischer Zustandswechsel; wenn Gate offen (fehlendes Pflichtdokument, KYC), blockt das Sheet mit konkreter Aufgabe |
| „Annehmen" (Anbot) | Bestätigungs-Sheet mit Provisionsvorschau → Zustand angenommen → beim Kunden startet die Abwicklung |
| „Gegenangebot" | Betrag-Sheet (Presets) → beim Kunden erscheint das Reaktions-Sheet mit Frist |
| „Ablehnen" | Grund-Sheet → Kunde bekommt freundliche Absage + „Ähnliche Objekte" |
| „Erinnern" (Frist) | sendet dem Kunden ein echtes Frist-Ereignis (kein Fake-Druck: nur echte Bindungsfristen) |
| Abwicklungs-Phase | Checkliste je Schritt mit Zuständigen (Anwalt, Treuhänder) + KYC/WiEReG-Gate vor Vertragsphase, Audit-Trail |
| Abschluss | Provisionsabrechnung (85/100-Logik aus dem UNIO-Modell, Demo-Zahlen) + After-Sales-Sequenz startet automatisch |

### 7.4 CIRCLE

| Element | Klick → |
|---|---|
| **Lead-Pool (Pond)** | ungeclaimte Leads der Community mit Claim-Button; Accountability: kein Erstkontakt binnen 4 h → Auto-Rückfall in den Pool (kein Lead stirbt) |
| „Profil ansehen" (heute tot) | Mitglieds-Slide-Over: Fokus-Gebiete, gemeinsame Deals, Referral-Historie, Kontakt |
| „Alle Aktivitäten" (heute tot) | Aktivitäts-Stream des CIRCLE (Deals, Votings, Events) |
| Referral | „Lead weitergeben"-Sheet mit Provisions-Split-Vorschau (25 %-Referral-Logik als Demo) |
| Saisonrückblick, „Als Bild teilen" (heute tot) | rendert Share-Card (Canvas) zum Download |

### 7.5 Marketing (Shop + Kampagnen)

Shop mit Auftrags-Prozess existiert (Pakete, Listing-Kampagnen, Leads,
Stepper mit Korrekturschleifen). Ergänzungen: „Pausieren" (Meta, heute tot)
→ Zustandswechsel mit Bestätigung + Budget-Info; Kampagnen-Karten verlinken
auf die Objekt-Akte; Kampagnen-Ergebnisse (CPL, qualifizierte Leads) fließen
als Ereignisse in Heute.

### 7.6 Ziele

GCI-/Provisionsziel des Jahres → „on pace"-Anzeige (Sisu-Prinzip):
heruntergebrochen auf „diese Woche nötig: 8 Erstkontakte, 3 Besichtigungen".
Wochenreview jeden Montag als Heute-Karte („3 Abschlüsse näher, 5 Leads
warten"). Statistiken (Antwortzeit, Conversion je Quelle, Pipeline-Wert)
leben hier, nicht auf der Startseite.

---

## 8. Prozess-Zusammenführungen (vorher → nachher)

| Vorher (parallel) | Nachher (ein Prozess) |
|---|---|
| Leads + Kontakte + Abgeber-Leads (3 Listen) | EIN Kontakt-Objekt mit Typ und Phase, Views als Linsen |
| Angebote-Seite (tote Buttons) + Endkunden-Anbot (getrennt) | EIN Deal-Zustand, beide Perspektiven, jede Aktion kommt drüben an |
| Portale + Medien + Exposé (3 Orte pro Objekt) | Objekt-Akte: einmal erfassen, überall verwenden, Sync-Status sichtbar |
| Suggested Actions + Dashboard-KPIs + verstreute Hinweise | Triage-Inbox in Heute mit genau einer Aktion pro Zeile |
| Follow-ups manuell je Kontakt | Action-Plan-Sequenzen, die bei Antwort pausieren |
| Eigentümer-Kommunikation (Mail, Anruf, Bauchgefühl) | Eigentümer-Report auf Knopfdruck aus Akten-Daten |
| Compliance als Ordner (FAGG, KYC, Namhaftmachung) | Gates in Checklisten mit Audit-Trail, automatisch dokumentiert |
| Shop-Bestellung getrennt vom Objekt | „Shooting buchen" direkt aus der Akte in den bestehenden Auftrags-Prozess |

---

## 9. Bindungsmechaniken (legitim, weil arbeitsnah)

| Mechanik | Umsetzung | Warum es passt |
|---|---|---|
| Null-Zustand mit Belohnung | kuratierte Wiener Architektur-Fotos + Tagesbilanz | Superhuman-Beweis: Emotion am Workflow, ohne Kitsch |
| Speed-to-Lead-Timer | am neuen Lead + privater Wochentrend | direkt umsatzrelevant (21x-Faktor) |
| Momentum-Karten | „ein Schritt fehlt"-Deals | Fortschritt in der Sache |
| „On pace"-Ziel | Jahresziel → Wochenaktivitäten | Sisu-Prinzip, bindet täglich |
| Monday-Digest | Wochenreview als Heute-Karte | Wiederkehr-Anker ohne Push-Spam |
| Auto-Übertrag | Unerledigtes wandert ohne Schuldgefühl in den nächsten Tag (Cycles) | kein manuelles Aufräumen |
| Shortcut-Identität | ?-Cheatsheet, sanfte Hints | Könnerschaft als Belohnung |
| CIRCLE-Leaderboard | opt-in, mehrere Kategorien (Reaktionszeit, Most Improved), nie Bottom-Ranking | Zoho/HBR-Befund: sonst demotiviert es die Mitte |
| **Bewusst nicht** | Punkte, Badges, Konfetti, Streak-Flammen, öffentliche Rankings by default | Profi-Tool, Apple-Anmutung |

---

## 10. Umsetzungs-Etappen (Demo-Kontext)

Gemeinsamer State erweitert den bestehenden Contract:
`unio_mk_kontakte`, `unio_mk_deals` (liest/schreibt `unio_ek_beziehungen`!),
`unio_mk_heute` (Triage-Items), `unio_mk_ziele`. Die Endkunden-Keys bleiben
die Quelle der Wahrheit für Verkaufs-Deals.

- **Etappe 1 (Fundament):** Sidebar auf 8 Bereiche, alle toten Nav-Punkte
  geroutet oder entfernt; Kontakte-Vereinigung (3 Listen → 1 Objekt mit
  Views); Deals-Pipeline liest die Endkunden-State-Machine; Angebots-Aktionen
  (Annehmen/Ablehnen/Gegenangebot/Erinnern) wirken in beide Richtungen.
- **Etappe 2 (Herzstück):** Heute mit 5 Zonen, Triage-Inbox mit
  Speed-to-Lead-Timern, Snooze, Zero-State-Foto; Kontakt-Slide-Over mit
  Thread; Objekt-Akte mit Vermarktungsreife-Checkliste, Portal-Sync-Status
  und Eigentümer-Report-Knopf.
- **Etappe 3 (Differenzierung):** Command-K + G-Shortcuts; Action-Plan-
  Sequenzen; CIRCLE-Pond mit Claim/Auto-Rückfall + Referral-Split; Ziele mit
  on-pace; Abwicklungs-Checklisten mit KYC-Gate; Matching-Sheet
  („Objekt vorschlagen"); AI-Daily-Briefing + Signal-Flags.

**Erfolgskriterium je Etappe:** kein Button ohne Wirkung, kein Sidebar-Punkt
ohne Screen. Demo-Wow: zwei Fenster nebeneinander, Makler-Aktion erscheint
live beim Endkunden.

---

## 11. Challenge-Durchgang (und was er geändert hat)

1. **„8 Sidebar-Punkte, aber der Makler lebt in 3?"** Stimmt, und das ist
   gewollt: Heute, Kontakte, Deals sind der Alltag; Objekte, Kalender,
   CIRCLE, Marketing, Ziele sind Arbeitsräume mit klarem Zweck. Getestet
   wird die IA daran, dass die Triage-Inbox 90 % der Sprünge übernimmt
   (jede Zeile deep-linkt in den richtigen Kontext).
2. **„Verliert der Makler die Angebote, wenn sie in Deals aufgehen?"**
   Nein: „Anbote" ist eine gepinnte View der Deals-Pipeline (Filter Zustand
   anbot_aktiv/gegenangebot) und Anbots-Fristen erscheinen zusätzlich als
   Triage-Zeilen in Heute. Drei Wege statt einem leeren Tab.
3. **„Zwei Pipelines verwirren?"** Der Switcher ist eine Segment-Control mit
   klaren Labels, und Karten tragen die Gegenseite sichtbar (Akquise:
   Eigentümer-Name; Verkauf: Kontakt + Objekt). Kein Misch-Board.
4. **„State-Sync Makler ↔ Endkunde: Race-Conditions in der Demo?"** Beide
   Rollen schreiben in `unio_ek_beziehungen`. Demo-Konvention: letzte
   Schreibaktion gewinnt, jede Änderung erzeugt ein Ereignis mit Zeitstempel;
   die Portal-Views lesen bei Tab-Fokus neu (storage-Event). Reicht für die
   Demo, echte Konfliktlösung ist Plattform-Aufgabe.
5. **„KYC-Gate nervt im Demo-Flow?"** Das Gate ist im Demo EIN Klick
   („Demo: Prüfung bestanden"), aber sichtbar als Pflichtschritt mit
   Audit-Zeile. Es zeigt Compliance als Produktversprechen, ohne die Demo zu
   bremsen.
6. **„Zero-State-Foto: Kitsch-Gefahr?"** Nur kuratierte, ruhige
   Architektur-Fotografie (bestehende UNIO-Assets), Bilanz in einer Zeile,
   keine Emojis, kein „Glückwunsch!". Superhuman-Ton, nicht Duolingo.
7. **„Speed-to-Lead-Timer = Stress-Tool?"** Der Timer läuft nur auf NEUEN,
   unbeantworteten Leads und verschwindet mit der ersten Reaktion; der
   Wochentrend ist privat. Kein öffentliches Ranking by default (opt-in im
   CIRCLE).
8. **„Desktop-first vs. bestehendes DashShell?"** Das DashShell bleibt die
   Basis (Sidebar existiert), wird aber auf die neue IA umgebaut und bekommt
   eine Tablet-Verdichtung (Sidebar → Icon-Rail, Detail → Overlay). Kein
   Bottom-Tab-Layout wie beim Endkunden: der Makler arbeitet mit Maus und
   Tastatur.
9. **„Action Plans ohne Backend?"** Demo-Simulation wie beim Partner:
   Sequenz-Status am Kontakt („Tag 4 von 21"), zeitversetzte Demo-Antworten
   beim Tab-Fokus. Der Flow ist verkaufbar, echte Automation ist
   Plattform-Aufgabe.
10. **„Wo bleibt der Bauträger?"** Bewusst außerhalb dieses Plans: Die
    Rolle Bauträger behält ihr eigenes Dashboard; dieser Plan verändert nur
    die Makler-Rolle. Schnittstellen (Projekt-Objekte, Abverkaufs-Reporting)
    sind als Objekt-Akten-Typ „Projekt" vorbereitet.

**Anhang: Ist-Inventar der toten Elemente** (Stand heute): 7 ungeroutete
Sidebar-Punkte (Suggested Actions, Abgeber-Leads, Portale, Medien,
Integrationen, Rollen & Rechte, Einstellungen); tote Buttons: Dashboard
(„24 offen", „3 überfällig", „Bestätigen", „Zur Abrechnung"), Objekt-Akte
(„Exposé erhalten"), Leads („Lead als verloren markieren", „Anzeige öffnen",
„+ 10 weitere anzeigen"), CIRCLE („Alle Aktivitäten", „Profil ansehen",
„Als Bild teilen"), Angebote („Objekt: Alle"-Filter, „Erinnern", „Annehmen",
„Ablehnen"), Meta Marketing („Pausieren"), Statistiken („Zurücksetzen"),
Medien-Screen („Prompt anzeigen"). Jedes dieser Elemente hat in Abschnitt 7
einen definierten Flow oder entfällt.

---

*Arbeitsstand. Provisions-, Rechts- und Compliance-Darstellungen
(85/100-Modell, FAGG, KYC/WiEReG, Namhaftmachung) sind Demo-Inhalte und vor
Produktivgang juristisch zu prüfen.*
