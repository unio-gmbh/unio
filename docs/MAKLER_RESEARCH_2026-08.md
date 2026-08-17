# Makler-Research August 2026 (Anhang zur Makler-Prozesslogik)

> Drei Deep-Research-Reports als Quellenbasis für
> `MAKLER_DASHBOARD_PROZESSLOGIK.md`. Stand 17.08.2026.

---

## Report 1: US-Agent-Plattformen (Compass, Follow Up Boss, kvCORE, Dotloop/SkySlope, Zillow, Sierra)

### Compass: das Agent-OS als Referenz

Seit 2026 bündelt Compass alles in einer „Home Platform": CRM, CMAs,
Collections, Marketing Center, Business Tracker, Reverse Prospecting und
Compass One (Kundenportal) in EINEM Workflow. **Likely-to-Sell**: ML-Score
pro Immobilie (Verkaufswahrscheinlichkeit binnen 12 Monaten); UX-Entscheidung:
kein separates AI-Tool, die Empfehlungen erscheinen beim Login als geflaggte
Kontakte mit Begründung, nur Top-Dezile mit mindestens 2x Lift. **Compass AI
Assistant** liefert ein personalisiertes Daily Briefing mit Kontext über das
gesamte Business; populärster Workflow: „Zeig meine Likely-to-Sell-
Empfehlungen, priorisiere sie, entwirf Outreach-Nachrichten." **Compass One**
spiegelt die Transaktion kundenseitig als Milestone-Tracker (= das Prinzip
unserer Endkunden-Kaufreise, vom Makler aus gesehen).

### Follow Up Boss: Inbox-First

- **Ein Kontakt = ein Thread**: alle Anrufe, SMS, E-Mails chronologisch in
  einer Timeline, Team-Inboxen für gemeinsame Nummern. Der meistgeliebte
  Einzelaspekt des Produkts.
- **Action Plans**: getimte Follow-up-Sequenzen (Calls, Texts, Mails), starten
  automatisch bei Lead-Eingang oder Phasenwechsel, pausieren bei Antwort.
  „The single highest-leverage feature."
