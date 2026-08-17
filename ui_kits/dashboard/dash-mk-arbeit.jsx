/* UNIO Makler-Dashboard: Kontakte (ein Objekt, ein Thread) + Deals (zwei Pipelines,
   Verkaufs-Pipeline = gespiegelte Endkunden-State-Machine). */

const { MkOver, MkTimer } = window;

/* ---------- Kontakte ---------- */
function MkKontakte({ mk, tueMk, geheZu, offenId, setOffenId }) {
  const [view, setView] = React.useState("alle");
  const [text, setText] = React.useState("");
  const [sheet, setSheet] = React.useState(null); /* "sequenz" | "match" | "verloren" */
  const k = mk.kontakte.find((x) => x.id === offenId);
  const kk = mk.ekProfil.kaufkraft;

  const VIEWS = [["alle", "Alle"], ["neu", "Neue Leads"], ["heiss", "Heiß · 7 Tage still"], ["eigentuemer", "Eigentümer"]];
  const liste = mk.kontakte.filter((x) => {
    if (view === "neu") return !!x.neuSeit;
    if (view === "heiss") return x.phase === "Heiß";
    if (view === "eigentuemer") return x.typ === "eigentuemer";
    return true;
  });

  /* Thread: Valentina liest live aus den Endkunden-Chats (eine Wahrheit) */
  const thread = k ? (k.ekVerknuepft
    ? Object.values(mk.ekChats).flatMap((c) => c.msgs.map((m) => ({ ...m, ich: !m.ich, kanal: "Portal" }))).slice(-6)
    : (k.thread || [
        k.id === "klein" ? { ich: false, kanal: "Mail", txt: "Können wir die Maisonette diese Woche sehen?", t: "Vor 8 Tagen" } : null,
        k.id === "berger" ? { ich: false, kanal: "unio.at", txt: "Wir interessieren uns für das Gründerzeit-Juwel in Margareten. Ist es noch verfügbar?", t: "Vor 2 Min" } : null,
      ].filter(Boolean))) : [];

  const senden = () => {
    const t = text.trim(); if (!t || !k) return;
    tueMk((d) => {
      const dk = d.kontakte.find((x) => x.id === k.id);
      dk.thread = [...(dk.thread || thread), { ich: true, kanal: "Mail", txt: t, t: "Jetzt" }];
      dk.letzter = "Jetzt"; dk.neuSeit = null;
      d.heute.chatBeantwortet.push(k.id);
      d.heute.done.push("lead-" + k.id, "msg-" + k.id);
      if (dk.ekVerknuepft) window.ekChatNachricht({ chats: d.ekChats }, "beheim", false, t);
    });
    setText("");
  };

  const matchTreffer = k && k.typ === "kaeufer"
    ? Object.entries(window.EK_KATALOG).filter(([, o]) => !k.budget || o.preisNum <= k.budget * 1.15).slice(0, 3)
    : [];

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto" }}>
      <style>{window.MK_CSS}</style>
      <div style={{ marginTop: 34, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
        <div>
          <span className="mk-mono" style={{ color: "var(--signal-deep)" }}>Kontakte · Käufer und Eigentümer, ein Objekt</span>
          <h1 style={{ margin: "6px 0 0", font: "500 clamp(28px,3vw,40px)/1.05 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Kontakte<span style={{ color: "var(--signal)" }}>.</span></h1>
        </div>
        <button className="mk-btn" onClick={() => geheZu({ art: "screen", id: "kontakte" })}>+ Neuer Kontakt</button>
      </div>
      <div className="mk-views" style={{ marginTop: 18 }}>
        {VIEWS.map(([id, l]) => <button key={id} className={view === id ? "on" : ""} onClick={() => setView(id)}>{l}</button>)}
      </div>
      <div className="mk-card" style={{ padding: "4px 6px", overflowX: "auto" }}>
        <table className="mk-tab">
          <thead><tr><th>Name</th><th>Typ</th><th>Phase</th><th>Letzter Kontakt</th><th>Kaufkraft</th><th>Sequenz</th><th></th></tr></thead>
          <tbody>
            {liste.map((x) => (
              <tr key={x.id} className="zeile" onClick={() => setOffenId(x.id)}>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}><span className="mk-ava">{x.initials}</span><b style={{ fontWeight: 500 }}>{x.name}</b>{x.neuSeit && <MkTimer seit={x.neuSeit} />}</span></td>
                <td><span className="mk-pill">{x.typ === "kaeufer" ? "Käufer" : "Eigentümer"}</span></td>
                <td>{x.phase}</td>
                <td style={{ color: "var(--text-muted)" }}>{x.letzter}</td>
                <td>{x.kaufkraft ? <span className={"mk-pill " + (x.kaufkraft === "verifiziert" ? "ok" : "")}>{x.kaufkraft === "verifiziert" ? "Verifiziert ✓" : "Selbstangabe"}</span> : <span style={{ color: "var(--text-muted)" }}>-</span>}</td>
                <td>{x.sequenz ? <span className="mk-mono">Tag {x.sequenz.tag}/{x.sequenz.gesamt}</span> : <span style={{ color: "var(--text-muted)" }}>-</span>}</td>
                <td><span className="hoveracts" onClick={(e) => e.stopPropagation()}>
                  <button className="kbd" title="Anrufen">✆</button>
                  <button className="kbd" title="Mail" onClick={() => setOffenId(x.id)}>✉</button>
                </span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mk-mono" style={{ marginTop: 12 }}>Ersetzt Leads, Kontakte und Abgeber-Leads · Views sind Linsen auf dasselbe Objekt</p>

      <MkOver offen={!!k} onClose={() => { setOffenId(null); setSheet(null); }}>
        {k && (
          <React.Fragment>
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <span className="mk-ava" style={{ width: 44, height: 44, fontSize: 13 }}>{k.initials}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3>{k.name}</h3>
                <span className="mk-mono">{k.typ === "kaeufer" ? "Käufer" : "Eigentümer"} · {k.phase} · seit {k.seit}</span>
              </div>
              <span className="mk-pill">{k.tel}</span>
            </div>
            {k.kaufkraft && (
              <div className="mk-card" style={{ marginTop: 14, padding: "12px 15px", background: "#fff" }}>
                <span className="mk-mono" style={{ color: "var(--signal-deep)" }}>Kaufkraft (aus dem Endkunden-Portal)</span>
                <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "var(--ink)" }}>bis <b>{window.ekEur(k.budget)}</b> · {k.kaufkraft === "verifiziert" ? "verifiziert durch Finanzierungspartner ✓" : "Selbstangabe, Prüfung anbieten"}</p>
              </div>
            )}
            {k.notiz && <p style={{ margin: "12px 0 0", fontSize: 13, color: "var(--text-muted)", fontStyle: "italic" }}>„{k.notiz}"</p>}
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", margin: "14px 0" }}>
              <button className="mk-btn tiny" onClick={() => setSheet(sheet === "match" ? null : "match")}>Objekt vorschlagen</button>
              <button className="mk-btn ghost tiny" onClick={() => setSheet(sheet === "sequenz" ? null : "sequenz")}>{k.sequenz ? "Sequenz: Tag " + k.sequenz.tag + "/" + k.sequenz.gesamt : "Sequenz starten"}</button>
              <button className="mk-btn ghost tiny" onClick={() => setSheet(sheet === "verloren" ? null : "verloren")} style={{ color: "var(--text-muted)" }}>Verloren</button>
            </div>

            {sheet === "match" && (
              <div className="mk-card" style={{ marginBottom: 14, background: "#fff" }}>
                <span className="mk-mono" style={{ color: "var(--signal-deep)" }}>Suchprofil-Treffer aus dem Bestand</span>
                {matchTreffer.map(([id, o]) => (
                  <div key={id} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 0", borderBottom: "1px solid var(--hairline-dark)" }}>
                    <img src={o.img} alt="" style={{ width: 44, height: 44, borderRadius: 9, objectFit: "cover" }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <b style={{ font: "500 13.5px var(--font-display)", display: "block" }}>{o.t}</b>
                      <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{o.ort} · {window.ekEur(o.preisNum)}</span>
                    </div>
                    <button className="mk-btn ghost tiny" onClick={() => {
                      tueMk((d) => {
                        const dk = d.kontakte.find((y) => y.id === k.id);
                        dk.thread = [...(dk.thread || []), { ich: true, kanal: "Mail", txt: "Exposé gesendet: " + o.t + " (inkl. Widerrufsbelehrung, Namhaftmachung dokumentiert)", t: "Jetzt" }];
                        dk.letzter = "Jetzt";
                        if (!d.deals.statisch.some((s) => s.kontaktId === k.id && s.objId === id)) d.deals.statisch.push({ id: "st" + Date.now(), kontaktId: k.id, objId: id, zustand: "gemerkt" });
                        const evs = window.ekLese(window.EK_K.events, []);
                        evs.unshift({ id: Date.now(), typ: "treffer", objId: id, titel: "Dein Makler empfiehlt", sub: o.t + " · exklusiv für dich ausgewählt", zeit: "Jetzt", gelesen: false });
                        window.ekSchreibe(window.EK_K.events, evs);
                      });
                      setSheet(null);
                    }}>Exposé senden</button>
                  </div>
                ))}
                <p className="mk-mono" style={{ marginTop: 8 }}>Versand dokumentiert automatisch Namhaftmachung + FAGG-Belehrung</p>
              </div>
            )}
            {sheet === "sequenz" && (
              <div className="mk-card" style={{ marginBottom: 14, background: "#fff", display: "grid", gap: 7 }}>
                <span className="mk-mono" style={{ color: "var(--signal-deep)" }}>Action-Plan wählen (pausiert bei Antwort)</span>
                {["Neukäufer-Nurture · 21 Tage", "Eigentümer-Farming · 21 Tage", "After-Sales · 12 Monate"].map((s) => (
                  <button key={s} className="mk-btn ghost tiny" style={{ justifyContent: "flex-start" }} onClick={() => {
                    tueMk((d) => { const dk = d.kontakte.find((y) => y.id === k.id); dk.sequenz = { name: s.split(" · ")[0], tag: 1, gesamt: parseInt(s.match(/\d+/)[0], 10) }; });
                    setSheet(null);
                  }}>{s}</button>
                ))}
              </div>
            )}
            {sheet === "verloren" && (
              <div className="mk-card" style={{ marginBottom: 14, background: "#fff", display: "grid", gap: 7 }}>
                <span className="mk-mono" style={{ color: "var(--signal-deep)" }}>Grund (startet optional Re-Nurture in 6 Monaten)</span>
                {["Preisvorstellung", "Timing verschoben", "Mitbewerb", "Unerreichbar"].map((g) => (
                  <button key={g} className="mk-btn ghost tiny" style={{ justifyContent: "flex-start" }} onClick={() => {
                    tueMk((d) => { const dk = d.kontakte.find((y) => y.id === k.id); dk.phase = "Verloren · " + g; dk.sequenz = { name: "Re-Nurture ab 02/2027", tag: 0, gesamt: 1 }; });
                    setSheet(null); setOffenId(null);
                  }}>{g}</button>
                ))}
              </div>
            )}

            <div className="mk-secthead" style={{ margin: "6px 0 10px" }}><h2 style={{ fontSize: 15 }}>Thread</h2><span className="mk-mono">Alle Kanäle, eine Timeline</span></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {thread.length === 0 && <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Noch keine Kommunikation. Der erste Eindruck zählt: unter 5 Minuten antworten.</p>}
              {thread.map((m, i) => (
                <div key={i} className={"mk-msg " + (m.ich ? "ich" : "er")}>{m.txt}<span className="t">{m.kanal || "Portal"} · {m.t}</span></div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && senden()} placeholder="Antworten (Mail) ..."
                style={{ flex: 1, border: "none", background: "#EFEBE3", borderRadius: 999, padding: "11px 16px", font: "400 13px var(--font-display)", fontFamily: "inherit", color: "var(--ink)", outline: "none", minWidth: 0 }} />
              <button className="mk-btn" onClick={senden}>Senden</button>
            </div>
          </React.Fragment>
        )}
      </MkOver>
    </div>
  );
}

/* ---------- Deals ---------- */
function MkDeals({ mk, tueMk, geheZu, offenDeal, setOffenDeal, initialTab }) {
  const [tab, setTab] = React.useState(initialTab || "verkauf");
  const [gegenSheet, setGegenSheet] = React.useState(null);
  const [dragUeber, setDragUeber] = React.useState(null);
  const deals = window.mkVerkaufsDeals(mk);
  const offen = offenDeal ? deals.find((x) => (x.live ? x.objId : x.id) === offenDeal) : null;

  const setzeZustand = (objId, live, patch, eventTitel, eventSub, chatTxt) => tueMk((d) => {
    if (live) {
      const b = d.bez[objId] || {};
      Object.assign(b, patch); d.bez[objId] = b;
      if (eventTitel) {
        const evs = window.ekLese(window.EK_K.events, []);
        evs.unshift({ id: Date.now(), typ: patch.zustand === "gegenangebot" ? "gegenangebot" : "anbot", objId, titel: eventTitel, sub: eventSub, zeit: "Jetzt", gelesen: false });
        window.ekSchreibe(window.EK_K.events, evs);
      }
      if (chatTxt) {
        if (!d.ekChats[objId]) d.ekChats[objId] = { name: "Lukas Brandtner", rolle: "Makler · " + window.ekObj(objId).t, img: "../../assets/team/portrait-02.jpg", antwortzeit: "< 2 h", msgs: [] };
        d.ekChats[objId].msgs.push({ ich: false, txt: chatTxt, t: "Jetzt" });
      }
    } else {
      const s = d.deals.statisch.find((x) => x.objId === objId);
      if (s) Object.assign(s, patch);
    }
  });

  const AKQ_PHASEN = ["Eigentümer-Lead", "Bewertung", "Alleinvermittlung"];

  return (
    <div style={{ maxWidth: 1360, margin: "0 auto" }}>
      <style>{window.MK_CSS}</style>
      <div style={{ marginTop: 34, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
        <div>
          <span className="mk-mono" style={{ color: "var(--signal-deep)" }}>Ein Zustand, zwei Perspektiven: die Kundenseite sieht dieselben Deals als Kaufreise</span>
          <h1 style={{ margin: "6px 0 0", font: "500 clamp(28px,3vw,40px)/1.05 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Deals<span style={{ color: "var(--signal)" }}>.</span></h1>
        </div>
        <div className="mk-views" style={{ margin: 0 }}>
          <button className={tab === "verkauf" ? "on" : ""} onClick={() => setTab("verkauf")}>Käufer-Deals</button>
          <button className={tab === "akquise" ? "on" : ""} onClick={() => setTab("akquise")}>Eigentümer-Akquise</button>
        </div>
      </div>

      {tab === "verkauf" && (
        <div className="mk-board" style={{ marginTop: 20 }}>
          {window.MK_SPALTEN.map(([z, label]) => {
            const spalte = deals.filter((x) => x.zustand === z);
            return (
              <div key={z} className={"mk-col" + (dragUeber === z ? " dropbar" : "")}
                onDragOver={(e) => { e.preventDefault(); setDragUeber(z); }}
                onDragLeave={() => setDragUeber(null)}
                onDrop={(e) => {
                  e.preventDefault(); setDragUeber(null);
                  const [objId, live] = (e.dataTransfer.getData("text") || "").split("|");
                  if (!objId) return;
                  if (z === "abwicklung") { setOffenDeal(objId); return; } /* Gate: Abwicklung nur ueber Annahme-Flow */
                  setzeZustand(objId, live === "1", { zustand: z });
                }}>
                <div className="kopf"><b>{label}</b><span className="mk-mono">{spalte.length}</span></div>
                {spalte.map((x) => {
                  const o = window.ekObj(x.objId);
                  const kn = window.mkKontakt(mk, x.kontaktId);
                  const frist = x.b && x.b.anbot ? window.ekFristTage(x.b.anbot.frist) : null;
                  return (
                    <div key={x.objId} className="mk-dealcard" draggable
                      onDragStart={(e) => e.dataTransfer.setData("text", x.objId + "|" + (x.live ? "1" : "0"))}
                      onClick={() => setOffenDeal(x.objId)}>
                      <img src={o.img} alt="" loading="lazy" />
                      <b>{o.t}</b>
                      <span className="m">{kn.name}{x.b && x.b.anbot ? " · " + window.ekEur(x.b.anbot.gegen || x.b.anbot.betrag) : " · " + window.ekEur(o.preisNum)}</span>
                      <div className="fuss">
                        {frist !== null && ["anbot_aktiv", "gegenangebot"].includes(x.zustand)
                          ? <span className="mk-pill hot">Frist {frist} T</span>
                          : x.live ? <span className="mk-pill ok">Live beim Kunden</span> : <span className="mk-pill">Demo</span>}
                        <span className="mk-mono">↗</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {tab === "akquise" && (
        <div className="mk-board" style={{ marginTop: 20 }}>
          {AKQ_PHASEN.map((label, pi) => (
            <div key={label} className="mk-col" style={{ flex: "0 0 300px" }}>
              <div className="kopf"><b>{label}</b><span className="mk-mono">{mk.deals.akquise.filter((a) => a.phase === pi).length}</span></div>
              {mk.deals.akquise.filter((a) => a.phase === pi).map((a) => {
                const kn = a.kontaktId ? window.mkKontakt(mk, a.kontaktId) : { name: a.name };
                return (
                  <div key={a.id} className={"mk-dealcard" + (a.faul ? " faul" : "")} onClick={() => a.kontaktId && geheZu({ art: "kontakt", id: a.kontaktId })}>
                    <b>{a.objekt}</b>
                    <span className="m">{kn.name} · Potenzial {window.ekEur(a.wert)}</span>
                    <div className="fuss">
                      {a.naechste
                        ? <span className="mk-pill">→ {a.naechste}</span>
                        : <button className="mk-pill rot" style={{ cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); tueMk((d) => { const x = d.deals.akquise.find((y) => y.id === a.id); x.naechste = "Erstgespräch vereinbaren · morgen"; x.faul = false; }); }}>Keine nächste Aktion · planen</button>}
                    </div>
                  </div>
                );
              })}
              {pi === 2 && (
                <p className="mk-mono" style={{ padding: "6px 8px" }}>Gate: Alleinvermittlung nur mit schriftlicher Provisionsvereinbarung + FAGG-Belehrung ✓</p>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mk-mono" style={{ margin: "6px 0 40px" }}>Karten ziehen wechselt den Zustand (optimistisch) · Abwicklung nur über den Annahme-Flow mit KYC-Gate</p>

      <MkOver offen={!!offen} onClose={() => { setOffenDeal(null); setGegenSheet(null); }} breit>
        {offen && (() => {
          const o = window.ekObj(offen.objId);
          const kn = window.mkKontakt(mk, offen.kontaktId);
          const b = offen.b || {};
          const kyc = b.kycOk;
          return (
            <React.Fragment>
              <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
                <img src={o.img} alt="" style={{ width: 64, height: 64, borderRadius: 13, objectFit: "cover" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3>{o.t}</h3>
                  <span className="mk-mono">{kn.name} · {window.EK_ZUSTAND_LABEL[offen.zustand] || offen.zustand}{offen.live ? " · live mit dem Kundenportal verbunden" : ""}</span>
                </div>
                <button className="mk-btn ghost tiny" onClick={() => geheZu({ art: "objekt", id: offen.objId })}>Objekt-Akte</button>
              </div>

              {b.anbot && (
                <div className="mk-card" style={{ marginTop: 16, background: "#fff" }}>
                  <div className="mk-secthead" style={{ margin: "0 0 8px" }}><h2 style={{ fontSize: 15 }}>Anbot-Verlauf</h2>{b.anbot.frist && <span className="mk-pill hot">Frist: noch {window.ekFristTage(b.anbot.frist)} Tage (echt)</span>}</div>
                  {(b.anbot.verlauf || []).map((v, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--hairline-dark)", fontSize: 13.5 }}>
                      <span style={{ color: "var(--text-muted)" }}>{v.wer === "du" ? "Anbot " + kn.name : "Gegenangebot Verkäufer"} · {v.zeit}</span>
                      <b style={{ fontWeight: 500 }}>{window.ekEur(v.betrag)}</b>
                    </div>
                  ))}
                </div>
              )}

              {/* Aktionen je Zustand: jede wirkt sofort im Endkunden-Portal */}
              {offen.zustand === "anbot_aktiv" && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
                  <button className="mk-btn signal" onClick={() => { setzeZustand(offen.objId, true, { zustand: "abwicklung", phase: 0, anbot: { ...b.anbot, angenommen: b.anbot.betrag } }, "Anbot angenommen!", o.t + " · " + window.ekEur(b.anbot.betrag) + " · die Abwicklung startet", "Gute Nachrichten: Der Verkäufer hat Ihr Anbot angenommen. Nächster Schritt: Kaufvertragsentwurf."); setOffenDeal(null); }}>Annehmen (Verkäufer)</button>
                  <button className="mk-btn ghost" onClick={() => setGegenSheet(Math.round((b.anbot.betrag + o.preisNum) / 2 / 1000) * 1000)}>Gegenangebot senden</button>
                  <button className="mk-btn ghost" style={{ color: "var(--text-muted)" }} onClick={() => { setzeZustand(offen.objId, true, { zustand: "abgelehnt" }, "Anbot nicht angenommen", o.t + " · deine Suche läuft weiter", "Der Verkäufer hat sich anders entschieden. Ich habe schon 3 ähnliche Objekte für Sie."); setOffenDeal(null); }}>Ablehnen</button>
                </div>
              )}
              {offen.zustand === "gegenangebot" && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
                  <button className="mk-btn" onClick={() => { setzeZustand(offen.objId, true, {}, "Erinnerung: Frist läuft", o.t + " · Gegenangebot " + window.ekEur(b.anbot.gegen) + " · noch " + window.ekFristTage(b.anbot.frist) + " Tage gültig", "Kurze Erinnerung: Das Gegenangebot ist noch " + window.ekFristTage(b.anbot.frist) + " Tage gültig. Melden Sie sich gern bei Fragen."); }}>Kunden erinnern (echte Frist)</button>
                  <button className="mk-btn ghost" onClick={() => setGegenSheet(b.anbot.gegen)}>Neues Gegenangebot</button>
                </div>
              )}
              {gegenSheet !== null && (
                <div className="mk-card" style={{ marginTop: 12, background: "#fff" }}>
                  <span className="mk-mono" style={{ color: "var(--signal-deep)" }}>Gegenangebot des Verkäufers</span>
                  <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                    {[gegenSheet, gegenSheet + 20000, o.preisNum].map((v) => (
                      <button key={v} className="mk-btn ghost tiny" onClick={() => {
                        setzeZustand(offen.objId, true,
                          { zustand: "gegenangebot", anbot: { ...b.anbot, gegen: v, frist: new Date(Date.now() + 5 * 86400000).toISOString(), verlauf: [...(b.anbot.verlauf || []), { wer: "verkaeufer", betrag: v, zeit: "Jetzt" }] } },
                          "Gegenangebot erhalten", o.t + " · " + window.ekEur(v) + " · Frist läuft",
                          "Der Verkäufer hat reagiert: Gegenangebot " + window.ekEur(v) + ", 5 Tage gültig. Im Portal können Sie direkt reagieren.");
                        setGegenSheet(null);
                      }}>{window.ekEur(v)}</button>
                    ))}
                  </div>
                </div>
              )}

              {offen.zustand === "abwicklung" && (
                <div className="mk-card" style={{ marginTop: 14, background: "#fff" }}>
                  <div className="mk-secthead" style={{ margin: "0 0 6px" }}><h2 style={{ fontSize: 15 }}>Abwicklungs-Checkliste</h2><span className="mk-mono">Compliance als Gate, mit Audit-Trail</span></div>
                  <div className={"mk-check" + (kyc ? " done" : "")}>
                    <span className="box" onClick={() => setzeZustand(offen.objId, true, { kycOk: true })}>{kyc ? "✓" : ""}</span>
                    <span style={{ flex: 1 }}>KYC / WiEReG-Prüfung beider Parteien</span>
                    {!kyc && <button className="mk-btn ghost tiny" onClick={() => setzeZustand(offen.objId, true, { kycOk: true })}>Demo: bestanden</button>}
                    {kyc && <span className="mk-mono">17.08. · 11:52 · geprüft</span>}
                  </div>
                  {window.EK_STEPS_ABW.map((s, i) => (
                    <div key={s} className={"mk-check" + ((b.phase || 0) > i ? " done" : "")}>
                      <span className="box" onClick={() => { if (!kyc) return; setzeZustand(offen.objId, true, { phase: Math.max(b.phase || 0, i + 1) }, s + " abgeschlossen", o.t + " · nächster Schritt: " + (window.EK_STEPS_ABW[i + 1] || "Eigentum"), null); }}>{(b.phase || 0) > i ? "✓" : ""}</span>
                      <span style={{ flex: 1, opacity: kyc ? 1 : .45 }}>{s}{!kyc && i === 0 ? " · gesperrt bis KYC" : ""}</span>
                    </div>
                  ))}
                  {(b.phase || 0) >= 4 && (
                    <div style={{ marginTop: 10, padding: "12px 14px", background: "rgba(46,125,70,.08)", borderRadius: 12, fontSize: 13.5 }}>
                      <b style={{ fontWeight: 500 }}>Abgeschlossen.</b> Provision (Demo, 3 % + 85/100-Modell): <b>{window.ekEur((b.anbot ? (b.anbot.angenommen || b.anbot.gegen || b.anbot.betrag) : o.preisNum) * 0.03 * 0.85)}</b> netto für dich. After-Sales-Sequenz gestartet.
                    </div>
                  )}
                </div>
              )}
              {offen.live && <p className="mk-mono" style={{ marginTop: 14 }}>Jede Aktion hier erscheint sofort im Endkunden-Portal (Ereignis, Chat, Kaufreise)</p>}
            </React.Fragment>
          );
        })()}
      </MkOver>
    </div>
  );
}
Object.assign(window, { MkKontakte, MkDeals });
