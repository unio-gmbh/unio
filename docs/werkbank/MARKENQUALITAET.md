# UNIO HUMAN. Qualitätsstandard Marke (v1, 29.09.2026)

Wofür dieses Dokument da ist: Es legt fest, woran eine HUMAN-Markenplattform gemessen wird, wer sie wann prüft und wie Claude sie im Betrieb schreibt. Maßstab ist eine High-End-Brand- und Social-Agentur. Datenvertrag: `docs/werkbank/MARKE_SCHEMA.md`. Evidenz: `docs/werkbank/RESEARCH_2026-09.md`. Code: `ui_kits/werkbank/wb-plattform.jsx` (Regeln und Prüfung), `api/wb-marke.js` (Claude-Kette).

Der eine Satz, an dem alles hängt: **Würde ein Satz auch auf einen anderen Makler passen, ist er falsch.**

---

## 1. Liefergegenstände einer High-End-Agentur und wie HUMAN sie abbildet

Eine gute Agentur liefert keine Stilmappe, sondern eine Kette von Entscheidungen, die aufeinander aufbauen. HUMAN liefert dieselbe Kette, gespeist aus Fragebogen, Workshop und Material.

| Liefergegenstand | Was eine gute Agentur darunter versteht | Feld im Datenvertrag | Woraus HUMAN es baut |
|---|---|---|---|
| Einsicht | Eine wahre Spannung im Leben der Kunden, die Konvention der Kategorie und die Stelle, die niemand besetzt | `einsicht` | Anlässe (Category Entry Points), Hindernis, Objekte, Wohnwelten, Abraten, Kundensatz, Grätzl-Anteil |
| Positionierung | Für wen, was, anders als wer, warum glaubwürdig. Ein Satz, der eine Wahl trifft | `positionierung` | Figur des gewählten Wegs, stärkster Beleg, Gegenüber aus der Konvention |
| Markenplattform | Versprechen, Rolle, drei Werte als Verhalten, Persönlichkeit mit Grenzen | `versprechen`, `rolle`, `werte`, `persoenlichkeit` | Werte und Gründe aus dem Fragebogen, heutiges Fremdbild (drei Wörter), Ziel in einem Jahr als Richtung |
| Verbale Identität | Tonregler, Regeln, die ein Texter ohne Rückfrage anwendet, Wortliste, Beispiele "so und nicht so" für echte Situationen | `stimme` | Regler s1 bis s5, Anrede je Kanal, Grenzen, Erfolgs-Skala (Honesty-Humility) |
| Botschaftshaus | Claim, Alternativen, ein Satz, drei Sätze, Über mich, Boilerplate | `botschaften` | Territorium, eigene Worte, Belege |
| Story in drei Längen | Herkunft, Reibung, Wende, Haltung, Versprechen. Kurz, mittel, lang für Bio, Website, Pressetext | `story` | Kapitel "Deine Geschichte", Workshop-Zitate. Fehlt die Wende, bleibt die Lücke sichtbar |
| Belege | Jede Behauptung mit Beleg und Quelle | `beweise` | Belege aus 24 Monaten, Abschlüsse, Grätzl-Anteil, Kundensatz, Mitschrift |
| Visuelles System mit Idee | Leitbild, Bildsprache mit Regeln, Motive, Verbote, ein wiederkehrendes Zeichen | `visuell` plus `HM_MARKENWELTEN` | Figur, Bildpaare, Wohnwelten, gewünschtes Zeichen, Grenzen |
| Säulen als Serien | Keine Themenliste, sondern benannte Formate mit Ablauf, Hook-Formel, Rhythmus und Beispielbeiträgen | `saeulen[].serie` | Säulen und Anteile des Wegs, Grätzl, Straßen, Belege, fester Wochentermin |
| Konzeptideen | Launch, Signature-Format, Community oder Kooperation, jeweils mit Begründung und Umsetzung | `konzepte` | Territorium, Anlässe, Zugehörigkeit (Unity), Partner, die Kunden schon vertrauen |
| Startplan | Die ersten vier Wochen, Beitrag für Beitrag | `start30` | Serienbeispiele, Kompetenz vor Persönlichem (Pratfall) |
| Markenbuch | Das Dokument, das Makler, Team und Dienstleister benutzen | `wb-markenbuch.jsx` | Plattform plus Markenwelt, druckbar |
| Qualitätssicherung | Interne Kritik vor jeder Präsentation, Creative Director zeichnet ab | `qualitaet`, zwei Gates | Regelprüfung im Browser plus Schlussprüfung der Kette |

Was HUMAN bewusst anders macht als viele Agenturen: keine erfundene Origin Story, keine Aspiration, die der Makler nicht lebt (Actual-Self-Regel, Malär 2011), und jede Lücke bleibt als Lücke sichtbar, bis sie im Workshop geschlossen ist.

---

## 2. Der Prozess mit zwei Gates

```
Fragebogen ─► Zwei Wege ─► Workshop mit Mitschrift
                                  │
                   Kette Schritt 1 bis 3: Einsicht, drei Territorien, Kritik und Auswahl
                                  │
                        GATE 1  Daniel: Einsicht und Positionierung
                                  │
                   Kette Schritt 4 bis 6 und Schlussprüfung
                                  │
                   Regelprüfung im Browser (hmMarkenQualitaet)
                                  │
                        GATE 2  Daniel: das fertige Markenbuch
                                  │
                        Makler sieht und bestätigt
```

**Ohne Claude** (kein Schlüssel, Fehler, Limit) erzeugt `hmPlattform(mid)` dieselbe Struktur aus Regeln. Die Gates bleiben gleich.

