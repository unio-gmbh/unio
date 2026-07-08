/* ===================== MAKLER / CIRCLE ===================== */

function HeroM({onOpen}){
  const ref=useRef();
  useHeroFx(ref);
  return (
    <section className="hero" ref={ref}>
      <HeroBg/>
      <div className="hero-orb ring-spin" style={{right:'-90px',top:'2%'}}><Ring size={340} w={2.5} color="rgba(255,170,9,.4)"/></div>
      <div className="wrap-wide hero-in">
        <div className="hero-copy">
          <span className="kicker">CIRCLE · Agent-first</span>
          <RevealText tag="h1" style={{fontSize:'clamp(38px,5vw,64px)'}}>Agent-first<br/><span className="accent">beginnt hier.</span></RevealText>
          <p className="sub" style={{maxWidth:540}}>Werde Teil der Bewegung und Mitgesellschafter, bau deine Marke auf, profitiere von ständigem Dealflow und unvergleichbaren Konditionen — auf der Plattform und in der Community, die die Immobilienbranche umkrempelt.</p>
          <div className="hero-cta">
            <button className="btn btn-p btn-xl" onClick={onOpen}>Als CIRCLE Partner bewerben <Icon.arrow size={18}/></button>
            <a className="btn btn-g btn-xl" href="#rechner">Was bleibt für dich?</a>
          </div>
          <div className="statline" style={{marginTop:40}}>
            <div className="stat"><div className="v">100<span className="accent">%</span></div><div className="k">Provision ab €150K p.a.</div></div>
            <div className="stat"><div className="v">49<span className="accent">%</span></div><div className="k">Anteile an Top-Performer</div></div>
            <div className="stat"><div className="v">25<span className="accent">+</span></div><div className="k">Partner im Netzwerk</div></div>
          </div>
        </div>
        <div className="hero-photo">
          <Photo src={IMG.lifestyle_wine} pos="center" overlay="linear-gradient(180deg,rgba(14,15,17,0) 50%,rgba(14,15,17,.5) 100%)"/>
          <span className="pill pill-w hp-tag">Die Community</span>
          <div className="hp-cap"><div style={{fontWeight:700,fontSize:18,letterSpacing:'-.01em',textShadow:'0 2px 14px rgba(0,0,0,.4)'}}>Unternehmer. Nicht Einzelkämpfer.</div></div>
        </div>
      </div>
    </section>
  );
}

const PROBSM=[
  ['01','Du arbeitest. Andere verdienen.','Du akquirierst, verhandelst, schließt ab — doch ein großer Teil deiner Provision bleibt beim Arbeitgeber. Kein Eigenkapital, keine Beteiligung.'],
  ['02','Keine eigene Brand.','Dein Name steht hinter dem Agentur-Logo. Du baust Reichweite für eine Marke auf, die dir nicht gehört. Dein Marktwert bleibt begrenzt.'],
  ['03','Du arbeitest im System. Nicht am System.','Langsame Prozesse, Medienbrüche, manuelle Abläufe. Zeit, die du für Deals brauchst, geht für Administration verloren. Du verwaltest, statt zu skalieren.'],
];
function ProblemM(){
  return (
    <section className="sec ink"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker on-dark">Das Problem</span>
        <RevealText>Du arbeitest hart.<br/><span className="accent">Aber baust nichts Eigenes auf.</span></RevealText>
        <p>Egal ob angestellt, als Kooperationspartner oder eigenständig — das alte System deckelt deinen Erfolg, kostet dich deine Marke und gibt dir keinen echten Unternehmenswert.</p></div>
      <div className="probs">{PROBSM.map(([n,t,d],i)=>(
        <Reveal key={n} style={{transitionDelay:(i*80)+'ms'}}><div className="prob"><div className="pn">{n}</div><h4>{t}</h4><p>{d}</p></div></Reveal>
      ))}</div>
    </div></section>
  );
}

