/* UNIO — System-Bento „Ein System für deinen gesamten Verkauf."
   Geteilt zwischen Startseite und Makler-Seite (window.SystemBento).
   Benötigt site-shared.jsx (window.useTick). */
/* ---------- System-Bento (weiß, animiert) ---------- */
function BCard({ span = 2, orange = false, title, copy, children, style }) {
  const mob = window.useMobile();
  return (
    <div style={{
      gridColumn: mob ? "auto" : `span ${span}`,
      background: orange ? "var(--signal)" : "#FFFFFF",
      color: orange ? "var(--on-signal)" : "var(--ink-2)",
      borderRadius: "var(--r-card)",
      padding: "26px 26px 24px",
      boxShadow: orange ? "var(--shadow-float)" : "inset 0 0 0 1px var(--hairline-dark), var(--shadow-1, 0 1px 2px rgba(11,10,9,0.04))",
      display: "flex", flexDirection: "column", gap: 12, minHeight: 280,
      ...style,
    }}>
      <div style={{ font: "500 20px/1.2 var(--font-display)", letterSpacing: "-0.02em", color: orange ? "#FFFFFF" : "var(--ink)" }}>{title}</div>
      <p style={{ margin: 0, font: "400 14.5px/1.55 var(--font-display)", color: orange ? "rgba(255,245,239,0.92)" : "var(--text-muted)", maxWidth: "36ch" }}>{copy}</p>
      <div style={{ marginTop: "auto", paddingTop: 16 }}>{children}</div>
    </div>
  );
}

const chipStyle = (on) => ({
  font: "500 13px var(--font-display)",
  padding: "7px 13px",
  borderRadius: "var(--r-pill)",
  display: "inline-flex", alignItems: "center", gap: 7,
  background: on ? "var(--signal-soft)" : "transparent",
  color: on ? "var(--signal-deep)" : "var(--text-muted)",
  boxShadow: on ? "inset 0 0 0 1px rgba(255,170,9,0.35)" : "inset 0 0 0 1px var(--hairline-dark)",
  transition: "all var(--dur-fast) var(--ease-unio)",
});

/* 1 — KI-Suche: Text tippt sich selbst */
function AnimSuche({ text = "Penthouse mit Terrasse, Hernals" }) {
  const t = window.useTick(text.length + 14, 110);
  const typed = text.slice(0, Math.min(text.length, t));
  const done = t >= text.length;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--paper)", borderRadius: "var(--r-inner)", padding: "13px 16px", boxShadow: "inset 0 0 0 1px var(--hairline-dark)" }}>
        <span aria-hidden="true" style={{ font: "14px var(--font-mono)", color: "var(--text-muted)" }}>→</span>
        <span style={{ font: "400 15px var(--font-display)", color: "var(--ink-2)", minHeight: 20 }}>
          {typed}<span style={{ display: "inline-block", width: 2, height: 15, background: "var(--signal)", marginLeft: 2, verticalAlign: "-2px" }}></span>
        </span>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span style={chipStyle(true)}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)" }}></span>KI-Suche</span>
        <span style={{ ...chipStyle(false), opacity: done ? 1 : 0.25 }}>{done ? "14 Treffer" : "…"}</span>
        <span style={chipStyle(false)}>Nur meine</span>
      </div>
    </div>
  );
}

/* 2 — Provisionssicherung: Haken poppt */
function AnimSchutz() {
  const t = window.useTick(4, 900);
  const on = t >= 1;
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingBottom: 8 }}>
      <span style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.2)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.45)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "32px var(--font-mono)", color: "#FFFFFF", transform: on ? "scale(1)" : "scale(0.55)", opacity: on ? 1 : 0, transition: "all 500ms var(--ease-unio)" }}>✓</span>
    </div>
  );
}