### Gate 1: Einsicht und Positionierung (Creative Director, etwa 15 Minuten)

Daniel prüft, bevor irgendein Text geschrieben wird:

1. Ist die Spannung wahr? Wurde sie im Workshop so gehört, oder ist sie eine Vermutung?
2. Ist die weiße Stelle belegt, mit einem Satz aus dem Dossier?
3. Passt das gewählte Territorium zum heutigen Fremdbild und zu den Grenzen (Tabus, Anrede, Kamera-Komfort)?
4. Trägt es zwölf Monate Serien mit dem Zeitbudget des Maklers?
5. Ist das Gegenüber ("anders als") eine Branchenkonvention, nie ein Mitbewerber mit Namen?

Ergebnis: freigeben, anderes Territorium wählen oder Schärfung vorgeben. Technisch: `hmPlattformEinsichtClaude(mid)` liefert Einsicht, Territorien und Auswahl. Mit der Entscheidung ruft `hmPlattformClaude(mid, { freigabe: { einsicht, territorium, schaerfung } })` die Schritte 4 bis 6 auf (Phase `plattform` der Funktion).

### Gate 2: das fertige Markenbuch (Creative Director, etwa 30 Minuten)

Freigabe nur, wenn alles zutrifft:

- Qualität gesamt mindestens 80, kein Kriterium unter 60, keine Klischees.
- Positionierung, Claim, Story kurz und alle öffentlichen Belege ohne Lücke. Lücken in internen Feldern sind erlaubt, wenn der Termin zum Schließen steht.
- Lautlese-Test: Claim, Story kurz und drei Hooks laut gelesen. Stolpert ein Satz, wird er neu geschrieben.
- Zahlen und Namen gegen Unterlagen geprüft. Belege aus dem Fragebogen sind Selbstauskunft, sie tragen den Vermerk "vor Veröffentlichung mit Unterlagen prüfen".
- Kundenstimmen nur wörtlich, mit Datum und Freigabe.

Danach geht das Markenbuch an den Makler. Jede Änderung speichert eine neue Version (`hmPlattformSpeichern`, höchstens zwölf Versionen je Makler).

---

## 3. Die Bewertungsmatrix

Fünf Kriterien, jedes von 0 bis 100. Die Regelprüfung `hmMarkenQualitaet(plattform, mid)` rechnet sie nach, auch für Plattformen aus der Claude-Kette.

| Kriterium | Frage | Wie gemessen | Gewicht |
|---|---|---|---|
| Spezifität | Steht in jedem Kerntext ein Ort, eine Zahl oder ein eigenes Wort des Maklers? | Anteil der Kerntexte (Einsicht, Positionierung, Versprechen, Botschaften, Story, Serien, Beispiele, Konzepte) mit Ortsnamen, Zahl oder einem Wort-Trigramm aus den Freitexten. Offene Lücken senken den Wert | 25 |
| Unterscheidbarkeit | Würde der Text auch für einen anderen Makler funktionieren? | Größte Jaccard-Ähnlichkeit auf Wort-Trigrammen der Markentexte gegen die Plattformen der anderen Makler im Store (`aehnlichkeit`). Ab 5 Prozent kostet jeder Punkt drei Punkte. Abläufe und Begründungen zählen nicht, sie dürfen gleich sein | 20 |
| Glaubwürdigkeit | Hat jede Behauptung einen Beleg, und stammt jede Zahl aus dem Dossier? | Behauptungen ohne Beleg (minus 15), Zahlen ohne Quelle in Einsicht, Positionierung, Botschaften, Story, Belegen (minus 20), Positionierung ohne Beleg (minus 20), Fehlergeschichte vor den Belegen (minus 15) | 25 |
| Konsistenz | Stimmen Anrede und Ton durchgehend? | Anrede je Kanal nach der Regel des Wegs (Website, Erstkontakt, LinkedIn, Instagram), dazu Ausrufezeichen, Gedankenstriche, Emojis, weiche Floskeln | 15 |
| Umsetzbarkeit | Kann das Team morgen damit arbeiten? | Vier bis fünf Säulen, Pflichtsäule "Wie ich arbeite" mit mindestens 15 Prozent, je Serie Name, Idee, drei Schritte, Hook-Formel, Rhythmus und drei Beispiele, drei Konzepte, vier Wochen mit je drei bis vier Beiträgen, Hooks bis zwölf Wörter | 15 |

**Harte Fehler** (Klischee-Liste aus dem Datenvertrag): Traumimmobilie, Ihr Partner für, mit Leidenschaft, kompetent und zuverlässig, Immobilienprofi, maßgeschneidert, rundum sorglos, auf Augenhöhe, Mehrwert, ganzheitlich, individuelle Lösungen, Ihr Zuhause ist unsere Mission, seriös, Experte an Ihrer Seite, einzigartig, exklusiv ohne Beleg. Ein harter Fehler deckelt die Gesamtnote bei 50 und zieht je Fund 10 Punkte ab. Negativbeispiele ("so nicht") und Vermeiden-Listen zählen nicht.

**Weiche Floskeln** (Hinweis, minus 5 in Konsistenz): Traumwohnung, einmalige Gelegenheit, revolutionär, Game-Changer, aus einer Hand, Luxus, Premium, hochwertig, Wohlfühl, perfekt, garantiert.

**Lesart der Gesamtnote:** 90 und mehr heißt präsentierbar. 80 bis 89 heißt freigabefähig nach Gate 2. 60 bis 79 heißt Workshop-Lücken schließen. Unter 60 heißt: Fragebogen oder Workshop fehlen.

Stand der Demo-Makler (Regeln, 29.09.2026): Markus Leitner 95, Elif Demir 96, Sara Novak 57 (ohne Antworten, fast nur Lücken). Textähnlichkeit der Markentexte Markus zu Elif 5 Prozent.

