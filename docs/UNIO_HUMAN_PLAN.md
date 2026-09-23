# UNIO HUMAN. Plan für Software und Features

Arbeitsname: **UNIO HUMAN** (aus dem Diagramm "unio human - personal brands"; öffentlicher Produktname ist weiterhin PERSONAL BRAND, der Name ist zu entscheiden, siehe Kap. 14).
Stand: 23.09.2026, v1.2 (Fragebogen und Generator nach Research-Anhang `docs/UNIO_HUMAN_RESEARCH_2026-09.md` überarbeitet). Autor: Claude mit Daniel Hayden. Zahlen sind Arbeitsstand.

---

## 0. Auf einen Blick

**Was gebaut wird.** Ein Werkzeug, das den gesamten Weg eines Maklers vom Vertrag bis zum laufenden Personal-Brand-Marketing abbildet: Fragebogen, Strategie-Workshop, generierte Markenstrategie, die fünf Setups (Branding, Website, Accounts, Tool, Drehtermine), der monatliche Content-Zyklus (Ideen bis Posting), der Quartals-Review, Shop und Sonderwünsche. Jeder Schritt hat einen Zustand, einen Verantwortlichen und einen Kanal für Rückfragen. Für den Makler fühlt sich das wie eine Reise in Etappen an, für das Team wie ein Produktionsboard mit Triage.

**Drei Perspektiven, ein Zustand.** Makler (Reise), Team (Produktion, Strategie, Sales, Agent Success) und Admin sehen dieselben Daten, jeweils in ihrer Linse. Das ist dasselbe Prinzip wie bei Makler-Dashboard und Endkunden-Portal ("Ein Zustand, zwei Perspektiven").

**Was es einspart.** Eine Empfehlungs-Engine schlägt Bündelungen vor (Sammel-Drehtage, geteilte Locations, Standard- statt Sonderformate, Vorproduktion aus ungenutztem Kontingent) und beziffert die gesparten Stunden. Pro Prozessschritt ist festgelegt, was automatisch läuft, was KI vorbereitet und was Menschen tun.

**Wie es gebaut wird.** Zuerst als eigenständiger, klickbarer Prototyp im Stil der bestehenden UX-Vorschauen (React, localStorage, Demo-Daten, gleiche Design-Tokens), mit einer Datenschicht, die ohne Umbau der Oberfläche auf ein echtes Backend umgestellt werden kann. Danach Zusammenführung in den Bereich Marketing des Makler-Dashboards.

**Zwölf Umsetzungsschritte** (Kap. 13), jeder in einer Arbeitssitzung erledigbar, jeder mit Prüfkriterium.

---

## 1. Ausgangslage

### 1.1 Was heute existiert (Repo unio-gmbh/unio)

- **Shop im Makler-Dashboard** (`ui_kits/dashboard/dash-shop.jsx`): Katalog mit Print, Content à la carte, Abos (Personal Brand 599 €/Monat, Premium 1.190 €/Monat), Programme, Listing-Boosts, Leads, Makler-Homepage mit 6 Looks. Aufträge in fünf Stufen (Briefing, Termin, Produktion, Ergebnis, Fertig), Freigabe mit gezählten Korrekturen (max. 2), angekündigte Auto-Freigabe, Kontingent-Zähler im Abo. Empfehlungen pro Objekt. Verzahnt mit Objekt-Akte, Medien-Tab und Anlegen-Wizard.
- **Meta-Kampagnen** (`dash-marketing.jsx`): Kampagnenkarten, Boost-Sheet, Creative-Overlay. Anfragen gehen "als Auftrag an die Engine".
- **Prozesslogik** (`docs/MAKLER_DASHBOARD_PROZESSLOGIK.md`, `_V2.md`): Regeln D1 bis D12, darunter maximal 8 Bereiche, Slide-Over statt Seitenwechsel, Motion unter 100 ms, AI still im Workflow, keine sichtbare Gamification. V2 §5: "Das Objekt ist der Einstieg, nicht der Katalog", Brand-Profil einmalig im Onboarding, Auto-Freigabe nach 5 Tagen nur für Kreativ-Ergebnisse.
- **Kein Backend, keine Datenbank.** Einzige Serverfunktion ist `api/lead.js` (Mailversand). State liegt in localStorage-Contracts (`unio_mk_*`, `unio_ek_*`, `unio_shop_*`).
- **Design-System**: Tokens in `tokens/`, Dashboard-Bausteine in `dash-helpers.jsx`, `dash-patterns.jsx`, `MK_CSS`. Regeln: keine Emoji, keine Eyebrow-Pills, Power Grotesk plus JetBrains Mono, Mono-Glyphen statt Icon-Libraries, Sentence case. Makler werden mit Du angesprochen.

### 1.2 Was fehlt

Workshop, Fragebogen, Strategie, Kick-off, Content-Zyklus, Drehtag-Planung, Kalender, Reporting, Tickets, Team-Perspektive, Empfehlungen zur Kostenersparnis. Nichts davon existiert im Code oder in den Dokumenten.

### 1.3 Der Ist-Prozess laut Diagramm

| Phase | Schritte | Owner heute | Werkzeuge heute |
|---|---|---|---|
| Vertrag | Akquise, Signing, Contracting (Team Court) | Nikita | Verträge |
| Strategie | Start-Meeting, Strategy Workshop mit Fragebogen, Results Upload, Strategy Generated (Brand Story, Content Pillars, Content Formats), Presentation und Planning | Daniel, Claude | Fragebogen, Claude |
| Kick-off und Setups | Branding Setup (neu oder Rebranding: Logo, Farben, Schrift, Leitidee), Website Setup mit Foto-Termin, Tool-Onboarding (Content-Board, Freigaben, Kalender, Insights, Meeting-Transkripte, Kontakte, Ressourcen), Media Accounts Setup (Instagram neu oder Übernahme, Facebook als Spiegel, Metricool), Content Sessions Scheduling | Daniel, Ahmet, Agent Success Manager | Google Drive, Notion, WhatsApp, Metricool, Onboarding-Video |
| Zyklus | Content Ideas, Planning, Production, Cut/Edit, Delivery, Feedback/Freigabe, Posting Scheduled, Quarterly Reviews | Ahmet | Lucida OS (extern) |
| Shop | Video-, Foto-, Grafik-, Print-Variationen; Custom Format mit Freigabe-Loop; Standardformat automatisiert; Check-out | Makler | Shop |
| Sonderwünsche | BO Chat Request, Agent Ticket am Board, Abgleich mit Zero-One | Makler, Team | Chat, Board |

Ziel laut Diagramm: **Go-live innerhalb der ersten 30 Tage** eines Maklers.

### 1.4 Entscheidungen aus dem Gespräch (23.09.2026)

- Später Teil des Makler-Dashboards (Makler verlässt das System nicht), Entwicklung zunächst als eigenes Tool, danach Zusammenführung mit rollenbasierter Sicht.
- Lucida OS ist ein externes Werkzeug. Planung so, als gäbe es das nicht; Integration ist optional, falls der Code kommt.
- Zuerst klickbarer Prototyp (React, localStorage), so konzipiert, dass auf ein eigenes Backend oder auf Zero-One (marlin) umgestellt werden kann.
- Kein bestehendes Werkzeug (Metricool, Drive, WhatsApp, Notion) muss bleiben.

---

## 2. Leitprinzipien

1. **Ein Zustand, drei Linsen.** Makler, Team und Admin lesen und schreiben dieselben Schritte, Aufträge, Assets und Ereignisse. Keine Doppelpflege, keine parallelen Prozesse.
2. **Eine Aufgabe pro Bildschirm.** Fragebogen, Freigabe, Terminwahl, Idee-Auswahl: jeder Screen hat genau eine Handlung. Bild vor Text, Auswahl vor Freitext.
3. **Etappen statt Prozentbalken.** Fortschritt wird als Reise in sechs Etappen gezeigt. Lineare Prozentbalken sind laut Forschung wirkungslos bis schädlich (Conrad et al.), Etappen mit spürbaren Sprüngen wirken.
4. **Ruhige Belohnung.** Am Ende jeder Etappe ein Reveal mit einem echten Zwischenergebnis (dein Archetyp, dein Positionierungssatz, dein erstes Reel). Kein Konfetti, keine Punkte, keine Streaks (Regel D12 der Prozesslogik).
5. **Jede Handarbeit ist ein Schritt mit Owner, Zustand und Fälligkeit.** Nichts läuft über WhatsApp-Gedächtnis. Rückfragen hängen am Schritt, nicht in einem losen Chat.
6. **KI arbeitet still im Workflow.** Sie schreibt Entwürfe (Strategie, Hooks, Skripte, Captions, Report-Kommentare), der Mensch entscheidet. Kein "AI"-Tab, kein Sparkle-Icon.
7. **Digital, wo es die Qualität nicht kostet.** Der Drehtag, das Gespräch und die finale Positionierungsentscheidung bleiben menschlich. Alles andere wird automatisiert oder vorbereitet.
8. **Empfehlungen sind Rechnungen.** Jede Empfehlung nennt Datenquelle, Regel und gesparte Stunden oder Euro. Keine Bauchgefühl-Tipps.
9. **Ehrliche Zeit.** Termine, Wartezeiten und Fristen werden angezeigt ("Dein Drehtag ist in 12 Tagen", "Freigabe offen seit 3 Tagen, automatische Freigabe am 27.09.").
10. **UNIO-Stimme.** Du-Ansprache für Makler, kurze deklarative Sätze, keine Superlative ohne Zahl, keine Ausrufezeichen, Mono-Labels für Daten.

