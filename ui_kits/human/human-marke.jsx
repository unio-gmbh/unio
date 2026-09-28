/* UNIO HUMAN. Marke: Fragebogen, Material, Konzept (zwei Wege), Branding-Studio, Website, Brand-Kit.
   Daten fließen nach unten: Fragebogen und Material ergeben das Konzept, das Konzept das Branding,
   das Branding Website, Visitenkarten, Shop, Vorlagen und Captions. */

function Marke({ m, sub, setSub, go, teamSicht }) {
  const fb = (useHm("fragebogen") || {})[m.id];
  const st = (useHm("strategien") || {})[m.id];
  useHm("branding"); useHm("website");
  const b = hmBrand(m.id);
  const web = (hmStore.get("website") || {})[m.id] || {};
  const tabs = [
    ["fragebogen", "Fragebogen", fb && fb.fertig ? "" : "!"],
    ["material", "Material"],
    ["konzept", "Konzept", st && !st.gewaehlt ? "!" : ""],
    ["design", "Design", st && st.gewaehlt && !b.fertig ? "!" : ""],
    ["website", "Website", b.fertig && web.status !== "live" ? "!" : ""],
    ["kit", "Brand-Kit"],
  ];
  const s = sub || (fb && fb.fertig ? (b.fertig ? "website" : st && st.gewaehlt ? "design" : "konzept") : "fragebogen");
  const legacyGo = (x) => { if (x === "strategie") setSub("konzept"); else if (x === "fragebogen") setSub("fragebogen"); else go(x); };
  return (
    <div>
      <div className="hm-kette">{["Fragebogen", "Material", "Konzept", "Design", "Website"].map((t, i) => { const id = tabs[i][0]; const ok = [fb && fb.fertig, (b.br.material || []).length > 0, st && st.gewaehlt, b.fertig, web.status === "live"][i]; return <button key={t} className={(s === id ? "on " : "") + (ok ? "ok" : "")} onClick={() => setSub(id)}><i>{ok ? "✓" : i + 1}</i>{t}</button>; })}<button className={s === "kit" ? "on" : ""} onClick={() => setSub("kit")}><i>{b.fertig ? "✓" : "6"}</i>Brand-Kit</button></div>
      <div style={{ marginTop: 26 }}>
        {s === "fragebogen" && <Fragebogen m={m} fb={fb} go={legacyGo} />}
        {s === "material" && <Material m={m} />}
        {s === "konzept" && <Strategie m={m} fb={fb} st={st} go={legacyGo} />}
        {s === "design" && <Studio m={m} setSub={setSub} teamSicht={teamSicht} />}
        {s === "website" && <Website m={m} setSub={setSub} teamSicht={teamSicht} />}
        {s === "kit" && <BrandKit m={m} setSub={setSub} />}
      </div>
    </div>
  );
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
    <Kopf ueber="Marke · 2" titel="Was du schon hast." text="Altes Logo, Fotos, Objekte, Accounts, die dir gefallen. Alles fließt ins Branding-Konzept ein, nichts davon ist Pflicht." />
    <div className="hm-chips" style={{ marginTop: 22 }}>{HM_MATERIAL_ARTEN.map((x) => <button key={x} className={"hm-chip" + (art === x ? " on" : "")} onClick={() => setArt(x)}>{x}</button>)}</div>
    <label className="hm-drop" style={{ marginTop: 12 }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); add(e.dataTransfer.files); }}><input type="file" multiple hidden onChange={(e) => add(e.target.files)} /><span>Dateien für <b>{art}</b> hierher ziehen oder wählen</span></label>
    {!liste.length && <div style={{ marginTop: 12 }}><button className="hm-chip" onClick={beispiel}>Demo: UNIO-Beispielmaterial einfügen</button></div>}
    {HM_MATERIAL_ARTEN.filter((a) => liste.some((x) => x.art === a)).map((a) => <div key={a} style={{ marginTop: 24 }}><div className="hm-mono" style={{ marginBottom: 10 }}>{a} · {liste.filter((x) => x.art === a).length}</div><div className="hm-thumbs gross">{liste.filter((x) => x.art === a).map((x) => <figure key={x.id}>{x.vorschau ? <img src={x.vorschau} alt="" /> : <div className="hm-datei">{x.name.split(".").pop().toUpperCase()}</div>}<figcaption>{x.name}</figcaption></figure>)}</div></div>)}
    {liste.length > 0 && <div className="hm-note" style={{ marginTop: 20 }}>Im Konzept wird daraus: Farben aus deinen Fotos und Inspirationen, ob ein vorhandenes Logo geschärft oder ersetzt wird, und welche Bildwelt zu dir passt. Mit der Higgsfield-Anbindung entstehen daraus eigene Markenbilder.</div>}
  </div>;
}