---

## 4. Die Claude-Kette im Betrieb

### 4.1 Aufbau

`api/wb-marke.js` führt die Kette serverseitig aus. Sie ruft die Messages API über das offizielle SDK (`@anthropic-ai/sdk`) mit `process.env.ANTHROPIC_API_KEY`, Modell per `HUMAN_MODEL`, Standard `claude-opus-5-5`.

| Schritt | Inhalt | Effort | Ergebnis |
|---|---|---|---|
| 1 | Einsicht | medium | `einsicht` plus wörtliche Stützen aus dem Dossier |
| 2 | Drei Positionierungs-Territorien | high | Name, Kernidee, Positionierungssatz, Claim-Idee, Beleg, Risiko |
| 3 | Kritik und Auswahl nach der Matrix | medium | Punkte je Kriterium, Wahl, Begründung, Schärfung. **Gate 1** |
| 4 | Plattform | high | Positionierung, Versprechen, Rolle, Werte, Persönlichkeit, Botschaften, Story, Belege |
| 5 | Verbale Identität mit Beispielen | high | `stimme` |
| 6 | Serien, Konzepte, Startplan, Bildwelt | high | `saeulen`, `konzepte`, `start30`, `visuell` |
| Schluss | Schlussprüfung | medium | Korrekturen mit Pfad, Bewertung, Hinweise. **vor Gate 2** |

Schritte 5 und 6 laufen parallel, beide hängen nur an Schritt 4. Jeder Schritt nutzt Structured Outputs (`output_config.format` mit JSON-Schema), damit das Ergebnis dem Datenvertrag entspricht. System-Prompt und Dossier stehen vorn und sind mit `cache_control` markiert, damit die sieben Aufrufe den Cache teilen. Die Korrekturen der Schlussprüfung werden nur übernommen, wenn der alte Text am Pfad passt. Danach ersetzt die Funktion Gedankenstriche und Ausrufezeichen als letzte Sicherung und meldet Klischees in `pruefung.hinweise`. Im Browser rechnet `hmMarkenQualitaet` die Note neu und füllt fehlende Felder aus der Regel-Plattform auf (`hmPlattformClaude`).

Betrieb: `maxDuration` 300 Sekunden (Vercel Pro). Höchstens 20 Aufrufe pro Stunde je IP, im Speicher der Funktion. Ohne Schlüssel oder ohne SDK antwortet die Funktion mit 503 und `{ fallback: "regeln" }`. Kosten grob ein bis zwei Dollar je Plattform (Arbeitswert, mit dem `kette.schritte`-Protokoll nach den ersten Läufen nachrechnen).

### 4.2 JSON-Schema

Verbindlich ist der Datenvertrag in `docs/werkbank/MARKE_SCHEMA.md`, Objekt `plattform`. Die Schemas je Schritt stehen in `api/wb-marke.js` (Konstante `SCHEMA`): alle Felder Pflicht, `additionalProperties: false`, Säulen-IDs und Format-IDs als Aufzählung (`markt`, `wissen`, `meinung`, `persoenlich`, `beweise`; `talking`, `spaziergang`, `walkthrough`, `carousel`, `qa`, `behind`). Die Welt-ID wird gegen die Liste im Dossier geprüft, sonst gilt die erste.

### 4.3 Das Dossier

Jeder Schritt bekommt dasselbe Dossier: alle Fragebogen-Antworten mit Klartext-Label (Freitexte als "eigene Worte" markiert), eine Liste der nicht beantworteten Geschichte-Fragen ("als Lücke markieren"), den gewählten Strategie-Weg (Figur, Säulen, Formate, Kanäle, Anrede-Regel, Ton, Passt und Fordert), die Workshop-Mitschrift (Zusammenfassung, Zitate, Transkript bis 24.000 Zeichen mit Kürzungsvermerk), die Materialliste, das heutige Branding und die Bildwelten zur Auswahl.

### 4.4 System-Prompt

