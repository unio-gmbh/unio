Frosted-Glass-Basispanel; immer über echtem Objektfoto einsetzen, Tint nach Bildhelligkeit wählen.

```jsx
<div style={{ backgroundImage: "url(assets/photos/terrasse-golden.png)", backgroundSize: "cover", padding: 48 }}>
  <GlassPanel tone="dark" style={{ maxWidth: 420 }}>
    <span className="u-label">Nachfrage-Score</span>
    <h3 style={{ font: "500 44px/1 var(--font-display)", margin: "8px 0 0" }}>94</h3>
  </GlassPanel>
</div>
```

- `tone="light"` für dunkle Bilder, `tone="dark"` für helle.
- `blur={40}` für Heavy-Frost, `hairline={false}` nur bei randlosen Vollflächen.
- `grain` (default an) hält die Fläche filmisch statt steril.
