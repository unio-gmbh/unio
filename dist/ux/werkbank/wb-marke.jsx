/* Werkbank. Marke: Fragebogen, Material, Konzept (zwei Wege), Branding-Studio, Website, Brand-Kit.
   Daten fließen nach unten: Fragebogen und Material ergeben das Konzept, das Konzept das Branding,
   das Branding Website, Visitenkarten, Shop, Vorlagen und Captions. */

function Marke({ m, sub, setSub, go, teamSicht }) {
  const [alterBogen, setAlterBogen] = React.useState(false);
  const fb = (useHm("fragebogen") || {})[m.id];
  const st = (useHm("strategien") || {})[m.id];
  useHm("branding"); useHm("website"); const mb = (useHm("markenbuch") || {})[m.id] || {};
  const b = hmBrand(m.id);
  const web = (hmStore.get("website") || {})[m.id] || {};
  const schritte = [["fragebogen", "Fragebogen", fb && fb.fertig], ["konzept", "Konzept", st && st.gewaehlt], ["design", "Design", b.fertig], ["markenbuch", "Markenbuch", mb.status === "freigegeben"], ["website", "Website", web.status === "live"]];
  const roh = sub === "material" || sub === "kit" ? "design" : sub;
  const s = roh || (fb && fb.fertig ? (b.fertig ? (mb.status === "freigegeben" ? "website" : "markenbuch") : st && st.gewaehlt ? "design" : "konzept") : "fragebogen");
  const legacyGo = (x) => { if (x === "strategie") setSub("konzept"); else if (["fragebogen", "markenbuch", "design"].includes(x)) setSub(x); else go(x); };
  return (
    <div>
      <div className="hm-kette" style={{ marginTop: teamSicht ? 18 : 0 }}>{schritte.map(([id, t, ok], i) => <button key={id} className={(s === id ? "on " : "") + (ok ? "ok" : "")} onClick={() => setSub(id)}><i>{ok ? <Ico n="haken" g={12} /> : i + 1}</i>{t}</button>)}</div>
      <div style={{ marginTop: 22 }}>
        {s === "fragebogen" && (window.Fragebogen2 && !alterBogen ? <div>{teamSicht && <div className="hm-row" style={{ justifyContent: "flex-end", marginBottom: 8 }}><button className="hm-link" onClick={() => setAlterBogen(true)}>Ersten Fragebogen ansehen</button></div>}<Fragebogen2 m={m} teamSicht={teamSicht} /></div> : <div>{alterBogen && <div className="hm-row" style={{ justifyContent: "flex-end", marginBottom: 8 }}><button className="hm-link" onClick={() => setAlterBogen(false)}>Zum Fragebogen v2</button></div>}<Fragebogen m={m} fb={fb} go={legacyGo} /></div>)}
        {s === "konzept" && <Strategie m={m} fb={fb} st={st} go={legacyGo} />}
        {s === "design" && <Studio m={m} setSub={setSub} teamSicht={teamSicht} />}
        {s === "markenbuch" && <Markenbuch m={m} teamSicht={teamSicht} />}
        {s === "website" && <Website m={m} setSub={setSub} teamSicht={teamSicht} />}
      </div>
    </div>
  );
}

/* Material kompakt im Design: was der Makler mitbringt */
function MaterialKompakt({ m }) {
  const br = (useHm("branding") || {})[m.id] || {};
  const liste = br.material || [];
  const [offen, setOffen] = React.useState(false);
  return <section>
    <div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-mono">Was du mitbringst · {liste.length}</div><button className="hm-link" onClick={() => setOffen(true)}>{liste.length ? "Verwalten" : "Hochladen"}</button></div>
    {liste.length ? <div className="hm-thumbs">{liste.slice(0, 8).map((x) => x.vorschau ? <img key={x.id} src={x.vorschau} alt={x.name} title={`${x.art}: ${x.name}`} /> : null)}</div> : <div className="hm-mono">Altes Logo, Fotos, Objekte, Inspiration. Fließt in Farben, Bildwelt und die Frage ein, ob ein Logo geschärft oder ersetzt wird.</div>}
    <Sheet offen={offen} zu={() => setOffen(false)} titel="Was du mitbringst" breit><Material m={m} /></Sheet>
  </section>;
}

