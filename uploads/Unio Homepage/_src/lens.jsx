/* compact segmented progress (Progress/breakdown form) */
function CompactSeg({value, note}){
  const [ref,seen]=useInView(0.4); const segN=24, on=Math.round(value/100*segN);
  return <div ref={ref}>
    <div className="mv"><span className="tnum">{seen?<Num end={value}/>:0}</span><span style={{fontSize:'.5em',color:'var(--fg3)'}}>%</span></div>
    <div className="lx-seg" style={{marginTop:12}}>{Array.from({length:segN}).map((_,i)=><i key={i} className={seen&&i<on?'on':''} style={{height:14,transition:'background .35s',transitionDelay:(i*22)+'ms'}}/>)}</div>
    {note && <div style={{fontSize:11.5,color:'var(--fg3)',marginTop:10,lineHeight:1.4}}>{note}</div>}
  </div>;
}

/* ===================== LENS DASHBOARD KIT (ported from DS) ===================== */

/* KPI mini bar-spark */
const LKSpark = ({data, col="var(--orange)"}) => {
  const [ref,seen]=useInView(0.5);
  const W=120,H=26,n=data.length,bw=W/n*0.55,gap=W/n;
  return <svg ref={ref} className="lx-kspark" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
    {data.map((v,i)=>{const h=Math.max(2,v/100*H);return <rect key={i} x={(i*gap).toFixed(1)} y={(H-h).toFixed(1)} width={bw.toFixed(1)} height={(seen?h:2).toFixed(1)} rx="1.3" fill={i>=n-3?col:'var(--track)'} style={{transition:'height .6s var(--ease)',transitionDelay:(i*40)+'ms'}}/>;})}
  </svg>;
};

/* Marketing funnel — Lead → Angebot, orange→gold scale + conversion */
const FUN_COLS=['var(--orange)','#FFC24D','#F2B43A','#E0A52A','var(--lx-gold)'];
function MarketingFunnel({rows, total}){
  const [ref,seen]=useInView(0.4);
  const max=rows[0].v||1;
  return (
    <div ref={ref}>
      <div className="lx-funnel">{rows.map((r,i)=>(
        <div className="lx-frow" key={r.l}>
          <div className="ftop"><span className="fl">{r.l}</span><span className="fr"><span className="fv">{r.v}</span><span className="fp">{r.p}</span></span></div>
          <div className="lx-fbar"><i style={{width:(seen?Math.max(3,r.v/max*100):0)+'%',background:FUN_COLS[i%FUN_COLS.length],transition:'width 1s var(--ease)',transitionDelay:(i*90)+'ms'}}/></div>
        </div>
      ))}</div>
      <div className="lx-ftot"><span className="l">Gesamt-Conversion</span><span className="v">{total}</span></div>
    </div>
  );
}

/* Progress KPI — segmented or solid */
function ProgressKpi({variant="seg", title, desc, value, note, inset=false}){
  const [ref,seen]=useInView(0.4);
  const segN=28, on=Math.round(value/100*segN);
  return (
    <div ref={ref} className="lx-pk" style={inset?{background:'var(--inset)',borderRadius:16,padding:26}:{}}>
      <h4>{title}</h4>
      {desc && <p>{desc}</p>}
      <div className="big">{seen?<Num end={value}/>:0}<small>%</small></div>
      {variant==="seg"
        ? <div className="lx-seg">{Array.from({length:segN}).map((_,i)=><i key={i} className={seen&&i<on?'on':''} style={{transition:'background .4s',transitionDelay:(i*22)+'ms'}}/>)}</div>
        : <div className="lx-solid"><i style={{width:(seen?value:0)+'%',transition:'width 1s var(--ease)'}}/></div>}
      {note && <div className="note">{note}</div>}
    </div>
  );
}

