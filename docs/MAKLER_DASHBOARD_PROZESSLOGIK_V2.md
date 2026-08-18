# UNIO Makler-Dashboard: Prozesslogik v2 (Vereinfachung, Mobil, Shop)

> Version 2.0 · 17.08.2026 · Baut auf `MAKLER_DASHBOARD_PROZESSLOGIK.md` auf.
> Research: `MAKLER_RESEARCH_2026-08_RUNDE2.md` (Mobile-Feldarbeit und
> Feature-Gaps, Shop-Vereinfachung, Galerie- und Touch-Patterns).
> Abschnitt 9 enthält den Challenge-Durchgang. Abschnitt 10 den Umsetzungsstand.

---

## 1. Die drei Leitsätze dieser Runde

1. **Konfigurieren am Schreibtisch, ausführen unterwegs.** Das ist die Formel der
   Marktführer, und sie beendet die Frage "muss alles mobil gehen?". Mobil
   gehören sechs Dinge hin (Inbox, Capture, Heute, Objekt vorzeigen, Protokoll
   mit Signatur, Termin), alles Konfigurierende bleibt Desktop. Nebenbefund mit
   Marktrelevanz: **JUSTIMMO, Marktführer in Österreich, hat keine native App.**
2. **Das Objekt ist der Einstieg, nicht der Katalog.** Ein Makler denkt "Objekt
   X geht nächste Woche live", nicht "ich brauche einen Flyer". Der Shop startet
   deshalb mit einem Objekt-Selector und vier bis sechs Empfehlungen, nicht mit
   Kategorien. Choice Overload ist messbar: Optimum bei 4-6 Optionen.
3. **Was in über 80 % der Fälle gleich beantwortet wird, ist kein Schritt,
   sondern ein Default mit "Ändern"-Link.** Das gilt für Papier, Format, CI,
   Objektdaten, Mengen und Lieferung.

---

## 2. Mobil-Befund: was tatsächlich kaputt war

Systematische Messung aller Bereiche, Sub-Tabs und Detailseiten bei 375 px:

| Fläche | Befund | Ursache |
|---|---|---|
| CIRCLE (Puls) | 132 Elemente ragten raus, bis +183 px | Grid `5fr 4fr 3fr` ohne `minmax(0,…)`, fixe 220-px-Leiste, 56-px-Zahl |
| Projekt-Detail | 8 Elemente, bis +319 px | Kopf-Grid `1fr auto`, Kachel-Duo mit `minWidth`, Fakten-Grid mit 5 fixen Spalten |
| Projekt-Galerie | Grid 220/110 px, rechts abgeschnitten | 2fr/1fr-Layout mit fester Höhe 400 px, mobil unbrauchbar |
| Objekte (Immobilien) | 3 Elemente, +46 px | KPI-Band als Flex ohne Umbruch, 32-px-Zahlen |
| Objekt-Akte | 8 Elemente | dieselbe Galerie-Struktur, Kennzahlen-Reihen |
| Sub-Navigation | brach unschön auf zwei Zeilen | `flex-wrap: wrap` statt scrollender Pill-Bar |
| Kontakte, Deals, Portale, Referral | in Ordnung | Tabellen und Kanban in gewollten Scroll-Containern |

**Zusatzbefund, der alles verzögerte:** Die UX-Vorschauen laufen mit
Runtime-Babel, und Browser lieferten nach jedem Deploy alte JSX-Dateien aus dem
Cache aus. Der Build vergibt jetzt einen Stempel (`?v=<build>`) an alle
JSX-Referenzen, damit ein Deploy garantiert frische Dateien liefert.

---

## 3. Die eine Galerie für alle Flächen

Vorher gab es drei verschiedene Galerie-Layouts (Projekt, Objekt-Akte, Medien).
Jetzt eine Komponente, nach den Research-Regeln:

- **Aufbau**: Hero mit `aspect-ratio 3/2` plus Thumbnail-Leiste darunter plus
  Vollbild-Lightbox als dritte Ebene. **Thumbnails auch mobil**, weil Baymard
  zeigt: Thumbnails haben mobil die niedrigste Fehl-Tap-Rate, Dots liefern
  keinen Inhaltshinweis (nur 24 % der Mobile-Sites nutzen sie, obwohl sie
  besser sind).
