/* ===================== HOME ===================== */

function HeroPanel(){
  const pipe=[['Testing',92],['Leads',74],['Qualifiziert',58],['Besichtigung',41],['Closing',27]];
  const [vol,volRef]=useCountUp(84.2,1000);
  return (
    <div style={{position:'relative'}} ref={volRef}>
      <div className="panel glass-panel">
        <div className="panel-bar">
          <span className="dot" style={{background:'#FF5F57'}}/><span className="dot" style={{background:'#FEBC2E'}}/><span className="dot" style={{background:'#28C840'}}/>
          <span className="ttl">LENS · Live Pipeline</span><span className="live" style={{marginLeft:'auto'}}><span className="pulse"/>LIVE</span>
        </div>
        <div className="panel-body">
          <div className="kpi-row">
            <div className="kpi"><div className="k">Volumen Pipeline</div><div className="v">€{vol.toFixed(1)}<span style={{fontSize:15,color:'var(--fg3)'}}> Mio</span></div><div className="kspark"><Sparkline data={[40,44,42,52,49,58,63,71,84]} h={30}/></div></div>
            <div className="kpi"><div className="k">Ø Intent Score</div><Gauge value={73} size={92} label="von 100" /></div>
          </div>
          <div className="chart-card">
            <div className="chart-head"><span className="t">Nachfrage · 30 Tage</span><span className="up" style={{fontWeight:700,fontSize:14}}>+31,8 %</span></div>
            <ForecastBars data={[34,40,38,48,44,55,50,62,58,70,66,80,76,86]} accentIdx={13} delta={12} h={62}/>
          </div>
          <div className="pipe">{pipe.map(([n,pp],idx)=>(
            <div className="pipe-row" key={n}><span className="nm">{n}</span><SegBar value={pp} segN={20} height={8}/><span className="pct">{pp}%</span></div>
          ))}</div>
        </div>
      </div>
      <div className="glass-tint float-card">
        <div style={{fontSize:11,color:'var(--fg3)',fontWeight:600,letterSpacing:'.04em'}}>NEUE ANFRAGE</div>
        <div style={{display:'flex',alignItems:'center',gap:9,marginTop:8}}>
          <span className="av" style={{width:30,height:30,fontSize:11,background:'var(--orange)',color:'var(--oo)'}}>OB</span>
          <div><div style={{fontWeight:600,fontSize:13}}>Obenzwei · 2. Bez.</div><div style={{fontSize:11,color:'var(--pos)',fontWeight:600}}>Intent 91 · Hot Lead</div></div>
        </div>
      </div>
    </div>
  );
}

function Hero(){
  const ref=useRef();
  useHeroFx(ref);
  return (
    <section className="hero" ref={ref}>
      <HeroBg/>
      <div className="hero-orb ring-spin" style={{right:'-90px',top:'6%'}}><Ring size={360} w={2.5} color="rgba(255,170,9,.45)"/></div>
      <div className="wrap-wide hero-in">
        <div className="hero-copy">
          <span className="kicker">Data-Powered Real Estate</span>
          <RevealText tag="h1">Real Estate.<br/><span className="accent">Finally Simple.</span></RevealText>
          <p className="sub">Daten, Software und Menschen — vereint. Wir steuern Marketing und Vertrieb transparent bis zum Abverkauf.</p>
          <HeroSearch/>
          <div className="hero-meta">
            <div className="stat"><div className="v">300<span className="accent">+</span></div><div className="k">Mio € Volumen</div></div>
            <div className="stat"><div className="v">1 Mrd</div><div className="k">Reichweite</div></div>
            <div className="stat"><div className="v">25<span className="accent">+</span></div><div className="k">Top-Makler</div></div>
          </div>
        </div>
        <HeroPanel/>
      </div>
      <div className="hero-cue">Mehr entdecken<span className="scrollline"></span></div>
    </section>
  );
}

