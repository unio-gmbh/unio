/* Werkbank. Bildwelt-Brücke zu Higgsfield.
   Higgsfield läuft über den MCP-Connector in einer Claude-Sitzung, mit dem normalen Abo und den Credits dieses Kontos.
   Die Werkbank selbst kann den Connector nicht aufrufen. Deshalb drei Schritte:
   1. Hier entsteht ein Auftrag (Schema wb-bildwelt/1) aus Markenwelt, Bildsprache und Branding.
   2. Claude führt ihn mit dem Skill /bildwelt aus: Kosten prüfen, Freigabe holen, erzeugen.
   3. Claude antwortet mit einem Rücklink (#bildwelt=...), der die Bilder hier ablegt (wb-bildwelt-ergebnis/1).
   Protokoll: docs/werkbank/BILDWELT_BRUECKE.md */

const HM_BW_MODELLE = [
  { id: "gpt_image_2_5", name: "Schnell", satz: "Sauber und günstig", credits: 0.25 },
  { id: "soul_2", name: "Editorial", satz: "Fotografischer Look", credits: 1 },
];
const HM_BW_FORMATE = [["4:5", "Post"], ["9:16", "Story"], ["1:1", "Quadrat"]];
/* Motive mit Menschen gehören ins echte Shooting, Motive mit Schrift oder Zahlen (Grundriss, Auszug) in die Vorlagen, beides nicht in die KI */
const HM_BW_OHNE = /porträt|portrait|makler|gesicht|talking|kunde|familie|paar\b|menschen|gespräch|hände|person|schlüsselübergabe|grundriss|auszug|bildschirm|zahl|dokument|schrift|plan\b/i;