---

## 3. Die Reise des Maklers

Sechs Etappen, danach der Monatszyklus. Jede Etappe hat einen Einstiegs-Screen, ihre Schritte und einen Reveal.

| Etappe | Ziel | Dauer (Ziel) | Reveal am Ende |
|---|---|---|---|
| **0 Ankommen** | Vertrag unterschrieben, Zugang aktiv, Erwartungen klar | Tag 0 bis 1 | "Deine Reise in 30 Tagen" (Etappen-Karte mit Terminen) |
| **1 Entdecken** | Fragebogen in fünf Kapiteln (12 bis 15 Minuten) | Tag 1 bis 3 | Archetyp und erste Hypothese zur Positionierung |
| **2 Gespräch** | Strategie-Workshop (60 bis 90 Minuten, remote oder vor Ort), Transkript, Ergebnis-Upload | Tag 3 bis 7 | "Deine Strategie ist in Arbeit" mit Datum |
| **3 Strategie** | Generierte Markenstrategie, Review durch Daniel, Präsentation im Tool | Tag 7 bis 10 | Brand Story, Positionierungssatz, Säulen, Formate, Rhythmus, 30 Hooks, Bio-Text |
| **4 Aufbau** | Fünf Setups parallel: Branding, Website, Accounts, Tool-Onboarding, Drehtermine | Tag 10 bis 24 | "Alles steht." Brand-Profil als eine Seite |
| **5 Erster Dreh** | Drehtag mit Shotlist und Skripten, Rohschnitt, Freigabe | Tag 14 bis 28 | Das erste Reel, freigegeben |
| **6 Live** | Erste Posts geplant, Kalender voll für 4 Wochen | bis Tag 30 | "Du bist live." Kalender-Ansicht |
| **Zyklus** | Monatlich: Ideen, Planung, Dreh, Schnitt, Freigabe, Posting, Report | fortlaufend | Monatsreport mit drei Empfehlungen |
| **Review** | Quartal: Strategie prüfen, Säulen justieren, Ziele setzen | alle 3 Monate | Aktualisierte Strategie, Version +1 |

Die Reise ist im Tool als Etappen-Karte sichtbar (Startseite des Maklers). Schritte, die den Makler brauchen, stehen oben ("Dein nächster Schritt"), alles andere läuft sichtbar im Hintergrund ("Beim Team: Website-Entwurf, fertig bis 02.10.").

---

## 4. Prozess-Katalog

Für jeden Schritt: Owner, Ein- und Ausgabe, Digitalisierungsgrad, Werkzeug-Empfehlung, Kostenhebel. Grad: **A** automatisch, **K** KI bereitet vor und Mensch prüft, **M** menschlich (Werkzeug unterstützt nur).

### 4.1 Etappe 0 und 1

| Schritt | Owner | Eingabe | Ausgabe | Grad | Werkzeug | Kostenhebel |
|---|---|---|---|---|---|---|
| Vertrag, Signing | Nikita | Angebot | unterschriebener Vertrag | A | E-Signatur (Yousign oder DocuSign), Webhook legt Makler-Akte an | Kein manuelles Anlegen; Contracting mit Team Court als Vorlage hinterlegt |
| Zugang und Willkommen | System | Makler-Akte | Login, Willkommens-Screen, Etappen-Karte mit Zielterminen | A | Tool | Ersetzt Start-Meeting-Koordination |
| Start-Termin (Workshop) buchen | Makler | Kalender Daniel | fixer Termin | A | Kalender-Buchung (Cal.com oder Google Calendar API) mit Puffer- und Clusterregeln | Terminabstimmung entfällt |
| Fragebogen | Makler | 5 Kapitel, ca. 30 Screens | strukturiertes Profil (JSON) | A | Tool, siehe Kap. 6 | Ersetzt Word/Typeform, Ergebnis maschinenlesbar |
| Vorab-Auswertung | System | Profil | Hypothesen für den Workshop (Archetyp, Milieus, Lücken), Interviewleitfaden für Daniel | K | Claude API mit Prompt-Vorlage | Workshop-Vorbereitung 0 Minuten statt 30 bis 60 |

### 4.2 Etappe 2 und 3

| Schritt | Owner | Eingabe | Ausgabe | Grad | Werkzeug | Kostenhebel |
|---|---|---|---|---|---|---|
| Workshop | Daniel | Leitfaden, Profil | Gespräch | M | Video-Call oder vor Ort; Leitfaden im Tool, Notizen am Schritt | Leitfaden und Hypothesen sparen Zeit im Gespräch, 60 statt 90 Minuten |
| Transkript | System | Aufnahme | Transkript, Zusammenfassung, Zitate | A | Whisper (Vercel Function oder Batch) oder Meeting-Recorder (tl;dv, Fireflies) | "Results Upload" entfällt, Transkript landet direkt am Schritt |
| Strategie generieren, zwei Wege | System | Profil, Transkript, UNIO-Storyline, Milieu-Wissen | Zwei alternative Strategie-Wege nach Schema (Kap. 7), Makler wählt einen | K | Regelwerk plus Claude API mit festem Ausgabe-Schema; im Prototyp rein regelbasiert | Ersetzt manuelles Schreiben; Daniel prüft zwei fertige Entwürfe statt einen zu verfassen |
| Review und Freigabe intern | Daniel | Entwurf | freigegebene Strategie v1 | M | Tool, Inline-Bearbeitung mit Änderungsverlauf | Prüfen dauert 20 Minuten statt Schreiben 3 Stunden |
| Präsentation | Daniel, Makler | Strategie | Verständnis, Zustimmung | K | Reveal-Screens im Tool ersetzen das Deck; Präsentationstermin 30 Minuten optional | Kein Deck-Bau |
| Planung Aufbau | System | Strategie, Kalender | Zielplan mit Terminen für die fünf Setups | A | Tool berechnet Termine rückwärts vom 30-Tage-Ziel | Ersetzt Kick-off-Meeting |

### 4.3 Etappe 4: die fünf Setups

| Schritt | Owner | Eingabe | Ausgabe | Grad | Werkzeug | Kostenhebel |
|---|---|---|---|---|---|---|
| Branding: Entscheidung neu oder Rebranding | Makler | Bestand (Logo, Farben) aus Fragebogen | Variante | A | Tool schlägt anhand Bestand vor | |
| Branding: Farben, Schrift, Leitidee | Daniel | Strategie, Archetyp | Brand-Profil (Farbwelt, Schriftpaar, Leitidee, Bildsprache) | K | Regelwerk: Archetyp und Milieu ergeben 3 Vorschläge, Daniel wählt und justiert | Vorschläge in Sekunden statt Recherche |
| Branding: Logo oder Wortmarke | Daniel, Grafik | Brand-Profil | Logo-Set (SVG, Varianten) | K | Wortmarken-Generator aus Schriftpaar; Bildmarke bleibt Handarbeit, wenn gewünscht | Wortmarke als Standard, Bildmarke als kostenpflichtige Option |
| Foto-Termin | Makler, Fotograf | Drehtag-Kalender | Portraits, Freisteller | M | Wird mit dem ersten Drehtag zusammengelegt, Zuschnitt über /maklerzuschnitt | Ein Termin statt zwei |
| Website | System, Daniel | Brand-Profil, Bio, Portraits, Region | Makler-Homepage | A | Bestehende Looks und LookEditor aus dem Shop; Generator füllt alle Felder aus dem Brand-Profil | Setup "step by step durch Daniel" entfällt; Daniel prüft nur |
| Media Accounts | Makler, Daniel | Bestand | Instagram (Professional), Facebook-Seite, Meta Business, Zugriff für UNIO | K | Geführte Checkliste mit Screenshots; Übernahme über Meta Business Partner-Zugriff; Status je Konto | Kein Hin und Her über Chat |
| Posting-Werkzeug | System | Konten | verbundene Kanäle | A | Phase 1: Planable oder Metricool per Link; Phase 2: eigene Anbindung über Meta Graph API (Limit 100 Posts/24 h pro Konto) | Eine Plattform statt Metricool plus Board |
| Tool-Onboarding | System | Rolle, Strategie | personalisierte Tour im Tool, kurzes Video | A | Tour aus Bausteinen, Video optional mit Avatar-Werkzeug (HeyGen) oder einmal gedreht | Ahmets individuelles Onboarding-Video entfällt |
| Drehtermine | Makler | Verfügbarkeit, Region | 3 Drehtage im Quartal, gebündelt | A | Selbst-Buchung mit Clusterregeln (Kap. 5), Agent Success Manager bestätigt nur | Termineinholung durch ASM entfällt |
| Asset-Ablage | System | alle Dateien | Bibliothek pro Makler mit Versionen, Rechten, Freigaben | A | Eigene Bibliothek im Tool (Speicher: Vercel Blob, S3 oder Drive als Adapter) | Ersetzt Drive-Ordner plus Notion-Link |