const ROUTES=[
  {icon:<Icon.building size={22}/>, h:"Ich bin Bauträger", p:"Projekt vor dem Baustart validieren, Marketing & Vertrieb datenbasiert steuern — 100 % erfolgsbasiert.", go:"Projekt prüfen lassen", href:"bautraeger.html"},
  {icon:<Icon.users size={22}/>, h:"Ich bin Makler", p:"Behalte deine Provision, bau deine eigene Marke und werde Mitgesellschafter im CIRCLE-Netzwerk.", go:"CIRCLE entdecken", href:"makler.html"},
  {icon:<Icon.home size={22}/>, h:"Ich suche eine Immobilie", p:"Kuratierte Wiener Projekte & Einzelobjekte — oder lass deine Immobilie kostenlos bewerten.", go:"Immobilien ansehen", href:"immobilien.html"},
];
function Routes(){
  return (
    <section className="sec"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker">Wo willst du hin?</span><h2>Ein System. Drei Wege hinein.</h2>
        <p>UNIO bringt Bauträger, Makler und Suchende auf einer Plattform zusammen — und holt jeden genau dort ab, wo er gerade steht.</p></div>
      <div className="routes">{ROUTES.map((r,i)=>(
        <Reveal key={r.h} style={{transitionDelay:(i*80)+'ms'}}>
          <a href={r.href} className="route">
            <span className="ricon">{r.icon}</span>
            <h3>{r.h}</h3><p>{r.p}</p>
            <span className="go">{r.go} <Icon.arrow size={16}/></span>
          </a>
        </Reveal>
      ))}</div>
    </div></section>
  );
}

