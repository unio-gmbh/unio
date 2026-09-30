# Chef-Briefs: Feed im Profilkopf, Reveal, Logo-Werkstatt v2

Stand 30.09.2026. Verfasst vom Chef der Etappe (Creative Director und Produktverantwortung). Drei Bauaufträge an drei Agenten, danach die strenge Prüfung von `wb-stand.jsx` und `wb-fragen2.jsx`. Grundlage: `branding-v2/BRANDING_PROZESS_V2.md`, `FRAGEN_WIRKUNG.md`, die Schritte 01, 03, 09, 10, 12, 13, 15, die Recherchen R6 und R8, `beweis/FEED_FINAL.md` (Kapitel 3, 5, 6, 8 bis 10) und `erlebnis/BRANDMARK_ANALYSE.md`. Beispielmakler Markus Leitner (id `markus`), Döbling, Zinshaus, Claim "Rat vor Auftrag.", Welt Weite (`ruhig`), Newsreader und Instrument Sans, Akzent Rat-Amber #B17834.

**Wie die Agenten arbeiten.** Jeder Agent baut genau eine Datei. Vor der Abgabe prüft ein zweiter Agent die Datei gegen diesen Brief (Muss-Liste, Qualitätsliste, Konventionen) und schickt Befunde zurück; der Chef entscheidet Streitfälle. Kein Agent ändert fremde Dateien. Die Integration (zwei Script-Tags, zwei Zeilen im Markenbuch) macht der Chef nach der Abnahme.

---

## 0. Feste Regeln für alle drei Aufträge

1. Deutsch, Sie gegenüber dem Makler, immer. `hmAnrede(mid, kanal)` ist die Anrede des Maklers gegenüber seinem Publikum und gilt nur für Captions, Bio und öffentliche Texte, nie für Texte der Werkbank an ihn. Keine Anrede Herr oder Frau und kein "Makler" oder "Maklerin" aus dem Vornamen geraten.
2. Nie U+2013 oder U+2014, auch nicht in Kommentaren. Keine Ausrufezeichen in sichtbaren Texten, keine Emojis.
3. Keine Eyebrows, keine Mono- oder Versalzeile über einer Headline, keine Textzeichen als Icons (nur `<Ico>` oder eigenes inline SVG mit 1,5 px Strich), keine Verläufe, kein Glow, keine Schatten als Effekt, keine gezeichneten Geräte mit Spiegelung. Echte `button` und `a`, Fokusrahmen sichtbar, Text mindestens 4,5 zu 1.
4. Keine erfundenen Zahlen, Namen, Kontonamen, Telefonnummern, Adressen oder Zitate. Fehlt etwas, steht eine ruhige, gesetzte Lücke in Satzform (kein Grau-Platzhalter, keine Schraffur, kein Warnsymbol). `hmWeltKontakt` liefert Platzhalter wie "+43 1 000 00 00" und darf in keinem der drei Module für sichtbare Kontaktdaten benutzt werden.
5. Kein fremdes Objektfoto: `hmWebObjekte()`, `hmWeltObjekte()`, Bilder mit `gruppe` "archiv" und KI-Bilder (`gruppe` "bildwelt", `ki: true`) sind nie Objekt, Porträt oder Ort des Maklers.
6. Konventionen der Werkbank: klassisches Skript ohne `import` und `export`, Hooks als `React.useState`, Präfix `hm`/`HM_`, Komponenten groß, am Ende `Object.assign(window, {...})`. CSS nur über eine Funktion am Dateianfang, die einmalig `<style id="stil-MODUL">` in `document.head` setzt, Klassen mit eigenem Präfix, Farben über `var(--ink)`, `var(--paper-2)`, `var(--surface-raised)`, `var(--hairline-dark)`, `var(--text-muted)`, `var(--signal-deep)`. Selbsttest ohne DOM-Seiteneffekte (ein unverbundenes Canvas zum Messen ist erlaubt, kein Einhängen in das Dokument, kein Schreiben in `hmStore`).
7. Höchstens etwa sieben Bedienelemente je Bereich (UX-Standard in `ui_kits/werkbank/CLAUDE.md`). Seltenes hinter "Details".
8. Kein node lokal: JSX von Hand prüfen, keine TypeScript-Syntax, keine optionalen Aufrufe auf nicht existierende Globale ohne `window.X`-Prüfung.

**Was es im Code noch nicht gibt** (geprüft am 30.09.2026 per grep): `hmAuftragDauer`, `hmDauerText`, `hmRolloutPlan`, `hmAttributAufloesen`, `hmVertragFalschListe`, `serieSignatur`, `HM_STROM_POOL`, `HM_IDEE_ACHSEN`, `marke2[mid].feed`, `marke2[mid].idee`. Jeder Auftrag nennt unten seinen Rückfall. Wo ein Rückfall eine Prozessregel nicht erfüllen kann, zeigt die Oberfläche das als Lücke und der Presenter oder das Team sieht den Grund.

**Integration durch den Chef nach Abnahme.**
- `index.html`: nach `<script type="text/babel" src="wb-fragen2.jsx">` zwei Tags `wb-feed2.jsx`, dann `wb-reveal.jsx`. Kein CSS in `index.html`.
- `wb-markenbuch.jsx`, Kapitel "start": `{window.FeedAbschnitt ? <FeedAbschnitt m={m} teamSicht={teamSicht} /> : (bisherige Wochenliste)}`, im Titelblock neben "Als PDF sichern": `{window.RevealKnopf && <RevealKnopf m={m} teamSicht={teamSicht} />}`.
- `wb-app.jsx` leitet `?ansicht=reveal` und `?ansicht=rueckmeldung` schon heute weiter (Zeile 77 bis 81); die Namen `RevealBuehne` und `Rueckmeldung` müssen exakt so heißen.

---

## 1. Auftrag A: `ui_kits/werkbank/wb-feed2.jsx`, Feed-Vorschlag im echten Profilkopf

### Ziel

Der Makler sieht sein Profil so, wie es nach Woche 1, 2, 3 und 4 aussieht: echter Profilkopf, die Startwoche angepinnt in der Anzeige [3, 2, 1], darunter der Strom mit dem neuesten Beitrag links oben, jede Kachel mit Caption in seiner Stimme. Dieselben Inhalte stehen im Gegenentwurf, nur der Grundton kehrt sich um. Es gibt kein fremdes Objekt, keinen Fülltext, und jede Lücke ist ehrlich sichtbar (13_feed 3.3, 3.9, 3.10, 3.11, 3.14; FEED_FINAL 5 und 6).

### API (genau so)

```text
hmFeed12(mid, variante = "empfehlung", opt)            // variante: "empfehlung" | "gegenentwurf"
  opt (nur für Tests und Team): { plattform, einwilligung4, bilder, live }
  -> { mid, variante, welt, b,
       achse: { name: "tonwert", pole: ["papier","dunkel"], satz },
       posts: [12]            // Veröffentlichungsfolge, neuester zuerst: posts[0].nr === 12, posts[11].nr === 1
       profil: { name, konto, zeile, bio: [3], highlights: [3], angepinnt: [3,2,1], profilbild: { url, luecke } },
       wochen: [{ woche, datum, zeilen: [[nr,nr,nr], ...] }],
       pruefung: [{ name, ok, detail }], luecken: [{ was, wer, feld }] }

post = { id: "f"+nr, nr, woche, platz (1 Signatur, 2 Gesicht, 3 Sache), datum (ISO oder null), angepinnt,
         serie: { name, folge }, saeule, format: "reel"|"karussell"|"post",
         art: "serie"|"hook"|"zitat"|"zahl"|"objekt", text (Text im Bild), unter,
         gesicht, gegenton, ton (WeltPost-Ton), beleg: { ref, text, status, sichtbar } | null,
         captionTeile: { hook, einloesung, beleg, weitergeben }, caption (Anrede aufgelöst),
         seiten: [] (nur Karussell), luecke: null | { art: "objekt"|"bild"|"text", satz, ersatz: { titel } },
         herkunft: [{ teil, feld }], daten (fertige Daten für WeltPost) }

FeedProfil({ m, variante = "empfehlung", woche = 4, onWoche, breite = 390, onBeitrag, teamSicht })
FeedBeitrag({ m, post, variante, zu })
FeedVergleich({ m })
FeedAbschnitt({ m, teamSicht })
hmSelbsttestFeed2()
Object.assign(window, { hmFeed12, FeedProfil, FeedBeitrag, FeedVergleich, FeedAbschnitt, hmSelbsttestFeed2, HM_FEED2_TAKT })
```

### Muss

