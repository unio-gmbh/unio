/* ===================== BAUTRÄGER ===================== */

function HeroB({onOpen}){
  const ref=useRef();
  useHeroFx(ref);
  return (
    <section className="hero" ref={ref}>
      <HeroBg/>
      <div className="hero-orb ring-spin" style={{right:'-90px',top:'2%'}}><Ring size={340} w={2.5} color="rgba(255,170,9,.4)"/></div>
      <div className="wrap-wide hero-in">
        <div className="hero-copy">
          <span className="kicker">Für Bauträger</span>
          <RevealText tag="h1" style={{fontSize:'clamp(38px,5vw,64px)'}}>Testen. Lernen.<br/>Optimieren. <span className="accent">Verkaufen.</span></RevealText>
          <p className="sub" style={{maxWidth:540}}>Wir validieren Projekte mit Echtzeitdaten, richten sie konsequent an Käuferbedürfnissen aus und steuern Marketing und Vertrieb transparent bis zum Abverkauf.</p>
          <div className="hero-cta">
            <button className="btn btn-p btn-xl" onClick={onOpen}>Projekt prüfen lassen <Icon.arrow size={18}/></button>
            <a className="btn btn-g btn-xl" href="#conversion">Conversion-Modell</a>
          </div>
          <div className="statline" style={{marginTop:40}}>
            <div className="stat"><div className="v">300<span className="accent">+</span></div><div className="k">Mio € Volumen vermittelt</div></div>
            <div className="stat"><div className="v">1 Mrd</div><div className="k">Reichweite über Kampagnen</div></div>
            <div className="stat"><div className="v">100<span className="accent">%</span></div><div className="k">erfolgsbasiert</div></div>
          </div>
        </div>
        <div className="hero-photo">
          <Photo src={IMG.penthouse} pos="center" overlay="linear-gradient(180deg,rgba(14,15,17,0) 52%,rgba(14,15,17,.5) 100%)"/>
          <span className="pill pill-w hp-tag">Live vermarktet</span>
          <div className="hp-cap"><div style={{fontWeight:700,fontSize:18,letterSpacing:'-.01em',textShadow:'0 2px 14px rgba(0,0,0,.4)'}}>Penthouse · Wien</div></div>
        </div>
      </div>
    </section>
  );
}

