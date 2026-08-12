/* UNIO — Shop: Print & Werbemittel mit Live-Vorschau aus Profil- und Objektdaten. */
const SHIc = (p) => <window.Icon {...p} />;

const SHOP_OBJ = [
  { id: "063", img: "/assets/img/beheim.jpg", title: "Penthouse Beheim", price: "€ 1,70 Mio", addr: "Beheimgasse 5, 1170 Wien" },
  { id: "042", img: "/assets/img/albrecht.jpg", title: "Das Albrecht — Haus 4", price: "€ 1,29 Mio", addr: "Hernalser Hauptstraße 132, 1170 Wien" },
  { id: "029", img: "/assets/img/ecoluxe.jpg", title: "Villa Ecoluxe", price: "€ 2,40 Mio", addr: "Cobenzlgasse 42, 1190 Wien" },
  { id: "017", img: "/assets/img/obenzwei.jpg", title: "ObenZwei — Dachgeschoss", price: "Auf Anfrage", addr: "Vorgartenstraße 128, 1020 Wien" },
];
const PRODUKTE = [
  { id: "flatschild", name: "Flatschild", ab: "AB € 189 · NETTO", varia: "MIT / OHNE FOTO · A1 / A0", formats: ["A1", "A0"], objekt: true },
  { id: "banner", name: "Banner", ab: "AB € 149 · NETTO", varia: "MIT / OHNE FOTO · 2 FORMATE", formats: ["200 × 100", "300 × 150"], objekt: true },
  { id: "visitenkarte", name: "Visitenkarten", ab: "AB € 39 · NETTO", varia: "MIT / OHNE FOTO · 85 × 55 MM", formats: ["85 × 55"], objekt: false },
];
const HISTORIE = [
  ["12.07.2026", "Flatschild · MIT FOTO", "Penthouse Beheim", "1", "€ 219", "druck", "Im Druck"],
  ["04.07.2026", "Visitenkarten · MIT FOTO", "PERSÖNLICH", "250", "€ 59", "bestellt", "Bestellt"],
  ["21.06.2026", "Banner · OHNE FOTO", "Villa Ecoluxe", "1", "€ 149", "geliefert", "Geliefert"],
];

