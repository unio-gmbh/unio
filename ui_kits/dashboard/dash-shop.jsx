/* UNIO — Shop: Print & Werbemittel, Content à la carte (unio.lucida.at) und
   Makler-Homepage-Looks. Mehrstufig: Katalog -> Konfigurator (Live-Vorschau
   mit Maklerbild/Partner-Logo/Format) -> Warenkorb -> Bestellung.
   Alle Preise und Bestellungen sind Demo/Arbeitsstand. */

const SHOP_OBJ = [
  { id: "063", img: "../../assets/img/beheim.jpg", title: "Penthouse Beheim", price: "€ 1,70 Mio", addr: "Beheimgasse 5, 1170 Wien" },
  { id: "042", img: "../../assets/img/albrecht.jpg", title: "Das Albrecht — Haus 4", price: "€ 1,29 Mio", addr: "Hernalser Hauptstraße 132, 1170 Wien" },
  { id: "029", img: "../../assets/img/ecoluxe.jpg", title: "Villa Ecoluxe", price: "€ 2,40 Mio", addr: "Cobenzlgasse 42, 1190 Wien" },
  { id: "017", img: "../../assets/img/obenzwei.jpg", title: "ObenZwei — Dachgeschoss", price: "Auf Anfrage", addr: "Vorgartenstraße 128, 1020 Wien" },
];

const SHOP_MAKLER = { name: "Daniel Hayden", vorname: "Daniel", initials: "DH", mail: "daniel@unio.at", tel: "+43 670 198 84 48", foto: "../../assets/team/portrait-02.jpg", rolle: "UNIO CIRCLE · WIEN" };

/* Druck & Werbemittel: Optionen Maklerbild / Partner-Logo / Format / Menge */
const PRINT_PRODUKTE = [
  { id: "visitenkarten", name: "Visitenkarten", sub: "85 × 55 mm · beidseitig", ab: 39, mengen: [100, 250, 500], mengenPreis: { 100: 39, 250: 59, 500: 89 }, foto: true, partner: true, objekt: false },
  { id: "banner", name: "Banner", sub: "Mesh-Banner für Baustelle & Fassade", ab: 149, formate: [["200 × 100 cm", 149], ["300 × 150 cm", 219]], foto: true, partner: true, objekt: false },
  { id: "faltschild", name: "Faltschild", sub: "Beidseitig · wetterfest", ab: 189, formate: [["A1", 189], ["A0", 249]], foto: true, partner: true, objekt: false },
  { id: "plakat", name: "Objekt-Plakat", sub: "Schaufenster & Aushang", ab: 89, formate: [["A1", 89], ["A0", 129]], foto: false, partner: true, objekt: true },
  { id: "faltmappe", name: "Faltmappe", sub: "Exposé-Mappe · A4 mit Steckfach", ab: 249, mengen: [50, 100, 250], mengenPreis: { 50: 249, 100: 349, 250: 590 }, foto: false, partner: true, objekt: false },
];

/* Content à la carte: Angebot von unio.lucida.at */
const CONTENT_ABO = { id: "personal-brand", name: "Personal Brand", preis: 599, einheit: "/ Monat · monatlich kündbar", claim: "Werde der Makler, den man kennt.", leistungen: ["Individuelle Marketingstrategie", "3 Kurzvideos / Monat (Reels)", "7 Grafikbeiträge / Monat", "10 professionelle Fotos / Monat", "Produktion, Planung & Schnitt inklusive"] };
const CONTENT_LEISTUNGEN = [
  { id: "immoreel", name: "Immoreel", inhalt: "Immobilienreel bis zu 60 Sekunden", preis: 599, objekt: true, beliebt: true },
  { id: "drohnenvideo", name: "Drohnenvideo", inhalt: "Bis zu 30 Sekunden Luftvideo", preis: 349, objekt: true },
  { id: "fotoshooting", name: "Fotoshooting", inhalt: "Bis zu 15 Fotos · Out- & Indoor", preis: 249, objekt: true },
  { id: "drohnenfotos", name: "Drohnenfotos", inhalt: "5 bis 10 bearbeitete Luftaufnahmen", preis: 249, objekt: true },
  { id: "walkthrough", name: "Walkthrough", inhalt: "Stabilisierter Rundgang · 60 Sekunden", preis: 149, objekt: true },
  { id: "ai-reel", name: "AI-Immobilienreel", inhalt: "AI-Reel aus Renderings oder Fotos", preis: 99, objekt: true },
];

const SHOP_LOOKS = [1, 2, 3, 4, 5, 6].map((n) => ({ n, img: "../../assets/img/shop-look-" + n + ".jpg", href: "/showcase" + n }));
const LOOK_PREIS = 1999;

const HISTORIE = [
  ["12.08.2026", "Faltschild · A1 · Mit Bild", "Persönlich", "1", "€ 189", "druck", "Im Druck"],
  ["04.08.2026", "Visitenkarten · 250 Stk.", "Persönlich", "250", "€ 59", "bestellt", "Bestellt"],
  ["21.07.2026", "Immoreel", "Villa Ecoluxe", "1", "€ 599", "geliefert", "Geliefert"],
  ["06.07.2026", "Objekt-Plakat · A0", "Penthouse Beheim", "2", "€ 258", "geliefert", "Geliefert"],
];

/* Programme, Listing-Kampagnen und Leads (aus dem UNIO Angebots- und Prozess-Dokument) */
const PROGRAMME = [
  { id: "basic", name: "Basic", preis: null, preisLabel: "Im Community-Abo", einheit: "inkludiert", claim: "Selbst machen, mit System.",
    punkte: ["Zugriff auf die UNIO Content-Datenbank", "Templates und Playbooks für Social Media", "Academy-Zugang einzeln: € 490"] },
  { id: "standard", name: "Standard", preis: 599, einheit: "/ Monat", beliebt: true, claim: "Dein Content, laufend produziert.",
    punkte: ["3 Kurzvideos pro Monat (Reels)", "7 Grafikbeiträge pro Monat", "10 professionelle Fotos pro Monat", "Planung, Produktion und Schnitt inklusive"] },
  { id: "premium", name: "Premium", preis: 1190, einheit: "/ Monat · ab 6 Monaten", claim: "Volle Sichtbarkeit, priorisiert.",
    punkte: ["Monatliche Vor-Ort-Session", "5 Kurzvideos und 15 Fotos pro Monat", "Priorisierter Schnitt und Ads-Betreuung", "Quartals-Strategiecall"] },
];
const LISTING = [
  { id: "boost", name: "Listing Boost", preis: 390, budget: "Ad-Budget ab € 300", dauer: "14 Tage Laufzeit",
    punkte: ["Kampagnen-Setup Meta", "Zielgruppen aus UNIO-Daten", "Reporting am Ende der Laufzeit"] },
  { id: "performance", name: "Listing Performance", preis: 790, budget: "Ad-Budget ab € 600", dauer: "30 Tage Laufzeit", beliebt: true,
    punkte: ["Meta- und Google-Kampagnen", "Landingpage automatisch aus NOVA", "Wöchentliches Reporting"] },
  { id: "lpremium", name: "Listing Premium", preis: 1490, budget: "Ad-Budget ab € 1.000", dauer: "45 Tage Laufzeit",
    punkte: ["Vor-Ort-Dreh inklusive", "Meta, Google und YouTube", "Dediziertes Reporting-Dashboard"] },
];
const LEADS = [
  { id: "kl", name: "Käufer-Lead", preis: 50, sub: "Roh · aus deiner Region" },
  { id: "klt", name: "Käufer-Lead mit Termin", preis: 350, sub: "Qualifiziert · Termin fixiert", beliebt: true },
  { id: "al", name: "Abgeber-Lead", preis: 129, sub: "Roh · verkaufswillige Eigentümer" },
  { id: "alt", name: "Abgeber-Lead mit Termin", preis: 690, sub: "Qualifiziert · Termin fixiert" },
];

