# UNIO HUMAN. Benchmark Content-Produktion

Stand: 28.09.2026. Thema: Idee, Skript, Drehtag, Schnitt, Abgabe, Abstimmung, Posting, Community.
Bezug: `docs/UNIO_HUMAN_ROADMAP.md` (2.5 bis 2.7) und `docs/UNIO_HUMAN_V2.md` (5, 8, 9). Diese Datei ändert nichts an den Plänen, sie liefert Muster mit Quelle, damit Entscheidungen nachvollziehbar bleiben.

**Legende**

| Feld | Werte |
|---|---|
| HUMAN-Schritt | Idee, Skript, Drehtag, Schnitt, Abgabe, Abstimmung, Posting, Community, Wirkung |
| Aufwand | S (unter einem Tag), M (ein bis drei Tage), L (mehr als drei Tage) |
| Browser ohne Tokens | ja (reiner Browser, deterministisch), teilweise (Browser mit Modell-Download oder Einschränkung), nein (Server oder API-Schlüssel nötig) |
| Priorität | P1 (Phase 3, jetzt), P2 (Phase 4), P3 (Phase 5, Betrieb) |

Hinweis zur Quellenlage: Hersteller-Blogs (Planable, Filestage, BIGVU, Luxury Presence) schreiben über sich selbst oder Wettbewerber. Übernommen werden nur Funktionsbeschreibungen, keine Leistungsversprechen.

---

## 1. Abstimmung und Review

**Was die Besten machen**
- **Planable** kennt vier Freigabe-Modi (keine, optional, Pflicht, mehrstufig). Nach der Freigabe kann der Beitrag gesperrt werden, eine Freigabe mit gesetztem Termin plant ihn im selben Klick ein. Externe Kunden kommen ohne Konto über einen Link, können dort aber nur kommentieren, nicht formal freigeben. Textvorschläge in der Caption erscheinen als Durchstreichung plus neuer Text und werden mit einem Klick angenommen. Interne Kommentare sind gelb hinterlegt und für den Kunden unsichtbar. Sammelansicht "My approvals" mit "Approve all".
- **Filestage** erinnert automatisch an Fristen, und zwar gebündelt einmal morgens zwischen 7 und 8 Uhr, nicht am Wochenende. Entscheidungen: freigeben, freigeben mit Änderungen, Änderung anfordern, ablehnen. Status wechselt automatisch, sobald alle entschieden haben.
- **Ziflow** behandelt "Approved with changes" als eigene Entscheidung, die den nächsten Schritt trotzdem startet.
- **Frame.io V4** setzt Kommentare framegenau am Zeitcode, auch als Bereich (Taste I und O), als Pin direkt ins Bild und mit Zeichnung. Jeder Kommentar hat einen eigenen Link, Kommentare lassen sich intern oder öffentlich schalten.
- **Loomly** hält Entwürfe vor dem Kunden verborgen, sichtbar wird ein Beitrag erst ab "wartet auf Freigabe".
- Agentur-Befund: Kunden loggen sich nicht in Portale ein. Was funktioniert, ist ein Link, eine echte Vorschau und genau zwei Optionen.

**Muster für UNIO**

