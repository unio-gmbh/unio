# Fahrplan Werkbank

Stand 29.09.2026. Eine Seite. Owner: Daniel. Ausführlich: `ROADMAP.md`, Protokoll: `V5_STUFEN.md`, Stand: `STATUS.md`.

## Vision

Die Werkbank macht aus einem Immobilienmakler eine Personenmarke auf dem Niveau eines internationalen Branding-Studios: Strategie, Stimme, visuelles System, Website und ein Social Feed, der nach Art Direction aussieht. Der Makler erlebt den Prozess als Premium-Dienstleistung, das UNIO-Team produziert mit wenig Handarbeit und gleichbleibender Qualität.

## Entscheidungen

- Arbeitsweise nach Vorlage des Owners: eine Etappe, Plan vor Bau, ein OK, Dateien als Gedächtnis, drei Abschlusszeilen.
- Repo `unio-gmbh/unio` (öffentlich), neutrale Namen (`werkbank`, `wb-*`). Keine Zugangsdaten in Dateien.
- Live als passwortgeschützte UX-Vorschau unter `/ux/werkbank`, Daten vorerst im Browser (localStorage, IndexedDB).
- Claude-Kette für die Marke serverseitig (`api/wb-marke.js`), Regeln im Browser als Rückfall.
- Higgsfield nur über den MCP-Connector und das normale Abo, nur fürs Team, Automatik über Warteschlange (`api/wb-bildwelt.js`).
- Keine KI-Bilder von echten oder erkennbaren Personen. Keine Eyebrows, keine Textzeichen als Icons, keine Ausrufezeichen, keine Gedankenstriche.

## Etappen

| Etappe | Was sichtbar wird | Was der Owner tun muss |
|---|---|---|
| v5 Stufen 1 bis 9 | Werkbank mit Einrichtung, Marke, Inhalten, Wirkung, Shop, Markenbuch, Reels | erledigt |
| Website-Baukasten | Stil-Leiste, alle Looks live, Bildfelder, Mobilansicht | erledigt |
| Bildwelt-Automatik | Bilder erscheinen ohne Kopieren | Upstash Redis in Vercel verbinden, `WB_WORKER_TOKEN` setzen |
| **Branding-Qualität v2** (fertig, Abnahme offen) | Prozess v2 in 17 Schritten, Frage-Wirkungs-Tabelle, Beweis für Markus mit zwölf Kacheln | Beweis ansehen, C1 bis C9 freigeben |
| Umbau Markenprozess v2 | Werkbank folgt dem neuen Prozess, in elf Etappen laut `branding-v2/UMBAU_ETAPPEN.md`, zuerst Sofortreparaturen und eine eingefrorene Markenquelle | Freigabe der Umbauliste |

## Geparkt

- Echtzeit statt Abfrage für die Bildwelt-Warteschlange.
- Eigene Domain je Makler und Veröffentlichung der Website.

## Später

- Server-Datenhaltung (Supabase EU) statt Browser-Speicher, Rollen serverseitig.
- Farbvorschlag aus Porträt oder altem Logo.
- Helle und dunkle Sektionsthemen je Website-Abschnitt.
