/* UNIO Makler-Dashboard: Heute (Startseite).
   Arbeit zuerst (Triage mit Null-Zustand), daneben der Tag, darunter die vier
   Original-UNIO-Kacheln: Dein Tag, Erstkontakt-Quote, Vom Lead zum Abschluss, Community.
   Statistiken leben in Ziele. Mobil: eine Spalte, Arbeit vor Überblick.
   Prozesslogik: docs/MAKLER_DASHBOARD_PROZESSLOGIK.md */

const { MkTimer } = window;

/* ---------- Triage-Zeile ---------- */
function MkTriageZeile({ it, primaer, erledigt, snooze, snoozeFuer, setSnoozeFuer }) {
  const ico = { lead: "★", frist: "€", anbot: "€", nachricht: "✉", report: "▤", termin: "◷", kunde: "◆", nachfassen: "→" }[it.typ] || "→";
  return (
    <div className={"mk-triage" + (it.typ === "lead" ? " lead" : "")}>
      <span className="tico">{ico}</span>
      <span className="mid"><b>{it.titel}</b><span>{it.sub}</span></span>
      <span className="acts">
        {it.timer && <MkTimer seit={it.timer} />}
        <button className="mk-btn tiny" onClick={() => primaer(it)}>{it.aktion}</button>
        <button className="kbd" title="Erledigt (E)" onClick={() => erledigt(it.id)}>E</button>
        <span style={{ position: "relative" }}>
          <button className="kbd" title="Snooze (H)" onClick={() => setSnoozeFuer(snoozeFuer === it.id ? null : it.id)}>H</button>
          {snoozeFuer === it.id && (
            <span style={{ position: "absolute", right: 0, top: 30, zIndex: 30, background: "#fff", borderRadius: 12, boxShadow: "0 16px 40px -14px rgba(11,10,9,.4), inset 0 0 0 1px var(--hairline-dark)", padding: 6, display: "grid", gap: 3, width: 132 }}>
              {[["2 Stunden", 2], ["Morgen früh", 20], ["Montag", 24]].map(([l, h]) => (
                <button key={l} onClick={() => snooze(it.id, h)} style={{ border: "none", background: "none", cursor: "pointer", textAlign: "left", padding: "7px 10px", borderRadius: 8, font: "400 12.5px var(--font-display)", fontFamily: "inherit", color: "var(--ink)" }}>{l}</button>
              ))}
            </span>
          )}
        </span>
      </span>
    </div>
  );
}

function MkHeuteSeite({ mk, tueMk, geheZu, onNav }) {
  const items = window.mkTriage(mk);
  const [snoozeFuer, setSnoozeFuer] = React.useState(null);
  const z = mk.ziele;
  const kk = mk.ekProfil.kaufkraft;
  const erledigt = (id) => tueMk((d) => { d.heute.done.push(id); });
  const snooze = (id, stunden) => { tueMk((d) => { d.heute.snoozed[id] = Date.now() + stunden * 3600000; }); setSnoozeFuer(null); };
  const primaer = (it) => {
    if (it.typ === "report") return geheZu({ art: "objekt", id: it.ziel.id, report: true });
    if (it.typ === "kunde") {
      tueMk((d) => {
        d.heute.done.push(it.id);
        if (d.ekProfil.kaufkraft) d.ekProfil.kaufkraft.status = "verifiziert";
        window.ekSchreibe(window.EK_K.profil, d.ekProfil);
        const evs = window.ekLese(window.EK_K.events, []);
        evs.unshift({ id: Date.now(), typ: "kaufkraft", objId: "maxing", titel: "Finanzierung verifiziert ✓", sub: "Dein Rahmen ist bestätigt, Anbote tragen jetzt das Badge", zeit: "Jetzt", gelesen: false });
        window.ekSchreibe(window.EK_K.events, evs);
      });
      return;
    }
    geheZu(it.ziel);
  };

  /* Momentum: Deals, denen genau ein Schritt fehlt */
  const momentum = [];
  const faul = mk.deals.akquise.find((a) => a.faul);
  if (faul) momentum.push({ titel: faul.name || "Akquise-Deal", sub: "Keine nächste Aktion geplant, der Deal wird kalt", cta: "Aktion planen", tu: () => geheZu({ art: "screen", id: "deals", tab: "akquise" }) });
  const nachfass = Object.entries(mk.bez).find(([, b]) => b.zustand === "besichtigt");
  if (nachfass) momentum.push({ titel: window.ekObj(nachfass[0]).t, sub: "Ein Anruf fehlt zum Anbot · " + (nachfass[1].termin || "kürzlich besichtigt"), cta: "Deal öffnen", tu: () => geheZu({ art: "deal", id: nachfass[0] }) });
  momentum.push({ titel: "Eigentümer-Chance: Dr. Anna Maier", sub: "UNIO-Signal: 3 LENS-Aufrufe der Bewertung diese Woche", cta: "Kontakt öffnen", tu: () => geheZu({ art: "kontakt", id: "maier" }), signal: true });

  const offen = items.length;
  return (
    <div className="mk-heute">
      {/* Zone 1: Kopf, ruhig */}
      <div className="mk-kopf">
        <div>
          <span className="mk-mono" style={{ color: "var(--signal-deep)" }}>Sonntag, 17. August 2026</span>
          <h1>Guten Morgen, Daniel<span style={{ color: "var(--signal)" }}>.</span></h1>
          <p className="mk-brief">
            {offen === 0
              ? "Nichts offen. Der Rest des Tages ist Gestaltung."
              : (kk && kk.status === "verifiziert"
                ? "Valentinas Finanzierung ist bestätigt, das Beheim-Gegenangebot ist reif für den Abschluss. Danach die stillen Follow-ups."
                : "Zuerst der neue Lead, dann das offene Gegenangebot. Der Rest kann warten.")}
          </p>
        </div>
      </div>

      {/* Zone 2: Arbeit links, der Tag rechts */}
      <div className="mk-zwei">
        <div className="mk-arbeit">
          {offen > 0 ? (
            <React.Fragment>
              <div className="mk-secthead" style={{ marginTop: 0 }}>
                <h2>Zu tun</h2>
                <span className="mk-mono">{offen} offen · Ziel: 0 · E erledigt, H später</span>
              </div>
              {items.map((it) => (
                <MkTriageZeile key={it.id} it={it} primaer={primaer} erledigt={erledigt} snooze={snooze} snoozeFuer={snoozeFuer} setSnoozeFuer={setSnoozeFuer} />
              ))}
            </React.Fragment>
          ) : (
            <div className="mk-zero">
              <img src="../../assets/img/vienna-facades.jpg" alt="" />
              <span className="sc" aria-hidden="true"></span>
              <div className="cap">
                <span className="mk-mono" style={{ color: "rgba(255,255,255,.75)" }}>Alles erledigt</span>
                <b>Der Tag gehört dir.</b>
                <span>Triage geleert · Antwortzeit ⌀ 11 Min · nächster Termin 14:00</span>
              </div>
            </div>
          )}
        </div>
        {/* Original-Kachel 1: Dein Tag */}
        <div className="mk-tag"><window.TagesTimeline onNav={onNav} /></div>
      </div>

      {/* Zone 3: Momentum über die gesamte Breite */}
      {offen > 0 && (
        <React.Fragment>
          <div className="mk-secthead"><h2>Momentum</h2><span className="mk-mono">Ein Schritt fehlt bis zum nächsten Zustand</span></div>
          <div className="mk-moment">
            {momentum.slice(0, 3).map((m) => (
              <div key={m.titel} className="mk-card mk-momentkarte">
                <div style={{ flex: 1, minWidth: 0 }}>
                  {m.signal && <span className="mk-pill hot" style={{ marginBottom: 8 }}>UNIO-Signal</span>}
                  <b>{m.titel}</b>
                  <span className="s">{m.sub}</span>
                </div>
                <button className="mk-btn ghost tiny" onClick={m.tu}>{m.cta}</button>
              </div>
            ))}
          </div>
        </React.Fragment>
      )}

      {/* Zone 4: Original-Kachel 2, Erstkontakt-Quote (Performance) */}
      <div className="mk-erst"><window.ErstkontaktModul /></div>

      {/* Zone 5: Original-Kacheln 3 und 4, Pipeline + Community */}
      <div className="mk-zwei b">
        <window.PipelineCard />
        <window.CircleHomeWidget onNav={onNav} />
      </div>

      <div className="mk-fuss">
        <span className="mk-mono">Demo-Ansicht · Triage speist sich live aus Leads, Deals und Kunden-Ereignissen · ⌘K für alles</span>
        <button className="mk-btn ghost tiny" onClick={() => geheZu({ art: "screen", id: "ziele" })}>Alle Statistiken ansehen</button>
      </div>
    </div>
  );
}

