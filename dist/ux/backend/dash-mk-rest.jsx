/* UNIO Makler-Dashboard: Ziele (on pace), Einstellungen (Zahnrad), Marketing-Hub. */

/* Ziele-Bereich: Ziele, Statistiken (Original-Screen) und Marketing/Lead-Kennzahlen als Linsen */
function MkZieleBereich({ mk, tueMk, onNav }) {
  const [tab, setTab] = React.useState("ziele");
  return (
    <div style={{ maxWidth: 1360, margin: "0 auto" }}>
      <window.MkSubnav aktiv={tab} setzen={setTab} tabs={[
        ["ziele", "Ziele & Puls", null],
        ["stats", "Statistiken", null],
        ["markt", "Marketing & Leads", null],
      ]} />
      {tab === "ziele" && <MkZiele mk={mk} tueMk={tueMk} />}
      {tab === "stats" && <window.DashStats onNav={onNav} />}
      {tab === "markt" && (
        <div>
          <div style={{ margin: "26px 0 14px" }}>
            <span className="mk-mono" style={{ color: "var(--signal-deep)" }}>Marketing- und Lead-Performance · 30 Tage</span>
            <h2 style={{ margin: "6px 0 0", font: "500 20px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Woher die Nachfrage kommt</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,7fr) minmax(0,5fr)", gap: 20, alignItems: "start" }} className="mk-two">
            <window.ReichweiteCard />
            <window.Watchlist onNav={onNav} />
          </div>
          <div style={{ marginTop: 20 }}><window.HomeBelowFold onNav={onNav} /></div>
        </div>
      )}
    </div>
  );
}