function Logos(){
  const names=["RHOMBERG","WINEGG","SORAVIA"];
  return (
    <div className="wrap-wide" style={{display:'flex',alignItems:'center',gap:36,flexWrap:'wrap',padding:'30px 40px',justifyContent:'center'}}>
      <span style={{fontSize:12.5,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--fg3)',fontWeight:600}}>Bauträger, die bereits mit uns arbeiten</span>
      {names.map(n=><span key={n} style={{fontWeight:600,fontSize:22,letterSpacing:'.04em',color:'var(--fg2)',opacity:.75}}>{n}</span>)}
    </div>
  );
}

const PROBSB=[
  ['01','In der Planung','Bauträger planen auf Annahmen: Zielgruppe, Preispunkt, Grundrisslogik, Story — nicht validiert. Der Fehler zeigt sich erst, wenn Zeit, Budget und Produkt fixiert sind.'],
  ['02','Im Marketing','Falsche Zielgruppen, unklare Positionierung, fehlendes Tracking. Volumen ohne Qualität — teure Leads ohne echte Kaufabsicht.'],
  ['03','Im Vertrieb','Status, Geschwindigkeit und Abschlusswahrscheinlichkeit sind nicht transparent. Entscheidungen zu Preis, Produkt und Vertrieb kommen zu spät.'],
];
function ProblemB(){
  return (
    <section className="sec ink"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker on-dark">Marktrealität 2026</span>
        <RevealText>Immobilienprojekte scheitern nicht an der Bauqualität.<br/><span className="accent">Sondern an Unsicherheit.</span></RevealText>
        <p>Kapital ist teuer geworden, Käufer kritischer, Vermarktungszeiten länger. Was heute funktioniert, sind Systeme, die aus jedem Klick, jeder Besichtigung und jedem Abschluss lernen.</p></div>
      <div className="probs">{PROBSB.map(([n,t,d],i)=>(
        <Reveal key={n} style={{transitionDelay:(i*80)+'ms'}}><div className="prob"><div className="pn">{n}</div><h4>{t}</h4><p>{d}</p></div></Reveal>
      ))}</div>
    </div></section>
  );
}

const SYS=[
  {tag:'NOVA · Live-Testing',icon:<Icon.spark size={22}/>,h:'Performance Marketing',d:'Echtes Performance-Marketing mit dynamischer Budget-Steuerung. Hypothesen werden live am Markt getestet — Budgets wandern wöchentlich dorthin, wo sie messbar performen.'},
  {tag:'LENS · Echtzeit-KPIs',icon:<Icon.chart size={22}/>,h:'Eigene Software-Infrastruktur',d:'Steuerungslogik in Echtzeit — kein Tool-Flickwerk, sondern eine integrierte Plattform. Vertriebsergebnisse fließen direkt zurück ins Marketing und schärfen Zielgruppen und Kreation.'},
  {tag:'CIRCLE · 25+ Top-Performer',icon:<Icon.users size={22}/>,h:'Top-Performer Pool',d:'Kuratierte Community selbstständiger Top-Vertriebsleute (min. €150K Track-Record). Schließt auf Basis der gelernten Käuferprofile aus dem laufenden System ab.'},
];
function SystemB(){
  return (
    <section className="sec"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker">Das System</span><h2>Drei Dinge, die sonst getrennt laufen. Jetzt in einem System.</h2>
        <p>Marketing, Software und Vertrieb in einer Schleife — nicht in drei Silos.</p></div>
      <div className="routes">{SYS.map((s,i)=>(
        <Reveal key={s.h} style={{transitionDelay:(i*80)+'ms'}}>
          <div className="route" style={{minHeight:280}}>
            <span className="ricon">{s.icon}</span>
            <div className="pill pill-o" style={{alignSelf:'flex-start',marginTop:18}}>{s.tag}</div>
            <h3 style={{marginTop:12}}>{s.h}</h3><p>{s.d}</p>
          </div>
        </Reveal>
      ))}</div>
    </div></section>
  );
}

const STAGES=[
  {d:'Tag 30',t:'Initial Testing',p:'Erste Hypothesen zu Zielgruppe, Preis, Story laufen live. Performance-Daten werden gesammelt, erste Muster werden sichtbar.',val:42},
  {d:'Tag 90',t:'Muster erkannt',p:'Budgets wandern in performante Segmente. Top-Personas sind validiert. CIRCLE schließt mit qualifizierten Profilen ab. Anfragequalität steigt messbar.',val:71},
  {d:'Tag 180',t:'System im Flow',p:'Self-optimizing Loop: jede Besichtigung schärft Marketing, jeder Abschluss schärft Vertrieb. Conversion und Pipeline-Speed auf Bestwert.',val:96},
];
function LearningSystem(){
  const trackRef=useRef();
  const [p,setP]=useState(0);
  useEffect(()=>{let raf=0;const calc=()=>{raf=0;const el=trackRef.current;if(!el)return;const r=el.getBoundingClientRect();const vh=window.innerHeight;const H=r.height;
    // p=0 when the first card is centered in the viewport, p=1 when the last card is centered → each card animates as it passes the middle
    const startTop=vh*0.62 - H/6;const span=vh*0.17 + H*(2/3);const prog=(startTop - r.top)/span;
    setP(Math.max(0,Math.min(1,prog)));};const on=()=>{if(!raf)raf=requestAnimationFrame(calc);};on();window.addEventListener('scroll',on,{passive:true});window.addEventListener('resize',on);return ()=>{window.removeEventListener('scroll',on);window.removeEventListener('resize',on);};},[]);
  const active=Math.min(STAGES.length-1,Math.floor(p*STAGES.length*0.999));
  return (
    <section className="sec"><div className="wrap-wide">
      <div style={{display:'grid',gridTemplateColumns:'.85fr 1.15fr',gap:64,alignItems:'start'}} className="comm-grid">
        <div style={{position:'sticky',top:108}}>
          <span className="kicker">Das lernende System</span>
          <RevealText style={{fontWeight:600,letterSpacing:'-.03em',fontSize:'clamp(28px,3.4vw,44px)',marginTop:14,lineHeight:1.08}}>Mit jeder Iteration<br/><span className="accent-deep">ein Stück besser.</span></RevealText>
          <p style={{color:'var(--fg2)',fontSize:16,lineHeight:1.6,marginTop:16,maxWidth:420}}>Ein UNIO-Projekt startet nicht mit einer Kampagne, die am Tag 1 fertig ist und dann hofft. Es startet mit einem System, das mit jedem Datenpunkt besser wird.</p>
          <div style={{marginTop:26,display:'flex',alignItems:'center',gap:16}}>
            {(()=>{const lerp=(a,b,t)=>a+(b-a)*t;const sv=STAGES.map(s=>s.val);const fp=p*(sv.length-1);const i0=Math.min(sv.length-1,Math.floor(fp));const i1=Math.min(sv.length-1,i0+1);const val=Math.round(lerp(sv[i0],sv[i1],fp-i0));const R=21,C=2*Math.PI*R;return (<>
              <svg width="54" height="54" viewBox="0 0 54 54" style={{flex:'none'}}>
                <circle cx="27" cy="27" r={R} fill="none" stroke="var(--track)" strokeWidth="5.5"/>
                <circle cx="27" cy="27" r={R} fill="none" stroke="var(--orange)" strokeWidth="5.5" strokeLinecap="round" strokeDasharray={C.toFixed(1)} strokeDashoffset={(C*(1-Math.max(0.02,p))).toFixed(1)} transform="rotate(-90 27 27)" style={{transition:'stroke-dashoffset .15s linear'}}/>
              </svg>
              <div><div style={{fontWeight:600,fontSize:26,letterSpacing:'-.02em',color:'var(--orange)',fontVariantNumeric:'tabular-nums'}}>{val}</div><div style={{fontSize:12,color:'var(--fg3)'}}>Conversion-Index · {STAGES[active].d}</div></div>
            </>);})()}
          </div>
        </div>
        <div className="learn-track" ref={trackRef}>
          <div className="learn-fill" style={{height:'100%'}}><i style={{height:(p*100)+'%'}}/></div>
          <div style={{display:'flex',flexDirection:'column',gap:28}}>
            {STAGES.map((s,i)=>{const sp=Math.max(0,Math.min(1,(p-i/STAGES.length)/(1/STAGES.length)));return (
              <div key={s.d} className={"lstage"+(sp>0.05?' on':'')}>
                <span className="ldot"/>
                <div className="card" style={{padding:28,opacity:(0.45+0.55*sp).toFixed(2),transition:'opacity .15s linear'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span className="pill pill-o">{s.d}</span>
                    <span style={{fontWeight:600,fontSize:18,color:'var(--orange)',fontVariantNumeric:'tabular-nums'}}>{Math.round(sp*s.val)}</span>
                  </div>
                  <div style={{fontWeight:700,fontSize:20,marginTop:16,letterSpacing:'-.01em'}}>{s.t}</div>
                  <p style={{fontSize:14,color:'var(--fg2)',lineHeight:1.6,marginTop:10}}>{s.p}</p>
                  <div style={{marginTop:16}}><SegBar progress={sp*s.val/100} segN={26} height={12}/></div>
                </div>
              </div>
            );})}
          </div>
        </div>
      </div>
    </div></section>
  );
}

const MODEL=[
  {h:'100 % erfolgsbasiert',d:'Die Wertschöpfung beginnt mit dem ersten verkauften Objekt. Vorher fließt kein Honorar.',icon:<Icon.target size={22}/>},
  {h:'Kein Setup, keine Fixkosten',d:'Kein Onboarding-Honorar, keine Implementierungsgebühr. Wir investieren in die Validierung — nicht der Bauträger.',icon:<Icon.shield size={22}/>},
  {h:'Kein Retainer',d:'Keine monatlichen Mindestbeträge. Kein Vertrag mit Vendor-Logik. Reines Performance-Modell.',icon:<Icon.bolt size={22}/>},
];
function CommercialModel({onOpen}){
  return (
    <section className="sec" id="modell"><div className="wrap-wide">
      <div style={{display:'grid',gridTemplateColumns:'.9fr 1.1fr',gap:64,alignItems:'center'}} className="comm-grid">
        <div>
          <span className="kicker">Das Commercial Model</span>
          <h2 style={{fontWeight:600,letterSpacing:'-.03em',fontSize:'clamp(30px,3.6vw,46px)',marginTop:14,lineHeight:1.05}}>Skin in the game.</h2>
          <p style={{color:'var(--fg2)',fontSize:17,lineHeight:1.6,marginTop:16,maxWidth:460}}>Dasselbe Risiko wie der Bauträger. Dasselbe Interesse. Werbekosten zu Google und Meta laufen als reine Durchläufer ohne Aufschlag — bei besonders performanten Projekten erstatten wir auch diese zurück.</p>
          <button className="btn btn-p btn-lg" style={{marginTop:28}} onClick={onOpen}>Projekt prüfen lassen <Icon.arrow size={17}/></button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:0}}>
          {MODEL.map((m,i)=>(
            <div key={m.h} style={{display:'grid',gridTemplateColumns:'52px 1fr',gap:18,alignItems:'start',padding:'24px 0',borderTop:i?'1px solid var(--bd)':'none'}}>
              <span className="ricon" style={{width:52,height:52}}>{m.icon}</span>
              <div><div style={{fontWeight:700,fontSize:18,letterSpacing:'-.01em'}}>{m.h}</div><p style={{fontSize:14.5,color:'var(--fg2)',lineHeight:1.55,marginTop:8}}>{m.d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div></section>
  );
}

/* ---------- CONVERSION SIMULATOR ---------- */
const fmtE=(n)=>'€'+Math.round(n).toLocaleString('de-DE');
const fmtShort=(n)=>n>=1e6?('€'+(n/1e6).toFixed(n>=1e7?0:1).replace('.',',')+' Mio'):('€'+Math.round(n/1000)+'k');
function ConversionSim(){
  const [simRef,seen]=useInView(0.3);
  const [budget,setBudget]=useState(2000);
  const [units,setUnits]=useState(12);
  const cap=Math.max(1,units*0.5);
  // Klassisch: mehr Budget = mehr Streuverlust (man weiß nicht, wie man es richtig ausspielt) → Qualität kippt ab einem Punkt.
  // UNIO: Branding + Ad-Konzept senken die Lead-Kosten, Intent-Targeting skaliert sauber mit dem Budget.
  const kAnfr=budget/15, uAnfr=budget/5;
  const kQual=Math.max(1, budget*0.006 - budget*budget*0.0000011);  // steigt, kippt ab ~€2.700 wieder ab
  const uQual=budget*0.0075;                                        // skaliert sauber mit dem Budget
  const kClose=Math.min(cap,kQual*0.10), uClose=Math.min(cap,uQual*0.16);
  const moreQual=Math.max(0,uQual-kQual);
  // Abverkaufsdauer in Monaten (realistisch gedeckelt)
  const clampM=(m)=>Math.max(3,Math.min(36,Math.round(m)));
  const kMonths=clampM(units/Math.max(0.2,kClose));
  const uMonths=clampM(units/Math.max(0.2,uClose));
  const monthsSaved=Math.max(0,kMonths-uMonths);
  const ROWS=[
    {k:'Anfragen / Mt.', kd:Math.round(kAnfr), ud:Math.round(uAnfr), kv:kAnfr, uv:uAnfr},
    {k:'Qualifiziert / Mt.', kd:Math.round(kQual), ud:Math.round(uQual), kv:kQual, uv:uQual},
    {k:'Abschlüsse / Mt.', kd:kClose.toFixed(1).replace('.',','), ud:uClose.toFixed(1).replace('.',','), kv:kClose, uv:uClose, big:true},
  ];
  const Col=({win})=>(
    <div className="ccol" style={{gap:13}}>
      <div className="cch" style={{marginBottom:2}}><span style={{color:win?'var(--orange-deep)':'var(--fg3)',fontSize:13.5,fontWeight:700}}>{win?'UNIO System':'Klassische Vermarktung'}</span><span style={{fontSize:11.5,color:'var(--fg4)',fontWeight:600}}>{win?'~€5 / Lead':'~€15 / Lead'}</span></div>
      {ROWS.map((r,i)=>{const max=Math.max(r.kv,r.uv,0.001);const val=win?r.uv:r.kv;const d=win?r.ud:r.kd;return(
        <div key={r.k}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:6}}><span style={{color:'var(--fg3)'}}>{r.k}</span><span style={{fontWeight:700,fontVariantNumeric:'tabular-nums',color:win&&r.big?'var(--orange)':'var(--fg1)'}}>{d}</span></div>
          <SegBar progress={seen?Math.max(0.02,val/max):0} segN={r.big?30:24} height={r.big?26:12} muted={!win}/>
        </div>
      );})}
    </div>
  );
  return (
    <section className="sec" id="conversion"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker">Conversion-Modell</span>
        <RevealText>Gleiches Budget.<br/><span className="accent-deep">Schnellerer Abverkauf.</span></RevealText>
        <p>Mehr qualifizierte Anfragen bedeuten schnelleren Abverkauf: Branding + Ad-Konzept senken die Lead-Kosten, Intent-Targeting hebt die Lead-Qualität, transparente Vertriebssteuerung die Abschlussquote — so sind alle Einheiten messbar früher verkauft.</p></div>
      <div className="calc" ref={simRef}>
        <div className="calc-controls">
          <div className="crange">
            <label>Werbebudget / Monat <b>{fmtE(budget)}</b></label>
            <input type="range" min="500" max="5000" step="100" value={budget} onChange={e=>setBudget(+e.target.value)}/>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:11.5,color:'var(--fg4)',marginTop:8,fontVariantNumeric:'tabular-nums'}}><span>€500</span><span>€5.000</span></div>
          </div>
          <div className="crange">
            <label>Einheiten im Projekt <b>{units}</b></label>
            <input type="range" min="4" max="120" step="1" value={units} onChange={e=>setUnits(+e.target.value)}/>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:11.5,color:'var(--fg4)',marginTop:8,fontVariantNumeric:'tabular-nums'}}><span>4</span><span>120</span></div>
          </div>
          <div className="funnel-feedback" style={{marginTop:0}}>
            <span className="ficon"><Icon.trending size={18}/></span>
            <span className="ftxt">Bei <b>{fmtE(budget)}</b>/Monat: das UNIO-System macht aus demselben Budget <b>{Math.round(uQual)}</b> qualifizierte Anfragen — klassisch sind es <b>{Math.round(kQual)}</b>{budget>2800?', und mehr Budget verpufft hier sogar, weil es ohne System falsch ausgespielt wird.':'.'}</span>
          </div>
        </div>
        <div className="calc-out">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:28}}>
            <Col win={false}/><Col win={true}/>
          </div>
          <div className="calc-delta" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,alignItems:'end'}}>
            <div>
              <div className="cdlabel">Mehr qualifizierte Anfragen / Mt.</div>
              <div className="cdval" style={{color:'var(--orange)'}}>+{Math.round(moreQual)}</div>
              <div className="cdsub">aus demselben Budget — günstigere Leads, höhere Qualität.</div>
            </div>
            <div>
              <div className="cdlabel">Schnellerer Abverkauf</div>
              <div className="cdval" style={{color:'var(--orange)'}}>−{monthsSaved} Mt.</div>
              <div className="cdsub">alle {units} Einheiten in <b>{uMonths}</b> statt <b>{kMonths}</b> Monaten verkauft.</div>
            </div>
          </div>
        </div>
      </div>
      <p style={{fontSize:12,color:'var(--fg4)',marginTop:16,maxWidth:780,lineHeight:1.5}}>Conversion-Modell zur Veranschaulichung auf Basis realer Kampagnen-Benchmarks (CTR, Lead-Qualität, Abschlussquoten). Reale Ergebnisse variieren je nach Lage, Produkt und Preis.</p>
    </div></section>
  );
}