1. **Quelle der Inhalte in fester Reihenfolge.** Liegen zwölf Einträge in `hmStore.get("marke2")[mid].feed.kacheln`, werden sie unverändert übernommen. Sonst Regelpfad aus `hmMbPlattform(mid)`: `start30` (vier Wochen), `saeulen[].serie` (`name`, `beispiele[].titel`, `.hook`, `.skizze`), `beweise`, `botschaften.claim`, `positionierung`. Nie `HM_WELT_HOOKS`, nie `hmWeltFeedPosts`, nie die Vorgaben aus `hmWeltPostDaten` ("[Zahl]", Zitat gleich Claim, Demo-Objekte).
2. **Wochentakt `HM_FEED2_TAKT`** (12_social 3.7, 13_feed 3.13): Platz 1 Signatur, Platz 2 Nutzen mit Gesicht, Platz 3 Sache ohne Gesicht. Signatur-Serie ist die Serie der Säule, die in `start30` am häufigsten vorkommt (Gleichstand: `saeulen[0]`). Woche 1: Folge 1 Staffelplakat der Signatur (Gesicht, nah, `art` "serie", Text im Bild der Serienname), Folge 2 Signatur 01 (Gesicht), Folge 3 Sache. Woche 2 bis 4: Platz 1 nächste Signatur-Folge (Reel, Gesicht), Platz 2 nächster `start30`-Beitrag mit Gesichtsformat (talking, qa, spaziergang, behind ergeben `reel`), Platz 3 nächster Beitrag ohne Gesicht (carousel, walkthrough ergeben `karussell`, sonst `post`). Fehlt Stoff, bleibt der Platz eine Lücke der Art "text" mit Rolle, nie ein erfundener Titel.
3. **Grammatik**: Gesicht genau auf Platz 1 und 2 jeder Woche, also 8 von 12 und höchstens zwei je Zeile. Gegenton nur auf dem Sachplatz von Folge 6 und 12 (Periode 6). Pin-Kacheln (Folge 1 bis 3) sind nie Gegenton und nie textgeführt. `hmFeed12` rechnet diese Regeln in `pruefung` mit Detailtext.
4. **Daten und Tage**: Live-Tag aus `hmStore.get("auftrag")[mid].termine.live`, sonst `hmStandTermine(m).live`, sonst `null` (Lücke "Live-Tag folgt"). Woche 1 erscheint vollständig am Live-Tag (13_feed 3.3), ab Woche 2 Dienstag, Donnerstag, Samstag; fällt ein Tag auf `HM_FEIERTAGE`, der nächste Werktag (bei Dienstag der Mittwoch, wie F7 in 13_feed).
5. **Belege**: Nur Einträge aus `plattform.beweise`, deren `beleg` eine Zahl mit Einheit enthält (Wochen, Monate, Jahre, Prozent). Der Text im Bild übernimmt die Zahl mit Einheit wörtlich aus dem Beleg (Regex-Treffer, keine Rundung, keine Umrechnung). Kaufpreise (Euro, "Mio.") zählen nie. Verteilung: je Woche ab Woche 2 höchstens ein sichtbarer Beleg, jeder Beleg höchstens einmal in der Pin-Reihe. `status` "selbstauskunft", solange `quelle` "prüfen" oder "Selbstauskunft" enthält; dann steht im geöffneten Beitrag in Lesegröße: "Diese Zahl prüfen wir vor dem Live-Tag mit Ihren Unterlagen." Zeile ohne sichtbaren Beleg ergibt eine Meldung in `pruefung`, keine Sperre.
6. **Eigene Objekte**: Folge 12 ist Wechselplatz der Objekt-Serie. Ein Objektbild erscheint nur, wenn `hmEinwilligung(mid, 4) === "ja"` und `hmBildBibliothek(mid)` ein Bild mit `gruppe` "eigen" (nicht `ki`, nicht "archiv") liefert. Sonst Lückenkachel in der Form der Vorlage: Text "Hier kommt Ihr erstes Objekt.", Unterzeile leer, Folio und Name wie jede Kachel. Geöffnet steht darunter: "Bis dahin erscheint an diesem Samstag: [Titel des Ersatzes]." Ersatz ist der nächste unbenutzte Sache-Beitrag aus `start30` oder aus den Serienbeispielen; fehlt auch der, ist der Ersatz eine Lücke mit Satz an das Team.
7. **Captions** (13_feed 3.8): `hook` aus `beispiele[].hook` oder Titel, höchstens 90 Zeichen; `einloesung` aus `beispiele[].skizze`, sonst Lücke "[Einlösung in zwei bis vier Sätzen, schreibt das Team]"; `beleg` wörtlich; `weitergeben` aus `serie.weitergeben`, sonst Lücke "[Satz zum Weitergeben an eine benannte Person]". Anrede über `hmAnrede(mid, "instagram")`, Paar-Syntax `{Sie|du}` wird erst beim Rendern aufgelöst. Keine Hashtags außer höchstens dem Seriennamen. Sprachprüfung: kein "!", keine U+2013 oder U+2014, nicht "Link in Bio", "Folgen Sie", "Schreiben Sie mir". Lücken erscheinen im Makler-Blick als ein ruhiger Satz ("Diesen Teil schreiben wir mit Ihnen vor dem Live-Tag."), im Team-Blick mit Arbeitsauftrag.
8. **Text im Bild** höchstens acht Wörter (FEED_FINAL E15: jede Zahl ist ein Wort, Folio zählt nicht). Längere Texte werden nie gekürzt; `pruefung` meldet sie mit Wortzahl.
9. **Profilkopf** (13_feed 3.9, FEED_FINAL 6): Profilbild ist das Porträt aus `b.portrait`, 1:1, `object-position: 50% 18%`; fehlt es, eine Lücke im Kreis mit dem Satz "Porträt aus dem Porträt-Termin" (kein Monogramm, keine Initialen, kein Logo). Anzeigename `m.name`. Kontoname nur aus `marke2[mid].vorab.fakten.kanaele`, sonst `konto: null` und Lücke "Kontoname folgt"; nie `vor.nach.immo` wie in `WeltProfilKopf`. `zeile` neutral "Immobilien, [Bezirk aus m.region ohne Postleitzahl]". Bio drei Zeilen: Einträge aus `stimme.beispiele` mit `wo` "Bio", sonst Zeile 1 `positionierung.was`, Zeile 2 "Für " plus `positionierung.fuerWen`, Zeile 3 der Claim; jede Zeile höchstens 60 Zeichen, zusammen höchstens 150, sonst Lücke. Highlights: die drei Serien mit den meisten Beiträgen, Name in ein bis zwei Wörtern, Titelbild als Ausschnitt einer Kachel dieser Serie (WeltPost vergrößert im 64-px-Kreis), nie Symbol. Angepinnte Kacheln tragen oben rechts ein kleines inline-SVG (1,5 px Strich), keine Nachbildung einer Plattformmarke.
10. **Wochenregler**: Segmentsteuerung mit vier echten Knöpfen "Woche 1" bis "Woche 4", darunter kleiner das Datum. Woche 1 zeigt die Pin-Reihe allein. Beim Wechsel erscheint nur die neue Zeile (240 ms Einblendung, bei `prefers-reduced-motion` keine). Nie ein angebrochenes Raster.
11. **Gegenentwurf** (Chef-Entscheidung): Achse ist der Grundton (`tonwert`), in derselben Welt. Alle Kacheln mit Ton "grund" werden "dunkel", die Gegenton-Kacheln werden "hell"; Texte, Bilder, Belege, Plätze, Captions und Folio bleiben gleich. Begründung in genau einem Satz, gespeichert in `achse.satz`: "Dieselben zwölf Beiträge auf dunklem Grund: nur der Grundton wechselt, damit Sie allein die Wirkung der Form vergleichen." Liegt `marke2[mid].idee.gezeigt.achse` vor und ist sie nicht `tonwert`, zeigt die Team-Sicht den Hinweis "Achse [Name] kann der Renderer noch nicht, gezeigt wird der Grundton." **Verworfen**: die zweitbeste Welt aus `hmWeltVorschlag(...).rangfolge`. Eine andere Welt bringt ein anderes Zeichen, und die Zeichenform ist nach 09_idee 3.6 nie Achse, sonst vergleicht der Makler Identitäten statt Formen.
12. **FeedBeitrag** öffnet als `Sheet` (am Telefon voll): der Beitrag in 4:5 (WeltPost 1080 x 1350), bei Karussell Seite 1 und die vorhandenen Folgeseiten, geblättert mit echten Knöpfen und Pfeiltasten; fehlende Folgeseiten erscheinen als eine Zeile "Weitere Seiten schreiben wir nach Ihrer Rückmeldung." Reel: Titelbild und der Satz "Das Reel drehen wir am Drehtag." Darunter die Caption in 17 px, Zeilenabstand 1,5, höchstens 60 Zeichen je Zeile. Team-Sicht zusätzlich: Herkunft je Teil, Prüfbefunde der Kachel, Lücken mit Arbeitsauftrag.
13. **FeedVergleich**: Umschalter "Empfehlung", "Gegenentwurf", "Nebeneinander"; Empfehlung vorgewählt und als "Unsere Empfehlung" benannt; der Satz der Achse steht unter "Gegenentwurf". Woche und geöffneter Beitrag bleiben beim Umschalten stehen. Nebeneinander: zwei FeedProfil mit `min(390, (Breite minus 24) / 2)`, unter 820 px untereinander.
14. **FeedAbschnitt** für das Markenbuch: Überschrift "Ihr Feed in den ersten vier Wochen", ein Absatz ("Zwölf Beiträge in der Reihenfolge, in der sie erscheinen. Die erste Woche geht am Live-Tag vollständig online."), dann FeedVergleich. Nur in der Team-Sicht darunter: Prüfliste und Lücken mit `wer` und `feld`. Container trägt `data-material="vorschau|feed-woche-4|1080"`.
15. **Performance**: `hmFeed12` per `React.useMemo` über `mid`, `variante` und eine Signatur aus `plattformen`, `marke2`, `branding`, `portraits`, `auftrag`. Abonnieren mit `useHm` auf genau diese Schlüssel.
16. **Selbsttest `hmSelbsttestFeed2()`** mit mindestens: zwölf Posts, `posts[0].nr === 12`; vier Wochen je drei; `angepinnt` gleich [3, 2, 1]; Gesicht 8 von 12 und höchstens 2 je Woche; Gegenton nur Folge 6 und 12; keine Pin-Kachel Gegenton; Gegenentwurf mit identischen Texten, Captions und Serien, nur `ton` anders; kein Bild aus `hmWeltObjekte()` oder `assets/img/`; mit `opt.einwilligung4` "nein" und mit "ja" ohne eigenes Bild ist Folge 12 eine Lücke; alle Texte ohne "!" und ohne U+2013/U+2014; Bio höchstens 150 Zeichen und drei Zeilen; `profil.konto` ist ohne Quelle `null`; jede Beleg-Zahl im Text im Bild kommt wörtlich im Beleg vor; Anrede "Sie" löst `{Sie|du}` zu "Sie" auf.

