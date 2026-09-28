# UNIO HUMAN. Benchmark Akquise bis Strategie

Stand: 28.09.2026. Thema: Akquise, Vertrag, Onboarding, Terminbuchung, Datenimport, Workshop und Strategie.
Bezug: `docs/UNIO_HUMAN_ROADMAP.md` (2.1 bis 2.3) und `docs/UNIO_HUMAN_V5_STUFEN.md` (Stufen 2 und 3). Diese Datei ändert nichts an den Plänen. Sie liefert Muster mit Quelle und gleicht sie mit dem ab, was in `ui_kits/human/human-werkzeuge.jsx`, `human-strategie.jsx` und `human-flow.jsx` schon gebaut ist.

**Legende**

| Feld | Werte |
|---|---|
| HUMAN-Schritt | Research, Kennenlernen, Follow ups, Deep Dive, Signing, Vertrag, Platform On-Boarding, Import, Termine, Strategie-Termin, Workshop, Results Upload, Strategy Generated, Presentation und Planning |
| Aufwand | klein (unter einem Tag), mittel (ein bis drei Tage), groß (mehr als drei Tage) |
| Browser ohne Tokens | ja (reiner Browser, deterministisch), teilweise (Browser mit Modell-Download oder Server nur für Versand), nein (Server oder API-Schlüssel nötig) |
| Priorität | P1 (nächste Stufe), P2 (danach), P3 (Betrieb) |

Hinweis zur Quellenlage: Hersteller-Seiten beschreiben sich selbst. Übernommen werden Funktionsbeschreibungen, keine Leistungsversprechen. Rechtliche Aussagen sind eine Recherche, keine Rechtsberatung, und vor dem Einsatz von einer Kanzlei zu prüfen.

---

## 1. CRM-Pipelines und Nachfass-Takt

**Was die Besten machen**
- **Attio** zählt auf jeder Kanban-Karte die Zeit in der aktuellen Stufe. Je Stufe lässt sich eine Zielzeit setzen. Ist sie überschritten, wird der Zähler in der Kartenecke rot. Dazu gibt es einen Bericht "Time in stage" mit Ziellinie. Datenmodell: Status-Attribut treibt das Board, jede Karte führt zur Datensatzseite mit frei wählbaren Kopf-Widgets.
- **Pipedrive** markiert Deals als "rotting", wenn sie eine je Stufe einstellbare Zahl von Tagen unberührt bleiben. Erledigte Aktivitäten, Notizen, Mails und Feldänderungen setzen den Zähler zurück. Schwäche laut eigener Doku: geplante künftige Aktivitäten zählen nicht, ein Deal mit Termin in drei Wochen wird trotzdem rot. Die Pipeline sortiert nach Datum der nächsten Aktivität, Deals ohne nächste Aktivität fallen auf.
- **Close** hat "Workflow Goals": Eine eingehende Mail, SMS, ein Anruf oder ein gebuchter Termin pausiert den Takt automatisch und zählt den Kontakt als "Converted". Versand standardmäßig Montag bis Freitag zwischen 9 und 16 Uhr in der Zeitzone des Kontakts, dazu Sperrkalender für Feiertage und Urlaub. Smart Views sind gespeicherte Filter, in die Leads von selbst hinein- und hinausfallen.
- **HubSpot Sequences** mischen automatische Mails mit Aufgaben (Mail von Hand, Anruf, LinkedIn, allgemein). Verzögerungen laufen in Werktagen, Versand in einem Zeitfenster, Folge-Mails wahlweise im selben Thread. Ausstieg bei Antwort und bei Terminbuchung über den Link, auf Wunsch für die ganze Firma des Kontakts.
- **folk** schlägt Nachfassen vor, wenn ein Gespräch eingeschlafen ist und ein offener nächster Schritt erkannt wurde (Bedingung: mindestens zwei Mailwechsel in zwei Monaten). Hinweis erscheint als Banner am Kontakt, Klick öffnet einen fertigen Entwurf.

**Muster für UNIO**

