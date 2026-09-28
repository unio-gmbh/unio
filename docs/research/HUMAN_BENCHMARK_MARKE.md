# UNIO HUMAN. Benchmark Marke

Stand: 28.09.2026. Recherche zu den Werkzeugen, die einem Makler die Marke bauen: Porträt, Logo, Farben, Brand-Kit, Website, Visitenkarte, Social-Grafik. Bezug: `UNIO_HUMAN_ROADMAP.md` (2.2 On-Boarding, 2.4 Kick-off und Setups, 2.6 Shop und Sonderwünsche) und `UNIO_HUMAN_V5_STUFEN.md` (Stufe 1 Foto-Engine, Stufe 4 Setups).

Frage dahinter: Was machen die besten Lösungen 2025/2026 in Funktion und Design, und was davon passt in das UNIO-Werkzeugmuster (klein, im Browser, ohne Tokens, deterministisch, mit Qualitätswert)?

**Legende**
- **Aufwand:** S bis 1 Tag, M 2 bis 4 Tage, L 1 bis 2 Wochen.
- **Browser ohne Tokens:** ja = läuft vollständig im Browser ohne API-Schlüssel und ohne Sprachmodell; teils = Kern im Browser, Versand oder Daten über Server; nein = Server oder Credits nötig.
- **Priorität:** P1 jetzt (Risiko oder großer Hebel), P2 nächste Stufe, P3 später oder optional.

---

## 0. Kurzfassung

### 0.1 Befunde im Bestand, die sofort zählen

| Befund | Beleg | Folge für UNIO |
|---|---|---|
| Der Zuschnitt lädt `@vladmandic/face-api@1.7.15`. Das Repository ist seit 05.02.2025 archiviert (nur lesbar), das Original `face-api.js` wird seit Januar 2024 nicht mehr gepflegt. | GitHub API, `archived: true`, letzter Push 05.02.2025 | Keine Fehlerbehebungen mehr, TensorFlow.js-Abhängigkeit altert. Umstieg auf MediaPipe Face Landmarker planen. |
| Der Zuschnitt nutzt `@imgly/background-removal@1.7.0`. Die Lizenz ist **AGPL-3.0**. | `LICENSE.md` im npm-Paket | Für eine kommerzielle Plattform rechtlich prüfen lassen: kommerzielle Lizenz bei IMG.LY oder Wechsel auf ein Modell mit MIT- oder Apache-Lizenz. |
| RMBG-1.4 und RMBG-2.0 (Bria) stehen unter CC BY-NC 4.0. | Hugging Face, Modellkarte RMBG-2.0 | Nicht ohne Vertrag mit Bria einsetzen, auch nicht "nur im Browser". |
| remove.bg nimmt ab 01.12.2026, 9:00 MEZ keine Anfragen mehr an, die Funktion wandert zu Leonardo.ai. | Photoroom, Vergleichsseite remove.bg | Falls ein Server-Fallback geplant war: nicht auf remove.bg bauen. Photoroom ist parameterkompatibel. |
| Die Druckdaten legen 3 mm Beschnitt **und Schnittmarken** an. Flyeralarm und Moo wollen keine Schnittmarken, Flyeralarm erwartet 87 × 57 mm (1 mm Beschnitt). | Moo Design Guidelines, Flyeralarm Datenformat und Beschnitt | Druckerei-Profile statt einer festen Einstellung. |
| Seit 01.07.2026 gilt die EAVG-Novelle: Inserate nennen HWB, Endenergiebedarf und Gesamtenergieeffizienzklasse (A bis G). fGEE entfällt, außer bei Ausweisen nach altem Recht. Strafe bis 1.450 Euro je Verstoß, ausdrücklich auch für den Makler. | Energieausweis 360, CHG Rechtsanwälte, ÖVI | Objekt-Teaser auf der Makler-Website und jede Objekt-Grafik brauchen diese Felder. |
| EU AI Act Art. 50 gilt ab 02.08.2026: KI-erzeugte oder manipulierte Bilder realer Personen (Deepfakes) müssen gekennzeichnet werden. | artificialintelligenceact.eu, Stibbe | KI-Headshots oder generierte Markenbilder mit dem Makler nur mit Kennzeichnung. Der klassische Zuschnitt ist nicht betroffen. |

### 0.2 Die zehn wichtigsten Empfehlungen

| Nr. | Empfehlung | Bereich | Priorität |
|---|---|---|---|
| 1 | Lizenzen im Zuschnitt klären: AGPL (imgly) ablösen oder lizenzieren, RMBG meiden, Kandidaten BiRefNet_lite (MIT) und MODNet (Apache 2.0) messen | Porträt | P1 |
| 2 | Gesichtserkennung auf MediaPipe Face Landmarker umstellen und Haltung prüfen (Kopfdrehung, Neigung, Augen offen) | Porträt | P1 |
| 3 | Druckerei-Profile (Flyeralarm, Standard 2 mm, Moo) mit Preflight nach Moo-Regeln: 8 pt, 0,5 pt, 300 ppi, keine Marken | Print | P1 |
| 4 | Energiekennzahlen nach EAVG-Novelle als Pflichtfeld in Website-Objekten und Objekt-Grafiken, mit Prüfung | Website, Grafik | P1 |
| 5 | Logo-Varianten mit Schutzzone und Mindestgröße als Daten, die jedes Werkzeug prüft | Logo | P1 |
| 6 | Kontrastsichere Farbstufen aus dem Akzent (Leonardo-Prinzip), als Tokens im Brand-Kit | Farbe | P1 |
| 7 | Grafikvorlagen als Ebenen-Vertrag (Bannerbear-Prinzip) mit Textregeln und 3:4 als Primärformat | Grafik | P1 |
| 8 | Zwei Website-Wege: "Immobilie bewerten" und "Immobilie finden", Vertrauenssignale direkt am Formular | Website | P1 |
| 9 | Logo-im-Einsatz-Vorschau: Profilkreis, Favicon 16 px, Visitenkarte, Website-Kopf auf einen Blick | Logo | P2 |
| 10 | Lokale Sichtbarkeit: Bezirksseite, JSON-LD mit identischem NAP, Google-Business-Checkliste, Bewertungs-QR auf der Visitenkarte | Website | P2 |

---

## 1. Porträt und Headshots

### 1.1 Was die Besten machen

