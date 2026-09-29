/* Werkbank. Markenbuch: das Ergebnis des Branding-Prozesses in einer Ansicht, wie ein Agentur-Markenbuch.
   Liest `plattform` (docs/werkbank/MARKE_SCHEMA.md) und die gewählte Markenwelt. Team sieht zusätzlich die Qualitätsprüfung
   und gibt als Creative Director frei (Gate 2). */

const HM_MB_KAPITEL = [["einsicht", "Einsicht"], ["position", "Positionierung"], ["werte", "Werte"], ["stimme", "Stimme"], ["story", "Story"], ["botschaften", "Botschaften"], ["visuell", "Erscheinung"], ["saeulen", "Säulen"], ["konzepte", "Konzepte"], ["start", "Erste 30 Tage"]];

function hmMbStand(mid) {
  const alle = hmStore.get("markenbuch") || {};
  return alle[mid] || { status: "entwurf" };
}
function hmMbSetzen(mid, patch) { hmStore.patch("markenbuch", (a) => ({ ...(a || {}), [mid]: { ...((a || {})[mid] || { status: "entwurf" }), ...patch } })); }

/* Plattform holen: gespeichert (falls die Plattform-Datei speichert) oder frisch erzeugt */
function hmMbPlattform(mid) {
  const gespeichert = (hmStore.get("plattformen") || {})[mid];
  const aus = gespeichert && (gespeichert.aktuell || (gespeichert.versionen && gespeichert.versionen[gespeichert.versionen.length - 1]) || (gespeichert.positionierung ? gespeichert : null));
  if (aus) return aus;
  return window.hmPlattform ? hmPlattform(mid) : null;
}
function hmMbWelt(mid, p) {
  const W = window.HM_MARKENWELTEN || [];
  const st = hmMbStand(mid);
  const id = st.welt || (p && p.visuell && p.visuell.welt);
  return W.find((w) => w.id === id) || W[0] || null;
}

function MbKapitel({ id, titel, children, unter }) {
  return <section className="hm-mb-kap" id={"mb-" + id}>
    <div className="hm-mb-kopf"><h3>{titel}</h3>{unter && <p>{unter}</p>}</div>
    <div className="hm-mb-inhalt">{children}</div>
  </section>;
}
const MbText = ({ t, luecke }) => t ? <span>{t}</span> : <span className="hm-mb-luecke">{luecke || "Kommt aus dem Workshop"}</span>;