### Qualität

- Telefonspalte in realer Breite auf `var(--paper-2)`, ohne gezeichnetes Gerät, ohne Schatten; Raster drei Spalten, 3:4-Fenster (`WeltPost format="3:4"`), Fuge 2 px bei 390.
- Profilkopf ruhig und typografisch: Name 15/20 in 600, Zeile 13 px in `var(--text-muted)`, Bio 14/20, Kontrast mindestens 4,5 zu 1.
- Keine Eyebrow über dem Wochenregler; Kennungen stehen nur als Folio in den Kacheln.
- Lücken lesen sich wie ein Satz an ihn, nie wie ein Fehler.
- 375 px Breite ohne horizontales Scrollen; Tastatur: Pfeiltasten im Beitrag, Escape schließt, Tab erreicht jede Kachel (Kachel ist ein `button` mit `aria-label` aus Serie, Folge und Text).
- Gegenprüfung durch den Prüf-Agenten: Fünf-Sekunden-Blick auf Woche 4 mit verdeckter Bio. Man muss sehen: für wen, wofür, wo, und zweimal je Zeile ein Gesicht.

---

## 2. Auftrag B: `ui_kits/werkbank/wb-reveal.jsx`, Reveal in zehn Akten und Rückmeldung

### Ziel

Heute zeigen, morgen urteilen, am Vertrag (15_reveal 3.1). Eine Vollbild-Bühne ohne Bedienelemente, die das Team live führt, mit Presenter im zweiten Fenster. Reihenfolge: seine Worte, Einsicht, Vertrag, Weg und Idee, Empfehlung in Anwendung, Gegenentwurf im selben Kontext, Schrift, Farbe, Wortmarke und zuletzt das Zeichen, Fragen, neutraler Abschluss. Am Folgetag die Rückmeldung je Kriterium, dann die Wahl ohne Vorauswahl.

### API (genau so)

```text
hmRevealFolien(mid, opt) -> { folien: [...], hinweise: [{ akt, text }], bereit: [{ name, ok, detail }] }
  folie = { id, akt (0 bis 9), unter ("5b"), titel (nur Presenter), notiz (Sprechzettel), minuten,
            fassung: "neutral"|"empfehlung"|"gegenentwurf"|"geteilt", art, daten,
            begruendung: { satz, kriterium } | null }
RevealBuehne({ m, presenter, onClose })
RevealKnopf({ m, teamSicht })
Rueckmeldung({ m, allein })
RueckmeldungStand({ m })
hmRevealStand(mid), hmRueckmeldungSpeichern(mid, patch), hmRevealNachricht(typ, wert, von)
hmSelbsttestReveal()
Object.assign(window, { hmRevealFolien, RevealBuehne, RevealKnopf, Rueckmeldung, RueckmeldungStand, hmRevealStand, hmRueckmeldungSpeichern, hmSelbsttestReveal })
```

**Ablage.**
- `hmStore "reveal"` = `{ [mid]: { gestartet, am, folie, fragen: [{ id, text, folie, zeit }], zitateFreigabe: { [satz]: datum }, achseBeruehrt: [index], saetze: { empfehlung, gegenentwurf } } }`. **`am` wird erst gesetzt, wenn Akt 9 zum ersten Mal erscheint**, weil `wb-stand.jsx` `rev.am` als "Präsentation erledigt" liest und damit die Rückmeldung freischaltet.
- `hmStore "rueckmeldung"` = `{ [mid]: { runde: 1, offenAb, gestartet, teil1: { [i]: { urteil: "trifft"|"teilweise"|"nicht", fassung: "papier"|"gleich"|"dunkel", stelle } }, falsch: { [i]: { wert: "trifft"|"nicht", stelle } }, wahl: "empfehlung"|"gegenentwurf"|null, sendung: { name, keinerPasst, satz }, pins: [{ id, ort: { ansicht, fassung, feld }, text, art: "beobachtung"|"frage"|"aenderung", team: { grund, entscheidung, zielschritt } }], teilnehmer: [], dauerSek, abgeschickt } }`. Der Schlüssel `abgeschickt` ist fest, `wb-stand.jsx` liest ihn.

### Die zehn Akte (15_reveal 3.4), Inhalt, Quelle, Rückfall

| Akt | Minuten | Folie(n) | Quelle | Rückfall, wenn Stoff fehlt |
|---|---|---|---|---|
| 0 Rahmen | 2 | "Heute zeigen wir. Morgen entscheiden Sie." Darunter Stufe C: Ende des Termins (nur mit Uhrzeit), Datum und Dauer der Rückmeldung ("etwa 15 Minuten") | `auftrag.termine`, `hmStandTermine(m)` | ohne Uhrzeit entfällt die Endzeile; Notiz: Aufzeichnung nur, wenn `hmEinwilligung(mid, 5) === "ja"` und alle Anwesenden zustimmen |
| 1 Seine Worte | 3 | drei Sätze, je einer auf einer Fläche, darunter Stufe C "Ihr Workshop am ..." | `plattform.einsicht.stuetzen` (falls vorhanden), `meetings[]` mit `maklerId` (Felder `zitate`, Zeilen der `transkript` mit seinem Vornamen als Sprecher) | nur Sätze, die in `reveal.zitateFreigabe` stehen (das Team hält dort die Freigabe fest, die der Makler am Workshop-Ende gegeben hat). Regel Q3: ganzer Satz, mindestens sechs Wörter, beginnt nicht mit "Dass", "Weil", "Wenn", "Ob", "Als", keine Zahl als Hauptinhalt, keine reine Ortsangabe. Weniger als drei: die Folie entfällt, der Presenter zeigt "Akt 1 entfällt: weniger als drei freigegebene Sätze." Nie ein Mustersatz |
| 2 Einsicht | 3 | `einsicht.spannung`, dann `einsicht.weisseStelle` in Stufe A und B | `hmMbPlattform` | fehlt ein Feld, entfällt diese Fläche; Notiz enthält den unbequemen Teil (`einsicht.unbequem`, sonst `einsicht.konvention`) zum Aussprechen |
| 3 Vertrag | 3 | `positionierung.satz`, bis fünf Attribute mit "heißt" und "heißt nicht", Zeile "Bestätigt am ..., Version ..." | `persoenlichkeit[]` (`wort`, `heisst`, `heisstNicht`), Version über `hmQuelle(mid)` | ohne Bestätigung steht "Noch nicht bestätigt." als Lücke, der Presenter warnt |
| 4 Weg und Idee | 5 | 4b zwei Richtungen, eine blieb (`strategien[mid].wege.a/b.leitidee`, `gewaehlt`); 4c verworfene Logo-Entwürfe aus `logos[mid].merk` ohne den übernommenen, klein mit `LogoKonzept`; 4d Belege gezählt mit Prüfstatus aus `plattform.beweise`; 4e Claim groß über dem Porträt, darunter `welt.idee` | wie genannt | 4a (Einsichts-Kandidaten) nur, wenn vorhanden; ohne Porträt steht 4e auf dem Bühnengrund ohne Bild |
| 5 Empfehlung in Anwendung | 15 | 5a Strom; 5b `FeedProfil` Woche 1 bis 4; 5c drei geöffnete Beiträge (`FeedBeitrag` der Pin-Reihe); 5d Karte (`WeltKarte` vorn und hinten), Signatur (`WeltSignatur`), Website-Kopf | `window.FeedProfil`, `hmFeed12` | 5a entfällt, solange `HM_STROM_POOL` fehlt ("Strom nicht startbar: Lizenz des Bildpools fehlt."). Ohne `window.FeedProfil` sauber auf `WeltFeed` mit den Serienbeispielen der Plattform, Hinweis im Presenter |
| 6 Gegenentwurf | 10 | 6a Satz zur Achse (`hmFeed12(mid,"gegenentwurf").achse.satz`); 6c `FeedProfil` Gegenentwurf Woche 4; 6d dieselben drei Beiträge; 6f `FeedVergleich` nebeneinander | Auftrag A | 6b entfällt wie 5a; 6e (zweite Karte) nur, wenn eine Karte der zweiten Fassung existiert, sonst Hinweis im Presenter |
| 7 Schrift, Farbe, Wortmarke, Zeichen | 4 | Schrift an drei Proben (Claim, Kennzahl, Fließtext); Farbe mit Rollen und Anteil (`hmWeltFarben`, `welt.proportion`); Wortmarke (`BrandLogo` bzw. `LogoKonzept`); **zuletzt** das Zeichen groß (`WeltZeichen`, `welt.zeichen.satz`). Bei Achse Grundton jede Fläche geteilt, Papier links, dunkel rechts | `b`, `welt` | keine |
| 8 Fragen | 10 | die geteilte Zeichen-Fläche bleibt stehen | Presenter: "Frage notieren" | keine |
| 9 Abschluss | 2 | neutraler Grund: "Morgen entscheiden Sie." Darunter Datum, Uhrzeit und Dauer der Rückmeldung und ein Satz, was danach passiert. Kein Logo, keine Fassung | `auftrag.termine` | ohne Uhrzeit nur das Datum |

