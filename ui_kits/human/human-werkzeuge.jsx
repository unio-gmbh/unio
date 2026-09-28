/* UNIO HUMAN. Werkzeuge Stufe 2 (Akquise und Onboarding), nach dem Muster des Makler-Zuschnitts:
   im Browser, ohne Tokens, deterministisch, mit Prüfung und Hinweisen. Siehe docs/UNIO_HUMAN_ROADMAP.md. */

const HM_WT = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const hmIsoLokal = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const hmSlotText = (iso) => { const d = new Date(iso); return `${HM_WT[d.getDay()]} ${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}., ${iso.slice(11, 16)}`; };

/* ---------- Termin-Planer ---------- */
/* Freie Slots an Werktagen ab morgen. Drehtage blockieren den ganzen Tag, Meetings ihre Stunde. */
function hmSlots({ dauer = 60, anzahl = 6, zeiten = ["09:00", "11:00", "14:00", "16:00"], vorzug } = {}) {
  const dreh = new Set((hmStore.get("drehtage") || []).map((d) => d.datum));
  const belegt = new Set((hmStore.get("meetings") || []).map((m) => m.datum.slice(0, 13)));
  const out = [];
  const d = new Date(HM_HEUTE + "T12:00");
  for (let i = 0; i < 30 && out.length < anzahl; i++) {
    d.setDate(d.getDate() + 1);
    const tag = hmIsoLokal(d);
    if (window.hmIstWerktag ? !hmIstWerktag(tag) : d.getDay() === 0 || d.getDay() === 6) continue;
    if (dreh.has(tag) && !vorzug) continue;
    let proTag = 0;
    const reihe = i % 2 ? [...zeiten].reverse() : zeiten;
    for (const z of reihe) { const iso = `${tag}T${z}`; if (proTag < 2 && !belegt.has(iso.slice(0, 13)) && out.length < anzahl && (proTag === 0 || Math.abs(+z.slice(0, 2) - +out[out.length - 1].iso.slice(11, 13)) >= 4)) { out.push({ iso, text: hmSlotText(iso), dreh: dreh.has(tag) }); proTag++; } }
  }
  out.sort((a, b) => (vorzug ? b.dreh - a.dreh : 0) || a.iso.localeCompare(b.iso));
  return out;
}
/* Kalenderdatei (ICS), lokale Zeit */
function hmIcs({ titel, iso, dauer = 60, ort = "", text = "" }) {
  const f = (s) => s.replace(/[-:]/g, "").slice(0, 13) + "00";
  const ende = new Date(new Date(iso).getTime() + dauer * 6e4);
  const endIso = `${hmIsoLokal(ende)}T${String(ende.getHours()).padStart(2, "0")}:${String(ende.getMinutes()).padStart(2, "0")}`;
  const esc = (s) => s.replace(/[,;]/g, (c) => "\\" + c).replace(/\n/g, "\\n");
  const tz = ["BEGIN:VTIMEZONE", "TZID:Europe/Vienna", "BEGIN:DAYLIGHT", "TZOFFSETFROM:+0100", "TZOFFSETTO:+0200", "TZNAME:CEST", "DTSTART:19700329T020000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU", "END:DAYLIGHT", "BEGIN:STANDARD", "TZOFFSETFROM:+0200", "TZOFFSETTO:+0100", "TZNAME:CET", "DTSTART:19701025T030000", "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU", "END:STANDARD", "END:VTIMEZONE"];
  const uid = (titel + iso).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60) + "@human.unio.at";
  const alarm = (t) => ["BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${esc(titel)}`, `TRIGGER:${t}`, "END:VALARM"];
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//UNIO//HUMAN//DE", ...tz, "BEGIN:VEVENT", `UID:${uid}`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`, `DTSTART;TZID=Europe/Vienna:${f(iso)}`, `DTEND;TZID=Europe/Vienna:${f(endIso)}`, `SUMMARY:${esc(titel)}`, `LOCATION:${esc(ort)}`, `DESCRIPTION:${esc(text)}`, ...alarm("-P1D"), ...alarm("-PT1H"), "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" })); a.download = titel.toLowerCase().replace(/[^a-zäöüß0-9]+/g, "-") + ".ics"; a.click();
}
function TerminWahl({ wahl, set, dauer, vorzug, hinweis, anzahl = 6 }) {
  const slots = React.useMemo(() => hmSlots({ dauer, vorzug, anzahl }), []);
  return <div className="hm-gruppe">{slots.map((s) => <Zeile key={s.iso} titel={s.text} unter={s.dreh && hinweis ? hinweis : null} aktiv={wahl === s.text} onClick={() => set(s)} rechts={wahl === s.text ? <Ico n="haken" /> : null} />)}</div>;
}

