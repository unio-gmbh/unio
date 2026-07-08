Die Objekt-/Feature-Karte: Glas-Shell mit innerem Kern (konzentrische Radien), über Foto oder als Karte mit eigenem Media-Bild.

```jsx
<GlassCard
  tone="dark"
  media="assets/photos/hufhaus-front.jpg"
  label="1140 Wien · Objekt 042"
  title="Refugium am Waldrand"
  tags={["14. Bezirk", "2 Häuser", "14.830 m²"]}
  data={[{ label: "Nachfrage", value: "94 / 100" }, { label: "Preis / m²", value: "6 240 €" }]}
  price="€ 2,4 Mio."
  cta="Anfragen"
/>
```

- `solid` = opake Variante („alter Markt") für Vorher/Nachher-Erzählung (B8).
- `tone="light"` auf dunklen Fotos.
- Ohne Convenience-Props einfach `children` in den Kern legen.
