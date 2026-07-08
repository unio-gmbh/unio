# UNIO — Hero-Mechanik, Menü, Gradient-Hintergrund & Whitespace-System
## Für Claude Design · Verbindliche Referenz. Prototyp `unio-hero-scroll-v3.html` liegt bei und gilt als maßgeblich (Briefing > Prototyp bei Widersprüchen). Alle bestehenden Marken-/Design-Regeln + Software-Schicht gelten.

---

## 0. Geltungsbereich

Dieses Briefing definiert drei seitenübergreifende Bausteine: (1) die **Hero-Mechanik** inkl. Menü-Transformation, (2) den **Gradient-Hintergrund**, wenn kein Foto genutzt wird, und (3) das **Whitespace-System für die gesamte Homepage und alle Unterseiten**. Baustein 1 und 2 betreffen primär den Startseiten-Hero, sind aber als wiederverwendbare Komponenten anzulegen (auch Audience-Hero-Bereiche können sie nutzen). Baustein 3 gilt ausnahmslos überall.

## 1. Menü & Scroll-Mechanik (verbindlich)

**Ruhezustand (oben, kein Scroll):**
- Das Menü ist eine **vollbreite Zeile ganz oben über dem Hero-Bild** — NICHT in den Bildrahmen eingeschlossen, NICHT als Pille, kein Kasten, kein Hintergrund. Nur Logo links, Navigationslinks, ein Node rechts.
- Aufbau: Logo (Ring-SVG + „UNIO", Mono, letter-spacing .18em) · Links mit 26px Abstand (aktiver Link in Ink, restliche in rgba(20,18,16,.6)) · rechts „Demo buchen" als Ghost-Node (0.5px Hairline-Rahmen, radius 8px, leicht transluzentes Weiß).
- Ink-Farbe durchgehend auf dem hellen Grund. **Kein White-to-Dark-Farbwechsel** (Bestandsregel).

**Scroll-Zustand (Menü wird Pille):**
- Sobald `window.scrollY > 60px`, transformiert die Menüzeile in eine **schwebende, zentrierte Pille**, die oben fixiert bleibt (`position:fixed`).
- Die Pille hat **wenig runde Ecken: `border-radius:12px`** (bewusst KEINE Kapselform / kein 99px). Der Demo-Button darin ebenfalls radius 8px.
- Pillen-Stil: `background:rgba(242,239,233,.55)` + `backdrop-filter:blur(16px) saturate(1.2)` (transparent-milchig), 0.5px Hairline-Rahmen, weicher Schatten `0 8px 30px rgba(20,18,16,.08)`, `max-width:760px`, zentriert, Innenabstand `9px 10px 9px 22px`.
- Im Scroll-Zustand: Links rücken enger (Abstand 22px, 13px), der „Demo buchen"-Button füllt sich zu **Ink-Fläche mit Cream-Text**.
- Übergang: alle Eigenschaften über `transition … .55s cubic-bezier(.32,.72,0,1)` — Menü „wandert" sichtbar von voller Zeile in die kompakte Pille, kein hartes Umschalten.
- Rückweg identisch: scrollt man wieder nach ganz oben, expandiert die Pille zurück in die volle Zeile.

**reduced-motion:** Übergang ohne Bewegungs-Tween — Pille erscheint/verschwindet per Opacity-Fade, Endzustände identisch. **Mobile (<720px):** Navigationslinks ausblenden (Burger-Menü `[PLATZHALTER: Burger-Pattern nach Bestand]`), Pille nimmt volle Breite minus Rand, Logo + Demo bleiben sichtbar.

## 2. Hero-Rahmen & Bild-/Hintergrund-Fläche

- Der Hero-Inhalt (Titel, Sub, CTAs, optionale Preview-Karte, Slider) sitzt in einem **gerahmten Feld, das vom Seitenrand eingerückt ist** (Inset ~40px seitlich Desktop, 16px Mobile) — vollflächig, aber mit Luft zum Viewport-Rand.
- Rahmen: 0.5px Hairline, **`border-radius:22px`**, `overflow:hidden`, dezenter Inset-Highlight `0 1px 0 rgba(255,255,255,.6) inset`.
- Höhe: `calc(100vh - 138px)` Desktop (Menüzeile + unterer Rand berücksichtigt), `min-height:520px`; Mobile `calc(100svh - 120px)`.
- Der Titel steht unten im Feld (`justify-content:flex-end`), Innenabstand 56px/60px Desktop, 28px/24px Mobile.

## 3. Gradient-Hintergrund (wenn KEIN Foto genutzt wird)

Grundsatz: **Der Gradient ist nie vollflächig-satt.** Er ist ein Eck-Glow, der aus den UNIO-Gelb-/Orangetönen in dominantes Off-White ausläuft — Weiß trägt die Fläche mit.

- **Farben:** `--g1:#FFAA09` (Orange-Gelb) und `--g2:#FFDB57` (helles Gelb). Ausklang immer in `--card:#FBFAF6` bzw. `--base:#F2EFE9`.
- **Aufbau (zwei überlagerte Radials für organische Wirkung, kein linearer Standardverlauf):**
```css
background:
  radial-gradient(120% 95% at 100% 0%,
    rgba(255,170,9,.42) 0%, rgba(255,219,87,.30) 26%,
    rgba(255,219,87,.10) 48%, rgba(242,239,233,0) 72%),
  radial-gradient(85% 70% at 108% -6%,
    rgba(255,170,9,.30) 0%, rgba(242,239,233,0) 55%),
  var(--card);
```
- Der Glow sitzt in der **oberen rechten Ecke**, der Titelbereich (links unten) bleibt ruhig/hell → Text immer lesbar. Deckkraft-Maximum ~.42, damit es getönt statt bunt wirkt.
- **Wichtig zur Tonalität:** Diese Gelb-/Orange-Richtung ist heller und wärmer als das etablierte Ember-Orange-Signatursystem (`--orange #E96F2B`) der übrigen Seiten. `#E96F2B` bleibt der Akzent für **Text/Punkte/aktive Elemente** (z. B. Schlusspunkt der Headline) — die hellen Gelbtöne sind ausschließlich Flächen-Glow, nie Textfarbe (Kontrast).
- **Foto-Alternative:** Wird stattdessen ein echtes UNIO-Projektfoto genutzt, sitzt es im selben gerahmten Feld; Titel dann in Cream + dezenter Dunkel-Verlauf unter dem Text für Kontrast (Typo nie hinter Blur, Verlauf für Lesbarkeit erlaubt). Foto immer echtes Projekt, kein Stock.

## 4. Whitespace-System (gesamte Homepage + ALLE Unterseiten — verbindlich)

Der häufigste Designfehler ist Gedränge. Diese Werte sind der Standard, von dem nur mit Begründung abgewichen wird:

- **Nach dem Hero:** großzügiges Polster, bevor die erste Sektion beginnt — die erste Aussage muss frei atmen, nicht am Hero kleben.
- **Vertikaler Sektions-Rhythmus:** ~200px oben/unten Desktop, ~120px Mobile. Zwischen eng zusammengehörenden Blöcken innerhalb einer Sektion darf es dichter sein — der große Abstand gehört ZWISCHEN die Sektionen, nicht in sie hinein.
- **Textmaße:** Fließtext `max-width` ~560px, `line-height:1.8`, 17px. Headlines dürfen breiter laufen. Kein Fließtext über die volle Breite.
- **Sektions-Container:** `max-width:960px`, zentriert, seitlicher Innenabstand 40px Desktop / 20px Mobile.
- **Abstand Kicker → Headline → Text:** Kapitel-Kicker (Mono) ~28px über der Headline, Headline ~32px über dem Text.
- **Elemente in Sektionen** (Platzhalter-Flächen, Karten, Module): ~88px Abstand zur vorausgehenden Textzeile.
- Prinzip: **Weißraum steht vor den großen Statements** (Hero-Übergang, orange Erkenntnis-Sätze, Finale), nicht zufällig verteilt. Lieber eine Aussage pro Bildschirm als drei gedrängt.

## 5. Abnahme

Menü im Ruhezustand = vollbreite Zeile über dem Bild, keine Pille · Pille erscheint ab 60px Scroll, `border-radius:12px`, transparent-milchig, zentriert, oben fixiert · Übergang getweent (.55s, Marken-Easing), Rückweg funktioniert · Hero-Feld gerahmt, eingerückt, radius 22px · Gradient zweifach-radial, Eck-Glow, läuft in Off-White aus, nie vollflächig · Gelbtöne nur als Fläche, `#E96F2B` für Text/Akzent · Whitespace-Werte auf Homepage UND allen Unterseiten angewandt (200px Sektions-Rhythmus, 560px Textbreite, großes Polster nach Hero) · reduced-motion + Mobile-Fallbacks vorhanden · Prototyp `unio-hero-scroll-v3.html` als visuelle Referenz herangezogen.
