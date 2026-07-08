# UNIO — Design System

**"Data-Powered Real Estate."** UNIO is an Austrian (Vienna-based) proptech building the
infrastructure that makes real-estate sales *measurable, transparent and steerable* — from
first market test to final unit sold. The brand line: **Testen. Lernen. Optimieren. Verkaufen.**
(Test. Learn. Optimise. Sell.)

This repository is a **design system + skill**: brand foundations, tokens, fonts, real logo
assets, reusable UI-kit components, and sample slides — everything an agent needs to design
on-brand UNIO interfaces and decks.

> **Design direction of this system.** The client asked for a *redesign* of unio.at that feels
> **clean, light and data-driven** — referencing the Hikari app and a Garmin-style training
> dashboard: neutral light grounds, white cards, big quiet numbers, and thin minimal charts
> (dashed / dotted / gauge) with **surgical UNIO-orange accents**. So this system is built
> **light-first** with one clean grotesque (Host Grotesk). The brand **highlight stays UNIO
> Orange #FFAA09**; everything else is a neutral light scheme. (An earlier dark exploration was
> set aside in favour of this lighter, cleaner direction.)

---

## The product

UNIO bundles **five companies into one mission ("2054 — Fusion")** across the deal lifecycle.
The platform is organised as named modules:

| Module | What it does |
|---|---|
| **NOVA** | Real-time market validation — tests project, pricing, floorplans, target personas *before* build, with predictive models over thousands of buyer profiles. |
| **CIRCLE** | An agent-first broker community + share model. Top-performing self-employed agents (≥ €150K p.a.) keep their commission, build their own brand, and co-own the network. |
| **LENS** | Dashboard & Data Intelligence — live sales pipeline, unit status, demand, cost, velocity and predictions in real time. |
| **LEAD ENGINE** | Performance-marketing lead generation with intent scoring, AI qualification and data-driven sales execution to close. |

**The UNIO process:** ANALYSE → NOVA → POSITIONIERUNG/BRAND → PERFORMANCE MARKETING → CIRCLE → LENS (feedback loop).

**Audiences:** Bauträger (developers), Makler (brokers/agents), and home seekers/sellers.

**Proof points used across collateral:** 300+ Mio € volume mediated · 1 Mrd reach · 20+ agents ·
50 Mio+ lines of code · 3 Mio € revenue 2025.

**Pillars:** Transparency · Empowerment · Technologie · Data Ownership (Circle: Fairness · Empowerment · Technologie · Ownership).

---

## Sources this system was built from

All under `uploads/` in the originating project (kept for reference; reader may not have access):

- `UNIO Colors.pdf` — official palette (Orange `#FFAA09`, Yellow `#FFDB57`, Beige `#EDEDED`, Black `#000000`).
- `Unio Story.pdf` (15pp) — master pitch: problem/solution, process, KPIs, "Data-Powered Real Estate".
- `UNIO Circle V1.pdf` / `UNIO Investment Circle.pdf` (20pp) — agent + investor decks for CIRCLE.
- `Unio-Bewertung_V1.pdf` (8pp) — property valuation report template (Bewertung).
- Logos: `Unio_Logo_full_black.svg` / `_white.svg`, `Unio_logo_Logo_full_black.png`.
- Icon mark: `Unio_Icon_OhneBackground.png` (transparent), `Unio_Icon_WhiteBackground.png`.
- Live site: **https://www.unio.at/** (Webflow; sub-sites: `bewertung.unio.at`, `/circle`, `/bautrager`).
- Built by **Ad Boutique** (ad.boutique).

Reference moodboard the client cited for the techy direction: Palantir.com; Behance "Cenzo",
"Zaptix EV", "Orbitoshift" dashboard/pitch work.

---

## CONTENT FUNDAMENTALS