### 4.4 Monatszyklus

| Schritt | Owner | Eingabe | Ausgabe | Grad | Werkzeug | Kostenhebel |
|---|---|---|---|---|---|---|
| Ideen | System, Makler | Strategie (Säulen, Formate), Kalender (Saison, Feiertage), Marktdaten (LENS), Objekte des Maklers (NOVA), Performance der letzten Posts | 20 Ideen pro Monat, Makler wählt per Ja/Nein, Team ergänzt | K | Claude API mit Säulen-Quoten; Auswahl als Karten (eine pro Screen) | Ideenfindung von Stunden auf Minuten; Makler ist beteiligt, weniger Änderungswünsche |
| Planung | System | gewählte Ideen, Drehtag | Drehplan: Shotlist, Skripte mit Hook (3-Sekunden-Regel), Teleprompter-Text, Requisiten, Location, Reihenfolge | A | Tool generiert, Ahmet passt an | Vorbereitung eines Drehtags von 2 Stunden auf 20 Minuten |
| Dreh | Ahmet, Makler | Drehplan | Rohmaterial (Video, Foto) | M | Drehplan als Tagesansicht auf dem Handy, Häkchen pro Shot, Upload direkt in die Bibliothek | Sammel-Drehtage (Kap. 5), Standard-Setups, Teleprompter |
| Rohschnitt | System | Rohmaterial, Skript | Schnittvorschläge, Untertitel, Formatvarianten 9:16 und 1:1 | K | Descript oder CapCut (Batch), Opus Clip für Hooks; Feinschnitt durch Ahmet | 60 bis 80 Prozent der Schnittzeit |
| Grafiken | System | Vorlagen, Text, Brand-Profil | Carousels, Statics | A | Vorlagen-Engine (HTML zu Bild, wie Social-Exporte im Repo) | Grafiken ohne Grafiker |
| Lieferung und Freigabe | Makler | Ergebnis | freigegeben oder Änderung (max. 2 Runden), Auto-Freigabe nach 5 Tagen | A | Bestehender Auftrags-Flow aus dash-shop.jsx, zwei Buttons | Kein Chat-Ping-Pong, Fristen sichtbar |
| Posting | System | freigegebene Posts, Kalender | geplante Veröffentlichungen, Captions, Hashtags | A | Phase 1 Planable/Metricool, Phase 2 Meta Graph API und LinkedIn API | Ahmet plant nicht mehr per Hand |
| Community | Makler | Kommentare, DMs | Antworten | M | Hinweis-Liste im Tool, keine Automatisierung von Antworten (Vertrauensberuf); Comment-to-DM (ManyChat) optional für Lead-Magnete | |
| Report | System | Plattform-Daten, Posts, Kontingent | Monatsreport: Reichweite, Saves, Sends, Follower, beste Posts, drei Empfehlungen | A | Analytics-Adapter, Claude für Kommentar | Monatliches Reporting ohne Handarbeit |
| Kontingent | System | Abo, Aufträge | Verbrauch, Rest, Vorschlag für Vorproduktion | A | Tool | Ungenutztes Kontingent wird sichtbar und genutzt |

### 4.5 Quartals-Review

| Schritt | Owner | Eingabe | Ausgabe | Grad | Werkzeug | Kostenhebel |
|---|---|---|---|---|---|---|
| Vorbereitung | System | 3 Monatsreports, Strategie | Review-Dossier: Was lief, Säulen-Performance, Hypothesen | A | Claude API | Vorbereitung 0 Minuten |
| Gespräch | Daniel, Makler | Dossier | Entscheidungen | M | 45 Minuten, Notizen am Schritt | |
| Strategie v+1 | System, Daniel | Entscheidungen | aktualisierte Strategie mit Versionsverlauf | K | Tool | Kein neues Dokument, Diff statt Neuschrieb |

### 4.6 Shop und Sonderwünsche

| Schritt | Owner | Eingabe | Ausgabe | Grad | Werkzeug | Kostenhebel |
|---|---|---|---|---|---|---|
| Standardformate | Makler | Katalog, Objekt | Auftrag, Kontingent verrechnet | A | Bestehender Shop; Standardformate wie AI-Immobilienreel und Grafiken laufen ohne Team | Nullaufwand für Standard |
| Print | Makler | Brand-Profil, Objekt | druckfertige PDFs | A | LaTeX-Microservice mit UNIO-Templates (Visitenkarte, Faltmappe, Plakat) aus dem Brand-Profil | Satz entfällt |
| Sonderformat | Makler | Beschreibung | Auftrag mit Planungsschritt und Freigabe-Loop | K | Shop leitet in Auftrag mit Stufe Briefing; Tool schlägt nächstliegendes Standardformat vor | Sonderwünsche werden zu Standard gelenkt |
| Sonderwunsch (frei) | Makler | Nachricht | Ticket am Team-Board, mit Owner und Frist | A | Nachricht am Schritt oder in Aufträge; Ticket ist derselbe Datentyp wie Schritt | Kein Chat ohne Ticket |

---

## 5. Empfehlungs-Engine

Regeln, die aus den Daten laufen. Jede Empfehlung zeigt: Regel, Betroffene, Ersparnis, Handlung (ein Klick), Ablehnen mit Grund.

### 5.1 Für das Team (Kosten)

| Regel | Auslöser | Empfehlung | Ersparnis (Rechnung) |
|---|---|---|---|
| Sammel-Drehtag | 2 oder mehr Drehtage in derselben Region (Bezirk-Cluster) innerhalb von 10 Tagen | Zusammenlegen auf einen Tag, Slots vergeben | Anfahrt, Auf- und Abbau: ca. 1,5 h pro eingespartem Termin plus Fahrtkosten |
| Geteilte Location | Mehrere Makler mit Format "Studio" oder "Büro" im Monat | Ein Studiotag für alle | Miete und Aufbau geteilt |
| Standard statt Sonder | Sonderformat ähnelt einem Katalogformat (Textähnlichkeit, gleiche Dauer und Kanal) | Standardformat anbieten, Preisdifferenz zeigen | Planungsschritt und Freigabe-Loop entfallen, ca. 1 bis 2 h |
| Vorproduktion | Kontingent zu 40 Prozent ungenutzt am 20. des Monats | Am nächsten Drehtag Evergreen-Inhalte vorproduzieren | Kein verfallenes Kontingent, kein zusätzlicher Drehtag |
| Schnitt-Batch | Mehr als 5 Rohschnitte offen | Batch-Verarbeitung anstoßen, gleiche Vorlage | Kontextwechsel vermeiden (Task-Switching kostet bis 40 Prozent, APA) |
| Freigabe-Latenz | Makler gibt im Median später als 4 Tage frei | Erinnerungsrhythmus anpassen, Auto-Freigabe erklären | Wartezeiten und Nachfragen |
| Format-Mix | Ein Format wird bei allen Maklern unterdurchschnittlich freigegeben oder performt schlecht | Format aus dem Katalog nehmen oder überarbeiten | Produktion ohne Wirkung |
| Wiederverwendung | Vorlage, Skript oder Hook hat bei 3 Maklern funktioniert | Als Vorlage in die Bibliothek | Erstellzeit |

