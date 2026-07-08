# UNIO Design System — Briefing für Claude Design
## Phase 1: Style Exploration

**Stand:** Juli 2026 · **Auftraggeber:** UNIO / Ad Boutique · **Arbeitssprache Output:** Deutsch (Code/Prompts EN)

---

## 0. Auftrag

Dies ist **kein Website-Build-Briefing**, sondern der Auftakt zu einem Design System. Ziel von Phase 1 ist die **Exploration von Style-Elementen**: visuelle Bausteine, Effekte und Animationsprinzipien, die später auf Homepage, Landingpages, Social Media und Produkt-Kommunikation ausgerollt werden. Es geht um Varianten, Studien und Prototypen — nicht um fertige Seiten. Jede Exploration soll als isoliertes, lauffähiges Modul gebaut werden (ein Effekt, eine Komponente, eine Animation pro Artefakt), damit wir kuratieren können.

---

## 1. Die Marke in einem Absatz

UNIO ist das AI-native Operating System für Immobilienvertrieb — eine Kategorie, kein Maklerbüro und keine Agentur. Kern: Der Immobilienmarkt ist fragmentiert, analog und intransparent. UNIO macht ihn durch Software **transparent** (Live-Daten statt Blackbox), **einfach** (digitales Backoffice statt Papierkram für den Makler) und **planbar** (Marktdaten → bessere Entscheidungen → schnellerer Abverkauf). Claim: **Raum. Technologie. Mensch.** Datenmotto: **„Echte Deals durch echte Daten."** Technologie ist Verstärker, nicht Selbstzweck — sie ersetzt die menschliche Beziehung nicht, sie verbessert sie.

---

## 2. Die Kernmetapher: Transparenz als Designprinzip

Das strategische Herz dieses Design Systems — **jede visuelle Entscheidung muss sich hierauf zurückführen lassen:**

> **Opazität = der alte Markt.** Blackbox, Bauchgefühl, Papierstapel, Intransparenz.
> **Transparenz = UNIO.** Die Software legt eine Schicht Klarheit über die Realität: Daten, Struktur, Übersicht.

Daraus folgt das visuelle Leitmotiv: **Echte Immobilienfotografie als Basisschicht + transluzente Interface-/Datenschicht darüber.** Das Bild ist der Raum (die Realität), das Glas ist die Technologie (die Klarheit), die Typografie ist der Mensch (die Aussage). Die Triade Raum · Technologie · Mensch ist damit wörtlich im Layering abgebildet.

Zweites Leitmotiv: **die Transformation von opak zu transparent** — als Scroll-Erlebnis, als Hover-State, als Video. Ein unscharfes, verriffeltes, verrauschtes Bild wird klar; aus Chaos wird Struktur. Das ist die UNIO-Story in einer Bewegung.

---

## 3. Design-Prinzipien (bindend für alle Explorationen)

1. **Bild + Glas, nie Glas allein.** Glassmorphism nur über echtem Material (Objektfotos, Architektur, Stadt, Landschaft). Nie frosted Cards auf leeren Gradient-Backgrounds — das ist das erste, was billig aussieht.
2. **Daten sind Gestaltungselement.** Zahlen, Labels, Koordinaten, Pipeline-Status — echte (oder plausible) Immobiliendaten werden typografisch inszeniert wie in Ref 6 (Carbon-Overlay): Monospace-Labels, präzise Linien, ein Akzentpunkt.
3. **Weißraum ja — aber mit Temperatur.** Großzügige Leere ist gewollt, aber nicht steril: warme Off-Whites, feine Noise-/Grain-Texturen (Opazität ≤ 3–4 %), gezielte Farbfelder. Kein klinisches Reinweiß über die volle Seite.
4. **Minimalistisch, aber aufregend.** Reduktion in Elementen, Mut in Maßstab: sehr große Typo, harte Kontraste zwischen riesig und mikroskopisch, asymmetrische Layouts, Momente der Überraschung (Distortion, Reveal).
5. **Techy ohne Tech-Klischees.** Präzision durch Typografie, Raster und Daten — nicht durch Neon, Circuit-Boards, Partikel-Netze oder 3D-Blobs.
6. **Motion erklärt, Motion dekoriert nicht.** Jede Animation transportiert eine Produktaussage (Transparenz, Vereinfachung, Datenfluss). Reine Deko-Animationen streichen.