/* Ziele im UNIO-Design: Ink-Kachel als Anker, CardHead-Karten, Ring, Bars, u-label-Typografie */
function MkZiele({ mk, tueMk }) {
  const { Card: C, CardHead: CH, BigNum, Bars, Ring, Chip, useInView, useCountUp } = window;
  const z = mk.ziele;
  const prozent = Math.min(100, Math.round(z.erreicht / z.jahresziel * 100));
  const woche = 34, sollBisJetzt = Math.round(z.jahresziel * (woche / 52));
  const onPace = z.erreicht >= sollBisJetzt * 0.95;
  const [ref, run] = useInView(0.35);
  const n = useCountUp(z.erreicht, run, 1100);
  const [edit, setEdit] = React.useState(false);
  const WOCHE = [["Erstkontakte", z.wocheIst.kontakte, z.wocheSoll.kontakte], ["Besichtigungen", z.wocheIst.besichtigungen, z.wocheSoll.besichtigungen], ["Anbote", z.wocheIst.anbote, z.wocheSoll.anbote]];
  const R = window.DASH_R || 12;
  return (
    <div style={{ maxWidth: 1360, margin: "0 auto" }}>
      {/* Kopf im Original-Duktus */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginTop: 40 }}>
        <div>
          <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>Steuerung · Jahresziel als Wochenarbeit</span>
          <h1 style={{ margin: "14px 0 0", font: "600 clamp(34px, 4.4vw, 64px)/1.05 var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>Dein Jahr<span style={{ color: "var(--signal)" }}>.</span></h1>
        </div>
        <Chip tone={onPace ? "pos" : undefined}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: onPace ? "var(--signal)" : "#B3261E" }}></span>
          {onPace ? "On pace" : "Hinter dem Plan"} · Woche {woche}/52
        </Chip>
      </div>

      {/* Zone 1: die eine Ink-Kachel (Provisionsstand-Optik) + Wochenarbeit */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)", gap: 24, alignItems: "stretch", marginTop: 40 }} className="mk-two">
        <div ref={ref} style={{ background: "var(--ink)", borderRadius: R, padding: 28, color: "var(--paper)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(70% 60% at 90% 0%, rgba(255,170,9,.22), transparent 60%)" }}></div>
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="u-label" style={{ fontSize: 9, color: "rgba(247,245,241,.55)" }}>Provision nach UNIO-Anteil</span>
              <span className="u-label" style={{ fontSize: 8.5, padding: "5px 11px", borderRadius: 999, boxShadow: "inset 0 0 0 1px rgba(247,245,241,.25)", color: "rgba(247,245,241,.75)" }}>2026</span>
            </div>
            <div style={{ font: "500 clamp(34px, 3.6vw, 48px)/1 var(--font-display)", letterSpacing: "-0.03em", marginTop: 20, fontVariantNumeric: "tabular-nums" }}>
              <span style={{ color: "var(--signal)" }}>€</span> {(run ? n : 0).toLocaleString("de-AT")}
            </div>
            <div className="u-label" style={{ fontSize: 8.5, color: "rgba(247,245,241,.55)", marginTop: 12 }}>von € {z.jahresziel.toLocaleString("de-AT")} Jahresziel · Soll bis jetzt € {sollBisJetzt.toLocaleString("de-AT")}</div>
            <div style={{ height: 6, borderRadius: 999, background: "rgba(247,245,241,.14)", overflow: "hidden", marginTop: 22 }}>
              <div style={{ height: "100%", width: (run ? prozent : 0) + "%", borderRadius: 999, background: "linear-gradient(90deg, var(--signal), #E8940A)", transition: "width 1100ms var(--ease-unio)" }}></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              <span className="u-label" style={{ fontSize: 9, color: "rgba(247,245,241,.75)" }}>{prozent} % erreicht</span>
              <button onClick={() => setEdit((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", font: "500 12px var(--font-display)", fontFamily: "inherit", color: "var(--signal)", padding: 0 }}>{edit ? "Fertig" : "Ziel anpassen"}</button>
            </div>
            {edit && (
              <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid rgba(247,245,241,.16)" }}>
                <div style={{ font: "600 26px/1 var(--font-display)", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                  <span style={{ fontSize: 15, color: "rgba(247,245,241,.45)", marginRight: 3 }}>€</span>{z.jahresziel.toLocaleString("de-AT")}
                </div>
                <input type="range" min={60000} max={400000} step={10000} value={z.jahresziel}
                  onChange={(e) => { const v = Number(e.target.value); tueMk((d) => { d.ziele.jahresziel = v; }); }}
                  style={{ width: "100%", marginTop: 14, accentColor: "var(--signal)" }} />
                <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                  {[120000, 180000, 240000].map((t) => (
                    <button key={t} onClick={() => tueMk((d) => { d.ziele.jahresziel = t; })}
                      style={{ cursor: "pointer", border: "none", borderRadius: 999, padding: "7px 13px", font: "500 11px var(--font-mono)", fontFamily: "inherit",
                        background: z.jahresziel === t ? "var(--signal)" : "transparent", color: z.jahresziel === t ? "#1A1305" : "var(--paper)",
                        boxShadow: z.jahresziel === t ? "none" : "inset 0 0 0 1px rgba(247,245,241,.25)" }}>€ {t / 1000}k</button>
                  ))}
                </div>
              </div>
            )}
            <div style={{ marginTop: 22 }}>
              {[["Abgerechnet", "€ " + Math.round(z.erreicht * 0.72).toLocaleString("de-AT"), false], ["Offen aus Pipeline", "€ 42.900", true]].map(([k, v, hi]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid rgba(247,245,241,.16)" }}>
                  <span className="u-label" style={{ fontSize: 9, color: "rgba(247,245,241,.55)" }}>{k}</span>
                  <span style={{ font: "13px var(--font-mono)", color: hi ? "var(--signal)" : "var(--paper)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <C style={{ height: "100%" }}>
          <CH label="Diese Woche" title="Was das Ziel verlangt" right={<Chip>Woche {woche}</Chip>} />
          <p style={{ margin: "0 0 22px", font: "400 14.5px/1.6 var(--font-display)", color: "var(--text-muted)", maxWidth: 460 }}>
            Das Jahresziel heruntergebrochen auf Aktivitäten, die du heute steuern kannst. Nicht Umsatz, sondern Handlungen.
          </p>
          <div style={{ display: "grid", gap: 18 }}>
            {WOCHE.map(([l, ist, soll]) => {
              const pct = Math.min(100, Math.round(ist / soll * 100));
              const fertig = ist >= soll;
              return (
                <div key={l} style={{ display: "grid", gridTemplateColumns: "minmax(0, 150px) minmax(0, 1fr) 62px", gap: 16, alignItems: "center" }}>
                  <span className="u-label" style={{ fontSize: 9.5, color: "var(--text-muted)" }}>{l}</span>
                  <div style={{ height: 8, borderRadius: 999, background: "rgba(20,18,16,.07)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: (run ? pct : 0) + "%", borderRadius: 999, transition: "width 900ms var(--ease-unio)",
                      background: fertig ? "linear-gradient(90deg, #4E9E68, #2E7D46)" : "linear-gradient(90deg, var(--signal), var(--signal-deep))" }}></div>
                  </div>
                  <span style={{ font: "14px var(--font-mono)", color: "var(--ink)", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{ist}/{soll}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 26, paddingTop: 20, borderTop: "1px solid var(--hairline-dark)", display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
            <Ring value={prozent} size={78} label="Jahr" />
            <div style={{ flex: 1, minWidth: 200 }}>
              <div className="u-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>Aktivität · 12 Wochen</div>
              <div style={{ marginTop: 12 }}><Bars data={[6, 8, 5, 9, 7, 11, 8, 12, 9, 13, 10, 14]} height={64} /></div>
            </div>
          </div>
        </C>
      </div>

      {/* Zone 2: Wochenreview im Original-Kachelstil */}
      <div style={{ marginTop: 24 }}>
        <C>
          <CH label="Montag-Digest" title="Wochenreview" right={<Chip>Auch als Heute-Karte</Chip>} />
          <p style={{ margin: 0, font: "400 15px/1.7 var(--font-display)", color: "var(--ink-2, var(--ink))", maxWidth: 760 }}>
            Starke Woche: <b style={{ fontWeight: 500 }}>2 Besichtigungen</b>, das Beheim-Gegenangebot steht kurz vor der Einigung, das sind drei Abschlüsse Richtung Jahresziel.
            <b style={{ fontWeight: 500 }}> 5 Leads warten</b> auf Erstkontakt, einer davon seit acht Tagen (Mario Klein). Antwortzeit ⌀ 11 Minuten, Top 10 % im CIRCLE.
          </p>
        </C>
      </div>

      {/* Zone 3: Kennzahlen als nackte Zahlen-Reihe (Original-Duktus) */}
      <div style={{ marginTop: 40 }}>
        <div className="u-label" style={{ fontSize: 9, color: "var(--text-muted)", marginBottom: 22 }}>Kennzahlen · laufendes Jahr</div>
        <div className="dash-statband" style={{ display: "flex", alignItems: "baseline", columnGap: "clamp(20px, 2.4vw, 44px)", rowGap: 26, flexWrap: "wrap" }}>
          {[["11", " Min", "⌀ Antwortzeit · Top 10 %"], ["6,1", " Mio", "Pipeline-Wert · 7 Deals"], ["38", " %", "Anfrage zu Besichtigung"], ["24", " %", "CIRCLE-Schnitt zum Vergleich"]].map(([v, suf, l], i) => (
            <React.Fragment key={l}>
              {i > 0 && <span className="dash-kpi-div" aria-hidden="true" style={{ width: 1, height: 44, alignSelf: "baseline", background: "rgba(20,18,16,.14)", fontSize: 0 }}></span>}
              <div>
                <div style={{ font: "600 clamp(30px, 3vw, 46px)/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                  {v}{suf && <span style={{ fontSize: 20, color: "rgba(20,18,16,.4)", marginLeft: 4, fontWeight: 500 }}>{suf}</span>}
                </div>
                <div className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)", marginTop: 12 }}>{l}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ height: 40 }}></div>
    </div>
  );
}

function MkSettings() {
  const [t, setT] = React.useState({ push: true, digest: true, sound: false });
  const sw = (k) => (
    <button className={"ek-sw" + (t[k] ? " on" : "")} onClick={() => setT({ ...t, [k]: !t[k] })} aria-label={k}
      style={{ position: "relative", width: 40, height: 23, borderRadius: 99, border: "none", cursor: "pointer", background: t[k] ? "var(--signal)" : "var(--hairline-dark)", flex: "0 0 auto" }}>
      <i style={{ position: "absolute", top: 3, left: t[k] ? 20 : 3, width: 17, height: 17, borderRadius: 99, background: "#fff", transition: "left .2s var(--ease-unio)" }}></i>
    </button>
  );
  const zeile = (b, s, rechts) => (
    <div key={b} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "13px 0", borderBottom: "1px solid var(--hairline-dark)" }}>
      <div><b style={{ font: "500 14px var(--font-display)", color: "var(--ink)", display: "block" }}>{b}</b>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{s}</span></div>
      {rechts}
    </div>
  );
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <style>{window.MK_CSS}</style>
      <div style={{ marginTop: 34 }}>
        <span className="mk-mono" style={{ color: "var(--signal-deep)" }}>System</span>
        <h1 style={{ margin: "6px 0 0", font: "500 clamp(28px,3vw,40px)/1.05 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Einstellungen<span style={{ color: "var(--signal)" }}>.</span></h1>
      </div>
      <div className="mk-secthead"><h2>Benachrichtigungen</h2></div>
      <div className="mk-card" style={{ paddingTop: 4, paddingBottom: 4 }}>
        {zeile("Push bei neuen Leads", "Sofort, Speed-to-Lead zählt", sw("push"))}
        {zeile("Montag-Digest", "Wochenreview jeden Montag 08:00", sw("digest"))}
        {zeile("Töne", "Dezenter Hinweiston bei Triage-Eingängen", sw("sound"))}
      </div>
      <div className="mk-secthead"><h2>Integrationen</h2></div>
      <div className="mk-card" style={{ paddingTop: 4, paddingBottom: 4 }}>
        {[["Gmail / Google Workspace", "E-Mails laufen in die Kontakt-Threads", "Verbunden"], ["willhaben", "Portal-Export + Anfragen-Import", "Verbunden"], ["ImmoScout24", "Portal-Export + Anfragen-Import", "Verbunden"], ["ImmoUnited", "Grundbuch- und Kaufvertragsdaten", "Verbunden"], ["Kalender (CalDAV)", "Besichtigungs-Slots synchron", "Verbunden"]].map(([b, s, st]) =>
          zeile(b, s, <span className="mk-pill ok">{st}</span>))}
      </div>
      <div className="mk-secthead"><h2>Rollen & Rechte</h2></div>
      <div className="mk-card" style={{ paddingTop: 4, paddingBottom: 4, marginBottom: 40 }}>
        {[["Daniel Hayden", "Inhaber · alle Rechte", "Du"], ["Lisa Moser", "Assistenz · Kontakte, Kalender, Objekte", "Aktiv"], ["UNIO Concierge", "Service · Finanzierung, Recht (nur eigene Threads)", "Aktiv"]].map(([b, s, st]) =>
          zeile(b, s, <span className="mk-pill">{st}</span>))}
      </div>
    </div>
  );
}

/* Marketing-Hub: Shop + Kampagnen als Linsen unter einem Dach */
function MkMarketing({ onNav }) {
  const [tab, setTab] = React.useState("shop");
  return (
    <div>
      <style>{window.MK_CSS}</style>
      <div className="mk-views" style={{ margin: "30px auto 0", maxWidth: 1360, paddingLeft: 2 }}>
        <button className={tab === "shop" ? "on" : ""} onClick={() => setTab("shop")}>Shop & Aufträge</button>
        <button className={tab === "meta" ? "on" : ""} onClick={() => setTab("meta")}>Meta-Kampagnen</button>
      </div>
      {tab === "shop" ? <window.ShopSeite onNav={onNav} /> : <window.MetaMarketing onNav={onNav} />}
    </div>
  );
}

Object.assign(window, { MkZiele, MkZieleBereich, MkSettings, MkMarketing });