Begründung je Ansicht in den Akten 4 bis 7 (15_reveal 3.8): genau ein Satz mit höchstens 20 Wörtern, nie mit "Aus Ihrem Vertrag" begonnen, zwei aufeinanderfolgende Sätze nie mit demselben Wort; das Kriterium steht als Name in Stufe C darunter. Ohne Quelle für den Satz steht nur im Presenter "Begründung fehlt", die Bühne bleibt ohne Satz. Sperrliste im Sprechzettel sichtbar: "Gefällt es Ihnen?", "Wie finden Sie das?", "Was sagen Sie?", "Mögen Sie ...", "Wir haben uns gedacht ...", "Das ist nur ein Vorschlag", "Das können wir jederzeit ändern".

### Muss

1. **Bühne**: Portal an `document.body`, `position: fixed; inset: 0`, eigener Z-Index. Fläche 1920 x 1080, per `transform: scale()` eingepasst, Rest im Bühnengrund. Keine Knöpfe, keine Seitenzahl, keine Fortschrittsleiste. Tasten: Pfeil rechts und Leertaste weiter, Pfeil links zurück, Escape ruft `onClose`. Mauszeiger verschwindet nach zwei Sekunden ohne Bewegung. Harter Schnitt zwischen Akten, 300 ms Überblendung innerhalb eines Akts, bei `prefers-reduced-motion` keine.
2. **Bühnensatz für Akt 0 bis 4 und 9** (15_reveal 3.7): zwölf Spalten, links 160 px, rechts zwei Spalten, oben 120 px, Grundlinienraster 8 px, linksbündig. Stufe A 88/96 px, Laufweite minus 0,01 em, höchstens drei Zeilen, Grundlinie der ersten Zeile bei 58 Prozent der Höhe; Stufe B 40/52; Stufe C 22/32, immer unter dem, wozu sie gehört. Schrift Power Grotesk in einem Schnitt, keine Mono. Grund `oklch(0.94 0 0)`, Text `oklch(0.20 0 0)`. Ab Akt 5 liegt jede Fassung auf ihrem eigenen Grund, die geteilte Bühne ist halb und halb, Akt 9 kehrt zum unbunten Grund zurück.
3. **Presenter** (`presenter` wahr, geöffnet über `?ansicht=reveal&presenter=1&makler=ID`): aktuelle Folie groß, nächste Folie klein, Sprechzettel in 20 px, Restzeit des Akts und Gesamtzeit, echte Knöpfe Zurück und Weiter, Wochenregler 1 bis 4 (nur Akt 5 und 6), Umschalter der Fassung (nur Akt 5 bis 8), Feld "Frage notieren" mit Speichern (schreibt `reveal.fragen`), Liste der Hinweise (entfallene Folien, Lücken, Bereitschaft). Der Presenter ist ein normales Fenster, keine Vollbild-Bühne.
4. **Synchronisation**: `BroadcastChannel("wb-reveal-" + mid)`, Nachrichten aus `hmRevealNachricht(typ, wert, von)` mit `typ` "folie", "woche", "fassung", "schluss" und einer Fenster-ID `von`, damit kein Echo entsteht; die letzte Nachricht gewinnt. Ohne BroadcastChannel Rückfall über `hmStore "reveal".folie` und `useHm("reveal")`.
5. **Bereitschaft** (`bereit` in `hmRevealFolien`): Gate 2 (`hmMbStand(mid).status === "freigegeben"`), Porträt vorhanden, Feed-Prüfung ohne rote Pflichtregel, drei freigegebene Sätze für Akt 1, Strom-Pool, Schriften geladen (`document.fonts.load` für Power Grotesk und `b.schrift.d`/`.t`, Status "bereit" erst danach). Fehlt etwas, startet RevealKnopf nur als "Probe starten", nie als Termin.
6. **RevealKnopf** (für das Markenbuch): "Reveal starten" (Vollbild über `requestFullscreen` im Klick, dann Bühne), "Presenter öffnen" (`window.open` mit der URL oben), "Link zur Rückmeldung kopieren" (`KopierKnopf`, absolute URL `?ansicht=rueckmeldung&makler=ID`), darunter die Bereitschaft als kurze Zeilen mit SVG-Haken oder Lücke. Nur Team-Sicht, hinter "Details": drei Kandidatensätze für Akt 1 mit Schalter "Im Workshop öffentlich bestätigt" (schreibt `zitateFreigabe` mit Datum und `hmEvent`), Auswahl von höchstens drei Attributen, die die Achse berühren (`achseBeruehrt`), zwei Felder "Zwei Sätze zur Empfehlung" und "Zwei Sätze zum Gegenentwurf" (`saetze`).
7. **Rückmeldung** (15_reveal 3.9), Link-Ansicht wenn `allein`:
   - Vor `offenAb` (`reveal.am` plus 24 Stunden): "Ihre Rückmeldung öffnet am [Datum] um [Uhrzeit]." und nichts sonst.
   - Kopf: "Ihre Rückmeldung. Etwa 15 Minuten. Zwei Runden sind enthalten, genutzt: [Zahl]." Zahl aus `window.hmRundenGenutzt` falls vorhanden, sonst 0. Darunter die Nachlese: beide Fassungen als `FeedProfil` Woche 4, umschaltbar, in der Reihenfolge des Termins. Mitentscheider mit "entscheidet ja" in `auftrag.entscheider.mit`: "Beantworten Sie das gemeinsam mit [Rolle]." (Rolle, nie ein Name). Fortschritt nur als Text "Teil 1 von 4".
   - Teil 1: Attribute über `window.hmAttributAufloesen`, sonst Rückfall `plattform.persoenlichkeit[]` (Name, "heißt", "heißt nicht"). Je Attribut drei gleichrangige Knöpfe "Trifft", "Trifft teilweise", "Trifft nicht", nichts vorgewählt; bei teilweise oder nicht "Zeigen Sie uns die Stelle." mit Auswahl der Ansicht (Feed, Profil, Karte, Wortmarke, Zeichen, Farbe, Schrift). Für Attribute in `achseBeruehrt` zweite Zeile "Welche Fassung trifft es besser?" mit "Eher Papier", "Beide gleich", "Eher dunkel". Sechster Punkt "Was falsch wäre": Liste aus `window.hmVertragFalschListe`, sonst `werte[].nie`, je "Nein" oder "Ja, hier".
   - Teil 2: zwei Telefone nebeneinander (unter 820 px untereinander), darüber sein Urteil aus Teil 1 in einem Satz, sofern `achseBeruehrt` gesetzt ist. Zwei gleichrangige Knöpfe "Diese Fassung wählen", nichts vorgewählt, kein Feld für ein Warum. Unter der Empfehlung "Unsere Empfehlung" und `saetze.empfehlung`, unter dem Gegenentwurf `saetze.gegenentwurf`; sind sie leer, sieht der Makler dort nichts, das Team sieht die Lücke in RueckmeldungStand.
   - Teil 3: "Wie soll Ihre Sendung heißen?" mit zwei Namen aus `marke2[mid].serieSignatur.namen`. Gibt es keine zwei Namen, steht nur: "Den Namen Ihrer Sendung zeigen wir Ihnen mit der nächsten Runde. Bis dahin arbeiten wir mit [Serienname der Signatur aus Auftrag A]." Darunter klein "Keiner passt." als Pin der Art Änderung mit einem Satz.
   - Teil 4: "Noch etwas?" freie Anmerkungen mit Ansicht, Text und Einordnung "Das fällt mir auf", "Das frage ich", "Das soll anders sein"; ohne Einordnung nicht speicherbar, nichts vorgewählt.
   - Ende: "Danke. Ihre Fragen beantworten wir bis [Datum]. Änderungen zeigen wir Ihnen bis [Datum] in Ihrer Freigabe." Kein Logo einer Fassung. Jede Eingabe speichert sofort, sichtbar als "Gespeichert"; "Abschicken" mit Bestätigung setzt `abgeschickt` und `dauerSek`, danach nur Lesen.
