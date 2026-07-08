# UNIO Design System

**UNIO** ist das AI-native Operating System für Immobilienvertrieb (Auftraggeber: UNIO / Ad Boutique, Wien). Keine Agentur, kein Maklerbüro — eine Kategorie. UNIO macht den fragmentierten, analogen Immobilienmarkt **transparent** (Live-Daten statt Blackbox), **einfach** (digitales Backoffice) und **planbar** (Marktdaten → Entscheidungen → Abverkauf). Claim: **Raum. Technologie. Mensch.** Datenmotto: **„Echte Deals durch echte Daten."**

Dieses Design System ist das Ergebnis von **Phase 1: Style Exploration** — visuelle Bausteine, Glas-Komponenten und Motion-Prinzipien, die auf Homepage, Landingpages, Social Media und Produkt-Kommunikation ausgerollt werden.

## Quellen
- `uploads/unio-design-system-briefing.md` — Briefing Phase 1 (Style Exploration, Juli 2026).
- `uploads/unio-claude-design-arbeitsauftrag.md` — **bindender Arbeitsauftrag Website-Redesign** (Inhalts-Korrekturen, Seitenstruktur, Motion-Direktiven, harte Verbote). Bei Widerspruch gilt dieses Dokument.
- `uploads/Unio Homepage/` — bestehender Website-Build (6 Seiten + `_src`-Quellcode + `assets/img` Objektfotografie + Wortmarke). Inhalte/Struktur-Quelle für das Redesign.
- `uploads/` — Galerie echter Objektfotografie & Renderings + 3 Transition-Videos (Kling) + 1 Objektvideo + 15+ Inspirationsbilder. Kuratierte Auswahl unter `assets/`.
- Kein Figma.

## Die Kernmetapher: Transparenz
> **Opazität = der alte Markt** (Blackbox, Papierstapel). **Transparenz = UNIO** (Daten, Struktur, Übersicht).

Leitmotiv im Layering: **Bild (Raum) + Glas (Technologie) + Typografie (Mensch).** Glassmorphism NUR über echtem Bildmaterial — nie über leeren Gradients. Zweites Leitmotiv: die **Transformation von opak zu transparent** (Riffelglas löst sich auf, Blur wird scharf) als Scroll-, Hover- und Video-Erlebnis.

