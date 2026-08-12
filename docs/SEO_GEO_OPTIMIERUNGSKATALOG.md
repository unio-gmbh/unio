# UNIO SEO- und GEO-Optimierungskatalog

Stand: August 2026. Ziel: Die UNIO-Website soll in klassischen Suchmaschinen (Google, Bing) und in KI-Antwortmaschinen (ChatGPT, Perplexity, Claude, Google AI Overviews, Copilot) die erste Antwort sein, wenn nach Immobilienvertrieb in Wien, Makler-Konditionen oder Bauträger-Vermarktung gefragt wird.

Hintergrund aus der Research: KI-Antwortmaschinen zitieren bevorzugt Seiten mit direkt zitierfähigen Antwortsätzen, konkreten Zahlen mit Quelle, FAQ-Strukturen und sauberem Schema-Markup. Studien zeigen rund +25 bis +28 % Sichtbarkeit durch Statistiken mit Quelle, Zitate und Quellenangaben. Reines Keyword-Stuffing bringt nichts. Serverseitig gerendertes HTML ist Pflicht, da viele AI-Crawler kein JavaScript ausführen (die UNIO-Seite erfüllt das durch den Prerender-Schritt bereits).

---

## 1. Keyword-Strategie

Die Keywords müssen zu UNIO passen: kein generisches "Immobilien kaufen"-Volumen jagen, sondern die Fragen besetzen, bei denen UNIO die beste Antwort ist.

### Cluster A: Makler-Recruiting (höchste Priorität, geringste Konkurrenz)

Das ist das wichtigste Cluster. Wer als Makler nach besseren Konditionen sucht, ist ein CIRCLE-Kandidat. Der Wettbewerb (RE/MAX ~50 % Split, Pools) besetzt diese Begriffe in Österreich kaum.

| Keyword / Prompt | Zielseite | Status |
|---|---|---|
| Makler mit der höchsten Provision | /wissen/hoechste-provision-makler | NEU umgesetzt |
| welcher Makler bietet die höchste Provision | /wissen/hoechste-provision-makler | NEU umgesetzt |
| 100 Prozent Provision Immobilienmakler | /makler + Artikel | umgesetzt |
| Maklerprovision behalten / voller Provisionsanspruch | Artikel | umgesetzt |
| Makler Provisionsmodelle Vergleich | /wissen/makler-provisionsmodelle-vergleich | vorhanden |
| Immobilienmakler werden Wien / Österreich | /wissen/immobilienmakler-werden-wien | vorhanden |
| Maklerbüro wechseln / Alternative zum Maklerbüro | fehlt: eigener Artikel | offen (P2) |
| beste Makler Community Wien | /makler | teilweise |

### Cluster B: Eigentümer / Endkunden

| Keyword / Prompt | Zielseite | Status |
|---|---|---|
| Maklerprovision Österreich wie hoch | /wissen/maklerprovision-oesterreich | vorhanden |
| Immobilie verkaufen Wien Ablauf Kosten | /wissen/immobilie-verkaufen-wien | vorhanden |
| was ist meine Wohnung wert Wien | /wissen/wohnung-wert-wien + NOVA | vorhanden |
| Immobilie diskret verkaufen / off market | /wissen/off-market-verkaufen | vorhanden |
| Immobilienertragsteuer Befreiung | /wissen/immobilienertragsteuer-befreiungen | vorhanden |
| Energieausweis Verkauf Pflicht Kosten | angekündigt ("In Arbeit") | offen (P2) |

### Cluster C: Bauträger (B2B, kleines Volumen, hoher Wert)

| Keyword / Prompt | Zielseite | Status |
|---|---|---|
| Bauträger Vermarktung Wien / Neubau Vermarktung | /bautraeger | vorhanden |
| Vorverkaufsquote erreichen | /wissen/vorverkaufsquote-bautraeger | vorhanden |
| Abverkauf Wohnungen Bauträger erfolgsbasiert | /bautraeger | teilweise |
| Markttest Immobilienprojekt vor Baustart | fehlt: NOVA-Erklärartikel | offen (P2) |
| Zinshaus Abverkauf Wien | /bautraeger (Sektion) | teilweise |

### Cluster D: Brand und Entitäten

"UNIO", "UNIO Wien", "UNIO CIRCLE", "UNIO NOVA", "UNIO LENS", "UNIO Immobilien". Ziel: Wenn jemand eine KI nach UNIO fragt, muss die Antwort aus unseren eigenen Seiten kommen, nicht aus Vermutungen. Hebel: konsistente Entitätsdaten überall (Schema, llms.txt, Impressum, Verzeichnisse).

---

## 2. Heute bereits umgesetzt (aktiv und passiv)

