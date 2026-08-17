/* UNIO Dashboard v2 — Immobilien-Übersicht (§6.3) + Leads-Liste (§6.4). */
const { Icon: SIcon, Reveal: SReveal, Tabs: STabs, Img: SImg } = window;
const { PageHead: SPageHead, FilterBar: SFilterBar, KiSearch: SKiSearch, PillSwitch: SPillSwitch, GhostPill: SGhostPill, ViewToggle: SViewToggle, ObjektCard: SObjektCard, StatusPill: SStatus, Table: STable, Row: SRow, Cell2: SCell2 } = window;
const { Button: SBtn } = window.UNIODesignSystem_b6216a;
const S_RM = window.DASH_P_RM;

const OBJEKTE_DB = [
  { id: "042", img: "../../assets/img/albrecht.jpg", price: "€ 1,29 Mio", type: "Townhaus", title: "Das Albrecht — Haus 4", addr: "Hernalser Hauptstraße, 1170 Wien", qm: 168, rooms: 5, demand: 94, projekt: "Das Albrecht" },
  { id: "017", img: "../../assets/img/obenzwei.jpg", price: "Auf Anfrage", type: "Penthouse", title: "ObenZwei — Dachgeschoss", addr: "Vorgartenstraße, 1020 Wien", qm: 124, rooms: 4, demand: 88, projekt: "ObenZwei" },
  { id: "063", img: "../../assets/img/beheim.jpg", price: "€ 1,70 Mio", type: "Penthouse", title: "Penthouse Beheim", addr: "Beheimgasse, 1170 Wien", qm: 138, rooms: 4, demand: 91 },
  { id: "029", img: "../../assets/img/ecoluxe.jpg", price: "€ 2,40 Mio", type: "Villa", title: "Villa Ecoluxe", addr: "Cobenzlgasse, 1190 Wien", qm: 240, rooms: 6, demand: 96, projekt: "Ecoluxe" },
  { id: "071", img: "../../assets/img/penthouse.jpg", price: "€ 3,95 Mio", type: "Penthouse", title: "Origins — Penthouse S", addr: "Gersthofer Straße, 1180 Wien", qm: 210, rooms: 5, demand: 89 },
  { id: "088", img: "../../assets/img/vienna-garden.jpg", price: "€ 1,90 Mio", type: "Haus", title: "Garten-Refugium Wienerwald", addr: "Sieveringer Straße, 1190 Wien", qm: 195, rooms: 6, demand: 82 },
  { id: "094", img: "../../assets/img/int-kitchen.jpg", price: "€ 890.000", type: "Wohnung", title: "Stadtwohnung Wieden", addr: "Favoritenstraße, 1040 Wien", qm: 84, rooms: 3, demand: 78 },
  { id: "101", img: "../../assets/img/vienna-facade.jpg", price: "€ 1,15 Mio", type: "Altbau", title: "Zinshaus-Etage Josefstadt", addr: "Josefstädter Straße, 1080 Wien", qm: 116, rooms: 4, demand: 85 },
];
const ENTWUERFE_DB = [
  { id: "112", img: "../../assets/img/int-bath.jpg", price: "Entwurf", type: "Wohnung", title: "Dachausbau Neubaugasse", addr: "Neubaugasse, 1070 Wien", qm: 102, rooms: 3, entwurf: true },
  { id: "113", img: "../../assets/img/schoenbrunn.jpg", price: "Entwurf", type: "Villa", title: "Villa Hietzing", addr: "Maxingstraße, 1130 Wien", qm: 260, rooms: 7, entwurf: true },
];