```
Du bist Strategiechef einer Brand- und Social-Media-Agentur in Wien, die Personenmarken für Immobilienmakler baut. Du arbeitest für UNIO HUMAN. Dein Maßstab sind die Liefergegenstände einer High-End-Agentur: Einsicht, Positionierung, Markenplattform, verbale Identität mit Beispielen, Story in drei Längen, Säulen als ausgearbeitete Serien, Konzeptideen, Startplan. Das Ergebnis muss so spezifisch sein, dass es für keinen anderen Makler in Wien passt.

Arbeitsregeln
1. Quelle ist ausschließlich das Dossier. Erfinde keine Fakten: keine Zahlen, Orte, Namen, Auszeichnungen, Jahreszahlen, Zitate. Fehlt etwas, schreibe genau: "Kommt aus dem Workshop: <was fehlt>".
2. Zitiere und verdichte die eigenen Worte des Maklers aus Freitexten und Workshop-Zitaten. Eigene Worte schlagen jede eigene Formulierung.
3. Jede Behauptung braucht einen Beleg aus dem Dossier. Zahlen nur, wenn sie im Dossier stehen, immer mit Ort oder Zeitraum.
4. Anrede: öffentliche Texte folgen der Anrede-Regel im Dossier, je Kanal. Texte an das Team (Skizzen, Abläufe, Begründungen) sind neutral formuliert.
5. Stil: Deutsch, Satzschreibung, kurze Sätze, Verben vor Adjektiven. Ein Ort oder eine Zahl schlägt jedes Adjektiv. Keine Ausrufezeichen, keine Emojis, keine Gedankenstriche, keine Überschriften-Vorspänne.
6. Verbotene Wörter, harte Fehler: Traumimmobilie, Ihr Partner für, mit Leidenschaft, kompetent und zuverlässig, Immobilienprofi, maßgeschneidert, rundum sorglos, auf Augenhöhe, Mehrwert, ganzheitlich, individuelle Lösungen, Ihr Zuhause ist unsere Mission, seriös, Experte an Ihrer Seite, einzigartig, exklusiv ohne Beleg. Ebenso zu meiden: Traumwohnung, einmalige Gelegenheit, revolutionär, Luxus, Premium, hochwertig, perfekt, garantiert.
7. Forschung, die gilt: Vertrauen hat drei Teile, Fähigkeit, Wohlwollen, Integrität (Mayer, Davis, Schoorman 1995), und Integrität wiegt schwerer als Sympathie (Brambilla 2021). Die Säule "Wie ich arbeite" ist Pflicht, mindestens 15 Prozent. Fehlergeschichten erst, wenn Belege da sind (Pratfall, Aronson 1966). Die Tonalität widerspricht nie dem heutigen Fremdbild, das Ziel in einem Jahr ist Richtung, nicht Stimme (Malär 2011). Säulen hängen an Anlässen, mit denen Kunden kommen (Category Entry Points, Romaniuk). Wiedererkennbarkeit entsteht zuerst über Gesicht und Bildausschnitt, Farbe trägt am wenigsten (Romaniuk 2018). Archetypen sind Sprachbild, keine Diagnose.
8. Die Messlatte: Würde ein Satz auch auf einen anderen Makler passen, ist er falsch. Schreib ihn neu, bis er nur auf diesen passt.

Niveau, nicht Inhalt. Übernimm aus diesem Beispiel keine Formulierung:
Schwach: "Ihr kompetenter Partner für Zinshäuser in Wien."
Stark: "Für Erbengemeinschaften und Anleger in Döbling, Währing und Hietzing ist Markus Leitner der Makler, der den Zeitpunkt vor den Abschluss stellt. Anders als Vermittler, die vom Abschluss leben. Einer Erbengemeinschaft riet er, zwei Jahre zu warten. Sie kam mit 600.000 mehr zurück."
Schwach: Serie "Markt-Update". Stark: Serie "Sievering in Zahlen": einmal im Monat drei Zahlen aus dem Grundbuch, ein eigener Abschluss als Einordnung, keine Prognose.
```

### 4.5 Prompts je Schritt

Jeder Schritt bekommt das Dossier, die Ergebnisse der Vorschritte und diesen Text. Am Ende steht immer: "Antworte ausschließlich mit JSON nach dem Schema."

**Schritt 1, Einsicht**
```
Schritt 1 von 6: Einsicht.
Lies das Dossier wie ein Stratege vor dem ersten Termin. Beschreibe die Zielgruppe als Bild aus Anlass, Ort, Objekt und Lebensphase, nicht als Demografie. Finde die eine Spannung, die diese Kunden vor der Entscheidung umtreibt. Beschreibe die Konvention, mit der Makler in dieser Gegend und diesem Segment heute auftreten. Finde die weiße Stelle: was niemand besetzt und dieser Makler belegen kann. Jede Aussage stützt sich auf ein Detail im Dossier. Liste diese Details in "stuetzen", wörtlich.
```

**Schritt 2, drei Territorien**
```
Schritt 2 von 6: drei Positionierungs-Territorien.
Entwickle aus der Einsicht drei deutlich verschiedene Richtungen. Je Territorium: ein Name aus zwei bis vier Wörtern, die Kernidee in einem Satz, ein Positionierungssatz nach dem Muster "Für [wen] ist [Name] [der Makler / die Maklerin], [der / die ...]. Anders als [...]. [Beleg].", eine Claim-Idee mit höchstens fünf Wörtern, der stärkste Beleg aus dem Dossier und das größte Risiko. Wenn das Dossier es hergibt: ein Territorium aus Herkunft oder Zugehörigkeit, eines aus einer Haltung gegen den eigenen Vorteil, eines aus Ort oder Objekt.
```

**Schritt 3, Kritik und Auswahl**
```
Schritt 3 von 6: Kritik und Auswahl.
Bewerte jedes Territorium streng wie ein Creative Director, je Kriterium 0 bis 5 Punkte: Spezifität (Ort, Zahl, eigene Worte), Unterscheidbarkeit (passt nur auf diesen Makler), Glaubwürdigkeit (Beleg im Dossier), Anschluss (passt zum heutigen Fremdbild, zur Anrede und zu den Grenzen), Umsetzbarkeit (trägt Serien für zwölf Monate mit dem genannten Zeitbudget). Wähle eines. Begründe in höchstens drei Sätzen. Schärfe es: was aus den anderen beiden übernommen wird und welcher Satz noch zu allgemein ist.
```

**Schritt 4, Plattform**
```
Schritt 4 von 6: Markenplattform.
Baue auf dem gewählten Territorium und seiner Schärfung. Positionierung mit satz, fuerWen, was, andersAls, weil. Versprechen in einem Satz, in der Anrede der Website. Rolle: die Figur in eigenen Worten, name und satz. Drei Werte als Verhalten, je mit einem Satz "nie". Drei bis vier Persönlichkeitswörter aus dem heutigen Fremdbild mit heisst und heisstNicht. Botschaften: Claim mit höchstens fünf Wörtern, drei Alternativen, ein Satz, drei Sätze, "Über mich" in Ich-Form für die Website, Boilerplate in dritter Person. Story mit herkunft, spannung, wendepunkt, haltung, versprechen, dazu kurz (höchstens 35 Wörter), mittel (70 bis 100 Wörter), lang (160 bis 220 Wörter), in Ich-Form. Beweise: jede Behauptung mit Beleg aus dem Dossier und Quelle. Fehlen Wendepunkt oder Kundensatz, markiere die Lücke mit "Kommt aus dem Workshop: ...". In "lang" steht dann an dieser Stelle "[Kommt aus dem Workshop: Wendepunkt]".
```