### 5.2 Für den Makler (Wirkung)

| Regel | Auslöser | Empfehlung |
|---|---|---|
| Rhythmus | Weniger als 3 Posts pro Woche in 2 Wochen | Frequenz halten (Buffer: 3 bis 5 Posts pro Woche verdoppeln Follower-Wachstum; Wochen ohne Post liegen unter der Basis) |
| Gesicht | Anteil Posts mit Gesicht unter 50 Prozent | Mehr Gesicht (Bakhshi et al.: plus 38 Prozent Likes) |
| Format | Carousels haben höhere Saves, Reels höhere Reichweite | Mix justieren je Ziel (Autorität oder Reichweite) |
| Säulen | Eine Säule unter 10 Prozent der Posts | Ausgleich im nächsten Ideen-Set |
| Zweitverwertung | Reel freigegeben, nur ein Kanal geplant | Auch für TikTok, Shorts, Facebook, LinkedIn planen |
| Zeit | Freigabe in 90 Prozent der Fälle ohne Änderung | Auto-Freigabe verkürzen auf 3 Tage, schneller live |

---

## 6. Der Fragebogen (Etappe 1)

Ziel: fünf Pflichtkapitel mit 44 Screens in rund 18 Minuten, dazu ein sechstes, optionales Kapitel "Deine Geschichte" (6 Freitexte), das vor dem Workshop nachgeholt werden kann. Bildauswahl, Regler und Chips wo möglich; Freitext dort, wo Verhalten und Erzählung gebraucht werden. Reveal am Kapitelende, Kapitel-Übersicht statt Prozentbalken. Grundprinzip aus der Forschung: **Verhalten statt Selbstbild** (Schwarz 1999, Levashina 2014), **Fremdbild korrigiert den blinden Fleck** (Vazire 2010, Connelly und Ones 2010), **Bilder sind Geschmacksfragen, keine Diagnosen** (Kritik projektiver Verfahren). Vollständige Evidenz in `docs/UNIO_HUMAN_RESEARCH_2026-09.md`.

Jede Frage hat ein Konstrukt und eine Quelle. Freitextfelder ("Sonstiges", "in deinen Worten") hängen an fast allen Auswahlfragen.

**Kapitel 1: Dein Weg** (Herkunft, Beweise, Verhalten)
1. Seit wann Makler (Auswahl). Kontinuität als Authentizitätstreiber (Morhart 2015, Napoli 2014).
2. Wie dazu gekommen (Auswahl). Herkunft.
3. Welche Immobilien wirklich (Gruppen-Chips, bis fünf, plus Freitext): 31 Typen in fünf Gruppen Wohnen, Vermietung, Investment, Gewerbe, Besonderes. Objektfokus steuert Beweisformate und Achse (Expertise-Vertrauen, Baylor).
4. Die letzten drei Abschlüsse in je einem Satz (Freitext). JTBD-Timeline, Verhaltensanker.
5. Warum diese Kunden dich gewählt haben (Mehrfach plus Freitext). Ability, Benevolenz, Integrität (Mayer, Davis, Schoorman 1995).
6. Was sie fast abgehalten hätte (Mehrfach).
7. Womit Kunden kommen, bevor sie an Verkauf denken (Mehrfach plus Freitext). Category Entry Points (Romaniuk).
8. Wann zuletzt freiwillig vor mehr als fünf Menschen gesprochen oder ein Video aufgenommen (Auswahl plus "wie hat es sich angefühlt"). Verhaltensanker für Extraversion und Kamera-Komfort (Bowden-Green 2020).
Reveal: "Deine Kunden kommen wegen ... zu dir."

**Kapitel 2: Deine Menschen** (Zielgruppe als Bild, Ort, Zugehörigkeit)
9. Zwei Wohnwelten aus sieben Karten (Sinus-Milieus ohne Fachbegriffe).
10. Lebensphasen (Mehrfach plus "beschreib einen typischen Kunden").
11. Deine Gegenden (Gruppen-Chips, bis acht, plus Freitext): 23 Wiener Bezirke, 15 Umland-Orte, Niederösterreich, Burgenland, Städte und Länder, Lagen (See, Berg, Therme, Wein, international).
12. Das Grätzl, in dem du die meisten Straßen mit Namen kennst (Freitext). Hyperlokal-Anker.
13. Wie viele der letzten zehn Abschlüsse lagen dort (Auswahl). Verhaltensanker zur Grätzl-Tiefe.
14. Eigentümer oder Käufer (Regler).
15. Wie sich ein Kunde nach der Arbeit mit dir fühlen soll (Mehrfach). Kapferer Self-Image.
16. Bei welchen Menschen bist du einer von ihnen (Freitext). Unity (Cialdini), Selbstkongruenz mit Zielgruppe (Sirgy).
Reveal: Zwei Wohnwelten mit Kommunikationscode.

**Kapitel 3: Deine Art** (Persönlichkeit, Werte, Grenzen)
17. bis 21. Fünf Regler: aufrichtig bis aufregend, kompetent bis nahbar, ruhig bis energisch, klassisch bis modern, zurückhaltend bis meinungsstark. Aaker-Dimensionen als Slider (VAS ist Likert gleichwertig, Kuhlmann 2017).
22. Figur-Bildwahl aus sechs (Kenner, Begleiter, Gestalter, Entdecker, Fels, Gastgeber). Als Sprachbild gelabelt, nicht als Test (Archetypen-Kritik).
23. Sechs Bildpaare "Was passt eher zu deiner Arbeit" (Altbau-Stiege oder Glasfassade, Handschlag oder Zahlen, Markt oder Lobby, Handschrift oder Typografie, Abendlicht oder Tageslicht, Menschen oder leere Räume). Forced Choice als Ästhetik-Präferenz für die Bildwelt (Hilliard 2022 vorläufig), ausdrücklich Geschmacksfrage.
24. Was dich antreibt: zwei aus zehn Werten (Schwartz-Wertetypen in Alltagssprache).
25. Drei Wörter, mit denen Kunden dich heute beschreiben (Freitext). Actual Self.
26. Drei Wörter, die sie in einem Jahr sagen sollen (Freitext). Ideal Self; der Abstand ist der Weg (Sirgy, Malär 2011: Actual Self bindet stärker, Ideal ist Entwicklungsziel).
27. Wie wohl beim öffentlichen Sprechen über eigene Erfolge (Skala). Honesty-Humility-Anker (HEXACO), steuert Beweisformate.
28. Was motiviert mehr: neue Kunden und Reichweite oder Bestand und Ruf sichern (Regler). Regulationsfokus (Higgins), steuert das Framing der zwei Wege.
29. Was darf öffentlich sichtbar sein (Mehrfach aus acht Kategorien: Sport, Familie, Grätzl, Meinung, Fehler und Learnings, Politik, Team, Humor). "Faces" statt Prozent (Maggio 2024).
30. Was du nie zeigen oder sagen würdest (Mehrfach plus Freitext). Oversharing-Grenze (Weijs 2019, Leite 2022).
31. Anrede im Erstkontakt: Du überall, Sie überall, Sie mit Vornamen, Du auf Instagram und Sie sonst. Kanalabhängig (Appinio 2019, Gretry 2017).
Reveal: Deine Figur mit Bild und Satz.

**Kapitel 4: Deine Marke heute** (Bestand, Distinctive Assets)
32. Was existiert (Checkliste: Logo, Farben, Website, Instagram, LinkedIn, Facebook, TikTok, YouTube, Fotos).
33. Follower auf dem stärksten Kanal (Auswahl).
34. Behalten und schärfen, neu aufsetzen, oder nichts vorhanden.
35. Dein wiedererkennbares Zeichen (bis zwei aus sechs). Distinctive Assets (Romaniuk); im Generator gilt Gesicht zuerst, Farbe zuletzt.
36. Ein Account, der dir gefällt, und warum (Freitext).
Reveal: Bestand als Karte, Vorschlag neu oder schärfen.

**Kapitel 5: Dein Rhythmus** (Machbarkeit, Gewohnheit, Fremdbild)
37. Kamera-Komfort 1 bis 5.
38. Zeit pro Monat (Auswahl).
39. Formate, die du dir vorstellen kannst (Bildkarten).
40. Kanäle sortieren.
41. Ziel in zwölf Monaten (Auswahl plus "woran merkst du, dass es geklappt hat").
42. Verfügbarkeit für Drehtage.
43. Fester Wochentermin, an den 30 Minuten Content anschließen (Freitext). Implementation Intention (Gollwitzer und Sheeran 2006, d = 0,65).
44. Drei Menschen, denen wir drei kurze Fragen schicken dürfen (Freitext, optional). 360 light (Connelly und Ones 2010).
Reveal: Zwei Wege für deine Marke (Kap. 7).