8. **RueckmeldungStand** (Team): Stand (offen ab, begonnen, abgeschickt, Dauer), Urteil je Attribut mit Fassung, Hinweis "Wahl gegen Urteil", Hinweis "Unter 90 Sekunden und überall trifft: kurz anrufen und fragen, ob alles gesehen wurde.", Sendung, Pins nach Art gruppiert mit Vorschlag für den Zielschritt nach der Tabelle in 15_reveal 3.9 (Präfix von `ort.feld`), bei Änderungen Auswahl `grund` (Spielraum, Tatsache, Wahl, Außerhalb) und `entscheidung`; "zählt als Runde" genau dann, wenn Außerhalb und umsetzen. Fragen aus dem Termin (`reveal.fragen`) mit Antwortfeld.
9. **Selbsttest `hmSelbsttestReveal()`** mit mindestens: Akte aufsteigend 0 bis 9; die Zeichen-Folie ist die letzte Inhaltsfolie vor Akt 8 und steht nach Schrift, Farbe und Wortmarke; alle Gegenentwurf-Folien nach allen Empfehlungs-Folien; Akt 9 hat `fassung` "neutral" und kein Logo; Satzregel Akt 1 lehnt "Dass sie sich nie gedrängt gefühlt haben." und einen Satz mit fünf Wörtern ab und nimmt einen freigegebenen ganzen Satz mit sechs Wörtern an; ohne Freigaben entfällt Akt 1 und ein Hinweis existiert; kein sichtbarer Text enthält "Gefällt", "Wie finden Sie", "!" oder U+2013/U+2014; Rückmeldung startet ohne jede Vorauswahl; `offenAb` ist genau 24 Stunden nach `am`; `hmRevealNachricht` liefert `{ typ, wert, von, zeit }`.

### Qualität

- Bühne wie ein gesetztes Buch: eine Aussage je Fläche, weite Ränder, das Raster trägt und wird nicht gezeigt. Keine Werkbank-Oberfläche auf der Bühne.
- Presenter in zehn Sekunden verständlich: wo bin ich, was kommt, was sage ich, wie viel Zeit bleibt.
- Anwendungen flach und ehrlich: Montage auf eigenen Fotos ist in der Bildunterschrift als "Montage" gekennzeichnet, keine gekauften Mockups.
- Rückmeldung am Telefon mit einer Hand bedienbar: Knöpfe mindestens 48 px hoch, gleiche Breite, keiner gefüllt, Kontrast mindestens 4,5 zu 1.
- Gegenprüfung durch den Prüf-Agenten: den Reveal einmal mit Markus als Probe durchklicken und jede Folie gegen die Tabelle oben halten. Bei Markus entfällt Akt 1 heute zu Recht (der einzige Workshop-Satz beginnt mit "Dass").

---

## 3. Auftrag C: `ui_kits/werkbank/wb-logo.jsx`, Logo-Werkstatt v2

### Ziel

Brandmark liefert Tempo durch Messen, Variieren und Ausleiten. Das übernehmen wir, den Katalog nicht (BRANDMARK_ANALYSE, "kopieren" und "nicht"; 10_system A2; Prozess v2 C5). Zeichen kommen nur aus Idee, Welt und den Wörtern der Marke, Schriften aus dem kuratierten Pool, Farben aus dem Branding. Neu sind: Stichworte der Marke als Steuerung, mehr Anordnungen und Zeichen aus der Idee, eine Ideen-Leiste mit Geschwistern je Achse, ein Feineditor mit Sperrgrenzen, der Prüfstand "Faustregeln", Farbfassungen, ein Logo-Paket als ZIP mit Anwendungsseite und Anwendungen auf Karte, Website, Schild, Signatur und Instagram-Profil.

### API

Alle vorhandenen öffentlichen Namen bleiben mit ihrem Verhalten: `HM_LK_SCHRIFTEN`, `HM_LK_ARTEN`, `hmLkKonzepte`, `hmLkLayout`, `hmLkSvgText`, `hmLkSvgPfade`, `hmLkLaden`, `LogoKonzept`, `LogoImEinsatz`, `LogoWerkstatt`, `LogoBewertung`, `hmSelbsttestLogo`, `hmLkProfilSpec`. Alte Specs im Store rendern unverändert (fehlende neue Felder haben Standardwerte). Neu:

```text
HM_LK_WORT_ZEICHEN   // [{ muster: RegExp, zeichen: [...], wort }], geschlossene Tabelle
HM_LK_GRENZEN        // Sperrgrenzen je Art: laufweite [min,max], verhaeltnis [0.8,1.6], zelle [0.62,0.9]
HM_LK_FASSUNGEN      // positiv, negativ, akzent, schwarz, weiss, ohneAkzent
hmLkStil()                                   // <style id="stil-logo">, Klassen hm-lk2-*
hmLkStichworte(mid) -> [{ wort, quelle, zeichen: [] }]
hmLkKonzepte(mid, { runde, richtungen, basis, achse, stichworte, anzahl })
                     // achse: "schrift"|"anordnung"|"zeichen"|"laufweite"|"akzent" -> höchstens 6 Geschwister,
                     // die nur diese Achse ändern; ohne achse bleibt "Mehr davon" wie heute
hmLkKlemmen(spec) -> spec                    // Sperrgrenzen, auch für geladene Specs
hmLkFassung(b, fassung) -> { INK, AKZ, GRUND, name }
hmLkStamm(font, gewicht) -> Promise<Zahl>    // Stammstärke aus Glyph "l" über hmFontDatei, Cache; HM_LK_STAMM_START als Startwert
hmLkRaster(spec, b, px) -> Uint8Array        // Graustufen 32 x 32 aus einem unverbundenen Canvas
hmLkHash(bits) -> String                     // Silhouetten-Hash, rein rechnend
hmLkPruefen(spec, b, { mid, teamSicht }) -> [{ name, wert, satz, stufe: "ok"|"grenzwertig"|"nein" }]
hmLkKohorte(spec, mid) -> { naechster: { mid, name, abstand, hamming } | null }
hmLkFavicon(spec, px) -> spec                // unter 48 px verstärkt
hmLkPaketListe(spec, b) -> [{ pfad, art, px, fassung }]   // rein, testbar
hmLkPaket(spec, b, mid) -> Promise           // ZIP laden über hmJszip
LogoFeineditor({ spec, b, onChange }), LogoPruefstand({ spec, b, mid, teamSicht }),
LogoFassungen({ spec, b }), LogoAnwendungen({ spec, b, m })
```

### Muss

1. **Stichworte statt Clipart.** `hmLkStichworte` liest `b.claim`, `b.br.claim`, `marke2[mid].idee.satz` und `.zeichen.name` (falls vorhanden), `welt.zeichen.name`, `plattform.visuell.zeichen`, `plattform.persoenlichkeit[].wort` und gleicht sie gegen die geschlossene Tabelle `HM_LK_WORT_ZEICHEN` ab (zum Beispiel Rat zu Ratlinie und Ratstrich; Zeit, Dauer, Jahre, Warten zu Zeitmaß; Fenster, Raum, Weite zu Fenster; Grätzl, Straße, Ort zu Grätzl-Linie; Maß, Plan, Raster zu Schriftfeld und Maßstab; Bogen, Altbau, Gründerzeit zu Bogen; Kante, klar, Entscheidung zu Kante; Folge, Ausgabe, Serie zu Folio). Die Stichworte erscheinen als Chips "Rat, aus dem Claim"; das Team schaltet sie an und aus (`logos[mid].stichworte`). Ein freies Feld "Stichwort ergänzen" prüft nur gegen die Tabelle; ohne Treffer: "Zu diesem Wort gibt es kein Zeichen aus der Idee. Neue Zeichen zeichnet das Team von Hand." Keine Symbolsuche, keine Icons von außen.
2. **Mehr Zeichen aus der Idee**: `zeitmass` (Spanne mit zwei Endstrichen, Länge folgt `verhaeltnis`), `ratstrich` (senkrechter Strich genau in Versalhöhe links vom Namen, Zustand Stand aus FEED_FINAL E23). Vorhandene Zeichen bleiben. Die Strichstärke aller Zeichen folgt der Schrift: `stamm` aus `hmLkStamm` ersetzt die festen Faktoren wie `g * 0.05`, solange die Datei nicht geladen ist, gilt `HM_LK_STAMM_START[font]`.
3. **Mehr Anordnungen**: Art `dickte` (jede Letter in einer Zelle gleicher Breite, optisch zentriert, Wortabstand genau eine Zelle; das ist der Erkennungseingriff aus 10_system 3.6 für Markus), Monogramm-Lage `spalte` (Initialen untereinander, linksbündig, ohne Kreis, ohne Punkt, ohne Trennstrich), Zeichen-Lagen `unten` und `rechts`. Neue Richtung "Bemaßt" mit den Arten `dickte` und `teilung`. `punkt` bleibt renderbar, wird aber nicht mehr vorgeschlagen.
4. **Herkunft je Entwurf** in der Unterzeile jeder Karte: "aus Welt Weite", "aus Idee: Ratlinie", "aus Stichwort Zeit", "aus Bestandslogo" (Regel "Kein Wert ohne warum").
5. **Ideen-Leiste** unter dem großen Entwurf: fünf Knöpfe Schrift, Anordnung, Zeichen, Laufweite, Akzent. Ein Klick zeigt bis zu sechs Geschwister, die nur diese Achse ändern, klein im Einsatz; ein Klick übernimmt. Darunter "Zuletzt" (die letzten acht betrachteten Specs, `logos[mid].zuletzt`) und "Vorgeschlagen" (drei Entwürfe aus den aktiven Stichworten).
6. **Feineditor mit Sperrgrenzen**: Laufweite (Schieber mit sichtbarem Wert in em, Grenzen aus `HM_LK_GRENZEN` je Art, zum Beispiel Wortmarke minus 0,03 bis 0,06, gesperrt 0,08 bis 0,32), Gewicht (nur Schnitte der Schrift aus `HM_LK_SCHRIFTEN`), Groß oder Klein (bei `gesperrt` und `teilung` fest Versalien, deaktiviert mit Satz "In dieser Anordnung immer Versalien."), Verhältnis Zeichen zu Name (0,8 bis 1,6, nur mit Zeichen), Lage (links, oben, unten, rechts; beim Monogramm nebeneinander, gestapelt, Spalte), Zellbreite bei `dickte`. An einer Grenze steht "Grenze erreicht"; `hmLkKlemmen` hält jeden Wert innerhalb. Jede Änderung ergibt eine neue Spec-ID, "Zurücksetzen" stellt den Ausgangsentwurf her.
7. **Prüfstand "Faustregeln"** (ohne Punktwert, ohne Sterne), je Zeile Messwert und ein Satz:
   - Lesbar klein: Liegende Wortmarke bei 120 px Breite, Monogramm und Zeichen bei 16, 24 und 32 px, verglichen mit der 256-px-Fassung über `hmLkRaster` (Übereinstimmung ab 0,85 ok, ab 0,70 grenzwertig, darunter nein; Setzung, so benannt).
   - Kontrast: Tinte und Akzent auf Papier #F5F1EA und auf Nacht #141210, Ziel 3 zu 1 für die Wortmarke und für Akzent als Grafik (10_system 10.5). Der Akzent auf Nacht wird über `hmWeltLesbar(b.akzent, "#141210", 3)` geführt.
   - Abstand zur Kohorte: Spec-Vergleich und 32-x-32-Silhouetten-Hash gegen alle `branding[*].logoKonzept` anderer Makler. Ist ein Nachbar zu nah, sieht nur das Team seinen Namen; der Makler sieht "Das Team prüft einen ähnlichen Entwurf."
   - Erkennung: Punkt nach dem Namen, Kreis um Initialen, Nachname fett, Unterstreichung und Farbwechsel zwischen Vor- und Nachname werden benannt mit "zählt nicht als Erkennung" (10_system 10.3).
