# UNIO — Briefing Startseiten-Hero + globales Software-Prinzip (v1)
## Für Claude Design · Referenzen liegen bei (Rampage-Editorial, Mosaik-Porträt, Porträt-Datenkarten/Einblendungen)

---

## 1. Diagnose Startseiten-Hero (Stand jetzt)

Das Riffelglas liegt aktuell über dem GESAMTEN Hero inklusive Headline-Zone — die Seite startet murky statt mit einem Klarheits-Versprechen. „Scrollen — aus Riffelung wird Klarheit" wird behauptet, aber im Ruhezustand sieht man nur: unscharf. Die CTAs schweben frei, es gibt keine Datenschicht und keinen Menschen. Der Hero verspricht Lesbarkeit und liefert Blur.

## 2. Neuaufbau: „Der Markt wird lesbar" — als Choreografie

**Struktur (Rampage-Editorial):**
- **Oben, auf ruhigem Off-White (Typo NIE hinter Glas):** die Headline als Treppen-Satz über die volle Breite — „Der Markt" (links) / „wird" (mittig, Outline) / „lesbar." (rechts auslaufend, oranger Punkt). Kleine Mono-Marginalien zwischen den Zeilen (Rampage-Muster): links „Betriebssystem für Immobilienvertrieb", rechts „Wien · Live". Die Zeilen staffeln beim Laden ein.
- **Darunter das Bild-Triptychon — die Triade als Bildzeile:** drei Panels mit dünnen Ink-Rahmen:
  1. **Raum:** Projektfoto, klar.
  2. **Technologie:** Signal-Raster-Panel (das animierte Dreiecks-Raster, orange Signalzellen driften).
  3. **Mensch:** Porträt `[PLATZHALTER]`.
  Das MITTLERE bzw. das Raum-Panel startet **hinter Riffelglas und klärt sich als Lade-Choreografie** (~1,6 s) — transparent/intransparent wird als Verwandlung erzählt, nicht als Zustand.
- **Einblendungen (Porträt-Datenkarten-Referenz):** Sobald geklärt, docken dünne Hairline-Annotationen mit Mono-Labels an die Panels an: „282 Anfragen · Ecoluxe" am Raum-Panel · „Live · LENS" am Raster · „CIRCLE · kuratiert" am Porträt. Daten liegen AUF den Bildern.
- **CTAs verankert** zwischen Headline und Triptychon oder unter dem Triptychon links: Ink-Pill „Immobilie finden →" + Ghost „Wie es funktioniert". 
- **Optional unterster Rand:** dünne Mono-Ticker-Zeile „Echte Deals durch echte Daten ▲" (Typografie-Marquee, dokumentierte Ausnahme — niemals Zahlen im Laufband).

**Ablauf beim Laden:** Headline-Zeilen staffeln (0–600 ms) → Panels steigen nacheinander ein (300–900 ms) → Riffelglas klärt sich (900–2500 ms) → Annotationen docken an (ab 2500 ms, gestaffelt) → Raster driftet dauerhaft ruhig. Scroll übernimmt danach: Panels mit leichtem Parallax-Versatz (Faktoren 0.94/1.0/1.06).

**Mobile:** Headline linksbündig gestaffelt, Triptychon wird vertikaler Stapel (Reihenfolge: Raum → Technologie → Mensch), Klarheits-Reveal bleibt, Annotationen reduziert auf eine pro Panel, `100svh`-Logik.

## 3. Globales Prinzip: „Die Software-Schicht" (gilt für ALLE Seiten)

Software ist das Kernstück von UNIO — sie zeigt sich im Design als **Verwandlung, nie als Screenshot-Galerie.** Vier wiederverwendbare Bausteine:

1. **Einblendungs-Grammatik:** dünne Hairline + Mono-Label + Wert (+ optional Mini-Sparkline), die an Fotos ANDOCKT — die Software macht Realität lesbar. (Hero Startseite, Bauträger-Hero, Referenz-Strecke, Porträt-Datenkarten.)
2. **UI-Miniaturen:** echte Produkt-Momente als Mini-Frames (LENS-Browser mit selbstzeichnender Kurve, Lead-Inbox, Suggested-Actions-Häkchen) — immer klein, immer in Bewegung, nie als toter Screenshot.
3. **Live-Signale:** die Live-Pill mit pulsierendem Orange-Punkt als wiederkehrendes Echtzeit-Zeichen.
4. **Verwandlungs-Momente:** pro Seite mindestens EINE Sequenz, in der Software sichtbar etwas verwandelt — Startseite: Riffelung→Klarheit · Bauträger: Rauschen→Signal (Lernkurven-Dashboard) · Makler: Datenblöcke→fertige Immobilie (Objektanlage-Sequenz, eigenes Briefing) & Chaos→sortierte Chips · Story: Fünf Unternehmen→ein System.

**Paarungs-Regel (Raum · Technologie · Mensch):** Jeder Software-Moment bekommt einen Mensch-Anker (wer profitiert, wer gibt frei, wer spricht), jeder Mensch-Moment ein Software-Element. Die Verschränkung ist die Marke.

## 4. Abnahme

Typo nie hinter Glas · Klarheits-Reveal läuft einmal als Lade-Choreografie und endet in angedockten Annotationen · Triptychon = Raum/Technologie/Mensch klar lesbar · CTAs verankert · Raster driftet ruhig (kein Loop-Zappeln) · reduced-motion: klare Panels, Annotationen sofort · Mobile geprüft · Software-Schicht-Bausteine als wiederverwendbare Komponenten angelegt (Annotation, UI-Mini, Live-Pill).