/* 3 — Suggested Actions: Zeilen steigen nacheinander auf */
function AnimActions() {
  const t = window.useTick(7, 700);
  const rows = [["Lead telefonisch kontaktieren", "Jetzt"], ["Besichtigung vorschlagen", "Heute"], ["Suchprofil ergänzen", "Diese Woche"]];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {rows.map(([txt, w], i) => {
        const on = t > i;
        return (
          <div key={txt} style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--paper)", borderRadius: 10, padding: "9px 13px", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", opacity: on ? (i === 0 ? 1 : 0.75) : 0, transform: on ? "none" : "translateY(10px)", transition: "all 450ms var(--ease-unio)" }}>
            <span style={{ width: 16, height: 16, borderRadius: "50%", flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "10px var(--font-mono)", background: t > i + 3 ? "var(--signal)" : "var(--signal-soft)", color: t > i + 3 ? "#FFFFFF" : "transparent", transition: "all 350ms var(--ease-unio)" }}>✓</span>
            <span style={{ font: "500 13px var(--font-display)", color: "var(--ink-2)" }}>{txt}</span>
            <span style={{ marginLeft: "auto", font: "10.5px var(--font-mono)", color: i === 0 ? "var(--signal-deep)" : "var(--text-muted)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{w}</span>
          </div>
        );
      })}
    </div>
  );
}

/* 4 — Portal-Export: Sync-Häkchen poppen nacheinander */
function AnimPortale() {
  const t = window.useTick(5, 850);
  const tiles = [["IS", "var(--signal-deep)"], ["W", "var(--signal)"]];
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 8 }}>
      {tiles.map(([n, bg], i) => (
        <React.Fragment key={n}>
          {i > 0 && <span aria-hidden="true" style={{ width: 34, borderTop: "2px dashed rgba(255,170,9,0.5)", opacity: t >= 1 ? 1 : 0.3, transition: "opacity 400ms" }}></span>}
          <span style={{ position: "relative", width: 54, height: 54, borderRadius: 14, background: bg, color: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "500 17px var(--font-display)", boxShadow: "var(--shadow-float)" }}>
            {n}
            <span style={{ position: "absolute", right: -6, bottom: -6, width: 20, height: 20, borderRadius: "50%", background: "var(--ink)", color: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "10px var(--font-mono)", border: "2px solid #FFFFFF", transform: t >= i + 2 ? "scale(1)" : "scale(0)", transition: "transform 350ms var(--ease-unio)" }}>✓</span>
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

/* 5 — Kalender: Termin wandert */
function AnimKalender() {
  const t = window.useTick(28, 260);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 15px)", gap: 5, justifyContent: "center", paddingBottom: 8 }}>
      {Array.from({ length: 28 }).map((_, k) => {
        const on = k === (t * 5 + 3) % 28;
        return <span key={k} style={{ width: 15, height: 15, borderRadius: 4, background: on ? "var(--signal)" : "var(--paper-3)", boxShadow: on ? "0 0 0 3px var(--signal-soft)" : "none", transition: "all 250ms var(--ease-unio)" }}></span>;
      })}
    </div>
  );
}

/* LENS — Live-Signale ticken hoch */
function AnimLens() {
  const t = window.useTick(40, 900);
  const bars = [5, 8, 6, 9, 7, 8, 6];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 30 }}>
        {bars.map((v, k) => {
          const on = (t % bars.length) >= k;
          return <span key={k} style={{ flex: 1, height: (v / 9 * 100) + "%", background: on ? "var(--signal)" : "var(--paper-3)", borderRadius: 1, transition: "background 300ms var(--ease-unio)" }}></span>;
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal)" }}></span>
        <span style={{ font: "13px var(--font-mono)", color: "var(--ink-2)" }}>Live · {120 + (t % 12)} Signale / Tag</span>
      </div>
    </div>
  );
}

/* Lead Engine — Pipeline: Stufen füllen sich nacheinander */
function AnimLead() {
  const stages = [["Leads", 100], ["Qualifiziert", 62], ["Termin", 34], ["Close", 12]];
  const t = window.useTick(stages.length + 3, 720);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {stages.map(([n, w], i) => {
        const on = t > i;
        return (
          <div key={n} style={{ display: "grid", gridTemplateColumns: "84px 1fr 34px", gap: 10, alignItems: "center" }}>
            <span className="u-label" style={{ fontSize: 10, color: "var(--text-muted)" }}>{n}</span>
            <span style={{ height: 8, borderRadius: 4, background: "var(--paper-3)", overflow: "hidden" }}>
              <span style={{ display: "block", height: "100%", width: on ? w + "%" : "0%", background: i === stages.length - 1 ? "var(--signal)" : "var(--ink-3)", borderRadius: 4, transition: "width 500ms var(--ease-unio)" }}></span>
            </span>
            <span style={{ font: "11px var(--font-mono)", color: "var(--ink-2)", textAlign: "right" }}>{on ? w : 0}</span>
          </div>
        );
      })}
    </div>
  );
}