/* Segmented donut on UNIO palette */
function SegDonut({segs, center, label, size=130}){
  const [ref,seen]=useInView(0.5);
  const tot=segs.reduce((a,s)=>a+s.v,0), R=46, C=2*Math.PI*R; let acc=0;
  return <div ref={ref} style={{textAlign:'center'}}>
    <svg width={size} height={size} viewBox="0 0 120 120"><g transform="rotate(-90 60 60)">
      <circle cx="60" cy="60" r={R} fill="none" stroke="var(--track)" strokeWidth="13"/>
      {segs.map((s,i)=>{const len=s.v/tot*C, off=acc; acc+=len; return <circle key={i} cx="60" cy="60" r={R} fill="none" stroke={s.c} strokeWidth="13" strokeLinecap="butt" strokeDasharray={`${seen?len:0} ${C}`} strokeDashoffset={-off} style={{transition:'stroke-dasharray 1s var(--ease)',transitionDelay:(i*180)+'ms'}}/>;})}
    </g>
    <text x="60" y="56" textAnchor="middle" style={{font:'600 23px var(--f)',letterSpacing:'-.03em',fill:'var(--fg1)'}}>{center}</text>
    <text x="60" y="73" textAnchor="middle" style={{font:'600 9.5px var(--f)',letterSpacing:'.1em',fill:'var(--fg3)'}}>{label}</text>
    </svg>
  </div>;
}

/* Activity rings — UNIO split-ring form, concentric */
function ActivityRings({rings, size=150}){
  const [ref,seen]=useInView(0.5);
  // each ring: open-C arc (300deg) from -90deg
  const arc=(r,frac)=>{const a0=-220, sweep=260*frac; const a1=a0+sweep; const rad=(d)=>d*Math.PI/180;
    const x0=50+r*Math.cos(rad(a0)), y0=50+r*Math.sin(rad(a0)), x1=50+r*Math.cos(rad(a1)), y1=50+r*Math.sin(rad(a1));
    const large=sweep>180?1:0; return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;};
  const RS=[34,25,16];
  return <div ref={ref} style={{textAlign:'center'}}>
    <svg width={size} height={size} viewBox="0 0 100 100">
      {RS.map((r,i)=><path key={'t'+i} d={arc(r,1)} fill="none" stroke="var(--track)" strokeWidth="6" strokeLinecap="round"/>)}
      {rings.map((rg,i)=><path key={i} d={arc(RS[i],seen?rg.v/100:0)} fill="none" stroke={rg.c} strokeWidth="6" strokeLinecap="round" style={{transition:'all 1.1s var(--ease)',transitionDelay:(i*160)+'ms'}}/>)}
    </svg>
  </div>;
}

/* multi-series smooth area chart */
function smoothPath(pts){let d='M'+pts[0][0].toFixed(1)+','+pts[0][1].toFixed(1);for(let i=0;i<pts.length-1;i++){const[x0,y0]=pts[i],[x1,y1]=pts[i+1],mx=(x0+x1)/2;d+=' C'+mx.toFixed(1)+','+y0.toFixed(1)+' '+mx.toFixed(1)+','+y1.toFixed(1)+' '+x1.toFixed(1)+','+y1.toFixed(1);}return d;}
function LensActivityChart(){
  const W=620,H=210,n=15;
  const series=[
    {c:'var(--orange)',d:[6,10,8,22,12,70,40,95,28,60,30,18,40,22,55]},
    {c:'var(--lx-gold)',d:[10,18,14,30,20,40,55,75,48,98,70,42,80,35,90]},
    {c:'var(--lx-grey)',d:[3,6,5,10,8,14,18,30,55,40,22,12,18,10,30]},
  ];
  const xs=i=>20+i/(n-1)*(W-30), ys=v=>H-20-(v/100*(H-40));
  return <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
    {[0,1,2,3].map(i=><line key={i} x1="20" x2={W-10} y1={20+i*(H-40)/3} y2={20+i*(H-40)/3} stroke="rgba(20,20,18,.05)" strokeWidth="1"/>)}
    {series.map((s,si)=>{const pts=s.d.map((v,i)=>[xs(i),ys(v)]);const line=smoothPath(pts);const area=line+` L${W-10},${H-20} L20,${H-20} Z`;return <g key={si}>
      <path className="fade-a" d={area} fill={s.c} opacity="0.10"/>
      <path className="lx-line" d={line} fill="none" stroke={s.c} strokeWidth="2.4" style={{animationDelay:(si*0.15)+'s'}}/>
    </g>;})}
  </svg>;
}

