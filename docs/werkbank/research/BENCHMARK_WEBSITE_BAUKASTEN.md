# Benchmark: Website-Baukasten für Makler-Homepages

Stand: 29.09.2026. Recherche für die Werkbank: Das Team füllt pro Makler eine Homepage, die Marke (Akzentfarbe, Schriftpaar, Logo, Porträt, Claim, Texte, Bilder) wird einmal gewählt und in sechs Vorlagen (`showcase/showcase1.html` bis `showcase6.html`) gleichzeitig gezeigt. Gesucht: ein Mechanismus, der eine Markenwahl automatisch in alle Vorlagen trägt, ein kuratierter Picker ohne Freitext und ohne Hex-Eingabe, Bildfelder mit Drag and Drop und Mediathek, eine saubere Geräteumschaltung.

Nur Web-Recherche plus Lesen des Prototyps, keine Codeänderung. Quellen stehen je Abschnitt.

---

## 0. Ausgangslage im Prototyp (nur gelesen)

- `ui_kits/werkbank/wb-marke.jsx`, Funktion `hmFuelleTemplate`: Die Vorschau lädt jede Showcase-Datei in ein iframe und schreibt danach in deren DOM. Texte werden per `TreeWalker` über Demo-Strings ersetzt ("Marcus", "Weiss", "marcus@example.at", "Immobilien, persönlich verkauft." usw.), Bilder über die Schlüssel im `IMG`-Objekt der Vorlage, Farbe über CSS-Variablen (`--loden`, `--loden-2`, `--clay`, `--head-tint` per `color-mix`), Schrift über `--fd` und `--fb` plus nachgeladenen Google-Fonts-Link.
- `ui_kits/werkbank/wb-os-data.jsx`: kuratierte Listen existieren bereits: 5 Schriftpaare (`HM_WEB_SCHRIFTEN`: Editorial, Klassisch, Zeitlos, Modern, UNIO), 7 Akzente (`HM_WEB_AKZENTE`), Empfehlungen je Figur (`HM_SCHRIFTPAARE`, `HM_AKZENT_EMPF`), 6 Looks (`HM_LOOKS`).
- Alle sechs Showcases teilen dasselbe Variablenvokabular (`--bg`, `--paper`, `--card`, `--ink`, `--ink-soft`, `--line`, `--on-solid`, `--loden`, `--loden-2`, `--head-tint`, `--panel`, `--r`). Das ist die beste Voraussetzung für ein gemeinsames Token-Modell. Jede Datei ist rund 2,5 MB groß (eingebettete Bilder), sechs parallele iframes sind also spürbar schwer.
- Schwachstellen: (a) Textersetzung über Demo-Strings bricht still, sobald jemand den Demotext einer Vorlage ändert. (b) Das Akzent-Mapping heißt noch `--loden`, also nach einer konkreten Farbe statt nach einer Rolle. (c) Leere Bilder werden per `visibility: hidden` versteckt, das hinterlässt Löcher im Layout.

**Kontrastprüfung der sieben kuratierten Akzente** (WCAG, selbst berechnet):

| Akzent | Hex | Weiß darauf | Tinte #0B0A09 darauf | Als Text auf Grund #F7F5F1 |
|---|---|---|---|---|
| UNIO Orange | #FFAA09 | 1,9 (durchgefallen) | 10,4 | 1,8 (durchgefallen) |
| Loden | #33503F | 8,9 | 2,2 | 8,2 |
| Bordeaux | #6E2A3C | 10,2 | 1,9 | 9,4 |
| Nachtblau | #1F3A5F | 11,5 | 1,7 | 10,5 |
| Terrakotta | #B45B3E | 4,7 | 4,2 | 4,3 (nur große Schrift) |
| Aubergine | #4A2E52 | 11,6 | 1,7 | 10,7 |
| Petrol | #1E4E4A | 9,4 | 2,1 | 8,6 |

Folge: Orange braucht dunkle Buttonschrift und darf nie als Fließtext- oder Linkfarbe auf hellem Grund laufen, Terrakotta nur ab etwa 24 px oder fett. Genau diese Regeln sollten pro Farbe im Datensatz stehen (siehe Abschnitt 1), nicht zur Laufzeit erraten werden.

---

## 1. Wie Themes gespeichert und in viele Vorlagen getragen werden

### Was die Anbieter tun

**Shopify (Online Store 2.0).** Globale Einstellungen stehen in `config/settings_schema.json` (Definition) und `config/settings_data.json` (Werte). Farben laufen über `color_scheme_group`: jedes Schema ist eine Gruppe aus `background`, `text`, `button`, `button_label`, `border` usw., plus ein `role`-Objekt, das dem Editor sagt, welche Farbe welche Aufgabe hat (z. B. `"primary_button": {"background": "button", "text": "button_label"}`). Aus den Rollen rendert der Editor die Vorschaukachel und prüft Kontrast. Jede Sektion hat nur noch ein Feld `color_scheme` und wählt ein Schema aus; das Theme erzeugt je Schema eine CSS-Klasse `.color-{id}` mit `--color-background` usw. Ändert man ein Schema, ändern sich alle Sektionen, die es nutzen. Bis zu 21 Schemata. Seit 17.06.2026 gibt es zusätzlich `color_palette`: ein globales Raster aus 2 bis 20 benannten Farben, auf das einzelne Farbfelder als Default verweisen; Horizon ab 4.0 nutzt es. Fallback: ungültiges Schema fällt auf den Default, danach auf das erste Schema.
Quellen: https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings, https://shopify.dev/docs/api/liquid/objects/color_scheme_group, https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor/color-settings, https://shopify.dev/changelog/posts/color-palettes, https://www.insiteful.com.au/shopify-color-schemes/

