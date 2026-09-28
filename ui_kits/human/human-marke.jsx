/* UNIO HUMAN. Marke: Fragebogen, Material, Konzept (zwei Wege), Branding-Studio, Website, Brand-Kit.
   Daten fließen nach unten: Fragebogen und Material ergeben das Konzept, das Konzept das Branding,
   das Branding Website, Visitenkarten, Shop, Vorlagen und Captions. */

function Marke({ m, sub, setSub, go, teamSicht }) {
  const fb = (useHm("fragebogen") || {})[m.id];
  const st = (useHm("strategien") || {})[m.id];
  useHm("branding"); useHm("website");
  const b = hmBrand(m.id);
  const web = (hmStore.get("website") || {})[m.id] || {};
  const schritte = [["fragebogen", "Fragebogen", fb && fb.fertig], ["konzept", "Konzept", st && st.gewaehlt], ["design", "Design", b.fertig], ["website", "Website", web.status === "live"]];
  const roh = sub === "material" || sub === "kit" ? "design" : sub;
  const s = roh || (fb && fb.fertig ? (b.fertig ? "website" : st && st.gewaehlt ? "design" : "konzept") : "fragebogen");
  const legacyGo = (x) => { if (x === "strategie") setSub("konzept"); else if (x === "fragebogen") setSub("fragebogen"); else go(x); };
  return (
    <div>
      <div className="hm-kette" style={{ marginTop: teamSicht ? 18 : 0 }}>{schritte.map(([id, t, ok], i) => <button key={id} className={(s === id ? "on " : "") + (ok ? "ok" : "")} onClick={() => setSub(id)}><i>{ok ? <Ico n="haken" g={12} /> : i + 1}</i>{t}</button>)}</div>
      <div style={{ marginTop: 22 }}>
        {s === "fragebogen" && <Fragebogen m={m} fb={fb} go={legacyGo} />}
        {s === "konzept" && <Strategie m={m} fb={fb} st={st} go={legacyGo} />}
        {s === "design" && <Studio m={m} setSub={setSub} teamSicht={teamSicht} />}
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
      neu.push({ id: "mt" + Date.now() + Math.random().toString(36).slice(2, 5), name: f.name, art, groesse: f.size, vorschau, datum: "2026-09-28" });
    }
    hmStore.patch("branding", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), material: [...(((a || {})[m.id] || {}).material || []), ...neu] } }));
    hmEvent(m.id, "material", `${neu.length} Dateien als ${art} hochgeladen`, m.name);
    toast(`${neu.length} hochgeladen`);
  };
  const beispiel = () => { const demo = [["Fotos von dir", "../../assets/team/portrait-06.jpg"], ["Objektfotos", "../../assets/img/albrechts-wohnen.jpg"], ["Objektfotos", "../../assets/img/beheim.jpg"], ["Inspiration", "../../assets/photos/interieur-wurzelholz.jpg"], ["Inspiration", "../../assets/img/vienna-facades.jpg"]]; hmStore.patch("branding", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), material: [...(((a || {})[m.id] || {}).material || []), ...demo.map(([ar, u], i) => ({ id: "demo" + i + Date.now(), name: u.split("/").pop(), art: ar, vorschau: u, datum: "2026-09-28" }))] } })); };
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
  const [bilder, setBilder] = React.useState(null);
  if (!st || !st.gewaehlt) return <div className="hm-stack"><Leer titel="Erst den Weg wählen." text="Das Design entsteht aus deinem Konzept. Bis dahin kannst du schon hochladen, was du mitbringst." aktion={<Btn onClick={() => setSub("konzept")}>Zum Konzept</Btn>} /><div className="hm-studio-l"><MaterialKompakt m={m} /></div></div>;
  const w = st.wege[st.gewaehlt];
  const set = (patch) => hmStore.patch("branding", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), ...patch, status: patch.status || (((a || {})[m.id] || {}).status === "freigegeben" ? "geaendert" : "entwurf") } }));
  const prompt = hmBildweltPrompt(w, fb, b.br);
  const warm = Object.values(fb.bildpaare || {}).filter((v) => v === "a").length >= 3;
  const pool = warm ? ["terrasse-golden.png", "interieur-wurzelholz.jpg", "lifestyle-paar.jpg", "essen-gruen.jpg"] : ["penthouse-glas.png", "skyline-terrasse.png", "kueche-schwarz.jpg", "villen-luftbild.jpg"];
  const empfS = HM_SCHRIFTPAARE[b.aid], empfA = HM_AKZENT_EMPF[b.aid];
  return <div>
    <Kopf titel="Dein Branding" text={`Aus deinem Weg ${w.archetyp.name}. Website, Visitenkarte und Shop übernehmen, was du hier wählst.`}
      rechts={b.fertig ? <span className="hm-ez z-fertig">Freigegeben</span> : <Btn onClick={() => { set({ status: "freigegeben" }); hmEvent(m.id, "branding", "Branding freigegeben", teamSicht ? "Team" : m.name); toast("Branding freigegeben. Website und Visitenkarten sind vorbereitet."); }}>Branding freigeben</Btn>} />
    <div className="hm-studio">
      <div className="hm-studio-l">
        <MaterialKompakt m={m} />
        <PortraitZeile m={m} teamSicht={teamSicht} />
        <section><div className="hm-mono">Logo</div><div className="hm-optionen">{HM_LOGO_TYPEN.map((t) => <button key={t.id} className={"hm-option" + (b.logo === t.id ? " on" : "")} onClick={() => set({ logo: t.id })}><div className="bild" data-logo={t.id}><BrandLogo b={b} typ={t.id} h={t.id === "monogramm" ? 56 : 34} /></div><div className="t">{t.name}</div><div className="s">{t.satz}</div></button>)}</div></section>
        <section><div className="hm-mono">Schrift · empfohlen für {w.archetyp.name}</div><div className="hm-optionen">{Object.entries(HM_WEB_SCHRIFTEN).sort((x, y) => (empfS.includes(y[0]) ? 1 : 0) - (empfS.includes(x[0]) ? 1 : 0)).map(([id, f]) => <button key={id} className={"hm-option" + (b.schriftId === id ? " on" : "")} onClick={() => set({ schrift: id })}><div className="bild" style={{ fontFamily: hmFont(f.d), fontSize: 30, color: "var(--ink)" }}>Aa</div><div className="t">{f.name}{empfS.includes(id) ? " · empfohlen" : ""}</div><div className="s">{f.d} und {f.t}</div></button>)}</div></section>
        <section><div className="hm-mono">Akzentfarbe</div><div className="hm-farben">{HM_WEB_AKZENTE.map((x) => <button key={x.id} className={b.akzentId === x.id ? "on" : ""} onClick={() => set({ akzent: x.id })} title={x.name}><i style={{ background: x.hex }}></i><span>{x.name}{empfA.includes(x.id) ? " ·" : ""}</span></button>)}</div>{(() => { const k = hmKontrastInfo(b.akzent); return <div className="hm-pruefliste" style={{ marginTop: 10, fontSize: 13 }}><div className={k.gross ? "ok" : "nein"}><Ico n={k.gross ? "haken" : "x"} />Auf hellem Grund {hmZahl(k.aufPapier)} zu 1, {k.text ? "auch für Text" : k.gross ? "für Überschriften und Flächen" : "nur für Flächen"}</div><div className={k.knopf ? "ok" : "nein"}><Ico n={k.knopf ? "haken" : "x"} />Weiß darauf {hmZahl(k.weissDrauf)} zu 1, {k.knopf ? "gut für Knöpfe" : "Knöpfe mit dunkler Schrift"}</div></div>; })()}
          <LogoFarbe m={m} set={set} /></section>
        <section><div className="hm-mono">Leitidee</div><input className="hm-text" style={{ fontFamily: hmFont(b.schrift.d) }} value={b.claim} onChange={(e) => set({ claim: e.target.value })} /></section>
        <section><div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-mono">Bildwelt · Higgsfield-Anbindung</div><span className="hm-ez">Vorbereitet</span></div>
          <div className="hm-prompt">{prompt}</div>
          <div className="hm-row" style={{ marginTop: 10 }}><Btn onClick={() => setBilder(pool)}>Bildwelt erzeugen</Btn><span className="hm-mono">Prototyp zeigt Bilder aus dem UNIO-Archiv</span></div>
          {bilder && <div className="hm-thumbs gross" style={{ marginTop: 14 }}>{bilder.map((f) => <figure key={f}><img src={"../../assets/photos/" + f} alt="" /><figcaption>Vorschau</figcaption></figure>)}</div>}
        </section>
      </div>
      <div className="hm-studio-r">
        <div className="hm-mono">So sieht es aus</div>
        <div className="hm-mock-web" style={{ fontFamily: hmFont(b.schrift.t) }}><div className="hm-row" style={{ justifyContent: "space-between" }}><BrandLogo b={b} h={20} /><span style={{ background: b.akzent, color: "#fff", borderRadius: 999, padding: "5px 12px", fontSize: 11 }}>Erstgespräch</span></div><div style={{ fontFamily: hmFont(b.schrift.d), fontSize: 28, lineHeight: 1.02, letterSpacing: "-.02em", marginTop: 26, maxWidth: "15ch", color: "#0B0A09" }}>{b.claim}</div><div style={{ fontSize: 12, color: "#383429", marginTop: 10, maxWidth: "40ch" }}>{w.satz}</div></div>
        <div className="hm-vk-paar klein"><Visitenkarte b={b} tel="+43 1 000 00 00" mail={(((hmStore.get("kontakte") || {})[m.id] || [])[0] || {}).mail || ""} /><Visitenkarte b={b} seite="hinten" /></div>
        <div className="hm-row" style={{ gap: 10, alignItems: "stretch" }}>
          <div className="hm-mock-post" style={{ background: "#F7F5F1" }}><div style={{ fontFamily: hmFont(b.schrift.d), fontSize: 17, lineHeight: 1.05, color: "#0B0A09" }}>{w.hooks[0]}</div><div className="hm-row" style={{ justifyContent: "space-between", marginTop: "auto" }}><BrandLogo b={b} h={12} /><i style={{ width: 10, height: 10, borderRadius: "50%", background: b.akzent }}></i></div></div>
          <div className="hm-mock-post" style={{ background: b.akzent, color: "#fff" }}><div className="hm-mono" style={{ color: "rgba(255,255,255,.8)" }}>Wie ich arbeite</div><div style={{ fontFamily: hmFont(b.schrift.d), fontSize: 17, lineHeight: 1.05, marginTop: 8 }}>{w.hooks[1]}</div><div style={{ marginTop: "auto" }}><BrandLogo b={b} h={12} invert /></div></div>
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
  return [
    F("name", "Name", "UNIO", m.name, "Profil"),
    F("tel", "Telefon", "UNIO", (kd.visitenkarten || {}).tel || "", "Visitenkarte", true),
    F("mail", "E-Mail", "UNIO", k.mail || "", "Kontakte", true),
    F("portrait", "Porträt, freigestellt", "UNIO", b.portrait ? "Aus dem Zuschnitt" : "", "Porträt", true),
    F("region", "Region", "UNIO", (fb.bezirke || []).map((x) => x.replace(/^\d{4}\s/, "")).slice(0, 3).join(", ") || m.region.replace(/^\d{4}\s/, ""), "Fragebogen"),
    F("objekte", "Objekte", "UNIO", "6 aktuelle aus deinem Bestand", "Objekte im Dashboard"),
    F("instagram", "Instagram", "UNIO", e.konten === "fertig" ? "@" + (b.vor + "." + b.nach).toLowerCase() + ".immo" : "", "Konten"),
    F("logo", "Logo und Wortmarke", "Marke", HM_LOGO_TYPEN.find((x) => x.id === b.logo).name, "Branding"),
    F("schrift", "Schrift", "Marke", b.schrift.name, "Branding"),
    F("akzent", "Akzentfarbe", "Marke", (HM_WEB_AKZENTE.find((x) => x.id === b.akzentId) || {}).name, "Branding"),
    F("headline", "Headline", "Marke", b.claim, "Leitidee"),
    F("bio", "Über mich", "Marke", b.w ? b.w.story.map((x) => x.text).slice(0, 2).join(" ") : "", "Brand Story"),
    F("zitat", "Zitat", "Marke", b.w ? b.w.leitidee : "", "Haltung"),
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

function Website({ m, setSub, teamSicht }) {
  useHm("website"); useHm("branding");
  const b = hmBrand(m.id);
  const web = (hmStore.get("website") || {})[m.id] || {};
  const look = web.look || 1;
  const felder = hmWebFelder(m, b, web);
  const [edit, setEdit] = React.useState(null);
  const set = (patch) => hmStore.patch("website", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), ...patch } }));
  const setF = (id, v) => set({ felder: { ...(web.felder || {}), [id]: v } });
  if (!b.fertig) return <Leer titel="Kommt nach deinem Branding." text="Sobald das Branding freigegeben ist, füllt sich die Seite fast von selbst." aktion={<Btn onClick={() => setSub("design")}>Zum Branding</Btn>} />;
  const pflichtOffen = felder.filter((f) => f.pflicht && !f.wert);
  const gefuellt = felder.filter((f) => f.wert).length;
  const status = web.status || "entwurf";
  return <div>
    <Kopf titel="Deine Website" text={`${gefuellt} von ${felder.length} Angaben sind da. Daniel prüft vor dem Livegang.`}
      rechts={status === "live" ? <span className="hm-ez z-fertig">Live auf {felder.find((f) => f.id === "domain").wert}</span> : status === "pruefung" ? (teamSicht ? <Btn onClick={() => { set({ status: "live" }); hmEvent(m.id, "website", "Website live geschaltet", "Daniel"); toast("Live"); }}>Live schalten</Btn> : <span className="hm-ez z-wartet_team">In Prüfung bei Daniel</span>) : <Btn disabled={pflichtOffen.length > 0} onClick={() => { set({ status: "pruefung" }); hmEvent(m.id, "website", "Website zur Prüfung gesendet", m.name); toast("An Daniel zur Prüfung"); }}>{pflichtOffen.length ? `Noch ${pflichtOffen.length} Pflichtfelder` : "Zur Prüfung senden"}</Btn>} />
    <div className="hm-sek">Look</div>
    <div className="hm-looks">{HM_LOOKS.map((l) => <button key={l.n} className={look === l.n ? "on" : ""} onClick={() => set({ look: l.n })}><img src={l.bild} alt="" /><div className="t">{String(l.n).padStart(2, "0")} {l.name}</div><div className="s">{l.satz}</div></button>)}</div>
    <div className="hm-web-split">
      <div className="hm-web-felder">
        {Object.entries(HM_WEB_GRUPPEN).map(([g, [titel, text]]) => <div key={g}>
          <div className="hm-sek" style={{ marginTop: g === "UNIO" ? 0 : 24 }}>{titel}<span className="hm-daten">{felder.filter((f) => f.gruppe === g && f.wert).length} / {felder.filter((f) => f.gruppe === g).length}</span></div>
          <div className="hm-gruppe" style={{ padding: "0 16px" }}>
          {felder.filter((f) => f.gruppe === g).map((f) => <div key={f.id} className={"hm-wfeld" + (!f.wert && f.pflicht ? " fehlt" : "")}>
            {edit === f.id ? <input autoFocus defaultValue={f.wert} onBlur={(e) => { setF(f.id, e.target.value); setEdit(null); }} onKeyDown={(e) => e.key === "Enter" && e.target.blur()} /> : <button onClick={() => setEdit(f.id)}><span className="l">{f.label}{f.pflicht ? " *" : ""}</span><span className="v">{f.wert || "Fehlt"}</span><span className="q">{f.eigen ? "Von dir geändert" : f.quelle}</span></button>}
          </div>)}
          </div>
          <div className="hm-mono" style={{ margin: "6px 4px 0" }}>{text}</div>
          {g === "Recht" && <div className="hm-pruefliste" style={{ margin: "12px 4px 0", fontSize: 13 }}>{hmImpressumCheck(Object.fromEntries(felder.map((f) => [f.id, f.wert]))).map((x) => <div key={x.t} className={x.ok ? "ok" : "nein"}><Ico n={x.ok ? "haken" : "x"} />{x.t}</div>)}</div>}
        </div>)}
      </div>
      <div className="hm-web-vorschau"><WebVorschau m={m} b={b} felder={felder} look={look} /></div>
    </div>
  </div>;
}

