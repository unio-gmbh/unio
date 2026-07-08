# UNIO — FAQ-Bereich (Makler NEU + Bauträger) inkl. AI-Readiness
## Für Claude Design · Eine gemeinsame Komponente, zwei Seiten. Alle Marken-/Design-Regeln und die Software-Schicht gelten.

---

## 0. Grundsatz

Es wird **eine FAQ-Komponente** gebaut, die auf beiden Seiten identisch funktioniert und identisch AI-ready ausgezeichnet ist — Unterschied nur in Inhalt und Register (**Makler = Du**, **Bauträger = Sie**). Auf der Bauträger-Seite ersetzt/erweitert diese Komponente das bestehende Einwände-Akkordeon aus Kapitel 09 (Granger-Stil) — nicht zwei getrennte Bausteine bauen. Die AI-Readiness ist dadurch auf beiden Seiten automatisch gegeben.

## 1. Platzierung

- **Makler-Seite:** NEUES Kapitel, **nach dem Bewerbungsformular (09), vor dem Footer.** Kapitel-Marker `10 — FRAGEN`. 
- **Bauträger-Seite:** an bestehender Position (Kapitel 09, Einwände) — Optik und AI-Auszeichnung auf die hier definierte Komponente angleichen.

## 2. Visuelle Umsetzung (UNIO-System)

- **Headline** (kein Eyebrow): Makler „Was du wissen willst." · Bauträger „Was Sie wissen wollen." · optionale Subline Makler „Ehrliche Antworten — kein Kleingedrucktes." / Bauträger „Ehrliche Antworten — kein Kleingedrucktes."
- **Hairline-Akkordeon statt Karten:** Jede Frage eine Zeile, getrennt durch die Standard-Hairline (rgba(20,18,16,.1)). Keine Box-in-Box, kein Card-Grid. Frage links (Titel-Stufe, medium 600), rechts ein **1.5px-Stroke-Plus/Minus-SVG** (kein Text-Glyph, kein Chevron-Font) das beim Öffnen von + zu − morpht.
- **Öffnen:** Antwort gleitet auf (`cubic-bezier(.32,.72,0,1)`, Höhe + Opacity, ~360 ms), Stroke rotiert/morpht synchron. Nur EINE Frage offen zur Zeit (Accordion-Verhalten) — beim Öffnen schließt die vorige. Erste Frage darf initial offen sein.
- **Antworttext:** Fließtext, ruhig, max. 2–3 Sätze. Wo eine Zahl fällt, gilt die Ein-mal-Regel der Seite — im FAQ nur Zahlen wiederholen, die ohnehin auf der Seite stehen, keine neuen KPIs erfinden.
- **Kapitel-Marker** vertikal als Mono-Hairline (`10 — FRAGEN` bzw. `09 — EINWÄNDE`), durchlaufende Grid-Hairlines wie auf der restlichen Seite.
- **Mensch-Anker (Paarungs-Regel):** Am Ende der FAQ-Liste eine schlichte Zeile statt einer weiteren Frage: Makler „Noch was offen? Schreib uns zwei Zeilen — echte Antwort von einem Menschen." mit Mini-Porträt-Platzhalter · Bauträger „Offene Frage? Wir rufen zurück — persönlich, nicht per Bot." Dezenter Text-Link zu Kontakt, kein zweiter lauter CTA (Primärziel der Seite bleibt Bewerben bzw. Projekt prüfen lassen).
- **Scroll-Reveal:** Zeilen staffeln einmal beim Eintritt (IO, 18px Lift, Stagger 60–90 ms). Kein Scrub. reduced-motion: alle Zeilen sofort sichtbar, Akkordeon funktioniert per Klick.

## 3. AI-Readiness (technisch — Kern dieses Briefings, gilt für BEIDE Seiten)

Ziel: Die FAQ ist maschinenlesbar für Google Rich Results, KI-Suchen/LLM-Antworten (ChatGPT, Perplexity, Google AI Overviews) und Voice. Vier Ebenen:

**a) Semantisches HTML (Grundlage):** Akkordeon aus echten Elementen — vorzugsweise native `<details><summary>` ODER `<button aria-expanded>` + Region. Jede Frage als echte Überschrift (`<h3>`), Antwort als Textabsatz. Der Antworttext ist **immer im DOM vorhanden**, auch im geschlossenen Zustand (nur visuell via max-height/opacity verborgen, NICHT `display:none` erst bei Klick per JS injiziert) — sonst sehen Crawler/LLMs den Inhalt nicht. Voll tastaturbedienbar, `aria-controls`/`aria-expanded`/`aria-labelledby` korrekt gesetzt.