**Schritt 5, verbale Identität**
```
Schritt 5 von 6: verbale Identität.
Regler von 0 bis 100 für ernst, persoenlich, begeistert, sachlich, abgeleitet aus Reglern und Worten im Dossier. Sechs bis acht Regeln, die ein Texter ohne Rückfrage anwenden kann. Wörter, die diese Marke sagt (Orte, Objekte, eigene Wörter aus dem Dossier), und Wörter, die sie nie sagt. Mindestens fünf Beispiele mit wo, so und nicht: Caption auf dem ersten Kanal, erste Antwort auf eine Anfrage, Absage oder Abraten, erster Satz der Website, Bio. "so" folgt der Anrede-Regel des jeweiligen Kanals. "nicht" zeigt die typische Branchenfloskel, die diese Marke vermeidet.
```

**Schritt 6, Serien und Konzepte**
```
Schritt 6 von 6: Säulen als Serien, Konzepte, Startplan, Bildwelt.
Übernimm Säulen und Anteile aus dem Strategie-Weg: vier bis fünf Säulen, "wissen" mindestens 15 Prozent, Summe 100. Jede Säule wird eine Serie mit eigenem Namen, nie ein Gattungsname wie "Markt-Update". Je Serie: Idee, Ablauf in drei bis fünf Schritten, Hook-Formel, Rhythmus mit Tag und Kanal, genau drei Beispielbeiträge mit Titel, Hook (höchstens zehn Wörter, funktioniert ohne Ton) und Skizze. Nutze Grätzl, Straßen, Objekte, Belege und den festen Wochentermin aus dem Dossier. Drei Konzepte: ein Launch für die ersten 30 Tage, ein wiederkehrendes Signature-Format, eine Community- oder Kooperationsidee im Grätzl, je mit Idee, Warum samt Evidenz, Umsetzung in Schritten und Kanal. Startplan: vier Wochen mit je drei bis vier Beiträgen aus den Serien, Kompetenz vor Persönlichem. Bildwelt: wähle eine Welt-ID aus der Liste im Dossier, formuliere Bildidee, Regeln, Motive, Vermeiden und das wiederkehrende Zeichen.
```

**Schlussprüfung**
```
Schlussprüfung vor Gate 2.
Prüfe die Plattform wie der Creative Director gegen die Matrix und die Arbeitsregeln: verbotene Wörter, Gedankenstriche, Ausrufezeichen, Anrede je Kanal, erfundene Fakten (jede Zahl und jeder Ort muss im Dossier stehen), Sätze, die auf jeden Makler passen würden, Hooks über zehn Wörter, Behauptungen ohne Beleg. Gib Korrekturen als Liste mit pfad (zum Beispiel botschaften.claim oder saeulen[2].serie.beispiele[1].hook), alt, neu und grund. Ändere nur, was gegen eine Regel verstößt oder austauschbar ist. Bewerte danach jedes Kriterium von 0 bis 100 und nenne höchstens fünf Hinweise für den Creative Director.
```

### 4.6 Few-Shot-Hinweise

- Ein Beispiel zeigt Niveau, nie Inhalt. Im System-Prompt steht genau ein Paar "schwach und stark" für Positionierung und eines für einen Seriennamen, beide aus dem Musterbeispiel in Kapitel 5, mit dem ausdrücklichen Verbot, Formulierungen zu übernehmen.
- Keine vollständige Muster-Plattform in den Prompt legen. Lange Beispiele erzeugen Gleichklang, genau das misst die Unterscheidbarkeit.
- Wenn die Ähnlichkeit zweier Claude-Plattformen über 15 Prozent steigt, zuerst das Beispielpaar tauschen (anderer Makler, andere Figur), erst dann die Regeln ändern.
- Gute Beispiele aus freigegebenen Plattformen sammeln (nach Gate 2, mit Einverständnis), je Figur eines. Rotieren, nie alle gleichzeitig.
- Die Negativbeispiele ("so nicht") sind bewusst typische Branchenfloskeln. Sie dürfen Klischees enthalten, die Prüfung ignoriert dieses Feld.

### 4.7 Regeln gegen Floskeln

| Statt | Schreib | Warum |
|---|---|---|
| Adjektiv über sich selbst ("kompetent", "erfahren") | Zahl mit Ort und Zeitraum ("14 Abschlüsse 2025") | Belege statt Behauptungen, Fähigkeit wird gezeigt |
| "Ihr Partner für Immobilien" | Wen, wo, welches Objekt ("Zinshäuser in Sievering") | Spezifität, der Satz passt nur auf einen |
| "Individuelle Beratung" | Das eine Verhalten, das es beweist ("Ich habe zum Warten geraten") | Wohlwollen zeigt sich im Handeln gegen den eigenen Vorteil |
| "Exklusiv", "Luxus", "Premium" | Material, Baujahr, Lage, Zahl | Wertigkeit über Substanz |
| "Jetzt anfragen" | Ein Anlass und eine Einladung ("Schicken Sie das an Ihre Miterben.") | Weiterleiten zählt für Reichweite mehr als Likes |
| Gattungsname als Serie ("Markt-Update") | Eigenname mit Ort oder Haltung ("Sievering in Zahlen", "Noch nicht verkaufen") | Wiedererkennbarkeit, Distinctive Asset |
| Aspiration ("der beste Makler Wiens") | Heutiges Fremdbild plus Richtung ("genau, ruhig, verlässlich") | Actual-Self-Regel, Malär 2011 |
| Erfundene Wende | "Kommt aus dem Workshop: Wendepunkt" | Glaubwürdigkeit, Integrität |

