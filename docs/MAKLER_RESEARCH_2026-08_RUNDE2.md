# Makler-Research Runde 2 (Mobil, Shop, Galerie) · 17.08.2026

> Anhang zu `MAKLER_DASHBOARD_PROZESSLOGIK_V2.md`. Drei Deep-Research-Reports.

## Report 1: Mobile Feldarbeit und Feature-Gaps

**Leitprinzip der Marktführer: "configure on desktop, execute on mobile."**
Follow Up Boss mobil: Inbox, Kontakthistorie, One-Tap-Call/SMS mit Auto-Logging,
Sequenzen starten/pausieren, Post-Showing-Notizen, Stage-Updates. Desktop-only:
Report-Building, Sequenz-Erstellung, Bulk-Operationen, Integrations-Setup.
onOffice priorisiert mobil **Dokumentenerzeugung im Feld** (Besichtigungsnachweis
und Übergabeprotokoll mit Signatur, Fragebögen offline, CarPlay, Anruferkennung).
Propstack seit 2026 native Apps. **Justimmo, Marktführer AT mit 5.500 Anwendern,
hat keine native App** (nur responsive Web): die Lücke in UNIOs Heimmarkt.
Speed-to-Lead-Kontext: Antwort unter 5 Minuten konvertiert 21x besser, 78 %
arbeiten mit dem Erstreagierenden, 62 % der Anfragen kommen außerhalb der
Bürozeiten, Durchschnittsmakler braucht 917 Minuten.

**Mobil erstklassig (6):** Unified Inbox mit One-Tap-Antwort (Push < 10 s) ·
Capture in < 30 s (Sprachnotiz, Foto, Visitenkarte, ohne Pflichtfelder) ·
Heute-Ansicht als einzige Startseite (max. 3 Blöcke) · Objekt-Steckbrief zum
Vorzeigen (offline gecacht) · digitale Protokolle mit Signatur (offline;
eSignature ist mit 79 % das verbreitetste Makler-Tool) · Kalender plus
Terminvorschlag in zwei Taps.
**Nur Desktop:** Reports/Analytics-Konfiguration, Automations-Editor,
Exposé-Layout, Portal-/Integrations-Setup, Provisionsmodule, Rechteverwaltung,
Massen-Datenpflege, komplexe Matching-Regeln.

**10 Feature-Gaps:** AI-Nachbesprechung per Sprachnotiz (ersetzt Dateneingabe;
Makler verlieren 10+ h/Woche an Admin) · WhatsApp Business API (gelesen in
3 Min vs. 6 h bei Mail, in AT/DE der Kanal) · Kamera-zu-Objekt-Pipeline mit
AI-Textvorschlag (82 % nutzen AI, aber getrennt vom CRM) · Open-House-Check-in
per QR (~37 % CTR) · offline-fähige Protokoll-Engine mit Signatur ·
Selbstbuchung von Terminen (Admin minus 70 %, No-Show von 22 % auf < 7 %) ·
Bewertungs-Engine (87 % lesen Reviews) · Anruferkennung mit Auto-Logging ·
E-Signatur für Alleinvermittlungsauftrag · Auto-Matching mit Push.

**10 Vereinfachungen:** eine Startseite statt acht Bereichen · progressive
Disclosure mit nur einer Ebene (NN/g) · Defaults statt Konfiguration (Linear) ·
eine Primäraktion pro Screen (Stripe) · Empty States als Onboarding ·
Filter-Sets zu 3-5 benannten Smart Lists · Stages auf max. 5-6 · automatisieren
statt Felder anbieten · Bulk nur Desktop · Dashboards mobil nur lesend.

**Touch:** Bottom Sheet statt Slide-Over · Hover-Aktionen ersatzlos streichen ·
Tabellen zu Karten mit drei Datenpunkten · Targets min. 44x44 · Undo-Toast statt
Dialog · optimistisches Feedback mit Offline-Queue.

## Report 2: Shop-Vereinfachung

**Kernbefund: Das Objekt ist der Einstieg, nicht der Produktkatalog.** Der Makler
denkt "Objekt X geht nächste Woche live", nicht "ich brauche einen Flyer".
Canva-Logik: Design zuerst, Produkt danach; die Konfiguration verschwindet, weil
Templates die Entscheidungen vorwegnehmen. Choice Overload ist messbar: Optimum
bei **4-6 Optionen**, Reduktion von 24 auf 6 vervielfacht die Kaufrate.
Progressive Disclosure plus Smart Defaults: 30-50 % schnellere Erstabschlüsse,
Abbrüche von 40-60 % auf 10-20 %.

**Vier Zonen:** (1) "Für dieses Objekt empfohlen" mit Objekt-Selector oben und
4-6 Karten mit Fixpreis, Lieferzeit, Vorschau · (2) "Nochmal wie beim letzten
Objekt" (Reorder ist das B2B-Killer-Feature) · (3) "Mein Abo" getrennt mit
Kontingent-Zähler · (4) "Alles anzeigen" aufklappbar, max. fünf Kategorien.
Drei Schritte: Objekt → Paket → Bestätigen.

**Presets ersetzen Konfiguration:** ein Qualitätsniveau als Default plus einen
Premium-Toggle · Brand-Profil einmalig im Onboarding · Objektdaten automatisch
vorbefüllt · drei Mengen-Presets statt Zahlenfeld · drei Looks als Vorschaubild ·
KI-Textvorschlag · Lieferdatum als Default. Regel: Was in über 80 % gleich
beantwortet wird, ist ein Default mit "Ändern"-Link.

