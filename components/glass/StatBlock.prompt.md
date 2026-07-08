Der Zahlen-Moment (B2 „Blur to Data"): Kennzahl startet unscharf, wird beim Eintritt in den Viewport scharf, tickt hoch, dann erscheint das Mono-Label darunter.

```jsx
<StatBlock value={94} label="Nachfrage-Score" delta="+12 %" />
<StatBlock value="6 240" unit="€/m²" label="Median 1140 Wien" tone="light" size="72px" />
```

- `animate={false}` für statische Verwendung (Print, Deck-Stills).
- Immer Label UNTER der Zahl (Anti-Eyebrow-Regel).