/* Branding-Studio */
function Studio({ m, setSub, teamSicht }) {
  useHm("branding");
  const st = (useHm("strategien") || {})[m.id];
  const fb = ((useHm("fragebogen") || {})[m.id] || {}).antworten || {};
  const b = hmBrand(m.id);
  const [bilder, setBilder] = React.useState(null);
  if (!st || !st.gewaehlt) return <Leer titel="Erst den Weg wählen." text="Das Design entsteht aus deinem Konzept. Wähle einen der zwei Wege, dann steht hier dein Branding." aktion={<Btn onClick={() => setSub("konzept")}>Zum Konzept</Btn>} />;
  const w = st.wege[st.gewaehlt];
  const set = (patch) => hmStore.patch("branding", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), ...patch, status: patch.status || (((a || {})[m.id] || {}).status === "freigegeben" ? "geaendert" : "entwurf") } }));
  const prompt = hmBildweltPrompt(w, fb, b.br);
  const warm = Object.values(fb.bildpaare || {}).filter((v) => v === "a").length >= 3;
  const pool = warm ? ["terrasse-golden.png", "interieur-wurzelholz.jpg", "lifestyle-paar.jpg", "essen-gruen.jpg"] : ["penthouse-glas.png", "skyline-terrasse.png", "kueche-schwarz.jpg", "villen-luftbild.jpg"];
  const empfS = HM_SCHRIFTPAARE[b.aid], empfA = HM_AKZENT_EMPF[b.aid];
  return <div>
    <Kopf ueber={`Marke · 4 · ${w.archetyp.name}`} titel="Dein Branding." text="Aus Fragebogen, Material und Konzept vorbereitet. Du wählst zwischen wenigen, passenden Optionen. Alles übernimmt sich automatisch in Website, Visitenkarte, Shop und Vorlagen."
      rechts={b.fertig ? <span className="hm-ez z-fertig">Freigegeben</span> : <Btn onClick={() => { set({ status: "freigegeben" }); hmEvent(m.id, "branding", "Branding freigegeben", teamSicht ? "Team" : m.name); toast("Branding freigegeben. Website und Visitenkarten sind vorbereitet."); }}>Branding freigeben</Btn>} />
    <div className="hm-studio">
      <div className="hm-studio-l">
        <section><div className="hm-mono">Logo</div><div className="hm-optionen">{HM_LOGO_TYPEN.map((t) => <button key={t.id} className={"hm-option" + (b.logo === t.id ? " on" : "")} onClick={() => set({ logo: t.id })}><div className="bild"><BrandLogo b={b} typ={t.id} h={t.id === "monogramm" ? 56 : 34} /></div><div className="t">{t.name}</div><div className="s">{t.satz}</div></button>)}</div></section>
        <section><div className="hm-mono">Schrift · empfohlen für {w.archetyp.name}</div><div className="hm-optionen">{Object.entries(HM_WEB_SCHRIFTEN).sort((x, y) => (empfS.includes(y[0]) ? 1 : 0) - (empfS.includes(x[0]) ? 1 : 0)).map(([id, f]) => <button key={id} className={"hm-option" + (b.schriftId === id ? " on" : "")} onClick={() => set({ schrift: id })}><div className="bild" style={{ fontFamily: hmFont(f.d), fontSize: 30, color: "var(--ink)" }}>Aa</div><div className="t">{f.name}{empfS.includes(id) ? " · empfohlen" : ""}</div><div className="s">{f.d} und {f.t}</div></button>)}</div></section>
        <section><div className="hm-mono">Akzentfarbe</div><div className="hm-farben">{HM_WEB_AKZENTE.map((x) => <button key={x.id} className={b.akzentId === x.id ? "on" : ""} onClick={() => set({ akzent: x.id })} title={x.name}><i style={{ background: x.hex }}></i><span>{x.name}{empfA.includes(x.id) ? " ·" : ""}</span></button>)}</div><div className="hm-note" style={{ marginTop: 10 }}>Empfohlen (mit Punkt markiert) nach deiner Figur und deinen Bildpaaren. Farbe ist das schwächste Wiedererkennungsmerkmal, dein Gesicht das stärkste.</div></section>
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
    F("portrait", "Portrait, freigestellt", "UNIO", e.foto === "fertig" ? (b.portrait ? "Aus Foto-Termin" : "Monogramm, bis Portrait da ist") : "", "Foto-Termin und Zuschnitt", true),
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
  if (!b.fertig) return <Leer titel="Kommt nach deinem Branding." text="Farben, Schrift, Logo und Headline kommen aus deiner Marke. Sobald das Branding freigegeben ist, füllt sich die Seite zu großen Teilen von selbst." aktion={<Btn onClick={() => setSub("design")}>Zum Branding</Btn>} />;
  const pflichtOffen = felder.filter((f) => f.pflicht && !f.wert);
  const gefuellt = felder.filter((f) => f.wert).length;
  const status = web.status || "entwurf";
  return <div>
    <Kopf ueber="Marke · 5 · Website" titel="Deine Website füllt sich selbst." text={`${gefuellt} von ${felder.length} Feldern sind schon da. Was fehlt, ist markiert. Die Seite läuft auf einem der sechs UNIO-Looks.`}
      rechts={status === "live" ? <span className="hm-ez z-fertig">Live auf {felder.find((f) => f.id === "domain").wert}</span> : status === "pruefung" ? (teamSicht ? <Btn onClick={() => { set({ status: "live" }); hmEvent(m.id, "website", "Website live geschaltet", "Daniel"); toast("Live"); }}>Live schalten</Btn> : <span className="hm-ez z-wartet_team">In Prüfung bei Daniel</span>) : <Btn disabled={pflichtOffen.length > 0} onClick={() => { set({ status: "pruefung" }); hmEvent(m.id, "website", "Website zur Prüfung gesendet", m.name); toast("An Daniel zur Prüfung"); }}>{pflichtOffen.length ? `Noch ${pflichtOffen.length} Pflichtfelder` : "Zur Prüfung senden"}</Btn>} />
    <div className="hm-ablauf">{[["1", "Automatisch", "Name, Kontakt, Portrait, Objekte, Region kommen aus UNIO."], ["2", "Aus der Marke", "Farbe, Schrift, Logo, Headline und Story aus deinem Branding."], ["3", "Von dir", "Referenzen, Termin-Link und Impressum, einmal eingetragen."], ["4", "Prüfung und live", "Daniel prüft, dann läuft die Seite auf deiner Domain."]].map(([n, t, s]) => <div key={n}><i>{n}</i><div className="t">{t}</div><div className="s">{s}</div></div>)}</div>
    <div className="hm-mono" style={{ marginTop: 28, marginBottom: 10 }}>Look</div>
    <div className="hm-looks">{HM_LOOKS.map((l) => <button key={l.n} className={look === l.n ? "on" : ""} onClick={() => set({ look: l.n })}><img src={l.bild} alt="" /><div className="t">{String(l.n).padStart(2, "0")} {l.name}</div><div className="s">{l.satz}</div></button>)}</div>
    <div className="hm-row" style={{ marginTop: 8 }}><a className="hm-chip" href={`/showcase${look}`} target="_blank" rel="noopener">Look {look} als Beispiel öffnen ↗</a></div>
    <div className="hm-web-split">
      <div className="hm-web-felder">
        {Object.entries(HM_WEB_GRUPPEN).map(([g, [titel, text]]) => <div key={g} className="hm-card" style={{ marginBottom: 12 }}>
          <div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-h hm-h3">{titel}</div><span className="hm-mono">{felder.filter((f) => f.gruppe === g && f.wert).length} / {felder.filter((f) => f.gruppe === g).length}</span></div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", margin: "4px 0 8px" }}>{text}</div>
          {felder.filter((f) => f.gruppe === g).map((f) => <div key={f.id} className={"hm-wfeld" + (!f.wert && f.pflicht ? " fehlt" : "")}>
            {edit === f.id ? <input autoFocus defaultValue={f.wert} onBlur={(e) => { setF(f.id, e.target.value); setEdit(null); }} onKeyDown={(e) => e.key === "Enter" && e.target.blur()} /> : <button onClick={() => setEdit(f.id)}><span className="l">{f.label}{f.pflicht ? " *" : ""}</span><span className="v">{f.wert || "Fehlt"}</span><span className="q">{f.eigen ? "Von dir geändert" : f.quelle}</span></button>}
          </div>)}
        </div>)}
      </div>
      <div className="hm-web-vorschau"><WebVorschau m={m} b={b} felder={felder} look={look} /></div>
    </div>
  </div>;
}