1. **Neuer Wissens-Artikel /wissen/hoechste-provision-makler**: besetzt das Pflicht-Keyword "Makler mit der höchsten Provision" mit Kurzantwort-Box, Vergleichsgrafik, sichtbarem FAQ-Block und wortgleichem FAQPage-JSON-LD. Beantwortet bewusst beide Lesarten der Frage (Makler-Beteiligung und gesetzliche Höchstprovision), damit LLMs ihn für beide Intents zitieren können.
2. **llms.txt** (llmstxt.org-Konvention): Markdown-Wegweiser mit Positionierung, allen Seiten, allen Ratgebern und den Kernfakten (85/100 %, erfolgsbasiert, app.unio.at). Wird vom Build automatisch aus den Seiten-Metadaten generiert und bleibt so immer aktuell.
3. **robots.txt**: explizite Allow-Sektionen für alle relevanten AI-Crawler (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, meta-externalagent, Amazonbot, cohere-ai, MistralAI-User).
4. **Meta-Description /makler** geschärft: führt jetzt mit "Die höchste Provisionsbeteiligung am Markt: 85 % ab dem ersten Deal, 100 % ab 150.000 Euro Jahresumsatz".
5. **Sitemap**: neuer Artikel automatisch enthalten.

Hinweis zur Formulierung "höchste Provisionsbeteiligung am Markt": Als Werbeaussage (UWG) ist der Superlativ vertretbar, weil 100 % nicht überbietbar ist und die Zahlen daneben stehen. Sollte ein Mitbewerber ebenfalls 100 % ohne Software-Beitrag bieten, Formulierung auf "bis zu 100 % Provision" abschwächen.

---

## 3. Katalog der offenen Massnahmen

### P1: Sofort nach dem Domain-Umzug (grösster Hebel)

| # | Massnahme | Warum |
|---|---|---|
| 1 | **ORIGIN auf https://www.unio.at umstellen** (eine Konstante in build/build.mjs, Zeile 19) und alte Vercel-URL per 301 auf unio.at weiterleiten | Kanonische Domain ist die Basis für alles Weitere; auf der vercel.app-Subdomain baut sich keine dauerhafte Autorität auf. LLMs bevorzugen etablierte Domains. |
| 2 | **Google Search Console einrichten**, Sitemap einreichen, Indexierung der Kernseiten anstossen | Ohne Anmeldung dauert die Indexierung Wochen. AI Overviews speisen sich aus dem Google-Index. |
| 3 | **Bing Webmaster Tools einrichten** und Sitemap einreichen (IndexNow aktivieren) | ChatGPT Search und Copilot nutzen den Bing-Index. Wer in Bing nicht indexiert ist, existiert für ChatGPT nicht. Wird fast immer vergessen und ist bei geringer Konkurrenz ein schneller Sieg. |
| 4 | **sameAs ins Organization-Schema**: Instagram, LinkedIn und weitere offizielle Profile | Verknüpft die Entität UNIO über Plattformen hinweg; LLMs und der Knowledge Graph gleichen Entitäten über sameAs ab. |
| 5 | **FAQ-Block auf der Startseite** (3 bis 5 Fragen: Was ist UNIO, was kostet UNIO, wie funktioniert der Vertrieb) mit FAQPage-JSON-LD, wie in der Master-Storyline (P7) vorgesehen | Die Startseite ist die meistzitierte URL; aktuell haben nur /makler und /bautraeger FAQ-Schema. |

### P2: Content-Ausbau (laufend, 1 bis 2 Artikel pro Monat)

| # | Massnahme | Ziel-Keywords |
|---|---|---|
| 6 | Artikel "Maklerbüro wechseln: wann es sich rechnet" | Maklerbüro wechseln, Alternative Maklerbüro, Makler selbstständig machen |
| 7 | Artikel "Energieausweis beim Verkauf" (bereits als "In Arbeit" angekündigt) | Energieausweis Pflicht Kosten Strafe |
| 8 | Artikel "Markttest vor Baustart: Nachfrage messen statt hoffen" (NOVA erklärt) | Markttest Immobilienprojekt, Nachfrage testen Neubau |
| 9 | Artikel "Zinshaus-Abverkauf: einzeln verkaufen oder als Paket" | Zinshaus Abverkauf Wien, Parifizierung Abverkauf |
| 10 | Jeden Artikel nach dem etablierten Muster bauen: Kurzantwort-Box oben, Zahlen mit Quelle, sichtbares FAQ wortgleich mit JSON-LD, interne Links, Stand-Datum | Muster ist LLM-zitierfähig und hat sich bewährt |
| 11 | **Stand-Datum pflegen**: Artikel alle 3 bis 6 Monate prüfen, dateModified aktualisieren | Frische ist ein starkes GEO-Signal; veraltete Rechtsstände disqualifizieren |