/* Material: alles, was der Makler an Vorhandenem mitbringt. Bilder werden verkleinert gespeichert. */
function Material({ m }) {
  const br = (useHm("branding") || {})[m.id] || {};
  const [art, setArt] = React.useState(HM_MATERIAL_ARTEN[1]);
  const liste = br.material || [];
  const add = async (files) => {
    const neu = [];
    for (const f of [...files]) {
      let vorschau = null;
      if (f.type.startsWith("image/")) vorschau = await new Promise((res) => { const img = new Image(); img.onload = () => { const k = Math.min(1, 360 / Math.max(img.width, img.height)); const c = document.createElement("canvas"); c.width = img.width * k; c.height = img.height * k; c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); res(c.toDataURL("image/jpeg", .8)); }; img.onerror = () => res(null); img.src = URL.createObjectURL(f); });
      let bild = null; if (f.type.startsWith("image/") && window.hmWebBildSpeichern) { try { bild = await hmWebBildSpeichern(m.id, f, { quelle: "material" }); } catch (e) { bild = null; } }
      neu.push({ id: "mt" + Date.now() + Math.random().toString(36).slice(2, 5), name: f.name, art, groesse: f.size, vorschau, bild, datum: new Date().toISOString().slice(0, 10) });
    }
    hmStore.patch("branding", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), material: [...(((a || {})[m.id] || {}).material || []), ...neu] } }));
    hmEvent(m.id, "material", `${neu.length} Dateien als ${art} hochgeladen`, m.name);
    toast(`${neu.length} hochgeladen`);
  };
  const beispiel = () => { const demo = [["Fotos von dir", "/assets/team/portrait-06.jpg"], ["Objektfotos", "/assets/img/albrechts-wohnen.jpg"], ["Objektfotos", "/assets/img/beheim.jpg"], ["Inspiration", "/assets/photos/interieur-wurzelholz.jpg"], ["Inspiration", "/assets/img/vienna-facades.jpg"]]; hmStore.patch("branding", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), material: [...(((a || {})[m.id] || {}).material || []), ...demo.map(([ar, u], i) => ({ id: "demo" + i + Date.now(), name: u.split("/").pop(), art: ar, vorschau: u, datum: "2026-09-28" }))] } })); };
  return <div>
    <div className="hm-chips">{HM_MATERIAL_ARTEN.map((x) => <button key={x} className={"hm-chip" + (art === x ? " on" : "")} onClick={() => setArt(x)}>{x}</button>)}</div>
    <label className="hm-drop" style={{ marginTop: 12 }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); add(e.dataTransfer.files); }}><input type="file" multiple hidden onChange={(e) => add(e.target.files)} /><span>Dateien für <b>{art}</b> hierher ziehen oder wählen</span></label>
    {!liste.length && <div style={{ marginTop: 12 }}><button className="hm-chip" onClick={beispiel}>Demo: UNIO-Beispielmaterial einfügen</button></div>}
    {HM_MATERIAL_ARTEN.filter((a) => liste.some((x) => x.art === a)).map((a) => <div key={a} style={{ marginTop: 24 }}><div className="hm-mono" style={{ marginBottom: 10 }}>{a} · {liste.filter((x) => x.art === a).length}</div><div className="hm-thumbs gross">{liste.filter((x) => x.art === a).map((x) => <figure key={x.id}>{x.vorschau ? <img src={x.vorschau} alt="" /> : <div className="hm-datei">{x.name.split(".").pop().toUpperCase()}</div>}<figcaption>{x.name}</figcaption></figure>)}</div></div>)}
    {liste.length > 0 && <div className="hm-daten" style={{ marginTop: 16 }}>Fließt in Farben, Bildwelt und Logo-Entscheidung ein.</div>}
  </div>;
}