8. **Farbfassungen** (`LogoFassungen`): Matrix mit Zeilen Wortmarke, gestapelt, Zeichen oder Monogramm, Favicon und Spalten Positiv (Tinte auf Papier), Negativ (Kreide #F1EEE7 auf Nacht), Akzent, Schwarz, Weiß, Ohne Akzent. Jede Zelle ist ein `button` und lädt SVG (Pfade) oder PNG. "Eigene Größe" als `Sheet`: Breite, Höhe, Rand in Versalhöhen (Standard 1), Grund Papier, Nacht oder transparent, "Ränder beschneiden".
9. **Favicon** (`hmLkFavicon`): unter 48 px Striche plus 20 Prozent, Laufweite plus 0,02 em, eine Akzentlinie unter 3 px wird Fläche; sichtbar als Vorher und Nachher bei 32 und 16 px.
10. **Logo-Paket als ZIP** (`hmLkPaket`, `hmJszip`), Ordner `[vorname-nachname]-logo/` über `hmDateiname`: `hauptlogo-hell.svg/.png`, `hauptlogo-dunkel.svg/.png` (PNG 2000 px breit, Rand eine Versalhöhe), `gestapelt-hell/-dunkel`, `zeichen-hell/-dunkel` (ohne Zeichen: `monogramm-hell/-dunkel`), `profil-monogramm-1080-hell.png` und `-dunkel.png` (1080 x 1080, Rand mindestens 18 Prozent), `favicon-32-hell/-dunkel.png`, `favicon-180-hell/-dunkel.png` (verstärkt), `anwendung.html`. PNG entstehen nur aus der Pfad-SVG (`hmLkSvgPfade`); lässt sich eine Schriftdatei nicht laden, bricht das Paket mit `toast("Die Schriftdatei ist nicht erreichbar. Das Paket wird nicht erstellt, damit keine Ersatzschrift darin landet.")` ab. `hmEvent(m.id, "branding", "Logo-Paket geladen", ...)`.
11. **`anwendung.html`** (eine druckbare Seite, ohne externe Anfragen): welche Datei wofür; Schutzraum eine Versalhöhe als bemaßte Zeichnung; Mindestgrößen liegend 120 px oder 25 mm, gestapelt 64 px oder 14 mm, Monogramm 16 px oder 5 mm (10_system 10.3); die Profilbild-Regel wörtlich: "Auf Instagram und LinkedIn ist Ihr Profilbild Ihr Porträt. Das Monogramm gilt für Google-Profil, Favicon und Flächen ohne Gesicht."; Farben mit HEX und RGB, CMYK als Lücke "folgt nach dem Druckproof"; Schriften mit Schnitt und Lizenz (SIL Open Font License); drei Nie-Regeln (nicht verzerren, keine Effekte, keine anderen Farben); Stand und Version.
12. **Anwendungen** (`LogoAnwendungen`), flach, ohne Mockup-Vorlagen: Visitenkarte 85 x 55 mm, Website-Kopf, Schild als Montage im Verhältnis 3 zu 1 auf Papier und Nacht mit Lücke "Schildmaß fehlt", E-Mail-Signatur (liegend mindestens 120 px, Name, Claim, Telefon und E-Mail nur aus `einrichtung_daten[mid].visitenkarten` oder `website[mid].felder`, sonst Lücke "Telefon und E-Mail aus der Einrichtung"), Instagram-Profil (Profilbild ist das Porträt oder die Lücke "Porträt aus dem Porträt-Termin", Anzeigename, Reel-Endkarte 9:16 mit gestapelter Wortmarke). In `LogoImEinsatz` heißt die erste Abbildung künftig "Favicon und Google-Profil" statt "Profilbild"; sonst bleibt die Komponente, wie sie ist.
13. **Aufbau der Werkstatt** mit `Tabs`: Entwürfe, Feinschliff, Faustregeln, Fassungen, Anwendungen. Im Tab Entwürfe Umschalter Raster und Einzelansicht; die Einzelansicht zeigt einen Entwurf groß im Einsatz und blättert mit den Pfeiltasten. Höchstens drei gemerkte Entwürfe für den Makler bleiben wie heute.
14. **Selbsttest `hmSelbsttestLogo()` erweitern** (bestehende sechs Tests bleiben grün): Standardrunde ohne `punkt`, mindestens sechs Arten; Stichworte für Markus enthalten "Rat" mit Ratlinie; jedes Geschwister einer Achse unterscheidet sich von der Basis nur in dieser Achse; `hmLkKlemmen` hält Grenzen; alle Fassungen mit Tinte mindestens 3 zu 1 auf ihrem Grund; `hmLkFavicon(spec, 16)` hat dickere Striche als die Basis; `hmLkPaketListe` enthält alle Pflichtdateien mit hell und dunkel und `anwendung.html`; `hmLkHash` ist deterministisch und liefert für identische Bits Hamming 0; `dickte` hat gleiche Zellbreiten; kein sichtbarer Text mit "!" oder U+2013/U+2014.

### Qualität

- Große Vorschau auf Papier mit echtem Weißraum, Entwürfe im Raster ohne Karten-in-Karten, Linien nur als Haarlinie `var(--hairline-dark)`.
- Jede Zahl im Prüfstand mit Einheit und Satz in Alltagssprache ("Bei 16 px verschwimmt die Laufweite. Ab 24 px sicher lesbar.").
- Kein Endlosstrom: höchstens 18 Entwürfe je Runde, sechs Geschwister je Achse, drei zum Merken.
- Alle Schieber per Tastatur bedienbar, Werte als Text daneben, Kontrast mindestens 4,5 zu 1.
- Gegenprüfung durch den Prüf-Agenten: Markus als Test. Mindestens ein Entwurf der Art `dickte` in Newsreader oder Instrument Sans mit Ratlinie muss in der Standardrunde erscheinen, und das Paket muss mit geladenen Schriften vollständig entstehen.

---

## 4. Prüfung `wb-stand.jsx` und `wb-fragen2.jsx`

Maßstab: `01_auftakt.md` 3.4 bis 3.6 und die Einwilligungstabelle in Kapitel 4, `FRAGEN_WIRKUNG.md` Schritte 1 bis 3 und Kapitel 3, `03_vorlieben.md` 3.2 bis 3.6, UX auf Premium-Niveau. Zeilen beziehen sich auf den Stand vom 30.09.2026.

### `wb-stand.jsx`

| Nr. | Stelle | Befund | Neu |
|---|---|---|---|
| S1 | Zeile 79 bis 82, `IhrStand`, `sie` und `gruss` | `hmAnrede(m.id, "email")` ist die Anrede des Maklers gegenüber seinen Kunden. Duzt Markus seine Kunden per E-Mail, würde die Werkbank ihn mit "Hallo Markus." duzen | Immer Sie: `const gruss = m.anrede ? "Guten Tag, " + m.anrede + " " + rest.join(" ") + "." : "Guten Tag, " + m.name + ".";` `hmAnrede` hier entfernen |
| S2 | Zeile 17 bis 23, `HM_EINW_SEED` und `hmEinwilligung` | Seed-Werte ohne Datum gelten als erteilte Einwilligung. 01_auftakt verlangt: nichts vorgewählt, jede Entscheidung mit Datum und Fassung, offene Einwilligung zählt an ihrer Frist als Nein | `hmEinwilligung` liest nur Einträge mit `datum`; ohne Eintrag "offen", nach Ablauf der Frist "nein". Demo-Werte gehören als echte Einträge `{ wert, datum, fassung: "demo", wer: "Seed" }` in den Seed von `wb-store.jsx` |
| S3 | Zeile 24 bis 27, `hmEinwSetzen` | Eintrag speichert weder Fassung des Texts noch wer entschieden hat | Eintrag `{ wert, datum, fassung: e.fassung, wer }` |
| S4 | Zeile 6 bis 15, `HM_EINWILLIGUNGEN` | Keine Frist, keine Fassung, falsche Reihenfolge, Wortlaute weichen ab (KI-Text ohne Qualitätsfolge) | Felder `frist` (Regel: Werktag 1, 18 Uhr für 1 und 7; Beginn Workshop für 2; Ende Link-Bearbeitung für 3 und 8; 7 Werktage vor dem Reveal für 4; 2 Werktage vor dem Reveal für 5; Beginn erster Drehtag für 6) und `fassung: 1`. Anzeige in Reihenfolge der ersten Nutzung: 7, 1, 8, 3, 2, 4, 5, 6 (Nummern bleiben). Wortlaute aus 01_auftakt 3.8, etwa KI: "Claude, das Sprachmodell, mit dem wir arbeiten, liest Texte ohne Namen Dritter ..." mit dem Wenn-nicht-Satz samt Qualitätsfolge |
| S5 | Zeile 62 bis 74, `EinwilligungKarte` | Segmentsteuerung mit gefülltem Zustand, Folge bei Nein hinter "Wenn Sie nein sagen" versteckt, Nummernbadge | Frist über den Knöpfen ("Offen bis Dienstag, 6. Oktober, 18 Uhr"), drei gleichrangige Knöpfe Ja, Nein, Später, gleiche Breite, 48 px hoch, Kontur 1 px, keiner gefüllt. "Wenn nicht: ..." immer sichtbar. Nach der Entscheidung ersetzt "Ja, seit 5. Oktober" bzw. "Nein, seit 5. Oktober" die Knöpfe, daneben Link "Ändern"; beim Nein bleibt der Wenn-nicht-Satz stehen. Nummer `e.n` nicht anzeigen |
| S6 | Zeile 39 bis 57, `hmStandSchritte` | Sieben statt vierzehn Momente; Dauern falsch: Fragebogen "etwa 30 Minuten" statt 21, "fünf Bildpaare" statt vier Fotopaare und eine Schriftprobe, Workshop "2 Stunden" statt 110 Min., Richtungstermin 45 Min. und "Drei Richtungen, Sie entscheiden eine" statt 20 Min. und zwei Richtungen mit Empfehlung, Rückmeldung 20 statt 15, Freigabe 10 statt 8 | Die vierzehn Momente aus 01_auftakt 3.5 (Auftakt, Link, Workshop, Richtungstermin, Wort-Link, Porträt-Termin vorgemerkt, Reveal, Rückmeldung, Freigabe, Drehtag vorgemerkt, Übergabe, Umfeld, Live-Tag, Rückblick) mit Dauern aus der Tabelle in 3.6, bis `hmAuftragDauer` existiert in einer einzigen Konstante `HM_STAND_DAUER` mit Quelle je Zeile, Format "110 Min." und "3 Std. 30 Min." Richtungstermin-Satz: "Zwei Richtungen mit Ihrem Porträt und Ihren Worten, eine empfohlen." |
| S7 | Zeile 85, `zeitGesamt` | Literal "rund 6 Stunden 40 Minuten" ist hart kodiert und unterschätzt die Zeit um fast die Hälfte | Aus den Dauern gerechnet, Satz: "Ihre Zeit insgesamt: etwa 11 Std. 25 Min., davon etwa 3 Std. 30 Min. am Drehtag. Die Zeiten sind unsere Schätzung, wir messen und korrigieren sie." |
| S8 | Zeile 86 bis 111, Aufbau von `IhrStand` | Eine lange Seite statt drei Reiter; beginnt mit einer Grußformel statt mit seinem Ort | Drei Reiter Ablauf, Einwilligungen, Ihr Stand (`Tabs`). Ablauf-Titel ist der Live-Tag ("Dienstag, 24. November.") mit dem Satz "Geplant als Ihr Live-Tag in Sievering. Fest wird er mit Ihrer Rückmeldung nach dem Reveal. Bis zum Rückblick im Januar sind es acht Termine mit uns und fünf kurze Aufgaben im Link." Einwilligungen-Titel "Acht Fragen zu Ihren Daten. Jede hat eine Frist." bzw. "[n] von acht beantwortet." Ihr Stand beginnt mit dem Grätzl als Titel, Quelle darunter, dann "So haben wir Ihre Angaben gelesen. Im Fragebogen bestätigen oder ändern Sie jede Zeile. Erst danach arbeiten wir damit.", höchstens fünf Fakten mit Quelle, "Was uns noch fehlt", Knopf "Fragebogen beginnen" mit "21 Minuten: Fragebogen 15, Fremdbild-Link 2, Bildwahl 4. Sie können jederzeit unterbrechen." |
| S9 | Zeile 91 bis 94, `hm-stand-jetzt` | Schwarzer Block mit 22 px Radius wirkt wie eine App-Karte, 01_auftakt: laufender Moment mit Linie links, keine Farbe | Laufender Moment als Zeile der Liste mit 2 px Linie links in `var(--ink)`, Knopf in derselben Zeile; kein farbiger Block |
| S10 | Zeile 115 bis 124, `StandKarte`, Klasse `balken` | Segment-Fortschrittsbalken; 01_auftakt verbietet Prozentbalken | Nur Text: "Als Nächstes: Workshop, Di 13.10." und rechts "4 von 14" |
| S11 | Zeile 107 bis 110, Datenblock | Vage ("Ihre Antworten bleiben bei UNIO") und am falschen Ort | Die fünf Sätze aus 01_auftakt 3.4 in der Ansicht Einwilligungen unter der Liste, beginnend mit "Wir lesen Ihren Bestand ohne Kontakte und nur die Quellen, zu denen Sie Ja gesagt haben." |
| S12 | Zeile 30 bis 36, `hmStandTermine` | Rechnet ab `m.tag` nur mit Wochenenden, ignoriert `HM_FEIERTAGE` (26.10. Nationalfeiertag) und die Regeln aus 01_auftakt 3.5 | `hmWerktagePlus` aus `wb-shop2.jsx`, Regeln je Moment aus 3.5, Reveal am Makler-Wochentag, Live-Tag Plan A mit Ausweichtag als Satz |
| S13 | Zeile 55, Rückmeldung `aktion` | Hängt an `rev.am`; das neue `wb-reveal.jsx` setzt `am` erst mit Akt 9 | Beibehalten, zusätzlich Datum aus `rueckmeldung.offenAb` anzeigen: "Öffnet am Freitag, 6. November, 11 Uhr." |
| S14 | CSS `index.html` Zeile 901 bis 928 | Modul-CSS steht in `index.html` | In `hmStandStil()` mit `<style id="stil-stand">` verschieben, Klassen behalten |
| S15 | Zeile 126 bis 133, `hmSelbsttestStand` | Prüft weder Seed ohne Datum noch Anrede noch Dauern | Tests: keine Einwilligung ohne Datum gilt als ja; Gruß enthält nie "Hallo"; vierzehn Momente; Summe für Markus 683 Minuten; kein Minutenliteral außerhalb von `HM_STAND_DAUER` |

### `wb-fragen2.jsx`

| Nr. | Stelle | Befund | Neu |
|---|---|---|---|
| F1 | Zeile 132, `hmF2Text`, Platzhalter `{ausschlag}` | Rückfall "Ihr Einsatz" legt dem Makler ein Zitat in den Mund ("Beim X gab „Ihr Einsatz“ den Ausschlag.") | Textvariante statt Platzhalter: ohne Ausschlag lautet 2.8 "Beim {fall1}: Was hatte die Verkäuferseite von Ihrer Arbeit ganz konkret?"; mit Ausschlag nach FRAGEN_WIRKUNG "Beim {fall1} schrieben Sie: „{ausschlag}“. Was hatte die Verkäuferseite davon ganz konkret?" |
| F2 | Zeile 66 bis 85, `hmF2Vorbelegen` | Belegt Haltungen vor: f6, f13, f16, f17 aus alten Reglern, f18 aus der Erfolgs-Skala, f19, f20 (Nichtgewähltes wird "geht", Talking Head "nie" aus dem Kamera-Wert), f21, f22, f23. FRAGEN_WIRKUNG Regel 2 und 3.3: Regler messen Selbstbild, `erfolge` wird Verhalten am Fall | Vorbelegt werden nur Fakten: f1 und `f3[].objekt`, f14 aus Konten. Frühere eigene Worte (f6, f13, f16, f22, f23) erscheinen unter der Frage als "Im ersten Fragebogen schrieben Sie: „...“" mit Knopf "Übernehmen", nie als gesetzter Wert. f17, f18, f20 und f21 werden nie abgeleitet |
| F3 | Zeile 245, Starttext | "danach fünf Bildpaare. Etwa 30 Minuten." widerspricht 01_auftakt | "23 Fragen zu Ihren Fällen und Kunden, danach vier Fotopaare und eine Schriftprobe. Etwa 21 Minuten: Fragebogen 15, Fremdbild-Link 2, Bildwahl 4. Sie können jederzeit unterbrechen, alles wird gespeichert." Zahl aus derselben Konstante wie S6 |
| F4 | Zeile 247, Versprechen | "Rechts sehen Sie, was sich in Ihrer Marke schon ändert" verspricht eine Wirkung, die es in diesem Moment nicht gibt | "Rechts sehen Sie, wofür wir jede Antwort verwenden." |
| F5 | Zeile 272, `balken`; CSS `index.html` Zeile 935 | Prozentbalken im Link | Entfernen; Fortschritt nur als Text "Frage 3 von 23" |
| F6 | Zeile 273, Kopfzeile | Trenner "·" als Zeichen, Restzeit aus `min`-Summe (rund 23 Minuten) weicht von 21 ab | "Frage 3 von 23, Ihre Fälle" und "noch etwa 12 Minuten", gerechnet aus denselben Setzungen wie F3 |
| F7 | Zeile 214 bis 229, `F2Paar` | Beschriftungen unter den Bildern ("Gerichtet, mit Schatten", "Wärmer") lenken die Wahl; Weiter-Knopf nötig; "Beides gleich" als kleiner Link unter den Bildern; feste Seiten; kein Probepaar; Zeit ab Frage statt ab Dekodierung | Nach 03_vorlieben 3.4 und 3.5: kein Wort am Bild; Tippen wählt und blendet nach 180 ms das nächste Paar ein; "Beides gleich" mittig zwischen den Bildern in einem 44 px hohen Streifen; Seite von Pol a je Makler zufällig und gespeichert (`vorlieben.seiten`); ungezähltes Probepaar vor dem ersten Paar; Tasten Pfeil links und rechts, Pfeil unten für Beides gleich, Rücktaste zurück; Telefon 1:1 übereinander mit Kante `min(Breite minus 32, (Höhe minus 104) / 2)`, Rechner 4:5 nebeneinander je höchstens 440 px; `dauerMs` ab `img.decode()` beider Bilder; danach Kontaktbogen der gewählten Bilder |
| F8 | Zeile 218, `portrait` für Markus | Fester Pfad `assets/team/portrait-06.jpg`; laut FEED_FINAL E12 nur Satzprobe, nie vor dem Makler | Nur `b.portrait`; fehlt es, entfällt Paar 3.4 mit Wert "offen" und einem Hinweis für das Team, keine Fläche "Porträt folgt" |
| F9 | Zeile 46 bis 50, `HM_F2_BILD` b1 bis b4 | Archivbilder, Farbtemperatur per CSS-Filter, Ausschnitt per `scale()`: kein Paarsatz aus eigenem Shooting mit genau einer Variable (03_vorlieben 3.3) | Als Übergang kennzeichnen: `paarStatus: "uebergang"` in `vorlieben`, damit Kohorte und Pretest diese Wahlen nicht zählen; Team-Hinweis "Übergangsbilder, nicht der Paarsatz" |
| F10 | Zeile 54, b8 `bedingt` | Blendet "Nicht ich" ganz aus, wenn Zweck 8 nicht Ja ist; 01_auftakt: ohne Ja bleibt der Weg "Beschreiben" | Immer zeigen, optional. Bei Ja drei Wege (Einfügen, Link, Beschreiben), sonst nur Beschreiben mit dem Satz "Beschreiben Sie in einem Satz, was Sie nicht sein wollen. Wir speichern keinen fremden Auftritt." |
| F11 | Zeile 210, `logoUrteil` | Empfehlung nur als "· empfohlen", ohne Begründung; FRAGEN_WIRKUNG Regel 4 verlangt markiert und begründet | Unter der empfohlenen Option ein Satz aus der Bestandsprüfung, etwa "Empfohlen, weil Sie Farbe und Schrift Ihres Logos behalten möchten."; Logo in echter Größe und in einer echten Anwendung (Karte) statt als freies Bild |
| F12 | Zeile 22 und 182, `f2` Stufen | `aria-label` "Stufe n" sagt nichts; Käufer-Makler bekommen Eigentümer-Fragen | `aria-label` mit den sieben Texten aus `hmF2Kurz`; ab Stufe 5 Textvarianten: 2.8 "Käuferseite" statt "Verkäuferseite", 2.11 "Wer hat gekauft" statt "Wer hat verkauft" |
| F13 | Zeile 42, f22 `platz`; Zeile 207, f23 Platzhalter | Beispiele aus Markus' Seed ("Dienstag nach dem Grundbuch-Termin, 11 Uhr", "drei Abgeber-Anfragen im Monat aus Döbling") lenken alle Makler | Neutral: "Wochentag, Uhrzeit und woran es anschließt" und "Woran Sie das in zwölf Monaten zählen würden" |
| F14 | Zeile 206, Formate | Du-Texte aus `HM_FORMATE` per Regex auf Sie umgebaut; "deine", "dich", "dir" bleiben stehen | Eigene Konstante `HM_F2_FORMATE_SIE` mit geprüften Sie-Sätzen |
| F15 | Zeile 171 bis 174 und 263 bis 266 | Die Nachfrage aus FRAGEN_WIRKUNG (höchstens eine je Frage, bei 2.3, 2.5, 2.6) fehlt | Nach "Weiter" bei f3, f5, f6 genau eine Regel-Nachfrage, wenn die Antwort unter acht Wörtern bleibt oder bei f3 keine Zahl enthält: "Was genau haben Sie in dem Moment gesagt oder getan?" Gespeichert als `antworten[id + "_nachfrage"]`, überspringbar, nie eine zweite |
| F16 | Zeile 254 bis 261, Ende | Fremdbild-Link fehlt; FRAGEN_WIRKUNG: am Ende teilen, nur bei Zweck 3 Ja | Abschnitt "Ein Link für drei Menschen, die Sie empfehlen würden" mit `navigator.share` und `KopierKnopf` als Rückfall, nur bei `hmEinwilligung(mid, 3) === "ja"`; bei "spaeter" der Satz mit Frist |
| F17 | Zeile 185, `React.useState` im Zweig `bestaetigen` | Hook in einer Bedingung von `F2Eingabe`; hält nur, weil `key={q.id}` gesetzt ist | Eigene Komponente `F2Bestaetigen` mit ihrem Hook |
| F18 | Zeile 121 bis 127, `hmF2Abschliessen` | Erzeugt automatisch `strategien` über `hmZweiWege` (Archetyp-Schablonen), die Prozess v2 durch Territorien ersetzt | Nicht mehr automatisch; das Team startet Schritt 5 und 6 selbst. Bis dahin nur `hmEvent` |
| F19 | CSS `index.html` ab Zeile 930 (`hm-f2-*`) | Modul-CSS in `index.html` | In `hmF2Stil()` mit `<style id="stil-fragen2">` verschieben |
| F20 | Zeile 301 bis 310, `hmSelbsttestFragen2` | Test "Fakten vorbelegt, Haltungen leer" prüft nur f2, f5, f8, f9 | Erweitern: f6, f13, f16 bis f23 sind nach `hmF2Vorbelegen` leer; `hmF2Text` ohne Ausschlag enthält keine Anführungszeichen; Seite von Pol a stabil je `mid`; kein Literal "30 Minuten" |

---

## 5. Abnahme durch den Chef

1. Jede Datei lädt ohne Konsolenfehler, alle Selbsttests grün (Einstellungen, Selbsttest), auch `hmSelbsttestWelten` und `hmSelbsttestLogo` in ihrer alten Form.
2. Markus im Browser: Markenbuch, Kapitel "Die ersten 30 Tage" zeigt FeedAbschnitt; RevealKnopf startet die Probe; `?ansicht=reveal&presenter=1&makler=markus` synchronisiert; `?ansicht=rueckmeldung&makler=markus` zeigt vor Akt 9 den Öffnungssatz.
3. Grep über die drei Dateien: kein U+2013, kein U+2014, kein "!" in JSX-Texten, kein `import`, kein `export`, kein `hmWeltKontakt` für sichtbare Kontaktdaten, kein `hmWebObjekte` in Feed und Reveal.
4. Die Prüfbefunde S1 bis S15 und F1 bis F20 gehen als eigene Etappe an einen Agenten; S1, S2, F1, F2 und F8 zuerst, weil sie Anrede, Einwilligung und erfundene Worte betreffen.