**Squarespace 7.1 (Site Styles).** Jede Site hat genau eine Palette aus fünf Farben mit festen Rollen: hellstes Neutral, helles Akzent, Hauptakzent, dunkles Akzent, dunkelstes Neutral. Aus den fünf Farben werden automatisch zehn Sektions-Themes gebildet (Paare Lightest, Light, Bright, Dark, Darkest). Eine Sektion wählt nur ein Theme, nie eine Farbe. Text- und Buttonfarben springen automatisch auf Schwarz oder Weiß, wenn der Kontrast sonst nicht reicht. Palette entsteht aus kuratierten Presets, aus einem hochgeladenen Bild (drei dominante Farben) oder aus einer Primärfarbe. Vorlagenwechsel gibt es in 7.1 nicht mehr: alle Sites haben dieselbe Struktur, der Look ändert sich über Site Styles und Sektionslayouts, Inhalte bleiben.
Quellen: https://support.squarespace.com/hc/en-us/articles/205815278-Changing-colors, https://www.squareko.com/template-guide/squarespace-7-1-templates, https://www.portabludesign.com/blog/color-palette-squarespace-website

**Wix Studio.** Mindestens 6 feste Site-Farben mit Funktion (1 Hintergrund, 2 zweiter Hintergrund, 3 deaktiviert, 4 Sekundärtext, 5 Primärtext, 6 Links und Aktionen), maximal 25. Elemente sind an Farben und Text-Themes gebunden ("themed elements") und aktualisieren sich bei jeder Änderung. Im Site-Design-Panel gibt es Theme-Presets (Farbe plus Text), die die ganze Site auf einen Klick umstellen.
Quellen: https://support.wix.com/en/article/studio-editor-working-with-site-colors, https://support.wix.com/en/article/studio-editor-about-site-styles, https://support.wix.com/en/article/wix-editor-customizing-your-sites-theme-and-design

**Webflow Variables mit Modes (seit Januar 2025).** Collections gruppieren Variablen, eine Variable kann je Mode (hell, dunkel, Marke B) einen anderen Wert haben. Empfehlung der Community: Primitive (Rohfarben) ohne Modes in eine Collection, semantische Variablen (Hintergrund, Text, Akzent) mit Modes in eine zweite. Komponenten erben den aktiven Mode, es braucht keine Varianten pro Theme.
Quellen: https://webflow.com/updates/variable-modes, https://help.webflow.com/hc/en-us/articles/33961268146323-Variables, https://www.calebraney.com/post/variable-modes-and-collections-in-webflow

**Framer.** Color Styles mit zwei Werten (hell und dunkel), Text Styles, die auf Color Styles verweisen. Framer rät, Styles nach Zweck zu benennen (background, text, border, accent), nicht nach Farbe.
Quellen: https://www.framer.com/academy/lessons/framer-fundamentals-themes, https://www.framer.com/updates/light-and-dark-mode

**Tokens Studio und Figma Variables.** Dreischichtig: Primitive (Werte) → Semantik (Bedeutung) → Komponente. Themes sind Kombinationen aus Token-Sets mit identischen Namen; beim Theme-Wechsel werden nur die semantischen Werte getauscht.
Quellen: https://docs.tokens.studio/manage-themes/themes-overview, https://documentation.tokens.studio/platform/features/themes/theme-groups-and-theme-options

**Canva Brand Kit.** Farben, Schriften, Logos zentral; Anwendung auf eine Vorlage per Klick, Farbthemes färben Hintergrund, Elemente und Text gemeinsam, "Shuffle" rotiert durch Kombinationen. Brand Controls erlauben pro Ordner nur Markenfarben und Markenschriften, der freie Picker verschwindet dann.
Quellen: https://www.canva.com/help/apply-brand-kit-colors/, https://www.canva.com/help/brand-control/, https://www.canva.com/help/folder-brand-controls/

**Luxury Presence.** "Website Styles" (Farbeimer-Icon): Farben für Text, Hintergründe, Buttons, Links; Typografie; Buttons; Branding mit Favicon, Ladelogo und einem eigenen Platzhalterbild für fehlende Objektfotos. Agent-Subdomains sind bewusst "brand-locked": Farben kommen von der Brokerage-Site, Agents können sie nicht ändern.
Quelle: https://help.luxurypresence.com/helpcenter/s/article/Website-Styles

### Gemeinsames Muster