**Kapitel 6: Deine Geschichte** (optional, Vertiefung, schreibt die Brand Story)
45. Wo aufgewachsen, erste Berührung mit Immobilien. Heritage.
46. Der Moment, kurz vor dem Aufhören, und was dich umgedreht hat. Redemption Sequence (McAdams 2001), Underdog-Effekt (Paharia 2011).
47. Das letzte Mal abgeraten, obwohl es Provision gekostet hat. Benevolenz, Moralitätsprimat (Brambilla 2021).
48. Drei Ergebnisse aus 24 Monaten für einen skeptischen Verkäufer. Ability, Kompetenzbelege vor Verletzlichkeit.
49. Ein beruflicher Fehler und was du geändert hast. Pratfall (Aronson 1966) mit Gate: erst nach Belegen.
50. Wie dich dein letzter Kunde beschrieben hat, wörtlich. Fremdbild.
Reveal: "Deine Geschichte steht." Strategie rechnet neu, Version plus eins.

Regeln: Kapitel einzeln speicherbar, Wiedereinstieg jederzeit, ehrliche Zeitangabe am Start, Antworten im Brand-Profil einsehbar und änderbar; jede Änderung rechnet die Wege neu.

---

## 7. Strategie-Schema (Ausgabe der KI, geprüft durch Daniel)

Das Strategie-Dokument ist strukturiert, versioniert und wird im Tool als Reveal-Sequenz gezeigt (ein Abschnitt pro Screen), nicht als PDF.

**Zwei Wege zur Wahl.** Direkt nach dem Fragebogen (noch vor dem Workshop) erzeugt das Tool zwei vollständige, bewusst unterschiedliche Strategie-Wege aus den Antworten:

- **Weg A, Verstärken**: baut auf dem Archetyp, der am besten zu Persönlichkeitsreglern, Bildwahl und bisherigen Kunden passt. Geringstes Risiko, schnellste Routine.
- **Weg B, Dehnen**: nimmt den zweitbesten Archetyp und setzt ihn gegen A auf der Achse Autorität gegen Nähe oder Klassik gegen Moderne ab. Mehr Kontrast, mehr Aufmerksamkeit, verlangt etwas mehr vom Makler.

**Regeln des Generators aus der Forschung** (Details im Research-Anhang):
- **Pflichtsäule "Wie ich arbeite"** (Ablauf, Provision, Regeln, was ich nicht mache) in jedem Weg mit mindestens 15 Prozent. Integrität schlägt Sympathie (Moralitätsprimat, Brambilla 2021; transparente Authentizität, Audrezet 2020). In Österreich zusätzlich begründet: 72 Prozent halten die Maklerarbeit für unsichtbar (IS24).
- **Actual-Self-Regel**: Die Tonalität widerspricht nie dem Fremdbild; das Ideal (Frage 26) ist Entwicklungsziel, nicht Brand Voice (Malär 2011).
- **Verletzlichkeits-Gate**: Fehlergeschichten erst, wenn drei Kompetenzbelege online sind (Pratfall-Bedingung). Kundenfrust und Politik sind Standard-Sperrthemen.
- **Säulen aus Anlässen**: Jede Säule hängt an mindestens einem Category Entry Point aus Frage 7 (Erbe, Trennung, Familie, Investment).
- **Origin Story mit Redemption-Struktur** aus Kapitel 6: Kontext, Tief, Wende, gelebte Konsequenz. Individuelle Details vor Formel (gegen StoryBrand-Gleichklang).
- **Distinctive Assets in Wirkungsreihenfolge**: Gesicht und gleicher Bildausschnitt, Name, Schrift, zuletzt Farbe (Romaniuk 2018; Farbe ist das schwächste Asset). Farbwelt kommt aus den Bildpaaren (warm oder kühl), nicht aus Farbpsychologie-Tabellen.
- **Anrede-Regel**: Sie oder neutraler Plural bei Erstkontakt, Website, LinkedIn; Du nur, wenn der Makler es natürlich nutzt, auf Instagram und TikTok, bei Zielgruppe unter 40. Bei Widerspruch gewinnt die Persönlichkeit (Gretry 2017: vorgetäuschte Nähe senkt Vertrauen).
- **Honesty-Humility**: Wer ungern über Erfolge spricht, bekommt indirekte Kompetenzsignale (Kundenstimmen, Ablauf) statt Eigenlob.
- **Regulationsfokus**: Weg A und B werden dem Fokus entsprechend formuliert, Gewinn-Framing für Promotion, Sicherheits-Framing für Prevention, nie als "mutig gegen feige" (Regulatory Fit, d ≈ 0,30).
- **Rhythmus als Gewohnheit**: fester Wochenanker (Frage 43), kleinste Einheit, 10 bis 12 Wochen Habit-Phase (Lally 2010), Autonomie und schnelle Kompetenzerlebnisse (Self-Determination Theory).
- **Konfidenz sichtbar**: Trait-Regeln sind Defaults mit Override. Archetyp, Säulen-Prozente, Anrede und Hyperlokal-Wirkung werden als Wahl der Person formuliert, nicht als Diagnose.

Beide Wege haben dieselbe Struktur (Positionierung, Story, Säulen, Formate, Kanäle, Rhythmus, Tonalität, Farbwelt, Schriftpaar, Hooks, Bio) und werden nebeneinander gezeigt, mit "Passt, weil" und "Fordert dich, weil" aus den konkreten Antworten. Der Makler wählt einen Weg oder markiert, was ihm an beiden gefällt; der Workshop startet dann mit dieser Entscheidung statt bei null. Daniel kann im Review den Weg wechseln oder Abschnitte aus dem anderen Weg übernehmen. Die Wahl wird als Ereignis gespeichert und fließt später in die Empfehlungs-Engine ein (welcher Weg bei welchen Antworten gewählt wird).


1. **Positionierungssatz** (ein Satz: für wen, was, wogegen, warum glaubwürdig)
2. **Brand Story** in 8 Beats nach UNIO-Storyline-Logik (Herkunft, Reibung, Wendepunkt, Haltung, Beweis, Menschen, Versprechen, Signatur)
3. **Archetyp** mit Leitplanken für Bild, Ton, Tabus
4. **Zielmilieus** (2) mit Kommunikationscode, Lebensphasen, Grätzl
5. **Persönlichkeitsprofil** (5 Dimensionen als Werte) und Tonalitätsregeln (Beispiele "so ja, so nicht")
6. **Distinctive Assets**: Signature-Farbe, Ort, Satz, Geste, Intro-Muster
7. **Content-Säulen** (4 bis 5) mit Anteil in Prozent: Markt und Grätzl, Prozess und Wissen, Meinung, Persönlich, Beweise; Objekte als kleinste Säule
8. **Formate und Kanäle**: je Säule 1 bis 2 Formate, Kanal-Mix, Frequenz (Standard: 3 bis 4 Instagram-Posts pro Woche, davon 2 Reels und 1 bis 2 Carousels, tägliche Stories, 2 bis 3 LinkedIn-Posts, Zweitverwertung auf TikTok, Shorts, Facebook)
9. **30 Hooks** (Säulen-getaggt, 3-Sekunden-tauglich)
10. **Bio-Texte** für Instagram, LinkedIn, Website-Hero
11. **90-Tage-Plan**: 3 Drehtage, Themen pro Monat, Meilensteine
12. **Ziele und Messgrößen**: Reichweite, Saves, Sends, Profilbesuche, Anfragen; realistische Erwartung (Routine nach 90 Tagen, Lead-Effekte 6 bis 12 Monate)
13. **Branding-Empfehlung**: neu oder Rebranding, drei Farbwelten und Schriftpaare zur Wahl

---

## 8. Wissenschaftliche Grundlage (Kurzfassung mit Evidenz-Ampel)

