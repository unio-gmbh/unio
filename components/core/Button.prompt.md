Pill-Button mit optionalem Knob-Kreis (runder Kontrastkreis mit Pfeil — der Referenz-Look) und führender Glyphe.

```jsx
<Button variant="paper" knob>Demo buchen</Button>
<Button variant="signal" knob="›">Objekt anfragen</Button>
<Button variant="glass" tone="dark" glyph="▷">Video ansehen</Button>
<Button variant="ghost" size="sm">Abbrechen</Button>
```

- `paper` = Creme-Pill + Ink-Knob (primärer CTA-Look, C.Lab-Referenz).
- `knob` für alle Haupt-CTAs; sekundäre Aktionen ohne.
- Hover: Fläche dichter, Knob schiebt 2px. Press: scale(0.985).