/* ---------- Nachfass-Takt ---------- */
const HM_NACHFASS = [
  { tag: 0, name: "Erste Nachricht", text: (v, o) => `Hallo ${v}, ich bin Nikita von UNIO. Du bist in ${o} aktiv, deshalb melde ich mich. Wir bauen mit Maklern eine eigene Marke auf: Strategie, Website und jeden Monat Inhalte, die wir drehen und schneiden. Hast du 20 Minuten für ein Kennenlernen?` },
  { tag: 2, name: "Erinnerung", text: (v) => `Hallo ${v}, kurz nachgefragt: Passt dir ein Termin diese oder nächste Woche? Ich richte mich nach dir.` },
  { tag: 7, name: "Beispiel schicken", text: (v) => `Hallo ${v}, so sieht eine Makler-Website bei UNIO aus: unio.at/homepages. Sag Bescheid, wenn du darüber reden willst.` },
  { tag: 14, name: "Letzte Nachricht", text: (v) => `Hallo ${v}, ich melde mich ein letztes Mal. Wenn das Thema später passt, bin ich da.` },
];
/* Fällige Nachricht für einen Lead: nur in Recherche und Nachfassen, im Takt Tag 0, 2, 7, 14 */
function hmNachfass(l) {
  if (!["research", "followup"].includes(l.stufe) || l.maklerId) return null;
  const runde = l.runde || 0;
  if (runde >= HM_NACHFASS.length) return null;
  const s = HM_NACHFASS[runde];
  const basis = l.ersterKontakt || HM_HEUTE;
  const faellig = new Date(basis + "T12:00"); faellig.setDate(faellig.getDate() + s.tag);
  let iso = hmIsoLokal(faellig);
  if (window.hmIstWerktag) { while (!hmIstWerktag(iso)) { faellig.setDate(faellig.getDate() + 1); iso = hmIsoLokal(faellig); } }
  return { runde, name: s.name, faellig: iso, ueberfaellig: iso < HM_HEUTE, heute: iso <= HM_HEUTE, text: s.text(l.name.split(" ")[0], l.ort.replace(/^\d{4}\s/, "")) };
}
function hmNachfassGesendet(l) {
  hmStore.patch("leads", (a) => a.map((x) => x.id === l.id ? { ...x, runde: (x.runde || 0) + 1, ersterKontakt: x.ersterKontakt || HM_HEUTE, letzterKontakt: HM_HEUTE, stufe: x.stufe === "research" ? "followup" : x.stufe, naechstes: (HM_NACHFASS[(x.runde || 0) + 1] || { name: "Abwarten" }).name } : x));
  toast("Als gesendet vermerkt");
}
/* Ausstieg aus dem Takt: Antwort, Termin oder kein Interesse beenden die Nachrichten */
function hmNachfassEnde(l, grund) {
  const z = { antwort: { stufe: "kennenlernen", naechstes: "Termin vereinbaren", t: "hat geantwortet" }, termin: { stufe: "kennenlernen", naechstes: "Kennenlernen steht", t: "Termin gebucht" }, nein: { stufe: "archiv", naechstes: "Kein Interesse", t: "kein Interesse" } }[grund];
  hmStore.patch("leads", (a) => a.map((x) => x.id === l.id ? { ...x, stufe: z.stufe, naechstes: z.naechstes, takt: grund, letzterKontakt: HM_HEUTE } : x));
  toast(`${l.name.split(" ")[0]}: ${z.t}`);
}
function NachfassListe({ oeffneLead }) {
  const leads = useHm("leads") || [];
  const f = leads.map((l) => ({ l, n: hmNachfass(l) })).filter((x) => x.n && x.n.heute);
  if (!f.length) return null;
  return <><div className="hm-sek">Nachfassen · {f.length}</div>
    <div className="hm-gruppe">{f.map(({ l, n }) => <div key={l.id} className="hm-reihe"><Avatar name={l.name} /><div className="m"><div className="t">{l.name}</div><div className="u">{n.name}{n.ueberfaellig ? ", seit " + hmFmtDate(n.faellig) : ", heute"} · {l.ort}</div></div><div className="r"><KopierKnopf text={n.text} label="Text kopieren" /><button className="hm-klein-btn hell" onClick={() => hmNachfassEnde(l, "antwort")}>Geantwortet</button><button className="hm-klein-btn" onClick={() => hmNachfassGesendet(l)}>Gesendet</button></div></div>)}</div></>;
}

