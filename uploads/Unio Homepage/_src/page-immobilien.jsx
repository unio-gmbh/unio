/* ===================== IMMOBILIEN (KÄUFER) ===================== */

const PROPS=[
  {t:'Das Albrecht — Townhäuser',loc:'Townhäuser & Altbau',img:'albrecht',pos:'center',tags:['Neubau','8 Einheiten'],price:'live vermarktet',
   m:[['8','Einheiten'],['Erstbezug','Qualität']]},
  {t:'Traum Penthouse mit Terrasse',loc:'Wien · Dachgeschoss',img:'penthouse',pos:'center',tags:['Penthouse','Erstbezug'],price:'auf Anfrage',
   m:[['Dachterrasse','Weitblick'],['Bestlage','Wien']]},
  {t:'Obenzwei — Rooftop Penthouse',loc:'Wien · 2. Bezirk',img:'obenzwei',pos:'center',tags:['Penthouse','Terrasse'],price:'auf Anfrage',
   m:[['25 / Wo','Anfragen'],['Leopoldstadt','Lage']]},
  {t:'Penthouse Beheim · Erstbezug',loc:'Wien · €1,7 Mio',img:'beheim',pos:'center',tags:['2 Penthäuser','Hell'],price:'€ 1,7 Mio',
   m:[['2','Penthäuser'],['DG','Maisonette']]},
  {t:'Villa im Grünen mit Pool',loc:'Wien · Stadtrand',img:'ecoluxe',pos:'center',tags:['Villa','Garten'],price:'auf Anfrage',
   m:[['Pool','Privatgarten'],['Ruhelage','Grün']]},
  {t:'Familienhaus mit Weitblick',loc:'Wienerwald',img:'ecoluxe_wide',pos:'center',tags:['Haus','Großer Garten'],price:'auf Anfrage',
   m:[['Garten','großzügig'],['Ruhelage','Natur']]},
];

function HeroI(){
  const ref=useRef();
  useHeroFx(ref);
  return (
    <section className="hero" ref={ref}>
      <HeroBg/>
      <div className="hero-orb ring-spin" style={{right:'-90px',top:'2%'}}><Ring size={340} w={2.5} color="rgba(255,170,9,.4)"/></div>
      <div className="wrap-wide hero-in">
        <div className="hero-copy">
          <span className="kicker">Immobilien finden</span>
          <RevealText tag="h1" style={{fontSize:'clamp(38px,5vw,68px)'}}>Finde dein Zuhause.<br/><span className="accent">Datengestützt.</span></RevealText>
          <p className="sub" style={{maxWidth:520}}>Kuratierte Wiener Projekte und Einzelobjekte — von UNIO datenbasiert vermarktet. Starte deine Suche und sieh in Echtzeit, was verfügbar ist.</p>
          <form className="search-bar" style={{marginTop:28}} onSubmit={(e)=>{e.preventDefault();window.open(APP_URL,'_blank');}}>
            <Icon.search size={19}/>
            <input className="si" placeholder="Ort, Bezirk, Projekt oder Stichwort…" aria-label="Immobiliensuche"/>
            <button className="btn btn-p" type="submit">Suchen</button>
          </form>
          <div style={{display:'flex',gap:9,marginTop:18,flexWrap:'wrap'}}>
            {['Wien 1020','Wien 1170','Penthouse','Villa','Familienhaus'].map(c=>(
              <a key={c} href={APP_URL} target="_blank" rel="noopener" className="chip" style={{cursor:'pointer'}}>{c}</a>
            ))}
          </div>
        </div>
        <div className="hero-photo">
          <Photo src={IMG.albrecht_dusk} pos="center" overlay="linear-gradient(180deg,rgba(14,15,17,0) 45%,rgba(14,15,17,.6) 100%)"/>
          <span className="pill pill-w hp-tag">Live vermarktet</span>
          <div className="hp-cap"><div style={{fontWeight:700,fontSize:20,letterSpacing:'-.01em',textShadow:'0 2px 14px rgba(0,0,0,.4)'}}>Das Albrecht — Townhäuser</div><div style={{fontSize:12.5,color:'rgba(255,255,255,.82)',marginTop:3}}>8 Einheiten · datenbasiert vermarktet</div></div>
        </div>
      </div>
    </section>
  );
}