const PILLARS=[
  {i:'01',h:'Ownership statt Abhängigkeit',p:'CIRCLE dreht das alte Margensystem um: Deine Provision gehört dir — und über das UNIO Share-Modell partizipierst du am Netzwerk, das du selbst mit aufbaust.',m:[['100%','Provision ab €150K p.a.'],['85%','Provision bis €150K p.a.']]},
  {i:'02',h:'Enablement durch Infrastruktur & Tech',p:'Statt Kontrolle: Enablement. Digitales Backoffice, KI-Portfoliomanagement, immersive Exposés, Smart Matching, intelligentes Lead Management, digitales Closing und KI-Telefonassistent.',m:[['8+','Tech-Module'],['~80%','weniger Admin']]},
  {i:'03',h:'Unternehmertum mit Community-Power',p:'Du bleibst unabhängig und baust deine eigene Marke auf — aber nicht allein. Austausch, Standards, Zusammenarbeit und gemeinsames Momentum statt Einzelkämpfer-Modus.',m:[['20%','Gewinn-Ausschüttung'],['49%','Share an Top-Performer']]},
  {i:'04',h:'Projekt-Pipeline statt Zufalls-Dealflow',p:'Das UNIO-Akquise-Team holt exklusive, kuratierte Projekte. Alle Projekte werden aufbereitet, vom Inhouse-Marketing ins richtige Licht gerückt — und du bekommst vorqualifizierte Leads.',m:[['exklusiv','kuratierter Dealflow'],['25%','passiv aus Recruits']]},
  {i:'05',h:'Deine Marketing-Superpower',p:'CIRCLE ist für Makler, die nicht „mitlaufen" wollen. Individuelle Markenstrategie, Personal Branding und volle Content-Produktion unter deinem Namen.',m:[['3','Kurzvideos / Monat'],['10','Fotos / Monat']]},
];
function WhatIf(){
  const wrapRef=useRef();
  const p=useStickyProgress(wrapRef);
  const TOK=[{w:"Was"},{w:"wäre,"},{w:"wenn"},{w:"der"},{w:"Makler",acc:true},{w:"im",acc:true},{w:"Zentrum",acc:true},{w:"steht?"}];
  const N=TOK.length;
  const ease=(t)=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
  const reveal=Math.min(1,p/0.5);
  const exit=ease(Math.max(0,Math.min(1,(p-0.66)/0.32)));
  const qStyle={transform:`translateY(${(-exit*64).toFixed(1)}px) scale(${(1-exit*0.09).toFixed(3)})`,opacity:(1-exit*0.92).toFixed(3)};
  return (
    <section className="whatif">
      <div className="whatif-scroll" ref={wrapRef} style={{height:'200vh'}}>
        <div className="whatif-sticky">
          <div className="wrap-wide" style={{textAlign:'center'}}>
            <span className="kicker" style={{display:'block',marginBottom:26,opacity:(1-exit).toFixed(2)}}>Die Frage</span>
            <h2 className="whatif-q" style={qStyle}>
              {TOK.map((t,i)=>(
                <React.Fragment key={i}>
                  <span className={"wq-w"+(t.acc?" acc":"")} style={{opacity:(0.10+0.90*Math.max(0,Math.min(1,reveal*(N+1.5)-i))).toFixed(3)}}>{t.w}</span>
                  {" "}
                </React.Fragment>
              ))}
            </h2>
            <div className="whatif-cue" style={{opacity:Math.max(0,Math.min(1,(reveal-0.8)*6-exit*4)).toFixed(2)}}>Die Antwort <span className="ch"><Icon.arrow size={14}/></span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Solution(){
  const ref=useRef();
  const [p,setP]=useState(0);
  useEffect(()=>{
    let raf=0;
    const calc=()=>{raf=0;const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const vh=window.innerHeight;const prog=-r.top/vh;setP(Math.max(0,prog));};
    const on=()=>{if(!raf)raf=requestAnimationFrame(calc);};on();
    window.addEventListener('scroll',on,{passive:true});window.addEventListener('resize',on);
    return ()=>{window.removeEventListener('scroll',on);window.removeEventListener('resize',on);};
  },[]);
  const TOK=[{w:"Nicht"},{w:"die"},{w:"Agentur."},{w:"Nicht"},{w:"das"},{w:"Portal."},{w:"Du.",acc:true,br:true}];
  const N=TOK.length;
  const reveal=Math.min(1,p/0.42);
  const bg=Math.max(0,Math.min(1,(p-0.12)/0.5));
  const lerp=(a,b)=>Math.round(a+(b-a)*bg);
  const bgc=`rgb(${lerp(244,255)},${lerp(244,255)},${lerp(242,255)})`;
  const subOp=Math.max(0,Math.min(1,(reveal-0.7)*4)).toFixed(2);
  return (
    <section className="sol" id="modell" ref={ref} style={{background:bgc}}>
      <div className="sol-pin" style={{background:bgc}}>
        <div className="wrap-wide sol-head">
          <span className="kicker" style={{display:'block',marginBottom:16,opacity:Math.min(1,reveal*2).toFixed(2)}}>Die Antwort</span>
          <h2 className="sol-q">
            {TOK.map((t,i)=>(
              <React.Fragment key={i}>
                <span className={"wq-w"+(t.acc?" acc":"")} style={{opacity:(0.10+0.90*Math.max(0,Math.min(1,reveal*(N+1.5)-i))).toFixed(3)}}>{t.w}</span>
                {t.br ? <br/> : " "}
              </React.Fragment>
            ))}
          </h2>
          <p className="sol-sub" style={{opacity:subOp}}>Fünf Hebel, die aus „angestellt sein" echtes Mitunternehmertum machen.</p>
        </div>
      </div>
      <div className="wrap-wide sol-listwrap">
        <div className="pillars sol-list">{PILLARS.map((pl,i)=>(
          <Reveal key={pl.i} style={{transitionDelay:(i*80)+'ms'}}><div className="pillar">
            <div className="pi">{pl.i}</div>
            <div><h4>{pl.h}</h4><p>{pl.p}</p></div>
            <div className="pmetric">{pl.m.map(([v,k])=><div className="mm" key={k}><div className="mv">{v}</div><div className="mk">{k}</div></div>)}</div>
          </div></Reveal>
        ))}</div>
      </div>
    </section>
  );
}

function Values(){
  const v=['Fairness','Empowerment','Technologie','Ownership'];
  return (
    <section className="sec-sm"><div className="wrap-wide" style={{display:'flex',gap:'clamp(20px,4vw,56px)',justifyContent:'space-between',flexWrap:'wrap'}}>
      {v.map((x)=>(
        <div key={x} style={{display:'flex',alignItems:'center',gap:14,flex:'1 1 200px',padding:'8px 0'}}>
          <IconMark size={30}/>
          <span style={{fontWeight:600,fontSize:'clamp(18px,2vw,24px)',letterSpacing:'-.01em'}}>{x}</span>
        </div>
      ))}
    </div></section>
  );
}

const COMP=[
  ['Provisionsaufteilung','Splits oft mit Gebühren oder Bedingungen','Bis 100 %, unabhängig vom Umsatz'],
  ['Eigene Marke','Bleibt meist außen vor','UNIO baut deine Brand für dich auf'],
  ['Dealflow','Zufällig, Portfolios bei Agenturen','Kontinuierlich & kuratiert'],
  ['Infrastruktur','Fragmentiert und veraltet','Integrierte High-End-Plattform'],
  ['Unternehmenswert','Kein Anteil am Wachstum','Echte Unternehmensbeteiligung'],
  ['Passives Einkommen','Keine Quellen','Referral + Gewinn-Ausschüttung'],
];
function Compare(){
  return (
    <section className="sec"><div className="wrap-wide">
      <div className="sec-head center"><span className="kicker">Der Unterschied</span><h2>Der klassische Makler vs. UNIO CIRCLE</h2></div>
      <div className="compare">
        <div className="crow head"><div className="cl">&nbsp;</div><div className="cc">Klassischer Makler</div><div className="cc unio">UNIO CIRCLE</div></div>
        {COMP.map(([l,a,b])=>(
          <div className="crow" key={l}>
            <div className="cl">{l}</div>
            <div className="cc" style={{color:'var(--fg3)'}}>{a}</div>
            <div className="cc unio"><span style={{display:'inline-flex',alignItems:'center',gap:8,justifyContent:'center'}}><Icon.check size={16} sw={2.5}/> {b}</span></div>
          </div>
        ))}
      </div>
    </div></section>
  );
}

/* ---------- DREI FRAGEN ---------- */
const QS=[
  ['Verdienst du, was deine Leistung wert ist?','Du trägst unternehmerisches Risiko — aber ein fixer Anteil deiner Provision geht dauerhaft an die Agentur.'],
  ['Baust du Unternehmenswert auf — oder Provisionen?','Ohne Beteiligung bleibt am Ende deiner Karriere kein Asset, das dir gehört. Nur Umsatz, der durchläuft.'],
  ['Gehört deine Marke dir — oder deinem Arbeitgeber?','Du baust Reichweite und Vertrauen auf. Für eine Marke, die nicht deinen Namen trägt.'],
];
function ThreeQuestions(){
  return (
    <section className="sec"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker">Warum du hier bist</span>
        <RevealText>Drei Fragen.<br/><span className="accent-deep">Wenn du auch nur bei einer zögerst — lies weiter.</span></RevealText></div>
      <div className="probs">{QS.map(([q,a],i)=>(
        <Reveal key={i} style={{transitionDelay:(i*80)+'ms'}}>
          <div className="prob" style={{borderTopColor:'var(--orange)'}}>
            <div className="pn">0{i+1}</div><h4>{q}</h4><p>{a}</p>
          </div>
        </Reveal>
      ))}</div>
    </div></section>
  );
}

/* ---------- COMMISSION CALCULATOR ---------- */
const MODELS=[
  {k:'Angestellt',keep:0.50,fix:0,note:'Du behältst rund die Hälfte deiner Provision — den Rest behält der Arbeitgeber.',costNote:'Tools & Büro im Gehalt'},
  {k:'Kooperationspartner',keep:0.72,fix:12000,note:'Bessere Splits, aber mit Gebühren, Tool- und Bürokosten obendrauf.',costNote:'~€1.000/Mt Kosten'},
  {k:'Eigenständig',keep:1.0,fix:57060,note:'100 % deiner Provision — aber Infrastruktur (Büro, Daten, Portale, Tools) kostet dich rund €4.755 im Monat.',costNote:'~€4.755/Mt Eigenbau'},
];
const fmtEUR=(n)=>'€'+Math.round(n).toLocaleString('de-DE');
function CommissionCalc({onOpen}){
  const [calcRef,seen]=useInView(0.3);
  const [gross,setGross]=useState(220000);
  const [mi,setMi]=useState(0);
  const m=MODELS[mi];
  const UNIO_INFRA=599*12;
  const TIER=150000;
  const unioGross=Math.min(gross,TIER)*0.85 + Math.max(0,gross-TIER)*1.0;
  const effSplit=gross>0?unioGross/gross:0.85;
  const tradNet=Math.max(0,gross*m.keep - m.fix);
  const unioNet=unioGross - UNIO_INFRA;
  const delta=unioNet-tradNet;
  const max=Math.max(tradNet,unioNet,1);
  return (
    <section className="sec ground" id="rechner"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker">Der Provisions-Rechner</span>
        <h2>Rechne dein Modell gegen UNIO CIRCLE.</h2>
        <p>Stell deinen Jahres-Provisionsumsatz ein und vergleiche, was am Ende wirklich bei dir bleibt — heute vs. mit CIRCLE.</p></div>
      <div className="calc" ref={calcRef}>
        <div className="calc-controls">
          <div className="crange">
            <label>Dein Provisionsumsatz / Jahr <b>{fmtEUR(gross)}</b></label>
            <input type="range" min="150000" max="600000" step="10000" value={gross} onChange={e=>setGross(+e.target.value)}/>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:11.5,color:'var(--fg4)',marginTop:8,fontVariantNumeric:'tabular-nums'}}><span>€150k · Zugang</span><span>€600k</span></div>
          </div>
          <div>
            <div style={{fontSize:13.5,fontWeight:600,color:'var(--fg2)',marginBottom:12}}>Dein heutiges Modell</div>
            <div className="seg">{MODELS.map((x,i)=>(
              <button key={x.k} className={i===mi?'on':''} onClick={()=>setMi(i)}>{x.k}</button>
            ))}</div>
            <p style={{fontSize:13,color:'var(--fg3)',lineHeight:1.55,marginTop:14}}>{m.note}</p>
          </div>
          <div className="funnel-feedback good" style={{marginTop:0}}>
            <span className="ficon"><Icon.check size={18} sw={2.5}/></span>
            <span className="ftxt">CIRCLE-Zugang ab <b>€150K</b> Track-Record. Dein Split ist gestaffelt: die ersten <b>€150K zu 85 %</b>, jeder weitere Euro zu <b>100 %</b> — im Schnitt {Math.round(effSplit*100)} %.</span>
          </div>
        </div>
        <div className="calc-out">
          <div className="calc-compare">
            <div className="ccol"><div className="cch"><span>Heute · {m.k}</span><span className="ccv">{fmtEUR(tradNet)}</span></div>
              <SegBar progress={seen?tradNet/max:0} segN={32} height={26} muted/>
              <div style={{fontSize:11.5,color:'var(--fg4)',marginTop:6}}>{m.keep<1?Math.round(m.keep*100)+' % Split':'100 % Split'} · {m.costNote}</div></div>
            <div className="ccol win"><div className="cch"><span style={{color:'var(--orange)'}}>Mit UNIO CIRCLE</span><span className="ccv">{fmtEUR(unioNet)}</span></div>
              <SegBar progress={seen?unioNet/max:0} segN={32} height={26}/>
              <div style={{fontSize:11.5,color:'var(--fg4)',marginTop:6}}>Ø {Math.round(effSplit*100)} % Split · €599/Mt Paket inkl. allem</div></div>
          </div>
          <div className="calc-delta">
            <div className="cdlabel">Das bleibt zusätzlich bei dir</div>
            <div className="cdval" style={{color:delta>=0?'var(--orange-deep)':'var(--fg2)'}}>{delta>=0?'+':''}{fmtEUR(delta)}<span style={{fontSize:'.42em',color:'var(--fg3)',fontWeight:600}}> / Jahr</span></div>
            <div className="cdsub">Gestaffelter Split (85 % bis €150K, 100 % darüber) abzüglich Infrastruktur (CIRCLE: €599/Monat statt Eigenbau). Plus: Dealflow, Personal Brand & Unternehmensbeteiligung — hier nicht eingerechnet.</div>
            <button className="btn btn-p btn-lg" style={{marginTop:22}} onClick={onOpen}>Mein 100 %-Modell sichern <Icon.arrow size={16}/></button>
          </div>
        </div>
      </div>
      <p style={{fontSize:12,color:'var(--fg4)',marginTop:16,maxWidth:760,lineHeight:1.5}}>Modellrechnung zur Veranschaulichung auf Basis realer CIRCLE-Konditionen. Tatsächliche Werte hängen von Split-Vereinbarung, Kostenstruktur und genutzten Modulen ab.</p>
    </div></section>
  );
}