function ImmoUebersicht({ onNav }) {
  const [tab, setTab] = React.useState("live");
  const [view, setView] = React.useState("grid");
  const [q, setQ] = React.useState("");
  const [mine, setMine] = React.useState(false);
  const [proj, setProj] = React.useState(false);
  let list = tab === "live" ? OBJEKTE_DB : ENTWUERFE_DB;
  if (proj && tab === "live") list = list.filter((o) => o.projekt);
  if (q.trim()) list = list.filter((o) => (o.title + o.addr + o.type).toLowerCase().includes(q.toLowerCase()));

  const cols = [{ label: "Objekt", w: "2.2fr" }, { label: "Preis", w: "1fr", right: true }, { label: "Typ", w: "1fr" }, { label: "Status", w: "1fr" }, { label: "", w: "40px", right: true }];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, flexWrap: "wrap", marginBottom: 40, paddingTop: 20 }}>
        <div>
          <h1 style={{ margin: 0, font: "500 clamp(34px, 3.4vw, 52px)/1.02 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Immobilien<span style={{ color: "var(--signal)" }}>.</span></h1>
        </div>
        {/* Mini-KPIs als nacktes Band (v3 §4.3) */}
        <div style={{ display: "flex", alignItems: "baseline", columnGap: 28 }}>
          {[[OBJEKTE_DB.length, "Objekte"], [ENTWUERFE_DB.length, "Entwürfe"], ["6", "In Vermarktung"]].map(([v, l], i) => (
            <React.Fragment key={l}>
              {i > 0 && <span style={{ width: 1, height: 32, background: "rgba(20,18,16,.14)", alignSelf: "center" }}></span>}
              <div style={{ display: "flex", alignItems: "baseline", gap: 11 }}>
                <span style={{ font: "500 32px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{v}</span>
                <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{l}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <SReveal>
        <SFilterBar style={{ marginBottom: 20 }}>
          <SKiSearch placeholder="Suchen oder KI fragen…" value={q} onChange={setQ} />
          <SPillSwitch label="Nur meine" on={mine} onToggle={() => setMine((v) => !v)} />
          <SPillSwitch label="Nur Projekte" on={proj} onToggle={() => setProj((v) => !v)} />
          <SGhostPill>Filter <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, marginLeft: 2 }}>2</span></SGhostPill>
          <SViewToggle view={view} onView={setView} />
        </SFilterBar>
      </SReveal>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
        <STabs items={[["live", "Immobilien", OBJEKTE_DB.length], ["entwurf", "Entwürfe", ENTWUERFE_DB.length]]} active={tab} onPick={setTab} />
        <span className="u-label" style={{ color: "var(--text-muted)", fontSize: 9 }}>{list.length} Einträge</span>
      </div>
      {view === "grid" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(248px, 1fr))", gap: 24 }}>
          {list.map((o, i) => <SObjektCard key={o.id} o={o} delay={i * 60} onOpen={() => onNav && onNav(o.projekt ? "projekt" : "objekt")} />)}
        </div>
      ) : (
        <STable cols={cols}>
          {list.map((o, i) => (
            <SRow key={o.id} cols={cols} delay={i * 40} onClick={() => onNav && onNav(o.projekt ? "projekt" : "objekt")} cells={[
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <SImg src={o.img} alt="" style={{ width: 56, height: 44, borderRadius: 8, objectFit: "cover", flex: "none" }} />
                <SCell2 a={o.title} b={o.addr} />
              </div>,
              <span style={{ font: "500 15px var(--font-mono)", color: "var(--ink)" }}>{o.price}</span>,
              <SStatus kind="neutral">{o.type}</SStatus>,
              o.entwurf ? <SStatus kind="neutral">Entwurf</SStatus> : <SStatus kind="aktiv">Aktiv</SStatus>,
              <SIcon name="arrow" size={15} stroke="var(--text-muted)" />,
            ]} />
          ))}
        </STable>
      )}
    </div>
  );
}

/* ===== §6.4 Leads ===== */
const TAGE = [
  ["MO 14.07.", 6], ["DI 15.07.", 9], ["MI 16.07.", 5], ["DO 17.07.", 12], ["FR 18.07.", 8], ["SA 19.07.", 3], ["SO 20.07.", 2],
];
const LEADS_DB = [
  { day: 3, t: "17.07. · 14:32", id: "491", name: "Sophie Berger", mail: "s.berger@gmx.at", tel: "+43 660 1234567", kind: "IMMOBILIE", obj: "Penthouse Beheim", addr: "Beheimgasse, 1170", status: "neu", src: "meta", msg: "Ist die Dachterrasse nach Süden ausgerichtet? Wir hätten Interesse an einer Besichtigung." },
  { day: 3, t: "17.07. · 11:08", id: "490", name: "Markus Wolf", mail: "m.wolf@firma.at", tel: "+43 664 9988776", kind: "PROJEKT", obj: "Das Albrecht", addr: "Hernalser Hauptstraße, 1170", status: "qualifiziert", src: "willhaben", msg: "Finanzierung steht, suche 4-Zimmer ab Herbst. Bitte um Rückruf." },
  { day: 3, t: "17.07. · 09:41", id: "489", name: "Elena Novak", mail: "elena.novak@outlook.com", tel: "+43 699 2020202", kind: "IMMOBILIE", obj: "Villa Ecoluxe", addr: "Cobenzlgasse, 1190", status: "kontaktiert", src: "meta", msg: "Danke für die Unterlagen — wir besprechen es im Kreis der Familie." },
  { day: 1, t: "15.07. · 16:20", id: "486", name: "Thomas Gruber", mail: "t.gruber@gmail.com", tel: "+43 650 4433221", kind: "IMMOBILIE", obj: "ObenZwei — Dachgeschoss", addr: "Vorgartenstraße, 1020", status: "kontaktversuch", src: "willhaben", msg: "Wie hoch sind die monatlichen Betriebskosten?" },
  { day: 1, t: "15.07. · 10:03", id: "485", name: "Andrea Fischer", mail: "a.fischer@gmx.net", tel: "+43 676 5551234", kind: "PROJEKT", obj: "Ecoluxe", addr: "Cobenzlgasse, 1190", status: "verloren", src: "meta", msg: "Budget passt leider nicht, danke trotzdem." },
];

function Leads() {
  const [sel, setSel] = React.useState(3);
  const max = Math.max(...TAGE.map((t) => t[1]));
  const rows = LEADS_DB.filter((l) => l.day === sel);
  const cols = [{ label: "Eingang", w: "1.1fr" }, { label: "Kontakt", w: "1.4fr" }, { label: "Interesse", w: "1.6fr" }, { label: "Status", w: "1fr" }, { label: "Quelle", w: "0.8fr" }, { label: "", w: "40px", right: true }];
  return (
    <div>
      <SPageHead
        title="Leads" sub="Chronologische Übersicht der Anfragen der letzten 7 Tage."
        chips={[{ value: "45", label: "Leads 7 Tage" }, { value: "38 %", label: "qualifiziert" }, { value: "7", label: "offen" }]}
      />
      <SReveal>
        <SFilterBar style={{ marginBottom: 24 }}>
          <SGhostPill>Zeitraum: Letzte 7 Tage</SGhostPill>
          <SGhostPill>Status: Alle</SGhostPill>
          <SGhostPill>Immobilie: Alle</SGhostPill>
          <SGhostPill>Quelle: Alle</SGhostPill>
          <span style={{ marginLeft: "auto" }}><button style={{ border: "none", background: "none", cursor: "pointer", font: "500 13px var(--font-display)", color: "var(--signal-deep)" }}>Zurücksetzen</button></span>
        </SFilterBar>
      </SReveal>
      {/* Tages-Strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(104px, 1fr))", gap: 10, marginBottom: 30 }}>
        {TAGE.map(([label, n], i) => {
          const on = i === sel;
          return (
            <button key={i} onClick={() => setSel(i)} style={{ textAlign: "left", border: "none", cursor: "pointer", borderRadius: 12, padding: "16px 16px 14px", background: on ? "var(--signal)" : "#FFFFFF", color: on ? "var(--on-signal)" : "var(--ink)", boxShadow: on ? "none" : "inset 0 0 0 1px var(--hairline-dark)", transition: "background .3s var(--ease-unio)" }}>
              <div className="u-label" style={{ fontSize: 8.5, color: on ? "rgba(26,19,5,0.7)" : "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: 6 }}>{label}{i === 3 && <span style={{ width: 5, height: 5, borderRadius: "50%", background: on ? "var(--ink)" : "var(--signal)" }}></span>}</div>
              <div style={{ font: "500 30px/1 var(--font-display)", letterSpacing: "-0.02em", marginTop: 12, fontVariantNumeric: "tabular-nums" }}>{n}<span style={{ font: "9px var(--font-mono)", marginLeft: 5, color: on ? "rgba(26,19,5,0.7)" : "var(--text-muted)" }}>Leads</span></div>
              <div style={{ height: 2, borderRadius: 2, marginTop: 12, background: on ? "rgba(26,19,5,0.25)" : "var(--paper-2)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: (n / max * 100) + "%", background: on ? "var(--ink)" : "color-mix(in oklch, var(--signal) 60%, #E2DCCF)" }}></div>
              </div>
            </button>
          );
        })}
      </div>
      <STable cols={cols}>
        {rows.length === 0
          ? <div style={{ padding: 24 }}><window.EmptyState icon="leads" text="Keine Leads an diesem Tag." /></div>
          : rows.map((l, i) => (
            <SRow key={l.id} cols={cols} delay={i * 50} onClick={() => {}} cells={[
              <SCell2 a={l.t} b={"#" + l.id} />,
              <SCell2 a={l.name} b={l.mail + " · " + l.tel} />,
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><SStatus kind="neutral">{l.kind}</SStatus><span style={{ font: "500 13.5px var(--font-display)", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.obj}</span></div>
                <div className="u-label" style={{ color: "rgba(20,18,16,0.45)", fontSize: 8.5, marginTop: 6 }}>{l.addr}</div>
              </div>,
              <SStatus kind={l.status}>{{ neu: "Neu", qualifiziert: "Qualifiziert", kontaktiert: "Kontaktiert", kontaktversuch: "Kontaktversuch", verloren: "Verloren" }[l.status]}</SStatus>,
              <SStatus kind="neutral">{l.src}</SStatus>,
              <SIcon name="arrow" size={15} stroke="var(--text-muted)" />,
            ]} />
          ))}
      </STable>
    </div>
  );
}

Object.assign(window, { ImmoUebersicht, Leads });