function WebVorschau({ m, b, felder, look }) {
  const F = Object.fromEntries(felder.map((f) => [f.id, f.wert]));
  const box = React.useRef(null);
  const [breite, setBreite] = React.useState(560);
  const [geladen, setGeladen] = React.useState(false);
  React.useEffect(() => { const el = box.current; if (!el) return; const ro = new ResizeObserver(() => setBreite(el.clientWidth)); ro.observe(el); return () => ro.disconnect(); }, []);
  const schluessel = JSON.stringify([look, F, b.akzent, b.schriftId, b.logo, b.portrait]);
  React.useEffect(() => setGeladen(false), [schluessel]);
  const skala = breite / 1280;
  const src = hmShowcaseSrc(look);
  const oeffnen = () => { const w = window.open(src, "_blank"); if (w) w.addEventListener("load", () => hmFuelleTemplate(w.document, F, b)); };
  return <div>
    <div className="hm-row" style={{ justifyContent: "space-between", marginBottom: 8 }}><span className="hm-mono">Look {look} mit deinen Inhalten</span><span className="hm-row" style={{ gap: 14 }}><button className="hm-link" onClick={() => hmWebsitePaket(m, b, F, look).then(() => toast("Paket geladen")).catch((e) => { console.warn(e); toast("Paket konnte nicht erstellt werden"); })}>Als Paket laden</button><button className="hm-link" onClick={oeffnen}>Groß öffnen</button></span></div>
    <div className="hm-webframe" ref={box} style={{ height: Math.min(760, 1700 * skala) }}>
      <iframe key={schluessel} src={src} title="Website-Vorschau" width="1280" height={Math.round(Math.min(760, 1700 * skala) / skala)} style={{ transform: `scale(${skala})`, width: 1280 }} onLoad={(e) => { try { hmFuelleTemplate(e.target.contentDocument, F, b); } catch (err) { console.warn(err); } setGeladen(true); }} />
      {!geladen && <div className="lade">Look {look} wird mit deinen Inhalten gefüllt</div>}
    </div>
    <div className="hm-mono" style={{ marginTop: 8 }}>Getauscht werden nur Name, Texte, Porträt, Objektfotos, Logo, Akzentfarbe und Schrift. Referenzen erscheinen erst, wenn echte Kundenstimmen da sind.</div>
  </div>;
}