/* ---------- COMMUNITY ACCESS ---------- */
const ACCESS=[
  {icon:<Icon.building size={20}/>,h:'Büro · 1010 Wien',d:'Tegetthoffstraße 3 — freie Platzwahl, Besprechungsraum, Meeting Lounge, Kaffee & Drucker.'},
  {icon:<Icon.chart size={20}/>,h:'ImmoUnited-Zugriff',d:'ImmoMapping, ImmoStats, Developer Wien & NÖ, ImmoFarming — die volle Datenbasis.'},
  {icon:<Icon.layers size={20}/>,h:'Digitale Infrastruktur',d:'Google Workspace mit eigener Domain, Kalender, Docs — plus KI-Assistent.'},
  {icon:<Icon.shield size={20}/>,h:'Rechtlicher Schutz',d:'Haftpflicht (1 Mio €) und Rechtsschutz (bis 25.000 €) — UNIO als Haftungsdach.'},
  {icon:<Icon.trending size={20}/>,h:'Inserate-Power',d:'15 Inserate / Monat auf Willhaben, ImmoScout24, ImmoWelt & FindHeim.'},
  {icon:<Icon.bolt size={20}/>,h:'UNIO Platform',d:'Automatisiertes Backoffice, Makler-CRM, intelligentes Lead Management, digitales Closing.'},
];
function CommunityAccess(){
  return (
    <section className="sec"><div className="wrap-wide">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:24,marginBottom:44}}>
        <div className="sec-head" style={{marginBottom:0,maxWidth:620}}><span className="kicker">Community Access · ab Tag 1</span>
          <h2>Sechs Bereiche. Ein Paket.</h2>
          <p>Was ein selbstständiger Makler sonst einzeln zusammensucht und verhandelt — bei UNIO inklusive.</p></div>
        <div className="card" style={{padding:'22px 26px',textAlign:'right'}}>
          <div style={{fontSize:12,color:'var(--fg3)',fontWeight:600}}>Eigenbau ~€4.755/M vs. UNIO €599/M</div>
          <div style={{fontWeight:600,fontSize:34,letterSpacing:'-.03em',color:'var(--orange)',marginTop:6}}>+<Num end={23292} prefix="€" suffix=" / Jahr" dur={1300}/></div>
          <div style={{fontSize:12,color:'var(--fg3)',marginTop:4}}>plus die Zeit, die du nicht in Verwaltung verlierst</div>
        </div>
      </div>
      <div className="props" style={{gridTemplateColumns:'repeat(3,1fr)'}}>{ACCESS.map((a,i)=>(
        <Reveal key={a.h} style={{transitionDelay:(i%3*70)+'ms'}}>
          <div className="card" style={{padding:26,height:'100%'}}>
            <span className="ricon" style={{width:42,height:42}}>{a.icon}</span>
            <div style={{fontWeight:700,fontSize:16.5,marginTop:16,letterSpacing:'-.01em'}}>{a.h}</div>
            <p style={{fontSize:13.5,color:'var(--fg2)',lineHeight:1.55,marginTop:8}}>{a.d}</p>
          </div>
        </Reveal>
      ))}</div>
    </div></section>
  );
}