/* Branding-Studio */
function Studio({ m, setSub, teamSicht }) {
  useHm("branding");
  const st = (useHm("strategien") || {})[m.id];
  const fb = ((useHm("fragebogen") || {})[m.id] || {}).antworten || {};
  const b = hmBrand(m.id);
  const [werkstatt, setWerkstatt] = React.useState(false);
  if (!st || !st.gewaehlt) return <div className="hm-stack"><Leer titel="Erst den Weg wählen." text="Das Design entsteht aus deinem Konzept. Bis dahin kannst du schon hochladen, was du mitbringst." aktion={<Btn onClick={() => setSub("konzept")}>Zum Konzept</Btn>} /><div className="hm-studio-l"><MaterialKompakt m={m} /></div></div>;
  const w = st.wege[st.gewaehlt];
  const set = (patch) => hmStore.patch("branding", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), ...patch, status: patch.status || (((a || {})[m.id] || {}).status === "freigegeben" ? "geaendert" : "entwurf") } }));
  const empfS = HM_SCHRIFTPAARE[b.aid], empfA = HM_AKZENT_EMPF[b.aid];
  return <div>
    <Kopf titel="Branding" ueber={`Aus deinem Weg ${w.archetyp.name}`}
      rechts={b.fertig ? <span className="hm-ez z-fertig">Freigegeben</span> : !teamSicht ? <span className="hm-ez z-in_arbeit">Beim Team</span> : <Btn onClick={() => { set({ status: "freigegeben" }); setTimeout(() => window.hmQuelleEinfrieren && hmQuelleEinfrieren(m.id, teamSicht ? "Team" : m.name, "Branding freigegeben"), 0); hmEvent(m.id, "branding", "Branding freigegeben", teamSicht ? "Team" : m.name); toast("Branding freigegeben. Website und Visitenkarten sind vorbereitet."); }}>Branding freigeben</Btn>} />
    <div className="hm-studio">
      <div className="hm-studio-l">
        <MaterialKompakt m={m} />
        <PortraitZeile m={m} teamSicht={teamSicht} />
        {teamSicht ? <>
        <section><div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-mono">Logo</div>{teamSicht && <button className="hm-link" onClick={() => setWerkstatt(true)}>Logo-Werkstatt öffnen</button>}</div><div className="hm-optionen">{b.logoKonzept && <button className={"hm-option" + (b.logo === "konzept" ? " on" : "")} onClick={() => set({ logo: "konzept" })}><div className="bild"><BrandLogo b={b} typ="konzept" h={b.logoKonzept.art === "monogramm" ? 56 : 34} /></div><div className="t">Aus der Werkstatt</div><div className="s">{(HM_LK_ARTEN.find((x) => x.id === b.logoKonzept.art) || {}).name}, {b.logoKonzept.font}</div></button>}{HM_LOGO_TYPEN.map((t) => <button key={t.id} className={"hm-option" + (b.logo === t.id ? " on" : "")} onClick={() => set({ logo: t.id })}><div className="bild" data-logo={t.id}><BrandLogo b={b} typ={t.id} h={t.id === "monogramm" ? 56 : 34} /></div><div className="t">{t.name}</div><div className="s">{t.satz}</div></button>)}</div>
          {!teamSicht && window.LogoBewertung && <LogoBewertung m={m} />}
          <Sheet offen={werkstatt} zu={() => setWerkstatt(false)} titel="Logo-Werkstatt" breit><LogoWerkstatt m={m} teamSicht={teamSicht} /></Sheet></section>
        <section><div className="hm-mono">Schrift · empfohlen für {w.archetyp.name}</div><div className="hm-optionen">{Object.entries(HM_WEB_SCHRIFTEN).sort((x, y) => (empfS.includes(y[0]) ? 1 : 0) - (empfS.includes(x[0]) ? 1 : 0)).map(([id, f]) => <button key={id} className={"hm-option" + (b.schriftId === id ? " on" : "")} onClick={() => set({ schrift: id })}><div className="bild" style={{ fontFamily: hmFont(f.d), fontSize: 30, color: "var(--ink)" }}>Aa</div><div className="t">{f.name}{empfS.includes(id) ? " · empfohlen" : ""}</div><div className="s">{f.d} und {f.t}</div></button>)}</div></section>
        <section><div className="hm-mono">Akzentfarbe</div><div className="hm-farben">{HM_WEB_AKZENTE.map((x) => <button key={x.id} className={b.akzentId === x.id ? "on" : ""} onClick={() => set({ akzent: x.id })} title={x.name}><i style={{ background: x.hex }}></i><span>{x.name}{empfA.includes(x.id) ? " ·" : ""}</span></button>)}</div>{(() => { const k = hmKontrastInfo(b.akzent); return <div className="hm-pruefliste" style={{ marginTop: 10, fontSize: 13 }}><div className={k.gross ? "ok" : "nein"}><Ico n={k.gross ? "haken" : "x"} />Auf hellem Grund {hmZahl(k.aufPapier)} zu 1, {k.text ? "auch für Text" : k.gross ? "für Überschriften und Flächen" : "nur für Flächen"}</div><div className={k.knopf ? "ok" : "nein"}><Ico n={k.knopf ? "haken" : "x"} />Weiß darauf {hmZahl(k.weissDrauf)} zu 1, {k.knopf ? "gut für Knöpfe" : "Knöpfe mit dunkler Schrift"}</div></div>; })()}
          <LogoFarbe m={m} set={set} /></section>
        <section><div className="hm-mono">Leitidee</div><input className="hm-text" style={{ fontFamily: hmFont(b.schrift.d) }} value={b.claim} onChange={(e) => set({ claim: e.target.value })} /></section>
        </> : <MarkeLesen m={m} b={b} />}
        {teamSicht ? <BildweltBruecke m={m} teamSicht={teamSicht} /> : <BildweltGalerie m={m} />}
      </div>
      <div className="hm-studio-r">
        <div className="hm-mono">So sieht es aus</div>
        <div className="hm-mock-web" style={{ fontFamily: hmFont(b.schrift.t) }}><div className="hm-row" style={{ justifyContent: "space-between" }}><BrandLogo b={b} h={20} /><span style={{ background: b.akzent, color: "#fff", borderRadius: 999, padding: "5px 12px", fontSize: 11 }}>Erstgespräch</span></div><div style={{ fontFamily: hmFont(b.schrift.d), fontSize: 28, lineHeight: 1.02, letterSpacing: "-.02em", marginTop: 26, maxWidth: "15ch", color: "#0B0A09" }}>{b.claim}</div><div style={{ fontSize: 12, color: "#383429", marginTop: 10, maxWidth: "40ch" }}>{w.satz}</div></div>
        {(() => { const wk = window.WeltKarte && window.hmMbWelt ? hmMbWelt(m.id, window.hmMbPlattform ? hmMbPlattform(m.id) : null) : null; /* eine Karte in der ganzen Werkbank: die der Markenwelt */ return wk ? <div className="hm-vk-paar klein"><WeltKarte welt={wk} b={b} breite={240} /><WeltKarte welt={wk} b={b} seite="hinten" breite={240} /></div> : <div className="hm-vk-paar klein"><Visitenkarte b={b} tel="+43 1 000 00 00" mail={(((hmStore.get("kontakte") || {})[m.id] || [])[0] || {}).mail || ""} /><Visitenkarte b={b} seite="hinten" /></div>; })()}
        <div className="hm-row" style={{ gap: 10, alignItems: "stretch" }}>
          <div className="hm-mock-post" style={{ background: "#F7F5F1" }}><div style={{ fontFamily: hmFont(b.schrift.d), fontSize: 17, lineHeight: 1.05, color: "#0B0A09" }}>{w.hooks[0]}</div><div className="hm-row" style={{ justifyContent: "space-between", marginTop: "auto" }}><BrandLogo b={b} h={12} /><i style={{ width: 10, height: 10, borderRadius: "50%", background: b.akzent }}></i></div></div>
          <div className="hm-mock-post" style={{ background: b.akzent, color: "#fff" }}><div style={{ fontFamily: hmFont(b.schrift.d), fontSize: 17, lineHeight: 1.05 }}>{w.hooks[1]}</div><div style={{ marginTop: "auto" }}><BrandLogo b={b} h={12} invert /></div></div>
        </div>
        <StudioDownloads b={b} />
        <div className="hm-mock-sig"><BrandLogo b={b} h={16} /><div style={{ fontSize: 11, color: "#383429", marginTop: 6, fontFamily: hmFont(b.schrift.t) }}>{b.makler.name} · UNIO Partner<br />{b.claim}</div></div>
      </div>
    </div>
  </div>;
}