---

## 4. Style-Elemente zum Explorieren

Jedes Element referenziert die mitgelieferten Bilder. Pro Element bitte **2–3 Varianten** bauen.

### E1 — Glass-Data-Overlay *(Ref: Fintech-UI über Stadtfoto · Carbon-Daten über Landschaft)*
Das Signature-Element. Frosted-Panel (backdrop-blur 20–40 px, weiße Hairline `1px rgba(255,255,255,.12–.2)`, Tint je nach Bildhelligkeit dunkel oder hell) über Objekt-/Stadtfotografie, darin: Kennzahlen (Nachfrage, Leads, Preis/m², Abverkaufsquote), Mini-Karte, Pipeline-Status. Zwei Tonalitäten explorieren: **Dashboard-Look** (mehrere gestapelte Panels wie Ref 3) und **Editorial-Look** (ein großes Panel mit Zahlenhierarchie wie Ref 6).

### E2 — Die Glaskarte *(Ref: „Master Every Layer" über Canyon · Iceland-Cabin-Vergleich)*
Die Basiskomponente für Cards (Objektkarten, Feature-Cards, Case-Cards). Explorieren: Grad der Transparenz (von fast klar bis milchig), Doppelrand-Architektur (äußere Shell + innerer Kern mit konzentrischen Radien), Verhalten auf hellen vs. dunklen Fotos, Solid-vs-Glass-Gegenüberstellung wie Ref 9 (interessant als „alter Markt vs. UNIO"-Erzählung in einem einzigen Bild).

### E3 — Big Type × Transparenz *(Ref: Social-Media-Grid der Digital Agency)*
Das Social-System: sehr große, eng gesetzte Grotesk-Headlines, die **mit** dem Bild interagieren — Text teils vor, teils hinter Bildebenen (Personen-Silhouetten, Gebäudekanten), transluzente Wort-Container, unterstrichene Statements. Für UNIO-Statements wie „Echte Deals durch echte Daten." oder Makler-Botschaften. Bitte ein 3×3-Grid-System als Serie denken (Konsistenz über 9 Formate), nicht als Einzelposting.

### E4 — Riffelglas / Fluted Distortion *(Ref: „Fractal Haze" · grün-oranges Distortion-Poster)*
Der aufregendste Effekt und das **Symbol für Intransparenz**: vertikal geriffeltes Glas zerlegt ein Bild in Streifen — die Realität ist da, aber nicht lesbar. Einsatz immer in Kombination mit Auflösung: ein Teil des Bildes verriffelt, ein Teil klar; oder als Übergangszustand, der sich per Scroll auflöst (→ Abschnitt 6, A1). Explorieren: Streifenbreite, horizontale vs. vertikale Riffelung, Kombination mit Monochrom (Ref 5) vs. satter Farbe (Ref 7).

### E5 — Warme Immersion mit transluzenten Controls *(Ref: Meditation-App)*
Gegenpol zum kühlen Datenlook, für die **Mensch-Dimension**: vollflächige warme Bildwelten (Interieurs, Abendlicht auf Fassaden), darauf schwebende, halbtransparente Pill-Buttons und Chips. Relevant für Endkunden-Touchpoints (Eigentümer/Käufer), wo Vertrauen und Wärme zählen. Explorieren, wie weit sich diese Wärme mit dem Datenlook (E1) in einem System verträgt — vermutlich über eine gemeinsame Glas-Grammatik bei unterschiedlicher Farbtemperatur.

### E6 — Immobilien-Detailseite als Layer-Erlebnis *(Ref: Tennis-App-Screens · Iceland-Cabin)*
Objekt-Detailseite und Exposé-Module: Galerie als Basisschicht, Fakten/CTA/Preis als Glasschicht darüber, die beim Scrollen über dem Bild gleitet. Chips für Tags (Milieu-Codes, Lage, Ausstattung), Foto-Indikator, Reserve-/Anfrage-CTA als heller Pill auf dunklem Glas.

---

## 5. Farbe, Typografie, Textur (Richtung — final offen, Teil der Exploration)

**Farbe.** Basis: warmes Off-White (`#F7F5F1`-Bereich) und tiefes Warm-Schwarz (`#0B0A09`-Bereich) statt Reinweiß/Reinschwarz. Ein Akzent, präzise dosiert — die Referenzen legen ein **Signal-Orange/Rot** nahe (Ref 2, 6, 7): gut für Datenpunkte, Marker, aktive Zustände. Dazu je Exploration eine Bildfarbwelt (warmes Terrakotta wie Ref 1/4, kühles Stahlblau wie Ref 2/3, tiefes Grün wie Ref 7/8). Bitte 2–3 Palettenvarianten als Token-Sets anlegen.

**Typografie.** Zwei Ebenen, kein Mittelmaß dazwischen: (1) eine charakterstarke Grotesk in sehr großen Graden für Statements (Richtung Neue Haas Grotesk / Suisse / Söhne / General Sans — **nicht** Inter/Roboto/Arial); (2) eine Monospace für Daten, Labels, Koordinaten, Zahlen (Richtung JetBrains Mono / IBM Plex Mono / Space Mono) in kleinen Graden mit weitem Tracking, gern in Versalien. Optional als dritte Stimme eine Serif nur für Endkunden-/Editorial-Momente testen.

**Textur.** Feiner Film-Grain als fixer Overlay (pointer-events: none, Opazität 2–4 %), Hairlines statt Borders, sehr weiche diffuse Schatten statt harter Drop-Shadows. Keine Standard-`shadow-md`-Ästhetik.

---

## 6. Scroll- & Erklär-Animationen: konkrete Ideen

Alle scrollgetrieben (GSAP ScrollTrigger mit scrub oder IntersectionObserver), alle GPU-safe (nur `transform`, `opacity`, `filter`), backdrop-blur nur auf fixierten Elementen.

**A1 — „Der Klarheits-Scroll" (Hero-Kandidat, höchste Priorität).** Ein Objektfoto liegt hinter Riffelglas (E4) — beim Scrollen schiebt sich die Riffelung aus dem Bild (oder die Streifen glätten sich), das Foto wird klar, und in dem Moment blenden Monospace-Datenpunkte mit Hairline-Linien auf konkrete Bildstellen ein (Preis, Nachfrage-Score, Lagequalität). Aussage in einer Geste: *UNIO macht den Markt lesbar.* Technisch: SVG-Filter (feTurbulence + feDisplacementMap) mit animierter Scale, alternativ zwei Bildebenen (verriffelt gerendert + klar) mit scrollgesteuerter Masken-/Clip-Kante.

**B2 — „Blur to Data".** Große Kennzahl startet mit `blur(24px)` und Opazität 0.3, wird beim Eintritt in den Viewport scharf, dann tickt ein Counter auf den Zielwert, dann erscheint das Mono-Label. Baustein für alle Zahlen-Momente (Dashboard-Sektion, Case-Zahlen, Social-Motion).

**B3 — „Das Panel entwickelt das Bild".** Ein Frosted-Panel fährt scrollgetrieben über ein Objektfoto; überall wo es das Bild überstreicht, „entwickelt" es Informationen — wie ein Scanner, der die Realität in Daten übersetzt. Innerhalb des Panels: Grundriss-Linien, Flächenangaben, Markierungen.

**B4 — „Papierstapel → Interface" (Makler-Story: Büroarbeit digitalisieren).** Rein grafisch, kein Foto: ein Stapel schematischer Dokumente (weiße Rechtecke, Linien als Textzeilen, leicht rotiert wie Ref-Archetyp Z-Axis-Cascade) sortiert sich beim Scrollen zu einem einzigen aufgeräumten Interface-Rechteck; die Linien ordnen sich zu Listenzeilen mit Häkchen. Aussage: *Mehr Mensch, weniger Papierkram.*

**B5 — „Pipeline-Linie" (Vertriebsprozess).** Eine einzige durchgehende Linie zieht sich scrollgetrieben über mehrere Sektionen (SVG stroke-dashoffset) und durchläuft Stationen: Akquise → Daten → Marketing → Matching → Closing. An jeder Station dockt ein minimalistisches Piktogramm/Panel an. Die Linie ist das verbindende Element — das Betriebssystem als roter Faden.

**B6 — „Matchmaking".** Zwei Punktwolken (Objekte links, Käuferprofile rechts, als reine Kreise in zwei Tönen) — beim Scrollen ziehen sich Linien zwischen passenden Punkten, unpassende dimmen ab, ein Paar rastet mit Akzentfarbe ein. Erklärt AI-Matching ohne ein einziges Wort „AI".

**B7 — „Dashboard-Aufbau".** Leere Fläche mit feinem Grid → Kacheln (Market Screening, Lead Quality, Pipeline, Broker Performance) gleiten gestaffelt ein (translate-y + Fade, custom cubic-bezier, gestaffelte Delays), Mini-Charts zeichnen sich selbst (Line-Chart als animierter Pfad, Balken wachsen). Die B2B-Vertrauenskomponente als Erlebnis.

**B8 — „Solid vs. Glass" (Vergleichs-Scroll).** Zwei identische Objektkarten nebeneinander (wie Ref 9): links die opake Karte des alten Marktes mit minimalen Infos — beim Scrollen verwandelt sich die rechte in die Glasvariante und reichert sich mit Live-Daten an. Vorher/Nachher als Komponenten-Morphing.

**Stilregeln für alle Erkläranimationen:** streng 2D, konstante Strichstärke (1–1.5 px), maximal drei Farben (Basis, Ton, Akzent), geometrische Grundformen, Monospace-Beschriftung, keine Icons aus Standard-Libraries in dicken Strokes, kein Easing per `linear`/`ease-in-out` — custom Beziers (z. B. `cubic-bezier(0.32, 0.72, 0, 1)`), Dauer eher 700–1200 ms, träge und gewichtig statt zappelig.

---

## 7. Anwendungsräume (worauf die Explorationen einzahlen)

**Homepage:** A1 als Hero-Prinzip, B5 als Seitenspine, E1/E2 für Sektionen, B7 für die Dashboard-Sektion. **Social Media:** E3 als Serien-System (Feed-Grid), E4 als Scroll-Stopper, B2 als Motion-Baustein für Reels/Stories. **Objekt-/Detailseiten & Exposés:** E6 + E1, zurückhaltendere Motion. **Pitch-/Sales-Material:** E1-Stills und B7-Screens als Deck-Visuals.

---

## 8. Do & Don't

**Do:** echte Fotografie als Träger · Monospace-Daten-Layer · sehr große Typo mit engem Satz · Hairlines · warme Neutrals + ein Akzent · Grain · asymmetrische Grids · Distortion gezielt als Story-Element · träge, physikalische Motion.

**Don't (hart):**
- **Keine Eyebrows/Kicker-Pills über Headlines** — das explizit gewünschte Anti-Pattern. Hierarchie stattdessen über Größe, Mono-Labels *neben* oder *unter* Elementen, oder nummerierte Marginalien.
- Keine generischen KI-Design-Muster: lila-blaue Gradients, Glow-Orbs, 3D-Blobs, Partikelnetze, „floating shapes", Emoji in UI, Standard-Lucide-Icons in 2px-Strokes.
- Kein Glassmorphism auf leerem Gradient-Hintergrund (Glas braucht Realität dahinter).
- Keine Systemfonts (Inter, Roboto, Arial, Open Sans, Helvetica als Default).
- Keine symmetrischen 3-Spalten-Feature-Grids mit Icon-Titel-Text.
- Kein Hype-Vokabular in Beispieltexten („revolutionär", „next-gen", „seamless") — Ton: präzise, ruhig, selbstbewusst. UNIO ist ein Betriebssystem, keine „Software-Lösung".
- Zahlen in Mockups als plausible Arbeitswerte behandeln, nie als verbindliche Versprechen inszenieren (keine „Garantie"-Badges).

---

## 9. Was Claude Design selbst baut vs. Briefings für Bild-/Video-KI

### Claude Design baut direkt (Code):
- Alle Glass-Komponenten (E1, E2, E5, E6): CSS `backdrop-filter`, Layering, Token-System.
- **Riffelglas als Live-Effekt:** SVG-Filter (`feTurbulence` + `feDisplacementMap`) oder gestreifte `clip-path`/Masken-Technik — funktioniert scrollanimierbar im Browser, keine Bild-KI nötig.
- Alle Scroll-Animationen A1, B2–B8 (GSAP/ScrollTrigger, SVG-Pfadanimation, Canvas wo nötig).
- Das Social-Grid E3 als HTML-Master (daraus Screenshots für statische Postings).

### Briefings für externe KI (unser Stack: Higgsfield · Artlist · Gemini · GPT · Claude):

**Gemini (Bildgenerierung) — statische Key Visuals & Riffelglas-Stills.** Am besten geeignet für fotorealistische Composings, bei denen der Effekt „ins Foto gebacken" sein soll (Social-Stopper, Poster, Deck-Cover).
> *Prompt-Basis:* „Editorial architecture photograph of a modern Viennese apartment building at golden hour, partially seen through vertical fluted reeded glass — the left 60 % of the image distorted into crisp vertical ribbed strips, the right 40 % perfectly sharp and clear. Muted warm palette, deep shadows, subtle film grain, no text, no people, high-end print quality, 4:5."
> *Variante Datenlook:* „…sharp area overlaid with a barely visible frosted glass panel, thin white hairline border, minimal monospace data labels" (Text danach besser in HTML/Design setzen statt generieren zu lassen).

**GPT (Bildgenerierung) — Serien-Konsistenz & Menschen.** Einsatz für die E3-Social-Serie mit Personen (Makler-Porträts hinter Glasebenen, Motion-Blur-Porträts wie Ref 2), da Serienlogik und Personendarstellung stabil.
> *Prompt-Basis:* „Minimalist editorial portrait of a confident real-estate professional, upper body slightly obscured by a translucent frosted glass pane covering the lower half of the frame, cool steel-blue tones with one warm orange accent, large negative space at the top for typography, photographic, grain, 4:5." (Serie: gleiche Lichtsetzung, wechselnde Personen/Hintergründe.)

**Higgsfield (Video/Motion) — der Klarheits-Effekt als Film.** Für Reels/Ads, wo A1 als Video gebraucht wird statt als Web-Animation.
> *Prompt-Basis:* „Slow cinematic push-in on a modern apartment facade seen through vertical reeded glass; the ribbed distortion gradually dissolves left to right until the building is perfectly sharp; warm evening light, subtle grain, no text, 4–6 s, seamless, 9:16." Zweiter Baustein: „macro shot of light refracting through fluted glass, abstract, slow drift, loopable" als Hintergrund-Loop für Stories/Website-Video.

**Artlist — Material & Sound.** Footage-Suche: „reeded glass", „through glass", „architecture detail Vienna", „frosted window light"; dazu reduzierte, perkussive UI-Sounddesigns für Reels (keine Corporate-Piano-Betten).

**Claude — Copy & System.** Statement-Copy für E3-Serie, Mikrocopy der Mock-UIs (deutsch, Sie-Register für B2B-Touchpoints), Dokumentation der Design-Tokens.

---

## 10. Deliverables Phase 1 & Bewertung

**Deliverables:**
1. Token-Basis: 2–3 Farbpaletten-Varianten, Typo-Paar (Grotesk + Mono), Radius-/Blur-/Hairline-/Grain-Werte als CSS-Variablen.
2. E1–E6 als isolierte Live-Komponenten, je 2–3 Varianten.
3. A1 als lauffähiger Scroll-Prototyp (Prio 1) + mindestens drei der B-Animationen.
4. E3-Social-Grid als 9er-Serie (HTML-Master).
5. Ein „Style-Board"-HTML, das alles nebeneinander zeigt, für die Kuratierung.

**Bewertungskriterien:** Zahlt das Element auf die Transparenz-Metapher ein? · Funktioniert es auf echtem Objektmaterial (nicht nur auf dem Referenzfoto)? · Ist es als System skalierbar (Homepage + Social + Detailseite) oder nur ein Einzeltrick? · Wirkt es teuer und eigenständig — oder nach Template? · Läuft die Motion butterweich auf Mobile?

**Assets, die bereitgestellt werden:** die 9 Referenzbilder dieses Briefings · eine Galerie echter Objektfotografie (Wiener Projekte, Interieurs, Fassaden, Drohne) · UNIO-Wortmarke/Logo · Beispiel-Datensätze für Mock-UIs (Preise, Pipeline-Werte — Arbeitsstand, nicht verbindlich).

---

*Hinweis: Alle Zahlen/Modelle in Mockups sind strategischer Arbeitsstand. Öffentliche Ausspielung erst nach Freigabe durch UNIO.*