/* ---------- CASE STUDIES ---------- */
const CASES_B=[
  {img:'ecoluxe',pos:'center',tag:'Villa · Performance',title:'Villa Ecoluxe',loc:'Wien · Einzelobjekt',site:'ecoluxe.unio.at',dur:'Verkauft über Zielpreis',
   metrics:[{v:<Num end={282}/>,k:'Anfragen'},{v:<>+31<span style={{fontSize:'.6em'}}>%</span></>,k:'über Zielpreis'}],
   measures:['Eigene Projekt-Homepage gebaut','Performance-Kampagnen geschaltet','Integrativ getestet','Transparente Vertriebssteuerung'],
   note:'Angebot über €6,8 Mio statt ausgerufener €5,2 Mio.'},
  {img:'albrecht',pos:'center',tag:'8 Einheiten',title:'Das Albrecht',loc:'Townhäuser & Altbau',site:'albrecht.unio.at',dur:'61 Anfragen in 2 Wochen',
   metrics:[{v:<Num end={61}/>,k:'Anfragen'},{v:'8',k:'Einheiten'}],
   measures:['Eigene Projekt-Homepage gebaut','Performance-Kampagnen geschaltet','Integrativ getestet','Transparente Vertriebssteuerung']},
  {img:'beheim',pos:'center',tag:'2 Penthäuser',title:'Penthouse Beheim',loc:'Wien · €1,7 Mio',site:'beheim.unio.at',dur:'27 Anfragen in 2 Wochen',
   metrics:[{v:<Num end={27}/>,k:'Anfragen'},{v:'2',k:'Penthäuser'}],
   measures:['Eigene Projekt-Homepage gebaut','Performance-Kampagnen geschaltet','Integrativ getestet','Transparente Vertriebssteuerung']},
  {img:'obenzwei',pos:'center',tag:'Penthouse · 2. Bezirk',title:'Obenzwei',loc:'Wien · 2. Bezirk',site:'obenzwei.unio.at',dur:'25 Anfragen in 1 Woche',
   metrics:[{v:<Num end={25}/>,k:'hochqual. Anfragen / Woche'},{v:'€1,3 Mio',k:'Angebotspreis'}],
   measures:['Eigene Projekt-Homepage gebaut','Performance-Kampagnen geschaltet','Integrativ getestet','Transparente Vertriebssteuerung']},
  {img:'penthouse',pos:'center',tag:'Turnaround',title:'Penthouse €4 Mio',loc:'Wien · eigenes Projekt',site:'',dur:'40 Anfragen nach Übernahme',
   metrics:[{v:<Num end={40}/>,k:'Anfragen'},{v:'€4 Mio',k:'Preisklasse'}],
   measures:['Performance-Kampagnen inkl. Click-Funnel','Integrativ getestet','Transparente Vertriebssteuerung']},
];
function CaseStudiesB(){
  return (
    <section className="sec ground" id="cases"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker">Proof · Live im Markt</span>
        <RevealText>Bewiesen im Markt.<br/><span className="accent-deep">Nicht am Papier.</span></RevealText>
        <p>Echte Projekte, echte Zahlen. Jede Vermarktung mit eigener Story, eigener Homepage und datenbasierter Vertriebssteuerung.</p></div>
      <div className="cases">{CASES_B.map((c,i)=>(
        <Reveal key={c.title} style={{transitionDelay:(i%3*70)+'ms'}}>
          <CaseCard img={IMG[c.img]} pos={c.pos} tag={c.tag} title={c.title} loc={c.loc} site={c.site} dur={c.dur} metrics={c.metrics} measures={c.measures}/>
        </Reveal>
      ))}</div>
      <div style={{marginTop:22,display:'flex',gap:14,alignItems:'center',flexWrap:'wrap',color:'var(--fg3)',fontSize:13.5}}>
        <Icon.spark size={16}/> Bei Villa Ecoluxe: Angebot über €6,8 Mio statt ausgerufener €5,2 Mio.
      </div>
    </div></section>
  );
}

