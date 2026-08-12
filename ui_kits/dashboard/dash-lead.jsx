/* UNIO LENS — Lead-Workflow: Interessenten-Funnel, Lead-bearbeiten-Overlay, Aktivität, Plattform-Export. */
const { Card: LCard, CardHead: LHead, Chip: LChip, Reveal: LRv } = window;
const LIc = (p) => <window.Icon {...p} />;

const LEADS = [
  { n: "Birgit M", st: "verloren", stL: "Verloren", mail: "birgit-mayer@gmx.at", date: "11.07.2026, 10:33", tel: "+43 680 4445773", prov: "bestätigt", notes: 0, extra: "Verloren · Kein Interesse", badge: 0 },
  { n: "Eberhard Falck", st: "kontaktversuch", stL: "Kontaktversuch", mail: "wefalck@wefalck.eu", date: "12.06.2026, 18:20", tel: "0033 674 388 818", prov: "bestätigt", notes: 2, badge: 1 },
  { n: "Thomas Höfling", st: "neu", stL: "Neu", mail: "thomashoefling@hotmail.com", date: "01.07.2026, 11:22", tel: "0660 1464275", prov: "offen", notes: 0, badge: 1 },
  { n: "Anna Radda", st: "neu", stL: "Neu", mail: "anna.radda@gmail.com", date: "17.06.2026, 21:29", tel: "0680 5554970", prov: "offen", notes: 0, badge: 1 },
  { n: "Paraskeva Tomev", st: "kontaktiert", stL: "Kontaktiert", mail: "paraskeva.tomev@gmail.com", date: "11.06.2026, 09:17", tel: "+43 660 4339561", prov: "bestätigt", notes: 4, badge: 0 },
];
const FUNNEL = [["Neu", 2], ["Kontaktversuch", 1], ["Kontaktiert", 1], ["Qualifiziert", 0], ["Besichtigung", 0]];
const VERLAUF = [
  ["phone", "Lead telefonisch nicht erreicht", "08.07.2026, 14:18 · Action · Johannes Lindner", "Ergebnis: Nicht erreicht. Folgeaction #617 wurde erstellt.", ""],
  ["mail", "Lead-Erstmail", "05.07.2026, 16:26 · → wefalck@wefalck.eu", "", "Gesendeten Link öffnen"],
  ["mail", "Willhaben-Anfrage verarbeitet", "05.07.2026, 16:26 · Inbound", "Die eingehende Anfrage wurde geparst und mit dem Lead verknüpft.", ""],
  ["clock", "Kontakt aktualisiert", "05.07.2026, 16:26 · Inbound", "Bestehende Kontaktdaten wurden aus einer Willhaben-Anfrage aktualisiert.", ""],
  ["clock", "Lead erneut angefragt", "05.07.2026, 16:26 · System", "Eine bestehende Anfrage wurde erneut empfangen und dem Lead hinzugefügt.", ""],
  ["x", "Lead als verloren markiert", "22.06.2026, 13:10 · Lead-Status", "Der Lead wurde als verloren markiert. Grund: Falsche Telefonnummer.", ""],
  ["mail", "Provisionsvereinbarung", "13.06.2026, 19:52 · System", "Eine Bestätigungs-E-Mail zur Provisionssicherung wurde an wefalck@wefalck.eu gesendet.", ""],
  ["angebote", "Provisionssicherung-PDF erstellt", "13.06.2026, 19:52 · System", "Die Provisionsvereinbarung wurde als PDF erstellt und abgelegt.", ""],
  ["check", "Provisionssicherung bestätigt", "13.06.2026, 19:52 · Provisionssicherung", "Der Interessent hat die Provisionssicherung akzeptiert.", ""],
];
const AKTIVITAET = [
  ["search", "Lead als verloren markiert", "Der Lead wurde als verloren markiert. Grund: Kein Interesse", "13.07.2026, 13:31", "Birgit M (birgit-mayer@gmx.at)", "System", "Ereignis"],
  ["mail", "Provisionsvereinbarung", "Eine Bestätigungs-E-Mail zur Provisionssicherung wurde an birgit-mayer@gmx.at gesendet.", "11.07.2026, 10:33", "Birgit M (birgit-mayer@gmx.at)", "System", "Provisionssicherung"],
  ["angebote", "Provisionssicherung-PDF erstellt", "Die Provisionsvereinbarung wurde als PDF erstellt und unter contacts/335/448/vrug/provisionsvereinbarung.pdf abgelegt.", "11.07.2026, 10:33", "Birgit M (birgit-mayer@gmx.at)", "System", "Provisionssicherung"],
  ["check", "Provisionssicherung bestätigt", "Der Interessent hat die Provisionssicherung akzeptiert.", "11.07.2026, 10:33", "Birgit M (birgit-mayer@gmx.at)", "Provisionssicherung", "Provisionssicherung"],
  ["search", "Suchprofil erstellt", "Aus der angefragten Immobilie wurde automatisch ein Suchprofil erzeugt.", "11.07.2026, 10:33", "Birgit M (birgit-mayer@gmx.at)", "System", "Erfasst"],
  ["check", "Lead erstellt", "Ein neuer Lead wurde angelegt.", "11.07.2026, 10:33", "Birgit M (birgit-mayer@gmx.at)", "System", "Erfasst"],
  ["phone", "Lead telefonisch nicht erreicht", "Ergebnis: Nicht erreicht. Folgeaction #617 wurde erstellt.", "08.07.2026, 14:18", "Eberhard Falck (wefalck@wefalck.eu)", "System", "Ereignis"],
  ["mail", "Lead-Erstmail", "Erstmail senden · Von: UNIO-VERSE GmbH · Betreff: Ihre Anfrage bei UNIO-VERSE GmbH", "05.07.2026, 16:26", "Eberhard Falck (wefalck@wefalck.eu)", "System", "E-Mail versendet"],
  ["mail", "Willhaben-Anfrage verarbeitet", "Die eingehende Anfrage wurde geparst und mit dem Lead verknüpft.", "05.07.2026, 16:26", "Eberhard Falck (wefalck@wefalck.eu)", "System", "Inbound"],
];
const PLATTFORMEN = [
  { logo: "IS", col: "var(--signal-deep)", name: "ImmobilienScout24.at", desc: "Internationale Reichweite mit Fokus auf den österreichischen Markt", date: "22. Juni 2026, 11:21", link: false, rows: [["Aktualisierung", "22. Juni 2026, 11:21", "012.00151000004BTWu_20260622_112140_project_6_change.xml", "115.6 KB", "334 ms"], ["Aktualisierung", "20. Juni 2026, 10:53", "012.00151000004BTWu_20260620_105338_project_6_change.xml", "115.6 KB", "362 ms"], ["Aktualisierung", "20. Juni 2026, 10:33", "012.00151000004BTWu_20260620_103331_project_6_change.xml", "115.4 KB", "881 ms"]] },
  { logo: "W", col: "var(--signal)", name: "willhaben.at", desc: "Eines der meistbesuchten Immobilienportale in ganz Österreich", date: "22. Juni 2026, 11:21", link: true, rows: [["Aktualisierung", "22. Juni 2026, 11:21", "20260622_112140_project_6_change.xml", "115.7 KB", "588 ms"], ["Aktualisierung", "20. Juni 2026, 10:53", "20260620_105337_project_6_change.xml", "115.7 KB", "638 ms"], ["Aktualisierung", "20. Juni 2026, 10:33", "20260620_103332_project_6_change.xml", "115.4 KB", "695 ms"]] },
];