/* Website: Look wählen, Felder mit Herkunft, Live-Vorschau im Aufbau der Makler-Homepages */
function hmWebFelder(m, b, web) {
  const fb = ((hmStore.get("fragebogen") || {})[m.id] || {}).antworten || {};
  const k = ((hmStore.get("kontakte") || {})[m.id] || [])[0] || {};
  const e = (hmStore.get("einrichtung") || {})[m.id] || {};
  const kd = ((hmStore.get("einrichtung_daten") || {})[m.id] || {});
  const v = web.felder || {};
  const jahre = { "Unter 2 Jahren": "1+", "2 bis 5 Jahre": "3+", "5 bis 10 Jahre": "5+", "Über 10 Jahre": "10+" }[fb.seit] || "";
  const F = (id, label, gruppe, auto, quelle, pflicht) => ({ id, label, gruppe, wert: v[id] != null ? v[id] : auto, auto, quelle, pflicht, eigen: v[id] != null });
  /* Aus dem freigegebenen Markenbuch: Claim, Story, Versprechen, Belege */
  const pl = window.hmMbPlattform && (hmStore.get("markenbuch") || {})[m.id] ? hmMbPlattform(m.id) : null;
  const beleg = pl && (pl.beweise || []).map((x) => x.beleg).filter((x) => /\d/.test(x || "")).slice(0, 2).join(" · ");
  return [
    F("name", "Name", "UNIO", m.name, "Profil"),
    F("tel", "Telefon", "UNIO", (kd.visitenkarten || {}).tel || "", "Visitenkarte", true),
    F("mail", "E-Mail", "UNIO", k.mail || "", "Kontakte", true),
    F("portrait", "Porträt, freigestellt", "UNIO", b.portrait ? "Aus dem Zuschnitt" : "", "Porträt", true),
    F("region", "Region", "UNIO", (fb.bezirke || []).map((x) => x.replace(/^\d{4}\s/, "")).slice(0, 3).join(", ") || m.region.replace(/^\d{4}\s/, ""), "Fragebogen"),
    F("objekte", "Objekte", "UNIO", "6 aktuelle aus deinem Bestand", "Objekte im Dashboard"),
    F("instagram", "Instagram", "UNIO", e.konten === "fertig" ? "@" + (b.vor + "." + b.nach).toLowerCase() + ".immo" : "", "Konten"),
    F("logo", "Logo und Wortmarke", "Marke", (b.logo === "konzept" ? { name: "Aus der Logo-Werkstatt" } : HM_LOGO_TYPEN.find((x) => x.id === b.logo) || HM_LOGO_TYPEN[0]).name, "Branding"),
    F("schrift", "Schrift", "Marke", b.schrift.name, "Branding"),
    F("akzent", "Akzentfarbe", "Marke", (HM_WEB_AKZENTE.find((x) => x.id === b.akzentId) || {}).name, "Branding"),
    F("headline", "Headline", "Marke", (pl && pl.botschaften && pl.botschaften.claim) || b.claim, pl ? "Markenbuch" : "Leitidee"),
    F("bio", "Über mich", "Marke", (pl && pl.story && (pl.story.mittel || pl.story.kurz)) || (b.w ? b.w.story.map((x) => x.text).slice(0, 2).join(" ") : ""), pl ? "Markenbuch, Story" : "Brand Story"),
    F("zitat", "Zitat", "Marke", (pl && (pl.versprechen || (pl.story && pl.story.haltung))) || (b.w ? b.w.leitidee : ""), pl ? "Markenbuch, Versprechen" : "Haltung"),
    F("stats", "Kennzahlen", "Marke", jahre ? `${jahre} Jahre am Markt · UNIO Netzwerk` : "UNIO Netzwerk", "Fragebogen"),
    F("referenzen", "Referenzen und Kundenstimmen", "Du", fb.kundensatz ? `"${fb.kundensatz}"` : "", "Du, mit Freigabe der Kunden", true),
    F("adresse", "Büroadresse", "Du", "Kärntner Straße 12, 1010 Wien (UNIO)", "Vorschlag"),
    F("domain", "Domain", "Du", (b.vor + b.nach).toLowerCase().replace(/[^a-z]/g, "") + ".at", "Vorschlag"),
    F("termin", "Link für Erstgespräch", "Du", "", "Du", true),
    F("firma", "Firmenwortlaut", "Recht", "", "Impressum (ECG § 5)", true),
    F("gisa", "GISA-Zahl", "Recht", "", "Gewerbe Immobilientreuhänder", true),
    F("behoerde", "Gewerbebehörde", "Recht", "", "Impressum", true),
    F("uid", "UID-Nummer", "Recht", "", "Impressum"),
    F("kammer", "Kammer und Fachgruppe", "Recht", "WKO, Fachgruppe Immobilien- und Vermögenstreuhänder", "Vorschlag"),
    F("haftpflicht", "Berufshaftpflicht", "Recht", "", "Nachweis", true),
  ];
}
const HM_WEB_GRUPPEN = { UNIO: ["Automatisch aus UNIO", "Kommt aus Profil, Einrichtung und Bestand. Ändert sich mit, wenn sich dort etwas ändert."], Marke: ["Aus deiner Marke", "Aus Branding und Konzept. Änderst du dein Branding, ändert sich die Website mit."], Du: ["Von dir", "Nur du weißt das. Einmal eintragen."], Recht: ["Rechtliches", "Pflichtangaben für das Impressum eines Immobilienmaklers. Wir prüfen vor dem Livegang."] };

