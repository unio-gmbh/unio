Das Signature-Element (E1): Frosted-Datenpanel über Objektfotografie — Editorial-Look (eine große Zahlenhierarchie) oder Dashboard-Look (gestapelte Zellen).

```jsx
<DataOverlay
  variant="editorial"
  label="Marktlage 1140 Wien"
  metric={{ value: 94, label: "Nachfrage-Score", delta: "+12 %" }}
  rows={[{ label: "Preis / m²", value: "6 240 €" }, { label: "Abverkauf", value: "T+38", highlight: true }]}
/>

<DataOverlay
  variant="dashboard"
  label="Pipeline — Q3"
  cells={[
    { value: 128, label: "Leads" }, { value: 41, label: "Qualifiziert" },
    { value: 12, label: "Besichtigung" }, { value: 4, label: "Closing" },
  ]}
/>
```

- Nur über echtem Bild einsetzen; `tone` nach Bildhelligkeit.
- `animate` für Blur-to-Data beim Scroll-Eintritt.