**Auftrags-Flow (5 Stufen, Timeline statt Wizard):** Briefing offen (max. 3
Fragen, überspringbar wenn Objektdaten reichen) → Termin (3 Slots als Buttons,
ein Klick) → In Produktion (Datum statt Prozentbalken) → Ergebnis mit genau zwei
Buttons "Freigeben" und "Änderung wünschen" (Annotation auf dem Bild statt
Formular) → Fertig mit Download und "Nochmal bestellen". Auto-Freigabe nach 3-5
Tagen, Korrekturen auf max. 2 begrenzt und sichtbar gezählt. Freigabe = 1 Klick.

**Weiteres:** Fixpreis inkl. Versand und Lieferdatum auf jeder Karte (Baymard
732) · Rechnung als Default-Zahlweg · Warenkorb optional, "Jetzt bestellen" als
Primäraktion · objekt-getriggerte Erinnerungen (neues Objekt ohne Marketing,
21 Tage ohne Anfragen, verkauft) · Abo-Vorteil an der Kaufstelle sichtbar.

## Report 3: Galerie, Kennzahlen, Sub-Nav, Tabellen, Touch

**Galerie:** Hero + Thumbnail-Leiste + Lightbox. Baymard: 100 % der Desktop-Sites
nutzen Thumbnails, aber nur 24 % mobil, obwohl Thumbnails mobil die niedrigste
Fehl-Tap-Rate haben. **Also Thumbnails auch mobil, nicht Dots.**
Maße: Hero mobil full-bleed 3/2 (240-300 px), Desktop 62-68 % Breite;
Thumbnails mobil 64x64 sichtbar mit 44x44 Hit-Area, 4,5 sichtbar (halbes
fünftes als Truncation-Hinweis), Desktop 88x66, max. 8. Aktiv: 2 px Border plus
volle Deckkraft, inaktiv 0,62.
Interaktion: Swipe auf dem Hero (Nutzer swipen reflexartig), Snap bei 25-30 %
Drag oder Velocity > 0,3 px/ms, `scroll-snap-type: x mandatory`; Tastatur
Links/Rechts/Escape/Home/End; aktives Thumbnail per `scrollIntoView` nachziehen,
aber nicht wenn der Wechsel vom Thumbnail-Tap kam; Counter "7 / 24" als Pill;
Rand-Fade plus halbes Thumbnail; Desktop "Alle Fotos" öffnet Grid-Overlay.
Lightbox: Grund #0B0B0C, Close 48x48, Escape plus Backdrop-Klick plus
Swipe-down (120 px), **Double-Tap zoomt auf 2,5x** (vor Pinch), bei Zoom
Swipe-to-next deaktivieren, Fokus trappen und zurückgeben.
Gemischte Formate: feste Bühne mit `object-fit: contain` plus geblurrtes
Duplikat als Backdrop, Portrait max. 92 % Bühnenhöhe.
Performance: Bild 1 eager mit fetchpriority high, Rest lazy, Nachbarn ±1
prefetch, immer aspect-ratio setzen, Thumbnails als 160-px-Varianten.

**Kennzahlen mobil: 2-Spalten-Grid, KEINE horizontale Scroll-Reihe.** Labels
11 px uppercase mit 0,06em, Werte 17-20 px tabular, Zellhöhe min. 56 px,
`span 2` für lange Werte (Bauträger, Architekt, Adresse), Ranges nie splitten
("€ 420.000 bis € 1,24 Mio." in einer Zelle), kein Ellipsis auf Werten, über
8 Werte die 6 wichtigsten plus "Alle Details".

**Sub-Nav mobil:** 2-3 Tabs echtes Segmented Control; 4-6 Tabs eine Zeile
scrollende Pills (40 px hoch, 44 px Hit-Area, gap 8, snap-align start, aktive
Pill ins Sichtfeld scrollen). Kein Dropdown unter 8 Optionen, keine zweizeiligen
Segmented Controls. Tab-Swipe im Objekt-Detail deaktivieren (Galerie belegt die
Geste).

**Tabellen:** unter 768 px Karten mit Titel, 2-3 Label-Wert-Paaren, Status-Badge
und Overflow-Menü; Labels über `data-label`; wenn Vergleich die Aufgabe ist,
horizontal scrollen mit `position: sticky` auf der Identifier-Spalte; ab
8 Spalten Prioritäten 1-6 mit Spalten-Control; Filterzustand als entfernbare
Chips über der Liste.

**15 Touch-Regeln (Auszug):** 44x44 minimum, Hit-Area über Padding · 8 px
Abstand, 12 px bei destruktiven · Primäraktion im unteren Drittel ·
Trailing-Swipe destruktiv, Leading-Swipe Kontext · Full-Swipe mit Undo-Toast
6 s · Long-Press 350-500 ms nie als einziger Weg · Pull-to-refresh nur auf
Listen-Roots · Sheets mit zwei Detents und Grabber, CTA im sticky Footer ·
16 px vom linken Rand für System-Back freihalten · keine Hover-Information ·
Inputs min. 16 px gegen iOS-Zoom · aspect-ratio reservieren ·
prefers-reduced-motion respektieren.

*Quellen: Follow Up Boss, onOffice, Propstack, Justimmo, BoldTrail-Reviews, NAR
Technology Survey, Speed-to-Lead-Benchmarks, NN/g, Attio, Linear, Baymard
(B2B UX, Guideline 732, Thumbnails, Zoom, Page Control), Fiverr, 99designs,
Thumbtack, Fresha, Canva Print, Vistaprint, Flyeralarm, Apple HIG (Tab Bars,
Sheets), Material 3, WCAG 2.5.5/2.5.8, Embla, Airbnb Photo Viewer Case Study.*