function BrandKit({ m, setSub }) {
  useHm("branding");
  const b = hmBrand(m.id);
  const ref = React.useRef(null);
  const svg = (typ) => { const el = ref.current && ref.current.querySelector(`[data-logo="${typ}"] svg`); if (!el) return; const s = new XMLSerializer().serializeToString(el); const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([s], { type: "image/svg+xml" })); a.download = `${(b.vor + "-" + b.nach).toLowerCase()}-${typ}.svg`; a.click(); };
  if (!b.w) return <Leer titel="Brand-Kit entsteht mit dem Konzept." aktion={<Btn onClick={() => setSub("konzept")}>Zum Konzept</Btn>} />;
  const palette = [["Grund", "#F7F5F1"], ["Text", "#0B0A09"], ["Akzent", b.akzent], ["Fläche", "#F0EDE6"], ["Linie", "#D1D3D5"]];
  const vorlagen = (hmStore.get("vorlagen") || []).slice(0, 4);
  return <div ref={ref}>
    <Kopf titel="Brand-Kit" text={b.fertig ? "Freigegeben. Logos als SVG, Farben mit Code, Schriften und die Vorlagen, mit denen wir produzieren." : "Entwurf. Nach der Freigabe ist das Kit verbindlich."} />
    <div className="hm-kacheln" style={{ marginTop: 22 }}>{HM_LOGO_TYPEN.map((t) => <div key={t.id} className="hm-kachel" data-logo={t.id} style={{ cursor: "default" }}><div style={{ minHeight: 70, display: "grid", placeItems: "center", width: "100%" }}><BrandLogo b={b} typ={t.id} h={t.id === "monogramm" ? 60 : 30} /></div><div className="t">{t.name}{b.logo === t.id ? " · Hauptlogo" : ""}</div><button className="hm-chip" onClick={() => svg(t.id)}>SVG laden</button></div>)}</div>
    <div className="hm-mono" style={{ marginTop: 26, marginBottom: 10 }}>Farben</div>
    <div className="hm-palette">{palette.map(([n, h]) => <div key={n}><i style={{ background: h }}></i><div className="t">{n}</div><Kopieren text={h} /></div>)}</div>
    <div className="hm-mono" style={{ marginTop: 26, marginBottom: 10 }}>Schriften · {b.schrift.name}</div>
    <div className="hm-card"><div style={{ fontFamily: hmFont(b.schrift.d), fontSize: 40, letterSpacing: "-.02em", color: "var(--ink)" }}>{b.schrift.d}</div><div style={{ fontFamily: hmFont(b.schrift.t), fontSize: 16, marginTop: 6 }}>{b.schrift.t} für Fließtext und Daten. Beide frei über Google Fonts verfügbar.</div></div>
    <div className="hm-mono" style={{ marginTop: 26, marginBottom: 10 }}>Vorlagen im Einsatz</div>
    <div className="hm-list">{vorlagen.map((v) => <Zeile key={v.id} titel={v.name} unter={`${v.woerter} Wörter`} />)}</div>
  </div>;
}