/* ---------- BRAND CASE (@linda.vienna) ---------- */
function BrandCase(){
  const stats=[[116525,'Aufrufe · 1 Reel · 16 Sek.',''],[4391,'Follower organisch',''],[541,'Saves = warme Leads',''],[173,'Profil-Klicks aus 1 Reel','']];
  return (
    <section className="sec ground"><div className="wrap-wide">
      <div style={{display:'grid',gridTemplateColumns:'.95fr 1.05fr',gap:56,alignItems:'center'}} className="comm-grid">
        <div>
          <span className="kicker">Personal Brand in Aktion</span>
          <RevealText style={{fontWeight:600,letterSpacing:'-.03em',fontSize:'clamp(28px,3.4vw,44px)',marginTop:14,lineHeight:1.06}}>Deine Marke.<br/><span className="accent-deep">Dein Asset. Lebenslang.</span></RevealText>
          <p style={{color:'var(--fg2)',fontSize:16,lineHeight:1.6,marginTop:16,maxWidth:480}}>Ein Inhouse-Team produziert unter deinem Namen: 3 Kurzvideos, 10 Fotos und 2 Grafiken im Monat — inkl. deiner eigenen Personal-Brand-Website. Volle IP-Rechte ab Produktion. Verlässt du UNIO, nimmst du alles mit.</p>
          <div style={{display:'flex',gap:10,marginTop:22,flexWrap:'wrap'}}>
            {['Markenstrategie','Content-Produktion','Funnel-Integration','Deine Website'].map(c=><span key={c} className="chip">{c}</span>)}
          </div>
        </div>
        <div className="card" style={{padding:34,boxShadow:'var(--shadow-2)'}}>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:6}}>
            <Avatar name="Linda Vienna" size={44}/>
            <div><div style={{fontWeight:700,fontSize:15}}>@linda.vienna</div><div style={{fontSize:12.5,color:'var(--fg3)'}}>Top-Maklerin im UNIO-Netzwerk · Wien</div></div>
            <span className="live" style={{marginLeft:'auto'}}><span className="pulse"/>LIVE</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginTop:18}}>
            {stats.map(([n,k])=>(
              <div key={k} className="card-inset" style={{padding:18}}>
                <div style={{fontWeight:600,fontSize:28,letterSpacing:'-.03em',color:'var(--orange)'}}><Num end={n}/></div>
                <div style={{fontSize:12,color:'var(--fg3)',marginTop:6,lineHeight:1.35}}>{k}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:16,fontSize:12.5,color:'var(--fg3)',display:'flex',alignItems:'center',gap:7}}><Icon.spark size={14}/> Reichweite als Resultat eines Systems — kein Glücksfall.</div>
        </div>
      </div>
    </div></section>
  );
}

