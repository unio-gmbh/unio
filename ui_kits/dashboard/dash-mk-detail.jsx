/* UNIO: Lage-Sektion und AI-Concierge für Immobilien-Detailseiten (Makler und Endkunde).
   Regeln aus docs/MAKLER_RESEARCH_2026-08_RUNDE2.md und der Detailseiten-Recherche:
   - Lage nach Beschreibung, vor Dokumenten. Drei Scores als Ring mit Textlabel (nie Sterne),
     Öffi-Score ist für Wien die Leitkennzahl. POI immer in Gehminuten, max. 3 pro Kategorie.
   - Karte statisch mit Click-to-activate; Adresse vor Anfrage nur als Radius (Kombinationsgefahr).
   - Concierge: inline-Block plus persistenter Launcher, kein Auto-Open, AI-Kennzeichnung
     ist ab 02.08.2026 Pflicht (EU AI Act Art. 50), Handoff bei Preis, Recht und Terminen. */

const MK_DETAIL_CSS = `
  .mkd-lage{background:var(--surface-raised);border-radius:16px;box-shadow:inset 0 0 0 1px var(--hairline-dark);padding:20px 22px;}
  .mkd-scores{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin:16px 0 20px;}
  .mkd-score{display:flex;align-items:center;gap:12px;}
  .mkd-score .txt b{display:block;font:500 14px var(--font-display);color:var(--ink);}
  .mkd-score .txt span{display:block;font-size:11.5px;color:var(--text-muted);margin-top:2px;}
  .mkd-karte{position:relative;border-radius:14px;overflow:hidden;background:#E8E4DC;aspect-ratio:16/9;cursor:pointer;}
  .mkd-karte img{width:100%;height:100%;object-fit:cover;display:block;}
  .mkd-karte .radius{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44%;aspect-ratio:1;
    border-radius:99px;background:rgba(255,170,9,.18);border:2px solid rgba(255,170,9,.6);}
  .mkd-karte .hinweis{position:absolute;left:12px;bottom:12px;background:rgba(11,10,9,.7);color:#F7F5F1;border-radius:99px;
    padding:7px 13px;font-family:var(--font-mono),monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;backdrop-filter:blur(8px);}
  .mkd-poi{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 20px;margin-top:18px;}
  .mkd-poi .kat{font-family:var(--font-mono),monospace;font-size:8.5px;letter-spacing:.12em;text-transform:uppercase;
    color:var(--signal-deep);margin-bottom:7px;}
  .mkd-poi .zeile{display:flex;justify-content:space-between;gap:10px;font-size:13px;padding:4px 0;color:var(--ink);}
  .mkd-poi .zeile span{color:var(--text-muted);white-space:nowrap;}
  .mkd-oeffi{display:flex;align-items:center;gap:10px;margin-top:18px;padding:13px 16px;border-radius:12px;
    background:rgba(255,170,9,.09);border:1px solid rgba(255,170,9,.28);font-size:13.5px;color:var(--ink);flex-wrap:wrap;}
  /* Concierge */
  /* Helle Flaeche: schwarze Bloecke passen nicht in die Objektansicht */
  .mkd-con{background:#FFFFFF;border-radius:16px;padding:20px 22px;color:var(--ink);position:relative;overflow:hidden;
    box-shadow:inset 0 0 0 1px var(--hairline-dark);}
  .mkd-con .glow{position:absolute;inset:0;pointer-events:none;
    background:radial-gradient(60% 70% at 88% 10%, rgba(255,170,9,.14), transparent 60%);}
  .mkd-con .inhalt{position:relative;display:flex;gap:14px;align-items:flex-start;}
  .mkd-con .avatar{width:38px;height:38px;border-radius:99px;background:var(--signal);color:#1A1305;
    display:grid;place-items:center;flex:0 0 auto;font-size:17px;}
  .mkd-con b.frage{display:block;font:500 18px var(--font-display);letter-spacing:-.02em;}
  .mkd-con .ai{font-family:var(--font-mono),monospace;font-size:8.5px;letter-spacing:.12em;text-transform:uppercase;
    color:var(--signal-deep);}
  .mkd-chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;}
  .mkd-chips button{border:none;background:var(--paper-2);color:var(--ink);box-shadow:inset 0 0 0 1px var(--hairline-dark);
    border-radius:99px;padding:9px 15px;cursor:pointer;font:500 12.5px var(--font-display);font-family:inherit;min-height:40px;}
  .mkd-chips button.makler{background:var(--signal);color:#1A1305;box-shadow:none;}
  .mkd-launcher{position:fixed;right:20px;bottom:20px;z-index:110;width:60px;height:60px;border-radius:99px;border:none;
    cursor:pointer;background:var(--signal);color:#1A1305;font-size:22px;box-shadow:0 18px 40px -14px rgba(20,18,16,.4);}
  .mkd-sheetwrap{position:fixed;inset:0;z-index:130;pointer-events:none;}
  .mkd-sheetwrap.auf{pointer-events:auto;}
  .mkd-sheetwrap .back{position:absolute;inset:0;background:rgba(11,10,9,.42);opacity:0;transition:opacity .25s;}
  .mkd-sheetwrap.auf .back{opacity:1;}
  .mkd-sheet{position:absolute;right:20px;bottom:20px;width:min(400px,calc(100vw - 40px));max-height:70vh;
    background:var(--paper);border-radius:20px;display:flex;flex-direction:column;overflow:hidden;
    transform:translateY(16px) scale(.98);opacity:0;transition:all .28s cubic-bezier(0.32,0.72,0,1);
    box-shadow:0 30px 70px -20px rgba(11,10,9,.5);}
  .mkd-sheetwrap.auf .mkd-sheet{transform:none;opacity:1;}
  .mkd-sheet .kopf{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--hairline-dark);}
  .mkd-sheet .verlauf{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:9px;}
  .mkd-msg{max-width:84%;border-radius:14px;padding:10px 14px;font-size:13.5px;line-height:1.5;}
  .mkd-msg.ai{background:#EFEBE3;color:var(--ink);border-bottom-left-radius:4px;}
  .mkd-msg.du{align-self:flex-end;background:var(--ink);color:var(--paper);border-bottom-right-radius:4px;}
  .mkd-sheet .fuss{padding:12px;border-top:1px solid var(--hairline-dark);display:flex;gap:8px;}
  .mkd-sheet .fuss input{flex:1;min-width:0;border:none;background:#EFEBE3;border-radius:999px;padding:11px 16px;
    font:400 16px var(--font-display);font-family:inherit;color:var(--ink);outline:none;}
  @media (max-width:760px){
    .mkd-scores{grid-template-columns:minmax(0,1fr);gap:10px;}
    .mkd-poi{grid-template-columns:minmax(0,1fr);}
    .mkd-karte{aspect-ratio:auto;height:240px;}
    /* Mobil ist der Concierge ein Sheet, das auf Vollbild geht */
    /* left/right statt 100vw: 100vw zaehlt die Scrollbar mit und laeuft ueber. */
    .mkd-sheet{left:0;right:0;bottom:0;width:auto;max-height:88vh;border-radius:20px 20px 0 0;}
    .mkd-launcher{right:16px;bottom:16px;width:56px;height:56px;}
  }
`;