/* Assembled LENS board (fixed design width ~1180) */
function LensBoard({title, sub, nav, active, banner, kpis, wide, right, extra}){
  return (
    <div className="lx-board" style={{width:1180}}>
      <aside className="lx-side">
        <div className="lx-brand"><Ring size={24} w={13}/><div><div className="nm">Unio</div><div className="sb">{title==='Makler-Cockpit'?'CIRCLE':'Immobilien'}</div></div></div>
        {nav.map((g,gi)=>(<React.Fragment key={gi}>{g.h&&<div className="lx-ng">{g.h}</div>}{g.items.map(([t,ic])=>(
          <div key={t} className={"lx-ni"+(t===active?' on':'')}>{Icon[ic]?Icon[ic]({size:16}):<Icon.layers size={16}/>}<span>{t}</span></div>
        ))}</React.Fragment>))}
      </aside>
      <div className="lx-main">
        <div className="lx-h1">{title}</div>
        <div className="lx-sub">{sub}</div>
        <div className="lx-banner">
          <span className="upd">Aktualisiert · live</span>
          <div className="lx-chips">{banner.chips.map((c,i)=><span key={i} className={"lx-chip "+c.t}>{c.l}</span>)}</div>
          <h3>{banner.h}</h3><p>{banner.p}</p>
        </div>
        <div className="lx-kpis">{kpis.map((k)=>(
          <div className="lx-kpi" key={k.k}>
            <div className="k">{k.k}</div><div className="v">{k.v}</div><LKSpark data={k.spark} col={k.col||'var(--orange)'}/><div className="s">{k.s}</div>
            <div className="chip">{Icon[k.icon]?Icon[k.icon]({size:17}):<Icon.layers size={17}/>}</div>
          </div>))}</div>
        <div className="lx-row2">
          <div className="lx-card lx-wide">
            <div className="lx-ct">{wide.t}</div><div className="lx-cs">{wide.s}</div>
            <div style={{marginTop:12}}><LensActivityChart/></div>
            <div className="lx-legend">{wide.legend.map((l,i)=><span key={i} className="lx-lg"><i style={{background:l.c}}/>{l.l}</span>)}</div>
          </div>
          <div className="lx-rcol">{right}</div>
        </div>
        {extra && extra.map((e,i)=>(<div className={"lx-card "+e.cls} key={i} style={{marginTop:12}}>{e.node}</div>))}
      </div>
    </div>
  );
}

/* Channel Performance — acquisition bars + cost-per-lead */
const CHAN=[
  {n:'Meta Ads',leads:470,cpl:18,c:'var(--orange)'},
  {n:'Google Ads',leads:210,cpl:16,c:'#FFD27A'},
  {n:'willhaben',leads:250,cpl:14,c:'var(--lx-gold)'},
  {n:'ImmobilienScout',leads:72,cpl:22,c:'#8A6308'},
  {n:'derStandard',leads:30,cpl:32,c:'var(--lx-grey)'},
  {n:'Organisch',leads:12,cpl:0,c:'#EAD9A8'},
];
function ChannelBars(){
  const [ref,seen]=useInView(0.4); const max=600;
  return <div ref={ref}>
    <div className="lx-ct">Channel Performance <span style={{color:'var(--fg3)',fontWeight:500}}>· Cost / Lead</span></div>
    <div style={{display:'flex',flexDirection:'column',gap:11,marginTop:18}}>
      {CHAN.map((c,i)=>(
        <div key={c.n} style={{display:'grid',gridTemplateColumns:'140px 1fr',alignItems:'center',gap:14}}>
          <span style={{fontSize:13.5,color:'var(--fg2)',textAlign:'right'}}>{c.n}</span>
          <div style={{height:17}}><div style={{height:'100%',width:(seen?Math.max(2,c.leads/max*100):0)+'%',background:c.c,borderRadius:5,transition:'width 1s var(--ease)',transitionDelay:(i*70)+'ms'}}/></div>
        </div>
      ))}
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 40px',marginTop:18,paddingTop:6}}>
      {CHAN.map(c=>(<div key={c.n} style={{display:'flex',alignItems:'center',gap:10,fontSize:13.5,padding:'9px 0',borderBottom:'1px solid var(--bdf)'}}><span style={{width:9,height:9,borderRadius:'50%',background:c.c,flex:'none'}}/><span style={{color:'var(--fg2)'}}>{c.n}</span><span style={{marginLeft:'auto',fontWeight:700,fontVariantNumeric:'tabular-nums'}}>{c.cpl} €</span></div>))}
    </div>
  </div>;
}