| Thema | Befund | Evidenz | Konsequenz im Tool |
|---|---|---|---|
| Fragebogenlänge | 10 Fragen 89 Prozent Abschluss, 30 Fragen 85 Prozent; Abbruch steigt ab 7 bis 8 Minuten deutlich; offene Fragen kosten ca. 10 Punkte (SurveyMonkey) | robust | 30 Screens, 4 Freitexte, 12 bis 15 Minuten in Kapiteln |
| Eine Frage pro Screen | Typeform-Daten: 47 Prozent Abschluss gegenüber 21 Prozent; Bilder plus 120 Prozent | Anbieterdaten | Bild- und Kartenauswahl, ein Screen pro Frage |
| Prozentbalken | Null- bis Negativeffekt (Conrad et al.; ResearchGate-Studie: 6 Prozent weniger Abschluss) | robust | Etappen-Karte statt Balken |
| Aaker Brand Personality | validiertes Messinstrument, 5 Dimensionen | robust | 5 Slider |
| Archetypen | generativ, empirisch weich | mittel | nur als Bildsprache-Leitplanke |
| Distinctive Assets (Sharp, Ehrenberg-Bass) | Wiedererkennbarkeit schlägt Story | robust | eigenes Kapitel im Fragebogen |
| JTBD-Timeline | konkrete Vergangenheit schlägt Selbstbild | mittel | "letzte drei Abschlüsse" statt WHY-Essay |
| Sinus-Milieus im Immobilienmarketing | dokumentiert, bei UNIO bereits Standard | robust | bebilderte Milieu-Karte |
| Gesichter | plus 38 Prozent Likes, plus 32 Prozent Kommentare (Bakhshi et al. 2014, 1,1 Mio. Fotos) | robust, alt | Gesichts-Quote in Empfehlungen |
| Frequenz | 3 bis 5 Posts pro Woche verdoppeln Follower-Wachstum; Wochen ohne Post unter Basis (Buffer, 4,8 Mio. Kanalwochen) | Anbieterdaten | Rhythmus-Regel, Kontingent-Planung |
| Formate | Reels plus 36 Prozent Reichweite, Carousels höchste Saves (Socialinsider 2025); Mosseri: Watch Time, Likes, Sends | Anbieterdaten | Format-Mix je Ziel |
| Hook | 63 Prozent der Videos mit höchster CTR hooken in 3 Sekunden (TikTok for Business) | mittel | Hook-Pflichtfeld im Skript |
| Batching | Task-Switching kostet bis 40 Prozent (APA) | übertragen | Sammel-Drehtage, Schnitt-Batches |
| Parasoziale Beziehung | erhöht Vertrauen und Kaufabsicht | robust, nicht maklerspezifisch | Säule "Persönlich" verpflichtend |
| Makler-Markt | NAR 2025: 75 Prozent nutzen Social Media, 39 Prozent nennen es als beste Lead-Quelle, nur 38 Prozent nutzen Video regelmäßig | robust (USA) | Video als Kernformat, Argument im Onboarding |
| Time-to-Results | 90 Tage Routine, 6 bis 12 Monate Lead-Effekte | schwach | ehrliche Erwartung im Strategie-Screen |

| Vertrauen | Fähigkeit, Wohlwollen, Integrität (Mayer et al. 1995); Wärme und Kompetenz erklären 82 Prozent der Personenurteile, Moralität dominiert (Fiske, Brambilla 2021) | robust | Fragen 5, 47, 48; Pflichtsäule "Wie ich arbeite" |
| Erster Eindruck | Vertrauensurteil nach 100 ms (Willis und Todorov 2006), Thin Slices unter 30 s sagen Bewertungen voraus (Ambady 1992) | robust | Video vor Foto, variierte Gesichter, erste 3 Sekunden |
| Authentizität | Kontinuität, Glaubwürdigkeit, Integrität, Symbolik (Morhart 2015); Herkunft als Treiber (Napoli 2014) | robust | Kapitel 1 und 6 |
| Verletzlichkeit | Pratfall nur bei etablierter Kompetenz (Aronson 1966); intime Offenbarung schadet Glaubwürdigkeit (Leite 2022, Weijs 2019) | mittel | Gate für Fehlergeschichten, Sperrliste |
| Selbstkongruenz | Actual Self bindet stärker als Ideal Self (Malär 2011) | robust | Fragen 25, 26; Actual-Self-Regel |
| Narrativ | Redemption Sequences (McAdams 2001), Underdog-Biografien steigern Kaufabsicht (Paharia 2011), Narrative wirken r = .17 bis .23 (Braddock und Dillard 2016) | robust bis mittel | Kapitel 6, Origin Story |
| Distinctive Assets | Form und Gesicht am stärksten, Farbe am schwächsten (Romaniuk, Int. J. Advertising 2026) | robust | Reihenfolge in Kap. 7 |
| Fremdbild | Fremdratings sagen Leistung oft besser vorher (Connelly und Ones 2010, N = 44.178); evaluative Traits liegen im blinden Fleck des Selbst (Vazire 2010) | robust | Fragen 44, 50 |
| Verhaltensanker | Past-Behavior-Fragen valider als Trait-Selbstbericht (Levashina 2014, Schwarz 1999) | robust | Fragen 4, 8, 13, 47 |
| Persönlichkeit und Format | Extraversion sagt Content-Erstellung und Gesichtssichtbarkeit voraus (Bowden-Green 2020), Sprache trägt Trait-Marker (Yarkoni 2010) | mittel | Formatmix, Tonregeln |
| Honesty-Humility | stärkster Prädiktor für Selbstpromotion (HEXACO) | mittel | Frage 27, Beweisformate |
| Regulationsfokus | Regulatory Fit d ≈ 0,30 (Meta-Analyse) | mittel | Framing der zwei Wege |
| Gewohnheit | Implementation Intentions d = 0,65 (Gollwitzer und Sheeran 2006), Median 66 Tage (Lally 2010) | robust bis mittel | Frage 43, 90-Tage-Plan |
| Du und Sie | Instagram rund 80 Prozent Du, LinkedIn Mehrheit Sie (Appinio 2019, Deutschland); informeller Stil senkt Vertrauen bei unvertrauten Marken (Gretry 2017) | mittel bis schwach | Frage 31, Anrede-Regel |
| Bildwahl | Forced-Choice-Bildtests vorläufig validiert (Hilliard 2022), projektive Verfahren nicht (Wood et al.) | mittel bis schwach | Frage 23 als Geschmacksfrage |
| Parasozial bei Maklern | keine peer-reviewte Studie zu Beratungsabsicht | Lücke | als Hypothese gekennzeichnet |

Nicht übernehmen: "403 Prozent mehr Anfragen mit Video" und ähnliche unbelegte Branchenzahlen. Quellenliste in Kap. 15.

---

## 9. Rollen und Perspektiven

| Rolle | Wer | Sieht | Tut |
|---|---|---|---|
| Makler | jeder Makler im Abo | seine Reise, Strategie, Kalender, Inhalte, Aufträge, Report, Nachrichten | antwortet, wählt, bucht, gibt frei, bestellt |
| Strategie | Daniel | alle Makler in Etappe 1 bis 3, Reviews, Branding-Entscheidungen | Workshop, Strategie-Review, Branding, Quartals-Review |
| Produktion | Ahmet (Agent Success Manager) | Drehtage, Drehpläne, Schnitt, Freigaben, Posting, Tickets | plant, dreht, schneidet, liefert |
| Sales | Nikita | Pipeline vor Etappe 0, Vertragsstatus, Übergabe | legt Makler an (bis E-Signatur automatisiert), begleitet Etappe 0 |
| Admin | Daniel | Katalog, Abos, Vorlagen, Regeln der Empfehlungs-Engine, Nutzer | konfiguriert |

Team-Startseite ist eine Triage wie im Makler-Dashboard ("Heute"): wartet auf mich, überfällig, heute fällig, Empfehlungen. Kein KPI-Friedhof.

---

## 10. Informationsarchitektur

**Makler** (später Bereich Marketing im Dashboard, Sub-Tabs):
- Reise (Startseite bis Tag 30, danach "Dein Monat")
- Strategie (Reveal-Sequenz, Brand-Profil, Versionen)
- Kalender (Drehtage, Posts, Freigabefristen, Reviews)
- Inhalte (Bibliothek: Rohmaterial, fertige Posts, Grafiken, Print, Website)
- Aufträge und Shop (bestehender Shop, Kontingent)
- Report (Monat, Quartal)
- Nachrichten (immer an einem Schritt oder Auftrag hängend)

**Team**:
- Heute (Triage)
- Makler (Pipeline über die Etappen als Spalten, Akte pro Makler)
- Produktion (Drehtage, Drehpläne, Schnitt-Queue, Freigaben)
- Kalender (alle Drehtage, Cluster-Vorschläge)
- Tickets (Sonderwünsche, blockierte Schritte)
- Empfehlungen (Engine mit Annehmen/Ablehnen)
- Einstellungen (Katalog, Vorlagen, Regeln, Prompts)

Navigation: Master-Detail, Slide-Over 480 bis 640 px, jede Ansicht hat eine URL, Command-K.

