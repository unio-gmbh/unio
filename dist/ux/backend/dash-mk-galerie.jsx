/* UNIO: eine Galerie für alle Flächen (Projekt, Objekt-Akte, Medien).
   Hero mit Swipe + Thumbnail-Leiste + Vollbild-Lightbox mit Zoom.
   Regeln aus docs/MAKLER_RESEARCH_2026-08_RUNDE2.md (Baymard, Airbnb, Apple HIG):
   Thumbnails auch mobil (niedrigste Fehl-Tap-Rate, Dots liefern keinen Inhalt),
   Snap bei 25-30 % Drag, Tastatur links/rechts/Escape, Double-Tap zoomt,
   gemischte Formate auf fester Bühne mit geblurrtem Backdrop. */

const MK_GAL_CSS = `
  .mkg{position:relative;}
  .mkg-hero{position:relative;border-radius:16px;overflow:hidden;background:#141210;
    aspect-ratio:3/2;touch-action:pan-y;user-select:none;cursor:grab;}
  .mkg-hero.zieht{cursor:grabbing;}
  .mkg-hero .blur{position:absolute;inset:0;background-size:cover;background-position:center;
    filter:blur(28px) saturate(1.1);transform:scale(1.15);opacity:.55;}
  .mkg-hero img.buehne{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;
    transition:opacity .28s var(--ease-unio);}
  .mkg-hero img.voll{object-fit:cover;}
  .mkg-zaehler{position:absolute;right:12px;bottom:12px;z-index:3;background:rgba(11,10,9,.62);
    color:#F7F5F1;border-radius:99px;padding:5px 11px;font-family:var(--font-mono),monospace;
    font-size:9.5px;letter-spacing:.1em;backdrop-filter:blur(8px);}
  .mkg-nav{position:absolute;top:50%;transform:translateY(-50%);z-index:3;width:40px;height:40px;
    border-radius:99px;border:none;cursor:pointer;background:rgba(11,10,9,.5);color:#F7F5F1;
    display:grid;place-items:center;font-size:17px;backdrop-filter:blur(8px);opacity:0;transition:opacity .2s;}
  .mkg-hero:hover .mkg-nav{opacity:1;}
  .mkg-nav.l{left:10px;} .mkg-nav.r{right:10px;}
  .mkg-alle{position:absolute;left:12px;bottom:12px;z-index:3;border:none;cursor:pointer;
    background:rgba(247,245,241,.94);color:var(--ink);border-radius:99px;padding:9px 16px;
    font:500 12.5px var(--font-display);font-family:inherit;backdrop-filter:blur(8px);}
  /* Thumbnail-Leiste: auch mobil, halbes letztes Bild als Truncation-Hinweis */
  .mkg-thumbs{display:flex;gap:8px;overflow-x:auto;scroll-snap-type:x proximity;
    padding:10px 2px 4px;scrollbar-width:none;-webkit-overflow-scrolling:touch;}
  .mkg-thumbs::-webkit-scrollbar{display:none;}
  .mkg-thumbs button{flex:0 0 auto;border:none;cursor:pointer;padding:4px;background:none;
    border-radius:12px;scroll-snap-align:start;line-height:0;}
  .mkg-thumbs img{width:88px;height:66px;object-fit:cover;border-radius:9px;opacity:.62;
    transition:opacity .18s,box-shadow .18s;display:block;}
  .mkg-thumbs button.on img{opacity:1;box-shadow:0 0 0 2px var(--signal);}
  .mkg-thumbs button:focus-visible img{box-shadow:0 0 0 2px var(--ink);}
  @media (max-width:760px){
    .mkg-thumbs img{width:64px;height:64px;}
    .mkg-nav{display:none;}
    .mkg-hero{border-radius:14px;}
  }
  /* Video- und Tour-Slides: Poster mit Play-Flaeche, iframe erst auf Klick */
  .mkg-play{position:absolute;inset:0;width:100%;height:100%;border:none;padding:0;cursor:pointer;background:#0B0B0C;}
  .mkg-play img{width:100%;height:100%;object-fit:cover;opacity:.82;}
  .mkg-play .knopf{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:56px;height:56px;
    border-radius:99px;background:rgba(247,245,241,.94);color:var(--ink);display:grid;place-items:center;font-size:20px;
    box-shadow:0 10px 30px -10px rgba(11,10,9,.6);}
  .mkg-play .label{position:absolute;left:12px;bottom:12px;background:rgba(11,10,9,.68);color:#F7F5F1;
    border-radius:99px;padding:6px 12px;font-family:var(--font-mono),monospace;font-size:9px;letter-spacing:.1em;
    text-transform:uppercase;backdrop-filter:blur(8px);}
  .mkg-play.tour .knopf{background:var(--signal);color:#1A1305;}
  .mkg-tbadge{position:absolute;top:6px;right:6px;background:rgba(11,10,9,.72);color:#F7F5F1;border-radius:6px;
    padding:2px 5px;font-family:var(--font-mono),monospace;font-size:7.5px;letter-spacing:.06em;}
  .mkg-thumbs button{position:relative;}
  /* Desktop-Mosaik: grosse Buehne links, vier Kacheln rechts (statt Wisch-Leiste).
     Video und 360-Tour liegen als Kachel offen sichtbar daneben. */
  .mkg-mosaik{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:12px;
    height:clamp(380px,40vw,520px);}
  .mkg-mosaik .mkg-hero{aspect-ratio:auto;height:100%;}
  .mkg-mosaik .kacheln{display:grid;gap:12px;min-height:0;min-width:0;}
  .mkg-mosaik .kachel{position:relative;border:none;padding:0;cursor:pointer;border-radius:12px;
    overflow:hidden;background:#141210;min-height:0;line-height:0;}
  .mkg-mosaik .kachel img{width:100%;height:100%;object-fit:cover;display:block;
    transition:transform .5s var(--ease-unio),opacity .25s;}
  .mkg-mosaik .kachel:hover img{transform:scale(1.045);}
  .mkg-mosaik .kachel:focus-visible{outline:2px solid var(--ink);outline-offset:2px;}
  .mkg-mosaik .kachel .kbadge{position:absolute;left:10px;bottom:10px;display:inline-flex;align-items:center;gap:6px;
    background:rgba(11,10,9,.7);color:#F7F5F1;border-radius:99px;padding:6px 11px;
    font-family:var(--font-mono),monospace;font-size:8.5px;letter-spacing:.1em;text-transform:uppercase;
    backdrop-filter:blur(8px);line-height:1.2;}
  .mkg-mosaik .kachel.medium .kbadge{background:var(--signal);color:#1A1305;}
  .mkg-mosaik .kachel .mehr{position:absolute;inset:0;display:grid;place-items:center;
    background:rgba(11,10,9,.52);color:#F7F5F1;font:500 15px var(--font-display);}
  /* Lightbox */
  .mkg-lb{position:fixed;inset:0;z-index:200;background:#0B0B0C;display:flex;flex-direction:column;}
  .mkg-lb .kopf{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;
    color:rgba(247,245,241,.8);font-family:var(--font-mono),monospace;font-size:10px;letter-spacing:.12em;}
  .mkg-lb .x{width:48px;height:48px;border-radius:99px;border:none;cursor:pointer;
    background:rgba(247,245,241,.14);color:#F7F5F1;font-size:17px;}
  .mkg-lb .buehne{flex:1;position:relative;overflow:hidden;touch-action:none;}
  .mkg-lb .buehne img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;
    transition:transform .25s var(--ease-unio);}
  .mkg-lb .fuss{display:flex;gap:8px;overflow-x:auto;padding:12px 16px calc(16px + env(safe-area-inset-bottom));
    scrollbar-width:none;}
  .mkg-lb .fuss::-webkit-scrollbar{display:none;}
  .mkg-lb .fuss img{width:56px;height:42px;object-fit:cover;border-radius:7px;opacity:.5;cursor:pointer;flex:0 0 auto;}
  .mkg-lb .fuss img.on{opacity:1;box-shadow:0 0 0 2px var(--signal);}
  .mkg-grid{position:fixed;inset:0;z-index:200;background:var(--paper);overflow-y:auto;padding:20px;}
  .mkg-grid .raster{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;max-width:1100px;margin:0 auto;}
  .mkg-grid .raster img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;cursor:pointer;display:block;}
  @media (prefers-reduced-motion:reduce){
    .mkg-hero img.buehne,.mkg-lb .buehne img{transition:opacity .12s;}
  }
`;