| Muster | Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|
| Abstimmung per persönlichem Link ohne Passwort, mit echter Handy-Vorschau und den zwei Knöpfen "Passt so" und "Etwas ändern". Anders als Planable darf der Link auch freigeben, weil der Makler der einzige Entscheider ist | [Planable Guide](https://planable.io/guides/content-approvals-in-planable/), [MydropAI](https://mydropai.com/post/best-social-media-approval-tools-agency-client-workflows-2026/) | Abstimmung | M | teilweise (Link-Token braucht im Betrieb einen Server, Prototyp simuliert) | P1 |
| Zeitgenaue Anmerkung im Video: Tippen auf die Vorschau pausiert, der Kommentar trägt Zeitcode und optional einen Punkt im Bild. In der Werkstatt erscheinen die Stellen als Marken auf der Timeline | [Frame.io Commenting](https://help.frame.io/en/articles/9105251-commenting-on-your-media) | Abstimmung, Schnitt | M | ja | P1 |
| Dritte Entscheidung "Passt, mit Kleinigkeit": Team korrigiert Tippfehler oder Termin, ohne dass ein Änderungswunsch verbraucht wird und ohne neue Runde | [Ziflow Decisions](https://help.ziflow.com/hc/en-us/articles/38343701869204-Understand-decision-calculation), [Filestage](https://filestage.io/blog/review-and-approval/) | Abstimmung | S | ja | P1 |
| Erinnerung als ein Sammel-Hinweis am Morgen (Werktag, feste Uhrzeit) statt einzelner Pings, dazu "Wenn du nichts sagst, geht der Beitrag am … so online". Nach Freigabe Sperre: jede Änderung öffnet die Abstimmung neu | [Filestage Reminders](https://help.filestage.io/en/articles/3161157-stay-on-top-of-your-due-dates-as-a-reviewer), [Planable Guide](https://planable.io/guides/content-approvals-in-planable/) | Abstimmung, Fristen-Wächter | S | ja (Versand im Betrieb über Server) | P1 |

Weitere Kandidaten: Caption-Vorschläge als Durchstreichung statt Freitext (Planable, P2), "Alle passen" für den Monatsstapel (Planable, P2), Entwürfe erst ab "An {Vorname} schicken" sichtbar (Loomly, gilt schon, als Regel festhalten).

**Typische Fehler, die UNIO vermeidet**
1. Login-Pflicht und Dashboard für eine Ja-Nein-Entscheidung. Folge: Beiträge liegen tagelang.
2. Endlose Runden ohne Frist. Planable lässt Beiträge im Pflicht-Modus unbegrenzt auf "Pending" stehen.
3. Kommentare ohne Ort ("am Anfang ist was komisch"). Ohne Zeitcode wird jede Rückfrage eine eigene Runde.

---

## 2. Planung und Posting

**Was die Besten machen**
- **Buffer** arbeitet mit Wochen-Slots je Kanal. Ein Beitrag kommt in den nächsten freien Slot, "Prioritize" schiebt ihn nach vorne, alles andere rückt einen Slot weiter.
- **Sprout Social ViralPost** wertet 16 Wochen eigene Interaktionen je Profil aus, wöchentlich aktualisiert, in 5-Minuten-Schritten, und zeigt die sieben besten Zeiten mit Sternen. Gemessen wird Interaktion, nicht bloße Anwesenheit.
- **Metricool** zeigt eine Heatmap (Wochentage mal Stunden) im Planer und importiert CSV mit fester Spaltenvorlage, UTF-8, Datumsformat muss beim Import gewählt werden.
- **Later** und **Hootsuite** zeigen empfohlene Zeiten direkt im Composer und im Kalender. Die allgemeinen Studien widersprechen sich (Later: 5 Uhr; Metricool: 6 bis 9 Uhr und 20 Uhr).
- **Meta Graph API (Instagram):** 100 API-Beiträge je 24 Stunden, Carousel zählt als einer. Medien müssen öffentlich per URL erreichbar sein, Bilder nur JPEG. Reels: MP4 oder MOV, H.264 oder HEVC, AAC bis 48 kHz, 3 Sekunden bis 15 Minuten, bis 300 MB, 23 bis 60 fps, empfohlen 9:16. Caption bis 2.200 Zeichen, 30 Hashtags, 20 Erwähnungen. Bis zu drei Collaborators, Titelbild per `cover_url` oder `thumb_offset`, Testreels (`trial_params`) nur für Nicht-Follower. Container-Status höchstens einmal pro Minute, maximal fünf Minuten abfragen.
- **Musik:** Seit Mai 2026 öffnet Meta Teile der Audio-Bibliothek für Drittanbieter, lizenzierte Musik fällt bei API-Posting aber weiterhin oft weg. Sicher ist Originalton.
- **LinkedIn:** Persönliche Profile brauchen `w_member_social`. Die API kennt keinen Termin-Parameter, der Server muss zum Zeitpunkt selbst posten. Video-Upload-URLs laufen ab, also kurz vor dem Termin hochladen. Access-Token 60 Tage, Refresh 365 Tage.

**Muster für UNIO**

| Muster | Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|
| Slot-Plan je Makler statt Uhrzeit je Beitrag: Wochenraster (z. B. Di 18:00, Do 07:30, So 19:30), freigegebene Beiträge rutschen in den nächsten Slot, "Vorziehen" für Objekt-Anlässe | [Buffer Scheduling](https://support.buffer.com/article/642-scheduling-posts) | Posting | M | ja | P1 |
| Eigene beste Zeiten aus dem Insights-Export (Interaktionen je Wochentag und Stunde, rollierend 16 Wochen) als Heatmap, mit Regel-Fallback auf das Standardraster, solange weniger als etwa 20 Beiträge vorliegen | [Sprout Optimal Send Times](https://support.sproutsocial.com/hc/en-us/articles/360042762271-Optimal-Send-Times), [Metricool Best Times](https://help.metricool.com/best-time-to-post-on-social-media-in-metricool-w7ll9) | Posting, Wirkung | M | ja (CSV-Import) | P2 |
| Plattform-Grenzen in den Abgabe-Check: Format, Dauer, Größe, fps, Codec, Caption-Längen, Titelbild gesetzt, Hinweis "Musik aus der App wird bei geplantem Posting entfernt, Originalton verwenden" | [Meta IG Media Reference](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/media), [Statusbrew](https://statusbrew.com/insights/adding-trending-audio-to-scheduled-content) | Abgabe | S | ja | P1 |
| LinkedIn als eigener Weg: Server postet zum Termin, Video-Upload unmittelbar davor, Token-Ablauf in den Fristen-Wächter ("Verbindung läuft in 7 Tagen ab"). UNIO als Collaborator auf Instagram-Reels des Maklers | [LinkedIn Posting API Guide](https://zernio.com/blog/linkedin-posting-api), [Meta Content Publishing](https://developers.facebook.com/docs/instagram-platform/content-publishing/) | Posting | L | nein | P3 |

Weiterer Kandidat: Testreel mit zwei Einstiegen über `trial_params` (erst Nicht-Follower, dann automatisch in den Feed). Passt zum Ideen-Generator, braucht aber die API (P3).

**Typische Fehler, die UNIO vermeidet**
1. Generische "beste Zeiten" aus Branchenstudien, die sich gegenseitig widersprechen. Für einen Wiener Makler mit 2.000 Followern sagen sie nichts.
2. Plattform-Grenzen erst beim Posten melden (Musik weg, Format abgelehnt, Token abgelaufen), statt vor der Freigabe.
3. Kalender als Hauptansicht. Wer 8 bis 12 Beiträge im Monat hat, braucht eine Warteschlange mit Lücken-Hinweis, keine Monatswand.

---

## 3. Schnitt

**Was die Besten machen**
- **Descript:** Das Transkript ist die Schnittfläche. Satz löschen schneidet das Video, Absatz verschieben ordnet um. "Remove Filler Words" mit vier Varianten (löschen, durch Pause ersetzen, nur markieren, nur aus dem Text), "Shorten Word Gaps" mit Schwelle, typisch 0,5 bis 0,7 Sekunden.
- **Opus Clip:** ReframeAnything verfolgt das Motiv für einen stabilen 9:16-Ausschnitt. Virality Score 0 bis 99 aus Hook, Tempo, Sprecher-Signalen. Im Test landen 20 bis 40 Prozent der Clips im Müll (fehlender Kontext, Untertitel-Drift). XML-Export nach Premiere und Resolve.
- **Submagic:** Wort-Hervorhebung in Untertiteln, Auto-Zoom auf Kernsätze, B-Roll aus Transkript, Stille und Füllwörter entfernen.
- **Captions (Mirage):** Blickkorrektur je Einstellung, Teleprompter nah an der Linse, Schnitt per Beschreibung.
- **CapCut:** Auto-Captions, Auto-Reframe, Stille entfernen nur in Pro. Seit Juni 2025 räumt sich CapCut weitreichende, dauerhafte Nutzungsrechte an Inhalten ein, und nur als "Commercial Use" markierte Vorlagen sind gewerblich frei.
- **Im Browser machbar:**
  - *ffmpeg.wasm:* praktisch nur single-thread stabil, harte Grenze bei etwa 2 GB. Die Multi-Thread-Variante braucht COOP und COEP, und genau diese Header brechen iframe-Einbettungen. Für den UNIO-Werkzeugvertrag (iframe plus postMessage) ist das ein Ausschlusskriterium.
  - *WebCodecs:* in Chrome, Edge, Firefox (Desktop) und Safari 26 verfügbar, H.264 hardwarebeschleunigt, laut Quellen 3- bis 10-mal schneller als ffmpeg.wasm. Firefox für Android fehlt.
  - *Mediabunny* (MPL-2.0, ohne Abhängigkeiten) liest und schreibt MP4, schneidet, skaliert, croppt und kann große Ausgaben auf die Platte streamen.
  - *MediaPipe Face Detector* (BlazeFace short range, bis etwa 2 m) läuft im Browser auf der GPU und liefert Gesichtsboxen je Frame, die Grundlage für 9:16-Reframe.
  - *Whisper über transformers.js:* Wortzeitstempel im Browser, Deutsch inklusive. Wortzeitstempel liefen laut Issue zeitweise nicht mit WebGPU, Modell-Download je nach Größe einmalig und gecacht.

**Muster für UNIO**

| Muster | Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|
| Transkript als Schnittfläche: Skriptsätze werden auf Wortzeitstempel gelegt, abweichende Stellen (Versprecher, Wiederholung) grau markiert, Satz antippen spielt die Stelle, Satz streichen schneidet | [Descript Filler Words](https://www.descript.com/blog/article/how-to-remove-filler-words-but-know-which-to-keep), [transformers.js Whisper Timestamped](https://huggingface.co/posts/Xenova/386072637398041) | Schnitt | L | teilweise (Modell-Download, WebGPU oder WASM) | P2 |
| Pausen über 0,6 s und Füllwörter ("äh", "also", "sozusagen") als Vorschlag, nicht automatisch gelöscht; der Mensch bestätigt mit einem Klick je Stelle oder "alle" | [Descript Underlord](https://help.descript.com/hc/en-us/articles/36803785502221-Underlord-beta-Your-AI-co-editor-in-Descript) | Schnitt | M | teilweise | P2 |
| 9:16-Reframe aus Gesichtsspur: Boxen je Frame, geglättet (kein Zittern), Ausschnitt nur bei Szenenwechsel oder großer Bewegung neu setzen; Vorschau mit Rahmen und Ziehen zum Korrigieren wie beim Zuschnitt | [Opus Clip Reframe](https://www.datastudios.org/post/opus-clip-clipanything-video-repurposing-virality-scoring-and-pricing), [MediaPipe Face Detector](https://ai.google.dev/edge/mediapipe/solutions/vision/face_detector) | Schnitt | M | ja | P2 |
| Rendern im Browser über WebCodecs und Mediabunny statt ffmpeg.wasm; Server-FFmpeg nur als Fallback für lange oder große Dateien | [Mediabunny](https://mediabunny.dev/), [MDN WebCodecs](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API), [ffmpeg.wasm vs Hosted](https://www.ffmpeg-micro.com/blog/ffmpeg-wasm-vs-hosted-api) | Schnitt | L | ja (Fallback nein) | P2 |

Design-Notiz: Untertitel mit Wort-Hervorhebung (Submagic) passen zu Reels, aber in der Markenschrift und ohne Emojis. Auto-Zoom sparsam, höchstens auf Zahl oder Kernsatz, sonst wirkt es nach Vorlage.

**Typische Fehler, die UNIO vermeidet**
1. Automatik als Endprodukt: 20 bis 40 Prozent Ausschuss bei KI-Clips, Untertitel-Drift, falsch geschriebene Namen. UNIO liefert Schnitt v1 mit Hinweisen, der Abgabe-Check prüft Wort für Wort.
2. Scheinpräzision: Ein Virality Score ohne Herleitung lässt sich weder prüfen noch verbessern. UNIO-Scores tragen ihre Messwerte mit (Vertrag `meta`).
3. Rechte-Fallen: Werkzeuge mit weitreichenden Lizenzen an hochgeladenem Material (CapCut) oder unklarer Musiklizenz. Maklermaterial mit Objekten und Gesichtern bleibt im UNIO-Speicher.

---

## 4. Teleprompter und Drehtag

**Was die Besten machen**
- **PromptSmart VoiceTrack** folgt dem Sprecher per Spracherkennung auf dem Gerät, ohne Internet. Bei Pause oder Improvisation stoppt der Text und wartet, bis wieder Skripttext gesprochen wird.
- **BIGVU** verbindet Skript, Teleprompter, Aufnahme, Untertitel und Blickkorrektur in einer App. Das Angebot "SuperAgent" für Makler: ein Coach plant jeden Monat, Skripte gehen zur Freigabe, nach der Aufnahme schneidet und postet das Team.
- **Instagram Edits** (Meta, kostenlos): Teleprompter direkt unter der Frontkamera, verschiebbar, Tempo einstellbar, seit 2026 Storyboards für Skript und Einsätze sowie Safe-Zone-Anzeige.
- **StudioBinder:** Shotlist aus dem Skript, je Einstellung Größe, Bewegung, Ort, Ton; Häkchen am Drehtag, Farbcodes, Druckbericht.
- **Web Speech API:** Seit Chrome 139 mit `processLocally` auf dem Gerät, auch für de-DE, Audio verlässt den Rechner nicht.

**Muster für UNIO**

| Muster | Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|
| Teleprompter folgt der Stimme: Web Speech API mit `processLocally`, Abgleich der erkannten Wörter mit dem aktuellen Satz, Stopp bei Improvisation; Fallback auf das heutige Tempo (0,3 s je Wort), wenn der Browser es nicht kann | [PromptSmart](https://promptsmart.com/), [MDN processLocally](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/processLocally) | Drehtag | M | teilweise (nur Chrome und Edge on-device) | P2 |
| Drehtag-Shotlist aus Skript und Objekt erzeugt: je Beitrag Einstellungen (Talking Head, Detail, Außen), Ort in Reihenfolge der Wege, Outfit-Wechsel gebündelt; am Handy abhaken und "guter Take" markieren, damit der Schnitt diesen Take zuerst nimmt | [StudioBinder Shot List](https://www.studiobinder.com/shot-list-storyboard/) | Drehtag, Schnitt | M | ja | P1 |
| Text nah an der Linse und Safe-Zone-Rahmen (Bereiche, die Instagram mit Namen und Knöpfen überdeckt) in Teleprompter und Vorschau | [Instagram Edits](https://www.inro.social/blog/edits-new-meta-app), [Captions Teleprompter](https://mirage.app/captions) | Drehtag, Abgabe | S | ja | P1 |

**Typische Fehler, die UNIO vermeidet**
1. Feste Scroll-Geschwindigkeit, die Sprecher hetzt oder warten lässt; wirkt abgelesen.
2. Teleprompter getrennt vom Skript-Stand: am Drehtag liegt eine alte Version auf dem Handy.
3. Aufnahme ohne Takes-Markierung: Der Schnitt sucht danach im Rohmaterial, was am Set längst klar war.

---

## 5. Ideen und Hooks

**Was die Besten machen**
- **Säulen:** 4 bis 5 Säulen für Makler (Wissen, Haltung, Lebensgefühl, Grätzl, Erfolge) oder die Quote Educate 40, Showcase 30, Connect 20, Convert 10. Alternativ 4-1-1: vier Mehrwert, ein weicher Verkauf, ein direkter Aufruf.
- **Buffer** taggt Ideen nach Säule, Format und Kanal. Die Tags wandern bis in die Auswertung, jede Säule lässt sich gegen die andere messen.
- **Hooks 2026:** Die Entscheidung fällt bei etwa einer Sekunde, nicht bei drei. Der erste Frame stapelt Bild, Texteinblendung und gesprochenen Satz. Frage und klare Behauptung wirken am stärksten, Muster wie "3 Fehler, die alle bei X machen".
- **Ranking-Signale laut Mosseri:** Wiedergabezeit, Likes je Reichweite, Sends je Reichweite. Sends zählen für neue Reichweite am stärksten. Originale werden bevorzugt, Reposts gebremst, echte Menschen vor KI-Material.
- **Hootsuite OwlyWriter, BIGVU, Coffee & Contracts:** Ideen aus Stichwort oder Link, dazu wöchentliche Trend-Briefs.

**Muster für UNIO**

| Muster | Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|
| Säule als Pflichtfeld jeder Idee, Quote je Makler aus der Strategie, Ist gegen Soll im Monat sichtbar; in Wirkung Reichweite, Saves und Sends je Säule | [Buffer Tags](https://buffer.com/resources/introducing-tags-organize-content/), [Sendible Pillars](https://www.sendible.com/insights/real-estate-social-media-content-pillars) | Idee, Wirkung | S | ja | P1 |
| Skript-Prüfung auf "erster Frame" umstellen: Hook-Satz unter etwa 8 Wörtern, Texteinblendung im ersten Clip vorhanden, Bild mit Bewegung oder Gesicht; heute prüft HUMAN "Hook in drei Sekunden" | [vidIQ Hooks](https://vidiq.com/blog/post/viral-video-hooks-youtube-shorts/), [Eliro](https://eliro.pro/blog/short-form-video-hooks-script-guide-2026) | Skript | S | ja | P1 |
| Ideen nach Weitersendbarkeit bewerten: Frage "Wem würde man das schicken?" mit Ideen-Mustern, die zum Teilen einladen (Grätzl-Tipp, Preisvergleich, Checkliste Kauf); Report zeigt Sends je Reichweite als Leitzahl | [Mosseri-Signale](https://www.dataslayer.ai/blog/instagram-algorithm-2025-complete-guide-for-marketers), [Hootsuite Algorithmus](https://blog.hootsuite.com/instagram-algorithm/) | Idee, Wirkung | S | ja | P1 |
| Anlass-Kalender Wien als Datenquelle des Ideen-Generators (Zinsentscheid EZB, Quartalszahlen Wohnungsmarkt, Jahreszeiten, Bezirksfeste); monatlich gepflegt wie ein Trend-Brief | [Coffee & Contracts](https://coffeecontracts.com/demo) | Idee | M | ja (Pflege durch Team) | P2 |

**Typische Fehler, die UNIO vermeidet**
1. Ideen aus dem Leeren (Stichwort rein, zehn generische Posts raus), ohne Bezug zu Säule, Objekt oder Anlass.
2. Hook-Listen, die jeden Beitrag gleich klingen lassen ("Das weiß niemand über …"). Hook-Muster je Makler rotieren und Wiederholung sperren.
3. Likes als Zielgröße. Für Makler zählt, ob der Beitrag weitergeschickt und gespeichert wird.

---

## 6. Community und Leads

**Was die Besten machen**
- **ManyChat Comment-to-DM:** Stichwort im Kommentar löst eine private Nachricht mit Link oder Unterlage aus. Offizielle API ist erlaubt. Seit 2026 höchstens eine automatische Nachricht je Person und 24 Stunden aus Kommentar- oder Story-Auslösern.
- **Meta-Grenzen für private Antworten:** eine private Antwort je Kommentar, innerhalb von 7 Tagen ab Kommentar, danach nur, wenn die Person selbst schreibt (24-Stunden-Fenster). 750 Aufrufe pro Stunde je Konto. Bei Lives nur während der Übertragung.
- **Agorapulse:** ein Posteingang für Kommentare, Nachrichten, Erwähnungen, Werbekommentare; Regeln nach Stichwort (ausblenden, zuweisen, markieren), gespeicherte Antworten, Eingang meist innerhalb einer Minute.
- **Sprout Social:** Zeit bis zur ersten Antwort je Tag, gerechnet in Geschäftszeiten, SLA-Ziele im Bericht.

**Muster für UNIO**

| Muster | Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|
| Stichwort-Antwort für Objekt-Reels: Kommentar "EXPOSÉ" oder "INFO" löst eine private Nachricht mit Exposé-Link aus, der Kontakt landet als Lead beim Makler. Einmal je Person, innerhalb der Meta-Fristen. Die Nachricht erfüllt nur die Bitte, das Gespräch führt der Makler | [ManyChat Guide](https://manychat.com/blog/the-ultimate-guide-for-instagram-comment-automation/), [Postproxy Private Replies](https://postproxy.dev/how-to/instagram-comment-to-dm-private-reply/) | Community | L | nein | P3 |
| Ein Posteingang je Makler mit Antwortziel 60 Minuten in Geschäftszeiten, Anzeige "wartet seit", Erinnerung durch den Fristen-Wächter; Zeit bis zur ersten Antwort im Report | [Sprout Inbox Report](https://support.sproutsocial.com/hc/en-us/articles/202123288-What-s-included-in-the-Inbox-Activity-Report), [Agorapulse Inbox](https://support.agorapulse.com/en/articles/10393075-agorapulse-inbox-explained) | Community, Wirkung | M | teilweise (Eingang braucht API, Regeln und Anzeige im Browser) | P2 |
| Sortier-Regeln statt KI-Antworten: Stichworte ordnen Kommentare nach Kaufinteresse, Frage, Spam; Kaufinteresse oben. Antwortbausteine als Vorschlag, die der Makler anpasst | [Agorapulse Inbox Assistant](https://www.agorapulse.com/features/social-media-inbox/) | Community | S | ja | P2 |

Entscheidung offen: Die Roadmap sagt "Das Werkzeug erinnert nur, es antwortet nicht". Die Stichwort-Antwort ist keine Antwort im Gespräch, sondern die Zustellung einer angeforderten Unterlage. Das sollte Daniel bewusst freigeben.

**Typische Fehler, die UNIO vermeidet**
1. Automatische Antworten im Namen des Maklers, die nach Bot klingen. Vertrauensberuf, siehe Roadmap Abschnitt 4.
2. Lead bleibt im DM-Postfach hängen und erreicht nie das CRM oder den Makler.
3. Verstöße gegen Meta-Regeln durch inoffizielle Werkzeuge, gleiche Texte in Serie oder Nachrichten an Personen, die nie interagiert haben.

---

## 7. Immobilien-spezifisch

**Was die Anbieter liefern**
- **Luxury Presence Social Media Management:** Posts, Carousels und Reels für Instagram und Facebook aus Objektfotos und Markenprofil, wöchentlich, jeder Beitrag geht vor Veröffentlichung zur Freigabe an den Makler. Seit Mai 2026 als "Presence Platform" mit KI-Werkzeugen gebündelt.
- **AgentFire:** WordPress-Seiten mit Grätzl-Guides; mit #DRIP wird aus Objekt, Blog oder Marktbericht in einem Schritt E-Mail, SMS und Social Post.
- **BIGVU SuperAgent:** Coach plant monatlich, Skripte zur Freigabe, Makler dreht, Team schneidet, brandet und postet. Das ist das HUMAN-Modell und bestätigt es.
- **Coffee & Contracts:** Wochenplan, Vorlagen, Captions, Reel-Skripte, wöchentliche Trend-Briefs.
- **Realtor Content Clone:** Videos mit digitalem Klon des Maklers ab 497 USD für vier Videos. Widerspricht dem Namen HUMAN und den Ranking-Signalen für echtes Material.
- Ein Produkt mit dem Namen "Real Estate Content Machine" war nicht eindeutig auffindbar; die Recherche deckt die Kategorie über BIGVU, Coffee & Contracts und Realtor Content Clone ab.
- **Österreich, EAVG 2012:** In jedem Immobilieninserat in Druck oder elektronischen Medien müssen Heizwärmebedarf und fGEE stehen, Beispiel "HWB 22, fGEE 0,93". Pflicht trifft auch den Makler, Strafe bis 1.450 Euro.

**Muster für UNIO**

| Muster | Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|
| EAVG-Prüfung im Abgabe-Check und in der Caption-Prüfung: Objekt-Beitrag ohne HWB und fGEE (in Caption oder Endkarte) geht nicht an den Makler | [ÖVI Informationspflicht](https://www.ovi.at/recht/energieausweis/informationspflicht-in-medien), [WKO Energieausweis](https://www.wko.at/vertragsrecht/energieausweis-vertragsrecht) | Abgabe | S | ja | P1 |
| Objekt-Paket: aus einem Objekt entstehen Reel (Objekt-Reel), Carousel, Story, Website-Karte und Newsletter-Absatz in einem Schritt, alle mit denselben Kennzahlen | [AgentFire](https://agentfire.com/), [Luxury Presence](https://www.luxurypresence.com/blogs/social-media-management-tools-agents-teams/) | Idee, Posting | M | ja (Grafik und Text im Browser) | P2 |
| Rhythmus "Coach plant, Makler spricht, Team liefert" ausdrücklich zeigen: auf Heute nur die eine Sache, die der Makler tun muss (Skript lesen, Drehtag, Abstimmen) | [BIGVU Done-for-you](https://bigvu.tv/blog/done-for-you-real-estate-video-marketing-worth/) | alle | S | ja | P1 |

**Typische Fehler, die UNIO vermeidet**
1. Vorlagen, die jeden Makler gleich aussehen lassen (Template-Bibliotheken). HUMAN baut aus Marke und Weg.
2. Digitale Klone und KI-Avatare statt echter Person.
3. Rechtliche Pflichtangaben vergessen (EAVG), weil US-Werkzeuge sie nicht kennen.

---

## 8. Übergreifend: drei Fehler dieser Tools

1. **Zu viel Oberfläche für eine kleine Entscheidung.** Portale mit Login, Dashboards und neun Spalten, obwohl der Makler nur "passt" oder "ändern" sagen will. HUMAN v3 und v4 gehen schon den richtigen Weg (Liste statt Kanban, zwei Knöpfe, eine Primäraktion).
2. **Automatik ohne Nachweis.** Scores ohne Herleitung, KI-Clips mit hohem Ausschuss, Untertitel mit Namensfehlern. Der UNIO-Vertrag (Score plus Messwerte plus Hinweise, Mensch korrigiert statt neu macht) ist genau die Antwort darauf und sollte für Schnitt und Posting gleich gelten.
3. **Grenzen und Regeln kommen zu spät.** Musik fällt beim Posten weg, Formate werden abgelehnt, Tokens laufen ab, lokale Pflichtangaben fehlen. HUMAN prüft vor der Abstimmung, nicht danach.

---

## 9. Die zehn wichtigsten Empfehlungen

| Nr. | Empfehlung | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|
| 1 | Abstimmung per Link ohne Login, echte Vorschau, zwei Knöpfe, dazu "Passt, mit Kleinigkeit" ohne Runde | Abstimmung | M | teilweise | P1 |
| 2 | Erinnerung gesammelt am Werktagmorgen, Auto-Freigabe mit Frist, Sperre nach Freigabe | Abstimmung | S | ja | P1 |
| 3 | EAVG-Prüfung (HWB, fGEE) für jeden Objekt-Beitrag | Abgabe | S | ja | P1 |
| 4 | Meta- und LinkedIn-Grenzen in den Abgabe-Check, inklusive Hinweis Originalton statt App-Musik | Abgabe | S | ja | P1 |
| 5 | Zeitgenaue Anmerkungen im Video mit Marken auf der Werkstatt-Timeline | Abstimmung, Schnitt | M | ja | P1 |
| 6 | Säule als Pflichtfeld bis in die Wirkung, Sends je Reichweite als Leitzahl | Idee, Wirkung | S | ja | P1 |
| 7 | Skript-Prüfung auf ersten Frame umstellen (Satz, Texteinblendung, Bild) | Skript | S | ja | P1 |
| 8 | Slot-Warteschlange je Makler, später mit eigenen besten Zeiten aus dem Insights-Export | Posting | M | ja | P1, Zeiten P2 |
| 9 | Transkript als Schnittfläche mit Pausen- und Füllwort-Vorschlägen, Reframe per Gesichtsspur, Rendern mit WebCodecs statt ffmpeg.wasm | Schnitt | L | teilweise | P2 |
| 10 | Stichwort-Antwort mit Exposé-Link und Posteingang mit 60-Minuten-Ziel, der Makler führt das Gespräch | Community | L | nein | P3 (Posteingang-Anzeige P2) |

---

## 10. Quellen

Abstimmung: [Planable Guide](https://planable.io/guides/content-approvals-in-planable/), [Planable Multi-level](https://help.planable.io/en/articles/3653801-multi-level-approvals), [Filestage Automations](https://filestage.io/automations/), [Filestage Reminders](https://help.filestage.io/en/articles/3161157-stay-on-top-of-your-due-dates-as-a-reviewer), [Filestage Review](https://filestage.io/blog/review-and-approval/), [Ziflow Decisions](https://help.ziflow.com/hc/en-us/articles/38343701869204-Understand-decision-calculation), [Frame.io Commenting](https://help.frame.io/en/articles/9105251-commenting-on-your-media), [Frame.io V4](https://frame.io/v4), [Loomly Workflows](https://loomly.zendesk.com/hc/en-us/articles/39019477164187-What-are-collaboration-workflows), [MydropAI Approval Tools](https://mydropai.com/post/best-social-media-approval-tools-agency-client-workflows-2026/)

Planung und Posting: [Buffer Scheduling](https://support.buffer.com/article/642-scheduling-posts), [Buffer Posting Schedules](https://support.buffer.com/article/514-setting-up-your-timezones-and-posting-schedules), [Sprout Optimal Send Times](https://support.sproutsocial.com/hc/en-us/articles/360042762271-Optimal-Send-Times), [Sprout ViralPost](https://sproutsocial.com/features/viralpost/), [Metricool Best Times](https://help.metricool.com/best-time-to-post-on-social-media-in-metricool-w7ll9), [Metricool CSV](https://help.metricool.com/en/article/how-to-schedule-posts-in-batch-with-a-csv-file-in-metricool-3wihqx/), [Later Best Time](https://later.com/blog/best-time-to-post-on-instagram/), [Hootsuite Recommended Times](https://help.hootsuite.com/s/article/recommended-times?language=en_US), [Meta Content Publishing](https://developers.facebook.com/docs/instagram-platform/content-publishing/), [Meta IG Media Reference](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/media), [Statusbrew Audio](https://statusbrew.com/insights/adding-trending-audio-to-scheduled-content), [LinkedIn Posting API Guide](https://zernio.com/blog/linkedin-posting-api), [bundle.social LinkedIn](https://bundle.social/linkedin-api)

Schnitt: [Descript Filler Words](https://www.descript.com/blog/article/how-to-remove-filler-words-but-know-which-to-keep), [Descript Underlord](https://help.descript.com/hc/en-us/articles/36803785502221-Underlord-beta-Your-AI-co-editor-in-Descript), [Opus Clip Virality Score](https://help.opus.pro/docs/article/virality-score), [Opus Clip Übersicht](https://www.datastudios.org/post/opus-clip-clipanything-video-repurposing-virality-scoring-and-pricing), [BIGVU Opus-Test](https://bigvu.tv/blog/opus-clip-tested-2026-where-ai-wins-40-percent-discard/), [Submagic](https://www.submagic.co/), [Captions Mirage](https://mirage.app/captions), [CapCut ToS-Änderung](https://ourownbrand.co/capcuts-terms-of-service-just-changed-what-creators-agencies-need-to-know), [CapCut Desktop FAQ](https://flowith.io/blog/capcut-desktop-pro-2026-faq-cloud-storage-auto-captions-commercial-use/), [ffmpeg.wasm vs Hosted](https://www.ffmpeg-micro.com/blog/ffmpeg-wasm-vs-hosted-api), [ffmpeg.wasm 4GB Issue](https://github.com/ffmpegwasm/ffmpeg.wasm/issues/876), [MDN WebCodecs](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API), [WebCodecs Support](https://www.testmuai.com/learning-hub/webcodecs-browser-support/), [Mediabunny](https://mediabunny.dev/), [MediaPipe Face Detector](https://ai.google.dev/edge/mediapipe/solutions/vision/face_detector), [Whisper Timestamped Browser](https://huggingface.co/posts/Xenova/386072637398041), [transformers.js Issue 820](https://github.com/huggingface/transformers.js/issues/820)

Teleprompter und Drehtag: [PromptSmart](https://promptsmart.com/), [PromptSmart Pro App Store](https://apps.apple.com/us/app/promptsmart-pro-teleprompter/id894811756), [BIGVU Teleprompter](https://bigvu.tv/tools/teleprompter-mobile-teleprompter-ios-android/), [Instagram Edits Guide](https://www.inro.social/blog/edits-new-meta-app), [StudioBinder Shot List](https://www.studiobinder.com/shot-list-storyboard/), [MDN processLocally](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/processLocally), [Chrome On-device Web Speech](https://groups.google.com/a/chromium.org/g/blink-dev/c/VNOok2dbmHM/m/gwbtzV-lAQAJ)

Ideen und Hooks: [Buffer Tags](https://buffer.com/resources/introducing-tags-organize-content/), [Buffer Ideas](https://support.buffer.com/article/589-creating-ideas-in-buffer), [Sendible Pillars](https://www.sendible.com/insights/real-estate-social-media-content-pillars), [Luxury Presence Social Strategies](https://www.luxurypresence.com/blogs/real-estate-social-media-marketing/), [vidIQ Hooks](https://vidiq.com/blog/post/viral-video-hooks-youtube-shorts/), [Eliro Hooks](https://eliro.pro/blog/short-form-video-hooks-script-guide-2026), [Dataslayer Mosseri-Signale](https://www.dataslayer.ai/blog/instagram-algorithm-2025-complete-guide-for-marketers), [Hootsuite Algorithmus](https://blog.hootsuite.com/instagram-algorithm/)

Community: [ManyChat Comment Automation](https://manychat.com/blog/the-ultimate-guide-for-instagram-comment-automation/), [ManyChat DM Rules](https://manychat.com/blog/instagram-dm-automation-rules/), [Postproxy Private Replies](https://postproxy.dev/how-to/instagram-comment-to-dm-private-reply/), [Agorapulse Inbox](https://support.agorapulse.com/en/articles/10393075-agorapulse-inbox-explained), [Agorapulse Features](https://www.agorapulse.com/features/social-media-inbox/), [Sprout Inbox Activity Report](https://support.sproutsocial.com/hc/en-us/articles/202123288-What-s-included-in-the-Inbox-Activity-Report), [Sprout First Response Time](https://sproutsocial.com/insights/first-response-time/)

Immobilien: [Luxury Presence Tools](https://www.luxurypresence.com/blogs/social-media-management-tools-agents-teams/), [Inman Presence Platform](https://www.inman.com/2026/05/06/luxury-presence-launches-unified-ai-platform-for-agents/), [AgentFire](https://agentfire.com/), [AgentFire Review](https://aiandrealtors.com/review-agentfire), [BIGVU Done-for-you](https://bigvu.tv/blog/done-for-you-real-estate-video-marketing-worth/), [Coffee & Contracts](https://coffeecontracts.com/demo), [Realtor Content Clone](https://realtorcontentclone.com/), [ÖVI Informationspflicht](https://www.ovi.at/recht/energieausweis/informationspflicht-in-medien), [WKO Energieausweis](https://www.wko.at/vertragsrecht/energieausweis-vertragsrecht)