/* Einheiten & Nachfrage — unit demand table */
const UNITS=[
  ['TOP 7b','3. OG','74,84','679k','Reserviert',18,5,'B',233],
  ['TOP 8','4. OG','102,8','958k','Heiß',50,15,'A',229],
  ['TOP 9a','4. OG','50,0','400k','Heiß',25,6,'A',281],
  ['TOP 9b','4. OG','74,84','699k','Cold',8,2,'B',358],
  ['TOP 10','5. OG','102,8','988k','Heiß',40,11,'A',189],
  ['TOP 11','5. OG','50,03','404k','Reserviert',8,2,'B',355],
];
const stClr=(s)=>s==='Heiß'?{bg:'var(--orange-wash)',fg:'var(--orange-deep)'}:{bg:'var(--inset)',fg:'var(--fg3)'};
const qClr=(q)=>q==='A'?{bg:'var(--orange-wash)',fg:'var(--orange-deep)'}:q==='B'?{bg:'#FBEFD3',fg:'var(--lx-gold)'}:{bg:'var(--inset)',fg:'var(--fg3)'};
const UCOLS='1.1fr .7fr .7fr .8fr 1fr 1.5fr .55fr .6fr .6fr';
function UnitTable(){
  const [ref,seen]=useInView(0.35); const max=50;
  return <div ref={ref}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}><div className="lx-ct">Einheiten & Nachfrage</div><span style={{fontSize:12.5,color:'var(--fg3)'}}>Verfügbar ▾</span></div>
    <div style={{marginTop:14}}>
      <div style={{display:'grid',gridTemplateColumns:UCOLS,gap:10,fontSize:10.5,letterSpacing:'.06em',textTransform:'uppercase',color:'var(--fg4)',fontWeight:600,paddingBottom:10,borderBottom:'1px solid var(--bdf)'}}>
        <span>Einheit</span><span>Etage</span><span>m²</span><span>Preis</span><span>Status</span><span>Nachfrage</span><span>Leads</span><span>Qual.</span><span>Tage</span>
      </div>
      {UNITS.map((u,i)=>{const sc=stClr(u[4]),qc=qClr(u[7]);return (
        <div key={i} style={{display:'grid',gridTemplateColumns:UCOLS,gap:10,alignItems:'center',fontSize:13,padding:'12px 0',borderBottom:'1px solid var(--bdf)'}}>
          <span style={{fontWeight:600,display:'flex',alignItems:'center',gap:6}}><Icon.home size={14}/> {u[0]}</span>
          <span style={{color:'var(--fg2)'}}>{u[1]}</span><span style={{color:'var(--fg2)'}}>{u[2]}</span><span style={{fontWeight:600}}>{u[3]}</span>
          <span><span style={{fontSize:11.5,fontWeight:600,padding:'4px 9px',borderRadius:999,background:sc.bg,color:sc.fg}}>{u[4]}</span></span>
          <span style={{display:'flex',alignItems:'center',gap:8}}><span style={{flex:1,height:6,background:'var(--track)',borderRadius:3,overflow:'hidden'}}><span style={{display:'block',height:'100%',width:(seen?u[5]/max*100:0)+'%',background:'var(--orange)',borderRadius:3,transition:'width .9s var(--ease)',transitionDelay:(i*60)+'ms'}}/></span><b style={{fontVariantNumeric:'tabular-nums'}}>{u[5]}</b></span>
          <span style={{fontVariantNumeric:'tabular-nums'}}>{u[6]}</span>
          <span><span style={{fontSize:12,fontWeight:700,width:23,height:23,display:'inline-flex',alignItems:'center',justifyContent:'center',borderRadius:6,background:qc.bg,color:qc.fg}}>{u[7]}</span></span>
          <span style={{color:'var(--fg3)',fontVariantNumeric:'tabular-nums'}}>{u[8]}</span>
        </div>
      );})}
    </div>
  </div>;
}

