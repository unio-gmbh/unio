# R4. Software für Marke und Branding: was die Werkzeuge gut machen, wo sie generisch werden

Stand 29.09.2026. Recherche für die Etappe "Branding-Qualität v2" der Werkbank. Ergänzt `docs/werkbank/research/BENCHMARK_MARKE.md`, Abschnitt 2 (Logo- und Brand-Generatoren). Was dort steht, wird nicht wiederholt, sondern vertieft: Warum wird Output generisch, und wie sichern die besten Systeme Konsistenz, ohne eintönig zu werden?

**Belegt** heißt: steht in der verlinkten Quelle. **Ableitung** heißt: unsere Schlussfolgerung. Nur per Suchauszug lesbare Quellen sind markiert.

---

## Kurzfassung

1. Der Markt zerfällt in zwei Familien. **Generatoren** (Looka, Brandmark, Designs.ai, Canva Magic Studio im Neuanlage-Modus) starten bei null und optimieren Tempo. **Systeme** (Canva Brand Kit mit Controls, Adobe Express Brand Kits, Frontify, Brandpad, Corebook, Figma mit Variables und Buzz, Pitch) setzen eine fertige Marke voraus und verteidigen sie im Alltag. Die Werkbank muss beides sein: Sie erzeugt die Marke und verteidigt sie danach im Feed.
2. Generisch wird der Output dort, wo die **Eingabe arm** ist: Name, Branche, drei Stichwörter, eine Farbstimmung. Die Generatoren kombinieren dann aus Bibliotheken, und Marken derselben Branche ähneln sich. Das ist keine Schwäche des Modells allein, sondern der Frage-Tiefe.
3. Die Forschung zeigt dasselbe Muster auf Populationsebene: KI hebt das einzelne Ergebnis und macht die Ergebnisse vieler Nutzer einander ähnlicher (Doshi und Hauser 2024, Anderson u. a. 2024, Wenger und Kenett 2026). Für die Werkbank heißt das: Jeder Makler bekommt einzeln einen guten Vorschlag, aber zwanzig Makler zusammen könnten wie eine Marke aussehen. Das muss gemessen werden.
4. Konsistenz sichern die besten Systeme nicht mit einer Sperre, sondern mit **Sperrstufen**: Position fest, Stil fest und Inhalt offen, Bild tauschbar bei festem Rahmen, ganze Seite fest. Canva lässt seine KI diese Stufen bei der Generierung respektieren.
5. Die Werte selbst gehören in **Tokens mit Begründung**. Der Standard dafür ist seit Oktober 2025 stabil (W3C Design Tokens Format 2025.10), Figma bildet ihn mit Variables, Modes und Aliasen ab. Frontify empfiehlt, jedem Wert einen Satz "warum" beizugeben, damit Maschinen und Menschen ihn richtig anwenden.
6. Die **Stimme** ist in den Massenwerkzeugen die dünnste Stelle (Canva Brand Voice: 500 Zeichen). Genau hier kann die Werkbank sich absetzen.
7. Top-Studios bauen, wenn Skalierung gefragt ist, **eigene Generatoren mit wenigen Reglern** und einem handgemachten Kern (DIA für Nuits Sonores, Pentagram für performance.gov, Patrik Hübner). Das ist das Vorbild für den Social-Feed der Werkbank, nicht Canva.

---

## 1. Befunde mit Quellen

### 1.1 Generatoren: schnell, vollständig, austauschbar