/* ---------- FUNNEL ---------- */
const B_UNITS=[{v:'1-10',l:'1 – 10 Einheiten'},{v:'11-30',l:'11 – 30 Einheiten'},{v:'31-80',l:'31 – 80 Einheiten'},{v:'80+',l:'80+ Einheiten'}];
function FunnelB({onClose}){
  const [step,setStep]=useState(0);
  const [d,setD]=useState({typ:null,ort:'',units:null,phase:null,ziele:[],name:'',firma:'',email:'',tel:''});
  const total=5;
  const set=(k,v)=>setD(s=>({...s,[k]:v}));
  const next=()=>setStep(s=>Math.min(total,s+1));
  const back=()=>setStep(s=>Math.max(0,s-1));
  const canNext=[
    !!d.typ,
    d.ort.trim().length>1 && !!d.units,
    !!d.phase,
    d.ziele.length>0,
    d.name.trim()&&/.+@.+\..+/.test(d.email),
  ][step];

  if(step===total){
    return (
      <FunnelShell title="Projekt-Check" step={total} total={total} progress={100} onClose={onClose}>
        <div className="funnel-done">
          <div className="ring-wrap"><Ring size={84} w={9} color="var(--orange)" track="var(--track)"/></div>
          <h3>Danke, {d.name.split(' ')[0]||'wir melden uns'}!</h3>
          <p>Unser Akquise-Team prüft dein Projekt und meldet sich innerhalb von 48 Stunden mit einer ersten datenbasierten Einschätzung. 100 % unverbindlich, 100 % erfolgsbasiert.</p>
          <div className="summary">
            <div className="srow"><span className="sk">Projektart</span><span className="sv">{d.typ}</span></div>
            <div className="srow"><span className="sk">Standort</span><span className="sv">{d.ort}</span></div>
            <div className="srow"><span className="sk">Einheiten</span><span className="sv">{d.units}</span></div>
            <div className="srow"><span className="sk">Phase</span><span className="sv">{d.phase}</span></div>
            <div className="srow"><span className="sk">Ziel</span><span className="sv">{d.ziele.join(', ')}</span></div>
          </div>
          <div style={{display:'flex',gap:10,justifyContent:'center',marginTop:24}}>
            <button className="btn btn-p btn-lg" onClick={onClose}>Schließen</button>
            <a className="btn btn-g btn-lg" href={APP_URL} target="_blank" rel="noopener">Dashboard ansehen <Icon.arrowUR size={15}/></a>
          </div>
        </div>
      </FunnelShell>
    );
  }

  return (
    <FunnelShell title="Projekt-Check" step={step+1} total={total} progress={(step/total)*100} onClose={onClose}
      footer={<div className="funnel-foot">
        {step>0 && <button className="btn btn-g back" onClick={back}>Zurück</button>}
        <button className="btn btn-p btn-lg" style={{marginLeft:step>0?0:'auto'}} disabled={!canNext} onClick={next}>
          {step===total-1?'Anfrage senden':'Weiter'} <Icon.arrow size={16}/>
        </button>
      </div>}>
      <div className="funnel-body">
        {step===0 && <>
          <h3>Um welche Art Projekt geht es?</h3>
          <p className="fsub">So ordnen wir die richtige Persona-Datenbank und Vergleichsprojekte zu.</p>
          <OptionList value={d.typ} onChange={v=>set('typ',v)} options={[
            {v:'Wohnbau',l:'Wohnbau',d:'Eigentums- oder Vorsorgewohnungen'},
            {v:'Gewerbe',l:'Gewerbe / Anlage',d:'Büro, Retail, Anlageobjekte'},
            {v:'Mixed-Use',l:'Mixed-Use',d:'Wohnen + Gewerbe kombiniert'},
            {v:'Sanierung',l:'Sanierung / Bestand',d:'Revitalisierung, Dachausbau'},
          ]}/>
        </>}
        {step===1 && <>
          <h3>Standort & Größe</h3>
          <p className="fsub">Wo entsteht das Projekt — und wie viele Einheiten umfasst es?</p>
          <div className="field" style={{marginTop:20}}><label>Standort (Ort / Bezirk)</label>
            <input className="input" placeholder="z. B. Wien 1020, Korneuburg…" value={d.ort} onChange={e=>set('ort',e.target.value)}/></div>
          <OptionList value={d.units} onChange={v=>set('units',v)} options={B_UNITS}/>
          {d.units && <div className="funnel-feedback"><span className="ficon"><Icon.spark size={18}/></span>
            <span className="ftxt">Bei <b>{d.units} Einheiten</b> testen wir dein Projekt vorab live an <b>mehreren tausend Käuferprofilen</b> — und priorisieren die Personas mit der höchsten Kaufabsicht.</span></div>}
        </>}
        {step===2 && <>
          <h3>In welcher Phase befindet sich das Projekt?</h3>
          <p className="fsub">Je früher, desto mehr kann NOVA vor fixierten Entscheidungen validieren.</p>
          <OptionList value={d.phase} onChange={v=>set('phase',v)} options={[
            {v:'Grundstück / Idee',l:'Grundstück / Idee'},
            {v:'In Planung',l:'In Planung'},
            {v:'In Bau',l:'In Bau'},
            {v:'Im Abverkauf',l:'Im Abverkauf'},
          ]}/>
          {d.phase && <div className="funnel-feedback good"><span className="ficon"><Icon.check size={18} sw={2.5}/></span>
            <span className="ftxt">{d.phase==='Grundstück / Idee'||d.phase==='In Planung'
              ? <>Perfekter Zeitpunkt: <b>NOVA validiert Pricing, Grundrisse und Story vor dem Baustart</b> — bevor Budget und Produkt fixiert sind.</>
              : <>Auch jetzt holen wir messbar mehr heraus: <b>LENS macht Status, Tempo und Abschlusswahrscheinlichkeit pro Einheit transparent.</b></>}</span></div>}
        </>}
        {step===3 && <>
          <h3>Was ist euer Hauptziel?</h3>
          <p className="fsub">Mehrfachauswahl möglich — wir gewichten das System entsprechend.</p>
          <OptionList multi value={d.ziele} onChange={v=>set('ziele',v)} options={[
            {v:'Schnellerer Abverkauf',l:'Schnellerer Abverkauf'},
            {v:'Höherer erzielbarer Preis',l:'Höherer erzielbarer Preis'},
            {v:'Validierung vor dem Bau',l:'Validierung vor dem Bau'},
            {v:'Volle Transparenz & Steuerung',l:'Volle Transparenz & Steuerung'},
          ]}/>
        </>}
        {step===4 && <>
          <h3>Wohin dürfen wir die Einschätzung schicken?</h3>
          <p className="fsub">Unverbindlich. Wir melden uns innerhalb von 48 Stunden.</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginTop:20}}>
            <div className="field" style={{margin:0}}><label>Name *</label><input className="input" value={d.name} onChange={e=>set('name',e.target.value)}/></div>
            <div className="field" style={{margin:0}}><label>Unternehmen</label><input className="input" value={d.firma} onChange={e=>set('firma',e.target.value)}/></div>
            <div className="field" style={{margin:0}}><label>E-Mail *</label><input className="input" type="email" value={d.email} onChange={e=>set('email',e.target.value)}/></div>
            <div className="field" style={{margin:0}}><label>Telefon</label><input className="input" value={d.tel} onChange={e=>set('tel',e.target.value)}/></div>
          </div>
        </>}
      </div>
    </FunnelShell>
  );
}

