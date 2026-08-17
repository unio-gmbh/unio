/* UNIO Makler-Dashboard: Bereichs-Wrapper mit Sub-Navigation.
   Objekte (Immobilien, Entwürfe, Portale, Medien) und CIRCLE (Puls, Lead-Pool, Referral, Saison):
   Tiefe ohne die Sidebar zu überladen (max. 8 Bereiche, Research-Regel D1). */

function MkSubnav({ tabs, aktiv, setzen }) {
  return (
    <div className="mk-subnav" style={{ marginTop: 30 }}>
      {tabs.map(([id, l, zahl]) => (
        <button key={id} className={aktiv === id ? "on" : ""} onClick={() => { setzen(id); window.scrollTo(0, 0); }}>
          {l}{zahl != null && <span className="zahl">{zahl}</span>}
        </button>
      ))}
    </div>
  );
}

/* ---------- Portale: Sync-Matrix über alle Objekte und Kanäle ---------- */
const MK_PORTALE = ["unio.at", "willhaben", "ImmoScout24", "Der Standard"];
const MK_PORTAL_OBJ = [
  { id: "beheim", status: ["ok", "ok", "ok", "aus"], views: 118, anfragen: 12 },
  { id: "albrecht", status: ["ok", "ok", "fehler", "ok"], views: 264, anfragen: 31 },
  { id: "ecoluxe", status: ["ok", "wartet", "ok", "aus"], views: 92, anfragen: 6 },
  { id: "schoenbrunn", status: ["ok", "ok", "ok", "ok"], views: 147, anfragen: 12 },
  { id: "obenzwei", status: ["ok", "aus", "aus", "aus"], views: 41, anfragen: 3 },
];
function MkPortale({ geheZu, daten, setDaten }) {
  const [toast, setToast] = React.useState(null);
  const fehler = daten.filter((o) => o.status.includes("fehler")).length;
  const wartet = daten.filter((o) => o.status.includes("wartet")).length;
  const punkt = (st) => ({ ok: "#2E7D46", fehler: "#B3261E", wartet: "var(--signal)", aus: "var(--hairline-dark)" }[st]);
  const label = { ok: "Synchron", fehler: "Fehler", wartet: "Überträgt", aus: "Nicht gelistet" };
  const reparieren = (oi, ki) => {
    setDaten((d) => d.map((o, i) => i === oi ? { ...o, status: o.status.map((s, k) => k === ki ? "ok" : s) } : o));
    setToast("Neu übertragen · Sync läuft");
    setTimeout(() => setToast(null), 2400);
  };
  const alleNeu = () => { setDaten((d) => d.map((o) => ({ ...o, status: o.status.map((s) => s === "fehler" || s === "wartet" ? "ok" : s) }))); setToast("Alle Kanäle neu übertragen"); setTimeout(() => setToast(null), 2400); };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14, flexWrap: "wrap", margin: "26px 0 14px" }}>
        <div>
          <span className="mk-mono" style={{ color: "var(--signal-deep)" }}>Portal-Verteilung · einmal erfasst, überall synchron</span>
          <h2 style={{ margin: "6px 0 0", font: "500 20px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>
            {fehler > 0 ? fehler + " Kanal mit Fehler" : "Alle Kanäle synchron"}{wartet > 0 ? ", " + wartet + " überträgt" : ""}
          </h2>
        </div>
        {(fehler > 0 || wartet > 0) && <button className="mk-btn" onClick={alleNeu}>Alle problematischen neu übertragen</button>}
      </div>
      <div className="mk-card mk-scrollx" style={{ padding: "4px 6px" }}>
        <table className="mk-tab" style={{ minWidth: 620 }}>
          <thead>
            <tr>
              <th>Objekt</th>
              {MK_PORTALE.map((p) => <th key={p}>{p}</th>)}
              <th style={{ textAlign: "right" }}>Views</th>
              <th style={{ textAlign: "right" }}>Anfragen</th>
            </tr>
          </thead>
          <tbody>
            {daten.map((o, oi) => {
              const obj = window.ekObj(o.id);
              return (
                <tr key={o.id} className="zeile">
                  <td onClick={() => geheZu({ art: "objekt", id: o.id })}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
                      <img src={obj.img} alt="" style={{ width: 34, height: 26, borderRadius: 6, objectFit: "cover" }} />
                      <b style={{ fontWeight: 500 }}>{obj.t}</b>
                    </span>
                  </td>
                  {o.status.map((st, ki) => (
                    <td key={ki}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                        <span style={{ width: 8, height: 8, borderRadius: 99, background: punkt(st), flex: "0 0 auto" }}></span>
                        <span style={{ fontSize: 12, color: st === "fehler" ? "#B3261E" : "var(--text-muted)" }}>{label[st]}</span>
                        {st === "fehler" && <button className="mk-btn ghost tiny" style={{ padding: "5px 9px", fontSize: 10.5 }} onClick={(e) => { e.stopPropagation(); reparieren(oi, ki); }}>Fix</button>}
                      </span>
                    </td>
                  ))}
                  <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{o.views}</td>
                  <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{o.anfragen}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mk-mono" style={{ marginTop: 12 }}>Fehlerdetails: ImmoScout verlangt Titelbild ab 1600 px · Anfragen laufen automatisch in die Kontakte</p>
      {toast && <div style={{ position: "fixed", left: "50%", bottom: 30, transform: "translateX(-50%)", zIndex: 150, background: "var(--ink)", color: "var(--paper)", borderRadius: 999, padding: "11px 20px", font: "500 13px var(--font-display)" }}><span style={{ color: "var(--signal)", marginRight: 8 }}>✓</span>{toast}</div>}
    </div>
  );
}

/* ---------- Medien: pro Objekt, mit Shop-Andockung ---------- */
const MK_MEDIEN = [
  { id: "beheim", fotos: 24, video: 1, grundriss: 2, drohne: 6, offen: null },
  { id: "albrecht", fotos: 31, video: 2, grundriss: 4, drohne: 8, offen: "Immoreel in Korrekturschleife" },
  { id: "ecoluxe", fotos: 18, video: 1, grundriss: 1, drohne: 0, offen: null },
  { id: "schoenbrunn", fotos: 8, video: 0, grundriss: 1, drohne: 0, offen: "Fotoshooting: Termin offen" },
  { id: "obenzwei", fotos: 12, video: 0, grundriss: 2, drohne: 4, offen: null },
];
function MkMedien({ geheZu, onNav }) {
  return (
    <div>
      <div style={{ margin: "26px 0 14px" }}>
        <span className="mk-mono" style={{ color: "var(--signal-deep)" }}>Mediathek · alles am Objekt, nichts im Downloads-Ordner</span>
        <h2 style={{ margin: "6px 0 0", font: "500 20px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Medien</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
        {MK_MEDIEN.map((m) => {
          const o = window.ekObj(m.id);
          const wenig = m.fotos < 12;
          return (
            <div key={m.id} className="mk-card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ position: "relative", cursor: "pointer" }} onClick={() => geheZu({ art: "objekt", id: m.id })}>
                <img src={o.img} alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
                {wenig && <span className="mk-pill hot" style={{ position: "absolute", top: 10, left: 10 }}>Zu wenig Fotos</span>}
              </div>
              <div style={{ padding: "13px 15px" }}>
                <b style={{ font: "500 14.5px var(--font-display)", color: "var(--ink)", display: "block" }}>{o.t}</b>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "8px 0 0" }}>
                  {[["Fotos", m.fotos], ["Video", m.video], ["Grundriss", m.grundriss], ["Drohne", m.drohne]].map(([l, n]) => (
                    <span key={l} style={{ fontSize: 11.5, color: n === 0 ? "var(--text-muted)" : "var(--ink)" }}>
                      <b style={{ fontWeight: 500 }}>{n}</b> <span style={{ color: "var(--text-muted)" }}>{l}</span>
                    </span>
                  ))}
                </div>
                {m.offen && <p className="mk-mono" style={{ margin: "9px 0 0", color: "var(--signal-deep)" }}>{m.offen}</p>}
                <div style={{ display: "flex", gap: 7, marginTop: 11, flexWrap: "wrap" }}>
                  <button className="mk-btn ghost tiny" onClick={() => geheZu({ art: "objekt", id: m.id })}>Galerie</button>
                  <button className="mk-btn tiny" onClick={() => onNav && onNav("marketing")}>{m.offen ? "Auftrag ansehen" : "Shooting buchen"}</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mk-mono" style={{ marginTop: 14 }}>Buchungen laufen über den Shop-Prozess: Briefing, Terminwahl, Ergebnis, Korrekturschleifen</p>
    </div>
  );
}

/* ---------- Objekte-Bereich mit Sub-Navigation ---------- */
function MkObjekte({ geheZu, onNav }) {
  const [tab, setTab] = React.useState("immobilien");
  const [portale, setPortale] = React.useState(MK_PORTAL_OBJ);
  const fehler = portale.filter((o) => o.status.includes("fehler")).length;
  return (
    <div style={{ maxWidth: 1360, margin: "0 auto" }}>
      <MkSubnav aktiv={tab} setzen={setTab} tabs={[
        ["immobilien", "Immobilien", 8],
        ["anlage", "Entwürfe & Anlage", 2],
        ["portale", "Portale", fehler > 0 ? fehler + " ⚠" : null],
        ["medien", "Medien", null],
      ]} />
      {tab === "immobilien" && <window.ImmoUebersicht onNav={onNav} />}
      {tab === "anlage" && <window.AnlageWizard onNav={onNav} />}
      {tab === "portale" && <MkPortale geheZu={geheZu} daten={portale} setDaten={setPortale} />}
      {tab === "medien" && <MkMedien geheZu={geheZu} onNav={onNav} />}
    </div>
  );
}

/* ---------- Referral: weitergegebene und erhaltene Leads mit Split ---------- */
const MK_REFERRAL = [
  { name: "Ehepaar Grabner", an: "Sarah Leitner", objekt: "Reihenhaus 1230", status: "Abgeschlossen", anteil: 3200, richtung: "raus" },
  { name: "T. Weinberger", an: "Petra Steindl", objekt: "Altbau 1090", status: "In Verhandlung", anteil: 2400, richtung: "raus" },
  { name: "Sophie Brandl", an: "von Lukas Brandtner", objekt: "sucht 1180", status: "Qualifizierung", anteil: null, richtung: "rein" },
];
function MkReferral({ geheZu }) {
  const [sheet, setSheet] = React.useState(false);
  const summe = MK_REFERRAL.filter((r) => r.richtung === "raus" && r.anteil).reduce((s, r) => s + r.anteil, 0);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14, flexWrap: "wrap", margin: "26px 0 14px" }}>
        <div>
          <span className="mk-mono" style={{ color: "var(--signal-deep)" }}>Referral · 25 % des UNIO-Anteils, Demo-Modell</span>
          <h2 style={{ margin: "6px 0 0", font: "500 20px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{window.ekEur(summe)} aus Empfehlungen</h2>
        </div>
        <button className="mk-btn" onClick={() => setSheet(true)}>Lead weitergeben</button>
      </div>
      <div className="mk-card mk-scrollx" style={{ padding: "4px 6px" }}>
        <table className="mk-tab" style={{ minWidth: 560 }}>
          <thead><tr><th>Lead</th><th>Richtung</th><th>Objekt / Suche</th><th>Status</th><th style={{ textAlign: "right" }}>Dein Anteil</th></tr></thead>
          <tbody>
            {MK_REFERRAL.map((r) => (
              <tr key={r.name} className="zeile" onClick={() => geheZu({ art: "screen", id: "kontakte" })}>
                <td><b style={{ fontWeight: 500 }}>{r.name}</b></td>
                <td><span className={"mk-pill " + (r.richtung === "rein" ? "ok" : "")}>{r.richtung === "rein" ? "Erhalten" : "Weitergegeben · " + r.an}</span></td>
                <td style={{ color: "var(--text-muted)" }}>{r.objekt}</td>
                <td>{r.status}</td>
                <td style={{ textAlign: "right", fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>{r.anteil ? window.ekEur(r.anteil) : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <window.MkOver offen={sheet} onClose={() => setSheet(false)}>
        <h3>Lead weitergeben</h3>
        <p style={{ margin: "6px 0 16px", fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.55 }}>Du behältst 25 % des UNIO-Anteils, wenn der Deal zustande kommt. Der Kontakt bleibt in deiner Akte sichtbar.</p>
        <div style={{ display: "grid", gap: 8 }}>
          {[["Sarah Leitner", "1180, 1190 · Altbau"], ["Petra Steindl", "1090, 1080 · Anlage"], ["Lukas Brandtner", "1170, 1160 · Dachgeschoss"]].map(([n, g]) => (
            <button key={n} className="mk-btn ghost" style={{ justifyContent: "space-between", padding: "13px 17px" }} onClick={() => setSheet(false)}>
              <span>{n}</span><span className="mk-mono">{g}</span>
            </button>
          ))}
        </div>
        <p className="mk-mono" style={{ marginTop: 14 }}>Split-Vorschau: bei € 600.000 Kaufpreis rund € 2.700 für dich (Demo)</p>
      </window.MkOver>
    </div>
  );
}

/* ---------- Lead-Pool als eigener Bereich (größer als das Widget) ---------- */
function MkPoolSeite({ tueMk, geheZu }) {
  return (
    <div>
      <div style={{ margin: "26px 0 8px" }}>
        <span className="mk-mono" style={{ color: "var(--signal-deep)" }}>Lead-Pool · kein Lead stirbt in einem stillen Account</span>
        <h2 style={{ margin: "6px 0 0", font: "500 20px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Community-Leads</h2>
        <p style={{ margin: "8px 0 0", fontSize: 13.5, color: "var(--text-muted)", maxWidth: 620, lineHeight: 1.6 }}>
          Leads ohne festen Betreuer landen hier. Wer claimt, hat 4 Stunden für den Erstkontakt, sonst fällt der Lead automatisch zurück in den Pool. So bleibt Geschwindigkeit eine Community-Regel, nicht eine Bitte.
        </p>
      </div>
      <window.CirclePond tueMk={tueMk} geheZu={geheZu} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12, marginTop: 14 }}>
        {[["Dein Claim-Schnitt", "8 Min", "vom Eingang bis zum Griff"], ["Rückfall-Quote", "0 %", "keiner deiner Claims verfallen"], ["Aus dem Pool gewonnen", "3 Deals", "seit Saisonstart"]].map(([l, v, s]) => (
          <div key={l} className="mk-card" style={{ padding: "14px 16px" }}>
            <span className="mk-mono">{l}</span>
            <b style={{ display: "block", font: "500 22px var(--font-display)", letterSpacing: "-.02em", color: "var(--ink)", margin: "4px 0 2px" }}>{v}</b>
            <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- CIRCLE-Bereich mit Sub-Navigation ---------- */
function MkCircle({ onNav, geheZu, tueMk }) {
  const [tab, setTab] = React.useState("puls");
  return (
    <div style={{ maxWidth: 1360, margin: "0 auto" }}>
      <MkSubnav aktiv={tab} setzen={setTab} tabs={[
        ["puls", "Puls", null],
        ["pool", "Lead-Pool", 3],
        ["referral", "Referral", null],
        ["saison", "Saison", null],
      ]} />
      {tab === "puls" && <window.DashCircle onNav={onNav} geheZu={geheZu} tueMk={tueMk} ohnePond />}
      {tab === "pool" && <MkPoolSeite tueMk={tueMk} geheZu={geheZu} />}
      {tab === "referral" && <MkReferral geheZu={geheZu} />}
      {tab === "saison" && <window.SaisonRueckblick onNav={onNav} />}
    </div>
  );
}

Object.assign(window, { MkSubnav, MkObjekte, MkCircle, MkPortale, MkMedien, MkReferral, MkPoolSeite });