function PropGrid(){
  return (
    <section className="sec"><div className="wrap-wide">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:16,marginBottom:36}}>
        <div className="sec-head" style={{marginBottom:0}}><span className="kicker">Aktuelle Highlights</span><h2>Ausgewählte Objekte & Projekte</h2></div>
        <span className="live"><span className="pulse"/>Live aus dem UNIO-Dashboard</span>
      </div>
      <div className="props">{PROPS.map((p,i)=>(
        <Reveal key={p.t} style={{transitionDelay:(i%3*70)+'ms'}}>
          <a href={APP_URL} target="_blank" rel="noopener" className="prop">
            <PropMedia img={IMG[p.img]} pos={p.pos} tags={p.tags}/>
            <div className="prop-body">
              <div className="prop-loc"><Icon.pin size={14}/> {p.loc}</div>
              <h4>{p.t}</h4>
              <div className="prop-meta">{p.m.map(([v,k])=><div className="m" key={k}><div className="pv">{v}</div><div className="pk">{k}</div></div>)}</div>
              <div className="prop-foot"><span className="price">{p.price}</span><span className="go">Details ansehen <Icon.arrowUR size={15}/></span></div>
            </div>
          </a>
        </Reveal>
      ))}</div>
      <div style={{textAlign:'center',marginTop:36}}>
        <a className="btn btn-p btn-lg" href={SEARCH_URL} target="_blank" rel="noopener"><Icon.search size={17}/> Alle Immobilien im Dashboard durchsuchen</a>
      </div>
    </div></section>
  );
}

const SCORES=[['Walk Score','99','Sehr gut zu Fuß'],['Alltag','89','Sehr gute Nahversorgung'],['Schulen','10/10','Überdurchschnittlich'],['Transit','25','Auto empfohlen']];
function Featured(){
  return (
    <section className="sec ground"><div className="wrap-wide">
      <div style={{display:'grid',gridTemplateColumns:'1.05fr .95fr',gap:48,alignItems:'center'}} className="comm-grid">
        <div className="hero-photo" style={{aspectRatio:'4/3'}}>
          <Photo src={IMG.albrecht} pos="center" overlay="linear-gradient(180deg,rgba(14,15,17,0) 55%,rgba(14,15,17,.5) 100%)"/>
          <span className="pill pill-w hp-tag">Featured Projekt</span>
          <div className="hp-cap"><div style={{fontWeight:700,fontSize:22,letterSpacing:'-.01em',textShadow:'0 2px 14px rgba(0,0,0,.4)'}}>Das Albrecht</div><div style={{fontSize:12.5,color:'rgba(255,255,255,.84)',marginTop:3}}>Townhäuser & Altbauwohnungen</div></div>
        </div>
        <div>
          <span className="kicker">Featured Projekt</span>
          <h2 style={{fontWeight:600,letterSpacing:'-.03em',fontSize:'clamp(28px,3.2vw,40px)',marginTop:14,lineHeight:1.06}}>Das Albrecht — Townhäuser & Altbau</h2>
          <p style={{color:'var(--fg2)',fontSize:16,lineHeight:1.6,marginTop:16,maxWidth:460}}>Acht Einheiten zwischen modernem Townhouse und charmantem Altbau — hochwertige Ausstattung, private Gärten und Terrassen. In den ersten zwei Wochen über 61 qualifizierte Anfragen.</p>
          <div className="statline" style={{marginTop:24,gap:32}}>
            <div className="stat"><div className="v">8</div><div className="k">Einheiten</div></div>
            <div className="stat"><div className="v">61</div><div className="k">Anfragen / 2 Wo.</div></div>
            <div className="stat"><div className="v">99</div><div className="k">Walk Score</div></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:24}}>
            {SCORES.map(([k,v,d])=>(
              <div key={k} className="card-inset" style={{padding:15}}>
                <div style={{fontSize:11,color:'var(--fg3)',fontWeight:600,textTransform:'uppercase',letterSpacing:'.08em'}}>{k}</div>
                <div style={{fontWeight:700,fontSize:24,letterSpacing:'-.03em',marginTop:6,fontVariantNumeric:'tabular-nums'}}>{v}</div>
                <div style={{fontSize:11.5,color:'var(--fg3)',marginTop:4}}>{d}</div>
              </div>
            ))}
          </div>
          <div className="hero-cta" style={{marginTop:24}}>
            <a className="btn btn-p btn-lg" href={APP_URL} target="_blank" rel="noopener">Projekt & Einheiten ansehen <Icon.arrowUR size={16}/></a>
          </div>
        </div>
      </div>
    </div></section>
  );
}