/* Porträt im Studio: eine Zeile, Verwaltung im Fenster */
/* Makler: die Marke als fertiges Ergebnis, ohne Konfigurator (Prozess v2, C5). Urteil am Markenvertrag, Gestaltung beim Team */
function MarkeLesen({ m, b }) {
  const ak = HM_WEB_AKZENTE.find((x) => x.id === b.akzentId) || {};
  return <section className="hm-marke-lesen">
    <div className="hm-mono">Ihre Marke</div>
    <div className="logo"><BrandLogo b={b} h={b.logo === "monogramm" ? 64 : 40} /></div>
    <div className="hm-gruppe">
      <div className="hm-reihe"><div className="m"><div className="u">Leitidee</div><div className="t" style={{ fontFamily: hmFont(b.schrift.d), fontSize: 20, whiteSpace: "normal" }}>{b.claim}</div></div></div>
      <div className="hm-reihe"><div className="m"><div className="u">Schrift</div><div className="t" style={{ whiteSpace: "normal" }}>{b.schrift.name}: {b.schrift.d}{b.schrift.t !== b.schrift.d ? ` und ${b.schrift.t}` : ""}</div></div></div>
      <div className="hm-reihe"><i style={{ width: 22, height: 22, borderRadius: 999, background: b.akzent, flex: "none" }} /><div className="m"><div className="u">Akzent</div><div className="t">{ak.name || b.akzent}</div></div></div>
    </div>
    <p className="hm-sub" style={{ fontSize: 14, marginTop: 10 }}>{b.fertig ? "Freigegeben. Änderungen wünschen Sie in Ihrer Rückmeldung am Markenvertrag." : "Ihr UNIO-Team gestaltet gerade. In der Präsentation sehen Sie alles im Einsatz."}</p>
    {window.LogoBewertung && <LogoBewertung m={m} />}
  </section>;
}
function PortraitZeile({ m, teamSicht }) {
  useHm("portraits");
  const b = hmBrand(m.id);
  const [offen, setOffen] = React.useState(false);
  return <section>
    <div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-mono">Porträt</div><button className="hm-link" onClick={() => setOffen(true)}>{b.portrait ? "Ändern" : "Hochladen"}</button></div>
    <div className="hm-row" style={{ gap: 14 }}>{b.portrait ? <img className="hm-portrait-mini" src={b.portrait} alt="" /> : <Avatar name={m.name} gross />}<div className="hm-sub" style={{ margin: 0, fontSize: 14 }}>{b.portrait ? "Freigestellt nach der UNIO-Guideline. Website, Visitenkarte und Shop nutzen es." : "Bis ein Porträt da ist, steht dein Monogramm."}</div></div>
    <Sheet offen={offen} zu={() => setOffen(false)} titel="Porträt" breit><Portraits m={m} teamSicht={teamSicht} /></Sheet>
  </section>;
}