function LensSectionM(){
  const nav=[{items:[['Dashboard','chart'],['Suggested Actions','spark'],['Kontakte','users'],['Immobilien','building'],['Angebote','euro'],['Kalender','clock']]},{h:'Brand',items:[['Personal Brand','trending']]}];
  const kpis=[
    {k:'Offene Leads',v:'57',s:'12 mit hoher Kaufabsicht',icon:'layers',spark:[30,36,34,44,40,50,54,58,62,57]},
    {k:'Intent ≥ 75',v:'41 %',s:'bereit für nächsten Schritt',icon:'gauge',col:'var(--lx-gold)',spark:[20,24,28,30,34,36,38,40,41,41]},
    {k:'Provisionssicherung',v:'64 %',s:'38 von 59 Interessenten',icon:'shield',spark:[30,36,40,44,50,54,58,60,62,64]},
    {k:'Abschlüsse · 30 T',v:'20',s:'erledigte Actions',icon:'check',spark:[6,8,10,12,14,16,17,18,19,20]},
    {k:'Ø Reaktionszeit',v:'40,4 h',s:'bis erster View',icon:'clock',col:'var(--lx-grey)',spark:[70,66,64,58,55,50,48,46,44,40]},
    {k:'Pipeline',v:'€3,1 Mio',s:'in aktiver Betreuung',icon:'euro',col:'var(--lx-gold)',spark:[40,44,48,52,55,60,64,68,72,78]},
  ];
  const wide={t:'Aktivitätsverlauf',s:'Erstellte, angesehene & erledigte Actions · 30 Tage',legend:[{c:'var(--orange)',l:'Erstellt'},{c:'var(--lx-gold)',l:'Angesehen'},{c:'var(--lx-grey)',l:'Erledigt'}]};
  const right=[
    <div className="lx-card" key="r">
      <div className="lx-ct">Conversion-Ringe</div><div className="lx-cs">Übergänge entlang des Funnels</div>
      <div style={{display:'flex',alignItems:'center',gap:18,marginTop:8}}>
        <ActivityRings rings={[{c:'var(--orange)',v:78},{c:'var(--lx-grey)',v:54},{c:'var(--lx-gold)',v:31}]}/>
        <div className="lx-ringlegend" style={{flex:1}}>
          <div className="lx-rl"><span className="dot" style={{background:'var(--orange)'}}/>Leads → Besichtigung<span className="rn">78 %</span></div>
          <div className="lx-rl"><span className="dot" style={{background:'var(--lx-grey)'}}/>Besichtigung → Angebot<span className="rn">54 %</span></div>
          <div className="lx-rl"><span className="dot" style={{background:'var(--lx-gold)'}}/>Angebot → Abschluss<span className="rn">31 %</span></div>
        </div>
      </div>
    </div>,
    <div className="lx-card" key="p">
      <ProgressKpi variant="solid" title="Provisionssicherung bestätigt" value={64} note="38 von 59 Interessenten"/>
    </div>,
  ];
  const board=<LensBoard title="Makler-Cockpit" sub="Deine Leads, dein Intent, deine Provision — in Echtzeit." nav={nav} active="Dashboard"
    banner={{chips:[{t:'ink',l:'Maklersicht'},{t:'org',l:'Daniel Hayden'},{t:'gold',l:'30 Tage'}],h:'Deine Suggested Actions',p:'Lead-Status, Intent-Score und Provisionssicherung in einer Sicht — damit du nur dort Zeit investierst, wo es zählt.'}}
    kpis={kpis} wide={wide} right={right}/>;
  const steps=[
    {k:'Überblick',t:'Dein Cockpit, nicht das der Agentur',p:'Deine Kunden, deine Pipeline, deine Provision — transparent und jederzeit abrufbar.',sel:null},
    {k:'Kennzahlen',t:'Deine Zahlen, live',p:'Offene Leads, Intent-Score und Provisionssicherung — automatisch aktualisiert.',sel:'.lx-kpis',pad:14},
    {k:'Aktivität',t:'Was deine Leads tun',p:'Erstellt, angesehen, erledigt — du siehst, wo Bewegung ist und wann du dran bist.',sel:'.lx-wide'},
    {k:'Conversion',t:'Vom Intent zur Provision',p:'Conversion-Ringe und gesicherte Provision — das System priorisiert deinen nächsten Schritt.',sel:'.lx-rcol'},
  ];
  return <LensScrollSection id="lens" kicker="LENS · Dein Operating System" h="Dein Cockpit. Ein Vorgeschmack."
    sub="So arbeitest du im CIRCLE: scrolle durch dein Dashboard, das deine Leads qualifiziert, priorisiert und deine Provision sichert."
    board={board} steps={steps} cta="Dashboard ansehen"/>;
}