/* ---------- Potenzial-Rechner (Deep Dive) ---------- */
function Potenzial({ lead, set }) {
  const p = lead.potenzial || {};
  const provision = p.provision ?? 9000, abschluesse = p.abschluesse ?? 8, abo = HM_ABOS[0];
  const kosten = abo.preis * 12;
  const traegt = kosten / Math.max(1, provision);
  const L = [["website", "Eigene Website"], ["instagram", "Instagram, regelmäßig"], ["portrait", "Professionelles Porträt"], ["bewertungen", "Google-Bewertungen"], ["linkedin", "LinkedIn gepflegt"]];
  const hat = p.hat || {};
  const luecken = L.filter(([id]) => !hat[id]);
  const setP = (x) => set({ potenzial: { ...p, ...x } });
  return <div className="hm-stack" style={{ gap: 12 }}>
    <div className="hm-feld2"><label className="hm-feld"><span>Provision je Abschluss, €</span><input inputMode="numeric" value={provision} onChange={(e) => setP({ provision: +e.target.value.replace(/\D/g, "") || 0 })} /></label><label className="hm-feld"><span>Abschlüsse pro Jahr</span><input inputMode="numeric" value={abschluesse} onChange={(e) => setP({ abschluesse: +e.target.value.replace(/\D/g, "") || 0 })} /></label></div>
    <div className="hm-rechnung"><div><b>{traegt.toLocaleString("de-AT", { maximumFractionDigits: 1 })}</b><span>Abschlüsse im Jahr tragen das Abo ({abo.name}, {kosten.toLocaleString("de-AT")} € im Jahr)</span></div><div><b>{abschluesse ? Math.round((traegt / abschluesse) * 100) : 0} %</b><span>mehr Abschlüsse als heute braucht es dafür</span></div></div>
    <div className="hm-abschnitt-t">Was heute schon da ist</div>
    <div className="hm-chips">{L.map(([id, t]) => <button key={id} className={"hm-chip" + (hat[id] ? " on" : "")} onClick={() => setP({ hat: { ...hat, [id]: !hat[id] } })}>{t}</button>)}</div>
    {luecken.length > 0 && <div className="hm-daten">{luecken.length} Lücken: {luecken.map((x) => x[1]).join(", ")}. Das sind die Themen fürs Gespräch.</div>}
  </div>;
}