function ProofBand(){
  const ref=useRef();
  useEdgeRadius(ref,44);
  return (
    <section style={{padding:'0'}}>
      <div className="photo-band" ref={ref}>
        <Photo src={IMG.albrecht_dusk} pos="center" overlay="linear-gradient(90deg,rgba(14,15,17,.62),rgba(14,15,17,.12) 60%,rgba(14,15,17,.4))"/>
        <div className="pb-cap">
          <div style={{color:'#fff',maxWidth:480}}>
            <span className="pill pill-w" style={{marginBottom:14}}>Live vermarktet</span>
            <div style={{fontWeight:600,fontSize:'clamp(24px,3vw,38px)',letterSpacing:'-.02em',lineHeight:1.08,textShadow:'0 2px 20px rgba(0,0,0,.4)'}}>Premium-Projekte, datenbasiert zum Abverkauf geführt.</div>
          </div>
          <div style={{display:'flex',gap:36,color:'#fff'}}>
            <div><div style={{fontWeight:600,fontSize:'clamp(26px,3vw,40px)',letterSpacing:'-.03em'}}>300<span className="accent">+</span></div><div style={{fontSize:12.5,color:'rgba(255,255,255,.8)'}}>Mio € Volumen</div></div>
            <div><div style={{fontWeight:600,fontSize:'clamp(26px,3vw,40px)',letterSpacing:'-.03em'}}>1 Mrd</div><div style={{fontSize:12.5,color:'rgba(255,255,255,.8)'}}>Reichweite</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTAB({onOpen}){
  return (
    <section className="sec ground"><div className="wrap-wide">
      <div className="cta">
        <div className="ringbg"><Ring size={260} w={9} color="var(--orange)"/></div>
        <RevealText>Von validierter Story zu<br/><span className="accent">steuerbarem Abverkauf.</span></RevealText>
        <p>UNIO macht aus Vermarktung ein steuerbares System — mit Daten, Technologie und Vertriebspower. 100 % erfolgsbasiert.</p>
        <div className="row"><button className="btn btn-p btn-xl" onClick={onOpen}>Jetzt Projekt prüfen lassen <Icon.arrow size={18}/></button></div>
      </div>
    </div></section>
  );
}

function MetricsBand(){
  return (
    <section className="sec-sm ground"><div className="wrap-wide">
      <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:16,marginBottom:24}}>
        <div><span className="kicker">Live aus laufenden Kampagnen</span>
          <div style={{fontWeight:600,fontSize:'clamp(22px,2.6vw,30px)',letterSpacing:'-.02em',marginTop:10}}>Performance, die man messen kann</div></div>
        <span className="live"><span className="pulse"/>LIVE · anonymisiert</span>
      </div>
      <div className="metrics-band">
        <div className="mtile"><div className="mk">Ø Cost / Lead</div><div className="mv">€<Num end={3.32} dec={2}/></div><Sparkline data={[7,6,5.5,4.8,4.2,3.8,3.4,3.3]} h={30} accent="var(--orange)"/></div>
        <div className="mtile"><div className="mk">Ø Klickrate</div><div className="mv"><Num end={2.47} dec={2}/>%</div><Sparkline data={[1.4,1.7,1.9,2.0,2.2,2.3,2.47]} h={30}/></div>
        <div className="mtile" style={{alignItems:'center',textAlign:'center'}}><div className="mk" style={{alignSelf:'flex-start'}}>Lead-Qualität</div><Gauge value={73} size={96} label="Ø Intent"/></div>
        <div className="mtile"><div className="mk" style={{marginBottom:6}}>Leads mit hoher Kaufabsicht</div><CompactSeg value={41} note="Intent-Score ≥ 75 · bereit für den nächsten Schritt"/></div>
      </div>
      <p style={{fontSize:12,color:'var(--fg4)',marginTop:14}}>Anonymisierte Kennzahlen aus realen UNIO-Kampagnen. Projektnamen vertraulich.</p>
    </div></section>
  );
}