/* Medien-Slides koennen Bilder, Video oder 360-Tour sein:
   { typ:"video", src, poster, dauer } oder { typ:"tour", embed, poster }.
   Regeln: Video nie Slide 1 (LCP), kein Autoplay mit Ton, Tour-iframe erst auf Klick. */
function MkMedienSlide({ m, aktiv }) {
  const [laeuft, setLaeuft] = React.useState(false);
  React.useEffect(() => { if (!aktiv) setLaeuft(false); }, [aktiv]);
  if (m.typ === "video") {
    return laeuft
      ? <video src={m.src} poster={m.poster} controls autoPlay playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", background: "#0B0B0C" }} />
      : (
        <button className="mkg-play" onClick={() => setLaeuft(true)} aria-label="Video abspielen">
          <img src={m.poster} alt="" />
          <span className="knopf">▶</span>
          <span className="label">Video · {m.dauer}</span>
        </button>
      );
  }
  if (m.typ === "tour") {
    return laeuft
      ? <iframe src={m.embed} title="360-Grad-Tour" allowFullScreen allow="xr-spatial-tracking; fullscreen" loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", background: "#0B0B0C" }} />
      : (
        <button className="mkg-play tour" onClick={() => setLaeuft(true)} aria-label="360-Grad-Tour starten">
          <img src={m.poster} alt="" />
          <span className="knopf">⟳</span>
          <span className="label">Tour starten · lädt erst auf Klick</span>
        </button>
      );
  }
  return null;
}