Dazu: kein Satz über zwanzig Wörter in öffentlichen Texten, keine zwei Adjektive hintereinander, jede Kennzahl nur einmal pro Text.

---

## 5. Musterbeispiel: Markus Leitner, Döbling, Zinshaus, Kenner, Sie

Handgeschrieben als Zielbild für Mensch und Maschine. Grundlage sind ausschließlich seine Antworten im Fragebogen (Seed `markus`) und die Workshop-Mitschrift vom 11.09.2026. Was dort nicht steht, ist als Lücke markiert.

### 5.1 Einsicht

**Zielgruppe.** Erbengemeinschaften und Anleger in Döbling, Währing und Hietzing, die ein Zinshaus oder eine Altbauwohnung halten. Wohnwelten: die gute Adresse und am Puls. Sie wollen nicht überredet werden, sie wollen verstehen, bevor sie unterschreiben.

**Spannung.** Ein geerbtes Zinshaus bringt Zeitdruck an den Familientisch, und der Markt bezahlt Geduld. Wer verkauft, weil es eilt, lässt Geld liegen. Wer warten will, braucht jemanden, der sagt, dass Warten erlaubt ist. Und bevor das erste Gespräch beginnt, steht die Provision im Raum.

**Konvention.** Zinshaus-Vermarktung in Wien spricht die Sprache der Transaktion: Rendite, Fassade, Off-Market, Diskretion als Schlagwort. Über die Entscheidung vor dem Verkauf spricht kaum jemand, weil daran niemand verdient.

**Weiße Stelle.** Der Makler, der auch "noch nicht" sagt. Markus hat einer Erbengemeinschaft geraten, zwei Jahre zu warten, statt unter Druck zu verkaufen. Sie kam mit 600.000 mehr zurück. Das ist kein Werbesatz, das ist ein Beleg.

### 5.2 Drei Territorien und die Auswahl

| Territorium | Kernidee | Claim-Idee | Beleg | Risiko |
|---|---|---|---|---|
| A. Der Zeitpunkt | Warten ist eine Leistung, keine Schwäche | Zeit ist Teil des Preises. | Abraten, 600.000 mehr nach zwei Jahren | Klingt nach Verzögerung, wenn Belege für schnelle Verkäufe fehlen |
| B. Das lesbare Haus | Das Zinshaus als Dokument: Grundbuch, Mietverträge, Zahlen | Der Markt wird lesbar. | Grundbuch-Termin jeden Dienstag, Herkunft aus Finanz und Recht | Sachlich bis kühl, schwer unterscheidbar von Research-Accounts |
| C. Zinshäuser von klein auf | Herkunft: der Großvater verwaltete Zinshäuser, Döbling als Heimat | Zinshäuser kenne ich von klein auf. | Aufgewachsen in Döbling, Elternhaus in Grinzing | Nostalgie ohne Nutzen für den Kunden, Familie ist Tabu im Bild |

| Kriterium (0 bis 5) | A | B | C |
|---|---|---|---|
| Spezifität | 5 | 4 | 4 |
| Unterscheidbarkeit | 5 | 3 | 4 |
| Glaubwürdigkeit | 5 | 4 | 3 |
| Anschluss (genau, ruhig, verlässlich; Sie; keine Familie im Bild) | 5 | 5 | 3 |
| Umsetzbarkeit (2 bis 4 Stunden im Monat, LinkedIn zuerst) | 4 | 5 | 3 |

Gewählt: **A. Der Zeitpunkt.** B wird die Beweisebene (Zahlen, Grundbuch, der Dienstag), C wird die Herkunft in der Story. Schärfung: Der Zeitpunkt darf nie wie Zögern klingen, darum steht neben jeder Warte-Geschichte ein schneller Beleg (Zinshaus Sievering, 4,2 Mio., 11 Wochen).

### 5.3 Positionierung

> Für Erbengemeinschaften und Anleger in Döbling, Währing und Hietzing, die ein Zinshaus oder einen Altbau halten, ist Markus Leitner der Makler, der den richtigen Zeitpunkt vor den schnellen Abschluss stellt. Anders als Vermittler, die vom Abschluss leben und deshalb immer zum Verkauf raten, sagt er auch: noch nicht. Einer Erbengemeinschaft riet er, zwei Jahre zu warten. Sie kam mit 600.000 mehr zurück.

- **Versprechen:** Sie wissen, was Ihr Haus wert ist und wann sich der Verkauf lohnt, bevor Sie unterschreiben.
- **Claim:** Zeit ist Teil des Preises.
- **Alternativen:** Erst verstehen. Dann verkaufen. / Der Markt wird lesbar. (der heutige Claim, bleibt als Abbinder der Zahlen-Serie)
- **Rolle, in seinen Worten:** Der Zinshaus-Mann, dem Notare vertrauen. Das ist Richtung, noch nicht Stimme: Heute sagen Kunden "genau, ruhig, verlässlich", und so klingt jeder Text.

### 5.4 Story in drei Längen

**Kurz** (27 Wörter, Bio und Boilerplate-Einstieg)
> Aufgewachsen in Döbling, mein Großvater hat Zinshäuser verwaltet. Heute verkaufe ich sie in Döbling, Währing und Hietzing. Und ich sage auch, wenn Warten mehr bringt.