/* Aufträge mit Prozess: die Agentur liefert direkt in die Software, Korrekturen laufen als Schleifen */
const AUFTRAG_STEPS = ["Briefing", "Termin", "Produktion", "Ergebnis", "Korrektur", "Freigabe"];
const AUFTRAEGE = [
  { id: "A-2435", datum: "14.08.2026", name: "Fotoshooting", objekt: "Das Albrecht · Top 12", preis: 249, step: 1, status: "Termin offen", tone: "hot",
    agentur: ["Bis zu 15 bearbeitete Fotos, Out- und Indoor", "Farb-Look nach UNIO-Guide", "Lieferung 48 h nach dem Shooting"],
    dein: ["Zugang zum Objekt sicherstellen", "Objekt besenrein oder gestagt übergeben", "Ansprechperson vor Ort nennen"],
    termine: ["Di 19.08. · 09:00", "Mi 20.08. · 14:00", "Fr 22.08. · 10:30"], terminFix: null, ergebnisse: [], feedback: [] },
  { id: "A-2431", datum: "05.08.2026", name: "Immoreel", objekt: "Villa Ecoluxe", preis: 599, step: 3, status: "Ergebnis liegt vor", tone: "hot",
    agentur: ["Reel bis 60 Sekunden, 9:16", "Schnitt, Color Grading, Musik, Untertitel", "2 Korrekturschleifen inklusive"],
    dein: ["Wunsch-Musikrichtung nennen (erledigt)", "Logo-Animation freigeben (erledigt)"],
    termine: null, terminFix: "Dreh war am Mo 11.08. · 10:00",
    ergebnisse: [
      { v: 2, name: "Immoreel · Schnitt v2", typ: "video", src: "../../assets/video/explore-kling-c.mp4" },
      { v: 2, name: "Cover-Varianten", typ: "img", src: "../../assets/img/ecoluxe.jpg" },
    ],
    feedback: [{ von: "Du", datum: "12.08.", txt: "Intro 2 Sekunden kürzer, Preis-Einblendung erst am Ende.", status: "Umgesetzt in v2" }] },
  { id: "A-2427", datum: "28.07.2026", name: "Listing Performance", objekt: "Penthouse Beheim", preis: 1390, step: 2, status: "In Produktion", tone: "",
    agentur: ["Kampagnen-Setup Meta und Google", "Landingpage automatisch aus NOVA", "30 Tage Laufzeit, wöchentliches Reporting"],
    dein: ["Objektfotos freigeben (erledigt)", "Ad-Budget € 600 bestätigen (erledigt)"],
    termine: null, terminFix: "Go-live geplant: Mo 18.08.", ergebnisse: [], feedback: [] },
  { id: "A-2402", datum: "12.08.2026", name: "Faltschild · A1 · Mit Bild", objekt: "Persönlich", preis: 189, step: 5, status: "Freigegeben · im Druck", tone: "ok",
    agentur: ["Druck A1 auf Hohlkammerplatte", "Versand an deinen Bürostandort"],
    dein: [], termine: null, terminFix: null, ergebnisse: [], feedback: [] },
];

const eurS = (n) => "€ " + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ---------- Bausteine ---------- */

function FakeQR({ size = 44, light }) {
  /* deterministisches Pseudo-QR-Muster */
  const cells = [];
  for (let y = 0; y < 9; y++) for (let x = 0; x < 9; x++) {
    if ((x * 7 + y * 13 + x * y) % 3 === 0) cells.push([x, y]);
  }
  const c = light ? "#F7F5F1" : "#141210";
  return (
    <svg width={size} height={size} viewBox="0 0 9 9" aria-hidden="true" style={{ display: "block" }}>
      {cells.map(([x, y], i) => <rect key={i} x={x} y={y} width="1" height="1" fill={c} />)}
    </svg>
  );
}

function AmberBg({ children, style }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", background: "#FBFAF6", ...style }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(90% 75% at 50% 108%, rgba(255,170,9,.75) 0%, rgba(255,196,87,.4) 42%, rgba(251,250,246,0) 74%), radial-gradient(50% 40% at 82% 8%, rgba(255,208,126,.35), transparent 70%)" }}></div>
      <div style={{ position: "relative", height: "100%" }}>{children}</div>
    </div>
  );
}

function PartnerChip({ dark }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 9px", borderRadius: 4, boxShadow: "inset 0 0 0 1px " + (dark ? "rgba(20,18,16,.4)" : "rgba(20,18,16,.25)"), font: "600 7.5px var(--font-mono)", letterSpacing: "0.14em", color: "var(--ink-2)", background: "rgba(255,255,255,.6)" }}>
      <span style={{ width: 9, height: 9, background: "var(--ink)", borderRadius: 2 }}></span>PARTNER-LOGO
    </span>
  );
}

function MiniLogo({ partner }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
      <span style={{ font: "600 12px var(--font-display)", letterSpacing: "0.06em", color: "var(--ink)", display: "inline-flex", alignItems: "center", gap: 5 }}>
        <span aria-hidden="true" style={{ width: 11, height: 11, borderRadius: "50%", border: "2.5px solid var(--signal)", borderRightColor: "transparent", transform: "rotate(-45deg)", display: "inline-block" }}></span>
        UNIO{partner ? <span style={{ font: "500 8px var(--font-mono)", letterSpacing: "0.2em", color: "var(--text-muted)", marginLeft: 3 }}>PARTNER</span> : null}
      </span>
      {partner ? <PartnerChip /> : null}
    </div>
  );
}