| Muster | Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|
| **Ausstiegsziele im Nachfass-Takt.** Neben "Gesendet" die Knöpfe "Hat geantwortet", "Termin gebucht" und "Kein Interesse". Jeder beendet den Takt und schreibt den Ausgang mit. Ein über den Termin-Planer gebuchter Termin beendet den Takt ohne Klick. Daraus die Quote je Stufe (wie viele nach Tag 0, 2, 7, 14 antworten) | [Close Workflows](https://help.close.com/docs/workflows), [HubSpot Unenroll](https://knowledge.hubspot.com/sequences/unenroll-from-sequence) | Follow ups | klein | ja | P1 |
| **Zeit in Stufe mit Zielwert.** Jede Lead-Karte zeigt die Tage in der aktuellen Stufe, Zielwerte je Stufe (etwa Kennenlernen 5 Tage, Deep Dive 7 Tage, Signing 3 Tage). Überschritten heißt Status-Punkt in Signalfarbe. Anders als Pipedrive wird nicht rot, wer einen geplanten nächsten Schritt hat | [Attio Kanban](https://attio.com/help/reference/managing-your-data/views/create-and-manage-kanban-views), [Attio Time in stage](https://attio.com/help/reference/managing-your-data/dashboard-and-reports/set-up-a-time-in-stage-report), [Pipedrive Rotting](https://support.pipedrive.com/en/article/the-rotting-feature) | Research bis Signing, Team-Heute | klein | ja | P1 |
| **Werktage und Sperrtage.** Fälligkeit des Takts in Werktagen statt Kalendertagen, nie am Wochenende oder an österreichischen Feiertagen (Ostern und die beweglichen Feiertage lassen sich im Browser berechnen), dazu Urlaubssperre je Teammitglied. Gleiche Liste für den Termin-Planer | [HubSpot Sequences](https://knowledge.hubspot.com/sequences/create-and-edit-sequences), [Close Workflows](https://help.close.com/docs/workflows) | Follow ups, Termine | klein | ja | P1 |
| **Jeder offene Lead hat genau einen nächsten Schritt mit Datum.** Leads ohne nächsten Schritt stehen oben auf Team-Heute. Regel statt KI wie bei folk: nach Kennenlernen oder Deep Dive ohne vereinbarten Schritt nach drei Werktagen der Hinweis "Kein nächster Schritt" mit passender Vorlage | [Pipedrive Pipeline-Ansicht](https://support.pipedrive.com/hc/en-us/articles/115001107229-What-are-the-colored-icons-on-the-deals-in-the-Pipeline-View-), [folk Follow-up Assistant](https://help.folk.app/en/articles/10304768-follow-up-assistant) | Follow ups, Deep Dive | klein | ja | P2 |
| **Kanal je Stufe statt nur "Text kopieren".** Takt-Schritt hat einen Kanal (WhatsApp, Mail, Anruf, LinkedIn). WhatsApp öffnet `wa.me` mit vorbefülltem Text, Mail öffnet `mailto:` mit Betreff, Anruf zeigt Nummer und Gesprächsnotiz. Versand bleibt beim Menschen, kein Server nötig | [HubSpot Sequences](https://knowledge.hubspot.com/sequences/create-and-edit-sequences) | Follow ups | klein | ja | P2 |

**Stand in HUMAN.** `hmNachfass` rechnet Tag 0, 2, 7, 14 in Kalendertagen ab `ersterKontakt`. Eine Fälligkeit kann dadurch auf Samstag fallen. Ein Ausstieg bei Antwort gibt es nur indirekt über den Stufenwechsel.

---

## 2. Vertrag und E-Signatur

**Rechtslage Österreich, kurz**
- eIDAS kennt drei Stufen. **Einfach (SES):** Name, Klick, gezeichnete Unterschrift. **Fortgeschritten (AES, Art. 26 eIDAS):** eindeutig der Person zugeordnet, identifiziert sie, unter ihrer alleinigen Kontrolle erstellt, jede spätere Änderung am Dokument erkennbar. **Qualifiziert (QES):** AES plus qualifiziertes Zertifikat und Signaturerstellungseinheit.
- Nur die QES erfüllt die gesetzliche Schriftform (§ 4 Abs. 1 SVG in Verbindung mit § 886 ABGB). Notariatsakte, Beglaubigungen und Bürgschaften bleiben ausgenommen. Ein formfreier Vertrag ohne vereinbarte Schriftform kann auch mit SES wirksam geschlossen werden. Die Stufe ist dann eine Beweisfrage, keine Wirksamkeitsfrage ([Brandauer Rechtsanwälte 2026](https://brandauer-rechtsanwaelte.at/2026/08/24/qualifizierte-elektronische-signatur-schriftform-oesterreich/)).
- Der UNIO-Abo-Vertrag ist B2B und formfrei. SES reicht rechtlich, AES verbessert die Beweislage.
- **Falle Gründer.** Wer als Makler erst startet, schließt Gründungsgeschäfte. Nach § 1 Abs. 3 KSchG gilt er dabei als Verbraucher, auch bei Dauerschuldverhältnissen. Weil das FAGG auf den Verbraucherbegriff des KSchG verweist, kann bei Fernabschluss ein 14-tägiges Rücktrittsrecht bestehen ([WKO FAQ KSchG](https://www.wko.at/vertragsrecht/anwendungsbereich-konsumentenschutzgesetz-faqs), [verbraucherrecht.at](https://verbraucherrecht.at/ab-wann-gilt-ein-unternehmer-als-unternehmer/2587), [WKO Dienstleistungen](https://www.wko.at/internetrecht/ruecktrittsrecht-bei-dienstleistungen-im-internet)). HUMAN sollte im Vertrag fragen, ob das Maklergewerbe schon ausgeübt wird, und für Gründer Belehrung und ausdrücklichen Leistungsbeginn vor Fristende einblenden.
- **AVV.** Sobald Makler Kunden- und Objektdaten in HUMAN importieren, verarbeitet UNIO sie im Auftrag. Das braucht eine Vereinbarung nach Art. 28 DSGVO. Die WKO stellt ein österreichisches Muster bereit ([WKO Mustervertrag](https://www.wko.at/datenschutz/eu-dsgvo-auftragsverarbeitung-mustervertrag)). Sie gehört als Anlage in denselben Unterschriftsvorgang.
- **Youtrust (vormals Yousign).** AES mit Ausweisprüfung und Einmal-Code plus Prüfprotokoll. Die Signatur lässt sich per SDK im iframe einbetten, mit den Ereignissen `started`, `success`, `declined` und `signature.done`. Voraussetzungen: `delivery_mode: none` und freigegebene Domains. **QES ist im iframe nicht möglich** ([Youtrust iFrame](https://developers.youtrust.com/docs/using-iframe), [Youtrust AES](https://youtrust.com/advanced-electronic-signature)). Die API gibt es nur in Developer- oder Enterprise-Tarifen, eine Sandbox ist kostenlos.
- **ID Austria** erzeugt eine QES kostenlos über die PDF-Signatur auf oesterreich.gv.at oder A-Trust. Das ist der Weg, falls einmal Schriftform gebraucht wird ([Digital Austria](https://www.digitalaustria.gv.at/wissenswertes/e-government-a-z/elektronische-signaturen.html), [Stadt Wien](https://www.wien.gv.at/spezial/foerderhandbuch/e-government/elektronische-eigenhandige-unterschriften-mit-id-austria-elektronischer-identitatsnachweis-e-id-oder-primesign/)).

**Was die Besten machen**
- **DocuSign** führt Feld für Feld durch das Dokument. Die "Focused View" nimmt jede Fremd-Oberfläche weg und zeigt nur Dokument und einen Knopf, dazu die Ereignisse `ready` und `sessionEnd` statt Weiterleitung. DocuSign Web Forms machen aus PDFs mobile, geführte Abläufe.
- **HoneyBook Smart Files** und **Dubsado** bündeln Leistung wählen, Vertrag unterschreiben und Rechnung zahlen in einem Link. Die Rechnungsdaten fließen automatisch in die Vertragsfelder.
- **PandaDoc** arbeitet mit Variablen, Rollen, Preistabellen und "Smart Content" (bedingte Blöcke). Dazu kommt eine Leseanalyse mit Zeit je Seite.

**Muster für UNIO**

| Muster | Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|
| **Geführtes Lesen und Unterschreiben.** Der Vertrag wird abschnittsweise gelesen (Leistung, Preis, Freigabe, Rechte, Daten, AVV), jeder Abschnitt wird bestätigt. Unten steht genau ein Knopf, der zum nächsten offenen Punkt springt. Unterschrift mit getipptem Namen oder gezeichnet, mobil zuerst | [DocuSign Focused View](https://www.docusign.com/blog/developers/15-minutes-to-better-ux-enhancing-embedded-signing-focused-view), [HoneyBook Signatur](https://help.honeybook.com/en/articles/9509224-elevate-your-clients-e-signature-experience) | Signing, Vertrag | klein | ja | P1 |
| **Beweisprotokoll statt nur Prüfsumme.** Ereignisse mit Zeit: erzeugt, geöffnet, Abschnitte bestätigt, unterschrieben. Dazu Browser, Gerät und Version des Vertragstexts. Den SHA-256-Wert über das fertige PDF bilden, nicht nur über den Text, und als letzte Seite drucken. Im Betrieb: Einmal-Code per Mail und Kopie an beide Seiten | [eIDAS Art. 26](https://legislation.gov.uk/eur/2014/910/article/26/data.html), [Youtrust AES](https://youtrust.com/advanced-electronic-signature) | Vertrag | mittel | teilweise (Code und Versand brauchen Server) | P1 |
| **Ein Durchgang: Abo wählen, Vertrag, Zahlungsweise.** Der Makler wählt im Vertrag selbst zwischen den Abos, Preis und Kontingent fließen in den Text. Bedingte Klauseln: Gründer-Belehrung, Drehtag-Regel, AVV. Die Zahlung (SEPA-Mandat) folgt im selben Ablauf | [Dubsado Proposal](https://help.dubsado.com/en/articles/14426383-connect-a-contract-and-invoice-to-a-proposal), [HoneyBook Smart Files](https://help.honeybook.com/en/articles/5259399-what-are-smart-files), [PandaDoc Smart Content](https://support.pandadoc.com/en/articles/9714634-smart-content-block-conditional-content) | Signing | mittel | ja (Zahlung nein) | P2 |
| **AES über Youtrust im iframe**, ohne Umleitung, mit SDK-Ereignissen. `success` setzt die Vertragsstufe und startet das Onboarding. Der Nachrichtenvertrag bleibt gleich (`vt:bereit`, `vt:ergebnis`, `vt:fertig`) | [Youtrust iFrame](https://developers.youtrust.com/docs/using-iframe), [Youtrust Webhooks](https://developers.yousign.com/docs/webhooks) | Vertrag | mittel | nein | P2 |
| **Status statt Überwachung.** Team sieht "Vertrag geöffnet" und "wartet auf Unterschrift seit 2 Tagen", aber keine Lesezeit je Seite wie bei PandaDoc. Der Nachfass-Takt nutzt nur den Status | [PandaDoc Analytics](https://support.pandadoc.com/en/articles/9714822-review-document-analytics) | Signing, Follow ups | klein | teilweise | P3 |

**Stand in HUMAN.** `hmVertragText` hat sechs Abschnitte. Es fehlen Laufzeit und Kündigung, Zahlungsbedingungen, AVV, Gerichtsstand und der Gründerfall. Die Prüfsumme belegt wie vermerkt nur die Unverändertheit des Texts, nicht die Identität.

---

## 3. Terminbuchung

**Was die Besten machen**
- **Cal.com**: Puffer vor und nach jeder Terminart (5 bis 120 Minuten), zählt als belegt und addiert sich über Nachbartermine. Mindestvorlauf, Buchungshorizont in Kalender- oder Werktagen, Obergrenzen je Tag, Woche oder Monat, Obergrenze aktiver Buchungen je Person. Plätze je Slot für Gruppentermine. Workflows mit Bestätigung, Erinnerung 24 Stunden und 1 Stunde vorher per Mail, SMS oder WhatsApp.
- **Calendly**: Round Robin in zwei Modi, "Optimize for availability" (wer frei ist, mit Priorität) und "Equal distribution" (wer drei oder mehr Termine voraus ist, wird vorübergehend ausgeblendet). Routing-Formulare vorab. Workflows für Rückbestätigung und No-Show-Nachfassen. Empfehlung: Mail 24 Stunden vorher, SMS 30 Minuten vorher.
- **SavvyCal**: Der Empfänger legt seinen eigenen Kalender über die Slots. "Ranked availability" zeigt bevorzugte Zeiten zuerst, ohne andere zu sperren. Persönliche Links, Frequenzgrenzen, Terminumfragen.

**Muster für UNIO**

| Muster | Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|
| **Terminarten mit Dauer, Puffer und Tageslimit.** Kennenlernen 20 Minuten plus 10 Minuten Puffer. Strategie-Workshop 120 Minuten plus 30 Minuten danach für die Mitschrift, höchstens zwei Workshops pro Woche für Daniel. Foto-Termin am Drehtag. `dauer` wirkt dann wirklich auf die Belegung (heute wird nur die volle Stunde geprüft) | [Cal.com Buffers](https://cal.com/help/event-types/event-buffer), [Cal.com Limits](https://cal.com/blog/cal-v-2-1), [SavvyCal](https://savvycal.com/meeting-scheduler) | Kennenlernen, Strategie-Termin, Foto-Termin | klein | ja | P1 |
| **Kalenderdatei, die überall stimmt.** `TZID=Europe/Vienna` mit `VTIMEZONE`, stabile `UID` je Termin, `SEQUENCE` beim Verschieben, zwei `VALARM` (1 Tag und 1 Stunde vorher). Damit erinnert der eigene Kalender ohne Server, und eine Verschiebung ersetzt den alten Eintrag statt einen zweiten anzulegen | [RFC 5545](https://www.rfc-editor.org/rfc/rfc5545), [Calendly Reminders](https://calendly.com/blog/guide-calendly-reminders) | alle Termine | klein | ja | P1 |
| **Gerankte Vorschläge mit Grund.** Die ersten zwei Slots sind "passt am besten" mit Begründung in Klartext: "am selben Tag wie Ihr Drehtag", "vor dem Fragebogen-Termin", "Daniel hat vormittags Workshops". Die Drehtag-Bevorzugung gibt es schon, sie wird zur allgemeinen Regel | [SavvyCal](https://savvycal.com/meeting-scheduler) | Termine | klein | ja | P2 |
| **Rückbestätigung und No-Show.** 24 Stunden vorher "Passt es noch?" mit "Ja" und "Verschieben". Ein No-Show-Knopf für das Team startet einen eigenen kurzen Takt. Im Prototyp als Aufgabe auf Heute, im Betrieb per Mail oder SMS | [Calendly Workflows](https://calendly.com/blog/workflows), [Cal.com Workflows](https://cal.com/workflows) | Kennenlernen, Strategie-Termin | klein (Aufgabe), mittel (Versand) | teilweise | P2 |
| **Round Robin und Gruppenslots.** Kennenlernen gleichmäßig auf Nikita, Florian und Ahmet verteilen, mit Priorität für die Region. Eine Onboarding-Sprechstunde zu Tutorials und BO-Software als Gruppenslot mit sechs Plätzen statt Einzelterminen | [Calendly Round Robin](https://calendly.com/help/round-robin-distribution-overview), [Cal.com Seats](https://github.com/calcom/cal.com/issues/13331) | Kennenlernen, BO Software, Tutorials | mittel | ja (Prototyp) | P3 |

**Stand in HUMAN.** `hmSlots` überspringt Wochenenden, aber keine Feiertage. Der 26.10. und der 8.12. wären buchbar. `hmIcs` schreibt eine lokale Zeit ohne Zeitzone und ohne Erinnerung, die `UID` kommt aus `Date.now()`.

---

## 4. Import von Kunden und Objekten

**Was die Besten machen**
- **Flatfile** ordnet laut eigener Aussage rund 95 % der Spalten automatisch zu, mit Fuzzy-Matching und Lernen über Importe. Prüfregeln laufen auf drei Ebenen (Spalte, Zeile, Schritt). Im Review-Schritt wird jede Änderung sofort neu geprüft.
- **OneSchema** behebt Fehler im Review: Suchen und Ersetzen über eine Spalte, Autofix für Datum und Telefon, Zeilen löschen, Rückgängig. Fehlerspezifische Vorschläge heben laut Hersteller die Abschlussquote.
- **Dromo** erkennt Trennzeichen, Kodierung (Windows-1252, BOM), Kopfzeile und Typen automatisch. Es merkt sich Zuordnungen je Quelle (`importIdentifier`). Im "Private Mode" verarbeitet es die Datei vollständig im Browser, der Server sieht nichts.

**Muster für UNIO**

| Muster | Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|
| **Kodierung, Kopfzeile und Blatt erkennen.** Erst als UTF-8 lesen. Tauchen Ersatzzeichen auf, mit `TextDecoder("windows-1252")` neu lesen, denn Excel-CSV aus Österreich macht sonst aus "Straße" ein "Stra�e". Die Kopfzeile ist die erste Zeile mit überwiegend Text. Bei mehreren Excel-Blättern wird gefragt, welches gemeint ist | [Dromo CSV Guide](https://dromo.io/blog/ultimate-guide-to-csv-imports), [Dromo FAQ](https://developer.dromo.io/faqs) | Import | klein | ja | P1 |
| **Fehler in der Vorschau beheben statt nur melden.** Filter "Nur Zeilen mit Problemen", Zelle direkt bearbeiten mit sofortiger Neuprüfung, Sammelkorrektur ("Allen Wiener Festnetznummern ohne Vorwahl +43 1 voranstellen", ".at fehlt ergänzen"), Zeile ausschließen, Rückgängig | [OneSchema Importer](https://www.oneschema.co/embeddable-importer), [Flatfile Data Hooks](https://flatfile.com/blog/flatfileioblogdata-hooks-guide/) | Import | mittel | ja | P1 |
| **Privat-Versprechen sichtbar machen.** Über der Ablage: "Die Datei wird auf Ihrem Gerät gelesen. Übertragen wird erst, was Sie übernehmen." Dazu der AVV-Hinweis und eine Pflichtangabe zur Herkunft der Kontakte (eigene Kunden, Interessenten mit Einwilligung) | [Dromo Datenschutz](https://dromo.io/data-privacy), [WKO AVV](https://www.wko.at/datenschutz/eu-dsgvo-auftragsverarbeitung-mustervertrag) | Import | klein | ja | P1 |
| **Zuordnung merken und Quellen-Vorlagen.** Für onOffice, Propstack und JUSTIMMO die typischen Exportspalten fest hinterlegen. Die einmal korrigierte Zuordnung wird je Makler gespeichert. Beim nächsten Export muss niemand mehr zuordnen | [Dromo Mapping](https://dromo.io/blog/data-mapping-best-practices-csv-imports) | Import | klein | ja | P2 |
| **Wahrscheinliche Dubletten mit Entscheidung.** Heute wird nur bei gleicher Mail zusammengeführt. Neu: gleiche Telefonnummer nach Normalisierung, oder Namen mit Levenshtein 1 bei gleicher PLZ. Solche Paare stehen als "Wahrscheinlich dieselbe Person" mit "Zusammenführen" und "Getrennt lassen" da. Die Levenshtein-Funktion gibt es schon im Glossar der Mitschrift | [OneSchema Changelog](https://www.oneschema.co/changelog) | Import | klein | ja | P2 |

**Stand in HUMAN.** `hmCsv` liest nur UTF-8 (`file.text()`), `hmTabelleLesen` nur das erste Blatt, `hmZuordnen` sucht nur exakte Synonyme in Zeile 1. SheetJS kommt als 0.18.5 von cdnjs. Für diese Version sind Sicherheitslücken beim Lesen präparierter Dateien gemeldet (CVE-2023-30533, behoben ab 0.19.3). Für den Betrieb die aktuelle Version vom SheetJS-eigenen CDN prüfen.

---

## 5. Onboarding-Portal

**Was die Besten machen**
- **Moxo**: Ein "Magic Link" öffnet ohne Konto direkt die erste offene Aufgabe des Kunden. Schritte sind Aktionen (Upload, Formular, Checkliste, Freigabe) mit Rolle (Kunde oder Team). Ist ein Schritt erledigt, öffnet sich der nächste von selbst. Das Team sieht, wo Kunden hängen.
- **Stripe Connect** unterscheidet `currently_due` (jetzt nötig, damit es weitergeht) von `eventually_due` (irgendwann nötig). Das Onboarding fragt wahlweise nur das Erste ab und holt den Rest später. Die Oberfläche weiß selbst, was fehlt.
- **Linear** hat ein Onboarding von rund 60 Sekunden ohne Rollenwahl und ohne Einstellungen. Der Arbeitsbereich ist mit vorbildlichen Beispieldaten gefüllt. Leere Zustände zeigen genau eine Handlung. Die Struktur verhindert schlechte Abläufe, statt sie zu erklären.
- **Notion-Portale** für Agenturen: Checklisten mit Zugängen, Assets, Freigaben, Verantwortlichen und Blockern. Stark als Liste, schwach als Führung, weil der Kunde selbst suchen muss, was dran ist.

**Muster für UNIO**

| Muster | Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|
| **Jetzt nötig und später nötig trennen.** Jede Etappe im Plan bis live bekommt die Eigenschaft "blockiert Go-live" oder "kann später". Vor Tag 10 fragt HUMAN nur Vertrag, Fragebogen, Strategie-Termin und Fotos ab. Tutorials, Visitenkarte und Shop erscheinen erst danach, mit eigener Frist | [Stripe Onboarding](https://docs.stripe.com/connect/hosted-onboarding) | Platform On-Boarding, Plan bis live | klein | ja | P1 |
| **Wer ist dran.** Jede Etappe zeigt "Sie", "UNIO-Team (Name)" oder "wartet auf Termin am …". Liegt etwas länger als die Zielzeit beim Team, greift der Liegen-Alarm aus dem Vault. Der Makler sieht nie eine Aufgabe, die gerade gar nicht bei ihm liegt | [Moxo Onboarding Flow](https://www.moxo.com/blog/build-customer-onboarding-flow), [Notion Agency Portal](https://www.notion.com/templates/agency-client-portal-os) | Platform On-Boarding, Team-Heute | klein | ja | P1 |
| **Ein Link direkt zur nächsten Aufgabe.** Nach der Unterschrift bekommt der Makler einen persönlichen Link, der ohne Passwort auf Heute mit genau dem nächsten Schritt landet. Passwort oder Passkey wird erst beim zweiten Besuch angeboten | [Moxo Magic Links](https://www.moxo.com/blog/build-customer-onboarding-flow) | Platform On-Boarding | mittel | nein (Token im Betrieb) | P2 |
| **Das fertige Bild vor dem ersten Schritt.** Statt einer Tour mit vier Bildern ein Musterprofil "So sieht Ihr Tag 30 aus": Website, erstes Video, Porträt und Plan eines Beispielmaklers. Leere Bereiche zeigen genau eine Handlung | [Linear Teardown](https://www.candu.ai/blog/linear-onboarding-teardown), [Supademo Linear](https://supademo.com/user-flow-examples/linear) | Platform On-Boarding | klein | ja | P2 |

---

## 6. Workshop, Mitschrift und Transkription

**Was die Besten machen**
- **Granola** arbeitet ohne Bot. Der Mensch tippt während des Gesprächs Stichworte, danach macht "Enhance notes" daraus strukturierte Notizen. Aus einem Stichwort wie "Preisbedenken" werden alle passenden Stellen mit Zitat. Vorlagen legen die Gliederung je Gesprächsart fest, "Recipes" sind gespeicherte Auswertungen auf Knopfdruck.
- **Otter** hat einen Knopf "Highlight", der den gerade transkribierten Abschnitt markiert, dazu Kommentare und Aufgaben im Live-Transkript.
- **tl;dv** gliedert die Notizen mit Zeitstempeln nach Themen und fasst über mehrere Meetings zusammen (häufige Themen, Einwände).
- **Fathom** macht aus Stellen teilbare Clips und zieht Aufgaben heraus. Mit "Ask Fathom" lässt sich über alle Gespräche suchen.
- **Whisper im Browser**: `whisper-large-v3-turbo` hat 809 Mio. Parameter. Der Decoder ist von 32 auf 4 Schichten gekürzt, das Modell ist rund viermal schneller als large-v3 bei kaum schlechterer Fehlerquote. `primeline/whisper-large-v3-turbo-german` (Apache-2.0) senkt die Fehlerquote auf Deutsch deutlich: Tuda-De 6,4 statt 8,3 %, Common Voice 19 3,2 statt 3,8 %. `primeline/distil-whisper-large-v3-german` hat 756 Mio. Parameter. Auf WebGPU liefern q8-Decoder in transformers.js Unsinn, q4 oder fp16/fp32 funktionieren (Issue 1317). WebGPU ist nicht immer schneller: Ein Nutzer maß auf einem M2 60 Sekunden Audio mit WASM in 4,9 bis 5,9 Sekunden, mit WebGPU in 9,5 Sekunden (Issue 894). WebGPU läuft standardmäßig in Chrome und Edge, in Safari 26 (macOS und iOS) und in Firefox ab 141 unter Windows.
- **Sprecher trennen im Browser** geht inzwischen. Die Demo "Whisper Diarization" von Xenova verbindet Whisper-Zeitstempel mit `onnx-community/pyannote-segmentation-3.0`, vollständig lokal. Die Annahme in V5, das gehe nur serverseitig, stimmt damit nicht mehr.

**Muster für UNIO**

| Muster | Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|
| **Markier-Knöpfe während der Aufnahme.** HUMAN nimmt selbst auf (MediaRecorder). Daniel tippt "Zitat", "Aufgabe" oder "Widerspruch", jeder Tipp setzt eine Zeitmarke. Nach der Transkription wird der Satz an der Marke zugeordnet. Das ist genauer als die heutigen Regex-Muster, die dann nur noch Fallback sind | [Otter Highlights](https://help.otter.ai/hc/en-us/articles/21557292299287-Add-highlights-to-your-conversation), [tl;dv Notes](https://intercom.help/tldv/en/articles/7198123-ai-meeting-notes) | Workshop, Results Upload | klein | ja | P1 |
| **Leitfaden als Notizvorlage (Granola-Prinzip ohne Tokens).** Die Leitfaden-Fragen (Klären, Vertiefen, Bestätigen) liegen während des Workshops offen. Daniel hakt ab, wenn eine Frage beantwortet ist, und setzt damit eine Zeitmarke. Danach steht unter jeder Frage der Transkriptausschnitt von dieser Marke bis zur nächsten. So entsteht "Antwort je Leitfaden-Frage", die direkt in Strategie v1 geht | [Granola Recipes](https://docs.granola.ai/help-center/getting-more-from-your-notes/recipes), [Granola Templates](https://www.granola.ai/blog/meeting-recipes-repeatable-formats) | Workshop, Strategy Generated | mittel | ja | P1 |
| **Modell und Backend je Gerät.** Auswahl "Genau" mit Deutsch-Turbo (ONNX-Konvertierung von primeline, Decoder q4), "Schnell" mit base. Vor dem Lauf eine Probe von 10 Sekunden auf WebGPU und auf WASM, dann das schnellere Backend nehmen. Das Modell im Cache halten, nur am Desktop anbieten, Fortschritt in Minuten statt Prozent. Lange Aufnahmen in 30-Sekunden-Stücken mit Überlappung | [primeline Turbo German](https://huggingface.co/primeline/whisper-large-v3-turbo-german), [onnx-community Turbo](https://huggingface.co/onnx-community/whisper-large-v3-turbo), [Issue 1317](https://github.com/huggingface/transformers.js/issues/1317), [Issue 894](https://github.com/huggingface/transformers.js/issues/894), [web.dev WebGPU](https://web.dev/blog/webgpu-supported-major-browsers) | Results Upload | mittel | teilweise (Download 0,5 bis 1,6 GB) | P2 |
| **Sprecher trennen im Browser.** pyannote-Segmentierung im selben Worker, zwei Sprecher (Daniel, Makler). Zitate nur aus Makler-Passagen ziehen, Aufgaben nach Sprecher dem Team oder dem Makler zuordnen | [Xenova Whisper Diarization](https://huggingface.co/posts/Xenova/284224143230669), [pyannote ONNX](https://huggingface.co/onnx-community/pyannote-segmentation-3.0) | Results Upload | mittel | teilweise | P2 |
| **Zitat mit Beleg.** Jedes Zitat in Brand Story und Präsentation trägt seinen Zeitcode. Ein Klick spielt die Stelle ab. Das schafft Vertrauen in der Präsentation ("Das haben Sie gesagt") und dient später als Rohstoff für Hooks | [Fathom](https://www.fathom.ai/overview) | Strategy Generated, Presentation | klein | ja | P2 |
| **Muster über alle Workshops.** Die häufigsten Themen, Einwände und Werte über alle Maklerinnen hinweg, als Grundlage für Fragebogen und Nachfass-Vorlagen | [tl;dv](https://tldv.io/) | Quer | mittel | ja (Regeln) | P3 |

**Stand in HUMAN.** Die Mitschrift nutzt `onnx-community/whisper-small` oder `-base` mit q8 auf WASM im Worker. Das ist für WASM richtig. Beim Wechsel auf WebGPU darf der Decoder nicht q8 bleiben.

---

## 7. Fragebogen und Strategie

**Was die Besten machen**
- **Typeform** zeigt eine Frage pro Bildschirm, springt per Logik zur nächsten passenden Frage und holt frühere Antworten wieder hervor ("Recall"), etwa den Vornamen. Ein Fortschrittsbalken ist sichtbar. Antworten bleiben 15 Tage im Browser gespeichert, aber nur auf diesem Gerät. Abbrüche werden je Frage gezählt. Die typische Abschlussquote liegt laut Typeform bei 47 %.
- **GV Brand Sprint** (drei Stunden, sechs Übungen): 20-Jahre-Blick, Was, Wie, Warum, Top-3-Werte, Top-3-Zielgruppen, Persönlichkeits-Regler zwischen zwei Polen, Wettbewerbs-Landkarte auf zwei Achsen. Dazu "Note and Vote", also erst allein, dann gemeinsam.
- **Archetypen-Workshops** von Agenturen: Karten nach Ja, Nein und Vielleicht sortieren, dann auf drei festlegen und jede Wahl mit einer echten Geschichte belegen.

**Muster für UNIO**

| Muster | Quelle | HUMAN-Schritt | Aufwand | Browser ohne Tokens | Priorität |
|---|---|---|---|---|---|
| **Frühere Antworten aufgreifen.** "Sie haben Döbling und Währing gewählt. Welche Straße kennen Sie am besten?" oder "Sie sagen, Kamera ist Ihnen unangenehm. Welches Format trauen Sie sich trotzdem zu?" Das macht den Fragebogen zum Gespräch und liefert gleich den Stoff für den Leitfaden | [Typeform Recall](https://www.typeform.com/blog/create-better-online-forms) | Workshop mit Fragebogen | klein | ja | P2 |
| **Logiksprünge.** Kein LinkedIn, also keine LinkedIn-Folgefragen. Nur Vermietung, also keine Verkaufsfragen. Die Angabe "18 Minuten" rechnet mit der tatsächlichen Frageanzahl | [Typeform Logic](https://www.typeform.com/blog/interactive-form-boost-conversions) | Fragebogen | klein | ja | P2 |
| **Fremdbild per Link.** Drei bis fünf Kunden oder Kollegen bekommen einen Link mit fünf Fragen (drei Adjektive, wofür man die Maklerin empfiehlt, was sie nie tun würde). Der Leitfaden hat heute schon den Punkt "Fremdbild fehlt", damit wird er geschlossen | [GV Brand Sprint](https://library.gv.com/the-three-hour-brand-sprint-3ccabf4b768a) | Fragebogen, Leitfaden | mittel | nein (Link braucht Server) | P2 |
| **Wettbewerbs-Landkarte.** Die Maklerin setzt sich und drei lokale Mitbewerber auf zwei Achsen, zum Beispiel "nüchtern bis persönlich" und "Masse bis Nische". Die freie Ecke wird zur Positionierung im Strategie-Generator | [GV Brand Sprint](https://library.gv.com/the-three-hour-brand-sprint-3ccabf4b768a), [Miro Brand Sprint](https://miro.com/templates/brand-sprint/) | Workshop, Strategy Generated | mittel | ja | P2 |
| **Auf drei festlegen, mit Geschichte.** Nach dem Sortieren der Archetyp- oder Werte-Karten muss auf genau drei reduziert werden, jede mit einem Satz "Wann haben Sie das zuletzt gezeigt?". Das passt zur Regel "Verhalten statt Selbstbild" | [Inkspiller Archetypes](https://www.inkspiller.co.uk/post/how-to-run-a-brand-archetypes-workshop-without-inciting-mutiny) | Fragebogen | klein | ja | P2 |
| **Abbruch je Frage messen.** Das Team sieht, an welcher Frage Makler hängen bleiben, und kürzt dort. Im Betrieb geräteübergreifend gespeichert, anders als bei Typeform | [Typeform Save and Return](https://help.typeform.com/hc/en-us/articles/360029581051-Save-and-return-to-your-form-later) | Fragebogen | klein | ja | P3 |

---

## 8. Was HUMAN heute schon besser macht

1. **Ein Faden statt fünf Werkzeuge.** Lead, Termin, Vertrag, Import, Fragebogen, Workshop und Plan greifen auf dieselben Daten zu. Der Termin-Planer kennt die Drehtage und legt den Foto-Termin auf sie. Kein Kalender-Tool verbindet Buchung mit Produktionsplanung.
2. **Potenzial in Makler-Währung.** Der Deep Dive rechnet in Abschlüssen, die das Abo tragen, nicht in einem allgemeinen ROI. Die Lücken im Auftritt werden direkt zum Gesprächsstoff.
3. **Import wie Dromo Private Mode, ohne Lizenz.** Die Datei wird im Browser gelesen, Telefonnummern werden auf +43 gebracht, die österreichischen Systeme (onOffice, Propstack, JUSTIMMO) sind mitgedacht.
4. **Mitschrift ohne Bot und ohne Cloud.** Otter, Fathom und tl;dv schicken einen Bot ins Meeting und das Audio in die Cloud. HUMAN transkribiert lokal, mit Glossar für Immobilienbegriffe und Namensabgleich.
5. **Leitfaden aus Widersprüchen, mit Grund.** Typeform liefert Antworten, Granola liefert Notizen. HUMAN leitet aus den Antworten ab, was im Gespräch geklärt werden muss, und sagt warum.
6. **Fragebogen nach Verhalten, mit Kapitel-Reveal.** Eine Frage pro Bildschirm wie Typeform, dazu Bildpaare, Regler, Sortieren und ein Ergebnis nach jedem Kapitel. Antworten werden sofort gespeichert.
7. **Plan rückwärts aus echten Daten.** Notion-Portale sind statische Checklisten. Der Plan bis live rechnet den Stand aus dem, was wirklich erledigt ist, und markiert Überfälliges.
8. **Deterministisch mit Qualitätswert und Hinweisen.** Jedes Werkzeug erklärt sein Ergebnis. Das ist nachvollziehbarer als die KI-Vorschläge bei folk oder Attio.

---

## 9. Drei Fehler dieser Tools, die UNIO vermeidet

1. **Automatik ohne echten Ausstieg.** HubSpot beendet die Sequenz nur bei einer Antwort per Mail an die hinterlegte Adresse. Wer per WhatsApp oder Telefon zusagt, bekommt weiter Erinnerungen. Pipedrive färbt Deals rot, obwohl ein Termin geplant ist. Bei einem Makler, den man für ein Premium-Abo gewinnen will, ist eine falsche Erinnerung teurer als keine. **Regel für UNIO:** Jede Antwort auf jedem Kanal beendet den Takt. Rot wird nur, wer keinen geplanten nächsten Schritt hat.
2. **Überwachung als Funktion.** PandaDoc misst die Lesezeit je Seite, Mail-Tools setzen Tracking-Pixel, Meeting-Bots zeichnen auf, sobald sie im Kalender stehen. Für eine Vertrauensmarke im Wiener Maklermarkt ist das ein Bruch, zusätzlich eine Frage der DSGVO. **Regel für UNIO:** Nur Status, keine Pixel. Aufnahme nur nach angesagter Einwilligung zu Beginn des Workshops, die mit Zeitstempel im Transkript steht.
3. **Einrichten vor Nutzen.** Cal.com, Close und Attio haben Dutzende Einstellungen, Moxo und Notion verlangen, dass man den Ablauf erst baut. Allgemeine Touren erklären Knöpfe statt Ergebnisse. **Regel für UNIO:** Feste, gute Voreinstellungen wie bei Linear, keine Einstellungsseiten für Makler. Ein Musterprofil zeigt das Ergebnis, und jede Seite hat eine nächste Handlung.

---

## 10. Die zehn wichtigsten Empfehlungen

| Nr. | Empfehlung | Schritt | Aufwand | Priorität |
|---|---|---|---|---|
| 1 | Nachfass-Takt mit Ausstiegszielen (geantwortet, Termin gebucht, kein Interesse) und Quote je Stufe | Follow ups | klein | P1 |
| 2 | Werktage, österreichische Feiertage und Urlaubssperren für Takt und Termin-Planer | Follow ups, Termine | klein | P1 |
| 3 | Zeit in Stufe mit Zielwert je Stufe, rot nur ohne geplanten nächsten Schritt | Research bis Signing | klein | P1 |
| 4 | Termin-Planer: Dauer, Puffer, Tageslimits; ICS mit Zeitzone Wien, stabiler UID und zwei Erinnerungen | Termine | klein | P1 |
| 5 | Vertrag geführt lesen, Beweisprotokoll mit Hash über das PDF; Gründerfall (§ 1 Abs. 3 KSchG, FAGG) und AVV nach Art. 28 DSGVO in denselben Vorgang | Signing, Vertrag | mittel | P1 |
| 6 | Import: Kodierung (Windows-1252), Kopfzeile und Blatt erkennen; Fehler in der Vorschau beheben; Privat-Versprechen sichtbar | Import | mittel | P1 |
| 7 | Mitschrift: Markier-Knöpfe während der Aufnahme und Leitfaden als Notizvorlage, daraus "Antwort je Frage" | Workshop, Results Upload | mittel | P1 |
| 8 | Onboarding: "blockiert Go-live" gegen "kann später" und "Wer ist dran" je Etappe | Platform On-Boarding | klein | P1 |
| 9 | Deutsch-Turbo-Whisper mit Backend-Probe (WebGPU oder WASM) und Sprechertrennung im Browser | Results Upload | mittel | P2 |
| 10 | Youtrust-AES im iframe für den Betrieb; QES nur bei vereinbarter Schriftform über ID Austria | Vertrag | mittel | P2 |

---

## 11. Nebenbefunde aus dem Code (nichts geändert)

- `hmSlots` nutzt den Parameter `dauer` nicht und prüft Belegung nur auf die volle Stunde. Feiertage fehlen.
- `hmIcs` schreibt Zeiten ohne `TZID` und ohne `VALARM`. Die `UID` aus `Date.now()` macht Verschiebungen zu Doppeleinträgen.
- Die Nachfass-Vorlagen sind in Du-Form. Der Du/Sie-Konflikt ist laut Storyline offen und sollte vor dem Betrieb entschieden werden.
- `hmCsv` liest nur UTF-8. `hmTabelleLesen` liest nur das erste Blatt. SheetJS 0.18.5 hat gemeldete Lücken (CVE-2023-30533).
- In `human-flow.jsx` steht über der Fragebogen-Headline die Mono-Zeile "Etappe 01 · Entdecken". Nach den Vault-Regeln (keine Eyebrows, auch keine kleinen Zeilen über Headlines) ist das zu prüfen.
- V5 Stufe 3 nennt Sprechertrennung "nur serverseitig". Mit pyannote-ONNX im Browser ist das überholt.

---

## 12. Quellen

**CRM und Nachfassen**
- Attio Kanban: https://attio.com/help/reference/managing-your-data/views/create-and-manage-kanban-views
- Attio Time in stage: https://attio.com/help/reference/managing-your-data/dashboard-and-reports/set-up-a-time-in-stage-report
- Pipedrive Rotting: https://support.pipedrive.com/en/article/the-rotting-feature
- Pipedrive Pipeline-Ansicht: https://support.pipedrive.com/hc/en-us/articles/115001107229-What-are-the-colored-icons-on-the-deals-in-the-Pipeline-View-
- Close Workflows: https://help.close.com/docs/workflows
- HubSpot Sequences: https://knowledge.hubspot.com/sequences/create-and-edit-sequences
- HubSpot Unenroll: https://knowledge.hubspot.com/sequences/unenroll-from-sequence
- folk Follow-up Assistant: https://help.folk.app/en/articles/10304768-follow-up-assistant

**Signatur und Recht**
- Brandauer Rechtsanwälte, QES und Schriftform (2026): https://brandauer-rechtsanwaelte.at/2026/08/24/qualifizierte-elektronische-signatur-schriftform-oesterreich/
- eIDAS Art. 26: https://legislation.gov.uk/eur/2014/910/article/26/data.html
- Digital Austria, Elektronische Signaturen: https://www.digitalaustria.gv.at/wissenswertes/e-government-a-z/elektronische-signaturen.html
- Stadt Wien, ID Austria Signatur: https://www.wien.gv.at/spezial/foerderhandbuch/e-government/elektronische-eigenhandige-unterschriften-mit-id-austria-elektronischer-identitatsnachweis-e-id-oder-primesign/
- WKO, Anwendungsbereich KSchG: https://www.wko.at/vertragsrecht/anwendungsbereich-konsumentenschutzgesetz-faqs
- verbraucherrecht.at, Gründungsgeschäfte: https://verbraucherrecht.at/ab-wann-gilt-ein-unternehmer-als-unternehmer/2587
- WKO, Rücktrittsrecht Dienstleistungen: https://www.wko.at/internetrecht/ruecktrittsrecht-bei-dienstleistungen-im-internet
- WKO, AVV-Mustervertrag: https://www.wko.at/datenschutz/eu-dsgvo-auftragsverarbeitung-mustervertrag
- Youtrust AES: https://youtrust.com/advanced-electronic-signature
- Youtrust iFrame: https://developers.youtrust.com/docs/using-iframe
- Youtrust Webhooks: https://developers.yousign.com/docs/webhooks
- DocuSign Focused View: https://www.docusign.com/blog/developers/15-minutes-to-better-ux-enhancing-embedded-signing-focused-view
- HoneyBook Smart Files: https://help.honeybook.com/en/articles/5259399-what-are-smart-files
- HoneyBook Signatur: https://help.honeybook.com/en/articles/9509224-elevate-your-clients-e-signature-experience
- Dubsado Proposal mit Vertrag und Rechnung: https://help.dubsado.com/en/articles/14426383-connect-a-contract-and-invoice-to-a-proposal
- PandaDoc Analytics: https://support.pandadoc.com/en/articles/9714822-review-document-analytics
- PandaDoc Smart Content: https://support.pandadoc.com/en/articles/9714634-smart-content-block-conditional-content

**Termine**
- Cal.com Buffers: https://cal.com/help/event-types/event-buffer
- Cal.com v2.1 Limits: https://cal.com/blog/cal-v-2-1
- Cal.com Workflows: https://cal.com/workflows
- Cal.com Seats (Issue): https://github.com/calcom/cal.com/issues/13331
- Calendly Round Robin: https://calendly.com/help/round-robin-distribution-overview
- Calendly Workflows: https://calendly.com/blog/workflows
- Calendly Reminders: https://calendly.com/blog/guide-calendly-reminders
- SavvyCal: https://savvycal.com/meeting-scheduler
- RFC 5545 (iCalendar): https://www.rfc-editor.org/rfc/rfc5545

**Import**
- Flatfile Data Hooks: https://flatfile.com/blog/flatfileioblogdata-hooks-guide/
- OneSchema Importer: https://www.oneschema.co/embeddable-importer
- OneSchema Changelog: https://www.oneschema.co/changelog
- Dromo CSV Guide: https://dromo.io/blog/ultimate-guide-to-csv-imports
- Dromo Mapping: https://dromo.io/blog/data-mapping-best-practices-csv-imports
- Dromo FAQ: https://developer.dromo.io/faqs
- Dromo Datenschutz: https://dromo.io/data-privacy

**Onboarding**
- Moxo Onboarding Flow: https://www.moxo.com/blog/build-customer-onboarding-flow
- Stripe Hosted Onboarding: https://docs.stripe.com/connect/hosted-onboarding
- Candu, Linear Teardown: https://www.candu.ai/blog/linear-onboarding-teardown
- Supademo, Linear Flow: https://supademo.com/user-flow-examples/linear
- Notion Agency Client Portal: https://www.notion.com/templates/agency-client-portal-os

**Workshop und Transkription**
- Granola Recipes: https://docs.granola.ai/help-center/getting-more-from-your-notes/recipes
- Granola Templates: https://www.granola.ai/blog/meeting-recipes-repeatable-formats
- Otter Highlights: https://help.otter.ai/hc/en-us/articles/21557292299287-Add-highlights-to-your-conversation
- tl;dv AI Notes: https://intercom.help/tldv/en/articles/7198123-ai-meeting-notes
- Fathom: https://www.fathom.ai/overview
- primeline Whisper Turbo German: https://huggingface.co/primeline/whisper-large-v3-turbo-german
- primeline Distil-Whisper German: https://huggingface.co/primeline/distil-whisper-large-v3-german
- onnx-community Whisper Turbo: https://huggingface.co/onnx-community/whisper-large-v3-turbo
- transformers.js Issue 1317 (q8 auf WebGPU): https://github.com/huggingface/transformers.js/issues/1317
- transformers.js Issue 894 (WebGPU gegen WASM): https://github.com/huggingface/transformers.js/issues/894
- web.dev, WebGPU in allen großen Browsern: https://web.dev/blog/webgpu-supported-major-browsers
- Xenova Whisper Diarization: https://huggingface.co/posts/Xenova/284224143230669
- pyannote-segmentation-3.0 ONNX: https://huggingface.co/onnx-community/pyannote-segmentation-3.0

**Fragebogen und Strategie**
- Typeform, bessere Formulare: https://www.typeform.com/blog/create-better-online-forms
- Typeform, interaktive Formulare: https://www.typeform.com/blog/interactive-form-boost-conversions
- Typeform Save and Return: https://help.typeform.com/hc/en-us/articles/360029581051-Save-and-return-to-your-form-later
- GV Brand Sprint: https://library.gv.com/the-three-hour-brand-sprint-3ccabf4b768a
- Miro Brand Sprint: https://miro.com/templates/brand-sprint/
- Inkspiller, Archetypen-Workshop: https://www.inkspiller.co.uk/post/how-to-run-a-brand-archetypes-workshop-without-inciting-mutiny