---

## 11. Datenmodell

Entitäten (Prototyp als JSON in localStorage, später Tabellen):

- **Makler**: id, Name, Kontakt, Region, Abo (Typ, Start, Kontingent), Etappe, Rolle-Zugänge
- **Fragebogen**: maklerId, Version, Antworten je Frage, Kapitelstatus, Dauer
- **Workshop**: maklerId, Termin, Leitfaden, Transkript, Zusammenfassung, Notizen
- **Strategie**: maklerId, Version, Abschnitte nach Kap. 7, Status (Entwurf, geprüft, präsentiert, aktiv), Änderungsverlauf
- **Brandprofil**: maklerId, Farben, Schriften, Logo-Set, Portraits, Bio-Texte, Distinctive Assets, Website-Look
- **Schritt** (die zentrale Einheit, auch Ticket): id, maklerId, Etappe, Typ, Titel, Owner-Rolle, Owner-Person, Zustand, Fällig, Abhängigkeiten, Anhänge, Nachrichten, Ereignisse
- **Drehtag**: id, Datum, Region, Location, Slots (maklerId, Zeit), Drehplan je Slot, Status
- **Idee**: maklerId, Säule, Format, Hook, Skript, Zustand (vorgeschlagen, gewählt, verworfen, geplant, produziert)
- **Asset**: id, maklerId, Typ, Version, Quelle (Schritt, Drehtag), Rechte, Freigabe-Status
- **Post**: maklerId, Asset(s), Kanal, Caption, Termin, Zustand (Entwurf, Freigabe, geplant, veröffentlicht), Kennzahlen
- **Auftrag**: bestehendes Modell aus dash-shop.jsx (Stufen, Freigabe-Loop, Kontingent)
- **Zyklus**: maklerId, Monat, Kontingent-Soll und -Ist, Drehtag, Ideen, Posts, Report
- **Report**: maklerId, Zeitraum, Kennzahlen, beste Posts, Empfehlungen
- **Empfehlung**: Regel, Betroffene, Ersparnis, Zustand (offen, angenommen, abgelehnt mit Grund)
- **Ereignis**: Zeitstempel, Akteur, Typ, Bezug (ein Ereignis pro Aktion, wie im Dashboard)
- **Nachricht**: Bezug (Schritt oder Auftrag), Autor, Text, Anhänge

**Zustandsmaschine Schritt**: offen → geplant → in Arbeit → wartet auf Makler | wartet auf Team → in Freigabe → fertig; jederzeit blockiert (mit Grund) oder übersprungen (mit Grund). Etappen-Fortschritt leitet sich nur aus Schritten ab, nie manuell.

**Zustandsmaschine Post**: Idee → geplant → gedreht → im Schnitt → in Freigabe → freigegeben → geplant (Termin) → veröffentlicht → gemessen.

---

## 12. Technik

**Prototyp (Phase 1)**
- React ohne Build wie die UX-Kits (`ui_kits/human/`), Babel zur Laufzeit im Dev, esbuild im Build, veröffentlicht unter `/ux/human` hinter dem bestehenden Passwortschutz. Rollen über `?rolle=makler|team`, Makler über `?makler=<id>`.
- Design-Tokens und Dashboard-Bausteine wiederverwenden (`dash-helpers.jsx`, `dash-patterns.jsx`, `MK_CSS`). Kein neuer Stil.
- **Datenschicht als Adapter**: `human-store.jsx` mit einer Schnittstelle (`get`, `list`, `put`, `on`), Implementierung 1 localStorage (Keys `unio_hm_*`, Seed `unio_hm_seed_v1`), Implementierung 2 später HTTP (Supabase oder Zero-One). Alle Screens sprechen nur mit der Schnittstelle. Ereignisse als Storage-Events, damit zwei Fenster (Makler und Team) live synchron laufen (Demo-Wow wie beim Dashboard).
- **KI im Prototyp**: Strategie, Ideen, Hooks, Skripte und Report-Kommentare kommen aus vorbereiteten Beispieldaten für die Demo-Makler. Optional echte Generierung über eine Vercel Function `api/human-ai.js` (Claude API, Schlüssel als Env-Var), damit der Fragebogen eines echten Test-Maklers eine echte Strategie ergibt. Prompt-Vorlagen liegen als Dateien im Repo (`ui_kits/human/prompts/`) und sind im Admin sichtbar.
- Demo-Daten: drei Makler in verschiedenen Etappen (Tag 2, Tag 18, Monat 4), ein Team mit Daniel, Ahmet, Nikita.

**Backend (Phase 2, umschaltbar)**
- Supabase (Postgres, Auth, Storage, Realtime) oder Zero-One über HTTP-Adapter. Tabellen entsprechen Kap. 11.
- Integrationen als Adapter mit Stub im Prototyp: Kalender (Cal.com oder Google), Posting (Planable, Metricool, Meta Graph API, LinkedIn), Transkription (Whisper), E-Signatur (Yousign), Speicher (Vercel Blob oder Drive), Benachrichtigung (E-Mail über bestehende Gmail-Anbindung, WhatsApp nur über Business API mit AVV).
- Datenschutz: Fragebogen enthält personenbezogene Daten und Kundenbeispiele. Speicherort EU, Löschkonzept, Zweckbindung für KI-Aufrufe (kein Training).

**Zusammenführung (Phase 3)**
- Makler-Screens werden Sub-Tabs im Bereich Marketing des Makler-Dashboards, Team-Screens werden eine eigene Rolle im Backend-Dashboard. Store-Adapter wird auf die gemeinsame Datenquelle gezeigt. Keine neuen Sidebar-Punkte (Regel D1).

---

## 13. Umsetzungsplan in Schritten

Jeder Schritt ist eine Arbeitssitzung, endet mit einem prüfbaren Ergebnis und wird im Repo committet. Reihenfolge ist so gewählt, dass nach Schritt 4 bereits ein vorzeigbarer Kern existiert.

| Nr. | Schritt | Ergebnis | Dateien | Prüfkriterium |
|---|---|---|---|---|
| 1 | Fundament | Prozesslogik-Dokument (aus diesem Plan), Datenmodell, Store-Adapter, Seed mit 3 Demo-Maklern, Shell mit Rollenumschaltung | `docs/UNIO_HUMAN_PROZESSLOGIK.md`, `ui_kits/human/human-store.jsx`, `human-shell.jsx`, `index.html`, Build-Schritt in `build.mjs` | Zwei Fenster (Makler, Team) zeigen dieselben Daten; Änderung in einem erscheint im anderen |
| 2 | Reise-Shell | Etappen-Karte, "Dein nächster Schritt", Hintergrund-Schritte, Ereignis-Feed, Nachricht am Schritt | `human-reise.jsx` | Demo-Makler Tag 2, Tag 18, Monat 4 zeigen drei sinnvoll unterschiedliche Startseiten |
| 3 | Fragebogen | 5 Kapitel, 30 Screens, Bildkarten (Milieus, Archetypen, Formate), Slider, Reveals, Wiedereinstieg | `human-fragebogen.jsx`, Bildmaterial in `assets/human/` | Durchlauf in unter 15 Minuten, Antworten landen strukturiert im Store, Reveal-Screens korrekt |
| 4 | Strategie, zwei Wege | Regelbasierter Generator aus den Fragebogen-Antworten, zwei Wege nebeneinander mit Begründung, Auswahl, Reveal-Sequenz, Review-Modus für Daniel (Weg wechseln, Abschnitte tauschen, Versionen), Prompt-Vorlagen, optional Vercel Function für KI-Feinschliff | `human-strategie.jsx`, `prompts/`, `api/human-ai.js` | Beispiel-Strategie für alle Demo-Makler vollständig; ein echter Fragebogen erzeugt eine Strategie über die API |
| 5 | Team-Heute und Pipeline | Triage, Makler-Pipeline über Etappen, Makler-Akte, Schritt-Detail mit Zustandsmaschine, Tickets | `human-team.jsx` | Jeder Schritt jeder Etappe ist im Team änderbar, Makler sieht die Änderung |
| 6 | Aufbau-Etappe | Fünf Setups als Schritte mit Checklisten (Accounts), Branding-Vorschläge aus Archetyp (3 Farbwelten, Schriftpaare), Website-Generator aus Brand-Profil (bestehende Looks), Tool-Tour | `human-aufbau.jsx`, Anbindung `dash-shop.jsx` LookEditor | Brand-Profil wird als eine Seite gezeigt; Website-Vorschau füllt sich aus dem Profil |
| 7 | Drehtage und Kalender | Selbst-Buchung, Cluster-Logik (Region, 10-Tage-Fenster), Drehplan (Shotlist, Skripte, Teleprompter), Tagesansicht mobil, Team-Kalender | `human-dreh.jsx`, `human-kalender.jsx` | Zwei Makler in einem Bezirk erzeugen den Vorschlag Sammel-Drehtag; Drehplan ist druckbar und mobil nutzbar |
| 8 | Content-Zyklus | Ideen-Karten (Ja/Nein), Planung, Schnitt-Queue, Freigabe (bestehender Auftrags-Flow), Posting-Plan, Zyklus-Kontingent | `human-zyklus.jsx`, Wiederverwendung `AuftragDetail` | Ein Monat läuft von Idee bis "geplant" durch, Kontingent zählt korrekt, Auto-Freigabe-Datum sichtbar |
| 9 | Empfehlungs-Engine | Regeln aus Kap. 5 als Funktionen über den Store, Empfehlungs-Screen Team und Hinweise beim Makler, Annehmen mit Wirkung, Ablehnen mit Grund | `human-empfehlungen.jsx` | Jede Regel hat einen Testfall in den Demo-Daten und feuert nachweislich |
| 10 | Report und Review | Monatsreport (Kennzahlen, beste Posts, drei Empfehlungen), Quartals-Dossier, Strategie v+1 mit Diff | `human-report.jsx` | Demo-Makler Monat 4 hat drei Reports und einen Review mit Version 2 |
| 11 | Shop, Print, Nachrichten | Standard- und Sonderformate aus dem Shop in Schritte und Tickets, Print aus Brand-Profil (LaTeX-Anbindung als Stub), Nachrichten überall am Schritt | Anpassungen in `dash-shop.jsx`, `human-nachrichten.jsx` | Sonderwunsch erzeugt Ticket am Team-Board; Standardformat läuft ohne Team-Schritt |
| 12 | Politur und Übergabe | Motion nach Regeln, Command-K, URLs für jede Ansicht, mobile Prüfung, Demo-Skript zwei Fenster, Doku für Umstellung auf Backend (Adapter-Vertrag), Liste der Integrationen | `docs/UNIO_HUMAN_UEBERGABE.md` | Demo in 10 Minuten durchspielbar; Adapter-Vertrag dokumentiert |