## CONTENT FUNDAMENTALS
- **Sprache:** Deutsch. B2B-Touchpoints im **Sie-Register** („Buchen Sie eine Demo"), Statements ohne Anrede.
- **Ton:** präzise, ruhig, selbstbewusst. UNIO ist ein *Betriebssystem*, keine „Software-Lösung".
- **Kein Hype-Vokabular:** „revolutionär", „next-gen", „seamless" sind verboten. Kein „AI" als Buzzword — Fähigkeiten zeigen, nicht behaupten (z. B. Matching visualisieren statt „KI-powered" schreiben).
- **Statements:** kurz, deklarativ, mit Punkt. „Echte Deals durch echte Daten." / „Der Markt wird lesbar." / „Mehr Mensch, weniger Papierkram."
- **Datenlayer-Copy:** Monospace, VERSALIEN, weit getrackt, sachlich: `NACHFRAGE-SCORE`, `PREIS / M²`, `PIPELINE — Q3`. Zahlen mit schmalem Leerzeichen und Einheit: `6 240 €/m²`, `94 %`.
- **Zahlen sind Arbeitswerte,** nie Versprechen. Keine „Garantie"-Badges.
- **Keine Emoji.** Nirgends.
- **Casing:** Headlines im normalen Satz (Sentence case), keine Title Case, keine Versal-Headlines; Versalien sind exklusiv dem Mono-Datenlayer vorbehalten.

## VISUAL FOUNDATIONS
- **Farbe:** warmes Off-White `--paper #F7F5F1` + warmes Tiefschwarz `--ink #0B0A09`. EIN Akzent: Signal-Orange `--signal #FB6221` (EcoSoft-Referenz, Feedback 02.07.; Text auf hell: `--signal-deep #C2410C`, Text auf Orange: `--on-signal`) — nur für Datenpunkte, Marker, aktive Zustände. Kühles Hellgrau `--steel #D1D3D5` als Flächen-Ergänzung. **Die Wortmarke bleibt #FFAA09 — nie umfärben.** Dazu drei Bildfarbwelten als Token-Scopes: `[data-palette="terra"|"stahl"|"gruen"]`. Kein klinisches Reinweiß, keine lila-blauen Gradients.
- **Typografie:** Power Grotesk (lizenzierte Brand-Font, lokal in `assets/fonts/`; Statements sehr groß, `letter-spacing -0.03em`, `line-height 0.98`) + JetBrains Mono (Daten, Labels, 12–14px, VERSALIEN, `+0.16em`). Nichts dazwischen. *(Mono ist weiterhin Google-Fonts-Substitut.)*
- **Glas:** `backdrop-filter: blur(20–40px)`, Tint dunkel `rgba(10,9,8,.42)` oder hell `rgba(247,245,241,.42)` je nach Bildhelligkeit, Hairline `1px rgba(255,255,255,.16)`. Doppelrand-Architektur: äußere Shell + innerer Kern mit **konzentrischen Radien** (innen = außen − Padding).
- **Riffelglas (E4):** Symbol für Intransparenz. Vertikale Streifen (`--flute-width 14px`), immer in Kombination mit Auflösung (ein Teil klar). Als Live-Effekt: gestreifte Verzerrung via SVG-Filter oder Streifen-Columns mit backdrop-filter.
- **Textur:** Film-Grain-Overlay (`--grain`, 2–4 % Opazität, pointer-events: none). Hairlines statt Borders. Sehr weiche diffuse Schatten (`--shadow-soft`), nie `shadow-md`.
- **Hintergründe:** echte Fotografie, vollflächig; Off-White-Flächen mit Grain; NIE leere Gradients unter Glas.
- **Layout:** asymmetrische Grids, Mut im Maßstab (riesig vs. mikroskopisch), großzügige Leere mit Temperatur. Keine symmetrischen 3-Spalten-Feature-Grids.
- **Hierarchie OHNE Eyebrows/Kicker-Pills** (hartes Anti-Pattern): stattdessen Größe, Mono-Labels *neben/unter* Elementen, nummerierte Marginalien (`01`, `02` …).
- **Motion:** erklärt, dekoriert nicht. Nur `transform`/`opacity`/`filter`, custom Bezier `cubic-bezier(0.32,0.72,0,1)`, 700–1200 ms, träge und gewichtig. Signature-Moves: Klarheits-Scroll (Riffel → klar), Blur-to-Data (Kennzahl wird scharf, Counter tickt), Panel-Scanner.
- **Hover:** Glas wird dichter (Tint-Opazität ↑) + Hairline heller; Press: `scale(0.985)`. Keine Farbrotationen.
- **Corner-Radii:** Panel 24 / Card 20 / Kern 12 / Pill 999. **Cards:** Glas über Bild, Hairline, weicher Schatten, Grain — nie opake weiße Karten mit Border.
- **Bildwelt:** warm, golden hour oder Tageslicht, Wiener Architektur & Interieurs; Drohne für Kontext. Kühl (Stahlblau) nur als Datenlook-Kontrast.

## ICONOGRAPHY
- **Kein Icon-Font, keine Standard-Libraries** (explizit: keine Lucide-2px-Strokes). Die Quellen enthalten keine Icons — Piktogramme werden NICHT erfunden.
- Statt Icons: **Mono-Zeichen & Typografie** — `→ ↗ × + ◦ ●`, nummerierte Marginalien (`01`), Mono-Labels, 1–1.5px-Hairline-Geometrie (Linien, Kreise, Marker-Punkte in `--signal`). Der Marker-Punkt (8px, Signal) ist das wiederkehrende „Icon" für Datenpunkte.
- **Keine Emoji, keine Unicode-Dekoration** über die o.g. funktionalen Zeichen hinaus.
- **Logo: VORHANDEN** — echte Wortmarke unter `assets/logo/` (`unio-logo-black.svg`, `unio-logo-white.svg`, `unio-icon.png` — das offene orange C). Weiß auf Ink/Foto, Schwarz auf Paper. Nie nachzeichnen, nie umfärben.

## Intentional additions
- **Standard-UI-Set** (Button, IconButton, Input, Select, Checkbox, Radio, Switch, Chip, Tag): vom Nutzer beauftragt („Glass primitives + standard UI kit"), im Briefing nicht einzeln definiert — Stilistik aus den Glas-Regeln abgeleitet.
- **StatBlock/DataLabel:** Verdichtung des E1-Datenlayers in wiederverwendbare Primitive.

## Index
- `styles.css` → `tokens/` (fonts, colors, typography, materials, spacing, base)
- `assets/logo/` echte Wortmarke · `assets/photos/` kuratierte Objektfotografie · `assets/img/` Website-Bildwelt aus dem Build (Cases, Objekte, LENS-Screenshots `lens-*.jpg`) · `assets/video/` Riffel-Transitions + Objektvideo · `assets/fonts/` Power Grotesk · `assets/reference/` bestehendes Social-Beispiel
- `guidelines/cards/` Foundation-Specimens (Design-System-Tab)
- `components/glass/` GlassPanel, GlassCard, DataOverlay, StatBlock, DataLabel, FlutedGlass
- `components/core/` Button (paper/solid/signal/glass/ghost + Knob-Kreis), IconButton, Chip, Tag, Input, Select, Checkbox, Radio, Switch
- `ui_kits/homepage/` Startseite nach Arbeitsauftrag (Klarheits-Reveal, Stat-Karten, System-Schleife, LENS-Browser-Frame) · `ui_kits/social/` 3×3-Serie · `ui_kits/property/` Objekt-Detailseite
- `SKILL.md` — Agent-Skill-Einstieg

## Offene Punkte
- Website-Redesign lt. Arbeitsauftrag: Startseite umgesetzt; Bauträger, Makler, Immobilien, Story, Kontakt ausständig (Freigabe je Seite).
- JetBrains Mono ist Google-Fonts-Substitut. Power Grotesk liegt lokal vor (weitere Schnitte in `uploads/Power Grotesk Complete Family/`).
- Platzhalter (`[PLATZHALTER: …]`) niemals durch erfundene Namen/Zahlen ersetzen; alle Zahlen sind Arbeitsstand.
