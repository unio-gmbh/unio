# UNIO Design-Direktive v2 — Ember-Signature, Navigation, Störer-Baukasten

Arbeitsstand 05.07.2026 · **ersetzt v1.** Rolle: Creative Director → Briefing für Claude Design. Grundlage: verbindliche Marken-/Design-Regeln (Übergabedokument), Screenshots der Live-Seiten (Beweis-Case, Homepage-Triade), Inspiration (Health-Cards, Tennis-Duotone). Schreibweise immer **UNIO**. Anrede: Bauträger + Endkunden **Sie**, Makler **Du**.

> **Update 05.07.2026 (abends):** Ember-Gradient auf **Variante B „Signatur"** festgelegt (Off-White dominiert, Ember als Glüh-Zone statt Vollfläche). Rezept in Sektion 01. Referenz-Demo: `unio_ember_demo_v2.html`, Vergleichsstudie: `unio_gradient_studien.html`.

## Was sich gegenüber v1 geändert hat (Korrekturen)

Token auf die verbindlichen Werte gesetzt (v1 hatte abweichende Hex-Werte). **Keine Eyebrows über Headlines** — der Hero-Kicker aus v1 ist raus; Kapitel-Marker leben nur als vertikale Randmarke (wie auf den Live-Seiten). **Keine Text-Glyphen als Icons** — alle Pfeile/Dreiecke sind 1.5-px-Stroke-SVGs. **Typo nie hinter Glas/Blur** — der Ember-Gradient und Glas-Flächen dürfen nie unter Text liegen; Text sitzt auf Foto oder auf Vollfläche, nie auf einem Blur-Panel über Text. **Story-05 = Der Marketer** (nicht Investor). **Bauträger-Zahlen-Element bleibt unangetastet** — neuer Fix ist ein Bridge-Störer davor/dahinter. **Störer reusen bestehende Bildelemente** statt neuer Erfindungen.

## Verbindliche Token

```css
:root{
  --base:#F2EFE9;        /* Seitengrund */
  --card:#FBFAF6;        /* Karte */
  --ink:#141210;         /* Text/Display */
  --orange:#E96F2B;      /* Akzent / Ember-Kern */
  --hairline:rgba(20,18,16,.1);
  --ease:cubic-bezier(.32,.72,0,1);
  /* Ember-Familie (aus --orange abgeleitet, nur für Gradient/Duotone) */
  --ember:#9E2F0A; --clay:#C4470F; --amber:#F5A05F;
}
```
Stagger 60–120 ms. Animations-Grammatik: **Verwandlungen scrubben** (scrollgetrieben), **Auftritte spielen einmal** (IntersectionObserver), `prefers-reduced-motion` überall mit ruhigem Endzustand, Mobile geprüft.

---

## 01 · Ember-Signature (Gradient + Grain) — festgelegt: Variante B „Signatur"

**Kernprinzip (Korrektur aus dem Review):** Der Grund bleibt **Off-White (`--base`)** und dominiert die Fläche. Der Ember wird **nicht** als vollflächige Orange-Fläche eingesetzt, sondern als **Glüh-Zone in einer Ecke**, die diagonal ins Helle ausläuft. So nimmt die Farbe wenig Fläche ein, und der Verlauf wird durch die große Hell-Dunkel-Spanne überhaupt erst als Verlauf lesbar. Frühere vollgesättigte Vollflächen (`--clay` als Grund) sind damit abgelöst.