function BrandKit({ m, setSub }) {
  useHm("branding");
  const b = hmBrand(m.id);
  const ref = React.useRef(null);
  const svg = (typ) => { const el = ref.current && ref.current.querySelector(`[data-logo="${typ}"] svg`); if (!el) return; const s = new XMLSerializer().serializeToString(el); const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([s], { type: "image/svg+xml" })); a.download = `${(b.vor + "-" + b.nach).toLowerCase()}-${typ}.svg`; a.click(); };
  if (!b.w) return <Leer titel="Brand-Kit entsteht mit dem Konzept." aktion={<Btn onClick={() => setSub("konzept")}>Zum Konzept</Btn>} />;
  const palette = [["Grund", "#F7F5F1"], ["Text", "#0B0A09"], ["Akzent", b.akzent], ["Fläche", "#F0EDE6"], ["Linie", "#D1D3D5"]];
  const vorlagen = (hmStore.get("vorlagen") || []).slice(0, 4);
  return <div ref={ref}>
    <Kopf titel="Alles zum Mitnehmen." text={b.fertig ? "Freigegeben. Logos als SVG, Farben mit Code, Schriften und die Vorlagen, mit denen wir produzieren." : "Entwurf. Nach der Freigabe ist das Kit verbindlich."} />
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
    {b.portrait && <div className="hm-reihe"><div className="m"><div className="t">Porträt</div><div className="u">PNG, freigestellt, Originalauflösung</div></div><div className="r"><a className="hm-klein-btn hell" style={{ textDecoration: "none" }} href={b.portrait} download={`${(b.vor + "-" + b.nach).toLowerCase()}-portrait.png`}>Laden</a></div></div>}
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
  ].map(([t, loc, price, m2, zi, img]) => ({ t, loc, price, m2, zi, img: hmAbs("../../assets/img/" + img) }));
}