/* Live-Werbemittel: rendert das Flatschild/Banner/die Karte mit echten Daten */
function SchildPreview({ produkt, obj, withPhoto, format }) {
  const banner = produkt === "banner";
  const vk = produkt === "visitenkarte";
  const [fade, setFade] = React.useState(1);
  const [shown, setShown] = React.useState(obj);
  React.useEffect(() => {
    if (obj === shown) return;
    setFade(0);
    const t = setTimeout(() => { setShown(obj); setFade(1); }, 220);
    return () => clearTimeout(t);
  }, [obj]);
  const o = shown;
  if (vk) {
    return (
      <div style={{ width: 380, background: "#FBFAF6", borderRadius: 6, boxShadow: "0 24px 60px -24px rgba(11,10,9,0.35), inset 0 0 0 1px var(--hairline-dark)", padding: "30px 32px", aspectRatio: "85/55", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {withPhoto && <span style={{ width: 46, height: 46, borderRadius: "50%", background: "var(--signal-soft)", color: "var(--signal-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "600 14px var(--font-display)" }}>DH</span>}
          <div>
            <div style={{ font: "600 19px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>Daniel Hayden</div>
            <div style={{ font: "9px var(--font-mono)", letterSpacing: "0.12em", color: "var(--text-muted)", marginTop: 4 }}>FOUNDER · UNIO CIRCLE</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ font: "10px var(--font-mono)", color: "var(--ink-2)", lineHeight: 1.7 }}>+43 660 000 00 00<br />daniel@unio.at</div>
          <div style={{ font: "600 15px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>UNIO<span style={{ color: "var(--signal)" }}>.</span></div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ width: banner ? 620 : 400, background: "#FBFAF6", borderRadius: 8, boxShadow: "0 30px 70px -26px rgba(11,10,9,0.4), inset 0 0 0 1px var(--hairline-dark)", overflow: "hidden", display: "flex", flexDirection: banner ? "row" : "column" }}>
      <div style={{ position: "relative", width: banner ? "48%" : "100%", flex: "none" }}>
        <img src={o.img} alt="" style={{ display: "block", width: "100%", height: banner ? "100%" : 230, objectFit: "cover", opacity: fade, transition: "opacity 300ms var(--ease-unio)" }} />
      </div>
      <div style={{ padding: banner ? "26px 30px" : "22px 28px 26px", flex: 1, opacity: fade, transition: "opacity 300ms var(--ease-unio)" }}>
        <div style={{ font: "600 9px var(--font-mono)", letterSpacing: "0.22em", color: "var(--signal-deep)" }}>ZUM VERKAUF</div>
        <div style={{ font: "600 24px/1.1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 10 }}>{o.title}</div>
        <div style={{ font: "600 30px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginTop: 14, fontVariantNumeric: "tabular-nums" }}>{o.price}</div>
        <div style={{ font: "10px var(--font-mono)", letterSpacing: "0.06em", color: "var(--text-muted)", marginTop: 10 }}>{o.addr.toUpperCase()}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 22, paddingTop: 16, borderTop: "1px solid var(--hairline-dark)" }}>
          {withPhoto && <span style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--signal-soft)", color: "var(--signal-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "600 12px var(--font-display)", flex: "none" }}>DH</span>}
          <div style={{ flex: 1 }}>
            <div style={{ font: "500 13px var(--font-display)", color: "var(--ink)" }}>Daniel Hayden</div>
            <div style={{ font: "9px var(--font-mono)", color: "var(--text-muted)", marginTop: 3 }}>+43 660 000 00 00</div>
          </div>
          <span title="QR · Lead-Link" style={{ width: 44, height: 44, borderRadius: 6, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "600 9px var(--font-mono)", letterSpacing: "0.06em", color: "var(--text-muted)", flex: "none" }}>QR</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 14 }}>
          <span style={{ font: "600 12px var(--font-display)", color: "var(--ink)" }}>UNIO<span style={{ color: "var(--signal)" }}>.</span></span>
          <span style={{ font: "7.5px var(--font-mono)", letterSpacing: "0.1em", color: "rgba(20,18,16,0.35)" }}>{format} · PFLICHTANGABEN LT. MAKLERRECHT</span>
        </div>
      </div>
    </div>
  );
}

function ShopSeite({ onNav }) {
  const { Reveal: Rv, RevealL: RvL } = window;
  const [konfig, setKonfig] = React.useState(null); // Produkt-ID
  if (konfig) return <Konfigurator produkt={PRODUKTE.find((p) => p.id === konfig)} onBack={() => setKonfig(null)} />;
  return (
    <div style={{ maxWidth: 1360, margin: "0 auto" }}>
      <RvL style={{ marginTop: 40 }}>
        <h1 style={{ margin: 0, font: "500 clamp(34px, 3.4vw, 52px)/1.02 var(--font-display)", letterSpacing: "-0.03em", color: "var(--ink)" }}>Shop<span style={{ color: "var(--signal)" }}>.</span></h1>
        <p style={{ margin: "16px 0 0", font: "400 16px/1.5 var(--font-display)", color: "var(--text-muted)", maxWidth: 460 }}>Werbemittel, die sich selbst befüllen. Aus deinem Profil, aus deinen Objekten.</p>
      </RvL>
      <Rv>
        <div style={{ display: "flex", alignItems: "baseline", columnGap: 28, marginTop: 40 }}>
          {[["1", "Offene Bestellungen"], ["1", "Im Druck"], ["3", "Geliefert · 30 Tage"]].map(([v, l], i) => (
            <React.Fragment key={l}>
              {i > 0 && <span style={{ width: 1, height: 32, background: "rgba(20,18,16,.14)", alignSelf: "center" }}></span>}
              <div style={{ display: "flex", alignItems: "baseline", gap: 11 }}>
                <span style={{ font: "500 32px/1 var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{v}</span>
                <span className="u-label" style={{ fontSize: 9, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{l}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </Rv>
      {/* Produktkarten */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 48 }}>
        {PRODUKTE.map((p, i) => <ProduktKarte key={p.id} p={p} delay={i * 70} onOpen={() => setKonfig(p.id)} />)}
      </div>
      {/* Bestellhistorie */}
      <Rv style={{ marginTop: 56 }}>
        <h2 style={{ margin: "0 0 18px", font: "500 20px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }}>Bestellhistorie</h2>
        <div style={{ background: "var(--card-bg, #FFFFFF)", borderRadius: 14, boxShadow: "inset 0 0 0 1px var(--card-line, var(--hairline-dark))", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr 1.4fr 0.6fr 0.7fr 1fr 1.3fr", padding: "13px 22px", borderBottom: "1px solid var(--hairline-dark)" }}>
            {["Datum", "Produkt", "Objekt", "Menge", "Preis", "Status", ""].map((hd, k) => <span key={k} className="u-label" style={{ fontSize: 8, color: "var(--text-muted)" }}>{hd}</span>)}
          </div>
          {HISTORIE.map(([dat, prod, obj, menge, preis, st, stL], i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr 1.4fr 0.6fr 0.7fr 1fr 1.3fr", alignItems: "center", padding: "16px 22px", borderBottom: i < HISTORIE.length - 1 ? "1px solid var(--hairline)" : "none" }}>
              <span style={{ font: "11px var(--font-mono)", color: "var(--text-muted)" }}>{dat}</span>
              <div><div style={{ font: "500 13.5px var(--font-display)", color: "var(--ink)" }}>{prod.split(" · ")[0]}</div><div style={{ font: "8.5px var(--font-mono)", letterSpacing: "0.08em", color: "var(--text-muted)", marginTop: 3 }}>{prod.split(" · ")[1]}</div></div>
              <span style={{ font: "400 13px var(--font-display)", color: obj === "PERSÖNLICH" ? "var(--text-muted)" : "var(--ink)" }}>{obj}</span>
              <span style={{ font: "12px var(--font-mono)", color: "var(--ink)" }}>{menge}</span>
              <span style={{ font: "12px var(--font-mono)", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{preis}</span>
              <span className="u-label" style={{ fontSize: 8.5, padding: "5px 11px", borderRadius: 999, justifySelf: "start", whiteSpace: "nowrap", ...(st === "druck" ? { background: "var(--signal-soft)", color: "var(--signal-deep)" } : st === "geliefert" ? { background: "var(--ink)", color: "var(--paper)" } : { boxShadow: "inset 0 0 0 1px var(--hairline-dark)", color: "var(--text-muted)" }) }}>{stL}</span>
              <span style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "7px 14px", background: "transparent", boxShadow: "inset 0 0 0 1px var(--hairline-dark)", font: "500 11.5px var(--font-display)", color: "var(--ink)" }}>Erneut bestellen</button>
                <button style={{ border: "none", background: "none", cursor: "pointer", font: "500 11.5px var(--font-display)", color: "var(--text-muted)", padding: 0 }}>Druckdaten</button>
              </span>
            </div>
          ))}
        </div>
      </Rv>
    </div>
  );
}

function ProduktKarte({ p, delay, onOpen }) {
  const [h, setH] = React.useState(false);
  const [ref, run] = window.useInView(0.15);
  return (
    <div ref={ref} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={onOpen}
      style={{ background: "#FFFFFF", borderRadius: 14, padding: 8, cursor: "pointer", boxShadow: h ? "inset 0 0 0 1px var(--hairline-dark), 0 16px 44px -20px rgba(11,10,9,.28)" : "inset 0 0 0 1px var(--hairline-dark)", transform: run ? (h ? "translateY(-2px)" : "none") : "translateY(16px)", opacity: run ? 1 : 0, transition: `transform .4s var(--ease-unio) ${delay}ms, opacity .5s var(--ease-unio) ${delay}ms, box-shadow .4s var(--ease-unio)` }}>
      <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "#EFEBE4", aspectRatio: "3/2", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: `scale(${p.id === "banner" ? 0.52 : p.id === "visitenkarte" ? 0.72 : 0.6})` }}>
          <SchildPreview produkt={p.id} obj={SHOP_OBJ[0]} withPhoto={true} format={p.formats[0]} />
        </div>
        <span style={{ position: "absolute", right: 12, bottom: 12, borderRadius: 999, padding: "8px 16px", background: "rgba(251,250,246,0.94)", font: "500 12px var(--font-display)", color: "var(--ink)", opacity: h ? 1 : 0, transform: h ? "none" : "translateY(6px)", transition: "all .3s var(--ease-unio)" }}>Konfigurieren</span>
      </div>
      <div style={{ padding: "16px 12px 12px" }}>
        <div style={{ font: "500 20px var(--font-display)", letterSpacing: "-0.01em", color: "var(--ink)" }}>{p.name}</div>
        <div style={{ font: "9.5px var(--font-mono)", letterSpacing: "0.08em", color: "var(--text-muted)", marginTop: 8 }}>{p.ab}</div>
        <div style={{ font: "8.5px var(--font-mono)", letterSpacing: "0.08em", color: "rgba(20,18,16,0.35)", marginTop: 5 }}>{p.varia}</div>
      </div>
    </div>
  );
}

/* Konfigurator: links Live-Bühne, rechts Schritt-Schiene */
function Konfigurator({ produkt, onBack }) {
  const [withPhoto, setWithPhoto] = React.useState(true);
  const [objIdx, setObjIdx] = React.useState(0);
  const [format, setFormat] = React.useState(produkt.formats[0]);
  const [menge, setMenge] = React.useState(produkt.id === "visitenkarte" ? 250 : 1);
  const [checked, setChecked] = React.useState(false);
  const [ordered, setOrdered] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const base = produkt.id === "flatschild" ? (format === "A0" ? 219 : 189) : produkt.id === "banner" ? (format === "300 × 150" ? 199 : 149) : menge === 100 ? 39 : menge === 250 ? 59 : 89;
  const preis = produkt.id === "visitenkarte" ? base : base * menge;
  const steps = produkt.objekt ? ["VARIANTE", "OBJEKT", "FORMAT & MENGE", "PRÜFEN & BESTELLEN"] : ["VARIANTE", "FORMAT & MENGE", "PRÜFEN & BESTELLEN"];
  const masse = produkt.id === "flatschild" ? (format === "A0" ? "A0 · 84,1 × 118,9 CM" : "A1 · 59,4 × 84,1 CM") : produkt.id === "banner" ? format + " CM" : "85 × 55 MM";
  return (
    <div style={{ maxWidth: 1360, margin: "0 auto" }}>
      <div style={{ marginTop: 32 }}>
        <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "none", border: "none", cursor: "pointer", font: "500 14px var(--font-display)", color: "var(--text-muted)", padding: 0 }}><SHIc name="back" size={16} /> Shop</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 40, marginTop: 24, alignItems: "start" }}>
        {/* Vorschau-Bühne */}
        <div style={{ position: "sticky", top: 24, minHeight: 560, borderRadius: 16, background: "#EFEBE4", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 48, gap: 26 }}>
          <SchildPreview produkt={produkt.id} obj={SHOP_OBJ[objIdx]} withPhoto={withPhoto} format={format} />
          <div style={{ font: "9px var(--font-mono)", letterSpacing: "0.16em", color: "rgba(20,18,16,0.4)" }}>{masse}</div>
        </div>
        {/* Schritt-Schiene */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ font: "500 24px var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: 6 }}>{produkt.name}</div>
          {steps.map((s, i) => {
            const n = i + 1, open = step === n;
            return (
              <div key={s} style={{ borderRadius: 13, background: "#FFFFFF", boxShadow: open ? "inset 0 0 0 1.5px var(--signal)" : "inset 0 0 0 1px var(--hairline-dark)", overflow: "hidden", transition: "box-shadow .25s var(--ease-unio)" }}>
                <button onClick={() => setStep(n)} style={{ display: "flex", alignItems: "center", gap: 13, width: "100%", border: "none", cursor: "pointer", background: "none", padding: "16px 18px", textAlign: "left" }}>
                  <span style={{ font: "600 10px var(--font-mono)", color: open ? "var(--signal-deep)" : "var(--text-muted)" }}>{String(n).padStart(2, "0")}</span>
                  <span className="u-label" style={{ fontSize: 9, color: open ? "var(--ink)" : "var(--text-muted)", flex: 1 }}>{s}</span>
                  <SHIc name="arrow" size={12} stroke="var(--text-muted)" style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform .25s" }} />
                </button>
                <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 300ms var(--ease-unio)" }}>
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ padding: "2px 18px 18px" }}>
                      {s === "VARIANTE" && (
                        <div style={{ display: "inline-flex", gap: 4, background: "var(--paper)", borderRadius: 999, padding: 4 }}>
                          {[["Mit Foto", true], ["Ohne Foto", false]].map(([l, val]) => (
                            <button key={l} onClick={() => setWithPhoto(val)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "8px 18px", background: withPhoto === val ? "var(--ink)" : "transparent", color: withPhoto === val ? "var(--paper)" : "var(--text-muted)", font: "500 12.5px var(--font-display)" }}>{l}</button>
                          ))}
                        </div>
                      )}
                      {s === "OBJEKT" && (
                        <div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                            {SHOP_OBJ.map((o, k) => (
                              <button key={o.id} onClick={() => setObjIdx(k)} style={{ display: "flex", alignItems: "center", gap: 11, border: "none", cursor: "pointer", borderRadius: 10, padding: "9px 11px", background: k === objIdx ? "var(--signal-soft)" : "transparent", boxShadow: k === objIdx ? "inset 0 0 0 1px rgba(255,170,9,0.35)" : "inset 0 0 0 1px var(--hairline-dark)", textAlign: "left" }}>
                                <img src={o.img} alt="" style={{ width: 44, height: 34, borderRadius: 7, objectFit: "cover", flex: "none" }} />
                                <span style={{ flex: 1, font: "500 12.5px var(--font-display)", color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.title}</span>
                                <span style={{ font: "10px var(--font-mono)", color: "var(--text-muted)", flex: "none" }}>{o.price}</span>
                              </button>
                            ))}
                          </div>
                          <div style={{ font: "8px var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)", marginTop: 12 }}>ÜBERNOMMEN: FOTO · PREIS · ADRESSE · QR-LEAD-LINK</div>
                        </div>
                      )}
                      {s === "FORMAT & MENGE" && (
                        <div>
                          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                            {produkt.formats.map((f) => (
                              <button key={f} onClick={() => setFormat(f)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "9px 16px", background: format === f ? "var(--ink)" : "transparent", boxShadow: format === f ? "none" : "inset 0 0 0 1px var(--hairline-dark)", font: "500 12.5px var(--font-display)", color: format === f ? "var(--paper)" : "var(--ink)" }}>{f}</button>
                            ))}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 16 }}>
                            <span className="u-label" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>Menge</span>
                            {produkt.id === "visitenkarte" ? (
                              <div style={{ display: "inline-flex", gap: 4 }}>
                                {[100, 250, 500].map((m) => <button key={m} onClick={() => setMenge(m)} style={{ border: "none", cursor: "pointer", borderRadius: 999, padding: "8px 14px", background: menge === m ? "var(--ink)" : "transparent", boxShadow: menge === m ? "none" : "inset 0 0 0 1px var(--hairline-dark)", font: "500 12px var(--font-mono)", color: menge === m ? "var(--paper)" : "var(--ink)" }}>{m}</button>)}
                              </div>
                            ) : (
                              <div style={{ display: "inline-flex", alignItems: "center", gap: 12, borderRadius: 999, boxShadow: "inset 0 0 0 1px var(--hairline-dark)", padding: "6px 10px" }}>
                                <button onClick={() => setMenge(Math.max(1, menge - 1))} aria-label="Weniger" style={{ border: "none", background: "none", cursor: "pointer", font: "500 16px var(--font-display)", color: "var(--ink)" }}>−</button>
                                <span style={{ font: "500 14px var(--font-mono)", color: "var(--ink)", minWidth: 20, textAlign: "center" }}>{menge}</span>
                                <button onClick={() => setMenge(menge + 1)} aria-label="Mehr" style={{ border: "none", background: "none", cursor: "pointer", font: "500 16px var(--font-display)", color: "var(--ink)" }}>+</button>
                              </div>
                            )}
                          </div>
                          <div style={{ font: "500 22px var(--font-display)", color: "var(--ink)", marginTop: 18, fontVariantNumeric: "tabular-nums" }}>€ {preis} <span style={{ font: "9px var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)" }}>NETTO</span></div>
                        </div>
                      )}
                      {s === "PRÜFEN & BESTELLEN" && (
                        ordered ? (
                          <div style={{ textAlign: "center", padding: "18px 0 8px" }}>
                            <span style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--signal-soft)", color: "var(--signal-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><SHIc name="check" size={20} stroke="var(--signal-deep)" /></span>
                            <div style={{ font: "500 16px var(--font-display)", color: "var(--ink)", marginTop: 14 }}>Bestellung eingegangen.</div>
                            <div style={{ font: "9.5px var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)", marginTop: 8 }}>BESTELLNR. UN-2026-0041</div>
                            <button onClick={onBack} style={{ marginTop: 16, border: "none", background: "none", cursor: "pointer", font: "500 13px var(--font-display)", color: "var(--signal-deep)" }}>Zur Bestellhistorie →</button>
                          </div>
                        ) : (
                          <div>
                            {[["Produkt", produkt.name + " · " + (withPhoto ? "mit Foto" : "ohne Foto")], produkt.objekt ? ["Objekt", SHOP_OBJ[objIdx].title] : null, ["Format", masse], ["Preis", "€ " + preis + " netto + 20 % USt"], ["Lieferung", "Büro Kärntnerstraße 51, 1010 Wien"]].filter(Boolean).map(([k, v]) => (
                              <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "9px 0", borderBottom: "1px solid var(--hairline)" }}>
                                <span className="u-label" style={{ fontSize: 8, color: "var(--text-muted)" }}>{k}</span>
                                <span style={{ font: "400 12.5px var(--font-display)", color: "var(--ink)", textAlign: "right" }}>{v}</span>
                              </div>
                            ))}
                            <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, cursor: "pointer" }}>
                              <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} style={{ accentColor: "var(--signal)" }} />
                              <span style={{ font: "400 12px var(--font-display)", color: "var(--ink-2)" }}>Vorschau geprüft und freigegeben</span>
                            </label>
                            <button disabled={!checked} onClick={() => setOrdered(true)} style={{ width: "100%", marginTop: 14, border: "none", cursor: checked ? "pointer" : "default", borderRadius: 999, padding: "13px 0", background: checked ? "var(--ink)" : "var(--paper-2)", color: checked ? "var(--paper)" : "var(--text-muted)", font: "500 14px var(--font-display)", transition: "background .25s" }}>Kostenpflichtig bestellen</button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ShopSeite });