/* ---------- Lage: Karte, Scores, POI, Wien-Öffi-Zeile ---------- */
const MKD_LAGE = {
  scores: [
    { k: "Öffi-Anbindung", wert: 92, label: "Hervorragend", sub: "U4 und zwei Buslinien im Gehradius" },
    { k: "Alltag zu Fuß", wert: 78, label: "Sehr gut", sub: "Nahversorgung, Arzt, Schule unter 10 Min" },
    { k: "Ruhe", wert: 64, label: "Gut", sub: "Wohnstraße, kein Durchzugsverkehr" },
  ],
  poi: [
    ["Öffentlich", [["U4 Meidling Hauptstraße", "4 Min"], ["Straßenbahn 62", "6 Min"], ["Bus 63A", "3 Min"]]],
    ["Nahversorgung", [["Billa Plus", "5 Min"], ["Bäckerei Felber", "3 Min"], ["Apotheke", "7 Min"]]],
    ["Bildung", [["Volksschule Hernals", "8 Min"], ["Kindergarten", "5 Min"], ["Gymnasium", "12 Min"]]],
    ["Grün und Freizeit", [["Schwarzenbergpark", "9 Min"], ["Sportplatz", "6 Min"], ["Bad", "14 Min"]]],
  ],
  wien: "Stephansplatz in 21 Min mit U4 und U1 · Hauptbahnhof in 18 Min",
};