const PRODUCTS=[
  {n:'NOVA',d:'Marktvalidierung in Echtzeit',h:'Test before you build.',desc:'NOVA testet Projekt, Pricing, Grundrisse und Zielgruppen live an tausenden Käuferprofilen. Predictive Models zeigen schon vor dem Baustart, was funktioniert — jede Entscheidung datenbasiert, nicht gehofft.',feat:['Creative Testing','Persona-Cluster','Pricing-Sim','Predictive Demand'],viz:[['+18%','Preisresilienz'],['7,4k','Käuferprofile'],['92','Match-Score']],spark:[40,38,46,44,55,52,63,68,80]},
  {n:'LEAD ENGINE',d:'Nachfrage mit Intent',h:'Realtime Demand bis zum Close.',desc:'Skalierbare Leadgenerierung über alle relevanten Kanäle — mit sauberem Tracking, KI-Qualifizierung und Intent-Score. Aus Nachfrage wird planbarer, messbarer Vertrieb.',feat:['Intent Score','KI-Qualifizierung','Budget-Attribution','Sales Execution'],viz:[['73','Ø Intent Score'],['−34%','Cost / Lead'],['2,1d','Time to Close']],spark:[30,42,38,50,47,58,64,60,72]},
  {n:'CIRCLE',d:'Top-Performer statt Masse',h:'Agent-first beginnt hier.',desc:'Eine kuratierte Makler-Community ab €150K Track-Record. Selbstständig im Handeln, mit dem Rückhalt eines starken Netzwerks — inklusive Software, Support und echter Unternehmensbeteiligung.',feat:['100% Provision','Share-Modell','Dealflow','Personal Branding'],viz:[['100%','Provision'],['49%','Community Share'],['25+','Partner']],spark:[44,48,46,55,60,58,66,72,78]},
  {n:'LENS',d:'Dashboard & Data Intelligence',h:'Jeder Schritt messbar.',desc:'Volle Transparenz über Projekte, Leads und Vertriebsperformance. Live-Pipeline, Unit-Status und Predictions in Echtzeit — plus eine Data Engine, die aus jedem Projekt lernt.',feat:['Live Pipeline','Unit Status','ROI-Tracking','Feedback-Loop'],viz:[['€84M','Pipeline'],['31,8%','Abschlussquote'],['Live','Echtzeit']],spark:[36,40,44,42,52,58,55,64,70]},
];
const PROD_CHARTS=[
  <ForecastBars data={[40,38,46,44,55,52,63,68,82]} accentIdx={8} delta={18} h={72}/>,
  <Gauge value={73} size={108} label="Ø Intent"/>,
  <ActivityRings rings={[{c:'var(--orange)',v:100},{c:'var(--lx-gold)',v:49},{c:'var(--lx-grey)',v:25}]} size={120}/>,
  <SegDonut segs={[{c:'var(--orange)',v:38},{c:'#FFC24D',v:21},{c:'var(--lx-gold)',v:83}]} center="42" label="% VERKAUFT" size={120}/>,
];
function Products(){
  const [i,setI]=useState(0); const p=PRODUCTS[i];
  return (
    <section className="sec ground" id="plattform"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker">Die Plattform</span><h2>High-End-Software und Community, vereint</h2>
        <p>Marketing, Software und Vertrieb in einer Schleife — nicht in drei Silos. Vier Module, ein lernendes System.</p></div>
      <div className="prod">
        <div className="prod-tabs">
          {PRODUCTS.map((x,k)=>(
            <button className={"ptab"+(k===i?" on":"")} key={x.n} onClick={()=>setI(k)}><span className="idx">0{k+1}</span><div className="pn">{x.n}</div><div className="pd">{x.d}</div></button>
          ))}
          <div className="ptab-foot">
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
              <span style={{fontSize:11,fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--fg3)'}}>Ein lernendes System</span>
              <span className="live"><span className="pulse"/>LIVE</span>
            </div>
            <Sparkline data={[30,36,33,44,40,52,49,61,57,68,72]} h={34}/>
            <div style={{fontSize:12,color:'var(--fg3)',marginTop:8,lineHeight:1.45}}>Vier Module, eine Schleife — jedes Signal schärft das nächste.</div>
          </div>
        </div>
        <div className="prod-detail" key={i}>
          <span className="kicker">{p.d}</span><h3>{p.h}</h3><p className="pdesc">{p.desc}</p>
          <div className="feat">{p.feat.map(f=><span className="chip" key={f}>{f}</span>)}</div>
          <div className="prod-visual"><div className="viz">{p.viz.map(([v,k])=><div className="vstat" key={k}><div className="v" style={{color:v==='Live'?'var(--pos)':v[0]==='−'?'var(--neg)':'var(--orange-deep)'}}>{v}</div><div className="k">{k}</div></div>)}<div style={{flex:1,minWidth:130,display:'flex',justifyContent:'flex-end',alignItems:'center'}} key={'c'+i}>{PROD_CHARTS[i]}</div></div></div>
        </div>
      </div>
    </div></section>
  );
}

const PROC=[['01','Analyse','Makro/Mikro, Leistbarkeit, Wettbewerb'],['02','NOVA','Mix, Grundrisse, Pricing, Personas'],['03','Positionierung','Messaging, Visuals, Content-System'],['04','Performance','KI-Audience, Creatives, Attribution'],['05','CIRCLE','Lead-Qualifizierung & Vertrieb'],['06','LENS','Real-Time KPIs, ROI, Feedback-Loop']];
function Process(){
  const ref=useRef();
  const p=useScrollProgress(ref,{start:0.58,end:0.3});
  const lit=p*PROC.length;
  return (
    <section className="sec" id="prozess"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker">Der UNIO-Prozess</span><h2>Von validierter Story zu steuerbarem Abverkauf</h2>
        <p>Sechs Schritte, eine Schleife. Was am Ende gelernt wird, fließt vorne wieder ein — das System wird mit jedem Projekt besser.</p></div>
      <div className="flow" ref={ref}>
        <div className="flow-line"><i style={{width:(Math.min(1,p*1.05)*100)+'%'}}/></div>
        {PROC.map(([n,t,d],k)=>(
          <div className={"fnode"+(k<lit?' on':'')} key={n}>
            <span className="fdot"/><span className="fnum">{n}</span>
            <div className="ft">{t}</div><div className="fp">{d}</div>
          </div>
        ))}
      </div>
    </div></section>
  );
}

const COMMUNITY_NAMES=["Marcin Fituch","Nikita Neznamov","Patrycja Szpak","Wenzel Wächter","Marcus Anthofer-Weiss","Laurenz Wurzer"];
function Community(){
  return (
    <section className="sec ground" id="community"><div className="wrap-wide">
      <div style={{display:'grid',gridTemplateColumns:'1.1fr .9fr',gap:64,alignItems:'center'}} className="comm-grid">
        <div>
          <span className="kicker">Die Community</span>
          <RevealText style={{fontWeight:600,letterSpacing:'-.03em',lineHeight:1.05,fontSize:'clamp(30px,3.8vw,48px)',marginTop:14}}>Automation where it <span className="accent-deep">matters.</span><br/>Human where it counts.</RevealText>
          <p style={{color:'var(--fg2)',fontSize:17,lineHeight:1.6,marginTop:18,maxWidth:520}}>Software automatisiert die Prozesse — damit unsere Makler tun, was zählt: echte Beziehungen, ehrliche Beratung, Abschlüsse. Eine kuratierte Bewegung statt Einzelkämpfer.</p>
          <div className="av-row" style={{marginTop:28}}>
            {COMMUNITY_NAMES.map(n=><Avatar key={n} name={n} size={50}/>)}
            <span className="av" style={{background:'var(--orange)',color:'var(--oo)',width:50,height:50,fontSize:13}}>+19</span>
          </div>
          <div className="hero-cta" style={{marginTop:30}}>
            <a className="btn btn-p btn-lg" href="makler.html#bewerben">Teil der Bewegung werden <Icon.arrow size={17}/></a>
            <a className="btn btn-g btn-lg" href="makler.html">CIRCLE entdecken</a>
          </div>
        </div>
        <div className="card" style={{padding:36,boxShadow:'var(--shadow-2)'}}>
          <div style={{borderLeft:'2px solid var(--orange)',paddingLeft:24}}>
            <p className="quote">„Ich akquiriere, verhandle, schließe ab — <span className="accent-deep">und baue endlich etwas Eigenes auf.</span> Meine Provision, meine Marke, mein Anteil am Netzwerk."</p>
            <div style={{display:'flex',alignItems:'center',gap:12,marginTop:24}}>
              <Avatar name="Marcin Fituch" size={44}/>
              <div><div style={{fontWeight:700,fontSize:15}}>CIRCLE Partner</div><div style={{fontSize:13,color:'var(--fg3)'}}>Selbstständiger Makler, Wien</div></div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14,marginTop:30,paddingTop:26,borderTop:'1px solid var(--bdf)'}}>
            {[['100%','Provision ab €150K'],['49%','Anteile an Top-Performer'],['20%','Gewinn-Ausschüttung']].map(([v,k])=>(
              <div key={k}><div style={{fontWeight:700,fontSize:'clamp(22px,2.4vw,30px)',letterSpacing:'-.02em',color:'var(--orange)',fontVariantNumeric:'tabular-nums'}}>{v}</div><div style={{fontSize:12,color:'var(--fg3)',marginTop:6,lineHeight:1.4}}>{k}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div></section>
  );
}

const HIGHLIGHTS=[
  {t:'Das Albrecht — Townhäuser',loc:'Townhäuser & Altbau',img:'albrecht',tags:['Neubau','8 Einheiten'],price:'live vermarktet',m:[['61','Anfragen / 2 Wo.'],['8','Einheiten']]},
  {t:'Obenzwei — Penthouse',loc:'Wien · 2. Bezirk',img:'obenzwei',tags:['Penthouse','Bestlage'],price:'auf Anfrage',m:[['25','Anfragen / Woche'],['Leopoldstadt','Lage']]},
  {t:'Penthouse Beheim',loc:'Wien · €1,7 Mio',img:'beheim',tags:['2 Penthäuser','Erstbezug'],price:'€ 1,7 Mio',m:[['27','Anfragen / 2 Wo.'],['2','Penthäuser']]},
];
function ImmoTeaser(){
  return (
    <section className="sec ground"><div className="wrap-wide">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:20,marginBottom:40}}>
        <div className="sec-head" style={{marginBottom:0}}><span className="kicker">Immobiliensuche</span><h2>Objekte, die du jetzt entdecken kannst</h2></div>
        <a className="btn btn-g" href="immobilien.html">Alle Immobilien <Icon.arrow size={16}/></a>
      </div>
      <div className="props">{HIGHLIGHTS.map((p,i)=>(
        <Reveal key={p.t} style={{transitionDelay:(i*70)+'ms'}}>
          <a href={APP_URL} target="_blank" rel="noopener" className="prop">
            <PropMedia img={IMG[p.img]} tags={p.tags}/>
            <div className="prop-body">
              <div className="prop-loc"><Icon.pin size={14}/> {p.loc}</div>
              <h4>{p.t}</h4>
              <div className="prop-meta">{p.m.map(([v,k])=><div className="m" key={k}><div className="pv">{v}</div><div className="pk">{k}</div></div>)}</div>
              <div className="prop-foot">{p.price==='live vermarktet'
                ? <span className="prop-status"><i/>Live vermarktet</span>
                : <span className="price">{p.price}</span>}
                <span className="go">Im Dashboard <Icon.arrowUR size={15}/></span></div>
            </div>
          </a>
        </Reveal>
      ))}</div>
      <div style={{marginTop:32,display:'flex',gap:13,flexWrap:'wrap',alignItems:'center'}}>
        <a className="btn btn-p btn-lg" href={SEARCH_URL} target="_blank" rel="noopener"><Icon.search size={17}/> Immobiliensuche starten</a>
        <a className="btn btn-ghost" href={BEWERTUNG_URL} target="_blank" rel="noopener">Oder: eigene Immobilie bewerten <Icon.arrowUR size={16}/></a>
      </div>
    </div></section>
  );
}