const STEPS_I=[
  {n:'01',h:'Suchen & entdecken',p:'Durchsuche kuratierte Projekte und Einzelobjekte — gefiltert nach Ort, Preis, Typ und mehr.'},
  {n:'02',h:'Match & anfragen',p:'Hinterlege deine Suchkriterien. Smart Matching meldet dir neue Objekte, die wirklich passen.'},
  {n:'03',h:'Besichtigen & kaufen',p:'Termin, digitales Exposé, Kaufanbot — begleitet von einem CIRCLE-Makler, transparent bis zum Closing.'},
];
function HowItWorks(){
  return (
    <section className="sec ground"><div className="wrap-wide">
      <div className="sec-head center"><span className="kicker">So einfach geht's</span><h2>Vom ersten Klick bis zum Schlüssel</h2></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}} className="routes">
        {STEPS_I.map((s,i)=>(
          <Reveal key={s.n} style={{transitionDelay:(i*80)+'ms'}}>
            <div className="card" style={{padding:30,height:'100%'}}>
              <div style={{fontWeight:700,fontSize:14,color:'var(--orange)',fontVariantNumeric:'tabular-nums'}}>{s.n}</div>
              <h3 style={{fontSize:20,marginTop:14,fontWeight:700,letterSpacing:'-.01em'}}>{s.h}</h3>
              <p style={{fontSize:14.5,color:'var(--fg2)',lineHeight:1.6,marginTop:10}}>{s.p}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div></section>
  );
}

function SellCTA(){
  return (
    <section className="sec ground"><div className="wrap-wide">
      <div className="cta">
        <div className="ringbg"><Ring size={260} w={9} color="var(--orange)"/></div>
        <span className="kicker on-dark">Du willst verkaufen?</span>
        <RevealText style={{marginTop:14}}>Was ist deine Immobilie<br/><span className="accent">heute wirklich wert?</span></RevealText>
        <p>Kostenlose, datenbasierte Bewertung in wenigen Minuten — und auf Wunsch ein klarer Plan für den Abverkauf.</p>
        <div className="row">
          <a className="btn btn-p btn-xl" href={BEWERTUNG_URL} target="_blank" rel="noopener">Immobilie bewerten <Icon.arrowUR size={18}/></a>
          <a className="btn btn-g btn-xl" href={APP_URL} target="_blank" rel="noopener">Immobiliensuche starten</a>
        </div>
      </div>
    </div></section>
  );
}

function Gallery(){
  const tiles=[
    {img:'beheim',cap:'Lichtdurchflutete Penthäuser',tall:true},
    {img:'int_kitchen',cap:'Markenküchen & Naturstein'},
    {img:'obenzwei_dinner',cap:'Dachterrassen über Wien'},
    {img:'vienna_garden',cap:'Lage & Lebensqualität'},
    {img:'beheim_2',cap:'Erstbezug, schlüsselfertig'},
  ];
  return (
    <section className="sec"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker">Einblicke</span><h2>Wohnen, das sich sehen lässt</h2>
        <p>Jedes Objekt wird mit eigener Story, professioneller Inszenierung und datenbasierter Vermarktung in Szene gesetzt.</p></div>
      <div className="gallery">{tiles.map((t,i)=>(
        <Reveal key={t.img} className={"gtile"+(t.tall?' tall':'')} style={{transitionDelay:(i*70)+'ms'}}>
          <Photo src={IMG[t.img]} pos="center" overlay="linear-gradient(180deg,rgba(14,15,17,0) 50%,rgba(14,15,17,.6) 100%)"/>
          <span className="gcap">{t.cap}</span>
        </Reveal>
      ))}</div>
    </div></section>
  );
}

function App(){
  return <><Nav active="immobilien"/><HeroI/><PropGrid/><Featured/><Gallery/><HowItWorks/><SellCTA/><Footer/></>;
}