function WebVorschau({ m, b, felder, look }) {
  const F = Object.fromEntries(felder.map((f) => [f.id, f.wert]));
  const objekte = [["Das Albrecht", "Wieden · 1040", "ab 590.000 €", "72 m²", "3", "albrechts-wohnen.jpg"], ["Beheimgasse", "Hernals · 1170", "468.000 €", "64 m²", "2", "beheim.jpg"], ["Oben Zwei", "Leopoldstadt · 1020", "1.190.000 €", "118 m²", "4", "obenzwei-terrasse.jpg"]];
  const hell = look === 3;
  const grund = hell ? "#FFFFFF" : "#F7F5F1";
  return <div className="hm-web" style={{ background: grund, fontFamily: hmFont(b.schrift.t), "--akz": b.akzent }}>
    <div className="hm-web-nav"><BrandLogo b={b} h={16} /><div className="hm-row" style={{ gap: 12, fontSize: 10 }}><span>Objekte</span><span>Verkaufen</span><span>Referenzen</span><span className="cta">Erstgespräch</span></div></div>
    <div className={"hm-web-hero l" + look}>
      {(look === 2 || look === 4) && <img className="obj" src="../../assets/img/albrechts-fassade.jpg" alt="" />}
      <div className="txt">
        <div className="hm-mono" style={{ color: b.akzent }}>Immobilienvermittlung · {F.region || "Wien"}</div>
        <div className="name" style={{ fontFamily: hmFont(b.schrift.d) }}>{look === 6 ? b.nach : `${b.vor} ${b.nach}`}</div>
        <div className="hl" style={{ fontFamily: hmFont(b.schrift.d) }}>{F.headline}</div>
        <div className="hm-row" style={{ gap: 6, marginTop: 10 }}><span className="cta">Immobilie bewerten</span><span className="cta2">Objekte</span></div>
        <div className="stats">{(F.stats || "").split(" · ").map((x) => <span key={x}>{x}</span>)}</div>
      </div>
      <div className="por">{b.portrait ? <img src={b.portrait} alt="" /> : <div className="mono" style={{ background: b.akzent }}>{b.initialen}</div>}</div>
    </div>
    {F.zitat && <div className="hm-web-zitat" style={{ fontFamily: hmFont(b.schrift.d) }}>„{F.zitat}“<div className="bio">{F.bio}</div></div>}
    <div className="hm-web-sek"><div className="h" style={{ fontFamily: hmFont(b.schrift.d) }}>Ausgewählte Objekte</div><div className="hm-web-obj">{objekte.map(([t, l, p, q, z, img]) => <div key={t}><img src={"../../assets/img/" + img} alt="" /><div className="t">{t}</div><div className="s">{l}</div><div className="s"><b>{p}</b> · {q} · {z} Zi.</div></div>)}</div></div>
    <div className="hm-web-sek"><div className="h" style={{ fontFamily: hmFont(b.schrift.d) }}>Referenzen</div>{F.referenzen ? <div className="hm-web-ref">{F.referenzen}</div> : <div className="hm-web-fehlt">Referenzen fehlen noch</div>}</div>
    <div className="hm-web-unio">Ein Fundament, das trägt · powered by UNIO</div>
    <div className="hm-web-fuss"><div><BrandLogo b={b} h={14} /><div>{F.adresse}</div></div><div>{F.tel || <span className="hm-web-fehlt">Telefon</span>}<br />{F.mail}<br />{F.instagram}</div><div>Impressum: {F.firma || <span className="hm-web-fehlt">Firma</span>} · GISA {F.gisa || <span className="hm-web-fehlt">fehlt</span>}</div></div>
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
    <Kopf ueber="Marke · Brand-Kit" titel="Alles zum Mitnehmen." text={b.fertig ? "Freigegeben. Logos als SVG, Farben mit Code, Schriften und die Vorlagen, mit denen wir produzieren." : "Entwurf. Nach der Freigabe ist das Kit verbindlich."} />
    <div className="hm-kacheln" style={{ marginTop: 22 }}>{HM_LOGO_TYPEN.map((t) => <div key={t.id} className="hm-kachel" data-logo={t.id} style={{ cursor: "default" }}><div style={{ minHeight: 70, display: "grid", placeItems: "center", width: "100%" }}><BrandLogo b={b} typ={t.id} h={t.id === "monogramm" ? 60 : 30} /></div><div className="t">{t.name}{b.logo === t.id ? " · Hauptlogo" : ""}</div><button className="hm-chip" onClick={() => svg(t.id)}>SVG laden</button></div>)}</div>
    <div className="hm-mono" style={{ marginTop: 26, marginBottom: 10 }}>Farben</div>
    <div className="hm-palette">{palette.map(([n, h]) => <div key={n}><i style={{ background: h }}></i><div className="t">{n}</div><Kopieren text={h} /></div>)}</div>
    <div className="hm-mono" style={{ marginTop: 26, marginBottom: 10 }}>Schriften · {b.schrift.name}</div>
    <div className="hm-card"><div style={{ fontFamily: hmFont(b.schrift.d), fontSize: 40, letterSpacing: "-.02em", color: "var(--ink)" }}>{b.schrift.d}</div><div style={{ fontFamily: hmFont(b.schrift.t), fontSize: 16, marginTop: 6 }}>{b.schrift.t} für Fließtext und Daten. Beide frei über Google Fonts verfügbar.</div></div>
    <div className="hm-mono" style={{ marginTop: 26, marginBottom: 10 }}>Vorlagen im Einsatz</div>
    <div className="hm-list">{vorlagen.map((v) => <Zeile key={v.id} titel={v.name} unter={`${v.woerter} Wörter`} />)}</div>
  </div>;
}

Object.assign(window, { Marke, Material, Studio, Website, WebVorschau, BrandKit, hmWebFelder });