1. Sektionen und Vorlagen kennen **nur Rollen**, nie Rohfarben. (Shopify `role`, Squarespace Theme, Wix Farbe 1 bis 6, Framer semantische Styles.)
2. Die Marke ist **ein kleiner Datensatz**, Vorlagen sind **Konsumenten** davon. Eine Änderung am Datensatz aktualisiert alles, weil nichts kopiert wird.
3. Abgeleitete Töne (hover, soft, tint) werden **berechnet**, nicht vom Nutzer gewählt.
4. Kontrastfarbe auf dem Akzent ("on accent") wird **automatisch** bestimmt (Squarespace, Material 3).

### Vorgeschlagenes Token-Modell für die Werkbank

Markendatensatz (was das Team wählt, alles IDs aus kuratierten Listen):

```json
{
  "akzent": "loden",
  "schriftpaar": "klassisch",
  "logo": { "typ": "wort" },
  "bilder": { "portrait": "med_014", "hero": "med_022", "life": ["med_030", "med_031"] },
  "texte": { "claim": "...", "bio": "...", "zitat": "..." }
}
```

Jede kuratierte Farbe liefert vorberechnete Rollenwerte, einmal geprüft, nie zur Laufzeit geraten:

```json
{ "id": "orange", "name": "UNIO Orange", "accent": "#FFAA09",
  "accentStrong": "#C98200", "accentSoft": "#FBE7C2", "accentTint": "#F9EEDC",
  "onAccent": "#0B0A09", "alsText": false, "alsFlaeche": true }
```

Rollen, die jede Showcase-Vorlage konsumiert (Vorschlag, Namespace `--wb-`, in jeder Vorlage einmal auf die alten Namen gemappt, z. B. `--loden: var(--wb-accent)`):

| Rolle | Bedeutung | Herkunft |
|---|---|---|
| `--wb-bg`, `--wb-paper`, `--wb-card` | Grund, Papier, Karte | fix je Vorlage (hell) |
| `--wb-ink`, `--wb-ink-soft`, `--wb-line` | Text, Sekundärtext, Linien | fix |
| `--wb-accent` | Markenfarbe für Flächen, Punkte, Buttons | Akzent |
| `--wb-accent-strong` | Hover, dunkle Sektion | vorberechnet |
| `--wb-accent-soft`, `--wb-accent-tint` | helle Flächen, Kopfbereich | vorberechnet |
| `--wb-on-accent` | Schrift auf Akzentfläche | vorberechnet nach Kontrast |
| `--wb-link` | Linkfarbe auf hellem Grund | Akzent, wenn `alsText`, sonst `--wb-ink` |
| `--wb-font-display`, `--wb-font-text` | Schriftpaar | Schriftpaar |

Texte und Bilder genauso: statt Suchen und Ersetzen von Demo-Strings bekommen die Vorlagen feste Slots (`data-wb="claim"`, `data-wb-img="hero"`, `data-wb-if="referenzen"`). Das ist Shopifys Prinzip "Sektion hat Settings, Werte kommen von außen", übertragen auf statisches HTML.

---

## 2. Farbwahl nur aus kuratierten Paletten

### Muster der Anbieter

- **Palettenkarten statt Einzelfarben.** Squarespace Blueprint zeigt pro Markenpersönlichkeit vier kuratierte Paletten als Karten; ein Klick färbt die Homepage-Vorschau links sofort um. Real Geeks nennt das "Color Variations": vorgefertigte Themes, die Highlights, Menüs, Buttons auf einmal umstellen, bei Anna/Anna Modern bewusst an typische Brokerage-Farben angelehnt. Placester: Farboption anklicken, Vorschau ändert sich, erst "Save" macht es live. Wix: Theme-Presets aus Farbe plus Schrift.
- **Shopify-Schema-Kachel.** Das Schema wird im Picker als kleine Karte gerendert: Hintergrund, "Aa" in Textfarbe, ein Mini-Button in Buttonfarbe. Möglich, weil die Rollen bekannt sind.
- **Harte Beschränkung.** Canva Brand Controls blenden alles außer Markenfarben aus; Luxury Presence sperrt Farben auf Agent-Subdomains ganz.
- **Automatisch abgeleitete Töne.** Material 3 erzeugt aus einer Seed-Farbe 13 Tonstufen und mappt Rollen darauf (Primary Ton 40, On Primary Ton 100, Container Ton 90); Squarespace setzt Text und Buttonschrift automatisch auf Schwarz oder Weiß. Der Prototyp macht das schon mit `color-mix`.
- **Hell/Dunkel pro Sektion.** Squarespace erlaubt je Sektion ein Theme aus demselben Satz (hell, bright, dunkel). Das hält Abwechslung im Layout, ohne neue Farben einzuführen.

Quellen: https://www.websitebuilderexpert.com/website-builders/squarespace-blueprint-ai/, https://support.realgeeks.com/design-editor, https://support.placester.com/hc/en-us/articles/202082339-Changing-Themes-and-Colors, https://shopify.dev/docs/api/liquid/objects/color_scheme_group, https://www.canva.com/help/brand-control/, https://m3.material.io/styles/color/roles, https://m3.material.io/styles/color/system/how-the-system-works

### Übertragen auf die Werkbank