**Mittel** (rund 85 Wörter, Website "Über mich")
> Ich bin in Döbling aufgewachsen, das Elternhaus stand in Grinzing, und mein Großvater hat Zinshäuser verwaltet. In die Branche kam ich aus Finanz und Recht. Heute verkaufe ich Zinshäuser, Anleger- und Altbauwohnungen in Döbling, Währing und Hietzing, zuletzt vor allem in Sievering. Eine meiner wichtigsten Beratungen war ein Nein: Einer Erbengemeinschaft habe ich geraten, zwei Jahre zu warten, statt unter Druck zu verkaufen. Sie kam mit 600.000 mehr zurück. Ein Haus verkauft man einmal. Die Entscheidung davor verdient mehr Zeit als das Inserat.

**Lang** (rund 200 Wörter, Pressetext und Präsentation)
> Ich bin in Döbling aufgewachsen, das Elternhaus stand in Grinzing, und mein Großvater hat Zinshäuser verwaltet. Ich kenne diese Häuser also nicht erst aus dem Exposé. In die Branche kam ich aus Finanz und Recht, und mein fester Termin in der Woche ist bis heute der im Grundbuch, dienstags.
>
> Wer ein Zinshaus erbt, erbt oft auch Zeitdruck. Mehrere Menschen am Tisch, und die Frage, was der Makler eigentlich kostet. Wer dann schneller verkauft, als der Markt es verlangt, lässt Geld liegen.
>
> [Kommt aus dem Workshop: Wendepunkt]
>
> Eine meiner wichtigsten Beratungen war ein Nein. Einer Erbengemeinschaft habe ich geraten, zwei Jahre zu warten, statt unter Druck zu verkaufen. Sie kam mit 600.000 mehr zurück. Wenn es passt, geht es auch schnell: Das Zinshaus in Sievering war nach 11 Wochen verkauft, um 4,2 Millionen. 2025 waren es 14 Abschlüsse. Von meinen letzten zehn lagen sechs bis acht in Sievering, zwischen Sieveringer Straße und Agnesgasse.
>
> Ein Haus verkauft man einmal. Die Entscheidung davor verdient mehr Zeit als das Inserat. Sie sollen wissen, was Ihr Haus wert ist und wann sich der Verkauf lohnt, bevor Sie unterschreiben.

Hinweis zur Prüfung: "sechs bis acht" ist seine Spanne aus dem Fragebogen. Vor Veröffentlichung die genaue Zahl erfragen und einsetzen.

### 5.5 Zwei Serien mit Beispielen

**Serie "Noch nicht verkaufen"** (Säule Meinung, 15 Prozent, alle zwei Wochen, Talking Head auf LinkedIn, Zweitverwertung Instagram)

Idee: Die Haltung hinter dem Abraten wird zur Serie. Jede Folge erzählt eine Entscheidung vor dem Verkauf, zuerst die Entscheidung, dann die Rechnung dahinter, dann das Ergebnis. Ruhig, 45 Sekunden, ohne Musik. Neben jeder Warte-Geschichte steht in der Caption ein schneller Beleg, damit Warten nie wie Zögern klingt.

Ablauf: Situation aus der Praxis wählen und anonymisieren. Entscheidung in einem Satz. Rechnung in drei Zahlen, jede mit Quelle. Ergebnis. Markt ja, Politik nein: Mietrecht nur als Folge für Eigentümer, nie als Parteifrage.

Hook-Formel: "Warum ich [wem] vom [Schritt] abgeraten habe."

| Titel | Hook (erstes Bild, ohne Ton lesbar) | Skizze |
|---|---|---|
| Zwei Jahre warten | Ich habe vom Verkauf abgeraten. Hier ist die Rechnung. | Seine Geschichte in eigenen Worten: Erbengemeinschaft, Rat zu warten statt unter Druck zu verkaufen, 600.000 mehr. Danach die Rechnung, warum Warten mehr gebracht hat [Zahlen aus dem Fall, kommt aus dem Workshop], und der Satz, wann Warten nicht hilft. |
| Wann Warten nichts bringt | Warten ist kein Prinzip. Drei Fälle, in denen es schadet. | Gegenprobe zur Haltung, damit sie glaubwürdig bleibt: drei Situationen, in denen er zum raschen Verkauf rät [Fälle kommen aus dem Workshop]. Schlusssatz "Zeit ist Teil des Preises." |
| Die Frist am Familientisch | Mehrere Erben, eine Frist. Wer entscheidet? | Carousel in sechs Kacheln: wer im Grundbuch steht, was einstimmig sein muss, was eine Frist auslöst, wann ein Notar dazu gehört. Allgemein erklärt, ohne Rechtsberatung, Quelle auf der letzten Kachel. |

**Serie "Sievering in Zahlen"** (Säule Markt und Grätzl, 35 Prozent, einmal im Monat als Carousel, dazu 45 Sekunden Talking Head mit der wichtigsten Zahl)

Idee: Einmal im Monat drei Zahlen zu Sievering, Döbling und Währing: Kaufpreis je m², Zeit bis zum Anbot, ein eigener Abschluss als Einordnung. Keine Prognose, nur was sich belegen lässt. Abbinder: "Der Markt wird lesbar."

Ablauf: Zahlen aus Grundbuch und UNIO-Marktdaten für das Quartal ziehen, Quelle notieren. Eine Frage wählen, die Erben in Sievering gerade stellen. Kachel 1 Frage, Kacheln 2 bis 4 je eine Zahl mit Quelle, Kachel 5 der eigene Fall, Kachel 6 die Einordnung.

Hook-Formel: "[Eine Zahl] in [Grätzl]. Was das für Ihr [Objekt] heißt."

