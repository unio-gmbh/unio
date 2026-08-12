# UNIO E-Mail-Templates: Briefing

Verbindliche Vorgaben für alle UNIO-HTML-Mails (Transaktions-Mails, Updates, Newsletter, Kampagnen). Referenz-Umsetzung: `email/unio-email-template.html` (LENS-Wochen-Update). Neue Templates entstehen durch Austausch der Inhaltsblöcke, nicht durch neues Layout.

## 1. Grundprinzip

Die Mail ist die Website im Posteingang: Paper-Flächen, ein präziser Amber-Akzent, Mono-Datenlayer in Versalien, viel Ruhe. Eine Mail transportiert genau eine Botschaft und hat genau einen primären CTA. Technik ist Mittel für Menschen: Jede Mail endet bei einer Person, die erreichbar ist (Mensch-Block oder Reply-Hinweis).

## 2. Farben (fixe Hex-Werte, keine CSS-Variablen in Mails)

| Token | Hex | Verwendung |
|---|---|---|
| Paper | `#F7F5F1` | Karten-Hintergrund (Hauptfläche) |
| Paper-2 | `#F0EDE6` | Aussen-Hintergrund (Body) |
| Surface | `#FDFCFA` | Panels auf Paper (Datenpanel) |
| Hairline | `#E3DFD6` | Rahmen, Trennlinien auf Paper |
| Hairline innen | `#EDEAE2` | Zeilen-Trenner im Datenpanel |
| Ink | `#0B0A09` | Headlines, Primärtext, Footer-Fläche |
| Text gedämpft | `#5F5A54` | Fliesstext, Sekundäres |
| Mono gedämpft | `#8A857C` | Mono-Labels |
| Signal | `#FFAA09` | Button-Fläche, oranger Schlusspunkt. Nie für Text auf hellem Grund |
| Signal-Deep | `#B87400` | Amber als TEXT auf hellen Flächen (Kontrast) |
| On-Signal | `#1A1305` | Text auf Signal-Flächen (Button-Label) |

## 3. Typografie

- **Display:** `'Power Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif`. Power Grotesk kommt per `@font-face` (gehostete woff2 unter `/assets/fonts/`), greift nur in Clients wie Apple Mail; alle anderen sehen Helvetica. Beide müssen gut aussehen.
- **Mono (Datenlayer):** `'SF Mono','Segoe UI Mono','Courier New',monospace`, immer VERSALIEN, `letter-spacing` 1.5 bis 2.2px, 9.5 bis 11px.
- Grössen: H1 38px (mobil 30px), Zeilenhöhe 1.05, letter-spacing -1px, Gewicht 500 (nie Bold-700 für Headlines). Fliesstext 15 bis 16px / 1.6. Kicker über der H1 ist Mono-Versalien in Signal-Deep.
- Headlines im normalen Satz (Sentence case), oft mit **orangem Schlusspunkt**: `Wort<span style="color:#FFAA09;">.</span>`

## 4. Copy-Regeln (gelten wortgleich wie auf der Website)

- Durchgängig **Du**, auch für Bauträger und Endkunden. Statements ohne Anrede: kurz, deklarativ, mit Punkt.
- Kein Hype-Vokabular ("revolutionär", "seamless", "KI-powered"), keine Emojis, keine Ausrufezeichen, keine Garantien. Zahlen sind Arbeitswerte: Datenpanels bekommen die Fussnote `ARBEITSWERTE · STAND ...`.
- UNIO ist ein Betriebssystem, nie "Agentur", "Portal" oder "Software-Lösung".
- Wiederkehrende Motive nutzen statt neu erfinden: "Antwort in 48 h, mit Daten", "Du sprichst mit einem Menschen, nicht mit einem Funnel", Live-Motiv ("Du siehst alles. Live."), "Move as one." im Footer.
- Keine Geviert- oder Halbgeviertstriche in neuen Texten; stattdessen Doppelpunkt, Komma oder zwei Sätze. Trenner im Mono-Layer ist der Mittelpunkt `·`.
- Betreff: kurz, konkret, ohne Clickbait (z. B. "Dein Projekt, diese Woche"). Preheader ergänzt den Betreff, wiederholt ihn nicht.

## 5. Aufbau (Komponenten in fester Reihenfolge, Blöcke weglassbar)