function LPill({ kind, children }) {
  const map = { neu: ["#EEF4FB", "#3D6FA8"], kontaktversuch: ["#EEF4FB", "#3D6FA8"], kontaktiert: ["var(--signal-soft)", "var(--signal-deep)"], verloren: ["#FBEFEC", "#B4533B"], pos: ["#EEF5EC", "#4A7A4E"], warn: ["var(--signal-soft)", "var(--signal-deep)"] };
  const [bg, fg] = map[kind] || ["var(--paper-2)", "var(--text-muted)"];
  return <span className="u-label" style={{ fontSize: 8, padding: "5px 10px", borderRadius: 999, background: bg, color: fg, whiteSpace: "nowrap" }}>{children}</span>;
}
function ProjektBanner({ onNav }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderRadius: 12, background: "var(--signal-soft)", boxShadow: "inset 0 0 0 1px rgba(255,170,9,0.25)", marginTop: 16 }}>
      <span style={{ width: 36, height: 36, borderRadius: 9, background: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--signal-deep)", flex: "none" }}><LIc name="firma" size={17} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="u-label" style={{ fontSize: 8, color: "var(--signal-deep)" }}>Teil eines Projekts</div>
        <div style={{ font: "500 14px var(--font-display)", color: "var(--ink)", marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Albrechts Townhouses — Stockerauer Straße 53, 2100 Korneuburg</div>
      </div>
      <button onClick={() => onNav && onNav("projekt")} style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "none", cursor: "pointer", borderRadius: 999, padding: "9px 16px", background: "#FFFFFF", font: "500 12.5px var(--font-display)", color: "var(--ink)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>Projekt ansehen <LIc name="ext" size={13} /></button>
    </div>
  );
}

/* ===== Interessenten: Suche + Funnel + Liste ===== */
function InteressentenFunnelTab() {
  const [lead, setLead] = React.useState(null);
  return (
    <React.Fragment>
      <LRv>
        <LCard pad={20}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "10px 14px", borderRadius: 10, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", minWidth: 240 }}>
              <LIc name="search" size={15} stroke="var(--text-muted)" />
              <input placeholder="Name, E-Mail oder Telefon…" style={{ border: "none", outline: "none", background: "none", font: "400 13.5px var(--font-display)", color: "var(--ink)", width: "100%" }} />
            </label>
            <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)", marginLeft: "auto" }}><strong style={{ color: "var(--ink)" }}>5</strong> Interessenten</span>
          </div>
          <div style={{ display: "flex", alignItems: "stretch", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
            <div style={{ padding: "10px 16px 10px 0", borderRight: "1px solid var(--hairline-dark)" }}>
              <div style={{ font: "500 26px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>5</div>
              <div className="u-label" style={{ fontSize: 7.5, color: "var(--text-muted)", marginTop: 5 }}>Alle</div>
            </div>
            <div style={{ flex: 1, display: "flex", gap: 4, minWidth: 420 }}>
              {FUNNEL.map(([l, c], i) => (
                <div key={l} style={{ flex: 1, padding: "10px 14px", background: c ? "var(--signal-soft)" : "var(--paper-2)", clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: c ? "var(--signal)" : "var(--hairline-dark)", flex: "none" }}></span>
                    <span className="u-label" style={{ fontSize: 7.5, color: c ? "var(--signal-deep)" : "var(--text-muted)" }}>{l}</span>
                  </div>
                  <div style={{ font: "500 20px/1 var(--font-display)", color: c ? "var(--ink)" : "var(--text-muted)", marginTop: 7, marginLeft: 13 }}>{c}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, justifyContent: "center" }}>
              {[["check", "Abgeschlossen", 0, "pos"], ["x", "Verloren", 1, "verloren"]].map(([ic, l, c, tone]) => (
                <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
                  <LIc name={ic} size={12} stroke={tone === "verloren" ? "#B4533B" : "var(--signal-deep)"} />
                  <span className="u-label" style={{ fontSize: 8, color: "var(--text-muted)" }}>{l}</span>
                  <span style={{ font: "500 13px var(--font-display)", color: "var(--ink)" }}>{c}</span>
                </span>
              ))}
            </div>
          </div>
        </LCard>
      </LRv>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
        {LEADS.map((l, i) => (
          <LRv key={l.n} delay={i * 50}>
            <LCard pad={20} hover>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 18, alignItems: "center" }}>
                <span style={{ position: "relative", width: 44, height: 44, borderRadius: "50%", background: "var(--signal-soft)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--signal-deep)", flex: "none" }}>
                  <LIc name="benutzer" size={18} />
                  {l.badge > 0 && <span style={{ position: "absolute", top: -4, left: -4, width: 17, height: 17, borderRadius: "50%", background: "#B4533B", color: "#FFF", font: "600 9.5px var(--font-display)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{l.badge}</span>}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ font: "500 15px var(--font-display)", color: "var(--ink)" }}>{l.n}</span>
                    <LPill kind={l.st}>{l.stL}</LPill>
                    <span style={{ font: "12px var(--font-mono)", color: "var(--text-muted)" }}>{l.mail}</span>
                  </div>
                  <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 7 }}>Bieterverfahren Stilaltbau · 1130 Wien · {l.date} · Makler: Johannes Lindner</div>
                  <div style={{ display: "flex", gap: 7, marginTop: 9, flexWrap: "wrap" }}>
                    <LPill kind={l.prov === "bestätigt" ? "pos" : "warn"}>Provisionssicherung {l.prov}</LPill>
                    {l.notes > 0 && <LPill>{l.notes} Notizen</LPill>}
                    {l.extra && <LPill kind="verloren">{l.extra}</LPill>}
                  </div>
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 15px", borderRadius: 999, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "12.5px var(--font-mono)", color: "var(--ink)", whiteSpace: "nowrap" }}><LIc name="phone" size={13} stroke="var(--signal-deep)" />{l.tel}</span>
                <window.UNIODesignSystem_b6216a.Button variant="ghost" size="sm" onClick={() => setLead(l)}>Details</window.UNIODesignSystem_b6216a.Button>
              </div>
            </LCard>
          </LRv>
        ))}
      </div>
      {lead && <LeadModal lead={lead} onClose={() => setLead(null)} />}
    </React.Fragment>
  );
}

/* ===== Lead bearbeiten — Overlay ===== */
const STEPS = ["Neu", "Kontaktversuch", "Kontaktiert", "Qualifiziert", "Besichtigung", "Angebot", "Abschluss"];
function LeadModal({ lead, onClose }) {
  const [view, setView] = React.useState("telefonat");
  const [sub, setSub] = React.useState(null); // notizen | suchkriterien
  const [verlaufOpen, setVerlaufOpen] = React.useState(true);
  const [erg, setErg] = React.useState("");
  const [ergOpen, setErgOpen] = React.useState(false);
  const cur = 1;
  const actions = [["kalender", "Besichtigung buchen", "besichtigung"], ["search", "Suchkriterien", "sk"], ["sliders", "Suchkriterien +", "sk"], ["angebote", "Kaufanbot", null], ["mail", "Nachricht", null], ["edit", "Notizen", "notizen", lead.notes || 2]];
  const initials = lead.n.split(" ").map((w) => w[0]).join("");
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(11,10,9,0.45)", WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 28 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(1360px, 100%)", maxHeight: "88vh", background: "var(--paper)", borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 30px 80px rgba(11,10,9,0.35)" }}>
        {/* Kopf: Titel + Stepper */}
        <div style={{ display: "flex", alignItems: "center", gap: 28, padding: "20px 28px", borderBottom: "1px solid var(--hairline-dark)", background: "#FFFFFF" }}>
          <div style={{ minWidth: 200 }}>
            <div style={{ font: "500 18px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>Lead bearbeiten</div>
            <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 5 }}>Action bearbeiten · Verlauf prüfen</div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, overflowX: "auto" }}>
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, flex: "none" }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "600 10px var(--font-display)", background: i < cur ? "var(--signal)" : i === cur ? "var(--ink)" : "transparent", color: i <= cur ? (i < cur ? "var(--on-signal)" : "var(--paper)") : "var(--text-muted)", boxShadow: i > cur ? "inset 0 0 0 1px var(--hairline-dark)" : "none" }}>{i < cur ? <LIc name="check" size={11} stroke="var(--on-signal)" /> : i + 1}</span>
                  <span className="u-label" style={{ fontSize: 8, color: i === cur ? "var(--ink)" : "var(--text-muted)", whiteSpace: "nowrap" }}>{s}</span>
                </span>
                {i < STEPS.length - 1 && <span style={{ width: 18, height: 1, background: "var(--hairline-dark)", flex: "none" }}></span>}
              </React.Fragment>
            ))}
            <span style={{ width: 18, height: 1, background: "var(--hairline-dark)", flex: "none" }}></span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, flex: "none" }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }}><LIc name="x" size={10} /></span>
              <span className="u-label" style={{ fontSize: 8, color: "var(--text-muted)" }}>Verloren</span>
            </span>
          </div>
          <button onClick={onClose} aria-label="Schließen" style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-muted)", padding: 6 }}><LIc name="x" size={18} /></button>
        </div>

        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          {/* Sidebar */}
          <div style={{ width: 270, flex: "none", borderRight: "1px solid var(--hairline-dark)", background: "#FFFFFF", padding: 22, overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 42, height: 42, borderRadius: 11, background: "var(--signal-soft)", color: "var(--signal-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "600 13px var(--font-display)", flex: "none" }}>{initials}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ font: "500 14.5px var(--font-display)", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lead.n}</div>
                <LPill kind={lead.st}>{lead.stL}</LPill>
              </div>
            </div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "12px var(--font-mono)", color: "var(--text-body)" }}><LIc name="mail" size={13} stroke="var(--text-muted)" />{lead.mail}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, font: "12px var(--font-mono)", color: "var(--text-body)" }}><LIc name="phone" size={13} stroke="var(--text-muted)" />{lead.tel}</span>
            </div>
            <button style={{ width: "100%", marginTop: 16, border: "none", cursor: "pointer", borderRadius: 12, padding: "14px 16px", background: "var(--signal)", color: "var(--on-signal)", textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
              <LIc name="phone" size={16} stroke="var(--on-signal)" />
              <span><span className="u-label" style={{ fontSize: 7.5, display: "block", opacity: 0.75 }}>Jetzt anrufen</span><span style={{ font: "600 15px var(--font-display)", letterSpacing: "0.01em" }}>{lead.tel}</span></span>
            </button>
            <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--hairline-dark)" }}>
              <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)" }}>Objekt</div>
              <p style={{ margin: "10px 0 0", font: "500 13px/1.5 var(--font-display)", color: "var(--ink)" }}>Bieterverfahren — Stilaltbau zum Selbstgestalten, 1130 Wien</p>
              <p className="u-label" style={{ margin: "8px 0 0", fontSize: 8, color: "var(--text-muted)" }}>zust. Johannes Lindner</p>
            </div>
            <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--hairline-dark)" }}>
              <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginBottom: 10 }}>Aktionen</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {actions.map(([ic, l, target, count]) => {
                  const on = target === view || (target === "notizen" && sub === "notizen") || (target === "sk" && sub === "suchkriterien");
                  return (
                    <button key={l} onClick={() => { if (target === "notizen") setSub("notizen"); else if (target === "sk") setSub("suchkriterien"); else if (target) setView(target); }} style={{ display: "flex", alignItems: "center", gap: 11, border: "none", cursor: "pointer", borderRadius: 10, padding: "11px 13px", background: on ? "var(--signal-soft)" : "transparent", boxShadow: on ? "inset 0 0 0 1px rgba(255,170,9,0.35)" : "inset 0 0 0 1px var(--hairline-dark)", font: "500 13px var(--font-display)", color: "var(--ink)", textAlign: "left" }}>
                      <LIc name={ic} size={15} stroke={on ? "var(--signal-deep)" : "var(--text-muted)"} />{l}
                      {count ? <span style={{ marginLeft: "auto", font: "500 11px var(--font-mono)", color: "var(--text-muted)" }}>{count}</span> : null}
                    </button>
                  );
                })}
              </div>
              <button style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", marginTop: 18, border: "none", cursor: "pointer", borderRadius: 10, padding: "11px 13px", background: "transparent", boxShadow: "inset 0 0 0 1px rgba(180,83,59,0.4)", font: "500 13px var(--font-display)", color: "#B4533B" }}><LIc name="x" size={14} stroke="#B4533B" />Lead als verloren markieren</button>
            </div>
          </div>

          {/* Hauptbereich */}
          <div style={{ flex: 1, minWidth: 0, padding: "28px 32px", overflowY: "auto" }}>
            {view === "telefonat" ? (
              <React.Fragment>
                <h3 style={{ margin: 0, font: "500 24px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Lead erneut telefonisch kontaktieren</h3>
                <p style={{ margin: "10px 0 0", font: "400 14px/1.6 var(--font-display)", color: "var(--text-muted)" }}>Der Lead wurde nicht erreicht. Bitte zum geplanten Zeitpunkt erneut versuchen.</p>
                <div style={{ marginTop: 24, borderRadius: 14, background: "#FFFFFF", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", padding: 26 }}>
                  <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>Ergebnis</div>
                  <div style={{ position: "relative", marginTop: 10, maxWidth: 320 }}>
                    <button onClick={() => setErgOpen((v) => !v)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", border: "none", cursor: "pointer", borderRadius: 10, padding: "12px 15px", background: "var(--paper)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "400 13.5px var(--font-display)", color: erg ? "var(--ink)" : "var(--text-muted)" }}>{erg || "Gesprächsergebnis auswählen"} <LIc name="arrow" size={13} style={{ transform: "rotate(90deg)" }} stroke="var(--text-muted)" /></button>
                    {ergOpen && (
                      <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 5, background: "#FFFFFF", borderRadius: 12, boxShadow: "0 16px 40px rgba(11,10,9,0.14), inset 0 0 0 1px var(--hairline-dark)", padding: 6 }}>
                        {["Erreicht", "Nicht erreicht", "Rückruf gewünscht", "Falsche Nummer", "Kein Interesse"].map((o) => (
                          <button key={o} onClick={() => { setErg(o); setErgOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", border: "none", cursor: "pointer", borderRadius: 8, padding: "10px 12px", background: erg === o ? "var(--signal-soft)" : "transparent", font: "400 13.5px var(--font-display)", color: "var(--ink)" }}>{o}</button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 20 }}>Gesprächsnotiz</div>
                  <textarea placeholder="Wichtige Gesprächspunkte dokumentieren" rows={5} style={{ display: "block", width: "100%", boxSizing: "border-box", marginTop: 10, border: "none", outline: "none", borderRadius: 10, padding: "13px 15px", background: "var(--paper)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "400 13.5px/1.6 var(--font-display)", color: "var(--ink)", resize: "vertical" }}></textarea>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
                    <window.UNIODesignSystem_b6216a.Button variant="signal" size="md" knob disabled={!erg}>Telefonat abschließen</window.UNIODesignSystem_b6216a.Button>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h3 style={{ margin: 0, font: "500 24px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Besichtigungstermin buchen</h3>
                <p style={{ margin: "10px 0 0", font: "400 14px/1.6 var(--font-display)", color: "var(--text-muted)" }}>Du buchst diesen Termin als Makler direkt für {lead.n} · <span style={{ font: "12.5px var(--font-mono)" }}>{lead.mail}</span></p>
                <div style={{ marginTop: 24, borderRadius: 14, background: "#FFFFFF", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", padding: 26 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
                    <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>Makler-Kalender</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 9, borderRadius: 999, padding: "8px 15px", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "400 13px var(--font-display)", color: "var(--ink)" }}>Johannes Lindner · johannes@unio.at · zuständig <LIc name="arrow" size={12} style={{ transform: "rotate(90deg)" }} stroke="var(--text-muted)" /></span>
                  </div>
                  <MiniKalender />
                </div>
              </React.Fragment>
            )}
          </div>

          {/* Lead-Verlauf */}
          {verlaufOpen ? (
            <div style={{ width: 320, flex: "none", borderLeft: "1px solid var(--hairline-dark)", background: "#FFFFFF", display: "flex", flexDirection: "column", minHeight: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: "1px solid var(--hairline-dark)" }}>
                <span className="u-label" style={{ fontSize: 8.5, color: "var(--signal-deep)", display: "inline-flex", alignItems: "center", gap: 8 }}><LIc name="clock" size={14} stroke="var(--signal-deep)" />Lead-Verlauf</span>
                <button onClick={() => setVerlaufOpen(false)} aria-label="Verlauf einklappen" style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4 }}><LIc name="arrow" size={14} /></button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
                {VERLAUF.map(([ic, t, meta, desc, link], i) => (
                  <div key={t + i} style={{ display: "flex", gap: 12, paddingBottom: 18, position: "relative" }}>
                    {i < VERLAUF.length - 1 && <span style={{ position: "absolute", left: 13, top: 28, bottom: 0, width: 1, background: "var(--hairline-dark)" }}></span>}
                    <span style={{ width: 27, height: 27, borderRadius: "50%", background: ic === "x" ? "#FBEFEC" : "var(--signal-soft)", color: ic === "x" ? "#B4533B" : "var(--signal-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none", zIndex: 1 }}><LIc name={ic} size={12} /></span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ font: "500 12.5px var(--font-display)", color: "var(--ink)" }}>{t}</div>
                      <div className="u-label" style={{ fontSize: 7.5, color: "var(--text-muted)", marginTop: 4 }}>{meta}</div>
                      {desc && <p style={{ margin: "6px 0 0", font: "400 11.5px/1.5 var(--font-display)", color: "var(--text-muted)" }}>{desc}</p>}
                      {link && <button style={{ marginTop: 7, border: "none", cursor: "pointer", borderRadius: 7, padding: "5px 10px", background: "var(--signal-soft)", font: "500 11px var(--font-display)", color: "var(--signal-deep)" }}>{link}</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <button onClick={() => setVerlaufOpen(true)} style={{ width: 46, flex: "none", borderLeft: "1px solid var(--hairline-dark)", border: "none", background: "#FFFFFF", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, paddingTop: 20 }}>
              <LIc name="clock" size={15} stroke="var(--signal-deep)" />
              <span className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", writingMode: "vertical-rl" }}>Verlauf</span>
            </button>
          )}
        </div>
      </div>
      {sub === "notizen" && <NotizenModal onClose={() => setSub(null)} />}
      {sub === "suchkriterien" && <SuchkriterienModal onClose={() => setSub(null)} />}
    </div>
  );
}

function MiniKalender() {
  const [sel, setSel] = React.useState(22);
  const weeks = [[29, 30, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11, 12], [13, 14, 15, 16, 17, 18, 19], [20, 21, 22, 23, 24, 25, 26], [27, 28, 29, 30, 31, 1, 2]];
  return (
    <div style={{ marginTop: 22, maxWidth: 440 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button aria-label="Voriger Monat" style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-muted)" }}><LIc name="back" size={15} /></button>
        <span style={{ font: "500 14px var(--font-display)", color: "var(--ink)" }}>Juli 2026</span>
        <button aria-label="Nächster Monat" style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-muted)" }}><LIc name="arrow" size={15} /></button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginTop: 14 }}>
        {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => <span key={d} className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", textAlign: "center", padding: "6px 0" }}>{d}</span>)}
        {weeks.flat().map((d, i) => {
          const off = (i < 7 && d > 20) || (i > 27 && d < 10);
          const on = !off && d === sel;
          return <button key={i} onClick={() => !off && setSel(d)} disabled={off} style={{ border: "none", cursor: off ? "default" : "pointer", borderRadius: 9, padding: "10px 0", background: on ? "var(--signal)" : "transparent", color: off ? "var(--hairline-dark)" : on ? "var(--on-signal)" : "var(--ink)", font: `${on ? 600 : 400} 13px var(--font-display)`, boxShadow: off || on ? "none" : "inset 0 0 0 1px var(--hairline)" }}>{d}</button>;
        })}
      </div>
    </div>
  );
}

/* ===== Sub-Modals ===== */
function SubShell({ title, sub, onClose, children, width = 620 }) {
  return (
    <div onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ position: "fixed", inset: 0, zIndex: 220, background: "rgba(11,10,9,0.35)", display: "flex", alignItems: "center", justifyContent: "center", padding: 28 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: `min(${width}px, 100%)`, maxHeight: "80vh", overflowY: "auto", background: "#FFFFFF", borderRadius: 16, padding: 28, boxShadow: "0 30px 70px rgba(11,10,9,0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <div><div style={{ font: "500 19px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>{title}</div><p style={{ margin: "7px 0 0", font: "400 13px var(--font-display)", color: "var(--text-muted)" }}>{sub}</p></div>
          <button onClick={onClose} aria-label="Schließen" style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4 }}><LIc name="x" size={17} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
function NotizenModal({ onClose }) {
  const NOTES = [["Telefonnotiz", "11.06.2026, 12:11 · Johannes Lindner", "nicht erreicht"], ["Notiz", "11.06.2026, 12:10 · Johannes Lindner", "Kontaktiert, nicht erreicht"]];
  return (
    <SubShell title="Notizen" sub="Interne Notizen zu Eberhard Falck." onClose={onClose}>
      <div style={{ marginTop: 20, borderRadius: 12, background: "var(--paper)", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: 8 }}><LIc name="edit" size={13} stroke="var(--signal-deep)" />Bisherige Notizen</span>
          <span style={{ font: "500 11px var(--font-mono)", color: "var(--text-muted)" }}>2</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
          {NOTES.map(([k, meta, txt]) => (
            <div key={meta} style={{ borderRadius: 10, background: "#FFFFFF", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", padding: "14px 16px" }}>
              <div><span style={{ font: "600 12px var(--font-display)", color: "var(--ink)" }}>{k}</span> <span className="u-label" style={{ fontSize: 7.5, color: "var(--text-muted)", marginLeft: 8 }}>{meta}</span></div>
              <span className="u-label" style={{ display: "inline-block", fontSize: 7.5, color: "var(--signal-deep)", background: "var(--signal-soft)", borderRadius: 6, padding: "4px 9px", marginTop: 9 }}>Objekt: Bieterverfahren — Stilaltbau, 1130 Wien</span>
              <p style={{ margin: "9px 0 0", font: "400 13px var(--font-display)", color: "var(--text-body)" }}>{txt}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 20 }}>Notiz</div>
      <textarea placeholder="Interne Notiz zu diesem Kontakt erfassen" rows={4} style={{ display: "block", width: "100%", boxSizing: "border-box", marginTop: 10, border: "none", outline: "none", borderRadius: 10, padding: "13px 15px", background: "var(--paper)", boxShadow: "inset 0 0 0 2px var(--signal)", font: "400 13.5px/1.6 var(--font-display)", color: "var(--ink)", resize: "vertical" }}></textarea>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
        <span className="u-label" style={{ fontSize: 8, color: "var(--text-muted)" }}>Wird nicht im Lead-Verlauf angezeigt.</span>
        <window.UNIODesignSystem_b6216a.Button variant="signal" size="sm" knob>Notiz speichern</window.UNIODesignSystem_b6216a.Button>
      </div>
    </SubShell>
  );
}
function SuchkriterienModal({ onClose }) {
  const PROFILES = [["Wohnung", "Automatisch erstellt aus Immobilie #25", ["Wohnung", "Kauf", "€ 552.000 – 828.000", "121 – 182 m²", "6 – 7 Zimmer"]], ["Wohnung", "Automatisch erstellt aus Immobilie #21", ["Wohnung", "Kauf", "€ 620.000 – 930.000", "122 – 183 m²", "6 – 7 Zimmer"]]];
  return (
    <SubShell title="Suchkriterien" sub="Gespeicherte Suchprofile für Eberhard Falck." onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
        {PROFILES.map(([t, s, chips], i) => (
          <div key={i} style={{ borderRadius: 12, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", padding: "18px 20px" }}>
            <div style={{ font: "500 15px var(--font-display)", color: "var(--ink)" }}>{t}</div>
            <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 6 }}>{s}</div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 12 }}>
              {chips.map((c) => <span key={c} style={{ font: "400 12px var(--font-display)", color: "var(--ink-2)", borderRadius: 999, padding: "6px 12px", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>{c}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
        <window.UNIODesignSystem_b6216a.Button variant="ghost" size="sm" onClick={onClose}>Schließen</window.UNIODesignSystem_b6216a.Button>
        <window.UNIODesignSystem_b6216a.Button variant="signal" size="sm" knob>Suchkriterien hinzufügen</window.UNIODesignSystem_b6216a.Button>
      </div>
    </SubShell>
  );
}

/* ===== Aktivität — Timeline ===== */
function AktivitaetTab() {
  return (
    <LRv>
      <LCard pad={28}>
        {AKTIVITAET.map(([ic, t, desc, date, who, quelle, tag], i) => (
          <div key={t + i} style={{ display: "flex", gap: 16, position: "relative", paddingBottom: i < AKTIVITAET.length - 1 ? 26 : 0 }}>
            {i < AKTIVITAET.length - 1 && <span style={{ position: "absolute", left: 15, top: 34, bottom: 0, width: 1, background: "var(--hairline-dark)" }}></span>}
            <span style={{ width: 31, height: 31, borderRadius: "50%", background: "#FFFFFF", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--signal-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none", zIndex: 1 }}><LIc name={ic} size={14} /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 16 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ font: "500 14px var(--font-display)", color: "var(--ink)" }}>{t}</div>
                  <p style={{ margin: "6px 0 0", font: "400 13px/1.55 var(--font-display)", color: "var(--text-muted)" }}>{desc}</p>
                  <div className="u-label" style={{ fontSize: 8, color: "var(--text-muted)", marginTop: 8, display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <span>{date}</span><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><LIc name="benutzer" size={11} />{who}</span><span>Quelle: {quelle}</span>
                  </div>
                </div>
                <LPill kind={tag === "Provisionssicherung" ? "pos" : tag === "Inbound" || tag === "E-Mail versendet" ? "kontaktversuch" : undefined}>{tag}</LPill>
              </div>
            </div>
          </div>
        ))}
      </LCard>
    </LRv>
  );
}

/* ===== Plattform Export v2 ===== */
function PlattformExportTab() {
  const [sel, setSel] = React.useState({});
  const anySel = Object.values(sel).some(Boolean);
  return (
    <LRv>
      <LCard pad={28}>
        <h3 style={{ margin: 0, font: "500 21px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>Immobilie veröffentlichen</h3>
        <p style={{ margin: "8px 0 0", font: "400 13.5px var(--font-display)", color: "var(--text-muted)" }}>Wähle die Plattformen, auf denen dein Inserat veröffentlicht werden soll.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 22 }}>
          {PLATTFORMEN.map((p) => <PlattformCard key={p.name} p={p} selected={!!sel[p.name]} onToggle={() => setSel((s) => ({ ...s, [p.name]: !s[p.name] }))} />)}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--hairline-dark)" }}>
          <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>{anySel ? Object.values(sel).filter(Boolean).length + " Plattform(en) ausgewählt" : "Keine Plattform ausgewählt"}</span>
          <window.UNIODesignSystem_b6216a.Button variant="signal" size="md" knob disabled={!anySel}>Veröffentlichen</window.UNIODesignSystem_b6216a.Button>
        </div>
      </LCard>
    </LRv>
  );
}
function PlattformCard({ p, selected, onToggle }) {
  const [open, setOpen] = React.useState(true);
  return (
    <div style={{ borderRadius: 14, boxShadow: selected ? "inset 0 0 0 2px var(--signal)" : "inset 0 0 0 1px var(--hairline-dark)", padding: 22, transition: "box-shadow .25s var(--ease-unio)" }}>
      <div style={{ display: "flex", alignItems: "start", gap: 16 }}>
        <span style={{ width: 46, height: 46, borderRadius: 11, background: p.col, color: "#FFF", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "600 15px var(--font-display)", flex: "none" }}>{p.logo}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: "500 16px var(--font-display)", color: "var(--ink)" }}>{p.name} <LIc name="ext" size={12} stroke="var(--text-muted)" style={{ display: "inline" }} /></div>
          <div style={{ font: "400 13px var(--font-display)", color: "var(--text-muted)", marginTop: 5 }}>{p.desc}</div>
        </div>
        <button onClick={onToggle} aria-label="Plattform auswählen" style={{ width: 26, height: 26, borderRadius: "50%", border: "none", cursor: "pointer", background: selected ? "var(--signal)" : "transparent", boxShadow: selected ? "none" : "inset 0 0 0 1.5px var(--hairline-dark)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{selected && <LIc name="check" size={13} stroke="var(--on-signal)" />}</button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16, flexWrap: "wrap" }}>
        <LPill kind="pos">{p.date}</LPill>
        {p.link && <button style={{ border: "none", background: "none", cursor: "pointer", font: "500 12px var(--font-display)", color: "var(--ink-2)", display: "inline-flex", alignItems: "center", gap: 6, padding: 0 }}><LIc name="ext" size={12} />Anzeige öffnen</button>}
        <span style={{ marginLeft: "auto", display: "flex", gap: 16 }}>
          {["Entfernen", "XML-Vorschau", "DELETE-Vorschau"].map((a) => <button key={a} style={{ border: "none", background: "none", cursor: "pointer", font: "500 12px var(--font-display)", color: a === "Entfernen" ? "#B4533B" : "var(--text-muted)", padding: 0 }}>{a}</button>)}
        </span>
      </div>
      <button onClick={() => setOpen((v) => !v)} style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "none", background: "none", cursor: "pointer", marginTop: 16, padding: 0, font: "500 12px var(--font-display)", color: "var(--ink-2)" }}>
        <LIc name="clock" size={13} />Übertragungen (13) <LIc name="arrow" size={11} style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform .25s" }} />
      </button>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 300ms var(--ease-unio)" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ marginTop: 12, borderRadius: 10, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "130px 100px 150px 1fr 80px 70px 40px", padding: "10px 16px", borderBottom: "1px solid var(--hairline-dark)", background: "var(--paper)" }}>
              {["Modus", "Status", "Datum", "Datei", "Größe", "Dauer", "XML"].map((h) => <span key={h} className="u-label" style={{ fontSize: 7.5, color: "var(--text-muted)" }}>{h}</span>)}
            </div>
            {p.rows.map(([modus, date, file, size, dur], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "130px 100px 150px 1fr 80px 70px 40px", padding: "11px 16px", borderBottom: i < p.rows.length - 1 ? "1px solid var(--hairline)" : "none", alignItems: "center" }}>
                <span><LPill kind="warn">{modus}</LPill></span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "400 11.5px var(--font-display)", color: "var(--signal-deep)" }}><LIc name="check" size={11} />Erfolgreich</span>
                <span style={{ font: "11px var(--font-mono)", color: "var(--text-muted)" }}>{date}</span>
                <span style={{ font: "11px var(--font-mono)", color: "var(--ink-2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", paddingRight: 12 }}>{file}</span>
                <span style={{ font: "11px var(--font-mono)", color: "var(--text-muted)" }}>{size}</span>
                <span style={{ font: "11px var(--font-mono)", color: "var(--text-muted)" }}>{dur}</span>
                <span style={{ color: "var(--text-muted)" }}><LIc name="angebote" size={13} /></span>
              </div>
            ))}
          </div>
          <button style={{ border: "none", background: "none", cursor: "pointer", marginTop: 10, padding: 0, font: "500 12px var(--font-display)", color: "var(--signal-deep)" }}>+ 10 weitere anzeigen</button>
        </div>
      </div>
    </div>
  );
}

/* ===== Platzhalter-Tabs ===== */
function BlankTab({ label }) {
  return (
    <LRv>
      <LCard pad={40} style={{ textAlign: "center" }}>
        <div className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>{label}</div>
        <p style={{ margin: "12px auto 0", font: "400 14px/1.6 var(--font-display)", color: "var(--text-muted)", maxWidth: 420 }}>Bewusst leer — für diesen Bereich liegt noch keine Referenz aus dem UNIO-System vor.</p>
      </LCard>
    </LRv>
  );
}

Object.assign(window, { InteressentenFunnelTab, AktivitaetTab, PlattformExportTab, LeadModal, ProjektBanner, BlankTab });
