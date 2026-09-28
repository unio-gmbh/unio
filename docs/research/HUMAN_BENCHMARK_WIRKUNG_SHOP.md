# UNIO HUMAN. Benchmark Wirkung, Empfehlungen, Betrieb und Shop

Stand: 28.09.2026. Recherche mit Websuche und Abruf der Quellen (2025/2026). Ergänzt `docs/UNIO_HUMAN_PLAN.md` (Kap. 4.4 bis 4.6, Kap. 5) und `docs/UNIO_HUMAN_ROADMAP.md` (Kap. 2.5 bis 2.7). Ändert keine bestehende Datei.

**Legende für alle Muster-Tabellen**

- **HUMAN-Schritt:** Werkzeug oder Schritt aus Roadmap und Plan (Report, Kontingent-Wächter, Anfrage-Sortierer, Format-Lotse, Fristen-Wächter, Drehtag-Planer, Quartals-Review, Empfehlungs-Engine).
- **Aufwand:** S unter einer halben Arbeitssitzung, M eine Sitzung, L mehrere Sitzungen.
- **Ohne Tokens:** ja heißt: mit Regeln im Browser machbar, ohne Claude-API und ohne Server. teilweise heißt: Regel-Fallback ja, schönere Formulierung mit Claude optional.
- **Priorität:** P1 jetzt in den Prototyp, P2 vor dem Betrieb, P3 später oder nach Entscheidung durch Daniel.
- **Evidenz:** primär (Hersteller-Doku, Plattform-Doku, eigene Studie mit Methodik) oder sekundär (Blog, der andere zitiert). Sekundäre Zahlen stehen nie ohne Hinweis im Produkt.

---

## 0. Kurzfassung

1. **Nenner wechseln:** Wirkung je 1.000 erreichte Konten (Sends, Saves, Follows), nicht Engagement durch Follower. Sends pro Reichweite ist laut Mosseri eines der wichtigsten Ranking-Signale.
2. **Eigene Basis vor Branche:** Vergleich mit dem Median des Maklers und der UNIO-Kohorte. Branchenwerte für Immobilien schwanken je nach Formel um das Zwölffache (0,3 bis 3,7 Prozent).
3. **Empfehlung mit fester Grammatik:** Beobachtung mit Zahl, Regel, erwartete Wirkung mit Quelle, eine Handlung, Ablehnen mit Grund. Und 30 Tage später die Prüfung, ob sie gewirkt hat.
4. **Nur melden, was außerhalb des Erwartungsbands liegt** (Muster GA4-Insights). Unter einer Mindestmenge an Posts steht "noch zu wenig Daten" statt einer Empfehlung.
5. **Report-Kopf mit fünf Zeilen:** ein Gewinn, ein Problem, ein Grund, eine Handlung, drei Zahlen. Identisch in Mail, Push und Tool.
6. **Kontingent-Regel schriftlich und sichtbar:** Verfall mit Vorwarnung, höchstens 25 Prozent Übertrag für einen Monat, oder Umwandlung in Vorproduktion. Verbrauchskurve statt nur Restzahl.
7. **Triage mit vier Aktionen und Dienstplan:** Annehmen, als Standard anbieten, Ablehnen mit Grund, Zurückstellen bis Datum. Ein Owner pro Woche.
8. **SLA je Ticketart in Geschäftstagen,** Uhr pausiert bei "wartet auf Makler", Farbstufen, Warnung einen Geschäftstag vor Ablauf.
9. **Briefing im Checkout:** Jedes Katalogprodukt hat zwei bis vier Pflichtfelder, nach dem Kauf landet der Makler direkt im Auftrag mit Termin.
10. **Strategie-Änderungen als Entscheidungs-Einträge** (Kontext, Entscheidung, erwartete Folge, Prüfdatum, ersetzt Version), vorbereitet als Pre-read 48 Stunden vor dem Quartalsgespräch.

---

## 1. Social-Reporting

### 1.1 Befund: Was 2025/2026 zählt