/* Layout-CSS der Startseite: Desktop zweispaltig, mobil eine Spalte mit Arbeit zuerst */
const MK_HEUTE_CSS = `
  .mk-heute{max-width:1240px;margin:0 auto;}
  .mk-kopf{margin-top:34px;}
  .mk-kopf h1{margin:8px 0 6px;font:500 clamp(28px,3.4vw,46px)/1.04 var(--font-display);letter-spacing:-.03em;color:var(--ink);}
  .mk-brief{margin:0;font:400 15px/1.6 var(--font-display);color:var(--text-muted);max-width:560px;}
  .mk-zwei{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:24px;align-items:start;margin-top:30px;}
  .mk-zwei.b{margin-top:24px;}
  .mk-moment{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;}
  .mk-momentkarte{display:flex;align-items:center;gap:14px;padding:16px 18px;}
  .mk-momentkarte b{display:block;font:500 14.5px var(--font-display);color:var(--ink);}
  .mk-momentkarte .s{display:block;font-size:12.5px;color:var(--text-muted);margin-top:3px;line-height:1.5;}
  .mk-momentkarte .mk-btn{flex:0 0 auto;}
  .mk-erst{margin-top:24px;}
  .mk-fuss{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin:26px 0 44px;}
  @media (max-width:1150px){
    .mk-moment{grid-template-columns:minmax(0,1fr);}
  }
  @media (max-width:1000px){
    .mk-zwei{grid-template-columns:minmax(0,1fr);}
    .mk-heute .mk-arbeit{order:1;}
    .mk-heute .mk-tag{order:2;}
  }
  @media (max-width:700px){
    .mk-kopf{margin-top:22px;gap:18px;}
    .mk-zwei,.mk-zwei.b{gap:14px;margin-top:22px;}
    .mk-moment{grid-template-columns:minmax(0,1fr);}
    .mk-momentkarte{flex-wrap:wrap;row-gap:12px;}
    .mk-momentkarte .mk-btn{width:100%;}
    .mk-triage{flex-wrap:wrap;row-gap:10px;}
    .mk-triage .mid{flex:1 1 100%;order:1;}
    .mk-triage .tico{order:0;}
    .mk-triage .acts{order:2;width:100%;justify-content:flex-end;}
    .mk-triage .mid b{white-space:normal;}
    .mk-triage .mid span{white-space:normal;}
    .mk-zero{min-height:280px;}
    .mk-fuss{margin-bottom:30px;}
  }
`;
Object.assign(window, { MkHeuteSeite, MK_HEUTE_CSS });