/* Downloads direkt im Design (ersetzt das separate Brand-Kit) */
function StudioDownloads({ b }) {
  const laden = (typ, f) => hmLogoLaden(b, typ, f).catch(() => toast("Logo konnte nicht erstellt werden"));
  return <div className="hm-gruppe">
    <BrandKitKnopf m={b.makler} />
    {HM_LOGO_TYPEN.map((t) => <div key={t.id} className="hm-reihe"><div className="m"><div className="t">{t.name}{b.logo === t.id ? " · Hauptlogo" : ""}</div><div className="u">Vektor, Schrift in Pfade umgewandelt</div></div><div className="r"><button className="hm-klein-btn hell" onClick={() => laden(t.id, "svg")}>SVG</button><button className="hm-klein-btn hell" onClick={() => laden(t.id, "png")}>PNG</button></div></div>)}
    {b.portrait && <div className="hm-reihe"><div className="m"><div className="t">Porträt</div><div className="u">PNG, freigestellt, Originalauflösung</div></div><div className="r"><a className="hm-klein-btn hell" style={{ textDecoration: "none" }} href={b.portrait} download={`${hmDateiname(b.vor + "-" + b.nach)}-portrait.png`}>Laden</a></div></div>}
    <div className="hm-reihe"><div className="m"><div className="t">Farben</div><div className="u">Akzent {b.akzent} · Grund #F7F5F1 · Text #0B0A09</div></div><div className="r"><Kopieren text={b.akzent} /></div></div>
    <div className="hm-reihe"><div className="m"><div className="t">Schriften</div><div className="u">{b.schrift.d} und {b.schrift.t}, über Google Fonts</div></div></div>
  </div>;
}