/* ---- Proof / Case strip ---- */
const HCASES=[
  {img:'ecoluxe',tag:'Villa Ecoluxe',v:'+31%',k:'über Zielpreis · 282 Anfragen'},
  {img:'penthouse',tag:'Penthouse €4 Mio',v:'40',k:'Anfragen nach Übernahme'},
  {img:'obenzwei_dinner',tag:'Obenzwei · 2. Bezirk',v:'25',k:'hochqual. Anfragen / Woche'},
];
function ProofStrip(){
  return (
    <section className="sec"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker">Proof · Live im Markt</span><h2>Bewiesen im Markt.<br/>Nicht am Papier.</h2>
        <p>Echte Projekte, echte Zahlen — jede Vermarktung mit eigener Story, Performance-Kampagnen und transparenter Vertriebssteuerung.</p></div>
      <div className="cases">{HCASES.map((c,i)=>(
        <Reveal key={c.tag} style={{transitionDelay:(i*80)+'ms'}}>
          <div className="case">
            <div className="case-media">
              <Photo src={IMG[c.img]} pos="center" overlay="linear-gradient(180deg,rgba(14,15,17,0) 42%,rgba(14,15,17,.72) 100%)"/>
              <div className="case-cap"><h3 style={{fontSize:19}}>{c.tag}</h3></div>
            </div>
            <div className="case-body" style={{flexDirection:'row',alignItems:'center',gap:18}}>
              <div className="cm"><div className="cmv">{c.v}</div></div>
              <div style={{fontSize:13,color:'var(--fg2)',lineHeight:1.4}}>{c.k}</div>
            </div>
          </div>
        </Reveal>
      ))}</div>
      <div style={{textAlign:'center',marginTop:34}}><a className="btn btn-g btn-lg" href="bautraeger.html#cases">Alle Case Studies ansehen <Icon.arrow size={16}/></a></div>
    </div></section>
  );
}