- **Smart Lists als Morgen-Routine** („Start Your Day Like a Boss"): 1) Inbox
  auf null, 2) Tasks abarbeiten, 3) 5-7 dynamische Listen leeren („Hot, kein
  Kontakt seit 7 Tagen"). Das klarste „Done for today"-Muster der Branche.

### kvCORE/BoldTrail: All-in-One mit Warnung

Verhaltensbasierte Lead-Scores, Smart Campaigns, **Ponds** (gemeinsame
Lead-Pools mit Claim + Auto-Rückfall bei Nichtkontakt: kein Lead stirbt in
einem inaktiven Account). Aber: das warnende Beispiel für Feature-Friedhöfe
(„robust with features that do you no good"), teuer, träger Support. Agents
nutzen am Ende nur CRM + Inbox.

### Transaction Management (Dotloop, SkySlope)

Jede Transaktion ist ein „Loop": EIN Objekt mit Dokumenten, Beteiligten,
E-Signaturen, Tasks. Checklisten pro Deal-Typ definieren, welche Dokumente
wann fällig sind; Compliance-Review als Gate vor dem Phasenwechsel; AI scannt
Dokumente auf fehlende Signaturen; vollständiger Audit-Trail.

### Speed-to-Lead als Kultur (Zillow, Sierra, Sisu)

Median-Antwortzeit über 28.000 Agents: 47 Minuten; Top 10 % unter 3 Minuten.
Antwort binnen 5 Minuten macht Qualifizierung ~21x wahrscheinlicher, 78 % der
Käufer arbeiten mit dem Agent, der zuerst antwortet. Zillow gibt 30 Sekunden
zum Annehmen eines Live-Transfers. Sierra: Accountability-Dashboard
(Time-to-First-Call, Conversion pro Agent). Sisu: übersetzt Jahres-GCI-Ziele
in tägliche Aktivitätsziele („on pace"-Anzeige).

### 10 Learnings (US)

1. Today-View mit Null-Zustand als Herzstück (Kommunikation → Tasks → Listen, „Alles erledigt"-Moment).
2. AI als Daily Briefing im Workflow, nie als separater Chatbot-Tab.
3. Ein Kontakt = ein Thread über alle Kanäle.
4. Lead → Deal → Abschluss als EIN durchgehendes Objekt (Loop-Prinzip).
5. Likely-to-Sell-Signale geflaggt im CRM, mit Grund, nicht als Zahl überall.
6. Action Plans als Kernautomatisierung, sichtbar am Kontakt („Tag 4 von Sequenz Neukäufer").
7. Speed-to-Lead sichtbar machen (Timer am neuen Lead, Antwortzeit-Metrik).
8. Pond-Logik für die Community (passt exakt zum UNIO CIRCLE).
9. Checklisten pro Deal-Typ mit Compliance-Gate + kundenseitiger Milestone-Spiegel.
10. Radikal wenig Module: lieber 4 täglich genutzte Bereiche als 12 Tabs.

---

## Report 2: DACH-Maklersoftware + der österreichische Prozess

### Landschaft

- **onOffice enterprise** (Marktführer): Vollsuite mit Prozessmanager
  (Flussdiagramm-Automatisierung). Mächtig, aber Formular- und Menü-Dickicht;
  Power durch Konfiguration statt Defaults, Einarbeitungshürde.
- **Propstack** (Challenger, „das Attio der Immobilienbranche"): Deals &
  Phasen als Pipeline (Interessenten- UND Eigentümer-Leads), 360-Grad-Akte
  mit Aktivitäten-Feed, nativer E-Mail-Sync, bestes ImmoScout-Matching.
  Nutzer nennen Ladegeschwindigkeit und modernes UI als Kaufgrund.
- **FlowFact**: Warnbeispiel (1,4/5 auf trusted.de): zu viele Ebenen, geringe
  Nutzerfreundlichkeit, teure Implementierung.
- **JUSTIMMO (AT)**: meistempfohlene Maklersoftware Österreichs, Export auf
  80+ Plattformen via OpenImmo, automatische Exposés, simples Pricing.
- **EDI-Real (AT)**: Kernversprechen „Daten nur einmal eingeben";
  AT-spezifisch: automatische Angebote mit **Namhaftmachung**
  (Provisionsnachweis!), ImmoUnited-Anbindung (Grundbuchdaten im CRM sind in
  AT Standard-Erwartung).

### Der DACH-Maklerprozess (7 Phasen mit Software-Touchpoints)

1. **Objektakquise**: Eigentümer-Lead → Bewertung (ImmoUnited) →
   Alleinvermittlungsauftrag (befristet, schriftliche Provisionsvereinbarung,
   FAGG-Widerrufsbelehrung).
2. **Aufbereitung**: Unterlagen (Grundbuch, Pläne, Energieausweis Pflicht),
   Fotos/3D, Exposé, Preisstrategie. Checkliste „Vermarktungsreife".
3. **Vermarktung**: Portalexport (willhaben, ImmoScout via OpenImmo) mit
   Sync-Status, eigene Kanäle, Suchprofil-Matching gegen die Datenbank,
   automatische Angebotsmails mit Namhaftmachung.
4. **Interessenten-Management**: Anfragen-Import → Qualifizierung →
   Exposé-Versand (mit Widerrufsbelehrung + Provisionsinfo im Erstkontakt) →
   Besichtigungen → Feedback → **Eigentümer-Reporting** (Klicks, Anfragen,
   Besichtigungen).
5. **Anbot & Verhandlung**: schriftliches Kaufanbot mit Status, Gegenanbote,
   Fristen.
6. **Kaufvertrag/Treuhand/Übergabe**: KYC/Geldwäsche-Prüfung, Treuhänder,
   Grundbuch, Übergabeprotokoll. Provision entsteht erst mit Abschluss.
7. **After-Sales**: Bewertung, Empfehlungs-Loop, Eigentümer von morgen.

### Was Makler am meisten nervt

Doppeleingaben (branchendefinierend), Portal-Sync als Blackbox, E-Mail
getrennt vom CRM, Konfigurations-Overload statt guter Defaults,
Eigentümer-Reporting als Handarbeit, langsame Altsysteme, Compliance als
Papierkram (Geldwäsche-Doku manuell, FATF-Kontrolldruck steigt).

### Pflicht-Workflows in Österreich

FAGG-Rücktrittsrecht (14 Tage, fehlende Belehrung verlängert auf 12 Monate),
Provisionsvereinbarung schriftlich (sonst nicht durchsetzbar),
Doppelmakler-Offenlegung, Energieausweis-Vorlagepflicht (HWB/fGEE schon im
Inserat), Geldwäsche/KYC (§§ 365m ff. GewO: Identifizierung, Mittelherkunft,
WiEReG-Abgleich, Risikobewertung, goAML-Verdachtsmeldung), Namhaftmachung
dokumentieren.

### 10 Learnings (DACH)

1. Ein Datenmodell, viele Views (Attio-Prinzip).
2. Zwei Pipelines nativ: Eigentümer-Akquise UND Käufer-Deals, verbunden über das Objekt.
3. E-Mail in die Akte, nicht daneben.
4. Null Doppeleingabe als Designprinzip (einmal erfassen → Exposé, Portale, Bericht, Anbot).
5. Portal-Sync-Status sichtbar pro Objekt und Kanal.
6. Nächste Aktion immer sichtbar; Deals ohne Folgeaktivität werden visuell „faul" (Pipedrive Rotting).
7. Eigentümer-Report auf Knopfdruck (größtes manuelles Nervthema).
8. Compliance als Workflow-Gates mit Audit-Trail, nicht als PDF-Ordner.
9. Gute Defaults schlagen Konfigurierbarkeit (AT-Standardprozess fertig mitliefern).
10. Geschwindigkeit ist Feature Nr. 1 (Instant-Suche, optimistische Updates, keyboard-first).

---

## Report 3: Desktop-UI-Patterns (Linear, Superhuman, Things 3, Attio) + B2B-Bindung

### Kernbefunde

**Linear**: lokale Daten (Interaktionen < 100ms), Keyboard-first als
Architektur, Momentum strukturell (Triage-Inbox mit „leer = fertig", Cycles
mit Auto-Übertrag), Redesign-Investment in unsichtbare Dinge (pixelgenaue
Ausrichtung, wenig visuelles Rauschen, LCH-Farben, Display-Schnitt nur für
Headings): hohe Dichte, die ruhig wirkt. **Superhuman**: Inbox Zero wird mit
bildschirmfüllendem, kuratiertem Foto belohnt (Emotion an den Workflow
gekoppelt, Game-Design ohne Punkte); Split Inbox, Snooze, Shortcuts als
Identität. **Things 3 / Notion Calendar**: „ein Tag" als ruhige vertikale
Einheit mit Jetzt-Marker; Startdatum getrennt von Deadline hält Today
ehrlich. **Attio**: Pipeline ist kein Modul, sondern dieselbe Liste als
Kanban; Views sind Linsen auf dieselben Objekte.

### 18 Desktop-UI-Regeln (Auswahl der wichtigsten)

Sidebar 240-280px einklappbar auf Icon-Rail; Master-Detail ab 1024px (Liste
320-360px fix); Slide-Over 480-640px für Lesen/kleine Edits, Fullpage nur für
eigenen Arbeitskontext (erstellen/komponieren); jede View und jedes Objekt
hat eine URL; Tabellenzeilen 44-48px mit 3 Dichte-Optionen; Hover-Aktionen
statt Dauer-Buttons, Bulk-Leiste erst bei Selektion; Inline-Editing in der
Zelle; Tastatur in Tabellen (Pfeile, Enter = Peek, Space = Select);
Command-K mit Objekten + Aktionen + Views, lokal, < 50ms; G-Shortcuts
(G-T Today, G-L Leads), C = neu, E = erledigt, H = Snooze, ? = Cheatsheet;
Animationen < 100ms, nur opacity/transform; Views als Linsen, gespeicherte
Views pinnbar; optimistisches Drag-and-drop; 4/8px-Grid mit exakter
Ausrichtung; eine Schriftfamilie, tabellarische Ziffern; Snooze überall mit
natürlicher Sprache; responsive Verdichtung ohne horizontales Scrollen.

### Bindungsmechaniken: passt / passt nicht

| Mechanik | Urteil |
|---|---|
| Today/Inbox mit „fertig"-Definition | passt, Kernmechanik |
| Zero-State als visuelle Belohnung (kuratierte Wiener Architektur-Fotos) | passt perfekt, edel statt kitschig |
| Antwortzeit-Score (privat, ruhig) | passt, direkt umsatzrelevant |
| Wochenreview/Monday-Digest | passt, Wiederkehr-Anker ohne Spam |
| Wochenrhythmus mit Auto-Übertrag (Cycles) | passt, kein manuelles Aufräumen |
| Fortschrittsbalken pro Deal | passt (Statusklarheit, keine Gamification) |
| Shortcut-Discovery als Identität | passt (Könnerschaft als Belohnung) |
| Streaks (Duolingo-Flamme) | passt nicht; nur implizit als Konstanz im Review |
| Leaderboards | bedingt: opt-in, mehrere Kategorien, nie „Bottom 5" (demotiviert die mittleren 60 %) |
| Punkte, Badges, Level, Konfetti | passt nicht (untergräbt die Apple-Anmutung) |

### Die ideale Today-View (5 Zonen)

1. Kopfzeile ruhig (Datum, 2-3 stille Kennzahlen, keine Charts).
2. Jetzt/Als Nächstes (nächster Termin mit Ein-Klick-Aktionen, Tageszeitachse mit Jetzt-Marker).
3. Triage-Inbox als Herzstück (neue Leads, Antworten, fällige Follow-ups als EINE priorisierte Liste; Erledigen/Snoozen/Delegieren; Ziel ist Null).
4. Momentum (2-3 Deals kurz vor dem nächsten Schritt, sanfte Karten).
5. Zero-State: alles erledigt → bildschirmfüllendes kuratiertes Bild + Tagesbilanz.

### Anti-Patterns

KPI-Kachel-Friedhof als Startseite; sichtbare Gamification; Modal-Kaskaden
und Seitenwechsel für Kleinigkeiten; Sidebars mit mehr als ~7 Top-Level-
Einträgen; Animationen > 200ms; Spinner statt optimistischer Updates;
Tooltip-Gewitter; AI als greller Sparkle-Button statt still integriert.

---

*Quellen: siehe Original-Reports (Compass Newsroom/Engineering, Follow Up
Boss Help Center, Placester/RealEstateBees, SkySlope/Dotloop, onOffice,
Propstack, JUSTIMMO, EDI-Real, WKO, Brandauer Rechtsanwälte, Linear Blog,
Superhuman Blog, MacStories, crm.org, Pencil & Paper, Zoho u. a.).
Vollständige Linklisten in den Research-Transkripten vom 17.08.2026.*