1. **Preheader** (unsichtbar): 60 bis 90 Zeichen, mit `&zwnj;`-Auffüllung gegen Nachlauftext.
2. **Topbar:** Logo links (PNG! 76x19), rechts Mono-Label mit Mail-Typ und Zeitbezug (`LENS-UPDATE · KW 33`).
3. **Karte** (Paper, 1px Hairline, Radius 18): Kicker, H1 mit orangem Punkt, Subline (max. 440px breit).
4. **Datenpanel** (optional): Surface-Fläche, Radius 14, 2 bis 4 Zeilen Mono-Label links / Wert rechts, Zeilen durch Hairlines getrennt, darunter Arbeitswerte-Fussnote. Nie mehr als 4 Kennzahlen.
5. **CTA-Zeile:** genau EIN Signal-Button (Radius 12, Padding 15/30, Label in On-Signal, 2 bis 3 Wörter) plus optional ein Textlink mit Pfeil als Sekundäraktion.
6. **Bild** (optional): gehostetes JPG, Radius 14, darunter Mono-Caption (`PROJEKT · ORT · STATUS`). Nur echte Projekt- oder Team-Fotos, keine Stock-Bilder.
7. **Mensch-Block:** Avatar (rund, 46px), Name, Mono-Rolle, rechts "Antworte einfach auf diese Mail." Jede Mail hat eine antwortende Person.
8. **Footer** (Ink-Fläche, Radius 18): "Move as one." mit orangem Punkt, weisses Logo (PNG), Mono-Adresse, Links Impressum / Datenschutz / Abmelden (unterstrichen), Copyright-Zeile.

## 6. Technische Regeln

- **600px** Container, verschachtelte Tabellen (`role="presentation"`), alles Layout-Relevante **inline** gestylt. `<style>` nur für Fonts, Resets und die Mobile-Media-Query (Klassen `.container`, `.px`, `.hero-h1`, `.stack`).
- **Keine SVGs** (Gmail rendert sie nicht): Logos als PNG in 2-facher Auflösung, per `width`/`height`-Attribut auf Zielgrösse. Schwarz: `/assets/logo/unio-logo-black.png`, Weiss: `/assets/logo/unio-logo-white.png`.
- Alle Bilder mit **absoluten URLs** auf die Live-Domain (derzeit `https://unio-verse.vercel.app`, nach dem Umzug einmalig auf `https://www.unio.at` umstellen) und sinnvollem `alt`-Text.
- Buttons als Tabelle mit `bgcolor` auf dem `td` und Padding auf dem `<a>` (funktioniert inkl. Outlook ohne VML).
- `color-scheme: light` deklarieren; Flächenfarben immer explizit setzen, damit Dark-Mode-Clients nicht wild invertieren.
- Kein JavaScript, keine externen Stylesheets, keine Formulare, keine Videos (stattdessen verlinktes Standbild).
- Platzhalter für Versand-Variablen in doppelten geschweiften Klammern: `{{abmelde_link}}`, `{{vorname}}`. Vor jedem Testversand prüfen, dass keine übrig sind.
- Immer eine **Plain-Text-Alternative** mitsenden (multipart), Inhalt sinngleich.

## 7. Rechtliches

- Marketing-Mails: Abmelde-Link im Footer ist Pflicht (DSGVO/TKG), Impressums-Link ebenso. Transaktions-Mails (z. B. Lead-Bestätigung) brauchen keinen Abmelde-Link, behalten aber Impressum und Datenschutz.
- Absender: echte, antwortbare Adresse (kein noreply@), passend zum Routing circle@ / projects@ / office@unio.at.

## 8. Checkliste vor Versand

- [ ] Eine Botschaft, ein primärer CTA, orangefarbener Punkt gesetzt
- [ ] Du-Register, keine Emojis, keine Superlative ohne Zahl, Zahlen als Arbeitswerte gekennzeichnet
- [ ] Fallback-Ansicht ohne Power Grotesk geprüft (Helvetica)
- [ ] Bilder laden über die Live-Domain, alt-Texte gesetzt, Darstellung MIT blockierten Bildern geprüft
- [ ] Mobil (unter 640px) geprüft: Padding 20px, H1 30px, Spalten gestapelt
- [ ] Alle `{{platzhalter}}` ersetzt, Abmelde-Link funktioniert
- [ ] Testversand an Gmail (Web + App), Apple Mail und Outlook