- 7 Akzente als runde Swatches reichen nicht als Entscheidungshilfe. Besser: **Swatch plus Mini-Anwendung** (Button in der Farbe mit korrekter Schrift, ein Punkt hinter dem Namen, ein heller Tint-Streifen). Das zeigt, wie die Farbe wirkt, nicht nur welche sie ist.
- **Empfohlene zwei Farben** je Figur (existiert als `HM_AKZENT_EMPF`) zuerst und markiert, die übrigen fünf dahinter. Squarespace macht das über "Brand Personality".
- **Kein Kontrast-Warnhinweis im UI nötig**, weil die Liste vorab geprüft ist. Die Regel steckt im Datensatz (`alsText: false` bei Orange) und die Vorlagen verhalten sich danach. Warnungen sind für freie Picker gedacht, nicht für kuratierte.

---

## 3. Schriftwahl mit kuratierten Paaren

### Muster der Anbieter

- **Squarespace Font Packs:** vorgefertigte Paare für Überschrift, Absatz, Button, sortiert nach Sans, Serif, Mix; Klick auf ein Pack zeigt es sofort auf der eigenen Site. Blueprint reduziert auf 14 Paare, zwei pro Markenpersönlichkeit.
- **Wix Studio:** eine Schrift für die Gruppe Überschriften (H1 bis H6 übernehmen automatisch mit eigenen Größen), eine für Absätze. Größenstufen hängen am Stil, nicht an der Schrift.
- **Jimdo:** unter "Design" eine Liste von Kombinationen aus Überschrift und Fließtext.
- **Shopify font_picker:** zieht aus einer festen Bibliothek (System, Google, Monotype), filterbar nach Serif, Sans, Mono, jede Zeile in der eigenen Schrift gesetzt; `default` ist Pflicht, damit nie keine Schrift da ist.
- **Durable:** "Generate brand" schlägt Logo, Palette und Schriftpaar gemeinsam vor, neu würfeln möglich.

Quellen: https://support.squarespace.com/hc/en-us/articles/206545327-Choose-and-style-your-site-s-fonts, https://www.paigebrunton.com/blog/customize-squarespace-style-editor, https://www.websitebuilderexpert.com/website-builders/squarespace-blueprint-ai/, https://support.wix.com/en/article/studio-editor-working-with-site-typography, https://www.jimdo.com/de/magazin/anleitung-individuelle-website-gestalten/, https://shopify.dev/docs/storefronts/themes/architecture/settings/fonts, https://www.toolify.ai/ai-news/durable-ai-website-builder-brand-asset-generation-tutorial-3383610

### Übertragen auf die Werkbank

- **Specimen-Karte statt Dropdown:** oben der echte Name des Maklers in der Display-Schrift (nicht "Aa"), darunter zwei Zeilen Bio in der Textschrift, klein der Paarname ("Klassisch") und die beiden Schriftnamen. Der eigene Name ist das stärkste Specimen, das es gibt.
- **Ein Paar ist eine Entscheidung.** Nie getrennte Picker für Überschrift und Text anbieten; das Paar ist die kuratierte Einheit (so machen es Squarespace Packs und Blueprint).
- **Schriften vorladen:** alle 5 Paare einmal beim Öffnen des Pickers laden (je Paar zwei Familien, wenige Schnitte), damit Umschalten ohne Flackern passiert. Im Prototyp wird pro Vorschau ein neuer Google-Fonts-Link in jedes iframe gehängt; bei sechs iframes heißt das sechs Mal laden.

---

## 4. Bildfelder

### Muster der Anbieter

- **Shopify image_picker:** "Select image" öffnet eine Mediathek (bereits hochgeladene Dateien) mit Upload-Knopf und "Explore free images" (Burst). Fokuspunkt per Klick oder blauem Punkt, gespeichert am Bild, gilt überall, wo es verwendet wird; `image_tag` setzt daraus `object-position`. Alt-Text am Bild. Optional ein eigenes Mobilbild (768 × 1024). Kein Default erlaubt; ist nichts gesetzt, rendern Themes ein Platzhalter-SVG (`placeholder_svg_tag`: image, lifestyle, product, collection).
- **Squarespace:** Fokuspunkt als kleiner Kreis beim Hover, ziehen, speichert sofort. Bildformen mit festen Seitenverhältnissen (1:1, 2:3, 3:2); Galerien und Zusammenfassungen schneiden einheitlich zu, der Fokuspunkt bestimmt den Ausschnitt.
- **Wix Media Manager:** Drag and Drop in die Mediathek oder direkt auf die Arbeitsfläche, das Bild landet automatisch in "Site Files". Fokuspunkt pro Galerie-Bild. Nicht erlaubte Ersetzungen (z. B. SVG statt Foto) sind ausgegraut statt still falsch.
- **Webflow Assets:** Alt-Text wird am Asset gesetzt und von jeder Verwendung geerbt, "Decorative" setzt `alt=""`, Überschreiben pro Instanz möglich.
- **Luxury Presence:** eigenes Platzhalterbild für fehlende Objektfotos als Teil der Marke.