**Languages.** Primarily **German (Austrian)**, with **English** power-phrases as taglines
(*"Data-Powered Real Estate", "Automation where it matters. Human where it counts.", "Real Estate.
Finally Simple.", "From Strategy to Success", "Test before you build"*). English is used like a
stamp — short, confident, all-caps or title-case.

**Voice & address.**
- To **agents/partners (CIRCLE):** informal **„du"** — direct, motivational, challenger energy.
  *"Du arbeitest hart. Aber baust nichts Eigenes auf." · "Werde Teil der Bewegung."*
- To **developers/clients (Story):** formal **„Sie"** — assured, advisory, outcome-focused.
  *"Sie sehen jederzeit, wo Ihr Projekt steht."*
- Company speaks as **„Wir"** — accountable and plural. *"Wir bringen Klarheit, übernehmen volle Verantwortung."*

**Tone.** Confident, declarative, anti-fluff. Sentences are short and often **fragmented for
punch.** Frequent **contrast/antithesis** constructions: *"Bewiesen im Markt. Nicht am Papier."
· "Automation where it matters. Human where it counts." · "Ownership statt Abhängigkeit."* The
brand picks a fight with the status quo (the agency, the portal, the "Blackbox") and positions
UNIO as the system that gives back control.

**Casing.** Headlines are **UPPERCASE** in the expanded grotesque. Kickers/labels are uppercase
mono with wide tracking. Body is sentence case. A single accent clause in a headline is often set
**italic + orange** (*"…SONDERN AN UNSICHERHEIT"*).

**Numbers are the hero.** Every claim is quantified and set large in mono: `300+`, `1 MRD`,
`100%`, `85%`, `49% SHARE`, `€150K`. Treat figures as primary visual elements, not inline text.

**Punctuation & devices.** Numbered steps `01 / 02 / 03` in orange. Em-dashes for the
build-up-then-deliver beat. No emoji. No exclamation-spam (occasional, deliberate full-stops as
rhythm: *"TESTEN. LERNEN. OPTIMIEREN. VERKAUFEN."*).

**Vibe.** Premium fintech meets challenger brand. Trustworthy and transparent, but with momentum
and edge. Never cute, never corporate-grey.

---

## VISUAL FOUNDATIONS

**Core palette.** Brand highlight is **Orange `#FFAA09`** (kept from the brand). Everything else
is a **neutral light scheme**: page `#FFFFFF`, sectioned ground `#F4F4F2`, cards white / `#F5F5F3`,
ink text `#18191B` with grey tiers, hairlines black @ 5–16%. Orange is used **surgically** —
accent, active state, KPI highlight, chart peaks, the ring — never as large flat fills. A second
warm **Yellow `#FFC53D`** supports. Semantic green/red are muted for light.

**Typography.** One clean grotesque — **Host Grotesk** — carries display, UI and data. Headlines
are **Title Case** (not all-caps), weight 700–800, tight tracking. Numbers use the same face with
**tabular figures** (no separate monospace). Kickers are small uppercase tracked sans in
orange. This replaces the earlier Archivo-Expanded + JetBrains-Mono pairing for a cleaner read.

**The ring motif.** UNIO's mark is a **split open circle** (a broken "O"/"C"). It is the brand's
signature graphic device: used huge and cropped off-canvas as a decorative arc, as a loader/progress
ring, as a node in network/orbit diagrams, and as bullet/step markers. Lean on arcs and circular
geometry, not generic blobs.

**Backgrounds.** Light grounds; cards are white with soft 1px hairline + very soft shadow and
generous radii (18–24px). A faint **blueprint grid** can sit behind heroes; a soft warm orange
glow appears behind hero/CTA moments. Charts are **flat, thin and minimal** — dashed step lines,
thin bars, dotted rows, semicircle gauges — quiet grey with orange accents on the meaningful
points. Photography (Vienna architecture) is optional and used full-bleed; the system leans on
data, whitespace and type more than imagery.

**Animation.** Purposeful and crisp, never bouncy. Entrances **fade + 8–16px rise**;
**count-up** on KPI numbers; **draw-on** for charts/rings; subtle **ticker/marquee** for proof
bars. Easing `cubic-bezier(.16,1,.3,1)`. Durations 120–400ms (700ms for hero count-ups).
Respect `prefers-reduced-motion`.

**Hover / press.** Hover = +brightness and/or hairline → orange, sometimes a soft glow; links
shift to `--fg-1`/orange. Press = quick scale to ~0.98 + darken (orange→`--orange-press`). Focus =
2px orange ring at 45% on a 2px offset. Transitions 120ms.

**Borders, cards, elevation.** Tight radii (cards `10–14px`, chips/inputs `6–8px`, pills `999px`).
Cards = `--surface-1` + 1px hairline; raised state adds brightness + `--shadow-2`, not heavy drop
shadows. Elevation on dark is communicated by **lighter surface + sharper hairline + glow**, more
than by shadow. Data panels often show a **mono header row, a divider, then the figure** — a
"readout" pattern.

**Transparency & blur.** Used for overlays, sticky nav (backdrop-blur over translucent
`--bg-base`), tooltips and modal scrims. Glassiness is restrained — a nod to the brand's "Liquid
Glass" idea, not a frosted everything.

**Layout rules.** Strong grid; generous negative space around big numbers; left-aligned editorial
blocks; mono micro-labels pinned to corners (coordinates, indices, timestamps) for the
instrumented/console feel. Full-bleed photo bands butted against flat colour. Section starters can
flip to a black/orange panel for rhythm. Max one or two background colours per view.

**Imagery vibe.** Warm architectural in light contexts; cool, dark, high-contrast and grain-free
in the product UI. Charts are flat, line-and-area, orange-led, with mono axes.

---

## ICONOGRAPHY

- **Brand mark / icon font:** none shipped. The defining proprietary glyph is the **UNIO split
  ring** (`assets/logos/unio-icon.png`, and the wordmark SVGs) — reuse it as the loader, progress
  ring, and orbit node rather than drawing new circular marks.
- **UI icon set:** the system standardises on **Lucide** (`lucide` / CDN), chosen for its thin,
  geometric, 1.5–2px stroke that matches the wordmark's clean curves. Load from CDN
  (`https://unpkg.com/lucide@latest`) — it carries the proptech/data glyphs needed (trending-up,
  activity, layers, map-pin, building-2, gauge, target, sparkles, arrow-up-right, etc.).
  *Substitution flag:* the live Webflow site uses ad-hoc inline SVGs (arrows, quote marks); Lucide
  is our consistent stand-in — swap in official assets if the client provides a set.
- **Stroke / style rules:** monoline, 1.5–2px, round joins, no fills, currentColor. Size 16/20/24.
  Icons inherit text colour; orange only for active/accent.
- **No emoji. No unicode dingbats.** Numbered steps `01–04` and the ring stand in for decorative
  icons. Arrows are the most-used glyph (flow, "next step", external link → `arrow-up-right`).
- Decorative spot-illustration in the decks = **flat orange silhouettes** (buildings, figures).
  Recreate as solid `--orange` shapes, not multicolour illustration.

---

## INDEX — what's in this system

**Foundations (root)**
- `colors_and_type.css` — all design tokens (color, type, spacing, radii, elevation, motion) + semantic type classes. **Canonical reference.** Note: this preview environment serves only the opened HTML file (sibling CSS/JS/images don't load), so deliverables **inline** these tokens in a `<style>` block rather than `<link>`-ing this file. In a real build, link it normally.
- `README.md` — this file.
- `SKILL.md` — Agent-Skill front-matter so this folder works as a downloadable Claude skill.

**Assets** (`assets/`)
- `logos/` — wordmark (black/white SVG + PNG), ring icon (transparent + white-bg).
- `img/` — `vienna-facades.jpg` (architecture band extracted from the deck).

**Preview cards** (`preview/`) — small HTML specimens rendered in the Design System tab
(colors, type, spacing, radii, components, logo).

**UI kits** (`ui_kits/`)
- `homepage/` — dark, data-driven **homepage redesign** of unio.at (hero, proof ticker, products NOVA/CIRCLE/LENS/LEAD ENGINE, process, CTA, footer).
- `lens_dashboard/` — **LENS** product UI: live sales-pipeline / data-intelligence dashboard.

**Slides** (`slides/`) — pitch-deck slide templates in the UNIO system (title, KPI/stat, problem 01-02-03, process, big-quote, CTA), reusing logos + foundations.

---

### Caveats / open items
- **Fonts are a substitute** — **Host Grotesk** (Google Fonts) carries everything. Swap for the
  brand's licensed display face if one exists.
- **Icons** standardise on Lucide (drawn inline in the Lens kit) as a stand-in for the site's
  bespoke SVGs.
- The light, data-dashboard direction follows the Hikari / Garmin-style references the client
  shared — see Visual Foundations. (A prior dark exploration lives only in git history.)