function LearningLoopB(){
  return (
    <section className="sec ground"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker">Testen. Lernen. Optimieren. Verkaufen.</span>
        <h2>Aus ungeordneten Daten wird eine Richtung.</h2>
        <p>Am Anfang steht eine Punktwolke ohne Muster. Mit jedem Durchlauf führt das System die Daten zusammen, erkennt die Richtung und schärft sie weiter — bis aus Streuung ein verlässlicher Trend wird, der zu immer besseren Ergebnissen führt.</p></div>
      <DataStory/>
    </div></section>
  );
}

function LensSectionB(){
  const nav=[{items:[['Dashboard','chart'],['Immobilien','building'],['Projekte','layers'],['Kampagnen','target'],['Analyse','trending']]},{h:'Vertrieb',items:[['Pipeline','users'],['Angebote','euro'],['Kalender','clock']]}];
  const kpis=[
    {k:'Anfragen · 30 T',v:'182',s:'+31,8 % vs. Vormonat',icon:'trending',spark:[30,38,34,48,44,55,60,66,72,80]},
    {k:'Ø Intent Score',v:'73',s:'pro qualifiziertem Lead',icon:'gauge',col:'var(--lx-gold)',spark:[40,46,44,52,50,58,60,62,68,73]},
    {k:'Verkaufsstand',v:'42 %',s:'8 von 19 Einheiten',icon:'check',spark:[10,14,18,22,28,30,34,38,40,42]},
    {k:'Pipeline',v:'€84 Mio',s:'142 Einheiten gesamt',icon:'euro',col:'var(--lx-grey)',spark:[50,54,52,60,58,66,70,74,80,84]},
    {k:'Ø Cost / Lead',v:'€5,40',s:'−34 % durch Optimierung',icon:'target',col:'var(--lx-gold)',spark:[80,74,70,64,60,55,50,46,44,40]},
    {k:'Besichtigungen',v:'46',s:'geplant & durchgeführt',icon:'home',spark:[12,16,14,22,26,30,34,38,42,46]},
  ];
  const wide={t:'Nachfrageverlauf',s:'Anfragen, Besichtigungen & Angebote · 30 Tage',legend:[{c:'var(--orange)',l:'Anfragen'},{c:'var(--lx-gold)',l:'Besichtigungen'},{c:'var(--lx-grey)',l:'Angebote'}]};
  const right=[
    <div className="lx-card" key="d">
      <div className="lx-ct">Verkaufsstand</div><div className="lx-cs">Einheiten nach Status</div>
      <div className="lx-smixwrap">
        <div className="lx-smix">
          <div className="lx-srow"><span style={{display:'flex',alignItems:'center',gap:8}}><i style={{width:9,height:9,borderRadius:3,background:'var(--orange)'}}/>Verkauft</span><span className="n">38</span></div>
          <div className="lx-srow"><span style={{display:'flex',alignItems:'center',gap:8}}><i style={{width:9,height:9,borderRadius:3,background:'#FFC24D'}}/>Reserviert</span><span className="n">21</span></div>
          <div className="lx-srow"><span style={{display:'flex',alignItems:'center',gap:8}}><i style={{width:9,height:9,borderRadius:3,background:'var(--lx-gold)'}}/>Verfügbar</span><span className="n">83</span></div>
        </div>
        <SegDonut segs={[{c:'var(--orange)',v:38},{c:'#FFC24D',v:21},{c:'var(--lx-gold)',v:83}]} center="142" label="EINHEITEN"/>
      </div>
    </div>,
    <div className="lx-card" key="f">
      <div className="lx-ct">Marketing-Funnel</div><div className="lx-cs">Lead → Angebot</div>
      <div style={{marginTop:14}}><MarketingFunnel rows={[{l:'Leads',v:945,p:'100 %'},{l:'Besichtigungswunsch',v:73,p:'7,7 %'},{l:'Besichtigung',v:46,p:'4,9 %'},{l:'Angebote',v:25,p:'2,6 %'}]} total="2,65 %"/></div>
    </div>,
  ];
  const board=<LensBoard title="Projekt-Cockpit" sub="Live-Status Ihres Projekts — Nachfrage, Einheiten, Pipeline." nav={nav} active="Dashboard"
    banner={{chips:[{t:'ink',l:'Projektsicht'},{t:'org',l:'Das Albrecht'},{t:'gold',l:'Zeitraum: 30 Tage'}],h:'Vermarktungs-Performance',p:'Aufgaben, Kampagnen-Daten und Vertrieb in einer Sicht — von der ersten Anfrage bis zum verkauften Objekt.'}}
    kpis={kpis} wide={wide} right={right}
    extra={[{cls:'lx-channel',node:<ChannelBars/>},{cls:'lx-units',node:<UnitTable/>},{cls:'lx-viewing',node:<ViewingTable/>}]}/>;
  const steps=[
    {k:'Überblick',t:'Ihr Projekt in einem Cockpit',p:'Jede Anfrage, jede Besichtigung, jeder Abschluss — live und an einem Ort. Volle Transparenz statt Blackbox.',sel:null},
    {k:'Kennzahlen',t:'KPIs in Echtzeit',p:'Anfragen, Intent-Score, Verkaufsstand und Cost-per-Lead — aktualisiert mit jeder Interaktion.',sel:'.lx-kpis',pad:14},
    {k:'Kanäle',t:'Welcher Kanal liefert?',p:'Volumen und Cost-per-Lead je Kanal — Budget wandert dorthin, wo es messbar performt.',sel:'.lx-channel'},
    {k:'Einheiten',t:'Nachfrage pro Einheit',p:'Status (Heiß/Reserviert/Cold), Nachfrage, Leads und A/B/C-Qualität — für jede einzelne Einheit.',sel:'.lx-units'},
    {k:'Live-Besichtigungen',t:'Wer kauft als Nächstes?',p:'Laufende Besichtigungen mit Intent-Score und Abschlusswahrscheinlichkeit — in Echtzeit.',sel:'.lx-viewing'},
    {k:'Verkaufsstand',t:'Vom Lead zum Abschluss',p:'Verkaufsstand pro Einheit und der vollständige Marketing-Funnel — jederzeit nachvollziehbar.',sel:'.lx-rcol'},
  ];
  return <LensScrollSection id="lens" kicker="LENS · Dashboard & Data Intelligence" h="Ihr Projekt, live im Blick."
    sub="Schon vor dem Start bekommen Sie einen Vorgeschmack: Scrollen Sie durch Ihr LENS-Dashboard — die Kamera führt Sie durch die wichtigsten Bereiche."
    board={board} steps={steps} cta="Echtes Dashboard öffnen"/>;
}

function App(){
  const [open,setOpen]=useState(false);
  const openF=()=>setOpen(true);
  return <>
    <Nav active="bautraeger" cta={{label:"Projekt prüfen lassen", onClick:openF}}/>
    <HeroB onOpen={openF}/>
    <div className="ticker" style={{borderTop:'1px solid var(--bdf)',borderBottom:'1px solid var(--bdf)'}}><Logos/></div>
    <ProblemB/>
    <SystemB/>
    <MetricsBand/>
    <ConversionSim/>
    <LensSectionB/>
    <LearningSystem/>
    <LearningLoopB/>
    <ProofBand/>
    <CaseStudiesB/>
    <CommercialModel onOpen={openF}/>
    <CTAB onOpen={openF}/>
    <Footer/>
    {open && <FunnelB onClose={()=>setOpen(false)}/>}
  </>;
}