**Konsequenz für Typo/Nav:** Der Ember-Hero ist jetzt **hell** → Headline und Nav-Typo in `--ink`, nicht weiß. Weiße Typo trägt nur der Foto-Hero (Immobilien) mit Ember-Scrim. Das deckt sich mit der etablierten Off-White-Hero-Richtung („Der Markt wird lesbar").

**Rezept (verbindlich):** drei geschichtete Radial-Gradients (Ember → Orange → Amber) plus ein leiser Linear-Layer für Richtung, auf Off-White. Drift über `transform` (nie `background-position`), ~30 s, deutlich genug für lebendige Bewegung.

```css
.hero{ position:relative; overflow:hidden; background:var(--base); color:var(--ink); }
.hero__glow{
  position:absolute; inset:-45%; z-index:0; will-change:transform;
  animation:emberDrift 30s ease-in-out infinite alternate;
  background:
    radial-gradient(55% 65% at 92% 88%, rgba(158,47,10,.50) 0%, transparent 55%),   /* Ember, tiefe Ecke */
    radial-gradient(50% 62% at 80% 78%, rgba(233,111,43,.55) 0%, rgba(233,111,43,.18) 40%, transparent 66%), /* Orange-Kern */
    radial-gradient(40% 48% at 66% 62%, rgba(245,160,95,.40) 0%, transparent 60%),   /* Amber-Licht */
    linear-gradient(120deg, transparent 40%, rgba(233,111,43,.05) 100%);            /* Richtung */
}
@keyframes emberDrift{
  0%  { transform:translate3d(-5%,-3%,0) rotate(-3deg) scale(1); }
  50% { transform:translate3d( 4%, 5%,0) rotate( 4deg) scale(1.12); }
  100%{ transform:translate3d(-2%, 3%,0) rotate(-5deg) scale(1.05); }
}
@media (prefers-reduced-motion:reduce){ .hero__glow{ animation:none; } }
```
Grain wie gehabt: SVG-Turbulence-Overlay, ~5 % `mix-blend:overlay`, `pointer-events:none`, nur auf nicht-scrollenden Ebenen.

**Drei Dosierungsstufen** (dieselbe Zone, unterschiedliche Präsenz):
- **Signatur** (Hero) — Rezept oben, 1:1.
- **Still** (End-CTA und andere große sekundäre Flächen) — alle Layer-Deckkräfte auf ~60 %, Drift 44–48 s, Zone etwas kleiner. Trägt die Print-Identität, ohne unruhig zu werden; ersetzt die bisherigen Flach-Orange-Flächen (Tag 30/90/180, Nutzen-Karte).
- **Mikro** (Story-Orb, Kartenkopf) — ein einzelner radialer Kreis, `filter:blur(70px)`, Opazität ~40 %, langsam atmend.

**Eiserne Regel: nie unter Typografie.** Text sitzt auf Off-White, auf Vollfarbe oder direkt auf (abgedunkeltem) Foto — nie auf einem Blur-Panel zwischen Glow und Text. Beispiel-Grundsatz wie „Verkauft, bevor der Markt es glaubte": Display-Typo direkt auf dem Bild, kein Glaspanel darunter.

**Übergang zur zweiten Sektion (alle Unterseiten):** Pattern A — Hard Cut, erste Folgekarte zieht sich `margin-top:-96px` in die Glüh-Zone (Verzahnung; Standard Bauträger/Makler/Story). Pattern B — Fade-Mask, untere ~240 px blenden nach `--base` (Standard End-CTA gespiegelt + Immobilien). Da Hero und Folgesektion jetzt beide hell sind, wirkt der Bruch ohnehin weicher — die Verzahnungskarte überlappt die Zone, nicht zwei Farbwelten. Nie beide Patterns direkt hintereinander, nie Glüh-Zone auf Glüh-Zone.

---

## 02 · Navigation — seitenbreit, zwei Zustände

Volle Leiste statt schmaler Pille (Referenz „Hero-Menü"): Logo links · Links zentriert · CTA-Pille rechts; Höhe 84 px, Padding `clamp(24px,4vw,64px)`. **Auf dem Hero** transparent (kein Container), Typo hell, optional Hairline in 15 % Weiß. **Nach dem Hero** (IntersectionObserver) Glasleiste: `rgba(242,239,233,.82)` + `backdrop-blur(18px)`, Hairline unten `--hairline`, Typo `--ink`; Übergang 500 ms `--ease`. Aktiver Punkt: orange Unterstreichung. CTA-Pille = einziges gefülltes Element, Pfeil als Stroke-SVG im Kreis (Button-in-Button). Mobile: Logo + CTA + Burger, Menü als Fullscreen-Glas-Overlay, Links gestaffelt einblenden.

---

## 03 · Immobilien-Hero — an die Systemsprache anschließen

Vollflächiges Foto bleibt; der rechte Blur-Slat-Streifen entfällt (Fremdkörper). Stattdessen Ember-Scrim von unten links (`linear-gradient(200deg, transparent 45%, rgba(158,47,10,.55) 100%)` + Grain) — dieselbe Print-DNA. Kapitel-Marker vertikal links (`07 — IMMOBILIEN`, Mono), **nicht** als Eyebrow über der Headline. Headline „Suchen oder verkaufen." im System-Schnitt, direkt auf dem Foto (nicht hinter Glas). CTAs in Systemgeometrie: primär weiße Pille mit Stroke-SVG-Pfeil im Kreis („Immobilie bewerten"), sekundär Glas-Pille („Objekte ansehen"). Übergang Pattern A: Doppelrand-Karte „Suche starten" zieht 96 px ins Foto.

---

## 04 · Story-Scroller — Copy v2, Marketer bei 05, Orb + LENS-Chip

Fünf Rollen, Muster *Rolle → fühlbares Versagen des Status quo*. **Slide 05 = Der Marketer** (Ad-Boutique-Perspektive, ehrlich: liefert Leads ohne Rückkanal — führt direkt zum UNIO-Daten-Loop).

| # | Rolle | Zeile v2 | LENS-Chip (qualitativ, keine erfundenen KPIs) |
|---|---|---|---|
| 01 | Der Eigentümer | inseriert — und hört dann wochenlang: nichts. | `POSTFACH · WOCHE 6 — Rückmeldungen: keine` |
| 02 | Die Maklerin | verwaltet Papier, statt Menschen zu beraten. | `VORGÄNGE — verteilt auf [PH] Tools` |
| 03 | Der Bauträger | entscheidet Mix und Preis, bevor der Markt je geantwortet hat. | `VORVERKAUFSQUOTE — offen · Baustart naht` |
| 04 | Der Käufer | vergleicht Inserate — nicht Wahrheiten. | `VERGLEICH — Inserate ja · Daten nein` |
| 05 | Der Marketer | liefert Leads — und erfährt nie, was daraus wird. | `FEEDBACK-LOOP — Status: fehlt` |

Chip-Copy ist illustrativ (Status statt Fake-Zahl) und vor Livegang zu bestätigen. Optionales sechstes Auflösungs-Panel als Brücke: *„Fünf Perspektiven, ein Muster: Dem Markt fehlt kein weiteres Tool — ihm fehlt ein Betriebssystem."*

**Visuelle Ebene gegen die Leere (subtil, technisch):** pro Panel rechts zwei Elemente. (1) **Ember-Orb** — weichgezeichneter Gradient-Kreis (Ø ~520 px, `blur(70px)`, Opazität ~42 %), wandert pro Slide-Index minimal; der Gradient als roter Faden, ohne Fläche zu füllen. (2) **LENS-Mikro-Chip** im bestehenden Dashboard-Stil (Mono, Traffic-Light-Dots als CSS-Kreise, nicht als Glyphe), Auftritt +150 ms nach dem Text. **Pairing-Regel erfüllt:** die Rolle (Mensch) ist der Anker, der Chip (Software) der Gegenpart. Ghost-Ziffer bleibt, aber hinter Orb + Chip (z-Ordnung: Ziffer → Orb → Grain → Text/Chip). Progress-Dots + Mono-Zählung `01 / 05` in **einer** Zeile zusammenführen. Ghost-Ziffern-Budget der Story bleibt bei 3× (01–05 als eine Nutzung).

---

## 05 · Bauträger — Zahlen-Element bleibt, Fix über Störer

### Der „andere" Fix für Sektion 1 (Zahlen) → Sektion 2 (Problem)

Das Zahlen-Element **282 / 31 % / 100 %** bleibt exakt wie es ist. Das Harmonieproblem ist nicht das Element selbst, sondern der ungefederte Sprung von der ruhigen Zahlen-Zeile in die diagonal gestaffelten Problem-Wörter „Blackbox. / Bauchgefühl. / Kein Rückkanal.". Lösung: **ein Bridge-Störer dazwischen** — ein vollflächiges Bild-Band, das die zwei Sektionen physisch trennt und atmen lässt, statt die Typo umzubauen.

**Bridge-Störer „Marktbild":** full-bleed Projektfotografie in **Duotone Ember/Ink** (Referenz Tennis-Bild), darüber ein feines 1-px-Raster im bestehenden Spaltentakt + Grain. Eine Zeile Display-Typo direkt auf dem Bild (nicht hinter Glas), Ton „Sie", z. B. *„Möglich ist das längst — üblich ist etwas anderes."* (illustrativ). Mono-Eck-Labels wie bei den Case-Cards (`WIEN · PROJEKTDATEN`). **Kein großer Zahlenwert** (alle echten Zahlen sind auf der Seite bereits vergeben — siehe Karte unten). Damit: Bruch mit Bildmaterial (dein Wunsch), Bridge ohne Antasten des Zahlen-Elements.

### Störer-Baukasten (aus bereits genutzten Bildelementen)

Kein neues Vokabular — die Störer bauen auf dem, was schon auf der Seite lebt:

- **Case-Card (Glas-Rahmen auf Foto)** — wie „Villa Ecoluxe" (Screenshot Beweis): Projektfoto, Mono-Eck-Labels (`CASE / STATUS / VERMARKTUNG / STEUERUNG`), Display-Zeile direkt auf dem Bild, `LIVE`-Pill (Punkt = CSS-Kreis, nicht Glyphe), optional Linien-Chart auf dem Foto (`APR / MAI / JUN`). Bereits als Kapitel 03 vorhanden — als Bild-Anker beibehalten.
- **Duotone-Band** — full-bleed Foto in Ember/Ink + Raster + Grain, eine Display-Zeile (Bridge-Störer, s. o.; zweite Instanz zwischen System und Lernkurve möglich, z. B. *„Gebaut wird auf Daten."*).
- **Triade-Triptychon / Health-Card-Muster** — Referenz Homepage (RAUM/TECHNOLOGIE/MENSCH) und Health-Cards: Zahl+↗ oben, Linien-Chart, Mono-Label; für den **Mensch-Anker** eine reale Makler-Porträtkarte mit ehrlichem Platzhalter (`[PLATZHALTER: NAME]`), **keine Stock-Person**. ⚠️ Health-Card-Inspiration setzt Text auf Milchglas — bei uns **nicht**: Text auf Foto oder Vollfläche, nie hinter Blur.
- **Ticker** — der bestehende Marquee **„ECHTE DEALS DURCH ECHTE DATEN ▲"** (bereits auf der Homepage) als wiederkehrendes Marken-Element, hier als mechanischer Rhythmus-Bruch zwischen System (04) und Lernkurve (05) wiederverwenden. Outline-Typo + Vollton-Akzent, ▲ als **Stroke-SVG**, nicht als Glyphe. `linear` ist hier als einzige Ausnahme erlaubt (Ticker läuft mechanisch).

### Neuer Rhythmus (Bild bricht die Text/Animation-Abfolge)

Hero (Glow) → **Zahlen-Zeile (unverändert)** → **Bridge-Störer Duotone** → Problem-Wörter (Paper) → Case-Card „Villa Ecoluxe" (Bild-Anker, vorhanden) → System 61/27/40/25 → **Ticker (bestehend)** → Lernkurve (stiller Glow statt Flach-Orange) → Nutzen-Karten → CTA (Glow, Pattern B). So wechseln sich nicht mehr nur Text und Animation ab — Bild-Bänder setzen die Zäsuren.

### Nutzen-Karten

„1.240" und „T+8" auf gleiche Ziffern- und Kartenhöhe; orange Karte bekommt stillen Glow + Grain (statt Flachfläche), weiße Karte den Doppelrand. Labels beider in Mono auf gemeinsamer Grundlinie.

### Zahlen-Karte (jede Zahl genau einmal pro Seite)

| Zahl | Wohin | Element |
|---|---|---|
| 282 · 31 % · 100 % | Zahlen-Zeile | **unverändert** |
| 61 / 2 Wo. · 27 / 2 Wo. · 40 · 25 / Wo. | System-Sektion | vier Karten |
| T+8 · 1.240 | Nutzen | zwei Karten |

Die Störer führen **keine** dieser Zahlen erneut (42 % KI-Objektanlage lebt ausschließlich auf der Makler-Seite). Sollte ein Störer doch eine Zahl tragen sollen, wird deren einzige Platzierung dorthin verschoben — Koordinations-Hinweis an Claude Design, nicht duplizieren.

---

## 06 · Globale Compliance-Checkliste (vor Übergabe prüfen)

Token exakt (`--base #F2EFE9`, `--card #FBFAF6`, `--ink #141210`, `--orange #E96F2B`, Hairline `rgba(20,18,16,.1)`) · keine Eyebrows über Headlines (Kapitel nur als Randmarke) · keine Punkte/Dots vor Aufzählungen · alle Icons 1.5-px-Stroke-SVG, keine Text-Glyphen · Makler = Du, Bauträger/Endkunde = Sie · Typo nie hinter Glas/Blur · Ember-Gradient nie unter Text · jede Zahl genau einmal pro Seite, nur echte Case-Zahlen · Pairing-Regel (jede Software-Sektion mit Mensch-Anker & umgekehrt, ehrliche Platzhalter, keine Stock-Person) · Verwandlungen scrubben, Auftritte einmal · `prefers-reduced-motion` mit ruhigem Endzustand · Blur nur auf fixierten Elementen · Animation nur `transform`/`opacity` · Mobile geprüft.

*Zahlen sind Arbeitsstand und final zu prüfen; Copy-Zeilen der Störer/Chips sind illustrativ und vor Livegang zu bestätigen.*