Quellen: https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings, https://help.shopify.com/en/manual/online-store/images/theme-images, https://shopify.dev/docs/api/liquid/filters/placeholder_svg_tag, https://support.squarespace.com/hc/en-us/articles/205826028-Using-focal-points-to-center-images, https://www.bigcatcreative.com/blog/image-focal-point-squarespace, https://support.wix.com/en/article/wix-media-uploading-media-to-the-media-manager, https://support.wix.com/en/article/wix-pro-gallery-changing-the-focal-point-of-an-image-or-video, https://help.webflow.com/hc/en-us/articles/33961330170643-Include-alt-text-on-images, https://help.luxurypresence.com/helpcenter/s/article/Website-Styles

### Übertragen auf die Werkbank

- **Ein Bildfeld, drei Wege:** Datei auf die Kachel ziehen, Kachel anklicken öffnet Mediathek des Maklers (alles bereits Hochgeladene aus Material, Porträt-Zuschnitt, Bildwelt), oder direkt ein Bild aus der Mediathek-Leiste auf den Slot in der Vorschau ziehen.
- **Bild und Verwendung trennen:** Mediathek speichert Datei, Fokuspunkt, Alt-Text einmal (`med_022`); Slots speichern nur die ID. Dann gilt ein gesetzter Fokuspunkt in allen sechs Vorlagen, egal ob dort 16:9, 4:5 oder 1:1 geschnitten wird. Umsetzung: `object-fit: cover; object-position: x% y%`.
- **Slot-Hinweis statt Fehler:** jeder Slot kennt sein Zielformat und seine Mindestbreite ("Hero, quer, ab 2000 px"). Ist das Bild kleiner oder hochkant, erscheint ein ruhiger Hinweis an der Kachel, das Bild wird trotzdem gezeigt.
- **Leere Slots nie verstecken, sondern füllen:** Reihenfolge Fallback: eigenes Bild → UNIO-Bildwelt passend zur Figur → neutrale Tonfläche in `--wb-accent-tint` mit Monogramm. Kein `visibility: hidden`.

---

## 5. Vorschau, Geräte, Vorlagenwechsel

### Muster der Anbieter

- **Shopify:** Vorschau im iframe, oben rechts Desktop, Mobil, Vollbild; Aktualisierung ohne Neuladen; Preview Inspector wählt Sektionen per Klick in der Vorschau. Shopify warnt selbst: das iframe ist schmaler als das Browserfenster, Layouts mit `vw` oder Viewport-Annahmen sehen dort anders aus. "Try theme" legt eine Vorlage als Entwurf an und zeigt sie mit den eigenen Produkten; Admin-Inhalte bleiben, Theme-Editor-Inhalte sind pro Theme getrennt.
- **Webflow:** feste Breakpoints (Desktop ab 992, Tablet bis 991, Mobil quer bis 767, Mobil hoch bis 478), Canvas kann mehrere nebeneinander zeigen.
- **Framer:** drei Breakpoints 1200, 810, 390 als echte Breiten.
- **Placester Codeless:** Designauswahl in einem ausfahrenden Panel, jede Variante vorab in Desktop, Tablet, Telefon ansehbar, dann "Save and use".
- **Lofty:** Template im Style-Tab wählen, rechte Vorschau ändert sich sofort; der KI-Builder bietet nach dem Generieren "anderes Template probieren" vor "Approve".
- **Squarespace Blueprint:** "Layout Switcher" blättert Varianten mit einem Klick, Pfeile oben blättern Seiten.
- **Carrd:** "Switch to Mobile View" beschneidet die Arbeitsfläche auf Telefonbreite, "Expanded View" hebt den Beschnitt auf.

Quellen: https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor/features-overview, https://ajmalfarhan.in/insights/shopify-theme-editor-vs-live-preview, https://help.shopify.com/en/manual/online-store/themes/adding-themes, https://help.webflow.com/hc/en-us/articles/33961300305811-Breakpoints-overview, https://www.framer.com/academy/lessons/framer-fundamentals-breakpoints, https://support.placester.com/article/wqbdy8euaq-switching-website-design-codeless, https://help.lofty.com/hc/en-us/articles/360037814212-Changing-the-Website-Template, https://help.lofty.com/hc/en-us/articles/46049898651291-How-to-Create-Your-Website-with-the-Website-Building-Agent, https://www.websitebuilderexpert.com/website-builders/squarespace-blueprint-ai/, https://carrd.com/docs/building/using-mobile-view

### Übertragen auf die Werkbank