/* Live-Besichtigungsstatus — viewing table w/ score rings */
const VIEWS=[
  ['Maria Huber','David Klein','TOP 4','497.000','Besichtigt gerade',87,72],
  ['Stefan Mayer','Cayan Cankaya','TOP 6','462.000','Folgetermin',74,58],
  ['Anna Gruber','David Klein','TOP 7','398.000','Zusage erwartet',92,85],
  ['Peter Wimmer','Wenzel Waechter','TOP 3','336.000','Folgetermin',68,45],
  ['Sandra Fischer','Cayan Cankaya','TOP 8','623.000','Besichtigt gerade',56,32],
];
function ScoreRing({v}){
  const R=15,C=2*Math.PI*R; const [ref,seen]=useInView(0.5);
  return <svg ref={ref} width="38" height="38" viewBox="0 0 38 38"><circle cx="19" cy="19" r={R} fill="none" stroke="var(--track)" strokeWidth="3.5"/><circle cx="19" cy="19" r={R} fill="none" stroke="var(--orange)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray={C.toFixed(1)} strokeDashoffset={(seen?C*(1-v/100):C).toFixed(1)} transform="rotate(-90 19 19)" style={{transition:'stroke-dashoffset 1s var(--ease)'}}/><text x="19" y="22.5" textAnchor="middle" style={{font:'600 11px var(--f)',fill:'var(--fg1)'}}>{v}</text></svg>;
}
const VCOLS='1.2fr 1.1fr .7fr .9fr 1.25fr .6fr .65fr';
function ViewingTable(){
  return <div>
    <div style={{display:'flex',alignItems:'center',gap:10}}><div className="lx-ct">Live-Besichtigungsstatus</div><span className="lx-livechip" style={{position:'static'}}><span className="pulse"/>2 aktiv</span></div>
    <div style={{marginTop:14}}>
      <div style={{display:'grid',gridTemplateColumns:VCOLS,gap:10,fontSize:10.5,letterSpacing:'.06em',textTransform:'uppercase',color:'var(--fg4)',fontWeight:600,paddingBottom:10,borderBottom:'1px solid var(--bdf)'}}>
        <span>Interessent</span><span>Makler</span><span>Einheit</span><span>Preis €</span><span>Status</span><span>Score</span><span>Wahrsch.</span>
      </div>
      {VIEWS.map((v,i)=>{const hot=v[4]==='Zusage erwartet'||v[4]==='Besichtigt gerade';return (
        <div key={i} style={{display:'grid',gridTemplateColumns:VCOLS,gap:10,alignItems:'center',fontSize:13,padding:'11px 0',borderBottom:'1px solid var(--bdf)'}}>
          <span style={{fontWeight:600}}>{v[0]}</span><span style={{color:'var(--fg2)'}}>{v[1]}</span>
          <span style={{display:'flex',alignItems:'center',gap:5,color:'var(--fg2)'}}><Icon.home size={13}/>{v[2]}</span>
          <span style={{fontWeight:600,fontVariantNumeric:'tabular-nums'}}>{v[3]}</span>
          <span><span style={{fontSize:11.5,fontWeight:600,padding:'4px 9px',borderRadius:999,background:hot?'var(--orange-wash)':'var(--inset)',color:hot?'var(--orange-deep)':'var(--fg3)'}}>{v[4]}</span></span>
          <span><ScoreRing v={v[5]}/></span>
          <span style={{fontWeight:700,color:v[6]>=50?'var(--orange-deep)':'var(--fg3)',fontVariantNumeric:'tabular-nums'}}>{v[6]} %</span>
        </div>
      );})}
    </div>
  </div>;
}

/* Scroll-driven LENS section (sticky camera) */
function LensScrollSection({kicker, h, sub, board, steps, id, cta}){
  const wrapRef=useRef();
  const p=useStickyProgress(wrapRef);
  const ease=(t)=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
  const tourP=Math.min(1,p/0.82);
  const zoom=ease(Math.max(0,Math.min(1,(p-0.82)/0.18)));
  const zStyle={transform:`scale(${(1+zoom*0.85).toFixed(3)})`,opacity:(1-zoom).toFixed(3),willChange:'transform,opacity'};
  return (
    <section className="sec ground" id={id}>
      <div className="wrap-wide"><div className="sec-head"><span className="kicker">{kicker}</span><h2>{h}</h2><p>{sub}</p></div></div>
      <div className="lens-scroll" ref={wrapRef} style={{height:(steps.length*60+80)+'vh'}}>
        <div className="lens-sticky"><div className="wrap-wide"><div className={"lx-zoom"+(zoom>0.02?" zooming":"")} style={zStyle}><LensTour board={board} steps={steps} progress={tourP}/></div></div></div>
      </div>
      <div className="wrap-wide" style={{marginTop:18,display:'flex',gap:13,flexWrap:'wrap',alignItems:'center'}}>
        <a className="btn btn-g btn-lg" href={APP_URL} target="_blank" rel="noopener">{cta} <Icon.arrowUR size={16}/></a>
        <span style={{fontSize:13,color:'var(--fg3)'}}>Demodaten · live unter app.unio.at · scrolle durch das Dashboard</span>
      </div>
    </section>
  );
}