function MkGalerie({ bilder, alle, hoehe, cover }) {
  const [i, setI] = React.useState(0);
  const [lb, setLb] = React.useState(false);
  const [gridAuf, setGridAuf] = React.useState(false);
  const [zoom, setZoom] = React.useState(1);
  const [zieht, setZieht] = React.useState(false);
  const thumbsRef = React.useRef(null);
  const startX = React.useRef(null);
  const vomThumb = React.useRef(false);
  const n = bilder.length;
  const gehe = (neu) => setI((neu + n) % n);

  /* Ab 900 px das Mosaik (Buehne + vier Kacheln), darunter Hero mit Wisch-Leiste.
     Strukturwechsel, deshalb matchMedia und nicht nur CSS. */
  const [breit, setBreit] = React.useState(() => window.matchMedia("(min-width: 900px)").matches);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const f = (e) => setBreit(e.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  /* Kacheln zeigen die ersten vier Slides, die gerade nicht auf der Buehne stehen:
     Video und Tour bleiben so immer sichtbar. */
  const kachelIdx = bilder.map((_, j) => j).filter((j) => j !== i).slice(0, 4);

  /* Aktives Thumbnail nachziehen, aber nicht wenn der Wechsel vom Thumbnail-Tap kam */
  React.useEffect(() => {
    if (vomThumb.current) { vomThumb.current = false; return; }
    const leiste = thumbsRef.current;
    if (!leiste) return;
    const b = leiste.children[i];
    if (b && b.scrollIntoView) b.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [i]);

  /* Tastatur: links, rechts, Escape, Home, End */
  React.useEffect(() => {
    const f = (e) => {
      if (["INPUT", "TEXTAREA"].includes((e.target || {}).tagName)) return;
      if (e.key === "ArrowRight") gehe(i + 1);
      else if (e.key === "ArrowLeft") gehe(i - 1);
      else if (e.key === "Home") setI(0);
      else if (e.key === "End") setI(n - 1);
      else if (e.key === "Escape") { if (zoom > 1) setZoom(1); else if (lb) setLb(false); else if (gridAuf) setGridAuf(false); }
    };
    document.addEventListener("keydown", f);
    return () => document.removeEventListener("keydown", f);
  }, [i, lb, gridAuf, zoom, n]);

  /* Swipe/Drag auf dem Hero: Schwelle 28 % der Breite oder schnelle Wischbewegung */
  const runter = (x) => { startX.current = { x, t: Date.now() }; setZieht(true); };
  const rauf = (x, breite) => {
    setZieht(false);
    if (!startX.current) return;
    const dx = x - startX.current.x, dt = Date.now() - startX.current.t;
    const schwelle = breite * 0.28, schnell = Math.abs(dx) / Math.max(dt, 1) > 0.3;
    if (Math.abs(dx) > 8 && (Math.abs(dx) > schwelle || schnell)) gehe(i + (dx < 0 ? 1 : -1));
    startX.current = null;
  };

  const lbDoppel = React.useRef(0);
  const buehneTap = () => {
    const jetzt = Date.now();
    if (jetzt - lbDoppel.current < 320) setZoom((z) => (z > 1 ? 1 : 2.5));
    lbDoppel.current = jetzt;
  };

  const buehne = (
      <div className={"mkg-hero" + (zieht ? " zieht" : "")} style={hoehe && !breit ? { aspectRatio: "auto", height: hoehe } : null}
        onMouseDown={(e) => runter(e.clientX)}
        onMouseUp={(e) => rauf(e.clientX, e.currentTarget.offsetWidth)}
        onMouseLeave={() => { setZieht(false); startX.current = null; }}
        onTouchStart={(e) => runter(e.touches[0].clientX)}
        onTouchEnd={(e) => rauf(e.changedTouches[0].clientX, e.currentTarget.offsetWidth)}>
        <div className="blur" style={{ backgroundImage: "url(" + (typeof bilder[i] === "object" ? bilder[i].poster : bilder[i]) + ")" }} aria-hidden="true"></div>
        {bilder.map((b, j) => {
          const medium = typeof b === "object";
          const quelle = medium ? b.poster : b;
          return (
            <div key={quelle + j} style={{ position: "absolute", inset: 0, opacity: j === i ? 1 : 0, transition: "opacity .28s var(--ease-unio)", pointerEvents: j === i && medium ? "auto" : "none" }}>
              {medium
                ? <MkMedienSlide m={b} aktiv={j === i} />
                : <img src={b} alt="" loading={j === 0 ? "eager" : "lazy"} fetchpriority={j === 0 ? "high" : undefined}
                    className={"buehne" + (cover ? " voll" : "")} />}
            </div>
          );
        })}
        <button className="mkg-nav l" onClick={(e) => { e.stopPropagation(); gehe(i - 1); }} aria-label="Vorheriges Bild">‹</button>
        <button className="mkg-nav r" onClick={(e) => { e.stopPropagation(); gehe(i + 1); }} aria-label="Nächstes Bild">›</button>
        <span className="mkg-zaehler">{i + 1} / {n}</span>
        <button className="mkg-alle" onClick={(e) => { e.stopPropagation(); n > 6 ? setGridAuf(true) : setLb(true); }}>
          {n > 6 ? "Alle " + n + " Fotos" : "Vollbild"}
        </button>
      </div>
  );

  const leiste = (
      <div className="mkg-thumbs" ref={thumbsRef} role="tablist" aria-label="Bildauswahl">
        {bilder.map((b, j) => {
          const medium = typeof b === "object";
          return (
            <button key={(medium ? b.poster : b) + "t" + j} className={j === i ? "on" : ""} role="tab" aria-selected={j === i}
              onClick={() => { vomThumb.current = true; setI(j); }} aria-label={medium ? (b.typ === "video" ? "Video" : "360-Tour") : "Bild " + (j + 1)}>
              <img src={medium ? b.poster : b} alt="" loading="lazy" />
              {medium && <span className="mkg-tbadge">{b.typ === "video" ? "▶" : "360"}</span>}
            </button>
          );
        })}
      </div>
  );

  /* Kacheln rechts: klicken hebt den Slide auf die Buehne. Bei mehr Bildern als
     Kacheln traegt die letzte Kachel den Hinweis auf die volle Galerie. */
  const kacheln = (
    <div className="kacheln" style={{
      gridTemplateColumns: kachelIdx.length > 2 ? "repeat(2, minmax(0,1fr))" : "minmax(0,1fr)",
      gridTemplateRows: "repeat(" + Math.max(1, Math.ceil(kachelIdx.length / (kachelIdx.length > 2 ? 2 : 1))) + ", minmax(0,1fr))",
    }}>
      {kachelIdx.map((j, pos) => {
        const b = bilder[j];
        const medium = typeof b === "object";
        const restlich = n - 1 - kachelIdx.length;
        const letzte = pos === kachelIdx.length - 1 && restlich > 0;
        return (
          <button key={"k" + j} className={"kachel" + (medium ? " medium" : "")}
            onClick={() => (letzte ? setGridAuf(true) : setI(j))}
            aria-label={letzte ? "Alle " + n + " Medien ansehen" : medium ? (b.typ === "video" ? "Video auf die Bühne holen" : "360-Tour auf die Bühne holen") : "Bild " + (j + 1) + " auf die Bühne holen"}>
            <img src={medium ? b.poster : b} alt="" loading="lazy" />
            {medium && <span className="kbadge">{b.typ === "video" ? "▶ Video · " + b.dauer : "⟳ 360-Tour"}</span>}
            {letzte && <span className="mehr">+{restlich} weitere</span>}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="mkg">
      <style>{MK_GAL_CSS}</style>
      {breit
        ? <div className="mkg-mosaik">{buehne}{kacheln}</div>
        : <React.Fragment>{buehne}{leiste}</React.Fragment>}

      {lb && (
        <div className="mkg-lb" role="dialog" aria-modal="true">
          <div className="kopf">
            <span>{i + 1} / {n}{zoom > 1 ? " · gezoomt, doppelt tippen zum Verkleinern" : ""}</span>
            <button className="x" onClick={() => { setZoom(1); setLb(false); }} aria-label="Schließen">✕</button>
          </div>
          <div className="buehne" onClick={buehneTap}
            onTouchStart={(e) => { if (zoom === 1) runter(e.touches[0].clientX); }}
            onTouchEnd={(e) => { if (zoom === 1) rauf(e.changedTouches[0].clientX, e.currentTarget.offsetWidth); }}>
            <img src={typeof bilder[i] === "object" ? bilder[i].poster : bilder[i]} alt="" style={{ transform: "scale(" + zoom + ")" }} />
          </div>
          <div className="fuss">
            {bilder.map((b, j) => (
              <img key={"f" + j} src={typeof b === "object" ? b.poster : b} alt="" className={j === i ? "on" : ""} onClick={() => { setZoom(1); setI(j); }} />
            ))}
          </div>
        </div>
      )}

      {gridAuf && (
        <div className="mkg-grid" role="dialog" aria-modal="true">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1100, margin: "0 auto 16px" }}>
            <span className="mk-mono">{n} Fotos</span>
            <button className="mk-btn ghost tiny" onClick={() => setGridAuf(false)}>Schließen</button>
          </div>
          <div className="raster">
            {bilder.map((b, j) => (
              <img key={"g" + j} src={typeof b === "object" ? b.poster : b} alt="" loading="lazy" onClick={() => { setI(j); setGridAuf(false); setLb(true); }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
Object.assign(window, { MkGalerie, MK_GAL_CSS });