/* ---------- Vertrag ---------- */
async function hmSha256(text) { const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)); return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join(""); }
function hmVertragText(m, abo) {
  return [
    ["Vertragspartner", `UNIO-VERSE GmbH, Kärntner Straße 12, 1010 Wien, und ${m.name}, ${m.region}.`],
    ["Leistung", `${abo.name}: Strategie-Workshop, Branding, Website, Einrichtung der Konten und jeden Monat ${abo.kontingent.videos} Videos, ${abo.kontingent.fotos} Fotos und ${abo.kontingent.grafiken} Grafiken mit ${abo.drehtage} Drehtag.`],
    ["Preis", `${abo.preis} € pro Monat, netto, ${abo.note}.`],
    ["Freigabe", "Jeder Beitrag geht vor der Veröffentlichung zur Abstimmung. Zwei Änderungswünsche je Beitrag sind inklusive. Ohne Rückmeldung innerhalb von fünf Tagen gilt der Beitrag als freigegeben."],
    ["Rechte", "Alle produzierten Inhalte gehören ab Produktion dem Makler. Die Konten bleiben im Eigentum des Maklers, UNIO erhält nur Zugriff."],
    ["Daten", "Fotos und Daten werden nur für die vereinbarten Leistungen verwendet."],
  ];
}
function hmDrucken(titel, body, css) {
  const w = window.open("", "_blank"); if (!w) { toast("Bitte Pop-ups für diese Seite erlauben"); return; }
  w.document.write(`<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${titel}</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Fraunces:opsz,wght@9..144,300..600&family=Hanken+Grotesk:wght@400;500&family=Manrope:wght@400;500&family=Playfair+Display:wght@400;500&family=Space+Grotesk:wght@400;500&display=swap"><style>${css || ""}</style></head><body>${body}</body></html>`);
  w.document.close();
  w.onload = () => (w.document.fonts ? w.document.fonts.ready : Promise.resolve()).then(() => setTimeout(() => w.print(), 200));
}
function hmVertragPdf(m, abo, sig) {
  const T = hmVertragText(m, abo);
  hmDrucken(`Vertrag ${m.name}`, `<h1>Vertrag ${abo.name}</h1>${T.map(([t, x]) => `<h2>${t}</h2><p>${x}</p>`).join("")}<div class="sig"><div>Digital unterschrieben von <b>${sig.name}</b></div><div>${new Date(sig.zeit).toLocaleString("de-AT")}</div><div class="h">Prüfsumme SHA-256 ${sig.hash}</div></div>`,
    "body{font:14px/1.55 'Hanken Grotesk',system-ui;color:#1B1A16;max-width:640px;margin:48px auto;padding:0 24px}h1{font:400 30px 'Fraunces',serif;margin:0 0 24px}h2{font-size:14px;margin:22px 0 4px}.sig{margin-top:40px;padding-top:16px;border-top:1px solid #ccc}.h{font:11px monospace;color:#666;word-break:break-all;margin-top:8px}");
}