function MkLage({ exakt, ort, datenId }) {
  const [kartenAn, setKartenAn] = React.useState(false);
  const [wie, setWie] = React.useState(false);
  const R = 22, U = 2 * Math.PI * R;
  const farbe = (w) => w >= 85 ? "#2E7D46" : w >= 65 ? "var(--signal)" : "#B87400";
  /* Berechnete Werte aus offenen Daten laden (build/lage.mjs schreibt sie).
     Fehlt die Datei, bleiben die eingebauten Werte stehen, es bricht nichts. */
  const [daten, setDaten] = React.useState(null);
  React.useEffect(() => {
    if (!datenId) return;
    let lebt = true;
    fetch("/assets/data/lage/" + datenId + ".json")
      .then((a) => (a.ok ? a.json() : null))
      .then((d) => { if (lebt && d && d.scores) setDaten(d); })
      .catch(() => { /* offline oder noch nicht berechnet */ });
    return () => { lebt = false; };
  }, [datenId]);
  const L = daten || MKD_LAGE;
  return (
    <div className="mkd-lage">
      <style>{MK_DETAIL_CSS}</style>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
        <div>
          <span className="mk-mono" style={{ color: "var(--signal-deep)" }}>Lage und Infrastruktur</span>
          <h2 style={{ margin: "6px 0 0", font: "500 19px var(--font-display)", letterSpacing: "-.02em", color: "var(--ink)" }}>
            {(daten && daten.ort) || ort || "1170 Wien, Hernals"}
          </h2>
        </div>
        <button className="mk-btn ghost tiny" onClick={() => setWie(!wie)}>{wie ? "Schließen" : "Wie wird das berechnet?"}</button>
      </div>

      <div className="mkd-scores">
        {L.scores.map((s) => (
          <div key={s.k} className="mkd-score">
            <svg width="56" height="56" viewBox="0 0 56 56" style={{ flex: "0 0 auto" }}>
              <circle cx="28" cy="28" r={R} fill="none" stroke="var(--hairline-dark)" strokeWidth="4.5" />
              <circle cx="28" cy="28" r={R} fill="none" stroke={farbe(s.wert)} strokeWidth="4.5" strokeLinecap="round"
                strokeDasharray={U} strokeDashoffset={U * (1 - s.wert / 100)} transform="rotate(-90 28 28)" />
              <text x="28" y="32.5" textAnchor="middle" style={{ font: "600 13px var(--font-display)", fill: "var(--ink)" }}>{s.wert}</text>
            </svg>
            <div className="txt">
              <b>{s.k}: {s.label}</b>
              <span>{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {wie && (
        <p style={{ margin: "0 0 18px", fontSize: 12.5, lineHeight: 1.6, color: "var(--text-muted)", background: "#FFFFFF", padding: "12px 14px", borderRadius: 12 }}>
          Öffi-Anbindung aus Takt, Verkehrsmittelklasse (U-Bahn über Straßenbahn über Bus) und Gehzeit zur Station,
          Datenbasis Wiener Linien GTFS. Alltag zu Fuß aus Gehzeit und Dichte der Kategorien innerhalb von 15 Minuten,
          Datenbasis Stadt Wien und OpenStreetMap. Ruhe aus der strategischen Lärmkarte der Stadt Wien, korrigiert um
          Straßenklasse und Grünanteil. Gehzeiten über ein Routing auf dem Straßennetz, nicht Luftlinie.
          Hier Demo-Werte, die Pipeline steht in docs/LAGE_SCORES_DATENQUELLEN.md.
          <br /><span className="u-label" style={{ fontSize: 8, marginTop: 8, display: "inline-block" }}>Datenquellen: Stadt Wien · Wiener Linien · OpenStreetMap</span>
        </p>
      )}

      <div className="mkd-karte" onClick={() => setKartenAn(true)}>
        <img src="../../assets/img/vienna-street.jpg" alt="" loading="lazy" style={kartenAn ? null : { filter: "grayscale(.55) contrast(.92)" }} />
        {!exakt && <span className="radius" aria-hidden="true"></span>}
        <span className="hinweis">{kartenAn ? (exakt ? "Exakte Adresse" : "Ungefährer Bereich · Adresse nach Anfrage") : "Karte aktivieren"}</span>
      </div>

      <div className="mkd-poi">
        {/* Berechnete Daten liefern {kat, zeilen}, die eingebauten Demo-Werte ein Paar. */}
        {(daten ? daten.poi.map((g) => [g.kat, g.zeilen]) : MKD_LAGE.poi).map(([kat, liste]) => (
          <div key={kat}>
            <div className="kat">{kat}</div>
            {liste.map(([n, min]) => (
              <div key={n} className="zeile"><b style={{ fontWeight: 400 }}>{n}</b><span>{/Min/.test(min) ? min : min + " zu Fuß"}</span></div>
            ))}
          </div>
        ))}
      </div>

      <div className="mkd-oeffi">
        <span style={{ fontSize: 15 }}>🚇</span>
        <span>{daten ? daten.oeffiSatz : MKD_LAGE.wien}</span>
      </div>
      <p className="mk-mono" style={{ marginTop: 12 }}>
        {daten
          ? "Berechnet aus offenen Daten am " + daten.stand.split("-").reverse().join(".") + " · " + daten.quellen.join(" · ")
          : "Gehzeiten aus Wiener Linien Open Data und OSM · Demo-Werte"}
      </p>
    </div>
  );
}

/* ---------- AI-Concierge: inline-Block + Launcher + Sheet ---------- */
const MKD_CHIPS = [
  ["Was kostet der Betrieb?", "Die Betriebskosten liegen bei rund € 2,90 je m² und Monat, also etwa € 410 für diese Wohnung, plus Rücklage. Die genaue Abrechnung des Vorjahres liegt in den Dokumenten."],
  ["Wann ist Bezug möglich?", "Die Übergabe ist ab 11.05.2026 geplant. Bei Anbot im laufenden Monat ist ein früherer Bezug in Absprache mit dem Bauträger möglich."],
  ["Ist ein Parkplatz dabei?", "Zwei Tiefgaragenplätze sind optional zubuchbar, je € 28.000. Ein Platz ist aktuell noch frei."],
  ["Wie ist die Anbindung?", "Die U4 Meidling Hauptstraße erreichst du in 4 Minuten zu Fuß, den Stephansplatz in 21 Minuten. Der Öffi-Score liegt bei 92 von 100."],
];

function MkConcierge({ objekt, inline, onMakler }) {
  const [auf, setAuf] = React.useState(false);
  const [msgs, setMsgs] = React.useState([]);
  const [text, setText] = React.useState("");
  const endRef = React.useRef(null);
  React.useEffect(() => { if (endRef.current) endRef.current.scrollIntoView({ block: "end" }); }, [msgs, auf]);

  const frage = (f, a) => {
    setAuf(true);
    setMsgs((m) => [...m, { du: true, t: f }]);
    setTimeout(() => setMsgs((m) => [...m, { du: false, t: a || "Dazu habe ich keine gesicherte Information. Das beantwortet dir Lukas Brandtner persönlich, er kennt das Objekt im Detail.", handoff: !a }]), 420);
  };
  const senden = () => {
    const t = text.trim(); if (!t) return;
    const treffer = MKD_CHIPS.find(([f]) => t.toLowerCase().split(" ").some((w) => w.length > 4 && f.toLowerCase().includes(w)));
    setText(""); frage(t, treffer ? treffer[1] : null);
  };

  const sheet = (
    <div className={"mkd-sheetwrap" + (auf ? " auf" : "")} aria-hidden={!auf}>
      <div className="back" onClick={() => setAuf(false)}></div>
      <div className="mkd-sheet" role="dialog" aria-modal="true">
        <div className="kopf">
          <span style={{ width: 34, height: 34, borderRadius: 99, background: "var(--ink)", color: "var(--signal)", display: "grid", placeItems: "center", fontSize: 15, flex: "0 0 auto" }}>✦</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <b style={{ font: "500 14.5px var(--font-display)", color: "var(--ink)", display: "block" }}>UNIO Concierge</b>
            <span className="mk-mono" style={{ fontSize: 8 }}>KI-Assistent · Antworten können Fehler enthalten</span>
          </div>
          <button className="mk-btn ghost tiny" onClick={() => setAuf(false)} aria-label="Schließen">✕</button>
        </div>
        <div className="verlauf">
          {msgs.length === 0 && (
            <div className="mkd-msg ai">Ich bin ein KI-Assistent und kenne die Daten zu {objekt || "diesem Objekt"}. Frag mich nach Kosten, Ausstattung, Lage oder Terminen.</div>
          )}
          {msgs.map((m, i) => (
            <React.Fragment key={i}>
              <div className={"mkd-msg " + (m.du ? "du" : "ai")}>{m.t}</div>
              {m.handoff && (
                <div style={{ background: "#FFFFFF", borderRadius: 14, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", padding: "12px 14px", display: "flex", alignItems: "center", gap: 11 }}>
                  <img src="../../assets/team/portrait-02.jpg" alt="" style={{ width: 38, height: 38, borderRadius: 99, objectFit: "cover" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <b style={{ font: "500 13.5px var(--font-display)", color: "var(--ink)", display: "block" }}>Lukas Brandtner</b>
                    <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>antwortet meist in unter 2 Stunden</span>
                  </div>
                  <button className="mk-btn tiny" onClick={() => { setAuf(false); onMakler && onMakler(); }}>Fragen</button>
                </div>
              )}
            </React.Fragment>
          ))}
          <div ref={endRef}></div>
        </div>
        <div className="fuss">
          <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && senden()} placeholder="Frage zum Objekt ..." />
          <button className="mk-btn" onClick={senden}>Fragen</button>
        </div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <style>{MK_DETAIL_CSS}</style>
      {inline && (
        <div className="mkd-con">
          <div className="glow" aria-hidden="true"></div>
          <div className="inhalt">
            <span className="avatar" aria-hidden="true">✦</span>
            <div style={{ minWidth: 0 }}>
              <span className="ai">UNIO Concierge · KI-Assistent</span>
              <b className="frage">Fragen zu diesem Objekt?</b>
              <div className="mkd-chips">
                {MKD_CHIPS.map(([f, a]) => <button key={f} onClick={() => frage(f, a)}>{f}</button>)}
                <button className="makler" onClick={() => { onMakler && onMakler(); }}>Mit Makler sprechen</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button className="mkd-launcher" onClick={() => setAuf(true)} aria-label="UNIO Concierge öffnen">✦</button>
      {sheet}
    </React.Fragment>
  );
}

Object.assign(window, { MkLage, MkConcierge, MK_DETAIL_CSS, MKD_LAGE });