function Markenbuch({ m, teamSicht }) {
  useHm("plattformen"); useHm("markenbuch"); useHm("strategien"); useHm("fragebogen"); useHm("branding"); useHm("portraits");
  const [neu, setNeu] = React.useState(0);
  const p = React.useMemo(() => hmMbPlattform(m.id), [m.id, neu, JSON.stringify((hmStore.get("plattformen") || {})[m.id] || null)]);
  const st = hmMbStand(m.id);
  const b = hmBrand(m.id);
  const welt = hmMbWelt(m.id, p);
  const [kap, setKap] = React.useState("einsicht");
  if (!p) return <Leer titel="Das Markenbuch entsteht aus Fragebogen und Workshop." text="Sobald dein Weg gewählt ist, steht es hier." />;
  const q = p.qualitaet || (window.hmMarkenQualitaet ? hmMarkenQualitaet(p, m.id) : null);
  const bb = { ...b, plattform: p };
  const freigegeben = st.status === "freigegeben";
  const springen = (id) => { setKap(id); const el = document.getElementById("mb-" + id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const neuErzeugen = async () => { const f = window.hmPlattformClaude || window.hmPlattform; const erg = await Promise.resolve(f(m.id)); if (window.hmPlattformSpeichern) hmPlattformSpeichern(m.id, erg); setNeu((x) => x + 1); hmMbSetzen(m.id, { status: "pruefung" }); toast(erg && erg.quelle === "claude" ? "Neu geschrieben" : "Neu erzeugt aus den Antworten"); };
  const drucken = () => { const el = document.querySelector(".hm-mb-seiten"); if (!el) return; const css = [...document.styleSheets].flatMap((s) => { try { return [...s.cssRules].map((r) => r.cssText); } catch { return []; } }).join("\n"); hmDrucken(`Markenbuch ${b.makler.name}`, `<div class="hm-mb-druck">${el.outerHTML}</div>`, css + "\n.hm-mb-nav,.hm-mb-aktion{display:none}.hm-mb-kap{page-break-inside:avoid;break-inside:avoid}body{background:#fff}"); };
  return <div className="hm-mb">
    <div className="hm-mb-titel">
      <div className="hm-mb-logo"><BrandLogo b={b} h={34} /></div>
      <h2 className="hm-h hm-h1">Markenbuch</h2>
      <div className="hm-kontext">{b.makler.name}{freigegeben ? `, freigegeben am ${hmFmtDate(st.am || HM_HEUTE)}` : st.status === "pruefung" ? ", Daniel prüft" : ", Entwurf"}{p.quelle === "claude" ? "" : ", aus deinen Antworten"}</div>
      <div className="hm-row hm-mb-aktion" style={{ gap: 14, marginTop: 12 }}>
        <button className="hm-link" onClick={drucken}>Als PDF sichern</button>
        {welt && window.MaterialKnopf && <MaterialKnopf m={m} />}
        {teamSicht && <button className="hm-link" onClick={neuErzeugen}>Neu erzeugen</button>}
      </div>
    </div>

    {teamSicht && q && <div className={"hm-mb-gate" + (freigegeben ? " ok" : "")}>
      <div className="hm-mb-gate-kopf"><div><b>{q.gesamt}</b><span>von 100</span></div><div className="hm-mb-gate-t">{freigegeben ? "Freigegeben" : q.gesamt >= 75 && !(q.klischees || []).length ? "Bereit zur Freigabe" : "Vor der Freigabe schärfen"}</div>
        {!freigegeben ? <Btn disabled={(q.klischees || []).length > 0} onClick={() => { hmMbSetzen(m.id, { status: "freigegeben", am: HM_HEUTE, von: "Daniel Hayden" }); hmEvent(m.id, "marke", "Markenbuch freigegeben", "Daniel"); toast("Markenbuch freigegeben"); }}>Freigeben</Btn> : <button className="hm-link" onClick={() => hmMbSetzen(m.id, { status: "pruefung" })}>Wieder öffnen</button>}</div>
      <div className="hm-mb-kriterien">{(q.kriterien || []).map((k) => <div key={k.name}><div className="hm-row" style={{ justifyContent: "space-between" }}><span>{k.name}</span><span className="hm-daten">{k.wert}</span></div><div className="hm-mb-balken"><i style={{ width: k.wert + "%" }} className={k.wert < 60 ? "tief" : ""}></i></div>{k.hinweis && <div className="u">{k.hinweis}</div>}</div>)}</div>
      {(q.klischees || []).length > 0 && <div className="hm-hinweis">Floskeln entfernen: {q.klischees.join(", ")}.</div>}
      {q.aehnlichkeit != null && <div className="hm-daten">Ähnlichkeit zu anderen Maklern {q.aehnlichkeit} %</div>}
    </div>}

    <div className="hm-mb-layout">
      <nav className="hm-mb-nav">{HM_MB_KAPITEL.map(([id, t]) => <button key={id} className={kap === id ? "on" : ""} onClick={() => springen(id)}>{t}</button>)}</nav>
      <div className="hm-mb-seiten">
        <MbKapitel id="einsicht" titel="Einsicht">
          <div className="hm-mb-vier">{[["Wer entscheidet", p.einsicht && p.einsicht.zielgruppe], ["Was sie bewegt", p.einsicht && p.einsicht.spannung], ["Wie die Branche spricht", p.einsicht && p.einsicht.konvention], ["Wo niemand steht", p.einsicht && p.einsicht.weisseStelle]].map(([t, v]) => <div key={t}><div className="l">{t}</div><div className="v"><MbText t={v} /></div></div>)}</div>
        </MbKapitel>

        <MbKapitel id="position" titel="Positionierung">
          {(() => { const satz = (p.positionierung && p.positionierung.satz) || ""; const i = satz.search(/\.\s/); const kopf = i > 0 ? satz.slice(0, i + 1) : satz; const rest = i > 0 ? satz.slice(i + 2) : ""; return <><p className="hm-mb-gross" style={{ fontFamily: hmFont(b.schrift.d) }}><MbText t={kopf} /></p>{rest && !(p.positionierung.andersAls || p.positionierung.weil) && <p className="hm-sub" style={{ margin: 0, maxWidth: "62ch" }}>{rest}</p>}</>; })()}
          <div className="hm-mb-tabelle">{[["Für wen", "fuerWen"], ["Was", "was"], ["Anders als", "andersAls"], ["Weil", "weil"]].map(([t, k]) => <div key={k}><span>{t}</span><span><MbText t={p.positionierung && p.positionierung[k]} /></span></div>)}</div>
          {p.versprechen && <div className="hm-mb-zeile"><span>Versprechen</span><b>{p.versprechen}</b></div>}
          {p.rolle && <div className="hm-mb-zeile"><span>Rolle</span><b>{p.rolle.name}</b>{p.rolle.satz && <em>{p.rolle.satz}</em>}</div>}
        </MbKapitel>

        <MbKapitel id="werte" titel="Werte und Persönlichkeit">
          <div className="hm-mb-drei">{(p.werte || []).map((w) => <div key={w.name}><div className="t">{w.name}</div><div className="u">{w.verhalten}</div>{w.nie && <div className="nie">Nie: {w.nie}</div>}</div>)}</div>
          {(p.persoenlichkeit || []).length > 0 && <div className="hm-mb-tabelle" style={{ marginTop: 18 }}>{p.persoenlichkeit.map((x) => <div key={x.wort}><span>{x.wort}</span><span>{x.heisst}{x.heisstNicht ? `. Nicht: ${x.heisstNicht}` : ""}</span></div>)}</div>}
        </MbKapitel>

        <MbKapitel id="stimme" titel="Stimme">
          {p.stimme && p.stimme.regler && <div className="hm-mb-regler">{[["ernst", "Ernst", "Locker"], ["persoenlich", "Förmlich", "Persönlich"], ["begeistert", "Zurückhaltend", "Begeistert"], ["sachlich", "Emotional", "Sachlich"]].map(([k, l, r]) => <div key={k}><span>{l}</span><div className="spur"><i style={{ left: `${p.stimme.regler[k] ?? 50}%`, background: b.akzent }}></i></div><span>{r}</span></div>)}</div>}
          {p.stimme && <div className="hm-mb-zwei"><div><div className="l">So klingt {b.vor}</div>{(p.stimme.sagen || []).map((x) => <div key={x} className="hm-mb-wort">{x}</div>)}</div><div><div className="l">Nie</div>{(p.stimme.vermeiden || []).map((x) => <div key={x} className="hm-mb-wort nie">{x}</div>)}</div></div>}
          {p.stimme && (p.stimme.regeln || []).length > 0 && <ul className="hm-mb-liste">{p.stimme.regeln.map((r) => <li key={r}>{r}</li>)}</ul>}
          {p.stimme && (p.stimme.beispiele || []).map((x) => <div key={x.wo} className="hm-mb-beispiel"><div className="l">{x.wo}</div><div className="so">{x.so}</div>{x.nicht && <div className="nicht">Nicht: {x.nicht}</div>}</div>)}
        </MbKapitel>

        <MbKapitel id="story" titel="Story">
          {p.story && <>
            <blockquote className="hm-mb-zitat" style={{ fontFamily: hmFont(b.schrift.d) }}><MbText t={p.story.kurz} /></blockquote>
            <div className="hm-mb-bogen">{[["Herkunft", "herkunft"], ["Spannung", "spannung"], ["Wendepunkt", "wendepunkt"], ["Haltung", "haltung"], ["Versprechen", "versprechen"]].map(([t, k], i) => <div key={k}><span className="hm-daten">{i + 1}</span><div className="t">{t}</div><div className="u"><MbText t={p.story[k]} /></div></div>)}</div>
            {p.story.mittel && <div className="hm-mb-absatz"><div className="l">50 Wörter</div><p>{p.story.mittel}</p><KopierKnopf text={p.story.mittel} /></div>}
            {p.story.lang && <div className="hm-mb-absatz"><div className="l">Über mich, 150 Wörter</div><p>{p.story.lang}</p><KopierKnopf text={p.story.lang} /></div>}
          </>}
        </MbKapitel>

        <MbKapitel id="botschaften" titel="Botschaften">
          {p.botschaften && <>
            <div className="hm-mb-claim" style={{ fontFamily: hmFont(b.schrift.d) }}>{p.botschaften.claim}</div>
            {(p.botschaften.claimAlternativen || []).length > 0 && <div className="hm-daten">Alternativen: {p.botschaften.claimAlternativen.join(" / ")}</div>}
            {[["In einem Satz", "einSatz"], ["In drei Sätzen", "dreiSaetze"], ["Boilerplate", "boilerplate"]].map(([t, k]) => p.botschaften[k] ? <div key={k} className="hm-mb-absatz"><div className="l">{t}</div><p>{p.botschaften[k]}</p><KopierKnopf text={p.botschaften[k]} /></div> : null)}
          </>}
          {(p.beweise || []).length > 0 && <div className="hm-mb-tabelle" style={{ marginTop: 18 }}>{p.beweise.map((x, i) => <div key={i}><span>{x.behauptung}</span><span>{x.beleg}{x.quelle ? ` (${x.quelle})` : ""}</span></div>)}</div>}
        </MbKapitel>

        <MbKapitel id="visuell" titel="Erscheinung" unter={welt ? `${welt.name}. ${welt.idee}` : p.visuell && p.visuell.idee}>
          {window.WeltWahl && (teamSicht || !freigegeben) && <WeltWahl mid={m.id} wert={welt && welt.id} set={(id) => { const w = (window.HM_MARKENWELTEN || []).find((x) => x.id === id); hmMbSetzen(m.id, { welt: id }); if (w) { hmStore.patch("branding", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), schrift: w.schrift } })); hmStore.patch("website", (a) => ({ ...(a || {}), [m.id]: { ...((a || {})[m.id] || {}), look: w.websiteLook } })); } }} />}
          {welt && window.WeltTafel && <div className="hm-mb-flaeche"><WeltTafel welt={welt} b={bb} /></div>}
          {welt && window.WeltFeed && <div className="hm-mb-anwendungen">
            <figure><div data-material="vorschau|profil|1080"><WeltFeed welt={welt} b={bb} posts={(p.saeulen || []).flatMap((s) => (s.serie && s.serie.beispiele || []).map((x) => ({ ...x, saeule: s.name, serie: s.serie.name }))).slice(0, 9).map((x, i) => ({ ...x, bild: i }))} /></div><figcaption>Profil</figcaption></figure>
            {window.WeltStory && <figure><div data-material="stories|story-claim|1080|1920"><WeltStory welt={welt} b={bb} text={p.botschaften ? p.botschaften.claim : b.claim} bild={b.portrait} /></div><figcaption>Story</figcaption></figure>}
            {window.WeltKarte && <figure><div data-material="print|visitenkarte-vorn|1004|650"><WeltKarte welt={welt} b={bb} seite="vorn" /></div><div data-material="print|visitenkarte-hinten|1004|650"><WeltKarte welt={welt} b={bb} seite="hinten" /></div><figcaption>Visitenkarte</figcaption></figure>}
            {window.WeltExpose && <figure><div data-material="print|expose-titel|2480|3508"><WeltExpose welt={welt} b={bb} objekt={window.hmWebObjekte ? hmWebObjekte()[0] : null} /></div><figcaption>Exposé</figcaption></figure>}
            {window.WeltSignatur && <figure><div data-material="signatur|signatur|1200"><WeltSignatur welt={welt} b={bb} /></div><figcaption>Signatur</figcaption></figure>}
          </div>}
          {p.visuell && p.visuell.bildsprache && <div className="hm-mb-zwei" style={{ marginTop: 18 }}><div><div className="l">Bildsprache</div>{(p.visuell.bildsprache.regeln || []).map((x) => <div key={x} className="hm-mb-wort">{x}</div>)}</div><div><div className="l">Nie im Bild</div>{(p.visuell.bildsprache.vermeiden || []).map((x) => <div key={x} className="hm-mb-wort nie">{x}</div>)}</div></div>}
        </MbKapitel>

        <MbKapitel id="saeulen" titel="Säulen und Serien">
          {(p.saeulen || []).map((s) => <div key={s.id || s.name} className="hm-mb-saeule">
            <div className="hm-mb-saeule-kopf"><div><div className="t">{s.name}</div><div className="u">{s.zweck}</div></div><div className="hm-mb-anteil"><b>{s.anteil}</b><span>%</span></div></div>
            {s.frage && <div className="hm-mb-frage">Frage des Publikums: {s.frage}</div>}
            {s.serie && <div className="hm-mb-serie">
              <div className="hm-mb-serie-name" style={{ fontFamily: hmFont(b.schrift.d) }}>{s.serie.name}</div>
              <p>{s.serie.idee}</p>
              <div className="hm-mb-tabelle">{s.serie.hookFormel && <div><span>Einstieg</span><span>{s.serie.hookFormel}</span></div>}{s.serie.rhythmus && <div><span>Rhythmus</span><span>{s.serie.rhythmus}</span></div>}{(s.formate || []).length > 0 && <div><span>Formate</span><span>{s.formate.map((f) => (window.HM_TYPEN && HM_TYPEN[f]) || (window.HM_FORMATE && HM_FORMATE[f] && HM_FORMATE[f].name) || f).join(", ")}</span></div>}</div>
              {(s.serie.ablauf || []).length > 0 && <ol className="hm-mb-ablauf">{s.serie.ablauf.map((x) => <li key={x}>{x}</li>)}</ol>}
              <div className="hm-mb-beispiele">{(s.serie.beispiele || []).map((x, xi) => <div key={x.titel}>{welt && window.WeltPost ? <div data-material={`posts|${hmDateiname(s.serie.name || s.name)}-${xi + 1}|1080|1350`}><WeltPost welt={welt} b={bb} art="serie" text={x.hook} unter={x.titel} serie={{ name: s.serie.name, nr: xi + 1 }} nr={xi + 1} breite={220} /></div> : null}<div className="t">{x.titel}</div><div className="u">{x.skizze}</div></div>)}</div>
            </div>}
          </div>)}
        </MbKapitel>

        <MbKapitel id="konzepte" titel="Konzepte">
          <div className="hm-mb-konzepte">{(p.konzepte || []).map((k) => <div key={k.name}><div className="hm-mb-serie-name" style={{ fontFamily: hmFont(b.schrift.d) }}>{k.name}</div><p>{k.idee}</p>{k.warum && <div className="u">Warum: {k.warum}</div>}{(k.umsetzung || []).length > 0 && <ol className="hm-mb-ablauf">{k.umsetzung.map((x) => <li key={x}>{x}</li>)}</ol>}{k.kanal && <div className="hm-daten">{k.kanal}</div>}</div>)}</div>
        </MbKapitel>

        <MbKapitel id="start" titel="Die ersten 30 Tage">
          <div className="hm-mb-wochen">{(p.start30 || []).map((w) => <div key={w.woche}><div className="l">Woche {w.woche}</div>{(w.beitraege || []).map((x) => <div key={x.titel} className="hm-mb-post"><div className="t">{x.titel}</div><div className="u">{x.saeule}{x.format ? ` · ${(window.HM_TYPEN && HM_TYPEN[x.format]) || x.format}` : ""}</div></div>)}</div>)}</div>
        </MbKapitel>
      </div>
    </div>
  </div>;
}

Object.assign(window, { Markenbuch, hmMbPlattform, hmMbWelt, hmMbStand, hmMbSetzen, HM_MB_KAPITEL });