/* ---------- Import-Mapper ---------- */
const HM_IMPORT_FELDER = {
  kontakte: [["vorname", "Vorname", ["vorname", "first name", "firstname"]], ["nachname", "Nachname", ["nachname", "name", "last name", "lastname", "familienname"]], ["mail", "E-Mail", ["e-mail", "email", "mail", "e mail"]], ["tel", "Telefon", ["telefon", "tel", "mobil", "handy", "phone", "telefonnummer"]], ["adresse", "Adresse", ["adresse", "straße", "strasse", "anschrift"]], ["plz", "PLZ", ["plz", "postleitzahl", "zip"]], ["ort", "Ort", ["ort", "stadt", "city"]], ["notiz", "Notiz", ["notiz", "bemerkung", "kommentar", "info"]]],
  objekte: [["titel", "Titel", ["titel", "objekt", "bezeichnung", "objekttitel", "name"]], ["adresse", "Adresse", ["adresse", "straße", "strasse", "lage"]], ["plz", "PLZ", ["plz", "postleitzahl"]], ["ort", "Ort", ["ort", "bezirk", "stadt"]], ["preis", "Preis", ["preis", "kaufpreis", "miete", "price"]], ["flaeche", "Fläche", ["fläche", "flaeche", "wohnfläche", "nutzfläche", "m²", "m2", "qm"]], ["zimmer", "Zimmer", ["zimmer", "räume", "raeume", "rooms"]], ["typ", "Art", ["typ", "objektart", "art", "kategorie"]]],
};
function hmCsv(text) {
  const erste = text.split(/\r?\n/)[0] || "";
  const trenner = [";", ",", "\t"].map((t) => [t, erste.split(t).length]).sort((a, b) => b[1] - a[1])[0][0];
  const zeilen = []; let z = [], f = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { f += '"'; i++; } else if (c === '"') q = false; else f += c; }
    else if (c === '"') q = true; else if (c === trenner) { z.push(f); f = ""; } else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; z.push(f); zeilen.push(z); z = []; f = ""; } else f += c;
  }
  if (f || z.length) { z.push(f); zeilen.push(z); }
  return zeilen.filter((r) => r.some((x) => x.trim()));
}
let hmXlsxP = null;
const hmXlsx = () => hmXlsxP || (hmXlsxP = new Promise((res, rej) => { const s = document.createElement("script"); s.src = "https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"; /* 0.18.5 hat CVE-2023-30533 */ s.onload = () => res(window.XLSX); s.onerror = rej; document.head.appendChild(s); }));
async function hmTabelleLesen(file) {
  if (/\.(xlsx|xls)$/i.test(file.name)) { const X = await hmXlsx(); const wb = X.read(await file.arrayBuffer()); return X.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "", raw: false }).filter((r) => r.some((x) => String(x).trim())); }
  const buf = await file.arrayBuffer();
  let text; try { text = new TextDecoder("utf-8", { fatal: true }).decode(buf); } catch { text = new TextDecoder("windows-1252").decode(buf); }
  return hmCsv(text.replace(/^\uFEFF/, ""));
}
const hmNorm = (s) => String(s || "").toLowerCase().replace(/[^a-zäöüß0-9²]/g, " ").trim();
function hmZuordnen(kopf) {
  const k = kopf.map(hmNorm);
  const treffer = (art) => HM_IMPORT_FELDER[art].reduce((n, [, , syn]) => n + (k.some((h) => syn.includes(h)) ? 1 : 0), 0);
  const art = ["preis", "fläche", "flaeche", "zimmer", "wohnfläche", "kaufpreis", "objektart"].some((x) => k.includes(x)) && treffer("objekte") >= treffer("kontakte") ? "objekte" : "kontakte";
  const map = {};
  HM_IMPORT_FELDER[art].forEach(([id, , syn]) => { const i = k.findIndex((h, j) => syn.includes(h) && !Object.values(map).includes(j)); if (i >= 0) map[id] = i; });
  if (art === "kontakte" && map.nachname != null && map.vorname == null) { /* ein Feld "Name" mit Vor- und Nachname */ }
  return { art, map };
}
function hmTelefon(t) {
  let s = String(t || "").replace(/[^\d+]/g, "");
  if (!s) return "";
  if (s.startsWith("00")) s = "+" + s.slice(2); else if (s.startsWith("0")) s = "+43" + s.slice(1); else if (!s.startsWith("+")) s = "+" + s;
  return s.length >= 10 && s.length <= 16 ? s : null;
}
function hmPruefen(zeilen, art, map) {
  const rows = zeilen.slice(1);
  const wert = (r, id) => (map[id] != null ? String(r[map[id]] || "").trim() : "");
  const gut = [], fehler = [], seen = new Map(); let dubletten = 0;
  rows.forEach((r, i) => {
    if (art === "kontakte") {
      let vor = wert(r, "vorname"), nach = wert(r, "nachname");
      if (!vor && nach.includes(" ")) { const p = nach.split(" "); vor = p.shift(); nach = p.join(" "); }
      const mail = wert(r, "mail").toLowerCase(), telRoh = wert(r, "tel"), tel = hmTelefon(telRoh);
      const probleme = [];
      if (!vor && !nach) probleme.push("Name fehlt");
      if (mail && !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(mail)) probleme.push("E-Mail ungültig");
      if (telRoh && tel === null) probleme.push("Telefon ungültig");
      if (!mail && !telRoh) probleme.push("Weder E-Mail noch Telefon");
      if (probleme.length) { fehler.push({ zeile: i + 2, name: `${vor} ${nach}`.trim() || "ohne Namen", probleme }); return; }
      const key = mail || (vor + nach + tel).toLowerCase();
      if (seen.has(key)) { dubletten++; const alt = seen.get(key); Object.assign(alt, Object.fromEntries(Object.entries({ tel, adresse: wert(r, "adresse"), notiz: wert(r, "notiz") }).filter(([k, v]) => v && !alt[k]))); return; }
      const e = { name: `${vor} ${nach}`.trim(), mail, tel: tel || "", adresse: [wert(r, "adresse"), [wert(r, "plz"), wert(r, "ort")].filter(Boolean).join(" ")].filter(Boolean).join(", "), notiz: wert(r, "notiz") };
      seen.set(key, e); gut.push(e);
    } else {
      const titel = wert(r, "titel") || wert(r, "adresse");
      const preis = +wert(r, "preis").replace(/[^\d,]/g, "").replace(",", ".") || null;
      const flaeche = +wert(r, "flaeche").replace(/[^\d,]/g, "").replace(",", ".") || null;
      const probleme = [];
      if (!titel) probleme.push("Titel oder Adresse fehlt");
      if (!preis) probleme.push("Preis fehlt");
      if (probleme.length) { fehler.push({ zeile: i + 2, name: titel || "ohne Titel", probleme }); return; }
      const key = (titel + wert(r, "plz")).toLowerCase();
      if (seen.has(key)) { dubletten++; return; }
      const e = { titel, ort: [wert(r, "plz"), wert(r, "ort")].filter(Boolean).join(" "), preis, flaeche, zimmer: wert(r, "zimmer"), typ: wert(r, "typ") };
      seen.set(key, e); gut.push(e);
    }
  });
  return { gut, fehler, dubletten, gesamt: rows.length };
}
const HM_IMPORT_BEISPIEL = "Vorname;Nachname;E-Mail;Telefon;Straße;PLZ;Ort;Bemerkung\nAnna;Gruber;anna.gruber@beispiel.at;0664 123 45 67;Sieveringer Straße 12;1190;Wien;Verkauf Wohnung 2027\nThomas;Berger;t.berger@beispiel.at;+43 1 234 56 78;Grinzinger Allee 3;1190;Wien;\nMaria;Huber;maria.huber@beispiel;0676 555 44 33;;1180;Wien;Tippfehler in der Mail\nPeter;Wallner;p.wallner@beispiel.at;;Hohe Warte 8;1190;Wien;Interessent Zinshaus\nAnna;Gruber;ANNA.GRUBER@beispiel.at;;;;;Doppelt\nSabine;Koller;;0699 11 22 33 44;Cottagegasse 20;1180;Wien;\nLukas;Steiner;lukas.steiner@beispiel.at;0660 987 65 43;;1190;Wien;Erbschaft\n;;;;;;;\nJulia;Fuchs;julia.fuchs@beispiel.at;0650 222 33 44;Krottenbachstraße 40;1190;Wien;Suchauftrag Haus";