- **Echte Breite, dann skalieren.** Das iframe bekommt die echte Gerätebreite (1440, 820, 390 px) und wird per `transform: scale()` in den verfügbaren Platz eingepasst. So greifen die Media Queries der Vorlage wirklich, statt dass ein schmales Desktop-Layout entsteht. Höhe mitskalieren, Scrollen innerhalb des iframes lassen.
- **Live ohne Reload:** Die Vorlage wird einmal geladen, danach schickt die Werkbank bei jeder Änderung den Markendatensatz per `postMessage`; ein kleines Skript in jeder Showcase setzt CSS-Variablen und Slots. Farbe und Schrift wechseln dann in Millisekunden, Scrollposition bleibt.
- **Sechs Vorlagen sparsam rendern:** Übersicht als Raster aus sechs skalierten Kacheln, aber nur die sichtbaren iframes laden (`loading="lazy"` bzw. IntersectionObserver) oder in der Übersicht statische Screenshots zeigen und nur die angeklickte Vorlage live. Bei 2,5 MB je Datei ist das der größte Hebel.
- **Vergleich statt Wechsel:** Da alle Inhalte am Makler hängen und nicht an der Vorlage, ist "andere Vorlage probieren" verlustfrei. Das ist der Vorteil gegenüber Shopify, wo Theme-Inhalte pro Theme getrennt sind.

---

## 6. Leitplanken gegen kaputte Vorschauen

| Leitplanke | Vorbild | Werkbank-Regel |
|---|---|---|
| Pflichtwerte mit Default | Shopify: `font_picker` und `range` brauchen `default`, Schema fällt auf erstes Schema zurück | Jede Marke startet mit Empfehlung der Figur (Akzent, Paar, Logo-Typ), nie leer |
| Automatische Kontrastfarbe | Squarespace springt auf Schwarz oder Weiß | `onAccent` und `alsText` je Farbe vorberechnet |
| Platzhalter statt Loch | Shopify `placeholder_svg_tag`, Luxury Presence Objekt-Platzhalter | Bildwelt-Bild oder Tonfläche mit Monogramm |
| Optionale Sektionen ausblenden, aber sauber | Prototyp blendet Referenzen ohne Stimme aus | `data-wb-if`: ganze Sektion inklusive Navigationspunkt weg, nicht nur Inhalt |
| Textlängen | allgemein: Zeichenzähler im Feld | Claim max. 60, Headline max. 70, Bio 280 bis 420 Zeichen, Zähler erst ab 80 % sichtbar |
| Headline passt sich an | CSS `clamp()` mit Container-Einheiten, `text-wrap: balance` | `font-size: clamp(2rem, 8cqi, 5.5rem); text-wrap: balance; hyphens: auto; lang="de"` |
| Lange Namen | eigener Befund: Vorlage 6 "Nachname hinter dem Kopf" | Nachname-Slot mit `cqi`-Skalierung, Test mit "Schwarzenberg-Hohenlohe" |
| Bildformat | Squarespace feste Formen, Shopify Fokuspunkt | Slot gibt Format vor, Fokuspunkt entscheidet Ausschnitt |

Quellen: https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings, https://support.squarespace.com/hc/en-us/articles/205815278-Changing-colors, https://moderncss.dev/container-query-units-and-fluid-typography/, https://dev.to/vishal_singh_0610/css-text-fit-responsive-headlines-without-javascript-font-sizing-loops-23ib

---

## 7. Immobilienanbieter im Überblick

| Anbieter | Marke und Farbe | Vorlagen | Auffällig |
|---|---|---|---|
| Luxury Presence | Website Styles: Text, Hintergrund, Button, Link, Typografie, Branding, Platzhalterbild | vorgefertigte Templates, Team nutzt sie sofort | Agent-Subdomains farblich gesperrt auf Brokerage-Marke |
| AgentFire | vier "Ignite"-Themes, passen sich Logo, Farben, Schrift an; Team baut die Site für den Agent | 4 | Setup als Dienstleistung, nicht Selbstbau |
| Placester | Farboptionen je Theme, Primär, Sekundär, Tertiär | mehrere, verlustfrei wechselbar | Designauswahl mit Gerätevorschau vor dem Speichern |
| Real Geeks | "Color Variations" als Presets, erweiterte Farben optional | 5 (Anna, Anna Modern, Miranda, Miranda Thin, Molly) | Presets an typische Brokerage-Farben angelehnt |
| Sierra Interactive | Primär, Sekundär, Schriftfarben, Links optional am Akzent | Templates plus Semi-Custom-Service | Link-Farbe "wie Akzent oder eigene" |
| Lofty | Theme: Primär- und Hoverfarbe, Titelstil, Buttonstil | Template-Wechsel mit Sofortvorschau | KI-Builder: generieren, anderes Template probieren, Approve |
| BoldTrail (kvCORE) | Templatefarbe, Picker oder RGB | Posh, Conqueror, Superior | Brokerage-Homepage kann auf Agent-Sites übertragen werden |
| onOffice (DACH) | smart site 2.0: Designs, Farben, Layout kombinierbar; Web-Exposé mit Theme und Farben | viele Designs | Daten kommen aus der Maklersoftware |
| Propstack (DACH) | keine eigene Baukasten-Doku gefunden, Websites über Partner mit OpenImmo-Schnittstelle | Partnerlösungen | Formulare fließen zurück in die Software |