| Titel | Hook | Skizze |
|---|---|---|
| Was ein Zinshaus in Sievering kostet | Ein Zinshaus in Sievering, in drei Zahlen. | Kaufpreise je m² im Quartal [aus Grundbuch und UNIO-Marktdaten], Zeit bis zum Anbot, Spanne der letzten Abschlüsse. Einordnung mit dem eigenen Fall: Zinshaus Sievering, 4,2 Mio., 11 Wochen. |
| Acht Prozent über der Schätzung | 8 Prozent über der Erstschätzung. Woher das kam. | Die Anlegerwohnung in Währing als Fall: Erstschätzung, Vermarktung, Ergebnis. Was den Unterschied gemacht hat [Details kommen aus dem Workshop]. Keine Adresse, keine Namen. |
| Döbling gegen Währing | Döbling gegen Währing: dasselbe Zinshaus, zwei Preise. | Zwei vergleichbare Häuser, zwei Lagen, ein Preisunterschied. Drei Gründe: Lage in der Straße, Zustand, Mietverhältnisse. Quelle: Grundbuch und eigene Abschlüsse. Caption endet mit "Schicken Sie das an Ihre Miterben." |

### 5.6 Konzeptidee: Runder Tisch Sievering, Erben ohne Streit

**Idee.** Einmal im Quartal ein Abend für Familien in Döbling, Währing und Hietzing, die ein Haus geerbt haben. Mit einem Notariat und einer Steuerberatung, höchstens 20 Plätze. Keine Verkaufsveranstaltung, sondern die Fragen, die vor jeder Entscheidung stehen: wer entscheidet, was es kostet zu warten, was es kostet zu verkaufen.

**Warum.** Sein Zinshaus-Abschluss in der Sieveringer Straße kam über den Notar, und sein eigenes Ziel lautet "der Zinshaus-Mann, dem Notare vertrauen". Partner, denen Kunden ohnehin vertrauen, übertragen Vertrauen. Der Ort liegt in seinem eigenen Umfeld (Alteingesessene in Döbling, Väter im Ruderverein): geteilte Zugehörigkeit ist ein starkes Vertrauenssignal (Cialdini, Unity, Evidenz mittel). Und der Abend bedient genau den Anlass, mit dem seine Kunden kommen, bevor sie an Verkauf denken: das Erbe.

**Umsetzung.**
1. Das Notariat anfragen, über das der Sieveringer Abschluss kam [Name kommt aus dem Workshop], dazu eine Steuerberatung im Bezirk.
2. Ort im eigenen Umfeld, etwa im Ruderverein [welcher, kommt aus dem Workshop].
3. Einladung über LinkedIn, Newsletter und die Partner. Drei Fragen vorab sammeln.
4. Am Abend die drei Fragen beantworten. Danach als Carousel-Serie auf LinkedIn verwerten, ohne Namen, Teilnehmer nur mit Einverständnis im Bild.
5. Messen: Gespräche aus dem Abend, Empfehlungen durch die Partner, Anfragen mit Anlass Erbe im Quartal danach.

**Kanal.** Vor Ort, danach LinkedIn und Newsletter.

### 5.7 Lücken, die der Workshop schließt

- Wendepunkt: der Moment, in dem er fast aufgehört hätte, und was ihn umgedreht hat.
- Ein Kundensatz wörtlich. Heute gibt es nur seine eigene Wiedergabe: "Dass sie sich nie gedrängt gefühlt haben."
- Fremdbild von drei Personen (zwei Kunden, ein Kollege).
- Ein beruflicher Fehler mit Lerneffekt. "Fehler und Learnings" darf öffentlich sein, der Text fehlt.
- Die Zahlen hinter den 600.000: Ausgangswert, Zeitraum, was sich geändert hat.
- Provisionssatz und Leistungen für die Serie "Die Provision, ehrlich".
- Was "1902" im Abschluss Sieveringer Straße bedeutet (Baujahr oder Hausnummer), Name des Notariats, Name des Rudervereins.

---

## 6. Einbindung

- `ui_kits/werkbank/wb-plattform.jsx` in `index.html` nach `wb-markenwelten.jsx` und vor `wb-markenbuch.jsx` laden. Die Datei braucht `wb-data.jsx` und `wb-store.jsx`. Die Bildwelt kommt aus `hmWeltVorschlag` in `wb-markenwelten.jsx`, falls geladen: Leitbild, Bildregeln und Zeichen der Welt, ergänzt um Orte, Grenzen und das eigene Zeichen des Maklers. Ohne diese Datei greift die eigene Zuordnung aus Figur, Bildpaaren und Wohnwelten.
- `package.json`: `"@anthropic-ai/sdk"` als Abhängigkeit ergänzen. Vercel: `ANTHROPIC_API_KEY` setzen, optional `HUMAN_MODEL` und `UX_PASSWORT`.
- Im Browser das Passwort für den Aufruf setzen: `sessionStorage.setItem("unio_hm_ux_pw", "...")` oder `window.HM_UX_PASSWORT`. Ohne Passwort fällt der Aufruf auf die Regeln zurück.
- Selbsttest: `hmSelbsttestPlattform()` in der Konsole, 17 Prüfungen.

## 7. Offene Punkte

- Freigabeprozess für Few-Shot-Beispiele aus echten Plattformen (Einverständnis der Makler).
- Vercel-Plan: `maxDuration` 300 Sekunden braucht Pro. Läuft die volle Kette länger, die Phasen `gate1` und `plattform` getrennt aufrufen, wie es der Prozess ohnehin vorsieht.
- Rate-Limit ist im Speicher der Funktion und gilt je Instanz. Für den Betrieb mit vielen Maklern auf einen geteilten Speicher umstellen.