| Lösung | Funktion | Design und Ablauf | Relevanz für UNIO |
|---|---|---|---|
| **remove.bg** | Reine Freistell-API, Parameter `crop`, `bg_color`, `size` | Ein Knopf, Ergebnis sofort | Wird am 01.12.2026 abgeschaltet. Kein Fundament. |
| **Photoroom** | Freistellen, Schatten, Relight mit Porträt-Modus, KI-Hintergründe, Stapel; Profilbild-Werkzeug mit Rund-Zuschnitt | Vorlagen je Zielformat, Stapel über tausende Bilder | Muster: Zuschnitt je Zielform (Kreis, Quadrat), Relight als Idee für schlecht belichtete Fotos |
| **Adobe Express** | Firefly-Freistellen mit feinen Haaren, Hintergrund tauschen, Generative Expand | Freistellen, dann direkt weiter ins Layout | Muster: Haarkante als Qualitätsmerkmal; Expand nur als Server-Option |
| **Aragon, HeadshotPro** | KI-Headshots aus 6 bis 15 Selfies, Branchen-Flow "Realtor", Kleidung und Hintergrund wählbar | Geführter Upload mit klaren Foto-Regeln; Aragon rund 90 % brauchbare Bilder, HeadshotPro 50 bis 60 %, dafür Team-Konsistenz | Muster: Upload-Coaching und Team-Einheitlichkeit. KI-Porträts selbst nur mit Kennzeichnung (AI Act) |
| **Brokerage-Richtlinien** (Compass, Sotheby's) | Einheitlicher Hintergrund (Compass off-white, Sotheby's grau), gleiche Kopfgröße, gleiche Schulterbreite, gleiche Augenlinie | Teamseite wirkt gestaltet statt zusammengewürfelt | Deckt sich mit der UNIO-Guideline (Nase 50 % / 73 %). Bestätigt den Ansatz. |
| **Headshot-Regeln** | Augen im oberen Drittel, Gesicht füllt 60 bis 70 %, Regel 20/60/20 für Luft, Kinn nie anschneiden, Platz für spätere Quadrat-Crops | | Prüfwerte für Scheitel- und Kinnfreiheit |
| **ICAO / ISO 19794-5 und 39794-5** | Augen offen, Iris sichtbar, Kopf frontal mit engen Toleranzen für Drehung, Neigung, Kippung | Maschinell prüfbare Kriterien | Vorbild für die Haltungsprüfung, lockerer als beim Pass |

**Browser-Modelle im Vergleich**

| Modell | Lizenz | Größe | Stärke | Einsatz |
|---|---|---|---|---|
| ISNet über `@imgly/background-removal` (heute im Einsatz) | Bibliothek AGPL-3.0, ISNet-Gewichte Apache 2.0 | klein rund 40 MB, mittel rund 80 MB | Robust, einfache API, WebGPU | Lizenz klären |
| BiRefNet_lite, BiRefNet-portrait (ONNX) | MIT | größer als ISNet, vorher messen | Beste Kanten, eigene Porträt-Variante | Kandidat für Qualität am Desktop |
| MODNet (ONNX, WebNN) | Apache 2.0 | rund 25 MB | Porträt-Matting ohne Trimap, Haare | Kandidat für Handy |
| RMBG-1.4 / 2.0 (Bria) | CC BY-NC 4.0 | 2.0 speicherhungrig im Browser | Sehr gut | Nicht ohne Vertrag |
| MediaPipe Face Landmarker | Apache 2.0 | wenige MB | 478 Landmarken, Blendshapes (Augen, Lächeln), Transformationsmatrix (Kopfhaltung) | Ersatz für face-api |
| MediaPipe Image Segmenter (Selfie) | Apache 2.0 | klein | Echtzeit, für Nähe unter 2 m | Nur Vorschau, zu grob für Druck |

### 1.2 Muster für UNIO