Quellen: https://help.luxurypresence.com/helpcenter/s/article/Website-Styles, https://agentfire.com/ignite-themes/, https://agentfire.com/tour/, https://support.placester.com/hc/en-us/articles/202082339-Changing-Themes-and-Colors, https://support.placester.com/article/wqbdy8euaq-switching-website-design-codeless, https://support.realgeeks.com/design-editor, https://help.sierrainteractive.com/helpcenter/customize-your-sierra-website-to-boost-branding-and-conversion, https://help.lofty.com/hc/en-us/articles/53174461815067-Customizing-Your-Website-Theme-and-Fonts-Lofty-AOS, https://boldtrailwebdesign.com/how-to-customize-your-kvcore-website-a-step-by-step-guide/, https://www.pressebox.de/pressemitteilung/onoffice-software-gmbh/Homepage-Baukasten-smart-site-20/boxid/622057, https://onoffice.com/immobiliensoftware/web-expose/, https://www.homepage-helden.de/propstack-schnittstelle/

**Befund:** Die Immobilienanbieter sind im Editor schwächer als die allgemeinen Baukästen. Fast alle bieten Hex-Eingabe und freie Picker, kaum einer zeigt Varianten nebeneinander. Stark sind sie bei zwei Dingen: Marke zentral sperren (Luxury Presence) und Setup als Service durch ein Team (AgentFire, Sierra, BoldTrail-Partner). Genau das ist das Werkbank-Modell. Die UI-Vorbilder für Picker und Vorschau kommen daher aus Squarespace, Shopify und Canva.

---

## 8. Priorisierte Empfehlung

### Muss

1. **Ein Markendatensatz, sechs Konsumenten.** Marke als JSON mit IDs aus kuratierten Listen; alle Showcases lesen dieselben Rollen-Variablen (`--wb-*`) und Slots (`data-wb`). Keine Textersetzung über Demo-Strings mehr.
2. **Vorberechnete Farbrollen je Akzent** (`accent`, `accentStrong`, `accentSoft`, `accentTint`, `onAccent`, `alsText`). Orange und Terrakotta korrekt behandeln (siehe Tabelle Abschnitt 0).
3. **Live-Update per `postMessage`** statt iframe-Neuaufbau; Scrollposition bleibt.
4. **Gerätewechsel mit echter Breite und Skalierung** (1440 / 820 / 390), Umschalter als Segmented Control mit drei Icons.
5. **Mediathek pro Makler** mit Drag and Drop, Bild einmal speichern (Datei, Fokuspunkt, Alt-Text), Slots speichern nur IDs.
6. **Fallbacks für jeden Slot** (Bild, Text, optionale Sektion); nichts wird versteckt, ohne das Layout zu schließen.
7. **Defaults aus der Figur-Empfehlung**, damit jede Vorschau vom ersten Moment an fertig aussieht.

### Sollte

8. Fokuspunkt-Editor direkt im Bildfeld (Punkt ziehen, darunter drei Mini-Ausschnitte 16:9, 4:5, 1:1).
9. Specimen-Karten mit dem echten Namen des Maklers für die Schriftpaare, Palettenkarten mit Mini-Button.
10. Übersicht der sechs Vorlagen mit Lazy-Load oder Screenshots, nur eine live.
11. Zeichenzähler und Auto-Fit-Headlines (`clamp` plus `cqi`, `text-wrap: balance`, `hyphens: auto`).
12. Klick in der Vorschau springt zum passenden Feld (Shopify Preview Inspector).
13. Slot-Hinweise zu Format und Mindestauflösung.

### Später

14. Palette aus Porträt oder Logo vorschlagen (Squarespace "aus Bild"), aber nur als Hinweis auf die nächstliegende kuratierte Farbe.
15. Hell/Dunkel-Sektionsthemes pro Vorlage (Squarespace-Prinzip), wenn Vorlagen dunkle Sektionen bekommen.
16. Eigenes Mobilbild pro Slot (Shopify), nur falls Fokuspunkt nicht reicht.
17. Markensperre-Stufen: Team wählt, Makler sieht nur (Luxury-Presence-Prinzip), sobald Makler selbst Zugriff bekommen.
18. "Neu mischen" à la Canva Shuffle oder Durable "Generate brand".

---

## 9. Fünf UI-Ideen, die einfach und hochwertig wirken