Danach: **Phase 2 Backend** (Supabase-Adapter, Auth, Speicher, erste Integrationen Kalender und Posting) und **Phase 3 Zusammenführung** ins Makler-Dashboard.

Aufwand grob: Schritte 1 bis 4 je eine lange Sitzung, 5 bis 11 je eine Sitzung, 12 eine halbe. Prototyp vorzeigbar nach Schritt 4, vollständig nach Schritt 12.

---

## 14. Offene Fragen an Daniel

Antworten ändern Details, nicht die Architektur. Bitte vor Schritt 3 beantworten (Fragebogen) beziehungsweise vor Schritt 8 (Zyklus).

1. **Leistungsumfang je Abo.** Im Code stehen 3 Videos, 7 Grafiken, 10 Fotos (Standard) und 5 Videos, 15 Fotos (Premium); der Kontingent-Zähler rechnet mit 5 Videos, die alte Website mit 2 Grafiken. Welche Zahlen gelten?
2. **Agent Success Manager.** Ist das Ahmet, eine eigene Rolle oder künftig eine Person pro 20 Makler? Wer bestätigt Drehtage?
3. **Workshop.** Remote oder vor Ort? Wird aufgenommen (Transkript braucht Einwilligung)? Dauer?
4. **Drehkapazität.** Wie viele Drehtage pro Woche kann das Team leisten, wie viele Makler pro Drehtag? Gibt es ein Studio oder nur vor Ort?
5. **Volumen.** Wie viele Makler im Marketing-Abo bis Ende 2026 und 2027? (Businessplan: 100 Makler in der Community.) Das bestimmt, ab wann Sammel-Drehtage überhaupt greifen.
6. **Posting.** Eigene Anbindung über Meta Graph API anstreben oder Planable/Metricool als Dauerlösung (Lizenzkosten pro Konto)?
7. **Kommunikation.** E-Mail plus In-App reicht, oder ist WhatsApp Pflicht (dann Business API mit Auftragsverarbeitungsvertrag)?
8. **Meta-Zugriff.** Übernimmt UNIO Konten (Business-Partner-Zugriff) oder bleibt der Makler alleiniger Inhaber und UNIO plant nur?
9. **Lucida OS.** Was macht es heute konkret, was davon sollen wir kopieren, was bewusst nicht?
10. **Zero-One.** Gibt es eine API oder Dokumentation? Wer ist Ansprechpartner bei marlin?
11. **Name.** UNIO HUMAN als interner Arbeitsname, PERSONAL BRAND öffentlich, oder ein neuer Name?
12. **Anrede.** Makler durchgehend Du (wie Dashboard und E-Mail-Briefing), bestätigt?
13. **Preis für Sonderformate und dritte Korrekturrunde.** Fixpreise oder Stundensatz?
14. **Kundenbeispiele im Fragebogen.** Dürfen letzte Abschlüsse mit Bezirk und Preisklasse gespeichert werden (Datenschutz gegenüber den Kunden des Maklers)?

---

## 15. Quellen (Auswahl)

- SurveyMonkey: Survey questions and completion rates; Survey completion times; Progress bars
- Conrad, Couper, Tourangeau, Peytchev: The impact of progress indicators on task completion (Interacting with Computers)
- Typeform Datenreport (via Fillout), Rival Technologies 2025
- Aaker (1997) Brand Personality Scale und Replikationen (ResearchGate)
- Mark und Pearson (2001), archetypal approach study (ResearchGate)
- Kapferer, Strategic Brand Management (Identity Prism)
- Ehrenberg-Bass Institute: Differentiation versus Distinctiveness; Byron Sharp zu Distinctive Assets
- Christensen, Moesta (JTBD); Ulwick (ODI)
- SINUS-Institut: Wohn- und Lebenswelten; FMZ-Report 2022; Städtestatistik 2025
- Bakhshi, Shamma, Gilbert (2014): Faces engage us (Georgia Tech, Yahoo Labs)
- Buffer: Social Media Frequency Guide; Consistent Posting Study (4,8 Mio. Kanalwochen)
- Socialinsider: Instagram Benchmarks 2025; Reels Statistics
- Adam Mosseri (2025) zu Ranking-Signalen (Watch Time, Likes, Sends)
- NAR Technology Survey 2025
- TikTok for Business: 3-Sekunden-Hook
- APA zu Task-Switching-Kosten
- Meta Instagram Content Publishing API (100 Posts/24 h), LinkedIn API Limits
- Preis- und Funktionsstände 2026: HeyGen, Synthesia, Captions, Opus Clip, Descript, CapCut, Aragon, ElevenLabs, ManyChat, Planable, Metricool, Later, Frame.io, Dropbox Replay, Air
- UX-Referenzen: Duolingo, Headspace, Notion, Linear, Typeform, Stripe, Mercury (UserGuiding, Growth.Design, Appcues, Chameleon)
- Research-Anhang mit allen Links: `docs/UNIO_HUMAN_RESEARCH_2026-09.md` (Mayer et al. 1995, Fiske und Cuddy, Brambilla 2021, Willis und Todorov 2006, Ambady 1992, Morhart 2015, Napoli 2014, Audrezet 2020, Aronson 1966, Bruk 2018, Leite 2022, Weijs 2019, Sirgy, Malär 2011, Ashton und Lee HEXACO, McAdams 2001, Paharia 2011, Braddock und Dillard 2016, Cialdini, Bornstein 1989, Alter und Oppenheimer 2009, Romaniuk 2018, Labrecque und Milne 2012, Rammstedt BFI-10, Kuhlmann 2017, Martínez und Salgado 2021, Vazire 2010, Connelly und Ones 2010, Azucar 2018, Bowden-Green 2020, Yarkoni 2010, Matz 2017, Gorbatov 2018 und 2021, Lally 2010, Gollwitzer und Sheeran 2006, Regulatory-Fit-Meta-Analyse, Appinio 2019, Gretry 2017, Maggio 2024, IS24 Maklerimage, WKO Wien 2025)
- Intern: `docs/MAKLER_DASHBOARD_PROZESSLOGIK.md` und `_V2.md`, `docs/MAKLER_RESEARCH_2026-08.md`, `docs/UNIO_MASTER_STORYLINE.md`, `ui_kits/dashboard/dash-shop.jsx`, Diagramm "unio human - personal brands" (14.09.2026)