function ImportMapper({ m, fertig }) {
  const [datei, setDatei] = React.useState(null);
  const [tab, setTab] = React.useState(null);
  const [art, setArt] = React.useState("kontakte");
  const [map, setMap] = React.useState({});
  const [lade, setLade] = React.useState(false);
  const laden = async (f) => { setLade(true); try { const z = await hmTabelleLesen(f); const zu = hmZuordnen(z[0] || []); setTab(z); setArt(zu.art); setMap(zu.map); setDatei(f.name); } catch (e) { toast("Datei nicht lesbar"); } setLade(false); };
  const beispiel = () => laden(new File([HM_IMPORT_BEISPIEL], "kontakte-beispiel.csv", { type: "text/csv" }));
  if (!tab) return <div className="hm-stack">
    <label className="hm-drop" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) laden(f); }}><input type="file" accept=".csv,.xlsx,.xls,.txt" hidden onChange={(e) => { const f = e.target.files[0]; e.target.value = ""; if (f) laden(f); }} /><span className="hm-row" style={{ gap: 10, justifyContent: "center" }}><Ico n="hoch" />{lade ? "Wird gelesen" : "Excel oder CSV hierher ziehen oder wählen"}</span></label>
    <div className="hm-row" style={{ gap: 16 }}><button className="hm-link" onClick={beispiel}>Mit Beispieldatei ausprobieren</button><span className="hm-daten">Spalten werden automatisch erkannt</span></div>
  </div>;
  const kopf = tab[0] || [];
  const erg = hmPruefen(tab, art, map);
  const felder = HM_IMPORT_FELDER[art];
  const uebernehmen = () => {
    hmStore.patch("bestand", (a) => { const alt = (a || {})[m.id] || { kontakte: [], objekte: [] }; return { ...(a || {}), [m.id]: { ...alt, [art]: [...(alt[art] || []), ...erg.gut] } }; });
    fertig({ art, anzahl: erg.gut.length, datei });
  };
  return <div className="hm-stack">
    <div className="hm-row" style={{ justifyContent: "space-between" }}><div><div className="hm-h hm-h3">{datei}</div><div className="hm-daten">{erg.gesamt} Zeilen · als {art === "kontakte" ? "Kontakte" : "Objekte"} erkannt</div></div><div className="hm-seg klein">{[["kontakte", "Kontakte"], ["objekte", "Objekte"]].map(([v, t]) => <button key={v} className={art === v ? "on" : ""} onClick={() => { setArt(v); setMap(hmZuordnen(kopf).art === v ? hmZuordnen(kopf).map : {}); }}>{t}</button>)}</div></div>
    <div className="hm-gruppe">{felder.map(([id, label]) => <div key={id} className="hm-reihe"><div className="m"><div className="t">{label}</div><div className="u">{map[id] != null ? String((tab[1] || [])[map[id]] || "leer in Zeile 2") : "Nicht zugeordnet"}</div></div><div className="r"><select className="hm-sel" value={map[id] ?? ""} onChange={(e) => setMap({ ...map, [id]: e.target.value === "" ? undefined : +e.target.value })}><option value="">Keine Spalte</option>{kopf.map((h, i) => <option key={i} value={i}>{h || `Spalte ${i + 1}`}</option>)}</select></div></div>)}</div>
    <div className="hm-rechnung"><div><b>{erg.gut.length}</b><span>werden übernommen</span></div><div><b>{erg.dubletten}</b><span>{erg.dubletten === 1 ? "Dublette" : "Dubletten"} zusammengeführt</span></div><div><b>{erg.fehler.length}</b><span>unvollständig</span></div></div>
    {erg.fehler.length > 0 && <div className="hm-gruppe">{erg.fehler.slice(0, 4).map((f) => <div key={f.zeile} className="hm-reihe"><div className="m"><div className="t">Zeile {f.zeile}: {f.name}</div><div className="u">{f.probleme.join(", ")}</div></div></div>)}{erg.fehler.length > 4 && <div className="hm-reihe"><div className="m"><div className="u">und {erg.fehler.length - 4} weitere</div></div></div>}</div>}
    <div className="hm-row" style={{ justifyContent: "space-between" }}><button className="hm-link" onClick={() => setTab(null)}>Andere Datei</button><Btn disabled={!erg.gut.length} onClick={uebernehmen}>{erg.gut.length} {art === "kontakte" ? "Kontakte" : "Objekte"} übernehmen</Btn></div>
  </div>;
}

