/* ===================== STORY / ÜBER UNS ===================== */

function HeroS(){
  const ref=useRef();
  useHeroFx(ref);
  return (
    <section className="hero hero-1col" ref={ref}>
      <HeroBg/>
      <div className="hero-orb ring-spin" style={{right:'8%',top:'0%'}}><Ring size={300} w={2.5} color="rgba(255,170,9,.38)"/></div>
      <div className="wrap-wide hero-in">
        <div className="hero-copy">
          <span className="kicker">2054 — Fusion</span>
          <RevealText tag="h1" style={{fontSize:'clamp(38px,5vw,68px)'}}>Fünf Unternehmen.<br/><span className="accent">Eine Mission.</span></RevealText>
          <p className="sub" style={{maxWidth:580}}>Drei etablierte Wiener Spieler — Vertrieb, Marketing und Technologie — die in der Branche sonst getrennt arbeiten. Jetzt unter einem Dach und in einer Logik: Data-Powered Real Estate.</p>
          <div className="statline" style={{marginTop:40}}>
            <div className="stat"><div className="v">300<span className="accent">+</span></div><div className="k">Mio € vermittelt</div></div>
            <div className="stat"><div className="v">50 Mio<span className="accent">+</span></div><div className="k">Zeilen Code</div></div>
            <div className="stat"><div className="v">3 Mio €</div><div className="k">Umsatz 2025</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TEAM=[
  {tag:'01 · Vertrieb',n:'BOOM LIVING',d:'Wiener Vertriebshaus, 1. Bezirk. 20 Mitarbeiter. Lange Liste erfolgreich abverkaufter Wohnbauprojekte.',note:'Closing-Power & Vertriebs-DNA',icon:<Icon.users size={22}/>},
  {tag:'02 · Marketing',n:'AD BOUTIQUE',d:'Performance-Marketing-Einheit mit Real-Estate-Fokus. Gegründet vom ehemaligen Head of Digital Marketing bei Soravia.',note:'Betreut Rhomberg · Winegg · Soravia',icon:<Icon.trending size={22}/>},
  {tag:'03 · Technologie',n:'appworks',d:'Eigenständiges Entwicklungsteam. Liefert die technologische Infrastruktur — NOVA, CIRCLE-Tools, LENS.',note:'Eigene Plattform, kein Stack-Flickwerk',icon:<Icon.layers size={22}/>},
];
function Team(){
  return (
    <section className="sec" id="team"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker">Wer wir sind</span><h2>Drei Disziplinen, ein System.</h2>
        <p>Marketing, Software und Vertrieb in einer Schleife — nicht in drei Silos.</p></div>
      <div className="routes">{TEAM.map((t,i)=>(
        <Reveal key={t.n} style={{transitionDelay:(i*80)+'ms'}}>
          <div className="route" style={{minHeight:268}}>
            <span className="ricon">{t.icon}</span>
            <div className="pill pill-o" style={{alignSelf:'flex-start',marginTop:18}}>{t.tag}</div>
            <h3 style={{marginTop:12,fontSize:24}}>{t.n}</h3><p>{t.d}</p>
            <div style={{marginTop:'auto',paddingTop:16,fontSize:13,fontWeight:600,color:'var(--orange)',display:'flex',alignItems:'center',gap:7}}><Icon.check size={15} sw={2.5}/> {t.note}</div>
          </div>
        </Reveal>
      ))}</div>
    </div></section>
  );
}

function Category(){
  return (
    <section className="sec ink"><div className="wrap-wide" style={{textAlign:'center'}}>
      <span className="kicker on-dark">Die Kategorie</span>
      <RevealText style={{fontWeight:600,letterSpacing:'-.03em',fontSize:'clamp(32px,4.6vw,60px)',lineHeight:1.04,marginTop:18,maxWidth:900,marginLeft:'auto',marginRight:'auto'}}>
        Nicht graduell besser.<br/><span className="accent-deep">Strukturell anders.</span></RevealText>
      <p style={{color:'var(--fg2)',fontSize:18,lineHeight:1.6,marginTop:22,maxWidth:640,marginLeft:'auto',marginRight:'auto'}}>
        UNIO baut im Wiener Wohnbau eine neue Vertriebskategorie auf — ein lernendes System statt einer statischen Kampagne. Jeder generiert Leads. Kaum jemand verkauft planbar.</p>
    </div></section>
  );
}

const CAPS=[
  ['Top-Performer Makler','Zugriff auf die UNIO Agent Community aus selbstständigen Maklern mit min. €150K Track-Record.'],
  ['High-End Marketing','Performance-getriebene Leadgenerierung, die Projekte schneller abverkauft — vom Echtzeit-Testing bis zur Anfragequalität.'],
  ['State-of-the-Art Software','Ein Operating System, das Leads, Pipeline und Closing strukturiert — damit Makler schneller abschließen.'],
  ['Data Analytics','Scoring, Insights und Prognosen zeigen, was wirklich funktioniert — und wo als Nächstes anzusetzen ist.'],
];
function Capabilities(){
  return (
    <section className="sec"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker">Fusion</span><h2>Was in einem System zusammenkommt</h2></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}} className="props">
        {CAPS.map(([h,d],i)=>(
          <Reveal key={h} style={{transitionDelay:(i*70)+'ms'}}>
            <div className="card" style={{padding:30,display:'flex',gap:20,alignItems:'flex-start'}}>
              <Ring size={40} w={7} color="var(--orange)"/>
              <div><div style={{fontWeight:700,fontSize:19,letterSpacing:'-.01em'}}>{h}</div><p style={{fontSize:14.5,color:'var(--fg2)',lineHeight:1.6,marginTop:8}}>{d}</p></div>
            </div>
          </Reveal>
        ))}
      </div>
    </div></section>
  );
}

const PROCS=[['01','Analyse','Makro/Mikro, Leistbarkeit, Wettbewerb'],['02','NOVA','Mix, Grundrisse, Pricing, Personas'],['03','Positionierung','Messaging, Visuals, Content-System'],['04','Performance','KI-Audience, Creatives, Attribution'],['05','CIRCLE','Lead-Qualifizierung & Vertrieb'],['06','LENS','Real-Time KPIs, ROI, Feedback-Loop']];
function ProcessS(){
  const ref=useRef();
  const p=useScrollProgress(ref,{start:0.58,end:0.3});
  const lit=p*PROCS.length;
  return (
    <section className="sec ground"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker">Der UNIO-Prozess</span><h2>Von der Analyse zum lernenden Feedback-Loop</h2></div>
      <div className="flow" ref={ref}>
        <div className="flow-line"><i style={{width:(Math.min(1,p*1.05)*100)+'%'}}/></div>
        {PROCS.map(([n,t,d],k)=>(
          <div className={"fnode"+(k<lit?' on':'')} key={n}>
            <span className="fdot"/><span className="fnum">{n}</span>
            <div className="ft">{t}</div><div className="fp">{d}</div>
          </div>
        ))}
      </div>
    </div></section>
  );
}

function ViennaBand(){
  return (
    <section style={{padding:0}}><div className="photo-band" style={{height:'clamp(300px,38vw,480px)'}}>
      <Parallax amount={44} style={{position:'absolute',inset:'-8% 0'}}>
        <Photo src={IMG.schoenbrunn} pos="center" overlay="linear-gradient(90deg,rgba(14,15,17,.55),rgba(14,15,17,.1) 60%)"/>
      </Parallax>
      <div className="wrap-wide" style={{position:'relative',height:'100%',display:'flex',alignItems:'center'}}>
        <div style={{color:'#fff',maxWidth:540}}>
          <span className="kicker" style={{color:'var(--orange)'}}>Wien · Heimmarkt</span>
          <h2 style={{fontWeight:600,letterSpacing:'-.03em',fontSize:'clamp(26px,3.4vw,46px)',lineHeight:1.06,marginTop:14,textShadow:'0 2px 22px rgba(0,0,0,.4)'}}>Gebaut für den Wiener Wohnbau.</h2>
          <p style={{fontSize:16,lineHeight:1.6,marginTop:16,color:'rgba(255,255,255,.86)',maxWidth:460}}>Drei etablierte Wiener Häuser — Vertrieb, Marketing, Technologie — die den Markt kennen, in dem sie Kategorie neu definieren.</p>
        </div>
      </div>
    </div></section>
  );
}

function ValuesS(){
  const v=['Transparency','Empowerment','Technologie','Data Ownership'];
  return (
    <section className="sec-sm"><div className="wrap-wide" style={{display:'flex',gap:'clamp(20px,4vw,56px)',justifyContent:'space-between',flexWrap:'wrap'}}>
      {v.map((x)=>(
        <div key={x} style={{display:'flex',alignItems:'center',gap:14,flex:'1 1 200px'}}>
          <IconMark size={30}/>
          <span style={{fontWeight:600,fontSize:'clamp(17px,1.9vw,23px)',letterSpacing:'-.01em'}}>{x}</span>
        </div>
      ))}
    </div></section>
  );
}

function VisionCTA(){
  return (
    <section className="sec ground" style={{paddingBottom:64}}><div className="wrap-wide">
      <div className="cta">
        <div className="ringbg"><Ring size={260} w={9} color="var(--orange)"/></div>
        <RevealText>Automation where it <span className="accent">matters.</span><br/>Human where it counts.</RevealText>
        <p>UNIO verwandelt komplexe Daten in klare Handlungsentscheidungen — vom Testing bis zum Verkauf. Messbar, transparent, effizient.</p>
        <div className="row">
          <a className="btn btn-p btn-xl" href="bautraeger.html">Für Bauträger <Icon.arrow size={18}/></a>
          <a className="btn btn-g btn-xl" href="makler.html">Für Makler</a>
        </div>
      </div>
    </div></section>
  );
}

function App(){
  return <><Nav active="story"/><HeroS/><Ticker/><Team/><ViennaBand/><Category/><Capabilities/><ProcessS/><ValuesS/><VisionCTA/><Footer/></>;
}
