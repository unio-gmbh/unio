Riffelglas-Effekt (E4): zerlegt das darunterliegende Bild in vertikale Glasstreifen — Symbol für den intransparenten Markt. Immer mit teilweiser Auflösung einsetzen.

```jsx
const [reveal, setReveal] = React.useState(0.4);
<FlutedGlass reveal={reveal} side="right" radius={24}>
  <img src="assets/photos/fassade-historisch.png" style={{ display: "block", width: "100%" }} />
</FlutedGlass>
```

- `reveal` scrollgetrieben animieren → A1 „Klarheits-Scroll".
- `strength` 8–16 je nach Bilddetail; `fluteWidth` 10–20.