**Belegt.** Looka fragt Name, Branche, Stilvorlieben, Farben und Symbole ab und erzeugt daraus in wenigen Minuten Hunderte Varianten. Eine Designer-Rezension hält fest, dass manche Logos Marken derselben Branche ähneln, weil die KI auf bestehenden Mustern und vorlagengetriebener Erzeugung aufbaut, und dass Icons nicht frei neu gezeichnet werden können ([Kreafolk](https://kreafolk.com/blogs/articles/looka-ai-logo-maker)).

**Belegt.** Brandmark ist der technisch ehrlichste Generator. Der Gründer beschreibt, dass ein Convolutional Net für jedes Icon einen Lesbarkeitswert berechnet und aus den letzten Schichten ein Embedding zieht, mit dem die Ähnlichkeit zu anderen Icons gemessen wird. So werden Symbole gewählt, die lesbar sind und sich von häufigen Formen abheben. Schriften und Icons werden über dieselben Embeddings gepaart, Farbpaletten über Wortvektoren gesteuert ("fiery" gibt gesättigte, "solemn" entsättigte Töne). Er schreibt selbst, dass solche Netze Designer in absehbarer Zeit nicht ersetzen ([Brandmark Intro](https://brandmark.io/intro/)).

**Belegt.** Designs.ai verspricht ein komplettes Brand Kit aus einer Firmen-URL oder einer Beschreibung, mit Logo, Palette, Typografie und dokumentierten Richtlinien ([Designs.ai Logomaker](https://designs.ai/logomaker)). Canva bietet dasselbe als Brand Kit Builder: Logos, Farben, Schriften, Grafiken, Fotos, Brand Voice und Richtlinien werden aus einer Website oder einem PDF gelesen, mit dem Hinweis, dass Ergebnisse variieren und manuell geprüft werden müssen ([Canva Brand Kit Builder](https://www.canva.com/help/brand-kit-builder/)).

**Ableitung.** Alle drei behandeln Marke als Oberfläche: Zeichen, Farbe, Schrift. Keines fragt nach Einsicht, Positionierung, Gegenüber oder Belegen. Die Brandmark-Einzigartigkeit ist "anders als der Icon-Bestand", nicht "wahr für diese Person". Die URL-Übernahme kopiert, was schon da ist, und damit auch die alte Beliebigkeit.

### 1.2 Warum KI-Output konvergiert: die Studienlage

**Belegt.** In einem Experiment mit Kurzgeschichten wurden Texte mit KI-Ideen als kreativer und besser geschrieben bewertet, besonders bei weniger kreativen Autoren. Zugleich waren die KI-gestützten Geschichten einander ähnlicher als die rein menschlichen. Die Autoren nennen das ein soziales Dilemma: einzeln besser, gemeinsam enger ([Doshi und Hauser 2024, Science Advances](https://www.science.org/doi/10.1126/sciadv.adn5290)).

**Belegt.** In einer Nutzerstudie mit 36 Teilnehmenden erzeugten ChatGPT-Nutzer mehr und detailliertere Ideen, aber zwischen verschiedenen Nutzern semantisch weniger unterschiedliche. Sie fühlten sich zudem weniger verantwortlich für ihre Ideen ([Anderson, Shah, Kreminski 2024, Creativity and Cognition](https://dl.acm.org/doi/10.1145/3635636.3656204)).

**Belegt.** Ein Vergleich von 102 Menschen mit 22 Sprachmodellen in drei Kreativitätstests fand: Modelle erreichen oder übertreffen die individuelle Originalität, ihre Antworten sind einander aber deutlich ähnlicher als die von Menschen, unabhängig vom Modell ([Wenger und Kenett 2026, PNAS Nexus](https://academic.oup.com/pnasnexus/article/5/3/pgag042/8529001)).

**Belegt.** Beispiele fixieren. Jansson und Smith zeigten Ingenieuren eine fehlerhafte Beispiellösung. Die Probanden übernahmen deren Merkmale, obwohl die Fehler markiert waren ([Jansson und Smith 1991, Design Studies](https://www.sciencedirect.com/science/article/abs/pii/0142694X9190003F)).

**Belegt.** Viele Optionen schaden nicht immer. Die Metaanalyse über 99 Beobachtungen nennt vier Moderatoren, wann Auswahl überfordert: Komplexität des Angebots, Schwierigkeit der Aufgabe, unklare Präferenz und Entscheidungsziel ([Chernev, Böckenholt, Goodman 2015, Journal of Consumer Psychology](https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf)).

**Ableitung.** Makler vor einer Markenwahl erfüllen drei der vier Moderatoren (komplexe Optionen, schwierige Aufgabe, unklare Präferenz). Sechs Markenwelten gleichzeitig und dazu Dutzende Varianten sind deshalb riskant. Und die Werkbank nutzt Claude für alle Makler: Ohne Gegenmaßnahme wird die Kohorte homogen, auch wenn jeder Einzelvorschlag gut ist.

### 1.3 Konsistenz: Sperrstufen statt Totalsperre

**Belegt.** Canva kennt mehrere Sperrarten in Brand Templates: volle Sperre, nur Position, Text mit gesperrter Formatierung und offenem Inhalt, Bild oder Rahmen mit gesperrten Effekten bei erlaubtem Tauschen und Zuschneiden, Seitensperren und Hintergrundsperren. Sperren setzen nur Admins und Brand Designer vor dem Veröffentlichen. Bei der Neugenerierung nutzt Canva AI die Vorlagen als Leitplanken und respektiert die Sperrstufen ([Canva Template Locks](https://www.canva.com/help/brand-template-locks/)). Brand Controls beschränken Teams auf freigegebene Farben und Schriften und können eine Freigabe vor dem Veröffentlichen verlangen ([Canva Brand Controls](https://www.canva.com/help/brand-control/)).

**Belegt.** Canva AI erzeugt markengerechte Designs aus Brand Kit und Vorlagen nur für feste Formate wie Präsentationen und Social-Media-Designs, nicht für Websites oder Video, und kann wiederverwendbare Komponenten in Vorlagen nicht lesen ([Canva On-Brand AI](https://www.canva.com/help/create-on-brand-designs/)).

**Belegt.** Adobe Express sperrt Logo, Markenname, Schlüssel-Assets und Farbschema; mit "Lock and Restrictions" sehen Mitarbeitende nur Farben und Schriften der verknüpften Marke ([Adobe Express, Lockable Brand Assets](https://adobe.com/uk/express/learn/blog/lockable-brand-assets); [Adobe Help, Template Control](https://helpx.adobe.com/express/web/manage-brands-libraries-and-projects/manage-collaboration/template-control.html), nur Suchauszug). Frontify setzt Sperren per Element für Text und Schrift, Farben und Bilder, mit Vorlagentypen für Digital, Print (CMYK, Beschnitt, InDesign) und Motion ([Frontify Templates](https://help.frontify.com/en/articles/2388448-getting-started-with-frontify-digital-and-print-templates)).

**Belegt.** Figma gibt Designern für Buzz-Vorlagen acht Regeln, darunter: Auto Layout als Rückgrat, eine eigene Textebene je Eingabe, gesperrtes Seitenverhältnis für Bilder, sprechende Ebenennamen, Komponenten-Varianten statt offener Flächen und ein Test aus Nutzersicht auf Überlappungen ([Figma Blog, Buzz-Vorlagen](https://www.figma.com/blog/8-tips-for-designers-building-branded-templates-in-figma-buzz/)). Bulk Create füllt eine Vorlage aus CSV oder XLSX, eine Zeile je Asset; gesperrte Objekte lassen sich dabei nicht befüllen ([Figma Help, Bulk Create](https://help.figma.com/hc/en-us/articles/31271824185623-Bulk-create-assets-in-Figma-Buzz)).

**Belegt.** Pitch setzt Konsistenz über Slide Styles als Voreinstellung für jeden neuen Block ([Pitch Help, Slide Styles](https://help.pitch.com/en/articles/4059534-create-your-own-slide-style)). Beim Vorlagenbau klärt Pitch zuerst Zweck und Inhalt (Outline), bevor gestaltet wird, und entwickelt zwei bis drei Richtungen pro Vorlage ([Pitch Blog, Template-Prozess](https://pitch.com/blog/designing-presentation-templates)).

**Ableitung.** Der Unterschied zwischen "on brand" und "eintönig" liegt in der Stufe. Wer nur hart sperrt, bekommt Serien, die alle gleich aussehen. Wer nur Farben und Schriften erzwingt, bekommt den bekannten Vorlagen-Look. Die guten Systeme sperren Struktur, lassen Inhalt offen und bieten Wahl nur über kuratierte Varianten.

### 1.4 Tokens mit Begründung

**Belegt.** Das Design Tokens Format der W3C Community Group ist seit 28.10.2025 in einer ersten stabilen Fassung verfügbar, mit Theming und Mehrmarken-Unterstützung, modernen Farbräumen (unter anderem Oklch, Display P3) und Aliasen; Figma, Penpot, Sketch, Tokens Studio und Style Dictionary lesen oder schreiben es ([W3C DTCG](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)). In Figma sind Variables Werte (Farbe, Zahl, Text, Wahrheitswert), die in Collections liegen und je Mode andere Werte annehmen; Aliase verketten sie zu Tokens ([Figma Help, Variables](https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes)).

**Belegt.** Frontify beschreibt maschinenlesbare Richtlinien in drei Ebenen (Strategie, Stimme, Visuelles), Tokens in YAML mit Begründungstext, damit Werkzeuge verstehen, warum ein Wert existiert, Stimmregeln als Paare "so sagen wir, so nie", und eine Trennung zwischen verbindlichen Regeln (exakte Werte, Wortverbote) und Ermessensregeln (tonale Nuancen). Menschliche Kontrollpunkte bleiben Pflicht ([Frontify, Brand Guidelines for AI](https://www.frontify.com/en/guide/brand-guidelines-for-ai)).

**Belegt.** Canva Brand Voice fasst die Stimme in höchstens 500 Zeichen ([Canva Brand Voice](https://www.canva.com/help/brand-voice/)).

**Ableitung.** 500 Zeichen reichen für Adjektive, nicht für Regeln. Die Werkbank hat mit `stimme` im Datenvertrag schon mehr. Was fehlt, ist die Begründung am einzelnen visuellen Wert und die harte Trennung "verbindlich" gegen "Ermessen", die Claude und Menschen gleich lesen.

### 1.5 Guidelines-Plattformen der Studios

**Belegt.** Brandpad richtet sich an Studios, die eine fertige Marke als interaktive, gehostete Richtlinie übergeben; genannt werden Nutzer wie Character, IDEO und MoMA ([Brandpad](https://brandpad.io/)). Corebook Studio bietet Zusammenarbeit von Moodboard bis Identität, Vorlagen, White Label und Figma-Import mit automatisch erzeugten Figma-Styles; genannt werden Landor, Dumbar, Mackey Saturday ([Corebook Studio](https://www.corebook.io/studio)). Corebook meldet neu eine Anbindung an Sprachmodelle wie Claude mit Zugriffskontrolle und Nutzungsauswertung der Richtlinien ([Corebook What's New](https://www.corebook.io/whats-new)).

**Belegt.** Im Gespräch zur Zukunft von Richtlinien sagt Nicklas Haslestad (Scandinavian Design Group, Brandpad), erfolgreiche Marken bräuchten ein menschliches Gehirn und Herz, um die Maschine zu führen; Jules Tardy (The New Company) erwartet, dass Richtlinien Werkzeuge je nach Partner zeigen oder verbergen ([The Brand Identity mit Brandpad](https://the-brandidentity.com/insight/the-future-of-brand-guidelines-promises-big-changes-together-with-brandpad-we-decode-whats-to-come)).

**Ableitung.** Die Plattformen sind Übergabe- und Verwaltungswerkzeuge. Sie liefern keine Strategie, aber zwei gute Muster: das Markenbuch als lebendes Dokument statt PDF und eine Sicht je Rolle (Makler, Fotograf, Druckerei).

### 1.6 Wie Top-Studios generieren, ohne generisch zu werden

**Belegt.** DIA baute für das Festival Nuits Sonores einen Generator, den der Kunde selbst bedient. Fest ist die Schrift als Rückgrat, variabel sind Partikelrate, Verlauf, Zug und Clusterbildung, eingestellt über Regler für Tempo und Intensität. Je Format gibt es Schwellenwerte, und je funktionaler das Format, desto strenger die Typografie ([The Brand Identity über DIA](https://the-brandidentity.com/project/dia-studio-builds-a-generative-tool-that-makes-nuits-sonores-pulse-2)).

**Belegt.** Patrik Hübner beschreibt generative Markensysteme als regelgebunden und datengespeist; generatives Design heiße nicht, Kontrolle an Algorithmen abzugeben, sondern eigene Werkzeuge mit klaren Parametern zu bauen ([Patrik Hübner Interview](https://www.patrik-huebner.com/applying-generative-design-to-brand-design/)).

**Belegt.** Pentagram startete für performance.gov mit handgemachten Vorlagen (Farbe und Papierschnitte), trainierte Midjourney darauf und erzeugte über 1.500 Icons; das Projekt wurde in der Branche heftig kritisiert, Paula Scher verteidigte es mit Zeit- und Budgetgründen ([GDUSA](https://gdusa.com/pentagram-federal-website-generates-ai-controversy/)).

**Ableitung.** Das gemeinsame Muster: Ein Mensch macht den Kern von Hand, die Maschine variiert nur entlang weniger benannter Achsen, und Formate haben eigene Grenzen. Das ist das Gegenteil des Generators, der aus einer Bibliothek kombiniert. Die Pentagram-Debatte zeigt auch das Reputationsrisiko, wenn KI sichtbar Handwerk ersetzt.

### 1.7 Adaptive Fragebögen

**Belegt.** Typeform verzweigt je Antwort zu Fragen, Gruppen oder Enden, rechnet mit Variablen (Addieren bis Dividieren, Punkte, Preise) und kann frühere Antworten, Variablen und URL-Parameter in spätere Fragen einsetzen (Recall) ([Typeform Developers, Logic Jumps](https://www.typeform.com/developers/create/logic-jumps/); [Typeform Help, Recall](https://help.typeform.com/hc/en-us/articles/360052320011-Recall-information), nur Suchauszug). Tally kennt sechs Logikaktionen (Seite springen, Wert berechnen, Pflicht machen, Blöcke zeigen oder verbergen, Abschluss sperren, weiterleiten) mit verschachtelten UND- und ODER-Bedingungen ([Tally, Conditional Logic](https://tally.so/help/conditional-form-logic)).

**Ableitung.** Logik ist heute Standard und kostenlos. Der Wert liegt nicht in der Verzweigung, sondern in der Disziplin, nur zu fragen, was den Output ändert, und im Zitieren früherer Antworten, das ein Formular wie ein Gespräch wirken lässt.

---

## 2. Prinzipien

1. **Eingabe-Tiefe schlägt Modellgröße.** Generisch wird es, wenn nur Name, Branche und Stil eingehen. Die Werkbank bleibt bei Einsicht, Belegen und eigenen Worten als Pflicht-Input.
2. **Handgemachter Kern, maschinelle Streuung.** Zeichen, Raster und Schriftpaar jeder Markenwelt sind von Hand gesetzt und abgenommen. Die Maschine variiert nur entlang benannter Regler.
3. **Sperrstufen statt Sperre.** Struktur fest, Stil fest bei offenem Inhalt, Bild tauschbar im festen Rahmen, Wahl nur über Varianten.
4. **Jeder Wert mit Grund.** Kein Token, keine Regel ohne einen Satz "warum". Der Grund steht im Markenbuch und im Prompt.
5. **Verbindlich und Ermessen getrennt.** Claude und Menschen sehen, was nie gebrochen wird und wo Urteil gefragt ist.
6. **Formate haben eigene Grenzen.** Je funktionaler ein Format, desto strenger die Typografie.
7. **Die Kohorte prüfen, nicht nur den Einzelnen.** Ein Vorschlag ist erst gut, wenn er auch neben allen anderen UNIO-Maklern unterscheidbar bleibt.
8. **Wenig, kuratiert, begründet zeigen.** Zwei bis drei passende Wege statt einer Galerie, und Beispiele erst nach der eigenen Festlegung.
9. **Fragen nur mit Wirkung.** Jede Frage hat ein Zielfeld im Datenvertrag, sonst fällt sie weg.
10. **Mensch zeichnet ab.** Die Freigabe vor Veröffentlichung ist kein Zusatz, sondern Teil des Systems (Gates 1 und 2 in `MARKENQUALITAET.md`).

---

## 3. Was die Werkbank konkret übernehmen soll

| Nr. | Übernahme | Vorbild | Stelle in der Werkbank |
|---|---|---|---|
| Ü1 | **Sperrstufen als Daten je Social-Vorlage.** Jedes Feld einer Vorlage trägt eine Stufe: `fest` (Zeichen, Logo, Raster, Folio-Zeile), `stil` (Formatierung fest, Text offen), `rahmen` (Bild tauschbar, Seitenverhältnis und Ausschnittregel fest), `variante` (Wahl aus zwei bis drei vorgefertigten Layouts). Der Makler sieht nur offene Felder. | Canva Locks, Figma Buzz Varianten | Grafik-Generator in `wb-shop2.jsx`, Content in `wb-content.jsx` |
| Ü2 | **Markenwelt als Mode im Token-Format.** `HM_MARKENWELTEN` liefert heute `farben`, `proportion`, `raster`, `schrift`. Daraus drei Ebenen erzeugen: Grundwerte, Bedeutung (`grund`, `text`, `akzent`, `linie`), Bauteil (Folio-Zeile, Fenster 3:4). Je Makler ein Mode, Export im DTCG-Format. Ergänzt die `tokens.json`-Idee aus BENCHMARK_MARKE 2.3 um die Bedeutungsebene. | W3C DTCG 2025.10, Figma Modes | `wb-markenwelten.jsx`, Brand-Kit-Export |
| Ü3 | **Begründung an jedem Wert.** Jeder Token und jede Bildregel bekommt ein Feld `warum`, abgeleitet aus Einsicht oder Territorium. Das Markenbuch zeigt es, `api/wb-marke.js` gibt es Claude mit. | Frontify DESIGN.md | `MARKE_SCHEMA.md`, `wb-markenbuch.jsx` |
| Ü4 | **Stimme als verbindlich und Ermessen.** `stimme` in zwei Listen teilen: harte Regeln (Anrede, Wortverbote, keine Zahlen ohne Beleg) und Ermessen (Wärme, Humor). Dazu je Anlass ein Paar "so sagen wir, so nie". | Frontify, Gegenbeispiel Canva 500 Zeichen | `wb-plattform.jsx`, Regelprüfung `hmMarkenQualitaet` |
| Ü5 | **Vorlagen mit Extremtexten testen.** Vor Freigabe einer Vorlage automatisch mit längstem und kürzestem Inhalt rendern (langer Straßenname, zweizeiliger Hook, fehlendes Bild). `hmGrafikPassend` passt Schriftgrößen schon an; es fehlt der sichtbare Stresstest. | Figma Buzz Tipp 7 | `wb-shop2.jsx` |
| Ü6 | **Feed aus einer Tabelle.** Der Startplan (`start30`) und die Serien werden eine Tabelle, eine Zeile je Beitrag, und füllen die Vorlagen in einem Lauf. Anders als bei Figma bleiben die Sperren dabei aktiv, weil die Werkbank Vorlage und Daten selbst kontrolliert. | Figma Bulk Create | `wb-content.jsx`, Social-Feed-Vorschlag |
| Ü7 | **Regler statt Freiheit.** Je Markenwelt zwei bis drei benannte Regler (etwa Dichte, Ausschnitt, Rhythmus im Feed) mit Grenzwerten je Format (Post 4:5, Story 9:16, Karussell). Je funktionaler das Format (Objekt mit Pflichtangaben), desto enger die Grenzen. | DIA Nuits Sonores, Hübner | `wb-markenwelten.jsx`, Grafik-Generator |
| Ü8 | **Kohorten-Prüfung.** Neue Claims, Hooks und Serientitel gegen alle bisherigen Makler im Bestand vergleichen (im Browser ohne Tokens möglich, etwa über Wortüberlappung). Zu ähnlich heißt zurück in die Kette. Visuell: dieselbe Markenwelt mit gleichem Akzent bei zwei Maklern im selben Bezirk melden. | Brandmark Uniqueness-Score, Homogenisierungsstudien | Regelprüfung, Gate 1 |
| Ü9 | **Recall im Fragebogen.** Spätere Fragen und der Workshop zitieren frühere Antworten wörtlich ("Du hast geschrieben: ..."). Das erhöht das Gesprächsgefühl und zwingt Claude, eigene Worte zu nutzen. | Typeform Recall, Tally Mentions | Fragebogen in `wb-flow.jsx` |
| Ü10 | **Frage-Wirkungs-Logik.** Jede Frage mit Zielfeld und Bedingung hinterlegen; Fragen, deren Zielfeld schon belegt ist oder für den gewählten Weg nicht zählt, werden verborgen. Das ist die technische Seite von STATUS Schritt 2. | Tally Show or Hide, Typeform Branching | `wb-data.jsx`, `wb-flow.jsx` |
| Ü11 | **Freigabe vor Veröffentlichung.** Kein Beitrag verlässt die Werkbank ohne Abnahme; nach Gate 2 genügt die Abnahme des Maklers für Beiträge aus gesperrten Vorlagen, frei gestaltete brauchen das Team. | Canva Brand Controls | Freigabe-Fluss, `MARKENQUALITAET.md` |
| Ü12 | **Markenbuch mit Sicht je Rolle.** Makler, Fotograf, Druckerei und Webdienstleister sehen je nur ihren Teil, mit Downloads am Ort der Regel. | Brandpad, Corebook, Tardy-Zitat | `wb-markenbuch.jsx` |

---

## 4. Was die Werkbank bewusst nicht übernimmt

1. **Keine Logo-Galerie und keine Icon-Bibliothek.** Dutzende Entwürfe ermüden und fixieren auf Branchenmuster. Die Bildmarke bleibt Handarbeit (BENCHMARK_MARKE 2.3).
2. **Kein URL-Import als Markenbasis.** Er übernimmt die bestehende Oberfläche und überspringt die Strategie. Zulässig nur als Bestandsaufnahme im Workshop ("das hast du heute").
3. **Keine Stilwahl über Adjektiv-Kacheln** wie modern, minimal, vintage. Die Richtung folgt aus Figur und Territorium, nicht aus Geschmack im luftleeren Raum.
4. **Keine Stimme in 500 Zeichen.** Adjektive ohne Regeln und Beispiele erzeugen genau die austauschbare KI-Sprache, die vermieden werden soll.
5. **Kein offener Editor für Makler.** Freie Flächen führen zum Vorlagen-Look. Wahl ja, aber nur zwischen kuratierten Varianten.
6. **Keine Totalsperre.** Eine Vorlage, die jede Woche gleich aussieht, macht den Feed eintönig. Serien brauchen Varianten und Regler.
7. **Keine allgemeine Vorlagen-Bibliothek.** Jede Vorlage leitet sich aus der Markenwelt des Maklers ab, nie aus einem Markt für alle.
8. **Keine KI-Bilder als Beleg.** Generierte Bilder dürfen Stimmung skizzieren (Bildwelt fürs Team), aber nie Porträt, Objekt oder Grätzl als echt ausgeben. Die Pentagram-Debatte zeigt das Reputationsrisiko.
9. **Keine Beispielgalerie vor der Festlegung.** Die sechs Markenwelten nicht alle auf einmal zeigen, sondern nur die zwei bis drei, die laut `passtZu` zum gewählten Weg gehören, und erst nach Gate 1.
10. **Keine zusätzlichen Fragen, nur weil Logik es erlaubt.** Verzweigung ist kein Grund, länger zu fragen.

---

## 5. Offene Fragen und Lücken

1. **Ab welcher Kohortengröße trägt die Ähnlichkeitsprüfung?** Wie viele Makler aktuell in der Werkbank sind, ist hier nicht erhoben. Lücke.
2. **Akzeptieren Makler gesperrte Vorlagen?** Es gibt keine Quelle zum Verhalten von Immobilienmaklern gegenüber Sperren. Lücke; im Beweis mit Markus beobachten, ob er Felder vermisst oder umgeht.
3. **Brauchen Makler einen Export nach Canva oder Figma?** Wenn Makler oder Assistenzen dort weiterarbeiten, wäre ein Brand-Template-Export sinnvoll. Canva AI liest aber keine wiederverwendbaren Komponenten, und Schriftlizenzen müssten geklärt sein. Frage an den Owner.
4. **Wie messen wir "nicht generisch"?** Vorschlag: Blindtest, bei dem das Team drei Feeds verschiedenen Maklern zuordnen muss. Ob das als Gate taugt, ist offen.
5. **Wie weit darf Claude die Regler setzen?** Ob Claude die Reglerwerte je Makler vorschlägt oder nur das Team, ist eine Designentscheidung, keine Recherchefrage.
6. **Drei Primärquellen waren nicht direkt lesbar** (Adobe Help, Typeform Recall, Fast Company zu Pentagram). Die Aussagen dazu stützen sich auf Suchauszüge oder Zweitquellen und sollten vor einer Zitierung nach außen geprüft werden.

---

## Quellen

Werkzeuge
1. Canva, Brand Template Locks: https://www.canva.com/help/brand-template-locks/
2. Canva, Brand Controls: https://www.canva.com/help/brand-control/
3. Canva, On-Brand-Designs mit Canva AI: https://www.canva.com/help/create-on-brand-designs/
4. Canva, Brand Voice: https://www.canva.com/help/brand-voice/
5. Canva, Brand Kit Builder: https://www.canva.com/help/brand-kit-builder/
6. Adobe Express, Lockable Brand Assets: https://adobe.com/uk/express/learn/blog/lockable-brand-assets
7. Adobe Help, Template Control (nur Suchauszug): https://helpx.adobe.com/express/web/manage-brands-libraries-and-projects/manage-collaboration/template-control.html
8. Frontify, Brand Guidelines for AI: https://www.frontify.com/en/guide/brand-guidelines-for-ai
9. Frontify Help, Templates: https://help.frontify.com/en/articles/2388448-getting-started-with-frontify-digital-and-print-templates
10. Brandpad: https://brandpad.io/
11. Corebook Studio: https://www.corebook.io/studio
12. Corebook, What's New: https://www.corebook.io/whats-new
13. Brandmark, Deep learning for logo design: https://brandmark.io/intro/
14. Kreafolk, Looka Designer Review: https://kreafolk.com/blogs/articles/looka-ai-logo-maker
15. Designs.ai Logomaker: https://designs.ai/logomaker
16. Figma Help, Variables, Collections, Modes: https://help.figma.com/hc/en-us/articles/14506821864087-Overview-of-variables-collections-and-modes
17. Figma Blog, 8 Tipps für Buzz-Vorlagen: https://www.figma.com/blog/8-tips-for-designers-building-branded-templates-in-figma-buzz/
18. Figma Help, Bulk Create in Buzz: https://help.figma.com/hc/en-us/articles/31271824185623-Bulk-create-assets-in-Figma-Buzz
19. Pitch Help, Slide Styles: https://help.pitch.com/en/articles/4059534-create-your-own-slide-style
20. Pitch Blog, Template-Prozess: https://pitch.com/blog/designing-presentation-templates
21. Typeform Developers, Logic Jumps: https://www.typeform.com/developers/create/logic-jumps/
22. Typeform Help, Recall (nur Suchauszug): https://help.typeform.com/hc/en-us/articles/360052320011-Recall-information
23. Tally, Conditional Logic: https://tally.so/help/conditional-form-logic
24. W3C Design Tokens Community Group, stabile Fassung 2025.10: https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/

Studios und Interviews
25. The Brand Identity mit Brandpad, Zukunft der Richtlinien: https://the-brandidentity.com/insight/the-future-of-brand-guidelines-promises-big-changes-together-with-brandpad-we-decode-whats-to-come
26. The Brand Identity, DIA für Nuits Sonores: https://the-brandidentity.com/project/dia-studio-builds-a-generative-tool-that-makes-nuits-sonores-pulse-2
27. Patrik Hübner, Interview generatives Branding: https://www.patrik-huebner.com/applying-generative-design-to-brand-design/
28. GDUSA, Pentagram und performance.gov: https://gdusa.com/pentagram-federal-website-generates-ai-controversy/

Studien
29. Doshi und Hauser 2024, Science Advances: https://www.science.org/doi/10.1126/sciadv.adn5290
30. Anderson, Shah, Kreminski 2024, Creativity and Cognition: https://dl.acm.org/doi/10.1145/3635636.3656204
31. Wenger und Kenett 2026, PNAS Nexus: https://academic.oup.com/pnasnexus/article/5/3/pgag042/8529001
32. Jansson und Smith 1991, Design Studies: https://www.sciencedirect.com/science/article/abs/pii/0142694X9190003F
33. Chernev, Böckenholt, Goodman 2015, Journal of Consumer Psychology: https://chernev.com/wp-content/uploads/2017/02/ChoiceOverload_JCP_2015.pdf
