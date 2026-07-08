# UNIO Website Redesign — Arbeitsauftrag für Claude Design

**Mitgeliefert:** `Unio_Homepage-2.zip` (bestehender Build: 6 Seiten + `_src` Quellcode + `assets/img` Objektfotografie) und 15+ Inspirationsbilder.
**Sprache aller Outputs:** Deutsch. **Dies ist ein bindender Auftrag — bei Widerspruch zwischen diesem Dokument und dem alten Build gilt dieses Dokument.**

---

## 1. Der Auftrag in einem Satz

Übernimm die Inhalte, Seitenstruktur und interaktiven Werkzeuge des bestehenden Builds in ein neues, hochwertiges Design-System — und setze dabei die unten definierten Inhalts-Korrekturen, Struktur-Änderungen und das neue visuelle Leitmotiv um. Kein 1:1-Reskin: Struktur und Copy ändern sich an den markierten Stellen.

## 2. Die Marke (Kontext, kurz)

UNIO ist das AI-native Operating System für Immobilienvertrieb in Wien — eine Kategorie, kein Portal, keine Agentur, kein Maklerbüro. Kernversprechen: Der intransparente, analoge Immobilienmarkt wird durch Software **transparent** (Live-Daten statt Blackbox), **einfach** (digitales Backoffice statt Papierkram) und **planbar** (Marktdaten → bessere Entscheidungen → schnellerer Abverkauf). Claim: **Raum. Technologie. Mensch.** Datenmotto: **„Echte Deals durch echte Daten."** Ton: präzise, ruhig, selbstbewusst — kein Hype-Vokabular („revolutionär", „next-gen", „seamless" sind verboten).

Zielgruppen und Tonalität:
- **Bauträger** (bautraeger.html): rational, beweisgetrieben. **Anrede: Sie.**
- **Makler** (makler.html, CIRCLE): emotional, Ownership/Freiheit. **Anrede: Du.**
- **Käufer & Eigentümer** (immobilien.html): Vertrauen, Ergebnis. **Anrede: Sie.**
- Startseite: neutral bis leicht Sie-lastig; die Routen-Karten sprechen jede Gruppe in ihrer Tonalität an.

## 3. Das visuelle Leitmotiv (bindend)

**Opazität = der alte Markt. Transparenz = UNIO.** Jede visuelle Entscheidung folgt daraus:

- **Bild + Glas, nie Glas allein.** Frosted-Panels (backdrop-blur 20–40 px, Hairline `1px rgba(255,255,255,.12–.2)`) ausschließlich über echter Objektfotografie aus `assets/img` — nie auf leeren Gradient-Flächen.
- **Daten als Gestaltungselement:** Kennzahlen, Labels, Pipeline-Status in Monospace (JetBrains Mono / IBM Plex Mono), kleine Grade, weites Tracking, Versalien — wie in den Formora- und Carbon-Referenzbildern.
- **Typografie:** charakterstarke Grotesk in sehr großen Graden (Richtung Söhne/Suisse/General Sans — NICHT Inter, Roboto, Arial, Helvetica, Open Sans) + Monospace für Daten. Headlines deutsch; maximal ein englisches Signature-Statement auf der ganzen Website.
- **Farbe:** warmes Off-White (~#F7F5F1) und warmes Tiefschwarz (~#0B0A09) statt Reinweiß/Reinschwarz; Orange bleibt Akzent, präzise dosiert (Datenpunkte, Marker, aktive Zustände); feiner Film-Grain-Overlay (Opazität 2–4 %, fixed, pointer-events:none); Hairlines statt Borders; weiche diffuse Schatten statt shadow-md.
- **Motion erklärt, Motion dekoriert nicht.** Nur `transform`/`opacity`/`filter`; custom cubic-bezier (z. B. `cubic-bezier(0.32,0.72,0,1)`), 700–1200 ms, träge und gewichtig; backdrop-blur nur auf fixierten Elementen; ScrollTrigger-Logik konsolidiert statt vieler einzelner Scroll-Listener.

### Harte Verbote
- **Keine Eyebrows/Kicker über Headlines.** Der alte Build hat 48 davon (`.kicker`) — alle entfernen. Ersatz: kleine Monospace-Marginalien *neben/unter* der Headline oder Kapitelnummern (01–06) am Sektionsrand — oder nichts.
- Keine drehenden Ring-Orbs (alter `hero-orb ring-spin` — ersatzlos streichen), kein Stat-Ticker/Marquee (streichen), kein Partikel-Netz-Loader (streichen oder durch Riffelglas-Klärung des UNIO-Wortmarks <1 s ersetzen).
- Keine lila-blauen Gradients, Glow-Orbs, 3D-Blobs, Partikelnetze, Emoji in UI.
- Nicht jede Sektion im gleichen Layout-Rhythmus (Label + zentrierte Headline + drei Karten): mindestens drei unterschiedliche Sektions-Architekturen pro Seite.

## 4. Inhalts-Korrekturen (bindend, VOR Designfragen umsetzen)

1. **Beteiligungszahlen entschärfen:** „49 % Anteile" und „20 % Gewinn-Ausschüttung" erscheinen nirgends mehr als Zahl. Qualitativ formulieren: „echte Unternehmensbeteiligung für Top-Performer" / „Gewinnbeteiligung für die Community — Details im persönlichen Gespräch". Die 100 %/85 %-Provisionslogik und €599/Monat bleiben (die sind das öffentliche Angebot).
2. **Logo-Zeile Bauträger-Seite** umformulieren zu: „Erfahrung aus Marketing & Vertrieb für Rhomberg · Winegg · Soravia" (NICHT „Bauträger, die bereits mit uns arbeiten").
3. **Testimonials:** Das Zitat „Marcin Fituch, CIRCLE Partner" und der Case „@linda.vienna" werden durch `[PLATZHALTER: echter CIRCLE-Partner — Name, Foto, Zitat folgen]` ersetzt. Keine Namen erfinden.
4. **Story-Seite:** Kicker „2054 — Fusion" → „2026 — Die Fusion". Konsistent **„Drei Disziplinen, fünf Unternehmen"** erzählen: Vertrieb (BOOM LIVING, Trattner & Söhne) · Marketing (Ad Boutique) · Technologie & Automation (appworks/marlin, Digital Contract Solutions) — Headline darf „Fünf Unternehmen. Eine Mission." bleiben, Subline und Team-Sektion entsprechend anpassen.
5. **Zahlen streichen:** „50 Mio+ Zeilen Code" überall raus. „1 Mrd Reichweite" → „1 Mrd. Impressionen über Kampagnen" oder streichen.
6. **Widerspruch fixen:** Albrecht „Walk Score 99" vs. „Transit 25 · Auto empfohlen" — Transit-Zeile entfernen.
7. **Hero-Headline Startseite:** „Real Estate. Finally Simple." ersetzen durch eine deutsche Headline auf Basis von „Echte Deals durch echte Daten" bzw. der Transparenz-These (Vorschlag: „Der Immobilienmarkt ist intransparent. **Wir ändern das.**" — gern 2–3 Alternativen zur Auswahl anbieten).
8. **Modulnamen dosieren:** Auf der Startseite nur UNIO + CIRCLE + LENS namentlich. NOVA und LEAD ENGINE dort in Klartext auflösen („Wir testen Ihr Projekt live am Markt, bevor gebaut wird") und erst auf der Bauträger-Seite als benannte Module einführen.
9. **Doppelte CTA-Headline** auf der Startseite („Von validierter Story zu steuerbarem Abverkauf" = Prozess-Headline) durch neue CTA-Zeile ersetzen.
10. Simulator-Disclaimer ergänzen um Quellenlogik: `[PLATZHALTER: „Benchmarks aus X Wiener Wohnbau-Kampagnen 2024–2026" — Zahl folgt]`.

## 5. Struktur-Änderungen pro Seite

### Startseite (neue Sektionsreihenfolge)
1. **Hero:** Vollflächige Projektfotografie + EIN Satz + Klarheits-Reveal (siehe 6.1). KEINE Suchleiste (wandert auf immobilien.html), kein Dashboard-Vollpanel — stattdessen 3 Stat-Karten, die die Unterkante des Hero-Bildes überlappen (Referenz: Robot-Produktseite DBS02-X).
2. **Routen** (Bauträger / Makler / Immobilie) direkt unter den Hero — Copy pro Karte in der Tonalität der Zielgruppe.
3. **Proof kompakt:** Ecoluxe (+31 % über Zielpreis, 282 Anfragen) als großes Formora-Slide + 2 kleinere Cases.
4. **Das System als eine Schleife:** Products + Process zu EINER scrollgetriebenen Sektion fusionieren — eine durchgehende Linie mit Stationen (Analyse → Testing → Positionierung → Performance → CIRCLE → LENS), LENS als Browser-Frame (siehe 6.3).
5. **Mensch-Band** (bestehende HumanBand-Sektion, bleibt inhaltlich).
6. **Community-Teaser** (mit Testimonial-Platzhalter).
7. **Immobilien-Strip** kompakt (3 Karten, ohne B2B-Metriken).
8. **CTA** segmentiert (Bauträger / Makler), neue Headline.

### Bauträger
Reihenfolge: Hero → Marktrealität (Problem) → **Proof-Einschub** (1 Formora-Slide, neu — Proof vor Mechanik) → System (3 Karten) → Lernkurve Tag 30/90/180 (als wachsendes LENS-Dashboard, siehe 6.5) → Commercial Model → Conversion-Simulator → Case-Galerie → Funnel. Hero-Headline trägt den Nutzen statt des Prozesses: „100 % erfolgsbasiert" in oder direkt unter die Headline (statt „Testen. Lernen. Optimieren. Verkaufen."). Durchgehend Sie.

### Makler (CIRCLE)
Kürzen von ~12 auf ~8 Sektionen: **Problem-Sektion und „Drei Fragen" fusionieren** — die drei provokanten Fragen SIND die neue Problem-Sektion. Values-Streifen in den Community-Block integrieren. WhatIf + „Nicht die Agentur. Nicht das Portal. Du." zu EINER gepinnten Scroll-Szene fusionieren (Frage baut sich auf, löst sich, Antwort erscheint, Hintergrund kippt Ink→Hell). Jede Kennzahl (100 %, 85 %, €599, €150K) hat genau EINEN Auftritt an ihrer stärksten Stelle. Hero-Primär-CTA: „Was bleibt für dich? → Zum Rechner" (weich); „Als CIRCLE Partner bewerben" erst nach Rechner/Pillars. Provisions-Rechner unverändert übernehmen (Logik behalten, Design neu).

### Immobilien
Zwei gleichwertige Erzählstränge: **„Ich suche"** (kuratierte Objekte — generische Titel wie „Traum Penthouse mit Terrasse" durch echte Projektnamen ersetzen; B2B-Metriken wie „25 Anfragen/Woche" raus aus den Karten) und **„Ich verkaufe"** (NEU, mit sechs Nutzen: 1. Der richtige Preis — datenbasiert statt Bauchgefühl · 2. Käufer, die passen — Zielgruppen nach Milieu & Lebensphase · 3. Oft verkauft, bevor das Inserat online geht — vorgemerkte Käufer-Community, diskret möglich · 4. Vermarktung mit Wirkung — inszeniert, nicht nur inseriert · 5. Live-Transparenz — Sie sehen Reichweite, Anfragen, Besichtigungen, Angebote in Echtzeit · 6. Sicher bis zum Notar — ein Ansprechpartner bis zur Übergabe). Bewertungs-CTA wird Hero-Handlung. Der Eigentümer-Strang zeigt einmal LENS aus Eigentümer-Sicht.

### Story
Struktur bleibt; Korrekturen aus Abschnitt 4.4/4.5; NEU: Team-Band mit echten Gesichtern als Formora-Panel — `[PLATZHALTER: Gründerfotos folgen]`, Layout dafür anlegen.

### Kontakt
Übernehmen, nur ins neue System überführen.

## 6. Motion-Direktiven (die sechs Signature-Animationen)

1. **Klarheits-Reveal (Home-Hero, Prio 1):** Objektfoto startet hinter vertikalem Riffelglas-Effekt (SVG feTurbulence + feDisplacementMap, mobil: Fallback einfacher Blur), klärt sich beim ersten Scroll von links nach rechts; sobald klar, docken 3–4 Monospace-Datenpunkte mit Hairlines an konkrete Bildstellen an.
2. **Stat-Karten über Bildkante** (Home + Bauträger-Hero): weiße/gläserne Karten überlappen die Unterkante des Hero-Fotos (Referenz DBS02-X).
3. **LENS als Browser-Frame-Tour** (System-Sektion): Dashboard in realistischem Browser-Rahmen, scrollgetriebener sanfter Zoom + Wechsel zwischen 2–3 Ansichten (Cockpit → Pipeline → Eigentümer-Sicht). Referenz: s.Cycle. Dahinter riesige halbtransparente Ghost-Typo „LENS".
4. **Andockende Glas-Chips** (Makler, „80 % weniger Admin"): Um ein Porträt `[PLATZHALTER-Foto aus assets nutzen]` schweben ungeordnet Glas-Chips (Exposé · CRM · Termine · Closing · Abrechnung), die sich beim Scrollen in einen sauberen Stack sortieren. Referenz: Floating-Chips-Bild (Frau vor rotem Hintergrund).
5. **Wachsendes Dashboard** (Bauträger-Lernkurve): EIN LENS-Panel wird über Tag 30/90/180 sichtbar voller (mehr Datenpunkte, steigende Kurve, Pipeline füllt sich) — ersetzt die drei Textkarten.
6. **Formora-Case-Slides:** Vollflächiges Projektfoto, feiner Rahmen, vier Mono-Kennzahlen in den Ecken, Headline quer über dem Bild — für alle Cases.

Behalten (Logik 1:1, Design neu): Conversion-Simulator, Provisions-Rechner, Bauträger-Funnel, Kontaktformular.

## 7. Inspirationsbilder — Zuordnung

| Bild | Verwendung |
|---|---|
| Formora-Slides (dunkle Panels über Interieur, Eck-Daten) | Case-Slides, Team-Band, Proof-Sektionen |
| DBS02-X Robot-Produktseite | Hero-Stat-Karten über Bildkante, Ghost-Typo, helle Bento-Sektion |
| s.Cycle Sleep-Dashboard | LENS Browser-Frame-Tour |
| Floating Glass-Chips (Frau, rot) | Makler Admin-Animation |
| ATP „Scale Your Insight" (warme Porträts) | Community/Story-Porträt-Behandlung, Typo über Person |
| EcoSoft (Big Type, Orange/Grau/Schwarz) | Typo-Maßstab, Farb-Dosierung Orange |
| Fintech-Glas-UI über Stadtfoto / Carbon-Daten über Landschaft | Glass-Data-Overlay-Grammatik |
| „Fractal Haze" / grünes Riffelglas-Poster | Klarheits-Reveal (Riffelglas-Optik) |
| Bendwick B/W-Cards | helle Karten-Sektionen, Dokument-Motive |
| Meditation-App / Tennis-App / Iceland-Cabin | transluzente Controls, Objektkarten-Layer |

## 8. Arbeitsreihenfolge

1. Design-Tokens + Basiskomponenten (Glas-Panel, Karte, Buttons, Mono-Labels) als Style-Board.
2. Startseite komplett (inkl. Klarheits-Reveal).
3. Bauträger. 4. Makler. 5. Immobilien. 6. Story + Kontakt.
Nach jeder Seite: Screenshot-Review, erst nach Freigabe weiter.

**Nicht anfassen ohne Rückfrage:** Rechenlogik von Simulator/Rechner, Funnel-Schritte, echte Case-Zahlen (282 Anfragen, +31 %, 61/2 Wo., 27/2 Wo., 25/Wo., 40). Keine neuen Zahlen erfinden — bei fehlenden Werten `[PLATZHALTER]` setzen und melden.