**b) JSON-LD `FAQPage` Schema:** Pro Seite ein `<script type="application/ld+json">` mit Schema.org `FAQPage` → `mainEntity` Array aus `Question`/`acceptedAnswer` (`Answer`). Fragen und Antworten im JSON-LD müssen **wortgleich** zum sichtbaren Text sein (Google verwirft abweichende oder versteckte Schema-Inhalte). Struktur je Eintrag:
```
{ "@type": "Question",
  "name": "<Fragetext exakt>",
  "acceptedAnswer": { "@type": "Answer", "text": "<Antworttext exakt, ohne HTML-Tags>" } }
```
Wrapper: `{ "@context":"https://schema.org", "@type":"FAQPage", "mainEntity":[ … ] }`. Makler- und Bauträger-Seite bekommen jeweils EIGENES Schema mit den eigenen Fragen. Keine doppelten FAQPage-Schemas pro URL.

**c) LLM-/Antwort-Optimierung des Textes:** Jede Antwort so schreiben, dass der **erste Satz die Frage eigenständig beantwortet** (self-contained), ohne Kontext aus vorherigen Fragen. LLMs zitieren bevorzugt den ersten klaren Satz. Frage in natürlicher Nutzersprache formulieren (wie echte Suchanfragen), nicht in Marketing-Sprech.

**d) Optionale Ergänzung für spätere Umsetzung (nicht blockierend):** eine maschinenlesbare Nur-Text-Spiegelung der FAQ (z. B. Aufnahme in eine spätere `llms.txt` im Root) — hier nur als Notiz vermerken, damit es im Backlog steht. Für diese Runde reicht a–c.

## 4. Inhalt — Makler-FAQ (Register: Du)

Vorschlag, an echte Einwände angelehnt; Zahlen nur wo sie schon auf der Seite stehen (Rechner-Werte):
1. **„Was kostet mich UNIO?"** — Erster Satz nennt das Modell klar: Software-Beitrag € 599/Monat, 85 % Provision ab dem ersten Deal, 100 % ab € 150k Track-Record. (Werte konsistent zum Rechner, Kapitel 06.)
2. **„Behalte ich meine eigene Marke?"** — Ja, self-contained beantwortet: Du trittst unter deinem Namen auf, UNIO liefert System und Dealflow im Hintergrund.
3. **„Bin ich angestellt oder selbstständig?"** — klare Aussage zum Status `[PLATZHALTER: rechtl. Konstruktion bestätigen]`.
4. **„Wie funktioniert die Beteiligung?"** — Ownership-Prinzip in 2 Sätzen, ohne erfundene Zahlen `[PLATZHALTER: Beteiligungsdetails]`.
5. **„Muss ich meine Bestandskunden mitbringen?"** — ehrliche Antwort, kein Zwang.
6. **„Wie schnell bin ich startklar?"** — Onboarding-Ablauf kurz.
7. **„Für wen ist der CIRCLE nichts?"** — ehrliche Abgrenzung (kuratiert, nicht für alle) — signalisiert Selbstbewusstsein.

## 5. Inhalt — Bauträger-FAQ (Register: Sie)

Aus dem bestehenden Einwände-Akkordeon (Kapitel 09 v3) übernehmen und AI-ready auszeichnen; enthält bereits u. a.:
1. **„Was passiert mit unseren Bestandsmaklern?"** (bestehend, wichtig)
2. **„Wie schnell sehen wir erste Daten?"** — self-contained, Bezug T+8 (falls dort schon genannt, sonst ohne Zahl).
3. **„Ist das bank- und beiratsfähig?"** — Ja + kurze Begründung.
4. **„Was kostet es — und wann?"** — 100 % erfolgsbasiert, self-contained.
5. **„Was, wenn das Projekt schon läuft?"** — Einstieg jederzeit möglich.
6. `[PLATZHALTER: 5. bestehende Einwand-Frage aus v3 übernehmen]`
(Exakte Bestandsfragen aus dem Bauträger-v3-Briefing 1:1 übernehmen, nur Optik + Schema angleichen.)

## 6. Abnahme

Eine gemeinsame Komponente, zwei Inhalte · Makler-FAQ nach Formular vor Footer (`10 — FRAGEN`) · Hairline-Akkordeon, 1.5px Plus/Minus-SVG, ein Panel offen · Antworttext immer im DOM (nicht per JS bei Klick injiziert) · valides `FAQPage` JSON-LD pro Seite, Text wortgleich zum sichtbaren · erster Antwortsatz self-contained · echte Überschriften + ARIA + Tastaturbedienung · Mensch-Anker-Zeile am Listenende · keine erfundenen Zahlen, Ein-mal-Regel gewahrt · reduced-motion/Mobile geprüft · Bauträger: Bestandsfragen aus v3 übernommen, nicht neu erfunden.