/* ---------- FUNNEL ---------- */
function FunnelM({onClose}){
  const [step,setStep]=useState(0);
  const [d,setD]=useState({status:null,umsatz:null,region:'',fokus:null,wichtig:[],name:'',email:'',tel:'',social:''});
  const total=5;
  const set=(k,v)=>setD(s=>({...s,[k]:v}));
  const next=()=>setStep(s=>Math.min(total,s+1));
  const back=()=>setStep(s=>Math.max(0,s-1));
  const qualifies = d.umsatz==='150-300k' || d.umsatz==='300k+';
  const canNext=[!!d.status, !!d.umsatz, d.region.trim().length>1 && !!d.fokus, d.wichtig.length>0, d.name.trim()&&/.+@.+\..+/.test(d.email)][step];

  if(step===total){
    return (
      <FunnelShell title="CIRCLE Bewerbung" step={total} total={total} progress={100} onClose={onClose}>
        <div className="funnel-done">
          <div className="ring-wrap"><Ring size={84} w={9} color="var(--orange)" track="var(--track)"/></div>
          <h3>Willkommen in der Bewegung, {d.name.split(' ')[0]}!</h3>
          <p>{qualifies
            ? 'Dein Track-Record erfüllt das Zugangskriterium. Wir melden uns innerhalb von 48 Stunden für ein persönliches Kennenlernen — und zeigen dir dein gestaffeltes 85/100 %-Modell.'
            : 'Danke für deine Bewerbung! CIRCLE-Zugang beginnt bei €150K Track-Record — wir prüfen dein Profil persönlich und melden uns innerhalb von 48 Stunden mit deinem Weg dahin.'}</p>
          <div className="summary">
            <div className="srow"><span className="sk">Status</span><span className="sv">{d.status}</span></div>
            <div className="srow"><span className="sk">Track-Record</span><span className="sv">{d.umsatz}</span></div>
            <div className="srow"><span className="sk">Region · Fokus</span><span className="sv">{d.region} · {d.fokus}</span></div>
            <div className="srow"><span className="sk">Konditionsmodell</span><span className="sv" style={{color:'var(--orange)'}}>{qualifies?'85 % / 100 % gestaffelt':'Zugang ab €150K'}</span></div>
          </div>
          <div style={{display:'flex',gap:10,justifyContent:'center',marginTop:24}}>
            <button className="btn btn-p btn-lg" onClick={onClose}>Schließen</button>
          </div>
        </div>
      </FunnelShell>
    );
  }

  return (
    <FunnelShell title="CIRCLE Bewerbung" step={step+1} total={total} progress={(step/total)*100} onClose={onClose}
      footer={<div className="funnel-foot">
        {step>0 && <button className="btn btn-g back" onClick={back}>Zurück</button>}
        <button className="btn btn-p btn-lg" style={{marginLeft:step>0?0:'auto'}} disabled={!canNext} onClick={next}>{step===total-1?'Bewerbung senden':'Weiter'} <Icon.arrow size={16}/></button>
      </div>}>
      <div className="funnel-body">
        {step===0 && <>
          <h3>Wo stehst du heute?</h3>
          <p className="fsub">Damit wir verstehen, was dich aktuell ausbremst.</p>
          <OptionList value={d.status} onChange={v=>set('status',v)} options={[
            {v:'Angestellter Makler',l:'Angestellter Makler',d:'Provision großteils beim Arbeitgeber'},
            {v:'Selbstständiger Kooperationspartner',l:'Selbstständiger Kooperationspartner',d:'Selbstständig, aber nicht unabhängig'},
            {v:'Eigenständiger Makler',l:'Eigenständiger Makler',d:'Eigenes Unternehmen, viel Admin'},
            {v:'Quereinsteiger',l:'Quereinsteiger / Aufbau',d:'Auf dem Weg in den Vertrieb'},
          ]}/>
        </>}
        {step===1 && <>
          <h3>Dein bisheriger Provisionsumsatz (p. a.)?</h3>
          <p className="fsub">CIRCLE-Zugang beginnt bei €150K Track-Record — darunter ist (noch) kein Einstieg möglich.</p>
          <OptionList value={d.umsatz} onChange={v=>set('umsatz',v)} options={[
            {v:'<50k',l:'Unter €50.000'},
            {v:'50-150k',l:'€50.000 – €150.000'},
            {v:'150-300k',l:'€150.000 – €300.000'},
            {v:'300k+',l:'Über €300.000'},
          ]}/>
          {d.umsatz && (qualifies
            ? <div className="funnel-feedback good"><span className="ficon"><Icon.check size={18} sw={2.5}/></span><span className="ftxt">Du erfüllst das Zugangskriterium (ab €150K). Dein Split ist gestaffelt: <b>85 % bis €150K, 100 % darüber</b> — plus Beteiligung am Netzwerk.</span></div>
            : <div className="funnel-feedback"><span className="ficon"><Icon.spark size={18}/></span><span className="ftxt">CIRCLE-Zugang beginnt bei <b>€150K</b> Track-Record. Aktuell noch nicht erreicht — wir zeigen dir gerne den Weg dahin.</span></div>)}
        </>}
        {step===2 && <>
          <h3>Region & Schwerpunkt</h3>
          <p className="fsub">So matchen wir dich mit dem passenden Dealflow.</p>
          <div className="field" style={{marginTop:20}}><label>Region / Markt</label><input className="input" placeholder="z. B. Wien & Umgebung" value={d.region} onChange={e=>set('region',e.target.value)}/></div>
          <OptionList value={d.fokus} onChange={v=>set('fokus',v)} options={[
            {v:'Wohnen',l:'Wohnen'},{v:'Anlage / Vorsorge',l:'Anlage / Vorsorge'},{v:'Gewerbe',l:'Gewerbe'},{v:'Neubauprojekte',l:'Neubauprojekte'},
          ]}/>
        </>}
        {step===3 && <>
          <h3>Was ist dir am wichtigsten?</h3>
          <p className="fsub">Mehrfachauswahl — daran richten wir dein Onboarding aus.</p>
          <OptionList multi value={d.wichtig} onChange={v=>set('wichtig',v)} options={[
            {v:'Eigene Marke aufbauen',l:'Eigene Marke aufbauen'},
            {v:'Mehr von meiner Provision',l:'Mehr von meiner Provision'},
            {v:'Verlässlicher Dealflow',l:'Verlässlicher Dealflow'},
            {v:'Beteiligung & Ownership',l:'Beteiligung & Ownership'},
          ]}/>
        </>}
        {step===4 && <>
          <h3>Wie erreichen wir dich?</h3>
          <p className="fsub">Wir melden uns persönlich innerhalb von 48 Stunden.</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginTop:20}}>
            <div className="field" style={{margin:0}}><label>Name *</label><input className="input" value={d.name} onChange={e=>set('name',e.target.value)}/></div>
            <div className="field" style={{margin:0}}><label>Telefon</label><input className="input" value={d.tel} onChange={e=>set('tel',e.target.value)}/></div>
            <div className="field" style={{margin:0}}><label>E-Mail *</label><input className="input" type="email" value={d.email} onChange={e=>set('email',e.target.value)}/></div>
            <div className="field" style={{margin:0}}><label>Instagram / LinkedIn</label><input className="input" placeholder="@…" value={d.social} onChange={e=>set('social',e.target.value)}/></div>
          </div>
        </>}
      </div>
    </FunnelShell>
  );
}