1. **Die Marke als Leiste, die Vorlagen als Wand.** Oben eine schmale Markenleiste mit drei Chips: Farbe (Swatch), Schrift (Name des Maklers im Display-Schnitt), Logo (Miniatur). Darunter die sechs Vorlagen als ruhige Wand im 3 × 2-Raster, jede Kachel mit Namen aus `HM_LOOKS`. Wer einen Chip ändert, sieht alle sechs gleichzeitig umfärben, mit einer kurzen Überblendung von 200 ms. Das ist der Moment, der sich "wie Magie" anfühlt, und er ist technisch nur eine Nachricht an sechs iframes.
2. **Farbe wählen durch Überfahren.** Swatches in einer Reihe; Hover (oder langes Drücken am Tablet) zeigt die Farbe vorläufig in allen Vorlagen, Klick übernimmt, Verlassen kehrt zurück. Squarespace und Placester zeigen, dass Sofortvorschau Entscheidungen verkürzt; das vorläufige Anwenden spart zusätzlich den Rückweg.
3. **Specimen mit dem eigenen Namen.** Jede Schriftkarte zeigt "Anna Berger" groß in der Display-Schrift und die ersten zwei Zeilen ihrer Bio in der Textschrift. Kein "Aa", kein "Lorem ipsum". Die zwei Empfehlungen der Figur stehen vorn mit einem dezenten Hinweis "passt zu dir".
4. **Bildslots, die man direkt in der Vorschau befüllt.** In der Detailansicht einer Vorlage liegt unten eine Filmleiste mit allen Bildern aus der Mediathek. Ein Bild auf den Hero ziehen ersetzt ihn in dieser und allen anderen Vorlagen; der Fokuspunkt erscheint als kleiner Ring direkt auf dem Bild und lässt sich an Ort und Stelle schieben. Leere Slots zeigen die Tonfläche mit Monogramm und den Satz "Hier kommt dein Hero hin, quer, ab 2000 px".
5. **Geräteumschalter als physisches Objekt.** Drei Icons (Bildschirm, Tablet, Telefon) als Segmented Control; beim Wechsel schrumpft der Rahmen animiert auf die neue Breite, die Seite reflowt darin, der Maßstab steht klein daneben ("390 px, 80 %"). In der Sechser-Wand schaltet ein globaler Umschalter alle Kacheln gleichzeitig auf Telefon: der schnellste Weg, zu sehen, welche Vorlage mobil am besten trägt.

---

## Quellenliste (gesammelt)

- Shopify: https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings, https://shopify.dev/docs/api/liquid/objects/color_scheme_group, https://shopify.dev/docs/api/liquid/objects/color_scheme, https://shopify.dev/changelog/posts/color-palettes, https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor/color-settings, https://help.shopify.com/en/manual/online-store/images/theme-images, https://shopify.dev/docs/api/liquid/filters/placeholder_svg_tag, https://shopify.dev/docs/storefronts/themes/architecture/settings/fonts, https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor/features-overview, https://help.shopify.com/en/manual/online-store/themes/adding-themes, https://ajmalfarhan.in/insights/shopify-theme-editor-vs-live-preview, https://www.insiteful.com.au/shopify-color-schemes/
- Squarespace: https://support.squarespace.com/hc/en-us/articles/205815278-Changing-colors, https://support.squarespace.com/hc/en-us/articles/206545327-Choose-and-style-your-site-s-fonts, https://support.squarespace.com/hc/en-us/articles/205826028-Using-focal-points-to-center-images, https://www.websitebuilderexpert.com/website-builders/squarespace-blueprint-ai/, https://www.squareko.com/template-guide/squarespace-7-1-templates, https://www.bigcatcreative.com/blog/image-focal-point-squarespace
- Wix: https://support.wix.com/en/article/studio-editor-working-with-site-colors, https://support.wix.com/en/article/studio-editor-about-site-styles, https://support.wix.com/en/article/studio-editor-working-with-site-typography, https://support.wix.com/en/article/wix-editor-customizing-your-sites-theme-and-design, https://support.wix.com/en/article/wix-media-uploading-media-to-the-media-manager, https://support.wix.com/en/article/wix-pro-gallery-changing-the-focal-point-of-an-image-or-video
- Webflow: https://webflow.com/updates/variable-modes, https://help.webflow.com/hc/en-us/articles/33961268146323-Variables, https://help.webflow.com/hc/en-us/articles/33961300305811-Breakpoints-overview, https://help.webflow.com/hc/en-us/articles/33961330170643-Include-alt-text-on-images, https://www.calebraney.com/post/variable-modes-and-collections-in-webflow
- Framer: https://www.framer.com/academy/lessons/framer-fundamentals-themes, https://www.framer.com/updates/light-and-dark-mode, https://www.framer.com/academy/lessons/framer-fundamentals-breakpoints
- Canva: https://www.canva.com/help/apply-brand-kit-colors/, https://www.canva.com/help/brand-control/, https://www.canva.com/help/folder-brand-controls/
- Tokens Studio: https://docs.tokens.studio/manage-themes/themes-overview, https://documentation.tokens.studio/platform/features/themes/theme-groups-and-theme-options
- Material 3: https://m3.material.io/styles/color/roles, https://m3.material.io/styles/color/system/how-the-system-works
- Durable: https://www.toolify.ai/ai-news/durable-ai-website-builder-brand-asset-generation-tutorial-3383610, https://website-builders.cybernews.com/durable-ai-website-builder-review/
- Carrd: https://carrd.com/docs/building/using-mobile-view, https://carrd.com/docs/building/using-element-styles
- Jimdo: https://www.jimdo.com/de/magazin/anleitung-individuelle-website-gestalten/
- Immobilien: siehe Abschnitt 7
- CSS: https://moderncss.dev/container-query-units-and-fluid-typography/, https://dev.to/vishal_singh_0610/css-text-fit-responsive-headlines-without-javascript-font-sizing-loops-23ib

Hinweis zur Quellenlage: Lofty-, Luxury-Presence-Blog- und Webflow-Assets-Seiten waren beim Abruf gesperrt (HTTP 403); die Angaben dazu stammen aus Suchauszügen der jeweiligen Hilfeseiten. Für Propstack wurde keine eigene Baukasten-Dokumentation gefunden.