/* Bauträger — High-End-Marketing: Kanal-Performance-Balken */
function AnimBautraeger() {
  const chans = [["Meta", 9], ["Google", 6], ["willhaben", 7], ["IS24", 4]];
  const t = window.useTick(chans.length + 3, 640);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 40 }}>
        {chans.map(([n, v], k) => {
          const on = t > k;
          return (
            <div key={n} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <span style={{ width: "100%", height: on ? (v / 9 * 40) : 0, background: "#FFFFFF", borderRadius: 2, transition: "height 500ms var(--ease-unio)" }}></span>
              <span style={{ font: "10px var(--font-mono)", letterSpacing: "0.06em", color: "rgba(255,245,239,0.8)" }}>{n}</span>
            </div>
          );
        })}
      </div>
      <div className="u-label" style={{ fontSize: 10, color: "rgba(255,245,239,0.92)", marginTop: 10 }}>Channel Performance · High-End-Kampagne</div>
    </div>
  );
}

/* 6 — Matching: Chips poppen, dann Treffer */
function AnimMatching() {
  const chips = ["Wohnung", "€ 1,0–1,5 Mio", "4–5 Zi", "1020 Wien"];
  const t = window.useTick(chips.length + 4, 700);
  const found = t > chips.length;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        {chips.map((c, i) => (
          <span key={c} style={{ ...chipStyle(true), opacity: t > i ? 1 : 0.15, transform: t > i ? "scale(1)" : "scale(0.9)" }}>{c}</span>
        ))}
      </div>
      <span style={{ font: "12px var(--font-mono)", letterSpacing: "0.08em", color: "var(--signal-deep)", opacity: found ? 1 : 0, transform: found ? "none" : "translateY(6px)", transition: "all 400ms var(--ease-unio)" }}>✓ PASSENDES OBJEKT GEFUNDEN</span>
    </div>
  );
}

/* 7 — KI-Objektanlage: Zähler auf Orange */
function AnimAnlage({ pct = 90 }) {
  const t = window.useTick(24, 260);
  const val = Math.min(pct, Math.round((t / 16) * pct));
  return (
    <div>
      <span style={{ font: "500 56px/1 var(--font-display)", letterSpacing: "-0.03em", color: "#FFFFFF", fontVariantNumeric: "tabular-nums" }}>{val} %</span>
      <div className="u-label" style={{ color: "rgba(255,245,239,0.92)", marginTop: 10 }}>weniger Tipparbeit pro Objekt</div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.3)", borderRadius: 2, marginTop: 16, overflow: "hidden" }}>
        <div style={{ height: "100%", width: (val / pct) * 100 + "%", background: "#FFFFFF", borderRadius: 2, transition: "width 250ms linear" }}></div>
      </div>
    </div>
  );
}

/* Ansprechpartner-Kachel (Makler): Software-Bento mit einem Gesicht darin */
function AnsprechTile() {
  return (
    <BCard span={2} title="Dein Ansprechpartner im CIRCLE" copy="Software automatisiert die Prozesse — entschieden und begleitet wird von Menschen.">
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ width: 54, height: 54, borderRadius: "50%", flex: "none", border: "1px dashed var(--hairline-dark)", background: "var(--paper-2)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "10px var(--font-mono)", letterSpacing: "0.06em", color: "var(--text-muted)" }}>FOTO</span>
        <div>
          <div style={{ font: "500 15px var(--font-display)", color: "var(--ink)" }}>[PLATZHALTER: Name]</div>
          <span className="u-label" style={{ fontSize: 10, color: "var(--text-muted)" }}>Partner-Management · Wien</span>
        </div>
      </div>
    </BCard>
  );
}