/* Werbemittel-Vorschau: rendert Banner / Faltschild / Visitenkarte / Plakat / Faltmappe */
function ArtworkPreview({ produkt, withFoto, withPartner, obj, mini }) {
  const p = produkt;
  /* Katalog-Minis: hohe Formate staerker verkleinern, damit nichts abschneidet */
  const MINI_SCALE = { visitenkarten: 0.42, faltschild: 0.46, plakat: 0.44, faltmappe: 0.48, banner: 0.6 };
  const scale = mini ? (MINI_SCALE[p.id] || 0.6) : 1;
  if (p.id === "visitenkarten") {
    return (
      <AmberBg style={{ width: 250 * scale, aspectRatio: "55/85", borderRadius: 10, boxShadow: "0 24px 55px -22px rgba(11,10,9,.4), inset 0 0 0 1px var(--hairline-dark)" }}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 0 }}>
          <div style={{ flex: 1.35, position: "relative", overflow: "hidden" }}>
            {withFoto
              ? <img src={SHOP_MAKLER.foto} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 18%" }} />
              : <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}><span style={{ font: "600 " + 26 * scale + "px var(--font-display)", letterSpacing: "0.04em", color: "var(--ink)" }}>UNIO<span style={{ color: "var(--signal)" }}>.</span></span></div>}
            {withPartner && <span style={{ position: "absolute", right: 8, top: 8 }}><PartnerChip /></span>}
          </div>
          <div style={{ background: "#FFFFFF", padding: (mini ? "10px 12px" : "16px 18px"), display: "flex", justifyContent: "space-between", gap: 8 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ font: "600 " + 15 * scale + "px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)", whiteSpace: "nowrap" }}>{SHOP_MAKLER.name}</div>
              <div style={{ font: 8 * scale + "px var(--font-mono)", color: "var(--text-muted)", lineHeight: 1.8, marginTop: 4 }}>{SHOP_MAKLER.mail}<br />{SHOP_MAKLER.tel}<br />www.unio.at</div>
            </div>
            <FakeQR size={34 * scale} />
          </div>
        </div>
      </AmberBg>
    );
  }
  if (p.id === "plakat") {
    const o = obj || SHOP_OBJ[0];
    return (
      <div style={{ width: 300 * scale, aspectRatio: "1/1.41", background: "#FBFAF6", borderRadius: 10, boxShadow: "0 24px 55px -22px rgba(11,10,9,.4), inset 0 0 0 1px var(--hairline-dark)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <img src={o.img} alt="" style={{ width: "100%", height: "52%", objectFit: "cover" }} />
        <div style={{ flex: 1, padding: mini ? "10px 12px" : "18px 20px", display: "flex", flexDirection: "column" }}>
          <div style={{ font: "600 " + 8 * scale + "px var(--font-mono)", letterSpacing: "0.22em", color: "var(--signal-deep)" }}>ZUM VERKAUF</div>
          <div style={{ font: "600 " + 17 * scale + "px/1.1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 7 }}>{o.title}</div>
          <div style={{ font: "600 " + 20 * scale + "px/1 var(--font-display)", color: "var(--ink)", marginTop: 8 }}>{o.price}</div>
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 8 }}>
            <MiniLogo partner={withPartner} />
            <FakeQR size={30 * scale} />
          </div>
        </div>
      </div>
    );
  }
  if (p.id === "faltmappe") {
    return (
      <AmberBg style={{ width: 290 * scale, aspectRatio: "1/1.3", borderRadius: 8, boxShadow: "0 24px 55px -22px rgba(11,10,9,.4), inset 0 0 0 1px var(--hairline-dark)" }}>
        <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: mini ? "12px 14px" : "20px 22px" }}>
          <MiniLogo partner={withPartner} />
          <div style={{ marginTop: "auto" }}>
            <div style={{ font: "700 " + 26 * scale + "px/1.02 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>MOVE<br />AS ONE<span style={{ color: "var(--signal)" }}>.</span></div>
            <div style={{ font: 7.5 * scale + "px var(--font-mono)", letterSpacing: "0.14em", color: "var(--ink-2)", marginTop: 10 }}>UNIO · KÄRNTNER STRASSE 12 · 1010 WIEN</div>
          </div>
        </div>
      </AmberBg>
    );
  }
  /* Banner (quer) & Faltschild (hochkant): "Neugierig? Besichtige mich!" */
  const quer = p.id === "banner";
  return (
    <AmberBg style={{ width: (quer ? 480 : 280) * scale, aspectRatio: quer ? "2/1" : "1/1.41", borderRadius: 8, boxShadow: "0 24px 55px -22px rgba(11,10,9,.4), inset 0 0 0 1px var(--hairline-dark)" }}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: mini ? "10px 13px" : "18px 20px" }}>
        <MiniLogo partner={withPartner} />
        <div style={{ marginTop: quer ? 8 : 14 }}>
          <div style={{ font: "400 " + (quer ? 19 : 17) * scale + "px/1.14 var(--font-display)", color: "var(--ink)" }}>Neugierig?</div>
          <div style={{ font: "700 " + (quer ? 21 : 19) * scale + "px/1.14 var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>Besichtige mich!</div>
          <div style={{ font: "400 " + (quer ? 15 : 14) * scale + "px var(--font-display)", color: "var(--ink-2)", marginTop: 6 }}>{SHOP_MAKLER.tel}</div>
        </div>
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {withFoto && <img src={SHOP_MAKLER.foto} alt="" style={{ width: 34 * scale, height: 34 * scale, borderRadius: "50%", objectFit: "cover", objectPosition: "center 18%", boxShadow: "0 0 0 2px #FBFAF6" }} />}
            <div>
              <div style={{ font: "600 " + 11 * scale + "px var(--font-display)", color: "var(--ink)" }}>{SHOP_MAKLER.name}</div>
              <div style={{ font: 7 * scale + "px var(--font-mono)", letterSpacing: "0.1em", color: "var(--ink-2)", marginTop: 2 }}>{SHOP_MAKLER.mail} · www.unio.at</div>
            </div>
          </div>
          <FakeQR size={30 * scale} />
        </div>
      </div>
    </AmberBg>
  );
}

/* ---------- Konfigurator (Stufe 2) ---------- */

function OptRow({ label, children }) {
  return (
    <div style={{ padding: "16px 0", borderBottom: "1px solid var(--card-line, var(--hairline-dark))" }}>
      <span className="u-label" style={{ display: "block", fontSize: 9, color: "var(--text-muted)", marginBottom: 10 }}>{label}</span>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{children}</div>
    </div>
  );
}

function OptPill({ on, onClick, children }) {
  return (
    <button type="button" onClick={onClick} style={{ font: "500 13px var(--font-display)", fontFamily: "inherit", cursor: "pointer", padding: "9px 16px", borderRadius: 999, border: "none", background: on ? "var(--ink)" : "transparent", color: on ? "var(--paper)" : "var(--text-muted)", boxShadow: on ? "none" : "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", transition: "all .25s var(--ease-unio)" }}>{children}</button>
  );
}

function PrintKonfigurator({ produkt, onBack, onAdd }) {
  const p = produkt;
  const [withFoto, setWithFoto] = React.useState(p.foto);
  const [withPartner, setWithPartner] = React.useState(false);
  const [format, setFormat] = React.useState(p.formate ? p.formate[0][0] : null);
  const [menge, setMenge] = React.useState(p.mengen ? p.mengen[0] : 1);
  const [objId, setObjId] = React.useState(SHOP_OBJ[0].id);
  const obj = SHOP_OBJ.find((o) => o.id === objId);
  const basis = p.formate ? p.formate.find((f) => f[0] === format)[1] : (p.mengenPreis ? p.mengenPreis[menge] : p.ab);
  const stueck = p.formate ? menge : 1;
  const preis = p.formate ? basis * menge : basis;
  return (
    <div style={{ maxWidth: 1360, margin: "0 auto" }}>
      <button onClick={onBack} style={{ marginTop: 34, background: "none", border: "none", cursor: "pointer", font: "500 14px var(--font-display)", fontFamily: "inherit", color: "var(--text-muted)", padding: 0 }}>← Zurück zum Shop</button>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)", gap: 40, marginTop: 26, alignItems: "start" }}>
        {/* Live-Vorschau */}
        <div style={{ background: "var(--card-bg, #FFFFFF)", borderRadius: 18, boxShadow: "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", minHeight: 520, display: "grid", placeItems: "center", padding: 40, position: "relative" }}>
          <span className="u-label" style={{ position: "absolute", left: 20, top: 18, fontSize: 9, color: "var(--text-muted)" }}>LIVE-VORSCHAU · {p.name.toUpperCase()}</span>
          <ArtworkPreview produkt={p} withFoto={withFoto} withPartner={withPartner} obj={obj} />
          <span className="u-label" style={{ position: "absolute", right: 20, bottom: 16, fontSize: 8.5, color: "var(--text-muted)" }}>MOTIV AKTUALISIERT SICH LIVE</span>
        </div>
        {/* Optionen */}
        <div>
          <h1 style={{ margin: 0, font: "500 clamp(28px, 2.6vw, 40px)/1.05 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>{p.name}<span style={{ color: "var(--signal)" }}>.</span></h1>
          <p style={{ margin: "10px 0 6px", font: "400 14.5px/1.6 var(--font-display)", color: "var(--text-muted)" }}>{p.sub}</p>
          {p.objekt && (
            <OptRow label="OBJEKT">
              {SHOP_OBJ.map((o) => <OptPill key={o.id} on={objId === o.id} onClick={() => setObjId(o.id)}>{o.title.split(" — ")[0]}</OptPill>)}
            </OptRow>
          )}
          {p.foto && (
            <OptRow label="MAKLERBILD">
              <OptPill on={withFoto} onClick={() => setWithFoto(true)}>Mit Bild</OptPill>
              <OptPill on={!withFoto} onClick={() => setWithFoto(false)}>Ohne Bild</OptPill>
            </OptRow>
          )}
          <OptRow label="PARTNER-LOGO">
            <OptPill on={!withPartner} onClick={() => setWithPartner(false)}>Ohne Partnerlogo</OptPill>
            <OptPill on={withPartner} onClick={() => setWithPartner(true)}>Mit Partnerlogo</OptPill>
          </OptRow>
          {p.formate && (
            <OptRow label="FORMAT">
              {p.formate.map(([f, pr]) => <OptPill key={f} on={format === f} onClick={() => setFormat(f)}>{f} · {eurS(pr)}</OptPill>)}
            </OptRow>
          )}
          <OptRow label="MENGE">
            {p.mengen
              ? p.mengen.map((m) => <OptPill key={m} on={menge === m} onClick={() => setMenge(m)}>{m} Stk. · {eurS(p.mengenPreis[m])}</OptPill>)
              : [1, 2, 3, 5].map((m) => <OptPill key={m} on={menge === m} onClick={() => setMenge(m)}>{m} Stk.</OptPill>)}
          </OptRow>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 24 }}>
            <div>
              <div style={{ font: "500 30px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{eurS(preis)}</div>
              <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>NETTO · INKL. DRUCKDATEN · ARBEITSSTAND</span>
            </div>
            <button onClick={() => onAdd({
              titel: p.name + (format ? " · " + format : "") + (p.mengen ? " · " + menge + " Stk." : ""),
              detail: [p.foto ? (withFoto ? "Mit Maklerbild" : "Ohne Maklerbild") : null, withPartner ? "Mit Partnerlogo" : "Ohne Partnerlogo", p.objekt ? obj.title : null].filter(Boolean).join(" · "),
              menge: stueck, preis,
            })} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "15px 26px", background: "var(--signal)", color: "#1A1305", font: "500 14.5px var(--font-display)", fontFamily: "inherit" }}>In den Warenkorb</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentKonfigurator({ leistung, onBack, onAdd }) {
  const l = leistung;
  const [objId, setObjId] = React.useState(SHOP_OBJ[0].id);
  const obj = SHOP_OBJ.find((o) => o.id === objId);
  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <button onClick={onBack} style={{ marginTop: 34, background: "none", border: "none", cursor: "pointer", font: "500 14px var(--font-display)", fontFamily: "inherit", color: "var(--text-muted)", padding: 0 }}>← Zurück zum Shop</button>
      <div style={{ background: "var(--card-bg, #FFFFFF)", borderRadius: 18, boxShadow: "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", padding: "34px 36px", marginTop: 26 }}>
        <span className="u-label" style={{ fontSize: 9, color: "var(--signal-deep)" }}>CONTENT · À LA CARTE</span>
        <h1 style={{ margin: "10px 0 0", font: "500 clamp(28px, 2.6vw, 40px)/1.05 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>{l.name}<span style={{ color: "var(--signal)" }}>.</span></h1>
        <p style={{ margin: "10px 0 0", font: "400 15px/1.6 var(--font-display)", color: "var(--text-muted)" }}>{l.inhalt}. Einzeln buchbar, ohne Abo. Dreh- bzw. Produktionstermin stimmen wir nach der Bestellung ab.</p>
        {l.objekt && (
          <OptRow label="FÜR WELCHES OBJEKT?">
            {SHOP_OBJ.map((o) => <OptPill key={o.id} on={objId === o.id} onClick={() => setObjId(o.id)}>{o.title.split(" — ")[0]}</OptPill>)}
          </OptRow>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 26 }}>
          <div>
            <div style={{ font: "500 30px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{eurS(l.preis)}</div>
            <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>NETTO · EINMALIG · ARBEITSSTAND</span>
          </div>
          <button onClick={() => onAdd({ titel: l.name, detail: l.objekt ? obj.title : "Persönlich", menge: 1, preis: l.preis })} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "15px 26px", background: "var(--signal)", color: "#1A1305", font: "500 14.5px var(--font-display)", fontFamily: "inherit" }}>In den Warenkorb</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Warenkorb (Drawer) ---------- */

function CartDrawer({ offen, onClose, items, onRemove, onOrder, ordered }) {
  const summe = items.reduce((s, i) => s + i.preis, 0);
  React.useEffect(() => {
    if (!offen) return;
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [offen]);
  return (
    <div aria-hidden={!offen} style={{ position: "fixed", inset: 0, zIndex: 120, pointerEvents: offen ? "auto" : "none" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(11,10,9,0.4)", opacity: offen ? 1 : 0, transition: "opacity 350ms var(--ease-unio)" }}></div>
      <aside role="dialog" aria-modal="true" aria-label="Warenkorb" style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "min(440px, 100vw)", background: "var(--paper)", boxShadow: "-30px 0 80px -30px rgba(11,10,9,0.5)", transform: offen ? "translateX(0)" : "translateX(105%)", transition: "transform 480ms var(--ease-unio)", display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid var(--hairline-dark)" }}>
          <span className="u-label" style={{ fontSize: 10, color: "var(--text-muted)" }}>WARENKORB · {items.length} {items.length === 1 ? "POSITION" : "POSITIONEN"}</span>
          <button onClick={onClose} aria-label="Schließen" style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--hairline-dark)", background: "var(--surface-raised)", cursor: "pointer", fontFamily: "inherit", color: "var(--ink)" }}>✕</button>
        </div>
        {ordered ? (
          <div style={{ padding: "52px 28px", textAlign: "center", display: "flex", flexDirection: "column", gap: 13, alignItems: "center" }}>
            <span style={{ display: "inline-flex", width: 56, height: 56, borderRadius: "50%", background: "var(--signal-soft)", color: "var(--signal-deep)", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m4 10.5 4 4 8-9"></path></svg>
            </span>
            <b style={{ font: "500 24px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Bestellung übermittelt.</b>
            <p style={{ margin: 0, font: "400 14px/1.6 var(--font-display)", color: "var(--text-muted)", maxWidth: 300 }}>Wir prüfen die Druckdaten und melden uns vor der Produktion. Den Status siehst du in der Bestellhistorie.</p>
          </div>
        ) : items.length === 0 ? (
          <div style={{ padding: "60px 28px", textAlign: "center" }}>
            <p style={{ margin: 0, font: "400 15px/1.6 var(--font-display)", color: "var(--text-muted)" }}>Noch nichts im Warenkorb.<br />Wähle links ein Produkt und konfiguriere es.</p>
          </div>
        ) : (
          <div style={{ padding: "20px 24px 28px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
            {items.map((it, i) => (
              <div key={i} style={{ background: "var(--surface-raised)", borderRadius: 14, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", padding: "14px 16px", display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ font: "500 14.5px var(--font-display)", color: "var(--ink)" }}>{it.titel}</div>
                  <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 5, lineHeight: 1.7 }}>{it.detail}</div>
                </div>
                <div style={{ textAlign: "right", flex: "none" }}>
                  <div style={{ font: "500 15px var(--font-display)", color: "var(--ink)" }}>{eurS(it.preis)}{it.abo ? <span style={{ font: "400 10px var(--font-display)", color: "var(--text-muted)" }}> /Monat</span> : null}</div>
                  <button onClick={() => onRemove(i)} style={{ marginTop: 6, background: "none", border: "none", cursor: "pointer", font: "400 11.5px var(--font-display)", fontFamily: "inherit", color: "var(--text-muted)", textDecoration: "underline", padding: 0 }}>Entfernen</button>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "auto", paddingTop: 18, borderTop: "1px solid var(--hairline-dark)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", font: "500 16px var(--font-display)", color: "var(--ink)" }}>
                <span>Summe (netto)</span><span style={{ fontVariantNumeric: "tabular-nums" }}>{eurS(summe)}</span>
              </div>
              <button onClick={onOrder} style={{ width: "100%", marginTop: 16, border: "none", cursor: "pointer", borderRadius: 999, padding: "15px 0", background: "var(--signal)", color: "#1A1305", font: "500 14.5px var(--font-display)", fontFamily: "inherit" }}>Bestellung absenden</button>
              <p className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 10, textAlign: "center" }}>DEMO · UNVERBINDLICH · PREISE ARBEITSSTAND</p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

/* ---------- Auftrags-Prozess: Stepper + Detail ---------- */
function AuftragStepper({ step }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", margin: "24px 0 4px", overflowX: "auto", paddingBottom: 6 }}>
      {AUFTRAG_STEPS.map((st, i) => (
        <React.Fragment key={st}>
          {i > 0 && <span style={{ flex: 1, minWidth: 16, height: 1.5, marginTop: 12, background: i <= step ? "var(--signal)" : "var(--hairline-dark)" }}></span>}
          <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, flex: "none", padding: "0 4px" }}>
            <span style={{ width: 25, height: 25, borderRadius: 99, display: "grid", placeItems: "center", font: "600 10px var(--font-mono)",
              background: i < step ? "var(--signal)" : i === step ? "var(--ink)" : "var(--card-bg, #FFFFFF)",
              color: i < step ? "#1A1305" : i === step ? "var(--paper)" : "var(--text-muted)",
              boxShadow: i > step ? "inset 0 0 0 1px var(--hairline-dark)" : "none" }}>{i < step ? "✓" : i + 1}</span>
            <span className="u-label" style={{ fontSize: 7.5, color: i === step ? "var(--ink)" : "var(--text-muted)", whiteSpace: "nowrap" }}>{st.toUpperCase()}</span>
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

function AuftragDetail({ auftrag, onBack }) {
  const { Reveal: Rv, RevealL: RvL } = window;
  const a = auftrag;
  const [step, setStep] = React.useState(a.step);
  const [termin, setTermin] = React.useState(a.terminFix);
  const [fb, setFb] = React.useState(a.feedback);
  const [fbText, setFbText] = React.useState("");
  const [frei, setFrei] = React.useState(a.step >= 5);
  const waehleTermin = (t) => { setTermin(t + " · bestätigt"); setStep((x) => Math.max(x, 2)); };
  const sendeFeedback = () => {
    const t = fbText.trim(); if (!t) return;
    setFb((f) => [...f, { von: "Du", datum: "Heute", txt: t, status: "Bei der Agentur" }]);
    setFbText(""); setStep(4);
  };
  const karte = { background: "var(--card-bg, #FFFFFF)", borderRadius: 16, boxShadow: "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", padding: "20px 22px" };
  const h3 = { margin: "0 0 13px", font: "500 15.5px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" };
  const li = { display: "flex", gap: 9, alignItems: "baseline", font: "400 13.5px/1.55 var(--font-display)", color: "var(--ink-2)", marginTop: 7 };
  const pillStil = (tone) => ({ fontSize: 8.5, padding: "5px 11px", borderRadius: 99,
    background: tone === "ok" ? "rgba(46,125,70,.1)" : tone === "hot" ? "var(--signal-soft)" : "var(--paper-2)",
    color: tone === "ok" ? "#2E7D46" : tone === "hot" ? "var(--signal-deep)" : "var(--text-muted)" });
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto" }}>
      <RvL style={{ marginTop: 36 }}>
        <button onClick={onBack} style={{ border: "none", background: "none", cursor: "pointer", font: "500 13.5px var(--font-display)", fontFamily: "inherit", color: "var(--text-muted)", padding: 0 }}>← Alle Aufträge</button>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 14, flexWrap: "wrap", marginTop: 14 }}>
          <div>
            <span className="u-label" style={{ fontSize: 9, color: "var(--signal-deep)" }}>{a.id} · BESTELLT {a.datum}</span>
            <h1 style={{ margin: "6px 0 0", font: "500 clamp(28px, 3vw, 40px)/1.05 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>{a.name}</h1>
            <p style={{ margin: "8px 0 0", font: "400 14.5px var(--font-display)", color: "var(--text-muted)" }}>{a.objekt} · {eurS(a.preis)}</p>
          </div>
          <span className="u-label" style={pillStil(frei ? "ok" : a.tone)}>{(frei ? "Freigegeben" : a.status).toUpperCase()}</span>
        </div>
        <AuftragStepper step={frei ? 5 : step} />
      </RvL>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, marginTop: 26, alignItems: "start" }}>
        <div style={{ display: "grid", gap: 16 }}>
          <Rv><div style={karte}>
            <h3 style={h3}>Das liefert die Agentur</h3>
            {a.agentur.map((x) => <div key={x} style={li}><span style={{ color: "var(--signal-deep)" }}>✓</span>{x}</div>)}
          </div></Rv>
          {a.dein.length > 0 && <Rv delay={60}><div style={karte}>
            <h3 style={h3}>Dein Part</h3>
            {a.dein.map((x) => <div key={x} style={li}><span style={{ color: x.includes("erledigt") ? "#2E7D46" : "var(--text-muted)" }}>{x.includes("erledigt") ? "✓" : "○"}</span>{x}</div>)}
          </div></Rv>}
          {(a.termine || termin) && <Rv delay={100}><div style={karte}>
            <h3 style={h3}>Termin</h3>
            {termin ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <b style={{ font: "500 15px var(--font-display)", color: "var(--ink)" }}>{termin}</b>
                <span className="u-label" style={pillStil("ok")}>FIXIERT</span>
              </div>
            ) : (
              <React.Fragment>
                <p style={{ margin: "0 0 12px", font: "400 13.5px/1.55 var(--font-display)", color: "var(--text-muted)" }}>Die Agentur hat drei Slots vorgeschlagen. Wähle einen, der Rest läuft automatisch.</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {a.termine.map((t) => (
                    <button key={t} onClick={() => waehleTermin(t)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "11px 17px", background: "var(--paper-2)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "500 13px var(--font-display)", fontFamily: "inherit", color: "var(--ink)" }}>{t}</button>
                  ))}
                </div>
              </React.Fragment>
            )}
          </div></Rv>}
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          <Rv delay={80}><div style={karte}>
            <h3 style={h3}>Ergebnisse</h3>
            {a.ergebnisse.length === 0 ? (
              <p style={{ margin: 0, font: "400 13.5px/1.6 var(--font-display)", color: "var(--text-muted)" }}>Noch nichts eingespielt. Die Agentur lädt Ergebnisse direkt hier hoch, du bekommst eine Benachrichtigung.</p>
            ) : a.ergebnisse.map((e) => (
              <div key={e.name} style={{ borderRadius: 13, overflow: "hidden", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", marginBottom: 12 }}>
                {e.typ === "video"
                  ? <video src={e.src} muted loop playsInline autoPlay style={{ display: "block", width: "100%", maxHeight: 250, objectFit: "cover" }}></video>
                  : <img src={e.src} alt="" style={{ display: "block", width: "100%", maxHeight: 180, objectFit: "cover" }} />}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "11px 14px" }}>
                  <span style={{ font: "500 13.5px var(--font-display)", color: "var(--ink)" }}>{e.name}</span>
                  <span className="u-label" style={{ fontSize: 8, color: "var(--text-muted)" }}>VERSION {e.v}</span>
                </div>
              </div>
            ))}
            {a.ergebnisse.length > 0 && !frei && (
              <React.Fragment>
                <div style={{ display: "flex", gap: 9, marginTop: 4 }}>
                  <button onClick={() => setFrei(true)} style={{ flex: 1, border: "none", cursor: "pointer", borderRadius: 999, padding: "13px 0", background: "var(--signal)", color: "#1A1305", font: "500 13.5px var(--font-display)", fontFamily: "inherit" }}>Freigeben</button>
                </div>
                <div style={{ marginTop: 14 }}>
                  <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>ODER KORREKTUR ANFORDERN</span>
                  <textarea value={fbText} onChange={(e) => setFbText(e.target.value)} rows={3} placeholder="Was soll die Agentur ändern?"
                    style={{ width: "100%", marginTop: 8, border: "none", outline: "none", resize: "vertical", background: "var(--paper-2)", borderRadius: 12, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", padding: "12px 14px", font: "400 13.5px/1.55 var(--font-display)", fontFamily: "inherit", color: "var(--ink)", boxSizing: "border-box" }}></textarea>
                  <button onClick={sendeFeedback} style={{ marginTop: 9, border: "none", cursor: "pointer", borderRadius: 999, padding: "11px 20px", background: "var(--ink)", color: "var(--paper)", font: "500 13px var(--font-display)", fontFamily: "inherit" }}>Korrektur senden</button>
                </div>
              </React.Fragment>
            )}
            {frei && a.ergebnisse.length > 0 && (
              <p style={{ margin: "4px 0 0", font: "400 13.5px var(--font-display)", color: "#2E7D46" }}>✓ Freigegeben. Die finalen Dateien liegen in deiner Objekt-Mediathek.</p>
            )}
          </div></Rv>
          {fb.length > 0 && <Rv delay={120}><div style={karte}>
            <h3 style={h3}>Korrekturschleifen</h3>
            {fb.map((f, i) => (
              <div key={i} style={{ padding: "12px 0", borderTop: i > 0 ? "1px solid var(--hairline-dark)" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 5 }}>
                  <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{f.von.toUpperCase()} · {f.datum}</span>
                  <span className="u-label" style={pillStil(f.status.startsWith("Umgesetzt") ? "ok" : "hot")}>{f.status.toUpperCase()}</span>
                </div>
                <p style={{ margin: 0, font: "400 13.5px/1.55 var(--font-display)", color: "var(--ink-2)" }}>{f.txt}</p>
              </div>
            ))}
          </div></Rv>}
        </div>
      </div>
      <p className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", margin: "20px 0 40px" }}>DEMO-ANSICHT · PROZESS UND INHALTE ARBEITSSTAND</p>
    </div>
  );
}

/* ---------- Shop (Stufe 1: Katalog) ---------- */

function ShopKarte({ onOpen, children, name, meta, preis, delay, beliebt }) {
  const { Reveal: Rv } = window;
  const [hov, setHov] = React.useState(false);
  return (
    <Rv delay={delay}>
      <button onClick={onOpen} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ display: "flex", flexDirection: "column", width: "100%", textAlign: "left", border: "none", cursor: "pointer", fontFamily: "inherit", background: "var(--card-bg, #FFFFFF)", borderRadius: 18, boxShadow: hov ? "inset 0 0 0 1px var(--card-line, var(--hairline-dark)), 0 18px 40px -20px rgba(11,10,9,.25)" : "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", padding: 0, overflow: "hidden", transition: "box-shadow .3s var(--ease-unio), translate .3s var(--ease-unio)", translate: hov ? "0 -3px" : "0 0" }}>
        <div style={{ width: "100%", height: 190, display: "grid", placeItems: "center", background: "var(--paper-2)", position: "relative", overflow: "hidden" }}>
          {beliebt && <span className="u-label" style={{ position: "absolute", left: 12, top: 12, fontSize: 8, color: "var(--signal-deep)", background: "var(--signal-soft)", padding: "4px 9px", borderRadius: 99 }}>BELIEBT</span>}
          <div>{children}</div>
        </div>
        <div style={{ padding: "16px 18px 18px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 10 }}>
          <div>
            <div style={{ font: "500 17px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>{name}</div>
            <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 5 }}>{meta}</div>
          </div>
          <span style={{ font: "500 13.5px var(--font-display)", color: hov ? "var(--signal-deep)" : "var(--text-muted)", whiteSpace: "nowrap", transition: "color .25s" }}>{preis} →</span>
        </div>
      </button>
    </Rv>
  );
}

/* ---------- Homepage-Editor: Textbausteine, Fotos, Kontakt ---------- */
const LOOK_FOTOS = ["../../assets/team/portrait-01.jpg", "../../assets/team/portrait-02.jpg", "../../assets/team/portrait-03.jpg", "../../assets/team/portrait-04.jpg"];
const LOOK_DEFAULTS = { headline: "Immobilien, persönlich verkauft.", intro: "Seit über 10 Jahren begleite ich Eigentümer:innen durch den Verkauf, mit Strategie, Sichtbarkeit und persönlicher Begleitung.", region: "Wien & Umgebung", tel: SHOP_MAKLER.tel, mail: SHOP_MAKLER.mail, foto: LOOK_FOTOS[1] };

function LookFeld({ label, value, onChange, area }) {
  const stil = { width: "100%", border: "none", outline: "none", background: "var(--surface-raised)", borderRadius: 12, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", padding: "12px 14px", font: "400 14px/1.5 var(--font-display)", fontFamily: "inherit", color: "var(--ink)", resize: "vertical" };
  return (
    <div>
      <span className="u-label" style={{ display: "block", fontSize: 9, color: "var(--text-muted)", marginBottom: 7 }}>{label}</span>
      {area ? <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} style={stil} /> : <input value={value} onChange={(e) => onChange(e.target.value)} style={stil} />}
    </div>
  );
}

function LookEditor({ offen, onClose, daten, onSave }) {
  const [d, setD] = React.useState(daten);
  React.useEffect(() => { if (offen) setD(daten); }, [offen]);
  React.useEffect(() => {
    if (!offen) return;
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [offen]);
  const set = (k) => (v) => setD((x) => ({ ...x, [k]: v }));
  return (
    <div aria-hidden={!offen} style={{ position: "fixed", inset: 0, zIndex: 120, pointerEvents: offen ? "auto" : "none" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(11,10,9,0.4)", opacity: offen ? 1 : 0, transition: "opacity 350ms var(--ease-unio)" }}></div>
      <aside role="dialog" aria-modal="true" aria-label="Homepage bearbeiten" style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "min(460px, 100vw)", background: "var(--paper)", boxShadow: "-30px 0 80px -30px rgba(11,10,9,0.5)", transform: offen ? "translateX(0)" : "translateX(105%)", transition: "transform 480ms var(--ease-unio)", display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid var(--hairline-dark)" }}>
          <span className="u-label" style={{ fontSize: 10, color: "var(--text-muted)" }}>HOMEPAGE · INHALTE BEARBEITEN</span>
          <button onClick={onClose} aria-label="Schließen" style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--hairline-dark)", background: "var(--surface-raised)", cursor: "pointer", fontFamily: "inherit", color: "var(--ink)" }}>✕</button>
        </div>
        <div style={{ padding: "22px 24px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <span className="u-label" style={{ display: "block", fontSize: 9, color: "var(--text-muted)", marginBottom: 9 }}>DEIN FOTO</span>
            <div style={{ display: "flex", gap: 10 }}>
              {LOOK_FOTOS.map((f) => (
                <button key={f} onClick={() => set("foto")(f)} aria-label="Foto wählen" style={{ padding: 0, border: "none", cursor: "pointer", borderRadius: "50%", background: "none" }}>
                  <img src={f} alt="" style={{ width: 54, height: 54, borderRadius: "50%", objectFit: "cover", objectPosition: "center 18%", display: "block", boxShadow: d.foto === f ? "0 0 0 3px var(--signal)" : "inset 0 0 0 1px var(--hairline-dark)", opacity: d.foto === f ? 1 : 0.72, transition: "all .25s" }} />
                </button>
              ))}
            </div>
          </div>
          <LookFeld label="HEADLINE" value={d.headline} onChange={set("headline")} />
          <LookFeld label="ÜBER DICH (INTRO)" value={d.intro} onChange={set("intro")} area />
          <LookFeld label="REGION" value={d.region} onChange={set("region")} />
          <LookFeld label="TELEFON" value={d.tel} onChange={set("tel")} />
          <LookFeld label="E-MAIL" value={d.mail} onChange={set("mail")} />
          <button onClick={() => onSave(d)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "15px 0", background: "var(--signal)", color: "#1A1305", font: "500 14.5px var(--font-display)", fontFamily: "inherit", marginTop: 6 }}>Änderungen speichern</button>
          <p className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", textAlign: "center", margin: 0 }}>GEHT ALS BRIEFING AN DAS UMSETZUNGS-TEAM · DEMO</p>
        </div>
      </aside>
    </div>
  );
}

function ShopSeite({ onNav }) {
  const { Reveal: Rv, RevealL: RvL } = window;
  const [konfig, setKonfig] = React.useState(null);          // {typ, id}
  const [cart, setCart] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [ordered, setOrdered] = React.useState(false);
  const [look, setLookRaw] = React.useState(() => { const v = parseInt(localStorage.getItem("unio_shop_look"), 10); return isNaN(v) ? null : v; });
  const setLook = (n) => { setLookRaw(n); localStorage.setItem("unio_shop_look", String(n)); };
  const [lookDaten, setLookDaten] = React.useState(() => { try { return { ...LOOK_DEFAULTS, ...(JSON.parse(localStorage.getItem("unio_shop_look_daten")) || {}) }; } catch (e) { return LOOK_DEFAULTS; } });
  const [editor, setEditor] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [auftrag, setAuftrag] = React.useState(null);
  const [kat, setKat] = React.useState("druck");
  const add = (item) => {
    setCart((c) => [...c, item]);
    setKonfig(null);
    setToast(item.titel + " im Warenkorb");
    setTimeout(() => setToast(null), 2600);
    window.scrollTo(0, 0);
  };
  const order = () => { setOrdered(true); setTimeout(() => { setCart([]); setOrdered(false); setCartOpen(false); setLook(null); }, 3600); };

  const cartBtn = (
    <button onClick={() => setCartOpen(true)} style={{ position: "fixed", right: 28, bottom: 28, zIndex: 90, display: "inline-flex", alignItems: "center", gap: 10, border: "none", cursor: "pointer", borderRadius: 999, padding: "14px 22px", background: "var(--ink)", color: "var(--paper)", font: "500 14px var(--font-display)", fontFamily: "inherit", boxShadow: "0 18px 40px -16px rgba(11,10,9,.5)" }}>
      Warenkorb
      <span style={{ minWidth: 22, height: 22, borderRadius: 99, background: cart.length ? "var(--signal)" : "rgba(255,255,255,.18)", color: cart.length ? "#1A1305" : "var(--paper)", display: "inline-grid", placeItems: "center", font: "600 11.5px var(--font-mono)", padding: "0 5px" }}>{cart.length}</span>
    </button>
  );
  const toastEl = toast && (
    <div style={{ position: "fixed", left: "50%", bottom: 32, transform: "translateX(-50%)", zIndex: 95, background: "var(--ink)", color: "var(--paper)", borderRadius: 999, padding: "11px 20px", font: "500 13.5px var(--font-display)", boxShadow: "0 18px 40px -16px rgba(11,10,9,.5)" }}>
      <span style={{ color: "var(--signal)", marginRight: 8 }}>✓</span>{toast}
    </div>
  );
  const drawer = <CartDrawer offen={cartOpen} onClose={() => setCartOpen(false)} items={cart} onRemove={(i) => setCart((c) => c.filter((_, j) => j !== i))} onOrder={order} ordered={ordered} />;

  if (konfig && konfig.typ === "print") {
    return <React.Fragment><PrintKonfigurator produkt={PRINT_PRODUKTE.find((p) => p.id === konfig.id)} onBack={() => setKonfig(null)} onAdd={add} />{cartBtn}{toastEl}{drawer}</React.Fragment>;
  }
  if (konfig && konfig.typ === "content") {
    return <React.Fragment><ContentKonfigurator leistung={CONTENT_LEISTUNGEN.find((l) => l.id === konfig.id)} onBack={() => setKonfig(null)} onAdd={add} />{cartBtn}{toastEl}{drawer}</React.Fragment>;
  }
  if (auftrag) {
    return <React.Fragment><AuftragDetail key={auftrag.id} auftrag={auftrag} onBack={() => setAuftrag(null)} />{cartBtn}{toastEl}{drawer}</React.Fragment>;
  }

  const KATEGORIEN = [
    ["druck", "Druck & Werbemittel"],
    ["content", "Content & Personal Brand"],
    ["homepage", "Makler-Homepage"],
    ["programme", "Pakete & Leads"],
    ["bestellungen", "Aufträge"],
  ];
  return (
    <div style={{ maxWidth: 1360, margin: "0 auto" }}>
      <RvL style={{ marginTop: 40 }}>
        <h1 style={{ margin: 0, font: "500 clamp(34px, 3.4vw, 52px)/1.02 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Shop<span style={{ color: "var(--signal)" }}>.</span></h1>
        <p style={{ margin: "16px 0 0", font: "400 16px/1.5 var(--font-display)", color: "var(--text-muted)", maxWidth: 520 }}>Werbemittel, Content und deine Makler-Homepage: alles konfiguriert sich aus deinem Profil und deinen Objekten.</p>
      </RvL>

      {/* Reiter durch die Meta-Kategorien */}
      <RvL style={{ marginTop: 34 }}>
        <div role="tablist" aria-label="Shop-Kategorien" style={{ display: "inline-flex", gap: 6, flexWrap: "wrap", padding: 5, borderRadius: 999, background: "var(--card-bg, #FFFFFF)", boxShadow: "inset 0 0 0 1px var(--card-line, var(--hairline-dark))" }}>
          {KATEGORIEN.map(([id, label]) => (
            <button key={id} role="tab" aria-selected={kat === id} onClick={() => { setKat(id); window.scrollTo(0, 0); }}
              style={{ font: "500 13.5px var(--font-display)", fontFamily: "inherit", padding: "10px 18px", borderRadius: 999, border: "none", cursor: "pointer",
                background: kat === id ? "var(--ink)" : "transparent", color: kat === id ? "var(--paper)" : "var(--text-muted)",
                transition: "all .25s var(--ease-unio)", whiteSpace: "nowrap" }}>
              {label}{id === "bestellungen" ? " · " + AUFTRAEGE.length : ""}
            </button>
          ))}
        </div>
      </RvL>

      {kat === "druck" && <React.Fragment>
      <Rv style={{ marginTop: 36 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
          <h2 style={{ margin: 0, font: "500 22px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Druck &amp; Werbemittel</h2>
          <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>MIT / OHNE MAKLERBILD · MIT / OHNE PARTNERLOGO</span>
        </div>
      </Rv>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {PRINT_PRODUKTE.map((p, i) => (
          <ShopKarte key={p.id} name={p.name} meta={p.sub.toUpperCase()} preis={"ab " + eurS(p.ab)} delay={i * 60} onOpen={() => setKonfig({ typ: "print", id: p.id })}>
            <ArtworkPreview produkt={p} withFoto={p.foto} withPartner={false} obj={SHOP_OBJ[0]} mini />
          </ShopKarte>
        ))}
      </div>

      </React.Fragment>}

      {kat === "content" && <React.Fragment>
      <Rv style={{ marginTop: 36 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
          <h2 style={{ margin: 0, font: "500 22px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Content &amp; Personal Brand</h2>
          <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>À LA CARTE · UNIO.LUCIDA.AT</span>
        </div>
      </Rv>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 2fr)", gap: 20, alignItems: "start" }}>
        {/* Abo-Karte */}
        <Rv>
          <div style={{ background: "var(--ink)", borderRadius: 18, padding: "28px 28px 26px", color: "var(--paper)", position: "relative", overflow: "hidden" }}>
            <div aria-hidden="true" style={{ position: "absolute", right: -90, top: -90, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,170,9,.32), transparent 70%)" }}></div>
            <span className="u-label" style={{ fontSize: 8.5, color: "var(--signal)", position: "relative" }}>KOMPLETTPAKET · MONATLICH KÜNDBAR</span>
            <h3 style={{ margin: "12px 0 0", font: "500 28px/1.05 var(--font-display)", letterSpacing: "-0.02em", position: "relative" }}>{CONTENT_ABO.name}<span style={{ color: "var(--signal)" }}>.</span></h3>
            <p style={{ margin: "10px 0 0", font: "400 13.5px/1.55 var(--font-display)", color: "rgba(247,245,241,.75)", position: "relative" }}>{CONTENT_ABO.claim}</p>
            <ul style={{ margin: "18px 0 0", padding: 0, listStyle: "none", position: "relative" }}>
              {CONTENT_ABO.leistungen.map((l) => (
                <li key={l} style={{ font: "400 13px/1.5 var(--font-display)", color: "rgba(247,245,241,.9)", padding: "7px 0", borderBottom: "1px solid rgba(247,245,241,.12)", display: "flex", gap: 9 }}>
                  <span style={{ color: "var(--signal)" }}>✓</span>{l}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, marginTop: 22, position: "relative" }}>
              <div>
                <span style={{ font: "500 26px var(--font-display)", letterSpacing: "-0.02em" }}>{eurS(CONTENT_ABO.preis)}</span>
                <span className="u-label" style={{ display: "block", fontSize: 8, color: "rgba(247,245,241,.55)", marginTop: 4 }}>{CONTENT_ABO.einheit.toUpperCase()}</span>
              </div>
              <button onClick={() => add({ titel: "Personal Brand · Abo", detail: "Strategie · 3 Videos · 7 Grafiken · 10 Fotos / Monat", menge: 1, preis: CONTENT_ABO.preis, abo: true })} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "13px 22px", background: "var(--signal)", color: "#1A1305", font: "500 14px var(--font-display)", fontFamily: "inherit" }}>Paket wählen</button>
            </div>
          </div>
        </Rv>
        {/* Einzelleistungen */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
          {CONTENT_LEISTUNGEN.map((l, i) => (
            <Rv key={l.id} delay={i * 50}>
              <button onClick={() => setKonfig({ typ: "content", id: l.id })} style={{ width: "100%", textAlign: "left", border: "none", cursor: "pointer", fontFamily: "inherit", background: "var(--card-bg, #FFFFFF)", borderRadius: 16, boxShadow: "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", padding: "18px 19px", display: "flex", flexDirection: "column", gap: 8, minHeight: 128, transition: "box-shadow .3s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ font: "500 15.5px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>{l.name}</span>
                  {l.beliebt && <span className="u-label" style={{ fontSize: 7.5, color: "var(--signal-deep)", background: "var(--signal-soft)", padding: "3px 8px", borderRadius: 99, height: "fit-content" }}>BELIEBT</span>}
                </div>
                <span style={{ font: "400 12.5px/1.5 var(--font-display)", color: "var(--text-muted)" }}>{l.inhalt}</span>
                <span style={{ marginTop: "auto", font: "500 14px var(--font-display)", color: "var(--ink)" }}>{eurS(l.preis)} <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: 12.5 }}>· konfigurieren →</span></span>
              </button>
            </Rv>
          ))}
        </div>
      </div>

      </React.Fragment>}

      {kat === "homepage" && <React.Fragment>
      <Rv style={{ marginTop: 36 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 8 }}>
          <h2 style={{ margin: 0, font: "500 22px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Deine Makler-Homepage</h2>
          <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>PERSONAL-BRAND-SEITE · {eurS(LOOK_PREIS)} EINMALIG</span>
        </div>
        <p style={{ margin: "0 0 22px", font: "400 14.5px/1.6 var(--font-display)", color: "var(--text-muted)", maxWidth: 560 }}>Such dir den Look aus, wir bauen die Seite unter deinem Namen: Story, Objekte, Kontakt und Terminbuchung inklusive. Jeder Look lässt sich live ansehen.</p>
      </Rv>

      {/* Dein Look: immer sichtbar, mit Inhalten und Bearbeitung */}
      <Rv>
        {look ? (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)", gap: 0, background: "var(--card-bg, #FFFFFF)", borderRadius: 18, overflow: "hidden", boxShadow: "0 0 0 2px var(--signal)", marginBottom: 34 }}>
            <div style={{ position: "relative", minHeight: 300 }}>
              <img src={"../../assets/img/shop-look-" + look + ".jpg"} alt={"Dein Look " + look} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
              <span className="u-label" style={{ position: "absolute", left: 14, top: 14, fontSize: 8.5, background: "var(--signal)", color: "#1A1305", padding: "5px 11px", borderRadius: 99 }}>DEIN LOOK · {String(look).padStart(2, "0")}</span>
            </div>
            <div style={{ padding: "26px 28px", display: "flex", flexDirection: "column", gap: 13 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img src={lookDaten.foto} alt="" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", objectPosition: "center 18%" }} />
                <div>
                  <div style={{ font: "500 16px var(--font-display)", color: "var(--ink)" }}>{SHOP_MAKLER.name}</div>
                  <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{lookDaten.region.toUpperCase()}</span>
                </div>
              </div>
              <div>
                <span className="u-label" style={{ fontSize: 8.5, color: "var(--signal-deep)" }}>HEADLINE</span>
                <div style={{ font: "500 19px/1.25 var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)", marginTop: 4 }}>{lookDaten.headline}</div>
              </div>
              <div>
                <span className="u-label" style={{ fontSize: 8.5, color: "var(--signal-deep)" }}>INTRO</span>
                <p style={{ margin: "4px 0 0", font: "400 13px/1.6 var(--font-display)", color: "var(--text-muted)" }}>{lookDaten.intro}</p>
              </div>
              <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{lookDaten.tel} · {lookDaten.mail.toUpperCase()}</span>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: "auto", paddingTop: 8 }}>
                <button onClick={() => setEditor(true)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "12px 22px", background: "var(--ink)", color: "var(--paper)", font: "500 13.5px var(--font-display)", fontFamily: "inherit" }}>Inhalte bearbeiten</button>
                <a href={"/showcase" + look} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", borderRadius: 999, padding: "12px 22px", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--ink)", font: "500 13.5px var(--font-display)", textDecoration: "none" }}>Live ansehen ↗</a>
                <button onClick={() => add({ titel: "Makler-Homepage · Look " + String(look).padStart(2, "0"), detail: "Inkl. deiner Inhalte: " + lookDaten.headline, menge: 1, preis: LOOK_PREIS })} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "12px 22px", background: "var(--signal)", color: "#1A1305", font: "500 13.5px var(--font-display)", fontFamily: "inherit" }}>In den Warenkorb</button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ background: "var(--card-bg, #FFFFFF)", borderRadius: 16, boxShadow: "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", padding: "20px 24px", marginBottom: 34, display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--signal)", flex: "none" }}></span>
            <p style={{ margin: 0, font: "400 14px/1.5 var(--font-display)", color: "var(--text-muted)" }}>Noch kein Look gewählt: Such dir unten einen aus, danach kannst du hier Texte, Fotos und Kontakt bearbeiten.</p>
          </div>
        )}
      </Rv>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
        {SHOP_LOOKS.map((lk, i) => (
          <Rv key={lk.n} delay={i * 60}>
            <div style={{ background: "var(--card-bg, #FFFFFF)", borderRadius: 18, overflow: "hidden", boxShadow: look === lk.n ? "0 0 0 2px var(--signal), 0 18px 40px -20px rgba(11,10,9,.25)" : "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", transition: "box-shadow .3s var(--ease-unio)" }}>
              <div style={{ position: "relative" }}>
                <img src={lk.img} alt={"Homepage-Look " + lk.n} loading="lazy" style={{ display: "block", width: "100%", aspectRatio: "16/10", objectFit: "cover", objectPosition: "top" }} />
                {look === lk.n && <span className="u-label" style={{ position: "absolute", left: 12, top: 12, fontSize: 8, background: "var(--signal)", color: "#1A1305", padding: "5px 10px", borderRadius: 99 }}>DEIN LOOK</span>}
              </div>
              <div style={{ padding: "14px 16px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <div>
                  <div style={{ font: "500 15px var(--font-display)", color: "var(--ink)" }}>Look {String(lk.n).padStart(2, "0")}</div>
                  <a href={lk.href} target="_blank" rel="noopener" style={{ font: "400 12px var(--font-display)", color: "var(--signal-deep)", textDecoration: "none" }}>Live ansehen ↗</a>
                </div>
                <button onClick={() => { setLook(lk.n); setToast("Look " + String(lk.n).padStart(2, "0") + " gewählt"); setTimeout(() => setToast(null), 2200); window.scrollTo(0, 0); }} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "10px 18px", background: look === lk.n ? "var(--ink)" : "var(--paper-2)", color: look === lk.n ? "var(--paper)" : "var(--ink)", font: "500 13px var(--font-display)", fontFamily: "inherit", transition: "all .25s" }}>{look === lk.n ? "Gewählt ✓" : "Look wählen"}</button>
              </div>
            </div>
          </Rv>
        ))}
      </div>

      </React.Fragment>}

      {kat === "programme" && <React.Fragment>
      <Rv style={{ marginTop: 36 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
          <h2 style={{ margin: 0, font: "500 22px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Content-Programme</h2>
          <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>MONATLICH · PRODUKTION INKLUSIVE</span>
        </div>
      </Rv>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {PROGRAMME.map((pr, i) => (
          <Rv key={pr.id} delay={i * 70}>
            <div style={{ position: "relative", height: "100%", boxSizing: "border-box", background: pr.beliebt ? "var(--ink)" : "var(--card-bg, #FFFFFF)", color: pr.beliebt ? "var(--paper)" : "var(--ink)", borderRadius: 18, boxShadow: pr.beliebt ? "none" : "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", padding: "26px 26px 24px", display: "flex", flexDirection: "column" }}>
              {pr.beliebt && <span className="u-label" style={{ position: "absolute", top: 18, right: 18, fontSize: 8, padding: "5px 10px", borderRadius: 99, background: "var(--signal)", color: "#1A1305" }}>BELIEBT</span>}
              <span className="u-label" style={{ fontSize: 9, color: pr.beliebt ? "var(--signal)" : "var(--signal-deep)" }}>{pr.name.toUpperCase()}</span>
              <div style={{ margin: "12px 0 2px", font: "500 30px var(--font-display)", letterSpacing: "-0.02em" }}>{pr.preis ? eurS(pr.preis) : pr.preisLabel}</div>
              <span style={{ font: "400 12.5px var(--font-display)", color: pr.beliebt ? "rgba(247,245,241,.65)" : "var(--text-muted)" }}>{pr.einheit}</span>
              <p style={{ margin: "14px 0 4px", font: "500 15px var(--font-display)", letterSpacing: "-0.01em" }}>{pr.claim}</p>
              {pr.punkte.map((x) => (
                <div key={x} style={{ display: "flex", gap: 9, alignItems: "baseline", font: "400 13.5px/1.5 var(--font-display)", color: pr.beliebt ? "rgba(247,245,241,.8)" : "var(--ink-2)", marginTop: 8 }}>
                  <span style={{ color: pr.beliebt ? "var(--signal)" : "var(--signal-deep)" }}>✓</span>{x}
                </div>
              ))}
              <div style={{ marginTop: "auto", paddingTop: 20 }}>
                {pr.preis ? (
                  <button onClick={() => add({ titel: "Content-Programm " + pr.name, detail: pr.einheit.replace("/ Monat", "Monatlich").toUpperCase(), menge: 1, preis: pr.preis, abo: true })}
                    style={{ width: "100%", border: "none", cursor: "pointer", borderRadius: 999, padding: "14px 0", background: pr.beliebt ? "var(--signal)" : "var(--paper-2)", color: pr.beliebt ? "#1A1305" : "var(--ink)", boxShadow: pr.beliebt ? "none" : "inset 0 0 0 1px var(--hairline-dark)", font: "500 14px var(--font-display)", fontFamily: "inherit" }}>Programm starten</button>
                ) : (
                  <span className="u-label" style={{ display: "block", textAlign: "center", fontSize: 8.5, color: "var(--text-muted)", padding: "15px 0 8px" }}>IN DEINEM COMMUNITY-ABO ENTHALTEN</span>
                )}
              </div>
            </div>
          </Rv>
        ))}
      </div>

      <Rv style={{ marginTop: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
          <h2 style={{ margin: 0, font: "500 22px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Listing-Kampagnen</h2>
          <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>PRO OBJEKT · AD-BUDGET ZUZÜGLICH</span>
        </div>
      </Rv>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {LISTING.map((l, i) => (
          <Rv key={l.id} delay={i * 70}>
            <div style={{ position: "relative", height: "100%", boxSizing: "border-box", background: "var(--card-bg, #FFFFFF)", borderRadius: 18, boxShadow: l.beliebt ? "inset 0 0 0 1.5px var(--signal)" : "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", padding: "24px 24px 22px", display: "flex", flexDirection: "column" }}>
              {l.beliebt && <span className="u-label" style={{ position: "absolute", top: 16, right: 16, fontSize: 8, padding: "5px 10px", borderRadius: 99, background: "var(--signal-soft)", color: "var(--signal-deep)" }}>MEISTGEBUCHT</span>}
              <span className="u-label" style={{ fontSize: 9, color: "var(--signal-deep)" }}>{l.dauer.toUpperCase()}</span>
              <div style={{ margin: "10px 0 0", font: "500 19px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>{l.name}</div>
              <div style={{ margin: "8px 0 2px", font: "500 26px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{eurS(l.preis)}</div>
              <span style={{ font: "400 12.5px var(--font-display)", color: "var(--text-muted)" }}>{l.budget}</span>
              {l.punkte.map((x) => (
                <div key={x} style={{ display: "flex", gap: 9, alignItems: "baseline", font: "400 13.5px/1.5 var(--font-display)", color: "var(--ink-2)", marginTop: 8 }}>
                  <span style={{ color: "var(--signal-deep)" }}>✓</span>{x}
                </div>
              ))}
              <button onClick={() => add({ titel: l.name, detail: (l.dauer + " · " + l.budget).toUpperCase(), menge: 1, preis: l.preis })}
                style={{ marginTop: "auto", border: "none", cursor: "pointer", borderRadius: 999, padding: "13px 0", background: "var(--paper-2)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--ink)", font: "500 13.5px var(--font-display)", fontFamily: "inherit", marginBlockStart: "20px" }}>Für ein Objekt buchen</button>
            </div>
          </Rv>
        ))}
      </div>
      <Rv style={{ marginTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap", background: "var(--card-bg, #FFFFFF)", borderRadius: 14, boxShadow: "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", padding: "16px 20px" }}>
          <div>
            <b style={{ font: "500 15px var(--font-display)", color: "var(--ink)" }}>Objektaufbereitung + 360°-Rundgang</b>
            <span style={{ display: "block", font: "400 12.5px var(--font-display)", color: "var(--text-muted)", marginTop: 3 }}>Aufbereitung ab € 99 · 360°-Rundgang einzeln ab € 37,56</span>
          </div>
          <button onClick={() => add({ titel: "Objektaufbereitung + 360°", detail: "PRO OBJEKT · AB-PREIS", menge: 1, preis: 99 })}
            style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "11px 20px", background: "var(--ink)", color: "var(--paper)", font: "500 13px var(--font-display)", fontFamily: "inherit" }}>Buchen</button>
        </div>
      </Rv>

      <Rv style={{ marginTop: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
          <h2 style={{ margin: 0, font: "500 22px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Leads</h2>
          <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>AUS DEINER REGION · PRO LEAD</span>
        </div>
      </Rv>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 14 }}>
        {LEADS.map((l, i) => (
          <Rv key={l.id} delay={i * 60}>
            <div style={{ position: "relative", height: "100%", boxSizing: "border-box", background: "var(--card-bg, #FFFFFF)", borderRadius: 16, boxShadow: l.beliebt ? "inset 0 0 0 1.5px var(--signal)" : "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", padding: "20px 20px 18px", display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{l.sub.toUpperCase()}</span>
              <b style={{ font: "500 16px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>{l.name}</b>
              <div style={{ font: "500 24px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{eurS(l.preis)}<span style={{ font: "400 11px var(--font-display)", color: "var(--text-muted)" }}> / Lead</span></div>
              <button onClick={() => add({ titel: l.name, detail: l.sub.toUpperCase(), menge: 1, preis: l.preis })}
                style={{ marginTop: 10, border: "none", cursor: "pointer", borderRadius: 999, padding: "11px 0", background: "var(--paper-2)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--ink)", font: "500 13px var(--font-display)", fontFamily: "inherit" }}>In den Warenkorb</button>
            </div>
          </Rv>
        ))}
      </div>
      <p className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 14 }}>ALLE PREISE NETTO · QUELLE: UNIO ANGEBOTS- UND PROZESSDOKUMENT · ARBEITSSTAND</p>
      </React.Fragment>}

      {kat === "bestellungen" && <React.Fragment>
      <Rv style={{ marginTop: 36 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 18 }}>
          <h2 style={{ margin: 0, font: "500 20px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Deine Aufträge</h2>
          <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>KLICKE IN EINEN AUFTRAG FÜR STATUS, TERMINE UND KORREKTUREN</span>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          {AUFTRAEGE.map((a) => (
            <button key={a.id} onClick={() => setAuftrag(a)}
              style={{ display: "grid", gridTemplateColumns: "84px 1.5fr 1fr 90px 150px 24px", gap: 14, alignItems: "center", textAlign: "left", width: "100%", border: "none", cursor: "pointer", background: "var(--card-bg, #FFFFFF)", borderRadius: 14, boxShadow: "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", padding: "16px 20px", fontFamily: "inherit", transition: "transform .25s var(--ease-unio)" }}>
              <span style={{ font: "11px var(--font-mono)", color: "var(--text-muted)" }}>{a.id}</span>
              <span style={{ minWidth: 0 }}>
                <b style={{ display: "block", font: "500 14.5px var(--font-display)", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</b>
                <span style={{ font: "400 12px var(--font-display)", color: "var(--text-muted)" }}>Bestellt {a.datum}</span>
              </span>
              <span style={{ font: "400 13px var(--font-display)", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.objekt}</span>
              <span style={{ font: "500 14px var(--font-display)", color: "var(--ink)", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{eurS(a.preis)}</span>
              <span className="u-label" style={{ fontSize: 8, justifySelf: "end", padding: "5px 11px", borderRadius: 99,
                background: a.tone === "ok" ? "rgba(46,125,70,.1)" : a.tone === "hot" ? "var(--signal-soft)" : "var(--paper-2)",
                color: a.tone === "ok" ? "#2E7D46" : a.tone === "hot" ? "var(--signal-deep)" : "var(--text-muted)", whiteSpace: "nowrap" }}>{a.status.toUpperCase()}</span>
              <span style={{ color: "var(--text-muted)" }}>→</span>
            </button>
          ))}
        </div>
        <p className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 12 }}>DEMO-ANSICHT · DIE AGENTUR SPIELT ERGEBNISSE DIREKT IN DEN AUFTRAG EIN</p>
      </Rv>
      </React.Fragment>}

      {cartBtn}{toastEl}{drawer}
      <LookEditor offen={editor} onClose={() => setEditor(false)} daten={lookDaten} onSave={(d) => { setLookDaten(d); localStorage.setItem("unio_shop_look_daten", JSON.stringify(d)); setEditor(false); setToast("Inhalte gespeichert"); setTimeout(() => setToast(null), 2200); }} />
    </div>
  );
}

Object.assign(window, { ShopSeite });