function hmFuelleTemplate(doc, F, b) {
  const win = doc.defaultView; if (!win) return;
  const IMG = win.IMG || {};
  const html = doc.documentElement;
  const region = (F.region || "Wien").split(",")[0].trim();
  const mail = F.mail || "", tel = F.tel || "", ig = F.instagram || "";
  const objekte = hmWebObjekte();
  const life = ["lifestyle-paar.jpg", "terrasse-golden.png", "interieur-esszimmer.jpg", "dachlounge.jpg", "essen-gruen.jpg", "skyline-terrasse.png"].map((f) => hmAbs("../../assets/photos/" + f));
  /* 1 Bilder: jeder Schlüssel im IMG-Objekt bekommt ein UNIO-Bild */
  const karte = {}; let oi = 0, li = 0, ri = 0;
  Object.keys(IMG).forEach((k) => {
    if (k === "hero") karte[IMG[k]] = b.portrait ? hmAbs(b.portrait) : "";
    else if (/^life/.test(k)) karte[IMG[k]] = life[li++ % life.length];
    else if (/^ref_/.test(k)) karte[IMG[k]] = objekte[(ri++ + 3) % objekte.length].img;
    else karte[IMG[k]] = objekte[oi++ % objekte.length].img;
  });
  doc.querySelectorAll("img").forEach((im) => { const n = karte[im.getAttribute("src")]; if (n !== undefined) { if (n) im.setAttribute("src", n); else im.style.visibility = "hidden"; } });
  html.style.setProperty("--pmask", b.portrait ? `url(${hmAbs(b.portrait)})` : "none");
  /* 2 Texte */
  const paare = [["Immobilien mit Strategie, Sichtbarkeit und persönlicher Begleitung.", F.headline], ["Immobilien, persönlich verkauft.", F.headline], ["Für mich ist eine Immobilie kein Objekt, sondern ein Lebensraum.", F.zitat], ["marcus@example.at", mail], ["@marcus.weiss.immo", ig || "@" + (b.vor + "." + b.nach).toLowerCase() + ".immo"], ["marcus.weiss.immo", (ig || "").replace("@", "") || (b.vor + "." + b.nach).toLowerCase() + ".immo"], ["+43 (0)1 000 00 00", tel], ["Marcus", b.vor], ["Weiss", b.nach], ["· Wien", "· " + region], ["Wien )", region + " )"]];
  const w = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  let n; while ((n = w.nextNode())) { let t = n.nodeValue; paare.forEach(([a, z]) => { if (z != null && t.includes(a)) t = t.split(a).join(z); }); if (t !== n.nodeValue) n.nodeValue = t; }
  doc.querySelectorAll("[alt]").forEach((e) => e.setAttribute("alt", e.getAttribute("alt").replace(/Marcus/g, b.vor).replace(/Weiss/g, b.nach)));
  doc.querySelectorAll(".intro-body, .h2-introtext").forEach((e) => { if (F.bio) e.textContent = F.bio; });
  const stats = (F.stats || "").split(" · ").filter(Boolean).map((s) => { const [x, ...r] = s.split(" "); return [x, r.join(" ")]; });
  doc.querySelectorAll(".hero-facts").forEach((box) => box.querySelectorAll(".fact").forEach((f, i) => { if (stats[i]) { f.querySelector(".n").textContent = stats[i][0]; f.querySelector(".l").textContent = stats[i][1]; } else f.style.display = "none"; }));
  /* 3 Objekte */
  doc.querySelectorAll("#grid .card").forEach((c, i) => { const o = objekte[i % objekte.length]; const q = (s) => c.querySelector(s); if (q("h3")) q("h3").textContent = o.t; if (q(".loc")) q(".loc").textContent = o.loc; if (q(".price")) q(".price").textContent = o.price; const bs = c.querySelectorAll(".specs b"); if (bs[0]) bs[0].textContent = o.m2; if (bs[1]) bs[1].textContent = o.zi; if (q("img")) { q("img").src = o.img; q("img").alt = o.t; } });
  /* 4 Referenzen: nur echte Stimmen zeigen */
  const refSek = doc.getElementById("referenzen");
  if (refSek) { if (F.referenzen) { doc.querySelectorAll("#car .ref-card").forEach((r, i) => { if (i === 0) { const q = r.querySelector(".rquote"); if (q) q.textContent = F.referenzen; } else r.style.display = "none"; }); } else refSek.style.display = "none"; }
  /* 5 Logo */
  const f = b.schrift;
  doc.querySelectorAll(".brand").forEach((e) => { e.innerHTML = b.logo === "monogramm" ? `<span style="display:inline-grid;place-items:center;width:1.9em;height:1.9em;border-radius:50%;border:1.5px solid currentColor;font-size:.8em">${b.initialen}</span>` : b.logo === "punkt" ? `${b.vor} ${b.nach}<span style="color:${b.akzent}">.</span>` : `${b.vor} <b>${b.nach}</b>`; });
  /* 6 Farbe und Schrift */
  const a = b.akzent;
  html.style.setProperty("--loden", a); html.style.setProperty("--loden-2", `color-mix(in srgb, ${a} 78%, #000)`); html.style.setProperty("--clay", `color-mix(in srgb, ${a} 22%, #F7F5F1)`); html.style.setProperty("--head-tint", `color-mix(in srgb, ${a} 12%, #F7F5F1)`);
  if (f.d !== "Power Grotesk") { const l = doc.createElement("link"); l.rel = "stylesheet"; l.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(f.d)}:wght@300;400;500;600&family=${encodeURIComponent(f.t)}:wght@400;500;600&display=swap`; doc.head.appendChild(l); }
  html.style.setProperty("--fd", `"${f.d}", Georgia, serif`); html.style.setProperty("--fb", `"${f.t}", system-ui, sans-serif`);
  /* 7 Kontakt, Impressum, Aufräumen */
  doc.querySelectorAll('a[href^="mailto:"]').forEach((e) => e.setAttribute("href", "mailto:" + mail));
  doc.querySelectorAll('a[href^="tel:"]').forEach((e) => e.setAttribute("href", "tel:" + tel.replace(/[^+\d]/g, "")));
  const fb = doc.querySelector(".foot-bottom"); if (fb && (F.firma || F.gisa)) { const s = doc.createElement("span"); s.textContent = `Impressum: ${F.firma || "Firma folgt"} · GISA ${F.gisa || "folgt"}${F.behoerde ? " · " + F.behoerde : ""}`; fb.appendChild(s); }
  const tw = doc.getElementById("tweak"); if (tw) tw.style.display = "none";
  doc.title = `${b.makler.name}, Immobilien in ${region}`;
  html.classList.remove("pre");
  doc.querySelectorAll(".rv,.rl,.ri").forEach((e) => e.classList.add("in"));
}

Object.assign(window, { hmFuelleTemplate, hmShowcaseSrc, StudioDownloads, MaterialKompakt, Marke, Material, Studio, Website, WebVorschau, BrandKit, hmWebFelder });