| Nr. | Muster | Vorbild und Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|---|
| 1.1 | **Lizenzsauberes Freistellen.** imgly entweder kommerziell lizenzieren oder ersetzen. Testreihe mit den vier Studiofotos aus Stufe 1: BiRefNet_lite und MODNet über ONNX Runtime Web (WebGPU, WASM als Rückfall), Kantenqualität an Haaren, Zeit am Handy, Modellgröße. Modell vorab laden und cachen. | [imgly Lizenz](https://unpkg.com/@imgly/background-removal@1.7.0/LICENSE.md), [BiRefNet (MIT)](https://github.com/ZhengPeng7/BiRefNet), [BiRefNet_lite ONNX](https://huggingface.co/onnx-community/BiRefNet_lite-ONNX), [MODNet](https://github.com/ZHKKKe/MODNet), [RMBG-2.0 Lizenz](https://huggingface.co/briaai/RMBG-2.0) | Foto Termin und Foto Upload | M | ja | P1 |
| 1.2 | **Haltungsprüfung mit MediaPipe.** Face Landmarker ersetzt face-api. Aus der Transformationsmatrix Drehung, Neigung und Kippung ablesen; aus den Blendshapes `eyeBlinkLeft/Right` "Augen geschlossen" erkennen. Neue Hinweise: "Kopf stark gedreht", "Augen geschlossen", "Kopf geneigt". Der Score bekommt einen Haltungsanteil. Nasenspitze bleibt Anker, damit die Guideline gleich bleibt. | [MediaPipe Face Landmarker Web](https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js), [face-api archiviert](https://github.com/vladmandic/face-api), [ICAO 9303 Überblick](https://photogov.net/knowledge/standards/icao-9303-biometric-standards/) | Foto Termin und Foto Upload | M | ja | P1 |
| 1.3 | **Ein Porträt, drei Zielformen.** Aus den Landmarken neben dem Guideline-Zuschnitt einen Kreis-Avatar (Gesicht mittig, Kinn und Scheitel frei) und ein Quadrat für Portale ableiten, statt `object-position`. Prüfung "Scheitel angeschnitten" und "Kinn angeschnitten". Deckt den offenen Punkt aus Stufe 1. | [Photoroom Profilbild](https://www.photoroom.com/tools/profile-picture-maker), [Headshot-Crop-Regeln](https://business-headshots.ai/how-to-crop-and-size-headshots), [HousingWire Headshot-Tipps](https://www.housingwire.com/articles/realtor-headshots/) | Shop Setup Foto und Logo, Website Setup mit Foto-Termin | S | ja | P1 |
| 1.4 | **Upload-Coaching und erweiterte Qualität.** Vor dem Upload drei Bildregeln (Augenhöhe, Licht von vorn, ruhiger Hintergrund), wie HeadshotPro und Aragon sie zeigen. Im Score zusätzlich: Überstrahlung im Gesicht (Anteil geclippter Pixel), Farbstich der Haut, effektive Auflösung je Ziel (Visitenkarte 300 ppi, Website-Hero 2000 px). Hinweise bleiben Klartext. | [Aragon Realtor-Flow](https://www.aragon.ai/headshots/real-estate-headshots), [Laplace-Varianz](https://pyimagesearch.com/2015/09/07/blur-detection-with-opencv/), [Dynamsoft Qualitätsprüfung](https://www.dynamsoft.com/codepool/quality-evaluation-of-scanned-document-images.html) | Foto Termin und Foto Upload | S | ja | P2 |

**Bewusst nicht übernehmen (vorerst):** KI-Headshots im Stil von Aragon. Sie brauchen Server und Credits, und ab 02.08.2026 greift die Kennzeichnungspflicht aus Art. 50 AI Act für Bilder realer Personen. Wenn überhaupt, als Shop-Leistung mit Kennzeichnung, nie als Standard.

### 1.3 Typische Fehler, die UNIO vermeiden soll

1. **Ein Zuschnitt für alle Formen.** Der Kreis im Instagram-Profil schneidet Kinn oder Scheitel ab, Portale schneiden quadratisch. Zielformen aus den Landmarken ableiten, nicht nachträglich verschieben.
2. **Überbearbeitung.** Geglättete Haut und generierte Porträts erzeugen einen Bruch beim ersten Termin. Aragon selbst rät: das Foto muss aussehen wie die Person heute. Retusche begrenzen, KI-Bilder kennzeichnen.
3. **Freistellkanten nur auf Weiß geprüft.** Haar-Halos und Farbsäume fallen erst auf dunklen Looks oder auf dem Akzent auf. Die Vorschau im Zuschnitt sollte das Ergebnis auf hell, dunkel und Akzent zeigen, und der Score sollte Randsäume erkennen.

---

## 2. Logo- und Brand-Generatoren

### 2.1 Was die Besten machen

| Lösung | Varianten | Schutzzone, Kontrast | Export | Design und Ablauf |
|---|---|---|---|---|
| **Looka** | Farbvarianten, transparenter Hintergrund | keine eigene Regel sichtbar | PNG, SVG, EPS, PDF; Brand Kit mit 300+ Vorlagen, Profil- und Titelbilder, E-Mail-Signatur | Logo sofort auf Mockups (Visitenkarte, Schild, Social). Farben und Schriften gehen automatisch ins Brand Kit. |
| **Brandmark** | Name, Schlagwörter, Farbstil, daraus Varianten | Empfehlungen zu Logo-Nutzung, Farbpsychologie, Schriftpaarung | Vektor, Visitenkarten, Social-Kit, Briefpapier | Einmalzahlung, Guide wird mitgeliefert |
| **Canva Brand Kit** | Logos, Farben, Schriften, Fotos, Brand Voice | Guidelines je Asset mit Do und Don't; Brand Controls erlauben nur freigegebene Farben und Schriften; Locks in Vorlagen | PNG, SVG | Brand Kit Builder liest Logo, Farben und Schriften aus einer Website oder einem PDF |
| **Frontify** | Mindestens primär, sekundär, Farbvarianten (invers, mono), Ausrichtungen (horizontal, vertikal) | Schutzzone und Mindestgröße Pflicht; Do und Don't als Bild statt Text | Download direkt aus der Guideline | Richtlinie und Dateien an einem Ort |
| **Figma-Brand-Kits** | Eigene Seite für alle Varianten: horizontal, gestapelt, Icon, je hell und dunkel | | Exportvorgaben pro Variante | Übergabe-Dokument für Kunden |
| **Favicon-Praxis 2026** | favicon.ico, SVG, 180 px Apple Touch, 192 und 512 px für das Manifest | Details mittig mit Innenabstand, keine feinen Linien bei 16 px | | Drei bis fünf Dateien reichen |

### 2.2 Muster für UNIO

| Nr. | Muster | Vorbild und Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|---|
| 2.1 | **Varianten mit Regeln als Daten.** Jede Logo-Variante (Wortmarke, Name mit Punkt, Monogramm; je hell, dunkel, mono) bekommt Metadaten: Schutzzone als Vielfaches der Versalhöhe oder des Punktdurchmessers, Mindestbreite in px und mm, erlaubte Hintergründe. Druckdaten, Website-Füller und Grafik-Generator lesen diese Werte und melden Verstöße ("Logo unter 18 mm", "Schutzzone verletzt"). | [Frontify Logo-Guidelines](https://www.frontify.com/en/guide/logo-usage-guidelines), [Frontify Brand Standards](https://www.frontify.com/en/guide/brand-standards), [Schutzzone mit X](https://squareballoon.co.uk/blog/how-to-correctly-space-a-logo-what-x-means-in-branding-and-brand-guidelines/) | Branding Setup | M | ja | P1 |
| 2.2 | **Logo im Einsatz, sofort.** Neben dem Editor eine Tafel mit echten Größen: Instagram-Profilkreis, Favicon 16 und 32 px, Visitenkarte 1:1 in mm, Website-Kopf mobil, Objekt-Grafik. Der 16-px-Test zeigt, ob das Monogramm trägt. | [Looka Brand Kit](https://looka.com/brand-kit/), [Looka Review](https://www.wpcrafter.com/review/looka-logo-generator/) | Branding Setup | S | ja | P2 |
| 2.3 | **Brand-Kit vervollständigen.** Das ZIP (heute 18 Dateien) ergänzen um: Favicon-Set (ICO, SVG, 180, 192, 512), Profilbild (Monogramm oder Porträt im Kreis), E-Mail-Signatur als HTML, ein Brand-Sheet als PDF mit Do- und Don't-Bildern, `tokens.json` im W3C-DTCG-Format und `brand.css`, Lizenzdateien der Schriften. | [Evil Martians Favicon](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs), [Figma Branding Toolkit](https://www.figma.com/community/file/1413474835383606317/branding-toolkit), [Leonardo Tokens](https://github.com/adobe/leonardo) | Branding Setup, Shop Setup Foto und Logo | S | ja | P2 |
| 2.4 | **Brand Controls und Locks.** In Grafik-Generator und Website-Füller nur Farben und Schriften aus dem Kit. Logo, Porträt-Maske, Pflichtangaben und Energiekennzahlen sind gesperrte Ebenen; Makler tauschen nur Text und Bild. | [Canva Brand Controls](https://www.canva.com/help/brand-control/), [Canva Template Locks](https://www.canva.com/help/brand-template-locks/) | Standard Format, Automation | M | ja | P2 |

**Optional (P3):** Rebranding-Import aus einer bestehenden Makler-Website wie der Canva Brand Kit Builder: URL rein, Logo, Farben und Schriften als Vorschlag. Braucht einen Server zum Abrufen (CORS), aber keine Tokens. Quelle: [Canva Brand Kit Builder](https://www.canva.com/help/brand-kit-builder/).

### 2.3 Typische Fehler, die UNIO vermeiden soll

1. **Nur eine Logo-Form.** Eine horizontale Wortmarke ist im Profilkreis und im Favicon unlesbar. Mindestens Wortmarke, kompakte Form und Monogramm, jeweils hell, dunkel und einfarbig.
2. **Zu viele generische Vorschläge.** Looka und Brandmark zeigen Dutzende Entwürfe. Das ermüdet und endet oft beim beliebigsten. UNIO sollte drei kuratierte Vorschläge im UNIO-Rahmen zeigen, keine Symbol-Clipart (die Bildmarke bleibt Handarbeit im Shop, siehe Stufe 4).
3. **Schriftlizenz übersehen.** Pfade aus einer Schrift sind nur so frei wie ihre Lizenz. Nur OFL oder geprüfte Lizenzen anbieten, für jede Schrift (auch Power Grotesk) die Lizenz dokumentieren und ins Kit legen.

---

## 3. Makler-Websites

### 3.1 Was die Besten machen

| Lösung | Stärke | Schwäche | Relevanz für UNIO |
|---|---|---|---|
| **Luxury Presence** | Starke Lead-Erfassung: gespeicherte Suchen, Suchalarme, gesperrte Objektdetails; CRM, Bewertungs-Landingpages, hyperlokale Inhalte, Schema-Leitfaden | Teuer, US-MLS-zentriert | Muster Lead-Wege und Bewertungsstrecke |
| **AgentFire** | WordPress mit Makler-Modulen: Bezirksguides, Marktberichte, Bewertungs-Landingpages; stark bei lokalem SEO | Pflegeaufwand | Muster Bezirksseite |
| **Placester** | Günstig, schnell | Begrenzte SEO- und Designfreiheit, viele wachsen heraus | Warnung vor Starterseiten ohne Tiefe |
| **Real Geeks** | CRM, Anbindung an Facebook-Anzeigen, automatische Marktberichte, Leads in Tagen | Design zweitrangig | Muster: Website als Teil des Lead-Flusses |
| **Webflow-Templates** (Salama, Altnest, Bricksio) | CMS-Objekte, Galerien, Nachbarschaft, Anfrage je Objekt, von KI gut lesbare Struktur | Pflege durch Profis | Muster KI-lesbare Struktur |
| **Durable** | Drei Fragen, Seite in rund 30 Sekunden, mit CRM und Rechnungen | Tests zeigen Seiten "aus derselben Template-Familie mit anderen Farben" | Warnung vor Einheitslook |
| **Framer AI (Wireframer)** | Prompt ergibt responsives Layout in unter 60 Sekunden, danach Feinschliff wie in Figma, Sektionen per Befehl ergänzen | Braucht Designer für Qualität | Muster: Automatik liefert Rohbau, Mensch den Schliff |

**Was die besten Makler-Seiten gemeinsam haben** (Placester, The Close, Luxury Presence, involve.me):
- Getrennte Wege für Verkäufer ("Was ist meine Immobilie wert?") und Käufer ("Immobilie finden").
- Vertrauen direkt am Formular: Verkäufe, Jahre, Bewertungen, echte Zitate.
- Persönliche Marke neben den Objekten (Beispiel Ryan Serhant).
- Typische Conversion 1 bis 3 %, starke Seiten 4 bis 5 %. Der Unterschied liegt meist im Ablauf, nicht im Look.

**Lokales SEO:** Das Google-Unternehmensprofil ist der wichtigste lokale Faktor. Name, Adresse und Telefon (NAP) müssen überall identisch sein. Schema `RealEstateAgent` und `LocalBusiness` hilft beim Verständnis, ist laut Google aber kein direkter Ranking-Faktor. FAQ-Rich-Results zeigt Google seit 07.05.2026 nicht mehr an.

**Bewertungen:** Google-Rezensionstexte nicht kopieren. Erlaubt sind die Places API (höchstens fünf Rezensionen, mit Autor und Quelle), autorisierte Widgets oder eigene Testimonials mit Einwilligung.

**Österreich:**
- **Impressum:** ECG § 5, MedienG § 25, UGB, GewO. Dazu kommen GISA-Zahl, Gewerbebehörde, WKO mit Fachgruppe der Immobilien- und Vermögenstreuhänder, der Verweis auf IMV und MaklerG (RIS), Firmenbuch, UID, die Streitschlichtung und empfohlen die Vermögensschadenhaftpflicht. Der Link steht im Footer jeder Seite, höchstens zwei Klicks, auch auf Social-Kanälen. Strafen bis 3.000 Euro (ECG) und bis 20.000 Euro (MedienG).
- **Energieausweis in Inseraten:** Seit 01.07.2026 HWB, Endenergiebedarf und Klasse A bis G; Übergang HWB plus fGEE für alte Ausweise. Gilt für Print und elektronische Medien, also auch für Objekt-Teaser und Social-Posts.
- **Barrierefreiheit:** Das BaFG gilt seit 28.06.2025. Kleinstunternehmen (unter 10 Personen und höchstens 2 Mio. Euro) sind bei Dienstleistungen ausgenommen, das betrifft viele Einzelmakler. UNIO als Plattform sollte trotzdem WCAG 2.2 AA anstreben.
- **Kein MLS/IDX:** Die US-Kernfunktion IDX gibt es in Österreich nicht. Objekte kommen aus dem UNIO-Bestand, Portale sind willhaben und ImmoScout24.

### 3.2 Muster für UNIO

| Nr. | Muster | Vorbild und Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|---|
| 3.1 | **Zwei Wege statt Kontaktbox.** Jedes Template bekommt "Immobilie bewerten" (mehrstufig: Objektart, Bezirk, Fläche, Zustand, Kontakt zuletzt) und "Suchauftrag". Neben dem Formular Vertrauenssignale aus HUMAN-Daten: Verkäufe, Bewertungen, ein Zitat, das Porträt. Versand über den bestehenden Lead-Endpoint. | [Luxury Presence Bewertungsseiten](https://www.luxurypresence.com/blogs/home-valuation-landing-pages-capture-seller-leads/), [involve.me Beispiele](https://www.involve.me/blog/real-estate-landing-page-examples), [Placester 24 Beispiele](https://placester.com/real-estate-marketing-academy/real-estate-website-design-24-best-examples) | Website Setup mit Foto-Termin | M | teils | P1 |
| 3.2 | **Rechts-Check statt nur Impressum-Prüfer.** Der bestehende Prüfer (ECG, MedienG, GewO) wird erweitert: EAVG-Felder je Objekt (HWB, EEB, Klasse; alte Ausweise HWB und fGEE), Datenschutzerklärung vorhanden, Cookie-Hinweis nur bei Tracking, Impressum-Link in der Instagram-Bio (Konten-Assistent), Hinweis auf BaFG-Ausnahme. Ampel wie beim Abgabe-Check. | [onOffice Impressum Makler](https://at.onoffice.com/blog/rechtliches/das-impressum-fuer-immobilienmakler-warum-es-mehr-als-eine-pflichtangabe-ist/), [WKO Impressum PDF](https://www.wko.at/oe/internetrecht/das-korrekte-website-impressum.pdf), [EAVG-Neuerungen 2026](https://www.energieausweis360.at/energieausweis-neuerungen-2026), [CHG zur EAVG-Novelle](https://www.chg.at/novelle-des-energieausweis-vorlage-gesetzes/), [BaFG Kleinstunternehmen](https://www.sozialministeriumservice.gv.at/Marktueberwachung_digitale_Barrierefreiheit/Informationen_fuer_Unternehmen/Ausnahme_Kleinstunternehmen/Ausnahmen-fuer-Kleinstunternehmen.de.html) | Website Setup, Media Accounts Setup | S | ja | P1 |
| 3.3 | **Lokale Sichtbarkeit aus UNIO-Daten.** Eine Bezirksseite je Makler aus den UNIO-Marktzahlen (wie die AgentFire-Guides), JSON-LD `RealEstateAgent` mit NAP identisch zum Google-Profil, eine Google-Profil-Checkliste im Konten-Assistenten (Kategorie, Einzugsgebiet, Porträt, Öffnungszeiten), Bewertungslink als QR für Visitenkarte und Abschluss-Mail. | [Luxury Presence Schema](https://www.luxurypresence.com/blogs/real-estate-schema-markup/), [HousingWire Website-Builder](https://www.housingwire.com/articles/best-website-builders-real-estate/), [Local SEO Guide 2026](https://insidea.com/blog/marketing/real-estate/local-seo-guide-for-agents) | Website Setup, Media Accounts Setup, Visitenkarten | M | ja | P2 |
| 3.4 | **Bewertungen sauber einbinden.** Standard: eigene Testimonials mit Einwilligung, Datum und Objektart, gepflegt in HUMAN. Optional Google über die Places API, serverseitig, mit Autor und Quelle. | [North Labs Places API](https://www.northlabs.co.uk/blog/google-reviews-schema-places-api) | Website Setup | S (eigene), M (Google) | ja (eigene), nein (Google) | P2 |

**Optional (P3):** Direktbuchung von Bewertungsgespräch und Besichtigung auf der Website, gespeist aus dem Termin-Planer (ICS). Wer eine fertige Lösung will: Cal.diy steht seit April 2026 unter MIT, Cal.com selbst ist nicht mehr Open Source. Quelle: [Calendly-Alternativen 2026](https://use-apify.com/blog/calendly-alternatives-2026).

### 3.3 Typische Fehler, die UNIO vermeiden soll

1. **Einheitslook.** KI-Builder wie Durable erzeugen Seiten, die "wie jeder Wettbewerber" wirken. UNIO-Templates müssen sich über Porträt, Look, echte Bezirksinhalte und Objekte unterscheiden. Die Immo-Design-Anweisung gilt: keine KI-typischen Elemente, keine Eyebrows.
2. **Langsame Seiten.** Video-Hero, ungeladene Galerien und schwere Schriften kosten Leads. Bilder als WebP oder AVIF mit `srcset` und `loading="lazy"`, Schriften als Teilmenge, Ziel LCP unter 2,5 s am Handy.
3. **Pflichtangaben nur auf der Website.** Impressum fehlt auf Instagram, Energiekennzahlen fehlen im Objekt-Teaser oder im Post. Beides kostet bis zu 1.450 Euro (EAVG) beziehungsweise bis zu 3.000 Euro (ECG) je Verstoß.

---

## 4. Print und Grafik

### 4.1 Was die Besten machen

| Lösung | Regeln und Funktion | Design und Ablauf |
|---|---|---|
| **Moo** | 300 dpi, Schrift mindestens 8 pt, Linien mindestens 0,5 pt, Sicherheitsbereich rund 2 mm innen, PDF/X-1a, Schriften eingebettet, Transparenzen reduziert, **keine Schnittmarken** (Moo setzt sie selbst) | Vorlagen mit Beschnitt- und Sicherheitslinie zum Herunterladen |
| **Flyeralarm** | 85 × 55 mm Endformat, Datenformat 87 × 57 mm (1 mm Beschnitt je Seite), Sicherheitsabstand laut Datenblatt, Druckmarken **nicht** anlegen | Datenblatt je Produkt |
| **Andere Druckereien (DACH)** | Oft 2 mm Beschnitt (89 × 59 mm), Sicherheitsabstand 3 bis 4 mm, CMYK mit FOGRA51 (gestrichen) oder FOGRA52 (ungestrichen) | |
| **Vistaprint** | Automatische Warnung bei geringer Auflösung, Sicherheitslinie im Editor | Prüfung vor dem Bestellen, im Editor sichtbar |
| **Canva Magic Switch / Resize** | Ein Entwurf in viele Formate, Elemente werden neu verteilt statt gestreckt | Alle Zielformate in einem Durchgang, Canva rät trotzdem zur Sichtprüfung |
| **Bannerbear** | Vorlage mit benannten Ebenen, eine Liste von Änderungen per API, Smart Templates passen Text und Anordnung an, Größe pro Anfrage überschreibbar | Vorlage im Editor, Daten per API |
| **Templated.io** | Ebenen mit Gruppen, mehrseitige Vorlagen (Carousel), Ausgabe JPG, PNG, WebP, PDF, MP4, Ebenen-Animationen | Einbettbarer Editor |
| **Instagram 2026** | 1080 × 1440 (3:4) füllt Feed und Profilraster ohne Beschnitt; 4:5 bleibt gängig; Story und Reel 1080 × 1920 | Sicherheitszonen: oben rund 14 %, unten rund 20 % frei von Text |

### 4.2 Muster für UNIO

| Nr. | Muster | Vorbild und Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|---|
| 4.1 | **Druckerei-Profile mit Preflight.** Statt fixer 3 mm und Schnittmarken ein Profil: "Flyeralarm AT" (87 × 57, ohne Marken), "Standard 2 mm" (89 × 59), "Moo", "Eigene Druckerei" (Marken wählbar). Die Prüfung nach Moo-Regeln: Schrift ab 8 pt (Warnung ab 7 pt, Fehler unter 6 pt), Linien ab 0,5 pt, effektive Porträtauflösung ab 300 ppi, Logo als Vektor, Hintergrund bis in den Beschnitt, Inhalte mit 3 mm Abstand zum Endformat. Ausgabe als Vektor-PDF mit Schrift in Pfaden. | [Moo Guidelines](https://www.moo.com/us/business-cards/design-guidelines), [Moo Vorlagen](https://support.moo.com/hc/en-us/articles/202834204-How-to-use-downloadable-templates), [Flyeralarm Datenformat](https://www.flyeralarm.com/at/i/druckdaten/datenformat-und-beschnitt/), [Flyeralarm Checkliste](https://www.flyeralarm.com/blog/wp-content/uploads/Flyeralarm_Checkliste_Druckdatenerstellung-1.pdf), [Vistaprint Sicherheitslinie](https://www.vistaprint.com/customer-care/help-center/360059872572/) | Visitenkarten Bestellung und Delivery | S bis M | ja | P1 |
| 4.2 | **Farbe im Druck ehrlich zeigen.** Der Browser erzeugt RGB. Leuchtende Akzente (Blau, Lime, Türkis) werden beim Umrechnen stumpf. Eine Näherung prüft, ob der Akzent außerhalb des typischen Druckfarbraums liegt, zeigt eine Vorschau "im Druck etwa so" und hinterlegt im Brand-Kit einmal festgelegte CMYK-Werte je Farbe. | [Druckplatz Datenblatt FOGRA](https://www.druckplatz.online/media/wysiwyg/Datenblatt/Visitenkarte_Datenblatt_85x55_Querformat.pdf), [Moo PDF/X](https://support.moo.com/hc/en-us/articles/202834204-How-to-use-downloadable-templates) | Visitenkarten, Print Variation | M | ja (Näherung) | P2 |
| 4.3 | **Vorlagen als Ebenen-Vertrag.** Jede Grafikvorlage hat benannte Ebenen (`headline`, `preis`, `foto`, `portraet`, `logo`, `energie`, `cta`) mit Regeln: höchstens n Zeilen, Mindestschriftgröße, bei Überlauf erst umbrechen, dann kürzen mit Hinweis, nie unter die Mindestgröße schrumpfen, leere Ebene ausblenden. JSON rein, PNG oder PDF raus, Meta mit `score` und `hinweise`. Präfix `gr:` im Nachrichtenvertrag. | [Bannerbear Modifications](https://www.bannerbear.com/help/articles/68-define-modifications/), [Bannerbear Mehrformat-Tutorial](https://www.bannerbear.com/blog/how-to-generate-event-marketing-graphics-in-any-size-from-a-single-template-using-bannerbear-nodejs-tutorial/), [Templated Render API](https://templated.io/docs/renders/create/) | Video, Photo, Graphic, Print Variation; Standard Format, Automation | M | ja | P1 |
| 4.4 | **Ein Motiv, alle Formate mit festen Regeln.** Statt KI-Reflow je Format ein eigenes Layout-Raster: 3:4 (1080 × 1440) als Primärformat, dazu 4:5, 1:1 und 9:16 mit eingeblendeten Sicherheitszonen. Carousel als mehrseitige Vorlage mit gleicher Kopfzeile. Alle Formate in einem Durchgang, eine Kontaktbogen-Ansicht zur Sichtprüfung. | [Canva Magic Resize](https://www.canva.com/pro/magic-resize/), [Buffer Instagram-Größen](https://buffer.com/resources/instagram-image-size/), [Instagram Safe Zones](https://instasaver.io/en/blog/instagram-dimensions-safe-zones/) | Video, Photo, Graphic, Print Variation | S bis M | ja | P1 |

### 4.3 Typische Fehler, die UNIO vermeiden soll

1. **Beschnitt und Marken passen nicht zur Druckerei.** Die Folge sind Rückfragen, ein skaliertes Motiv oder weiße Blitzer am Rand. Das Profil entscheidet, nicht eine Voreinstellung.
2. **Kontaktdaten zu klein und zu nah am Rand.** Eine Telefonnummer in 6 pt Hellgrau, 1 mm vor der Schnittkante, geht im Druck verloren. Die Mindestwerte werden hart geprüft, nicht nur empfohlen.
3. **Social-Vorlagen ohne Oberfläche gedacht.** Der Preis verschwindet unter der Antwortleiste der Story, das 3:4-Raster schneidet die Headline eines 4:5-Posts, die Energiekennzahl fehlt. Sicherheitszonen einblenden und die Ebene `energie` bei Objekten zur Pflicht machen.

---

## 5. Farbe und Typografie

### 5.1 Was gilt und was die Besten machen

| Thema | Stand 2026 | Quelle |
|---|---|---|
| **WCAG 2.2 Text** | 4,5 : 1 für normalen Text, 3 : 1 für großen Text (ab 24 px oder 18,66 px fett). Logos und Markennamen sind ausgenommen. | [WebAIM Kontrast](https://webaim.org/articles/contrast/) |
| **WCAG 2.2 Grafik** | 1.4.11: 3 : 1 für Bedienelemente und bedeutungstragende Grafik, Logos ausgenommen | [Deque 1.4.11](https://dequeuniversity.com/resources/wcag2.1/1.4.11-non-text-contrast) |
| **APCA** | Lc 90 für Fließtext ab 14 px/400, Lc 75 als Minimum für Fließtext ab 18 px/400, Lc 60 für sonstigen Inhalt. Nicht im WCAG-3-Entwurf (seit Juli 2023 entfernt), WCAG 3 nicht vor 2028 bis 2030. Empfehlung: beide erfüllen, WCAG 2 bleibt die rechtliche Grenze. | [APCA Easy Intro](https://git.apcacontrast.com/documentation/APCAeasyIntro.html), [Adrian Roselli, April 2026](https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html) |
| **Adobe Leonardo** | Erzeugt Farbstufen aus Zielkontrasten (Standard 3 und 4,5), Ausgabe als CSS oder Design-Tokens mit Kontrastnotiz je Stufe, Open Source | [Leonardo](https://github.com/adobe/leonardo), [leonardocolor.io](https://leonardocolor.io/) |
| **material-color-utilities** | QuantizerCelebi plus Score: Farben aus einem Bild, nach Eignung sortiert (Buntheit, Fläche), 10 bis 100 ms, Apache 2.0 | [Extract colors](https://chromium.googlesource.com/external/github.com/material-foundation/material-color-utilities/+/bec7bab60e6431201a82761ea4482b98b54c2af9/extract_colors.md) |
| **OKLCH** | Wahrnehmungsgleiche Helligkeit, Tonalskalen aus einer Grundfarbe, Farbraumprüfung sRGB und P3 | [OKLCH Guide](https://colorarchive.org/guides/oklch-color-space-guide/) |
| **Schriftpaarung** | Kontrast für die Hierarchie (Serif zu Sans), Gemeinsamkeit für den Zusammenhalt (x-Höhe, Proportion, Epoche). Superfamilien passen sicher. | [Google Fonts Knowledge](https://fonts.google.com/knowledge/choosing_type/pairing_typefaces_within_a_family_superfamily), [TypeSmith Pairing](https://typographysmith.com/guides/font-pairing-theory) |

### 5.2 Muster für UNIO

| Nr. | Muster | Vorbild und Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|---|
| 5.1 | **Kontrastsichere Stufen aus einem Akzent.** Aus dem Makler-Akzent in OKLCH automatisch ableiten: "Akzent als Text auf Hell" (mindestens 4,5 : 1), "Akzent als Fläche mit weißer Schrift", "Akzent auf Dunkel", Hover und Linie (3 : 1). Jede Stufe hat eine Einsatzregel. Website, Grafik und Druck nutzen nur diese Stufen. Export als `brand.css` und `tokens.json`. | [Adobe Leonardo](https://github.com/adobe/leonardo), [Nate Baldwin zu Leonardo](https://medium.com/@NateBaldwin/leonardo-an-open-source-contrast-based-color-generator-92d61b6521d2) | Branding Setup | M | ja | P1 |
| 5.2 | **Doppelprüfung WCAG und APCA.** WCAG 2.2 bleibt die harte Grenze. APCA ergänzt einen Hinweis zur Lesbarkeit je Schriftgröße und Gewicht ("Fließtext erst ab 18 px", "nur für Überschriften"). Die Prüfung läuft auf allen Hintergründen des Looks, auch auf Creme, Dunkel und Foto mit Verlauf. | [APCA in a Nutshell](https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html), [Roselli](https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html) | Branding Setup, Website Setup | S | ja | P2 |
| 5.3 | **Palette aus dem Logo mit Eignungswert.** Statt "dominante Farbe ohne Grau und Weiß": quantisieren (Celebi), nach Buntheit und Fläche bewerten, Kantenpixel mit Kantenglättung ignorieren, zwei bis drei Kandidaten zeigen, dazu den nächsten UNIO-Akzent mit Abstand in OKLab. | [material-color-utilities](https://chromium.googlesource.com/external/github.com/material-foundation/material-color-utilities/+/bec7bab60e6431201a82761ea4482b98b54c2af9/extract_colors.md) | Branding Setup (Rebranding) | S | ja | P2 |
| 5.4 | **Kuratierte Schriftpaare mit Prüfsatz.** Sechs bis acht geprüfte Paare (Display und Text), jede mit Lizenz, x-Höhen-Abgleich, deutschen Zeichen (ÄÖÜ, ß, „ “), Tabellenziffern für Preise und Flächen, Gewichten für Web und Druck. Die Vorschau setzt den echten Namen, den Bezirk und einen Preis wie "€ 1.290.000". | [Google Fonts Pairing](https://fonts.google.com/knowledge/choosing_type/pairing_typefaces_within_a_family_superfamily), [Brandmark](https://brandmark.io/) | Branding Setup | S | ja | P2 |

### 5.3 Typische Fehler, die UNIO vermeiden soll

1. **Nur auf Weiß geprüft.** Ein Akzent besteht auf Weiß und scheitert auf Creme, auf einem Foto, im dunklen Look oder im Druck. Jede Farbe wird auf allen realen Hintergründen geprüft.
2. **Dünn und grau als "edel".** Hellgrauer Fließtext und leichte Schnitte (300) unter 16 px wirken hochwertig und sind schlecht lesbar. APCA macht das sichtbar, wo WCAG 2 noch durchlässt.
3. **Schrift ohne deutschen Test.** Fehlende ß, schlechte Umlaute, proportionale Ziffern in Preislisten oder eine Lizenz, die keine Logo-Nutzung deckt, fallen erst nach dem Druck auf. Der Prüfsatz fängt das vorher ab.

---

## 6. Reihenfolge

| Welle | Inhalt | Warum zuerst |
|---|---|---|
| 1 | 1.1 Lizenzen im Zuschnitt, 4.1 Druckerei-Profile, 3.2 Rechts-Check mit EAVG | Rechtliches und Druckrisiko, kleiner Aufwand |
| 2 | 1.2 MediaPipe, 1.3 Zielformen, 2.1 Logo-Regeln als Daten, 5.1 Farbstufen | Fundament, auf dem Website, Druck und Grafik aufbauen |
| 3 | 4.3 Ebenen-Vertrag, 4.4 Formate, 3.1 Zwei Wege | Größter Hebel im Monatszyklus und bei Leads |
| 4 | 2.2, 2.3, 2.4, 3.3, 3.4, 4.2, 5.2 bis 5.4, 1.4 | Feinschliff und Tiefe |

---

## 7. Quellen

**Porträt**
- Photoroom, API-Vergleich mit remove.bg und Abschaltdatum: https://www.photoroom.com/api/photoroom-vs-removebg
- Photoroom, Profilbild-Werkzeug: https://www.photoroom.com/tools/profile-picture-maker
- Adobe Express, Freistellen: https://www.adobe.com/express/feature/image/remove-background
- Aragon, Realtor-Headshots: https://www.aragon.ai/headshots/real-estate-headshots
- Vergleich Aragon und HeadshotPro 2026: https://genesysgrowth.com/blog/aragon-ai-vs-headshotpro-vs-betterpic
- HousingWire, Headshot-Tipps für Makler: https://www.housingwire.com/articles/realtor-headshots/
- Scale Headshots, Richtlinien für Brokerages: https://scaleheadshots.com/use-cases/guide-to-realtor-headshots/
- Headshot-Zuschnitt: https://business-headshots.ai/how-to-crop-and-size-headshots
- ICAO 9303 Überblick: https://photogov.net/knowledge/standards/icao-9303-biometric-standards/
- MediaPipe Face Landmarker Web: https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js
- vladmandic/face-api (archiviert): https://github.com/vladmandic/face-api
- IMG.LY, ONNX Runtime und WebGPU: https://img.ly/blog/browser-background-removal-using-onnx-runtime-webgpu/
- imgly Lizenz (AGPL-3.0): https://unpkg.com/@imgly/background-removal@1.7.0/LICENSE.md
- BiRefNet: https://github.com/ZhengPeng7/BiRefNet
- BiRefNet_lite ONNX: https://huggingface.co/onnx-community/BiRefNet_lite-ONNX
- BiRefNet-portrait ONNX: https://huggingface.co/onnx-community/BiRefNet-portrait-ONNX
- MODNet: https://github.com/ZHKKKe/MODNet
- RMBG-2.0 Lizenz: https://huggingface.co/briaai/RMBG-2.0
- Laplace-Varianz: https://pyimagesearch.com/2015/09/07/blur-detection-with-opencv/
- EU AI Act Art. 50: https://artificialintelligenceact.eu/transparency-rules-article-50/
- Stibbe zu Art. 50: https://www.stibbe.com/publications-and-insights/the-ai-acts-transparency-obligations-rules-scope-and-timeline

**Logo und Marke**
- Looka Brand Kit: https://looka.com/brand-kit/
- Looka Review September 2026: https://www.wpcrafter.com/review/looka-logo-generator/
- Brand-Kit-Vergleich 2026: https://dancelogo.com/blog/which-logo-maker-gives-you-a-usable-brand-kit-2026/
- Brandmark: https://brandmark.io/
- Canva Brand Controls: https://www.canva.com/help/brand-control/
- Canva Template Locks: https://www.canva.com/help/brand-template-locks/
- Canva Brand Kit Builder: https://www.canva.com/help/brand-kit-builder/
- Frontify Logo-Guidelines: https://www.frontify.com/en/guide/logo-usage-guidelines
- Frontify Brand Standards: https://www.frontify.com/en/guide/brand-standards
- Figma Branding Toolkit: https://www.figma.com/community/file/1413474835383606317/branding-toolkit
- Evil Martians, Favicon: https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
- opentype.js: https://github.com/opentypejs/opentype.js

**Websites**
- Luxury Presence, IDX und Lead-Erfassung: https://www.luxurypresence.com/blogs/idx-home-search-tools-real-estate/
- Luxury Presence, Bewertungs-Landingpages: https://www.luxurypresence.com/blogs/home-valuation-landing-pages-capture-seller-leads/
- Luxury Presence, Schema: https://www.luxurypresence.com/blogs/real-estate-schema-markup/
- HousingWire, Website-Builder 2026: https://www.housingwire.com/articles/best-website-builders-real-estate/
- Placester, 24 Beispiele 2026: https://placester.com/real-estate-marketing-academy/real-estate-website-design-24-best-examples
- The Close, beste Makler-Websites: https://theclose.com/real-estate-agent-websites/
- involve.me, Landingpages: https://www.involve.me/blog/real-estate-landing-page-examples
- Webflow, Makler-Templates: https://webflow.com/list/real-estate-agent
- Durable Review: https://website-builders.cybernews.com/durable-ai-website-builder-review/
- Framer AI Review: https://superdesign.dev/blog/framer-ai-review
- KI-Builder im Vergleich (Einheitslook): https://designrevision.com/blog/best-ai-website-builders
- Local SEO für Makler 2026: https://insidea.com/blog/marketing/real-estate/local-seo-guide-for-agents
- Google-Rezensionen und Places API: https://www.northlabs.co.uk/blog/google-reviews-schema-places-api
- Calendly-Alternativen 2026 (Cal.diy): https://use-apify.com/blog/calendly-alternatives-2026
- onOffice, Impressum für Makler (AT): https://at.onoffice.com/blog/rechtliches/das-impressum-fuer-immobilienmakler-warum-es-mehr-als-eine-pflichtangabe-ist/
- WKO, Das korrekte Website-Impressum: https://www.wko.at/oe/internetrecht/das-korrekte-website-impressum.pdf
- RIS, Standes- und Ausübungsregeln für Immobilienmakler: https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10007765
- ÖVI, Energiekennzahlen in Inseraten: https://www.ovi.at/recht/energieausweis/informationspflicht-in-medien
- Energieausweis 360, Neuerungen ab 01.07.2026: https://www.energieausweis360.at/energieausweis-neuerungen-2026
- CHG, Novelle des EAVG: https://www.chg.at/novelle-des-energieausweis-vorlage-gesetzes/
- Sozialministeriumservice, BaFG-Ausnahme: https://www.sozialministeriumservice.gv.at/Marktueberwachung_digitale_Barrierefreiheit/Informationen_fuer_Unternehmen/Ausnahme_Kleinstunternehmen/Ausnahmen-fuer-Kleinstunternehmen.de.html

**Print und Grafik**
- Moo Design Guidelines: https://www.moo.com/us/business-cards/design-guidelines
- Moo Vorlagen und PDF-Export: https://support.moo.com/hc/en-us/articles/202834204-How-to-use-downloadable-templates
- Flyeralarm Datenformat und Beschnitt: https://www.flyeralarm.com/at/i/druckdaten/datenformat-und-beschnitt/
- Flyeralarm Checkliste: https://www.flyeralarm.com/blog/wp-content/uploads/Flyeralarm_Checkliste_Druckdatenerstellung-1.pdf
- Druckplatz Datenblatt 85 × 55: https://www.druckplatz.online/media/wysiwyg/Datenblatt/Visitenkarte_Datenblatt_85x55_Querformat.pdf
- Vistaprint Sicherheitslinie: https://www.vistaprint.com/customer-care/help-center/360059872572/
- Canva Magic Resize: https://www.canva.com/pro/magic-resize/
- Bannerbear Modifications: https://www.bannerbear.com/help/articles/68-define-modifications/
- Bannerbear API v5: https://developers.bannerbear.com/v5/
- Templated Render API: https://templated.io/docs/renders/create/
- Buffer, Instagram-Größen 2026: https://buffer.com/resources/instagram-image-size/
- Instagram Safe Zones 2026: https://instasaver.io/en/blog/instagram-dimensions-safe-zones/

**Farbe und Typografie**
- WebAIM Kontrast: https://webaim.org/articles/contrast/
- Deque, 1.4.11 Non-text Contrast: https://dequeuniversity.com/resources/wcag2.1/1.4.11-non-text-contrast
- APCA Easy Intro: https://git.apcacontrast.com/documentation/APCAeasyIntro.html
- Adrian Roselli, WCAG3 Contrast April 2026: https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html
- Adobe Leonardo: https://github.com/adobe/leonardo
- material-color-utilities, Farben aus Bildern: https://chromium.googlesource.com/external/github.com/material-foundation/material-color-utilities/+/bec7bab60e6431201a82761ea4482b98b54c2af9/extract_colors.md
- OKLCH Guide: https://colorarchive.org/guides/oklch-color-space-guide/
- Google Fonts, Pairing in Superfamilien: https://fonts.google.com/knowledge/choosing_type/pairing_typefaces_within_a_family_superfamily
- TypeSmith, Pairing-Theorie: https://typographysmith.com/guides/font-pairing-theory

**Hinweis:** Die Rechtsangaben (Impressum, EAVG, BaFG, AI Act, Lizenzen) sind Rechercheergebnisse, keine Rechtsberatung. Vor dem Betrieb prüfen lassen, vor allem die AGPL-Frage und die EAVG-Übergangsregel.
