# Logo-Werkstatt und eine Quelle

Stand 30.09.2026. Code: `ui_kits/werkbank/wb-logo.jsx`, `ui_kits/werkbank/wb-freigabe.jsx`.

## Logo-Werkstatt

Vorbild ist das Prinzip von Looka und Brandmark: Vorlieben über Beispiele, viele Entwürfe, die dazulernen, jeder Entwurf sofort im Einsatz. Bewusst anders (Prozess v2, C5): keine Symbole aus einem Katalog, keine freie Farbwahl. Zeichen kommen aus der Markenidee und der Markenwelt, Schriften aus einem kuratierten Pool, Farben aus dem Branding. Das Team kuratiert, der Makler urteilt am Markenvertrag.

- **Arten:** Wortmarke, Versalien gesperrt, gestapelt, Monogramm (nebeneinander mit Haarlinie oder gestapelt), Zeichen und Name, Maßstab (feste Teilung mit Skala), Name mit Punkt.
- **Zeichen:** Ratlinie, wenn die Idee vom Rat handelt; sonst das Zeichen der Markenwelt (Fenster 3:4, Folio, Grätzl-Linie, Schriftfeld, Bogen, Kante).
- **Schriftpool:** Newsreader, Fraunces, Playfair Display, DM Serif Display, Instrument Sans, Space Grotesk, Manrope, Hanken Grotesk. Die Schriften des Brandings werden bevorzugt.
- **Bedienung (Team):** Studio, Logo, „Logo-Werkstatt öffnen“. Richtung wählen (Antiqua, Grotesk, mit Zeichen, Initialen), „Neue Runde“, „Mehr davon“ je Entwurf, bis zu drei merken, „Als Logo übernehmen“, „SVG laden“ (Schrift in Pfaden).
- **Im Einsatz:** Profilbild (Monogramm oder Zeichen aus demselben Entwurf), Visitenkarte, Website-Kopf, Post.
- **Makler:** sieht die gemerkten Entwürfe im Studio und beantwortet drei Fragen aus dem Markenvertrag mit Ja oder Nein. Das Team entscheidet.
- **Übernahme:** `branding[mid].logo = "konzept"` und `logoKonzept = spec`. `BrandLogo`, die Renderer der Markenwelten, der Website-Kopf und das Materialpaket zeigen denselben Entwurf.

Ein Entwurf ist eine Spezifikation `{ id, art, font, gewicht, versal, laufweite, zeichen, lage, akzent }`. `hmLkLayout` macht daraus Bauteile, `hmLkSvgText` gibt sie als SVG mit Text aus (Vorschau, Website), `hmLkSvgPfade` mit Pfaden (Export).

## Eine Quelle (Grundstufe)

- Die Freigabe (Markenbuch durch Daniel, Branding im Studio) friert die Marke als Version mit SHA-256-Prüfsumme ein: Claim, Akzent, Schrift, Logo, Markenwelt, Anrede je Kanal, Versprechen, Positionierung.
- Öffentliche Ausgaben lesen über `hmMarkeB(mid, "oeffentlich")` nur diese Version: Website-Paket, Materialpaket. Das Team arbeitet am Entwurf weiter und sieht in Markenbuch und Website „Entwurf weicht ab: …“.
- Die Anrede hat genau eine Definition: `hmAnrede(mid, kanal)` und `hmAnredeRegel(mid)`.
- Ablage: `unio_hm_marke2[mid] = { quelle: { version, eingefrorenAm, freigegebenVon, inhalt, pruefsumme }, historie: [] }`.
- Bestehende Freigaben wurden einmal als Version 1.0 übernommen.

Noch nicht in dieser Stufe: Sperre mit „Änderung beantragen“ an allen Schreibpfaden, Freigabe-Code des Maklers, Server-Datenhaltung (siehe `branding-v2/UMBAU_ETAPPEN.md`, Etappe 3).