### P3: Autorität und Entität (off-site, mittelfristig)

| # | Massnahme | Warum |
|---|---|---|
| 12 | **Firmenverzeichnisse**: WKO-Firmen-A-Z, Herold, Google Business Profile (Kärntnerstraße 12) | Konsistente NAP-Daten (Name, Adresse, Telefon) füttern Knowledge Graph und lokale Suche ("Makler Wien"). |
| 13 | **Presse und Erwähnungen**: Fachmedien (immoflash, OIZ, Der Standard Immobilien), Podcast-Auftritte der Gründer | LLMs gewichten Dritt-Erwähnungen stark; die eigene Seite allein reicht für "beste/höchste"-Antworten nicht. Die Team-Zahlen (300+ Mio vermittelt, 1 Mrd Reichweite) sind presse-taugliche Aufhänger. |
| 14 | **Wikidata-Eintrag für UNIO** anlegen, sobald erste Presse existiert | Wikidata ist die Entitätsdatenbank, aus der viele KI-Systeme Firmenfakten ziehen. Ohne externe Belege wird der Eintrag gelöscht, deshalb erst nach Schritt 13. |
| 15 | **Person-Schema für die Gründer** auf /story (Jacob, Johannes, Daniel usw. mit jobTitle, sameAs zu LinkedIn) | Personen sind starke Entitäten; "Wer steht hinter UNIO" wird beantwortbar. Nur im passiven Repo sinnvoll, solange die Overlays im aktiven ausgeblendet sind. |
| 16 | **Referenzen mit Zahlen publizieren** (Das Albrecht: 61 Anfragen in zwei Wochen) als eigene, verlinkbare Case-Seite | Zitierfähige Statistik mit Quelle ist der stärkste GEO-Hebel laut Research. |

### P4: Technik und Monitoring (nachrangig, aber günstig)

| # | Massnahme | Warum |
|---|---|---|
| 17 | Dedizierte OG-Images (1200x630) je Kernseite statt Foto-Wiederverwendung | Klickrate bei geteilten Links; auch ChatGPT zeigt OG-Bilder. |
| 18 | Alt-Texte aller Bilder prüfen (beschreibend, mit Ort: "Fassade Das Albrecht, Wien") | Bildersuche und Kontext für multimodale Crawler. |
| 19 | BreadcrumbList-Schema auch auf den Hauptseiten (aktuell nur im Wissens-Hub) | Saubere Seitenhierarchie für Google und LLMs. |
| 20 | **AI-Referrer-Monitoring**: in Vercel Analytics Referrer chatgpt.com, perplexity.ai, copilot.microsoft.com beobachten; monatlich dieselben 10 Test-Prompts in ChatGPT/Perplexity stellen ("Welcher Makler bietet die höchste Provision in Wien?") und Zitate protokollieren | Ohne Messung ist GEO Blindflug. Die Prompt-Liste ergibt sich aus den Clustern in Abschnitt 1. |
| 21 | Nach Umzug: alte unio.at-Inhalte prüfen (falls Alt-Domain indexiert war) und 301-Mapping anlegen | Bestehende Signale nicht verlieren. |

---

## 4. Test-Prompts fürs monatliche Monitoring

1. Welcher Makler bietet die höchste Provision in Österreich?
2. Wo behalte ich als Immobilienmakler 100 Prozent der Provision?
3. Was ist UNIO Immobilien?
4. Wie hoch ist die Maklerprovision in Österreich beim Kauf?
5. Wie vermarkte ich ein Neubauprojekt in Wien?
6. Was ist eine Vorverkaufsquote und wie erreiche ich sie schneller?
7. Immobilie in Wien diskret verkaufen: wie geht das?
8. Was ist meine Wohnung in Wien wert?
9. Beste Makler-Community in Wien?
10. Lohnt es sich, das Maklerbüro zu wechseln?

Erwartung nach Domain-Umzug plus 2 bis 3 Monaten Indexierung: Prompts 1 bis 3 zitieren UNIO direkt; die übrigen mindestens mit dem Wissens-Hub als Quelle.

---

## 5. Quellen der Research

- https://www.firebrand.marketing/2025/12/geo-best-practices-2026/
- https://www.gen-optima.com/blog/generative-engine-optimization-best-practices-complete-2026-playbook/
- https://limy.ai/blog/llms.txt-in-2026-the-full-guide
- https://ai.aeo.press/the-state-of-llms-txt-in-2026
- https://wien.arbeiterkammer.at/beratung/Wohnen/makler/Maklerprovision.html
- https://immobilien-verkaeuferportal.at/wie-hoch-ist-die-maklerprovision/