function hmShowcaseSrc(n) { return location.pathname.startsWith("/ux/") ? `/showcase${n}` : `../../showcase/showcase${n}.html`; }

function hmAbs(u) { return new URL(u, location.href).href; }

function hmWebObjekte() {
  return [
    ["Das Albrecht, Dachgeschoss", "Wieden · 1040", "€ 1.290.000", "128 m²", "4 Zi", "albrechts-dachgeschoss.jpg"],
    ["Beheimgasse", "Hernals · 1170", "€ 468.000", "64 m²", "2 Zi", "beheim.jpg"],
    ["Oben Zwei, Terrasse", "Leopoldstadt · 1020", "€ 1.190.000", "118 m²", "4 Zi", "obenzwei-terrasse.jpg"],
    ["Zinshaus, Gründerzeit", "Margareten · 1050", "Preis auf Anfrage", "1.180 m²", "12 Einheiten", "zinshaus-fassaden.jpg"],
    ["EcoLuxe, Erstbezug", "Donaustadt · 1220", "€ 540.000", "71 m²", "3 Zi", "ecoluxe.jpg"],
    ["Penthouse am Ring", "Innere Stadt · 1010", "€ 3.450.000", "196 m²", "5 Zi", "penthouse.jpg"],
    ["Wohnen bei Schönbrunn", "Hietzing · 1130", "€ 1.080.000", "104 m²", "3 Zi", "schoenbrunn.jpg"],
    ["Das Albrecht, Wohnen", "Wieden · 1040", "€ 720.000", "82 m²", "3 Zi", "albrechts-wohnen.jpg"],
    ["Maxingstraße", "Hietzing · 1130", "€ 890.000", "96 m²", "3 Zi", "maxingstrasse-zimmer.jpg"],
  ].map(([t, loc, price, m2, zi, img]) => ({ t, loc, price, m2, zi, img: hmAbs("/assets/img/" + img) }));
}

Object.assign(window, { MarkeLesen, hmShowcaseSrc, hmAbs, hmWebObjekte, HM_WEB_GRUPPEN, StudioDownloads, MaterialKompakt, Marke, Material, Studio, BrandKit, hmWebFelder });