function hmBwZahl(x) { return String(Math.round(x * 100) / 100).replace(".", ","); }
function hmBwId() { return "bw-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }

/* Kontext eines Maklers: Welt, Bildsprache, Akzent, Orte */
function hmBwKontext(mid) {
  const b = hmBrand(mid);
  const p = window.hmMbPlattform ? hmMbPlattform(mid) : null;
  const welt = window.hmMbWelt ? hmMbWelt(mid, p) : null;
  const bs = (p && p.visuell && p.visuell.bildsprache) || (welt && welt.bildsprache) || { regeln: [], motive: [], vermeiden: [] };
  const st = (hmStore.get("strategien") || {})[mid];
  const w = st && st.gewaehlt ? st.wege[st.gewaehlt] : null;
  const orte = w && w.bezirke && w.bezirke.length ? w.bezirke.join(", ").replace(/\d{4}\s/g, "") : "Wien";
  return { b, p, welt, bs, w, orte };
}

/* Vorgeschlagene Motive: aus der Bildsprache, ohne Menschen, ergänzt um Grätzl und Material */
function hmBwMotive(k) {
  const aus = (k.bs.motive || []).filter((x) => x && !HM_BW_OHNE.test(x));
  const dazu = [`${k.orte.split(",")[0]}, Straßenzug im Tageslicht`, "Materialdetail: Parkett, Stein oder Kastenfenster", "Blick aus dem Fenster in den Hof", "Stiegenhaus im Streiflicht"];
  const alle = [...new Set([...aus, ...dazu])].slice(0, 6);
  return alle.map((titel, i) => ({ id: "m" + (i + 1), titel, format: i === 3 ? "9:16" : "4:5", an: i < 4 }));
}

function hmBwPrompt(titel, k) {
  const akz = k.b.akzent || "#0B0A09";
  const farben = k.welt && k.welt.farben ? `background tones ${k.welt.farben.grund} and ${k.welt.farben.flaeche}, text-dark ${k.welt.farben.text}` : "";
  const regeln = (k.bs.regeln || []).filter((r) => !/gesicht|talking|kamera in kopfhöhe.*porträt/i.test(r)).slice(0, 4);
  const meiden = (k.bs.vermeiden || []).filter((r) => !/ki-generiert/i.test(r)).slice(0, 4);
  return [
    `Editorial photograph for a Vienna real estate personal brand. Subject: "${titel}". Location: ${k.orte}, Vienna, Austria.`,
    k.welt ? `Brand world "${k.welt.name}": ${k.welt.idee}` : "",
    regeln.length ? `Image rules: ${regeln.join(" ")}` : "",
    `Colour world anchored on accent ${akz}${farben ? ", " + farben : ""}, the accent appears at most once and small.`,
    "Natural light, real materials, true verticals, calm composition, photographic, not illustrated.",
    `Avoid: ${[...meiden, "identifiable people or faces", "text, lettering, logos, watermarks", "fake luxury props"].join("; ")}.`,
  ].filter(Boolean).join(" ");
}

function hmBwAuftrag(mid, motive, modellId, varianten) {
  const k = hmBwKontext(mid);
  const mod = HM_BW_MODELLE.find((x) => x.id === modellId) || HM_BW_MODELLE[0];
  const gew = motive.filter((x) => x.an);
  const n = gew.length * varianten;
  return {
    schema: "wb-bildwelt/1",
    id: hmBwId(),
    erstellt: new Date().toISOString(),
    makler: { id: mid, name: k.b.makler.name },
    welt: k.welt ? { id: k.welt.id, name: k.welt.name } : null,
    modell: mod.id,
    varianten,
    bilder: n,
    credits_schaetzung: Math.round(n * mod.credits * 100) / 100,
    budget_credits: Math.ceil(n * mod.credits * 1.5 + 1),
    regeln: ["Keine erkennbaren Personen, keine Gesichter.", "Kein Text, keine Logos, keine Wasserzeichen im Bild.", "Jedes Bild wird in der Werkbank als KI-generiert gekennzeichnet."],
    motive: gew.map((x) => ({ id: x.id, titel: x.titel, format: x.format, prompt: hmBwPrompt(x.titel, k) })),
    ruecksprung: location.href.split("#")[0],
  };
}

/* Übergabetext für Claude: Befehl plus Auftrag */
function hmBwUebergabe(a) {
  return `/bildwelt\n\n\`\`\`json\n${JSON.stringify(a, null, 2)}\n\`\`\``;
}

/* Ergebnis einlesen: aus dem Rücklink, einer ergebnis.json oder direkt als Objekt.
   Bilder werden in IndexedDB gesichert (bw:<id>), wenn der Bildserver das erlaubt; sonst bleibt die URL. */
async function hmBwEinlesen(erg, dateien) {
  if (!erg || erg.schema !== "wb-bildwelt-ergebnis/1" || !Array.isArray(erg.bilder)) throw new Error("Unbekanntes Format. Erwartet schema wb-bildwelt-ergebnis/1.");
  const mid = erg.makler && (erg.makler.id || erg.makler);
  if (!mid) throw new Error("Makler fehlt im Ergebnis");
  const auftraege = (hmStore.get("bildwelt") || {})[mid] || [];
  const auftrag = auftraege.find((x) => x.id === erg.auftrag);
  const titel = (mo) => ((auftrag && auftrag.motive.find((x) => x.id === mo)) || {}).titel || mo || "Motiv";
  const vorhanden = new Set((((hmStore.get("bildwelt_bilder") || {})[mid]) || []).map((x) => x.quelle));
  const neu = [];
  for (const [i, x] of erg.bilder.entries()) {
    const quelle = x.url || x.datei || `${erg.auftrag}-${i}`;
    if (vorhanden.has(quelle)) continue;
    const id = hmBwId();
    let lokal = false;
    const datei = dateien && x.datei && dateien.find((f) => f.name === x.datei);
    try {
      const blob = datei || (x.url ? await (await fetch(x.url, { mode: "cors" })).blob() : null);
      if (blob && blob.size) { await hmBlobs.put("bw:" + id, blob); HM_BLOB_URL["bw:" + id] = URL.createObjectURL(blob); lokal = true; }
    } catch (e) { /* Bildserver ohne CORS: die URL bleibt, Anzeige per img funktioniert trotzdem */ }
    neu.push({ id, auftrag: erg.auftrag, motiv: x.motiv, titel: titel(x.motiv), format: x.format || "4:5", modell: x.modell || (auftrag && auftrag.modell) || "", url: x.url || null, quelle, lokal, datum: new Date().toISOString(), ki: true });
  }
  hmStore.patch("bildwelt_bilder", (a) => ({ ...(a || {}), [mid]: [...neu, ...(((a || {})[mid]) || [])] }));
  hmStore.patch("bildwelt", (a) => ({ ...(a || {}), [mid]: (((a || {})[mid]) || []).map((x) => x.id === erg.auftrag ? { ...x, status: "fertig", fertig: new Date().toISOString(), credits: erg.credits != null ? erg.credits : x.credits_schaetzung } : x) }));
  if (neu.length) hmEvent(mid, "branding", `${neu.length} Bildwelt-Bilder aus Higgsfield übernommen`, "Claude");
  return { mid, n: neu.length, lokal: neu.filter((x) => x.lokal).length };
}

/* Eigene Bilddateien ohne ergebnis.json: Name <auftrag>-<motiv>-<n>.<ext> ordnet zu */
async function hmBwDateien(mid, files) {
  const liste = [...files];
  const json = liste.find((f) => /\.json$/i.test(f.name));
  if (json) { const erg = JSON.parse(await json.text()); return hmBwEinlesen(erg, liste); }
  const bilder = liste.filter((f) => /^image\//.test(f.type));
  const erg = { schema: "wb-bildwelt-ergebnis/1", makler: { id: mid }, auftrag: null, bilder: bilder.map((f) => { const m = f.name.match(/^(bw-[a-z0-9]+)-(m\d+)/); return { datei: f.name, motiv: m ? m[2] : null, auftragAusName: m ? m[1] : null }; }) };
  const auftragsId = (erg.bilder.find((x) => x.auftragAusName) || {}).auftragAusName;
  if (auftragsId) erg.auftrag = auftragsId;
  return hmBwEinlesen(erg, liste);
}

/* Automatik: Warteschlange auf dem Server (api/wb-bildwelt.js), eine geplante Claude-Routine arbeitet sie ab.
   Nur unter /ux erreichbar, der Browser schickt dort das UX-Passwort selbst mit. Lokal und ohne Speicher: Übergabe per Zwischenablage. */
const HM_BW_API = typeof location !== "undefined" && location.pathname.startsWith("/ux/") ? "/ux/api/bildwelt" : null;
let hmBwStatusP = null;
function hmBwStatus(neu) {
  if (!HM_BW_API) return Promise.resolve({ bereit: false, grund: "lokal" });
  if (!hmBwStatusP || neu) hmBwStatusP = fetch(HM_BW_API + "?aktion=status", { credentials: "same-origin" }).then(async (r) => { const j = await r.json().catch(() => ({})); return r.ok ? { ...j, bereit: !!j.bereit } : { bereit: false, grund: j.fehler || "Status " + r.status }; }).catch(() => ({ bereit: false, grund: "nicht erreichbar" }));
  return hmBwStatusP;
}
async function hmBwEinreihen(a) {
  const r = await fetch(HM_BW_API, { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ aktion: "auftrag", auftrag: a }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(j.fehler || "Warteschlange nicht erreichbar");
  return j;
}
function hmBwSetze(mid, id, patch) { hmStore.patch("bildwelt", (x) => ({ ...(x || {}), [mid]: (((x || {})[mid]) || []).map((a) => a.id === id ? { ...a, ...patch } : a) })); }
/* Alle 30 Sekunden: automatische Aufträge nachfragen, fertige Ergebnisse direkt einlesen */
async function hmBwAbfragen() {
  if (!HM_BW_API) return;
  const alle = hmStore.get("bildwelt") || {};
  for (const [mid, liste] of Object.entries(alle)) for (const a of liste || []) {
    if (!a.auto || !["warteschlange", "in_arbeit"].includes(a.status)) continue;
    try {
      const r = await fetch(`${HM_BW_API}?aktion=auftrag&id=${encodeURIComponent(a.id)}`, { credentials: "same-origin" }); const j = await r.json();
      if (!j.ok) continue;
      if (j.status === "in_arbeit" && a.status !== "in_arbeit") hmBwSetze(mid, a.id, { status: "in_arbeit" });
      if (j.status === "fehler") { hmBwSetze(mid, a.id, { status: "fehler", grund: j.grund }); toast("Bildwelt-Auftrag fehlgeschlagen: " + (j.grund || "ohne Grund")); }
      if (j.status === "fertig" && j.ergebnis) { const e = await hmBwEinlesen(j.ergebnis); toast(`${e.n} Bildwelt-Bilder sind da`); }
    } catch (e) { /* nächster Versuch in 30 Sekunden */ }
  }
}
if (typeof window !== "undefined" && HM_BW_API && !window.__hmBwAbfrage) { window.__hmBwAbfrage = setInterval(hmBwAbfragen, 30000); setTimeout(hmBwAbfragen, 4000); }

/* Rücklink aus Claude: #bildwelt=<encodeURIComponent(JSON)> */
function hmBwAusHash(hash) {
  const h = hash != null ? hash : location.hash;
  if (!h || !h.startsWith("#bildwelt=")) return null;
  return JSON.parse(decodeURIComponent(h.slice("#bildwelt=".length)));
}
async function hmBwHashPruefen() {
  let erg = null;
  try { erg = hmBwAusHash(); } catch (e) { setTimeout(() => toast("Rücklink konnte nicht gelesen werden"), 900); return; }
  if (!erg) return;
  history.replaceState(null, "", location.href.split("#")[0]);
  try {
    const r = await hmBwEinlesen(erg);
    setTimeout(() => toast(r.n ? `${r.n} Bilder übernommen${r.lokal < r.n ? ", " + (r.n - r.lokal) + " als Verweis" : ""}. Zu finden unter Marke, Design, Bildwelt.` : "Diese Bilder sind schon da."), 900);
  } catch (e) { setTimeout(() => toast(e.message), 900); }
}
if (typeof window !== "undefined" && !window.__hmBwStart) { window.__hmBwStart = true; hmBwHashPruefen(); window.addEventListener("hashchange", hmBwHashPruefen); }

/* Bild-URL eines Bildwelt-Bildes: zuerst lokale Kopie, sonst die Higgsfield-URL */
function useBwUrl(x) {
  const [u, setU] = React.useState(HM_BLOB_URL["bw:" + x.id] || (x.lokal ? null : x.url));
  React.useEffect(() => {
    let weg = false;
    if (x.lokal && !HM_BLOB_URL["bw:" + x.id]) hmBlobs.get("bw:" + x.id).then((bl) => { if (bl && !weg) { HM_BLOB_URL["bw:" + x.id] = URL.createObjectURL(bl); setU(HM_BLOB_URL["bw:" + x.id]); } else if (!weg) setU(x.url); }).catch(() => !weg && setU(x.url));
    return () => { weg = true; };
  }, [x.id]);
  return u;
}
function BwBild({ x, onWeg }) {
  const u = useBwUrl(x);
  const laden = async () => { try { const bl = x.lokal ? await hmBlobs.get("bw:" + x.id) : await (await fetch(x.url)).blob(); hmLaden(bl, `bildwelt-${hmDateiname(x.titel)}-${x.id.slice(-4)}.${(bl.type.split("/")[1] || "png").replace("jpeg", "jpg")}`); } catch (e) { window.open(x.url, "_blank", "noopener"); } };
  const [bw, bh] = x.format.split(":").map(Number);
  return <figure className="hm-bw-bild">
    <div className="rahmen" style={{ aspectRatio: `${bw} / ${bh}` }}>{u ? <img src={u} alt={x.titel} loading="lazy" /> : null}<span className="ki">KI-generiert</span></div>
    <figcaption><span>{x.titel}</span><span className="aktionen"><button className="hm-link" onClick={laden}>Laden</button>{onWeg && <button className="hm-link" onClick={onWeg}>Entfernen</button>}</span></figcaption>
    {!x.lokal && <div className="hm-daten">Nur als Verweis, bitte laden und sichern</div>}
  </figure>;
}

function BildweltBruecke({ m, teamSicht }) {
  const auftraege = (useHm("bildwelt") || {})[m.id] || [];
  const bilder = (useHm("bildwelt_bilder") || {})[m.id] || [];
  useHm("markenbuch"); useHm("branding"); useHm("plattformen");
  const k = hmBwKontext(m.id);
  const [motive, setMotive] = React.useState(() => hmBwMotive(k));
  const [modell, setModell] = React.useState(HM_BW_MODELLE[0].id);
  const [varianten, setVarianten] = React.useState(2);
  const [prompt, setPrompt] = React.useState(false);
  const [offen, setOffen] = React.useState(null);
  const mod = HM_BW_MODELLE.find((x) => x.id === modell);
  const n = motive.filter((x) => x.an).length * varianten;
  const setM = (id, patch) => setMotive((l) => l.map((x) => x.id === id ? { ...x, ...patch } : x));
  const [auto, setAuto] = React.useState(null);
  React.useEffect(() => { let weg = false; hmBwStatus().then((s) => !weg && setAuto(s)); return () => { weg = true; }; }, []);
  const uebergeben = async () => {
    if (!n) { toast("Mindestens ein Motiv wählen"); return; }
    const a = { ...hmBwAuftrag(m.id, motive, modell, varianten), status: "offen" };
    if (auto && auto.bereit) {
      try {
        await hmBwEinreihen(a);
        hmStore.patch("bildwelt", (x) => ({ ...(x || {}), [m.id]: [{ ...a, status: "warteschlange", auto: true }, ...(((x || {})[m.id]) || [])].slice(0, 30) }));
        hmEvent(m.id, "branding", `Bildwelt-Auftrag in die Warteschlange, ${a.bilder} Bilder`, teamSicht ? "Team" : m.name);
        toast("In der Warteschlange. Die Bilder erscheinen hier von selbst.");
        return;
      } catch (e) { toast(e.message + ". Übergabe per Zwischenablage."); }
    }
    hmStore.patch("bildwelt", (x) => ({ ...(x || {}), [m.id]: [a, ...(((x || {})[m.id]) || [])].slice(0, 30) }));
    hmEvent(m.id, "branding", `Bildwelt-Auftrag an Higgsfield übergeben, ${a.bilder} Bilder`, teamSicht ? "Team" : m.name);
    try { await navigator.clipboard.writeText(hmBwUebergabe(a)); toast("Auftrag kopiert. In Claude einfügen und abschicken."); } catch (e) { toast("Auftrag erstellt. Bitte unten kopieren."); }
    setOffen(a.id);
  };
  const weg = (x) => { hmBlobs.del("bw:" + x.id).catch(() => {}); hmStore.patch("bildwelt_bilder", (a) => ({ ...(a || {}), [m.id]: (((a || {})[m.id]) || []).filter((y) => y.id !== x.id) })); };
  const dateien = async (files) => { try { const r = await hmBwDateien(m.id, files); toast(`${r.n} Bilder übernommen`); } catch (e) { toast(e.message); } };
  const erster = motive.find((x) => x.an) || motive[0];
  return <section className="hm-bw">
    <div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-mono">Bildwelt · Higgsfield · nur Team</div><span className="hm-ez">{k.welt ? k.welt.name : "Ohne Welt"}</span></div>
    <div className="hm-bw-auto">{auto == null ? "Automatik wird geprüft" : auto.bereit ? <>Automatik an{auto.worker && auto.worker.zuletzt ? `, Routine zuletzt vor ${Math.max(1, Math.round((Date.now() - auto.worker.zuletzt) / 60000))} Min` : ", Routine hat sich noch nicht gemeldet"}{auto.monat ? ` · ${hmBwZahl(auto.monat.credits)} von ${auto.monat.budget} Credits im Monat` : ""}</> : <>Automatik aus ({auto.grund === "lokal" ? "lokale Vorschau" : auto.grund}). Übergabe per Zwischenablage an Claude.</>}</div>
    <p className="hm-bw-satz">Stimmungsbilder für Posts und Stories aus deiner Bildsprache. Ohne erkennbare Menschen, jedes Bild als KI-generiert gekennzeichnet. Dein Gesicht kommt aus dem echten Shooting.</p>
    <div className="hm-gruppe">{motive.map((x) => <div key={x.id} className={"hm-reihe" + (x.an ? "" : " aus")}>
      <button className={"hm-bw-haken" + (x.an ? " an" : "")} onClick={() => setM(x.id, { an: !x.an })} aria-pressed={x.an} aria-label={x.titel}>{x.an && <Ico n="haken" g={12} />}</button>
      <div className="m"><input className="hm-bw-titel" value={x.titel} onChange={(e) => setM(x.id, { titel: e.target.value })} /></div>
      <div className="hm-seg klein">{HM_BW_FORMATE.map(([f, t]) => <button key={f} className={x.format === f ? "on" : ""} onClick={() => setM(x.id, { format: f })}>{t}</button>)}</div>
    </div>)}</div>
    <div className="hm-row" style={{ marginTop: 12, gap: 12, flexWrap: "wrap" }}>
      <div className="hm-seg">{HM_BW_MODELLE.map((x) => <button key={x.id} className={modell === x.id ? "on" : ""} onClick={() => setModell(x.id)} title={x.satz}>{x.name}</button>)}</div>
      <div className="hm-seg">{[1, 2, 3].map((v) => <button key={v} className={varianten === v ? "on" : ""} onClick={() => setVarianten(v)}>{v} je Motiv</button>)}</div>
    </div>
    <div className="hm-row" style={{ marginTop: 14, justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
      <div className="hm-daten">{n} Bilder · rund {hmBwZahl(n * mod.credits)} Credits · {mod.satz}</div>
      <div className="hm-row" style={{ gap: 12 }}><button className="hm-link" onClick={() => setPrompt(!prompt)}>{prompt ? "Prompt ausblenden" : "Prompt ansehen"}</button><Btn onClick={uebergeben}>An Higgsfield übergeben</Btn></div>
    </div>
    {prompt && erster && <div className="hm-prompt" style={{ marginTop: 10 }}>{hmBwPrompt(erster.titel, k)}</div>}
    {auftraege.length > 0 && <div style={{ marginTop: 18 }}>
      <div className="hm-mono" style={{ marginBottom: 8 }}>Aufträge</div>
      <div className="hm-gruppe">{auftraege.slice(0, 5).map((a) => <div key={a.id} className="hm-bw-auftrag">
        <div className="hm-reihe klick" onClick={() => setOffen(offen === a.id ? null : a.id)}>
          <div className="m"><div className="t">{a.bilder} Bilder · {(HM_BW_MODELLE.find((x) => x.id === a.modell) || {}).name}</div><div className="u">{hmDatum(a.erstellt)} · {a.status === "fertig" ? `fertig, ${hmBwZahl(a.credits || 0)} Credits` : `rund ${hmBwZahl(a.credits_schaetzung)} Credits`}</div></div>
          <span className={"hm-ez" + (a.status === "fertig" ? " z-fertig" : a.status === "fehler" ? " z-wartet_team" : " z-in_arbeit")}>{{ fertig: "Fertig", fehler: "Fehler", warteschlange: "Warteschlange", in_arbeit: "Wird erzeugt" }[a.status] || "Bei Claude"}</span>
        </div>
        {offen === a.id && a.status === "fehler" && <div className="hm-bw-schritte">{a.grund || "Ohne Grund."}</div>}
        {offen === a.id && a.status === "offen" && <div className="hm-bw-schritte">
          <ol>
            <li>Claude öffnen, in dem der Higgsfield-Connector aktiv ist, und den Auftrag einfügen. Er liegt in der Zwischenablage.</li>
            <li>Claude nennt die Credits und das Guthaben und erzeugt erst nach deinem Ja.</li>
            <li>Der Rücklink in Claudes Antwort öffnet diese Seite und legt die Bilder hier ab. Oder die Dateien unten hineinziehen.</li>
          </ol>
          <div className="hm-row" style={{ gap: 12 }}><KopierKnopf text={hmBwUebergabe(a)} label="Auftrag kopieren" /><button className="hm-link" onClick={() => hmLaden(new Blob([JSON.stringify(a, null, 2)], { type: "application/json" }), `bildwelt-auftrag-${a.id}.json`)}>Als Datei laden</button></div>
        </div>}
      </div>)}</div>
    </div>}
    <label className="hm-drop klein" style={{ marginTop: 14 }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); dateien(e.dataTransfer.files); }}><input type="file" multiple hidden accept="image/*,.json" onChange={(e) => dateien(e.target.files)} /><span>Ergebnis von Claude hierher ziehen: ergebnis.json oder die Bilddateien</span></label>
    {bilder.length > 0 && <div style={{ marginTop: 18 }}>
      <div className="hm-mono" style={{ marginBottom: 10 }}>Bildwelt · {bilder.length}</div>
      <div className="hm-bw-raster">{bilder.map((x) => <BwBild key={x.id} x={x} onWeg={() => weg(x)} />)}</div>
    </div>}
  </section>;
}

/* Makler sehen nur die fertigen Bilder, keine Credits und keine Aufträge */
function BildweltGalerie({ m }) {
  const bilder = (useHm("bildwelt_bilder") || {})[m.id] || [];
  if (!bilder.length) return null;
  return <section className="hm-bw">
    <div className="hm-mono">Bildwelt · vom UNIO-Team</div>
    <p className="hm-bw-satz">Stimmungsbilder aus deiner Bildsprache, KI-generiert und gekennzeichnet. Du findest sie auch bei der Website unter Bilder.</p>
    <div className="hm-bw-raster">{bilder.map((x) => <BwBild key={x.id} x={x} />)}</div>
  </section>;
}

function hmSelbsttestBildwelt() {
  const out = []; const t = (name, fn) => { try { const r = fn(); out.push({ name, ok: !!r.ok, detail: r.detail || "" }); } catch (e) { out.push({ name, ok: false, detail: e.message }); } };
  const mid = (hmStore.get("makler") || [])[0] ? hmStore.get("makler")[0].id : "markus";
  const k = hmBwKontext(mid);
  const mo = hmBwMotive(k);
  t("Motive ohne Menschen", () => ({ ok: mo.length >= 4 && mo.every((x) => !HM_BW_OHNE.test(x.titel)), detail: mo.map((x) => x.titel).join(" · ") }));
  const a = hmBwAuftrag(mid, mo, "gpt_image_2_5", 2);
  t("Auftrag wb-bildwelt/1", () => ({ ok: a.schema === "wb-bildwelt/1" && a.motive.length === mo.filter((x) => x.an).length && a.bilder === a.motive.length * 2 && a.credits_schaetzung === a.bilder * 0.25, detail: `${a.bilder} Bilder, ${a.credits_schaetzung} Credits` }));
  t("Prompt mit Regeln", () => { const p = a.motive[0].prompt; return { ok: /identifiable people/.test(p) && /no text|lettering/i.test(p) && p.includes("Vienna"), detail: p.slice(0, 90) }; });
  t("Rücklink lesbar", () => { const e = { schema: "wb-bildwelt-ergebnis/1", auftrag: a.id, makler: { id: mid }, bilder: [{ motiv: "m1", url: "https://example.com/a.png", format: "4:5" }] }; const r = hmBwAusHash("#bildwelt=" + encodeURIComponent(JSON.stringify(e))); return { ok: r && r.auftrag === a.id && r.bilder[0].motiv === "m1" }; });
  t("Übergabetext", () => { const u = hmBwUebergabe(a); return { ok: u.startsWith("/bildwelt") && u.includes('"wb-bildwelt/1"') }; });
  return out;
}

Object.assign(window, { BildweltGalerie, hmBwStatus, hmBwAbfragen, HM_BW_MODELLE, hmBwKontext, hmBwMotive, hmBwPrompt, hmBwAuftrag, hmBwUebergabe, hmBwEinlesen, hmBwDateien, hmBwAusHash, BildweltBruecke, hmSelbsttestBildwelt });
