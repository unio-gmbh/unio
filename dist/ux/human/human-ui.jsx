/* UNIO HUMAN. UI-Bausteine v2: Sheet, Tabs, Liste, Logo, Handy-Vorschau, Brand-Ableitung. */

const HM_PORTRAIT = { markus: "/assets/team/portrait-06.jpg" };

/* Eine Quelle für alles Markenbezogene: Branding (falls freigegeben) plus gewählter Strategie-Weg */
function hmBrand(maklerId) {
  const makler = (hmStore.get("makler") || []).find((x) => x.id === maklerId) || {};
  const st = (hmStore.get("strategien") || {})[maklerId];
  const br = (hmStore.get("branding") || {})[maklerId] || {};
  const w = st && st.gewaehlt ? st.wege[st.gewaehlt] : st ? st.wege.a : null;
  const aid = w ? w.archetyp.id : "kenner";
  const schriftId = br.schrift || HM_SCHRIFTPAARE[aid][0];
  const akzentId = br.akzent || HM_AKZENT_EMPF[aid][0];
  const [vor, ...rest] = (makler.name || "Vorname Nachname").split(" ");
  return {
    makler, w, br, st, aid,
    vor, nach: rest.join(" "), initialen: (vor[0] || "") + ((rest.join(" ")[0]) || ""),
    schrift: HM_WEB_SCHRIFTEN[schriftId], schriftId,
    akzent: (HM_WEB_AKZENTE.find((x) => x.id === akzentId) || HM_WEB_AKZENTE[0]).hex, akzentId,
    claim: br.claim || (w ? w.leitidee : "Deine Leitidee entsteht im Branding."),
    bio: w ? w.bio : "",
    logo: br.logo || "wort",
    fertig: br.status === "freigegeben",
    portrait: HM_PORTRAIT[maklerId] || null,
  };
}
const hmFont = (f) => `"${f}", ui-serif, Georgia, serif`;

/* Logo als SVG, damit es exportierbar ist */
function BrandLogo({ b, typ, farbe, grund, h = 44, invert }) {
  const t = typ || b.logo;
  const ink = invert ? "#F7F5F1" : (farbe || "#0B0A09");
  const f = b.schrift ? b.schrift.d : "Power Grotesk";
  if (t === "monogramm") return <svg height={h} viewBox="0 0 100 100" style={{ display: "block" }}><circle cx="50" cy="50" r="47" fill="none" stroke={ink} strokeWidth="3" /><text x="50" y="62" textAnchor="middle" fontFamily={hmFont(f)} fontSize="38" fill={ink} letterSpacing="-1">{b.initialen}</text><circle cx="78" cy="26" r="6" fill={b.akzent} /></svg>;
  const w = Math.max(160, (b.vor.length + b.nach.length) * 22 + 40);
  if (t === "punkt") return <svg height={h} viewBox={`0 0 ${w} 60`} style={{ display: "block" }}><text x="0" y="44" fontFamily={hmFont(f)} fontSize="42" fill={ink} letterSpacing="-1.5">{b.vor} {b.nach}</text><circle cx={w - 12} cy="38" r="6" fill={b.akzent} /></svg>;
  return <svg height={h} viewBox={`0 0 ${w} 60`} style={{ display: "block" }}><text x="0" y="44" fontFamily={hmFont(f)} fontSize="42" fill={ink} letterSpacing="-1.5">{b.vor} <tspan fontWeight="700">{b.nach}</tspan></text></svg>;
}

