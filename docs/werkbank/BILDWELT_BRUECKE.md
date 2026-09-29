# Bildwelt-Brücke zu Higgsfield

Stand 29.09.2026. Code: `ui_kits/werkbank/wb-bildwelt.jsx`. Gegenstelle: Claude-Skill `/bildwelt` (persönlicher Skill unter `~/.claude/skills/bildwelt/SKILL.md`).

## Warum eine Brücke

Higgsfield ist über den MCP-Connector in Claude angebunden. Der Connector nutzt das normale Higgsfield-Abo und die Credits des verbundenen Kontos, ein API-Schlüssel ist nicht nötig. MCP-Werkzeuge laufen aber nur in einer Claude-Sitzung, nicht im Browser der Werkbank. Die Werkbank baut deshalb den Auftrag, Claude führt ihn aus, ein Rücklink bringt die Bilder zurück.

```
Werkbank (Browser)              Claude-Sitzung mit Higgsfield-Connector
  Marke > Design > Bildwelt
  Auftrag wb-bildwelt/1  ──────▶  /bildwelt  (Zwischenablage oder Datei)
                                   balance, generate_image get_cost (gratis)
                                   Freigabe durch den Nutzer
                                   generate_image_batch, jobs_wait
  #bildwelt=<Ergebnis>   ◀──────  Rücklink wb-bildwelt-ergebnis/1
  Bilder in IndexedDB,             optional: Ordner ~/Downloads/bildwelt-<id>/
  markiert als KI-generiert
```

## Auftrag `wb-bildwelt/1`

| Feld | Inhalt |
|---|---|
| `id` | `bw-<zeit36><zufall>` |
| `makler` | `{ id, name }` |
| `welt` | gewählte Markenwelt `{ id, name }` |
| `modell` | `gpt_image_2_5` (Schnell, 0,25 Credits je Bild) oder `soul_2` (Editorial, 1 Credit, kein 4:5, wird 3:4) |
| `varianten` | 1 bis 3 je Motiv |
| `bilder`, `credits_schaetzung`, `budget_credits` | Anzahl, Schätzung, Obergrenze (Schätzung × 1,5 + 1) |
| `regeln` | keine erkennbaren Personen, kein Text im Bild, Kennzeichnung |
| `motive[]` | `{ id: "m1", titel, format: "4:5" \| "9:16" \| "1:1", prompt }` |
| `ruecksprung` | URL der Werkbank-Ansicht, an die der Rücklink geht |

Motive kommen aus der Bildsprache der Markenplattform (`visuell.bildsprache.motive`) oder der Markenwelt. Motive mit Menschen filtert `HM_BW_OHNE` heraus. Der Prompt (`hmBwPrompt`) setzt Ort, Welt, Bildregeln, Akzentfarbe und Ausschlüsse zusammen.

## Ergebnis `wb-bildwelt-ergebnis/1`

```json
{ "schema": "wb-bildwelt-ergebnis/1", "auftrag": "bw-...", "makler": { "id": "markus" },
  "credits": 2, "bilder": [{ "motiv": "m1", "url": "https://...", "format": "4:5", "modell": "gpt_image_2_5", "job": "..." }],
  "ausgelassen": [], "fehler": [] }
```

Wege zurück in die Werkbank:

1. Rücklink `<ruecksprung>#bildwelt=<encodeURIComponent(JSON)>`. Der Fragment-Teil geht nicht an den Server. `hmBwHashPruefen` liest ihn beim Laden, entfernt ihn aus der Adresse und legt die Bilder ab.
2. Ablagefeld im Bildwelt-Bereich: `ergebnis.json` (mit Feld `datei` je Bild) plus Bilddateien, oder nur Bilddateien mit Namen `<auftrag>-<motiv>-<n>.<ext>`.

Die Werkbank versucht jedes Bild per `fetch` in IndexedDB zu sichern (`bw:<id>`). Erlaubt der Higgsfield-Bildserver das nicht (CORS), bleibt die URL als Verweis stehen und das Bild zeigt den Hinweis, es zu laden und zu sichern.

## Daten in der Werkbank

- `unio_hm_bildwelt`: `{ [makler]: [Auftrag + status "offen" | "fertig", credits] }`, höchstens 30 je Makler
- `unio_hm_bildwelt_bilder`: `{ [makler]: [{ id, auftrag, motiv, titel, format, modell, url, lokal, ki: true }] }`
- IndexedDB `unio_hm_blobs`, Schlüssel `bw:<id>`

## Regeln

- Keine erkennbaren Personen und keine echten Menschen per KI. Das Gesicht des Maklers kommt aus dem Shooting und dem Zuschnitt.
- Jedes Bild trägt in der Werkbank das Zeichen „KI-generiert“. Täuschend echte KI-Bilder realer Orte sind nach Art. 50 AI Act auch beim Veröffentlichen zu kennzeichnen.
- Credits fließen nur nach ausdrücklicher Freigabe in der Claude-Sitzung. Die Kostenabfrage (`get_cost`) ist gratis.

## Automatik (Warteschlange)

Seit 29.09.2026 gebaut, aktiv sobald der Speicher verbunden ist. Nur das Team sieht den Bildwelt-Bereich, Makler sehen nur die fertigen Bilder.

```
Werkbank (Team)  POST /ux/api/bildwelt  ──▶  api/wb-bildwelt.js  ──▶  Upstash Redis
                 GET alle 30 s          ◀──  status, ergebnis
Claude-Routine   GET ?aktion=offen      ──▶  (x-wb-token)
  mit Higgsfield-Connector, Skill /bildwelt warteschlange
                 POST aktion=ergebnis   ──▶
```

- `/ux/api/:name` ist per Rewrite in `vercel.json` auf `/api/wb-:name` gelegt. Dort schickt der Browser das UX-Passwort selbst mit, weil der Pfad unter dem geschützten `/ux` liegt.
- Grenzen: `budget_credits` je Auftrag, `WB_BW_MONATSBUDGET` je Monat (Standard 150 Credits). Der Server lehnt Aufträge über dem Budget mit 402 ab.
- Ohne Speicher (503) oder lokal fällt die Werkbank auf die Übergabe per Zwischenablage zurück.

Einrichtung (einmalig):
1. Vercel, Projekt unio, Storage: Upstash Redis aus dem Marketplace anlegen und mit dem Projekt verbinden. Das setzt `KV_REST_API_URL` und `KV_REST_API_TOKEN`.
2. Vercel, Environment Variables: `WB_WORKER_TOKEN` mit einem langen Zufallswert anlegen, danach neu deployen.
3. Routine anlegen: eine geplante Claude-Sitzung mit Higgsfield-Connector, alle 15 bis 30 Minuten, Auftrag `/bildwelt warteschlange`, derselbe `WB_WORKER_TOKEN` in ihrer Umgebung.

## Nächste Stufe

Echtzeit statt Abfrage alle 30 Sekunden, und eine Freigabe durch Daniel vor großen Aufträgen. Die Formate oben bleiben gleich.