function CTA(){
  return (
    <section className="sec ground"><div className="wrap-wide">
      <div className="cta">
        <div className="ringbg"><Ring size={260} w={9} color="var(--orange)"/></div>
        <RevealText>Von validierter Story zu<br/><span className="accent">steuerbarem Abverkauf.</span></RevealText>
        <p>UNIO macht aus Vermarktung ein steuerbares System — mit Daten, Technologie und Vertriebspower. Wähle deinen Einstieg.</p>
        <div className="row">
          <a className="btn btn-p btn-xl" href="bautraeger.html">Projekt prüfen lassen <Icon.arrow size={18}/></a>
          <a className="btn btn-g btn-xl" href="makler.html#bewerben">CIRCLE Partner werden</a>
        </div>
      </div>
    </div></section>
  );
}

function HumanBand(){
  const ref=useRef();
  useEdgeRadius(ref,44);
  return (
    <section style={{padding:0}}><div className="photo-band" ref={ref}>
      <Parallax amount={50} style={{position:'absolute',inset:'-8% 0'}}>
        <Photo src={IMG.lifestyle_wine} pos="center" overlay="linear-gradient(90deg,rgba(14,15,17,.6),rgba(14,15,17,.15) 55%,rgba(14,15,17,.35))"/>
      </Parallax>
      <div className="wrap-wide" style={{position:'relative',height:'100%',display:'flex',alignItems:'center'}}>
        <div style={{color:'#fff',maxWidth:560}}>
          <span className="kicker" style={{color:'var(--orange)'}}>Data + Human</span>
          <RevealText style={{fontWeight:600,letterSpacing:'-.03em',fontSize:'clamp(28px,3.8vw,52px)',lineHeight:1.04,marginTop:14,textShadow:'0 2px 24px rgba(0,0,0,.4)',color:'#fff'}}>Daten als Beweis.<br/>Menschen als Herz.</RevealText>
          <p style={{fontSize:17,lineHeight:1.6,marginTop:18,color:'rgba(255,255,255,.86)',maxWidth:460}}>Wir bauen Technologie, damit am Ende ein Mensch im richtigen Moment für den richtigen Menschen da ist. Vom ersten Klick bis zum Schlüssel.</p>
        </div>
      </div>
    </div></section>
  );
}

function App(){
  return <><UnioLoader/><Nav active="home"/><Hero/><ImmoTeaser/><Ticker/><Routes/><Products/><Process/><HumanBand/><Community/><ProofStrip/><CTA/><Footer/></>;
}