/* Sheet: Modal von unten auf Mobil, zentriert auf Desktop */
function Sheet({ offen, zu, titel, unter, children, breit, fuss }) {
  React.useEffect(() => { if (!offen) return; const k = (e) => e.key === "Escape" && zu(); window.addEventListener("keydown", k); document.body.style.overflow = "hidden"; return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; }; }, [offen]);
  if (!offen) return null;
  return (
    <div className="hm-overlay" onMouseDown={(e) => e.target === e.currentTarget && zu()}>
      <div className={"hm-sheet" + (breit ? " breit" : "")} role="dialog" aria-modal="true">
        <div className="hm-sheet-kopf"><div><h3 className="hm-h hm-h2">{titel}</h3>{unter && <div className="hm-sub" style={{ marginTop: 6 }}>{unter}</div>}</div><button className="hm-x" onClick={zu} aria-label="Schließen"><svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></button></div>
        <div className="hm-sheet-body">{children}</div>
        {fuss && <div className="hm-sheet-fuss">{fuss}</div>}
      </div>
    </div>
  );
}
function Tabs({ tabs, akt, set, klein }) { return <div className={"hm-tabs" + (klein ? " klein" : "")} role="tablist">{tabs.map(([id, t, n]) => <button key={id} role="tab" aria-selected={akt === id} className={akt === id ? "on" : ""} onClick={() => set(id)}>{t}{n ? <span className="n">{n}</span> : null}</button>)}</div>; }
function Kopf({ ueber, titel, text, rechts }) { return <div className="hm-kopf"><div style={{ minWidth: 0 }}>{ueber && <div className="hm-mono">{ueber}</div>}<h2 className="hm-h hm-h1" style={{ marginTop: ueber ? 10 : 0 }}>{titel}</h2>{text && <p className="hm-sub">{text}</p>}</div>{rechts && <div className="hm-kopf-r">{rechts}</div>}</div>; }
function Zeile({ links, titel, unter, rechts, onClick, aktiv }) { return <div className={"hm-zeile" + (onClick ? " klick" : "") + (aktiv ? " on" : "")} onClick={onClick}>{links && <div className="l">{links}</div>}<div className="m"><div className="t">{titel}</div>{unter && <div className="u">{unter}</div>}</div>{rechts && <div className="r">{rechts}</div>}</div>; }
function Haken({ an, set, children }) { return <button className={"hm-haken" + (an ? " an" : "")} onClick={() => set(!an)}><i>{an ? "✓" : ""}</i><span>{children}</span></button>; }
function Avatar({ name, gross, bild }) { const k = (name || "?").split(" ").map((x) => x[0]).slice(0, 2).join(""); return bild ? <img className={"hm-ava" + (gross ? " g" : "")} src={bild} alt="" /> : <span className={"hm-ava" + (gross ? " g" : "")}>{k}</span>; }
function Kopieren({ text }) {
  const [ok, setOk] = React.useState(false);
  const ref = React.useRef(null);
  const los = async () => { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1600); } catch { const r = document.createRange(); r.selectNodeContents(ref.current); const s = getSelection(); s.removeAllRanges(); s.addRange(r); } };
  return <span className="hm-kopier"><code ref={ref}>{text}</code><button onClick={los}>{ok ? "Kopiert" : "Kopieren"}</button></span>;
}
function Leer({ titel, text, aktion }) { return <div className="hm-leer"><div className="t">{titel}</div>{text && <div className="s">{text}</div>}{aktion}</div>; }
function Ring({ wert, groesse = 64, dicke = 6, farbe = "var(--signal)" }) { const r = (groesse - dicke) / 2, u = 2 * Math.PI * r; return <svg width={groesse} height={groesse} style={{ transform: "rotate(-90deg)", flex: "none" }}><circle cx={groesse / 2} cy={groesse / 2} r={r} fill="none" stroke="var(--paper-3)" strokeWidth={dicke} /><circle cx={groesse / 2} cy={groesse / 2} r={r} fill="none" stroke={farbe} strokeWidth={dicke} strokeDasharray={u} strokeDashoffset={u * (1 - wert)} strokeLinecap="round" /></svg>; }

/* Handy-Rahmen für Vorschau (Instagram oder Facebook) */
function Handy({ kanal = "instagram", b, children, caption }) {
  return (
    <div className="hm-handy">
      <div className="hm-handy-kopf"><Avatar name={b.makler.name} bild={b.portrait} /><div style={{ minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 500 }}>{(b.vor + "." + b.nach).toLowerCase().replace(/\s/g, "")}.immo</div><div style={{ fontSize: 11, color: "var(--text-muted)" }}>{kanal === "instagram" ? "Instagram" : "Facebook"} · Vorschau</div></div></div>
      <div className="hm-handy-bild">{children}</div>
      {caption && <div className="hm-handy-cap">{caption.split("\n").slice(0, 3).join(" ")}</div>}
    </div>
  );
}

/* Kalender-Hilfen */
const hmDatum = (iso) => iso ? new Date(iso).toLocaleDateString("de-AT", { weekday: "short", day: "2-digit", month: "2-digit" }) : "offen";
const hmZeit = (iso) => iso && iso.length > 10 ? iso.slice(11, 16) : "";
const hmSpalte = (id) => HM_SPALTEN.find((s) => s.id === id) || HM_SPALTEN[0];
function ZPunkt({ z }) { const s = hmSpalte(z); return <span className="hm-zpunkt"><i style={{ background: s.farbe }}></i>{s.name}</span>; }

Object.assign(window, { hmBrand, hmFont, BrandLogo, Sheet, Tabs, Kopf, Zeile, Haken, Avatar, Kopieren, Leer, Ring, Handy, hmDatum, hmZeit, hmSpalte, ZPunkt, HM_PORTRAIT });