- **Maße**: Thumbnails 88x66 Desktop, 64x64 mobil, 8 px Gap, aktives mit 2 px
  Signal-Rahmen und voller Deckkraft, inaktive bei 0,62. Das halbe fünfte
  Thumbnail bleibt sichtbar als Truncation-Hinweis.
- **Interaktion**: Swipe und Drag auf dem Hero (Schwelle 28 % der Breite oder
  Wischgeschwindigkeit über 0,3 px/ms), Pfeil-Buttons auf Desktop bei Hover,
  Tastatur mit Links, Rechts, Home, End und Escape. Das aktive Thumbnail zieht
  automatisch ins Sichtfeld, **außer** der Wechsel kam vom Thumbnail-Tap selbst
  (sonst springt es unter dem Finger weg).
- **Lightbox**: Grund #0B0B0C, Zähler oben, Schließen mit 48-px-Fläche,
  **Double-Tap zoomt auf 2,5x** (Baymard priorisiert Double-Tap vor Pinch), bei
  Zoom ist Swipe-to-next deaktiviert, Thumbnail-Leiste am Fuß.
- **Gemischte Formate**: feste Bühne mit `object-fit: contain` und geblurrtem
  Duplikat als Hintergrund, damit Hochformate nicht beschnitten werden.
- **Performance**: erstes Bild `eager` mit `fetchpriority=high`, Rest `lazy`,
  `aspect-ratio` reserviert (kein Layout-Shift).
- Ab sieben Bildern wird der Hero-Button zu "Alle N Fotos" und öffnet ein
  Grid-Overlay (Airbnb-Zweistufigkeit), darunter heißt er "Vollbild".

---

## 4. Kennzahlen, Sub-Navigation, Tabellen: die drei Mobil-Regeln

**Kennzahlen-Reihen: 2-Spalten-Grid, kein horizontales Scrollen.** Research ist
hier eindeutig: Bei 5-8 Kennzahlen ist die Scroll-Reihe die schlechtere Wahl,
weil Werte abgeschnitten werden und Inhalt außerhalb des Viewports systematisch
übersehen wird. Regeln: Label 11 px uppercase, Wert 17-20 px mit tabularen
Ziffern, Zellhöhe mindestens 56 px, lange Werte (Bauträger, Architekt, Adresse)
über beide Spalten, Ranges niemals splitten, kein Ellipsis auf Werten, unter
380 px eine Spalte. Wenn eine Scroll-Reihe fachlich gewollt ist, braucht sie
Snap, angeschnittene Nachbarkarte und Rand-Fade, sonst ist sie ein Anti-Pattern.

**Sub-Navigation: eine Zeile scrollende Pills mit Snap.** 40 px hoch, 44 px
Hit-Area, aktive Pill scrollt ins Sichtfeld. Kein Dropdown (versteckt die
Geschwister), keine zweizeiligen Segmented Controls. Bei nur zwei bis drei Tabs
ein echtes Segmented Control über die volle Breite.

**Tabellen: unter 768 px zu Karten.** Titel, zwei bis drei Label-Wert-Paare,
Status-Badge, Aktionen im Overflow. Wo Vergleich die Aufgabe ist (Portal-Matrix,
Provisionen), bleibt horizontales Scrollen mit sticky Identifier-Spalte.

---

## 5. Shop-Vereinfachung: von Katalog zu Objekt

**Heute**: fünf Reiter (Druck, Content, Homepage, Pakete & Leads, Aufträge),
Vollkatalog als Einstieg, mehrstufige Konfiguratoren mit Maklerbild-, Partnerlogo-,
Format- und Mengenwahl, Warenkorb als Pflichtweg.

**Neu, vier Zonen auf einer Seite:**

1. **Objekt-Selector oben.** "Für welches Objekt?" mit den aktiven Objekten als
   Chips plus "Ohne Objekt" für Persönliches. Der Rest der Seite reagiert darauf.