/* ---------- Druckdaten Visitenkarte ---------- */
function hmLum(hex) { const c = hex.replace("#", "").match(/../g).map((x) => { const v = parseInt(x, 16) / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }
function hmKontrast(a, b) { const x = hmLum(a), y = hmLum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
function hmVkPruefung(b, tel, mail) {
  const k = hmKontrast("#F7F5F1", b.akzent);
  return [
    { ok: !!hmTelefon(tel), t: hmTelefon(tel) ? `Telefon ${tel}` : "Telefon fehlt oder ist ungültig" },
    { ok: /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(mail || ""), t: mail ? `E-Mail ${mail}` : "E-Mail fehlt" },
    { ok: k >= 3, t: `Logo auf der Rückseite: Kontrast ${k.toLocaleString("de-AT", { maximumFractionDigits: 1 })} zu 1${k >= 3 ? "" : ", unter 3 zu 1, schlecht lesbar"}` },
    { ok: true, t: "85 × 55 mm, Beschnitt und Marken je Druckerei" },
    { ok: true, t: "Kleinste Schrift 6,5 pt, Sicherheitsabstand 4 mm" },
  ];
}
/* Druckerei-Profile: Beschnitt und Schnittmarken je Anbieter */
const HM_DRUCKPROFILE = { standard: { name: "Standard", beschnitt: 3, marken: true }, flyeralarm: { name: "Flyeralarm", beschnitt: 1, marken: false }, moo: { name: "Moo", beschnitt: 2, marken: false } };
function hmVkDruck(b, profilId) {
  const pr = HM_DRUCKPROFILE[profilId || "standard"];
  const karten = [...document.querySelectorAll(".hm-vk-druck .hm-vk")];
  if (karten.length < 2) return;
  const mm = 96 / 25.4;
  const seiten = karten.map((el) => { const r = el.getBoundingClientRect(); const s = (85 * mm) / r.width; const bg = getComputedStyle(el).backgroundColor; return `<section class="seite"><div class="anschnitt" style="background:${bg}"></div><div class="endformat"><div class="karte" style="width:${r.width}px;height:${r.height}px;transform:scale(${s})">${el.outerHTML}</div></div><i class="m h o l"></i><i class="m h o r"></i><i class="m h u l"></i><i class="m h u r"></i><i class="m v o l"></i><i class="m v o r"></i><i class="m v u l"></i><i class="m v u r"></i></section>`; });
  const css = [...document.styleSheets].flatMap((s) => { try { return [...s.cssRules].map((r) => r.cssText).filter((t) => t.includes("hm-vk")); } catch { return []; } }).join("\n");
  const rand = pr.marken ? 10 : pr.beschnitt; const bw = 85 + 2 * pr.beschnitt, bh = 55 + 2 * pr.beschnitt; const pw = 85 + 2 * rand, ph = 55 + 2 * rand;
  hmDrucken(`Visitenkarte ${b.makler.name}`, seiten.join(""), `@page{size:${pw}mm ${ph}mm;margin:0}*{box-sizing:border-box}body{margin:0;font-family:'Hanken Grotesk',system-ui}${css}
.seite{position:relative;width:${pw}mm;height:${ph}mm;page-break-after:always;overflow:hidden}
.anschnitt{position:absolute;left:${rand - pr.beschnitt}mm;top:${rand - pr.beschnitt}mm;width:${bw}mm;height:${bh}mm}
.endformat{position:absolute;left:${rand}mm;top:${rand}mm;width:85mm;height:55mm;overflow:hidden}
.karte{transform-origin:0 0}.karte .hm-vk{width:100%;height:100%;border-radius:0;box-shadow:none;aspect-ratio:auto}
.m{position:absolute;background:#000;${pr.marken ? "" : "display:none;"}}.m.h{height:.2mm;width:4mm}.m.v{width:.2mm;height:4mm}
.m.h.l{left:2mm}.m.h.r{right:2mm}.m.h.o{top:10mm}.m.h.u{top:65mm}
.m.v.o{top:2mm}.m.v.u{bottom:2mm}.m.v.l{left:10mm}.m.v.r{left:95mm}`);
}

Object.assign(window, { hmNachfassEnde, hmSlots, hmIcs, TerminWahl, hmSlotText, HM_NACHFASS, hmNachfass, hmNachfassGesendet, NachfassListe, Potenzial, hmSha256, hmVertragText, hmDrucken, hmVertragPdf, ImportMapper, hmCsv, hmTabelleLesen, hmZuordnen, hmPruefen, hmTelefon, hmKontrast, hmVkPruefung, hmVkDruck, HM_DRUCKPROFILE, hmIsoLokal });