/* progress through a tall sticky container (0..1) */
function useStickyProgress(ref){
  const [p,setP]=useState(0);
  useEffect(()=>{ let raf=0;
    const calc=()=>{raf=0;const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const total=el.offsetHeight-window.innerHeight;const scrolled=-r.top;setP(Math.max(0,Math.min(1,scrolled/Math.max(1,total))));};
    const on=()=>{if(!raf)raf=requestAnimationFrame(calc);};
    on();window.addEventListener('scroll',on,{passive:true});window.addEventListener('resize',on);
    return ()=>{window.removeEventListener('scroll',on);window.removeEventListener('resize',on);};
  },[ref]); return p;
}

/* LENS TOUR — a camera that pans/zooms across the board with callouts */
function LensTour({title, sub, board, steps, height, step:stepProp, progress}){
  const continuous = progress!=null;
  const controlled = stepProp!=null;
  const vpRef=useRef(), stageRef=useRef();
  const [vw,setVw]=useState(0), [vh,setVh]=useState(0), [stepS,setStepS]=useState(0), [rects,setRects]=useState(null);
  const easeIO=(t)=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
  const pc = continuous ? Math.max(0,Math.min(1,progress)) : 0;
  const step = continuous ? Math.round(pc*(steps.length-1)) : (controlled ? Math.max(0,Math.min(steps.length-1,stepProp)) : stepS);
  useEffect(()=>{
    const el=vpRef.current; if(!el) return;
    const ro=new ResizeObserver(()=>{setVw(el.clientWidth);setVh(el.clientHeight);});
    ro.observe(el); setVw(el.clientWidth); setVh(el.clientHeight);
    return ()=>ro.disconnect();
  },[]);
  useEffect(()=>{
    const stage=stageRef.current; if(!stage) return;
    const r=steps.map((st)=>{
      if(!st.sel) return {x:0,y:0,w:1180,h:stage.offsetHeight||760};
      const el=stage.querySelector(st.sel); if(!el) return {x:0,y:0,w:1180,h:stage.offsetHeight||760};
      let x=0,y=0,node=el; while(node && node!==stage){ x+=node.offsetLeft; y+=node.offsetTop; node=node.offsetParent; }
      const pad=st.pad||18; return {x:x-pad,y:y-pad,w:el.offsetWidth+2*pad,h:el.offsetHeight+2*pad};
    });
    setRects(r);
  },[vw,steps]);
  useEffect(()=>{
    if(controlled) return;
    const id=setInterval(()=>setStepS(s=>(s+1)%steps.length),4600);
    return ()=>clearInterval(id);
  },[steps.length,controlled]);
  useEffect(()=>{
    if(controlled||continuous) return;
    const id=setInterval(()=>setStepS(s=>(s+1)%steps.length),4600);
    return ()=>clearInterval(id);
  },[steps.length,controlled,continuous]);
  let scale=vw/1180, tx=0, ty=0;
  if(rects && vw>0){
    let rc=rects[step];
    if(continuous && rects.length>1){
      const fp=pc*(steps.length-1), i=Math.max(0,Math.min(steps.length-2,Math.floor(fp))), t=easeIO(fp-i);
      const a=rects[i], b=rects[i+1]||a;
      rc={x:a.x+(b.x-a.x)*t, y:a.y+(b.y-a.y)*t, w:a.w+(b.w-a.w)*t, h:a.h+(b.h-a.h)*t};
    }
    scale=vw/rc.w; tx=-rc.x*scale; ty=-rc.y*scale + Math.max(0,(vh - rc.h*scale)/2);
  }
  const s=steps[step];
  return (
    <div className="lx-tour" style={height?{aspectRatio:'auto',height}:{}}>
      <div className="lx-vp" ref={vpRef}>
        <div className="lx-stage" ref={stageRef} style={{transform:`translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${scale.toFixed(3)})`,transition:continuous?'transform .12s linear':undefined}}>
          {board}
        </div>
      </div>
      <div className="lx-brackets"><span/><span/><span/><span/></div>
      <div className="lx-livechip"><span className="pulse"/>LENS · LIVE</div>
      <div className="lx-callout"><div className="cobox">
        <div className="cok">{s.k}</div>
        <div className="cot">{s.t}</div>
        <div className="cop">{s.p}</div>
        <div className="lx-dots">{steps.map((_,i)=><button key={i} className={i===step?'on':''} onClick={controlled?undefined:()=>setStepS(i)} aria-label={"Schritt "+(i+1)}/>)}</div>
      </div></div>
    </div>
  );
}