function CTAM({onOpen}){
  return (
    <section className="sec ground" id="bewerben"><div className="wrap-wide">
      <div className="cta">
        <div className="ringbg"><Ring size={260} w={9} color="var(--orange)"/></div>
        <span className="kicker on-dark">Werde Teil der Community</span>
        <RevealText style={{marginTop:14}}>Dein Anteil.<br/><span className="accent">Deine Provision.</span></RevealText>
        <p>CIRCLE gibt dir System, Dealflow und Upside. Bewirb dich — und werde CIRCLE Partner.</p>
        <div className="row"><button className="btn btn-p btn-xl" onClick={onOpen}>Jetzt bewerben <Icon.arrow size={18}/></button></div>
      </div>
    </div></section>
  );
}

function App(){
  const [open,setOpen]=useState(false);
  const openF=()=>setOpen(true);
  return <>
    <Nav active="makler" cta={{label:"Jetzt bewerben", onClick:openF}}/>
    <HeroM onOpen={openF}/>
    <Ticker items={[['100%','Provision ab €150K'],['49%','Share an Top-Performer'],['20%','Gewinn-Ausschüttung'],['25%','passiv aus Recruits'],['3 Mio €','Umsatz 2025'],['1 Mrd','Reichweite']]}/>
    <ThreeQuestions/>
    <ProblemM/>
    <WhatIf/>
    <Solution/>
    <CommissionCalc onOpen={openF}/>
    <CommunityAccess/>
    <PlatformBento/>
    <PlatformTour/>
    <Values/>
    <BrandCase/>
    <Compare/>
    <CTAM onOpen={openF}/>
    <Footer/>
    {open && <FunnelM onClose={()=>setOpen(false)}/>}
  </>;
}