2. **Für dieses Objekt empfohlen** (Default-Ansicht): vier bis sechs Karten,
   abgeleitet aus Objektzustand und Vermarktungsreife. Beispiel für ein Objekt
   ohne Fotos: "Fotoshooting", "Exposé-Paket", "Fensterplakat",
   "Objekt-Kampagne 14 Tage". Jede Karte trägt **Fixpreis inklusive Versand und
   Lieferdatum** (Baymard 732: ohne Preisinfo im Warenkorb müssen Nutzer 10-20
   Felder füllen, bevor sie Kosten sehen), Vorschaubild und einen Klick zum
   Auftrag.
3. **Nochmal wie beim letzten Objekt**: die letzten drei Aufträge als
   Ein-Klick-Wiederholung, Objekt- und Branddaten werden getauscht. Reorder ist
   laut Research das B2B-Killer-Feature; Ziel ist ein neues Objekt vollständig
   bestückt in unter 60 Sekunden.
4. **Mein Abo** als eigene Zone mit Kontingent-Zähler ("3 von 5 Videos diesen
   Monat"); Verbrauch wird verrechnet statt bezahlt. Darunter "Alles anzeigen"
   mit maximal fünf Kategorien für Power-Nutzer.

**Konfiguration wird zu Defaults**: ein Qualitätsniveau ("UNIO Standard") plus
ein Premium-Toggle statt Papier- und Formatwahl; **Brand-Profil einmalig** im
Onboarding (Logo, Farben, Portrait, Kontakt) statt in jedem Konfigurator;
Objektdaten, Fotos und Preis automatisch aus der Akte; drei Mengen-Presets statt
Zahlenfeld; drei Looks als Vorschaubild; KI-Textvorschlag aus Objektdaten.
Ergebnis: **Objekt → Paket → Bestätigen**, drei Schritte, kein vierter.

**Auftrags-Flow auf fünf Stufen als Timeline** (nicht als Wizard, weil
Wartezeiten und Rückläufe dazugehören): Briefing offen (maximal drei Fragen,
wird übersprungen wenn Objektdaten reichen) → Termin (drei Slots als Buttons) →
In Produktion (konkretes Datum statt Prozentbalken) → Ergebnis mit genau zwei
Buttons "Freigeben" und "Änderung wünschen" → Fertig mit Download und "Nochmal
bestellen". Dazu: Auto-Freigabe nach fünf Tagen ohne Reaktion, Korrekturen auf
zwei begrenzt und sichtbar gezählt ("Korrektur 1 von 2"), Freigabe kostet einen
Klick.

---

## 6. Fehlende Funktionen: die zehn Lücken

Priorisiert nach Bindungswirkung und Umsetzbarkeit im Demo-Kontext:

| # | Funktion | Warum sie bindet | Wo sie andockt |
|---|---|---|---|
| 1 | **Sprachnotiz mit AI-Extraktion** | Ersetzt Dateneingabe statt sie zu verlangen; Makler verlieren 10+ h/Woche an Admin | Capture-Button in Heute, Ergebnis landet im Kontakt-Thread |
| 2 | **WhatsApp als Kanal** | In 3 Minuten gelesen statt 6 Stunden; in AT/DE der Standardkanal | Kanal im Kontakt-Thread neben Mail und Telefon |
| 3 | **Foto direkt ins Objekt** mit AI-Textvorschlag | 82 % nutzen AI, aber getrennt vom CRM (Copy-Paste aus ChatGPT) | Objekt-Akte, Medien-Tab, Vermarktungsreife-Checkliste |
| 4 | **Besichtigungs-Check-in per QR** | Ersetzt die Papierliste, die abends abgetippt wird; QR erreicht ~37 % CTR | Termin-Detail, Ergebnis in den Lead-Pool |
| 5 | **Protokoll mit Signatur, offline** | Kein Netz im Keller; eSignature ist mit 79 % das verbreitetste Makler-Tool | Termin-Detail und Deal-Checkliste |
| 6 | **Selbstbuchung von Terminen** | Admin minus 70 %, No-Show von 22 % auf unter 7 % | Slot-Picker, den der Endkunde schon nutzt |
| 7 | **Bewertungs-Anfrage nach Abschluss** | 87 % lesen Bewertungen vor der Entscheidung | After-Sales-Sequenz am Deal-Ende |
| 8 | **Anruf erkennen und protokollieren** | Kontext beim Abheben, ein Tap für das Ergebnis | Kontakt-Thread |
| 9 | **E-Signatur für Alleinvermittlung** | Der Vertrag ist der Moment, an dem Akquise kippt | Akquise-Pipeline, Phase Alleinvermittlung |
| 10 | **Auto-Matching mit Push** | Ein Sheet, Mehrfachauswahl, ein Tap "Exposé senden" | Neues Objekt live, Kontakte mit Suchprofil |

---

## 7. Vereinfachungen quer über die App

1. **Heute ist die App**, alles andere ist Arbeitsraum. Mobil wird die Sidebar
   zum Drawer und die Startseite trägt maximal drei Blöcke.
2. **Eine Ebene Tiefe** (NN/g): Bereich → Detail. Kein Detail im Detail.
3. **Eine Primäraktion pro Screen**, der Rest wird sekundär oder wandert ins
   Overflow.
4. **Empty States statt Tour**: "Noch keine Objekte, erstes Objekt per Foto
   anlegen" mit der echten Aktion im Leerzustand.
5. **Filter zu benannten Listen**: "Heiß", "Kalt seit 14 Tagen", "Wartet auf
   mich". Der Filter-Builder bleibt Desktop.
6. **Hover-Aktionen ersatzlos streichen** (mobil existieren sie nicht),
   stattdessen sichtbarer Aktions-Button oder Long-Press-Sheet.
7. **Slide-Over wird mobil zum Bottom-Sheet** mit zwei Detents und Grabber, CTA
   im sticky Footer.
8. **Undo-Toast statt Bestätigungsdialog** (sechs Sekunden), spart im Feld Taps.
9. **Bulk-Aktionen nur Desktop**, damit mobil nie Datensätze in Serie bearbeitet
   werden müssen.
10. **Automatisieren statt Felder anbieten**: Follow-up-Datum, Stage-Wechsel und
    Aktivitäts-Log leiten sich aus Verhalten ab.

---

## 8. Zusammengeführte Prozesse (Fortsetzung von v1)

| Läuft heute parallel | Wird zusammengeführt |
|---|---|
| Drei Galerie-Implementierungen (Projekt, Akte, Medien) | Eine Galerie-Komponente mit Hero, Thumbnails, Lightbox |
| Shop-Kategorien und Objekt-Marketing getrennt | Objekt-Selector als Shop-Einstieg, Empfehlungen aus dem Objektzustand |
| CI-Daten in jedem Konfigurator | Ein Brand-Profil, einmal im Onboarding |
| Terminwahl an drei Stellen (Besichtigung, Shooting, Übergabe) | Ein Slot-Picker, den auch der Endkunde nutzt |
| Foto-Upload, Exposé-Text, Portal-Freigabe | Eine Vermarktungsreife-Checkliste als Gate |
| Bewertungsbitte, Empfehlung, Wiederkontakt | Eine After-Sales-Sequenz am Deal-Ende |
| Sprachnotiz, Anrufnotiz, Besichtigungsfeedback | Ein Capture-Eingang, der immer im Kontakt-Thread landet |

---

## 9. Challenge-Durchgang

1. **"Thumbnails mobil kosten wertvolle Höhe."** Stimmt, 72 px. Der Research ist
   trotzdem eindeutig: Dots liefern keinen Inhaltshinweis und erzeugen mehr
   Fehl-Taps. Kompromiss: Thumbnails 64 px hoch, Hero 3/2 statt 4/3, damit die
   Summe unter der alten 400-px-Galerie bleibt.
2. **"Objekt-Selector im Shop erzwingt eine Auswahl, die manche nicht haben."**
   Deshalb "Ohne Objekt" als gleichwertiger erster Chip für Visitenkarten,
   Personal Brand und Academy. Der Selector ist Kontext, kein Pflichtfeld.
3. **"Vier bis sechs Empfehlungen verstecken das Angebot."** Der Vollkatalog
   bleibt einen Klick entfernt ("Alles anzeigen") und behält alle Produkte. Die
   Reduktion betrifft nur die Startansicht, wo laut Research 24 Optionen die
   Kaufrate versechsfachen, wenn man sie auf 6 senkt.
4. **"Auto-Freigabe nach fünf Tagen ist gefährlich."** Sie gilt nur für
   Kreativ-Ergebnisse (Foto, Video, Grafik), niemals für Verträge, Anbote oder
   Abrechnungen, und sie ist im Auftrag sichtbar angekündigt ("Freigabe
   automatisch am 22.08."). Ein Klick auf "Änderung wünschen" stoppt den Timer.
5. **"Korrekturen auf zwei begrenzen ist kundenfeindlich."** Es ist die
   Branchennorm (99designs, Fiverr) und schafft Klarheit statt Endlosschleifen.
   Danach ist eine dritte Runde buchbar, mit Preis. Sichtbar gezählt, nicht
   heimlich begrenzt.
6. **"Sprachnotiz mit AI: Datenschutz."** Nur Selbstdiktat des Maklers, keine
   Aufnahme von Gesprächen mit Kunden, kein Mitschnitt ohne ausdrückliche
   Zustimmung. Das Feature heißt deshalb "Notiz sprechen", nicht "Gespräch
   aufnehmen".
7. **"WhatsApp braucht die Business API und einen AVV."** Richtig, deshalb ist
   es im Demo-Kontext ein Kanal-Tab mit Demo-Verlauf und der Hinweiszeile, dass
   der Kanal DSGVO-konform über die Business API läuft. Kein privates WhatsApp.
8. **"Zu viele neue Funktionen auf einmal."** Die zehn Lücken sind priorisiert:
   Capture, WhatsApp-Kanal und Foto-zu-Objekt sind Etappe A (sie senken täglich
   Aufwand), QR-Check-in, Protokoll und Selbstbuchung Etappe B (Feldarbeit),
   Bewertung, Anruf, E-Signatur und Auto-Matching Etappe C.
9. **"Die generische Mobil-Härtung per Attribut-Selektor ist ein Hack."**
   Zugegeben. Sie ist die Brücke für die Alt-Screens (Projekt, Objekt-Akte,
   CIRCLE), damit nichts abgeschnitten bleibt, während die Screens Stück für
   Stück auf Klassen umgestellt werden. Die drei Hauptursachen sind bereits
   sauber gefixt, nicht überklebt.
10. **"Wird Heute mobil nicht zu lang?"** Nach dem Zero-State-Prinzip
    verschwinden Triage und Momentum, sobald erledigt. Die vier Original-Kacheln
    bleiben in fester Reihenfolge. Wenn das mobil zu lang wirkt, kommen
    Pipeline und Community hinter einen "Überblick anzeigen"-Abschnitt.

---

## 10. Umsetzungsstand dieser Runde

**Bereits gebaut und mobil verifiziert:**
- Eine Galerie-Komponente mit Hero-Swipe (1/5 auf 2/5 im Test), Thumbnail-Leiste
  mit aktivem Rahmen, halbem fünften Thumbnail, Zähler, Lightbox mit Double-Tap-Zoom
  und Grid-Overlay ab sieben Bildern; eingesetzt in Projekt-Detail und Objekt-Akte.
- CIRCLE mobil von 132 Überläufern auf null (Grid-Spuren, fixe Breiten, Zahl).
- Objekte-KPI-Band von drei Überläufern auf null (Umbruch, clamp).
- Projekt-Detail von acht auf zwei minimale Überläufer (Kopf-Grid, Kachel-Duo,
  Fakten-Grid als 2-Spalten-Raster, Padding).
- Kennzahlen-Regeln als CSS (2 Spalten, lange Werte über beide, eine Spalte
  unter 380 px, keine Kürzung).
- Sub-Navigation mobil als scrollende Pill-Bar mit Snap.
- Build-Stempel gegen Browser-Cache, damit Deploys sofort wirken.

**Offen, nach Freigabe:** Shop-Umbau auf die vier Zonen mit Objekt-Selector und
Brand-Profil, Auftrags-Timeline auf fünf Stufen, Tabellen-zu-Karten unter 768 px,
die zehn Funktionslücken in den Etappen A bis C.

---

*Arbeitsstand. Rechtliche Aussagen (Signatur, Geldwäsche, Provision) und
Preisangaben sind Demo-Inhalte und vor Produktivgang zu prüfen.*