function SystemBento({ makler = false }) {
  const Kap = makler && window.BT ? window.BT.Kap : null;
  const mob = window.useMobile();
  return (
    <section id="system" data-screen-label="System" data-track={makler ? "chapter_view_04" : null} style={{ background: "#FFFFFF", padding: mob ? "96px 6vw 100px" : "120px 5vw 130px", position: "relative" }}>
      {Kap ? <Kap nr="04" label="System" /> : null}
      <div style={{ maxWidth: 760, marginBottom: mob ? 52 : 88 }}>
        {(() => { const R = window.Reveal; const H = (
        <h2 style={{ margin: 0, font: "500 clamp(38px, 4.2vw, 72px)/1.02 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>
          Ein System für deinen<br />gesamten Verkauf.
        </h2>
        ); return R ? <R>{H}</R> : H; })()}
        <p style={{ margin: "20px 0 0", font: "400 18px/1.6 var(--font-display)", color: "var(--text-muted)", maxWidth: 560 }}>
          Jede Funktion hier hat denselben Job: dir Verwaltungszeit abzunehmen, damit du sie Menschen gibst. Mehr Gespräche, mehr Besichtigungen, mehr Abschlüsse.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(6, 1fr)", gap: 16 }}>
        <BCard span={4} title="KI-Suche & Lead-Inbox" copy="Frag in natürlicher Sprache nach Objekten oder Käufern — die Plattform versteht dich und liefert sofort passende Treffer."><AnimSuche text={makler ? "Penthouse mit Terrasse, 1190 Wien" : "Penthouse mit Terrasse, Hernals"} /></BCard>
        <BCard span={2} orange title="Provisionssicherung" copy="Jeder Lead wird automatisch abgesichert — bevor du Zeit investierst."><AnimSchutz /></BCard>
        <BCard span={2} title="Suggested Actions" copy="Das System sagt dir den nächsten Schritt — priorisiert nach Wirkung."><AnimActions /></BCard>
        <BCard span={2} title="Portal-Export" copy="Ein Klick veröffentlicht auf ImmobilienScout24 & willhaben — inkl. Update & Rückzug."><AnimPortale /></BCard>
        <BCard span={2} title="Besichtigung & Kalender" copy="Termine direkt aus dem Lead heraus buchen — synchron mit deinem Kalender."><AnimKalender /></BCard>
        {makler ? (
          <React.Fragment>
            <BCard span={2} title="Automatisches Matching" copy="Aus jeder Anfrage entsteht ein Suchprofil — laufend gegen deinen Bestand gematcht."><AnimMatching /></BCard>
            <BCard span={2} orange title="KI-Objektanlage" copy="Dokumente rein — Vermarktung raus.">
              <a href="#objektanlage" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", textDecoration: "none", color: "#FFFFFF" }}>
                <span style={{ font: "400 13px/1.5 var(--font-display)", color: "rgba(255,245,239,0.9)", maxWidth: "22ch" }}>Die ganze Verwandlung — eine Scroll-Sequenz weiter unten.</span>
                <span aria-hidden="true" style={{ width: 40, height: 40, borderRadius: "50%", flex: "none", background: "rgba(255,255,255,0.18)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "16px var(--font-mono)" }}>↓</span>
              </a>
            </BCard>
            <AnsprechTile />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <BCard span={2} title="Automatisches Matching" copy="Aus jeder Anfrage entsteht ein Suchprofil — die Plattform matcht es laufend gegen deinen Bestand."><AnimMatching /></BCard>
            <BCard span={2} orange title="KI-Objektanlage" copy="Dokumente reinziehen — die KI erstellt Exposé, Daten und Suchprofil automatisch."><AnimAnlage /></BCard>
            <BCard span={2} title="LENS — Live-Dashboard" copy="Pipeline, Nachfrage und Kosten in Echtzeit — du siehst jederzeit, wo ein Projekt steht."><AnimLens /></BCard>
            <BCard span={3} title="Lead Engine" copy="Realtime Demand über die relevanten Kanäle — mit KI-Qualifizierung, Intent Score und sauberem Tracking bis zum Close."><AnimLead /></BCard>
            <BCard span={3} orange title="Für Bauträger" copy="Markttest vor dem Baustart, Vermarktung und Vertrieb als ein System — 100 % erfolgsbasiert.">
              <AnimBautraeger />
              <a href="bautraeger.html" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#FFFFFF", font: "500 14px var(--font-display)", marginTop: 16 }}>
                Projekt prüfen lassen
                <span aria-hidden="true" style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.2)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "13px var(--font-mono)" }}>→</span>
              </a>
            </BCard>
          </React.Fragment>
        )}
      </div>
    </section>
  );
}


Object.assign(window, { SystemBento });