**Views statt Impressions.** Instagram hat am 21.04.2025 Impressions und Plays durch Views ersetzt, für alle Inhaltsarten (Posts, Reels, Stories, Profil). Views zählen Wiederholungen mit und liegen daher höher als frühere Impressions, eine Engagement-Rate mit Views als Nenner sinkt entsprechend. Reach bleibt getrennt und zählt jedes Konto einmal. In der Graph API ist `impressions` für Medien nach dem 02.07.2024 abgekündigt. Metricool zeigt vor dem 01.01.2025 weiter "Impressions", danach "Views", mit Tooltip am Übergang; bei Konten, die nach der Umstellung verbunden wurden, stehen Impressions auf 0.
Quellen: [Emplifi](https://docs.emplifi.io/platform/latest/home/instagram-insights-metrics-deprecation-april-2025), [SocialPilot](https://www.socialpilot.co/instagram-marketing/instagram-views-metrics-changes), [Metricool Help](https://help.metricool.com/instagram-replaces-impressions-with-views-what-you-need-to-know-f6n8j), [Meta Graph API Media Insights](https://developers.facebook.com/docs/instagram-platform/reference/instagram-media/insights).

**Ranking-Signale.** Adam Mosseri hat im Januar 2025 drei Faktoren genannt: Watch Time, Likes pro Reichweite, Sends pro Reichweite. Likes wiegen etwas mehr bei Followern, Sends etwas mehr bei Nicht-Followern. Weitere Signale (Zwei-Wege-Gespräch, Originalität, "40 bis 60 Prozent mehr Verteilung für Originale") stehen nur in Sekundärquellen und sind nicht als Produkt-Zahl zu verwenden.
Quellen: [Dataslayer](https://www.dataslayer.ai/blog/instagram-algorithm-2025-complete-guide-for-marketers) (sekundär), [Influencer Marketing Hub](https://influencermarketinghub.com/instagram-sends-per-reach-playbook/) (sekundär).

**Shares als Leitkennzahl.** Dash Social (vormals Dash Hudson) meldet für Q4 2023 bis Q1 2025 plus 60 Prozent Shares auf TikTok und plus 10 Prozent auf Instagram bei stagnierendem Follower-Wachstum; DMs haben 41 Prozent Antwortquote gegenüber 1,3 Prozent bei Kommentaren.
Quelle: [Dash Social Trend Report 2025](https://www.dashsocial.com/press-release/dash-socials-trend-report-highlights-why-shares-are-emerging-as-a-top-kpi-for-brands).

**Metriken in der API (Stand 2026).** Reels: `views`, `reach`, `saved`, `shares`, `reposts`, `total_interactions`, `ig_reels_avg_watch_time`, `ig_reels_video_view_total_time`, `reels_skip_rate`, `comments`, `likes`. Feed: zusätzlich `profile_visits`, `profile_activity`, `follows`. Story: `navigation`, `replies`, `link_clicks`. Für Phase 5 (Meta Graph API) sind damit Skip-Rate und Watch Time verfügbar, die im CSV-Export fehlen.
Quelle: [Meta Graph API Media Insights](https://developers.facebook.com/docs/instagram-platform/reference/instagram-media/insights).

**Export (Meta Business Suite).** Rund 40 Spalten, Beiträge und Stories getrennt, Daten nur etwa 90 Tage rückwirkend. Spaltennamen wandern zwischen Exportarten ("Accounts reached" statt "Reach", "Reactions" statt "Likes", "Reposts" statt "Shares"). Follower-Veränderung kann negativ sein und wird von manchen Werkzeugen still verworfen. Der Mapper im Prototyp (`human-produktion.jsx`, `HM_INSIGHTS_SPALTEN`) arbeitet bereits mit Synonymen in beiden Sprachen; das deckt sich mit dem Befund.
Quellen: [Poststeady](https://www.poststeady.com/resources/export-instagram-insights-to-csv), [GSD Solutions](https://gsdsolutionsinc.com/how-to-download-content-analytics-from-meta-business-suite-ig-and-fb-updated-2026/).

**Benchmarks, die tragen, und solche, die nicht tragen.**

| Kennzahl | Wert | Quelle und Methodik | Brauchbar für UNIO |
|---|---|---|---|
| Engagement Immobilien Instagram | 3,70 Prozent | Hootsuite, Kategorie "Real Estate, Legal and Other Professional", gebündelt | nur als Kontext |
| Engagement Immobilien Instagram | 0,3 Prozent | Dash Social, (Likes plus Kommentare) durch Follower, Juli bis Dezember 2024 | nur als Kontext |
| Rival IQ Immobilien | keine Kategorie | Rival IQ führt Immobilien nicht | nein |
| Engagement je Reichweite nach Format | Carousel 6,90, Bild 4,44, Reel 3,31 Prozent (Median) | Buffer, über 4 Mio. Posts, Likes, Kommentare, Saves, Shares durch Reichweite | ja, als Format-Rolle |
| Reichweite nach Format | Reels plus 36 Prozent gegenüber Carousels, plus 125 Prozent gegenüber Bildern | Buffer, Januar 2022 bis Oktober 2024 | ja |
| Views je Post bei 1.000 bis 5.000 Followern | Reel 580, Carousel 993, Bild 417 | Socialinsider, 35 Mio. Posts, 2025 | ja, als ehrliche Erwartung für neue Makler-Konten |
| Follower-Wachstum pro Jahr bei 1.000 bis 5.000 Followern | 22 Prozent (2025, Vorjahr 38) | Socialinsider | ja, für die Ziele im Strategie-Workshop |
| Frequenz | 3 bis 5 Posts pro Woche verdoppeln das Follower-Wachstum gegenüber 1 pro Woche | Buffer, 2 Mio. Posts, 100.000 Konten, August 2025 | ja, bestätigt Regel "Rhythmus" in Kap. 5.2 |
| Frequenz Immobilien | höchste Engagement-Rate bei 2 Posts pro Woche (4,23 Prozent) | Hootsuite | Achtung: Rate sinkt mit Frequenz, absolute Wirkung steigt trotzdem |
| Posting-Mix Immobilienmarken | 3 Reels, 4 Carousels oder Bilder pro Woche | Hootsuite über Apaya | Orientierung |

Quellen: [Apaya Real Estate](https://apaya.com/blog/social-media-benchmarks-real-estate), [Buffer Engagement 2026](https://buffer.com/resources/state-of-social-media-engagement-2026/), [Buffer Reach-Analyse](https://buffer.com/resources/instagram-reach-engagement-analysis/), [Socialinsider Instagram Benchmarks](https://www.socialinsider.io/social-media-benchmarks/instagram), [Social Media Today zu Buffer](https://www.socialmediatoday.com/news/study-shows-posting-more-instagram-leads-to-more-reach/757633/), [Hootsuite Benchmarks](https://blog.hootsuite.com/social-media-benchmarks/).

**Werkzeuge, Funktion und Design.**

- **Metricool:** Report-Vorlage je Marke (Farben, Logo, Kennzahlen), Export als PDF oder PPT, monatlicher Versand an feste Adressen mit Begleittext und Antwortadresse. Metricool Studio erzeugt einen teilbaren Link ohne Login, der sich bei "dieser Monat" selbst aktualisiert, und gliedert Erkenntnisse in "what happened, why it matters, what to do next". [metricool.com/reports](https://metricool.com/reports/), [Metricool Studio](https://metricool.com/metricool-studio/)
- **Sprout Social:** Tag Performance Report: Posts werden beim Planen mit Tags versehen (Kampagne, Thema), der Report vergleicht Tags gegeneinander und zeigt die Posts, die die Leistung getragen haben. "Analyze by AI Assist" fasst einzelne Widgets in Alltagssprache zusammen. [Tag Performance Report](https://support.sproutsocial.com/hc/en-us/articles/211892343-How-do-I-use-the-Tag-Performance-Report), [AI Assist](https://sproutsocial.com/insights/ai-social-media-assistant/)
- **Iconosquare:** Branchenvergleich in über 100 Kategorien, Engagement je Reichweite, Berichte täglich bis quartalsweise automatisch an Beteiligte. [Influencer Marketing Hub, Review](https://influencermarketinghub.com/iconosquare/)
- **Dash Hudson / Dash Social:** Vorhersage vor dem Posten ("Star Performer"), Entertainment Score für Video. Proprietär und nicht nachbaubar, aber das Prinzip "vorher einschätzen, nachher vergleichen" ist übertragbar. [Dash Social](https://www.dashsocial.com/press-release/dash-socials-trend-report-highlights-why-shares-are-emerging-as-a-top-kpi-for-brands)
- **Later:** Beste Posting-Zeit aus den eigenen Daten des Kontos statt aus Branchenwerten; Branchenwerte sind nur Startpunkt. [Later](https://later.com/blog/best-time-to-post-on-instagram/)

### 1.2 Muster für UNIO

| Nr | Muster | Quelle | HUMAN-Schritt | Aufwand | Ohne Tokens | Priorität |
|---|---|---|---|---|---|---|
| R1 | **Wirkung je 1.000 erreichte Konten:** Sends, Saves, Follows und Profilbesuche je 1.000 Reichweite pro Post, im Monat als Median. Engagement durch Follower nicht anzeigen. Kopfzahl im Report: "Geteilt je 1.000 erreichte Konten". | [Dataslayer (Mosseri)](https://www.dataslayer.ai/blog/instagram-algorithm-2025-complete-guide-for-marketers), [Buffer](https://buffer.com/resources/state-of-social-media-engagement-2026/) | Report (Roadmap 2.5), Monatsreport (Plan 4.4) | S | ja | P1 |
| R2 | **Eigene Basis und Kohorte vor Branche:** Jede Zahl wird gegen den Median der letzten 90 Tage des Maklers gezeigt, als zweite Linie der Median aller UNIO-Makler mit ähnlicher Kontogröße. Branchenwerte nur im Strategie-Workshop, immer mit Formel. | [Apaya](https://apaya.com/blog/social-media-benchmarks-real-estate), [Socialinsider](https://www.socialinsider.io/social-media-benchmarks/instagram) | Report, Quartals-Review | M | ja | P1 |
| R3 | **Säulen als Tags, Report je Säule:** Jeder Content trägt Säule und Format schon beim Planen; der Report zeigt je Säule Posts, Median-Sends und den tragenden Post. Speist direkt die Regel "Säulen" in Plan 5.2. | [Sprout Tag Performance](https://support.sproutsocial.com/hc/en-us/articles/211892343-How-do-I-use-the-Tag-Performance-Report) | Report, Ideen-Generator | S | ja | P1 |
| R4 | **Format hat eine Rolle:** Reel wird an Reichweite und Anteil Nicht-Follower gemessen, Carousel an Saves je 1.000, Talking Head an Follows je 1.000. Der Report bewertet jedes Format an seiner Aufgabe, nicht alle an Likes. | [Buffer](https://buffer.com/resources/instagram-reach-engagement-analysis/) | Report, Empfehlungs-Engine (Regel "Format") | S | ja | P2 |
| R5 | **Datenbrüche sichtbar:** Views und alte Impressions nie in einer Linie; Übergang mit Hinweis. Reichweite je Beitrag nicht als Konto-Reichweite summieren, sondern als "Reichweite summiert über Beiträge" beschriften oder Median je Post zeigen. | [Metricool Help](https://help.metricool.com/instagram-replaces-impressions-with-views-what-you-need-to-know-f6n8j), [FrameOS](https://frameos.studio/blog/how-to-read-instagram-insights) | Report (`hmReportAus` summiert heute Reichweite) | S | ja | P2 |
| R6 | **Profil-Trichter:** Profilbesuche zu Follows. Viele Besuche, wenige Follows heißt Bio- oder Profilproblem, nicht Content-Problem. Empfehlung verweist auf den Konten-Assistenten (Bio). | [FrameOS](https://frameos.studio/blog/how-to-read-instagram-insights) | Report, Konten-Assistent | S | ja | P2 |

---

## 2. Empfehlungs-Engines und Berichte, die gelesen werden

### 2.1 Befund

- **Google Ads Empfehlungen:** Jede Empfehlung trägt einen geschätzten Effekt ("score uplift"), eine Begründung ("Learn more": warum für dieses Konto) und zwei Handlungen (Anwenden, Ablehnen). Kritik aus der Praxis: 100 Prozent Score ist nicht das Ziel, weil Empfehlungen teils dem Anbieter nützen. Lehre für UNIO: Effekt nennen, aber Glaubwürdigkeit über Transparenz der Regel holen, nicht über einen Score. [Google Ads Help](https://support.google.com/google-ads/answer/9061546?hl=en), [Search Engine Land](https://searchengineland.com/google-ads-recommendations-auto-apply-465909)
- **GA4 Insights:** Maschinell gelerntes Erwartungsband je Kennzahl; nur Ausreißer werden als Karte gezeigt. Schwäche laut Praxis: Karten zerlegen den Ausreißer nicht (nach Seite, Gerät), man weiß nicht, wo man suchen soll. [Bounteous](https://www.bounteous.com/insights/2026/09/21/practical-guide-ga4-anomaly-detection/), [ALM Corp](https://almcorp.com/blog/ai-powered-insights-in-ga4/)
- **Metricool Studio:** Zusammenfassung plus "what happened, why it matters, what to do next". [Metricool Studio](https://metricool.com/metricool-studio/)
- **Executive Summary:** Vier bis fünf Zeilen, keine Diagramme: ein Gewinn, ein Problem, ein Grund, eine Handlung. Jede Kennzahl mit einem Satz Erklärung und einem Vergleich ("5 Prozent gegenüber 2 Prozent im Vormonat"). [Socialinsider](https://www.socialinsider.io/blog/social-media-report-executive-summary/), [Sprout Social](https://sproutsocial.com/insights/executive-summary-social-media-report/)
- **Mail-Bericht:** Bottom Line Up Front, Kernaussage im Mailtext selbst, Link zum Detail. Rund 63 Prozent der Mails werden mobil geöffnet (Campaign Monitor, zitiert). Häufig zitierte Zahlen wie "weniger als die Hälfte der Kunden liest Reports" ließen sich nicht bis zur Primärquelle verfolgen und werden hier nicht verwendet. [Mailbird](https://www.getmailbird.com/client-reporting-email/), [Databox](https://databox.com/client-reporting-best-practices)

### 2.2 Muster für UNIO

| Nr | Muster | Quelle | HUMAN-Schritt | Aufwand | Ohne Tokens | Priorität |
|---|---|---|---|---|---|---|
| E1 | **Feste Grammatik je Empfehlung:** (1) Beobachtung mit Zahl und Vergleich, (2) Regel in einem Satz, (3) erwartete Wirkung als Bandbreite mit Quelle und Evidenz-Ampel, (4) genau eine Handlung als Knopf, (5) Ablehnen mit Grund aus Auswahl. Beispiel Makler: "Posts mit deinem Gesicht wurden im September 14-mal je 1.000 erreichte Konten geteilt, ohne Gesicht 6-mal. Regel: Anteil Gesicht unter 50 Prozent. Studien zeigen plus 38 Prozent Likes für Gesichter (Bakhshi 2014). Handlung: Im nächsten Ideen-Set 4 von 5 mit dir vor der Kamera." | [Google Ads Help](https://support.google.com/google-ads/answer/9061546?hl=en), Plan Kap. 2 Nr. 8 | Empfehlungs-Engine (Plan 5.1, 5.2) | S | ja | P1 |
| E2 | **Erwartungsband und Mindestmenge:** Empfehlung nur, wenn der Wert außerhalb des Bands der eigenen letzten 12 Posts liegt (zum Beispiel außerhalb Median plus/minus 1,5 Interquartilsabstand) und mindestens 8 Posts im Zeitraum vorliegen. Sonst: "Noch zu wenig Daten für eine Aussage. Nächste Auswertung am 31.10." Zerlegung gleich mitliefern (nach Säule und Format), damit die Karte sagt, wo es liegt. | [GA4 Anomaly, Bounteous](https://www.bounteous.com/insights/2026/09/21/practical-guide-ga4-anomaly-detection/) | Empfehlungs-Engine, Report | M | ja | P1 |
| E3 | **Fünf-Zeilen-Kopf:** Oberhalb aller Kacheln: ein Gewinn, ein Problem, ein Grund, eine Handlung, dazu drei Zahlen (Sends je 1.000, Follows, Posts im Rhythmus). Gleicher Text in Mail, Push und Druckansicht. Kein Diagramm im Kopf. | [Socialinsider](https://www.socialinsider.io/blog/social-media-report-executive-summary/), [Mailbird](https://www.getmailbird.com/client-reporting-email/) | Report | S | teilweise (Textbausteine aus Regeln, Claude optional für den Grund) | P1 |
| E4 | **Wirkung der Empfehlung nachhalten:** Jede angenommene Empfehlung bekommt Messgröße und Prüfdatum. Nach 30 Tagen zeigt der Report: "Angenommen am 02.09.: mehr Gesicht. Ergebnis: Sends je 1.000 von 9 auf 14." Abgelehnte Empfehlungen mit Grund fließen in die Regelpflege (Regel mit über 50 Prozent Ablehnung wird geprüft). | Prinzip aus [Dash Social Vorhersage](https://www.dashsocial.com/press-release/dash-socials-trend-report-highlights-why-shares-are-emerging-as-a-top-kpi-for-brands), [Google Ads Kritik](https://searchengineland.com/google-ads-recommendations-auto-apply-465909) | Empfehlungs-Engine, Quartals-Review | M | ja | P2 |
| E5 | **Link statt Anhang:** Der Monatsreport ist eine Seite in HUMAN mit fester URL je Monat und Druckansicht; die Mail trägt nur den Fünf-Zeilen-Kopf und den Link. | [Metricool Studio](https://metricool.com/metricool-studio/) | Report | S | ja (Versand selbst braucht Server) | P2 |

---

## 3. Agentur-Betrieb: Kapazität, Kontingent, Triage, SLA

### 3.1 Befund

- **Kapazität:** Teamwork zeigt je Person gebuchte gegen verfügbare Stunden und warnt vor 100 Prozent; Float zeigt eine Heatmap aus bestätigten und vorläufigen Buchungen (Pipeline) und nennt 80 Prozent Auslastung als gesund, ab 90 Prozent werden Freie dazugeholt. [Teamwork Workload Planner](https://support.teamwork.com/projects/workload/workload-planner-overview), [Float Capacity](https://www.float.com/product/capacity-planning), [Float Capacity Management](https://www.float.com/resources/capacity-management)
- **Kontingent und Übertrag:** Productive kann ungenutzte (und überzogene) Stunden in die nächste Periode übertragen, Rechnung bleibt gleich (nur im teuersten Plan). Scoro führt jede Periode mit eigenen Stunden, Übertrag und Leihen aus der Zukunft. Scoro empfiehlt wöchentliche Burn-Reports (verbraucht gegen enthalten) und eine Überprüfung alle 3 bis 6 Monate. Ben Guttmann: Retainer verkaufen eine Option auf Arbeitszeit, nicht die Zeit selbst; wenn Übertrag, dann höchstens 25 Prozent und höchstens ein Monat. Die zwei häufigsten Streitfälle sind unerwartete Überziehung und Stunden, von denen der Kunde glaubte, sie würden übertragen. [Productive Rollover](https://help.productive.io/en/articles/9902502-retainer-hours-rollover), [Scoro Retainer](https://www.scoro.com/features/retainers/), [Scoro Blog](https://www.scoro.com/blog/retainer-management/), [Ben Guttmann](https://www.benguttmann.com/blog/please-never-include-rollover-hours-in-your-retainer-contract), [Beancount](https://beancount.io/blog/2026/04/24/retainer-agreement-template-service-business-guide)
- **Triage:** Linear sammelt alle Eingänge (Slack, Intercom, Front, Formulare) in einer Triage-Liste. Vier Aktionen: Annehmen, Ablehnen mit Kommentar, als Duplikat zusammenführen (Anhänge wandern mit), Zurückstellen bis Datum oder neuer Aktivität. Triage-Dienst mit Rotation oder Round Robin; Triage-Regeln setzen Felder automatisch. [Linear Triage](https://linear.app/docs/triage), [Linear Changelog Triage responsibility](https://linear.app/changelog/2023-10-12-triage-responsibility)
- **SLA:** Linear: Standard 24 Stunden für Dringend, 1 Woche für Hoch, Geschäftstage wählbar, Symbol wechselt grau, gelb, orange, rot; sechs Zustände (geringes, mittleres, hohes Risiko, verletzt, erreicht, verfehlt); Benachrichtigung 24 Stunden vorher. Intercom: erste und nächste Antwortzeit getrennt, Uhr pausiert bei "wartet auf Kunde" ohne Neustart, Bürozeiten zählen (17:50 Eingang bei 15 Minuten SLA heißt 9:05 am nächsten Werktag). Front: Lastverteilung an die Person mit den wenigsten offenen Fällen bis zu einer Obergrenze, Abwesende bekommen nichts Neues. [Linear SLA](https://linear.app/docs/sla), [Intercom SLA](https://www.intercom.com/help/en/articles/6546152-set-slas-for-conversations-and-tickets), [Intercom Office Hours](https://www.intercom.com/help/en/articles/9263617-slas-and-office-hours), [Front Load Balancing](https://help.front.com/en/articles/2121)

### 3.2 Muster für UNIO

| Nr | Muster | Quelle | HUMAN-Schritt | Aufwand | Ohne Tokens | Priorität |
|---|---|---|---|---|---|---|
| B1 | **Kontingent-Regel schriftlich, im Shop sichtbar:** Kontingent gilt für den Monat. Am 20. Vorwarnung mit Vorschlag Vorproduktion (besteht). Ungenutztes: höchstens 25 Prozent für einen Monat übertragen, danach verfallen, oder als Evergreen am nächsten Drehtag produziert. Anzeige als Verbrauchskurve (Soll-Linie gegen Ist) statt nur Restzahl, Text: "3 Videos offen. Verfallen am 31.10. Am Drehtag 14.10. vorproduzieren?" | [Guttmann](https://www.benguttmann.com/blog/please-never-include-rollover-hours-in-your-retainer-contract), [Scoro](https://www.scoro.com/blog/retainer-management/), [Productive](https://help.productive.io/en/articles/9902502-retainer-hours-rollover) | Kontingent-Wächter (Roadmap 2.7), Shop | S | ja | P1 |
| B2 | **Triage mit vier Aktionen:** Annehmen (Owner, Frist), **Als Standard anbieten** (UNIO-Fassung von "Duplikat": verweist auf Katalogformat mit Preisunterschied, Format-Lotse), Ablehnen mit Grund aus Auswahl, Zurückstellen bis Datum oder Antwort des Maklers. Triage-Dienst wochenweise (Daniel, Ahmet, ASM) statt "wer es sieht". Tastatur 1 bis 4 im Team-Board. | [Linear Triage](https://linear.app/docs/triage) | Anfrage-Sortierer, Board (Roadmap 2.6) | S | ja | P1 |
| B3 | **SLA je Ticketart in Geschäftstagen:** Vorschlag Arbeitsstand: erste Antwort auf Sonderwunsch 1 Geschäftstag; Einschätzung mit Preis oder Standardvorschlag 2 Geschäftstage; Korrekturrunde 2 Geschäftstage; dringend (Objekt geht online) 4 Bürostunden. Uhr pausiert bei "wartet auf Makler". Farbstufen wie Linear, Warnung einen Geschäftstag vorher auf Heute. Dem Makler wird die Frist gezeigt ("Antwort bis Mittwoch, 12:00"), nicht das Wort SLA. | [Linear SLA](https://linear.app/docs/sla), [Intercom SLA](https://www.intercom.com/help/en/articles/6546152-set-slas-for-conversations-and-tickets) | Fristen-Wächter (Roadmap 2.7), Anfrage-Sortierer | M | ja | P1 |
| B4 | **Kapazität in Produktionseinheiten:** Heatmap Woche mal Person in Drehtag-Slots und Schnittstunden. Abo-Soll aus Kontingenten gilt als vorläufige Buchung, bestätigte Drehtage als feste. Ziel 80 Prozent, ab 90 Prozent Hinweis "Sammel-Drehtag oder Freie buchen". Verknüpft mit den Team-Regeln Sammel-Drehtag und Schnitt-Batch. | [Float](https://www.float.com/product/capacity-planning), [Teamwork](https://support.teamwork.com/projects/workload/workload-planner-overview) | Team-Board, Drehtag-Planer, Empfehlungs-Engine 5.1 | M | ja | P2 |
| B5 | **Lastverteilung mit Obergrenze:** Neue Tickets gehen an die Person mit den wenigsten offenen Tickets der passenden Art, bis zu einer Obergrenze; Abwesenheit sperrt Zuweisung. | [Front](https://help.front.com/en/articles/2121) | Anfrage-Sortierer | S | ja | P3 |

---

## 4. Shop und Self-Service in Agentur-Portalen

### 4.1 Befund

- **ManyRequests:** Service-Katalog mit Checkout, danach automatisch Portal. Je Service ein eigenes Bestellformular (Briefing beim Kauf). Kreditsystem: Landingpage 5, Anzeige 2, kleine Änderung 1 Credit; Admin setzt Abzug je Auftrag; Übertrag unbegrenzt oder für eine festgelegte Zahl an Monaten; Kunde sieht Gesamtguthaben, Verbraucht, Zugekauft. Kunden pausieren, setzen fort oder wechseln den Plan selbst im Portal. [ManyRequests Credits](https://help.manyrequests.com/en/articles/9229229-how-to-create-credit-based-services), [ManyRequests](https://manyrequests.com/)
- **Productized-Service-Muster:** Ein aktiver Auftrag pro Kunde (Hatchly, WPBuffs), Lieferzusage 24 bis 48 Stunden (Many Pixels), Zusatzleistungen getrennt bepreist, Wünsche außerhalb des Modells klar und freundlich ablehnen. [ManyRequests Guide](https://www.manyrequests.com/blog/productized-service-guide)
- **Designjoy:** Ein Abo, ein Auftrag gleichzeitig, unbegrenzte Warteschlange, im Schnitt zwei Werktage, Board in Trello. Pausieren: 31-Tage-Zyklus, wer nach 21 Tagen pausiert, behält 10 Tage. "Unbegrenzt" heißt unbegrenzte Warteschlange, nicht unbegrenzter Ausstoß. [designjoy.co](https://www.designjoy.co/), [1Capture Review](https://www.1capture.io/blog/designjoy-review)
- **Assembly (vormals Copilot, umbenannt September 2025):** Store mit höchstens 4 Abo-Plänen und 12 Einzelpaketen; nach dem Kauf landet der Kunde direkt im Portal; Automatik: erster Kauf löst Onboarding-Formular aus. [Assembly Store](https://assembly.com/blog/store), [Assembly Rebrand](https://assembly.com/copilot-rebrand)
- **SuperOkay:** Pakete im Katalog je Plan begrenzt (eins bis fünf). [Agency Handy Vergleich](https://www.agencyhandy.com/client-portal/agency-handy-vs-superokay/)

### 4.2 Muster für UNIO

| Nr | Muster | Quelle | HUMAN-Schritt | Aufwand | Ohne Tokens | Priorität |
|---|---|---|---|---|---|---|
| S1 | **Briefing im Checkout:** Jedes Katalogprodukt hat zwei bis vier Pflichtfelder (Objekt, Ziel, Termin, Besonderheit), Objekt und Brand-Profil werden vorbefüllt. Kein separater Briefing-Schritt für Standardformate; nur Sonderformate gehen durch den Format-Lotsen. | [ManyRequests](https://manyrequests.com/), [ManyRequests Guide](https://www.manyrequests.com/blog/productized-service-guide) | Shop, Format-Lotse (Roadmap 2.6) | S | ja | P1 |
| S2 | **Nach dem Kauf direkt in den Auftrag:** Bestätigung zeigt nicht "Danke", sondern den Auftrag mit nächstem Schritt, Owner und Datum ("Walkthrough eingeplant für den Drehtag 14.10. Du musst nichts tun."). | [Assembly Store](https://assembly.com/blog/store) | Shop, Aufträge | S | ja | P2 |
| S3 | **Lieferzusage auf jeder Karte:** "In 24 Stunden", "Am nächsten Drehtag", "Nach Freigabe in 2 Werktagen". Preis zuerst in Kontingent, dann in Euro ("1 Video aus deinem Kontingent, sonst 149 Euro"). Guthaben-Ansicht mit Enthalten, Verbraucht, Zugekauft. | [Designjoy](https://www.designjoy.co/), [ManyRequests Credits](https://help.manyrequests.com/en/articles/9229229-how-to-create-credit-based-services) | Shop, Check-out (Roadmap 2.6) | S | ja | P1 |
| S4 | **Sonderwünsche als sichtbare Warteschlange:** Ein aktiver Sonderwunsch je Makler, weitere stehen in einer Reihenfolge, die der Makler selbst ändert. Standardformate laufen parallel und unbegrenzt im Rahmen des Kontingents. | [Designjoy](https://www.designjoy.co/), [ManyRequests Guide](https://www.manyrequests.com/blog/productized-service-guide) | Anfrage-Sortierer, Shop | M | ja | P2 |
| S5 | **Katalog klein halten:** Obergrenze als Designregel: höchstens 4 Abos und 12 Einzelprodukte sichtbar, der Rest über Suche oder Objekt-Kontext ("Das Objekt ist der Einstieg, nicht der Katalog", Prozesslogik V2 §5). | [Assembly Store](https://assembly.com/blog/store) | Shop | S | ja | P2 |
| S6 | **Tauschkurs statt starrer Töpfe (Option):** Kontingent bleibt in Videos, Fotos, Grafiken sichtbar, darf aber getauscht werden (zum Beispiel 1 Video gegen 3 Grafiken). Geschäftsentscheidung für Daniel. | [ManyRequests Credits](https://help.manyrequests.com/en/articles/9229229-how-to-create-credit-based-services) | Shop, Kontingent-Wächter | S | ja | P3 |
| S7 | **Pausieren im Portal (Option):** Statt Verfall eine Pause mit Restlaufzeit wie bei Designjoy. Widerspricht teilweise B1; Entscheidung nötig, welche Regel gilt (Roadmap 2.7 sagt "Pause statt Verfall"). | [Designjoy](https://www.designjoy.co/) | Kontingent-Wächter, Abo | S | ja | P3 |

---

## 5. Quartals-Review und Versionierung der Strategie

### 5.1 Befund

- **QBR-Aufbau für Agenturen:** Zusammenfassung, Leistung gegen Ziele, Gewinne, Erkenntnisse und Hindernisse, optional Benchmark, 3 bis 4 Empfehlungen, offene Runde. 30 bis 60 Minuten, kürzer mit Pre-read. Rückschläge offen benennen und mit nächstem Schritt verbinden. Nachbereitung innerhalb 24 bis 48 Stunden mit den drei wichtigsten Punkten, Owner und Fristen, dazwischen kurze Monats-Checks. [AgencyAnalytics QBR](https://agencyanalytics.com/blog/quarterly-business-review-qbr)
- **Drei Fragen:** Was haben wir gesagt, was haben wir getan, was tun wir als Nächstes. Zweck ist, Entscheidungen zu erzwingen, nicht Status zu berichten; Entscheidungs-Log als fester Teil. [Sybill](https://www.sybill.ai/blogs/qbr-templates-agendas-and-best-practices), [ClearPoint](https://www.clearpointstrategy.com/blog/quarterly-business-review-templates)
- **Entscheidungen versionieren (Architecture Decision Records):** Titel, Status (vorgeschlagen, angenommen, abgelehnt, ersetzt), Kontext, Entscheidung, Folgen. Ein angenommener Eintrag wird nicht mehr bearbeitet; eine Änderung ist ein neuer Eintrag, der den alten ersetzt und verlinkt. [adr.github.io](https://adr.github.io/adr-templates/), [Microsoft Learn](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record)

### 5.2 Muster für UNIO

| Nr | Muster | Quelle | HUMAN-Schritt | Aufwand | Ohne Tokens | Priorität |
|---|---|---|---|---|---|---|
| Q1 | **Dossier als Pre-read, 48 Stunden vorher:** Gegliedert nach den drei Fragen. "Gesagt": Ziele und Hypothesen aus Strategie v1. "Getan": Posts je Säule, Rhythmus, angenommene Empfehlungen mit Ergebnis (E4). "Nächstes": höchstens 3 Entscheidungsvorlagen mit Zahl. Gespräch 45 Minuten nur für Entscheidungen. | [AgencyAnalytics](https://agencyanalytics.com/blog/quarterly-business-review-qbr), [Sybill](https://www.sybill.ai/blogs/qbr-templates-agendas-and-best-practices) | Quartals-Review Vorbereitung (Plan 4.5) | S | teilweise (Gerüst und Zahlen aus Regeln, Fließtext optional mit Claude) | P1 |
| Q2 | **Strategie-Änderung als Entscheidungs-Eintrag:** Jede Änderung an Säulen, Formaten, Rhythmus oder Positionierung ist ein Eintrag mit Kontext (Zahl aus dem Dossier), Entscheidung, erwarteter Folge, Messgröße, Prüfdatum und "ersetzt Feld X aus v1". Strategie v2 entsteht aus v1 plus Einträgen; Diff-Ansicht zeigt nur geänderte Felder. Angenommene Einträge sind unveränderlich. | [adr.github.io](https://adr.github.io/adr-templates/) | Strategie v+1 (Plan 4.5), Strategie-Schema (Plan Kap. 7) | M | ja | P1 |
| Q3 | **Hypothesen mit Prüfdatum:** Jeder Eintrag aus Q2 erscheint im nächsten Dossier automatisch als "gehalten" oder "nicht gehalten", gemessen an seiner eigenen Messgröße. | [ClearPoint](https://www.clearpointstrategy.com/blog/quarterly-business-review-templates) | Quartals-Review, Empfehlungs-Engine | S | ja | P2 |
| Q4 | **Nachbereitung am Tag danach:** Aus den Notizen am Schritt entsteht eine Zusammenfassung mit drei Punkten, Owner und Frist; offene Aufgaben landen als Schritte im Board. | [AgencyAnalytics](https://agencyanalytics.com/blog/quarterly-business-review-qbr) | Quartals-Review Gespräch, Board | S | teilweise | P2 |

---

## 6. Drei typische Fehler, die UNIO vermeiden soll

**Fehler 1: Falsche Nenner und Eitelkeitszahlen.** Engagement durch Follower, Reichweite über Posts aufsummiert und als Konto-Reichweite verkauft, Views in einer Linie mit alten Impressions, Branchenwerte ohne Formel (0,3 Prozent bei Dash Social gegen 3,7 Prozent bei Hootsuite für dieselbe Branche). Folge: Makler sehen Sprünge, die es nicht gibt, oder Rückgänge, die nur Methodik sind, und verlieren das Vertrauen in jede Zahl. Gegenmittel: R1, R2, R5.

**Fehler 2: Empfehlungen als Monatsritual ohne Schwelle und ohne Rückkopplung.** "Drei Empfehlungen pro Monat" verführt dazu, bei 4 Posts Rauschen zu deuten, und niemand prüft, ob eine angenommene Empfehlung gewirkt hat. Dazu kommt der Google-Ads-Effekt: Wenn Empfehlungen vor allem Mehrverkauf erzeugen (Shop-Produkte), werden sie ignoriert. Gegenmittel: E2 (Band und Mindestmenge), E4 (Wirkung nachhalten), Empfehlungen, die zum Shop führen, als solche kennzeichnen und mit Wirkungsbegründung versehen.

**Fehler 3: Kontingent und Sonderwünsche ohne schriftliche Regel.** Unbegrenzter Übertrag macht das Abo zum Guthabenkonto und erzeugt Produktionsspitzen; Verfall ohne Vorwarnung erzeugt Ärger; Sonderwünsche im Chat ohne Ticket, Owner und Frist erzeugen die "WhatsApp-Gedächtnis"-Lage, die der Plan (Kap. 2 Nr. 5) abschaffen will. Laut Praxisquellen sind unerwartete Überziehung und vermeintlicher Übertrag die zwei häufigsten Retainer-Streitfälle. Gegenmittel: B1, B2, B3, S4.

---

## 7. Abgleich mit Plan und Roadmap (Vorschläge, nicht umgesetzt)

| Stelle | Heute | Vorschlag aus diesem Benchmark |
|---|---|---|
| Plan 4.4 Report, Roadmap 2.5 | Reichweite, Saves, Sends, Follower als Summen | Je 1.000 erreichte Konten und als Median je Post (R1); Summe der Reichweite umbenennen (R5) |
| Plan 5.2 Regel "Rhythmus" | unter 3 Posts pro Woche | Bestätigt durch Buffer (3 bis 5 pro Woche verdoppeln Follower-Wachstum); im Text ergänzen, dass die Engagement-Rate dabei sinken darf (Hootsuite-Befund), damit niemand gegensteuert |
| Plan 5.2 Regel "Format" | Carousels mehr Saves, Reels mehr Reichweite | Mit Buffer-Zahlen belegen (Carousel 6,90 gegen Reel 3,31 Prozent je Reichweite; Reel plus 36 Prozent Reichweite) und je Format eigene Zielgröße (R4) |
| Plan Kap. 5 Kopf | Regel, Betroffene, Ersparnis, Handlung, Ablehnen | Erwartungsband und Mindestmenge (E2), Wirkungsprüfung nach 30 Tagen (E4) ergänzen |
| Plan 4.4 Kontingent, Roadmap 2.7 | "Pause statt Verfall" | Entscheidung zwischen B1 (25 Prozent, ein Monat) und S7 (Pause) treffen und im Shop wörtlich zeigen |
| Plan 4.6, Roadmap 2.6 | Ticket mit Owner und Frist | Vier Triage-Aktionen, Triage-Dienst, SLA-Stufen mit Pause (B2, B3) |
| Plan 4.5 | Dossier, Gespräch, Strategie v+1 | Pre-read 48 Stunden vorher, Entscheidungs-Einträge mit Prüfdatum (Q1 bis Q3) |
| Ideen für Phase 5 | CSV-Import | Graph API liefert `reels_skip_rate` und `ig_reels_avg_watch_time`; dann Regel "Hook": Skip-Rate über eigenem Median, Skript-Prüfung verweisen |

---

## 8. Widersprüche und Unsicherheiten in den Quellen

- **Frequenz:** Hootsuite misst die höchste Engagement-Rate bei 2 Posts pro Woche, Buffer das stärkste Follower-Wachstum bei 3 bis 5 und mehr. Beides stimmt: Die Rate je Post sinkt, die absolute Wirkung steigt. HUMAN misst Wachstum und Sends je 1.000, nicht die Rate.
- **Stichtag Views:** Meta stellte am 21.04.2025 um, Metricool beschriftet ab 01.01.2025 als Views, die API führt Impressions für Medien ab 02.07.2024 als abgekündigt. Für HUMAN gilt: Vergleiche über den 21.04.2025 hinweg nur mit Reichweite.
- **Mosseri-Zitate ab Ende 2025** (Originalität, Zwei-Wege-Gespräch, Prozentwerte) sind nur sekundär belegt und nicht in Produkttexten zu verwenden.
- **Exportspalten:** Meta dokumentiert die CSV-Kopfzeile nicht offiziell; deutsche Bezeichnungen sind rekonstruiert. Der Mapper im Prototyp ist mit einem echten Export eines UNIO-Maklers zu prüfen.
- **Immobilien-Benchmarks** sind überall gebündelt oder ohne offengelegte Stichprobe; es gibt keinen belastbaren Wert für Wiener Einzelmakler. Die UNIO-Kohorte (R2) wird nach wenigen Monaten der bessere Vergleich sein.

---

## 9. Quellen

Social-Reporting und Metriken
- https://docs.emplifi.io/platform/latest/home/instagram-insights-metrics-deprecation-april-2025
- https://www.socialpilot.co/instagram-marketing/instagram-views-metrics-changes
- https://help.metricool.com/instagram-replaces-impressions-with-views-what-you-need-to-know-f6n8j
- https://developers.facebook.com/docs/instagram-platform/reference/instagram-media/insights
- https://frameos.studio/blog/how-to-read-instagram-insights
- https://www.poststeady.com/resources/export-instagram-insights-to-csv
- https://gsdsolutionsinc.com/how-to-download-content-analytics-from-meta-business-suite-ig-and-fb-updated-2026/
- https://www.dataslayer.ai/blog/instagram-algorithm-2025-complete-guide-for-marketers
- https://influencermarketinghub.com/instagram-sends-per-reach-playbook/
- https://www.dashsocial.com/press-release/dash-socials-trend-report-highlights-why-shares-are-emerging-as-a-top-kpi-for-brands
- https://apaya.com/blog/social-media-benchmarks-real-estate
- https://www.socialinsider.io/social-media-benchmarks/instagram
- https://buffer.com/resources/state-of-social-media-engagement-2026/
- https://buffer.com/resources/instagram-reach-engagement-analysis/
- https://www.socialmediatoday.com/news/study-shows-posting-more-instagram-leads-to-more-reach/757633/
- https://blog.hootsuite.com/social-media-benchmarks/
- https://metricool.com/reports/
- https://metricool.com/metricool-studio/
- https://support.sproutsocial.com/hc/en-us/articles/211892343-How-do-I-use-the-Tag-Performance-Report
- https://sproutsocial.com/insights/ai-social-media-assistant/
- https://influencermarketinghub.com/iconosquare/
- https://later.com/blog/best-time-to-post-on-instagram/

Empfehlungen und Berichte
- https://support.google.com/google-ads/answer/9061546?hl=en
- https://searchengineland.com/google-ads-recommendations-auto-apply-465909
- https://www.bounteous.com/insights/2026/09/21/practical-guide-ga4-anomaly-detection/
- https://almcorp.com/blog/ai-powered-insights-in-ga4/
- https://www.socialinsider.io/blog/social-media-report-executive-summary/
- https://sproutsocial.com/insights/executive-summary-social-media-report/
- https://www.getmailbird.com/client-reporting-email/
- https://databox.com/client-reporting-best-practices

Agentur-Betrieb
- https://support.teamwork.com/projects/workload/workload-planner-overview
- https://www.float.com/product/capacity-planning
- https://www.float.com/resources/capacity-management
- https://help.productive.io/en/articles/9902502-retainer-hours-rollover
- https://www.scoro.com/features/retainers/
- https://www.scoro.com/blog/retainer-management/
- https://www.benguttmann.com/blog/please-never-include-rollover-hours-in-your-retainer-contract
- https://beancount.io/blog/2026/04/24/retainer-agreement-template-service-business-guide
- https://linear.app/docs/triage
- https://linear.app/changelog/2023-10-12-triage-responsibility
- https://linear.app/docs/sla
- https://www.intercom.com/help/en/articles/6546152-set-slas-for-conversations-and-tickets
- https://www.intercom.com/help/en/articles/9263617-slas-and-office-hours
- https://help.front.com/en/articles/2121

Shop und Self-Service
- https://manyrequests.com/
- https://help.manyrequests.com/en/articles/9229229-how-to-create-credit-based-services
- https://www.manyrequests.com/blog/productized-service-guide
- https://www.designjoy.co/
- https://www.1capture.io/blog/designjoy-review
- https://assembly.com/blog/store
- https://assembly.com/copilot-rebrand
- https://www.agencyhandy.com/client-portal/agency-handy-vs-superokay/

Quartals-Review und Versionierung
- https://agencyanalytics.com/blog/quarterly-business-review-qbr
- https://www.sybill.ai/blogs/qbr-templates-agendas-and-best-practices
- https://www.clearpointstrategy.com/blog/quarterly-business-review-templates
- https://adr.github.io/adr-templates/
- https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record
